import { expect, it } from 'vitest';
import { createWorld } from '../packages/world-packs/index.js';
import { advanceEarthEvents } from '../packages/world-packs/earth/events.js';
import { random } from '../packages/simulation-core/random.js';
import type { HistoricalEvent } from '../packages/contracts/index.js';

it('initializes a newly born child before a historical hazard can injure them', () => {
  const w = createWorld('child-hazard');
  w.pack.id = 'earth-fixture';
  w.calendar = { startYear: 2050, mode: 'historical-simulation', sources: [] };
  w.month = 1;
  w.parameters.lifeComplexity = true;
  const p = w.persons[0],
    s = w.settlements.find((s) => s.id === p.locationId)!;
  w.persons = [p];
  p.birth = 0;
  p.occupation = '孩童';
  p.coin = 0;
  delete p.life;
  s.economy = {
    unemployment: 0.1,
    healthcare: 0.2,
    education: 0.2,
    infrastructure: 0.4,
    inflation: 0.02,
    productionMultiplier: 1,
    tradeMultiplier: 1,
  };
  w.shocks = [
    {
      id: 'fixture-conflict',
      kind: 'war',
      severity: 1,
      started: 0,
      ends: 120,
      locationIds: [s.id],
      causeId: 'fixture-source',
    },
  ];
  for (let i = 0; i < 10000; i++)
    if (random(`child-seed-${i}`, w.month, p.id, 'fixture-conflict', 'injury') < 0.95 * 0.015) {
      w.seed = `child-seed-${i}`;
      break;
    }
  const events: HistoricalEvent[] = [];
  advanceEarthEvents(
    w,
    (kind, personIds, locationId, text, data = {}, causeIds = [], significance = 0.5) => {
      const e = {
        id: `fixture-${events.length}`,
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
    },
  );
  expect(events.some((e) => e.kind === 'historical_injury')).toBe(true);
  expect(w.persons[0].life?.injury).toBe('历史事件中的伤病');
  expect(p.health).toBeLessThan(1);
});
