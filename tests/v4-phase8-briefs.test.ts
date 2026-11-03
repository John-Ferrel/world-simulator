import { describe, expect, it } from 'vitest';
import { PHASE8_TASK_BRIEFS } from '../packages/v4/content-author/phase8-briefs.js';
import type { ContentFamilyBrief, ContentNodeBrief } from '../packages/v4/content-author/briefs.js';
import type { GeneratedTaskMeta } from '../packages/v4/generated.js';
import type { EventEffect, PersonAgencyGoal, TaskDomain, TaskNeed } from '../packages/v4/domain.js';

const TASK_DOMAINS = new Set<TaskDomain>([
  'education',
  'work',
  'family',
  'social',
  'daily',
  'culture',
  'health',
  'politics',
  'history',
  'knowledge',
  'migration',
  'special',
]);
const TASK_GOALS = new Set<PersonAgencyGoal>([
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
const TASK_NEEDS = new Set<TaskNeed>([
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
const TASK_SKILLS = new Set(['literacy', 'numeracy', 'craft', 'social']);
const TASK_EFFECTS = new Set<EventEffect['type']>([
  'cash',
  'food',
  'health',
  'condition',
  'mood',
  'reputation',
  'skill',
  'flag',
  'education',
  'employment',
  'unemployment',
  'relation',
  'relation_end',
  'role',
  'move',
  'household',
  'residence',
]);

function mergedTask(brief: ContentFamilyBrief, node: ContentNodeBrief): GeneratedTaskMeta {
  return { ...(brief.task ?? {}), ...(node.task ?? {}) } as GeneratedTaskMeta;
}

function allNodes(): { brief: ContentFamilyBrief; node: ContentNodeBrief }[] {
  return PHASE8_TASK_BRIEFS.flatMap((brief) => brief.nodeBriefs.map((node) => ({ brief, node })));
}

describe('Phase 8 active-task briefs', () => {
  it('ships eight task packs with unique prefixed ids', () => {
    expect(PHASE8_TASK_BRIEFS).toHaveLength(8);
    const ids = PHASE8_TASK_BRIEFS.map((brief) => brief.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id.startsWith('task-vienna-')).toBe(true);
  });

  it('marks every pack as a task and gives it metadata and exactly six nodes', () => {
    for (const brief of PHASE8_TASK_BRIEFS) {
      expect(brief.kind).toBe('task');
      expect(brief.task).toBeDefined();
      expect(brief.nodeBriefs).toHaveLength(6);
      expect(brief.conditions?.length ?? 0).toBeGreaterThan(0);
      for (const node of brief.nodeBriefs) {
        expect(node.conditions?.length ?? 0).toBeGreaterThan(0);
        expect(node.allowedEffects?.length ?? 0).toBeGreaterThan(0);
      }
    }
  });

  it('gives every node a subject, three outcome hints and valid structural fields', () => {
    for (const { brief, node } of allNodes()) {
      expect(node.roles.some((role) => role.kind === 'subject')).toBe(true);
      expect(node.outcomeHints).toHaveLength(3);
      expect(node.outcomeHints.every((hint) => hint.trim().length > 0)).toBe(true);

      const meta = mergedTask(brief, node);
      expect(TASK_DOMAINS.has(meta.domain as TaskDomain)).toBe(true);
      expect(meta.goals.length).toBeGreaterThan(0);
      for (const goal of meta.goals) expect(TASK_GOALS.has(goal as PersonAgencyGoal)).toBe(true);
      expect(meta.needs.length).toBeGreaterThan(0);
      for (const need of meta.needs) expect(TASK_NEEDS.has(need as TaskNeed)).toBe(true);
      expect(meta.baseUtility).toBeGreaterThanOrEqual(0.8);
      expect(meta.baseUtility).toBeLessThanOrEqual(2.2);
      if (meta.risk !== undefined) {
        expect(meta.risk).toBeGreaterThanOrEqual(0);
        expect(meta.risk).toBeLessThanOrEqual(0.85);
      }
      for (const skill of meta.skills ?? []) expect(TASK_SKILLS.has(skill)).toBe(true);
      for (const effect of node.allowedEffects ?? []) expect(TASK_EFFECTS.has(effect)).toBe(true);
    }
  });

  it('requires a historicalId on every historical role', () => {
    for (const { node } of allNodes()) {
      for (const role of node.roles) {
        if (role.kind !== 'historical') continue;
        expect(role.historicalId).toBeTruthy();
        expect(role.minAge).toBeTypeOf('number');
        expect(role.maxAge).toBeTypeOf('number');
      }
    }
  });

  it('gates every special-capability node with one matching capability contract', () => {
    const special = PHASE8_TASK_BRIEFS.find(
      (brief) => brief.id === 'task-vienna-special-capability',
    );
    expect(special).toBeDefined();
    if (!special) return;

    for (const node of special.nodeBriefs) {
      const capabilities = (node.conditions ?? []).filter(
        (condition) => condition.kind === 'capability',
      );
      expect(capabilities).toHaveLength(1);
      const condition = capabilities[0];
      if (condition?.kind !== 'capability') throw new Error('capability condition missing');
      const meta = mergedTask(special, node);
      expect(meta.capability).toBe(condition.capability);
    }
  });

  it('keeps all node ids unique and all semantic titles distinct', () => {
    const nodes = allNodes().map(({ node }) => node);
    const ids = nodes.map((node) => node.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id.startsWith('task-vienna-')).toBe(true);

    const normalize = (title: string) => title.trim().replace(/\s+/g, '').toLowerCase();
    const titles = nodes.map((node) => normalize(node.title));
    expect(new Set(titles).size).toBe(titles.length);
  });
});
