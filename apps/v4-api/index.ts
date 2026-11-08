import Fastify from 'fastify';
import cookie from '@fastify/cookie';
import rateLimit from '@fastify/rate-limit';
import staticFiles from '@fastify/static';
import { createHash, randomBytes, randomUUID, scryptSync, timingSafeEqual } from 'node:crypto';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { z } from 'zod';
import { pool } from '../../packages/storage/index.js';
import {
  activeV4WorldMeta,
  createV4BirthRequest,
  decodeV4PersonCursor,
  getV4BirthRequest,
  latestV4WorldMeta,
  migrateV4,
  recentV4Events,
  v4EventDetail,
  v4EventLookups,
  v4PersonDetail,
  v4PersonSearch,
  v4PersonSummaries,
  v4PersonSummariesByIds,
  v4WorldIndex,
  V4CursorError,
  V4_PERSON_PAGE_DEFAULT,
  V4_PERSON_PAGE_MAX,
  type V4BirthRequest,
  type V4EventLookups,
  type V4PersonSummaryRecord,
} from '../../packages/v4/store.js';
import { macroProposalSummary, v4MacroState } from '../../packages/v4/macro-store.js';
import { ageAt, type EventFact, type Person, type WorldState } from '../../packages/v4/domain.js';
import {
  VIENNA_1912_CHRONICLE,
  VIENNA_1912_SCENES,
} from '../../packages/v4/content/vienna-1912.js';
import { VIENNA_FAMILY_RUNTIME_SCENES } from '../../packages/v4/content/vienna-family.js';
import {
  GENERATED_SCENES,
  GENERATED_TASKS,
  ALL_EVENT_SCENES,
  ALL_TASKS,
} from '../../packages/v4/content/generated/index.js';
import { VIENNA_LIFE_SCENES } from '../../packages/v4/content/vienna-life.js';
import {
  VIENNA_POSTWAR_CHRONICLE,
  VIENNA_POSTWAR_SCENES,
} from '../../packages/v4/content/vienna-postwar.js';
import { VIENNA_HISTORY_SCENES } from '../../packages/v4/content/vienna-history.js';
import { buildLifePassages } from '../../packages/v4/passages.js';
import { VIENNA_DEVELOPMENT_SCENES } from '../../packages/v4/content/vienna-developments.js';

const sha = (value: string) => createHash('sha256').update(value).digest('hex');
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

const Appearance = z
  .object({
    skin: z.number().int().min(0).max(15),
    hair: z.number().int().min(0).max(15),
    clothes: z.number().int().min(0).max(15),
    doll: z.record(z.string(), z.unknown()).optional(),
  })
  .strict();

const WorldQuery = z.object({
  limit: z.coerce.number().int().min(1).max(V4_PERSON_PAGE_MAX).default(V4_PERSON_PAGE_DEFAULT),
  cursor: z.string().min(1).max(512).optional(),
});

const SearchQuery = z.object({
  q: z.string().max(200).optional(),
});

const BirthInput = z
  .object({
    name: z.string().trim().min(1).max(32),
    sex: z.enum(['female', 'male', 'intersex']),
    health: z.number().min(0.2).max(1),
    body: z.string().max(300).optional(),
    wish: z.string().trim().min(1).max(1000),
    lifeMode: z.enum(['ordinary', 'legendary']).default('ordinary'),
    appearance: Appearance,
  })
  .strict();

