import { z } from 'zod';
import type { LifeTrajectory } from '../life-trajectory/schema.js';

/**
 * Bounded, declarative rule grammar for the shared world.
 *
 * This module is deliberately independent from the simulation contracts. The
 * runtime maps these declarations onto existing economy, health, relationship,
 * organisation and travel mechanics through adapters. No string is evaluated
 * as code, SQL or a network request.
 */

const id = z
  .string()
  .min(1)
  .max(140)
  .regex(/^[a-zA-Z0-9_:~./-]+$/);
const ref = z
  .string()
  .min(1)
  .max(160)
  .regex(/^[a-zA-Z0-9_:~./-]+$/);
const finite = z.number().finite();
const chance = z.number().min(0).max(1);

export const ScopeSchema = z
  .object({
    kind: z.enum(['person', 'household', 'organization', 'site', 'region', 'polity', 'world']),
    ids: z.array(id).max(64).default([]),
  })
  .strict();
export type Scope = z.infer<typeof ScopeSchema>;
export type ScopeKind = Scope['kind'];

export const AbilityModeSchema = z.enum([
  'sense',
  'knowledge',
  'influence',
  'healing',
  'movement',
  'production',
  'communication',
]);
export type AbilityMode = z.infer<typeof AbilityModeSchema>;

export const RoleSchema = z
  .object({
    name: id,
    minAge: z.number().min(0).max(150).default(0),
    maxAge: z.number().min(0).max(150).default(150),
    occupation: z.string().max(60).optional(),
    personId: id.optional(),
    relatedTo: id.optional(),
    memberOf: id.optional(),
    capability: AbilityModeSchema.optional(),
    minTrust: z.number().min(-1).max(1).default(-1),
    willingness: chance.default(0.5),
    sameSite: z.boolean().default(true),
  })
  .strict();
export type Role = z.infer<typeof RoleSchema>;

export const PredicateFieldSchema = z.enum([
  'age',
  'coin',
  'health',
  'stress',
  'learning',
  'craft',
  'education',
  'knowledge',
  'food',
  'medicine',
  'scarcity',
  'unrest',
  'population',
  'legitimacy',
  'military',
  'treasury',
  'members',
  'disease',
  'year',
  'war',
  'trust',
  'influence',
  'abilityUses',
  'exposure',
]);
export type PredicateField = z.infer<typeof PredicateFieldSchema>;

export type Predicate =
  | { op: 'all' | 'any'; args: Predicate[] }
  | { op: 'not'; arg: Predicate }
  | {
      op: 'compare';
      role?: string;
      of?: 'person' | 'site' | 'polity' | 'world' | 'organization';
      field: PredicateField;
      cmp: 'gte' | 'lte' | 'eq';
      value: number;
    };

export const PredicateSchema: z.ZodType<Predicate> = z.lazy(() =>
  z.union([
    z.object({ op: z.enum(['all', 'any']), args: z.array(PredicateSchema).max(16) }).strict(),
    z.object({ op: z.literal('not'), arg: PredicateSchema }).strict(),
    z
      .object({
        op: z.literal('compare'),
        role: id.optional(),
        of: z.enum(['person', 'site', 'polity', 'world', 'organization']).optional(),
        field: PredicateFieldSchema,
        cmp: z.enum(['gte', 'lte', 'eq']),
        value: finite.min(-1_000_000_000).max(1_000_000_000),
      })
      .strict(),
  ]),
);

export const StepActionSchema = z.enum([
  'practice',
  'seek_work',
  'care',
  'socialize',
  'relocate',
  'organize',
  'petition',
  'research',
  'publish',
  'aid',
  'project',
  'faith',
  'campaign',
  'negotiate',
]);
export type StepAction = z.infer<typeof StepActionSchema>;

export const DomainSchema = z.enum([
  'craft',
  'science',
  'culture',
  'medicine',
  'civic',
  'commerce',
]);

