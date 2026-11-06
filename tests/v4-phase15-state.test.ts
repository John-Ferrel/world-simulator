import { describe, expect, it } from 'vitest';
import { advanceV4Year } from '../packages/v4/engine.js';
import {
  assertWorldV4,
  type EventEffect,
  type Organization,
  type Person,
  type Place,
  type SceneDefinition,
  type WorldState,
} from '../packages/v4/domain.js';
import { ALL_STATES } from '../packages/v4/content/states/index.js';
import { validateStateLibrary } from '../packages/v4/state/types.js';
import { compileWish, applyWishState } from '../packages/v4/wish-compiler.js';
import { indexStateDefinitions, stateSceneWeightMultiplier } from '../packages/v4/state/runtime.js';

function traits(): Person['traits'] {
  return {
    care: 0.6,
    ambition: 0.7,
    tradition: 0.5,
    openness: 0.7,
    conscientiousness: 0.7,
    extraversion: 0.5,
    agreeableness: 0.5,
    neuroticism: 0.4,
  };
}

function place(id: string, name: string, kind: Place['kind']): Place {
  return { id, name, kind, settlementId: 'settlement:vienna', offers: [] };
}

function person(id: string, bornYear: number, overrides: Partial<Person> = {}): Person {
  return {
    id,
    name: id,
    sex: 'female',
    born: { year: bornYear, month: 1 },
    locationId: 'place:home',
    householdId: 'household:test',
    parentIds: [],
    guardianIds: [],
    health: { vitality: 0.9, conditions: [], nutrition: 0.9 },
    traits: traits(),
    education: { status: 'secondary', level: 3 },
    roles: [],
    projectIds: [],
    relationshipIds: [],
    knowledgeIds: [],
    provenance: { kind: 'initial' },
    ...overrides,
  };
}

function fixture(): WorldState {
  const organization: Organization = {
    id: 'org:printshop',
    name: 'Print shop',
    kind: 'factory',
    placeId: 'place:work',
    memberIds: ['person:anna', 'person:betrayer'],
    positions: [],
    treasury: 20,
    authorityRules: [],
    projects: [],
    status: 'active',
    causeIds: [],
  };
  return {
    id: 'world:phase15',
    seed: 'phase15-state',
    date: { year: 1912, month: 1 },
    timePolicy: { secondsPerYear: 3600, monthsPerTick: 12 },
    places: {
      'place:home': place('place:home', 'Tenement', 'home'),
      'place:school': place('place:school', 'University', 'school'),
      'place:work': place('place:work', 'Print shop', 'factory'),
      'place:cafe': place('place:cafe', 'Cafe', 'cafe'),
    },
    households: {
      'household:test': {
        id: 'household:test',
        residenceId: 'place:home',
        memberIds: ['person:anna', 'person:betrayer'],
        guardianIds: [],
        cash: 30,
        food: 20,
        debt: 0,
        rent: 2,
        obligations: [],
        assets: [],
        sharingRules: 'pooled',
      },
    },
    persons: {
      'person:anna': person('person:anna', 1894, {
        attributes: { intelligence: 0.85, willpower: 0.9, cunning: 0.7 },
        education: { status: 'secondary', level: 4 },
      }),
      'person:betrayer': person('person:betrayer', 1890, {
        name: 'Betrayer',
        sex: 'male',
        attributes: { willpower: 0.3 },
      }),
    },
    organizations: { 'org:printshop': organization },
    positions: {},
    projects: {},
    interactions: {},
    relations: {},
    knowledge: {},
    events: [],
    scenes: [],
    pressures: {},
    historyMeta: { sequence: 0 },
    status: 'running',
  };
}

function stateScene(
  id: string,
  effect: EventEffect,
  extra: Partial<SceneDefinition> = {},
): SceneDefinition {
  return {
    id,
    version: 1,
    packId: 'phase15-test',
    title: id,
    stage: 'adulthood',
    ageWindow: { min: 18, max: 45 },
    roles: [{ key: 'subject', kind: 'subject' }],
    conditions: [],
    outcomes: [
      {
        id: 'apply',
        weight: 1,
        immediateText: '{subject}进入了一段新的处境，具体的变化被记进了世界。',
        effects: [effect],
      },
    ],
    tags: ['test', 'education'],
    rate: 1,
    oncePerPerson: true,
    subjectIds: ['person:anna'],
    ...extra,
  };
}

