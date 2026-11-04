import { mkdirSync, writeFileSync } from 'node:fs';
import { performance } from 'node:perf_hooks';
import { advanceV4Year } from '../packages/v4/engine.js';
import type { EventFact, SceneDefinition, WorldState } from '../packages/v4/domain.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { VIENNA_1912_SEED, VIENNA_1912_SCENES } from '../packages/v4/content/vienna-1912.js';
import { VIENNA_LIFE_SCENES } from '../packages/v4/content/vienna-life.js';
import { VIENNA_POSTWAR_SCENES } from '../packages/v4/content/vienna-postwar.js';
import { VIENNA_HISTORY_SCENES } from '../packages/v4/content/vienna-history.js';
import { VIENNA_DEVELOPMENT_SCENES } from '../packages/v4/content/vienna-developments.js';
import { VIENNA_FAMILY_RUNTIME_SCENES } from '../packages/v4/content/vienna-family.js';
import { ALL_EVENT_SCENES, ALL_TASKS } from '../packages/v4/content/generated/index.js';
import { KERNEL_LIBRARY } from '../packages/v4/content/kernels/index.js';
import { DEFAULT_COMPOSITION } from '../packages/v4/composition/default.js';
import { CONTEXT_PROFILES, MILIEU_PROFILES } from '../packages/v4/composition/contexts.js';
import { defaultMacroState } from '../packages/v4/macro.js';

const BASE_SCENES: SceneDefinition[] = [
  ...VIENNA_1912_SCENES,
  ...VIENNA_LIFE_SCENES,
  ...VIENNA_POSTWAR_SCENES,
  ...VIENNA_HISTORY_SCENES,
  ...VIENNA_DEVELOPMENT_SCENES,
  ...VIENNA_FAMILY_RUNTIME_SCENES,
  ...ALL_EVENT_SCENES,
];

function baseWorld() {
  return applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
}

