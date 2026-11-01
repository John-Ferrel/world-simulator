import { createEarthWorld } from '../world-packs/earth/index.js';
import '../model/config.js';
import pg from 'pg';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import type { World, HistoricalEvent, Command, Transition } from '../contracts/index.js';
import { createWorld } from '../world-packs/index.js';
import { advance } from '../simulation-core/index.js';
import { mapProjection } from '../narratives/index.js';
import { perception } from '../cognition/index.js';
import { birthJobPayload } from '../rules/birth.js';
import { eventAuthorPayload, fallbackEventDefinition } from '../rules/author.js';
import { directorJobPayload, fallbackDirectorProposal } from '../rules/director.js';
import { createStatePatch, applyStatePatch } from './patch.js';
import { isDetained } from '../coercion/index.js';
export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL ?? 'postgres://localhost:55432/living_world',
  max: 15,
});
export function canonical(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value))
    return '[' + value.map((v) => (v === undefined ? 'null' : canonical(v))).join(',') + ']';
  return (
    '{' +
    Object.keys(value)
      .filter((k) => (value as Record<string, unknown>)[k] !== undefined)
      .sort()
      .map((k) => JSON.stringify(k) + ':' + canonical((value as Record<string, unknown>)[k]))
      .join(',') +
    '}'
  );
}
export function checksum(value: unknown): string {
  const hash = createHash('sha256');
  let parts: string[] = [],
    length = 0;
  const write = (part: string) => {
    parts.push(part);
    length += part.length;
    if (length >= 65536) {
      hash.update(parts.join(''));
      parts = [];
      length = 0;
    }
  };
  const visit = (node: unknown): void => {
    if (node === null || typeof node !== 'object') {
      const encoded = JSON.stringify(node);
      if (encoded === undefined) throw new Error('Cannot checksum a non-JSON root value');
      write(encoded);
    } else if (Array.isArray(node)) {
      write('[');
      for (let i = 0; i < node.length; i++) {
        if (i) write(',');
        // Preserve the historical canonical encoder, including sparse arrays.
        if (i in node) node[i] === undefined ? write('null') : visit(node[i]);
      }
      write(']');
    } else {
      write('{');
      const keys = Object.keys(node)
        .filter((key) => (node as Record<string, unknown>)[key] !== undefined)
        .sort();
      for (let i = 0; i < keys.length; i++) {
        if (i) write(',');
        write(JSON.stringify(keys[i]));
        write(':');
        visit((node as Record<string, unknown>)[keys[i]]);
      }
      write('}');
    }
  };
  visit(value);
  if (parts.length) hash.update(parts.join(''));
  return hash.digest('hex');
}
const INITIAL_SCHEMA_VERSION = 2;
const INITIAL_SCHEMA_LOCK = 617335;
export async function migrate(options: { lockTimeoutMs?: number } = {}) {
  const sql = await readFile(
      new URL('../../infra/migrations/001_initial.sql', import.meta.url),
      'utf8',
    ),
    contentHash = createHash('sha256').update(sql).digest('hex'),
    lockTimeoutMs = options.lockTimeoutMs ?? 0;
  if (!Number.isInteger(lockTimeoutMs) || lockTimeoutMs < 0 || lockTimeoutMs > 60_000)
    throw new Error('Invalid migration lock timeout');

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    if (lockTimeoutMs)
      await client.query("SELECT set_config('lock_timeout', $1, true)", [`${lockTimeoutMs}ms`]);
    await client.query('SELECT pg_advisory_xact_lock($1::bigint)', [INITIAL_SCHEMA_LOCK]);

    const table = (
      await client.query("SELECT to_regclass('schema_migrations') IS NOT NULL AS exists")
    ).rows[0].exists;
    if (table) {
      const latest = (
        await client.query(
          'SELECT COALESCE(MAX(version),0)::integer AS version FROM schema_migrations',
        )
      ).rows[0].version as number;
      if (latest >= INITIAL_SCHEMA_VERSION) {
        const hasHashColumn = (
          await client.query(
            `SELECT EXISTS (
              SELECT 1 FROM pg_attribute
              WHERE attrelid=to_regclass('schema_migrations')
                AND attname='content_hash' AND NOT attisdropped
            ) AS present`,
          )
        ).rows[0].present;
        if (!hasHashColumn) throw new Error('Schema migration marker is missing its content hash');
        const marker = (
          await client.query('SELECT content_hash FROM schema_migrations WHERE version=$1', [
            INITIAL_SCHEMA_VERSION,
          ])
        ).rows[0];
        if (!marker || marker.content_hash !== contentHash)
          throw new Error('Applied initial schema migration content does not match this build');
        await client.query('COMMIT');
        return;
      }
    }

    // Version 1 was written near the end of the original script, before its later
    // tables and trigger DDL. Re-run that idempotent script once and only mark the
    // complete schema after every statement succeeds in this transaction.
    await client.query(sql);
    await client.query('ALTER TABLE schema_migrations ADD COLUMN IF NOT EXISTS content_hash text');
    await client.query(
      'INSERT INTO schema_migrations(version,content_hash) VALUES($1,$2) ON CONFLICT(version) DO UPDATE SET content_hash=EXCLUDED.content_hash',
      [INITIAL_SCHEMA_VERSION, contentHash],
    );
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK').catch(() => undefined);
    throw error;
  } finally {
    client.release();
  }
}
// Immutable read snapshots share deserialization work across observers; revision checks remain live.
const readCache = new Map<string, { revision: number; promise: Promise<World | undefined> }>();
let cachedActiveId: string | undefined;
async function readWorld(id?: string): Promise<World | undefined> {
  const meta = (
    await pool.query(
      id
        ? 'SELECT id,revision FROM worlds WHERE id=$1'
        : "SELECT id,revision FROM worlds WHERE status='running'",
      id ? [id] : [],
    )
  ).rows[0];
  if (!meta) return undefined;
  if (!id && cachedActiveId !== meta.id) {
    if (cachedActiveId) readCache.delete(cachedActiveId);
    cachedActiveId = meta.id;
  }
  const revision = Number(meta.revision),
    cached = readCache.get(meta.id);
  if (cached?.revision === revision) return cached.promise;
  const promise = pool
    .query('SELECT state FROM worlds WHERE id=$1', [meta.id])
    .then((result) => result.rows[0]?.state as World | undefined);
  readCache.set(meta.id, { revision, promise });
  if (readCache.size > 2) readCache.delete(readCache.keys().next().value!);
  try {
    return await promise;
  } catch (e) {
    if (readCache.get(meta.id)?.promise === promise) readCache.delete(meta.id);
    throw e;
  }
}
export async function activeWorld(): Promise<World | undefined> {
  return readWorld();
}
export async function getWorld(id: string): Promise<World | undefined> {
  return readWorld(id);
}
export async function bootstrap() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('SELECT pg_advisory_xact_lock(617334)');
    const existing = (await client.query("SELECT state FROM worlds WHERE status='running'"))
      .rows[0];
    if (existing) {
      await client.query('COMMIT');
      return existing.state as World;
    }
    const epoch = Number((await client.query('SELECT count(*) FROM worlds')).rows[0].count) + 1;
    const makeWorld = process.env.WORLD_PACK === 'ashen-tides' ? createWorld : createEarthWorld;
    const w = makeWorld(
      `${process.env.WORLD_SEED ?? 'tide'}-${epoch}`,
      epoch,
      Number(process.env.WORLD_MAX_YEARS ?? 300),
    );
    await insertWorld(client, w);
    await client.query('COMMIT');
    return w;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}
