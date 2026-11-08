import {
  assertWorldV4,
  ageAt,
  type EventFact,
  type Person,
  type Relation,
  type WorldState,
} from './domain.js';
import { applyWishState } from './wish-compiler.js';

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
  const living = (household: (typeof draft.households)[string]): Person[] =>
    household.memberIds
      .map((id) => draft.persons[id])
      .filter((person): person is Person => Boolean(person) && !person.died);
  const candidates = Object.values(draft.households)
    .map((household) => {
      const place = draft.places[household.residenceId];
      if (!place) return undefined;
      const adults = household.guardianIds
        .map((id) => draft.persons[id])
        .filter(
          (person): person is Person =>
            Boolean(person) && !person.died && ageAt(person, draft.date) >= 18,
        );
      if (adults.length === 0) return undefined;
      const residents = living(household);
      const capacity = Math.max(12, Math.min(16, Math.ceil((place.capacity ?? 4) * 2)));
      if (residents.length >= capacity) return undefined;
      const mother =
        adults.find((person) => person.sex === 'female' && ageAt(person, draft.date) <= 45) ??
        adults.find((person) => person.sex === 'female') ??
        adults[0]!;
      const father = adults.find(
        (person) =>
          person.sex === 'male' && person.id !== mother.id && ageAt(person, draft.date) <= 55,
      );
      const motherAge = ageAt(mother, draft.date);
      // A child should enter a living family, not the alphabetically first
      // household. Prefer a mother of childbearing age, then a father, then a
      // household with room and existing children. The sort is deterministic.
      const score =
        (mother.sex === 'female' ? 0 : 10) +
        (motherAge >= 18 && motherAge <= 42 ? 0 : 2) +
        (father ? 0 : 1) +
        residents.length * 0.05 +
        (residents.some((person) => ageAt(person, draft.date) < 18) ? 0 : 0.2);
      return { family: household, mother, father, residents, score };
    })
    .filter((candidate): candidate is NonNullable<typeof candidate> => Boolean(candidate))
    .sort((a, b) => a.score - b.score || a.family.id.localeCompare(b.family.id));
  const selected = candidates[0];
  if (!selected) throw new Error('当前没有能够接纳新生儿的真实家庭');
  const family = selected.family;
  const guardians = [selected.mother, selected.father]
    .filter((person): person is Person => Boolean(person))
    .filter((person, index, list) => list.findIndex((other) => other.id === person.id) === index);
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
    immediateText: (() => {
      const mother = guardians.find((person) => person.sex === 'female') ?? guardians[0]!;
      const father = guardians.find((person) => person.id !== mother.id);
      const siblings = living(family).filter(
        (person) => person.id !== child.id && ageAt(person, draft.date) < 18,
      );
      const motherWork = mother.employment?.occupation;
      const fatherWork = father?.employment?.occupation;
      const crowded = living(family).length >= 7;
      const poor = family.cash < 8 || family.debt > 0;
      const comfortable = family.cash >= 40;
      const details: string[] = [];
      if (poor) details.push('接生婆走后，母亲把最后几枚硬币压进糖罐底下');
      else if (comfortable) details.push('家里提前备好了摇篮和一小叠干净布片');
      else details.push('母亲把旧床单撕成尿布，父亲在走廊里烧了一壶水');
      if (motherWork) details.push(`母亲是${motherWork}，产后的手还带着工作留下的茧`);
      if (fatherWork) details.push(`父亲是${fatherWork}，在门外来回走了很久`);
      if (siblings.length > 0) details.push(`屋里已经有${siblings.length}个孩子，最大的那个被叫来看一眼新生的小家伙`);
      if (crowded) details.push('这间屋子挤得转不开身，但今晚没有人被赶出去');
      const detail = details.slice(0, 2).join('；');
      return `${child.name}在${place.name}出生。${mother.name}在生产后抱着孩子，${
        father ? `${father.name}站在旁边，` : ''
      }${detail}。这间住处现在住了${living(family).length}口人。`;
    })(),
    significance: 0.95,
    visibility: 'public',
    provenance: { kind: 'birth', sourceId: requestId },
  };
  draft.events.push(event);
  draft.historyMeta.lastEventId = event.id;
  applyWishState(draft, child.id, input.wish);
  assertWorldV4(draft);
  return { world: draft, childId: child.id, event };
}
