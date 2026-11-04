import { pathToFileURL } from 'node:url';
import type { EventEffect, RoleRequirement } from '../packages/v4/domain.js';
import type { PlotKernel } from '../packages/v4/composition/types.js';
import { KERNEL_LIBRARY } from '../packages/v4/content/kernels/index.js';

const ROLE_KINDS = new Set<RoleRequirement['kind']>([
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
  'historical',
]);
const BUILTIN_EFFECT_REFS = new Set([
  'subject',
  'household',
  'residence',
  'school',
  'workplace',
  'subjectPlace',
  'subjectOrg',
  'employerOrg',
  'eventId',
]);
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
  'milieu',
  'context',
  'flavor',
  'subjectPronoun',
]);
const RELATION_KINDS = new Set([
  'kin',
  'guardian',
  'partner',
  'friend',
  'colleague',
  'employer',
  'rival',
  'acquaintance',
]);
const PLACEHOLDERS = new Set([
  '@school',
  '@workplace',
  '@factory',
  '@market',
  '@hospital',
  '@government',
  '@cafe',
  '@station',
  '@home',
  '@rural',
  '@university',
]);
const MAJOR_EFFECTS = new Set<EventEffect['type']>([
  'education',
  'employment',
  'unemployment',
  'relation_end',
  'household',
  'residence',
  'role',
  'organization_membership',
  'birth',
  'death',
  'estate',
  'move',
  'condition',
  'flag',
]);

const path = process.argv[2];
if (!path) {
  console.error('usage: tsx scripts/v4-recipe-check.ts <recipe-file.ts> [exportName]');
  process.exit(2);
}
const module = (await import(pathToFileURL(path).href)) as Record<string, unknown>;
const exportName =
  process.argv[3] ??
  Object.keys(module).find((key) => {
    const value = module[key];
    return Array.isArray(value) && value.every((item) => typeof item === 'object');
  });
if (!exportName || !Array.isArray(module[exportName])) {
  console.error(`no exported kernel array found in ${path}`);
  process.exit(2);
}
const kernels = module[exportName] as PlotKernel[];
const existing = new Set(KERNEL_LIBRARY.map((kernel) => kernel.id));
const errors: string[] = [];
const seen = new Set<string>();

function validateOutcome(
  kernelId: string,
  outcome: PlotKernel['outcomes'][number],
  roleKeys: Set<string>,
): void {
  if (!outcome.id) errors.push(`${kernelId}: outcome without id`);
  if (!outcome.text || outcome.text.length <= 45) {
    errors.push(`${kernelId}/${outcome.id}: text is too short (${outcome.text?.length ?? 0})`);
  }
  if (!outcome.effects || outcome.effects.length === 0) {
    errors.push(`${kernelId}/${outcome.id}: no effects`);
  }
  for (const match of (outcome.text ?? '').matchAll(/\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g)) {
    const token = match[1]!;
    if (!BUILTIN_TEXT_TOKENS.has(token) && !roleKeys.has(token)) {
      errors.push(`${kernelId}/${outcome.id}: unknown text token {${token}}`);
    }
  }
  for (const effect of outcome.effects ?? []) {
    if (
      (effect.type === 'relation' || effect.type === 'relation_end') &&
      !RELATION_KINDS.has(effect.kind)
    ) {
      errors.push(`${kernelId}/${outcome.id}: invalid relation kind ${effect.kind}`);
    }
    for (const [key, value] of Object.entries(effect)) {
      if (typeof value !== 'string') continue;
      if (value.startsWith('$')) {
        const ref = value.slice(1);
        if (!BUILTIN_EFFECT_REFS.has(ref) && !roleKeys.has(ref)) {
          errors.push(`${kernelId}/${outcome.id}/${effect.type}.${key}: unknown ref $${ref}`);
        }
      }
      if (value.startsWith('@') && !PLACEHOLDERS.has(value)) {
        errors.push(
          `${kernelId}/${outcome.id}/${effect.type}.${key}: unknown placeholder ${value}`,
        );
      }
    }
  }
  if ((outcome.significance ?? 0) >= 0.7) {
    if (!(outcome.effects ?? []).some((effect) => MAJOR_EFFECTS.has(effect.type))) {
      errors.push(`${kernelId}/${outcome.id}: major outcome without major effect`);
    }
  }
}

for (const kernel of kernels) {
  if (seen.has(kernel.id)) errors.push(`${kernel.id}: duplicate id inside file`);
  if (existing.has(kernel.id))
    console.warn(`WARN ${kernel.id}: id already exists in KERNEL_LIBRARY`);
  seen.add(kernel.id);
  if (!kernel.stage) errors.push(`${kernel.id}: missing stage`);
  if (!kernel.title || kernel.title.length < 2) errors.push(`${kernel.id}: weak title`);
  if (kernel.ageWindow.min > kernel.ageWindow.max) errors.push(`${kernel.id}: bad age window`);
  if (!kernel.roles.some((role) => role.kind === 'subject')) {
    errors.push(`${kernel.id}: missing subject role`);
  }
  for (const role of kernel.roles) {
    if (!ROLE_KINDS.has(role.kind)) errors.push(`${kernel.id}/${role.key}: bad role kind`);
  }
  if (kernel.outcomes.length < 2) errors.push(`${kernel.id}: fewer than two outcomes`);
  const roleKeys = new Set(kernel.roles.map((role) => role.key));
  for (const outcome of kernel.outcomes) validateOutcome(kernel.id, outcome, roleKeys);
  for (const variant of kernel.variants ?? []) {
    const variantKeys = new Set([...roleKeys, ...(variant.roles ?? []).map((role) => role.key)]);
    for (const outcome of variant.outcomes ?? []) {
      validateOutcome(`${kernel.id}::${variant.id}`, outcome, variantKeys);
    }
  }
  if (kernel.kind === 'task') {
    if (!kernel.task) errors.push(`${kernel.id}: task without task metadata`);
    else if (kernel.task.goals.length === 0) errors.push(`${kernel.id}: task without goals`);
  }
}

console.log(`checked ${kernels.length} kernels from ${path}`);
if (errors.length > 0) {
  for (const error of errors.slice(0, 80)) console.error(`ERROR ${error}`);
  console.error(`${errors.length} error(s)`);
  process.exit(1);
}
console.log('OK');
