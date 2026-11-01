import { describe, expect, it } from 'vitest';
import type { HistoricalEvent, Person, World } from '../packages/contracts/index.js';
import { advanceCrises, submitCrisisOffer, type CrisisState } from '../packages/crises/index.js';
import type { Emit } from '../packages/simulation-core/index.js';
import { initializeGeopolitics } from '../packages/geopolitics/index.js';
import { initializeIndustry } from '../packages/industry/index.js';
import { createEarthWorld } from '../packages/world-packs/earth/index.js';
import { advanceEarthEvents } from '../packages/world-packs/earth/events.js';
import { history } from '../packages/world-packs/earth/history.js';

const person = (id: string, ownerId?: string, locationId = 'a-city'): Person => ({
  id,
  ownerId,
  version: 0,
  name: 'Observer',
  birth: -500,
  locationId,
  originCohortId: 'a',
  parents: [],
  householdId: 'observer-home',
  occupation: '织工',
  coin: 2,
  health: 1,
  stress: 0.1,
  values: { care: 0.5, ambition: 0.5, tradition: 0.5 },
  skills: { craft: 0.2, learning: 0.2 },
  goals: [],
  memories: [],
  beliefs: [],
  relationships: [],
  plans: [],
  commitments: [],
  appearance: { skin: 0, hair: 0, clothes: 0 },
});

function crisisWorld(policy: 'cooperative' | 'hardline' = 'hardline', ownerId?: string): World {
  const cooperative = policy === 'cooperative';
  const aPop = 100_000,
    bPop = 120_000;
  const makePolity = (id: string, population: number) => ({
    id,
    name: id.toUpperCase(),
    color: '#777',
    treasury: 1000,
    legitimacy: cooperative ? 0.95 : 0.2,
    tax: 0.06,
    leaderId: `${id}-leader`,
    military: cooperative ? 20 : 90,
    research: 0,
    realWorld: { iso3: id, population, populationYear: 1900, gdpMillions: 10 },
  });
  const settlements = [
    {
      id: 'a-city',
      name: 'A City',
      x: 0,
      y: 0,
      biome: 'plains' as const,
      neighbors: ['b-city'],
      polityId: 'a',
      cohort: { id: 'a-pop', children: 10_000, adults: 80_000, elders: 10_000 },
      food: 100,
      coin: 0,
      fertility: 0,
      knowledge: 0,
      prosperity: 0,
      scarcity: 0.1,
      price: 1,
      unrest: 0.1,
      birthRemainder: 0,
      deathRemainder: 0,
    },
    {
      id: 'b-city',
      name: 'B City',
      x: 1,
      y: 0,
      biome: 'plains' as const,
      neighbors: ['a-city'],
      polityId: 'b',
      cohort: { id: 'b-pop', children: 12_000, adults: 96_000, elders: 12_000 },
      food: 100,
      coin: 0,
      fertility: 0,
      knowledge: 0,
      prosperity: 0,
      scarcity: 0.1,
      price: 1,
      unrest: 0.1,
      birthRemainder: 0,
      deathRemainder: 0,
    },
  ];
  const makeGovernment = (id: string) => ({
    polityId: id,
    regime: cooperative ? ('parliamentary' as const) : ('authoritarian' as const),
    parties: [
      {
        id: `${id}-nationalist`,
        ideology: 'nationalist' as const,
        support: cooperative ? 0.1 : 0.8,
        seats: 10,
      },
    ],
    groups: [
      {
        id: `${id}-military`,
        kind: 'military' as const,
        influence: cooperative ? 0.1 : 0.7,
        satisfaction: cooperative ? 0.8 : 0.05,
      },
      { id: `${id}-workers`, kind: 'workers' as const, influence: 0.2, satisfaction: 0.4 },
      { id: `${id}-merchants`, kind: 'merchants' as const, influence: 0.2, satisfaction: 0.5 },
      { id: `${id}-landowners`, kind: 'landowners' as const, influence: 0.2, satisfaction: 0.5 },
      { id: `${id}-clergy`, kind: 'clergy' as const, influence: 0.2, satisfaction: 0.5 },
    ],
    laws: {
      suffrage: cooperative ? 0.8 : 0.08,
      labor: cooperative ? 0.7 : 0.05,
      religiousFreedom: cooperative ? 0.8 : 0.2,
      pressFreedom: cooperative ? 0.9 : 0.02,
    },
    causeIds: [`${id}-government`],
  });
  const stocks = () => ({ coal: 1, ore: 1, steel: 1, oil: 20, arms: 20, medicine: 1 });
  return {
    schema: 'slw/1',
    id: 'crisis-world',
    seed: 'crisis-seed',
    epoch: 0,
    month: 1,
    revision: 0,
    pack: { id: 'earth-crisis-test', version: '1' },
    status: 'running',
    parameters: { researchRate: 1, openHistory: true },
    baselinePopulation: aPop + bPop,
    collapseMonths: 0,
    maxYears: 100,
    settlements,
    polities: [makePolity('a', aPop), makePolity('b', bPop)],
    persons: [
      person('observer', ownerId),
      person('a-leader', undefined, 'a-city'),
      person('b-leader', undefined, 'b-city'),
    ],
    organizations: [],
    conflicts: [],
    claims: [],
    eventSeq: 0,
    appliedCommands: [],
    processedJobs: [],
    audit: { producedFood: 0, consumedFood: 0, destroyedFood: 0, births: 0, deaths: 0 },
    terminalEvidence: [],
    shocks: [
      {
        id: 'source-wwi',
        historicalKind: 'war',
        kind: 'crisis',
        title: 'historical source',
        causeId: 'source-event',
        sourceUrl: 'https://example.test/source',
        locationIds: ['a-city', 'b-city'],
        started: 1,
        ends: 100,
        severity: 0.85,
      },
    ],
    geopolitics: {
      version: 1,
      governments: { a: makeGovernment('a'), b: makeGovernment('b') },
      relations: {
        'a~b': {
          id: 'diplomacy:a~b',
          a: 'a',
          b: 'b',
          affinity: -0.2,
          dispute: 0.527,
          trade: cooperative ? 0.85 : 0.1,
          status: 'peace',
          treatySince: 0,
          causeIds: ['border-event'],
          disputeEvidenceId: 'border-event',
        },
      },
      wars: [],
      atrocities: [],
      lastEventIds: [],
      pendingCasualties: [],
      lastAdvancedMonth: 0,
      lastEffectsMonth: 0,
      routeBaseCapacity: {},
      routeBaseStatus: {},
      lastAtrocityStarted: {},
    },
    industry: {
      version: 1,
      month: 1,
      polities: {
        a: {
          goods: stocks(),
          capacity: stocks(),
          prices: stocks(),
          technology: 0.1,
          investment: 0,
          laborShare: 0.1,
          lastShortages: [],
        },
        b: {
          goods: stocks(),
          capacity: stocks(),
          prices: stocks(),
          technology: 0.1,
          investment: 0,
          laborShare: 0.1,
          lastShortages: [],
        },
      },
      ledger: {
        initial: { coal: 2, ore: 2, steel: 2, oil: 40, arms: 40, medicine: 2 },
        produced: { coal: 0, ore: 0, steel: 0, oil: 0, arms: 0, medicine: 0 },
        consumed: { coal: 0, ore: 0, steel: 0, oil: 0, arms: 0, medicine: 0 },
        destroyed: { coal: 0, ore: 0, steel: 0, oil: 0, arms: 0, medicine: 0 },
      },
      lastEventIds: [],
    },
  };
}

