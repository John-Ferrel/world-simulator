import { readFile } from 'node:fs/promises';
import { migrate as migrateBase, pool } from '../storage/index.js';
import type { EventFact, Household, Person, Place, Relation, WorldState } from './domain.js';
import { defaultMacroState, type MacroState } from './macro.js';

const V4_MIGRATION_VERSION = 6;

/**
 * Apply the v4 schema. The schema is additive and independent of the archived
 * v1-v3 world tables; it does not reuse the flat `worlds.state` document.
 */
export async function migrateV4(): Promise<void> {
  // v4 is additive but still needs the base users/sessions/schema_migrations
  // tables on a fresh database. This is safe to call repeatedly.
  await migrateBase();
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('SELECT pg_advisory_xact_lock(617336)');
    const exists = (
      await client.query("SELECT to_regclass('schema_migrations') IS NOT NULL AS yes")
    ).rows[0].yes;
    if (!exists) throw new Error('v4 migration requires the base schema');
    const latest = Number(
      (await client.query('SELECT coalesce(max(version),0) AS v FROM schema_migrations')).rows[0].v,
    );
    const migrationFiles: Record<number, string> = {
      3: '003_v4.sql',
      4: '004_v4_birth_contracts.sql',
      5: '005_v4_macro.sql',
      6: '006_v4_runtime_content.sql',
    };
    for (let version = Math.max(3, latest + 1); version <= V4_MIGRATION_VERSION; version += 1) {
      const file = migrationFiles[version];
      if (!file) throw new Error(`v4 migration ${version} is not mapped`);
      const sql = await readFile(
        new URL(`../../infra/migrations/${file}`, import.meta.url),
        'utf8',
      );
      await client.query(sql);
      await client.query(
        'INSERT INTO schema_migrations(version) VALUES($1) ON CONFLICT DO NOTHING',
        [version],
      );
    }
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK').catch(() => undefined);
    throw error;
  } finally {
    client.release();
  }
}

export type V4WorldMeta = {
  id: string;
  seed: string;
  status: 'running' | 'archived';
  revision: number;
  date: { year: number; month: number };
  secondsPerYear: number;
  monthsPerTick: number;
  pressures: Record<string, number>;
  macro?: MacroState;
  historyMeta: WorldState['historyMeta'];
  lastTickAt: number;
  terminalReason?: string;
};

export async function activeV4WorldMeta(): Promise<V4WorldMeta | undefined> {
  const row = (
    await pool.query(
      "SELECT id,seed,status,revision,date_year,date_month,seconds_per_year,months_per_tick,pressures,macro,history_meta,last_tick_at,terminal_reason FROM v4_worlds WHERE status='running' LIMIT 1",
    )
  ).rows[0];
  if (!row) return undefined;
  return {
    id: row.id,
    seed: row.seed,
    status: row.status,
    revision: Number(row.revision),
    date: { year: Number(row.date_year), month: Number(row.date_month) },
    secondsPerYear: Number(row.seconds_per_year),
    monthsPerTick: Number(row.months_per_tick),
    pressures: row.pressures ?? {},
    macro: row.macro && Object.keys(row.macro).length > 0 ? (row.macro as MacroState) : undefined,
    historyMeta: row.history_meta ?? { sequence: 0 },
    lastTickAt: new Date(row.last_tick_at).getTime(),
    terminalReason: row.terminal_reason ?? undefined,
  };
}

export async function v4WorldMeta(id: string): Promise<V4WorldMeta | undefined> {
  const row = (
    await pool.query(
      'SELECT id,seed,status,revision,date_year,date_month,seconds_per_year,months_per_tick,pressures,macro,history_meta,last_tick_at,terminal_reason FROM v4_worlds WHERE id=$1',
      [id],
    )
  ).rows[0];
  if (!row) return undefined;
  return {
    id: row.id,
    seed: row.seed,
    status: row.status,
    revision: Number(row.revision),
    date: { year: Number(row.date_year), month: Number(row.date_month) },
    secondsPerYear: Number(row.seconds_per_year),
    monthsPerTick: Number(row.months_per_tick),
    pressures: row.pressures ?? {},
    macro: row.macro && Object.keys(row.macro).length > 0 ? (row.macro as MacroState) : undefined,
    historyMeta: row.history_meta ?? { sequence: 0 },
    lastTickAt: new Date(row.last_tick_at).getTime(),
    terminalReason: row.terminal_reason ?? undefined,
  };
}

async function rows<T>(table: string, worldId: string): Promise<T[]> {
  return (await pool.query(`SELECT payload FROM ${table} WHERE world_id=$1`, [worldId])).rows.map(
    (row) => row.payload as T,
  );
}

