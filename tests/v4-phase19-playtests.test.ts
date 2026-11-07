import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const report = JSON.parse(
  readFileSync(resolve('docs/v4/phase-19-playtests.json'), 'utf8'),
) as {
  primarySeeds: { seed: string; events: number; focalShare: number; repeatRate: number; newPackEvents: number }[];
  elderCohort: { seed: string; events: number; focalShare: number; newPackEvents: number };
  mixedCohort: { seed: string; events: number; focalShare: number; newPackEvents: number };
  aggregate: { events: number; newPackEvents: number; focalNewEvents: number; repeatRateMean: number };
  preBridge: { seed: string; newPackEvents: number }[];
  postBridgePreWeight: { seed: string; newPackEvents: number }[];
};

describe('Phase 19 natural-life summary', () => {
  it('contains three primary seeds plus elder and mixed cohorts', () => {
    expect(report.primarySeeds.map((seed) => seed.seed)).toEqual([
      'phase19-a',
      'phase19-b',
      'phase19-c',
    ]);
    expect(report.elderCohort.seed).toBe('phase19-elder');
    expect(report.mixedCohort.seed).toBe('phase19-mixed');
    for (const seed of report.primarySeeds) {
      expect(seed.events).toBeGreaterThan(10000);
      expect(seed.repeatRate).toBeGreaterThan(0);
      expect(seed.focalShare).toBeGreaterThanOrEqual(0);
    }
  });

  it('records the bridge iteration rather than hiding the pre-bridge failure', () => {
    expect(report.preBridge).toHaveLength(3);
    expect(report.postBridgePreWeight).toHaveLength(3);
    expect(report.aggregate.newPackEvents).toBeGreaterThan(0);
    expect(report.aggregate.focalNewEvents).toBeGreaterThan(0);
    expect(report.elderCohort.newPackEvents).toBeGreaterThan(0);
    expect(report.mixedCohort.newPackEvents).toBeGreaterThan(0);
  });
});
