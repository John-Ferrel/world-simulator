import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const indexPath = resolve('data/historical-sovereignty/cshapes-1900-jurisdictions.json');
const importerPath = resolve('scripts/import-cshapes-sovereignty.py');
type JurisdictionIndex = {
  schema: string;
  source: {
    sourceUrl: string;
    archiveUrl: string;
    archiveSha256: string;
    dataLicense: string;
    codebookUrl: string;
  };
  baselineDate: string;
  modernPointSource: { sourceUrl: string; license: string };
  coverage: {
    historicalUnitCount: number;
    settlementPointCount: number;
    uniqueSettlementIdCount: number;
    uniquelyMappedSettlementPoints: number;
    unmatchedSettlementPoints: number;
    ambiguousSettlementPoints: number;
    sourceIdCollisionPoints: number;
    sourceIdCollisionCount: number;
    statusCounts: Record<string, number>;
  };
  units: {
    gwCode: number;
    name: string;
    status: string;
    sovereignGwCode: number | null;
    sovereignName?: string;
    period: { start: string; end: string };
    borderDefined: 0 | 1;
    featureId: number;
  }[];
  settlements: {
    settlementId: string;
    modernRegionId: string;
    point: [number, number];
    sourcePointIndex: number;
    matchStatus: 'unique-point-match' | 'ambiguous-overlap' | 'unmatched' | 'source-id-collision';
    historicalUnitCode: number | null;
    candidateHistoricalUnitCodes: number[];
  }[];
  sourceIdCollisions: {
    settlementId: string;
    modernRegionIds: string[];
    candidateHistoricalUnitCodes: number[];
  }[];
};

describe('CShapes 1900 sovereignty reference data', () => {
  const index = JSON.parse(readFileSync(indexPath, 'utf8')) as JurisdictionIndex;

  it('has a bounded, attributed, internally consistent jurisdiction schema', () => {
    expect(statSync(indexPath).size).toBeLessThan(2 * 1024 * 1024);
    expect(statSync(indexPath).mode & 0o777).toBe(0o644);
    expect(index.schema).toBe('historical-sovereignty-index/v1');
    expect(index.baselineDate).toBe('1900-01-01');
    expect(index.source.sourceUrl).toContain('icr.ethz.ch/data/cshapes');
    expect(index.source.archiveUrl).toContain('icr.ethz.ch/data/cshapes');
    expect(index.source.archiveSha256).toMatch(/^[a-f0-9]{64}$/);
    expect(index.source.dataLicense).toBe('CC BY-NC-SA 4.0');
    expect(index.source.codebookUrl).toContain('Codebook.pdf');
    expect(index.modernPointSource.license).toBe('public domain');
    expect(index.units.length).toBe(index.coverage.historicalUnitCount);
    expect(index.settlements.length).toBe(index.coverage.settlementPointCount);
    expect(index.units.length).toBeGreaterThanOrEqual(100);
    expect(index.units.length).toBeLessThan(200);
    expect(index.settlements.length).toBeLessThan(10_000);
    expect(index.settlements.length).toBe(7280);

    const units = new Map(index.units.map((unit) => [unit.gwCode, unit]));
    expect(units.size).toBe(index.units.length);
    expect(Object.values(index.coverage.statusCounts).reduce((a, b) => a + b, 0)).toBe(
      index.units.length,
    );
    const settlementIds = new Set(index.settlements.map((settlement) => settlement.settlementId));
    expect(settlementIds.size).toBe(index.coverage.uniqueSettlementIdCount);
    expect(index.coverage.uniqueSettlementIdCount).toBe(7280);
    for (const settlement of index.settlements) {
      expect(settlement.point).toHaveLength(2);
      expect(settlement.point[0]).toBeGreaterThanOrEqual(-180);
      expect(settlement.point[0]).toBeLessThanOrEqual(180);
      expect(settlement.point[1]).toBeGreaterThanOrEqual(-90);
      expect(settlement.point[1]).toBeLessThanOrEqual(90);
      if (settlement.matchStatus === 'unique-point-match') {
        expect(settlement.historicalUnitCode).not.toBeNull();
        expect(units.has(settlement.historicalUnitCode!)).toBe(true);
        expect(settlement.candidateHistoricalUnitCodes).toEqual([]);
      } else if (settlement.matchStatus !== 'source-id-collision') {
        expect(settlement.historicalUnitCode).toBeNull();
      } else {
        expect(settlement.historicalUnitCode).toBeNull();
        expect(settlement.candidateHistoricalUnitCodes.length).toBeGreaterThan(0);
      }
    }
    expect(index.settlements.filter((x) => x.matchStatus === 'unique-point-match')).toHaveLength(
      index.coverage.uniquelyMappedSettlementPoints,
    );
    expect(index.settlements.filter((x) => x.matchStatus === 'unmatched')).toHaveLength(
      index.coverage.unmatchedSettlementPoints,
    );
    expect(index.settlements.filter((x) => x.matchStatus === 'ambiguous-overlap')).toHaveLength(
      index.coverage.ambiguousSettlementPoints,
    );
    expect(index.settlements.filter((x) => x.matchStatus === 'source-id-collision')).toHaveLength(
      index.coverage.sourceIdCollisionPoints,
    );
    expect(index.sourceIdCollisions).toHaveLength(index.coverage.sourceIdCollisionCount);
    expect(index.sourceIdCollisions).toHaveLength(0);
    expect(settlementIds.has('earth-ne-1159149391')).toBe(true);
    expect(index.settlements.find((x) => x.settlementId === 'earth-city-60')?.matchStatus).toBe(
      'unique-point-match',
    );
  });

  it('keeps modern region identity separate from 1900 unit and sovereign identity', () => {
    const units = new Map(index.units.map((unit) => [unit.gwCode, unit]));
    const byId = new Map(
      index.settlements.map((settlement) => [settlement.settlementId, settlement]),
    );
    const mumbai = byId.get('earth-city-234')!;
    const mumbaiUnit = units.get(mumbai.historicalUnitCode!)!;
    expect(mumbai.modernRegionId).toBe('IND');
    expect(mumbaiUnit.name).toBe('India');
    expect(mumbaiUnit.status).toBe('colony');
    expect(mumbaiUnit.sovereignGwCode).toBe(200);
    expect(mumbaiUnit.sovereignName).toBe('United Kingdom');

    const london = units.get(byId.get('earth-city-219')!.historicalUnitCode!)!;
    expect(london.name).toBe('United Kingdom');
    expect(london.status).toBe('independent');
    expect(london.sovereignGwCode).toBe(london.gwCode);

    const taipei = units.get(byId.get('earth-city-214')!.historicalUnitCode!)!;
    expect(taipei.status).toBe('colony');
    expect(taipei.sovereignName).toBe('Japan');
  });

  it('enforces the archive byte bound before parsing an importer input', () => {
    const directory = mkdtempSync(resolve(tmpdir(), 'sovereignty-import-'));
    try {
      const oversized = resolve(directory, 'oversized.tar.gz');
      const output = resolve(directory, 'should-not-exist.json');
      writeFileSync(oversized, Buffer.alloc(8 * 1024 * 1024 + 1));
      expect(() =>
        execFileSync('python3', [importerPath, '--source-archive', oversized, '--output', output], {
          stdio: 'pipe',
        }),
      ).toThrow();
      expect(() => readFileSync(output)).toThrow();
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });
});
