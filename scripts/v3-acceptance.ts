import { writeFileSync, mkdirSync } from 'node:fs';
import { createEarthWorld } from '../packages/world-packs/earth/index.js';
import { advance } from '../packages/simulation-core/index.js';
import { spawnAdult } from './helpers/spawn.js';
import {
  population,
  type BirthRequest,
  type HistoricalEvent,
  type World,
} from '../packages/contracts/index.js';
import {
  compileDirectorProposal,
  compileRule,
  definitionKey,
  ensureRuntime,
  fallbackDirectorProposal,
  fallbackEventDefinition,
  observeDirector,
  observeWorld,
  grantAbility,
  installDefinition,
  performAbility,
  type RuleEmit,
} from '../packages/rules/index.js';

const seed = process.argv[2] ?? 'v3-acceptance-1';
const outFile = process.argv[3] ?? `.data/${seed}.json`;
let world = createEarthWorld(seed, 1, 300, 1900);
const events: HistoricalEvent[] = [];
let customSeq = 0;
const emit: RuleEmit = (
  kind,
  people,
  locationId,
  text,
  data = {},
  causes = [],
  significance = 0.5,
) => {
  const event: HistoricalEvent = {
    id: `${world.id}:accept-${++customSeq}`,
    worldId: world.id,
    month: world.month,
    kind,
    personIds: [...new Set(people)],
    locationId,
    text,
    data,
    causeIds: [...new Set(causes)],
    significance,
  };
  events.push(event);
  return event;
};
function month() {
  const transition = advance(world);
  world = transition.world;
  events.push(...transition.events);
}
function findCity(name: string) {
  return (
    world.settlements.find((site) => site.name === name) ??
    world.settlements.find((site) => site.name.includes(name)) ??
    world.settlements[0]
  );
}
function birthRequest(wish: string, name: string, siteId?: string): BirthRequest {
  return {
    name,
    sex: 'female',
    health: 0.9,
    wish,
    preferredLocationId: siteId,
    appearance: { skin: 2, hair: 1, clothes: 3 },
  };
}
function submitBirth(userId: string, request: BirthRequest, commandId: string) {
  const transition = advance(world, [{ id: commandId, kind: 'birth', userId, request }], false);
  events.push(...transition.events);
  world = transition.world;
  const result = transition.results[0];
  if (!result.ok) throw new Error(`birth intake failed: ${result.error}`);
  return (result.value as { birthId: string }).birthId;
}
function compileBirth(birthId: string, commandId: string) {
  const transition = advance(
    world,
    [{ id: commandId, kind: 'birth_compile', birthId, proposal: undefined, source: 'fallback' }],
    false,
  );
  events.push(...transition.events);
  world = transition.world;
  const result = transition.results[0];
  if (!result.ok) throw new Error(`birth compile failed: ${result.error}`);
  return result.value as {
    personId: string;
    source: string;
    fallback: boolean;
    ability?: string;
  };
}

const startPopulation = population(world);
const firstSite = findCity('上海');
const firstRequest = birthRequest('希望她幸福，也希望能听见别人的情绪。', '林雾', firstSite.id);
const firstBirthId = submitBirth('acceptance-a', firstRequest, 'acceptance-birth-a');
const firstChild = compileBirth(firstBirthId, 'acceptance-compile-a');
const firstPerson = world.persons.find((person) => person.id === firstChild.personId)!;
const firstProgram = ensureRuntime(world).lifePrograms[firstPerson.id];

// Advance to the first yearly historical-person activation window and let the
// normal world systems run. This is a real simulation, not a fabricated cast.
while (world.month < 12) month();
const historical = world.persons.find(
  (person) => person.death === undefined && !!person.historicalIdentity,
);
const secondSite = historical
  ? (world.settlements.find((site) => site.id === historical.locationId) ?? findCity('北京'))
  : findCity('北京');
const secondRequest = birthRequest('希望她平安长大，并在需要时帮助别人。', '沈禾', secondSite.id);
const secondBirthId = submitBirth('acceptance-b', secondRequest, 'acceptance-birth-b');
const secondChild = compileBirth(secondBirthId, 'acceptance-compile-b');
const secondPerson = world.persons.find((person) => person.id === secondChild.personId)!;

