import { describe, expect, it } from 'vitest';
import type { Emit } from '../packages/simulation-core/index.js';
import { createWorld } from '../packages/world-packs/index.js';
import type { GeopoliticalState } from '../packages/geopolitics/index.js';
import { advancePolitics, type PoliticsState } from '../packages/politics/index.js';
import { random } from '../packages/simulation-core/random.js';
import { advanceGeopolitics } from '../packages/geopolitics/index.js';
import type { HistoricalEvent, World } from '../packages/contracts/index.js';
import type { SocietyState } from '../packages/society/index.js';
import { initializeLife } from '../packages/cognition/life.js';

function fixture(seed = 'politics') {
  const w = createWorld(seed, 31, 300);
  w.pack = { id: 'earth-fictional-politics', version: 'test' };
  w.calendar = { startYear: 1800, mode: 'historical-simulation', sources: [] };
  w.settlements = w.settlements.filter((s) =>
    ['town-0', 'town-1', 'town-6', 'town-7'].includes(s.id),
  );
  w.polities = w.polities.slice(0, 2);
  w.persons = w.persons.filter((p) => w.settlements.some((s) => s.id === p.locationId));
  const people = new Set(w.persons.map((p) => p.id));
  for (const person of w.persons) {
    person.relationships = person.relationships.filter((r) => people.has(r.personId));
    person.parents = person.parents.filter((id) => people.has(id));
    delete person.title;
  }
  w.organizations = [];
  for (const p of w.polities) {
    const leader = w.persons.find(
      (person) =>
        person.locationId &&
        w.settlements.find((s) => s.id === person.locationId)?.polityId === p.id &&
        w.month - person.birth >= 216,
    );
    p.leaderId = leader?.id ?? '';
  }
  const governments: GeopoliticalState['governments'] = {};
  for (const polity of w.polities)
    governments[polity.id] = {
      polityId: polity.id,
      regime: 'oligarchy',
      parties: [
        { id: `${polity.id}:liberal`, ideology: 'liberal', support: 0.24, seats: 24 },
        { id: `${polity.id}:conservative`, ideology: 'conservative', support: 0.2, seats: 20 },
        { id: `${polity.id}:socialist`, ideology: 'socialist', support: 0.3, seats: 30 },
        { id: `${polity.id}:nationalist`, ideology: 'nationalist', support: 0.16, seats: 16 },
        { id: `${polity.id}:religious`, ideology: 'religious', support: 0.1, seats: 10 },
      ],
      groups: [
        { id: `${polity.id}:military`, kind: 'military', influence: 0.18, satisfaction: 0.6 },
        { id: `${polity.id}:workers`, kind: 'workers', influence: 0.3, satisfaction: 0.5 },
        { id: `${polity.id}:landowners`, kind: 'landowners', influence: 0.2, satisfaction: 0.6 },
        { id: `${polity.id}:merchants`, kind: 'merchants', influence: 0.18, satisfaction: 0.6 },
        { id: `${polity.id}:clergy`, kind: 'clergy', influence: 0.2, satisfaction: 0.6 },
      ],
      laws: { suffrage: 0.1, labor: 0.1, religiousFreedom: 0.4, pressFreedom: 0.2 },
      causeIds: ['evidence:government'],
    };
  const relationKey = [w.polities[0].id, w.polities[1].id].sort().join('~');
  const geo: GeopoliticalState = {
    version: 1,
    governments,
    relations: {
      [relationKey]: {
        id: `diplomacy:${relationKey}`,
        a: w.polities[0].id,
        b: w.polities[1].id,
        affinity: 0.5,
        dispute: 0,
        trade: 0.4,
        status: 'peace',
        treatySince: 0,
        causeIds: ['evidence:government'],
      },
    },
    wars: [],
    atrocities: [],
    lastEventIds: ['evidence:government'],
    pendingCasualties: [],
    lastAdvancedMonth: -1,
    lastEffectsMonth: -1,
    routeBaseCapacity: {},
    routeBaseStatus: {},
    lastAtrocityStarted: {},
  };
  w.geopolitics = geo;
  const prior: HistoricalEvent[] = [
    {
      id: 'evidence:government',
      worldId: w.id,
      month: 0,
      kind: 'government_formed',
      personIds: [],
      causeIds: [],
      significance: 0.4,
      text: 'committed test evidence',
      data: {},
    },
  ];
  let sequence = 0;
  const emit: Emit = (
    kind,
    personIds,
    locationId,
    text,
    data = {},
    causeIds = [],
    significance = 0.5,
  ) => {
    const event: HistoricalEvent = {
      id: `politics-event:${++sequence}`,
      worldId: w.id,
      month: w.month,
      kind,
      personIds: [...personIds],
      locationId,
      text,
      data,
      causeIds: [...causeIds],
      significance,
    };
    prior.push(event);
    return event;
  };
  return { w, emit, events: prior, relationKey };
}

