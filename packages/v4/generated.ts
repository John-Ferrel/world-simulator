import type {
  EventEffect,
  NarrationVariant,
  SceneCondition,
  SceneDefinition,
  SceneFollowupTarget,
  SceneOutcome,
  SceneStage,
  RoleRequirement,
  Sex,
} from './domain.js';

/**
 * Content-factory output. A pack describes one event family and the concrete
 * nodes inside it. It is intentionally narrower than the full runtime schema so
 * generated JSON can be validated and compiled without arbitrary code.
 */
export type GeneratedPack = {
  id: string;
  title: string;
  stage: SceneStage;
  ageWindow: { min: number; max: number };
  tags: string[];
  baseRate: number;
  conditions?: SceneCondition[];
  nodes: GeneratedNode[];
};

export type GeneratedNode = {
  id: string;
  title: string;
  weight?: number;
  rate?: number;
  conditions?: SceneCondition[];
  roles: RoleRequirement[];
  outcomes: GeneratedOutcome[];
  tags?: string[];
  triggerTags?: string[];
};

export type GeneratedOutcome = {
  id: string;
  weight: number;
  text: string;
  effects: EventEffect[];
  followupIds?: string[];
  followupTargets?: SceneFollowupTarget[];
  significance?: number;
  narration?: NarrationVariant[];
  conditions?: SceneCondition[];
};

const VALID_SKILLS = new Set(['literacy', 'numeracy', 'craft', 'social']);
const VALID_EDUCATION = new Set([
  'none',
  'home',
  'primary',
  'secondary',
  'apprenticeship',
  'higher',
]);
const VALID_STAGES = new Set<SceneStage>([
  'infancy',
  'childhood',
  'adolescence',
  'adulthood',
  'elderhood',
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
  'development',
  'developmentType',
  'capability',
  'hasRelation',
  'notHasRelation',
  'worldYear',
  'pressure',
  'historicalProcess',
  'hasRelationWith',
]);

export type GeneratedValidation = {
  errors: string[];
  warnings: string[];
};

