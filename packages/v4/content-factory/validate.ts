import type { StatePack } from '../state/registry.js';
import type { EventEffect, SceneCondition } from '../domain.js';
import type { PlotKernel } from '../composition/types.js';
import { createCompositionSource } from '../composition/composer.js';
import type { WorldState } from '../domain.js';
import { validateStatePack } from '../state/registry.js';

const VALID_EFFECTS = new Set<EventEffect['type']>([
  'cash',
  'food',
  'health',
  'condition',
  'mood',
  'reputation',
  'skill',
  'flag',
  'education',
  'employment',
  'unemployment',
  'relation',
  'relation_end',
  'role',
  'organization_membership',
  'project',
  'interaction',
  'move',
  'household',
  'residence',
  'birth',
  'death',
  'estate',
  'organization_funds',
  'knowledge',
  'historical_participation',
  'historical_influence',
  'historical_process',
  'state_add',
  'state_remove',
  'state_parameter',
  'state_transition',
  'position',
  'organization_found',
]);
const VALID_CONDITIONS = new Set<SceneCondition['kind']>([
  'age',
  'stage',
  'cash',
  'householdSize',
  'overcrowded',
  'health',
  'skill',
  'education',
  'employment',
  'placeKind',
  'hasRole',
  'notHasRole',
  'development',
  'developmentType',
  'capability',
  'historicalProcess',
  'legacy',
  'hasRelationWith',
  'hasRelation',
  'notHasRelation',
  'worldYear',
  'region',
  'sex',
  'pressure',
  'history',
  'knowledge',
  'project',
  'relationHistory',
  'hasFlag',
  'hasState',
  'notHasState',
  'attribute',
  'position',
]);
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
const BUILTIN_TOKENS = new Set([
  'subject',
  'residence',
  'place',
  'school',
  'workplace',
  'age',
  'year',
  'child',
  'milieu',
  'context',
]);

export type StateContentValidation = {
  ok: boolean;
  errors: string[];
  warnings: string[];
  compiledScenes: number;
  compiledTasks: number;
};

function walkForbidden(value: unknown, path: string, errors: string[]): void {
  if (Array.isArray(value)) {
    value.forEach((child, index) => walkForbidden(child, `${path}[${index}]`, errors));
    return;
  }
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    if (FORBIDDEN_KEYS.has(key.toLowerCase())) errors.push(`${path}.${key}: forbidden key`);
    walkForbidden(child, `${path}.${key}`, errors);
  }
}

function checkEffect(
  effect: EventEffect,
  path: string,
  stateIds: Set<string>,
  errors: string[],
): void {
  if (!effect || !VALID_EFFECTS.has(effect.type)) {
    errors.push(`${path}: invalid effect ${String((effect as { type?: unknown })?.type)}`);
    return;
  }
  if (effect.type === 'state_add' && !stateIds.has(effect.stateId))
    errors.push(`${path}: unknown state ${effect.stateId}`);
  if (effect.type === 'state_transition') {
    if (!stateIds.has(effect.fromStateId))
      errors.push(`${path}: unknown state ${effect.fromStateId}`);
    if (!stateIds.has(effect.toStateId)) errors.push(`${path}: unknown state ${effect.toStateId}`);
  }
  if (effect.type === 'state_remove' && effect.stateId && !stateIds.has(effect.stateId))
    errors.push(`${path}: unknown state ${effect.stateId}`);
}

function checkConditions(
  conditions: SceneCondition[] | undefined,
  path: string,
  stateIds: Set<string>,
  errors: string[],
) {
  for (const [index, condition] of (conditions ?? []).entries()) {
    if (!condition || !VALID_CONDITIONS.has(condition.kind)) {
      errors.push(
        `${path}[${index}]: invalid condition ${String((condition as { kind?: unknown })?.kind)}`,
      );
      continue;
    }
    if (
      (condition.kind === 'hasState' || condition.kind === 'notHasState') &&
      condition.stateId &&
      !stateIds.has(condition.stateId)
    ) {
      errors.push(`${path}[${index}]: unknown condition state ${condition.stateId}`);
    }
  }
}

