import { expect, it } from 'vitest';
import { createWorld } from '../packages/world-packs/index.js';
import { normalizeEarthPolityLabels } from '../packages/world-packs/earth/labels.js';

it('repairs source regime labels without altering a simulated polity name or its physics', () => {
  const w = createWorld('labels');
  w.pack.id = 'earth-labels';
  w.calendar = { startYear: 1900, mode: 'historical-simulation', sources: [] };
  const [china, korea] = w.polities;
  china.id = 'CHN';
  china.name = '中华人民共和国';
  korea.id = 'PRK';
  korea.name = '模拟中的自由朝鲜';
  const before = structuredClone(w);
  expect(normalizeEarthPolityLabels(w)).toEqual([
    { polityId: 'CHN', previous: '中华人民共和国', name: '中国' },
  ]);
  expect(korea.name).toBe('模拟中的自由朝鲜');
  expect(normalizeEarthPolityLabels(w)).toEqual([]);
  before.polities[0].name = '中国';
  expect(w).toEqual(before);
});
