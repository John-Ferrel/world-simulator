import type { EventEffect, Relation, RoleRequirement, SceneCondition } from '../domain.js';
import type { GeneratedPack } from '../generated.js';
import { validateGeneratedPack } from '../generated.js';

const TEXT_BUILTINS = new Set([
  'subject',
  'residence',
  'place',
  'school',
  'workplace',
  'age',
  'year',
]);

const EFFECT_BUILTINS = new Set([
  'subject',
  'household',
  'residence',
  'place',
  'school',
  'workplace',
  'subjectPlace',
  'subjectOrg',
  'employerOrg',
  'eventId',
]);

const VALID_SKILLS = new Set(['literacy', 'numeracy', 'craft', 'social']);
const VALID_RELATION_KINDS = new Set<Relation['kind']>([
  'kin',
  'guardian',
  'partner',
  'friend',
  'colleague',
  'employer',
  'rival',
  'acquaintance',
]);
const VALID_EDUCATION = new Set([
  'none',
  'home',
  'primary',
  'secondary',
  'apprenticeship',
  'higher',
]);
const VALID_ROLE_KINDS = new Set<RoleRequirement['kind']>([
  'subject',
  'parent',
  'guardian',
  'sibling',
  'partner',
  'teacher',
  'employer',
  'worker',
  'union_member',
  'neighbor',
  'official',
  'organization',
  'historical',
]);
const VALID_ORGANIZATION_KINDS = new Set([
  'household_firm',
  'factory',
  'school',
  'union',
  'party',
  'army',
  'state',
  'church',
  'other',
]);

/** Residences authored scenes may actually move a household into. */
export const KNOWN_RESIDENCE_IDS = new Set([
  'place-wien-leopoldstadt-tenement',
  'place-klosterneuburg-aunt-house',
]);

const VALID_EFFECTS = new Set<EventEffect['type']>([
  'cash',
  'food',
  'health',
  'condition',
  'mood',
  'reputation',
  'skill',
  'flag',
  'education',
  'employment',
  'unemployment',
  'relation',
  'relation_end',
  'role',
  'organization_membership',
  'move',
  'household',
  'residence',
  'birth',
  'death',
  'estate',
  'knowledge',
  'historical_participation',
  'historical_influence',
  'historical_process',
]);

const VALID_CONDITIONS = new Set<SceneCondition['kind']>([
  'age',
  'stage',
  'cash',
  'householdSize',
  'overcrowded',
  'health',
  'education',
  'employment',
  'placeKind',
  'hasRole',
  'notHasRole',
  'hasRelation',
  'notHasRelation',
  'development',
  'developmentType',
  'capability',
  'worldYear',
  'pressure',
  'historicalProcess',
  'hasRelationWith',
]);

export type AuthoredValidationOptions = {
  /** Enforce the Phase-2 family shape: four nodes, 2-3 outcomes, 2+ narrations. */
  phase2?: boolean;
};

export type AuthoredValidation = {
  errors: string[];
  warnings: string[];
};

function normalized(text: string): string {
  return text.replace(/\s+/g, '');
}

function checkToken(
  where: string,
  key: string,
  roleKeys: Set<string>,
  errors: string[],
  allowEffectBuiltins = false,
) {
  if (roleKeys.has(key)) return;
  const builtins = allowEffectBuiltins ? EFFECT_BUILTINS : TEXT_BUILTINS;
  if (!builtins.has(key)) errors.push(`${where}: unknown token {${key}}`);
}

function checkEffectRef(where: string, key: string, roleKeys: Set<string>, errors: string[]) {
  checkToken(where, key, roleKeys, errors, true);
}

