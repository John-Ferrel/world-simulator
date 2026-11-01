import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const importer = fileURLToPath(new URL('../scripts/import-conflict-catalog.py', import.meta.url));
const header =
  'c_epid,c_ep_startyear,c_ep_durcount,location,intensity_level,side_a,side_b,year,type_of_conflict\n';

describe('UCDP conflict episode importer', () => {
  it('deduplicates conflict-year rows into episodes and keeps onset precision honest', () => {
    const dir = mkdtempSync(join(tmpdir(), 'conflict-catalog-'));
    try {
      const input = join(dir, 'input.csv'),
        output = join(dir, 'catalog.json'),
        excluded = join(dir, 'excluded.json'),
        report = join(dir, 'report.json');
      writeFileSync(
        input,
        header +
          [
            '77,1946,1,"Cambodia (Kampuchea), Thailand",1,Government of France,Khmer Issarak,1946,1',
            '77,1946,2,"Cambodia (Kampuchea), Thailand",2,Government of France,Khmer Issarak,1947,1',
            '88,1950,1,Atlantis,2,Government,Rebels,1950,3',
          ].join('\n') +
          '\n',
      );
      execFileSync('python3', [
        importer,
        '--input',
        input,
        '--output',
        output,
        '--excluded',
        excluded,
        '--report',
        report,
      ]);
      const catalog = JSON.parse(readFileSync(output, 'utf8')) as Record<string, unknown>[];
      const misses = JSON.parse(readFileSync(excluded, 'utf8')) as Record<string, unknown>[];
      const stats = JSON.parse(readFileSync(report, 'utf8')) as Record<string, unknown>;
      expect(catalog).toHaveLength(1);
      expect(catalog[0]).toMatchObject({
        id: 'ucdp-ct-77',
        date: '1946-01',
        precision: 'year',
        kind: 'war',
        countries: ['KHM', 'THA'],
        duration: 24,
        severity: 0.82,
        sourceDataset: 'UCDP Conflict Termination Dataset v4-2024 (conflict-level)',
        sourceRecordId: '77',
      });
      expect(catalog[0].territoryMapping).toMatchObject({
        scheme: 'ISO 3166-1 alpha-3 modern territory index',
      });
      expect(misses).toEqual([
        expect.objectContaining({
          sourceRecordId: '88',
          reason: 'unmapped_or_ambiguous_location',
          unmappedNames: ['Atlantis'],
        }),
      ]);
      expect(stats).toMatchObject({
        sourceRows: 3,
        uniqueEpisodeIds: 2,
        includedEpisodes: 1,
        excludedEpisodes: 1,
        onsetYearCoverage: [1946, 1946],
      });
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
