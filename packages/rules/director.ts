import { z } from 'zod';
import type { HistoricalEvent, World } from '../contracts/index.js';
import { random } from '../simulation-core/random.js';
import {
  EffectSchema,
  ScopeSchema,
  type AuthorRequest,
  type DirectorState,
  type Effect,
  type RuleDefinition,
  type Scope,
} from './schema.js';
import { compileRule, RuleCompileError } from './compiler.js';
import { applyEffects, ensureRuntime, installDefinition, type RuleEmit } from './runtime.js';
import { effectFeasible, scopeUnits, type ScopeUnit } from './match.js';
import { buildSiteIndex, sitePressure } from './author.js';

export const DIRECTOR_ACTIONS = [
  'seed_pressure',
  'exogenous_incident',
  'open_opportunity',
  'commission_event',
  'reshape_agenda',
] as const;
export type DirectorAction = (typeof DIRECTOR_ACTIONS)[number];

const preferenceKey = z.enum([
  'conflict',
  'innovation',
  'movement',
  'cooperation',
  'historicalRegression',
]);
export const DirectorProposalSchema = z
  .object({
    version: z.literal(1),
    jobId: z.string().min(1).max(160),
    action: z.enum(DIRECTOR_ACTIONS),
    scope: ScopeSchema,
    rationale: z.string().min(1).max(600),
    title: z.string().min(1).max(160).optional(),
    effects: z.array(EffectSchema).max(6).default([]),
    preferences: z.record(z.string(), z.number().min(0).max(1)).optional(),
    ttlMonths: z.number().int().min(1).max(120).default(24),
    definition: z.unknown().optional(),
    targetIds: z.array(z.string().min(1).max(160)).max(8).default([]),
    budget: z.number().min(0).max(3).default(1),
    chainDepth: z.number().int().min(0).max(2).default(0),
  })
  .strict();
export type DirectorProposal = z.infer<typeof DirectorProposalSchema>;

const PRESSURE_EFFECTS = new Set([
  'pressure',
  'disease',
  'unrest',
  'legitimacy',
  'military',
  'knowledge',
]);

function ensureDirector(w: World): DirectorState {
  const r = ensureRuntime(w);
  r.director ??= {
    preferences: {},
    preferenceUntil: 0,
    lastActionMonth: -9999,
    actions: [],
  };
  return r.director;
}

function scopeKey(scope: Scope) {
  return `${scope.kind}:${scope.ids.slice().sort().join(',')}`;
}

function targetAtScope(w: World, scope: Scope, targetId: string) {
  const person = w.persons.find((p) => p.id === targetId && p.death === undefined);
  if (!person || person.journey) return undefined;
  const units = scopeUnits(w, scope);
  const unit = units.find((candidate) => candidate.siteId === person.locationId);
  return unit ? { person, unit } : undefined;
}

export type CompiledDirector = {
  proposal: DirectorProposal;
  definition?: RuleDefinition;
  diagnostics: string[];
};

