/**
 * Phase 15 complete-life dossier with states.
 *
 * Runs the real engine, keeps every subject event, and prints the state
 * snapshot and state facts for selected lives. It is not a best-of sample.
 *
 *   pnpm v4:phase15-lives -- 50 phase15-a,phase15-b 2
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { advanceV4Year } from '../packages/v4/engine.js';
import type { EventEffect, EventFact, Person, WorldState } from '../packages/v4/domain.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { VIENNA_1912_SEED, VIENNA_1912_SCENES } from '../packages/v4/content/vienna-1912.js';
import { VIENNA_LIFE_SCENES } from '../packages/v4/content/vienna-life.js';
import { VIENNA_POSTWAR_SCENES } from '../packages/v4/content/vienna-postwar.js';
import { VIENNA_HISTORY_SCENES } from '../packages/v4/content/vienna-history.js';
import { VIENNA_DEVELOPMENT_SCENES } from '../packages/v4/content/vienna-developments.js';
import { VIENNA_FAMILY_RUNTIME_SCENES } from '../packages/v4/content/vienna-family.js';
import { ALL_EVENT_SCENES, ALL_TASKS } from '../packages/v4/content/generated/index.js';
import { DEFAULT_COMPOSITION } from '../packages/v4/composition/default.js';
import { createV4Birth } from '../packages/v4/birth.js';
import { ALL_STATES, GENERATED_STATE_PACKS } from '../packages/v4/content/states/index.js';
import { touchStateRevision } from '../packages/v4/state/runtime.js';
import { critiqueContentRun } from '../packages/v4/content-factory/critic.js';

const SCENES = [
  ...VIENNA_1912_SCENES,
  ...VIENNA_LIFE_SCENES,
  ...VIENNA_POSTWAR_SCENES,
  ...VIENNA_HISTORY_SCENES,
  ...VIENNA_DEVELOPMENT_SCENES,
  ...VIENNA_FAMILY_RUNTIME_SCENES,
  ...ALL_EVENT_SCENES,
];

type FocalSeed = {
  name: string;
  sex: 'female' | 'male';
  wish: string;
  health: number;
  /** Additional state seeded after birth, to test a mechanic that is not a wish. */
  stateId?: string;
};

const FOCALS: FocalSeed[] = [
  {
    name: 'Klara',
    sex: 'female',
    wish: '我要成为世界上最有权势的人。',
    health: 0.93,
  },
  {
    name: 'Mitzi',
    sex: 'female',
    wish: '识字，能读信、读书，也能看穿别人没有说出口的话。',
    health: 0.9,
  },
  {
    name: 'Josef',
    sex: 'male',
    wish: '学会一门手艺，有一间自己的小作坊。',
    health: 0.88,
  },
  {
    name: 'Rosa',
    sex: 'female',
    wish: '把弟弟妹妹养大，家里不再欠房租。',
    health: 0.94,
  },
  {
    name: 'Emil',
    sex: 'male',
    wish: '被一个真正爱自己的人留下。',
    health: 0.86,
  },
  {
    name: 'Lena',
    sex: 'female',
    wish: '读完书，做一个能自己拿主意的女人。',
    health: 0.92,
  },
  {
    name: 'Anton',
    sex: 'male',
    wish: '让背叛我的人付出代价。',
    health: 0.89,
  },
  {
    name: 'Hedwig',
    sex: 'female',
    wish: '有一张自己的床，不用再和三个孩子挤一间屋。',
    health: 0.91,
    stateId: 'cursed-by-wish',
  },
];

type Run = {
  seed: string;
  world: WorldState;
  events: EventFact[];
  focalIds: Record<string, string>;
  diagnostics: ReturnType<typeof advanceV4Year>['diagnostics'][];
};

const args = process.argv.slice(2);
const years = Number(args[0] ?? 50);
const seeds = (args[1] ?? 'phase15-a,phase15-b').split(',');
// Phase 19: use already-seeded persons as focal lives, so elder/teen/child
// cohorts are not fabricated as newborn player characters. This is an
// observation selector only; it does not change world physics or ownership.
const existingFocals = (args.find((arg) => arg.startsWith('--existing=')) ?? '')
  .slice('--existing='.length)
  .split(',')
  .map((id) => id.trim())
  .filter(Boolean);