function checkCondition(where: string, condition: SceneCondition, errors: string[]) {
  if (!condition || typeof condition !== 'object') {
    errors.push(`${where}: invalid condition`);
    return;
  }
  if (!VALID_CONDITIONS.has(condition.kind)) {
    errors.push(`${where}: invalid condition ${String((condition as { kind?: unknown }).kind)}`);
    return;
  }
  if (condition.kind === 'hasRelation' || condition.kind === 'notHasRelation') {
    const relationKind = (condition as { relationKind?: unknown }).relationKind;
    if (
      typeof relationKind !== 'string' ||
      !VALID_RELATION_KINDS.has(relationKind as Relation['kind'])
    ) {
      errors.push(`${where}: ${condition.kind} needs a valid relationKind`);
    }
  }
  if (condition.kind === 'education') {
    for (const status of condition.in ?? []) {
      if (!VALID_EDUCATION.has(status)) errors.push(`${where}: invalid education ${status}`);
    }
  }
  if (condition.kind === 'stage') {
    for (const stage of condition.in ?? []) {
      if (!['infancy', 'childhood', 'adolescence', 'adulthood', 'elderhood'].includes(stage)) {
        errors.push(`${where}: invalid stage ${stage}`);
      }
    }
  }
  if (condition.kind === 'historicalProcess') {
    const allowedKinds = [
      'war_mobilization',
      'public_health_crisis',
      'social_movement',
      'political_repression',
      'economic_crisis',
      'cultural_movement',
      'other',
    ];
    if (condition.processKind && !allowedKinds.includes(condition.processKind))
      errors.push(`${where}: invalid historical process kind ${condition.processKind}`);
    const allowedPhases = [
      'emerging',
      'mobilizing',
      'confrontation',
      'institutionalizing',
      'repression',
      'declining',
      'ended',
    ];
    for (const phase of condition.phases ?? [])
      if (!allowedPhases.includes(phase))
        errors.push(`${where}: invalid historical phase ${phase}`);
    for (const role of condition.roles ?? [])
      if (
        ![
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
        ].includes(role)
      )
        errors.push(`${where}: invalid historical role ${role}`);
  }
  if (condition.kind === 'hasRelationWith' && !condition.personId)
    errors.push(`${where}: hasRelationWith needs personId`);
}

function checkEffect(
  where: string,
  effect: EventEffect,
  roleKeys: Set<string>,
  pack: GeneratedPack,
  errors: string[],
) {
  if (!effect || typeof effect !== 'object') {
    errors.push(`${where}: invalid effect`);
    return;
  }
  if (!VALID_EFFECTS.has(effect.type)) {
    errors.push(`${where}: invalid effect type ${String((effect as { type?: unknown }).type)}`);
    return;
  }
  const record = effect as unknown as Record<string, unknown>;
  for (const [field, value] of Object.entries(record)) {
    if (typeof value === 'string' && value.startsWith('$')) {
      checkEffectRef(`${where}/${effect.type}/${field}`, value.slice(1), roleKeys, errors);
    }
  }

  const finite = (value: unknown) => typeof value === 'number' && Number.isFinite(value);
  const reason = typeof record.reason === 'string' ? record.reason.trim() : '';
  switch (effect.type) {
    case 'cash':
    case 'food': {
      if (!finite(effect.amount) || effect.amount === 0) errors.push(`${where}: bad amount`);
      if (effect.type === 'cash' && Math.abs(effect.amount) > 100)
        errors.push(`${where}: cash out of range`);
      if (effect.type === 'food' && Math.abs(effect.amount) > 10)
        errors.push(`${where}: food out of range`);
      if (effect.householdId !== '$household') errors.push(`${where}: must target $household`);
      if (!reason) errors.push(`${where}: missing reason`);
      break;
    }
    case 'health':
      if (!finite(effect.amount) || Math.abs(effect.amount) > 0.25)
        errors.push(`${where}: health out of range`);
      if (!reason) errors.push(`${where}: missing reason`);
      break;
    case 'mood':
    case 'reputation':
      if (!finite(effect.amount) || Math.abs(effect.amount) > 0.4)
        errors.push(`${where}: mood/reputation out of range`);
      if (!reason) errors.push(`${where}: missing reason`);
      break;
    case 'skill':
      if (!VALID_SKILLS.has(effect.skill))
        errors.push(`${where}: invalid skill ${String(effect.skill)}`);
      if (!finite(effect.amount) || Math.abs(effect.amount) > 0.15)
        errors.push(`${where}: skill out of range`);
      if (!reason) errors.push(`${where}: missing reason`);
      break;
    case 'condition':
      if (!effect.condition || typeof effect.condition !== 'string')
        errors.push(`${where}: missing condition`);
      if (typeof effect.add !== 'boolean') errors.push(`${where}: condition add missing`);
      if (!reason) errors.push(`${where}: missing reason`);
      break;
    case 'flag':
      if (!effect.flag || typeof effect.flag !== 'string') errors.push(`${where}: missing flag`);
      if (typeof effect.add !== 'boolean') errors.push(`${where}: flag add missing`);
      if (!reason) errors.push(`${where}: missing reason`);
      break;
    case 'education':
      if (!VALID_EDUCATION.has(effect.status)) errors.push(`${where}: invalid education status`);
      if (
        effect.level !== undefined &&
        (!finite(effect.level) || effect.level < 0 || effect.level > 10)
      ) {
        errors.push(`${where}: education level out of range`);
      }
      if (!reason) errors.push(`${where}: missing reason`);
      break;
    case 'employment':
      if (!effect.occupation || typeof effect.occupation !== 'string')
        errors.push(`${where}: missing occupation`);
      if (!finite(effect.wage) || effect.wage < 0 || effect.wage > 100)
        errors.push(`${where}: wage out of range`);
      if (!reason) errors.push(`${where}: missing reason`);
      break;
    case 'unemployment':
    case 'role':
      if (!reason) errors.push(`${where}: missing reason`);
      break;
    case 'relation':
      if (!VALID_RELATION_KINDS.has(effect.kind))
        errors.push(`${where}: invalid relation kind ${effect.kind}`);
      for (const key of ['trust', 'affection', 'obligation', 'fear', 'respect'] as const) {
        const value = effect[key];
        if (value !== undefined && (!finite(value) || Math.abs(value) > 0.5)) {
          errors.push(`${where}: relation ${key} out of range`);
        }
      }
      if (!reason) errors.push(`${where}: missing reason`);
      break;
    case 'relation_end':
      if (!VALID_RELATION_KINDS.has(effect.kind))
        errors.push(`${where}: invalid relation kind ${effect.kind}`);
      if (!reason) errors.push(`${where}: missing reason`);
      break;
    case 'move':
      if (!reason) errors.push(`${where}: missing reason`);
      if (
        typeof effect.locationId === 'string' &&
        !effect.locationId.startsWith('$') &&
        !pack.tags.includes('housing')
      ) {
        errors.push(`${where}: fixed location outside a housing family`);
      }
      break;
    case 'household':
      if (effect.householdId !== '$household') errors.push(`${where}: must target $household`);
      if (!reason) errors.push(`${where}: missing reason`);
      break;
    case 'residence': {
      if (typeof effect.residenceId !== 'string' || effect.residenceId.startsWith('$')) {
        errors.push(`${where}: residence needs a concrete seed residence id`);
      } else if (!pack.tags.includes('housing')) {
        errors.push(`${where}: fixed residence outside a housing family`);
      } else if (!KNOWN_RESIDENCE_IDS.has(effect.residenceId)) {
        errors.push(`${where}: unknown residence ${effect.residenceId}`);
      }
      if (!reason) errors.push(`${where}: missing reason`);
      break;
    }
    case 'birth':
      if (!Array.isArray(effect.parentIds) || effect.parentIds.length === 0) {
        errors.push(`${where}: birth needs parents`);
      }
      if (!['female', 'male', 'intersex'].includes(effect.childSex))
        errors.push(`${where}: invalid child sex`);
      if (!reason) errors.push(`${where}: missing reason`);
      break;
    case 'death':
      if (!effect.cause || typeof effect.cause !== 'string')
        errors.push(`${where}: death cause missing`);
      if (!reason) errors.push(`${where}: missing reason`);
      break;
    case 'estate':
      if (!finite(effect.amount) || effect.amount <= 0)
        errors.push(`${where}: estate amount invalid`);
      if (!reason) errors.push(`${where}: missing reason`);
      break;
    default:
      break;
  }
}

