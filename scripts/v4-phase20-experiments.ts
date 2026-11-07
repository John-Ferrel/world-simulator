/**
 * Phase 20 controlled experiments A–D.
 *
 * These are mechanism checks, not natural-life evidence. Each scenario seeds a
 * small cast and a few standing states, then runs only the relevant Phase 20
 * kernels. Natural incidence is measured by phase20-summary and the adaptive
 * audit.
 *
 *   pnpm v4:phase20-experiments
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { advanceV4Year } from '../packages/v4/engine.js';
import type { EventFact, Person, StateInstance, WorldState } from '../packages/v4/domain.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import { ALL_STATES } from '../packages/v4/content/states/index.js';
import { KERNEL_LIBRARY } from '../packages/v4/content/kernels/index.js';
import { createCompositionSource } from '../packages/v4/composition/composer.js';
import { defaultMacroState } from '../packages/v4/macro.js';
import { touchStateRevision } from '../packages/v4/state/runtime.js';

function baseWorld(seed: string): WorldState {
  const world = applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
  world.seed = seed;
  world.id = `world:phase20-exp:${seed}`;
  world.date = { year: 1912, month: 1 };
  world.macro = defaultMacroState(world);
  return world;
}

function addPerson(
  world: WorldState,
  name: string,
  bornYear: number,
  options: {
    sex?: 'female' | 'male';
    roles?: string[];
    education?: Person['education']['status'];
    partnerOf?: string;
  } = {},
): string {
  const template = Object.values(world.persons).find(
    (person) => !person.died && person.sex === (options.sex ?? 'female'),
  );
  if (!template) throw new Error('no person template');
  const household = Object.values(world.households).find(
    (candidate) =>
      candidate.memberIds.length < 8 &&
      candidate.guardianIds.some((id) => world.persons[id] && !world.persons[id]!.died),
  );
  if (!household) throw new Error('no household');
  const id = `person:exp:${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  world.persons[id] = {
    ...structuredClone(template),
    id,
    name,
    sex: options.sex ?? 'female',
    born: { year: bornYear, month: 1 },
    locationId: world.households[household.id]!.residenceId,
    householdId: household.id,
    parentIds: [],
    guardianIds: [],
    relationshipIds: [],
    projectIds: [],
    knowledgeIds: [],
    roles: options.roles ?? [],
    education: { status: options.education ?? 'secondary', level: 3 },
    employment: undefined,
    died: undefined,
    deathCause: undefined,
    life: {
      mood: 0,
      reputation: 0,
      skills: { literacy: 0.7, numeracy: 0.6, craft: 0.5, social: 0.6 },
      flags: [],
    },
    provenance: { kind: 'initial' },
  };
  household.memberIds.push(id);
  if (options.partnerOf) {
    const relation = {
      id: `v4-rel-exp-${options.partnerOf}-${id}-partner`,
      a: options.partnerOf,
      b: id,
      kind: 'partner' as const,
      trust: 0.7,
      affection: 0.8,
      obligation: 0.4,
      fear: 0,
      respect: 0.6,
      start: { ...world.date },
      sharedEventIds: [],
    };
    world.relations[relation.id] = relation;
    world.persons[options.partnerOf]?.relationshipIds.push(relation.id);
    world.persons[id]!.relationshipIds.push(relation.id);
  }
  return id;
}

function seedState(
  world: WorldState,
  definitionId: string,
  ownerType: StateInstance['ownerType'],
  ownerId: string,
  parameters: Record<string, number | string | boolean> = {},
  links: Record<string, string> = {},
): string {
  world.states ??= {};
  const id = `state:phase20:${definitionId}:${ownerType}:${ownerId}`;
  world.states[id] = {
    id,
    definitionId,
    version: 1,
    ownerType,
    ownerId,
    since: { ...world.date },
    parameters,
    links,
    sourceEventId: 'evt:phase20:seed',
    active: true,
    tickCount: 0,
    expiresAt: { year: 1935, month: 12 },
  };
  touchStateRevision(world);
  return id;
}

function run(
  world: WorldState,
  kernelPrefixes: string[],
  years: number,
  subjectIds: string[] = [],
): { world: WorldState; events: EventFact[] } {
  const kernels = KERNEL_LIBRARY.filter((kernel) =>
    kernelPrefixes.some((prefix) => kernel.id.startsWith(prefix)),
  );
  const source = createCompositionSource(kernels);
  const composition = {
    compile(worldState: WorldState, date: WorldState['date']) {
      const compiled = source.compile(worldState, date);
      return {
        ...compiled,
        scenes: compiled.scenes.map((scene) =>
          subjectIds.length > 0 ? { ...scene, subjectIds } : scene,
        ),
      };
    },
  };
  let current = world;
  const events: EventFact[] = [];
  for (let index = 0; index < years; index += 1) {
    const result = advanceV4Year(current, [], {
      economy: { enabled: false },
      eventRuntime: true,
      agency: false,
      tasks: [],
      composition,
      states: ALL_STATES,
      maxOrdinaryEventsPerPerson: 4,
    });
    current = result.world;
    events.push(...result.events);
  }
  return { world: current, events };
}

const results: {
  id: string;
  title: string;
  seededStates: string[];
  years: number;
  events: number;
  matchingEvents: {
    action: string;
    subject: string;
    text: string;
    check?: { modifier: number; total: number; dc: number; band: string };
    effects: string[];
  }[];
  checks: { name: string; pass: boolean; detail: string }[];
}[] = [];

function scenario(
  id: string,
  title: string,
  prefixes: string[],
  years: number,
  setup: (world: WorldState) => { subjectIds: string[]; seeded: string[]; restrict?: boolean },
): void {
  const world = baseWorld(id);
  const { subjectIds, seeded, restrict = true } = setup(world);
  const { events } = run(world, prefixes, years, restrict ? subjectIds : []);
  const matching = events.filter((event) =>
    prefixes.some((prefix) => event.action.startsWith(prefix)),
  );
  const sample = matching.slice(0, 12).map((event) => ({
    action: event.action,
    subject: world.persons[event.subjectId]?.name ?? event.subjectId,
    text: event.immediateText.slice(0, 220),
    check: event.trace?.check
      ? {
          modifier: event.trace.check.modifier,
          total: event.trace.check.total,
          dc: event.trace.check.dc,
          band: event.trace.check.band,
        }
      : undefined,
    effects: event.effects.map((effect) => effect.type),
  }));
  const seededEvents = matching.filter(
    (event) =>
      subjectIds.includes(event.subjectId) ||
      event.participants.some((participant) => subjectIds.includes(participant.personId)),
  );
  const distinctSeededOutcomes = new Set(
    seededEvents.map((event) => `${event.action}|${event.trace?.check?.dc ?? ''}`),
  ).size;
  const checks = [
    {
      name: 'adaptive_event_executed',
      pass: matching.length > 0,
      detail:
        matching
          .map((event) => event.action)
          .slice(0, 6)
          .join(', ') || 'none',
    },
    {
      name: 'seeded_subject_participated',
      pass: matching.some(
        (event) =>
          subjectIds.includes(event.subjectId) ||
          event.participants.some((participant) => subjectIds.includes(participant.personId)),
      ),
      detail: matching
        .map((event) => `${event.subjectId}:${event.action}`)
        .slice(0, 4)
        .join(', '),
    },
    {
      name: 'distinct_seeded_outcomes',
      pass: distinctSeededOutcomes >= Math.min(2, subjectIds.length),
      detail: `distinct=${distinctSeededOutcomes}, seededSubjects=${subjectIds.length}`,
    },
  ];
  results.push({
    id,
    title,
    seededStates: seeded,
    years,
    events: events.length,
    matchingEvents: sample,
    checks,
  });
}

scenario(
  'A-one-event-different-lives',
  'Same ordinary interview, different lives',
  ['ad20-job-interview'],
  8,
  (world) => {
    const famous = addPerson(world, 'Klara Famous', 1882, { sex: 'female', roles: ['clerk'] });
    const shamed = addPerson(world, 'Klara Shamed', 1882, { sex: 'female', roles: ['clerk'] });
    addPerson(world, 'Employer Weiss', 1875, { sex: 'male', roles: ['employer'] });
    seedState(world, 'fame', 'person', famous, { level: 0.8, notoriety: true });
    seedState(world, 'public-scandal', 'person', shamed, { notoriety: 70, shame: 60 });
    return { subjectIds: [famous, shamed], seeded: ['fame', 'public-scandal'], restrict: false };
  },
);

scenario('B-ordinary-curse', 'A curse enters an ordinary wish', ['pc20-wish'], 8, (world) => {
  const subject = addPerson(world, 'Rosa Wish', 1878, { sex: 'female', roles: ['clerk'] });
  addPerson(world, 'Partner Berg', 1880, { sex: 'male', roles: ['clerk'], partnerOf: subject });
  addPerson(world, 'Nachbarin Stein', 1870, { sex: 'female', roles: ['neighbor'] });
  seedState(world, 'cursed-by-wish', 'person', subject, { severity: 0.7, triggers: 2 });
  return { subjectIds: [subject], seeded: ['cursed-by-wish'] };
});

scenario(
  'C-reconciliation',
  'A separated household tries to return',
  ['pc20-separation'],
  8,
  (world) => {
    const subject = addPerson(world, 'Josef Return', 1878, { sex: 'male', roles: ['clerk'] });
    addPerson(world, 'Partner Return', 1882, {
      sex: 'female',
      roles: ['clerk'],
      partnerOf: subject,
    });
    addPerson(world, 'Nachbar Return', 1870, { sex: 'male', roles: ['neighbor'] });
    seedState(world, 'fw19-separated-household', 'household', world.persons[subject]!.householdId, {
      distance: 60,
      missing: 40,
      dependents: 30,
      hope: 55,
    });
    return { subjectIds: [subject], seeded: ['fw19-separated-household'] };
  },
);

scenario(
  'D-public-reversal',
  'A political suspect is exonerated or re-accused',
  ['pc20-investigation'],
  8,
  (world) => {
    const subject = addPerson(world, 'Theresia Suspect', 1880, { sex: 'female', roles: ['clerk'] });
    addPerson(world, 'Beamter Kral', 1875, { sex: 'male', roles: ['official'] });
    addPerson(world, 'Worker Winter', 1870, { sex: 'male', roles: ['worker'] });
    seedState(world, 'political-suspect', 'person', subject, {
      suspicion: 60,
      surveillance: 50,
      evidence: 35,
    });
    return { subjectIds: [subject], seeded: ['political-suspect'] };
  },
);

const payload = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  note: 'Controlled mechanism checks only. Natural occurrence is measured separately.',
  results,
  allPassed: results.every((result) => result.checks.every((check) => check.pass)),
};
mkdirSync('docs/v4', { recursive: true });
writeFileSync('docs/v4/phase-20-experiments.json', `${JSON.stringify(payload, null, 2)}\n`);
console.log(
  JSON.stringify(
    {
      allPassed: payload.allPassed,
      results: results.map((result) => ({
        id: result.id,
        matching: result.matchingEvents.length,
        checks: result.checks.map((check) => `${check.name}:${check.pass}`),
      })),
    },
    null,
    2,
  ),
);
