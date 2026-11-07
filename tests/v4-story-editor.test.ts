import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const report = JSON.parse(readFileSync(resolve('docs/v4/story-shapes.json'), 'utf8')) as {
  counts: { kernels: number; distinctShapes: number; shapesWithTwoOrMore: number };
  reviews: { id: string; pack: string; shapeKey: string; outcomes: number }[];
  repeatedClusters: { shapeKey: string; count: number; kernels: { id: string }[] }[];
  repeatedStateClusters: { stateKey: string; count: number; kernels: { id: string }[] }[];
  repeatedProductionClusters: { productionKey: string; count: number; kernels: { id: string }[] }[];
  repeatedPhrases: { phrase: string; count: number }[];
};

describe('Phase 19 story shape report', () => {
  it('gives every kernel a deterministic shape signature', () => {
    expect(report.reviews.length).toBe(report.counts.kernels);
    expect(new Set(report.reviews.map((review) => review.id)).size).toBe(report.reviews.length);
    for (const review of report.reviews) {
      expect(review.shapeKey.length).toBeGreaterThan(10);
      expect(review.outcomes).toBeGreaterThanOrEqual(2);
    }
  });

  it('reports structural clusters without treating them as automatic rejects', () => {
    expect(report.counts.distinctShapes).toBeGreaterThan(100);
    expect(report.counts.shapesWithTwoOrMore).toBe(report.repeatedClusters.length);
    for (const cluster of report.repeatedClusters) {
      expect(cluster.count).toBeGreaterThanOrEqual(2);
      expect(cluster.kernels.length).toBe(cluster.count);
    }
  });

  it('recalls the known ghost and odd-jobs structural families', () => {
    const ghost = report.repeatedStateClusters.find((cluster) =>
      cluster.kernels.some((kernel) => kernel.id.startsWith('bc18-ghost.')),
    );
    expect(ghost?.count).toBeGreaterThanOrEqual(4);
    const oddJobs = report.repeatedProductionClusters.find(
      (cluster) => cluster.kernels.filter((kernel) => kernel.id.startsWith('oj18-')).length >= 8,
    );
    expect(oddJobs).toBeDefined();
  });

  it('surfaces repeated prose phrases as editorial evidence', () => {
    expect(report.repeatedPhrases.length).toBeGreaterThan(0);
    for (const phrase of report.repeatedPhrases) {
      expect(phrase.phrase.length).toBe(8);
      expect(phrase.count).toBeGreaterThanOrEqual(5);
    }
  });
});
