import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { pool } from '../packages/storage/index.js';
import { VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import { defaultMacroState } from '../packages/v4/macro.js';
import { loadV4World, migrateV4, saveV4World, seedV4World } from '../packages/v4/store.js';
import { assertWorldV4, type StateInstance, type WorldState } from '../packages/v4/domain.js';

const databaseUrl = process.env.DATABASE_URL ?? '';
const databaseName = (() => {
  try {
    return new URL(databaseUrl).pathname.replace(/^\//, '');
  } catch {
    return '';
  }
})();
const enabled = process.env.TEST_DATABASE === '1' && /_test$/.test(databaseName);
const worldId = `state-store-test-${Date.now().toString(36)}`;

describe.skipIf(!enabled)('v4 state persistence integration', () => {
  beforeAll(async () => {
    await migrateV4();
  });

  afterAll(async () => {
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
    await pool.end();
  });

  it('persists a state instance across seed, load, save and reload', async () => {
    const seed = structuredClone(VIENNA_1912_SEED) as WorldState;
    seed.id = worldId;
    seed.date = { year: 1917, month: 1 };
    seed.macro = defaultMacroState(seed, seed.date);
    const personId = Object.keys(seed.persons)[0]!;
    const state: StateInstance = {
      id: `state:${worldId}:1`,
      definitionId: 'wish-power',
      version: 1,
      ownerType: 'person',
      ownerId: personId,
      since: { year: 1917, month: 1 },
      parameters: { intensity: 0.8, fixation: 0.5, irony: 0.2 },
      sourceEventId: `evt:${worldId}:1`,
      active: true,
      tickCount: 0,
    };
    seed.states = { [state.id]: state };
    seed.historyMeta.stateSequence = 1;
    assertWorldV4(seed);
    const meta = await seedV4World(seed);
    const loaded = await loadV4World(worldId);
    expect(loaded?.states?.[state.id]?.definitionId).toBe('wish-power');
    expect(loaded?.states?.[state.id]?.parameters.intensity).toBe(0.8);

    // A second save must update the indexed active/owner columns, not just
    // payload, and a reload must preserve a later parameter change.
    const changed = structuredClone(loaded!) as WorldState;
    changed.states![state.id]!.parameters.intensity = 0.4;
    changed.states![state.id]!.tickCount = 3;
    const revision = await saveV4World(changed, meta.revision);
    expect(revision).toBe(meta.revision + 1);
    const reloaded = await loadV4World(worldId);
    expect(reloaded?.states?.[state.id]?.parameters.intensity).toBe(0.4);
    expect(reloaded?.states?.[state.id]?.tickCount).toBe(3);
    assertWorldV4(reloaded!);
  });
});