export function makeV4Api() {
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
  app.setErrorHandler((err, req, reply) => {
    const error = err as Error & { statusCode?: number };
    if (error instanceof z.ZodError)
      return reply.code(400).send({
        error: '输入格式不正确',
        details: error.issues.map((issue) => ({ path: issue.path, message: issue.message })),
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

  app.get('/api/health', async () => {
    await pool.query('SELECT 1');
    return { ok: true, world: (await activeV4WorldMeta())?.id ?? null };
  });

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
      } catch (error) {
        if ((error as any).code === '23505') return reply.code(409).send({ error: '用户名已存在' });
        throw error;
      }
      await createSession(reply, id);
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
      await createSession(reply, row.id);
      return { id: row.id, username: row.username };
    },
  );

  async function createSession(reply: any, userId: string) {
    const token = randomBytes(32).toString('hex');
    await pool.query("INSERT INTO sessions VALUES($1,$2,now()+interval '30 days')", [
      sha(token),
      userId,
    ]);
    reply.setCookie('session', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.COOKIE_SECURE === 'true',
      path: '/',
      maxAge: 30 * 86400,
    });
  }

  app.post('/api/auth/logout', async (req, reply) => {
    if (req.cookies.session)
      await pool.query('DELETE FROM sessions WHERE token_hash=$1', [sha(req.cookies.session)]);
    reply.clearCookie('session', { path: '/' });
    return { ok: true };
  });

  app.get('/api/auth/me', async (req) => {
    const u = await user(req);
    if (!u) return { user: null, persons: [] };
    const people = (
      await pool.query(
        "SELECT p.payload FROM v4_persons p JOIN v4_worlds w ON w.id=p.world_id WHERE w.status='running' AND p.payload->>'ownerId'=$1",
        [u.id],
      )
    ).rows.map((row) => row.payload as Person);
    return {
      user: u,
      persons: people.map((person) => ({
        id: person.id,
        name: person.name,
        worldId: (person as any).worldId,
        born: person.born,
        died: person.died,
      })),
    };
  });

  app.get('/api/v4/world', async (req, reply) => {
    const query = WorldQuery.parse(req.query);
    const meta = await latestV4WorldMeta();
    if (!meta) return reply.code(404).send({ error: 'v4 世界尚未启动' });
    if (query.cursor) {
      try {
        decodeV4PersonCursor(query.cursor);
      } catch (error) {
        if (error instanceof V4CursorError)
          return reply.code(400).send({ error: '人物分页游标无效' });
        throw error;
      }
    }
    let page: Awaited<ReturnType<typeof v4PersonSummaries>>;
    try {
      page = await v4PersonSummaries(meta.id, { limit: query.limit, cursor: query.cursor });
    } catch (error) {
      if (error instanceof V4CursorError)
        return reply.code(400).send({ error: '人物分页游标无效' });
      throw error;
    }
    const [viewer, index, recent] = await Promise.all([
      user(req),
      v4WorldIndex(meta.id),
      recentV4Events(meta.id, 100),
    ]);
    const publicEvents = recent.filter((event) => event.visibility === 'public');
    const lookups = await v4EventLookups(meta.id, publicEvents);
    return {
      id: meta.id,
      date: meta.date,
      status: meta.status,
      terminalReason: meta.terminalReason,
      revision: meta.revision,
      pressures: meta.pressures,
      places: index?.places ?? [],
      organizations: index?.organizations ?? [],
      people: await (async () => {
        const tags = await activePersonStateTags(meta.id, page.people.map((person) => person.id));
        return page.people.map((person) => publicPerson(meta.date, person, viewer?.id, undefined, tags.get(person.id) ?? []));
      })(),
      peopleTotal: page.total,
      peopleAlive: page.alive,
      householdCount: index?.householdCount ?? 0,
      peopleLimit: query.limit,
      peopleNextCursor: page.nextCursor ?? null,
      peopleHasMore: Boolean(page.nextCursor),
      recentEvents: publicEvents.map((event) =>
        projectEvent(event, lookups, meta.macro?.developments),
      ),
      chronicle: [...VIENNA_1912_CHRONICLE, ...VIENNA_POSTWAR_CHRONICLE]
        .filter(
          (entry) =>
            entry.date.year < meta.date.year ||
            (entry.date.year === meta.date.year && entry.date.month <= meta.date.month),
        )
        .sort((a, b) => a.date.year - b.date.year || a.date.month - b.date.month),
      macro: meta.macro
        ? {
            version: meta.macro.version,
            updatedAt: meta.macro.updatedAt,
            regions: Object.values(meta.macro.regions).map((region) => ({
              id: region.id,
              name: region.name,
              effectiveFrom: region.effectiveFrom,
              effectiveTo: region.effectiveTo,
              parameters: region.parameters,
            })),
            population: meta.macro.population,
            legacy: Object.values(meta.macro.legacy ?? {})
              .filter((legacy) => legacy.status === 'active')
              .map((legacy) => ({
                id: legacy.id,
                processId: legacy.processId,
                kind: legacy.kind,
                title: legacy.title,
                description: legacy.description,
                regionId: legacy.regionId,
                started: legacy.started,
                tags: legacy.tags,
                eventWeights: legacy.eventWeights,
              })),
            developments: Object.values(meta.macro.developments ?? {})
              .filter((development) => development.historical)
              .map((development) => ({
                id: development.id,
                type: development.type,
                description: development.description,
                status: development.status,
                severity: development.severity,
                organizationId: development.organizationId,
                historical: development.historical
                  ? {
                      kind: development.historical.kind,
                      phase: development.historical.phase,
                      phaseStarted: development.historical.phaseStarted,
                      metrics: development.historical.metrics,
                      objectives: development.historical.objectives,
                      participantCount: Object.keys(development.historical.participants).length,
                      organizations: Object.entries(development.historical.organizationRoles).map(
                        ([id, roles]) => ({ id, roles }),
                      ),
                      outcome: development.historical.outcome,
                      recentHistory: development.historical.history.slice(-4),
                    }
                  : undefined,
              })),
          }
        : null,
    };
  });

  app.get('/api/v4/macro', async (_req, reply) => {
    const meta = await latestV4WorldMeta();
    if (!meta) return reply.code(404).send({ error: 'v4 世界尚未启动' });
    const [state, proposals] = await Promise.all([
      v4MacroState(meta.id),
      macroProposalSummary(meta.id),
    ]);
    if (!state) return reply.code(404).send({ error: '这个世界还没有宏观状态' });
    return { date: meta.date, state, proposals };
  });

  app.get('/api/v4/persons/:id', async (req, reply) => {
    const meta = await latestV4WorldMeta();
    if (!meta) return reply.code(404).send({ error: 'v4 世界尚未启动' });
    const detail = await v4PersonDetail(meta.id, (req.params as any).id);
    if (!detail) return reply.code(404).send({ error: '人物不存在' });
    const [u, macro] = await Promise.all([user(req), v4MacroState(meta.id)]);

    const isOwner = Boolean(u && detail.person.ownerId && detail.person.ownerId === u.id);
    const processMap = macro?.developments;
    const peopleById = Object.fromEntries(detail.people.map((person) => [person.id, person]));
    const relationsById = Object.fromEntries(
      detail.relations.map((relation) => [relation.id, relation]),
    );
    return {
      person: publicPerson(
        meta.date,
        detail.person,
        u?.id,
        detail.place?.name,
        (await activePersonStateTags(meta.id, [detail.person.id])).get(detail.person.id) ?? [],
      ),
      canReadLog: isOwner || !detail.person.ownerId,
      household: detail.household
        ? {
            id: detail.household.id,
            residenceId: detail.household.residenceId,
            sharingRules: detail.household.sharingRules,
            members: detail.household.memberIds
              .map((id) => peopleById[id])
              .filter((member): member is V4PersonSummaryRecord => Boolean(member))
              .map((member) => ({
                id: member.id,
                name: member.name,
                born: member.born,
                age: ageAtDeathOrNow(member, meta.date),
                occupation: member.employment?.occupation,
                relation:
                  member.id === detail.person.id
                    ? '本人'
                    : detail.person.parentIds.includes(member.id)
                      ? '父母'
                      : member.parentIds.includes(detail.person.id)
                        ? '子女'
                        : member.guardianIds.includes(detail.person.id)
                          ? '监护人'
                          : '同住',
                died: member.died,
              })),
          }
        : undefined,
      place: detail.place,
      relationships: detail.person.relationshipIds
        .map((id) => relationsById[id])
        .filter(Boolean)
        .map((relation) => ({
          id: relation.id,
          personId: relation.a === detail.person.id ? relation.b : relation.a,
          name:
            peopleById[relation.a === detail.person.id ? relation.b : relation.a]?.name ??
            '旧日相识',
          kind: relation.kind,
          trust: relation.trust,
          affection: relation.affection,
          obligation: relation.obligation,
        })),
      events: detail.events
        .filter((event) => isOwner || !detail.person.ownerId || event.visibility === 'public')
        .map((event) => projectEvent(event, detail.lookups, processMap)),
      worldEvents: detail.worldEvents
        .filter((event) => event.visibility === 'public')
        .map((event) => projectEvent(event, detail.lookups, processMap)),
      lifePassages: buildLifePassages(
        detail.events.filter(
          (event) => isOwner || !detail.person.ownerId || event.visibility === 'public',
        ),
        { maxPassages: 12 },
      ),
      historicalProcesses: Object.values(macro?.developments ?? {})
        .filter((development) => development.historical?.participants[detail.person.id])
        .map((development) => {
          const participation = development.historical!.participants[detail.person.id]!;
          return {
            id: development.id,
            name: processDisplayName(development),
            description: development.description,
            kind: development.historical!.kind,
            phase: development.historical!.phase,
            outcome: development.historical!.outcome,
            roles: participation.roles,
            influence: participation.influence,
            joinedAt: participation.joinedAt,
            lastEventId: participation.lastEventId,
          };
        }),
      historicalContacts: detail.person.relationshipIds
        .map((id) => detail.relations.find((relation) => relation.id === id))
        .filter((relation): relation is NonNullable<typeof relation> => Boolean(relation))
        .map((relation) => {
          const otherId = relation.a === detail.person.id ? relation.b : relation.a;
          const other = detail.people.find((person) => person.id === otherId);
          return other?.historicalIdentity
            ? {
                id: other.id,
                name: other.name,
                kind: relation.kind,
                trust: relation.trust,
                respect: relation.respect,
                historicalId: other.historicalIdentity.id,
                publicRole: other.historicalIdentity.publicRole,
              }
            : undefined;
        })
        .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry)),
    };
  });

  app.get('/api/v4/events/:id', async (req, reply) => {
    const meta = await latestV4WorldMeta();
    if (!meta) return reply.code(404).send({ error: 'v4 世界尚未启动' });
    const detail = await v4EventDetail(meta.id, (req.params as any).id);
    if (!detail) return reply.code(404).send({ error: '事件不存在' });
    const event = detail.event;
    const [u, macro] = await Promise.all([user(req), v4MacroState(meta.id)]);
    const subject = detail.subject;
    const isOwner = Boolean(u && subject?.ownerId && subject.ownerId === u.id);
    if (event.visibility === 'private' && !isOwner)
      return reply.code(403).send({ error: '这件事没有公开' });
    if (event.visibility === 'participants' && !isOwner) {
      // Only an owner of one of the participants may read a participants-only
      // event. The previous check compared the subject to itself, which made
      // these events effectively public.
      const participants = u
        ? await v4PersonSummariesByIds(
            meta.id,
            event.participants.map((participant) => participant.personId),
          )
        : [];
      const ownsParticipant = participants.some((person) => person.ownerId === u?.id);
      if (!ownsParticipant) return reply.code(403).send({ error: '这件事只在当事人之间流传' });
    }
    return projectEvent(event, detail.lookups, macro?.developments);
  });

  app.get('/api/v4/search', async (req, reply) => {
    const query = SearchQuery.parse(req.query);
    const q = (query.q ?? '').trim();
    if (q.length < 1) return { people: [] };
    const meta = await latestV4WorldMeta();
    if (!meta) return reply.code(404).send({ error: 'v4 世界尚未启动' });
    const [viewer, people] = await Promise.all([user(req), v4PersonSearch(meta.id, q)]);
    return {
      people: people.map((person) => publicPerson(meta.date, person, viewer?.id)),
    };
  });

  app.post(
    '/api/v4/births',
    { config: { rateLimit: { max: 8, timeWindow: '1 hour' } } },
    async (req, reply) => {
      const u = await user(req);
      if (!u) return reply.code(401).send({ error: '请先登录' });
      const data = BirthInput.parse(req.body);
      const active = await activeV4WorldMeta();
      if (!active) return reply.code(409).send({ error: '世界尚未启动' });
      const id = await createV4BirthRequest(active.id, u.id, data);
      return reply.code(202).send({ id, status: 'pending' });
    },
  );

  app.get('/api/v4/births/:id', async (req, reply) => {
    const u = await user(req);
    if (!u) return reply.code(401).send({ error: '请先登录' });
    const row = await getV4BirthRequest((req.params as any).id);
    if (!row || row.user_id !== u.id) return reply.code(404).send({ error: '出生请求不存在' });
    return {
      id: row.id,
      status: row.status,
      childId: row.child_id,
      failure: row.failure,
      name: row.name,
    };
  });

  app.get('/api/v4/stream', async (req, reply) => {
    const query = req.query as any;
    let cursor = Math.max(0, Number(query.cursor) || 0);
    reply.hijack();
    reply.raw.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    });
    reply.raw.write(': connected\n\n');
    let closed = false;
    const poll = async () => {
      if (closed) return;
      try {
        const meta = await activeV4WorldMeta();
        if (meta && meta.revision > cursor) {
          cursor = meta.revision;
          reply.raw.write(
            `id: ${cursor}\nevent: world\ndata: ${JSON.stringify({
              cursor,
              date: meta.date,
              revision: meta.revision,
              status: meta.status,
            })}\n\n`,
          );
        } else reply.raw.write(': heartbeat\n\n');
      } catch {
        if (!closed) reply.raw.write('event: retry\ndata: {}\n\n');
      }
    };
    const timer = setInterval(poll, 1200);
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

