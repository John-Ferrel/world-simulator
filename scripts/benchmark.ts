import { createWorld } from '../packages/world-packs/index.js';
import { advance } from '../packages/simulation-core/index.js';
import { population, type HistoricalEvent } from '../packages/contracts/index.js';
import { writeFile, mkdir } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import { once } from 'node:events';
import { dirname } from 'node:path';
import { cpus, totalmem } from 'node:os';
const years = Number(process.env.BENCH_YEARS ?? 150),
  count = Number(process.env.BENCH_SEEDS ?? 3),
  researchRate = Number(process.env.BENCH_RESEARCH_RATE ?? 1),
  firstSeed = Number(process.env.BENCH_SEED_START ?? 1);
if (
  !Number.isInteger(firstSeed) ||
  firstSeed < 1 ||
  firstSeed > 100 ||
  !Number.isInteger(count) ||
  count < 1 ||
  count > 5 ||
  firstSeed + count > 101
)
  throw new Error('Bounded benchmark seed settings required');
const eventLogPath = process.env.BENCH_EVENT_LOG;
if (eventLogPath) await mkdir(dirname(eventLogPath), { recursive: true });
const eventLog = eventLogPath
  ? createWriteStream(eventLogPath, { flags: 'wx', mode: 0o600 })
  : undefined;
if (eventLog) await once(eventLog, 'open');
const report: any = {
  recordedAt: new Date().toISOString(),
  sourceDigest: process.env.BENCH_SOURCE_DIGEST ?? null,
  scope: 'Fictional world pack, pure canonical simulation without database or model requests',
  eventLog: eventLogPath ?? null,
  environment: {
    node: process.version,
    cpu: cpus()[0].model,
    cores: cpus().length,
    hostMemoryBytes: totalmem(),
  },
  years,
  firstSeed,
  researchRate,
  seeds: [],
};
for (let seed = firstSeed; seed < firstSeed + count; seed++) {
  let w = createWorld(`chronicle-${seed}`, seed, years, { researchRate });
  const start = performance.now(),
    cpu = process.cpuUsage(),
    initialMemory = process.memoryUsage().rss;
  const kinds: Record<string, number> = {},
    sample: HistoricalEvent[] = [],
    focusEvents: HistoricalEvent[] = [],
    causalExamples: HistoricalEvent[] = [],
    trends: any[] = [];
  let eventCount = 0;
  while (w.status === 'running') {
    const result = advance(w);
    w = result.world;
    if (eventLog && result.events.length) {
      const accepted = eventLog.write(
        result.events.map((event) => JSON.stringify(event)).join('\n') + '\n',
      );
      if (!accepted) await once(eventLog, 'drain');
    }
    for (const e of result.events) {
      eventCount++;
      kinds[e.kind] = (kinds[e.kind] ?? 0) + 1;
      if (e.significance >= 0.8 && sample.length < 24) sample.push(e);
      if (e.personIds.includes('person-0') && focusEvents.length < 240) focusEvents.push(e);
      if (e.causeIds.length && causalExamples.filter((x) => x.kind === e.kind).length < 3)
        causalExamples.push(e);
    }
    if (w.month % 120 === 0) {
      trends.push({
        year: w.month / 12,
        population: population(w),
        namedAlive: w.persons.filter((p) => p.death === undefined).length,
        food: Math.round(w.settlements.reduce((n, s) => n + s.food, 0)),
        organizations: w.organizations.filter((o) => o.status === 'active').length,
        rss: process.memoryUsage().rss,
      });
      console.log(
        `seed ${seed}, year ${w.month / 12}, pop ${population(w)}, RSS ${Math.round(process.memoryUsage().rss / 1024 / 1024)} MiB`,
      );
    }
  }
  const timing = process.cpuUsage(cpu);
  report.seeds.push({
    seed: w.seed,
    pack: w.pack,
    months: w.month,
    reason: w.terminalReason,
    elapsedMs: Math.round(performance.now() - start),
    cpuMs: (timing.user + timing.system) / 1000,
    initialMemoryBytes: initialMemory,
    finalMemoryBytes: process.memoryUsage().rss,
    population: population(w),
    namedTotal: w.persons.length,
    namedAlive: w.persons.filter((p) => p.death === undefined).length,
    eventCount,
    kinds,
    trends,
    sample,
    firstPerson: w.persons[0],
    focusEvents,
    causalExamples,
  });
  await mkdir('docs/metrics', { recursive: true });
  await writeFile(
    `docs/metrics/headless-${years}${researchRate !== 1 ? '-slow-research' : ''}.json`,
    JSON.stringify(report, null, 2),
  );
  console.log(`completed ${w.seed}: ${w.month / 12} years; ${report.seeds.at(-1).elapsedMs}ms`);
}

if (eventLog) {
  eventLog.end();
  await once(eventLog, 'finish');
}
