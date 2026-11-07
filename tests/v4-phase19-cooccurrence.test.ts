import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const report = JSON.parse(readFileSync(resolve('docs/v4/phase-19-cooccurrence.json'), 'utf8')) as {
  counts: { files: number; pairs: number; openPairs: number; coveredPairs: number };
  rows: {
    key: string;
    a: string;
    b: string;
    packA: string;
    packB: string;
    occurrences: number;
    people: number;
    seeds: string[];
    covered: boolean;
  }[];
};

describe('Phase 19 observed state co-occurrence', () => {
  it('derives cross-pack pairs from committed dossiers', () => {
    expect(report.counts.files).toBeGreaterThanOrEqual(3);
    expect(report.rows.length).toBe(report.counts.pairs);
    expect(report.counts.openPairs + report.counts.coveredPairs).toBe(report.counts.pairs);
    expect(report.counts.openPairs).toBeGreaterThan(0);
  });

  it('keeps every observed pair concrete and ordered', () => {
    let previous = Number.POSITIVE_INFINITY;
    for (const row of report.rows) {
      expect(row.a).not.toBe(row.b);
      expect(row.packA).not.toBe(row.packB);
      expect(row.occurrences).toBeGreaterThan(0);
      expect(row.people).toBeGreaterThan(0);
      expect(row.seeds.length).toBeGreaterThan(0);
      expect(row.occurrences).toBeLessThanOrEqual(previous);
      previous = row.occurrences;
    }
  });

  it('contains at least one pair the content library has not consumed', () => {
    expect(report.rows.some((row) => !row.covered)).toBe(true);
  });
});
