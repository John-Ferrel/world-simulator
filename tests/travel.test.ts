import { describe, expect, it } from 'vitest';
import { createWorld } from '../packages/world-packs/index.js';
import { advanceTravel } from '../packages/travel/index.js';
import { advanceLife, initializeLife } from '../packages/cognition/life.js';
import type { HistoricalEvent, World } from '../packages/contracts/index.js';
import type { Emit } from '../packages/simulation-core/index.js';
const fixture = (km = 1000, capacity = 10000) => {
  const w = createWorld('travel-check');
  w.calendar = { startYear: 1900, mode: 'historical-simulation', sources: [] };
  w.parameters.lifeComplexity = true;
  const a = w.settlements[0],
    b = w.settlements[1];
  w.settlements = [a, b];
  w.persons = w.persons.slice(0, 3);
  for (const p of w.persons) {
    p.locationId = a.id;
    p.coin = 20;
    p.health = 1;
    p.birth = -240;
    p.relationships = [];
    p.plans = [];
    initializeLife(p, w);
  }
  a.food = b.food = 10000;
  a.neighbors = [b.id];
  b.neighbors = [a.id];
  w.routes = [{ id: 'road', from: a.id, to: b.id, km, mode: 'road', capacity, status: 'open' }];
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
    const e = {
      id: `e${events.length}`,
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
  const plan = (i = 0) =>
    w.persons[i].plans.push({
      id: `trip-${i}`,
      kind: 'migrate',
      step: 0,
      targetId: b.id,
      reserved: 3,
      deadline: 30,
      status: 'active',
      causeIds: [],
    });
  const tick = () => {
    w.month++;
    advanceTravel(w, emit);
  };
  return { w, a, b, events, emit, plan, tick };
};
describe('route-constrained personal travel', () => {
  it('takes time, consumes real provisions, conserves money and records departure and arrival', () => {
    const f = fixture();
    f.plan();
    const money = f.a.coin + f.b.coin + f.w.persons.reduce((n, p) => n + p.coin, 0);
    f.tick();
    const p = f.w.persons[0];
    expect(p.locationId).toBe(f.a.id);
    expect(p.journey?.progressKm).toBeGreaterThan(0);
    expect(f.a.food).toBe(9999);
    expect(f.w.audit.consumedFood).toBe(1);
    for (let i = 0; i < 8 && p.journey; i++) f.tick();
    expect(p.locationId).toBe(f.b.id);
    expect(p.plans[0].status).toBe('complete');
    expect(f.events.filter((e) => e.kind === 'migration')).toHaveLength(1);
    expect(f.events.find((e) => e.kind === 'migration')?.causeIds).toContain(f.events[0].id);
    expect(f.a.coin + f.b.coin + f.w.persons.reduce((n, p) => n + p.coin, 0)).toBeCloseTo(money);
  });
  it('does not teleport through a removed route and sends a real failure to replanning', () => {
    const f = fixture();
    f.plan();
    f.tick();
    f.w.routes = [];
    f.tick();
    const p = f.w.persons[0];
    expect(p.locationId).toBe(f.a.id);
    expect(p.journey).toBeUndefined();
    expect(p.plans[0].status).toBe('failed');
    expect(f.w.agency?.needsReplan[p.id].causeIds).toContain(f.events.at(-1)?.id);
  });
  it('limits simultaneous passengers and does not give an owned person extra access', () => {
    const f = fixture(2000, 100);
    f.plan(0);
    f.plan(1);
    f.w.persons[0].ownerId = 'observer';
    f.tick();
    expect(f.w.persons.filter((p) => p.journey)).toHaveLength(1);
    const ownerless = structuredClone(f.w);
    delete ownerless.persons[0].ownerId;
    f.w.month++;
    ownerless.month++;
    advanceTravel(f.w, f.emit);
    advanceTravel(ownerless, f.emit);
    expect(f.w.persons.map((p) => [p.locationId, p.journey?.progressKm, p.coin])).toEqual(
      ownerless.persons.map((p) => [p.locationId, p.journey?.progressKm, p.coin]),
    );
  });
  it('enforces wartime border closure and never repeats the same monthly journey effect', () => {
    const f = fixture();
    f.plan();
    f.tick();
    const p = f.w.persons[0],
      before = p.coin,
      progress = p.journey!.progressKm;
    advanceTravel(f.w, f.emit);
    expect(p.coin).toBe(before);
    expect(p.journey!.progressKm).toBe(progress);
    f.b.polityId = f.w.polities[1].id;
    f.w.geopolitics = {
      relations: {
        [[f.a.polityId, f.b.polityId].sort().join('~')]: {
          status: 'war',
          causeIds: ['declaration'],
        },
      },
      wars: [],
    } as unknown as NonNullable<World['geopolitics']>;
    f.tick();
    expect(p.journey!.progressKm).toBe(progress);
    expect(f.events.at(-1)?.kind).toBe('journey_blocked');
    expect(f.events.at(-1)?.causeIds).toContain('declaration');
    expect(f.w.audit.consumedFood).toBe(2);
  });
  it('suspends local career and school activity during a journey', () => {
    const f = fixture();
    f.plan();
    f.tick();
    const p = f.w.persons[0],
      experience = p.life!.career.experience,
      months = p.life!.education.months;
    advanceLife(f.w, p, f.emit);
    expect(p.life!.career.experience).toBe(experience);
    expect(p.life!.education.months).toBe(months);
    expect(p.life!.lastDecision?.kind).toBe('travel');
  });
  it('selects a feasible faster parallel route, and detects a reused route ID with changed endpoints', () => {
    const f = fixture(5000);
    f.plan();
    f.w.routes!.push({ ...f.w.routes![0], id: 'fast-rail', mode: 'rail' });
    f.tick();
    expect(f.w.persons[0].journey?.routeId).toBe('fast-rail');
    f.w.routes!.find((r) => r.id === 'fast-rail')!.to = 'another-town';
    f.tick();
    expect(f.w.persons[0].plans[0].status).toBe('failed');
    expect(f.w.persons[0].locationId).toBe(f.a.id);
  });
});
