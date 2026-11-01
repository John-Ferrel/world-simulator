import {
  assertWorldV4,
  ageAt,
  type EventFact,
  type Person,
  type Relation,
  type WorldState,
} from './domain.js';

export type V4BirthInput = {
  name: string;
  sex: 'female' | 'male' | 'intersex';
  health: number;
  body?: string;
  wish: string;
  lifeMode: 'ordinary' | 'legendary';
  appearance: {
    skin: number;
    hair: number;
    clothes: number;
    doll?: Record<string, unknown>;
  };
};

function defaultTraits(seed: string): Person['traits'] {
  let h = 2166136261;
  for (const char of seed) h = Math.imul(h ^ char.charCodeAt(0), 16777619) >>> 0;
  const value = (offset: number) => 0.35 + ((h >>> offset) % 31) / 100;
  return {
    care: value(0),
    ambition: value(3),
    tradition: value(6),
    openness: value(9),
    conscientiousness: value(12),
    extraversion: value(15),
    agreeableness: value(18),
    neuroticism: value(21),
  };
}

function newRelation(
  world: WorldState,
  a: string,
  b: string,
  kind: Relation['kind'],
  date: WorldState['date'],
): Relation {
  const relation: Relation = {
    id: `v4-rel-${a}-${b}-${kind}`,
    a,
    b,
    kind,
    trust: 0.7,
    affection: 0.75,
    obligation: 0.5,
    fear: 0,
    respect: 0.5,
    start: { ...date },
    sharedEventIds: [],
  };
  world.relations[relation.id] = relation;
  world.persons[a]?.relationshipIds.push(relation.id);
  world.persons[b]?.relationshipIds.push(relation.id);
  return relation;
}

/**
 * A player birth is a single canonical event, not a two-stage compile gate.
 * The child enters a real existing household; the private wish is a contract,
 * not a fact. LLM interpretation can enrich it asynchronously later.
 */
export function createV4Birth(
  world: WorldState,
  input: V4BirthInput,
  requestId: string,
  ownerId?: string,
): { world: WorldState; childId: string; event: EventFact } {
  if (world.status !== 'running') throw new Error('世界不在运行中');
  const draft = structuredClone(world);
  const family = Object.values(draft.households)
    .filter((household) => {
      const adults = household.guardianIds
        .map((id) => draft.persons[id])
        .filter(
          (person): person is Person =>
            Boolean(person) && !person.died && ageAt(person, draft.date) >= 18,
        );
      return adults.length > 0 && Boolean(draft.places[household.residenceId]);
    })
    .sort((a, b) => a.id.localeCompare(b.id))[0];
  if (!family) throw new Error('当前没有能够接纳新生儿的真实家庭');
  const guardians = family.guardianIds
    .map((id) => draft.persons[id])
    .filter((person): person is Person => Boolean(person) && !person.died);
  if (guardians.length === 0) throw new Error('真实家庭没有在世的监护人');
  const place = draft.places[family.residenceId]!;
  const childId = `person-${requestId.replace(/[^a-zA-Z0-9_-]/g, '-').slice(-80)}`;
  if (draft.persons[childId]) throw new Error('该出生请求已经创建了人物');
  const health = Math.max(0.2, Math.min(1, input.health));
  const child: Person = {
    id: childId,
    name: input.name,
    ownerId,
    sex: input.sex,
    born: { ...draft.date },
    locationId: place.id,
    householdId: family.id,
    parentIds: guardians.map((person) => person.id),
    guardianIds: guardians.map((person) => person.id),
    health: {
      vitality: health,
      conditions: input.body ? [input.body] : ['newborn'],
      nutrition: 0.72,
    },
    traits: defaultTraits(childId),
    life: {
      mood: 0,
      reputation: 0,
      skills: { literacy: 0, numeracy: 0, craft: 0, social: 0 },
      flags: [],
    },
    education: { status: 'none', level: 0 },
    roles: ['infant', 'child'],
    appearance: input.appearance,
    lifeContract: {
      originalWish: input.wish.slice(0, 1000),
      mode: input.lifeMode,
      interpretation: '出生愿望已保存；人生仍由世界经历决定。',
      createdAt: { ...draft.date },
    },
    projectIds: [],
    relationshipIds: [],
    knowledgeIds: [],
    provenance: { kind: 'birth', sourceId: requestId },
  };
  draft.persons[child.id] = child;
  family.memberIds.push(child.id);
  for (const guardian of guardians) {
    newRelation(draft, child.id, guardian.id, 'kin', draft.date);
    newRelation(draft, child.id, guardian.id, 'guardian', draft.date);
  }
  const eventId = `evt:${draft.id}:birth:${requestId}`;
  const event: EventFact = {
    id: eventId,
    date: { ...draft.date },
    placeId: place.id,
    subjectId: child.id,
    participants: [
      { personId: child.id, role: 'child' },
      ...guardians.map((person) => ({
        personId: person.id,
        role: person.sex === 'female' ? 'mother' : 'father',
      })),
    ],
    action: 'birth',
    causes: [],
    effects: [],
    immediateText: `${child.name}在${place.name}出生。${
      guardians.find((person) => person.sex === 'female')?.name ?? guardians[0]!.name
    }在生产后抱着孩子；这间住处现在住了${family.memberIds.length}口人。`,
    significance: 0.95,
    visibility: 'public',
    provenance: { kind: 'birth', sourceId: requestId },
  };
  draft.events.push(event);
  draft.historyMeta.lastEventId = event.id;
  assertWorldV4(draft);
  return { world: draft, childId: child.id, event };
}
