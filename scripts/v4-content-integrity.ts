import { mkdirSync, writeFileSync } from 'node:fs';
import { KERNEL_LIBRARY } from '../packages/v4/content/kernels/index.js';

type Row = { kernelId: string; outcomeId: string; text: string; domain: string };

const rows: Row[] = [];
const titles = new Map<string, string[]>();
for (const kernel of KERNEL_LIBRARY) {
  titles.set(kernel.title, [...(titles.get(kernel.title) ?? []), kernel.id]);
  for (const outcome of kernel.outcomes) {
    rows.push({ kernelId: kernel.id, outcomeId: outcome.id, text: outcome.text, domain: kernel.domain });
  }
  for (const variant of kernel.variants ?? []) {
    for (const outcome of variant.outcomes ?? []) {
      rows.push({
        kernelId: kernel.id,
        outcomeId: `${variant.id}/${outcome.id}`,
        text: outcome.text,
        domain: kernel.domain,
      });
    }
  }
}

const textCounts = new Map<string, string[]>();
const openingCounts = new Map<string, number>();
for (const row of rows) {
  textCounts.set(row.text, [...(textCounts.get(row.text) ?? []), `${row.kernelId}/${row.outcomeId}`]);
  const opening = row.text.replace(/\{[^}]+\}/g, '§').slice(0, 14);
  openingCounts.set(opening, (openingCounts.get(opening) ?? 0) + 1);
}

const duplicateTitles = [...titles.entries()]
  .filter(([, ids]) => ids.length > 1)
  .map(([title, ids]) => ({ title, ids }));
const duplicateTexts = [...textCounts.entries()]
  .filter(([, ids]) => ids.length > 1)
  .map(([text, ids]) => ({ text: text.slice(0, 120), ids }));
const report = {
  generatedAt: new Date().toISOString(),
  kernels: KERNEL_LIBRARY.length,
  outcomes: rows.length,
  domains: [...new Set(KERNEL_LIBRARY.map((kernel) => kernel.domain))].sort(),
  kernelsByDomain: Object.fromEntries(
    [...new Set(KERNEL_LIBRARY.map((kernel) => kernel.domain))]
      .sort()
      .map((domain) => [domain, KERNEL_LIBRARY.filter((kernel) => kernel.domain === domain).length]),
  ),
  kernelsWithVariants: KERNEL_LIBRARY.filter((kernel) => (kernel.variants?.length ?? 0) > 0).length,
  outcomesWithPersonBranches: rows.filter((row) => {
    const kernel = KERNEL_LIBRARY.find((entry) => entry.id === row.kernelId)!;
    if (row.outcomeId.includes('/')) {
      const [variantId, outcomeId] = row.outcomeId.split('/');
      return Boolean(
        kernel.variants
          ?.find((variant) => variant.id === variantId)
          ?.outcomes?.find((outcome) => outcome.id === outcomeId && outcome.when),
      );
    }
    return Boolean(kernel.outcomes.find((outcome) => outcome.id === row.outcomeId && outcome.when));
  }).length,
  duplicateTitles,
  exactDuplicateTexts: duplicateTexts,
  repeatedOpenings: [...openingCounts.entries()]
    .filter(([, count]) => count >= 4)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 40)
    .map(([opening, count]) => ({ opening, count })),
  limitation:
    'Duplicate detection is exact/opening-based. Distinct plots may still share sentence templates; this report cannot certify literary quality.',
};

mkdirSync('docs/v4', { recursive: true });
writeFileSync('docs/v4/phase-12-integrity.json', `${JSON.stringify(report, null, 2)}\n`);
console.log(
  JSON.stringify(
    {
      kernels: report.kernels,
      outcomes: report.outcomes,
      domains: report.domains.length,
      kernelsByDomain: report.kernelsByDomain,
      kernelsWithVariants: report.kernelsWithVariants,
      outcomesWithPersonBranches: report.outcomesWithPersonBranches,
      duplicateTitles: duplicateTitles.length,
      exactDuplicateTexts: duplicateTexts.length,
      repeatedOpenings: report.repeatedOpenings.slice(0, 10),
    },
    null,
    2,
  ),
);
