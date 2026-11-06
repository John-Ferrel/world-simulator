import type {
  EventEffect,
  PersonAttributeKey,
  PersonLife,
  SceneCondition,
  StateOwnerType,
  StateParameterValue,
  WorldDate,
} from '../domain.js';
import type { CheckDefinition } from './runtime.js';

/**
 * Phase 15 state content contract.
 *
 * A StateDefinition is authored or generated data. It can carry a duration,
 * slots, event-weight modifiers, periodic checks, transitions and reactions to
 * committed tags. It cannot contain code, SQL, URLs, arbitrary expressions or
 * model-authored effects outside the typed EventEffect vocabulary.
 */
export type StateModifier =
  | {
      kind: 'scene_weight';
      /** Match scenes whose tags contain at least one of these. */
      tags?: string[];
      /** Match composed kernels by family id. */
      familyIds?: string[];
      multiplier: number;
    }
  | {
      kind: 'check_bonus';
      tags: string[];
      bonus: number;
    };

export type StateCheckSpec = CheckDefinition;

export type StateTickOutcome = {
  id: string;
  weight: number;
  /** Which band this outcome belongs to when the tick has a check. */
  result?: 'success' | 'failure' | 'critical_success' | 'critical_failure';
  text: string;
  effects: EventEffect[];
  conditions?: SceneCondition[];
  significance?: number;
};

export type StateTick = {
  id: string;
  /** Defaults to 12. A tick is due when month - lastTickAt >= everyMonths. */
  everyMonths?: number;
  conditions?: SceneCondition[];
  check?: StateCheckSpec;
  outcomes: StateTickOutcome[];
};

export type StateReaction = {
  id: string;
  /** Match a committed event carrying any of these semantic tags. */
  onTags?: string[];
  /** Match a committed action prefix, e.g. `r14-fam.betrayal`. */
  onActionPrefix?: string;
  /** The triggering event must have participants in all these roles. */
  requiresRoles?: string[];
  conditions?: SceneCondition[];
  /** 0..1 independent chance in addition to any check. */
  chance?: number;
  check?: StateCheckSpec;
  /** Effects applied when the reaction fires (or the check succeeds). */
  effects: EventEffect[];
  failureEffects?: EventEffect[];
  /** The reaction fact's text; role tokens resolve against the triggering event. */
  text: string;
  /** Optional text when the check fails; defaults to `text`. */
  failureText?: string;
  significance?: number;
  cooldownMonths?: number;
  maxPerYear?: number;
};

export type StateTransition = {
  id: string;
  to: string;
  conditions?: SceneCondition[];
  chance?: number;
  check?: StateCheckSpec;
  effects?: EventEffect[];
  reason: string;
};

export type StateParameterSpec = {
  type: 'number' | 'string' | 'boolean';
  default?: StateParameterValue;
  min?: number;
  max?: number;
};

export type StateProvenance = {
  kind: 'authored' | 'generated' | 'compiled_wish';
  author?: string;
  model?: string;
  sourceIds?: string[];
  /** Why the mechanic exists; never executed. */
  rationale?: string;
};

export type StateDefinition = {
  id: string;
  version: number;
  packId: string;
  title: string;
  description: string;
  owner: StateOwnerType;
  /** Conflict domain, e.g. education, employment, health, legal, secret, power, wish. */
  slot?: string;
  conflict?: 'block' | 'replace' | 'stack';
  maxStacks?: number;
  tags: string[];
  parameters?: Record<string, StateParameterSpec>;
  /** Typed links the state may hold. Values are ids of the declared owner type. */
  links?: Record<string, 'person' | 'organization' | 'household' | 'place'>;
  enterConditions?: SceneCondition[];
  durationMonths?: { min: number; max: number };
  modifiers?: StateModifier[];
  ticks?: StateTick[];
  transitions?: StateTransition[];
  reactions?: StateReaction[];
  exitWhen?: SceneCondition[];
  onEnter?: EventEffect[];
  onExit?: EventEffect[];
  /** Tags this state publishes to later conditions via hasState tag. */
  /** Optional bounded hook: attach this state when a live child is born. */
  autoAttachOnBirth?: {
    owner: 'household' | 'person';
    /** Link name declared in `links`, holding the newborn child id. */
    link: string;
    reason?: string;
  };
  historicalBasis?: string;
  sourceIds?: string[];
  provenance: StateProvenance;
};

export type StateLibraryValidation = {
  errors: string[];
  warnings: string[];
};

