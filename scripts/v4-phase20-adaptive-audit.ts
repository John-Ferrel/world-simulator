/**
 * Phase 20 adaptive-storylet audit.
 *
 * Counts authored adaptive contexts and their appearance in committed life
 * dossiers. This is an observation tool, not a second runtime.
 *
 *   pnpm v4:phase20-adaptive-audit
 *   pnpm v4:phase20-adaptive-audit docs/v4/phase-15-phase20-a.json,...
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { KERNEL_LIBRARY } from '../packages/v4/content/kernels/index.js';
import { GENERATED_STATE_PACKS } from '../packages/v4/content/states/index.js';

const packForKernel = new Map<string, string>();
for (const pack of GENERATED_STATE_PACKS) {
  for (const kernel of pack.kernels ?? []) packForKernel.set(kernel.id, pack.id);
}
const adaptive = KERNEL_LIBRARY.filter((kernel) => (kernel.adaptiveContexts?.length ?? 0) > 0);
const adaptiveIds = new Set(adaptive.map((kernel) => kernel.id));
const contexts = adaptive.flatMap((kernel) => kernel.adaptiveContexts ?? []);

const defaultFiles = [
  'docs/v4/phase-15-phase20-a.json',
  'docs/v4/phase-15-phase20-b.json',
  'docs/v4/phase-15-phase20-c.json',
  'docs/v4/phase-15-phase20-elder.json',
  'docs/v4/phase-15-phase20-mixed.json',
];
const input = process.argv.slice(2).find((arg) => !arg.startsWith('--')) ?? defaultFiles.join(',');
const files = input
  .split(',')
  .map((file) => file.trim())
  .filter(Boolean);

type Dossier = {
  seed: string;
  events: number;
  lives?: {
    name: string;
    events?: { action: string; date: { year: number; month: number }; immediateText?: string }[];
  }[];
};
const observations = new Map<
  string,
  { kernel: string; pack: string; events: number; focal: number; seeds: Set<string> }
>();
let totalEvents = 0;
let focalEvents = 0;
let adaptiveEvents = 0;
for (const file of files) {
  const dossier = JSON.parse(readFileSync(resolve(file), 'utf8')) as Dossier;
  totalEvents += dossier.events;
  for (const life of dossier.lives ?? []) {
    focalEvents += life.events?.length ?? 0;
    for (const event of life.events ?? []) {
      const kernel = event.action.split('::')[0]!;
      if (!adaptiveIds.has(kernel)) continue;
      adaptiveEvents += 1;
      const entry = observations.get(kernel) ?? {
        kernel,
        pack: packForKernel.get(kernel) ?? 'base',
        events: 0,
        focal: 0,
        seeds: new Set<string>(),
      };
      entry.events += 1;
      entry.focal += 1;
      entry.seeds.add(dossier.seed);
      observations.set(kernel, entry);
    }
  }
}

const packRows = new Map<string, { pack: string; kernels: number; contexts: number }>();
for (const kernel of adaptive) {
  const pack = packForKernel.get(kernel.id) ?? 'base';
  const row = packRows.get(pack) ?? { pack, kernels: 0, contexts: 0 };
  row.kernels += 1;
  row.contexts += kernel.adaptiveContexts?.length ?? 0;
  packRows.set(pack, row);
}
const rows = [...observations.values()]
  .map((entry) => ({ ...entry, seeds: [...entry.seeds].sort() }))
  .sort((a, b) => b.events - a.events || a.kernel.localeCompare(b.kernel));

const payload = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  note: 'Counts are by kernel capability (kernel.adaptiveContexts). They do not prove that a specific adaptive context matched during the event.',
  sources: files,
  counts: {
    kernels: KERNEL_LIBRARY.length,
    adaptiveKernels: adaptive.length,
    adaptiveContexts: contexts.length,
    adaptivePacks: packRows.size,
    totalEvents,
    focalEvents,
    adaptiveEvents,
    adaptiveShare: focalEvents > 0 ? Number((adaptiveEvents / focalEvents).toFixed(4)) : 0,
  },
  packs: [...packRows.values()].sort(
    (a, b) => b.kernels - a.kernels || a.pack.localeCompare(b.pack),
  ),
  observedKernels: rows,
  unobservedAdaptiveKernels: adaptive
    .filter((kernel) => !observations.has(kernel.id))
    .map((kernel) => ({ id: kernel.id, pack: packForKernel.get(kernel.id) ?? 'base' }))
    .slice(0, 80),
};
mkdirSync('docs/v4', { recursive: true });
writeFileSync('docs/v4/phase-20-adaptive-audit.json', `${JSON.stringify(payload, null, 2)}\n`);
const md: string[] = [
  '# Phase 20 — Adaptive Storylet Audit',
  '',
  `Sources: ${files.join(', ')}`,
  '',
  '> Counts are by kernel capability (`kernel.adaptiveContexts`); they do not prove a specific context matched during the event.',
  '',
  '| Metric | Count |',
  '|---|---:|',
  `| Kernels | ${payload.counts.kernels} |`,
  `| Adaptive kernels | ${payload.counts.adaptiveKernels} |`,
  `| Adaptive contexts | ${payload.counts.adaptiveContexts} |`,
  `| Adaptive packs | ${payload.counts.adaptivePacks} |`,
  `| Focal events | ${payload.counts.focalEvents} |`,
  `| Focal events from adaptive-capable kernels | ${payload.counts.adaptiveEvents} |`,
  `| Share of focal events from adaptive-capable kernels | ${payload.counts.adaptiveShare} |`,
  '',
  '## Adaptive kernels by pack',
  '',
  '| Pack | Adaptive kernels | Contexts |',
  '|---|---:|---:|',
  ...payload.packs.map((row) => `| ${row.pack} | ${row.kernels} | ${row.contexts} |`),
  '',
  '## Observed adaptive kernels',
  '',
  '| Events | Seeds | Pack | Kernel |',
  '|---:|---:|---|---|',
  ...rows
    .slice(0, 60)
    .map((row) => `| ${row.events} | ${row.seeds.length} | ${row.pack} | ${row.kernel} |`),
  '',
  '## Unobserved adaptive kernels',
  '',
  ...payload.unobservedAdaptiveKernels.map((row) => `- \`${row.id}\` (${row.pack})`),
];
writeFileSync('docs/v4/phase-20-adaptive-audit.md', `${md.join('\n')}\n`);
console.log(
  JSON.stringify({
    adaptiveKernels: adaptive.length,
    adaptiveContexts: contexts.length,
    files: files.length,
    adaptiveEvents,
    adaptiveShare: payload.counts.adaptiveShare,
    focalEvents,
    observed: rows.length,
    output: ['docs/v4/phase-20-adaptive-audit.json', 'docs/v4/phase-20-adaptive-audit.md'],
  }),
);
