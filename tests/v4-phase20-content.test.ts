import { describe, expect, it } from 'vitest';
import { ALL_STATES, GENERATED_STATE_PACKS } from '../packages/v4/content/states/index.js';
import { KERNEL_LIBRARY } from '../packages/v4/content/kernels/index.js';
import { VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { validateStateContentPack } from '../packages/v4/content-factory/validate.js';
import type { StatePack } from '../packages/v4/state/registry.js';
import type { EventEffect, SceneCondition } from '../packages/v4/domain.js';

const phase20 = new Set(['pack-adaptive-everyday', 'pack-living-consequences']);
const packs = GENERATED_STATE_PACKS.filter((pack) => phase20.has(pack.id)) as StatePack[];
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

function consumesState(stateId: string): boolean {
  return KERNEL_LIBRARY.some((kernel) => {
    const conditions: SceneCondition[] = [
      ...(kernel.conditions ?? []),
      ...kernel.outcomes.flatMap((outcome) => outcome.conditions ?? []),
    ];
    if (
      conditions.some((condition) => condition.kind === 'hasState' && condition.stateId === stateId)
    ) {
      return true;
    }
    return kernel.outcomes.some((outcome) =>
      outcome.effects.some(
        (effect: EventEffect) =>
          (effect.type === 'state_parameter' && effect.stateId === stateId) ||
          (effect.type === 'state_remove' && effect.stateId === stateId) ||
          (effect.type === 'state_transition' &&
            (effect.fromStateId === stateId || effect.toStateId === stateId)),
      ),
    );
  });
}

describe('Phase 20 adaptive content', () => {
  it('registers both adaptive packs at the expected scale', () => {
    expect(packs.map((pack) => pack.id).sort()).toEqual([...phase20].sort());
    expect(
      packs.reduce((sum, pack) => sum + (pack.kernels?.length ?? 0), 0),
    ).toBeGreaterThanOrEqual(44);
    expect(packs.reduce((sum, pack) => sum + pack.states.length, 0)).toBe(4);
    const kernelIds = packs.flatMap((pack) => (pack.kernels ?? []).map((kernel) => kernel.id));
    expect(new Set(kernelIds).size).toBe(kernelIds.length);
  });

  it('validates every adaptive pack and compiles scenes', () => {
    for (const pack of packs) {
      const result = validateStateContentPack(pack, world, world.date, baseIds);
      expect(result.errors, pack.id).toEqual([]);
      expect(result.ok, pack.id).toBe(true);
      expect(result.compiledScenes, pack.id).toBeGreaterThan(0);
    }
  });

  it('gives every adaptive state a creation path and external consumer', () => {
    for (const pack of packs) {
      for (const state of pack.states) {
        expect(createsState(pack.id, state.id), `${pack.id}/${state.id}: creation`).toBe(true);
        expect(consumesState(state.id), `${pack.id}/${state.id}: consumer`).toBe(true);
      }
    }
  });

  it('makes ordinary events adaptive, not just hard two-state gates', () => {
    const adaptive = packs.flatMap((pack) =>
      (pack.kernels ?? []).filter((kernel) => (kernel.adaptiveContexts?.length ?? 0) > 0),
    );
    expect(adaptive.length).toBeGreaterThanOrEqual(20);
    for (const pack of packs) {
      expect(
        (pack.kernels ?? []).filter((kernel) => (kernel.adaptiveContexts?.length ?? 0) > 0).length,
        pack.id,
      ).toBeGreaterThanOrEqual(10);
    }
    for (const kernel of adaptive) {
      for (const context of kernel.adaptiveContexts ?? []) {
        expect(context.id).toBeTruthy();
        expect(context.conditions.length).toBeGreaterThan(0);
        expect(context.weightMultiplier ?? 1).toBeGreaterThanOrEqual(0.25);
        expect(context.weightMultiplier ?? 1).toBeLessThanOrEqual(4);
        expect(context.checkBonus ?? 0).toBeGreaterThanOrEqual(-10);
        expect(context.checkBonus ?? 0).toBeLessThanOrEqual(10);
      }
    }
  });

  it('has checks and conditional outcomes that can actually branch', () => {
    const all = packs.flatMap((pack) => pack.kernels ?? []);
    expect(
      all.filter(
        (kernel) =>
          kernel.check !== undefined &&
          (kernel.adaptiveContexts ?? []).some((context) => (context.checkBonus ?? 0) !== 0),
      ).length,
    ).toBeGreaterThanOrEqual(6);
    expect(
      all.filter((kernel) =>
        kernel.outcomes.some((outcome) => (outcome.conditions?.length ?? 0) > 0),
      ).length,
    ).toBeGreaterThanOrEqual(6);
  });

  it('retrofits old kernels outside the two new packs', () => {
    const retrofitted = KERNEL_LIBRARY.filter(
      (kernel) =>
        (kernel.adaptiveContexts?.length ?? 0) > 0 &&
        !packs.some((pack) => (pack.kernels ?? []).some((candidate) => candidate.id === kernel.id)),
    );
    expect(retrofitted.length).toBeGreaterThanOrEqual(8);
  });
});
