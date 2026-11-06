import type { EventFact, WorldState } from '../domain.js';

export type ContentCritiqueMetrics = {
  events: number;
  stateEvents: number;
  stateTicks: number;
  stateReactions: number;
  stateTransitions: number;
  distinctStateDefinitions: number;
  activeStatesAtEnd: number;
  endedStates: number;
  eventsWithEffects: number;
  distinctTexts: number;
  repeatRate: number;
  deaths: number;
  births: number;
};

export type ContentCritiqueFinding = {
  code: string;
  severity: 'info' | 'warn' | 'fail';
  message: string;
};

export type ContentCritique = {
  metrics: ContentCritiqueMetrics;
  findings: ContentCritiqueFinding[];
  verdict: 'pass' | 'mixed' | 'fail';
};

function count(values: string[]): Map<string, number> {
  const map = new Map<string, number>();
  for (const value of values) map.set(value, (map.get(value) ?? 0) + 1);
  return map;
}

/**
 * Deterministic critic pass. It does not grade prose; it checks whether the
 * mechanics actually appeared, changed facts, repeated, and left traces. The
 * independent literary critique is a separate document written from full lives.
 */
export function critiqueContentRun(world: WorldState, events: EventFact[]): ContentCritique {
  const stateEvents = events.filter(
    (event) => event.action.startsWith('state_') || event.tags?.includes('state'),
  );
  const stateTicks = stateEvents.filter((event) => event.action.startsWith('state_tick:')).length;
  const stateReactions = stateEvents.filter((event) =>
    event.action.startsWith('state_reaction:'),
  ).length;
  const stateTransitions = stateEvents.filter(
    (event) =>
      event.action.startsWith('state_transition:') ||
      event.effects.some((effect) => effect.type === 'state_transition'),
  ).length;
  const definitions = new Set(Object.values(world.states ?? {}).map((state) => state.definitionId));
  for (const event of events) {
    for (const effect of event.effects) {
      if (effect.type === 'state_add') definitions.add(effect.stateId);
      if (effect.type === 'state_transition') definitions.add(effect.toStateId);
    }
  }
  const states = Object.values(world.states ?? {});
  const activeStatesAtEnd = states.filter((state) => state.active).length;
  const endedStates = states.filter((state) => !state.active).length;
  const texts = events.map((event) => event.immediateText.replace(/\s+/g, ''));
  const textCounts = count(texts);
  const repeated = [...textCounts.values()]
    .filter((value) => value > 1)
    .reduce((sum, value) => sum + value, 0);
  const metrics: ContentCritiqueMetrics = {
    events: events.length,
    stateEvents: stateEvents.length,
    stateTicks,
    stateReactions,
    stateTransitions,
    distinctStateDefinitions: definitions.size,
    activeStatesAtEnd,
    endedStates,
    eventsWithEffects: events.filter((event) => event.effects.length > 0).length,
    distinctTexts: textCounts.size,
    repeatRate: events.length > 0 ? Number((repeated / events.length).toFixed(4)) : 0,
    deaths: events.filter((event) => event.effects.some((effect) => effect.type === 'death'))
      .length,
    births: events.filter((event) => event.effects.some((effect) => effect.type === 'birth'))
      .length,
  };
  const findings: ContentCritiqueFinding[] = [];
  if (metrics.events === 0) {
    findings.push({
      code: 'no_events',
      severity: 'fail',
      message: 'run produced no committed events',
    });
  }
  if (metrics.stateEvents === 0) {
    findings.push({
      code: 'no_state_events',
      severity: 'fail',
      message: 'state layer never produced a committed fact',
    });
  }
  if (metrics.stateTicks === 0 && states.some((state) => state.active)) {
    findings.push({
      code: 'no_state_ticks',
      severity: 'warn',
      message: 'active states never ticked',
    });
  }
  if (metrics.stateReactions === 0) {
    findings.push({
      code: 'no_state_reactions',
      severity: 'warn',
      message: 'no state reacted to a committed tag',
    });
  }
  if (metrics.stateTransitions === 0) {
    findings.push({
      code: 'no_state_transitions',
      severity: 'warn',
      message: 'no state transition was committed',
    });
  }
  if (metrics.distinctStateDefinitions < 3 && metrics.events > 100) {
    findings.push({
      code: 'low_state_variety',
      severity: 'warn',
      message: `only ${metrics.distinctStateDefinitions} state definitions appeared in a long run`,
    });
  }
  if (metrics.repeatRate > 0.2) {
    findings.push({
      code: 'high_repetition',
      severity: 'warn',
      message: `repeated text rate ${metrics.repeatRate} is high`,
    });
  }
  if (metrics.eventsWithEffects / Math.max(1, metrics.events) < 0.55) {
    findings.push({
      code: 'low_consequence_ratio',
      severity: 'warn',
      message: 'many events committed without typed consequences',
    });
  }
  if (endedStates > 0 && metrics.stateTransitions + metrics.stateEvents === 0) {
    findings.push({
      code: 'silent_state_end',
      severity: 'fail',
      message: 'states ended without a committed state fact',
    });
  }
  const failures = findings.filter((finding) => finding.severity === 'fail').length;
  const warns = findings.filter((finding) => finding.severity === 'warn').length;
  return {
    metrics,
    findings,
    verdict: failures > 0 ? 'fail' : warns >= 3 ? 'mixed' : 'pass',
  };
}
