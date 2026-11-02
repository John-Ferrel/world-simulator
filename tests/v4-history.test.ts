import { describe, expect, it } from 'vitest';
import { advanceV4Year } from '../packages/v4/engine.js';
import { ensureHistoricalProcess } from '../packages/v4/history.js';
import { defaultMacroState, type WorldDevelopment } from '../packages/v4/macro.js';
import type { SceneDefinition, WorldState } from '../packages/v4/domain.js';
import { VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';

const PROCESS_ID = 'development:test-history';

function historicalWorld(): WorldState {
  const world = structuredClone(VIENNA_1912_SEED);
  world.macro = defaultMacroState(world);
  const development: WorldDevelopment = {
    id: PROCESS_ID,
    type: 'social_change',
    regionId: 'region-lower-austria',
    description: '维也纳工人争取集会与救济的历史进程',
    severity: 0.65,
    start: { year: 1912, month: 1 },
    end: { year: 1920, month: 1 },
    status: 'active',
    eventFamilyIds: ['test-history'],
    organizationId: 'org-printers-union',
    source: 'test',
  };
  development.historical = ensureHistoricalProcess(development, world.date);
  development.historical.metrics = {
    support: 0.42,
    opposition: 0.15,
    resources: 0.3,
    legitimacy: 0.3,
    escalation: 0.05,
    information: 0.1,
  };
  world.macro!.developments = { [PROCESS_ID]: development };
  const freud = structuredClone(world.persons['person-grete-stein']!);
  freud.id = 'person-sigmund-freud-test';
  freud.name = 'Sigmund Freud';
  freud.sex = 'male';
  freud.born = { year: 1856, month: 5 };
  freud.locationId = 'place-wien-markthalle';
  freud.householdId = 'hh-bauer';
  freud.parentIds = [];
  freud.guardianIds = [];
  freud.roles = ['physician', 'historical_person'];
  freud.historicalIdentity = {
    id: 'Q9215',
    sourceIds: ['source-freud-museum'],
    birthPrecision: 'day',
    occupation: '精神分析学家',
    publicRole: '精神分析创始人',
    activityRegionIds: ['region-lower-austria'],
    activeFrom: { year: 1900, month: 1 },
    activeTo: { year: 1938, month: 3 },
    realWorldDeath: { year: 1939, month: 9, day: 23 },
    biographyIsNotFate: true,
    notes: '测试夹具，历史死亡日期只作参考。',
  };
  world.persons[freud.id] = freud;
  world.households['hh-bauer']!.memberIds.push(freud.id);
  return world;
}

function scene(overrides: Partial<SceneDefinition> & Pick<SceneDefinition, 'id'>): SceneDefinition {
  return {
    version: 1,
    packId: 'test-history',
    title: '历史测试场景',
    stage: 'adulthood',
    placeId: 'place-wien-markthalle',
    ageWindow: { min: 18, max: 80 },
    subjectIds: ['person-grete-stein'],
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 18, maxAge: 80 },
      {
        key: 'historical',
        kind: 'historical',
        required: true,
        historicalId: 'Q9215',
        minAge: 20,
        maxAge: 80,
      },
    ],
    conditions: [{ kind: 'historicalProcess', id: PROCESS_ID }],
    rate: 1,
    outcomes: [
      {
        id: 'meet',
        weight: 1,
        immediateText: '{subject}在公开活动中与{historical}发生了一次有记录的联系。',
        effects: [
          {
            type: 'historical_participation',
            processId: PROCESS_ID,
            personId: '$subject',
            role: 'supporter',
            influence: 0.08,
            reason: 'attended and supported the process',
          },
          {
            type: 'relation',
            a: '$subject',
            b: '$historical',
            kind: 'acquaintance',
            trust: 0.1,
            reason: 'met through a historical process',
          },
          {
            type: 'knowledge',
            holderId: '$subject',
            proposition: '我在公开活动中见过一位真实历史人物。',
            confidence: 0.85,
            sourceKind: 'witnessed',
            personId: '$historical',
            visibility: 'private',
            trueInWorld: true,
          },
        ],
      },
    ],
    tags: ['history', 'test'],
    ...overrides,
  };
}

