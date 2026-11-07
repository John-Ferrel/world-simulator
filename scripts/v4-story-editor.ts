/**
 * Phase 19 Story Shape / Editorial Review tool.
 *
 * Deterministic structural signatures over Kernel roles, state conditions,
 * outcome effect skeletons and branch counts. It is an author/editor aid; the
 * runtime registry remains canonical. The LLM Story Editor reads the review
 * packet; this script never calls a model and never changes content.
 *
 *   pnpm v4:story-editor
 *   pnpm v4:story-editor -- --pack packages/v4/content/states/generated/pack-x.json
 *   pnpm v4:story-editor -- --clusters
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { KERNEL_LIBRARY } from '../packages/v4/content/kernels/index.js';
import { GENERATED_STATE_PACKS } from '../packages/v4/content/states/index.js';
import type { PlotKernel } from '../packages/v4/composition/types.js';

type Shape = {
  roles: string[];
  conditions: string[];
  effects: string[];
  productionTargets: string[];
  branchCount: number;
  shapeKey: string;
};

type KernelReview = {
  id: string;
  title: string;
  pack: string;
  domain: string;
  stage: string;
  tags: string[];
  conditions: string[];
  roles: string[];
  productionTargets: string[];
  outcomes: number;
  shapeKey: string;
  sampleOutcome: string;
};

const packForKernel = new Map<string, string>();
for (const pack of GENERATED_STATE_PACKS) {
  for (const kernel of pack.kernels ?? []) packForKernel.set(kernel.id, pack.id);
}

function conditionToken(condition: Record<string, unknown>): string {
  const kind = String(condition.kind ?? 'unknown');
  const state =
    typeof condition.stateId === 'string'
      ? condition.stateId
      : typeof condition.tag === 'string'
        ? `tag:${condition.tag}`
        : '';
  const owner = typeof condition.owner === 'string' ? `:${condition.owner}` : '';
  return state ? `${kind}:${state}${owner}` : `${kind}${owner}`;
}

function effectToken(effect: Record<string, unknown>): string {
  const type = String(effect.type ?? 'unknown');
  if (type === 'cash') return `cash:${Number(effect.amount ?? 0) >= 0 ? '+' : '-'}`;
  if (type === 'reputation') return `reputation:${Number(effect.amount ?? 0) >= 0 ? '+' : '-'}`;
  if (type === 'health') return `health:${Number(effect.amount ?? 0) >= 0 ? '+' : '-'}`;
  if (type === 'relation') return `relation:${String(effect.kind ?? '?')}`;
  if (type === 'relation_end') return 'relation_end';
  if (type === 'state_add') return 'state_add';
  if (type === 'state_remove') return 'state_remove';
  if (type === 'state_parameter') return 'state_parameter';
  if (type === 'state_transition') return 'state_transition';
  if (type === 'position') return 'position';
  if (type === 'organization_found') return 'organization_found';
  if (type === 'organization_membership') return 'organization_membership';
  if (type === 'organization_funds') return 'organization_funds';
  return type;
}

function roleCategory(kind: string): string {
  if (kind === 'subject') return 'subject';
  if (['partner', 'lover', 'spouse'].includes(kind)) return 'intimate';
  if (['mother', 'father', 'parent', 'child', 'sibling', 'guardian', 'kin'].includes(kind)) return 'kin';
  if (['official', 'employer', 'worker', 'colleague', 'landlord', 'doctor', 'priest', 'teacher', 'guard', 'judge', 'advocate'].includes(kind)) return 'institution';
  if (['neighbor', 'friend', 'stranger', 'witness', 'rival'].includes(kind)) return 'community';
  return 'other';
}

function shapeOf(kernel: PlotKernel): Shape {
  const roles = [
    ...new Set(
      kernel.roles.map((role) => `${roleCategory(role.kind)}:${role.required === false ? 'optional' : 'required'}`),
    ),
  ].sort();
  const allConditions = [
    ...(kernel.conditions ?? []),
    ...kernel.outcomes.flatMap((outcome) => outcome.conditions ?? []),
  ].map((condition) => conditionToken(condition as unknown as Record<string, unknown>));
  const conditions = [...new Set(allConditions)].sort();
  const conditionKinds = [...new Set(conditions.map((condition) => condition.split(':')[0]!))].sort();
  const effects = [
    ...new Set(
      kernel.outcomes.flatMap((outcome) =>
        outcome.effects.map((effect) => effectToken(effect as unknown as Record<string, unknown>)),
      ),
    ),
  ].sort();
  const productionTargets = [
    ...new Set(
      kernel.outcomes.flatMap((outcome) =>
        outcome.effects.flatMap((effect) => {
          if (effect.type === 'state_add' && effect.stateId) return [`state_add:${effect.stateId}`];
          if (effect.type === 'state_transition' && effect.toStateId)
            return [`state_transition:${effect.toStateId}`];
          if (effect.type === 'position') return [`position:${effect.title ?? 'any'}`];
          if (effect.type === 'organization_found') return [`organization:${effect.organization.kind ?? 'any'}`];
          return [];
        }),
      ),
    ),
  ].sort();
  const branchCount = kernel.outcomes.length;
  return {
    roles,
    conditions,
    effects,
    productionTargets,
    branchCount,
    shapeKey: [
      roles.join(','),
      conditions.join(','),
      productionTargets.join(','),
      effects.join(','),
      `branches:${branchCount}`,
    ].join('|'),
  };
}

const reviews: KernelReview[] = KERNEL_LIBRARY.map((kernel) => {
  const shape = shapeOf(kernel);
  return {
    id: kernel.id,
    title: kernel.title,
    pack: packForKernel.get(kernel.id) ?? 'base',
    domain: kernel.domain,
    stage: kernel.stage,
    tags: kernel.tags ?? [],
    conditions: shape.conditions,
    roles: shape.roles,
    productionTargets: shape.productionTargets,
    outcomes: shape.branchCount,
    shapeKey: shape.shapeKey,
    sampleOutcome: kernel.outcomes[0]?.text.slice(0, 160) ?? '',
  };
});

const clusters = new Map<string, KernelReview[]>();
const stateClusters = new Map<string, KernelReview[]>();
const productionClusters = new Map<string, KernelReview[]>();
for (const review of reviews) {
  const bucket = clusters.get(review.shapeKey) ?? [];
  bucket.push(review);
  clusters.set(review.shapeKey, bucket);
  const stateCore = review.conditions
    .filter((condition) => condition.startsWith('hasState:'))
    .sort()
    .join('|');
  if (stateCore) {
    const stateBucket = stateClusters.get(stateCore) ?? [];
    stateBucket.push(review);
    stateClusters.set(stateCore, stateBucket);
  }
  const productionCore = review.productionTargets
    .filter((target) => target.startsWith('state_add:') || target.startsWith('state_transition:'))
    .sort()
    .join('|');
  if (productionCore) {
    const productionBucket = productionClusters.get(productionCore) ?? [];
    productionBucket.push(review);
    productionClusters.set(productionCore, productionBucket);
  }
}
const repeatedClusters = [...clusters.entries()]
  .filter(([, members]) => members.length >= 2)
  .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));
const repeatedStateClusters = [...stateClusters.entries()]
  .filter(([, members]) => members.length >= 2)
  .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));
const repeatedProductionClusters = [...productionClusters.entries()]
  .filter(([, members]) => members.length >= 2)
  .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));

function normalizedText(text: string): string {
  return text.replace(/\{[^}]+\}/g, '').replace(/[^\u4e00-\u9fff]/g, '');
}

const phraseCounts = new Map<string, number>();
for (const kernel of KERNEL_LIBRARY) {
  for (const outcome of kernel.outcomes) {
    const normalized = normalizedText(outcome.text);
    for (let i = 0; i + 8 <= normalized.length; i += 1) {
      const phrase = normalized.slice(i, i + 8);
      phraseCounts.set(phrase, (phraseCounts.get(phrase) ?? 0) + 1);
    }
  }
}
const repeatedPhrases = [...phraseCounts.entries()]
  .filter(([, count]) => count >= 5)
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  .slice(0, 40)
  .map(([phrase, count]) => ({ phrase, count }));

function args(): string[] {
  return process.argv.slice(2);
}

function printClusters(): void {
  console.log(`Kernels: ${reviews.length}; distinct shapes: ${clusters.size}`);
  console.log(`Shapes with >=2 kernels: ${repeatedClusters.length}`);
  for (const [shape, members] of repeatedClusters.slice(0, 25)) {
    console.log(`\n${members.length}x ${shape}`);
    for (const member of members.slice(0, 8)) {
      console.log(`  ${member.pack.padEnd(26)} ${member.id}`);
    }
  }
}

function printPack(file: string): void {
  const pack = JSON.parse(readFileSync(file, 'utf8')) as {
    id: string;
    title?: string;
    kernels?: PlotKernel[];
  };
  console.log(`# Story Editor review packet — ${pack.id}`);
  if (pack.title) console.log(`Title: ${pack.title}`);
  console.log(`Kernels: ${pack.kernels?.length ?? 0}`);
  for (const kernel of pack.kernels ?? []) {
    const shape = shapeOf(kernel);
    const cluster = clusters.get(shape.shapeKey) ?? [];
    console.log(`\n## ${kernel.id} — ${kernel.title}`);
    console.log(`stage=${kernel.stage}; domain=${kernel.domain}; outcomes=${kernel.outcomes.length}`);
    console.log(`roles: ${shape.roles.join(', ')}`);
    console.log(`conditions: ${shape.conditions.join(', ') || 'none'}`);
    console.log(`effects: ${shape.effects.join(', ')}`);
    console.log(`production: ${shape.productionTargets.join(', ') || 'none'}`);
    console.log(`shape cluster: ${cluster.length} kernel(s) in current library`);
    for (const member of cluster.filter((candidate) => candidate.id !== kernel.id).slice(0, 4)) {
      console.log(`  nearest shape: ${member.id} (${member.pack})`);
    }
    console.log(`first outcome: ${kernel.outcomes[0]?.text.slice(0, 220) ?? ''}`);
  }
}

function writeReport(): void {
  const packStats = new Map<string, { kernels: number; shapes: Set<string> }>();
  for (const review of reviews) {
    const entry = packStats.get(review.pack) ?? { kernels: 0, shapes: new Set<string>() };
    entry.kernels += 1;
    entry.shapes.add(review.shapeKey);
    packStats.set(review.pack, entry);
  }
  const payload = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    source: 'KERNEL_LIBRARY + GENERATED_STATE_PACKS',
    counts: {
      kernels: reviews.length,
      distinctShapes: clusters.size,
      shapesWithTwoOrMore: repeatedClusters.length,
      repeatedPhrases: repeatedPhrases.length,
    },
    packDiversity: [...packStats.entries()]
      .map(([pack, data]) => ({
        pack,
        kernels: data.kernels,
        shapes: data.shapes.size,
        shapeRatio: Number((data.shapes.size / data.kernels).toFixed(3)),
      }))
      .sort((a, b) => a.shapeRatio - b.shapeRatio || b.kernels - a.kernels),
    repeatedClusters: repeatedClusters.slice(0, 80).map(([shapeKey, members]) => ({
      shapeKey,
      count: members.length,
      kernels: members.map((member) => ({
        id: member.id,
        title: member.title,
        pack: member.pack,
      })),
    })),
    repeatedStateClusters: repeatedStateClusters.slice(0, 80).map(([stateKey, members]) => ({
      stateKey,
      count: members.length,
      kernels: members.map((member) => ({ id: member.id, title: member.title, pack: member.pack })),
    })),
    repeatedProductionClusters: repeatedProductionClusters.slice(0, 80).map(([productionKey, members]) => ({
      productionKey,
      count: members.length,
      kernels: members.map((member) => ({ id: member.id, title: member.title, pack: member.pack })),
    })),
    repeatedPhrases,
    reviews,
  };
  mkdirSync('docs/v4', { recursive: true });
  writeFileSync('docs/v4/story-shapes.json', `${JSON.stringify(payload, null, 2)}\n`);
  const md: string[] = [
    '# Phase 19 — Story Shape Report',
    '',
    `Generated: ${payload.generatedAt}`,
    '',
    'Deterministic editorial aid. `shapeKey` is role topology + condition kinds + outcome effect skeleton + branch count. It does not judge literary quality.',
    '',
    '## Counts',
    '',
    '| Metric | Count |',
    '|---|---:|',
    `| Kernels | ${reviews.length} |`,
    `| Distinct shapes | ${clusters.size} |`,
    `| Shapes with >=2 kernels | ${repeatedClusters.length} |`,
    '',
    '## Pack shape diversity',
    '',
    '| Pack | Kernels | Shapes | Ratio |',
    '|---|---:|---:|---:|',
    ...payload.packDiversity.slice(0, 30).map(
      (row) => `| ${row.pack} | ${row.kernels} | ${row.shapes} | ${row.shapeRatio} |`,
    ),
    '',
    '## Largest structural clusters',
    '',
    '| Count | Shape | Example kernels |',
    '|---:|---|---|',
    ...repeatedClusters.slice(0, 25).map(
      ([shape, members]) =>
        `| ${members.length} | \`${shape.slice(0, 90)}\` | ${members
          .slice(0, 4)
          .map((member) => member.id)
          .join(', ')} |`,
    ),
    '',
    '## State-core clusters',
    '',
    'These group kernels that consume the same standing state, even when their effect skeleton differs. They are the best recall aid for “same situation, different props”.',
    '',
    '| Count | State core | Example kernels |',
    '|---:|---|---|',
    ...repeatedStateClusters.slice(0, 20).map(
      ([stateKey, members]) =>
        `| ${members.length} | \`${stateKey.slice(0, 90)}\` | ${members.slice(0, 5).map((member) => member.id).join(', ')} |`,
    ),
    '',
    '## Production clusters',
    '',
    'These group kernels that create the same state/transition, even when their entry conditions differ. They expose job-sampler and repeated-entry patterns.',
    '',
    '| Count | Production target | Example kernels |',
    '|---:|---|---|',
    ...repeatedProductionClusters.slice(0, 20).map(
      ([productionKey, members]) =>
        `| ${members.length} | \`${productionKey.slice(0, 90)}\` | ${members.slice(0, 5).map((member) => member.id).join(', ')} |`,
    ),
    '',
    '## Repeated 8-character phrases',
    '',
    '| Count | Phrase |',
    '|---:|---|',
    ...repeatedPhrases.slice(0, 30).map(({ phrase, count }) => `| ${count} | ${phrase} |`),
    '',
    '## Use',
    '',
    '```bash',
    'pnpm v4:story-editor',
    'pnpm v4:story-editor -- --pack packages/v4/content/states/generated/pack-<name>.json',
    'pnpm v4:story-editor -- --clusters',
    '```',
    '',
    'A large cluster is not an automatic reject. The LLM Story Editor reads the packet and asks whether premise, conflict, motivation, twist or outcome pattern is actually different. The goal is to add imagination, not to force a single template.',
  ];
  writeFileSync('docs/v4/story-shapes.md', `${md.join('\n')}\n`);
  console.log(
    JSON.stringify({
      kernels: reviews.length,
      distinctShapes: clusters.size,
      shapesWithTwoOrMore: repeatedClusters.length,
      output: ['docs/v4/story-shapes.json', 'docs/v4/story-shapes.md'],
    }),
  );
}

const argv = args();
if (argv.includes('--pack')) printPack(argv[argv.indexOf('--pack') + 1] ?? '');
else if (argv.includes('--clusters')) printClusters();
else writeReport();