export const EffectSchema = z.discriminatedUnion('type', [
  z
    .object({
      type: z.literal('transfer'),
      from: ref,
      to: ref,
      resource: z.enum(['coin', 'food', 'medicine']),
      amount: finite.positive().max(1_000_000),
    })
    .strict(),
  z
    .object({
      type: z.literal('learn'),
      role: id,
      field: z.enum(['craft', 'learning', 'education', 'knowledge']),
      amount: finite.positive().max(0.2),
    })
    .strict(),
  z
    .object({
      type: z.literal('relate'),
      from: id,
      to: id,
      amount: finite.min(-0.5).max(0.5),
      kind: z.enum(['acquaintance', 'friend', 'partner', 'rival', 'kin']).optional(),
    })
    .strict(),
  z
    .object({
      type: z.literal('offer'),
      role: id,
      intention: z.string().min(1).max(160),
      action: StepActionSchema,
      targetId: ref.optional(),
      domain: DomainSchema.optional(),
    })
    .strict(),
  z
    .object({
      type: z.literal('pressure'),
      kind: z.enum(['epidemic', 'supply', 'crisis', 'innovation', 'reform']),
      severity: finite.positive().max(0.25),
      months: z.number().int().min(1).max(120),
      cost: finite.min(0).max(20).default(0),
      target: ref.optional(),
    })
    .strict(),
  z
    .object({
      type: z.literal('ability'),
      actor: id,
      target: id.optional(),
      mode: AbilityModeSchema,
      strength: finite.positive().max(0.2),
      cost: finite.min(0).max(20).default(0),
    })
    .strict(),
  z
    .object({
      type: z.literal('policy'),
      role: id,
      kind: z.enum(['cooperate', 'seek_knowledge', 'avoid_scarcity']),
      strength: finite.positive().max(0.15),
      months: z.number().int().min(1).max(120),
    })
    .strict(),
  z
    .object({
      type: z.literal('health'),
      role: id,
      amount: finite.min(-0.5).max(0.5),
    })
    .strict(),
  z
    .object({
      type: z.literal('knowledge'),
      role: id.optional(),
      site: ref.optional(),
      field: z.enum(['craft', 'learning', 'education', 'knowledge']),
      amount: finite.min(-0.2).max(0.2),
    })
    .strict(),
  z
    .object({
      type: z.literal('unrest'),
      site: ref.optional(),
      amount: finite.min(-0.3).max(0.3),
    })
    .strict(),
  z
    .object({
      type: z.literal('legitimacy'),
      polity: ref.optional(),
      amount: finite.min(-0.2).max(0.2),
    })
    .strict(),
  z
    .object({
      type: z.literal('military'),
      polity: ref.optional(),
      amount: finite.min(-0.2).max(0.2),
    })
    .strict(),
  z
    .object({
      type: z.literal('disease'),
      site: ref.optional(),
      prevalence: chance,
      months: z.number().int().min(1).max(120),
    })
    .strict(),
]);
export type Effect = z.infer<typeof EffectSchema>;
export type EffectType = Effect['type'];

export const ProcessSchema = z
  .object({
    months: z.number().int().min(1).max(1200),
    interval: z.number().int().min(1).max(120).default(1),
    upkeep: finite.min(0).max(20).default(0),
    payerRole: id.optional(),
    effects: z.array(EffectSchema).max(6).default([]),
    allowVacancy: z.boolean().default(true),
  })
  .strict();
export type ProcessDefinition = z.infer<typeof ProcessSchema>;

export const AbilityDefinitionSchema = z
  .object({
    mode: AbilityModeSchema,
    potency: finite.positive().max(1),
    rangeKm: finite.min(0).max(5000).default(0),
    cost: finite.min(0).max(20).default(0),
    healthCost: finite.min(0).max(0.2).default(0),
    cooldown: z.number().int().min(1).max(120).default(3),
    maxUses: z.number().int().min(1).max(1000).default(12),
    exposureRisk: chance.default(0.15),
    countermeasures: z.array(z.string().min(1).max(80)).max(6).default([]),
  })
  .strict();
export type AbilityDefinition = z.infer<typeof AbilityDefinitionSchema>;

export const ProvenanceSchema = z
  .object({
    source: z.enum(['model', 'birth', 'director', 'builtin', 'legacy']),
    jobId: id.optional(),
    model: z.string().max(120).default('none'),
    observedMonth: z.number().int().nonnegative().default(0),
    compiler: z.literal('rules/1'),
    inputHash: z.string().max(128).optional(),
    rationale: z.string().max(500).optional(),
  })
  .strict();
export type DefinitionProvenance = z.infer<typeof ProvenanceSchema>;

