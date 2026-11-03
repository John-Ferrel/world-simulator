import { describe, expect, it } from 'vitest';
import {
  PHASE10_AUTHORED_EVENT_SCENES,
  PHASE10_AUTHORED_TASKS,
} from '../packages/v4/content/major-life.js';
import { VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import type {
  EventEffect,
  RoleRequirement,
  SceneDefinition,
  TaskDefinition,
} from '../packages/v4/domain.js';

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
const EDUCATION = new Set(['none', 'home', 'primary', 'secondary', 'apprenticeship', 'higher']);
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

function assertScene(scene: SceneDefinition, requireSignificantOutcome = true) {
  expect(scene.version, scene.id).toBe(1);
  expect(scene.id.startsWith('major-'), scene.id).toBe(true);
  expect(scene.subjectProvenance, scene.id).toEqual(
    expect.arrayContaining([
      'birth',
      'initial',
      'materialized_population',
      'historical_activation',
    ]),
  );
  expect(
    scene.roles.some((role) => role.kind === 'subject'),
    scene.id,
  ).toBe(true);
  for (const role of scene.roles) {
    expect(ROLE_KINDS.has(role.kind), `${scene.id}/${role.key}`).toBe(true);
  }
  const roleKeys = new Set(scene.roles.map((role) => role.key));
  const majorOutcomes = (scene.outcomes ?? []).filter(
    (outcome) => outcome.significance !== undefined && outcome.significance >= 0.7,
  );
  if (requireSignificantOutcome) expect(majorOutcomes.length, scene.id).toBeGreaterThan(0);
  expect(scene.outcomes?.length, scene.id).toBeGreaterThanOrEqual(2);
  for (const outcome of scene.outcomes ?? []) {
    expect(outcome.immediateText.length, `${scene.id}/${outcome.id}`).toBeGreaterThan(50);
    expect(outcome.effects.length, `${scene.id}/${outcome.id}`).toBeGreaterThanOrEqual(2);
    for (const match of outcome.immediateText.matchAll(/\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g)) {
      const token = match[1]!;
      expect(
        BUILTIN_TEXT_TOKENS.has(token) || roleKeys.has(token),
        `${scene.id}/${outcome.id}: {${token}}`,
      ).toBe(true);
    }
    for (const effect of outcome.effects) {
      if (effect.type !== 'knowledge')
        expect(
          'reason' in effect ? effect.reason : undefined,
          `${scene.id}/${outcome.id}/${effect.type}`,
        ).toBeTruthy();
      for (const value of Object.values(effect)) {
        if (typeof value !== 'string' || !value.startsWith('$')) continue;
        const key = value.slice(1);
        expect(
          BUILTIN_EFFECT_REFS.has(key) || roleKeys.has(key),
          `${scene.id}/${outcome.id}/${effect.type}: $${key}`,
        ).toBe(true);
      }
      switch (effect.type) {
        case 'education':
          expect(EDUCATION.has(effect.status), `${scene.id}/${outcome.id}`).toBe(true);
          break;
        case 'employment':
          expect(effect.organizationId, `${scene.id}/${outcome.id}`).toBeTruthy();
          expect(effect.workplaceId, `${scene.id}/${outcome.id}`).toBeTruthy();
          expect(effect.wage, `${scene.id}/${outcome.id}`).toBeGreaterThanOrEqual(0);
          break;
        case 'birth':
          expect(effect.parentIds.length, `${scene.id}/${outcome.id}`).toBeGreaterThan(0);
          break;
        case 'death':
          expect(effect.cause.length, `${scene.id}/${outcome.id}`).toBeGreaterThan(3);
          break;
        case 'relation':
        case 'relation_end':
          expect(RELATION_KINDS.has(effect.kind), `${scene.id}/${outcome.id}`).toBe(true);
          break;
        case 'estate':
          expect(effect.amount, `${scene.id}/${outcome.id}`).toBeGreaterThan(0);
          break;
        default:
          break;
      }
    }
    if (outcome.significance !== undefined && outcome.significance >= 0.7) {
      expect(
        outcome.effects.some((effect) => MAJOR_EFFECTS.has(effect.type)),
        `${scene.id}/${outcome.id}: major outcome without major effect`,
      ).toBe(true);
    }
  }
}

describe('Phase 10 authored major life content', () => {
  it('ships 24 decisive events and 6 active tasks', () => {
    expect(PHASE10_AUTHORED_EVENT_SCENES).toHaveLength(24);
    expect(PHASE10_AUTHORED_TASKS).toHaveLength(6);
    const ids = [...PHASE10_AUTHORED_EVENT_SCENES, ...PHASE10_AUTHORED_TASKS].map(
      (scene) => scene.id,
    );
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('keeps every major scene causally executable', () => {
    for (const scene of PHASE10_AUTHORED_EVENT_SCENES) assertScene(scene);
  });

  it('keeps active tasks typed and stage-valid', () => {
    for (const task of PHASE10_AUTHORED_TASKS as TaskDefinition[]) {
      assertScene(task, false);
      expect(
        task.outcomes?.some((outcome) =>
          outcome.effects.some((effect) => MAJOR_EFFECTS.has(effect.type)),
        ),
        task.id,
      ).toBe(true);
      expect(task.task.domain).toBeTruthy();
      expect(task.task.goals.length).toBeGreaterThan(0);
      expect(task.task.needs.length).toBeGreaterThan(0);
      expect(task.triggerMode).toBe('action');
      expect(task.rate).toBe(0);
    }
  });

  it('references only places and organizations present in the Vienna seed', () => {
    const placeIds = new Set(Object.keys(VIENNA_1912_SEED.places));
    const organizationIds = new Set(Object.keys(VIENNA_1912_SEED.organizations));
    for (const scene of [...PHASE10_AUTHORED_EVENT_SCENES, ...PHASE10_AUTHORED_TASKS]) {
      for (const outcome of scene.outcomes ?? []) {
        for (const effect of outcome.effects) {
          for (const [key, value] of Object.entries(effect)) {
            if (typeof value !== 'string') continue;
            if (value.startsWith('place-')) {
              expect(placeIds.has(value), `${scene.id}/${outcome.id}/${key}`).toBe(true);
            }
            if (value.startsWith('org-')) {
              expect(organizationIds.has(value), `${scene.id}/${outcome.id}/${key}`).toBe(true);
            }
          }
        }
      }
    }
  });
});
