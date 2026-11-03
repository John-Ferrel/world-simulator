import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  PHASE10_BRIEFS,
  generatePack,
  validateAuthoredPack,
  writeGeneratedPack,
  type ContentFamilyBrief,
} from '../packages/v4/content-author/index.js';
import type { GeneratedPack } from '../packages/v4/generated.js';

const GROUPS: Record<string, ContentFamilyBrief[]> = {
  major: PHASE10_BRIEFS,
};
const args = process.argv.slice(2);
const groupIndex = args.indexOf('--group');
const group = groupIndex >= 0 ? args[groupIndex + 1] : undefined;
const onlyIndex = args.indexOf('--only');
const only = onlyIndex >= 0 ? new Set(args[onlyIndex + 1]?.split(',').filter(Boolean)) : undefined;
if (group && !GROUPS[group]) {
  console.error(`unknown group ${group}; use ${Object.keys(GROUPS).join(', ')}`);
  process.exit(1);
}
const briefs = group ? GROUPS[group]! : Object.values(GROUPS).flat();
const reportFile = resolve('docs/v4', `phase-10-content-${group ?? 'all'}.json`);
const packDir = resolve('packages/v4/content/generated');

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '')
    .slice(0, 900);
}
function bigrams(text: string): Set<string> {
  const normalized = normalize(text);
  const result = new Set<string>();
  for (let i = 0; i < normalized.length - 1; i += 1) result.add(normalized.slice(i, i + 2));
  return result;
}
function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let inter = 0;
  for (const value of a) if (b.has(value)) inter += 1;
  return inter / (a.size + b.size - inter);
}
function nodeText(pack: GeneratedPack, index: number): string {
  const node = pack.nodes[index]!;
  return [node.title, ...node.outcomes.map((outcome) => outcome.text)].join(' ');
}

function loadExistingPacks(excludeIds: Set<string>): GeneratedPack[] {
  if (!existsSync(packDir)) return [];
  const packs: GeneratedPack[] = [];
  for (const file of readdirSync(packDir)) {
    if (!file.endsWith('.json')) continue;
    try {
      const pack = JSON.parse(readFileSync(resolve(packDir, file), 'utf8')) as GeneratedPack;
      if (pack?.id && !excludeIds.has(pack.id)) packs.push(pack);
    } catch {
      // Existing invalid JSON is not a reason to abort a new batch.
    }
  }
  return packs;
}

const currentIds = new Set(briefs.map((brief) => brief.id));
const seen: { key: string; grams: Set<string> }[] = [];
for (const pack of loadExistingPacks(currentIds)) {
  for (let index = 0; index < pack.nodes.length; index += 1) {
    seen.push({
      key: `${pack.id}/${pack.nodes[index]!.id}`,
      grams: bigrams(nodeText(pack, index)),
    });
  }
}
const previousReport = existsSync(reportFile)
  ? (JSON.parse(readFileSync(reportFile, 'utf8')) as any)
  : undefined;
const previousPacks = new Map<string, any>(
  (previousReport?.packs ?? []).map((pack: any) => [String(pack.id), pack]),
);
const report: any = {
  generatedAt: new Date().toISOString(),
  group: group ?? 'all',
  model: 'deepseek-v4.1-flash',
  requestedPacks: briefs.length,
  packs: [],
  totals: {
    generatedNodes: 0,
    taskNodes: 0,
    eventNodes: 0,
    outcomes: 0,
    narrations: 0,
    tokens: 0,
    semanticDuplicates: 0,
    exactDuplicateOutcomes: 0,
    failures: 0,
  },
};