const sceneTitles = new Map(
  [
    ...VIENNA_1912_SCENES,
    ...VIENNA_LIFE_SCENES,
    ...VIENNA_POSTWAR_SCENES,
    ...VIENNA_HISTORY_SCENES,
    ...VIENNA_DEVELOPMENT_SCENES,
    ...VIENNA_FAMILY_RUNTIME_SCENES,
    ...ALL_EVENT_SCENES,
    ...ALL_TASKS,
  ].map((scene) => [scene.id, scene.title]),
);

const ACTION_TITLES: Record<string, string> = {
  birth: '出生',
  death: '死亡',
  statistical_death: '死亡',
  statistical_infection: '病倒',
  statistical_recovery: '康复',
  statistical_illness_worsened: '病情反复',
  interaction_response: '回应',
  historical_phase: '历史转折',
  macro_action: '历史行动',
};

/**
 * Stored causes may come from authored English content, statistical Chinese
 * causes, or legacy saves. The log should read in the world's language without
 * rewriting the authoritative event/person record.
 */
const DEATH_CAUSE_LABELS: Record<string, string> = {
  tuberculosis: '肺结核',
  pneumonia: '肺炎',
  'childbirth complications': '产后并发症',
  'postpartum haemorrhage': '产后出血',
  'infant fever and dehydration': '婴儿发热与脱水',
  'fever and dehydration': '发热与脱水',
  violence: '暴力',
  accident: '意外事故',
  war: '战争创伤',
  famine: '饥饿与衰竭',
  old_age: '老年衰竭',
  'old age': '老年衰竭',
  vitality_exhausted: '衰竭',
  'vitality exhausted': '衰竭',
  childbirth: '产后感染与出血',
  infant_diarrhoea: '婴幼儿腹泻与脱水',
  'acute illness': '急性疾病',
};