const ID_PATTERN = /^[a-z0-9][a-z0-9._:-]{2,119}$/;
const OWNER_TYPES: StateOwnerType[] = [
  'person',
  'organization',
  'household',
  'place',
  'region',
  'world',
];
const FORBIDDEN_KEYS = new Set([
  'code',
  'script',
  'sql',
  'http',
  'https',
  'url',
  'fetch',
  'api',
  'eval',
  'exec',
  'shell',
  'command',
]);
const FORBIDDEN_TEXT = /https?:\/\/|<script\b|SELECT\s+.+\s+FROM|\b(?:eval|exec|Function)\s*\(/i;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function assertNoForbiddenKeys(value: unknown, path: string, errors: string[]): void {
  if (Array.isArray(value)) {
    value.forEach((child, index) => assertNoForbiddenKeys(child, `${path}[${index}]`, errors));
    return;
  }
  if (!isRecord(value)) return;
  for (const [key, child] of Object.entries(value)) {
    if (FORBIDDEN_KEYS.has(key.toLowerCase())) {
      errors.push(`${path}.${key}: forbidden key`);
    }
    assertNoForbiddenKeys(child, `${path}.${key}`, errors);
  }
}

function validateCondition(condition: SceneCondition, path: string, errors: string[]): void {
  if (!isRecord(condition) || typeof condition.kind !== 'string') {
    errors.push(`${path}: condition has no kind`);
    return;
  }
  if (condition.kind === 'hasState') {
    if (!condition.stateId && !condition.tag) errors.push(`${path}: hasState needs stateId or tag`);
    if (condition.stateId && typeof condition.stateId !== 'string')
      errors.push(`${path}: invalid stateId`);
    if (condition.owner !== undefined && !OWNER_TYPES.includes(condition.owner))
      errors.push(`${path}: invalid owner ${String(condition.owner)}`);
  }
}

function validateEffect(effect: EventEffect, path: string, errors: string[]): void {
  if (!isRecord(effect) || typeof effect.type !== 'string') {
    errors.push(`${path}: effect has no type`);
    return;
  }
  if (effect.type === 'state_add' || effect.type === 'state_transition') {
    const stateId = effect.type === 'state_add' ? effect.stateId : effect.toStateId;
    if (!stateId || !ID_PATTERN.test(stateId))
      errors.push(`${path}: invalid state reference ${String(stateId)}`);
  }
  if (effect.type === 'state_remove' && !effect.stateId && !effect.tag)
    errors.push(`${path}: state_remove needs stateId or tag`);
}

export function validateStateDefinition(
  candidate: StateDefinition,
  path = candidate?.id ?? 'state',
): string[] {
  const errors: string[] = [];
  if (!isRecord(candidate)) return [`${path}: not an object`];
  assertNoForbiddenKeys(candidate, path, errors);
  if (!ID_PATTERN.test(candidate.id ?? '')) errors.push(`${path}: invalid id`);
  if (!Number.isInteger(candidate.version) || candidate.version < 1)
    errors.push(`${path}: invalid version`);
  if (!candidate.packId) errors.push(`${path}: packId missing`);
  if (!candidate.title) errors.push(`${path}: title missing`);
  if (!candidate.description) errors.push(`${path}: description missing`);
  if (!OWNER_TYPES.includes(candidate.owner)) errors.push(`${path}: invalid owner`);
  if (!Array.isArray(candidate.tags) || candidate.tags.length === 0)
    errors.push(`${path}: tags missing`);
  if (candidate.conflict && !['block', 'replace', 'stack'].includes(candidate.conflict))
    errors.push(`${path}: invalid conflict`);
  if (candidate.conflict === 'stack') {
    if (!Number.isInteger(candidate.maxStacks) || (candidate.maxStacks ?? 0) < 2)
      errors.push(`${path}: stack conflict needs maxStacks >= 2`);
  }
  if (candidate.durationMonths) {
    const { min, max } = candidate.durationMonths;
    if (!Number.isFinite(min) || !Number.isFinite(max) || min < 1 || max < min)
      errors.push(`${path}: invalid durationMonths`);
  }
  for (const [name, spec] of Object.entries(candidate.parameters ?? {})) {
    if (!['number', 'string', 'boolean'].includes(spec.type))
      errors.push(`${path}.parameters.${name}: invalid type`);
    if (spec.type === 'number') {
      if (spec.default !== undefined && typeof spec.default !== 'number')
        errors.push(`${path}.parameters.${name}: default must be number`);
      if (spec.min !== undefined && spec.max !== undefined && spec.min > spec.max)
        errors.push(`${path}.parameters.${name}: inverted bounds`);
    }
  }
  for (const [name, kind] of Object.entries(candidate.links ?? {})) {
    if (!['person', 'organization', 'household', 'place'].includes(kind))
      errors.push(`${path}.links.${name}: invalid target type`);
  }
  if (candidate.autoAttachOnBirth) {
    if (!['household', 'person'].includes(candidate.autoAttachOnBirth.owner))
      errors.push(`${path}.autoAttachOnBirth: invalid owner`);
    if (!candidate.links?.[candidate.autoAttachOnBirth.link])
      errors.push(`${path}.autoAttachOnBirth: link ${candidate.autoAttachOnBirth.link} not declared`);
  }
  (candidate.enterConditions ?? []).forEach((condition, index) =>
    validateCondition(condition, `${path}.enterConditions[${index}]`, errors),
  );
  (candidate.exitWhen ?? []).forEach((condition, index) =>
    validateCondition(condition, `${path}.exitWhen[${index}]`, errors),
  );
  for (const [index, modifier] of (candidate.modifiers ?? []).entries()) {
    if (modifier.kind === 'scene_weight') {
      if (!(modifier.multiplier >= 0.1 && modifier.multiplier <= 5))
        errors.push(`${path}.modifiers[${index}]: multiplier must be 0.1..5`);
      if ((modifier.tags?.length ?? 0) === 0 && (modifier.familyIds?.length ?? 0) === 0)
        errors.push(`${path}.modifiers[${index}]: no match key`);
    } else if (modifier.kind === 'check_bonus') {
      if (!(modifier.bonus >= -10 && modifier.bonus <= 10))
        errors.push(`${path}.modifiers[${index}]: bonus must be -10..10`);
    } else {
      errors.push(`${path}.modifiers[${index}]: unknown modifier`);
    }
  }
  for (const [tickIndex, tick] of (candidate.ticks ?? []).entries()) {
    const tickPath = `${path}.ticks[${tickIndex}]`;
    if (!tick.id) errors.push(`${tickPath}: id missing`);
    if (tick.everyMonths !== undefined && !(tick.everyMonths >= 1 && tick.everyMonths <= 600))
      errors.push(`${tickPath}: invalid everyMonths`);
    if (!Array.isArray(tick.outcomes) || tick.outcomes.length === 0)
      errors.push(`${tickPath}: no outcomes`);
    if (tick.check) validateCheck(tick.check, `${tickPath}.check`, errors);
    for (const [outcomeIndex, outcome] of (tick.outcomes ?? []).entries()) {
      const outcomePath = `${tickPath}.outcomes[${outcomeIndex}]`;
      if (!outcome.id) errors.push(`${outcomePath}: id missing`);
      if (!(outcome.weight > 0)) errors.push(`${outcomePath}: weight must be > 0`);
      if (!outcome.text || outcome.text.length < 8) errors.push(`${outcomePath}: text too short`);
      if (!Array.isArray(outcome.effects) || outcome.effects.length === 0)
        errors.push(`${outcomePath}: no effects`);
      (outcome.effects ?? []).forEach((effect, index) =>
        validateEffect(effect, `${outcomePath}.effects[${index}]`, errors),
      );
      (outcome.conditions ?? []).forEach((condition, index) =>
        validateCondition(condition, `${outcomePath}.conditions[${index}]`, errors),
      );
    }
  }
  for (const [reactionIndex, reaction] of (candidate.reactions ?? []).entries()) {
    const reactionPath = `${path}.reactions[${reactionIndex}]`;
    if (!reaction.id) errors.push(`${reactionPath}: id missing`);
    if ((!reaction.onTags || reaction.onTags.length === 0) && !reaction.onActionPrefix)
      errors.push(`${reactionPath}: no trigger tag or action prefix`);
    for (const role of reaction.requiresRoles ?? []) {
      if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(role))
        errors.push(`${reactionPath}: invalid required role ${role}`);
    }
    if (reaction.chance !== undefined && !(reaction.chance > 0 && reaction.chance <= 1))
      errors.push(`${reactionPath}: chance must be 0..1`);
    if (!reaction.text || reaction.text.length < 8) errors.push(`${reactionPath}: text too short`);
    if (reaction.failureText !== undefined && reaction.failureText.length < 8)
      errors.push(`${reactionPath}: failureText too short`);
    if (reaction.check) validateCheck(reaction.check, `${reactionPath}.check`, errors);
    (reaction.effects ?? []).forEach((effect, index) =>
      validateEffect(effect, `${reactionPath}.effects[${index}]`, errors),
    );
    (reaction.failureEffects ?? []).forEach((effect, index) =>
      validateEffect(effect, `${reactionPath}.failureEffects[${index}]`, errors),
    );
  }
  for (const [transitionIndex, transition] of (candidate.transitions ?? []).entries()) {
    const transitionPath = `${path}.transitions[${transitionIndex}]`;
    if (!ID_PATTERN.test(transition.to ?? ''))
      errors.push(`${transitionPath}: invalid target ${String(transition.to)}`);
    if (transition.chance !== undefined && !(transition.chance > 0 && transition.chance <= 1))
      errors.push(`${transitionPath}: chance must be 0..1`);
    if (transition.check) validateCheck(transition.check, `${transitionPath}.check`, errors);
  }
  for (const [index, effect] of (candidate.onEnter ?? []).entries())
    validateEffect(effect, `${path}.onEnter[${index}]`, errors);
  for (const [index, effect] of (candidate.onExit ?? []).entries())
    validateEffect(effect, `${path}.onExit[${index}]`, errors);
  for (const text of [candidate.title, candidate.description, candidate.historicalBasis ?? '']) {
    if (FORBIDDEN_TEXT.test(text)) errors.push(`${path}: forbidden text pattern`);
  }
  return errors;
}

