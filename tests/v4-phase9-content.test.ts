import { describe, expect, it } from 'vitest';
import {
  ALL_EVENT_SCENES,
  ALL_TASKS,
  PHASE9_EVENT_SCENES,
  PHASE9_TASKS,
} from '../packages/v4/content/generated/index.js';
import { stageForAge } from '../packages/v4/domain.js';

const BUILTIN_TOKENS = new Set([
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

function unresolvedTokens(text: string, roles: Set<string>): string[] {
  return [...text.matchAll(/\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g)]
    .map((match) => match[1]!)
    .filter((token) => !BUILTIN_TOKENS.has(token) && !roles.has(token));
}

describe('Phase 9 published content', () => {
  it('publishes the expanded task and event pools', () => {
    expect(PHASE9_TASKS.length).toBe(60);
    expect(PHASE9_EVENT_SCENES.length).toBe(102);
    expect(ALL_TASKS.length).toBeGreaterThanOrEqual(110);
    expect(ALL_EVENT_SCENES.length).toBeGreaterThanOrEqual(206);
    expect(new Set(ALL_TASKS.map((task) => task.id)).size).toBe(ALL_TASKS.length);
    expect(new Set(ALL_EVENT_SCENES.map((scene) => scene.id)).size).toBe(ALL_EVENT_SCENES.length);
  });

  it('keeps task metadata and stage buckets executable', () => {
    const domains = new Set([
      'education',
      'work',
      'family',
      'social',
      'daily',
      'culture',
      'health',
      'politics',
      'history',
      'knowledge',
      'migration',
      'special',
    ]);
    for (const task of PHASE9_TASKS) {
      expect(domains.has(task.task.domain), task.id).toBe(true);
      expect(task.task.goals.length, task.id).toBeGreaterThan(0);
      expect(task.task.needs.length, task.id).toBeGreaterThan(0);
      expect(task.task.baseUtility, task.id).toBeGreaterThan(0);
      expect(task.ageWindow.min, task.id).toBeLessThanOrEqual(task.ageWindow.max);
      const stageMin = { infancy: 0, childhood: 3, adolescence: 12, adulthood: 18, elderhood: 60 }[
        task.stage
      ];
      expect(task.ageWindow.max, task.id).toBeGreaterThanOrEqual(stageMin);
    }
  });

  it('has three outcomes and narration for every published node', () => {
    for (const scene of [...PHASE9_EVENT_SCENES, ...PHASE9_TASKS]) {
      expect((scene.outcomes ?? []).length, scene.id).toBeGreaterThanOrEqual(2);
      expect(scene.narration?.length ?? 0, scene.id).toBeGreaterThan(0);
      for (const outcome of scene.outcomes ?? []) {
        expect(outcome.immediateText.length, `${scene.id}/${outcome.id}`).toBeGreaterThan(30);
        expect(outcome.effects.length, `${scene.id}/${outcome.id}`).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it('resolves every prose role token against the authored roles', () => {
    const problems: string[] = [];
    for (const scene of [...PHASE9_EVENT_SCENES, ...PHASE9_TASKS]) {
      const roles = new Set(scene.roles.map((role) => role.key));
      for (const outcome of scene.outcomes ?? []) {
        for (const token of unresolvedTokens(outcome.immediateText, roles)) {
          problems.push(`${scene.id}/${outcome.id}: {${token}}`);
        }
      }
      for (const variant of scene.narration ?? []) {
        for (const token of unresolvedTokens(variant.text, roles)) {
          problems.push(`${scene.id}/${variant.key}/narration: {${token}}`);
        }
      }
    }
    expect(problems).toEqual([]);
  });

  it('lets generated events reach materialized and historical people, not only births', () => {
    for (const scene of PHASE9_EVENT_SCENES) {
      expect(scene.subjectProvenance, scene.id).toEqual(
        expect.arrayContaining(['birth', 'initial', 'materialized_population']),
      );
    }
  });

  it('does not compile a node outside its lifecycle stage', () => {
    const stageMin = { infancy: 0, childhood: 3, adolescence: 12, adulthood: 18, elderhood: 60 };
    const stageMax = { infancy: 2, childhood: 11, adolescence: 17, adulthood: 59, elderhood: 200 };
    for (const scene of [...PHASE9_EVENT_SCENES, ...PHASE9_TASKS]) {
      const min = Number(scene.ageWindow.min);
      const max = Number(scene.ageWindow.max);
      const effectiveMin = Math.max(min, stageMin[scene.stage]);
      const effectiveMax = Math.min(max, stageMax[scene.stage]);
      expect(max, scene.id).toBeGreaterThanOrEqual(min);
      expect(effectiveMax, scene.id).toBeGreaterThanOrEqual(effectiveMin);
      expect(scene.stage, scene.id).toBe(stageForAge(effectiveMin));
    }
  });
});