export async function loadV4World(worldId: string): Promise<WorldState | undefined> {
  const meta = await v4WorldMeta(worldId);
  if (!meta) return undefined;
  const [
    places,
    households,
    persons,
    organizations,
    positions,
    projects,
    interactions,
    relations,
    knowledge,
    scenes,
    events,
  ] = await Promise.all([
    rows<any>('v4_places', worldId),
    rows<any>('v4_households', worldId),
    rows<any>('v4_persons', worldId),
    rows<any>('v4_organizations', worldId),
    rows<any>('v4_positions', worldId),
    rows<any>('v4_projects', worldId),
    rows<any>('v4_interactions', worldId),
    rows<any>('v4_relations', worldId),
    rows<any>('v4_knowledge', worldId),
    rows<any>('v4_scenes', worldId),
    rows<any>('v4_events', worldId),
  ]);
  const byId = <T extends { id: string }>(values: T[]) =>
    Object.fromEntries(values.map((value) => [value.id, value]));
  return {
    id: worldId,
    seed: meta.seed,
    date: meta.date,
    timePolicy: {
      secondsPerYear: meta.secondsPerYear,
      monthsPerTick: meta.monthsPerTick,
    },
    places: byId(places),
    households: byId(households),
    persons: byId(persons),
    organizations: byId(organizations),
    positions: byId(positions),
    projects: byId(projects),
    interactions: byId(interactions),
    relations: byId(relations),
    knowledge: byId(knowledge),
    scenes,
    events: events.sort(
      (a, b) =>
        (a.date?.year ?? 0) - (b.date?.year ?? 0) || (a.date?.month ?? 0) - (b.date?.month ?? 0),
    ),
    pressures: meta.pressures,
    ...(meta.macro ? { macro: meta.macro } : {}),
    historyMeta: meta.historyMeta,
    status: meta.status,
    terminalReason: meta.terminalReason,
  } as WorldState;
}

/** Load the full v4 world without going through the old JSON world cache. */
export async function loadActiveV4World(): Promise<
  { world: WorldState; meta: V4WorldMeta } | undefined
> {
  const meta = await activeV4WorldMeta();
  if (!meta) return undefined;
  const world = await loadV4World(meta.id);
  if (!world) return undefined;
  return { world: { ...world, status: meta.status, terminalReason: meta.terminalReason }, meta };
}

/** Active world if present, otherwise the most recent archive (read-only). */
export async function latestV4World(): Promise<
  { world: WorldState; meta: V4WorldMeta } | undefined
> {
  const row = (
    await pool.query(
      `SELECT id FROM v4_worlds
       ORDER BY (status='running') DESC, created_at DESC
       LIMIT 1`,
    )
  ).rows[0];
  if (!row) return undefined;
  const meta = await v4WorldMeta(row.id);
  if (!meta) return undefined;
  const world = await loadV4World(row.id);
  if (!world) return undefined;
  return { world: { ...world, status: meta.status, terminalReason: meta.terminalReason }, meta };
}

/**
 * Read-path projections.
 *
 * The simulator still loads and saves the whole world. The observer API uses
 * these narrower queries so a routine page view does not transfer every
 * person's traits, life state and id arrays. All projections are read-only;
 * they never write world state or consume the world revision.
 */

/** The active world if one is running, otherwise the newest archive. */
export async function latestV4WorldMeta(): Promise<V4WorldMeta | undefined> {
  const row = (
    await pool.query(
      `SELECT id FROM v4_worlds
       ORDER BY (status='running') DESC, created_at DESC
       LIMIT 1`,
    )
  ).rows[0];
  if (!row) return undefined;
  return v4WorldMeta(row.id);
}

/**
 * A person projection used by list, map, search and household members. It
 * keeps the fields the observer renders but drops traits, life, provenance,
 * project ids, relationship ids, knowledge ids and the full employment record.
 */
export type V4PersonSummaryRecord = {
  id: string;
  name: string;
  ownerId?: string;
  sex: Person['sex'];
  born: Person['born'];
  died?: Person['died'];
  deathCause?: string;
  locationId: string;
  householdId: string;
  parentIds: string[];
  guardianIds: string[];
  health: Person['health'];
  education: Person['education'];
  employment?: Pick<NonNullable<Person['employment']>, 'occupation'>;
  roles: string[];
  appearance?: Person['appearance'];
  lifeContract?: Person['lifeContract'];
  /** Resolved in SQL so the API does not need the whole place table. */
  placeName?: string;
};

export type V4PersonPage = {
  people: V4PersonSummaryRecord[];
  /** All persons in the world, alive or dead. */
  total: number;
  alive: number;
  /** Opaque keyset cursor for the next page; absent on the last page. */
  nextCursor?: string;
};

export type V4PlaceSummary = { id: string; name: string; kind: string };
export type V4OrganizationSummary = { id: string; name: string; kind: string };

export type V4WorldIndex = {
  meta: V4WorldMeta;
  peopleTotal: number;
  peopleAlive: number;
  householdCount: number;
  places: V4PlaceSummary[];
  organizations: V4OrganizationSummary[];
};

