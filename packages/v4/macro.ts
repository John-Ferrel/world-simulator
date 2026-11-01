import { z } from 'zod';
import {
  addMonths,
  ageAt,
  type Person,
  type SceneStage,
  type WorldDate,
  type WorldState,
} from './domain.js';

/**
 * Phase 3 macro contract.
 *
 * Macro state is deliberately small and typed. It never stores a target life
 * expectancy or an annual death count. It stores normalized regional
 * conditions; the statistical engine turns those conditions into individual
 * risks. A proposal is a bounded change to this state, not an executable rule.
 */

export const MACRO_DEFAULT_REGION = 'region-lower-austria';

export const MACRO_PARAM_KEYS = [
  'warIntensity',
  'militaryExposure',
  'civilianExposure',
  'foodSupply',
  'sanitation',
  'healthcare',
  'medicalTech',
  'stability',
  'persecution',
  'unemployment',
  'epidemicInfluenza',
  'epidemicTuberculosis',
  'epidemicCholera',
  'epidemicTyphus',
  'migrationPressure',
] as const;

export type MacroParamKey = (typeof MACRO_PARAM_KEYS)[number];
export type MacroParameters = Record<MacroParamKey, number>;

const PARAM_BOUNDS: Record<MacroParamKey, { min: number; max: number }> = {
  warIntensity: { min: 0, max: 1 },
  militaryExposure: { min: 0, max: 1 },
  civilianExposure: { min: 0, max: 1 },
  foodSupply: { min: 0, max: 1 },
  sanitation: { min: 0, max: 1 },
  healthcare: { min: 0, max: 1 },
  medicalTech: { min: 0, max: 1 },
  stability: { min: 0, max: 1 },
  persecution: { min: 0, max: 1 },
  unemployment: { min: 0, max: 1 },
  epidemicInfluenza: { min: 0, max: 1 },
  epidemicTuberculosis: { min: 0, max: 1 },
  epidemicCholera: { min: 0, max: 1 },
  epidemicTyphus: { min: 0, max: 1 },
  migrationPressure: { min: 0, max: 1 },
};

export const MACRO_DEFAULT_PARAMETERS: MacroParameters = {
  warIntensity: 0,
  militaryExposure: 0,
  civilianExposure: 0,
  foodSupply: 0.9,
  sanitation: 0.55,
  healthcare: 0.35,
  medicalTech: 0.15,
  stability: 0.75,
  persecution: 0,
  unemployment: 0.15,
  epidemicInfluenza: 0,
  epidemicTuberculosis: 0.25,
  epidemicCholera: 0,
  epidemicTyphus: 0,
  migrationPressure: 0,
};

export const POPULATION_AGE_BANDS = ['0-4', '5-14', '15-44', '45-64', '65+'] as const;
export type PopulationAgeBand = (typeof POPULATION_AGE_BANDS)[number];
export type PopulationByAgeBand = Record<PopulationAgeBand, number>;

export type RegionalPopulation = {
  regionId: string;
  /** Background population not represented by a Person row. */
  unnamedByAgeBand: PopulationByAgeBand;
  namedAlive: number;
  births: number;
  deaths: number;
  migrations: number;
  lastUpdated: WorldDate;
};

export type MacroRegion = {
  id: string;
  name: string;
  scope: 'world' | 'country' | 'region' | 'city';
  effectiveFrom: WorldDate;
  effectiveTo?: WorldDate;
  parameters: MacroParameters;
  source: string;
  notes?: string;
};

export type EventPoolState = {
  familyId: string;
  enabled: boolean;
  weightMultiplier: number;
  regions?: string[];
  stages?: SceneStage[];
  source: string;
  updatedAt: WorldDate;
};

export type MacroHistoryEntry = {
  id: string;
  appliedAt: WorldDate;
  regionId: string;
  summary: string;
  model: string;
  proposalId: string;
  parameterChanges: Partial<Record<MacroParamKey, number>>;
  eventPoolChanges: number;
  unmappedDevelopments: string[];
  effectiveFrom: WorldDate;
  durationMonths: number;
  confidence: number;
};

export type MacroState = {
  version: number;
  updatedAt: WorldDate;
  regions: Record<string, MacroRegion>;
  population: Record<string, RegionalPopulation>;
  eventPool: Record<string, EventPoolState>;
  history: MacroHistoryEntry[];
};

