import { describe, expect, it } from 'vitest';
import { advanceV4Year } from '../packages/v4/engine.js';
import {
  advanceHistoricalProcesses,
  ensureHistoricalProcess,
  recordReformLegacy,
} from '../packages/v4/history.js';
import { eventPoolMultiplier, type WorldDevelopment } from '../packages/v4/macro.js';
import { VIENNA_1912_SEED, VIENNA_1912_SCENES } from '../packages/v4/content/vienna-1912.js';
import { VIENNA_LIFE_SCENES } from '../packages/v4/content/vienna-life.js';
import { VIENNA_HISTORY_SCENES } from '../packages/v4/content/vienna-history.js';
import { VIENNA_FAMILY_RUNTIME_SCENES } from '../packages/v4/content/vienna-family.js';
import { GENERATED_SCENES } from '../packages/v4/content/generated/index.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import type { WorldState } from '../packages/v4/domain.js';

const PROCESS_ID = 'development:test-legacy';

function fixture(overrides: Partial<WorldDevelopment> = {}): {
  world: WorldState;
  development: WorldDevelopment;
} {
  const world = applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
  const development: WorldDevelopment = {
    id: PROCESS_ID,
    type: 'social_change',
    regionId: 'region-lower-austria',
    description: '印刷工人争取工时与互助制度的持续运动',
    severity: 0.7,
    start: { year: 1912, month: 1 },
    end: { year: 1913, month: 1 },
    status: 'active',
    eventFamilyIds: ['vienna-history-social-democracy'],
    organizationId: 'org-printers-union',
    source: 'test',
    ...overrides,
  };
  development.historical = ensureHistoricalProcess(development, world.date);
  development.historical.phase = 'mobilizing';
  development.historical.phaseStarted = { ...world.date };
  development.historical.participants = {
    'person-alois-lechner': {
      roles: ['organizer'],
      influence: 0.1,
      firstEventId: 'seed:test',
      lastEventId: 'seed:test',
      joinedAt: { ...world.date },
    },
  };
  development.historical.lastActivity = { ...world.date };
  development.historical.metrics = {
    support: 0.2,
    opposition: 0.1,
    resources: 0.3,
    legitimacy: 0.3,
    escalation: 0.05,
    information: 0.2,
  };
  world.macro!.developments![PROCESS_ID] = development;
  return { world, development };
}