export type V4PersonCursor = {
  /** 0 = owned by a player (sorted first), 1 = not owned. */
  owned: 0 | 1;
  /** Lower-cased name as ordered by PostgreSQL. */
  name: string;
  id: string;
};

export type V4EventLookups = {
  placeNames: Record<string, string>;
  personNames: Record<string, string>;
  /** Scene instance id -> authored scene id. */
  sceneIdByInstance: Record<string, string>;
};

export type V4PersonDetail = {
  person: Person;
  household?: Household;
  /** Full place row for the person's current location, as the API returns it. */
  place?: Place;
  residence?: Place;
  relations: Relation[];
  events: EventFact[];
  worldEvents: EventFact[];
  people: V4PersonSummaryRecord[];
  lookups: V4EventLookups;
};

export type V4EventDetail = {
  event: EventFact;
  subject?: V4PersonSummaryRecord;
  lookups: V4EventLookups;
};

export const V4_PERSON_PAGE_DEFAULT = 200;
export const V4_PERSON_PAGE_MAX = 500;
export const V4_PERSON_SEARCH_MAX = 30;

export class V4CursorError extends Error {
  constructor() {
    super('invalid v4 person cursor');
    this.name = 'V4CursorError';
  }
}

export function encodeV4PersonCursor(cursor: V4PersonCursor): string {
  return Buffer.from(
    JSON.stringify({ v: 1, o: cursor.owned, n: cursor.name, i: cursor.id }),
    'utf8',
  ).toString('base64url');
}

export function decodeV4PersonCursor(value: string): V4PersonCursor {
  if (typeof value !== 'string' || value.length < 1 || value.length > 512)
    throw new V4CursorError();
  let parsed: any;
  try {
    parsed = JSON.parse(Buffer.from(value, 'base64url').toString('utf8'));
  } catch {
    throw new V4CursorError();
  }
  if (
    !parsed ||
    typeof parsed !== 'object' ||
    parsed.v !== 1 ||
    (parsed.o !== 0 && parsed.o !== 1) ||
    typeof parsed.n !== 'string' ||
    typeof parsed.i !== 'string' ||
    parsed.n.length > 200 ||
    parsed.i.length > 200
  )
    throw new V4CursorError();
  return { owned: parsed.o, name: parsed.n, id: parsed.i };
}

export function normalizeV4PersonLimit(value: unknown): number {
  const limit = value === undefined || value === null ? V4_PERSON_PAGE_DEFAULT : Number(value);
  if (!Number.isInteger(limit) || limit < 1 || limit > V4_PERSON_PAGE_MAX)
    throw new RangeError(`person limit must be an integer between 1 and ${V4_PERSON_PAGE_MAX}`);
  return limit;
}

const PERSON_SUMMARY_COLUMNS = `
  p.id AS id,
  p.payload->>'name' AS name,
  p.payload->>'ownerId' AS owner_id,
  p.payload->>'sex' AS sex,
  p.payload->'born' AS born,
  p.payload->'died' AS died,
  p.payload->>'deathCause' AS death_cause,
  p.payload->>'locationId' AS location_id,
  p.payload->>'householdId' AS household_id,
  p.payload->'parentIds' AS parent_ids,
  p.payload->'guardianIds' AS guardian_ids,
  p.payload->'health' AS health,
  p.payload->'education' AS education,
  p.payload #>> '{employment,occupation}' AS employment_occupation,
  p.payload->'roles' AS roles,
  p.payload->'appearance' AS appearance,
  p.payload->'lifeContract' AS life_contract,
  pl.payload->>'name' AS place_name,
  lower(p.payload->>'name') AS sort_name,
  CASE WHEN p.payload->>'ownerId' IS NOT NULL THEN 0 ELSE 1 END AS owned
`;

const PERSON_SUMMARY_FROM = `
  FROM v4_persons p
  LEFT JOIN v4_places pl ON pl.world_id=p.world_id AND pl.id=p.payload->>'locationId'
`;

const PERSON_SUMMARY_ORDER = `
  ORDER BY CASE WHEN p.payload->>'ownerId' IS NOT NULL THEN 0 ELSE 1 END,
           lower(p.payload->>'name'),
           p.id
`;

function personSummaryFromRow(row: any): V4PersonSummaryRecord {
  return {
    id: row.id,
    name: row.name,
    ownerId: row.owner_id ?? undefined,
    sex: row.sex as Person['sex'],
    born: row.born,
    died: row.died ?? undefined,
    deathCause: row.death_cause ?? undefined,
    locationId: row.location_id,
    householdId: row.household_id,
    parentIds: Array.isArray(row.parent_ids) ? row.parent_ids : [],
    guardianIds: Array.isArray(row.guardian_ids) ? row.guardian_ids : [],
    health: row.health,
    education: row.education,
    employment: row.employment_occupation ? { occupation: row.employment_occupation } : undefined,
    roles: Array.isArray(row.roles) ? row.roles : [],
    appearance: row.appearance ?? undefined,
    lifeContract: row.life_contract ?? undefined,
    placeName: row.place_name ?? undefined,
  };
}

