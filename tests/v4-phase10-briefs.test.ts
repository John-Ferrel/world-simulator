import { describe, expect, it } from 'vitest';
import { PHASE10_BRIEFS } from '../packages/v4/content-author/index.js';

describe('Phase 10 content briefs', () => {
  it('contains 8 families and 48 concrete six-node nodes', () => {
    expect(PHASE10_BRIEFS).toHaveLength(8);
    expect(PHASE10_BRIEFS.reduce((sum, brief) => sum + brief.nodeBriefs.length, 0)).toBe(48);
    expect(PHASE10_BRIEFS.filter((brief) => brief.kind === 'task')).toHaveLength(4);
    expect(PHASE10_BRIEFS.filter((brief) => brief.kind === 'event')).toHaveLength(4);
    const ids = PHASE10_BRIEFS.flatMap((brief) => brief.nodeBriefs.map((node) => node.id));
    expect(new Set(ids).size).toBe(ids.length);
    for (const brief of PHASE10_BRIEFS) {
      expect(brief.id.startsWith('p10-'), brief.id).toBe(true);
      expect(brief.nodeBriefs).toHaveLength(6);
      for (const node of brief.nodeBriefs) {
        expect(node.id.startsWith(brief.id), node.id).toBe(true);
        expect(node.outcomeHints).toHaveLength(3);
        expect(
          node.roles.some((role) => role.kind === 'subject'),
          node.id,
        ).toBe(true);
        expect(node.conditions?.length ?? 0, node.id).toBeGreaterThan(0);
        expect(node.allowedEffects?.length ?? 0, node.id).toBeGreaterThan(0);
      }
      if (brief.kind === 'task') {
        expect(brief.task, brief.id).toBeDefined();
        expect(brief.task!.goals.length, brief.id).toBeGreaterThan(0);
        expect(brief.task!.needs.length, brief.id).toBeGreaterThan(0);
      }
    }
  });
});
