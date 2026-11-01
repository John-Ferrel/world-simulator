import { describe, expect, it } from 'vitest';
import {
  ageAt,
  assertWorldV4,
  stageForAge,
  type EventEffect,
  type Person,
  type Place,
  type Relation,
  type SceneCondition,
  type SceneDefinition,
} from '../packages/v4/domain.js';
import {
  VIENNA_1912_CAST,
  VIENNA_1912_PACK_ID,
  VIENNA_1912_SCENES,
  VIENNA_1912_SEED,
  VIENNA_1912_SOURCES,
} from '../packages/v4/content/vienna-1912.js';

const seed = VIENNA_1912_SEED;
const scenes = VIENNA_1912_SCENES;

const personIds = new Set(Object.keys(seed.persons));
const householdIds = new Set(Object.keys(seed.households));
const placeIds = new Set(Object.keys(seed.places));
const organizationIds = new Set(Object.keys(seed.organizations));
const positionIds = new Set(Object.keys(seed.positions));
const relationIds = new Set(Object.keys(seed.relations));
const knowledgeIds = new Set(Object.keys(seed.knowledge));
const sceneIds = new Set(scenes.map((scene) => scene.id));
const sceneById = new Map(scenes.map((scene) => [scene.id, scene]));
const sourceIds = new Set(Object.keys(VIENNA_1912_SOURCES));

const outcomeEntries = scenes.flatMap((scene) =>
  (scene.outcomes ?? []).map((outcome) => ({ scene, outcome })),
);

const seedRoleNames = new Set<string>();
for (const person of Object.values(seed.persons)) {
  for (const role of person.roles) seedRoleNames.add(role);
}
for (const { outcome } of outcomeEntries) {
  for (const effect of outcome.effects) {
    if (effect.type === 'role' && effect.add) seedRoleNames.add(effect.role);
  }
}