// A real adult at the historical person's site makes contact possible without
// teleporting the newborn or pretending they already know each other.
let historicalOpportunity: Record<string, unknown> | undefined;
if (historical) {
  const adultPerson = spawnAdult(world, {
    id: 'person-acceptance-adult',
    name: '顾行',
    age: 30,
    locationId: historical.locationId,
    ownerId: 'acceptance-adult',
    occupation: '教师',
  });
  adultPerson.values.care = 1;
  adultPerson.values.ambition = 1;
  const observedRequest = observeDirector(world, events).find(
    (item) => item.pressure === 'historical-contact',
  );
  const request = observedRequest ??
    ensureRuntime(world).authorRequests.find(
      (item) =>
        item.kind === 'history_director' &&
        item.status === 'open' &&
        item.pressure === 'historical-contact',
    ) ?? {
      id: 'acceptance-history-contact',
      siteId: historical.locationId,
      reason: '真实历史人物与真实成年居民在同一城市；测试导演创设一次受位置/时间约束的接触机会。',
      month: world.month,
      kind: 'history_director' as const,
      causeIds: [],
      status: 'open' as const,
      jobId: 'acceptance-history-contact-job',
      pressure: 'historical-contact',
    };
  if (request) {
    const proposal = fallbackDirectorProposal(world, request);
    const transition = advance(
      world,
      [
        {
          id: 'acceptance-director-history',
          kind: 'director_action',
          proposal,
          jobId: request.jobId,
        },
      ],
      false,
    );
    events.push(...transition.events);
    world = transition.world;
    const opportunity = Object.values(ensureRuntime(world).opportunities).find((item) =>
      item.definitionKey.includes('director'),
    );
    let contact: Record<string, unknown> | undefined;
    for (let i = 0; i < 6 && historical; i++) {
      month();
      const current = opportunity ? ensureRuntime(world).opportunities[opportunity.id] : undefined;
      if (!current || current.status === 'open') continue;
      let relationship:
        { personId: string; trust: number; attachment: number; kind: string } | undefined;
      if (current.status === 'taken') {
        for (let step = 0; step < 3; step++) {
          month();
          const actor = world.persons.find((item) => item.id === current.personId);
          relationship = actor?.relationships.find((rel) => rel.personId === historical.id);
          if (relationship) break;
        }
      }
      const person = world.persons.find((item) => item.id === current.personId);
      const historicalPerson = world.persons.find((item) => item.id === historical.id);
      const response = events.find(
        (event) =>
          (event.kind === 'opportunity_declined' || event.kind === 'opportunity_failed') &&
          (event.data as any).opportunityId === current.id,
      );
      contact = {
        opportunityStatus: current.status,
        personId: current.personId,
        historicalPersonId: historical.id,
        relationship,
        historicalAlive: historicalPerson?.death === undefined,
        historicalLocation: historicalPerson?.locationId,
        personLocation: person?.locationId,
        responseKind: response?.kind,
        responseReason: response?.data?.reason,
      };
      break;
    }
    historicalOpportunity = {
      request,
      result: transition.results[0],
      opportunity: opportunity ? ensureRuntime(world).opportunities[opportunity.id] : undefined,
      contact,
    };
  }
}

// A pressured real site: the observer proposes a new event family; the
// deterministic author publishes it through the same compiler when no model is
// configured. The script does not inject a hard-coded occurrence.
const pressureSite = world.settlements.find((site) => site.id === firstPerson.locationId)!;
pressureSite.scarcity = 0.9;
pressureSite.food = 0;
pressureSite.fertility = 0;
// The birth site may have lost its only named adult to the simulated first
// year. Add a real local adult so the observer's event can actually select a
// role instead of publishing an uncast template.
spawnAdult(world, {
  id: 'person-acceptance-neighbor',
  name: '周邻',
  age: 34,
  locationId: pressureSite.id,
  ownerId: 'acceptance-neighbor',
});
const authorRequests = observeWorld(world, events);
const authorRequest =
  authorRequests.find((request) => request.siteId === pressureSite.id) ?? authorRequests[0];
let dynamicEvent: Record<string, unknown> | undefined;
if (authorRequest) {
  const definition = fallbackEventDefinition(world, authorRequest);
  const published = advance(
    world,
    [
      {
        id: 'acceptance-author-publish',
        kind: 'rule_proposal',
        proposal: { ...definition, chance: 1 },
        source: 'builtin',
        jobId: authorRequest.jobId,
      },
    ],
    false,
  );
  events.push(...published.events);
  world = published.world;
  for (let i = 0; i < 3; i++) month();
  const eventSite = world.settlements.find((site) => site.id === authorRequest.siteId)!;
  dynamicEvent = {
    request: authorRequest,
    definitionId: (published.results[0].value as any)?.definitionId,
    definitionKey: (published.results[0].value as any)?.definitionKey,
    occurrences: events.filter((event) => event.kind === 'rule_occurrence'),
    siteScarcity: eventSite.scarcity,
  };
}

