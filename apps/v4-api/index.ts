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
  getV4BirthRequest,
  latestV4World,
  migrateV4,
  recentV4Events,
  v4EventsForPerson,
  type V4BirthRequest,
} from '../../packages/v4/store.js';
import { ageAt, type EventFact, type Person, type WorldState } from '../../packages/v4/domain.js';
import {
  VIENNA_1912_CHRONICLE,
  VIENNA_1912_SCENES,
} from '../../packages/v4/content/vienna-1912.js';
import { VIENNA_FAMILY_RUNTIME_SCENES } from '../../packages/v4/content/vienna-family.js';
import { GENERATED_SCENES } from '../../packages/v4/content/generated/index.js';
import { VIENNA_LIFE_SCENES } from '../../packages/v4/content/vienna-life.js';

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
    const active = await latestV4World();
    if (!active) return reply.code(404).send({ error: 'v4 世界尚未启动' });
    const { world, meta } = active;
    const viewer = await user(req);
    return {
      id: world.id,
      date: world.date,
      status: world.status,
      terminalReason: world.terminalReason,
      revision: meta.revision,
      pressures: world.pressures,
      places: Object.values(world.places).map((place) => ({
        id: place.id,
        name: place.name,
        kind: place.kind,
      })),
      people: Object.values(world.persons)
        .map((person) => publicPerson(world, person, viewer?.id))
        .sort((a, b) => a.name.localeCompare(b.name)),
      organizations: Object.values(world.organizations).map((org) => ({
        id: org.id,
        name: org.name,
        kind: org.kind,
      })),
      recentEvents: (await recentV4Events(world.id, 100))
        .filter((event: EventFact) => event.visibility === 'public')
        .map((event: EventFact) => projectEvent(world, event)),
      chronicle: VIENNA_1912_CHRONICLE.filter((entry) => entry.date.year <= world.date.year),
    };
  });

  app.get('/api/v4/persons/:id', async (req, reply) => {
    const active = await latestV4World();
    if (!active) return reply.code(404).send({ error: 'v4 世界尚未启动' });
    const { world } = active;
    const person = world.persons[(req.params as any).id];
    if (!person) return reply.code(404).send({ error: '人物不存在' });
    const u = await user(req);
    const isOwner = Boolean(u && person.ownerId && person.ownerId === u.id);
    const household = world.households[person.householdId];
    return {
      person: publicPerson(world, person, u?.id),
      canReadLog: isOwner || !person.ownerId,
      household: household
        ? {
            id: household.id,
            residenceId: household.residenceId,
            sharingRules: household.sharingRules,
            members: household.memberIds
              .map((id) => world.persons[id])
              .filter((member): member is Person => Boolean(member))
              .map((member) => ({
                id: member.id,
                name: member.name,
                age: ageAt(member, world.date),
                occupation: member.employment?.occupation,
                relation:
                  member.id === person.id
                    ? '本人'
                    : person.parentIds.includes(member.id)
                      ? '父母'
                      : member.parentIds.includes(person.id)
                        ? '子女'
                        : member.guardianIds.includes(person.id)
                          ? '监护人'
                          : '同住',
                died: member.died,
              })),
          }
        : undefined,
      place: world.places[person.locationId],
      relationships: person.relationshipIds
        .map((id) => world.relations[id])
        .filter(Boolean)
        .map((relation) => ({
          id: relation.id,
          personId: relation.a === person.id ? relation.b : relation.a,
          name:
            world.persons[relation.a === person.id ? relation.b : relation.a]?.name ?? '旧日相识',
          kind: relation.kind,
          trust: relation.trust,
          affection: relation.affection,
          obligation: relation.obligation,
        })),
      events: (await v4EventsForPerson(world.id, person.id))
        .filter((event: EventFact) => isOwner || !person.ownerId || event.visibility === 'public')
        .map((event: EventFact) => projectEvent(world, event)),
      worldEvents: (await recentV4Events(world.id, 100))
        .filter((event: EventFact) => event.visibility === 'public')
        .map((event: EventFact) => projectEvent(world, event)),
    };
  });

  app.get('/api/v4/events/:id', async (req, reply) => {
    const active = await latestV4World();
    if (!active) return reply.code(404).send({ error: 'v4 世界尚未启动' });
    const event = active.world.events.find((item) => item.id === (req.params as any).id);
    if (!event) return reply.code(404).send({ error: '事件不存在' });
    const u = await user(req);
    const subject = active.world.persons[event.subjectId];
    const isOwner = Boolean(u && subject?.ownerId && subject.ownerId === u.id);
    if (event.visibility === 'private' && !isOwner)
      return reply.code(403).send({ error: '这件事没有公开' });
    if (
      event.visibility === 'participants' &&
      !isOwner &&
      !event.participants.some((p) => p.personId === subject?.id)
    )
      return reply.code(403).send({ error: '这件事只在当事人之间流传' });
    return event;
  });

  app.get('/api/v4/search', async (req, reply) => {
    const active = await latestV4World();
    if (!active) return reply.code(404).send({ error: 'v4 世界尚未启动' });
    const q = String((req.query as any).q ?? '')
      .trim()
      .toLocaleLowerCase();
    if (q.length < 1) return { people: [] };
    const viewer = await user(req);
    return {
      people: Object.values(active.world.persons)
        .filter((person) => person.name.toLocaleLowerCase().includes(q))
        .slice(0, 30)
        .map((person) => publicPerson(active.world, person, viewer?.id)),
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
    ...VIENNA_FAMILY_RUNTIME_SCENES,
    ...GENERATED_SCENES,
  ].map((scene) => [scene.id, scene.title]),
);

function projectEvent(world: WorldState, event: EventFact) {
  const instance = event.sceneId
    ? world.scenes.find((scene) => scene.id === event.sceneId)
    : undefined;
  return {
    ...event,
    title:
      instance && sceneTitles.get(instance.sceneId)
        ? sceneTitles.get(instance.sceneId)
        : event.provenance.kind === 'birth'
          ? '出生'
          : event.action === 'death'
            ? '死亡'
            : undefined,
    placeName: event.placeId ? world.places[event.placeId]?.name : undefined,
    people: event.participants.map((participant) => ({
      id: participant.personId,
      name: world.persons[participant.personId]?.name ?? '无名',
      role: participant.role,
    })),
  };
}

function publicPerson(world: WorldState, person: Person, ownerId?: string) {
  const place = world.places[person.locationId];
  const employment = person.employment;
  const age = ageAt(person, world.date);
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
    deathCause: person.deathCause,
    age,
    locationId: person.locationId,
    locationName: place?.name,
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
