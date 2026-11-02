import {
  MACRO_DEFAULT_PARAMETERS,
  POPULATION_MAX_AGE,
  moveBackgroundCohorts,
  normalizeUnnamedCohorts,
  personAgeBand,
  populationTotal,
  type MacroParameters,
  type MacroRegion,
  type MacroState,
  type PopulationAgeBand,
  type PopulationByAgeBand,
  type PopulationSex,
  type RegionalPopulation,
} from './macro.js';
import { ageAt, type Person, type WorldDate, type WorldState } from './domain.js';

/**
 * Statistical engine.
 *
 * It answers one question: given a region's macro conditions and one person's
 * exposure, what are the annual competing risks? It does not choose scenes,
 * write prose or mutate the world. The engine calls it once per year and owns
 * the single final death commit.
 */

export type DeathCause =
  | 'infant_diarrhoea'
  | 'pneumonia'
  | 'tuberculosis'
  | 'childbirth'
  | 'war'
  | 'accident'
  | 'violence'
  | 'famine'
  | 'old_age'
  | 'other';

export const DEATH_CAUSE_TEXT: Record<DeathCause, string> = {
  infant_diarrhoea: '婴幼儿腹泻与脱水',
  pneumonia: '肺炎',
  tuberculosis: '肺结核',
  childbirth: '产后感染与出血',
  war: '战争创伤',
  accident: '意外事故',
  violence: '暴力',
  famine: '饥饿与衰竭',
  old_age: '老年衰竭',
  other: '急性疾病',
};

export type RiskBreakdown = {
  age: number;
  ageBand: PopulationAgeBand;
  /** Probability of at least one death in the next 12 months. */
  total: number;
  causes: Record<DeathCause, number>;
  /** Multipliers retained for auditability. */
  modifiers: {
    sanitation: number;
    food: number;
    healthcare: number;
    war: number;
    epidemic: number;
    violence: number;
  };
};

const AGE_BANDS: PopulationAgeBand[] = ['0-4', '5-14', '15-44', '45-64', '65+'];

const BASELINE_HAZARD: Record<PopulationAgeBand, number> = {
  '0-4': 0.045,
  '5-14': 0.003,
  '15-44': 0.006,
  '45-64': 0.02,
  '65+': 0.11,
};

