import {
  ageAt,
  monthIndex,
  type EventFact,
  type Person,
  type PersonAttributeKey,
  type PersonLife,
  type StateInstance,
  type StateOwnerType,
  type WorldDate,
  type WorldState,
} from '../domain.js';
import type { StateDefinition, StateModifier } from './types.js';

export type StateDefinitionIndex = {
  all: StateDefinition[];
  byId: Map<string, StateDefinition>;
  byTag: Map<string, StateDefinition[]>;
};

export type StateLookup = {
  revision: number;
  byOwner: Map<string, StateInstance[]>;
  byOwnerTag: Map<string, StateInstance[]>;
  orgsByPerson: Map<string, string[]>;
  positionsByPerson: Map<string, number>;
};

const stateOwnerCaches = new WeakMap<
  WorldState,
  { revision: number; byOwner: Map<string, StateInstance[]> }
>();
const organizationCaches = new WeakMap<
  WorldState,
  { revision: number; orgsByPerson: Map<string, string[]>; positionsByPerson: Map<string, number> }
>();
const stateLookups = new WeakMap<WorldState, StateLookup>();

function ownerKey(ownerType: StateOwnerType, ownerId: string): string {
  return `${ownerType}\u0000${ownerId}`;
}

function stateOwnersFor(world: WorldState): Map<string, StateInstance[]> {
  const revision = world.historyMeta.stateRevision ?? 0;
  const cached = stateOwnerCaches.get(world);
  if (cached && cached.revision === revision) return cached.byOwner;
  const byOwner = new Map<string, StateInstance[]>();
  for (const instance of Object.values(world.states ?? {})) {
    if (!instance.active) continue;
    const key = ownerKey(instance.ownerType, instance.ownerId);
    const list = byOwner.get(key) ?? [];
    list.push(instance);
    byOwner.set(key, list);
  }
  stateOwnerCaches.set(world, { revision, byOwner });
  return byOwner;
}

function organizationPeopleIndex(world: WorldState): {
  orgsByPerson: Map<string, string[]>;
  positionsByPerson: Map<string, number>;
} {
  const revision = world.historyMeta.organizationRevision ?? 0;
  const cached = organizationCaches.get(world);
  if (cached && cached.revision === revision) return cached;
  const orgsByPerson = new Map<string, string[]>();
  const positionsByPerson = new Map<string, number>();
  for (const organization of Object.values(world.organizations)) {
    for (const memberId of organization.memberIds) {
      const list = orgsByPerson.get(memberId) ?? [];
      if (!list.includes(organization.id)) list.push(organization.id);
      orgsByPerson.set(memberId, list);
    }
    for (const positionId of organization.positions) {
      const holderId = world.positions[positionId]?.holderId;
      if (!holderId) continue;
      const list = orgsByPerson.get(holderId) ?? [];
      if (!list.includes(organization.id)) list.push(organization.id);
      orgsByPerson.set(holderId, list);
    }
  }
  for (const position of Object.values(world.positions)) {
    if (position.end !== undefined || !position.holderId) continue;
    positionsByPerson.set(
      position.holderId,
      (positionsByPerson.get(position.holderId) ?? 0) + 1,
    );
  }
  const next = { revision, orgsByPerson, positionsByPerson };
  organizationCaches.set(world, next);
  return next;
}

function buildStateLookup(world: WorldState): StateLookup {
  const byOwner = stateOwnersFor(world);
  const { orgsByPerson, positionsByPerson } = organizationPeopleIndex(world);
  return {
    revision: world.historyMeta.stateRevision ?? 0,
    byOwner,
    byOwnerTag: new Map(),
    orgsByPerson,
    positionsByPerson,
  };
}

export function stateLookupFor(world: WorldState): StateLookup {
  const revision = world.historyMeta.stateRevision ?? 0;
  const cached = stateLookups.get(world);
  if (cached && cached.revision === revision) {
    // The state map is current. Organisation memberships may have changed;
    // refresh only that tier without rebuilding all state ownership.
    const org = organizationPeopleIndex(world);
    cached.orgsByPerson = org.orgsByPerson;
    cached.positionsByPerson = org.positionsByPerson;
    return cached;
  }
  const next = buildStateLookup(world);
  stateLookups.set(world, next);
  return next;
}