function withWar(world: WorldState): WorldState {
  const next = structuredClone(world);
  next.macro = defaultMacroState(next);
  next.macro.developments ??= {};
  next.macro.developments['audit-war'] = {
    id: 'audit-war',
    type: 'war',
    regionId: 'region-lower-austria',
    description: '审计用战争动员',
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

function withLegacy(world: WorldState, kind: 'war_aftermath' | 'reform'): WorldState {
  const next = structuredClone(world);
  next.macro = defaultMacroState(next);
  next.macro.legacy ??= {};
  next.macro.legacy[`audit-${kind}`] = {
    id: `audit-${kind}`,
    kind,
    title: kind === 'reform' ? '审计用改革' : '审计用战后遗产',
    regionId: 'region-lower-austria',
    processId: 'audit-process',
    description: kind === 'reform' ? '审计用制度化改革' : '审计用战后遗产',
    started: { year: 1920, month: 1 },
    status: 'active',
    tags: [kind],
    eventWeights: {},
    parameterChanges: {},
  };
  next.date = { year: 1930, month: 1 };
  return next;
}

function summarizeCompile(label: string, world: WorldState, targetYear: number) {
  const result = DEFAULT_COMPOSITION.compile(world, { year: targetYear, month: 1 });
  const outcomePaths = result.scenes.reduce((sum, scene) => sum + (scene.outcomes?.length ?? 0), 0);
  const taskOutcomes = result.tasks.reduce((sum, task) => sum + (task.outcomes?.length ?? 0), 0);
  const kernels = new Set(result.trace.map((entry) => entry.kernelId));
  const contexts = new Set(result.trace.map((entry) => entry.contextId));
  const milieus = new Set(result.trace.map((entry) => entry.milieuId));
  const conditionalOutcomes = new Set<string>();
  for (const scene of result.scenes) {
    for (const outcome of scene.outcomes ?? []) {
      if ((outcome.conditions?.length ?? 0) > 0) {
        conditionalOutcomes.add(`${scene.id}/${outcome.id}`);
      }
    }
  }
  for (const task of result.tasks) {
    for (const outcome of task.outcomes ?? []) {
      if ((outcome.conditions?.length ?? 0) > 0) {
        conditionalOutcomes.add(`${task.id}/${outcome.id}`);
      }
    }
  }
  return {
    label,
    year: targetYear,
    stats: result.stats,
    scenes: result.scenes.length,
    tasks: result.tasks.length,
    outcomePaths: outcomePaths + taskOutcomes,
    distinctKernels: kernels.size,
    distinctContexts: contexts.size,
    distinctMilieus: milieus.size,
    compiledSceneIds: result.trace.map((entry) => entry.compiledSceneId),
    outcomesWithPersonConditions: conditionalOutcomes.size,
    sampleScenes: result.scenes.slice(0, 8).map((scene) => ({
      id: scene.id,
      title: scene.title,
      stage: scene.stage,
      tags: scene.tags,
      outcomeCount: scene.outcomes?.length ?? 0,
    })),
  };
}

const scenarios = [
  summarizeCompile('vienna-1912', baseWorld(), 1912),
  summarizeCompile('vienna-war-1915', withWar(baseWorld()), 1915),
  summarizeCompile('vienna-postwar-1930', withLegacy(baseWorld(), 'war_aftermath'), 1930),
  summarizeCompile('vienna-reform-1930', withLegacy(baseWorld(), 'reform'), 1930),
];
const allCompiled = new Set<string>();
for (const scenario of scenarios) {
  for (const sceneId of scenario.compiledSceneIds) allCompiled.add(sceneId);
}
const compileStarted = performance.now();
const sampleCompile = DEFAULT_COMPOSITION.compile(baseWorld(), { year: 1912, month: 1 });
const compileMs = Number((performance.now() - compileStarted).toFixed(1));
const compiledScenes = sampleCompile.scenes.length;
const compiledTasks = sampleCompile.tasks.length;
const averageOutcomes =
  (sampleCompile.scenes.reduce((sum, scene) => sum + (scene.outcomes?.length ?? 0), 0) +
    sampleCompile.tasks.reduce((sum, task) => sum + (task.outcomes?.length ?? 0), 0)) /
  Math.max(1, compiledScenes + compiledTasks);
// Transparent upper-bound dimensions; not validated one-by-one combinations.
const ROLE_BINDING_PROFILES = 8;
const SITUATION_PROFILES = 3;
const theoreticalUpperBound =
  KERNEL_LIBRARY.length *
  CONTEXT_PROFILES.length *
  MILIEU_PROFILES.length *
  Math.max(1, averageOutcomes) *
  ROLE_BINDING_PROFILES *
  SITUATION_PROFILES;

// Runtime trigger check: 35 years in the default Vienna world. Composed events
// are identified by the stable `kernel::context::milieu` scene id.
let runtimeWorld = baseWorld();
const runtimeEvents: EventFact[] = [];
const runtimeStarted = performance.now();
const years = Number(process.argv[2] ?? 35);
for (let index = 0; index < years; index += 1) {
  const result = advanceV4Year(runtimeWorld, BASE_SCENES, {
    economy: { enabled: true },
    eventRuntime: true,
    agency: true,
    tasks: ALL_TASKS,
    composition: DEFAULT_COMPOSITION,
    maxOrdinaryEventsPerPerson: 4,
  });
  runtimeWorld = result.world;
  runtimeEvents.push(...result.events);
}
const runtimeMs = Number((performance.now() - runtimeStarted).toFixed(1));
const composedEvents = runtimeEvents.filter((event) => event.action.includes('::'));
const composedKernels = new Set(composedEvents.map((event) => event.action.split('::')[0]!));
const composedContexts = new Set(
  composedEvents
    .map((event) => event.action.split('/')[0]!.split('::')[1])
    .filter((value): value is string => Boolean(value)),
);
const composedMilieus = new Set(
  composedEvents
    .map((event) => event.action.split('/')[0]!.split('::')[2])
    .filter((value): value is string => Boolean(value)),
);
const conditionalOutcomeKeys = new Set<string>();
for (const scene of sampleCompile.scenes) {
  for (const outcome of scene.outcomes ?? []) {
    if ((outcome.conditions?.length ?? 0) > 0)
      conditionalOutcomeKeys.add(`${scene.id}/${outcome.id}`);
  }
}
for (const task of sampleCompile.tasks) {
  for (const outcome of task.outcomes ?? []) {
    if ((outcome.conditions?.length ?? 0) > 0)
      conditionalOutcomeKeys.add(`${task.id}/${outcome.id}`);
  }
}
const personBranchEvents = composedEvents.filter((event) =>
  conditionalOutcomeKeys.has(event.action),
);
const variantEvents = composedEvents.filter(
  (event) => event.action.split('/')[0]!.split('::').length > 3,
);
const tracedEvents = runtimeEvents.filter((event) => Boolean(event.trace));

const report = {
  generatedAt: new Date().toISOString(),
  compositionVersion: 1,
  assets: {
    kernels: KERNEL_LIBRARY.length,
    contexts: CONTEXT_PROFILES.length,
    milieus: MILIEU_PROFILES.length,
    taskKernels: KERNEL_LIBRARY.filter((kernel) => kernel.kind === 'task').length,
    eventKernels: KERNEL_LIBRARY.filter((kernel) => kernel.kind === 'event').length,
    variants: KERNEL_LIBRARY.reduce((sum, kernel) => sum + (kernel.variants?.length ?? 0), 0),
    authoredOutcomes: KERNEL_LIBRARY.reduce((sum, kernel) => sum + kernel.outcomes.length, 0),
    outcomesWithPersonBranches: KERNEL_LIBRARY.reduce(
      (sum, kernel) =>
        sum +
        kernel.outcomes.filter((outcome) => Boolean(outcome.when)).length +
        (kernel.variants ?? []).reduce(
          (variantSum, variant) =>
            variantSum + (variant.outcomes ?? []).filter((outcome) => Boolean(outcome.when)).length,
          0,
        ),
      0,
    ),
    outcomesWithAuthoredTrace: KERNEL_LIBRARY.reduce(
      (sum, kernel) =>
        sum +
        kernel.outcomes.filter((outcome) => Boolean(outcome.trace)).length +
        (kernel.variants ?? []).reduce(
          (variantSum, variant) =>
            variantSum +
            (variant.outcomes ?? []).filter((outcome) => Boolean(outcome.trace)).length,
          0,
        ),
      0,
    ),
    distinctDomains: new Set(KERNEL_LIBRARY.map((kernel) => kernel.domain)).size,
  },
  capacity: {
    naiveTheoreticalUpperBound: theoreticalUpperBound,
    compiledScenes: compiledScenes,
    compileMs,
    heapMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
    distinctCompiledScenesAcrossScenarios: allCompiled.size,
    compiledTasks: compiledTasks,
    compiledOutcomePaths:
      sampleCompile.scenes.reduce((sum, scene) => sum + (scene.outcomes?.length ?? 0), 0) +
      sampleCompile.tasks.reduce((sum, task) => sum + (task.outcomes?.length ?? 0), 0),
    distinctCompiledKernels: new Set(sampleCompile.trace.map((entry) => entry.kernelId)).size,
    outcomesWithPersonConditions: scenarios.reduce(
      (sum, scenario) => sum + scenario.outcomesWithPersonConditions,
      0,
    ),
    compileErrors: sampleCompile.errors.length,
    dimensions: {
      kernels: KERNEL_LIBRARY.length,
      contexts: CONTEXT_PROFILES.length,
      milieus: MILIEU_PROFILES.length,
      averageOutcomes: Number(averageOutcomes.toFixed(2)),
      roleBindingProfiles: ROLE_BINDING_PROFILES,
      situationProfiles: SITUATION_PROFILES,
    },
    note: 'Upper bound is a transparent combinatorial bound, not a claim that every combination is valid. Compiled/triggered counts are actual after context/milieu/role/effect resolution.',
  },
  scenarios,
  compileErrors: sampleCompile.errors.slice(0, 40),
  runtime: {
    years,
    runtimeMs,
    msPerYear: Number((runtimeMs / years).toFixed(1)),
    events: runtimeEvents.length,
    composedEvents: composedEvents.length,
    distinctTriggeredKernels: composedKernels.size,
    distinctTriggeredContexts: composedContexts.size,
    distinctTriggeredMilieus: composedMilieus.size,
    personBranchEvents: personBranchEvents.length,
    variantBranchEvents: variantEvents.length,
    tracedEvents: tracedEvents.length,
    traceCoverage: Number((tracedEvents.length / Math.max(1, runtimeEvents.length)).toFixed(3)),
    triggeredKernelSamples: [...composedKernels].slice(0, 30),
    topComposedFamilies: [
      ...composedEvents
        .reduce((map, event) => {
          const key = event.action.split('::')[0]!;
          map.set(key, (map.get(key) ?? 0) + 1);
          return map;
        }, new Map<string, number>())
        .entries(),
    ]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20),
    sampleEvents: composedEvents.slice(-20).map((event) => ({
      id: event.id,
      date: event.date,
      action: event.action,
      text: event.immediateText,
      effects: [...new Set(event.effects.map((effect) => effect.type))],
    })),
  },
  limitations: [
    'The theoretical upper bound is not a validated instance count.',
    'Compiled scene count is for one default Vienna year; scenarios add context coverage.',
    'Actual triggered count is a 35-year single-world sample, not all worlds.',
    'Role/relationship bindings are executed by the existing engine; they are not separately enumerated here.',
    'Person-level branch events are counted from compiled outcome conditions; they do not prove narrative quality.',
    'The 35-year runtime is a single world-line, not a multi-world natural experiment.',
  ],
};

mkdirSync('docs/v4', { recursive: true });
writeFileSync('docs/v4/phase-12-audit.json', `${JSON.stringify(report, null, 2)}\n`);
console.log(
  JSON.stringify(
    {
      assets: report.assets,
      capacity: report.capacity,
      scenarios: scenarios.map((scenario) => ({
        label: scenario.label,
        activeContexts: scenario.stats.activeContexts,
        activeMilieus: scenario.stats.activeMilieus,
        scenes: scenario.scenes,
        tasks: scenario.tasks,
        outcomePaths: scenario.outcomePaths,
        distinctKernels: scenario.distinctKernels,
      })),
      runtime: {
        years: report.runtime.years,
        events: report.runtime.events,
        composedEvents: report.runtime.composedEvents,
        distinctTriggeredKernels: report.runtime.distinctTriggeredKernels,
        distinctTriggeredContexts: report.runtime.distinctTriggeredContexts,
        distinctTriggeredMilieus: report.runtime.distinctTriggeredMilieus,
        topComposedFamilies: report.runtime.topComposedFamilies,
      },
    },
    null,
    2,
  ),
);
