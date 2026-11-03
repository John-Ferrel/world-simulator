import { describe, expect, it } from 'vitest';
import {
  PHASE9_CHILDHOOD_BRIEFS,
  PHASE9_GAP_BRIEFS,
  PHASE9_SOLITUDE_BRIEFS,
  PHASE9_HISTORY_BRIEFS,
  PHASE9_SOCIAL_BRIEFS,
  PHASE9_WORK_BRIEFS,
} from '../packages/v4/content-author/index.js';
import type { ContentFamilyBrief } from '../packages/v4/content-author/index.js';

const briefs: ContentFamilyBrief[] = [
  ...PHASE9_CHILDHOOD_BRIEFS,
  ...PHASE9_WORK_BRIEFS,
  ...PHASE9_SOCIAL_BRIEFS,
  ...PHASE9_HISTORY_BRIEFS,
  ...PHASE9_GAP_BRIEFS,
  ...PHASE9_SOLITUDE_BRIEFS,
];

const validGoals = new Set([
  'survival',
  'work',
  'family',
  'belonging',
  'status',
  'cause',
  'care',
  'rest',
  'knowledge',
]);
const validNeeds = new Set([
  'cash',
  'food',
  'health',
  'belonging',
  'status',
  'care',
  'knowledge',
  'safety',
  'autonomy',
]);

describe('Phase 9 content briefs', () => {
  it('contains 27 packs and 162 distinct six-node families', () => {
    expect(briefs).toHaveLength(27);
    expect(new Set(briefs.map((brief) => brief.id)).size).toBe(27);
    expect(briefs.reduce((sum, brief) => sum + brief.nodeBriefs.length, 0)).toBe(162);
    expect(briefs.filter((brief) => brief.kind === 'task')).toHaveLength(10);
    expect(briefs.filter((brief) => brief.kind === 'event')).toHaveLength(17);
    const nodeIds = briefs.flatMap((brief) => brief.nodeBriefs.map((node) => node.id));
    expect(new Set(nodeIds).size).toBe(nodeIds.length);
    for (const brief of briefs) {
      expect(brief.id).toMatch(/^p9-/);
      expect(brief.nodeBriefs).toHaveLength(6);
      if (brief.kind === 'task') {
        expect(brief.task).toBeDefined();
        expect(brief.task!.goals.length).toBeGreaterThan(0);
        expect(brief.task!.needs.length).toBeGreaterThan(0);
        for (const goal of brief.task!.goals) expect(validGoals.has(goal)).toBe(true);
        for (const need of brief.task!.needs) expect(validNeeds.has(need)).toBe(true);
        expect(brief.task!.baseUtility).toBeGreaterThanOrEqual(0.8);
        expect(brief.task!.baseUtility).toBeLessThanOrEqual(2.2);
      }
    }
  });

  it('has concrete roles, conditions and three different outcome directions per node', () => {
    for (const brief of briefs) {
      for (const node of brief.nodeBriefs) {
        expect(node.roles.some((role) => role.kind === 'subject')).toBe(true);
        expect(node.conditions?.length ?? 0).toBeGreaterThan(0);
        expect(new Set(node.outcomeHints).size).toBe(3);
        expect(node.allowedEffects?.length ?? 0).toBeGreaterThan(0);
        for (const role of node.roles) {
          if (role.kind === 'historical') expect(role.historicalId).toMatch(/^Q\d+$/);
        }
      }
    }
  });

  it('does not duplicate normalized node titles across packs', () => {
    const titles = briefs.flatMap((brief) =>
      brief.nodeBriefs.map((node) => node.title.replace(/\s+/g, '').toLowerCase()),
    );
    expect(new Set(titles).size).toBe(titles.length);
  });
});
