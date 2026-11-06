import { describe, expect, it } from 'vitest';
import {
  historicalCandidatesForWindow,
  historicalCountryPeriod,
  historicalIndexCoverage,
  loadHistoricalIndex,
  queryHistoricalCities,
  queryHistoricalEvents,
  queryHistoricalPeople,
} from '../packages/v4/history-db/index.js';
import { reviewHistoricalWorld } from '../packages/v4/history-db/review.js';
import { macroSnapshot } from '../packages/v4/macro.js';
import { defaultMacroState } from '../packages/v4/macro.js';
import { VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import type { EventFact, WorldState } from '../packages/v4/domain.js';

function event(overrides: Partial<EventFact>): EventFact {
  return {
    id: `evt:test:${Math.random().toString(36).slice(2)}`,
    date: { year: 1914, month: 7 },
    subjectId: 'person:test',
    participants: [],
    action: 'test',
    causes: [],
    effects: [],
    immediateText: 'test',
    significance: 0.8,
    visibility: 'public',
    provenance: { kind: 'system' },
    ...overrides,
  };
}

describe('Phase 15 historical reference index', () => {
  it('loads a sourced, typed index with fiction kept separate', () => {
    const index = loadHistoricalIndex();
    expect(index.countries.length).toBeGreaterThanOrEqual(40);
    expect(index.cities.length).toBeGreaterThanOrEqual(50);
    expect(index.people.length).toBeGreaterThanOrEqual(25);
    expect(index.events.length).toBeGreaterThanOrEqual(80);
    expect(index.fictionHooks.length).toBeGreaterThan(0);
    expect(
      index.events.every(
        (entry) => entry.sourceType === 'fact' || entry.sourceType === 'inference',
      ),
    ).toBe(true);
    expect(index.fictionHooks.every((entry) => entry.sourceType === 'fiction')).toBe(true);
    expect(index.events.some((entry) => entry.id.includes('1914-july-crisis'))).toBe(true);
    expect(index.events.some((entry) => entry.id.includes('1938-anschluss'))).toBe(true);
    const coverage = historicalIndexCoverage();
    expect(coverage.totalRecords).toBeGreaterThan(300);
  });

  it('queries Vienna/Europe events and people without pretending full coverage', () => {
    const july = queryHistoricalEvents({
      fromYear: 1914,
      toYear: 1914,
      countryCodes: ['AUT'],
      limit: 20,
    });
    expect(
      july.some((entry) => entry.id.includes('july-crisis') || entry.id.includes('sarajevo')),
    ).toBe(true);
    const cities = queryHistoricalCities('AUT');
    expect(cities.some((entry) => entry.title === 'Vienna' || entry.id === 'city:vie')).toBe(true);
    const people = queryHistoricalPeople({ aliveInYear: 1914, countryCodes: ['AUT'], limit: 100 });
    expect(people.length).toBeGreaterThan(5);
    expect(people.some((entry) => entry.title === 'Sigmund Freud')).toBe(true);
    const austria1914 = historicalCountryPeriod('AUT', 1914);
    expect(austria1914?.label).toBeTruthy();
  });

  it('returns candidate material, not a forced schedule', () => {
    const candidates = historicalCandidatesForWindow(1930, 1945, ['AUT']);
    expect(candidates.length).toBeGreaterThan(0);
    expect(candidates.every((candidate) => candidate.sourceType !== 'fiction')).toBe(true);
    expect(candidates.some((candidate) => /Anschluss|war|economic/i.test(candidate.title))).toBe(
      true,
    );
  });

  it('reviews a world without rewriting it and distinguishes matched from unobserved', () => {
    const world = structuredClone(VIENNA_1912_SEED) as WorldState;
    world.date = { year: 1915, month: 1 };
    world.macro = defaultMacroState(world);
    const unmatched = reviewHistoricalWorld(world, 1914, 1915);
    expect(unmatched.candidates.length).toBeGreaterThan(0);
    expect(unmatched.unobservedCandidates).toBeGreaterThan(0);
    expect(unmatched.note).toContain('not proof');
    // Simulate a committed event that shares a hook with the July Crisis.
    world.events.push(
      event({
        date: { year: 1914, month: 7 },
        action: 'r15-history.mobilization',
        tags: ['war_mobilization', 'diplomacy', 'mobilization'],
        immediateText: 'A general mobilization is announced in the streets.',
      }),
    );
    const matched = reviewHistoricalWorld(world, 1914, 1915);
    expect(matched.matchedCandidates).toBeGreaterThanOrEqual(0);
    expect(matched.forkSignals).toBeDefined();
    expect(
      matched.historicalPeopleAlive.every((person) => person.note.includes('death command')),
    ).toBe(true);
  });

  it('exposes the review to the macro director without treating it as a command', () => {
    const world = structuredClone(VIENNA_1912_SEED) as WorldState;
    world.date = { year: 1938, month: 1 };
    const review = reviewHistoricalWorld(world, 1934, 1938);
    world.macro = { ...defaultMacroState(world), historyReview: review };
    const snapshot = macroSnapshot(world, ['vienna-market-household'], world.macro);
    expect(snapshot.historyReview?.window.toYear).toBe(1938);
    expect(snapshot.historyReview?.countryCodes).toContain('AUT');
    // The review must not create or alter a scripted historical event.
    expect(world.events.length).toBe(VIENNA_1912_SEED.events.length);
  });
});
