import { expect, it } from 'vitest';
import { createWorld } from '../packages/world-packs/index.js';
import {
  goods,
  initializeIndustry,
  reconcileIndustrialOwnership,
} from '../packages/industry/index.js';
import { initializeGeopolitics } from '../packages/geopolitics/index.js';
import type { HistoricalEvent } from '../packages/contracts/index.js';
const setup = () => {
  const w = createWorld('industrial-ownership');
  w.pack.id = 'earth-fixture';
  const events: HistoricalEvent[] = [];
  const emit = (
    kind: string,
    personIds: string[],
    locationId: string | undefined,
    text: string,
    data: Record<string, unknown> = {},
    causeIds: string[] = [],
    significance = 0.5,
  ): HistoricalEvent => {
    const e = {
      id: `fact-${events.length}`,
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
  return { w, emit, events };
};
it('moves existing productive capacity on an actual control event, without creating national inventory', () => {
  const { w, emit, events } = setup();
  const state = initializeIndustry(w);
  const totals = Object.fromEntries(
    goods.map((g) => [g, Object.values(state.polities).reduce((n, p) => n + p.capacity[g], 0)]),
  );
  const stocks = JSON.stringify(
    Object.fromEntries(Object.entries(state.polities).map(([id, p]) => [id, p.goods])),
  );
  const from = w.polities[0].id,
    to = w.polities[1].id,
    cities = w.settlements.filter((s) => s.polityId === from);
  for (const s of cities) {
    s.polityId = to;
    emit('territory_occupied', [], s.id, 'fixture control', { settlementId: s.id });
  }
  emit('birthday', [], cities[0].id, 'unrelated later fact');
  const result = reconcileIndustrialOwnership(w, emit, events);
  for (const g of goods) {
    expect(state.polities[from].capacity[g]).toBe(0);
    expect(Object.values(state.polities).reduce((n, p) => n + p.capacity[g], 0)).toBeCloseTo(
      totals[g],
    );
  }
  expect(
    JSON.stringify(
      Object.fromEntries(Object.entries(state.polities).map(([id, p]) => [id, p.goods])),
    ),
  ).toBe(stocks);
  expect(result.transfers[0].sourceEventId).toBe(events[0].id);
  expect(reconcileIndustrialOwnership(w, emit, events).transfers).toHaveLength(0);
});
it('adds a zero-stock new industrial government and preserves existing political rules', () => {
  const { w, emit, events } = setup();
  const state = initializeIndustry(w);
  initializeGeopolitics(w, emit);
  const oldId = w.polities[0].id,
    law = w.geopolitics!.governments[oldId];
  law.laws.pressFreedom = 0.91;
  w.polities.push({ ...w.polities[0], id: 'new-state', treasury: 0, leaderId: '' });
  const s = w.settlements[0];
  s.polityId = 'new-state';
  emit('independence_declared', [], s.id, 'fixture', { settlementIds: [s.id] });
  reconcileIndustrialOwnership(w, emit, events);
  initializeGeopolitics(w, emit);
  expect(Object.values(state.polities['new-state'].goods).every((n) => n === 0)).toBe(true);
  expect(state.polities['new-state'].capacity.coal).toBeGreaterThan(0);
  expect(w.geopolitics!.governments['new-state']).toBeDefined();
  expect(w.geopolitics!.governments[oldId].laws.pressFreedom).toBe(0.91);
});
it('upgrades old capacity records without adding stocks and keeps per-good adjustments separate', () => {
  const { w, emit } = setup();
  const state = initializeIndustry(w),
    id = w.polities[0].id;
  delete state.capacityShares;
  const stocks = JSON.stringify(state.ledger),
    capacity = { ...state.polities[id].capacity };
  reconcileIndustrialOwnership(w, emit);
  expect(JSON.stringify(state.ledger)).toBe(stocks);
  expect(state.polities[id].capacity.coal).toBeCloseTo(capacity.coal);
  state.polities[id].capacity.oil *= 2;
  reconcileIndustrialOwnership(w, emit);
  expect(state.polities[id].capacity.oil).toBeCloseTo(capacity.oil * 2);
  expect(state.polities[id].capacity.coal).toBeCloseTo(capacity.coal);
});
