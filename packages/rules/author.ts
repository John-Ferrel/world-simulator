import { random } from '../simulation-core/random.js';
import type { Settlement, World } from '../contracts/index.js';
import type { AuthorRequest } from './schema.js';
import { ensureRuntime } from './runtime.js';

export type AuthorJobPayload = ReturnType<typeof eventAuthorPayload>;

function recentSiteEvents(w: World, siteId: string, events: any[]) {
  return events
    .filter((event) => event.locationId === siteId && event.month === w.month)
    .slice(-8)
    .map((event) => event.id);
}

export type SiteIndex = {
  named: Map<string, number>;
  organizations: Map<string, World['organizations']>;
  conflicts: Map<string, World['conflicts']>;
  shocks: Map<string, NonNullable<World['shocks']>>;
};

export function buildSiteIndex(w: World): SiteIndex {
  const named = new Map<string, number>();
  for (const person of w.persons)
    if (person.death === undefined)
      named.set(person.locationId, (named.get(person.locationId) ?? 0) + 1);
  const organizations = new Map<string, World['organizations']>();
  for (const organization of w.organizations) {
    if (organization.status !== 'active') continue;
    const list = organizations.get(organization.locationId) ?? [];
    list.push(organization);
    organizations.set(organization.locationId, list);
  }
  const conflicts = new Map<string, World['conflicts']>();
  for (const conflict of w.conflicts) {
    if (conflict.status !== 'active') continue;
    const list = conflicts.get(conflict.locationId) ?? [];
    list.push(conflict);
    conflicts.set(conflict.locationId, list);
  }
  const shocks = new Map<string, NonNullable<World['shocks']>>();
  for (const shock of w.shocks ?? []) {
    if (shock.ends <= w.month) continue;
    for (const locationId of shock.locationIds) {
      const list = shocks.get(locationId) ?? [];
      list.push(shock);
      shocks.set(locationId, list);
    }
  }
  return { named, organizations, conflicts, shocks };
}

export function namedPersonCounts(w: World) {
  const counts = new Map<string, number>();
  for (const person of w.persons)
    if (person.death === undefined)
      counts.set(person.locationId, (counts.get(person.locationId) ?? 0) + 1);
  return counts;
}

export function sitePressure(w: World, siteId: string, index?: SiteIndex, siteArg?: Settlement) {
  const site = siteArg ?? w.settlements.find((s) => s.id === siteId);
  if (!site) return { score: 0, pressure: 'none', causes: [] as string[] };
  const indexed = index ?? buildSiteIndex(w);
  const population =
    site.cohort.children +
    site.cohort.adults +
    site.cohort.elders +
    (indexed.named.get(site.id) ?? 0);
  const war = indexed.conflicts.get(site.id) ?? [];
  const orgs = indexed.organizations.get(site.id) ?? [];
  const causes = [
    ...(site.disease ? [site.disease.causeId] : []),
    ...war.flatMap((c) => c.causeIds),
    ...(indexed.shocks.get(site.id) ?? []).map((q) => q.causeId),
  ].filter(Boolean);
  const disease = site.disease?.prevalence ?? 0;
  const foodStress = population > 0 ? Math.max(0, 1 - site.food / (population * 2)) : 0;
  const orgGap = orgs.length === 0 ? 0.35 : 0;
  const director =
    w.runtime?.director && w.month <= (w.runtime.director.preferenceUntil ?? 0)
      ? w.runtime.director.preferences
      : {};
  const score =
    site.scarcity * 3 * (1 + (director.movement ?? 0) * 0.25) +
    site.unrest * 2 * (1 + (director.conflict ?? 0) * 0.35) +
    disease * 4 +
    war.length * 2 * (1 + (director.conflict ?? 0) * 0.35) +
    foodStress * 1.2 +
    orgGap * (1 + (director.cooperation ?? 0) * 0.2) +
    site.knowledge * (director.innovation ?? 0) * 0.5;
  const pressure =
    disease > 0.02
      ? 'disease'
      : war.length > 0
        ? 'war'
        : site.scarcity > 0.22
          ? 'shortage'
          : site.unrest > 0.3
            ? 'unrest'
            : orgs.length === 0
              ? 'organization-gap'
              : 'general';
  return { score, pressure, causes };
}

