import { readFileSync, writeFileSync } from 'node:fs';

type Dossier = {
  seed: string;
  events: number;
  persons: number;
  alive: number;
  date: { year: number; month: number };
  lives: {
    name: string;
    born: { year: number; month: number };
    events: {
      date: { year: number; month: number };
      action: string;
      title?: string;
      immediateText: string;
      significance: number;
    }[];
  }[];
  critiques: { metrics: { repeatRate: number } };
  activation: {
    packActivation: {
      pack: string;
      totalKernelEvents: number;
      kernelHits: Record<string, number>;
      stateAdds: Record<string, number>;
    }[];
  };
  newsProvenanceCounts?: Record<string, number>;
};

const seeds = ['a', 'b', 'c'];
const dossiers = seeds.map(
  (seed) => JSON.parse(readFileSync(`docs/v4/phase-15-phase23-${seed}.json`, 'utf8')) as Dossier,
);
const earlyNews = JSON.parse(
  readFileSync('docs/v4/phase-23-news-1912-1920.json', 'utf8'),
) as unknown[];

const aggregate = {
  events: 0,
  focal: 0,
  adultFocal: 0,
  dramaFocal: 0,
  adultDramaFocal: 0,
  p23Focal: 0,
  p23AdultFocal: 0,
  lives: 0,
  livesWithAdultDrama: 0,
  livesWithP23: 0,
  repeatRateMean: 0,
  p23World: 0,
  p23StateAdds: {} as Record<string, number>,
  p23KernelHits: {} as Record<string, number>,
  news: {} as Record<string, number>,
  topP23Titles: {} as Record<string, number>,
};

const perSeed: unknown[] = [];
for (const dossier of dossiers) {
  let focal = 0;
  let adultFocal = 0;
  let dramaFocal = 0;
  let adultDramaFocal = 0;
  let p23Focal = 0;
  let p23AdultFocal = 0;
  let livesWithAdultDrama = 0;
  let livesWithP23 = 0;
  for (const life of dossier.lives) {
    let hasAdultDrama = false;
    let hasP23 = false;
    for (const event of life.events) {
      const age = event.date.year - life.born.year + (event.date.month - life.born.month) / 12;
      const isDrama = /^(p21-|p22-|p23-)/.test(event.action);
      const isP23 = event.action.startsWith('p23-');
      focal += 1;
      if (age >= 18) adultFocal += 1;
      if (isDrama) dramaFocal += 1;
      if (isDrama && age >= 18) {
        adultDramaFocal += 1;
        hasAdultDrama = true;
      }
      if (isP23) {
        p23Focal += 1;
        hasP23 = true;
        if (event.title) {
          aggregate.topP23Titles[event.title] = (aggregate.topP23Titles[event.title] ?? 0) + 1;
        }
      }
      if (isP23 && age >= 18) p23AdultFocal += 1;
    }
    aggregate.lives += 1;
    if (hasAdultDrama) livesWithAdultDrama += 1;
    if (hasP23) livesWithP23 += 1;
  }
  const p23Pack = dossier.activation.packActivation.find(
    (pack) => pack.pack === 'pack-phase23-high-stakes',
  );
  const row = {
    seed: dossier.seed,
    events: dossier.events,
    persons: dossier.persons,
    alive: dossier.alive,
    endDate: dossier.date,
    focal,
    adultFocal,
    dramaFocal,
    adultDramaFocal,
    adultDramaShare: Number((adultDramaFocal / Math.max(1, adultFocal)).toFixed(4)),
    p23Focal,
    p23AdultFocal,
    p23FocalShare: Number((p23Focal / Math.max(1, focal)).toFixed(4)),
    lives: dossier.lives.length,
    livesWithAdultDrama,
    livesWithP23,
    repeatRate: dossier.critiques.metrics.repeatRate,
    p23World: p23Pack?.totalKernelEvents ?? 0,
    p23StateAdds: p23Pack?.stateAdds ?? {},
    p23KernelHits: p23Pack?.kernelHits ?? {},
    news: dossier.newsProvenanceCounts ?? {},
  };
  perSeed.push(row);
  aggregate.events += dossier.events;
  aggregate.focal += focal;
  aggregate.adultFocal += adultFocal;
  aggregate.dramaFocal += dramaFocal;
  aggregate.adultDramaFocal += adultDramaFocal;
  aggregate.p23Focal += p23Focal;
  aggregate.p23AdultFocal += p23AdultFocal;
  aggregate.livesWithAdultDrama += livesWithAdultDrama;
  aggregate.livesWithP23 += livesWithP23;
  aggregate.repeatRateMean += dossier.critiques.metrics.repeatRate;
  aggregate.p23World += p23Pack?.totalKernelEvents ?? 0;
  for (const [key, value] of Object.entries(p23Pack?.stateAdds ?? {})) {
    aggregate.p23StateAdds[key] = (aggregate.p23StateAdds[key] ?? 0) + value;
  }
  for (const [key, value] of Object.entries(p23Pack?.kernelHits ?? {})) {
    aggregate.p23KernelHits[key] = (aggregate.p23KernelHits[key] ?? 0) + value;
  }
  for (const [key, value] of Object.entries(dossier.newsProvenanceCounts ?? {})) {
    aggregate.news[key] = (aggregate.news[key] ?? 0) + value;
  }
}

aggregate.repeatRateMean = Number((aggregate.repeatRateMean / dossiers.length).toFixed(4));
const report = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  note: 'Phase 23 natural A/B/C after the per-kernel oncePerPerson history fix, 36-month state ticks, news/political pressures, and the high-stakes pack revision.',
  seeds: perSeed,
  aggregate: {
    ...aggregate,
    adultDramaShare: Number(
      (aggregate.adultDramaFocal / Math.max(1, aggregate.adultFocal)).toFixed(4),
    ),
    p23FocalShare: Number((aggregate.p23Focal / Math.max(1, aggregate.focal)).toFixed(4)),
  },
  earlyNews1912To1920: earlyNews,
  browser: {
    phase23Test: 'tests/v4-browser/phase23.spec.ts',
    screenshots: [
      'docs/v4/phase-23-browser-1912.png',
      'docs/v4/phase-23-gazette.png',
      'docs/v4/phase-23-politics.png',
      'docs/v4/phase-23-browser-later-politics.png',
      'docs/v4/phase-23-browser-later-gazette.png',
      'docs/v4/phase-23-browser-later-map.png',
    ],
  },
};
writeFileSync('docs/v4/phase-23-playtests.json', `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report.aggregate, null, 2));
