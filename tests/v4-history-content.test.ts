import { describe, expect, it } from 'vitest';
import {
  stageForAge,
  type EventEffect,
  type HistoricalParticipantRole,
  type HistoricalPhase,
  type HistoricalProcessKind,
  type Person,
  type Place,
  type Relation,
  type SceneCondition,
  type SceneDefinition,
} from '../packages/v4/domain.js';
import { VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import {
  VIENNA_HISTORY_PACK_ID,
  VIENNA_HISTORY_PROCESS_IDS,
  VIENNA_HISTORY_SCENES,
  VIENNA_HISTORY_SOURCES,
} from '../packages/v4/content/vienna-history.js';

const scenes = VIENNA_HISTORY_SCENES;
const sceneById = new Map(scenes.map((scene) => [scene.id, scene]));
const sourceIds = new Set(Object.keys(VIENNA_HISTORY_SOURCES));

const HISTORICAL_IDS = new Set(['Q9215', 'Q366845', 'Q44328', 'Q44331']);
const STAGES = new Set(['infancy', 'childhood', 'adolescence', 'adulthood', 'elderhood']);
const ROLE_KINDS = new Set([
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
const PLACE_KINDS = new Set<Place['kind']>([
  'home',
  'school',
  'factory',
  'shop',
  'hospital',
  'church',
  'cafe',
  'government',
  'union',
  'barracks',
  'street',
  'other',
]);
const EDUCATION_STATUSES = new Set<Person['education']['status']>([
  'none',
  'home',
  'primary',
  'secondary',
  'apprenticeship',
  'higher',
]);
const RELATION_KINDS = new Set<Relation['kind']>([
  'kin',
  'guardian',
  'partner',
  'friend',
  'colleague',
  'employer',
  'rival',
  'acquaintance',
]);
const HISTORICAL_KINDS = new Set<HistoricalProcessKind>([
  'war_mobilization',
  'public_health_crisis',
  'social_movement',
  'political_repression',
  'economic_crisis',
  'cultural_movement',
  'other',
]);
const HISTORICAL_PHASES = new Set<HistoricalPhase>([
  'emerging',
  'mobilizing',
  'confrontation',
  'institutionalizing',
  'repression',
  'declining',
  'ended',
]);
const PARTICIPANT_ROLES = new Set<HistoricalParticipantRole>([
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
]);
const PROCESS_IDS = new Set<string>(Object.values(VIENNA_HISTORY_PROCESS_IDS));

const STAGE_BOUNDS: Record<string, { min: number; max: number }> = {
  infancy: { min: 0, max: 2 },
  childhood: { min: 3, max: 11 },
  adolescence: { min: 12, max: 17 },
  adulthood: { min: 18, max: 59 },
  elderhood: { min: 60, max: 130 },
};

const BUILTIN_TOKENS = new Set([
  'subject',
  'place',
  'residence',
  'school',
  'workplace',
  'age',
  'year',
]);
const EFFECT_TYPES = new Set([
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
  'project',
  'interaction',
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
const KNOWLEDGE_SOURCE_KINDS = new Set(['witnessed', 'told', 'document', 'inferred']);
const INFLUENCE_DIMENSIONS = new Set([
  'support',
  'opposition',
  'resources',
  'legitimacy',
  'escalation',
  'information',
]);

const knownPlaceIds = new Set([
  ...Object.keys(VIENNA_1912_SEED.places),
  'place-wien-bergasse-19',
  'place-wien-arbeiter-zeitung',
  'place-wien-cafe-central',
  'place-wien-burgtheater',
]);
const knownOrganizationIds = new Set([
  ...Object.keys(VIENNA_1912_SEED.organizations),
  'org-sdap',
  'org-wednesday-psychological-society',
  'org-die-fackel',
]);
const knownPersonIds = new Set([
  ...Object.keys(VIENNA_1912_SEED.persons),
  'person-sigmund-freud',
  'person-victor-adler',
  'person-karl-kraus',
  'person-arthur-schnitzler',
]);

function declaredRoleKeys(scene: SceneDefinition): Set<string> {
  return new Set(scene.roles.map((role) => role.key));
}

function hasOwn(record: object, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(record, key);
}

function checkCondition(scene: SceneDefinition, condition: SceneCondition): void {
  const label = `${scene.id} ${condition.kind}`;
  switch (condition.kind) {
    case 'age':
      expect(condition.min ?? 0, label).toBeGreaterThanOrEqual(0);
      if (condition.min !== undefined && condition.max !== undefined) {
        expect(condition.min, label).toBeLessThanOrEqual(condition.max);
      }
      break;
    case 'stage':
      expect(condition.in.length, label).toBeGreaterThan(0);
      for (const stage of condition.in) expect(STAGES.has(stage), `${label} ${stage}`).toBe(true);
      expect(condition.in, label).toContain(scene.stage);
      break;
    case 'cash':
      expect(['subject', undefined], label).toContain(condition.householdId);
      if (condition.min !== undefined && condition.max !== undefined) {
        expect(condition.min, label).toBeLessThanOrEqual(condition.max);
      }
      break;
    case 'householdSize':
      if (condition.min !== undefined) expect(condition.min, label).toBeGreaterThanOrEqual(0);
      if (condition.min !== undefined && condition.max !== undefined) {
        expect(condition.min, label).toBeLessThanOrEqual(condition.max);
      }
      break;
    case 'overcrowded':
      expect(typeof condition.value, label).toBe('boolean');
      break;
    case 'health':
      if (condition.min !== undefined) expect(condition.min, label).toBeGreaterThanOrEqual(0);
      if (condition.max !== undefined) expect(condition.max, label).toBeLessThanOrEqual(1);
      if (condition.min !== undefined && condition.max !== undefined) {
        expect(condition.min, label).toBeLessThanOrEqual(condition.max);
      }
      break;
    case 'education':
      expect(condition.in.length, label).toBeGreaterThan(0);
      for (const status of condition.in) {
        expect(EDUCATION_STATUSES.has(status), `${label} ${status}`).toBe(true);
      }
      break;
    case 'employment':
      expect(typeof condition.employed, label).toBe('boolean');
      break;
    case 'placeKind':
      expect(condition.in.length, label).toBeGreaterThan(0);
      for (const kind of condition.in) expect(PLACE_KINDS.has(kind), `${label} ${kind}`).toBe(true);
      break;
    case 'hasRole':
    case 'notHasRole':
      expect(condition.role.length, label).toBeGreaterThan(0);
      break;
    case 'development':
      expect(condition.id.length, label).toBeGreaterThan(0);
      break;
    case 'developmentType':
      expect(condition.type.length, label).toBeGreaterThan(0);
      break;
    case 'capability':
      expect(condition.capability.length, label).toBeGreaterThan(0);
      break;
    case 'historicalProcess': {
      if (condition.id !== undefined) expect(condition.id.length, label).toBeGreaterThan(0);
      if (condition.processKind !== undefined) {
        expect(
          HISTORICAL_KINDS.has(condition.processKind),
          `${label} ${condition.processKind}`,
        ).toBe(true);
      }
      if (condition.phases !== undefined) {
        expect(condition.phases.length, label).toBeGreaterThan(0);
        for (const phase of condition.phases) {
          expect(HISTORICAL_PHASES.has(phase), `${label} ${phase}`).toBe(true);
        }
      }
      if (condition.roles !== undefined) {
        expect(condition.roles.length, label).toBeGreaterThan(0);
        for (const role of condition.roles) {
          expect(PARTICIPANT_ROLES.has(role), `${label} ${role}`).toBe(true);
        }
      }
      if (condition.minInfluence !== undefined) {
        expect(condition.minInfluence, label).toBeGreaterThanOrEqual(0);
        expect(condition.minInfluence, label).toBeLessThanOrEqual(1);
      }
      if (condition.sameRegion !== undefined)
        expect(typeof condition.sameRegion, label).toBe('boolean');
      expect(
        condition.id !== undefined ||
          condition.processKind !== undefined ||
          condition.phases !== undefined ||
          condition.roles !== undefined,
        `${label}: condition must constrain something`,
      ).toBe(true);
      break;
    }
    case 'hasRelationWith':
      expect(knownPersonIds.has(condition.personId), `${label} ${condition.personId}`).toBe(true);
      if (condition.relationKind !== undefined) {
        expect(RELATION_KINDS.has(condition.relationKind), label).toBe(true);
      }
      if (condition.minTrust !== undefined) {
        expect(condition.minTrust, label).toBeGreaterThanOrEqual(0);
        expect(condition.minTrust, label).toBeLessThanOrEqual(1);
      }
      break;
    case 'hasRelation':
      expect(RELATION_KINDS.has(condition.relationKind), label).toBe(true);
      if (condition.minTrust !== undefined) {
        expect(condition.minTrust, label).toBeGreaterThanOrEqual(0);
        expect(condition.minTrust, label).toBeLessThanOrEqual(1);
      }
      break;
    case 'notHasRelation':
      expect(RELATION_KINDS.has(condition.relationKind), label).toBe(true);
      break;
    case 'worldYear':
      expect(condition.min ?? 1900, label).toBeGreaterThanOrEqual(1900);
      expect(condition.max ?? 2000, label).toBeLessThanOrEqual(2000);
      if (condition.min !== undefined && condition.max !== undefined) {
        expect(condition.min, label).toBeLessThanOrEqual(condition.max);
      }
      break;
    case 'pressure':
      expect(condition.key.length, label).toBeGreaterThan(0);
      expect(condition.min, label).toBeGreaterThanOrEqual(0);
      break;
    default:
      throw new Error(`unknown condition kind in ${scene.id}`);
  }
}

function checkEffect(scene: SceneDefinition, effect: EventEffect): void {
  const label = `${scene.id} ${effect.type}`;
  expect(EFFECT_TYPES.has(effect.type), `${label}: unknown effect type`).toBe(true);
  if ('reason' in effect) {
    expect(effect.reason.length > 0, `${label}: reason`).toBe(true);
  }

  const ref = effect as unknown as Record<string, unknown>;
  for (const key of ['personId', 'a', 'b']) {
    const value = ref[key];
    if (typeof value !== 'string') continue;
    expect(value.startsWith('$'), `${label}: hard-coded ${key}`).toBe(true);
    expect(declaredRoleKeys(scene).has(value.slice(1)), `${label}: unknown ${key} ${value}`).toBe(
      true,
    );
  }
  for (const key of ['householdId', 'organizationId', 'workplaceId', 'locationId']) {
    const value = ref[key];
    if (typeof value !== 'string' || !value.startsWith('$')) continue;
    expect(
      declaredRoleKeys(scene).has(value.slice(1)) ||
        ['subject', 'household', 'residence', 'workplace', 'subjectOrg', 'employerOrg'].includes(
          value.slice(1),
        ),
      `${label}: unknown ${key} ${value}`,
    ).toBe(true);
  }

  switch (effect.type) {
    case 'cash':
    case 'food':
      expect(Number.isFinite(effect.amount), label).toBe(true);
      expect(Math.abs(effect.amount), `${label}: amount bound`).toBeLessThanOrEqual(
        effect.type === 'cash' ? 25 : 4,
      );
      break;
    case 'health':
      expect(Math.abs(effect.amount), `${label}: health bound`).toBeLessThanOrEqual(0.15);
      break;
    case 'condition':
      expect(effect.condition.length, label).toBeGreaterThan(0);
      expect(typeof effect.add, label).toBe('boolean');
      break;
    case 'mood':
    case 'reputation':
    case 'skill':
      expect(Number.isFinite(effect.amount), label).toBe(true);
      break;
    case 'flag':
      expect(effect.flag.length, label).toBeGreaterThan(0);
      expect(typeof effect.add, label).toBe('boolean');
      break;
    case 'education':
      expect(EDUCATION_STATUSES.has(effect.status), label).toBe(true);
      if (effect.placeId !== undefined) expect(knownPlaceIds.has(effect.placeId), label).toBe(true);
      break;
    case 'employment':
      expect(knownOrganizationIds.has(effect.organizationId), label).toBe(true);
      expect(knownPlaceIds.has(effect.workplaceId), label).toBe(true);
      expect(Number.isFinite(effect.wage), label).toBe(true);
      expect(effect.occupation.length, label).toBeGreaterThan(0);
      break;
    case 'relation':
      expect(effect.kind.length, label).toBeGreaterThan(0);
      expect(RELATION_KINDS.has(effect.kind), `${label}: relation kind`).toBe(true);
      for (const dimension of ['trust', 'affection', 'obligation', 'fear', 'respect'] as const) {
        const value = effect[dimension];
        if (value === undefined) continue;
        expect(value, `${label}: ${dimension}`).toBeGreaterThanOrEqual(-1);
        expect(value, `${label}: ${dimension}`).toBeLessThanOrEqual(1);
      }
      break;
    case 'relation_end':
      expect(RELATION_KINDS.has(effect.kind), label).toBe(true);
      break;
    case 'role':
      expect(effect.role.length, label).toBeGreaterThan(0);
      expect(typeof effect.add, label).toBe('boolean');
      break;
    case 'organization_membership':
      expect(effect.organizationId.length, label).toBeGreaterThan(0);
      expect(typeof effect.add, label).toBe('boolean');
      break;
    case 'move':
      expect(effect.locationId.length, label).toBeGreaterThan(0);
      if (!effect.locationId.startsWith('$')) {
        expect(knownPlaceIds.has(effect.locationId), label).toBe(true);
      }
      break;
    case 'knowledge':
      expect(effect.proposition.length, label).toBeGreaterThan(0);
      expect(effect.confidence, label).toBeGreaterThanOrEqual(0);
      expect(effect.confidence, label).toBeLessThanOrEqual(1);
      expect(KNOWLEDGE_SOURCE_KINDS.has(effect.sourceKind), label).toBe(true);
      expect(['private', 'shared'], label).toContain(effect.visibility);
      break;
    case 'historical_participation':
      expect(PROCESS_IDS.has(effect.processId), `${label}: ${effect.processId}`).toBe(true);
      expect(PARTICIPANT_ROLES.has(effect.role), `${label}: ${effect.role}`).toBe(true);
      if (effect.influence !== undefined) {
        expect(effect.influence, label).toBeGreaterThanOrEqual(0);
        expect(effect.influence, label).toBeLessThanOrEqual(0.2);
      }
      break;
    case 'historical_influence':
      expect(PROCESS_IDS.has(effect.processId), `${label}: ${effect.processId}`).toBe(true);
      expect(INFLUENCE_DIMENSIONS.has(effect.dimension), `${label}: ${effect.dimension}`).toBe(
        true,
      );
      expect(Math.abs(effect.amount), `${label}: influence bound`).toBeLessThanOrEqual(0.2);
      break;
    case 'historical_process':
      expect(effect.process.id).toMatch(/^[a-zA-Z0-9:_-]{1,160}$/);
      expect(HISTORICAL_KINDS.has(effect.process.kind), label).toBe(true);
      expect(effect.process.title.length, label).toBeGreaterThan(0);
      expect(effect.process.description.length, label).toBeGreaterThanOrEqual(8);
      expect(effect.process.description.length, label).toBeLessThanOrEqual(500);
      if (effect.process.organizationId !== undefined) {
        expect(
          knownOrganizationIds.has(effect.process.organizationId),
          `${label}: ${effect.process.organizationId}`,
        ).toBe(true);
      }
      for (const sourceId of effect.process.sourceIds ?? []) {
        expect(sourceIds.has(sourceId), `${label}: ${sourceId}`).toBe(true);
      }
      break;
    case 'death':
      expect(effect.cause.length, label).toBeGreaterThan(0);
      break;
    case 'project':
    case 'interaction':
      break;
    case 'unemployment':
    case 'household':
    case 'residence':
    case 'birth':
    case 'estate':
      break;
    default:
      throw new Error(`unchecked effect in ${scene.id}: ${(effect as { type: string }).type}`);
  }
}

function checkTextTokens(scene: SceneDefinition, text: string): void {
  const declared = declaredRoleKeys(scene);
  for (const match of text.matchAll(/\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g)) {
    const token = match[1]!;
    expect(
      BUILTIN_TOKENS.has(token) || declared.has(token),
      `${scene.id}: unresolved {${token}}`,
    ).toBe(true);
  }
  expect(
    text.replace(/\{[a-zA-Z_][a-zA-Z0-9_]*\}/g, ''),
    `${scene.id}: malformed token`,
  ).not.toMatch(/[{}]/);
}

describe('Vienna history content: scene contracts', () => {
  it('has 12–16 unique scenes with complete authored metadata and coherent age windows', () => {
    expect(scenes.length).toBeGreaterThanOrEqual(12);
    expect(scenes.length).toBeLessThanOrEqual(16);
    expect(new Set(scenes.map((scene) => scene.id)).size).toBe(scenes.length);

    for (const scene of scenes) {
      const label = scene.id;
      expect(scene.id, label).toMatch(/^vienna-history-[a-z0-9-]+$/);
      expect(scene.version, label).toBe(1);
      expect(scene.packId, label).toBe(VIENNA_HISTORY_PACK_ID);
      expect(scene.title.length, label).toBeGreaterThan(3);
      expect(STAGES.has(scene.stage), label).toBe(true);
      expect(scene.ageWindow.min, label).toBeGreaterThanOrEqual(0);
      expect(scene.ageWindow.min, label).toBeLessThanOrEqual(scene.ageWindow.max);
      expect(scene.ageWindow.max, label).toBeLessThanOrEqual(130);
      expect(stageForAge(scene.ageWindow.min), label).toBe(scene.stage);
      expect(stageForAge(scene.ageWindow.max), label).toBe(scene.stage);
      expect(scene.roles.length, label).toBeGreaterThan(0);
      expect(new Set(scene.roles.map((role) => role.key)).size, label).toBe(scene.roles.length);
      expect(scene.subjectProvenance, label).toEqual(expect.arrayContaining(['birth', 'initial']));
      expect(
        scene.subjectProvenance,
        `${label}: historical people are not ordinary subjects`,
      ).not.toContain('historical_activation');
      expect(scene.tags.length, label).toBeGreaterThan(0);
      expect(scene.historicalBasis?.trim().length ?? 0, label).toBeGreaterThan(20);
      expect(scene.sourceIds?.length ?? 0, label).toBeGreaterThan(0);
      expect(scene.rate ?? 0, label).toBeGreaterThanOrEqual(0);
      expect(scene.rate ?? 0, label).toBeLessThanOrEqual(1);
      expect(scene.cooldownYears ?? 0, label).toBeGreaterThan(0);

      if (scene.placeId !== undefined) {
        expect(knownPlaceIds.has(scene.placeId), `${label}: ${scene.placeId}`).toBe(true);
      }

      for (const sourceId of scene.sourceIds ?? []) {
        expect(sourceIds.has(sourceId), `${label}: source ${sourceId}`).toBe(true);
      }

      const subject = scene.roles.find((role) => role.kind === 'subject');
      expect(subject, label).toBeDefined();
      expect(subject?.required, label).not.toBe(false);
      expect(subject?.minAge, label).toBe(scene.ageWindow.min);
      expect(subject?.maxAge, label).toBe(scene.ageWindow.max);

      for (const role of scene.roles) {
        expect(role.key, label).toMatch(/^[a-z][a-z0-9_]*$/);
        expect(ROLE_KINDS.has(role.kind), `${label}: role kind ${role.kind}`).toBe(true);
        if (role.minAge !== undefined)
          expect(role.minAge, `${label}: ${role.key}`).toBeGreaterThanOrEqual(0);
        if (role.minAge !== undefined && role.maxAge !== undefined) {
          expect(role.minAge, `${label}: ${role.key}`).toBeLessThanOrEqual(role.maxAge);
        }
        if (role.kind === 'historical') {
          expect(role.historicalId, `${label}: ${role.key} historicalId`).toBeDefined();
          expect(HISTORICAL_IDS.has(role.historicalId ?? ''), `${label}: ${role.key}`).toBe(true);
        }
      }

      expect(scene.conditions.length, label).toBeGreaterThan(0);
      const ageCondition = scene.conditions.find((condition) => condition.kind === 'age');
      expect(ageCondition, label).toBeDefined();
      if (ageCondition?.kind === 'age') {
        expect(ageCondition.min ?? 0, label).toBe(scene.ageWindow.min);
        expect(ageCondition.max ?? 0, label).toBe(scene.ageWindow.max);
      }
      expect(
        scene.conditions.some((condition) => condition.kind === 'stage'),
        label,
      ).toBe(true);

      expect(scene.outcomes?.length ?? 0, label).toBeGreaterThanOrEqual(2);
      expect(new Set((scene.outcomes ?? []).map((outcome) => outcome.id)).size, label).toBe(
        (scene.outcomes ?? []).length,
      );
      for (const outcome of scene.outcomes ?? []) {
        expect(outcome.weight, `${label}/${outcome.id}`).toBeGreaterThan(0);
        expect(outcome.immediateText.length, `${label}/${outcome.id}`).toBeGreaterThan(40);
        expect(outcome.effects.length, `${label}/${outcome.id}`).toBeGreaterThan(0);
        if (outcome.significance !== undefined) {
          expect(outcome.significance, `${label}/${outcome.id}`).toBeGreaterThanOrEqual(0);
          expect(outcome.significance, `${label}/${outcome.id}`).toBeLessThanOrEqual(1);
        }
      }
    }
  });

  it('uses only declared condition/effect grammar, role refs and resolvable tokens', () => {
    const stages = Object.keys(STAGE_BOUNDS);
    for (const scene of scenes) {
      const bounds = STAGE_BOUNDS[scene.stage]!;
      expect(bounds, scene.id).toBeDefined();
      expect(stages, scene.id).toContain(scene.stage);
      expect(scene.ageWindow.min, scene.id).toBeGreaterThanOrEqual(bounds.min);
      expect(scene.ageWindow.max, scene.id).toBeLessThanOrEqual(bounds.max);

      for (const condition of scene.conditions) checkCondition(scene, condition);

      for (const outcome of scene.outcomes ?? []) {
        checkTextTokens(scene, outcome.immediateText);
        for (const condition of outcome.conditions ?? []) checkCondition(scene, condition);
        for (const effect of outcome.effects) checkEffect(scene, effect);
        for (const followup of outcome.followupSceneIds ?? []) {
          expect(sceneById.has(followup), `${scene.id} -> ${followup}`).toBe(true);
          expect(followup, `${scene.id} self-followup`).not.toBe(scene.id);
        }
      }
    }
  });

  it('anchors every historical role to one of the four stable public identities', () => {
    const used = new Set<string>();
    for (const scene of scenes) {
      for (const role of scene.roles.filter((item) => item.kind === 'historical')) {
        expect(role.historicalId, `${scene.id}: ${role.key}`).toBeDefined();
        expect(
          HISTORICAL_IDS.has(role.historicalId ?? ''),
          `${scene.id}: ${role.historicalId}`,
        ).toBe(true);
        used.add(role.historicalId!);
      }
    }
    expect([...used].sort()).toEqual([...HISTORICAL_IDS].sort());
  });
});

describe('Vienna history content: required coverage', () => {
  it('covers social democracy, psychoanalysis, war, epidemic and culture', () => {
    const social = scenes.filter(
      (scene) =>
        scene.tags.includes('social_democracy') &&
        scene.conditions.some(
          (condition) =>
            condition.kind === 'historicalProcess' &&
            condition.id === VIENNA_HISTORY_PROCESS_IDS.socialDemocracy,
        ),
    );
    expect(social.length).toBeGreaterThanOrEqual(2);
    expect(
      social.some((scene) =>
        scene.roles.some((role) => role.kind === 'historical' && role.historicalId === 'Q366845'),
      ),
    ).toBe(true);

    const freud = scenes.filter((scene) =>
      scene.roles.some((role) => role.kind === 'historical' && role.historicalId === 'Q9215'),
    );
    expect(freud.length).toBeGreaterThanOrEqual(2);
    expect(
      freud.every((scene) => scene.placeId === 'place-wien-bergasse-19'),
      'every Freud contact is bound to Berggasse 19',
    ).toBe(true);

    const war = scenes.filter((scene) =>
      scene.conditions.some(
        (condition) =>
          condition.kind === 'historicalProcess' && condition.processKind === 'war_mobilization',
      ),
    );
    expect(war.length).toBeGreaterThanOrEqual(3);

    const epidemic = scenes.filter((scene) =>
      scene.conditions.some(
        (condition) =>
          condition.kind === 'historicalProcess' &&
          condition.processKind === 'public_health_crisis',
      ),
    );
    expect(epidemic.length).toBeGreaterThanOrEqual(3);

    const culture = scenes.filter((scene) => scene.tags.includes('culture'));
    expect(culture.length).toBeGreaterThanOrEqual(2);
    expect(
      culture.some((scene) =>
        scene.roles.some((role) => role.kind === 'historical' && role.historicalId === 'Q44328'),
      ),
    ).toBe(true);
    expect(
      culture.some((scene) =>
        scene.roles.some((role) => role.kind === 'historical' && role.historicalId === 'Q44331'),
      ),
    ).toBe(true);
  });

  it('keeps Freud contact rare, fee/education-gated, place-bound and follow-up-only', () => {
    const letter = sceneById.get('vienna-history-freud-letter');
    expect(letter).toBeDefined();
    if (!letter) return;

    expect(letter.placeId).toBe('place-wien-bergasse-19');
    expect(letter.rate ?? 1).toBeLessThanOrEqual(0.08);
    expect(letter.cooldownYears ?? 0).toBeGreaterThanOrEqual(10);
    expect(letter.oncePerPerson).toBe(true);
    expect(
      letter.conditions.some(
        (condition) =>
          condition.kind === 'historicalProcess' &&
          condition.id === VIENNA_HISTORY_PROCESS_IDS.psychoanalyticCircle,
      ),
    ).toBe(true);
    expect(letter.conditions.some((condition) => condition.kind === 'education')).toBe(true);
    expect(
      letter.conditions.some(
        (condition) => condition.kind === 'cash' && (condition.min ?? 0) >= 10,
      ),
    ).toBe(true);

    for (const outcome of letter.outcomes ?? []) {
      expect(
        outcome.effects.some((effect) => effect.type === 'relation' && effect.b === '$historical'),
        `${letter.id}/${outcome.id}: Freud relation`,
      ).toBe(true);
      expect(
        outcome.effects.some((effect) => effect.type === 'knowledge'),
        `${letter.id}/${outcome.id}: knowledge`,
      ).toBe(true);
      expect(outcome.followupSceneIds, `${letter.id}/${outcome.id}: follow-up`).toContain(
        'vienna-history-freud-consultation',
      );
    }

    const followup = sceneById.get('vienna-history-freud-consultation');
    expect(followup).toBeDefined();
    if (!followup) return;
    expect(followup.placeId).toBe('place-wien-bergasse-19');
    expect(
      followup.conditions.some(
        (condition) =>
          condition.kind === 'hasRelationWith' && condition.personId === 'person-sigmund-freud',
      ),
    ).toBe(true);
    expect(
      followup.roles.some((role) => role.kind === 'historical' && role.historicalId === 'Q9215'),
    ).toBe(true);
    expect(
      followup.outcomes?.every((outcome) =>
        outcome.effects.some((effect) => effect.type === 'knowledge'),
      ),
    ).toBe(true);
  });

  it('gates war and epidemic participation on historical process phases and real process ids', () => {
    const war = scenes.filter((scene) =>
      scene.conditions.some(
        (condition) =>
          condition.kind === 'historicalProcess' && condition.processKind === 'war_mobilization',
      ),
    );
    const epidemic = scenes.filter((scene) =>
      scene.conditions.some(
        (condition) =>
          condition.kind === 'historicalProcess' &&
          condition.processKind === 'public_health_crisis',
      ),
    );

    expect(war.length).toBeGreaterThanOrEqual(3);
    expect(epidemic.length).toBeGreaterThanOrEqual(3);

    for (const scene of war) {
      const gate = scene.conditions.find(
        (condition) =>
          condition.kind === 'historicalProcess' && condition.processKind === 'war_mobilization',
      );
      expect(gate, scene.id).toBeDefined();
      if (gate?.kind === 'historicalProcess') {
        expect(gate.phases?.length ?? 0, scene.id).toBeGreaterThan(0);
        expect(gate.phases, scene.id).toContain('mobilizing');
      }
      expect(
        (scene.outcomes ?? []).some((outcome) =>
          outcome.effects.some(
            (effect) =>
              effect.type === 'historical_participation' &&
              effect.processId === VIENNA_HISTORY_PROCESS_IDS.warMobilization,
          ),
        ),
        `${scene.id}: war participation`,
      ).toBe(true);
    }

    for (const scene of epidemic) {
      const gate = scene.conditions.find(
        (condition) =>
          condition.kind === 'historicalProcess' &&
          condition.processKind === 'public_health_crisis',
      );
      expect(gate, scene.id).toBeDefined();
      if (gate?.kind === 'historicalProcess') {
        expect(gate.phases?.length ?? 0, scene.id).toBeGreaterThan(0);
        expect(gate.phases, scene.id).toContain('mobilizing');
      }
      expect(
        (scene.outcomes ?? []).some((outcome) =>
          outcome.effects.some(
            (effect) =>
              effect.type === 'historical_participation' &&
              effect.processId === VIENNA_HISTORY_PROCESS_IDS.publicHealthCrisis,
          ),
        ),
        `${scene.id}: epidemic participation`,
      ).toBe(true);
    }
  });

  it('creates the bottom-up printers fund only from the active union and prior process', () => {
    const scene = sceneById.get('vienna-history-printers-mutual-aid');
    expect(scene).toBeDefined();
    if (!scene) return;

    expect(
      scene.roles.some((role) => role.kind === 'organization' && role.organizationKind === 'union'),
    ).toBe(true);
    expect(
      scene.conditions.some(
        (condition) => condition.kind === 'hasRole' && condition.role === 'union_member',
      ),
    ).toBe(true);
    expect(
      scene.conditions.some(
        (condition) =>
          condition.kind === 'historicalProcess' &&
          condition.id === VIENNA_HISTORY_PROCESS_IDS.socialDemocracy,
      ),
    ).toBe(true);

    const creation = (scene.outcomes ?? [])
      .flatMap((outcome) => outcome.effects)
      .find((effect) => effect.type === 'historical_process');
    expect(creation).toBeDefined();
    if (creation?.type !== 'historical_process') return;
    expect(creation.process.id).toBe(VIENNA_HISTORY_PROCESS_IDS.printersMutualAid);
    expect(creation.process.kind).toBe('social_movement');
    expect(creation.process.organizationId).toBe('org-printers-union');
    expect(creation.process.regionId).toBe('region-lower-austria');
    expect(creation.process.sourceIds?.length ?? 0).toBeGreaterThan(0);

    const found = (scene.outcomes ?? []).find((outcome) =>
      outcome.effects.some(
        (effect) =>
          effect.type === 'historical_participation' &&
          effect.processId === VIENNA_HISTORY_PROCESS_IDS.printersMutualAid,
      ),
    );
    expect(found).toBeDefined();
    if (found) {
      const processIndex = found.effects.findIndex(
        (effect) => effect.type === 'historical_process',
      );
      const participationIndex = found.effects.findIndex(
        (effect) =>
          effect.type === 'historical_participation' &&
          effect.processId === VIENNA_HISTORY_PROCESS_IDS.printersMutualAid,
      );
      expect(
        processIndex,
        `${scene.id}: process must exist before participation`,
      ).toBeGreaterThanOrEqual(0);
      expect(participationIndex, `${scene.id}: participation`).toBeGreaterThan(processIndex);
    }
  });
});

describe('Vienna history content: source register', () => {
  it('keeps every source record internally consistent and every scene source resolvable', () => {
    for (const [key, source] of Object.entries(VIENNA_HISTORY_SOURCES)) {
      expect(source.id, key).toBe(key);
      expect(source.title.trim().length, key).toBeGreaterThan(3);
      expect(source.publisher.trim().length, key).toBeGreaterThan(2);
      expect(source.url, key).toMatch(/^https?:\/\//);
      expect(source.note.trim().length, key).toBeGreaterThan(20);
    }

    for (const scene of scenes) {
      for (const sourceId of scene.sourceIds ?? []) {
        expect(hasOwn(VIENNA_HISTORY_SOURCES, sourceId), `${scene.id}: ${sourceId}`).toBe(true);
      }
      for (const outcome of scene.outcomes ?? []) {
        for (const effect of outcome.effects) {
          if (effect.type !== 'historical_process') continue;
          for (const sourceId of effect.process.sourceIds ?? []) {
            expect(hasOwn(VIENNA_HISTORY_SOURCES, sourceId), `${scene.id}: ${sourceId}`).toBe(true);
          }
        }
      }
    }

    for (const sourceId of [
      'source-wien-geschichte-freud',
      'source-wien-geschichte-victor-adler',
      'source-wien-geschichte-karl-kraus',
      'source-wien-geschichte-arthur-schnitzler',
      'source-wien-geschichte-sdap',
      'source-wien-geschichte-spanische-grippe',
      'source-habsburger-universal-conscription',
      'source-wien-geschichte-gewerkschaft',
    ]) {
      expect(hasOwn(VIENNA_HISTORY_SOURCES, sourceId), `missing source ${sourceId}`).toBe(true);
    }
  });
});
