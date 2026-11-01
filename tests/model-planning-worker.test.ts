import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createServer } from 'node:http';
import { spawn, type ChildProcess } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { createWorld, newPerson } from '../packages/world-packs/index.js';
import { mapProjection } from '../packages/narratives/index.js';
import { pool, migrate, checksum, acquireLease, step } from '../packages/storage/index.js';

const enabled = process.env.TEST_DATABASE === '1';
describe.skipIf(!enabled)('deliberation worker to simulator agenda path', () => {
  let worker: ChildProcess;
  let port: number;
  let worldId: string;
  let actorId: string;
  let targetId: string;
  let owner: string;
  let epoch: number;
  let blockNext = false;
  let blockedSeen!: () => void;
  let blockedRelease!: () => void;
  let seenPromise = new Promise<void>((resolve) => (blockedSeen = resolve));
  let releasePromise = new Promise<void>((resolve) => (blockedRelease = resolve));

  const server = createServer(async (req, res) => {
    let raw = '';
    for await (const chunk of req) raw += chunk;
    const request = JSON.parse(raw);
    const envelope = JSON.parse(request.messages[1].content);
    const payload = envelope.perception;
    if (blockNext && payload.scenario === 'stale') {
      blockNext = false;
      blockedSeen();
      await releasePromise;
    }
    const agenda = {
      version: 1,
      jobId: envelope.jobId,
      actorId: envelope.actorId,
      actorVersion: envelope.actorVersion,
      deadline: envelope.deadline,
      intention: '学会手工并与邻居互助',
      rationale: '记忆中的交流表明合作可以改善生计。',
      evidenceIds: payload.memoryEventIds,
      steps: [
        { action: 'practice', label: '练习职业技能', months: 2, domain: 'craft' },
        { action: 'socialize', label: '与熟识的邻居互助', months: 1, targetId },
      ],
    };
    let result: unknown = agenda;
    if (payload.scenario === 'unknown-target')
      result = {
        ...agenda,
        steps: [
          {
            action: 'socialize',
            label: '联系陌生人',
            months: 1,
            targetId: 'unknown-hidden-person',
          },
        ],
      };
    if (payload.scenario === 'arbitrary-action')
      result = {
        ...agenda,
        steps: [{ action: 'eval', label: 'run code', code: 'process.exit()' }],
      };
    if (payload.scenario === 'extra-effect')
      result = {
        ...agenda,
        steps: [{ action: 'practice', label: 'skill', months: 1, effect: { coin: 999 } }],
      };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        model: 'mock-planning-provider',
        usage: { total_tokens: 40 },
        choices: [{ message: { content: JSON.stringify(result) } }],
      }),
    );
  });

  async function waitStatus(id: string, allowed: string[]) {
    for (let i = 0; i < 150; i++) {
      const row = (await pool.query('SELECT * FROM jobs WHERE id=$1', [id])).rows[0];
      if (row && allowed.includes(row.status)) return row;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    throw new Error(`Job timeout ${id}`);
  }

  async function submit(scenario: string) {
    const id = `deliberation-${scenario}-${randomUUID()}`;
    const world = (await pool.query('SELECT state FROM worlds WHERE id=$1', [worldId])).rows[0]
      .state;
    const actor = world.persons.find((person: { id: string }) => person.id === actorId);
    const deadline = world.month + 3;
    await pool.query(
      "INSERT INTO jobs(id,world_id,actor_id,actor_version,observed_month,deadline,kind,payload) VALUES($1,$2,$3,$4,$5,$6,'deliberation',$7)",
      [
        id,
        worldId,
        actorId,
        actor.version,
        world.month,
        deadline,
        {
          scenario,
          memoryEventIds: actor.memories.map((memory: { eventId: string }) => memory.eventId),
          knownPeople: [targetId],
        },
      ],
    );
    return { id, before: world };
  }

  beforeAll(async () => {
    delete process.env.LLM_API_KEY;
    await migrate();
    await pool.query(
      'TRUNCATE outbox,events,journal,checkpoints,maps,narratives,jobs,commands,sessions,users,worlds,writer_lease,settings,admin_audit,model_budget,model_calls RESTART IDENTITY CASCADE',
    );

    const world = createWorld(`planning-${randomUUID()}`, 11, 80);
    world.id = `planning-world-${randomUUID()}`;
    world.pack = { id: 'earth-1900', version: '2.0.0' };
    world.calendar = { startYear: 1900, mode: 'historical-simulation', sources: [] };
    const place = world.settlements[0];
    const actor = newPerson(world, 'planner-actor', place.id, 0, 30);
    const target = newPerson(world, 'planner-target', place.id, 1, 32);
    actor.relationships.push({
      personId: target.id,
      trust: 0.7,
      attachment: 0.5,
      kind: 'friend',
      since: 0,
    });
    target.relationships.push({
      personId: actor.id,
      trust: 0.7,
      attachment: 0.5,
      kind: 'friend',
      since: 0,
    });
    world.persons = [actor, target];
    world.baselinePopulation = 2;
    actorId = actor.id;
    targetId = target.id;
    world.eventSeq = 1;
    const evidence = {
      id: `${world.id}-experience-1`,
      worldId: world.id,
      month: 0,
      kind: 'conversation',
      personIds: [actor.id, target.id],
      locationId: place.id,
      causeIds: [],
      significance: 0.8,
      text: '邻居曾分享手工经验。',
      data: { source: 'test-experience' },
    };
    actor.memories.push({
      id: `memory-${evidence.id}`,
      eventId: evidence.id,
      month: 0,
      salience: 0.8,
    });
    const serialized = JSON.stringify(world);
    const hash = checksum(world);
    await pool.query(
      'INSERT INTO worlds(id,status,revision,state,checksum) VALUES($1,$2,$3,$4,$5)',
      [world.id, world.status, world.revision, serialized, hash],
    );
    await pool.query(
      'INSERT INTO checkpoints(world_id,revision,state,checksum) VALUES($1,$2,$3,$4)',
      [world.id, world.revision, serialized, hash],
    );
    await pool.query('INSERT INTO maps(world_id,month,payload) VALUES($1,$2,$3)', [
      world.id,
      world.month,
      JSON.stringify(mapProjection(world)),
    ]);
    await pool.query(
      'WITH inserted AS (INSERT INTO events(id,world_id,month,person_ids,payload) VALUES($1,$2,$3,$4,$5) RETURNING cursor,payload) INSERT INTO outbox(cursor,world_id,payload) SELECT cursor,$2,payload FROM inserted',
      [evidence.id, world.id, evidence.month, evidence.personIds, evidence],
    );
    worldId = world.id;
    owner = `planning-test-${randomUUID()}`;
    epoch = (await acquireLease(owner))!;
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
    port = (server.address() as { port: number }).port;
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
  }, 30000);

  afterAll(async () => {
    if (worker?.pid) process.kill(-worker.pid, 'SIGTERM');
    await new Promise<void>((resolve) => server.close(() => resolve()));
    await pool.end();
  });

  it('worker only stages a multi-step proposal; sim.step adopts it and stale output cannot overwrite it', async () => {
    const valid = await submit('valid');
    const ready = await waitStatus(valid.id, ['ready']);
    expect(
      Number(
        (await pool.query('SELECT revision FROM worlds WHERE id=$1', [worldId])).rows[0].revision,
      ),
    ).toBe(Number(valid.before.revision));
    expect(ready.result.steps).toHaveLength(2);

    seenPromise = new Promise<void>((resolve) => (blockedSeen = resolve));
    releasePromise = new Promise<void>((resolve) => (blockedRelease = resolve));
    blockNext = true;
    const stale = await submit('stale');
    await seenPromise;
    const actorVersion = valid.before.persons.find(
      (person: { id: string }) => person.id === actorId,
    ).version;
    await step(owner, epoch, true);
    const applied = (await pool.query('SELECT status FROM jobs WHERE id=$1', [valid.id])).rows[0];
    expect(applied.status).toBe('applied');
    const adopted = (await pool.query('SELECT state,checksum FROM worlds WHERE id=$1', [worldId]))
      .rows[0];
    expect(checksum(adopted.state)).toBe(adopted.checksum);
    const agenda = adopted.state.agency.agendas[actorId];
    expect(agenda.steps.map((item: { action: string }) => item.action)).toEqual([
      'practice',
      'socialize',
    ]);
    expect(agenda.steps[1].targetId).toBe(targetId);
    expect(
      adopted.state.persons.find((person: { id: string }) => person.id === actorId).version,
    ).toBeGreaterThan(actorVersion);

    blockedRelease();
    await waitStatus(stale.id, ['ready']);
    await step(owner, epoch, false);
    expect(
      (await pool.query('SELECT status FROM jobs WHERE id=$1', [stale.id])).rows[0].status,
    ).toBe('rejected');
    const final = (await pool.query('SELECT state,checksum FROM worlds WHERE id=$1', [worldId]))
      .rows[0];
    expect(checksum(final.state)).toBe(final.checksum);
    expect(final.state.agency.agendas[actorId].id).toBe(agenda.id);
    expect(final.state.agency.agendas[actorId].intention).toBe(agenda.intention);
  }, 30000);

  it('rejects targets outside the actor’s known social range during simulator adoption', async () => {
    const { id, before } = await submit('unknown-target');
    expect((await waitStatus(id, ['ready'])).result.steps[0].targetId).toBe(
      'unknown-hidden-person',
    );
    await step(owner, epoch, false);
    expect((await pool.query('SELECT status FROM jobs WHERE id=$1', [id])).rows[0].status).toBe(
      'rejected',
    );
    const current = (await pool.query('SELECT state,checksum FROM worlds WHERE id=$1', [worldId]))
      .rows[0];
    expect(checksum(current.state)).toBe(current.checksum);
    expect(current.state.agency).toEqual(before.agency);
  });

  it.each(['arbitrary-action', 'extra-effect'])(
    'worker schema rejects %s without changing canonical world',
    async (scenario) => {
      const { id, before } = await submit(scenario);
      const fallback = await waitStatus(id, ['fallback']);
      expect(fallback.audit.error).toBeTruthy();
      const current = (await pool.query('SELECT state,checksum FROM worlds WHERE id=$1', [worldId]))
        .rows[0];
      expect(Number(current.state.revision)).toBe(Number(before.revision));
      expect(checksum(current.state)).toBe(current.checksum);
    },
  );

  it('persists a real Earth calendar tick as valid JSONB with an exact checksum', async () => {
    const before = (await pool.query('SELECT state FROM worlds WHERE id=$1', [worldId])).rows[0]
      .state;
    expect(before.pack.id).toBe('earth-1900');
    await step(owner, epoch, true);
    const row = (
      await pool.query('SELECT state,state::jsonb AS json_state,checksum FROM worlds WHERE id=$1', [
        worldId,
      ])
    ).rows[0];
    expect(Number(row.state.month)).toBe(Number(before.month) + 1);
    expect(row.json_state).toEqual(row.state);
    expect(checksum(row.state)).toBe(row.checksum);
  });
  it('expires a queued past-month decision before reserving tokens or making a model call', async () => {
    const state = (await pool.query('SELECT state FROM worlds WHERE id=$1', [worldId])).rows[0]
      .state;
    const actor = state.persons.find((p: { id: string }) => p.id === actorId);
    const id = `outdated-${randomUUID()}`;
    await pool.query(
      "INSERT INTO jobs(id,world_id,actor_id,actor_version,observed_month,deadline,kind,payload) VALUES($1,$2,$3,$4,$5,$6,'deliberation',$7)",
      [
        id,
        worldId,
        actorId,
        actor.version,
        state.month - 1,
        state.month + 3,
        { scenario: 'must-not-be-sent' },
      ],
    );
    await waitStatus(id, ['expired']);
    expect(
      (await pool.query('SELECT count(*)::int AS n FROM model_calls WHERE id=$1', [id])).rows[0].n,
    ).toBe(0);
  });
});