describe('Phase 6 historical processes', () => {
  it('records participation, contact, knowledge and a concrete venue', () => {
    const world = historicalWorld();
    const result = advanceV4Year(world, [scene({ id: 'test:history-contact' })], {
      eventRuntime: false,
      statisticalModel: false,
      economy: { enabled: false },
      maxScenesPerPerson: 1,
    });
    const event = result.events.find((item) => item.action === 'test:history-contact/meet');
    expect(event).toBeDefined();
    expect(event!.placeId).toBe('place-wien-markthalle');
    const process = result.world.macro!.developments![PROCESS_ID]!.historical!;
    expect(process.participants['person-grete-stein']).toBeDefined();
    expect(process.participants['person-grete-stein']!.roles).toContain('supporter');
    expect(process.metrics.support).toBeGreaterThan(0.42);
    expect(
      Object.values(result.world.relations).some(
        (relation) =>
          relation.kind === 'acquaintance' &&
          ((relation.a === 'person-grete-stein' && relation.b === 'person-sigmund-freud-test') ||
            (relation.b === 'person-grete-stein' && relation.a === 'person-sigmund-freud-test')),
      ),
    ).toBe(true);
    expect(
      Object.values(result.world.knowledge).some((k) => k.holderId === 'person-grete-stein'),
    ).toBe(true);
  });

  it('lets a committed influence action change the process phase', () => {
    const world = historicalWorld();
    world.macro!.developments![PROCESS_ID]!.historical!.metrics = {
      support: 0.5,
      opposition: 0.1,
      resources: 0.3,
      legitimacy: 0.5,
      escalation: 0.1,
      information: 0.2,
    };
    const influence = scene({
      id: 'test:history-influence',
      conditions: [{ kind: 'historicalProcess', id: PROCESS_ID }],
      outcomes: [
        {
          id: 'push',
          weight: 1,
          immediateText: '{subject}把街区名单交给组织者，推动了这场运动。',
          effects: [
            {
              type: 'historical_participation',
              processId: PROCESS_ID,
              personId: '$subject',
              role: 'organizer',
              influence: 0.2,
              reason: 'organized the district',
            },
            {
              type: 'historical_influence',
              processId: PROCESS_ID,
              personId: '$subject',
              dimension: 'support',
              amount: 0.12,
              reason: 'delivered a district list',
            },
          ],
        },
      ],
    });
    const after = advanceV4Year(world, [influence], {
      eventRuntime: false,
      statisticalModel: false,
      economy: { enabled: false },
      maxScenesPerPerson: 1,
    });
    const process = after.world.macro!.developments![PROCESS_ID]!.historical!;
    expect(process.participants['person-grete-stein']!.roles).toContain('organizer');
    expect(process.phase).toBe('institutionalizing');
    expect(process.outcome).toBe('institutionalized_or_reform');
    expect(after.events.some((event) => event.action === 'historical_phase')).toBe(true);
  });

  it('does not make contact when the historical person is dead', () => {
    const world = historicalWorld();
    world.persons['person-sigmund-freud-test']!.died = { year: 1912, month: 1 };
    world.persons['person-sigmund-freud-test']!.health.vitality = 0;
    const result = advanceV4Year(world, [scene({ id: 'test:dead-contact' })], {
      eventRuntime: false,
      statisticalModel: false,
      economy: { enabled: false },
      maxScenesPerPerson: 1,
    });
    expect(result.events.some((event) => event.action === 'test:dead-contact/meet')).toBe(false);
  });

  it('creates a bottom-up process only from an existing organization', () => {
    const world = historicalWorld();
    const create = scene({
      id: 'test:create-process',
      conditions: [],
      outcomes: [
        {
          id: 'create',
          weight: 1,
          immediateText: '{subject}和工会建立了新的邻里互助组织。',
          effects: [
            {
              type: 'historical_process',
              process: {
                id: 'development:event-created-history',
                kind: 'social_movement',
                title: '街区互助会',
                description: '由真实工会成员与邻里建立的互助组织。',
                regionId: 'region-lower-austria',
                organizationId: 'org-printers-union',
                eventFamilyIds: ['test-history'],
                objectives: ['给失业家庭送煤和面包'],
                sourceIds: ['source-test'],
              },
            },
          ],
        },
      ],
    });
    const result = advanceV4Year(world, [create], {
      eventRuntime: false,
      statisticalModel: false,
      economy: { enabled: false },
      maxScenesPerPerson: 1,
    });
    const created = result.world.macro!.developments!['development:event-created-history'];
    expect(created?.historical?.source).toBe('event');
    expect(created?.historical?.participants).toEqual({});
    expect(created?.organizationId).toBe('org-printers-union');
  });

  it('has a deterministic counterfactual difference with and without an influence action', () => {
    const control = historicalWorld();
    control.macro!.developments![PROCESS_ID]!.historical!.metrics = {
      support: 0.4,
      opposition: 0.1,
      resources: 0.3,
      legitimacy: 0.5,
      escalation: 0.1,
      information: 0.2,
    };
    const treatment = structuredClone(control);
    const action = scene({
      id: 'test:counterfactual',
      conditions: [{ kind: 'historicalProcess', id: PROCESS_ID }],
      outcomes: [
        {
          id: 'support',
          weight: 1,
          immediateText: '{subject}公开支持这场运动。',
          effects: [
            {
              type: 'historical_influence',
              processId: PROCESS_ID,
              personId: '$subject',
              dimension: 'support',
              amount: 0.2,
              reason: 'public support',
            },
          ],
        },
      ],
    });
    const a = advanceV4Year(control, [], {
      eventRuntime: false,
      statisticalModel: false,
      economy: { enabled: false },
    });
    const b = advanceV4Year(treatment, [action], {
      eventRuntime: false,
      statisticalModel: false,
      economy: { enabled: false },
      maxScenesPerPerson: 1,
    });
    expect(a.world.macro!.developments![PROCESS_ID]!.historical!.phase).not.toBe(
      b.world.macro!.developments![PROCESS_ID]!.historical!.phase,
    );
  });
});
