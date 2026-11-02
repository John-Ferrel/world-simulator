/**
 * v4 annual scene engine.
 *
 * The engine is a pure, seeded advance step: it clones the world, settles one
 * year of household/work/health accounts, resolves eligible scenes with the
 * declared role/casting grammar, and commits typed facts. It does not write
 * prose templates; the only narrative text committed comes from a scene
 * outcome's `immediateText`.
 *
 * Decisions are deliberately pluggable. The default is a deterministic weighted
 * draw. A future LLM/agent worker can return an outcome (or choice) id through
 * `outcomePolicy` / `choicePolicy` without changing the simulation contract.
 */

import {
  addMonths,
  ageAt,
  assertWorldV4,
  monthIndex,
  stageForAge,
  type EventEffect,
  type EventFact,
  type EventParticipant,
  type Household,
  type Id,
  type Interaction,
  type NarrationVariant,
  type Organization,
  type Person,
  type PersonLife,
  type Place,
  type Project,
  type Relation,
  type SceneChoice,
  type SceneCondition,
  type SceneDefinition,
  type SceneFollowupTarget,
  type SceneInstance,
  type SceneOutcome,
  type SceneStage,
  type ScheduledEvent,
  type WorldDate,
  type WorldState,
} from './domain.js';
import {
  advanceDevelopmentLifecycle,
  eventPoolMultiplier,
  expireMacroEffects,
  macroForPerson,
  regionIdForPerson,
  takeBackgroundPerson,
  syncMacroPressures,
  type MacroState,
} from './macro.js';
import {
  DEATH_CAUSE_TEXT,
  annualInfectionRisk,
  estimateAnnualRisks,
  infectionNameForAge,
  recoveryRisk,
  refreshNamedPopulation,
  sampleDeathCause,
  updateMacroPopulation,
  type DeathCause,
} from './statistics.js';

export type V4DecisionContext = {
  world: WorldState;
  scene: SceneDefinition;
  subject: Person;
  roleIds: Record<Id, Id>;
  date: WorldDate;
  /** Seeded draw already scoped to this scene/subject/date. */
  rng: () => number;
};

export type V4OutcomeDecisionContext = V4DecisionContext & {
  choice?: SceneChoice;
  outcomes: SceneOutcome[];
};

export type V4ChoiceDecisionContext = V4DecisionContext & {
  choices: SceneChoice[];
};

export type V4OutcomeDecision = string | { outcomeId: string; reason?: string } | null | undefined;

export type V4ChoiceDecision = string | { choiceId: string; reason?: string } | null | undefined;

/** Synchronous fallback hook. Async model workers should pre-resolve before the step. */
export type V4OutcomePolicy = (context: V4OutcomeDecisionContext) => V4OutcomeDecision;
export type V4ChoicePolicy = (context: V4ChoiceDecisionContext) => V4ChoiceDecision;

export type V4AdvanceOptions = {
  outcomePolicy?: V4OutcomePolicy;
  choicePolicy?: V4ChoicePolicy;
  /** Maximum resolved focal scenes per living person per year. Defaults to 1. */
  maxScenesPerPerson?: number;
  /**
   * New event runtime: multiple ordinary events per year, rate-based sampling,
   * fact/followup queue. Defaults to false so old fixtures remain stable.
   */
  eventRuntime?: boolean;
  /** Soft cap for ordinary statistical events per person-year. Fact events bypass. */
  maxOrdinaryEventsPerPerson?: number;
  /** Allow required missing roles to be taken from the background cohort. */
  materializePopulation?: boolean;
  /** Use the Phase 3 statistical risk engine when the world has macro state. */
  statisticalModel?: boolean;
  economy?: {
    /** Defaults to true. Scenes still run when false. */
    enabled?: boolean;
    /** Household food units consumed per living member per month. Defaults to 1. */
    foodPerPersonPerMonth?: number;
  };
};

export type V4Warning = {
  code: string;
  message: string;
  personId?: Id;
  eventId?: Id;
  sceneId?: string;
};

export type V4EconomyDiagnostics = {
  months: number;
  wagesPaid: number;
  wagesUnpaid: number;
  revenue: number;
  transfers: number;
  rentPaid: number;
  obligationsPaid: number;
  foodSpent: number;
  foodConsumed: number;
  foodShortageMonths: number;
  overcrowdedMonths: number;
};

export type V4AdvanceDiagnostics = {
  from: WorldDate;
  to: WorldDate;
  personsConsidered: number;
  sceneInstancesCreated: number;
  scenesResolved: number;
  scenesBlocked: number;
  eventsCreated: number;
  deaths: Id[];
  statistical: { deaths: number; infections: number; recoveries: number; materialized: number };
  /** Why a background person became named; used by population/social audits. */
  materializations: {
    personId: Id;
    role: string;
    kind: string;
    regionId: string;
    reason: string;
  }[];
  economy: V4EconomyDiagnostics;
  warnings: V4Warning[];
  timings?: Record<string, number>;
};

export type V4AdvanceResult = {
  world: WorldState;
  /** Newly committed facts only, in commit order. Also present at the tail of world.events. */
  events: EventFact[];
  /** Newly created scene instances (resolved and blocked). Also in world.scenes. */
  scenes: SceneInstance[];
  diagnostics: V4AdvanceDiagnostics;
};

type NormalizedOptions = {
  maxScenesPerPerson: number;
  eventRuntime: boolean;
  maxOrdinaryEventsPerPerson: number;
  materializePopulation: boolean;
  statisticalModel: boolean;
  economyEnabled: boolean;
  foodPerPersonPerMonth: number;
  outcomePolicy?: V4OutcomePolicy;
  choicePolicy?: V4ChoicePolicy;
};

type EngineContext = {
  world: WorldState;
  target: WorldDate;
  options: NormalizedOptions;
  diagnostics: V4AdvanceDiagnostics;
  newEvents: EventFact[];
  newScenes: SceneInstance[];
  nextSceneOrdinal: number;
  /** sceneId + NUL + personId -> last resolved month index. Blocked scenes do not count. */
  sceneHistory: Map<string, number>;
  definitions: SceneDefinition[];
  triggerIndex: Map<string, SceneDefinition[]>;
  materializedCount: number;
};

type EffectBinding = {
  eventId: Id;
  date: WorldDate;
  subjectId: Id;
  roleIds: Record<Id, Id>;
  fundingOrganizationIds: Id[];
};

type OutcomeSelection = {
  outcome: SceneOutcome;
  choice?: SceneChoice;
  reason: string;
};

type EventDraft = {
  date: WorldDate;
  placeId?: Id;
  subjectId: Id;
  participants: EventParticipant[];
  action: string;
  title?: string;
  causes?: Id[];
  effects: EventEffect[];
  immediateText: string;
  significance: number;
  visibility: EventFact['visibility'];
  sceneId?: Id;
  choices?: EventFact['choices'];
  provenance: EventFact['provenance'];
  triggerDepth?: number;
};

type CastResult = {
  roles: Record<Id, Id>;
  missing: string[];
};

const LIFE_STAGES: readonly SceneStage[] = [
  'infancy',
  'childhood',
  'adolescence',
  'adulthood',
  'elderhood',
];

const EDUCATION_STATUSES: readonly Person['education']['status'][] = [
  'none',
  'home',
  'primary',
  'secondary',
  'apprenticeship',
  'higher',
];

const RELATION_KINDS: readonly Relation['kind'][] = [
  'kin',
  'guardian',
  'partner',
  'friend',
  'colleague',
  'employer',
  'rival',
  'acquaintance',
];

const PROJECT_STATES: readonly Project['state'][] = [
  'proposed',
  'active',
  'blocked',
  'failed',
  'completed',
  'cancelled',
];

const INTERACTION_KINDS: readonly Interaction['kind'][] = [
  'request',
  'offer',
  'proposal',
  'threat',
  'introduction',
  'negotiation',
];

const INTERACTION_STATUSES: readonly Interaction['status'][] = [
  'pending',
  'accepted',
  'rejected',
  'expired',
  'withdrawn',
];

const ROLE_KINDS = new Set([
  'subject',
  'parent',
  'guardian',
  'sibling',
  'partner',
  'teacher',
  'employer',
  'worker',
  'union_member',
  'neighbor',
  'official',
  'organization',
]);

/**
 * Advance exactly one year (12 months). The input world and definitions are not
 * mutated. All randomness is derived from `world.seed`, the date and stable ids.
 */
export function advanceV4Year(
  world: WorldState,
  scenes: SceneDefinition[],
  options: V4AdvanceOptions = {},
): V4AdvanceResult {
  const from = { ...world.date };
  const target = addMonths(from, 12);
  const normalized = normalizeOptions(options);
  const startedAt = Date.now();
  let phaseStarted = startedAt;
  const timings: Record<string, number> = {};
  const mark = (name: string) => {
    timings[name] = Date.now() - phaseStarted;
    phaseStarted = Date.now();
  };
  const diagnostics: V4AdvanceDiagnostics = {
    from,
    to: target,
    personsConsidered: 0,
    sceneInstancesCreated: 0,
    scenesResolved: 0,
    scenesBlocked: 0,
    eventsCreated: 0,
    deaths: [],
    statistical: { deaths: 0, infections: 0, recoveries: 0, materialized: 0 },
    materializations: [],
    economy: {
      months: 0,
      wagesPaid: 0,
      wagesUnpaid: 0,
      revenue: 0,
      transfers: 0,
      rentPaid: 0,
      obligationsPaid: 0,
      foodSpent: 0,
      foodConsumed: 0,
      foodShortageMonths: 0,
      overcrowdedMonths: 0,
    },
    warnings: [],
  };

  const draft = structuredClone(world);
  assertWorldV4(draft);
  mark('clone');

  if (draft.status !== 'running') {
    warn(diagnostics, 'world_not_running', `world status is ${draft.status}; year not advanced`);
    return { world: draft, events: [], scenes: [], diagnostics };
  }
  if (draft.macro) {
    draft.macro = expireMacroEffects(draft.macro, draft.date);
    syncMacroPressures(draft, draft.macro);
  }

  const context: EngineContext = {
    world: draft,
    target,
    options: normalized,
    diagnostics,
    newEvents: [],
    newScenes: [],
    nextSceneOrdinal: nextFreeSceneOrdinal(draft),
    sceneHistory: resolvedSceneHistory(draft),
    definitions: [],
    triggerIndex: new Map(),
    materializedCount: 0,
  };

  const definitions = usableDefinitions(scenes, diagnostics).filter(
    (definition) => !(draft.macro && definition.tags?.includes('baseline_mortality')),
  );
  context.definitions = definitions;
  for (const definition of definitions) {
    for (const tag of definition.triggerTags ?? []) {
      const list = context.triggerIndex.get(tag) ?? [];
      list.push(definition);
      context.triggerIndex.set(tag, list);
    }
  }
  const resolvedCounts = new Map<Id, number>();

  // Year-start scenes catch age-window edges (birth, a child turning 14 at the
  // new year) before the year is settled. The end-of-year pass catches windows
  // reached after the calendar advance.
  draft.date = from;
  reapVitalityZero(context, from);
  if (!normalized.eventRuntime) {
    runScenes(context, definitions, from, resolvedCounts, true);
    reapVitalityZero(context, from);
    assertWorldV4(draft);
  }

  if (normalized.economyEnabled) {
    for (let month = 1; month <= 12; month += 1) {
      const date = addMonths(from, month);
      draft.date = date;
      settleEconomyMonth(context, date);
      if (normalized.statisticalModel && draft.macro) applyStatisticalMonth(context, date);
      reapVitalityZero(context, date);
      diagnostics.economy.months += 1;
      assertWorldV4(draft);
    }
  } else if (normalized.statisticalModel && draft.macro) {
    for (let month = 1; month <= 12; month += 1) {
      const date = addMonths(from, month);
      draft.date = date;
      applyStatisticalMonth(context, date);
      reapVitalityZero(context, date);
    }
  }

  mark('scenes');
  draft.date = target;
  if (normalized.statisticalModel && draft.macro) applyStatisticalYear(context, target);
  mark('statistics');
  reapVitalityZero(context, target);
  if (draft.macro && normalized.statisticalModel) {
    draft.macro = updateMacroPopulation(draft.macro, draft, target);
    syncMacroPressures(draft, draft.macro);
  }
  expireDueInteractions(context);
  advanceDueProjects(context);
  // Reap pre-existing zero vitality before casting, so a corpse is never
  // selected as a scene role.
  reapVitalityZero(context, target);
  if (normalized.eventRuntime) {
    processScheduledEvents(context, definitions, target);
    runEventYear(context, definitions, target, resolvedCounts);
  } else {
    runScenes(context, definitions, target, resolvedCounts, false);
  }
  mark('events');
  reapVitalityZero(context, target);
  if (draft.macro) {
    draft.macro = advanceDevelopmentLifecycle(draft, draft.macro, target);
    draft.macro = refreshNamedPopulation(draft.macro, draft);
  }
  draft.date = target;

  diagnostics.personsConsidered = Object.keys(draft.persons).filter(
    (id) => Boolean(draft.persons[id]) && !draft.persons[id]!.died,
  ).length;
  diagnostics.sceneInstancesCreated = context.newScenes.length;
  diagnostics.scenesResolved = context.newScenes.filter((s) => s.status === 'resolved').length;
  diagnostics.scenesBlocked = context.newScenes.filter((s) => s.status === 'blocked').length;
  diagnostics.eventsCreated = context.newEvents.length;

  assertWorldV4(draft);
  timings.assert = Date.now() - phaseStarted;
  timings.total = Date.now() - startedAt;
  diagnostics.timings = timings;

  return {
    world: draft,
    events: context.newEvents,
    scenes: context.newScenes,
    diagnostics,
  };
}

function normalizeOptions(options: V4AdvanceOptions): NormalizedOptions {
  const rawMax = options.maxScenesPerPerson;
  const maxScenesPerPerson =
    typeof rawMax === 'number' && Number.isFinite(rawMax) && rawMax >= 0
      ? Math.min(10, Math.floor(rawMax))
      : 1;
  const foodPerPersonPerMonth =
    typeof options.economy?.foodPerPersonPerMonth === 'number' &&
    Number.isFinite(options.economy.foodPerPersonPerMonth) &&
    options.economy.foodPerPersonPerMonth >= 0
      ? options.economy.foodPerPersonPerMonth
      : 1;
  return {
    maxScenesPerPerson,
    eventRuntime: options.eventRuntime === true,
    materializePopulation: options.materializePopulation !== false,
    statisticalModel: options.statisticalModel !== false,
    maxOrdinaryEventsPerPerson:
      typeof options.maxOrdinaryEventsPerPerson === 'number' &&
      Number.isFinite(options.maxOrdinaryEventsPerPerson)
        ? Math.max(0, Math.min(20, Math.floor(options.maxOrdinaryEventsPerPerson)))
        : 4,
    economyEnabled: options.economy?.enabled !== false,
    foodPerPersonPerMonth,
    outcomePolicy: options.outcomePolicy,
    choicePolicy: options.choicePolicy,
  };
}

function warn(
  diagnostics: V4AdvanceDiagnostics,
  code: string,
  message: string,
  extra?: { personId?: Id; eventId?: Id; sceneId?: string },
): void {
  diagnostics.warnings.push({ code, message, ...extra });
}

