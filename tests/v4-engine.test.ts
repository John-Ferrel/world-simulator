import { describe, expect, it } from 'vitest';
import { advanceV4Year, type V4AdvanceOptions } from '../packages/v4/engine.js';
import {
  assertWorldV4,
  type Interaction,
  type Organization,
  type Person,
  type Place,
  type Project,
  type SceneDefinition,
  type WorldState,
} from '../packages/v4/domain.js';

function traits(): Person['traits'] {
  return {
    care: 0.6,
    ambition: 0.5,
    tradition: 0.6,
    openness: 0.4,
    conscientiousness: 0.6,
    extraversion: 0.5,
    agreeableness: 0.6,
    neuroticism: 0.4,
  };
}

function place(id: string, name: string, kind: Place['kind']): Place {
  return {
    id,
    name,
    kind,
    settlementId: 'settlement:vienna',
    offers: [],
  };
}

function organization(
  overrides: Partial<Organization> & Pick<Organization, 'id' | 'kind'>,
): Organization {
  return {
    name: overrides.id,
    placeId: 'place:printshop',
    memberIds: [],
    positions: [],
    treasury: 0,
    authorityRules: [],
    projects: [],
    status: 'active',
    causeIds: [],
    ...overrides,
  };
}

/** A small Vienna household: printer Josef, his daughter Anna. */
function vienna(): WorldState {
  return {
    id: 'world:test',
    seed: 'vienna-1912',
    date: { year: 1912, month: 1 },
    timePolicy: { secondsPerYear: 3600, monthsPerTick: 12 },
    places: {
      'place:home': place('place:home', 'Huber flat', 'home'),
      'place:printshop': place('place:printshop', 'Print shop', 'factory'),
      'place:school': place('place:school', 'District school', 'school'),
      'place:cafe': place('place:cafe', 'Corner cafe', 'cafe'),
    },
    households: {
      'household:huber': {
        id: 'household:huber',
        residenceId: 'place:home',
        memberIds: ['person:anna', 'person:josef'],
        guardianIds: ['person:josef'],
        cash: 40,
        food: 30,
        debt: 0,
        rent: 2,
        obligations: [],
        assets: [],
        sharingRules: 'pooled',
      },
    },
    persons: {
      'person:anna': {
        id: 'person:anna',
        name: 'Anna Huber',
        sex: 'female',
        born: { year: 1901, month: 3 },
        locationId: 'place:home',
        householdId: 'household:huber',
        parentIds: ['person:josef'],
        guardianIds: ['person:josef'],
        health: { vitality: 0.8, conditions: [], nutrition: 0.8 },
        traits: traits(),
        education: {
          status: 'primary',
          level: 1,
          placeId: 'place:school',
          started: { year: 1908, month: 9 },
        },
        roles: [],
        projectIds: [],
        relationshipIds: [],
        knowledgeIds: [],
        provenance: { kind: 'initial' },
      },
      'person:josef': {
        id: 'person:josef',
        name: 'Josef Huber',
        sex: 'male',
        born: { year: 1880, month: 4 },
        locationId: 'place:printshop',
        householdId: 'household:huber',
        parentIds: [],
        guardianIds: [],
        health: { vitality: 0.9, conditions: [], nutrition: 0.9 },
        traits: traits(),
        education: { status: 'primary', level: 2 },
        employment: {
          organizationId: 'org:printshop',
          occupation: 'printer',
          wage: 10,
          since: { year: 1905, month: 2 },
          workplaceId: 'place:printshop',
        },
        roles: ['worker'],
        projectIds: [],
        relationshipIds: [],
        knowledgeIds: [],
        provenance: { kind: 'initial' },
      },
    },
    organizations: {
      'org:printshop': organization({
        id: 'org:printshop',
        kind: 'factory',
        placeId: 'place:printshop',
        memberIds: ['person:josef'],
        treasury: 120,
      }),
    },
    positions: {},
    projects: {},
    interactions: {},
    relations: {},
    knowledge: {},
    events: [],
    scenes: [],
    pressures: { food: 0.2, war: 0 },
    historyMeta: { sequence: 0 },
    status: 'running',
  };
}

function scene(
  overrides: Partial<SceneDefinition> & Pick<SceneDefinition, 'id' | 'stage'>,
): SceneDefinition {
  return {
    version: 1,
    packId: 'test-pack',
    title: overrides.id,
    ageWindow: { min: 0, max: 120 },
    roles: [],
    conditions: [],
    outcomes: [{ id: 'default', weight: 1, immediateText: 'An event happened.', effects: [] }],
    tags: [],
    ...overrides,
  };
}

const noEconomy: V4AdvanceOptions = { economy: { enabled: false } };

function totalMoney(world: WorldState): number {
  const householdCash = Object.values(world.households).reduce(
    (sum, household) => sum + household.cash,
    0,
  );
  const treasuries = Object.values(world.organizations).reduce(
    (sum, organization) => sum + organization.treasury,
    0,
  );
  return householdCash + treasuries;
}

