import { isDetained } from '../coercion/index.js';
import { random } from '../simulation-core/random.js';
import type { Organization, Person, Settlement, World } from '../contracts/index.js';
import type { Effect, Predicate, PredicateField, Role, RuleDefinition, Scope } from './schema.js';

export const MAX_SCOPE_UNITS = 128;
export const MAX_ROLE_CANDIDATES = 256;

export type ScopeUnit = {
  key: string;
  siteId?: string;
  polityId?: string;
  organizationId?: string;
  personIds?: string[];
};

export type RoleBinding = Record<string, string>;

export type RoleMatch = {
  roles: RoleBinding;
  candidates: number;
  units: number;
  firstUnit?: ScopeUnit;
};

export type MatchResult =
  { ok: true; match: RoleMatch } | { ok: false; reason: string; candidates: number; units: number };

function byId<T extends { id: string }>(a: T, b: T) {
  return a.id.localeCompare(b.id);
}

export function scopeUnits(w: World, scope: Scope): ScopeUnit[] {
  const settlements = [...w.settlements].sort(byId);
  const settlement = new Map(settlements.map((s) => [s.id, s]));
  const units: ScopeUnit[] = [];
  const pushSite = (s: Settlement) => units.push({ key: s.id, siteId: s.id, polityId: s.polityId });
  switch (scope.kind) {
    case 'world':
      return [{ key: 'world' }];
    case 'site': {
      if (!scope.ids.length) for (const s of settlements) pushSite(s);
      else
        for (const id of scope.ids) {
          const s = settlement.get(id);
          if (s) pushSite(s);
        }
      break;
    }
    case 'region': {
      const ids = new Set(scope.ids);
      for (const s of settlements) if (!ids.size || ids.has(s.regionId ?? s.polityId)) pushSite(s);
      break;
    }
    case 'polity': {
      const ids = new Set(scope.ids);
      const polities = new Map<string, Settlement>();
      for (const s of settlements) {
        if (ids.size && !ids.has(s.polityId)) continue;
        const current = polities.get(s.polityId);
        if (
          !current ||
          s.cohort.adults + s.cohort.children + s.cohort.elders >
            current.cohort.adults + current.cohort.children + current.cohort.elders
        )
          polities.set(s.polityId, s);
      }
      for (const s of [...polities.values()].sort(byId))
        units.push({ key: s.polityId, siteId: s.id, polityId: s.polityId });
      break;
    }
    case 'person': {
      const ids = new Set(scope.ids);
      for (const p of w.persons)
        if (ids.has(p.id) && p.death === undefined)
          units.push({
            key: p.id,
            siteId: p.locationId,
            polityId: settlement.get(p.locationId)?.polityId,
            personIds: [p.id],
          });
      break;
    }
    case 'household': {
      const ids = new Set(scope.ids);
      const seen = new Set<string>();
      for (const p of w.persons) {
        if (p.death !== undefined || !ids.has(p.householdId) || seen.has(p.householdId)) continue;
        seen.add(p.householdId);
        units.push({
          key: p.householdId,
          siteId: p.locationId,
          polityId: settlement.get(p.locationId)?.polityId,
          personIds: w.persons
            .filter((q) => q.death === undefined && q.householdId === p.householdId)
            .map((q) => q.id),
        });
      }
      break;
    }
    case 'organization': {
      const ids = new Set(scope.ids);
      for (const o of w.organizations) {
        if (ids.size && !ids.has(o.id)) continue;
        const s = settlement.get(o.locationId);
        if (s)
          units.push({
            key: o.id,
            siteId: s.id,
            polityId: s.polityId,
            organizationId: o.id,
          });
      }
      break;
    }
  }
  return units.sort((a, b) => a.key.localeCompare(b.key)).slice(0, MAX_SCOPE_UNITS);
}

function ageMonths(w: World, p: Person) {
  return Math.max(0, w.month - p.birth);
}

function organizationAt(w: World, unit: ScopeUnit) {
  if (unit.organizationId) return w.organizations.find((o) => o.id === unit.organizationId);
  return undefined;
}

