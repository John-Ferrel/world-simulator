import { it, expect } from 'vitest';
import { createWorld } from '../packages/world-packs/index.js';
import { runWorldSystems } from '../packages/world-systems/index.js';
import type { HistoricalEvent, Person, World } from '../packages/contracts/index.js';
const tick = (w: World) => {
  const events: HistoricalEvent[] = [];
  runWorldSystems(
    w,
    new Map(w.settlements.map((s) => [s.id, [] as Person[]])),
    (kind, personIds, locationId, text, data = {}, causeIds = [], significance = 0.5) => {
      const e = {
        id: `fact${events.length}`,
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
    events,
  );
};
it('does not multiply national political pressure merely by splitting a geographic catchment', () => {
  const a = createWorld('resolution-invariance');
  a.persons = [];
  a.organizations = [];
  a.conflicts = [];
  a.polities = a.polities.slice(0, 1);
  a.polities[0].legitimacy = 0.7;
  a.settlements = a.settlements.slice(0, 1);
  const s = a.settlements[0];
  s.neighbors = [];
  s.fertility = 0;
  s.food = 24000000;
  s.coin = 24000000;
  s.cohort = { id: 'cohort', children: 600000, adults: 2000000, elders: 400000 };
  const b = structuredClone(a),
    part = structuredClone(b.settlements[0]);
  for (const t of [b.settlements[0], part]) {
    t.food /= 2;
    t.coin /= 2;
    t.cohort.children /= 2;
    t.cohort.adults /= 2;
    t.cohort.elders /= 2;
  }
  part.id = 'split-area';
  part.cohort.id = 'split-cohort';
  b.settlements.push(part);
  tick(a);
  tick(b);
  expect(a.polities[0].legitimacy).toBeCloseTo(b.polities[0].legitimacy, 12);
  expect(a.polities[0].treasury).toBeCloseTo(b.polities[0].treasury, 9);
  expect(a.audit.consumedFood).toBe(b.audit.consumedFood);
});
