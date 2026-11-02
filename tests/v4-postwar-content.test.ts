import { describe, expect, it } from 'vitest';
import {
  monthIndex,
  stageForAge,
  type SceneCondition,
  type SceneDefinition,
} from '../packages/v4/domain.js';
import { VIENNA_1912_SOURCES, VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import {
  VIENNA_POSTWAR_CHRONICLE,
  VIENNA_POSTWAR_SCENES,
  VIENNA_POSTWAR_SOURCES,
} from '../packages/v4/content/vienna-postwar.js';

const scenes = VIENNA_POSTWAR_SCENES;
const chronicle = VIENNA_POSTWAR_CHRONICLE;

const sourceIds = new Set([
  ...Object.keys(VIENNA_1912_SOURCES),
  ...Object.keys(VIENNA_POSTWAR_SOURCES),
]);

const effectTypes = new Set<string>([
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
]);

const conditionKinds = new Set<string>([
  'age',
  'stage',
  'cash',
  'householdSize',
  'overcrowded',
  'health',
  'education',
  'employment',
  'placeKind',
  'hasRole',
  'notHasRole',
  'development',
  'developmentType',
  'capability',
  'hasRelation',
  'notHasRelation',
  'worldYear',
  'pressure',
]);

const roleKinds = new Set<string>([
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
]);

const stages = new Set(['infancy', 'childhood', 'adolescence', 'adulthood', 'elderhood']);

const stageBounds: Record<string, { min: number; max: number }> = {
  infancy: { min: 0, max: 2 },
  childhood: { min: 3, max: 11 },
  adolescence: { min: 12, max: 17 },
  adulthood: { min: 18, max: 59 },
  elderhood: { min: 60, max: 130 },
};

const builtinTokens = new Set([
  'subject',
  'place',
  'residence',
  'school',
  'workplace',
  'age',
  'year',
]);

function requiredRoleKeys(scene: SceneDefinition): Set<string> {
  return new Set(scene.roles.filter((role) => role.required !== false).map((role) => role.key));
}

function eligibleAgeInterval(scene: SceneDefinition): { min: number; max: number } {
  const bounds = stageBounds[scene.stage]!;
  let min = Math.max(scene.ageWindow.min, bounds.min);
  let max = Math.min(scene.ageWindow.max, bounds.max);
  for (const condition of scene.conditions) {
    if (condition.kind !== 'age') continue;
    if (typeof condition.min === 'number') min = Math.max(min, condition.min);
    if (typeof condition.max === 'number') max = Math.min(max, condition.max);
  }
  return { min, max };
}

describe('postwar Vienna life scenes', () => {
  it('has 14–18 scenes with unique ids and coherent stage/age windows', () => {
    expect(scenes.length).toBeGreaterThanOrEqual(14);
    expect(scenes.length).toBeLessThanOrEqual(18);
    expect(new Set(scenes.map((scene) => scene.id)).size).toBe(scenes.length);

    for (const scene of scenes) {
      const label = scene.id;
      expect(scene.version, label).toBe(1);
      expect(scene.packId, label).toBe('vienna-postwar');
      expect(stages.has(scene.stage), label).toBe(true);
      expect(scene.ageWindow.min, label).toBeGreaterThanOrEqual(0);
      expect(scene.ageWindow.min, label).toBeLessThanOrEqual(scene.ageWindow.max);
      expect(scene.ageWindow.max, label).toBeLessThanOrEqual(130);

      const bounds = stageBounds[scene.stage]!;
      expect(scene.ageWindow.min, label).toBeGreaterThanOrEqual(bounds.min);
      expect(scene.ageWindow.max, label).toBeLessThanOrEqual(bounds.max);
      expect(stageForAge(scene.ageWindow.min), label).toBe(scene.stage);
      expect(stageForAge(scene.ageWindow.max), label).toBe(scene.stage);

      expect(
        scene.roles.some(
          (role) => role.key === 'subject' && role.kind === 'subject' && role.required !== false,
        ),
        label,
      ).toBe(true);
      expect(new Set(scene.roles.map((role) => role.key)).size, label).toBe(scene.roles.length);
      expect(
        scene.roles.every((role) => roleKinds.has(role.kind)),
        label,
      ).toBe(true);
      expect(scene.subjectProvenance, label).toEqual(expect.arrayContaining(['birth', 'initial']));

      expect(scene.outcomes?.length ?? 0, label).toBeGreaterThanOrEqual(2);
      expect(new Set((scene.outcomes ?? []).map((outcome) => outcome.id)).size, label).toBe(
        (scene.outcomes ?? []).length,
      );
      expect(
        scene.outcomes?.every((outcome) => outcome.effects.length > 0),
        label,
      ).toBe(true);

      const gatedByCooldown =
        scene.oncePerPerson === true ||
        (typeof scene.cooldownYears === 'number' && scene.cooldownYears >= 2);
      expect(gatedByCooldown, `${label}: needs oncePerPerson or a meaningful cooldown`).toBe(true);
    }
  });

  it('uses only the existing condition/effect grammar and resolvable role tokens', () => {
    for (const scene of scenes) {
      const roleKeys = requiredRoleKeys(scene);
      const declaredRoleKeys = new Set(scene.roles.map((role) => role.key));

      for (const condition of scene.conditions) {
        expect(conditionKinds.has(condition.kind), `${scene.id} condition ${condition.kind}`).toBe(
          true,
        );
        if (condition.kind === 'age') {
          if (condition.min !== undefined) {
            expect(condition.min, `${scene.id} age min`).toBeGreaterThanOrEqual(
              scene.ageWindow.min,
            );
          }
          if (condition.max !== undefined) {
            expect(condition.max, `${scene.id} age max`).toBeLessThanOrEqual(scene.ageWindow.max);
          }
          if (condition.min !== undefined && condition.max !== undefined) {
            expect(condition.min, `${scene.id} age min/max`).toBeLessThanOrEqual(condition.max);
          }
        }
        if (condition.kind === 'stage') {
          expect(condition.in, `${scene.id} stage condition`).toContain(scene.stage);
        }
        if (condition.kind === 'worldYear') {
          expect(condition.min ?? 1946, `${scene.id} worldYear min`).toBeGreaterThanOrEqual(1946);
          expect(condition.max ?? 1999, `${scene.id} worldYear max`).toBeLessThanOrEqual(1999);
          if (condition.min !== undefined && condition.max !== undefined) {
            expect(condition.min, `${scene.id} worldYear min/max`).toBeLessThanOrEqual(
              condition.max,
            );
          }
        }
        if (condition.kind === 'hasRelation' || condition.kind === 'notHasRelation') {
          expect(condition.relationKind.length, `${scene.id} relation kind`).toBeGreaterThan(0);
        }
        if (condition.kind === 'education') {
          expect(condition.in.length, `${scene.id} education values`).toBeGreaterThan(0);
        }
        if (condition.kind === 'placeKind') {
          expect(condition.in.length, `${scene.id} place kinds`).toBeGreaterThan(0);
        }
      }

      for (const outcome of scene.outcomes ?? []) {
        expect(outcome.immediateText.trim().length, `${scene.id}/${outcome.id}`).toBeGreaterThan(0);
        expect(outcome.effects.length, `${scene.id}/${outcome.id}`).toBeGreaterThan(0);

        for (const effect of outcome.effects) {
          expect(
            effectTypes.has(effect.type),
            `${scene.id}/${outcome.id} effect ${effect.type}`,
          ).toBe(true);
          const reason = 'reason' in effect ? effect.reason : '';
          expect(reason.trim().length, `${scene.id}/${outcome.id} effect reason`).toBeGreaterThan(
            0,
          );

          const ref = effect as unknown as Record<string, unknown>;
          for (const key of ['personId', 'a', 'b']) {
            const value = ref[key];
            if (typeof value !== 'string') continue;
            expect(value.startsWith('$'), `${scene.id}/${outcome.id} hard-coded ${key}`).toBe(true);
            expect(
              declaredRoleKeys.has(value.slice(1)) || ['subject'].includes(value.slice(1)),
              `${scene.id}/${outcome.id} unknown ${key} ${value}`,
            ).toBe(true);
          }
          for (const key of ['householdId', 'organizationId', 'workplaceId', 'locationId']) {
            const value = ref[key];
            if (typeof value !== 'string' || !value.startsWith('$')) continue;
            expect(
              declaredRoleKeys.has(value.slice(1)) ||
                [
                  'subject',
                  'household',
                  'residence',
                  'workplace',
                  'subjectOrg',
                  'employerOrg',
                ].includes(value.slice(1)),
              `${scene.id}/${outcome.id} unknown ${key} ${value}`,
            ).toBe(true);
          }

          if (effect.type === 'cash' || effect.type === 'food') {
            expect(Number.isFinite(effect.amount), `${scene.id}/${outcome.id} amount`).toBe(true);
            expect(
              Math.abs(effect.amount),
              `${scene.id}/${outcome.id} amount bound`,
            ).toBeLessThanOrEqual(500);
          }
          if (effect.type === 'health') {
            expect(Number.isFinite(effect.amount), `${scene.id}/${outcome.id} health`).toBe(true);
            expect(
              Math.abs(effect.amount),
              `${scene.id}/${outcome.id} health bound`,
            ).toBeLessThanOrEqual(1);
          }
          if (effect.type === 'relation') {
            expect(
              [
                'kin',
                'guardian',
                'partner',
                'friend',
                'colleague',
                'employer',
                'rival',
                'acquaintance',
              ],
              `${scene.id}/${outcome.id} relation kind`,
            ).toContain(effect.kind);
          }
          if (effect.type === 'residence') {
            const place = VIENNA_1912_SEED.places[effect.residenceId];
            expect(place, `${scene.id}/${outcome.id} residence place`).toBeDefined();
            expect(place?.kind, `${scene.id}/${outcome.id} residence kind`).toBe('home');
          }
        }

        for (const match of outcome.immediateText.matchAll(/\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g)) {
          const token = match[1]!;
          expect(
            builtinTokens.has(token) || roleKeys.has(token),
            `${scene.id}/${outcome.id}: unresolved {${token}}`,
          ).toBe(true);
        }
        expect(outcome.immediateText, `${scene.id}/${outcome.id} malformed token`).not.toMatch(
          /\{[^}]*$/,
        );
      }

      expect(scene.sourceIds?.length ?? 0, `${scene.id} sources`).toBeGreaterThan(0);
      for (const sourceId of scene.sourceIds ?? []) {
        expect(sourceIds.has(sourceId), `${scene.id} source ${sourceId}`).toBe(true);
      }
      expect(
        scene.historicalBasis?.trim().length ?? 0,
        `${scene.id} historicalBasis`,
      ).toBeGreaterThan(0);
    }
  });

  it('keeps ordinary life coverage across childhood, work, adulthood, housing, health and old age', () => {
    const count = (stage: string) => scenes.filter((scene) => scene.stage === stage).length;
    expect(count('childhood')).toBeGreaterThanOrEqual(2);
    expect(count('adolescence')).toBeGreaterThanOrEqual(2);
    expect(count('adulthood')).toBeGreaterThanOrEqual(4);
    expect(count('elderhood')).toBeGreaterThanOrEqual(2);
    expect(scenes.some((scene) => scene.tags.includes('housing'))).toBe(true);
    expect(scenes.some((scene) => scene.tags.includes('health'))).toBe(true);

    const eligible = scenes.filter((scene) => {
      const interval = eligibleAgeInterval(scene);
      return interval.min <= interval.max;
    });
    expect(eligible.length).toBeGreaterThanOrEqual(12);

    const yearGated = scenes.filter((scene) =>
      scene.conditions.some((condition: SceneCondition) => condition.kind === 'worldYear'),
    );
    expect(yearGated.length).toBeGreaterThanOrEqual(4);
    for (const scene of yearGated) {
      const gate = scene.conditions.find((condition) => condition.kind === 'worldYear');
      if (gate?.kind !== 'worldYear') continue;
      expect(gate.min ?? 1946).toBeGreaterThanOrEqual(1946);
      expect(gate.max ?? 1999).toBeLessThanOrEqual(1999);
    }
  });
});

describe('postwar Vienna sources', () => {
  it('keeps the new source register internally consistent', () => {
    for (const [id, source] of Object.entries(VIENNA_POSTWAR_SOURCES)) {
      expect(source.id, id).toBe(id);
      expect(source.title.trim().length, id).toBeGreaterThan(0);
      expect(source.publisher.trim().length, id).toBeGreaterThan(0);
      expect(source.url, id).toMatch(/^https:\/\//);
      expect(source.note.trim().length, id).toBeGreaterThan(0);
    }
  });
});

describe('postwar Vienna chronicle', () => {
  it('has 18–24 dated public entries covering 1946 through 1999 in order', () => {
    expect(chronicle.length).toBeGreaterThanOrEqual(18);
    expect(chronicle.length).toBeLessThanOrEqual(24);
    expect(new Set(chronicle.map((entry) => entry.id)).size).toBe(chronicle.length);

    const indices = chronicle.map((entry) => monthIndex(entry.date));
    expect(indices).toEqual([...indices].sort((a, b) => a - b));

    for (const entry of chronicle) {
      expect(entry.date.year, entry.id).toBeGreaterThanOrEqual(1946);
      expect(entry.date.year, entry.id).toBeLessThanOrEqual(1999);
      expect(entry.date.month, entry.id).toBeGreaterThanOrEqual(1);
      expect(entry.date.month, entry.id).toBeLessThanOrEqual(12);
      expect(entry.title.trim().length, entry.id).toBeGreaterThan(0);
      expect(entry.text.trim().length, entry.id).toBeGreaterThan(0);
      expect(entry.sourceIds.length, entry.id).toBeGreaterThan(0);
      for (const sourceId of entry.sourceIds) {
        expect(sourceIds.has(sourceId), `${entry.id} source ${sourceId}`).toBe(true);
      }
    }

    expect(chronicle[0]!.date.year).toBe(1946);
    expect(chronicle[chronicle.length - 1]!.date.year).toBe(1999);
    const years = new Set(chronicle.map((entry) => entry.date.year));
    expect(years.has(1946)).toBe(true);
    expect(years.has(1999)).toBe(true);
  });

  it('does not claim personal events in the public chronicle', () => {
    const text = chronicle.map((entry) => entry.text).join('\n');
    expect(text).not.toMatch(/\{[a-zA-Z_][a-zA-Z0-9_]*\}/);
  });
});
