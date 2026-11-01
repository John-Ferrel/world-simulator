/**
 * Real LLM Macro Director demo.
 *
 * Requires a *_test or *_e2e DATABASE_URL and a configured model key. It
 * creates a temporary 1917 world, enqueues a proposal, calls the real model,
 * applies the validated proposal through the revision-locked store, runs one
 * year of statistical + event simulation, and prints the evidence. It removes
 * only the temporary world.
 */
import { pool } from '../packages/storage/index.js';
import { advanceV4Year } from '../packages/v4/engine.js';
import { VIENNA_1912_SEED, VIENNA_1912_SCENES } from '../packages/v4/content/vienna-1912.js';
import { VIENNA_LIFE_SCENES } from '../packages/v4/content/vienna-life.js';
import { VIENNA_DEVELOPMENT_SCENES } from '../packages/v4/content/vienna-developments.js';
import { VIENNA_FAMILY_RUNTIME_SCENES } from '../packages/v4/content/vienna-family.js';
import { GENERATED_SCENES } from '../packages/v4/content/generated/index.js';
import { defaultMacroState } from '../packages/v4/macro.js';
import { compileMacroProposal, knownMacroFamilyIds } from '../packages/v4/macro-director.js';
import {
  applyV4MacroProposal,
  claimV4MacroProposal,
  enqueueV4MacroProposal,
} from '../packages/v4/macro-store.js';
import { loadV4World, saveV4World, seedV4World, v4WorldMeta } from '../packages/v4/store.js';

const databaseName = (() => {
  try {
    return new URL(process.env.DATABASE_URL ?? '').pathname.replace(/^\//, '');
  } catch {
    return '';
  }
})();
if (!/_(test|e2e)$/.test(databaseName)) {
  console.error('v4-macro-demo requires DATABASE_URL ending in _test or _e2e');
  process.exit(1);
}
const existing = (await pool.query("SELECT id FROM v4_worlds WHERE status='running' LIMIT 1"))
  .rows[0];
if (existing) {
  console.error(`v4-macro-demo refuses to run while a world is active (${existing.id})`);
  await pool.end();
  process.exit(1);
}

const worldId = `phase3-demo-${Date.now().toString(36)}`;
const seed = structuredClone(VIENNA_1912_SEED);
seed.id = worldId;
seed.date = { year: 1917, month: 1 };
seed.macro = defaultMacroState(seed, seed.date);
await seedV4World(seed);
try {
  const loaded = await loadV4World(worldId);
  if (!loaded?.macro) throw new Error('seeded world has no macro state');
  const before = structuredClone(loaded.macro.regions['region-lower-austria']!.parameters);
  const jobId = await enqueueV4MacroProposal(worldId, 1917, 1);
  if (!jobId) throw new Error('macro proposal was not enqueued');
  const job = await claimV4MacroProposal();
  if (!job) throw new Error('macro proposal was not claimed');
  const knownFamilies = knownMacroFamilyIds();
  const compiled = await compileMacroProposal({
    world: loaded,
    state: loaded.macro,
    knownFamilies,
    maxTokens: 1800,
  });
  const applied = await applyV4MacroProposal(
    worldId,
    compiled.proposal,
    compiled.model,
    job.id,
    new Set(knownFamilies),
  );
  const afterWorld = await loadV4World(worldId);
  const meta = await v4WorldMeta(worldId);
  if (!afterWorld || !meta) throw new Error('world disappeared after macro apply');
  const scenes = [
    ...VIENNA_1912_SCENES,
    ...VIENNA_LIFE_SCENES,
    ...VIENNA_DEVELOPMENT_SCENES,
    ...VIENNA_FAMILY_RUNTIME_SCENES,
    ...GENERATED_SCENES,
  ];
  const tick = advanceV4Year(afterWorld, scenes, {
    economy: { enabled: true },
    eventRuntime: true,
    maxOrdinaryEventsPerPerson: 4,
  });
  const revision = await saveV4World(tick.world, meta.revision, { lastTickAt: Date.now() });
  const statistical = tick.events.filter((event) => event.action.startsWith('statistical_'));
  const deaths = tick.events.filter((event) =>
    event.effects.some((effect) => effect.type === 'death'),
  );
  console.log(
    JSON.stringify(
      {
        status: 'ok',
        worldId,
        model: compiled.model,
        tokens: compiled.tokens,
        proposal: compiled.proposal,
        before,
        after: applied.macro.regions['region-lower-austria']!.parameters,
        revision,
        events: tick.events.length,
        statisticalEvents: statistical.slice(0, 10).map((event) => ({
          action: event.action,
          date: event.date,
          text: event.immediateText,
        })),
        deaths: deaths.slice(0, 10).map((event) => ({
          action: event.action,
          date: event.date,
          text: event.immediateText,
          cause: event.effects.find((effect) => effect.type === 'death'),
        })),
      },
      null,
      2,
    ),
  );
} finally {
  for (const table of [
    'v4_macro_proposals',
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
  await pool.query('DELETE FROM v4_worlds WHERE id=$1', [worldId]).catch(() => undefined);
  await pool.end();
}
