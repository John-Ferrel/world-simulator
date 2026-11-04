import { describe, expect, it } from 'vitest';
import { advanceV4Year } from '../packages/v4/engine.js';
import { VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import { KERNEL_LIBRARY } from '../packages/v4/content/kernels/index.js';
import { BATCH13_EDUCATION_TASKS } from '../packages/v4/content/kernels/recipes/batch13-education-tasks.js';
import { BATCH13_WORK_TASKS } from '../packages/v4/content/kernels/recipes/batch13-work-tasks.js';
import { BATCH13_FAMILY_SOCIAL_TASKS } from '../packages/v4/content/kernels/recipes/batch13-family-social-tasks.js';
import { BATCH13_CIVIC_HEALTH_TASKS } from '../packages/v4/content/kernels/recipes/batch13-civic-health-tasks.js';
import { BATCH13_MAJOR_TURNS_EVENTS } from '../packages/v4/content/kernels/recipes/batch13-major-turns-events.js';
import { BATCH13_RELATIONSHIP_EVENTS } from '../packages/v4/content/kernels/recipes/batch13-relationship-events.js';

const TASK_BATCHES = [
  BATCH13_EDUCATION_TASKS,
  BATCH13_WORK_TASKS,
  BATCH13_FAMILY_SOCIAL_TASKS,
  BATCH13_CIVIC_HEALTH_TASKS,
];
const EVENT_BATCHES = [BATCH13_MAJOR_TURNS_EVENTS, BATCH13_RELATIONSHIP_EVENTS];

describe('Phase 13 active life paths', () => {
  it('adds at least 200 active tasks and 100 turning-point/relationship events', () => {
    for (const batch of TASK_BATCHES) {
      expect(batch).toHaveLength(50);
      for (const kernel of batch) {
        expect(kernel.kind, kernel.id).toBe('task');
        expect(kernel.task, kernel.id).toBeDefined();
      }
    }
    for (const batch of EVENT_BATCHES) {
      expect(batch).toHaveLength(50);
      for (const kernel of batch) expect(kernel.kind, kernel.id).toBe('event');
    }
    expect(KERNEL_LIBRARY.length).toBeGreaterThanOrEqual(1300);
    expect(KERNEL_LIBRARY.filter((kernel) => kernel.kind === 'task').length).toBeGreaterThanOrEqual(
      250,
    );
  });

  it('keeps task goals aligned with the existing Agency vocabulary', () => {
    const goals = new Set([
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
    for (const batch of TASK_BATCHES) {
      for (const kernel of batch) {
        for (const goal of kernel.task!.goals) {
          expect(goals.has(goal), `${kernel.id}: ${goal}`).toBe(true);
        }
        expect(kernel.task!.baseUtility, kernel.id).toBeGreaterThan(0);
      }
    }
  });

  it('emits scheduling counters without changing a rate-1 test scene', () => {
    const scene = {
      id: 'phase13:counter-fixture',
      version: 1,
      packId: 'test-pack',
      title: 'counter fixture',
      stage: 'adulthood' as const,
      ageWindow: { min: 18, max: 70 },
      roles: [{ key: 'subject', kind: 'subject' as const, required: true }],
      conditions: [{ kind: 'age' as const, min: 18, max: 70 }],
      rate: 1,
      tags: ['test'],
      outcomes: [
        {
          id: 'happened',
          weight: 1,
          immediateText: '一件事被记录了下来。',
          effects: [
            {
              type: 'flag' as const,
              personId: '$subject',
              flag: 'phase13-counter',
              add: true,
              reason: 'counter',
            },
          ],
        },
      ],
    };
    const result = advanceV4Year(structuredClone(VIENNA_1912_SEED), [scene], {
      economy: { enabled: false },
      eventRuntime: true,
      statisticalModel: false,
      maxOrdinaryEventsPerPerson: 1,
    });
    expect(result.events.some((event) => event.action.startsWith('phase13:counter-fixture/'))).toBe(
      true,
    );
    expect(result.diagnostics.scheduling?.candidatePool.base).toBeGreaterThan(0);
    expect(result.diagnostics.scheduling?.resolved.base).toBeGreaterThan(0);
  });

  it('keeps narration alternatives substantial across the base library', async () => {
    const { ALL_EVENT_SCENES } = await import('../packages/v4/content/generated/index.js');
    const variants = ALL_EVENT_SCENES.reduce(
      (sum, scene) => sum + (scene.narration?.length ?? 0),
      0,
    );
    expect(variants).toBeGreaterThanOrEqual(400);
  });
});
