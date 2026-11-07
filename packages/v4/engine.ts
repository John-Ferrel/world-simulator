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
  type HistoricalProcessMetrics,
  type Household,
  type IncidentTrace,
  type Id,
  type Interaction,
  type Knowledge,
  type NarrationVariant,
  type Organization,
  type Person,
  type PersonLife,
  type Place,
  type Position,
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
  type StateInstance,
  type StateOwnerType,
  type TaskDefinition,
  type WorldDate,
  type WorldState,
} from './domain.js';
import { parseComposedAction } from './composition/replay.js';
import { adaptiveContextTotals } from './composition/adaptive.js';
import {
  advanceDevelopmentLifecycle,
  eventPoolMultiplier,
  expireMacroEffects,
  macroForPerson,
  regionIdForPerson,
  takeBackgroundPerson,
  syncMacroPressures,
  type MacroState,
  type PendingMacroAction,
  type WorldDevelopment,
} from './macro.js';
import {
  agencyActorIds,
  planAgencyAction,
  planBottomUpProcess,
  refreshAgencyGoal,
} from './agency.js';
import { taskUtility } from './tasks.js';
import { reviewHistoricalWorld } from './history-db/review.js';
import type { CompositionSource } from './composition/types.js';
import {
  activeStates,
  checkBand,
  checkModifier,
  indexStateDefinitions,
  hasStateContextForPerson,
  reactionAllowed,
  reactionTriggered,
  resolveAttribute,
  resolveCheck,
  stateAnchorPerson,
  stateContextForPerson,
  stateDueForTick,
  stateExpired,
  stateOwnerExists,
  stateTagsForPerson,
  stateLookupFor,
  touchOrganizationRevision,
  touchStateRevision,
  type StateDefinitionIndex,
} from './state/runtime.js';
import {
  normalizeStateParameters,
  stateDuration,
  type StateDefinition,
  type StateModifier,
  type StateTick,
  type StateTickOutcome,
} from './state/types.js';
import {
  advanceHistoricalProcesses,
  ensureHistoricalProcess,
  HISTORICAL_METRIC_KEYS,
  HISTORICAL_PROCESS_KINDS,
  historicalPersonAvailable,
  recordHistoricalInfluence,
  recordReformLegacy,
  recordHistoricalParticipation,
  type HistoricalTransition,
} from './history.js';
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
  /** Deterministic person/organisation initiative loop. Defaults to false for old fixtures. */
  agency?: boolean;
  /** Maximum ordinary adults sampled for initiative per year. Defaults to 48. */
  maxAgencyActorsPerYear?: number;
  /** Content-authored active tasks, chosen by utility rather than event rate. */
  tasks?: TaskDefinition[];
  /** Phase 11 context×kernel composition source. Opt-in so old fixtures stay stable. */
  composition?: CompositionSource;
  /** Phase 15 mechanism state definitions. Opt-in; no states means old behavior. */
  states?: StateDefinition[];
  /** Set false only for isolated fixtures that must not tick states. Defaults true. */
  stateRuntime?: boolean;
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
  /** Phase 11 context×kernel composition statistics, when enabled. */
  composition?: {
    activeContexts: number;
    activeMilieus: number;
    kernelsConsidered: number;
    compiledScenes: number;
    compiledTasks: number;
    skippedByContext: number;
    skippedByMilieu: number;
    cacheHit: boolean;
  };
  /** Phase 15 state runtime counters. */
  states?: {
    active: number;
    defined: number;
    added: number;
    removed: number;
    transitions: number;
    ticks: number;
    reactions: number;
    blockedAdds: number;
    orphaned: number;
  };
  /** Phase 13 scheduling counters. Candidate pools are per person-year; draws
   * are ordinary encounter attempts that reached the source-specific selector. */
  scheduling?: {
    candidatePool: { base: number; composed: number };
    ordinary: {
      draws: { base: number; composed: number };
      ratePass: { base: number; composed: number };
      preparedPass: { base: number; composed: number };
      selected: { base: number; composed: number };
    };
    /** Phase 16: dedicated state/position opportunity lane. */
    stateOpportunity: {
      candidates: number;
      selected: number;
      resolved: number;
      missingRole: number;
      noOutcome: number;
      blocked: number;
      /** Phase 19: candidates/selected scenes that require 2+ state/position conditions. */
      crossStateCandidates: number;
      crossStateResolved: number;
      /** Phase 19: candidates/selected scenes whose state conditions span 2+ packs. */
      crossPackCandidates: number;
      crossPackResolved: number;
    };
    resolved: { base: number; composed: number };
    blocked: { base: number; composed: number };
    paths: Record<string, number>;
    blockedReasons: Record<string, number>;
  };
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
  agencyEnabled: boolean;
  maxAgencyActorsPerYear: number;
  maxOrdinaryEventsPerPerson: number;
  materializePopulation: boolean;
  statisticalModel: boolean;
  economyEnabled: boolean;
  foodPerPersonPerMonth: number;
  outcomePolicy?: V4OutcomePolicy;
  choicePolicy?: V4ChoicePolicy;
  composition?: CompositionSource;
  states?: StateDefinition[];
  stateRuntime: boolean;
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
  /** Cached role candidate pools filtered by requirement + subject context. */
  roleCastCache: Map<string, Id[]>;
  /** Cached state modifiers for a person under the current state/org revision. */
  stateModifierCache?: Map<
    Id,
    { key: string; modifiers: StateModifier[] }
  >;
  /** Lazily built per-year index of the named population, used to avoid O(n) casts. */
  peopleIndex?: PeopleIndex;
  /** Last committed event month per person, used by death-date anchoring. */
  lastEventMonths?: Map<Id, WorldDate>;
  /** Ids already committed into world.events, used to validate causes without O(n) scans. */
  eventIds?: Set<Id>;
  /** Per-year opportunity multiplier cache, keyed by event family and region. */
  poolMultiplierCache?: Map<string, number>;
  tasks: TaskDefinition[];
  tasksByStage: Map<SceneStage, TaskDefinition[]>;
  materializedCount: number;
  stateIndex: StateDefinitionIndex;
  /** Guard against reaction chains; bounded and reset per commit. */
  stateReactionDepth?: number;
  stateReactionMs?: number;
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
  check?: {
    die: number;
    modifier: number;
    total: number;
    dc: number;
    band: 'success' | 'failure' | 'critical_success' | 'critical_failure';
    blockedBy?: string;
    breakdown: ReturnType<typeof checkModifier>;
  };
};

type EventDraft = {
  date: WorldDate;
  placeId?: Id;
  subjectId: Id;
  participants: EventParticipant[];
  action: string;
  title?: string;
  causes?: Id[];
  /** Semantic tags authored by the scene; settled effect tags are added too. */
  tags?: string[];
  historyRefs?: Id[];
  effects: EventEffect[];
  immediateText: string;
  significance: number;
  visibility: EventFact['visibility'];
  sceneId?: Id;
  choices?: EventFact['choices'];
  provenance: EventFact['provenance'];
  triggerDepth?: number;
  trace?: IncidentTrace;
};

type CastResult = {
  roles: Record<Id, Id>;
  missing: string[];
};

type HistoryEntry = {
  eventId: Id;
  action: string;
  date: WorldDate;
  tags: string[];
  significance: number;
  /** `subject` for the subject's own fact, otherwise the participant role. */
  role: string;
  isSubject: boolean;
  /** Other people present in the incident, for reunion casting. */
  otherIds: Id[];
};

type WorldHistoryIndex = {
  length: number;
  byPerson: Map<Id, HistoryEntry[]>;
};

/**
 * A read-only, lazily rebuilt index of committed facts per person. It is keyed
 * by the WorldState object, so a cloned annual draft rebuilds once and then
 * receives every new commit incrementally. This is what lets scenes ask
 * "has this person already lived through X?" without scanning the full log for
 * every candidate in every year.
 */
const worldHistoryIndexes = new WeakMap<WorldState, WorldHistoryIndex>();
/** organization membership/position index; rebuilt when stateRevision changes. */
const worldOrganizationIndexes = new WeakMap<
  WorldState,
  { revision: number; byPerson: Map<Id, Organization[]> }
>();
/** State definitions are content, not world facts; keyed by the annual draft. */
const worldStateIndexes = new WeakMap<WorldState, StateDefinitionIndex>();

function setWorldStateIndex(world: WorldState, index: StateDefinitionIndex): void {
  worldStateIndexes.set(world, index);
}

function stateIndexForWorld(world: WorldState): StateDefinitionIndex {
  return worldStateIndexes.get(world) ?? indexStateDefinitions([]);
}

function buildWorldHistoryIndex(world: WorldState): WorldHistoryIndex {
  const index: WorldHistoryIndex = { length: world.events.length, byPerson: new Map() };
  for (const event of world.events) addHistoryEntry(index, event);
  return index;
}

function addHistoryEntry(index: WorldHistoryIndex, event: EventFact): void {
  const tags = event.tags ?? [];
  const add = (personId: Id, role: string, isSubject: boolean) => {
    const list = index.byPerson.get(personId) ?? [];
    list.push({
      eventId: event.id,
      action: event.action,
      date: event.date,
      tags,
      significance: event.significance,
      role,
      isSubject,
      otherIds: event.participants
        .map((participant) => participant.personId)
        .filter((id) => id !== personId),
    });
    index.byPerson.set(personId, list);
  };
  add(event.subjectId, 'subject', true);
  for (const participant of event.participants) {
    if (participant.personId === event.subjectId) continue;
    add(participant.personId, participant.role, false);
  }
}

function historyIndexFor(world: WorldState): WorldHistoryIndex {
  let index = worldHistoryIndexes.get(world);
  if (!index || index.length !== world.events.length) {
    index = buildWorldHistoryIndex(world);
    worldHistoryIndexes.set(world, index);
  }
  return index;
}

function historyFor(world: WorldState, personId: Id): HistoryEntry[] {
  return historyIndexFor(world).byPerson.get(personId) ?? [];
}

function countHistoryTag(world: WorldState, personId: Id, tag: string, _date: WorldDate): number {
  return historyFor(world, personId).filter((entry) => entry.tags.includes(tag)).length;
}

function rememberHistory(world: WorldState, event: EventFact): void {
  const index = worldHistoryIndexes.get(world);
  if (!index) return;
  addHistoryEntry(index, event);
  index.length = world.events.length;
}

function historyEntriesMatching(
  world: WorldState,
  personId: Id,
  condition: Extract<SceneCondition, { kind: 'history' }>,
  date: WorldDate,
): HistoryEntry[] {
  const earliest =
    condition.withinYears !== undefined
      ? monthIndex(date) - Math.max(0, condition.withinYears) * 12
      : Number.NEGATIVE_INFINITY;
  const matches = historyFor(world, personId).filter((entry) => {
    // The engine dates events inside the completed year while the world clock
    // sits at the year boundary; committed order, not the event month, is the
    // reliable notion of "before". A fact in world.events is already past.
    if (monthIndex(entry.date) < earliest) return false;
    if (
      condition.minYearsAgo !== undefined &&
      date.year - entry.date.year < Math.max(0, condition.minYearsAgo)
    ) {
      return false;
    }
    if (!entry.isSubject && condition.includeParticipants !== true && !condition.withRole) {
      return false;
    }
    if (condition.actionPrefix && !entry.action.startsWith(condition.actionPrefix)) return false;
    if (condition.kernelId && !entry.action.startsWith(`${condition.kernelId}::`)) return false;
    if (condition.outcome && !entry.action.endsWith(`/${condition.outcome}`)) return false;
    if (condition.tag && !entry.tags.includes(condition.tag)) return false;
    if (condition.minSignificance !== undefined && entry.significance < condition.minSignificance) {
      return false;
    }
    if (condition.withRole && entry.role !== condition.withRole) return false;
    return true;
  });
  return matches;
}

function historyPeopleForTag(world: WorldState, personId: Id, tag: string): Set<Id> {
  const people = new Set<Id>();
  for (const entry of historyFor(world, personId)) {
    if (!entry.tags.includes(tag)) continue;
    for (const otherId of entry.otherIds) people.add(otherId);
  }
  return people;
}

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
  'child',
  'partner',
  'teacher',
  'employer',
  'worker',
  'union_member',
  'neighbor',
  'official',
  'organization',
  'historical',
]);

/**
 * Calendar-time partner uniqueness. Commit order already prevents a new partner
 * while another is active, but two events can be dated in the same year in
 * either order. Keep the most trusted / most recent bond and close the others
 * at its start, so no person is simultaneously partnered twice.
 */
function repairPartnerUniqueness(world: WorldState, date: WorldDate): void {
  for (const person of Object.values(world.persons)) {
    if (person.died) continue;
    const partners = relationsFor(world, person.id).filter(
      (relation) =>
        relation.kind === 'partner' &&
        relation.end === undefined &&
        (relation.a === person.id || relation.b === person.id),
    );
    if (partners.length <= 1) continue;
    partners.sort(
      (a, b) =>
        b.trust + b.affection - (a.trust + a.affection) ||
        monthIndex(b.start) - monthIndex(a.start) ||
        a.id.localeCompare(b.id),
    );
    const keep = partners[0]!;
    const closeAt = monthIndex(keep.start) <= monthIndex(date) ? { ...keep.start } : { ...date };
    for (const relation of partners.slice(1)) {
      // Never create a negative interval. If the kept bond starts before the
      // closed one, close the old bond at least one month after it began.
      relation.end =
        monthIndex(closeAt) > monthIndex(relation.start)
          ? { ...closeAt }
          : addMonths(relation.start, 1);
    }
  }
  // Repair legacy/end-of-event dates that would make a relation end before it
  // began. This is a calendar invariant, not a narrative rewrite.
  for (const relation of Object.values(world.relations)) {
    if (relation.end && monthIndex(relation.end) < monthIndex(relation.start)) {
      relation.end = { ...relation.start };
    }
  }
  touchRelationRevision(world);
}

/**
 * A household cannot be left as a flat full of minors when the last adult dies
 * or moves out. Move each minor to a living guardian, parent, adult sibling or
 * kin relation with a real household. This is a bounded repair, not a new care
 * system: if no known adult exists, the child remains visible as an edge case.
 */
function repairMinorHouseholds(world: WorldState, date: WorldDate): void {
  // Build the adult-sibling index once. Scanning all persons for every minor
  // made the year-end repair O(households × population) on 20k-person runs.
  const adultsByParent = new Map<Id, Person[]>();
  for (const person of Object.values(world.persons)) {
    if (person.died || ageAt(person, date) < 18) continue;
    for (const parentId of person.parentIds) {
      const list = adultsByParent.get(parentId) ?? [];
      list.push(person);
      adultsByParent.set(parentId, list);
    }
  }
  for (const household of Object.values(world.households).sort((a, b) =>
    a.id.localeCompare(b.id),
  )) {
    const livingMembers = household.memberIds
      .map((id) => world.persons[id])
      .filter((person): person is Person => Boolean(person) && !person.died);
    const minors = livingMembers.filter((person) => ageAt(person, date) < 18);
    if (minors.length === 0) continue;
    const hasAdult = livingMembers.some((person) => ageAt(person, date) >= 18);
    if (hasAdult) continue;
    for (const minor of minors) {
      const candidates = new Map<Id, Person>();
      const add = (id: Id | undefined) => {
        const person = id ? world.persons[id] : undefined;
        if (person && !person.died && ageAt(person, date) >= 18) candidates.set(person.id, person);
      };
      for (const id of minor.guardianIds) add(id);
      for (const id of minor.parentIds) add(id);
      for (const relation of relationsFor(world, minor.id)) {
        if (relation.end !== undefined) continue;
        if (relation.kind !== 'kin' && relation.kind !== 'guardian') continue;
        add(relation.a === minor.id ? relation.b : relation.a);
      }
      for (const parentId of minor.parentIds) {
        for (const sibling of adultsByParent.get(parentId) ?? []) {
          if (sibling.id === minor.id) continue;
          add(sibling.id);
        }
      }
      const guardian = [...candidates.values()].sort((a, b) => a.id.localeCompare(b.id))[0];
      if (!guardian) continue;
      const target = world.households[guardian.householdId];
      if (!target) continue;
      const directGuardian =
        minor.parentIds.includes(guardian.id) || minor.guardianIds.includes(guardian.id);
      const targetLiving = livingHouseholdMemberCount(world, target.id);
      const targetCapacity = householdCapacity(world, target.id);
      if (targetLiving >= targetCapacity) {
        // The guardian's flat is full. If the child-only flat has room and the
        // guardian's household keeps another adult, move the guardian to the
        // child instead of creating a 14–16 person flat or leaving the minor
        // alone. This preserves both households' adult coverage.
        const targetOthers = target.memberIds
          .map((id) => world.persons[id])
          .filter(
            (person): person is Person =>
              Boolean(person) && person.id !== guardian.id && !person.died,
          );
        const targetHasOtherAdult = targetOthers.some((person) => ageAt(person, date) >= 18);
        const minorHouseLiving = livingHouseholdMemberCount(world, household.id);
        const minorHouseCapacity = householdCapacity(world, household.id);
        if (directGuardian && targetHasOtherAdult && minorHouseLiving < minorHouseCapacity) {
          target.memberIds = target.memberIds.filter((id) => id !== guardian.id);
          if (!household.memberIds.includes(guardian.id)) household.memberIds.push(guardian.id);
          guardian.householdId = household.id;
          guardian.locationId = household.residenceId;
          if (!household.guardianIds.includes(guardian.id)) household.guardianIds.push(guardian.id);
          if (!minor.guardianIds.includes(guardian.id)) minor.guardianIds.push(guardian.id);
          const relationId = `v4-rel-${minor.id}-${guardian.id}-guardian`;
          if (!world.relations[relationId]) {
            world.relations[relationId] = {
              id: relationId,
              a: minor.id,
              b: guardian.id,
              kind: 'guardian',
              trust: 0.45,
              affection: 0.4,
              obligation: 0.65,
              fear: 0,
              respect: 0.45,
              start: { ...date },
              sharedEventIds: [],
            };
            minor.relationshipIds.push(relationId);
            guardian.relationshipIds.push(relationId);
          }
          continue;
        }
        if (!directGuardian || targetLiving >= targetCapacity + 1) continue;
      }

      household.memberIds = household.memberIds.filter((id) => id !== minor.id);
      if (!target.memberIds.includes(minor.id)) target.memberIds.push(minor.id);
      minor.householdId = target.id;
      minor.locationId = target.residenceId;
      if (!minor.guardianIds.includes(guardian.id)) minor.guardianIds.push(guardian.id);
      if (!target.guardianIds.includes(guardian.id)) target.guardianIds.push(guardian.id);
      const relationId = `v4-rel-${minor.id}-${guardian.id}-guardian`;
      if (!world.relations[relationId]) {
        const relation: Relation = {
          id: relationId,
          a: minor.id,
          b: guardian.id,
          kind: 'guardian',
          trust: 0.45,
          affection: 0.4,
          obligation: 0.65,
          fear: 0,
          respect: 0.45,
          start: { ...date },
          sharedEventIds: [],
        };
        world.relations[relationId] = relation;
        minor.relationshipIds.push(relationId);
        guardian.relationshipIds.push(relationId);
      }
    }
  }
}

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
    scheduling: {
      candidatePool: { base: 0, composed: 0 },
      ordinary: {
        draws: { base: 0, composed: 0 },
        ratePass: { base: 0, composed: 0 },
        preparedPass: { base: 0, composed: 0 },
        selected: { base: 0, composed: 0 },
      },
      resolved: { base: 0, composed: 0 },
      blocked: { base: 0, composed: 0 },
      paths: {},
      blockedReasons: {},
      stateOpportunity: {
        candidates: 0,
        selected: 0,
        resolved: 0,
        missingRole: 0,
        noOutcome: 0,
        blocked: 0,
        crossStateCandidates: 0,
        crossStateResolved: 0,
        crossPackCandidates: 0,
        crossPackResolved: 0,
      },
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
    roleCastCache: new Map(),
    poolMultiplierCache: new Map(),
    tasks: [],
    tasksByStage: new Map(),
    materializedCount: 0,
    stateIndex: indexStateDefinitions(normalized.states ?? []),
  };
  setWorldStateIndex(draft, context.stateIndex);

  if (context.stateIndex.all.length > 0) {
    diagnostics.states = {
      active: activeStateCount(draft),
      defined: context.stateIndex.all.length,
      added: 0,
      removed: 0,
      transitions: 0,
      ticks: 0,
      reactions: 0,
      blockedAdds: 0,
      orphaned: 0,
    };
  }

  const composed = normalized.composition?.compile(draft, target);
  if (composed) diagnostics.composition = composed.stats;
  const definitions = usableDefinitions(
    composed ? [...balanceBaseRates(scenes), ...composed.scenes] : balanceBaseRates(scenes),
    diagnostics,
  ).filter((definition) => !(draft.macro && definition.tags?.includes('baseline_mortality')));
  context.definitions = definitions;
  const taskDefinitions = usableDefinitions(
    [...(options.tasks ?? []), ...(composed?.tasks ?? [])] as unknown as SceneDefinition[],
    diagnostics,
  ).filter((definition): definition is TaskDefinition => {
    const task = (definition as TaskDefinition).task;
    return Boolean(task && typeof task.domain === 'string' && Array.isArray(task.goals));
  });
  context.tasks = taskDefinitions;
  for (const task of taskDefinitions) {
    const list = context.tasksByStage.get(task.stage) ?? [];
    list.push(task);
    context.tasksByStage.set(task.stage, list);
  }
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
    processScheduledEvents(context, [...definitions, ...context.tasks], target);
    runEventYear(context, definitions, target, resolvedCounts);
  } else {
    runScenes(context, definitions, target, resolvedCounts, false);
  }
  if (normalized.stateRuntime && context.stateIndex.all.length > 0) {
    const stateStarted = Date.now();
    tickStates(context, target);
    timings.stateTicks = Date.now() - stateStarted;
  }
  runPendingMacroActions(context, target);
  if (normalized.agencyEnabled) {
    runAgencyYear(context, target, normalized.maxAgencyActorsPerYear);
    runBottomUpProcesses(context, target);
  }
  mark('events');
  reapVitalityZero(context, target);
  if (draft.macro) {
    draft.macro = advanceDevelopmentLifecycle(draft, draft.macro, target);
    const historical = advanceHistoricalProcesses(draft, draft.macro, target);
    draft.macro = historical.state;
    for (const transition of historical.transitions) {
      const development = draft.macro.developments?.[transition.developmentId];
      const process = development?.historical;
      if (!process) continue;
      const livingParticipants = Object.entries(process.participants)
        .filter(([id]) => draft.persons[id] && !draft.persons[id]!.died)
        .sort((a, b) => b[1].influence - a[1].influence)
        .slice(0, 8);
      const actorId =
        transition.actorId &&
        draft.persons[transition.actorId] &&
        !draft.persons[transition.actorId]!.died
          ? transition.actorId
          : livingParticipants[0]?.[0];
      if (!actorId) continue;
      const phaseEvent = commitEvent(
        context,
        {
          date: { ...target },
          placeId: draft.persons[actorId]!.locationId,
          subjectId: actorId,
          participants: livingParticipants.map(([personId]) => ({
            personId,
            role: 'historical_participant',
          })),
          action: 'historical_phase',
          title: '历史进程转折',
          causes: transition.causeEventId ? [transition.causeEventId] : [],
          effects: livingParticipants.map(([personId]) => ({
            type: 'knowledge' as const,
            holderId: personId,
            proposition: `我亲历或知晓「${development.description.slice(0, 80)}」进入${transition.to}阶段。`,
            confidence: 0.8,
            sourceKind: 'witnessed' as const,
            visibility: 'shared' as const,
            trueInWorld: true,
          })),
          immediateText: transition.note,
          significance: 0.9,
          visibility: 'public',
          provenance: { kind: 'system', sourceId: transition.processId },
        },
        { roleIds: {}, fundingOrganizationIds: [] },
        true,
      );
      if (phaseEvent) {
        const currentProcess = draft.macro.developments?.[transition.developmentId]?.historical;
        if (currentProcess) {
          currentProcess.lastEventId = phaseEvent.id;
          const lastTurn = currentProcess.history[currentProcess.history.length - 1];
          if (lastTurn && lastTurn.eventId === transition.causeEventId)
            lastTurn.eventId = phaseEvent.id;
        }
      }
    }
    draft.macro = refreshNamedPopulation(draft.macro, draft);
  }
  // Low-frequency historical review: records which reference candidates have a
  // committed analogue, and which do not. It never resets the timeline.
  if (draft.macro && target.year % 5 === 0) {
    const review = reviewHistoricalWorld(draft, target.year - 4, target.year);
    draft.macro.historyReview = review;
    draft.macro.historyReviews = [...(draft.macro.historyReviews ?? []), review].slice(-12);
  }
  draft.date = target;

  diagnostics.personsConsidered = Object.keys(draft.persons).filter(
    (id) => Boolean(draft.persons[id]) && !draft.persons[id]!.died,
  ).length;
  diagnostics.sceneInstancesCreated = context.newScenes.length;
  diagnostics.scenesResolved = context.newScenes.filter((s) => s.status === 'resolved').length;
  diagnostics.scenesBlocked = context.newScenes.filter((s) => s.status === 'blocked').length;
  diagnostics.eventsCreated = context.newEvents.length;
  const repairStarted = Date.now();
  repairPartnerUniqueness(draft, target);
  repairMinorHouseholds(draft, target);
  timings.repairs = Date.now() - repairStarted;

  assertWorldV4(draft);
  timings.assert = Date.now() - phaseStarted;
  timings.total = Date.now() - startedAt;
  timings.stateReactions = context.stateReactionMs ?? 0;
  diagnostics.timings = timings;

  return {
    world: draft,
    events: context.newEvents,
    scenes: context.newScenes,
    diagnostics,
  };
}