const existingOnly = args.includes('--existing-only');

function seedState(
  world: WorldState,
  personId: string,
  stateId: string,
  sourceEventId: string,
): void {
  world.states ??= {};
  const birth = world.events.find(
    (event) => event.subjectId === personId && event.action === 'birth',
  );
  const id = `state:${world.id}:seed:${personId}:${stateId}`;
  world.states[id] = {
    id,
    definitionId: stateId,
    version: 1,
    ownerType: 'person',
    ownerId: personId,
    since: { ...world.date },
    parameters: { severity: 0.6, triggers: 0 },
    sourceEventId: birth?.id ?? sourceEventId,
    active: true,
    tickCount: 0,
  };
  touchStateRevision(world);
}

function createFocals(
  world: WorldState,
  existingIds: string[] = [],
  onlyExisting = false,
): { world: WorldState; focalIds: Record<string, string> } {
  let current = world;
  const focalIds: Record<string, string> = {};
  for (const focal of onlyExisting ? [] : FOCALS) {
    const result = createV4Birth(
      current,
      {
        name: focal.name,
        sex: focal.sex,
        health: focal.health,
        wish: focal.wish,
        lifeMode: 'legendary',
        appearance: { skin: 0.4, hair: 0.2, clothes: 0.3 },
      },
      `phase15-${focal.name}-${current.id}`,
    );
    current = result.world;
    focalIds[focal.name] = result.childId;
    if (focal.stateId) seedState(current, result.childId, focal.stateId, result.event.id);
  }
  for (const id of existingIds) {
    const person = current.persons[id];
    if (!person) {
      console.error(`[phase19] existing focal not found: ${id}`);
      continue;
    }
    focalIds[`existing-${person.name}`] = id;
  }
  return { world: current, focalIds };
}

function runSeed(seed: string): Run {
  let world = applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
  world.seed = seed;
  world.date = { year: 1912, month: 1 };
  const created = createFocals(world, existingFocals, existingOnly);
  world = created.world;
  const events: EventFact[] = [];
  const diagnostics: Run['diagnostics'] = [];
  for (let index = 0; index < years; index += 1) {
    const result = advanceV4Year(world, SCENES, {
      economy: { enabled: true },
      eventRuntime: true,
      agency: true,
      tasks: ALL_TASKS,
      composition: DEFAULT_COMPOSITION,
      states: ALL_STATES,
      maxOrdinaryEventsPerPerson: 4,
      maxAgencyActorsPerYear: 96,
    });
    world = result.world;
    events.push(...result.events);
    diagnostics.push(result.diagnostics);
  }
  return { seed, world, events, focalIds: created.focalIds, diagnostics };
}


/**
 * Phase 16 activation diagnostics. These are derived from the same committed
 * facts as the dossier; they do not instrument a second simulation and they do
 * not treat a registered definition as "used". A state is counted as activated
 * only when a committed event added it, ticked it, reacted to it, or transitioned
 * it.
 */
