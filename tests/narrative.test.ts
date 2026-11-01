import { describe, expect, it } from 'vitest';
import { createWorld } from '../packages/world-packs/index.js';
import { compileLifeChapters } from '../packages/narratives/life.js';
import type { HistoricalEvent } from '../packages/contracts/index.js';
import { spawnAdult } from './helpers/spawn.js';

function event(
  worldId: string,
  month: number,
  kind: string,
  personIds: string[],
  locationId: string,
  text: string,
  data: Record<string, unknown> = {},
  significance = 0.7,
): HistoricalEvent {
  return {
    id: `${worldId}:n${month}:${kind}`,
    worldId,
    month,
    kind,
    personIds,
    locationId,
    text,
    data,
    causeIds: [],
    significance,
  };
}

describe('grounded life narrative', () => {
  it('turns real events into yearly chapters with names and causes', () => {
    const world = createWorld('narrative');
    const person = spawnAdult(world, {
      id: 'person-narrative',
      name: '林雾',
      locationId: 'town-0',
      age: 0,
    });
    person.birth = 0;
    const events = [
      event(
        world.id,
        0,
        'birth',
        [person.id],
        'town-0',
        '林雾出生。',
        {
          parentIds: ['person-0'],
        },
        0.95,
      ),
      event(world.id, 13, 'scarcity', [person.id], 'town-0', '当地粮食不足。', {
        scarcity: 0.6,
      }),
      event(world.id, 25, 'migration', [person.id], 'town-1', '迁往邻镇。', {
        from: 'town-0',
        to: 'town-1',
      }),
      event(
        world.id,
        60,
        'partnership',
        [person.id, 'person-1'],
        'town-1',
        '决定共同生活。',
        {},
        0.9,
      ),
      event(
        world.id,
        100,
        'death',
        [person.id],
        'town-1',
        '林雾去世。',
        {
          reason: '疾病',
        },
        1,
      ),
    ];
    const chapters = compileLifeChapters(world, person, events);
    expect(chapters.length).toBeGreaterThan(2);
    expect(chapters[0].text).toContain('林雾');
    expect(chapters[0].text).toContain('出生');
    expect(chapters.some((chapter) => chapter.text.includes('粮食'))).toBe(true);
    expect(
      chapters.some((chapter) =>
        chapter.text.includes(world.settlements.find((site) => site.id === 'town-1')!.name),
      ),
    ).toBe(true);
    expect(chapters.at(-1)?.text).toContain('去世');
    expect(chapters.every((chapter) => chapter.sourceIds.length >= 1)).toBe(true);
  });

  it('does not invent a parent name or a place that is absent from the event', () => {
    const world = createWorld('narrative-missing');
    const person = spawnAdult(world, {
      id: 'person-missing',
      name: '无名者',
      locationId: 'town-2',
      age: 4,
    });
    person.birth = 0;
    const chapters = compileLifeChapters(world, person, [
      event(world.id, 2, 'quiet_life', [person.id], 'town-2', '某人在当地生活。', {}, 0.2),
    ]);
    expect(chapters).toHaveLength(1);
    expect(chapters[0].text).not.toMatch(/父亲|母亲|出生于/);
    expect(chapters[0].text).toContain('无名者');
  });

  it('does not turn the death of someone else into the observed person’s death', () => {
    const world = createWorld('narrative-bereavement');
    const person = spawnAdult(world, {
      id: 'person-bereaved',
      name: '沈舟',
      locationId: 'town-0',
      age: 20,
    });
    person.birth = -240;
    world.month = 40;
    const events = [
      event(
        world.id,
        25,
        'death',
        ['person-other', person.id],
        'town-0',
        '顾遥因疾病离世，终年41岁。',
        { age: 41, reason: '疾病' },
        1,
      ),
      event(
        world.id,
        25,
        'bereavement',
        [person.id, 'person-other'],
        'town-0',
        '顾遥的离去让沈舟重新思考自己的生活。',
        {},
        0.9,
      ),
    ];
    const chapters = compileLifeChapters(world, person, events);
    expect(chapters).toHaveLength(1);
    expect(chapters[0].title).not.toContain('离世');
    expect(chapters[0].text).toContain('失去');
    expect(chapters[0].text).not.toContain('终年41岁');
  });

  it('does not treat the birth of a child as the parent being born', () => {
    const world = createWorld('narrative-parent');
    const parent = spawnAdult(world, {
      id: 'person-parent',
      name: '周岚',
      locationId: 'town-1',
      age: 28,
    });
    parent.birth = -336;
    const events = [
      event(
        world.id,
        20,
        'birth',
        [parent.id, 'person-child'],
        'town-1',
        '周岚的孩子出生。',
        { childId: 'person-child', parentIds: [parent.id] },
        0.95,
      ),
      event(world.id, 22, 'quiet_life', [parent.id], 'town-1', '周岚照常生活。', {}, 0.2),
    ];
    const chapters = compileLifeChapters(world, parent, events);
    expect(chapters).toHaveLength(1);
    expect(chapters[0].text).not.toContain('周岚出生在');
    expect(chapters[0].title).not.toBe('1900 · 出生');
  });

  it('keeps a placeholder wish and repeated planning chores out of the story', () => {
    const world = createWorld('narrative-placeholder');
    const person = spawnAdult(world, {
      id: 'person-placeholder',
      name: '林岫',
      locationId: 'town-2',
      age: 1,
    });
    person.birth = 0;
    world.runtime ??= {} as NonNullable<typeof world.runtime>;
    world.runtime.lifePrograms ??= {};
    world.runtime.lifePrograms[person.id] = {
      id: 'life-placeholder',
      personId: person.id,
      version: 1,
      source: 'fallback',
      createdMonth: 0,
      wish: '无',
      interpretation: { hopes: [], conditions: [], costs: [], translations: [] },
      traits: {
        health: 1,
        temperament: { care: 0.5, ambition: 0.5, tradition: 0.5 },
        personality: {
          openness: 0.5,
          conscientiousness: 0.5,
          extraversion: 0.5,
          agreeableness: 0.5,
          neuroticism: 0.5,
        },
      },
      goals: [],
      opportunities: [],
      replanTriggers: [],
      milestones: [],
      status: 'active',
      causeIds: [],
    } as any;
    const events = [
      event(
        world.id,
        2,
        'birth',
        [person.id],
        'town-2',
        '林岫出生。',
        { childId: person.id },
        0.95,
      ),
      event(
        world.id,
        14,
        'agenda_adopted',
        [person.id],
        'town-2',
        '林岫决定继续学习。',
        { intention: '继续适龄学习与成长' },
        0.7,
      ),
      event(
        world.id,
        26,
        'agenda_adopted',
        [person.id],
        'town-2',
        '林岫决定继续学习。',
        { intention: '继续适龄学习与成长' },
        0.7,
      ),
    ];
    const chapters = compileLifeChapters(world, person, events);
    const text = chapters.map((chapter) => chapter.text).join('');
    expect(text).not.toContain('第一个愿望');
    expect(text).not.toContain('继续适龄学习与成长');
    expect(chapters[1].text).toContain('日子');
    expect(text).not.toContain('完成了一次关于');
  });

  it('uses a concrete trajectory beat instead of a career or practice template', () => {
    const world = createWorld('narrative-beat');
    const person = spawnAdult(world, {
      id: 'person-beat',
      name: '沈砚',
      locationId: 'town-0',
      age: 8,
    });
    person.birth = -96;
    const chapters = compileLifeChapters(world, person, [
      event(
        world.id,
        10,
        'life_beat',
        [person.id],
        'town-0',
        '松湾，8岁的沈砚经历「短暂的识字窗口」：家里把他送进纱厂，读书的路径被迫中断。此后以童工为生。',
        { beatId: 'school_window', branchId: 'mill_child', projection: true },
        0.8,
      ),
      event(
        world.id,
        11,
        'career_progress',
        [person.id],
        'town-0',
        '沈砚在教师的工作中承担了更多职责。',
        {},
        0.75,
      ),
    ]);
    expect(chapters).toHaveLength(1);
    expect(chapters[0].text).toContain('纱厂');
    expect(chapters[0].text).not.toContain('承担了更多职责');
  });

  it('never turns internal identity and failed-plan bookkeeping into prose', () => {
    const world = createWorld('narrative-internal');
    const person = spawnAdult(world, {
      id: 'person-internal',
      name: 'Alex Reed',
      locationId: 'town-0',
      age: 35,
    });
    person.birth = -420;
    const chapters = compileLifeChapters(world, person, [
      event(
        world.id,
        10,
        'identity_shift',
        [person.id],
        'town-0',
        'Alex Reed因尝试失败后修正判断，更愿意考虑不同观点，并且更愿意接受他人安排。',
        {},
        0.78,
      ),
      event(
        world.id,
        11,
        'agenda_step_failed',
        [person.id],
        'town-0',
        'Alex Reed完成了一次关于「练习教师相关技能」的行动。',
        {},
        0.6,
      ),
    ]);
    const text = chapters.map((chapter) => chapter.text).join('');
    expect(text).not.toContain('修正判断');
    expect(text).not.toContain('接受他人安排');
    expect(text).not.toContain('一次尝试没有成功');
  });

  it('renders caregiving in the correct direction and never invents future decay', () => {
    const world = createWorld('narrative-roles');
    const baby = spawnAdult(world, {
      id: 'person-baby',
      name: '佐藤千代',
      locationId: 'town-0',
      age: 1,
    });
    baby.birth = 0;
    const caregiver = spawnAdult(world, {
      id: 'person-caregiver',
      name: 'Chandrashekhar Agashe',
      locationId: 'town-0',
      age: 40,
    });
    const chapters = compileLifeChapters(world, baby, [
      event(
        world.id,
        10,
        'caregiving',
        [caregiver.id, baby.id],
        'town-0',
        'Chandrashekhar Agashe抽出时间和生活费照顾佐藤千代。',
        { roles: { caregiver: caregiver.id, recipient: baby.id } },
        0.7,
      ),
      event(
        world.id,
        12,
        'life_beat',
        [baby.id],
        'town-0',
        '佐藤千代经历「婴儿肺炎与冬夜」：熬过肺炎，但肺弱与咳嗽伴随多年。身体受到了长久的影响。',
        { beatTitle: '婴儿肺炎与冬夜' },
        0.8,
      ),
    ]);
    const text = chapters.map((chapter) => chapter.text).join('');
    expect(text).toContain('Chandrashekhar Agashe开始照料佐藤千代');
    expect(text).not.toContain('佐藤千代开始照料Chandrashekhar');
    expect(text).not.toContain('伴随多年');
    expect(text).not.toContain('长久的影响');
  });
});
