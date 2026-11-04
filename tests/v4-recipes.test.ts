import { describe, expect, it } from 'vitest';
import { KERNEL_LIBRARY } from '../packages/v4/content/kernels/index.js';
import { BATCH1_CHILDHOOD_EDUCATION } from '../packages/v4/content/kernels/recipes/batch1-childhood-education.js';
import { BATCH1_WORK_COMMERCE } from '../packages/v4/content/kernels/recipes/batch1-work-commerce.js';
import { BATCH1_FAMILY_SOCIAL } from '../packages/v4/content/kernels/recipes/batch1-family-social.js';
import { BATCH1_HEALTH_CRIME } from '../packages/v4/content/kernels/recipes/batch1-health-crime.js';
import { BATCH1_CIVIC_WAR_MIGRATION } from '../packages/v4/content/kernels/recipes/batch1-civic-war-migration.js';
import { BATCH1_CULTURE_FAITH_SCIENCE } from '../packages/v4/content/kernels/recipes/batch1-culture-faith-science.js';
import { BATCH2_RURAL_AGRICULTURE } from '../packages/v4/content/kernels/recipes/batch2-rural-agriculture.js';
import { BATCH2_URBAN_INFRASTRUCTURE } from '../packages/v4/content/kernels/recipes/batch2-urban-infrastructure.js';
import { BATCH2_FINANCE_LAW } from '../packages/v4/content/kernels/recipes/batch2-finance-law.js';
import { BATCH2_DOMESTIC_LEISURE } from '../packages/v4/content/kernels/recipes/batch2-domestic-leisure.js';
import { BATCH2_HIGHER_EDUCATION_MEDIA } from '../packages/v4/content/kernels/recipes/batch2-higher-education-media.js';
import { BATCH2_RELIGION_CHARITY } from '../packages/v4/content/kernels/recipes/batch2-religion-charity.js';
import { BATCH3_WAR_FRONT } from '../packages/v4/content/kernels/recipes/batch3-war-front.js';
import { BATCH3_CRIME_JUSTICE } from '../packages/v4/content/kernels/recipes/batch3-crime-justice.js';
import { BATCH3_MIGRATION_REFUGEE } from '../packages/v4/content/kernels/recipes/batch3-migration-refugee.js';
import { BATCH3_CHILD_ADOLESCENT_2 } from '../packages/v4/content/kernels/recipes/batch3-child-adolescent-2.js';
import { BATCH3_WORK_INDUSTRY_2 } from '../packages/v4/content/kernels/recipes/batch3-work-industry-2.js';
import { BATCH13_EDUCATION_TASKS } from '../packages/v4/content/kernels/recipes/batch13-education-tasks.js';
import { BATCH13_WORK_TASKS } from '../packages/v4/content/kernels/recipes/batch13-work-tasks.js';
import { BATCH13_FAMILY_SOCIAL_TASKS } from '../packages/v4/content/kernels/recipes/batch13-family-social-tasks.js';
import { BATCH13_CIVIC_HEALTH_TASKS } from '../packages/v4/content/kernels/recipes/batch13-civic-health-tasks.js';
import { BATCH13_MAJOR_TURNS_EVENTS } from '../packages/v4/content/kernels/recipes/batch13-major-turns-events.js';
import { BATCH13_RELATIONSHIP_EVENTS } from '../packages/v4/content/kernels/recipes/batch13-relationship-events.js';
import { BATCH14_EDUCATION_CHAINS } from '../packages/v4/content/kernels/recipes/batch14-education-chains.js';
import { BATCH14_CAREER_CHAINS } from '../packages/v4/content/kernels/recipes/batch14-career-chains.js';
import { BATCH14_FAMILY_CHAINS } from '../packages/v4/content/kernels/recipes/batch14-family-chains.js';
import { BATCH14_SOCIAL_ECHOES } from '../packages/v4/content/kernels/recipes/batch14-social-echoes.js';
import { BATCH14_HISTORY_CONSEQUENCES } from '../packages/v4/content/kernels/recipes/batch14-history-consequences.js';
import { BATCH14_SPECIAL_LIVES } from '../packages/v4/content/kernels/recipes/batch14-special-lives.js';

