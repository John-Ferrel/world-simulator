/**
 * v4 persistence benchmark. Only runs against a dedicated *_test or *_e2e
 * database; it refuses to touch the application database or an archived world.
 *
 * It creates a minimal but named world (one event per person, two kin
 * relations per household) and measures:
 *   - full save (all entities + facts)
 *   - repeated full save
 *   - full load
 *   - world overview (counts + places + organizations)
 *   - person summaries (first 200, then one keyset cursor page)
 *   - one person detail
 *   - name search
 *
 * The benchmark removes only the world it created. It never truncates a
 * database, never touches an archived world and does not claim 20k capacity.
 */
import { performance } from 'node:perf_hooks';
import { pool } from '../packages/storage/index.js';
import {
  loadV4World,
  migrateV4,
  saveV4World,
  v4PersonDetail,
  v4PersonSearch,
  v4PersonSummaries,
  v4WorldIndex,
} from '../packages/v4/store.js';
import type {
  EventFact,
  Household,
  Person,
  Place,
  Relation,
  WorldState,
} from '../packages/v4/domain.js';

const databaseUrl = process.env.DATABASE_URL ?? '';
const databaseName = (() => {
  try {
    return new URL(databaseUrl).pathname.replace(/^\//, '');
  } catch {
    return '';
  }
})();
if (!/_(test|e2e)$/.test(databaseName)) {
  console.error(
    `v4-db-benchmark requires DATABASE_URL with a database name ending in _test or _e2e (got "${databaseName || 'none'}")`,
  );
  process.exit(1);
}

function traits(): Person['traits'] {
  return {
    care: 0.5,
    ambition: 0.5,
    tradition: 0.5,
    openness: 0.5,
    conscientiousness: 0.5,
    extraversion: 0.5,
    agreeableness: 0.5,
    neuroticism: 0.5,
  };
}

function makeWorld(runId: string, count: number): WorldState {
  const places: Record<string, Place> = {
    home: {
      id: 'bench-home',
      name: 'Bench tenement',
      kind: 'home',
      settlementId: 'bench-vienna',
      offers: [],
    },
    workshop: {
      id: 'bench-workshop',
      name: 'Bench printshop',
      kind: 'factory',
      settlementId: 'bench-vienna',
      offers: [],
    },
  };
  const households: Record<string, Household> = {};
  const persons: Record<string, Person> = {};
  const relations: Record<string, Relation> = {};
  const events: EventFact[] = [];
  for (let i = 0; i < count; i += 1) {
    const householdId = `bench-hh-${Math.floor(i / 5)}`;
    households[householdId] ??= {
      id: householdId,
      residenceId: 'bench-home',
      memberIds: [],
      guardianIds: [],
      cash: 10,
      food: 10,
      debt: 0,
      rent: 1,
      obligations: [],
      assets: [],
      sharingRules: 'pooled',
    };
    const id = `bench-p-${i}`;
    const born = { year: 1880 + (i % 20), month: (i % 12) + 1 };
    persons[id] = {
      id,
      name: `Person ${String(i).padStart(5, '0')}`,
      sex: i % 2 === 0 ? 'female' : 'male',
      born,
      locationId: i % 5 === 0 ? 'bench-workshop' : 'bench-home',
      householdId,
      parentIds: [],
      guardianIds: [],
      health: { vitality: 0.8, conditions: [], nutrition: 0.8 },
      traits: traits(),
      education: { status: 'primary', level: 1 },
      roles: [],
      projectIds: [],
      relationshipIds: [],
      knowledgeIds: [],
      life: {
        mood: 0,
        reputation: 0,
        skills: { literacy: 0, numeracy: 0, craft: 0, social: 0 },
        flags: [],
      },
      provenance: { kind: 'initial' },
    };
    households[householdId]!.memberIds.push(id);
    events.push({
      id: `bench-event-${i}`,
      date: { year: 1912, month: 1 },
      placeId: 'bench-home',
      subjectId: id,
      participants: [{ personId: id, role: 'subject' }],
      action: 'bench-life',
      causes: [],
      effects: [],
      immediateText: `Person ${i} lived a measured benchmark year.`,
      significance: 0.1,
      visibility: 'public',
      provenance: { kind: 'system' },
    });
  }
  for (let i = 0; i + 1 < count; i += 5) {
    const a = `bench-p-${i}`;
    const b = `bench-p-${i + 1}`;
    const id = `bench-relation-${i}`;
    relations[id] = {
      id,
      a,
      b,
      kind: 'kin',
      trust: 0.5,
      affection: 0.5,
      obligation: 0.5,
      fear: 0,
      respect: 0.5,
      start: { year: 1900, month: 1 },
      sharedEventIds: [],
    };
    persons[a]!.relationshipIds.push(id);
    persons[b]!.relationshipIds.push(id);
  }
  return {
    id: `db-bench-${count}-${runId}`,
    seed: 'bench',
    date: { year: 1912, month: 1 },
    timePolicy: { secondsPerYear: 30, monthsPerTick: 12 },
    places,
    households,
    persons,
    organizations: {},
    positions: {},
    projects: {},
    interactions: {},
    relations,
    knowledge: {},
    events,
    scenes: [],
    pressures: {},
    historyMeta: { sequence: events.length },
    status: 'running',
  };
}

const heapMB = () => process.memoryUsage().heapUsed / 1024 / 1024;

async function medianMs(run: () => Promise<unknown>, samples = 3): Promise<number> {
  const values: number[] = [];
  for (let i = 0; i < samples; i += 1) {
    const started = performance.now();
    await run();
    values.push(performance.now() - started);
  }
  values.sort((a, b) => a - b);
  return Math.round((values[Math.floor(values.length / 2)] ?? 0) * 100) / 100;
}

async function cleanup(worldId: string): Promise<void> {
  const tables = [
    'v4_birth_contracts',
    'v4_birth_requests',
    'v4_events',
    'v4_scenes',
    'v4_knowledge',
    'v4_relations',
    'v4_interactions',
    'v4_projects',
    'v4_positions',
    'v4_organizations',
    'v4_persons',
    'v4_households',
    'v4_places',
  ];
  for (const table of tables) await pool.query(`DELETE FROM ${table} WHERE world_id=$1`, [worldId]);
  await pool.query('DELETE FROM v4_worlds WHERE id=$1', [worldId]);
}

async function insertWorldMeta(world: WorldState): Promise<void> {
  await pool.query(
    `INSERT INTO v4_worlds(id,seed,status,date_year,date_month,seconds_per_year,months_per_tick,pressures,history_meta,revision,last_tick_at)
     VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,0,now())`,
    [
      world.id,
      world.seed,
      world.status,
      world.date.year,
      world.date.month,
      world.timePolicy.secondsPerYear,
      world.timePolicy.monthsPerTick,
      JSON.stringify(world.pressures),
      JSON.stringify(world.historyMeta),
    ],
  );
}

async function benchmark(count: number, runId: string) {
  const world = makeWorld(runId, count);
  await insertWorldMeta(world);
  try {
    const heapBeforeSave = heapMB();
    const saveStarted = performance.now();
    const revision = await saveV4World(world, 0);
    const saveMs = Math.round((performance.now() - saveStarted) * 100) / 100;
    const heapAfterSave = heapMB();

    const heapBeforeLoad = heapMB();
    const loadStarted = performance.now();
    const loaded = await loadV4World(world.id);
    const loadMs = Math.round((performance.now() - loadStarted) * 100) / 100;
    const heapAfterLoad = heapMB();
    if (!loaded) throw new Error('benchmark world did not load back');
    if (Object.keys(loaded.persons).length !== count)
      throw new Error('benchmark load lost persons');

    const resaveStarted = performance.now();
    await saveV4World(loaded, revision);
    const resaveMs = Math.round((performance.now() - resaveStarted) * 100) / 100;

    const overviewMs = await medianMs(() => v4WorldIndex(world.id));
    const firstPage = await v4PersonSummaries(world.id, { limit: 200 });
    const pageMs = await medianMs(() => v4PersonSummaries(world.id, { limit: 200 }));
    const nextPageMs = firstPage.nextCursor
      ? await medianMs(() =>
          v4PersonSummaries(world.id, { limit: 200, cursor: firstPage.nextCursor }),
        )
      : null;
    const detailMs = await medianMs(() => v4PersonDetail(world.id, 'bench-p-0'));
    const searchMs = await medianMs(() => v4PersonSearch(world.id, 'Person 1'));

    return {
      persons: count,
      households: Object.keys(world.households).length,
      relations: Object.keys(world.relations).length,
      events: world.events.length,
      saveMs,
      resaveMs,
      loadMs,
      overviewMs,
      personPageMs: pageMs,
      personPage2Ms: nextPageMs,
      personDetailMs: detailMs,
      searchMs,
      heapDeltaSaveMB: Math.round((heapAfterSave - heapBeforeSave) * 10) / 10,
      heapDeltaLoadMB: Math.round((heapAfterLoad - heapBeforeLoad) * 10) / 10,
      rssMB: Math.round(process.memoryUsage().rss / 1024 / 1024),
      pageSize: firstPage.people.length,
      peopleTotal: firstPage.total,
      database: databaseName,
    };
  } finally {
    await cleanup(world.id);
  }
}

await migrateV4();
const active = (await pool.query("SELECT id FROM v4_worlds WHERE status='running' LIMIT 1"))
  .rows[0];
if (active) {
  console.error(
    `v4-db-benchmark refuses to run while a world is active (${active.id}); use a fresh *_test database`,
  );
  await pool.end();
  process.exit(1);
}

const runId = Date.now().toString(36);
const results = [];
for (const count of [1000, 5000]) {
  const result = await benchmark(count, runId);
  results.push(result);
  console.log(JSON.stringify(result));
}
console.log(JSON.stringify({ kind: 'v4-db-benchmark-summary', results, database: databaseName }));
await pool.end();