/**
 * One keyset page of person summaries. Player-owned people sort first so a
 * logged-in observer's own character is present even when the first page is
 * smaller than the world; inside each group the order is name, id.
 */
export async function v4PersonSummaries(
  worldId: string,
  options: { limit?: number; cursor?: string } = {},
): Promise<V4PersonPage> {
  const limit = normalizeV4PersonLimit(options.limit);
  const cursor = options.cursor ? decodeV4PersonCursor(options.cursor) : undefined;
  const params: unknown[] = [worldId];
  let where = 'p.world_id=$1';
  if (cursor) {
    params.push(cursor.owned, cursor.name, cursor.id);
    where += ` AND (
      CASE WHEN p.payload->>'ownerId' IS NOT NULL THEN 0 ELSE 1 END,
      lower(p.payload->>'name'),
      p.id
    ) > ($2::int, $3::text, $4::text)`;
  }
  params.push(limit + 1);
  const [page, counts] = await Promise.all([
    pool.query(
      `SELECT ${PERSON_SUMMARY_COLUMNS} ${PERSON_SUMMARY_FROM}
       WHERE ${where}
       ${PERSON_SUMMARY_ORDER}
       LIMIT $${params.length}`,
      params,
    ),
    pool.query(
      `SELECT count(*)::int AS total,
              count(*) FILTER (WHERE payload->>'died' IS NULL)::int AS alive
       FROM v4_persons WHERE world_id=$1`,
      [worldId],
    ),
  ]);
  const rows = page.rows.slice(0, limit);
  const last = rows[rows.length - 1];
  return {
    people: rows.map(personSummaryFromRow),
    total: Number(counts.rows[0]?.total ?? 0),
    alive: Number(counts.rows[0]?.alive ?? 0),
    nextCursor:
      page.rows.length > limit && last
        ? encodeV4PersonCursor({
            owned: Number(last.owned) === 0 ? 0 : 1,
            name: last.sort_name,
            id: last.id,
          })
        : undefined,
  };
}

export async function v4PersonSummariesByIds(
  worldId: string,
  ids: string[],
): Promise<V4PersonSummaryRecord[]> {
  const unique = [...new Set(ids.filter((id) => typeof id === 'string' && id.length > 0))];
  if (unique.length === 0) return [];
  return (
    await pool.query(
      `SELECT ${PERSON_SUMMARY_COLUMNS} ${PERSON_SUMMARY_FROM}
       WHERE p.world_id=$1 AND p.id = ANY($2::text[])`,
      [worldId, unique],
    )
  ).rows.map(personSummaryFromRow);
}

export async function v4PersonSearch(
  worldId: string,
  query: string,
  limit = V4_PERSON_SEARCH_MAX,
): Promise<V4PersonSummaryRecord[]> {
  const term = query.trim();
  if (term.length === 0) return [];
  const size = Math.max(1, Math.min(V4_PERSON_SEARCH_MAX, Math.floor(limit)));
  return (
    await pool.query(
      `SELECT ${PERSON_SUMMARY_COLUMNS} ${PERSON_SUMMARY_FROM}
       WHERE p.world_id=$1 AND position(lower($2) in lower(p.payload->>'name')) > 0
       ${PERSON_SUMMARY_ORDER}
       LIMIT $3`,
      [worldId, term, size],
    )
  ).rows.map(personSummaryFromRow);
}

export async function v4PlacesByIds(worldId: string, ids: string[]): Promise<Place[]> {
  const unique = [...new Set(ids.filter((id) => typeof id === 'string' && id.length > 0))];
  if (unique.length === 0) return [];
  return (
    await pool.query('SELECT payload FROM v4_places WHERE world_id=$1 AND id = ANY($2::text[])', [
      worldId,
      unique,
    ])
  ).rows.map((row) => row.payload as Place);
}

