import { describe, expect, it } from 'vitest';
import { ALL_STATES, GENERATED_STATE_PACKS } from '../packages/v4/content/states/index.js';
import { VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { validateStateContentPack } from '../packages/v4/content-factory/validate.js';
import type { StatePack } from '../packages/v4/state/registry.js';
import type { EventEffect, SceneCondition } from '../packages/v4/domain.js';

const phase21 = GENERATED_STATE_PACKS.find(
  (pack) => pack.id === 'pack-dramatic-lives',
) as StatePack | undefined;
const world = applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
const baseIds = new Set(ALL_STATES.map((state) => state.id));

function createsState(stateId: string): boolean {
  if (!phase21) return false;
  for (const kernel of phase21.kernels ?? []) {
    for (const outcome of kernel.outcomes) {
      for (const effect of outcome.effects) {
        if (effect.type === 'state_add' && effect.stateId === stateId) return true;
        if (effect.type === 'state_transition' && effect.toStateId === stateId) return true;
      }
    }
  }
  for (const state of phase21.states) {
    for (const tick of state.ticks ?? []) {
      for (const outcome of tick.outcomes) {
        for (const effect of outcome.effects) {
          if (effect.type === 'state_add' && effect.stateId === stateId) return true;
        }
      }
    }
  }
  return false;
}

function consumesState(stateId: string): boolean {
  if (!phase21) return false;
  return (phase21.kernels ?? []).some((kernel) => {
    const conditions: SceneCondition[] = [
      ...(kernel.conditions ?? []),
      ...(kernel.adaptiveContexts ?? []).flatMap((context) => context.conditions),
      ...kernel.outcomes.flatMap((outcome) => outcome.conditions ?? []),
    ];
    if (conditions.some((condition) => condition.kind === 'hasState' && condition.stateId === stateId))
      return true;
    return kernel.outcomes.some((outcome) =>
      outcome.effects.some(
        (effect: EventEffect) =>
          (effect.type === 'state_parameter' && effect.stateId === stateId) ||
          (effect.type === 'state_remove' && effect.stateId === stateId),
      ),
    );
  });
}

describe('Phase 21 dramatic content', () => {
  it('registers a validated high-drama pack', () => {
    expect(phase21).toBeDefined();
    const result = validateStateContentPack(phase21!, world, world.date, baseIds);
    expect(result.errors).toEqual([]);
    expect(result.ok).toBe(true);
    expect(phase21!.states.length).toBe(2);
    expect(phase21!.kernels?.length ?? 0).toBeGreaterThanOrEqual(15);
  });

  it('has adaptive contexts, checks and conditional outcomes', () => {
    const kernels = phase21!.kernels ?? [];
    expect(
      kernels.filter((kernel) => (kernel.adaptiveContexts?.length ?? 0) >= 2).length,
    ).toBe(kernels.length);
    expect(
      kernels.filter(
        (kernel) =>
          kernel.check !== undefined &&
          (kernel.adaptiveContexts ?? []).some((context) => (context.checkBonus ?? 0) !== 0),
      ).length,
    ).toBeGreaterThanOrEqual(10);
    expect(
      kernels.filter((kernel) =>
        kernel.outcomes.some((outcome) => (outcome.conditions?.length ?? 0) > 0),
      ).length,
    ).toBeGreaterThanOrEqual(10);
  });

  it('gives every new state a creation and consumer path', () => {
    for (const state of phase21!.states) {
      expect(createsState(state.id), state.id).toBe(true);
      expect(consumesState(state.id), state.id).toBe(true);
    }
  });

  it('does not hard-gate the pack behind two rare states', () => {
    for (const kernel of phase21!.kernels ?? []) {
      const hardStates = (kernel.conditions ?? []).filter(
        (condition) => condition.kind === 'hasState',
      );
      expect(hardStates.length, kernel.id).toBeLessThanOrEqual(2);
    }
  });
});