export function touchStateRevision(world: WorldState): void {
  world.historyMeta.stateRevision = (world.historyMeta.stateRevision ?? 0) + 1;
}

export function touchOrganizationRevision(world: WorldState): void {
  world.historyMeta.organizationRevision = (world.historyMeta.organizationRevision ?? 0) + 1;
}

export function indexStateDefinitions(definitions: StateDefinition[]): StateDefinitionIndex {
  const byId = new Map<string, StateDefinition>();
  const byTag = new Map<string, StateDefinition[]>();
  for (const definition of definitions) {
    byId.set(definition.id, definition);
    for (const tag of definition.tags) {
      const list = byTag.get(tag) ?? [];
      list.push(definition);
      byTag.set(tag, list);
    }
  }
  return { all: definitions, byId, byTag };
}

export function stateOwnerExists(
  world: WorldState,
  ownerType: StateOwnerType,
  ownerId: string,
): boolean {
  switch (ownerType) {
    case 'person':
      return Boolean(world.persons[ownerId]);
    case 'organization':
      return Boolean(world.organizations[ownerId]);
    case 'household':
      return Boolean(world.households[ownerId]);
    case 'place':
      return Boolean(world.places[ownerId]);
    case 'region':
      return Boolean(world.macro?.regions[ownerId]);
    case 'world':
      return world.id === ownerId;
    default:
      return false;
  }
}

/** A living person who can stand as the subject of a non-person state fact. */
export function stateAnchorPerson(
  world: WorldState,
  ownerType: StateOwnerType,
  ownerId: string,
): Person | undefined {
  if (ownerType === 'person') {
    const person = world.persons[ownerId];
    return person && !person.died ? person : undefined;
  }
  if (ownerType === 'organization') {
    const organization = world.organizations[ownerId];
    if (!organization) return undefined;
    const holders = organization.positions
      .map((positionId) => world.positions[positionId]?.holderId)
      .map((holderId) => (holderId ? world.persons[holderId] : undefined))
      .filter((person): person is Person => person !== undefined && !person.died);
    if (holders.length > 0) return holders[0];
    const members = organization.memberIds
      .map((id) => world.persons[id])
      .filter((person): person is Person => person !== undefined && !person.died);
    return members[0];
  }
  if (ownerType === 'household') {
    const household = world.households[ownerId];
    if (!household) return undefined;
    const adults = household.memberIds
      .map((id) => world.persons[id])
      .filter((person): person is Person => Boolean(person) && !person.died);
    return adults.find((person) => ageAt(person, world.date) >= 18) ?? adults[0];
  }
  if (ownerType === 'place' || ownerType === 'region') {
    // Place/region states (an occupied city, a district under curfew) still
    // need a living witness so ticks/expiry can commit a real fact. Pick an
    // adult present in the place, falling back to any living person there.
    const residents = Object.values(world.persons).filter((person) => {
      if (person.died) return false;
      if (ownerType === 'place') return person.locationId === ownerId;
      return world.places[person.locationId]?.regionId === ownerId;
    });
    return (
      residents.find((person) => ageAt(person, world.date) >= 18) ??
      residents.sort((a, b) => a.id.localeCompare(b.id))[0]
    );
  }
  return undefined;
}

export function activeStates(
  world: WorldState,
  ownerType: StateOwnerType,
  ownerId: string,
  tag?: string,
  index?: StateDefinitionIndex,
  date: WorldDate = world.date,
): StateInstance[] {
  const states = world.states;
  if (!states) return [];
  const lookup = stateLookupFor(world);
  const candidates = (lookup.byOwner.get(ownerKey(ownerType, ownerId)) ?? []).filter((instance) =>
    stateEffective(instance, date),
  );
  if (!tag) return candidates.slice();
  return candidates.filter((instance) => {
    const definition = index?.byId.get(instance.definitionId);
    return definition?.tags.includes(tag) === true;
  });
}

