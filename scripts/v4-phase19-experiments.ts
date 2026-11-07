/**
 * Phase 19 controlled collision experiments.
 *
 * These are narrow mechanism checks, not natural-life evidence. Each scenario
 * seeds two or more standing states and runs only the Phase 19 collision packs.
 * Natural lives are produced by scripts/v4-phase15-lives.ts.
 *
 *   pnpm v4:phase19-experiments
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

const PREFIXES = ['pl19-', 'fw19-', 'lc19-', 'eh19-'];

function baseWorld(seed: string): WorldState {
  const world = applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
  world.seed = seed;
  world.id = `world:phase19-exp:${seed}`;
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
    age?: number;
    education?: Person['education']['status'];
    roles?: string[];
    parentId?: string;
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
    parentIds: options.parentId ? [options.parentId] : [],
    guardianIds: options.parentId ? [options.parentId] : [],
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
  if (options.parentId) {
    const relation = {
      id: `v4-rel-exp-${options.parentId}-${id}-kin`,
      a: options.parentId,
      b: id,
      kind: 'kin' as const,
      trust: 0.7,
      affection: 0.7,
      obligation: 0.5,
      fear: 0,
      respect: 0.5,
      start: { ...world.date },
      sharedEventIds: [],
    };
    world.relations[relation.id] = relation;
    world.persons[options.parentId]?.relationshipIds.push(relation.id);
    world.persons[id]!.relationshipIds.push(relation.id);
  }
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
  source = 'evt:phase19:seed',
): string {
  world.states ??= {};
  const id = `state:phase19:${definitionId}:${ownerType}:${ownerId}`;
  world.states[id] = {
    id,
    definitionId,
    version: 1,
    ownerType,
    ownerId,
    since: { ...world.date },
    parameters,
    links,
    sourceEventId: source,
    active: true,
    tickCount: 0,
    expiresAt: { year: 1935, month: 12 },
  };
  touchStateRevision(world);
  return id;
}

function run(
  world: WorldState,
  years: number,
): {
  world: WorldState;
  events: EventFact[];
  crossStateCandidates: number;
  crossStateResolved: number;
  stateOpportunity: Record<string, number>;
  blockedReasons: Record<string, number>;
} {
  const kernels = KERNEL_LIBRARY.filter((kernel) => PREFIXES.some((prefix) => kernel.id.startsWith(prefix)));
  const composition = createCompositionSource(kernels);
  let current = world;
  const events: EventFact[] = [];
  let crossStateCandidates = 0;
  let crossStateResolved = 0;
  const stateOpportunity: Record<string, number> = {};
  const blockedReasons: Record<string, number> = {};
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
    const counters = result.diagnostics.scheduling?.stateOpportunity;
    if (counters) {
      for (const [key, value] of Object.entries(counters)) {
        stateOpportunity[key] = (stateOpportunity[key] ?? 0) + Number(value);
      }
    }
    for (const [reason, count] of Object.entries(result.diagnostics.scheduling?.blockedReasons ?? {})) {
      blockedReasons[reason] = (blockedReasons[reason] ?? 0) + Number(count);
    }
    crossStateCandidates += counters?.crossStateCandidates ?? 0;
    crossStateResolved += counters?.crossStateResolved ?? 0;
  }
  return { world: current, events, crossStateCandidates, crossStateResolved, stateOpportunity, blockedReasons };
}

const results: {
  id: string;
  title: string;
  seededStates: string[];
  years: number;
  events: number;
  packEvents: number;
  newStateAdds: string[];
  crossStateCandidates: number;
  crossStateResolved: number;
  sampleEvents: { action: string; subjectId: string; participants: string[] }[];
  stateOpportunity: Record<string, number>;
  blockedReasons: Record<string, number>;
  checks: { name: string; pass: boolean; detail: string }[];
}[] = [];

function scenario(
  id: string,
  title: string,
  setup: (world: WorldState) => { subjectId: string; seeded: string[] },
): void {
  const world = baseWorld(id);
  const { subjectId, seeded } = setup(world);
  const {
    world: after,
    events,
    crossStateCandidates,
    crossStateResolved,
    stateOpportunity,
    blockedReasons,
  } = run(world, 12);
  const packEvents = events.filter((event) => PREFIXES.some((prefix) => event.action.startsWith(prefix)));
  const subjectEvents = packEvents.filter(
    (event) =>
      event.subjectId === subjectId ||
      event.participants.some((participant) => participant.personId === subjectId),
  );
  const multiStatePackEvents = packEvents.filter((event) => {
    const kernel = KERNEL_LIBRARY.find(
      (candidate) => candidate.id === event.action.split('::')[0],
    );
    if (!kernel) return false;
    const ids = new Set(
      (kernel.conditions ?? [])
        .filter((condition) => condition.kind === 'hasState' && 'stateId' in condition)
        .map((condition) => ('stateId' in condition ? condition.stateId : undefined))
        .filter((id): id is string => Boolean(id)),
    );
    return ids.size >= 2;
  });
  const stateOrRelationshipChanged = packEvents.some((event) =>
    event.effects.some((effect) =>
      [
        'state_add',
        'state_parameter',
        'state_transition',
        'state_remove',
        'relation',
        'relation_end',
        'reputation',
        'cash',
        'position',
        'organization_found',
        'organization_membership',
        'organization_funds',
      ].includes(effect.type),
    ),
  );
  const newStateAdds = events.flatMap((event) =>
    event.effects
      .filter((effect) => effect.type === 'state_add')
      .map((effect) => (effect.type === 'state_add' ? effect.stateId : '')),
  );
  const checks = [
    {
      name: 'collision_pack_event',
      pass: packEvents.length > 0,
      detail: packEvents.map((event) => event.action).slice(0, 6).join(', ') || 'none',
    },
    {
      name: 'subject_participated',
      pass: subjectEvents.length > 0,
      detail: subjectEvents.map((event) => event.action).slice(0, 4).join(', ') || 'none',
    },
    {
      name: 'multi_state_event_executed',
      pass: multiStatePackEvents.length > 0,
      detail: multiStatePackEvents.map((event) => event.action).slice(0, 4).join(', ') || 'none',
    },
    {
      name: 'state_or_relationship_changed',
      pass: stateOrRelationshipChanged,
      detail: `newStateAdds=${[...new Set(newStateAdds)].join(', ') || 'none'}`,
    },
  ];
  results.push({
    id,
    title,
    seededStates: seeded,
    years: 12,
    events: events.length,
    packEvents: packEvents.length,
    newStateAdds: [...new Set(newStateAdds)],
    crossStateCandidates,
    crossStateResolved,
    sampleEvents: packEvents.slice(0, 8).map((event) => ({
      action: event.action,
      subjectId: event.subjectId,
      participants: event.participants.map((participant) => participant.personId),
    })),
    stateOpportunity,
    blockedReasons,
    checks,
  });
}

scenario('power-love', 'Romance × political power', (world) => {
  const subject = addPerson(world, 'Klara Pol', 1882, { sex: 'female', roles: ['clerk'] });
  addPerson(world, 'Nachbarin A', 1878, { sex: 'female', roles: ['neighbor'] });
  addPerson(world, 'Nachbar B', 1880, { sex: 'male', roles: ['neighbor'] });
  addPerson(world, 'Beamter C', 1875, { sex: 'male', roles: ['official'] });
  seedState(world, 'pl19-protected-scandal', 'person', subject, {
    exposure: 55,
    protection: 45,
    leverage: 50,
    publicHeat: 35,
  });
  seedState(world, 'jealous-rival', 'person', subject, {
    suspicion: 50,
    threat: 30,
    leverage: 20,
    publicClaim: false,
    grief: 0,
  });
  return { subjectId: subject, seeded: ['pl19-protected-scandal', 'jealous-rival'] };
});

scenario('family-war', 'Family × war / occupation', (world) => {
  const subject = addPerson(world, 'Rosa Krieg', 1878, { sex: 'female', roles: ['mother'] });
  const child = addPerson(world, 'Mina Krieg', 1906, {
    sex: 'female',
    education: 'primary',
    roles: ['child', 'pupil'],
    parentId: subject,
  });
  const younger = addPerson(world, 'Toni Krieg', 1910, {
    sex: 'male',
    education: 'none',
    roles: ['child'],
    parentId: subject,
  });
  const oldHousehold = world.households[world.persons[subject]!.householdId]!;
  const isolatedId = 'hh:exp:family-war';
  world.households[isolatedId] = {
    ...structuredClone(oldHousehold),
    id: isolatedId,
    memberIds: [subject, child, younger],
    guardianIds: [subject],
    cash: 8,
    food: 4,
    debt: 0,
    obligations: [],
  };
  oldHousehold.memberIds = oldHousehold.memberIds.filter(
    (id) => id !== subject && id !== child && id !== younger,
  );
  world.persons[subject]!.householdId = isolatedId;
  world.persons[child]!.householdId = isolatedId;
  world.persons[younger]!.householdId = isolatedId;
  seedState(world, 'raising-child', 'household', isolatedId, {
    caregiverBurden: 60,
    schoolProgress: 40,
    childConfidence: 45,
    careDebt: 15,
    schoolEnrolled: true,
    leftHome: false,
  }, { child });
  seedState(world, 'occupied-city-regime', 'place', world.persons[subject]!.locationId, {
    intensity: 65,
    requisition: 50,
    resistance: 35,
    curfew: 60,
  });
  return { subjectId: subject, seeded: ['raising-child', 'occupied-city-regime'] };
});

scenario('luck-craft', 'Craft × borrowed luck', (world) => {
  const subject = addPerson(world, 'Josef Glück', 1884, { sex: 'male', roles: ['apprentice'] });
  addPerson(world, 'Meister Weiss', 1864, { sex: 'male', roles: ['master', 'teacher'] });
  addPerson(world, 'Rat Kral', 1872, { sex: 'male', roles: ['official'] });
  seedState(world, 'oj18-odd-apprenticeship', 'person', subject, {
    trust: 40,
    strangeKnowledge: 20,
    reliability: 55,
    nightsWorked: 2,
    post: '夜班学徒',
  });
  seedState(world, 'df18-borrowed-luck', 'person', subject, {
    debt: 45,
    luck: 65,
    obligation: 40,
    price: 'service',
  });
  return { subjectId: subject, seeded: ['oj18-odd-apprenticeship', 'df18-borrowed-luck'] };
});

scenario('elder-history', 'Old age × historical testimony', (world) => {
  const subject = addPerson(world, 'Theresia Zeugin', 1842, { sex: 'female', roles: ['grandmother'] });
  addPerson(world, 'Kind Zeugin', 1872, { sex: 'female', roles: ['daughter'], parentId: subject });
  addPerson(world, 'Beamter Winter', 1875, { sex: 'male', roles: ['official'] });
  seedState(world, 'em18-family-archive', 'household', world.persons[subject]!.householdId, {
    order: 40,
    secrets: 45,
    quarrel: 30,
    access: 50,
  });
  seedState(world, 'hs18-street-witness', 'person', subject, {
    certainty: 55,
    danger: 35,
    memory: 60,
    spoken: 20,
  });
  seedState(world, 'political-suspect', 'person', subject, {
    suspicion: 45,
    surveillance: 40,
    evidence: 25,
  });
  return {
    subjectId: subject,
    seeded: ['em18-family-archive', 'hs18-street-witness', 'political-suspect'],
  };
});

const payload = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  note: 'Controlled mechanism checks only. Natural occurrence is measured separately.',
  packs: PREFIXES,
  results,
  allPassed: results.every((result) => result.checks.every((check) => check.pass)),
};
mkdirSync('docs/v4', { recursive: true });
writeFileSync('docs/v4/phase-19-experiments.json', `${JSON.stringify(payload, null, 2)}\n`);
console.log(JSON.stringify({ allPassed: payload.allPassed, results: results.map((result) => ({ id: result.id, packEvents: result.packEvents, newStateAdds: result.newStateAdds, checks: result.checks.map((check) => `${check.name}:${check.pass}`) })) }, null, 2));