async function insertWorld(c: pg.PoolClient, w: World) {
  const hash = checksum(w);
  await c.query('INSERT INTO worlds(id,status,revision,state,checksum) VALUES($1,$2,$3,$4,$5)', [
    w.id,
    w.status,
    w.revision,
    JSON.stringify(w),
    hash,
  ]);
  await c.query('INSERT INTO checkpoints(world_id,revision,state,checksum) VALUES($1,$2,$3,$4)', [
    w.id,
    w.revision,
    JSON.stringify(w),
    hash,
  ]);
  await c.query('INSERT INTO maps(world_id,month,payload) VALUES($1,$2,$3)', [
    w.id,
    w.month,
    JSON.stringify(mapProjection(w)),
  ]);
  const initial = w.persons.map((p) => ({
    id: `${w.id}:genesis-${p.id}`,
    worldId: w.id,
    month: 0,
    kind: 'life_record',
    personIds: [p.id],
    locationId: p.locationId,
    causeIds: [],
    significance: 0.2,
    text: `${p.name}生活在${w.settlements.find((s) => s.id === p.locationId)!.name}，以${p.occupation}为生。`,
    data: {
      age: Math.floor(-p.birth / 12),
      originCohortId: p.originCohortId,
      source: 'initial_census',
    },
  }));
  await c.query(
    `WITH inserted AS (INSERT INTO events(id,world_id,month,person_ids,payload) SELECT item->>'id',$1,0,ARRAY[jsonb_array_elements_text(item->'personIds')],item FROM jsonb_array_elements($2::jsonb) AS item RETURNING cursor,payload) INSERT INTO outbox(cursor,world_id,payload) SELECT cursor,$1,payload FROM inserted`,
    [w.id, JSON.stringify(initial)],
  );
}
export async function acquireLease(owner: string): Promise<number | undefined> {
  const result = await pool.query(
    `INSERT INTO writer_lease VALUES(1,$1,1,now()+interval '15 seconds') ON CONFLICT(id) DO UPDATE SET owner=EXCLUDED.owner,epoch=CASE WHEN writer_lease.owner=$1 THEN writer_lease.epoch ELSE writer_lease.epoch+1 END,expires_at=now()+interval '15 seconds' WHERE writer_lease.owner=$1 OR writer_lease.expires_at<now() RETURNING epoch`,
    [owner],
  );
  return result.rows[0] ? Number(result.rows[0].epoch) : undefined;
}
export function statePatch(before: World, after: World) {
  return createStatePatch(before, after);
}

