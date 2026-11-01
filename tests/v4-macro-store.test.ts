import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { pool } from '../packages/storage/index.js';
import { VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import { defaultMacroState, type MacroProposal } from '../packages/v4/macro.js';
import {
  applyV4MacroProposal,
  claimV4MacroProposal,
  enqueueV4MacroProposal,
} from '../packages/v4/macro-store.js';
import { loadV4World, migrateV4, seedV4World, v4WorldMeta } from '../packages/v4/store.js';

const databaseUrl = process.env.DATABASE_URL ?? '';
const databaseName = (() => {
  try {
    return new URL(databaseUrl).pathname.replace(/^\//, '');
  } catch {
    return '';
  }
})();
const enabled = process.env.TEST_DATABASE === '1' && /_test$/.test(databaseName);
const worldId = `macro-store-test-${Date.now().toString(36)}`;

const proposal: MacroProposal = {
  version: 1,
  regionId: 'region-lower-austria',
  effectiveFrom: { year: 1917, month: 1 },
  durationMonths: 12,
  summary: 'test food shortage',
  confidence: 0.7,
  maintainStatus: false,
  developments: [
    {
      type: 'social_change',
      description: 'test organization',
      severity: 0.6,
      organization: { name: 'Test Movement', kind: 'other' },
      eventFamilyIds: ['vienna-social-movement'],
    },
  ],
  parameterChanges: { foodSupply: -0.2, warIntensity: 0.1 },
  eventPoolChanges: [],
};

describe.skipIf(!enabled)('v4 macro store integration', () => {
  beforeAll(async () => {
    await migrateV4();
  });

  afterAll(async () => {
    for (const table of [
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

  it('seeds, reads, applies and persists a macro proposal with a revision bump', async () => {
    const seed = structuredClone(VIENNA_1912_SEED);
    seed.id = worldId;
    seed.date = { year: 1917, month: 1 };
    seed.macro = defaultMacroState(seed, seed.date);
    const meta = await seedV4World(seed);
    const loaded = await loadV4World(worldId);
    expect(loaded?.macro?.regions['region-lower-austria']).toBeDefined();
    const before = loaded!.macro!.regions['region-lower-austria']!.parameters.foodSupply;
    const id = await enqueueV4MacroProposal(worldId, 1917, 1);
    expect(id).toBeDefined();
    const claimed = await claimV4MacroProposal();
    expect(claimed?.id).toBe(id);
    const applied = await applyV4MacroProposal(
      worldId,
      proposal,
      'test-model',
      claimed!.id,
      new Set(['vienna-market-household', 'vienna-social-movement']),
    );
    const after = await loadV4World(worldId);
    const latest = await v4WorldMeta(worldId);
    expect(applied.revision).toBe(meta.revision + 1);
    expect(after?.macro?.regions['region-lower-austria']?.parameters.foodSupply).toBeCloseTo(
      before - 0.2,
      5,
    );
    expect(latest?.macro?.history).toHaveLength(1);
    const development = Object.values(after?.macro?.developments ?? {})[0];
    expect(development?.organizationId).toBeDefined();
    expect(after?.organizations[development!.organizationId!]?.name).toBe('Test Movement');
  });
});
