import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const report = JSON.parse(readFileSync(resolve('docs/v4/phase-20-experiments.json'), 'utf8')) as {
  allPassed: boolean;
  results: {
    id: string;
    matchingEvents: { subject: string; action: string; check?: { dc: number; band: string } }[];
    checks: { name: string; pass: boolean; detail: string }[];
  }[];
};

describe('Phase 20 controlled adaptive experiments', () => {
  it('executes the four controlled scenarios', () => {
    expect(report.results.map((result) => result.id)).toEqual([
      'A-one-event-different-lives',
      'B-ordinary-curse',
      'C-reconciliation',
      'D-public-reversal',
    ]);
    expect(report.allPassed).toBe(true);
    for (const result of report.results) {
      expect(result.matchingEvents.length).toBeGreaterThan(0);
      for (const check of result.checks)
        expect(check.pass, `${result.id}/${check.name}`).toBe(true);
    }
  });

  it('shows one ordinary event producing different seeded outcomes', () => {
    const scenario = report.results[0]!;
    const seeded = scenario.matchingEvents.filter((event) => event.subject.includes('Klara'));
    expect(new Set(seeded.map((event) => event.action)).size).toBeGreaterThanOrEqual(2);
    expect(new Set(seeded.map((event) => event.check?.dc)).size).toBeGreaterThanOrEqual(2);
  });

  it('executes the specific reconciliation, curse and reversal outcomes', () => {
    const expected: Record<string, string> = {
      'B-ordinary-curse': 'curse-lifted',
      'C-reconciliation': 'same-key',
      'D-public-reversal': 're-accused',
    };
    for (const [id, outcome] of Object.entries(expected)) {
      const scenario = report.results.find((result) => result.id === id);
      expect(scenario, id).toBeDefined();
      expect(scenario!.matchingEvents[0]!.action, id).toContain(outcome);
    }
  });
});
