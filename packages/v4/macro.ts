import { z } from 'zod';
import { applyHistoricalMoves, ensureHistoricalProcess, type HistoricalMove } from './history.js';
import {
  addMonths,
  ageAt,
  type Person,
  type HistoricalProcess,
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
export const POPULATION_MAX_AGE = 100;
export type PopulationSex = 'female' | 'male';

/** Single-year cohorts; index 100 means 100+. */
export type UnnamedCohorts = Record<PopulationSex, number[]>;

export type RegionalPopulation = {
  regionId: string;
  /** Background population not represented by a Person row. */
  unnamedByAgeSex: UnnamedCohorts;
  /** Legacy 5-band projection; read-only compatibility for old saves. */
  unnamedByAgeBand?: PopulationByAgeBand;
  namedAlive: number;
  births: number;
  deaths: number;
  migrations: number;
  lastUpdated: WorldDate;
};

export type MacroEffect = {
  id: string;
  start: WorldDate;
  end: WorldDate;
  changes: Partial<Record<MacroParamKey, number>>;
  source: string;
};

export type MacroRegion = {
  id: string;
  name: string;
  scope: 'world' | 'country' | 'region' | 'city';
  effectiveFrom: WorldDate;
  effectiveTo?: WorldDate;
  parameters: MacroParameters;
  /** Immutable baseline for this era; active effects are applied on top. */
  baselineParameters?: MacroParameters;
  effects?: MacroEffect[];
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
  historicalMoves?: number;
  unmappedDevelopments: string[];
  effectiveFrom: WorldDate;
  durationMonths: number;
  confidence: number;
};

export type DevelopmentStatus = 'emerging' | 'active' | 'declining' | 'ended' | 'blocked';

export type WorldDevelopment = {
  id: string;
  type: string;
  regionId: string;
  description: string;
  severity: number;
  start: WorldDate;
  end: WorldDate;
  status: DevelopmentStatus;
  eventFamilyIds: string[];
  organizationId?: string;
  organization?: {
    name: string;
    kind?:
      | 'household_firm'
      | 'factory'
      | 'school'
      | 'union'
      | 'party'
      | 'army'
      | 'state'
      | 'church'
      | 'other';
    placeId?: string;
  };
  lastAssessed?: WorldDate;
  inactiveYears?: number;
  /** Optional living-history state. The development ID is the process ID. */
  historical?: HistoricalProcess;
  source: string;
};

export type MacroState = {
  version: number;
  updatedAt: WorldDate;
  regions: Record<string, MacroRegion>;
  population: Record<string, RegionalPopulation>;
  eventPool: Record<string, EventPoolState>;
  developments?: Record<string, WorldDevelopment>;
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
  organization?: {
    name: string;
    kind?:
      | 'household_firm'
      | 'factory'
      | 'school'
      | 'union'
      | 'party'
      | 'army'
      | 'state'
      | 'church'
      | 'other';
    placeId?: string;
  };
  eventFamilyIds?: string[];
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
  /** Bounded intents about existing historical processes; never a phase command. */
  historicalMoves?: HistoricalMove[];
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
  developments: {
    id: string;
    type: string;
    description: string;
    severity: number;
    status: DevelopmentStatus;
    organizationId?: string;
    historical?: {
      kind: string;
      phase: string;
      phaseStarted: WorldDate;
      metrics: Record<string, number>;
      objectives: string[];
      organizations: { id: string; name?: string; roles: string[] }[];
      participants: { id: string; name: string; roles: string[]; influence: number }[];
      recentHistory: { date: WorldDate; phase: string; note: string }[];
      outcome?: string;
    };
  }[];
  historicalPeople: {
    id: string;
    name: string;
    historicalId: string;
    occupation: string;
    publicRole: string;
    locationId: string;
    roles: string[];
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
  organization: z
    .object({
      name: z.string().trim().min(1).max(160),
      kind: z
        .enum([
          'household_firm',
          'factory',
          'school',
          'union',
          'party',
          'army',
          'state',
          'church',
          'other',
        ])
        .optional(),
      placeId: z.string().trim().min(1).max(160).optional(),
    })
    .optional(),
  eventFamilyIds: z.array(z.string().trim().min(1).max(160)).max(8).optional(),
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
  historicalMoves: z
    .array(
      z.object({
        processId: z.string().trim().min(1).max(160),
        intent: z.enum(['support', 'oppose', 'escalate', 'deescalate']),
        magnitude: z.number().finite().min(0).max(0.2),
        note: z.string().trim().max(240).default(''),
      }),
    )
    .max(6)
    .default([]),
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

function emptyCohorts(): UnnamedCohorts {
  return {
    female: Array.from({ length: POPULATION_MAX_AGE + 1 }, () => 0),
    male: Array.from({ length: POPULATION_MAX_AGE + 1 }, () => 0),
  };
}

/** Convert a legacy 5-band population into single-year cohorts. */
export function normalizeUnnamedCohorts(population: RegionalPopulation): UnnamedCohorts {
  if (population.unnamedByAgeSex && Array.isArray(population.unnamedByAgeSex.female))
    return {
      female: [...population.unnamedByAgeSex.female],
      male: [...population.unnamedByAgeSex.male],
    };
  const cohorts = emptyCohorts();
  const bands: { band: PopulationAgeBand; from: number; to: number }[] = [
    { band: '0-4', from: 0, to: 4 },
    { band: '5-14', from: 5, to: 14 },
    { band: '15-44', from: 15, to: 44 },
    { band: '45-64', from: 45, to: 64 },
    { band: '65+', from: 65, to: POPULATION_MAX_AGE },
  ];
  for (const { band, from, to } of bands) {
    const total = Math.max(0, population.unnamedByAgeBand?.[band] ?? 0);
    const perAge = total / (to - from + 1);
    for (let age = from; age <= to; age += 1) {
      cohorts.female[age] += perAge * 0.51;
      cohorts.male[age] += perAge * 0.49;
    }
  }
  return cohorts;
}

export function populationFromAgeBands(
  regionId: string,
  unnamedByAgeBand: PopulationByAgeBand,
  namedAlive: number,
  date: WorldDate,
  births = 0,
  deaths = 0,
  migrations = 0,
): RegionalPopulation {
  const legacy = {
    regionId,
    unnamedByAgeBand,
    namedAlive,
    births,
    deaths,
    migrations,
    lastUpdated: date,
  } as RegionalPopulation;
  return {
    ...legacy,
    unnamedByAgeSex: normalizeUnnamedCohorts(legacy),
  };
}

export function populationTotal(population: RegionalPopulation): number {
  const cohorts = normalizeUnnamedCohorts(population);
  return (
    cohorts.female.reduce((sum, count) => sum + Math.max(0, count), 0) +
    cohorts.male.reduce((sum, count) => sum + Math.max(0, count), 0) +
    Math.max(0, population.namedAlive)
  );
}

export function cohortCount(
  population: RegionalPopulation,
  age: number,
  sex: PopulationSex,
): number {
  const cohorts = normalizeUnnamedCohorts(population);
  return cohorts[sex][Math.min(POPULATION_MAX_AGE, Math.max(0, age))] ?? 0;
}

/** Remove one background person at the exact age/sex; false if unavailable. */
export function takeBackgroundPerson(
  population: RegionalPopulation,
  age: number,
  sex: PopulationSex,
): boolean {
  const cohorts = normalizeUnnamedCohorts(population);
  const index = Math.min(POPULATION_MAX_AGE, Math.max(0, Math.floor(age)));
  if ((cohorts[sex][index] ?? 0) < 1) return false;
  population.unnamedByAgeSex = cohorts;
  cohorts[sex][index] -= 1;
  delete population.unnamedByAgeBand;
  return true;
}

/** Move exact age/sex cohorts between regions, conserving both ends. */
export function moveBackgroundCohorts(
  state: MacroState,
  fromRegionId: string,
  toRegionId: string,
  moves: { age: number; sex: PopulationSex; count: number }[],
): void {
  const from = state.population[fromRegionId];
  const to = state.population[toRegionId];
  if (!from || !to || fromRegionId === toRegionId) return;
  from.unnamedByAgeSex = normalizeUnnamedCohorts(from);
  to.unnamedByAgeSex = normalizeUnnamedCohorts(to);
  for (const move of moves) {
    const age = Math.min(POPULATION_MAX_AGE, Math.max(0, Math.floor(move.age)));
    const count = Math.max(0, Math.min(move.count, from.unnamedByAgeSex[move.sex][age] ?? 0));
    if (count <= 0) continue;
    from.unnamedByAgeSex[move.sex][age] -= count;
    to.unnamedByAgeSex[move.sex][age] += count;
    from.migrations -= count;
    to.migrations += count;
  }
  delete from.unnamedByAgeBand;
  delete to.unnamedByAgeBand;
}

function fillCohorts(total: number, from: number, to: number, cohorts: UnnamedCohorts): void {
  const perAge = total / (to - from + 1);
  for (let age = from; age <= to; age += 1) {
    cohorts.female[age] += perAge * 0.51;
    cohorts.male[age] += perAge * 0.49;
  }
}

function defaultPopulation(
  regionId: string,
  namedAlive: number,
  date: WorldDate,
): RegionalPopulation {
  // Vienna's background population is aggregate only. It never creates named
  // people, and named persons are counted separately so the two ledgers cannot
  // double count the same person.
  const background =
    regionId === MACRO_DEFAULT_REGION
      ? 1_900_000
      : regionId === 'region-klosterneuburg'
        ? 5_000
        : 0;
  const cohorts = emptyCohorts();
  fillCohorts(background * 0.09, 0, 4, cohorts);
  fillCohorts(background * 0.16, 5, 14, cohorts);
  fillCohorts(background * 0.46, 15, 44, cohorts);
  fillCohorts(background * 0.21, 45, 64, cohorts);
  fillCohorts(background * 0.08, 65, POPULATION_MAX_AGE, cohorts);
  return {
    regionId,
    unnamedByAgeSex: cohorts,
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
      baselineParameters: { ...MACRO_DEFAULT_PARAMETERS },
      effects: [],
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
    developments: {},
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
  const hasExecutableDevelopment = proposal.developments.some(
    (development) => development.organization || (development.eventFamilyIds?.length ?? 0) > 0,
  );
  if (
    Object.keys(changes).length === 0 &&
    proposal.eventPoolChanges.length === 0 &&
    (proposal.historicalMoves?.length ?? 0) === 0 &&
    !hasExecutableDevelopment &&
    !proposal.maintainStatus
  ) {
    throw new MacroContractError('宏观提案没有可执行的参数、事件池、历史进程或发展对象');
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
    eventFamilyIds: (development.eventFamilyIds ?? []).filter((familyId) =>
      context.knownFamilies.has(familyId),
    ),
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
  const validHistoricalMoves = (proposal.historicalMoves ?? []).filter((move) => {
    const development = context.state.developments?.[move.processId];
    return Boolean(development?.historical);
  });
  if (
    Object.keys(changes).length === 0 &&
    validEventPoolChanges.length === 0 &&
    validHistoricalMoves.length === 0 &&
    !normalizedDevelopments.some(
      (development) => development.organization || development.eventFamilyIds.length > 0,
    ) &&
    !proposal.maintainStatus
  ) {
    throw new MacroContractError('宏观提案没有可执行的参数、事件池或发展对象');
  }
  return {
    ...proposal,
    developments: normalizedDevelopments,
    parameterChanges: changes,
    eventPoolChanges: validEventPoolChanges,
    historicalMoves: validHistoricalMoves,
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

function recomputeRegion(region: MacroRegion): void {
  const baseline = region.baselineParameters ?? region.parameters;
  const parameters = { ...baseline };
  for (const effect of region.effects ?? []) {
    for (const [key, delta] of Object.entries(effect.changes)) {
      const param = key as MacroParamKey;
      const bound = PARAM_BOUNDS[param];
      parameters[param] = clamp(parameters[param] + Number(delta), bound.min, bound.max);
    }
  }
  region.parameters = parameters;
  region.baselineParameters = baseline;
}

/**
 * Expire duration-bound effects at a tick boundary. This makes a proposal an
 * explicit temporary regime rather than a permanent, ever-stacking delta.
 */
export function expireMacroEffects(state: MacroState, date: WorldDate): MacroState {
  const next = structuredClone(state);
  const month = date.year * 12 + date.month;
  for (const region of Object.values(next.regions)) {
    const effects = region.effects ?? [];
    const active = effects.filter((effect) => effect.end.year * 12 + effect.end.month >= month);
    if (active.length !== effects.length) {
      region.effects = active;
      recomputeRegion(region);
    }
  }
  for (const development of Object.values(next.developments ?? {})) {
    if (
      development.status === 'active' &&
      development.end.year * 12 + development.end.month < month
    ) {
      development.status = 'ended';
    }
  }
  return next;
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
  if (!region.baselineParameters) region.baselineParameters = { ...region.parameters };
  if (!region.effects) region.effects = [];
  const effectiveFrom = cloneDate(proposal.effectiveFrom);
  const effectEnd = addMonths(effectiveFrom, proposal.durationMonths);
  if (Object.keys(proposal.parameterChanges).length > 0) {
    region.effects.push({
      id: `macro-effect:${proposalId}`,
      start: effectiveFrom,
      end: effectEnd,
      changes: { ...proposal.parameterChanges },
      source: `macro-proposal:${proposalId}`,
    });
    recomputeRegion(region);
  }
  region.effectiveFrom = effectiveFrom;
  region.effectiveTo = effectEnd;
  region.source = `macro-proposal:${proposalId}`;
  for (const development of proposal.developments) {
    if (!development.eventFamilyIds || development.eventFamilyIds.length === 0) continue;
    for (const familyId of development.eventFamilyIds) {
      const existing = next.eventPool[familyId];
      next.eventPool[familyId] = {
        familyId,
        enabled: true,
        weightMultiplier: Math.max(existing?.weightMultiplier ?? 1, 1.15),
        source: `development:${proposalId}`,
        updatedAt: cloneDate(date),
      };
    }
  }
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
  if (!next.developments) next.developments = {};
  proposal.developments.forEach((development, index) => {
    if (development.type === 'other' && !development.organization && !development.eventFamilyIds)
      return;
    const id = `development:${proposalId}:${index}`;
    const end = addMonths(effectiveFrom, proposal.durationMonths);
    const created: WorldDevelopment = {
      id,
      type: development.type,
      regionId: proposal.regionId,
      description: development.description,
      severity: development.severity,
      start: effectiveFrom,
      end,
      status: 'active',
      eventFamilyIds: development.eventFamilyIds ?? [],
      organization: development.organization,
      source: `macro-proposal:${proposalId}`,
    };
    created.historical = ensureHistoricalProcess(created, date);
    next.developments![id] = created;
  });
  const withMoves = applyHistoricalMoves(next, proposal.historicalMoves ?? [], date);
  next.developments = withMoves.developments;
  next.updatedAt = withMoves.updatedAt;
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
    historicalMoves: proposal.historicalMoves?.length ?? 0,
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

function dateWithinIdentity(from: WorldDate, to: WorldDate | undefined, date: WorldDate): boolean {
  const month = date.year * 12 + date.month;
  const start = from.year * 12 + from.month;
  const end = to ? to.year * 12 + to.month : Number.POSITIVE_INFINITY;
  return month >= start && month <= end;
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
          unnamedTotal: populationTotal(population) - population.namedAlive,
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
    developments: Object.values(state.developments ?? {}).map((development) => {
      const h = development.historical;
      return {
        id: development.id,
        type: development.type,
        description: development.description,
        severity: development.severity,
        status: development.status,
        organizationId: development.organizationId,
        ...(h
          ? {
              historical: {
                kind: h.kind,
                phase: h.phase,
                phaseStarted: h.phaseStarted,
                metrics: { ...h.metrics },
                objectives: h.objectives.slice(0, 6),
                organizations: Object.entries(h.organizationRoles).map(([id, roles]) => ({
                  id,
                  name: world.organizations[id]?.name,
                  roles,
                })),
                participants: Object.entries(h.participants)
                  .sort((a, b) => b[1].influence - a[1].influence)
                  .slice(0, 8)
                  .map(([id, entry]) => ({
                    id,
                    name: world.persons[id]?.name ?? '已故参与者',
                    roles: entry.roles,
                    influence: entry.influence,
                  })),
                recentHistory: h.history.slice(-4),
                outcome: h.outcome,
              },
            }
          : {}),
      };
    }),
    historicalPeople: Object.values(world.persons)
      .filter(
        (person) =>
          !person.died &&
          person.historicalIdentity &&
          dateWithinIdentity(
            person.historicalIdentity.activeFrom,
            person.historicalIdentity.activeTo,
            world.date,
          ),
      )
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, 60)
      .map((person) => ({
        id: person.id,
        name: person.name,
        historicalId: person.historicalIdentity!.id,
        occupation: person.historicalIdentity!.occupation,
        publicRole: person.historicalIdentity!.publicRole,
        locationId: person.locationId,
        roles: person.roles,
      })),
    availableFamilies: [...knownFamilies].sort(),
  };
}

/**
 * Turn a supported development into a real Organization in the world. This is
 * intentionally generic: the Director names the organization, the engine picks
 * a valid place and creates a persistent entity. Organizations without a valid
 * region/place are left as explicit capability gaps.
 */
export function materializeDevelopments(
  world: WorldState,
  state: MacroState,
  proposal: MacroProposal,
  proposalId: string,
  date: WorldDate,
): MacroState {
  const next = structuredClone(state);
  for (const development of Object.values(next.developments ?? {})) {
    if (development.source !== `macro-proposal:${proposalId}` || !development.organization)
      continue;
    const spec = development.organization;
    const regionPlaces = Object.values(world.places).filter(
      (place) => (place.regionId ?? MACRO_DEFAULT_REGION) === development.regionId,
    );
    const place =
      regionPlaces.find((candidate) => candidate.id === spec.placeId) ??
      regionPlaces.find((candidate) => candidate.kind === 'other') ??
      regionPlaces[0];
    if (!place) {
      development.status = 'blocked';
      continue;
    }
    const existingOrganization = Object.values(world.organizations).find(
      (organization) => organization.name === spec.name,
    );
    const slug = development.id.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 120);
    const organizationId = existingOrganization?.id ?? `org-development-${slug}`;
    if (!world.organizations[organizationId]) {
      world.organizations[organizationId] = {
        id: organizationId,
        name: spec.name,
        kind: spec.kind ?? 'other',
        placeId: place.id,
        memberIds: [],
        positions: [],
        treasury: 0,
        authorityRules: [],
        projects: [],
        status: 'active',
        causeIds: [],
      };
    }
    development.organizationId = organizationId;
  }
  return next;
}

/**
 * Advance supported development lifecycles using existing Organization state.
 * No new political system: members, dues, inactivity and survival are enough
 * to let an organization grow, decline or end over several years.
 */
export function advanceDevelopmentLifecycle(
  world: WorldState,
  state: MacroState,
  date: WorldDate,
): MacroState {
  const next = structuredClone(state);
  for (const development of Object.values(next.developments ?? {})) {
    if (development.status === 'ended' || development.status === 'blocked') continue;
    const organization = development.organizationId
      ? world.organizations[development.organizationId]
      : undefined;
    if (!organization || organization.status !== 'active') {
      development.status = 'ended';
      development.lastAssessed = { ...date };
      continue;
    }
    const members = organization.memberIds.filter(
      (id) => world.persons[id] && !world.persons[id]!.died,
    );
    if (members.length === 0) {
      development.inactiveYears = (development.inactiveYears ?? 0) + 1;
      development.status = development.inactiveYears >= 2 ? 'ended' : 'declining';
    } else {
      development.inactiveYears = 0;
      development.status = 'active';
      // Small membership dues are a real resource transfer, not conjured money.
      for (const memberId of members) {
        const person = world.persons[memberId];
        const household = person ? world.households[person.householdId] : undefined;
        if (!household || household.cash < 0.1) continue;
        household.cash = Math.round((household.cash - 0.1) * 100) / 100;
        organization.treasury = Math.round((organization.treasury + 0.1) * 100) / 100;
      }
    }
    development.lastAssessed = { ...date };
  }
  return next;
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
