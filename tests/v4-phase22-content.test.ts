import { describe, expect, it } from 'vitest';
import { ALL_STATES, GENERATED_STATE_PACKS } from '../packages/v4/content/states/index.js';
import { VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { validateStateContentPack } from '../packages/v4/content-factory/validate.js';
import type { StatePack } from '../packages/v4/state/registry.js';
import type { EventEffect, SceneCondition } from '../packages/v4/domain.js';

const world = applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
const baseIds = new Set(ALL_STATES.map((state) => state.id));
const drama = GENERATED_STATE_PACKS.find((pack) => pack.id === 'pack-dramatic-overhaul') as
  | StatePack
  | undefined;
const early = GENERATED_STATE_PACKS.find((pack) => pack.id === 'pack-early-life-drama') as
  | StatePack
  | undefined;

function createsState(pack: StatePack, stateId: string): boolean {
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

function consumesState(pack: StatePack, stateId: string): boolean {
  return (pack.kernels ?? []).some((kernel) => {
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

describe('Phase 22 dramatic overhaul content', () => {
  it('registers and validates a 20-kernel dramatic pack', () => {
    expect(drama).toBeDefined();
    const result = validateStateContentPack(drama!, world, world.date, baseIds);
    expect(result.errors).toEqual([]);
    expect(result.ok).toBe(true);
    expect(drama!.states.length).toBe(2);
    expect(drama!.kernels?.length ?? 0).toBeGreaterThanOrEqual(20);
  });

  it('has high-drama tags, adaptive contexts, checks and conditional outcomes', () => {
    const kernels = drama!.kernels ?? [];
    expect(kernels.every((kernel) => kernel.tags?.includes('high_drama'))).toBe(true);
    expect(kernels.every((kernel) => (kernel.adaptiveContexts?.length ?? 0) >= 4)).toBe(true);
    expect(kernels.filter((kernel) => kernel.check !== undefined).length).toBeGreaterThanOrEqual(16);
    expect(
      kernels.filter((kernel) =>
        kernel.outcomes.some((outcome) => (outcome.conditions?.length ?? 0) > 0),
      ).length,
    ).toBeGreaterThanOrEqual(16);
  });

  it('gives both new states creation and consumer paths', () => {
    for (const state of drama!.states) {
      expect(createsState(drama!, state.id), state.id).toBe(true);
      expect(consumesState(drama!, state.id), state.id).toBe(true);
    }
  });

  it('registers a validated early-life drama pack for player-born children', () => {
    expect(early).toBeDefined();
    const result = validateStateContentPack(early!, world, world.date, baseIds);
    expect(result.errors).toEqual([]);
    expect(early!.kernels?.length ?? 0).toBeGreaterThanOrEqual(14);
    for (const kernel of early!.kernels ?? []) {
      expect(kernel.tags?.includes('drama'), kernel.id).toBe(true);
      expect((kernel as any).subjectProvenance, kernel.id).toEqual(expect.arrayContaining(['birth']));
      expect(kernel.baseRate ?? 0, kernel.id).toBeGreaterThanOrEqual(0.3);
    }
    for (const state of early!.states) {
      expect(createsState(early!, state.id), state.id).toBe(true);
      expect(consumesState(early!, state.id), state.id).toBe(true);
    }
  });
});