function activationDiagnostics(run: Run) {
  const events = run.events;
  const finalStates = Object.values(run.world.states ?? {});
  const stateIds = new Set(ALL_STATES.map((state) => state.id));
  const stateLifecycle = new Map<
    string,
    {
      instances: number;
      active: number;
      ended: number;
      adds: number;
      ticks: number;
      reactions: number;
      transitions: number;
      consumedByOtherEvents: number;
    }
  >();
  const stateEntry = (id: string) => {
    let entry = stateLifecycle.get(id);
    if (!entry) {
      entry = {
        instances: 0,
        active: 0,
        ended: 0,
        adds: 0,
        ticks: 0,
        reactions: 0,
        transitions: 0,
        consumedByOtherEvents: 0,
      };
      stateLifecycle.set(id, entry);
    }
    return entry;
  };
  for (const id of stateIds) stateEntry(id);
  for (const state of finalStates) {
    const entry = stateEntry(state.definitionId);
    entry.instances += 1;
    if (state.active) entry.active += 1;
    else entry.ended += 1;
  }
  const officeEvents: EventFact[] = [];
  const curseEvents: EventFact[] = [];
  let births = 0;
  const childIds = new Set<string>();
  let organizationFundsDelta = 0;
  const foundedOrgIds = new Set<string>();
  let positionsCreated = 0;
  let positionsEnded = 0;
  let historicalProcessEvents = 0;
  let historicalInfluenceEffects = 0;
  const eventIds = new Set(events.map((event) => event.id));
  const officeEventIds = new Set<string>();
  for (const event of events) {
    const isStateInternal = event.action.startsWith('state_');
    if (event.action.startsWith('state_tick:')) {
      const id = event.action.slice('state_tick:'.length).split('/')[0]!;
      stateEntry(id).ticks += 1;
    } else if (event.action.startsWith('state_reaction:')) {
      const id = event.action.slice('state_reaction:'.length).split('/')[0]!;
      stateEntry(id).reactions += 1;
    } else if (event.action.startsWith('state_transition:')) {
      const id = event.action.slice('state_transition:'.length).split('/')[0]!;
      stateEntry(id).transitions += 1;
    }
    for (const effect of event.effects) {
      if (effect.type === 'state_add') {
        stateEntry(effect.stateId).adds += 1;
      } else if (effect.type === 'state_transition') {
        stateEntry(effect.fromStateId).transitions += 1;
        stateEntry(effect.toStateId).adds += 1;
      } else if (effect.type === 'birth') {
        births += 1;
        if (effect.childId) childIds.add(effect.childId);
      } else if (effect.type === 'organization_funds') {
        organizationFundsDelta += effect.amount;
      } else if (effect.type === 'organization_found') {
        if (effect.organization.id) foundedOrgIds.add(effect.organization.id);
      } else if (effect.type === 'position') {
        if (effect.remove) positionsEnded += 1;
        else positionsCreated += 1;
      } else if (effect.type === 'historical_process') {
        historicalProcessEvents += 1;
      } else if (effect.type === 'historical_influence') {
        historicalInfluenceEffects += 1;
      }
    }
    if (!isStateInternal) {
      for (const effect of event.effects) {
        if (effect.type === 'state_parameter') {
          stateEntry(effect.stateId).consumedByOtherEvents += 1;
        } else if (effect.type === 'state_remove') {
          const id = effect.stateId ?? effect.tag;
          if (id) stateEntry(id).consumedByOtherEvents += 1;
        }
      }
      for (const id of stateIds) {
        if (event.tags?.includes(id)) {
          stateEntry(id).consumedByOtherEvents += 1;
        }
      }
    }
    if (event.action.startsWith('office16-')) {
      officeEvents.push(event);
      officeEventIds.add(event.id);
    }
    if (event.action.startsWith('curse15-') || event.action.startsWith('state_reaction:cursed-by-wish')) {
      curseEvents.push(event);
    }
  }
  const officeFollowUps = events.filter(
    (event) =>
      !officeEventIds.has(event.id) &&
      event.causes.some((causeId) => officeEventIds.has(causeId) && eventIds.has(causeId)),
  );
  const packActivation = GENERATED_STATE_PACKS.map((pack) => {
    const kernelHits: Record<string, number> = {};
    const stateHits: Record<string, number> = {};
    for (const kernel of pack.kernels ?? []) {
      kernelHits[kernel.id] = events.filter((event) => event.action.startsWith(kernel.id)).length;
    }
    for (const state of pack.states) stateHits[state.id] = stateLifecycle.get(state.id)?.adds ?? 0;
    return {
      pack: pack.id,
      states: pack.states.length,
      kernels: pack.kernels?.length ?? 0,
      totalKernelEvents: Object.values(kernelHits).reduce((sum, count) => sum + count, 0),
      kernelHits,
      stateAdds: stateHits,
    };
  });
  const kernelPack = new Map<string, string>();
  const statePack = new Map<string, string>();
  for (const pack of GENERATED_STATE_PACKS) {
    for (const kernel of pack.kernels ?? []) kernelPack.set(kernel.id, pack.id);
    for (const state of pack.states) statePack.set(state.id, pack.id);
  }
  const crossPackCounts: Record<string, number> = {};
  const crossPackSamples: {
    date: { year: number; month: number };
    action: string;
    subject: string;
    sourcePack: string;
    target: string;
    effect: string;
  }[] = [];
  for (const event of events) {
    const kernelId = event.action.includes('::')
      ? event.action.split('::')[0]!
      : event.action.split('/')[0]!;
    const sourcePack = kernelPack.get(kernelId);
    if (!sourcePack) continue;
    for (const effect of event.effects) {
      const targets: string[] = [];
      if (effect.type === 'state_add') targets.push(effect.stateId);
      if (effect.type === 'state_parameter') targets.push(effect.stateId);
      if (effect.type === 'state_remove' && effect.stateId) targets.push(effect.stateId);
      if (effect.type === 'state_transition') targets.push(effect.fromStateId, effect.toStateId);
      for (const stateId of targets) {
        const targetPack = statePack.get(stateId) ?? 'base';
        if (targetPack === sourcePack) continue;
        const key = `${sourcePack}->${targetPack}`;
        crossPackCounts[key] = (crossPackCounts[key] ?? 0) + 1;
        if (crossPackSamples.length < 24) {
          crossPackSamples.push({
            date: event.date,
            action: event.action,
            subject: run.world.persons[event.subjectId]?.name ?? event.subjectId,
            sourcePack,
            target: stateId,
            effect: effect.type,
          });
        }
      }
    }
  }
  const officeOutcomes: Record<string, number> = {};
  for (const event of officeEvents) {
    const outcome = event.action.split('/').pop() ?? event.action;
    officeOutcomes[outcome] = (officeOutcomes[outcome] ?? 0) + 1;
  }
  const officeSamples = officeEvents.slice(0, 18).map((event) => ({
    date: event.date,
    action: event.action,
    subject: run.world.persons[event.subjectId]?.name ?? event.subjectId,
    effects: event.effects.map((effect) => {
      if (effect.type === 'position') return `position:${effect.title}:${effect.remove ? 'end' : 'start'}:${effect.organizationId ?? ''}`;
      if (effect.type === 'organization_funds') return `organization_funds:${effect.amount}`;
      if (effect.type === 'state_add') return `state_add:${effect.stateId}`;
      if (effect.type === 'state_parameter') return `state_parameter:${effect.stateId}.${effect.key}`;
      return effect.type;
    }),
  }));
  const childEvents = events.filter(
    (event) =>
      event.action.startsWith('r15-fam.') ||
      event.action.startsWith('state_tick:raising-child') ||
      event.action.startsWith('state_reaction:raising-child'),
  );
  const childLeftHome = childEvents.filter((event) => event.action.includes('child-leaves')).length;
  const childReturned = childEvents.filter((event) => event.action.includes('child-returns')).length;
  const raisingChildFinal = finalStates.filter((state) => state.definitionId === 'raising-child');
  const curseChain = curseEvents.slice(0, 30).map((event) => ({
    date: event.date,
    action: event.action,
    subject: run.world.persons[event.subjectId]?.name ?? event.subjectId,
    text: event.immediateText.slice(0, 180),
    effects: event.effects.map((effect) => effect.type),
  }));
  const historyReview = run.world.macro?.historyReview;
  const positions = Object.values(run.world.positions);
  const organizations = Object.values(run.world.organizations);
  return {
    stateLifecycle: Object.fromEntries(
      [...stateLifecycle.entries()]
        .filter(([, entry]) => entry.adds > 0 || entry.instances > 0 || entry.ticks > 0)
        .sort((a, b) => b[1].adds - a[1].adds),
    ),
    packActivation,
    crossPack: {
      counts: crossPackCounts,
      samples: crossPackSamples,
    },
    office: {
      events: officeEvents.length,
      uniqueSubjects: new Set(officeEvents.map((event) => event.subjectId)).size,
      outcomes: officeOutcomes,
      positionsCreated,
      positionsEnded,
      organizationFundsDelta,
      followUpEvents: officeFollowUps.length,
      samples: officeSamples,
    },
    children: {
      births,
      uniqueChildren: childIds.size,
      raisingChildStates: raisingChildFinal.length,
      raisingChildActive: raisingChildFinal.filter((state) => state.active).length,
      childEvents: childEvents.length,
      schoolTicks: childEvents.filter((event) => event.action.startsWith('state_tick:raising-child')).length,
      childLeftHome,
      childReturned,
    },
    curse: {
      events: curseEvents.length,
      reactions: curseEvents.filter((event) => event.action.startsWith('state_reaction:')).length,
      suspectedWitchcraft: stateLifecycle.get('suspected-witchcraft')?.adds ?? 0,
      samples: curseChain,
    },
    world: {
      persons: Object.keys(run.world.persons).length,
      playerBorn: Object.values(run.world.persons).filter((person) => person.provenance.kind === 'birth').length,
      organizations: organizations.length,
      activeOrganizations: organizations.filter((organization) => organization.status === 'active').length,
      organizationsFounded: foundedOrgIds.size,
      organizationMemberships: organizations.reduce((sum, org) => sum + org.memberIds.length, 0),
      organizationTreasury: organizations.reduce((sum, org) => sum + org.treasury, 0),
      positions: positions.length,
      heldPositions: positions.filter((position) => position.holderId).length,
      endedPositions: positions.filter((position) => position.end !== undefined).length,
      historicalProcessEvents,
      historicalInfluenceEffects,
      activeDevelopments: Object.values(run.world.macro?.developments ?? {}).filter(
        (development) => development.status === 'active',
      ).length,
      developments: Object.values(run.world.macro?.developments ?? {}).map((development) => ({
        id: development.id,
        type: development.type,
        status: development.status,
        start: development.start,
        end: development.end,
        historical: development.historical
          ? {
              kind: development.historical.kind,
              phase: development.historical.phase,
              regionIds: development.historical.regionIds,
            }
          : undefined,
      })),
      historyReview: historyReview
        ? {
            window: historyReview.window,
            matched: historyReview.matchedCandidates,
            unobserved: historyReview.unobservedCandidates,
            forkSignals: historyReview.forkSignals,
          }
        : undefined,
    },
  };
}