function validateCheck(
  check: NonNullable<StateDefinition['ticks']>[number]['check'],
  path: string,
  errors: string[],
): void {
  if (!check) return;
  if (!(check.dc >= 2 && check.dc <= 40)) errors.push(`${path}: dc must be 2..40`);
  if (!check.attribute && !check.skill) errors.push(`${path}: check needs attribute or skill`);
  for (const [tag, bonus] of Object.entries(check.stateBonus ?? {})) {
    if (!(bonus >= -10 && bonus <= 10)) errors.push(`${path}.stateBonus.${tag}: out of range`);
  }
}

/**
 * Validate a whole library, including cross-state transitions. Content is not
 * published if any transition points at a missing state.
 */
export function validateStateLibrary(
  definitions: StateDefinition[],
  baseStateIds: Set<string> = new Set(),
): StateLibraryValidation {
  const errors: string[] = [];
  const warnings: string[] = [];
  const ids = new Map<string, StateDefinition>();
  for (const definition of definitions) {
    const definitionErrors = validateStateDefinition(definition);
    errors.push(...definitionErrors);
    if (ids.has(definition.id)) errors.push(`duplicate state id ${definition.id}`);
    ids.set(definition.id, definition);
  }
  for (const definition of definitions) {
    for (const transition of definition.transitions ?? []) {
      if (!ids.has(transition.to) && !baseStateIds.has(transition.to))
        errors.push(`${definition.id}: transition target ${transition.to} missing`);
    }
    for (const tick of definition.ticks ?? []) {
      for (const outcome of tick.outcomes) {
        for (const effect of outcome.effects) {
          const target = effect.type === 'state_add' ? effect.stateId : undefined;
          if (target && !ids.has(target) && !baseStateIds.has(target))
            errors.push(`${definition.id}/${tick.id}/${outcome.id}: unknown state ${target}`);
        }
      }
    }
    const sceneWeightTags = (definition.modifiers ?? [])
      .filter((modifier) => modifier.kind === 'scene_weight')
      .flatMap((modifier) => (modifier.kind === 'scene_weight' ? (modifier.tags ?? []) : []));
    if (sceneWeightTags.length === 0 && (definition.modifiers?.length ?? 0) === 0) {
      warnings.push(`${definition.id}: no event modifiers; state is purely reactive`);
    }
  }
  return { errors, warnings };
}