function advance(world: WorldState, scenes: SceneDefinition[]): WorldState {
  let current = world;
  for (let index = 0; index < 3; index += 1) {
    current = advanceV4Year(current, scenes, {
      states: ALL_STATES,
      eventRuntime: false,
      economy: { enabled: false },
      statisticalModel: false,
      materializePopulation: false,
      maxScenesPerPerson: 1,
    }).world;
  }
  return current;
}

describe('Phase 15 state mechanism', () => {
  it('validates the authored state library without errors', () => {
    const validation = validateStateLibrary(ALL_STATES);
    expect(validation.errors).toEqual([]);
  });

  it('creates a university state and transitions it to a graduate with a committed fact', () => {
    const world = fixture();
    const enrol: EventEffect = {
      type: 'state_add',
      ownerType: 'person',
      ownerId: '$subject',
      stateId: 'university-student',
      parameters: { progress: 65, scholarship: false },
      reason: 'enrolled at university',
    };
    const scenes = [stateScene('test-enrol', enrol, { tags: ['education', 'student'] })];
    const result = advanceV4Year(world, scenes, {
      states: ALL_STATES,
      eventRuntime: false,
      economy: { enabled: false },
      statisticalModel: false,
      materializePopulation: false,
      maxScenesPerPerson: 1,
    });
    const year1 = result.world;
    expect(
      Object.values(year1.states ?? {}).filter(
        (state) => state.active && state.definitionId === 'university-student',
      ),
    ).toHaveLength(1);
    const year2 = advanceV4Year(year1, [], {
      states: ALL_STATES,
      eventRuntime: false,
      economy: { enabled: false },
      statisticalModel: false,
      materializePopulation: false,
    });
    const afterEnrol = year2.world;
    const transition = year2.events.find((event) => event.action.startsWith('state_transition:'));
    expect(transition).toBeDefined();
    expect(
      transition!.effects.some(
        (effect) =>
          effect.type === 'state_transition' && effect.toStateId === 'university-graduate',
      ),
    ).toBe(true);
    // Nested onEnter/onExit effects are part of the committed fact, not a
    // definition-only side channel.
    expect(transition!.effects.some((effect) => effect.type === 'education')).toBe(true);
    expect(transition!.effects.some((effect) => effect.type === 'role')).toBe(true);
    const graduate = Object.values(afterEnrol.states ?? {}).filter(
      (state) => state.active && state.definitionId === 'university-graduate',
    );
    expect(graduate).toHaveLength(1);
    expect(afterEnrol.persons['person:anna']!.education.level).toBeGreaterThanOrEqual(6);
    expect(afterEnrol.persons['person:anna']!.roles).toContain('graduate');
    const student = Object.values(afterEnrol.states ?? {}).find(
      (state) => state.definitionId === 'university-student',
    );
    expect(student?.active).toBe(false);
    expect(student?.endedAt).toBeDefined();
    assertWorldV4(afterEnrol);
  });

  it('ticks a state once a year and records the check and consequence', () => {
    const world = fixture();
    const enrol = stateScene('test-enrol', {
      type: 'state_add',
      ownerType: 'person',
      ownerId: '$subject',
      stateId: 'university-student',
      parameters: { progress: 20, scholarship: false },
      reason: 'university',
    });
    const result = advanceV4Year(world, [enrol], {
      states: ALL_STATES,
      eventRuntime: false,
      economy: { enabled: false },
      statisticalModel: false,
      materializePopulation: false,
    });
    const year2 = advanceV4Year(result.world, [], {
      states: ALL_STATES,
      eventRuntime: false,
      economy: { enabled: false },
      statisticalModel: false,
      materializePopulation: false,
    });
    const tick = year2.events.find(
      (event) =>
        event.action.startsWith('state_tick:university-student/') ||
        event.action.startsWith('state_transition:university-student'),
    );
    expect(tick).toBeDefined();
    const student = Object.values(year2.world.states ?? {}).find(
      (state) => state.definitionId === 'university-student',
    );
    expect(student).toBeDefined();
    expect((student!.tickCount ?? 0) >= 0).toBe(true);
    assertWorldV4(result.world);
  });

  it('replaces a conflicting education state instead of silently overwriting it', () => {
    const world = fixture();
    const enrol = stateScene('test-enrol', {
      type: 'state_add',
      ownerType: 'person',
      ownerId: '$subject',
      stateId: 'university-student',
      reason: 'university',
    });
    const apprentice = stateScene('test-apprentice', {
      type: 'state_add',
      ownerType: 'person',
      ownerId: '$subject',
      stateId: 'apprenticeship-contract',
      reason: 'apprenticeship',
    });
    const afterEnrol = advanceV4Year(world, [enrol], {
      states: ALL_STATES,
      eventRuntime: false,
      economy: { enabled: false },
      statisticalModel: false,
      materializePopulation: false,
    }).world;
    expect(
      Object.values(afterEnrol.states ?? {}).filter(
        (state) => state.active && state.definitionId === 'university-student',
      ),
    ).toHaveLength(1);
    const afterApprentice = advanceV4Year(afterEnrol, [apprentice], {
      states: ALL_STATES,
      eventRuntime: false,
      economy: { enabled: false },
      statisticalModel: false,
      materializePopulation: false,
    }).world;
    expect(
      Object.values(afterApprentice.states ?? {}).filter(
        (state) => state.active && state.definitionId === 'university-student',
      ),
    ).toHaveLength(0);
    expect(
      Object.values(afterApprentice.states ?? {}).filter(
        (state) => state.active && state.definitionId === 'apprenticeship-contract',
      ),
    ).toHaveLength(1);
    expect(afterApprentice.persons['person:anna']!.education.status).toBe('apprenticeship');
    const replaced = Object.values(afterApprentice.states ?? {}).find(
      (state) => state.definitionId === 'university-student',
    );
    expect(replaced?.active).toBe(false);
    expect(replaced?.endReason).toContain('replaced_by');
    assertWorldV4(afterApprentice);
  });

  it('lets a curse react to a committed betrayal and harm the betrayer', () => {
    const world = fixture();
    world.states = {
      'state:curse': {
        id: 'state:curse',
        definitionId: 'cursed-by-wish',
        version: 1,
        ownerType: 'person',
        ownerId: 'person:anna',
        since: { year: 1912, month: 1 },
        parameters: { severity: 0.6, triggers: 0 },
        sourceEventId: 'evt:seed',
        active: true,
        tickCount: 0,
      },
    };
    world.events.push({
      id: 'evt:seed',
      date: { year: 1912, month: 1 },
      subjectId: 'person:anna',
      participants: [],
      action: 'seed',
      causes: [],
      effects: [],
      immediateText: 'seed',
      significance: 0.1,
      visibility: 'private',
      provenance: { kind: 'system' },
    });
    const betrayerBefore = world.persons['person:betrayer']!.health.vitality;
    const victimBefore = world.persons['person:anna']!.health.vitality;
    const betrayal: SceneDefinition = {
      id: 'test-betrayal',
      version: 1,
      packId: 'phase15-test',
      title: 'A betrayal',
      stage: 'adulthood',
      ageWindow: { min: 18, max: 45 },
      roles: [
        { key: 'subject', kind: 'subject' },
        { key: 'betrayer', kind: 'neighbor', required: true },
      ],
      conditions: [],
      outcomes: [
        {
          id: 'betrayed',
          weight: 1,
          immediateText: '{betrayer}把{subject}的秘密卖给了别人。',
          effects: [
            {
              type: 'flag',
              personId: '$subject',
              flag: 'betrayed',
              add: true,
              reason: 'a real betrayal',
            },
          ],
        },
      ],
      tags: ['betrayal', 'social'],
      rate: 1,
    };
    const curseStates = ALL_STATES.map((state) =>
      state.id === 'cursed-by-wish'
        ? {
            ...state,
            reactions: (state.reactions ?? []).map((reaction) => ({
              ...reaction,
              chance: 1,
              check: { attribute: 'willpower' as const, dc: 2 },
            })),
          }
        : state,
    );
    const result = advanceV4Year(world, [betrayal], {
      states: curseStates,
      eventRuntime: false,
      economy: { enabled: false },
      statisticalModel: false,
      materializePopulation: false,
    });
    const reaction = result.events.find((event) =>
      event.action.startsWith('state_reaction:cursed-by-wish/'),
    );
    expect(reaction).toBeDefined();
    const betrayerAfter = result.world.persons['person:betrayer']!.health.vitality;
    const victimAfter = result.world.persons['person:anna']!.health.vitality;
    expect(
      betrayerAfter < betrayerBefore || victimAfter < victimBefore,
      'the curse check must have a real success or recoil consequence',
    ).toBe(true);
    const source = result.events.find((event) => event.tags?.includes('betrayal'));
    expect(reaction!.causes).toContain(source!.id);
    assertWorldV4(result.world);
  });

  it('compiles a power wish into a bounded state, not into real authority', () => {
    const compilation = compileWish('我要成为世界上最有权势的人。');
    expect(compilation.archetype).toBe('power');
    expect(compilation.stateId).toBe('wish-power');
    expect(compilation.intensity).toBeGreaterThan(0.7);

    const world = fixture();
    world.persons['person:anna']!.lifeContract = {
      originalWish: '我要成为世界上最有权势的人。',
      mode: 'legendary',
      createdAt: { year: 1912, month: 1 },
    };
    world.events.push({
      id: 'evt:birth',
      date: { year: 1912, month: 1 },
      subjectId: 'person:anna',
      participants: [],
      action: 'birth',
      causes: [],
      effects: [],
      immediateText: 'birth',
      significance: 0.9,
      visibility: 'public',
      provenance: { kind: 'birth' },
    });
    const { stateId } = applyWishState(world, 'person:anna', '我要成为世界上最有权势的人。');
    expect(stateId).toBeDefined();
    expect(
      Object.values(world.states ?? {}).filter(
        (state) => state.active && state.definitionId === 'wish-power',
      ),
    ).toHaveLength(1);
    const powerCondition = {
      kind: 'position' as const,
      titleIncludes: '国王',
    };
    // No stage title or wish state can satisfy a real position condition.
    expect(
      Object.values(world.positions).some(
        (position) =>
          position.holderId === 'person:anna' &&
          position.title.toLowerCase().includes(powerCondition.titleIncludes.toLowerCase()),
      ),
    ).toBe(false);
    assertWorldV4(world);
  });

  it('stores a typed link and lets an organisation state affect its members', () => {
    const world = fixture();
    world.persons['person:anna']!.employment = {
      organizationId: 'org:printshop',
      occupation: 'printer',
      wage: 4,
      since: { year: 1910, month: 1 },
      workplaceId: 'place:work',
    };
    world.states = {
      'state:strike': {
        id: 'state:strike',
        definitionId: 'strike-wave',
        version: 1,
        ownerType: 'organization',
        ownerId: 'org:printshop',
        since: { year: 1912, month: 1 },
        parameters: { demands: 'higher wages', strength: 0.6 },
        sourceEventId: 'evt:seed',
        active: true,
        tickCount: 0,
      },
    };
    world.events.push({
      id: 'evt:seed',
      date: { year: 1912, month: 1 },
      subjectId: 'person:anna',
      participants: [],
      action: 'seed',
      causes: [],
      effects: [],
      immediateText: 'seed',
      significance: 0.1,
      visibility: 'private',
      provenance: { kind: 'system' },
    });
    const index = indexStateDefinitions(ALL_STATES);
    const multiplier = stateSceneWeightMultiplier(
      world,
      world.persons['person:anna']!,
      { tags: ['work', 'strike'] },
      index,
    );
    expect(multiplier).toBeGreaterThan(1.2);

    const loverScene: SceneDefinition = {
      id: 'test-secret-link',
      version: 1,
      packId: 'phase15-test',
      title: 'Secret link',
      stage: 'adulthood',
      ageWindow: { min: 18, max: 45 },
      roles: [
        { key: 'subject', kind: 'subject' },
        { key: 'lover', kind: 'neighbor', required: true },
      ],
      conditions: [],
      outcomes: [
        {
          id: 'begin',
          weight: 1,
          immediateText: '{subject}和{lover}开始了一段不能公开的关系。',
          effects: [
            {
              type: 'state_add',
              ownerType: 'person',
              ownerId: '$subject',
              stateId: 'secret-lover',
              parameters: { intensity: 0.6, exposed: false },
              links: { lover: '$lover' },
              reason: 'secret attachment',
            },
          ],
        },
      ],
      tags: ['love', 'secret'],
      rate: 1,
      oncePerPerson: true,
      subjectIds: ['person:anna'],
    };
    const result = advanceV4Year(world, [loverScene], {
      states: ALL_STATES,
      eventRuntime: false,
      economy: { enabled: false },
      statisticalModel: false,
      materializePopulation: false,
    });
    const secret = Object.values(result.world.states ?? {}).find(
      (state) => state.active && state.definitionId === 'secret-lover',
    );
    expect(secret?.links?.lover).toBe('person:betrayer');
    assertWorldV4(result.world);
  });

  it('uses the dedicated state opportunity lane for a state-gated scene', () => {
    const world = fixture();
    const enrol = stateScene('test-enrol', {
      type: 'state_add',
      ownerType: 'person',
      ownerId: '$subject',
      stateId: 'university-student',
      parameters: { progress: 20, scholarship: false },
      reason: 'university',
    });
    const stateSceneOpportunity: SceneDefinition = {
      id: 'test-state-opportunity',
      version: 1,
      packId: 'phase15-test',
      title: 'A state-gated chance',
      stage: 'adulthood',
      ageWindow: { min: 18, max: 45 },
      roles: [{ key: 'subject', kind: 'subject' }],
      conditions: [{ kind: 'hasState', stateId: 'university-student' }],
      outcomes: [
        {
          id: 'taken',
          weight: 1,
          immediateText: '{subject}在学生名单上看见一个不该错过的机会。',
          effects: [
            { type: 'flag', personId: '$subject', flag: 'state_opportunity_taken', add: true, reason: 'state-gated chance' },
          ],
        },
      ],
      tags: ['education', 'student'],
      rate: 1,
      cooldownYears: 1,
    };
    const year1 = advanceV4Year(world, [enrol], {
      states: ALL_STATES,
      eventRuntime: false,
      economy: { enabled: false },
      statisticalModel: false,
      materializePopulation: false,
    }).world;
    const year2 = advanceV4Year(year1, [stateSceneOpportunity], {
      states: ALL_STATES,
      eventRuntime: true,
      economy: { enabled: false },
      statisticalModel: false,
      materializePopulation: false,
    });
    expect(year2.diagnostics.scheduling?.stateOpportunity.candidates).toBeGreaterThan(0);
    expect(
      year2.events.some((event) => event.action.startsWith('test-state-opportunity/')),
    ).toBe(true);
    expect(year2.world.persons['person:anna']!.life?.flags).toContain('state_opportunity_taken');
    assertWorldV4(year2.world);
  });

  it('attaches a durable raising-child household state when a child is born', () => {
    const world = fixture();
    const birth: SceneDefinition = {
      id: 'test-birth',
      version: 1,
      packId: 'phase15-test',
      title: 'A birth',
      stage: 'adulthood',
      ageWindow: { min: 18, max: 45 },
      roles: [{ key: 'subject', kind: 'subject' }],
      conditions: [],
      outcomes: [
        {
          id: 'child',
          weight: 1,
          immediateText: '{subject}生下一个孩子，家里多了一口人。',
          effects: [
            {
              type: 'birth',
              parentIds: ['$subject'],
              childSex: 'female',
              reason: 'test birth',
            },
          ],
        },
      ],
      tags: ['family', 'birth'],
      rate: 1,
      subjectIds: ['person:anna'],
    };
    const result = advanceV4Year(world, [birth], {
      states: ALL_STATES,
      eventRuntime: false,
      economy: { enabled: false },
      statisticalModel: false,
      materializePopulation: false,
    });
    const birthEvent = result.events.find((event) => event.action === 'test-birth/child');
    const childId = birthEvent?.effects.find((effect) => effect.type === 'birth')?.childId;
    expect(childId).toBeDefined();
    const childState = Object.values(result.world.states ?? {}).find(
      (state) =>
        state.active &&
        state.definitionId === 'raising-child' &&
        state.ownerType === 'household' &&
        state.ownerId === 'household:test',
    );
    expect(childState?.links?.child).toBe(childId);
    assertWorldV4(result.world);
  });


  it('uses the most recently acquired position for $positionOrg effects', () => {
    const world = fixture();
    world.organizations['org:new'] = {
      ...world.organizations['org:printshop']!,
      id: 'org:new',
      name: 'New office',
      treasury: 5,
      memberIds: ['person:anna'],
    };
    world.positions['pos:old'] = {
      id: 'pos:old',
      organizationId: 'org:printshop',
      title: 'Old clerk',
      holderId: 'person:anna',
      authority: ['file'],
      start: { year: 1900, month: 1 },
    };
    world.positions['pos:new'] = {
      id: 'pos:new',
      organizationId: 'org:new',
      title: 'New director',
      holderId: 'person:anna',
      authority: ['sign'],
      start: { year: 1910, month: 1 },
    };
    const budget: SceneDefinition = {
      id: 'test-position-budget',
      version: 1,
      packId: 'phase15-test',
      title: 'Budget',
      stage: 'adulthood',
      ageWindow: { min: 18, max: 60 },
      roles: [{ key: 'subject', kind: 'subject' }],
      conditions: [{ kind: 'position' }],
      outcomes: [
        {
          id: 'signed',
          weight: 1,
          immediateText: '{subject}在预算上签字。',
          effects: [
            {
              type: 'organization_funds',
              organizationId: '$positionOrg',
              amount: 3,
              reason: 'the current office budget',
            },
            {
              type: 'position',
              organizationId: '$positionOrg',
              title: 'Assistant',
              holderId: '$subject',
              authority: ['file'],
              reason: 'the current office hires',
            },
          ],
        },
      ],
      tags: ['office', 'budget'],
      rate: 1,
      subjectIds: ['person:anna'],
    };
    const result = advanceV4Year(world, [budget], {
      eventRuntime: true,
      economy: { enabled: false },
      statisticalModel: false,
      materializePopulation: false,
      states: ALL_STATES,
    });
    expect(result.world.organizations['org:new']!.treasury).toBe(8);
    expect(result.world.organizations['org:printshop']!.treasury).toBe(20);
    const assistant = Object.values(result.world.positions).find(
      (position) => position.title === 'Assistant' && position.holderId === 'person:anna',
    );
    expect(assistant?.organizationId).toBe('org:new');
    assertWorldV4(result.world);
  });

  it('casts a real child for a household care scene', () => {
    const world = fixture();
    const birth: SceneDefinition = {
      id: 'test-child-birth',
      version: 1,
      packId: 'phase15-test',
      title: 'A birth',
      stage: 'adulthood',
      ageWindow: { min: 18, max: 45 },
      roles: [{ key: 'subject', kind: 'subject' }],
      conditions: [],
      outcomes: [
        {
          id: 'child',
          weight: 1,
          immediateText: '{subject}生下一个孩子。',
          effects: [
            { type: 'birth', parentIds: ['$subject'], childSex: 'female', reason: 'test birth' },
          ],
        },
      ],
      tags: ['family', 'birth'],
      rate: 1,
      subjectIds: ['person:anna'],
    };
    const first = advanceV4Year(world, [birth], {
      eventRuntime: false,
      economy: { enabled: false },
      statisticalModel: false,
      materializePopulation: false,
      states: ALL_STATES,
    });
    const childId = first.events.find((event) => event.action.startsWith('test-child-birth/'))
      ?.effects.find((effect) => effect.type === 'birth')?.childId;
    expect(childId).toBeDefined();
    const care: SceneDefinition = {
      id: 'test-child-care',
      version: 1,
      packId: 'phase15-test',
      title: 'A child at home',
      stage: 'adulthood',
      ageWindow: { min: 18, max: 45 },
      roles: [
        { key: 'subject', kind: 'subject' },
        { key: 'child', kind: 'child', minAge: 0, maxAge: 5, sameHousehold: true },
      ],
      conditions: [{ kind: 'hasState', stateId: 'raising-child', owner: 'household' }],
      outcomes: [
        {
          id: 'seen',
          weight: 1,
          immediateText: '{subject}看着{child}在屋里睡着。',
          effects: [
            {
              type: 'flag',
              personId: '$subject',
              flag: 'saw_the_child',
              add: true,
              reason: 'the child was cast as a real person',
            },
          ],
        },
      ],
      tags: ['family', 'care'],
      rate: 1,
      subjectIds: ['person:anna'],
    };
    const second = advanceV4Year(first.world, [care], {
      eventRuntime: true,
      economy: { enabled: false },
      statisticalModel: false,
      materializePopulation: false,
      states: ALL_STATES,
    });
    const event = second.events.find((candidate) => candidate.action.startsWith('test-child-care/'));
    expect(event).toBeDefined();
    expect(event?.participants.some((participant) => participant.personId === childId)).toBe(true);
    expect(second.world.persons['person:anna']!.life?.flags).toContain('saw_the_child');
    assertWorldV4(second.world);
  });

  it('expires a state after its duration and records the removal', () => {
    const world = fixture();
    const stage: SceneDefinition = stateScene('test-stage', {
      type: 'state_add',
      ownerType: 'person',
      ownerId: '$subject',
      stateId: 'stage-king',
      durationMonths: 1,
      reason: 'one-night performance',
    });
    const year1 = advanceV4Year(world, [stage], {
      states: ALL_STATES,
      eventRuntime: false,
      economy: { enabled: false },
      statisticalModel: false,
      materializePopulation: false,
    }).world;
    const active = Object.values(year1.states ?? {}).find(
      (state) => state.active && state.definitionId === 'stage-king',
    );
    expect(active).toBeDefined();
    const year2 = advanceV4Year(year1, [], {
      states: ALL_STATES,
      eventRuntime: false,
      economy: { enabled: false },
      statisticalModel: false,
      materializePopulation: false,
    });
    expect(year2.events.some((event) => event.action.startsWith('state_expire:stage-king'))).toBe(
      true,
    );
    expect(
      Object.values(year2.world.states ?? {}).find((state) => state.definitionId === 'stage-king')
        ?.active,
    ).toBe(false);
    assertWorldV4(year2.world);
  });

  it('distinguishes a real position from a stage title', () => {
    const world = fixture();
    const found: SceneDefinition = {
      id: 'test-found-office',
      version: 1,
      packId: 'phase15-test',
      title: 'Found a real office',
      stage: 'adulthood',
      ageWindow: { min: 18, max: 45 },
      roles: [{ key: 'subject', kind: 'subject' }],
      conditions: [],
      outcomes: [
        {
          id: 'appointed',
          weight: 1,
          immediateText: '{subject}拿到一间有印章和预算的办公室。',
          effects: [
            {
              type: 'organization_found',
              organization: {
                id: 'org:test-party:$eventId',
                name: 'Test Party',
                kind: 'party',
                treasury: 1,
              },
              reason: 'founded for the test',
            },
            {
              type: 'position',
              organizationId: 'org:test-party:$eventId',
              title: '主席',
              holderId: '$subject',
              authority: ['预算', '签字'],
              reason: 'real authority',
            },
          ],
        },
      ],
      tags: ['politics', 'power', 'office'],
      rate: 1,
      oncePerPerson: true,
      subjectIds: ['person:anna'],
    };
    const result = advanceV4Year(world, [found], {
      states: ALL_STATES,
      eventRuntime: false,
      economy: { enabled: false },
      statisticalModel: false,
      materializePopulation: false,
    });
    const position = Object.values(result.world.positions).find(
      (candidate) => candidate.holderId === 'person:anna' && candidate.end === undefined,
    );
    expect(position?.title).toBe('主席');
    expect(position?.authority).toContain('预算');
    expect(result.world.organizations[position!.organizationId]?.memberIds).toContain(
      'person:anna',
    );
    assertWorldV4(result.world);
  });

  it('is deterministic for the same state world', () => {
    const world = fixture();
    const enrol = stateScene('test-enrol', {
      type: 'state_add',
      ownerType: 'person',
      ownerId: '$subject',
      stateId: 'university-student',
      parameters: { progress: 30 },
      reason: 'university',
    });
    const options = {
      states: ALL_STATES,
      eventRuntime: false as const,
      economy: { enabled: false },
      statisticalModel: false,
      materializePopulation: false,
    };
    const a = advanceV4Year(structuredClone(world), [enrol], options);
    const b = advanceV4Year(structuredClone(world), [enrol], options);
    expect(a.events.map((event) => event.id)).toEqual(b.events.map((event) => event.id));
    expect(a.world.states).toEqual(b.world.states);
  });
});