function subjectEvents(events: EventFact[], personId: string): EventFact[] {
  return events
    .filter((event) => event.subjectId === personId)
    .sort(
      (a, b) =>
        a.date.year * 12 + a.date.month - (b.date.year * 12 + b.date.month) ||
        a.id.localeCompare(b.id),
    );
}

function stateSnapshot(world: WorldState, personId: string) {
  const person = world.persons[personId];
  const organizationIds = new Set(
    Object.values(world.organizations)
      .filter(
        (organization) =>
          organization.memberIds.includes(personId) ||
          organization.positions.some(
            (positionId) => world.positions[positionId]?.holderId === personId,
          ),
      )
      .map((organization) => organization.id),
  );
  return Object.values(world.states ?? {})
    .filter(
      (state) =>
        (state.ownerType === 'person' && state.ownerId === personId) ||
        (Boolean(person && !person.died) &&
          ((state.ownerType === 'household' && state.ownerId === person?.householdId) ||
            (state.ownerType === 'organization' && organizationIds.has(state.ownerId)))),
    )
    .map((state) => ({
      id: state.id,
      definitionId: state.definitionId,
      ownerType: state.ownerType,
      ownerId: state.ownerId,
      active: state.active,
      since: state.since,
      endedAt: state.endedAt,
      endReason: state.endReason,
      parameters: state.parameters,
      links: state.links,
      linkNames: Object.fromEntries(
        Object.entries(state.links ?? {}).map(([name, id]) => [
          name,
          world.persons[id]?.name ?? world.organizations[id]?.name ?? id,
        ]),
      ),
      tickCount: state.tickCount,
      sourceEventId: state.sourceEventId,
    }));
}

