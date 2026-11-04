/**
 * v4 domain contract — a person-first historical world.
 *
 * This is deliberately not the old `World` JSON shape. The old flat event log
 * mixed facts, prose and state changes; v4 keeps facts, scenes and projections
 * separate. This package can be built/tested without the old simulator.
 */

import type { MacroState } from './macro.js';

export type Id = string;
export type WorldDate = { year: number; month: number }; // month 1..12
export type LifeStage = 'infancy' | 'childhood' | 'adolescence' | 'adulthood' | 'elderhood';

export type BirthClause = {
  kind: string;
  text: string;
  tags: string[];
  maxEffect: number;
};

export type HistoricalProcessKind =
  | 'war_mobilization'
  | 'public_health_crisis'
  | 'social_movement'
  | 'political_repression'
  | 'economic_crisis'
  | 'cultural_movement'
  | 'other';

export type HistoricalPhase =
  | 'emerging'
  | 'mobilizing'
  | 'confrontation'
  | 'institutionalizing'
  | 'repression'
  | 'declining'
  | 'suspended'
  | 'ended';

export type HistoricalParticipantRole =
  | 'participant'
  | 'organizer'
  | 'leader'
  | 'executor'
  | 'supporter'
  | 'opponent'
  | 'perpetrator'
  | 'victim'
  | 'witness'
  | 'rescuer'
  | 'affected';

export type HistoricalProcessMetrics = {
  /** 0..1; all are normalized pressure readings, not victory points. */
  support: number;
  opposition: number;
  resources: number;
  legitimacy: number;
  escalation: number;
  information: number;
};

export type HistoricalParticipation = {
  roles: HistoricalParticipantRole[];
  /** Bounded accumulated influence from committed actions. */
  influence: number;
  firstEventId: Id;
  lastEventId: Id;
  joinedAt: WorldDate;
};

export type HistoricalProcess = {
  kind: HistoricalProcessKind;
  phase: HistoricalPhase;
  phaseStarted: WorldDate;
  regionIds: string[];
  objectives: string[];
  sourceIds: string[];
  participants: Record<Id, HistoricalParticipation>;
  organizationRoles: Record<Id, string[]>;
  metrics: HistoricalProcessMetrics;
  outcome?: string;
  history: { date: WorldDate; phase: HistoricalPhase; note: string; eventId?: Id }[];
  lastEventId?: Id;
  lastUpdated?: WorldDate;
  /** Date of the last committed participant/action influence, not a Director intent. */
  lastActivity?: WorldDate;
  /** Consecutive years with no living vehicle and no committed activity. */
  suspendedYears?: number;
  /** Years the process has continued beyond its expected review date. */
  overdueYears?: number;
  source: 'seed' | 'director' | 'event';
  /** Reference only; never a death command. */
  realWorldReference?: { sourceIds: string[]; note: string };
};

export type PersonAgencyGoal =
  'survival' | 'work' | 'family' | 'belonging' | 'status' | 'cause' | 'care' | 'rest' | 'knowledge';

export type PersonAgency = {
  goal: PersonAgencyGoal;
  summary: string;
  since: WorldDate;
  lastAction?: WorldDate;
  lastActionKind?: string;
  attempts?: number;
  /** Bounded record of why the person changed course. */
  history?: {
    goal: PersonAgencyGoal;
    since: WorldDate;
    reason: string;
    eventId?: Id;
  }[];
  /** A repeated voluntary effort, used to keep long goals alive across years. */
  focus?: {
    domain: string;
    taskId?: string;
    since: WorldDate;
    attempts: number;
  };
};

export type HistoricalIdentity = {
  /** Stable public identity (Wikidata QID or curated stable id). */
  id: string;
  sourceIds: string[];
  birthPrecision: 'year' | 'day';
  occupation: string;
  publicRole: string;
  activityRegionIds: string[];
  activeFrom: WorldDate;
  activeTo?: WorldDate;
  realWorldDeath?: { year: number; month?: number; day?: number };
  biographyIsNotFate: true;
  notes?: string;
};

