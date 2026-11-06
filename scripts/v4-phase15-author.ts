/**
 * Phase 15 content-factory CLI.
 *
 *   pnpm v4:phase15-author -- --all
 *   pnpm v4:phase15-author -- --brief=brief-education-continuity --fallback
 *
 * The command writes validated state packs and a registry with provenance.
 * A fallback scaffold is explicitly labelled; it is not counted as LLM output.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { ALL_STATES } from '../packages/v4/content/states/index.js';
import { PHASE15_BRIEFS } from '../packages/v4/content-factory/briefs.js';
import { generateStatePack } from '../packages/v4/content-factory/generate.js';
import { storePack, contentFactoryDir } from '../packages/v4/content-factory/store.js';
import { validateStateContentPack } from '../packages/v4/content-factory/validate.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import { DEFAULT_COMPOSITION } from '../packages/v4/composition/default.js';

const args = process.argv.slice(2);
const forceFallback = args.includes('--fallback');
const all = args.includes('--all') || args.length === 0;
const briefArg = args.find((arg) => arg.startsWith('--brief='))?.slice('--brief='.length);
const selected = all ? PHASE15_BRIEFS : PHASE15_BRIEFS.filter((brief) => brief.id === briefArg);
if (selected.length === 0) {
  console.error(
    `No brief matches ${briefArg ?? '(none)'}. Available: ${PHASE15_BRIEFS.map((b) => b.id).join(', ')}`,
  );
  process.exit(1);
}

const world = applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
const existingIds = ALL_STATES.map((state) => state.id);
const report: Record<string, unknown>[] = [];
for (const brief of selected) {
  const generation = await generateStatePack(brief, existingIds, world, {
    forceFallback,
    maxAttempts: 2,
  });
  let validation = generation.validation;
  if (!generation.pack) {
    console.error(`${brief.id}: no pack produced`);
    continue;
  }
  // A model pack can compile against 1912 but not later; the content still
  // needs to be valid in its own contexts. Use the base world for the gate.
  if (!validation)
    validation = validateStateContentPack(generation.pack, world, world.date, new Set(existingIds));
  const stored = storePack(generation.pack, validation, {
    usedFallback: generation.usedFallback,
    tokens: generation.tokens,
    status: validation.ok ? 'validated' : 'rejected',
  });
  // Exercise the real composer once, not just schema validation.
  const compiled = DEFAULT_COMPOSITION.compile(world, world.date);
  const r15Errors = compiled.errors.filter((error) => error.kernelId.includes(brief.id));
  report.push({
    brief: brief.id,
    pack: generation.pack.id,
    version: generation.pack.version,
    usedFallback: generation.usedFallback,
    model: generation.model,
    tokens: generation.tokens,
    attempts: generation.attempts,
    modelError: generation.error,
    ok: generation.ok && validation.ok,
    stateCount: generation.pack.states.length,
    kernelCount: generation.pack.kernels?.length ?? 0,
    compiledScenes: validation.compiledScenes,
    compiledTasks: validation.compiledTasks,
    errors: [
      ...validation.errors,
      ...r15Errors.map((error) => `${error.kernelId}/${error.outcomeId}: ${error.reason}`),
    ],
    warnings: validation.warnings,
    file: stored.file,
  });
  console.log(
    JSON.stringify({
      brief: brief.id,
      pack: generation.pack.id,
      fallback: generation.usedFallback,
      ok: generation.ok && validation.ok,
      states: generation.pack.states.length,
      kernels: generation.pack.kernels?.length ?? 0,
      errors: validation.errors.length,
      warnings: validation.warnings.length,
      file: stored.file,
    }),
  );
}

mkdirSync(contentFactoryDir(), { recursive: true });
const reportFile = resolve(contentFactoryDir(), 'generation-report.json');
writeFileSync(
  reportFile,
  `${JSON.stringify({ generatedAt: new Date().toISOString(), results: report }, null, 2)}\n`,
);
console.log(`Report: ${reportFile}`);