export const RuleSchema = z
  .object({
    schemaVersion: z.literal(1),
    id,
    version: z.number().int().min(1).max(100000),
    kind: z.enum(['life', 'event', 'institution', 'ability', 'process']),
    title: z.string().min(1).max(120),
    scope: ScopeSchema,
    roles: z.array(RoleSchema).min(1).max(4),
    trigger: z
      .object({
        kind: z.enum([
          'periodic',
          'birth',
          'death',
          'migration',
          'war',
          'shortage',
          'tech',
          'event',
        ]),
        interval: z.number().int().min(1).max(120).default(1),
        eventKind: z.string().min(1).max(64).optional(),
      })
      .strict(),
    conditions: PredicateSchema.default({ op: 'all', args: [] }),
    effects: z.array(EffectSchema).min(1).max(12),
    process: ProcessSchema.optional(),
    ability: AbilityDefinitionSchema.optional(),
    chance: chance.default(1),
    cooldown: z.number().int().min(1).max(1200).default(12),
    maxOccurrences: z.number().int().min(1).max(10000).default(100),
    caps: z
      .object({
        perSite: z.number().int().min(1).max(1000).default(4),
        perMonth: z.number().int().min(1).max(100).default(4),
        global: z.number().int().min(1).max(10000).default(1000),
      })
      .strict()
      .default({ perSite: 4, perMonth: 4, global: 1000 }),
    gas: z.number().int().min(100).max(100000).default(4000),
    significance: chance.default(0.55),
    provenance: ProvenanceSchema,
  })
  .strict()
  .superRefine((rule, ctx) => {
    const names = new Set<string>();
    for (const role of rule.roles) {
      if (names.has(role.name))
        ctx.addIssue({ code: 'custom', path: ['roles'], message: `duplicate role ${role.name}` });
      if (role.relatedTo && !names.has(role.relatedTo))
        ctx.addIssue({
          code: 'custom',
          path: ['roles'],
          message: `role ${role.name} relates to a role declared later or missing`,
        });
      if (role.memberOf && !role.memberOf.startsWith('org:'))
        ctx.addIssue({
          code: 'custom',
          path: ['roles'],
          message: `role ${role.name} membership source must be org:<id>`,
        });
      names.add(role.name);
    }
    const roleNames = names;
    const checkRef = (value: string | undefined, path: (string | number)[]) => {
      if (!value || value === 'site' || value === 'polity' || value === 'world') return;
      if (value.startsWith('person:') || value.startsWith('org:') || value.startsWith('site:'))
        return;
      if (!roleNames.has(value))
        ctx.addIssue({ code: 'custom', path, message: `unknown role reference ${value}` });
    };
    for (const effect of rule.effects) {
      if ('role' in effect) checkRef(effect.role, ['effects']);
      if ('actor' in effect) checkRef(effect.actor, ['effects']);
      if (effect.type === 'transfer') {
        checkRef(effect.from, ['effects']);
        checkRef(effect.to, ['effects']);
      }
      if (effect.type === 'relate') {
        checkRef(effect.from, ['effects']);
        checkRef(effect.to, ['effects']);
      }
      if (effect.type === 'pressure') checkRef(effect.target, ['effects']);
      if (effect.type === 'knowledge') {
        checkRef(effect.site, ['effects']);
      }
      if (effect.type === 'unrest' || effect.type === 'disease') checkRef(effect.site, ['effects']);
      if (effect.type === 'legitimacy' || effect.type === 'military')
        checkRef(effect.polity, ['effects']);
    }
    if (rule.process) {
      if (rule.process.payerRole && !roleNames.has(rule.process.payerRole))
        ctx.addIssue({
          code: 'custom',
          path: ['process', 'payerRole'],
          message: 'unknown process payer role',
        });
      for (const effect of rule.process.effects) {
        if ('role' in effect) checkRef(effect.role, ['process', 'effects']);
        if (effect.type === 'transfer') {
          checkRef(effect.from, ['process', 'effects']);
          checkRef(effect.to, ['process', 'effects']);
        }
      }
    }
    if (rule.kind === 'ability' && !rule.ability)
      ctx.addIssue({
        code: 'custom',
        path: ['ability'],
        message: 'ability rule needs ability limits',
      });
    if (rule.process && rule.kind !== 'institution' && rule.kind !== 'process')
      ctx.addIssue({
        code: 'custom',
        path: ['process'],
        message: 'process can only be attached to institution/process rules',
      });
    if (rule.scope.kind === 'person' && rule.scope.ids.length === 0)
      ctx.addIssue({ code: 'custom', path: ['scope'], message: 'person scope requires ids' });
    if (
      (rule.scope.kind === 'organization' || rule.scope.kind === 'household') &&
      rule.scope.ids.length === 0
    )
      ctx.addIssue({ code: 'custom', path: ['scope'], message: 'scope requires ids' });
    if (rule.trigger.kind === 'event' && !rule.trigger.eventKind)
      ctx.addIssue({
        code: 'custom',
        path: ['trigger', 'eventKind'],
        message: 'event trigger requires eventKind',
      });
  });

export type RuleDefinition = z.infer<typeof RuleSchema>;
export type RuleKind = RuleDefinition['kind'];

