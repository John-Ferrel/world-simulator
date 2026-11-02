import { mkdirSync, writeFileSync } from 'node:fs';
import { advanceV4Year } from '../packages/v4/engine.js';
import { VIENNA_1912_SCENES, VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import { VIENNA_LIFE_SCENES } from '../packages/v4/content/vienna-life.js';
import { VIENNA_POSTWAR_SCENES } from '../packages/v4/content/vienna-postwar.js';
import { VIENNA_HISTORY_SCENES } from '../packages/v4/content/vienna-history.js';
import { VIENNA_DEVELOPMENT_SCENES } from '../packages/v4/content/vienna-developments.js';
import { VIENNA_FAMILY_RUNTIME_SCENES } from '../packages/v4/content/vienna-family.js';
import { GENERATED_SCENES } from '../packages/v4/content/generated/index.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { ensureHistoricalProcess } from '../packages/v4/history.js';
import {
  addMonths,
  type SceneDefinition,
  type WorldDate,
  type WorldState,
} from '../packages/v4/domain.js';
import type { WorldDevelopment } from '../packages/v4/macro.js';

const SEED = applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
const SCENES = [
  ...VIENNA_1912_SCENES,
  ...VIENNA_LIFE_SCENES,
  ...VIENNA_POSTWAR_SCENES,
  ...VIENNA_HISTORY_SCENES,
  ...VIENNA_DEVELOPMENT_SCENES,
  ...VIENNA_FAMILY_RUNTIME_SCENES,
  ...GENERATED_SCENES,
];

const start = Date.now();

function addProcess(
  world: WorldState,
  input: {
    id: string;
    kind: 'war_mobilization' | 'public_health_crisis';
    type: 'war' | 'epidemic';
    start: WorldDate;
    end: WorldDate;
    organizationId: string;
    eventFamilyIds: string[];
    severity: number;
  },
): void {
  const development: WorldDevelopment = {
    id: input.id,
    type: input.type,
    regionId: 'region-lower-austria',
    description:
      input.kind === 'war_mobilization'
        ? '大战动员、兵役、医院与家庭离散'
        : '1918 年流感与城市照护危机',
    severity: input.severity,
    start: input.start,
    end: input.end,
    status: 'active',
    eventFamilyIds: input.eventFamilyIds,
    organizationId: input.organizationId,
    source: 'phase-6-scenario',
  };
  const historical = ensureHistoricalProcess(development, input.start);
  historical.kind = input.kind;
  historical.phase = 'mobilizing';
  historical.phaseStarted = { ...input.start };
  historical.regionIds = ['region-lower-austria'];
  historical.objectives =
    input.kind === 'war_mobilization'
      ? ['动员、服役与维持家庭生存']
      : ['照护病人并维持城市基本服务'];
  historical.sourceIds = [];
  historical.source = 'event';
  historical.metrics = {
    support: 0.42,
    opposition: 0.15,
    resources: 0.35,
    legitimacy: 0.5,
    escalation: 0.45,
    information: 0.3,
  };
  development.historical = historical;
  world.macro!.developments![development.id] = development;
  world.macro!.eventPool[input.eventFamilyIds[0]!] = {
    familyId: input.eventFamilyIds[0]!,
    enabled: true,
    weightMultiplier: 1.3,
    source: 'phase-6-scenario',
    updatedAt: { ...input.start },
  };
}

function run(
  world: WorldState,
  years: number,
): {
  world: WorldState;
  events: ReturnType<typeof advanceV4Year>['events'];
} {
  let current = world;
  const events: ReturnType<typeof advanceV4Year>['events'] = [];
  for (let index = 0; index < years; index += 1) {
    const result = advanceV4Year(current, SCENES, {
      economy: { enabled: true },
      eventRuntime: true,
      maxOrdinaryEventsPerPerson: 4,
    });
    current = result.world;
    events.push(...result.events);
  }
  return { world: current, events };
}

function participantSummary(world: WorldState, processId: string) {
  const development = world.macro!.developments?.[processId];
  const process = development?.historical;
  if (!development || !process) return undefined;
  return {
    id: processId,
    kind: process.kind,
    phase: process.phase,
    outcome: process.outcome,
    metrics: process.metrics,
    participants: Object.entries(process.participants)
      .sort((a, b) => b[1].influence - a[1].influence)
      .map(([id, entry]) => ({
        id,
        name: world.persons[id]?.name ?? '已故参与者',
        alive: Boolean(world.persons[id] && !world.persons[id]!.died),
        roles: entry.roles,
        influence: Number(entry.influence.toFixed(4)),
      })),
  };
}

function actionSummary(events: any[], prefix: string) {
  const selected = events.filter((event) => event.action.startsWith(prefix));
  return {
    count: selected.length,
    samples: selected.slice(0, 8).map((event) => ({
      date: event.date,
      action: event.action,
      subject: event.subjectId,
      text: event.immediateText,
      participants: event.participants.map((participant: any) => participant.personId),
    })),
  };
}

// A. 1914 war mobilisation. The process is created by the scenario, not by a
// fixed historical timeline; if it were absent, conscription scenes would not fire.
const warWorld = structuredClone(SEED);
warWorld.date = { year: 1914, month: 1 };
addProcess(warWorld, {
  id: 'development:scenario-war-1914',
  kind: 'war_mobilization',
  type: 'war',
  start: { year: 1914, month: 7 },
  end: { year: 1918, month: 11 },
  organizationId: 'org-wien-landwehr',
  eventFamilyIds: ['vienna-history-war'],
  severity: 0.82,
});
const war = run(warWorld, 5);

// B. 1918 public-health crisis.
const epidemicWorld = structuredClone(SEED);
epidemicWorld.date = { year: 1918, month: 9 };
addProcess(epidemicWorld, {
  id: 'development:scenario-epidemic-1918',
  kind: 'public_health_crisis',
  type: 'epidemic',
  start: { year: 1918, month: 9 },
  end: { year: 1919, month: 6 },
  organizationId: 'org-allgemeines-krankenhaus',
  eventFamilyIds: ['vienna-history-epidemic'],
  severity: 0.9,
});
const epidemic = run(epidemicWorld, 12);

// C. A normal 1912 world with the seeded historical layer: public contacts and
// follow-up relationships, not a celebrity cutscene.
const contactWorld = structuredClone(SEED);
const contact = run(contactWorld, 12);
const historicalContacts = contact.events.filter(
  (event) =>
    event.action.startsWith('vienna-history-freud') ||
    event.action.startsWith('vienna-historical-social-movement') ||
    event.action.startsWith('vienna-history-sdap') ||
    event.action.startsWith('vienna-history-kraus') ||
    event.action.startsWith('vienna-history-schnitzler'),
);
const freudRelations = Object.values(contact.world.relations).filter(
  (relation) =>
    relation.kind === 'acquaintance' &&
    (relation.a === 'person-sigmund-freud' || relation.b === 'person-sigmund-freud'),
);
const historicalKnowledge = Object.values(contact.world.knowledge).filter((knowledge) =>
  [
    'person-sigmund-freud',
    'person-victor-adler',
    'person-karl-kraus',
    'person-arthur-schnitzler',
  ].includes(knowledge.source.personId ?? ''),
);

// D. Fixed-seed counterfactual: same initial world and same random configuration;
// only a committed influence action differs.
const control = structuredClone(SEED);
const treatment = structuredClone(SEED);
for (const world of [control, treatment]) {
  const development: WorldDevelopment = {
    id: 'development:counterfactual-1912',
    type: 'social_change',
    regionId: 'region-lower-austria',
    description: '街区互助与普选运动',
    severity: 0.7,
    start: { year: 1912, month: 1 },
    end: { year: 1920, month: 1 },
    status: 'active',
    eventFamilyIds: ['vienna-history-social-democracy'],
    organizationId: 'org-sdap',
    source: 'counterfactual',
  };
  const historical = ensureHistoricalProcess(development, world.date);
  historical.kind = 'social_movement';
  historical.phase = 'mobilizing';
  historical.phaseStarted = { ...world.date };
  historical.regionIds = ['region-lower-austria'];
  historical.metrics = {
    support: 0.4,
    opposition: 0.15,
    resources: 0.3,
    legitimacy: 0.5,
    escalation: 0.1,
    information: 0.2,
  };
  development.historical = historical;
  world.macro!.developments![development.id] = development;
}
const influenceScene: SceneDefinition = {
  id: 'vienna-history-counterfactual-influence',
  version: 1,
  packId: 'phase-6-scenario',
  title: '街区名单',
  stage: 'adulthood',
  subjectProvenance: ['birth', 'initial', 'materialized_population'],
  ageWindow: { min: 18, max: 65 },
  roles: [{ key: 'subject', kind: 'subject', required: true, minAge: 18, maxAge: 65 }],
  conditions: [
    {
      kind: 'historicalProcess',
      id: 'development:counterfactual-1912',
      phases: ['mobilizing', 'confrontation'],
    },
  ],
  rate: 1,
  subjectIds: ['person-grete-stein'],
  outcomes: [
    {
      id: 'support',
      weight: 1,
      immediateText: '{subject}把街区名单和会费交给组织者，公开支持这场运动。',
      effects: [
        {
          type: 'historical_participation',
          processId: 'development:counterfactual-1912',
          personId: '$subject',
          role: 'organizer',
          influence: 0.2,
          reason: 'delivered a district list',
        },
        {
          type: 'historical_influence',
          processId: 'development:counterfactual-1912',
          personId: '$subject',
          dimension: 'support',
          amount: 0.2,
          reason: 'public support',
        },
      ],
    },
  ],
  tags: ['history', 'counterfactual'],
};
const controlRun = run(control, 1);
const treatmentRun = advanceV4Year(treatment, [influenceScene], {
  economy: { enabled: true },
  eventRuntime: true,
  maxOrdinaryEventsPerPerson: 4,
});

const report = {
  generatedAt: new Date().toISOString(),
  seed: VIENNA_1912_SEED.id,
  initialHistoricalLayer: {
    people: [
      'person-sigmund-freud',
      'person-victor-adler',
      'person-karl-kraus',
      'person-arthur-schnitzler',
    ],
    processes: Object.keys(SEED.macro!.developments ?? {}),
  },
  war: {
    process: participantSummary(war.world, 'development:scenario-war-1914'),
    events: actionSummary(war.events, 'vienna-history-war'),
  },
  epidemic: {
    process: participantSummary(epidemic.world, 'development:scenario-epidemic-1918'),
    events: actionSummary(epidemic.events, 'vienna-history-epidemic'),
  },
  contacts: {
    events: historicalContacts.slice(0, 16).map((event) => ({
      date: event.date,
      action: event.action,
      subject: contact.world.persons[event.subjectId]?.name,
      text: event.immediateText,
      placeId: event.placeId,
    })),
    freudRelations: freudRelations.length,
    historicalKnowledge: historicalKnowledge.length,
    generatedHistoricalEvents: contact.events.filter((event) =>
      event.action.startsWith('vienna-historical-social-movement'),
    ).length,
    processStates: Object.keys(SEED.macro!.developments ?? {}).map((id) =>
      participantSummary(contact.world, id),
    ),
  },
  counterfactual: {
    control: participantSummary(controlRun.world, 'development:counterfactual-1912'),
    treatment: participantSummary(treatmentRun.world, 'development:counterfactual-1912'),
    treatmentEvents: treatmentRun.events.map((event) => ({
      date: event.date,
      action: event.action,
      text: event.immediateText,
    })),
  },
  runtimeMs: Date.now() - start,
};

mkdirSync('docs/v4', { recursive: true });
writeFileSync('docs/v4/phase-6-scenarios.json', JSON.stringify(report, null, 2) + '\n');
console.log(
  JSON.stringify(
    {
      war: {
        events: report.war.events.count,
        phase: report.war.process?.phase,
        participants: report.war.process?.participants.length,
      },
      epidemic: {
        events: report.epidemic.events.count,
        phase: report.epidemic.process?.phase,
        outcome: report.epidemic.process?.outcome,
        participants: report.epidemic.process?.participants.length,
      },
      contacts: {
        events: historicalContacts.length,
        freudRelations: freudRelations.length,
        knowledge: historicalKnowledge.length,
        generatedHistoricalEvents: contact.events.filter((event) =>
          event.action.startsWith('vienna-historical-social-movement'),
        ).length,
      },
      counterfactual: {
        control: report.counterfactual.control?.phase,
        treatment: report.counterfactual.treatment?.phase,
      },
      runtimeMs: report.runtimeMs,
    },
    null,
    2,
  ),
);