const BATCHES = [
  BATCH1_CHILDHOOD_EDUCATION,
  BATCH1_WORK_COMMERCE,
  BATCH1_FAMILY_SOCIAL,
  BATCH1_HEALTH_CRIME,
  BATCH1_CIVIC_WAR_MIGRATION,
  BATCH1_CULTURE_FAITH_SCIENCE,
  BATCH2_RURAL_AGRICULTURE,
  BATCH2_URBAN_INFRASTRUCTURE,
  BATCH2_FINANCE_LAW,
  BATCH2_DOMESTIC_LEISURE,
  BATCH2_HIGHER_EDUCATION_MEDIA,
  BATCH2_RELIGION_CHARITY,
  BATCH3_WAR_FRONT,
  BATCH3_CRIME_JUSTICE,
  BATCH3_MIGRATION_REFUGEE,
  BATCH3_CHILD_ADOLESCENT_2,
  BATCH3_WORK_INDUSTRY_2,
  BATCH13_EDUCATION_TASKS,
  BATCH13_WORK_TASKS,
  BATCH13_FAMILY_SOCIAL_TASKS,
  BATCH13_CIVIC_HEALTH_TASKS,
  BATCH13_MAJOR_TURNS_EVENTS,
  BATCH13_RELATIONSHIP_EVENTS,
  BATCH14_EDUCATION_CHAINS,
  BATCH14_CAREER_CHAINS,
  BATCH14_FAMILY_CHAINS,
  BATCH14_SOCIAL_ECHOES,
  BATCH14_HISTORY_CONSEQUENCES,
  BATCH14_SPECIAL_LIVES,
];

function variantsOf(kernel: (typeof KERNEL_LIBRARY)[number]) {
  return kernel.variants ?? [];
}

function outcomesOf(kernel: (typeof KERNEL_LIBRARY)[number]) {
  return [...kernel.outcomes, ...variantsOf(kernel).flatMap((variant) => variant.outcomes ?? [])];
}

describe('Phase 12 recipe library', () => {
  it('keeps the first parallel batches complete and independently valid', () => {
    expect(BATCHES).toHaveLength(29);
    for (const batch of BATCHES) expect(batch.length).toBeGreaterThanOrEqual(40);
  });

  it('has a substantially larger executable library with world and person branches', () => {
    expect(KERNEL_LIBRARY.length).toBeGreaterThanOrEqual(1550);
    expect(new Set(KERNEL_LIBRARY.map((kernel) => kernel.id)).size).toBe(KERNEL_LIBRARY.length);
    expect(new Set(KERNEL_LIBRARY.map((kernel) => kernel.domain)).size).toBeGreaterThanOrEqual(12);
    const variants = KERNEL_LIBRARY.flatMap(variantsOf);
    expect(variants.length).toBeGreaterThanOrEqual(910);
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
    expect(personBranches.length).toBeGreaterThanOrEqual(1040);
    const branchKinds = new Set(
      personBranches.flatMap((outcome) => Object.keys(outcome.when ?? {})),
    );
    expect(branchKinds.size).toBeGreaterThanOrEqual(8);
    const phase13Tasks = KERNEL_LIBRARY.filter(
      (kernel) => kernel.kind === 'task' && kernel.id.startsWith('r13-'),
    );
    expect(phase13Tasks.length).toBeGreaterThanOrEqual(200);
    for (const kernel of phase13Tasks) {
      expect(kernel.task, kernel.id).toBeDefined();
      expect(kernel.task!.goals.length, kernel.id).toBeGreaterThan(0);
      expect(kernel.task!.baseUtility, kernel.id).toBeGreaterThan(0);
    }
    const phase14 = KERNEL_LIBRARY.filter((kernel) => kernel.id.startsWith('r14-'));
    expect(phase14.length).toBeGreaterThanOrEqual(260);
    expect(phase14.filter((kernel) => kernel.kind === 'task').length).toBeGreaterThanOrEqual(100);
    for (const kernel of phase14) {
      if (kernel.kind === 'task') expect(kernel.task, kernel.id).toBeDefined();
    }
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
      expect(
        Object.values(trace).some((value) => typeof value === 'string' && value.length > 0),
      ).toBe(true);
    }
  });
});
