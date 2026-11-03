import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const groups = ['childhood', 'work', 'social', 'history', 'gaps', 'solitude'];
const reports = groups
  .map((group) => {
    const path = resolve('docs/v4', `phase-9-content-${group}.json`);
    if (!existsSync(path)) return undefined;
    return { group, ...(JSON.parse(readFileSync(path, 'utf8')) as any) };
  })
  .filter(Boolean);

const packs = reports.flatMap((report) => report!.packs ?? []);
for (const pack of packs) {
  if (!pack.ok) continue;
  const path = resolve('packages/v4/content/generated', `${pack.id}.json`);
  if (!existsSync(path)) {
    pack.verified = false;
    continue;
  }
  const actual = JSON.parse(readFileSync(path, 'utf8')) as {
    nodes?: { outcomes?: { narration?: unknown[] }[] }[];
  };
  const nodes = actual.nodes ?? [];
  pack.verified = true;
  pack.nodes = nodes.length;
  pack.outcomes = nodes.reduce((sum, node) => sum + (node.outcomes?.length ?? 0), 0);
  pack.narrations = nodes.reduce(
    (sum, node) =>
      sum +
      (node.outcomes ?? []).reduce((inner, outcome) => inner + (outcome.narration?.length ?? 0), 0),
    0,
  );
}
const successful = packs.filter((pack: any) => pack.ok);
const totals = {
  requestedPacks: packs.length,
  publishedPacks: successful.length,
  generatedNodes: successful.reduce((sum: number, pack: any) => sum + (pack.nodes ?? 0), 0),
  taskNodes: successful
    .filter((pack: any) => pack.kind === 'task')
    .reduce((sum: number, pack: any) => sum + (pack.nodes ?? 0), 0),
  eventNodes: successful
    .filter((pack: any) => pack.kind !== 'task')
    .reduce((sum: number, pack: any) => sum + (pack.nodes ?? 0), 0),
  outcomes: successful.reduce((sum: number, pack: any) => sum + (pack.outcomes ?? 0), 0),
  narrations: successful.reduce((sum: number, pack: any) => sum + (pack.narrations ?? 0), 0),
  tokens: packs.reduce((sum: number, pack: any) => sum + (pack.tokens ?? 0), 0),
  failures: packs.length - successful.length,
  semanticDuplicates: successful.reduce(
    (sum: number, pack: any) => sum + (pack.semanticDuplicates?.length ?? 0),
    0,
  ),
  exactDuplicateOutcomes: successful.reduce(
    (sum: number, pack: any) => sum + (pack.exactDuplicateOutcomes ?? 0),
    0,
  ),
};
const report = {
  generatedAt: new Date().toISOString(),
  model: 'deepseek-v4.1-flash',
  groups,
  totals,
  packs,
};
writeFileSync(
  resolve('docs/v4/phase-9-content-batch.json'),
  `${JSON.stringify(report, null, 2)}\n`,
);
console.log(
  JSON.stringify(
    { totals, failed: packs.filter((pack: any) => !pack.ok).map((pack: any) => pack.id) },
    null,
    2,
  ),
);
