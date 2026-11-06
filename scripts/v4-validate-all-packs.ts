/**
 * Validate every registered generated StatePack in one command.
 * This is the Phase 17 author preflight; it does not publish or mutate runtime.
 */
import { ALL_STATES, GENERATED_STATE_PACKS } from '../packages/v4/content/states/index.js';
import { VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { validateStateContentPack } from '../packages/v4/content-factory/validate.js';

const world = applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
const baseIds = new Set(ALL_STATES.map((state) => state.id));
let failed = 0;
const results = GENERATED_STATE_PACKS.map((pack) => {
  const result = validateStateContentPack(pack, world, world.date, baseIds);
  if (!result.ok) failed += 1;
  return {
    pack: pack.id,
    states: pack.states.length,
    kernels: pack.kernels?.length ?? 0,
    ok: result.ok,
    compiledScenes: result.compiledScenes,
    errors: result.errors,
    warnings: result.warnings,
  };
});
console.log(JSON.stringify({ packs: results.length, failed, results }, null, 2));
if (failed > 0) process.exitCode = 1;
