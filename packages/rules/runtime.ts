import { clamp } from '../contracts/index.js';
import type { HistoricalEvent, Person, World } from '../contracts/index.js';
import { isDetained } from '../coercion/index.js';
import { random } from '../simulation-core/random.js';
import {
  MAX_ACTIVE_DEFINITIONS,
  MAX_EXPOSURES,
  MAX_OPPORTUNITIES,
  MAX_PROCESSES,
  type AbilityState,
  type DefinitionKey,
  type Effect,
  type RuleDefinition,
  type RuleState,
} from './schema.js';
import {
  effectFeasible,
  evaluatePredicate,
  maxDefinitionKey,
  resolveRef,
  scopeUnits,
  selectRoles,
  type RefTarget,
  type RoleBinding,
  type ScopeUnit,
} from './match.js';
import { compileRule, definitionKey, RuleCompileError, type CompileOptions } from './compiler.js';
import type { RuleDiagnostic } from './compiler.js';

export type RuleEmit = (
  kind: string,
  people: string[],
  locationId: string | undefined,
  text: string,
  data?: Record<string, unknown>,
  causes?: string[],
  significance?: number,
) => HistoricalEvent;

const emptyTelemetry = () => ({
  definitions: 0,
  candidates: 0,
  predicates: 0,
  occurrences: 0,
  failed: 0,
  gasExhausted: 0,
  lastMonth: 0,
});

export function emptyRuntime(): RuleState {
  return {
    schemaVersion: 1,
    definitions: {},
    active: {},
    lifecycle: {},
    processes: {},
    abilities: {},
    exposures: {},
    opportunities: {},
    receipts: [],
    telemetry: emptyTelemetry(),
    authorRequests: [],
    births: {},
    lifePrograms: {},
    hiddenFutures: {},
    deathSummaries: {},
  };
}

/** Old snapshots have no runtime; initialize only when they are advanced. */
export function ensureRuntime(w: World): RuleState {
  if (!w.runtime) w.runtime = emptyRuntime();
  const r = w.runtime;
  r.schemaVersion = 1;
  r.definitions ??= {};
  r.active ??= {};
  r.lifecycle ??= {};
  r.processes ??= {};
  r.abilities ??= {};
  r.exposures ??= {};
  r.opportunities ??= {};
  r.receipts ??= [];
  r.telemetry ??= emptyTelemetry();
  r.authorRequests ??= [];
  for (const request of r.authorRequests) {
    request.status ??= 'open';
    request.jobId ??= `event-author-${w.id}-${request.month}-${request.siteId}`;
  }
  r.births ??= {};
  r.lifePrograms ??= {};
  r.hiddenFutures ??= {};
  r.deathSummaries ??= {};
  return r;
}

export function runtimeDefinition(w: World, key: DefinitionKey): RuleDefinition | undefined {
  return w.runtime?.definitions[key];
}

export function activeDefinition(w: World, id: string): RuleDefinition | undefined {
  const r = w.runtime;
  const active = r?.active[id];
  if (!r || !active) return undefined;
  const lifecycle = r.lifecycle[active.key];
  if (lifecycle && lifecycle.status !== 'active') return undefined;
  return r.definitions[active.key];
}

export function installDefinition(
  w: World,
  definition: RuleDefinition,
  causeId: string,
): { key: DefinitionKey; created: boolean } {
  const r = ensureRuntime(w);
  const key = definitionKey(definition);
  if (r.definitions[key]) return { key, created: false };
  if (Object.keys(r.definitions).length >= MAX_ACTIVE_DEFINITIONS)
    throw new RuleCompileError('definition_cap', 'runtime', 'active definition catalogue is full');
  const current = r.active[definition.id];
  if (current && current.version > definition.version)
    throw new RuleCompileError(
      'stale_version',
      'version',
      `version ${definition.version} is older than active version ${current.version}`,
    );
  if (current && current.version === definition.version)
    return { key: current.key, created: false };
  r.definitions[key] = definition;
  r.active[definition.id] = {
    version: definition.version,
    key,
    activatedAt: w.month,
    causeId,
  };
  r.lifecycle[key] = {
    status: 'active',
    activatedAt: w.month,
    causeId,
    failures: 0,
    occurrences: 0,
    lastBySite: {},
    countBySite: {},
  };
  r.telemetry.definitions = Object.keys(r.definitions).length;
  return { key, created: true };
}

export function activateRule(
  w: World,
  input: unknown,
  causeId: string,
  options: CompileOptions = {},
) {
  const { definition, dryRun } = compileRule(input, w, options);
  const installed = installDefinition(w, definition, causeId);
  return { ...installed, definition, dryRun };
}

export function retireDefinition(w: World, id: string, causeId: string, reason: string) {
  const r = ensureRuntime(w);
  const active = r.active[id];
  if (!active) return false;
  const lifecycle = r.lifecycle[active.key];
  if (lifecycle) {
    lifecycle.status = 'retired';
    lifecycle.causeId = causeId;
  }
  delete r.active[id];
  r.receipts.push(`retire:${id}:${causeId}:${reason}`.slice(0, 220));
  r.receipts = r.receipts.slice(-512);
  return true;
}

export function pauseDefinition(w: World, key: DefinitionKey, causeId: string, reason: string) {
  const r = ensureRuntime(w);
  const lifecycle = r.lifecycle[key];
  if (!lifecycle) return false;
  lifecycle.status = 'paused';
  lifecycle.causeId = causeId;
  r.receipts.push(`pause:${key}:${causeId}:${reason}`.slice(0, 220));
  r.receipts = r.receipts.slice(-512);
  return true;
}

type TriggerMatch = { matched: boolean; causeIds: string[] };

