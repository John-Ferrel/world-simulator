import { describe, expect, it } from 'vitest';
import { adaptiveContextTotals } from '../packages/v4/composition/adaptive.js';
import type { AdaptiveContext } from '../packages/v4/domain.js';

const contexts: AdaptiveContext[] = [
  {
    id: 'wealthy',
    conditions: [{ kind: 'cash', householdId: 'subject', min: 20 }],
    weightMultiplier: 1.5,
    checkBonus: 3,
  },
  {
    id: 'famous',
    conditions: [{ kind: 'hasState', stateId: 'fame', owner: 'person' }],
    weightMultiplier: 2,
    checkBonus: 4,
  },
  {
    id: 'cursed',
    conditions: [{ kind: 'hasState', stateId: 'cursed-by-wish', owner: 'person' }],
    weightMultiplier: 9,
    checkBonus: 20,
  },
];

describe('Phase 20 adaptive context arithmetic', () => {
  it('is neutral when no optional context matches', () => {
    expect(adaptiveContextTotals(contexts, () => false)).toEqual({
      weightMultiplier: 1,
      checkBonus: 0,
      matchedIds: [],
    });
  });

  it('combines matching weight and check modifiers', () => {
    const result = adaptiveContextTotals(
      contexts,
      (conditions) =>
        conditions.some((condition) => condition.kind === 'cash') ||
        conditions.some(
          (condition) => condition.kind === 'hasState' && condition.stateId === 'fame',
        ),
    );
    expect(result.weightMultiplier).toBe(3);
    expect(result.checkBonus).toBe(7);
    expect(result.matchedIds).toEqual(['wealthy', 'famous']);
  });

  it('clamps pathological authored multipliers and bonuses', () => {
    const result = adaptiveContextTotals(contexts, () => true);
    expect(result.weightMultiplier).toBe(4);
    expect(result.checkBonus).toBe(10);
    expect(result.matchedIds).toContain('cursed');
  });
});

import { createCompositionSource } from '../packages/v4/composition/composer.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import type { PlotKernel } from '../packages/v4/composition/types.js';

describe('Phase 20 adaptive context compilation', () => {
  it('copies optional contexts into the compiled scene', () => {
    const kernel: PlotKernel = {
      id: 'test-adaptive-kernel',
      title: 'A test of optional context',
      domain: 'test',
      kind: 'event',
      stage: 'adulthood',
      ageWindow: { min: 18, max: 80 },
      tags: ['test', 'adaptive'],
      conditions: [{ kind: 'hasState', stateId: 'fame', owner: 'person' }],
      adaptiveContexts: [
        {
          id: 'wealthy',
          conditions: [{ kind: 'cash', householdId: 'subject', min: 20 }],
          weightMultiplier: 1.7,
          checkBonus: 3,
          tags: ['money'],
        },
      ],
      roles: [{ key: 'subject', kind: 'subject', required: true }],
      outcomes: [
        {
          id: 'yes',
          weight: 1,
          text: 'The optional context changes how this ordinary chance is read.',
          effects: [{ type: 'mood', personId: '$subject', amount: 0.01, reason: 'test' }],
        },
        {
          id: 'no',
          weight: 1,
          text: 'The ordinary chance remains ordinary, but it is still a committed event.',
          effects: [{ type: 'mood', personId: '$subject', amount: -0.01, reason: 'test' }],
        },
      ],
    };
    const world = applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
    const compiled = createCompositionSource([kernel]).compile(world, world.date);
    expect(compiled.scenes.length).toBeGreaterThan(0);
    expect(compiled.scenes[0]!.adaptiveContexts).toEqual(kernel.adaptiveContexts);
  });
});

import { advanceV4Year } from '../packages/v4/engine.js';
import { ALL_STATES } from '../packages/v4/content/states/index.js';
import { touchStateRevision } from '../packages/v4/state/runtime.js';
import type { SceneDefinition } from '../packages/v4/domain.js';