const validStages = new Set(['infancy', 'childhood', 'adolescence', 'adulthood', 'elderhood']);
const validEducationStatuses = new Set<Person['education']['status']>([
  'none',
  'home',
  'primary',
  'secondary',
  'apprenticeship',
  'higher',
]);
const validRelationKinds = new Set<Relation['kind']>([
  'kin',
  'guardian',
  'partner',
  'friend',
  'colleague',
  'employer',
  'rival',
  'acquaintance',
]);
const validPlaceKinds = new Set<Place['kind']>([
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

function conditionLabel(scene: SceneDefinition, condition: SceneCondition): string {
  return `${scene.id} ${condition.kind}`;
}

function checkCondition(condition: SceneCondition, scene: SceneDefinition): void {
  const label = conditionLabel(scene, condition);
  switch (condition.kind) {
    case 'age':
      expect(condition.min ?? 0, label).toBeGreaterThanOrEqual(0);
      if (condition.min !== undefined && condition.max !== undefined) {
        expect(condition.min, label).toBeLessThanOrEqual(condition.max);
      }
      break;
    case 'stage':
      expect(condition.in.length, label).toBeGreaterThan(0);
      for (const stage of condition.in) {
        expect(validStages.has(stage), `${label} ${stage}`).toBe(true);
      }
      break;
    case 'cash':
      if (condition.householdId !== undefined && condition.householdId !== 'subject') {
        expect(householdIds.has(condition.householdId), label).toBe(true);
      }
      if (condition.min !== undefined && condition.max !== undefined) {
        expect(condition.min, label).toBeLessThanOrEqual(condition.max);
      }
      break;
    case 'health':
      if (condition.min !== undefined) expect(condition.min, label).toBeGreaterThanOrEqual(0);
      if (condition.max !== undefined) expect(condition.max, label).toBeLessThanOrEqual(1);
      break;
    case 'education':
      expect(condition.in.length, label).toBeGreaterThan(0);
      for (const status of condition.in) {
        expect(validEducationStatuses.has(status), `${label} ${status}`).toBe(true);
      }
      break;
    case 'employment':
      expect(typeof condition.employed, label).toBe('boolean');
      break;
    case 'placeKind':
      expect(condition.in.length, label).toBeGreaterThan(0);
      for (const kind of condition.in) {
        expect(validPlaceKinds.has(kind), `${label} ${kind}`).toBe(true);
      }
      break;
    case 'hasRole':
      expect(seedRoleNames.has(condition.role), `${label} ${condition.role}`).toBe(true);
      break;
    case 'hasRelation':
      expect(validRelationKinds.has(condition.relationKind), label).toBe(true);
      if (condition.minTrust !== undefined) {
        expect(condition.minTrust, label).toBeGreaterThanOrEqual(0);
        expect(condition.minTrust, label).toBeLessThanOrEqual(1);
      }
      break;
    case 'worldYear':
      expect(condition.min ?? 1900, label).toBeGreaterThanOrEqual(1900);
      expect(condition.max ?? 1919, label).toBeLessThanOrEqual(1919);
      if (condition.min !== undefined && condition.max !== undefined) {
        expect(condition.min, label).toBeLessThanOrEqual(condition.max);
      }
      break;
    case 'pressure':
      expect(Object.hasOwn(seed.pressures, condition.key), `${label} ${condition.key}`).toBe(true);
      expect(condition.min, label).toBeGreaterThanOrEqual(0);
      break;
    default:
      throw new Error(`unknown condition kind in ${scene.id}`);
  }
}

function checkEffect(effect: EventEffect, scene: SceneDefinition): void {
  const label = `${scene.id} ${effect.type}`;
  switch (effect.type) {
    case 'cash':
    case 'food':
      expect(householdIds.has(effect.householdId), label).toBe(true);
      expect(Number.isFinite(effect.amount), label).toBe(true);
      expect(effect.reason.length, label).toBeGreaterThan(0);
      break;
    case 'health':
      expect(personIds.has(effect.personId), label).toBe(true);
      expect(Number.isFinite(effect.amount), label).toBe(true);
      expect(effect.reason.length, label).toBeGreaterThan(0);
      break;
    case 'condition':
      expect(personIds.has(effect.personId), label).toBe(true);
      expect(effect.condition.length, label).toBeGreaterThan(0);
      expect(typeof effect.add, label).toBe('boolean');
      expect(effect.reason.length, label).toBeGreaterThan(0);
      break;
    case 'education':
      expect(personIds.has(effect.personId), label).toBe(true);
      expect(validEducationStatuses.has(effect.status), label).toBe(true);
      if (effect.placeId !== undefined) {
        expect(placeIds.has(effect.placeId), label).toBe(true);
      }
      expect(effect.reason.length, label).toBeGreaterThan(0);
      break;
    case 'employment':
      expect(personIds.has(effect.personId), label).toBe(true);
      expect(organizationIds.has(effect.organizationId), label).toBe(true);
      expect(placeIds.has(effect.workplaceId), label).toBe(true);
      expect(effect.wage, label).toBeGreaterThanOrEqual(0);
      expect(effect.occupation.length, label).toBeGreaterThan(0);
      expect(effect.reason.length, label).toBeGreaterThan(0);
      break;
    case 'unemployment':
      expect(personIds.has(effect.personId), label).toBe(true);
      expect(effect.reason.length, label).toBeGreaterThan(0);
      break;
    case 'relation':
      expect(personIds.has(effect.a), label).toBe(true);
      expect(personIds.has(effect.b), label).toBe(true);
      expect(validRelationKinds.has(effect.kind), label).toBe(true);
      for (const dimension of ['trust', 'affection', 'obligation', 'fear', 'respect'] as const) {
        const value = effect[dimension];
        if (value !== undefined) {
          expect(value, `${label} ${dimension}`).toBeGreaterThanOrEqual(-1);
          expect(value, `${label} ${dimension}`).toBeLessThanOrEqual(1);
        }
      }
      expect(effect.reason.length, label).toBeGreaterThan(0);
      break;
    case 'role':
      expect(personIds.has(effect.personId), label).toBe(true);
      expect(effect.role.length, label).toBeGreaterThan(0);
      expect(typeof effect.add, label).toBe('boolean');
      expect(effect.reason.length, label).toBeGreaterThan(0);
      break;
    case 'move':
      expect(personIds.has(effect.personId), label).toBe(true);
      expect(placeIds.has(effect.locationId), label).toBe(true);
      expect(effect.reason.length, label).toBeGreaterThan(0);
      break;
    case 'death':
      expect(personIds.has(effect.personId), label).toBe(true);
      expect(effect.cause.length, label).toBeGreaterThan(0);
      expect(effect.reason.length, label).toBeGreaterThan(0);
      break;
    case 'project':
      expect(effect.project.id.length, label).toBeGreaterThan(0);
      break;
    case 'interaction':
      expect(effect.interaction.id.length, label).toBeGreaterThan(0);
      break;
    default:
      throw new Error(`unknown effect in ${scene.id}`);
  }
}

function followups(sceneId: string): Set<string> {
  const scene = sceneById.get(sceneId);
  if (!scene) throw new Error(`missing chain scene ${sceneId}`);
  return new Set((scene.outcomes ?? []).flatMap((outcome) => outcome.followupSceneIds ?? []));
}

describe('Vienna 1912 content: seed world', () => {
  it('passes assertWorldV4 and exposes the required stable cast and institutions', () => {
    expect(() => assertWorldV4(seed)).not.toThrow();

    const anna = seed.persons[VIENNA_1912_CAST.persons.anna];
    const josef = seed.persons[VIENNA_1912_CAST.persons.josef];
    const katharina = seed.persons[VIENNA_1912_CAST.persons.katharina];
    expect(anna).toBeDefined();
    expect(josef).toBeDefined();
    expect(katharina).toBeDefined();
    if (!anna || !josef || !katharina) return;

    expect(anna.born.year).toBe(1900);
    expect(anna.parentIds).toEqual(
      expect.arrayContaining([VIENNA_1912_CAST.persons.josef, VIENNA_1912_CAST.persons.katharina]),
    );
    expect(anna.guardianIds).toEqual(expect.arrayContaining([josef.id, katharina.id]));
    expect(anna.householdId).toBe(VIENNA_1912_CAST.households.bauer);
    expect(josef.householdId).toBe(VIENNA_1912_CAST.households.bauer);
    expect(katharina.householdId).toBe(VIENNA_1912_CAST.households.bauer);
    expect(josef.employment?.occupation).toContain('Buchdrucker');
    expect(josef.employment?.organizationId).toBe(VIENNA_1912_CAST.orgs.winterPrint);
    expect(josef.employment?.workplaceId).toBe(VIENNA_1912_CAST.places.printshop);

    const alive = Object.values(seed.persons).filter((person) => !person.died);
    expect(alive.length).toBeGreaterThanOrEqual(20);
    expect(Object.keys(seed.households).length).toBeGreaterThanOrEqual(6);
    expect(Object.keys(seed.places).length).toBeGreaterThanOrEqual(3);

    const placeKinds = new Set(Object.values(seed.places).map((place) => place.kind));
    expect(placeKinds.has('home')).toBe(true);
    expect(placeKinds.has('factory')).toBe(true);
    expect(placeKinds.has('school')).toBe(true);

    const organizations = Object.values(seed.organizations);
    expect(organizations.some((org) => org.kind === 'union')).toBe(true);
    expect(organizations.some((org) => org.kind === 'factory')).toBe(true);
    expect(seed.organizations[VIENNA_1912_CAST.orgs.printersUnion]?.kind).toBe('union');
    expect(seed.organizations[VIENNA_1912_CAST.orgs.winterPrint]?.kind).toBe('factory');
  });

  it('has globally unique IDs and valid cross-references', () => {
    const allIds = [
      ...personIds,
      ...householdIds,
      ...placeIds,
      ...organizationIds,
      ...positionIds,
      ...relationIds,
      ...knowledgeIds,
    ];
    expect(new Set(allIds).size).toBe(allIds.length);

    for (const person of Object.values(seed.persons)) {
      expect(householdIds.has(person.householdId), person.id).toBe(true);
      expect(placeIds.has(person.locationId), person.id).toBe(true);
      for (const parentId of person.parentIds)
        expect(personIds.has(parentId), person.id).toBe(true);
      for (const guardianId of person.guardianIds) {
        expect(personIds.has(guardianId), person.id).toBe(true);
      }
      for (const relationId of person.relationshipIds) {
        expect(relationIds.has(relationId), `${person.id} ${relationId}`).toBe(true);
      }
      for (const knowledgeId of person.knowledgeIds) {
        expect(knowledgeIds.has(knowledgeId), `${person.id} ${knowledgeId}`).toBe(true);
      }
      if (person.education.placeId !== undefined) {
        expect(placeIds.has(person.education.placeId), `${person.id} education place`).toBe(true);
      }
      if (person.employment) {
        expect(organizationIds.has(person.employment.organizationId), person.id).toBe(true);
        expect(placeIds.has(person.employment.workplaceId), person.id).toBe(true);
      }
      if (person.died) expect(person.health.vitality, person.id).toBe(0);
    }

    for (const household of Object.values(seed.households)) {
      expect(placeIds.has(household.residenceId), household.id).toBe(true);
      for (const memberId of household.memberIds) {
        expect(personIds.has(memberId), `${household.id} ${memberId}`).toBe(true);
      }
      for (const guardianId of household.guardianIds) {
        expect(personIds.has(guardianId), `${household.id} ${guardianId}`).toBe(true);
      }
      expect(household.cash).toBeGreaterThanOrEqual(0);
      expect(household.food).toBeGreaterThanOrEqual(0);
    }

    for (const place of Object.values(seed.places)) {
      expect(placeIds.has(place.settlementId), `${place.id} settlement`).toBe(true);
      if (place.ownershipOrganizationId !== undefined) {
        expect(organizationIds.has(place.ownershipOrganizationId), place.id).toBe(true);
      }
    }

    for (const org of Object.values(seed.organizations)) {
      expect(placeIds.has(org.placeId), org.id).toBe(true);
      for (const memberId of org.memberIds) expect(personIds.has(memberId), org.id).toBe(true);
      for (const positionId of org.positions)
        expect(positionIds.has(positionId), org.id).toBe(true);
      expect(org.treasury).toBeGreaterThanOrEqual(0);
    }

    for (const position of Object.values(seed.positions)) {
      expect(organizationIds.has(position.organizationId), position.id).toBe(true);
      if (position.holderId !== undefined)
        expect(personIds.has(position.holderId), position.id).toBe(true);
    }

    for (const relation of Object.values(seed.relations)) {
      expect(personIds.has(relation.a), relation.id).toBe(true);
      expect(personIds.has(relation.b), relation.id).toBe(true);
      expect(validRelationKinds.has(relation.kind), relation.id).toBe(true);
    }

    for (const item of Object.values(seed.knowledge)) {
      expect(personIds.has(item.holderId), item.id).toBe(true);
    }
  });

  it('respects age gates for work, unions and guardianship in the fixture', () => {
    const union = seed.organizations[VIENNA_1912_CAST.orgs.printersUnion];
    expect(union).toBeDefined();
    if (!union) return;

    for (const memberId of union.memberIds) {
      expect(ageAt(seed.persons[memberId], seed.date), memberId).toBeGreaterThanOrEqual(18);
    }
    for (const memberId of seed.organizations[VIENNA_1912_CAST.orgs.winterPrint].memberIds) {
      expect(ageAt(seed.persons[memberId], seed.date), memberId).toBeGreaterThanOrEqual(14);
    }

    for (const person of Object.values(seed.persons)) {
      const age = ageAt(person, seed.date);
      if (person.died) continue;
      if (age < 14) expect(person.employment, person.id).toBeUndefined();
      if (person.roles.includes('union_member')) expect(age, person.id).toBeGreaterThanOrEqual(18);
      if (person.roles.includes('guardian')) expect(age, person.id).toBeGreaterThanOrEqual(18);
    }

    const marie = seed.persons[VIENNA_1912_CAST.persons.marie];
    expect(ageAt(marie, seed.date)).toBeLessThan(14);
    expect(marie.employment).toBeUndefined();
    expect(marie.education.status).toBe('primary');
    expect(marie.guardianIds).toContain(VIENNA_1912_CAST.persons.theresia);

    const anna = seed.persons[VIENNA_1912_CAST.persons.anna];
    expect(ageAt(anna, seed.date)).toBe(12);
    expect(anna.employment).toBeUndefined();

    for (const child of Object.values(seed.persons)) {
      if (child.born.year >= seed.date.year) continue;
      for (const parentId of child.parentIds) {
        const parent = seed.persons[parentId];
        expect(parent, `${child.id} parent`).toBeDefined();
        if (!parent) continue;
        expect(parent.born.year, `${child.id} parent age`).toBeLessThanOrEqual(
          child.born.year - 16,
        );
      }
    }
  });
});

describe('Vienna 1912 content: scene definitions', () => {
  it('defines at least twelve unique scenes with coherent stage windows', () => {
    expect(scenes.length).toBeGreaterThanOrEqual(12);
    expect(sceneIds.size).toBe(scenes.length);

    for (const scene of scenes) {
      expect(scene.id).toMatch(/^vienna-[a-z0-9-]+$/);
      expect(scene.version).toBeGreaterThanOrEqual(1);
      expect(scene.packId).toBe(VIENNA_1912_PACK_ID);
      expect(scene.title.length).toBeGreaterThan(3);
      expect(scene.ageWindow.min).toBeGreaterThanOrEqual(0);
      expect(scene.ageWindow.min).toBeLessThanOrEqual(scene.ageWindow.max);
      expect(stageForAge(scene.ageWindow.min), scene.id).toBe(scene.stage);
      expect(stageForAge(scene.ageWindow.max), scene.id).toBe(scene.stage);
      expect(scene.tags.length, scene.id).toBeGreaterThan(0);
      expect(scene.historicalBasis?.length ?? 0, scene.id).toBeGreaterThan(20);
      expect(scene.sourceIds?.length ?? 0, scene.id).toBeGreaterThan(0);
      for (const sourceId of scene.sourceIds ?? []) {
        expect(sourceIds.has(sourceId), `${scene.id} ${sourceId}`).toBe(true);
      }

      const subject = scene.roles.find((role) => role.kind === 'subject');
      expect(subject, scene.id).toBeDefined();
      expect(subject?.required, scene.id).not.toBe(false);

      const roleKeys = new Set<string>();
      for (const role of scene.roles) {
        expect(role.key, scene.id).toMatch(/^[a-z][a-z0-9_]*$/);
        expect(roleKeys.has(role.key), `${scene.id} duplicate role ${role.key}`).toBe(false);
        roleKeys.add(role.key);
        expect(validStages.has(scene.stage), scene.id).toBe(true);
        if (role.minAge !== undefined)
          expect(role.minAge, `${scene.id} ${role.key}`).toBeGreaterThanOrEqual(0);
        if (role.minAge !== undefined && role.maxAge !== undefined) {
          expect(role.minAge, `${scene.id} ${role.key}`).toBeLessThanOrEqual(role.maxAge);
        }
        if (role.kind === 'union_member') {
          expect(role.minAge ?? 0, `${scene.id} ${role.key}`).toBeGreaterThanOrEqual(18);
        }
        if (['parent', 'teacher', 'employer', 'official'].includes(role.kind)) {
          expect(role.minAge ?? 0, `${scene.id} ${role.key}`).toBeGreaterThanOrEqual(18);
        }
        if (role.organizationKind !== undefined) {
          expect(
            [
              'household_firm',
              'factory',
              'school',
              'union',
              'party',
              'army',
              'state',
              'church',
              'other',
            ],
            `${scene.id} ${role.key}`,
          ).toContain(role.organizationKind);
          expect(
            Object.values(seed.organizations).some((org) => org.kind === role.organizationKind),
            `${scene.id} ${role.key} organization kind exists`,
          ).toBe(true);
        }
        if (role.occupation !== undefined) {
          expect(
            Object.values(seed.persons).some(
              (person) =>
                person.employment?.occupation.toLowerCase() === role.occupation?.toLowerCase(),
            ),
            `${scene.id} ${role.key} occupation exists`,
          ).toBe(true);
        }
        if (role.samePlaceKind !== undefined) {
          expect(validPlaceKinds.has(role.samePlaceKind), `${scene.id} ${role.key}`).toBe(true);
        }
      }

      const conditionKinds = new Set(scene.conditions.map((condition) => condition.kind));
      expect(conditionKinds.has('age'), scene.id).toBe(true);
      expect(conditionKinds.has('stage'), scene.id).toBe(true);
      expect(conditionKinds.has('placeKind'), scene.id).toBe(true);
      expect(conditionKinds.has('worldYear'), scene.id).toBe(true);
      expect(
        ['cash', 'education', 'employment', 'hasRole', 'hasRelation', 'pressure'].some((kind) =>
          conditionKinds.has(kind as SceneCondition['kind']),
        ),
        scene.id,
      ).toBe(true);

      for (const condition of scene.conditions) checkCondition(condition, scene);

      const ageCondition = scene.conditions.find((condition) => condition.kind === 'age');
      expect(ageCondition, scene.id).toBeDefined();
      if (ageCondition?.kind === 'age') {
        expect(ageCondition.min ?? 0, scene.id).toBe(scene.ageWindow.min);
        expect(ageCondition.max ?? 0, scene.id).toBe(scene.ageWindow.max);
      }

      const stageCondition = scene.conditions.find((condition) => condition.kind === 'stage');
      expect(stageCondition, scene.id).toBeDefined();
      if (stageCondition?.kind === 'stage') {
        expect(stageCondition.in, scene.id).toContain(scene.stage);
      }

      const yearCondition = scene.conditions.find((condition) => condition.kind === 'worldYear');
      expect(yearCondition, scene.id).toBeDefined();
      if (yearCondition?.kind === 'worldYear') {
        expect(yearCondition.min ?? 1900, scene.id).toBeGreaterThanOrEqual(1900);
        expect(yearCondition.max ?? 1919, scene.id).toBeLessThanOrEqual(1919);
      }

      expect(scene.outcomes?.length ?? 0, scene.id).toBeGreaterThanOrEqual(2);
      expect(scene.outcomes?.length ?? 0, scene.id).toBeLessThanOrEqual(3);
    }
  });

  it('keeps every condition and outcome effect inside the declared seed world', () => {
    const outcomeIds = new Set<string>();
    for (const scene of scenes) {
      for (const outcome of scene.outcomes ?? []) {
        expect(outcome.id.length, scene.id).toBeGreaterThan(0);
        expect(outcome.weight, `${scene.id} ${outcome.id}`).toBeGreaterThan(0);
        expect(outcome.immediateText.length, `${scene.id} ${outcome.id}`).toBeGreaterThan(45);
        expect(outcome.effects.length, `${scene.id} ${outcome.id}`).toBeGreaterThan(0);
        expect(outcomeIds.has(`${scene.id}:${outcome.id}`), `${scene.id} duplicate outcome`).toBe(
          false,
        );
        outcomeIds.add(`${scene.id}:${outcome.id}`);

        if (outcome.significance !== undefined) {
          expect(outcome.significance, `${scene.id} ${outcome.id}`).toBeGreaterThanOrEqual(0);
          expect(outcome.significance, `${scene.id} ${outcome.id}`).toBeLessThanOrEqual(1);
        }

        for (const condition of outcome.conditions ?? []) checkCondition(condition, scene);
        for (const effect of outcome.effects) checkEffect(effect, scene);

        for (const followupSceneId of outcome.followupSceneIds ?? []) {
          expect(sceneIds.has(followupSceneId), `${scene.id} -> ${followupSceneId}`).toBe(true);
          expect(followupSceneId, `${scene.id} self followup`).not.toBe(scene.id);
        }
      }
    }
  });

  it('links the required causal chains across scenes', () => {
    expect(followups('vienna-1912-birth-midwife')).toContain('vienna-1912-infant-feeding');
    expect(followups('vienna-1912-printing-injury')).toContain('vienna-1912-employer-response');
    expect(followups('vienna-1912-printing-injury')).toContain('vienna-1912-rent-medicine');
    expect(followups('vienna-1912-printing-injury')).toContain('vienna-1912-anna-home-piecework');
    expect(followups('vienna-1912-employer-response')).toContain('vienna-1912-union-claim');
    expect(followups('vienna-1912-union-claim')).toContain('vienna-1912-school-continuation');
    expect(followups('vienna-1912-union-claim')).toContain('vienna-1912-anna-home-piecework');
    expect(followups('vienna-1912-orphan-guardianship')).toContain('vienna-1912-school-place');
    expect(followups('vienna-1912-school-continuation')).toContain('vienna-1916-union-minor');
    expect(followups('vienna-1912-anna-home-piecework')).toContain(
      'vienna-1912-school-continuation',
    );
    expect(followups('vienna-1914-printshop-apprentice')).toContain('vienna-1916-union-minor');
    expect(followups('vienna-1914-mobilization')).toContain('vienna-1916-family-separation');
    expect(followups('vienna-1914-mobilization')).toContain('vienna-1916-food-queue');
    expect(followups('vienna-1916-food-queue')).toContain('vienna-1916-family-separation');
    expect(followups('vienna-1916-family-separation')).toContain('vienna-1918-influenza');
    expect(followups('vienna-1918-influenza')).toContain('vienna-1918-orphan-risk');
    expect(followups('vienna-1918-influenza')).toContain('vienna-1918-armistice-return');
    expect(followups('vienna-1918-orphan-risk')).toContain('vienna-1918-armistice-return');
  });
});

describe('Vienna 1912 content: age, text and coverage', () => {
  it('enforces child-labour, factory, union and infant age gates in scene roles', () => {
    for (const scene of scenes) {
      const subject = scene.roles.find((role) => role.kind === 'subject');
      expect(subject, scene.id).toBeDefined();
      if (!subject) continue;

      if (scene.tags.includes('birth')) {
        expect(subject.maxAge, scene.id).toBe(0);
      }
      if (scene.tags.includes('infant')) {
        expect(scene.stage, scene.id).toBe('infancy');
        expect(subject.maxAge, scene.id).toBeLessThanOrEqual(2);
      }
      if (scene.tags.includes('home_piecework')) {
        expect(subject.minAge ?? 0, scene.id).toBeGreaterThanOrEqual(12);
        expect(subject.maxAge ?? 0, scene.id).toBeLessThanOrEqual(13);
      }
      if (scene.tags.includes('child_labour') && !scene.tags.includes('home_piecework')) {
        expect(subject.minAge ?? 0, scene.id).toBeGreaterThanOrEqual(14);
      }
      if (scene.tags.includes('factory_work') || scene.tags.includes('apprenticeship')) {
        expect(subject.minAge ?? 0, scene.id).toBeGreaterThanOrEqual(14);
      }
      if (scene.tags.includes('union')) {
        for (const role of scene.roles.filter((item) => item.kind === 'union_member')) {
          expect(role.minAge ?? 0, `${scene.id} ${role.key}`).toBeGreaterThanOrEqual(18);
        }
      }
    }

    const infantScenes = scenes.filter((scene) => scene.stage === 'infancy');
    expect(infantScenes.length).toBeGreaterThanOrEqual(3);
    for (const scene of infantScenes) {
      const text = [
        scene.title,
        scene.historicalBasis ?? '',
        ...(scene.outcomes ?? []).map((outcome) => outcome.immediateText),
      ].join('\n');
      for (const forbidden of ['上学', '学校', '工会', '工厂', '加入组织', '长期影响', '婚姻']) {
        expect(text, `${scene.id} contains ${forbidden}`).not.toContain(forbidden);
      }
    }
  });

  it('uses concrete immediate prose without internal-state or future-template phrases', () => {
    const banned = [
      'identity_shift',
      'agenda',
      '职业承担更多职责',
      '一次尝试',
      '多年后',
      '从此',
      '未来',
      '长期影响',
      '隐藏潜力',
      '命运',
      'TODO',
      '{{',
      '$subject',
    ];
    const texts = new Set<string>();

    for (const scene of scenes) {
      expect(scene.title.length, scene.id).toBeGreaterThan(5);
      for (const phrase of banned) {
        expect(scene.title, `${scene.id} ${phrase}`).not.toContain(phrase);
        expect(scene.historicalBasis ?? '', `${scene.id} ${phrase}`).not.toContain(phrase);
      }
      for (const outcome of scene.outcomes ?? []) {
        expect(outcome.immediateText.length, `${scene.id} ${outcome.id}`).toBeGreaterThan(50);
        expect(texts.has(outcome.immediateText), `${scene.id} duplicate prose`).toBe(false);
        texts.add(outcome.immediateText);
        for (const phrase of banned) {
          expect(outcome.immediateText, `${scene.id} ${outcome.id} ${phrase}`).not.toContain(
            phrase,
          );
        }
        expect(
          /[0-9]|克朗|维也纳|利奥波德城|印刷|学校|医院|兵营|面粉|煤|Winter|Bauer|Huber|Kral|Stein|Weiss|Hofer|Moser|Josef|Katharina|Anna|Elisabeth|Marie|Theresia|Alois|Otto|Grete|Emil|Friedrich|Hermann|Gustav/.test(
            outcome.immediateText,
          ),
          `${scene.id} ${outcome.id} lacks concrete detail`,
        ).toBe(true);
      }
    }
  });

  it('covers the promised vertical-slice domains and explicitly links them with tags', () => {
    const tags = new Set(scenes.flatMap((scene) => scene.tags));
    for (const required of [
      'birth',
      'infant_nutrition',
      'infant_disease',
      'bereavement',
      'guardianship',
      'industrial_injury',
      'household_budget',
      'rent',
      'medical_cost',
      'school_access',
      'school_fee',
      'teacher_recommendation',
      'girls_education',
      'child_labour',
      'family_labour',
      'union',
      'compensation_claim',
      'employer_response',
      'mobilization',
      'food_shortage',
      'inflation',
      'family_separation',
      'influenza',
      'caregiving',
      'death',
      'orphan_risk',
    ]) {
      expect(tags.has(required), `missing tag ${required}`).toBe(true);
    }
  });

  it('keeps the historical source register internally consistent', () => {
    for (const [key, source] of Object.entries(VIENNA_1912_SOURCES)) {
      expect(source.id, key).toBe(key);
      expect(source.title.length, key).toBeGreaterThan(3);
      expect(source.publisher.length, key).toBeGreaterThan(2);
      expect(source.url, key).toMatch(/^https:\/\//);
      expect(source.note.length, key).toBeGreaterThan(20);
    }
    for (const scene of scenes) {
      expect(scene.sourceIds?.length ?? 0, scene.id).toBeGreaterThan(0);
      for (const sourceId of scene.sourceIds ?? []) {
        expect(sourceIds.has(sourceId), `${scene.id} ${sourceId}`).toBe(true);
      }
    }
  });
});