export type PersonLife = {
  mood: number;
  reputation: number;
  skills: {
    literacy: number;
    numeracy: number;
    craft: number;
    social: number;
  };
  flags: string[];
};
export type Sex = 'female' | 'male' | 'intersex';

export type Person = {
  id: Id;
  name: string;
  ownerId?: Id;
  sex: Sex;
  born: WorldDate;
  died?: WorldDate;
  deathCause?: string;
  locationId: Id;
  householdId: Id;
  parentIds: Id[];
  guardianIds: Id[];
  health: {
    /** 0..1 constitutional vitality, not a visible UI stat. */
    vitality: number;
    conditions: string[];
    nutrition: number;
    lastIllness?: { name: string; since: WorldDate; severity: number };
    /** End of the postpartum risk window; set by a birth, cleared by the engine. */
    postpartumUntil?: WorldDate;
  };
  traits: {
    care: number;
    ambition: number;
    tradition: number;
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    neuroticism: number;
  };
  education: {
    status: 'none' | 'home' | 'primary' | 'secondary' | 'apprenticeship' | 'higher';
    level: number;
    placeId?: Id;
    started?: WorldDate;
  };
  employment?: {
    organizationId: Id;
    positionId?: Id;
    occupation: string;
    wage: number;
    since: WorldDate;
    workplaceId: Id;
  };
  roles: string[];
  appearance?: {
    skin: number;
    hair: number;
    clothes: number;
    doll?: Record<string, unknown>;
  };
  lifeContract?: {
    originalWish: string;
    mode: 'ordinary' | 'legendary';
    /** Plain-language reading of the wish; never a command to the engine. */
    interpretation?: string;
    /** Bounded trait adjustment proposed by the reading and applied once. */
    traitDeltas?: Partial<Person['traits']>;
    /** Content tag for later scene eligibility, not a superpower. */
    focus?: 'education' | 'work' | 'family' | 'faith' | 'politics' | 'health' | 'craft' | 'none';
    /** A private boundary the child may later act around, stored as text. */
    taboo?: string;
    /** One concrete private goal; not a guaranteed plot. */
    privateGoal?: string;
    /** Bounded skill nudges applied by the birth compiler. */
    skillDeltas?: Partial<PersonLife['skills']>;
    /** A bounded affinity used by event weighting. */
    capability?:
      | 'none'
      | 'literacy'
      | 'numeracy'
      | 'social_insight'
      | 'craft_affinity'
      | 'frail_body'
      | 'craft'
      | 'social'
      | 'health';
    /** Bounded clauses from the Birth Contract 2.0 compiler. */
    conditions?: BirthClause[];
    limits?: BirthClause[];
    costs?: BirthClause[];
    compiledBy?: string;
    compiledAt?: WorldDate;
    createdAt: WorldDate;
  };
  projectIds: Id[];
  relationshipIds: Id[];
  knowledgeIds: Id[];
  /** Mutable life state used by ambient events. Optional for old saves. */
  life?: PersonLife;
  /** Stable public historical identity; this is metadata, not an alternate actor model. */
  historicalIdentity?: HistoricalIdentity;
  /** Self-directed goal formed from current conditions; not a scripted plot. */
  agency?: PersonAgency;
  /** Where the person came from and which record made them named. */
  provenance: {
    kind: 'birth' | 'materialized_population' | 'historical_activation' | 'initial';
    sourceId?: Id;
  };
};

export type Household = {
  id: Id;
  residenceId: Id;
  memberIds: Id[];
  guardianIds: Id[];
  cash: number;
  food: number;
  debt: number;
  rent: number;
  /** Monthly obligations that must be paid from cash/food. */
  obligations: {
    id: string;
    kind: 'rent' | 'food' | 'school' | 'medical' | 'debt';
    amount: number;
  }[];
  assets: { id: string; kind: string; value: number }[];
  /** Modelled external income: pension, charity, room rent, fees. */
  monthlyIncome?: { id: string; amount: number; reason: string }[];
  sharingRules: 'pooled' | 'guardian_managed' | 'separate';
};