function triggerMatch(
  def: RuleDefinition,
  w: World,
  events: readonly HistoricalEvent[],
): TriggerMatch {
  const matching = (predicate: (event: HistoricalEvent) => boolean) =>
    events
      .filter((event) => event.month === w.month && predicate(event))
      .slice(0, 8)
      .map((event) => event.id);
  switch (def.trigger.kind) {
    case 'periodic':
      return { matched: w.month % def.trigger.interval === 0, causeIds: [] };
    case 'event':
      return {
        matched: matching((event) => event.kind === def.trigger.eventKind).length > 0,
        causeIds: matching((event) => event.kind === def.trigger.eventKind),
      };
    case 'birth':
      return {
        matched: matching((event) => event.kind === 'birth').length > 0,
        causeIds: matching((event) => event.kind === 'birth'),
      };
    case 'death':
      return {
        matched: matching((event) => event.kind === 'death').length > 0,
        causeIds: matching((event) => event.kind === 'death'),
      };
    case 'migration':
      return {
        matched: matching((event) => event.kind === 'migration').length > 0,
        causeIds: matching((event) => event.kind === 'migration'),
      };
    case 'war':
      return {
        matched: matching((event) => event.kind === 'war_started').length > 0,
        causeIds: matching((event) => event.kind === 'war_started'),
      };
    case 'shortage':
      return {
        matched: matching((event) => event.kind === 'scarcity').length > 0,
        causeIds: matching((event) => event.kind === 'scarcity'),
      };
    case 'tech':
      return {
        matched:
          matching((event) => event.kind === 'innovation' || event.kind === 'discovery').length > 0,
        causeIds: matching((event) => event.kind === 'innovation' || event.kind === 'discovery'),
      };
  }
}

function unitForSite(w: World, siteId: string): ScopeUnit | undefined {
  const settlement = w.settlements.find((s) => s.id === siteId);
  return settlement ? { key: siteId, siteId, polityId: settlement.polityId } : undefined;
}

function occurrenceText(def: RuleDefinition, roles: RoleBinding, w: World) {
  const names = Object.values(roles)
    .map((id) => w.persons.find((p) => p.id === id)?.name)
    .filter((name): name is string => !!name)
    .slice(0, 4);
  return names.length
    ? `${def.title}：${names.join('、')}被卷入这次实际发生的事件。`
    : `${def.title}在当前世界条件下实际发生。`;
}

export type RuleAdvanceResult = {
  occurrences: number;
  processes: number;
  failed: number;
  gasExhausted: boolean;
};

/**
 * Deterministic monthly rule pass. It is called by simulation-core.advance after
 * existing systems have produced this month's events. Definitions only react to
 * the event snapshot from the start of the pass, so a rule cannot recursively
 * trigger itself in the same tick.
 */
export function advanceRules(
  w: World,
  emit: RuleEmit,
  events: HistoricalEvent[],
): RuleAdvanceResult {
  const r = ensureRuntime(w);
  if (
    !Object.keys(r.active).length &&
    !Object.keys(r.processes).length &&
    !Object.keys(r.exposures).length &&
    !Object.keys(r.opportunities).length &&
    !Object.keys(r.abilities).length
  ) {
    r.telemetry.lastMonth = w.month;
    return { occurrences: 0, processes: 0, failed: 0, gasExhausted: false };
  }
  const triggerSnapshot = events.slice();
  let occurrences = 0,
    processTicks = 0,
    failed = 0,
    gasExhausted = false;
  const perMonth = new Map<string, number>();
  const ordered = Object.entries(r.active).sort((a, b) => a[0].localeCompare(b[0]));
  for (const [definitionId, active] of ordered) {
    const def = r.definitions[active.key];
    const lifecycle = r.lifecycle[active.key];
    if (!def || !lifecycle || lifecycle.status !== 'active') continue;
    // Ability definitions are executed by advanceAbilities with their own
    // cost/cooldown/exposure path; they are not event templates.
    if (def.kind === 'ability') continue;
    if (lifecycle.occurrences >= Math.min(def.maxOccurrences, def.caps.global)) continue;
    lifecycle.countBySite ??= {};
    const trigger = triggerMatch(def, w, triggerSnapshot);
    if (!trigger.matched) continue;
    if ((perMonth.get(definitionId) ?? 0) >= def.caps.perMonth) continue;
    const units = scopeUnits(w, def.scope);
    const counter = { predicates: 0, gas: def.gas, exhausted: false };
    for (const unit of units.slice(0, 32)) {
      if (counter.exhausted) {
        gasExhausted = true;
        break;
      }
      const last = lifecycle.lastBySite[unit.key] ?? -Infinity;
      if (w.month - last < def.cooldown) continue;
      if ((lifecycle.countBySite[unit.key] ?? 0) >= def.caps.perSite) continue;
      const selected = selectRoles(w, def, unit);
      r.telemetry.candidates += selected.ok ? selected.match.candidates : selected.candidates;
      if (!selected.ok) continue;
      if (!evaluatePredicate({ w, unit, roles: selected.match.roles, counter }, def.conditions)) {
        if (counter.exhausted) {
          gasExhausted = true;
          break;
        }
        continue;
      }
      const roles = selected.match.roles;
      let infeasible: string | undefined;
      for (const effect of def.effects) {
        infeasible = effectFeasible(w, unit, roles, effect);
        if (infeasible) break;
      }
      if (infeasible) continue;
      if (
        def.chance < 1 &&
        random(w.seed, w.month, def.id, def.version, unit.key, 'chance') > def.chance
      )
        continue;
      const causeIds = [
        ...new Set([...trigger.causeIds, ...(lifecycle.causeId ? [lifecycle.causeId] : [])]),
      ].slice(0, 8);
      const event = emit(
        'rule_occurrence',
        [...new Set(Object.values(roles))],
        unit.siteId,
        occurrenceText(def, roles, w),
        {
          definitionId: def.id,
          definitionVersion: def.version,
          definitionKey: active.key,
          kind: def.kind,
          trigger: def.trigger.kind,
          roles,
          effectTypes: def.effects.map((effect) => effect.type),
          private: true,
        },
        causeIds,
        def.significance,
      );
      try {
        const applied = applyEffects(w, unit, roles, def.effects, emit, [event.id], active.key);
        if (def.process) {
          const process = startProcess(w, def, active.key, unit, roles, event.id);
          event.data.processId = process.id;
        }
        event.data.applied = applied;
        lifecycle.occurrences++;
        lifecycle.lastBySite[unit.key] = w.month;
        lifecycle.countBySite[unit.key] = (lifecycle.countBySite[unit.key] ?? 0) + 1;
        r.telemetry.occurrences++;
        perMonth.set(definitionId, (perMonth.get(definitionId) ?? 0) + 1);
        occurrences++;
      } catch (error) {
        lifecycle.failures++;
        r.telemetry.failed++;
        failed++;
        event.data.failed = (error as Error).message.slice(0, 240);
        if (lifecycle.failures >= 3) {
          pauseDefinition(w, active.key, event.id, 'repeated effect failure');
          event.data.pausedDefinition = true;
        }
      }
      if ((perMonth.get(definitionId) ?? 0) >= def.caps.perMonth) break;
    }
    r.telemetry.predicates += counter.predicates;
    r.telemetry.gasExhausted = r.telemetry.gasExhausted + (counter.exhausted ? 1 : 0);
  }
  advanceAbilities(w, emit);
  const processes = advanceProcesses(w, emit);
  processTicks = processes.ticks;
  r.telemetry.failed += processes.failed;
  failed += processes.failed;
  expireOpportunities(w);
  respondToExposures(w, emit);
  r.telemetry.lastMonth = w.month;
  return { occurrences, processes: processTicks, failed, gasExhausted };
}

