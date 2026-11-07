/**
 * Phase 19 Cross-Pack Opportunity Map.
 *
 * A deterministic author/editor aid that finds states which could collide but
 * currently have no kernel consuming both. It is derived from the runtime
 * registry; it is not a second content registry and does not change execution.
 *
 *   pnpm v4:cross-pack-map
 *   pnpm v4:cross-pack-map -- --pair known-affair,office-patronage
 *   pnpm v4:cross-pack-map -- --state known-affair
 *   pnpm v4:cross-pack-map -- --gaps
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { ALL_STATES } from '../packages/v4/content/states/index.js';
import { KERNEL_LIBRARY } from '../packages/v4/content/kernels/index.js';
import { GENERATED_STATE_PACKS } from '../packages/v4/content/states/index.js';
import type { PlotKernel } from '../packages/v4/composition/types.js';
import type { StateDefinition } from '../packages/v4/state/types.js';

type StateInfo = {
  id: string;
  title: string;
  pack: string;
  owner: string;
  tags: string[];
  consumers: string[];
  creators: string[];
  openPairs: number;
};

type OpportunityPair = {
  key: string;
  a: string;
  b: string;
  titleA: string;
  titleB: string;
  packA: string;
  packB: string;
  ownerA: string;
  ownerB: string;
  tags: string[];
  category: string;
  score: number;
  covered: boolean;
  consumerCount: number;
  sampleConsumers: { id: string; title: string; packs: string[] }[];
  prompts: string[];
};

const packForState = new Map<string, string>();
const packForKernel = new Map<string, string>();
for (const pack of GENERATED_STATE_PACKS) {
  for (const state of pack.states) packForState.set(state.id, pack.id);
  for (const kernel of pack.kernels ?? []) packForKernel.set(kernel.id, pack.id);
}

const TAG_FAMILIES: Record<string, string[]> = {
  love: ['love', 'intimacy', 'desire', 'romance', 'courtship', 'secret_intimacy', 'queer', 'marriage'],
  family: ['family', 'child', 'care', 'parent', 'household', 'kin', 'inheritance', 'grief'],
  war: ['war', 'occupation', 'military', 'conscription', 'displacement', 'refugee', 'migration', 'curfew', 'shortage'],
  power: ['office', 'politics', 'power', 'patronage', 'government', 'authority', 'election', 'position', 'court'],
  crime: ['crime', 'legal', 'police', 'prison', 'court', 'detention', 'wanted', 'racket', 'fraud', 'smuggling'],
  work: ['work', 'craft', 'apprentice', 'journeyman', 'factory', 'employment', 'workshop', 'profession'],
  luck: ['luck', 'fortune', 'windfall', 'coincidence', 'gambling', 'reversal', 'borrowed'],
  supernatural: ['curse', 'witchcraft', 'omen', 'miracle', 'faith', 'religion', 'supernatural', 'saint', 'cult'],
  elder: ['elderhood', 'elder', 'aging', 'late_life', 'memory', 'empty_nest', 'legacy', 'archive'],
  history: ['history', 'witness', 'testimony', 'occupation', 'purge', 'revolution', 'era', 'historical'],
  money: ['money', 'wealth', 'debt', 'inheritance', 'tax', 'fortune', 'rent', 'wage'],
  scandal: ['scandal', 'reputation', 'fame', 'media', 'rumor', 'public', 'shame'],
  body: ['body', 'illness', 'health', 'injury', 'mark', 'pregnancy', 'disability'],
};

const PROMPTS: Record<string, string[]> = {
  romance_power: [
    'blackmail by a rival who knows the private relationship',
    'the partner uses political access for their own agenda',
    'a public confession that costs one career and saves another',
    'the press identifies the wrong lover',
    'the scandal increases support among people who distrust the elite',
    'resignation turns into informal influence',
  ],
  family_war: [
    'choose which child is evacuated first',
    'a missing relative returns with a different loyalty',
    'a child is placed with strangers and learns a new family name',
    'a small kindness reconnects two families after the war',
    'a family secret becomes the basis of a political accusation',
    'ration priority forces a household to rank its own members',
  ],
  craft_luck: [
    'the apprentice completes a masterpiece the master could not finish',
    'colleagues suspect cheating because the result is too good',
    'the master exploits the apprentice’s luck in a public competition',
    'promotion arrives at the worst possible time',
    'a religious group treats the lucky worker as a sign',
    'the debt behind the luck comes due at an exhibition',
  ],
  elder_history: [
    'an old witness is asked to identify someone from a photograph',
    'a grandchild revives a banned cause',
    'the family archive becomes legal evidence',
    'late love collides with a political past',
    'a public apology is demanded by the wrong generation',
    'a protected historical lie is inherited with the house',
  ],
  money_crime: [
    'a bribe disguised as an investment',
    'an audit that puts a family member at risk',
    'protection money collected through a legitimate shop',
    'a fortune buys silence, not safety',
    'a debt is sold to a creditor with political friends',
  ],
  body_faith: [
    'a cure is attributed to a person who does not believe in it',
    'a chronic illness becomes a public omen',
    'a doctor and a priest give incompatible instructions',
    'a body mark is read as evidence of a crime',
  ],
  default: [
    'a shared secret becomes leverage',
    'public exposure forces an alliance',
    'one person protects another at a cost',
    'an old obligation returns with a new claimant',
    'a small favor becomes an inheritance',
    'the expected betrayal comes from the wrong direction',
  ],
};

function hasAny(tags: string[], terms: string[]): boolean {
  const set = new Set(tags);
  return terms.some((term) => set.has(term));
}

function categoryFor(tagsA: string[], tagsB: string[]): string {
  // Specific intersections win over the broad love/power heuristic. An old
  // witness with a political past is an elder-history collision, not a
  // romance story because one state happens to carry a love tag.
  const aFamily = hasAny(tagsA, TAG_FAMILIES.family!);
  const bFamily = hasAny(tagsB, TAG_FAMILIES.family!);
  const aWar = hasAny(tagsA, TAG_FAMILIES.war!);
  const bWar = hasAny(tagsB, TAG_FAMILIES.war!);
  if ((aFamily && bWar) || (bFamily && aWar)) return 'family_war';
  const aElder = hasAny(tagsA, TAG_FAMILIES.elder!);
  const bElder = hasAny(tagsB, TAG_FAMILIES.elder!);
  const aHistory = hasAny(tagsA, TAG_FAMILIES.history!);
  const bHistory = hasAny(tagsB, TAG_FAMILIES.history!);
  if ((aElder && bHistory) || (bElder && aHistory)) return 'elder_history';
  const aCraft = hasAny(tagsA, TAG_FAMILIES.work!);
  const bCraft = hasAny(tagsB, TAG_FAMILIES.work!);
  const aLuck = hasAny(tagsA, [...TAG_FAMILIES.luck!, ...TAG_FAMILIES.supernatural!]);
  const bLuck = hasAny(tagsB, [...TAG_FAMILIES.luck!, ...TAG_FAMILIES.supernatural!]);
  if ((aCraft && bLuck) || (bCraft && aLuck)) return 'craft_luck';
  const aLove = hasAny(tagsA, TAG_FAMILIES.love!);
  const bLove = hasAny(tagsB, TAG_FAMILIES.love!);
  const aPower = hasAny(tagsA, [...TAG_FAMILIES.power!, ...TAG_FAMILIES.scandal!]);
  const bPower = hasAny(tagsB, [...TAG_FAMILIES.power!, ...TAG_FAMILIES.scandal!]);
  if ((aLove && bPower) || (bLove && aPower)) return 'romance_power';
  const aMoney = hasAny(tagsA, TAG_FAMILIES.money!);
  const bMoney = hasAny(tagsB, TAG_FAMILIES.money!);
  const aCrime = hasAny(tagsA, [...TAG_FAMILIES.crime!, ...TAG_FAMILIES.power!]);
  const bCrime = hasAny(tagsB, [...TAG_FAMILIES.crime!, ...TAG_FAMILIES.power!]);
  if ((aMoney && bCrime) || (bMoney && aCrime)) return 'money_crime';
  const aBody = hasAny(tagsA, TAG_FAMILIES.body!);
  const bBody = hasAny(tagsB, TAG_FAMILIES.body!);
  const aFaith = hasAny(tagsA, TAG_FAMILIES.supernatural!);
  const bFaith = hasAny(tagsB, TAG_FAMILIES.supernatural!);
  if ((aBody && bFaith) || (bBody && aFaith)) return 'body_faith';
  return 'default';
}

function stateTags(state: StateDefinition | undefined): string[] {
  return state?.tags ?? [];
}

function conditionStateIds(kernel: PlotKernel): string[] {
  const ids: string[] = [];
  for (const condition of [
    ...(kernel.conditions ?? []),
    ...kernel.outcomes.flatMap((outcome) => outcome.conditions ?? []),
  ]) {
    if ((condition.kind === 'hasState' || condition.kind === 'notHasState') && condition.stateId) {
      ids.push(condition.stateId);
    }
  }
  return ids;
}

const stateById = new Map(ALL_STATES.map((state) => [state.id, state]));
const consumers = new Map<string, PlotKernel[]>();
const creators = new Map<string, PlotKernel[]>();
for (const state of ALL_STATES) {
  consumers.set(state.id, []);
  creators.set(state.id, []);
}
for (const kernel of KERNEL_LIBRARY) {
  for (const id of new Set(conditionStateIds(kernel))) {
    consumers.get(id)?.push(kernel);
  }
  for (const outcome of kernel.outcomes) {
    for (const effect of outcome.effects) {
      if (effect.type === 'state_add' && effect.stateId) creators.get(effect.stateId)?.push(kernel);
      if (effect.type === 'state_transition' && effect.toStateId) creators.get(effect.toStateId)?.push(kernel);
    }
  }
}

const stateInfo: StateInfo[] = ALL_STATES.map((state) => ({
  id: state.id,
  title: state.title,
  pack: state.packId ?? packForState.get(state.id) ?? 'base',
  owner: state.owner ?? 'person',
  tags: stateTags(state),
  consumers: (consumers.get(state.id) ?? []).map((kernel) => kernel.id),
  creators: (creators.get(state.id) ?? []).map((kernel) => kernel.id),
  openPairs: 0,
}));
const infoById = new Map(stateInfo.map((info) => [info.id, info]));

// Pairs that already share a kernel are not "gaps"; they are evidence that the
// library already supports that collision and are kept only for comparison.
const coveredPairs = new Set<string>();
for (const kernel of KERNEL_LIBRARY) {
  const ids = [...new Set(conditionStateIds(kernel))].filter((id) => stateById.has(id));
  for (let i = 0; i < ids.length; i += 1) {
    for (let j = i + 1; j < ids.length; j += 1) {
      coveredPairs.add([ids[i]!, ids[j]!].sort().join('|'));
    }
  }
}

const eligible = stateInfo.filter(
  (state) =>
    state.owner !== 'world' &&
    state.consumers.length > 0 &&
    !state.id.startsWith('wish-') &&
    state.id !== 'city-under-occupation',
);
const pairs: OpportunityPair[] = [];
for (let i = 0; i < eligible.length; i += 1) {
  for (let j = i + 1; j < eligible.length; j += 1) {
    const a = eligible[i]!;
    const b = eligible[j]!;
    if (a.pack === b.pack) continue;
    const key = [a.id, b.id].sort().join('|');
    const covered = coveredPairs.has(key);
    const shared = a.tags.filter((tag) => new Set(b.tags).has(tag));
    const tags = [...new Set([...a.tags, ...b.tags])];
    const category = categoryFor(a.tags, b.tags);
    const consumerCount = Math.min(a.consumers.length, b.consumers.length);
    const ubiquity = Math.max(0, a.consumers.length - 30) + Math.max(0, b.consumers.length - 30);
    const score =
      shared.length * 3 +
      (category === 'default' ? 0 : 8) +
      Math.min(consumerCount, 18) * 0.15 +
      (covered ? 2 : 0) -
      ubiquity * 0.08;
    const sampleIds = [...new Set([...a.consumers, ...b.consumers])].slice(0, 3);
    pairs.push({
      key,
      a: a.id,
      b: b.id,
      titleA: a.title,
      titleB: b.title,
      packA: a.pack,
      packB: b.pack,
      ownerA: a.owner,
      ownerB: b.owner,
      tags,
      category,
      score: Number(score.toFixed(3)),
      covered,
      consumerCount,
      sampleConsumers: sampleIds.map((id) => {
        const kernel = KERNEL_LIBRARY.find((candidate) => candidate.id === id);
        return {
          id,
          title: kernel?.title ?? id,
          packs: [
            ...new Set(
              conditionStateIds(kernel!)
                .map((stateId) => infoById.get(stateId)?.pack)
                .filter((value): value is string => Boolean(value)),
            ),
          ],
        };
      }),
      prompts: PROMPTS[category] ?? PROMPTS.default!,
    });
  }
}
pairs.sort((a, b) => b.score - a.score || a.key.localeCompare(b.key));
for (const pair of pairs) {
  if (!pair.covered) {
    const a = infoById.get(pair.a);
    const b = infoById.get(pair.b);
    if (a) a.openPairs += 1;
    if (b) b.openPairs += 1;
  }
}
const openPairs = pairs.filter((pair) => !pair.covered);
const categories = new Map<string, number>();
for (const pair of openPairs) categories.set(pair.category, (categories.get(pair.category) ?? 0) + 1);

function args(): string[] {
  return process.argv.slice(2);
}

function printPair(key: string): void {
  const [a, b] = key.split(',').map((value) => value.trim()).sort();
  const pair = pairs.find((candidate) => candidate.key === [a, b].join('|'));
  if (!pair) {
    console.error(`unknown pair: ${key}`);
    process.exit(1);
  }
  console.log(JSON.stringify(pair, null, 2));
}

function printState(id: string): void {
  const state = infoById.get(id);
  if (!state) {
    console.error(`unknown state: ${id}`);
    process.exit(1);
  }
  console.log(JSON.stringify(state, null, 2));
  console.log('\nOpen collisions:');
  for (const pair of openPairs.filter((candidate) => candidate.a === id || candidate.b === id).slice(0, 20)) {
    console.log(`${pair.score.toFixed(2)} ${pair.category} ${pair.a} <> ${pair.b}`);
    console.log(`  ${pair.prompts.slice(0, 3).join(' / ')}`);
  }
}

function printGaps(): void {
  console.log(`States: ${stateInfo.length}; kernels: ${KERNEL_LIBRARY.length}`);
  console.log(`Open cross-pack pairs (top 300): ${openPairs.length}; covered pairs: ${coveredPairs.size}`);
  console.log('\nOpen pairs by collision family:');
  for (const [category, count] of [...categories.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${category.padEnd(16)} ${count}`);
  }
  console.log('\nStates with no consumers:');
  for (const state of stateInfo.filter((candidate) => candidate.consumers.length === 0)) {
    console.log(`  ${state.id} [${state.pack}]`);
  }
  console.log('\nStates with only 1 consumer:');
  for (const state of stateInfo.filter((candidate) => candidate.consumers.length === 1)) {
    console.log(`  ${state.id} [${state.pack}]`);
  }
  console.log('\nTop open pairs:');
  for (const pair of openPairs.slice(0, 30)) {
    console.log(`${pair.score.toFixed(2)} ${pair.category.padEnd(16)} ${pair.a} <> ${pair.b}`);
  }
}

function writeMap(): void {
  const payload = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    source: 'ALL_STATES + KERNEL_LIBRARY + GENERATED_STATE_PACKS',
    counts: {
      states: stateInfo.length,
      kernels: KERNEL_LIBRARY.length,
      openPairs: openPairs.length,
      coveredPairs: coveredPairs.size,
    },
    categories: Object.fromEntries([...categories.entries()].sort((a, b) => b[1] - a[1])),
    states: stateInfo
      .slice()
      .sort((a, b) => b.openPairs - a.openPairs || a.id.localeCompare(b.id)),
    pairs: openPairs.slice(0, 300),
    covered: pairs.filter((pair) => pair.covered).slice(0, 80),
  };
  mkdirSync('docs/v4', { recursive: true });
  writeFileSync('docs/v4/cross-pack-opportunities.json', `${JSON.stringify(payload, null, 2)}\n`);
  const md: string[] = [
    '# Phase 19 — Cross-Pack Opportunity Map',
    '',
    `Generated: ${payload.generatedAt}`,
    '',
    'Derived from the runtime State/Kernel registry. It suggests collisions that no current kernel consumes; it is not a plot graph and not a runtime scheduler.',
    '',
    '## Counts',
    '',
    '| Metric | Count |',
    '|---|---:|',
    `| States | ${stateInfo.length} |`,
    `| Kernels | ${KERNEL_LIBRARY.length} |`,
    `| Open cross-pack pairs | ${openPairs.length} |`,
    `| Already co-consumed pairs | ${coveredPairs.size} |`,
    '',
    '## Open pairs by collision family',
    '',
    '| Family | Pairs |',
    '|---|---:|',
    ...[...categories.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([category, count]) => `| ${category} | ${count} |`),
    '',
    '## Top open opportunities',
    '',
    '| Score | Family | State A | State B | Packs |',
    '|---:|---|---|---|---|',
    ...openPairs.slice(0, 50).map(
      (pair) =>
        `| ${pair.score.toFixed(2)} | ${pair.category} | ${pair.a} | ${pair.b} | ${pair.packA} / ${pair.packB} |`,
    ),
    '',
    '## How Authors use it',
    '',
    '```bash',
    'pnpm v4:cross-pack-map -- --state known-affair',
    'pnpm v4:cross-pack-map -- --pair known-affair,office-patronage',
    'pnpm v4:cross-pack-map -- --gaps',
    '```',
    '',
    'For a new kernel, require at least two state conditions from different packs when the idea genuinely needs both. Do not add a second condition only to satisfy the tool.',
    '',
    'The map is a recall aid: a pair may already have a good story under two separate kernels. The editor checks premise/conflict/twist/outcome before accepting a new collision.',
  ];
  writeFileSync('docs/v4/cross-pack-opportunities.md', `${md.join('\n')}\n`);
  console.log(
    JSON.stringify({
      states: stateInfo.length,
      kernels: KERNEL_LIBRARY.length,
      openPairs: openPairs.length,
      coveredPairs: coveredPairs.size,
      categories: payload.categories,
      output: ['docs/v4/cross-pack-opportunities.json', 'docs/v4/cross-pack-opportunities.md'],
    }),
  );
}

const argv = args();
if (argv.includes('--pair')) printPair(argv[argv.indexOf('--pair') + 1] ?? '');
else if (argv.includes('--state')) printState(argv[argv.indexOf('--state') + 1] ?? '');
else if (argv.includes('--gaps')) printGaps();
else writeMap();
