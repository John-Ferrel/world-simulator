import { writeFileSync } from 'node:fs';
import { VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { ensureWorldNews, recentWorldNews } from '../packages/v4/world-news.js';
import { politicalSnapshot } from '../packages/v4/political-world/index.js';
import type { WorldState } from '../packages/v4/domain.js';

const world = applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED) as WorldState);
const years: {
  year: number;
  polity: string;
  government: string;
  leader?: string;
  news: number;
  reference: { date: string; title: string }[];
  simulation: number;
  ambient: number;
  rumor: number;
  pressures: Record<string, number>;
}[] = [];

for (let year = 1912; year <= 1920; year += 1) {
  world.date = { year, month: 12 };
  ensureWorldNews(world, world.date);
  const snapshot = politicalSnapshot(year, 12);
  const news = recentWorldNews(world, { limit: 300 });
  years.push({
    year,
    polity: snapshot.viennaPolity?.name ?? '未知',
    government: snapshot.viennaPolity?.government ?? '',
    leader: snapshot.leaders.find(
      (leader) => leader.polityId === snapshot.viennaPolity?.id && leader.role === 'head_of_state',
    )?.name,
    news: news.length,
    reference: news
      .filter((item) => item.provenance === 'reference')
      .map((item) => ({
        date: `${item.date.year}.${String(item.date.month).padStart(2, '0')}`,
        title: item.title,
      }))
      .slice(0, 12),
    simulation: news.filter((item) => item.provenance === 'simulation').length,
    ambient: news.filter((item) => item.provenance === 'ambient').length,
    rumor: news.filter((item) => item.provenance === 'rumor').length,
    pressures: {
      political_tension: Number((world.pressures.political_tension ?? 0).toFixed(2)),
      war_fear: Number((world.pressures.war_fear ?? 0).toFixed(2)),
      persecution_pressure: Number((world.pressures.persecution_pressure ?? 0).toFixed(2)),
      economic_anxiety: Number((world.pressures.economic_anxiety ?? 0).toFixed(2)),
    },
  });
}

writeFileSync('docs/v4/phase-23-news-1912-1920.json', `${JSON.stringify(years, null, 2)}\n`);
console.log(JSON.stringify(years.map((entry) => ({
  year: entry.year,
  polity: entry.polity,
  leader: entry.leader,
  news: entry.news,
  reference: entry.reference.length,
  pressures: entry.pressures,
})), null, 2));