export type MacroDevelopmentType =
  | 'war'
  | 'peace'
  | 'food_shortage'
  | 'epidemic'
  | 'political_unrest'
  | 'persecution'
  | 'migration'
  | 'technology'
  | 'medical_progress'
  | 'economic_change'
  | 'social_change'
  | 'other';

export type MacroDevelopment = {
  type: MacroDevelopmentType;
  description: string;
  severity: number;
};

export type EventPoolChange = {
  familyId: string;
  enabled?: boolean;
  weightMultiplier?: number;
  regions?: string[];
  stages?: SceneStage[];
};

export type MacroProposal = {
  version: 1;
  regionId: string;
  effectiveFrom: WorldDate;
  durationMonths: number;
  summary: string;
  confidence: number;
  maintainStatus: boolean;
  developments: MacroDevelopment[];
  parameterChanges: Partial<Record<MacroParamKey, number>>;
  eventPoolChanges: EventPoolChange[];
};

export type MacroSnapshot = {
  date: WorldDate;
  regions: {
    id: string;
    name: string;
    parameters: MacroParameters;
    effectiveFrom: WorldDate;
    effectiveTo?: WorldDate;
    population: {
      namedAlive: number;
      unnamedTotal: number;
      total: number;
    };
  }[];
  recentEvents: {
    id: string;
    date: WorldDate;
    action: string;
    text: string;
    significance: number;
  }[];
  eventPool: {
    familyId: string;
    enabled: boolean;
    weightMultiplier: number;
  }[];
  availableFamilies: string[];
};

const MacroDateSchema = z.object({
  year: z.number().int().min(1900).max(2100),
  month: z.number().int().min(1).max(12),
});

const KNOWN_DEVELOPMENT_TYPES = [
  'war',
  'peace',
  'food_shortage',
  'epidemic',
  'political_unrest',
  'persecution',
  'migration',
  'technology',
  'medical_progress',
  'economic_change',
  'social_change',
  'other',
] as const;

const MacroDevelopmentSchema = z.object({
  // Models often name a concrete historical development. We keep the prose and
  // normalize an unfamiliar type to `other` rather than rejecting the whole
  // proposal; only schema/ranges/authority stay strict.
  type: z.string().trim().min(1).max(80),
  description: z.string().trim().min(1).max(500),
  severity: z.number().min(0).max(1),
});

const EventPoolChangeSchema = z.object({
  familyId: z.string().trim().min(1).max(160),
  enabled: z.boolean().optional(),
  weightMultiplier: z.number().min(0).max(3).optional(),
  regions: z.array(z.string().trim().min(1).max(120)).max(12).optional(),
  stages: z
    .array(z.enum(['infancy', 'childhood', 'adolescence', 'adulthood', 'elderhood']))
    .max(5)
    .optional(),
});

const MacroProposalSchema = z.object({
  version: z.literal(1),
  regionId: z.string().trim().min(1).max(120),
  effectiveFrom: MacroDateSchema,
  durationMonths: z.number().int().min(1).max(120),
  summary: z.string().trim().min(1).max(800),
  confidence: z.number().min(0).max(1),
  maintainStatus: z.boolean().default(false),
  developments: z.array(MacroDevelopmentSchema).max(8),
  parameterChanges: z.record(z.string(), z.number()).default({}),
  eventPoolChanges: z.array(EventPoolChangeSchema).max(16).default([]),
});

export class MacroContractError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MacroContractError';
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function cloneDate(date: WorldDate): WorldDate {
  return { year: date.year, month: date.month };
}

function regionPlaceIds(world: WorldState, regionId: string): string[] {
  return Object.values(world.places)
    .filter((place) => (place.regionId ?? MACRO_DEFAULT_REGION) === regionId)
    .map((place) => place.id);
}

export function regionIdForPerson(world: WorldState, person: Person): string {
  return world.places[person.locationId]?.regionId ?? MACRO_DEFAULT_REGION;
}

export function personAgeBand(age: number): PopulationAgeBand {
  if (age <= 4) return '0-4';
  if (age <= 14) return '5-14';
  if (age <= 44) return '15-44';
  if (age <= 64) return '45-64';
  return '65+';
}

export function populationTotal(population: RegionalPopulation): number {
  return (
    Object.values(population.unnamedByAgeBand).reduce((sum, count) => sum + Math.max(0, count), 0) +
    Math.max(0, population.namedAlive)
  );
}