function deathCauseLabel(cause: string | undefined): string | undefined {
  if (!cause) return undefined;
  return DEATH_CAUSE_LABELS[cause] ?? cause;
}

function ageAtDate(
  born: { year: number; month: number },
  date: { year: number; month: number },
): number {
  const age = date.year - born.year - (date.month < born.month ? 1 : 0);
  return Math.max(0, age);
}

function ageAtDeathOrNow(person: Pick<Person, 'born' | 'died'>, date: WorldState['date']): number {
  return ageAtDate(person.born, person.died ?? date);
}

type ProjectedEventKind = 'birth' | 'death' | 'history' | 'major' | 'ordinary';

type ProjectedEventSegment = {
  type: 'text' | 'person';
  text: string;
  personId?: string;
  name?: string;
  role?: string;
  historical?: boolean;
};

type ProjectedProcessRef = {
  id: string;
  name: string;
  phase?: string;
  description?: string;
};

/**
 * The bounded subset of a macro development that the log projector reads.
 * It is deliberately structural: v4 macro state may be absent for an archived
 * or freshly migrated world, and projection must still work.
 */
type ProjectableProcess = {
  description?: string;
  title?: string;
  name?: string;
  phase?: string;
  status?: string;
  organization?: { name?: string };
  historical?: { phase?: string; outcome?: string; kind?: string };
};