function personPool(w: World, unit: ScopeUnit): Person[] {
  const people = unit.personIds
    ? unit.personIds.map((id) => w.persons.find((p) => p.id === id)).filter((p): p is Person => !!p)
    : w.persons.filter((p) => p.locationId === unit.siteId);
  return people
    .filter(
      (p) =>
        p.death === undefined && !p.journey && !isDetained(w, p) && p.locationId === unit.siteId,
    )
    .sort(byId)
    .slice(0, MAX_ROLE_CANDIDATES);
}

function relationshipTrust(w: World, p: Person, otherId: string) {
  return p.relationships.find((r) => r.personId === otherId)?.trust ?? -1;
}

function roleCandidates(w: World, unit: ScopeUnit, role: Role, bindings: RoleBinding): Person[] {
  const all = personPool(w, unit);
  const related = role.relatedTo ? bindings[role.relatedTo] : undefined;
  return all.filter((p) => {
    const age = ageMonths(w, p) / 12;
    if (age < role.minAge || age > role.maxAge) return false;
    if (role.occupation && p.occupation !== role.occupation) return false;
    if (role.personId && p.id !== role.personId) return false;
    if (role.relatedTo && (!related || p.id === related)) return false;
    if (role.relatedTo && relationshipTrust(w, p, related!) < role.minTrust) return false;
    if (role.memberOf) {
      const orgId = role.memberOf.startsWith('org:') ? role.memberOf.slice(4) : undefined;
      if (!orgId || !w.organizations.some((o) => o.id === orgId && o.memberIds.includes(p.id)))
        return false;
    }
    if (role.capability && w.runtime?.abilities[p.id]?.mode !== role.capability) return false;
    if (role.willingness <= 0) return false;
    return true;
  });
}

function score(w: World, def: RuleDefinition, role: Role, p: Person, related?: string) {
  const trust = related ? relationshipTrust(w, p, related) : 0;
  return (
    role.willingness * 2 +
    Math.max(0, trust) * 0.3 +
    random(w.seed, w.month, def.id, def.version, role.name, p.id) * 0.5
  );
}

export function selectRoles(w: World, def: RuleDefinition, unit: ScopeUnit): MatchResult {
  const bindings: RoleBinding = {};
  let candidates = 0;
  for (const role of def.roles) {
    if (role.sameSite === false && !unit.siteId && unit.key === 'world' && !role.personId) {
      // A world-scoped non-local role is intentionally not supported: it would
      // let dynamic content select from the whole population without a place.
      return {
        ok: false,
        reason: 'world-scope role needs a site or personId',
        candidates,
        units: 1,
      };
    }
    const pool = roleCandidates(w, unit, role, bindings);
    candidates += pool.length;
    if (!pool.length)
      return { ok: false, reason: `no eligible role ${role.name}`, candidates, units: 1 };
    const related = role.relatedTo ? bindings[role.relatedTo] : undefined;
    const chosen = pool
      .filter((p) => !Object.values(bindings).includes(p.id))
      .sort(
        (a, b) =>
          score(w, def, role, b, related) - score(w, def, role, a, related) ||
          a.id.localeCompare(b.id),
      )[0];
    if (!chosen)
      return { ok: false, reason: `no distinct role ${role.name}`, candidates, units: 1 };
    bindings[role.name] = chosen.id;
  }
  return { ok: true, match: { roles: bindings, candidates, units: 1, firstUnit: unit } };
}

export type PredicateContext = {
  w: World;
  unit: ScopeUnit;
  roles: RoleBinding;
  counter?: { predicates: number; gas: number; exhausted: boolean };
};

function spend(ctx: PredicateContext) {
  if (ctx.counter) {
    ctx.counter.predicates++;
    if (ctx.counter.predicates > ctx.counter.gas) {
      ctx.counter.exhausted = true;
      return false;
    }
  }
  return true;
}

function settlementOf(ctx: PredicateContext) {
  return ctx.unit.siteId ? ctx.w.settlements.find((s) => s.id === ctx.unit.siteId) : undefined;
}

function polityOf(ctx: PredicateContext) {
  return ctx.unit.polityId ? ctx.w.polities.find((p) => p.id === ctx.unit.polityId) : undefined;
}

function personOf(ctx: PredicateContext, role?: string) {
  const id = role ? ctx.roles[role] : Object.values(ctx.roles)[0];
  return id ? ctx.w.persons.find((p) => p.id === id) : undefined;
}

