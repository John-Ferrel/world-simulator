import { describe, expect, it } from 'vitest';
import type { Emit } from '../packages/simulation-core/index.js';
import { createWorld } from '../packages/world-packs/index.js';
import type { HistoricalEvent, Person, World } from '../packages/contracts/index.js';
import {
  advanceGeopolitics,
  initializeGeopolitics,
  type Front,
  type GeopoliticalState,
  type War,
} from '../packages/geopolitics/index.js';
import { initializeIndustry } from '../packages/industry/index.js';

function warFixture(adultsPerPolity: number) {
  const w = createWorld(`war-causality-${adultsPerPolity}`, 81, 300);
  w.pack = { id: 'earth-war-causality', version: 'test' };
  w.calendar = { startYear: 1800, mode: 'historical-simulation', sources: [] };
  const keep = new Set(['town-0', 'town-6', 'town-12']);
  w.settlements = w.settlements.filter((s) => keep.has(s.id));
  w.polities = w.polities.slice(0, 3);
  w.persons = w.persons.filter((p) => keep.has(p.locationId));
  const living = new Set(w.persons.map((p) => p.id));
  for (const person of w.persons) {
    person.relationships = person.relationships.filter((r) => living.has(r.personId));
    person.parents = person.parents.filter((id) => living.has(id));
  }
  w.organizations = [];
  const [a, b, ally] = w.settlements;
  a.neighbors = [b.id, ally.id];
  b.neighbors = [a.id];
  ally.neighbors = [a.id];
  for (const settlement of w.settlements) {
    settlement.cohort = { ...settlement.cohort, children: 0, adults: adultsPerPolity, elders: 0 };
    settlement.food = 100_000;
  }
  w.routes = [
    {
      id: 'front-a-b',
      from: a.id,
      to: b.id,
      km: 4,
      mode: 'road',
      capacity: 1_000_000,
      status: 'open',
    },
    {
      id: 'ally-a',
      from: ally.id,
      to: a.id,
      km: 5,
      mode: 'road',
      capacity: 1_000_000,
      status: 'open',
    },
  ];
  w.baselinePopulation = adultsPerPolity * 3;
  initializeIndustry(w);
  for (const stock of Object.values(w.industry!.polities)) {
    for (const good of ['arms', 'oil'] as const) {
      const old = stock.goods[good];
      stock.goods[good] = 10_000;
      w.industry!.ledger.initial[good] += 10_000 - old;
    }
  }
  let seq = 0;
  const events: HistoricalEvent[] = [];
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
      id: `war-event:${++seq}`,
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
    events.push(event);
    return event;
  };
  initializeGeopolitics(w, emit);
  const state = w.geopolitics as GeopoliticalState;
  const aId = w.settlements.find((s) => s.id === a.id)!.polityId;
  const bId = w.settlements.find((s) => s.id === b.id)!.polityId;
  const allyId = w.settlements.find((s) => s.id === ally.id)!.polityId;
  const cause = emit('war_started_fixture', [], a.id, 'committed causal war evidence');
  const relationKey = [aId, bId].sort().join('~');
  state.relations[relationKey].status = 'war';
  state.relations[relationKey].causeIds = [cause.id];
  state.relations[relationKey].disputeEvidenceId = cause.id;
  const allyKey = [aId, allyId].sort().join('~');
  if (state.relations[allyKey]) state.relations[allyKey].status = 'alliance';
  const front: Front = {
    aSettlementId: a.id,
    bSettlementId: b.id,
    control: 0.5,
    supply: 0.05,
    forceA: 0,
    forceB: 0,
    kind: 'land',
  };
  const war: War = {
    id: 'war:coalition-test',
    a: aId,
    b: bId,
    campA: [aId, allyId],
    campB: [bId],
    started: 0,
    status: 'active',
    causeIds: [cause.id],
    fronts: [front],
    mobilized: { [aId]: 0, [allyId]: 0, [bId]: 0 },
    supplyFulfillment: { [aId]: 1, [allyId]: 1, [bId]: 1 },
    consumedSupplies: {
      [aId]: { arms: 0, fuel: 0 },
      [allyId]: { arms: 0, fuel: 0 },
      [bId]: { arms: 0, fuel: 0 },
    },
    casualties: { [aId]: 0, [allyId]: 0, [bId]: 0 },
    occupied: [],
    months: 0,
    settlementOwnerBefore: {},
  };
  state.wars.push(war);
  const locals = new Map<string, Person[]>(w.settlements.map((s) => [s.id, []]));
  for (const person of w.persons)
    if (person.death === undefined) locals.get(person.locationId)!.push(person);
  return { w, emit, events, state, war, locals, aId, bId, allyId, a, b, ally };
}

