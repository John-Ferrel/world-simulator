import type { PoliticalPolity, PoliticalTension } from './types.js';
import { POLITIES_1912, TENSIONS_1912 } from './data-1912.js';
import { POLITIES_1918, TENSIONS_1918 } from './data-1918.js';
import { POLITIES_1938, TENSIONS_1938 } from './data-1938.js';
import { POLITIES_1945, TENSIONS_1945 } from './data-1945.js';
import { POLITIES_1955, TENSIONS_1955 } from './data-1955.js';
import { POLITIES_1991, TENSIONS_1991 } from './data-1991.js';

export const ALL_POLITIES: PoliticalPolity[] = [
  ...POLITIES_1912,
  ...POLITIES_1918,
  ...POLITIES_1938,
  ...POLITIES_1945,
  ...POLITIES_1955,
  ...POLITIES_1991,
];

export const ALL_TENSIONS: PoliticalTension[] = [
  ...TENSIONS_1912,
  ...TENSIONS_1918,
  ...TENSIONS_1938,
  ...TENSIONS_1945,
  ...TENSIONS_1955,
  ...TENSIONS_1991,
];

export const POLITICAL_WORLD_ERAS = [
  { id: 'era-1912', from: 1912, to: 1917, label: '战前帝国秩序' },
  { id: 'era-1918', from: 1918, to: 1937, label: '战间期与威权化' },
  { id: 'era-1938', from: 1938, to: 1944, label: '纳粹扩张与总体战' },
  { id: 'era-1945', from: 1945, to: 1954, label: '占领、重建与冷战开始' },
  { id: 'era-1955', from: 1955, to: 1990, label: '冷战与第二共和国' },
  { id: 'era-1991', from: 1991, to: 2000, label: '冷战后与欧洲一体化' },
] as const;
