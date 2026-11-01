import { describe, expect, it } from 'vitest';
import {
  createStatePatch,
  applyStatePatch,
  STATE_PATCH_FORMAT,
} from '../packages/storage/patch.js';
import { createWorld } from '../packages/world-packs/index.js';
import type { World } from '../packages/contracts/index.js';

function sample(): World {
  const w = createWorld('storage-patch');
  w.persons = w.persons.slice(0, 8).map((person) => structuredClone(person));
  w.persons[1].death = 3;
  w.persons[2].death = 4;
  w.month = 10;
  return w;
}

describe('versioned entity state patches', () => {
  it('round-trips changed, inserted, removed, and reordered people while deleting optional top-level fields', () => {
    const before = sample();
    (before as World & { obsolete?: string }).obsolete = 'remove-me';
    const beforeSnapshot = structuredClone(before);
    const after = structuredClone(before);
    after.month = 11;
    delete (after as World & { obsolete?: string }).obsolete;
    after.persons[0].coin += 7;
    after.persons.splice(3, 1);
    after.persons.push({
      ...structuredClone(before.persons[7]),
      id: 'new-person',
      name: 'new record',
    });
    after.persons.reverse();

    const patch = createStatePatch(before, after);
    expect(patch.format).toBe(STATE_PATCH_FORMAT);
    expect(patch.remove).toContain('obsolete');
    expect(patch.persons.order).toEqual(after.persons.map((person) => person.id));
    expect(patch.persons.remove).toContain(before.persons[3].id);
    expect(patch.persons.upsert.map((person) => person.id).sort()).toEqual(
      [before.persons[0].id, 'new-person'].sort(),
    );
    const patchSnapshot = structuredClone(patch);
    expect(applyStatePatch(before, patch)).toEqual(after);
    expect(before).toEqual(beforeSnapshot);
    expect(patch).toEqual(patchSnapshot);
  });

  it('does not copy unchanged long-dead records and emits only the changed person', () => {
    const before = sample();
    const after = structuredClone(before);
    after.persons[0].health = Math.max(0, after.persons[0].health - 0.01);
    const patch = createStatePatch(before, after);
    expect(patch.persons.upsert.map((person) => person.id)).toEqual([before.persons[0].id]);
    expect(patch.persons.remove).toEqual([]);
    expect(patch.persons.order).toBeUndefined();
    expect(
      patch.persons.upsert.some(
        (person) => person.id === before.persons[1].id || person.id === before.persons[2].id,
      ),
    ).toBe(false);
  });

  it('records representative patch bytes far below a full person-array patch for a small fixture', () => {
    const before = sample();
    const after = structuredClone(before);
    after.month++;
    after.persons[0].stress = Math.min(1, after.persons[0].stress + 0.02);
    const patch = createStatePatch(before, after);
    const patchBytes = Buffer.byteLength(JSON.stringify(patch));
    const legacyBytes = Buffer.byteLength(
      JSON.stringify({ month: after.month, persons: after.persons }),
    );
    expect(patchBytes).toBeLessThan(legacyBytes);
    expect(patchBytes).toBeGreaterThan(0);
  });

  it('uses JSONB-compatible equality for omitted undefined object properties', () => {
    const before = sample();
    const after = structuredClone(before);
    (before as World & { transient?: unknown }).transient = undefined;
    (after as World & { transient?: unknown }).transient = undefined;
    expect(createStatePatch(before, after).set).not.toHaveProperty('transient');
    expect(createStatePatch(before, after).remove ?? []).not.toContain('transient');
  });

  it('applies legacy shallow patches without mutating the checkpoint or patch object', () => {
    const before = sample();
    const snapshot = structuredClone(before);
    const legacy = { month: 17, status: 'archived' as const };
    const legacySnapshot = structuredClone(legacy);
    const recovered = applyStatePatch(before, legacy);
    expect(recovered.month).toBe(17);
    expect(recovered.status).toBe('archived');
    expect(recovered.persons).toEqual(before.persons);
    expect(before).toEqual(snapshot);
    expect(legacy).toEqual(legacySnapshot);

    const wholePeopleLegacy = { persons: [structuredClone(before.persons[0])] };
    expect(applyStatePatch(before, wholePeopleLegacy).persons).toEqual(wholePeopleLegacy.persons);
  });

  it('rejects unsupported versions, conflicting ids, malformed order, and unsafe patches', () => {
    const before = sample();
    expect(() =>
      applyStatePatch(before, {
        format: 'world-state-patch/v3',
        set: {},
        persons: { upsert: [], remove: [] },
      }),
    ).toThrow(/Unsupported/);
    expect(() =>
      applyStatePatch(before, {
        format: STATE_PATCH_FORMAT,
        set: {},
        persons: { upsert: [], remove: [], order: [before.persons[0].id] },
      }),
    ).toThrow(/order/);
    expect(() =>
      applyStatePatch(before, {
        format: STATE_PATCH_FORMAT,
        set: {},
        persons: { upsert: [{ id: 'p' }, { id: 'p' }], remove: [] },
      }),
    ).toThrow(/Duplicate/);
    expect(() =>
      applyStatePatch(before, {
        format: STATE_PATCH_FORMAT,
        set: { persons: [] },
        persons: { upsert: [], remove: [] },
      }),
    ).toThrow(/reserved/);
    expect(() => applyStatePatch(before, JSON.parse('{"__proto__":{"polluted":true}}'))).toThrow(
      /Unsafe/,
    );
    expect(({} as { polluted?: boolean }).polluted).toBeUndefined();
  });
});
