import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';
import { writeFile } from 'node:fs/promises';

const [input, output] = process.argv.slice(2);
if (!input || !output)
  throw new Error('Usage: tsx scripts/analyze-earth-history.ts EVENTS.ndjson REPORT.json');
const throughMonth = process.env.ANALYSIS_THROUGH_MONTH
  ? Number(process.env.ANALYSIS_THROUGH_MONTH)
  : Infinity;
if (!(throughMonth > 0)) throw new Error('Invalid analysis month');
const kinds: Record<string, number> = {},
  goalsByPerson = new Map<string, number>();
const wars: Record<
  string,
  {
    started?: number;
    ended?: number;
    campaignDeaths: number;
    campaigns: number;
    occupations: number;
  }
> = {};
const samples: Record<string, unknown[]> = {};
const wantedKinds = new Set([
  'birth',
  'death',
  'goal_transition',
  'identity_shift',
  'organization_founded',
  'institution_founded',
  'war_started',
  'military_campaign',
  'territory_occupied',
  'peace_treaty',
  'political_succession',
  'custody_started',
  'custody_released',
  'sovereignty_changed',
]);
let events = 0,
  firstMonth: number | undefined,
  lastMonth = 0,
  sequence = 0;
let gaps = 0,
  duplicatesOrOutOfOrder = 0,
  missingCauses = 0,
  monthlyOccupationDuplicates = 0;
let occupationMonth = -1,
  occupied = new Set<string>();
const unresolvedSamples: unknown[] = [],
  recent = new Map<string, any>(),
  chains: unknown[] = [];
for await (const line of createInterface({ input: createReadStream(input), crlfDelay: Infinity })) {
  if (!line.trim()) continue;
  const e = JSON.parse(line);
  if (e.month > throughMonth) break;
  const match = new RegExp(
    `^${String(e.worldId).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:e([0-9]+)$`,
  ).exec(e.id);
  if (!match) throw new Error('Unexpected non-canonical event identifier');
  const n = Number(match[1]);
  if (n <= sequence) duplicatesOrOutOfOrder++;
  if (n !== sequence + 1) gaps++;
  for (const cause of e.causeIds ?? []) {
    const prefix = `${e.worldId}:e`,
      value = cause.startsWith(prefix) ? Number(cause.slice(prefix.length)) : NaN;
    // Continuous recorded sequences prove existence without retaining millions of IDs.
    // A gap makes earlier omitted causes unresolved; never claim complete grounding then.
    if (!Number.isSafeInteger(value) || value < 1 || value > sequence || gaps > 0) {
      missingCauses++;
      if (unresolvedSamples.length < 8) unresolvedSamples.push({ eventId: e.id, cause });
    }
  }
  sequence = Math.max(sequence, n);
  events++;
  firstMonth ??= e.month;
  lastMonth = e.month;
  kinds[e.kind] = (kinds[e.kind] ?? 0) + 1;
  if (wantedKinds.has(e.kind) && (samples[e.kind]?.length ?? 0) < 2)
    (samples[e.kind] ??= []).push(e);
  if (e.kind === 'goal_transition')
    for (const id of e.personIds) goalsByPerson.set(id, (goalsByPerson.get(id) ?? 0) + 1);
  const warId = e.data?.warId;
  if (
    warId &&
    ['war_started', 'military_campaign', 'territory_occupied', 'peace_treaty'].includes(e.kind)
  ) {
    const war = (wars[warId] ??= { campaigns: 0, campaignDeaths: 0, occupations: 0 });
    if (e.kind === 'war_started') war.started = e.month;
    if (e.kind === 'peace_treaty') war.ended = e.month;
    if (e.kind === 'military_campaign') {
      war.campaigns++;
      war.campaignDeaths += Object.values(e.data.lossesByPolity ?? {}).reduce<number>(
        (sum, value) => sum + Number(value),
        0,
      );
    }
    if (e.kind === 'territory_occupied') war.occupations++;
  }
  if (e.kind === 'territory_occupied') {
    if (occupationMonth !== e.month) {
      occupationMonth = e.month;
      occupied = new Set();
    }
    if (occupied.has(e.locationId)) monthlyOccupationDuplicates++;
    occupied.add(e.locationId);
  }
  if (chains.length < 20 && wantedKinds.has(e.kind)) {
    const parent = (e.causeIds ?? []).map((id: string) => recent.get(id)).find(Boolean);
    if (parent && !chains.some((chain: any) => chain.outcome.kind === e.kind))
      chains.push({ cause: parent, outcome: e });
  }
  recent.set(e.id, e);
  if (recent.size > 2000) recent.delete(recent.keys().next().value!);
}
const report = {
  recordedAt: new Date().toISOString(),
  input,
  requestedThroughMonth: Number.isFinite(throughMonth) ? throughMonth : null,
  events,
  firstMonth,
  lastMonth,
  continuity: { gaps, duplicatesOrOutOfOrder, unresolvedCauses: missingCauses, unresolvedSamples },
  monthlyOccupationDuplicates,
  kinds,
  wars,
  topGoalTransitionCounts: [...goalsByPerson]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 8)
    .map(([personId, count]) => ({ personId, count })),
  samples,
  chains,
  limitations: [
    'Recorded outcomes, not historical/social probability calibration or proof of enjoyable prose',
    'Campaign deaths count cohort battle losses; named individual deaths are separate recorded events',
    'Bounded chain samples cover parents retained in a 2000-event inspection window; full sequence checks cover earlier IDs only if no gap exists',
  ],
};
await writeFile(output, JSON.stringify(report, null, 2));
console.log(
  JSON.stringify({
    input,
    events,
    firstMonth,
    lastMonth,
    monthlyOccupationDuplicates,
    continuity: report.continuity,
    wars,
  }),
);
