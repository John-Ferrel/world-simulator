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

describe('generated content factory packs', () => {
  it('compiles strict JSON packs with narration variants', () => {
    expect(GENERATED_PACKS.length).toBe(14);
    expect(GENERATED_SCENES.length).toBe(56);
    expect(generatedPackErrors()).toEqual([]);
    expect(GENERATED_SCENES.reduce((sum, scene) => sum + (scene.narration?.length ?? 0), 0)).toBe(
      230,
    );
    expect(new Set(GENERATED_SCENES.map((scene) => scene.id)).size).toBe(GENERATED_SCENES.length);
    for (const pack of GENERATED_PACKS) {
      expect(validateGeneratedPack(pack).errors).toEqual([]);
      expect(pack.nodes.length).toBeGreaterThanOrEqual(4);
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
        if (
          event.action.startsWith('vienna-printshop-daily') ||
          event.action.startsWith('vienna-school-childhood') ||
          event.action.startsWith('vienna-tenement-neighbors') ||
          event.action.startsWith('vienna-market-household') ||
          event.action.startsWith('vienna-apprentice-printshop') ||
          event.action.startsWith('vienna-illness-household') ||
          event.action.startsWith('vienna-church-community') ||
          event.action.startsWith('vienna-childhood-street') ||
          event.action.startsWith('vienna-elder-care') ||
          event.action.startsWith('vienna-infant-household') ||
          event.action.startsWith('vienna-early-childhood') ||
          event.action.startsWith('vienna-childhood-friends') ||
          event.action.startsWith('vienna-adolescence') ||
          event.action.startsWith('vienna-adult-social')
        ) {
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
});
