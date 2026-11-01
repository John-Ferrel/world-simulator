import { describe, expect, it } from 'vitest';
import { MACRO_SCENARIOS, scenarioWorldMacro } from '../packages/v4/macro-scenarios.js';
import { macroContentGaps } from '../packages/v4/content-author/macro-gap.js';
import { GENERATED_PACKS } from '../packages/v4/content/generated/index.js';
import { VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import { advanceAggregatePopulation, estimateAnnualRisks } from '../packages/v4/statistics.js';
import {
  MACRO_DEFAULT_REGION,
  type MacroParameters,
  type RegionalPopulation,
} from '../packages/v4/macro.js';
import type { Person, WorldDate } from '../packages/v4/domain.js';

const date: WorldDate = { year: 1918, month: 1 };

function person(age: number, sex: Person['sex'] = 'female'): Person {
  return {
    id: `cohort:${age}`,
    name: 'cohort',
    sex,
    born: { year: date.year - age, month: 1 },
    locationId: 'place-wien',
    householdId: 'household:cohort',
    parentIds: [],
    guardianIds: [],
    health: { vitality: 1, conditions: [], nutrition: 1 },
    traits: {
      care: 0.5,
      ambition: 0.5,
      tradition: 0.5,
      openness: 0.5,
      conscientiousness: 0.5,
      extraversion: 0.5,
      agreeableness: 0.5,
      neuroticism: 0.5,
    },
    education: { status: 'none', level: 0 },
    roles: [],
    projectIds: [],
    relationshipIds: [],
    knowledgeIds: [],
    provenance: { kind: 'initial' },
  };
}

function region(parameters: MacroParameters) {
  return {
    id: MACRO_DEFAULT_REGION,
    name: 'Vienna',
    scope: 'region' as const,
    effectiveFrom: date,
    parameters,
    source: 'scenario',
  };
}

function lifeExpectancy(parameters: MacroParameters): number {
  let alive = 1;
  let expected = 0;
  for (let age = 0; age <= 105; age += 1) {
    const risk = estimateAnnualRisks(person(age), date, region(parameters)).total;
    expected += alive * risk * (age + 0.5);
    alive *= 1 - risk;
  }
  return expected;
}

function underFive(parameters: MacroParameters): number {
  let alive = 1;
  for (let age = 0; age < 5; age += 1)
    alive *= 1 - estimateAnnualRisks(person(age), date, region(parameters)).total;
  return 1 - alive;
}

function aggregate(paramsByYear: (year: number) => MacroParameters): RegionalPopulation {
  let population: RegionalPopulation = {
    regionId: MACRO_DEFAULT_REGION,
    unnamedByAgeBand: {
      '0-4': 80000,
      '5-14': 150000,
      '15-44': 430000,
      '45-64': 200000,
      '65+': 70000,
    },
    namedAlive: 26,
    births: 0,
    deaths: 0,
    migrations: 0,
    lastUpdated: { year: 1912, month: 1 },
  };
  for (let year = 1912; year <= 1920; year += 1)
    population = advanceAggregatePopulation(
      population,
      paramsByYear(year),
      { year: year + 1, month: 1 },
      26,
    );
  return population;
}

describe('Phase 3 historical scenarios', () => {
  it('historical Vienna has war and epidemic risk; the peaceful line has none', () => {
    const historical = MACRO_SCENARIOS['historical-vienna-1912-1920'].parametersForYear(1916);
    const peaceful = MACRO_SCENARIOS['peaceful-vienna'].parametersForYear(1916);
    const h = estimateAnnualRisks(
      person(25, 'male'),
      { year: 1916, month: 1 },
      region(historical),
      { soldier: true },
    );
    const p = estimateAnnualRisks(person(25, 'male'), { year: 1916, month: 1 }, region(peaceful), {
      soldier: true,
    });
    expect(h.causes.war).toBeGreaterThan(0);
    expect(p.causes.war).toBe(0);
    expect(h.total).toBeGreaterThan(p.total);
  });

  it('public health improvement lowers child mortality and raises life expectancy', () => {
    const baseline = MACRO_SCENARIOS['historical-vienna-1912-1920'].parametersForYear(1912);
    const improved = MACRO_SCENARIOS['public-health-improvement'].parametersForYear(1912);
    expect(underFive(improved)).toBeLessThan(underFive(baseline));
    expect(lifeExpectancy(improved)).toBeGreaterThan(lifeExpectancy(baseline));
  });

  it('food and sanitation crisis raises mortality and lowers population', () => {
    const baseline = MACRO_SCENARIOS['historical-vienna-1912-1920'].parametersForYear(1912);
    const crisis = MACRO_SCENARIOS['food-and-sanitation-crisis'].parametersForYear(1912);
    expect(underFive(crisis)).toBeGreaterThan(underFive(baseline));
    expect(lifeExpectancy(crisis)).toBeLessThan(lifeExpectancy(baseline));
    const b = aggregate((year) =>
      MACRO_SCENARIOS['historical-vienna-1912-1920'].parametersForYear(year),
    );
    const c = aggregate((year) =>
      MACRO_SCENARIOS['food-and-sanitation-crisis'].parametersForYear(year),
    );
    expect(c.deaths).toBeGreaterThan(b.deaths);
  });

  it('aggregate population keeps named people separate from background cohorts', () => {
    const params = MACRO_SCENARIOS['historical-vienna-1912-1920'].parametersForYear(1912);
    const next = advanceAggregatePopulation(
      {
        regionId: MACRO_DEFAULT_REGION,
        unnamedByAgeBand: {
          '0-4': 10000,
          '5-14': 10000,
          '15-44': 20000,
          '45-64': 10000,
          '65+': 5000,
        },
        namedAlive: 26,
        births: 0,
        deaths: 0,
        migrations: 0,
        lastUpdated: date,
      },
      params,
      { year: 1919, month: 1 },
      25,
    );
    expect(next.namedAlive).toBe(25);
    expect(next.births).toBeGreaterThan(0);
    expect(next.deaths).toBeGreaterThan(0);
    expect(next.unnamedByAgeBand['0-4']).not.toBe(10000);
  });

  it('turns a high war macro state into an explicit content gap for the author', () => {
    const w = structuredClone(VIENNA_1912_SEED);
    const macro = scenarioWorldMacro(w, 'historical-vienna-1912-1920', { year: 1916, month: 1 });
    const gaps = macroContentGaps(macro, GENERATED_PACKS);
    expect(gaps.some((gap) => gap.kind === 'war')).toBe(true);
  });
});
