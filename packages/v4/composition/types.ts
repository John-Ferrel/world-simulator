import type {
  AdaptiveContext,
  EventEffect,
  PersonAttributeKey,
  Place,
  RoleRequirement,
  SceneCondition,
  SceneFollowupTarget,
  SceneStage,
  StateOwnerType,
  StateParameterValue,
} from '../domain.js';
import type { GeneratedTaskMeta } from '../generated.js';

/**
 * Phase 11 compositional content contract.
 *
 * A ContextProfile describes the historical/geographic world in which a kernel
 * can happen. A MilieuProfile describes the social environment a person is
 * actually inside. A PlotKernel is a reusable causal mechanism; the composer
 * binds it to a context and milieu and emits ordinary SceneDefinition /
 * TaskDefinition objects for the existing engine.
 */

export type ContextPlaceholder =
  | '@school'
  | '@workplace'
  | '@factory'
  | '@market'
  | '@hospital'
  | '@government'
  | '@church'
  | '@cafe'
  | '@station'
  | '@home'
  | '@rural'
  | '@university';

export type ContextProfile = {
  id: string;
  title: string;
  /** Inclusive year window. The composer additionally checks process/legacy gates. */
  from: number;
  to: number;
  tags: string[];
  /** Higher priority wins when several active contexts match the same kernel+milieu. */
  priority?: number;
  /** Region ids used only for diagnostics/future filtering. */
  regionIds?: string[];
  /** Extra conditions copied to every compiled scene/task. */
  conditions?: SceneCondition[];
  /** Context is active only when one of these process kinds is active. */
  requiresProcessKinds?: string[];
  /** Context is active only when one of these legacy kinds is active. */
  requiresLegacyKinds?: string[];
  places: Partial<Record<ContextPlaceholder, Place['id']>>;
  /** Multiplier applied to authored wages in kernel effects. */
  wageMultiplier?: number;
  /** Short concrete sensory/institutional flavor used by composer text prefixes. */
  flavor: string;
  /** Describes what this context changes mechanically, not just cosmetically. */
  causalNotes: string[];
};

export type MilieuProfile = {
  id: string;
  title: string;
  contextTags: string[];
  tags: string[];
  /** A place kind that must be reachable for this milieu. */
  placeKind?: Place['kind'];
  /** Typical occupations; used for subject role restrictions where a kernel asks. */
  occupations?: string[];
  /** Conditions copied into compiled scenes/tasks. */
  conditions?: SceneCondition[];
  /** Text token inserted into a kernel's optional {milieu} slot. */
  label: string;
};

export type KernelVariantWhen = {
  contextTags?: string[];
  milieuTags?: string[];
  /** Require one of these process kinds in the current world. */
  processKinds?: string[];
  /** Require one of these legacy kinds in the current world. */
  legacyKinds?: string[];
  /** Person-level conditions; compiled into SceneOutcome.conditions. */
  hasRole?: string | string[];
  notHasRole?: string;
  employment?: boolean;
  education?: string[];
  minCash?: number;
  maxCash?: number;
  skill?: { name: string; min?: number; max?: number };
  capability?: string;
  minAge?: number;
  maxAge?: number;
  relationKind?: string;
  /** Restrict the branch to one sex; compiled into a SceneCondition. */
  sex?: 'female' | 'male';
  /** Health/vitality window; compiled into a SceneCondition. */
  health?: { min?: number; max?: number };
  /** Past-event branch; compiled into a SceneCondition. */
  history?: {
    actionPrefix?: string;
    kernelId?: string;
    outcome?: string;
    tag?: string;
    minCount?: number;
    maxCount?: number;
    withinYears?: number;
    minYearsAgo?: number;
    includeParticipants?: boolean;
  };
  /** Persistent flag branch; compiled into a SceneCondition. */
  hasFlag?: string;
  /** Phase 15 mechanism state branch. */
  hasState?: {
    stateId?: string;
    tag?: string;
    owner?: StateOwnerType;
    parameter?: string;
    min?: number;
    max?: number;
    equals?: StateParameterValue;
  };
  /** Named capability branch. */
  attribute?: { key: PersonAttributeKey; min?: number; max?: number };
  /** Real office branch, not a stage title. */
  position?: { titleIncludes?: string; authority?: string; organizationId?: string };
};

