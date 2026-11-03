import {
  addMonths,
  type HistoricalParticipantRole,
  type HistoricalPhase,
  type HistoricalProcess,
  type HistoricalProcessKind,
  type HistoricalProcessMetrics,
  type Person,
  type WorldDate,
  type WorldState,
} from './domain.js';
import type {
  HistoricalLegacy,
  HistoricalLegacyKind,
  MacroState,
  WorldDevelopment,
} from './macro.js';

/**
 * Historical processes are a bounded extension of WorldDevelopment. This file
 * owns phase/metric logic only; it never writes prose, never executes model
 * output and never invents a person. The engine remains the only writer.
 */

export type HistoricalMoveIntent = 'support' | 'oppose' | 'escalate' | 'deescalate';

export type HistoricalMove = {
  processId: string;
  intent: HistoricalMoveIntent;
  magnitude: number;
  note: string;
};

export type HistoricalTransition = {
  developmentId: string;
  processId: string;
  from: HistoricalPhase;
  to: HistoricalPhase;
  date: WorldDate;
  actorId?: string;
  causeEventId?: string;
  note: string;
  effect: Partial<HistoricalProcessMetrics>;
};

export const HISTORICAL_PROCESS_KINDS: readonly HistoricalProcessKind[] = [
  'war_mobilization',
  'public_health_crisis',
  'social_movement',
  'political_repression',
  'economic_crisis',
  'cultural_movement',
  'other',
];
export const HISTORICAL_PHASES: readonly HistoricalPhase[] = [
  'emerging',
  'mobilizing',
  'confrontation',
  'institutionalizing',
  'repression',
  'declining',
  'ended',
];
export const HISTORICAL_ROLES: readonly HistoricalParticipantRole[] = [
  'participant',
  'organizer',
  'leader',
  'executor',
  'supporter',
  'opponent',
  'perpetrator',
  'victim',
  'witness',
  'rescuer',
  'affected',
];
export const HISTORICAL_METRIC_KEYS: readonly (keyof HistoricalProcessMetrics)[] = [
  'support',
  'opposition',
  'resources',
  'legitimacy',
  'escalation',
  'information',
];

const clamp01 = (value: number): number => Math.max(0, Math.min(1, value));

export function historicalKindForDevelopment(
  development: Pick<WorldDevelopment, 'type'>,
): HistoricalProcessKind {
  switch (development.type) {
    case 'war':
      return 'war_mobilization';
    case 'epidemic':
    case 'food_shortage':
      return 'public_health_crisis';
    case 'social_change':
      return 'social_movement';
    case 'political_unrest':
    case 'persecution':
      return 'political_repression';
    case 'economic_change':
      return 'economic_crisis';
    default:
      return 'other';
  }
}

export function ensureHistoricalProcess(
  development: WorldDevelopment,
  date: WorldDate,
): HistoricalProcess {
  if (development.historical) return development.historical;
  const kind = historicalKindForDevelopment(development);
  const severity = Math.max(0, Math.min(1, development.severity));
  const isWar = kind === 'war_mobilization';
  const isCrisis = kind === 'public_health_crisis' || kind === 'economic_crisis';
  return {
    kind,
    phase:
      development.start.year * 12 + development.start.month < date.year * 12 + date.month
        ? 'mobilizing'
        : 'emerging',
    phaseStarted: { ...development.start },
    regionIds: [development.regionId],
    objectives: [development.description.slice(0, 240)],
    sourceIds: [],
    participants: {},
    organizationRoles: development.organizationId
      ? { [development.organizationId]: ['vehicle'] }
      : {},
    metrics: {
      support: isWar ? severity * 0.35 : kind === 'social_movement' ? severity * 0.3 : 0.15,
      opposition: isWar ? 0.2 : 0.18,
      resources: 0.12,
      legitimacy: isWar ? 0.45 : 0.3,
      escalation: isWar ? severity * 0.25 : isCrisis ? severity * 0.2 : 0.05,
      information: 0.1,
    },
    history: [
      {
        date: { ...development.start },
        phase: 'emerging',
        note: `进程出现：${development.description.slice(0, 180)}`,
      },
    ],
    source: development.source.startsWith('macro-proposal') ? 'director' : 'seed',
    lastActivity: { ...development.start },
  };
}