function defaultPopulation(
  regionId: string,
  namedAlive: number,
  date: WorldDate,
): RegionalPopulation {
  // Vienna's background population is aggregate only. It never creates named
  // people, and named persons are counted separately so the two ledgers cannot
  // double count the same person.
  const background = regionId === MACRO_DEFAULT_REGION ? 1_900_000 : 0;
  const shares: PopulationByAgeBand = {
    '0-4': 0.09,
    '5-14': 0.16,
    '15-44': 0.46,
    '45-64': 0.21,
    '65+': 0.08,
  };
  return {
    regionId,
    unnamedByAgeBand: {
      '0-4': Math.round(background * shares['0-4']),
      '5-14': Math.round(background * shares['5-14']),
      '15-44': Math.round(background * shares['15-44']),
      '45-64': Math.round(background * shares['45-64']),
      '65+': Math.round(background * shares['65+']),
    },
    namedAlive,
    births: 0,
    deaths: 0,
    migrations: 0,
    lastUpdated: cloneDate(date),
  };
}

/**
 * Build the initial macro state from the current world. Existing worlds are
 * initialized lazily on their next load; no archived event is rewritten.
 */
export function defaultMacroState(world: WorldState, date: WorldDate = world.date): MacroState {
  const regionIds = new Set<string>();
  for (const place of Object.values(world.places))
    regionIds.add(place.regionId ?? MACRO_DEFAULT_REGION);
  if (regionIds.size === 0) regionIds.add(MACRO_DEFAULT_REGION);
  const regions: Record<string, MacroRegion> = {};
  const population: Record<string, RegionalPopulation> = {};
  for (const regionId of [...regionIds].sort()) {
    const placeIds = new Set(regionPlaceIds(world, regionId));
    const namedAlive = Object.values(world.persons).filter(
      (person) =>
        !person.died &&
        (placeIds.has(person.locationId) ||
          (regionId === MACRO_DEFAULT_REGION && !world.places[person.locationId]?.regionId)),
    ).length;
    regions[regionId] = {
      id: regionId,
      name:
        regionId === MACRO_DEFAULT_REGION
          ? 'Vienna / Lower Austria'
          : (Object.values(world.places).find((place) => place.regionId === regionId)?.name ??
            regionId),
      scope: regionId === MACRO_DEFAULT_REGION ? 'region' : 'region',
      effectiveFrom: cloneDate(date),
      parameters: { ...MACRO_DEFAULT_PARAMETERS },
      source: 'vienna-1912-baseline',
    };
    population[regionId] = defaultPopulation(regionId, namedAlive, date);
  }
  return {
    version: 1,
    updatedAt: cloneDate(date),
    regions,
    population,
    eventPool: {},
    history: [],
  };
}

export function ensureMacroState(world: WorldState): MacroState {
  return world.macro ? structuredClone(world.macro) : defaultMacroState(world);
}

export function eventPoolMultiplier(
  state: MacroState | undefined,
  definition: { id: string; familyId?: string; stage: SceneStage; tags: string[] },
  regionId: string,
): number {
  if (!state) return 1;
  const familyId = definition.familyId ?? definition.id;
  const policy = state.eventPool[familyId];
  if (!policy) return 1;
  if (!policy.enabled) return 0;
  if (policy.regions && policy.regions.length > 0 && !policy.regions.includes(regionId)) return 1;
  if (policy.stages && policy.stages.length > 0 && !policy.stages.includes(definition.stage))
    return 1;
  return clamp(policy.weightMultiplier, 0, 3);
}

function validateParameterChanges(
  changes: Record<string, number>,
  region: MacroRegion,
): Partial<Record<MacroParamKey, number>> {
  const result: Partial<Record<MacroParamKey, number>> = {};
  for (const [key, value] of Object.entries(changes)) {
    if (!(MACRO_PARAM_KEYS as readonly string[]).includes(key)) {
      throw new MacroContractError(`未知宏观参数 ${key}`);
    }
    if (!Number.isFinite(value) || Math.abs(value) > 0.5) {
      throw new MacroContractError(`宏观参数 ${key} 超出单次调整范围`);
    }
    const bound = PARAM_BOUNDS[key as MacroParamKey];
    const current = region.parameters[key as MacroParamKey];
    const next = current + value;
    if (next < bound.min - 1e-9 || next > bound.max + 1e-9) {
      throw new MacroContractError(`宏观参数 ${key} 将越界`);
    }
    result[key as MacroParamKey] = value;
  }
  return result;
}

