/**
 * Phase 12 Experiment D: effective candidate capacity.
 *
 * Counts concrete (person, compiled scene, eligible outcome) situations using
 * the real engine's read-only candidate audit. This is not a Cartesian product:
 * every counted item passed stage, age, region, process, role casting and
 * outcome-condition checks for an actual seed person.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { performance } from 'node:perf_hooks';
import { auditCandidatePools } from '../packages/v4/engine.js';
import type { WorldState } from '../packages/v4/domain.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { VIENNA_1912_SEED, VIENNA_1912_SCENES } from '../packages/v4/content/vienna-1912.js';
import { VIENNA_LIFE_SCENES } from '../packages/v4/content/vienna-life.js';
import { VIENNA_POSTWAR_SCENES } from '../packages/v4/content/vienna-postwar.js';
import { VIENNA_HISTORY_SCENES } from '../packages/v4/content/vienna-history.js';
import { VIENNA_DEVELOPMENT_SCENES } from '../packages/v4/content/vienna-developments.js';
import { VIENNA_FAMILY_RUNTIME_SCENES } from '../packages/v4/content/vienna-family.js';
import { ALL_EVENT_SCENES, ALL_TASKS } from '../packages/v4/content/generated/index.js';
import { DEFAULT_COMPOSITION } from '../packages/v4/composition/default.js';
import { defaultMacroState } from '../packages/v4/macro.js';

const BASE_SCENES = [
  ...VIENNA_1912_SCENES,
  ...VIENNA_LIFE_SCENES,
  ...VIENNA_POSTWAR_SCENES,
  ...VIENNA_HISTORY_SCENES,
  ...VIENNA_DEVELOPMENT_SCENES,
  ...VIENNA_FAMILY_RUNTIME_SCENES,
  ...ALL_EVENT_SCENES,
];

function baseWorld(): WorldState {
  return applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
}

function withWar(world: WorldState): WorldState {
  const next = structuredClone(world);
  next.macro = defaultMacroState(next);
  next.macro.developments ??= {};
  next.macro.developments['capacity-war'] = {
    id: 'capacity-war',
    type: 'war',
    regionId: 'region-lower-austria',
    description: 'Experiment D war',
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
  next.macro.legacy['capacity-reform'] = {
    id: 'capacity-reform',
    kind: 'reform',
    title: 'Experiment D reform',
    regionId: 'region-lower-austria',
    processId: 'capacity-process',
    description: 'Experiment D reform',
    started: { year: 1920, month: 1 },
    status: 'active',
    tags: ['reform'],
    eventWeights: {},
    parameterChanges: {},
  };
  next.date = { year: 1930, month: 1 };
  return next;
}

const SAMPLE_PER_SCENARIO = Number(process.argv[2] ?? 60);
const scenarios = [
  { label: 'peace-1912', world: baseWorld() },
  { label: 'war-1915', world: withWar(baseWorld()) },
  { label: 'reform-1930', world: withReform(baseWorld()) },
];

const results = [];
const startedAt = performance.now();
for (const scenario of scenarios) {
  const persons = Object.values(scenario.world.persons)
    .filter((person) => !person.died)
    .sort((a, b) => a.id.localeCompare(b.id))
    .slice(0, SAMPLE_PER_SCENARIO);
  const sceneIds = new Set<string>();
  const taskIds = new Set<string>();
  let sceneCandidates = 0;
  let taskCandidates = 0;
  let eligibleOutcomeSituations = 0;
  let conditionalOutcomeSituations = 0;
  let personsWithNoScenes = 0;
  for (const person of persons) {
    const audit = auditCandidatePools(
      scenario.world,
      person.id,
      scenario.world.date,
      BASE_SCENES,
      ALL_TASKS,
      DEFAULT_COMPOSITION,
    );
    if (!audit) continue;
    sceneCandidates += audit.eventCount;
    taskCandidates += audit.taskCount;
    if (audit.eventCount === 0) personsWithNoScenes += 1;
    for (const event of audit.events) {
      sceneIds.add(event.id);
      eligibleOutcomeSituations += event.outcomeCount;
      conditionalOutcomeSituations += event.conditionalOutcomeCount;
    }
    for (const task of audit.tasks) {
      taskIds.add(task.id);
      conditionalOutcomeSituations += task.conditionalOutcomeCount;
    }
  }
  results.push({
    label: scenario.label,
    date: scenario.world.date,
    sampledPersons: persons.length,
    personsWithNoScenes,
    sceneCandidates,
    taskCandidates,
    distinctCandidateScenes: sceneIds.size,
    distinctCandidateTasks: taskIds.size,
    eligibleOutcomeSituations,
    conditionalOutcomeSituations,
    averageSceneCandidatesPerPerson: Number(
      (sceneCandidates / Math.max(1, persons.length)).toFixed(2),
    ),
  });
}
const elapsed = Number((performance.now() - startedAt).toFixed(0));
const totals = results.reduce(
  (sum, entry) => ({
    sampledPersons: sum.sampledPersons + entry.sampledPersons,
    sceneCandidates: sum.sceneCandidates + entry.sceneCandidates,
    taskCandidates: sum.taskCandidates + entry.taskCandidates,
    eligibleOutcomeSituations: sum.eligibleOutcomeSituations + entry.eligibleOutcomeSituations,
    conditionalOutcomeSituations:
      sum.conditionalOutcomeSituations + entry.conditionalOutcomeSituations,
  }),
  {
    sampledPersons: 0,
    sceneCandidates: 0,
    taskCandidates: 0,
    eligibleOutcomeSituations: 0,
    conditionalOutcomeSituations: 0,
  },
);

const output = {
  generatedAt: new Date().toISOString(),
  samplePerScenario: SAMPLE_PER_SCENARIO,
  elapsedMs: elapsed,
  results,
  totals,
  note:
    'Eligible situations are actual person×scene×outcome checks, not a naive kernel×context×milieu product. They are candidates, not committed events.',
};
mkdirSync('docs/v4', { recursive: true });
writeFileSync('docs/v4/phase-13-experiment-d.json', `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ elapsedMs: elapsed, results, totals }, null, 2));