/** World counts and the small reference lists the observer needs. */
export async function v4WorldIndex(worldId: string): Promise<V4WorldIndex | undefined> {
  const meta = await v4WorldMeta(worldId);
  if (!meta) return undefined;
  const [counts, places, organizations] = await Promise.all([
    pool.query(
      `SELECT
         (SELECT count(*)::int FROM v4_persons WHERE world_id=$1) AS people_total,
         (SELECT count(*)::int FROM v4_persons
          WHERE world_id=$1 AND payload->>'died' IS NULL) AS people_alive,
         (SELECT count(*)::int FROM v4_households WHERE world_id=$1) AS households`,
      [worldId],
    ),
    pool.query(
      `SELECT id, payload->>'name' AS name, payload->>'kind' AS kind
       FROM v4_places WHERE world_id=$1 ORDER BY payload->>'name', id`,
      [worldId],
    ),
    pool.query(
      `SELECT id, payload->>'name' AS name, payload->>'kind' AS kind
       FROM v4_organizations WHERE world_id=$1 ORDER BY payload->>'name', id`,
      [worldId],
    ),
  ]);
  const row = counts.rows[0] ?? {};
  return {
    meta,
    peopleTotal: Number(row.people_total ?? 0),
    peopleAlive: Number(row.people_alive ?? 0),
    householdCount: Number(row.households ?? 0),
    places: places.rows,
    organizations: organizations.rows,
  };
}

/** Name/scene lookups for projecting a bounded set of event facts. */
export async function v4EventLookups(
  worldId: string,
  events: EventFact[],
): Promise<V4EventLookups> {
  const placeIds = new Set<string>();
  const personIds = new Set<string>();
  const sceneIds = new Set<string>();
  for (const event of events) {
    if (event.placeId) placeIds.add(event.placeId);
    if (event.sceneId) sceneIds.add(event.sceneId);
    for (const participant of event.participants) personIds.add(participant.personId);
  }
  const [persons, places, scenes] = await Promise.all([
    personIds.size
      ? pool.query(
          `SELECT id, payload->>'name' AS name FROM v4_persons
           WHERE world_id=$1 AND id = ANY($2::text[])`,
          [worldId, [...personIds]],
        )
      : Promise.resolve({ rows: [] as any[] }),
    placeIds.size
      ? pool.query(
          `SELECT id, payload->>'name' AS name FROM v4_places
           WHERE world_id=$1 AND id = ANY($2::text[])`,
          [worldId, [...placeIds]],
        )
      : Promise.resolve({ rows: [] as any[] }),
    sceneIds.size
      ? pool.query(
          `SELECT id, payload->>'sceneId' AS scene_id FROM v4_scenes
           WHERE world_id=$1 AND id = ANY($2::text[])`,
          [worldId, [...sceneIds]],
        )
      : Promise.resolve({ rows: [] as any[] }),
  ]);
  return {
    placeNames: Object.fromEntries(
      places.rows.filter((row: any) => row.name).map((row: any) => [row.id, row.name]),
    ),
    personNames: Object.fromEntries(
      persons.rows.filter((row: any) => row.name).map((row: any) => [row.id, row.name]),
    ),
    sceneIdByInstance: Object.fromEntries(
      scenes.rows.filter((row: any) => row.scene_id).map((row: any) => [row.id, row.scene_id]),
    ),
  };
}

/**
 * A single person's page data: one full person row plus only that household,
 * their relations, their own event log and the bounded public recent events.
 */
export async function v4PersonDetail(
  worldId: string,
  personId: string,
): Promise<V4PersonDetail | undefined> {
  const personRow = (
    await pool.query('SELECT payload FROM v4_persons WHERE world_id=$1 AND id=$2', [
      worldId,
      personId,
    ])
  ).rows[0];
  if (!personRow) return undefined;
  const person = personRow.payload as Person;
  const relationshipIds = Array.isArray(person.relationshipIds) ? person.relationshipIds : [];
  const [householdRow, relationRows, events, worldEvents] = await Promise.all([
    person.householdId
      ? pool.query('SELECT payload FROM v4_households WHERE world_id=$1 AND id=$2', [
          worldId,
          person.householdId,
        ])
      : Promise.resolve({ rows: [] as any[] }),
    relationshipIds.length
      ? pool.query('SELECT payload FROM v4_relations WHERE world_id=$1 AND id = ANY($2::text[])', [
          worldId,
          relationshipIds,
        ])
      : Promise.resolve({ rows: [] as any[] }),
    v4EventsForPerson(worldId, person.id),
    recentV4Events(worldId, 100),
  ]);
  const household = (householdRow.rows[0]?.payload as Household | undefined) ?? undefined;
  const relations = relationRows.rows.map((row: any) => row.payload as Relation);
  const personIds = new Set<string>([person.id]);
  for (const memberId of household?.memberIds ?? []) personIds.add(memberId);
  for (const relation of relations) {
    personIds.add(relation.a);
    personIds.add(relation.b);
  }
  for (const event of [...events, ...worldEvents])
    for (const participant of event.participants) personIds.add(participant.personId);
  const placeIds = new Set<string>();
  if (person.locationId) placeIds.add(person.locationId);
  if (household?.residenceId) placeIds.add(household.residenceId);
  for (const event of [...events, ...worldEvents]) if (event.placeId) placeIds.add(event.placeId);
  const [people, lookups, places] = await Promise.all([
    v4PersonSummariesByIds(worldId, [...personIds]),
    v4EventLookups(worldId, [...events, ...worldEvents]),
    v4PlacesByIds(worldId, [...placeIds]),
  ]);
  const placeById = Object.fromEntries(places.map((place) => [place.id, place]));
  return {
    person,
    household,
    place: placeById[person.locationId],
    residence: household ? placeById[household.residenceId] : undefined,
    relations,
    events,
    worldEvents,
    people,
    lookups,
  };
}

