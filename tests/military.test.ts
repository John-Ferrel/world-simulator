import { describe, expect, it } from 'vitest';
import { createWorld } from '../packages/world-packs/index.js';
import type { HistoricalEvent, World } from '../packages/contracts/index.js';
import { initializeIndustry } from '../packages/industry/index.js';
import { advanceMilitaryLogistics, investMilitaryTransport } from '../packages/military/index.js';
import type { GeopoliticalState, War } from '../packages/geopolitics/index.js';
import type { Emit } from '../packages/simulation-core/index.js';

function fixture(routeCapacity = 1000, twoFronts = false) {
  const w = createWorld('military-logistics', 17, 300);
  w.pack.id = 'earth-1900';
  w.month = 0;
  w.polities = w.polities.slice(0, 2);
  const [a, b] = w.polities;
  const settlements = ['town-0', 'town-1', 'town-2', 'town-3'].map((id) =>
    w.settlements.find((s) => s.id === id)!,
  );
  for (const s of settlements) {
    s.polityId = s.id === 'town-0' || s.id === 'town-1' ? a.id : b.id;
    s.cohort = {
      ...s.cohort,
      adults: s.id === 'town-0' || s.id === 'town-2' ? 1000 : 1,
      children: 0,
      elders: 0,
    };
  }
  w.settlements = settlements;
  w.persons = [];
  w.routes = [
    {
      id: 'a-line',
      from: 'town-0',
      to: 'town-1',
      km: 20,
      mode: 'rail',
      capacity: routeCapacity,
      status: 'open',
    },
    {
      id: 'b-line',
      from: 'town-2',
      to: 'town-3',
      km: 25,
      mode: 'road',
      capacity: 1000,
      status: 'open',
    },
  ];
  const front = {
    aSettlementId: 'town-1',
    bSettlementId: 'town-3',
    control: 0.5,
    supply: 1,
    kind: 'land' as const,
    forceA: 50,
    forceB: 50,
  };
  const war: War = {
    id: 'war-test',
    a: a.id,
    b: b.id,
    campA: [a.id],
    campB: [b.id],
    started: 0,
    status: 'active',
    causeIds: ['cause-war'],
    fronts: twoFronts ? [structuredClone(front), structuredClone(front)] : [front],
    mobilized: { [a.id]: 1000, [b.id]: 1000 },
    supplyFulfillment: {},
    consumedSupplies: {},
    casualties: {},
    occupied: [],
    months: 0,
    settlementOwnerBefore: {},
  };
  w.geopolitics = {
    version: 1,
    governments: {},
    relations: {},
    wars: [war],
    atrocities: [],
    lastEventIds: [],
    pendingCasualties: [],
    lastAdvancedMonth: -1,
    lastEffectsMonth: -1,
    routeBaseCapacity: {},
    routeBaseStatus: {},
    lastAtrocityStarted: {},
  } satisfies GeopoliticalState;
  const industry = initializeIndustry(w);
  for (const id of [a.id, b.id]) {
    industry.polities[id].goods.arms = 100;
    industry.polities[id].goods.oil = 100;
  }
  return w;
}