/** Apply a model's bounded intent to existing process metrics. Never sets phase/outcome. */
export function applyHistoricalMoves(
  state: MacroState,
  moves: readonly HistoricalMove[],
  date: WorldDate,
): MacroState {
  if (moves.length === 0) return state;
  const next = structuredClone(state);
  for (const move of moves.slice(0, 6)) {
    const development = next.developments?.[move.processId];
    if (!development?.historical) continue;
    const process = development.historical;
    const magnitude = Math.max(0, Math.min(0.2, move.magnitude));
    switch (move.intent) {
      case 'support':
        process.metrics.support = clamp01(process.metrics.support + magnitude);
        process.metrics.legitimacy = clamp01(process.metrics.legitimacy + magnitude * 0.4);
        break;
      case 'oppose':
        process.metrics.opposition = clamp01(process.metrics.opposition + magnitude);
        break;
      case 'escalate':
        process.metrics.escalation = clamp01(process.metrics.escalation + magnitude);
        break;
      case 'deescalate':
        process.metrics.escalation = clamp01(process.metrics.escalation - magnitude);
        process.metrics.opposition = clamp01(process.metrics.opposition - magnitude * 0.3);
        break;
    }
    process.lastUpdated = { ...date };
    process.history.push({
      date: { ...date },
      phase: process.phase,
      note: `宏观意图 ${move.intent}：${move.note.slice(0, 160)}`,
    });
    process.history = process.history.slice(-120);
  }
  return next;
}

function deterministicRoll(seed: string, ...parts: (string | number)[]): number {
  let hash = 2166136261;
  for (const char of [seed, ...parts].join('|')) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return ((hash >>> 0) % 100000) / 100000;
}

function legacyKindForPhase(
  process: HistoricalProcess,
  phase: HistoricalPhase,
): HistoricalLegacyKind {
  if (phase === 'institutionalizing') {
    if (process.kind === 'cultural_movement') return 'cultural_institution';
    if (process.kind === 'public_health_crisis') return 'public_health_regime';
    if (process.kind === 'war_mobilization') return 'war_aftermath';
    if (process.kind === 'political_repression') return 'repression';
    return 'reform';
  }
  if (phase === 'repression') return 'repression';
  if (process.kind === 'war_mobilization') return 'war_aftermath';
  if (process.kind === 'public_health_crisis') return 'public_health_regime';
  if (process.kind === 'cultural_movement') return 'cultural_institution';
  return 'social_memory';
}

function legacyText(
  process: HistoricalProcess,
  kind: HistoricalLegacyKind,
): { title: string; description: string } {
  switch (kind) {
    case 'reform':
      return {
        title: '一项被制度化的改革',
        description: '这场运动留下了实际的组织地位、政策安排和后续行动机会，而没有只停留在口号。',
      };
    case 'repression':
      return {
        title: '镇压之后的社会记忆',
        description:
          '公开行动被压制，但参与者、家属和旁观者保存了这段经历，后续政治行动仍受它影响。',
      };
    case 'war_aftermath':
      return {
        title: '战后余波',
        description: '动员结束，但退伍者、失亲家庭、受损组织和物资短缺继续改变普通人的生活。',
      };
    case 'public_health_regime':
      return {
        title: '公共卫生制度的余波',
        description:
          '危机过后，照护、检疫和地方卫生安排留下了长期影响，也留下了对官方应对的不同记忆。',
      };
    case 'cultural_institution':
      return {
        title: '一个文化圈的成形',
        description: '讨论、出版物和个人关系沉淀为持续的文化网络，后来者可以进入或反对它。',
      };
    case 'organization_split':
      return {
        title: '一次组织分裂',
        description: '原有组织没有消失，但一部分成员带着资源和关系另立方向，冲突继续影响双方。',
      };
    default:
      return {
        title: `历史记忆：${process.kind}`,
        description: '这段经历被参与者、家庭和地方社会记住，并改变后来者对类似行动的反应。',
      };
  }
}

function legacyParameters(
  kind: HistoricalLegacyKind,
  process: HistoricalProcess,
): Record<string, number> {
  if (kind === 'reform') {
    return { stability: 0.035, foodSupply: 0.02, persecution: -0.02 };
  }
  if (kind === 'repression') {
    return { persecution: 0.04, stability: -0.025 };
  }
  if (kind === 'war_aftermath') {
    return { warIntensity: -0.04, militaryExposure: -0.02, foodSupply: -0.02 };
  }
  if (kind === 'public_health_regime') {
    return { healthcare: 0.03, sanitation: 0.02 };
  }
  if (kind === 'cultural_institution') {
    return { stability: 0.01 };
  }
  if (kind === 'organization_split') {
    return { stability: -0.02 };
  }
  return process.kind === 'social_movement' ? { stability: 0.01 } : {};
}