export function validateMacroProposal(
  value: unknown,
  context: { world: WorldState; state: MacroState; knownFamilies: Set<string> },
): MacroProposal {
  const parsed = MacroProposalSchema.safeParse(value);
  if (!parsed.success) {
    throw new MacroContractError(
      `宏观提案 schema 无效：${parsed.error.issues[0]?.message ?? 'unknown'}`,
    );
  }
  const proposal = parsed.data as MacroProposal;
  const region = context.state.regions[proposal.regionId];
  if (!region) throw new MacroContractError(`未知地区 ${proposal.regionId}`);
  const currentMonth = context.world.date.year * 12 + context.world.date.month;
  const proposalMonth = proposal.effectiveFrom.year * 12 + proposal.effectiveFrom.month;
  if (proposalMonth > currentMonth || proposalMonth < currentMonth - 12) {
    throw new MacroContractError('宏观提案生效时间必须落在当前月或过去 12 个月内');
  }
  const changes = validateParameterChanges(proposal.parameterChanges, region);
  if (
    Object.keys(changes).length === 0 &&
    proposal.eventPoolChanges.length === 0 &&
    !proposal.maintainStatus
  ) {
    throw new MacroContractError('宏观提案没有可执行的参数或事件池变化');
  }
  const knownTypes = new Set([
    'war',
    'peace',
    'food_shortage',
    'epidemic',
    'political_unrest',
    'persecution',
    'migration',
    'technology',
    'medical_progress',
    'economic_change',
    'social_change',
    'other',
  ]);
  const normalizedDevelopments = proposal.developments.map((development) => ({
    ...development,
    type: (knownTypes.has(development.type)
      ? development.type
      : 'other') as MacroDevelopment['type'],
  }));
  const validEventPoolChanges = proposal.eventPoolChanges.filter((change) => {
    if (!context.knownFamilies.has(change.familyId)) return false;
    if (
      change.weightMultiplier !== undefined &&
      !(change.weightMultiplier >= 0 && change.weightMultiplier <= 3)
    ) {
      throw new MacroContractError('事件池权重超出范围');
    }
    return true;
  });
  if (
    Object.keys(changes).length === 0 &&
    validEventPoolChanges.length === 0 &&
    !proposal.maintainStatus
  ) {
    throw new MacroContractError('宏观提案没有可执行的参数或事件池变化');
  }
  return {
    ...proposal,
    developments: normalizedDevelopments,
    parameterChanges: changes,
    eventPoolChanges: validEventPoolChanges,
  };
}

export function parseMacroProposal(
  text: string,
  context: { world: WorldState; state: MacroState; knownFamilies: Set<string> },
): MacroProposal {
  let value: unknown;
  try {
    value = JSON.parse(text.replace(/^\s*```(?:json)?\s*/, '').replace(/\s*```\s*$/, ''));
  } catch {
    throw new MacroContractError('宏观提案不是有效 JSON');
  }
  return validateMacroProposal(value, context);
}

/**
 * Apply a validated proposal. This is pure: the caller persists the returned
 * state and bumps the world revision in the same transaction.
 */