export type Place = {
  id: Id;
  name: string;
  kind:
    | 'home'
    | 'school'
    | 'factory'
    | 'shop'
    | 'hospital'
    | 'church'
    | 'cafe'
    | 'government'
    | 'union'
    | 'barracks'
    | 'street'
    | 'other';
  settlementId: Id;
  regionId?: Id;
  polityId?: Id;
  capacity?: number;
  ownershipOrganizationId?: Id;
  /** Concrete behaviors a place can offer to people present here. */
  offers: string[];
};

export type Organization = {
  id: Id;
  name: string;
  kind:
    | 'household_firm'
    | 'factory'
    | 'school'
    | 'union'
    | 'party'
    | 'army'
    | 'state'
    | 'church'
    | 'other';
  placeId: Id;
  memberIds: Id[];
  positions: Id[];
  treasury: number;
  /** Modelled market/tax receipts per month; the external sector is explicit. */
  monthlyRevenue?: number;
  authorityRules: string[];
  projects: Id[];
  status: 'active' | 'dissolved';
  causeIds: Id[];
};

export type Position = {
  id: Id;
  organizationId: Id;
  title: string;
  holderId?: Id;
  authority: string[];
  wage?: number;
  start?: WorldDate;
  end?: WorldDate;
};

export type Project = {
  id: Id;
  ownerId: Id;
  kind: string;
  title: string;
  participants: { personId: Id; role: string }[];
  placeId?: Id;
  state: 'proposed' | 'active' | 'blocked' | 'failed' | 'completed' | 'cancelled';
  stage: number;
  required: { cash?: number; food?: number; people?: number; resources?: Record<string, number> };
  committed: { cash?: number; food?: number; resources?: Record<string, number> };
  deadline?: WorldDate;
  blockers: string[];
  causeIds: Id[];
  history: { date: WorldDate; note: string; eventId?: Id }[];
};

export type Interaction = {
  id: Id;
  initiatorId: Id;
  counterpartyIds: Id[];
  kind: 'request' | 'offer' | 'proposal' | 'threat' | 'introduction' | 'negotiation';
  subject: string;
  status: 'pending' | 'accepted' | 'rejected' | 'expired' | 'withdrawn';
  created: WorldDate;
  due?: WorldDate;
  proposal: Record<string, unknown>;
  responses: { personId: Id; response: 'accepted' | 'rejected' | 'counter'; note?: string }[];
  linkedProjectId?: Id;
  visibility: 'private' | 'participants' | 'public';
};

export type Relation = {
  id: Id;
  a: Id;
  b: Id;
  kind:
    'kin' | 'guardian' | 'partner' | 'friend' | 'colleague' | 'employer' | 'rival' | 'acquaintance';
  /** Directional: a -> b. */
  trust: number;
  affection: number;
  obligation: number;
  fear: number;
  respect: number;
  start: WorldDate;
  end?: WorldDate;
  sharedEventIds: Id[];
};

export type Knowledge = {
  id: Id;
  holderId: Id;
  proposition: string;
  confidence: number;
  source: { kind: 'witnessed' | 'told' | 'document' | 'inferred'; eventId?: Id; personId?: Id };
  observed: WorldDate;
  visibility: 'private' | 'shared';
  trueInWorld?: boolean;
};

export type EventParticipant = {
  personId: Id;
  role: string;
  /** Optional organization/place role holder (e.g. employer). */
  organizationId?: Id;
};

