/**
 * Phase 12 Experiment A: one recipe under different world conditions.
 *
 * The same kernel is compiled in peace, war and reform worlds. Only the
 * compiled definitions are passed to the existing engine; rate is forced to 1
 * so the experiment observes eligibility and branch selection rather than
 * waiting for a rare draw. EventFacts and their effects are real engine output.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { advanceV4Year } from '../packages/v4/engine.js';
import type { EventFact, SceneDefinition, WorldState } from '../packages/v4/domain.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import { KERNEL_LIBRARY } from '../packages/v4/content/kernels/index.js';
import { DEFAULT_COMPOSITION } from '../packages/v4/composition/default.js';
import { defaultMacroState } from '../packages/v4/macro.js';
import type { PlotKernel } from '../packages/v4/composition/types.js';

function baseWorld(): WorldState {
  return applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
}

function withWar(world: WorldState): WorldState {
  const next = structuredClone(world);
  next.macro = defaultMacroState(next);
  next.macro.developments ??= {};
  next.macro.developments['experiment-war'] = {
    id: 'experiment-war',
    type: 'war',
    regionId: 'region-lower-austria',
    description: 'Experiment A war mobilization',
    severity: 0.8,
    start: { year: 1914, month: 1 },
    end: { year: 1917, month: 12 },
    status: 'active',
    eventFamilyIds: [],
    source: 'event',
    historical: {
      kind: 'war_mobilization',
      phase: 'confrontation',
      phaseStarted: { year: 1914, month: 1 },
      regionIds: ['region-lower-austria'],
      objectives: [],
      sourceIds: [],
      participants: {},
      organizationRoles: {},
      metrics: {
        support: 0.5,
        opposition: 0.2,
        resources: 0.5,
        legitimacy: 0.5,
        escalation: 0.5,
        information: 0.5,
      },
      history: [],
      source: 'event',
    },
  };
  next.date = { year: 1915, month: 1 };
  return next;
}

function withReform(world: WorldState): WorldState {
  const next = structuredClone(world);
  next.macro = defaultMacroState(next);
  next.macro.legacy ??= {};
  next.macro.legacy['experiment-reform'] = {
    id: 'experiment-reform',
    kind: 'reform',
    title: 'Experiment A reform legacy',
    regionId: 'region-lower-austria',
    processId: 'experiment-process',
    description: 'Experiment A institutional reform',
    started: { year: 1920, month: 1 },
    status: 'active',
    tags: ['reform'],
    eventWeights: {},
    parameterChanges: {},
  };
  next.date = { year: 1930, month: 1 };
  return next;
}

function forceScene(scene: SceneDefinition): SceneDefinition {
  return {
    ...structuredClone(scene),
    rate: 1,
    cooldownYears: 0,
    oncePerPerson: false,
  };
}

function eventSummary(event: EventFact) {
  return {
    id: event.id,
    action: event.action,
    date: event.date,
    subjectId: event.subjectId,
    trace: event.trace ?? null,
    effects: event.effects.map((effect) => ({
      type: effect.type,
      ...(effect.type === 'cash' ? { amount: effect.amount } : {}),
      ...(effect.type === 'role' ? { role: effect.role, add: effect.add } : {}),
      ...(effect.type === 'employment' ? { occupation: effect.occupation, wage: effect.wage } : {}),
      ...(effect.type === 'flag' ? { flag: effect.flag } : {}),
      ...(effect.type === 'knowledge' ? { proposition: effect.proposition } : {}),
      ...(effect.type === 'organization_funds' ? { amount: effect.amount } : {}),
    })),
    immediateText: event.immediateText,
  };
}

const requested = process.argv[2];
const candidates = KERNEL_LIBRARY.filter(
  (kernel) =>
    kernel.kind === 'event' &&
    kernel.variants?.some(
      (variant) => variant.when.processKinds?.length || variant.when.legacyKinds?.length,
    ),
);
const kernel: PlotKernel | undefined = requested
  ? KERNEL_LIBRARY.find((entry) => entry.id === requested)
  : candidates[0];
if (!kernel) {
  console.error('no kernel with process/legacy variants found');
  process.exit(2);
}

const scenarios: { label: string; world: WorldState }[] = [
  { label: 'peace-1912', world: baseWorld() },
  { label: 'war-1915', world: withWar(baseWorld()) },
  { label: 'reform-1930', world: withReform(baseWorld()) },
];

const results = [];
for (const scenario of scenarios) {
  const compiled = DEFAULT_COMPOSITION.compile(scenario.world, scenario.world.date);
  const scenes = compiled.scenes
    .filter((scene) => scene.id.startsWith(`${kernel.id}::`))
    .map(forceScene);
  const variantIds = [
    ...new Set(
      compiled.trace
        .filter((entry) => entry.kernelId === kernel.id)
        .map((entry) => entry.variantId ?? 'base'),
    ),
  ];
  let events: EventFact[] = [];
  if (scenes.length > 0) {
    const result = advanceV4Year(scenario.world, scenes, {
      economy: { enabled: false },
      eventRuntime: true,
      statisticalModel: false,
      agency: false,
      materializePopulation: false,
      maxOrdinaryEventsPerPerson: 1,
    });
    events = result.events.filter((event) => event.action.startsWith(`${kernel.id}::`));
  }
  const outcomeCounts = new Map<string, number>();
  for (const event of events) {
    const outcomeId = event.action.split('/')[1] ?? event.action;
    outcomeCounts.set(outcomeId, (outcomeCounts.get(outcomeId) ?? 0) + 1);
  }
  results.push({
    label: scenario.label,
    year: scenario.world.date.year,
    compiledScenes: scenes.length,
    variantIds,
    sceneIds: scenes.map((scene) => scene.id),
    events: events.length,
    outcomeCounts: [...outcomeCounts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([outcomeId, count]) => ({ outcomeId, count })),
    samples: events.slice(0, 6).map(eventSummary),
  });
}

const output = {
  generatedAt: new Date().toISOString(),
  kernelId: kernel.id,
  title: kernel.title,
  variants: kernel.variants?.map((variant) => ({ id: variant.id, when: variant.when })) ?? [],
  outcomesWithBranches:
    kernel.outcomes
      .filter((outcome) => outcome.when)
      .map((outcome) => ({
        id: outcome.id,
        when: outcome.when,
      })) ?? [],
  scenarios: results,
  note: 'Forced rate is an experimental control, not a gameplay tuning value. Events and effects are real engine output.',
};
mkdirSync('docs/v4', { recursive: true });
writeFileSync('docs/v4/phase-13-experiment-a.json', `${JSON.stringify(output, null, 2)}\n`);
console.log(
  JSON.stringify(
    {
      kernelId: output.kernelId,
      scenarios: results.map((result) => ({
        label: result.label,
        compiledScenes: result.compiledScenes,
        variantIds: result.variantIds,
        events: result.events,
        outcomeCounts: result.outcomeCounts,
      })),
    },
    null,
    2,
  ),
);
