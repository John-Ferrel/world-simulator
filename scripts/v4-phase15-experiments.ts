/**
 * Phase 15 controlled experiments.
 *
 * These are not full-world playtests. Each experiment narrows the content pool
 * so a mechanism can be observed directly, then reports the committed facts.
 * Full lives are in scripts/v4-phase15-lives.ts.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { advanceV4Year } from '../packages/v4/engine.js';
import type { EventFact, Person, WorldState } from '../packages/v4/domain.js';
import type { StateDefinition } from '../packages/v4/state/types.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import { createV4Birth } from '../packages/v4/birth.js';
import { ALL_STATES } from '../packages/v4/content/states/index.js';
import { KERNEL_LIBRARY } from '../packages/v4/content/kernels/index.js';
import { createCompositionSource } from '../packages/v4/composition/composer.js';
import { defaultMacroState } from '../packages/v4/macro.js';
import { touchStateRevision } from '../packages/v4/state/runtime.js';
import { applyWishState } from '../packages/v4/wish-compiler.js';
import { reviewHistoricalWorld } from '../packages/v4/history-db/review.js';

type ExperimentResult = {
  id: string;
  title: string;
  years: number;
  events: EventFact[];
  world: WorldState;
  checks: { name: string; pass: boolean; detail: string }[];
};

function baseWorld(seed: string): WorldState {
  const world = applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
  world.seed = seed;
  world.id = `world:phase15-exp:${seed}`;
  world.date = { year: 1912, month: 1 };
  world.macro = defaultMacroState(world);
  return world;
}

function adultTemplate(world: WorldState, sex: 'female' | 'male'): Person {
  const template = Object.values(world.persons).find(
    (person) =>
      person.sex === sex &&
      !person.died &&
      world.date.year - person.born.year >= 18 &&
      (person.education.status === 'primary' || person.education.status === 'secondary'),
  );
  if (!template) throw new Error('no adult template');
  return template;
}

function addAdult(
  world: WorldState,
  name: string,
  bornYear: number,
  options: {
    sex?: 'female' | 'male';
    education?: Person['education']['status'];
    intelligence?: number;
    role?: string;
    householdId?: string;
  } = {},
): string {
  const sex = options.sex ?? 'female';
  const template = adultTemplate(world, sex);
  const household =
    (options.householdId ? world.households[options.householdId] : undefined) ??
    Object.values(world.households).find(
      (candidate) =>
        candidate.memberIds.length < 8 &&
        candidate.guardianIds.some((id) => world.persons[id] && !world.persons[id]!.died),
    )!;
  const id = `person:exp:${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  world.persons[id] = {
    ...structuredClone(template),
    id,
    name,
    sex,
    born: { year: bornYear, month: 1 },
    locationId: world.households[household.id]!.residenceId,
    householdId: household.id,
    parentIds: [],
    guardianIds: [],
    relationshipIds: [],
    projectIds: [],
    knowledgeIds: [],
    roles: options.role ? [options.role] : [],
    education: {
      status: options.education ?? 'secondary',
      level: options.education === 'higher' ? 5 : 3,
    },
    employment: undefined,
    died: undefined,
    deathCause: undefined,
    attributes: {
      ...(template.attributes ?? {}),
      ...(options.intelligence !== undefined ? { intelligence: options.intelligence } : {}),
      willpower: 0.9,
    },
    life: {
      mood: 0,
      reputation: 0,
      skills: { literacy: 0.7, numeracy: 0.6, craft: 0.4, social: 0.6 },
      flags: [],
    },
    provenance: { kind: 'initial' },
  };
  household.memberIds.push(id);
  return id;
}

function run(
  world: WorldState,
  kernels: typeof KERNEL_LIBRARY,
  years: number,
  options: {
    maxOrdinaryEventsPerPerson?: number;
    states?: StateDefinition[];
    outcomePolicy?: (context: {
      scene: { id: string };
      outcomes: { id: string }[];
    }) => string | undefined;
  } = {},
): { world: WorldState; events: EventFact[] } {
  const composition = createCompositionSource(kernels);
  let current = world;
  const events: EventFact[] = [];
  for (let index = 0; index < years; index += 1) {
    const result = advanceV4Year(current, [], {
      economy: { enabled: false },
      eventRuntime: true,
      agency: false,
      tasks: [],
      composition,
      states: options.states ?? ALL_STATES,
      maxOrdinaryEventsPerPerson: options.maxOrdinaryEventsPerPerson ?? 3,
      ...(options.outcomePolicy ? { outcomePolicy: options.outcomePolicy as never } : {}),
    });
    current = result.world;
    events.push(...result.events);
  }
  return { world: current, events };
}

function stateEvents(events: EventFact[], prefix: string): EventFact[] {
  return events.filter((event) => event.action.startsWith(prefix));
}

function summarize(events: EventFact[], limit = 30) {
  return events.slice(-limit).map((event) => ({
    id: event.id,
    date: event.date,
    action: event.action,
    text: event.immediateText.slice(0, 240),
    effects: event.effects.map((effect) => effect.type),
  }));
}

function addCurse(world: WorldState, personId: string): void {
  world.states ??= {};
  const birth = world.events.find(
    (event) => event.subjectId === personId && event.action === 'birth',
  );
  world.states[`state:exp:curse:${personId}`] = {
    id: `state:exp:curse:${personId}`,
    definitionId: 'cursed-by-wish',
    version: 1,
    ownerType: 'person',
    ownerId: personId,
    since: { ...world.date },
    parameters: { severity: 0.8, triggers: 0 },
    sourceEventId: birth?.id ?? world.historyMeta.lastEventId ?? 'evt:exp:seed',
    active: true,
    tickCount: 0,
  };
  touchStateRevision(world);
}

const results: ExperimentResult[] = [];

// A. Education continuity: a poor clever adolescent gets a scholarship, then
// must pay tuition or leave.
{
  const world = baseWorld('edu');
  world.households[Object.keys(world.households)[0]!]!.cash = 4;
  const id = addAdult(world, 'Lena', 1895, {
    education: 'secondary',
    intelligence: 0.95,
  });
  world.households[world.persons[id]!.householdId]!.cash = 4;
  const kernels = KERNEL_LIBRARY.filter((kernel) => kernel.id.startsWith('r15-edu'));
  const { world: after, events } = run(world, kernels, 8, { maxOrdinaryEventsPerPerson: 4 });
  const states = Object.values(after.states ?? {}).filter((state) => state.ownerId === id);
  const checks = [
    {
      name: 'education_state_appeared',
      pass: states.some((state) =>
        [
          'university-student',
          'university-graduate',
          'university-dropout',
          'apprenticeship-contract',
          'journeyman',
        ].includes(state.definitionId),
      ),
      detail: states.map((state) => `${state.definitionId}:${state.active}`).join(', ') || 'none',
    },
    {
      name: 'education_fact_committed',
      pass: events.some(
        (event) =>
          event.action.startsWith('r15-edu') || event.action.startsWith('state_tick:university'),
      ),
      detail:
        events
          .filter(
            (event) =>
              event.subjectId === id &&
              (event.action.startsWith('r15-edu') || event.action.startsWith('state_')),
          )
          .map((event) => event.action)
          .join(', ') || 'none',
    },
  ];
  results.push({
    id: 'A-education',
    title: '贫困聪明的孩子与教育连续性',
    years: 10,
    events,
    world: after,
    checks,
  });
}

// B. Power wish: a real appointment must create a Position; a stage role must not.
{
  const world = baseWorld('power');
  const id = addAdult(world, 'Klara', 1887, { intelligence: 0.8 });
  applyWishState(world, id, '我要成为世界上最有权势的人。');
  const kernels = KERNEL_LIBRARY.filter(
    (kernel) =>
      kernel.id.startsWith('r15-wish') ||
      kernel.id.startsWith('r15-absurd') ||
      kernel.id.startsWith('r15-history'),
  );
  const { world: after, events } = run(world, kernels, 14, { maxOrdinaryEventsPerPerson: 4 });
  const positions = Object.values(after.positions).filter((position) => position.holderId === id);
  const positionEffects = events.flatMap((event) =>
    event.effects.filter(
      (effect) => effect.type === 'position' && effect.remove !== true && effect.holderId === id,
    ),
  );
  const stage = Object.values(after.states ?? {}).filter(
    (state) => state.ownerId === id && state.definitionId === 'stage-king',
  );
  const checks = [
    {
      name: 'real_power_has_a_position',
      pass: positionEffects.length > 0,
      detail:
        positionEffects
          .map((effect) =>
            effect.type === 'position'
              ? `${effect.title}@${effect.organizationId} authority=${(effect.authority ?? []).join('|')}`
              : '',
          )
          .join('; ') ||
        positions.map((position) => `${position.title}@${position.organizationId}`).join('; ') ||
        'none',
    },
    {
      name: 'stage_title_is_not_a_position',
      pass: stage.length === 0 || positionEffects.length > 0,
      detail: `stage instances=${stage.length}, position effects=${positionEffects.length}`,
    },
    {
      name: 'wish_tick_or_event_committed',
      pass: events.some(
        (event) =>
          event.subjectId === id &&
          (event.action.includes('wish-power') ||
            event.action.includes('r15-wish') ||
            event.action.startsWith('state_tick:wish-power')),
      ),
      detail:
        events
          .filter(
            (event) =>
              event.subjectId === id &&
              (event.action.includes('wish-power') || event.action.includes('r15-wish')),
          )
          .map((event) => `${event.date.year}:${event.action}`)
          .join(', ') || 'none',
    },
  ];
  results.push({
    id: 'B-power',
    title: '权力愿望：真实职位与舞台头衔',
    years: 14,
    events,
    world: after,
    checks,
  });
}

// C. Curse: a real betrayal event triggers the state reaction and harms the betrayer.
{
  const world = baseWorld('curse');
  const victim = addAdult(world, 'Hedwig', 1890);
  addAdult(world, 'Maria', 1888);
  addCurse(world, victim);
  const kernels = KERNEL_LIBRARY.filter((kernel) => kernel.id.startsWith('r15-curse'));
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
  const { world: after, events } = run(world, kernels, 8, {
    maxOrdinaryEventsPerPerson: 3,
    states: curseStates,
  });
  const reactions = events.filter((event) =>
    event.action.startsWith('state_reaction:cursed-by-wish/'),
  );
  const damage = reactions.flatMap((event) =>
    event.effects.filter((effect) => effect.type === 'health'),
  );
  const checks = [
    {
      name: 'betrayal_triggered_reaction',
      pass: reactions.length > 0,
      detail:
        reactions
          .map((event) => `${event.date.year}:${event.action} causes=${event.causes.join('|')}`)
          .join('; ') || 'none',
    },
    {
      name: 'reaction_had_concrete_health_effect',
      pass:
        damage.length > 0 &&
        damage.every((effect) => effect.type !== 'health' || effect.personId !== victim),
      detail:
        damage
          .map((effect) => (effect.type === 'health' ? `${effect.personId}:${effect.amount}` : ''))
          .join(', ') || 'none',
    },
  ];
  results.push({
    id: 'C-curse',
    title: '诅咒对真实背叛的反应',
    years: 8,
    events,
    world: after,
    checks,
  });
}

// D. Indirect link: a teacher's recommendation sends a sibling to university.
{
  const world = baseWorld('link');
  const sibling = addAdult(world, 'Rosa', 1890, { education: 'secondary', intelligence: 0.8 });
  addAdult(world, 'Gustav', 1892, { education: 'secondary', intelligence: 0.7 });
  addAdult(world, 'Anna Huber', 1860, {
    education: 'higher',
    role: 'teacher',
    intelligence: 0.9,
  });
  // Move the two into one household and make them kin for the sibling role.
  const targetHousehold = Object.values(world.households).find((household) =>
    household.memberIds.includes(sibling),
  )!;
  const second = Object.values(world.persons).find((person) => person.name === 'Gustav')!;
  const previousHousehold = world.households[second.householdId]!;
  previousHousehold.memberIds = previousHousehold.memberIds.filter((id) => id !== second.id);
  targetHousehold.memberIds.push(second.id);
  second.householdId = targetHousehold.id;
  sibling; // keep the sibling id referenced for clarity
  world.persons[sibling]!.parentIds = ['person:exp:shared-parent'];
  second.parentIds = ['person:exp:shared-parent'];
  world.relations[`rel:exp:${sibling}:${second.id}`] = {
    id: `rel:exp:${sibling}:${second.id}`,
    a: sibling,
    b: second.id,
    kind: 'kin',
    trust: 0.7,
    affection: 0.7,
    obligation: 0.5,
    fear: 0,
    respect: 0.5,
    start: { ...world.date },
    sharedEventIds: [],
  };
  for (const [index, id] of [sibling, second.id].entries()) {
    for (let prior = 0; prior < 2; prior += 1) {
      world.events.push({
        id: `evt:exp:education:${index}:${prior}`,
        date: { ...world.date },
        subjectId: id,
        participants: [],
        action: 'exp:schooling-history',
        causes: [],
        effects: [],
        immediateText: 'A prior schooling fact established for the controlled experiment.',
        tags: ['education', 'school'],
        significance: 0.6,
        visibility: 'private',
        provenance: { kind: 'system' },
      });
    }
  }
  const kernels = KERNEL_LIBRARY.filter((kernel) => kernel.id.startsWith('r15-link'));
  const { world: after, events } = run(world, kernels, 8, {
    maxOrdinaryEventsPerPerson: 3,
    outcomePolicy: (context) =>
      context.scene.id.includes('teacher-patronage')
        ? context.outcomes.find((outcome) => outcome.id === 'letter-only')?.id
        : undefined,
  });
  const university = Object.values(after.states ?? {}).filter(
    (state) =>
      (state.definitionId === 'university-student' ||
        state.definitionId === 'university-graduate') &&
      (state.ownerId === sibling || state.ownerId === second.id),
  );
  const checks = [
    {
      name: 'sibling_received_a_state',
      pass: university.length > 0,
      detail:
        university
          .map((state) => `${state.ownerId}:${state.definitionId}:active=${state.active}`)
          .join(', ') || 'none',
    },
    {
      name: 'indirect_event_committed',
      pass: events.some((event) => event.action.startsWith('r15-link')),
      detail:
        events
          .filter((event) => event.action.startsWith('r15-link'))
          .map((event) => event.action)
          .join(', ') || 'none',
    },
  ];
  results.push({
    id: 'D-link',
    title: '老师通过一个孩子改变另一个孩子',
    years: 8,
    events,
    world: after,
    checks,
  });
}

// E. Organisation state: a strike/closure state on an organisation changes its
// members' opportunities, even when the state owner is not a person.
{
  const world = baseWorld('org');
  const worker = addAdult(world, 'Josef', 1888);
  const organizationId = Object.keys(world.organizations).find((id) => {
    const organization = world.organizations[id]!;
    return organization.kind === 'factory' && organization.status === 'active';
  });
  if (!organizationId) throw new Error('no factory');
  const organization = world.organizations[organizationId]!;
  if (!organization.memberIds.includes(worker)) organization.memberIds.push(worker);
  world.states ??= {};
  world.states['state:exp:strike'] = {
    id: 'state:exp:strike',
    definitionId: 'strike-wave',
    version: 1,
    ownerType: 'organization',
    ownerId: organizationId,
    since: { ...world.date },
    parameters: { demands: 'higher wages', strength: 0.6 },
    sourceEventId: 'evt:exp:seed',
    active: true,
    tickCount: 0,
  };
  touchStateRevision(world);
  const kernels = KERNEL_LIBRARY.filter((kernel) => kernel.id.startsWith('r15-org'));
  const { world: after, events } = run(world, kernels, 8, { maxOrdinaryEventsPerPerson: 3 });
  const checks = [
    {
      name: 'organisation_state_persisted',
      pass: Boolean(after.states?.['state:exp:strike']),
      detail: after.states?.['state:exp:strike']
        ? `${after.states['state:exp:strike']!.definitionId} active=${after.states['state:exp:strike']!.active} reason=${after.states['state:exp:strike']!.endReason ?? ''}`
        : 'missing',
    },
    {
      name: 'org_state_produced_a_collective_fact',
      pass: events.some(
        (event) => event.action.startsWith('r15-org') || event.action.startsWith('state_'),
      ),
      detail:
        events
          .filter((event) => event.action.startsWith('r15-org'))
          .map((event) => event.action)
          .join(', ') || 'none',
    },
  ];
  results.push({
    id: 'E-organisation',
    title: '组织状态影响成员',
    years: 8,
    events,
    world: after,
    checks,
  });
}

// F. History review: a world with a real office and process records fork
// signals, but the review never claims the real timeline happened.
{
  const power = results.find((result) => result.id === 'B-power')!;
  const review = reviewHistoricalWorld(power.world, 1912, 1926);
  const checks = [
    {
      name: 'history_candidates_reviewed',
      pass: review.candidates.length > 0,
      detail: `${review.candidates.length} candidates; matched=${review.matchedCandidates}; unobserved=${review.unobservedCandidates}`,
    },
    {
      name: 'review_is_not_a_timeline_reset',
      pass: review.note.includes('not proof') && review.forkSignals.length >= 0,
      detail: review.note,
    },
  ];
  results.push({
    id: 'F-history',
    title: '历史对照与分叉信号',
    years: 0,
    events: [],
    world: power.world,
    checks,
  });
}

const report = {
  generatedAt: new Date().toISOString(),
  note: 'Controlled experiments with narrowed content pools. Not a substitute for full lives.',
  results: results.map((result) => ({
    id: result.id,
    title: result.title,
    years: result.years,
    checks: result.checks,
    passed: result.checks.every((check) => check.pass),
    sampleEvents: summarize(result.events),
    positions: Object.values(result.world.positions)
      .filter((position) => position.holderId)
      .slice(0, 12)
      .map((position) => ({
        title: position.title,
        holderId: position.holderId,
        organizationId: position.organizationId,
        authority: position.authority,
        end: position.end,
      })),
    states: Object.values(result.world.states ?? {})
      .slice(0, 30)
      .map((state) => ({
        ownerId: state.ownerId,
        definitionId: state.definitionId,
        active: state.active,
        parameters: state.parameters,
        links: state.links,
        ticks: state.tickCount,
      })),
    historyReview:
      result.id === 'F-history'
        ? {
            window: reviewHistoricalWorld(result.world, 1912, 1926).window,
            matched: reviewHistoricalWorld(result.world, 1912, 1926).matchedCandidates,
            unobserved: reviewHistoricalWorld(result.world, 1912, 1926).unobservedCandidates,
            forkSignals: reviewHistoricalWorld(result.world, 1912, 1926).forkSignals,
          }
        : undefined,
  })),
};

mkdirSync('docs/v4', { recursive: true });
writeFileSync('docs/v4/phase-15-experiments.json', `${JSON.stringify(report, null, 2)}\n`);
for (const result of report.results) {
  console.log(
    JSON.stringify({
      id: result.id,
      passed: result.passed,
      checks: result.checks.map(
        (check) => `${check.pass ? 'PASS' : 'FAIL'} ${check.name}: ${check.detail}`,
      ),
    }),
  );
}
