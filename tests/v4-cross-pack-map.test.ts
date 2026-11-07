import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const map = JSON.parse(
  readFileSync(resolve('docs/v4/cross-pack-opportunities.json'), 'utf8'),
) as {
  counts: { states: number; kernels: number; openPairs: number; coveredPairs: number };
  categories: Record<string, number>;
  states: { id: string; pack: string; consumers: string[]; creators: string[] }[];
  pairs: {
    key: string;
    a: string;
    b: string;
    packA: string;
    packB: string;
    category: string;
    score: number;
    covered: boolean;
    prompts: string[];
  }[];
};

describe('Phase 19 cross-pack opportunity map', () => {
  it('indexes the runtime states and kernels', () => {
    expect(map.counts.states).toBeGreaterThanOrEqual(99);
    expect(map.counts.kernels).toBeGreaterThanOrEqual(1973);
    expect(map.states).toHaveLength(map.counts.states);
    expect(new Set(map.states.map((state) => state.id)).size).toBe(map.states.length);
  });

  it('keeps every pair tied to two real cross-pack states', () => {
    const stateIds = new Set(map.states.map((state) => state.id));
    const keys = new Set<string>();
    for (const pair of map.pairs) {
      expect(stateIds.has(pair.a), pair.a).toBe(true);
      expect(stateIds.has(pair.b), pair.b).toBe(true);
      expect(pair.a).not.toBe(pair.b);
      expect(pair.packA).not.toBe(pair.packB);
      expect(pair.covered).toBe(false);
      expect(pair.score).toBeGreaterThan(0);
      expect(pair.prompts.length).toBeGreaterThan(0);
      expect(keys.has(pair.key)).toBe(false);
      keys.add(pair.key);
    }
  });

  it('reports open collisions across the named families', () => {
    expect(map.counts.openPairs).toBeGreaterThan(100);
    expect(Object.keys(map.categories)).toEqual(
      expect.arrayContaining(['romance_power', 'family_war', 'craft_luck', 'elder_history']),
    );
    for (const count of Object.values(map.categories)) expect(count).toBeGreaterThan(0);
  });
});