export type EventEffect =
  | { type: 'cash'; householdId: Id; amount: number; reason: string }
  | { type: 'food'; householdId: Id; amount: number; reason: string }
  | { type: 'health'; personId: Id; amount: number; reason: string }
  | { type: 'condition'; personId: Id; condition: string; add: boolean; reason: string }
  | { type: 'mood'; personId: Id; amount: number; reason: string }
  | { type: 'reputation'; personId: Id; amount: number; reason: string }
  | {
      type: 'skill';
      personId: Id;
      skill: keyof PersonLife['skills'];
      amount: number;
      reason: string;
    }
  | { type: 'flag'; personId: Id; flag: string; add: boolean; reason: string }
  | {
      type: 'education';
      personId: Id;
      status: Person['education']['status'];
      level?: number;
      placeId?: Id;
      reason: string;
    }
  | {
      type: 'employment';
      personId: Id;
      organizationId: Id;
      occupation: string;
      wage: number;
      workplaceId: Id;
      reason: string;
    }
  | { type: 'unemployment'; personId: Id; reason: string }
  | {
      type: 'relation';
      a: Id;
      b: Id;
      kind: Relation['kind'];
      trust?: number;
      affection?: number;
      obligation?: number;
      fear?: number;
      respect?: number;
      reason: string;
    }
  | { type: 'relation_end'; a: Id; b: Id; kind: Relation['kind']; reason: string }
  | { type: 'role'; personId: Id; role: string; add: boolean; reason: string }
  | {
      type: 'organization_membership';
      personId: Id;
      organizationId: Id;
      add: boolean;
      reason: string;
    }
  | { type: 'project'; project: Project }
  | { type: 'interaction'; interaction: Interaction }
  | { type: 'move'; personId: Id; locationId: Id; reason: string }
  | { type: 'household'; personId: Id; householdId: Id; reason: string }
  | { type: 'residence'; householdId: Id; residenceId: Id; reason: string }
  | {
      type: 'birth';
      parentIds: Id[];
      childSex: Sex;
      /** Optional authored name; otherwise the simulator draws one deterministically. */
      name?: string;
      reason: string;
      /** Filled by the engine after the child exists. */
      childId?: Id;
      childName?: string;
    }
  | {
      type: 'death';
      personId: Id;
      cause: string;
      reason: string;
      /** Filled when an extinct household's cash passes to an heir. */
      estateTo?: Id;
      estateAmount?: number;
    }
  | {
      type: 'estate';
      personId: Id;
      heirHouseholdId: Id;
      amount: number;
      reason: string;
    }
  | {
      type: 'organization_funds';
      organizationId: Id;
      amount: number;
      reason: string;
    }
  | {
      type: 'knowledge';
      holderId: Id;
      proposition: string;
      confidence: number;
      sourceKind: 'witnessed' | 'told' | 'document' | 'inferred';
      personId?: Id;
      visibility: 'private' | 'shared';
      trueInWorld?: boolean;
    }
  | {
      type: 'historical_participation';
      processId: string;
      personId: Id;
      role: HistoricalParticipantRole;
      /** Base influence before position/org/skill modifiers. */
      influence?: number;
      reason: string;
    }
  | {
      type: 'historical_influence';
      processId: string;
      personId: Id;
      dimension: keyof HistoricalProcessMetrics;
      amount: number;
      reason: string;
    }
  | {
      type: 'historical_process';
      process: {
        id: string;
        kind: HistoricalProcessKind;
        title: string;
        description: string;
        regionId?: string;
        organizationId?: string;
        eventFamilyIds?: string[];
        objectives?: string[];
        sourceIds?: string[];
      };
    };

/**
 * A committed fact. Text is only a fast index; the structured fields are the
 * authority. Prose and player-facing chapters are projections, not this object.
 */
export type EventFact = {
  id: Id;
  date: WorldDate;
  placeId?: Id;
  subjectId: Id;
  participants: EventParticipant[];
  action: string;
  causes: Id[];
  effects: EventEffect[];
  /** Immediate, factual text; never a multi-year prognosis. */
  immediateText: string;
  /** Short player-facing title for ambient events. */
  title?: string;
  /**
   * Semantic tags of the committed incident: authored scene tags plus tags
   * derived from settled effects. Later scenes can consume these as personal
   * history without hard-coding a specific scene id.
   */
  tags?: string[];
  /** Earlier committed facts matched by this incident's history conditions. */
  historyRefs?: Id[];
  significance: number;
  visibility: 'private' | 'participants' | 'public';
  sceneId?: Id;
  /** Structured causal trace built when the event was committed. */
  trace?: IncidentTrace;
  choices?: { actorId: Id; choiceId: string; reason: string }[];
  provenance: {
    kind: 'scene' | 'ambient' | 'project' | 'interaction' | 'system' | 'birth';
    sourceId?: Id;
  };
};

export type SceneStage = LifeStage;

