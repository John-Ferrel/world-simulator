import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  PHASE2_FAMILY_BRIEFS,
  PHASE3_FAMILY_BRIEFS,
  PHASE4_FAMILY_BRIEFS,
  PHASE7_FAMILY_BRIEFS,
  PHASE8_TASK_BRIEFS,
  PHASE9_CHILDHOOD_BRIEFS,
  PHASE9_GAP_BRIEFS,
  PHASE9_SOLITUDE_BRIEFS,
  PHASE9_WORK_BRIEFS,
  PHASE9_SOCIAL_BRIEFS,
  PHASE9_HISTORY_BRIEFS,
  auditPacks,
  briefById,
  describeBrief,
  generatePack,
  summarizeAudit,
  macroContentGaps,
  validateAuthoredPack,
  writeGeneratedPack,
} from '../packages/v4/content-author/index.js';
import { validateGeneratedPack, type GeneratedPack } from '../packages/v4/generated.js';
import type { MacroState } from '../packages/v4/macro.js';

const packDir = resolve('packages/v4/content/generated');
const allBriefs = [
  ...PHASE2_FAMILY_BRIEFS,
  ...PHASE3_FAMILY_BRIEFS,
  ...PHASE4_FAMILY_BRIEFS,
  ...PHASE7_FAMILY_BRIEFS,
  ...PHASE8_TASK_BRIEFS,
  ...PHASE9_CHILDHOOD_BRIEFS,
  ...PHASE9_WORK_BRIEFS,
  ...PHASE9_SOCIAL_BRIEFS,
  ...PHASE9_HISTORY_BRIEFS,
  ...PHASE9_GAP_BRIEFS,
  ...PHASE9_SOLITUDE_BRIEFS,
];
const auditFile = resolve('docs/v4/content-audit.json');

function readPacks(): GeneratedPack[] {
  if (!existsSync(packDir)) return [];
  return readdirSync(packDir)
    .filter((file) => file.endsWith('.json'))
    .sort()
    .map((file) => JSON.parse(readFileSync(resolve(packDir, file), 'utf8')) as GeneratedPack);
}

function readAudit(): unknown {
  if (!existsSync(auditFile)) return null;
  try {
    return JSON.parse(readFileSync(auditFile, 'utf8'));
  } catch {
    return null;
  }
}

function macroFile(): MacroState | undefined {
  const index = process.argv.indexOf('--macro');
  if (index < 0) return undefined;
  const file = process.argv[index + 1];
  if (!file) throw new Error('--macro requires a JSON file path');
  return JSON.parse(readFileSync(resolve(file), 'utf8')) as MacroState;
}

function report() {
  const packs = readPacks();
  const coverage = auditPacks(packs);
  const present = new Set(packs.map((pack) => pack.id));
  const audit = summarizeAudit(readAudit());
  const macro = macroFile();
  console.log(
    JSON.stringify(
      {
        status: 'ok',
        generatedDirectory: packDir,
        auditFile: existsSync(auditFile) ? auditFile : null,
        coverage,
        ungeneratedBriefs: allBriefs.filter((brief) => !present.has(brief.id)).map(describeBrief),
        audit,
        macroContentGaps: macro ? macroContentGaps(macro, packs) : [],
      },
      null,
      2,
    ),
  );
}

async function generate(id: string, force: boolean) {
  const brief = allBriefs.find((candidate) => candidate.id === id);
  if (!brief) {
    console.error(
      JSON.stringify({
        status: 'failed',
        reason: 'unknown family',
        family: id,
        available: allBriefs.map((candidate) => candidate.id),
      }),
    );
    process.exitCode = 1;
    return;
  }
  const target = resolve(packDir, `${brief.id}.json`);
  if (existsSync(target) && !force) {
    console.error(
      JSON.stringify({
        status: 'failed',
        reason: 'family already exists; pass --force to regenerate',
        family: brief.id,
        file: target,
      }),
    );
    process.exitCode = 1;
    return;
  }

  const result = await generatePack(brief, {
    maxAttempts: 2,
    maxTokens: 8000,
    timeoutMs: 180000,
    onAttempt: (attempt) => {
      console.error(
        `attempt ${attempt.attempt}: ${attempt.tokens} tokens, ${attempt.errors.length} errors`,
      );
    },
  });

  if (!result.ok || !result.pack) {
    console.error(
      JSON.stringify(
        {
          status: 'failed',
          family: brief.id,
          tokens: result.tokens,
          successTokens: result.successTokens,
          errors: result.errors,
          attempts: result.attempts,
          written: false,
        },
        null,
        2,
      ),
    );
    process.exitCode = 1;
    return;
  }

  const schema = validateGeneratedPack(result.pack);
  const strict = validateAuthoredPack(result.pack, { phase2: true });
  if (schema.errors.length > 0 || strict.errors.length > 0) {
    console.error(
      JSON.stringify(
        {
          status: 'failed',
          reason: 'post-generation validation failed; file not written',
          family: brief.id,
          schemaErrors: schema.errors,
          strictErrors: strict.errors,
          tokens: result.tokens,
          written: false,
        },
        null,
        2,
      ),
    );
    process.exitCode = 1;
    return;
  }

  const file = writeGeneratedPack(result.pack, packDir);
  console.log(
    JSON.stringify(
      {
        status: 'written',
        family: brief.id,
        file,
        tokens: result.successTokens,
        model: result.model,
        nodes: result.pack.nodes.length,
        outcomes: result.pack.nodes.reduce((sum, node) => sum + node.outcomes.length, 0),
        narrations: result.pack.nodes.reduce(
          (sum, node) =>
            sum +
            node.outcomes.reduce((inner, outcome) => inner + (outcome.narration?.length ?? 0), 0),
          0,
        ),
        warnings: result.warnings,
        attempts: result.attempts,
      },
      null,
      2,
    ),
  );
}

const args = process.argv.slice(2);
const generateIndex = args.findIndex((arg) => arg === '--generate');
const generateMissing = args.includes('--generate-missing');
if (generateIndex >= 0) {
  const id = args[generateIndex + 1];
  if (!id) {
    console.error(
      'usage: tsx scripts/v4-content-author.ts [--macro <state.json>] [--generate <family-id> [--force] | --generate-missing]',
    );
    process.exit(1);
  }
  await generate(id, args.includes('--force'));
} else if (generateMissing) {
  const present = new Set(readPacks().map((pack) => pack.id));
  const missing = allBriefs.find((brief) => !present.has(brief.id));
  if (!missing) {
    console.log(
      JSON.stringify({
        status: 'complete',
        reason: 'all authored briefs already have generated packs',
        families: allBriefs.map((brief) => brief.id),
      }),
    );
  } else {
    await generate(missing.id, false);
  }
} else if (args.includes('--list-briefs')) {
  console.log(JSON.stringify(allBriefs.map(describeBrief), null, 2));
} else {
  report();
}
