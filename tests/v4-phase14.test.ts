import { describe, expect, it } from 'vitest';
import { advanceV4Year } from '../packages/v4/engine.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { VIENNA_1912_SEED, VIENNA_1912_SCENES } from '../packages/v4/content/vienna-1912.js';
import { VIENNA_LIFE_SCENES } from '../packages/v4/content/vienna-life.js';
import { VIENNA_POSTWAR_SCENES } from '../packages/v4/content/vienna-postwar.js';
import { VIENNA_HISTORY_SCENES } from '../packages/v4/content/vienna-history.js';
import { VIENNA_DEVELOPMENT_SCENES } from '../packages/v4/content/vienna-developments.js';
import { VIENNA_FAMILY_RUNTIME_SCENES } from '../packages/v4/content/vienna-family.js';
import { ALL_EVENT_SCENES, ALL_TASKS } from '../packages/v4/content/generated/index.js';
import { KERNEL_LIBRARY } from '../packages/v4/content/kernels/index.js';
import { DEFAULT_COMPOSITION } from '../packages/v4/composition/default.js';

const PHASE14 = KERNEL_LIBRARY.filter((kernel) => kernel.id.startsWith('r14-'));
const OUTCOMES = PHASE14.flatMap((kernel) => [
  ...kernel.outcomes,
  ...(kernel.variants ?? []).flatMap((variant) => variant.outcomes ?? []),
]);
const HISTORY_TAGS = new Set(
  PHASE14.flatMap((kernel) =>
    [...(kernel.conditions ?? []), ...OUTCOMES.map((outcome) => outcome.when)]
      .map((condition) => {
        if (!condition || typeof condition !== 'object') return undefined;
        if ('kind' in condition && condition.kind === 'history') return condition.tag;
        if ('history' in condition) return condition.history?.tag;
        return undefined;
      })
      .filter((tag): tag is string => typeof tag === 'string'),
  ),
);
const SEEDED_TAGS = new Set(PHASE14.flatMap((kernel) => kernel.tags));
const EFFECT_TAGS = new Set([
  'death',
  'birth',
  'unemployment',
  'employment',
  'partnership',
  'separation',
  'household',
  'migration',
  'injury',
]);

describe('Phase 14 long-life content', () => {
  it('adds 265 executable chains with explicit history, follow-ups and returning people', () => {
    expect(PHASE14).toHaveLength(265);
    expect(PHASE14.filter((kernel) => kernel.kind === 'task')).toHaveLength(111);
    expect(PHASE14.filter((kernel) => kernel.kind === 'event')).toHaveLength(154);
    expect(OUTCOMES.length).toBeGreaterThanOrEqual(780);
    const historyConditioned = PHASE14.filter(
      (kernel) =>
        (kernel.conditions ?? []).some((condition) => condition.kind === 'history') ||
        (kernel.variants ?? []).some(
          (variant) =>
            (variant.conditions ?? []).some((condition) => condition.kind === 'history') ||
            (variant.outcomes ?? []).some((outcome) => outcome.when?.history),
        ) ||
        kernel.outcomes.some((outcome) => outcome.when?.history),
    );
    expect(historyConditioned.length).toBeGreaterThanOrEqual(190);
    expect(historyConditioned.length / PHASE14.length).toBeGreaterThanOrEqual(0.6);
    const followups = OUTCOMES.filter((outcome) => (outcome.followupTargets?.length ?? 0) > 0);
    expect(followups.length).toBeGreaterThanOrEqual(190);
    const shared = PHASE14.filter((kernel) => kernel.roles.some((role) => role.sharedHistoryTag));
    expect(shared.length).toBeGreaterThanOrEqual(120);
    for (const kernel of PHASE14) {
      for (const outcome of [
        ...kernel.outcomes,
        ...(kernel.variants ?? []).flatMap((variant) => variant.outcomes ?? []),
      ]) {
        for (const target of outcome.followupTargets ?? []) {
          expect(
            KERNEL_LIBRARY.some((candidate) => candidate.id === target.sceneId),
            `${kernel.id}/${outcome.id} -> ${target.sceneId}`,
          ).toBe(true);
        }
      }
      for (const role of kernel.roles) {
        if (!role.sharedHistoryTag) continue;
        expect(
          SEEDED_TAGS.has(role.sharedHistoryTag) || EFFECT_TAGS.has(role.sharedHistoryTag),
          `${kernel.id}/${role.key}: ${role.sharedHistoryTag}`,
        ).toBe(true);
      }
    }
    for (const tag of HISTORY_TAGS) {
      expect(SEEDED_TAGS.has(tag) || EFFECT_TAGS.has(tag), `history tag ${tag}`).toBe(true);
    }
  });

  it('compiles every Phase 14 kernel somewhere across the century', () => {
    const years = [1912, 1925, 1935, 1945, 1955, 1975, 1995];
    const compiled = new Set<string>();
    for (const year of years) {
      const world = applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
      world.date = { year, month: 1 };
      const result = DEFAULT_COMPOSITION.compile(world, world.date);
      for (const scene of [...result.scenes, ...result.tasks]) {
        const kernel = scene.tags?.find((tag) => tag.startsWith('kernel:r14-'));
        if (kernel) compiled.add(kernel.slice('kernel:'.length));
      }
    }
    expect(compiled.size).toBeGreaterThanOrEqual(250);
  });

  it('has no unresolved composition placeholders in the late contexts', () => {
    for (const year of [1912, 1935, 1955, 1995]) {
      const world = applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
      world.date = { year, month: 1 };
      const result = DEFAULT_COMPOSITION.compile(world, world.date);
      const phase14Errors = result.errors.filter((error) => error.kernelId.startsWith('r14-'));
      expect(phase14Errors, `${year}: ${JSON.stringify(phase14Errors.slice(0, 3))}`).toEqual([]);
    }
  });

  it('runs several years without unresolved effects or invalid relations', () => {
    let world = applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
    world.seed = 'phase14-contract';
    const scenes = [
      ...VIENNA_1912_SCENES,
      ...VIENNA_LIFE_SCENES,
      ...VIENNA_POSTWAR_SCENES,
      ...VIENNA_HISTORY_SCENES,
      ...VIENNA_DEVELOPMENT_SCENES,
      ...VIENNA_FAMILY_RUNTIME_SCENES,
      ...ALL_EVENT_SCENES,
    ];
    let phase14Events = 0;
    for (let year = 0; year < 12; year += 1) {
      const result = advanceV4Year(world, scenes, {
        economy: { enabled: true },
        eventRuntime: true,
        agency: true,
        tasks: ALL_TASKS,
        composition: DEFAULT_COMPOSITION,
        maxOrdinaryEventsPerPerson: 4,
      });
      world = result.world;
      phase14Events += result.events.filter((event) => event.action.includes('r14-')).length;
      for (const warning of result.diagnostics.warnings) {
        expect(
          ['unresolved_effect_ref', 'invalid_relation', 'unknown_household'].includes(warning.code),
          `${warning.code}: ${warning.message}`,
        ).toBe(false);
      }
    }
    expect(phase14Events).toBeGreaterThan(0);
  }, 120_000);
});
