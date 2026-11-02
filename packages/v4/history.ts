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
import type { MacroState, WorldDevelopment } from './macro.js';

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

function phaseFromMetrics(
  development: WorldDevelopment,
  process: HistoricalProcess,
  date: WorldDate,
  aliveParticipants: number,
): HistoricalPhase {
  const month = date.year * 12 + date.month;
  if (development.end.year * 12 + development.end.month < month) return 'ended';
  if (process.phase === 'ended') return 'ended';
  if (process.metrics.support < 0.08 && aliveParticipants < 2) return 'declining';
  if (
    process.phase === 'institutionalizing' ||
    process.phase === 'repression' ||
    process.phase === 'declining'
  ) {
    if (process.metrics.support < 0.12 && process.metrics.opposition > process.metrics.support) {
      return 'declining';
    }
    return process.phase;
  }
  // A war does not become a domestic reform coalition just because support is
  // high. Its phase remains confrontation until the process ends or is repressed.
  if (
    process.kind === 'war_mobilization' &&
    process.metrics.support >= 0.2 &&
    process.metrics.escalation >= 0.2
  ) {
    return process.phase === 'emerging' ? 'mobilizing' : 'confrontation';
  }
  if (
    process.metrics.support >= 0.55 &&
    process.metrics.legitimacy >= 0.42 &&
    process.metrics.resources >= 0.24 &&
    process.metrics.support > process.metrics.opposition
  ) {
    return 'institutionalizing';
  }
  if (
    process.metrics.opposition >= process.metrics.support + 0.18 ||
    process.metrics.escalation >= 0.68
  ) {
    return 'repression';
  }
  if (
    process.metrics.support >= 0.28 &&
    (process.metrics.escalation >= 0.2 || process.metrics.opposition >= 0.28)
  ) {
    return 'confrontation';
  }
  if (process.metrics.support >= 0.16 || aliveParticipants >= 2) return 'mobilizing';
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

export function advanceHistoricalProcesses(
  world: WorldState,
  state: MacroState,
  date: WorldDate,
): { state: MacroState; transitions: HistoricalTransition[] } {
  const next = structuredClone(state);
  const transitions: HistoricalTransition[] = [];
  for (const development of Object.values(next.developments ?? {})) {
    if (development.status === 'ended' || development.status === 'blocked') continue;
    if (!development.historical) {
      if (development.organizationId || development.eventFamilyIds.length > 0) {
        development.historical = ensureHistoricalProcess(development, date);
      } else continue;
    }
    const process = development.historical;
    if (!process) continue;
    const organization = development.organizationId
      ? world.organizations[development.organizationId]
      : undefined;
    const livingMembers = organization
      ? organization.memberIds.filter((id) => world.persons[id] && !world.persons[id]!.died)
      : [];
    process.organizationRoles = process.organizationRoles ?? {};
    if (organization && !process.organizationRoles[organization.id])
      process.organizationRoles[organization.id] = ['vehicle'];
    process.metrics.resources = clamp01(
      Math.max(
        process.metrics.resources * 0.92,
        Math.min(0.8, (organization?.treasury ?? 0) / 120 + livingMembers.length * 0.025),
      ),
    );
    process.metrics.support = clamp01(
      process.metrics.support * 0.98 +
        (livingMembers.length > 0 ? Math.min(0.08, livingMembers.length * 0.015) : 0),
    );
    process.metrics.opposition = clamp01(process.metrics.opposition * 0.97);
    process.metrics.information = clamp01(process.metrics.information * 0.96);
    const from = process.phase;
    const aliveParticipantCount = Object.keys(process.participants).filter(
      (id) => world.persons[id] && !world.persons[id]!.died,
    ).length;
    const to = phaseFromMetrics(development, process, date, aliveParticipantCount);
    if (to !== from) {
      process.phase = to;
      process.phaseStarted = { ...date };
      process.lastUpdated = { ...date };
      const participants = Object.entries(process.participants).sort(
        (a, b) => b[1].influence - a[1].influence,
      );
      const actorId = participants[0]?.[0];
      process.history.push({
        date: { ...date },
        phase: to,
        note: `阶段由 ${from} 转为 ${to}；参与人数 ${participants.length}。`,
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
              : 'ended';
      }
      development.status = to === 'ended' ? 'ended' : to === 'declining' ? 'declining' : 'active';
      transitions.push({
        developmentId: development.id,
        processId: development.id,
        from,
        to,
        date: { ...date },
        actorId,
        causeEventId: process.lastEventId,
        note: `历史进程《${development.description.slice(0, 80)}》从 ${from} 进入 ${to}。`,
        effect: phaseRegionChanges(process, development.severity, to),
      });
    }
    // A single replaceable region effect keeps current phase/severity visible
    // to statistical risk and content, without stacking annual penalties.
    const region = next.regions[development.regionId] ?? next.regions[process.regionIds[0] ?? ''];
    if (region) {
      if (!region.baselineParameters) region.baselineParameters = { ...region.parameters };
      if (!region.effects) region.effects = [];
      const id = `historical:${development.id}`;
      region.effects = region.effects.filter((effect) => effect.id !== id);
      const changes = phaseRegionChanges(process, development.severity, process.phase);
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
  next.updatedAt = { ...date };
  return { state: next, transitions };
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
  if (supports) process.metrics.support = clamp01(process.metrics.support + actual * 0.45);
  if (input.role === 'opponent')
    process.metrics.opposition = clamp01(process.metrics.opposition + actual * 0.55);
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
