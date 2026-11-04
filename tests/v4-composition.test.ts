import { describe, expect, it } from 'vitest';
import { advanceV4Year } from '../packages/v4/engine.js';
import { VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import { defaultMacroState } from '../packages/v4/macro.js';
import { createCompositionSource } from '../packages/v4/composition/composer.js';
import type { PlotKernel } from '../packages/v4/composition/types.js';
import { parseComposedAction } from '../packages/v4/composition/replay.js';

function testKernel(overrides: Partial<PlotKernel> = {}): PlotKernel {
  return {
    id: 'kernel-test.workshop-job',
    title: '作坊里的试工',
    domain: 'work',
    kind: 'event',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 65 },
    tags: ['work', 'test'],
    contexts: ['urban', 'industrial', 'war'],
    milieus: ['work', 'factory', 'craft'],
    conditions: [{ kind: 'employment', employed: true }],
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 18, maxAge: 65 },
      {
        key: 'employer',
        kind: 'organization',
        required: true,
        organizationKind: 'factory',
      },
    ],
    outcomes: [
      {
        id: 'trial-shift',
        weight: 1,
        text: '{subject}在{milieu}试了半天工，{employer}的工头把工钱按日结清。',
        effects: [
          {
            type: 'employment',
            personId: '$subject',
            organizationId: '$employer',
            occupation: 'Aushilfsarbeiter',
            wage: 100,
            workplaceId: '@workplace',
            reason: 'test composition',
          },
          {
            type: 'flag',
            personId: '$subject',
            flag: 'test_trial_shift',
            add: true,
            reason: 'test composition',
          },
        ],
        significance: 0.8,
      },
    ],
    baseRate: 1,
    cooldownYears: 1,
    ...overrides,
  };
}