export type RoleRequirement = {
  key: string;
  kind:
    | 'subject'
    | 'parent'
    | 'guardian'
    | 'sibling'
    | 'partner'
    | 'teacher'
    | 'employer'
    | 'worker'
    | 'union_member'
    | 'neighbor'
    | 'official'
    | 'organization'
    | 'historical';
  required?: boolean;
  minAge?: number;
  maxAge?: number;
  sex?: Sex | 'opposite';
  sameHousehold?: boolean;
  samePlaceKind?: Place['kind'];
  occupation?: string;
  organizationKind?: Organization['kind'];
  /** Restrict a historical role to one stable public identity. */
  historicalId?: string;
  /**
   * Restrict this role to a person who already shared an event carrying this
   * semantic tag with the subject. This is how a mentor, former lover, enemy
   * or old comrade can return years later instead of being recast as a new
   * stranger. Such a role is never materialized.
   */
  sharedHistoryTag?: string;
};

export type SceneCondition =
  | { kind: 'age'; min?: number; max?: number }
  | { kind: 'stage'; in: SceneStage[] }
  | { kind: 'cash'; householdId?: 'subject'; min?: number; max?: number }
  | { kind: 'householdSize'; min?: number; max?: number }
  | { kind: 'overcrowded'; value: boolean }
  | { kind: 'health'; min?: number; max?: number }
  | { kind: 'skill'; skill: keyof PersonLife['skills']; min?: number; max?: number }
  | { kind: 'education'; in: Person['education']['status'][] }
  | { kind: 'employment'; employed: boolean }
  | { kind: 'placeKind'; in: Place['kind'][] }
  | { kind: 'hasRole'; role: string }
  | { kind: 'notHasRole'; role: string }
  | { kind: 'development'; id: string }
  | { kind: 'developmentType'; type: string }
  | { kind: 'capability'; capability: string }
  | {
      kind: 'historicalProcess';
      /** Omit to match any process. */
      id?: string;
      processKind?: HistoricalProcessKind;
      phases?: HistoricalPhase[];
      roles?: HistoricalParticipantRole[];
      minInfluence?: number;
      sameRegion?: boolean;
    }
  | {
      kind: 'legacy';
      /** Omit to match any active legacy in the region. */
      id?: string;
      legacyKind?: string;
      tag?: string;
      sameRegion?: boolean;
    }
  | {
      kind: 'hasRelationWith';
      personId: Id;
      relationKind?: Relation['kind'];
      minTrust?: number;
    }
  | {
      kind: 'hasRelation';
      relationKind: Relation['kind'];
      minTrust?: number;
      /** Only count a partner who actually shares the subject's household. */
      sameHousehold?: boolean;
      /** Require the other person in the relation to have this sex. */
      partnerSex?: Person['sex'];
    }
  | { kind: 'notHasRelation'; relationKind: Relation['kind']; sameHousehold?: boolean }
  | { kind: 'worldYear'; min?: number; max?: number }
  | { kind: 'region'; in: string[] }
  | { kind: 'sex'; in: Person['sex'][] }
  | { kind: 'pressure'; key: string; min: number }
  /**
   * The subject (or a participant, when includeParticipants is true) has
   * already lived through matching incidents. This is a read-only condition on
   * committed EventFacts, not a second narrative state machine.
   */
  | {
      kind: 'history';
      /** Exact scene/kernel id prefix, e.g. `vienna-family-courtship`. */
      actionPrefix?: string;
      /** Composed kernel id, matched against the compiled action prefix. */
      kernelId?: string;
      /** Required outcome suffix (e.g. `join-and-carry`). */
      outcome?: string;
      /** Semantic event tag (authored scene tag or settled-effect tag). */
      tag?: string;
      minCount?: number;
      maxCount?: number;
      /** Only events within this many years before the checked date. */
      withinYears?: number;
      /** Require the remembered event to be at least this many calendar years old. */
      minYearsAgo?: number;
      minSignificance?: number;
      includeParticipants?: boolean;
      /** Require the past incident to have had a participant in this role. */
      withRole?: string;
    }
  /** The person holds at least one knowledge proposition matching the text. */
  | { kind: 'knowledge'; propositionIncludes?: string; minConfidence?: number }
  /** The person owns or participates in a project of this kind/state. */
  | { kind: 'project'; projectKind?: string; state?: Project['state']; minStage?: number }
  /** At least one active relation carries enough shared history. */
  | {
      kind: 'relationHistory';
      relationKind?: Relation['kind'];
      minSharedEvents?: number;
      minTrust?: number;
      minYears?: number;
      partnerSex?: Person['sex'];
    }
  /** A persistent personal flag set by an earlier committed effect. */
  | { kind: 'hasFlag'; flag: string };