export type V4CandidatePoolAudit = {
  personId: Id;
  date: WorldDate;
  stage: SceneStage;
  goal?: string;
  events: {
    id: string;
    title: string;
    familyId?: string;
    outcomeCount: number;
    conditionalOutcomeCount: number;
  }[];
  tasks: {
    id: string;
    title: string;
    score: number;
    domain: string;
    conditionalOutcomeCount: number;
  }[];
  eventCount: number;
  taskCount: number;
};

/**
 * Read-only feasibility audit for content coverage and Phase 8 acceptance.
 * It uses the same eligibility, casting and outcome filters as the engine, but
 * never commits an event or mutates the world.
 */
export function auditCandidatePools(
  world: WorldState,
  personId: Id,
  date: WorldDate,
  scenes: SceneDefinition[],
  tasks: TaskDefinition[] = [],
  composition?: CompositionSource,
  states: StateDefinition[] = [],
): V4CandidatePoolAudit | undefined {
  const person = world.persons[personId];
  if (!person || person.died) return undefined;
  const from = { ...date };
  const diagnostics: V4AdvanceDiagnostics = {
    from,
    to: from,
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
    scheduling: {
      candidatePool: { base: 0, composed: 0 },
      ordinary: {
        draws: { base: 0, composed: 0 },
        ratePass: { base: 0, composed: 0 },
        preparedPass: { base: 0, composed: 0 },
        selected: { base: 0, composed: 0 },
      },
      resolved: { base: 0, composed: 0 },
      blocked: { base: 0, composed: 0 },
      paths: {},
      blockedReasons: {},
      stateOpportunity: {
        candidates: 0,
        selected: 0,
        resolved: 0,
        missingRole: 0,
        noOutcome: 0,
        blocked: 0,
        crossStateCandidates: 0,
        crossStateResolved: 0,
        crossPackCandidates: 0,
        crossPackResolved: 0,
      },
    },
    warnings: [],
  };
  const composed = composition?.compile(world, date);
  if (composed) {
    for (const error of composed.errors.slice(0, 20)) {
      warn(
        diagnostics,
        'composition_effect_unresolved',
        `${error.kernelId}/${error.outcomeId} ${error.effectType}: ${error.reason}`,
        { sceneId: error.kernelId },
      );
    }
  }
  const definitions = usableDefinitions(
    composed ? [...balanceBaseRates(scenes), ...composed.scenes] : balanceBaseRates(scenes),
    diagnostics,
  );
  const allTasks = [...tasks, ...(composed?.tasks ?? [])];
  const context: EngineContext = {
    world,
    target: date,
    options: normalizeOptions({
      eventRuntime: true,
      agency: true,
      tasks,
      materializePopulation: false,
    }),
    diagnostics,
    newEvents: [],
    newScenes: [],
    nextSceneOrdinal: 0,
    sceneHistory: resolvedSceneHistory(world),
    definitions,
    triggerIndex: new Map(),
    roleCastCache: new Map(),
    poolMultiplierCache: new Map(),
    tasks: allTasks,
    tasksByStage: new Map(),
    materializedCount: 0,
    stateIndex: indexStateDefinitions(states),
  };
  for (const task of allTasks) {
    const list = context.tasksByStage.get(task.stage) ?? [];
    list.push(task);
    context.tasksByStage.set(task.stage, list);
  }
  const eventPool: V4CandidatePoolAudit['events'] = [];
  setWorldStateIndex(world, context.stateIndex);
  for (const definition of definitions) {
    if (!sceneEligible(context, definition, person, date)) continue;
    const cast = castSceneRoles(context, definition, person, date);
    if (cast.missing.length > 0) continue;
    const selection = selectOutcome(context, definition, person, cast.roles, date);
    if (!selection) continue;
    const eligibleOutcomes = (definition.outcomes ?? []).filter((outcome) =>
      eligibleOutcome(world, person, outcome, date),
    );
    eventPool.push({
      id: definition.id,
      title: definition.title,
      familyId: definition.familyId,
      outcomeCount: eligibleOutcomes.length,
      conditionalOutcomeCount: eligibleOutcomes.filter(
        (outcome) => (outcome.conditions?.length ?? 0) > 0,
      ).length,
    });
  }
  const taskPool: V4CandidatePoolAudit['tasks'] = [];
  for (const definition of context.tasksByStage.get(stageForAge(ageAt(person, date))) ?? []) {
    if (!sceneEligible(context, definition, person, date)) continue;
    const score = taskUtility(world, person, definition, date);
    if (score <= 0.1) continue;
    const cast = castSceneRoles(context, definition, person, date);
    if (cast.missing.length > 0) continue;
    const selection = selectOutcome(context, definition, person, cast.roles, date);
    if (!selection) continue;
    const eligibleTaskOutcomes = (definition.outcomes ?? []).filter((outcome) =>
      eligibleOutcome(world, person, outcome, date),
    );
    taskPool.push({
      id: definition.id,
      title: definition.title,
      score: Number(score.toFixed(3)),
      domain: definition.task.domain,
      conditionalOutcomeCount: eligibleTaskOutcomes.filter(
        (outcome) => (outcome.conditions?.length ?? 0) > 0,
      ).length,
    });
  }
  taskPool.sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
  return {
    personId,
    date: { ...date },
    stage: stageForAge(ageAt(person, date)),
    goal: person.agency?.goal,
    events: eventPool,
    tasks: taskPool,
    eventCount: eventPool.length,
    taskCount: taskPool.length,
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
    agencyEnabled: options.agency === true,
    maxAgencyActorsPerYear:
      typeof options.maxAgencyActorsPerYear === 'number' &&
      Number.isFinite(options.maxAgencyActorsPerYear)
        ? Math.max(0, Math.min(400, Math.floor(options.maxAgencyActorsPerYear)))
        : 96,
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
    composition: options.composition,
    states: options.states,
    stateRuntime: options.stateRuntime !== false,
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

function definitionSource(definition: { id: string; packId?: string }): 'base' | 'composed' {
  return definition.packId === 'composition' || definition.id.includes('::') ? 'composed' : 'base';
}

function touchRelationRevision(world: WorldState): void {
  world.historyMeta.relationRevision = (world.historyMeta.relationRevision ?? 0) + 1;
}

/**
 * One use per content family, not per compiled context variant. Without this,
 * the same kernel can resolve twice in a person-year through two contexts
 * (for example a school registration at home and at the hospital) and repeat
 * the same life decision.
 */
function sceneUseKey(definition: SceneDefinition): string {
  return definition.familyId ?? definition.id;
}

const CAPABILITY_TAGS: Record<string, string[]> = {
  literacy: ['education', 'school'],
  numeracy: ['work', 'market'],
  social_insight: ['social', 'family'],
  craft_affinity: ['craft', 'work', 'apprentice'],
  frail_body: ['health', 'infancy', 'care'],
  craft: ['work', 'apprentice'],
  social: ['social', 'family'],
  health: ['health', 'infancy'],
};

function bumpRecord(record: Record<string, number>, key: string): void {
  record[key] = (record[key] ?? 0) + 1;
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

function hashId(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function fastUnit(
  definitionSeed: number,
  personSeed: number,
  year: number,
  month: number,
  salt: number,
): number {
  let hash = definitionSeed ^ personSeed;
  hash ^= Math.imul(year, 0x9e3779b1);
  hash ^= Math.imul(month + 1, 0x85ebca6b);
  hash ^= Math.imul(salt + 1, 0xc2b2ae35);
  hash = Math.imul(hash ^ (hash >>> 16), 0x7feb352d);
  hash = Math.imul(hash ^ (hash >>> 15), 0x846ca68b);
  return ((hash ^ (hash >>> 16)) >>> 0) / 4294967296;
}

function sameDate(a: WorldDate, b: WorldDate): boolean {
  return a.year === b.year && a.month === b.month;
}

function aliveAt(person: Person, date: WorldDate): boolean {
  if (!person.died) return true;
  return monthIndex(person.died) > monthIndex(date);
}

const MAX_BASE_NON_ONCE_RATE = 0.12;

/**
 * High-rate legacy scenes were authored when the library was small. A 0.35–0.55
 * rate on a repeatable scene can drown every composed recipe for the same
 * person. Cap repeatable base scenes; once-per-person milestones keep their
 * authored rate because they cannot repeat.
 */
const BALANCED_PACKS = ['vienna-', 'generated-', 'major-', 'p9-', 'p10-', 'phase'];

function balanceBaseRates(definitions: SceneDefinition[]): SceneDefinition[] {
  return definitions.map((definition) => {
    if (
      definition.packId === 'composition' ||
      definition.oncePerPerson === true ||
      definition.tags?.includes('lifecycle') ||
      !BALANCED_PACKS.some((prefix) => definition.packId.startsWith(prefix))
    ) {
      return definition;
    }
    const rate = definition.rate;
    if (typeof rate !== 'number' || rate <= MAX_BASE_NON_ONCE_RATE || rate >= 1) {
      return definition;
    }
    return { ...definition, rate: MAX_BASE_NON_ONCE_RATE };
  });
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
    case 'skill': {
      const value = subject.life?.skills?.[condition.skill] ?? 0;
      if (typeof condition.min === 'number' && value < condition.min) return false;
      if (typeof condition.max === 'number' && value > condition.max) return false;
      return true;
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
    case 'legacy': {
      const regionId = regionIdForPerson(world, subject);
      return Object.values(world.macro?.legacy ?? {}).some((legacy) => {
        if (legacy.status !== 'active') return false;
        if (condition.sameRegion !== false && legacy.regionId !== regionId) return false;
        if (condition.id !== undefined && legacy.id !== condition.id) return false;
        if (condition.legacyKind !== undefined && legacy.kind !== condition.legacyKind)
          return false;
        if (condition.tag !== undefined && !legacy.tags.includes(condition.tag)) return false;
        return true;
      });
    }
    case 'historicalProcess': {
      const process = world.macro?.developments;
      if (!process) return false;
      const regionId = regionIdForPerson(world, subject);
      return Object.values(process).some((development) => {
        const historical = development.historical;
        if (!historical) return false;
        if (condition.id !== undefined && development.id !== condition.id) return false;
        if (condition.processKind !== undefined && historical.kind !== condition.processKind)
          return false;
        if (condition.phases && !condition.phases.includes(historical.phase)) return false;
        if (condition.sameRegion !== false && !historical.regionIds.includes(regionId))
          return false;
        if (condition.roles || condition.minInfluence !== undefined) {
          const participation = historical.participants[subject.id];
          if (!participation) return false;
          if (
            condition.roles &&
            !condition.roles.some((role) => participation.roles.includes(role))
          )
            return false;
          if (
            condition.minInfluence !== undefined &&
            participation.influence < condition.minInfluence
          )
            return false;
        }
        return true;
      });
    }
    case 'history':
      return (() => {
        const matches = historyEntriesMatching(world, subject.id, condition, date);
        const minCount =
          condition.minCount ??
          (condition.maxCount !== undefined && condition.maxCount <= 0 ? 0 : 1);
        const maxCount = condition.maxCount ?? Number.POSITIVE_INFINITY;
        return matches.length >= minCount && matches.length <= maxCount;
      })();
    case 'knowledge': {
      const needle = condition.propositionIncludes?.trim().toLowerCase();
      const minConfidence = condition.minConfidence ?? 0;
      return subject.knowledgeIds.some((id) => {
        const knowledge = world.knowledge[id];
        if (!knowledge || knowledge.holderId !== subject.id) return false;
        if (knowledge.confidence < minConfidence) return false;
        if (!needle) return true;
        return knowledge.proposition.toLowerCase().includes(needle);
      });
    }
    case 'project':
      return Object.values(world.projects).some((project) => {
        if (project.ownerId !== subject.id) {
          if (!project.participants.some((participant) => participant.personId === subject.id)) {
            return false;
          }
        }
        if (condition.projectKind !== undefined && project.kind !== condition.projectKind)
          return false;
        if (condition.state !== undefined && project.state !== condition.state) return false;
        if (condition.minStage !== undefined && project.stage < condition.minStage) return false;
        return true;
      });
    case 'relationHistory':
      return relationsFor(world, subject.id).some((relation) => {
        if (relation.end !== undefined) return false;
        if (condition.relationKind && relation.kind !== condition.relationKind) return false;
        if (
          condition.minSharedEvents !== undefined &&
          relation.sharedEventIds.length < condition.minSharedEvents
        ) {
          return false;
        }
        if (condition.minTrust !== undefined && relation.trust < condition.minTrust) return false;
        if (condition.minYears !== undefined) {
          const months = monthIndex(date) - monthIndex(relation.start);
          if (months < condition.minYears * 12) return false;
        }
        if (condition.partnerSex) {
          const otherId = relation.a === subject.id ? relation.b : relation.a;
          if (world.persons[otherId]?.sex !== condition.partnerSex) return false;
        }
        return true;
      });
    case 'hasFlag':
      return subject.life?.flags.includes(condition.flag) === true;
    case 'attribute': {
      const value = resolveAttribute(subject, condition.attribute);
      if (typeof condition.min === 'number' && value < condition.min) return false;
      if (typeof condition.max === 'number' && value > condition.max) return false;
      return true;
    }
    case 'position':
      return Object.values(world.positions).some(
        (position) =>
          position.holderId === subject.id &&
          position.end === undefined &&
          (!condition.organizationId || position.organizationId === condition.organizationId) &&
          (!condition.titleIncludes ||
            position.title.toLowerCase().includes(condition.titleIncludes.toLowerCase())) &&
          (!condition.authority || position.authority.includes(condition.authority)),
      );
    case 'hasState': {
      const ownerType = condition.owner ?? 'person';
      const ownerId =
        ownerType === 'person'
          ? subject.id
          : ownerType === 'household'
            ? subject.householdId
            : ownerType === 'organization'
              ? (subject.employment?.organizationId ?? '')
              : ownerType === 'place'
                ? subject.locationId
                : ownerType === 'region'
                  ? (regionIdForPerson(world, subject) ?? '')
                  : ownerType === 'world'
                    ? world.id
                    : '';
      if (!ownerId) return false;
      const matchingStates = activeStates(
        world,
        ownerType,
        ownerId,
        condition.tag,
        stateIndexForWorld(world),
        date,
      ).filter((instance) => !condition.stateId || instance.definitionId === condition.stateId);
      if (matchingStates.length < (condition.minCount ?? 1)) return false;
      if (condition.parameter) {
        const values = matchingStates
          .map((instance) => instance.parameters[condition.parameter!])
          .filter((value): value is number | string | boolean => value !== undefined);
        if (values.length === 0) return false;
        const numeric = values.filter((value): value is number => typeof value === 'number');
        if (condition.min !== undefined && !numeric.some((value) => value >= condition.min!))
          return false;
        if (condition.max !== undefined && !numeric.some((value) => value <= condition.max!))
          return false;
        if (condition.equals !== undefined && !values.includes(condition.equals)) return false;
      }
      return true;
    }
    case 'notHasState': {
      const ownerType = condition.owner ?? 'person';
      const ownerId =
        ownerType === 'person'
          ? subject.id
          : ownerType === 'household'
            ? subject.householdId
            : ownerType === 'organization'
              ? (subject.employment?.organizationId ?? '')
              : ownerType === 'place'
                ? subject.locationId
                : ownerType === 'region'
                  ? (regionIdForPerson(world, subject) ?? '')
                  : ownerType === 'world'
                    ? world.id
                    : '';
      if (!ownerId) return true;
      const matches = activeStates(
        world,
        ownerType,
        ownerId,
        condition.tag,
        stateIndexForWorld(world),
        date,
      ).filter((instance) => !condition.stateId || instance.definitionId === condition.stateId);
      return matches.length === 0;
    }
    case 'hasRelationWith':
      return relationsFor(world, subject.id).some((relation) => {
        if (relation.end !== undefined) return false;
        if (relation.a !== subject.id && relation.b !== subject.id) return false;
        const otherId = relation.a === subject.id ? relation.b : relation.a;
        if (otherId !== condition.personId) return false;
        if (condition.relationKind && relation.kind !== condition.relationKind) return false;
        if (condition.minTrust !== undefined && relation.trust < condition.minTrust) return false;
        return true;
      });
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
        if (condition.partnerSex && world.persons[otherId]!.sex !== condition.partnerSex) {
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
    case 'region':
      return (
        Array.isArray(condition.in) && condition.in.includes(regionIdForPerson(world, subject))
      );
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
  if (requirement.kind === 'historical') {
    // A historical person cannot contact themselves through a task that names
    // their own stable identity.
    if (person.id === subject.id) return false;
    if (
      requirement.historicalId !== undefined &&
      person.historicalIdentity?.id !== requirement.historicalId
    ) {
      return false;
    }
  }
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
  const revision = world.historyMeta.organizationRevision ?? 0;
  let cached = worldOrganizationIndexes.get(world);
  if (!cached || cached.revision !== revision) {
    const byPerson = new Map<Id, Organization[]>();
    for (const organization of Object.values(world.organizations)) {
      const add = (personId: Id | undefined) => {
        if (!personId) return;
        const list = byPerson.get(personId) ?? [];
        if (!list.some((candidate) => candidate.id === organization.id)) list.push(organization);
        byPerson.set(personId, list);
      };
      for (const memberId of organization.memberIds) add(memberId);
      for (const positionId of organization.positions) add(world.positions[positionId]?.holderId);
    }
    for (const list of byPerson.values()) list.sort((a, b) => a.id.localeCompare(b.id));
    cached = { revision, byPerson };
    worldOrganizationIndexes.set(world, cached);
  }
  const base = cached.byPerson.get(person.id) ?? [];
  if (!person.employment) return base;
  const employer = world.organizations[person.employment.organizationId];
  if (!employer || base.some((candidate) => candidate.id === employer.id)) return base;
  return [...base, employer].sort((a, b) => a.id.localeCompare(b.id));
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

type PeopleIndex = {
  world: WorldState;
  all: Id[];
  byRole: Map<string, Id[]>;
  employed: Id[];
  byEmployer: Map<Id, Id[]>;
  byResidence: Map<Id, Id[]>;
  byLocation: Map<Id, Id[]>;
  byParent: Map<Id, Id[]>;
  bySex: Map<Person['sex'], Id[]>;
  teachers: Id[];
  officials: Id[];
  historical: Id[];
  unionMembers: Id[];
  organizationsByKind: Map<string, Id[]>;
  organizations: Id[];
};

function appendIndex(map: Map<string, Id[]>, key: string, id: Id): void {
  const list = map.get(key);
  if (list) list.push(id);
  else map.set(key, [id]);
}

function indexPerson(index: PeopleIndex, person: Person): void {
  index.all.push(person.id);
  for (const role of person.roles) appendIndex(index.byRole, role, person.id);
  if (person.employment) {
    index.employed.push(person.id);
    appendIndex(index.byEmployer, person.employment.organizationId, person.id);
  }
  appendIndex(index.byResidence, person.householdId, person.id);
  appendIndex(index.byLocation, person.locationId, person.id);
  for (const parentId of person.parentIds) appendIndex(index.byParent, parentId, person.id);
  appendIndex(index.bySex, person.sex, person.id);
  if (person.roles.includes('teacher')) index.teachers.push(person.id);
  if (person.roles.includes('official')) index.officials.push(person.id);
  if (person.historicalIdentity) index.historical.push(person.id);
  if (person.roles.includes('union_member')) index.unionMembers.push(person.id);
}

function buildPeopleIndex(world: WorldState): PeopleIndex {
  const index: PeopleIndex = {
    world,
    all: [],
    byRole: new Map(),
    employed: [],
    byEmployer: new Map(),
    byResidence: new Map(),
    byLocation: new Map(),
    byParent: new Map(),
    bySex: new Map(),
    teachers: [],
    officials: [],
    historical: [],
    unionMembers: [],
    organizationsByKind: new Map(),
    organizations: Object.keys(world.organizations).sort(),
  };
  const people = Object.values(world.persons).sort((a, b) => a.id.localeCompare(b.id));
  for (const person of people) indexPerson(index, person);
  for (const id of index.organizations) {
    const organization = world.organizations[id]!;
    appendIndex(index.organizationsByKind, organization.kind, id);
  }
  return index;
}

function peopleIndexFor(context: EngineContext): PeopleIndex {
  if (context.peopleIndex?.world === context.world) return context.peopleIndex;
  context.peopleIndex = buildPeopleIndex(context.world);
  return context.peopleIndex;
}

function registerIndexedPerson(context: EngineContext, person: Person): void {
  if (context.peopleIndex?.world !== context.world) return;
  indexPerson(context.peopleIndex, person);
}

function sampleIds(ids: Id[], limit: number, rng: () => number): Id[] {
  if (ids.length <= limit) return ids;
  const start = Math.floor(rng() * ids.length) % ids.length;
  const result: Id[] = [];
  for (let i = 0; i < limit; i += 1) result.push(ids[(start + i) % ids.length]!);
  return result.sort();
}

function mergeIds(...lists: (Id[] | undefined)[]): Id[] {
  const seen = new Set<Id>();
  const result: Id[] = [];
  for (const list of lists) {
    for (const id of list ?? []) {
      if (seen.has(id)) continue;
      seen.add(id);
      result.push(id);
    }
  }
  return result;
}

/**
 * Merge role pools without walking a 20k-person location list for every cast.
 * Each source contributes at most `limit` sampled ids; dedupe happens after.
 */
function sampleMergeIds(lists: (Id[] | undefined)[], limit: number, rng: () => number): Id[] {
  const seen = new Set<Id>();
  const result: Id[] = [];
  for (const list of lists) {
    if (!list || list.length === 0) continue;
    const sampled = list.length <= limit ? list : sampleIds(list, limit, rng);
    for (const id of sampled) {
      if (seen.has(id)) continue;
      seen.add(id);
      result.push(id);
    }
  }
  return result.sort();
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
  context: EngineContext,
  subject: Person,
  requirement: SceneDefinition['roles'][number],
  allowNewPartner = false,
): Id[] {
  if (requirement.kind === 'subject') return [subject.id];
  const world = context.world;
  const index = peopleIndexFor(context);
  const organizations = index.organizations;
  const candidates = new Set<Id>();
  const sampleRng = seededRng(
    world.seed,
    'role-pool',
    subject.id,
    requirement.key,
    requirement.kind,
    context.target.year,
    context.target.month,
  );
  const sample = (ids: Id[]): Id[] => sampleIds(ids, 48, sampleRng);

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
    case 'sibling': {
      const siblings = mergeIds(
        ...subject.parentIds.map((parentId) => index.byParent.get(parentId)),
      );
      for (const id of siblings) if (id !== subject.id) candidates.add(id);
      break;
    }
    case 'child': {
      for (const id of index.byParent.get(subject.id) ?? []) {
        if (id !== subject.id) candidates.add(id);
      }
      break;
    }
    case 'partner': {
      const existing = relationsFor(world, subject.id).find(
        (relation) =>
          relation.kind === 'partner' &&
          relation.end === undefined &&
          (relation.a === subject.id || relation.b === subject.id),
      );
      const existingId = existing
        ? existing.a === subject.id
          ? existing.b
          : existing.a
        : undefined;
      if (existingId && existingId !== subject.id) {
        candidates.add(existingId);
        break;
      }
      if (!allowNewPartner || requirement.sameHousehold === true) break;
      const check = (ids: Id[]): void => {
        for (const id of ids) {
          if (id === subject.id) continue;
          const person = world.persons[id]!;
          if (person.died) continue;
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
          if (partneredWithSubject) continue;
          const partneredWithAnother = personRelations.some(
            (relation) =>
              relation.kind === 'partner' &&
              relation.end === undefined &&
              ((relation.a === id && relation.b !== subject.id) ||
                (relation.b === id && relation.a !== subject.id)),
          );
          if (partneredWithAnother) continue;
          if (
            person.householdId === subject.householdId &&
            requirement.sameHousehold !== true &&
            !partneredWithSubject
          ) {
            continue;
          }
          candidates.add(id);
        }
      };
      check(sample(index.all));
      if (candidates.size === 0) check(index.all);
      break;
    }
    case 'teacher': {
      const schools = index.organizationsByKind.get('school') ?? [];
      for (const id of mergeIds(
        index.teachers,
        ...schools.map((school) => index.byEmployer.get(school)),
      )) {
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
    }
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
      // relation yet. Fall back to the open pool: first the explicitly required
      // organization kind, then any active employer. Without this, an
      // employment effect authored against an optional `$employer` token
      // silently failed while the scene's cash/flag effects still committed.
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
      if (candidates.size === 0) {
        for (const id of organizations) {
          const organization = world.organizations[id]!;
          if (organization.status === 'active') candidates.add(id);
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
      const pool = employer
        ? [...employer.memberIds].sort()
        : sampleMergeIds([index.employed, index.byRole.get('worker')], 48, sampleRng);
      for (const id of pool) {
        if (id === subject.id) continue;
        const person = world.persons[id];
        if (!person) continue;
        if (person.roles.includes('worker') || person.employment) candidates.add(id);
      }
      break;
    }
    case 'union_member': {
      const unionOrganizations = new Set(index.organizationsByKind.get('union') ?? []);
      for (const id of sampleMergeIds(
        [
          index.unionMembers,
          ...Array.from(unionOrganizations).map((unionId) => index.byEmployer.get(unionId)),
        ],
        48,
        sampleRng,
      )) {
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
      const samePlace = sampleMergeIds(
        [
          index.byResidence.get(subject.householdId),
          index.byLocation.get(subject.locationId),
          index.byRole.get('neighbor'),
        ],
        48,
        sampleRng,
      );
      for (const id of samePlace) {
        if (id === subject.id) continue;
        const person = world.persons[id]!;
        if (person.died) continue;
        candidates.add(id);
      }
      break;
    }
    case 'historical':
      for (const id of index.historical) {
        if (id === subject.id) continue;
        const person = world.persons[id]!;
        if (!historicalPersonAvailable(person, world.date)) continue;
        if (
          requirement.historicalId !== undefined &&
          person.historicalIdentity?.id !== requirement.historicalId
        )
          continue;
        candidates.add(id);
      }
      break;
    case 'official': {
      const stateOrgs = index.organizationsByKind.get('state') ?? [];
      for (const id of sampleMergeIds(
        [index.officials, ...stateOrgs.map((orgId) => index.byEmployer.get(orgId))],
        48,
        sampleRng,
      )) {
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
    }
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
  registerIndexedPerson(context, person);
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
  preferredRoles?: Map<string, Id>,
): CastResult {
  const world = context.world;
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
    const roleKey = [
      definition.tags.includes('development') || definition.tags.includes('social_movement')
        ? definition.id
        : '',
      requirement.key,
      requirement.kind,
      requirement.minAge ?? '',
      requirement.maxAge ?? '',
      requirement.sex ?? '',
      requirement.sameHousehold ? 'same-household' : '',
      requirement.samePlaceKind ?? '',
      requirement.occupation ?? '',
      requirement.organizationKind ?? '',
      requirement.historicalId ?? '',
      requirement.sharedHistoryTag ?? '',
      subject.locationId,
      requirement.sameHousehold ? subject.householdId : '',
      subject.employment?.organizationId ?? '',
      requirement.kind === 'parent' ||
      requirement.kind === 'guardian' ||
      requirement.kind === 'sibling' ||
      requirement.kind === 'partner' ||
      requirement.kind === 'subject'
        ? subject.id
        : '',
    ].join('|');
    let candidates = context.roleCastCache.get(roleKey);
    if (!candidates) {
      const allowNewPartner =
        requirement.kind === 'partner' &&
        (definition.tags.includes('courtship') ||
          definition.tags.includes('marriage') ||
          definition.tags.includes('wedding') ||
          definition.id.includes('courtship') ||
          definition.id.includes('family-formation') ||
          definition.id.includes('same-sex'));
      candidates = roleCandidates(context, subject, requirement, allowNewPartner).filter((id) =>
        candidateFits(context.world, subject, id, requirement, date),
      );
      context.roleCastCache.set(roleKey, candidates);
    }
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
    let linkedHistory: Set<Id> | undefined;
    if (requirement.sharedHistoryTag) {
      const linked = historyPeopleForTag(world, subject.id, requirement.sharedHistoryTag);
      linkedHistory = linked;
      // Reunions are not limited to people who still hold the old occupational
      // role. Start from the actual shared history, then apply the normal age,
      // sex and place constraints.
      candidates = [...linked].filter(
        (id) => world.persons[id] && candidateFits(world, subject, id, requirement, date),
      );
      if (candidates.length === 0) {
        if (required) missing.push(requirement.key);
        continue;
      }
    }
    const unused = candidates.filter((id) => !usedPeople.has(id) || requirement.kind === 'subject');
    // Never reuse a named person for two person-roles in one incident.
    let pool = unused;
    // A follow-up explicitly continues a prior incident: keep the same partner,
    // foreman, mentor or rival when that person still fits the role. Random
    // re-casting made years-later consequences read like meetings with strangers.
    const preferredId =
      requirement.kind === 'subject' ? undefined : preferredRoles?.get(requirement.key);
    if (
      preferredId &&
      preferredId !== subject.id &&
      (!linkedHistory || linkedHistory.has(preferredId))
    ) {
      const preferredPerson = world.persons[preferredId];
      if (
        preferredPerson &&
        !preferredPerson.died &&
        candidateFits(world, subject, preferredId, requirement, date)
      ) {
        pool = [preferredId, ...pool.filter((id) => id !== preferredId)];
      }
    }
    if (pool.length === 0) {
      if (required && !requirement.sharedHistoryTag) {
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
    const selected =
      preferredId && pool[0] === preferredId
        ? preferredId
        : pool[Math.min(pool.length - 1, Math.floor(rng() * pool.length))]!;
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

  // An optional role that was not cast cannot be named in the prose. Filter
  // such outcomes instead of committing a literal `{neighbor}` token.
  outcomes = outcomes.filter((outcome) => !outcomeReferencesMissingRole(outcome, roles));
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

  if (definition.check) {
    const adaptive = adaptiveTotalsFor(context, definition, subject, date);
    const effectiveCheck =
      adaptive.checkBonus === 0
        ? definition.check
        : { ...definition.check, dc: definition.check.dc - adaptive.checkBonus };
    const result = resolveCheck(
      context.world,
      subject,
      effectiveCheck,
      context.stateIndex,
      seededRng(context.world.seed, 'check', definition.id, subject.id, date.year, date.month),
      (tag) => countHistoryTag(context.world, subject.id, tag, date),
      date,
    );
    const band = checkBand(result);
    const byId = new Map(outcomes.map((outcome) => [outcome.id, outcome]));
    const candidateIds =
      band === 'critical_success'
        ? [
            ...(definition.check.criticalSuccessOutcomeIds ?? []),
            ...definition.check.successOutcomeIds,
          ]
        : band === 'critical_failure'
          ? [
              ...(definition.check.criticalFailureOutcomeIds ?? []),
              ...definition.check.failureOutcomeIds,
            ]
          : band === 'success'
            ? definition.check.successOutcomeIds
            : definition.check.failureOutcomeIds;
    const selected = candidateIds
      .map((id) => byId.get(id))
      .find((outcome) => outcome !== undefined);
    if (selected) {
      return {
        outcome: selected,
        choice,
        reason: `check:${result.die}${result.modifier >= 0 ? '+' : ''}${result.modifier}=${result.total} vs ${result.dc} (${band})`,
        check: {
          die: result.die,
          modifier: result.modifier,
          total: result.total,
          dc: result.dc,
          band,
          ...(result.breakdown.blockedBy ? { blockedBy: result.breakdown.blockedBy } : {}),
          breakdown: result.breakdown,
        },
      };
    }
    warnContext(
      context,
      'check_outcome_missing',
      `no eligible outcome for ${band} in ${definition.id}`,
      { personId: subject.id, sceneId: definition.id },
    );
  }

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
  const mainText = interpolateSceneText(outcome.immediateText, context.world, subject, roles, date);
  // Decisive outcomes keep the authored causal text; atmospheric variants are
  // for ordinary texture, not for replacing the one paragraph that must carry
  // the consequence.
  if ((outcome.significance ?? 0) >= 0.7) return mainText;
  const minimumVariantLength = Math.max(70, Math.floor(mainText.length * 0.72));
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
    .filter(
      (entry) =>
        !/\{[a-zA-Z_][a-zA-Z0-9_]*\}/.test(entry.text) && entry.text.length >= minimumVariantLength,
    );
  if (variants.length === 0) return mainText;
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
const BUILTIN_TEXT_TOKENS = new Set([
  'subject',
  'place',
  'residence',
  'school',
  'workplace',
  'age',
  'year',
  'household',
  'child',
  'subjectPronoun',
]);

function textReferencesMissingRole(text: string, roles: Record<Id, Id>): boolean {
  for (const match of text.matchAll(/\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g)) {
    const key = match[1]!;
    if (BUILTIN_TEXT_TOKENS.has(key)) continue;
    if (roles[key] === undefined) return true;
  }
  return false;
}

function outcomeReferencesMissingRole(outcome: SceneOutcome, roles: Record<Id, Id>): boolean {
  return textReferencesMissingRole(outcome.immediateText, roles);
}

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
    subjectPronoun: subject.sex === 'female' ? '她' : subject.sex === 'male' ? '他' : '其',
    place: world.places[subject.locationId]?.name,
    residence: residence ? world.places[residence]?.name : undefined,
    school: subject.education.placeId
      ? world.places[subject.education.placeId]?.name
      : Object.values(world.places).find((place) => place.kind === 'school')?.name,
    workplace: subject.employment
      ? (world.places[subject.employment.workplaceId]?.name ??
        world.places[subject.locationId]?.name)
      : undefined,
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

function cachedStateModifiers(
  context: EngineContext,
  subject: Person,
  date: WorldDate,
): StateModifier[] {
  const key = `${context.world.historyMeta.stateRevision ?? 0}:${
    context.world.historyMeta.organizationRevision ?? 0
  }:${date.year}:${date.month}`;
  const cache = (context.stateModifierCache ??= new Map());
  const cached = cache.get(subject.id);
  if (cached?.key === key) return cached.modifiers;
  const modifiers = stateContextForPerson(
    context.world,
    subject,
    context.stateIndex,
    date,
  ).flatMap((entry) => entry.definition.modifiers ?? []);
  cache.set(subject.id, { key, modifiers });
  return modifiers;
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
  if (capability && CAPABILITY_TAGS[capability]?.some((tag) => definition.tags.includes(tag)))
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
  const poolKey = `${definition.familyId ?? definition.id}|${regionId}`;
  let pool = context?.poolMultiplierCache?.get(poolKey);
  if (pool === undefined) {
    pool = eventPoolMultiplier(context?.world?.macro, definition, regionId);
    context?.poolMultiplierCache?.set(poolKey, pool);
  }
  if (pool <= 0) return 0;
  let stateMultiplier = 1;
  if (context) {
    const familyId = definition.familyId;
    const modifiers = cachedStateModifiers(context, subject, _date);
    for (const modifier of modifiers) {
      if (modifier.kind !== 'scene_weight') continue;
      const tagMatches =
        (modifier.tags?.length ?? 0) > 0 &&
        modifier.tags!.some((tag) => definition.tags.includes(tag));
      const familyMatches =
        Boolean(familyId) &&
        (modifier.familyIds?.length ?? 0) > 0 &&
        modifier.familyIds!.includes(familyId!);
      if (!tagMatches && !familyMatches) continue;
      stateMultiplier *= modifier.multiplier;
    }
    stateMultiplier = Math.max(0.1, Math.min(6, stateMultiplier));
  }
  return clamp(rate * pool * stateMultiplier, 0, 1);
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
      case 'state_add':
        tags.add('state');
        tags.add(`state:${effect.stateId}`);
        tags.add(effect.stateId);
        break;
      case 'state_remove':
        tags.add('state');
        if (effect.stateId) {
          tags.add(`state:${effect.stateId}`);
          tags.add(effect.stateId);
        }
        break;
      case 'state_transition':
        tags.add('state');
        tags.add(effect.toStateId);
        break;
      case 'position':
        tags.add(effect.remove ? 'office_end' : 'office');
        tags.add('power');
        break;
      case 'organization_found':
        tags.add('organization');
        break;
      default:
        break;
    }
  }
  return [...tags];
}

function semanticEventTags(
  action: string,
  effects: EventEffect[],
  authored: string[] = [],
): string[] {
  const tags = new Set<string>(authored);
  for (const tag of eventTags({ action, effects } as EventFact)) tags.add(tag);
  return [...tags];
}

function scheduleFactTriggers(context: EngineContext, event: EventFact, depth: number): void {
  if (depth >= 3) return;
  // Fact triggers remain effect-derived. Authored semantic tags describe the
  // content family and are consumed by history conditions, not by the trigger
  // queue, so a broad tag like `work` cannot schedule half the library.
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
      firstDue: { ...due },
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
      firstDue: { ...due },
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
    const primary = context.world.persons[item.subjectId];
    if (!primary || primary.died) continue;
    // A follow-up authored by a kernel names the kernel, not one compiled
    // context. Resolve it against the contexts/milieus that are active when the
    // follow-up is actually due, so a consequence scheduled in 1913 can still
    // happen in a 1948 context.
    const exact = byId.get(item.sceneId);
    const candidates = exact
      ? [exact]
      : definitions.filter((definition) => definition.tags?.includes(`kernel:${item.sceneId}`));
    // A delayed follow-up that missed its original window is retried at the
    // current year boundary, not at the old month. Otherwise a scene that
    // became eligible later is forever evaluated at an age/context it has
    // already left.
    const date =
      item.firstDue && monthIndex(item.due) < monthIndex(target) ? { ...target } : item.due;
    const cause = item.causeEventId
      ? context.world.events.find((event) => event.id === item.causeEventId)
      : undefined;
    const preferredRoles = new Map<string, Id>();
    if (cause) {
      preferredRoles.set('subject', cause.subjectId);
      for (const participant of cause.participants) {
        if (!preferredRoles.has(participant.role)) {
          preferredRoles.set(participant.role, participant.personId);
        }
      }
    }
    let resolved = false;
    for (const definition of candidates) {
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
        if (!alternate) continue;
        subject = alternate;
      }
      const cast = castSceneRoles(context, definition, subject, date, preferredRoles);
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
      resolved = true;
      break;
    }
    if (resolved) continue;
    // Keep a due follow-up queued only while the intended context may still
    // return. Beyond five years it is stale content, not a forthcoming event.
    const firstDue = item.firstDue ?? item.due;
    if (monthIndex(target) - monthIndex(firstDue) <= 60) {
      remaining.push(item);
    } else {
      warnContext(context, 'scheduled_event_expired', 'scheduled follow-up expired', {
        personId: primary.id,
        sceneId: item.sceneId,
      });
    }
  }
  const newlyScheduled = (context.world.historyMeta.scheduledEvents ?? []).filter(
    (item) => !initialIds.has(item.id),
  );
  const mergedQueue = new Map<string, ScheduledEvent>();
  for (const item of [...remaining, ...newlyScheduled]) mergedQueue.set(item.id, item);
  context.world.historyMeta.scheduledEvents = [...mergedQueue.values()];
}

function macroActionActor(world: WorldState, action: PendingMacroAction): Person | undefined {
  if (action.actorPersonId) {
    const explicit = world.persons[action.actorPersonId];
    return explicit && !explicit.died ? explicit : undefined;
  }
  const organization = action.organizationId
    ? world.organizations[action.organizationId]
    : undefined;
  if (!organization) return undefined;
  for (const positionId of organization.positions) {
    const holderId = world.positions[positionId]?.holderId;
    const holder = holderId ? world.persons[holderId] : undefined;
    if (holder && !holder.died) return holder;
  }
  return organization.memberIds
    .map((id) => world.persons[id])
    .filter((person): person is Person => Boolean(person) && !person.died)
    .sort((a, b) => (b.life?.skills.social ?? 0) - (a.life?.skills.social ?? 0))[0];
}

function macroActionCandidates(
  context: EngineContext,
  action: PendingMacroAction,
  date: WorldDate,
): Person[] {
  const world = context.world;
  const regionId = action.organizationId
    ? (world.places[world.organizations[action.organizationId]?.placeId ?? '']?.regionId ??
      'region-lower-austria')
    : 'region-lower-austria';
  return Object.values(world.persons)
    .filter(
      (person) =>
        !person.died &&
        ageAt(person, date) >= 16 &&
        ageAt(person, date) <= 75 &&
        regionIdForPerson(world, person) === regionId &&
        person.provenance.kind !== 'historical_activation',
    )
    .sort((a, b) => a.id.localeCompare(b.id));
}

function runPendingMacroActions(context: EngineContext, date: WorldDate): void {
  const world = context.world;
  const state = world.macro;
  if (!state) return;
  const actions = state.pendingActions ?? [];
  if (actions.length === 0) return;
  let budget = 6;
  const existingActions = new Set(
    world.events
      .filter((event) => event.action.startsWith('macro_action:'))
      .map((event) => event.action),
  );
  for (const action of actions) {
    if (action.status !== 'pending') continue;
    if (budget <= 0) break;
    const marker = `macro_action:${action.id}`;
    if (existingActions.has(marker)) {
      action.status = 'applied';
      continue;
    }
    const actor = macroActionActor(world, action);
    const organization = action.organizationId
      ? world.organizations[action.organizationId]
      : undefined;
    const process = action.processId
      ? state.developments?.[action.processId]?.historical
      : undefined;
    if (!actor) {
      action.status = 'skipped';
      action.reason = 'no living actor';
      continue;
    }
    const effects: EventEffect[] = [];
    const participants: EventParticipant[] = [{ personId: actor.id, role: 'subject' }];
    let text = `${actor.name}推动「${action.title}」。${action.description}`;
    let significance = 0.55;
    const addKnowledge = (holderId: string, proposition: string) => {
      effects.push({
        type: 'knowledge',
        holderId,
        proposition: proposition.slice(0, 280),
        confidence: 0.85,
        sourceKind: 'witnessed',
        personId: actor.id,
        visibility: 'shared',
        trueInWorld: true,
      });
    };
    const addParticipation = (role: 'organizer' | 'participant' | 'supporter' | 'opponent') => {
      if (!action.processId) return;
      effects.push({
        type: 'historical_participation',
        processId: action.processId,
        personId: actor.id,
        role,
        influence: 0.03 + action.intensity * 0.05,
        reason: `director action: ${action.kind}`,
      });
    };
    const addInfluence = (
      dimension: keyof HistoricalProcessMetrics,
      amount: number,
      reason: string,
    ) => {
      if (!action.processId) return;
      effects.push({
        type: 'historical_influence',
        processId: action.processId,
        personId: actor.id,
        dimension,
        amount: Math.max(-0.2, Math.min(0.2, amount * (0.5 + action.intensity))),
        reason,
      });
    };
    const candidates = macroActionCandidates(context, action, date);

    switch (action.kind) {
      case 'organize': {
        if (!organization) {
          action.status = 'skipped';
          action.reason = 'organization missing';
          continue;
        }
        const members = organization.memberIds
          .map((id) => world.persons[id])
          .filter((person): person is Person => Boolean(person) && !person.died)
          .filter((person) => person.id !== actor.id)
          .slice(0, 3);
        const project: Project = {
          id: `project:macro:${action.id}`,
          ownerId: organization.id,
          kind: 'macro_organize',
          title: action.title,
          participants: [
            { personId: actor.id, role: 'organizer' },
            ...members.map((member) => ({ personId: member.id, role: 'participant' })),
          ],
          placeId: organization.placeId,
          state: 'active',
          stage: 0,
          required: { people: 2 },
          committed: {},
          deadline: addMonths(date, 12),
          blockers: [],
          causeIds: [],
          history: [{ date: { ...date }, note: 'macro_action_organize' }],
        };
        effects.push({ type: 'project', project });
        addParticipation('organizer');
        addInfluence('support', 0.035, 'a real organizing effort');
        for (const member of members) {
          addKnowledge(member.id, `${actor.name}召集了一次关于${action.title}的组织会议。`);
          effects.push({
            type: 'relation',
            a: actor.id,
            b: member.id,
            kind: 'colleague',
            trust: 0.02,
            obligation: 0.02,
            reason: 'attended a director-proposed organizing meeting',
          });
          participants.push({ personId: member.id, role: 'participant' });
        }
        significance = 0.65;
        break;
      }
      case 'recruit': {
        if (!organization) {
          action.status = 'skipped';
          action.reason = 'organization missing';
          continue;
        }
        const existing = new Set(organization.memberIds);
        const targets = candidates
          .filter((person) => !existing.has(person.id) && person.id !== actor.id)
          .sort((a, b) => (b.life?.skills.social ?? 0) - (a.life?.skills.social ?? 0))
          .slice(0, action.intensity > 0.6 ? 3 : 2);
        if (targets.length === 0) {
          action.status = 'skipped';
          action.reason = 'no available recruits in region';
          continue;
        }
        for (const target of targets) {
          effects.push({
            type: 'organization_membership',
            personId: target.id,
            organizationId: organization.id,
            add: true,
            reason: `recruited by ${actor.name}`,
          });
          effects.push({
            type: 'relation',
            a: actor.id,
            b: target.id,
            kind: 'acquaintance',
            trust: 0.03,
            obligation: 0.02,
            reason: 'recruited into an organization',
          });
          addKnowledge(target.id, `${actor.name}邀请我加入${organization.name}。`);
          if (action.processId)
            effects.push({
              type: 'historical_participation',
              processId: action.processId,
              personId: target.id,
              role: 'supporter',
              influence: 0.02,
              reason: 'joined through a director-supported recruitment drive',
            });
          participants.push({ personId: target.id, role: 'recruit' });
        }
        addInfluence('support', 0.03, 'recruitment enlarged the organization');
        text = `${actor.name}在${world.places[organization.placeId]?.name ?? '组织所在地'}招募了${targets.length}名新成员：${targets.map((person) => person.name).join('、')}。他们没有立刻成为骨干，但名册和会费都变了。`;
        break;
      }
      case 'negotiate': {
        const targetOrganization = action.targetOrganizationId
          ? world.organizations[action.targetOrganizationId]
          : undefined;
        if (!targetOrganization) {
          action.status = 'skipped';
          action.reason = 'target organization missing';
          continue;
        }
        const targetPerson =
          targetOrganization.positions
            .map((id) => world.positions[id]?.holderId)
            .map((id) => (id ? world.persons[id] : undefined))
            .find((person) => person && !person.died) ??
          targetOrganization.memberIds
            .map((id) => world.persons[id])
            .find((person) => person && !person.died);
        if (!targetPerson) {
          action.status = 'skipped';
          action.reason = 'target organization has no living representative';
          continue;
        }
        const acceptEffects: EventEffect[] = [
          {
            type: 'relation',
            a: actor.id,
            b: targetPerson.id,
            kind: 'acquaintance',
            trust: 0.04,
            respect: 0.03,
            reason: 'reached an agreement',
          },
        ];
        if (action.processId) {
          acceptEffects.push({
            type: 'historical_influence',
            processId: action.processId,
            personId: actor.id,
            dimension: 'legitimacy',
            amount: 0.04,
            reason: 'negotiated recognition',
          });
        }
        const rejectEffects: EventEffect[] = [];
        if (action.processId) {
          rejectEffects.push({
            type: 'historical_influence',
            processId: action.processId,
            personId: actor.id,
            dimension: 'opposition',
            amount: 0.03,
            reason: 'negotiation failed',
          });
        }
        const interaction: Interaction = {
          id: `interaction:macro:${action.id}`,
          initiatorId: actor.id,
          counterpartyIds: [targetPerson.id],
          kind: 'negotiation',
          subject: action.title,
          status: 'pending',
          created: { ...date },
          due: addMonths(date, 6),
          proposal: {
            acceptText: `${targetPerson.name}接受了${actor.name}的谈判条件。`,
            rejectText: `${targetPerson.name}拒绝了${actor.name}的谈判条件。`,
            acceptEffects,
            rejectEffects,
          },
          responses: [],
          visibility: 'participants',
        };
        effects.push({ type: 'interaction', interaction });
        participants.push({ personId: targetPerson.id, role: 'counterparty' });
        addKnowledge(actor.id, `我代表${organization?.name ?? '自己'}与${targetPerson.name}谈判。`);
        addKnowledge(targetPerson.id, `${actor.name}来找我谈判。`);
        text = `${actor.name}代表${organization?.name ?? '自己'}与${targetPerson.name}会面，讨论「${action.title}」。双方没有当场签字，但把条件和保留意见都记了下来。`;
        break;
      }
      case 'publish': {
        let readers = candidates
          .filter((person) => (person.life?.skills.literacy ?? 0) >= 0.25)
          .slice(0, 4);
        if (readers.length === 0 && organization) {
          readers = organization.memberIds
            .map((id) => world.persons[id])
            .filter((person): person is Person => Boolean(person) && !person.died)
            .filter((person) => person.id !== actor.id)
            .slice(0, 3);
        }
        for (const reader of readers) {
          addKnowledge(reader.id, `我读到${actor.name}关于${action.title}的文字。`);
          participants.push({ personId: reader.id, role: 'reader' });
        }
        effects.push({
          type: 'reputation',
          personId: actor.id,
          amount: 0.03,
          reason: 'published a public argument',
        });
        addInfluence('information', 0.04, 'published and circulated an argument');
        text =
          readers.length > 0
            ? `${actor.name}把「${action.title}」写成公开文字，交给印刷所和熟人传阅。几天后，${readers.length}个人在咖啡馆或工作间里讨论它。`
            : `${actor.name}把「${action.title}」写成公开文字，交给印刷所；暂时没有多少读者，但稿子留在了档案里。`;
        significance = 0.5;
        break;
      }
      case 'relief': {
        if (!organization) {
          action.status = 'skipped';
          action.reason = 'organization missing';
          continue;
        }
        const households = Object.values(world.households)
          .filter((household) => {
            const members = household.memberIds
              .map((id) => world.persons[id])
              .filter((person): person is Person => Boolean(person) && !person.died);
            return (
              members.length > 0 &&
              members.some((person) => regionIdForPerson(world, person) === 'region-lower-austria')
            );
          })
          .sort((a, b) => a.cash - b.cash || a.id.localeCompare(b.id))
          .slice(0, 3);
        if (households.length === 0) {
          action.status = 'skipped';
          action.reason = 'no households in region';
          continue;
        }
        const budget = Math.max(0, Math.min(6, organization.treasury / 3));
        for (const household of households) {
          effects.push({
            type: 'cash',
            householdId: household.id,
            amount: Math.max(0.5, budget / households.length),
            reason: `relief from ${organization.name}`,
          });
          effects.push({
            type: 'food',
            householdId: household.id,
            amount: 1,
            reason: `relief from ${organization.name}`,
          });
          for (const memberId of household.memberIds.slice(0, 2))
            participants.push({ personId: memberId, role: 'recipient' });
        }
        addInfluence('support', 0.035, 'material relief reached households');
        addInfluence('legitimacy', 0.025, 'relief was seen as legitimate help');
        text = `${organization.name}拿出${budget.toFixed(1)}克朗和少量食物，分给${households.length}户最困难的人家。领到东西的人没有立刻变成支持者，但记住了是谁送来的。`;
        significance = 0.55;
        break;
      }
      case 'repress': {
        const targets = process
          ? Object.keys(process.participants)
              .map((id) => world.persons[id])
              .filter((person): person is Person => Boolean(person) && !person.died)
              .sort((a, b) => a.id.localeCompare(b.id))
              .slice(0, action.intensity > 0.6 ? 3 : 2)
          : [];
        if (targets.length === 0) {
          action.status = 'skipped';
          action.reason = 'no process participants to repress';
          continue;
        }
        for (const target of targets) {
          effects.push({
            type: 'mood',
            personId: target.id,
            amount: -0.12,
            reason: 'police or administrative pressure',
          });
          effects.push({
            type: 'health',
            personId: target.id,
            amount: -0.02,
            reason: 'detention or forced dispersal',
          });
          effects.push({
            type: 'reputation',
            personId: target.id,
            amount: -0.02,
            reason: 'publicly targeted by authorities',
          });
          addKnowledge(target.id, `${actor.name}或当局对参与行动的人施加压力。`);
          participants.push({ personId: target.id, role: 'target' });
        }
        addInfluence('escalation', 0.04, 'coercive pressure raised the stakes');
        addInfluence('opposition', 0.025, 'repression created opposition');
        text = `${actor.name}推动对「${action.title}」相关人员的压制：${targets.map((person) => person.name).join('、')}被传唤、警告或被迫离开公开活动。压制没有让争议消失。`;
        significance = 0.7;
        break;
      }
      case 'reform': {
        if (!action.processId) {
          action.status = 'skipped';
          action.reason = 'reform action needs a process';
          continue;
        }
        const legacy = recordReformLegacy(state, action.processId, date);
        addParticipation('organizer');
        addInfluence('legitimacy', 0.05, 'a reform proposal gained institutional ground');
        addInfluence('support', 0.04, 'reform attracted wider support');
        effects.push({
          type: 'reputation',
          personId: actor.id,
          amount: 0.03,
          reason: 'pushed a reform proposal',
        });
        text = `${actor.name}把「${action.title}」推动到正式讨论中：条款被抄进会议记录，支持者和反对者都开始计算它真正实施后的后果。${legacy ? `这留下了「${legacy.title}」。` : ''}`;
        significance = 0.8;
        break;
      }
      case 'spawn_process': {
        const processOrganization =
          organization ??
          Object.values(world.organizations).find(
            (candidate) => candidate.status === 'active' && candidate.memberIds.includes(actor.id),
          );
        if (!processOrganization) {
          action.status = 'skipped';
          action.reason = 'spawned process needs an organization';
          continue;
        }
        const id = `development:macro-action-${action.id}`
          .replace(/[^a-zA-Z0-9:_-]/g, '-')
          .slice(0, 160);
        if (state.developments?.[id]) {
          action.status = 'skipped';
          action.reason = 'process id already exists';
          continue;
        }
        effects.push({
          type: 'historical_process',
          process: {
            id,
            kind: action.intensity >= 0.65 ? 'political_repression' : 'social_movement',
            title: action.title,
            description: action.description,
            regionId: world.places[processOrganization.placeId]?.regionId ?? 'region-lower-austria',
            organizationId: processOrganization.id,
            eventFamilyIds: [],
            objectives: [action.description.slice(0, 200)],
            sourceIds: [],
          },
        });
        effects.push({
          type: 'historical_participation',
          processId: id,
          personId: actor.id,
          role: 'organizer',
          influence: 0.06,
          reason: 'created a new process from an existing organization',
        });
        text = `${actor.name}和${processOrganization.name}把「${action.title}」变成一场持续行动：有组织、有成员、有下一步计划，不再只是一次集会。`;
        significance = 0.8;
        break;
      }
    }
    const event = commitEvent(
      context,
      {
        date: { ...date },
        placeId:
          action.organizationId && world.organizations[action.organizationId]
            ? world.organizations[action.organizationId]!.placeId
            : actor.locationId,
        subjectId: actor.id,
        participants: participants.filter(
          (entry, index, all) =>
            all.findIndex((other) => other.personId === entry.personId) === index,
        ),
        action: marker,
        title: action.title,
        causes: process?.lastEventId ? [process.lastEventId] : [],
        effects,
        immediateText: text,
        significance,
        visibility: action.kind === 'repress' ? 'participants' : 'public',
        provenance: { kind: 'system', sourceId: action.id },
      },
      {
        roleIds: {},
        fundingOrganizationIds: action.organizationId ? [action.organizationId] : [],
      },
      true,
    );
    budget -= 1;
    if (event) {
      action.status = 'applied';
      action.eventId = event.id;
      existingActions.add(marker);
    } else {
      action.status = 'skipped';
      action.reason = 'no effect could be committed';
    }
  }
  state.pendingActions = actions.slice(-40);
}

type ContentTaskSelection = {
  definition: TaskDefinition;
  roles: Record<Id, Id>;
  selection: OutcomeSelection;
  score: number;
};

function chooseContentTask(
  context: EngineContext,
  person: Person,
  date: WorldDate,
  rng: () => number,
  minimumScore = 0,
): ContentTaskSelection | undefined {
  const tasks = context.tasksByStage.get(stageForAge(ageAt(person, date))) ?? [];
  if (tasks.length === 0) return undefined;
  const floor = Math.max(0.1, minimumScore);
  const ranked: { definition: TaskDefinition; weight: number; score: number }[] = [];
  for (const definition of tasks) {
    if (!sceneEligible(context, definition, person, date)) continue;
    const score = taskUtility(context.world, person, definition, date);
    if (score <= floor) continue;
    // New composed tasks should compete on their authored utility, not be
    // permanently drowned by the larger Phase 8/9 base task pool.
    const weight = score * (definition.packId === 'composition' ? 1.25 : 1);
    ranked.push({ definition, weight, score });
  }
  if (ranked.length === 0) return undefined;
  // Casting every task is the dominant cost in a large pool. Draw a weighted
  // candidate first and retry a bounded number of alternatives only when the
  // drawn task cannot actually be cast or has no eligible outcome.
  const attempts = Math.min(8, ranked.length);
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const picked = weightedPick(ranked, rng);
    if (!picked) return undefined;
    ranked.splice(ranked.indexOf(picked), 1);
    const cast = castSceneRoles(context, picked.definition, person, date);
    if (cast.missing.length > 0) continue;
    const selection = selectOutcome(context, picked.definition, person, cast.roles, date);
    if (!selection) continue;
    return {
      definition: picked.definition,
      roles: cast.roles,
      selection,
      score: picked.score,
    };
  }
  return undefined;
}

function runAgencyYear(context: EngineContext, date: WorldDate, ordinaryLimit: number): void {
  const world = context.world;
  const actorIds = agencyActorIds(world, date, ordinaryLimit).slice(0, ordinaryLimit + 80);
  for (const personId of actorIds) {
    const person = world.persons[personId];
    if (!person || person.died) continue;
    refreshAgencyGoal(world, person, date);
    const rng = seededRng(world.seed, 'agency', personId, date.year, date.month);
    const plan = planAgencyAction(world, personId, date, rng);
    // A task should only displace the ordinary agency plan when it is at least
    // roughly as attractive. Use a dedicated gate draw so adding low-utility
    // content cannot suppress an already available high-utility task.
    const gateRng = seededRng(world.seed, 'task-gate', personId, date.year, date.month);
    const taskFloor = plan ? plan.score * (1.0 + gateRng() * 0.35) : 0;
    const content = chooseContentTask(
      context,
      world.persons[personId]!,
      date,
      seededRng(world.seed, 'task-choice', personId, date.year, date.month),
      taskFloor,
    );
    // A content task is a personal initiative, not an institutional action.
    // Organization leaders keep their annual institutional plan when one is
    // available; otherwise a large task pool silently replaces the meetings,
    // recruitment and process work that bottom-up history depends on.
    const planKind = plan?.kind ?? '';
    const institutionalPlan = [
      'organize_meeting',
      'found_process',
      'recruit_members',
      'publish',
      'support_process',
      'oppose_process',
      'attend_meeting',
    ].includes(planKind);
    const leadsOrganization =
      person.roles.includes('leader') ||
      Object.values(world.organizations).some(
        (organization) =>
          organization.status === 'active' &&
          organization.memberIds.includes(personId) &&
          organization.positions.some(
            (positionId) => world.positions[positionId]?.holderId === personId,
          ),
      );
    const chooseContent = content !== undefined && !(institutionalPlan && leadsOrganization);
    const subject = world.persons[personId];
    if (!subject || subject.died) continue;
    if (chooseContent && content) {
      const event = resolveScene(
        context,
        content.definition,
        subject,
        content.roles,
        content.selection,
        date,
        0,
      );
      if (!event) continue;
      const domain = content.definition.task.domain;
      const previousFocus = subject.agency?.focus;
      subject.agency = {
        ...(subject.agency ?? {
          goal: content.definition.task.goals[0] ?? 'work',
          summary: content.definition.title,
          since: { ...date },
        }),
        lastAction: { ...date },
        lastActionKind: `task:${domain}`,
        attempts: (subject.agency?.attempts ?? 0) + 1,
        focus: {
          domain,
          taskId: content.definition.id,
          since:
            previousFocus?.domain === domain ? (previousFocus.since ?? { ...date }) : { ...date },
          attempts: previousFocus?.domain === domain ? previousFocus.attempts + 1 : 1,
        },
      };
      continue;
    }
    if (!plan) continue;
    const participants = [
      { personId, role: 'subject' },
      ...plan.participants.filter((entry) => entry.personId !== personId),
    ].filter(
      (entry, index, all) => all.findIndex((other) => other.personId === entry.personId) === index,
    );
    const event = commitEvent(
      context,
      {
        date: { ...date },
        placeId: plan.placeId && world.places[plan.placeId] ? plan.placeId : subject.locationId,
        subjectId: personId,
        participants,
        action: `agency:${plan.kind}`,
        title: plan.title,
        causes: [],
        effects: plan.effects,
        immediateText: plan.text,
        significance: plan.significance,
        visibility:
          plan.kind === 'publish' ||
          plan.kind === 'organize_meeting' ||
          plan.kind === 'found_process'
            ? 'public'
            : 'participants',
        provenance: { kind: 'system', sourceId: `agency:${personId}` },
      },
      { roleIds: {}, fundingOrganizationIds: plan.organizationId ? [plan.organizationId] : [] },
      false,
    );
    if (!event) continue;
    subject.agency = {
      ...(subject.agency ?? {
        goal: plan.goal,
        summary: plan.title,
        since: { ...date },
      }),
      goal: plan.goal,
      lastAction: { ...date },
      lastActionKind: plan.kind,
      attempts: (subject.agency?.attempts ?? 0) + 1,
    };
  }
}

function runBottomUpProcesses(context: EngineContext, date: WorldDate): void {
  const plan = planBottomUpProcess(context.world, date);
  if (!plan) return;
  const actor = context.world.persons[plan.actorPersonId];
  if (!actor || actor.died) return;
  const participants = plan.memberIds
    .map((id) => context.world.persons[id])
    .filter((person): person is Person => Boolean(person) && !person.died)
    .map((person) => ({ personId: person.id, role: 'organizer' }));
  const event = commitEvent(
    context,
    {
      date: { ...date },
      placeId: plan.placeId,
      subjectId: actor.id,
      participants,
      action: `initiative:found_process:${plan.organizationId}`,
      title: plan.title,
      causes: [],
      effects: [
        {
          type: 'historical_process',
          process: {
            id: plan.id,
            kind: 'social_movement',
            title: plan.title,
            description: plan.description,
            regionId: plan.regionId,
            organizationId: plan.organizationId,
            eventFamilyIds: [],
            objectives: ['维持成员互助并把地方诉求变成持续行动'],
            sourceIds: [],
          },
        },
        {
          type: 'historical_participation',
          processId: plan.id,
          personId: actor.id,
          role: 'organizer',
          influence: 0.08,
          reason: 'co-founded a bottom-up process through sustained organization',
        },
        ...participants
          .filter((entry) => entry.personId !== actor.id)
          .map((entry): EventEffect => ({
            type: 'historical_participation',
            processId: plan.id,
            personId: entry.personId,
            role: 'organizer',
            influence: 0.04,
            reason: 'helped turn an organization into a sustained movement',
          })),
        {
          type: 'knowledge',
          holderId: actor.id,
          proposition: `${plan.title}不是一次会议，而是我们这些年积累出来的持续组织。`,
          confidence: 0.9,
          sourceKind: 'inferred',
          visibility: 'shared',
          trueInWorld: true,
        },
        {
          type: 'reputation',
          personId: actor.id,
          amount: 0.04,
          reason: 'turned sustained local work into a public movement',
        },
      ],
      immediateText: plan.description,
      significance: 0.78,
      visibility: 'public',
      provenance: { kind: 'system', sourceId: `initiative:${plan.organizationId}` },
    },
    { roleIds: {}, fundingOrganizationIds: [plan.organizationId] },
    false,
  );
  if (!event) return;
  // The new process is a real WorldDevelopment; its history already points to
  // the founding event. No Director or test script is required.
  const development = context.world.macro?.developments?.[plan.id];
  if (development?.historical) {
    development.historical.lastEventId = event.id;
    const last = development.historical.history[development.historical.history.length - 1];
    if (last) last.eventId = event.id;
  }
}

type IndexedScene = {
  definition: SceneDefinition;
  requiredPlaceKinds?: Set<string>;
  requiredRegionIds?: Set<string>;
  employment?: boolean;
  education?: string[];
  hasRole?: string;
  notHasRole?: string;
  cash?: { min?: number; max?: number };
  health?: { min?: number; max?: number };
  householdSize?: { min?: number; max?: number };
  age?: { min?: number; max?: number };
  skills?: { skill: keyof NonNullable<Person['life']>['skills']; min?: number; max?: number }[];
  capability?: string;
  relationKinds?: string[];
  subjectIds?: string[];
  subjectProvenance?: string[];
  /** Conditions not covered by the index; evaluated once per candidate pool build. */
  residualConditions?: SceneCondition[];
  /** Precomputed stable definition hash for fast rate draws. */
  seed?: number;
  /** Precomputed whether an asynchronous capability compilation gates this scene. */
  requiresCapabilityCompilation?: boolean;
  /** Subject sex required by an authored subject role. */
  subjectSex?: Person['sex'];
};

type StageIndex = {
  all: Map<SceneStage, IndexedScene[]>;
  milestones: Map<SceneStage, IndexedScene[]>;
  lifecycle: Map<SceneStage, IndexedScene[]>;
};

function indexScenesByStage(definitions: SceneDefinition[]): StageIndex {
  const all = new Map<SceneStage, IndexedScene[]>();
  const milestones = new Map<SceneStage, IndexedScene[]>();
  const lifecycle = new Map<SceneStage, IndexedScene[]>();
  for (const definition of definitions) {
    const entry: IndexedScene = { definition, seed: hashId(definition.id) };
    const residual: SceneCondition[] = [];
    for (const condition of definition.conditions) {
      switch (condition.kind) {
        case 'placeKind':
          if (Array.isArray(condition.in)) entry.requiredPlaceKinds = new Set(condition.in);
          break;
        case 'region':
          if (Array.isArray(condition.in)) entry.requiredRegionIds = new Set(condition.in);
          break;
        case 'employment':
          entry.employment = condition.employed;
          break;
        case 'education':
          entry.education = [...condition.in];
          break;
        case 'hasRole':
          entry.hasRole = condition.role;
          break;
        case 'notHasRole':
          entry.notHasRole = condition.role;
          break;
        case 'householdSize':
          entry.householdSize = { min: condition.min, max: condition.max };
          break;
        case 'age':
          entry.age = { min: condition.min, max: condition.max };
          break;
        default:
          residual.push(condition);
          break;
      }
    }
    if (
      definition.conditions.some(
        (condition) =>
          condition.kind === 'hasRelation' &&
          (condition.minTrust !== undefined || condition.sameHousehold === true),
      )
    ) {
      residual.push(
        ...definition.conditions.filter((condition) => condition.kind === 'hasRelation'),
      );
    }
    if (residual.length > 0) entry.residualConditions = residual;
    entry.requiresCapabilityCompilation = definition.conditions.some(
      (condition) => condition.kind === 'capability',
    );
    const subjectRole = definition.roles.find((role) => role.kind === 'subject');
    if (subjectRole?.sex === 'female' || subjectRole?.sex === 'male') {
      entry.subjectSex = subjectRole.sex;
    }
    const list = all.get(definition.stage) ?? [];
    list.push(entry);
    all.set(definition.stage, list);
    if (definition.oncePerPerson) {
      const bucket = milestones.get(definition.stage) ?? [];
      bucket.push(entry);
      milestones.set(definition.stage, bucket);
    }
    if (definition.tags.includes('lifecycle')) {
      const bucket = lifecycle.get(definition.stage) ?? [];
      bucket.push(entry);
      lifecycle.set(definition.stage, bucket);
    }
  }
  return { all, milestones, lifecycle };
}

function indexedSceneFits(
  world: WorldState,
  entry: IndexedScene,
  subject: Person,
  date: WorldDate,
): boolean {
  if (entry.employment !== undefined && Boolean(subject.employment) !== entry.employment) {
    return false;
  }
  if (entry.subjectIds !== undefined && !entry.subjectIds.includes(subject.id)) return false;
  if (entry.subjectSex !== undefined && subject.sex !== entry.subjectSex) return false;
  if (
    entry.requiredRegionIds !== undefined &&
    !entry.requiredRegionIds.has(regionIdForPerson(world, subject))
  ) {
    return false;
  }
  if (
    entry.subjectProvenance !== undefined &&
    !entry.subjectProvenance.includes(subject.provenance.kind)
  )
    return false;
  if (entry.age) {
    const age = ageAt(subject, date);
    if (entry.age.min !== undefined && age < entry.age.min) return false;
    if (entry.age.max !== undefined && age > entry.age.max) return false;
  }
  if (entry.education && !entry.education.includes(subject.education.status)) return false;
  if (entry.hasRole !== undefined && !subject.roles.includes(entry.hasRole)) return false;
  if (entry.notHasRole !== undefined && subject.roles.includes(entry.notHasRole)) return false;
  if (entry.householdSize) {
    const household = world.households[subject.householdId];
    if (!household) return false;
    const size = household.memberIds.filter((id) => {
      const person = world.persons[id];
      return Boolean(person) && !person.died;
    }).length;
    if (entry.householdSize.min !== undefined && size < entry.householdSize.min) return false;
    if (entry.householdSize.max !== undefined && size > entry.householdSize.max) return false;
  }
  const required = entry.requiredPlaceKinds;
  if (required && required.size > 0) {
    const actual = personPlaceKinds(world, subject);
    for (const kind of required) if (actual.has(kind as never)) return true;
    return false;
  }
  return true;
}

function personSceneSignature(world: WorldState, subject: Person, stage: SceneStage): string {
  const household = world.households[subject.householdId];
  const size = household
    ? household.memberIds.filter((id) => {
        const person = world.persons[id];
        return Boolean(person) && !person.died;
      }).length
    : 0;
  const placeKinds = [...personPlaceKinds(world, subject)].sort().join(',');
  // Deliberately excludes cash, food, health, skills, capability and current
  // relations: those change during a year and are cheaper to check per
  // candidate than to multiply the candidate-pool cache key.
  return [
    stage,
    ageAt(subject, world.date),
    subject.locationId,
    subject.employment ? subject.employment.organizationId : '',
    subject.education.status,
    [...subject.roles].sort().join(','),
    size,
    subject.sex,
    placeKinds,
  ].join('|');
}

type WeightedSampler = {
  entries: IndexedScene[];
  probability: Float64Array;
  alias: Uint32Array;
};

function buildWeightedSampler(entries: IndexedScene[]): WeightedSampler {
  const n = entries.length;
  const probability = new Float64Array(n);
  const alias = new Uint32Array(n);
  if (n === 0) return { entries, probability, alias };
  const weights = entries.map((entry) => Math.max(0, entry.definition.weight ?? 1));
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  if (total <= 0) {
    probability.fill(1 / n);
    for (let i = 0; i < n; i += 1) alias[i] = i;
    return { entries, probability, alias };
  }
  const scaled = weights.map((weight) => (weight * n) / total);
  const small: number[] = [];
  const large: number[] = [];
  for (let i = 0; i < n; i += 1) {
    if (scaled[i]! < 1) small.push(i);
    else large.push(i);
  }
  while (small.length > 0 && large.length > 0) {
    const low = small.pop()!;
    const high = large[large.length - 1]!;
    probability[low] = scaled[low]!;
    alias[low] = high;
    scaled[high] = scaled[high]! - (1 - scaled[low]!);
    if (scaled[high]! < 1) {
      large.pop();
      small.push(high);
    }
  }
  while (large.length > 0) probability[large.pop()!] = 1;
  while (small.length > 0) probability[small.pop()!] = 1;
  return { entries, probability, alias };
}

function drawWeighted(sampler: WeightedSampler, rng: () => number): IndexedScene | undefined {
  const n = sampler.entries.length;
  if (n === 0) return undefined;
  const i = Math.floor(rng() * n);
  return rng() < sampler.probability[i]! ? sampler.entries[i] : sampler.entries[sampler.alias[i]!];
}

type CandidateSet = {
  all: IndexedScene[];
  base: IndexedScene[];
  composed: IndexedScene[];
  milestones: IndexedScene[];
  lifecycle: IndexedScene[];
  /** Scenes whose positive conditions depend on a state or a real position. */
  stateDriven: IndexedScene[];
  baseSampler: WeightedSampler;
  composedSampler: WeightedSampler;
};

/**
 * Prepared eligibility skips the structural conditions already used to build
 * the candidate pool. It still checks subject identity, asynchronous capability
 * compilation, residual cash/health/skill/relation/world conditions, and
 * cooldown history.
 */
function sceneEligiblePrepared(
  context: EngineContext,
  entry: IndexedScene,
  subject: Person,
  date: WorldDate,
): boolean {
  const definition = entry.definition;
  if (subject.died) {
    return false;
  }
  if (definition.subjectIds !== undefined && !definition.subjectIds.includes(subject.id)) {
    return false;
  }
  if (
    definition.subjectProvenance !== undefined &&
    !definition.subjectProvenance.includes(subject.provenance.kind)
  ) {
    return false;
  }
  if (!subject.lifeContract?.compiledAt && entry.requiresCapabilityCompilation) {
    return false;
  }
  if (
    entry.residualConditions !== undefined &&
    !conditionsPass(context.world, subject, entry.residualConditions, date)
  ) {
    return false;
  }
  const historyKey = sceneKey(definition.id, subject.id);
  const lastResolved = context.sceneHistory.get(historyKey);
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

function adaptiveTotalsFor(
  context: EngineContext,
  definition: SceneDefinition,
  subject: Person,
  date: WorldDate,
) {
  return adaptiveContextTotals(definition.adaptiveContexts, (conditions) =>
    conditionsPass(context.world, subject, conditions, date),
  );
}

function ratePasses(
  context: EngineContext,
  entry: IndexedScene,
  subject: Person,
  date: WorldDate,
  salt: number,
  personSeed: number,
  minimum = 0,
): boolean {
  const definition = entry.definition;
  const rate = Math.max(v4EventRate(context, definition, subject, date), minimum);
  if (rate >= 1) return true;
  const roll = fastUnit(
    entry.seed ?? hashId(definition.id),
    personSeed,
    date.year,
    date.month,
    salt,
  );
  return roll < rate;
}

/** Large pools are sampled; small worlds keep the exact exhaustive scan. */
const EXACT_ORDINARY_SCAN_LIMIT = 240;
const ORDINARY_SAMPLE_DRAWS = 64;
const ORDINARY_SAMPLE_TARGET = 6;

function pickOrdinaryCandidate(
  context: EngineContext,
  entries: IndexedScene[],
  sampler: WeightedSampler,
  subject: Person,
  date: WorldDate,
  used: Set<string>,
  ordinal: number,
  personSeed: number,
): { definition: SceneDefinition; weight: number } | undefined {
  if (entries.length === 0) return undefined;
  const rng = seededRng(context.world.seed, 'ordinary-draw', subject.id, date.year, ordinal);
  const attempts = Math.min(8, Math.max(4, Math.ceil(entries.length / 48)));
  const eligible: { definition: SceneDefinition; weight: number }[] = [];
  for (let i = 0; i < attempts; i += 1) {
    const entry = drawWeighted(sampler, rng);
    if (!entry) break;
    const definition = entry.definition;
    const source = definitionSource(definition);
    const scheduling = context.diagnostics.scheduling;
    if (scheduling) scheduling.ordinary.draws[source] += 1;
    if (used.has(sceneUseKey(definition))) continue;
    if (definition.triggerMode === 'fact' || definition.triggerMode === 'action') continue;
    if (!indexedSceneFits(context.world, entry, subject, date)) continue;
    if (!ratePasses(context, entry, subject, date, 1, personSeed)) continue;
    if (scheduling) scheduling.ordinary.ratePass[source] += 1;
    if (!sceneEligiblePrepared(context, entry, subject, date)) continue;
    if (scheduling) scheduling.ordinary.preparedPass[source] += 1;
    eligible.push({
      definition,
      weight:
        Math.max(0, definition.weight ?? 1) *
        adaptiveTotalsFor(context, definition, subject, date).weightMultiplier,
    });
  }
  if (eligible.length === 0) return undefined;
  return weightedPick(
    eligible,
    seededRng(context.world.seed, 'ordinary-adaptive', subject.id, date.year, ordinal),
  );
}

function chooseEncounterSource(
  seed: string,
  candidateSet: CandidateSet,
  subject: Person,
  date: WorldDate,
  ordinal: number,
): 'base' | 'composed' {
  if (candidateSet.base.length === 0) return 'composed';
  if (candidateSet.composed.length === 0) return 'base';
  const rng = seededRng(seed, 'encounter-source', subject.id, date.year, ordinal);
  return rng() <
    candidateSet.base.length / (candidateSet.base.length + candidateSet.composed.length)
    ? 'base'
    : 'composed';
}

function runEventYear(
  context: EngineContext,
  definitions: SceneDefinition[],
  date: WorldDate,
  resolvedCounts: Map<Id, number>,
): void {
  const index = indexScenesByStage(definitions);
  const candidateSetCache = new Map<string, CandidateSet>();
  const candidateSetFor = (subject: Person): CandidateSet => {
    const stage = stageForAge(ageAt(subject, context.target));
    const key = personSceneSignature(context.world, subject, stage);
    const cached = candidateSetCache.get(key);
    if (cached) return cached;
    const all = (index.all.get(stage) ?? []).filter((entry) =>
      indexedSceneFits(context.world, entry, subject, context.target),
    );
    const base = all.filter((entry) => definitionSource(entry.definition) === 'base');
    const composed = all.filter((entry) => definitionSource(entry.definition) === 'composed');
    const candidateSet: CandidateSet = {
      all,
      base,
      composed,
      milestones: all.filter((entry) => entry.definition.oncePerPerson === true),
      lifecycle: all.filter((entry) => entry.definition.tags.includes('lifecycle')),
      stateDriven: all.filter((entry) =>
        entry.definition.conditions.some(
          (condition) => condition.kind === 'hasState' || condition.kind === 'position',
        ),
      ),
      baseSampler: buildWeightedSampler(base),
      composedSampler: buildWeightedSampler(composed),
    };
    candidateSetCache.set(key, candidateSet);
    return candidateSet;
  };
  const personIds = Object.keys(context.world.persons).sort();
  for (const personId of personIds) {
    let subject = context.world.persons[personId];
    if (!subject || subject.died) continue;
    let ordinary = 0;
    const personSeed = hashId(subject.id);
    const used = new Set<string>();
    const ordinaryCap = subject.ownerId
      ? Math.max(context.options.maxOrdinaryEventsPerPerson, 6)
      : context.options.maxOrdinaryEventsPerPerson;
    let candidateSet = candidateSetFor(subject);
    if (context.diagnostics.scheduling) {
      const scheduling = context.diagnostics.scheduling;
      for (const entry of candidateSet.all) {
        scheduling.candidatePool[definitionSource(entry.definition)] += 1;
      }
    }
    // Once-per-person milestones (school entry, first apprenticeship, a
    // historical epidemic) must not be crowded out by weighted ordinary
    // events. Resolve at most one milestone first, then fill with ordinary
    // events.
    for (const entry of candidateSet.milestones) {
      const definition = entry.definition;
      if (used.has(sceneUseKey(definition))) continue;
      if (!indexedSceneFits(context.world, entry, subject, date)) continue;
      if (!sceneEligiblePrepared(context, entry, subject, date)) continue;
      if (!ratePasses(context, entry, subject, date, 3, personSeed)) continue;
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
      used.add(sceneUseKey(definition));
      resolvedCounts.set(personId, (resolvedCounts.get(personId) ?? 0) + 1);
      subject = context.world.persons[personId];
      // Keep the structurally filtered pool for the rest of this person-year.
      // Dynamic facts are re-checked by sceneEligiblePrepared; newly gained
      // structural facts become visible at the next annual candidate build.
      break;
    }
    // Lifecycle scenes (courtship, childbirth, separation) get one dedicated
    // attempt per person-year. A pack with dozens of ordinary neighbourhood
    // scenes must not crowd out the events that create the next generation.
    if (subject && !subject.died && ordinary < ordinaryCap) {
      const lifecycleCandidates: { definition: SceneDefinition; weight: number }[] = [];
      for (const entry of candidateSet.lifecycle) {
        const definition = entry.definition;
        if (used.has(sceneUseKey(definition))) continue;
        if (definition.triggerMode === 'fact' || definition.triggerMode === 'action') continue;
        if (!indexedSceneFits(context.world, entry, subject, date)) continue;
        if (!sceneEligiblePrepared(context, entry, subject, date)) continue;
        if (!ratePasses(context, entry, subject, date, 2, personSeed)) continue;
        lifecycleCandidates.push({
          definition,
          weight:
            Math.max(0, definition.weight ?? 1) *
            adaptiveTotalsFor(context, definition, subject, date).weightMultiplier,
        });
      }
      const chosen = weightedPick(
        lifecycleCandidates,
        seededRng(context.world.seed, 'lifecycle-choice', subject.id, date.year),
      );
      if (chosen) {
        used.add(sceneUseKey(chosen.definition));
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
    // Phase 16: a dedicated opportunity lane for states and real positions.
    // Without it, state-gated scenes compete in a pool of thousands and a
    // character can hold an office or a curse for decades without ever seeing
    // the content that consumes it. This is one bounded attempt per
    // person-year, not a second scheduler.
    if (
      subject &&
      !subject.died &&
      ordinary < ordinaryCap &&
      candidateSet.stateDriven.length > 0 &&
      hasStateContextForPerson(context.world, subject, date)
    ) {
      const stateCandidates: {
        definition: SceneDefinition;
        weight: number;
        cast: CastResult;
        crossStateCount: number;
        crossPackCount: number;
      }[] = [];
      for (const entry of candidateSet.stateDriven) {
        const definition = entry.definition;
        if (used.has(sceneUseKey(definition))) continue;
        if (definition.triggerMode === 'fact' || definition.triggerMode === 'action') continue;
        if (!indexedSceneFits(context.world, entry, subject, date)) continue;
        if (!sceneEligiblePrepared(context, entry, subject, date)) continue;
        if (!ratePasses(context, entry, subject, date, 5, personSeed, 0.35)) continue;
        // Screen cast availability before the weighted draw. A household with a
        // newborn should not spend its state opportunity drawing a school scene
        // that needs a five-year-old who does not exist yet. Counting these as
        // availability failures keeps the scheduler honest and avoids repeated
        // no-op casts.
        const cast = castSceneRoles(context, definition, subject, date);
        if (cast.missing.length > 0) {
          if (context.diagnostics.scheduling) {
            context.diagnostics.scheduling.stateOpportunity.missingRole += 1;
          }
          continue;
        }
        // Phase 19: bounded cross-state affinity. A scene that genuinely
        // needs two or more standing states/positions is rarer; give it a
        // small weight bonus inside the existing state lane. This is not a
        // second scheduler and does not change the one-state-scene-per-year cap.
        const stateConditionKeys = new Set(
          definition.conditions
            .filter((condition) => condition.kind === 'hasState' || condition.kind === 'position')
            .map((condition) =>
              condition.kind === 'position'
                ? `position:${condition.organizationId ?? 'any'}`
                : `state:${condition.stateId ?? condition.tag ?? 'any'}`,
            ),
        );
        const crossStateCount = stateConditionKeys.size;
        const crossStateWeight = 1 + 0.2 * Math.min(3, Math.max(0, crossStateCount - 1));
        const statePacks = new Set(
          definition.conditions
            .filter((condition) => condition.kind === 'hasState' && 'stateId' in condition)
            .map((condition) => {
              const stateId = 'stateId' in condition ? condition.stateId : undefined;
              return stateId ? context.stateIndex.byId.get(stateId)?.packId : undefined;
            })
            .filter((packId): packId is string => Boolean(packId)),
        );
        if (definition.conditions.some((condition) => condition.kind === 'position')) {
          statePacks.add('position');
        }
        const crossPackCount = statePacks.size;
        const crossPackWeight = 1 + 0.5 * Math.min(2, Math.max(0, crossPackCount - 1));
        if (crossStateCount >= 2 && context.diagnostics.scheduling) {
          context.diagnostics.scheduling.stateOpportunity.crossStateCandidates += 1;
        }
        if (crossPackCount >= 2 && context.diagnostics.scheduling) {
          context.diagnostics.scheduling.stateOpportunity.crossPackCandidates += 1;
        }
        stateCandidates.push({
          definition,
          weight:
            Math.max(0, definition.weight ?? 1) *
            1.5 *
            crossStateWeight *
            crossPackWeight *
            adaptiveTotalsFor(context, definition, subject, date).weightMultiplier,
          cast,
          crossStateCount,
          crossPackCount,
        });
      }
      if (context.diagnostics.scheduling) {
        context.diagnostics.scheduling.stateOpportunity.candidates += stateCandidates.length;
      }
      const remaining = [...stateCandidates];
      // A state can validly be present while its first weighted scene cannot
      // cast (a dead neighbour, a missing official in a rural year). Try a few
      // other eligible state scenes before spending the person-year's single
      // opportunity. This mirrors ordinary casting without weakening the
      // one-resolved-state-scene-per-year bound.
      const attempts = Math.min(5, remaining.length);
      for (let attempt = 0; attempt < attempts; attempt += 1) {
        const chosen = weightedPick(
          remaining,
          seededRng(
            context.world.seed,
            'state-opportunity',
            subject.id,
            date.year,
            String(attempt),
          ),
        );
        if (!chosen) break;
        remaining.splice(remaining.indexOf(chosen), 1);
        used.add(sceneUseKey(chosen.definition));
        if (context.diagnostics.scheduling) {
          context.diagnostics.scheduling.stateOpportunity.selected += 1;
        }
        const cast = chosen.cast;
        const selection = selectOutcome(context, chosen.definition, subject, cast.roles, date);
        if (!selection) {
          if (context.diagnostics.scheduling) {
            context.diagnostics.scheduling.stateOpportunity.noOutcome += 1;
          }
          recordBlocked(
            context,
            chosen.definition,
            subject,
            cast.roles,
            'no_eligible_outcome',
            date,
          );
          continue;
        }
        const event = resolveScene(
          context,
          chosen.definition,
          subject,
          cast.roles,
          selection,
          date,
          0,
        );
        if (!event) {
          if (context.diagnostics.scheduling) {
            context.diagnostics.scheduling.stateOpportunity.blocked += 1;
          }
          continue;
        }
        ordinary += 1;
        resolvedCounts.set(personId, (resolvedCounts.get(personId) ?? 0) + 1);
        if (context.diagnostics.scheduling) {
          context.diagnostics.scheduling.stateOpportunity.resolved += 1;
          if (chosen.crossStateCount >= 2) {
            context.diagnostics.scheduling.stateOpportunity.crossStateResolved += 1;
          }
          if (chosen.crossPackCount >= 2) {
            context.diagnostics.scheduling.stateOpportunity.crossPackResolved += 1;
          }
        }
        // One resolved state/position opportunity per person-year. Further
        // attempts are only for cast/effect failures, never for a second story.
        break;
      }
    }
    // For ordinary events, large content libraries use a deterministic sample
    // of the pre-filtered pool. This keeps per-person work bounded as the
    // recipe library grows; the final pick is still weighted by scene weight.
    while (ordinary < ordinaryCap) {
      if (!subject || subject.died) break;
      const source = chooseEncounterSource(
        context.world.seed,
        candidateSet,
        subject,
        date,
        ordinary,
      );
      const sourceEntries = source === 'base' ? candidateSet.base : candidateSet.composed;
      const sourceSampler =
        source === 'base' ? candidateSet.baseSampler : candidateSet.composedSampler;
      let chosen: { definition: SceneDefinition; weight: number } | undefined;
      if (sourceEntries.length > EXACT_ORDINARY_SCAN_LIMIT) {
        chosen = pickOrdinaryCandidate(
          context,
          sourceEntries,
          sourceSampler,
          subject,
          date,
          used,
          ordinary,
          personSeed,
        );
      } else {
        const candidates: { definition: SceneDefinition; weight: number }[] = [];
        for (const entry of sourceEntries) {
          const definition = entry.definition;
          if (used.has(sceneUseKey(definition))) continue;
          if (definition.triggerMode === 'fact' || definition.triggerMode === 'action') continue;
          if (!indexedSceneFits(context.world, entry, subject, date)) continue;
          if (!sceneEligiblePrepared(context, entry, subject, date)) continue;
          if (!ratePasses(context, entry, subject, date, 1, personSeed)) continue;
          if (context.diagnostics.scheduling) {
            context.diagnostics.scheduling.ordinary.ratePass[definitionSource(definition)] += 1;
          }
          candidates.push({
            definition,
            weight:
              Math.max(0, definition.weight ?? 1) *
              adaptiveTotalsFor(context, definition, subject, date).weightMultiplier,
          });
        }
        chosen = weightedPick(
          candidates,
          seededRng(context.world.seed, 'event-choice', subject.id, date.year, String(ordinary)),
        );
      }
      // If the preferred source has nothing eligible, try the other source before
      // giving up. This keeps base-only and composed-only lives playable.
      if (!chosen) {
        const fallbackSource = source === 'base' ? 'composed' : 'base';
        const fallbackEntries =
          fallbackSource === 'base' ? candidateSet.base : candidateSet.composed;
        const fallbackSampler =
          fallbackSource === 'base' ? candidateSet.baseSampler : candidateSet.composedSampler;
        if (fallbackEntries.length > 0) {
          if (fallbackEntries.length > EXACT_ORDINARY_SCAN_LIMIT) {
            chosen = pickOrdinaryCandidate(
              context,
              fallbackEntries,
              fallbackSampler,
              subject,
              date,
              used,
              ordinary,
              personSeed,
            );
          } else {
            const candidates: { definition: SceneDefinition; weight: number }[] = [];
            for (const entry of fallbackEntries) {
              const definition = entry.definition;
              if (used.has(sceneUseKey(definition))) continue;
              if (definition.triggerMode === 'fact' || definition.triggerMode === 'action')
                continue;
              if (!indexedSceneFits(context.world, entry, subject, date)) continue;
              if (!sceneEligiblePrepared(context, entry, subject, date)) continue;
              if (!ratePasses(context, entry, subject, date, 1, personSeed)) continue;
              candidates.push({
                definition,
                weight:
                  Math.max(0, definition.weight ?? 1) *
                  adaptiveTotalsFor(context, definition, subject, date).weightMultiplier,
              });
            }
            chosen = weightedPick(
              candidates,
              seededRng(
                context.world.seed,
                'event-choice-fallback',
                subject.id,
                date.year,
                String(ordinary),
              ),
            );
          }
        }
      }
      if (!chosen) break;
      if (context.diagnostics.scheduling) {
        const chosenSource = definitionSource(chosen.definition);
        context.diagnostics.scheduling.ordinary.selected[chosenSource] += 1;
      }
      used.add(sceneUseKey(chosen.definition));
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
  const scheduling = context.diagnostics.scheduling;
  if (scheduling) {
    scheduling.blocked[definitionSource(definition)] += 1;
    bumpRecord(scheduling.blockedReasons, reason.split(':')[0] ?? reason);
  }
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

function describeIncidentEffect(effect: EventEffect): string {
  switch (effect.type) {
    case 'cash':
      return `现金 ${effect.amount} 克朗：${effect.reason}`;
    case 'food':
      return `食物 ${effect.amount}：${effect.reason}`;
    case 'health':
      return `健康 ${effect.amount}：${effect.reason}`;
    case 'condition':
      return `${effect.add ? '出现' : '解除'}状况 ${effect.condition}：${effect.reason}`;
    case 'mood':
      return `情绪 ${effect.amount}：${effect.reason}`;
    case 'reputation':
      return `名誉 ${effect.amount}：${effect.reason}`;
    case 'skill':
      return `技能 ${effect.skill} ${effect.amount}：${effect.reason}`;
    case 'flag':
      return `${effect.add ? '记录' : '清除'} ${effect.flag}：${effect.reason}`;
    case 'education':
      return `教育变为 ${effect.status}${effect.level !== undefined ? `（${effect.level}）` : ''}：${effect.reason}`;
    case 'employment':
      return `受雇为 ${effect.occupation}，工资 ${effect.wage}：${effect.reason}`;
    case 'unemployment':
      return `失业：${effect.reason}`;
    case 'relation':
      return `与 ${effect.b} 建立 ${effect.kind} 关系：${effect.reason}`;
    case 'relation_end':
      return `与 ${effect.b} 的 ${effect.kind} 关系结束：${effect.reason}`;
    case 'role':
      return `${effect.add ? '获得' : '失去'}角色 ${effect.role}：${effect.reason}`;
    case 'organization_membership':
      return `${effect.add ? '加入' : '退出'}组织 ${effect.organizationId}：${effect.reason}`;
    case 'move':
      return `迁往 ${effect.locationId}：${effect.reason}`;
    case 'household':
      return `转入家庭 ${effect.householdId}：${effect.reason}`;
    case 'residence':
      return `迁居 ${effect.residenceId}：${effect.reason}`;
    case 'birth':
      return `孩子出生（${effect.childSex}）：${effect.reason}`;
    case 'death':
      return `死亡：${effect.cause}；${effect.reason}`;
    case 'estate':
      return `遗产 ${effect.amount} 交给 ${effect.heirHouseholdId}：${effect.reason}`;
    case 'organization_funds':
      return `组织资金 ${effect.amount}：${effect.reason}`;
    case 'knowledge':
      return `获知“${effect.proposition}”（置信度 ${effect.confidence}）`;
    case 'historical_participation':
      return `参与历史进程 ${effect.processId} 作为 ${effect.role}：${effect.reason}`;
    case 'historical_influence':
      return `历史影响 ${effect.dimension} ${effect.amount}：${effect.reason}`;
    case 'historical_process':
      return `开启历史进程 ${effect.process.title}`;
    case 'project':
      return `项目 ${effect.project.title ?? effect.project.id}`;
    case 'interaction':
      return `互动 ${effect.interaction.id}`;
    case 'state_add':
      return `进入状态 ${effect.stateId}：${effect.reason}`;
    case 'state_remove':
      return `退出状态 ${effect.stateId ?? effect.tag ?? '?'}：${effect.reason}`;
    case 'state_parameter':
      return `状态参数 ${effect.stateId}.${effect.key}：${effect.reason}`;
    case 'state_transition':
      return `状态 ${effect.fromStateId} → ${effect.toStateId}：${effect.reason}`;
    case 'position':
      return `${effect.remove ? '卸任' : '就任'} ${effect.title}：${effect.reason}`;
    case 'organization_found':
      return `成立组织 ${effect.organization.name}：${effect.reason}`;
    default:
      return (effect as { type: string }).type;
  }
}

function buildIncidentTrace(
  context: EngineContext,
  definition: SceneDefinition,
  outcome: SceneOutcome,
  subject: Person,
  roles: Record<Id, Id>,
  placeId: Id | undefined,
  date: WorldDate,
  effects: EventEffect[],
): IncidentTrace {
  const composed = parseComposedAction(`${definition.id}/${outcome.id}`);
  const place = placeId ? context.world.places[placeId] : undefined;
  const participants: IncidentTrace['participants'] = [];
  for (const [role, personId] of Object.entries(roles)) {
    const person = context.world.persons[personId];
    if (person) {
      participants.push({
        personId,
        role,
        name: person.name,
        ...(person.employment ? { organizationId: person.employment.organizationId } : {}),
      });
    } else if (context.world.organizations[personId]) {
      participants.push({ personId, role, name: context.world.organizations[personId]!.name });
    }
  }
  const agency = subject.agency?.summary ?? subject.lifeContract?.privateGoal;
  const interpolate = (value: string | undefined): string | undefined =>
    value === undefined
      ? undefined
      : interpolateSceneText(value, context.world, subject, roles, date);
  return {
    mechanism: {
      sceneId: definition.id,
      outcomeId: outcome.id,
      ...(composed
        ? {
            kernelId: composed.kernelId,
            contextId: composed.contextId,
            milieuId: composed.milieuId,
            ...(composed.variantId ? { variantId: composed.variantId } : {}),
          }
        : {}),
    },
    ...(place ? { place: { id: place.id, name: place.name, kind: place.kind } } : {}),
    subject: {
      id: subject.id,
      name: subject.name,
      age: ageAt(subject, date),
      ...(subject.employment ? { occupation: subject.employment.occupation } : {}),
      roles: [...subject.roles],
    },
    participants,
    ...((outcome.trace?.motive ?? agency) ? { motive: outcome.trace?.motive ?? agency } : {}),
    ...(outcome.trace?.conflict ? { conflict: outcome.trace.conflict } : {}),
    ...(outcome.trace?.response ? { response: outcome.trace.response } : {}),
    effects: effects.map((effect) => ({
      type: effect.type,
      description: describeIncidentEffect(effect),
    })),
  };
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
): EventFact | undefined {
  const instanceId = nextSceneId(context);
  const outcome = selection.outcome;
  const choiceActorId =
    selection.choice && context.world.persons[roles[selection.choice.actorRole]]
      ? roles[selection.choice.actorRole]!
      : subject.id;
  const draftPlaceId =
    definition.placeId && context.world.places[definition.placeId]
      ? definition.placeId
      : subject.locationId;
  const historyRefs = [
    ...new Set(
      [...(definition.conditions ?? []), ...(outcome.conditions ?? [])]
        .filter(
          (condition): condition is Extract<SceneCondition, { kind: 'history' }> =>
            condition.kind === 'history',
        )
        .flatMap((condition) =>
          historyEntriesMatching(context.world, subject.id, condition, date).map(
            (entry) => entry.eventId,
          ),
        ),
    ),
  ];
  const draft: EventDraft = {
    date: { ...date },
    placeId: draftPlaceId,
    subjectId: subject.id,
    participants: buildParticipants(context.world, subject, roles),
    action: `${definition.id}/${outcome.id}`,
    title: definition.title,
    tags: definition.tags,
    historyRefs,
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
    trace: buildIncidentTrace(context, definition, outcome, subject, roles, draftPlaceId, date, [
      ...outcome.effects,
      ...birthContractCostEffects(subject, definition, date),
      ...materializedContactEffects(context, subject, roles, outcome),
    ]),
  };
  if (selection.check && draft.trace) {
    draft.trace.check = {
      die: selection.check.die,
      modifier: selection.check.modifier,
      total: selection.check.total,
      dc: selection.check.dc,
      band: selection.check.band,
      ...(selection.check.blockedBy ? { blockedBy: selection.check.blockedBy } : {}),
    };
  }
  const event = commitEvent(
    context,
    draft,
    {
      roleIds: roles,
      fundingOrganizationIds: fundingOrganizations(context.world, subject, roles),
    },
    // An outcome that authored effects must not persist a story whose effects
    // all failed. Effectless test/fixture scenes may still commit for scheduling
    // tests, but real content cannot silently become an empty fact.
    outcome.effects.length === 0,
  );
  if (!event) return undefined;
  if (context.diagnostics.scheduling) {
    const source = definitionSource(definition);
    context.diagnostics.scheduling.resolved[source] += 1;
    const taskDomain = (definition as TaskDefinition).task?.domain;
    bumpRecord(
      context.diagnostics.scheduling.paths,
      taskDomain ? `${source}:task:${taskDomain}` : `${source}:scene`,
    );
  }

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
  return event;
}

// ---------------------------------------------------------------------------
// Committed facts and effects
// ---------------------------------------------------------------------------

function activeStateCount(world: WorldState): number {
  return world.states ? Object.values(world.states).filter((state) => state.active).length : 0;
}

function stateTickOutcome(
  context: EngineContext,
  definition: StateDefinition,
  tick: StateTick,
  subject: Person,
  date: WorldDate,
): { outcome: StateTickOutcome; check?: ReturnType<typeof resolveCheck> } | undefined {
  let outcomes = tick.outcomes.filter(
    (outcome) =>
      outcome &&
      outcome.weight > 0 &&
      conditionsPass(context.world, subject, outcome.conditions, date),
  );
  if (outcomes.length === 0) return undefined;
  if (tick.check) {
    const check = resolveCheck(
      context.world,
      subject,
      tick.check,
      context.stateIndex,
      seededRng(
        context.world.seed,
        'state-tick-check',
        definition.id,
        tick.id,
        subject.id,
        date.year,
        date.month,
      ),
      (tag) => countHistoryTag(context.world, subject.id, tag, date),
      date,
    );
    const band = checkBand(check);
    const preferred = outcomes.filter((outcome) => outcome.result === band);
    if (preferred.length > 0) {
      outcomes = preferred;
    } else if (check.success) {
      const fallback = outcomes.filter(
        (outcome) => outcome.result === undefined || outcome.result === 'success',
      );
      if (fallback.length > 0) outcomes = fallback;
    } else {
      const fallback = outcomes.filter(
        (outcome) => outcome.result === undefined || outcome.result === 'failure',
      );
      if (fallback.length > 0) outcomes = fallback;
    }
    const chosen = weightedPick(
      outcomes,
      seededRng(
        context.world.seed,
        'state-tick-outcome',
        definition.id,
        tick.id,
        subject.id,
        date.year,
      ),
    );
    return chosen ? { outcome: chosen, check } : undefined;
  }
  const chosen = weightedPick(
    outcomes,
    seededRng(
      context.world.seed,
      'state-tick-outcome',
      definition.id,
      tick.id,
      subject.id,
      date.year,
    ),
  );
  return chosen ? { outcome: chosen } : undefined;
}

function linkedPersonRoles(
  world: WorldState,
  instance: StateInstance,
): { roles: Record<Id, Id>; participants: { personId: Id; role: string }[] } {
  const roles: Record<Id, Id> = {};
  const participants: { personId: Id; role: string }[] = [];
  for (const [name, targetId] of Object.entries(instance.links ?? {})) {
    if (!world.persons[targetId]) continue;
    roles[name] = targetId;
    participants.push({ personId: targetId, role: name });
  }
  return { roles, participants };
}

function bindStateEffectsToInstance(
  effects: EventEffect[],
  instance: StateInstance,
): EventEffect[] {
  return effects.map((effect) => {
    if (effect.type !== 'state_parameter' && effect.type !== 'state_remove') return effect;
    if (effect.instanceId) return effect;
    if (effect.ownerType !== instance.ownerType) return effect;
    const ownerPlaceholder =
      (effect.ownerType === 'person' && effect.ownerId === '$subject') ||
      (effect.ownerType === 'household' && effect.ownerId === '$household') ||
      (effect.ownerType === 'organization' && effect.ownerId === '$subjectOrg') ||
      (effect.ownerType === 'place' && effect.ownerId === '$subjectPlace');
    if (effect.ownerId !== instance.ownerId && !ownerPlaceholder) return effect;
    if (effect.stateId && effect.stateId !== instance.definitionId) return effect;
    return { ...effect, instanceId: instance.id };
  });
}

function stateTickFact(
  context: EngineContext,
  definition: StateDefinition,
  instance: StateInstance,
  subject: Person,
  date: WorldDate,
  action: string,
  text: string,
  effects: EventEffect[],
  reason: string,
  tickId?: string,
): EventFact | undefined {
  const roles: Record<Id, Id> = { subject: subject.id, owner: subject.id };
  const linked = linkedPersonRoles(context.world, instance);
  Object.assign(roles, linked.roles);
  const participants = [
    { personId: subject.id, role: 'subject' },
    ...linked.participants.filter((participant) => participant.personId !== subject.id),
  ];
  const event = commitEvent(
    context,
    {
      date: { ...date },
      placeId: subject.locationId,
      subjectId: subject.id,
      participants,
      action,
      title: definition.title,
      tags: [definition.id, ...definition.tags, 'state', 'state_tick'],
      causes: [],
      effects: bindStateEffectsToInstance(effects, instance),
      immediateText: interpolateSceneText(text, context.world, subject, roles, date) || reason,
      significance: 0.45,
      visibility: 'participants',
      provenance: { kind: 'system', sourceId: definition.id },
    },
    { roleIds: roles, fundingOrganizationIds: [] },
    false,
  );
  if (!event) return undefined;
  if (context.diagnostics.states) context.diagnostics.states.ticks += 1;
  const current = context.world.states?.[instance.id];
  if (current) {
    current.lastTickAt = { ...date };
    if (tickId) {
      current.tickHistory ??= {};
      current.tickHistory[tickId] = { ...date };
    }
    current.tickCount += 1;
  }
  return event;
}

/**
 * Annual state pass. Expiry, exit conditions, transitions and authored ticks
 * are resolved as ordinary facts, not silent field edits. A tick that cannot
 * commit a fact does not advance its lastTickAt and is retried next year.
 */
function tickStates(context: EngineContext, date: WorldDate): void {
  const states = context.world.states;
  if (!states) return;
  const instances = Object.values(states)
    .filter((instance) => instance.active)
    .sort((a, b) => a.id.localeCompare(b.id));
  for (const instance of instances) {
    if (!instance.active) continue;
    const definition = context.stateIndex.byId.get(instance.definitionId);
    if (!definition) {
      if (context.diagnostics.states) context.diagnostics.states.blockedAdds += 1;
      warnContext(context, 'unknown_state_instance', instance.definitionId, {
        eventId: instance.sourceEventId,
      });
      continue;
    }
    const subject = stateAnchorFor(context, instance.ownerType, instance.ownerId);
    if (!subject) continue;
    if (instance.ownerType === 'person' && context.world.persons[instance.ownerId]?.died) continue;
    // A state created in the same month as the tick pass must not tick before
    // its own creation fact. Also prevents a January tick from mutating a
    // state that a later-month scene will add in the same calendar year.
    if (monthIndex(date) - monthIndex(instance.since) < 1) continue;

    if (stateExpired(instance, date)) {
      stateTickFact(
        context,
        definition,
        instance,
        subject,
        date,
        `state_expire:${definition.id}`,
        `${subject.name}的「${definition.title}」到期；${instance.endReason ?? '相关安排结束'}。`,
        [
          {
            type: 'state_remove',
            ownerType: instance.ownerType,
            ownerId: instance.ownerId,
            stateId: definition.id,
            instanceId: instance.id,
            reason: 'duration expired',
          },
        ],
        'state expired',
      );
      continue;
    }
    if (
      definition.exitWhen &&
      definition.exitWhen.length > 0 &&
      conditionsPass(context.world, subject, definition.exitWhen, date)
    ) {
      stateTickFact(
        context,
        definition,
        instance,
        subject,
        date,
        `state_exit:${definition.id}`,
        `${subject.name}不再处于「${definition.title}」；条件已经改变。`,
        [
          {
            type: 'state_remove',
            ownerType: instance.ownerType,
            ownerId: instance.ownerId,
            stateId: definition.id,
            instanceId: instance.id,
            reason: 'exit condition met',
          },
        ],
        'state exit condition met',
      );
      continue;
    }
    for (const transition of definition.transitions ?? []) {
      if (
        transition.conditions &&
        transition.conditions.length > 0 &&
        !conditionsPass(context.world, subject, transition.conditions, date)
      ) {
        continue;
      }
      if (transition.chance !== undefined) {
        const roll = seededRng(
          context.world.seed,
          'state-transition',
          instance.id,
          transition.id,
          date.year,
        )();
        if (roll >= transition.chance) continue;
      }
      if (transition.check) {
        const result = resolveCheck(
          context.world,
          subject,
          transition.check,
          context.stateIndex,
          seededRng(
            context.world.seed,
            'state-transition-check',
            instance.id,
            transition.id,
            date.year,
          ),
          (tag) => countHistoryTag(context.world, subject.id, tag, date),
          date,
        );
        if (!result.success) continue;
      }
      stateTickFact(
        context,
        definition,
        instance,
        subject,
        date,
        `state_transition:${definition.id}/${transition.id}`,
        `${subject.name}从「${definition.title}」转入另一段处境：${transition.reason}`,
        [
          {
            type: 'state_transition',
            ownerType: instance.ownerType,
            ownerId: instance.ownerId,
            fromStateId: definition.id,
            toStateId: transition.to,
            instanceId: instance.id,
            reason: transition.reason,
          },
          ...(transition.effects ?? []),
        ],
        transition.reason,
      );
      break;
    }
    const current = context.world.states?.[instance.id];
    if (!current?.active) continue;
    for (const tick of definition.ticks ?? []) {
      if (!stateDueForTick(instance, tick.id, tick.everyMonths ?? 12, date)) continue;
      if (
        tick.conditions &&
        tick.conditions.length > 0 &&
        !conditionsPass(context.world, subject, tick.conditions, date)
      ) {
        continue;
      }
      const picked = stateTickOutcome(context, definition, tick, subject, date);
      if (!picked) continue;
      stateTickFact(
        context,
        definition,
        instance,
        subject,
        date,
        `state_tick:${definition.id}/${tick.id}/${picked.outcome.id}`,
        picked.outcome.text,
        picked.outcome.effects,
        picked.outcome.text.slice(0, 80),
        tick.id,
      );
    }
  }
}

/**
 * Event reactions are authored consequences of committed tags. They commit
 * their own fact with a cause id, and they can never rewrite the triggering
 * event. Recursion is capped by the caller.
 */
function runStateReactions(context: EngineContext, trigger: EventFact, depth: number): void {
  const states = context.world.states;
  if (!states) return;
  const started = Date.now();
  try {
    runStateReactionsInner(context, trigger, depth);
  } finally {
    context.stateReactionMs = (context.stateReactionMs ?? 0) + (Date.now() - started);
  }
}

function runStateReactionsInner(context: EngineContext, trigger: EventFact, depth: number): void {
  const states = context.world.states;
  if (!states) return;
  const people = [
    trigger.subjectId,
    ...trigger.participants.map((participant) => participant.personId),
  ].filter((id, index, list) => list.indexOf(id) === index);
  const lookup = stateLookupFor(context.world);
  const candidateMap = new Map<string, StateInstance>();
  const add = (instance: StateInstance | undefined) => {
    if (instance) candidateMap.set(instance.id, instance);
  };
  for (const personId of people) {
    const person = context.world.persons[personId];
    if (!person) continue;
    for (const instance of activeStates(
      context.world,
      'person',
      person.id,
      undefined,
      context.stateIndex,
      trigger.date,
    )) {
      add(instance);
    }
    for (const instance of activeStates(
      context.world,
      'household',
      person.householdId,
      undefined,
      context.stateIndex,
      trigger.date,
    )) {
      add(instance);
    }
    for (const instance of activeStates(
      context.world,
      'place',
      person.locationId,
      undefined,
      context.stateIndex,
      trigger.date,
    )) {
      add(instance);
    }
    const regionId = context.world.places[person.locationId]?.regionId;
    if (regionId) {
      for (const instance of activeStates(
        context.world,
        'region',
        regionId,
        undefined,
        context.stateIndex,
        trigger.date,
      )) {
        add(instance);
      }
    }
    for (const organizationId of lookup.orgsByPerson.get(person.id) ?? []) {
      for (const instance of activeStates(
        context.world,
        'organization',
        organizationId,
        undefined,
        context.stateIndex,
        trigger.date,
      )) {
        add(instance);
      }
    }
  }
  for (const instance of activeStates(
    context.world,
    'world',
    context.world.id,
    undefined,
    context.stateIndex,
    trigger.date,
  )) {
    add(instance);
  }
  const candidates = [...candidateMap.values()].sort((a, b) => a.id.localeCompare(b.id));
  for (const instance of candidates) {
    if (!instance.active) continue;
    const definition = context.stateIndex.byId.get(instance.definitionId);
    if (!definition) continue;
    const subject = stateAnchorFor(context, instance.ownerType, instance.ownerId);
    if (!subject) continue;
    for (const reaction of definition.reactions ?? []) {
      if (!instance.active) break;
      if (!reactionTriggered(trigger, reaction)) continue;
      if (
        reaction.requiresRoles &&
        !reaction.requiresRoles.every((role) =>
          trigger.participants.some((participant) => participant.role === role),
        )
      ) {
        continue;
      }
      if (reaction.requiresRoles?.includes('betrayer')) {
        const betrayers = trigger.participants
          .filter((participant) => participant.role === 'betrayer')
          .map((participant) => participant.personId)
          .filter((personId) => {
            const person = context.world.persons[personId];
            return Boolean(person && !person.died && personId !== subject.id);
          });
        if (betrayers.length === 0) continue;
      }
      if (
        !reactionAllowed(
          instance,
          reaction.id,
          trigger.date,
          reaction.cooldownMonths ?? 0,
          reaction.maxPerYear ?? 1,
        )
      ) {
        continue;
      }
      if (
        reaction.conditions &&
        reaction.conditions.length > 0 &&
        !conditionsPass(context.world, subject, reaction.conditions, trigger.date)
      ) {
        continue;
      }
      if (reaction.chance !== undefined) {
        const roll = seededRng(
          context.world.seed,
          'state-reaction-chance',
          instance.id,
          reaction.id,
          trigger.id,
        )();
        if (roll >= reaction.chance) continue;
      }
      let check: ReturnType<typeof resolveCheck> | undefined;
      if (reaction.check) {
        check = resolveCheck(
          context.world,
          subject,
          reaction.check,
          context.stateIndex,
          seededRng(
            context.world.seed,
            'state-reaction-check',
            instance.id,
            reaction.id,
            trigger.id,
          ),
          (tag) => countHistoryTag(context.world, subject.id, tag, trigger.date),
          trigger.date,
        );
      }
      const success = !check || check.success;
      const effects = bindStateEffectsToInstance(
        success ? reaction.effects : (reaction.failureEffects ?? []),
        instance,
      );
      if (effects.length === 0) continue;
      const roles: Record<Id, Id> = { subject: subject.id, owner: subject.id };
      for (const participant of trigger.participants) {
        if (!roles[participant.role]) roles[participant.role] = participant.personId;
      }
      const linked = linkedPersonRoles(context.world, instance);
      for (const [name, personId] of Object.entries(linked.roles)) {
        if (!roles[name]) roles[name] = personId;
      }
      if (instance.ownerType === 'organization') roles.ownerOrg = instance.ownerId;
      if (instance.ownerType === 'household') roles.ownerHousehold = instance.ownerId;
      const checked = check
        ? `（d20 ${check.die}${check.modifier >= 0 ? '+' : ''}${check.modifier}=${check.total} 对 DC ${check.dc}）`
        : '';
      const sourceText = success ? reaction.text : (reaction.failureText ?? reaction.text);
      const event = commitEvent(
        context,
        {
          date: { ...trigger.date },
          placeId: subject.locationId,
          subjectId: subject.id,
          participants: [
            { personId: subject.id, role: 'subject' },
            ...trigger.participants
              .filter((participant) => participant.personId !== subject.id)
              .map((participant) => ({
                personId: participant.personId,
                role: participant.role,
              })),
            ...linked.participants.filter(
              (participant) =>
                participant.personId !== subject.id &&
                !trigger.participants.some(
                  (triggerParticipant) => triggerParticipant.personId === participant.personId,
                ),
            ),
          ],
          action: `state_reaction:${definition.id}/${reaction.id}`,
          title: definition.title,
          tags: [
            definition.id,
            ...definition.tags,
            'state',
            'state_reaction',
            ...(trigger.tags ?? []),
          ],
          causes: [trigger.id],
          effects,
          immediateText:
            interpolateSceneText(sourceText, context.world, subject, roles, trigger.date) ||
            sourceText,
          significance: reaction.significance ?? 0.7,
          visibility: 'participants',
          provenance: { kind: 'system', sourceId: definition.id },
        },
        { roleIds: roles, fundingOrganizationIds: [] },
        false,
      );
      if (!event) continue;
      if (context.diagnostics.states) context.diagnostics.states.reactions += 1;
      instance.reactions ??= {};
      const previous = instance.reactions[reaction.id];
      instance.reactions[reaction.id] = {
        lastAt: { ...trigger.date },
        count: previous?.lastAt.year === trigger.date.year ? previous.count + 1 : 1,
      };
    }
  }
}

/**
 * Preflight the new Phase 15 critical effects. Existing critical effects keep
 * their historical behavior; a state/position/organisation fact must be
 * impossible to leave half-applied.
 */
function preflightPhase15Effect(
  context: EngineContext,
  effect: EventEffect,
  binding: EffectBinding,
  pendingOrganizationIds: Set<string> = new Set(),
): string | undefined {
  switch (effect.type) {
    case 'state_add': {
      const definition = stateDefinitionsFor(context).get(effect.stateId);
      if (!definition) return `unknown state ${effect.stateId}`;
      const problem = stateCreationProblem(
        context,
        definition,
        effect.ownerType,
        effect.ownerId,
        effect.links,
        binding.date,
      );
      return problem ? `${problem.code}: ${problem.message}` : undefined;
    }
    case 'state_transition': {
      const from = activeStateInstances(context, effect.ownerType, effect.ownerId).find(
        (instance) =>
          instance.definitionId === effect.fromStateId &&
          (!effect.instanceId || instance.id === effect.instanceId),
      );
      if (!from) return `missing source state ${effect.fromStateId}`;
      const target = stateDefinitionsFor(context).get(effect.toStateId);
      if (!target) return `unknown target state ${effect.toStateId}`;
      const problem = stateCreationProblem(
        context,
        target,
        effect.ownerType,
        effect.ownerId,
        effect.links ?? from.links,
        binding.date,
        from.id,
      );
      return problem ? `${problem.code}: ${problem.message}` : undefined;
    }
    case 'state_remove': {
      const matches = Object.values(context.world.states ?? {}).filter((instance) => {
        if (!instance.active) return false;
        if (instance.ownerType !== effect.ownerType || instance.ownerId !== effect.ownerId)
          return false;
        if (effect.instanceId && instance.id !== effect.instanceId) return false;
        if (effect.stateId && instance.definitionId !== effect.stateId) return false;
        if (effect.tag) {
          const definition = stateDefinitionsFor(context).get(instance.definitionId);
          if (!definition?.tags.includes(effect.tag)) return false;
        }
        return true;
      });
      return matches.length > 0 ? undefined : 'no matching active state';
    }
    case 'state_parameter': {
      const instance = activeStateInstances(context, effect.ownerType, effect.ownerId).find(
        (candidate) =>
          (effect.instanceId ? candidate.id === effect.instanceId : true) &&
          candidate.definitionId === effect.stateId,
      );
      if (!instance) return `missing state ${effect.stateId}`;
      const definition = stateDefinitionsFor(context).get(effect.stateId);
      return definition?.parameters?.[effect.key]
        ? undefined
        : `undefined parameter ${effect.stateId}.${effect.key}`;
    }
    case 'position': {
      if (effect.remove) {
        const found = Object.values(context.world.positions).some(
          (position) =>
            position.end === undefined &&
            position.holderId === effect.holderId &&
            (!effect.positionId || position.id === effect.positionId) &&
            (!effect.organizationId || position.organizationId === effect.organizationId) &&
            (!effect.title || position.title === effect.title),
        );
        return found ? undefined : 'no matching position to remove';
      }
      const organization = effect.organizationId
        ? context.world.organizations[effect.organizationId]
        : undefined;
      if (
        !organization &&
        !(effect.organizationId && pendingOrganizationIds.has(effect.organizationId))
      )
        return 'position requires an active organisation';
      const holder = effect.holderId ? context.world.persons[effect.holderId] : undefined;
      if (!holder || holder.died) return 'position requires a living holder';
      if (!effect.title || effect.title.trim().length === 0) return 'position title missing';
      if ((effect.authority?.length ?? 0) > 8) return 'too many authority grants';
      return undefined;
    }
    case 'organization_found': {
      if (!effect.organization?.name) return 'organisation name missing';
      if (!effect.organization.placeId && !context.world.persons[binding.subjectId]?.locationId)
        return 'organisation place missing';
      if (effect.organization.id && context.world.organizations[effect.organization.id])
        return 'organisation id already exists';
      return undefined;
    }
    default:
      return undefined;
  }
}

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
  // A story about a hiring, a school place, a birth, a move or a death must not
  // commit if that concrete change failed. Otherwise the prose says "hired"
  // while the ledger has no job, or "inherited" while no household received
  // anything. Critical effects are applied before texture effects, so a
  // rejected core change cannot leak a cash debit, flag or mood change into the
  // world without a committed fact.
  const criticalTypes = new Set<EventEffect['type']>([
    'employment',
    'unemployment',
    'education',
    'birth',
    'death',
    'move',
    'household',
    'residence',
    'estate',
    'organization_membership',
    'historical_process',
    'historical_participation',
    'state_add',
    'state_remove',
    'state_parameter',
    'state_transition',
    'position',
    'organization_found',
  ]);
  const indexedEffects = draft.effects.map((effect, index) => ({ effect, index }));
  const criticalEffects = indexedEffects.filter(({ effect }) => criticalTypes.has(effect.type));
  const textureEffects = indexedEffects.filter(({ effect }) => !criticalTypes.has(effect.type));
  const resolvedCritical = criticalEffects.map(({ effect, index }) => ({
    effect: resolveEffectRefs(effect, binding, context.world),
    index,
  }));
  const pendingOrganizationIds = new Set(
    resolvedCritical
      .filter(
        (
          entry,
        ): entry is {
          effect: Extract<EventEffect, { type: 'organization_found' }>;
          index: number;
        } => entry.effect.type === 'organization_found',
      )
      .map((entry) => entry.effect.organization.id)
      .filter((id): id is string => typeof id === 'string' && id.length > 0),
  );
  for (const { effect } of resolvedCritical) {
    const problem = preflightPhase15Effect(context, effect, binding, pendingOrganizationIds);
    if (problem) {
      warnContext(context, 'phase15_effect_preflight_failed', `${effect.type}: ${problem}`, {
        eventId: identity.id,
      });
      return undefined;
    }
  }
  const appliedByIndex: (EventEffect | undefined)[] = new Array(draft.effects.length);
  const applyOne = (effect: EventEffect, index: number): void => {
    try {
      const result = applyEffect(context, effect, binding);
      if (result) appliedByIndex[index] = result;
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
  };
  for (const { effect, index } of criticalEffects) applyOne(effect, index);
  if (
    criticalEffects.length > 0 &&
    !appliedByIndex.some((effect) => effect && criticalTypes.has(effect.type))
  ) {
    // Critical effects validate before mutating in the normal path; this early
    // return prevents a texture effect (cash, flag, mood) from leaking out of a
    // story the engine refuses to commit.
    return undefined;
  }
  for (const { effect, index } of textureEffects) applyOne(effect, index);
  const applied = appliedByIndex.filter((effect): effect is EventEffect => Boolean(effect));
  if (!force && applied.length === 0) return undefined;
  const nestedApplied = applied.flatMap((effect) => {
    if (effect.type === 'state_add')
      return [...(effect.replacedExitEffects ?? []), ...(effect.entryEffects ?? [])];
    if (effect.type === 'state_remove') return effect.exitEffects ?? [];
    if (effect.type === 'state_transition')
      return [...(effect.exitEffects ?? []), ...(effect.entryEffects ?? [])];
    if (effect.type === 'death') return effect.exitEffects ?? [];
    if (effect.type === 'birth') return effect.autoStateEffects ?? [];
    return [];
  });
  const allApplied = [...applied, ...nestedApplied];

  const knownEventIds = eventIdsFor(context);
  const causes = [...new Set(draft.causes ?? [])].filter((cause) => knownEventIds.has(cause));
  const dyingIds = new Set(
    allApplied
      .filter(
        (effect): effect is Extract<EventEffect, { type: 'death' }> => effect.type === 'death',
      )
      .map((effect) => effect.personId),
  );
  const participants = draft.participants
    .filter((participant) => {
      if (!participant || typeof participant.personId !== 'string') return false;
      const person = context.world.persons[participant.personId];
      if (!person) return false;
      // A corpse may appear only in the event that records that death. Stale
      // scheduled/followup scenes must not keep casting a dead participant.
      if (person.died && !dyingIds.has(person.id)) return false;
      return true;
    })
    .filter(
      (participant, index, all) =>
        all.findIndex((other) => other.personId === participant.personId) === index,
    );
  const event: EventFact = {
    id: identity.id,
    date: { ...draft.date },
    placeId: draft.placeId,
    subjectId: draft.subjectId,
    participants,
    action: draft.action,
    title: draft.title,
    tags: semanticEventTags(draft.action, allApplied, [
      ...(draft.tags ?? []),
      ...(draft.provenance.kind === 'project' ? ['project'] : []),
      ...(draft.provenance.kind === 'interaction' ? ['interaction'] : []),
      ...(draft.provenance.kind === 'system' && draft.action.startsWith('agency:')
        ? ['agency', draft.action]
        : []),
    ]),
    historyRefs: draft.historyRefs ? [...new Set(draft.historyRefs)] : undefined,
    causes,
    effects: allApplied,
    immediateText: draft.immediateText,
    significance: draft.significance,
    visibility: draft.visibility,
    sceneId: draft.sceneId,
    choices: draft.choices,
    provenance: draft.provenance,
    ...(draft.trace
      ? {
          trace: {
            ...draft.trace,
            effects: allApplied.map((effect) => ({
              type: effect.type,
              description:
                interpolateSceneText(
                  describeIncidentEffect(effect),
                  context.world,
                  subject,
                  binding.roleIds,
                  binding.date,
                ) || effect.type,
            })),
          },
        }
      : {}),
  };
  // A death effect may have been recorded after ordinary events already
  // committed earlier in the same annual draft. Anchor both the death date and
  // the event's canonical date to the latest such fact, so no event is dated
  // after the subject's death and no cause is dated after its consequence.
  const deathDates = allApplied
    .filter((effect): effect is Extract<EventEffect, { type: 'death' }> => effect.type === 'death')
    .map((effect) => context.world.persons[effect.personId]?.died)
    .filter((date): date is WorldDate => Boolean(date));
  for (const date of deathDates) {
    if (monthIndex(date) > monthIndex(event.date)) event.date = { ...date };
  }
  if (event.trace) {
    event.trace.causes = causes
      .map((causeId) => context.world.events.find((candidate) => candidate.id === causeId))
      .filter((cause): cause is EventFact => Boolean(cause))
      .map((cause) => ({
        eventId: cause.id,
        action: cause.action,
        date: { ...cause.date },
      }));
  }
  context.world.events.push(event);
  knownEventIds.add(event.id);
  rememberHistory(context.world, event);
  // Shared incidents become part of every existing relationship between the
  // subject and the people present, even when the scene did not author a
  // second relation effect. Later reunion/trust conditions can read this.
  for (const participant of event.participants) {
    if (participant.personId === event.subjectId) continue;
    for (const relation of relationsFor(context.world, event.subjectId)) {
      const otherId = relation.a === event.subjectId ? relation.b : relation.a;
      if (otherId !== participant.personId) continue;
      if (!relation.sharedEventIds.includes(event.id)) relation.sharedEventIds.push(event.id);
    }
  }
  rememberEventMonth(context, event.subjectId, event.date);
  for (const participant of event.participants) {
    rememberEventMonth(context, participant.personId, event.date);
  }
  scheduleFactTriggers(context, event, draft.triggerDepth ?? 0);
  context.world.historyMeta.sequence = identity.sequence;
  context.world.historyMeta.lastEventId = event.id;
  context.newEvents.push(event);
  if (
    context.stateIndex.all.length > 0 &&
    !draft.action.startsWith('state_reaction:') &&
    !draft.action.startsWith('state_tick:') &&
    !draft.action.startsWith('state_expire')
  ) {
    const depth = context.stateReactionDepth ?? 0;
    if (depth < 2) {
      context.stateReactionDepth = depth + 1;
      try {
        runStateReactions(context, event, depth);
      } finally {
        context.stateReactionDepth = depth;
      }
    }
  }
  return event;
}

/**
 * The office a person is currently exercising. A person may hold several real
 * positions (a party office, a municipal post, a workshop foreman). Content
 * that says "sign the budget" should act through the most recently acquired
 * live position rather than whichever position happens to be first in the
 * object map. This is a scheduling convention, not a new authority system.
 */
function activePositionFor(world: WorldState, personId: Id): Position | undefined {
  let best: Position | undefined;
  let bestStart = -Infinity;
  for (const position of Object.values(world.positions)) {
    if (position.holderId !== personId || position.end !== undefined) continue;
    const start = position.start ? position.start.year * 12 + position.start.month : -Infinity;
    if (
      !best ||
      start > bestStart ||
      (start === bestStart && position.id.localeCompare(best.id) > 0)
    ) {
      best = position;
      bestStart = start;
    }
  }
  return best;
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
    case 'owner':
      return binding.roleIds.owner ?? binding.subjectId;
    case 'positionOrg':
      return activePositionFor(world, binding.subjectId)?.organizationId;
    case 'positionId':
      return activePositionFor(world, binding.subjectId)?.id;
    case 'positionTitle':
      return activePositionFor(world, binding.subjectId)?.title;
    default: {
      // A state may hold a typed link (lover, creditor, patron, master). Effects
      // can target it with $link:lover without a second target system.
      if (key.startsWith('link:') || key.startsWith('link.')) {
        const linkName = key.slice(5);
        const subjectId = binding.subjectId;
        for (const instance of Object.values(world.states ?? {})) {
          if (!instance.active) continue;
          if (instance.ownerType !== 'person' || instance.ownerId !== subjectId) continue;
          const linked = instance.links?.[linkName];
          if (linked) return linked;
        }
      }
      return binding.roleIds[key];
    }
  }
}

function resolveEffectRef(value: unknown, binding: EffectBinding, world: WorldState): unknown {
  if (typeof value !== 'string' || !value.includes('$')) return value;
  // A whole-string ref may legitimately resolve to a non-string (or undefined);
  // an embedded ref (e.g. `courtship:$eventId`) must stay a string and remain
  // unique per event. Failing to expand embedded refs collapsed every courtship
  // interaction onto one id and silently dropped later proposals.
  if (/^\$[A-Za-z0-9_.:]+$/.test(value)) return resolveRefKey(value.slice(1), binding, world);
  return value.replace(/\$([A-Za-z0-9_.:]+)/g, (match, key: string) => {
    const resolved = resolveRefKey(key, binding, world);
    return typeof resolved === 'string' && resolved.length > 0 ? resolved : match;
  });
}

function resolveHistoricalProcessRef(
  world: WorldState,
  subjectId: Id,
  value: string,
): string | undefined {
  if (!value.startsWith('historical:')) return undefined;
  const kind = value.slice('historical:'.length);
  const subject = world.persons[subjectId];
  if (!subject) return undefined;
  const regionId = regionIdForPerson(world, subject);
  const candidates = Object.values(world.macro?.developments ?? {})
    .filter(
      (development) =>
        development.historical?.kind === kind &&
        development.status !== 'ended' &&
        development.status !== 'blocked' &&
        development.historical.regionIds.includes(regionId),
    )
    .sort(
      (a, b) => b.severity - a.severity || a.start.year - b.start.year || a.id.localeCompare(b.id),
    );
  return candidates[0]?.id;
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
  if (bound.type === 'state_add' || bound.type === 'state_transition') {
    if (isRecord(bound.links)) {
      bound.links = Object.fromEntries(
        Object.entries(bound.links)
          .map(([key, value]) => [key, resolveEffectRef(value, binding, world)])
          .filter(([, value]) => typeof value === 'string' && value.length > 0),
      );
    }
    if (isRecord(bound.parameters)) {
      bound.parameters = Object.fromEntries(
        Object.entries(bound.parameters).map(([key, value]) => [
          key,
          typeof value === 'string' && value.includes('$')
            ? resolveEffectRef(value, binding, world)
            : value,
        ]),
      );
    }
  }
  if (bound.type === 'organization_found' && isRecord(bound.organization)) {
    const organization = { ...bound.organization } as Record<string, unknown>;
    for (const key of ['id', 'placeId']) {
      if (typeof organization[key] === 'string')
        organization[key] = resolveEffectRef(organization[key], binding, world);
    }
    bound.organization = organization;
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
  if (typeof bound.processId === 'string') {
    const resolved = resolveHistoricalProcessRef(world, binding.subjectId, bound.processId);
    if (resolved) bound.processId = resolved;
  }
  for (const key of [
    'personId',
    'householdId',
    'locationId',
    'workplaceId',
    'organizationId',
    'a',
    'b',
    'heirHouseholdId',
    'holderId',
    'ownerId',
  ]) {
    if (typeof bound[key] === 'string') {
      const resolved = resolveEffectRef(bound[key], binding, world);
      if (resolved !== undefined) bound[key] = resolved;
    }
  }
  // `$workplace` describes the job the subject is about to take, so it cannot
  // resolve from the subject's current employment. Use the hiring
  // organization's own place; if even that is absent, applyEmployment rejects
  // the effect instead of committing a person with a dangling workplace.
  if (bound.type === 'employment') {
    let organization =
      typeof bound.organizationId === 'string'
        ? world.organizations[bound.organizationId]
        : undefined;
    // Some older content names a foreman/master as the "employer" role. The
    // person is not an organization; use their employer, or the organization
    // that owns the place where they work.
    if (!organization && typeof bound.organizationId === 'string') {
      const person = world.persons[bound.organizationId];
      if (person?.employment) {
        organization = world.organizations[person.employment.organizationId];
      }
      if (!organization && person) {
        const workplaceId = person.employment?.workplaceId ?? person.locationId;
        organization = Object.values(world.organizations)
          .filter((candidate) => candidate.status === 'active' && candidate.placeId === workplaceId)
          .sort((a, b) => a.id.localeCompare(b.id))[0];
      }
      if (organization) bound.organizationId = organization.id;
    }
    if (
      typeof bound.workplaceId === 'string' &&
      bound.workplaceId.startsWith('$') &&
      organization?.placeId
    ) {
      bound.workplaceId = organization.placeId;
    }
  }
  // A knowledge source is optional. An uncosted clerk or doctor must not erase
  // the proposition the subject actually learned.
  if (
    bound.type === 'knowledge' &&
    typeof bound.personId === 'string' &&
    bound.personId.startsWith('$')
  ) {
    delete bound.personId;
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
    'heirHouseholdId',
    'holderId',
    'processId',
    'ownerId',
    'positionId',
  ];
  const unresolved = refKeys.find((key) => {
    const value = (effect as unknown as Record<string, unknown>)[key];
    return typeof value === 'string' && value.startsWith('$');
  });
  if (unresolved) {
    // A minor effect aimed at an optional role may legitimately have no target.
    // Skip it quietly; the scene's concrete major effects still decide whether
    // the incident can commit.
    const optionalTargetTypes = new Set<EventEffect['type']>([
      'health',
      'mood',
      'reputation',
      'skill',
      'condition',
      'knowledge',
      'flag',
      'food',
    ]);
    if (optionalTargetTypes.has(effect.type)) return undefined;
    warnContext(
      context,
      'unresolved_effect_ref',
      `effect ${effect.type} has unresolved ${String(unresolved)}: ${JSON.stringify(effect).slice(0, 240)}`,
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
    case 'knowledge':
      return applyKnowledge(context, effect, binding);
    case 'historical_participation':
      return applyHistoricalParticipation(context, effect, binding);
    case 'historical_influence':
      return applyHistoricalInfluence(context, effect, binding);
    case 'historical_process':
      return applyHistoricalProcess(context, effect, binding);
    case 'estate':
      return applyEstate(context, effect, binding);
    case 'organization_funds':
      return applyOrganizationFunds(context, effect, binding);
    case 'state_add':
      return applyStateAdd(context, effect, binding);
    case 'state_remove':
      return applyStateRemove(context, effect, binding);
    case 'state_parameter':
      return applyStateParameter(context, effect, binding);
    case 'state_transition':
      return applyStateTransition(context, effect, binding);
    case 'position':
      return applyPosition(context, effect, binding);
    case 'organization_found':
      return applyOrganizationFound(context, effect, binding);
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
    const shortfall = roundMoney(-amount - debit);
    if (debit > 0) household.cash = roundMoney(household.cash - debit);
    // Necessary costs do not vanish because the purse is empty. The unpaid
    // remainder becomes household debt, and the committed effect keeps the full
    // authored cost so narration and audit agree on the price.
    if (shortfall > 0) household.debt = roundMoney(household.debt + shortfall);
    return {
      ...effect,
      amount,
      reason: shortfall > 0 ? `${effect.reason}（其中${shortfall}克朗记入债务）` : effect.reason,
    };
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
  if (!person) {
    warnContext(context, 'effect_on_dead_or_missing', 'health effect skipped', {
      personId: effect.personId,
      eventId: binding.eventId,
    });
    return undefined;
  }
  // A corpse cannot receive a minor health tweak; this is a normal consequence
  // of a death earlier in the same incident, not a corrupt reference.
  if (person.died) return undefined;
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
  if (!person) {
    warnContext(context, 'effect_on_dead_or_missing', 'condition effect skipped', {
      personId: effect.personId,
      eventId: binding.eventId,
    });
    return undefined;
  }
  if (person.died) return undefined;
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
  touchRelationRevision(context.world);
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

function applyKnowledge(
  context: EngineContext,
  effect: Extract<EventEffect, { type: 'knowledge' }>,
  binding: EffectBinding,
): EventEffect | undefined {
  const holder = context.world.persons[effect.holderId];
  if (!holder || holder.died) return undefined;
  const proposition = effect.proposition.trim();
  if (proposition.length < 3 || proposition.length > 280) return undefined;
  const confidence = Math.max(0, Math.min(1, effect.confidence));
  if (!Number.isFinite(confidence)) return undefined;
  const id = `knowledge:${context.world.id}:${binding.eventId}:${effect.holderId}`;
  if (context.world.knowledge[id]) return undefined;
  const knowledge: Knowledge = {
    id,
    holderId: effect.holderId,
    proposition,
    confidence,
    source: {
      kind: effect.sourceKind,
      eventId: binding.eventId,
      personId: effect.personId,
    },
    observed: { ...binding.date },
    visibility: effect.visibility,
    trueInWorld: effect.trueInWorld,
  };
  context.world.knowledge[id] = knowledge;
  if (!holder.knowledgeIds.includes(id)) holder.knowledgeIds.push(id);
  return { ...effect };
}

function applyHistoricalParticipation(
  context: EngineContext,
  effect: Extract<EventEffect, { type: 'historical_participation' }>,
  binding: EffectBinding,
): EventEffect | undefined {
  const state = context.world.macro;
  if (!state) return undefined;
  const process = recordHistoricalParticipation(context.world, state, {
    processId: effect.processId,
    personId: effect.personId,
    role: effect.role,
    influence: effect.influence,
    eventId: binding.eventId,
    date: binding.date,
  });
  return process ? { ...effect } : undefined;
}

function applyHistoricalInfluence(
  context: EngineContext,
  effect: Extract<EventEffect, { type: 'historical_influence' }>,
  binding: EffectBinding,
): EventEffect | undefined {
  const state = context.world.macro;
  if (!state) return undefined;
  if (!HISTORICAL_METRIC_KEYS.includes(effect.dimension)) return undefined;
  const process = recordHistoricalInfluence(state, {
    processId: effect.processId,
    dimension: effect.dimension,
    amount: effect.amount,
    eventId: binding.eventId,
    date: binding.date,
  });
  return process ? { ...effect } : undefined;
}

function applyHistoricalProcess(
  context: EngineContext,
  effect: Extract<EventEffect, { type: 'historical_process' }>,
  binding: EffectBinding,
): EventEffect | undefined {
  const input = effect.process;
  if (!input || !isRecord(input)) return undefined;
  if (typeof input.id !== 'string' || !/^[a-zA-Z0-9:_-]{1,160}$/.test(input.id)) return undefined;
  if (context.world.macro?.developments?.[input.id]) return undefined;
  if (
    !input.kind ||
    !HISTORICAL_PROCESS_KINDS.includes(input.kind) ||
    typeof input.title !== 'string' ||
    typeof input.description !== 'string'
  )
    return undefined;
  if (input.description.length < 8 || input.description.length > 500) return undefined;
  if (
    input.organizationId !== undefined &&
    (!context.world.organizations[input.organizationId] ||
      context.world.organizations[input.organizationId]!.status !== 'active')
  )
    return undefined;
  const regionId = input.regionId ?? 'region-lower-austria';
  if (!context.world.macro?.regions[regionId]) return undefined;
  const eventFamilyIds = Array.isArray(input.eventFamilyIds)
    ? input.eventFamilyIds.filter(
        (id): id is string => typeof id === 'string' && id.length > 0 && id.length <= 160,
      )
    : [];
  const sourceIds = Array.isArray(input.sourceIds)
    ? input.sourceIds.filter(
        (id): id is string => typeof id === 'string' && id.length > 0 && id.length <= 160,
      )
    : [];
  const development: WorldDevelopment = {
    id: input.id,
    type:
      input.kind === 'war_mobilization'
        ? 'war'
        : input.kind === 'public_health_crisis'
          ? 'epidemic'
          : input.kind === 'social_movement'
            ? 'social_change'
            : input.kind === 'political_repression'
              ? 'political_unrest'
              : input.kind === 'economic_crisis'
                ? 'economic_change'
                : 'other',
    regionId,
    description: input.description,
    severity: 0.5,
    start: { ...binding.date },
    end: addMonths(binding.date, 120),
    status: 'active' as const,
    eventFamilyIds,
    organizationId: input.organizationId,
    source: `event:${binding.eventId}`,
  };
  const historical = ensureHistoricalProcess(development, binding.date);
  historical.source = 'event';
  historical.kind = input.kind;
  historical.phase = 'emerging';
  historical.phaseStarted = { ...binding.date };
  historical.objectives = (input.objectives ?? [])
    .filter((item): item is string => typeof item === 'string' && item.length > 0)
    .slice(0, 6)
    .map((item) => item.slice(0, 200));
  historical.sourceIds = sourceIds.slice(0, 8);
  development.historical = historical;
  context.world.macro.developments![input.id] = development;
  for (const familyId of eventFamilyIds.slice(0, 8)) {
    const existing = context.world.macro.eventPool[familyId];
    context.world.macro.eventPool[familyId] = {
      familyId,
      enabled: true,
      weightMultiplier: Math.max(existing?.weightMultiplier ?? 1, 1.15),
      source: `historical-event:${binding.eventId}`,
      updatedAt: { ...binding.date },
    };
  }
  return { ...effect };
}

function applyOrganizationFunds(
  context: EngineContext,
  effect: Extract<EventEffect, { type: 'organization_funds' }>,
  binding: EffectBinding,
): EventEffect | undefined {
  const organization = context.world.organizations[effect.organizationId];
  if (!organization || organization.status !== 'active') return undefined;
  if (!Number.isFinite(effect.amount) || effect.amount === 0) return undefined;
  const amount = roundMoney(effect.amount);
  if (amount < 0) {
    const debit = roundMoney(Math.min(organization.treasury, -amount));
    if (debit <= 0) return undefined;
    organization.treasury = roundMoney(organization.treasury - debit);
    return { ...effect, amount: -debit };
  }
  if (typeof effect.reason !== 'string' || effect.reason.trim().length === 0) return undefined;
  organization.treasury = roundMoney(organization.treasury + amount);
  return { ...effect };
}

function slugKey(value: string): string {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fff]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 48) || 'x'
  );
}

function nextStateSequence(context: EngineContext): number {
  const next = (context.world.historyMeta.stateSequence ?? 0) + 1;
  context.world.historyMeta.stateSequence = next;
  return next;
}

function stateDefinitionsFor(context: EngineContext): Map<string, StateDefinition> {
  return context.stateIndex.byId;
}

function activeStateInstances(
  context: EngineContext,
  ownerType: StateOwnerType,
  ownerId: string,
): StateInstance[] {
  return activeStates(
    context.world,
    ownerType,
    ownerId,
    undefined,
    context.stateIndex,
    context.world.date,
  );
}

function stateAnchorFor(
  context: EngineContext,
  ownerType: StateOwnerType,
  ownerId: string,
): Person | undefined {
  return stateAnchorPerson(context.world, ownerType, ownerId);
}

function applyNestedStateEntryEffects(
  context: EngineContext,
  effects: EventEffect[] | undefined,
  binding: EffectBinding,
): EventEffect[] {
  const applied: EventEffect[] = [];
  for (const effect of effects ?? []) {
    // Nested state changes on enter/exit would make creation recursively
    // dependent on itself and are hard to replay. Authors put those in a tick.
    if (
      effect.type === 'state_add' ||
      effect.type === 'state_remove' ||
      effect.type === 'state_transition' ||
      effect.type === 'state_parameter'
    ) {
      warnContext(context, 'nested_state_effect_ignored', `onEnter/onExit ${effect.type}`, {
        eventId: binding.eventId,
      });
      continue;
    }
    try {
      const result = applyEffect(context, effect, binding);
      if (result) applied.push(result);
    } catch (error) {
      warnContext(context, 'state_entry_effect_failed', String(error), {
        eventId: binding.eventId,
      });
    }
  }
  return applied;
}

function endStateInstance(
  context: EngineContext,
  instance: StateInstance,
  date: WorldDate,
  reason: string,
  binding: EffectBinding,
): EventEffect[] {
  if (!instance.active) return [];
  instance.active = false;
  instance.endedAt = { ...date };
  instance.endReason = reason;
  touchStateRevision(context.world);
  if (context.diagnostics.states) context.diagnostics.states.removed += 1;
  const definition = stateDefinitionsFor(context).get(instance.definitionId);
  return definition ? applyNestedStateEntryEffects(context, definition.onExit, binding) : [];
}

type StateCreationProblem = { code: string; message: string };

function stateCreationProblem(
  context: EngineContext,
  definition: StateDefinition,
  ownerType: StateOwnerType,
  ownerId: string,
  links: Record<string, string> | undefined,
  date: WorldDate,
  ignoreInstanceId?: string,
): StateCreationProblem | undefined {
  if (definition.owner !== ownerType) {
    return {
      code: 'state_owner_type_mismatch',
      message: `${definition.id} owner is ${definition.owner}`,
    };
  }
  if (!stateOwnerExists(context.world, ownerType, ownerId)) {
    return { code: 'state_owner_missing', message: `${ownerType}:${ownerId}` };
  }
  if (ownerType === 'person') {
    const person = context.world.persons[ownerId];
    if (!person || person.died) return { code: 'state_owner_dead', message: ownerId };
  }
  const anchor = stateAnchorFor(context, ownerType, ownerId);
  if ((definition.enterConditions?.length ?? 0) > 0) {
    if (!anchor || !conditionsPass(context.world, anchor, definition.enterConditions, date)) {
      return { code: 'state_entry_conditions_failed', message: definition.id };
    }
  }
  for (const [key, expected] of Object.entries(definition.links ?? {})) {
    const value = links?.[key];
    if (!value) continue;
    if (!stateOwnerExists(context.world, expected, value)) {
      return { code: 'state_link_missing', message: `${definition.id}.${key} -> ${value}` };
    }
  }
  if (definition.slot) {
    const occupants = activeStateInstances(context, ownerType, ownerId).filter((instance) => {
      if (ignoreInstanceId && instance.id === ignoreInstanceId) return false;
      const other = stateDefinitionsFor(context).get(instance.definitionId);
      return other?.slot === definition.slot;
    });
    if (occupants.length > 0) {
      const conflict = definition.conflict ?? 'block';
      if (conflict === 'block')
        return { code: 'state_slot_conflict', message: `${definition.id} slot ${definition.slot}` };
      if (conflict === 'stack') {
        const same = occupants.filter((instance) => instance.definitionId === definition.id);
        if (same.length >= (definition.maxStacks ?? 2))
          return { code: 'state_stack_limit', message: definition.id };
      }
    }
  }
  return undefined;
}

type CreatedState = {
  instance: StateInstance;
  entryEffects: EventEffect[];
  replacedExitEffects: EventEffect[];
};

/** Shared creation path for state_add and state_transition. */
function createStateInstance(
  context: EngineContext,
  definition: StateDefinition,
  ownerType: StateOwnerType,
  ownerId: string,
  parameters: Record<string, string | number | boolean> | undefined,
  links: Record<string, string> | undefined,
  durationMonths: number | undefined,
  binding: EffectBinding,
): CreatedState | undefined {
  const problem = stateCreationProblem(
    context,
    definition,
    ownerType,
    ownerId,
    links,
    binding.date,
  );
  if (problem) {
    if (context.diagnostics.states) context.diagnostics.states.blockedAdds += 1;
    warnContext(context, problem.code, problem.message, {
      eventId: binding.eventId,
    });
    return undefined;
  }
  const anchor = stateAnchorFor(context, ownerType, ownerId);
  const current = activeStateInstances(context, ownerType, ownerId);
  const replacedExitEffects: EventEffect[] = [];
  const slot = definition.slot;
  if (slot) {
    const occupants = current.filter((instance) => {
      const other = stateDefinitionsFor(context).get(instance.definitionId);
      return other?.slot === slot;
    });
    if (occupants.length > 0) {
      const conflict = definition.conflict ?? 'block';
      if (conflict === 'replace') {
        for (const occupant of occupants) {
          replacedExitEffects.push(
            ...endStateInstance(
              context,
              occupant,
              binding.date,
              `replaced_by:${definition.id}`,
              binding,
            ),
          );
        }
      }
    }
  }
  const rng = seededRng(
    context.world.seed,
    'state-duration',
    definition.id,
    ownerId,
    binding.eventId,
  );
  const months = stateDuration(definition, rng, durationMonths);
  const normalizedLinks: Record<string, string> = {};
  for (const [key, expected] of Object.entries(definition.links ?? {})) {
    const value = links?.[key];
    if (!value) continue;
    if (!stateOwnerExists(context.world, expected, value)) {
      if (context.diagnostics.states) context.diagnostics.states.blockedAdds += 1;
      warnContext(context, 'state_link_missing', `${definition.id}.${key} -> ${value}`, {
        eventId: binding.eventId,
      });
      return undefined;
    }
    normalizedLinks[key] = value;
  }
  const instance: StateInstance = {
    id: `state:${context.world.id}:${nextStateSequence(context)}`,
    definitionId: definition.id,
    version: definition.version,
    ownerType,
    ownerId,
    since: { ...binding.date },
    parameters: normalizeStateParameters(definition, parameters),
    ...(Object.keys(normalizedLinks).length > 0 ? { links: normalizedLinks } : {}),
    sourceEventId: binding.eventId,
    active: true,
    tickCount: 0,
    ...(months !== undefined ? { expiresAt: addMonths(binding.date, Math.max(1, months)) } : {}),
  };
  context.world.states ??= {};
  context.world.states[instance.id] = instance;
  touchStateRevision(context.world);
  if (context.diagnostics.states) context.diagnostics.states.added += 1;
  const entryEffects = applyNestedStateEntryEffects(context, definition.onEnter, binding);
  return { instance, entryEffects, replacedExitEffects };
}

function applyStateAdd(
  context: EngineContext,
  effect: Extract<EventEffect, { type: 'state_add' }>,
  binding: EffectBinding,
): EventEffect | undefined {
  const definition = stateDefinitionsFor(context).get(effect.stateId);
  if (!definition) {
    warnContext(context, 'unknown_state', effect.stateId, { eventId: binding.eventId });
    return undefined;
  }
  const created = createStateInstance(
    context,
    definition,
    effect.ownerType,
    effect.ownerId,
    effect.parameters,
    effect.links,
    effect.durationMonths,
    binding,
  );
  if (!created) return undefined;
  return {
    ...effect,
    instanceId: created.instance.id,
    definitionVersion: definition.version,
    ...(created.replacedExitEffects.length > 0
      ? { replacedExitEffects: created.replacedExitEffects }
      : {}),
    ...(created.entryEffects.length > 0 ? { entryEffects: created.entryEffects } : {}),
    reason: effect.reason,
  };
}

function applyStateRemove(
  context: EngineContext,
  effect: Extract<EventEffect, { type: 'state_remove' }>,
  binding: EffectBinding,
): EventEffect | undefined {
  const matches = Object.values(context.world.states ?? {}).filter(
    (instance) => {
      if (!instance.active) return false;
      if (instance.ownerType !== effect.ownerType || instance.ownerId !== effect.ownerId)
        return false;
      if (effect.instanceId && instance.id !== effect.instanceId) return false;
      if (effect.stateId && instance.definitionId !== effect.stateId) return false;
      if (effect.tag) {
        const definition = stateDefinitionsFor(context).get(instance.definitionId);
        if (!definition?.tags.includes(effect.tag)) return false;
      }
      return true;
    },
  );
  if (matches.length === 0) return undefined;
  const exitEffects: EventEffect[] = [];
  for (const instance of matches) {
    exitEffects.push(...endStateInstance(context, instance, binding.date, effect.reason, binding));
  }
  return {
    ...effect,
    instanceId: matches[0]?.id,
    instanceIds: matches.map((instance) => instance.id),
    definitionVersion: matches[0]
      ? stateDefinitionsFor(context).get(matches[0].definitionId)?.version
      : undefined,
    ...(exitEffects.length > 0 ? { exitEffects } : {}),
  };
}

function applyStateParameter(
  context: EngineContext,
  effect: Extract<EventEffect, { type: 'state_parameter' }>,
  binding: EffectBinding,
): EventEffect | undefined {
  const instance = activeStateInstances(context, effect.ownerType, effect.ownerId).find(
    (candidate) =>
      (effect.instanceId ? candidate.id === effect.instanceId : true) &&
      candidate.definitionId === effect.stateId,
  );
  if (!instance) return undefined;
  const definition = stateDefinitionsFor(context).get(effect.stateId);
  const spec = definition?.parameters?.[effect.key];
  if (!spec) return undefined;
  const previous = instance.parameters[effect.key];
  if (spec.type === 'number') {
    const before =
      typeof instance.parameters[effect.key] === 'number'
        ? (instance.parameters[effect.key] as number)
        : ((spec.default as number | undefined) ?? 0);
    const delta =
      typeof effect.delta === 'number' && Number.isFinite(effect.delta) ? effect.delta : 0;
    const value = typeof effect.value === 'number' ? effect.value : before + delta;
    instance.parameters[effect.key] = Math.max(spec.min ?? -1e9, Math.min(spec.max ?? 1e9, value));
  } else if (spec.type === 'boolean') {
    if (typeof effect.value === 'boolean') instance.parameters[effect.key] = effect.value;
  } else if (typeof effect.value === 'string') {
    instance.parameters[effect.key] = effect.value.slice(0, 120);
  } else {
    return undefined;
  }
  return {
    ...effect,
    instanceId: instance.id,
    ...(previous !== undefined ? { previous } : {}),
    final: instance.parameters[effect.key],
  };
}

function applyStateTransition(
  context: EngineContext,
  effect: Extract<EventEffect, { type: 'state_transition' }>,
  binding: EffectBinding,
): EventEffect | undefined {
  const from = activeStateInstances(context, effect.ownerType, effect.ownerId).find(
    (instance) =>
      instance.definitionId === effect.fromStateId &&
      (!effect.instanceId || instance.id === effect.instanceId),
  );
  if (!from) return undefined;
  const target = stateDefinitionsFor(context).get(effect.toStateId);
  if (!target) return undefined;
  // Validate the target before ending the source. A failed transition must
  // leave the original state intact.
  const problem = stateCreationProblem(
    context,
    target,
    effect.ownerType,
    effect.ownerId,
    effect.links ?? from.links,
    binding.date,
    from.id,
  );
  if (problem) {
    warnContext(context, problem.code, problem.message, { eventId: binding.eventId });
    return undefined;
  }
  const exitEffects = endStateInstance(context, from, binding.date, effect.reason, binding);
  const created = createStateInstance(
    context,
    target,
    effect.ownerType,
    effect.ownerId,
    effect.parameters ?? from.parameters,
    effect.links ?? from.links,
    undefined,
    binding,
  );
  if (!created) return undefined;
  if (context.diagnostics.states) context.diagnostics.states.transitions += 1;
  const allExitEffects = [...exitEffects, ...created.replacedExitEffects];
  return {
    ...effect,
    instanceId: from.id,
    toInstanceId: created.instance.id,
    definitionVersion: target.version,
    ...(allExitEffects.length > 0 ? { exitEffects: allExitEffects } : {}),
    ...(created.entryEffects.length > 0 ? { entryEffects: created.entryEffects } : {}),
  };
}

function applyPosition(
  context: EngineContext,
  effect: Extract<EventEffect, { type: 'position' }>,
  binding: EffectBinding,
): EventEffect | undefined {
  const organization = effect.organizationId
    ? context.world.organizations[effect.organizationId]
    : undefined;
  if (!effect.remove && (!organization || organization.status !== 'active')) return undefined;
  if (effect.remove) {
    const position =
      (effect.positionId ? context.world.positions[effect.positionId] : undefined) ??
      Object.values(context.world.positions).find(
        (candidate) =>
          candidate.end === undefined &&
          candidate.holderId === effect.holderId &&
          (!organization || candidate.organizationId === organization.id) &&
          (!effect.title || candidate.title === effect.title),
      );
    if (!position) return undefined;
    position.holderId = undefined;
    position.end = { ...binding.date };
    return {
      ...effect,
      organizationId: position.organizationId,
      positionId: position.id,
      title: position.title,
    };
  }
  if (!organization) return undefined;
  const holder = effect.holderId ? context.world.persons[effect.holderId] : undefined;
  if (!holder || holder.died) return undefined;
  if (typeof effect.title !== 'string' || effect.title.trim().length === 0) return undefined;
  const existing = organization.positions
    .map((id) => context.world.positions[id])
    .find(
      (candidate) =>
        candidate && candidate.end === undefined && candidate.title === effect.title.trim(),
    );
  const id =
    existing?.id ??
    `pos:${organization.id}:${slugKey(effect.title)}:${context.world.historyMeta.sequence + 1}`;
  const position = existing ?? {
    id,
    organizationId: organization.id,
    title: effect.title.trim(),
    holderId: holder.id,
    authority: (effect.authority ?? []).slice(0, 8),
    wage: effect.wage,
    start: { ...binding.date },
  };
  if (existing) {
    existing.holderId = holder.id;
    existing.start = { ...binding.date };
    if (effect.authority) existing.authority = effect.authority.slice(0, 8);
    if (effect.wage !== undefined) existing.wage = effect.wage;
  } else {
    context.world.positions[position.id] = position;
    organization.positions.push(position.id);
  }
  if (!organization.memberIds.includes(holder.id)) organization.memberIds.push(holder.id);
  const officeRole = `office:${slugKey(effect.title)}`;
  if (!holder.roles.includes(officeRole)) holder.roles.push(officeRole);
  touchOrganizationRevision(context.world);
  return {
    ...effect,
    positionId: position.id,
    title: position.title,
    holderId: holder.id,
  };
}

function applyOrganizationFound(
  context: EngineContext,
  effect: Extract<EventEffect, { type: 'organization_found' }>,
  binding: EffectBinding,
): EventEffect | undefined {
  const subject = context.world.persons[binding.subjectId];
  if (!subject || subject.died) return undefined;
  if (!effect.organization?.name || !effect.organization.kind) return undefined;
  if (
    ![
      'household_firm',
      'factory',
      'school',
      'union',
      'party',
      'army',
      'state',
      'church',
      'other',
    ].includes(effect.organization.kind)
  ) {
    return undefined;
  }
  const placeId = effect.organization.placeId ?? subject.locationId;
  if (!context.world.places[placeId]) return undefined;
  const id =
    effect.organization.id ??
    `org:${context.world.id}:${slugKey(effect.organization.name)}:${nextStateSequence(context)}`;
  if (context.world.organizations[id]) return undefined;
  const organization: Organization = {
    id,
    name: effect.organization.name.slice(0, 120),
    kind: effect.organization.kind,
    placeId,
    memberIds: [subject.id],
    positions: [],
    treasury: Math.max(0, roundMoney(effect.organization.treasury ?? 0)),
    monthlyRevenue: 0,
    authorityRules: (effect.organization.authorityRules ?? []).slice(0, 8),
    projects: [],
    status: 'active',
    causeIds: [binding.eventId],
  };
  context.world.organizations[id] = organization;
  touchOrganizationRevision(context.world);
  return {
    ...effect,
    organization: { ...effect.organization, id, placeId },
  };
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
  const workplaceId = context.world.places[effect.workplaceId]
    ? effect.workplaceId
    : organization.placeId;
  if (!context.world.places[workplaceId]) return undefined;
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
    workplaceId,
  };
  return { ...effect, workplaceId, wage: person.employment.wage };
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
  // An optional role that was not cast leaves its `$role` token unresolved. The
  // scene's other effects still commit; this relation is simply absent. Do not
  // count it as a corrupt relation against a real person.
  if (effect.a.startsWith('$') || effect.b.startsWith('$')) return undefined;
  let aId = effect.a;
  let bId = effect.b;
  // Legacy content sometimes casts an organization in the `employer` role and
  // then writes a person relation to it. Use the organization's actual
  // representative; a relation remains a fact between people.
  if (!context.world.persons[bId] && context.world.organizations[bId]) {
    const organization = context.world.organizations[bId]!;
    const holderId = organization.positions
      .map((positionId) => context.world.positions[positionId]?.holderId)
      .find((id): id is Id =>
        Boolean(id && context.world.persons[id] && !context.world.persons[id]!.died),
      );
    const livingMembers = organization.memberIds
      .filter(
        (id) =>
          id !== binding.subjectId && context.world.persons[id] && !context.world.persons[id]!.died,
      )
      .map((id) => context.world.persons[id]!);
    const roleMember = livingMembers.find((person) =>
      person.roles.some((role) =>
        ['owner', 'employer', 'master', 'foreman', 'leader', 'director', 'manager'].includes(role),
      ),
    );
    // Do not invent an "employer" out of an arbitrary apprentice or bystander.
    // Only a position holder or a person carrying an owner/master/foreman-like
    // role can stand in for the organization in a person-to-person relation.
    const representative = holderId ?? roleMember?.id;
    if (!representative) return undefined;
    bId = representative;
  }
  if (!context.world.persons[aId] && context.world.organizations[aId]) {
    const organization = context.world.organizations[aId]!;
    const representative =
      organization.positions
        .map((positionId) => context.world.positions[positionId]?.holderId)
        .find((id): id is Id => Boolean(id && context.world.persons[id])) ??
      organization.memberIds.find((id) => Boolean(context.world.persons[id]));
    if (!representative) return undefined;
    aId = representative;
  }
  const a = context.world.persons[aId];
  const b = context.world.persons[bId];
  // An organization represented by the subject themselves cannot produce a
  // second person for a relation. This is a no-op, not a corrupt relation.
  if (a && b && a.id === b.id) return undefined;
  if (!a || !b) {
    warnContext(
      context,
      'invalid_relation',
      `relation effect references a missing person (${effect.a}->${effect.b})`,
      {
        personId: effect.a,
        eventId: binding.eventId,
      },
    );
    return undefined;
  }
  if (!RELATION_KINDS.includes(effect.kind)) return undefined;
  const normalized = { ...effect, a: aId, b: bId };
  const undirected = !['employer'].includes(effect.kind);
  const existing = relationsFor(context.world, aId).find(
    (candidate) =>
      candidate.kind === effect.kind &&
      candidate.end === undefined &&
      (undirected
        ? (candidate.a === aId && candidate.b === bId) ||
          (candidate.a === bId && candidate.b === aId)
        : candidate.a === aId && candidate.b === bId),
  );
  const id = existing?.id ?? `rel:${aId}:${bId}:${effect.kind}`;
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
  if (relation && (relation.a !== aId || relation.b !== bId || relation.kind !== effect.kind)) {
    return undefined;
  }
  if (relation?.end) return undefined;
  if (!relation) {
    created = true;
    relation = {
      id,
      a: aId,
      b: bId,
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
    touchRelationRevision(context.world);
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
  return normalized;
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
  touchOrganizationRevision(context.world);
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
  const minor = ageAt(person, binding.date) < 18;
  const targetHasAdult = household.memberIds.some((id) => {
    const member = context.world.persons[id];
    return Boolean(member && !member.died && ageAt(member, binding.date) >= 18);
  });
  if (minor && !targetHasAdult) {
    warnContext(context, 'minor_without_guardian', 'minor household move skipped', {
      personId: person.id,
      eventId: binding.eventId,
    });
    return undefined;
  }
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
  // A new household must not consist only of minors. If the parents are young,
  // bring the mother's living guardian with them; otherwise the split is not a
  // valid household and the birth/move is refused.
  const hasAdult = members.some((person) => !person.died && ageAt(person, context.target) >= 18);
  if (!hasAdult) {
    const guardian = [...mother.guardianIds, ...mother.parentIds]
      .map((id) => world.persons[id])
      .find((person) => person && !person.died && ageAt(person, context.target) >= 18);
    if (!guardian) return undefined;
    if (!members.some((person) => person.id === guardian.id)) members.push(guardian);
  }
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
  registerIndexedPerson(context, child);
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
      touchRelationRevision(context.world);
      child.relationshipIds.push(relation.id);
      parent.relationshipIds.push(relation.id);
    }
  }
  const autoStateEffects: EventEffect[] = [];
  for (const definition of stateDefinitionsFor(context).values()) {
    const auto = definition.autoAttachOnBirth;
    if (!auto) continue;
    const owners =
      auto.owner === 'household'
        ? [{ type: 'household' as const, id: household.id }]
        : parents.map((parent) => ({ type: 'person' as const, id: parent.id }));
    for (const owner of owners) {
      const created = createStateInstance(
        context,
        definition,
        owner.type,
        owner.id,
        undefined,
        { [auto.link]: child.id },
        undefined,
        binding,
      );
      if (!created) continue;
      autoStateEffects.push({
        type: 'state_add',
        ownerType: owner.type,
        ownerId: owner.id,
        stateId: definition.id,
        links: { [auto.link]: child.id },
        instanceId: created.instance.id,
        definitionVersion: definition.version,
        reason: auto.reason ?? `attached on birth of ${child.name}`,
        ...(created.entryEffects.length > 0 ? { entryEffects: created.entryEffects } : {}),
      });
    }
  }
  return {
    ...effect,
    parentIds: parents.map((parent) => parent.id),
    childId: child.id,
    childName: child.name,
    ...(autoStateEffects.length > 0 ? { autoStateEffects } : {}),
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
      touchRelationRevision(world);
      if (!child.relationshipIds.includes(relationId)) child.relationshipIds.push(relationId);
      if (!guardian.relationshipIds.includes(relationId)) guardian.relationshipIds.push(relationId);
    }
  }
}

function lastEventMonthFor(context: EngineContext, personId: Id): WorldDate | undefined {
  if (!context.lastEventMonths) {
    const months = new Map<Id, WorldDate>();
    for (const event of context.world.events) {
      for (const personId of new Set([
        event.subjectId,
        ...event.participants.map((participant) => participant.personId),
      ])) {
        const current = months.get(personId);
        if (!current || monthIndex(event.date) > monthIndex(current)) {
          months.set(personId, event.date);
        }
      }
    }
    context.lastEventMonths = months;
  }
  return context.lastEventMonths.get(personId);
}

function rememberEventMonth(context: EngineContext, subjectId: Id, date: WorldDate): void {
  if (!context.lastEventMonths) return;
  const current = context.lastEventMonths.get(subjectId);
  if (!current || monthIndex(date) > monthIndex(current)) {
    context.lastEventMonths.set(subjectId, date);
  }
}

function eventIdsFor(context: EngineContext): Set<Id> {
  if (!context.eventIds) {
    context.eventIds = new Set(context.world.events.map((event) => event.id));
  }
  return context.eventIds;
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

  const previousEventDate = lastEventMonthFor(context, person.id);
  const deathDate =
    previousEventDate && monthIndex(previousEventDate) > monthIndex(binding.date)
      ? { ...previousEventDate }
      : { ...binding.date };
  const endedStateIds: Id[] = [];
  const exitEffects: EventEffect[] = [];
  for (const instance of Object.values(context.world.states ?? {}).filter(
    (candidate) =>
      candidate.active && candidate.ownerType === 'person' && candidate.ownerId === person.id,
  )) {
    endedStateIds.push(instance.id);
    exitEffects.push(
      ...endStateInstance(context, instance, deathDate, 'owner_died', binding),
    );
  }
  person.died = deathDate;
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
  closePositionsFor(context.world, person.id, deathDate);
  for (const organization of Object.values(context.world.organizations)) {
    organization.memberIds = organization.memberIds.filter((id) => id !== person.id);
  }
  for (const relation of relationsFor(context.world, person.id)) {
    if (relation.end !== undefined) continue;
    if (relation.kind === 'partner') relation.end = { ...deathDate };
  }
  repairGuardiansAfterDeath(context.world, person, deathDate);

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

  const estate = settleExtinctHousehold(context.world, person, deathDate);
  return {
    ...effect,
    ...(estate ? { estateTo: estate.heirHouseholdId, estateAmount: estate.amount } : {}),
    ...(endedStateIds.length > 0 ? { endedStateIds } : {}),
    ...(exitEffects.length > 0 ? { exitEffects } : {}),
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
  const household = context.world.households[person.householdId];
  // A death happens where the person actually lives. `locationId` can be a
  // workplace or a relative's flat from a recent move; the household residence
  // is the stable address used by the rest of the economy and housing model.
  const deathPlaceId = household?.residenceId ?? person.locationId;
  const placeName = context.world.places[deathPlaceId]?.name ?? '维也纳';
  const witness = (household?.memberIds ?? [])
    .map((id) => context.world.persons[id])
    .filter(
      (member): member is Person => Boolean(member) && member.id !== person.id && !member.died,
    )
    .sort((a, b) => {
      const partner = (candidate: Person): number =>
        relationsFor(context.world, person.id).some(
          (relation) =>
            relation.kind === 'partner' &&
            relation.end === undefined &&
            ((relation.a === person.id && relation.b === candidate.id) ||
              (relation.a === candidate.id && relation.b === person.id)),
        )
          ? 0
          : candidate.parentIds.some((id) => person.parentIds.includes(id))
            ? 1
            : 2;
      return partner(a) - partner(b) || a.id.localeCompare(b.id);
    })[0];
  const deathText = statisticalDeathText(person, cause, date, placeName);
  const event = commitEvent(
    context,
    {
      date: { ...date },
      placeId: deathPlaceId,
      subjectId: person.id,
      participants: [
        { personId: person.id, role: 'subject' },
        ...(witness ? [{ personId: witness.id, role: 'present' }] : []),
      ],
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
      immediateText: witness ? `${deathText}${witness.name}在场。` : deathText,
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
          immediateText: `${initiator.name}关于「${interaction.subject.slice(0, 120)}」的请求没有得到回应，事情暂时搁下了。`,
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
        immediateText:
          action === 'project_completed'
            ? `「${updated.title.slice(0, 120)}」完成了当前阶段，参与者留下了实际的记录和后续安排。`
            : action === 'project_failed'
              ? `「${updated.title.slice(0, 120)}」没有完成：${updated.blockers.slice(0, 2).join('、') || '参与者或资源不足'}。`
              : action === 'project_blocked'
                ? `「${updated.title.slice(0, 120)}」暂时受阻，参与者把日期往后推。`
                : `「${updated.title.slice(0, 120)}」继续推进了一阶段。`,
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
