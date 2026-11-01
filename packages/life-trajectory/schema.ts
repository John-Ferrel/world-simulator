import { z } from 'zod';

/**
 * Declarative grammar for a birth-time life draft.
 *
 * This module deliberately contains no runtime code execution, SQL or network
 * access. A trajectory is a bounded, inspectable set of candidate beats and
 * abstract effects. The simulator remains the only authority allowed to turn a
 * projected beat into committed world history.
 */

export const LIFE_STAGES = [
  'infancy',
  'childhood',
  'adolescence',
  'adulthood',
  'elderhood',
] as const;
export const LifeStageSchema = z.enum(LIFE_STAGES);
export type LifeStage = z.infer<typeof LifeStageSchema>;

export const STAGE_AGE_RANGES: Record<LifeStage, { min: number; max: number }> = {
  infancy: { min: 0, max: 2 },
  childhood: { min: 3, max: 11 },
  adolescence: { min: 12, max: 17 },
  adulthood: { min: 18, max: 59 },
  elderhood: { min: 60, max: 110 },
};

export const ERA_BANDS = [
  'prewar_1900_1913',
  'great_war_1914_1918',
  'interwar_1919_1938',
  'world_war_1939_1945',
  'postwar_1946_1950',
  'outside_1900_1950',
] as const;
export const EraBandSchema = z.enum(ERA_BANDS);
export type EraBand = z.infer<typeof EraBandSchema>;

export const REGION_TYPES = [
  'rural',
  'provincial_town',
  'industrial_city',
  'metropolis',
  'coastal_port',
] as const;
export const RegionTypeSchema = z.enum(REGION_TYPES);
export type RegionType = z.infer<typeof RegionTypeSchema>;

export const FAMILY_CLASSES = ['destitute', 'poor', 'working', 'middle', 'elite'] as const;
export const FamilyClassSchema = z.enum(FAMILY_CLASSES);
export type FamilyClass = z.infer<typeof FamilyClassSchema>;

export const FAMILY_STATES = ['intact', 'single_parent', 'orphan', 'unknown'] as const;
export const FamilyStateSchema = z.enum(FAMILY_STATES);
export type FamilyState = z.infer<typeof FamilyStateSchema>;

export const PERSON_SEXES = ['female', 'male', 'intersex'] as const;
export const PersonSexSchema = z.enum(PERSON_SEXES);
export type PersonSex = z.infer<typeof PersonSexSchema>;

export const PRESSURE_KINDS = [
  'war',
  'famine',
  'epidemic',
  'displacement',
  'unrest',
  'persecution',
] as const;
export const PressureKindSchema = z.enum(PRESSURE_KINDS);
export type PressureKind = z.infer<typeof PressureKindSchema>;

export const WORLD_SHOCK_KINDS = [
  'epidemic',
  'supply',
  'flood',
  'earthquake',
  'war',
  'crisis',
  'reform',
  'innovation',
  'peace',
  'displacement',
  'attack',
] as const;
export const WorldShockKindSchema = z.enum(WORLD_SHOCK_KINDS);
export type WorldShockKind = z.infer<typeof WorldShockKindSchema>;

export const LEGAL_STATUSES = [
  'free',
  'displaced',
  'orphaned',
  'criminalized',
  'detained',
  'institutionalized',
  'stateless',
] as const;
export const LegalStatusSchema = z.enum(LEGAL_STATUSES);
export type LegalStatus = z.infer<typeof LegalStatusSchema>;

export const OUTCOME_KINDS = [
  'survive',
  'injury',
  'illness',
  'death',
  'bereavement',
  'orphaned',
  'migration',
  'displacement',
  'institutionalized',
  'criminalized',
  'detained',
  'addiction',
  'conversion',
  'upward',
  'poverty',
  'disappearance',
  'unknown',
  'family',
  'work',
  'exploitation',
  'solidarity',
  'repression',
] as const;
export const OutcomeKindSchema = z.enum(OUTCOME_KINDS);
export type OutcomeKind = z.infer<typeof OutcomeKindSchema>;

const unit = z.number().min(-1).max(1);
const probability = z.number().min(0).max(1);

export const MigrationEffectSchema = z
  .object({
    scope: z.enum(['local', 'regional', 'international']),
    reason: z.string().min(2).max(160),
  })
  .strict();
export type MigrationEffect = z.infer<typeof MigrationEffectSchema>;

/**
 * Effects are normalized deltas, not raw world numbers. The engine scales
 * `wealth` by local survival cost and interprets `deathRisk` as a hazard for
 * the selected branch. This keeps the catalog portable across economies whose
 * raw coin supplies differ by orders of magnitude.
 */
