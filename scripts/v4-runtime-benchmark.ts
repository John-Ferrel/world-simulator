import { performance } from 'node:perf_hooks';
import { advanceV4Year } from '../packages/v4/engine.js';
import type {
  Household,
  Person,
  Place,
  SceneDefinition,
  WorldState,
} from '../packages/v4/domain.js';

function traits(): Person['traits'] {
  return {
    care: 0.5,
    ambition: 0.5,
    tradition: 0.5,
    openness: 0.5,
    conscientiousness: 0.5,
    extraversion: 0.5,
    agreeableness: 0.5,
    neuroticism: 0.5,
  };
}

function makeWorld(count: number): WorldState {
  const places: Record<string, Place> = {
    home: { id: 'home', name: 'Tenement', kind: 'home', settlementId: 'vienna', offers: [] },
    factory: {
      id: 'factory',
      name: 'Printshop',
      kind: 'factory',
      settlementId: 'vienna',
      offers: [],
    },
  };
  const households: Record<string, Household> = {};
  const persons: Record<string, Person> = {};
  for (let i = 0; i < count; i += 1) {
    const hh = `hh-${Math.floor(i / 5)}`;
    households[hh] ??= {
      id: hh,
      residenceId: 'home',
      memberIds: [],
      guardianIds: [],
      cash: 10,
      food: 10,
      debt: 0,
      rent: 1,
      obligations: [],
      assets: [],
      sharingRules: 'pooled',
    };
    const id = `p-${i}`;
    persons[id] = {
      id,
      name: `Person ${i}`,
      sex: i % 2 === 0 ? 'female' : 'male',
      born: { year: 1880 + (i % 20), month: 1 },
      locationId: 'home',
      householdId: hh,
      parentIds: [],
      guardianIds: [],
      health: { vitality: 0.8, conditions: [], nutrition: 0.8 },
      traits: traits(),
      education: { status: 'primary', level: 1 },
      roles: [],
      projectIds: [],
      relationshipIds: [],
      knowledgeIds: [],
      life: {
        mood: 0,
        reputation: 0,
        skills: { literacy: 0, numeracy: 0, craft: 0, social: 0 },
        flags: [],
      },
      provenance: { kind: 'initial' },
    };
    households[hh]!.memberIds.push(id);
  }
  return {
    id: `bench-${count}`,
    seed: 'bench',
    date: { year: 1912, month: 1 },
    timePolicy: { secondsPerYear: 30, monthsPerTick: 12 },
    places,
    households,
    persons,
    organizations: {},
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
}

function scenes(): SceneDefinition[] {
  return [0, 1, 2].map((n) => ({
    id: `bench-event-${n}`,
    version: 1,
    packId: 'bench',
    title: `Bench event ${n}`,
    stage: 'adulthood',
    ageWindow: { min: 18, max: 70 },
    roles: [{ key: 'subject', kind: 'subject', required: true, minAge: 18, maxAge: 70 }],
    conditions: [{ kind: 'age', min: 18, max: 70 }],
    rate: 0.15,
    weight: 1,
    tags: ['bench'],
    outcomes: [
      {
        id: 'default',
        weight: 1,
        immediateText: 'A bench event happened.',
        effects: [{ type: 'mood', personId: '$subject', amount: -0.001, reason: 'bench' }],
      },
    ],
  }));
}

const count = Number(process.argv[2] ?? 1000);
const years = Number(process.argv[3] ?? 5);
const world = makeWorld(count);
const definitions = scenes();
const started = performance.now();
let current = world;
let events = 0;
for (let i = 0; i < years; i += 1) {
  const result = advanceV4Year(current, definitions, {
    economy: { enabled: false },
    eventRuntime: true,
    maxOrdinaryEventsPerPerson: 3,
  });
  current = result.world;
  events += result.events.length;
}
const elapsed = performance.now() - started;
console.log(
  JSON.stringify({
    persons: count,
    years,
    events,
    ms: Math.round(elapsed),
    msPerYear: Math.round(elapsed / years),
    personsPerSecond: Math.round((count * years * 1000) / elapsed),
    heapMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
  }),
);
