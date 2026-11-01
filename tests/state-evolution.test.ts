import { it, expect } from 'vitest';
import { createWorld } from '../packages/world-packs/index.js';
import { applyHistoricalStartControl } from '../packages/sovereignty/index.js';
import { initializeIndustry } from '../packages/industry/index.js';
import { initializeGeopolitics, type War } from '../packages/geopolitics/index.js';
import {
  advancePoliticalOutcomes,
  advanceStateEvolution,
} from '../packages/state-evolution/index.js';
import { population, type HistoricalEvent } from '../packages/contracts/index.js';
function fixture(tags: number) {
  const w = createWorld('public-support');
  w.pack.id = 'earth-1900';
  w.calendar = { startYear: 1900, mode: 'historical-simulation', sources: [] };
  w.polities = ['IND', 'GBR', 'FRA'].map((id) => ({
    ...w.polities[0],
    id,
    name: id,
    treasury: 100,
    legitimacy: 0.1,
    leaderId: '',
  }));
  w.settlements = w.settlements.slice(0, 2);
  Object.assign(w.settlements[0], {
    id: 'earth-city-234',
    polityId: 'IND',
    regionId: 'IND',
    neighbors: [],
    unrest: 0.5,
  });
  w.settlements[0].cohort = { id: 'cohort-ind', children: 0, adults: 100000, elders: 0 };
  Object.assign(w.settlements[1], {
    id: 'opponent-city',
    polityId: 'FRA',
    regionId: 'FRA',
    neighbors: [],
  });
  w.persons = w.persons.slice(0, 3);
  for (const p of w.persons) {
    p.locationId = 'earth-city-234';
    p.birth = -360;
  }
  w.organizations = w.organizations.slice(0, 1);
  Object.assign(w.organizations[0], {
    id: 'public-council',
    locationId: 'earth-city-234',
    memberIds: w.persons.map((p) => p.id),
    treasury: 100,
    status: 'active',
  });
  applyHistoricalStartControl(w);
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
      id: `public-fact-${events.length}`,
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
  initializeIndustry(w);
  initializeGeopolitics(w, emit);
  w.month = 1;
  w.movements = {
    version: 1,
    month: 1,
    movements: {
      campaign: {
        movementId: 'campaign',
        regionId: 'IND',
        controller: 'GBR',
        organizationIds: ['public-council'],
        namedSupporterIds: w.persons.map((p) => p.id),
        aggregateSupporters: tags,
        orientation: 'independence',
        sourceIds: ['public-action'],
        lastMonth: 1,
        status: 'active',
        treasury: 5,
      },
    },
  };
  return { w, events, emit };
}
it('cannot turn three named organizers into an independent mass polity without actual support', () => {
  const { w, emit } = fixture(0);
  advancePoliticalOutcomes(w, emit);
  expect(w.settlements[0].polityId).toBe('GBR');
  expect(w.polities.some((p) => p.id === 'IND')).toBe(false);
});
it('links accumulated support to sovereignty, productive assets and a real end to obsolete war fronts', () => {
  const { w, events, emit } = fixture(30000);
  const before = population(w);
  const stocks = Object.values(w.industry!.polities).reduce((n, p) => n + p.goods.arms, 0);
  const war: War = {
    id: 'fixture-war',
    a: 'GBR',
    b: 'FRA',
    campA: ['GBR'],
    campB: ['FRA'],
    started: 0,
    status: 'active',
    causeIds: ['dispute'],
    fronts: [
      {
        aSettlementId: 'earth-city-234',
        bSettlementId: 'opponent-city',
        control: 0.5,
        supply: 1,
        kind: 'land',
        forceA: 100,
        forceB: 100,
      },
    ],
    mobilized: { GBR: 100, FRA: 100 },
    supplyFulfillment: { GBR: 1, FRA: 1 },
    consumedSupplies: { GBR: { arms: 0, fuel: 0 }, FRA: { arms: 0, fuel: 0 } },
    casualties: { GBR: 0, FRA: 0 },
    occupied: [],
    months: 8,
    settlementOwnerBefore: {},
  };
  w.geopolitics!.wars = [war];
  advancePoliticalOutcomes(w, emit);
  advanceStateEvolution(w, emit, events);
  expect(w.settlements[0].polityId).toBe('IND');
  expect(w.industry!.polities.IND.capacity.coal).toBeGreaterThan(0);
  expect(w.industry!.polities.IND.goods.arms).toBe(0);
  expect(Object.values(w.industry!.polities).reduce((n, p) => n + p.goods.arms, 0)).toBeCloseTo(
    stocks,
  );
  expect(war.status).toBe('ended');
  expect(war.mobilized.GBR).toBe(0);
  expect(w.movements!.movements.campaign.treasury).toBe(0);
  expect(population(w)).toBe(before);
  expect(events.some((e) => e.kind === 'peace_treaty')).toBe(true);
});