export type SceneEffect = EventEffect; // v4 effects are the same typed vocabulary.

export type NarrationVariant = {
  id: string;
  /** Outcome id or `default`. */
  key: string;
  text: string;
  conditions?: SceneCondition[];
  /** Optional tonal tags (dry, tender, cruel, bureaucratic). */
  tone?: string[];
};

export type SceneFollowupTarget = {
  sceneId: string;
  /** Role key from the parent scene; omit/`subject` to use the event subject. */
  subjectRole?: string;
  delayMonths?: number;
  source?: 'followup' | 'fact' | 'action';
};

export type IncidentTrace = {
  /** Earlier committed facts this incident explicitly continues. */
  causes?: { eventId: Id; action: string; date: WorldDate }[];
  mechanism: {
    sceneId: string;
    outcomeId: string;
    kernelId?: string;
    contextId?: string;
    milieuId?: string;
    variantId?: string;
  };
  place?: { id: Id; name: string; kind: Place['kind'] };
  subject: { id: Id; name: string; age: number; occupation?: string; roles: string[] };
  participants: { personId: Id; role: string; name: string; organizationId?: Id }[];
  motive?: string;
  conflict?: string;
  response?: string;
  effects: { type: EventEffect['type']; description: string }[];
};

export type SceneOutcome = {
  id: string;
  weight: number;
  /** The agent's own disposition chooses among available outcomes; weights are fallback. */
  conditions?: SceneCondition[];
  immediateText: string;
  effects: SceneEffect[];
  followupSceneIds?: string[];
  /** Explicitly targets a role/person for the followup; preferred over bare ids. */
  followupTargets?: SceneFollowupTarget[];
  /** Optional key used by the narration library; defaults to outcome id. */
  narrationKey?: string;
  significance?: number;
  /** Structured incident facts for narration and audit; never a second effect system. */
  trace?: { motive?: string; conflict?: string; response?: string };
};

export type SceneChoice = {
  id: string;
  actorRole: string;
  label: string;
  conditions?: SceneCondition[];
  outcomes: SceneOutcome[];
};

export type SceneDefinition = {
  id: string;
  version: number;
  packId: string;
  title: string;
  stage: SceneStage;
  ageWindow: { min: number; max: number };
  /** Optional concrete event venue; otherwise the subject's current place. */
  placeId?: Id;
  roles: RoleRequirement[];
  conditions: SceneCondition[];
  /** At least one; if an actor has a choice, the scene creates a PendingInteraction. */
  choices?: SceneChoice[];
  /** Forced situations (infant illness, external disaster) use outcomes directly. */
  outcomes?: SceneOutcome[];
  tags: string[];
  /** Content tree family. Runtime may use it for rate/eligibility policy. */
  familyId?: string;
  /** Ordinary statistical chance per person-year. Fact/followup triggers ignore it. */
  rate?: number;
  /** Fact-triggered and action scenes bypass ordinary density control. */
  triggerMode?: 'statistical' | 'fact' | 'action';
  /** Weight used when more than one eligible event competes. */
  weight?: number;
  /** Narration variants keyed by outcome id. */
  narration?: NarrationVariant[];
  /** Fact tags this event subscribes to (injury, death, unemployment, ...). */
  triggerTags?: string[];
  historicalBasis?: string;
  sourceIds?: string[];
  /**
   * Optional cast restriction. Scenes written around a specific authored
   * person carry `subjectIds` so they never resolve for a player-born child
   * whose family has different names and institutions.
   */
  subjectIds?: Id[];
  /**
   * Restrict universal scenes to persons created through a particular path,
   * e.g. player births, so generic life content does not overwrite authored
   * biographies of the seed cast.
   */
  subjectProvenance?: Person['provenance']['kind'][];
  /** If true, only one focal scene per person per age window. */
  oncePerPerson?: boolean;
  cooldownYears?: number;
};

