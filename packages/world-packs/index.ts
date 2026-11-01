import manifest from './manifest.json' with { type: 'json' };
import type { World, Person } from '../contracts/index.js';
import { population } from '../contracts/index.js';
import { random } from '../simulation-core/random.js';
export const PACK = {
  ...manifest,
  id: 'ashen-tides',
  version: '1.0.0',
  name: '余烬与潮汐',
  description:
    '六方城邦环绕暮潮内海。北方林地出产木料，河谷供应粮食，南方工坊依赖商路。没有预定的英雄，也没有预定的末日。',
};
const roots = ['苇', '雾', '松', '白', '暮', '石', '柳', '银', '霜', '鸦', '泉', '麦'];
const ends = ['湾', '渡', '原', '港', '岭', '城'];
const first = [
  '阿岚',
  '伊芙',
  '莱恩',
  '米拉',
  '索恩',
  '诺雅',
  '艾达',
  '罗文',
  '瑟琳',
  '奥林',
  '维拉',
  '卡尔',
  '菲恩',
  '露娅',
  '泰伦',
  '宁',
];
const last = ['苇舟', '灰林', '长溪', '石桥', '暮羽', '麦穗', '霜叶', '远丘'];
export function newPerson(
  w: World,
  id: string,
  locationId: string,
  index: number,
  age: number,
): Person {
  const r = (key: string) => random(w.seed, id, key);
  return {
    id,
    version: 0,
    name: `${first[index % first.length]}·${last[Math.floor(index / first.length) % last.length]}`,
    birth: w.month - age * 12,
    locationId,
    originCohortId: `cohort-${locationId}`,
    parents: [],
    householdId: `household-${id}`,
    occupation: ['农人', '织工', '学徒', '商贩', '抄写员'][index % 5],
    coin: 8 + Math.floor(r('coin') * 12),
    health: 0.85 + r('health') * 0.15,
    stress: 0.1,
    values: { care: r('care'), ambition: r('ambition'), tradition: r('tradition') },
    skills: { craft: 0.2 + r('craft') * 0.5, learning: 0.1 + r('learn') * 0.5 },
    goals: [
      {
        id: `goal-${id}-initial`,
        kind: 'belong',
        strength: 0.5,
        progress: 0,
        status: 'active',
        causeIds: [],
      },
    ],
    memories: [],
    beliefs: [],
    relationships: [],
    plans: [],
    commitments: [],
    appearance: { skin: index % 4, hair: Math.floor(index / 4) % 4, clothes: index % 6 },
  };
}
export function createWorld(
  seed = 'tide-1',
  epoch = 1,
  maxYears = 300,
  parameters = { researchRate: 1 },
): World {
  if (
    !Number.isFinite(parameters.researchRate) ||
    parameters.researchRate < 0.01 ||
    parameters.researchRate > 1
  )
    throw new Error('Invalid research rate');
  const w: World = {
    schema: 'slw/1',
    id: `world-${epoch}-${seed.replace(/[^a-z0-9]/gi, '').slice(0, 24)}`,
    seed,
    epoch,
    month: 0,
    revision: 0,
    pack: { id: PACK.id, version: PACK.version },
    status: 'running',
    parameters,
    baselinePopulation: 0,
    collapseMonths: 0,
    maxYears,
    settlements: [],
    polities: [],
    persons: [],
    organizations: [],
    conflicts: [],
    claims: [],
    eventSeq: 0,
    appliedCommands: [],
    processedJobs: [],
    audit: { producedFood: 0, consumedFood: 0, destroyedFood: 0, births: 0, deaths: 0 },
    terminalEvidence: [],
  };
  const names = ['苇海同盟', '苍松公国', '白石议邦', '暮河领', '银湾商盟', '霜原诸城'];
  const colors = ['#69b8a5', '#b8a468', '#b47a7f', '#879ec4', '#bb9471', '#a693be'];
  for (let i = 0; i < 6; i++)
    w.polities.push({
      id: `polity-${i}`,
      name: names[i],
      color: colors[i],
      treasury: 3500,
      legitimacy: 0.7,
      tax: 0.08 + i * 0.005,
      leaderId: '',
      military: 40,
      research: 0,
    });
  for (let i = 0; i < 36; i++) {
    const x = i % 6,
      y = Math.floor(i / 6);
    const id = `town-${i}`;
    const neighbors = [i - 1, i + 1, i - 6, i + 6]
      .filter((n) => n >= 0 && n < 36 && (Math.abs(n - i) === 6 || Math.floor(n / 6) === y))
      .map((n) => `town-${n}`);
    w.settlements.push({
      id,
      name: roots[i % 12] + ends[Math.floor(i / 6)],
      x: 80 + x * 110 + random(seed, id, 'x') * 35,
      y: 65 + y * 85 + random(seed, id, 'y') * 25,
      biome: y < 2 ? 'forest' : x > 3 ? 'hills' : 'plains',
      neighbors,
      polityId: `polity-${Math.floor(i / 6)}`,
      cohort: { id: `cohort-${id}`, children: 450, adults: 1200, elders: 170 },
      food: 6500,
      coin: 5000,
      fertility: 0.98 + random(seed, id, 'fertility') * 0.18,
      knowledge: 0.08,
      prosperity: 0.65,
      scarcity: 0,
      price: 1,
      unrest: 0,
      birthRemainder: 0,
      deathRemainder: 0,
    });
  }
  for (let i = 0; i < 1000; i++) {
    const s = w.settlements[i % 36];
    s.cohort.adults--;
    w.persons.push(
      newPerson(w, `person-${i}`, s.id, i, 18 + Math.floor(random(seed, i, 'age') * 50)),
    );
  }
  w.polities.forEach((p, i) => {
    p.leaderId = w.persons[i * 6].id;
    w.persons[i * 6].title = '议事长';
  });
  for (let i = 0; i < 6; i++) {
    const leader = w.persons[i * 6];
    w.organizations.push({
      id: `org-initial-${i}`,
      name: `${w.polities[i].name}粮业会`,
      kind: 'guild',
      locationId: leader.locationId,
      creatorId: leader.id,
      leaderId: leader.id,
      memberIds: w.persons
        .filter((p) => p.locationId === leader.locationId)
        .slice(0, 5)
        .map((p) => p.id),
      treasury: 150,
      founded: 0,
      status: 'active',
      definition: {
        version: 1,
        kind: 'guild',
        name: '粮业会',
        mechanism: 'pooled_production',
        upkeep: 2,
        dues: 1,
        effect: 0.05,
        ttlMonths: 1200,
        maxMembers: 50,
      },
      progress: 0,
      insolventMonths: 0,
      adoption: 0.1,
      causeIds: [],
    });
  }
  w.baselinePopulation = population(w);
  return w;
}