describe('historical legacy and process lifecycle', () => {
  it('does not end an active process merely because its expected end date passed', () => {
    const { world } = fixture({ end: { year: 1912, month: 2 } });
    const result = advanceHistoricalProcesses(world, world.macro!, { year: 1919, month: 1 });
    const process = result.state.developments![PROCESS_ID]!.historical!;
    expect(process.phase).not.toBe('ended');
    expect(result.state.developments![PROCESS_ID]!.status).not.toBe('ended');
  });

  it('creates a durable reform legacy, changes structural parameters and future event weights', () => {
    const { world } = fixture();
    const before = world.macro!.regions['region-lower-austria']!.baselineParameters!;
    const process = world.macro!.developments![PROCESS_ID]!.historical!;
    process.phase = 'institutionalizing';
    process.metrics = {
      support: 0.7,
      opposition: 0.1,
      resources: 0.5,
      legitimacy: 0.6,
      escalation: 0.1,
      information: 0.4,
    };
    const result = advanceHistoricalProcesses(world, world.macro!, { year: 1915, month: 1 });
    const legacy = Object.values(result.state.legacy ?? {}).find(
      (entry) => entry.processId === PROCESS_ID && entry.kind === 'reform',
    );
    expect(legacy).toBeDefined();
    expect(legacy!.status).toBe('active');
    const after = result.state.regions['region-lower-austria']!.baselineParameters!;
    expect(after.foodSupply).toBeGreaterThan(before.foodSupply);
    const multiplier = eventPoolMultiplier(
      result.state,
      {
        id: 'vienna-history-social-democracy',
        familyId: 'vienna-history-social-democracy',
        stage: 'adulthood',
        tags: ['history'],
      },
      'region-lower-austria',
    );
    expect(multiplier).toBeGreaterThan(1);
    // The legacy survives the process itself: it is not the phase string.
    result.state.developments![PROCESS_ID]!.status = 'ended';
    result.state.developments![PROCESS_ID]!.historical!.phase = 'ended';
    const laterMultiplier = eventPoolMultiplier(
      result.state,
      {
        id: 'vienna-history-social-democracy',
        familyId: 'vienna-history-social-democracy',
        stage: 'adulthood',
        tags: ['history'],
      },
      'region-lower-austria',
    );
    expect(laterMultiplier).toBeGreaterThan(1);
  });

  it('lets a reform action create the same durable legacy through the engine-facing helper', () => {
    const { world } = fixture();
    const legacy = recordReformLegacy(world.macro!, PROCESS_ID, { year: 1914, month: 6 });
    expect(legacy?.kind).toBe('reform');
    expect(world.macro!.legacy?.[legacy!.id]).toBeDefined();
  });

  it('eventually suspends and ends a process with no people, organization or activity', () => {
    const { world, development } = fixture();
    development.organizationId = undefined;
    development.historical!.participants = {};
    development.historical!.lastActivity = { year: 1912, month: 1 };
    let state = world.macro!;
    for (let year = 1913; year <= 1920; year += 1) {
      state = advanceHistoricalProcesses(world, state, { year, month: 1 }).state;
    }
    expect(['suspended', 'ended']).toContain(state.developments![PROCESS_ID]!.historical!.phase);
    expect(
      state.developments![PROCESS_ID]!.status === 'ended' ||
        state.developments![PROCESS_ID]!.historical!.phase === 'suspended',
    ).toBe(true);
  });

  it('can split a process into a real child process when opponents actually exist', () => {
    const { world, development } = fixture();
    development.historical!.phase = 'confrontation';
    development.historical!.metrics = {
      support: 0.4,
      opposition: 0.66,
      resources: 0.3,
      legitimacy: 0.32,
      escalation: 0.5,
      information: 0.3,
    };
    development.historical!.participants = {
      'person-alois-lechner': {
        roles: ['organizer'],
        influence: 0.05,
        firstEventId: 'seed:alois',
        lastEventId: 'seed:alois',
        joinedAt: { year: 1912, month: 1 },
      },
      'person-josef-bauer': {
        roles: ['supporter'],
        influence: 0.05,
        firstEventId: 'seed:josef',
        lastEventId: 'seed:josef',
        joinedAt: { year: 1912, month: 1 },
      },
      'person-berta-weiss': {
        roles: ['opponent'],
        influence: 0.05,
        firstEventId: 'seed:berta',
        lastEventId: 'seed:berta',
        joinedAt: { year: 1912, month: 1 },
      },
      'person-luise-kral': {
        roles: ['opponent'],
        influence: 0.05,
        firstEventId: 'seed:luise',
        lastEventId: 'seed:luise',
        joinedAt: { year: 1912, month: 1 },
      },
    };
    let state = world.macro!;
    let splitId: string | undefined;
    for (let year = 1912; year <= 1940 && !splitId; year += 1) {
      state = advanceHistoricalProcesses(world, state, { year, month: 1 }).state;
      splitId = Object.keys(state.developments ?? {}).find((id) =>
        id.startsWith(`${PROCESS_ID}:split:`),
      );
    }
    expect(splitId).toBeDefined();
    const child = state.developments![splitId!]!;
    expect(child.historical).toBeDefined();
    expect(child.organizationId).toBe('org-printers-union');
    expect(Object.keys(child.historical!.participants).length).toBeGreaterThanOrEqual(2);
    expect(
      Object.values(state.legacy ?? {}).some((legacy) => legacy.kind === 'organization_split'),
    ).toBe(true);
  });

  it('makes a durable reform change the actual life events of later people', () => {
    let current = applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
    recordReformLegacy(
      current.macro!,
      'development:seed-vienna-social-democracy-1912',
      current.date,
    );
    const scenes = [
      ...VIENNA_1912_SCENES,
      ...VIENNA_LIFE_SCENES,
      ...VIENNA_HISTORY_SCENES,
      ...VIENNA_FAMILY_RUNTIME_SCENES,
      ...GENERATED_SCENES,
    ];
    const lifeEvents: WorldState['events'] = [];
    for (let year = 0; year < 10; year += 1) {
      const result = advanceV4Year(current, scenes, {
        economy: { enabled: true },
        eventRuntime: true,
        agency: true,
        maxOrdinaryEventsPerPerson: 4,
      });
      current = result.world;
      lifeEvents.push(...result.events);
    }
    expect(
      lifeEvents.filter((event) => event.action.startsWith('vienna-legacy-worklife')).length,
    ).toBeGreaterThan(0);
    expect(
      Object.values(current.macro!.legacy ?? {}).some(
        (legacy) => legacy.kind === 'reform' && legacy.status === 'active',
      ),
    ).toBe(true);
  });
});