describe('Phase 11 context × kernel composition', () => {
  it('replays a committed action back to kernel/context/milieu', () => {
    expect(parseComposedAction('kernel-x::ctx-y::milieu-z::war/outcome-a')).toEqual({
      kernelId: 'kernel-x',
      contextId: 'ctx-y',
      milieuId: 'milieu-z',
      variantId: 'war',
    });
    expect(parseComposedAction('ordinary/outcome')).toBeUndefined();
  });

  it('compiles a kernel into context-bound SceneDefinitions with resolved places and wages', () => {
    const source = createCompositionSource([testKernel()]);
    const world = structuredClone(VIENNA_1912_SEED);
    const result = source.compile(world, { year: 1912, month: 1 });
    expect(result.scenes.length).toBeGreaterThan(0);
    const scene = result.scenes.find((entry) => entry.id.includes('ctx-vienna-factory-1912'));
    expect(scene).toBeDefined();
    expect(scene?.id).toContain('kernel-test.workshop-job');
    expect(scene?.id).toContain('milieu-');
    expect(scene?.conditions.some((condition) => condition.kind === 'placeKind')).toBe(true);
    const employment = (scene?.outcomes ?? [])
      .flatMap((outcome) => outcome.effects)
      .find((effect) => effect.type === 'employment');
    expect(employment).toMatchObject({
      type: 'employment',
      organizationId: '$employer',
      workplaceId: 'place-wien-printshop-winter',
    });
    expect(employment && 'wage' in employment ? employment.wage : 0).toBeGreaterThanOrEqual(95);
    expect(scene?.outcomes?.[0]?.immediateText).toContain('排字房');
  });

  it('compiles person-level branch conditions onto outcomes', () => {
    const kernel = testKernel({
      outcomes: [
        {
          id: 'member-action',
          weight: 1,
          text: '{subject}以会员身份在{context}发言。',
          when: { hasRole: 'union_member' },
          effects: [
            { type: 'role', personId: '$subject', role: 'delegate', add: true, reason: 'member' },
          ],
          significance: 0.8,
        },
        {
          id: 'outsider-action',
          weight: 1,
          text: '{subject}站在门外听{context}的讨论。',
          when: { notHasRole: 'union_member' },
          effects: [
            {
              type: 'flag',
              personId: '$subject',
              flag: 'outside_meeting',
              add: true,
              reason: 'outside',
            },
          ],
          significance: 0.8,
        },
      ],
    });
    const source = createCompositionSource([kernel]);
    const result = source.compile(structuredClone(VIENNA_1912_SEED), {
      year: 1912,
      month: 1,
    });
    const scene = result.scenes[0]!;
    console.log('COMPOSED', scene.id, scene.outcomes?.map((outcome) => [outcome.id, outcome.conditions]));
    const member = scene.outcomes?.find((outcome) => outcome.id === 'member-action');
    const outsider = scene.outcomes?.find((outcome) => outcome.id === 'outsider-action');
    expect(member?.conditions).toEqual(
      expect.arrayContaining([{ kind: 'hasRole', role: 'union_member' }]),
    );
    expect(outsider?.conditions).toEqual(
      expect.arrayContaining([{ kind: 'notHasRole', role: 'union_member' }]),
    );
  });

  it('uses a causal context variant rather than cosmetic renaming', () => {
    const kernel = testKernel({
      variants: [
        {
          id: 'war-scarcity',
          when: { contextTags: ['war'] },
          outcomes: [
            {
              id: 'war-shift',
              weight: 1,
              text: '{subject}被派去做战时替工，{employer}用配给券补一部分工钱。',
              effects: [
                {
                  type: 'cash',
                  householdId: '$household',
                  amount: 5,
                  reason: 'war substitute work',
                },
                {
                  type: 'flag',
                  personId: '$subject',
                  flag: 'war_substitute_work',
                  add: true,
                  reason: 'war substitute work',
                },
              ],
            },
          ],
        },
      ],
    });
    const source = createCompositionSource([kernel]);
    const world = structuredClone(VIENNA_1912_SEED);
    const normal = source.compile(world, { year: 1912, month: 1 });
    expect(normal.scenes.some((scene) => scene.id.includes('war-scarcity'))).toBe(false);

    const warWorld = structuredClone(world);
    warWorld.macro = defaultMacroState(warWorld);
    warWorld.macro.developments = {
      'test-war': {
        id: 'test-war',
        type: 'war',
        regionId: 'region-lower-austria',
        description: '测试战争',
        severity: 0.8,
        start: { year: 1914, month: 1 },
        end: { year: 1918, month: 11 },
        status: 'active',
        eventFamilyIds: [],
        source: 'event',
        historical: {
          kind: 'war_mobilization',
          phase: 'confrontation',
          phaseStarted: { year: 1914, month: 1 },
          regionIds: ['region-lower-austria'],
          objectives: [],
          sourceIds: [],
          participants: {},
          organizationRoles: {},
          metrics: {
            support: 0.5,
            opposition: 0.2,
            resources: 0.5,
            legitimacy: 0.5,
            escalation: 0.5,
            information: 0.5,
          },
          history: [],
          source: 'event',
        },
      },
    };
    warWorld.date = { year: 1915, month: 1 };
    const war = source.compile(warWorld, { year: 1915, month: 1 });
    const warScene = war.scenes.find((scene) => scene.id.includes('war-scarcity'));
    expect(warScene).toBeDefined();
    expect(warScene?.outcomes?.[0]?.id).toBe('war-shift');
  });

  it('is consumed by the existing annual engine without a new executor', () => {
    const source = createCompositionSource([testKernel()]);
    const world = structuredClone(VIENNA_1912_SEED);
    const result = advanceV4Year(world, [], {
      economy: { enabled: false },
      statisticalModel: false,
      eventRuntime: true,
      composition: source,
      maxOrdinaryEventsPerPerson: 1,
    });
    expect(result.diagnostics.composition?.compiledScenes).toBeGreaterThan(0);
    expect(
      result.events.some((event) => event.action.startsWith('kernel-test.workshop-job::')),
    ).toBe(true);
    expect(result.diagnostics.warnings.some((warning) => warning.code === 'unknown_effect')).toBe(
      false,
    );
  });
});
