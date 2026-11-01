import { z } from 'zod';
import data from './history.json' with { type: 'json' };
import conflicts from './conflict-catalog.json' with { type: 'json' };
const schema = z
  .object({
    id: z.string().max(100),
    date: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/),
    precision: z.enum(['month', 'year']),
    kind: z.enum([
      'war',
      'epidemic',
      'crisis',
      'reform',
      'innovation',
      'peace',
      'displacement',
      'earthquake',
      'flood',
      'attack',
    ]),
    title: z.string().max(300),
    countries: z.array(z.string().max(4)).max(200),
    duration: z.number().int().min(1).max(180),
    severity: z.number().min(0).max(1),
    url: z.string().url().startsWith('https://'),
    center: z
      .object({ lon: z.number().min(-180).max(180), lat: z.number().min(-90).max(90) })
      .optional(),
    radiusKm: z.number().min(1).max(5000).optional(),
    endDate: z.string().optional(),
    sourceDataset: z.string().max(160).optional(),
    sourceRecordId: z.string().max(100).optional(),
    participants: z.array(z.string().max(1000)).max(50).optional(),
  })
  .strict();
const conflictInputs = conflicts.map((c) => ({
  id: c.id,
  date: c.date,
  precision: c.precision,
  kind: c.kind,
  title: c.title.slice(0, 300),
  countries: c.countries,
  duration: c.duration,
  severity: c.severity,
  url: c.url,
  sourceDataset: c.sourceDataset,
  sourceRecordId: c.sourceRecordId,
  participants: c.participants.slice(0, 50).map((x) => x.slice(0, 1000)),
}));
export const history = z
  .array(schema)
  .max(2000)
  .parse(
    [...data, ...conflictInputs].sort(
      (a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id),
    ),
  );
if (new Set(history.map((h) => h.id)).size !== history.length)
  throw new Error('Duplicate historical source');
export function historyMonth(date: string, startYear: number) {
  const [y, m] = date.split('-').map(Number);
  return (y - startYear) * 12 + m - 1;
}
export const harmful = (kind: string) => !['peace', 'innovation', 'reform'].includes(kind);