export function compileDirectorProposal(raw: unknown, w: World, causeId: string): CompiledDirector {
  let proposal: DirectorProposal;
  try {
    proposal = DirectorProposalSchema.parse(raw);
  } catch (error) {
    throw new RuleCompileError(
      'schema_invalid',
      'director',
      error instanceof z.ZodError
        ? (error.issues[0]?.message ?? 'invalid director proposal')
        : (error as Error).message,
    );
  }
  const diagnostics: string[] = [];
  if (proposal.budget > 3 || proposal.chainDepth > 2)
    throw new RuleCompileError(
      'budget_exceeded',
      'director',
      'director budget or chain depth exceeds cap',
    );
  const units = scopeUnits(w, proposal.scope);
  if (!units.length)
    throw new RuleCompileError('scope_empty', 'scope', 'director scope selects no world entity');
  const effects = proposal.effects as Effect[];
  if (proposal.action === 'seed_pressure' || proposal.action === 'exogenous_incident') {
    if (!effects.length)
      throw new RuleCompileError('missing_effect', 'effects', 'pressure action needs an effect');
    for (const effect of effects)
      if (!PRESSURE_EFFECTS.has(effect.type))
        throw new RuleCompileError(
          'forbidden_effect',
          'effects',
          `${effect.type} is not a director pressure/incident effect`,
        );
    if (proposal.action === 'exogenous_incident') {
      const hasExogenous = effects.some(
        (effect) =>
          effect.type === 'pressure' ||
          effect.type === 'disease' ||
          (effect.type === 'unrest' && effect.amount > 0) ||
          (effect.type === 'military' && effect.amount > 0),
      );
      if (!hasExogenous)
        throw new RuleCompileError(
          'missing_exogenous_effect',
          'effects',
          'exogenous incident needs an actual pressure, disease or shock effect',
        );
    }
  } else if (proposal.action === 'open_opportunity') {
    if (proposal.targetIds.length !== 1)
      throw new RuleCompileError(
        'target_required',
        'targetIds',
        'opportunity needs exactly one real target',
      );
    const target = targetAtScope(w, proposal.scope, proposal.targetIds[0]);
    if (!target)
      throw new RuleCompileError(
        'target_not_present',
        'targetIds',
        'target is not alive and present in the selected scope',
      );
    if ((w.month - target.person.birth) / 12 < 16)
      throw new RuleCompileError(
        'target_too_young',
        'targetIds',
        'a dependent child cannot be given an independent opportunity',
      );
    if (
      !effects.length ||
      effects.some((effect) => effect.type !== 'offer' || effect.role !== 'beneficiary')
    )
      throw new RuleCompileError(
        'forbidden_effect',
        'effects',
        'opportunity may only add a beneficiary offer; it cannot change state directly',
      );
  } else if (proposal.action === 'commission_event') {
    if (!proposal.definition)
      throw new RuleCompileError(
        'missing_definition',
        'definition',
        'commission_event needs a definition',
      );
    if (effects.length)
      throw new RuleCompileError(
        'forbidden_effect',
        'effects',
        'commission_event cannot carry direct effects',
      );
  } else if (proposal.action === 'reshape_agenda') {
    if (!proposal.preferences || !Object.keys(proposal.preferences).length)
      throw new RuleCompileError(
        'missing_preferences',
        'preferences',
        'reshape_agenda needs preferences',
      );
    for (const key of Object.keys(proposal.preferences))
      if (!preferenceKey.safeParse(key).success)
        throw new RuleCompileError(
          'unknown_preference',
          'preferences',
          `unknown preference ${key}`,
        );
    if (effects.length)
      throw new RuleCompileError(
        'forbidden_effect',
        'effects',
        'reshape_agenda cannot carry direct effects',
      );
  }
  let definition: RuleDefinition | undefined;
  if (proposal.action === 'commission_event') {
    definition = compileRule(proposal.definition, w, {
      source: 'director',
      jobId: proposal.jobId,
      rationale: proposal.rationale,
      requireFeasible: false,
    }).definition;
  }
  const actionCount = ensureDirector(w).actions.filter((item) => item.month === w.month).length;
  if (actionCount >= 1)
    throw new RuleCompileError('budget_exceeded', 'director', 'only one director action per month');
  const yearly = ensureDirector(w).actions.filter((item) => w.month - item.month < 12).length;
  if (yearly >= 4)
    throw new RuleCompileError('budget_exceeded', 'director', 'director yearly action cap reached');
  const key = scopeKey(proposal.scope);
  const recent = ensureDirector(w).actions.some(
    (item) => item.scope === key && w.month - item.month < 6,
  );
  if (recent)
    throw new RuleCompileError('cooldown', 'director', 'same scope was directed too recently');
  return { proposal, definition, diagnostics };
}

function recordDirectorAction(
  w: World,
  proposal: DirectorProposal,
  causeId: string,
  accepted: boolean,
  reason: string,
) {
  const director = ensureDirector(w);
  director.actions.push({
    id: `director-action-${proposal.jobId}-${w.month}`,
    kind: proposal.action,
    month: w.month,
    scope: scopeKey(proposal.scope),
    causeId,
    accepted,
    reason,
  });
  director.actions = director.actions.slice(-128);
  if (accepted) director.lastActionMonth = w.month;
}

export type DirectorResult = {
  event: HistoricalEvent;
  definition?: RuleDefinition;
  unit?: ScopeUnit;
};

