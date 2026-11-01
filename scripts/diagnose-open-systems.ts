import { writeJsonCheckpoint } from './json-checkpoint.js';
import { createWriteStream } from 'node:fs';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { once } from 'node:events';
import { finished } from 'node:stream/promises';
import { join } from 'node:path';
import { createEarthWorld } from '../packages/world-packs/earth/index.js';
import { connectEarthCities } from '../packages/world-packs/earth/geography.js';
import { newPerson } from '../packages/world-packs/index.js';
import { advance } from '../packages/simulation-core/index.js';
import { population, type HistoricalEvent } from '../packages/contracts/index.js';
const years = Number(process.env.DIAG_YEARS ?? 150),
  seeds = Number(process.env.DIAG_SEEDS ?? 3);
if (
  !Number.isInteger(years) ||
  years < 1 ||
  years > 300 ||
  !Number.isInteger(seeds) ||
  seeds < 1 ||
  seeds > 5
)
  throw new Error('Bounded diagnostic settings required');
// Hash the checked-out mechanics, input datasets, diagnostic and dependency lock.
// This records source provenance without touching credentials or changing simulation state.
async function sourceFiles(directory: string): Promise<string[]> {
  const files: string[] = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await sourceFiles(path)));
    else if (entry.isFile() && /\.(ts|json)$/.test(entry.name)) files.push(path);
  }
  return files;
}
const digestInputs = [
  ...(await sourceFiles('packages')),
  ...(await sourceFiles('data')),
  'scripts/diagnose-open-systems.ts',
  'scripts/json-checkpoint.ts',
  'pnpm-lock.yaml',
].sort();
const sourceHash = createHash('sha256');
for (const path of digestInputs) sourceHash.update(path + '\0').update(await readFile(path));
const selectedRegions = process.env.DIAG_REGIONS
  ? process.env.DIAG_REGIONS.split(',').map((id) => id.trim())
  : ['CHN', 'JPN', 'GBR', 'FRA', 'DEU', 'RUS', 'USA', 'IND', 'BRA'];
if (
  selectedRegions.length < 1 ||
  selectedRegions.length > 12 ||
  new Set(selectedRegions).size !== selectedRegions.length ||
  selectedRegions.some((id) => !/^[A-Z]{3}$/.test(id))
)
  throw new Error('Use one to twelve distinct geographic region codes');
const recordedAt = new Date().toISOString();
const report: any = {
  recordedAt,
  selectedRegions,
  sourceDigest: `sha256:${sourceHash.digest('hex')}`,
  sourceDigestScope: 'packages/**/*.ts,json; data/**/*.ts,json; diagnostic scripts; pnpm-lock.yaml',
  scope:
    'Reduced Earth mechanics/biography diagnostic, not global geographic accuracy or capacity benchmark',
  limitations: [
    `${selectedRegions.length} selected modern geographic regions, up to four cities per region`,
    'Research rate 0.01 to exercise long lives rather than rapid knowledge-ceiling endings',
    'Pure simulation without PostgreSQL or model requests',
  ],
  years,
  seeds: [],
};
const firstSeed = Number(process.env.DIAG_SEED_START ?? 1);
if (!Number.isInteger(firstSeed) || firstSeed < 1 || firstSeed > 5)
  throw new Error('Invalid diagnostic seed');
const output = process.env.DIAG_OUTPUT ?? 'docs/metrics/open-systems-long-run.json';
const eventLogPath = process.env.DIAG_EVENT_LOG;
const eventLog = eventLogPath
  ? createWriteStream(eventLogPath, { flags: 'wx', mode: 0o600, highWaterMark: 64 * 1024 })
  : undefined;