function legacyEventWeights(
  kind: HistoricalLegacyKind,
  development: WorldDevelopment,
): Record<string, number> {
  const weights: Record<string, number> = {};
  const families = development.eventFamilyIds.slice(0, 6);
  for (const familyId of families) {
    weights[familyId] =
      kind === 'war_aftermath'
        ? 0.45
        : kind === 'repression'
          ? 1.15
          : kind === 'reform' || kind === 'cultural_institution'
            ? 1.2
            : 1;
  }
  return weights;
}

function upsertLegacy(
  state: MacroState,
  development: WorldDevelopment,
  process: HistoricalProcess,
  phase: HistoricalPhase,
  date: WorldDate,
): HistoricalLegacy | undefined {
  if (phase !== 'institutionalizing' && phase !== 'repression' && phase !== 'ended')
    return undefined;
  const kind = legacyKindForPhase(process, phase);
  const id = `legacy:${development.id}:${kind}`;
  if (!state.legacy) state.legacy = {};
  if (state.legacy[id]) return state.legacy[id];
  const text = legacyText(process, kind);
  const legacy: HistoricalLegacy = {
    id,
    processId: development.id,
    kind,
    title: text.title,
    description: text.description,
    regionId: development.regionId,
    started: { ...date },
    status: 'active',
    tags: [process.kind, phase, ...process.objectives.slice(0, 2)],
    eventWeights: legacyEventWeights(kind, development),
    parameterChanges: legacyParameters(kind, process) as HistoricalLegacy['parameterChanges'],
    sourceEventId: process.lastEventId,
  };
  state.legacy[id] = legacy;
  // Structural changes are applied once to the region baseline. This is a
  // genuine institutional change, not an annual support bonus.
  const region = state.regions[legacy.regionId];
  if (region) {
    if (!region.baselineParameters) region.baselineParameters = { ...region.parameters };
    for (const [key, delta] of Object.entries(legacy.parameterChanges)) {
      if (!(key in region.baselineParameters)) continue;
      const current = region.baselineParameters[key as keyof typeof region.baselineParameters];
      if (typeof current !== 'number') continue;
      region.baselineParameters[key as keyof typeof region.baselineParameters] = Math.max(
        0,
        Math.min(1, current + Number(delta)),
      ) as never;
    }
  }
  return legacy;
}

function applyLegacyBaseline(state: MacroState, legacy: HistoricalLegacy): void {
  const region = state.regions[legacy.regionId];
  if (!region) return;
  if (!region.baselineParameters) region.baselineParameters = { ...region.parameters };
  for (const [key, delta] of Object.entries(legacy.parameterChanges)) {
    const current = (region.baselineParameters as Record<string, number>)[key];
    if (typeof current !== 'number') continue;
    (region.baselineParameters as Record<string, number>)[key] = Math.max(
      0,
      Math.min(1, current + Number(delta)),
    );
  }
}

type PhaseSignals = {
  aliveParticipants: number;
  livingMembers: number;
  monthsSinceActivity: number;
  overdueYears: number;
  hasVehicle: boolean;
};