/** Apply a compiled director proposal through existing state/effect adapters. */
export function applyDirectorProposal(
  w: World,
  compiled: CompiledDirector,
  causeIds: string[],
  emit: RuleEmit,
): DirectorResult {
  const proposal = compiled.proposal;
  const units = scopeUnits(w, proposal.scope);
  const unit = units[0];
  if (!unit) throw new RuleCompileError('scope_empty', 'scope', 'director scope disappeared');
  const pressureAction =
    proposal.action === 'seed_pressure' || proposal.action === 'exogenous_incident';
  const affectedUnits = pressureAction
    ? proposal.scope.kind === 'world'
      ? [...w.settlements]
          .sort(
            (a, b) =>
              b.cohort.children +
                b.cohort.adults +
                b.cohort.elders -
                (a.cohort.children + a.cohort.adults + a.cohort.elders) || a.id.localeCompare(b.id),
          )
          .slice(0, Math.max(1, Math.ceil(proposal.budget)))
          .map((site) => ({
            key: site.id,
            siteId: site.id,
            polityId: site.polityId,
          }))
      : units.slice(0, Math.max(1, Math.ceil(proposal.budget)))
    : [unit];
  if (pressureAction) {
    for (const affected of affectedUnits)
      for (const effect of proposal.effects as Effect[]) {
        const failure = effectFeasible(w, affected, {}, effect);
        if (failure) throw new RuleCompileError('infeasible_effect', 'effects', failure);
      }
  }
  if (proposal.action === 'open_opportunity') {
    const target = targetAtScope(w, proposal.scope, proposal.targetIds[0]);
    if (!target)
      throw new RuleCompileError('target_not_present', 'targetIds', 'target left the scope');
    for (const effect of proposal.effects as Effect[]) {
      const failure = effectFeasible(w, target.unit, { beneficiary: target.person.id }, effect);
      if (failure) throw new RuleCompileError('infeasible_effect', 'effects', failure);
    }
  }
  const event = emit(
    'director_action',
    proposal.targetIds,
    unit.siteId,
    `${proposal.title ?? '历史导演干预'}：${proposal.rationale}`,
    {
      jobId: proposal.jobId,
      action: proposal.action,
      scope: proposal.scope,
      rationale: proposal.rationale,
      budget: proposal.budget,
      chainDepth: proposal.chainDepth,
      effectTypes: proposal.effects.map((effect) => effect.type),
      targetIds: proposal.targetIds,
      classification: 'history-director',
    },
    causeIds.slice(0, 8),
    0.9,
  );
  try {
    if (proposal.action === 'seed_pressure' || proposal.action === 'exogenous_incident') {
      for (const affected of affectedUnits)
        applyEffects(
          w,
          affected,
          {},
          proposal.effects,
          emit,
          [event.id],
          `director:${proposal.jobId}`,
        );
      event.data.affectedSiteIds = affectedUnits.map((affected) => affected.siteId).filter(Boolean);
    } else if (proposal.action === 'open_opportunity') {
      const target = targetAtScope(w, proposal.scope, proposal.targetIds[0]);
      if (!target)
        throw new RuleCompileError(
          'target_not_present',
          'targetIds',
          'target left the selected scope before resolution',
        );
      applyEffects(
        w,
        target.unit,
        { beneficiary: target.person.id },
        proposal.effects,
        emit,
        [event.id],
        `director:${proposal.jobId}`,
      );
      event.personIds = [target.person.id];
      event.locationId = target.person.locationId;
    } else if (proposal.action === 'commission_event') {
      if (!compiled.definition)
        throw new RuleCompileError(
          'missing_definition',
          'definition',
          'director definition missing',
        );
      installDefinition(w, compiled.definition, event.id);
      event.data.definitionKey = `${compiled.definition.id}@${compiled.definition.version}`;
    } else if (proposal.action === 'reshape_agenda') {
      const director = ensureDirector(w);
      director.preferences = { ...proposal.preferences };
      director.preferenceUntil = w.month + proposal.ttlMonths;
      event.data.preferences = proposal.preferences;
      event.data.preferenceUntil = director.preferenceUntil;
    }
    recordDirectorAction(w, proposal, event.id, true, 'applied');
    event.data.applied = true;
    return { event, definition: compiled.definition, unit };
  } catch (error) {
    recordDirectorAction(w, proposal, event.id, false, (error as Error).message.slice(0, 240));
    event.data.applied = false;
    event.data.rejected = (error as Error).message.slice(0, 240);
    throw error;
  }
}

