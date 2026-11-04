import { describe, expect, it } from 'vitest';
import { advanceV4Year, auditCandidatePools } from '../packages/v4/engine.js';
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
  it('does not offer a Vienna-gated recipe to a person who actually lives in the rural region', () => {
    const kernel = testKernel({
      contexts: ['vienna', 'rural'],
      milieus: [],
      conditions: [],
      roles: [{ key: 'subject', kind: 'subject', required: true, minAge: 18, maxAge: 70 }],
      outcomes: [
        {
          id: 'region-test',
          weight: 1,
          text: '{subject}在本地找到一件差事。',
          effects: [
            {
              type: 'flag',
              personId: '$subject',
              flag: 'region-test',
              add: true,
              reason: 'region test',
            },
          ],
        },
      ],
    });
    const source = createCompositionSource([kernel]);
    const world = structuredClone(VIENNA_1912_SEED);
    const personId = Object.keys(world.persons).find((id) => {
      const person = world.persons[id]!;
      const age = world.date.year - person.born.year;
      const household = world.households[person.householdId];
      return !person.died && age >= 20 && age <= 55 && (household?.memberIds.length ?? 0) >= 2;
    })!;
    const person = world.persons[personId]!;
    person.locationId = 'place-klosterneuburg-aunt-house';
    world.households[person.householdId]!.residenceId = 'place-klosterneuburg-aunt-house';
    const audit = auditCandidatePools(world, personId, world.date, [], [], source);
    const composed =
      audit?.events.filter((event) => event.id.includes('kernel-test.workshop-job')) ?? [];
    expect(composed.some((event) => event.id.includes('ctx-vienna'))).toBe(false);
    expect(composed.some((event) => event.id.includes('klosterneuburg'))).toBe(true);
  });

  it('compiles region gates so the same recipe does not automatically follow a person across regions', () => {
    const kernel = testKernel();
    const source = createCompositionSource([kernel]);
    const result = source.compile(structuredClone(VIENNA_1912_SEED), {
      year: 1912,
      month: 1,
    });
    const viennaScenes = result.scenes.filter((scene) => scene.id.includes('ctx-vienna'));
    expect(viennaScenes.length).toBeGreaterThan(0);
    const ruralScenes = result.scenes.filter((scene) => scene.id.includes('klosterneuburg'));
    for (const scene of viennaScenes) {
      expect(scene.conditions).toEqual(
        expect.arrayContaining([
          {
            kind: 'region',
            in: expect.arrayContaining(['region-lower-austria']),
          },
        ]),
      );
    }
    for (const scene of ruralScenes) {
      expect(scene.conditions).toEqual(
        expect.arrayContaining([
          {
            kind: 'region',
            in: ['region-klosterneuburg'],
          },
        ]),
      );
    }
  });

  it('fails a major outcome with an unresolved effect instead of silently dropping the effect', () => {
    const kernel = testKernel({
      contexts: ['factory'],
      milieus: ['factory'],
      outcomes: [
        {
          id: 'moves-to-university',
          weight: 1,
          text: '{subject}拿到一封来自大学的信。',
          effects: [
            {
              type: 'move',
              personId: '$subject',
              locationId: '@university',
              reason: 'university offer',
            },
          ],
          significance: 0.8,
        },
        {
          id: 'stays-put',
          weight: 1,
          text: '{subject}把信折好，继续在车间上工。',
          effects: [
            {
              type: 'flag',
              personId: '$subject',
              flag: 'stayed-after-letter',
              add: true,
              reason: 'stayed',
            },
          ],
          significance: 0.4,
        },
      ],
    });
    const source = createCompositionSource([kernel]);
    const result = source.compile(structuredClone(VIENNA_1912_SEED), {
      year: 1912,
      month: 1,
    });
    const scene = result.scenes.find((entry) => entry.id.includes('ctx-vienna-factory-1912'));
    expect(scene).toBeDefined();
    expect(scene?.outcomes?.map((outcome) => outcome.id)).toEqual(['stays-put']);
    expect(result.errors.some((error) => error.outcomeId === 'moves-to-university')).toBe(true);
  });

  it('compiles sex-gated outcome branches without a second subject actor', () => {
    const kernel = testKernel({
      roles: [{ key: 'subject', kind: 'subject', required: true, minAge: 18, maxAge: 40 }],
      outcomes: [
        {
          id: 'female-branch',
          weight: 1,
          text: '{subject}在注册处排队。',
          when: { sex: 'female' },
          effects: [
            {
              type: 'flag',
              personId: '$subject',
              flag: 'female-queue',
              add: true,
              reason: 'sex branch',
            },
          ],
        },
        {
          id: 'male-branch',
          weight: 1,
          text: '{subject}在注册处排队。',
          when: { sex: 'male' },
          effects: [
            {
              type: 'flag',
              personId: '$subject',
              flag: 'male-queue',
              add: true,
              reason: 'sex branch',
            },
          ],
        },
      ],
    });
    const source = createCompositionSource([kernel]);
    const result = source.compile(structuredClone(VIENNA_1912_SEED), {
      year: 1912,
      month: 1,
    });
    const scene = result.scenes[0]!;
    expect(scene.outcomes?.find((outcome) => outcome.id === 'female-branch')?.conditions).toEqual([
      { kind: 'sex', in: ['female'] },
    ]);
    expect(scene.outcomes?.find((outcome) => outcome.id === 'male-branch')?.conditions).toEqual([
      { kind: 'sex', in: ['male'] },
    ]);
  });

  it('reuses compiled scenes across years when the active context set is unchanged', () => {
    const source = createCompositionSource([testKernel()]);
    const first = source.compile(structuredClone(VIENNA_1912_SEED), {
      year: 1912,
      month: 1,
    });
    const second = source.compile(structuredClone(VIENNA_1912_SEED), {
      year: 1913,
      month: 1,
    });
    expect(second.stats.cacheHit).toBe(true);
    expect(second.scenes.map((scene) => scene.id)).toEqual(first.scenes.map((scene) => scene.id));
  });

  it('records an incident trace with the actual mechanism, roles and effects', () => {
    const world = structuredClone(VIENNA_1912_SEED);
    const personId = Object.keys(world.persons)[0]!;
    for (const id of Object.keys(world.persons)) if (id !== personId) delete world.persons[id];
    for (const [id, household] of Object.entries(world.households)) {
      household.memberIds = household.memberIds.filter((memberId) => memberId === personId);
      household.guardianIds = household.guardianIds.filter((memberId) => memberId === personId);
      if (household.memberIds.length === 0) delete world.households[id];
    }
    for (const [id, relation] of Object.entries(world.relations)) {
      if (relation.a !== personId || relation.b !== personId) delete world.relations[id];
    }
    for (const organization of Object.values(world.organizations)) {
      organization.memberIds = organization.memberIds.filter((memberId) => memberId === personId);
    }
    world.events = [];
    world.scenes = [];
    const person = world.persons[personId]!;
    person.born = { year: 1880, month: 1 };
    person.roles = ['worker'];
    const scene = {
      id: 'test:incident-trace',
      version: 1,
      packId: 'test',
      title: '测试事件',
      stage: 'adulthood' as const,
      ageWindow: { min: 18, max: 70 },
      roles: [{ key: 'subject', kind: 'subject' as const, required: true }],
      conditions: [{ kind: 'age' as const, min: 18, max: 70 }],
      rate: 1,
      oncePerPerson: true,
      tags: ['test'],
      outcomes: [
        {
          id: 'trace-outcome',
          weight: 1,
          immediateText: '一次用于追踪的事件发生了。',
          trace: {
            motive: '需要一份工作',
            conflict: '门房不肯放行',
            response: '把名字写在候工簿上',
          },
          effects: [
            {
              type: 'flag' as const,
              personId: '$subject',
              flag: 'trace-seen',
              add: true,
              reason: '测试追踪',
            },
          ],
        },
      ],
    };
    const result = advanceV4Year(world, [scene], {
      eventRuntime: true,
      economy: { enabled: false },
      statisticalModel: false,
      maxOrdinaryEventsPerPerson: 1,
    });
    const event = result.events.find((item) => item.action.startsWith('test:incident-trace/'));
    expect(event?.trace?.mechanism.sceneId).toBe('test:incident-trace');
    expect(event?.trace?.mechanism.outcomeId).toBe('trace-outcome');
    expect(event?.trace?.subject.id).toBe(personId);
    expect(event?.trace?.motive).toBe('需要一份工作');
    expect(event?.trace?.conflict).toBe('门房不肯放行');
    expect(event?.trace?.response).toBe('把名字写在候工簿上');
    expect(event?.trace?.effects[0]?.type).toBe('flag');
  });

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