/** Person + household + employer + region states that shape this person's chances. */
export function stateContextForPerson(
  world: WorldState,
  person: Person,
  index?: StateDefinitionIndex,
  date: WorldDate = world.date,
): { instance: StateInstance; definition: StateDefinition; scope: StateOwnerType }[] {
  const result: { instance: StateInstance; definition: StateDefinition; scope: StateOwnerType }[] =
    [];
  const states = world.states;
  if (!states) return result;
  const lookup = stateLookupFor(world);
  const keys: [StateOwnerType, string | undefined][] = [
    ['person', person.id],
    ['household', person.householdId],
    ['organization', person.employment?.organizationId],
    ['place', person.locationId],
    ['place', person.education.placeId],
    ['region', world.places[person.locationId]?.regionId],
  ];
  for (const organizationId of lookup.orgsByPerson.get(person.id) ?? []) {
    keys.push(['organization', organizationId]);
  }
  const seen = new Set<string>();
  for (const [scope, ownerId] of keys) {
    if (!ownerId) continue;
    for (const instance of lookup.byOwner.get(ownerKey(scope, ownerId)) ?? []) {
      if (seen.has(instance.id)) continue;
      if (!stateEffective(instance, date)) continue;
      seen.add(instance.id);
      const definition = index?.byId.get(instance.definitionId);
      if (!definition) continue;
      result.push({ instance, definition, scope });
    }
  }
  return result;
}

export function stateModifiersForPerson(
  world: WorldState,
  person: Person,
  index: StateDefinitionIndex,
  date: WorldDate = world.date,
): StateModifier[] {
  return stateContextForPerson(world, person, index, date).flatMap(
    (entry) => entry.definition.modifiers ?? [],
  );
}

export function stateTagsForPerson(
  world: WorldState,
  person: Person,
  index: StateDefinitionIndex,
  date: WorldDate = world.date,
): Set<string> {
  const tags = new Set<string>();
  for (const entry of stateContextForPerson(world, person, index, date)) {
    for (const tag of entry.definition.tags) tags.add(tag);
  }
  return tags;
}

/**
 * Cheap presence check used by the scheduler before scanning state-gated
 * scenes. It deliberately checks owner scopes, not every state definition.
 */
export function hasStateContextForPerson(
  world: WorldState,
  person: Person,
  date: WorldDate = world.date,
): boolean {
  const lookup = stateLookupFor(world);
  if ((lookup.positionsByPerson.get(person.id) ?? 0) > 0) return true;
  const keys: [StateOwnerType, string | undefined][] = [
    ['person', person.id],
    ['household', person.householdId],
    ['organization', person.employment?.organizationId],
    ['place', person.locationId],
    ['place', person.education.placeId],
    ['region', world.places[person.locationId]?.regionId],
  ];
  for (const organizationId of lookup.orgsByPerson.get(person.id) ?? []) {
    keys.push(['organization', organizationId]);
  }
  for (const [ownerType, ownerId] of keys) {
    if (!ownerId) continue;
    for (const instance of lookup.byOwner.get(ownerKey(ownerType, ownerId)) ?? []) {
      if (stateEffective(instance, date)) return true;
    }
  }
  return false;
}

/**
 * Scene weight multiplier from active state modifiers. Matching is authored:
 * a modifier must name scene tags or kernel family ids. A modifier with no
 * match key is rejected by validation.
 */
export function stateSceneWeightMultiplier(
  world: WorldState,
  person: Person,
  scene: { tags?: string[]; familyId?: string },
  index: StateDefinitionIndex,
  date: WorldDate = world.date,
): number {
  const sceneTags = new Set(scene.tags ?? []);
  const familyId = scene.familyId;
  let multiplier = 1;
  for (const modifier of stateModifiersForPerson(world, person, index, date)) {
    if (modifier.kind !== 'scene_weight') continue;
    const tagMatches =
      (modifier.tags?.length ?? 0) > 0 && modifier.tags!.some((tag) => sceneTags.has(tag));
    const familyMatches =
      Boolean(familyId) && (modifier.familyIds?.length ?? 0) > 0
        ? modifier.familyIds!.includes(familyId!)
        : false;
    if (!tagMatches && !familyMatches) continue;
    multiplier *= modifier.multiplier;
  }
  // Bound cascade risk from many overlapping states.
  return Math.max(0.1, Math.min(6, multiplier));
}

export type CheckDefinition = {
  attribute?: PersonAttributeKey;
  skill?: keyof PersonLife['skills'];
  dc: number;
  stateBonus?: Record<string, number>;
  historyBonus?: { tag: string; perCount: number; max: number };
  blockedByStateTags?: string[];
};

