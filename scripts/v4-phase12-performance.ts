/**
 * Phase 12 performance evidence.
 *
 * Runs the real composed content load at three population sizes and records
 * wall-clock, heap and engine stage timings. Use after content freeze and on an
 * otherwise idle machine; results are sensitive to parallel work.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { performance } from 'node:perf_hooks';
import { advanceV4Year } from '../packages/v4/engine.js';
import { defaultMacroState } from '../packages/v4/macro.js';
import { ALL_TASKS } from '../packages/v4/content/generated/index.js';
import { DEFAULT_COMPOSITION } from '../packages/v4/composition/default.js';
import type { Household, Person, Place, WorldState } from '../packages/v4/domain.js';

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
    id: `phase12-bench-${count}`,
    seed: 'phase12-bench',
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

const sizes = process.argv.slice(2).map(Number).filter((value) => value > 0);
const populationSizes = sizes.length > 0 ? sizes : [1000, 5000, 20000];
const years = 3;
const results = [];
for (const count of populationSizes) {
  const world = makeWorld(count);
  world.macro = defaultMacroState(world);
  let current = world;
  let events = 0;
  let lastTimings: Record<string, number> | undefined;
  const started = performance.now();
  for (let year = 0; year < years; year += 1) {
    const result = advanceV4Year(current, [], {
      economy: { enabled: false },
      eventRuntime: true,
      agency: true,
      composition: DEFAULT_COMPOSITION,
      tasks: ALL_TASKS,
      maxOrdinaryEventsPerPerson: 3,
    });
    current = result.world;
    events += result.events.length;
    lastTimings = result.diagnostics.timings as unknown as Record<string, number>;
  }
  const elapsed = performance.now() - started;
  results.push({
    persons: count,
    years,
    events,
    elapsedMs: Math.round(elapsed),
    msPerYear: Math.round(elapsed / years),
    personsPerSecond: Math.round((count * years * 1000) / elapsed),
    heapMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
    lastYearTimings: lastTimings,
  });
  console.log(JSON.stringify(results.at(-1)));
}

const output = {
  generatedAt: new Date().toISOString(),
  years,
  composition: true,
  note: 'Run on an idle machine; parallel content generation or tests distort wall-clock results.',
  results,
};
mkdirSync('docs/v4', { recursive: true });
writeFileSync('docs/v4/phase-12-performance.json', `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify(output, null, 2));