for (const brief of briefs) {
  if (only && !only.has(brief.id)) continue;
  process.stderr.write(`generating ${brief.id} (${brief.nodeBriefs.length} nodes)...\n`);
  const started = Date.now();
  const result = await generatePack(brief, {
    maxAttempts: 2,
    maxTokens: 20000,
    timeoutMs: 240000,
  });
  const attemptTokens = result.attempts.reduce((sum, attempt) => sum + (attempt.tokens ?? 0), 0);
  report.totals.tokens += attemptTokens;
  if (!result.ok || !result.pack) {
    report.totals.failures += 1;
    process.stderr.write(`failed ${brief.id}: ${JSON.stringify(result.errors).slice(0, 500)}\n`);
    report.packs.push({
      id: brief.id,
      ok: false,
      tokens: attemptTokens,
      errors: result.errors,
      attempts: result.attempts,
      runtimeMs: Date.now() - started,
    });
    continue;
  }
  const pack = result.pack;
  const strict = validateAuthoredPack(pack);
  if (strict.errors.length > 0) {
    report.totals.failures += 1;
    process.stderr.write(`failed ${brief.id}: ${JSON.stringify(result.errors).slice(0, 500)}\n`);
    report.packs.push({
      id: brief.id,
      ok: false,
      tokens: attemptTokens,
      errors: strict.errors,
      attempts: result.attempts,
      runtimeMs: Date.now() - started,
    });
    continue;
  }
  const duplicates: { nodeId: string; with: string; similarity: number }[] = [];
  const exactTexts = new Set<string>();
  let exactDuplicateOutcomes = 0;
  for (let index = 0; index < pack.nodes.length; index += 1) {
    const node = pack.nodes[index]!;
    const grams = bigrams(nodeText(pack, index));
    for (const previous of seen) {
      const similarity = jaccard(grams, previous.grams);
      if (similarity >= 0.82) {
        duplicates.push({ nodeId: node.id, with: previous.key, similarity });
        break;
      }
    }
    seen.push({ key: `${pack.id}/${node.id}`, grams });
    for (const outcome of node.outcomes) {
      const normalized = normalize(outcome.text);
      if (exactTexts.has(normalized)) exactDuplicateOutcomes += 1;
      exactTexts.add(normalized);
    }
  }
  const file = writeGeneratedPack(pack, packDir);
  const outcomes = pack.nodes.reduce((sum, node) => sum + node.outcomes.length, 0);
  const narrations = pack.nodes.reduce(
    (sum, node) =>
      sum + node.outcomes.reduce((inner, outcome) => inner + (outcome.narration?.length ?? 0), 0),
    0,
  );
  const taskNodes = pack.kind === 'task' ? pack.nodes.length : 0;
  report.totals.generatedNodes += pack.nodes.length;
  report.totals.taskNodes += taskNodes;
  report.totals.eventNodes += pack.nodes.length - taskNodes;
  report.totals.outcomes += outcomes;
  report.totals.narrations += narrations;
  report.totals.semanticDuplicates += duplicates.length;
  report.totals.exactDuplicateOutcomes += exactDuplicateOutcomes;
  report.packs.push({
    id: brief.id,
    ok: true,
    kind: pack.kind ?? 'event',
    file,
    tokens: attemptTokens,
    nodes: pack.nodes.length,
    outcomes,
    narrations,
    semanticDuplicates: duplicates,
    exactDuplicateOutcomes,
    attempts: result.attempts,
    runtimeMs: Date.now() - started,
  });
}

const completedIds = new Set(report.packs.map((pack: any) => String(pack.id)));
for (const [id, pack] of previousPacks) {
  if (!completedIds.has(id) && briefs.some((brief) => brief.id === id)) report.packs.push(pack);
}
report.packs.sort((a: any, b: any) => String(a.id).localeCompare(String(b.id)));
const okPacks = report.packs.filter((pack: any) => pack.ok);
report.totals = {
  generatedNodes: okPacks.reduce((sum: number, pack: any) => sum + (pack.nodes ?? 0), 0),
  taskNodes: okPacks
    .filter((pack: any) => pack.kind === 'task')
    .reduce((sum: number, pack: any) => sum + (pack.nodes ?? 0), 0),
  eventNodes: okPacks
    .filter((pack: any) => pack.kind !== 'task')
    .reduce((sum: number, pack: any) => sum + (pack.nodes ?? 0), 0),
  outcomes: okPacks.reduce((sum: number, pack: any) => sum + (pack.outcomes ?? 0), 0),
  narrations: okPacks.reduce((sum: number, pack: any) => sum + (pack.narrations ?? 0), 0),
  tokens: report.packs.reduce((sum: number, pack: any) => sum + (pack.tokens ?? 0), 0),
  semanticDuplicates: okPacks.reduce(
    (sum: number, pack: any) => sum + (pack.semanticDuplicates?.length ?? 0),
    0,
  ),
  exactDuplicateOutcomes: okPacks.reduce(
    (sum: number, pack: any) => sum + (pack.exactDuplicateOutcomes ?? 0),
    0,
  ),
  failures: report.packs.length - okPacks.length,
};
mkdirSync('docs/v4', { recursive: true });
writeFileSync(reportFile, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