function effectText(effect: EventEffect): string {
  switch (effect.type) {
    case 'cash':
      return `cash ${effect.amount} (${effect.reason})`;
    case 'health':
      return `health ${effect.amount} (${effect.reason})`;
    case 'mood':
      return `mood ${effect.amount}`;
    case 'reputation':
      return `reputation ${effect.amount}`;
    case 'flag':
      return `${effect.add ? 'flag +' : 'flag -'}${effect.flag}`;
    case 'state_add':
      return `state_add ${effect.stateId}${effect.instanceId ? ` ${effect.instanceId}` : ''}`;
    case 'state_remove':
      return `state_remove ${effect.stateId ?? effect.tag ?? '?'} ${effect.instanceId ?? ''}`;
    case 'state_parameter':
      return `state_parameter ${effect.stateId}.${effect.key} ${String(effect.previous ?? '?')} -> ${String(effect.final ?? '?')}`;
    case 'state_transition':
      return `state_transition ${effect.fromStateId} -> ${effect.toStateId}`;
    case 'position':
      return `${effect.remove ? 'position_end' : 'position'} ${effect.title}${effect.organizationId ? ` @${effect.organizationId}` : ''}`;
    case 'organization_found':
      return `organization_found ${effect.organization.name} (${effect.organization.kind})`;
    case 'education':
      return `education ${effect.status}`;
    case 'employment':
      return `employment ${effect.occupation} @ ${effect.organizationId}`;
    case 'unemployment':
      return `unemployment (${effect.reason})`;
    case 'relation':
      return `relation ${effect.kind} with ${effect.b}`;
    case 'relation_end':
      return `relation_end ${effect.kind} with ${effect.b}`;
    case 'death':
      return `death (${effect.cause})`;
    case 'birth':
      return `birth ${effect.childSex}`;
    case 'move':
      return `move ${effect.locationId}`;
    case 'knowledge':
      return `knowledge “${effect.proposition.slice(0, 60)}”`;
    case 'historical_participation':
      return `historical ${effect.processId} as ${effect.role}`;
    case 'historical_process':
      return `historical process ${effect.process.title}`;
    default:
      return effect.type;
  }
}

