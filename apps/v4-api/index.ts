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
import { GENERATED_SCENES, GENERATED_TASKS } from '../../packages/v4/content/generated/index.js';
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
      people: page.people.map((person) => publicPerson(meta.date, person, viewer?.id)),
      peopleTotal: page.total,
      peopleAlive: page.alive,
      householdCount: index?.householdCount ?? 0,
      peopleLimit: query.limit,
      peopleNextCursor: page.nextCursor ?? null,
      peopleHasMore: Boolean(page.nextCursor),
      recentEvents: publicEvents.map((event) => projectEvent(event, lookups)),
      chronicle: [...VIENNA_1912_CHRONICLE, ...VIENNA_POSTWAR_CHRONICLE]
        .filter((entry) => entry.date.year <= meta.date.year)
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
    const peopleById = Object.fromEntries(detail.people.map((person) => [person.id, person]));
    const relationsById = Object.fromEntries(
      detail.relations.map((relation) => [relation.id, relation]),
    );
    return {
      person: publicPerson(meta.date, detail.person, u?.id, detail.place?.name),
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
        .map((event) => projectEvent(event, detail.lookups)),
      worldEvents: detail.worldEvents
        .filter((event) => event.visibility === 'public')
        .map((event) => projectEvent(event, detail.lookups)),
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
    const u = await user(req);
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
    return event;
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
    ...GENERATED_SCENES,
    ...GENERATED_TASKS,
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

function projectEvent(event: EventFact, lookups: V4EventLookups) {
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
  return {
    ...event,
    title,
    placeName: event.placeId ? lookups.placeNames[event.placeId] : undefined,
    people: event.participants.map((participant) => ({
      id: participant.personId,
      name: lookups.personNames[participant.personId] ?? '无名',
      role: participant.role,
    })),
  };
}

function publicPerson(
  date: WorldState['date'],
  person: V4PersonSummaryRecord,
  ownerId?: string,
  placeName?: string,
) {
  const employment = person.employment;
  // Dead people keep the age at which they died. The world clock must not turn
  // a 1927 death into a 129-year-old in 1980.
  const age = ageAtDeathOrNow(person, date);
  const occupation =
    employment?.occupation ??
    (age < 6
      ? '幼儿'
      : ['primary', 'secondary', 'apprenticeship', 'higher'].includes(person.education.status)
        ? '学生'
        : age >= 16
          ? '无固定职业'
          : '孩童');
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
