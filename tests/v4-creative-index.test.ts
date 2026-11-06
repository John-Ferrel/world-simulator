import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const index = JSON.parse(
  readFileSync(resolve('docs/v4/creative-index.json'), 'utf8'),
) as {
  counts: { states: number; kernels: number; records: number };
  records: {
    id: string;
    premise: string;
    motifs: string[];
    tone: string[];
    outcomePattern: string[];
    pack: string;
  }[];
  highSimilarityPairs: { a: string; b: string; score: number }[];
};

describe('Phase 18 Creative Index', () => {
  it('indexes every kernel exactly once', () => {
    expect(index.records).toHaveLength(index.counts.kernels);
    expect(new Set(index.records.map((record) => record.id)).size).toBe(index.counts.kernels);
  });

  it('gives every record usable creative metadata', () => {
    for (const record of index.records) {
      expect(record.premise.length).toBeGreaterThan(10);
      expect(record.pack).toBeTruthy();
      expect(Array.isArray(record.motifs)).toBe(true);
      expect(Array.isArray(record.tone)).toBe(true);
      expect(Array.isArray(record.outcomePattern)).toBe(true);
    }
  });

  it('keeps high-similarity candidates as scored pairs', () => {
    for (const pair of index.highSimilarityPairs) {
      expect(pair.a).not.toBe(pair.b);
      expect(pair.score).toBeGreaterThanOrEqual(0.2);
      expect(pair.score).toBeLessThanOrEqual(1);
    }
  });
});