function phaseFromMetrics(
  development: WorldDevelopment,
  process: HistoricalProcess,
  date: WorldDate,
  signals: PhaseSignals,
): HistoricalPhase {
  void development;
  void date;
  if (process.phase === 'ended') return 'ended';
  const support = process.metrics.support;
  const opposition = process.metrics.opposition;
  const escalation = process.metrics.escalation;
  const legitimacy = process.metrics.legitimacy;
  const resources = process.metrics.resources;

  // Inactivity is evidence, not a calendar rule. A process with a living
  // organization or participants may remain dormant; one without either and
  // without committed activity eventually ends.
  if (!signals.hasVehicle && signals.monthsSinceActivity >= 24) {
    return process.phase === 'suspended' || (process.suspendedYears ?? 0) >= 2
      ? 'ended'
      : 'suspended';
  }
  if (process.phase === 'suspended') {
    if (signals.hasVehicle && signals.monthsSinceActivity <= 18) return 'mobilizing';
    return (process.suspendedYears ?? 0) >= 2 ? 'ended' : 'suspended';
  }

  // The expected end date is a review trigger, not an automatic ending. After
  // it passes, unresolved processes lose support unless real activity keeps
  // them alive; a long-running movement is allowed to continue.
  if (signals.overdueYears >= 6 && support < 0.15 && signals.monthsSinceActivity > 24)
    return 'ended';
  if (signals.overdueYears >= 3 && support < 0.12 && !signals.hasVehicle) return 'declining';

  if (support < 0.08 && !signals.hasVehicle) return 'declining';

  // Recovery is possible. Repression or decline does not permanently lock a
  // process out of mobilising again if members, resources and support return.
  if (
    (process.phase === 'declining' || process.phase === 'repression') &&
    support >= 0.3 &&
    signals.hasVehicle &&
    signals.monthsSinceActivity <= 24
  ) {
    return 'mobilizing';
  }
  if (process.phase === 'declining' && support >= 0.5 && legitimacy >= 0.4 && resources >= 0.2)
    return 'institutionalizing';
  if (process.phase === 'institutionalizing') {
    if (support < 0.2 && opposition > 0.3) return 'declining';
    if (support < 0.12 && !signals.hasVehicle) return 'declining';
    return 'institutionalizing';
  }

  if (process.kind === 'war_mobilization' && support >= 0.2 && escalation >= 0.15) {
    return process.phase === 'emerging' ? 'mobilizing' : 'confrontation';
  }
  if (opposition >= support + 0.22 || escalation >= 0.7) return 'repression';
  if (support >= 0.58 && legitimacy >= 0.45 && resources >= 0.25 && support > opposition + 0.05)
    return 'institutionalizing';
  if (support >= 0.3 && (escalation >= 0.22 || opposition >= 0.3)) return 'confrontation';
  if (support >= 0.15 || signals.hasVehicle) return 'mobilizing';
  return 'emerging';
}

function phaseRegionChanges(
  process: HistoricalProcess,
  severity: number,
  phase: HistoricalPhase,
): Partial<Record<string, number>> {
  const weight =
    phase === 'confrontation'
      ? 1
      : phase === 'mobilizing'
        ? 0.55
        : phase === 'repression'
          ? 0.8
          : phase === 'institutionalizing'
            ? 0.35
            : phase === 'declining'
              ? 0.15
              : 0;
  const w = severity * weight;
  switch (process.kind) {
    case 'war_mobilization':
      return {
        warIntensity: w * 0.5,
        militaryExposure: w * 0.55,
        civilianExposure: w * 0.3,
        foodSupply: -w * 0.18,
        stability: -w * 0.12,
      };
    case 'public_health_crisis':
      return {
        epidemicInfluenza: w * 0.55,
        sanitation: -w * 0.1,
        healthcare: -w * 0.08,
        foodSupply: -w * 0.08,
      };
    case 'social_movement':
      return {
        stability: -w * 0.1,
        persecution: w * 0.08,
      };
    case 'political_repression':
      return {
        persecution: w * 0.35,
        stability: -w * 0.15,
      };
    case 'economic_crisis':
      return {
        foodSupply: -w * 0.2,
        unemployment: w * 0.25,
        stability: -w * 0.1,
      };
    default:
      return {};
  }
}

function recomputeRegionInPlace(region: {
  parameters: Record<string, number>;
  baselineParameters?: Record<string, number>;
  effects?: {
    id: string;
    start: WorldDate;
    end: WorldDate;
    changes: Record<string, number>;
    source: string;
  }[];
}): void {
  const baseline = region.baselineParameters ?? { ...region.parameters };
  const parameters = { ...baseline };
  for (const effect of region.effects ?? []) {
    for (const [key, delta] of Object.entries(effect.changes)) {
      parameters[key] = clamp01((parameters[key] ?? 0) + Number(delta));
    }
  }
  region.parameters = parameters;
  region.baselineParameters = baseline;
}

