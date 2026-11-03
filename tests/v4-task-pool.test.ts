import { describe, expect, it } from 'vitest';
import { advanceV4Year } from '../packages/v4/engine.js';
import { VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import type { TaskDefinition, WorldState } from '../packages/v4/domain.js';
import {
  compileGeneratedTasks,
  validateGeneratedPack,
  type GeneratedPack,
} from '../packages/v4/generated.js';
import { GENERATED_TASKS } from '../packages/v4/content/generated/index.js';

const TASK_ID = 'test-task:ask-for-work';

function world(): WorldState {
  return structuredClone(VIENNA_1912_SEED);
}

function task(overrides: Partial<TaskDefinition> = {}): TaskDefinition {
  return {
    id: TASK_ID,
    version: 1,
    packId: 'test-task-pack',
    familyId: 'test-task-family',
    title: '向师傅要求更多工作',
    stage: 'adulthood',
    ageWindow: { min: 16, max: 65 },
    roles: [{ key: 'subject', kind: 'subject', required: true, minAge: 16, maxAge: 65 }],
    conditions: [{ kind: 'age', min: 16, max: 65 }],
    tags: ['task', 'task:work', 'work'],
    triggerMode: 'action',
    rate: 0,
    outcomes: [
      {
        id: 'accepted',
        weight: 1,
        immediateText: '{subject}向师傅提出承担更完整的工序，师傅让他第二天早到半小时。',
        effects: [
          {
            type: 'skill',
            personId: '$subject',
            skill: 'craft',
            amount: 0.05,
            reason: 'asked for responsibility',
          },
          {
            type: 'mood',
            personId: '$subject',
            amount: 0.04,
            reason: 'was trusted with more work',
          },
        ],
      },
    ],
    task: {
      domain: 'work',
      goals: ['work', 'status'],
      needs: ['cash', 'status'],
      baseUtility: 3,
      risk: 0,
      skills: ['craft'],
    },
    ...overrides,
  };
}

describe('content-authored task pool', () => {
  it('lets a task definition enter Agency and commits its typed outcome', () => {
    const result = advanceV4Year(world(), [], {
      economy: { enabled: false },
      eventRuntime: true,
      agency: true,
      tasks: [task()],
      maxOrdinaryEventsPerPerson: 2,
    });
    const event = result.events.find((entry) => entry.action === `${TASK_ID}/accepted`);
    expect(event).toBeDefined();
    expect(event!.effects.some((effect) => effect.type === 'skill')).toBe(true);
    expect(event!.immediateText).not.toContain('{subject}');
    const actor = result.world.persons[event!.subjectId]!;
    expect(actor.agency?.lastActionKind).toBe('task:work');
  });

  it('does not offer a task outside its age/stage or when disabled', () => {
    const result = advanceV4Year(world(), [], {
      economy: { enabled: false },
      eventRuntime: true,
      agency: true,
      tasks: [task({ ageWindow: { min: 70, max: 80 }, stage: 'elderhood' })],
      maxOrdinaryEventsPerPerson: 2,
    });
    expect(result.events.some((entry) => entry.action.startsWith(TASK_ID))).toBe(false);
  });

  it('compiles a generated task pack into the same agency path', () => {
    const pack: GeneratedPack = {
      id: 'test-generated-task-pack',
      kind: 'task',
      title: '学徒主动请求',
      stage: 'adulthood',
      ageWindow: { min: 16, max: 65 },
      tags: ['work', 'apprentice'],
      baseRate: 0.5,
      task: {
        domain: 'work',
        goals: ['work', 'status'],
        needs: ['cash', 'status'],
        baseUtility: 2.4,
        risk: 0.1,
        skills: ['craft'],
      },
      nodes: [
        {
          id: 'test-generated-task-pack.ask',
          title: '向工头请求独立工序',
          roles: [{ key: 'subject', kind: 'subject', required: true, minAge: 16, maxAge: 65 }],
          conditions: [{ kind: 'age', min: 16, max: 65 }],
          outcomes: [
            {
              id: 'yes',
              weight: 1,
              text: '{subject}向工头请求独立完成一道工序，工头让他先试一个下午。',
              effects: [
                {
                  type: 'skill',
                  personId: '$subject',
                  skill: 'craft',
                  amount: 0.03,
                  reason: 'tried independent work',
                },
              ],
              narration: [
                {
                  id: 'default',
                  key: 'yes',
                  text: '工头把工具推过来，没有说话，只让他先量好尺寸再下刀。',
                },
              ],
            },
          ],
        },
      ],
    };
    const validation = validateGeneratedPack(pack);
    expect(validation.errors).toEqual([]);
    const tasks = compileGeneratedTasks(pack);
    expect(tasks).toHaveLength(1);
    expect(tasks[0]!.task.domain).toBe('work');
    const result = advanceV4Year(world(), [], {
      economy: { enabled: false },
      eventRuntime: true,
      agency: true,
      tasks,
      maxOrdinaryEventsPerPerson: 2,
    });
    expect(result.events.some((entry) => entry.action === 'test-generated-task-pack.ask/yes')).toBe(
      true,
    );
  });

  it('publishes the generated task pool with semantic domains', () => {
    expect(GENERATED_TASKS.length).toBe(50);
    expect(new Set(GENERATED_TASKS.map((entry) => entry.id)).size).toBe(50);
    expect(new Set(GENERATED_TASKS.map((entry) => entry.task.domain)).size).toBeGreaterThanOrEqual(
      8,
    );
    for (const entry of GENERATED_TASKS) {
      expect(entry.task.goals.length).toBeGreaterThan(0);
      expect(entry.task.needs.length).toBeGreaterThan(0);
      expect(entry.task.baseUtility).toBeGreaterThanOrEqual(0.8);
      expect(entry.outcomes?.length ?? 0).toBeGreaterThan(0);
    }
  });
});