/** One event plus the subject ownership check the API needs. */
export async function v4EventDetail(
  worldId: string,
  eventId: string,
): Promise<V4EventDetail | undefined> {
  const row = (
    await pool.query('SELECT payload FROM v4_events WHERE world_id=$1 AND id=$2', [
      worldId,
      eventId,
    ])
  ).rows[0];
  if (!row) return undefined;
  const event = row.payload as EventFact;
  const [subjects, lookups] = await Promise.all([
    v4PersonSummariesByIds(worldId, [event.subjectId]),
    v4EventLookups(worldId, [event]),
  ]);
  return { event, subject: subjects[0], lookups };
}

export async function seedV4World(world: WorldState): Promise<V4WorldMeta> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('SELECT pg_advisory_xact_lock(617337)');
    const existing = (await client.query("SELECT id FROM v4_worlds WHERE status='running'"))
      .rows[0];
    if (existing) {
      await client.query('COMMIT');
      return (await v4WorldMeta(existing.id))!;
    }
    await client.query(
      `INSERT INTO v4_worlds(id,seed,status,date_year,date_month,seconds_per_year,months_per_tick,pressures,macro,history_meta,revision,last_tick_at)
       VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,0,now())`,
      [
        world.id,
        world.seed,
        world.status,
        world.date.year,
        world.date.month,
        world.timePolicy.secondsPerYear,
        world.timePolicy.monthsPerTick,
        JSON.stringify(world.pressures),
        JSON.stringify(world.macro ?? defaultMacroState(world)),
        JSON.stringify(world.historyMeta),
      ],
    );
    await writeEntities(client, world);
    await writeFacts(client, world);
    await client.query('COMMIT');
    return (await v4WorldMeta(world.id))!;
  } catch (error) {
    await client.query('ROLLBACK').catch(() => undefined);
    throw error;
  } finally {
    client.release();
  }
}

async function writeEntities(client: any, world: WorldState) {
  const tables: [string, Record<string, any>][] = [
    ['v4_places', world.places],
    ['v4_households', world.households],
    ['v4_persons', world.persons],
    ['v4_organizations', world.organizations],
    ['v4_positions', world.positions],
    ['v4_projects', world.projects],
    ['v4_interactions', world.interactions],
    ['v4_relations', world.relations],
    ['v4_knowledge', world.knowledge],
  ];
  for (const [table, records] of tables) {
    const values = Object.values(records);
    if (values.length === 0) continue;
    await client.query(
      `INSERT INTO ${table}(world_id,id,payload)
       SELECT $1, item->>'id', item FROM jsonb_array_elements($2::jsonb) AS item
       ON CONFLICT(world_id,id) DO UPDATE SET payload=EXCLUDED.payload`,
      [world.id, JSON.stringify(values)],
    );
  }
  if (world.scenes.length)
    await client.query(
      `INSERT INTO v4_scenes(world_id,id,payload)
       SELECT $1,item->>'id',item FROM jsonb_array_elements($2::jsonb) AS item
       ON CONFLICT(world_id,id) DO UPDATE SET payload=EXCLUDED.payload`,
      [world.id, JSON.stringify(world.scenes)],
    );
}

async function writeFacts(client: any, world: WorldState) {
  if (world.events.length === 0) return;
  await client.query(
    `INSERT INTO v4_events(world_id,id,date_year,date_month,subject_id,payload)
     SELECT $1, item->>'id', (item->'date'->>'year')::int,
            (item->'date'->>'month')::int, item->>'subjectId', item
     FROM jsonb_array_elements($2::jsonb) AS item
     ON CONFLICT(world_id,id) DO NOTHING`,
    [world.id, JSON.stringify(world.events)],
  );
}

export async function saveV4World(
  world: WorldState,
  expectedRevision: number,
  options: { lastTickAt?: number } = {},
): Promise<number> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const row = (
      await client.query('SELECT revision,status FROM v4_worlds WHERE id=$1 FOR UPDATE', [world.id])
    ).rows[0];
    if (!row) throw new Error('v4 world missing');
    if (row.status !== 'running') throw new Error('v4 world is not running');
    if (Number(row.revision) !== expectedRevision) throw new Error('v4 world revision changed');
    const revision = expectedRevision + 1;
    await client.query(
      `UPDATE v4_worlds SET revision=$2,status=$3,date_year=$4,date_month=$5,
         pressures=$6,macro=$7,history_meta=$8,terminal_reason=$9,last_tick_at=$10 WHERE id=$1`,
      [
        world.id,
        revision,
        world.status,
        world.date.year,
        world.date.month,
        JSON.stringify(world.pressures),
        JSON.stringify(world.macro ?? {}),
        JSON.stringify(world.historyMeta),
        world.terminalReason ?? null,
        new Date(options.lastTickAt ?? Date.now()),
      ],
    );
    await writeEntities(client, world);
    await writeFacts(client, world);
    await client.query('COMMIT');
    return revision;
  } catch (error) {
    await client.query('ROLLBACK').catch(() => undefined);
    throw error;
  } finally {
    client.release();
  }
}

