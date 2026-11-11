import { describe, expect, it } from 'vitest';
import { VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { eventTitleFor } from '../packages/v4/event-titles.js';
import { ensureWorldNews, recentWorldNews } from '../packages/v4/world-news.js';
import {
  politicalSnapshot,
  validatePoliticalWorld,
} from '../packages/v4/political-world/index.js';
import { GENERATED_STATE_PACKS } from '../packages/v4/content/states/index.js';
import type { EventFact, WorldState } from '../packages/v4/domain.js';

function seed(): WorldState {
  return applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED) as WorldState);
}

describe('Phase 23 political world', () => {
  it('validates polities, parties, tensions and sources', () => {
    const result = validatePoliticalWorld();
    expect(result.errors).toEqual([]);
    expect(result.ok).toBe(true);
    expect(result.polities).toBeGreaterThan(60);
    expect(result.tensions).toBeGreaterThan(20);
    expect(result.isoCoverage).toBeGreaterThan(80);
  });

  it('gives 1912 a Habsburg, German, Russian and Ottoman world', () => {
    const snapshot = politicalSnapshot(1912, 1);
    const names = snapshot.polities.map((polity) => polity.name);
    expect(names).toContain('奥匈帝国');
    expect(names).toContain('德意志帝国');
    expect(names).toContain('俄罗斯帝国');
    expect(names).toContain('奥斯曼帝国');
    expect(snapshot.viennaPolity?.name).toBe('奥匈帝国');
    expect(snapshot.leaders.some((leader) => leader.name === '弗朗茨·约瑟夫一世')).toBe(true);
    expect(snapshot.parties.some((party) => party.id === 'at-sdap')).toBe(true);
    expect(snapshot.parties.some((party) => party.id === 'at-christian-social')).toBe(true);
    expect(snapshot.tensions.some((tension) => tension.title.includes('巴尔干'))).toBe(true);
    expect(snapshot.map.AUT?.name).toBe('奥匈帝国');
    expect(snapshot.map.DEU?.name).toBe('德意志帝国');
    expect(snapshot.map.RUS?.name).toBe('俄罗斯帝国');
    expect(snapshot.map.TUR?.name).toBe('奥斯曼帝国');
  });

  it('changes the map and the Vienna polity across 1918, 1938, 1945 and 1955', () => {
    expect(politicalSnapshot(1918, 1).viennaPolity?.name).toBe('奥匈帝国');
    expect(politicalSnapshot(1918, 12).viennaPolity?.name).toContain('奥地利');
    expect(politicalSnapshot(1938, 1).map.AUT?.name).toContain('奥地利');
    expect(politicalSnapshot(1938, 6).map.AUT?.name).toContain('德意志');
    expect(politicalSnapshot(1945, 1).viennaPolity?.name).toContain('德意志');
    expect(politicalSnapshot(1945, 6).viennaPolity?.name).toContain('被占领');
    expect(politicalSnapshot(1955, 1).viennaPolity?.name).toContain('被占领');
    expect(politicalSnapshot(1955, 6).viennaPolity?.name).toContain('第二共和国');
  });

  it('seeds actual party and state organizations with positions', () => {
    const world = seed();
    expect(world.organizations['org-christian-social-party']?.kind).toBe('party');
    expect(world.organizations['org-german-national-association']?.kind).toBe('party');
    expect(world.organizations['org-austrian-state-1912']?.kind).toBe('state');
    expect(world.positions['pos-habsburg-emperor-1912']?.title).toContain('Kaiser');
    expect(world.positions['pos-austrian-minister-president-1912']?.title).toBe('Ministerpräsident');
  });
});

describe('Phase 23 world news', () => {
  it('seeds deterministic ambient and rumor news with era pressures', () => {
    const world = seed();
    expect(world.news?.length ?? 0).toBeGreaterThan(0);
    expect(world.news?.some((item) => item.provenance === 'ambient')).toBe(true);
    expect(world.news?.some((item) => item.provenance === 'rumor')).toBe(true);
    expect(world.pressures.political_tension).toBeGreaterThan(0.5);
    expect(world.pressures.war_fear).toBeGreaterThan(0.5);
    expect(world.pressures.economic_anxiety).toBeGreaterThan(0);
  });

  it('does not duplicate items when ensureWorldNews runs twice', () => {
    const world = seed();
    const before = world.news?.length ?? 0;
    ensureWorldNews(world);
    ensureWorldNews(world);
    expect(world.news?.length).toBe(before);
    const ids = (world.news ?? []).map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('turns a public committed event into simulation news', () => {
    const world = seed();
    const source = world.events[0]!;
    const event: EventFact = {
      ...source,
      id: 'test-phase23-public-event',
      date: { year: 1912, month: 5 },
      title: '码头工人宣布罢工',
      immediateText: '码头工人把货箱停在铁轨上，要求增加工钱；警察在仓库门口列队。',
      visibility: 'public',
      significance: 0.9,
      tags: ['strike', 'public'],
    };
    world.events = [...world.events, event];
    world.date = { year: 1912, month: 6 };
    world.news = [];
    ensureWorldNews(world);
    const item = world.news?.find((entry) => entry.relatedEventIds?.includes(event.id));
    expect(item).toBeDefined();
    expect(item?.provenance).toBe('simulation');
    expect(item?.title).toBe('码头工人宣布罢工');
    expect(item?.category).toBe('society');
  });

  it('filters the gazette by scope and provenance', () => {
    const world = seed();
    const local = recentWorldNews(world, { scope: 'local', limit: 10 });
    expect(local.every((item) => item.scope === 'local')).toBe(true);
    const rumors = recentWorldNews(world, { provenance: 'rumor', limit: 10 });
    expect(rumors.every((item) => item.provenance === 'rumor')).toBe(true);
    expect(rumors.every((item) => item.reliability === 'rumor')).toBe(true);
  });
});

describe('Phase 23 event titles', () => {
  it('prefers the per-outcome title over the scene title', () => {
    expect(eventTitleFor('new-scene/outcome', '场景标题', '结果标题')).toBe('结果标题');
  });

  it('uses a verified legacy overlay for high-frequency outcomes', () => {
    expect(
      eventTitleFor(
        'vienna-housing-move.rent-notice/rent-notice-pay',
        '房租通知',
        undefined,
      ),
    ).toBe('房东把租金又涨了一截');
  });

  it('falls back to the scene title when no outcome title exists', () => {
    expect(eventTitleFor('unknown-scene/outcome', '一封不该再来的信')).toBe('一封不该再来的信');
  });
});

describe('Phase 23 high-stakes pack', () => {
  it('registers 18 kernels with a title on every outcome', () => {
    const pack = GENERATED_STATE_PACKS.find((entry) => entry.id === 'pack-phase23-high-stakes');
    expect(pack).toBeDefined();
    expect(pack?.kernels?.length).toBe(18);
    expect(pack?.states.map((state) => state.id)).toEqual([
      'p23-dangerous-secret',
      'p23-political-debt',
    ]);
    for (const kernel of pack?.kernels ?? []) {
      for (const outcome of kernel.outcomes) {
        expect(outcome.title?.trim().length ?? 0, `${kernel.id}/${outcome.id}`).toBeGreaterThan(3);
      }
    }
  });
});