function startProcess(
  w: World,
  def: RuleDefinition,
  key: DefinitionKey,
  unit: ScopeUnit,
  roles: RoleBinding,
  causeId: string,
) {
  const r = ensureRuntime(w);
  if (Object.keys(r.processes).length >= MAX_PROCESSES)
    throw new RuleCompileError('process_cap', 'process', 'process table is full');
  const id = `process-${key}-${unit.key}-${w.month}-${Object.keys(r.processes).length}`;
  const process = {
    id,
    definitionKey: key,
    siteId: unit.siteId ?? 'world',
    roles: { ...roles },
    started: w.month,
    due: w.month + def.process!.interval,
    until: w.month + def.process!.months,
    causeIds: [causeId],
    status: 'active' as const,
    ticks: 0,
  };
  r.processes[id] = process;
  return process;
}

function advanceProcesses(w: World, emit: RuleEmit) {
  const r = ensureRuntime(w);
  let ticks = 0,
    failed = 0;
  for (const process of Object.values(r.processes).sort((a, b) => a.id.localeCompare(b.id))) {
    if (process.status !== 'active' || process.due > w.month) continue;
    const def = r.definitions[process.definitionKey];
    if (!def?.process) {
      process.status = 'failed';
      failed++;
      continue;
    }
    const unit = unitForSite(w, process.siteId);
    if (!unit) {
      process.status = 'failed';
      failed++;
      continue;
    }
    let roles = { ...process.roles };
    const hasVacancy = Object.values(roles).some((id) => {
      const person = w.persons.find((p) => p.id === id);
      return !person || person.death !== undefined;
    });
    if (hasVacancy) {
      if (!def.process.allowVacancy) {
        process.status = 'failed';
        failed++;
        emit(
          'rule_process_failed',
          Object.values(roles),
          process.siteId,
          `${def.title}因关键参与者缺席而无法继续。`,
          { processId: process.id, definitionKey: process.definitionKey, reason: 'vacancy' },
          process.causeIds,
          0.7,
        );
        continue;
      }
      const replacement = selectRoles(w, def, unit);
      if (!replacement.ok) {
        process.due += def.process.interval;
        continue;
      }
      roles = replacement.match.roles;
      process.roles = roles;
    }
    const payerId = def.process.payerRole ? roles[def.process.payerRole] : Object.values(roles)[0];
    const payer = payerId ? w.persons.find((p) => p.id === payerId) : undefined;
    if (def.process.upkeep > 0) {
      if (!payer || payer.death !== undefined || payer.coin + 1e-9 < def.process.upkeep) {
        process.status = 'failed';
        failed++;
        emit(
          'rule_process_failed',
          payerId ? [payerId] : [],
          process.siteId,
          `${def.title}因维护成本无法支付而中止。`,
          {
            processId: process.id,
            definitionKey: process.definitionKey,
            reason: 'upkeep',
            upkeep: def.process.upkeep,
          },
          process.causeIds,
          0.7,
        );
        continue;
      }
      payer.coin -= def.process.upkeep;
      const site = w.settlements.find((s) => s.id === process.siteId);
      if (site) site.coin += def.process.upkeep;
    }
    let infeasible: string | undefined;
    for (const effect of def.process.effects) {
      infeasible = effectFeasible(w, unit, roles, effect);
      if (infeasible) break;
    }
    if (infeasible) {
      process.status = 'failed';
      failed++;
      emit(
        'rule_process_failed',
        Object.values(roles),
        process.siteId,
        `${def.title}的持续效果失去现实条件。`,
        {
          processId: process.id,
          definitionKey: process.definitionKey,
          reason: infeasible.slice(0, 200),
        },
        process.causeIds,
        0.7,
      );
      continue;
    }
    try {
      const applied = applyEffects(
        w,
        unit,
        roles,
        def.process.effects,
        emit,
        process.causeIds,
        process.definitionKey,
      );
      process.ticks++;
      process.due += def.process.interval;
      const event = emit(
        'rule_process_tick',
        Object.values(roles),
        process.siteId,
        `${def.title}继续按既定规则运行。`,
        {
          processId: process.id,
          definitionKey: process.definitionKey,
          tick: process.ticks,
          upkeep: def.process.upkeep,
          applied,
          private: true,
        },
        process.causeIds,
        0.45,
      );
      process.lastEventId = event.id;
      process.causeIds = [...process.causeIds, event.id].slice(-8);
      ticks++;
      if (process.due > process.until || w.month >= process.until) {
        process.status = 'ended';
        emit(
          'rule_process_ended',
          Object.values(roles),
          process.siteId,
          `${def.title}按预定条件结束。`,
          { processId: process.id, definitionKey: process.definitionKey, ticks: process.ticks },
          [event.id],
          0.5,
        );
      }
    } catch (error) {
      process.status = 'failed';
      failed++;
      emit(
        'rule_process_failed',
        Object.values(roles),
        process.siteId,
        `${def.title}在执行中失败。`,
        {
          processId: process.id,
          definitionKey: process.definitionKey,
          reason: (error as Error).message.slice(0, 200),
        },
        process.causeIds,
        0.7,
      );
    }
  }
  return { ticks, failed };
}

