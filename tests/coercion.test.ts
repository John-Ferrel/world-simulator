import { describe, expect, it } from 'vitest';
import type { HistoricalEvent, Person, World } from '../packages/contracts/index.js';
import { advanceCoercion, isDetained, type CoercionState } from '../packages/coercion/index.js';
import type { Emit } from '../packages/simulation-core/index.js';

const person = (id: string, ownerId?: string): Person => ({
  id,
  ownerId,
  version: 0,
  name: `Person ${id}`,
  birth: -300,
  locationId: 'town',
  originCohortId: 'cohort',
  parents: [],
  householdId: `home-${id}`,
  occupation: '织工',
  coin: 10,
  health: 1,
  stress: 0.1,
  values: { care: 0.5, ambition: 0.5, tradition: 0.5 },
  skills: { craft: 0.3, learning: 0.3 },
  goals: [],
  memories: [],
  beliefs: [],
  relationships: [],
  plans: [],
  commitments: [],
  appearance: { skin: 0, hair: 0, clothes: 0 },
});

const world = (target: Person, pressFreedom = 0.1): World => ({
  schema: 'slw/1',
  id: 'coercion-world',
  seed: 'coercion-seed',
  epoch: 0,
  month: 10,
  revision: 0,
  pack: { id: 'fictional-earth-test', version: '1' },
  status: 'running',
  parameters: { researchRate: 1 },
  baselinePopulation: 100,
  collapseMonths: 0,
  maxYears: 100,
  settlements: [
    {
      id: 'town',
      name: 'Town',
      x: 0,
      y: 0,
      biome: 'plains',
      neighbors: [],
      polityId: 'state',
      cohort: { id: 'town-cohort', children: 10, adults: 100, elders: 8 },
      food: 10,
      coin: 20,
      fertility: 0,
      knowledge: 0,
      prosperity: 0,
      scarcity: 0.2,
      price: 1,
      unrest: 0.1,
      birthRemainder: 0,
      deathRemainder: 0,
    },
  ],
  polities: [
    {
      id: 'state',
      name: 'State',
      color: '#777',
      treasury: 20,
      legitimacy: 0.7,
      tax: 0.1,
      leaderId: 'leader',
      military: 0.1,
      research: 0,
    },
  ],
  persons: [target, person('leader')],
  organizations: [],
  conflicts: [],
  claims: [],
  eventSeq: 0,
  appliedCommands: [],
  processedJobs: [],
  audit: { producedFood: 0, consumedFood: 0, destroyedFood: 0, births: 0, deaths: 0 },
  terminalEvidence: [],
  geopolitics: {
    version: 1,
    governments: {
      state: {
        polityId: 'state',
        regime: 'authoritarian',
        parties: [],
        groups: [],
        laws: { suffrage: 0.1, labor: 0.1, religiousFreedom: 0.1, pressFreedom },
        causeIds: [],
      },
    },
    relations: {},
    wars: [],
    atrocities: [],
    lastEventIds: [],
    pendingCasualties: [],
    lastAdvancedMonth: 9,
    lastEffectsMonth: 9,
    routeBaseCapacity: {},
    routeBaseStatus: {},
    lastAtrocityStarted: {},
  },
});

const activityEvent = (
  month: number,
  id = `activity-${month}`,
  axis: 'political' | 'religious' = 'political',
  personIds = ['target'],
): HistoricalEvent => ({
  id,
  worldId: 'coercion-world',
  month,
  kind: axis === 'religious' ? 'faith_witness' : 'social_identity_adopted',
  personIds,
  locationId: 'town',
  text: '公开参与政治组织',
  data: axis === 'religious' ? { tradition: 'faith:river' } : { axis, identity: 'labor' },
  causeIds: [],
  significance: 0.6,
});
const emitter =
  (out: HistoricalEvent[], month: number): Emit =>
  (kind, personIds, locationId, text, data = {}, causeIds = [], significance = 0.5) => {
    const e: HistoricalEvent = {
      id: `out-${out.length + 1}`,
      worldId: 'coercion-world',
      month,
      kind,
      personIds,
      locationId,
      text,
      data,
      causeIds,
      significance,
    };
    out.push(e);
    return e;
  };
const totalCoin = (w: World) =>
  w.polities.reduce((sum, polity) => sum + polity.treasury, 0) +
  w.settlements.reduce((sum, place) => sum + place.coin, 0) +
  w.persons.reduce((sum, p) => sum + p.coin, 0) +
  w.organizations.reduce((sum, organization) => sum + organization.treasury, 0);

function addActivityMonths(w: World, target: Person, months: number[]) {
  const locals = new Map([['town', [target, w.persons[1]]]]),
    out: HistoricalEvent[] = [];
  for (const month of months) {
    w.month = month;
    const event = activityEvent(month);
    advanceCoercion(w, emitter(out, month), locals, [event]);
  }
  return { locals, out };
}

