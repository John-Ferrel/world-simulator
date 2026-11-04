import { mkdirSync, writeFileSync } from 'node:fs';
import { KERNEL_LIBRARY } from '../packages/v4/content/kernels/index.js';

type OutcomeRow = {
  kernelId: string;
  outcomeId: string;
  domain: string;
  variantId?: string;
  text: string;
};

const rows: OutcomeRow[] = [];
for (const kernel of KERNEL_LIBRARY) {
  for (const outcome of kernel.outcomes) {
    rows.push({
      kernelId: kernel.id,
      outcomeId: outcome.id,
      domain: kernel.domain,
      text: outcome.text,
    });
  }
  for (const variant of kernel.variants ?? []) {
    for (const outcome of variant.outcomes ?? []) {
      rows.push({
        kernelId: kernel.id,
        outcomeId: `${variant.id}/${outcome.id}`,
        domain: kernel.domain,
        variantId: variant.id,
        text: outcome.text,
      });
    }
  }
}

const GENERIC = [
  '感到',
  '意识到',
  '心中',
  '深深地',
  '从此',
  '命运',
  '无法言说',
  '五味杂陈',
  '不知如何是好',
  '仿佛',
  '似乎',
  '像是',
  '终于明白',
  '一切都',
  '从此以后',
  '再也没有',
  '空气凝固',
  '时间仿佛',
];

function normalized(text: string): string {
  return text
    .replace(/\{[a-zA-Z_][a-zA-Z0-9_]*\}/g, '§')
    .replace(/[，。！？；：、“”‘’（）《》…—\s]/g, '');
}

function opening(text: string): string {
  return normalized(text).slice(0, 8);
}

const openings = new Map<string, number>();
const genericCounts = new Map<string, number>();
let hardcodedShe = 0;
let hardcodedHe = 0;
let shortText = 0;
let longText = 0;
let withTrace = 0;
let totalLength = 0;
for (const row of rows) {
  const key = opening(row.text);
  openings.set(key, (openings.get(key) ?? 0) + 1);
  for (const phrase of GENERIC) {
    if (row.text.includes(phrase)) {
      genericCounts.set(phrase, (genericCounts.get(phrase) ?? 0) + 1);
    }
  }
  hardcodedShe += (row.text.match(/她/g) ?? []).length;
  hardcodedHe += (row.text.match(/他/g) ?? []).length;
  if (row.text.length < 60) shortText += 1;
  if (row.text.length > 260) longText += 1;
  totalLength += row.text.length;
}
for (const kernel of KERNEL_LIBRARY) {
  withTrace += kernel.outcomes.filter((outcome) => outcome.trace).length;
  for (const variant of kernel.variants ?? []) {
    withTrace += (variant.outcomes ?? []).filter((outcome) => outcome.trace).length;
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  kernels: KERNEL_LIBRARY.length,
  outcomes: rows.length,
  averageTextLength: Number((totalLength / Math.max(1, rows.length)).toFixed(1)),
  shortTextUnder60: shortText,
  longTextOver260: longText,
  outcomesWithAuthoredTrace: withTrace,
  hardcodedShePronouns: hardcodedShe,
  hardcodedHePronouns: hardcodedHe,
  genericPhraseCounts: [...genericCounts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([phrase, count]) => ({ phrase, count })),
  repeatedOpenings: [...openings.entries()]
    .filter(([, count]) => count > 2)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 30)
    .map(([openingText, count]) => ({ opening: openingText, count })),
  domains: [...new Set(rows.map((row) => row.domain))].sort(),
  limitation:
    'This is a text-surface audit, not a literary quality judgment. It cannot establish specificity, causality or dramatic quality by itself.',
};

mkdirSync('docs/v4', { recursive: true });
writeFileSync('docs/v4/phase-12-prose-audit.json', `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
