import { describe, expect, it } from 'vitest';
import type { SceneDefinition } from '../packages/v4/domain.js';
import { ALL_EVENT_SCENES } from '../packages/v4/content/generated/index.js';
import { VIENNA_1912_SCENES } from '../packages/v4/content/vienna-1912.js';
import { VIENNA_LIFE_SCENES } from '../packages/v4/content/vienna-life.js';
import { VIENNA_POSTWAR_SCENES } from '../packages/v4/content/vienna-postwar.js';
import { VIENNA_HISTORY_SCENES } from '../packages/v4/content/vienna-history.js';
import { VIENNA_DEVELOPMENT_SCENES } from '../packages/v4/content/vienna-developments.js';
import { VIENNA_FAMILY_RUNTIME_SCENES } from '../packages/v4/content/vienna-family.js';

const BUILTIN = new Set([
  'subject',
  'place',
  'residence',
  'school',
  'workplace',
  'age',
  'year',
  'household',
  'child',
  'subjectPronoun',
  'milieu',
  'context',
  'flavor',
]);

const scenes: SceneDefinition[] = [
  ...VIENNA_1912_SCENES,
  ...VIENNA_LIFE_SCENES,
  ...VIENNA_POSTWAR_SCENES,
  ...VIENNA_HISTORY_SCENES,
  ...VIENNA_DEVELOPMENT_SCENES,
  ...VIENNA_FAMILY_RUNTIME_SCENES,
  ...ALL_EVENT_SCENES,
];

describe('Phase 13 narration variants', () => {
  it('keeps every narration key and token executable', () => {
    const problems: string[] = [];
    for (const scene of scenes) {
      const roleKeys = new Set(scene.roles.map((role) => role.key));
      for (const variant of scene.narration ?? []) {
        if (variant.text.length < 20) problems.push(`${scene.id}/${variant.id}: too short`);
        for (const match of variant.text.matchAll(/\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g)) {
          const token = match[1]!;
          if (!BUILTIN.has(token) && !roleKeys.has(token)) {
            problems.push(`${scene.id}/${variant.id}: unknown token {${token}}`);
          }
        }
        if (/\bNone\b|\bundefined\b/.test(variant.text)) {
          problems.push(`${scene.id}/${variant.id}: literal None/undefined`);
        }
      }
    }
    expect(problems.slice(0, 20)).toEqual([]);
    expect(problems).toEqual([]);
  });

  it('actually carries a substantial number of alternative realizations', () => {
    const variants = scenes.reduce((sum, scene) => sum + (scene.narration?.length ?? 0), 0);
    expect(variants).toBeGreaterThanOrEqual(250);
  });
});
