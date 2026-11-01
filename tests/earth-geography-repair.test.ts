import { describe, expect, it } from 'vitest';
import type { Settlement, World } from '../packages/contracts/index.js';
import { createWorld, newPerson } from '../packages/world-packs/index.js';
import { createEarthWorld } from '../packages/world-packs/earth/index.js';
import { repairDuplicateEarthSettlements } from '../packages/world-packs/earth/repair-geography.js';

function settlement(
  id: string,
  lon: number,
  lat: number,
  neighbors: string[],
  coin: number,
  food: number,
): Settlement {
  return {
    id,
    name: 'Niamey',
    x: (lon + 180) * 4,
    y: (85 - lat) * 4,
    lon,
    lat,
    biome: 'plains',
    neighbors,
    polityId: 'NER',
    cohort: { id: `cohort-${id}`, children: 10, adults: 20, elders: 5 },
    food,
    coin,
    fertility: 1,
    knowledge: 0.2,
    prosperity: 0.5,
    scarcity: 0,
    price: 1,
    unrest: 0,
    birthRemainder: 0,
    deathRemainder: 0,
    sourcePopulation: 35,
  };
}
function legacyWorld(): World {
  const w = createWorld('earth-geography-repair');
  w.pack.id = 'earth-1900';
  w.polities = [
    {
      id: 'NER',
      name: 'Niger',
      color: '#888888',
      treasury: 100,
      legitimacy: 0.5,
      tax: 0.1,
      leaderId: '',
      military: 0,
      research: 0,
    },
  ];
  w.settlements = [
    settlement('earth-city-60', 2.11471, 13.518652, ['neighbor'], 100, 200),
    settlement('earth-city-60', 7.096404, 13.491643, ['neighbor'], 80, 160),
    settlement('neighbor', 3, 14, ['earth-city-60'], 50, 90),
  ];
  const person = newPerson(w, 'named-niamey-person', 'earth-city-60', 0, 30);
  person.coin = 13;
  person.memories.push({ id: 'saved-memory', eventId: 'saved-event', month: 4, salience: 0.7 });
  w.persons = [person];
  w.claims = [
    {
      id: 'saved-claim',
      subjectId: person.id,
      predicate: 'A saved historical belief',
      truth: 'unknown',
      sourceIds: ['saved-event'],
    },
  ];
  w.routes = [
    {
      id: 'legacy-route',
      from: 'earth-city-60',
      to: 'neighbor',
      km: 999,
      mode: 'road',
      capacity: 321,
      status: 'restricted',
    },
  ];
  return w;
}
const totals = (w: World) => ({
  people: w.persons.length,
  population: w.settlements.reduce(
    (n, s) => n + s.cohort.children + s.cohort.adults + s.cohort.elders,
    0,
  ),
  settlementCoin: w.settlements.reduce((n, s) => n + s.coin, 0),
  settlementFood: w.settlements.reduce((n, s) => n + s.food, 0),
  personalCoin: w.persons.reduce((n, p) => n + p.coin, 0),
});

describe('Earth geography duplicate-ID repair', () => {
  it('creates Earth worlds with unique Niamey IDs and keeps each source point distinct', () => {
    const w = createEarthWorld('unique-earth-cities', 1, 1, 1900);
    const ids = w.settlements.map((s) => s.id);
    expect(ids.length).toBe(new Set(ids).size);
    const niamey = w.settlements.filter((s) => s.name === 'Niamey');
    expect(niamey).toHaveLength(2);
    expect(niamey.map((s) => s.id).sort()).toEqual(['earth-city-60', 'earth-ne-1159149391']);
    expect(niamey.find((s) => s.id === 'earth-city-60')).toMatchObject({ lon: 2.11471 });
    expect(niamey.find((s) => s.id === 'earth-ne-1159149391')).toMatchObject({
      lon: 7.096404,
    });
  }, 30_000);

  it('repairs an old save once, preserves legacy references and conserves resources', () => {
    const w = legacyWorld();
    const before = totals(w);
    const oldRoute = structuredClone(w.routes![0]);
    const savedMemory = structuredClone(w.persons[0]!.memories);
    const savedClaims = structuredClone(w.claims);
    const repairs = repairDuplicateEarthSettlements(w);
    expect(repairs).toHaveLength(1);
    expect(repairs[0]).toMatchObject({
      duplicateId: 'earth-city-60',
      keptSettlementId: 'earth-city-60',
      addedSettlementId: 'earth-ne-1159149391',
      sourceCityId: 'earth-ne-1159149391',
    });
    expect(w.settlements.map((s) => s.id)).toEqual([
      'earth-city-60',
      'earth-ne-1159149391',
      'neighbor',
    ]);
    expect(w.persons[0]?.locationId).toBe('earth-city-60');
    expect(w.settlements[0]?.cohort.id).toBe('cohort-earth-city-60');
    expect(w.settlements[1]?.cohort.id).toBe('cohort-earth-ne-1159149391');
    expect(w.routes?.find((route) => route.id === oldRoute.id)).toMatchObject({
      id: oldRoute.id,
      mode: oldRoute.mode,
      capacity: oldRoute.capacity,
      status: oldRoute.status,
    });
    expect(
      w.routes?.some(
        (route) => route.from === 'earth-ne-1159149391' || route.to === 'earth-ne-1159149391',
      ),
    ).toBe(true);
    expect(w.routes?.find((route) => route.id === oldRoute.id)?.km).not.toBe(oldRoute.km);
    expect(totals(w)).toEqual(before);
    expect(w.persons[0]?.memories).toEqual(savedMemory);
    expect(w.claims).toEqual(savedClaims);
    expect(repairDuplicateEarthSettlements(w)).toEqual([]);
    expect(totals(w)).toEqual(before);
  });
});
