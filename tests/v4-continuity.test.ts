import { describe, expect, it } from 'vitest';
import { advanceV4Year, auditCandidatePools } from '../packages/v4/engine.js';
import type { EventFact, SceneDefinition, WorldState } from '../packages/v4/domain.js';
import { refreshAgencyGoal } from '../packages/v4/agency.js';
import { taskUtility } from '../packages/v4/tasks.js';
import { recipe, taskMeta } from '../packages/v4/content/kernels/recipes/kit.js';
import { VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';

function traits() {
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

function world(): WorldState {
  return {
    id: 'world:continuity',
    seed: 'continuity',
    date: { year: 1912, month: 1 },
    timePolicy: { secondsPerYear: 3600, monthsPerTick: 12 },
    places: {
      'place:home': {
        id: 'place:home',
        name: 'Huber flat',
        kind: 'home',
        settlementId: 'settlement:vienna',
        offers: [],
      },
      'place:printshop': {
        id: 'place:printshop',
        name: 'Print shop',
        kind: 'factory',
        settlementId: 'settlement:vienna',
        offers: [],
      },
      'place:school': {
        id: 'place:school',
        name: 'District school',
        kind: 'school',
        settlementId: 'settlement:vienna',
        offers: [],
      },
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
      'org:printshop': {
        id: 'org:printshop',
        name: 'Print shop',
        kind: 'factory',
        placeId: 'place:printshop',
        memberIds: ['person:josef'],
        positions: [],
        treasury: 120,
        authorityRules: [],
        projects: [],
        status: 'active',
        causeIds: [],
      },
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

const noEconomy = { economy: { enabled: false }, eventRuntime: true, statisticalModel: false };

describe('Phase 14 life continuity', () => {
  it('gates a later scene on a tagged past fact and records the matched event', () => {
    let current = world();
    const mentorship = scene({
      id: 'test:mentorship',
      stage: 'childhood',
      ageWindow: { min: 10, max: 11 },
      rate: 1,
      tags: ['mentorship', 'school'],
      roles: [
        { key: 'subject', kind: 'subject', required: true, minAge: 10, maxAge: 11 },
        { key: 'mentor', kind: 'neighbor', required: true, minAge: 18, maxAge: 70 },
      ],
      conditions: [{ kind: 'age', min: 10, max: 11 }],
      outcomes: [
        {
          id: 'taught',
          weight: 1,
          immediateText: '{mentor}教{subject}辨认铅字。',
          effects: [
            {
              type: 'relation',
              a: '$subject',
              b: '$mentor',
              kind: 'friend',
              trust: 0.1,
              reason: 'mentorship',
            },
          ],
        },
      ],
    });
    const echo = scene({
      id: 'test:mentorship-echo',
      stage: 'adolescence',
      ageWindow: { min: 12, max: 13 },
      rate: 1,
      tags: ['reunion'],
      roles: [
        { key: 'subject', kind: 'subject', required: true, minAge: 12, maxAge: 13 },
        {
          key: 'oldMentor',
          kind: 'neighbor',
          required: true,
          minAge: 18,
          maxAge: 70,
          sharedHistoryTag: 'mentorship',
        },
      ],
      conditions: [
        { kind: 'age', min: 12, max: 13 },
        { kind: 'history', tag: 'mentorship', withinYears: 3 },
      ],
      outcomes: [
        {
          id: 'recognized',
          weight: 1,
          immediateText: '{oldMentor}在门口认出{subject}，问起那副旧铅字。',
          effects: [
            {
              type: 'flag',
              personId: '$subject',
              flag: 'mentor_reunion',
              add: true,
              reason: 'reunion',
            },
          ],
        },
      ],
    });
    const first = advanceV4Year(current, [mentorship], {
      ...noEconomy,
      maxOrdinaryEventsPerPerson: 2,
    });
    const firstEvent = first.events.find((event) => event.action.startsWith('test:mentorship/'))!;
    expect(firstEvent.tags).toContain('mentorship');
    expect(first.events.some((event) => event.action.startsWith('test:mentorship-echo/'))).toBe(
      false,
    );
    const second = advanceV4Year(first.world, [mentorship, echo], {
      ...noEconomy,
      maxOrdinaryEventsPerPerson: 2,
    });
    const echoEvent = second.events.find((event) =>
      event.action.startsWith('test:mentorship-echo/'),
    )!;
    expect(echoEvent).toBeDefined();
    expect(echoEvent.historyRefs).toContain(firstEvent.id);
    expect(
      echoEvent.participants.find((participant) => participant.role === 'oldMentor')?.personId,
    ).toBe(firstEvent.participants.find((participant) => participant.role === 'mentor')?.personId);
  });

  it('lets a task target a person from shared history rather than recasting a stranger', () => {
    let current = world();
    const meeting = scene({
      id: 'test:shared-work',
      stage: 'childhood',
      ageWindow: { min: 10, max: 11 },
      rate: 1,
      tags: ['shared_work'],
      roles: [
        { key: 'subject', kind: 'subject', required: true, minAge: 10, maxAge: 11 },
        { key: 'mate', kind: 'worker', required: true, minAge: 18, maxAge: 60 },
      ],
      conditions: [{ kind: 'age', min: 10, max: 11 }],
      outcomes: [
        {
          id: 'worked',
          weight: 1,
          immediateText: '{subject}和{mate}搬完一箱铅字。',
          effects: [],
        },
      ],
    });
    const reunion = scene({
      id: 'test:old-mate-task',
      stage: 'adolescence',
      ageWindow: { min: 12, max: 13 },
      rate: 1,
      roles: [
        { key: 'subject', kind: 'subject', required: true, minAge: 12, maxAge: 13 },
        {
          key: 'mate',
          kind: 'worker',
          required: true,
          minAge: 18,
          maxAge: 60,
          sharedHistoryTag: 'shared_work',
        },
      ],
      conditions: [
        { kind: 'age', min: 12, max: 13 },
        { kind: 'history', tag: 'shared_work', includeParticipants: true },
      ],
      outcomes: [
        {
          id: 'met-again',
          weight: 1,
          immediateText: '{mate}在街角叫住{subject}。',
          effects: [],
        },
      ],
    });
    const first = advanceV4Year(current, [meeting], {
      ...noEconomy,
      maxOrdinaryEventsPerPerson: 2,
    });
    const meetingEvent = first.events.find((event) =>
      event.action.startsWith('test:shared-work/'),
    )!;
    expect(meetingEvent.participants.some((participant) => participant.role === 'mate')).toBe(true);
    const second = advanceV4Year(first.world, [reunion], {
      ...noEconomy,
      maxOrdinaryEventsPerPerson: 2,
    });
    const reunionEvent = second.events.find((event) =>
      event.action.startsWith('test:old-mate-task/'),
    )!;
    expect(
      reunionEvent.participants.find((participant) => participant.role === 'mate')?.personId,
    ).toBe(meetingEvent.participants.find((participant) => participant.role === 'mate')?.personId);
  });

  it('updates an agency goal from recent committed experience and keeps a reason', () => {
    const current = world();
    const anna = current.persons['person:anna']!;
    anna.employment = undefined;
    const event: EventFact = {
      id: 'evt:unemployment',
      date: { year: 1911, month: 6 },
      subjectId: anna.id,
      participants: [{ personId: anna.id, role: 'subject' }],
      action: 'test:lost-job/unemployed',
      title: 'Lost job',
      tags: ['unemployment'],
      causes: [],
      effects: [],
      immediateText: 'Anna lost her job.',
      significance: 0.8,
      visibility: 'participants',
      provenance: { kind: 'scene', sourceId: 'test:lost-job' },
    };
    current.events.push(event);
    const goal = refreshAgencyGoal(current, anna, { year: 1912, month: 1 });
    expect(goal.goal).toBe('survival');
    expect(goal.history?.at(-1)?.eventId).toBe(event.id);
  });

  it('keeps a repeated task domain attractive across years', () => {
    const current = world();
    const anna = current.persons['person:anna']!;
    anna.agency = {
      goal: 'knowledge',
      summary: 'study',
      since: { year: 1912, month: 1 },
      focus: {
        domain: 'education',
        taskId: 'task:study',
        since: { year: 1911, month: 1 },
        attempts: 3,
      },
    };
    const task = {
      ...scene({
        id: 'task:study',
        stage: 'childhood',
        ageWindow: { min: 7, max: 14 },
      }),
      task: taskMeta('education', ['knowledge'], ['knowledge'], 0.8, 0.1, ['literacy']),
    } as never;
    const withFocus = taskUtility(current, anna, task, { year: 1912, month: 1 });
    anna.agency.focus = undefined;
    const withoutFocus = taskUtility(current, anna, task, { year: 1912, month: 1 });
    expect(withFocus).toBeGreaterThan(withoutFocus);
  });

  it('carries composed follow-up kernel ids through the recipe compiler', () => {
    const kernel = recipe({
      id: 'test:followup-kernel',
      title: 'Follow-up source',
      domain: 'test',
      stage: 'adulthood',
      ages: [18, 60],
      tags: ['test'],
      outcomes: [
        {
          id: 'source',
          text: '{subject}做了一件事。',
          fx: { flag: 'source_done' },
          followup: { sceneId: 'test:followup-target', delayMonths: 6 },
        },
      ],
    });
    expect(kernel.outcomes[0]!.followupTargets).toEqual([
      { sceneId: 'test:followup-target', delayMonths: 6 },
    ]);
  });
});

describe('Phase 14 mechanics repairs', () => {
  it('repairs an employer-role organization by using its representative person', () => {
    const current = world();
    const anna = current.persons['person:anna']!;
    anna.education.status = 'apprenticeship';
    current.persons['person:josef']!.roles.push('owner');
    const definition = scene({
      id: 'test:employer-relation',
      stage: 'childhood',
      ageWindow: { min: 10, max: 11 },
      rate: 1,
      roles: [
        { key: 'subject', kind: 'subject', required: true, minAge: 10, maxAge: 11 },
        { key: 'employer', kind: 'employer', required: true, organizationKind: 'factory' },
      ],
      conditions: [{ kind: 'age', min: 10, max: 11 }],
      outcomes: [
        {
          id: 'met',
          weight: 1,
          immediateText: '{subject}在印刷所门口见到{employer}。',
          effects: [
            {
              type: 'relation',
              a: '$subject',
              b: '$employer',
              kind: 'employer',
              trust: 0.1,
              reason: 'met the employer',
            },
          ],
        },
      ],
    });
    const result = advanceV4Year(current, [definition], {
      ...noEconomy,
      maxOrdinaryEventsPerPerson: 1,
    });
    const event = result.events.find((entry) =>
      entry.action.startsWith('test:employer-relation/'),
    )!;
    expect(event).toBeDefined();
    const relationEffect = event.effects.find((effect) => effect.type === 'relation');
    expect(
      relationEffect && relationEffect.type === 'relation' ? relationEffect.b : undefined,
    ).toBe('person:josef');
    expect(result.diagnostics.warnings.some((warning) => warning.code === 'invalid_relation')).toBe(
      false,
    );
  });

  it('uses the hiring organization when a worker is named as the employer', () => {
    const current = world();
    const definition = scene({
      id: 'test:hiring-foreman',
      stage: 'childhood',
      ageWindow: { min: 10, max: 11 },
      rate: 1,
      roles: [
        { key: 'subject', kind: 'subject', required: true, minAge: 10, maxAge: 11 },
        { key: 'foreman', kind: 'worker', required: true, minAge: 18, maxAge: 65 },
      ],
      conditions: [{ kind: 'age', min: 10, max: 11 }],
      outcomes: [
        {
          id: 'hired',
          weight: 1,
          immediateText: '{foreman}让{subject}第二天来上工。',
          effects: [
            {
              type: 'employment',
              personId: '$subject',
              organizationId: '$foreman',
              occupation: 'errand boy',
              wage: 2,
              workplaceId: '$workplace',
              reason: 'hired by the foreman',
            },
          ],
        },
      ],
    });
    const result = advanceV4Year(current, [definition], {
      ...noEconomy,
      maxOrdinaryEventsPerPerson: 1,
    });
    const anna = result.world.persons['person:anna']!;
    expect(anna.employment).toBeDefined();
    expect(anna.employment?.organizationId).toBe('org:printshop');
    expect(anna.employment?.workplaceId).toBe('place:printshop');
    expect(
      result.diagnostics.warnings.some((warning) => warning.code === 'unresolved_effect_ref'),
    ).toBe(false);
  });

  it('keeps a knowledge proposition when the optional source was not cast', () => {
    const current = world();
    const definition = scene({
      id: 'test:knowledge-without-source',
      stage: 'childhood',
      ageWindow: { min: 10, max: 11 },
      rate: 1,
      roles: [
        { key: 'subject', kind: 'subject', required: true, minAge: 10, maxAge: 11 },
        { key: 'clerk', kind: 'official', required: false, minAge: 30, maxAge: 65 },
      ],
      conditions: [{ kind: 'age', min: 10, max: 11 }],
      outcomes: [
        {
          id: 'learned',
          weight: 1,
          immediateText: '{subject}在窗口问清了医院药房的开门时间。',
          effects: [
            {
              type: 'knowledge',
              holderId: '$subject',
              proposition: 'the hospital pharmacy opens at two',
              confidence: 0.7,
              sourceKind: 'told',
              personId: '$clerk',
              visibility: 'private',
              trueInWorld: true,
            },
          ],
        },
      ],
    });
    const result = advanceV4Year(current, [definition], {
      ...noEconomy,
      maxOrdinaryEventsPerPerson: 1,
    });
    expect(result.world.persons['person:anna']!.knowledgeIds.length).toBeGreaterThan(0);
    expect(
      result.diagnostics.warnings.some((warning) => warning.code === 'unresolved_effect_ref'),
    ).toBe(false);
  });

  it('resolves an estate heir household and transfers the recorded amount', () => {
    const current = world();
    current.persons['person:josef']!.householdId = 'household:huber';
    current.households['household:other'] = {
      ...current.households['household:huber']!,
      id: 'household:other',
      memberIds: [],
      guardianIds: [],
      cash: 0,
      food: 0,
    };
    const definition = scene({
      id: 'test:estate',
      stage: 'childhood',
      ageWindow: { min: 10, max: 11 },
      rate: 1,
      roles: [{ key: 'subject', kind: 'subject', required: true, minAge: 10, maxAge: 11 }],
      conditions: [{ kind: 'age', min: 10, max: 11 }],
      outcomes: [
        {
          id: 'inherited',
          weight: 1,
          immediateText: '{subject}继承了姑母留下的五克朗。',
          effects: [
            {
              type: 'estate',
              personId: '$subject',
              heirHouseholdId: 'household:other',
              amount: 5,
              reason: 'aunt inheritance',
            },
          ],
        },
      ],
    });
    const result = advanceV4Year(current, [definition], {
      ...noEconomy,
      maxOrdinaryEventsPerPerson: 1,
    });
    expect(result.world.households['household:other']!.cash).toBe(5);
    expect(
      result.diagnostics.warnings.some((warning) => warning.code === 'unresolved_effect_ref'),
    ).toBe(false);
  });
});

describe('Phase 14 ledger integrity', () => {
  it('keeps the committed cash sign and turns a shortfall into household debt', () => {
    const current = world();
    const definition = scene({
      id: 'test:cash-debit',
      stage: 'childhood',
      ageWindow: { min: 10, max: 11 },
      rate: 1,
      roles: [{ key: 'subject', kind: 'subject', required: true, minAge: 10, maxAge: 11 }],
      conditions: [{ kind: 'age', min: 10, max: 11 }],
      outcomes: [
        {
          id: 'paid',
          weight: 1,
          immediateText: '{subject}付了五克朗。',
          effects: [
            { type: 'cash', householdId: '$household', amount: -5, reason: 'a five-krone fee' },
          ],
        },
      ],
    });
    const result = advanceV4Year(current, [definition], {
      ...noEconomy,
      maxOrdinaryEventsPerPerson: 1,
    });
    const event = result.events.find((entry) => entry.action.startsWith('test:cash-debit/'))!;
    const cash = event.effects.find((effect) => effect.type === 'cash');
    expect(cash && cash.type === 'cash' ? cash.amount : undefined).toBe(-5);
    expect(result.world.households['household:huber']!.cash).toBe(35);
    expect(result.world.households['household:huber']!.debt).toBe(0);

    const poor = world();
    poor.households['household:huber']!.cash = 0;
    const short = advanceV4Year(poor, [definition], {
      ...noEconomy,
      maxOrdinaryEventsPerPerson: 1,
    });
    const shortEvent = short.events.find((entry) => entry.action.startsWith('test:cash-debit/'))!;
    const shortCash = shortEvent.effects.find((effect) => effect.type === 'cash');
    expect(shortCash && shortCash.type === 'cash' ? shortCash.amount : undefined).toBe(-5);
    expect(short.world.households['household:huber']!.cash).toBe(0);
    expect(short.world.households['household:huber']!.debt).toBe(5);
  });
});

describe('Phase 14 scheduled tasks', () => {
  it('resolves a due task follow-up even though it has no statistical rate', () => {
    const current = world();
    current.historyMeta.scheduledEvents = [
      {
        id: 'queue:test-task-followup',
        sceneId: 'task:followup',
        subjectId: 'person:anna',
        due: { year: 1912, month: 6 },
        firstDue: { year: 1912, month: 6 },
        depth: 0,
        source: 'followup',
      },
    ];
    const task = {
      ...scene({
        id: 'task:followup',
        stage: 'childhood',
        ageWindow: { min: 10, max: 11 },
        roles: [{ key: 'subject', kind: 'subject', required: true, minAge: 10, maxAge: 11 }],
        conditions: [{ kind: 'age', min: 10, max: 11 }],
        outcomes: [
          {
            id: 'due',
            weight: 1,
            immediateText: '{subject}完成了先前答应的事。',
            effects: [
              {
                type: 'flag',
                personId: '$subject',
                flag: 'scheduled_task_done',
                add: true,
                reason: 'follow-up',
              },
            ],
          },
        ],
      }),
      task: taskMeta('education', ['knowledge'], ['knowledge'], 0.8, 0.1, []),
    } as never;
    const result = advanceV4Year(current, [], {
      ...noEconomy,
      tasks: [task],
      maxOrdinaryEventsPerPerson: 0,
    });
    expect(result.events.some((event) => event.action.startsWith('task:followup/'))).toBe(true);
    expect(result.world.persons['person:anna']!.life?.flags).toContain('scheduled_task_done');
  });
});

describe('Phase 14 commit atomicity', () => {
  it('does not leak cash or flags when a critical move is rejected', () => {
    const current = world();
    current.households['household:empty'] = {
      ...current.households['household:huber']!,
      id: 'household:empty',
      memberIds: [],
      guardianIds: [],
      cash: 0,
      food: 0,
    };
    const definition = scene({
      id: 'test:rejected-move',
      stage: 'childhood',
      ageWindow: { min: 10, max: 11 },
      rate: 1,
      roles: [{ key: 'subject', kind: 'subject', required: true, minAge: 10, maxAge: 11 }],
      conditions: [{ kind: 'age', min: 10, max: 11 }],
      outcomes: [
        {
          id: 'would-leak',
          weight: 1,
          immediateText: '{subject}搬进一间空屋，并付了五克朗。',
          effects: [
            {
              type: 'household',
              personId: '$subject',
              householdId: 'household:empty',
              reason: 'rejected move',
            },
            { type: 'cash', householdId: '$household', amount: -5, reason: 'moving fee' },
            {
              type: 'flag',
              personId: '$subject',
              flag: 'should_not_leak',
              add: true,
              reason: 'texture after rejected move',
            },
          ],
        },
      ],
    });
    const result = advanceV4Year(current, [definition], {
      ...noEconomy,
      maxOrdinaryEventsPerPerson: 1,
    });
    expect(result.events.some((event) => event.action.startsWith('test:rejected-move/'))).toBe(
      false,
    );
    expect(result.world.households['household:huber']!.cash).toBe(40);
    expect(result.world.persons['person:anna']!.life?.flags ?? []).not.toContain('should_not_leak');
  });
});
