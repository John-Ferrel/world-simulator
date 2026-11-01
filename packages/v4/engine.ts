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
  economy: V4EconomyDiagnostics;
  warnings: V4Warning[];
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
  const diagnostics: V4AdvanceDiagnostics = {
    from,
    to: target,
    personsConsidered: 0,
    sceneInstancesCreated: 0,
    scenesResolved: 0,
    scenesBlocked: 0,
    eventsCreated: 0,
    deaths: [],
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

  if (draft.status !== 'running') {
    warn(diagnostics, 'world_not_running', `world status is ${draft.status}; year not advanced`);
    return { world: draft, events: [], scenes: [], diagnostics };
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
  };

  const definitions = usableDefinitions(scenes, diagnostics);
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
      reapVitalityZero(context, date);
      diagnostics.economy.months += 1;
      assertWorldV4(draft);
    }
  }

  draft.date = target;
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
  reapVitalityZero(context, target);
  draft.date = target;

  diagnostics.personsConsidered = Object.keys(draft.persons).filter(
    (id) => Boolean(draft.persons[id]) && !draft.persons[id]!.died,
  ).length;
  diagnostics.sceneInstancesCreated = context.newScenes.length;
  diagnostics.scenesResolved = context.newScenes.filter((s) => s.status === 'resolved').length;
  diagnostics.scenesBlocked = context.newScenes.filter((s) => s.status === 'blocked').length;
  diagnostics.eventsCreated = context.newEvents.length;

  assertWorldV4(draft);

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
  const prefix = `scn:${context.world.id}:`;
  let ordinal = context.nextSceneOrdinal;
  let id = `${prefix}${String(ordinal).padStart(6, '0')}`;
  while (context.world.scenes.some((scene) => scene.id === id)) {
    ordinal += 1;
    id = `${prefix}${String(ordinal).padStart(6, '0')}`;
  }
  context.nextSceneOrdinal = ordinal + 1;
  return id;
}

function appendScene(context: EngineContext, scene: SceneInstance): void {
  context.world.scenes.push(scene);
  context.newScenes.push(scene);
  context.world.historyMeta.lastSceneId = scene.id;
}

function nextEventIdentity(context: EngineContext): { id: Id; sequence: number } {
  let sequence = context.world.historyMeta.sequence;
  let id = '';
  do {
    sequence += 1;
    id = `evt:${context.world.id}:${String(sequence).padStart(6, '0')}`;
  } while (context.world.events.some((event) => event.id === id));
  return { id, sequence };
}

// ---------------------------------------------------------------------------
// Scene eligibility, casting and outcomes
// ---------------------------------------------------------------------------

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
    case 'hasRelation':
      return Object.values(world.relations).some((relation) => {
        if (relation.kind !== condition.relationKind) return false;
        if (relation.a !== subject.id && relation.b !== subject.id) return false;
        if (relation.end !== undefined) return false;
        if (typeof condition.minTrust !== 'number') return true;
        return relation.trust >= condition.minTrust;
      });
    case 'notHasRelation':
      return !Object.values(world.relations).some((relation) => {
        if (relation.kind !== condition.relationKind) return false;
        if (relation.a !== subject.id && relation.b !== subject.id) return false;
        return relation.end === undefined;
      });
    case 'worldYear':
      if (typeof condition.min === 'number' && date.year < condition.min) return false;
      if (typeof condition.max === 'number' && date.year > condition.max) return false;
      return true;
    case 'pressure': {
      const value = world.pressures[condition.key];
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
  if (requirement.sex !== undefined && person.sex !== requirement.sex) return false;
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
  return Object.keys(world.persons)
    .filter((id) => world.persons[id]?.roles.includes(role))
    .sort();
}