export const LifeEffectsSchema = z
  .object({
    health: unit.optional(),
    wealth: unit.optional(),
    safety: unit.optional(),
    relationships: unit.optional(),
    education: unit.optional(),
    stress: unit.optional(),
    stigma: unit.optional(),
    addiction: unit.optional(),
    fertility: unit.optional(),
    occupation: z.string().min(1).max(40).optional(),
    migration: MigrationEffectSchema.optional(),
    legalStatus: LegalStatusSchema.optional(),
    deathRisk: probability.optional(),
  })
  .strict()
  .refine((effects) => Object.keys(effects).length > 0, {
    message: 'a branch must carry at least one effect',
  });
export type LifeEffects = z.infer<typeof LifeEffectsSchema>;

export const BranchOutcomeSchema = z
  .object({
    kind: OutcomeKindSchema,
    label: z.string().min(2).max(100),
  })
  .strict();
export type BranchOutcome = z.infer<typeof BranchOutcomeSchema>;

export const LifeBranchSchema = z
  .object({
    id: z
      .string()
      .min(2)
      .max(60)
      .regex(/^[a-z0-9_]+$/),
    label: z.string().min(2).max(100),
    weight: z.number().min(0.01).max(100),
    outcome: BranchOutcomeSchema,
    effects: LifeEffectsSchema,
    causes: z.array(z.string().min(2).max(120)).min(1).max(8),
  })
  .strict();
export type LifeBranch = z.infer<typeof LifeBranchSchema>;

export const PressureThresholdsSchema = z
  .object({
    war: probability.optional(),
    famine: probability.optional(),
    epidemic: probability.optional(),
    displacement: probability.optional(),
    unrest: probability.optional(),
    persecution: probability.optional(),
  })
  .strict();

export const AnyPressureThresholdSchema = z
  .object({
    kind: PressureKindSchema,
    min: probability,
  })
  .strict();

export const TriggerConditionSchema = z
  .object({
    stages: z.array(LifeStageSchema).min(1).optional(),
    age: z
      .object({
        min: z.number().min(0).max(110).optional(),
        max: z.number().min(0).max(110).optional(),
      })
      .strict()
      .optional(),
    years: z
      .object({
        min: z.number().int().min(1800).max(2200).optional(),
        max: z.number().int().min(1800).max(2200).optional(),
      })
      .strict()
      .optional(),
    eras: z.array(EraBandSchema).min(1).optional(),
    regions: z.array(RegionTypeSchema).min(1).optional(),
    classes: z.array(FamilyClassSchema).min(1).optional(),
    sexes: z.array(PersonSexSchema).min(1).optional(),
    health: z
      .object({
        min: z.number().min(0).max(1).optional(),
        max: z.number().min(0).max(1).optional(),
      })
      .strict()
      .optional(),
    familyStates: z.array(FamilyStateSchema).min(1).optional(),
    minPressures: PressureThresholdsSchema.optional(),
    anyPressures: z.array(AnyPressureThresholdSchema).min(1).max(6).optional(),
    minScarcity: probability.optional(),
    maxScarcity: probability.optional(),
    minUnrest: probability.optional(),
    maxHealthcare: probability.optional(),
    minProsperity: probability.optional(),
    maxProsperity: probability.optional(),
    minUnemployment: probability.optional(),
    activeShockKinds: z.array(WorldShockKindSchema).min(1).optional(),
    requiresPriorBeat: z
      .array(
        z
          .string()
          .min(2)
          .max(60)
          .regex(/^[a-z0-9_]+$/),
      )
      .min(1)
      .max(6)
      .optional(),
    requiresMigration: z.boolean().optional(),
  })
  .strict();
export type TriggerCondition = z.infer<typeof TriggerConditionSchema>;

export const LifeBeatSchema = z
  .object({
    id: z
      .string()
      .min(2)
      .max(60)
      .regex(/^[a-z0-9_]+$/),
    title: z.string().min(2).max(80),
    stage: LifeStageSchema,
    ageWindow: z
      .object({
        min: z.number().int().min(0).max(110),
        max: z.number().int().min(0).max(110),
      })
      .strict(),
    triggers: TriggerConditionSchema,
    weight: z.number().min(0.05).max(20),
    /**
     * How strongly the beat belongs to a high-variance life. Legendary mode
     * raises positive values and suppresses negative ones; it is not a
     * protagonist bonus. High-risk beats carry positive values too.
     */
    volatilityBias: z.number().min(-1).max(1),
    tags: z
      .array(
        z
          .string()
          .min(2)
          .max(40)
          .regex(/^[a-z0-9_]+$/),
      )
      .min(1)
      .max(12),
    historicalBasis: z.string().min(10).max(500),
    sources: z.array(z.string().min(3).max(200)).min(1).max(4),
    branches: z.array(LifeBranchSchema).min(1).max(5),
    incompatibleWith: z
      .array(
        z
          .string()
          .min(2)
          .max(60)
          .regex(/^[a-z0-9_]+$/),
      )
      .max(6)
      .optional(),
  })
  .strict()
  .superRefine((beat, ctx) => {
    const range = STAGE_AGE_RANGES[beat.stage];
    if (beat.ageWindow.min > beat.ageWindow.max) {
      ctx.addIssue({ code: 'custom', message: `beat ${beat.id} has an inverted age window` });
    }
    if (beat.ageWindow.min < range.min || beat.ageWindow.max > range.max) {
      ctx.addIssue({
        code: 'custom',
        message: `beat ${beat.id} age window is outside its ${beat.stage} stage`,
      });
    }
    if (beat.ageWindow.min < 18 && beat.tags.includes('sex_work')) {
      ctx.addIssue({
        code: 'custom',
        message: `sex_work beat ${beat.id} must start at age 18 or later`,
      });
    }
    const ids = new Set<string>();
    for (const branch of beat.branches) {
      if (ids.has(branch.id))
        ctx.addIssue({ code: 'custom', message: `duplicate branch ${branch.id}` });
      ids.add(branch.id);
    }
  });