/**
 * Bounded autonomous ability use. Rare ability holders respond to real needs
 * (illness, scarcity, blocked travel) instead of waiting for a player command.
 */
export function advanceAbilities(w: World, emit: RuleEmit): number {
  const r = ensureRuntime(w);
  let used = 0;
  for (const state of Object.values(r.abilities).sort((a, b) =>
    a.personId.localeCompare(b.personId),
  )) {
    const actor = w.persons.find((p) => p.id === state.personId && p.death === undefined);
    if (!actor || actor.journey || isDetained(w, actor)) continue;
    if (state.uses >= state.maxUses) continue;
    if (state.blockedUntil && w.month < state.blockedUntil) continue;
    if (w.month - state.lastUsed < state.cooldown) continue;
    const site = w.settlements.find((s) => s.id === actor.locationId);
    if (!site) continue;
    let target: Person | undefined = actor;
    if (state.mode === 'healing' || state.mode === 'influence') {
      target = w.persons
        .filter(
          (p) =>
            p.death === undefined && p.locationId === site.id && !p.journey && p.id !== actor.id,
        )
        .sort((a, b) => a.health - b.health || a.id.localeCompare(b.id))[0];
    }
    let shouldUse = false;
    if (state.mode === 'healing')
      shouldUse = !!target && (target.health < 0.78 || !!target.life?.illness);
    else if (state.mode === 'influence') shouldUse = !!target && target.stress > 0.55;
    else if (state.mode === 'production') shouldUse = site.scarcity > 0.12;
    else if (state.mode === 'knowledge')
      shouldUse = actor.goals.some((goal) => goal.status === 'active' && goal.kind === 'learn');
    else if (state.mode === 'movement') shouldUse = !!actor.journey;
    else if (state.mode === 'sense') shouldUse = actor.stress > 0.45 || site.unrest > 0.35;
    else if (state.mode === 'communication')
      shouldUse = actor.relationships.some((rel) => {
        const other = w.persons.find((p) => p.id === rel.personId && p.death === undefined);
        return !!other && other.locationId !== actor.locationId;
      });
    if (!shouldUse) continue;
    if (random(w.seed, w.month, actor.id, state.id, 'auto-use') > 0.18) continue;
    try {
      performAbility(
        w,
        actor,
        target ?? actor,
        state.mode,
        state.potency,
        state.cost,
        emit,
        state.causeIds[0] ?? 'auto-ability',
      );
      used++;
    } catch {
      // Insufficient cost, cooldown or an investigation is a real constraint,
      // not a reason to block the shared clock.
    }
  }
  return used;
}

function respondToExposures(w: World, emit: RuleEmit) {
  const r = ensureRuntime(w);
  for (const exposure of Object.values(r.exposures)) {
    if (exposure.responded || w.month - exposure.month < 1) continue;
    const subject = w.persons.find((p) => p.id === exposure.personId);
    if (!subject) {
      exposure.responded = true;
      continue;
    }
    const witnesses = exposure.witnessIds
      .map((id) => w.persons.find((p) => p.id === id))
      .filter((p): p is Person => !!p && p.death === undefined);
    const organizations = exposure.organizationIds
      .map((id) => w.organizations.find((o) => o.id === id))
      .filter((o): o is NonNullable<typeof o> => !!o && o.status === 'active');
    if (witnesses.length) {
      emit(
        'anomaly_witnessed',
        [subject.id, ...witnesses.map((p) => p.id)],
        subject.locationId,
        `${subject.name}的异常能力在真实证人中留下了记忆；消息仍受地点与关系限制。`,
        {
          exposureId: exposure.id,
          abilityId: exposure.abilityId,
          witnessIds: witnesses.map((p) => p.id),
          classification: 'anomaly-social-response',
        },
        [exposure.causeId],
        0.7,
      );
    }
    if (organizations.length) {
      const event = emit(
        'anomaly_investigation',
        [subject.id],
        subject.locationId,
        `当地组织开始调查${subject.name}的异常事件；调查有来源、范围与现实成本。`,
        {
          exposureId: exposure.id,
          organizationIds: organizations.map((o) => o.id),
          classification: 'anomaly-institutional-response',
        },
        [exposure.causeId],
        0.8,
      );
      const site = w.settlements.find((s) => s.id === subject.locationId);
      if (site) site.unrest = clamp(site.unrest + 0.01);
      const ability = r.abilities[subject.id];
      if (ability) ability.blockedUntil = Math.max(ability.blockedUntil ?? 0, w.month + 6);
      for (const organization of organizations) {
        organization.causeIds = [...organization.causeIds, event.id].slice(-12);
      }
      const program = r.lifePrograms[subject.id];
      if (program && !program.goals.some((goal) => goal.kind === 'survive')) {
        program.goals.push({
          kind: 'survive',
          weight: 0.7,
          reason: '异常能力被组织调查，人生计划转向先处理现实风险。',
        });
        program.milestones = [...(program.milestones ?? []), 'ability-exposure-replan'];
        emit(
          'life_program_replan',
          [subject.id],
          subject.locationId,
          `${subject.name}的出生愿望遭遇现实冲击，人生计划开始重估。`,
          {
            lifeProgramId: program.id,
            trigger: 'ability-exposure',
            newGoal: 'survive',
            classification: 'life-program-replan',
          },
          [event.id],
          0.7,
        );
      }
    }
    exposure.responded = true;
  }
}

