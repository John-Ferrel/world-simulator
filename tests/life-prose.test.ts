import { describe, expect, it } from 'vitest';
import { createWorld } from '../packages/world-packs/index.js';
import { composeLifeProse } from '../packages/narratives/prose.js';
import type { HistoricalEvent, Person, World } from '../packages/contracts/index.js';
import { spawnAdult } from './helpers/spawn.js';

const BANNED = [
  '承担了更多职责',
  '把一部分时间用在',
  '一次尝试没有成功',
  '修正判断',
  '接受他人安排',
  '练习技能',
];

function event(
  world: World,
  input: {
    month: number;
    kind: string;
    personIds: string[];
    locationId?: string;
    text: string;
    data?: Record<string, unknown>;
    significance?: number;
    id?: string;
  },
): HistoricalEvent {
  return {
    id: input.id ?? `${world.id}:e${input.month}:${input.kind}:${input.personIds[0] ?? 'x'}`,
    worldId: world.id,
    month: input.month,
    kind: input.kind,
    personIds: input.personIds,
    locationId: input.locationId,
    causeIds: [],
    significance: input.significance ?? 0.7,
    text: input.text,
    data: input.data ?? {},
  };
}

function sentenceCount(text: string) {
  return (text.match(/[。！？]/g) ?? []).length;
}

function expectBoundedParagraph(text: string) {
  expect(sentenceCount(text)).toBeGreaterThanOrEqual(2);
  expect(sentenceCount(text)).toBeLessThanOrEqual(5);
  for (const phrase of BANNED) expect(text).not.toContain(phrase);
  expect(text).not.toMatch(/命运|洪流/);
  expect(text).not.toMatch(/(?:健康|压力|信任|好感|财富)\s*[=:：]?\s*\d/);
}

