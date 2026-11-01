import { describe, expect, it } from 'vitest';
import {
  assertWorldV4,
  type EventEffect,
  type SceneCondition,
  type SceneDefinition,
} from '../packages/v4/domain.js';
import { VIENNA_1912_SEED, VIENNA_1912_SOURCES } from '../packages/v4/content/vienna-1912.js';
import { VIENNA_LIFE_SCENES } from '../packages/v4/content/vienna-life.js';

const scenes = VIENNA_LIFE_SCENES;
const personIds = new Set(Object.keys(VIENNA_1912_SEED.persons));
const householdIds = new Set(Object.keys(VIENNA_1912_SEED.households));
const placeIds = new Set(Object.keys(VIENNA_1912_SEED.places));
const organizationIds = new Set(Object.keys(VIENNA_1912_SEED.organizations));
const sourceIds = new Set(Object.keys(VIENNA_1912_SOURCES));

const tokens = new Set([
  '$subject',
  '$mother',
  '$father',
  '$guardian',
  '$teacher',
  '$doctor',
  '$employer',
  '$employerOrg',
  '$household',
  '$residence',
  '$school',
  '$workplace',
  '$subjectOrg',
  '$subjectPlace',
  '$neighbor',
  '$officer',
  '$official',
  '$delegate',
]);
const personTokens = new Set([
  '$subject',
  '$mother',
  '$father',
  '$guardian',
  '$teacher',
  '$doctor',
  '$neighbor',
  '$officer',
  '$official',
  '$delegate',
]);

function checkCondition(scene: SceneDefinition, condition: SceneCondition) {
  const label = `${scene.id} ${condition.kind}`;
  switch (condition.kind) {
    case 'age':
      expect(condition.min ?? 0).toBeGreaterThanOrEqual(0);
      if (condition.min !== undefined && condition.max !== undefined)
        expect(condition.min).toBeLessThanOrEqual(condition.max);
      break;
    case 'cash':
      expect(['subject', '$household']).toContain(condition.householdId ?? 'subject');
      break;
    case 'worldYear':
      expect(condition.min ?? 1900, label).toBeGreaterThanOrEqual(1900);
      expect(condition.max ?? 2000, label).toBeLessThanOrEqual(2000);
      break;
    case 'pressure':
      expect(Object.hasOwn(VIENNA_1912_SEED.pressures, condition.key), label).toBe(true);
      break;
    case 'education':
      expect(condition.in.length).toBeGreaterThan(0);
      break;
    case 'placeKind':
      expect(condition.in.length).toBeGreaterThan(0);
      break;
    case 'hasRole':
      expect(condition.role.length).toBeGreaterThan(0);
      break;
    case 'hasRelation':
      expect(condition.relationKind.length).toBeGreaterThan(0);
      break;
    case 'health':
      if (condition.min !== undefined) expect(condition.min).toBeGreaterThanOrEqual(0);
      if (condition.max !== undefined) expect(condition.max).toBeLessThanOrEqual(1);
      break;
    case 'stage':
      expect(condition.in.length).toBeGreaterThan(0);
      break;
    default:
      break;
  }
}

function checkEffect(scene: SceneDefinition, effect: EventEffect) {
  const label = `${scene.id} ${effect.type}`;
  const idOrToken = (value: string, known: Set<string>, allowed: Set<string>) => {
    if (value.startsWith('$')) expect(allowed.has(value), `${label}: ${value}`).toBe(true);
    else expect(known.has(value), `${label}: ${value}`).toBe(true);
  };
  switch (effect.type) {
    case 'cash':
    case 'food':
      idOrToken(effect.householdId, householdIds, new Set(['$household', '$subject']));
      expect(Number.isFinite(effect.amount), label).toBe(true);
      expect(effect.reason.length, label).toBeGreaterThan(0);
      break;
    case 'health':
      idOrToken(effect.personId, personIds, personTokens);
      expect(effect.reason.length, label).toBeGreaterThan(0);
      break;
    case 'condition':
      idOrToken(effect.personId, personIds, personTokens);
      expect(effect.condition.length, label).toBeGreaterThan(0);
      break;
    case 'education':
      idOrToken(effect.personId, personIds, personTokens);
      if (effect.placeId !== undefined) {
        if (effect.placeId.startsWith('$')) expect(tokens.has(effect.placeId)).toBe(true);
        else expect(placeIds.has(effect.placeId), label).toBe(true);
      }
      break;
    case 'employment':
      idOrToken(effect.personId, personIds, personTokens);
      idOrToken(effect.organizationId, organizationIds, new Set(['$employerOrg', '$subjectOrg']));
      idOrToken(
        effect.workplaceId,
        placeIds,
        new Set(['$workplace', '$subjectPlace', '$residence']),
      );
      expect(effect.reason.length, label).toBeGreaterThan(0);
      break;
    case 'unemployment':
      idOrToken(effect.personId, personIds, personTokens);
      break;
    case 'relation':
      idOrToken(effect.a, personIds, personTokens);
      idOrToken(effect.b, personIds, personTokens);
      expect(effect.kind.length).toBeGreaterThan(0);
      break;
    case 'role':
      idOrToken(effect.personId, personIds, personTokens);
      expect(effect.role.length).toBeGreaterThan(0);
      break;
    case 'move':
      idOrToken(effect.personId, personIds, personTokens);
      idOrToken(effect.locationId, placeIds, new Set(['$residence']));
      break;
    case 'death':
      idOrToken(effect.personId, personIds, personTokens);
      expect(effect.cause.length).toBeGreaterThan(0);
      break;
    default:
      break;
  }
}