function renderLife(world: WorldState, person: Person, events: EventFact[]): string {
  const lines: string[] = [];
  const ageAtDeath = person.died ? person.died.year - person.born.year : undefined;
  lines.push(`## ${person.name}`);
  lines.push('');
  lines.push(
    `Born ${person.born.year}.${String(person.born.month).padStart(2, '0')}${
      person.died
        ? `, died ${person.died.year}.${String(person.died.month).padStart(2, '0')} (age ${ageAtDeath})`
        : `, alive at ${world.date.year}`
    }.`,
  );
  lines.push(
    `Education: ${person.education.status} ${person.education.level}; occupation: ${
      person.employment
        ? `${person.employment.occupation} @ ${person.employment.organizationId}`
        : 'none'
    }; roles: ${person.roles.join(', ') || 'none'}.`,
  );
  const states = stateSnapshot(world, person.id);
  lines.push('');
  lines.push('### State snapshot');
  if (states.length === 0) lines.push('No mechanism state was ever attached.');
  for (const state of states) {
    lines.push(
      `- ${state.definitionId} [${state.ownerType}]${state.active ? ' (active)' : ` (ended ${state.endedAt?.year}.${state.endedAt?.month}: ${state.endReason})`} parameters=${JSON.stringify(state.parameters)} links=${JSON.stringify(state.linkNames ?? {})} ticks=${state.tickCount}`,
    );
  }
  lines.push('');
  lines.push(`### ${events.length} subject events`);
  for (const event of events) {
    const tags = event.tags?.length ? ` tags: ${event.tags.slice(0, 8).join(', ')}` : '';
    lines.push('');
    lines.push(
      `- **${event.date.year}.${String(event.date.month).padStart(2, '0')}** \`${event.action}\`${tags}`,
    );
    lines.push(`  ${event.immediateText}`);
    if (event.effects.length > 0)
      lines.push(`  _effects: ${event.effects.map(effectText).join('; ')}_`);
    if (event.causes.length > 0) lines.push(`  _causes: ${event.causes.join(', ')}_`);
  }
  return lines.join('\n');
}

function selectLives(run: Run): { role: string; person: Person; events: EventFact[] }[] {
  const chosen = new Map<string, { role: string; person: Person; events: EventFact[] }>();
  const add = (role: string, id: string) => {
    const person = run.world.persons[id];
    if (!person || chosen.has(id)) return;
    chosen.set(id, { role, person, events: subjectEvents(run.events, id) });
  };
  for (const [name, id] of Object.entries(run.focalIds)) add(`focal:${name}`, id);
  const stateRich = Object.keys(run.world.persons)
    .map((id) => ({
      id,
      count: Object.values(run.world.states ?? {}).filter(
        (state) => state.ownerId === id && state.ownerType === 'person',
      ).length,
      events: subjectEvents(run.events, id).length,
    }))
    .filter((entry) => entry.events >= 10 && entry.count >= 2)
    .sort((a, b) => b.count - a.count || b.events - a.events)[0];
  if (stateRich) add('state_rich', stateRich.id);
  return [...chosen.values()];
}

