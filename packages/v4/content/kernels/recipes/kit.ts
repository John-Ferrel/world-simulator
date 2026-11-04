import type {
  EventEffect,
  Organization,
  Person,
  Place,
  Relation,
  RoleRequirement,
  SceneCondition,
  SceneStage,
} from '../../../domain.js';
import type { GeneratedTaskMeta } from '../../../generated.js';
import type {
  KernelOutcome,
  KernelVariant,
  KernelVariantWhen,
  PlotKernel,
} from '../../../composition/types.js';

/**
 * Compact authoring kit for Phase 12 Event Recipes.
 *
 * This is not a second runtime. It expands concise domain data into ordinary
 * PlotKernel / KernelOutcome / EventEffect objects, which are then compiled by
 * the existing composer and settled by the existing engine.
 */

export type RoleDecl =
  | RoleRequirement['kind']
  | [
      RoleRequirement['kind'],
      {
        minAge?: number;
        maxAge?: number;
        sex?: Person['sex'] | 'opposite';
        sameHousehold?: boolean;
        samePlaceKind?: Place['kind'];
        occupation?: string;
        organizationKind?: Organization['kind'];
        historicalId?: string;
        required?: boolean;
      },
    ];

export type RelationFx = [role: string, kind: Relation['kind'], trust?: number, affection?: number];

export type Fx = {
  cash?: number;
  food?: number;
  health?: number;
  mood?: number;
  reputation?: number;
  condition?: string | [string, boolean?];
  flag?: string | string[];
  role?: string | string[];
  loseRole?: string | string[];
  skill?: Partial<Record<keyof NonNullable<Person['life']>['skills'], number>>;
  relation?: RelationFx | RelationFx[];
  endRelation?: [role: string, kind: Relation['kind']];
  membership?: [orgRole: string, add?: boolean, reason?: string];
  funds?: [orgRole: string, amount: number, reason?: string];
  knowledge?: [proposition: string, confidence?: number, sourceRole?: string];
  move?: [place: string, reason?: string];
  household?: [householdId: string, reason?: string];
  residence?: [residenceId: string, reason?: string];
  education?: [status: Person['education']['status'], level?: number];
  employment?: [orgRole: string, occupation: string, wage: number];
  unemployment?: string | true;
  birth?: { father?: string; sex?: Person['sex']; reason?: string };
  death?: string | { cause: string; reason?: string };
  estate?: { heirHousehold?: string; amount: number; reason?: string };
  /** Full author-written effects for mechanics the shorthand does not cover. */
  raw?: EventEffect[];
};

export type OutcomeSpec = {
  id: string;
  w?: number;
  text: string;
  significance?: number;
  when?: KernelVariantWhen;
  /** One shorthand bundle, or several applied in order. */
  fx: Fx | Fx[];
};

export type VariantSpec = {
  id: string;
  when: KernelVariantWhen;
  title?: string;
  textPrefix?: string;
  conditions?: SceneCondition[];
  roles?: Record<string, RoleDecl>;
  outcomes?: OutcomeSpec[];
  rateMultiplier?: number;
};

export type RecipeSpec = {
  id: string;
  title: string;
  domain: string;
  kind?: 'event' | 'task';
  stage: SceneStage;
  ages: [number, number];
  tags: string[];
  familyId?: string;
  contexts?: string[];
  milieus?: string[];
  conditions?: SceneCondition[];
  roles?: Record<string, RoleDecl>;
  outcomes: OutcomeSpec[];
  variants?: VariantSpec[];
  baseRate?: number;
  cooldownYears?: number;
  significance?: number;
  subjectOccupation?: 'primary' | 'secondary';
  historicalBasis?: string;
  sourceIds?: string[];
  task?: GeneratedTaskMeta;
};

function expandRole(key: string, decl: RoleDecl, required = true): RoleRequirement {
  if (typeof decl === 'string') return { key, kind: decl, required };
  const [kind, options] = decl;
  return { key, kind, required: options.required ?? required, ...options };
}