function sumGoods(w: World, good: 'arms' | 'oil') {
  return Object.values(w.industry!.polities).reduce((sum, polity) => sum + polity.goods[good], 0);
}

function assertCommittedCauses(events: HistoricalEvent[]) {
  const committed = new Set<string>();
  for (const event of events) {
    for (const cause of event.causeIds)
      expect(committed.has(cause), `${event.kind} references uncommitted cause ${cause}`).toBe(
        true,
      );
    committed.add(event.id);
  }
}

describe('two-phase war causality', () => {
  it('consumes military supplies once, then charges coalition casualties to the mobilized countries', () => {
    const fixture = warFixture(5_000_000);
    const { w, emit, state, war, locals, a, b, ally, aId, bId, allyId } = fixture;
    const armsBefore = sumGoods(w, 'arms');
    const oilBefore = sumGoods(w, 'oil');
    const allyAdultsBefore = ally.cohort.adults;
    const representedAtFront = (locals.get(a.id)?.length ?? 0) + (locals.get(b.id)?.length ?? 0);
    expect(representedAtFront).toBeGreaterThan(0);
    w.month = 1;

    advanceGeopolitics(w, emit, locals);

    const armsUsed = armsBefore - sumGoods(w, 'arms');
    const oilUsed = oilBefore - sumGoods(w, 'oil');
    expect(armsUsed).toBeGreaterThan(0);
    expect(oilUsed).toBeGreaterThan(0);
    expect(w.industry!.ledger.consumed.arms).toBeCloseTo(armsUsed, 8);
    expect(w.industry!.ledger.consumed.oil).toBeCloseTo(oilUsed, 8);
    expect(
      war.consumedSupplies[aId].arms +
        war.consumedSupplies[allyId].arms +
        war.consumedSupplies[bId].arms,
    ).toBeCloseTo(armsUsed, 8);
    expect(
      war.consumedSupplies[aId].fuel +
        war.consumedSupplies[allyId].fuel +
        war.consumedSupplies[bId].fuel,
    ).toBeCloseTo(oilUsed, 8);
    expect(war.casualties[allyId]).toBeGreaterThan(0);
    expect(ally.cohort.adults).toBeLessThan(allyAdultsBefore);
    expect(war.mobilized[allyId]).toBeGreaterThan(0);
    assertCommittedCauses(fixture.events);

    const consumedBeforeRepeat = structuredClone(w.industry!.ledger.consumed);
    const warSuppliesBeforeRepeat = structuredClone(war.consumedSupplies);
    const casualtiesBeforeRepeat = structuredClone(war.casualties);
    advanceGeopolitics(w, emit, locals);
    expect(w.industry!.ledger.consumed).toEqual(consumedBeforeRepeat);
    expect(war.consumedSupplies).toEqual(warSuppliesBeforeRepeat);
    expect(war.casualties).toEqual(casualtiesBeforeRepeat);
    expect(state.lastAdvancedMonth).toBe(w.month);
  });

  it('does not expose ordinary front residents to combat when no one can be mobilized', () => {
    const fixture = warFixture(10);
    const { w, emit, state, war, locals, a, b } = fixture;
    expect((locals.get(a.id)?.length ?? 0) + (locals.get(b.id)?.length ?? 0)).toBeGreaterThan(0);
    w.month = 1;

    advanceGeopolitics(w, emit, locals);

    expect(Object.values(war.mobilized).every((n) => n === 0)).toBe(true);
    expect(war.fronts.every((front) => front.forceA + front.forceB === 0)).toBe(true);
    expect(state.pendingCasualties).toHaveLength(0);
  });
});
