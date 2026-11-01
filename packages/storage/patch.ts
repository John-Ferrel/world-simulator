import type { Person, World } from '../contracts/index.js';

export const STATE_PATCH_FORMAT = 'world-state-patch/v2' as const;
export const MAX_STATE_PATCH_BYTES = 512 * 1024 * 1024;
const MAX_PATCH_PEOPLE = 250_000;
const MAX_DEPTH = 100;
const forbiddenKeys = new Set(['__proto__', 'prototype', 'constructor']);

export type StatePatchV2 = {
  format: typeof STATE_PATCH_FORMAT;
  set: Record<string, unknown>;
  remove?: string[];
  persons: { order?: string[]; upsert: Person[]; remove: string[] };
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/** Match JSONB semantics: omit undefined object values and turn undefined array slots into null. */
function canonical(value: unknown, depth = 0, ancestors = new Set<object>()): string {
  if (depth > MAX_DEPTH) throw new Error('State patch value exceeds maximum nesting depth');
  if (value === undefined) return 'undefined';
  if (value === null || typeof value !== 'object') return JSON.stringify(value) ?? 'null';
  if (ancestors.has(value)) throw new Error('Cyclic state cannot be journaled');
  ancestors.add(value);
  let result: string;
  if (Array.isArray(value)) {
    result =
      '[' +
      value
        .map((item) => (item === undefined ? 'null' : canonical(item, depth + 1, ancestors)))
        .join(',') +
      ']';
  } else {
    const record = value as Record<string, unknown>;
    result =
      '{' +
      Object.keys(record)
        .filter((key) => record[key] !== undefined)
        .sort()
        .map((key) => JSON.stringify(key) + ':' + canonical(record[key], depth + 1, ancestors))
        .join(',') +
      '}';
  }
  ancestors.delete(value);
  return result;
}

function assertUniqueIds(values: readonly unknown[], name: string): asserts values is string[] {
  if (
    values.length > MAX_PATCH_PEOPLE ||
    values.some((value) => typeof value !== 'string' || value.length < 1 || value.length > 200)
  )
    throw new Error(`Invalid ${name} list`);
  if (new Set(values).size !== values.length) throw new Error(`Duplicate id in ${name}`);
}

function personMap(people: readonly Person[], label: string): Map<string, Person> {
  if (!Array.isArray(people) || people.length > MAX_PATCH_PEOPLE)
    throw new Error(`Invalid ${label} persons array`);
  const result = new Map<string, Person>();
  for (const person of people) {
    if (!isRecord(person) || typeof person.id !== 'string' || !person.id || person.id.length > 200)
      throw new Error(`Invalid person in ${label} state`);
    if (result.has(person.id)) throw new Error(`Duplicate person id in ${label} state`);
    result.set(person.id, person as unknown as Person);
  }
  return result;
}

function checkSize(value: unknown) {
  const bytes = new TextEncoder().encode(JSON.stringify(value)).byteLength;
  if (bytes > MAX_STATE_PATCH_BYTES) throw new Error('State patch exceeds maximum encoded size');
}

/** Create a bounded delta. Unchanged people, including long-dead people, are represented by IDs only when ordering changes. */
export function createStatePatch(before: World, after: World): StatePatchV2 {
  const oldPeople = personMap(before.persons, 'before');
  const nextPeople = personMap(after.persons, 'after');
  const upsert: Person[] = [];
  for (const person of after.persons) {
    const old = oldPeople.get(person.id);
    if (
      !old ||
      (old !== person && (old.version !== person.version || canonical(old) !== canonical(person)))
    )
      upsert.push(structuredClone(person));
  }
  const removedPeople = before.persons
    .filter((person) => !nextPeople.has(person.id))
    .map((person) => person.id);
  const beforeOrder = before.persons.map((person) => person.id);
  const afterOrder = after.persons.map((person) => person.id);
  const orderChanged =
    beforeOrder.length !== afterOrder.length ||
    beforeOrder.some((id, index) => id !== afterOrder[index]);

  const set: Record<string, unknown> = {};
  const remove: string[] = [];
  const keys = new Set([...Object.keys(before), ...Object.keys(after)]);
  keys.delete('persons');
  for (const key of keys) {
    if (forbiddenKeys.has(key)) throw new Error(`Unsafe World property: ${key}`);
    const previous = (before as unknown as Record<string, unknown>)[key];
    const next = (after as unknown as Record<string, unknown>)[key];
    if (canonical(previous) === canonical(next)) continue;
    if (next === undefined) remove.push(key);
    else set[key] = structuredClone(next);
  }
  const patch: StatePatchV2 = {
    format: STATE_PATCH_FORMAT,
    set,
    ...(remove.length ? { remove } : {}),
    persons: {
      ...(orderChanged ? { order: afterOrder } : {}),
      upsert,
      remove: removedPeople,
    },
  };
  checkSize(patch);
  return patch;
}

function validateEnvelope(value: Record<string, unknown>): StatePatchV2 {
  if (Object.keys(value).some((key) => !['format', 'set', 'remove', 'persons'].includes(key)))
    throw new Error('Unknown versioned state patch property');
  if (value.format !== STATE_PATCH_FORMAT) throw new Error('Unsupported state patch format');
  if (!isRecord(value.set) || !isRecord(value.persons))
    throw new Error('Malformed versioned state patch');
  const set = value.set;
  if (Object.keys(set).some((key) => key === 'persons' || forbiddenKeys.has(key)))
    throw new Error('Unsafe or reserved property in state patch set');
  const remove = value.remove === undefined ? [] : value.remove;
  if (!Array.isArray(remove)) throw new Error('Malformed state patch remove list');
  assertUniqueIds(remove, 'top-level remove');
  if (remove.some((key) => key === 'persons' || forbiddenKeys.has(key) || Object.hasOwn(set, key)))
    throw new Error('Conflicting or reserved top-level removal');

  const people = value.persons;
  if (Object.keys(people).some((key) => !['order', 'upsert', 'remove'].includes(key)))
    throw new Error('Unknown persons patch property');
  if (!Array.isArray(people.upsert) || !Array.isArray(people.remove))
    throw new Error('Malformed persons patch');
  const upsert = people.upsert as unknown[];
  const upsertIds: string[] = [];
  for (const person of upsert) {
    if (!isRecord(person) || typeof person.id !== 'string' || !person.id || person.id.length > 200)
      throw new Error('Malformed person upsert');
    upsertIds.push(person.id);
  }
  assertUniqueIds(upsertIds, 'person upsert');
  assertUniqueIds(people.remove, 'person remove');
  if (upsertIds.some((id) => (people.remove as string[]).includes(id)))
    throw new Error('A person cannot be both upserted and removed');
  if (people.order !== undefined) {
    if (!Array.isArray(people.order)) throw new Error('Malformed person order');
    assertUniqueIds(people.order, 'person order');
  }
  const result: StatePatchV2 = {
    format: STATE_PATCH_FORMAT,
    set,
    ...(remove.length ? { remove } : {}),
    persons: {
      ...(people.order === undefined ? {} : { order: people.order as string[] }),
      upsert: upsert as Person[],
      remove: people.remove as string[],
    },
  };
  checkSize(result);
  return result;
}

function applyV2(state: World, patch: StatePatchV2): World {
  const oldPeople = personMap(state.persons, 'base');
  const removals = new Set(patch.persons.remove);
  for (const id of removals)
    if (!oldPeople.has(id)) throw new Error(`Cannot remove missing person ${id}`);
  const nextPeople = new Map(oldPeople);
  for (const id of removals) nextPeople.delete(id);
  for (const person of patch.persons.upsert) nextPeople.set(person.id, structuredClone(person));
  const order = patch.persons.order ?? [
    ...state.persons.filter((person) => !removals.has(person.id)).map((person) => person.id),
    ...patch.persons.upsert.map((person) => person.id).filter((id) => !oldPeople.has(id)),
  ];
  if (
    order.length !== nextPeople.size ||
    order.some((id) => !nextPeople.has(id)) ||
    new Set(order).size !== order.length
  )
    throw new Error('Person order does not match patched person set');

  const result = { ...state } as World;
  for (const key of patch.remove ?? []) delete (result as unknown as Record<string, unknown>)[key];
  for (const [key, value] of Object.entries(patch.set))
    (result as unknown as Record<string, unknown>)[key] = structuredClone(value);
  result.persons = order.map((id) => nextPeople.get(id)!);
  return result;
}

/** Apply v2 entity deltas or a legacy shallow object patch. Neither path mutates its input state. */
export function applyStatePatch(state: World, input: unknown): World {
  if (!isRecord(input)) throw new Error('State patch must be an object');
  checkSize(input);
  if (Object.hasOwn(input, 'format')) return applyV2(state, validateEnvelope(input));
  const legacy: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input)) {
    if (forbiddenKeys.has(key)) throw new Error(`Unsafe legacy patch property: ${key}`);
    if (value !== undefined) legacy[key] = structuredClone(value);
  }
  return { ...state, ...legacy } as World;
}