function expireOpportunities(w: World) {
  const r = ensureRuntime(w);
  for (const opportunity of Object.values(r.opportunities)) {
    if (opportunity.status === 'open' && w.month > opportunity.dueMonth)
      opportunity.status = 'expired';
  }
  const open = Object.values(r.opportunities).filter((o) => o.status === 'open');
  if (open.length > MAX_OPPORTUNITIES) {
    for (const opportunity of open.slice(0, open.length - MAX_OPPORTUNITIES))
      opportunity.status = 'expired';
  }
}

function addOpportunity(
  w: World,
  role: string,
  personId: string,
  effect: Extract<Effect, { type: 'offer' }>,
  unit: ScopeUnit,
  roles: RoleBinding,
  definitionKey: string,
  causeIds: string[],
) {
  const r = ensureRuntime(w);
  const id = `opportunity-${definitionKey}-${role}-${personId}-${w.month}`;
  if (r.opportunities[id]) return id;
  const count = Object.values(r.opportunities).filter((o) => o.status === 'open').length;
  if (count >= MAX_OPPORTUNITIES)
    throw new RuleCompileError('opportunity_cap', 'effect', 'opportunity table is full');
  const resolvedTarget = effect.targetId ? resolveRef(w, unit, roles, effect.targetId) : undefined;
  r.opportunities[id] = {
    id,
    personId,
    definitionKey,
    title: effect.intention,
    action: effect.action,
    targetId:
      resolvedTarget?.kind === 'person'
        ? resolvedTarget.person.id
        : resolvedTarget?.kind === 'settlement'
          ? resolvedTarget.settlement.id
          : undefined,
    dueMonth: w.month + 12,
    status: 'open',
    causeIds: [...causeIds].slice(-8),
    siteId: unit.siteId,
  };
  return id;
}

function addToTarget(
  target: RefTarget,
  resource: 'coin' | 'food' | 'medicine',
  amount: number,
  w: World,
) {
  if (resource === 'coin') {
    if (target.kind === 'person') target.person.coin += amount;
    else if (target.kind === 'settlement') target.settlement.coin += amount;
    else if (target.kind === 'polity') target.polity.treasury += amount;
    else target.organization.treasury += amount;
    return;
  }
  if (resource === 'food') {
    if (target.kind !== 'settlement') throw new Error('food can only move between settlements');
    target.settlement.food += amount;
    return;
  }
  if (target.kind !== 'settlement' && target.kind !== 'polity')
    throw new Error('medicine can only move through settlement/polity stocks');
  const polityId = target.kind === 'settlement' ? target.settlement.polityId : target.polity.id;
  const stock = w.industry?.polities[polityId]?.goods;
  if (!stock) throw new Error('medicine stock is not initialized');
  stock.medicine += amount;
}

function deductFromTarget(
  target: RefTarget,
  resource: 'coin' | 'food' | 'medicine',
  amount: number,
  w: World,
) {
  if (resource === 'coin') {
    if (target.kind === 'person') target.person.coin -= amount;
    else if (target.kind === 'settlement') target.settlement.coin -= amount;
    else if (target.kind === 'polity') target.polity.treasury -= amount;
    else target.organization.treasury -= amount;
    return;
  }
  if (resource === 'food') {
    if (target.kind !== 'settlement') throw new Error('food can only move between settlements');
    target.settlement.food -= amount;
    return;
  }
  if (target.kind !== 'settlement' && target.kind !== 'polity')
    throw new Error('medicine can only move through settlement/polity stocks');
  const polityId = target.kind === 'settlement' ? target.settlement.polityId : target.polity.id;
  const stock = w.industry?.polities[polityId]?.goods;
  if (!stock) throw new Error('medicine stock is not initialized');
  stock.medicine -= amount;
}

function personOfRole(w: World, roles: RoleBinding, role: string) {
  const id = roles[role];
  return id ? w.persons.find((p) => p.id === id) : undefined;
}

function ensureRelationship(
  w: World,
  p: Person,
  q: Person,
  amount: number,
  kind: 'acquaintance' | 'friend' | 'partner' | 'rival' | 'kin' | undefined,
  causeId: string,
) {
  let rel = p.relationships.find((r) => r.personId === q.id);
  if (!rel) {
    rel = {
      personId: q.id,
      trust: 0,
      attachment: 0,
      kind: kind ?? 'acquaintance',
      since: w.month,
      causeIds: [causeId],
    };
    p.relationships.push(rel);
    q.relationships.push({
      personId: p.id,
      trust: 0,
      attachment: 0,
      kind: kind ?? 'acquaintance',
      since: w.month,
      causeIds: [causeId],
    });
  }
  const reciprocal = q.relationships.find((r) => r.personId === p.id);
  const nextTrust = clamp(rel.trust + amount, -1, 1);
  rel.trust = nextTrust;
  rel.attachment = clamp(rel.attachment + Math.max(0, amount) * 0.4);
  if (kind) rel.kind = kind;
  if (reciprocal) {
    reciprocal.trust = nextTrust;
    reciprocal.attachment = rel.attachment;
    if (kind) reciprocal.kind = kind;
  }
  rel.causeIds = [...(rel.causeIds ?? []), causeId].slice(-8);
  if (reciprocal) reciprocal.causeIds = [...(reciprocal.causeIds ?? []), causeId].slice(-8);
}