export type TaskDomain =
  | 'education'
  | 'work'
  | 'family'
  | 'social'
  | 'daily'
  | 'culture'
  | 'commerce'
  | 'craft'
  | 'health'
  | 'politics'
  | 'history'
  | 'knowledge'
  | 'migration'
  | 'special';

export type TaskNeed =
  | 'cash'
  | 'food'
  | 'health'
  | 'belonging'
  | 'status'
  | 'care'
  | 'knowledge'
  | 'safety'
  | 'autonomy';

/**
 * A content-authored active task. It reuses the scene casting/condition/effect
 * grammar but is entered from Agency rather than the random event schedule.
 * `baseUtility` and the tags are preferences, not success guarantees.
 */
export type TaskMeta = {
  domain: TaskDomain;
  goals: PersonAgencyGoal[];
  needs: TaskNeed[];
  baseUtility: number;
  /** 0..1; cautious or exhausted people discount risky tasks. */
  risk?: number;
  skills?: (keyof PersonLife['skills'])[];
  /** Optional birth-contract capability that makes this task more attractive. */
  capability?: string;
};

export type TaskDefinition = SceneDefinition & {
  task: TaskMeta;
};

export type ScheduledEvent = {
  id: string;
  sceneId: string;
  subjectId: Id;
  due: WorldDate;
  /** Original due date, used to expire a follow-up that can never resolve. */
  firstDue?: WorldDate;
  causeEventId?: Id;
  depth: number;
  source: 'followup' | 'fact' | 'action';
};

export type SceneInstance = {
  id: Id;
  sceneId: string;
  sceneVersion: number;
  subjectId: Id;
  roles: Record<string, Id>;
  date: WorldDate;
  status: 'offered' | 'resolved' | 'blocked';
  chosenOutcome?: string;
  eventId?: Id;
  reason?: string;
};

export type WorldState = {
  id: Id;
  seed: string;
  date: WorldDate;
  timePolicy: { secondsPerYear: number; monthsPerTick: number };
  places: Record<Id, Place>;
  households: Record<Id, Household>;
  persons: Record<Id, Person>;
  organizations: Record<Id, Organization>;
  positions: Record<Id, Position>;
  projects: Record<Id, Project>;
  interactions: Record<Id, Interaction>;
  relations: Record<Id, Relation>;
  knowledge: Record<Id, Knowledge>;
  events: EventFact[];
  scenes: SceneInstance[];
  /** Content can reference a small set of world-level pressures. */
  pressures: Record<string, number>;
  /** Phase 3 macro state. Optional so old archives and fixtures remain loadable. */
  macro?: MacroState;
  historyMeta: {
    lastSceneId?: string;
    lastEventId?: string;
    sequence: number;
    scheduledEvents?: ScheduledEvent[];
  };
  status: 'running' | 'archived';
  terminalReason?: string;
};

export function stageForAge(age: number): LifeStage {
  if (age < 3) return 'infancy';
  if (age < 12) return 'childhood';
  if (age < 18) return 'adolescence';
  if (age < 60) return 'adulthood';
  return 'elderhood';
}

export function ageAt(person: Pick<Person, 'born'>, date: WorldDate): number {
  return Math.max(
    0,
    Math.floor(date.year - person.born.year + (date.month - person.born.month) / 12),
  );
}

export function monthIndex(date: WorldDate): number {
  return date.year * 12 + (date.month - 1);
}

export function addMonths(date: WorldDate, months: number): WorldDate {
  const index = monthIndex(date) + months;
  return { year: Math.floor(index / 12), month: (index % 12) + 1 };
}

/**
 * A reusable ambient event. Unlike a milestone SceneDefinition it has one
 * concrete outcome, can occur in any year inside its window, and is selected
 * from a weighted pool. This is the density layer: several per person-year.
 */
