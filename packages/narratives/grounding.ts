import { z } from 'zod';
import type { HistoricalEvent } from '../contracts/index.js';
const NarrativeSchema = z
  .object({
    version: z.literal(1),
    jobId: z.string(),
    paragraphs: z
      .array(z.object({ eventId: z.string(), text: z.string().min(1).max(1000) }).strict())
      .min(1)
      .max(6),
  })
  .strict();
export function groundNarrative(input: unknown, jobId: string, facts: HistoricalEvent[]) {
  const result = NarrativeSchema.parse(input);
  if (result.jobId !== jobId) throw new Error('Narrative job mismatch');
  for (const p of result.paragraphs) {
    const fact = facts.find((e) => e.id === p.eventId);
    if (!fact || !fact.text.includes(p.text) || p.text.length < 4)
      throw new Error('Unsupported narrative statement');
  }
  return result;
}