export function compileEffect(fx: Fx, reason: string): EventEffect[] {
  const effects: EventEffect[] = [];
  if (fx.cash !== undefined) {
    effects.push({ type: 'cash', householdId: '$household', amount: fx.cash, reason });
  }
  if (fx.food !== undefined) {
    effects.push({ type: 'food', householdId: '$household', amount: fx.food, reason });
  }
  if (fx.health !== undefined) {
    effects.push({ type: 'health', personId: '$subject', amount: fx.health, reason });
  }
  if (fx.mood !== undefined) {
    effects.push({ type: 'mood', personId: '$subject', amount: fx.mood, reason });
  }
  if (fx.reputation !== undefined) {
    effects.push({ type: 'reputation', personId: '$subject', amount: fx.reputation, reason });
  }
  if (fx.condition) {
    const [condition, add = true] = Array.isArray(fx.condition)
      ? fx.condition
      : [fx.condition, true];
    effects.push({ type: 'condition', personId: '$subject', condition, add, reason });
  }
  if (fx.flag) {
    const flags = Array.isArray(fx.flag) ? fx.flag : [fx.flag];
    for (const flag of flags) {
      effects.push({ type: 'flag', personId: '$subject', flag, add: true, reason });
    }
  }
  const roles = fx.role === undefined ? [] : Array.isArray(fx.role) ? fx.role : [fx.role];
  for (const role of roles) {
    effects.push({ type: 'role', personId: '$subject', role, add: true, reason });
  }
  const lostRoles =
    fx.loseRole === undefined ? [] : Array.isArray(fx.loseRole) ? fx.loseRole : [fx.loseRole];
  for (const role of lostRoles) {
    effects.push({ type: 'role', personId: '$subject', role, add: false, reason });
  }
  for (const [skill, amount] of Object.entries(fx.skill ?? {})) {
    effects.push({
      type: 'skill',
      personId: '$subject',
      skill: skill as keyof NonNullable<Person['life']>['skills'],
      amount: amount ?? 0,
      reason,
    });
  }
  const relations =
    fx.relation === undefined
      ? []
      : Array.isArray(fx.relation[0])
        ? (fx.relation as RelationFx[])
        : [fx.relation as RelationFx];
  for (const [role, kind, trust = 0, affection = 0] of relations) {
    effects.push({
      type: 'relation',
      a: '$subject',
      b: `$${role}`,
      kind,
      trust,
      affection,
      reason,
    });
  }
  if (fx.endRelation) {
    effects.push({
      type: 'relation_end',
      a: '$subject',
      b: `$${fx.endRelation[0]}`,
      kind: fx.endRelation[1],
      reason,
    });
  }
  if (fx.membership) {
    effects.push({
      type: 'organization_membership',
      personId: '$subject',
      organizationId: `$${fx.membership[0]}`,
      add: fx.membership[1] ?? true,
      reason: fx.membership[2] ?? reason,
    });
  }
  if (fx.funds) {
    effects.push({
      type: 'organization_funds',
      organizationId: `$${fx.funds[0]}`,
      amount: fx.funds[1],
      reason: fx.funds[2] ?? reason,
    });
  }
  if (fx.knowledge) {
    const [proposition, confidence = 0.7, sourceRole] = fx.knowledge;
    effects.push({
      type: 'knowledge',
      holderId: '$subject',
      proposition,
      confidence,
      sourceKind: 'witnessed',
      ...(sourceRole ? { personId: `$${sourceRole}` } : {}),
      visibility: 'private',
      trueInWorld: true,
    });
  }
  if (fx.move) {
    effects.push({
      type: 'move',
      personId: '$subject',
      locationId: fx.move[0],
      reason: fx.move[1] ?? reason,
    });
  }
  if (fx.household) {
    effects.push({
      type: 'household',
      personId: '$subject',
      householdId: fx.household[0],
      reason: fx.household[1] ?? reason,
    });
  }
  if (fx.residence) {
    effects.push({
      type: 'residence',
      householdId: '$household',
      residenceId: fx.residence[0],
      reason: fx.residence[1] ?? reason,
    });
  }
  if (fx.education) {
    effects.push({
      type: 'education',
      personId: '$subject',
      status: fx.education[0],
      ...(fx.education[1] !== undefined ? { level: fx.education[1] } : {}),
      reason,
    });
  }
  if (fx.employment) {
    const [orgRole, occupation, wage] = fx.employment;
    effects.push({
      type: 'employment',
      personId: '$subject',
      organizationId: `$${orgRole}`,
      occupation,
      wage,
      workplaceId: '@workplace',
      reason,
    });
  }
  if (fx.unemployment) {
    effects.push({
      type: 'unemployment',
      personId: '$subject',
      reason: typeof fx.unemployment === 'string' ? fx.unemployment : reason,
    });
  }
  if (fx.birth) {
    effects.push({
      type: 'birth',
      parentIds: fx.birth.father ? ['$subject', `$${fx.birth.father}`] : ['$subject'],
      childSex: fx.birth.sex ?? 'female',
      reason: fx.birth.reason ?? reason,
    });
  }
  if (fx.death) {
    const death = typeof fx.death === 'string' ? { cause: fx.death, reason } : fx.death;
    effects.push({
      type: 'death',
      personId: '$subject',
      cause: death.cause,
      reason: death.reason ?? reason,
    });
  }
  if (fx.estate) {
    effects.push({
      type: 'estate',
      personId: '$subject',
      heirHouseholdId: fx.estate.heirHousehold ?? '$household',
      amount: fx.estate.amount,
      reason: fx.estate.reason ?? reason,
    });
  }
  effects.push(...(fx.raw ?? []));
  return effects;
}