function applyPressure(
  w: World,
  unit: ScopeUnit,
  effect: Extract<Effect, { type: 'pressure' }>,
  causeId: string,
) {
  const site = unit.siteId ? w.settlements.find((s) => s.id === unit.siteId) : undefined;
  if (!site) throw new Error('pressure needs a settlement scope');
  if (effect.cost > site.coin + 1e-9) throw new Error('pressure cost exceeds local resources');
  site.coin -= effect.cost;
  if (effect.kind === 'epidemic') {
    site.disease = {
      prevalence: clamp((site.disease?.prevalence ?? 0) + effect.severity, 0, 1),
      immune: site.disease?.immune ?? 0,
      causeId,
    };
  } else if (effect.kind === 'supply') {
    const people =
      site.cohort.children +
      site.cohort.adults +
      site.cohort.elders +
      w.persons.filter((p) => p.locationId === site.id && p.death === undefined).length;
    const destroyed = Math.min(site.food, effect.severity * people * 2);
    site.food -= destroyed;
    w.audit.destroyedFood += destroyed;
  } else if (effect.kind === 'crisis') {
    w.shocks ??= [];
    w.shocks.push({
      id: `rule-shock-${causeId}-${site.id}-${effect.kind}`,
      title: effect.kind,
      kind: 'crisis',
      locationIds: [site.id],
      started: w.month,
      ends: w.month + effect.months,
      severity: effect.severity,
      causeId,
      stats: { casualties: 0, displaced: 0, relief: 0, consumedSupply: 0 },
    });
  } else if (effect.kind === 'innovation') {
    site.knowledge = clamp(site.knowledge + effect.severity * 0.2);
  } else {
    const polity = w.polities.find((p) => p.id === site.polityId);
    if (polity) polity.legitimacy = clamp(polity.legitimacy + effect.severity * 0.2);
    site.unrest = clamp(site.unrest - effect.severity * 0.2);
  }
}

export type AppliedEffect = { type: string; detail: string };

/** Applies already-feasibility-checked effects. Any unexpected failure aborts the caller. */
export function applyEffects(
  w: World,
  unit: ScopeUnit,
  roles: RoleBinding,
  effects: readonly Effect[],
  emit: RuleEmit,
  causeIds: string[],
  definitionKey: string,
): AppliedEffect[] {
  const applied: AppliedEffect[] = [];
  for (const effect of effects) {
    const failure = effectFeasible(w, unit, roles, effect);
    if (failure) throw new Error(failure);
    const causeId = causeIds[0] ?? definitionKey;
    if (effect.type === 'transfer') {
      const from = resolveRef(w, unit, roles, effect.from);
      const to = resolveRef(w, unit, roles, effect.to);
      if (!from || !to) throw new Error('unresolved transfer target');
      deductFromTarget(from, effect.resource, effect.amount, w);
      addToTarget(to, effect.resource, effect.amount, w);
      applied.push({ type: effect.type, detail: `${effect.resource}:${effect.amount}` });
    } else if (effect.type === 'learn') {
      const p = personOfRole(w, roles, effect.role);
      if (!p) throw new Error('unresolved learner');
      if (effect.field === 'education' && p.life)
        p.life.education.level = clamp(p.life.education.level + effect.amount, 0, 5);
      else if (effect.field === 'knowledge')
        p.skills.learning = clamp(p.skills.learning + effect.amount);
      else {
        const key = effect.field === 'craft' ? 'craft' : 'learning';
        p.skills[key] = clamp(p.skills[key] + effect.amount);
      }
      applied.push({ type: effect.type, detail: `${effect.field}:${effect.amount}` });
    } else if (effect.type === 'relate') {
      const from = resolveRef(w, unit, roles, effect.from);
      const to = resolveRef(w, unit, roles, effect.to);
      if (!from || from.kind !== 'person' || !to || to.kind !== 'person')
        throw new Error('unresolved relationship');
      ensureRelationship(w, from.person, to.person, effect.amount, effect.kind, causeId);
      applied.push({ type: effect.type, detail: effect.amount.toFixed(3) });
    } else if (effect.type === 'offer') {
      const p = personOfRole(w, roles, effect.role);
      if (!p) throw new Error('unresolved opportunity role');
      const id = addOpportunity(w, effect.role, p.id, effect, unit, roles, definitionKey, causeIds);
      applied.push({ type: effect.type, detail: id });
    } else if (effect.type === 'pressure') {
      applyPressure(w, unit, effect, causeId);
      applied.push({ type: effect.type, detail: effect.kind });
    } else if (effect.type === 'ability') {
      const actor = personOfRole(w, roles, effect.actor);
      const target = effect.target ? personOfRole(w, roles, effect.target) : actor;
      if (!actor || !target) throw new Error('unresolved ability actor/target');
      performAbility(w, actor, target, effect.mode, effect.strength, effect.cost, emit, causeId);
      applied.push({ type: effect.type, detail: effect.mode });
    } else if (effect.type === 'policy') {
      const p = personOfRole(w, roles, effect.role);
      if (!p) throw new Error('unresolved policy role');
      p.policy = {
        version: 1,
        kind: effect.kind,
        strength: effect.strength,
        ttlMonths: effect.months,
        adoptedAt: w.month,
        causeIds: [...causeIds].slice(-8),
      };
      applied.push({ type: effect.type, detail: effect.kind });
    } else if (effect.type === 'health') {
      const p = personOfRole(w, roles, effect.role);
      if (!p) throw new Error('unresolved health role');
      p.health = clamp(p.health + effect.amount);
      applied.push({ type: effect.type, detail: effect.amount.toFixed(3) });
    } else if (effect.type === 'knowledge') {
      const p = effect.role ? personOfRole(w, roles, effect.role) : undefined;
      const resolvedSite = effect.site ? resolveRef(w, unit, roles, effect.site) : undefined;
      const s =
        resolvedSite?.kind === 'settlement'
          ? resolvedSite.settlement
          : w.settlements.find((x) => x.id === unit.siteId);
      if (p) {
        if (effect.field === 'education' && p.life)
          p.life.education.level = clamp(p.life.education.level + effect.amount, 0, 5);
        else if (effect.field === 'knowledge')
          p.skills.learning = clamp(p.skills.learning + effect.amount);
        else {
          const key = effect.field === 'craft' ? 'craft' : 'learning';
          p.skills[key] = clamp(p.skills[key] + effect.amount);
        }
      }
      if (s && effect.field === 'knowledge') s.knowledge = clamp(s.knowledge + effect.amount);
      applied.push({ type: effect.type, detail: effect.field });
    } else if (effect.type === 'unrest') {
      const s = w.settlements.find((x) => x.id === unit.siteId);
      if (!s) throw new Error('unresolved unrest site');
      s.unrest = clamp(s.unrest + effect.amount);
      applied.push({ type: effect.type, detail: effect.amount.toFixed(3) });
    } else if (effect.type === 'legitimacy') {
      const polity = unit.polityId ? w.polities.find((p) => p.id === unit.polityId) : undefined;
      if (!polity) throw new Error('unresolved polity');
      polity.legitimacy = clamp(polity.legitimacy + effect.amount);
      applied.push({ type: effect.type, detail: effect.amount.toFixed(3) });
    } else if (effect.type === 'military') {
      const polity = unit.polityId ? w.polities.find((p) => p.id === unit.polityId) : undefined;
      if (!polity) throw new Error('unresolved polity');
      polity.military = Math.max(0, polity.military + effect.amount);
      applied.push({ type: effect.type, detail: effect.amount.toFixed(3) });
    } else if (effect.type === 'disease') {
      const s = w.settlements.find((x) => x.id === unit.siteId);
      if (!s) throw new Error('unresolved disease site');
      s.disease = {
        prevalence: clamp((s.disease?.prevalence ?? 0) + effect.prevalence, 0, 1),
        immune: s.disease?.immune ?? 0,
        causeId,
      };
      applied.push({ type: effect.type, detail: effect.prevalence.toFixed(3) });
    }
  }
  return applied;
}

