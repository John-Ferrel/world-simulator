/**
 * Real PostgreSQL restart-recovery check.
 *
 * Run twice under `scripts/v4-with-postgres.ts`:
 *   tsx scripts/v4-postgres-restart-check.ts seed
 *   (server stops)
 *   tsx scripts/v4-postgres-restart-check.ts load
 *
 * The second process connects to the same persistent data directory after a
 * full PostgreSQL stop/start and must read the state instance committed by the
 * first process. This is not an in-memory store test.
 */
import { pool } from '../packages/storage/index.js';
import { VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import { defaultMacroState } from '../packages/v4/macro.js';
import { assertWorldV4, type StateInstance, type WorldState } from '../packages/v4/domain.js';
import { loadV4World, migrateV4, saveV4World, seedV4World, v4WorldMeta } from '../packages/v4/store.js';

const mode = process.argv[2];
const worldId = 'world-phase16-postgres-restart';
if (mode !== 'seed' && mode !== 'load') {
  console.error('usage: v4-postgres-restart-check.ts seed|load');
  process.exit(1);
}

await migrateV4();

if (mode === 'seed') {
  for (const table of [
    'v4_states',
    'v4_macro_proposals',
    'v4_content_jobs',
    'v4_birth_contracts',
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
    'v4_birth_requests',
  ]) {
    await pool.query(`DELETE FROM ${table} WHERE world_id=$1`, [worldId]).catch(() => undefined);
  }
  await pool.query('DELETE FROM v4_worlds WHERE id=$1', [worldId]);
  const world = structuredClone(VIENNA_1912_SEED) as WorldState;
  world.id = worldId;
  world.date = { year: 1917, month: 1 };
  world.macro = defaultMacroState(world, world.date);
  const personId = Object.keys(world.persons)[0]!;
  const state: StateInstance = {
    id: `state:${worldId}:restart`,
    definitionId: 'wish-power',
    version: 1,
    ownerType: 'person',
    ownerId: personId,
    since: { year: 1917, month: 1 },
    parameters: { intensity: 0.73, fixation: 0.41, irony: 0.29 },
    sourceEventId: `evt:${worldId}:restart`,
    active: true,
    tickCount: 2,
  };
  world.states = { [state.id]: state };
  world.historyMeta.stateSequence = 1;
  assertWorldV4(world);
  const meta = await seedV4World(world);
  const changed = structuredClone(world);
  changed.states![state.id]!.parameters.intensity = 0.61;
  changed.states![state.id]!.tickCount = 3;
  const revision = await saveV4World(changed, meta.revision);
  console.log(JSON.stringify({ mode, worldId, revision, stateId: state.id, personId }));
} else {
  const loaded = await loadV4World(worldId);
  if (!loaded) throw new Error(`world ${worldId} was not recovered`);
  const meta = await v4WorldMeta(worldId);
  const state = loaded.states?.[`state:${worldId}:restart`];
  if (!state) throw new Error('state instance was not recovered');
  assertWorldV4(loaded);
  const ok =
    state.definitionId === 'wish-power' &&
    state.parameters.intensity === 0.61 &&
    state.tickCount === 3 &&
    meta?.revision !== undefined;
  console.log(
    JSON.stringify({
      mode,
      ok,
      worldId,
      revision: meta?.revision,
      stateDefinition: state.definitionId,
      intensity: state.parameters.intensity,
      tickCount: state.tickCount,
    }),
  );
  if (!ok) process.exitCode = 1;
}

await pool.end();