function warnContext(
  context: EngineContext,
  code: string,
  message: string,
  extra?: { personId?: Id; eventId?: Id; sceneId?: string },
): void {
  warn(context.diagnostics, code, message, extra);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function roundFood(value: number): number {
  return Math.round((value + Number.EPSILON) * 1000) / 1000;
}

function isWorldDate(value: unknown): value is WorldDate {
  return (
    isRecord(value) &&
    Number.isInteger(value.year) &&
    Number.isInteger(value.month) &&
    (value.month as number) >= 1 &&
    (value.month as number) <= 12
  );
}

/** FNV-1a + mulberry32: tiny, deterministic and dependency-free. */
function seededRng(...parts: (string | number)[]): () => number {
  let hash = 2166136261;
  const input = parts.join('|');
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  let state = hash >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function sameDate(a: WorldDate, b: WorldDate): boolean {
  return a.year === b.year && a.month === b.month;
}

function aliveAt(person: Person, date: WorldDate): boolean {
  if (!person.died) return true;
  return monthIndex(person.died) > monthIndex(date);
}

function usableDefinitions(
  input: SceneDefinition[],
  diagnostics: V4AdvanceDiagnostics,
): SceneDefinition[] {
  const seen = new Set<string>();
  const result: SceneDefinition[] = [];
  for (const raw of input as unknown[]) {
    if (!isUsableSceneDefinition(raw)) {
      warn(diagnostics, 'invalid_scene_definition', 'scene definition failed schema shape checks');
      continue;
    }
    if (seen.has(raw.id)) {
      warn(
        diagnostics,
        'duplicate_scene_definition',
        `duplicate scene definition ${raw.id} ignored`,
        { sceneId: raw.id },
      );
      continue;
    }
    seen.add(raw.id);
    result.push(raw);
  }
  return result;
}

function isUsableSceneDefinition(value: unknown): value is SceneDefinition {
  if (!isRecord(value)) return false;
  if (typeof value.id !== 'string' || value.id.length === 0) return false;
  if (!Number.isInteger(value.version) || (value.version as number) < 0) return false;
  if (typeof value.stage !== 'string' || !LIFE_STAGES.includes(value.stage as SceneStage)) {
    return false;
  }
  if (!isRecord(value.ageWindow)) return false;
  if (
    typeof value.ageWindow.min !== 'number' ||
    typeof value.ageWindow.max !== 'number' ||
    !Number.isFinite(value.ageWindow.min) ||
    !Number.isFinite(value.ageWindow.max)
  ) {
    return false;
  }
  if (!Array.isArray(value.roles) || !Array.isArray(value.conditions)) return false;
  if (!Array.isArray(value.outcomes) && !Array.isArray(value.choices)) return false;
  return true;
}

function resolvedSceneHistory(world: WorldState): Map<string, number> {
  const history = new Map<string, number>();
  for (const scene of world.scenes) {
    if (scene.status !== 'resolved' || !isWorldDate(scene.date)) continue;
    const key = sceneKey(scene.sceneId, scene.subjectId);
    const month = monthIndex(scene.date);
    const previous = history.get(key);
    if (previous === undefined || month > previous) history.set(key, month);
  }
  return history;
}

function sceneKey(sceneId: string, personId: Id): string {
  return `${sceneId}\u0000${personId}`;
}

function nextFreeSceneOrdinal(world: WorldState): number {
  const prefix = `scn:${world.id}:`;
  let highest = 0;
  for (const scene of world.scenes) {
    if (typeof scene.id !== 'string' || !scene.id.startsWith(prefix)) continue;
    const parsed = Number(scene.id.slice(prefix.length));
    if (Number.isInteger(parsed) && parsed > highest) highest = parsed;
  }
  return highest + 1;
}

function nextSceneId(context: EngineContext): Id {
  // nextFreeSceneOrdinal already found the highest existing ordinal at the
  // start of the tick. Scanning every previous scene here is O(n²) on long
  // runs with many resolved scenes.
  const ordinal = context.nextSceneOrdinal;
  context.nextSceneOrdinal = ordinal + 1;
  return `scn:${context.world.id}:${String(ordinal).padStart(6, '0')}`;
}

function appendScene(context: EngineContext, scene: SceneInstance): void {
  context.world.scenes.push(scene);
  context.newScenes.push(scene);
  context.world.historyMeta.lastSceneId = scene.id;
}

function nextEventIdentity(context: EngineContext): { id: Id; sequence: number } {
  // historyMeta.sequence is the canonical monotonic counter. Scanning every
  // event for every commit is O(n²) and becomes visible in long audits.
  const sequence = context.world.historyMeta.sequence + 1;
  const id = `evt:${context.world.id}:${String(sequence).padStart(6, '0')}`;
  return { id, sequence };
}

// ---------------------------------------------------------------------------
// Scene eligibility, casting and outcomes
// ---------------------------------------------------------------------------

const relationsByPersonCache = new WeakMap<WorldState, Map<Id, Relation[]>>();

function relationIndexFor(world: WorldState): Map<Id, Relation[]> {
  let index = relationsByPersonCache.get(world);
  if (index) return index;
  index = new Map();
  for (const relation of Object.values(world.relations)) {
    for (const id of [relation.a, relation.b]) {
      const list = index.get(id) ?? [];
      list.push(relation);
      index.set(id, list);
    }
  }
  relationsByPersonCache.set(world, index);
  return index;
}

function relationsFor(world: WorldState, id: Id): Relation[] {
  return relationIndexFor(world).get(id) ?? [];
}

function rememberRelation(world: WorldState, relation: Relation): void {
  const index = relationIndexFor(world);
  for (const id of [relation.a, relation.b]) {
    const list = index.get(id) ?? [];
    if (!list.some((candidate) => candidate.id === relation.id)) list.push(relation);
    index.set(id, list);
  }
}

function conditionPasses(
  world: WorldState,
  subject: Person,
  condition: SceneCondition,
  date: WorldDate,
): boolean {
  if (!isRecord(condition) || typeof condition.kind !== 'string') return false;
  const age = ageAt(subject, date);
  const stage = stageForAge(age);
  switch (condition.kind) {
    case 'age':
      if (typeof condition.min === 'number' && age < condition.min) return false;
      if (typeof condition.max === 'number' && age > condition.max) return false;
      return true;
    case 'stage':
      return Array.isArray(condition.in) && condition.in.includes(stage);
    case 'cash': {
      const household = world.households[subject.householdId];
      if (!household) return false;
      if (typeof condition.min === 'number' && household.cash < condition.min) return false;
      if (typeof condition.max === 'number' && household.cash > condition.max) return false;
      return true;
    }
    case 'householdSize': {
      const household = world.households[subject.householdId];
      if (!household) return false;
      const size = household.memberIds.filter((id) => {
        const person = world.persons[id];
        return Boolean(person) && !person.died;
      }).length;
      if (typeof condition.min === 'number' && size < condition.min) return false;
      if (typeof condition.max === 'number' && size > condition.max) return false;
      return true;
    }
    case 'overcrowded': {
      const household = world.households[subject.householdId];
      if (!household) return false;
      const place = world.places[household.residenceId];
      const capacity = place?.capacity;
      if (!capacity) return condition.value === false;
      const size = household.memberIds.filter((id) => {
        const person = world.persons[id];
        return Boolean(person) && !person.died;
      }).length;
      return size > capacity === condition.value;
    }
    case 'health':
      if (typeof condition.min === 'number' && subject.health.vitality < condition.min) {
        return false;
      }
      if (typeof condition.max === 'number' && subject.health.vitality > condition.max) {
        return false;
      }
      return true;
    case 'education':
      return Array.isArray(condition.in) && condition.in.includes(subject.education.status);
    case 'employment':
      return Boolean(subject.employment) === condition.employed;
    case 'placeKind': {
      const kinds = personPlaceKinds(world, subject);
      return Array.isArray(condition.in) && condition.in.some((kind) => kinds.has(kind));
    }
    case 'hasRole':
      return subject.roles.includes(condition.role);
    case 'notHasRole':
      return !subject.roles.includes(condition.role);
    case 'development': {
      const development = world.macro?.developments?.[condition.id];
      const now = date.year * 12 + date.month;
      return Boolean(
        development &&
        development.status === 'active' &&
        development.end.year * 12 + development.end.month >= now,
      );
    }
    case 'capability': {
      const contract = subject.lifeContract?.capability;
      const flag = subject.life?.flags.find((item) => item.startsWith('capability:'))?.slice(11);
      return contract === condition.capability || flag === condition.capability;
    }
    case 'developmentType': {
      const now = date.year * 12 + date.month;
      return Object.values(world.macro?.developments ?? {}).some(
        (development) =>
          development.type === condition.type &&
          development.status === 'active' &&
          development.end.year * 12 + development.end.month >= now,
      );
    }
    case 'hasRelation':
      return relationsFor(world, subject.id).some((relation) => {
        if (relation.kind !== condition.relationKind) return false;
        if (relation.end !== undefined) return false;
        const otherId = relation.a === subject.id ? relation.b : relation.a;
        // A dead spouse is not a current partner. This also repairs old saves
        // where death did not explicitly close the relation.
        if (!world.persons[otherId] || world.persons[otherId]!.died) return false;
        if (
          condition.sameHousehold &&
          world.persons[otherId]!.householdId !== subject.householdId
        ) {
          return false;
        }
        if (typeof condition.minTrust !== 'number') return true;
        return relation.trust >= condition.minTrust;
      });
    case 'notHasRelation':
      return !relationsFor(world, subject.id).some((relation) => {
        if (relation.kind !== condition.relationKind) return false;
        if (relation.end !== undefined) return false;
        const otherId = relation.a === subject.id ? relation.b : relation.a;
        if (!world.persons[otherId] || world.persons[otherId]!.died) return false;
        if (
          condition.sameHousehold &&
          world.persons[otherId]!.householdId !== subject.householdId
        ) {
          return false;
        }
        return true;
      });
    case 'worldYear':
      if (typeof condition.min === 'number' && date.year < condition.min) return false;
      if (typeof condition.max === 'number' && date.year > condition.max) return false;
      return true;
    case 'pressure': {
      const region = macroForPerson(world, subject);
      const macroValue: Record<string, number> | undefined = region
        ? {
            war_supply_stress: region.parameters.warIntensity,
            influenza_1918: region.parameters.epidemicInfluenza,
            infant_diarrhoea: 1 - region.parameters.sanitation,
            household_cash_shortfall: 1 - region.parameters.foodSupply,
            family_separation: region.parameters.warIntensity,
            orphan_risk: region.parameters.warIntensity * 0.75,
          }
        : undefined;
      const value = macroValue?.[condition.key] ?? world.pressures[condition.key];
      return typeof value === 'number' && Number.isFinite(value) && value >= condition.min;
    }
    default:
      return false;
  }
}

function conditionsPass(
  world: WorldState,
  subject: Person,
  conditions: SceneCondition[] | undefined,
  date: WorldDate,
): boolean {
  if (conditions === undefined) return true;
  if (!Array.isArray(conditions)) return false;
  return conditions.every((condition) => conditionPasses(world, subject, condition, date));
}

function sceneEligible(
  context: EngineContext,
  definition: SceneDefinition,
  subject: Person,
  date: WorldDate,
): boolean {
  if (subject.died) return false;
  if (definition.subjectIds !== undefined && !definition.subjectIds.includes(subject.id))
    return false;
  if (
    definition.subjectProvenance !== undefined &&
    !definition.subjectProvenance.includes(subject.provenance.kind)
  )
    return false;
  // An asynchronous birth contract must be compiled before a capability-gated
  // event can be offered. Otherwise the child could pass/fail an ability check
  // before the contract response arrives.
  if (
    !subject.lifeContract?.compiledAt &&
    definition.conditions.some((condition) => condition.kind === 'capability')
  )
    return false;
  const age = ageAt(subject, date);
  if (stageForAge(age) !== definition.stage) return false;
  if (age < definition.ageWindow.min || age > definition.ageWindow.max) return false;
  if (!conditionsPass(context.world, subject, definition.conditions, date)) return false;

  const historyKey = sceneKey(definition.id, subject.id);
  const lastResolved = context.sceneHistory.get(historyKey);
  // A scene never resolves twice for the same person in the same calendar
  // year, even across the two annual checkpoints.
  if (lastResolved !== undefined && Math.floor(lastResolved / 12) === date.year) return false;
  if (definition.oncePerPerson === true && lastResolved !== undefined) return false;
  if (typeof definition.cooldownYears === 'number' && definition.cooldownYears > 0) {
    if (
      lastResolved !== undefined &&
      monthIndex(date) - lastResolved < definition.cooldownYears * 12
    ) {
      return false;
    }
  }
  return true;
}

function isRoleRequirement(value: unknown): value is SceneDefinition['roles'][number] {
  return (
    isRecord(value) &&
    typeof value.key === 'string' &&
    value.key.length > 0 &&
    typeof value.kind === 'string' &&
    ROLE_KINDS.has(value.kind)
  );
}

function ageFits(
  person: Person,
  requirement: SceneDefinition['roles'][number],
  date: WorldDate,
): boolean {
  const age = ageAt(person, date);
  if (typeof requirement.minAge === 'number' && age < requirement.minAge) return false;
  if (typeof requirement.maxAge === 'number' && age > requirement.maxAge) return false;
  return true;
}

function personMatchesRole(
  world: WorldState,
  subject: Person,
  person: Person,
  requirement: SceneDefinition['roles'][number],
  date: WorldDate,
): boolean {
  if (person.died || !aliveAt(person, date)) return false;
  if (!ageFits(person, requirement, date)) return false;
  const expectedSex =
    requirement.sex === 'opposite' ? (subject.sex === 'male' ? 'female' : 'male') : requirement.sex;
  if (expectedSex !== undefined && person.sex !== expectedSex) return false;
  if (requirement.sameHousehold === true && person.householdId !== subject.householdId) {
    return false;
  }
  const memberships = personOrganizations(world, person);
  if (requirement.samePlaceKind !== undefined) {
    const placeKinds = [
      world.places[person.locationId]?.kind,
      person.employment ? world.places[person.employment.workplaceId]?.kind : undefined,
      person.education.placeId ? world.places[person.education.placeId]?.kind : undefined,
      ...memberships.map((organization) => world.places[organization.placeId]?.kind),
    ];
    if (!placeKinds.includes(requirement.samePlaceKind)) return false;
  }
  if (requirement.occupation !== undefined) {
    if (!person.employment) return false;
    if (person.employment.occupation.toLowerCase() !== requirement.occupation.toLowerCase()) {
      return false;
    }
  }
  if (requirement.organizationKind !== undefined) {
    if (!memberships.some((organization) => organization.kind === requirement.organizationKind)) {
      return false;
    }
  }
  return true;
}

function personPlaceKinds(world: WorldState, person: Person): Set<Place['kind']> {
  const kinds = new Set<Place['kind']>();
  const add = (placeId: Id | undefined) => {
    if (!placeId) return;
    const place = world.places[placeId];
    if (place) kinds.add(place.kind);
  };
  add(person.locationId);
  add(person.employment?.workplaceId);
  add(person.education.placeId);
  for (const organization of personOrganizations(world, person)) add(organization.placeId);
  return kinds;
}

function personOrganizations(world: WorldState, person: Person): Organization[] {
  const organizations = new Set<Organization>();
  if (person.employment) {
    const employer = world.organizations[person.employment.organizationId];
    if (employer) organizations.add(employer);
  }
  for (const organization of Object.values(world.organizations)) {
    if (organization.memberIds.includes(person.id)) organizations.add(organization);
    if (
      organization.positions.some((positionId) => {
        const position = world.positions[positionId];
        return position?.holderId === person.id;
      })
    ) {
      organizations.add(organization);
    }
  }
  return [...organizations].sort((a, b) => a.id.localeCompare(b.id));
}

function organizationMatchesRole(
  world: WorldState,
  organization: Organization,
  requirement: SceneDefinition['roles'][number],
): boolean {
  if (organization.status !== 'active') return false;
  if (
    requirement.organizationKind !== undefined &&
    organization.kind !== requirement.organizationKind
  ) {
    return false;
  }
  if (requirement.samePlaceKind !== undefined) {
    const place = world.places[organization.placeId];
    if (!place || place.kind !== requirement.samePlaceKind) return false;
  }
  return true;
}

function personIdsWithRole(world: WorldState, role: string): Id[] {
  return sortedPeople(world).filter((id) => world.persons[id]?.roles.includes(role));
}

const sortedPeopleCache = new WeakMap<WorldState, { length: number; people: Id[] }>();

function sortedPeople(world: WorldState): Id[] {
  const cached = sortedPeopleCache.get(world);
  const length = Object.keys(world.persons).length;
  if (cached && cached.length === length) return cached.people;
  const people = Object.keys(world.persons).sort();
  sortedPeopleCache.set(world, { length, people });
  return people;
}

function roleCandidates(
  world: WorldState,
  subject: Person,
  requirement: SceneDefinition['roles'][number],
): Id[] {
  if (requirement.kind === 'subject') return [subject.id];
  const people = sortedPeople(world);
  const organizations = Object.keys(world.organizations).sort();
  const candidates = new Set<Id>();

  switch (requirement.kind) {
    case 'parent':
      for (const id of subject.parentIds) if (world.persons[id]) candidates.add(id);
      break;
    case 'guardian': {
      const household = world.households[subject.householdId];
      for (const id of subject.guardianIds) if (world.persons[id]) candidates.add(id);
      for (const id of household?.guardianIds ?? []) if (world.persons[id]) candidates.add(id);
      break;
    }
    case 'sibling':
      for (const id of people) {
        if (id === subject.id) continue;
        const person = world.persons[id]!;
        if (person.parentIds.some((parentId) => subject.parentIds.includes(parentId))) {
          candidates.add(id);
        }
      }
      break;
    case 'partner':
      for (const id of people) {
        if (id === subject.id) continue;
        const person = world.persons[id]!;
        if (person.died) continue;
        if (person.householdId === subject.householdId && requirement.sameHousehold !== true)
          continue;
        if (person.parentIds.includes(subject.id) || subject.parentIds.includes(person.id))
          continue;
        if (person.parentIds.some((parentId) => subject.parentIds.includes(parentId))) continue;
        const personRelations = relationsFor(world, id);
        const partneredWithSubject = personRelations.some(
          (relation) =>
            relation.kind === 'partner' &&
            relation.end === undefined &&
            ((relation.a === id && relation.b === subject.id) ||
              (relation.b === id && relation.a === subject.id)),
        );
        if (requirement.sameHousehold === true && !partneredWithSubject) continue;
        const partneredWithAnother = personRelations.some(
          (relation) =>
            relation.kind === 'partner' &&
            relation.end === undefined &&
            ((relation.a === id && relation.b !== subject.id) ||
              (relation.b === id && relation.a !== subject.id)),
        );
        if (partneredWithAnother) continue;
        candidates.add(id);
      }
      break;
    case 'teacher':
      for (const id of people) {
        if (id === subject.id) continue;
        const person = world.persons[id]!;
        const organization = person.employment
          ? world.organizations[person.employment.organizationId]
          : undefined;
        const workplace = person.employment
          ? world.places[person.employment.workplaceId]
          : undefined;
        if (
          person.roles.includes('teacher') ||
          person.employment?.occupation.toLowerCase().includes('teacher') ||
          organization?.kind === 'school' ||
          workplace?.kind === 'school'
        ) {
          candidates.add(id);
        }
      }
      break;
    case 'employer': {
      if (subject.employment && world.organizations[subject.employment.organizationId]) {
        candidates.add(subject.employment.organizationId);
      }
      for (const id of organizations) {
        const organization = world.organizations[id]!;
        if (organization.memberIds.includes(subject.id)) candidates.add(id);
      }
      // A laid-off worker still has an employer relation. Use it so the former
      // employer can appear in an accident/claim scene after unemployment.
      for (const relation of Object.values(world.relations)) {
        if (relation.a !== subject.id || relation.kind !== 'employer') continue;
        const employer = world.persons[relation.b];
        if (!employer) continue;
        for (const organization of personOrganizations(world, employer)) {
          candidates.add(organization.id);
        }
      }
      // A young person looking for a first apprenticeship has no employer
      // relation yet. Only when an organization kind is explicitly required,
      // fall back to that open pool (e.g. a printshop taking apprentices).
      if (candidates.size === 0 && requirement.organizationKind !== undefined) {
        for (const id of organizations) {
          const organization = world.organizations[id]!;
          if (
            organization.kind === requirement.organizationKind &&
            organization.status === 'active'
          )
            candidates.add(id);
        }
      }
      break;
    }
    case 'worker': {
      // Prefer the subject's own workplace; fall back to the wider pool when the
      // subject is not employed.
      const employer = subject.employment
        ? world.organizations[subject.employment.organizationId]
        : undefined;
      const pool = employer ? [...employer.memberIds].sort() : people;
      for (const id of pool) {
        if (id === subject.id) continue;
        const person = world.persons[id];
        if (!person) continue;
        if (person.roles.includes('worker') || person.employment) candidates.add(id);
      }
      break;
    }
    case 'union_member': {
      const unionOrganizations = new Set(
        organizations.filter((id) => world.organizations[id]?.kind === 'union'),
      );
      for (const id of people) {
        if (id === subject.id) continue;
        const person = world.persons[id]!;
        if (person.roles.includes('union_member')) {
          candidates.add(id);
          continue;
        }
        if (person.employment && unionOrganizations.has(person.employment.organizationId)) {
          candidates.add(id);
        }
      }
      break;
    }
    case 'neighbor': {
      const household = world.households[subject.householdId];
      for (const id of people) {
        if (id === subject.id) continue;
        const person = world.persons[id]!;
        const sameResidence =
          household !== undefined &&
          world.households[person.householdId]?.residenceId === household.residenceId;
        if (
          sameResidence ||
          person.locationId === subject.locationId ||
          person.roles.includes('neighbor')
        ) {
          candidates.add(id);
        }
      }
      break;
    }
    case 'official':
      for (const id of people) {
        if (id === subject.id) continue;
        const person = world.persons[id]!;
        const organization = person.employment
          ? world.organizations[person.employment.organizationId]
          : undefined;
        const workplace = person.employment
          ? world.places[person.employment.workplaceId]
          : undefined;
        if (
          person.roles.includes('official') ||
          organization?.kind === 'state' ||
          workplace?.kind === 'government'
        ) {
          candidates.add(id);
        }
      }
      break;
    case 'organization':
      for (const id of organizations) candidates.add(id);
      break;
    default:
      break;
  }

  return [...candidates].sort();
}

function candidateFits(
  world: WorldState,
  subject: Person,
  id: Id,
  requirement: SceneDefinition['roles'][number],
  date: WorldDate,
): boolean {
  const organization = world.organizations[id];
  if (organization) return organizationMatchesRole(world, organization, requirement);
  const person = world.persons[id];
  if (!person) return false;
  return personMatchesRole(world, subject, person, requirement, date);
}

const MATERIALIZABLE_ROLES = new Set(['neighbor', 'worker']);

const MATERIALIZED_SURNAMES = [
  'Huber',
  'Bauer',
  'Lechner',
  'Stein',
  'Winter',
  'Moser',
  'Kral',
  'Weiss',
  'Hofer',
  'Berg',
];

/**
 * Take one person from the region's real single-year cohort and give them a
 * stable Person/household identity. This is the only route from background
 * population to named population; no scene can conjure a person without a
 * cohort debit.
 */
function materializeRoleCandidate(
  context: EngineContext,
  subject: Person,
  requirement: {
    key: string;
    kind: string;
    minAge?: number;
    maxAge?: number;
    sex?: Person['sex'] | 'opposite';
  },
  date: WorldDate,
  allowPartner = false,
): Id | undefined {
  if (!context.options.materializePopulation || !context.world.macro) return undefined;
  // A scene may need a shopkeeper/neighbour/partner, but the annual audit and
  // gameplay must not turn every missing role into a new named person.
  if (context.materializedCount >= 4) return undefined;
  if (
    !MATERIALIZABLE_ROLES.has(requirement.kind) &&
    !(allowPartner && requirement.kind === 'partner')
  )
    return undefined;
  const regionId = regionIdForPerson(context.world, subject);
  const population = context.world.macro.population[regionId];
  if (!population) return undefined;
  const rng = seededRng(
    context.world.seed,
    'materialize',
    subject.id,
    requirement.key,
    date.year,
    date.month,
    context.materializedCount,
  );
  const min = Math.max(16, Math.floor(requirement.minAge ?? 18));
  const max = Math.max(min, Math.min(90, Math.floor(requirement.maxAge ?? 65)));
  const age = Math.min(max, Math.max(min, Math.floor(min + rng() * (max - min + 1))));
  const sex: Person['sex'] =
    requirement.sex === 'opposite'
      ? subject.sex === 'male'
        ? 'female'
        : 'male'
      : requirement.sex === 'male' || requirement.sex === 'female'
        ? requirement.sex
        : rng() < 0.5
          ? 'female'
          : 'male';
  const cohortSex = sex;
  if (!takeBackgroundPerson(population, age, cohortSex)) return undefined;
  population.namedAlive = Math.max(0, population.namedAlive + 1);
  let ordinal = context.materializedCount + 1;
  let id = `person-materialized-${context.world.id}-${ordinal}`;
  while (context.world.persons[id]) {
    ordinal += 1;
    id = `person-materialized-${context.world.id}-${ordinal}`;
  }
  const homes = Object.values(context.world.places).filter(
    (place) => place.kind === 'home' && (place.regionId ?? 'region-lower-austria') === regionId,
  );
  const subjectHomeId = context.world.households[subject.householdId]?.residenceId;
  const subjectHome = subjectHomeId ? context.world.places[subjectHomeId] : undefined;
  const workplaces = Object.values(context.world.places).filter(
    (place) => place.kind === 'factory' && (place.regionId ?? 'region-lower-austria') === regionId,
  );
  const workplace = context.world.places[subject.employment?.workplaceId ?? ''] ?? workplaces[0];
  const residence =
    requirement.kind === 'neighbor' && subjectHome?.kind === 'home'
      ? subjectHome
      : (homes[Math.floor(rng() * homes.length)] ?? homes[0]);
  if (!residence) {
    // Put the cohort back if the region has no usable home; never create a
    // person without a valid place/household.
    population.unnamedByAgeSex![cohortSex][Math.min(100, age)] += 1;
    population.namedAlive = Math.max(0, population.namedAlive - 1);
    return undefined;
  }
  if (requirement.kind === 'worker' && !workplace) {
    // A worker role without a workplace is a fake institution; keep the scene
    // blocked rather than naming an unemployed person as a colleague.
    population.unnamedByAgeSex![cohortSex][Math.min(100, age)] += 1;
    population.namedAlive = Math.max(0, population.namedAlive - 1);
    return undefined;
  }
  const householdId = `household-materialized-${context.world.id}-${ordinal}`;
  const givenPool = sex === 'male' ? MALE_GIVEN_NAMES : FEMALE_GIVEN_NAMES;
  const given = givenPool[Math.floor(rng() * givenPool.length)]!;
  const surname = MATERIALIZED_SURNAMES[Math.floor(rng() * MATERIALIZED_SURNAMES.length)]!;
  let name = `${given} ${surname}`;
  let suffix = 1;
  while (Object.values(context.world.persons).some((person) => person.name === name)) {
    suffix += 1;
    name = `${given} ${surname} ${suffix}`;
  }
  const role =
    requirement.kind === 'teacher'
      ? 'teacher'
      : requirement.kind === 'official'
        ? 'official'
        : requirement.kind === 'worker'
          ? 'worker'
          : 'resident';
  const person: Person = {
    id,
    name,
    sex,
    born: { year: date.year - age, month: 1 },
    locationId: requirement.kind === 'worker' && workplace ? workplace.id : residence.id,
    householdId,
    parentIds: [],
    guardianIds: [],
    health: { vitality: 0.82, conditions: [], nutrition: 0.8 },
    traits: {
      care: 0.4 + rng() * 0.4,
      ambition: 0.3 + rng() * 0.5,
      tradition: 0.3 + rng() * 0.5,
      openness: 0.3 + rng() * 0.5,
      conscientiousness: 0.4 + rng() * 0.4,
      extraversion: 0.3 + rng() * 0.5,
      agreeableness: 0.4 + rng() * 0.4,
      neuroticism: 0.3 + rng() * 0.4,
    },
    education: {
      status: age < 15 ? 'primary' : 'primary',
      level: age < 15 ? 1 : 2,
    },
    roles: ['resident', ...(role === 'resident' ? [] : [role])],
    projectIds: [],
    relationshipIds: [],
    knowledgeIds: [],
    life: {
      mood: 0,
      reputation: 0,
      skills: { literacy: 0.1, numeracy: 0.1, craft: 0, social: 0 },
      flags: [],
    },
    provenance: { kind: 'materialized_population', sourceId: regionId },
  };
  if (requirement.kind === 'worker' && workplace && subject.employment) {
    person.employment = {
      organizationId: subject.employment.organizationId,
      occupation: 'worker',
      wage: Math.max(0, subject.employment.wage * 0.9),
      since: { ...date },
      workplaceId: workplace.id,
    };
    const organization = context.world.organizations[subject.employment.organizationId];
    if (organization && !organization.memberIds.includes(id)) organization.memberIds.push(id);
  }
  context.world.persons[id] = person;
  context.world.households[householdId] = {
    id: householdId,
    residenceId: residence.id,
    memberIds: [id],
    guardianIds: [],
    cash: 5,
    food: 5,
    debt: 0,
    rent: 1,
    obligations: [],
    assets: [],
    sharingRules: 'pooled',
  };
  context.materializedCount += 1;
  context.diagnostics.statistical.materialized += 1;
  context.diagnostics.materializations.push({
    personId: id,
    role: requirement.key,
    kind: requirement.kind,
    regionId,
    reason: `missing required ${requirement.kind} role on ${date.year}-${date.month}`,
  });
  return id;
}

function castSceneRoles(
  context: EngineContext,
  definition: SceneDefinition,
  subject: Person,
  date: WorldDate,
): CastResult {
  const roles: Record<Id, Id> = {};
  const missing: string[] = [];
  const usedPeople = new Set<Id>();

  for (const requirement of definition.roles) {
    if (!isRoleRequirement(requirement)) {
      const raw = requirement as unknown as { required?: boolean };
      if (raw.required !== false) missing.push('invalid');
      continue;
    }
    const required = requirement.required !== false;
    let candidates = roleCandidates(context.world, subject, requirement).filter((id) =>
      candidateFits(context.world, subject, id, requirement, date),
    );
    // Development scenes must use the organization created by the active
    // development, not an unrelated army/church/party that happens to match the
    // generic organization role.
    if (
      requirement.kind === 'organization' &&
      (definition.tags.includes('development') || definition.tags.includes('social_movement'))
    ) {
      const socialMovement = definition.tags.includes('social_movement');
      const activeDevelopmentOrgs = new Set(
        Object.values(context.world.macro?.developments ?? {})
          .filter(
            (development) =>
              development.status === 'active' &&
              development.organizationId &&
              development.end.year * 12 + development.end.month >= date.year * 12 + date.month &&
              (!socialMovement ||
                development.type === 'social_change' ||
                development.eventFamilyIds.includes('vienna-social-movement')),
          )
          .map((development) => development.organizationId!),
      );
      const preferred = candidates.filter((id) => activeDevelopmentOrgs.has(id));
      if (preferred.length > 0) candidates = preferred;
    }
    const unused = candidates.filter((id) => !usedPeople.has(id) || requirement.kind === 'subject');
    const pool = unused.length > 0 ? unused : candidates;
    if (pool.length === 0) {
      if (required) {
        const materialized = materializeRoleCandidate(
          context,
          subject,
          requirement,
          date,
          requirement.kind === 'partner' &&
            (definition.tags.includes('courtship') ||
              definition.id.startsWith('vienna-family-courtship')),
        );
        if (materialized) {
          roles[requirement.key] = materialized;
          usedPeople.add(materialized);
          continue;
        }
        missing.push(requirement.key);
      }
      continue;
    }
    const rng = seededRng(
      context.world.seed,
      'role',
      definition.id,
      subject.id,
      requirement.key,
      date.year,
      date.month,
    );
    const selected = pool[Math.min(pool.length - 1, Math.floor(rng() * pool.length))]!;
    roles[requirement.key] = selected;
    if (context.world.persons[selected]) usedPeople.add(selected);
  }

  return { roles, missing };
}

function eligibleOutcome(
  world: WorldState,
  subject: Person,
  outcome: unknown,
  date: WorldDate,
): outcome is SceneOutcome {
  if (!isRecord(outcome)) return false;
  if (typeof outcome.id !== 'string' || outcome.id.length === 0) return false;
  if (typeof outcome.weight !== 'number' || !Number.isFinite(outcome.weight)) return false;
  if (outcome.weight <= 0) return false;
  if (typeof outcome.immediateText !== 'string') return false;
  if (!Array.isArray(outcome.effects)) return false;
  return conditionsPass(
    world,
    subject,
    Array.isArray(outcome.conditions) ? (outcome.conditions as SceneCondition[]) : undefined,
    date,
  );
}

function usableChoices(
  world: WorldState,
  subject: Person,
  definition: SceneDefinition,
  date: WorldDate,
): SceneChoice[] {
  if (!Array.isArray(definition.choices)) return [];
  return definition.choices.filter((choice) => {
    if (!isRecord(choice) || typeof choice.id !== 'string' || !Array.isArray(choice.outcomes)) {
      return false;
    }
    if (
      !conditionsPass(
        world,
        subject,
        Array.isArray(choice.conditions) ? (choice.conditions as SceneCondition[]) : undefined,
        date,
      )
    ) {
      return false;
    }
    return choice.outcomes.some((outcome) => eligibleOutcome(world, subject, outcome, date));
  });
}

function weightedPick<T extends { weight: number }>(
  outcomes: T[],
  rng: () => number,
): T | undefined {
  const total = outcomes.reduce((sum, outcome) => sum + outcome.weight, 0);
  if (!(total > 0)) return undefined;
  let ticket = rng() * total;
  for (const outcome of outcomes) {
    ticket -= outcome.weight;
    if (ticket < 0) return outcome;
  }
  return outcomes[outcomes.length - 1];
}

function pickChoice(
  context: EngineContext,
  definition: SceneDefinition,
  subject: Person,
  roles: Record<Id, Id>,
  choices: SceneChoice[],
  date: WorldDate,
): { choice: SceneChoice; reason: string } | undefined {
  if (choices.length === 0) return undefined;
  const defaultChoice = choices[0]!;
  const policy = context.options.choicePolicy;
  if (!policy) return { choice: defaultChoice, reason: 'first_eligible' };

  const rng = seededRng(
    context.world.seed,
    'choice',
    definition.id,
    subject.id,
    date.year,
    date.month,
  );
  try {
    const decision = policy({
      world: context.world,
      scene: definition,
      subject,
      roleIds: roles,
      date,
      rng,
      choices,
    });
    if (decision && typeof decision === 'object' && 'then' in decision) {
      warnContext(context, 'async_decision_unsupported', 'choice policy returned a promise', {
        personId: subject.id,
        sceneId: definition.id,
      });
      return { choice: defaultChoice, reason: 'first_eligible' };
    }
    const choiceId = typeof decision === 'string' ? decision : decision?.choiceId;
    if (choiceId === undefined) return { choice: defaultChoice, reason: 'first_eligible' };
    const matched = choices.find((choice) => choice.id === choiceId);
    if (!matched) {
      warnContext(context, 'invalid_choice_decision', `unknown choice ${choiceId}`, {
        personId: subject.id,
        sceneId: definition.id,
      });
      return { choice: defaultChoice, reason: 'first_eligible' };
    }
    return {
      choice: matched,
      reason:
        decision !== null && typeof decision === 'object' && typeof decision.reason === 'string'
          ? decision.reason
          : 'policy',
    };
  } catch (error) {
    warnContext(context, 'choice_policy_failed', `choice policy threw: ${String(error)}`, {
      personId: subject.id,
      sceneId: definition.id,
    });
    return { choice: defaultChoice, reason: 'first_eligible' };
  }
}

function selectOutcome(
  context: EngineContext,
  definition: SceneDefinition,
  subject: Person,
  roles: Record<Id, Id>,
  date: WorldDate,
): OutcomeSelection | undefined {
  let outcomes: SceneOutcome[];
  let choice: SceneChoice | undefined;
  let choiceReason: string | undefined;

  if (Array.isArray(definition.choices) && definition.choices.length > 0) {
    const choices = usableChoices(context.world, subject, definition, date);
    const picked = pickChoice(context, definition, subject, roles, choices, date);
    if (!picked) return undefined;
    choice = picked.choice;
    choiceReason = picked.reason;
    outcomes = (choice.outcomes ?? []).filter((outcome) =>
      eligibleOutcome(context.world, subject, outcome, date),
    );
  } else {
    outcomes = (definition.outcomes ?? []).filter((outcome) =>
      eligibleOutcome(context.world, subject, outcome, date),
    );
  }

  if (outcomes.length === 0) return undefined;

  const rng = seededRng(
    context.world.seed,
    'outcome',
    definition.id,
    subject.id,
    choice?.id ?? '',
    date.year,
    date.month,
  );

  if (context.options.outcomePolicy) {
    try {
      const decision = context.options.outcomePolicy({
        world: context.world,
        scene: definition,
        subject,
        roleIds: roles,
        date,
        rng,
        choice,
        outcomes,
      });
      if (decision && typeof decision === 'object' && 'then' in decision) {
        warnContext(context, 'async_decision_unsupported', 'outcome policy returned a promise', {
          personId: subject.id,
          sceneId: definition.id,
        });
      } else {
        const outcomeId = typeof decision === 'string' ? decision : decision?.outcomeId;
        if (outcomeId !== undefined) {
          const matched = outcomes.find((outcome) => outcome.id === outcomeId);
          if (matched) {
            return {
              outcome: matched,
              choice,
              reason:
                decision !== null &&
                typeof decision === 'object' &&
                typeof decision.reason === 'string'
                  ? decision.reason
                  : (choiceReason ?? 'policy'),
            };
          }
          warnContext(context, 'invalid_outcome_decision', `unknown outcome ${outcomeId}`, {
            personId: subject.id,
            sceneId: definition.id,
          });
        }
      }
    } catch (error) {
      warnContext(context, 'outcome_policy_failed', `outcome policy threw: ${String(error)}`, {
        personId: subject.id,
        sceneId: definition.id,
      });
    }
  }

  const selected = weightedPick(
    outcomes,
    seededRng(
      context.world.seed,
      'weighted-outcome',
      definition.id,
      subject.id,
      choice?.id ?? '',
      date.year,
      date.month,
    ),
  );
  if (!selected) return undefined;
  return {
    outcome: selected,
    choice,
    reason: choiceReason === undefined ? 'weighted' : `${choiceReason}/weighted`,
  };
}

function fundingOrganizations(world: WorldState, subject: Person, roles: Record<Id, Id>): Id[] {
  const result: Id[] = [];
  const push = (id: Id | undefined) => {
    if (!id || !world.organizations[id] || result.includes(id)) return;
    result.push(id);
  };
  for (const [key, id] of Object.entries(roles)) {
    if (key === 'employer') push(id);
  }
  push(subject.employment?.organizationId);
  for (const id of Object.values(roles)) push(id);
  return result;
}

function buildParticipants(
  world: WorldState,
  subject: Person,
  roles: Record<Id, Id>,
): EventParticipant[] {
  const participants: EventParticipant[] = [{ personId: subject.id, role: 'subject' }];
  const seen = new Set<string>([`${subject.id}\u0000subject`]);
  for (const [role, id] of Object.entries(roles)) {
    if (!world.persons[id] || id === subject.id) continue;
    const key = `${id}\u0000${role}`;
    if (seen.has(key)) continue;
    seen.add(key);
    participants.push({ personId: id, role });
  }
  return participants;
}

function selectNarration(
  context: EngineContext,
  definition: SceneDefinition,
  outcome: SceneOutcome,
  subject: Person,
  roles: Record<Id, Id>,
  date: WorldDate,
): string {
  const key = outcome.narrationKey ?? outcome.id;
  const variants = (definition.narration ?? [])
    .filter(
      (variant) =>
        variant.key === key &&
        conditionsPass(
          context.world,
          subject,
          Array.isArray(variant.conditions) ? variant.conditions : undefined,
          date,
        ),
    )
    .map((variant) => ({
      variant,
      text: interpolateSceneText(variant.text, context.world, subject, roles, date),
    }))
    .filter((entry) => !/\{[a-zA-Z_][a-zA-Z0-9_]*\}/.test(entry.text));
  if (variants.length === 0)
    return interpolateSceneText(outcome.immediateText, context.world, subject, roles, date);
  const picked =
    variants[
      Math.floor(
        seededRng(
          context.world.seed,
          'narration',
          definition.id,
          outcome.id,
          subject.id,
          date.year,
        )() * variants.length,
      ) % variants.length
    ]!;
  return picked.text;
}

/**
 * Universal scenes cannot know a player-born child's name when they are
 * authored. They write `{subject}`, `{mother}`, `{place}` and similar tokens;
 * the simulator replaces them with the actual cast at commit time. Unknown
 * tokens stay literal so a broken reference is visible instead of silently
 * inventing a person.
 */
export function interpolateSceneText(
  text: string,
  world: WorldState,
  subject: Person,
  roles: Record<Id, Id>,
  date: WorldDate,
): string {
  const residence = world.households[subject.householdId]?.residenceId;
  const values: Record<string, string | undefined> = {
    subject: subject.name,
    place: world.places[subject.locationId]?.name,
    residence: residence ? world.places[residence]?.name : undefined,
    school: subject.education.placeId
      ? world.places[subject.education.placeId]?.name
      : Object.values(world.places).find((place) => place.kind === 'school')?.name,
    workplace: subject.employment ? world.places[subject.employment.workplaceId]?.name : undefined,
    age: String(ageAt(subject, date)),
    year: String(date.year),
  };
  for (const [role, roleId] of Object.entries(roles)) {
    values[role] = world.persons[roleId]?.name ?? world.organizations[roleId]?.name;
  }
  return text.replace(/\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g, (token, key: string) => {
    const value = values[key];
    return value === undefined || value.length === 0 ? token : value;
  });
}

function runScenes(
  context: EngineContext,
  definitions: SceneDefinition[],
  date: WorldDate,
  resolvedCounts: Map<Id, number>,
  startOnly: boolean,
): void {
  const personIds = Object.keys(context.world.persons).sort();
  for (const personId of personIds) {
    const subject = context.world.persons[personId];
    if (!subject || subject.died) continue;
    // Refresh in case a previous subject's scene killed or moved this person.
    if (!aliveAt(subject, date)) continue;

    let resolvedForPerson = resolvedCounts.get(personId) ?? 0;
    for (const definition of definitions) {
      if (resolvedForPerson >= context.options.maxScenesPerPerson) break;
      // The year-start pass is only for last-chance windows (birth, leaving an
      // age/stage/year band). Everything still eligible at the year end waits
      // for the end-of-year pass, avoiding a double resolution per advance.
      if (startOnly && sceneEligible(context, definition, subject, context.target)) continue;
      if (!sceneEligible(context, definition, subject, date)) continue;
      const cast = castSceneRoles(context, definition, subject, date);
      if (cast.missing.length > 0) {
        recordBlocked(
          context,
          definition,
          subject,
          cast.roles,
          `missing_role:${cast.missing.join(',')}`,
          date,
        );
        continue;
      }
      const selection = selectOutcome(context, definition, subject, cast.roles, date);
      if (!selection) {
        recordBlocked(context, definition, subject, cast.roles, 'no_eligible_outcome', date);
        continue;
      }
      resolveScene(context, definition, subject, cast.roles, selection, date);
      resolvedForPerson += 1;
      resolvedCounts.set(personId, resolvedForPerson);
    }
  }
}

function birthContractCostEffects(
  subject: Person,
  definition: SceneDefinition,
  date: WorldDate,
): EventEffect[] {
  const contract = subject.lifeContract;
  if (!contract?.costs?.length || !contract.capability || contract.capability === 'none') return [];
  const capabilityTags: Record<string, string[]> = {
    literacy: ['education', 'school'],
    numeracy: ['work', 'market'],
    social_insight: ['social', 'family'],
    craft_affinity: ['craft', 'work', 'apprentice'],
    frail_body: ['health', 'infancy', 'care'],
    craft: ['work', 'apprentice'],
    social: ['social', 'family'],
    health: ['health', 'infancy'],
  };
  const relevant = capabilityTags[contract.capability] ?? [];
  if (!relevant.some((tag) => definition.tags.includes(tag))) return [];
  const yearFlag = `birth_cost:${date.year}`;
  if (subject.life?.flags.includes(yearFlag)) return [];
  const effects: EventEffect[] = [];
  for (const cost of contract.costs) {
    if (!cost.tags.some((tag) => relevant.includes(tag))) continue;
    if (cost.kind === 'vitality_cost') {
      effects.push({
        type: 'health',
        personId: subject.id,
        amount: -Math.min(0.08, cost.maxEffect * 0.25),
        reason: 'birth contract vitality cost',
      });
    } else if (cost.kind === 'attention_cost' || cost.kind === 'opportunity_cost') {
      effects.push({
        type: 'mood',
        personId: subject.id,
        amount: -Math.min(0.06, cost.maxEffect * 0.2),
        reason: 'birth contract attention cost',
      });
    } else if (cost.kind === 'care_duty') {
      effects.push({
        type: 'condition',
        personId: subject.id,
        condition: 'care duty',
        add: true,
        reason: 'birth contract care duty',
      });
    }
  }
  if (effects.length > 0)
    effects.push({
      type: 'flag',
      personId: subject.id,
      flag: yearFlag,
      add: true,
      reason: 'birth contract cost paid for this year',
    });
  return effects;
}

/**
 * Effective per-person rate for an ordinary scene. Exported for content audits
 * and tests so capability/contract weighting is inspectable rather than hidden
 * inside the scheduler. It does not mutate state.
 */
export function v4EventRate(
  context: EngineContext | null,
  definition: SceneDefinition,
  subject: Person,
  _date: WorldDate,
): number {
  const explicit = definition.rate;
  const base =
    typeof explicit === 'number' && Number.isFinite(explicit)
      ? explicit
      : definition.triggerMode === 'fact' || definition.triggerMode === 'action'
        ? 1
        : definition.oncePerPerson
          ? 1
          : 0.12;
  let rate = clamp(base, 0, 1);
  // Contract-driven advantage is computed separately so `limits` can bound the
  // total tilt instead of just one clause. Owned/focal and ambient modifiers
  // stay outside this ceiling.
  let contractMultiplier = 1;
  const contract = subject.lifeContract;
  const focus = contract?.focus;
  if (focus && focus !== 'none') {
    if (definition.tags.includes(focus) || definition.familyId?.includes(focus))
      contractMultiplier *= 1.5;
  }
  const contractConditions = contract?.conditions ?? [];
  const matchingConditions = contractConditions.filter((condition) =>
    condition.tags.some((tag) => definition.tags.includes(tag)),
  );
  if (matchingConditions.length > 0) {
    contractMultiplier *= Math.min(
      1.5,
      1 + matchingConditions.reduce((sum, condition) => sum + condition.maxEffect, 0) * 0.6,
    );
  }
  const capability = subject.life?.flags.find((flag) => flag.startsWith('capability:'))?.slice(11);
  const capabilityTags: Record<string, string[]> = {
    literacy: ['education', 'school'],
    numeracy: ['work', 'market'],
    social_insight: ['social', 'family'],
    craft_affinity: ['craft', 'work', 'apprentice'],
    frail_body: ['health', 'infancy', 'care'],
    craft: ['work', 'apprentice'],
    social: ['social', 'family'],
    health: ['health', 'infancy'],
  };
  if (capability && capabilityTags[capability]?.some((tag) => definition.tags.includes(tag)))
    contractMultiplier *= 1.2;
  const matchingLimits = (contract?.limits ?? []).filter((limit) =>
    limit.tags.some((tag) => definition.tags.includes(tag)),
  );
  if (matchingLimits.length > 0) {
    const ceiling = 1 + matchingLimits.reduce((sum, limit) => sum + limit.maxEffect, 0);
    contractMultiplier = Math.min(contractMultiplier, ceiling);
  }
  rate = clamp(rate * contractMultiplier, 0, 1);
  if (subject.ownerId) rate *= 2.5;
  const mood = subject.life?.mood ?? 0;
  if (definition.tags.includes('social') || definition.tags.includes('family')) {
    rate *= mood >= 0.25 ? 1.15 : mood <= -0.35 ? 0.8 : 1;
  }
  if (subject.health.vitality < 0.4 && definition.tags.includes('health')) rate *= 1.25;
  if (definition.tags.includes('work') && subject.employment) rate *= 1.1;
  const regionId = context?.world
    ? regionIdForPerson(context.world, subject)
    : 'region-lower-austria';
  const pool = eventPoolMultiplier(context?.world?.macro, definition, regionId);
  if (pool <= 0) return 0;
  return clamp(rate * pool, 0, 1);
}

function eventTags(event: EventFact): string[] {
  const tags = new Set<string>();
  if (event.action === 'death') tags.add('death');
  if (event.action === 'birth') tags.add('birth');
  for (const effect of event.effects) {
    switch (effect.type) {
      case 'death':
        tags.add('death');
        break;
      case 'unemployment':
        tags.add('unemployment');
        break;
      case 'employment':
        tags.add('employment');
        break;
      case 'relation':
        if (effect.kind === 'partner') tags.add('partnership');
        break;
      case 'relation_end':
        if (effect.kind === 'partner') tags.add('separation');
        break;
      case 'household':
      case 'residence':
        tags.add('household');
        break;
      case 'move':
        tags.add('migration');
        break;
      case 'birth':
        tags.add('birth');
        break;
      case 'health':
        if (effect.amount < 0) tags.add('injury');
        break;
      default:
        break;
    }
  }
  return [...tags];
}

function scheduleFactTriggers(context: EngineContext, event: EventFact, depth: number): void {
  if (depth >= 3) return;
  const tags = eventTags(event);
  if (tags.length === 0) return;
  const queue = context.world.historyMeta.scheduledEvents ?? [];
  if (queue.length > 250) return;
  const subscribed = new Set<SceneDefinition>();
  for (const tag of tags) {
    for (const definition of context.triggerIndex.get(tag) ?? []) subscribed.add(definition);
  }
  const sourceSceneId = event.provenance.kind === 'scene' ? event.provenance.sourceId : undefined;
  for (const definition of subscribed) {
    const subject = context.world.persons[event.subjectId];
    if (!subject || subject.died) continue;
    // A scene may produce an effect tagged `injury` while itself subscribing to
    // injury facts (e.g. wound care worsening the wound). Without this guard it
    // schedules itself forever, and the log repeats the same recovery every year.
    if (definition.id === sourceSceneId || event.action.startsWith(`${definition.id}/`)) continue;
    const due = { year: event.date.year + 1, month: 1 };
    if (!sceneEligible(context, definition, subject, due)) continue;
    const id = `queue:fact:${event.id}:${definition.id}:${subject.id}`;
    if (queue.some((item) => item.id === id)) continue;
    queue.push({
      id,
      sceneId: definition.id,
      subjectId: subject.id,
      due,
      causeEventId: event.id,
      depth: depth + 1,
      source: 'fact',
    });
  }
  context.world.historyMeta.scheduledEvents = queue;
}

function scheduleFollowups(
  context: EngineContext,
  definition: SceneDefinition,
  outcome: SceneOutcome,
  subject: Person,
  roles: Record<Id, Id>,
  event: EventFact,
  date: WorldDate,
  depth: number,
): void {
  if (depth >= 3) return;
  const queue = context.world.historyMeta.scheduledEvents ?? [];
  const targets: SceneFollowupTarget[] = [
    ...(outcome.followupTargets ?? []),
    ...(outcome.followupSceneIds ?? []).map((sceneId) => ({ sceneId })),
  ];
  for (const target of targets) {
    const targetId = target.subjectRole ? roles[target.subjectRole] : subject.id;
    const targetPerson = targetId ? context.world.persons[targetId] : undefined;
    if (!targetPerson || targetPerson.died) continue;
    const due =
      target.delayMonths !== undefined && Number.isFinite(target.delayMonths)
        ? addMonths(date, Math.max(0, Math.floor(target.delayMonths)))
        : { year: date.year + 1, month: 1 };
    const id = `queue:${event.id}:${target.sceneId}:${targetPerson.id}`;
    if (queue.some((item) => item.id === id)) continue;
    queue.push({
      id,
      sceneId: target.sceneId,
      subjectId: targetPerson.id,
      due,
      causeEventId: event.id,
      depth: depth + 1,
      source: target.source ?? 'followup',
    });
  }
  context.world.historyMeta.scheduledEvents = queue;
}

function processScheduledEvents(
  context: EngineContext,
  definitions: SceneDefinition[],
  target: WorldDate,
): void {
  const byId = new Map(definitions.map((definition) => [definition.id, definition]));
  const queue = [...(context.world.historyMeta.scheduledEvents ?? [])].sort(
    (a, b) => monthIndex(a.due) - monthIndex(b.due) || a.id.localeCompare(b.id),
  );
  const remaining: ScheduledEvent[] = [];
  const initialIds = new Set(queue.map((item) => item.id));
  for (const item of queue) {
    if (monthIndex(item.due) > monthIndex(target)) {
      remaining.push(item);
      continue;
    }
    const definition = byId.get(item.sceneId);
    const primary = context.world.persons[item.subjectId];
    if (!definition || !primary || primary.died) continue;
    const date = item.due;
    const cause = item.causeEventId
      ? context.world.events.find((event) => event.id === item.causeEventId)
      : undefined;
    const candidateIds = [
      item.subjectId,
      ...(cause?.participants.map((participant) => participant.personId) ?? []),
      ...(context.world.households[primary.householdId]?.memberIds ?? []),
    ];
    let subject = primary;
    if (!sceneEligible(context, definition, subject, date)) {
      const alternate = [...new Set(candidateIds)]
        .map((id) => context.world.persons[id])
        .find(
          (person): person is Person =>
            Boolean(person) && !person.died && sceneEligible(context, definition, person, date),
        );
      if (!alternate) {
        warnContext(context, 'scheduled_event_ineligible', 'scheduled event no longer eligible', {
          personId: primary.id,
          sceneId: definition.id,
        });
        continue;
      }
      subject = alternate;
    }
    const cast = castSceneRoles(context, definition, subject, date);
    if (cast.missing.length > 0) {
      recordBlocked(
        context,
        definition,
        subject,
        cast.roles,
        `scheduled_missing_role:${cast.missing.join(',')}`,
        date,
      );
      continue;
    }
    const selection = selectOutcome(context, definition, subject, cast.roles, date);
    if (!selection) {
      recordBlocked(context, definition, subject, cast.roles, 'scheduled_no_outcome', date);
      continue;
    }
    resolveScene(
      context,
      definition,
      subject,
      cast.roles,
      selection,
      date,
      item.depth,
      item.causeEventId,
    );
  }
  const newlyScheduled = (context.world.historyMeta.scheduledEvents ?? []).filter(
    (item) => !initialIds.has(item.id),
  );
  const mergedQueue = new Map<string, ScheduledEvent>();
  for (const item of [...remaining, ...newlyScheduled]) mergedQueue.set(item.id, item);
  context.world.historyMeta.scheduledEvents = [...mergedQueue.values()];
}

function runEventYear(
  context: EngineContext,
  definitions: SceneDefinition[],
  date: WorldDate,
  resolvedCounts: Map<Id, number>,
): void {
  const byStage = new Map<SceneStage, SceneDefinition[]>();
  for (const definition of definitions) {
    const list = byStage.get(definition.stage) ?? [];
    list.push(definition);
    byStage.set(definition.stage, list);
  }
  const personIds = Object.keys(context.world.persons).sort();
  for (const personId of personIds) {
    let subject = context.world.persons[personId];
    if (!subject || subject.died) continue;
    let ordinary = 0;
    const used = new Set<string>();
    const ordinaryCap = subject.ownerId
      ? Math.max(context.options.maxOrdinaryEventsPerPerson, 6)
      : context.options.maxOrdinaryEventsPerPerson;
    // Once-per-person milestones (school entry, first apprenticeship, a
    // historical epidemic) must not be crowded out by weighted ordinary
    // events. Resolve at most one milestone first, then fill with ordinary
    // events.
    const stageDefinitionsForMilestone = byStage.get(stageForAge(ageAt(subject, date))) ?? [];
    for (const definition of stageDefinitionsForMilestone) {
      if (!definition.oncePerPerson || used.has(definition.id)) continue;
      if (!sceneEligible(context, definition, subject, date)) continue;
      const cast = castSceneRoles(context, definition, subject, date);
      if (cast.missing.length > 0) {
        recordBlocked(
          context,
          definition,
          subject,
          cast.roles,
          `missing_role:${cast.missing.join(',')}`,
          date,
        );
        continue;
      }
      const selection = selectOutcome(context, definition, subject, cast.roles, date);
      if (!selection) {
        recordBlocked(context, definition, subject, cast.roles, 'no_eligible_outcome', date);
        continue;
      }
      resolveScene(context, definition, subject, cast.roles, selection, date, 0);
      ordinary += 1;
      used.add(definition.id);
      resolvedCounts.set(personId, (resolvedCounts.get(personId) ?? 0) + 1);
      subject = context.world.persons[personId];
      break;
    }
    // Lifecycle scenes (courtship, childbirth, separation) get one dedicated
    // attempt per person-year. A pack with dozens of ordinary neighbourhood
    // scenes must not crowd out the events that create the next generation.
    if (subject && !subject.died && ordinary < ordinaryCap) {
      const lifecycleDefinitions = (byStage.get(stageForAge(ageAt(subject, date))) ?? []).filter(
        (definition) => definition.tags.includes('lifecycle') && !used.has(definition.id),
      );
      const lifecycleCandidates: { definition: SceneDefinition; weight: number }[] = [];
      for (const definition of lifecycleDefinitions) {
        if (definition.triggerMode === 'fact' || definition.triggerMode === 'action') continue;
        if (!sceneEligible(context, definition, subject, date)) continue;
        const rate = v4EventRate(context, definition, subject, date);
        const rng = seededRng(
          context.world.seed,
          'lifecycle-rate',
          definition.id,
          subject.id,
          date.year,
          date.month,
        );
        if (rng() >= rate) continue;
        lifecycleCandidates.push({
          definition,
          weight: Math.max(0, definition.weight ?? 1),
        });
      }
      const chosen = weightedPick(
        lifecycleCandidates,
        seededRng(context.world.seed, 'lifecycle-choice', subject.id, date.year),
      );
      if (chosen) {
        used.add(chosen.definition.id);
        const cast = castSceneRoles(context, chosen.definition, subject, date);
        if (cast.missing.length > 0) {
          recordBlocked(
            context,
            chosen.definition,
            subject,
            cast.roles,
            `missing_role:${cast.missing.join(',')}`,
            date,
          );
        } else {
          const selection = selectOutcome(context, chosen.definition, subject, cast.roles, date);
          if (!selection) {
            recordBlocked(
              context,
              chosen.definition,
              subject,
              cast.roles,
              'no_eligible_outcome',
              date,
            );
          } else {
            resolveScene(context, chosen.definition, subject, cast.roles, selection, date, 0);
            ordinary += 1;
            resolvedCounts.set(personId, (resolvedCounts.get(personId) ?? 0) + 1);
            subject = context.world.persons[personId];
          }
        }
      }
    }
    while (ordinary < ordinaryCap) {
      if (!subject || subject.died) break;
      const candidates: { definition: SceneDefinition; weight: number }[] = [];
      const stageDefinitions = byStage.get(stageForAge(ageAt(subject, date))) ?? [];
      for (const definition of stageDefinitions) {
        if (used.has(definition.id)) continue;
        if (!sceneEligible(context, definition, subject, date)) continue;
        if (definition.triggerMode === 'fact' || definition.triggerMode === 'action') continue;
        const rate = v4EventRate(context, definition, subject, date);
        const rng = seededRng(
          context.world.seed,
          'rate',
          definition.id,
          subject.id,
          date.year,
          date.month,
        );
        if (rng() >= rate) continue;
        candidates.push({ definition, weight: Math.max(0, definition.weight ?? 1) });
      }
      if (candidates.length === 0) break;
      const chosen = weightedPick(
        candidates,
        seededRng(context.world.seed, 'event-choice', subject.id, date.year, String(ordinary)),
      );
      if (!chosen) break;
      used.add(chosen.definition.id);
      const cast = castSceneRoles(context, chosen.definition, subject, date);
      if (cast.missing.length > 0) {
        recordBlocked(
          context,
          chosen.definition,
          subject,
          cast.roles,
          `missing_role:${cast.missing.join(',')}`,
          date,
        );
        continue;
      }
      const selection = selectOutcome(context, chosen.definition, subject, cast.roles, date);
      if (!selection) {
        recordBlocked(context, chosen.definition, subject, cast.roles, 'no_eligible_outcome', date);
        continue;
      }
      const eventMonth =
        1 +
        (Math.floor(
          seededRng(
            context.world.seed,
            'event-month',
            chosen.definition.id,
            subject.id,
            date.year,
          )() * 12,
        ) %
          12);
      resolveScene(
        context,
        chosen.definition,
        subject,
        cast.roles,
        selection,
        { year: date.year, month: eventMonth },
        0,
      );
      ordinary += 1;
      resolvedCounts.set(personId, (resolvedCounts.get(personId) ?? 0) + 1);
      subject = context.world.persons[personId];
    }
  }
}

function recordBlocked(
  context: EngineContext,
  definition: SceneDefinition,
  subject: Person,
  roles: Record<Id, Id>,
  reason: string,
  date: WorldDate,
): void {
  const instance: SceneInstance = {
    id: nextSceneId(context),
    sceneId: definition.id,
    sceneVersion: definition.version,
    subjectId: subject.id,
    roles: { ...roles },
    date: { ...date },
    status: 'blocked',
    reason,
  };
  appendScene(context, instance);
  warnContext(context, 'scene_blocked', reason, {
    personId: subject.id,
    sceneId: definition.id,
  });
}

function hasRelationBetween(world: WorldState, a: Id, b: Id): boolean {
  return relationsFor(world, a).some(
    (relation) =>
      relation.end === undefined &&
      ((relation.a === a && relation.b === b) || (relation.a === b && relation.b === a)),
  );
}

/** Current residents only; memberIds is retained as a historical roster. */
function livingHouseholdMemberCount(world: WorldState, householdId: Id): number {
  const household = world.households[householdId];
  if (!household) return 0;
  return household.memberIds.filter((id) => {
    const person = world.persons[id];
    return Boolean(person && !person.died);
  }).length;
}

function householdCapacity(world: WorldState, householdId: Id): number {
  const household = world.households[householdId];
  if (!household) return 0;
  const declared = world.places[household.residenceId]?.capacity ?? 4;
  // Capacity is a crowding threshold, not a magical wall. Early Vienna flats
  // were genuinely overcrowded; allow up to twice the declared capacity but
  // never the pathological 60+ member household observed in the old world.
  return Math.max(10, Math.min(12, Math.ceil(declared * 2)));
}

function materializedContactEffects(
  context: EngineContext,
  subject: Person,
  roles: Record<Id, Id>,
  outcome: SceneOutcome,
): EventEffect[] {
  const effects: EventEffect[] = [];
  for (const id of new Set(Object.values(roles))) {
    if (id === subject.id) continue;
    const person = context.world.persons[id];
    if (!person || person.provenance.kind !== 'materialized_population') continue;
    if (hasRelationBetween(context.world, subject.id, id)) continue;
    const already = outcome.effects.some(
      (effect) =>
        effect.type === 'relation' &&
        ((effect.a === subject.id && effect.b === id) ||
          (effect.a === id && effect.b === subject.id)),
    );
    if (already) continue;
    effects.push({
      type: 'relation',
      a: subject.id,
      b: id,
      kind: 'acquaintance',
      trust: 0.03,
      affection: 0.01,
      reason: `met through ${person.name}'s household and neighbourhood`,
    });
  }
  return effects;
}

function resolveScene(
  context: EngineContext,
  definition: SceneDefinition,
  subject: Person,
  roles: Record<Id, Id>,
  selection: OutcomeSelection,
  date: WorldDate,
  depth = 0,
  causeEventId?: Id,
): void {
  const instanceId = nextSceneId(context);
  const outcome = selection.outcome;
  const choiceActorId =
    selection.choice && context.world.persons[roles[selection.choice.actorRole]]
      ? roles[selection.choice.actorRole]!
      : subject.id;
  const draft: EventDraft = {
    date: { ...date },
    placeId: subject.locationId,
    subjectId: subject.id,
    participants: buildParticipants(context.world, subject, roles),
    action: `${definition.id}/${outcome.id}`,
    title: definition.title,
    causes: causeEventId ? [causeEventId] : [],
    effects: [
      ...outcome.effects,
      ...birthContractCostEffects(subject, definition, date),
      ...materializedContactEffects(context, subject, roles, outcome),
    ],
    immediateText: selectNarration(context, definition, outcome, subject, roles, date),
    significance:
      typeof outcome.significance === 'number' && Number.isFinite(outcome.significance)
        ? clamp(outcome.significance, 0, 1)
        : 0.5,
    visibility: 'participants',
    sceneId: instanceId,
    choices: selection.choice
      ? [{ actorId: choiceActorId, choiceId: selection.choice.id, reason: selection.reason }]
      : undefined,
    provenance: { kind: 'scene', sourceId: definition.id },
    triggerDepth: depth,
  };
  const event = commitEvent(
    context,
    draft,
    {
      roleIds: roles,
      fundingOrganizationIds: fundingOrganizations(context.world, subject, roles),
    },
    true,
  );
  if (!event) return;

  // A birth effect creates the child inside the scene commit. Record the
  // child's own birth fact after the parent event exists, so its cause chain
  // points at the scene event and the child's personal log begins with birth.
  for (const effect of event.effects) {
    if (effect.type !== 'birth' || !effect.childId) continue;
    const child = context.world.persons[effect.childId];
    if (!child) continue;
    if (event.immediateText.includes('{child}')) {
      event.immediateText = event.immediateText.replace('{child}', child.name);
    }
    const parents = effect.parentIds
      .map((id) => context.world.persons[id])
      .filter((person): person is Person => Boolean(person));
    const placeName = context.world.places[child.locationId]?.name ?? '维也纳';
    commitEvent(
      context,
      {
        date: { ...date },
        placeId: child.locationId,
        subjectId: child.id,
        participants: [
          { personId: child.id, role: 'child' },
          ...parents.map((parent) => ({
            personId: parent.id,
            role: parent.sex === 'female' ? 'mother' : 'father',
          })),
        ],
        action: 'birth',
        causes: [event.id],
        effects: [],
        immediateText: `${child.name}在${placeName}出生。${parents
          .map((parent) => parent.name)
          .join(
            '、',
          )}在场；家里现在有${livingHouseholdMemberCount(context.world, child.householdId)}口人。`,
        significance: 0.95,
        visibility: 'public',
        provenance: { kind: 'birth', sourceId: event.id },
      },
      { roleIds: {}, fundingOrganizationIds: [] },
      true,
    );
  }

  // If a birth effect was rejected by a full household or another invariant,
  // the parent scene must not leak its template token into the committed log.
  if (event.immediateText.includes('{child}')) {
    event.immediateText = event.immediateText.replaceAll('{child}', '孩子');
  }
  scheduleFollowups(context, definition, outcome, subject, roles, event, date, depth);

  const instance: SceneInstance = {
    id: instanceId,
    sceneId: definition.id,
    sceneVersion: definition.version,
    subjectId: subject.id,
    roles: { ...roles },
    date: { ...date },
    status: 'resolved',
    chosenOutcome: outcome.id,
    eventId: event.id,
  };
  appendScene(context, instance);
  context.sceneHistory.set(sceneKey(definition.id, subject.id), monthIndex(date));
}

// ---------------------------------------------------------------------------
// Committed facts and effects
// ---------------------------------------------------------------------------

function commitEvent(
  context: EngineContext,
  draft: EventDraft,
  bindingInput: Omit<EffectBinding, 'eventId' | 'date' | 'subjectId'>,
  force: boolean,
): EventFact | undefined {
  const subject = context.world.persons[draft.subjectId];
  if (!subject) {
    warnContext(context, 'event_missing_subject', `unknown subject ${draft.subjectId}`, {
      personId: draft.subjectId,
    });
    return undefined;
  }
  if (!isWorldDate(draft.date)) {
    warnContext(context, 'event_bad_date', 'event date is invalid');
    return undefined;
  }
  const identity = nextEventIdentity(context);
  const binding: EffectBinding = {
    eventId: identity.id,
    date: draft.date,
    subjectId: draft.subjectId,
    roleIds: { ...bindingInput.roleIds },
    fundingOrganizationIds: [...bindingInput.fundingOrganizationIds],
  };
  const applied: EventEffect[] = [];
  for (const effect of draft.effects) {
    try {
      const result = applyEffect(context, effect, binding);
      if (result) applied.push(result);
    } catch (error) {
      warnContext(
        context,
        'effect_failed',
        `effect ${effect?.type ?? 'unknown'} threw: ${String(error)}`,
        {
          eventId: identity.id,
        },
      );
    }
  }
  if (!force && applied.length === 0) return undefined;

  const causes = [...new Set(draft.causes ?? [])].filter((cause) =>
    context.world.events.some((event) => event.id === cause),
  );
  const participants = draft.participants.filter(
    (participant) =>
      participant &&
      typeof participant.personId === 'string' &&
      Boolean(context.world.persons[participant.personId]),
  );
  const event: EventFact = {
    id: identity.id,
    date: { ...draft.date },
    placeId: draft.placeId,
    subjectId: draft.subjectId,
    participants,
    action: draft.action,
    title: draft.title,
    causes,
    effects: applied,
    immediateText: draft.immediateText,
    significance: draft.significance,
    visibility: draft.visibility,
    sceneId: draft.sceneId,
    choices: draft.choices,
    provenance: draft.provenance,
  };
  context.world.events.push(event);
  scheduleFactTriggers(context, event, draft.triggerDepth ?? 0);
  context.world.historyMeta.sequence = identity.sequence;
  context.world.historyMeta.lastEventId = event.id;
  context.newEvents.push(event);
  return event;
}

/**
 * Resolve role-relative references in generated content. Authored seed scenes
 * use stable ids; universal scenes use `$subject`, `$mother`, `$household`,
 * `$residence`, `$school`, `$workplace`, `$subjectOrg` and `$employerOrg`.
 * Resolution happens at commit time, so a scene can target a player-born child
 * without knowing the child's id when it was authored.
 */
function resolveRefKey(key: string, binding: EffectBinding, world: WorldState): unknown {
  const subject = world.persons[binding.subjectId];
  switch (key) {
    case 'subject':
      return binding.subjectId;
    case 'eventId':
      return binding.eventId;
    case 'household':
      return subject?.householdId;
    case 'residence':
      return subject ? world.households[subject.householdId]?.residenceId : undefined;
    case 'subjectPlace':
      return subject?.locationId;
    case 'school':
      return subject?.education.placeId;
    case 'workplace':
      return subject?.employment?.workplaceId;
    case 'subjectOrg':
      return subject?.employment?.organizationId;
    case 'employerOrg': {
      const employerId = binding.roleIds.employer;
      if (employerId && world.organizations[employerId]) return employerId;
      const employer = employerId ? world.persons[employerId] : undefined;
      return employer?.employment?.organizationId;
    }
    default:
      return binding.roleIds[key];
  }
}

function resolveEffectRef(value: unknown, binding: EffectBinding, world: WorldState): unknown {
  if (typeof value !== 'string' || !value.includes('$')) return value;
  // A whole-string ref may legitimately resolve to a non-string (or undefined);
  // an embedded ref (e.g. `courtship:$eventId`) must stay a string and remain
  // unique per event. Failing to expand embedded refs collapsed every courtship
  // interaction onto one id and silently dropped later proposals.
  if (/^\$[A-Za-z0-9_]+$/.test(value)) return resolveRefKey(value.slice(1), binding, world);
  return value.replace(/\$([A-Za-z0-9_]+)/g, (match, key: string) => {
    const resolved = resolveRefKey(key, binding, world);
    return typeof resolved === 'string' && resolved.length > 0 ? resolved : match;
  });
}

function resolveEffectRefs(
  effect: EventEffect,
  binding: EffectBinding,
  world: WorldState,
): EventEffect {
  if (!isRecord(effect)) return effect;
  const bound = { ...effect } as Record<string, unknown>;
  if (Array.isArray(bound.parentIds)) {
    bound.parentIds = bound.parentIds
      .map((value) => resolveEffectRef(value, binding, world))
      .filter((value): value is string => typeof value === 'string');
  }
  if (bound.type === 'interaction' && isRecord(bound.interaction)) {
    const interaction = { ...bound.interaction } as Record<string, unknown>;
    if (typeof interaction.id === 'string')
      interaction.id = resolveEffectRef(interaction.id, binding, world);
    if (typeof interaction.initiatorId === 'string')
      interaction.initiatorId = resolveEffectRef(interaction.initiatorId, binding, world);
    if (Array.isArray(interaction.counterpartyIds)) {
      interaction.counterpartyIds = interaction.counterpartyIds
        .map((value) => resolveEffectRef(value, binding, world))
        .filter((value): value is string => typeof value === 'string');
    }
    if (isRecord(interaction.proposal)) {
      const proposal = { ...interaction.proposal } as Record<string, unknown>;
      if (typeof proposal.causeEventId === 'string')
        proposal.causeEventId = resolveEffectRef(proposal.causeEventId, binding, world);
      interaction.proposal = proposal;
    }
    bound.interaction = interaction;
  }
  for (const key of [
    'personId',
    'householdId',
    'locationId',
    'workplaceId',
    'organizationId',
    'a',
    'b',
  ]) {
    if (typeof bound[key] === 'string') {
      const resolved = resolveEffectRef(bound[key], binding, world);
      if (resolved !== undefined) bound[key] = resolved;
    }
  }
  return bound as EventEffect;
}

function applyEffect(
  context: EngineContext,
  rawEffect: EventEffect,
  binding: EffectBinding,
): EventEffect | undefined {
  if (!isRecord(rawEffect) || typeof rawEffect.type !== 'string') {
    warnContext(context, 'invalid_effect', 'effect has no type');
    return undefined;
  }
  const effect = resolveEffectRefs(rawEffect, binding, context.world);
  const refKeys = [
    'personId',
    'householdId',
    'locationId',
    'workplaceId',
    'organizationId',
    'a',
    'b',
    'heirHouseholdId',
  ];
  const unresolved = refKeys.find((key) => {
    const value = (effect as unknown as Record<string, unknown>)[key];
    return typeof value === 'string' && value.startsWith('$');
  });
  if (unresolved) {
    warnContext(
      context,
      'unresolved_effect_ref',
      `effect ${effect.type} has unresolved ${String(unresolved)}`,
      {
        eventId: binding.eventId,
      },
    );
    return undefined;
  }
  switch (effect.type) {
    case 'cash':
      return applyCash(context, effect, binding);
    case 'food':
      return applyFood(context, effect, binding);
    case 'health':
      return applyHealth(context, effect, binding);
    case 'condition':
      return applyCondition(context, effect, binding);
    case 'mood':
      return applyMood(context, effect);
    case 'reputation':
      return applyReputation(context, effect);
    case 'skill':
      return applySkill(context, effect);
    case 'flag':
      return applyFlag(context, effect);
    case 'education':
      return applyEducation(context, effect, binding);
    case 'employment':
      return applyEmployment(context, effect, binding);
    case 'unemployment':
      return applyUnemployment(context, effect, binding);
    case 'relation':
      return applyRelation(context, effect, binding);
    case 'relation_end':
      return applyRelationEnd(context, effect, binding);
    case 'role':
      return applyRole(context, effect, binding);
    case 'organization_membership':
      return applyOrganizationMembership(context, effect, binding);
    case 'project':
      return applyProject(context, effect, binding);
    case 'interaction':
      return applyInteraction(context, effect, binding);
    case 'move':
      return applyMove(context, effect, binding);
    case 'household':
      return applyHousehold(context, effect, binding);
    case 'residence':
      return applyResidence(context, effect, binding);
    case 'birth':
      return applyBirth(context, effect, binding);
    case 'death':
      return applyDeath(context, effect, binding);
    case 'estate':
      return applyEstate(context, effect, binding);
    default: {
      const unknownEffect = effect as unknown as { type?: unknown };
      warnContext(context, 'unknown_effect', `unknown effect type ${String(unknownEffect.type)}`, {
        eventId: binding.eventId,
      });
      return undefined;
    }
  }
}

function applyCash(
  context: EngineContext,
  effect: Extract<EventEffect, { type: 'cash' }>,
  binding: EffectBinding,
): EventEffect | undefined {
  const household = context.world.households[effect.householdId];
  if (!household) {
    warnContext(context, 'unknown_household', `cash effect references ${effect.householdId}`, {
      eventId: binding.eventId,
    });
    return undefined;
  }
  if (typeof effect.amount !== 'number' || !Number.isFinite(effect.amount)) return undefined;
  const amount = roundMoney(effect.amount);
  if (amount === 0) return undefined;

  if (amount < 0) {
    const debit = roundMoney(Math.min(household.cash, -amount));
    if (debit <= 0) return undefined;
    household.cash = roundMoney(household.cash - debit);
    return { ...effect, amount: -debit };
  }

  // Positive cash first draws on concrete funding organizations (an employer or
  // an organization role). Any remainder needs an explicit external source in
  // the effect reason; the inflow is reported in diagnostics for audit.
  let remaining = amount;
  for (const organizationId of binding.fundingOrganizationIds) {
    if (remaining <= 0) break;
    const organization = context.world.organizations[organizationId];
    if (!organization || organization.status !== 'active') continue;
    const available = Math.max(0, organization.treasury);
    const taken = roundMoney(Math.min(remaining, available));
    if (taken <= 0) continue;
    organization.treasury = roundMoney(available - taken);
    remaining = roundMoney(remaining - taken);
  }
  const reason = typeof effect.reason === 'string' ? effect.reason : '';
  if (remaining > 0) {
    if (reason.length === 0) {
      warnContext(context, 'unfunded_cash', `cash effect of ${amount} has no source reason`, {
        eventId: binding.eventId,
      });
    } else {
      warnContext(
        context,
        'external_cash_inflow',
        `external inflow ${remaining} recorded as: ${reason}`,
        { eventId: binding.eventId },
      );
      remaining = 0;
    }
  }
  const credited = roundMoney(amount - remaining);
  if (credited <= 0) return undefined;
  household.cash = roundMoney(household.cash + credited);
  return { ...effect, amount: credited };
}

function applyFood(
  context: EngineContext,
  effect: Extract<EventEffect, { type: 'food' }>,
  binding: EffectBinding,
): EventEffect | undefined {
  const household = context.world.households[effect.householdId];
  if (!household) {
    warnContext(context, 'unknown_household', `food effect references ${effect.householdId}`, {
      eventId: binding.eventId,
    });
    return undefined;
  }
  if (typeof effect.amount !== 'number' || !Number.isFinite(effect.amount)) return undefined;
  const amount = roundFood(effect.amount);
  if (amount === 0) return undefined;

  if (amount < 0) {
    const consumed = roundFood(Math.min(household.food, -amount));
    if (consumed <= 0) return undefined;
    household.food = roundFood(household.food - consumed);
    return { ...effect, amount: -consumed };
  }

  // Positive food is external supply. The effect's `reason` is its explicit
  // source (ration, relief, purchase); this slice has no farm/production ledger.
  if (typeof effect.reason !== 'string' || effect.reason.length === 0) {
    warnContext(context, 'food_without_source', `food effect of ${amount} has no reason`, {
      eventId: binding.eventId,
    });
    return undefined;
  }
  household.food = roundFood(household.food + amount);
  return { ...effect };
}

function personCapability(person: Person): string | undefined {
  return (
    person.lifeContract?.capability ??
    person.life?.flags.find((flag) => flag.startsWith('capability:'))?.slice(11)
  );
}

function applyHealth(
  context: EngineContext,
  effect: Extract<EventEffect, { type: 'health' }>,
  binding: EffectBinding,
): EventEffect | undefined {
  const person = context.world.persons[effect.personId];
  if (!person || person.died) {
    warnContext(context, 'effect_on_dead_or_missing', 'health effect skipped', {
      personId: effect.personId,
      eventId: binding.eventId,
    });
    return undefined;
  }
  if (typeof effect.amount !== 'number' || !Number.isFinite(effect.amount)) return undefined;
  const before = person.health.vitality;
  // A Phase 3 world reserves final death for the statistical pass or an
  // explicit `death` effect. Ordinary health damage cannot silently create a
  // second, untyped mortality path by reaching exactly zero.
  const floor = context.world.macro ? 0.01 : 0;
  const capability = personCapability(person);
  const amount =
    effect.amount < 0 && capability === 'frail_body'
      ? effect.amount * 1.2
      : effect.amount > 0 && capability === 'frail_body'
        ? effect.amount * 0.85
        : effect.amount;
  const after = clamp(before + amount, floor, 1);
  const delta = after - before;
  if (Math.abs(delta) < 1e-9) return undefined;
  person.health.vitality = after;
  return { ...effect, amount: delta };
}

function applyCondition(
  context: EngineContext,
  effect: Extract<EventEffect, { type: 'condition' }>,
  binding: EffectBinding,
): EventEffect | undefined {
  const person = context.world.persons[effect.personId];
  if (!person || person.died) {
    warnContext(context, 'effect_on_dead_or_missing', 'condition effect skipped', {
      personId: effect.personId,
      eventId: binding.eventId,
    });
    return undefined;
  }
  if (typeof effect.condition !== 'string' || effect.condition.length === 0) return undefined;
  const index = person.health.conditions.indexOf(effect.condition);
  if (effect.add) {
    if (index >= 0) return undefined;
    person.health.conditions.push(effect.condition);
  } else {
    if (index < 0) return undefined;
    person.health.conditions.splice(index, 1);
  }
  return { ...effect };
}

function ensureLife(person: Person): PersonLife {
  if (!person.life) {
    person.life = {
      mood: 0,
      reputation: 0,
      skills: { literacy: 0, numeracy: 0, craft: 0, social: 0 },
      flags: [],
    };
  }
  return person.life;
}

function applyMood(
  context: EngineContext,
  effect: Extract<EventEffect, { type: 'mood' }>,
): EventEffect | undefined {
  const person = context.world.persons[effect.personId];
  if (!person || person.died || !Number.isFinite(effect.amount)) return undefined;
  const life = ensureLife(person);
  const before = life.mood;
  life.mood = clamp(life.mood + effect.amount, -1, 1);
  return Math.abs(life.mood - before) < 1e-9
    ? undefined
    : { ...effect, amount: life.mood - before };
}

function applyReputation(
  context: EngineContext,
  effect: Extract<EventEffect, { type: 'reputation' }>,
): EventEffect | undefined {
  const person = context.world.persons[effect.personId];
  if (!person || person.died || !Number.isFinite(effect.amount)) return undefined;
  const life = ensureLife(person);
  const before = life.reputation;
  life.reputation = clamp(life.reputation + effect.amount, -1, 1);
  return Math.abs(life.reputation - before) < 1e-9
    ? undefined
    : { ...effect, amount: life.reputation - before };
}

function applySkill(
  context: EngineContext,
  effect: Extract<EventEffect, { type: 'skill' }>,
): EventEffect | undefined {
  const person = context.world.persons[effect.personId];
  if (!person || person.died || !Number.isFinite(effect.amount)) return undefined;
  if (!['literacy', 'numeracy', 'craft', 'social'].includes(effect.skill)) return undefined;
  const life = ensureLife(person);
  const before = life.skills[effect.skill];
  life.skills[effect.skill] = clamp(before + effect.amount, 0, 1);
  return Math.abs(life.skills[effect.skill] - before) < 1e-9
    ? undefined
    : { ...effect, amount: life.skills[effect.skill] - before };
}

function applyFlag(
  context: EngineContext,
  effect: Extract<EventEffect, { type: 'flag' }>,
): EventEffect | undefined {
  const person = context.world.persons[effect.personId];
  if (!person || person.died || !effect.flag) return undefined;
  const life = ensureLife(person);
  const index = life.flags.indexOf(effect.flag);
  if (effect.add) {
    if (index >= 0) return undefined;
    life.flags.push(effect.flag);
  } else {
    if (index < 0) return undefined;
    life.flags.splice(index, 1);
  }
  return { ...effect };
}

function applyRelationEnd(
  context: EngineContext,
  effect: Extract<EventEffect, { type: 'relation_end' }>,
  binding: EffectBinding,
): EventEffect | undefined {
  const relation = relationsFor(context.world, effect.a).find(
    (candidate) =>
      candidate.kind === effect.kind &&
      candidate.end === undefined &&
      ((candidate.a === effect.a && candidate.b === effect.b) ||
        (candidate.a === effect.b && candidate.b === effect.a)),
  );
  if (!relation) return undefined;
  relation.end = { ...binding.date };
  return { ...effect };
}

function applyResidence(
  context: EngineContext,
  effect: Extract<EventEffect, { type: 'residence' }>,
  binding: EffectBinding,
): EventEffect | undefined {
  const household = context.world.households[effect.householdId];
  const place = context.world.places[effect.residenceId];
  if (!household || !place) return undefined;
  if (household.residenceId === place.id) return undefined;
  household.residenceId = place.id;
  for (const memberId of household.memberIds) {
    const member = context.world.persons[memberId];
    if (member && !member.died) member.locationId = place.id;
  }
  return { ...effect };
}

function applyEstate(
  context: EngineContext,
  effect: Extract<EventEffect, { type: 'estate' }>,
  binding: EffectBinding,
): EventEffect | undefined {
  const person = context.world.persons[effect.personId];
  const heir = context.world.households[effect.heirHouseholdId];
  const source = person ? context.world.households[person.householdId] : undefined;
  if (!person || !heir || !source || source.id === heir.id) return undefined;
  if (!Number.isFinite(effect.amount) || effect.amount <= 0) return undefined;
  const transferred = roundMoney(Math.min(source.cash, effect.amount));
  if (transferred <= 0) return undefined;
  source.cash = roundMoney(source.cash - transferred);
  heir.cash = roundMoney(heir.cash + transferred);
  return { ...effect, amount: transferred };
}

function applyEducation(
  context: EngineContext,
  effect: Extract<EventEffect, { type: 'education' }>,
  binding: EffectBinding,
): EventEffect | undefined {
  const person = context.world.persons[effect.personId];
  if (!person || person.died) {
    warnContext(context, 'effect_on_dead_or_missing', 'education effect skipped', {
      personId: effect.personId,
      eventId: binding.eventId,
    });
    return undefined;
  }
  if (!EDUCATION_STATUSES.includes(effect.status)) return undefined;
  if (effect.placeId !== undefined && !context.world.places[effect.placeId]) return undefined;
  if (effect.level !== undefined && (!Number.isFinite(effect.level) || effect.level < 0)) {
    return undefined;
  }
  const changedStatus = person.education.status !== effect.status;
  person.education.status = effect.status;
  if (effect.level !== undefined) person.education.level = effect.level;
  if (effect.placeId !== undefined) person.education.placeId = effect.placeId;
  if (changedStatus || !person.education.started) person.education.started = { ...binding.date };
  return { ...effect, level: person.education.level, placeId: person.education.placeId };
}

function closePositionsFor(world: WorldState, personId: Id, date: WorldDate): void {
  for (const position of Object.values(world.positions)) {
    if (position.holderId === personId) {
      position.holderId = undefined;
      position.end = { ...date };
    }
  }
}

function applyEmployment(
  context: EngineContext,
  effect: Extract<EventEffect, { type: 'employment' }>,
  binding: EffectBinding,
): EventEffect | undefined {
  const person = context.world.persons[effect.personId];
  if (!person || person.died) {
    warnContext(context, 'effect_on_dead_or_missing', 'employment effect skipped', {
      personId: effect.personId,
      eventId: binding.eventId,
    });
    return undefined;
  }
  const organization = context.world.organizations[effect.organizationId];
  if (!organization || organization.status !== 'active') return undefined;
  if (!context.world.places[effect.workplaceId]) return undefined;
  if (typeof effect.occupation !== 'string' || effect.occupation.length === 0) return undefined;
  if (typeof effect.wage !== 'number' || !Number.isFinite(effect.wage) || effect.wage < 0) {
    return undefined;
  }

  const previousOrganizationId = person.employment?.organizationId;
  if (previousOrganizationId && previousOrganizationId !== effect.organizationId) {
    const previous = context.world.organizations[previousOrganizationId];
    if (previous) {
      previous.memberIds = previous.memberIds.filter((id) => id !== person.id);
    }
    closePositionsFor(context.world, person.id, binding.date);
  }
  if (!organization.memberIds.includes(person.id)) organization.memberIds.push(person.id);
  person.employment = {
    organizationId: effect.organizationId,
    positionId:
      previousOrganizationId === effect.organizationId ? person.employment?.positionId : undefined,
    occupation: effect.occupation,
    wage: roundMoney(effect.wage),
    since:
      previousOrganizationId === effect.organizationId && person.employment
        ? person.employment.since
        : { ...binding.date },
    workplaceId: effect.workplaceId,
  };
  return { ...effect, wage: person.employment.wage };
}

function applyUnemployment(
  context: EngineContext,
  effect: Extract<EventEffect, { type: 'unemployment' }>,
  binding: EffectBinding,
): EventEffect | undefined {
  const person = context.world.persons[effect.personId];
  if (!person || person.died || !person.employment) return undefined;
  const organization = context.world.organizations[person.employment.organizationId];
  if (organization) {
    organization.memberIds = organization.memberIds.filter((id) => id !== person.id);
  }
  closePositionsFor(context.world, person.id, binding.date);
  delete person.employment;
  return { ...effect };
}

function applyRelation(
  context: EngineContext,
  effect: Extract<EventEffect, { type: 'relation' }>,
  binding: EffectBinding,
): EventEffect | undefined {
  const a = context.world.persons[effect.a];
  const b = context.world.persons[effect.b];
  if (!a || !b || a.id === b.id) {
    warnContext(context, 'invalid_relation', 'relation effect references a missing person', {
      personId: effect.a,
      eventId: binding.eventId,
    });
    return undefined;
  }
  if (!RELATION_KINDS.includes(effect.kind)) return undefined;
  const undirected = !['employer'].includes(effect.kind);
  const existing = relationsFor(context.world, effect.a).find(
    (candidate) =>
      candidate.kind === effect.kind &&
      candidate.end === undefined &&
      (undirected
        ? (candidate.a === effect.a && candidate.b === effect.b) ||
          (candidate.a === effect.b && candidate.b === effect.a)
        : candidate.a === effect.a && candidate.b === effect.b),
  );
  const id = existing?.id ?? `rel:${effect.a}:${effect.b}:${effect.kind}`;
  let relation = existing ?? context.world.relations[id];
  let created = false;
  // Existing bonds survive death (funerals, memory, obligations). Creating a
  // brand-new relation with a dead person is not allowed.
  if (!relation && (a.died || b.died)) return undefined;
  if (!relation && effect.kind === 'partner') {
    const hasOtherPartner = (personId: Id): boolean =>
      relationsFor(context.world, personId).some(
        (candidate) => candidate.kind === 'partner' && candidate.end === undefined,
      );
    // One active partnership at a time. Without this, two scenes can create a
    // triad (e.g. a same-sex cohabitation and a courtship in the same year),
    // and later childbirth has no unambiguous partner role.
    if (hasOtherPartner(a.id) || hasOtherPartner(b.id)) return undefined;
  }
  if (
    relation &&
    (relation.a !== effect.a || relation.b !== effect.b || relation.kind !== effect.kind)
  ) {
    return undefined;
  }
  if (relation?.end) return undefined;
  if (!relation) {
    created = true;
    relation = {
      id,
      a: effect.a,
      b: effect.b,
      kind: effect.kind,
      trust: 0,
      affection: 0,
      obligation: 0,
      fear: 0,
      respect: 0,
      start: { ...binding.date },
      sharedEventIds: [],
    };
    context.world.relations[id] = relation;
    rememberRelation(context.world, relation);
    if (!a.relationshipIds.includes(id)) a.relationshipIds.push(id);
    if (!b.relationshipIds.includes(id)) b.relationshipIds.push(id);
  }
  const applyDelta = (key: 'trust' | 'affection' | 'obligation' | 'fear' | 'respect') => {
    const value = effect[key];
    if (typeof value !== 'number' || !Number.isFinite(value)) return;
    relation![key] = clamp(relation![key] + value, -1, 1);
  };
  applyDelta('trust');
  applyDelta('affection');
  applyDelta('obligation');
  applyDelta('fear');
  applyDelta('respect');
  if (created && personCapability(a) === 'social_insight') {
    relation.trust = clamp(relation.trust + 0.03, -1, 1);
  }
  if (created && personCapability(b) === 'social_insight') {
    relation.respect = clamp(relation.respect + 0.02, -1, 1);
  }
  if (!relation.sharedEventIds.includes(binding.eventId)) {
    relation.sharedEventIds.push(binding.eventId);
  }
  return { ...effect };
}

function applyRole(
  context: EngineContext,
  effect: Extract<EventEffect, { type: 'role' }>,
  binding: EffectBinding,
): EventEffect | undefined {
  const person = context.world.persons[effect.personId];
  if (!person || person.died) {
    warnContext(context, 'effect_on_dead_or_missing', 'role effect skipped', {
      personId: effect.personId,
      eventId: binding.eventId,
    });
    return undefined;
  }
  if (typeof effect.role !== 'string' || effect.role.length === 0) return undefined;
  const organizationId = (effect as { organizationId?: unknown }).organizationId;
  if (typeof organizationId === 'string' && context.world.organizations[organizationId]) {
    const organization = context.world.organizations[organizationId]!;
    if (effect.add && !organization.memberIds.includes(person.id)) {
      organization.memberIds.push(person.id);
    } else if (!effect.add) {
      organization.memberIds = organization.memberIds.filter((id) => id !== person.id);
    }
  }
  const index = person.roles.indexOf(effect.role);
  if (effect.add) {
    if (index >= 0) return undefined;
    person.roles.push(effect.role);
  } else {
    if (index < 0) return undefined;
    person.roles.splice(index, 1);
  }
  return { ...effect };
}

function applyOrganizationMembership(
  context: EngineContext,
  effect: Extract<EventEffect, { type: 'organization_membership' }>,
  binding: EffectBinding,
): EventEffect | undefined {
  const person = context.world.persons[effect.personId];
  const organization = context.world.organizations[effect.organizationId];
  if (!person || person.died || !organization || organization.status !== 'active') return undefined;
  const index = organization.memberIds.indexOf(person.id);
  if (effect.add) {
    if (index >= 0) return undefined;
    organization.memberIds.push(person.id);
  } else {
    if (index < 0) return undefined;
    organization.memberIds.splice(index, 1);
  }
  return { ...effect };
}

function projectNumbersValid(project: Project): boolean {
  for (const value of [project.required.cash, project.required.food, project.required.people]) {
    if (value !== undefined && (!Number.isFinite(value) || value < 0)) return false;
  }
  for (const value of [project.committed.cash, project.committed.food]) {
    if (value !== undefined && (!Number.isFinite(value) || value < 0)) return false;
  }
  return true;
}

function applyProject(
  context: EngineContext,
  effect: Extract<EventEffect, { type: 'project' }>,
  binding: EffectBinding,
): EventEffect | undefined {
  if (!isRecord(effect.project) || typeof effect.project.id !== 'string') return undefined;
  const project = structuredClone(effect.project);
  if (!PROJECT_STATES.includes(project.state)) return undefined;
  if (!Number.isInteger(project.stage) || project.stage < 0) return undefined;
  if (
    !isRecord(project.required) ||
    !isRecord(project.committed) ||
    !projectNumbersValid(project)
  ) {
    return undefined;
  }
  if (project.placeId !== undefined && !context.world.places[project.placeId]) return undefined;
  if (
    !Array.isArray(project.participants) ||
    !Array.isArray(project.blockers) ||
    !Array.isArray(project.history) ||
    !Array.isArray(project.causeIds)
  ) {
    return undefined;
  }
  for (const participant of project.participants) {
    if (!isRecord(participant) || typeof participant.personId !== 'string') return undefined;
    if (!context.world.persons[participant.personId]) return undefined;
  }
  if (project.deadline !== undefined && !isWorldDate(project.deadline)) return undefined;

  const existing = context.world.projects[project.id];
  const ownerPerson = context.world.persons[project.ownerId];
  const ownerOrganization = context.world.organizations[project.ownerId];
  if (!ownerPerson && !ownerOrganization) return undefined;
  if (existing) {
    if (
      existing.state === 'completed' ||
      existing.state === 'failed' ||
      existing.state === 'cancelled'
    ) {
      return undefined;
    }
  } else {
    if (ownerPerson && ownerPerson.died) return undefined;
    if (ownerOrganization && ownerOrganization.status !== 'active') return undefined;
    if (
      project.participants.some((participant) => context.world.persons[participant.personId]!.died)
    ) {
      return undefined;
    }
  }

  context.world.projects[project.id] = project;
  if (ownerPerson && !ownerPerson.projectIds.includes(project.id)) {
    ownerPerson.projectIds.push(project.id);
  }
  if (ownerOrganization && !ownerOrganization.projects.includes(project.id)) {
    ownerOrganization.projects.push(project.id);
  }
  return { type: 'project', project: structuredClone(project) };
}

function applyInteraction(
  context: EngineContext,
  effect: Extract<EventEffect, { type: 'interaction' }>,
  binding: EffectBinding,
): EventEffect | undefined {
  if (!isRecord(effect.interaction) || typeof effect.interaction.id !== 'string') return undefined;
  const interaction = structuredClone(effect.interaction);
  if (!INTERACTION_KINDS.includes(interaction.kind)) return undefined;
  if (!INTERACTION_STATUSES.includes(interaction.status)) return undefined;
  if (!Array.isArray(interaction.counterpartyIds) || !Array.isArray(interaction.responses)) {
    return undefined;
  }
  if (
    interaction.visibility !== 'private' &&
    interaction.visibility !== 'participants' &&
    interaction.visibility !== 'public'
  ) {
    return undefined;
  }
  if (typeof interaction.subject !== 'string' || interaction.subject.length === 0) return undefined;
  const initiator = context.world.persons[interaction.initiatorId];
  if (!initiator) return undefined;
  const counterparties = [...new Set(interaction.counterpartyIds)].filter(
    (id): id is Id => typeof id === 'string',
  );
  if (counterparties.some((id) => !context.world.persons[id])) return undefined;
  for (const response of interaction.responses) {
    if (!isRecord(response) || !context.world.persons[response.personId as Id]) return undefined;
  }
  if (!interaction.created || !isWorldDate(interaction.created)) {
    interaction.created = { ...binding.date };
  }
  if (!interaction.due || !isWorldDate(interaction.due)) {
    interaction.due = { year: binding.date.year + 1, month: 1 };
  }
  if (interaction.linkedProjectId && !context.world.projects[interaction.linkedProjectId]) {
    return undefined;
  }
  const existing = context.world.interactions[interaction.id];
  if (!existing) {
    if (initiator.died || counterparties.some((id) => context.world.persons[id]!.died)) {
      return undefined;
    }
  } else if (existing.status !== 'pending' && interaction.status !== existing.status) {
    return undefined;
  }

  interaction.counterpartyIds = counterparties;
  context.world.interactions[interaction.id] = interaction;
  return { type: 'interaction', interaction: structuredClone(interaction) };
}

function applyMove(
  context: EngineContext,
  effect: Extract<EventEffect, { type: 'move' }>,
  binding: EffectBinding,
): EventEffect | undefined {
  const person = context.world.persons[effect.personId];
  if (!person || person.died) {
    warnContext(context, 'effect_on_dead_or_missing', 'move effect skipped', {
      personId: effect.personId,
      eventId: binding.eventId,
    });
    return undefined;
  }
  const destination = context.world.places[effect.locationId];
  if (!destination) return undefined;
  if (person.locationId === effect.locationId) return undefined;
  const oldRegion = regionIdForPerson(context.world, person);
  const newRegion = destination.regionId ?? 'region-lower-austria';
  const household = context.world.households[person.householdId];
  if (oldRegion !== newRegion && household) {
    const destinationHome =
      destination.kind === 'home'
        ? destination
        : Object.values(context.world.places).find(
            (place) =>
              place.kind === 'home' && (place.regionId ?? 'region-lower-austria') === newRegion,
          );
    if (destinationHome) {
      // A named migration moves the household's registered residence with the
      // person; otherwise the macro named count and the household address
      // would disagree across regions.
      household.residenceId = destinationHome.id;
      for (const memberId of household.memberIds) {
        const member = context.world.persons[memberId];
        if (member && !member.died) member.locationId = destinationHome.id;
      }
    }
  }
  person.locationId = effect.locationId;
  return { ...effect };
}

function applyHousehold(
  context: EngineContext,
  effect: Extract<EventEffect, { type: 'household' }>,
  binding: EffectBinding,
): EventEffect | undefined {
  const person = context.world.persons[effect.personId];
  const household = context.world.households[effect.householdId];
  if (!person || person.died || !household) return undefined;
  if (person.householdId === household.id) return undefined;
  if (
    livingHouseholdMemberCount(context.world, household.id) >=
    householdCapacity(context.world, household.id)
  ) {
    const subject = context.world.persons[binding.subjectId];
    const partnered =
      subject &&
      subject.id !== person.id &&
      relationsFor(context.world, subject.id).some(
        (relation) =>
          relation.kind === 'partner' &&
          relation.end === undefined &&
          ((relation.a === subject.id && relation.b === person.id) ||
            (relation.a === person.id && relation.b === subject.id)),
      );
    if (subject && partnered) {
      const overflow = splitOverflowHousehold(context, subject, person);
      if (overflow) return { ...effect };
    }
    warnContext(context, 'household_full', 'household move skipped because the target is full', {
      personId: person.id,
      eventId: binding.eventId,
    });
    return undefined;
  }
  const previous = context.world.households[person.householdId];
  if (previous) previous.memberIds = previous.memberIds.filter((id) => id !== person.id);
  if (!household.memberIds.includes(person.id)) household.memberIds.push(person.id);
  person.householdId = household.id;
  person.locationId = household.residenceId;
  return { ...effect };
}

const FEMALE_GIVEN_NAMES = [
  'Maria',
  'Katharina',
  'Anna',
  'Elisabeth',
  'Grete',
  'Rosa',
  'Mitzi',
  'Helene',
  'Berta',
  'Luise',
];
const MALE_GIVEN_NAMES = [
  'Josef',
  'Otto',
  'Alois',
  'Franz',
  'Hermann',
  'Emil',
  'Friedrich',
  'Gustav',
  'Anton',
  'Ferdinand',
];

function surnameOf(person: Person | undefined): string {
  const parts = person?.name.trim().split(/\s+/) ?? [];
  return parts.length > 1 ? parts[parts.length - 1]! : 'Bauer';
}

function averageTraits(parents: Person[]): Person['traits'] {
  const keys: (keyof Person['traits'])[] = [
    'care',
    'ambition',
    'tradition',
    'openness',
    'conscientiousness',
    'extraversion',
    'agreeableness',
    'neuroticism',
  ];
  const result = {} as Person['traits'];
  for (const key of keys) {
    const values = parents.map((parent) => parent.traits[key]);
    result[key] = values.length
      ? values.reduce((sum, value) => sum + value, 0) / values.length
      : 0.5;
  }
  return result;
}

/**
 * A full household splits instead of growing without bound. The new household
 * uses a real shared-tenement (or another home) and moves the parents and the
 * new child there. This is a simplified housing market, not a new subsystem: it
 * preserves a concrete address, rent obligation and member list.
 */
function splitOverflowHousehold(
  context: EngineContext,
  mother: Person,
  father: Person | undefined,
): Household | undefined {
  const world = context.world;
  const old = world.households[mother.householdId];
  const preferred =
    world.places['place-wien-leopoldstadt-tenement'] ??
    Object.values(world.places).find((place) => place.kind === 'home' && place.capacity);
  if (!old || !preferred) return undefined;
  const id = `household-overflow-${world.id}-${Object.keys(world.households).length + 1}`;
  const members = [mother, ...(father ? [father] : [])].filter(
    (person, index, list) => list.findIndex((candidate) => candidate.id === person.id) === index,
  );
  for (const person of members) {
    const previous = world.households[person.householdId];
    if (previous) previous.memberIds = previous.memberIds.filter((entry) => entry !== person.id);
    person.householdId = id;
    person.locationId = preferred.id;
  }
  const household: Household = {
    id,
    residenceId: preferred.id,
    memberIds: members.map((person) => person.id),
    guardianIds: members.filter((person) => !person.died).map((person) => person.id),
    cash: 0,
    food: 0,
    debt: 0,
    rent: 12,
    obligations: [
      { id: `${id}-rent`, kind: 'rent', amount: 12 },
      { id: `${id}-food`, kind: 'food', amount: 12 },
    ],
    assets: [],
    sharingRules: 'pooled',
  };
  world.households[id] = household;
  return household;
}

function applyBirth(
  context: EngineContext,
  effect: Extract<EventEffect, { type: 'birth' }>,
  binding: EffectBinding,
): EventEffect | undefined {
  const parents = [...new Set(effect.parentIds)]
    .map((id) => context.world.persons[id])
    .filter((person): person is Person => Boolean(person) && !person.died);
  if (parents.length === 0) {
    warnContext(context, 'birth_without_parent', 'birth effect has no living parent', {
      eventId: binding.eventId,
    });
    return undefined;
  }
  const mother = parents.find((parent) => parent.sex === 'female') ?? parents[0]!;
  const originalHousehold = context.world.households[mother.householdId];
  if (!originalHousehold) return undefined;
  const father = parents.find((parent) => parent.sex === 'male' && parent.id !== mother.id);
  let household = originalHousehold;
  // A birth cannot silently cram another Person into a flat that is already at
  // its declared capacity. A full household splits into a new rented household
  // at a real shared tenement; the child is never created without a household.
  if (
    livingHouseholdMemberCount(context.world, household.id) >=
    householdCapacity(context.world, household.id)
  ) {
    const overflow = splitOverflowHousehold(context, mother, father);
    if (!overflow) {
      warnContext(context, 'birth_household_full', 'birth skipped because the household is full', {
        eventId: binding.eventId,
        personId: mother.id,
      });
      return undefined;
    }
    household = overflow;
  }
  const childId = `person:${binding.eventId}:child`;
  if (context.world.persons[childId]) return undefined;
  const rng = seededRng(context.world.seed, 'birth', binding.eventId, childId);
  const sex: Person['sex'] =
    effect.childSex === 'male' || effect.childSex === 'female' || effect.childSex === 'intersex'
      ? effect.childSex
      : 'female';
  const nameParent = parents.find((parent) => parent.sex === 'male') ?? mother;
  const surname = surnameOf(nameParent);
  const namePool = sex === 'male' ? MALE_GIVEN_NAMES : FEMALE_GIVEN_NAMES;
  let given = effect.name?.trim() ?? '';
  if (!given) {
    for (let attempt = 0; attempt < namePool.length; attempt += 1) {
      const candidate = `${namePool[(Math.floor(rng() * namePool.length) + attempt) % namePool.length]} ${surname}`;
      if (!Object.values(context.world.persons).some((person) => person.name === candidate)) {
        given = candidate;
        break;
      }
    }
    given ||= `${namePool[Math.floor(rng() * namePool.length)]} ${surname}`;
  }
  const traits = averageTraits(parents);
  for (const key of Object.keys(traits) as (keyof Person['traits'])[]) {
    traits[key] = clamp(traits[key] + (rng() * 2 - 1) * 0.08, 0, 1);
  }
  const vitality = clamp(
    0.55 + rng() * 0.25 - (mother.health.vitality < 0.45 ? 0.12 : 0),
    0.25,
    0.95,
  );
  const child: Person = {
    id: childId,
    name: given,
    sex,
    born: { ...binding.date },
    locationId: household.residenceId,
    householdId: household.id,
    parentIds: parents.map((parent) => parent.id),
    guardianIds: parents.map((parent) => parent.id),
    health: { vitality, conditions: ['newborn'], nutrition: 0.7 },
    traits,
    life: {
      mood: 0,
      reputation: 0,
      skills: { literacy: 0, numeracy: 0, craft: 0, social: 0 },
      flags: [],
    },
    education: { status: 'none', level: 0 },
    roles: ['infant', 'child'],
    projectIds: [],
    relationshipIds: [],
    knowledgeIds: [],
    provenance: { kind: 'birth', sourceId: binding.eventId },
  };
  context.world.persons[child.id] = child;
  household.memberIds.push(child.id);
  if (father && father.householdId !== household.id) {
    const previous = context.world.households[father.householdId];
    if (
      previous &&
      livingHouseholdMemberCount(context.world, household.id) <
        householdCapacity(context.world, household.id)
    ) {
      // A birth is a concrete household change: the father joins the mother's
      // household when there is room, instead of leaving a real partner in a
      // different flat and making later family scenes impossible.
      previous.memberIds = previous.memberIds.filter((id) => id !== father.id);
      household.memberIds.push(father.id);
      father.householdId = household.id;
      father.locationId = household.residenceId;
    }
  }
  // The annual statistical pass runs after scenes; keep the postpartum window
  // open until the next annual pass so maternal risk is actually evaluated.
  mother.health.postpartumUntil = addMonths(binding.date, 13);
  for (const parent of parents) {
    for (const relationKind of ['kin', 'guardian'] as Relation['kind'][]) {
      const relation: Relation = {
        id: `v4-rel-${child.id}-${parent.id}-${relationKind}`,
        a: child.id,
        b: parent.id,
        kind: relationKind,
        trust: 0.6,
        affection: 0.75,
        obligation: 0.85,
        fear: 0,
        respect: 0.5,
        start: { ...binding.date },
        sharedEventIds: [binding.eventId],
      };
      context.world.relations[relation.id] = relation;
      child.relationshipIds.push(relation.id);
      parent.relationshipIds.push(relation.id);
    }
  }
  return {
    ...effect,
    parentIds: parents.map((parent) => parent.id),
    childId: child.id,
    childName: child.name,
  };
}

function settleExtinctHousehold(
  world: WorldState,
  deceased: Person,
  date: WorldDate,
): { heirHouseholdId: Id; amount: number } | undefined {
  const household = world.households[deceased.householdId];
  if (!household) return undefined;
  const living = household.memberIds
    .map((id) => world.persons[id])
    .filter((person): person is Person => Boolean(person) && !person.died);
  if (living.length > 0) return undefined;
  const candidates: Person[] = [];
  for (const relation of Object.values(world.relations)) {
    if (relation.end !== undefined) continue;
    if (relation.a !== deceased.id && relation.b !== deceased.id) continue;
    const other = world.persons[relation.a === deceased.id ? relation.b : relation.a];
    if (other && !other.died && other.householdId !== household.id) candidates.push(other);
  }
  for (const person of Object.values(world.persons)) {
    if (person.died || person.householdId === household.id) continue;
    if (person.parentIds.includes(deceased.id)) candidates.push(person);
  }
  const heir = candidates.find((person) => Boolean(world.households[person.householdId]));
  if (!heir) return undefined;
  const amount = roundMoney(Math.max(0, household.cash));
  if (amount <= 0) return undefined;
  household.cash = 0;
  const target = world.households[heir.householdId]!;
  target.cash = roundMoney(target.cash + amount);
  return { heirHouseholdId: target.id, amount };
}

/**
 * Keep minors attached to a living adult after a guardian dies. This is not a
 * new welfare system: it only promotes an existing adult in the same residence
 * and records a real guardian relation. If no adult exists, the child remains
 * without a guardian until a later move or institution event; the engine does
 * not invent a parent.
 */
function repairGuardiansAfterDeath(world: WorldState, deceased: Person, date: WorldDate): void {
  const household = world.households[deceased.householdId];
  if (!household) return;
  household.guardianIds = household.guardianIds.filter((id) => {
    const person = world.persons[id];
    return Boolean(person && !person.died);
  });
  const livingAdults = household.memberIds
    .map((id) => world.persons[id])
    .filter(
      (person): person is Person => Boolean(person) && !person.died && ageAt(person, date) >= 18,
    )
    .sort((a, b) => a.id.localeCompare(b.id));
  if (livingAdults.length === 0) return;
  for (const memberId of household.memberIds) {
    const child = world.persons[memberId];
    if (!child || child.died || ageAt(child, date) >= 18) continue;
    const hasLivingGuardian = child.guardianIds.some((id) => {
      const guardian = world.persons[id];
      return Boolean(guardian && !guardian.died);
    });
    if (hasLivingGuardian) continue;
    const guardian = livingAdults[0]!;
    child.guardianIds = [
      ...new Set([
        ...child.guardianIds.filter((id) => {
          const person = world.persons[id];
          return Boolean(person && !person.died);
        }),
        guardian.id,
      ]),
    ];
    if (!household.guardianIds.includes(guardian.id)) household.guardianIds.push(guardian.id);
    if (!guardian.roles.includes('guardian')) guardian.roles.push('guardian');
    const relationId = `v4-rel-${child.id}-${guardian.id}-guardian`;
    if (!world.relations[relationId]) {
      const relation: Relation = {
        id: relationId,
        a: child.id,
        b: guardian.id,
        kind: 'guardian',
        trust: 0.5,
        affection: 0.45,
        obligation: 0.7,
        fear: 0,
        respect: 0.5,
        start: { ...date },
        sharedEventIds: [],
      };
      world.relations[relationId] = relation;
      if (!child.relationshipIds.includes(relationId)) child.relationshipIds.push(relationId);
      if (!guardian.relationshipIds.includes(relationId)) guardian.relationshipIds.push(relationId);
    }
  }
}

function applyDeath(
  context: EngineContext,
  effect: Extract<EventEffect, { type: 'death' }>,
  binding: EffectBinding,
): EventEffect | undefined {
  const person = context.world.persons[effect.personId];
  if (!person) return undefined;
  if (person.died) {
    warnContext(context, 'already_dead', `death effect ignored for ${person.id}`, {
      personId: person.id,
      eventId: binding.eventId,
    });
    return undefined;
  }
  if (typeof effect.cause !== 'string' || effect.cause.length === 0) return undefined;

  person.died = { ...binding.date };
  person.deathCause = effect.cause;
  person.health.vitality = 0;
  if (!context.diagnostics.deaths.includes(person.id)) {
    context.diagnostics.deaths.push(person.id);
  }
  if (person.employment) {
    const organization = context.world.organizations[person.employment.organizationId];
    if (organization) {
      organization.memberIds = organization.memberIds.filter((id) => id !== person.id);
    }
    delete person.employment;
  }
  closePositionsFor(context.world, person.id, binding.date);
  for (const organization of Object.values(context.world.organizations)) {
    organization.memberIds = organization.memberIds.filter((id) => id !== person.id);
  }
  for (const relation of Object.values(context.world.relations)) {
    if (relation.end !== undefined) continue;
    if (relation.a !== person.id && relation.b !== person.id) continue;
    if (relation.kind === 'partner') relation.end = { ...binding.date };
  }
  repairGuardiansAfterDeath(context.world, person, binding.date);

  // Death closes projects instead of leaving them open on a corpse.
  for (const projectId of Object.keys(context.world.projects).sort()) {
    const project = context.world.projects[projectId]!;
    if (
      project.state === 'completed' ||
      project.state === 'failed' ||
      project.state === 'cancelled'
    ) {
      continue;
    }
    const owned = project.ownerId === person.id;
    const participates = project.participants.some((entry) => entry.personId === person.id);
    if (!owned && !participates) continue;
    project.state = 'failed';
    const blocker = owned ? 'owner_died' : 'participant_died';
    if (!project.blockers.includes(blocker)) project.blockers.push(blocker);
    if (!project.causeIds.includes(binding.eventId)) project.causeIds.push(binding.eventId);
    project.history.push({
      date: { ...binding.date },
      note: `closed:${blocker}`,
      eventId: binding.eventId,
    });
  }

  const estate = settleExtinctHousehold(context.world, person, binding.date);
  return {
    ...effect,
    ...(estate ? { estateTo: estate.heirHouseholdId, estateAmount: estate.amount } : {}),
  };
}

function illnessLabel(name: string): string {
  switch (name) {
    case 'pneumonia':
      return '肺炎';
    case 'tuberculosis':
      return '肺结核';
    case 'dysentery':
      return '痢疾';
    case 'typhoid':
      return '伤寒';
    default:
      return '急性感染';
  }
}

function illnessCause(name: string): DeathCause {
  switch (name) {
    case 'pneumonia':
      return 'pneumonia';
    case 'tuberculosis':
      return 'tuberculosis';
    case 'dysentery':
      return 'infant_diarrhoea';
    case 'typhoid':
      return 'other';
    default:
      return 'other';
  }
}

function statisticalDeathText(
  person: Person,
  cause: DeathCause,
  date: WorldDate,
  placeName: string,
): string {
  switch (cause) {
    case 'infant_diarrhoea':
      return `${person.name}在${placeName}连续腹泻了两天，嘴唇干裂，喂水也留不住。家里没有钱再请医生，天亮前孩子停止了呼吸。`;
    case 'pneumonia':
      return `${person.name}在${placeName}发起高烧，咳嗽越来越深。邻居帮忙去请医生，医生到时只留下药粉和一张账单；几天后呼吸变得很浅。`;
    case 'tuberculosis':
      return `${person.name}咳了几个月，手帕上开始带血。${date.year}年冬天，${person.name}在${placeName}的床上消瘦下去，再没有力气去上工。`;
    case 'childbirth':
      return `${person.name}生产后一直发热，腹部疼痛。接生的人说已经排干净了，但几天后高热不退，${placeName}的家里人连夜去请医生，仍没赶上。`;
    case 'war':
      return `${person.name}在战乱中受了重伤，被送到${placeName}的临时救护站。血迹浸透了绷带，名字被写在一张潮湿的纸上。`;
    case 'accident':
      return `${person.name}在${placeName}附近出了事故。工友和路人把人抬到门口，等医生赶到时已经没有了呼吸。`;
    case 'violence':
      return `${person.name}在${placeName}卷入一场冲突，头部和胸口受了重伤。旁人把人抬回家，夜里伤势恶化。`;
    case 'famine':
      return `${person.name}已经很久没有吃到足够的面包。${date.year}年，${placeName}的配给再次缩减，${person.name}在饥饿和虚弱中去世。`;
    case 'old_age':
      return `${person.name}在${placeName}的床上安静地停止呼吸。桌上还放着没吃完的药和一杯水，邻居早上来敲门时才发现。`;
    default:
      return `${person.name}在${placeName}突发急病，高热和虚弱持续了几天。医生没能给出明确诊断，${person.name}在一个夜里去世。`;
  }
}

function commitStatisticalDeath(
  context: EngineContext,
  person: Person,
  cause: DeathCause,
  date: WorldDate,
): boolean {
  const placeName = context.world.places[person.locationId]?.name ?? '维也纳';
  const event = commitEvent(
    context,
    {
      date: { ...date },
      placeId: person.locationId,
      subjectId: person.id,
      participants: [{ personId: person.id, role: 'subject' }],
      action: `statistical_death/${cause}`,
      causes: [],
      effects: [
        {
          type: 'death',
          personId: person.id,
          cause: DEATH_CAUSE_TEXT[cause],
          reason: `statistical risk: ${cause}`,
        },
      ],
      immediateText: statisticalDeathText(person, cause, date, placeName),
      significance: 0.95,
      visibility: 'participants',
      provenance: { kind: 'system', sourceId: `statistics:${cause}` },
    },
    { roleIds: { subject: person.id }, fundingOrganizationIds: [] },
    true,
  );
  return Boolean(event);
}

/**
 * Phase 3 statistical pass. It is the only baseline natural-mortality
 * authority: infection, recovery, worsening, maternal risk and age-specific
 * death all pass through this function. Explicit content deaths remain
 * external events (accidents, war, violence); they cannot double-kill an
 * already dead person because commitEvent/applyDeath checks the person.
 */

function applyStatisticalMonth(context: EngineContext, date: WorldDate): void {
  const world = context.world;
  if (!world.macro) return;
  const personIds = Object.keys(world.persons).sort();
  for (const personId of personIds) {
    const person = world.persons[personId];
    if (!person || person.died) continue;
    const region = macroForPerson(world, person);
    if (!region) continue;
    const params = region.parameters;
    if (
      person.health.postpartumUntil &&
      monthIndex(person.health.postpartumUntil) < monthIndex(date)
    ) {
      delete person.health.postpartumUntil;
    }
    const age = Math.max(0, ageAt(person, date));
    if (person.health.lastIllness) {
      const name = person.health.lastIllness.name;
      const since = person.health.lastIllness.since;
      const durationMonths = Math.max(0, monthIndex(date) - monthIndex(since));
      // Acute illness is not a permanent status. Without a resolution window a
      // single pneumonia could emit "still not better" every quarter for years.
      // Resolve at six months: most recover, a minority die, and the log closes.
      if (durationMonths >= 6) {
        const resolution = seededRng(
          world.seed,
          'illness-resolution',
          person.id,
          date.year,
          date.month,
        );
        const deathChance = Math.min(
          0.35,
          0.06 + (age >= 60 ? 0.12 : 0) + (1 - person.health.vitality) * 0.2,
        );
        if (resolution() >= deathChance) {
          delete person.health.lastIllness;
          context.diagnostics.statistical.recoveries += 1;
          commitEvent(
            context,
            {
              date: { ...date },
              placeId: person.locationId,
              subjectId: person.id,
              participants: [{ personId: person.id, role: 'subject' }],
              action: 'statistical_recovery',
              causes: [],
              effects: [],
              immediateText: `${person.name}熬过了这场${illnessLabel(name)}，能坐起来喝一点汤，但身体还很虚。`,
              significance: 0.45,
              visibility: 'participants',
              provenance: { kind: 'system', sourceId: 'statistics:recovery' },
            },
            { roleIds: { subject: person.id }, fundingOrganizationIds: [] },
            true,
          );
        } else if (commitStatisticalDeath(context, person, illnessCause(name), date)) {
          context.diagnostics.statistical.deaths += 1;
        }
        continue;
      }
      const rng = seededRng(world.seed, 'illness-month', person.id, date.year, date.month);
      const annualRecovery = recoveryRisk(age, params);
      const monthlyRecovery = 1 - Math.pow(1 - annualRecovery, 1 / 12);
      if (rng() < monthlyRecovery) {
        delete person.health.lastIllness;
        context.diagnostics.statistical.recoveries += 1;
        commitEvent(
          context,
          {
            date: { ...date },
            placeId: person.locationId,
            subjectId: person.id,
            participants: [{ personId: person.id, role: 'subject' }],
            action: 'statistical_recovery',
            causes: [],
            effects: [],
            immediateText: `${person.name}从${illnessLabel(name)}中慢慢恢复，能下床喝水，但身体还虚弱。`,
            significance: 0.35,
            visibility: 'participants',
            provenance: { kind: 'system', sourceId: 'statistics:recovery' },
          },
          { roleIds: { subject: person.id }, fundingOrganizationIds: [] },
          true,
        );
        continue;
      }
      person.health.lastIllness.severity = clamp(person.health.lastIllness.severity + 0.02, 0, 1);
      const annualDeath =
        0.015 + person.health.lastIllness.severity * 0.16 + (1 - params.healthcare) * 0.03;
      const deathRng = seededRng(
        world.seed,
        'illness-death-month',
        person.id,
        date.year,
        date.month,
      );
      if (deathRng() < Math.min(0.08, annualDeath / 12)) {
        if (commitStatisticalDeath(context, person, illnessCause(name), date)) {
          context.diagnostics.statistical.deaths += 1;
        }
      } else if (date.month % 3 === 0) {
        commitEvent(
          context,
          {
            date: { ...date },
            placeId: person.locationId,
            subjectId: person.id,
            participants: [{ personId: person.id, role: 'subject' }],
            action: 'statistical_illness_worsened',
            causes: [],
            effects: [],
            immediateText: `${person.name}的${illnessLabel(name)}没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。`,
            significance: 0.35,
            visibility: 'participants',
            provenance: { kind: 'system', sourceId: 'statistics:worsening' },
          },
          { roleIds: { subject: person.id }, fundingOrganizationIds: [] },
          true,
        );
      }
      continue;
    }
    if (age >= 1) {
      const infectionRng = seededRng(
        world.seed,
        'infection-month',
        person.id,
        date.year,
        date.month,
      );
      const annual = annualInfectionRisk(person, age, params);
      const monthly = 1 - Math.pow(1 - annual, 1 / 12);
      if (infectionRng() < monthly) {
        const name = infectionNameForAge(
          age,
          seededRng(world.seed, 'infection-name-month', person.id, date.year, date.month),
        );
        person.health.lastIllness = { name, since: { ...date }, severity: 0.25 };
        context.diagnostics.statistical.infections += 1;
        commitEvent(
          context,
          {
            date: { ...date },
            placeId: person.locationId,
            subjectId: person.id,
            participants: [{ personId: person.id, role: 'subject' }],
            action: 'statistical_infection',
            causes: [],
            effects: [],
            immediateText: `${person.name}在${world.places[person.locationId]?.name ?? '维也纳'}病倒了，${illnessLabel(name)}让身体发热、虚弱，接下来的日子只能卧床。`,
            significance: 0.55,
            visibility: 'participants',
            provenance: { kind: 'system', sourceId: 'statistics:infection' },
          },
          { roleIds: { subject: person.id }, fundingOrganizationIds: [] },
          true,
        );
        continue;
      }
    }
    if (
      person.health.postpartumUntil &&
      monthIndex(person.health.postpartumUntil) >= monthIndex(date)
    ) {
      const maternalRng = seededRng(world.seed, 'maternal-month', person.id, date.year, date.month);
      if (maternalRng() < 0.015 / 12) {
        if (commitStatisticalDeath(context, person, 'childbirth', date)) {
          context.diagnostics.statistical.deaths += 1;
        }
      }
    }
  }
}

function applyStatisticalYear(context: EngineContext, date: WorldDate): void {
  const world = context.world;
  if (!world.macro) return;
  const personIds = Object.keys(world.persons).sort();
  for (const personId of personIds) {
    const person = world.persons[personId];
    if (!person || person.died) continue;
    const region = macroForPerson(world, person);
    if (!region) continue;
    if (
      person.health.postpartumUntil &&
      monthIndex(person.health.postpartumUntil) < monthIndex(date)
    ) {
      delete person.health.postpartumUntil;
    }
    const age = ageAt(person, date) - (date.month < person.born.month ? 1 : 0);
    const params = region.parameters;
    const risks = estimateAnnualRisks(person, date, region, {
      excludeCauses: ['pneumonia', 'tuberculosis', 'infant_diarrhoea', 'childbirth'],
    });
    const cause = sampleDeathCause(risks, seededRng(world.seed, 'mortality', person.id, date.year));
    if (cause && commitStatisticalDeath(context, person, cause, date)) {
      context.diagnostics.statistical.deaths += 1;
    }
  }
}

function reapVitalityZero(context: EngineContext, date: WorldDate, causeEventId?: Id): void {
  const personIds = Object.keys(context.world.persons).sort();
  for (const personId of personIds) {
    const person = context.world.persons[personId];
    if (!person || person.died || person.health.vitality > 1e-9) continue;
    const event = commitEvent(
      context,
      {
        date: { ...date },
        placeId: person.locationId,
        subjectId: person.id,
        participants: [{ personId: person.id, role: 'subject' }],
        action: 'death',
        causes: causeEventId ? [causeEventId] : [],
        effects: [
          {
            type: 'death',
            personId: person.id,
            cause: context.world.macro
              ? person.health.lastIllness
                ? DEATH_CAUSE_TEXT[illnessCause(person.health.lastIllness.name)]
                : '重伤与衰竭'
              : 'vitality_exhausted',
            reason: 'vitality reached zero',
          },
        ],
        immediateText:
          person.health.nutrition <= 0.05
            ? `${person.name}因长期饥饿和虚弱，在一个没有食物的月份里去世。`
            : `${person.name}因身体衰竭去世，死亡原因没有更完整的医疗记录。`,
        significance: 0.9,
        visibility: 'participants',
        provenance: { kind: 'system', sourceId: 'vitality' },
      },
      { roleIds: { subject: person.id }, fundingOrganizationIds: [] },
      true,
    );
    if (event && !context.diagnostics.deaths.includes(person.id)) {
      context.diagnostics.deaths.push(person.id);
    }
  }
}

// ---------------------------------------------------------------------------
// Household economy and due lifecycles
// ---------------------------------------------------------------------------

function settleEconomyMonth(context: EngineContext, date: WorldDate): void {
  const world = context.world;
  const economy = context.diagnostics.economy;

  // Explicit external sector: market/tax receipts and household transfers.
  // These are modelled inflows, not conjured money; diagnostics record them.
  for (const organizationId of Object.keys(world.organizations).sort()) {
    const organization = world.organizations[organizationId]!;
    if (organization.status !== 'active') continue;
    const revenue = roundMoney(Math.max(0, organization.monthlyRevenue ?? 0));
    if (revenue <= 0) continue;
    organization.treasury = roundMoney(organization.treasury + revenue);
    economy.revenue = roundMoney(economy.revenue + revenue);
  }
  for (const householdId of Object.keys(world.households).sort()) {
    const household = world.households[householdId]!;
    const income = roundMoney(
      (household.monthlyIncome ?? []).reduce((sum, entry) => sum + Math.max(0, entry.amount), 0),
    );
    if (income <= 0) continue;
    household.cash = roundMoney(household.cash + income);
    economy.transfers = roundMoney(economy.transfers + income);
  }

  // Wages move from the employing organization to the person's household.
  for (const personId of Object.keys(world.persons).sort()) {
    const person = world.persons[personId]!;
    if (person.died || !person.employment) continue;
    const organization = world.organizations[person.employment.organizationId];
    if (!organization || organization.status !== 'active') {
      if (organization) {
        organization.memberIds = organization.memberIds.filter((id) => id !== person.id);
      }
      delete person.employment;
      warnContext(context, 'employment_closed', 'employer is missing or dissolved', {
        personId,
      });
      continue;
    }
    const household = world.households[person.householdId];
    if (!household) continue;
    const wage = roundMoney(Math.max(0, person.employment.wage));
    const available = Math.max(0, organization.treasury);
    const paid = roundMoney(Math.min(wage, available));
    if (paid > 0) {
      organization.treasury = roundMoney(available - paid);
      household.cash = roundMoney(household.cash + paid);
      economy.wagesPaid = roundMoney(economy.wagesPaid + paid);
    }
    if (wage > paid) economy.wagesUnpaid = roundMoney(economy.wagesUnpaid + (wage - paid));
  }

  // Rent, food and other obligations. A `food` obligation is the month's food
  // budget in cash; food stock is the reserve used when that budget cannot be
  // paid. Food is bought first because a household feeds itself before paying
  // rent. Unpaid rent becomes debt. Rent is transferred to the residence owner
  // when the world records one. No path can make cash or food negative.
  for (const householdId of Object.keys(world.households).sort()) {
    const household = world.households[householdId]!;
    const obligations: Household['obligations'] = household.obligations.filter(
      (entry) =>
        entry &&
        typeof entry.amount === 'number' &&
        Number.isFinite(entry.amount) &&
        entry.amount > 0,
    );
    const hasRentObligation = obligations.some((entry) => entry.kind === 'rent');
    if (!hasRentObligation && household.rent > 0) {
      obligations.push({ id: 'implicit-rent', kind: 'rent', amount: household.rent });
    }

    const members = household.memberIds
      .map((id) => world.persons[id])
      .filter((person): person is Person => Boolean(person) && !person.died);
    const residence = world.places[household.residenceId];
    if (residence?.capacity && members.length > residence.capacity) {
      economy.overcrowdedMonths += 1;
      applyFoodHealth(members, 0.9, Boolean(world.macro));
    }
    const foodBudget = roundMoney(
      obligations
        .filter((entry) => entry.kind === 'food')
        .reduce((sum, entry) => sum + entry.amount, 0),
    );
    if (members.length > 0) {
      if (foodBudget > 0) {
        const paid = roundMoney(Math.min(household.cash, foodBudget));
        household.cash = roundMoney(household.cash - paid);
        economy.foodSpent = roundMoney(economy.foodSpent + paid);
        economy.obligationsPaid = roundMoney(economy.obligationsPaid + paid);
        const uncovered = roundMoney(foodBudget - paid);
        const fromStock = roundFood(Math.min(household.food, uncovered));
        household.food = roundFood(household.food - fromStock);
        economy.foodConsumed = roundFood(economy.foodConsumed + fromStock);
        const foodShortage = roundMoney(uncovered - fromStock);
        if (foodShortage > 0.001) {
          const ratio = foodShortage / foodBudget;
          economy.foodShortageMonths += 1;
          applyFoodHealth(members, 1 - ratio, Boolean(world.macro));
        } else {
          applyFoodHealth(members, 1, Boolean(world.macro));
        }
      } else {
        const need = roundFood(members.length * context.options.foodPerPersonPerMonth);
        const consumed = roundFood(Math.min(household.food, need));
        household.food = roundFood(household.food - consumed);
        economy.foodConsumed = roundFood(economy.foodConsumed + consumed);
        const ratio = need > 0 ? consumed / need : 1;
        if (ratio < 0.999) economy.foodShortageMonths += 1;
        applyFoodHealth(members, ratio, Boolean(world.macro));
      }
    }

    for (const obligation of obligations) {
      if (obligation.kind === 'food') continue;
      const amount = roundMoney(obligation.amount);
      if (obligation.kind === 'debt') {
        const paid = roundMoney(Math.min(household.cash, amount, household.debt));
        if (paid <= 0) continue;
        household.cash = roundMoney(household.cash - paid);
        household.debt = roundMoney(household.debt - paid);
        economy.obligationsPaid = roundMoney(economy.obligationsPaid + paid);
        continue;
      }
      const paid = roundMoney(Math.min(household.cash, amount));
      if (paid <= 0) {
        if (obligation.kind === 'rent') {
          household.debt = roundMoney(household.debt + amount);
        }
        continue;
      }
      household.cash = roundMoney(household.cash - paid);
      economy.obligationsPaid = roundMoney(economy.obligationsPaid + paid);
      if (obligation.kind === 'rent') {
        economy.rentPaid = roundMoney(economy.rentPaid + paid);
        const residence = world.places[household.residenceId];
        const owner = residence?.ownershipOrganizationId
          ? world.organizations[residence.ownershipOrganizationId]
          : undefined;
        if (owner && owner.status === 'active') {
          owner.treasury = roundMoney(owner.treasury + paid);
        }
        const shortfall = roundMoney(amount - paid);
        if (shortfall > 0) household.debt = roundMoney(household.debt + shortfall);
      }
    }
  }
}

function applyFoodHealth(members: Person[], ratio: number, macroWorld = false): void {
  const shortage = Math.max(0, 1 - clamp(ratio, 0, 1));
  const floor = macroWorld ? 0.01 : 0;
  for (const member of members) {
    if (shortage <= 0.001) {
      member.health.nutrition = clamp(member.health.nutrition + 0.05, 0, 1);
      member.health.vitality = clamp(member.health.vitality + 0.01, 0, 1);
    } else {
      member.health.nutrition = clamp(member.health.nutrition - 0.2 * shortage, 0, 1);
      member.health.vitality = clamp(member.health.vitality - 0.05 * shortage, floor, 1);
    }
  }
}

function expireDueInteractions(context: EngineContext): void {
  const world = context.world;
  for (const interactionId of Object.keys(world.interactions).sort()) {
    const interaction = world.interactions[interactionId]!;
    if (interaction.status !== 'pending' || !interaction.due) continue;
    if (monthIndex(interaction.due) > monthIndex(context.target)) continue;
    const initiator = world.persons[interaction.initiatorId];
    const counterparty = interaction.counterpartyIds
      .map((id) => world.persons[id])
      .find((person): person is Person => Boolean(person) && !person.died);
    if (!initiator || initiator.died || !counterparty) {
      const expired: Interaction = { ...structuredClone(interaction), status: 'expired' };
      world.interactions[interactionId] = expired;
      continue;
    }
    const proposal = (interaction.proposal ?? {}) as Record<string, unknown>;
    const hasResponse =
      Array.isArray(proposal.acceptEffects) ||
      Array.isArray(proposal.rejectEffects) ||
      typeof proposal.acceptText === 'string' ||
      typeof proposal.rejectText === 'string';
    if (!hasResponse) {
      const updated: Interaction = { ...structuredClone(interaction), status: 'expired' };
      const event = commitEvent(
        context,
        {
          date: { ...context.target },
          placeId: initiator.locationId,
          subjectId: initiator.id,
          participants: [
            { personId: initiator.id, role: 'subject' },
            ...interaction.counterpartyIds
              .filter((id) => id !== initiator.id && world.persons[id])
              .map((id) => ({ personId: id, role: 'counterparty' })),
          ],
          action: 'interaction_expired',
          causes: [],
          effects: [{ type: 'interaction', interaction: updated }],
          immediateText: '',
          significance: 0.2,
          visibility: 'participants',
          provenance: { kind: 'interaction', sourceId: interaction.id },
        },
        { roleIds: {}, fundingOrganizationIds: [] },
        false,
      );
      if (!event) {
        world.interactions[interactionId] = updated;
        warnContext(
          context,
          'interaction_expired_without_event',
          'interaction expired without a fact',
          { personId: initiator.id, eventId: interaction.id },
        );
      }
      continue;
    }
    const acceptIf = (proposal.acceptIf ?? {}) as Record<string, unknown>;
    const relation = Object.values(world.relations).find(
      (candidate) =>
        candidate.kind !== 'employer' &&
        candidate.end === undefined &&
        ((candidate.a === initiator.id && candidate.b === counterparty.id) ||
          (candidate.a === counterparty.id && candidate.b === initiator.id)),
    );
    const threshold = typeof acceptIf.minTrust === 'number' ? acceptIf.minTrust : 0;
    const chance =
      typeof acceptIf.chance === 'number'
        ? clamp(acceptIf.chance, 0, 1)
        : relation
          ? clamp(0.5 + relation.trust * 0.4 + relation.affection * 0.2, 0.05, 0.95)
          : 0.35;
    const rng = seededRng(
      world.seed,
      'interaction-response',
      interaction.id,
      initiator.id,
      counterparty.id,
      context.target.year,
    );
    const hasActivePartner = (personId: Id): boolean =>
      relationsFor(world, personId).some(
        (candidate) =>
          candidate.kind === 'partner' &&
          candidate.end === undefined &&
          candidate.a !== candidate.b,
      );
    let accepted = (relation?.trust ?? 0) >= threshold && rng() < chance;
    if (hasActivePartner(initiator.id) || hasActivePartner(counterparty.id)) {
      // A pending proposal cannot create a second partnership after the world
      // has already given one of the parties a partner.
      accepted = false;
    }
    const response = accepted ? 'accepted' : 'rejected';
    const updated: Interaction = {
      ...structuredClone(interaction),
      status: accepted ? 'accepted' : 'rejected',
      responses: [
        ...interaction.responses,
        {
          personId: counterparty.id,
          response,
          note:
            typeof proposal[accepted ? 'acceptText' : 'rejectText'] === 'string'
              ? String(proposal[accepted ? 'acceptText' : 'rejectText'])
              : undefined,
        },
      ],
    };
    const rawEffects = Array.isArray(proposal[accepted ? 'acceptEffects' : 'rejectEffects'])
      ? (proposal[accepted ? 'acceptEffects' : 'rejectEffects'] as EventEffect[])
      : [];
    const text =
      typeof proposal[accepted ? 'acceptText' : 'rejectText'] === 'string'
        ? String(proposal[accepted ? 'acceptText' : 'rejectText'])
        : `${counterparty.name}${accepted ? '接受了' : '拒绝了'}${initiator.name}的请求。`;
    const event = commitEvent(
      context,
      {
        date: { ...context.target },
        placeId: counterparty.locationId,
        subjectId: initiator.id,
        participants: [
          { personId: initiator.id, role: 'initiator' },
          { personId: counterparty.id, role: 'counterparty' },
        ],
        title: accepted ? '请求得到回应' : '请求被拒绝',
        action: 'interaction_response',
        causes: typeof proposal.causeEventId === 'string' ? [proposal.causeEventId] : [],
        effects: [...rawEffects, { type: 'interaction', interaction: updated }],
        immediateText: interpolateSceneText(
          text,
          world,
          initiator,
          { counterparty: counterparty.id },
          context.target,
        ),
        significance: accepted ? 0.6 : 0.4,
        visibility: 'participants',
        provenance: { kind: 'interaction', sourceId: interaction.id },
      },
      {
        roleIds: { counterparty: counterparty.id, subject: initiator.id },
        fundingOrganizationIds: [],
      },
      true,
    );
    if (!event) {
      world.interactions[interactionId] = updated;
      warnContext(
        context,
        'interaction_response_without_event',
        'interaction response could not commit effects',
        { personId: initiator.id, eventId: interaction.id },
      );
    }
  }
}

function projectEventParticipants(world: WorldState, project: Project): EventParticipant[] {
  const participants: EventParticipant[] = [];
  const seen = new Set<string>();
  const push = (personId: Id, role: string) => {
    if (!world.persons[personId]) return;
    const key = `${personId} ${role}`;
    if (seen.has(key)) return;
    seen.add(key);
    participants.push({ personId, role });
  };
  if (world.persons[project.ownerId]) push(project.ownerId, 'owner');
  for (const entry of project.participants) push(entry.personId, entry.role || 'participant');
  return participants;
}

function advanceDueProjects(context: EngineContext): void {
  const world = context.world;
  for (const projectId of Object.keys(world.projects).sort()) {
    const project = world.projects[projectId]!;
    if (
      project.state === 'completed' ||
      project.state === 'failed' ||
      project.state === 'cancelled' ||
      !project.deadline
    ) {
      continue;
    }
    if (monthIndex(project.deadline) > monthIndex(context.target)) continue;

    const livingParticipants = project.participants.filter((entry) => {
      const person = world.persons[entry.personId];
      return Boolean(person) && !person.died;
    });
    const ownerPerson = world.persons[project.ownerId];
    const ownerOrganization = world.organizations[project.ownerId];
    const ownerAvailable = ownerPerson
      ? !ownerPerson.died
      : ownerOrganization
        ? ownerOrganization.status === 'active'
        : false;

    const updated: Project = structuredClone(project);
    let action: 'project_progressed' | 'project_blocked' | 'project_completed' | 'project_failed';
    let significance = 0.45;

    if (!ownerAvailable) {
      updated.state = 'failed';
      addBlocker(updated, 'owner_unavailable');
      action = 'project_failed';
      significance = 0.7;
    } else if (
      updated.required.people !== undefined &&
      livingParticipants.length < updated.required.people
    ) {
      updated.state = 'failed';
      addBlocker(updated, 'insufficient_participants');
      action = 'project_failed';
      significance = 0.7;
    } else if (updated.blockers.length > 0) {
      updated.state = 'blocked';
      updated.deadline = addMonths(context.target, 12);
      action = 'project_blocked';
      significance = 0.3;
    } else if (updated.stage + 1 >= 2) {
      updated.stage += 1;
      updated.state = 'completed';
      action = 'project_completed';
      significance = 0.7;
    } else {
      updated.stage += 1;
      updated.state = 'active';
      updated.deadline = addMonths(context.target, 12);
      action = 'project_progressed';
    }
    updated.history.push({ date: { ...context.target }, note: action });

    const subjectId =
      (ownerPerson && !ownerPerson.died && ownerPerson.id) ||
      livingParticipants[0]?.personId ||
      projectEventParticipants(world, updated)[0]?.personId;
    if (!subjectId) {
      world.projects[projectId] = updated;
      warnContext(
        context,
        'project_updated_without_event',
        'project had no living person subject',
        {
          eventId: projectId,
        },
      );
      continue;
    }

    const event = commitEvent(
      context,
      {
        date: { ...context.target },
        placeId: updated.placeId ?? world.persons[subjectId]?.locationId,
        subjectId,
        participants: projectEventParticipants(world, updated),
        action,
        causes: updated.causeIds,
        effects: [{ type: 'project', project: updated }],
        immediateText: '',
        significance,
        visibility: 'participants',
        provenance: { kind: 'project', sourceId: updated.id },
      },
      { roleIds: {}, fundingOrganizationIds: [] },
      false,
    );
    if (!event || !event.effects.some((effect) => effect.type === 'project')) {
      world.projects[projectId] = updated;
      warnContext(
        context,
        'project_updated_without_event',
        'project update did not commit a fact',
        {
          eventId: projectId,
        },
      );
    } else {
      const stored = world.projects[projectId];
      if (stored) {
        const last = stored.history[stored.history.length - 1];
        if (last && sameDate(last.date, context.target) && last.note === action) {
          last.eventId = event.id;
        }
      }
    }
  }
}

function addBlocker(project: Project, blocker: string): void {
  if (!project.blockers.includes(blocker)) project.blockers.push(blocker);
}