export function validateGeneratedPack(pack: GeneratedPack): GeneratedValidation {
  const errors: string[] = [];
  const warnings: string[] = [];
  if (!pack.id || !pack.title) errors.push('pack id/title missing');
  if (!VALID_STAGES.has(pack.stage)) errors.push(`invalid stage ${pack.stage}`);
  if (
    !Number.isFinite(pack.ageWindow?.min) ||
    !Number.isFinite(pack.ageWindow?.max) ||
    pack.ageWindow.min > pack.ageWindow.max
  )
    errors.push('invalid ageWindow');
  if (!(pack.baseRate >= 0 && pack.baseRate <= 1)) errors.push('baseRate must be 0..1');
  if (!Array.isArray(pack.nodes) || pack.nodes.length === 0) errors.push('pack has no nodes');
  const ids = new Set<string>();
  for (const node of pack.nodes ?? []) {
    if (!node.id || ids.has(node.id)) errors.push(`node id missing/duplicate: ${node.id}`);
    ids.add(node.id);
    if (!node.title) errors.push(`${node.id}: title missing`);
    if (node.rate !== undefined && !(node.rate >= 0 && node.rate <= 1))
      errors.push(`${node.id}: rate must be 0..1`);
    if (!Array.isArray(node.roles) || !node.roles.some((role) => role.kind === 'subject'))
      errors.push(`${node.id}: subject role missing`);
    const roleKeys = new Set<string>();
    for (const role of node.roles ?? []) {
      if (!VALID_ROLE_KINDS.has(role.kind)) errors.push(`${node.id}: invalid role ${role.kind}`);
      if (roleKeys.has(role.key)) errors.push(`${node.id}: duplicate role key ${role.key}`);
      roleKeys.add(role.key);
      if (role.minAge !== undefined && role.maxAge !== undefined && role.minAge > role.maxAge)
        errors.push(`${node.id}: role ${role.key} age window inverted`);
      if (role.sex !== undefined && !['female', 'male', 'intersex'].includes(role.sex))
        errors.push(`${node.id}: role ${role.key} invalid sex`);
    }
    for (const condition of node.conditions ?? [])
      if (!VALID_CONDITIONS.has(condition.kind))
        errors.push(`${node.id}: invalid condition ${condition.kind}`);
    if (!Array.isArray(node.outcomes) || node.outcomes.length === 0)
      errors.push(`${node.id}: no outcomes`);
    for (const outcome of node.outcomes ?? []) {
      if (!outcome.id || !(outcome.weight > 0))
        errors.push(`${node.id}: bad outcome ${outcome.id}`);
      if (!outcome.text || outcome.text.length < 20)
        errors.push(`${node.id}/${outcome.id}: text too short`);
      if (!Array.isArray(outcome.effects) || outcome.effects.length === 0)
        errors.push(`${node.id}/${outcome.id}: no effects`);
      for (const effect of outcome.effects ?? []) {
        if (!VALID_EFFECTS.has(effect.type))
          errors.push(`${node.id}/${outcome.id}: invalid effect ${effect.type}`);
        else validateEffect(node.id, outcome.id, effect, errors);
      }
      for (const match of outcome.text.matchAll(/\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g)) {
        const key = match[1]!;
        if (
          !roleKeys.has(key) &&
          ![
            'subject',
            'residence',
            'place',
            'school',
            'workplace',
            'child',
            'age',
            'year',
          ].includes(key)
        )
          errors.push(`${node.id}/${outcome.id}: unknown text token {${key}}`);
      }
      for (const variant of outcome.narration ?? []) {
        if (!variant.text || variant.text.length < 20)
          errors.push(`${node.id}/${outcome.id}: narration too short`);
        for (const condition of variant.conditions ?? [])
          if (!VALID_CONDITIONS.has(condition.kind))
            errors.push(`${node.id}/${outcome.id}: invalid narration condition ${condition.kind}`);
      }
    }
  }
  if (pack.nodes?.length && pack.nodes.length < 3)
    warnings.push('family has fewer than 3 nodes; low variety');
  const texts = new Map<string, string>();
  const allTexts: { key: string; text: string }[] = [];
  for (const node of pack.nodes ?? []) {
    for (const outcome of node.outcomes ?? []) {
      const normalized = outcome.text.replace(/\s+/g, '');
      const previous = texts.get(normalized);
      if (previous) warnings.push(`duplicate text: ${previous} and ${node.id}/${outcome.id}`);
      texts.set(normalized, `${node.id}/${outcome.id}`);
      allTexts.push({ key: `${node.id}/${outcome.id}`, text: normalized });
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
      if (jaccard > 0.82)
        warnings.push(`near-duplicate text: ${a.key} and ${b.key} (${jaccard.toFixed(2)})`);
    }
  }
  return { errors, warnings };
}