/**
 * Scene checks carry outcome branch ids. State ticks/reactions need the same
 * d20 math without outcome arrays, so they use the narrower CheckDefinition.
 */
export type CheckSpec = CheckDefinition & {
  successOutcomeIds?: string[];
  failureOutcomeIds?: string[];
  criticalSuccessOutcomeIds?: string[];
  criticalFailureOutcomeIds?: string[];
};

const ATTRIBUTE_DEFAULTS: PersonAttributeKey[] = [
  'intelligence',
  'willpower',
  'charisma',
  'empathy',
  'cunning',
  'resilience',
  'perception',
  'luck',
];

function stableLuck(personId: string): number {
  let hash = 2166136261;
  for (const char of personId) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619) >>> 0;
  return (hash % 1000) / 1000;
}

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

/**
 * Resolve a named capability. Explicit attributes win; otherwise old people
 * derive a stable value from their existing traits and skills. This avoids a
 * save migration and avoids a second hidden personality system.
 */
export function resolveAttribute(person: Person, key: PersonAttributeKey): number {
  const explicit = person.attributes?.[key];
  if (typeof explicit === 'number' && Number.isFinite(explicit)) return clamp01(explicit);
  const traits = person.traits;
  const skills: PersonLife['skills'] = person.life?.skills ?? {
    literacy: 0,
    numeracy: 0,
    craft: 0,
    social: 0,
  };
  switch (key) {
    case 'intelligence':
      return clamp01(
        0.15 + skills.numeracy * 0.45 + traits.openness * 0.25 + skills.literacy * 0.15,
      );
    case 'willpower':
      return clamp01(0.2 + traits.conscientiousness * 0.45 + (1 - traits.neuroticism) * 0.25);
    case 'charisma':
      return clamp01(0.1 + traits.extraversion * 0.55 + skills.social * 0.35);
    case 'empathy':
      return clamp01(0.1 + traits.care * 0.5 + traits.agreeableness * 0.4);
    case 'cunning':
      return clamp01(
        0.15 + skills.social * 0.35 + (1 - traits.agreeableness) * 0.3 + traits.openness * 0.2,
      );
    case 'resilience':
      return clamp01(
        person.health.vitality * 0.45 +
          traits.conscientiousness * 0.3 +
          (1 - traits.neuroticism) * 0.25,
      );
    case 'perception':
      return clamp01(0.15 + traits.openness * 0.3 + skills.social * 0.3 + skills.numeracy * 0.25);
    case 'luck':
      return stableLuck(person.id);
    default:
      return 0.5;
  }
}

export function allAttributes(person: Person): Record<PersonAttributeKey, number> {
  return Object.fromEntries(
    ATTRIBUTE_DEFAULTS.map((key) => [key, Number(resolveAttribute(person, key).toFixed(3))]),
  ) as Record<PersonAttributeKey, number>;
}

export type CheckModifierBreakdown = {
  attribute?: { key: PersonAttributeKey; value: number; bonus: number };
  skill?: { key: keyof PersonLife['skills']; value: number; bonus: number };
  states: { tag: string; bonus: number }[];
  history?: { tag: string; count: number; bonus: number };
  blockedBy?: string;
  total: number;
};

/**
 * d20-style modifier. Attributes and skills are normalized 0..1; a 0.5 person
 * gets +0, a 0.9 person gets +2, a 0.1 person gets -2. States and history add
 * authored bonuses. The total is bounded so a single state cannot make every
 * check automatic.
 */