export type AbilityResult = {
  event: HistoricalEvent;
  exposed: boolean;
  exposureId?: string;
};

/** Grant a compiled rare ability to a real person. One ability per person. */
export function grantAbility(
  w: World,
  personId: string,
  definitionKey: string,
  causeId: string,
): AbilityState {
  const r = ensureRuntime(w);
  const def = r.definitions[definitionKey];
  if (!def || def.kind !== 'ability' || !def.ability)
    throw new RuleCompileError('invalid_ability', 'ability', 'definition is not an ability');
  const person = w.persons.find((p) => p.id === personId);
  if (!person || person.death !== undefined) throw new Error('ability holder is not alive');
  if (r.abilities[personId]) throw new Error('person already has an ability');
  const state: AbilityState = {
    id: `ability-${personId}`,
    personId,
    definitionKey,
    mode: def.ability.mode,
    potency: def.ability.potency,
    cost: def.ability.cost,
    healthCost: def.ability.healthCost,
    cooldown: def.ability.cooldown,
    lastUsed: -9999,
    uses: 0,
    maxUses: def.ability.maxUses,
    exposure: 0,
    blockedUntil: 0,
    causeIds: [causeId],
  };
  r.abilities[personId] = state;
  return state;
}

export function revokeAbility(w: World, personId: string, causeId: string) {
  const r = ensureRuntime(w);
  const state = r.abilities[personId];
  if (!state) return false;
  delete r.abilities[personId];
  r.receipts.push(`revoke:${personId}:${causeId}`.slice(0, 220));
  r.receipts = r.receipts.slice(-512);
  return true;
}

/** Execute one ability use with real cost, cooldown, witness exposure and event trail. */
export function performAbility(
  w: World,
  actor: Person,
  target: Person,
  mode: AbilityState['mode'],
  strength: number,
  cost: number,
  emit: RuleEmit,
  causeId: string,
): AbilityResult {
  const r = ensureRuntime(w);
  const state = r.abilities[actor.id];
  if (!state) throw new Error('actor has no ability');
  if (state.mode !== mode) throw new Error('ability mode mismatch');
  if (state.uses >= state.maxUses) throw new Error('ability uses exhausted');
  if (state.blockedUntil && w.month < state.blockedUntil)
    throw new Error('ability is under active investigation');
  if (w.month - state.lastUsed < state.cooldown) throw new Error('ability is cooling down');
  if (actor.death !== undefined || target.death !== undefined)
    throw new Error('ability target is dead');
  if (actor.locationId !== target.locationId) throw new Error('ability target is not present');
  if (actor.coin + 1e-9 < cost) throw new Error('ability cost is not affordable');
  const bounded = Math.min(strength, state.potency);
  actor.coin -= cost;
  const site = w.settlements.find((s) => s.id === actor.locationId);
  if (site) site.coin += cost;
  if (state.healthCost > 0) actor.health = clamp(actor.health - state.healthCost, 0.05, 1);
  if (mode === 'knowledge') actor.skills.learning = clamp(actor.skills.learning + bounded * 0.02);
  else if (mode === 'influence') target.stress = clamp(target.stress + bounded * 0.1);
  else if (mode === 'healing') {
    target.health = clamp(target.health + bounded * 0.08);
    actor.stress = clamp(actor.stress + 0.03);
  } else if (mode === 'production' && site) {
    const produced = bounded * 8;
    site.food += produced;
    w.audit.producedFood += produced;
    site.knowledge = clamp(site.knowledge + bounded * 0.01);
  } else if (mode === 'movement') {
    if (actor.journey) actor.journey.blockedMonths = 0;
  }
  const event = emit(
    'ability_used',
    [actor.id, target.id],
    actor.locationId,
    `${actor.name}使用了受限能力（${mode}），效果与代价已进入世界记录。`,
    {
      abilityDefinitionKey: state.definitionKey,
      mode,
      targetId: target.id,
      strength: bounded,
      cost,
      healthCost: state.healthCost,
      uses: state.uses + 1,
      maxUses: state.maxUses,
      classification: 'bounded-anomaly',
    },
    [causeId, ...state.causeIds].slice(-8),
    0.8,
  );
  state.uses++;
  state.lastUsed = w.month;
  const witnesses = w.persons
    .filter(
      (p) =>
        p.death === undefined &&
        p.id !== actor.id &&
        p.id !== target.id &&
        p.locationId === actor.locationId &&
        !p.journey &&
        !isDetained(w, p),
    )
    .slice(0, 16);
  const def = r.definitions[state.definitionKey];
  const exposureRisk = def?.ability?.exposureRisk ?? 0.15;
  const exposed =
    witnesses.length > 0 &&
    random(w.seed, w.month, actor.id, state.uses, 'exposure') < exposureRisk;
  let exposureId: string | undefined;
  if (exposed) {
    const organizations = w.organizations
      .filter((o) => o.status === 'active' && o.locationId === actor.locationId)
      .map((o) => o.id)
      .slice(0, 8);
    exposureId = `exposure-${actor.id}-${w.month}-${state.uses}`;
    const exposureEvent = emit(
      'ability_exposed',
      [actor.id, ...witnesses.map((p) => p.id)],
      actor.locationId,
      `${actor.name}的异常能力被现场目击；消息只在真实证人范围内传播。`,
      {
        exposureId,
        abilityDefinitionKey: state.definitionKey,
        mode,
        witnessIds: witnesses.map((p) => p.id),
        organizationIds: organizations,
        classification: 'anomaly-exposure',
      },
      [event.id],
      0.9,
    );
    if (Object.keys(r.exposures).length >= MAX_EXPOSURES) {
      const oldest = Object.keys(r.exposures).sort()[0];
      if (oldest) delete r.exposures[oldest];
    }
    r.exposures[exposureId] = {
      id: exposureId,
      abilityId: state.id,
      personId: actor.id,
      witnessIds: witnesses.map((p) => p.id),
      organizationIds: organizations,
      causeId: exposureEvent.id,
      month: w.month,
      responded: false,
    };
    state.exposure = clamp(state.exposure + 0.2);
  }
  return { event, exposed, exposureId };
}