const HISTORICAL_EVENT_ACTIONS = new Set([
  'historical_participation',
  'historical_influence',
  'historical_process',
  'historical_phase',
]);

const HISTORICAL_EFFECT_TYPES = new Set([
  'historical_participation',
  'historical_influence',
  'historical_process',
]);

const PROCESS_KIND_LABELS: Record<string, string> = {
  war_mobilization: '战争动员',
  public_health_crisis: '公共卫生危机',
  social_movement: '社会运动',
  political_repression: '政治压制',
  economic_crisis: '经济危机',
  cultural_movement: '文化运动',
  other: '历史进程',
};

function shortProcessLabel(description: string | undefined, max = 44): string | undefined {
  const text = description?.trim();
  if (!text) return undefined;
  const clause = text.split(/[。；;\n]/)[0]?.trim() || text;
  return clause.length > max ? `${clause.slice(0, max)}…` : clause;
}

function processDisplayName(process: ProjectableProcess | undefined): string {
  const explicit = process?.title?.trim() || process?.name?.trim();
  if (explicit) return explicit;
  const organization = process?.organization?.name?.trim();
  if (organization) return organization;
  const description = shortProcessLabel(process?.description);
  if (description) return description;
  const kind = process?.historical?.kind;
  if (kind) return PROCESS_KIND_LABELS[kind] ?? '历史进程';
  return '历史进程';
}

