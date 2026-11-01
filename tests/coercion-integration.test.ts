import { describe, expect, it } from 'vitest';
import type { Person, Settlement, World } from '../packages/contracts/index.js';
import { initializeLife } from '../packages/cognition/life.js';
import { buildBaselineContext } from '../packages/planning/baseline.js';
import { advance } from '../packages/simulation-core/index.js';
import { createWorld, newPerson } from '../packages/world-packs/index.js';
import { isDetained } from '../packages/coercion/index.js';

function coercionWorld(seed = 'coercion-advance-fixture') {
  const w = createWorld(seed);
  w.pack = { id: 'earth-custody-test', version: '1' };
  w.calendar = { startYear: 3000, mode: 'historical-simulation', sources: [] };
  w.month = 10;
  w.parameters.lifeComplexity = true;
  w.parameters.openHistory = true;
  w.baselinePopulation = 135;
  w.maxYears = 100;
  const town: Settlement = {
    ...structuredClone(w.settlements[0]!),
    id: 'town',
    name: 'Town',
    neighbors: ['safe-town'],
    polityId: 'state',
    cohort: { id: 'town-cohort', children: 10, adults: 100, elders: 8 },
    food: 1000,
    coin: 100,
    scarcity: 0,
    price: 1,
    unrest: 0,
    economy: {
      unemployment: 0.05,
      healthcare: 0.5,
      education: 0.5,
      infrastructure: 0.5,
      inflation: 0.02,
      productionMultiplier: 1,
      tradeMultiplier: 1,
    },
  };
  const safeTown: Settlement = {
    ...structuredClone(town),
    id: 'safe-town',
    name: 'Safe town',
    neighbors: ['town'],
    cohort: { id: 'safe-cohort', children: 10, adults: 100, elders: 8 },
  };
  w.settlements = [town, safeTown];
  const state = structuredClone(w.polities[0]!);
  state.id = 'state';
  state.name = 'State';
  state.leaderId = 'leader';
  state.legitimacy = 0.5;
  state.treasury = 1000;
  state.realWorld = undefined;
  w.polities = [state];
  const target = newPerson(w, 'target', 'town', 0, 30);
  const leader = newPerson(w, 'leader', 'town', 1, 45);
  const friend = newPerson(w, 'friend', 'town', 2, 40);
  target.occupation = '织工';
  target.coin = 20;
  target.title = '地方工会组织者';
  target.values.care = 0.9;
  target.values.ambition = 0.9;
  friend.health = 0.4;
  friend.occupation = '医护人员';
  for (const p of [target, leader, friend]) initializeLife(p, w);
  target.life!.career.employed = true;
  friend.life!.career.employed = true;
  const tie = {
    personId: friend.id,
    kind: 'friend' as const,
    trust: 0.8,
    attachment: 0.9,
    contacts: 2,
    since: 0,
  };
  target.relationships.push(tie);
  friend.relationships.push({ ...tie, personId: target.id });
  w.persons = [target, leader, friend];
  w.routes = [
    {
      id: 'town-safe-town',
      from: 'town',
      to: 'safe-town',
      km: 100,
      mode: 'road',
      capacity: 500,
      status: 'open',
    },
  ];
  w.conflicts = [];
  w.shocks = [];
  w.organizations = [];
  w.agency = { version: 1, agendas: {}, projects: {}, needsReplan: {} };
  w.geopolitics = undefined;
  w.politics = undefined;
  w.coercion = {
    version: 1,
    lastAdvancedMonth: 10,
    activities: {
      'target:political': {
        personId: 'target',
        polityId: 'state',
        locationId: 'town',
        axis: 'political',
        ideology: 'socialist',
        months: [9, 10],
        evidenceIds: ['public-activity-9', 'public-activity-10'],
        lastActivity: 10,
      },
    },
    custody: {},
    facilities: {},
    lastEventIds: [],
  };
  return w;
}