/** Fill defaults and clamp user/registry parameters to the declared shape. */
export function normalizeStateParameters(
  definition: StateDefinition,
  input: Record<string, StateParameterValue> | undefined,
): Record<string, StateParameterValue> {
  const result: Record<string, StateParameterValue> = {};
  for (const [key, spec] of Object.entries(definition.parameters ?? {})) {
    const value = input?.[key] ?? spec.default;
    if (value === undefined) continue;
    if (spec.type === 'number') {
      if (typeof value !== 'number' || !Number.isFinite(value)) continue;
      result[key] = Math.max(spec.min ?? -1e9, Math.min(spec.max ?? 1e9, value));
    } else if (spec.type === 'boolean') {
      if (typeof value === 'boolean') result[key] = value;
    } else if (typeof value === 'string') {
      result[key] = value.slice(0, 120);
    }
  }
  return result;
}

export function stateDuration(
  definition: StateDefinition,
  rng: () => number,
  requested?: number,
): number | undefined {
  const range = definition.durationMonths;
  if (requested !== undefined && Number.isFinite(requested)) {
    const minimum = range?.min ?? 1;
    const maximum = range?.max ?? 600;
    return Math.max(minimum, Math.min(maximum, Math.floor(requested)));
  }
  if (!range) return undefined;
  const span = Math.max(0, range.max - range.min);
  return range.min + Math.floor(rng() * (span + 1));
}

export function stateDateKey(date: WorldDate): string {
  return `${date.year}-${String(date.month).padStart(2, '0')}`;
}
