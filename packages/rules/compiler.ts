import { ZodError } from 'zod';
import type { World } from '../contracts/index.js';
import {
  RuleSchema,
  type DefinitionProvenance,
  type Effect,
  type Predicate,
  type Role,
  type RuleDefinition,
} from './schema.js';
import {
  evaluatePredicate,
  effectFeasible,
  maxDefinitionKey,
  scopeUnits,
  selectRoles,
  type ScopeUnit,
} from './match.js';

export type RuleDiagnostic = {
  code: string;
  path: string;
  message: string;
};

export class RuleCompileError extends Error {
  readonly code: string;
  readonly path: string;
  readonly diagnostics: RuleDiagnostic[];
  constructor(code: string, path: string, message: string, diagnostics: RuleDiagnostic[] = []) {
    super(message);
    this.name = 'RuleCompileError';
    this.code = code;
    this.path = path;
    this.diagnostics = diagnostics.length ? diagnostics : [{ code, path, message }];
  }
}

function diag(code: string, path: string, message: string): RuleDiagnostic {
  return { code, path, message };
}

function zodDiagnostics(error: ZodError): RuleDiagnostic[] {
  return error.issues
    .slice(0, 24)
    .map((issue) => diag('schema_invalid', issue.path.join('.') || 'root', issue.message));
}

function roleNames(def: RuleDefinition) {
  return new Set(def.roles.map((r) => r.name));
}

function validRef(value: string | undefined, names: Set<string>) {
  if (!value || value === 'site' || value === 'polity' || value === 'world') return true;
  if (value.startsWith('person:') || value.startsWith('org:') || value.startsWith('site:'))
    return true;
  return names.has(value);
}

function checkEffectRefs(
  effect: Effect,
  names: Set<string>,
  path: string,
  diagnostics: RuleDiagnostic[],
) {
  const check = (value: string | undefined) => {
    if (!validRef(value, names))
      diagnostics.push(diag('unknown_role', path, `unknown role or target reference ${value}`));
  };
  if ('role' in effect) check(effect.role);
  if ('actor' in effect) check(effect.actor);
  if (effect.type === 'transfer') {
    check(effect.from);
    check(effect.to);
  }
  if (effect.type === 'relate') {
    check(effect.from);
    check(effect.to);
  }
  if (effect.type === 'pressure') check(effect.target);
  if (effect.type === 'knowledge') check(effect.site);
  if (effect.type === 'unrest' || effect.type === 'disease') check(effect.site);
  if (effect.type === 'legitimacy' || effect.type === 'military') check(effect.polity);
}

export function validateRuleReferences(w: World, def: RuleDefinition): RuleDiagnostic[] {
  const diagnostics: RuleDiagnostic[] = [];
  const names = roleNames(def);
  const settlements = new Set(w.settlements.map((s) => s.id));
  const polities = new Set(w.polities.map((p) => p.id));
  const persons = new Set(w.persons.map((p) => p.id));
  const organizations = new Set(w.organizations.map((o) => o.id));
  const households = new Set(w.persons.map((p) => p.householdId));
  const regions = new Set(w.settlements.map((s) => s.regionId ?? s.polityId));
  for (const id of def.scope.ids) {
    if (def.scope.kind === 'site' && !settlements.has(id))
      diagnostics.push(diag('unknown_scope', 'scope', `unknown settlement ${id}`));
    if (def.scope.kind === 'region' && !regions.has(id))
      diagnostics.push(diag('unknown_scope', 'scope', `unknown region ${id}`));
    if (def.scope.kind === 'polity' && !polities.has(id))
      diagnostics.push(diag('unknown_scope', 'scope', `unknown polity ${id}`));
    if (def.scope.kind === 'person' && !persons.has(id))
      diagnostics.push(diag('unknown_scope', 'scope', `unknown person ${id}`));
    if (def.scope.kind === 'organization' && !organizations.has(id))
      diagnostics.push(diag('unknown_scope', 'scope', `unknown organization ${id}`));
    if (def.scope.kind === 'household' && !households.has(id))
      diagnostics.push(diag('unknown_scope', 'scope', `unknown household ${id}`));
  }
  for (const role of def.roles) {
    if (role.personId && !persons.has(role.personId))
      diagnostics.push(diag('unknown_role_person', 'roles', `unknown person ${role.personId}`));
    if (role.memberOf?.startsWith('org:') && !organizations.has(role.memberOf.slice(4)))
      diagnostics.push(diag('unknown_role_org', 'roles', `unknown organization ${role.memberOf}`));
    if (role.relatedTo && !def.roles.some((r) => r.name === role.relatedTo))
      diagnostics.push(
        diag('unknown_related_role', 'roles', `unknown related role ${role.relatedTo}`),
      );
  }
  for (const effect of def.effects) checkEffectRefs(effect, names, 'effects', diagnostics);
  for (const effect of def.process?.effects ?? [])
    checkEffectRefs(effect, names, 'process.effects', diagnostics);
  if (def.process?.payerRole && !names.has(def.process.payerRole))
    diagnostics.push(diag('unknown_payer_role', 'process', 'process payer role is not declared'));
  if (def.kind === 'ability' && !def.ability)
    diagnostics.push(diag('missing_ability', 'ability', 'ability rule requires ability limits'));
  if (def.process && def.kind !== 'institution' && def.kind !== 'process')
    diagnostics.push(
      diag('invalid_process', 'process', 'process only belongs to institution/process'),
    );
  return diagnostics;
}