function compileOutcome(spec: OutcomeSpec, fallbackReason: string): KernelOutcome {
  const bundles = Array.isArray(spec.fx) ? spec.fx : [spec.fx];
  const effects = bundles.flatMap((fx) => compileEffect(fx, fallbackReason));
  return {
    id: spec.id,
    weight: spec.w ?? 1,
    text: spec.text,
    effects,
    ...(spec.significance !== undefined ? { significance: spec.significance } : {}),
    ...(spec.when ? { when: spec.when } : {}),
  };
}

function compileVariant(spec: VariantSpec, fallbackReason: string): KernelVariant {
  return {
    id: spec.id,
    when: spec.when,
    ...(spec.title ? { title: spec.title } : {}),
    ...(spec.textPrefix ? { textPrefix: spec.textPrefix } : {}),
    ...(spec.conditions ? { conditions: spec.conditions } : {}),
    ...(spec.roles
      ? { roles: Object.entries(spec.roles).map(([key, decl]) => expandRole(key, decl)) }
      : {}),
    ...(spec.outcomes
      ? { outcomes: spec.outcomes.map((outcome) => compileOutcome(outcome, fallbackReason)) }
      : {}),
    ...(spec.rateMultiplier !== undefined ? { rateMultiplier: spec.rateMultiplier } : {}),
  };
}

export function recipe(spec: RecipeSpec): PlotKernel {
  const [min, max] = spec.ages;
  const roles: RoleRequirement[] = [
    { key: 'subject', kind: 'subject', required: true, minAge: min, maxAge: max },
    ...Object.entries(spec.roles ?? {}).map(([key, decl]) => expandRole(key, decl)),
  ];
  return {
    id: spec.id,
    title: spec.title,
    domain: spec.domain,
    kind: spec.kind ?? 'event',
    stage: spec.stage,
    ageWindow: { min, max },
    tags: spec.tags,
    ...(spec.familyId ? { familyId: spec.familyId } : {}),
    ...(spec.contexts ? { contexts: spec.contexts } : {}),
    ...(spec.milieus ? { milieus: spec.milieus } : {}),
    ...(spec.conditions ? { conditions: spec.conditions } : {}),
    roles,
    outcomes: spec.outcomes.map((outcome) => compileOutcome(outcome, spec.title)),
    ...(spec.variants
      ? { variants: spec.variants.map((variant) => compileVariant(variant, spec.title)) }
      : {}),
    ...(spec.baseRate !== undefined ? { baseRate: spec.baseRate } : {}),
    ...(spec.cooldownYears !== undefined ? { cooldownYears: spec.cooldownYears } : {}),
    ...(spec.significance !== undefined ? { significance: spec.significance } : {}),
    ...(spec.subjectOccupation ? { subjectOccupation: spec.subjectOccupation } : {}),
    ...(spec.historicalBasis ? { historicalBasis: spec.historicalBasis } : {}),
    ...(spec.sourceIds ? { sourceIds: spec.sourceIds } : {}),
    ...(spec.task ? { task: spec.task } : {}),
  };
}

export function recipes(specs: RecipeSpec[]): PlotKernel[] {
  return specs.map(recipe);
}

/** Small helper for task recipes so authors do not repeat the full shape. */
export function taskMeta(
  domain: GeneratedTaskMeta['domain'],
  goals: string[],
  needs: string[],
  baseUtility: number,
  risk: number,
  skills: string[] = [],
): GeneratedTaskMeta {
  return { domain, goals, needs, baseUtility, risk, skills };
}