function roleCandidates(
  world: WorldState,
  subject: Person,
  requirement: SceneDefinition['roles'][number],
): Id[] {
  const people = Object.keys(world.persons).sort();
  const organizations = Object.keys(world.organizations).sort();
  const candidates = new Set<Id>();

  switch (requirement.kind) {
    case 'subject':
      candidates.add(subject.id);
      break;
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
        const partneredWithSubject = Object.values(world.relations).some(
          (relation) =>
            relation.kind === 'partner' &&
            relation.end === undefined &&
            ((relation.a === id && relation.b === subject.id) ||
              (relation.b === id && relation.a === subject.id)),
        );
        if (requirement.sameHousehold === true && !partneredWithSubject) continue;
        const partneredWithAnother = Object.values(world.relations).some(
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
    const candidates = roleCandidates(context.world, subject, requirement).filter((id) =>
      candidateFits(context.world, subject, id, requirement, date),
    );
    const unused = candidates.filter((id) => !usedPeople.has(id) || requirement.kind === 'subject');
    const pool = unused.length > 0 ? unused : candidates;
    if (pool.length === 0) {
      if (required) missing.push(requirement.key);
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

function eventRate(
  context: EngineContext,
  definition: SceneDefinition,
  subject: Person,
  date: WorldDate,
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
  const focus = subject.lifeContract?.focus;
  if (focus && focus !== 'none') {
    if (definition.tags.includes(focus) || definition.familyId?.includes(focus)) rate *= 1.5;
  }
  if (subject.ownerId) rate *= 2.5;
  const capability = subject.life?.flags.find((flag) => flag.startsWith('capability:'))?.slice(11);
  const capabilityTags: Record<string, string[]> = {
    literacy: ['education', 'school'],
    numeracy: ['work', 'market'],
    craft: ['work', 'apprentice'],
    social: ['social', 'family'],
    health: ['health', 'infancy'],
  };
  if (capability && capabilityTags[capability]?.some((tag) => definition.tags.includes(tag)))
    rate *= 1.2;
  const mood = subject.life?.mood ?? 0;
  if (definition.tags.includes('social') || definition.tags.includes('family')) {
    rate *= mood >= 0.25 ? 1.15 : mood <= -0.35 ? 0.8 : 1;
  }
  if (subject.health.vitality < 0.4 && definition.tags.includes('health')) rate *= 1.25;
  if (definition.tags.includes('work') && subject.employment) rate *= 1.1;
  return clamp(rate, 0, 1);
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
    while (ordinary < ordinaryCap) {
      if (!subject || subject.died) break;
      const candidates: { definition: SceneDefinition; weight: number }[] = [];
      const stageDefinitions = byStage.get(stageForAge(ageAt(subject, date))) ?? [];
      for (const definition of stageDefinitions) {
        if (used.has(definition.id)) continue;
        if (!sceneEligible(context, definition, subject, date)) continue;
        if (definition.triggerMode === 'fact' || definition.triggerMode === 'action') continue;
        const rate = eventRate(context, definition, subject, date);
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
    effects: outcome.effects,
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
          )}在场；家里现在有${context.world.households[child.householdId]?.memberIds.length ?? 0}口人。`,
        significance: 0.95,
        visibility: 'public',
        provenance: { kind: 'birth', sourceId: event.id },
      },
      { roleIds: {}, fundingOrganizationIds: [] },
      true,
    );
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
function resolveEffectRef(value: unknown, binding: EffectBinding, world: WorldState): unknown {
  if (typeof value !== 'string' || !value.startsWith('$')) return value;
  const key = value.slice(1);
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
  const after = clamp(before + effect.amount, 0, 1);
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
  const relation = Object.values(context.world.relations).find(
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
  const existing = Object.values(context.world.relations).find(
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
  // Existing bonds survive death (funerals, memory, obligations). Creating a
  // brand-new relation with a dead person is not allowed.
  if (!relation && (a.died || b.died)) return undefined;
  if (
    relation &&
    (relation.a !== effect.a || relation.b !== effect.b || relation.kind !== effect.kind)
  ) {
    return undefined;
  }
  if (relation?.end) return undefined;
  if (!relation) {
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
  if (!context.world.places[effect.locationId]) return undefined;
  if (person.locationId === effect.locationId) return undefined;
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
  const household = context.world.households[mother.householdId];
  if (!household) return undefined;
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
            cause: 'vitality_exhausted',
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
      applyFoodHealth(members, 0.9);
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
          applyFoodHealth(members, 1 - ratio);
        } else {
          applyFoodHealth(members, 1);
        }
      } else {
        const need = roundFood(members.length * context.options.foodPerPersonPerMonth);
        const consumed = roundFood(Math.min(household.food, need));
        household.food = roundFood(household.food - consumed);
        economy.foodConsumed = roundFood(economy.foodConsumed + consumed);
        const ratio = need > 0 ? consumed / need : 1;
        if (ratio < 0.999) economy.foodShortageMonths += 1;
        applyFoodHealth(members, ratio);
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

function applyFoodHealth(members: Person[], ratio: number): void {
  const shortage = Math.max(0, 1 - clamp(ratio, 0, 1));
  for (const member of members) {
    if (shortage <= 0.001) {
      member.health.nutrition = clamp(member.health.nutrition + 0.05, 0, 1);
      member.health.vitality = clamp(member.health.vitality + 0.01, 0, 1);
    } else {
      member.health.nutrition = clamp(member.health.nutrition - 0.2 * shortage, 0, 1);
      member.health.vitality = clamp(member.health.vitality - 0.05 * shortage, 0, 1);
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
    const accepted = (relation?.trust ?? 0) >= threshold && rng() < chance;
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
