import { it, expect } from 'vitest';
import { createEarthWorld, distance } from '../packages/world-packs/earth/index.js';
import { advance, assertWorld } from '../packages/simulation-core/index.js';
import { population } from '../packages/contracts/index.js';
import { appearanceLayers, dollAssets } from '../packages/visuals/paper-doll.js';
import { spawnAdult } from './helpers/spawn.js';
it('creates real global geography and keeps map, routes and population grounded', () => {
  const w = createEarthWorld('earth-test');
  expect(w.calendar?.startYear).toBe(1900);
  expect(w.settlements.length).toBeGreaterThan(7000);
  expect(new Set(w.settlements.map((s) => s.regionId ?? s.polityId)).size).toBeGreaterThan(160);
  expect(w.polities.find((p) => p.id === 'CHN')?.name).toBe('中国');
  expect(w.polities.some((p) => p.id === 'historical-gw-300')).toBe(true);
  const delhi = w.settlements.find((s) => s.regionId === 'IND' && s.name.includes('德里'));
  expect(delhi?.polityId).toBe('GBR');
  expect(w.settlements.some((s) => s.name === '北京')).toBe(true);
  expect(w.settlements.some((s) => s.name === '伦敦')).toBe(true);
  expect(population(w)).toBe(w.baselinePopulation);
  expect(population(w)).toBeGreaterThan(1.5e9);
  expect(population(w)).toBeLessThan(1.8e9);
  expect(w.routes!.every((r) => r.km >= 0 && w.settlements.some((s) => s.id === r.from))).toBe(
    true,
  );
  expect(distance({ lat: 0, lon: 0 }, { lat: 0, lon: 1 })).toBeCloseTo(111.19, 0);
  assertWorld(w);
});
it('historical inputs change economics, work and personal experience with shared provenance', () => {
  let w = createEarthWorld('earth-events', 1, 300, 2020);
  const source: any[] = [];
  for (let i = 0; i < 4; i++) {
    const result = advance(w);
    w = result.world;
    source.push(...result.events);
  }
  const historical = source.find(
    (e) => e.kind === 'historical_source' && e.data.sourceId === 'covid',
  );
  expect(historical.data.sourceUrl).toContain('who.int');
  expect(w.settlements[0].economy!.unemployment).toBeGreaterThan(0.05);
  expect(w.persons[0].life?.lastDecision?.reason).toBeTruthy();
  const effect = source.find((e) => e.kind === 'world_impact' && e.data.sourceId === 'covid');
  expect(effect.causeIds).toContain(historical.id);
  expect(effect.data.classification).toBe('simulated-consequence');
  assertWorld(w);
});
it('composites actual independent licensed layers, wardrobe variants and age changes', () => {
  const p = createEarthWorld('dolls').persons[0];
  const normal = appearanceLayers({ ...p, age: 25 });
  expect(normal.length).toBeGreaterThanOrEqual(6);
  expect(normal.some((l) => l.asset.slot === 'body')).toBe(true);
  expect(normal.some((l) => l.asset.slot === 'head')).toBe(true);
  expect(normal.some((l) => l.asset.slot === 'top')).toBe(true);
  const older = appearanceLayers({ ...p, age: 75 });
  expect(older.find((l) => l.asset.slot === 'head')?.asset.id).toContain('elderly');
  expect(dollAssets.length).toBeGreaterThan(120);
});

it('progresses disease through real state, recovery, and population consequences without owner protection', async () => {
  const original = createEarthWorld('earth-health', 1, 300, 2020);
  let a = original,
    b = structuredClone(original);
  b.persons[0].ownerId = 'observer';
  const facts: any[] = [];
  for (let i = 0; i < 24; i++) {
    const next = advance(a);
    a = next.world;
    facts.push(...next.events);
    b = advance(b).world;
    await new Promise<void>((resolve) => setImmediate(resolve));
  }
  delete b.persons[0].ownerId;
  expect(a).toEqual(b);
  expect(a.settlements.some((s) => (s.disease?.immune ?? 0) > 0)).toBe(true);
  expect(facts.some((e) => e.kind === 'illness')).toBe(true);
  expect(facts.some((e) => e.kind === 'illness_recovered')).toBe(true);
  const sources = new Set(facts.filter((e) => e.kind === 'historical_source').map((e) => e.id));
  expect(
    facts
      .filter((e) => e.kind === 'illness')
      .every((e) => e.causeIds.some((id: string) => sources.has(id))),
  ).toBe(true);
  assertWorld(a);
});