/**
 * Stable-ID semantic segments. Only the already-recorded participants of this
 * exact event are candidates; nothing is guessed from arbitrary prose. If two
 * participants share a display name the name is left as plain text rather than
 * linking to an ambiguous person.
 */
function buildEventSegments(event: EventFact, lookups: V4EventLookups): ProjectedEventSegment[] {
  const text = typeof event.immediateText === 'string' ? event.immediateText : '';
  if (!text) return [{ type: 'text', text }];

  const nameCounts = new Map<string, number>();
  for (const participant of event.participants) {
    const name = lookups.personNames[participant.personId];
    if (!name) continue;
    nameCounts.set(name, (nameCounts.get(name) ?? 0) + 1);
  }

  const candidates = new Map<string, { personId: string; role: string; historical: boolean }>();
  for (const participant of event.participants) {
    const name = lookups.personNames[participant.personId];
    if (!name || nameCounts.get(name) !== 1) continue;
    candidates.set(name, {
      personId: participant.personId,
      role: participant.role,
      historical: Boolean(lookups.personHistorical[participant.personId]),
    });
  }
  if (candidates.size === 0) return [{ type: 'text', text }];

  // Longest names first so "Anna Huber" wins over a participant called "Anna".
  const names = [...candidates.keys()].sort((a, b) => b.length - a.length);
  const taken = new Uint8Array(text.length);
  const hits: {
    start: number;
    end: number;
    personId: string;
    name: string;
    role: string;
    historical: boolean;
  }[] = [];
  for (const name of names) {
    const person = candidates.get(name)!;
    let index = text.indexOf(name);
    while (index >= 0) {
      let free = true;
      for (let offset = 0; offset < name.length; offset += 1) {
        if (taken[index + offset]) {
          free = false;
          break;
        }
      }
      if (free) {
        for (let offset = 0; offset < name.length; offset += 1) taken[index + offset] = 1;
        hits.push({
          start: index,
          end: index + name.length,
          personId: person.personId,
          name,
          role: person.role,
          historical: person.historical,
        });
      }
      index = text.indexOf(name, index + 1);
    }
  }
  if (hits.length === 0) return [{ type: 'text', text }];

  hits.sort((a, b) => a.start - b.start);
  const segments: ProjectedEventSegment[] = [];
  let cursor = 0;
  for (const hit of hits) {
    if (hit.start > cursor) segments.push({ type: 'text', text: text.slice(cursor, hit.start) });
    segments.push({
      type: 'person',
      text: text.slice(hit.start, hit.end),
      personId: hit.personId,
      name: hit.name,
      role: hit.role,
      historical: hit.historical,
    });
    cursor = hit.end;
  }
  if (cursor < text.length) segments.push({ type: 'text', text: text.slice(cursor) });
  return segments;
}

