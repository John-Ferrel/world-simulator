import { beforeAll, afterAll, describe, it, expect } from 'vitest';
import { randomUUID } from 'node:crypto';
import {
  migrate,
  pool,
  bootstrap,
  activeWorld,
  acquireLease,
  step,
  recover,
  checksum,
  getWorld,
} from '../packages/storage/index.js';
import { makeApi } from '../apps/api/index.js';
const enabled = process.env.TEST_DATABASE === '1';
describe.skipIf(!enabled)('PostgreSQL authoritative integration', () => {
  const owner = `test-${randomUUID()}`;
  let epoch: number;
  const app = makeApi();
  beforeAll(async () => {
    await migrate();
    await pool.query(
      'TRUNCATE outbox,events,journal,checkpoints,maps,jobs,commands,sessions,users,worlds,writer_lease,settings,admin_audit RESTART IDENTITY CASCADE',
    );
    await bootstrap();
    epoch = (await acquireLease(owner))!;
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
    await pool.end();
  });
  it('upgrades the legacy version-1 marker once and serializes concurrent migration callers', async () => {
    // Version 1 marked the schema before the later trigger DDL. Model an old
    // installation while preserving its already-created application tables.
    await pool.query('ALTER TABLE schema_migrations DROP COLUMN IF EXISTS content_hash');
    await pool.query('DELETE FROM schema_migrations WHERE version=2');
    await Promise.all(Array.from({ length: 4 }, () => migrate({ lockTimeoutMs: 1000 })));

    const rows = (
      await pool.query('SELECT version,content_hash FROM schema_migrations ORDER BY version')
    ).rows;
    expect(rows.map((row) => Number(row.version))).toEqual([1, 2]);
    expect(rows[1].content_hash).toMatch(/^[a-f0-9]{64}$/);
  });
  it('does not rerun DDL for an applied migration while events is read-locked', async () => {
    const reader = await pool.connect();
    try {
      await reader.query('BEGIN');
      await reader.query('LOCK TABLE events IN ACCESS SHARE MODE');
      await Promise.all(Array.from({ length: 4 }, () => migrate({ lockTimeoutMs: 500 })));
    } finally {
      await reader.query('ROLLBACK');
      reader.release();
    }
    const marker = (
      await pool.query('SELECT COUNT(*)::integer AS count FROM schema_migrations WHERE version=2')
    ).rows[0];
    expect(marker.count).toBe(1);
  });
  it('round-trips JSONB checksums and exact recovery through the lossless journal', async () => {
    const result = await step(owner, epoch);
    expect(result).toBeDefined();
    expect(checksum(await recover(result!.world.id))).toBe(checksum(result!.world));
    expect(checksum((await activeWorld())!)).toBe(checksum(result!.world));
  });
  it('rejects a restored head whose final journal link is missing', async () => {
    const w = (await activeWorld())!;
    const initial = (
      await pool.query(
        'SELECT state FROM checkpoints WHERE world_id=$1 ORDER BY revision LIMIT 1',
        [w.id],
      )
    ).rows[0].state;
    const id = `corrupt-restore-${randomUUID()}`;
    const head = { ...structuredClone(w), id, status: 'archived' };
    initial.id = id;
    // Model an incomplete imported backup without disabling immutable-history
    // triggers or altering the real fixture's committed journal.
    await pool.query(
      'INSERT INTO worlds(id,status,revision,state,checksum) VALUES($1,$2,$3,$4,$5)',
      [id, 'archived', head.revision, head, checksum(head)],
    );
    try {
      await pool.query(
        'INSERT INTO checkpoints(world_id,revision,state,checksum) VALUES($1,$2,$3,$4)',
        [id, initial.revision, initial, checksum(initial)],
      );
      await expect(recover(id)).rejects.toThrow('Broken journal chain');
    } finally {
      await pool.query('DELETE FROM checkpoints WHERE world_id=$1', [id]);
      await pool.query('DELETE FROM worlds WHERE id=$1', [id]);
    }
    expect(checksum(await recover(w.id))).toBe(checksum(w));
  });
  it('rolls back precommit faults and preserves postcommit history without duplicating effects', async () => {
    const before = (await activeWorld())!;
    await expect(step(owner, epoch, true, 'before')).rejects.toThrow('precommit');
    expect(checksum((await activeWorld())!)).toBe(checksum(before));
    await expect(step(owner, epoch, true, 'after')).rejects.toThrow('postcommit');
    const after = (await activeWorld())!;
    expect(after.revision).toBe(before.revision + 1);
    expect(checksum(await recover(after.id))).toBe(checksum(after));
    const duplicate = await pool.query(
      'SELECT id,count(*) FROM events GROUP BY id HAVING count(*)>1',
    );
    expect(duplicate.rows).toHaveLength(0);
  });
  it('enforces leases, stale fencing epochs and one active world', async () => {
    expect(await acquireLease('intruder')).toBeUndefined();
    await expect(step('intruder', epoch)).rejects.toThrow('Stale writer');
    await pool.query("UPDATE writer_lease SET expires_at=now()-interval '1 second'");
    const newEpoch = (await acquireLease('successor'))!;
    expect(newEpoch).toBeGreaterThan(epoch);
    await expect(step(owner, epoch)).rejects.toThrow('Stale writer');
    await pool.query("UPDATE writer_lease SET expires_at=now()-interval '1 second'");
    epoch = (await acquireLease(owner))!;
    const w = (await activeWorld())!;
    await expect(
      pool.query('INSERT INTO worlds(id,status,revision,state,checksum) VALUES($1,$2,$3,$4,$5)', [
        'illegal',
        'running',
        0,
        w,
        checksum(w),
      ]),
    ).rejects.toThrow();
  });
  it('authenticates sessions and commits a birth through the canonical command/job path', async () => {
    const registered = await app.inject({
      method: 'POST',
      url: '/api/auth/register',
      payload: { username: 'observer-test', password: 'a-long-password-123' },
    });
    expect(registered.statusCode).toBe(200);
    const cookie = registered.cookies[0].value;
    const headers = { cookie: `session=${cookie}` };
    const w = (await activeWorld())!;
    const request = {
      name: '测试人物',
      sex: 'female',
      health: 0.9,
      wish: '希望她平安长大。',
      appearance: { skin: 1, hair: 1, clothes: 1 },
    };
    const accepted = await app.inject({
      method: 'POST',
      url: '/api/births',
      headers,
      payload: request,
    });
    expect(accepted.statusCode).toBe(202);
    const commandId = accepted.json().commandId;
    await step(owner, epoch, false);
    await step(owner, epoch, false);
    const status = await app.inject({ method: 'GET', url: `/api/commands/${commandId}`, headers });
    expect(status.json().status).toBe('complete');
    const birthId = status.json().result.value.birthId;
    const birth = await app.inject({ method: 'GET', url: `/api/births/${birthId}`, headers });
    expect(birth.json().status).toBe('born');
    const after = (await activeWorld())!;
    const p = after.persons.find((item) => item.ownerId === registered.json().id)!;
    expect(p.name).toBe('测试人物');
    expect(p.parents.length).toBeGreaterThan(0);
    expect(p.coin).toBe(0);
    expect(p.title).toBeUndefined();
    expect(
      (await app.inject({ url: `/api/persons/${p.id}` })).json().person.ownerId,
    ).toBeUndefined();
    const privateView = await app.inject({ url: `/api/persons/${p.id}`, headers });
    expect(privateView.json().person.goals.length).toBeGreaterThan(0);
    expect(privateView.json().person.lifeProgram.wish).toBe('希望她平安长大。');
    const forbidden = await app.inject({ method: 'POST', url: '/api/births', payload: request });
    expect(forbidden.statusCode).toBe(401);
    const csrf = await app.inject({
      method: 'POST',
      url: '/api/births',
      headers: { ...headers, origin: 'https://evil.example' },
      payload: request,
    });
    expect(csrf.statusCode).toBe(403);
  });
  it('grounds replay and catches up without modifying revision', async () => {
    const w = (await activeWorld())!;
    await step(owner, epoch);
    const before = (await activeWorld())!;
    const p = before.persons[0];
    const [map, replay, catchup, news] = await Promise.all(
      [
        '/api/world/map?at=0',
        `/api/persons/${p.id}?at=0`,
        `/api/persons/${p.id}/catch-up?after=0`,
        '/api/world/events?recent=1&at=0',
      ].map((url) => app.inject({ url })),
    );
    expect(map.json().month).toBe(0);
    expect(news.json().events.every((event: any) => event.month <= 0)).toBe(true);
    expect(replay.json().historical).toBe(true);
    expect(catchup.json().sourceIds).toBeInstanceOf(Array);
    expect((await activeWorld())!.revision).toBe(before.revision);
  });
  it('batches six months while keeping monthly journal recovery exact', async () => {
    process.env.SIM_MONTHS_PER_STEP = '6';
    try {
      const before = (await activeWorld())!;
      await step(owner, epoch, true);
      const after = (await activeWorld())!;
      expect(after.revision).toBeGreaterThanOrEqual(before.revision + 6);
      const recovered = await recover(after.id);
      expect(checksum(recovered)).toBe(checksum(after));
    } finally {
      process.env.SIM_MONTHS_PER_STEP = '1';
    }
  });
  it('seals archives and atomically creates exactly one successor', async () => {
    const w = (await activeWorld())!;
    const id = randomUUID();
    await pool.query('INSERT INTO commands(id,world_id,payload) VALUES($1,$2,$3)', [
      id,
      w.id,
      { id, kind: 'close', reason: 'operator' },
    ]);
    await step(owner, epoch, false);
    expect((await getWorld(w.id))!.status).toBe('archived');
    await expect(
      pool.query("UPDATE worlds SET status='running' WHERE id=$1", [w.id]),
    ).rejects.toThrow('immutable');
    await expect(
      pool.query('UPDATE events SET month=month+1 WHERE world_id=$1', [w.id]),
    ).rejects.toThrow('immutable');
    const next = (await activeWorld())!;
    expect(next.id).not.toBe(w.id);
    expect(
      (await pool.query("SELECT count(*) FROM worlds WHERE status='running'")).rows[0].count,
    ).toBe('1');
    expect((await app.inject({ url: '/api/archives' })).json().archives.length).toBe(1);
    expect(checksum(await recover(w.id))).toBe(checksum((await getWorld(w.id))!));
  });
});
