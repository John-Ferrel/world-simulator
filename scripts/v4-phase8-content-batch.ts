import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  PHASE8_TASK_BRIEFS,
  generatePack,
  validateAuthoredPack,
  writeGeneratedPack,
} from '../packages/v4/content-author/index.js';
import type { GeneratedPack } from '../packages/v4/generated.js';

const packDir = resolve('packages/v4/content/generated');
const args = process.argv.slice(2);
const onlyIndex = args.indexOf('--only');
const only = onlyIndex >= 0 ? new Set(args[onlyIndex + 1]?.split(',').filter(Boolean)) : undefined;

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '')
    .slice(0, 800);
}

function bigrams(text: string): Set<string> {
  const normalized = normalize(text);
  const result = new Set<string>();
  for (let index = 0; index < normalized.length - 1; index += 1) {
    result.add(normalized.slice(index, index + 2));
  }
  return result;
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let intersection = 0;
  for (const value of a) if (b.has(value)) intersection += 1;
  return intersection / (a.size + b.size - intersection);
}

function nodeText(pack: GeneratedPack, nodeIndex: number): string {
  const node = pack.nodes[nodeIndex]!;
  return [node.title, ...node.outcomes.map((outcome) => outcome.text)].join(' ');
}

const seen: { key: string; grams: Set<string>; text: string }[] = [];
const reportFile = resolve('docs/v4/phase-8-content-batch.json');
const previous = existsSync(reportFile)
  ? (JSON.parse(readFileSync(reportFile, 'utf8')) as any)
  : undefined;
const previousPacks = new Map<string, any>(
  (previous?.packs ?? []).map((pack: any) => [String(pack.id), pack]),
);
const report: any = {
  generatedAt: new Date().toISOString(),
  model: 'deepseek-v4.1-flash',
  requestedPacks: PHASE8_TASK_BRIEFS.length,
  packs: [],
  totals: {
    candidates: 0,
    publishedNodes: 0,
    publishedOutcomes: 0,
    publishedNarrations: 0,
    tokens: 0,
    semanticDuplicates: 0,
    exactDuplicateOutcomes: 0,
  },
};

for (const brief of PHASE8_TASK_BRIEFS) {
  if (only && !only.has(brief.id)) continue;
  process.stderr.write(`generating ${brief.id} (${brief.nodeBriefs.length} nodes)...\n`);
  const started = Date.now();
  const result = await generatePack(brief, {
    maxAttempts: 2,
    maxTokens: 20000,
    timeoutMs: 180000,
  });
  const attemptTokens = result.attempts.reduce((sum, attempt) => sum + (attempt.tokens ?? 0), 0);
  report.totals.tokens += attemptTokens;
  if (!result.ok || !result.pack) {
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
  const exactOutcomeTexts = new Set<string>();
  let exactDuplicateOutcomes = 0;
  for (let nodeIndex = 0; nodeIndex < pack.nodes.length; nodeIndex += 1) {
    const node = pack.nodes[nodeIndex]!;
    const text = nodeText(pack, nodeIndex);
    const grams = bigrams(text);
    for (const previous of seen) {
      const similarity = jaccard(grams, previous.grams);
      if (similarity >= 0.82) {
        duplicates.push({ nodeId: node.id, with: previous.key, similarity });
        break;
      }
    }
    seen.push({ key: node.id, grams, text });
    for (const outcome of node.outcomes) {
      const normalized = normalize(outcome.text);
      if (exactOutcomeTexts.has(normalized)) exactDuplicateOutcomes += 1;
      exactOutcomeTexts.add(normalized);
    }
  }
  const file = writeGeneratedPack(pack, packDir);
  const outcomes = pack.nodes.reduce((sum, node) => sum + node.outcomes.length, 0);
  const narrations = pack.nodes.reduce(
    (sum, node) =>
      sum + node.outcomes.reduce((inner, outcome) => inner + (outcome.narration?.length ?? 0), 0),
    0,
  );
  report.totals.candidates += pack.nodes.length;
  report.totals.publishedNodes += pack.nodes.length;
  report.totals.publishedOutcomes += outcomes;
  report.totals.publishedNarrations += narrations;
  report.totals.semanticDuplicates += duplicates.length;
  report.totals.exactDuplicateOutcomes += exactDuplicateOutcomes;
  report.packs.push({
    id: brief.id,
    ok: true,
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

const currentIds = new Set(report.packs.map((pack: any) => String(pack.id)));
for (const [id, pack] of previousPacks) {
  if (!currentIds.has(id)) report.packs.push(pack);
}
report.packs.sort((a: any, b: any) => String(a.id).localeCompare(String(b.id)));
report.totals = {
  candidates: report.packs.reduce((sum: number, pack: any) => sum + (pack.ok ? pack.nodes : 0), 0),
  publishedNodes: report.packs.reduce(
    (sum: number, pack: any) => sum + (pack.ok ? pack.nodes : 0),
    0,
  ),
  publishedOutcomes: report.packs.reduce(
    (sum: number, pack: any) => sum + (pack.ok ? pack.outcomes : 0),
    0,
  ),
  publishedNarrations: report.packs.reduce(
    (sum: number, pack: any) => sum + (pack.ok ? pack.narrations : 0),
    0,
  ),
  tokens: report.packs.reduce((sum: number, pack: any) => sum + (pack.tokens ?? 0), 0),
  semanticDuplicates: report.packs.reduce(
    (sum: number, pack: any) => sum + (pack.semanticDuplicates?.length ?? 0),
    0,
  ),
  exactDuplicateOutcomes: report.packs.reduce(
    (sum: number, pack: any) => sum + (pack.exactDuplicateOutcomes ?? 0),
    0,
  ),
};
mkdirSync('docs/v4', { recursive: true });
writeFileSync(reportFile, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