export function observeDirector(w: World, events: any[]): AuthorRequest[] {
  const r = ensureRuntime(w);
  const open = r.authorRequests.some(
    (request) =>
      request.kind === 'history_director' &&
      (request.status === 'open' || request.status === 'dispatched'),
  );
  const director = ensureDirector(w);
  if (open || w.month - director.lastActionMonth < 6) return [];
  const historical = w.persons.find(
    (p) => p.death === undefined && !!p.historicalIdentity && !p.journey,
  );
  if (
    historical &&
    w.month % 12 === 0 &&
    !r.authorRequests.some(
      (request) =>
        request.siteId === historical.locationId &&
        request.month >= w.month - 12 &&
        request.kind === 'history_director',
    )
  ) {
    const request: AuthorRequest = {
      id: `director-${w.id}-${w.month}-historical-${historical.id}`,
      siteId: historical.locationId,
      reason: `历史人物${historical.name}正在当地生活；可以创设一次有真实位置、交通与参与意愿约束的接触机会。`,
      month: w.month,
      kind: 'history_director',
      causeIds: historical.memories.slice(-4).map((memory) => memory.eventId),
      status: 'open',
      jobId: `director-${w.id}-${w.month}-historical-${historical.id}`,
      pressure: 'historical-contact',
    };
    r.authorRequests.push(request);
    return [request];
  }
  const siteIndex = buildSiteIndex(w);
  const scored = w.settlements
    .map((site) => ({ site, ...sitePressure(w, site.id, siteIndex, site) }))
    .sort(
      (a, b) =>
        b.score - a.score ||
        random(w.seed, w.month, a.site.id, 'director-tie') -
          random(w.seed, w.month, b.site.id, 'director-tie') ||
        a.site.id.localeCompare(b.site.id),
    );
  const top = scored[0];
  if (!top) return [];
  const urgent = top.score >= 2.4;
  if (!urgent && w.month % 6 !== 0) return [];
  if (!urgent && top.score < 0.5) return [];
  const request: AuthorRequest = {
    id: `director-${w.id}-${w.month}-${top.site.id}`,
    siteId: top.site.id,
    reason: `${top.site.name}出现${top.pressure}压力（评分${top.score.toFixed(2)}），历史导演可创设有限机会或压力。`,
    month: w.month,
    kind: 'history_director',
    causeIds: [...new Set(top.causes)].slice(0, 8),
    status: 'open',
    jobId: `director-${w.id}-${w.month}-${top.site.id}`,
    pressure: top.pressure,
  };
  r.authorRequests.push(request);
  return [request];
}

export function directorJobPayload(w: World, request: AuthorRequest) {
  const site = w.settlements.find((s) => s.id === request.siteId);
  const people = site
    ? w.persons
        .filter((p) => p.death === undefined && p.locationId === site.id && !p.journey)
        .slice(0, 24)
        .map((p) => ({
          id: p.id,
          name: p.name,
          age: Math.floor((w.month - p.birth) / 12),
          occupation: p.occupation,
          historicalIdentity: p.historicalIdentity?.qid,
          title: p.title,
        }))
    : [];
  const definitions = Object.values(w.runtime?.active ?? {})
    .slice(0, 64)
    .map((active) => {
      const definition = w.runtime?.definitions[active.key];
      return definition
        ? {
            id: definition.id,
            version: definition.version,
            title: definition.title,
            kind: definition.kind,
            effectTypes: definition.effects.map((effect) => effect.type),
          }
        : undefined;
    })
    .filter((value): value is NonNullable<typeof value> => !!value);
  return {
    request: {
      id: request.id,
      siteId: request.siteId,
      reason: request.reason,
      pressure: request.pressure,
      causeIds: request.causeIds,
    },
    world: {
      id: w.id,
      month: w.month,
      year: w.calendar
        ? w.calendar.startYear + Math.floor(w.month / 12)
        : Math.floor(w.month / 12) + 1,
      activeDefinitions: definitions,
      director: w.runtime?.director ?? { preferences: {}, actions: [] },
    },
    site: site
      ? {
          id: site.id,
          name: site.name,
          polityId: site.polityId,
          scarcity: site.scarcity,
          unrest: site.unrest,
          disease: site.disease?.prevalence ?? 0,
          food: site.food,
          knowledge: site.knowledge,
          activeConflicts: w.conflicts.filter(
            (c) => c.status === 'active' && c.locationId === site.id,
          ).length,
        }
      : undefined,
    people,
    recentEvents: [] as Array<Record<string, unknown>>,
  };
}

