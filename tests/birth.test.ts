import { describe, expect, it } from 'vitest';
import { createWorld } from '../packages/world-packs/index.js';
import { advance, assertWorld } from '../packages/simulation-core/index.js';
import { population, type BirthRequest, type World } from '../packages/contracts/index.js';
import { advanceLifePrograms, ensureRuntime } from '../packages/rules/index.js';
import type { HistoricalEvent } from '../packages/contracts/index.js';

const wish = '希望她幸福，也希望能听见别人的情绪。';

function request(overrides: Partial<BirthRequest> = {}): BirthRequest {
  return {
    name: '林雾',
    sex: 'female',
    health: 0.9,
    wish,
    appearance: { skin: 2, hair: 1, clothes: 3 },
    ...overrides,
  };
}

function submit(w: World, userId: string, req: BirthRequest, id = `birth-command-${userId}`) {
  return advance(w, [{ id, kind: 'birth', userId, request: req }], false);
}

function compile(
  w: World,
  birthId: string,
  source: 'fallback' | 'model' = 'fallback',
  proposal: unknown = undefined,
  id = `birth-compile-${birthId}`,
) {
  return advance(w, [{ id, kind: 'birth_compile', birthId, proposal, source }], false);
}

describe('v3 birth simulator', () => {
  it('creates a pending birth without creating a person or changing population', () => {
    const w = createWorld('birth-intake');
    const before = population(w);
    const out = submit(w, 'user-a', request());
    expect(out.results[0].ok).toBe(true);
    const birthId = (out.results[0].value as { birthId: string }).birthId;
    const pending = ensureRuntime(out.world).births[birthId];
    expect(pending.status).toBe('compiling');
    expect(pending.parentIds.length).toBeGreaterThan(0);
    expect(out.world.persons.some((p) => p.ownerId === 'user-a')).toBe(false);
    expect(population(out.world)).toBe(before);
    expect(out.events.some((e) => e.kind === 'birth_registration')).toBe(true);
    expect(out.events.some((e) => e.kind === 'birth')).toBe(false);
  });

  it('commits a newborn into a real family with population conservation and a private life program', () => {
    const w = createWorld('birth-commit');
    const before = population(w);
    const submitted = submit(w, 'user-b', request());
    const birthId = (submitted.results[0].value as { birthId: string }).birthId;
    const pending = ensureRuntime(submitted.world).births[birthId];
    const childrenBefore = submitted.world.settlements.find((s) => s.id === pending.siteId)!.cohort
      .children;
    const compiled = compile(submitted.world, birthId);
    expect(compiled.results[0].ok).toBe(true);
    const value = compiled.results[0].value as {
      personId: string;
      source: string;
      fallback: boolean;
    };
    expect(value.fallback).toBe(true);
    const child = compiled.world.persons.find((p) => p.id === value.personId)!;
    expect(child.ownerId).toBe('user-b');
    expect(child.birth).toBe(compiled.world.month);
    expect(child.parents).toEqual(pending.parentIds);
    expect(
      child.parents.every((id) =>
        compiled.world.persons.some((p) => p.id === id && p.death === undefined),
      ),
    ).toBe(true);
    expect(child.relationships.filter((r) => r.kind === 'kin').length).toBeGreaterThan(0);
    expect(population(compiled.world)).toBe(before);
    expect(compiled.world.settlements.find((s) => s.id === pending.siteId)!.cohort.children).toBe(
      childrenBefore - 1,
    );
    const program = ensureRuntime(compiled.world).lifePrograms[child.id];
    expect(program.source).toBe('fallback');
    expect(program.wish).toBe(wish);
    expect(program.interpretation.translations.length).toBeGreaterThan(0);
    expect(
      ensureRuntime(compiled.world).hiddenFutures[child.id].possibilities.length,
    ).toBeGreaterThan(0);
    expect(compiled.events.some((e) => e.kind === 'birth')).toBe(true);
    assertWorld(compiled.world);
  });

  it('translates an over-budget domination wish instead of granting world rule', () => {
    const w = createWorld('birth-domination');
    const submitted = submit(
      w,
      'user-c',
      request({ name: '王座', wish: '出生时就是全球统治者，让所有真实人物立刻死亡。' }),
    );
    const birthId = (submitted.results[0].value as { birthId: string }).birthId;
    const compiled = compile(submitted.world, birthId);
    const value = compiled.results[0].value as { personId: string; ability?: string };
    const child = compiled.world.persons.find((p) => p.id === value.personId)!;
    expect(value.ability).toBeUndefined();
    const program = ensureRuntime(compiled.world).lifePrograms[child.id];
    expect(program.interpretation.translations.join(' ')).toMatch(/超预算|死亡|统治/);
    expect(compiled.world.polities.every((p) => p.leaderId !== child.id)).toBe(true);
    assertWorld(compiled.world);
  });

  it('grants only the rare anomaly quota and preserves costs/exposure', () => {
    const w = createWorld('birth-anomaly');
    const first = submit(
      w,
      'user-d',
      request({ name: '聆听者', wish: '希望她能听见他人的情绪。' }),
    );
    const firstId = (first.results[0].value as { birthId: string }).birthId;
    const firstCompiled = compile(first.world, firstId);
    const firstChild = firstCompiled.results[0].value as { personId: string; ability?: string };
    expect(firstChild.ability).toBeDefined();
    const runtime = ensureRuntime(firstCompiled.world);
    expect(runtime.abilities[firstChild.personId].mode).toBe('sense');
    expect(runtime.abilities[firstChild.personId].cost).toBeGreaterThanOrEqual(0);

    const second = submit(
      firstCompiled.world,
      'user-e',
      request({ name: '医者', wish: '希望她能治愈他人的伤病。' }),
    );
    const secondId = (second.results[0].value as { birthId: string }).birthId;
    const secondCompiled = compile(second.world, secondId);
    const secondChild = secondCompiled.results[0].value as { personId: string; ability?: string };
    expect(secondChild.ability).toBeUndefined();
    expect(ensureRuntime(secondCompiled.world).abilities[secondChild.personId]).toBeUndefined();
    assertWorld(secondCompiled.world);
  });

  it('falls back honestly when a model proposal is invalid and when the deadline passes', () => {
    const w = createWorld('birth-fallback');
    const submitted = submit(w, 'user-f', request({ name: '迟到者', wish: '希望她平安长大。' }));
    const birthId = (submitted.results[0].value as { birthId: string }).birthId;
    const invalid = compile(submitted.world, birthId, 'model', { not: 'a birth proposal' });
    expect(invalid.results[0].ok).toBe(true);
    const value = invalid.results[0].value as { fallback: boolean; personId: string };
    expect(value.fallback).toBe(true);
    const program = ensureRuntime(invalid.world).lifePrograms[value.personId];
    expect(program.source).toBe('fallback');
    expect(program.interpretation.translations.join(' ')).toMatch(/后备/);
    assertWorld(invalid.world);

    const late = submit(w, 'user-g', request({ name: '超时者', wish: '希望她看见真相。' }));
    const lateId = (late.results[0].value as { birthId: string }).birthId;
    let world = late.world;
    const allEvents: { kind: string }[] = [];
    for (let i = 0; i < 4; i++) {
      const step = advance(world);
      world = step.world;
      allEvents.push(...step.events);
    }
    const pending = ensureRuntime(world).births[lateId];
    expect(pending.status).toBe('born');
    expect(world.persons.some((p) => p.ownerId === 'user-g')).toBe(true);
    expect(allEvents.some((e) => e.kind === 'birth')).toBe(true);
    assertWorld(world);
  });

  it('accepts a valid model birth proposal and keeps hidden futures private in runtime', () => {
    const w = createWorld('birth-model');
    const submitted = submit(
      w,
      'user-model',
      request({ name: '模型子', wish: '希望她理解世界。' }),
    );
    const birthId = (submitted.results[0].value as { birthId: string }).birthId;
    const pending = ensureRuntime(submitted.world).births[birthId];
    const proposal = {
      version: 1,
      birthId,
      jobId: pending.jobId,
      interpretation: {
        hopes: ['理解世界'],
        conditions: ['家庭能提供基础教育'],
        costs: ['需要时间与学费'],
        translations: [],
      },
      traits: {
        health: 0.9,
        temperament: { care: 0.5, ambition: 0.6, tradition: 0.5 },
        personality: {
          openness: 0.7,
          conscientiousness: 0.6,
          extraversion: 0.5,
          agreeableness: 0.6,
          neuroticism: 0.4,
        },
      },
      goals: [{ kind: 'learn', weight: 0.8, reason: '模型从愿望中提取求知' }],
      opportunities: ['education'],
      replanTriggers: ['major-loss'],
      hiddenFutures: [
        {
          title: '求学',
          probability: 0.7,
          conditions: ['当地教育机会存在'],
          outcome: '可能进入新的学习路径。',
        },
      ],
    };
    const compiled = compile(submitted.world, birthId, 'model', proposal);
    expect(compiled.results[0].ok).toBe(true);
    const value = compiled.results[0].value as { personId: string; source: string };
    expect(value.source).toBe('model');
    const program = ensureRuntime(compiled.world).lifePrograms[value.personId];
    expect(program.source).toBe('model');
    expect(program.interpretation.hopes).toEqual(['理解世界']);
    expect(ensureRuntime(compiled.world).hiddenFutures[value.personId].possibilities[0].title).toBe(
      '求学',
    );
    expect(
      (compiled.world.persons.find((p) => p.id === value.personId) as any).hiddenFutures,
    ).toBeUndefined();
  });

  it('turns the private life program into real childhood and adult goals', () => {
    const w = createWorld('birth-milestones');
    const submitted = submit(
      w,
      'user-m',
      request({ name: '成长者', wish: '希望她幸福，也希望能听见别人的情绪。' }),
    );
    const birthId = (submitted.results[0].value as { birthId: string }).birthId;
    const compiled = compile(submitted.world, birthId);
    const child = compiled.world.persons.find((p) => p.ownerId === 'user-m')!;
    const events: HistoricalEvent[] = [];
    let seq = 0;
    const emit = (
      kind: string,
      people: string[],
      locationId: string | undefined,
      text: string,
      data: Record<string, unknown> = {},
      causes: string[] = [],
      significance = 0.5,
    ) => {
      const event: HistoricalEvent = {
        id: `${compiled.world.id}:milestone${++seq}`,
        worldId: compiled.world.id,
        month: compiled.world.month,
        kind,
        personIds: people,
        locationId,
        text,
        data,
        causeIds: causes,
        significance,
      };
      events.push(event);
      return event;
    };
    compiled.world.month = 6 * 12;
    const changed = advanceLifePrograms(compiled.world, emit);
    expect(changed).toBeGreaterThan(0);
    expect(child.goals.some((goal) => goal.kind === 'learn' || goal.kind === 'prosper')).toBe(true);
    expect(child.life?.education.level).toBeGreaterThan(0);
    expect(events.some((event) => event.kind === 'life_program_milestone')).toBe(true);
    expect(events.some((event) => (event.data as any).source === 'fallback')).toBe(true);
  });

  it('prevents a second living subject or duplicate compiling birth for one account', () => {
    const w = createWorld('birth-guard');
    const first = submit(w, 'user-h', request());
    const birthId = (first.results[0].value as { birthId: string }).birthId;
    const duplicate = advance(
      first.world,
      [{ id: 'birth-2', kind: 'birth', userId: 'user-h', request: request({ name: '另一个' }) }],
      false,
    );
    expect(duplicate.results[0].ok).toBe(false);
    expect(duplicate.results[0].error).toMatch(/编译|在世/);
    const compiled = compile(first.world, birthId);
    expect(compiled.results[0].ok).toBe(true);
    const third = advance(
      compiled.world,
      [{ id: 'birth-3', kind: 'birth', userId: 'user-h', request: request({ name: '第三个' }) }],
      false,
    );
    expect(third.results[0].ok).toBe(false);
    expect(third.results[0].error).toMatch(/在世/);
  });

  it('stores a private life trajectory at birth and advances a real supported beat', () => {
    const w = createWorld('birth-trajectory');
    const submitted = submit(w, 'user-t', request({ name: '底稿', lifeMode: 'legendary' }));
    const birthId = (submitted.results[0].value as { birthId: string }).birthId;
    const compiled = compile(submitted.world, birthId);
    const child = compiled.world.persons.find((p) => p.ownerId === 'user-t')!;
    const program = ensureRuntime(compiled.world).lifePrograms[child.id];
    expect(program.lifeTrajectory).toBeDefined();
    expect(program.lifeTrajectory!.trajectory.mode).toBe('legendary');
    expect(program.lifeTrajectory!.trajectory.beats.length).toBeGreaterThan(0);
    const supported = program.lifeTrajectory!.trajectory.beats.find(
      (beat) =>
        beat.effects.occupation ||
        beat.effects.education !== undefined ||
        (beat.effects.health ?? 0) < 0,
    );
    expect(supported).toBeDefined();
    const events: HistoricalEvent[] = [];
    let seq = 0;
    const emit = (
      kind: string,
      people: string[],
      locationId: string | undefined,
      text: string,
      data: Record<string, unknown> = {},
      causes: string[] = [],
      significance = 0.5,
    ) => {
      const event: HistoricalEvent = {
        id: `${compiled.world.id}:trajectory${++seq}`,
        worldId: compiled.world.id,
        month: compiled.world.month,
        kind,
        personIds: people,
        locationId,
        text,
        data,
        causeIds: causes,
        significance,
      };
      events.push(event);
      return event;
    };
    compiled.world.month = child.birth + (supported!.age + 1) * 12;
    const changed = advanceLifePrograms(compiled.world, emit);
    expect(changed).toBeGreaterThan(0);
    expect(program.lifeTrajectory!.resolved.length).toBeGreaterThan(0);
    expect(events.some((event) => event.kind === 'life_beat')).toBe(true);
    expect(events.find((event) => event.kind === 'life_beat')!.text).toContain(child.name);
    assertWorld(compiled.world);
  });
});