const AGE_CAUSE_WEIGHTS: Record<PopulationAgeBand, Partial<Record<DeathCause, number>>> = {
  '0-4': {
    infant_diarrhoea: 0.35,
    pneumonia: 0.3,
    accident: 0.08,
    other: 0.27,
  },
  '5-14': {
    pneumonia: 0.18,
    tuberculosis: 0.12,
    accident: 0.3,
    other: 0.4,
  },
  '15-44': {
    tuberculosis: 0.18,
    pneumonia: 0.12,
    accident: 0.27,
    violence: 0.03,
    childbirth: 0.18,
    other: 0.22,
  },
  '45-64': {
    tuberculosis: 0.12,
    pneumonia: 0.2,
    accident: 0.16,
    violence: 0.02,
    other: 0.5,
  },
  '65+': {
    pneumonia: 0.22,
    old_age: 0.55,
    accident: 0.05,
    other: 0.18,
  },
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function finite(value: number, fallback: number): number {
  return Number.isFinite(value) ? value : fallback;
}

export function ageBand(age: number): PopulationAgeBand {
  return personAgeBand(age);
}

function baselineHazardForAge(age: number): number {
  if (age < 1) return 0.15;
  if (age < 5) return 0.01;
  if (age < 15) return 0.002;
  if (age < 25) return 0.0035;
  if (age < 45) return 0.0045;
  if (age < 65) return 0.012;
  if (age < 80) return 0.05;
  return 0.15;
}

function ageBandBaselineHazard(band: PopulationAgeBand): number {
  const values: Record<PopulationAgeBand, number> = {
    '0-4': 0.04,
    '5-14': 0.003,
    '15-44': 0.0055,
    '45-64': 0.018,
    '65+': 0.11,
  };
  return values[band];
}

/** Apply macro modifiers to one cause hazard. */
function modifyCause(
  cause: DeathCause,
  hazard: number,
  parameters: MacroParameters,
  age: number,
  options: { soldier: boolean; postpartum: boolean },
): number {
  const sanitation = clamp(parameters.sanitation, 0, 1);
  const food = clamp(parameters.foodSupply, 0, 1);
  const healthcare = clamp(parameters.healthcare, 0, 1);
  const medicalTech = clamp(parameters.medicalTech, 0, 1);
  const war = clamp(parameters.warIntensity, 0, 1);
  const stability = clamp(parameters.stability, 0, 1);
  const persecution = clamp(parameters.persecution, 0, 1);
  const infectionMod = 0.7 + (1 - sanitation) * 1.2;
  const foodMod = 1 + (1 - food) * 1.8;
  const careMod = 1.25 - healthcare * 0.65;
  const techMod = 1 - medicalTech * 0.25;
  let value = hazard;
  switch (cause) {
    case 'infant_diarrhoea':
      value *= infectionMod * foodMod * (0.8 + careMod * 0.2);
      break;
    case 'pneumonia':
    case 'tuberculosis':
      value *= infectionMod * foodMod * careMod * techMod;
      break;
    case 'childbirth':
      value *= careMod * (0.8 + medicalTech * 0.2);
      break;
    case 'war':
      value += options.soldier
        ? 0.12 * war * clamp(parameters.militaryExposure, 0, 1)
        : 0.012 * war * clamp(parameters.civilianExposure, 0, 1);
      break;
    case 'violence':
      value += 0.003 * (1 - stability) + 0.02 * persecution;
      break;
    case 'famine':
      value += 0.035 * (1 - food) * (1 - food) * (age < 5 ? 2 : 1);
      break;
    case 'accident':
      // Accidents become slightly more likely in unstable, war-damaged areas.
      value *= 1 + (1 - stability) * 0.25 + war * 0.15;
      break;
    case 'old_age':
      value *= 1 + (1 - healthcare) * 0.3;
      break;
    default:
      value *= foodMod * infectionMod * careMod;
      break;
  }
  return Math.max(0, value);
}

export function estimateAnnualRisks(
  person: Person,
  date: WorldDate,
  region: MacroRegion | undefined,
  options: { soldier?: boolean; excludeCauses?: DeathCause[] } = {},
): RiskBreakdown {
  const parameters = region?.parameters ?? MACRO_DEFAULT_PARAMETERS;
  const age = ageAt(person, date);
  const band = ageBand(age);
  const base = baselineHazardForAge(age);
  const weights = AGE_CAUSE_WEIGHTS[band];
  const soldier = options.soldier === true || person.roles.includes('soldier');
  const postpartum =
    Boolean(person.health.postpartumUntil) &&
    (person.health.postpartumUntil?.year ?? 0) * 12 + (person.health.postpartumUntil?.month ?? 0) >=
      date.year * 12 + date.month;
  const causes = {} as Record<DeathCause, number>;
  for (const cause of Object.keys(DEATH_CAUSE_TEXT) as DeathCause[]) {
    const weight = weights[cause] ?? 0;
    let hazard = base * weight;
    if (cause === 'childbirth') {
      hazard = postpartum ? 0.015 : 0;
    }
    if (cause === 'famine') {
      hazard = 0;
    }
    causes[cause] = modifyCause(cause, hazard, parameters, age, { soldier, postpartum });
  }
  // Epidemic hazards are cause-specific and age-sensitive. A 1918 influenza
  // wave is not the same as endemic tuberculosis.
  const influenza = clamp(parameters.epidemicInfluenza, 0, 1);
  if (influenza > 0) {
    const fluWeight = age >= 20 && age < 45 ? 0.04 : age < 5 || age >= 65 ? 0.02 : 0.012;
    causes.pneumonia += influenza * fluWeight * (1.2 - clamp(parameters.healthcare, 0, 1) * 0.4);
  }
  const cholera = clamp(parameters.epidemicCholera, 0, 1);
  if (cholera > 0) causes.infant_diarrhoea += cholera * 0.03 * (0.6 + (1 - parameters.sanitation));
  const typhus = clamp(parameters.epidemicTyphus, 0, 1);
  if (typhus > 0) causes.other += typhus * 0.02 * (0.6 + (1 - parameters.sanitation));
  const tb = clamp(parameters.epidemicTuberculosis, 0, 1);
  if (tb > 0 && age >= 15 && age < 65) causes.tuberculosis += tb * 0.006;
  const capability =
    person.lifeContract?.capability ??
    person.life?.flags.find((flag) => flag.startsWith('capability:'))?.slice(11);
  for (const cause of options.excludeCauses ?? []) causes[cause] = 0;
  const totalHazard =
    Object.values(causes).reduce((sum, value) => sum + value, 0) *
    (capability === 'frail_body' ? 1.15 : 1);
  return {
    age,
    ageBand: band,
    total: clamp(1 - Math.exp(-totalHazard), 0, 1),
    causes,
    modifiers: {
      sanitation: 0.7 + (1 - parameters.sanitation) * 1.2,
      food: 1 + (1 - parameters.foodSupply) * 1.8,
      healthcare: 1.25 - parameters.healthcare * 0.65,
      war: parameters.warIntensity,
      epidemic: Math.max(
        parameters.epidemicInfluenza,
        parameters.epidemicCholera,
        parameters.epidemicTyphus,
      ),
      violence: 0.003 * (1 - parameters.stability) + 0.02 * parameters.persecution,
    },
  };
}

export function sampleDeathCause(risks: RiskBreakdown, rng: () => number): DeathCause | undefined {
  if (risks.total <= 0) return undefined;
  if (rng() >= risks.total) return undefined;
  const totalHazard = Object.values(risks.causes).reduce((sum, value) => sum + value, 0);
  if (totalHazard <= 0) return 'other';
  let ticket = rng() * totalHazard;
  for (const cause of Object.keys(risks.causes) as DeathCause[]) {
    ticket -= risks.causes[cause];
    if (ticket < 0) return cause;
  }
  return 'other';
}

export type InfectionName = 'pneumonia' | 'tuberculosis' | 'typhoid' | 'dysentery';

export function infectionNameForAge(age: number, rng: () => number): InfectionName {
  if (age < 5) return rng() < 0.55 ? 'dysentery' : 'pneumonia';
  if (age >= 15 && age < 60) return rng() < 0.3 ? 'tuberculosis' : 'pneumonia';
  return rng() < 0.2 ? 'typhoid' : 'pneumonia';
}

/**
 * Probability that a person without an active illness develops one this year.
 * This is intentionally separate from the death hazard: infection is a state
 * transition, and recovery/worsening is processed next year by the engine.
 */
export function annualInfectionRisk(
  person: Person,
  age: number,
  parameters: MacroParameters,
): number {
  const infant = age < 1 ? 0.18 : age < 5 ? 0.08 : age < 15 ? 0.035 : age < 65 ? 0.025 : 0.05;
  const sanitation = clamp(parameters.sanitation, 0, 1);
  const food = clamp(parameters.foodSupply, 0, 1);
  const care = clamp(parameters.healthcare, 0, 1);
  return clamp(
    infant * (0.7 + (1 - sanitation) * 1.3) * (1 + (1 - food) * 0.8) * (1.1 - care * 0.3),
    0,
    0.6,
  );
}

export function recoveryRisk(age: number, parameters: MacroParameters): number {
  const base = age < 5 ? 0.55 : age >= 65 ? 0.45 : 0.75;
  return clamp(base + parameters.healthcare * 0.2 + parameters.medicalTech * 0.1, 0.2, 0.98);
}

function emptyPopulation(regionId: string, date: WorldDate): RegionalPopulation {
  return {
    regionId,
    unnamedByAgeSex: {
      female: Array.from({ length: POPULATION_MAX_AGE + 1 }, () => 0),
      male: Array.from({ length: POPULATION_MAX_AGE + 1 }, () => 0),
    },
    namedAlive: 0,
    births: 0,
    deaths: 0,
    migrations: 0,
    lastUpdated: date,
  };
}

function cohortRisk(
  age: number,
  sex: PopulationSex,
  parameters: MacroParameters,
  date: WorldDate,
): number {
  // The statistical risk function only reads age, roles and health. A minimal
  // cohort person lets the aggregate population use exactly the same formula
  // as named people without creating Person rows.
  const person = {
    born: { year: date.year - age, month: 1 },
    roles: [],
    health: { postpartumUntil: undefined },
  } as unknown as Person;
  return estimateAnnualRisks(person, date, {
    id: 'cohort',
    name: 'cohort',
    scope: 'region',
    effectiveFrom: date,
    parameters,
    source: 'aggregate',
  }).total;
}

/**
 * Advance the unnamed aggregate population by one year.
 *
 * Single-year × sex cohorts age exactly one step. Births are added at age 0,
 * deaths are removed from the exact age/sex cell, and no migration is silently
 * invented here; cross-region moves go through `moveBackgroundCohorts`.
 */
export function advanceAggregatePopulation(
  population: RegionalPopulation,
  parameters: MacroParameters,
  date: WorldDate,
  namedAlive: number,
): RegionalPopulation {
  const cohorts = normalizeUnnamedCohorts(population);
  const aged: RegionalPopulation['unnamedByAgeSex'] = {
    female: Array.from({ length: POPULATION_MAX_AGE + 1 }, () => 0),
    male: Array.from({ length: POPULATION_MAX_AGE + 1 }, () => 0),
  };
  for (const sex of ['female', 'male'] as const) {
    for (let age = 0; age <= POPULATION_MAX_AGE; age += 1) {
      const nextAge = Math.min(POPULATION_MAX_AGE, age + 1);
      aged[sex][nextAge] += cohorts[sex][age] ?? 0;
    }
  }
  const next: RegionalPopulation = {
    ...structuredClone(population),
    unnamedByAgeSex: aged,
    namedAlive,
    births: 0,
    deaths: 0,
    migrations: 0,
    lastUpdated: { ...date },
  };
  delete next.unnamedByAgeBand;

  const women = Array.from({ length: 30 }, (_, index) => index + 15).reduce(
    (sum, age) => sum + (aged.female[age] ?? 0),
    0,
  );
  const births = women * 0.065;
  aged.female[0] += births * 0.488;
  aged.male[0] += births * 0.512;
  next.births = births;

  for (const sex of ['female', 'male'] as const) {
    for (let age = 0; age <= POPULATION_MAX_AGE; age += 1) {
      const count = aged[sex][age] ?? 0;
      if (count <= 0) continue;
      const dead = count * clamp(cohortRisk(age, sex, parameters, date), 0, 0.5);
      aged[sex][age] = Math.max(0, count - dead);
      next.deaths += dead;
    }
  }
  return next;
}

export function updateMacroPopulation(
  state: MacroState,
  world: WorldState,
  date: WorldDate,
): MacroState {
  const next = structuredClone(state);
  for (const region of Object.values(next.regions)) {
    const population = next.population[region.id] ?? emptyPopulation(region.id, date);
    const placeIds = new Set(
      Object.values(world.places)
        .filter((place) => (place.regionId ?? 'region-lower-austria') === region.id)
        .map((place) => place.id),
    );
    const namedAlive = Object.values(world.persons).filter(
      (person) => !person.died && placeIds.has(person.locationId),
    ).length;
    next.population[region.id] = advanceAggregatePopulation(
      population,
      region.parameters,
      date,
      namedAlive,
    );
  }
  // Migration pressure moves real cohort members between regions. The source
  // and destination both change, so the world total is conserved.
  const destinations = Object.values(next.regions).sort(
    (a, b) =>
      b.parameters.foodSupply +
      b.parameters.stability -
      (a.parameters.foodSupply + a.parameters.stability),
  );
  for (const source of Object.values(next.regions)) {
    if (source.parameters.migrationPressure <= 0.01) continue;
    const destination = destinations.find((candidate) => candidate.id !== source.id);
    if (!destination) continue;
    const sourcePopulation = next.population[source.id];
    const destinationPopulation = next.population[destination.id];
    if (!sourcePopulation || !destinationPopulation) continue;
    const cohorts = normalizeUnnamedCohorts(sourcePopulation);
    const moves: { age: number; sex: 'female' | 'male'; count: number }[] = [];
    for (const sex of ['female', 'male'] as const) {
      for (let age = 18; age <= 40; age += 1) {
        const count = Math.floor(
          (cohorts[sex][age] ?? 0) * 0.002 * source.parameters.migrationPressure,
        );
        if (count > 0) moves.push({ age, sex, count });
      }
    }
    moveBackgroundCohorts(next, source.id, destination.id, moves);
  }
  return next;
}

/** Refresh only the named count after scenes/births, without aging cohorts. */
export function refreshNamedPopulation(state: MacroState, world: WorldState): MacroState {
  const next = structuredClone(state);
  for (const region of Object.values(next.regions)) {
    const placeIds = new Set(
      Object.values(world.places)
        .filter((place) => (place.regionId ?? 'region-lower-austria') === region.id)
        .map((place) => place.id),
    );
    const population = next.population[region.id];
    if (!population) continue;
    population.namedAlive = Object.values(world.persons).filter(
      (person) => !person.died && placeIds.has(person.locationId),
    ).length;
    population.lastUpdated = { ...world.date };
  }
  return next;
}

export function populationSummary(state: MacroState): {
  named: number;
  unnamed: number;
  total: number;
} {
  let named = 0;
  let unnamed = 0;
  for (const population of Object.values(state.population)) {
    named += population.namedAlive;
    const cohorts = normalizeUnnamedCohorts(population);
    unnamed += cohorts.female.reduce((sum, value) => sum + value, 0);
    unnamed += cohorts.male.reduce((sum, value) => sum + value, 0);
  }
  return { named, unnamed, total: named + unnamed };
}
