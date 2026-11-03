import { mkdirSync, writeFileSync } from 'node:fs';
import { createV4Birth } from '../packages/v4/birth.js';
import { auditCandidatePools } from '../packages/v4/engine.js';
import type { TaskDefinition, WorldDate, WorldState } from '../packages/v4/domain.js';
import { VIENNA_1912_SEED, VIENNA_1912_SCENES } from '../packages/v4/content/vienna-1912.js';
import { VIENNA_LIFE_SCENES } from '../packages/v4/content/vienna-life.js';
import { VIENNA_POSTWAR_SCENES } from '../packages/v4/content/vienna-postwar.js';
import { VIENNA_HISTORY_SCENES } from '../packages/v4/content/vienna-history.js';
import { VIENNA_DEVELOPMENT_SCENES } from '../packages/v4/content/vienna-developments.js';
import { VIENNA_FAMILY_RUNTIME_SCENES } from '../packages/v4/content/vienna-family.js';
import { GENERATED_SCENES, GENERATED_TASKS } from '../packages/v4/content/generated/index.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { refreshAgencyGoal } from '../packages/v4/agency.js';

const SCENES = [
  ...VIENNA_1912_SCENES,
  ...VIENNA_LIFE_SCENES,
  ...VIENNA_POSTWAR_SCENES,
  ...VIENNA_HISTORY_SCENES,
  ...VIENNA_DEVELOPMENT_SCENES,
  ...VIENNA_FAMILY_RUNTIME_SCENES,
  ...GENERATED_SCENES,
];

function setup(): { world: WorldState; specialId: string } {
  let world = applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
  const birth = createV4Birth(
    world,
    {
      name: 'Sofia Beobachterin',
      sex: 'female',
      health: 0.92,
      wish: '能看穿别人没有说出口的顾虑，并因此找到自己的道路。',
      lifeMode: 'legendary',
      appearance: { skin: 1, hair: 2, clothes: 3 },
    },
    'phase8-special-birth',
    'phase8-special-owner',
  );
  world = birth.world;
  const special = world.persons[birth.childId]!;
  special.lifeContract = {
    ...(special.lifeContract ?? {
      originalWish: '能看穿别人没有说出口的顾虑。',
      mode: 'legendary',
      createdAt: { ...world.date },
    }),
    capability: 'social_insight',
    interpretation: '实验夹具：模拟 Birth Contract 编译后的 social_insight 能力。',
    compiledAt: { ...world.date },
  };
  special.life ??= {
    mood: 0,
    reputation: 0,
    skills: { literacy: 0.2, numeracy: 0.2, craft: 0.2, social: 0.5 },
    flags: [],
  };
  if (!special.life.flags.includes('capability:social_insight'))
    special.life.flags.push('capability:social_insight');
  return { world, specialId: special.id };
}

function audit(world: WorldState, personId: string, date: WorldDate, tasks: TaskDefinition[]) {
  const person = world.persons[personId];
  if (!person) return undefined;
  refreshAgencyGoal(world, person, date);
  return auditCandidatePools(world, personId, date, SCENES, tasks);
}

const { world, specialId } = setup();
const samples = [
  { label: '贫穷家庭学徒', id: 'person-franz-lechner', date: { year: 1914, month: 1 } },
  { label: '富裕家庭青年', id: 'person-otto-winter', date: { year: 1914, month: 1 } },
  { label: '医生/医疗工作者', id: 'person-emil-weiss', date: { year: 1914, month: 1 } },
  { label: '政治/社会活动者', id: 'person-alois-lechner', date: { year: 1914, month: 1 } },
  { label: '特殊出生能力人物', id: specialId, date: { year: 1935, month: 1 } },
  { label: '真实历史人物', id: 'person-sigmund-freud', date: { year: 1914, month: 1 } },
];

const results = samples.map((sample) => {
  const before = audit(world, sample.id, sample.date, []);
  const after = audit(world, sample.id, sample.date, GENERATED_TASKS);
  return {
    label: sample.label,
    personId: sample.id,
    name: world.persons[sample.id]?.name,
    date: sample.date,
    age: before ? sample.date.year - world.persons[sample.id]!.born.year : undefined,
    goal: after?.goal,
    before: before
      ? {
          events: before.eventCount,
          tasks: before.taskCount,
          topTasks: before.tasks.slice(0, 8),
        }
      : null,
    after: after
      ? {
          events: after.eventCount,
          tasks: after.taskCount,
          topTasks: after.tasks.slice(0, 12),
          domains: [...new Set(after.tasks.map((task) => task.domain))],
        }
      : null,
  };
});

const report = {
  generatedAt: new Date().toISOString(),
  taskDefinitions: GENERATED_TASKS.length,
  eventDefinitions: SCENES.length,
  generatedScenes: GENERATED_SCENES.length,
  taskDomains: GENERATED_TASKS.reduce<Record<string, number>>((counts, task) => {
    counts[task.task.domain] = (counts[task.task.domain] ?? 0) + 1;
    return counts;
  }, {}),
  samples: results,
};
mkdirSync('docs/v4', { recursive: true });
writeFileSync('docs/v4/phase-8-candidates.json', `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
