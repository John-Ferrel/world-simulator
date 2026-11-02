/**
 * Phase 4 development/runtime-content demo.
 *
 * Uses the proposal produced by a real DeepSeek Macro Director call (stored in
 * docs/v4/phase-4-director-proposal.json), applies it through the production
 * transaction path, loads published runtime content, and shows a named person
 * encountering the new organization.
 */
import { pool } from '../packages/storage/index.js';
import { advanceV4Year } from '../packages/v4/engine.js';
import { VIENNA_1912_SEED, VIENNA_1912_SCENES } from '../packages/v4/content/vienna-1912.js';
import { VIENNA_LIFE_SCENES } from '../packages/v4/content/vienna-life.js';
import { VIENNA_POSTWAR_SCENES } from '../packages/v4/content/vienna-postwar.js';
import { VIENNA_DEVELOPMENT_SCENES } from '../packages/v4/content/vienna-developments.js';
import { VIENNA_FAMILY_RUNTIME_SCENES } from '../packages/v4/content/vienna-family.js';
import { GENERATED_SCENES } from '../packages/v4/content/generated/index.js';
import { defaultMacroState } from '../packages/v4/macro.js';
import { applyV4MacroProposal } from '../packages/v4/macro-store.js';
import { knownMacroFamilyIds } from '../packages/v4/macro-director.js';
import { loadPublishedV4Scenes } from '../packages/v4/content-runtime-store.js';
import { loadV4World, saveV4World, seedV4World, v4WorldMeta } from '../packages/v4/store.js';
import { readFileSync } from 'node:fs';
import type { MacroProposal } from '../packages/v4/macro.js';

const databaseName = (() => {
  try {
    return new URL(process.env.DATABASE_URL ?? '').pathname.replace(/^\//, '');
  } catch {
    return '';
  }
})();
if (!/_(test|e2e)$/.test(databaseName)) {
  console.error('v4-phase4-demo requires DATABASE_URL ending in _test or _e2e');
  process.exit(1);
}
const existing = (await pool.query("SELECT id FROM v4_worlds WHERE status='running' LIMIT 1"))
  .rows[0];
if (existing) {
  console.error(`v4-phase4-demo refuses to run while a world is active (${existing.id})`);
  await pool.end();
  process.exit(1);
}
const worldId = `phase4-demo-${Date.now().toString(36)}`;
try {
  const seed = structuredClone(VIENNA_1912_SEED);
  seed.id = worldId;
  seed.date = { year: 1917, month: 1 };
  seed.macro = defaultMacroState(seed, seed.date);
  await seedV4World(seed);
  const proposal = JSON.parse(
    readFileSync('docs/v4/phase-4-director-proposal.json', 'utf8'),
  ) as MacroProposal;
  const applied = await applyV4MacroProposal(
    worldId,
    proposal,
    'deepseek-v4.1-flash',
    `demo-proposal-${Date.now().toString(36)}`,
    new Set(knownMacroFamilyIds()),
  );
  const world = await loadV4World(worldId);
  if (!world) throw new Error('world missing');
  const runtimeScenes = await loadPublishedV4Scenes();
  const scenes = [
    ...VIENNA_1912_SCENES,
    ...VIENNA_LIFE_SCENES,
    ...VIENNA_POSTWAR_SCENES,
    ...VIENNA_DEVELOPMENT_SCENES,
    ...VIENNA_FAMILY_RUNTIME_SCENES,
    ...GENERATED_SCENES,
    ...runtimeScenes,
  ];
  let current = world;
  const newEvents = [];
  for (let year = 0; year < 8; year += 1) {
    const meta = await v4WorldMeta(worldId);
    if (!meta) throw new Error('meta missing');
    const result = advanceV4Year(current, scenes, {
      economy: { enabled: true },
      eventRuntime: true,
      maxOrdinaryEventsPerPerson: 4,
    });
    current = result.world;
    newEvents.push(...result.events);
    await saveV4World(current, meta.revision, { lastTickAt: Date.now() });
  }
  const developmentEvents = newEvents.filter((event) =>
    event.action.startsWith('vienna-social-movement.'),
  );
  const orgIds = Object.values(applied.macro.developments ?? {})
    .map((development) => development.organizationId)
    .filter((id): id is string => Boolean(id));
  console.log(
    JSON.stringify(
      {
        status: 'ok',
        worldId,
        proposalSummary: proposal.summary,
        developments: applied.macro.developments,
        organizations: orgIds.map((id) => ({
          id,
          name: current.organizations[id]?.name,
          members: current.organizations[id]?.memberIds ?? [],
        })),
        runtimeFamilies: [...new Set(runtimeScenes.map((scene) => scene.familyId))],
        events: newEvents.length,
        developmentEvents: developmentEvents.slice(0, 10).map((event) => ({
          action: event.action,
          year: event.date.year,
          text: event.immediateText,
        })),
        population: current.macro?.population,
      },
      null,
      2,
    ),
  );
} finally {
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
  await pool.query('DELETE FROM v4_worlds WHERE id=$1', [worldId]).catch(() => undefined);
  await pool.end();
}
