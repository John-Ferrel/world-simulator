/**
 * Generate the Phase 17 Content Catalog from the content that is actually
 * loaded by the runtime. This is an index, not a second registry: the runtime
 * continues to use ALL_STATES / KERNEL_LIBRARY / GENERATED_STATE_PACKS.
 *
 *   pnpm v4:content-catalog
 *
 * Outputs:
 *   docs/v4/content-catalog.json
 *   docs/v4/content-catalog.md
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { ALL_STATES, GENERATED_STATE_PACKS } from '../packages/v4/content/states/index.js';
import { KERNEL_LIBRARY } from '../packages/v4/content/kernels/index.js';

const generatedAt = new Date().toISOString();
const stateConsumers = new Map<string, string[]>();
const kernelText = new Map(KERNEL_LIBRARY.map((kernel) => [kernel.id, JSON.stringify(kernel)]));
for (const state of ALL_STATES) {
  const consumers = KERNEL_LIBRARY.filter((kernel) =>
    kernelText.get(kernel.id)!.includes(state.id),
  ).map((kernel) => kernel.id);
  stateConsumers.set(state.id, consumers);
}

const domains: Record<string, number> = {};
const stages: Record<string, number> = {};
const tags: Record<string, number> = {};
for (const kernel of KERNEL_LIBRARY) {
  domains[kernel.domain] = (domains[kernel.domain] ?? 0) + 1;
  stages[kernel.stage] = (stages[kernel.stage] ?? 0) + 1;
  for (const tag of kernel.tags ?? []) tags[tag] = (tags[tag] ?? 0) + 1;
}

const kernelPack = new Map<string, string>();
for (const pack of GENERATED_STATE_PACKS) {
  for (const kernel of pack.kernels ?? []) kernelPack.set(kernel.id, pack.id);
}

const stateRows = ALL_STATES.map((state) => {
  const consumers = stateConsumers.get(state.id) ?? [];
  const stagesForState = new Set<string>();
  for (const id of consumers) {
    const stage = KERNEL_LIBRARY.find((kernel) => kernel.id === id)?.stage;
    if (stage) stagesForState.add(stage);
  }
  return {
    id: state.id,
    title: state.title,
    owner: state.owner,
    tags: state.tags,
    packId: state.packId,
    slot: state.slot,
    consumers: consumers.length,
    consumerSamples: consumers.slice(0, 8),
    consumerPacks: [...new Set(consumers.map((id) => kernelPack.get(id) ?? 'base'))].sort(),
    consumerStages: [...stagesForState].sort(),
    titleHint: state.description.slice(0, 100),
  };
});

const packRows = GENERATED_STATE_PACKS.map((pack) => {
  const states = pack.states.map((state) => state.id);
  const kernels = pack.kernels ?? [];
  return {
    id: pack.id,
    title: pack.title,
    version: pack.version,
    author: pack.author,
    model: pack.model,
    states,
    kernels: kernels.length,
    domains: [...new Set(kernels.map((kernel) => kernel.domain))].sort(),
    stages: [...new Set(kernels.map((kernel) => kernel.stage))].sort(),
    tags: [...new Set(pack.states.flatMap((state) => state.tags))].sort(),
    themes: pack.themes ?? [],
    era: pack.era,
    tone: pack.tone ?? [],
    rarity: pack.rarity,
    contentWarnings: pack.contentWarnings ?? [],
    externalStatesConsumed: [
      ...new Set(
        (pack.kernels ?? [])
          .flatMap((kernel) => ALL_STATES.map((state) => state.id).filter((id) => JSON.stringify(kernel).includes(id)))
          .filter((id) => !pack.states.some((state) => state.id === id)),
      ),
    ].sort(),
    rationale: pack.rationale,
  };
});

const unconsumed = stateRows.filter((row) => row.consumers === 0).map((row) => row.id);
const lowConsumption = stateRows
  .filter((row) => row.consumers > 0 && row.consumers <= 2)
  .sort((a, b) => a.consumers - b.consumers || a.id.localeCompare(b.id));
const stageGaps = ['infancy', 'childhood', 'adolescence', 'adulthood', 'elderhood'].map((stage) => ({
  stage,
  kernels: stages[stage] ?? 0,
}));
const domainGaps = Object.entries(domains).sort((a, b) => a[1] - b[1]).slice(0, 15);

const catalog = {
  schemaVersion: 1,
  generatedAt,
  source: 'packages/v4/content/states/index.ts + packages/v4/content/kernels/index.ts',
  counts: {
    states: ALL_STATES.length,
    kernels: KERNEL_LIBRARY.length,
    eventKernels: KERNEL_LIBRARY.filter((kernel) => kernel.kind === 'event').length,
    taskKernels: KERNEL_LIBRARY.filter((kernel) => kernel.kind === 'task').length,
    generatedPacks: GENERATED_STATE_PACKS.length,
    generatedStates: GENERATED_STATE_PACKS.reduce((sum, pack) => sum + pack.states.length, 0),
    generatedKernels: GENERATED_STATE_PACKS.reduce((sum, pack) => sum + (pack.kernels?.length ?? 0), 0),
  },
  domains,
  stages,
  tags,
  packs: packRows,
  states: stateRows.sort((a, b) => a.id.localeCompare(b.id)),
  gaps: {
    unconsumed,
    lowConsumption: lowConsumption.map((row) => ({ id: row.id, consumers: row.consumers })),
    stages: stageGaps,
    leastCoveredDomains: domainGaps,
    authorGuidance: [
      'Prefer adding consumers for an existing unconsumed state before adding a near-duplicate state.',
      'A new state should declare at least one downstream kernel or reaction in the same pack, or explicitly explain why an existing pack will consume it.',
      'Use a unique short id prefix per pack; do not reuse a state id for a different meaning.',
      'Cross-pack references are allowed and encouraged: secret-lover, cursed-by-wish, raising-child, office-patronage, occupied-city-regime are shared hooks.',
      'Every new pack must pass scripts/v4-validate-state-pack.ts before registration.',
    ],
  },
};

mkdirSync('docs/v4', { recursive: true });
writeFileSync('docs/v4/content-catalog.json', `${JSON.stringify(catalog, null, 2)}\n`);

const md: string[] = [];
md.push('# Content Catalog');
md.push('');
md.push(`Generated: ${generatedAt}`);
md.push('');
md.push('This file is generated from the runtime content, not maintained by hand.');
md.push('');
md.push('## Counts');
md.push('');
md.push('| Metric | Value |');
md.push('|---|---:|');
for (const [key, value] of Object.entries(catalog.counts)) md.push(`| ${key} | ${value} |`);
md.push('');
md.push('## Stage coverage');
md.push('');
md.push('| Stage | Kernels |');
md.push('|---|---:|');
for (const row of stageGaps) md.push(`| ${row.stage} | ${row.kernels} |`);
md.push('');
md.push('## Least-covered domains');
md.push('');
md.push('| Domain | Kernels |');
md.push('|---|---:|');
for (const [domain, count] of domainGaps) md.push(`| ${domain} | ${count} |`);
md.push('');
md.push('## Content packs');
md.push('');
md.push('| Pack | States | Kernels | Domains | Stages | External states consumed |');
md.push('|---|---:|---:|---|---|---|');
for (const pack of packRows) {
  md.push(
    `| \`${pack.id}\` | ${pack.states.length} | ${pack.kernels} | ${pack.domains.join(', ')} | ${pack.stages.join(', ')} | ${pack.externalStatesConsumed.slice(0, 8).join(', ') || '—'} |`,
  );
}
md.push('');
md.push('## Pack metadata');
md.push('');
md.push('| Pack | Themes | Tone | Rarity | Content warnings |');
md.push('|---|---|---|---|---|');
for (const pack of packRows) {
  md.push(
    `| \`${pack.id}\` | ${pack.themes.join(', ') || '—'} | ${pack.tone.join(', ') || '—'} | ${pack.rarity ?? '—'} | ${pack.contentWarnings.join(', ') || '—'} |`,
  );
}
md.push('');
md.push('## Unconsumed states');
md.push('');
md.push(
  unconsumed.length === 0
    ? 'None.'
    : unconsumed.map((id) => `- \`${id}\``).join('\n'),
);
md.push('');
md.push('## Low-consumption states (1–2 kernels)');
md.push('');
for (const row of lowConsumption) md.push(`- \`${row.id}\` — ${row.consumers} consumer(s)`);
md.push('');
md.push('## State index');
md.push('');
md.push('| State | Pack | Owner | Tags | Consumers | Consumer packs | Stages |');
md.push('|---|---|---|---|---:|---|---|');
for (const row of stateRows) {
  md.push(
    `| \`${row.id}\` | ${row.packId} | ${row.owner} | ${row.tags.slice(0, 5).join(', ')} | ${row.consumers} | ${row.consumerPacks.join(', ') || '—'} | ${row.consumerStages.join(', ') || '—'} |`,
  );
}
md.push('');
md.push('## Author guidance');
md.push('');
for (const item of catalog.gaps.authorGuidance) md.push(`- ${item}`);
md.push('');

writeFileSync('docs/v4/content-catalog.md', `${md.join('\n')}\n`);
console.log(
  JSON.stringify({
    states: catalog.counts.states,
    kernels: catalog.counts.kernels,
    packs: catalog.counts.generatedPacks,
    unconsumed: unconsumed.length,
    lowConsumption: lowConsumption.length,
    output: ['docs/v4/content-catalog.json', 'docs/v4/content-catalog.md'],
  }),
);
