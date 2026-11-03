import { mkdirSync, writeFileSync } from 'node:fs';
import { advanceV4Year } from '../packages/v4/engine.js';
import { createV4Birth } from '../packages/v4/birth.js';
import {
  addMonths,
  type EventFact,
  type WorldDate,
  type WorldState,
} from '../packages/v4/domain.js';
import { advanceHistoricalProcesses, ensureHistoricalProcess } from '../packages/v4/history.js';
import { defaultMacroState, type WorldDevelopment } from '../packages/v4/macro.js';
import { VIENNA_1912_SCENES, VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import { VIENNA_LIFE_SCENES } from '../packages/v4/content/vienna-life.js';
import { VIENNA_POSTWAR_SCENES } from '../packages/v4/content/vienna-postwar.js';
import { VIENNA_HISTORY_SCENES } from '../packages/v4/content/vienna-history.js';
import { VIENNA_DEVELOPMENT_SCENES } from '../packages/v4/content/vienna-developments.js';
import { VIENNA_FAMILY_RUNTIME_SCENES } from '../packages/v4/content/vienna-family.js';
import {
  GENERATED_SCENES,
  GENERATED_TASKS,
  ALL_EVENT_SCENES,
  ALL_TASKS,
} from '../packages/v4/content/generated/index.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';

const ALL_SCENES = [
  ...VIENNA_1912_SCENES,
  ...VIENNA_LIFE_SCENES,
  ...VIENNA_POSTWAR_SCENES,
  ...VIENNA_HISTORY_SCENES,
  ...VIENNA_DEVELOPMENT_SCENES,
  ...VIENNA_FAMILY_RUNTIME_SCENES,
  ...ALL_EVENT_SCENES,
];

type RunResult = { world: WorldState; events: EventFact[]; years: number };

function historicalWorld(): WorldState {
  return applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
}

function plainWorld(): WorldState {
  const world = structuredClone(VIENNA_1912_SEED);
  world.macro = defaultMacroState(world);
  return world;
}

function run(world: WorldState, years: number, scenes = ALL_SCENES): RunResult {
  let current = world;
  const events: EventFact[] = [];
  for (let index = 0; index < years; index += 1) {
    const result = advanceV4Year(current, scenes, {
      economy: { enabled: true },
      eventRuntime: true,
      agency: true,
      tasks: ALL_TASKS,
      maxOrdinaryEventsPerPerson: 4,
    });
    current = result.world;
    events.push(...result.events);
  }
  return { world: current, events, years };
}

function processView(world: WorldState, id: string) {
  const development = world.macro?.developments?.[id];
  const process = development?.historical;
  if (!development || !process) return undefined;
  return {
    id,
    description: development.description,
    phase: process.phase,
    status: development.status,
    outcome: process.outcome,
    metrics: process.metrics,
    participants: Object.entries(process.participants)
      .sort((a, b) => b[1].influence - a[1].influence)
      .map(([personId, entry]) => ({
        personId,
        name: world.persons[personId]?.name ?? '已故',
        alive: Boolean(world.persons[personId] && !world.persons[personId]!.died),
        roles: entry.roles,
        influence: Number(entry.influence.toFixed(4)),
      })),
    history: process.history.slice(-8),
    legacyIds: Object.values(world.macro?.legacy ?? {})
      .filter((legacy) => legacy.processId === id)
      .map((legacy) => legacy.id),
  };
}

function addExperimentProcess(
  world: WorldState,
  id: string,
  input: {
    description: string;
    organizationId?: string;
    participants?: Record<string, string[]>;
    metrics: {
      support: number;
      opposition: number;
      resources: number;
      legitimacy: number;
      escalation: number;
      information: number;
    };
    phase:
      | 'emerging'
      | 'mobilizing'
      | 'confrontation'
      | 'institutionalizing'
      | 'repression'
      | 'declining';
    start?: WorldDate;
  },
): WorldDevelopment {
  const start = input.start ?? { ...world.date };
  const development: WorldDevelopment = {
    id,
    type: 'social_change',
    regionId: 'region-lower-austria',
    description: input.description,
    severity: 0.65,
    start,
    end: { year: start.year + 12, month: 12 },
    status: 'active',
    eventFamilyIds: ['vienna-history-social-democracy'],
    organizationId: input.organizationId,
    source: 'phase-7-experiment',
  };
  const historical = ensureHistoricalProcess(development, start);
  historical.kind = 'social_movement';
  historical.phase = input.phase;
  historical.phaseStarted = { ...start };
  historical.regionIds = ['region-lower-austria'];
  historical.objectives = ['改善工时、租金与互助条件'];
  historical.metrics = { ...input.metrics };
  historical.lastActivity = { ...start };
  historical.participants = {};
  for (const [personId, roles] of Object.entries(input.participants ?? {})) {
    historical.participants[personId] = {
      roles: roles as never,
      influence: 0.05,
      firstEventId: `experiment:${id}:${personId}`,
      lastEventId: `experiment:${id}:${personId}`,
      joinedAt: { ...start },
    };
  }
  development.historical = historical;
  world.macro!.developments![id] = development;
  return development;
}

function eventSummary(world: WorldState, event: EventFact) {
  const person = world.persons[event.subjectId];
  return {
    id: event.id,
    date: event.date,
    action: event.action,
    title: event.title,
    subject: person?.name ?? event.subjectId,
    text: event.immediateText,
    causes: event.causes,
    effects: event.effects.map((effect) => effect.type),
    participants: event.participants.map((participant) => ({
      id: participant.personId,
      name: world.persons[participant.personId]?.name ?? '无名',
      role: participant.role,
    })),
  };
}

function legacyView(world: WorldState) {
  return Object.values(world.macro?.legacy ?? {}).map((legacy) => ({
    id: legacy.id,
    kind: legacy.kind,
    title: legacy.title,
    description: legacy.description,
    processId: legacy.processId,
    parameterChanges: legacy.parameterChanges,
    eventWeights: legacy.eventWeights,
    started: legacy.started,
  }));
}

const startedAt = Date.now();

// A. Free evolution: no final result is injected. The printers' union starts
// with one member and must recruit, meet and accumulate action before it can
// become a process. If the path is not reached for this seed, the report says so.
const free = run(historicalWorld(), 38);
const bottomUpProcesses = Object.values(free.world.macro?.developments ?? {})
  .filter((development) => development.id.startsWith('development:initiative-'))
  .sort((a, b) => a.start.year - b.start.year || a.id.localeCompare(b.id));
const bottomUp = bottomUpProcesses.find((development) =>
  development.organizationId?.includes('printers'),
);
const bottomUpFounding = bottomUp
  ? free.events.find(
      (event) => event.action === `initiative:found_process:${bottomUp.organizationId}`,
    )
  : free.events.find((event) => event.action.startsWith('initiative:found_process'));
const agencyEvents = free.events.filter((event) => event.action.startsWith('agency:'));
const experimentA = {
  years: 38,
  date: free.world.date,
  agencyEvents: agencyEvents.length,
  agencyKinds: agencyEvents.reduce<Record<string, number>>((counts, event) => {
    counts[event.action] = (counts[event.action] ?? 0) + 1;
    return counts;
  }, {}),
  bottomUpProcess: bottomUp ? processView(free.world, bottomUp.id) : null,
  allBottomUpProcesses: bottomUpProcesses.map((development) =>
    processView(free.world, development.id),
  ),
  foundingEvent: bottomUpFounding ? eventSummary(free.world, bottomUpFounding) : null,
  unions: Object.values(free.world.organizations)
    .filter((organization) => organization.kind === 'union')
    .map((organization) => ({
      id: organization.id,
      name: organization.name,
      members: organization.memberIds.length,
      treasury: organization.treasury,
    })),
};

// B. The same starting process reaches different outcomes when members,
// resources and opposition differ. No final phase is assigned by hand; the
// engine's annual lifecycle computes it.
const variantSpecs = [
  {
    key: 'decline',
    description: '没有成员、没有组织、也没有新行动的工运记忆',
    input: {
      description: '没有成员、没有组织、也没有新行动的工运记忆',
      metrics: {
        support: 0.18,
        opposition: 0.2,
        resources: 0.05,
        legitimacy: 0.2,
        escalation: 0.05,
        information: 0.1,
      },
      participants: {},
      phase: 'mobilizing' as const,
    },
  },
  {
    key: 'reform',
    description: '有工会成员、会费和街区互助的改革运动',
    input: {
      description: '有工会成员、会费和街区互助的改革运动',
      organizationId: 'org-printers-union',
      participants: {
        'person-alois-lechner': ['organizer'],
        'person-josef-bauer': ['supporter'],
      },
      metrics: {
        support: 0.62,
        opposition: 0.12,
        resources: 0.45,
        legitimacy: 0.58,
        escalation: 0.05,
        information: 0.35,
      },
      phase: 'mobilizing' as const,
    },
  },
  {
    key: 'repression',
    description: '被警察和雇主压制、但仍有反对者的运动',
    input: {
      description: '被警察和雇主压制、但仍有反对者的运动',
      organizationId: 'org-printers-union',
      participants: {
        'person-alois-lechner': ['organizer'],
        'person-josef-bauer': ['supporter'],
        'person-grete-stein': ['opponent'],
      },
      metrics: {
        support: 0.28,
        opposition: 0.72,
        resources: 0.25,
        legitimacy: 0.25,
        escalation: 0.62,
        information: 0.2,
      },
      phase: 'confrontation' as const,
    },
  },
  {
    key: 'split',
    description: '支持与反对都很强、反对者另立方向的运动',
    input: {
      description: '支持与反对都很强、反对者另立方向的运动',
      organizationId: 'org-printers-union',
      participants: {
        'person-alois-lechner': ['organizer'],
        'person-josef-bauer': ['supporter'],
        'person-berta-weiss': ['opponent'],
        'person-luise-kral': ['opponent'],
      },
      metrics: {
        support: 0.38,
        opposition: 0.66,
        resources: 0.3,
        legitimacy: 0.32,
        escalation: 0.5,
        information: 0.3,
      },
      phase: 'confrontation' as const,
    },
  },
];
const experimentB = variantSpecs.map((spec) => {
  const world = historicalWorld();
  const id = `development:experiment-${spec.key}`;
  addExperimentProcess(
    world,
    id,
    spec.input as unknown as Parameters<typeof addExperimentProcess>[2],
  );
  const result = run(world, spec.key === 'decline' ? 7 : spec.key === 'split' ? 20 : 8);
  const view = processView(result.world, id);
  const split = Object.values(result.world.macro?.developments ?? {}).find((development) =>
    development.id.startsWith(`${id}:split:`),
  );
  return {
    key: spec.key,
    description: spec.description,
    process: view,
    splitProcess: split ? processView(result.world, split.id) : null,
    legacy: legacyView(result.world).filter(
      (legacy) => legacy.processId === id || legacy.processId?.startsWith(`${id}:split:`),
    ),
    region: result.world.macro?.regions['region-lower-austria']
      ? {
          parameters: result.world.macro.regions['region-lower-austria']!.parameters,
          baseline: result.world.macro.regions['region-lower-austria']!.baselineParameters,
        }
      : null,
    events: result.events.length,
    alois: result.world.persons['person-alois-lechner']
      ? {
          alive: !result.world.persons['person-alois-lechner']!.died,
          mood: result.world.persons['person-alois-lechner']!.life?.mood,
          reputation: result.world.persons['person-alois-lechner']!.life?.reputation,
          agency: result.world.persons['person-alois-lechner']!.agency,
        }
      : null,
  };
});

// C. Historical people act from their own organisations and goals; this uses
// the same free run as A, so no action or outcome is injected.
const historicalIds = [
  'person-sigmund-freud',
  'person-victor-adler',
  'person-karl-kraus',
  'person-arthur-schnitzler',
];
const experimentC = historicalIds.map((id) => {
  const person = free.world.persons[id]!;
  const actions = free.events.filter((event) => event.subjectId === id);
  return {
    id,
    name: person.name,
    alive: !person.died,
    died: person.died,
    goal: person.agency,
    actions: actions.slice(-12).map((event) => eventSummary(free.world, event)),
    agencyKinds: actions
      .filter((event) => event.action.startsWith('agency:'))
      .map((event) => event.action),
    processRoles: Object.entries(free.world.macro?.developments ?? {})
      .filter(([, development]) => development.historical?.participants[id])
      .map(([processId, development]) => ({
        processId,
        phase: development.historical!.phase,
        roles: development.historical!.participants[id]!.roles,
      })),
  };
});

function addExperimentGeneration(world: WorldState, prefix: string): WorldState {
  let current = world;
  for (let index = 1; index <= 4; index += 1) {
    const birth = createV4Birth(
      current,
      {
        name: `Legacy Child ${prefix}${index}`,
        sex: index % 2 === 0 ? 'female' : 'male',
        health: 0.88,
        wish: '在一个已经改变的维也纳长大，看看上一代人留下的制度是否真的有用。',
        lifeMode: 'ordinary',
        appearance: { skin: 1, hair: index, clothes: 2 },
      },
      `phase7-legacy-child-${prefix}-${index}`,
      `phase7-legacy-owner-${prefix}-${index}`,
    );
    current = birth.world;
  }
  return current;
}

// D. Cross-generational legacy: treatment has a durable reform; control does
// not. Both use the same seed, scenes and ordinary population. The difference
// is actual event eligibility and structural regional conditions, not a note in
// a chronicle.
const controlWorld = addExperimentGeneration(plainWorld(), 'c');
const treatmentWorld = addExperimentGeneration(plainWorld(), 't');
const legacyProcessId = 'development:experiment-durable-reform';
addExperimentProcess(treatmentWorld, legacyProcessId, {
  description: '一项已经沉淀为工时、病假和互助制度的改革',
  metrics: {
    support: 0.7,
    opposition: 0.1,
    resources: 0.5,
    legitimacy: 0.65,
    escalation: 0.05,
    information: 0.5,
  },
  phase: 'institutionalizing' as const,
});
treatmentWorld.macro = advanceHistoricalProcesses(
  treatmentWorld,
  treatmentWorld.macro!,
  treatmentWorld.date,
).state;
const treatmentLegacy = Object.values(treatmentWorld.macro!.legacy ?? {}).find(
  (legacy) => legacy.processId === legacyProcessId,
);
const controlRun = run(controlWorld, 25, [
  ...VIENNA_1912_SCENES,
  ...VIENNA_LIFE_SCENES,
  ...VIENNA_FAMILY_RUNTIME_SCENES,
  ...ALL_EVENT_SCENES,
]);
const treatmentRun = run(treatmentWorld, 25, [
  ...VIENNA_1912_SCENES,
  ...VIENNA_LIFE_SCENES,
  ...VIENNA_FAMILY_RUNTIME_SCENES,
  ...ALL_EVENT_SCENES,
]);
const legacyLifeEvents = (result: RunResult) =>
  result.events.filter((event) => event.action.startsWith('vienna-legacy-worklife'));
const legacyEventParticipants = new Set(
  legacyLifeEvents(treatmentRun).flatMap((event) => [
    event.subjectId,
    ...event.participants.map((participant) => participant.personId),
  ]),
);
const legacyBeneficiary = Object.values(treatmentRun.world.persons).find(
  (person) =>
    !person.died &&
    person.ownerId !== undefined &&
    person.born.year >= 1912 &&
    (legacyEventParticipants.has(person.id) ||
      person.parentIds.some((parentId) => legacyEventParticipants.has(parentId))),
);
const legacyByYear = legacyLifeEvents(treatmentRun).reduce<Record<string, number>>(
  (counts, event) => {
    counts[String(event.date.year)] = (counts[String(event.date.year)] ?? 0) + 1;
    return counts;
  },
  {},
);
const generation = Object.values(treatmentRun.world.persons)
  .filter((person) => person.ownerId !== undefined && person.born.year >= 1912)
  .map((person) => {
    const personal = treatmentRun.events.filter(
      (event) =>
        event.subjectId === person.id ||
        event.participants.some((participant) => participant.personId === person.id),
    );
    return {
      id: person.id,
      name: person.name,
      born: person.born,
      died: person.died,
      eventCount: personal.length,
      legacyEvents: personal.filter((event) => event.action.startsWith('vienna-legacy-worklife'))
        .length,
    };
  })
  .sort((a, b) => b.legacyEvents - a.legacyEvents || b.eventCount - a.eventCount);
const experimentD = {
  treatmentLegacy: treatmentLegacy
    ? {
        id: treatmentLegacy.id,
        kind: treatmentLegacy.kind,
        title: treatmentLegacy.title,
        parameterChanges: treatmentLegacy.parameterChanges,
        eventWeights: treatmentLegacy.eventWeights,
      }
    : null,
  control: {
    legacyLifeEvents: legacyLifeEvents(controlRun).length,
    legacyCount: Object.keys(controlRun.world.macro?.legacy ?? {}).length,
    region: controlRun.world.macro?.regions['region-lower-austria']?.parameters,
  },
  treatment: {
    legacyLifeEvents: legacyLifeEvents(treatmentRun).length,
    legacyCount: Object.keys(treatmentRun.world.macro?.legacy ?? {}).length,
    region: treatmentRun.world.macro?.regions['region-lower-austria']?.parameters,
  },
  legacyByYear,
  generation,
  legacyParticipants: [...legacyEventParticipants].map((id) => ({
    id,
    name: treatmentRun.world.persons[id]?.name,
    born: treatmentRun.world.persons[id]?.born,
  })),
  sampleEvents: legacyLifeEvents(treatmentRun)
    .slice(0, 8)
    .map((event) => eventSummary(treatmentRun.world, event)),
  beneficiary: legacyBeneficiary
    ? {
        id: legacyBeneficiary.id,
        name: legacyBeneficiary.name,
        born: legacyBeneficiary.born,
        occupation: legacyBeneficiary.employment?.occupation,
        events: treatmentRun.events
          .filter(
            (event) =>
              event.subjectId === legacyBeneficiary.id ||
              event.participants.some(
                (participant) => participant.personId === legacyBeneficiary.id,
              ),
          )
          .slice(-20)
          .map((event) => eventSummary(treatmentRun.world, event)),
      }
    : null,
};

// E. Full lives with different starting positions. Three ordinary player-created
// children live through the same free world and produce personal timelines with
// event causes and effects.
let lifeWorld = historicalWorld();
const lifeChildren: { id: string; label: string }[] = [];
const births = [
  {
    name: 'Klara Drucker',
    sex: 'female' as const,
    wish: '在印刷厂找一份不用把手指送进机器的活，并照顾家里。',
  },
  {
    name: 'Franz Zugführer',
    sex: 'male' as const,
    wish: '离开 Leopoldstadt 去看看帝国的边界，再回来。',
  },
  {
    name: 'Mitzi Werkmeister',
    sex: 'female' as const,
    wish: '学会识字，在工场里组织同伴争取更短的工时。',
  },
  {
    name: 'Rudolf Schneider',
    sex: 'male' as const,
    wish: '学一门手艺，开一间自己的小铺子。',
  },
  {
    name: 'Anna Pflegerin',
    sex: 'female' as const,
    wish: '在医院里做照护工作，尽量让病人少受一点罪。',
  },
  {
    name: 'Leopold Bäcker',
    sex: 'male' as const,
    wish: '有一间面包房，家里不再挨饿。',
  },
];
for (const [index, birth] of births.entries()) {
  const result = createV4Birth(
    lifeWorld,
    {
      name: birth.name,
      sex: birth.sex,
      health: 0.88,
      wish: birth.wish,
      lifeMode: 'ordinary',
      appearance: { skin: 1, hair: index, clothes: 2 },
    },
    `phase7-life-${index + 1}`,
    `phase7-life-owner-${index + 1}`,
  );
  lifeWorld = result.world;
  lifeChildren.push({ id: result.childId, label: birth.name });
}
const life = run(lifeWorld, 60);
function personalTimeline(personId: string) {
  const person = life.world.persons[personId];
  if (!person) return null;
  const personal = life.events
    .filter(
      (event) =>
        event.subjectId === personId ||
        event.participants.some((participant) => participant.personId === personId),
    )
    .sort(
      (a, b) =>
        a.date.year - b.date.year || a.date.month - b.date.month || a.id.localeCompare(b.id),
    );
  const early = personal.slice(0, 12);
  const late = personal.slice(-28);
  const timeline = [...new Map([...early, ...late].map((event) => [event.id, event])).values()];
  const jobHistory = personal.flatMap((event) =>
    event.effects
      .filter(
        (effect): effect is Extract<typeof effect, { type: 'employment' }> =>
          effect.type === 'employment',
      )
      .map((effect) => ({
        date: event.date,
        occupation: effect.occupation,
        organizationId: effect.organizationId,
        wage: effect.wage,
      })),
  );
  return {
    id: person.id,
    name: person.name,
    born: person.born,
    died: person.died,
    deathCause: person.deathCause,
    occupation: person.employment?.occupation,
    roles: person.roles,
    education: person.education,
    locationId: person.locationId,
    agency: person.agency,
    eventCount: personal.length,
    jobHistory,
    timeline: timeline.map((event) => eventSummary(life.world, event)),
  };
}
const allLives = lifeChildren.map((child) => ({
  label: child.label,
  ...personalTimeline(child.id),
}));
const selectedLives = allLives
  .filter((person): person is NonNullable<typeof person> => Boolean(person))
  .filter((person) => {
    if (!person.born) return false;
    const end = person.died?.year ?? life.world.date.year;
    return end - person.born.year >= 45;
  })
  .sort((a, b) => (b.eventCount ?? 0) - (a.eventCount ?? 0))
  .slice(0, 3);
const otherLives = allLives
  .filter((person) => person && !selectedLives.some((selected) => selected.id === person.id))
  .map((person) => ({
    name: person?.name,
    born: person?.born,
    died: person?.died,
    deathCause: person?.deathCause,
    eventCount: person?.eventCount,
  }));
const initialLives = ['person-friedrich-hofer', 'person-grete-stein']
  .map((id) => personalTimeline(id))
  .filter((person) => Boolean(person));
const experimentE = {
  years: 60,
  date: life.world.date,
  lives: selectedLives,
  initialLives,
  otherLives,
  historicalEvents: life.events
    .filter(
      (event) =>
        event.action.startsWith('vienna-history') || event.action.startsWith('initiative:'),
    )
    .slice(-16)
    .map((event) => eventSummary(life.world, event)),
};

// F. A war process that actually decays to an end leaves a war_aftermath legacy
// and makes the aftermath life pack reachable. This is a lifecycle/content
// trigger check, separate from the controlled 1914 war participation scenario.
const aftermathWorld = historicalWorld();
const warProcessId = 'development:experiment-war-aftermath';
addExperimentProcess(aftermathWorld, warProcessId, {
  description: '一场已经结束、只留下退伍者与失亲家庭的战争动员',
  metrics: {
    support: 0.1,
    opposition: 0.3,
    resources: 0.1,
    legitimacy: 0.25,
    escalation: 0.05,
    information: 0.2,
  },
  phase: 'declining' as const,
});
const warDevelopment = aftermathWorld.macro!.developments![warProcessId]!;
const warHistorical = warDevelopment.historical!;
warHistorical.kind = 'war_mobilization';
warHistorical.participants = {};
warDevelopment.organizationId = undefined;
warHistorical.lastActivity = { year: 1912, month: 1 };
let aftermathState = aftermathWorld.macro!;
for (let year = 1913; year <= 1925; year += 1) {
  aftermathState = advanceHistoricalProcesses(aftermathWorld, aftermathState, {
    year,
    month: 1,
  }).state;
}
aftermathWorld.macro = aftermathState;
aftermathWorld.date = { year: 1925, month: 1 };
const aftermathEvents = run(aftermathWorld, 12, [
  ...VIENNA_1912_SCENES,
  ...VIENNA_LIFE_SCENES,
  ...VIENNA_FAMILY_RUNTIME_SCENES,
  ...ALL_EVENT_SCENES,
]);
const experimentF = {
  process: processView(aftermathWorld, warProcessId),
  legacy: legacyView(aftermathWorld).filter((legacy) => legacy.processId === warProcessId),
  warAftermathEvents: aftermathEvents.events.filter((event) =>
    event.action.startsWith('vienna-war-aftermath-life'),
  ).length,
  samples: aftermathEvents.events
    .filter((event) => event.action.startsWith('vienna-war-aftermath-life'))
    .slice(0, 6)
    .map((event) => eventSummary(aftermathEvents.world, event)),
};

const report = {
  generatedAt: new Date().toISOString(),
  seed: VIENNA_1912_SEED.id,
  runtimeMs: Date.now() - startedAt,
  experimentA,
  experimentB,
  experimentC,
  experimentD,
  experimentE,
  experimentF,
};
mkdirSync('docs/v4', { recursive: true });
writeFileSync('docs/v4/phase-7-experiments.json', `${JSON.stringify(report, null, 2)}\n`);
console.log(
  JSON.stringify(
    {
      runtimeMs: report.runtimeMs,
      a: {
        agencyEvents: experimentA.agencyEvents,
        bottomUp: experimentA.bottomUpProcess?.id,
        bottomUpPhase: experimentA.bottomUpProcess?.phase,
      },
      b: experimentB.map((entry) => ({
        key: entry.key,
        phase: entry.process?.phase,
        status: entry.process?.status,
        split: entry.splitProcess?.phase,
        legacy: entry.legacy.map((legacy) => legacy.kind),
        foodSupply: entry.region?.parameters.foodSupply,
        persecution: entry.region?.parameters.persecution,
      })),
      c: experimentC.map((entry) => ({
        name: entry.name,
        goal: entry.goal?.goal,
        actions: entry.actions.length,
        kinds: [...new Set(entry.agencyKinds)],
        processRoles: entry.processRoles,
      })),
      f: {
        warAftermathEvents: experimentF.warAftermathEvents,
        legacy: experimentF.legacy.map((legacy) => legacy.kind),
      },
      d: {
        controlLegacyLifeEvents: experimentD.control.legacyLifeEvents,
        treatmentLegacyLifeEvents: experimentD.treatment.legacyLifeEvents,
        treatmentLegacy: experimentD.treatmentLegacy?.title,
        beneficiary: experimentD.beneficiary?.name,
      },
      e: [...experimentE.lives, ...experimentE.initialLives].map((entry) => ({
        name: entry?.name,
        age: entry?.born ? (entry.died?.year ?? life.world.date.year) - entry.born.year : null,
        events: entry?.eventCount,
        died: entry?.died,
        cause: entry?.deathCause,
      })),
    },
    null,
    2,
  ),
);
