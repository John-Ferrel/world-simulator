import { earthPolityLabel } from './labels.js';
import historicalPopulation from './population-1900.json' with { type: 'json' };
import { initializeLife } from '../../cognition/life.js';
import geography from './geography.json' with { type: 'json' };
import { createWorld, newPerson } from '../index.js';
import { population, type World, type Settlement } from '../../contracts/index.js';
import { random } from '../../simulation-core/random.js';
export const EARTH_PACK = {
  id: 'earth-1900',
  version: '3.0.1',
  name: '地球 · 人生模拟',
  description: '真实地理与公开资料构成起点，人物及其后续经历属于模拟。',
  baselineYear: 1900,
  source: 'Natural Earth',
  sourceUrl: 'https://www.naturalearthdata.com/',
  populationYear: 1900,
};
export { distance } from './geography.js';
import { connectEarthCities } from './geography.js';
import { applyHistoricalStartControl } from '../../sovereignty/index.js';
export function createEarthWorld(
  seed = 'earth-1',
  epoch = 1,
  maxYears = 300,
  startYear = 1900,
): World {
  const w = createWorld(seed, epoch, maxYears);
  w.pack = { id: `earth-${startYear}`, version: EARTH_PACK.version };
  w.calendar = {
    startYear,
    mode: 'historical-simulation',
    sources: [
      {
        name: 'Natural Earth countries and populated places',
        url: 'https://www.naturalearthdata.com/',
        dataYear: 2019,
      },
      {
        name: 'Historical population (OWID / Gapminder)',
        url: historicalPopulation.url,
        dataYear: startYear === 1900 ? 1900 : 2019,
      },
    ],
  };
  w.parameters.lifeComplexity = true;
  w.parameters.openHistory = true;
  w.organizations = [];
  w.conflicts = [];
  w.persons = [];
  w.polities = [];
  w.settlements = [];
  w.routes = [];
  w.shocks = [];
  w.appliedSourceEvents = [];
  const colors = [
    '#73ae8d',
    '#c2ac75',
    '#b8888e',
    '#829fc1',
    '#b59a7d',
    '#a896bd',
    '#81b1b0',
    '#c09b79',
  ];
  const countries = geography.countries
    .filter((c) => c.id !== 'ATA' && c.population > 1000)
    .map((c) => ({
      ...c,
      population:
        startYear === 1900
          ? Math.max(
              1,
              (historicalPopulation.byCode as Record<string, number>)[c.id] ??
                Math.round((c.population * 1627273655) / 7654000000),
            )
          : c.population,
      populationYear: startYear === 1900 ? 1900 : c.populationYear,
    }));
  for (const c of countries)
    w.polities.push({
      id: c.id,
      name: earthPolityLabel(c.id, c.name),
      color: colors[Math.floor(random(seed, c.id, 'color') * colors.length)],
      treasury: c.population * 1.5,
      legitimacy: 0.65,
      tax: 0.06,
      military: 40,
      research: 0,
      leaderId: '',
      realWorld: {
        iso3: c.id,
        population: c.population,
        populationYear: c.populationYear,
        gdpMillions: c.gdpMillions,
      },
    });
  for (const country of countries) {
    const cities = geography.cities.filter((c) => c.countryId === country.id);
    const weight = cities.reduce((n, c) => n + c.population, 0);
    let assigned = 0;
    for (let i = 0; i < cities.length; i++) {
      const c = cities[i];
      const n =
        i === cities.length - 1
          ? country.population - assigned
          : Math.floor((country.population * c.population) / weight);
      assigned += n;
      const prosperity = Math.max(
        0.25,
        Math.min(
          0.9,
          0.35 +
            Math.log10(
              Math.max(
                1000,
                (country.gdpMillions * 1e6) /
                  Math.max(1, geography.countries.find((c) => c.id === country.id)!.population),
              ),
            ) /
              12 -
            (startYear === 1900 ? 0.25 : 0),
        ),
      );
      const children = Math.floor(n * 0.24),
        elders = Math.floor(n * 0.1);
      const s: Settlement = {
        id: c.id,
        name: earthPolityLabel(c.id, c.name),
        x: (c.lon + 180) * 4,
        y: (85 - c.lat) * 4,
        lon: c.lon,
        lat: c.lat,
        biome: Math.abs(c.lat) > 48 ? 'forest' : Math.abs(c.lat) < 25 ? 'plains' : 'hills',
        neighbors: [],
        polityId: country.id,
        cohort: { id: `cohort-${c.id}`, children, adults: n - children - elders, elders },
        food: n * 4,
        coin: n * 15,
        fertility: 1.06,
        knowledge: 0.22,
        prosperity,
        scarcity: 0,
        price: 1,
        unrest: 0,
        birthRemainder: 0,
        deathRemainder: 0,
        economy: {
          unemployment: 0.05,
          healthcare: prosperity,
          education: prosperity,
          infrastructure: prosperity,
          inflation: 0.02,
          productionMultiplier: 1,
          tradeMultiplier: 1,
        },
        sourcePopulation: n,
      };
      w.settlements.push(s);
    }
  }
  connectEarthCities(w);
  applyHistoricalStartControl(w);
  const first = ['陈远', '林晓', '许安', '周宁', '苏禾', '沈言', '叶清', '陆遥'];
  const international = [
    'Alex',
    'Maya',
    'Noah',
    'Amara',
    'Sofia',
    'Yusuf',
    'Aiko',
    'Lina',
    'Daniel',
    'Amina',
    'Ren',
    'Sara',
  ];
  for (let i = 0; i < 1500; i++) {
    const s = w.settlements[Math.floor((i * w.settlements.length) / 1500)];
    if (s.cohort.adults < 1) continue;
    const p = newPerson(
      w,
      `earth-person-${i}`,
      s.id,
      i,
      18 + Math.floor(random(seed, i, 'age') * 48),
    );
    p.name = ['CHN', 'TWN'].includes(s.regionId ?? s.polityId)
      ? first[i % first.length] + String(Math.floor(i / first.length) || '')
      : international[i % international.length] +
        ' ' +
        ['Reed', 'Kim', 'Silva', 'Khan', 'Martin', 'Sato'][Math.floor(i / 12) % 6];
    p.occupation = [
      '教师',
      startYear < 1950 ? '抄写员' : '程序员',
      '医护人员',
      '工程师',
      '店员',
      '研究员',
      startYear < 1910 ? '商贩' : '司机',
      '设计师',
    ][i % 8];
    p.appearance = {
      skin: i % 8,
      hair: i % 12,
      clothes: i % 12,
      doll: { bodyType: i % 2 ? 'female' : 'male' },
    };
    p.coin = Math.min(s.coin, 20 + Math.floor(random(seed, p.id, 'savings') * 80));
    s.coin -= p.coin;
    s.cohort.adults--;
    initializeLife(p, w);
    w.persons.push(p);
  }
  for (const c of w.polities) {
    const p = w.persons.find(
      (p) => w.settlements.find((s) => s.id === p.locationId)?.polityId === c.id,
    );
    if (p) {
      c.leaderId = p.id;
      p.title = '地方代表（模拟）';
    }
  }
  w.baselinePopulation = population(w);
  return w;
}
