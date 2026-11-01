import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createServer } from 'node:http';
import { spawn, type ChildProcess } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import {
  pool,
  migrate,
  activeWorld,
  bootstrap,
  acquireLease,
  step,
} from '../packages/storage/index.js';
import { reserveTokens } from '../packages/storage/budget.js';
const enabled = process.env.TEST_DATABASE === '1';
describe.skipIf(!enabled)('model worker with an actual mock HTTP provider', () => {
  let worker: ChildProcess;
  let port: number;
  const server = createServer(async (req, res) => {
    let raw = '';
    for await (const chunk of req) raw += chunk;
    const input = JSON.parse(raw);
    const payload = JSON.parse(input.messages[1].content);
    const task = payload.perception ?? payload;
    const isNarrative = Array.isArray(payload.perception?.facts);
    let result: any;
    if (payload.jobId.includes('malicious'))
      result = { ...payload, action: 'eval', code: 'process.exit()' };
    else if (task.birthId)
      result = {
        version: 1,
        birthId: task.birthId,
        jobId: payload.jobId,
        interpretation: {
          hopes: ['平安'],
          conditions: ['家庭存在'],
          costs: ['需要照料'],
          translations: [],
        },
        traits: {
          health: 0.9,
          temperament: { care: 0.5, ambition: 0.5, tradition: 0.5 },
          personality: {
            openness: 0.5,
            conscientiousness: 0.5,
            extraversion: 0.5,
            agreeableness: 0.5,
            neuroticism: 0.5,
          },
        },
        goals: [{ kind: 'belong', weight: 0.6, reason: 'mock birth' }],
        opportunities: [],
        replanTriggers: [],
        hiddenFutures: [
          { title: 'mock future', probability: 1, conditions: [], outcome: 'mock outcome' },
        ],
      };
    else if (Array.isArray(task.people))
      result = {
        version: 1,
        jobId: payload.jobId,
        proposal: {
          version: 1,
          jobId: payload.jobId,
          action: 'reshape_agenda',
          scope: { kind: 'site', ids: [task.site?.id ?? task.request?.siteId] },
          rationale: 'mock director preference',
          effects: [],
          preferences: { cooperation: 0.6 },
          targetIds: [],
        },
      };
    else if (task.request)
      result = {
        version: 1,
        jobId: payload.jobId,
        proposal: {
          schemaVersion: 1,
          id: `mock.author.${payload.jobId}`,
          version: 1,
          kind: 'event',
          title: 'mock authored event',
          scope: { kind: 'site', ids: [task.request.siteId] },
          roles: [{ name: 'resident', minAge: 18, maxAge: 80, willingness: 0.9 }],
          trigger: { kind: 'periodic', interval: 1 },
          conditions: { op: 'all', args: [] },
          effects: [
            { type: 'policy', role: 'resident', kind: 'cooperate', strength: 0.03, months: 6 },
          ],
          chance: 1,
          cooldown: 6,
          maxOccurrences: 4,
          gas: 400,
          significance: 0.5,
          provenance: {
            source: 'model',
            model: 'mock',
            observedMonth: task.world?.month ?? 0,
            compiler: 'rules/1',
          },
        },
      };
    else if (isNarrative)
      result = {
        version: 1,
        jobId: payload.jobId,
        paragraphs: [
          { eventId: payload.perception.facts[0].id, text: payload.perception.facts[0].text },
        ],
      };
    else
      result = {
        version: 1,
        jobId: payload.jobId,
        actorId: payload.actorId,
        actorVersion: payload.actorVersion,
        deadline: payload.deadline,
        action: 'research',
      };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        model: 'mock-compatible',
        usage: { total_tokens: 50 },
        choices: [{ message: { content: JSON.stringify(result) } }],
      }),
    );
  });
  beforeAll(async () => {
    await migrate();
    await pool.query('TRUNCATE model_budget,model_calls');
    await bootstrap();
    await new Promise<void>((r) => server.listen(0, '127.0.0.1', r));
    port = (server.address() as any).port;
    worker = spawn('pnpm', ['worker'], {
      env: {
        ...process.env,
        LLM_API_KEY: 'mock-only-not-real',
        LLM_BASE_URL: `http://127.0.0.1:${port}`,
        LLM_DAILY_TOKEN_CAP: '50000',
      },
      stdio: 'ignore',
      detached: true,
    });
  });
  afterAll(async () => {
    if (worker?.pid) process.kill(-worker.pid, 'SIGTERM');
    await new Promise<void>((r) => server.close(() => r()));
    await pool.end();
  });
  async function waitStatus(id: string, allowed: string[]) {
    for (let i = 0; i < 100; i++) {
      const row = (await pool.query('SELECT * FROM jobs WHERE id=$1', [id])).rows[0];
      if (allowed.includes(row.status)) return row;
      await new Promise((r) => setTimeout(r, 100));
    }
    throw new Error(`Job timeout ${id}`);
  }
  it('validates provider output then leaves canonical writes to simulator', async () => {
    const w = (await activeWorld())!,
      p = w.persons.find((p) => p.death === undefined)!;
    const id = `mock-${randomUUID()}`;
    await pool.query(
      "INSERT INTO jobs(id,world_id,actor_id,actor_version,observed_month,deadline,kind,payload) VALUES($1,$2,$3,$4,$5,$6,'decision',$7)",
      [
        id,
        w.id,
        p.id,
        p.version,
        w.month,
        w.month + 3,
        { actor: { id: p.id }, capabilities: ['research'] },
      ],
    );
    await waitStatus(id, ['ready']);
    expect((await activeWorld())!.revision).toBe(w.revision);
    await pool.query("UPDATE writer_lease SET expires_at=now()-interval '1 second'");
    const owner = 'model-test';
    const epoch = (await acquireLease(owner))!;
    const result = await step(owner, epoch, false);
    expect(
      result!.world.persons
        .find((a) => a.id === p.id)!
        .plans.some((plan) => plan.id === `plan-${id}`),
    ).toBe(true);
    expect((await pool.query('SELECT status FROM jobs WHERE id=$1', [id])).rows[0].status).toBe(
      'applied',
    );
  });
  it('compiles a model-authored event and publishes it without human review', async () => {
    const w = (await activeWorld())!,
      site = w.settlements[0];
    const id = `author-${randomUUID()}`;
    const request = {
      id: `request-${id}`,
      siteId: site.id,
      reason: 'mock local pressure',
      causeIds: [],
      pressure: 'shortage',
    };
    await pool.query(
      "INSERT INTO jobs(id,world_id,actor_id,actor_version,observed_month,deadline,kind,payload) VALUES($1,$2,$3,$4,$5,$6,'event_author',$7)",
      [
        id,
        w.id,
        `author:${id}`,
        0,
        w.month,
        w.month + 3,
        {
          request,
          world: { id: w.id, month: w.month, year: 1900 },
          site: { id: site.id, name: site.name, scarcity: 0.8 },
        },
      ],
    );
    await waitStatus(id, ['ready']);
    expect((await activeWorld())!.revision).toBe(w.revision);
    await pool.query("UPDATE writer_lease SET expires_at=now()-interval '1 second'");
    const owner = `author-test-${randomUUID()}`;
    const epoch = (await acquireLease(owner))!;
    await step(owner, epoch, false);
    const after = (await activeWorld())!;
    expect(after.runtime?.active[`mock.author.${id}`]).toBeDefined();
    const job = (await pool.query('SELECT status FROM jobs WHERE id=$1', [id])).rows[0];
    expect(job.status).toBe('applied');
  });

  it('rejects malicious operations and keeps factual narration grounded', async () => {
    const w = (await activeWorld())!,
      p = w.persons[0];
    const malicious = `malicious-${randomUUID()}`;
    await pool.query(
      "INSERT INTO jobs(id,world_id,actor_id,actor_version,observed_month,deadline,kind,payload) VALUES($1,$2,$3,$4,$5,$6,'decision','{}')",
      [malicious, w.id, p.id, p.version, w.month, w.month + 3],
    );
    expect((await waitStatus(malicious, ['fallback'])).audit.error).toBeTruthy();
    expect((await activeWorld())!.revision).toBe(w.revision);
    const id = `narrative-${randomUUID()}`,
      fact = (
        await pool.query(
          'SELECT payload FROM events WHERE world_id=$1 AND person_ids @> ARRAY[$2]::text[] ORDER BY cursor LIMIT 1',
          [w.id, p.id],
        )
      ).rows[0].payload;
    await pool.query(
      "INSERT INTO jobs(id,world_id,actor_id,actor_version,observed_month,deadline,kind,payload) VALUES($1,$2,$3,$4,$5,$6,'narrative',$7)",
      [id, w.id, p.id, p.version, w.month, w.month + 3, { facts: [fact] }],
    );
    await waitStatus(id, ['applied']);
    const narration = (await pool.query('SELECT * FROM narratives WHERE id=$1', [id])).rows[0];
    expect(narration.source_ids).toEqual([fact.id]);
    expect(narration.paragraphs[0].text).toBe(fact.text);
  });
  it('atomically reserves a bounded budget under concurrency', async () => {
    const actor = `budget-${randomUUID()}`;
    const results = await Promise.all(
      Array.from({ length: 8 }, () => reserveTokens(randomUUID(), actor, 2000, 'budget-test')),
    );
    expect(results.filter(Boolean).length).toBe(3);
  });
});