function validateEffect(nodeId: string, outcomeId: string, effect: EventEffect, errors: string[]) {
  const label = `${nodeId}/${outcomeId}/${effect.type}`;
  const ref = (value: string | undefined) => {
    if (!value) return false;
    return value.startsWith('$') || value.length > 0;
  };
  switch (effect.type) {
    case 'cash':
    case 'food':
      if (!ref(effect.householdId) || !Number.isFinite(effect.amount))
        errors.push(`${label}: bad household/amount`);
      break;
    case 'health':
    case 'condition':
    case 'unemployment':
    case 'role':
    case 'mood':
    case 'reputation':
    case 'flag':
      if (!ref(effect.personId)) errors.push(`${label}: bad person`);
      break;
    case 'organization_membership':
      if (!ref(effect.personId) || !ref(effect.organizationId))
        errors.push(`${label}: bad organization membership`);
      break;
    case 'skill':
      if (!ref(effect.personId)) errors.push(`${label}: bad person`);
      if (!VALID_SKILLS.has(effect.skill)) errors.push(`${label}: bad skill ${effect.skill}`);
      break;
    case 'death':
      if (!ref(effect.personId) || !effect.cause) errors.push(`${label}: bad death`);
      break;
    case 'employment':
      if (!ref(effect.personId) || !ref(effect.organizationId) || !effect.occupation)
        errors.push(`${label}: bad employment`);
      break;
    case 'education':
      if (!ref(effect.personId)) errors.push(`${label}: bad education person`);
      if (!VALID_EDUCATION.has(effect.status))
        errors.push(`${label}: bad education status ${effect.status}`);
      break;
    case 'relation':
      if (!ref(effect.a) || !ref(effect.b)) errors.push(`${label}: bad relation`);
      break;
    case 'relation_end':
      if (!ref(effect.a) || !ref(effect.b)) errors.push(`${label}: bad relation_end`);
      break;
    case 'move':
      if (!ref(effect.personId) || !ref(effect.locationId)) errors.push(`${label}: bad move`);
      break;
    case 'household':
      if (!ref(effect.personId) || !ref(effect.householdId)) errors.push(`${label}: bad household`);
      break;
    case 'residence':
      if (!ref(effect.householdId) || !ref(effect.residenceId))
        errors.push(`${label}: bad residence`);
      break;
    case 'birth':
      if (!Array.isArray(effect.parentIds) || effect.parentIds.length === 0)
        errors.push(`${label}: bad birth parents`);
      break;
    case 'estate':
      if (!ref(effect.personId) || !ref(effect.heirHouseholdId))
        errors.push(`${label}: bad estate`);
      break;
    case 'knowledge':
      if (
        !ref(effect.holderId) ||
        typeof effect.proposition !== 'string' ||
        effect.proposition.length < 3 ||
        effect.proposition.length > 280 ||
        !Number.isFinite(effect.confidence)
      )
        errors.push(`${label}: bad knowledge`);
      break;
    case 'historical_participation':
      if (
        !ref(effect.processId) ||
        !ref(effect.personId) ||
        typeof effect.role !== 'string' ||
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
        ].includes(effect.role)
      )
        errors.push(`${label}: bad historical participation`);
      break;
    case 'historical_influence':
      if (
        !ref(effect.processId) ||
        !ref(effect.personId) ||
        !['support', 'opposition', 'resources', 'legitimacy', 'escalation', 'information'].includes(
          effect.dimension,
        ) ||
        !Number.isFinite(effect.amount)
      )
        errors.push(`${label}: bad historical influence`);
      break;
    case 'historical_process':
      if (
        !effect.process ||
        !/^[a-zA-Z0-9:_-]{1,160}$/.test(effect.process.id) ||
        typeof effect.process.description !== 'string'
      )
        errors.push(`${label}: bad historical process`);
      break;
    default:
      break;
  }
}

export function compileGeneratedPack(pack: GeneratedPack): SceneDefinition[] {
  const rawRates = pack.nodes.map((node) =>
    node.rate !== undefined ? node.rate : pack.baseRate / Math.max(1, pack.nodes.length),
  );
  const rawTotal = rawRates.reduce((sum, rate) => sum + rate, 0);
  const scale = rawTotal > 0 ? pack.baseRate / rawTotal : 0;
  return pack.nodes.map((node, index) => ({
    id: node.id,
    version: 1,
    packId: 'generated-vienna',
    familyId: pack.id,
    title: node.title,
    stage: pack.stage,
    ageWindow: { ...pack.ageWindow },
    roles: node.roles,
    conditions: [...(pack.conditions ?? []), ...(node.conditions ?? [])],
    tags: [...new Set([...pack.tags, ...(node.tags ?? [])])],
    triggerTags: node.triggerTags,
    rate: (rawRates[index] ?? 0) * scale,
    weight: node.weight ?? 1,
    subjectProvenance: ['birth', 'initial'],
    outcomes: node.outcomes.map<SceneOutcome>((outcome) => ({
      id: outcome.id,
      weight: outcome.weight,
      conditions: outcome.conditions,
      immediateText: outcome.text,
      effects: outcome.effects,
      followupSceneIds: outcome.followupIds,
      followupTargets: outcome.followupTargets,
      narrationKey: outcome.id,
      significance: outcome.significance,
    })),
    narration: node.outcomes.flatMap((outcome) => outcome.narration ?? []),
    historicalBasis:
      'Generated Vienna event family; validated against the bounded event grammar before publication.',
  }));
}

export function assertGeneratedPack(pack: GeneratedPack): void {
  const { errors } = validateGeneratedPack(pack);
  if (errors.length > 0) throw new Error(`generated pack invalid:\n${errors.join('\n')}`);
}
