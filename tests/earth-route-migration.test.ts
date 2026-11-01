import { expect, it } from 'vitest';
import { createWorld } from '../packages/world-packs/index.js';
import { advance } from '../packages/simulation-core/index.js';
import { population } from '../packages/contracts/index.js';

it('migrates legacy land-border route modes once on a canonical Earth tick and preserves route state', () => {
  const w = createWorld('earth-route-migration');
  w.pack = { id: 'earth-1900', version: 'legacy-test' };
  w.calendar = { startYear: 1900, mode: 'historical-simulation', sources: [] };
  const towns = ['town-0', 'town-6', 'town-12'];
  const countries = ['FRA', 'DEU', 'USA'];
  w.settlements = w.settlements.filter((s) => towns.includes(s.id));
  w.polities = w.polities.slice(0, 3);
  for (let i = 0; i < 3; i++) {
    w.polities[i].id = countries[i];
    w.settlements[i].polityId = countries[i];
    w.settlements[i].neighbors = [];
  }
  const keep = new Set(towns);
  w.persons = w.persons.filter((p) => keep.has(p.locationId));
  const living = new Set(w.persons.map((p) => p.id));
  for (const p of w.persons) {
    p.relationships = p.relationships.filter((r) => living.has(r.personId));
    p.parents = p.parents.filter((id) => living.has(id));
  }
  w.organizations = [];
  w.routes = [
    {
      id: 'legacy-fr-de',
      from: towns[0],
      to: towns[1],
      km: 900,
      mode: 'sea',
      capacity: 17,
      status: 'restricted',
    },
    {
      id: 'legacy-fr-us',
      from: towns[0],
      to: towns[2],
      km: 8000,
      mode: 'air',
      capacity: 91,
      status: 'open',
    },
  ];
  w.settlements[0].neighbors = [towns[1], towns[2]];
  w.settlements[1].neighbors = [towns[0]];
  w.settlements[2].neighbors = [towns[0]];
  w.baselinePopulation = population(w);
  const routesBefore = structuredClone(w.routes);

  const migrated = advance(w);
  const land = migrated.world.routes!.find((r) => r.id === 'legacy-fr-de')!;
  const sea = migrated.world.routes!.find((r) => r.id === 'legacy-fr-us')!;
  const event = migrated.events.find((e) => e.kind === 'earth_land_route_modes_migrated');
  expect(land.mode).toBe('rail');
  expect(land.id).toBe(routesBefore[0].id);
  expect(land.capacity).toBe(routesBefore[0].capacity);
  expect(land.status).toBe(routesBefore[0].status);
  expect(sea.mode).toBe(routesBefore[1].mode);
  expect(sea.id).toBe(routesBefore[1].id);
  expect(sea.capacity).toBe(routesBefore[1].capacity);
  expect(sea.status).toBe(routesBefore[1].status);
  expect(event?.data).toMatchObject({
    migration: 'earth-land-route-modes',
    version: 1,
    changedRouteIds: ['legacy-fr-de'],
  });
  expect(migrated.world.migrations?.earthLandRouteModes).toEqual({
    version: 1,
    eventId: event?.id,
    month: migrated.world.month,
  });

  const repeated = advance(migrated.world);
  expect(repeated.events.some((e) => e.kind === 'earth_land_route_modes_migrated')).toBe(false);
  expect(repeated.world.migrations?.earthLandRouteModes).toEqual(
    migrated.world.migrations?.earthLandRouteModes,
  );
  expect(repeated.world.routes!.find((r) => r.id === 'legacy-fr-de')?.mode).toBe('rail');
});