function projectProcessRefs(
  event: EventFact,
  processes?: Record<string, ProjectableProcess>,
): ProjectedProcessRef[] | undefined {
  const refs = new Map<string, ProjectedProcessRef>();
  for (const effect of event.effects) {
    if (!HISTORICAL_EFFECT_TYPES.has(effect.type)) continue;
    let processId: string | undefined;
    let effectTitle: string | undefined;
    let effectDescription: string | undefined;
    if (effect.type === 'historical_participation' || effect.type === 'historical_influence') {
      processId = effect.processId;
    } else if (effect.type === 'historical_process') {
      processId = effect.process?.id ?? (effect as { processId?: string }).processId;
      effectTitle = effect.process?.title;
      effectDescription = effect.process?.description;
    }
    if (!processId) continue;

    const process = processes?.[processId];
    const previous = refs.get(processId);
    const phase = process?.historical?.phase ?? process?.phase ?? previous?.phase;
    const description = process?.description ?? effectDescription ?? previous?.description;
    refs.set(processId, {
      id: processId,
      name: effectTitle?.trim() || previous?.name || processDisplayName(process),
      ...(phase ? { phase } : {}),
      ...(description ? { description } : {}),
    });
  }
  return refs.size > 0 ? [...refs.values()] : undefined;
}

function projectedEventKind(event: EventFact): ProjectedEventKind {
  if (event.action === 'birth') return 'birth';
  if (event.action === 'death' || event.action === 'statistical_death') return 'death';
  if (
    HISTORICAL_EVENT_ACTIONS.has(event.action) ||
    event.effects.some((effect) => HISTORICAL_EFFECT_TYPES.has(effect.type))
  )
    return 'history';
  if (event.significance >= 0.7) return 'major';
  return 'ordinary';
}

function projectedEffectDescription(effect: EventFact['effects'][number]): string {
  if ('reason' in effect && typeof effect.reason === 'string' && effect.reason.length > 0) {
    return effect.reason;
  }
  switch (effect.type) {
    case 'cash':
      return `现金 ${effect.amount}`;
    case 'health':
      return `健康 ${effect.amount}`;
    case 'role':
      return `${effect.add ? '获得' : '失去'}角色 ${effect.role}`;
    case 'flag':
      return `${effect.add ? '记录' : '清除'} ${effect.flag}`;
    case 'employment':
      return `受雇为 ${effect.occupation}`;
    case 'unemployment':
      return '失业';
    case 'relation':
      return `建立 ${effect.kind} 关系`;
    case 'relation_end':
      return `结束 ${effect.kind} 关系`;
    case 'move':
      return '迁移';
    case 'household':
      return '家庭变更';
    case 'residence':
      return '迁居';
    case 'death':
      return `死亡：${effect.cause}`;
    default:
      return effect.type;
  }
}

function projectedIncidentTrace(event: EventFact, lookups: V4EventLookups) {
  const [scenePart, outcomeId = ''] = event.action.split('/');
  const [kernelId, contextId, milieuId, variantId] = scenePart.split('::');
  const placeName = event.placeId ? lookups.placeNames[event.placeId] : undefined;
  return {
    mechanism: {
      sceneId: scenePart,
      outcomeId,
      ...(contextId ? { kernelId, contextId, milieuId } : {}),
      ...(variantId ? { variantId } : {}),
    },
    ...(event.placeId && placeName
      ? { place: { id: event.placeId, name: placeName, kind: 'other' } }
      : {}),
    subject: {
      id: event.subjectId,
      name: lookups.personNames[event.subjectId] ?? event.subjectId,
      roles: [],
    },
    participants: event.participants.map((participant) => ({
      personId: participant.personId,
      role: participant.role,
      name: lookups.personNames[participant.personId] ?? participant.personId,
      ...(participant.organizationId ? { organizationId: participant.organizationId } : {}),
    })),
    ...(event.title ? { conflict: event.title } : {}),
    effects: event.effects.map((effect) => ({
      type: effect.type,
      description: projectedEffectDescription(effect),
    })),
  };
}

