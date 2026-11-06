import { describe, expect, it } from 'vitest';
import { KERNEL_LIBRARY } from '../packages/v4/content/kernels/index.js';
import { ALL_STATES, PHASE15_STATE_PACKS } from '../packages/v4/content/states/index.js';
import { DEFAULT_COMPOSITION } from '../packages/v4/composition/default.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import { validateStateLibrary } from '../packages/v4/state/types.js';
import { validateStatePack } from '../packages/v4/state/registry.js';

const PHASE15 = KERNEL_LIBRARY.filter((kernel) => kernel.id.startsWith('r15-'));
const STATE_IDS = new Set(ALL_STATES.map((state) => state.id));

describe('Phase 15 state-consuming content', () => {
  it('has a meaningful batch of state kernels and every referenced state exists', () => {
    expect(PHASE15.length).toBeGreaterThanOrEqual(25);
    for (const kernel of PHASE15) {
      for (const outcome of kernel.outcomes) {
        for (const effect of outcome.effects) {
          if (effect.type === 'state_add') expect(STATE_IDS.has(effect.stateId)).toBe(true);
          if (effect.type === 'state_transition') {
            expect(STATE_IDS.has(effect.fromStateId)).toBe(true);
            expect(STATE_IDS.has(effect.toStateId)).toBe(true);
          }
        }
      }
      for (const condition of kernel.conditions ?? []) {
        if (condition.kind === 'hasState' && condition.stateId)
          expect(STATE_IDS.has(condition.stateId)).toBe(true);
      }
    }
  });

  it('validates every state definition', () => {
    expect(validateStateLibrary(ALL_STATES).errors).toEqual([]);
  });

  it('validates every published state pack against the base library', () => {
    const base = new Set(ALL_STATES.map((state) => state.id));
    for (const pack of PHASE15_STATE_PACKS) {
      const validation = validateStatePack(pack, base);
      expect(validation.errors, pack.id).toEqual([]);
    }
  });

  it('compiles the state kernels across the century with no unresolved major effect', () => {
    const years = [1912, 1925, 1938, 1945, 1955, 1975, 1995];
    const compiled = new Set<string>();
    for (const year of years) {
      const world = applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
      world.date = { year, month: 1 };
      const result = DEFAULT_COMPOSITION.compile(world, world.date);
      for (const error of result.errors) {
        if (error.kernelId.startsWith('r15-')) {
          throw new Error(
            `${year}: ${error.kernelId}/${error.outcomeId} ${error.effectType}: ${error.reason}`,
          );
        }
      }
      for (const scene of [...result.scenes, ...result.tasks]) {
        const kernel = scene.tags?.find((tag) => tag.startsWith('kernel:r15-'));
        if (kernel) compiled.add(kernel.slice('kernel:'.length));
      }
    }
    expect(compiled.size).toBeGreaterThanOrEqual(10);
  });

  it('uses only declared text tokens in r15 kernels', () => {
    const builtins = new Set([
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
    for (const kernel of PHASE15) {
      const roleKeys = new Set(kernel.roles.map((role) => role.key));
      for (const outcome of kernel.outcomes) {
        for (const match of outcome.text.matchAll(/\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g)) {
          const key = match[1]!;
          expect(
            roleKeys.has(key) || builtins.has(key),
            `${kernel.id}/${outcome.id}: unknown token {${key}}`,
          ).toBe(true);
        }
      }
    }
  });
});