// A director intervention through the authoritative command path. Its scope is
// the same real site the observer selected; the event may fail if conditions
// have already changed, which is an acceptable, recorded outcome.
const eventSite = authorRequest
  ? world.settlements.find((site) => site.id === authorRequest.siteId)!
  : pressureSite;
const directorProposal = {
  version: 1,
  jobId: 'acceptance-director-pressure',
  action: 'seed_pressure',
  scope: { kind: 'site', ids: [eventSite.id] },
  rationale: '在既有短缺上增加可解释的地方动荡，观察其是否进入真实生活。',
  effects: [{ type: 'unrest', site: 'site', amount: 0.08 }],
  budget: 1,
  chainDepth: 0,
};
const directorCompiled = compileDirectorProposal(directorProposal, world, 'acceptance-director');
const unrestBefore = eventSite.unrest;
const directorTransition = advance(
  world,
  [
    {
      id: 'acceptance-director-action',
      kind: 'director_action',
      proposal: directorCompiled.proposal,
      jobId: 'acceptance-director-pressure',
    },
  ],
  false,
);
events.push(...directorTransition.events);
world = directorTransition.world;
const unrestAfter = world.settlements.find((site) => site.id === eventSite.id)!.unrest;

// Use the birth-granted ability through the same cost/cooldown/exposure path.
let abilityEvidence: Record<string, unknown> | undefined;
const currentFirst = world.persons.find((person) => person.id === firstPerson.id);
const abilityState = ensureRuntime(world).abilities[firstPerson.id];
if (abilityState && currentFirst) {
  // Add a real second witness at the same site; otherwise the exposure system
  // correctly reports that nobody saw the ability.
  spawnAdult(world, {
    id: 'person-acceptance-witness',
    name: '见证者',
    age: 32,
    locationId: currentFirst.locationId,
    ownerId: 'acceptance-witness',
  });
  let use: ReturnType<typeof performAbility> | undefined;
  for (let attempt = 0; attempt < 10 && !use?.exposed; attempt++) {
    const actor = world.persons.find((person) => person.id === firstPerson.id)!;
    const target = world.persons.find(
      (person) =>
        person.death === undefined &&
        person.locationId === actor.locationId &&
        person.id !== actor.id,
    );
    if (!target) break;
    try {
      use = performAbility(
        world,
        actor,
        target,
        abilityState.mode,
        abilityState.potency,
        abilityState.cost,
        emit,
        abilityState.causeIds[0] ?? 'ability-birth',
      );
    } catch {
      break;
    }
    if (!use.exposed) {
      month();
      month();
    }
  }
  if (use) {
    month();
    abilityEvidence = {
      mode: abilityState.mode,
      cost: abilityState.cost,
      cooldown: abilityState.cooldown,
      maxUses: abilityState.maxUses,
      event: use.event,
      exposed: use.exposed,
      exposureId: use.exposureId,
      socialResponses: events.filter(
        (event) => event.kind === 'anomaly_witnessed' || event.kind === 'anomaly_investigation',
      ),
    };
  }
}