export type LifeBeat = z.infer<typeof LifeBeatSchema>;

export const LifeTrajectoryModeSchema = z.enum(['ordinary', 'legendary']);
export type LifeTrajectoryMode = z.infer<typeof LifeTrajectoryModeSchema>;

export const LifeTrajectoryOptionsSchema = z
  .object({
    seed: z.string().min(1).max(240).optional(),
    mode: LifeTrajectoryModeSchema.default('ordinary'),
    startAge: z.number().int().min(0).max(110).optional(),
    endAge: z.number().int().min(1).max(110).default(85),
    maxBeats: z.number().int().min(1).max(40).default(20),
    premiseTags: z
      .array(
        z
          .string()
          .min(2)
          .max(40)
          .regex(/^[a-z0-9_:-]+$/i),
      )
      .max(12)
      .optional(),
  })
  .strict();
export type LifeTrajectoryOptionsInput = z.input<typeof LifeTrajectoryOptionsSchema>;
export type LifeTrajectoryOptions = z.output<typeof LifeTrajectoryOptionsSchema>;

export type ActiveShock = {
  id: string;
  kind: WorldShockKind;
  severity: number;
  title?: string;
};

export type TrajectoryFamily = {
  state: FamilyState;
  parentsAlive: number;
  householdSize: number;
  parentWealthRank: number;
  parentPrestige: number;
  guardianOccupation?: string;
};

export type LifeTrajectoryContext = {
  worldId: string;
  personId: string;
  seed: string;
  year: number;
  month: number;
  era: EraBand;
  stage: LifeStage;
  ageYears: number;
  sex: PersonSex;
  health: number;
  familyClass: FamilyClass;
  classScore: number;
  region: RegionType;
  settlement: {
    id: string;
    name: string;
    polityId: string;
    population: number;
    prosperity: number;
    scarcity: number;
    unrest: number;
    healthcare: number;
    unemployment: number;
  };
  family: TrajectoryFamily;
  pressures: Record<PressureKind, number>;
  activeShocks: ActiveShock[];
  vulnerability: number;
  opportunities: number;
  /** Human-readable causal constraints; every generated beat retains these. */
  constraints: string[];
};

export type ProjectedLifeState = {
  alive: boolean;
  age: number;
  health: number;
  wealth: number;
  safety: number;
  relationships: number;
  education: number;
  stress: number;
  stigma: number;
  addiction: number;
  fertility: number;
  occupation: string;
  legalStatus: LegalStatus;
  migrations: number;
  internationalMigrations: number;
  disappeared: boolean;
};

export type GeneratedLifeBeat = {
  beatId: string;
  title: string;
  stage: LifeStage;
  age: number;
  ageWindow: { min: number; max: number };
  branchId: string;
  branchLabel: string;
  outcome: BranchOutcome;
  effects: LifeEffects;
  tags: string[];
  source: string;
  historicalBasis: string;
  /** Why this beat was eligible in this particular life. */
  triggerReasons: string[];
  /** Definition tags + branch causes + contextual constraints. */
  causes: string[];
  volatilityBias: number;
};

export type PossibleEnding = {
  kind: OutcomeKind;
  label: string;
  sourceBeatIds: string[];
};

export type LifeTrajectoryEnding = {
  kind:
    'dead' | 'open' | 'unknown' | 'migrated' | 'institutionalized' | 'criminalized' | 'stateless';
  label: string;
  atAge: number;
  certainty: 'projection';
};

export type LifeTrajectoryStats = {
  beatCount: number;
  extremeBeatCount: number;
  riskBeatCount: number;
  migrationCount: number;
  deathRolls: number;
  earlyDeath: boolean;
};

export type LifeTrajectory = {
  version: 1;
  seed: string;
  mode: LifeTrajectoryMode;
  worldId: string;
  personId: string;
  startAge: number;
  endAge: number;
  context: LifeTrajectoryContext;
  beats: GeneratedLifeBeat[];
  projected: ProjectedLifeState;
  possibleEndings: PossibleEnding[];
  ending: LifeTrajectoryEnding;
  stats: LifeTrajectoryStats;
  /** Explicit, non-cosmetic warning. The trajectory is a draft, not history. */
  disclaimer: string;
  warnings: string[];
};