/** Deterministic world observer; it proposes authoring tasks, never world changes. */
export function observeWorld(w: World, events: any[]): AuthorRequest[] {
  const r = ensureRuntime(w);
  r.authorRequests = r.authorRequests
    .filter((request) => w.month - request.month <= 24 || request.status === 'open')
    .slice(-64);
  const openSites = new Set(
    r.authorRequests
      .filter((request) => request.status === 'open' || request.status === 'dispatched')
      .map((request) => request.siteId),
  );
  const siteIndex = buildSiteIndex(w);
  const candidates = w.settlements
    .map((site) => ({ site, ...sitePressure(w, site.id, siteIndex, site) }))
    .filter(
      (candidate) =>
        !openSites.has(candidate.site.id) &&
        !r.authorRequests.some(
          (request) =>
            request.siteId === candidate.site.id &&
            request.month >= w.month - 6 &&
            request.status !== 'failed',
        ),
    )
    .sort(
      (a, b) =>
        b.score - a.score ||
        random(w.seed, w.month, a.site.id, 'author-tie') -
          random(w.seed, w.month, b.site.id, 'author-tie') ||
        a.site.id.localeCompare(b.site.id),
    );
  const top = candidates[0];
  if (!top || top.score < 0.4) return [];
  if (w.month % 3 !== 0 && top.score < 1.4) return [];
  const causeIds = [...new Set([...top.causes, ...recentSiteEvents(w, top.site.id, events)])].slice(
    0,
    8,
  );
  const request: AuthorRequest = {
    id: `author-${w.id}-${w.month}-${top.site.id}`,
    siteId: top.site.id,
    reason: `${top.site.name}出现${top.pressure}压力（评分${top.score.toFixed(2)}），现有事件库缺少针对该组合的可执行定义。`,
    month: w.month,
    kind: 'event_author',
    causeIds,
    status: 'open',
    jobId: `event-author-${w.id}-${w.month}-${top.site.id}`,
    pressure: top.pressure,
  };
  r.authorRequests.push(request);
  return [request];
}

function fallbackForPressure(w: World, request: AuthorRequest): Record<string, unknown> {
  const site = w.settlements.find((s) => s.id === request.siteId)!;
  const base = {
    schemaVersion: 1,
    id: `auto.${request.pressure ?? 'general'}.${site.id}.${w.month}`,
    version: 1,
    kind: 'event',
    title: `地方${request.pressure ?? '压力'}的实际应对`,
    scope: { kind: 'site', ids: [site.id] },
    trigger: { kind: 'periodic', interval: 1 },
    chance: 0.45,
    cooldown: 8,
    maxOccurrences: 8,
    gas: 1400,
    significance: 0.55,
    provenance: {
      source: 'builtin',
      jobId: request.jobId,
      model: 'fallback-author',
      observedMonth: w.month,
      compiler: 'rules/1',
      rationale: request.reason,
    },
  };
  const organizer = {
    name: 'organizer',
    minAge: 18,
    maxAge: 70,
    willingness: 0.7,
    sameSite: true,
  };
  const neighbor = {
    name: 'neighbor',
    minAge: 0,
    maxAge: 90,
    willingness: 0.55,
    sameSite: true,
  };
  if (request.pressure === 'shortage')
    return {
      ...base,
      roles: [organizer, neighbor],
      conditions: {
        op: 'compare',
        of: 'site',
        field: 'scarcity',
        cmp: 'gte',
        value: 0.1,
      },
      effects: [
        { type: 'relate', from: 'organizer', to: 'neighbor', amount: 0.04 },
        { type: 'policy', role: 'organizer', kind: 'cooperate', strength: 0.03, months: 6 },
        { type: 'offer', role: 'neighbor', intention: '接受邻里互助并寻找稳定口粮', action: 'aid' },
      ],
    };
  if (request.pressure === 'disease')
    return {
      ...base,
      roles: [
        { name: 'caregiver', minAge: 16, maxAge: 75, willingness: 0.7, sameSite: true },
        { name: 'patient', minAge: 0, maxAge: 95, willingness: 0.6, sameSite: true },
      ],
      conditions: {
        op: 'compare',
        of: 'site',
        field: 'disease',
        cmp: 'gte',
        value: 0.01,
      },
      effects: [
        { type: 'health', role: 'patient', amount: 0.03 },
        { type: 'learn', role: 'caregiver', field: 'knowledge', amount: 0.01 },
        { type: 'offer', role: 'patient', intention: '接受照护并观察病情变化', action: 'care' },
      ],
    };
  if (request.pressure === 'war')
    return {
      ...base,
      roles: [
        { name: 'resident', minAge: 16, maxAge: 70, willingness: 0.6, sameSite: true },
        { name: 'neighbor', minAge: 0, maxAge: 90, willingness: 0.5, sameSite: true },
      ],
      conditions: { op: 'all', args: [] },
      effects: [
        { type: 'relate', from: 'resident', to: 'neighbor', amount: 0.03 },
        { type: 'health', role: 'resident', amount: -0.01 },
        {
          type: 'offer',
          role: 'resident',
          intention: '在冲突中维持家庭与邻里联系',
          action: 'care',
        },
      ],
    };
  if (request.pressure === 'unrest')
    return {
      ...base,
      roles: [
        { name: 'citizen', minAge: 18, maxAge: 75, willingness: 0.65, sameSite: true },
        { name: 'official', minAge: 18, maxAge: 80, willingness: 0.5, sameSite: true },
      ],
      conditions: {
        op: 'compare',
        of: 'site',
        field: 'unrest',
        cmp: 'gte',
        value: 0.2,
      },
      effects: [
        { type: 'unrest', site: 'site', amount: -0.02 },
        { type: 'policy', role: 'citizen', kind: 'cooperate', strength: 0.03, months: 6 },
        {
          type: 'offer',
          role: 'official',
          intention: '回应地方诉求并寻求可执行妥协',
          action: 'petition',
        },
      ],
    };
  return {
    ...base,
    roles: [
      { name: 'founder', minAge: 18, maxAge: 70, willingness: 0.6, sameSite: true },
      { name: 'neighbor', minAge: 0, maxAge: 90, willingness: 0.5, sameSite: true },
    ],
    conditions: { op: 'all', args: [] },
    effects: [
      { type: 'relate', from: 'founder', to: 'neighbor', amount: 0.04 },
      { type: 'offer', role: 'founder', intention: '尝试建立地方互助组织', action: 'organize' },
      { type: 'offer', role: 'neighbor', intention: '考虑加入地方互助组织', action: 'socialize' },
    ],
  };
}