function upsertSplitLegacy(
  state: MacroState,
  development: WorldDevelopment,
  process: HistoricalProcess,
  date: WorldDate,
  childId: string,
): HistoricalLegacy {
  if (!state.legacy) state.legacy = {};
  const id = `legacy:${development.id}:organization_split:${childId}`;
  const existing = state.legacy[id];
  if (existing) return existing;
  const legacy: HistoricalLegacy = {
    id,
    processId: development.id,
    kind: 'organization_split',
    title: '一次组织分裂',
    description: '原有组织没有消失，但一部分成员带着资源和关系另立方向，冲突继续影响双方。',
    regionId: development.regionId,
    started: { ...date },
    status: 'active',
    tags: [process.kind, 'split', ...process.objectives.slice(0, 2)],
    eventWeights: {},
    parameterChanges: { stability: -0.02 },
    sourceEventId: process.lastEventId,
  };
  state.legacy[id] = legacy;
  applyLegacyBaseline(state, legacy);
  return legacy;
}

export function advanceHistoricalProcesses(
  world: WorldState,
  state: MacroState,
  date: WorldDate,
): { state: MacroState; transitions: HistoricalTransition[] } {
  const next = structuredClone(state);
  const transitions: HistoricalTransition[] = [];
  const splitCandidates: {
    development: WorldDevelopment;
    process: HistoricalProcess;
  }[] = [];

  for (const development of Object.values(next.developments ?? {})) {
    if (development.status === 'ended' || development.status === 'blocked') continue;
    if (!development.historical) {
      if (development.organizationId) {
        development.historical = ensureHistoricalProcess(development, date);
      } else continue;
    }
    const process = development.historical;
    if (!process) continue;
    // Director-created prose without an organization or any participant is a
    // regional observation, not a historical actor. End it explicitly instead
    // of letting a zero-participant pseudo-process appear as living history.
    if (
      development.source.startsWith('macro-proposal') &&
      !development.organizationId &&
      Object.keys(process.participants).length === 0
    ) {
      process.phase = 'ended';
      process.outcome = 'no_vehicle_or_participants';
      process.history.push({
        date: { ...date },
        phase: 'ended',
        note: '没有组织、成员或参与者，不能作为历史进程继续。',
      });
      process.history = process.history.slice(-120);
      development.status = 'ended';
      development.lastAssessed = { ...date };
      continue;
    }
    const organization = development.organizationId
      ? world.organizations[development.organizationId]
      : undefined;
    const livingMembers = organization
      ? organization.memberIds.filter((id) => world.persons[id] && !world.persons[id]!.died)
      : [];
    const aliveParticipantIds = Object.keys(process.participants).filter(
      (id) => world.persons[id] && !world.persons[id]!.died,
    );
    process.organizationRoles = process.organizationRoles ?? {};
    if (organization && !process.organizationRoles[organization.id])
      process.organizationRoles[organization.id] = ['vehicle'];

    const activity = process.lastActivity ?? process.phaseStarted ?? development.start;
    const monthsSinceActivity = Math.max(
      0,
      date.year * 12 + date.month - (activity.year * 12 + activity.month),
    );
    const expectedEnd = development.end.year * 12 + development.end.month;
    const overdueYears = Math.max(0, Math.floor((date.year * 12 + date.month - expectedEnd) / 12));
    const hasVehicle = livingMembers.length > 0 || aliveParticipantIds.length >= 2;
    const signals: PhaseSignals = {
      aliveParticipants: aliveParticipantIds.length,
      livingMembers: livingMembers.length,
      monthsSinceActivity,
      overdueYears,
      hasVehicle,
    };

    // Resources and support are maintained by real members and activity, not by
    // a permanently rising counter. Director intents add bounded pressure, but
    // they decay like every other political condition.
    process.metrics.resources = clamp01(
      Math.max(
        process.metrics.resources * 0.9,
        Math.min(0.8, (organization?.treasury ?? 0) / 120 + livingMembers.length * 0.025),
      ),
    );
    const activityBoost =
      monthsSinceActivity <= 12 ? Math.min(0.03, livingMembers.length * 0.006) : 0;
    process.metrics.support = clamp01(
      process.metrics.support * (monthsSinceActivity > 12 ? 0.955 : 0.985) + activityBoost,
    );
    process.metrics.opposition = clamp01(
      process.metrics.opposition * (monthsSinceActivity > 12 ? 0.96 : 0.975),
    );
    process.metrics.information = clamp01(process.metrics.information * 0.965);
    process.metrics.escalation = clamp01(process.metrics.escalation * 0.97);

    const from = process.phase;
    const to = phaseFromMetrics(development, process, date, signals);
    if (to !== from) {
      process.phase = to;
      process.phaseStarted = { ...date };
      process.lastUpdated = { ...date };
      if (to === 'suspended') {
        process.suspendedYears = (process.suspendedYears ?? 0) + 1;
      } else {
        process.suspendedYears = 0;
      }
      const participants = Object.entries(process.participants).sort(
        (a, b) => b[1].influence - a[1].influence,
      );
      const actorId = participants[0]?.[0];
      process.history.push({
        date: { ...date },
        phase: to,
        note: `阶段由 ${from} 转为 ${to}；参与人数 ${participants.length}，活跃成员 ${livingMembers.length}，距上次行动 ${monthsSinceActivity} 个月。`,
        eventId: process.lastEventId,
      });
      process.history = process.history.slice(-120);
      if (to === 'institutionalizing') {
        process.outcome =
          process.kind === 'war_mobilization'
            ? 'war_bureaucratized'
            : process.kind === 'public_health_crisis'
              ? 'public_health_regime'
              : process.kind === 'cultural_movement'
                ? 'cultural_institution'
                : 'institutionalized_or_reform';
      } else if (to === 'repression') {
        process.outcome =
          process.kind === 'war_mobilization'
            ? 'war_escalated'
            : process.kind === 'public_health_crisis'
              ? 'coercive_public_health'
              : 'repressed';
      } else if (to === 'ended') {
        process.outcome =
          process.kind === 'war_mobilization'
            ? 'war_ended_without_scripted_victor'
            : process.kind === 'public_health_crisis'
              ? 'epidemic_receded'
              : process.kind === 'social_movement'
                ? 'movement_ended_after_real_activity'
                : 'ended';
      }
      development.status = to === 'ended' ? 'ended' : to === 'declining' ? 'declining' : 'active';
      const legacy = upsertLegacy(next, development, process, to, date);
      transitions.push({
        developmentId: development.id,
        processId: development.id,
        from,
        to,
        date: { ...date },
        actorId,
        causeEventId: process.lastEventId,
        note: `历史进程《${development.description.slice(0, 80)}》从 ${from} 进入 ${to}${legacy ? `；留下「${legacy.title}」` : ''}。`,
        effect: phaseRegionChanges(process, development.severity, to),
      });
    } else if (to === 'suspended') {
      process.suspendedYears = (process.suspendedYears ?? 0) + 1;
    } else {
      process.suspendedYears = 0;
    }
    // Older saves and seeded processes may already be institutionalising or
    // repressed without a legacy. Materialise the durable consequence on the
    // first tick that observes that phase, not only on the transition year.
    upsertLegacy(next, development, process, to, date);

    if (to === 'confrontation' || to === 'repression') {
      const opponents = Object.entries(process.participants)
        .filter(([id, participation]) => {
          const person = world.persons[id];
          return (
            person &&
            !person.died &&
            participation.roles.includes('opponent') &&
            participation.influence >= 0.02
          );
        })
        .sort((a, b) => b[1].influence - a[1].influence)
        .slice(0, 3);
      const splitId = `${development.id}:split:${date.year}`;
      const alreadySplit = Object.keys(next.developments ?? {}).some((id) =>
        id.startsWith(`${development.id}:split:`),
      );
      if (
        opponents.length >= 2 &&
        aliveParticipantIds.length >= 4 &&
        !alreadySplit &&
        !next.developments?.[splitId] &&
        supportSplitRoll(world.seed, development.id, date.year) < 0.25
      ) {
        splitCandidates.push({ development, process });
      }
    }

    // A single replaceable region effect keeps current phase/severity visible
    // to statistical risk and content, without stacking annual penalties.
    const region = next.regions[development.regionId] ?? next.regions[process.regionIds[0] ?? ''];
    if (region) {
      if (!region.baselineParameters) region.baselineParameters = { ...region.parameters };
      if (!region.effects) region.effects = [];
      const id = `historical:${development.id}`;
      region.effects = region.effects.filter((effect) => effect.id !== id);
      const changes =
        process.phase === 'ended' || process.phase === 'suspended'
          ? {}
          : phaseRegionChanges(process, development.severity, process.phase);
      if (Object.keys(changes).length > 0) {
        region.effects.push({
          id,
          start: { ...process.phaseStarted },
          end: addMonths(date, 12),
          changes,
          source: `historical:${development.id}`,
        });
      }
      recomputeRegionInPlace(region);
    }
    process.lastUpdated = { ...date };
  }

  // A split is a real derived process, not a phrase. It copies only actual
  // opponents as organisers and starts with resources proportional to the
  // people who left, not to an invented national movement.
  for (const { development, process } of splitCandidates) {
    const splitId = `${development.id}:split:${date.year}`;
    const opponents = Object.entries(process.participants)
      .filter(([id, participation]) => {
        const person = world.persons[id];
        return (
          person &&
          !person.died &&
          participation.roles.includes('opponent') &&
          participation.influence >= 0.02
        );
      })
      .sort((a, b) => b[1].influence - a[1].influence)
      .slice(0, 3);
    if (opponents.length < 2 || next.developments?.[splitId]) continue;
    const child: WorldDevelopment = {
      id: splitId,
      type: development.type,
      regionId: development.regionId,
      description: `${development.description}（从既有进程分裂出的派系）`,
      severity: Math.max(0.2, development.severity * 0.7),
      start: { ...date },
      end: addMonths(date, 120),
      status: 'active',
      eventFamilyIds: development.eventFamilyIds.slice(0, 6),
      organizationId: development.organizationId,
      source: `split:${development.id}`,
    };
    const childSupport = clamp01(process.metrics.opposition * 0.4);
    child.historical = {
      kind: process.kind,
      phase: 'emerging',
      phaseStarted: { ...date },
      regionIds: [...process.regionIds],
      objectives: ['在分裂后争取成员、资源与方向'],
      sourceIds: [...process.sourceIds],
      participants: Object.fromEntries(
        opponents.map(([id, participation]) => [
          id,
          {
            roles: ['organizer'],
            influence: clamp01(participation.influence * 0.5),
            firstEventId: participation.firstEventId,
            lastEventId: process.lastEventId ?? participation.lastEventId,
            joinedAt: { ...date },
          },
        ]),
      ),
      organizationRoles: development.organizationId
        ? { [development.organizationId]: ['contested_vehicle'] }
        : {},
      metrics: {
        support: Math.max(0.12, childSupport),
        opposition: Math.max(0.12, process.metrics.support * 0.25),
        resources: clamp01(process.metrics.resources * 0.35),
        legitimacy: clamp01(process.metrics.legitimacy * 0.4),
        escalation: 0.2,
        information: clamp01(process.metrics.information * 0.6),
      },
      history: [
        {
          date: { ...date },
          phase: 'emerging',
          note: `从「${development.description.slice(0, 80)}」中分裂出来，参与者来自实际反对者。`,
        },
      ],
      source: 'event',
      lastActivity: { ...date },
    };
    next.developments![splitId] = child;
    const legacy = upsertSplitLegacy(next, development, process, date, splitId);
    transitions.push({
      developmentId: splitId,
      processId: splitId,
      from: process.phase,
      to: 'emerging',
      date: { ...date },
      actorId: opponents[0]?.[0],
      causeEventId: process.lastEventId,
      note: `「${development.description.slice(0, 80)}」中实际存在的反对者组成了新的派系；留下「${legacy.title}」。`,
      effect: {},
    });
  }

  next.updatedAt = { ...date };
  return { state: next, transitions };
}