export function checkModifier(
  world: WorldState,
  person: Person,
  check: CheckDefinition,
  index: StateDefinitionIndex,
  historyTagCount?: (tag: string) => number,
  date: WorldDate = world.date,
): CheckModifierBreakdown {
  const states: { tag: string; bonus: number }[] = [];
  let blockedBy: string | undefined;
  const activeTags = stateTagsForPerson(world, person, index, date);
  for (const tag of check.blockedByStateTags ?? []) {
    if (activeTags.has(tag)) {
      blockedBy = tag;
      break;
    }
  }
  for (const [tag, bonus] of Object.entries(check.stateBonus ?? {})) {
    if (activeTags.has(tag)) states.push({ tag, bonus });
  }
  const attribute = check.attribute
    ? (() => {
        const value = resolveAttribute(person, check.attribute!);
        return { key: check.attribute!, value, bonus: Math.round((value - 0.5) * 6) };
      })()
    : undefined;
  const skill = check.skill
    ? (() => {
        const value = person.life?.skills[check.skill!] ?? 0;
        return { key: check.skill!, value, bonus: Math.round(value * 5) };
      })()
    : undefined;
  const history = check.historyBonus
    ? (() => {
        const count = historyTagCount?.(check.historyBonus!.tag) ?? 0;
        const bonus = Math.min(check.historyBonus!.max, count * check.historyBonus!.perCount);
        return { tag: check.historyBonus!.tag, count, bonus };
      })()
    : undefined;
  const total = Math.max(
    -8,
    Math.min(
      12,
      (attribute?.bonus ?? 0) +
        (skill?.bonus ?? 0) +
        states.reduce((sum, entry) => sum + entry.bonus, 0) +
        (history?.bonus ?? 0),
    ),
  );
  return {
    ...(attribute ? { attribute } : {}),
    ...(skill ? { skill } : {}),
    states,
    ...(history ? { history } : {}),
    ...(blockedBy ? { blockedBy } : {}),
    total,
  };
}

export type CheckResult = {
  die: number;
  modifier: number;
  total: number;
  dc: number;
  success: boolean;
  criticalSuccess: boolean;
  criticalFailure: boolean;
  breakdown: CheckModifierBreakdown;
};

export function resolveCheck(
  world: WorldState,
  person: Person,
  check: CheckDefinition,
  index: StateDefinitionIndex,
  rng: () => number,
  historyTagCount?: (tag: string) => number,
  date: WorldDate = world.date,
): CheckResult {
  const breakdown = checkModifier(world, person, check, index, historyTagCount, date);
  const die = 1 + Math.floor(rng() * 20);
  const naturalSuccess = die === 20;
  const naturalFailure = die === 1;
  const total = die + breakdown.total;
  const success = breakdown.blockedBy
    ? false
    : naturalSuccess || (!naturalFailure && total >= check.dc);
  return {
    die,
    modifier: breakdown.total,
    total,
    dc: check.dc,
    success,
    criticalSuccess: success && naturalSuccess,
    criticalFailure: !success && naturalFailure,
    breakdown,
  };
}

export function checkBand(
  result: CheckResult,
): 'success' | 'failure' | 'critical_success' | 'critical_failure' {
  if (result.criticalSuccess) return 'critical_success';
  if (result.criticalFailure) return 'critical_failure';
  return result.success ? 'success' : 'failure';
}

export function stateEffective(instance: StateInstance, date: WorldDate): boolean {
  if (!instance.active) return false;
  if (monthIndex(instance.since) > monthIndex(date)) return false;
  return !stateExpired(instance, date);
}

/** True when the instance is past its declared end date. */
export function stateExpired(instance: StateInstance, date: WorldDate): boolean {
  return Boolean(instance.expiresAt && monthIndex(date) >= monthIndex(instance.expiresAt));
}

export function stateDueForTick(
  instance: StateInstance,
  tickId: string,
  tickEveryMonths: number,
  date: WorldDate,
): boolean {
  const last = instance.tickHistory?.[tickId] ?? instance.lastTickAt;
  if (!last) return true;
  return monthIndex(date) - monthIndex(last) >= Math.max(1, tickEveryMonths);
}

export function reactionAllowed(
  instance: StateInstance,
  reactionId: string,
  date: WorldDate,
  cooldownMonths: number,
  maxPerYear: number,
): boolean {
  const record = instance.reactions?.[reactionId];
  if (!record) return true;
  if (cooldownMonths > 0 && monthIndex(date) - monthIndex(record.lastAt) < cooldownMonths)
    return false;
  if (maxPerYear > 0 && record.lastAt.year === date.year && record.count >= maxPerYear)
    return false;
  return true;
}

export function reactionTriggered(
  event: EventFact,
  reaction: { onTags?: string[]; onActionPrefix?: string },
): boolean {
  const tags = new Set(event.tags ?? []);
  if (reaction.onTags?.some((tag) => tags.has(tag))) return true;
  if (reaction.onActionPrefix && event.action.startsWith(reaction.onActionPrefix)) return true;
  return false;
}