// A second, independently compiled anomaly at the same site demonstrates the
// social consequence path with a deterministic exposure risk. This is a
// scenario fixture, not a claim that every ability use is always witnessed.
let socialResponseEvidence: Record<string, unknown> | undefined;
const witnessPerson = world.persons.find((person) => person.ownerId === 'acceptance-witness');
if (witnessPerson && currentFirst) {
  const holder = world.persons.find((person) => person.id === witnessPerson.id)!;
  spawnAdult(world, {
    id: 'person-acceptance-second-witness',
    name: '第二见证者',
    age: 28,
    locationId: holder.locationId,
    ownerId: 'acceptance-second-witness',
  });
  spawnAdult(world, {
    id: 'person-acceptance-third-witness',
    name: '第三见证者',
    age: 40,
    locationId: holder.locationId,
    ownerId: 'acceptance-third-witness',
  });
  const currentHolder = world.persons.find((person) => person.id === holder.id)!;
  const target = world.persons.find(
    (person) =>
      person.death === undefined &&
      person.locationId === currentHolder.locationId &&
      person.id !== currentHolder.id,
  );
  const abilityRaw = {
    schemaVersion: 1 as const,
    id: 'acceptance.social.healing',
    version: 1,
    kind: 'ability' as const,
    title: '公开治愈能力',
    scope: { kind: 'person' as const, ids: [holder.id] },
    roles: [{ name: 'holder', personId: holder.id, willingness: 1, sameSite: true }],
    trigger: { kind: 'periodic' as const, interval: 12 },
    conditions: { op: 'all' as const, args: [] },
    effects: [{ type: 'health' as const, role: 'holder', amount: 0.002 }],
    chance: 1,
    cooldown: 3,
    maxOccurrences: 1,
    gas: 400,
    significance: 0.4,
    ability: {
      mode: 'healing' as const,
      potency: 0.2,
      rangeKm: 0,
      cost: 0,
      healthCost: 0.01,
      cooldown: 3,
      maxUses: 10,
      exposureRisk: 1,
      countermeasures: ['现场见证', '组织调查'],
    },
    provenance: {
      source: 'builtin' as const,
      jobId: 'acceptance-social-ability-job',
      model: 'acceptance',
      observedMonth: world.month,
      compiler: 'rules/1' as const,
    },
  };
  const compiledAbility = compileRule(abilityRaw, world, { source: 'builtin' });
  installDefinition(world, compiledAbility.definition, 'acceptance-social-ability');
  grantAbility(
    world,
    holder.id,
    definitionKey(compiledAbility.definition),
    firstProgram.causeIds[0] ?? 'acceptance-birth',
  );
  if (target) {
    const use = performAbility(
      world,
      currentHolder,
      target,
      'healing',
      0.2,
      0,
      emit,
      firstProgram.causeIds[0] ?? 'acceptance-birth',
    );
    month();
    socialResponseEvidence = {
      holderId: currentHolder.id,
      targetId: target.id,
      exposed: use.exposed,
      exposureId: use.exposureId,
      responses: events.filter(
        (event) => event.kind === 'anomaly_witnessed' || event.kind === 'anomaly_investigation',
      ),
      ability: ensureRuntime(world).abilities[holder.id],
    };
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  seed,
  pack: world.pack,
  calendar: world.calendar,
  startPopulation,
  finalPopulation: population(world),
  firstBirth: {
    request: firstRequest,
    birthId: firstBirthId,
    childId: firstPerson.id,
    siteId: firstPerson.locationId,
    parents: firstPerson.parents,
    program: firstProgram,
    ability: ensureRuntime(world).abilities[firstPerson.id],
    milestones: firstProgram.milestones,
  },
  secondBirth: {
    request: secondRequest,
    birthId: secondBirthId,
    childId: secondPerson.id,
    siteId: secondPerson.locationId,
    parents: secondPerson.parents,
    program: ensureRuntime(world).lifePrograms[secondPerson.id],
  },
  dynamicEvent,
  directorAction: {
    proposal: directorCompiled.proposal,
    events: events.filter((event) => event.kind === 'director_action'),
    unrestBefore,
    unrestAfter,
  },
  historicalOpportunity,
  abilityEvidence,
  socialResponseEvidence,
  eventSamples: events
    .filter((event) =>
      [
        'birth',
        'birth_registration',
        'rule_definition_activated',
        'rule_occurrence',
        'director_action',
        'ability_used',
        'ability_exposed',
        'anomaly_witnessed',
        'anomaly_investigation',
        'life_program_milestone',
      ].includes(event.kind),
    )
    .slice(0, 80),
  counts: {
    events: events.length,
    births: events.filter((event) => event.kind === 'birth').length,
    ruleOccurrences: events.filter((event) => event.kind === 'rule_occurrence').length,
    directorActions: events.filter((event) => event.kind === 'director_action').length,
    abilityEvents: events.filter((event) => event.kind.startsWith('ability_')).length,
    programs: Object.keys(ensureRuntime(world).lifePrograms).length,
    definitions: Object.keys(ensureRuntime(world).active).length,
  },
};
mkdirSync('.data', { recursive: true });
writeFileSync(outFile, JSON.stringify(report, null, 2));
console.log(
  JSON.stringify(
    {
      outFile,
      counts: report.counts,
      dynamicEvent: !!dynamicEvent,
      historicalOpportunity: !!historicalOpportunity,
      ability: !!abilityEvidence,
    },
    null,
    2,
  ),
);
