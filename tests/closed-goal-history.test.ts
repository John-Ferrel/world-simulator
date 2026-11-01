import { expect, it } from 'vitest';
import type { Goal, World } from '../packages/contracts/index.js';
import { createWorld } from '../packages/world-packs/index.js';
import { advance } from '../packages/simulation-core/index.js';

function freezeDeep<T>(value: T): T {
  if (value && typeof value === 'object') {
    for (const child of Object.values(value)) freezeDeep(child);
    Object.freeze(value);
  }
  return value;
}

it('preserves frozen closed-goal histories without changing future events or state', () => {
  const plain = createWorld('closed-goal-equivalence');
  plain.persons = plain.persons.slice(0, 8);
  plain.month = 11; // Exercise annual progress as well as monthly decisions.
  const historical = structuredClone(plain);
  const archivedGoals: Goal[] = Array.from({ length: 360 }, (_, i) =>
    freezeDeep({
      id: `closed-history-${i}`,
      kind: (i % 2 ? 'belong' : 'learn') as Goal['kind'],
      strength: 0.4,
      progress: i % 2 ? 0.2 : 1,
      status: (i % 2 ? 'abandoned' : 'fulfilled') as Goal['status'],
      causeIds: [`${plain.id}:historical-evidence-${i}`],
      reason: 'A past commitment retained as history',
    }),
  );
  historical.persons[0].goals.unshift(...archivedGoals);
  const archivedIds = new Set(archivedGoals.map((goal) => goal.id));
  const originalBytes = JSON.stringify(historical);
  let ordinary: World = plain,
    withHistory: World = historical;
  for (let month = 0; month < 24; month++) {
    const expected = advance(ordinary),
      actual = advance(withHistory);
    expect(actual.events).toEqual(expected.events);
    expect(actual.results).toEqual(expected.results);
    const canonical = structuredClone(actual.world);
    canonical.persons[0].goals = canonical.persons[0].goals.filter(
      (goal) => !archivedIds.has(goal.id),
    );
    expect(JSON.stringify(canonical)).toBe(JSON.stringify(expected.world));
    const preserved = actual.world.persons[0].goals.filter((goal) => archivedIds.has(goal.id));
    expect(preserved).toHaveLength(archivedGoals.length);
    for (let i = 0; i < preserved.length; i++) {
      expect(preserved[i]).toBe(archivedGoals[i]);
      expect(Object.isFrozen(preserved[i].causeIds)).toBe(true);
    }
    ordinary = expected.world;
    withHistory = actual.world;
  }
  expect(JSON.stringify(historical)).toBe(originalBytes);
});

it('keeps canonical clone bytes identical to full deep cloning while isolating active goals', () => {
  const input = createWorld('closed-goal-clone-bytes');
  input.persons = input.persons.slice(0, 2);
  const person = input.persons[0],
    active = person.goals[0];
  active.causeIds = ['observed-source'];
  const closed: Goal = freezeDeep({
    ...structuredClone(active),
    id: 'retained-abandoned-goal',
    status: 'abandoned',
  });
  person.goals.push(closed);
  const previousClone = structuredClone(input);
  previousClone.revision++;
  const actual = advance(input, [], false);
  expect(JSON.stringify(actual.world)).toBe(JSON.stringify(previousClone));
  expect(actual.events).toEqual([]);
  expect(actual.world.persons[0]).not.toBe(person);
  expect(actual.world.persons[0].goals[0]).not.toBe(active);
  expect(actual.world.persons[0].goals[0].causeIds).not.toBe(active.causeIds);
  expect(actual.world.persons[0].goals[1]).toBe(closed);
});
