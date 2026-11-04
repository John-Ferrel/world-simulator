import { describe, expect, it } from 'vitest';
import { KERNEL_LIBRARY } from '../packages/v4/content/kernels/index.js';
import { BATCH1_CHILDHOOD_EDUCATION } from '../packages/v4/content/kernels/recipes/batch1-childhood-education.js';
import { BATCH1_WORK_COMMERCE } from '../packages/v4/content/kernels/recipes/batch1-work-commerce.js';
import { BATCH1_FAMILY_SOCIAL } from '../packages/v4/content/kernels/recipes/batch1-family-social.js';
import { BATCH1_HEALTH_CRIME } from '../packages/v4/content/kernels/recipes/batch1-health-crime.js';
import { BATCH1_CIVIC_WAR_MIGRATION } from '../packages/v4/content/kernels/recipes/batch1-civic-war-migration.js';
import { BATCH1_CULTURE_FAITH_SCIENCE } from '../packages/v4/content/kernels/recipes/batch1-culture-faith-science.js';

const BATCHES = [
  BATCH1_CHILDHOOD_EDUCATION,
  BATCH1_WORK_COMMERCE,
  BATCH1_FAMILY_SOCIAL,
  BATCH1_HEALTH_CRIME,
  BATCH1_CIVIC_WAR_MIGRATION,
  BATCH1_CULTURE_FAITH_SCIENCE,
];

function variantsOf(kernel: (typeof KERNEL_LIBRARY)[number]) {
  return kernel.variants ?? [];
}

function outcomesOf(kernel: (typeof KERNEL_LIBRARY)[number]) {
  return [
    ...kernel.outcomes,
    ...variantsOf(kernel).flatMap((variant) => variant.outcomes ?? []),
  ];
}

describe('Phase 12 recipe library', () => {
  it('keeps the first parallel batches complete and independently valid', () => {
    expect(BATCHES).toHaveLength(6);
    for (const batch of BATCHES) expect(batch.length).toBe(50);
  });

  it('has a substantially larger executable library with world and person branches', () => {
    expect(KERNEL_LIBRARY.length).toBeGreaterThanOrEqual(450);
    expect(new Set(KERNEL_LIBRARY.map((kernel) => kernel.id)).size).toBe(KERNEL_LIBRARY.length);
    expect(new Set(KERNEL_LIBRARY.map((kernel) => kernel.domain)).size).toBeGreaterThanOrEqual(12);
    const variants = KERNEL_LIBRARY.flatMap(variantsOf);
    expect(variants.length).toBeGreaterThanOrEqual(250);
    expect(
      variants.filter(
        (variant) =>
          (variant.when.contextTags?.length ?? 0) > 0 ||
          (variant.when.milieuTags?.length ?? 0) > 0 ||
          (variant.when.processKinds?.length ?? 0) > 0 ||
          (variant.when.legacyKinds?.length ?? 0) > 0,
      ).length,
    ).toBeGreaterThanOrEqual(20);
    const personBranches = KERNEL_LIBRARY.flatMap(outcomesOf).filter((outcome) => outcome.when);
    expect(personBranches.length).toBeGreaterThanOrEqual(200);
    const branchKinds = new Set(
      personBranches.flatMap((outcome) => Object.keys(outcome.when ?? {})),
    );
    expect(branchKinds.size).toBeGreaterThanOrEqual(6);
  });

  it('does not duplicate titles or exact outcome text across the library', () => {
    const titles = new Map<string, string[]>();
    const texts = new Map<string, string[]>();
    for (const kernel of KERNEL_LIBRARY) {
      titles.set(kernel.title, [...(titles.get(kernel.title) ?? []), kernel.id]);
      for (const outcome of outcomesOf(kernel)) {
        texts.set(outcome.text, [...(texts.get(outcome.text) ?? []), `${kernel.id}/${outcome.id}`]);
      }
    }
    expect([...titles.entries()].filter(([, ids]) => ids.length > 1)).toEqual([]);
    expect([...texts.entries()].filter(([, ids]) => ids.length > 1)).toEqual([]);
  });

  it('keeps authored incident traces tied to executable outcomes', () => {
    const traced = KERNEL_LIBRARY.flatMap(outcomesOf).filter((outcome) => outcome.trace);
    expect(traced.length).toBeGreaterThan(0);
    for (const outcome of traced) {
      const trace = outcome.trace!;
      expect(Object.values(trace).some((value) => typeof value === 'string' && value.length > 0)).toBe(
        true,
      );
    }
  });
});