export type DefinitionKey = string;
export type DefinitionLifecycle = {
  status: 'active' | 'retired' | 'paused';
  activatedAt: number;
  causeId: string;
  failures: number;
  occurrences: number;
  lastBySite: Record<string, number>;
  countBySite?: Record<string, number>;
};
export type ProcessInstance = {
  id: string;
  definitionKey: DefinitionKey;
  siteId: string;
  roles: Record<string, string>;
  started: number;
  due: number;
  until: number;
  causeIds: string[];
  status: 'active' | 'ended' | 'failed';
  ticks: number;
  lastEventId?: string;
};
export type AbilityState = {
  id: string;
  personId: string;
  definitionKey: DefinitionKey;
  mode: AbilityMode;
  potency: number;
  cost: number;
  healthCost: number;
  cooldown: number;
  lastUsed: number;
  uses: number;
  maxUses: number;
  exposure: number;
  blockedUntil?: number;
  causeIds: string[];
};
export type Exposure = {
  id: string;
  abilityId: string;
  personId: string;
  witnessIds: string[];
  organizationIds: string[];
  causeId: string;
  month: number;
  responded: boolean;
};
export type Opportunity = {
  id: string;
  personId: string;
  definitionKey: DefinitionKey;
  title: string;
  action: StepAction;
  targetId?: string;
  siteId?: string;
  dueMonth: number;
  status: 'open' | 'taken' | 'expired';
  causeIds: string[];
};
export type RuleTelemetry = {
  definitions: number;
  candidates: number;
  predicates: number;
  occurrences: number;
  failed: number;
  gasExhausted: number;
  lastMonth: number;
};
export type AuthorRequest = {
  id: string;
  siteId: string;
  reason: string;
  month: number;
  kind: 'event_author' | 'history_director';
  causeIds: string[];
  status: 'open' | 'dispatched' | 'used' | 'failed';
  jobId: string;
  pressure?: string;
};
export type BirthAppearance = {
  skin: number;
  hair: number;
  clothes: number;
  doll?: Record<string, unknown>;
};
export type PendingBirth = {
  id: string;
  userId: string;
  siteId: string;
  parentIds: string[];
  createdMonth: number;
  deadline: number;
  jobId: string;
  registrationEventId?: string;
  status: 'compiling' | 'born' | 'failed';
  childId?: string;
  request: {
    name: string;
    sex: 'female' | 'male' | 'intersex';
    health: number;
    body?: string;
    appearance: BirthAppearance;
    wish: string;
    preferredLocationId?: string;
    lifeMode?: 'ordinary' | 'legendary';
    creationHints?: {
      familyBackground?: string;
      personalityTendency?: string;
      secret?: string;
      destinyHook?: string;
      omen?: string;
      tags?: string[];
    };
  };
  failure?: string;
};
export type LifeInterpretation = {
  hopes: string[];
  conditions: string[];
  costs: string[];
  translations: string[];
};
export type LifeGoalCandidate = {
  kind: 'survive' | 'belong' | 'learn' | 'reform' | 'prosper';
  weight: number;
  reason: string;
};
export type LifeTrajectoryResolution = {
  beatId: string;
  branchId: string;
  month: number;
  eventId?: string;
  roll: number;
  outcome: string;
  applied: string[];
  skipped: string[];
};

export type LifeTrajectoryRuntime = {
  status: 'active' | 'completed' | 'interrupted';
  cursor: number;
  resolved: LifeTrajectoryResolution[];
  trajectory: LifeTrajectory;
};