export function useAbility(
  w: World,
  actorId: string,
  targetId: string,
  causeId: string,
  emit: RuleEmit,
): AbilityResult {
  const actor = w.persons.find((p) => p.id === actorId);
  const target = w.persons.find((p) => p.id === targetId);
  const state = w.runtime?.abilities[actorId];
  if (!actor || !target || !state) throw new Error('ability actor/target/state is missing');
  return performAbility(w, actor, target, state.mode, state.potency, state.cost, emit, causeId);
}

export function assertRuleState(w: World) {
  const r = w.runtime;
  if (!r) return;
  if (r.schemaVersion !== 1) throw new Error('Unknown rule runtime schema');
  if (Object.keys(r.definitions).length > MAX_ACTIVE_DEFINITIONS)
    throw new Error('Rule definition catalogue exceeds cap');
  if (Object.keys(r.processes).length > MAX_PROCESSES) throw new Error('Rule process cap exceeded');
  if (Object.keys(r.opportunities).length > MAX_OPPORTUNITIES)
    throw new Error('Rule opportunity cap exceeded');
  if (Object.keys(r.exposures).length > MAX_EXPOSURES)
    throw new Error('Rule exposure cap exceeded');
  const people = new Set(w.persons.map((p) => p.id));
  for (const [key, definition] of Object.entries(r.definitions)) {
    if (key !== maxDefinitionKey(definition)) throw new Error(`Mismatched definition key ${key}`);
    if (!r.lifecycle[key]) throw new Error(`Definition ${key} lacks lifecycle state`);
  }
  for (const [id, active] of Object.entries(r.active)) {
    if (!r.definitions[active.key]) throw new Error(`Active definition ${id} is missing`);
    if (r.definitions[active.key].id !== id) throw new Error(`Active definition id mismatch ${id}`);
  }
  for (const process of Object.values(r.processes)) {
    if (!r.definitions[process.definitionKey])
      throw new Error(`Process ${process.id} references a missing definition`);
    for (const personId of Object.values(process.roles))
      if (!people.has(personId))
        throw new Error(`Process ${process.id} references an unknown person`);
  }
  for (const [personId, ability] of Object.entries(r.abilities)) {
    if (!people.has(personId)) throw new Error(`Ability references an unknown person ${personId}`);
    if (!r.definitions[ability.definitionKey])
      throw new Error(`Ability ${ability.id} references a missing definition`);
  }
  for (const opportunity of Object.values(r.opportunities))
    if (!people.has(opportunity.personId))
      throw new Error(`Opportunity ${opportunity.id} references an unknown person`);
  for (const birth of Object.values(r.births)) {
    if (birth.status === 'born') {
      if (!birth.childId || !people.has(birth.childId))
        throw new Error(`Birth ${birth.id} references an unknown child`);
      const child = w.persons.find((p) => p.id === birth.childId);
      if (child && child.ownerId !== birth.userId)
        throw new Error(`Birth ${birth.id} owner mismatch`);
    }
    if (birth.status === 'compiling' && !birth.jobId)
      throw new Error(`Compiling birth ${birth.id} has no job`);
  }
  for (const [personId, program] of Object.entries(r.lifePrograms)) {
    if (!people.has(personId)) throw new Error(`Life program ${personId} has no person`);
    if (program.personId !== personId) throw new Error(`Life program ${personId} scope mismatch`);
  }
  for (const personId of Object.keys(r.hiddenFutures))
    if (!people.has(personId)) throw new Error(`Hidden future ${personId} has no person`);
  for (const [personId, summary] of Object.entries(r.deathSummaries ?? {})) {
    if (!people.has(personId)) throw new Error(`Death summary ${personId} has no person`);
    if (summary.personId !== personId) throw new Error(`Death summary ${personId} scope mismatch`);
  }
  for (const exposure of Object.values(r.exposures)) {
    if (!people.has(exposure.personId))
      throw new Error(`Exposure ${exposure.id} references an unknown person`);
    if (exposure.witnessIds.some((id) => !people.has(id)))
      throw new Error(`Exposure ${exposure.id} references an unknown witness`);
  }
}

export { RuleCompileError };
export type { RuleDiagnostic };