function checkKernel(
  kernel: PlotKernel,
  path: string,
  stateIds: Set<string>,
  kernelIds: Set<string>,
  errors: string[],
  warnings: string[],
): void {
  if (!kernel.id) errors.push(`${path}: missing id`);
  if (!kernel.title) errors.push(`${path}: missing title`);
  if (!kernel.roles.some((role) => role.kind === 'subject'))
    errors.push(`${path}: no subject role`);
  if ((kernel.outcomes?.length ?? 0) < 2) warnings.push(`${path}: fewer than 2 outcomes`);
  checkConditions(kernel.conditions, `${path}.conditions`, stateIds, errors);
  const roleKeys = new Set(kernel.roles.map((role) => role.key));
  for (const [outcomeIndex, outcome] of kernel.outcomes.entries()) {
    const outcomePath = `${path}/${outcome.id ?? outcomeIndex}`;
    if (!outcome.id) errors.push(`${outcomePath}: missing outcome id`);
    if (!(outcome.weight > 0)) errors.push(`${outcomePath}: weight must be > 0`);
    if (!outcome.text || outcome.text.length < 20) errors.push(`${outcomePath}: text too short`);
    if (!Array.isArray(outcome.effects) || outcome.effects.length === 0)
      errors.push(`${outcomePath}: no effects`);
    for (const [effectIndex, effect] of (outcome.effects ?? []).entries())
      checkEffect(effect, `${outcomePath}.effects[${effectIndex}]`, stateIds, errors);
    checkConditions(outcome.conditions, `${outcomePath}.conditions`, stateIds, errors);
    for (const match of outcome.text.matchAll(/\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g)) {
      const key = match[1]!;
      if (!roleKeys.has(key) && !BUILTIN_TOKENS.has(key))
        errors.push(`${outcomePath}: unknown text token {${key}}`);
    }
    for (const followup of outcome.followupTargets ?? []) {
      if (!kernelIds.has(followup.sceneId) && !followup.sceneId.startsWith('r1'))
        warnings.push(`${outcomePath}: followup ${followup.sceneId} is outside this pack`);
    }
  }
}

/**
 * Full content-factory gate: schema + typed vocabulary + text tokens +
 * cross-state refs + real composer compile. A pack is not publishable if any
 * of its kernels throws or leaves a major effect unresolved.
 */
export function validateStateContentPack(
  pack: StatePack,
  world: WorldState,
  date = world.date,
  baseStateIds: Set<string> = new Set(),
): StateContentValidation {
  const errors: string[] = [];
  const warnings: string[] = [];
  walkForbidden(pack, 'pack', errors);
  const base = validateStatePack(pack, baseStateIds);
  errors.push(...base.errors);
  warnings.push(...base.warnings);
  const stateIds = new Set([
    ...pack.states.map((state) => state.id),
    ...baseStateIds,
  ]);
  const kernelIds = new Set((pack.kernels ?? []).map((kernel) => kernel.id));
  for (const [index, kernel] of (pack.kernels ?? []).entries())
    checkKernel(kernel, `kernels[${index}]`, stateIds, kernelIds, errors, warnings);
  let compiledScenes = 0;
  let compiledTasks = 0;
  if ((pack.kernels?.length ?? 0) > 0 && errors.length === 0) {
    const source = createCompositionSource(pack.kernels!);
    const compiled = source.compile(world, date);
    compiledScenes = compiled.scenes.length;
    compiledTasks = compiled.tasks.length;
    for (const error of compiled.errors)
      errors.push(
        `compile ${error.kernelId}/${error.outcomeId}: ${error.effectType} ${error.reason}`,
      );
    if (compiled.scenes.length === 0 && compiled.tasks.length === 0)
      warnings.push('pack compiled no scene in the supplied world/date; may be historically gated');
  }
  return {
    ok: errors.length === 0,
    errors,
    warnings,
    compiledScenes,
    compiledTasks,
  };
}