export type V4BirthRequest = {
  id: string;
  worldId: string;
  userId: string;
  name: string;
  sex: string;
  health: number;
  body?: string;
  appearance: Record<string, unknown>;
  wish: string;
  lifeMode: 'ordinary' | 'legendary';
};

export async function createV4BirthRequest(
  worldId: string,
  userId: string,
  request: Omit<V4BirthRequest, 'id' | 'worldId' | 'userId'>,
): Promise<string> {
  const id = `v4-birth-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
  await pool.query(
    `INSERT INTO v4_birth_requests(id,world_id,user_id,name,sex,health,body,appearance,wish,life_mode)
     VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
    [
      id,
      worldId,
      userId,
      request.name,
      request.sex,
      request.health,
      request.body ?? null,
      JSON.stringify(request.appearance),
      request.wish,
      request.lifeMode,
    ],
  );
  return id;
}

export async function getV4BirthRequest(id: string) {
  return (
    await pool.query(
      'SELECT id,world_id,user_id,name,sex,health,body,appearance,wish,life_mode,status,child_id,failure FROM v4_birth_requests WHERE id=$1',
      [id],
    )
  ).rows[0];
}

export async function pendingV4Births(worldId: string) {
  return (
    await pool.query(
      "SELECT * FROM v4_birth_requests WHERE world_id=$1 AND status='pending' ORDER BY created_at LIMIT 20",
      [worldId],
    )
  ).rows;
}

export async function markV4Birth(
  id: string,
  status: 'born' | 'failed',
  childId?: string,
  failure?: string,
) {
  await pool.query('UPDATE v4_birth_requests SET status=$2,child_id=$3,failure=$4 WHERE id=$1', [
    id,
    status,
    childId ?? null,
    failure ?? null,
  ]);
}

export async function recentV4Events(worldId: string, limit = 40): Promise<EventFact[]> {
  return (
    await pool.query(
      'SELECT payload FROM v4_events WHERE world_id=$1 ORDER BY date_year DESC,date_month DESC LIMIT $2',
      [worldId, limit],
    )
  ).rows.map((row) => row.payload as EventFact);
}

export async function v4EventsForPerson(
  worldId: string,
  personId: string,
  limit = 200,
): Promise<EventFact[]> {
  return (
    await pool.query(
      'SELECT payload FROM v4_events WHERE world_id=$1 AND subject_id=$2 ORDER BY date_year,date_month LIMIT $3',
      [worldId, personId, limit],
    )
  ).rows.map((row) => row.payload as EventFact);
}

/** Archive one v4 world without deleting its entities or event record. */
export async function archiveV4World(worldId: string, reason: string): Promise<void> {
  await pool.query(
    "UPDATE v4_worlds SET status='archived',terminal_reason=$2,revision=revision+1 WHERE id=$1 AND status='running'",
    [worldId, reason],
  );
}

/** Queue the asynchronous reading of a birth wish. The birth already exists. */
export async function enqueueV4BirthContract(
  worldId: string,
  personId: string,
  requestId: string,
): Promise<void> {
  await pool.query(
    `INSERT INTO v4_birth_contracts(id,world_id,person_id,request_id)
     VALUES($1,$2,$3,$4)
     ON CONFLICT(person_id) DO NOTHING`,
    [`v4-contract-${requestId}`, worldId, personId, requestId],
  );
}

/** Reconcile births created before the queue existed or whose enqueue failed. */
export async function enqueueMissingV4BirthContracts(): Promise<void> {
  await pool.query(
    `INSERT INTO v4_birth_contracts(id,world_id,person_id,request_id)
     SELECT 'v4-contract-'||r.id,r.world_id,r.child_id,r.id
     FROM v4_birth_requests r
     JOIN v4_worlds w ON w.id=r.world_id AND w.status='running'
     WHERE r.status='born' AND r.child_id IS NOT NULL
     ON CONFLICT(person_id) DO NOTHING`,
  );
}

export async function claimV4BirthContract(): Promise<
  | {
      id: string;
      world_id: string;
      person_id: string;
      request_id: string;
      attempts: number;
    }
  | undefined