/**
 * Map a ready worker result onto the canonical command grammar. Unknown job
 * kinds stay on the legacy proposal path; a new kind must be added explicitly
 * rather than guessed from arbitrary model output.
 */
function readyJobCommand(job: {
  id: string;
  kind: string;
  result: unknown;
  payload?: unknown;
}): Command {
  const id = `job-command-${job.id}`;
  if (job.kind === 'deliberation') return { id, kind: 'agenda', proposal: job.result };
  if (job.kind === 'birth')
    return {
      id,
      kind: 'birth_compile',
      birthId: (job.payload as { birthId?: string })?.birthId ?? '',
      proposal: job.result,
      source: 'model',
    };
  if (job.kind === 'event_author')
    return {
      id,
      kind: 'rule_proposal',
      proposal: (job.result as { proposal?: unknown })?.proposal ?? job.result,
      source: 'model',
      jobId: job.id,
    };
  if (job.kind === 'history_director')
    return {
      id,
      kind: 'director_action',
      proposal: (job.result as { proposal?: unknown })?.proposal ?? job.result,
      jobId: job.id,
    };
  return {
    id,
    kind: 'proposal',
    proposal: job.result as Extract<Command, { kind: 'proposal' }>['proposal'],
  };
}
export async function step(
  owner: string,
  epoch: number,
  tick = true,
  fault?: 'before' | 'after',
  wallTickAt?: number,
): Promise<Transition | undefined> {
  const c = await pool.connect();
  try {
    await c.query('BEGIN');
    const lease = (await c.query('SELECT * FROM writer_lease WHERE id=1 FOR UPDATE')).rows[0];
    if (
      !lease ||
      lease.owner !== owner ||
      Number(lease.epoch) !== epoch ||
      new Date(lease.expires_at).getTime() < Date.now()
    )
      throw new Error('Stale writer fencing token');
    await c.query("UPDATE writer_lease SET expires_at=now()+interval '15 seconds' WHERE id=1");
    const row = (await c.query("SELECT * FROM worlds WHERE status='running' FOR UPDATE")).rows[0];
    if (!row) {
      await c.query('COMMIT');
      return;
    }
    const before = row.state as World;
    const commands = (
      await c.query(
        "SELECT id,payload FROM commands WHERE world_id=$1 AND status='pending' ORDER BY created_at,id LIMIT $2 FOR UPDATE",
        [before.id, Math.max(1, Math.min(1000, Number(process.env.SIM_COMMAND_BATCH_SIZE ?? 100)))],
      )
    ).rows;
    const ready = (
      await c.query(
        "SELECT * FROM jobs WHERE world_id=$1 AND status='ready' ORDER BY created_at,id LIMIT 8 FOR UPDATE",
        [before.id],
      )
    ).rows;
    const inputs: Command[] = [
      ...commands.map((row) => row.payload),
      ...ready.map((job) => readyJobCommand(job)),
    ];
    const months = tick
      ? Math.max(1, Math.min(12, Number(process.env.SIM_MONTHS_PER_STEP ?? 1)))
      : 1;
    let current = before,
      currentInputs = inputs,
      firstResults: Transition['results'] = [],
      allEvents: Transition['events'] = [],
      final: Transition | undefined;
    const snapshots: { before: World; after: World; input: Command[] }[] = [];
    for (let index = 0; index < months; index++) {
      final = advance(current, currentInputs, tick);
      snapshots.push({ before: current, after: final.world, input: currentInputs });
      allEvents.push(...final.events);
      if (index === 0) firstResults = final.results;
      current = final.world;
      currentInputs = [];
      if (current.status !== 'running') break;
    }
    const w = final!.world;
    const hash = checksum(w);
    const previous = checksum(before);
    if (previous !== row.checksum) throw new Error('Canonical checksum mismatch');
    await c.query('UPDATE worlds SET status=$2,revision=$3,state=$4,checksum=$5 WHERE id=$1', [
      w.id,
      w.status,
      w.revision,
      JSON.stringify(w),
      hash,
    ]);
    let journalPrevious = previous;
    for (const snapshot of snapshots) {
      const journalHash = checksum(snapshot.after);
      await c.query(
        'INSERT INTO journal(world_id,revision,month,previous_checksum,checksum,patch,input) VALUES($1,$2,$3,$4,$5,$6,$7)',
        [
          w.id,
          snapshot.after.revision,
          snapshot.after.month,
          journalPrevious,
          journalHash,
          JSON.stringify(statePatch(snapshot.before, snapshot.after)),
          JSON.stringify(snapshot.input),
        ],
      );
      journalPrevious = journalHash;
    }
    if (allEvents.length)
      await c.query(
        `WITH inserted AS (
        INSERT INTO events(id,world_id,month,person_ids,payload)
        SELECT item->>'id',$1,(item->>'month')::integer,ARRAY(SELECT jsonb_array_elements_text(item->'personIds')),item
        FROM jsonb_array_elements($2::jsonb) AS item RETURNING cursor,payload
      ) INSERT INTO outbox(cursor,world_id,payload) SELECT cursor,$1,payload FROM inserted`,
        [w.id, JSON.stringify(allEvents)],
      );
    for (const row of commands) {
      const res = firstResults.find((r) => r.id === row.id);
      await c.query('UPDATE commands SET status=$2,result=$3 WHERE id=$1', [
        row.id,
        res?.ok ? 'complete' : 'failed',
        JSON.stringify(res),
      ]);
    }
    for (const job of ready) {
      const res = firstResults.find((r) => r.id === `job-command-${job.id}`);
      await c.query(
        "UPDATE jobs SET status=$2,audit=coalesce(audit,'{}'::jsonb)||$3::jsonb WHERE id=$1",
        [job.id, res?.ok ? 'applied' : 'rejected', JSON.stringify({ resolution: res })],
      );
    }
    {
      for (const snapshot of snapshots)
        await c.query(
          'INSERT INTO maps(world_id,month,payload) VALUES($1,$2,$3) ON CONFLICT(world_id,month) DO UPDATE SET payload=EXCLUDED.payload',
          [w.id, snapshot.after.month, JSON.stringify(mapProjection(snapshot.after))],
        );
      if ((tick && w.month % 12 === 0) || w.status === 'archived')
        await c.query(
          'INSERT INTO checkpoints(world_id,revision,state,checksum) VALUES($1,$2,$3,$4)',
          [w.id, w.revision, JSON.stringify(w), hash],
        );
      const recentJobs = new Map(
        (
          await c.query(
            "SELECT actor_id,max(observed_month) AS last_month FROM jobs WHERE world_id=$1 AND kind<>'narrative' GROUP BY actor_id",
            [w.id],
          )
        ).rows.map((row) => [row.actor_id, Number(row.last_month)]),
      );
      const actors = w.persons
        .filter(
          (p) =>
            p.death === undefined &&
            !p.journey &&
            !isDetained(w, p) &&
            (w.agency?.needsReplan[p.id] ||
              p.memories.some((m) => m.salience >= 0.7 && w.month - m.month <= 6) ||
              p.stress > 0.65 ||
              (p.title && w.settlements.some((s) => s.id === p.locationId && s.unrest > 0.35))) &&
            (p.plans.every((a) => a.status !== 'active') || !!w.agency?.needsReplan[p.id]),
        )
        .sort((a, b) => {
          const score = (p: typeof a) =>
            (w.month - (recentJobs.get(p.id) ?? -12)) / 12 + p.stress * 2 + (p.title ? 0.2 : 0);
          return score(b) - score(a) || a.id.localeCompare(b.id);
        })
        .slice(0, Math.max(1, Math.min(64, Number(process.env.LLM_PLANS_PER_MONTH ?? 16))));
      let dispatchFresh = true;
      if (wallTickAt !== undefined && process.env.LLM_API_KEY) {
        const minutes = Number(
          (await c.query("SELECT value FROM settings WHERE key='minutesPerYear'")).rows[0]?.value ??
            process.env.WORLD_MINUTES_PER_YEAR ??
            20,
        );
        const interval = (minutes * 60000) / 12;
        dispatchFresh = interval >= 5000 && Date.now() - wallTickAt <= interval * 0.5;
      }
      if (tick && dispatchFresh && (w.calendar || w.month % 3 === 0) && process.env.LLM_API_KEY)
        for (const p of actors) {
          const id = `${w.id}-${p.id}-${w.month}`;
          await c.query(
            'INSERT INTO jobs(id,world_id,actor_id,actor_version,observed_month,deadline,kind,payload) VALUES($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT DO NOTHING',
            [
              id,
              w.id,
              p.id,
              p.version,
              w.month,
              w.month + 3,
              w.calendar
                ? 'deliberation'
                : p.title
                  ? 'organization_strategy'
                  : p.goals.some((g) => g.status === 'active' && g.kind === 'learn')
                    ? 'innovation'
                    : 'decision',
              JSON.stringify({
                ...perception(w, p),
                observations: (
                  await c.query(
                    'SELECT payload FROM events WHERE world_id=$1 AND id=ANY($2::text[])',
                    [w.id, p.memories.slice(-6).map((m) => m.eventId)],
                  )
                ).rows.map((row) => row.payload),
              }),
            ],
          );
        }
    }
    // Dynamic event authoring. With a model configured the worker proposes a
    // definition; without one, or after a job stalls, the deterministic author
    // publishes through the same compiler and rule runtime.
    for (const request of w.runtime?.authorRequests ?? []) {
      if (request.status !== 'open') continue;
      const stale = w.month - request.month >= 3;
      const existingStatus = (await c.query('SELECT status FROM jobs WHERE id=$1', [request.jobId]))
        .rows[0]?.status as string | undefined;
      const workerFailed =
        existingStatus !== undefined &&
        ['fallback', 'rejected', 'expired'].includes(existingStatus);
      if (request.kind === 'history_director') {
        if (process.env.LLM_API_KEY && !stale && !workerFailed) {
          const payload = directorJobPayload(w, request);
          payload.recentEvents = (
            await c.query(
              "SELECT payload FROM events WHERE world_id=$1 AND payload->>'locationId'=$2 ORDER BY cursor DESC LIMIT 12",
              [w.id, request.siteId],
            )
          ).rows.map((row) => row.payload);
          await c.query(
            'INSERT INTO jobs(id,world_id,actor_id,actor_version,observed_month,deadline,kind,payload) VALUES($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT DO NOTHING',
            [
              request.jobId,
              w.id,
              `director:${request.id}`,
              0,
              w.month,
              w.month + 3,
              'history_director',
              JSON.stringify(payload),
            ],
          );
        } else if (!process.env.LLM_API_KEY || stale || workerFailed) {
          const id = `director-fallback-command-${request.jobId}`;
          await c.query(
            'INSERT INTO commands(id,world_id,user_id,payload) VALUES($1,$2,NULL,$3) ON CONFLICT DO NOTHING',
            [
              id,
              w.id,
              JSON.stringify({
                id,
                kind: 'director_action',
                proposal: fallbackDirectorProposal(w, request),
                jobId: request.jobId,
              }),
            ],
          );
        }
        continue;
      }
      if (process.env.LLM_API_KEY && !stale && !workerFailed) {
        const payload = eventAuthorPayload(w, request);
        payload.recentEvents = (
          await c.query(
            "SELECT payload FROM events WHERE world_id=$1 AND payload->>'locationId'=$2 ORDER BY cursor DESC LIMIT 12",
            [w.id, request.siteId],
          )
        ).rows.map((row) => row.payload);
        await c.query(
          'INSERT INTO jobs(id,world_id,actor_id,actor_version,observed_month,deadline,kind,payload) VALUES($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT DO NOTHING',
          [
            request.jobId,
            w.id,
            `author:${request.id}`,
            0,
            w.month,
            w.month + 3,
            'event_author',
            JSON.stringify(payload),
          ],
        );
      } else if (!process.env.LLM_API_KEY || stale || workerFailed) {
        const id = `author-fallback-command-${request.jobId}`;
        await c.query(
          'INSERT INTO commands(id,world_id,user_id,payload) VALUES($1,$2,NULL,$3) ON CONFLICT DO NOTHING',
          [
            id,
            w.id,
            JSON.stringify({
              id,
              kind: 'rule_proposal',
              proposal: fallbackEventDefinition(w, request),
              source: 'builtin',
              jobId: request.jobId,
            }),
          ],
        );
      }
    }
    // Birth compilation jobs are world-scoped. The sentinel actor id keeps the
    // existing NOT NULL job schema compatible while the payload carries scope.
    for (const birth of Object.values(w.runtime?.births ?? {})) {
      if (birth.status !== 'compiling' || w.month > birth.deadline) continue;
      const existingJob = (await c.query('SELECT status FROM jobs WHERE id=$1', [birth.jobId]))
        .rows[0]?.status as string | undefined;
      const workerFailed =
        existingJob !== undefined && ['fallback', 'rejected', 'expired'].includes(existingJob);
      if (!process.env.LLM_API_KEY || workerFailed) {
        const id = `birth-fallback-command-${birth.id}`;
        await c.query(
          'INSERT INTO commands(id,world_id,user_id,payload) VALUES($1,$2,NULL,$3) ON CONFLICT DO NOTHING',
          [
            id,
            w.id,
            JSON.stringify({
              id,
              kind: 'birth_compile',
              birthId: birth.id,
              proposal: null,
              source: 'fallback',
            }),
          ],
        );
        continue;
      }
      if (existingJob) continue;
      const payload = birthJobPayload(w, birth);
      payload.world.recentEvents = (
        await c.query(
          "SELECT payload FROM events WHERE world_id=$1 AND payload->>'locationId'=$2 ORDER BY cursor DESC LIMIT 8",
          [w.id, birth.siteId],
        )
      ).rows.map((row) => row.payload);
      await c.query(
        'INSERT INTO jobs(id,world_id,actor_id,actor_version,observed_month,deadline,kind,payload) VALUES($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT DO NOTHING',
        [
          birth.jobId,
          w.id,
          `birth:${birth.id}`,
          0,
          w.month,
          birth.deadline,
          'birth',
          JSON.stringify(payload),
        ],
      );
    }
    if (tick && w.month % 12 === 0 && process.env.LLM_API_KEY) {
      for (const p of w.persons.filter((p) => p.ownerId).slice(0, 10)) {
        const facts = (
          await c.query(
            'SELECT payload FROM events WHERE world_id=$1 AND person_ids @> ARRAY[$2]::text[] AND month>$3 ORDER BY cursor DESC LIMIT 12',
            [w.id, p.id, w.month - 12],
          )
        ).rows.map((row) => row.payload);
        if (facts.length)
          await c.query(
            "INSERT INTO jobs(id,world_id,actor_id,actor_version,observed_month,deadline,kind,payload) VALUES($1,$2,$3,$4,$5,$6,'narrative',$7) ON CONFLICT DO NOTHING",
            [
              `narrative-${w.id}-${p.id}-${w.month}`,
              w.id,
              p.id,
              p.version,
              w.month,
              w.month + 12,
              JSON.stringify({ facts }),
            ],
          );
      }
    }
    if (w.status === 'archived' && process.env.AUTO_NEXT_WORLD !== 'false') {
      const makeWorld = process.env.WORLD_PACK === 'ashen-tides' ? createWorld : createEarthWorld;
      const next = makeWorld(`${w.seed.split('-')[0]}-${w.epoch + 1}`, w.epoch + 1, w.maxYears);
      await insertWorld(c, next);
    }
    if (wallTickAt !== undefined)
      await c.query(
        "INSERT INTO settings(key,value) VALUES('lastTickAt',$1) ON CONFLICT(key) DO UPDATE SET value=EXCLUDED.value",
        [wallTickAt],
      );
    if (fault === 'before') throw new Error('Injected precommit failure');
    await c.query('COMMIT');
    if (fault === 'after') throw new Error('Injected postcommit failure');
    return { world: w, events: allEvents, results: firstResults };
  } catch (e) {
    await c.query('ROLLBACK');
    throw e;
  } finally {
    c.release();
  }
}
export async function recover(worldId: string): Promise<World> {
  // Pin one committed head. Later appends must neither extend this recovery nor
  // make a newer checkpoint hide a missing link in the selected history.
  const head = (await pool.query('SELECT revision,checksum FROM worlds WHERE id=$1', [worldId]))
    .rows[0];
  if (!head) throw new Error('Unknown world');
  const targetRevision = Number(head.revision);
  const checkpoint = (
    await pool.query(
      'SELECT * FROM checkpoints WHERE world_id=$1 AND revision<=$2 ORDER BY revision DESC LIMIT 1',
      [worldId, targetRevision],
    )
  ).rows[0];
  if (!checkpoint) throw new Error('No checkpoint');
  let state = checkpoint.state as World;
  checkpoint.state = undefined; // Release the initial payload once subsequent patches replace it.
  let digest = checksum(state);
  if (digest !== checkpoint.checksum || state.revision !== Number(checkpoint.revision))
    throw new Error('Invalid checkpoint');
  // A single row bounds the retained JSON payloads even for large historical
  // patches. Journal/checkpoint rows are immutable, so no long read transaction
  // or global writer lock is needed.
  while (state.revision < targetRevision) {
    const row = (
      await pool.query(
        'SELECT revision,previous_checksum,checksum,patch FROM journal WHERE world_id=$1 AND revision=$2',
        [worldId, state.revision + 1],
      )
    ).rows[0];
    if (!row || digest !== row.previous_checksum || Number(row.revision) !== state.revision + 1)
      throw new Error('Broken journal chain');
    state = applyStatePatch(state, row.patch);
    digest = checksum(state);
    if (digest !== row.checksum || state.revision !== Number(row.revision))
      throw new Error('Journal checksum mismatch');
  }
  if (digest !== head.checksum) throw new Error('Recovery head checksum mismatch');
  return state;
}

export async function listEvents(
  worldId: string,
  personId?: string,
  after = 0,
  limit = 100,
  at?: number,
) {
  const result = await pool.query(
    'SELECT cursor,payload FROM events WHERE world_id=$1 AND ($2::text IS NULL OR person_ids @> ARRAY[$2]::text[]) AND cursor>$3 AND ($5::integer IS NULL OR month<=$5) ORDER BY cursor LIMIT $4',
    [worldId, personId ?? null, after, Math.min(500, limit), at ?? null],
  );
  return result.rows.map((row) => ({
    ...row.payload,
    cursor: Number(row.cursor),
  })) as (HistoricalEvent & { cursor: number })[];
}