describe('v4 annual engine', () => {
  it('blocks a scene when a required role cannot be cast, without inventing a person', () => {
    const world = vienna();
    const anna = world.persons['person:anna']!;
    anna.parentIds = [];
    anna.guardianIds = [];
    world.households['household:huber']!.guardianIds = [];
    const beforePeople = Object.keys(world.persons).sort();

    const definition = scene({
      id: 'scene:missing-parent',
      stage: 'childhood',
      ageWindow: { min: 5, max: 11 },
      roles: [{ key: 'parent', kind: 'parent', required: true }],
      outcomes: [
        {
          id: 'ask-parent',
          weight: 1,
          immediateText: 'Anna asks a parent for help.',
          effects: [],
        },
      ],
    });

    const result = advanceV4Year(world, [definition], noEconomy);

    expect(result.events).toHaveLength(0);
    expect(result.scenes).toHaveLength(1);
    expect(result.scenes[0]).toMatchObject({
      sceneId: 'scene:missing-parent',
      subjectId: 'person:anna',
      status: 'blocked',
      reason: 'missing_role:parent',
    });
    expect(Object.keys(result.world.persons).sort()).toEqual(beforePeople);
    expect(result.world.events).toHaveLength(0);
    expect(result.diagnostics.scenesBlocked).toBe(1);
    expect(result.diagnostics.warnings.some((warning) => warning.code === 'scene_blocked')).toBe(
      true,
    );
    assertWorldV4(result.world);
  });

  it('respects age and life-stage gates before casting a scene', () => {
    const world = vienna();
    const definition = scene({
      id: 'scene:apprenticeship-offer',
      stage: 'adolescence',
      ageWindow: { min: 12, max: 14 },
      roles: [],
      outcomes: [
        {
          id: 'accepted',
          weight: 1,
          immediateText: 'Anna is offered an apprenticeship.',
          effects: [
            {
              type: 'role',
              personId: 'person:anna',
              role: 'apprentice',
              add: true,
              reason: 'apprenticeship',
            },
          ],
        },
      ],
    });

    // Target date 1913-01: Anna is still 11 (born 1901-03).
    const first = advanceV4Year(world, [definition], noEconomy);
    expect(first.scenes).toHaveLength(0);
    expect(first.events).toHaveLength(0);
    expect(first.world.persons['person:anna']!.roles).not.toContain('apprentice');

    // Target date 1914-01: Anna just turned 12 and is an adolescent.
    const second = advanceV4Year(first.world, [definition], noEconomy);
    expect(second.scenes).toHaveLength(1);
    expect(second.scenes[0]).toMatchObject({
      sceneId: 'scene:apprenticeship-offer',
      subjectId: 'person:anna',
      status: 'resolved',
      chosenOutcome: 'accepted',
    });
    expect(second.world.persons['person:anna']!.roles).toContain('apprentice');
    expect(second.events).toHaveLength(1);
    expect(second.events[0]!.immediateText).toBe('Anna is offered an apprenticeship.');
    expect(second.events[0]!.date).toEqual({ year: 1914, month: 1 });
    assertWorldV4(second.world);
  });

  it('resolves a last-chance year-start scene before the age band is left', () => {
    const world = vienna();
    const definition = scene({
      id: 'scene:1912-only',
      stage: 'adulthood',
      ageWindow: { min: 18, max: 70 },
      conditions: [{ kind: 'worldYear', min: 1912, max: 1912 }],
      roles: [],
      outcomes: [
        {
          id: 'last-chance',
          weight: 1,
          immediateText: 'A 1912-only opportunity is taken.',
          effects: [
            {
              type: 'role',
              personId: 'person:josef',
              role: 'last_chance',
              add: true,
              reason: 'taken in 1912',
            },
          ],
        },
      ],
    });

    const result = advanceV4Year(world, [definition], noEconomy);

    expect(result.scenes).toHaveLength(1);
    expect(result.scenes[0]!.date).toEqual({ year: 1912, month: 1 });
    expect(result.events[0]!.date).toEqual({ year: 1912, month: 1 });
    expect(result.world.persons['person:josef']!.roles).toContain('last_chance');
    assertWorldV4(result.world);
  });

  it('funds positive cash effects from an organization and conserves total cash', () => {
    const world = vienna();
    const before = totalMoney(world);
    const definition = scene({
      id: 'scene:bonus',
      stage: 'adulthood',
      ageWindow: { min: 18, max: 70 },
      roles: [{ key: 'subject', kind: 'subject', required: true }],
      outcomes: [
        {
          id: 'paid-bonus',
          weight: 1,
          immediateText: 'The print shop pays Josef a bonus.',
          effects: [
            {
              type: 'cash',
              householdId: 'household:huber',
              amount: 30,
              reason: 'bonus',
            },
          ],
        },
      ],
    });

    const result = advanceV4Year(world, [definition], noEconomy);

    expect(result.events).toHaveLength(1);
    expect(result.world.households['household:huber']!.cash).toBe(70);
    expect(result.world.organizations['org:printshop']!.treasury).toBe(90);
    expect(totalMoney(result.world)).toBeCloseTo(before, 6);
    expect(result.events[0]!.effects).toEqual([
      {
        type: 'cash',
        householdId: 'household:huber',
        amount: 30,
        reason: 'bonus',
      },
    ]);
    assertWorldV4(result.world);
  });

  it('does not mint cash when a positive effect has neither payer nor source reason', () => {
    const world = vienna();
    world.persons['person:josef']!.employment = undefined;
    world.organizations['org:printshop']!.memberIds = [];
    const before = totalMoney(world);

    const definition = scene({
      id: 'scene:unfunded-cash',
      stage: 'adulthood',
      ageWindow: { min: 18, max: 70 },
      roles: [],
      outcomes: [
        {
          id: 'windfall',
          weight: 1,
          immediateText: 'A windfall is claimed.',
          effects: [
            {
              type: 'cash',
              householdId: 'household:huber',
              amount: 50,
              reason: '',
            },
          ],
        },
      ],
    });

    const result = advanceV4Year(world, [definition], noEconomy);

    expect(result.world.households['household:huber']!.cash).toBe(40);
    expect(totalMoney(result.world)).toBeCloseTo(before, 6);
    expect(result.diagnostics.warnings.some((warning) => warning.code === 'unfunded_cash')).toBe(
      true,
    );
    expect(result.events[0]!.effects.some((effect) => effect.type === 'cash')).toBe(false);
    assertWorldV4(result.world);
  });

  it('records a reasoned external inflow for relief cash without an internal payer', () => {
    const world = vienna();
    world.persons['person:josef']!.employment = undefined;
    world.organizations['org:printshop']!.memberIds = [];

    const definition = scene({
      id: 'scene:relief',
      stage: 'adulthood',
      ageWindow: { min: 18, max: 70 },
      roles: [],
      outcomes: [
        {
          id: 'relief-paid',
          weight: 1,
          immediateText: 'The municipal relief office pays six kronen.',
          effects: [
            {
              type: 'cash',
              householdId: 'household:huber',
              amount: 6,
              reason: 'municipal poor relief',
            },
          ],
        },
      ],
    });

    const result = advanceV4Year(world, [definition], noEconomy);

    expect(result.world.households['household:huber']!.cash).toBe(46);
    expect(result.events[0]!.effects).toEqual([
      {
        type: 'cash',
        householdId: 'household:huber',
        amount: 6,
        reason: 'municipal poor relief',
      },
    ]);
    expect(
      result.diagnostics.warnings.some((warning) => warning.code === 'external_cash_inflow'),
    ).toBe(true);
    assertWorldV4(result.world);
  });

  it('makes death a committed, irreversible fact that closes employment and projects', () => {
    const world = vienna();
    const project: Project = {
      id: 'project:print-reform',
      ownerId: 'person:josef',
      kind: 'workplace',
      title: 'Print shop reform',
      participants: [{ personId: 'person:josef', role: 'owner' }],
      placeId: 'place:printshop',
      state: 'active',
      stage: 0,
      required: { people: 1 },
      committed: {},
      deadline: { year: 1914, month: 1 },
      blockers: [],
      causeIds: [],
      history: [],
    };
    world.projects[project.id] = project;
    world.persons['person:josef']!.projectIds.push(project.id);

    const definition = scene({
      id: 'scene:fatal-accident',
      stage: 'adulthood',
      ageWindow: { min: 18, max: 70 },
      roles: [],
      outcomes: [
        {
          id: 'dies',
          weight: 1,
          immediateText: 'Josef is killed by a falling press.',
          effects: [
            {
              type: 'death',
              personId: 'person:josef',
              cause: 'industrial accident',
              reason: 'press accident',
            },
          ],
        },
      ],
    });

    const first = advanceV4Year(world, [definition], noEconomy);

    expect(first.events).toHaveLength(1);
    expect(first.events[0]!.effects[0]).toMatchObject({
      type: 'death',
      personId: 'person:josef',
    });
    expect(first.events[0]!.immediateText).toBe('Josef is killed by a falling press.');
    expect(first.world.persons['person:josef']!.died).toEqual({ year: 1913, month: 1 });
    expect(first.world.persons['person:josef']!.health.vitality).toBe(0);
    expect(first.world.persons['person:josef']!.employment).toBeUndefined();
    expect(first.world.organizations['org:printshop']!.memberIds).not.toContain('person:josef');
    expect(first.world.projects[project.id]!.state).toBe('failed');
    expect(first.world.projects[project.id]!.blockers).toContain('owner_died');
    expect(first.world.projects[project.id]!.causeIds).toContain(first.events[0]!.id);

    const second = advanceV4Year(first.world, [definition], noEconomy);

    expect(second.events).toHaveLength(0);
    expect(second.scenes).toHaveLength(0);
    expect(second.world.events).toHaveLength(1);
    expect(second.world.persons['person:josef']!.died).toEqual({ year: 1913, month: 1 });
    expect(second.world.persons['person:josef']!.employment).toBeUndefined();
    assertWorldV4(second.world);
  });

  it('is deterministic, input-immutable, and filters outcome conditions with seed-based weights', () => {
    const definition = scene({
      id: 'scene:weighted-family-event',
      stage: 'adulthood',
      ageWindow: { min: 18, max: 70 },
      roles: [{ key: 'guardian', kind: 'guardian', required: false }],
      outcomes: [
        {
          id: 'quiet-evening',
          weight: 1,
          immediateText: 'The family spends a quiet evening at home.',
          effects: [],
        },
        {
          id: 'union-meeting',
          weight: 3,
          immediateText: 'Josef attends a union meeting.',
          effects: [
            {
              type: 'role',
              personId: 'person:josef',
              role: 'union_member',
              add: true,
              reason: 'meeting',
            },
          ],
        },
        {
          id: 'impossible',
          weight: 100,
          conditions: [{ kind: 'cash', min: 9999 }],
          immediateText: 'This outcome must never be selected.',
          effects: [],
        },
      ],
    });

    const firstWorld = vienna();
    const secondWorld = vienna();
    const firstSnapshot = JSON.stringify(firstWorld);
    const secondSnapshot = JSON.stringify(secondWorld);

    const first = advanceV4Year(firstWorld, [definition]);
    const second = advanceV4Year(secondWorld, [definition]);

    expect(first).toEqual(second);
    expect(JSON.stringify(firstWorld)).toBe(firstSnapshot);
    expect(JSON.stringify(secondWorld)).toBe(secondSnapshot);
    expect(first.events).toHaveLength(1);
    expect(first.events[0]!.action).toMatch(
      /scene:weighted-family-event\/(quiet-evening|union-meeting)$/,
    );
    expect(first.events[0]!.action).not.toContain('impossible');
    assertWorldV4(first.world);
  });

  it('enforces cooldownYears on resolved scenes', () => {
    const world = vienna();
    const definition = scene({
      id: 'scene:annual-visit',
      stage: 'adulthood',
      ageWindow: { min: 18, max: 70 },
      roles: [],
      cooldownYears: 2,
      outcomes: [
        {
          id: 'visit',
          weight: 1,
          immediateText: 'A relative visits the Huber flat.',
          effects: [],
        },
      ],
    });

    const first = advanceV4Year(world, [definition], noEconomy); // target 1913
    const second = advanceV4Year(first.world, [definition], noEconomy); // target 1914
    const third = advanceV4Year(second.world, [definition], noEconomy); // target 1915

    expect(first.scenes).toHaveLength(1);
    expect(second.scenes).toHaveLength(0);
    expect(second.events).toHaveLength(0);
    expect(third.scenes).toHaveLength(1);
    expect(
      third.world.scenes.filter(
        (instance) => instance.sceneId === 'scene:annual-visit' && instance.status === 'resolved',
      ),
    ).toHaveLength(2);
    expect(third.world.events).toHaveLength(2);
    assertWorldV4(third.world);
  });

  it('resolves a oncePerPerson scene only once for the same person', () => {
    const world = vienna();
    const definition = scene({
      id: 'scene:once-in-a-life',
      stage: 'adulthood',
      ageWindow: { min: 18, max: 70 },
      roles: [],
      oncePerPerson: true,
      outcomes: [
        {
          id: 'memorable-day',
          weight: 1,
          immediateText: 'Josef has a day he will remember.',
          effects: [],
        },
      ],
    });

    const first = advanceV4Year(world, [definition], noEconomy);
    const second = advanceV4Year(first.world, [definition], noEconomy);

    expect(first.scenes.filter((instance) => instance.status === 'resolved')).toHaveLength(1);
    expect(second.scenes).toHaveLength(0);
    expect(second.events).toHaveLength(0);
    expect(
      second.world.scenes.filter(
        (instance) => instance.sceneId === 'scene:once-in-a-life' && instance.status === 'resolved',
      ),
    ).toHaveLength(1);
    assertWorldV4(second.world);
  });

  it('advances or fails due projects and expires pending interactions with system facts', () => {
    const world = vienna();
    const progressing: Project = {
      id: 'project:progress',
      ownerId: 'person:josef',
      kind: 'workplace',
      title: 'Progressing project',
      participants: [{ personId: 'person:josef', role: 'owner' }],
      placeId: 'place:printshop',
      state: 'active',
      stage: 0,
      required: { people: 1 },
      committed: {},
      deadline: { year: 1913, month: 1 },
      blockers: [],
      causeIds: [],
      history: [],
    };
    const failing: Project = {
      ...structuredClone(progressing),
      id: 'project:failing',
      title: 'Failing project',
      required: { people: 3 },
    };
    const pending: Interaction = {
      id: 'interaction:request',
      initiatorId: 'person:josef',
      counterpartyIds: ['person:anna'],
      kind: 'request',
      subject: 'School fees',
      status: 'pending',
      created: { year: 1912, month: 1 },
      due: { year: 1912, month: 12 },
      proposal: { amount: 5 },
      responses: [],
      visibility: 'private',
    };
    world.projects[progressing.id] = progressing;
    world.projects[failing.id] = failing;
    world.interactions[pending.id] = pending;
    world.persons['person:josef']!.projectIds.push(progressing.id, failing.id);

    const result = advanceV4Year(world, [], noEconomy);

    expect(result.events.map((event) => event.action).sort()).toEqual([
      'interaction_expired',
      'project_failed',
      'project_progressed',
    ]);
    expect(result.events.every((event) => event.immediateText === '')).toBe(true);
    expect(result.world.projects[progressing.id]).toMatchObject({
      state: 'active',
      stage: 1,
      deadline: { year: 1914, month: 1 },
    });
    expect(result.world.projects[failing.id]).toMatchObject({ state: 'failed' });
    expect(result.world.projects[failing.id]!.blockers).toContain('insufficient_participants');
    expect(result.world.interactions[pending.id]!.status).toBe('expired');
    expect(
      result.events.find((event) => event.action === 'interaction_expired')!.effects[0],
    ).toMatchObject({ type: 'interaction' });
    assertWorldV4(result.world);
  });

  it('applies education, employment, relation, role, move, project and interaction effects', () => {
    const world = vienna();
    const definition = scene({
      id: 'scene:promotion',
      stage: 'adulthood',
      ageWindow: { min: 30, max: 40 },
      roles: [],
      outcomes: [
        {
          id: 'promoted',
          weight: 1,
          immediateText: 'Josef is promoted and starts night school.',
          effects: [
            {
              type: 'education',
              personId: 'person:josef',
              status: 'secondary',
              level: 3,
              placeId: 'place:school',
              reason: 'night school',
            },
            {
              type: 'employment',
              personId: 'person:josef',
              organizationId: 'org:printshop',
              occupation: 'foreman',
              wage: 12,
              workplaceId: 'place:printshop',
              reason: 'promotion',
            },
            {
              type: 'relation',
              a: 'person:josef',
              b: 'person:anna',
              kind: 'kin',
              trust: 0.3,
              affection: 0.2,
              reason: 'time together',
            },
            {
              type: 'role',
              personId: 'person:josef',
              role: 'foreman',
              add: true,
              reason: 'promotion',
            },
            {
              type: 'move',
              personId: 'person:josef',
              locationId: 'place:school',
              reason: 'night school',
            },
            {
              type: 'food',
              householdId: 'household:huber',
              amount: 6,
              reason: 'union relief',
            },
            {
              type: 'health',
              personId: 'person:josef',
              amount: 0.05,
              reason: 'better meals',
            },
            {
              type: 'project',
              project: {
                id: 'project:night-school',
                ownerId: 'person:josef',
                kind: 'education',
                title: 'Night school',
                participants: [{ personId: 'person:josef', role: 'student' }],
                placeId: 'place:school',
                state: 'active',
                stage: 0,
                required: { people: 1 },
                committed: {},
                deadline: { year: 1914, month: 6 },
                blockers: [],
                causeIds: [],
                history: [],
              },
            },
            {
              type: 'interaction',
              interaction: {
                id: 'interaction:school-offer',
                initiatorId: 'person:josef',
                counterpartyIds: ['person:anna'],
                kind: 'offer',
                subject: 'School papers',
                status: 'pending',
                created: { year: 1913, month: 1 },
                due: { year: 1914, month: 6 },
                proposal: { school: 'place:school' },
                responses: [],
                visibility: 'private',
              },
            },
          ],
        },
      ],
    });

    const result = advanceV4Year(world, [definition], noEconomy);
    const josef = result.world.persons['person:josef']!;
    const relation = result.world.relations['rel:person:josef:person:anna:kin']!;

    expect(result.events).toHaveLength(1);
    expect(result.events[0]!.effects.map((effect) => effect.type)).toEqual([
      'education',
      'employment',
      'relation',
      'role',
      'move',
      'food',
      'health',
      'project',
      'interaction',
    ]);
    expect(josef.education).toMatchObject({ status: 'secondary', level: 3 });
    expect(josef.employment).toMatchObject({ occupation: 'foreman', wage: 12 });
    expect(relation).toMatchObject({ trust: 0.3, affection: 0.2 });
    expect(josef.roles).toContain('foreman');
    expect(josef.locationId).toBe('place:school');
    expect(result.world.households['household:huber']!.food).toBe(36);
    expect(josef.health.vitality).toBeCloseTo(0.95, 6);
    expect(result.world.projects['project:night-school']!.state).toBe('active');
    expect(result.world.interactions['interaction:school-offer']!.status).toBe('pending');
    assertWorldV4(result.world);
  });

  it('pays only what treasury holds and never creates money through wages', () => {
    const world = vienna();
    world.organizations['org:printshop']!.treasury = 50;
    world.households['household:huber']!.rent = 0;
    world.households['household:huber']!.food = 100;
    const before = totalMoney(world);

    const result = advanceV4Year(world, []);

    expect(result.diagnostics.economy.months).toBe(12);
    expect(result.diagnostics.economy.wagesPaid).toBe(50);
    expect(result.diagnostics.economy.wagesUnpaid).toBe(70);
    expect(result.world.households['household:huber']!.cash).toBe(90);
    expect(result.world.organizations['org:printshop']!.treasury).toBe(0);
    expect(totalMoney(result.world)).toBeCloseTo(before, 6);
    expect(result.world.households['household:huber']!.food).toBe(76);
    assertWorldV4(result.world);
  });

  it('routes rent to the residence owner and keeps total cash conserved', () => {
    const world = vienna();
    const landlord = organization({
      id: 'org:landlord',
      kind: 'other',
      placeId: 'place:home',
      treasury: 0,
    });
    world.organizations[landlord.id] = landlord;
    world.places['place:home']!.ownershipOrganizationId = landlord.id;
    world.persons['person:josef']!.employment = undefined;
    world.organizations['org:printshop']!.memberIds = [];
    const household = world.households['household:huber']!;
    household.cash = 100;
    household.food = 100;
    household.obligations = [{ id: 'ob-rent', kind: 'rent', amount: 2 }];
    const before = totalMoney(world);

    const result = advanceV4Year(world, []);

    expect(result.diagnostics.economy.rentPaid).toBe(24);
    expect(result.world.households['household:huber']!.cash).toBe(76);
    expect(result.world.organizations[landlord.id]!.treasury).toBe(24);
    expect(result.world.households['household:huber']!.debt).toBe(0);
    expect(totalMoney(result.world)).toBeCloseTo(before, 6);
    assertWorldV4(result.world);
  });

  it('uses explicit food obligations as a monthly food budget', () => {
    const world = vienna();
    const josef = world.persons['person:josef']!;
    josef.employment = undefined;
    world.organizations['org:printshop']!.memberIds = [];
    const household = world.households['household:huber']!;
    household.cash = 100;
    household.food = 0;
    household.rent = 0;
    household.obligations = [{ id: 'ob-food', kind: 'food', amount: 8 }];

    const result = advanceV4Year(world, []);

    expect(result.diagnostics.economy.foodSpent).toBe(96);
    expect(result.diagnostics.economy.foodShortageMonths).toBe(0);
    expect(result.world.households['household:huber']!.cash).toBe(4);
    expect(result.world.households['household:huber']!.food).toBe(0);
    expect(result.diagnostics.deaths).toEqual([]);
    assertWorldV4(result.world);
  });

  it('turns sustained food shortage into failing health and a recorded death', () => {
    const world = vienna();
    world.persons['person:anna']!.parentIds = [];
    world.persons['person:anna']!.guardianIds = [];
    world.persons['person:anna']!.health = { vitality: 0.5, conditions: [], nutrition: 0.5 };
    const josef = world.persons['person:josef']!;
    josef.employment = undefined;
    world.organizations['org:printshop']!.memberIds = [];
    const household = world.households['household:huber']!;
    household.memberIds = ['person:anna'];
    household.guardianIds = [];
    household.cash = 0;
    household.food = 0;
    household.rent = 1;

    const result = advanceV4Year(world, []);

    expect(result.diagnostics.deaths).toEqual(['person:anna']);
    expect(result.diagnostics.economy.foodShortageMonths).toBe(10);
    expect(result.world.persons['person:anna']!.died).toEqual({ year: 1912, month: 11 });
    expect(result.world.persons['person:anna']!.deathCause).toBe('vitality_exhausted');
    expect(result.world.persons['person:anna']!.health.vitality).toBe(0);
    expect(result.world.households['household:huber']!.debt).toBe(12);
    expect(result.events).toHaveLength(1);
    expect(result.events[0]).toMatchObject({
      action: 'death',
      subjectId: 'person:anna',
      immediateText: 'Anna Huber因长期饥饿和虚弱，在一个没有食物的月份里去世。',
    });
    expect(result.events[0]!.effects[0]).toMatchObject({
      type: 'death',
      personId: 'person:anna',
    });
    assertWorldV4(result.world);
  });

  it('does not resolve a cast-restricted scene for a player-born subject', () => {
    const world = vienna();
    const restricted = scene({
      id: 'authored:only-anna',
      stage: 'childhood',
      ageWindow: { min: 11, max: 11 },
      subjectIds: ['person:josef'],
      conditions: [{ kind: 'age', min: 11, max: 11 }],
    });
    const result = advanceV4Year(world, [restricted], noEconomy);
    expect(result.events).toHaveLength(0);
    expect(result.scenes.some((instance) => instance.subjectId === 'person:anna')).toBe(false);
    expect(
      result.scenes.some(
        (instance) => instance.sceneId === 'authored:only-anna' && instance.status === 'resolved',
      ),
    ).toBe(false);
  });

  it('binds role-relative effects to the actual subject and household', () => {
    const world = vienna();
    const beforeCash = world.households['household:huber']!.cash;
    const beforeVitality = world.persons['person:anna']!.health.vitality;
    const relative = scene({
      id: 'universal:relative-care',
      stage: 'childhood',
      ageWindow: { min: 11, max: 11 },
      roles: [{ key: 'guardian', kind: 'guardian', required: true, minAge: 20 }],
      conditions: [{ kind: 'age', min: 11, max: 11 }],
      outcomes: [
        {
          id: 'care',
          weight: 1,
          immediateText: '{guardian} paid for care at {place}; {subject} was treated.',
          effects: [
            { type: 'cash', householdId: '$household', amount: -5, reason: 'care' },
            { type: 'health', personId: '$subject', amount: -0.1, reason: 'illness' },
            {
              type: 'relation',
              a: '$subject',
              b: '$guardian',
              kind: 'kin',
              trust: 0.05,
              reason: 'care',
            },
          ],
        },
      ],
    });
    const result = advanceV4Year(world, [relative], noEconomy);
    const event = result.events.find((item) => item.action === 'universal:relative-care/care');
    expect(event).toBeDefined();
    expect(result.world.households['household:huber']!.cash).toBe(beforeCash - 5);
    expect(result.world.persons['person:anna']!.health.vitality).toBeCloseTo(beforeVitality - 0.1);
    expect(event!.effects).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'cash', householdId: 'household:huber' }),
        expect.objectContaining({ type: 'health', personId: 'person:anna' }),
        expect.objectContaining({
          type: 'relation',
          a: 'person:anna',
          b: 'person:josef',
        }),
      ]),
    );
    expect(event!.immediateText).toBe(
      'Josef Huber paid for care at Huber flat; Anna Huber was treated.',
    );
    expect(JSON.stringify(event!.effects)).not.toContain('$');
    assertWorldV4(result.world);
  });

  it('moves a partner into the household and creates a child with a birth fact', () => {
    const world = vienna();
    const anna = world.persons['person:anna']!;
    anna.born = { year: 1888, month: 1 };
    anna.parentIds = [];
    anna.guardianIds = [];
    anna.householdId = 'household:huber';
    world.households['household:other'] = {
      id: 'household:other',
      residenceId: 'place:cafe',
      memberIds: ['person:partner'],
      guardianIds: [],
      cash: 20,
      food: 5,
      debt: 0,
      rent: 1,
      obligations: [],
      assets: [],
      sharingRules: 'separate',
    };
    world.persons['person:partner'] = {
      ...structuredClone(world.persons['person:josef']!),
      id: 'person:partner',
      name: 'Otto Partner',
      sex: 'male',
      born: { year: 1885, month: 3 },
      householdId: 'household:other',
      locationId: 'place:cafe',
      parentIds: [],
      guardianIds: [],
      employment: undefined,
      roles: [],
      relationshipIds: [],
    };
    const family = scene({
      id: 'universal:family-formation',
      stage: 'adulthood',
      ageWindow: { min: 18, max: 45 },
      roles: [
        { key: 'subject', kind: 'subject', required: true, minAge: 18, maxAge: 45, sex: 'female' },
        { key: 'partner', kind: 'partner', required: true, minAge: 18, maxAge: 45, sex: 'male' },
      ],
      conditions: [{ kind: 'age', min: 18, max: 45 }],
      outcomes: [
        {
          id: 'marry-and-child',
          weight: 1,
          immediateText: '{subject}和{partner}搬进同一间住处，第二年有了一个女儿。',
          effects: [
            {
              type: 'household',
              personId: '$partner',
              householdId: '$household',
              reason: 'moved in together',
            },
            {
              type: 'relation',
              a: '$subject',
              b: '$partner',
              kind: 'partner',
              trust: 0.1,
              affection: 0.1,
              reason: 'partnership',
            },
            {
              type: 'birth',
              parentIds: ['$subject', '$partner'],
              childSex: 'female',
              reason: 'child born to the household',
            },
          ],
        },
      ],
    });
    const result = advanceV4Year(world, [family], noEconomy);
    const event = result.events.find((item) =>
      item.action.startsWith('universal:family-formation/marry-and-child'),
    );
    expect(event).toBeDefined();
    const birthEffect = event!.effects.find((effect) => effect.type === 'birth');
    expect(birthEffect).toBeDefined();
    if (birthEffect?.type !== 'birth') throw new Error('missing birth effect');
    expect(birthEffect.childId).toBeTruthy();
    const child = result.world.persons[birthEffect.childId!]!;
    expect(child.name).toBe(birthEffect.childName);
    expect(child.parentIds.sort()).toEqual(['person:anna', 'person:partner']);
    expect(child.householdId).toBe('household:huber');
    expect(result.world.households['household:huber']!.memberIds).toContain(child.id);
    expect(result.world.households['household:other']!.memberIds).not.toContain('person:partner');
    expect(result.world.persons['person:partner']!.householdId).toBe('household:huber');
    const birthFact = result.events.find(
      (item) => item.action === 'birth' && item.subjectId === child.id,
    );
    expect(birthFact).toBeDefined();
    expect(birthFact!.causes).toEqual([event!.id]);
    expect(birthFact!.immediateText).toContain(child.name);
    expect(result.world.relations[child.relationshipIds[0]!]).toBeDefined();
    assertWorldV4(result.world);
  });

  it('runs multiple ordinary events per year and respects rates', () => {
    const world = vienna();
    const one = scene({
      id: 'event:one',
      stage: 'childhood',
      ageWindow: { min: 11, max: 11 },
      rate: 1,
      weight: 1,
      conditions: [{ kind: 'age', min: 11, max: 11 }],
    });
    const two = scene({
      id: 'event:two',
      stage: 'childhood',
      ageWindow: { min: 11, max: 11 },
      rate: 1,
      weight: 1,
      conditions: [{ kind: 'age', min: 11, max: 11 }],
    });
    const never = scene({
      id: 'event:never',
      stage: 'childhood',
      ageWindow: { min: 11, max: 11 },
      rate: 0,
      conditions: [{ kind: 'age', min: 11, max: 11 }],
    });
    const result = advanceV4Year(world, [one, two, never], {
      economy: { enabled: false },
      eventRuntime: true,
      maxOrdinaryEventsPerPerson: 2,
    });
    const ids = result.events.map((event) => event.action.split('/')[0]);
    expect(ids).toContain('event:one');
    expect(ids).toContain('event:two');
    expect(ids).not.toContain('event:never');
    expect(result.events.filter((event) => event.subjectId === 'person:anna')).toHaveLength(2);
  });

  it('processes followup events from the queue even when their rate is zero', () => {
    const world = vienna();
    const first = scene({
      id: 'event:first',
      stage: 'childhood',
      ageWindow: { min: 11, max: 11 },
      rate: 1,
      conditions: [{ kind: 'age', min: 11, max: 11 }],
      outcomes: [
        {
          id: 'triggers-next',
          weight: 1,
          immediateText: 'The first event happened.',
          effects: [],
          followupSceneIds: ['event:second'],
        },
      ],
    });
    const second = scene({
      id: 'event:second',
      stage: 'adolescence',
      ageWindow: { min: 12, max: 12 },
      rate: 0,
      conditions: [{ kind: 'age', min: 11, max: 12 }],
      outcomes: [
        {
          id: 'followed',
          weight: 1,
          immediateText: 'The followup happened a year later.',
          effects: [],
        },
      ],
    });
    const firstYear = advanceV4Year(world, [first, second], {
      economy: { enabled: false },
      eventRuntime: true,
      maxOrdinaryEventsPerPerson: 2,
    });
    expect(firstYear.events.some((event) => event.action.startsWith('event:first/'))).toBe(true);
    expect(firstYear.world.historyMeta.scheduledEvents?.length).toBeGreaterThan(0);
    const secondYear = advanceV4Year(firstYear.world, [first, second], {
      economy: { enabled: false },
      eventRuntime: true,
      maxOrdinaryEventsPerPerson: 2,
    });
    expect(secondYear.events.some((event) => event.action.startsWith('event:second/'))).toBe(true);
    expect(
      secondYear.events.find((event) => event.action.startsWith('event:second/'))?.causes,
    ).toEqual([firstYear.events.find((event) => event.action.startsWith('event:first/'))?.id]);
  });

  it('commits an independent partner response and only then changes the household', () => {
    const world = vienna();
    const anna = world.persons['person:anna']!;
    anna.born = { year: 1888, month: 1 };
    anna.parentIds = [];
    anna.guardianIds = [];
    world.households['household:other'] = {
      id: 'household:other',
      residenceId: 'place:cafe',
      memberIds: ['person:partner'],
      guardianIds: [],
      cash: 10,
      food: 3,
      debt: 0,
      rent: 1,
      obligations: [],
      assets: [],
      sharingRules: 'separate',
    };
    world.persons['person:partner'] = {
      ...structuredClone(world.persons['person:josef']!),
      id: 'person:partner',
      name: 'Otto Partner',
      born: { year: 1885, month: 3 },
      householdId: 'household:other',
      locationId: 'place:cafe',
      parentIds: [],
      guardianIds: [],
      employment: undefined,
      roles: [],
      relationshipIds: [],
    };
    const offer = scene({
      id: 'action:courtship',
      stage: 'adulthood',
      ageWindow: { min: 18, max: 45 },
      rate: 1,
      roles: [
        { key: 'subject', kind: 'subject', required: true, minAge: 18, maxAge: 45, sex: 'female' },
        { key: 'partner', kind: 'partner', required: true, minAge: 18, maxAge: 45 },
      ],
      conditions: [{ kind: 'age', min: 18, max: 45 }],
      outcomes: [
        {
          id: 'ask',
          weight: 1,
          immediateText: '{subject} asks {partner} to share a household.',
          effects: [
            {
              type: 'interaction',
              interaction: {
                id: 'courtship:$eventId',
                initiatorId: '$subject',
                counterpartyIds: ['$partner'],
                kind: 'proposal',
                subject: 'share a household',
                status: 'pending',
                created: { year: 1, month: 1 },
                proposal: {
                  acceptIf: { chance: 1 },
                  acceptText: '{counterparty} agrees to move in with {subject}.',
                  rejectText: '{counterparty} refuses.',
                  acceptEffects: [
                    {
                      type: 'relation',
                      a: '$subject',
                      b: '$counterparty',
                      kind: 'partner',
                      trust: 0.1,
                      reason: 'accepted',
                    },
                    {
                      type: 'household',
                      personId: '$counterparty',
                      householdId: '$household',
                      reason: 'moved in',
                    },
                  ],
                  rejectEffects: [],
                },
                responses: [],
                visibility: 'participants',
              },
            },
          ],
        },
      ],
    });
    const first = advanceV4Year(world, [offer], {
      economy: { enabled: false },
      eventRuntime: true,
      maxOrdinaryEventsPerPerson: 1,
    });
    const pending = Object.values(first.world.interactions)[0];
    expect(pending?.status).toBe('pending');
    expect(first.world.persons['person:partner']!.householdId).toBe('household:other');
    const second = advanceV4Year(first.world, [], {
      economy: { enabled: false },
      eventRuntime: true,
      maxOrdinaryEventsPerPerson: 1,
    });
    expect(second.events.some((event) => event.action === 'interaction_response')).toBe(true);
    expect(second.world.persons['person:partner']!.householdId).toBe('household:huber');
    expect(
      Object.values(second.world.relations).some(
        (relation) =>
          relation.kind === 'partner' &&
          ((relation.a === 'person:anna' && relation.b === 'person:partner') ||
            (relation.a === 'person:partner' && relation.b === 'person:anna')),
      ),
    ).toBe(true);
    assertWorldV4(second.world);
  });

  it('settles an extinct household to a living heir', () => {
    const world = vienna();
    world.households['household:alone'] = {
      id: 'household:alone',
      residenceId: 'place:home',
      memberIds: ['person:parent'],
      guardianIds: [],
      cash: 60,
      food: 1,
      debt: 0,
      rent: 1,
      obligations: [],
      assets: [],
      sharingRules: 'separate',
    };
    world.households['household:heir'] = {
      id: 'household:heir',
      residenceId: 'place:cafe',
      memberIds: ['person:heir'],
      guardianIds: [],
      cash: 0,
      food: 1,
      debt: 0,
      rent: 1,
      obligations: [],
      assets: [],
      sharingRules: 'separate',
    };
    const base = structuredClone(world.persons['person:josef']!);
    world.persons['person:parent'] = {
      ...base,
      id: 'person:parent',
      name: 'Parent Alone',
      born: { year: 1840, month: 1 },
      householdId: 'household:alone',
      locationId: 'place:home',
      parentIds: [],
      guardianIds: [],
      employment: undefined,
      relationshipIds: [],
      roles: [],
    };
    world.persons['person:heir'] = {
      ...structuredClone(base),
      id: 'person:heir',
      name: 'Adult Heir',
      born: { year: 1880, month: 1 },
      householdId: 'household:heir',
      locationId: 'place:cafe',
      parentIds: ['person:parent'],
      guardianIds: [],
      employment: undefined,
      relationshipIds: [],
      roles: [],
    };
    world.relations['rel:parent:heir:kin'] = {
      id: 'rel:parent:heir:kin',
      a: 'person:parent',
      b: 'person:heir',
      kind: 'kin',
      trust: 0.5,
      affection: 0.5,
      obligation: 0.5,
      fear: 0,
      respect: 0.5,
      start: { year: 1900, month: 1 },
      sharedEventIds: [],
    };
    const deathScene = scene({
      id: 'test:death',
      stage: 'elderhood',
      ageWindow: { min: 60, max: 90 },
      subjectIds: ['person:parent'],
      roles: [{ key: 'subject', kind: 'subject', required: true, minAge: 60, maxAge: 90 }],
      conditions: [{ kind: 'age', min: 60, max: 90 }],
      outcomes: [
        {
          id: 'die',
          weight: 1,
          immediateText: 'Parent Alone died.',
          effects: [{ type: 'death', personId: '$subject', cause: 'test', reason: 'test' }],
        },
      ],
    });
    const result = advanceV4Year(world, [deathScene], noEconomy);
    expect(result.world.persons['person:parent']!.died).toBeDefined();
    expect(result.world.households['household:alone']!.cash).toBe(0);
    expect(result.world.households['household:heir']!.cash).toBe(60);
    expect(result.events[0]!.effects[0]).toMatchObject({
      type: 'death',
      estateTo: 'household:heir',
      estateAmount: 60,
    });
    assertWorldV4(result.world);
  });

  it('ends a relation and moves a household residence with typed effects', () => {
    const world = vienna();
    world.relations['rel:anna:josef:partner'] = {
      id: 'rel:anna:josef:partner',
      a: 'person:anna',
      b: 'person:josef',
      kind: 'partner',
      trust: 0.5,
      affection: 0.5,
      obligation: 0.5,
      fear: 0,
      respect: 0.5,
      start: { year: 1910, month: 1 },
      sharedEventIds: [],
    };
    const sceneWithEffects = scene({
      id: 'test:social-change',
      stage: 'childhood',
      ageWindow: { min: 11, max: 11 },
      roles: [{ key: 'subject', kind: 'subject', required: true, minAge: 11, maxAge: 11 }],
      conditions: [{ kind: 'age', min: 11, max: 11 }],
      outcomes: [
        {
          id: 'change',
          weight: 1,
          immediateText: 'A household changed.',
          effects: [
            {
              type: 'relation_end',
              a: 'person:anna',
              b: 'person:josef',
              kind: 'partner',
              reason: 'test separation',
            },
            {
              type: 'residence',
              householdId: 'household:huber',
              residenceId: 'place:cafe',
              reason: 'test move',
            },
          ],
        },
      ],
    });
    const result = advanceV4Year(world, [sceneWithEffects], noEconomy);
    expect(result.world.relations['rel:anna:josef:partner']!.end).toEqual({ year: 1913, month: 1 });
    expect(result.world.households['household:huber']!.residenceId).toBe('place:cafe');
    expect(result.world.persons['person:anna']!.locationId).toBe('place:cafe');
    assertWorldV4(result.world);
  });

  it('schedules a followup for an explicit role rather than the original subject', () => {
    const world = vienna();
    const original = scene({
      id: 'test:explicit-followup-source',
      stage: 'childhood',
      ageWindow: { min: 11, max: 11 },
      rate: 1,
      roles: [
        { key: 'subject', kind: 'subject', required: true, minAge: 11, maxAge: 11 },
        { key: 'guardian', kind: 'guardian', required: true, minAge: 25, maxAge: 60 },
      ],
      conditions: [{ kind: 'age', min: 11, max: 11 }],
      outcomes: [
        {
          id: 'trigger',
          weight: 1,
          immediateText: 'The guardian is asked to answer later.',
          effects: [],
          followupTargets: [{ sceneId: 'test:explicit-followup-target', subjectRole: 'guardian' }],
        },
      ],
    });
    const target = scene({
      id: 'test:explicit-followup-target',
      stage: 'adulthood',
      ageWindow: { min: 25, max: 60 },
      rate: 0,
      roles: [{ key: 'subject', kind: 'subject', required: true, minAge: 25, maxAge: 60 }],
      conditions: [{ kind: 'age', min: 25, max: 60 }],
      outcomes: [
        {
          id: 'answer',
          weight: 1,
          immediateText: 'The guardian answered the request.',
          effects: [],
        },
      ],
    });
    const first = advanceV4Year(world, [original, target], {
      economy: { enabled: false },
      eventRuntime: true,
      maxOrdinaryEventsPerPerson: 2,
    });
    expect(first.world.historyMeta.scheduledEvents?.[0]?.subjectId).toBe('person:josef');
    const second = advanceV4Year(first.world, [original, target], {
      economy: { enabled: false },
      eventRuntime: true,
      maxOrdinaryEventsPerPerson: 2,
    });
    const response = second.events.find((event) =>
      event.action.startsWith('test:explicit-followup-target/'),
    );
    expect(response?.subjectId).toBe('person:josef');
    expect(response?.causes).toEqual([
      first.events.find((event) => event.action.startsWith('test:explicit-followup-source/'))?.id,
    ]);
  });
});
