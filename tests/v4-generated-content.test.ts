import { describe, expect, it } from 'vitest';
import { advanceV4Year } from '../packages/v4/engine.js';
import {
  applyViennaTimeline,
  VIENNA_1912_SEED,
  VIENNA_1912_SCENES,
} from '../packages/v4/content/vienna-1912.js';
import {
  GENERATED_PACKS,
  GENERATED_SCENES,
  generatedPackErrors,
} from '../packages/v4/content/generated/index.js';
import {
  compileGeneratedPack,
  validateGeneratedPack,
  type GeneratedPack,
} from '../packages/v4/generated.js';
import { validateAuthoredPack } from '../packages/v4/content-author/strict.js';

const PHASE2_PACK_IDS = new Set([
  'vienna-youth-threshold',
  'vienna-courtship-courtyard',
  'vienna-housing-move',
  'vienna-medical-treatment',
  'vienna-parish-aid',
  'vienna-market-debt',
  'vienna-women-housework',
  'vienna-elder-bereavement',
]);

describe('generated content factory packs', () => {
  it('compiles strict JSON packs with narration variants', () => {
    expect(GENERATED_PACKS.length).toBe(24);
    expect(GENERATED_SCENES.length).toBe(96);
    expect(generatedPackErrors()).toEqual([]);
    expect(GENERATED_SCENES.reduce((sum, scene) => sum + (scene.narration?.length ?? 0), 0)).toBe(
      471,
    );
    expect(new Set(GENERATED_SCENES.map((scene) => scene.id)).size).toBe(GENERATED_SCENES.length);
    for (const pack of GENERATED_PACKS) {
      expect(validateGeneratedPack(pack).errors).toEqual([]);
      expect(pack.nodes.length).toBeGreaterThanOrEqual(4);
    }
  });

  it('keeps every Phase-2 family at four nodes with two or three outcomes and two narrations', () => {
    const phase2 = GENERATED_PACKS.filter((pack) => PHASE2_PACK_IDS.has(pack.id));
    expect(phase2.length).toBe(8);
    for (const pack of phase2) {
      expect(pack.nodes.length).toBe(4);
      const outcomeIds = new Set<string>();
      for (const node of pack.nodes) {
        expect(node.outcomes.length).toBeGreaterThanOrEqual(2);
        expect(node.outcomes.length).toBeLessThanOrEqual(3);
        for (const outcome of node.outcomes) {
          expect(outcomeIds.has(outcome.id)).toBe(false);
          outcomeIds.add(outcome.id);
          expect(outcome.narration?.length ?? 0).toBeGreaterThanOrEqual(2);
        }
      }
    }
  });

  it('runs generated events through the real engine and narration path', () => {
    let world = structuredClone(VIENNA_1912_SEED);
    const generatedActions = new Set<string>();
    let generatedCount = 0;
    for (let year = 0; year < 30; year++) {
      world = applyViennaTimeline(world);
      const result = advanceV4Year(world, [...VIENNA_1912_SCENES, ...GENERATED_SCENES], {
        economy: { enabled: false },
        eventRuntime: true,
        maxOrdinaryEventsPerPerson: 4,
      });
      world = result.world;
      for (const event of result.events) {
        if (GENERATED_PACKS.some((pack) => event.action.startsWith(pack.id))) {
          generatedCount += 1;
          generatedActions.add(event.action.split('/')[0]!);
          expect(event.immediateText).not.toContain('{');
          expect(event.immediateText).not.toContain('}');
          expect(event.title).toBeTruthy();
        }
      }
      for (const warning of result.diagnostics.warnings) {
        expect(warning.code).not.toBe('unknown_effect');
      }
    }
    expect(generatedCount).toBeGreaterThan(15);
    expect(generatedActions.size).toBeGreaterThan(4);
    expect(world.events.length).toBeGreaterThan(30);
  });

  it('keeps family rate independent of the number of leaf nodes', () => {
    const base = GENERATED_PACKS[0]!;
    const expanded: GeneratedPack = {
      ...base,
      nodes: [
        ...base.nodes,
        ...base.nodes.map((node, index) => ({
          ...node,
          id: `${node.id}.extra-${index}`,
        })),
      ],
    };
    const before = compileGeneratedPack(base).reduce((sum, scene) => sum + (scene.rate ?? 0), 0);
    const after = compileGeneratedPack(expanded).reduce((sum, scene) => sum + (scene.rate ?? 0), 0);
    expect(after).toBeCloseTo(before, 6);
  });

  it('keeps every family rate equal to its declared base rate', () => {
    for (const pack of GENERATED_PACKS) {
      const total = compileGeneratedPack(pack).reduce((sum, scene) => sum + (scene.rate ?? 0), 0);
      expect(total, pack.id).toBeCloseTo(pack.baseRate, 6);
    }
  });

  it('publishes no unresolved tokens, duplicate outcome text, or invalid effect references', () => {
    for (const pack of GENERATED_PACKS) {
      const validation = validateAuthoredPack(pack, {
        phase2: PHASE2_PACK_IDS.has(pack.id),
      });
      expect(validation.errors, pack.id).toEqual([]);
    }
  });
});