export type AmbientEventDefinition = {
  id: string;
  packId: string;
  title: string;
  stage: LifeStage;
  ageWindow: { min: number; max: number };
  weight: number;
  roles: RoleRequirement[];
  conditions: SceneCondition[];
  effects: EventEffect[];
  immediateText: string;
  significance?: number;
  cooldownYears?: number;
  oncePerPerson?: boolean;
  subjectIds?: Id[];
  subjectProvenance?: Person['provenance']['kind'][];
  tags: string[];
  historicalBasis?: string;
  sourceIds?: string[];
};

/** A strict invariant check used after every mutation; throws on impossible state. */
export function assertWorldV4(world: WorldState): void {
  const ids = new Set<string>();
  const add = (id: string, kind: string, record: unknown) => {
    if (!id || ids.has(id)) throw new Error(`v4: duplicate or empty ${kind} id ${id}`);
    if (!record) throw new Error(`v4: missing ${kind} ${id}`);
    ids.add(id);
  };
  for (const [id, p] of Object.entries(world.persons)) {
    add(id, 'person', p);
    if (!world.households[p.householdId]) throw new Error(`v4: person ${id} has no household`);
    if (!world.places[p.locationId]) throw new Error(`v4: person ${id} has no place`);
    if (p.died && p.health.vitality > 0) throw new Error(`v4: dead person ${id} has vitality`);
  }
  for (const [id, h] of Object.entries(world.households)) {
    add(id, 'household', h);
    if (!world.places[h.residenceId]) throw new Error(`v4: household ${id} has no residence`);
    if (h.memberIds.some((personId) => !world.persons[personId]))
      throw new Error(`v4: household ${id} references an unknown member`);
    if (h.cash < 0 || h.food < 0) throw new Error(`v4: household ${id} has negative stock`);
  }
  for (const [id, place] of Object.entries(world.places)) add(id, 'place', place);
  for (const [id, org] of Object.entries(world.organizations)) {
    add(id, 'organization', org);
    if (!world.places[org.placeId]) throw new Error(`v4: organization ${id} has no place`);
    if (org.treasury < 0) throw new Error(`v4: organization ${id} has negative treasury`);
  }
  for (const [id, relation] of Object.entries(world.relations)) {
    add(id, 'relation', relation);
    if (!world.persons[relation.a] || !world.persons[relation.b])
      throw new Error(`v4: relation ${id} references an unknown person`);
  }
  const eventIds = new Set(world.events.map((event) => event.id));
  for (const event of world.events) {
    if (!world.persons[event.subjectId]) throw new Error(`v4: event ${event.id} has no subject`);
    if (event.participants.some((p) => !world.persons[p.personId]))
      throw new Error(`v4: event ${event.id} has unknown participant`);
    if (event.causes.some((cause) => !eventIds.has(cause)))
      throw new Error(`v4: event ${event.id} has unknown cause`);
  }
  if (world.macro) {
    if (!world.macro.regions || Object.keys(world.macro.regions).length === 0)
      throw new Error('v4: macro state has no region');
    for (const [id, population] of Object.entries(world.macro.population)) {
      if (population.regionId !== id) throw new Error(`v4: population ${id} has wrong region`);
      if (population.namedAlive < 0) throw new Error(`v4: population ${id} is negative`);
      if (population.unnamedByAgeSex) {
        for (const sex of ['female', 'male'] as const) {
          const values = population.unnamedByAgeSex[sex];
          if (!Array.isArray(values) || values.some((value) => value < 0))
            throw new Error(`v4: population ${id} has invalid ${sex} cohorts`);
        }
      } else if (population.unnamedByAgeBand) {
        if (Object.values(population.unnamedByAgeBand).some((value) => value < 0))
          throw new Error(`v4: population ${id} is negative`);
      } else {
        throw new Error(`v4: population ${id} has no cohorts`);
      }
    }
    for (const [familyId, policy] of Object.entries(world.macro.eventPool)) {
      if (policy.familyId !== familyId) throw new Error(`v4: event pool ${familyId} has wrong id`);
      if (policy.weightMultiplier < 0 || policy.weightMultiplier > 3)
        throw new Error(`v4: event pool ${familyId} weight out of range`);
    }
  }
}