describe('fact-driven life prose', () => {
  it('turns a committed life_beat into a concrete scene with place, age and source', () => {
    const world = createWorld('life-prose-beat');
    world.calendar = { startYear: 1937, mode: 'historical-simulation', sources: [] };
    world.month = 0;
    const settlement = world.settlements[0]!;
    const person = spawnAdult(world, {
      id: 'person-prose-beat',
      name: '沈砚',
      locationId: settlement.id,
      age: 8,
      occupation: '童工',
    });
    person.birth = -96;

    const beat = event(world, {
      month: 10,
      kind: 'life_beat',
      personIds: [person.id],
      locationId: settlement.id,
      text: '沈砚经历「短暂的识字窗口」：家里把他送进纱厂，读书的路径被迫中断。此后以童工为生。',
      data: {
        trajectoryId: 'trajectory-prose',
        beatId: 'school_window',
        beatTitle: '短暂的识字窗口',
        branchId: 'mill_child',
        outcome: 'survive',
        applied: ['education', 'occupation', 'health'],
        skipped: ['wealth'],
        age: 8,
        place: settlement.name,
        tags: ['child_labor', 'education'],
        historicalBasis: '1900–1950 年间，儿童劳动与失学常常同时发生。',
        projection: true,
      },
      significance: 0.82,
    });

    const prose = composeLifeProse({ world, person, events: [beat] });

    expect(prose.text).toContain('1937');
    expect(prose.text).toContain('8岁');
    expect(prose.text).toContain(settlement.name);
    expect(prose.text).toContain('短暂的识字窗口');
    expect(prose.text).toContain('纱厂');
    expect(prose.text).toContain('此后以童工为生');
    expect(prose.sourceEventIds).toContain(beat.id);
    expect(prose.beatId).toBe('school_window');
    expect(prose.branchId).toBe('mill_child');
    expect(prose.title).toContain('短暂的识字窗口');
    expectBoundedParagraph(prose.text);
  });

  it('never promotes identity, career or agenda bookkeeping into the paragraph', () => {
    const world = createWorld('life-prose-internal');
    world.calendar = { startYear: 1937, mode: 'historical-simulation', sources: [] };
    world.month = 0;
    const settlement = world.settlements[0]!;
    const person = spawnAdult(world, {
      id: 'person-prose-internal',
      name: '沈砚',
      locationId: settlement.id,
      age: 35,
      occupation: '教师',
    });
    person.birth = -420;

    const identity = event(world, {
      month: 8,
      kind: 'identity_shift',
      personIds: [person.id],
      locationId: settlement.id,
      text: '沈砚因尝试失败后修正判断，更愿意接受他人安排。',
      data: {
        changes: { autonomy: -0.12, ambition: -0.04 },
        reason: '尝试失败后修正判断',
        classification: 'experience-attributed-identity-change',
      },
      significance: 0.78,
    });
    const agenda = event(world, {
      month: 9,
      kind: 'agenda_step_failed',
      personIds: [person.id],
      locationId: settlement.id,
      text: '沈砚完成了一次关于「练习教师相关技能」的行动。',
      data: { action: 'practice', reason: '实际能力、支持或条件不足' },
      significance: 0.65,
    });
    const career = event(world, {
      month: 10,
      kind: 'career_progress',
      personIds: [person.id],
      locationId: settlement.id,
      text: '沈砚在教师的工作中承担了更多职责。',
      data: { level: 3, experience: 96 },
      significance: 0.75,
    });

    const prose = composeLifeProse({ world, person, events: [identity, agenda, career] });

    expect(prose.text).not.toContain('修正判断');
    expect(prose.text).not.toContain('接受他人安排');
    expect(prose.text).not.toContain('承担了更多职责');
    expect(prose.text).not.toContain('练习教师');
    expect(prose.text).not.toContain('agenda');
    expect(prose.text).toContain('沈砚');
    // The identity event may only survive as a sourced, subdued consequence.
    expect(prose.sourceEventIds).toContain(identity.id);
    expect(prose.sourceEventIds).not.toContain(agenda.id);
    expect(prose.sourceEventIds).not.toContain(career.id);
    expectBoundedParagraph(prose.text);
  });

  it('writes a quiet year from the recorded place, occupation and relationships', () => {
    const world = createWorld('life-prose-quiet');
    world.calendar = { startYear: 1937, mode: 'historical-simulation', sources: [] };
    world.month = 0;
    const settlement = world.settlements[1]!;
    const person = spawnAdult(world, {
      id: 'person-prose-quiet',
      name: '沈砚',
      locationId: settlement.id,
      age: 31,
      occupation: '纱厂工',
    });
    person.birth = -372;
    const partner = spawnAdult(world, {
      id: 'person-prose-partner',
      name: '阿禾',
      locationId: settlement.id,
      age: 30,
    });
    const child = spawnAdult(world, {
      id: 'person-prose-child',
      name: '小满',
      locationId: settlement.id,
      age: 5,
    });
    person.relationships = [
      {
        personId: partner.id,
        trust: 0.8,
        attachment: 0.8,
        kind: 'partner',
        since: 0,
        contacts: 20,
      },
      {
        personId: child.id,
        trust: 0.8,
        attachment: 0.9,
        kind: 'kin',
        since: 0,
        contacts: 20,
      },
    ];

    const quiet = event(world, {
      month: 6,
      kind: 'quiet_life',
      personIds: [person.id],
      locationId: settlement.id,
      text: '沈砚目前以纱厂工工作。日子在劳作与来往中继续。',
      data: { age: 31, occupation: '纱厂工' },
      significance: 0.2,
    });
    const birthday = event(world, {
      month: 0,
      kind: 'birthday',
      personIds: [person.id],
      locationId: settlement.id,
      text: '沈砚迎来了31岁生日。',
      data: { age: 31 },
      significance: 0.2,
    });

    const prose = composeLifeProse({ world, person, events: [birthday, quiet] });

    expect(prose.text).toContain(settlement.name);
    expect(prose.text).toContain('纱厂工');
    expect(prose.text).toContain('阿禾');
    expect(prose.text).toContain('小满');
    expect(prose.text).not.toContain('继续适龄学习');
    expect(prose.sourceEventIds).toContain(quiet.id);
    expectBoundedParagraph(prose.text);
  });

  it('does not invent names, money or a death when a death branch was only a hazard', () => {
    const world = createWorld('life-prose-no-invention');
    world.calendar = { startYear: 1937, mode: 'historical-simulation', sources: [] };
    world.month = 0;
    const settlement = world.settlements[0]!;
    const person = spawnAdult(world, {
      id: 'person-prose-hazard',
      name: '沈砚',
      locationId: settlement.id,
      age: 1,
    });
    person.birth = -12;

    const hazard = event(world, {
      month: 2,
      kind: 'life_beat',
      personIds: [person.id],
      locationId: settlement.id,
      text: '沈砚经历「先天虚弱与婴儿病」：在第一个冬天夭折。身体受到了长久的影响。',
      data: {
        beatId: 'infant_frailty',
        beatTitle: '先天虚弱与婴儿病',
        branchId: 'dies_in_infancy',
        outcome: 'death',
        applied: ['health', 'deathRisk'],
        skipped: ['education'],
        age: 1,
        place: settlement.name,
        tags: ['health', 'early_death'],
        projection: true,
      },
      significance: 0.9,
    });

    const prose = composeLifeProse({ world, person, events: [hazard] });

    expect(prose.text).not.toContain('夭折');
    expect(prose.text).not.toContain('去世');
    expect(prose.text).not.toContain('死亡');
    expect(prose.text).not.toContain('死因');
    expect(prose.text).not.toMatch(/[0-9]+(?:\.[0-9]+)?\s*(?:元|块|银元|美元|法郎)/);
    for (const other of world.persons) {
      if (other.id === person.id || !other.name) continue;
      expect(prose.text).not.toContain(other.name);
    }
    expect(prose.sourceEventIds).toContain(hazard.id);
    expectBoundedParagraph(prose.text);
  });

  it('is deterministic and supports both call styles without mutating input', () => {
    const world = createWorld('life-prose-stable');
    world.calendar = { startYear: 1937, mode: 'historical-simulation', sources: [] };
    world.month = 0;
    const origin = world.settlements[0]!;
    const target = world.settlements[1]!;
    const person = spawnAdult(world, {
      id: 'person-prose-stable',
      name: '沈砚',
      locationId: origin.id,
      age: 30,
      occupation: '织工',
    });
    person.birth = -360;
    const partner = spawnAdult(world, {
      id: 'person-prose-stable-partner',
      name: '阿禾',
      locationId: target.id,
      age: 28,
    });
    const events = [
      event(world, {
        month: 2,
        kind: 'scarcity',
        personIds: [person.id],
        locationId: origin.id,
        text: '苇湾的粮食不足正在影响当地生计。',
        data: { scarcity: 0.55 },
        significance: 0.7,
      }),
      event(world, {
        month: 6,
        kind: 'migration',
        personIds: [person.id],
        locationId: target.id,
        text: '沈砚离开苇湾，在雾湾重新落脚。',
        data: { from: origin.id, to: target.id },
        significance: 0.8,
      }),
      event(world, {
        month: 9,
        kind: 'partnership',
        personIds: [person.id, partner.id],
        locationId: target.id,
        text: '沈砚与阿禾决定共同生活。',
        data: {},
        significance: 0.9,
      }),
    ];
    const before = JSON.stringify({ world, person, events });

    const objectStyle = composeLifeProse({ world, person, events });
    const positionalStyle = composeLifeProse(world, person, events);
    const again = composeLifeProse({ world, person, events });

    expect(objectStyle).toEqual(again);
    expect(positionalStyle).toEqual(objectStyle);
    expect(JSON.stringify({ world, person, events })).toBe(before);
    expect(objectStyle.sourceEventIds.length).toBeGreaterThanOrEqual(2);
    expectBoundedParagraph(objectStyle.text);
  });

  it('does not project a current occupation backwards into a past quiet year', () => {
    const world = createWorld('life-prose-no-future');
    world.calendar = { startYear: 1937, mode: 'historical-simulation', sources: [] };
    world.month = 240;
    const settlement = world.settlements[0]!;
    const person = spawnAdult(world, {
      id: 'person-prose-future',
      name: '沈砚',
      locationId: settlement.id,
      age: 40,
      occupation: '工程师',
    });
    person.birth = -360;
    const birthday = event(world, {
      month: 120,
      kind: 'birthday',
      personIds: [person.id],
      locationId: settlement.id,
      text: '沈砚迎来了40岁生日。',
      data: { age: 40 },
      significance: 0.2,
    });

    const prose = composeLifeProse({ world, person, events: [birthday] });

    expect(prose.text).not.toContain('工程师');
    expect(prose.text).toContain('1947');
    expectBoundedParagraph(prose.text);
  });
});