function projectEvent(
  event: EventFact,
  lookups: V4EventLookups,
  processes?: Record<string, ProjectableProcess>,
) {
  const sceneId = event.sceneId ? lookups.sceneIdByInstance[event.sceneId] : undefined;
  const sceneTitle = sceneId ? sceneTitles.get(sceneId) : undefined;
  const title =
    sceneTitle ??
    event.title ??
    ACTION_TITLES[event.action] ??
    (event.provenance.kind === 'birth' ? '出生' : undefined) ??
    (event.provenance.kind === 'scene' || event.provenance.kind === 'system'
      ? '生活记录'
      : undefined);
  const processRefs = projectProcessRefs(event, processes);
  const trace = event.trace ?? projectedIncidentTrace(event, lookups);
  return {
    ...event,
    trace,
    title,
    kind: projectedEventKind(event),
    major: event.significance >= 0.7,
    placeName: event.placeId ? lookups.placeNames[event.placeId] : undefined,
    people: event.participants.map((participant) => ({
      id: participant.personId,
      name: lookups.personNames[participant.personId] ?? '无名',
      role: participant.role,
    })),
    segments: buildEventSegments(event, lookups),
    ...(processRefs ? { processRefs } : {}),
  };
}

async function activePersonStateTags(worldId: string, personIds: string[]): Promise<Map<string, string[]>> {
  if (personIds.length === 0) return new Map();
  const rows = await pool.query(
    `SELECT owner_id, definition_id FROM v4_states
     WHERE world_id=$1 AND owner_type='person' AND active=true AND owner_id = ANY($2::text[])`,
    [worldId, personIds],
  );
  const map = new Map<string, string[]>();
  for (const row of rows.rows as { owner_id: string; definition_id: string }[]) {
    const list = map.get(row.owner_id) ?? [];
    list.push(row.definition_id);
    map.set(row.owner_id, list);
  }
  return map;
}

function publicPerson(
  date: WorldState['date'],
  person: V4PersonSummaryRecord,
  ownerId?: string,
  placeName?: string,
  stateTags: string[] = [],
) {
  const employment = person.employment;
  // Dead people keep the age at which they died. The world clock must not turn
  // a 1927 death into a 129-year-old in 1980.
  const age = ageAtDeathOrNow(person, date);
  const roleOccupation = person.roles.includes('writer')
    ? '作家'
    : person.roles.includes('physician')
      ? '医生'
      : person.roles.includes('dramatist')
        ? '剧作家'
        : person.roles.includes('official') || person.roles.includes('beamter')
          ? '官员'
          : person.roles.includes('artist')
            ? '艺术家'
            : undefined;
  const occupation =
    employment?.occupation ??
    (age < 6
      ? '幼儿'
      : age >= 65
        ? '退休者'
        : roleOccupation ??
          (age < 25 &&
          ['primary', 'secondary', 'apprenticeship', 'higher'].includes(person.education.status)
            ? '学生'
            : age >= 16
              ? '无固定职业'
              : '孩童'));
  return {
    id: person.id,
    name: person.name,
    sex: person.sex,
    owner: Boolean(ownerId && person.ownerId && person.ownerId === ownerId),
    ownedByAnother: Boolean(ownerId && person.ownerId && person.ownerId !== ownerId),
    born: person.born,
    died: person.died,
    deathCause: deathCauseLabel(person.deathCause),
    age,
    locationId: person.locationId,
    locationName: placeName ?? person.placeName,
    occupation,
    householdId: person.householdId,
    health: {
      vitality: person.health.vitality,
      conditions: person.health.conditions,
      nutrition: person.health.nutrition,
    },
    education: person.education,
    roles: person.roles.filter((role) => !(age >= 12 && (role === 'infant' || role === 'child'))),
    lifeContract:
      ownerId !== undefined && person.ownerId === ownerId ? person.lifeContract : undefined,
    historical: person.historicalIdentity ?? undefined,
    agency: person.agency ?? undefined,
    mood: person.life?.mood ?? 0,
    flags: person.life?.flags ?? [],
    stateTags,
    appearance: person.appearance ?? { skin: 1, hair: 0, clothes: 2, doll: { bodyType: 'female' } },
  };
}

if (process.argv[1]?.endsWith('apps/v4-api/index.ts')) {
  await migrateV4();
  const app = makeV4Api();
  await app.listen({ port: Number(process.env.PORT ?? 3001), host: '0.0.0.0' });
  for (const signal of ['SIGINT', 'SIGTERM'] as const)
    process.on(signal, async () => {
      app.server.closeAllConnections();
      await app.close();
      await pool.end();
      process.exit(0);
    });
}