/** Deterministic author fallback used when no model is configured or a job expires. */
export function fallbackEventDefinition(w: World, request: AuthorRequest) {
  return fallbackForPressure(w, request);
}

export function eventAuthorPayload(w: World, request: AuthorRequest) {
  const site = w.settlements.find((s) => s.id === request.siteId);
  const pressure = sitePressure(w, request.siteId);
  const definitions = Object.values(w.runtime?.active ?? {})
    .slice(0, 64)
    .map((active) => {
      const definition = w.runtime?.definitions[active.key];
      return definition
        ? {
            id: definition.id,
            version: definition.version,
            kind: definition.kind,
            title: definition.title,
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
      causeIds: request.causeIds,
      pressure: request.pressure,
    },
    world: {
      id: w.id,
      month: w.month,
      year: w.calendar
        ? w.calendar.startYear + Math.floor(w.month / 12)
        : Math.floor(w.month / 12) + 1,
      activeDefinitions: definitions,
      anomalyBudget: Math.max(
        1,
        Math.min(3, Math.floor(w.persons.filter((p) => p.death === undefined).length / 5000) + 1),
      ),
    },
    site: site
      ? {
          id: site.id,
          name: site.name,
          polityId: site.polityId,
          scarcity: site.scarcity,
          unrest: site.unrest,
          food: site.food,
          knowledge: site.knowledge,
          disease: site.disease?.prevalence ?? 0,
          population:
            site.cohort.children +
            site.cohort.adults +
            site.cohort.elders +
            w.persons.filter((p) => p.locationId === site.id && p.death === undefined).length,
          organizations: w.organizations
            .filter((o) => o.status === 'active' && o.locationId === site.id)
            .slice(0, 8)
            .map((o) => ({ id: o.id, name: o.name, kind: o.kind, members: o.memberIds.length })),
          activeConflicts: w.conflicts
            .filter((c) => c.status === 'active' && c.locationId === site.id)
            .slice(0, 4)
            .map((c) => ({ id: c.id, a: c.a, b: c.b, causeIds: c.causeIds })),
        }
      : undefined,
    observedPressure: pressure,
    recentEvents: [] as Array<Record<string, unknown>>,
  };
}

export function eventAuthorProposalFrom(raw: unknown, job: any) {
  const value =
    raw && typeof raw === 'object'
      ? ((raw as Record<string, unknown>).proposal ??
        (raw as Record<string, unknown>).definition ??
        raw)
      : raw;
  if (!value || typeof value !== 'object' || Array.isArray(value))
    throw new Error('event author did not return an object');
  const proposal = value as Record<string, unknown>;
  return {
    version: 1,
    jobId: job.id,
    proposal: {
      ...proposal,
      schemaVersion: 1,
      id:
        typeof proposal.id === 'string' && proposal.id.length > 0 ? proposal.id : `auto.${job.id}`,
      version: 1,
      kind: 'event',
      provenance: {
        ...(typeof proposal.provenance === 'object' && proposal.provenance
          ? (proposal.provenance as Record<string, unknown>)
          : {}),
        source: 'model',
        jobId: job.id,
        model: 'event-author/1',
        observedMonth: job.observed_month,
        compiler: 'rules/1',
        rationale: job.payload?.request?.reason,
      },
    },
  };
}