describe('universal Vienna life content', () => {
  it('has at least 15 scenes with unique ids and coherent age windows', () => {
    expect(scenes.length).toBeGreaterThanOrEqual(15);
    expect(new Set(scenes.map((scene) => scene.id)).size).toBe(scenes.length);
    for (const scene of scenes) {
      expect(scene.ageWindow.min, scene.id).toBeGreaterThanOrEqual(0);
      expect(scene.ageWindow.min, scene.id).toBeLessThanOrEqual(scene.ageWindow.max);
      expect(scene.subjectProvenance, scene.id).toEqual(expect.arrayContaining(['birth']));
      expect(
        scene.roles.some((role) => role.key === 'subject'),
        scene.id,
      ).toBe(true);
      expect(scene.outcomes?.length ?? 0, scene.id).toBeGreaterThanOrEqual(2);
    }
  });

  it('only uses declared roles, tokens, places and source ids', () => {
    for (const scene of scenes) {
      const roleKeys = new Set(
        scene.roles.filter((role) => role.required !== false).map((role) => role.key),
      );
      for (const condition of scene.conditions) checkCondition(scene, condition);
      for (const outcome of scene.outcomes ?? []) {
        expect(outcome.effects.length, `${scene.id}/${outcome.id}`).toBeGreaterThan(0);
        for (const effect of outcome.effects) checkEffect(scene, effect);
        for (const match of outcome.immediateText.matchAll(/\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g)) {
          expect(
            roleKeys.has(match[1]!) ||
              ['subject', 'residence', 'school', 'workplace', 'place', 'age', 'year'].includes(
                match[1]!,
              ),
            `${scene.id}: {${match[1]}}`,
          ).toBe(true);
        }
      }
      for (const sourceId of scene.sourceIds ?? [])
        expect(sourceIds.has(sourceId), `${scene.id} ${sourceId}`).toBe(true);
    }
  });

  it('does not use internal-state or future-summary filler', () => {
    const text = scenes
      .flatMap((scene) => (scene.outcomes ?? []).map((outcome) => outcome.immediateText))
      .join('\n');
    for (const banned of [
      'identity_shift',
      'agenda',
      '承担了更多职责',
      '把一部分时间用在',
      '一次尝试没有成功',
      '多年后',
      '从此以后',
      '她决定',
      '他决定',
      'burial',
    ])
      expect(text, banned).not.toContain(banned);
    expect(text).toContain('{subject}');
    expect(text).toContain('{mother}');
  });

  it('keeps every referenced scene world within its own time and age bands', () => {
    for (const scene of scenes) {
      const min = scene.ageWindow.min;
      if (scene.stage === 'infancy') expect(min).toBeLessThanOrEqual(2);
      if (scene.stage === 'childhood') expect(min).toBeLessThanOrEqual(11);
      if (scene.stage === 'adolescence') expect(min).toBeLessThanOrEqual(17);
      if (scene.stage === 'adulthood') expect(min).toBeLessThanOrEqual(59);
      if (scene.stage === 'elderhood') expect(min).toBeGreaterThanOrEqual(60);
    }
  });

  it('keeps the authored seed valid and separate from universal scenes', () => {
    assertWorldV4(VIENNA_1912_SEED);
    const authored = new Set(VIENNA_1912_SEED.scenes.map((scene) => scene.sceneId));
    for (const scene of scenes) expect(authored.has(scene.id)).toBe(false);
  });

  it('keeps old age a recurring risk instead of a one-time survival badge', () => {
    const death = scenes.find((scene) => scene.id === 'vienna-life-death-old-age');
    expect(death).toBeDefined();
    expect(death!.oncePerPerson).not.toBe(true);
    expect(death!.rate ?? 0).toBeGreaterThan(0);
    expect(death!.ageWindow.max).toBeGreaterThanOrEqual(110);
    expect(death!.conditions?.some((condition) => condition.kind === 'health')).not.toBe(true);
  });
});