export function applyMacroProposal(
  state: MacroState,
  proposal: MacroProposal,
  date: WorldDate,
  model: string,
  proposalId: string,
): MacroState {
  const next = structuredClone(state);
  const region = next.regions[proposal.regionId]!;
  for (const [key, delta] of Object.entries(proposal.parameterChanges)) {
    const param = key as MacroParamKey;
    const bound = PARAM_BOUNDS[param];
    region.parameters[param] = clamp(
      region.parameters[param] + Number(delta),
      bound.min,
      bound.max,
    );
  }
  const effectiveFrom = cloneDate(proposal.effectiveFrom);
  region.effectiveFrom = effectiveFrom;
  region.effectiveTo = addMonths(effectiveFrom, proposal.durationMonths);
  region.source = `macro-proposal:${proposalId}`;
  for (const change of proposal.eventPoolChanges) {
    const existing = next.eventPool[change.familyId];
    next.eventPool[change.familyId] = {
      familyId: change.familyId,
      enabled: change.enabled ?? existing?.enabled ?? true,
      weightMultiplier: clamp(change.weightMultiplier ?? existing?.weightMultiplier ?? 1, 0, 3),
      regions: change.regions ?? existing?.regions,
      stages: change.stages ?? existing?.stages,
      source: `macro-proposal:${proposalId}`,
      updatedAt: cloneDate(date),
    };
  }
  const mappedDevelopmentTypes = new Set([
    'war',
    'peace',
    'food_shortage',
    'epidemic',
    'political_unrest',
    'persecution',
    'migration',
    'technology',
    'medical_progress',
    'economic_change',
    'social_change',
  ]);
  const unmappedDevelopments = proposal.developments
    .filter((development) => !mappedDevelopmentTypes.has(development.type))
    .map((development) => development.description);
  next.history.push({
    id: `macro-history:${proposalId}`,
    appliedAt: cloneDate(date),
    regionId: proposal.regionId,
    summary: proposal.summary,
    model,
    proposalId,
    parameterChanges: { ...proposal.parameterChanges },
    eventPoolChanges: proposal.eventPoolChanges.length,
    unmappedDevelopments,
    effectiveFrom,
    durationMonths: proposal.durationMonths,
    confidence: proposal.confidence,
  });
  next.history = next.history.slice(-200);
  next.updatedAt = cloneDate(date);
  next.version += 1;
  return next;
}

export function macroSnapshot(
  world: WorldState,
  knownFamilies: string[],
  state: MacroState = ensureMacroState(world),
): MacroSnapshot {
  const recent = [...world.events]
    .filter((event) => event.significance >= 0.6 || event.visibility === 'public')
    .slice(-20)
    .map((event) => ({
      id: event.id,
      date: event.date,
      action: event.action,
      text: event.immediateText.slice(0, 240),
      significance: event.significance,
    }));
  return {
    date: cloneDate(world.date),
    regions: Object.values(state.regions).map((region) => {
      const population = state.population[region.id] ?? defaultPopulation(region.id, 0, world.date);
      return {
        id: region.id,
        name: region.name,
        parameters: region.parameters,
        effectiveFrom: region.effectiveFrom,
        effectiveTo: region.effectiveTo,
        population: {
          namedAlive: population.namedAlive,
          unnamedTotal: Object.values(population.unnamedByAgeBand).reduce(
            (sum, value) => sum + value,
            0,
          ),
          total: populationTotal(population),
        },
      };
    }),
    recentEvents: recent,
    eventPool: Object.values(state.eventPool).map((policy) => ({
      familyId: policy.familyId,
      enabled: policy.enabled,
      weightMultiplier: policy.weightMultiplier,
    })),
    availableFamilies: [...knownFamilies].sort(),
  };
}

export function defaultRegionForWorld(world: WorldState): string {
  return world.places[Object.keys(world.places)[0] ?? '']?.regionId ?? MACRO_DEFAULT_REGION;
}

export function macroForPerson(world: WorldState, person: Person): MacroRegion | undefined {
  if (!world.macro) return undefined;
  return (
    world.macro.regions[regionIdForPerson(world, person)] ??
    world.macro.regions[MACRO_DEFAULT_REGION]
  );
}

export function populationAgeBandForPerson(person: Person, date: WorldDate): PopulationAgeBand {
  return personAgeBand(ageAt(person, date));
}

/**
 * Keep the legacy content pressure keys in sync with the macro state. Content
 * conditions can migrate to macro keys incrementally, but authors still use
 * `war_supply_stress` and `influenza_1918`; these are projections, not a
 * second authority.
 */
export function syncMacroPressures(
  world: WorldState,
  state: MacroState = ensureMacroState(world),
): void {
  const regions = Object.values(state.regions);
  const max = (key: keyof MacroParameters) =>
    regions.reduce((value, region) => Math.max(value, region.parameters[key]), 0);
  const average = (key: keyof MacroParameters) =>
    regions.length === 0
      ? MACRO_DEFAULT_PARAMETERS[key]
      : regions.reduce((sum, region) => sum + region.parameters[key], 0) / regions.length;
  world.pressures.war_supply_stress = max('warIntensity');
  world.pressures.influenza_1918 = max('epidemicInfluenza');
  world.pressures.infant_diarrhoea =
    1 - Math.min(...regions.map((region) => region.parameters.sanitation));
  world.pressures.household_cash_shortfall = 1 - average('foodSupply');
  world.pressures.family_separation = max('warIntensity');
  world.pressures.orphan_risk = Math.max(0, max('warIntensity') * 0.75);
}