> {
  const row = (
    await pool.query(
      `UPDATE v4_birth_contracts
       SET attempts=attempts+1,updated_at=now()
       WHERE id=(
         SELECT id FROM v4_birth_contracts
         WHERE status='pending'
         ORDER BY created_at
         FOR UPDATE SKIP LOCKED
         LIMIT 1
       ) AND status='pending'
       RETURNING id,world_id,person_id,request_id,attempts`,
    )
  ).rows[0];
  return row;
}

export async function finishV4BirthContract(
  id: string,
  status: 'done' | 'failed' | 'pending',
  options: { model?: string; error?: string } = {},
): Promise<void> {
  await pool.query(
    'UPDATE v4_birth_contracts SET status=$2,model=$3,error=$4,updated_at=now() WHERE id=$1',
    [id, status, options.model ?? null, options.error ?? null],
  );
}

export type V4WishReading = {
  interpretation: string;
  focus: 'education' | 'work' | 'family' | 'faith' | 'politics' | 'health' | 'craft' | 'none';
  traitDeltas: Partial<Record<keyof import('./domain.js').Person['traits'], number>>;
  taboo?: string;
  privateGoal?: string;
  skillDeltas?: Partial<import('./domain.js').PersonLife['skills']>;
  capability?: 'none' | 'literacy' | 'numeracy' | 'craft' | 'social' | 'health';
};

/**
 * Apply the reading to the person and bump the world revision inside one row
 * lock. If the simulator committed a year first, this reads the newest payload;
 * if this commits first, the simulator's stale revision check fails and it
 * retries on the next loop instead of overwriting the reading.
 */
export async function applyV4WishReading(
  worldId: string,
  personId: string,
  reading: V4WishReading,
  model: string,
): Promise<boolean> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const world = (
      await client.query(
        'SELECT revision,date_year,date_month FROM v4_worlds WHERE id=$1 FOR UPDATE',
        [worldId],
      )
    ).rows[0];
    if (!world) throw new Error('world missing');
    const row = (
      await client.query('SELECT payload FROM v4_persons WHERE world_id=$1 AND id=$2 FOR UPDATE', [
        worldId,
        personId,
      ])
    ).rows[0];
    if (!row) throw new Error('person missing');
    const person = row.payload as import('./domain.js').Person;
    if (!person.lifeContract) throw new Error('person has no life contract');
    const traits = { ...person.traits };
    const life = {
      mood: person.life?.mood ?? 0,
      reputation: person.life?.reputation ?? 0,
      skills: {
        literacy: person.life?.skills.literacy ?? 0,
        numeracy: person.life?.skills.numeracy ?? 0,
        craft: person.life?.skills.craft ?? 0,
        social: person.life?.skills.social ?? 0,
      },
      flags: [...(person.life?.flags ?? [])],
    };
    // Birth creation writes a placeholder interpretation; only compiledAt
    // proves that the deltas were already applied.
    const alreadyCompiled = Boolean(person.lifeContract.compiledAt);
    for (const [key, value] of Object.entries(reading.traitDeltas)) {
      if (alreadyCompiled) break;
      if (typeof value !== 'number' || !Number.isFinite(value)) continue;
      const trait = key as keyof typeof traits;
      if (!(trait in traits)) continue;
      traits[trait] = Math.max(
        0,
        Math.min(1, traits[trait] + Math.max(-0.08, Math.min(0.08, value))),
      );
    }
    if (!alreadyCompiled) {
      for (const [key, value] of Object.entries(reading.skillDeltas ?? {})) {
        if (typeof value !== 'number' || !Number.isFinite(value)) continue;
        const skill = key as keyof typeof life.skills;
        if (!(skill in life.skills)) continue;
        life.skills[skill] = Math.max(
          0,
          Math.min(1, life.skills[skill] + Math.max(-0.15, Math.min(0.15, value))),
        );
      }
      if (reading.capability && reading.capability !== 'none')
        life.flags.push(`capability:${reading.capability}`);
    }
    const lifeContract = {
      ...person.lifeContract,
      interpretation: reading.interpretation,
      focus: reading.focus,
      traitDeltas: reading.traitDeltas,
      taboo: reading.taboo,
      privateGoal: reading.privateGoal,
      skillDeltas: reading.skillDeltas,
      capability: reading.capability,
      compiledBy: model,
      compiledAt: { year: Number(world.date_year), month: Number(world.date_month) },
    };
    await client.query('UPDATE v4_persons SET payload=$3 WHERE world_id=$1 AND id=$2', [
      worldId,
      personId,
      JSON.stringify({ ...person, traits, life, lifeContract }),
    ]);
    await client.query('UPDATE v4_worlds SET revision=revision+1 WHERE id=$1', [worldId]);
    await client.query('COMMIT');
    return true;
  } catch (error) {
    await client.query('ROLLBACK').catch(() => undefined);
    throw error;
  } finally {
    client.release();
  }
}