const brief = process.env.PHASE15_LIVES_BRIEF === '1';
for (const seed of seeds) {
  const started = Date.now();
  const run = runSeed(seed);
  const critique = critiqueContentRun(run.world, run.events);
  const lives = selectLives(run);
  const stateEvents = run.events.filter((event) => event.action.startsWith('state_'));
  const stateCounts: Record<string, number> = {};
  for (const state of Object.values(run.world.states ?? {})) {
    stateCounts[state.definitionId] = (stateCounts[state.definitionId] ?? 0) + 1;
  }
  const report = {
    seed,
    years,
    generatedAt: new Date().toISOString(),
    elapsedMs: Date.now() - started,
    date: run.world.date,
    persons: Object.keys(run.world.persons).length,
    alive: Object.values(run.world.persons).filter((person) => !person.died).length,
    events: run.events.length,
    stateEvents: stateEvents.length,
    stateTicks: stateEvents.filter((event) => event.action.startsWith('state_tick:')).length,
    stateReactions: stateEvents.filter((event) => event.action.startsWith('state_reaction:'))
      .length,
    stateTransitions: stateEvents.filter((event) => event.action.startsWith('state_transition:'))
      .length,
    stateOpportunity: run.diagnostics.reduce(
      (total, diagnostic) => {
        const counters = diagnostic.scheduling?.stateOpportunity;
        if (!counters) return total;
        for (const key of [
          'candidates',
          'selected',
          'resolved',
          'missingRole',
          'noOutcome',
          'blocked',
          'crossStateCandidates',
          'crossStateResolved',
          'crossPackCandidates',
          'crossPackResolved',
        ] as const) {
          total[key] += counters[key];
        }
        return total;
      },
      {
        candidates: 0,
        selected: 0,
        resolved: 0,
        missingRole: 0,
        noOutcome: 0,
        blocked: 0,
        crossStateCandidates: 0,
        crossStateResolved: 0,
        crossPackCandidates: 0,
        crossPackResolved: 0,
      },
    ),
    stateCounts,
    activation: activationDiagnostics(run),
    contentSamples: run.events
      .filter((event) =>
        ['lc17-', 'ds17-', 'cj17-', 'mb17-', 'fm17-', 'fa17-', 'af17-', 'wc17-', 'pl19-', 'fw19-', 'lc19-', 'eh19-', 'r15-education.'].some(
          (prefix) => event.action.startsWith(prefix),
        ),
      )
      .slice(0, 60)
      .map((event) => ({
        date: event.date,
        action: event.action,
        subject: run.world.persons[event.subjectId]?.name ?? event.subjectId,
        text: event.immediateText.slice(0, 240),
        effects: event.effects.map(effectText),
      })),
    actionCounts: Object.fromEntries(
      [...new Set(run.events.map((event) => event.action.split('/')[0]!))]
        .map((action): [string, number] => [
          action,
          run.events.filter((event) => event.action.startsWith(`${action}/`)).length,
        ])
        .sort((a, b) => b[1] - a[1])
        .slice(0, 60),
    ),
    phase15ActionCounts: Object.fromEntries(
      [
        ...new Set(
          run.events
            .map((event) => event.action.split('/')[0]!)
            .filter(
              (action) =>
                action.startsWith('r15-') ||
                action.startsWith('hist15-') ||
                action.startsWith('absurd15-') ||
                action.startsWith('curse15-') ||
                action.startsWith('office16-') ||
                action.startsWith('state_'),
            ),
        ),
      ]
        .map((action): [string, number] => [
          action,
          run.events.filter((event) => event.action.startsWith(`${action}/`)).length,
        ])
        .sort((a, b) => b[1] - a[1]),
    ),
    activeStates: Object.values(run.world.states ?? {}).filter((state) => state.active).length,
    endedStates: Object.values(run.world.states ?? {}).filter((state) => !state.active).length,
    positions: Object.values(run.world.positions)
      .filter((position) => position.holderId || position.end)
      .map((position) => ({
        id: position.id,
        title: position.title,
        organizationId: position.organizationId,
        holderId: position.holderId,
        authority: position.authority,
        start: position.start,
        end: position.end,
      })),
    critiques: critique,
    historyReview: run.world.macro?.historyReview
      ? {
          window: run.world.macro.historyReview.window,
          matchedCandidates: run.world.macro.historyReview.matchedCandidates,
          unobservedCandidates: run.world.macro.historyReview.unobservedCandidates,
          historicalPeopleAlive: run.world.macro.historyReview.historicalPeopleAlive.length,
          forkSignals: run.world.macro.historyReview.forkSignals,
          candidates: run.world.macro.historyReview.candidates.slice(0, 20),
          note: run.world.macro.historyReview.note,
        }
      : undefined,
    historyReviews: (run.world.macro?.historyReviews ?? []).map((review) => ({
      window: review.window,
      matchedCandidates: review.matchedCandidates,
      unobservedCandidates: review.unobservedCandidates,
      historicalPeopleAlive: review.historicalPeopleAlive.length,
      matched: review.candidates
        .filter((candidate) => candidate.status === 'matched')
        .slice(0, 6)
        .map((candidate) => ({
          id: candidate.id,
          title: candidate.title,
          eventIds: candidate.matchedEventIds,
        })),
      unobserved: review.candidates
        .filter((candidate) => candidate.status === 'no-committed-analogue')
        .slice(0, 6)
        .map((candidate) => ({ id: candidate.id, title: candidate.title })),
      forkSignals: review.forkSignals,
    })),
    news: (run.world.news ?? [])
      .slice()
      .sort((a, b) => b.date.year - a.date.year || b.date.month - a.date.month)
      .slice(0, 80)
      .map((item) => ({
        id: item.id,
        date: item.date,
        scope: item.scope,
        category: item.category,
        provenance: item.provenance,
        reliability: item.reliability,
        title: item.title,
        summary: item.summary,
        relatedEventIds: item.relatedEventIds,
      })),
    newsProvenanceCounts: Object.fromEntries(
      ['reference', 'simulation', 'ambient', 'rumor'].map((provenance) => [
        provenance,
        (run.world.news ?? []).filter((item) => item.provenance === provenance).length,
      ]),
    ),
    lives: lives.map((life) => ({
      role: life.role,
      id: life.person.id,
      name: life.person.name,
      born: life.person.born,
      died: life.person.died,
      education: life.person.education,
      employment: life.person.employment,
      roles: life.person.roles,
      wish: life.person.lifeContract?.originalWish,
      wishArchetype: life.person.lifeContract?.wishArchetype,
      states: stateSnapshot(run.world, life.person.id),
      events: life.events,
    })),
  };
  mkdirSync('docs/v4', { recursive: true });
  writeFileSync(`docs/v4/phase-15-${seed}.json`, `${JSON.stringify(report, null, 2)}\n`);
  if (brief) continue;
  const markdown = [
    `# Phase 15 life dossier — ${seed}`,
    '',
    `Date: ${report.generatedAt}  |  ${years} years  |  ${report.events} events  |  ${report.persons} named persons  |  ${report.alive} alive  |  ${Math.round(report.elapsedMs / 1000)} s`,
    '',
    `State facts: ${report.stateEvents} events, ${report.stateTicks} ticks, ${report.stateReactions} reactions, ${report.stateTransitions} transitions. Active ${report.activeStates}, ended ${report.endedStates}. Positions ${report.positions.length}.`,
    '',
    `Critique: **${critique.verdict}** — ${critique.findings.map((finding) => `${finding.severity}:${finding.code}`).join(', ') || 'no findings'}.`,
    '',
    ...lives.map((life) => renderLife(run.world, life.person, life.events)),
  ].join('\n');
  writeFileSync(`docs/v4/phase-15-${seed}.md`, markdown);
  console.log(
    JSON.stringify({
      seed,
      events: report.events,
      persons: report.persons,
      alive: report.alive,
      stateEvents: report.stateEvents,
      ticks: report.stateTicks,
      reactions: report.stateReactions,
      transitions: report.stateTransitions,
      stateCounts,
      critique: critique.verdict,
      elapsedSeconds: Math.round(report.elapsedMs / 1000),
    }),
  );
}
