/**
 * Validate one StatePack JSON file without publishing it.
 *
 *   pnpm tsx scripts/v4-validate-state-pack.ts path/to/pack.json
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import { ALL_STATES } from '../packages/v4/content/states/index.js';
import { validateStateContentPack } from '../packages/v4/content-factory/validate.js';
import type { StatePack } from '../packages/v4/state/registry.js';

const file = process.argv[2];
if (!file) {
  console.error('usage: v4-validate-state-pack.ts <pack.json>');
  process.exit(1);
}
const pack = JSON.parse(readFileSync(resolve(file), 'utf8')) as StatePack;
const world = applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
const result = validateStateContentPack(
  pack,
  world,
  world.date,
  new Set(ALL_STATES.map((state) => state.id)),
);
console.log(
  JSON.stringify(
    {
      file,
      ok: result.ok,
      states: pack.states?.length ?? 0,
      kernels: pack.kernels?.length ?? 0,
      compiledScenes: result.compiledScenes,
      compiledTasks: result.compiledTasks,
      errors: result.errors,
      warnings: result.warnings,
    },
    null,
    2,
  ),
);
process.exit(result.ok ? 0 : 1);