function predicateRoleNames(predicate: Predicate, out = new Set<string>()): Set<string> {
  if (predicate.op === 'all' || predicate.op === 'any') {
    for (const arg of predicate.args) predicateRoleNames(arg, out);
  } else if (predicate.op === 'not') predicateRoleNames(predicate.arg, out);
  else if (predicate.op === 'compare' && predicate.role) out.add(predicate.role);
  return out;
}

export type RuleDryRun = {
  ok: boolean;
  units: number;
  evaluatedUnits: number;
  candidates: number;
  reason?: string;
  diagnostics: RuleDiagnostic[];
};

/**
 * Bounded publish-time preview. It never mutates the world and never executes
 * effects. A definition may be valid even if no role is present this month;
 * `ok` reports whether at least one current scope unit can actually match.
 */
export function dryRunRule(w: World, def: RuleDefinition, maxUnits = 8): RuleDryRun {
  const units = scopeUnits(w, def.scope);
  if (!units.length)
    return {
      ok: false,
      units: 0,
      evaluatedUnits: 0,
      candidates: 0,
      reason: 'scope_empty',
      diagnostics: [diag('scope_empty', 'scope', 'scope selects no existing world entity')],
    };
  let candidates = 0;
  let evaluated = 0;
  for (const unit of units.slice(0, maxUnits)) {
    evaluated++;
    const selected = selectRoles(w, def, unit);
    candidates += selected.ok ? selected.match.candidates : selected.candidates;
    if (!selected.ok) continue;
    const counter = { predicates: 0, gas: Math.min(def.gas, 2000), exhausted: false };
    if (!evaluatePredicate({ w, unit, roles: selected.match.roles, counter }, def.conditions))
      continue;
    let feasible = true;
    for (const effect of def.effects) {
      const problem = effectFeasible(w, unit, selected.match.roles, effect);
      if (problem) {
        feasible = false;
        break;
      }
    }
    if (feasible)
      return {
        ok: true,
        units: units.length,
        evaluatedUnits: evaluated,
        candidates,
        diagnostics: [],
      };
  }
  return {
    ok: false,
    units: units.length,
    evaluatedUnits: evaluated,
    candidates,
    reason: 'no_feasible_unit',
    diagnostics: [
      diag(
        'no_feasible_unit',
        'scope',
        'no current scope unit has eligible roles, true conditions and feasible effects',
      ),
    ],
  };
}

export type CompileOptions = {
  source?: DefinitionProvenance['source'];
  requireFeasible?: boolean;
  inputHash?: string;
  jobId?: string;
  model?: string;
  observedMonth?: number;
  rationale?: string;
};

export function compileRule(
  input: unknown,
  w: World,
  options: CompileOptions = {},
): { definition: RuleDefinition; dryRun: RuleDryRun; diagnostics: RuleDiagnostic[] } {
  let parsed: RuleDefinition;
  try {
    parsed = RuleSchema.parse(input);
  } catch (error) {
    if (error instanceof ZodError)
      throw new RuleCompileError(
        'schema_invalid',
        'root',
        error.issues[0]?.message ?? 'invalid rule definition',
        zodDiagnostics(error),
      );
    throw error;
  }
  const definition: RuleDefinition = {
    ...parsed,
    provenance: {
      ...parsed.provenance,
      source: options.source ?? parsed.provenance.source,
      jobId: options.jobId ?? parsed.provenance.jobId,
      model: options.model ?? parsed.provenance.model,
      observedMonth: options.observedMonth ?? parsed.provenance.observedMonth,
      inputHash: options.inputHash ?? parsed.provenance.inputHash,
      rationale: options.rationale ?? parsed.provenance.rationale,
    },
  };
  const diagnostics = validateRuleReferences(w, definition);
  for (const role of predicateRoleNames(definition.conditions))
    if (!roleNames(definition).has(role))
      diagnostics.push(diag('unknown_predicate_role', 'conditions', `unknown role ${role}`));
  if (diagnostics.length)
    throw new RuleCompileError(
      diagnostics[0].code,
      diagnostics[0].path,
      diagnostics[0].message,
      diagnostics.slice(0, 24),
    );
  const dryRun = dryRunRule(w, definition);
  if (options.requireFeasible && !dryRun.ok)
    throw new RuleCompileError(
      dryRun.reason ?? 'dry_run_failed',
      'scope',
      'rule does not currently match a real world scope',
      dryRun.diagnostics,
    );
  return { definition, dryRun, diagnostics: [] };
}

export function definitionKey(def: RuleDefinition) {
  return maxDefinitionKey(def);
}