export type KernelOutcome = {
  id: string;
  weight: number;
  /** Role tokens such as {subject}, {teacher}; optional {milieu}/{context}. */
  text: string;
  effects: EventEffect[];
  /** Extra person-level conditions on this outcome. */
  conditions?: SceneCondition[];
  significance?: number;
  /** Structured motive/conflict/response for the incident trace. */
  trace?: { motive?: string; conflict?: string; response?: string };
  when?: KernelVariantWhen;
  /**
   * Kernel ids (not compiled scene ids) to schedule after this outcome. The
   * engine resolves them against whichever compiled context is active when the
   * follow-up becomes due.
   */
  followupIds?: string[];
  followupTargets?: SceneFollowupTarget[];
};

export type KernelVariant = {
  id: string;
  when: KernelVariantWhen;
  title?: string;
  /** Prepended to every outcome text. Keep it factual, not decorative. */
  textPrefix?: string;
  conditions?: SceneCondition[];
  roles?: RoleRequirement[];
  /** If provided, replaces the kernel's base outcomes. */
  outcomes?: KernelOutcome[];
  /** Optional adaptive contexts added by this variant. */
  adaptiveContexts?: AdaptiveContext[];
  subjectProvenance?: import('../domain.js').SceneDefinition['subjectProvenance'];
  rateMultiplier?: number;
};

export type PlotKernel = {
  id: string;
  title: string;
  domain: string;
  kind: 'event' | 'task';
  stage: SceneStage;
  ageWindow: { min: number; max: number };
  tags: string[];
  familyId?: string;
  /** Context tags this kernel can inhabit; empty means any context. */
  contexts?: string[];
  /** Milieu ids/tags this kernel can inhabit; empty means any milieu. */
  milieus?: string[];
  conditions?: SceneCondition[];
  /** Restrict this kernel to a provenance class (e.g. player births). */
  subjectProvenance?: import('../domain.js').SceneDefinition['subjectProvenance'];
  /**
   * Phase 20 optional contexts. They do not gate the kernel; matching contexts
   * modify selection weight/check and can be referenced by outcome conditions.
   */
  adaptiveContexts?: AdaptiveContext[];
  roles: RoleRequirement[];
  /** Optional deterministic check that branches among authored outcomes. */
  check?: import('../domain.js').SceneCheckSpec;
  outcomes: KernelOutcome[];
  variants?: KernelVariant[];
  baseRate?: number;
  /** Scheduling weight among eligible ordinary scenes. Defaults to 1. */
  weight?: number;
  cooldownYears?: number;
  significance?: number;
  task?: GeneratedTaskMeta;
  /** Optional subject occupation restriction supplied by the milieu. */
  subjectOccupation?: 'primary' | 'secondary';
  historicalBasis?: string;
  sourceIds?: string[];
};

export type CompositionTrace = {
  kernelId: string;
  kernelVersion: number;
  contextId: string;
  milieuId: string;
  variantId?: string;
  compiledSceneId: string;
  outcomeCount: number;
};

export type CompositionCompileError = {
  kernelId: string;
  outcomeId: string;
  effectType: string;
  reason: string;
};

export type ComposedContent = {
  scenes: import('../domain.js').SceneDefinition[];
  tasks: import('../domain.js').TaskDefinition[];
  trace: CompositionTrace[];
  /** Effects whose placeholders cannot be resolved. Major effects fail the outcome. */
  errors: CompositionCompileError[];
  stats: {
    activeContexts: number;
    activeMilieus: number;
    kernelsConsidered: number;
    compiledScenes: number;
    compiledTasks: number;
    skippedByContext: number;
    skippedByMilieu: number;
    cacheHit: boolean;
  };
};

export type CompositionSource = {
  compile(
    world: import('../domain.js').WorldState,
    target: import('../domain.js').WorldDate,
  ): ComposedContent;
};