function numericField(
  ctx: PredicateContext,
  field: PredicateField,
  role?: string,
  of?: 'person' | 'site' | 'polity' | 'world' | 'organization',
): number | undefined {
  const p = personOf(ctx, role);
  const s = settlementOf(ctx);
  const polity = polityOf(ctx);
  const org = organizationAt(ctx.w, ctx.unit);
  switch (field) {
    case 'age':
      return p ? (ctx.w.month - p.birth) / 12 : undefined;
    case 'coin':
      if (of === 'site') return s?.coin;
      if (of === 'polity') return polity?.treasury;
      if (of === 'organization') return org?.treasury;
      return p?.coin;
    case 'health':
      return p?.health;
    case 'stress':
      return p?.stress;
    case 'learning':
      return p?.skills.learning;
    case 'craft':
      return p?.skills.craft;
    case 'education':
      return p?.life?.education.level ?? (p ? 1 : undefined);
    case 'knowledge':
      return of === 'site' ? s?.knowledge : p ? p.skills.learning : s?.knowledge;
    case 'food':
      return s?.food;
    case 'medicine':
      return s && ctx.w.industry
        ? (ctx.w.industry.polities[s.polityId]?.goods.medicine ?? 0)
        : undefined;
    case 'scarcity':
      return s?.scarcity;
    case 'unrest':
      return s?.unrest;
    case 'population':
      return s
        ? s.cohort.children +
            s.cohort.adults +
            s.cohort.elders +
            ctx.w.persons.filter((q) => q.locationId === s.id && q.death === undefined).length
        : undefined;
    case 'legitimacy':
      return polity?.legitimacy;
    case 'military':
      return polity?.military;
    case 'treasury':
      return polity?.treasury;
    case 'members':
      return org?.memberIds.length;
    case 'disease':
      return s?.disease?.prevalence;
    case 'year':
      return ctx.w.calendar
        ? ctx.w.calendar.startYear + Math.floor(ctx.w.month / 12)
        : Math.floor(ctx.w.month / 12) + 1;
    case 'war':
      return ctx.w.conflicts.filter((c) => c.status === 'active').length;
    case 'trust': {
      const rel = role ? ctx.roles[role] : undefined;
      const other = p && rel ? p.relationships.find((r) => r.personId !== p.id) : undefined;
      return p && other ? other.trust : undefined;
    }
    case 'influence':
      return p ? (p.title ? 0.85 : Math.min(0.8, (org?.memberIds.length ?? 0) / 50)) : undefined;
    case 'abilityUses':
      return p ? ctx.w.runtime?.abilities[p.id]?.uses : undefined;
    case 'exposure':
      return p ? ctx.w.runtime?.abilities[p.id]?.exposure : undefined;
  }
}

function compare(ctx: PredicateContext, p: Extract<Predicate, { op: 'compare' }>): boolean {
  if (!spend(ctx)) return false;
  const value = numericField(ctx, p.field, p.role, p.of);
  if (value === undefined || !Number.isFinite(value)) return false;
  return p.cmp === 'gte'
    ? value >= p.value
    : p.cmp === 'lte'
      ? value <= p.value
      : value === p.value;
}

export function evaluatePredicate(ctx: PredicateContext, predicate: Predicate, depth = 0): boolean {
  if (depth > 8 || !spend(ctx)) return false;
  if (predicate.op === 'all')
    return predicate.args.every((arg) => evaluatePredicate(ctx, arg, depth + 1));
  if (predicate.op === 'any')
    return predicate.args.some((arg) => evaluatePredicate(ctx, arg, depth + 1));
  if (predicate.op === 'not') return !evaluatePredicate(ctx, predicate.arg, depth + 1);
  if (predicate.op === 'compare') return compare(ctx, predicate);
  return false;
}

export type RefTarget =
  | { kind: 'person'; person: Person }
  | { kind: 'settlement'; settlement: Settlement }
  | { kind: 'polity'; polity: World['polities'][number] }
  | { kind: 'organization'; organization: Organization };