function emitter(w: World, events: HistoricalEvent[] = []): Emit {
  return (kind, personIds, locationId, text, data = {}, causeIds = [], significance = 0.5) => {
    const event: HistoricalEvent = {
      id: `test:${++w.eventSeq}`,
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
}

describe('military logistics', () => {
  it('delivers over an open physical route and reports its combat-ready front supply', () => {
    const w = fixture();
    const result = advanceMilitaryLogistics(w, emitter(w));
    expect(result.wars['war-test'].frontLogistics[0].supplyA).toBe(1);
    expect(result.wars['war-test'].frontLogistics[0].routeIdsA).toEqual(['a-line']);
    expect(result.polities[w.polities[0].id].consumedArms).toBeCloseTo(0.45);
  });

  it('cuts deliveries when a route is severed and does not consume undelivered supplies', () => {
    const w = fixture();
    w.routes = w.routes!.filter((r) => r.id !== 'a-line');
    const result = advanceMilitaryLogistics(w, emitter(w));
    expect(result.wars['war-test'].frontLogistics[0].supplyA).toBe(0);
    expect(result.polities[w.polities[0].id].consumedArms).toBe(0);
    expect(result.polities[w.polities[0].id].consumedFuel).toBe(0);
  });

  it('shares a bottleneck across fronts and consumes a country stock only once', () => {
    const w = fixture(10, true);
    const beforeArms = w.industry!.polities[w.polities[0].id].goods.arms;
    const result = advanceMilitaryLogistics(w, emitter(w));
    const fronts = result.wars['war-test'].frontLogistics;
    expect(fronts).toHaveLength(2);
    expect(fronts[0].supplyA).toBeCloseTo(fronts[1].supplyA);
    expect(fronts[0].supplyA).toBeLessThan(0.3);
    expect(result.routes['a-line'].used).toBeLessThanOrEqual(
      result.routes['a-line'].capacity + 1e-9,
    );
    expect(result.polities[w.polities[0].id].consumedArms).toBeCloseTo(
      0.45 * result.polities[w.polities[0].id].routeFulfillment,
    );
    expect(w.industry!.polities[w.polities[0].id].goods.arms).toBeCloseTo(
      beforeArms - result.polities[w.polities[0].id].consumedArms,
    );
  });

  it('does not duplicate national inventory when the polity fights in separate wars', () => {
    const w = fixture();
    const second = structuredClone(w.geopolitics!.wars[0]);
    second.id = 'war-second';
    second.causeIds = ['cause-second-war'];
    w.geopolitics!.wars.push(second);
    const priorConsumed = w.industry!.ledger.consumed.arms;
    const result = advanceMilitaryLogistics(w, emitter(w));
    expect(result.wars['war-test'].frontLogistics[0].supplyA).toBe(1);
    expect(result.wars['war-second'].frontLogistics[0].supplyA).toBe(1);
    expect(result.polities[w.polities[0].id].requestedArms).toBeCloseTo(0.9);
    expect(result.polities[w.polities[0].id].consumedArms).toBeCloseTo(0.9);
    expect(w.industry!.ledger.consumed.arms - priorConsumed).toBeCloseTo(
      Object.values(result.polities).reduce((sum, polity) => sum + polity.consumedArms, 0),
    );
  });

  it('treats restricted sea lanes as low-capacity interdicted shipping, without claiming a navy', () => {
    const w = fixture();
    w.routes = [
      {
        id: 'sea-a',
        from: 'town-0',
        to: 'town-1',
        km: 200,
        mode: 'sea',
        capacity: 200,
        status: 'restricted',
      },
      w.routes![1],
      {
        id: 'air-a',
        from: 'town-0',
        to: 'town-1',
        km: 100,
        mode: 'air',
        capacity: 1000,
        status: 'open',
      },
    ];
    const result = advanceMilitaryLogistics(w, emitter(w));
    expect(result.routes['sea-a'].maritimeInterdiction).toBe(true);
    expect(result.wars['war-test'].frontLogistics[0].interdictedRouteIdsA).toContain('sea-a');
    expect(result.wars['war-test'].frontLogistics[0].supplyA).toBeLessThan(1);
    expect(result.unsupportedAirRoutes).toBe(1);
  });

  it('investment spends steel, oil and treasury with cash returned to a real settlement', () => {
    const w = fixture();
    const polity = w.polities[0];
    w.industry!.polities[polity.id].goods.steel = 100;
    w.industry!.polities[polity.id].goods.oil = 100;
    polity.treasury = 1000;
    const fundedMoney = polity.treasury + w.settlements.reduce((n, s) => n + s.coin, 0);
    const beforeSteel = w.industry!.polities[polity.id].goods.steel;
    const result = investMilitaryTransport(w, polity.id, 'land', 20, emitter(w));
    expect(result.ok).toBe(true);
    expect(w.industry!.polities[polity.id].goods.steel).toBeLessThan(beforeSteel);
    expect(polity.treasury + w.settlements.reduce((n, s) => n + s.coin, 0)).toBeCloseTo(
      fundedMoney,
    );
    const logistics = advanceMilitaryLogistics(w, emitter(w));
    expect(logistics.routes['a-line'].capacity).toBeGreaterThan(1000);
  });

  it('is independent of account ownership metadata', () => {
    const a = fixture();
    a.persons.push(createWorld('owner-source').persons[0]);
    a.persons[0].ownerId = 'player';
    const b = structuredClone(a);
    delete b.persons[0].ownerId;
    const x = advanceMilitaryLogistics(a, emitter(a));
    const y = advanceMilitaryLogistics(b, emitter(b));
    expect(x.wars).toEqual(y.wars);
    expect(x.polities).toEqual(y.polities);
  });
});