export type LifeProgram = {
  version: 1;
  id: string;
  personId: string;
  source: 'model' | 'fallback';
  createdMonth: number;
  wish: string;
  interpretation: LifeInterpretation;
  traits: {
    health: number;
    temperament: { care: number; ambition: number; tradition: number };
    personality: {
      openness: number;
      conscientiousness: number;
      extraversion: number;
      agreeableness: number;
      neuroticism: number;
    };
  };
  goals: LifeGoalCandidate[];
  opportunities: string[];
  replanTriggers: string[];
  abilitySpec?: AbilityDefinition;
  abilityDefinitionKey?: string;
  milestones?: string[];
  status: 'active' | 'superseded';
  causeIds: string[];
  lifeTrajectory?: LifeTrajectoryRuntime;
  creationHints?: {
    familyBackground?: string;
    personalityTendency?: string;
    secret?: string;
    destinyHook?: string;
    omen?: string;
    tags?: string[];
  };
};
export type HiddenFuture = {
  title: string;
  probability: number;
  conditions: string[];
  outcome: string;
};
export type HiddenFutures = {
  birthId: string;
  inputHash: string;
  model: string;
  possibilities: HiddenFuture[];
  rawModelOutput?: string;
};
export type DeathSummary = {
  personId: string;
  birthMonth: number;
  deathMonth: number;
  reason: string;
  lifeProgramId?: string;
  wish?: string;
  source?: 'model' | 'fallback';
  milestones: string[];
  eventIds: string[];
  structured: string;
};
export type DirectorState = {
  preferences: Record<string, number>;
  preferenceUntil: number;
  lastActionMonth: number;
  actions: {
    id: string;
    kind: string;
    month: number;
    scope: string;
    causeId: string;
    accepted: boolean;
    reason: string;
  }[];
};
export type RuleState = {
  schemaVersion: 1;
  definitions: Record<DefinitionKey, RuleDefinition>;
  active: Record<
    string,
    { version: number; key: DefinitionKey; activatedAt: number; causeId: string }
  >;
  lifecycle: Record<DefinitionKey, DefinitionLifecycle>;
  processes: Record<string, ProcessInstance>;
  abilities: Record<string, AbilityState>;
  exposures: Record<string, Exposure>;
  opportunities: Record<string, Opportunity>;
  receipts: string[];
  telemetry: RuleTelemetry;
  authorRequests: AuthorRequest[];
  births: Record<string, PendingBirth>;
  lifePrograms: Record<string, LifeProgram>;
  hiddenFutures: Record<string, HiddenFutures>;
  deathSummaries?: Record<string, DeathSummary>;
  director?: DirectorState;
};

export const RuleStateSchema = z
  .object({
    schemaVersion: z.literal(1),
    definitions: z.record(z.string(), RuleSchema).default({}),
    active: z
      .record(
        z.string(),
        z.object({
          version: z.number().int().positive(),
          key: z.string(),
          activatedAt: z.number().int().nonnegative(),
          causeId: z.string(),
        }),
      )
      .default({}),
    lifecycle: z
      .record(
        z.string(),
        z.object({
          status: z.enum(['active', 'retired', 'paused']),
          activatedAt: z.number().int().nonnegative(),
          causeId: z.string(),
          failures: z.number().int().nonnegative(),
          occurrences: z.number().int().nonnegative(),
          lastBySite: z.record(z.string(), z.number().int()),
          countBySite: z.record(z.string(), z.number().int()).optional(),
        }),
      )
      .default({}),
    processes: z
      .record(
        z.string(),
        z.object({
          id: z.string(),
          definitionKey: z.string(),
          siteId: z.string(),
          roles: z.record(z.string(), z.string()),
          started: z.number().int().nonnegative(),
          due: z.number().int().nonnegative(),
          until: z.number().int().nonnegative(),
          causeIds: z.array(z.string()),
          status: z.enum(['active', 'ended', 'failed']),
          ticks: z.number().int().nonnegative(),
          lastEventId: z.string().optional(),
        }),
      )
      .default({}),
    abilities: z.record(z.string(), z.unknown()).default({}),
    exposures: z.record(z.string(), z.unknown()).default({}),
    opportunities: z.record(z.string(), z.unknown()).default({}),
    receipts: z.array(z.string()).max(512).default([]),
    telemetry: z
      .object({
        definitions: z.number().int().nonnegative(),
        candidates: z.number().int().nonnegative(),
        predicates: z.number().int().nonnegative(),
        occurrences: z.number().int().nonnegative(),
        failed: z.number().int().nonnegative(),
        gasExhausted: z.number().int().nonnegative(),
        lastMonth: z.number().int().nonnegative(),
      })
      .default({
        definitions: 0,
        candidates: 0,
        predicates: 0,
        occurrences: 0,
        failed: 0,
        gasExhausted: 0,
        lastMonth: 0,
      }),
    authorRequests: z.array(z.unknown()).max(256).default([]),
    births: z.record(z.string(), z.unknown()).default({}),
    lifePrograms: z.record(z.string(), z.unknown()).default({}),
    hiddenFutures: z.record(z.string(), z.unknown()).default({}),
    deathSummaries: z.record(z.string(), z.unknown()).optional(),
    director: z.unknown().optional(),
  })
  .strict();

export const RULE_COMPILER_VERSION = 'rules/1' as const;
export const MAX_ACTIVE_DEFINITIONS = 512;
export const MAX_PROCESSES = 4096;
export const MAX_OPPORTUNITIES = 4096;
export const MAX_EXPOSURES = 4096;
export const MAX_BIRTHS = 20_000;
export const MAX_LIFE_PROGRAMS = 20_000;
