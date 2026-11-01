import { expect, it } from 'vitest';
import { createWorld } from '../packages/world-packs/index.js';
import { population, type HistoricalEvent, type World } from '../packages/contracts/index.js';
import {
  advanceGeopolitics,
  initializeGeopolitics,
  type War,
} from '../packages/geopolitics/index.js';
import type { Emit } from '../packages/simulation-core/index.js';

function fixture(adults = 10_000) {
  const w = createWorld('sustained-combat', 71, 300);
  w.pack = { id: 'earth-attrition', version: 'test' };
  w.calendar = { startYear: 1800, mode: 'historical-simulation', sources: [] };
  w.settlements = ['town-0', 'town-6', 'town-7'].map((id) =>
    w.settlements.find((s) => s.id === id)!,
  );
  w.polities = w.polities.slice(0, 2);
  w.persons = [];
  w.organizations = [];
  w.routes = [];
  for (const p of w.polities) {
    p.treasury = 10_000_000;
    p.military = 1000;
    p.leaderId = '';
  }
  const [a, target, b] = w.settlements;
  a.neighbors = [target.id];
  target.neighbors = [a.id, b.id];
  b.neighbors = [target.id];
  for (const s of w.settlements) {
    s.cohort = { ...s.cohort, children: 0, adults: s === b ? 0 : adults, elders: 0 };
    s.food = 100_000;
    s.unrest = 0;
  }
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
      id: `${w.id}:e${++w.eventSeq}`,
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
  initializeGeopolitics(w, emit);
  const cause = emit('war_started', [], a.id, 'Recorded dispute caused mobilization');
  const war: War = {
    id: 'sustained-war',
    a: a.polityId,
    b: target.polityId,
    campA: [a.polityId],
    campB: [target.polityId],
    started: 0,
    status: 'active',
    causeIds: [cause.id],
    fronts: [
      {
        aSettlementId: a.id,
        bSettlementId: target.id,
        control: 0.5,
        supply: 0.5,
        kind: 'land',
        forceA: 0,
        forceB: 0,
      },
    ],
    mobilized: {},
    supplyFulfillment: {},
    consumedSupplies: {},
    casualties: {},
    occupied: [],
    months: 0,
    settlementOwnerBefore: {},
  };
  w.geopolitics!.wars.push(war);
  const relation = w.geopolitics!.relations[[war.a, war.b].sort().join('~')];
  relation.status = 'war';
  relation.causeIds = [cause.id];
  relation.disputeEvidenceId = cause.id;
  const tick = () => {
    w.month++;
    advanceGeopolitics(w, emit, new Map());
  };
  return { w, war, a, b, target, events, tick };
}

it('carries fractional losses across real small engagements and JSON save/load', () => {
  const { w, war, tick } = fixture();
  const before = population(w),
    deaths = w.audit.deaths;
  tick();
  expect(w.audit.deaths - deaths).toBe(0);
  expect(Object.values(war.casualtyRemainder ?? {}).some((n) => n > 0 && n < 1)).toBe(true);
  // Rehydration preserves pending fractions, rather than resetting sub-person damage.
  war.casualtyRemainder = JSON.parse(JSON.stringify(war.casualtyRemainder));
  for (let i = 1; i < 10; i++) tick();
  const lost = Object.values(war.casualties).reduce((n, v) => n + v, 0);
  expect(lost).toBeGreaterThan(0);
  expect(w.audit.deaths - deaths).toBe(lost);
  expect(before - population(w)).toBe(lost);
  expect(Object.values(war.casualtyRemainder!).every((n) => n >= 0 && n < 1)).toBe(true);
});

it('cannot occupy or inflict battle deaths without any mobilizable forces', () => {
  const { w, war, events, tick } = fixture(0);
  war.fronts[0].control = 0.99;
  tick();
  expect(w.audit.deaths).toBe(0);
  expect(events.filter((e) => e.kind === 'territory_occupied')).toHaveLength(0);
});

it('commits one city result from fixed coalitions instead of flipping endpoint owners within a month', () => {
  const { w, war, a, b, target, events, tick } = fixture();
  a.cohort.adults *= 4;
  war.fronts[0].control = 0.95;
  // A persisted front can retain earlier momentum after its A endpoint was occupied.
  war.fronts.push({
    aSettlementId: target.id,
    bSettlementId: b.id,
    control: 0.05,
    supply: 0.5,
    kind: 'land',
    forceA: 0,
    forceB: 0,
  });
  tick();
  const changes = events.filter(
    (e) => e.kind === 'territory_occupied' && e.locationId === target.id,
  );
  expect(changes).toHaveLength(1);
  expect(target.polityId).toBe(war.a);
  expect(changes[0].data.previousOwner).toBe(war.b);
  expect(changes[0].data.occupierId).toBe(war.a);
  tick();
  expect(
    events.filter((e) => e.kind === 'territory_occupied' && e.locationId === target.id),
  ).toHaveLength(1);
  expect(war.settlementOwnerBefore[target.id]).toBe(war.b);
  expect(war.occupied.filter((id) => id === target.id)).toHaveLength(1);
  // A later, actually supported counterattack is allowed; it is not a loop-order flip.
  a.cohort.adults = 0;
  b.cohort.adults = 40_000;
  tick();
  const recaptures = events.filter(
    (e) => e.kind === 'territory_occupied' && e.locationId === target.id,
  );
  expect(recaptures).toHaveLength(2);
  expect(recaptures[1].month).toBeGreaterThan(recaptures[0].month);
  expect(target.polityId).toBe(war.b);
  expect(war.occupied).not.toContain(target.id);
});
