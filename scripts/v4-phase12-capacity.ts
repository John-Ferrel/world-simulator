/**
 * Phase 12 capacity stress: a synthetic profile matrix, not a played world.
 *
 * The named seed world has only 24 living people. This fixture builds a larger
 * set of valid persons with varied ages, sex, education, employment and roles,
 * then asks the real engine which compiled scene × eligible outcome situations
 * each profile can actually enter. The output is candidate capacity, not
 * committed events and not a naive Cartesian product.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { performance } from 'node:perf_hooks';
import { auditCandidatePools } from '../packages/v4/engine.js';
import type { Household, Organization, Person, Place, WorldState } from '../packages/v4/domain.js';
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

function place(id: string, name: string, kind: Place['kind']): Place {
  return {
    id,
    name,
    kind,
    settlementId: 'settlement-vienna',
    regionId: 'region-lower-austria',
    polityId: 'polity-austria-hungary',
    offers: [],
  };
}

function traits(index: number): Person['traits'] {
  const base = (index % 7) / 10;
  return {
    care: 0.3 + base,
    ambition: 0.2 + base,
    tradition: 0.3 + base,
    openness: 0.2 + base,
    conscientiousness: 0.3 + base,
    extraversion: 0.2 + base,
    agreeableness: 0.3 + base,
    neuroticism: 0.2 + base,
  };
}

function makeCapacityWorld(count: number): WorldState {
  const places: Record<string, Place> = {
    'place-home': place('place-home', 'Tenement', 'home'),
    'place-factory': place('place-factory', 'Printshop', 'factory'),
    'place-school': place('place-school', 'District school', 'school'),
    'place-hospital': place('place-hospital', 'General hospital', 'hospital'),
    'place-government': place('place-government', 'Magistrate', 'government'),
    'place-union': place('place-union', 'Union hall', 'union'),
    'place-cafe': place('place-cafe', 'Corner cafe', 'cafe'),
    'place-market': place('place-market', 'Market hall', 'shop'),
    'place-barracks': place('place-barracks', 'Barracks', 'barracks'),
    'place-university': place('place-university', 'University', 'school'),
    'place-rural': place('place-rural', 'Vineyard cottage', 'other'),
  };
  const organizations: Record<string, Organization> = {
    'org-factory': {
      id: 'org-factory',
      name: 'Printshop Winter',
      kind: 'factory',
      placeId: 'place-factory',
      memberIds: [],
      positions: [],
      treasury: 200,
      authorityRules: [],
      projects: [],
      status: 'active',
      causeIds: [],
    },
    'org-union': {
      id: 'org-union',
      name: 'Printers Union',
      kind: 'union',
      placeId: 'place-union',
      memberIds: [],
      positions: [],
      treasury: 80,
      authorityRules: [],
      projects: [],
      status: 'active',
      causeIds: [],
    },
    'org-school': {
      id: 'org-school',
      name: 'District School',
      kind: 'school',
      placeId: 'place-school',
      memberIds: [],
      positions: [],
      treasury: 60,
      authorityRules: [],
      projects: [],
      status: 'active',
      causeIds: [],
    },
    'org-state': {
      id: 'org-state',
      name: 'Imperial Magistrate',
      kind: 'state',
      placeId: 'place-government',
      memberIds: [],
      positions: [],
      treasury: 500,
      authorityRules: [],
      projects: [],
      status: 'active',
      causeIds: [],
    },
  };
  const households: Record<string, Household> = {};
  const persons: Record<string, Person> = {};
  for (let index = 0; index < count; index += 1) {
    const householdId = `hh-${Math.floor(index / 3)}`;
    households[householdId] ??= {
      id: householdId,
      residenceId: index % 11 === 0 ? 'place-rural' : 'place-home',
      memberIds: [],
      guardianIds: [],
      cash: 2 + (index % 40),
      food: 3 + (index % 20),
      debt: index % 9 === 0 ? 5 : 0,
      rent: 1 + (index % 3),
      obligations: [],
      assets: [],
      sharingRules: 'pooled',
    };
    const age = 6 + (index % 75);
    const sex: Person['sex'] = index % 2 === 0 ? 'female' : 'male';
    const educationStatus: Person['education']['status'] =
      age < 10
        ? 'primary'
        : age < 15
          ? 'primary'
          : index % 4 === 0
            ? 'apprenticeship'
            : index % 7 === 0
              ? 'secondary'
              : index % 11 === 0
                ? 'higher'
                : 'primary';
    const personId = `person-cap-${index}`;
    const employed = age >= 16 && index % 5 !== 0;
    const occupation =
      index % 13 === 0
        ? 'clerk'
        : index % 11 === 0
          ? 'teacher'
          : index % 17 === 0
            ? 'official'
            : index % 3 === 0
              ? 'printer'
              : 'factory worker';
    const organizationId =
      occupation === 'teacher'
        ? 'org-school'
        : occupation === 'official'
          ? 'org-state'
          : 'org-factory';
    const roles: string[] = [];
    if (employed) roles.push('worker');
    if (index % 4 === 0) roles.push('union_member');
    if (occupation === 'teacher') roles.push('teacher');
    if (occupation === 'official') roles.push('official');
    if (age >= 40 && index % 6 === 0) roles.push('veteran');
    if (index % 10 === 0) roles.push('neighbor');
    const person: Person = {
      id: personId,
      name: `Capacity Person ${index}`,
      sex,
      born: { year: 1912 - age, month: 1 + (index % 12) },
      locationId:
        index % 11 === 0
          ? 'place-rural'
          : employed
            ? occupation === 'teacher'
              ? 'place-school'
              : occupation === 'official'
                ? 'place-government'
                : 'place-factory'
            : 'place-home',
      householdId,
      parentIds: [],
      guardianIds: [],
      health: { vitality: 0.35 + (index % 60) / 100, conditions: [], nutrition: 0.6 },
      traits: traits(index),
      education: { status: educationStatus, level: Math.min(4, 1 + (index % 4)) },
      ...(employed
        ? {
            employment: {
              organizationId,
              occupation,
              wage: 6 + (index % 12),
              since: { year: 1900 + (index % 10), month: 1 },
              workplaceId:
                occupation === 'teacher'
                  ? 'place-school'
                  : occupation === 'official'
                    ? 'place-government'
                    : 'place-factory',
            },
          }
        : {}),
      roles,
      projectIds: [],
      relationshipIds: [],
      knowledgeIds: [],
      life: {
        mood: ((index % 11) - 5) / 20,
        reputation: ((index % 9) - 4) / 50,
        skills: {
          literacy: (index % 10) / 10,
          numeracy: ((index + 3) % 10) / 10,
          craft: ((index + 5) % 10) / 10,
          social: ((index + 7) % 10) / 10,
        },
        flags: [],
      },
      provenance: { kind: 'initial' },
    };
    persons[personId] = person;
    households[householdId]!.memberIds.push(personId);
    if (employed) {
      organizations[organizationId]!.memberIds.push(personId);
    }
    if (roles.includes('union_member')) organizations['org-union']!.memberIds.push(personId);
  }
  const world: WorldState = {
    id: `phase12-capacity-${count}`,
    seed: 'phase12-capacity',
    date: { year: 1912, month: 1 },
    timePolicy: { secondsPerYear: 30, monthsPerTick: 12 },
    places,
    households,
    persons,
    organizations,
    positions: {},
    projects: {},
    interactions: {},
    relations: {},
    knowledge: {},
    events: [],
    scenes: [],
    pressures: {},
    historyMeta: { sequence: 0 },
    status: 'running',
  };
  world.macro = defaultMacroState(world);
  return world;
}

function withWar(world: WorldState): WorldState {
  const next = structuredClone(world);
  next.macro!.developments ??= {};
  next.macro!.developments['capacity-war'] = {
    id: 'capacity-war',
    type: 'war',
    regionId: 'region-lower-austria',
    description: 'Capacity war',
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
  next.macro!.legacy ??= {};
  next.macro!.legacy['capacity-reform'] = {
    id: 'capacity-reform',
    kind: 'reform',
    title: 'Capacity reform',
    regionId: 'region-lower-austria',
    processId: 'capacity-process',
    description: 'Capacity reform',
    started: { year: 1920, month: 1 },
    status: 'active',
    tags: ['reform'],
    eventWeights: {},
    parameterChanges: {},
  };
  next.date = { year: 1930, month: 1 };
  return next;
}

const count = Number(process.argv[2] ?? 500);
const scenarios = [
  { label: 'peace-1912', world: makeCapacityWorld(count) },
  { label: 'war-1915', world: withWar(makeCapacityWorld(count)) },
  { label: 'reform-1930', world: withReform(makeCapacityWorld(count)) },
];
const results = [];
const startedAt = performance.now();
for (const scenario of scenarios) {
  const sceneIds = new Set<string>();
  const taskIds = new Set<string>();
  let sceneCandidates = 0;
  let taskCandidates = 0;
  let eligibleOutcomeSituations = 0;
  let conditionalOutcomeSituations = 0;
  let personsWithNoScenes = 0;
  for (const person of Object.values(scenario.world.persons)) {
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
    sampledPersons: count,
    personsWithNoScenes,
    sceneCandidates,
    taskCandidates,
    distinctCandidateScenes: sceneIds.size,
    distinctCandidateTasks: taskIds.size,
    eligibleOutcomeSituations,
    conditionalOutcomeSituations,
    averageSceneCandidatesPerPerson: Number((sceneCandidates / count).toFixed(2)),
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
  fixture: 'synthetic capacity profile matrix (not a played world)',
  personsPerScenario: count,
  elapsedMs: elapsed,
  results,
  totals,
  note:
    'Every counted situation passed the real engine stage, age, region, role-cast and outcome-condition checks. This is candidate capacity, not committed events and not a naive product.',
};
mkdirSync('docs/v4', { recursive: true });
writeFileSync('docs/v4/phase-12-capacity.json', `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ elapsedMs: elapsed, results, totals }, null, 2));