export function fallbackDirectorProposal(w: World, request: AuthorRequest): DirectorProposal {
  const site = w.settlements.find((s) => s.id === request.siteId);
  if (!site) throw new Error('director fallback site missing');
  if (request.pressure === 'historical-contact') {
    const historical = w.persons.find(
      (p) =>
        p.death === undefined && p.locationId === site.id && !!p.historicalIdentity && !p.journey,
    );
    const beneficiary =
      w.persons.find(
        (p) =>
          p.death === undefined &&
          p.locationId === site.id &&
          !!p.ownerId &&
          !p.journey &&
          p.id !== historical?.id &&
          (w.month - p.birth) / 12 >= 16,
      ) ??
      w.persons.find(
        (p) =>
          p.death === undefined &&
          p.locationId === site.id &&
          !p.journey &&
          p.id !== historical?.id &&
          (w.month - p.birth) / 12 >= 16,
      );
    if (historical && beneficiary)
      return {
        version: 1,
        jobId: request.jobId,
        action: 'open_opportunity',
        scope: { kind: 'site', ids: [site.id] },
        rationale: `为实际在场的${beneficiary.name}提供一次与${historical.name}接触的机会；不保证双方喜欢彼此。`,
        title: `与${historical.name}的接触机会`,
        effects: [
          {
            type: 'offer',
            role: 'beneficiary',
            intention: `在${site.name}与${historical.name}接触`,
            action: 'socialize',
            targetId: `person:${historical.id}`,
          },
        ],
        targetIds: [beneficiary.id],
        budget: 1,
        chainDepth: 0,
        ttlMonths: 12,
      };
  }
  const target = w.persons
    .filter(
      (p) =>
        p.death === undefined &&
        p.locationId === site.id &&
        !p.journey &&
        (w.month - p.birth) / 12 >= 16,
    )
    .sort((a, b) => b.values.ambition - a.values.ambition || a.id.localeCompare(b.id))[0];
  if (target) {
    const action =
      request.pressure === 'disease'
        ? 'care'
        : request.pressure === 'war'
          ? 'negotiate'
          : request.pressure === 'unrest'
            ? 'petition'
            : request.pressure === 'organization-gap'
              ? 'organize'
              : 'aid';
    return {
      version: 1,
      jobId: request.jobId,
      action: 'open_opportunity',
      scope: { kind: 'site', ids: [site.id] },
      rationale: `在不瞬移、不强制的前提下，为${target.name}提供一个与${request.pressure}相关的现实机会。`,
      title: `${site.name}的历史机会`,
      effects: [
        {
          type: 'offer',
          role: 'beneficiary',
          intention: `在${site.name}参与${request.pressure}应对`,
          action,
        },
      ],
      targetIds: [target.id],
      budget: 1,
      chainDepth: 0,
      ttlMonths: 12,
    };
  }
  return {
    version: 1,
    jobId: request.jobId,
    action: 'reshape_agenda',
    scope: { kind: 'site', ids: [site.id] },
    rationale: '当地没有可安全邀请的具名成年人，导演仅调整后续创作偏好，不直接改变人物。',
    title: `${site.name}的创作偏好`,
    effects: [],
    preferences: { cooperation: 0.65, innovation: 0.55 },
    targetIds: [],
    ttlMonths: 12,
    budget: 1,
    chainDepth: 0,
  };
}

export function directorProposalFrom(raw: unknown, job: any) {
  const value =
    raw && typeof raw === 'object'
      ? ((raw as Record<string, unknown>).proposal ??
        (raw as Record<string, unknown>).director ??
        raw)
      : raw;
  if (!value || typeof value !== 'object' || Array.isArray(value))
    throw new Error('director did not return an object');
  return {
    version: 1,
    jobId: job.id,
    proposal: {
      ...(value as Record<string, unknown>),
      version: 1,
      jobId: job.id,
    },
  };
}
