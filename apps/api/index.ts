import historicalPeopleData from '../../packages/worldlines/historical-people.json' with { type: 'json' };
import conflictData from '../../packages/world-packs/earth/conflict-catalog.json' with { type: 'json' };
import conflictReport from '../../packages/world-packs/earth/conflict-catalog-report.json' with { type: 'json' };
import sovereigntyData from '../../data/historical-sovereignty/cshapes-1900-jurisdictions.json' with { type: 'json' };
import { personalContext, placeContext } from '../../packages/observability/index.js';
import { EARTH_PACK } from '../../packages/world-packs/earth/index.js';
import { modelConfig } from '../../packages/model/config.js';
import Fastify from 'fastify';
import cookie from '@fastify/cookie';
import rateLimit from '@fastify/rate-limit';
import staticFiles from '@fastify/static';
import { randomBytes, randomUUID, scryptSync, timingSafeEqual, createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { z } from 'zod';
import { pool, migrate, activeWorld, getWorld, listEvents } from '../../packages/storage/index.js';
import {
  BirthRequestSchema,
  population,
  publicPerson,
  safeText,
  type World,
  type Person,
} from '../../packages/contracts/index.js';
import { pendingBirthPublic } from '../../packages/rules/birth.js';
import { mapProjection, personAt } from '../../packages/narratives/index.js';
import { compileLifeChapters, compileLifeProgramWish } from '../../packages/narratives/life.js';
import { generateRichBirthDraft } from '../../packages/creation/random.js';
import { PACK } from '../../packages/world-packs/index.js';
const sha = (s: string) => createHash('sha256').update(s).digest('hex');
const Credentials = z
  .object({
    username: z
      .string()
      .trim()
      .min(3)
      .max(32)
      .regex(/^[\p{L}\p{N}_-]+$/u),
    password: z.string().min(10).max(128),
  })
  .strict();
export function makeApi() {
  const app = Fastify({
    forceCloseConnections: true,
    logger: process.env.NODE_ENV !== 'test',
    bodyLimit: 24_000,
    trustProxy: process.env.TRUST_PROXY === 'true',
  });
  app.register(cookie);
  app.register(rateLimit, { max: 5000, timeWindow: '1 minute' });
  app.addHook('onRequest', async (req, reply) => {
    reply
      .header('X-Content-Type-Options', 'nosniff')
      .header('Referrer-Policy', 'same-origin')
      .header(
        'Content-Security-Policy',
        "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self'; worker-src 'self' blob:; object-src 'none'; frame-ancestors 'none'",
      );
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
      const origin = req.headers.origin;
      if (origin && new URL(origin).host !== req.headers.host)
        return reply.code(403).send({ error: '请求来源不符' });
    }
  });
  app.addHook('preValidation', async (req, reply) => {
    const q = req.query as Record<string, string>;
    for (const key of ['at', 'after', 'cursor', 'before'])
      if (q[key] !== undefined && (!/^\d+$/.test(q[key]) || !Number.isSafeInteger(Number(q[key]))))
        return reply.code(400).send({ error: '时间和游标必须是非负整数' });
  });
  app.setErrorHandler((err, req, reply) => {
    const error = err as Error & { statusCode?: number };
    if (error instanceof z.ZodError)
      return reply.code(400).send({
        error: '输入格式不正确',
        details: error.issues.map((i) => ({ path: i.path, message: i.message })),
      });
    const status = error.statusCode ?? 500;
    if (status >= 500) req.log.error(error);
    reply.code(status).send({ error: status >= 500 ? '服务暂时不可用' : error.message });
  });
  async function user(req: any) {
    const token = req.cookies?.session;
    if (!token) return undefined;
    return (
      await pool.query(
        'SELECT u.id,u.username FROM sessions s JOIN users u ON u.id=s.user_id WHERE token_hash=$1 AND expires_at>now()',
        [sha(token)],
      )
    ).rows[0] as { id: string; username: string } | undefined;
  }
  async function requireUser(req: any, reply: any) {
    const u = await user(req);
    if (!u) {
      reply.code(401).send({ error: '请先登录' });
      return;
    }
    return u;
  }
  async function selectedWorld(req: any, reply: any): Promise<World | undefined> {
    const id = (req.query as any)?.worldId;
    const w = id ? await getWorld(String(id)) : await activeWorld();
    if (!w) reply.code(404).send({ error: '世界尚未就绪' });
    return w;
  }
  app.get(
    '/api/data/historical-people',
    { config: { rateLimit: { max: 3, timeWindow: '1 minute' } } },
    async () => historicalPeopleData,
  );
  app.get(
    '/api/data/conflicts',
    { config: { rateLimit: { max: 5, timeWindow: '1 minute' } } },
    async () => ({ report: conflictReport, episodes: conflictData }),
  );
  app.get('/api/health', async () => {
    await pool.query('SELECT 1');
    return {
      ok: true,
      model: {
        configured: !!process.env.LLM_API_KEY,
        mode: process.env.LLM_API_KEY ? 'generative' : 'deterministic_fallback',
      },
    };
  });
  app.get(
    '/api/data/historical-sovereignty',
    { config: { rateLimit: { max: 5, timeWindow: '1 minute' } } },
    async () => sovereigntyData,
  );
  app.post(
    '/api/auth/register',
    { config: { rateLimit: { max: 8, timeWindow: '1 hour' } } },
    async (req, reply) => {
      const data = Credentials.parse(req.body);
      const salt = randomBytes(16).toString('hex');
      const passwordHash = `${salt}:${scryptSync(data.password, salt, 64).toString('hex')}`;
      let id: string;
      try {
        id = (
          await pool.query(
            'INSERT INTO users(id,username,password_hash) VALUES($1,$2,$3) RETURNING id',
            [randomUUID(), data.username, passwordHash],
          )
        ).rows[0].id;
      } catch (err) {
        if ((err as any).code === '23505') return reply.code(409).send({ error: '用户名已存在' });
        throw err;
      }
      const token = randomBytes(32).toString('hex');
      await pool.query("INSERT INTO sessions VALUES($1,$2,now()+interval '30 days')", [
        sha(token),
        id,
      ]);
      reply.setCookie('session', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.COOKIE_SECURE === 'true',
        path: '/',
        maxAge: 30 * 86400,
      });
      return { id, username: data.username };
    },
  );
  app.post(
    '/api/auth/login',
    { config: { rateLimit: { max: 15, timeWindow: '15 minutes' } } },
    async (req, reply) => {
      const data = Credentials.parse(req.body);
      const row = (await pool.query('SELECT * FROM users WHERE username=$1', [data.username]))
        .rows[0];
      const [salt, hash] = (row?.password_hash ?? `${'0'.repeat(32)}:${'0'.repeat(128)}`).split(
        ':',
      );
      const candidate = scryptSync(data.password, salt, 64);
      if (!row || !timingSafeEqual(candidate, Buffer.from(hash, 'hex')))
        return reply.code(401).send({ error: '用户名或密码不正确' });
      const token = randomBytes(32).toString('hex');
      await pool.query("INSERT INTO sessions VALUES($1,$2,now()+interval '30 days')", [
        sha(token),
        row.id,
      ]);
      reply.setCookie('session', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.COOKIE_SECURE === 'true',
        path: '/',
        maxAge: 30 * 86400,
      });
      return { id: row.id, username: row.username };
    },
  );
  app.post('/api/auth/logout', async (req, reply) => {
    if (req.cookies.session)
      await pool.query('DELETE FROM sessions WHERE token_hash=$1', [sha(req.cookies.session)]);
    reply.clearCookie('session', { path: '/' });
    return { ok: true };
  });
  app.get('/api/auth/me', async (req) => {
    const u = await user(req);
    if (!u) return { user: null };
    const people = (
      await pool.query(
        "SELECT w.id AS world_id,p.person FROM worlds w CROSS JOIN LATERAL jsonb_array_elements(w.state->'persons') AS p(person) WHERE p.person->>'ownerId'=$1 ORDER BY w.created_at DESC,(p.person->>'birth')::integer DESC LIMIT 200",
        [u.id],
      )
    ).rows;
    return {
      user: u,
      persons: people.map((row) => ({
        id: row.person.id,
        name: row.person.name,
        worldId: row.world_id,
        death: row.person.death,
      })),
    };
  });
  app.get('/api/world/active', async (req, reply) => {
    const w = await selectedWorld(req, reply);
    if (!w) return;
    const u = await user(req);
    const used = process.env.LLM_API_KEY
      ? Number(
          (
            await pool.query(
              "SELECT tokens FROM model_budget WHERE day=current_date AND bucket='world'",
            )
          ).rows[0]?.tokens ?? 0,
        )
      : 0;
    const remaining = Math.max(0, Number(process.env.LLM_DAILY_TOKEN_CAP ?? 50000) - used);
    const clockSettings = new Map(
      (
        await pool.query('SELECT key,value FROM settings WHERE key=ANY($1::text[])', [
          ['lastTickAt', 'minutesPerYear', 'paused'],
        ])
      ).rows.map((r) => [r.key, r.value]),
    );
    const minutesPerYear = Number(
      clockSettings.get('minutesPerYear') ?? process.env.WORLD_MINUTES_PER_YEAR ?? 20,
    );
    const lagMs = Math.max(
      0,
      Date.now() -
        Number(clockSettings.get('lastTickAt') ?? Date.now()) -
        (minutesPerYear * 60000) / 12,
    );
    const people = w.persons
      .filter((p) => (p.ownerId === u?.id && u) || p.death === undefined)
      .sort((a, b) => Number(b.ownerId === u?.id && !!u) - Number(a.ownerId === u?.id && !!u))
      .slice(0, w.calendar ? 2000 : 80);
    return {
      id: w.id,
      month: w.month,
      revision: w.revision,
      clock: {
        paused: clockSettings.get('paused') === true,
        lagMs: w.status === 'running' ? lagMs : 0,
      },
      status: w.status,
      terminalReason: w.terminalReason,
      historicalSovereignty: w.sovereignty
        ? {
            mode: w.sovereignty.mode,
            baselineDate: w.sovereignty.baselineDate,
            license: 'CC BY-NC-SA 4.0',
          }
        : undefined,
      geographicRegionCount: new Set(w.settlements.map((s) => s.regionId ?? s.polityId)).size,
      pack: w.pack.id.startsWith('earth-')
        ? {
            ...EARTH_PACK,
            version: w.pack.version,
            id: w.pack.id,
            baselineYear: w.calendar?.startYear ?? 1900,
            populationYear: w.calendar?.startYear === 2020 ? 2019 : 1900,
          }
        : PACK,
      calendar: w.calendar,
      population: population(w),
      named: w.persons.filter((p) => p.death === undefined).length,
      settlements: w.settlements.map((s) => ({ id: s.id, name: s.name, polityId: s.polityId })),
      polities: w.polities.map((p) => ({ id: p.id, name: p.name, color: p.color })),
      people: people.map((p) => ({
        id: p.id,
        name: p.name,
        locationId: p.locationId,
        death: p.death,
      })),
      modelConfigured: !!process.env.LLM_API_KEY,
      model: {
        provider: modelConfig().provider,
        name: modelConfig().model,
        status: !process.env.LLM_API_KEY
          ? 'fallback'
          : remaining < 1500
            ? 'budget_limited'
            : 'ready',
        budgetRemaining: remaining,
      },
      cursor: Number(
        (
          await pool.query(
            'SELECT coalesce(max(cursor),0) AS cursor FROM outbox WHERE world_id=$1',
            [w.id],
          )
        ).rows[0].cursor,
      ),
      minutesPerYear,
    };
  });
  app.get('/api/world/map', async (req, reply) => {
    const w = await selectedWorld(req, reply);
    if (!w) return;
    const at = (req.query as any).at;
    if (at === undefined || Number(at) >= w.month)
      return { ...mapProjection(w), historical: false };
    const row = (
      await pool.query(
        'SELECT payload FROM maps WHERE world_id=$1 AND month<=$2 ORDER BY month DESC LIMIT 1',
        [w.id, Math.max(0, Number(at))],
      )
    ).rows[0];
    return row
      ? { ...row.payload, historical: true }
      : { ...mapProjection(w), historical: false, note: '此时点没有历史地图；当前显示实时地图' };
  });
  app.get('/api/world/events', async (req, reply) => {
    const w = await selectedWorld(req, reply);
    if (!w) return;
    const q = req.query as any;
    if (q.recent === '1') {
      const requested = q.at === undefined ? w.month : Number(q.at);
      const cutoff = Number.isFinite(requested)
        ? Math.max(0, Math.min(w.month, requested))
        : w.month;
      const worldKinds = [
        'historical_source',
        'world_impact',
        'war_started',
        'war_ended',
        'rule_definition_activated',
        'rule_occurrence',
        'director_action',
        'scarcity',
        'coup',
        'coup_failed',
        'succession',
        'political_vacuum_cost',
        'institution_founded',
        'institution_dissolved',
        'movement_formed',
        'movement_support_shift',
        'election',
        'reform',
        'economic_sanctions',
        'diplomatic_crisis_opened',
        'innovation',
        'world_ending',
      ];
      const rows = (
        await pool.query(
          "SELECT cursor,payload FROM events WHERE world_id=$1 AND month<=$2 AND payload->>'kind'=ANY($3::text[]) AND (payload->>'significance')::numeric>=0.6 ORDER BY cursor DESC LIMIT 160",
          [w.id, cutoff, worldKinds],
        )
      ).rows;
      const seen = new Set<string>();
      const perKind = new Map<string, number>();
      const events: any[] = [];
      for (const row of rows) {
        const kind = String(row.payload.kind);
        const text = String(row.payload.text ?? '').replace(/\s+/g, '');
        const key = `${kind}:${text}`;
        if (seen.has(key)) continue;
        seen.add(key);
        const cap = kind === 'scarcity' ? 2 : kind === 'innovation' ? 1 : 2;
        if ((perKind.get(kind) ?? 0) >= cap) continue;
        perKind.set(kind, (perKind.get(kind) ?? 0) + 1);
        events.push({ ...row.payload, cursor: Number(row.cursor) });
        if (events.length >= 8) break;
      }
      return {
        events,
        at: cutoff,
        historical: cutoff < w.month,
      };
    }
    return {
      events: await listEvents(
        w.id,
        undefined,
        Math.max(0, Number(q.cursor) || 0),
        100,
        q.at === undefined ? undefined : Number(q.at),
      ),
    };
  });
  app.get('/api/persons/search', async (req, reply) => {
    const w = await selectedWorld(req, reply);
    if (!w) return;
    const q = String((req.query as any).q ?? '')
      .trim()
      .slice(0, 80)
      .toLocaleLowerCase();
    if (q.length < 1) return { people: [] };
    return {
      people: w.persons
        .filter(
          (p) => p.name.toLocaleLowerCase().includes(q) || p.id.toLocaleLowerCase().includes(q),
        )
        .slice(0, 30)
        .map((p) => ({
          id: p.id,
          name: p.name,
          locationId: p.locationId,
          death: p.death,
          title: p.title,
        })),
    };
  });
  app.get('/api/persons/:id', async (req, reply) => {
    const w = await selectedWorld(req, reply);
    if (!w) return;
    const p = w.persons.find((p) => p.id === (req.params as any).id);
    if (!p) return reply.code(404).send({ error: '人物不存在' });
    const u = await user(req);
    const at = Number((req.query as any).at);
    if (Number.isFinite(at) && at < w.month) {
      const facts = (
        await pool.query(
          'SELECT payload FROM events WHERE world_id=$1 AND person_ids @> ARRAY[$2]::text[] AND month<=$3 ORDER BY cursor',
          [w.id, p.id, at],
        )
      ).rows.map((r) => r.payload);
      return { person: personAt(p, at, facts), historical: true };
    }
    const { beliefs, memories, goals, plans, commitments, ...visible } = publicPerson(p);
    const program = u && u.id === p.ownerId ? w.runtime?.lifePrograms[p.id] : undefined;
    const ability = u && u.id === p.ownerId ? w.runtime?.abilities[p.id] : undefined;
    return {
      person: {
        ...visible,
        context: personalContext(w, p),
        age: Math.floor(((p.death ?? w.month) - p.birth) / 12),
        relationships: visible.relationships.map((rel) => ({
          ...rel,
          name: w.persons.find((q) => q.id === rel.personId)?.name,
        })),
        ...(u && u.id === p.ownerId
          ? {
              goals,
              memories,
              beliefs,
              plans,
              commitments,
              lifeProgram: program
                ? {
                    source: program.source,
                    wish: program.wish,
                    interpretation: program.interpretation,
                    goals: program.goals,
                    opportunities: program.opportunities,
                    replanTriggers: program.replanTriggers,
                    creationHints: program.creationHints,
                    trajectory: program.lifeTrajectory
                      ? {
                          mode: program.lifeTrajectory.trajectory.mode,
                          status: program.lifeTrajectory.status,
                          resolved: program.lifeTrajectory.resolved.length,
                          total: program.lifeTrajectory.trajectory.beats.length,
                          next: program.lifeTrajectory.trajectory.beats[
                            program.lifeTrajectory.cursor
                          ]
                            ? {
                                title:
                                  program.lifeTrajectory.trajectory.beats[
                                    program.lifeTrajectory.cursor
                                  ]!.title,
                                age: program.lifeTrajectory.trajectory.beats[
                                  program.lifeTrajectory.cursor
                                ]!.age,
                                stage:
                                  program.lifeTrajectory.trajectory.beats[
                                    program.lifeTrajectory.cursor
                                  ]!.stage,
                              }
                            : null,
                          lastResolved: program.lifeTrajectory.resolved.at(-1) ?? null,
                        }
                      : undefined,
                    ability: ability
                      ? {
                          mode: ability.mode,
                          uses: ability.uses,
                          maxUses: ability.maxUses,
                          cooldown: ability.cooldown,
                          exposure: ability.exposure,
                          blockedUntil: ability.blockedUntil,
                        }
                      : undefined,
                  }
                : undefined,
              deathSummary: w.runtime?.deathSummaries?.[p.id],
            }
          : {}),
      },
      historical: false,
    };
  });
  app.get('/api/persons/:id/narrative', async (req, reply) => {
    const w = await selectedWorld(req, reply);
    if (!w) return;
    const person = w.persons.find((item) => item.id === (req.params as any).id);
    if (!person) return reply.code(404).send({ error: '人物不存在' });
    const requested = Number((req.query as any).at);
    const at = Number.isFinite(requested) ? Math.max(0, Math.min(w.month, requested)) : w.month;
    const facts = (
      await pool.query(
        'SELECT payload FROM events WHERE world_id=$1 AND person_ids @> ARRAY[$2]::text[] AND month<=$3 ORDER BY cursor',
        [w.id, person.id, at],
      )
    ).rows.map((row) => row.payload);
    const chapters = compileLifeChapters(w, person, facts).reverse();
    return {
      personId: person.id,
      at,
      historical: at < w.month,
      wish: compileLifeProgramWish(w, person),
      chapters,
    };
  });
  app.get('/api/persons/:id/chronicle', async (req, reply) => {
    const w = await selectedWorld(req, reply);
    if (!w) return;
    const q = req.query as any;
    const id = (req.params as any).id;
    const at = q.at === undefined ? w.month : Number(q.at);
    if (q.cursor !== undefined)
      return { events: await listEvents(w.id, id, Number(q.cursor) || 0, 100, at) };
    const rows = (
      await pool.query(
        'SELECT cursor,payload FROM events WHERE world_id=$1 AND person_ids @> ARRAY[$2]::text[] AND month<=$3 AND ($4::bigint IS NULL OR cursor<$4) ORDER BY cursor DESC LIMIT 100',
        [w.id, id, at, q.before ?? null],
      )
    ).rows.reverse();
    return {
      events: rows.map((row) => ({ ...row.payload, cursor: Number(row.cursor) })),
      hasEarlier: rows.length === 100,
    };
  });
  app.get('/api/persons/:id/catch-up', async (req, reply) => {
    const w = await selectedWorld(req, reply);
    if (!w) return;
    const id = (req.params as any).id,
      after = Math.max(0, Number((req.query as any).after) || 0);
    const rows = (
      await pool.query(
        'SELECT payload FROM events WHERE world_id=$1 AND person_ids @> ARRAY[$2]::text[] AND month>$3 ORDER BY cursor DESC LIMIT 500',
        [w.id, id, after],
      )
    ).rows.reverse();
    const facts = rows.map((row) => row.payload);
    const narrative = (
      await pool.query(
        'SELECT * FROM narratives WHERE world_id=$1 AND person_id=$2 AND month>$3 ORDER BY month DESC LIMIT 1',
        [w.id, id, after],
      )
    ).rows[0];
    const verified =
      narrative &&
      narrative.source_ids.every((source: string) => facts.some((e) => e.id === source));
    return {
      modelSummary: verified ? narrative.paragraphs : undefined,
      after,
      count: facts.length,
      bounded: rows.length === 500,
      sourceIds: facts.map((e) => e.id),
      text: facts.length
        ? facts
            .filter((e) => e.significance >= 0.7)
            .slice(-4)
            .map((e) => e.text)
            .join(' ') || facts.at(-1).text
        : '这段时间尚无新的生活记录。',
      perspective: 'recorded_facts',
    };
  });
  app.get(
    '/api/creation/random',
    { config: { rateLimit: { max: 60, timeWindow: '1 minute' } } },
    async (req, reply) => {
      const w = await selectedWorld(req, reply);
      if (!w) return;
      const q = req.query as any;
      const mode = q.mode === 'legendary' ? 'legendary' : 'ordinary';
      const nonce = String(q.nonce ?? randomUUID()).slice(0, 96);
      const seed = String(q.seed ?? w.seed).slice(0, 160);
      const draft = generateRichBirthDraft(w, {
        seed,
        nonce,
        overrides: { mode },
      });
      return { ...draft, lifeMode: mode };
    },
  );
  app.post(
    '/api/births',
    { config: { rateLimit: { max: 8, timeWindow: '1 hour' } } },
    async (req, reply) => {
      const u = await requireUser(req, reply);
      if (!u) return;
      const request = BirthRequestSchema.parse(req.body);
      const w = await activeWorld();
      if (!w) return reply.code(409).send({ error: '纪元正在切换' });
      const key = req.headers['idempotency-key'];
      if (key !== undefined && (typeof key !== 'string' || !/^[a-zA-Z0-9_-]{8,64}$/.test(key)))
        return reply.code(400).send({ error: '幂等键格式不正确' });
      const id = key ? `${w.id}:birth:${key}` : randomUUID();
      const inserted = await pool.query(
        'INSERT INTO commands(id,world_id,user_id,payload) VALUES($1,$2,$3,$4) ON CONFLICT(id) DO NOTHING RETURNING id',
        [id, w.id, u.id, JSON.stringify({ id, kind: 'birth', userId: u.id, request })],
      );
      if (!inserted.rowCount) {
        const existing = (await pool.query('SELECT user_id FROM commands WHERE id=$1', [id]))
          .rows[0];
        if (existing?.user_id !== u.id) return reply.code(409).send({ error: '此幂等键已被使用' });
      }
      return reply.code(202).send({ commandId: id, worldId: w.id });
    },
  );
  app.get('/api/births/:id', async (req, reply) => {
    const u = await requireUser(req, reply);
    if (!u) return;
    const w = await activeWorld();
    if (!w) return reply.code(409).send({ error: '纪元正在切换' });
    const birth = w.runtime?.births[(req.params as any).id];
    if (!birth || birth.userId !== u.id) return reply.code(404).send({ error: '出生请求不存在' });
    const program = birth.childId ? w.runtime?.lifePrograms[birth.childId] : undefined;
    return {
      ...pendingBirthPublic(birth),
      lifeProgram: program
        ? {
            source: program.source,
            interpretation: program.interpretation,
            goals: program.goals,
            opportunities: program.opportunities,
            replanTriggers: program.replanTriggers,
            ability: program.abilitySpec ? { mode: program.abilitySpec.mode } : undefined,
          }
        : undefined,
      hiddenFutures: 'private',
    };
  });
  app.get('/api/commands/:id', async (req, reply) => {
    const u = await requireUser(req, reply);
    if (!u) return;
    const row = (
      await pool.query('SELECT id,status,result FROM commands WHERE id=$1 AND user_id=$2', [
        (req.params as any).id,
        u.id,
      ])
    ).rows[0];
    return row ?? reply.code(404).send({ error: '指令不存在' });
  });
  app.get('/api/preview/:type/:id', async (req, reply) => {
    const w = await selectedWorld(req, reply);
    if (!w) return;
    const { type, id } = req.params as any;
    if (type === 'person') {
      const p = w.persons.find((p) => p.id === id);
      if (!p) return { name: '未找到', text: '' };
      const at = Number((req.query as any).at);
      if (Number.isFinite(at) && at < w.month) {
        const facts = (
          await pool.query(
            'SELECT payload FROM events WHERE world_id=$1 AND person_ids @> ARRAY[$2]::text[] AND month<=$3 ORDER BY cursor',
            [w.id, p.id, at],
          )
        ).rows.map((row) => row.payload);
        const historical = personAt(p, at, facts);
        const place = w.settlements.find((s) => s.id === historical.locationId);
        return {
          name: p.name,
          text: `${historical.occupation} · ${place?.name ?? '未知地点'} · ${historical.age} 岁 · 历史记录`,
        };
      }
      return {
        name: p.name,
        text: `${p.occupation} · ${w.settlements.find((s) => s.id === p.locationId)?.name} · ${p.death === undefined ? '在世' : '已故'}`,
      };
    }
    if (type === 'place') {
      const at = Number((req.query as any).at);
      if (Number.isFinite(at) && at < w.month) {
        const map = (
          await pool.query(
            'SELECT payload FROM maps WHERE world_id=$1 AND month<=$2 ORDER BY month DESC LIMIT 1',
            [w.id, at],
          )
        ).rows[0]?.payload;
        const place = map?.settlements.find((s: any) => s.id === id);
        return place
          ? {
              name: place.name,
              text: `${map.polities.find((p: any) => p.id === place.polityId)?.name ?? '当时地区'} · 模拟人口 ${place.population} · 历史地图记录`,
            }
          : { name: '历史地点', text: '此时点没有可用的地点记录。' };
      }
      const s = w.settlements.find((s) => s.id === id);
      const context = s ? placeContext(w, s.id) : undefined;
      return s
        ? {
            name: s.name,
            context,
            text: [
              `${w.polities.find((p) => p.id === s.polityId)?.name} · ${s.biome === 'forest' ? '林地' : s.biome === 'hills' ? '丘陵' : '河谷'}`,
              context?.regime
                ? `模拟政体：${({ parliamentary: '议会制', oligarchy: '寡头制', military: '军管', theocracy: '神权制', authoritarian: '威权制' } as Record<string, string>)[context.regime]}`
                : '',
              context?.leader
                ? `政治领导人：${context.leader}`
                : context?.vacancySince !== undefined
                  ? '领导职位空缺，继任联盟尚未形成'
                  : '',
              context?.activeWars.length
                ? `正卷入${context.activeWars.length}场战争；本月军需满足率${Math.round((context.logistics?.fulfillment ?? context.activeWars[0].supply) * 100)}%`
                : '',
              context?.logistics
                ? `运输满足率${Math.round(context.logistics.routeFulfillment * 100)}%，库存满足率${Math.round(context.logistics.stockFulfillment * 100)}%`
                : '',
            ]
              .filter(Boolean)
              .join('\n'),
          }
        : { name: '未找到', text: '' };
    }
    if (type === 'event') {
      const e = (
        await pool.query('SELECT payload FROM events WHERE world_id=$1 AND id=$2', [w.id, id])
      ).rows[0]?.payload;
      if (!e) return { name: '因果记录', text: '没有找到对应的已提交事件。' };
      const parents = (
        await pool.query(
          'SELECT payload FROM events WHERE world_id=$1 AND id=ANY($2::text[]) ORDER BY cursor',
          [w.id, e.causeIds.slice(-8)],
        )
      ).rows.map((row) => row.payload);
      return {
        name: '因果记录',
        text: [e.text, ...parents.map((p) => `← ${p.text}`)].join('\n'),
        sourceUrl: e.data.sourceUrl,
      };
    }
    return { name: '历史记录', text: '所有经历均来自已提交的世界事件。' };
  });
  app.get('/api/archives', async () => ({
    archives: (
      await pool.query(
        "SELECT id,state->>'month' AS month,state->>'epoch' AS epoch,state->>'terminalReason' AS reason FROM worlds WHERE status='archived' ORDER BY created_at DESC",
      )
    ).rows,
  }));
  app.get('/api/stream', async (req, reply) => {
    const query = req.query as any;
    const worldId = String(query.worldId ?? '');
    const rawEvents = query.events === '1';
    let cursor = Math.max(0, Number(req.headers['last-event-id'] ?? query.cursor) || 0);
    reply.hijack();
    reply.raw.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    });
    reply.raw.write(': connected\n\n');
    let closed = false,
      busy = false;
    const poll = async () => {
      if (closed || busy) return;
      busy = true;
      try {
        if (rawEvents) {
          const rows = (
            await pool.query(
              "SELECT cursor,payload,world_id FROM outbox WHERE cursor>$1 AND ($2='' OR world_id=$2) ORDER BY cursor LIMIT 100",
              [cursor, worldId],
            )
          ).rows;
          for (const row of rows) {
            cursor = Number(row.cursor);
            reply.raw.write(
              `id: ${cursor}\nevent: world\ndata: ${JSON.stringify({ ...row.payload, cursor })}\n\n`,
            );
          }
          if (!rows.length) reply.raw.write(': heartbeat\n\n');
        } else {
          // A single simulation commit can insert thousands of outbox rows.
          // The browser only needs to know that the canonical world advanced,
          // then it can request the person, map and narrative views once.
          const summary = (
            await pool.query(
              `SELECT max(cursor) AS cursor, count(*)::int AS count,
                      max((payload->>'month')::int) AS month
                 FROM outbox WHERE cursor>$1 AND ($2='' OR world_id=$2)`,
              [cursor, worldId],
            )
          ).rows[0];
          if (summary?.cursor) {
            cursor = Number(summary.cursor);
            const clock = worldId
              ? (
                  await pool.query(
                    "SELECT revision,status,state->>'terminalReason' AS terminal_reason,state->>'month' AS month FROM worlds WHERE id=$1",
                    [worldId],
                  )
                ).rows[0]
              : undefined;
            reply.raw.write(
              `id: ${cursor}\nevent: world\ndata: ${JSON.stringify({
                cursor,
                month: Number(clock?.month ?? summary.month ?? 0),
                revision: Number(clock?.revision ?? 0),
                status: clock?.status,
                terminalReason: clock?.terminal_reason,
                count: Number(summary.count),
              })}\n\n`,
            );
          } else {
            reply.raw.write(': heartbeat\n\n');
          }
        }
      } catch {
        if (!closed) {
          reply.raw.write('event: retry\ndata: {}\n\n');
          closed = true;
          clearInterval(timer);
          reply.raw.end();
        }
      } finally {
        busy = false;
      }
    };
    const timer = setInterval(poll, 1500);
    req.raw.on('close', () => {
      closed = true;
      clearInterval(timer);
    });
    await poll();
  });
  if (existsSync(resolve('dist'))) {
    app.register(staticFiles, { root: resolve('dist'), prefix: '/' });
    app.setNotFoundHandler((req, reply) =>
      req.url.startsWith('/api/')
        ? reply.code(404).send({ error: '接口不存在' })
        : reply.sendFile('index.html'),
    );
  }
  return app;
}
if (process.argv[1]?.endsWith('apps/api/index.ts')) {
  await migrate();
  const app = makeApi();
  await app.listen({ port: Number(process.env.PORT ?? 3001), host: '0.0.0.0' });
  for (const signal of ['SIGINT', 'SIGTERM'] as const)
    process.on(signal, async () => {
      app.server.closeAllConnections();
      await app.close();
      await pool.end();
      process.exit(0);
    });
}