function assertCommittedCauses(events: HistoricalEvent[]) {
  const committed = new Set<string>();
  for (const event of events) {
    for (const cause of event.causeIds)
      expect(committed.has(cause), `${event.kind} missing cause ${cause}`).toBe(true);
    committed.add(event.id);
  }
}

function treasuryAndSettlementCoin(w: World) {
  return (
    w.polities.reduce((sum, p) => sum + p.treasury, 0) +
    w.settlements.reduce((sum, s) => sum + s.coin, 0)
  );
}

function currentPolitics(w: World) {
  return (w as World & { politics: PoliticsState }).politics;
}

describe('political power lifecycle', () => {
  it('resolves a leader death through a qualified local contest with conserved public funds', () => {
    const { w, emit, events } = fixture('succession');
    advancePolitics(w, emit);
    const polity = w.polities[0];
    const incumbent = w.persons.find((p) => p.id === polity.leaderId)!;
    const candidate = w.persons.find(
      (p) =>
        p.id !== incumbent.id &&
        w.settlements.find((s) => s.id === p.locationId)?.polityId === polity.id &&
        w.month - p.birth >= 216,
    )!;
    const deathEvidence: HistoricalEvent = {
      id: 'evidence:leader-death',
      worldId: w.id,
      month: 0,
      kind: 'death',
      personIds: [incumbent.id],
      causeIds: ['evidence:government'],
      significance: 1,
      text: 'leader died',
      data: {},
    };
    events.push(deathEvidence);
    incumbent.death = w.month;
    incumbent.memories.push({
      id: 'memory:leader-death',
      eventId: deathEvidence.id,
      month: w.month,
      salience: 1,
    });
    candidate.title = '市议会代表';
    currentPolitics(w).standing[candidate.id] = {
      personId: candidate.id,
      score: 0.8,
      service: 0.5,
      network: 0.3,
      causeIds: ['evidence:government'],
    };
    candidate.memories.push({
      id: 'memory:service',
      eventId: 'evidence:government',
      month: 0,
      salience: 0.8,
    });
    w.month = 1;
    const moneyBefore = treasuryAndSettlementCoin(w);
    const treasuryBefore = polity.treasury;
    const candidateSettlementBefore = w.settlements.find(
      (s) => s.id === candidate.locationId,
    )!.coin;

    advancePolitics(w, emit);

    expect(polity.leaderId).toBe(candidate.id);
    expect(candidate.title).toContain('国家议事代表');
    expect(polity.legitimacy).toBeGreaterThan(0.7);
    expect(polity.treasury).toBeLessThan(treasuryBefore);
    expect(w.settlements.find((s) => s.id === candidate.locationId)!.coin).toBeGreaterThan(
      candidateSettlementBefore,
    );
    expect(treasuryAndSettlementCoin(w)).toBeCloseTo(moneyBefore, 8);
    expect(events.some((e) => e.kind === 'succession_contest')).toBe(true);
    expect(
      events.some((e) => e.kind === 'political_succession' && e.personIds.includes(candidate.id)),
    ).toBe(true);
    expect(currentPolitics(w).polities[polity.id].successionCount).toBe(1);
    assertCommittedCauses(events);
  });

  it('makes an unresolved vacancy costly to legitimacy and diplomatic trust', () => {
    const { w, emit, events, relationKey } = fixture('vacuum');
    advancePolitics(w, emit);
    const polity = w.polities[0];
    const oldLeader = w.persons.find((p) => p.id === polity.leaderId)!;
    for (const person of w.persons) if (w.month - person.birth >= 216) person.death = 0;
    oldLeader.memories.push({
      id: 'memory:death',
      eventId: 'evidence:government',
      month: 0,
      salience: 1,
    });
    const legitimacy = polity.legitimacy;
    const affinity = w.geopolitics!.relations[relationKey].affinity;
    w.month = 12;

    advancePolitics(w, emit);

    expect(polity.leaderId).toBe('');
    expect(polity.legitimacy).toBeLessThan(legitimacy);
    expect(w.geopolitics!.relations[relationKey].affinity).toBeLessThan(affinity);
    expect(events.some((e) => e.kind === 'political_vacuum_cost')).toBe(true);
    expect(currentPolitics(w).polities[polity.id].vacancySince).toBe(12);
    assertCommittedCauses(events);
  });

  it('does not treat an in-transit person as a locally present succession candidate', () => {
    const { w, emit, events } = fixture('journey-candidate');
    advancePolitics(w, emit);
    const polity = w.polities[0];
    const leader = w.persons.find((p) => p.id === polity.leaderId)!;
    const traveler = w.persons.find(
      (p) =>
        p.id !== leader.id &&
        w.settlements.find((s) => s.id === p.locationId)?.polityId === polity.id &&
        w.month - p.birth >= 216,
    )!;
    for (const person of w.persons)
      if (person.id !== traveler.id && w.month - person.birth >= 216) person.death = 0;
    traveler.title = '地方代表';
    traveler.journey = {
      planId: 'trip',
      routeId: 'route',
      fromId: traveler.locationId,
      toId: 'town-away',
      departed: 1,
      distanceKm: 900,
      progressKm: 250,
      lastApplied: 1,
      blockedMonths: 0,
      causeIds: ['evidence:government'],
    };
    w.month = 2;

    advancePolitics(w, emit);

    expect(polity.leaderId).toBe('');
    expect(
      events.some((e) => e.kind === 'political_succession' && e.personIds.includes(traveler.id)),
    ).toBe(false);
    expect(currentPolitics(w).polities[polity.id].vacancySince).toBe(2);
    assertCommittedCauses(events);
  });

  it('keeps a traveling incumbent temporarily, then opens a vacancy after three absent months', () => {
    const { w, emit, events } = fixture('traveling-incumbent');
    advancePolitics(w, emit);
    const polity = w.polities[0];
    const leader = w.persons.find((p) => p.id === polity.leaderId)!;
    const successor = w.persons.find(
      (p) =>
        p.id !== leader.id &&
        w.settlements.find((s) => s.id === p.locationId)?.polityId === polity.id &&
        w.month - p.birth >= 216,
    )!;
    successor.title = '地方代表';
    currentPolitics(w).standing[successor.id] = {
      personId: successor.id,
      score: 0.9,
      service: 0.6,
      network: 0.3,
      causeIds: ['evidence:government'],
    };
    leader.journey = {
      planId: 'trip',
      routeId: 'route',
      fromId: leader.locationId,
      toId: 'town-abroad',
      departed: 1,
      distanceKm: 1200,
      progressKm: 100,
      lastApplied: 1,
      blockedMonths: 0,
      causeIds: ['evidence:government'],
    };
    for (const month of [1, 2]) {
      w.month = month;
      advancePolitics(w, emit);
      expect(polity.leaderId).toBe(leader.id);
      expect(currentPolitics(w).polities[polity.id].vacancySince).toBeUndefined();
    }
    w.month = 3;

    advancePolitics(w, emit);

    expect(polity.leaderId).toBe(successor.id);
    expect(
      events.some((e) => e.kind === 'political_power_vacuum' && e.data.absentMonths === 3),
    ).toBe(true);
    assertCommittedCauses(events);
  });

  it('applies diplomatic and legitimacy costs when a qualified successor cannot fund the contest', () => {
    const { w, emit, events, relationKey } = fixture('unfunded-succession');
    advancePolitics(w, emit);
    const polity = w.polities[0];
    const incumbent = w.persons.find((p) => p.id === polity.leaderId)!;
    const candidate = w.persons.find(
      (p) =>
        p.id !== incumbent.id &&
        w.settlements.find((s) => s.id === p.locationId)?.polityId === polity.id &&
        w.month - p.birth >= 216,
    )!;
    candidate.title = '地方代表';
    currentPolitics(w).standing[candidate.id] = {
      personId: candidate.id,
      score: 0.8,
      service: 0.4,
      network: 0.4,
      causeIds: ['evidence:government'],
    };
    incumbent.death = 0;
    incumbent.memories.push({
      id: 'memory:death',
      eventId: events.at(-1)!.id,
      month: 0,
      salience: 1,
    });
    polity.treasury = 0;
    const legitimacy = polity.legitimacy;
    const affinity = w.geopolitics!.relations[relationKey].affinity;
    w.month = 1;

    advancePolitics(w, emit);

    expect(polity.leaderId).toBe('');
    expect(polity.legitimacy).toBeLessThan(legitimacy);
    expect(w.geopolitics!.relations[relationKey].affinity).toBeLessThan(affinity);
    expect(events.some((e) => e.kind === 'political_succession_failed')).toBe(true);
    assertCommittedCauses(events);
  });

  it('requires sustained incapacitation before opening an incumbent vacancy', () => {
    const { w, emit, events } = fixture('incapacitation');
    advancePolitics(w, emit);
    const polity = w.polities[0];
    const leader = w.persons.find((p) => p.id === polity.leaderId)!;
    const successor = w.persons.find(
      (p) =>
        p.id !== leader.id &&
        w.settlements.find((s) => s.id === p.locationId)?.polityId === polity.id &&
        w.month - p.birth >= 216,
    )!;
    successor.title = '市议会代表';
    currentPolitics(w).standing[successor.id] = {
      personId: successor.id,
      score: 0.8,
      service: 0.5,
      network: 0.3,
      causeIds: ['evidence:government'],
    };
    leader.health = 0.05;
    w.month = 1;
    advancePolitics(w, emit);
    expect(polity.leaderId).toBe(leader.id);
    expect(events.some((e) => e.kind === 'political_power_vacuum')).toBe(false);

    w.month = 2;
    advancePolitics(w, emit);

    expect(polity.leaderId).toBe(successor.id);
    expect(events.some((e) => e.kind === 'political_power_vacuum')).toBe(true);
    expect(currentPolitics(w).polities[polity.id].incapacitatedMonths).toBe(0);
    assertCommittedCauses(events);
  });

  it('lets ordinary community networks accumulate enough standing to enter succession', () => {
    const { w, emit, events } = fixture('ordinary-standing');
    advancePolitics(w, emit);
    const polity = w.polities[0];
    const incumbent = w.persons.find((p) => p.id === polity.leaderId)!;
    const ordinary = w.persons.find(
      (p) =>
        p.id !== incumbent.id &&
        w.settlements.find((s) => s.id === p.locationId)?.polityId === polity.id &&
        w.month - p.birth >= 216,
    )!;
    const contacts = w.persons
      .filter(
        (p) =>
          p.id !== ordinary.id &&
          w.settlements.find((s) => s.id === p.locationId)?.polityId === polity.id,
      )
      .slice(0, 8);
    ordinary.occupation = '木匠';
    ordinary.title = undefined;
    ordinary.relationships = contacts.map((p) => ({
      personId: p.id,
      trust: 0.8,
      attachment: 0.6,
      kind: 'friend',
      since: 0,
      causeIds: ['evidence:government'],
    }));
    const state = currentPolitics(w);
    for (let month = 1; month <= 60; month++) {
      w.month = month;
      advancePolitics(w, emit);
    }
    expect(state.standing[ordinary.id].score).toBeGreaterThan(0.2);
    expect(ordinary.title).toBeUndefined();
    incumbent.death = 60;
    incumbent.memories.push({
      id: 'memory:late-death',
      eventId: events.at(-1)!.id,
      month: 60,
      salience: 1,
    });
    w.month = 61;

    advancePolitics(w, emit);

    expect(polity.leaderId).toBe(ordinary.id);
    expect(
      events.some((e) => e.kind === 'political_succession' && e.personIds.includes(ordinary.id)),
    ).toBe(true);
    assertCommittedCauses(events);
  });

  it('credits public service only for active local work or a bounded current civic experience', () => {
    const { w, emit } = fixture('service-evidence');
    advancePolitics(w, emit);
    const residents = w.persons.filter(
      (p) =>
        w.settlements.find((s) => s.id === p.locationId)?.polityId === w.polities[0].id &&
        w.month - p.birth >= 216,
    );
    const unemployed = residents[0];
    const employed = residents[1];
    const organizer = residents[2];
    for (const person of [unemployed, employed, organizer]) {
      initializeLife(person, w);
      person.occupation = '教师';
      person.relationships = [];
      person.health = 0.9;
    }
    unemployed.life!.career.employed = false;
    employed.life!.career.employed = true;
    organizer.life!.career.employed = false;
    organizer.health = 0.2;
    organizer.life!.lastDecision = {
      kind: 'organize',
      reason: '本月组织互助',
      month: 1,
      causeIds: ['evidence:government'],
    };
    w.month = 1;

    advancePolitics(w, emit);

    const standing = currentPolitics(w).standing;
    expect(standing[unemployed.id].service).toBe(0);
    expect(standing[employed.id].service).toBeGreaterThan(0);
    expect(standing[organizer.id].service).toBeGreaterThan(0);
    expect(standing[organizer.id].causeIds).toContain('evidence:government');
  });

  it('counts trusted support only from living, present people in the same polity', () => {
    const { w, emit } = fixture('local-support');
    advancePolitics(w, emit);
    const residents = w.persons.filter(
      (p) =>
        w.settlements.find((s) => s.id === p.locationId)?.polityId === w.polities[0].id &&
        w.month - p.birth >= 216,
    );
    const subject = residents[0],
      deceased = residents[1];
    const foreign = w.persons.find(
      (p) =>
        w.settlements.find((s) => s.id === p.locationId)?.polityId === w.polities[1].id &&
        w.month - p.birth >= 216,
    )!;
    deceased.death = 0;
    subject.relationships = [deceased, foreign].map((person) => ({
      personId: person.id,
      trust: 0.9,
      attachment: 0.9,
      kind: 'friend',
      since: 0,
      causeIds: ['evidence:government'],
    }));
    w.month = 1;
    advancePolitics(w, emit);
    expect(currentPolitics(w).standing[subject.id].network).toBe(0);

    const localSupporter = residents[2];
    subject.relationships.push({
      personId: localSupporter.id,
      trust: 0.9,
      attachment: 0.9,
      kind: 'friend',
      since: 1,
      causeIds: ['evidence:government'],
    });
    w.month = 2;
    advancePolitics(w, emit);
    expect(currentPolitics(w).standing[subject.id].network).toBeGreaterThan(0);
  });

  it('makes repressive reform and military coups material, conditional, and fallible', () => {
    const configure = (seed: string, military: boolean) => {
      const { w, emit, events } = fixture(seed);
      advancePolitics(w, emit);
      const polity = w.polities[0];
      const leader = w.persons.find((p) => p.id === polity.leaderId)!;
      const challenger = w.persons.find(
        (p) =>
          p.id !== leader.id &&
          w.settlements.find((s) => s.id === p.locationId)?.polityId === polity.id &&
          w.month - p.birth >= 216,
      )!;
      challenger.title = military ? '军官' : '地方代表';
      currentPolitics(w).standing[challenger.id] = {
        personId: challenger.id,
        score: 0.5,
        service: 0.3,
        network: 0.2,
        causeIds: ['evidence:government'],
      };
      const gov = w.geopolitics!.governments[polity.id];
      const profile: SocietyState['profiles'][string] = {
        personId: challenger.id,
        socialClass: 'working',
        cultureId: 'test-culture',
        politicalId: military ? undefined : 'civic',
        institutionIds: [],
        identityEvidence: { political: ['evidence:government'] },
        wagePressure: 0,
        safetyNet: 0,
        mobility: 0,
        alienation: 0,
        bereavedIds: [],
      };
      w.society = {
        profiles: { [challenger.id]: profile },
        relations: {},
        institutions: {},
        relationIndex: {},
        locationIndex: {},
        month: w.month,
        sequence: 0,
        lifeAppliedMonth: -1,
      };
      gov.laws.pressFreedom = 0.05;
      gov.parties[0].support = military ? 0.25 : 0.6;
      gov.parties[2].support = military ? 0.3 : 0.12;
      gov.groups[0].influence = military ? 0.6 : 0.1;
      gov.groups[0].satisfaction = military ? 0.08 : 0.6;
      polity.legitimacy = 0.4;
      w.month = 12;
      return { w, emit, events, polity, gov, leader, challenger };
    };
    const run = (caseData: ReturnType<typeof configure>) => {
      const before = treasuryAndSettlementCoin(caseData.w);
      const treasuryBefore = caseData.polity.treasury;
      const settlementFundsBefore = caseData.w.settlements.reduce((sum, s) => sum + s.coin, 0);
      advancePolitics(caseData.w, caseData.emit);
      expect(treasuryAndSettlementCoin(caseData.w)).toBeCloseTo(before, 8);
      expect(caseData.polity.treasury).toBeLessThan(treasuryBefore);
      expect(caseData.w.settlements.reduce((sum, s) => sum + s.coin, 0)).toBeGreaterThan(
        settlementFundsBefore,
      );
      return caseData;
    };
    const reformSuccessSeed = Array.from({ length: 10_000 }, (_, i) => `reform-success-${i}`).find(
      (seed) => random(seed, 12, 'polity-0', 'political-challenge') < 0.08,
    )!;
    const reformFailSeed = Array.from({ length: 10_000 }, (_, i) => `reform-fail-${i}`).find(
      (seed) => random(seed, 12, 'polity-0', 'political-challenge') > 0.92,
    )!;
    const coupSuccessSeed = Array.from({ length: 10_000 }, (_, i) => `coup-success-${i}`).find(
      (seed) => random(seed, 12, 'polity-0', 'political-challenge') < 0.08,
    )!;
    const success = run(configure(reformSuccessSeed, false));
    const failure = run(configure(reformFailSeed, false));
    const coup = run(configure(coupSuccessSeed, true));
    const mismatched = configure(reformSuccessSeed, false);
    mismatched.w.society!.profiles[mismatched.challenger.id].politicalId = 'socialist';
    run(mismatched);

    expect(success.gov.laws.suffrage).toBeGreaterThan(0.1);
    expect(success.events.some((e) => e.kind === 'political_reform')).toBe(true);
    expect(failure.gov.laws.suffrage).toBe(0.1);
    expect(failure.events.some((e) => e.kind === 'reform_failed')).toBe(true);
    expect(failure.polity.legitimacy).toBeLessThan(0.4);
    expect(
      mismatched.events.find((e) => e.kind === 'reform_failed')?.data.challengerId,
    ).toBeUndefined();
    expect(coup.gov.regime).toBe('military');
    expect(coup.gov.groups[0].satisfaction).toBeGreaterThan(0.08);
    expect(coup.events.some((e) => e.kind === 'coup')).toBe(true);
    expect(coup.polity.leaderId).toBe(coup.challenger.id);
    for (const scenario of [success, failure, coup]) assertCommittedCauses(scenario.events);
    assertCommittedCauses(mismatched.events);
  });

  it('lets the electoral seat winner form government instead of assigning a regime label', () => {
    const { w, emit, events } = fixture('election-transfer');
    advancePolitics(w, emit);
    const polity = w.polities[0];
    const government = w.geopolitics!.governments[polity.id];
    const currentLeader = w.persons.find((p) => p.id === polity.leaderId)!;
    const reformist = w.persons.find(
      (p) =>
        p.id !== currentLeader.id &&
        w.settlements.find((s) => s.id === p.locationId)?.polityId === polity.id &&
        w.month - p.birth >= 216,
    )!;
    reformist.title = '地方代表';
    w.society = {
      profiles: {
        [reformist.id]: {
          personId: reformist.id,
          socialClass: 'working',
          cultureId: 'test',
          politicalId: 'civic',
          institutionIds: [],
          identityEvidence: { political: ['evidence:government'] },
          wagePressure: 0,
          safetyNet: 0,
          mobility: 0,
          alienation: 0,
          bereavedIds: [],
        },
      },
      relations: {},
      institutions: {},
      relationIndex: {},
      locationIndex: {},
      month: 1,
      sequence: 0,
      lifeAppliedMonth: -1,
    };
    government.laws.suffrage = 0.5;
    government.regime = 'oligarchy';
    government.parties.find((party) => party.ideology === 'liberal')!.support = 0.7;
    government.parties.find((party) => party.ideology === 'socialist')!.support = 0.1;
    government.parties.find((party) => party.ideology === 'liberal')!.seats = 60;
    government.parties.find((party) => party.ideology === 'socialist')!.seats = 10;
    w.month = 48;
    const locals = new Map<string, World['persons']>();

    advanceGeopolitics(w, emit, locals);
    advancePolitics(w, emit);

    expect(events.some((e) => e.kind === 'election' && e.data.polityId === polity.id)).toBe(true);
    expect(
      events.some(
        (e) => e.kind === 'election_government_transfer' && e.data.leaderId === reformist.id,
      ),
    ).toBe(true);
    expect(polity.leaderId).toBe(reformist.id);
    expect(government.regime).toBe('parliamentary');
    assertCommittedCauses(events);
  });
});