export function resolveRef(
  w: World,
  unit: ScopeUnit,
  roles: RoleBinding,
  value: string,
): RefTarget | undefined {
  if (value === 'site') {
    const settlement = unit.siteId ? w.settlements.find((s) => s.id === unit.siteId) : undefined;
    return settlement ? { kind: 'settlement', settlement } : undefined;
  }
  if (value === 'polity') {
    const polity = unit.polityId ? w.polities.find((p) => p.id === unit.polityId) : undefined;
    return polity ? { kind: 'polity', polity } : undefined;
  }
  if (value.startsWith('site:')) {
    const settlement = w.settlements.find((s) => s.id === value.slice(5));
    return settlement ? { kind: 'settlement', settlement } : undefined;
  }
  if (value.startsWith('person:')) {
    const person = w.persons.find((p) => p.id === value.slice(7));
    return person && person.death === undefined ? { kind: 'person', person } : undefined;
  }
  if (value.startsWith('org:')) {
    const organization = w.organizations.find((o) => o.id === value.slice(4));
    return organization ? { kind: 'organization', organization } : undefined;
  }
  const personId = roles[value];
  const person = personId ? w.persons.find((p) => p.id === personId) : undefined;
  return person && person.death === undefined ? { kind: 'person', person } : undefined;
}

export function refBalance(
  target: RefTarget,
  resource: 'coin' | 'food' | 'medicine',
  w: World,
): number {
  if (resource === 'coin') {
    if (target.kind === 'person') return target.person.coin;
    if (target.kind === 'settlement') return target.settlement.coin;
    if (target.kind === 'polity') return target.polity.treasury;
    return target.organization.treasury;
  }
  if (resource === 'food') return target.kind === 'settlement' ? target.settlement.food : 0;
  if (resource === 'medicine' && target.kind === 'settlement')
    return w.industry?.polities[target.settlement.polityId]?.goods.medicine ?? 0;
  return 0;
}

export function effectFeasible(
  w: World,
  unit: ScopeUnit,
  roles: RoleBinding,
  effect: Effect,
): string | undefined {
  if (effect.type === 'transfer') {
    const from = resolveRef(w, unit, roles, effect.from);
    if (!from) return `unknown transfer source ${effect.from}`;
    if (refBalance(from, effect.resource, w) + 1e-9 < effect.amount)
      return `insufficient ${effect.resource} at ${effect.from}`;
    const to = resolveRef(w, unit, roles, effect.to);
    if (!to) return `unknown transfer target ${effect.to}`;
    if (effect.resource === 'food' && (from.kind !== 'settlement' || to.kind !== 'settlement'))
      return 'food can only move between settlements';
    if (
      effect.resource === 'medicine' &&
      (!['settlement', 'polity'].includes(from.kind) || !['settlement', 'polity'].includes(to.kind))
    )
      return 'medicine can only move through settlement/polity stocks';
  }
  if (effect.type === 'relate') {
    const from = resolveRef(w, unit, roles, effect.from);
    const to = resolveRef(w, unit, roles, effect.to);
    if (!from || from.kind !== 'person') return `unknown relate source ${effect.from}`;
    if (!to || to.kind !== 'person') return `unknown relate target ${effect.to}`;
    if (from.person.id === to.person.id) return 'relationship needs two people';
    const exists = from.person.relationships.some((r) => r.personId === to.person.id);
    if (!exists && from.person.locationId !== to.person.locationId)
      return 'relationship without shared place';
  }
  if (effect.type === 'pressure' && effect.target) {
    if (!resolveRef(w, unit, roles, effect.target))
      return `unknown pressure target ${effect.target}`;
  }
  if (effect.type === 'ability') {
    const actor = resolveRef(w, unit, roles, effect.actor);
    if (!actor || actor.kind !== 'person') return `unknown ability actor ${effect.actor}`;
    const state = w.runtime?.abilities[actor.person.id];
    if (!state) return `actor ${actor.person.id} has no ability`;
    if (state.mode !== effect.mode) return `ability mode mismatch for ${effect.actor}`;
  }
  if (effect.type === 'knowledge' && effect.site) {
    if (!resolveRef(w, unit, roles, effect.site)) return `unknown knowledge site ${effect.site}`;
  }
  if ((effect.type === 'unrest' || effect.type === 'disease') && effect.site) {
    if (!resolveRef(w, unit, roles, effect.site)) return `unknown site ${effect.site}`;
  }
  if ((effect.type === 'legitimacy' || effect.type === 'military') && effect.polity) {
    if (!resolveRef(w, unit, roles, effect.polity)) return `unknown polity ${effect.polity}`;
  }
  return undefined;
}

export function maxDefinitionKey(def: RuleDefinition) {
  return `${def.id}@${def.version}`;
}