const emitter =
  (w: World, events: HistoricalEvent[]): Emit =>
  (kind, personIds, locationId, text, data = {}, causeIds = [], significance = 0.5) => {
    const event: HistoricalEvent = {
      id: `crisis-event-${++w.eventSeq}`,
      worldId: w.id,
      month: w.month,
      kind,
      personIds,
      locationId,
      text,
      data,
      causeIds,
      significance,
    };
    events.push(event);
    return event;
  };
const totalMoney = (w: World) =>
  w.polities.reduce((sum, polity) => sum + polity.treasury, 0) +
  w.settlements.reduce((sum, settlement) => sum + settlement.coin, 0) +
  w.persons.reduce((sum, person) => sum + person.coin, 0) +
  w.organizations.reduce((sum, organization) => sum + organization.treasury, 0);

function step(w: World, events: HistoricalEvent[]) {
  advanceCrises(w, emitter(w, events), events);
}

function authorizeNegotiation(w: World, events: HistoricalEvent[], crisis: any, polityId: string) {
  const actorId = w.polities.find((polity) => polity.id === polityId)!.leaderId!;
  const targetId = polityId === crisis.a ? crisis.b : crisis.a;
  const agendaId = `agenda-${actorId}-${w.month}`;
  w.agency = {
    version: 1,
    agendas: {
      [actorId]: {
        id: agendaId,
        actorId,
        intention: 'negotiate the border dispute',
        rationale: 'respond to recorded crisis evidence',
        steps: [{ action: 'negotiate', targetId, label: 'negotiate' }],
        cursor: 1,
        progress: 1,
        status: 'active',
        adopted: w.month,
        lastApplied: w.month,
        causeIds: [],
      },
    },
    projects: {},
    needsReplan: {},
  } as unknown as World['agency'];
  const event = emitter(w, events)(
    'agenda_step_completed',
    [actorId],
    w.persons.find((person) => person.id === actorId)!.locationId,
    'Leader completed a negotiation action.',
    {
      agendaId,
      action: 'negotiate',
      classification: 'executed-agent-action',
    },
    ['source-event'],
    0.65,
  );
  return { actorId, actionEventId: event.id };
}

