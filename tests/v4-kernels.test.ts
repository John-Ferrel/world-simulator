import { describe, expect, it } from 'vitest';
import { KERNEL_LIBRARY } from '../packages/v4/content/kernels/index.js';
import type { EventEffect, RoleRequirement } from '../packages/v4/domain.js';

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

function validateOutcome(
  kernelId: string,
  outcome: { id: string; text: string; effects: EventEffect[]; significance?: number },
  roleKeys: Set<string>,
) {
  expect(outcome.id, kernelId).toBeTruthy();
  expect(outcome.text.length, `${kernelId}/${outcome.id}`).toBeGreaterThan(40);
  expect(outcome.effects.length, `${kernelId}/${outcome.id}`).toBeGreaterThan(0);
  for (const match of outcome.text.matchAll(/\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g)) {
    const token = match[1]!;
    expect(
      BUILTIN_TEXT_TOKENS.has(token) || roleKeys.has(token),
      `${kernelId}/${outcome.id}: {${token}}`,
    ).toBe(true);
  }
  for (const effect of outcome.effects) {
    for (const [key, value] of Object.entries(effect)) {
      if (typeof value !== 'string') continue;
      if (value.startsWith('$')) {
        const ref = value.slice(1);
        expect(
          BUILTIN_EFFECT_REFS.has(ref) || roleKeys.has(ref),
          `${kernelId}/${outcome.id}/${effect.type}.${key}: $${ref}`,
        ).toBe(true);
      }
      if (value.startsWith('@')) {
        expect(PLACEHOLDERS.has(value), `${kernelId}/${outcome.id}/${effect.type}.${key}`).toBe(
          true,
        );
      }
    }
  }
  if (outcome.significance !== undefined && outcome.significance >= 0.7) {
    expect(
      outcome.effects.some((effect) => MAJOR_EFFECTS.has(effect.type)),
      `${kernelId}/${outcome.id}: major outcome without major effect`,
    ).toBe(true);
  }
}

describe('Phase 11 Plot Kernel library', () => {
  it('has a substantial multi-domain kernel library', () => {
    expect(KERNEL_LIBRARY.length).toBeGreaterThanOrEqual(100);
    const ids = KERNEL_LIBRARY.map((kernel) => kernel.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(KERNEL_LIBRARY.map((kernel) => kernel.domain)).size).toBeGreaterThanOrEqual(8);
    expect(KERNEL_LIBRARY.filter((kernel) => kernel.kind === 'task').length).toBeGreaterThanOrEqual(
      20,
    );
    expect(
      KERNEL_LIBRARY.reduce((sum, kernel) => sum + (kernel.variants?.length ?? 0), 0),
    ).toBeGreaterThanOrEqual(15);
  });

  it('keeps every kernel contract executable', () => {
    for (const kernel of KERNEL_LIBRARY) {
      expect(kernel.stage, kernel.id).toBeTruthy();
      expect(kernel.ageWindow.min, kernel.id).toBeLessThanOrEqual(kernel.ageWindow.max);
      expect(
        kernel.roles.some((role) => role.kind === 'subject'),
        kernel.id,
      ).toBe(true);
      for (const role of kernel.roles) {
        expect(ROLE_KINDS.has(role.kind), `${kernel.id}/${role.key}`).toBe(true);
      }
      const roleKeys = new Set(kernel.roles.map((role) => role.key));
      expect(kernel.outcomes.length, kernel.id).toBeGreaterThanOrEqual(2);
      for (const outcome of kernel.outcomes) validateOutcome(kernel.id, outcome, roleKeys);
      for (const variant of kernel.variants ?? []) {
        const variantRoles = new Set([
          ...roleKeys,
          ...(variant.roles ?? []).map((role) => role.key),
        ]);
        for (const outcome of variant.outcomes ?? []) {
          validateOutcome(`${kernel.id}::${variant.id}`, outcome, variantRoles);
        }
      }
      if (kernel.kind === 'task') {
        expect(kernel.task, kernel.id).toBeDefined();
        expect(kernel.task!.domain, kernel.id).toBeTruthy();
        expect(kernel.task!.goals.length, kernel.id).toBeGreaterThan(0);
      }
    }
  });
});
