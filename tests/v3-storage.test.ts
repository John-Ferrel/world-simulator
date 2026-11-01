import { describe, expect, it, beforeAll, afterAll } from 'vitest';
import { randomUUID } from 'node:crypto';
import {
  pool,
  migrate,
  bootstrap,
  activeWorld,
  acquireLease,
  step,
} from '../packages/storage/index.js';

const enabled = process.env.TEST_DATABASE === '1' && process.env.V3_DATABASE === '1';

describe.skipIf(!enabled)('v3 birth job through the authoritative storage contract', () => {
  beforeAll(async () => {
    await migrate();
    await bootstrap();
    await pool.query("UPDATE writer_lease SET expires_at=now()-interval '1 second'");
  });
  afterAll(async () => {
    await pool.end();
  });
  async function freshLease(owner: string) {
    await pool.query("UPDATE writer_lease SET expires_at=now()-interval '1 second'");
    return (await acquireLease(owner))!;
  }

  it('consumes a ready dynamic-event proposal through the same compiler and auto-publishes it', async () => {
    const world = (await activeWorld())!;
    const site = world.settlements[0];
    const jobId = `v3-author-${randomUUID()}`;
    const definition = {
      schemaVersion: 1,
      id: `auto.storage.${randomUUID()}`,
      version: 1,
      kind: 'event',
      title: '存储层动态事件',
      scope: { kind: 'site', ids: [site.id] },
      roles: [{ name: 'resident', minAge: 18, maxAge: 80, willingness: 0.9 }],
      trigger: { kind: 'periodic', interval: 1 },
      conditions: { op: 'all', args: [] },
      effects: [{ type: 'policy', role: 'resident', kind: 'cooperate', strength: 0.03, months: 6 }],
      chance: 1,
      cooldown: 6,
      maxOccurrences: 4,
      gas: 400,
      significance: 0.5,
      provenance: {
        source: 'model',
        jobId,
        model: 'test',
        observedMonth: world.month,
        compiler: 'rules/1',
      },
    };
    await pool.query(
      "INSERT INTO jobs(id,world_id,actor_id,actor_version,observed_month,deadline,kind,payload,status,result) VALUES($1,$2,$3,$4,$5,$6,'event_author',$7,'ready',$8)",
      [
        jobId,
        world.id,
        `author:${jobId}`,
        0,
        world.month,
        world.month + 3,
        { request: { id: jobId, siteId: site.id } },
        { version: 1, jobId, proposal: definition },
      ],
    );
    const owner = `v3-author-writer-${randomUUID()}`;
    const epoch = await freshLease(owner);
    await step(owner, epoch, false);
    const after = (await activeWorld())!;
    expect(after.runtime?.active[definition.id]).toBeDefined();
    const job = (await pool.query('SELECT status FROM jobs WHERE id=$1', [jobId])).rows[0];
    expect(job.status).toBe('applied');
  });

  it('queues a birth job, consumes the ready result, and commits a real child', async () => {
    const world = (await activeWorld())!;
    const userId = `v3-user-${randomUUID()}`;
    await pool.query('INSERT INTO users(id,username,password_hash) VALUES($1,$2,$3)', [
      userId,
      userId,
      'test-only',
    ]);
    const commandId = `v3-birth-${randomUUID()}`;
    await pool.query('INSERT INTO commands(id,world_id,user_id,payload) VALUES($1,$2,$3,$4)', [
      commandId,
      world.id,
      userId,
      JSON.stringify({
        id: commandId,
        kind: 'birth',
        userId,
        request: {
          name: '存储测试',
          sex: 'female',
          health: 0.9,
          wish: '希望她平安长大，并保留对世界的好奇。',
          appearance: { skin: 1, hair: 0, clothes: 2 },
        },
      }),
    ]);
    const previousKey = process.env.LLM_API_KEY;
    process.env.LLM_API_KEY = 'mock-only-not-real';
    try {
      const owner = `v3-writer-${randomUUID()}`;
      const epoch = await freshLease(owner);
      await step(owner, epoch, false);
      const job = (
        await pool.query(
          "SELECT * FROM jobs WHERE kind='birth' AND payload->>'birthId' LIKE $1 ORDER BY created_at DESC LIMIT 1",
          [`birth-${commandId.replace(/[^a-zA-Z0-9_-]/g, '-').slice(-80)}`],
        )
      ).rows[0];
      expect(job).toBeDefined();
      expect(job.status).toBe('pending');
      expect(job.actor_id).toMatch(/^birth:/);
      expect(job.payload.request.wish).toContain('好奇');

      // A late/broken model result must not block the child: the simulator
      // parses it, rejects it, and commits an honest deterministic fallback.
      await pool.query("UPDATE jobs SET status='ready',result='{}'::jsonb WHERE id=$1", [job.id]);
      await step(owner, epoch, false);
      const after = (await activeWorld())!;
      const birth = Object.values(after.runtime?.births ?? {}).find(
        (item) => item.userId === userId,
      );
      expect(birth?.status).toBe('born');
      expect(birth?.childId).toBeDefined();
      const child = after.persons.find((person) => person.id === birth?.childId);
      expect(child?.ownerId).toBe(userId);
      expect(child?.parents.length).toBeGreaterThan(0);
      expect(after.runtime?.lifePrograms[child!.id].source).toBe('fallback');
      const command = (await pool.query('SELECT * FROM commands WHERE id=$1', [commandId])).rows[0];
      expect(command.status).toBe('complete');
      const finished = (await pool.query('SELECT * FROM jobs WHERE id=$1', [job.id])).rows[0];
      expect(finished.status).toBe('applied');
    } finally {
      if (previousKey === undefined) delete process.env.LLM_API_KEY;
      else process.env.LLM_API_KEY = previousKey;
    }
  });
});
