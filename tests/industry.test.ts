import { it, expect } from 'vitest';
import { createWorld } from '../packages/world-packs/index.js';
import {
  advanceIndustry,
  initializeIndustry,
  consumeMilitarySupplies,
  assertIndustrialLedger,
  goods,
} from '../packages/industry/index.js';
import type { HistoricalEvent, World } from '../packages/contracts/index.js';
const emitFor =
  (w: World, events: HistoricalEvent[]) =>
  (
    kind: string,
    personIds: string[],
    locationId: string | undefined,
    text: string,
    data: Record<string, unknown> = {},
    causeIds: string[] = [],
    significance = 0.5,
  ) => {
    const e = {
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
    events.push(e);
    return e;
  };
const cash = (w: World) =>
  w.polities.reduce((n, p) => n + p.treasury, 0) +
  w.settlements.reduce((n, s) => n + s.coin, 0) +
  w.persons.reduce((n, p) => n + p.coin, 0);
const world = () => {
  const w = createWorld('industrial-world');
  w.pack.id = 'earth-1900';
  return w;
};
it('runs actual recipes with conserved money and input/output inventory accounting', () => {
  const w = world(),
    events: HistoricalEvent[] = [],
    before = cash(w);
  for (let i = 0; i < 12; i++) {
    w.month++;
    advanceIndustry(w, emitFor(w, events));
    assertIndustrialLedger(w);
  }
  expect(cash(w)).toBeCloseTo(before, 5);
  expect(w.industry!.ledger.produced.steel).toBeGreaterThan(0);
  expect(w.industry!.ledger.consumed.ore).toBeGreaterThan(0);
  expect(events[0].data.classification).toBe('scenario-initialization');
  const beforeState = structuredClone(w.industry);
  advanceIndustry(w, emitFor(w, events));
  expect(w.industry).toEqual(beforeState);
});
it('cannot manufacture steel without ore and coal, or pay wages with an empty treasury', () => {
  const w = world(),
    state = initializeIndustry(w),
    p = state.polities[w.polities[0].id];
  for (const g of goods) {
    state.ledger.destroyed[g] += p.goods[g];
    p.goods[g] = 0;
  }
  p.capacity.coal = 0;
  p.capacity.ore = 0;
  w.polities[0].treasury = 0;
  w.month++;
  advanceIndustry(w, emitFor(w, []));
  expect(p.goods.steel).toBe(0);
  expect(p.goods.arms).toBe(0);
  assertIndustrialLedger(w);
});
it('military supply consumes real stock and reports shortages instead of unlimited armies', () => {
  const w = world(),
    s = initializeIndustry(w),
    id = w.polities[0].id,
    p = s.polities[id],
    arms = p.goods.arms,
    oil = p.goods.oil;
  const result = consumeMilitarySupplies(w, id, arms * 2, oil * 2);
  expect(result.fulfillment).toBeCloseTo(0.5);
  expect(p.goods.arms).toBe(0);
  expect(p.goods.oil).toBe(0);
  expect(s.ledger.consumed.arms).toBe(arms);
  assertIndustrialLedger(w);
  expect(consumeMilitarySupplies(w, id, 1, 1).fulfillment).toBe(0);
});
it('uses a physical transport constraint and sanctions to reduce actual cross-border deliveries', () => {
  const run = (sanctions: boolean) => {
    const w = world(),
      a = w.polities[0],
      b = w.polities[1],
      sa = w.settlements.find((s) => s.polityId === a.id)!,
      sb = w.settlements.find((s) => s.polityId === b.id)!;
    w.polities = [a, b];
    w.settlements = [sa, sb];
    w.routes = [
      {
        id: 'market',
        from: sa.id,
        to: sb.id,
        mode: 'rail',
        km: 100,
        status: 'open',
        capacity: 1000,
      },
    ];
    const state = initializeIndustry(w),
      pa = state.polities[a.id],
      pb = state.polities[b.id];
    for (const p of [pa, pb]) for (const g of goods) p.capacity[g] = 0;
    pa.capacity.coal = 10;
    pb.capacity.coal = 10;
    state.ledger.initial.coal += 200 - pa.goods.coal - pb.goods.coal;
    pa.goods.coal = 200;
    pb.goods.coal = 0;
    w.geopolitics = {
      relations: { [[a.id, b.id].sort().join('~')]: { status: sanctions ? 'sanctions' : 'peace' } },
    } as any;
    advanceIndustry(w, emitFor(w, []));
    assertIndustrialLedger(w);
    return pb.goods.coal;
  };
  expect(run(true)).toBeLessThan(run(false));
});