it('refines a coarse running Earth without creating people or resources or rewriting lives', async () => {
  const legacy = (
    await import('../packages/world-packs/earth/legacy-cities.json', { with: { type: 'json' } })
  ).default;
  const { connectEarthCities } = await import('../packages/world-packs/earth/geography.js');
  const w = createEarthWorld('refine-earth');
  const keep = new Set(legacy.map((c) => c.id));
  for (const s of w.settlements)
    if (
      !w.settlements.some(
        (other) =>
          keep.has(other.id) && other.polityId === s.polityId && other.regionId === s.regionId,
      )
    )
      keep.add(s.id);
  const retained = w.settlements.filter((s) => keep.has(s.id));
  for (const s of w.settlements) {
    if (keep.has(s.id)) continue;
    const target = retained.find((t) => t.polityId === s.polityId && t.regionId === s.regionId)!;
    for (const key of ['children', 'adults', 'elders'] as const)
      target.cohort[key] += s.cohort[key];
    for (const key of ['food', 'coin', 'sourcePopulation'] as const)
      target[key] = (target[key] ?? 0) + (s[key] ?? 0);
    for (const p of w.persons) if (p.locationId === s.id) p.locationId = target.id;
  }
  w.settlements = retained;
  connectEarthCities(w);
  w.month = 17;
  const people = structuredClone(w.persons),
    total = population(w);
  const sum = (key: 'food' | 'coin') => w.settlements.reduce((n, s) => n + s[key], 0);
  const food = sum('food'),
    coin = sum('coin');
  const result = advance(w, [{ id: 'expand-1', kind: 'expand_earth', version: 1 }], false);
  expect(result.results[0].ok).toBe(true);
  expect(result.world.settlements.length).toBeGreaterThan(7000);
  expect(result.world.month).toBe(17);
  expect(population(result.world)).toBe(total);
  expect(result.world.persons).toEqual(people);
  expect(result.world.settlements.reduce((n, s) => n + s.food, 0) / food).toBeCloseTo(1, 12);
  expect(result.world.settlements.reduce((n, s) => n + s.coin, 0) / coin).toBeCloseTo(1, 12);
  expect(result.events.some((e) => e.kind === 'geography_expanded')).toBe(true);
  const repeated = advance(
    result.world,
    [{ id: 'expand-2', kind: 'expand_earth', version: 1 }],
    false,
  );
  expect(repeated.results[0].value).toEqual({ added: 0 });
  expect(repeated.events).toHaveLength(0);
  assertWorld(result.world);
});

it('ages by elapsed months and records a birthday from canonical birth dates', () => {
  const w = createEarthWorld('age-test');
  const p = w.persons[0];
  w.month = 11;
  p.birth = -18 * 12;
  const result = advance(w);
  const current = result.world.persons.find((q) => q.id === p.id)!;
  expect(current.birth).toBe(p.birth);
  expect((result.world.month - current.birth) / 12).toBe(19);
  expect(
    result.events.find((e) => e.kind === 'birthday' && e.personIds.includes(p.id))?.data.age,
  ).toBe(19);
});

it('lets a later-created ordinary person participate in an ongoing historical war with inspectable effects', async () => {
  const { history, historyMonth } = await import('../packages/world-packs/earth/history.js');
  const w = createEarthWorld('history-participant');
  w.parameters.openHistory = false; // Explicit anchored-history regression; open-history mediation is tested separately.
  expect(history.length).toBeGreaterThanOrEqual(70);
  expect(history.every((h) => h.url.startsWith('https://'))).toBe(true);
  // Begin just before July 1914, with earlier inputs acknowledged; no fabricated earlier personal history.
  w.month = 14 * 12 + 5;
  w.appliedSourceEvents = history.filter((h) => historyMonth(h.date, 1900) < 174).map((h) => h.id);
  const { random } = await import('../packages/simulation-core/random.js');
  const victim = w.persons[0];
  victim.locationId = w.settlements.find((s) => s.name === '巴黎')!.id;
  victim.ownerId = 'vulnerable-player';
  let nonce = 0;
  while (random(w.seed, 174, `exposed-${nonce}`, 'historical-mortality') >= 0.85 * 0.0015) nonce++;
  victim.id = `exposed-${nonce}`;
  const started = advance(w);
  const victimDeath = started.events.find(
    (e) => e.kind === 'death' && e.personIds.includes(victim.id),
  );
  expect(victimDeath).toBeTruthy();
  const source = started.events.find(
    (e) => e.kind === 'historical_source' && e.data.sourceId === 'wwi',
  )!;
  expect(source).toBeTruthy();
  expect(victimDeath!.causeIds).toContain(source.id);
  expect(started.world.persons.find((p) => p.id === victim.id)?.deathCause).toContain(
    '第一次世界大战',
  );
  const paris = started.world.settlements.find((s) => s.name === '巴黎')!;
  const fixture = spawnAdult(started.world, {
    id: 'late-doctor',
    name: '后来者',
    age: 24,
    occupation: '医护人员',
    locationId: paris.id,
    ownerId: 'late-observer',
  });
  expect(fixture.birth).toBe(started.world.month - 24 * 12);
  const result = advance(started.world);
  const p = result.world.persons.find((p) => p.id === 'late-doctor')!;
  const encounter = result.events.find(
    (e) => e.kind === 'world_impact' && e.personIds.includes(p.id),
  )!;
  expect(encounter.causeIds).toContain(source.id);
  expect(p.life?.history?.find((h) => h.sourceId === 'wwi')?.role).toBe('caregiver');
  expect(result.world.shocks?.find((q) => q.id === 'wwi')?.stats?.casualties).toBeGreaterThan(0);
  expect(result.world.shocks?.find((q) => q.id === 'wwi')?.stats?.consumedSupply).toBeGreaterThan(
    0,
  );
  const matched = structuredClone(result.world);
  delete matched.persons.find((q) => q.id === p.id)!.ownerId;
  const next = advance(result.world),
    ordinary = advance(matched);
  delete next.world.persons.find((q) => q.id === p.id)!.ownerId;
  expect(next).toEqual(ordinary);
});

it('distinguishes real shared land borders from overseas connections', async () => {
  const { countriesShareLandBorder } = await import('../packages/world-packs/earth/geography.js');
  expect(countriesShareLandBorder('FRA', 'DEU')).toBe(true);
  expect(countriesShareLandBorder('CHN', 'IND')).toBe(true);
  expect(countriesShareLandBorder('GBR', 'FRA')).toBe(false);
  expect(countriesShareLandBorder('USA', 'RUS')).toBe(false);
});
