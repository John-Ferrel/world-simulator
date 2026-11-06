import { describe, expect, it } from 'vitest';
import { ALL_STATES, GENERATED_STATE_PACKS } from '../packages/v4/content/states/index.js';
import { KERNEL_LIBRARY } from '../packages/v4/content/kernels/index.js';
import { VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { validateStateContentPack } from '../packages/v4/content-factory/validate.js';

const phase18 = new Set([
  'pack-infant-wonder',
  'pack-youth-fire',
  'pack-elder-memory',
  'pack-odd-jobs',
  'pack-black-comedy',
  'pack-dark-fantasy',
  'pack-history-street',
  'pack-love-desire',
  'pack-small-mysteries',
  'pack-money-luck',
]);
const packs = GENERATED_STATE_PACKS.filter((pack) => phase18.has(pack.id));
const world = applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
const baseIds = new Set(ALL_STATES.map((state) => state.id));

function createsState(packId: string, stateId: string): boolean {
  const pack = GENERATED_STATE_PACKS.find((candidate) => candidate.id === packId);
  if (!pack) return false;
  for (const state of pack.states) {
    if (state.autoAttachOnBirth && state.id === stateId) return true;
    for (const tick of state.ticks ?? []) {
      for (const outcome of tick.outcomes) {
        for (const effect of outcome.effects) {
          if (effect.type === 'state_add' && effect.stateId === stateId) return true;
          if (effect.type === 'state_transition' && effect.toStateId === stateId) return true;
        }
      }
    }
    for (const reaction of state.reactions ?? []) {
      for (const effect of [...reaction.effects, ...(reaction.failureEffects ?? [])]) {
        if (effect.type === 'state_add' && effect.stateId === stateId) return true;
      }
    }
  }
  for (const kernel of pack.kernels ?? []) {
    for (const outcome of kernel.outcomes) {
      for (const effect of outcome.effects) {
        if (effect.type === 'state_add' && effect.stateId === stateId) return true;
        if (effect.type === 'state_transition' && effect.toStateId === stateId) return true;
      }
    }
  }
  return false;
}

function consumesState(packId: string, stateId: string): boolean {
  return KERNEL_LIBRARY.some((kernel) => {
    if (!JSON.stringify(kernel).includes(stateId)) return false;
    const conditions = [
      ...(kernel.conditions ?? []),
      ...kernel.outcomes.flatMap((outcome) => outcome.conditions ?? []),
    ];
    if (conditions.some((condition) => condition.kind === 'hasState' && condition.stateId === stateId)) return true;
    return kernel.outcomes.some((outcome) =>
      outcome.effects.some(
        (effect) =>
          (effect.type === 'state_parameter' && effect.stateId === stateId) ||
          (effect.type === 'state_remove' && effect.stateId === stateId) ||
          (effect.type === 'state_transition' && (effect.fromStateId === stateId || effect.toStateId === stateId)),
      ),
    );
  });
}

describe('Phase 18 content library', () => {
  it('registers all ten Phase 18 packs at the expected scale', () => {
    expect(packs.map((pack) => pack.id).sort()).toEqual(
      [...phase18].sort(),
    );
    expect(
      packs.reduce((sum, pack) => sum + (pack.kernels?.length ?? 0), 0),
    ).toBeGreaterThanOrEqual(200);
    expect(packs.reduce((sum, pack) => sum + pack.states.length, 0)).toBe(20);
    const kernelIds = packs.flatMap((pack) => (pack.kernels ?? []).map((kernel) => kernel.id));
    expect(new Set(kernelIds).size).toBe(kernelIds.length);
  });

  it('validates every Phase 18 pack and compiles scenes', () => {
    for (const pack of packs) {
      const result = validateStateContentPack(pack, world, world.date, baseIds);
      expect(result.errors, pack.id).toEqual([]);
      expect(result.ok, pack.id).toBe(true);
      expect(result.compiledScenes, pack.id).toBeGreaterThan(0);
    }
  });

  it('gives every Phase 18 state a creation path and an external consumer', () => {
    for (const pack of packs) {
      for (const state of pack.states) {
        expect(createsState(pack.id, state.id), `${pack.id}/${state.id}: creation`).toBe(true);
        expect(consumesState(pack.id, state.id), `${pack.id}/${state.id}: consumer`).toBe(true);
      }
    }
  });

  it('gives every Phase 18 kernel at least two outcomes', () => {
    for (const pack of packs) {
      for (const kernel of pack.kernels ?? []) {
        expect(kernel.outcomes.length, `${pack.id}/${kernel.id}`).toBeGreaterThanOrEqual(2);
      }
    }
  });
});
