import { writeFileSync } from 'node:fs';
import { MACRO_SCENARIOS, type MacroScenarioName } from '../packages/v4/macro-scenarios.js';
import { advanceAggregatePopulation, estimateAnnualRisks } from '../packages/v4/statistics.js';
import { populationFromAgeBands } from '../packages/v4/macro.js';
import { MACRO_DEFAULT_REGION } from '../packages/v4/macro.js';
import type { MacroParameters, RegionalPopulation } from '../packages/v4/macro.js';
import type { Person, WorldDate } from '../packages/v4/domain.js';

const scenarios: MacroScenarioName[] = [
  'historical-vienna-1912-1920',
  'peaceful-vienna',
  'public-health-improvement',
  'food-and-sanitation-crisis',
];
const start: WorldDate = { year: 1912, month: 1 };
const birth: Person = {
  id: 'cohort:birth',
  name: 'cohort',
  sex: 'female',
  born: { year: 1912, month: 1 },
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
function region(parameters: MacroParameters) {
  return {
    id: MACRO_DEFAULT_REGION,
    name: 'Vienna',
    scope: 'region' as const,
    effectiveFrom: start,
    parameters,
    source: 'scenario',
  };
}
function survival(params: MacroParameters, soldier = false): number {
  let alive = 1;
  let expected = 0;
  for (let age = 0; age <= 105; age += 1) {
    const risk = estimateAnnualRisks(
      { ...birth, born: { year: 1912 - age, month: 1 } },
      start,
      region(params),
      { soldier },
    ).total;
    expected += alive * risk * (age + 0.5);
    alive *= 1 - risk;
    if (alive < 1e-7) break;
  }
  return expected;
}
function underFive(params: MacroParameters): number {
  let alive = 1;
  for (let age = 0; age < 5; age += 1) {
    const risk = estimateAnnualRisks(
      { ...birth, born: { year: 1912 - age, month: 1 } },
      start,
      region(params),
    ).total;
    alive *= 1 - risk;
  }
  return 1 - alive;
}
const results: any[] = [];
for (const name of scenarios) {
  const profile = MACRO_SCENARIOS[name];
  let population: RegionalPopulation = populationFromAgeBands(
    MACRO_DEFAULT_REGION,
    { '0-4': 80000, '5-14': 150000, '15-44': 430000, '45-64': 200000, '65+': 70000 },
    26,
    start,
  );
  const yearly: any[] = [];
  for (let year = 1912; year <= 1920; year += 1) {
    const params = profile.parametersForYear(year);
    population = advanceAggregatePopulation(population, params, { year: year + 1, month: 1 }, 26);
    yearly.push({
      year,
      births: population.births,
      deaths: population.deaths,
      total:
        population.unnamedByAgeSex.female.reduce((a, b) => a + b, 0) +
        population.unnamedByAgeSex.male.reduce((a, b) => a + b, 0) +
        population.namedAlive,
    });
  }
  const params1918 = profile.parametersForYear(1918);
  results.push({
    name,
    label: profile.label,
    lifeExpectancyAtBirth1912: Number(survival(profile.parametersForYear(1912)).toFixed(1)),
    underFiveMortality1912: Number(underFive(profile.parametersForYear(1912)).toFixed(3)),
    soldierRisk1916: Number(
      estimateAnnualRisks(
        { ...birth, sex: 'male', born: { year: 1891, month: 1 } },
        { year: 1916, month: 1 },
        region(profile.parametersForYear(1916)),
        { soldier: true },
      ).total.toFixed(4),
    ),
    warCause1916: Number(
      estimateAnnualRisks(
        { ...birth, sex: 'male', born: { year: 1891, month: 1 } },
        { year: 1916, month: 1 },
        region(profile.parametersForYear(1916)),
        { soldier: true },
      ).causes.war.toFixed(4),
    ),
    influenzaPneumonia1918: Number(
      estimateAnnualRisks(
        { ...birth, born: { year: 1890, month: 1 } },
        { year: 1918, month: 1 },
        region(params1918),
      ).causes.pneumonia.toFixed(4),
    ),
    populationStart: 930000,
    populationEnd: yearly.at(-1)?.total,
    totalBirths: yearly.reduce((sum, row) => sum + row.births, 0),
    totalDeaths: yearly.reduce((sum, row) => sum + row.deaths, 0),
    yearly,
  });
}
writeFileSync('docs/v4/phase-3-scenarios.json', JSON.stringify(results, null, 2) + '\n');
console.log(JSON.stringify(results, null, 2));
