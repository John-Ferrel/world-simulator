import { describe, expect, it } from 'vitest';
import { createWorld } from '../packages/world-packs/index.js';
import { advance, assertWorld } from '../packages/simulation-core/index.js';
import type { HistoricalEvent, World } from '../packages/contracts/index.js';
import {
  advanceAbilities,
  advanceRules,
  compileRule,
  definitionKey,
  ensureRuntime,
  grantAbility,
  installDefinition,
  performAbility,
  retireDefinition,
  RuleCompileError,
} from '../packages/rules/index.js';

function emitFor(w: World) {
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
      id: `${w.id}:test${++seq}`,
      worldId: w.id,
      month: w.month,
      kind,
      personIds: [...new Set(people)],
      locationId,
      text,
      data,
      causeIds: [...new Set(causes)],
      significance,
    };
    events.push(event);
    return event;
  };
  return { emit, events };
}

function baseDefinition(overrides: Record<string, unknown> = {}) {
  return {
    schemaVersion: 1,
    id: 'test.shortage-response',
    version: 1,
    kind: 'event',
    title: '地方短缺互助',
    scope: { kind: 'site', ids: ['town-0'] },
    roles: [{ name: 'donor', occupation: '农人', willingness: 0.9 }],
    trigger: { kind: 'periodic', interval: 1 },
    conditions: {
      op: 'compare',
      role: 'donor',
      field: 'coin',
      cmp: 'gte',
      value: 3,
    },
    effects: [{ type: 'transfer', from: 'donor', to: 'site', resource: 'coin', amount: 1 }],
    chance: 1,
    cooldown: 2,
    maxOccurrences: 20,
    significance: 0.6,
    provenance: {
      source: 'builtin',
      model: 'test',
      observedMonth: 0,
      compiler: 'rules/1',
    },
    ...overrides,
  };
}

describe('v3 rule compiler', () => {
  it('rejects unknown scope, duplicate roles and invalid process placement', () => {
    const w = createWorld('rules-compiler');
    expect(() =>
      compileRule(baseDefinition({ scope: { kind: 'site', ids: ['missing-town'] } }), w),
    ).toThrow(RuleCompileError);
    expect(() =>
      compileRule(
        baseDefinition({
          roles: [
            { name: 'donor', occupation: '农人' },
            { name: 'donor', occupation: '织工' },
          ],
        }),
        w,
      ),
    ).toThrow(RuleCompileError);
    expect(() =>
      compileRule(
        baseDefinition({
          process: { months: 3, interval: 1, upkeep: 1, effects: [] },
        }),
        w,
      ),
    ).toThrow(RuleCompileError);
  });

  it('compiles a bounded definition and reports a real dry-run match', () => {
    const w = createWorld('rules-dryrun');
    const compiled = compileRule(baseDefinition(), w);
    expect(compiled.definition.id).toBe('test.shortage-response');
    expect(compiled.dryRun.ok).toBe(true);
    expect(compiled.dryRun.candidates).toBeGreaterThan(0);
  });
});