const eventLogFinished = eventLog ? finished(eventLog) : undefined;
// Capture write failures immediately, including failures before the first drain.
void eventLogFinished?.catch(() => {});
if (eventLog) await once(eventLog, 'open');
const eventLogHash = eventLog ? createHash('sha256') : undefined;
let loggedEvents = 0;
try {
  for (let seed = firstSeed; seed < firstSeed + seeds; seed++) {
    let w = createEarthWorld(`open-systems-${seed}`, seed, years);
    const regions = new Set(selectedRegions);
    if (selectedRegions.some((id) => !w.settlements.some((s) => (s.regionId ?? s.polityId) === id)))
      throw new Error('Unknown diagnostic region');
    const selected = new Set<string>();
    for (const id of regions)
      for (const s of w.settlements
        .filter((s) => (s.regionId ?? s.polityId) === id)
        .sort((a, b) => (b.sourcePopulation ?? 0) - (a.sourcePopulation ?? 0))
        .slice(0, 4))
        selected.add(s.id);
    w.settlements = w.settlements.filter((s) => selected.has(s.id));
    const controllers = new Set(w.settlements.map((s) => s.polityId));
    w.polities = w.polities.filter((p) => controllers.has(p.id));
    if (w.sovereignty)
      w.sovereignty.authorities = Object.fromEntries(
        Object.entries(w.sovereignty.authorities).filter(([id]) => selected.has(id)),
      );
    w.persons = w.persons.filter((p) => selected.has(p.locationId));
    for (const p of w.persons) {
      p.relationships = [];
      p.parents = [];
    }
    while (w.persons.length < 1000) {
      const i = w.persons.length,
        s = w.settlements[i % w.settlements.length];
      if (!s || s.cohort.adults <= 1) throw new Error('Invalid diagnostic cohort');
      s.cohort.adults--;
      const p = newPerson(w, `diagnostic-${i}`, s.id, i, 18 + (i % 48));
      const funds = Math.min(p.coin, s.coin);
      p.coin = funds;
      s.coin -= funds;
      w.persons.push(p);
    }
    connectEarthCities(w);
    for (const polity of w.polities) {
      const person = w.persons.find((p) =>
        w.settlements.some((s) => s.id === p.locationId && s.polityId === polity.id),
      );
      polity.leaderId = person?.id ?? '';
      if (person) person.title = '初始代表（诊断场景）';
    }
    w.baselinePopulation = population(w);
    w.parameters.researchRate = 0.01;
    const started = performance.now(),
      initialPopulation = population(w),
      kinds: Record<string, number> = {};
    const focus = w.persons.slice(0, 3).map((p) => p.id),
      biographies: Record<string, HistoricalEvent[]> = Object.fromEntries(
        focus.map((id) => [id, []]),
      );
    const lateLifeMilestones: Record<string, HistoricalEvent[]> = Object.fromEntries(
      focus.map((id) => [id, []]),
    );
    const lateMilestoneKinds = new Set([
      'death',
      'identity_shift',
      'identity_affiliation_changed',
      'identity_affiliation_lost',
      'goal_transition',
      'political_succession',
      'political_custody_started',
      'religious_custody_started',
      'political_custody_released',
    ]);
    const examples: Record<string, HistoricalEvent[]> = {},
      trends: any[] = [];
    let deaths = 0,
      noCauseShifts = 0,
      duplicateEvents = 0,
      eventCount = 0;
    let lastEventSequence = 0;
    while (w.status === 'running') {
      const t = advance(w);
      w = t.world;
      for (const e of t.events) {
        if (eventLog) {
          const line = JSON.stringify(e) + '\n';
          eventLogHash!.update(line);
          // Await the disk whenever its bounded write buffer fills; never retain the
          // full event history in memory or drop events under I/O pressure.
          if (eventLog.destroyed) throw new Error('Diagnostic event log closed before completion');
          if (!eventLog.write(line)) {
            if (eventLog.destroyed) throw new Error('Diagnostic event log write failed');
            await once(eventLog, 'drain');
          }
          loggedEvents++;
        }
        eventCount++;
        kinds[e.kind] = (kinds[e.kind] ?? 0) + 1;
        const sequence = Number(e.id.slice(e.id.lastIndexOf(':e') + 2));
        if (!Number.isSafeInteger(sequence) || sequence <= lastEventSequence) duplicateEvents++;
        lastEventSequence = Math.max(lastEventSequence, sequence);
        if (e.kind === 'death') deaths++;
        if (e.kind === 'identity_shift' && !e.causeIds.length) noCauseShifts++;
        for (const id of focus) {
          if (!e.personIds.includes(id)) continue;
          if (biographies[id].length < 150) biographies[id].push(e);
          else if (lateMilestoneKinds.has(e.kind) || e.significance >= 0.7) {
            lateLifeMilestones[id].push(e);
            if (lateLifeMilestones[id].length > 100) lateLifeMilestones[id].shift();
          }
        }
        if (e.significance >= 0.7 && (examples[e.kind]?.length ?? 0) < 2)
          (examples[e.kind] ??= []).push(e);
      }
      if (w.month % 120 === 0 || w.status !== 'running') {
        const trend = {
          year: w.month / 12,
          population: population(w),
          livingNamed: w.persons.filter((p) => p.death === undefined).length,
          activeWars: w.geopolitics?.wars.filter((x) => x.status === 'active').length ?? 0,
          wars: w.geopolitics?.wars.length ?? 0,
          institutions: Object.values(w.society?.institutions ?? {}).filter(
            (x) => x.status === 'active',
          ).length,
          organizations: w.organizations.filter((x) => x.status === 'active').length,
          rss: process.memoryUsage().rss,
        };
        trends.push(trend);
        console.log(JSON.stringify({ seed, ...trend }));
        const checkpoint = await writeJsonCheckpoint(
          `${process.env.DIAG_CHECKPOINT_PREFIX ?? '.data/open-systems'}-${seed}-checkpoint.json`,
          w,
        );
        await writeFile(
          `${output.replace(/\.json$/, '')}-progress-${seed}.json`,
          JSON.stringify(
            {
              recordedAt,
              sourceDigest: report.sourceDigest,
              scope: report.scope,
              limitations: report.limitations,
              status: 'in_progress',
              checkpoint,
              seed,
              month: w.month,
              elapsedMs: performance.now() - started,
              trends,
              kinds,
              heapUsed: process.memoryUsage().heapUsed,
            },
            null,
            2,
          ),
        );
      }
    }
    report.seeds.push({
      seed: w.seed,
      months: w.month,
      ending: w.terminalReason,
      elapsedMs: performance.now() - started,
      initialPopulation,
      finalPopulation: population(w),
      eventCount,
      namedDeaths: deaths,
      noCauseShifts,
      duplicateEvents,
      trends,
      kinds,
      examples,
      biographies: focus.map((id) => ({
        person: w.persons.find((p) => p.id === id),
        events: biographies[id],
        lateLifeMilestones: lateLifeMilestones[id],
      })),
    });
    await writeFile(output, JSON.stringify(report, null, 2));
  }
} finally {
  eventLog?.end();
  await eventLogFinished;
}
report.completedAt = new Date().toISOString();
if (eventLogPath)
  report.eventLog = {
    path: eventLogPath,
    format: 'Canonical HistoricalEvent JSON, one event per line; no synthetic headers',
    events: loggedEvents,
    sha256: eventLogHash!.digest('hex'),
  };
await writeFile(output, JSON.stringify(report, null, 2));