/**
 * Stricter than the publishing schema: verifies that prose tokens, effect
 * references and effect fields point at something the runtime can actually
 * resolve. The generator refuses to publish a pack that fails here.
 */
export function validateAuthoredPack(
  pack: GeneratedPack,
  options: AuthoredValidationOptions = {},
): AuthoredValidation {
  const errors: string[] = [];
  const warnings: string[] = [];
  const base = validateGeneratedPack(pack);
  errors.push(...base.errors);
  warnings.push(...base.warnings);

  if (options.phase2) {
    if (!Array.isArray(pack.nodes) || pack.nodes.length !== 4) {
      errors.push(`phase2: expected 4 nodes, got ${pack.nodes?.length ?? 0}`);
    }
  }

  const nodeIds = new Set<string>();
  const exactTexts = new Map<string, string>();
  const allTexts: { key: string; text: string }[] = [];

  for (const node of pack.nodes ?? []) {
    const nodeLabel = `${pack.id}/${node.id}`;
    if (nodeIds.has(node.id)) errors.push(`${nodeLabel}: duplicate node id`);
    nodeIds.add(node.id);
    if (!node.title?.trim()) errors.push(`${nodeLabel}: missing title`);

    const roleKeys = new Set<string>();
    let subjectRoles = 0;
    for (const role of node.roles ?? []) {
      if (!VALID_ROLE_KINDS.has(role.kind))
        errors.push(`${nodeLabel}: invalid role kind ${role.kind}`);
      if (roleKeys.has(role.key)) errors.push(`${nodeLabel}: duplicate role key ${role.key}`);
      roleKeys.add(role.key);
      if (role.kind === 'subject') subjectRoles += 1;
      if (
        role.organizationKind !== undefined &&
        !VALID_ORGANIZATION_KINDS.has(role.organizationKind)
      ) {
        errors.push(`${nodeLabel}: invalid organizationKind ${role.organizationKind}`);
      }
      if (role.minAge !== undefined && role.maxAge !== undefined && role.minAge > role.maxAge) {
        errors.push(`${nodeLabel}: role ${role.key} age window inverted`);
      }
    }
    if (subjectRoles !== 1) errors.push(`${nodeLabel}: expected exactly one subject role`);

    for (const condition of node.conditions ?? []) checkCondition(nodeLabel, condition, errors);

    if (options.phase2 && (node.outcomes?.length ?? 0) < 2) {
      errors.push(`${nodeLabel}: phase2 needs 2-3 outcomes`);
    }
    if (options.phase2 && (node.outcomes?.length ?? 0) > 3) {
      errors.push(`${nodeLabel}: phase2 needs 2-3 outcomes`);
    }
    const outcomeIds = new Set<string>();
    for (const outcome of node.outcomes ?? []) {
      const outcomeLabel = `${nodeLabel}/${outcome.id}`;
      if (!outcome.id) errors.push(`${outcomeLabel}: missing id`);
      if (outcomeIds.has(outcome.id)) errors.push(`${outcomeLabel}: duplicate outcome id`);
      outcomeIds.add(outcome.id);
      if (!Number.isFinite(outcome.weight) || outcome.weight <= 0) {
        errors.push(`${outcomeLabel}: bad weight`);
      }
      for (const token of outcome.text.matchAll(/\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g)) {
        checkToken(outcomeLabel, token[1]!, roleKeys, errors);
      }
      const key = outcome.id || 'missing';
      const prev = exactTexts.get(normalized(outcome.text));
      if (prev) errors.push(`${outcomeLabel}: duplicate outcome text with ${prev}`);
      exactTexts.set(normalized(outcome.text), outcomeLabel);
      allTexts.push({ key: outcomeLabel, text: normalized(outcome.text) });

      for (const effect of outcome.effects ?? []) {
        checkEffect(outcomeLabel, effect, roleKeys, pack, errors);
      }

      if (options.phase2 && (outcome.narration?.length ?? 0) < 2) {
        errors.push(`${outcomeLabel}: phase2 needs at least 2 narrations`);
      }
      const narrationIds = new Set<string>();
      for (const variant of outcome.narration ?? []) {
        const variantLabel = `${outcomeLabel}/narration:${variant.id}`;
        if (!variant.id) errors.push(`${variantLabel}: missing id`);
        if (narrationIds.has(variant.id)) errors.push(`${variantLabel}: duplicate narration id`);
        narrationIds.add(variant.id);
        if (variant.key !== outcome.id && variant.key !== 'default') {
          errors.push(`${variantLabel}: narration key ${variant.key} does not match outcome`);
        }
        for (const token of variant.text.matchAll(/\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g)) {
          checkToken(variantLabel, token[1]!, roleKeys, errors);
        }
        for (const condition of variant.conditions ?? []) {
          checkCondition(variantLabel, condition, errors);
        }
      }

      for (const followup of outcome.followupIds ?? []) {
        if (!pack.nodes.some((candidate) => candidate.id === followup)) {
          errors.push(`${outcomeLabel}: unknown followup ${followup}`);
        }
      }
      for (const target of outcome.followupTargets ?? []) {
        if (!pack.nodes.some((candidate) => candidate.id === target.sceneId)) {
          errors.push(`${outcomeLabel}: unknown followup scene ${target.sceneId}`);
        }
        if (
          target.subjectRole !== undefined &&
          target.subjectRole !== 'subject' &&
          !roleKeys.has(target.subjectRole)
        ) {
          errors.push(`${outcomeLabel}: unknown followup role ${target.subjectRole}`);
        }
      }
    }
  }

  for (let i = 0; i < allTexts.length; i += 1) {
    for (let j = i + 1; j < allTexts.length; j += 1) {
      const a = allTexts[i]!;
      const b = allTexts[j]!;
      if (a.text.length < 40 || b.text.length < 40) continue;
      const grams = (value: string) => {
        const set = new Set<string>();
        for (let k = 0; k + 2 < value.length; k += 1) set.add(value.slice(k, k + 2));
        return set;
      };
      const ga = grams(a.text);
      const gb = grams(b.text);
      let overlap = 0;
      for (const gram of ga) if (gb.has(gram)) overlap += 1;
      const jaccard = overlap / Math.max(1, ga.size + gb.size - overlap);
      if (jaccard > 0.9) {
        errors.push(`near-duplicate outcome text: ${a.key} and ${b.key} (${jaccard.toFixed(2)})`);
      }
    }
  }

  if (pack.nodes?.length && pack.nodes.length < 3) warnings.push('family has fewer than 3 nodes');
  return { errors, warnings };
}