describe('evidence-backed coercive custody', () => {
  it('does not detain under free law or without repeated, named public activity', () => {
    const freePerson = person('target'),
      freeWorld = world(freePerson, 0.8);
    addActivityMonths(freeWorld, freePerson, [10, 11]);
    expect(isDetained(freeWorld, freePerson)).toBe(false);

    const quietPerson = person('target'),
      quietWorld = world(quietPerson),
      out: HistoricalEvent[] = [];
    quietWorld.month = 10;
    advanceCoercion(
      quietWorld,
      emitter(out, 10),
      new Map([['town', [quietPerson, quietWorld.persons[1]]]]),
      [],
    );
    quietWorld.month = 11;
    advanceCoercion(
      quietWorld,
      emitter(out, 11),
      new Map([['town', [quietPerson, quietWorld.persons[1]]]]),
      [],
    );
    expect(isDetained(quietWorld, quietPerson)).toBe(false);
    expect(out).toHaveLength(0);
  });

  it('requires fiscal and food maintenance, transfers coin, consumes food, and preserves population', () => {
    const p = person('target'),
      w = world(p),
      beforeCoin = totalCoin(w),
      beforeFood = w.settlements[0].food,
      beforePopulation =
        w.persons.length +
        w.settlements[0].cohort.children +
        w.settlements[0].cohort.adults +
        w.settlements[0].cohort.elders;
    p.relationships.push({
      personId: 'leader',
      trust: 0.8,
      attachment: 0.9,
      kind: 'friend',
      since: 0,
    });
    const beforeRelativeStress = w.persons[1].stress;
    addActivityMonths(w, p, [10, 11]);
    expect(isDetained(w, p)).toBe(true);
    expect(totalCoin(w)).toBeCloseTo(beforeCoin);
    expect(w.settlements[0].food).toBeLessThan(beforeFood);
    expect(w.audit.consumedFood).toBeCloseTo(beforeFood - w.settlements[0].food);
    expect((w as World & { coercion?: CoercionState }).coercion?.facilities.state).toMatchObject({
      capacity: 1,
      coinTransferred: 0.25,
      foodConsumed: 1.15,
      maintainedDetaineeMonths: 1,
    });
    expect(
      w.persons.length +
        w.settlements[0].cohort.children +
        w.settlements[0].cohort.adults +
        w.settlements[0].cohort.elders,
    ).toBe(beforePopulation);
    w.month = 12;
    advanceCoercion(w, emitter([], 12), new Map([['town', [p, w.persons[1]]]]), []);
    expect(w.persons[1].stress).toBeGreaterThan(beforeRelativeStress);

    const poor = person('target'),
      poorWorld = world(poor);
    poorWorld.polities[0].treasury = 0;
    const { out } = addActivityMonths(poorWorld, poor, [10, 11]);
    expect(isDetained(poorWorld, poor)).toBe(false);
    expect(out.filter((event) => event.kind === 'political_custody_started')).toHaveLength(0);
  });

  it('requires named religious practice under religious restrictions for faith-based custody', () => {
    const p = person('target'),
      w = world(p),
      out: HistoricalEvent[] = [],
      locals = new Map([['town', [p, w.persons[1]]]]);
    w.month = 10;
    advanceCoercion(w, emitter(out, 10), locals, [activityEvent(10, 'faith-10', 'religious')]);
    expect(isDetained(w, p)).toBe(false);
    w.month = 11;
    advanceCoercion(w, emitter(out, 11), locals, [activityEvent(11, 'faith-11', 'religious')]);
    expect(isDetained(w, p)).toBe(true);
    expect(out[0].kind).toBe('religious_custody_started');
    expect(out[0].data.allegation).toContain('不代表');
  });

  it('excludes current leaders, aligned campaigns, and a religious practice shared by the leader', () => {
    const leader = person('leader'),
      leaderWorld = world(person('target')),
      leaderOut: HistoricalEvent[] = [],
      locals = new Map([['town', [leaderWorld.persons[0], leader]]]);
    leaderWorld.persons[1] = leader;
    leaderWorld.month = 10;
    advanceCoercion(leaderWorld, emitter(leaderOut, 10), locals, [
      activityEvent(10, 'leader-10', 'political', ['leader']),
    ]);
    leaderWorld.month = 11;
    advanceCoercion(leaderWorld, emitter(leaderOut, 11), locals, [
      activityEvent(11, 'leader-11', 'political', ['leader']),
    ]);
    expect(isDetained(leaderWorld, leader)).toBe(false);

    const alignedPerson = person('target'),
      alignedWorld = world(alignedPerson),
      alignedOut: HistoricalEvent[] = [];
    alignedWorld.geopolitics!.governments.state.parties = [
      { id: 'liberal-party', ideology: 'liberal', support: 0.8, seats: 1 },
    ];
    for (const month of [10, 11]) {
      alignedWorld.month = month;
      const event = activityEvent(month, `campaign-${month}`);
      event.kind = 'campaign';
      event.data = { ideology: 'liberal' };
      advanceCoercion(
        alignedWorld,
        emitter(alignedOut, month),
        new Map([['town', [alignedPerson, alignedWorld.persons[1]]]]),
        [event],
      );
    }
    expect(isDetained(alignedWorld, alignedPerson)).toBe(false);

    const faithLeader = person('leader'),
      faithPerson = person('target'),
      faithWorld = world(faithPerson),
      faithOut: HistoricalEvent[] = [];
    faithLeader.beliefs = [{ claimId: 'faith:river', confidence: 0.9, sourceIds: ['evidence'] }];
    faithWorld.persons[1] = faithLeader;
    for (const month of [10, 11]) {
      faithWorld.month = month;
      advanceCoercion(
        faithWorld,
        emitter(faithOut, month),
        new Map([['town', [faithPerson, faithLeader]]]),
        [activityEvent(month, `shared-faith-${month}`, 'religious', ['target', 'leader'])],
      );
    }
    expect(isDetained(faithWorld, faithPerson)).toBe(false);
  });

  it('limits admissions to the facility capacity even when several people qualify', () => {
    const p1 = person('target'),
      p2 = person('target-2'),
      w = world(p1),
      out: HistoricalEvent[] = [];
    w.persons.push(p2);
    const locals = new Map([['town', [p1, p2, w.persons[1]]]]);
    w.month = 10;
    advanceCoercion(w, emitter(out, 10), locals, [
      activityEvent(10, 'acts-10', 'political', ['target', 'target-2']),
    ]);
    w.month = 11;
    advanceCoercion(w, emitter(out, 11), locals, [
      activityEvent(11, 'acts-11', 'political', ['target', 'target-2']),
    ]);
    expect([isDetained(w, p1), isDetained(w, p2)].filter(Boolean)).toHaveLength(1);
    expect((w as World & { coercion?: CoercionState }).coercion?.facilities.state.capacity).toBe(1);
  });

  it('is idempotent within a month and releases on a rights reform with a new cause', () => {
    const p = person('target'),
      w = world(p),
      out: HistoricalEvent[] = [],
      locals = new Map([['town', [p, w.persons[1]]]]);
    w.month = 10;
    advanceCoercion(w, emitter(out, 10), locals, [activityEvent(10)]);
    w.month = 11;
    const repeatedEvidence = activityEvent(11);
    advanceCoercion(w, emitter(out, 11), locals, [repeatedEvidence]);
    const treasuryAfterAdmission = w.polities[0].treasury,
      foodAfterAdmission = w.settlements[0].food,
      facilityAfterAdmission = structuredClone(
        (w as World & { coercion?: CoercionState }).coercion?.facilities.state,
      );
    advanceCoercion(w, emitter(out, 11), locals, [repeatedEvidence]);
    expect(out.filter((event) => event.kind === 'political_custody_started')).toHaveLength(1);
    expect(w.polities[0].treasury).toBe(treasuryAfterAdmission);
    expect(w.settlements[0].food).toBe(foodAfterAdmission);
    expect((w as World & { coercion?: CoercionState }).coercion?.facilities.state).toEqual(
      facilityAfterAdmission,
    );
    expect(isDetained(w, p)).toBe(true);

    w.month = 12;
    w.geopolitics!.governments.state.laws.pressFreedom = 0.5;
    const reform: HistoricalEvent = {
      ...activityEvent(12, 'law-event'),
      kind: 'law_reform',
      personIds: [],
      data: { polityId: 'state', pressFreedom: 0.5 },
    };
    advanceCoercion(w, emitter(out, 12), locals, [reform]);
    expect(isDetained(w, p)).toBe(false);
    const release = out.find((event) => event.kind === 'political_custody_released');
    expect(release?.data.reason).toBe('rights_reformed');
    expect(release?.causeIds).toContain('law-event');
  });

  it('releases and requests replanning when ongoing facility maintenance cannot be paid', () => {
    const p = person('target'),
      w = world(p),
      out: HistoricalEvent[] = [];
    w.agency = { version: 1, agendas: {}, projects: {}, needsReplan: {} };
    addActivityMonths(w, p, [10, 11]);
    expect(isDetained(w, p)).toBe(true);
    w.polities[0].treasury = 0;
    w.month = 12;
    advanceCoercion(w, emitter(out, 12), new Map([['town', [p, w.persons[1]]]]), []);
    expect(isDetained(w, p)).toBe(false);
    expect(out[0]?.data.reason).toBe('maintenance_failed');
    expect(w.agency.needsReplan[p.id]?.causeIds).toContain(out[0]?.id);
  });

  it('applies the same eligibility to an owner and an NPC', () => {
    const result = (ownerId?: string) => {
      const p = person('target', ownerId),
        w = world(p);
      addActivityMonths(w, p, [10, 11]);
      return isDetained(w, p);
    };
    expect(result('owner-1')).toBe(true);
    expect(result(undefined)).toBe(true);
  });
});