function totalCoin(w: World) {
  return (
    w.polities.reduce((sum, polity) => sum + polity.treasury, 0) +
    w.settlements.reduce((sum, place) => sum + place.coin, 0) +
    w.persons.reduce((sum, person) => sum + person.coin, 0) +
    w.organizations.reduce((sum, organization) => sum + organization.treasury, 0)
  );
}
function totalFood(w: World) {
  return w.settlements.reduce((sum, place) => sum + place.food, 0);
}
function politicalStanding(w: World, p: Person) {
  return w.politics?.standing[p.id];
}

function admitAtMonthEnd(w: World) {
  const ordinary = structuredClone(w);
  ordinary.coercion!.activities = {};
  const withoutCustody = advance(ordinary).world;
  const beforeCoin = totalCoin(w);
  const detained = advance(w);
  expect(isDetained(detained.world, 'target')).toBe(true);
  expect(detained.world.month).toBe(11);
  expect(detained.events.some((event) => event.kind === 'political_custody_started')).toBe(true);
  expect(totalCoin(detained.world)).toBeCloseTo(beforeCoin);
  expect(detained.world.polities[0]!.treasury).toBeCloseTo(
    withoutCustody.polities[0]!.treasury - 0.25,
  );
  expect(detained.world.settlements[0]!.coin).toBeCloseTo(
    withoutCustody.settlements[0]!.coin + 0.25,
  );
  expect(totalFood(detained.world)).toBeCloseTo(totalFood(withoutCustody) - 1.15);
  expect(detained.world.audit.consumedFood).toBeCloseTo(withoutCustody.audit.consumedFood + 1.15);
  expect(totalCoin(withoutCustody)).toBeCloseTo(totalCoin(ordinary));
  return detained.world;
}