function seedPersonState(
  world: ReturnType<typeof applyViennaHistoricalWorld>,
  personId: string,
  stateId: string,
): void {
  world.states ??= {};
  const id = `state:test-adaptive:${stateId}:${personId}`;
  world.states[id] = {
    id,
    definitionId: stateId,
    version: 1,
    ownerType: 'person',
    ownerId: personId,
    since: { ...world.date },
    parameters: {},
    sourceEventId: 'evt:test-adaptive',
    active: true,
    tickCount: 0,
  };
  touchStateRevision(world);
}

function adaptiveScene(): SceneDefinition {
  return {
    id: 'test-adaptive-ordinary-chance',
    version: 1,
    packId: 'test',
    title: 'An ordinary chance with optional context',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 80 },
    roles: [{ key: 'subject', kind: 'subject', required: true }],
    conditions: [{ kind: 'hasState', stateId: 'known-affair', owner: 'person' }],
    tags: ['test', 'adaptive'],
    adaptiveContexts: [
      {
        id: 'famous',
        conditions: [{ kind: 'hasState', stateId: 'fame', owner: 'person' }],
        weightMultiplier: 4,
        checkBonus: 10,
      },
    ],
    check: {
      attribute: 'willpower',
      dc: 12,
      successOutcomeIds: ['famous-success'],
      failureOutcomeIds: ['ordinary-failure'],
    },
    outcomes: [
      {
        id: 'famous-success',
        weight: 1,
        conditions: [{ kind: 'hasState', stateId: 'fame', owner: 'person' }],
        immediateText: 'The famous subject turns an ordinary chance into a public opportunity.',
        effects: [{ type: 'mood', personId: '$subject', amount: 0.02, reason: 'adaptive success' }],
      },
      {
        id: 'ordinary-failure',
        weight: 1,
        immediateText: 'The ordinary subject leaves the chance untouched and goes home.',
        effects: [
          { type: 'mood', personId: '$subject', amount: -0.01, reason: 'ordinary failure' },
        ],
      },
      {
        id: 'ordinary-success',
        weight: 1,
        immediateText: 'The ordinary subject takes the chance quietly and keeps it private.',
        effects: [{ type: 'mood', personId: '$subject', amount: 0.01, reason: 'ordinary success' }],
      },
    ],
    rate: 1,
    cooldownYears: 0,
    subjectIds: ['person-josef-bauer'],
  };
}

describe('Phase 20 adaptive context runtime integration', () => {
  it('applies adaptive checkBonus and conditional outcomes to the same event', () => {
    const plain = applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
    const famous = applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
    seedPersonState(plain, 'person-josef-bauer', 'known-affair');
    seedPersonState(famous, 'person-josef-bauer', 'known-affair');
    seedPersonState(famous, 'person-josef-bauer', 'fame');
    const scene = adaptiveScene();
    const plainRun = advanceV4Year(plain, [scene], {
      states: ALL_STATES,
      eventRuntime: true,
      economy: { enabled: false },
      statisticalModel: false,
      materializePopulation: false,
    });
    const famousRun = advanceV4Year(famous, [scene], {
      states: ALL_STATES,
      eventRuntime: true,
      economy: { enabled: false },
      statisticalModel: false,
      materializePopulation: false,
    });
    const plainEvent = plainRun.events.find((event) =>
      event.action.startsWith('test-adaptive-ordinary-chance/'),
    );
    const famousEvent = famousRun.events.find((event) =>
      event.action.startsWith('test-adaptive-ordinary-chance/'),
    );
    expect(plainEvent).toBeDefined();
    expect(famousEvent).toBeDefined();
    expect(famousEvent!.action).toContain('famous-success');
    expect(famousEvent!.trace?.check?.dc ?? 99).toBeLessThan(plainEvent!.trace?.check?.dc ?? 99);
  });
});