export function recordReformLegacy(
  state: MacroState,
  processId: string,
  date: WorldDate,
): HistoricalLegacy | undefined {
  const development = state.developments?.[processId];
  if (!development?.historical) return undefined;
  return upsertLegacy(state, development, development.historical, 'institutionalizing', date);
}

function supportSplitRoll(seed: string, processId: string, year: number): number {
  return deterministicRoll(seed, 'historical-split', processId, year);
}

const ROLE_WEIGHT: Record<HistoricalParticipantRole, number> = {
  leader: 0.08,
  organizer: 0.065,
  executor: 0.06,
  supporter: 0.04,
  participant: 0.035,
  opponent: 0.055,
  perpetrator: 0.07,
  victim: 0.03,
  witness: 0.015,
  rescuer: 0.04,
  affected: 0.015,
};

/** Mutates the cloned process state; caller already owns the year draft. */
export function recordHistoricalParticipation(
  world: WorldState,
  state: MacroState,
  input: {
    processId: string;
    personId: string;
    role: HistoricalParticipantRole;
    influence?: number;
    eventId: string;
    date: WorldDate;
  },
): HistoricalProcess | undefined {
  const development = state.developments?.[input.processId];
  if (!development?.historical) return undefined;
  const person = world.persons[input.personId];
  if (!person || person.died) return undefined;
  if (!HISTORICAL_ROLES.includes(input.role)) return undefined;
  const process = development.historical;
  const existing = process.participants[input.personId];
  const social = person.life?.skills.social ?? 0.3;
  const reputation = person.life?.reputation ?? 0;
  const orgCount = Object.values(world.organizations).filter((org) =>
    org.memberIds.includes(person.id),
  ).length;
  const base = input.influence ?? ROLE_WEIGHT[input.role];
  const actual = clamp01(
    Math.max(
      0.005,
      Math.min(
        0.2,
        base * (1 + social * 0.35 + Math.max(0, reputation) * 0.3 + Math.min(3, orgCount) * 0.05),
      ),
    ),
  );
  if (existing) {
    if (!existing.roles.includes(input.role)) existing.roles.push(input.role);
    existing.influence = clamp01(existing.influence + actual);
    existing.lastEventId = input.eventId;
  } else {
    process.participants[input.personId] = {
      roles: [input.role],
      influence: actual,
      firstEventId: input.eventId,
      lastEventId: input.eventId,
      joinedAt: { ...input.date },
    };
  }
  const supports = ['participant', 'organizer', 'leader', 'supporter', 'rescuer'].includes(
    input.role,
  );
  if (supports)
    process.metrics.support = clamp01(
      process.metrics.support + actual * 0.3 * (1 - process.metrics.support * 0.55),
    );
  if (input.role === 'opponent')
    process.metrics.opposition = clamp01(
      process.metrics.opposition + actual * 0.4 * (1 - process.metrics.opposition * 0.4),
    );
  if (input.role === 'executor' || input.role === 'perpetrator')
    process.metrics.escalation = clamp01(process.metrics.escalation + actual * 0.55);
  if (input.role === 'victim')
    process.metrics.opposition = clamp01(process.metrics.opposition + actual * 0.25);
  if (input.role === 'witness')
    process.metrics.information = clamp01(process.metrics.information + actual * 0.4);
  if (input.role === 'leader' || input.role === 'organizer' || input.role === 'rescuer')
    process.metrics.legitimacy = clamp01(process.metrics.legitimacy + actual * 0.25);
  process.lastEventId = input.eventId;
  process.lastUpdated = { ...input.date };
  process.lastActivity = { ...input.date };
  return process;
}