describe('coercive custody in canonical monthly advance', () => {
  it('detains at month end, blocks work, research, migration, care/social contact and candidate standing, then releases into resumed action', () => {
    const w = admitAtMonthEnd(coercionWorld());
    const target = w.persons.find((person) => person.id === 'target')!;
    const friend = w.persons.find((person) => person.id === 'friend')!;
    const beforeCoin = target.coin;
    const beforeResearch = w.settlements[0]!.knowledge;
    const beforeStanding = structuredClone(politicalStanding(w, target));
    const tie = target.relationships.find((relationship) => relationship.personId === friend.id)!;
    const beforeTie = structuredClone(tie);
    const beforeFriendHealth = friend.health;
    target.plans = [
      {
        id: 'held-migration',
        kind: 'migrate',
        step: 1,
        targetId: 'safe-town',
        reserved: 3,
        deadline: 40,
        status: 'active',
        causeIds: [],
      },
      {
        id: 'held-research',
        kind: 'research',
        step: 5,
        targetId: 'town',
        reserved: 0,
        deadline: 40,
        status: 'active',
        causeIds: [],
      },
    ];
    w.agency!.agendas[target.id] = {
      id: 'held-agenda',
      actorId: target.id,
      intention: '照料并联系亲友',
      rationale: '验证拘留期间暂停本地行动。',
      steps: [
        { action: 'care', targetId: friend.id, label: '照料亲友', months: 1 },
        { action: 'socialize', targetId: friend.id, label: '联系亲友', months: 1 },
      ],
      cursor: 0,
      progress: 0,
      status: 'active',
      adopted: w.month,
      lastApplied: w.month - 1,
      causeIds: [],
    };

    const heldTick = advance(w);
    const held = heldTick.world;
    const arrested = held.persons.find((person) => person.id === target.id)!;
    const heldTie = arrested.relationships.find(
      (relationship) => relationship.personId === friend.id,
    )!;
    expect(isDetained(held, arrested)).toBe(true);
    expect(arrested.coin).toBeCloseTo(beforeCoin);
    expect(arrested.plans.map((plan) => [plan.id, plan.step, plan.status])).toEqual([
      ['held-migration', 1, 'active'],
      ['held-research', 5, 'active'],
    ]);
    expect(arrested.journey).toBeUndefined();
    expect(held.settlements[0]!.knowledge).toBeCloseTo(beforeResearch);
    expect(held.agency!.agendas[target.id]!.cursor).toBe(0);
    expect(held.agency!.agendas[target.id]!.lastApplied).toBe(w.month - 1);
    expect(heldTie.trust).toBe(beforeTie.trust);
    expect(heldTie.attachment).toBe(beforeTie.attachment);
    expect(heldTie.contacts).toBe(beforeTie.contacts);
    expect(held.persons.find((person) => person.id === 'friend')!.health).toBeCloseTo(
      beforeFriendHealth + 0.005 - held.settlements[0]!.scarcity * 0.07,
    );
    expect(politicalStanding(held, arrested)?.service).toBe(beforeStanding?.service);
    expect(
      heldTick.events.some(
        (event) => event.kind === 'research_started' && event.personIds.includes(target.id),
      ),
    ).toBe(false);

    arrested.plans.find((plan) => plan.id === 'held-migration')!.status = 'failed';
    held.geopolitics!.governments.state.laws.pressFreedom = 0.8;
    const releaseTick = advance(held);
    expect(isDetained(releaseTick.world, target.id)).toBe(false);
    expect(releaseTick.events.some((event) => event.kind === 'political_custody_released')).toBe(
      true,
    );
    expect(releaseTick.world.coercion!.custody[target.id]).toBeUndefined();
    const resumed = advance(releaseTick.world).world;
    const resumedTarget = resumed.persons.find((person) => person.id === target.id)!;
    expect(isDetained(resumed, resumedTarget)).toBe(false);
    expect(resumedTarget.life!.lastDecision?.kind).not.toBe('custody');
    expect(resumedTarget.plans.find((plan) => plan.id === 'held-research')!.step).toBe(6);
  });

  it('clears custody and active plans when a detained person dies', () => {
    const w = admitAtMonthEnd(coercionWorld());
    const target = w.persons.find((person) => person.id === 'target')!;
    target.plans = [
      {
        id: 'dies-migrating',
        kind: 'migrate',
        step: 1,
        targetId: 'safe-town',
        reserved: 3,
        deadline: 40,
        status: 'active',
        causeIds: [],
      },
    ];
    target.birth = w.month - 360 * 12;
    const dead = advance(w);
    const deceased = dead.world.persons.find((person) => person.id === target.id)!;
    expect(deceased.death).toBe(dead.world.month);
    expect(deceased.plans.every((plan) => plan.status !== 'active')).toBe(true);
    expect(dead.world.coercion!.custody[target.id]).toBeUndefined();
    expect(dead.events.some((event) => event.kind === 'custody_ended_death')).toBe(true);
  });

  it('keeps custody consequences identical for an owned person and an ordinary NPC', () => {
    const base = admitAtMonthEnd(coercionWorld());
    const owned = structuredClone(base);
    const npc = structuredClone(base);
    owned.persons.find((person) => person.id === 'target')!.ownerId = 'owner-1';
    const a = advance(owned);
    const b = advance(npc);
    const withoutOwner = (world: World) => {
      const result = structuredClone(world);
      delete result.persons.find((person) => person.id === 'target')!.ownerId;
      return result;
    };
    expect(withoutOwner(a.world)).toEqual(b.world);
    expect(a.events).toEqual(b.events);
  });

  it('does not expose a detained person as a local helper target when callers provide locals directly', () => {
    const w = admitAtMonthEnd(coercionWorld());
    const locals = new Map([['town', w.persons]]);
    const places = new Map(w.settlements.map((place) => [place.id, place]));
    const context = buildBaselineContext(w, locals, places);
    expect(context.peopleByLocation.get('town')?.map((person) => person.id)).not.toContain(
      'target',
    );
    expect(context.personIdsByLocation.get('town')?.has('target')).toBe(false);
  });
});