describe('v3 rule runtime', () => {
  it('initializes an old snapshot without runtime and keeps advancing', () => {
    const w = createWorld('rules-old');
    delete (w as unknown as { runtime?: unknown }).runtime;
    const next = advance(w).world;
    expect(next.runtime).toBeDefined();
    expect(next.runtime?.schemaVersion).toBe(1);
    expect(next.runtime?.definitions).toEqual({});
    assertWorld(next);
  });

  it('matches real roles, transfers real resources and respects cooldown', () => {
    const w = createWorld('rules-transfer');
    const compiled = compileRule(baseDefinition(), w);
    installDefinition(w, compiled.definition, 'activation-1');
    const site = w.settlements.find((s) => s.id === 'town-0')!;
    const townMoney = () =>
      site.coin +
      w.persons
        .filter((p) => p.locationId === 'town-0' && p.death === undefined)
        .reduce((n, p) => n + p.coin, 0);
    const before = townMoney();
    const { emit, events } = emitFor(w);
    const first = advanceRules(w, emit, []);
    expect(first.occurrences).toBe(1);
    const occurrence = events.find((e) => e.kind === 'rule_occurrence')!;
    const donorId = (occurrence.data.roles as Record<string, string>).donor;
    expect(w.persons.find((p) => p.id === donorId)).toBeDefined();
    expect(events.some((e) => e.kind === 'rule_occurrence')).toBe(true);
    expect(townMoney()).toBeCloseTo(before, 8);
    expect((occurrence.data.applied as Array<{ type: string }>)[0].type).toBe('transfer');

    w.month++;
    const second = advanceRules(w, emit, []);
    expect(second.occurrences).toBe(0);
    expect(townMoney()).toBeCloseTo(before, 8);

    w.month++;
    const third = advanceRules(w, emit, []);
    expect(third.occurrences).toBe(1);
    expect(townMoney()).toBeCloseTo(before, 8);
  });

  it('runs a process with upkeep and ends at its declared horizon', () => {
    const w = createWorld('rules-process');
    const definition = baseDefinition({
      id: 'test.learning-circle',
      kind: 'institution',
      title: '地方学习小组',
      effects: [{ type: 'knowledge', site: 'site', field: 'knowledge', amount: 0.01 }],
      process: {
        months: 3,
        interval: 1,
        upkeep: 1,
        payerRole: 'donor',
        effects: [{ type: 'knowledge', site: 'site', field: 'knowledge', amount: 0.01 }],
      },
    });
    const compiled = compileRule(definition, w);
    installDefinition(w, compiled.definition, 'activation-process');
    const { emit, events } = emitFor(w);
    expect(advanceRules(w, emit, []).occurrences).toBe(1);
    const runtime = ensureRuntime(w);
    const process = Object.values(runtime.processes)[0];
    expect(process.status).toBe('active');
    expect(process.due).toBe(w.month + 1);
    w.month++;
    const tick = advanceRules(w, emit, []);
    expect(tick.processes).toBe(1);
    expect(runtime.processes[process.id].ticks).toBe(1);
    w.month++;
    advanceRules(w, emit, []);
    w.month++;
    advanceRules(w, emit, []);
    expect(runtime.processes[process.id].status).toBe('ended');
    expect(events.some((e) => e.kind === 'rule_process_ended')).toBe(true);
  });

  it('grants a bounded ability, charges it, cools it down and records witnesses', () => {
    const w = createWorld('rules-ability');
    const holder = w.persons.find((p) => p.locationId === 'town-0')!;
    const target = w.persons.find((p) => p.locationId === 'town-0' && p.id !== holder.id)!;
    const definition = baseDefinition({
      id: 'test.healing-touch',
      kind: 'ability',
      title: '有限治愈',
      scope: { kind: 'person', ids: [holder.id] },
      roles: [{ name: 'holder', personId: holder.id, willingness: 1 }],
      trigger: { kind: 'periodic', interval: 1 },
      conditions: { op: 'all', args: [] },
      effects: [{ type: 'health', role: 'holder', amount: 0.01 }],
      ability: {
        mode: 'healing',
        potency: 0.2,
        rangeKm: 0,
        cost: 2,
        healthCost: 0.01,
        cooldown: 3,
        maxUses: 4,
        exposureRisk: 1,
        countermeasures: ['隔离', '持续观察'],
      },
    });
    const compiled = compileRule(definition, w);
    installDefinition(w, compiled.definition, 'activation-ability');
    const state = grantAbility(w, holder.id, definitionKey(compiled.definition), 'birth-cause');
    target.health = 0.5;
    const coinBefore = holder.coin;
    const healthBefore = target.health;
    const { emit, events } = emitFor(w);
    const result = performAbility(w, holder, target, 'healing', 0.1, 2, emit, 'cause-ability');
    expect(result.event.kind).toBe('ability_used');
    expect(result.exposed).toBe(true);
    expect(result.exposureId).toBeDefined();
    expect(holder.coin).toBeCloseTo(coinBefore - 2, 8);
    expect(target.health).toBeGreaterThan(healthBefore);
    expect(state.uses).toBe(1);
    expect(Object.keys(ensureRuntime(w).exposures)).toHaveLength(1);
    w.month++;
    advanceRules(w, emit, []);
    expect(events.some((event) => event.kind === 'anomaly_witnessed')).toBe(true);
    expect(events.some((event) => event.kind === 'anomaly_investigation')).toBe(true);
    expect(() => performAbility(w, holder, target, 'healing', 0.1, 2, emit, 'again')).toThrow(
      /investigation/,
    );
    w.month += 8;
    expect(() => performAbility(w, holder, target, 'healing', 0.1, 2, emit, 'again')).not.toThrow();
  });

  it('autonomously uses a granted ability when a real local need appears', () => {
    const w = createWorld('rules-ability-auto');
    const holder = w.persons.find((p) => p.locationId === 'town-0')!;
    const target = w.persons.find((p) => p.locationId === 'town-0' && p.id !== holder.id)!;
    const definition = baseDefinition({
      id: 'test.auto-healing',
      kind: 'ability',
      title: '自动治愈',
      scope: { kind: 'person', ids: [holder.id] },
      roles: [{ name: 'holder', personId: holder.id, willingness: 1 }],
      trigger: { kind: 'periodic', interval: 12 },
      conditions: { op: 'all', args: [] },
      effects: [{ type: 'health', role: 'holder', amount: 0.01 }],
      ability: {
        mode: 'healing',
        potency: 0.2,
        cost: 0,
        healthCost: 0,
        cooldown: 2,
        maxUses: 100,
        exposureRisk: 0,
        countermeasures: [],
      },
    });
    const compiled = compileRule(definition, w);
    installDefinition(w, compiled.definition, 'activation-auto');
    grantAbility(w, holder.id, definitionKey(compiled.definition), 'auto-cause');
    target.health = 0.5;
    const { emit, events } = emitFor(w);
    let used = 0;
    for (let i = 0; i < 200 && !used; i++) {
      w.month++;
      used = advanceAbilities(w, emit);
    }
    expect(used).toBeGreaterThan(0);
    expect(events.some((event) => event.kind === 'ability_used')).toBe(true);
    expect(target.health).toBeGreaterThan(0.5);
  });

  it('keeps definition versions immutable and retires the active version', () => {
    const w = createWorld('rules-version');
    const v1 = compileRule(baseDefinition({ version: 1 }), w).definition;
    const v2 = compileRule(
      baseDefinition({
        version: 2,
        effects: [{ type: 'transfer', from: 'donor', to: 'site', resource: 'coin', amount: 2 }],
      }),
      w,
    ).definition;
    expect(installDefinition(w, v1, 'cause-1').created).toBe(true);
    expect(installDefinition(w, v1, 'cause-1b').created).toBe(false);
    expect(installDefinition(w, v2, 'cause-2').created).toBe(true);
    const runtime = ensureRuntime(w);
    expect(runtime.active['test.shortage-response'].version).toBe(2);
    expect(runtime.definitions['test.shortage-response@1']).toBeDefined();
    expect(runtime.definitions['test.shortage-response@2']).toBeDefined();
    expect(retireDefinition(w, 'test.shortage-response', 'cause-retire', 'test')).toBe(true);
    expect(runtime.active['test.shortage-response']).toBeUndefined();
  });

  it('integrates activation and occurrence into the canonical advance transaction', () => {
    const w = createWorld('rules-integration');
    const first = advance(
      w,
      [
        {
          id: 'rule-command-1',
          kind: 'rule_proposal',
          proposal: baseDefinition({ id: 'test.integrated-event' }),
          source: 'builtin',
        },
      ],
      false,
    );
    expect(first.results[0].ok).toBe(true);
    expect(first.events.some((e) => e.kind === 'rule_definition_activated')).toBe(true);
    expect(first.world.runtime?.active['test.integrated-event']).toBeDefined();
    const second = advance(first.world);
    expect(second.world.runtime).toBeDefined();
    expect(second.events.some((e) => e.kind === 'rule_occurrence')).toBe(true);
    assertWorld(second.world);
  });
});
