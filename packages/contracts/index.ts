import { AgendaDefinitionSchema } from '../planning/schema.js';
import type { AgencyState } from '../planning/index.js';
import type { IndustrialState } from '../industry/index.js';
import type { GeopoliticalState } from '../geopolitics/index.js';
import type { SocietyState } from '../society/index.js';
import type { WorldlineState } from '../worldlines/index.js';
import type { PoliticsState } from '../politics/index.js';
import type { IdentityState } from '../identity/index.js';
import type { MilitaryLogisticsState } from '../military/index.js';
import type { CoercionState } from '../coercion/index.js';
import type { SovereigntyState } from '../sovereignty/index.js';
import type { CrisisState } from '../crises/index.js';
import type { MovementState } from '../movements/index.js';
import type { RuleState } from '../rules/schema.js';
import { z } from 'zod';
export const VERSION = 'slw/1';
export type ID = string;
export type Goal = {
  id: ID;
  kind: 'survive' | 'belong' | 'learn' | 'reform' | 'prosper';
  strength: number;
  progress: number;
  status: 'active' | 'fulfilled' | 'abandoned';
  causeIds: ID[];
  reason?: string;
};
export type Memory = { id: ID; eventId: ID; month: number; salience: number };
export type Belief = { claimId: ID; confidence: number; sourceIds: ID[] };
export type Relationship = {
  personId: ID;
  trust: number;
  attachment: number;
  kind: 'acquaintance' | 'friend' | 'partner' | 'rival' | 'kin';
  causeIds?: ID[];
  contacts?: number;
  since: number;
};
export type Plan = {
  id: ID;
  kind: 'migrate' | 'research' | 'organize';
  step: number;
  targetId: ID;
  reserved: number;
  deadline: number;
  status: 'active' | 'complete' | 'failed';
  causeIds: ID[];
};
export type DollConfig = {
  bodyType?: 'male' | 'female' | 'muscular' | 'teen';
  head?: string;
  nose?: string;
  ears?: string;
  eyebrows?: string;
  expression?: string;
  earrings?: string;
  hairStyle?: string;
  hairColor?: string;
  eyeColor?: string;
  beard?: string;
  top?: string;
  topColor?: string;
  bottom?: string;
  bottomColor?: string;
  shoes?: string;
  shoeColor?: string;
  coat?: string;
  coatColor?: string;
  hat?: string;
  glasses?: string;
  backpack?: string;
  mask?: string;
};
export type LifeState = {
  needs: {
    food: number;
    rest: number;
    safety: number;
    belonging: number;
    purpose: number;
    autonomy: number;
  };
  emotions: { hope: number; fear: number; grief: number; anger: number };
  personality: {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    neuroticism: number;
  };
  career: { role: string; level: number; experience: number; employed: boolean; burnout: number };
  education: { level: number; months: number; field: string };
  housing: { quality: number; rent: number };
  debt: number;
  fatigue: number;
  history?: {
    sourceId: ID;
    causeId: ID;
    role: 'civilian' | 'caregiver' | 'worker' | 'displaced';
    since: number;
    contributions: number;
    status: 'active' | 'past';
  }[];
  lastDecision?: { kind: string; reason: string; month: number; causeIds: ID[] };
  injury?: string;
  illness?: {
    kind: 'respiratory';
    severity: number;
    started: number;
    remaining: number;
    causeIds: ID[];
  };
};
export type Person = {
  sex?: 'female' | 'male' | 'intersex';
  body?: { healthNote?: string; condition?: string };
  journey?: {
    planId: ID;
    routeId: ID;
    fromId: ID;
    toId: ID;
    departed: number;
    distanceKm: number;
    progressKm: number;
    lastApplied: number;
    blockedMonths: number;
    causeIds: ID[];
  };
  id: ID;
  version: number;
  name: string;
  ownerId?: ID;
  birth: number;
  death?: number;
  deathCause?: string;
  locationId: ID;
  originCohortId: ID;
  parents: ID[];
  householdId: ID;
  occupation: string;
  background?: string;
  intention?: string;
  historicalIdentity?: {
    qid: string;
    sourceUrl: string;
    birthPrecision: string;
    careerHint?: string;
  };
  coin: number;
  health: number;
  stress: number;
  values: { care: number; ambition: number; tradition: number };
  skills: { craft: number; learning: number };
  goals: Goal[];
  memories: Memory[];
  beliefs: Belief[];
  relationships: Relationship[];
  plans: Plan[];
  commitments: {
    id: ID;
    kind: string;
    targetId: ID;
    status: 'active' | 'closed';
    causeIds: ID[];
  }[];
  policy?: AgentPolicy & { adoptedAt: number; causeIds: ID[] };
  appearance: { skin: number; hair: number; clothes: number; doll?: DollConfig };
  life?: LifeState;
  title?: string;
};
export type Settlement = {
  regionId?: ID;
  id: ID;
  name: string;
  lon?: number;
  lat?: number;
  sourcePopulation?: number;
  disease?: { prevalence: number; immune: number; causeId: ID };
  economy?: {
    unemployment: number;
    healthcare: number;
    education: number;
    infrastructure: number;
    inflation: number;
    productionMultiplier: number;
    tradeMultiplier: number;
  };
  x: number;
  y: number;
  biome: 'plains' | 'forest' | 'hills';
  neighbors: ID[];
  polityId: ID;
  cohort: { id: ID; children: number; adults: number; elders: number };
  food: number;
  coin: number;
  fertility: number;
  knowledge: number;
  prosperity: number;
  scarcity: number;
  price: number;
  unrest: number;
  birthRemainder: number;
  deathRemainder: number;
};
export type Polity = {
  id: ID;
  name: string;
  color: string;
  treasury: number;
  legitimacy: number;
  tax: number;
  leaderId: ID;
  military: number;
  research: number;
  realWorld?: { iso3: string; population: number; populationYear: number; gdpMillions: number };
};
export type Organization = {
  id: ID;
  name: string;
  kind: 'guild' | 'academy' | 'council';
  locationId: ID;
  creatorId: ID;
  leaderId: ID;
  memberIds: ID[];
  treasury: number;
  founded: number;
  status: 'active' | 'dissolved';
  definition: Definition;
  progress: number;
  insolventMonths: number;
  adoption: number;
  causeIds: ID[];
};
export type Conflict = {
  id: ID;
  a: ID;
  b: ID;
  locationId: ID;
  months: number;
  status: 'active' | 'ended';
  causeIds: ID[];
};
export type HistoricalEvent = {
  id: ID;
  worldId: ID;
  month: number;
  kind: string;
  personIds: ID[];
  locationId?: ID;
  causeIds: ID[];
  significance: number;
  text: string;
  data: Record<string, unknown>;
};
export type Claim = {
  id: ID;
  subjectId: ID;
  predicate: string;
  truth: 'true' | 'false' | 'unknown';
  sourceIds: ID[];
};
export type World = {
  /** Optional v3 runtime. Old snapshots omit it and are initialized on first advance. */
  runtime?: RuleState;
  sovereignty?: SovereigntyState;
  crises?: CrisisState;
  movements?: MovementState;
  coercion?: CoercionState;
  politics?: PoliticsState;
  identity?: IdentityState;
  militaryLogistics?: MilitaryLogisticsState;
  migrations?: {
    earthDuplicateSettlements?: { version: 1; appliedMonth: number; eventId?: ID };
    earthLandRouteModes?: { version: 1; eventId: ID; month: number };
  };
  agency?: AgencyState;
  industry?: IndustrialState;
  geopolitics?: GeopoliticalState;
  society?: SocietyState;
  worldlines?: WorldlineState;
  schema: string;
  id: ID;
  seed: string;
  epoch: number;
  month: number;
  revision: number;
  pack: { id: string; version: string };
  status: 'running' | 'archived';
  terminalReason?: 'civilization_collapse' | 'transformation' | 'horizon' | 'operator';
  parameters: { researchRate: number; lifeComplexity?: boolean; openHistory?: boolean };
  calendar?: {
    startYear: number;
    mode: 'historical-simulation';
    sources: { name: string; url: string; dataYear: number }[];
  };
  routes?: {
    id: string;
    from: ID;
    to: ID;
    km: number;
    mode: 'rail' | 'air' | 'sea' | 'road';
    capacity: number;
    status: 'open' | 'restricted';
  }[];
  shocks?: {
    id: ID;
    kind:
      | 'epidemic'
      | 'supply'
      | 'flood'
      | 'earthquake'
      | 'war'
      | 'crisis'
      | 'reform'
      | 'innovation'
      | 'peace'
      | 'displacement'
      | 'attack';
    title?: string;
    historicalKind?: 'war';
    actualConflictIds?: string[];
    sourceUrl?: string;
    resolved?: boolean;
    stats?: { casualties: number; displaced: number; relief: number; consumedSupply: number };
    locationIds: ID[];
    started: number;
    ends: number;
    severity: number;
    causeId: ID;
  }[];
  appliedSourceEvents?: ID[];
  baselinePopulation: number;
  collapseMonths: number;
  maxYears: number;
  settlements: Settlement[];
  polities: Polity[];
  persons: Person[];
  organizations: Organization[];
  conflicts: Conflict[];
  claims: Claim[];
  discoveries?: {
    id: ID;
    name: string;
    creatorId: ID;
    locationId: ID;
    createdAt: number;
    mechanism: 'production_improvement';
    gain: number;
    causeIds: ID[];
  }[];
  eventSeq: number;
  appliedCommands: ID[];
  processedJobs: ID[];
  audit: {
    producedFood: number;
    consumedFood: number;
    destroyedFood: number;
    births: number;
    deaths: number;
  };
  terminalEvidence: ID[];
  knowledgeEvidence?: ID[];
};
export const DefinitionSchema = z
  .object({
    version: z.literal(1),
    kind: z.enum(['guild', 'academy', 'council']),
    name: z.string().min(2).max(60),
    mechanism: z.enum(['pooled_production', 'research', 'mutual_aid']),
    upkeep: z.number().int().min(1).max(20),
    dues: z.number().int().min(1).max(5),
    effect: z.number().min(0.01).max(0.15),
    ttlMonths: z.number().int().min(12).max(1200),
    maxMembers: z.number().int().min(3).max(100),
    splitOnConflict: z.boolean().optional(),
  })
  .strict();
