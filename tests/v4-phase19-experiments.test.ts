import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const report = JSON.parse(
  readFileSync(resolve('docs/v4/phase-19-experiments.json'), 'utf8'),
) as {
  allPassed: boolean;
  results: {
    id: string;
    packEvents: number;
    sampleEvents: { action: string; subjectId: string; participants: string[] }[];
    checks: { name: string; pass: boolean; detail: string }[];
  }[];
};

describe('Phase 19 controlled collision experiments', () => {
  it('executes all four controlled scenarios', () => {
    expect(report.results.map((result) => result.id)).toEqual([
      'power-love',
      'family-war',
      'luck-craft',
      'elder-history',
    ]);
    expect(report.allPassed).toBe(true);
    for (const result of report.results) {
      expect(result.packEvents).toBeGreaterThan(0);
      expect(result.sampleEvents.length).toBeGreaterThan(0);
      for (const check of result.checks) expect(check.pass, `${result.id}/${check.name}`).toBe(true);
    }
  });

  it('shows multi-state kernels actually executing', () => {
    for (const result of report.results) {
      expect(result.checks.some((check) => check.name === 'multi_state_event_executed')).toBe(true);
    }
  });
});