export function recordHistoricalInfluence(
  state: MacroState,
  input: {
    processId: string;
    dimension: keyof HistoricalProcessMetrics;
    amount: number;
    eventId: string;
    date: WorldDate;
  },
): HistoricalProcess | undefined {
  const development = state.developments?.[input.processId];
  if (!development?.historical) return undefined;
  if (!HISTORICAL_METRIC_KEYS.includes(input.dimension)) return undefined;
  const process = development.historical;
  if (!Number.isFinite(input.amount)) return undefined;
  const amount = Math.max(-0.2, Math.min(0.2, input.amount));
  process.metrics[input.dimension] = clamp01(process.metrics[input.dimension] + amount);
  process.lastEventId = input.eventId;
  process.lastUpdated = { ...input.date };
  process.lastActivity = { ...input.date };
  return process;
}

export function historicalParticipantRoleLabel(role: HistoricalParticipantRole): string {
  switch (role) {
    case 'participant':
      return '参与者';
    case 'organizer':
      return '组织者';
    case 'leader':
      return '领导者';
    case 'executor':
      return '执行者';
    case 'supporter':
      return '支持者';
    case 'opponent':
      return '反对者';
    case 'perpetrator':
      return '施暴者';
    case 'victim':
      return '受害者';
    case 'witness':
      return '见证者';
    case 'rescuer':
      return '救助者';
    case 'affected':
      return '受影响者';
  }
}

export function historicalPersonAvailable(person: Person | undefined, date: WorldDate): boolean {
  if (!person || person.died || !person.historicalIdentity) return false;
  const month = date.year * 12 + date.month;
  const from =
    person.historicalIdentity.activeFrom.year * 12 + person.historicalIdentity.activeFrom.month;
  const to = person.historicalIdentity.activeTo
    ? person.historicalIdentity.activeTo.year * 12 + person.historicalIdentity.activeTo.month
    : Number.POSITIVE_INFINITY;
  return month >= from && month <= to;
}
