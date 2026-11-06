import { describe, expect, it } from 'vitest';
import { ALL_STATES, GENERATED_STATE_PACKS } from '../packages/v4/content/states/index.js';
import { KERNEL_LIBRARY } from '../packages/v4/content/kernels/index.js';
import { VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { validateStateContentPack } from '../packages/v4/content-factory/validate.js';

const world = applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
const baseIds = new Set(ALL_STATES.map((state) => state.id));

describe('Phase 17 content library', () => {
  it('validates every registered generated StatePack', () => {
    for (const pack of GENERATED_STATE_PACKS) {
      const result = validateStateContentPack(pack, world, world.date, baseIds);
      expect(result.errors, pack.id).toEqual([]);
      expect(result.ok, pack.id).toBe(true);
      expect(result.compiledScenes, pack.id).toBeGreaterThan(0);
      expect(pack.states.length, pack.id).toBeGreaterThan(0);
      expect(pack.kernels?.length ?? 0, pack.id).toBeGreaterThan(0);
    }
  });

  it('keeps state and kernel ids unique', () => {
    expect(new Set(ALL_STATES.map((state) => state.id)).size).toBe(ALL_STATES.length);
    expect(new Set(KERNEL_LIBRARY.map((kernel) => kernel.id)).size).toBe(KERNEL_LIBRARY.length);
  });

  it('gives every generated state at least one real consumer', () => {
    const stateIds = new Set(ALL_STATES.map((state) => state.id));
    const consumedByKernel = (stateId: string): boolean =>
      KERNEL_LIBRARY.some((kernel) => {
        const conditions = [
          ...(kernel.conditions ?? []),
          ...kernel.outcomes.flatMap((outcome) => outcome.conditions ?? []),
        ];
        if (conditions.some((condition) => condition.kind === 'hasState' && condition.stateId === stateId))
          return true;
        return kernel.outcomes.some((outcome) =>
          outcome.effects.some(
            (effect) =>
              (effect.type === 'state_parameter' && effect.stateId === stateId) ||
              (effect.type === 'state_remove' && effect.stateId === stateId) ||
              (effect.type === 'state_transition' &&
                (effect.fromStateId === stateId || effect.toStateId === stateId)),
          ),
        );
      });
    const consumedBySelf = (stateId: string): boolean => {
      const state = ALL_STATES.find((candidate) => candidate.id === stateId);
      if (!state) return false;
      const effects = [
        ...(state.ticks ?? []).flatMap((tick) => tick.outcomes.flatMap((outcome) => outcome.effects)),
        ...(state.reactions ?? []).flatMap((reaction) => [
          ...reaction.effects,
          ...(reaction.failureEffects ?? []),
        ]),
        ...(state.transitions ?? []).flatMap((transition) => transition.effects ?? []),
      ];
      return effects.some(
        (effect) =>
          (effect.type === 'state_parameter' &&
            effect.stateId === stateId &&
            stateIds.has(stateId)) ||
          (effect.type === 'state_remove' && effect.stateId === stateId) ||
          (effect.type === 'state_transition' && effect.fromStateId === stateId),
      );
    };
    for (const pack of GENERATED_STATE_PACKS) {
      for (const state of pack.states) {
        const consumers = consumedByKernel(state.id) || consumedBySelf(state.id);
        expect(consumers, `${pack.id}/${state.id}`).toBe(true);
      }
    }
  });


  it('gives every Phase 17 state a real creation path', () => {
    const phase17 = new Set([
      'pack-life-course',
      'pack-desire-scandal',
      'pack-crime-justice',
      'pack-migration-belonging',
      'pack-faith-miracles',
      'pack-fame-art',
      'pack-absurd-fortune',
      'pack-work-craft',
      'pack-factory-education',
    ]);
    for (const pack of GENERATED_STATE_PACKS.filter((candidate) => phase17.has(candidate.id))) {
      for (const state of pack.states) {
        let created = Boolean(state.autoAttachOnBirth);
        for (const kernel of pack.kernels ?? []) {
          for (const outcome of kernel.outcomes) {
            for (const effect of outcome.effects) {
              if (effect.type === 'state_add' && effect.stateId === state.id) created = true;
              if (effect.type === 'state_transition' && effect.toStateId === state.id) created = true;
            }
          }
        }
        for (const owner of pack.states) {
          for (const tick of owner.ticks ?? []) {
            for (const outcome of tick.outcomes) {
              for (const effect of outcome.effects) {
                if (effect.type === 'state_add' && effect.stateId === state.id) created = true;
                if (effect.type === 'state_transition' && effect.toStateId === state.id) created = true;
              }
            }
          }
          for (const reaction of owner.reactions ?? []) {
            for (const effect of [...reaction.effects, ...(reaction.failureEffects ?? [])]) {
              if (effect.type === 'state_add' && effect.stateId === state.id) created = true;
            }
          }
        }
        expect(created, `${pack.id}/${state.id}`).toBe(true);
      }
    }
  });

  it('gives every generated kernel at least two outcomes', () => {
    for (const pack of GENERATED_STATE_PACKS) {
      for (const kernel of pack.kernels ?? []) {
        expect(kernel.outcomes.length, `${pack.id}/${kernel.id}`).toBeGreaterThanOrEqual(2);
      }
    }
  });
});