describe('historical diplomatic crisis process', () => {
  it('lets diplomacy and domestic policy settle the same source that hardline policy escalates', () => {
    const cooperative = crisisWorld('cooperative'),
      hardline = crisisWorld('hardline'),
      cooperativeEvents: HistoricalEvent[] = [],
      hardlineEvents: HistoricalEvent[] = [];
    step(cooperative, cooperativeEvents);
    step(hardline, hardlineEvents);
    for (let month = 2; month <= 8; month++) {
      cooperative.month = month;
      step(cooperative, cooperativeEvents);
    }
    for (let month = 2; month <= 4; month++) {
      hardline.month = month;
      step(hardline, hardlineEvents);
    }
    const softRelation = cooperative.geopolitics!.relations['a~b'],
      hardRelation = hardline.geopolitics!.relations['a~b'];
    expect(
      (cooperative as World & { crises?: CrisisState }).crises!.closedCatalog.at(-1)?.status,
    ).toBe('resolved');
    expect(softRelation.dispute).toBeLessThan(0.42);
    expect(hardRelation.dispute).toBeGreaterThanOrEqual(0.55);
    expect(hardlineEvents.some((event) => event.kind === 'crisis_military_posture')).toBe(true);
    expect(hardline.industry!.ledger.consumed.arms).toBeGreaterThan(0);
    expect(hardline.industry!.ledger.consumed.oil).toBeGreaterThan(0);
    const escalated = hardlineEvents.find((event) => event.kind === 'crisis_dispute_escalated');
    expect(hardRelation.causeIds).toContain(escalated?.id);
    expect(totalMoney(hardline)).toBeCloseTo(totalMoney(crisisWorld('hardline')));
    expect(hardline.settlements.some((settlement) => settlement.coin > 0)).toBe(true);
  });

  it('does not fund a military posture without fiscal resources', () => {
    const w = crisisWorld('hardline'),
      events: HistoricalEvent[] = [];
    w.polities.forEach((polity) => (polity.treasury = 0));
    step(w, events);
    expect(events.some((event) => event.kind === 'crisis_military_posture')).toBe(false);
    expect(w.industry!.ledger.consumed.arms).toBe(0);
    expect(w.industry!.ledger.consumed.oil).toBe(0);
    expect(w.geopolitics!.relations['a~b'].dispute).toBe(0.527);
  });

  it('lets a typed negotiation offer override a hardline posture before the war threshold', () => {
    const w = crisisWorld('hardline'),
      events: HistoricalEvent[] = [];
    step(w, events);
    const state = (w as World & { crises?: CrisisState }).crises!,
      crisis = Object.values(state.cases)[0],
      beforeOffer = w.geopolitics!.relations['a~b'].dispute;
    expect(beforeOffer).toBeLessThan(0.55);
    w.month++;
    for (const polityId of [crisis.a, crisis.b]) {
      const auth = authorizeNegotiation(w, events, crisis, polityId);
      submitCrisisOffer(
        w,
        {
          crisisId: crisis.id,
          polityId,
          ...auth,
          action: 'negotiate',
          source: 'llm',
          evidenceVersion: crisis.evidenceVersion,
          causeIds: [crisis.borderEvidenceIds[0], auth.actionEventId],
        },
        emitter(w, events),
        events,
      );
    }
    step(w, events);
    expect(w.geopolitics!.relations['a~b'].dispute).toBeLessThan(beforeOffer);
    expect(w.geopolitics!.relations['a~b'].dispute).toBeLessThan(0.55);
    expect(events.filter((event) => event.kind === 'diplomatic_crisis_offer')).toHaveLength(2);
  });

  it('rejects offers without an authorized leader action or current evidence version', () => {
    const w = crisisWorld('hardline'),
      events: HistoricalEvent[] = [];
    step(w, events);
    const crisis = Object.values((w as World & { crises?: CrisisState }).crises!.cases)[0];
    w.month++;
    const auth = authorizeNegotiation(w, events, crisis, crisis.a),
      base = {
        crisisId: crisis.id,
        polityId: crisis.a,
        ...auth,
        action: 'negotiate' as const,
        source: 'llm' as const,
        evidenceVersion: crisis.evidenceVersion,
        causeIds: [crisis.borderEvidenceIds[0], auth.actionEventId],
      };
    expect(() =>
      submitCrisisOffer(w, { ...base, source: 'player' as never }, emitter(w, events), events),
    ).toThrow();
    expect(() =>
      submitCrisisOffer(w, { ...base, actorId: 'observer' }, emitter(w, events), events),
    ).toThrow();
    expect(() =>
      submitCrisisOffer(
        w,
        { ...base, evidenceVersion: crisis.evidenceVersion + 1 },
        emitter(w, events),
        events,
      ),
    ).toThrow();
    expect(() =>
      submitCrisisOffer(
        w,
        { ...base, causeIds: [...base.causeIds, 'uncommitted-evidence'] },
        emitter(w, events),
        events,
      ),
    ).toThrow();
    submitCrisisOffer(w, { ...base, source: 'institution' }, emitter(w, events), events);
    expect(() =>
      submitCrisisOffer(w, { ...base, source: 'llm' }, emitter(w, events), events),
    ).toThrow();
  });

  it('executes a paid concession as a separate path from military escalation', () => {
    const w = crisisWorld('hardline'),
      events: HistoricalEvent[] = [];
    step(w, events);
    const crisis = Object.values((w as World & { crises?: CrisisState }).crises!.cases)[0],
      disputeBefore = w.geopolitics!.relations['a~b'].dispute;
    for (const polity of w.polities) {
      polity.legitimacy = 0.8;
      polity.military = 40;
      polity.treasury = 1000;
    }
    for (const gov of Object.values(w.geopolitics!.governments)) {
      gov.regime = 'oligarchy';
      gov.laws = { suffrage: 0.5, labor: 0.5, religiousFreedom: 0.5, pressFreedom: 0.5 };
      gov.parties = [
        { id: `${gov.polityId}-nationalist`, ideology: 'nationalist', support: 0.2, seats: 4 },
        { id: `${gov.polityId}-liberal`, ideology: 'liberal', support: 0.2, seats: 4 },
      ];
      const military = gov.groups.find((group) => group.kind === 'military')!;
      military.influence = 0.3;
      military.satisfaction = 0.67;
    }
    w.geopolitics!.relations['a~b'].trade = 0.45;
    w.month++;
    step(w, events);
    const concession = events.find((event) => event.kind === 'crisis_concession');
    expect(concession?.data.coinPaid).toBeGreaterThan(0);
    expect(w.geopolitics!.relations['a~b'].dispute).toBeLessThan(disputeBefore);
    expect(w.geopolitics!.relations['a~b'].causeIds).toContain(concession?.id);
  });

  it('is idempotent within a month, expires by deadline, and treats owner metadata like NPC metadata', () => {
    const w = crisisWorld('hardline', 'owner-1'),
      events: HistoricalEvent[] = [];
    step(w, events);
    const afterFirst = {
      dispute: w.geopolitics!.relations['a~b'].dispute,
      money: totalMoney(w),
      arms: w.industry!.ledger.consumed.arms,
      actions: Object.values((w as World & { crises?: CrisisState }).crises!.cases)[0].actions
        .length,
    };
    step(w, events);
    expect({
      dispute: w.geopolitics!.relations['a~b'].dispute,
      money: totalMoney(w),
      arms: w.industry!.ledger.consumed.arms,
      actions: Object.values((w as World & { crises?: CrisisState }).crises!.cases)[0].actions
        .length,
    }).toEqual(afterFirst);
    w.month = 19;
    step(w, events);
    const crisisState = (w as World & { crises?: CrisisState }).crises!;
    expect(Object.keys(crisisState.cases)).toHaveLength(0);
    expect(crisisState.closedCatalog.at(-1)?.status).toBe('expired');
    expect(crisisState.handledSources['diplomacy:a~b']).toContain('source-wwi');

    const npc = crisisWorld('hardline'),
      npcEvents: HistoricalEvent[] = [];
    step(npc, npcEvents);
    expect(npc.geopolitics!.relations['a~b'].dispute).toBe(afterFirst.dispute);
    expect(npc.industry!.ledger.consumed.arms).toBe(afterFirst.arms);
  });

  it('requires both active historical crisis coverage and existing dispute evidence', () => {
    const w = crisisWorld('hardline'),
      events: HistoricalEvent[] = [];
    w.geopolitics!.relations['a~b'].disputeEvidenceId = undefined;
    step(w, events);
    expect(Object.keys((w as World & { crises?: CrisisState }).crises!.cases)).toHaveLength(0);
    w.geopolitics!.relations['a~b'].disputeEvidenceId = 'border-event';
    w.shocks![0].kind = 'reform';
    w.month++;
    step(w, events);
    expect(Object.keys((w as World & { crises?: CrisisState }).crises!.cases)).toHaveLength(0);
  });

  it('runs the actual 1914 source through default Earth synthetic politics and reacts to coalition changes', () => {
    const w = createEarthWorld('default-earth-crisis-diagnostic', 1, 300, 1900),
      keepCountries = new Set(['FRA', 'DEU']),
      oldPlaceById = new Map(w.settlements.map((settlement) => [settlement.id, settlement]));
    w.polities = w.polities.filter((polity) => keepCountries.has(polity.id));
    w.settlements = w.settlements.filter((settlement) => keepCountries.has(settlement.polityId));
    const placeIds = new Set(w.settlements.map((settlement) => settlement.id));
    for (const settlement of w.settlements)
      settlement.neighbors = settlement.neighbors.filter((neighbor) => placeIds.has(neighbor));
    w.routes = (w.routes ?? []).filter(
      (route) => placeIds.has(route.from) && placeIds.has(route.to),
    );
    w.persons = w.persons.filter((person) =>
      keepCountries.has(oldPlaceById.get(person.locationId)?.polityId ?? ''),
    );
    w.month = 174;
    const events: HistoricalEvent[] = [],
      emit = emitter(w, events);
    initializeGeopolitics(w, emit);
    initializeIndustry(w);
    w.appliedSourceEvents = history.filter((input) => input.id !== 'wwi').map((input) => input.id);
    advanceEarthEvents(w, emit);
    const wwi = w.shocks!.find((shock) => shock.id === 'wwi');
    expect(wwi?.kind).toBe('crisis');
    expect(w.geopolitics!.relations['DEU~FRA']?.disputeEvidenceId).toBe(wwi?.causeId);

    const cooperative = structuredClone(w),
      cooperativeEvents: HistoricalEvent[] = [];
    for (const polity of cooperative.polities) {
      polity.legitimacy = 0.92;
      polity.military = 30;
    }
    for (const government of Object.values(cooperative.geopolitics!.governments)) {
      government.regime = 'parliamentary';
      government.laws = { suffrage: 0.8, labor: 0.8, religiousFreedom: 0.85, pressFreedom: 0.9 };
      government.parties = [
        { id: `${government.polityId}:liberal`, ideology: 'liberal', support: 0.7, seats: 70 },
        {
          id: `${government.polityId}:nationalist`,
          ideology: 'nationalist',
          support: 0.1,
          seats: 10,
        },
      ];
      const military = government.groups.find((group) => group.kind === 'military')!;
      military.influence = 0.1;
      military.satisfaction = 0.95;
    }
    const relation = cooperative.geopolitics!.relations['DEU~FRA'];
    relation.trade = 0.8;
    relation.status = 'alliance';
    advanceCrises(w, emit, events);
    advanceCrises(cooperative, emitter(cooperative, cooperativeEvents), cooperativeEvents);
    for (let month = 175; month <= 184; month++) {
      w.month = month;
      cooperative.month = month;
      advanceCrises(w, emit, events);
      advanceCrises(cooperative, emitter(cooperative, cooperativeEvents), cooperativeEvents);
    }
    const hardlineKinds = events.map((event) => event.kind),
      cooperativeKinds = cooperativeEvents.map((event) => event.kind);
    expect(hardlineKinds).toContain('diplomatic_crisis_opened');
    expect(
      hardlineKinds.some((kind) =>
        ['crisis_military_posture', 'crisis_posture_blocked', 'crisis_dispute_escalated'].includes(
          kind,
        ),
      ),
    ).toBe(true);
    expect(cooperativeKinds).toContain('diplomatic_crisis_opened');
    expect(cooperativeKinds).toContain('crisis_negotiation_round');
    expect(cooperative.geopolitics!.relations['DEU~FRA'].dispute).toBeLessThan(
      w.geopolitics!.relations['DEU~FRA'].dispute,
    );
  }, 30_000);
});