export type Definition = z.infer<typeof DefinitionSchema>;
export const DollSchema = z
  .object({
    bodyType: z.enum(['male', 'female', 'muscular', 'teen']).optional(),
    ...Object.fromEntries(
      [
        'head',
        'nose',
        'ears',
        'eyebrows',
        'expression',
        'earrings',
        'hairStyle',
        'beard',
        'top',
        'bottom',
        'shoes',
        'coat',
        'hat',
        'glasses',
        'backpack',
        'mask',
      ].map((k) => [
        k,
        z
          .string()
          .regex(/^[a-zA-Z0-9_/-]*$/)
          .max(160)
          .optional(),
      ]),
    ),
    ...Object.fromEntries(
      ['hairColor', 'eyeColor', 'topColor', 'bottomColor', 'shoeColor', 'coatColor'].map((k) => [
        k,
        z
          .string()
          .regex(/^#[0-9a-fA-F]{6}$/)
          .optional(),
      ]),
    ),
  })
  .strict();
export const BirthAppearanceSchema = z
  .object({
    skin: z.number().int().min(0).max(11).default(1),
    hair: z.number().int().min(0).max(15).default(0),
    clothes: z.number().int().min(0).max(15).default(2),
    doll: DollSchema.optional(),
  })
  .strict();

export const CreationHintsSchema = z
  .object({
    familyBackground: z.string().trim().max(80).optional(),
    personalityTendency: z.string().trim().max(80).optional(),
    secret: z.string().trim().max(300).optional(),
    destinyHook: z.string().trim().max(300).optional(),
    omen: z.string().trim().max(200).optional(),
    tags: z
      .array(
        z
          .string()
          .trim()
          .min(2)
          .max(40)
          .regex(/^[a-z0-9_:-]+$/i),
      )
      .max(12)
      .optional(),
  })
  .strict();
export type CreationHints = z.infer<typeof CreationHintsSchema>;

/**
 * A user creates only a newborn. Family, era, class, place constraints and any
 * anomaly quota are decided by the authoritative world, never by the client.
 */
export const BirthRequestSchema = z
  .object({
    name: z.string().trim().min(1).max(32),
    sex: z.enum(['female', 'male', 'intersex']).default('female'),
    health: z.number().min(0.2).max(1).default(0.9),
    body: z.string().max(300).optional(),
    appearance: BirthAppearanceSchema.default({ skin: 1, hair: 0, clothes: 2 }),
    wish: z.string().trim().min(1).max(1000),
    preferredLocationId: z.string().max(64).optional(),
    lifeMode: z.enum(['ordinary', 'legendary']).optional(),
    creationHints: CreationHintsSchema.optional(),
  })
  .strict();
export type BirthRequest = z.infer<typeof BirthRequestSchema>;
export const AgentPolicySchema = z
  .object({
    version: z.literal(1),
    kind: z.enum(['cooperate', 'seek_knowledge', 'avoid_scarcity']),
    strength: z.number().min(0).max(0.15),
    ttlMonths: z.number().int().min(1).max(1200),
  })
  .strict();

export type AgentPolicy = z.infer<typeof AgentPolicySchema>;
export const ProposalSchema = z
  .object({
    version: z.literal(1),
    jobId: z.string().max(100),
    actorId: z.string().max(100),
    actorVersion: z.number().int().nonnegative(),
    deadline: z.number().int().nonnegative(),
    action: z.enum(['move', 'research', 'found', 'publish']),
    targetId: z.string().max(100).optional(),
    definition: DefinitionSchema.optional(),
    policy: AgentPolicySchema.optional(),
  })
  .strict();
export type Proposal = z.infer<typeof ProposalSchema>;
export type Command =
  | { id: ID; kind: 'birth'; userId: ID; request: BirthRequest }
  | {
      id: ID;
      kind: 'birth_compile';
      birthId: string;
      proposal: unknown;
      source: 'model' | 'fallback';
    }
  | { id: ID; kind: 'proposal'; proposal: Proposal }
  | { id: ID; kind: 'agenda'; proposal: unknown }
  | {
      id: ID;
      kind: 'rule_proposal';
      proposal: unknown;
      source: 'model' | 'builtin' | 'director';
      jobId?: ID;
    }
  | { id: ID; kind: 'director_action'; proposal: unknown; jobId?: ID }
  | { id: ID; kind: 'close'; reason: 'operator' }
  | { id: ID; kind: 'expand_earth'; version: 1 };
export type Transition = {
  world: World;
  events: HistoricalEvent[];
  results: { id: ID; ok: boolean; value?: unknown; error?: string }[];
};
export const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v));
export const population = (w: World) =>
  w.settlements.reduce((n, s) => n + s.cohort.children + s.cohort.adults + s.cohort.elders, 0) +
  w.persons.filter((p) => p.death === undefined).length;
export const publicPerson = (p: Person) => {
  const { ownerId, background, ...publicState } = p;
  return publicState;
};
export function safeText(value: string): string {
  return value
    .replace(/[<>]/g, '')
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '')
    .replace(/[\ud800-\udfff]/gu, '')
    .replace(/[\u202a-\u202e\u2066-\u2069]/g, '')
    .replace(/(?:rape|dismember|虐杀|强奸|肢解)/gi, '[敏感内容已省略]')
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[隐私信息已省略]')
    .replace(/(?<!\d)(?:\+?86[- ]?)?1[3-9]\d{9}(?!\d)/g, '[隐私信息已省略]')
    .slice(0, 1000);
}

export const ActionSchema = ProposalSchema;
export const ProcessSchema = z
  .object({
    version: z.literal(1),
    kind: z.enum(['migrate', 'research', 'organize']),
    targetId: z.string().max(100),
    deadline: z.number().int().nonnegative(),
    reserved: z.number().min(0).max(1000),
    maxSteps: z.number().int().min(1).max(24),
  })
  .strict();
