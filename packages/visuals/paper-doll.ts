import catalog from './catalog.json';
import type { DollConfig, Person } from '../contracts/index.js';
export type DollAsset = (typeof catalog.assets)[number];
export const dollAssets = catalog.assets;
export const skinPalette = [
  '#edc8ac',
  '#d3a080',
  '#b77b55',
  '#805339',
  '#624332',
  '#f3dbc3',
  '#ac8b70',
  '#765e4b',
  '#e1c1a0',
  '#a76c4e',
  '#d1ac91',
  '#584132',
];
export const hairPalette = [
  '#252129',
  '#603f2d',
  '#936847',
  '#c9aa65',
  '#cfbfa2',
  '#6b4935',
  '#b2aca6',
  '#aa573e',
  '#41495e',
  '#d9d6cd',
  '#756854',
  '#b78c75',
  '#242e36',
  '#864b35',
  '#aa9180',
  '#544c47',
];
export const textilePalette = [
  '#687f57',
  '#975e55',
  '#568293',
  '#887199',
  '#b39966',
  '#597c78',
  '#d3c7ae',
  '#3d4557',
  '#8094a1',
  '#ad896f',
  '#6d6965',
  '#567268',
  '#9c7685',
  '#c1a774',
  '#8f9b80',
  '#d9dbd4',
];
const choose = (slot: string, body: string, index = 0) => {
  const options = dollAssets.filter(
    (a) => a.slot === slot && (a.body === body || a.body === 'any'),
  );
  return options[Math.abs(index) % options.length] ?? dollAssets.find((a) => a.slot === slot);
};
export function compatibleAssets(slot: string, body: string) {
  return dollAssets.filter(
    (a) =>
      a.slot === slot &&
      (a.body === 'any' ||
        a.body === body ||
        (body === 'muscular' && a.body === 'male') ||
        (body === 'teen' && a.body === 'male')),
  );
}
export function appearanceLayers(
  p: Pick<Person, 'appearance' | 'occupation' | 'health' | 'death' | 'life'> & {
    age?: number;
    stress?: number;
  },
  direction = 2,
) {
  const a = p.appearance,
    d: DollConfig = a.doll ?? {},
    age = p.age ?? 20,
    requestedBody = d.bodyType ?? (a.hair % 2 ? 'female' : 'male'),
    stage = age < 13 ? 'child' : age < 18 ? 'teen' : age >= 65 ? 'elder' : 'adult',
    bodySlot = stage === 'child' ? 'child' : stage === 'teen' ? 'teen' : requestedBody,
    clothingBody =
      stage === 'child' || stage === 'teen'
        ? 'teen'
        : requestedBody === 'female'
          ? 'female'
          : 'male';
  const fits = (asset: DollAsset, body: string) => asset.body === 'any' || asset.body === body;
  const find = (id: string | undefined, slot: string, fallback = 0, body = clothingBody) =>
    dollAssets.find((v) => v.id === id && v.slot === slot && fits(v, body)) ??
    choose(slot, body, fallback);
  const layers: { asset: DollAsset; color?: string; scale?: number }[] = [];
  const add = (asset: DollAsset | undefined, color?: string, scale?: number) => {
    if (asset) layers.push({ asset, color: asset.tint === 'none' ? undefined : color, scale });
  };
  add(choose('body', bodySlot), skinPalette[a.skin % skinPalette.length]);
  let head =
    stage === 'child' || stage === 'teen'
      ? dollAssets.find((v) => v.slot === 'head' && v.body === 'child')
      : find(d.head, 'head', 0, requestedBody === 'female' ? 'female' : 'male');
  if (stage === 'elder')
    head =
      dollAssets.find(
        (v) =>
          v.slot === 'head' &&
          v.body === (requestedBody === 'female' ? 'female' : 'male') &&
          v.id.includes('elderly'),
      ) ?? head;
  add(head, skinPalette[a.skin % skinPalette.length]);
  const expression =
    p.life?.emotions.grief && p.life.emotions.grief > 0.4
      ? 'sad'
      : p.life?.emotions.anger && p.life.emotions.anger > 0.5
        ? 'anger'
        : p.life?.emotions.fear && p.life.emotions.fear > 0.55
          ? 'shock'
          : undefined;
  const expressionBody = requestedBody === 'female' ? 'female' : 'male';
  const face = expression
    ? dollAssets.find(
        (v) =>
          v.slot === 'expression' && v.body === expressionBody && v.id.endsWith(`_${expression}`),
      )
    : d.expression
      ? dollAssets.find((v) => v.id === d.expression && v.slot === 'expression')
      : undefined;
  if (face) add(face, skinPalette[a.skin % skinPalette.length]);
  if (d.nose && d.nose !== 'none')
    add(
      dollAssets.find((v) => v.id === d.nose && v.slot === 'nose'),
      skinPalette[a.skin % skinPalette.length],
    );
  if (d.ears && d.ears !== 'none')
    add(
      dollAssets.find((v) => v.id === d.ears && v.slot === 'ears'),
      skinPalette[a.skin % skinPalette.length],
    );
  if (d.eyebrows && d.eyebrows !== 'none')
    add(
      dollAssets.find((v) => v.id === d.eyebrows && v.slot === 'eyebrows'),
      d.hairColor ?? hairPalette[a.hair % hairPalette.length],
    );
  if (d.earrings && d.earrings !== 'none')
    add(dollAssets.find((v) => v.id === d.earrings && v.slot === 'earrings'));
  if (p.life?.illness && (!d.mask || d.mask === 'none'))
    add(dollAssets.find((v) => v.slot === 'mask'));

  add(find(d.bottom, 'bottom', a.clothes), d.bottomColor ?? '#414953');
  add(find(d.shoes, 'shoes'), d.shoeColor ?? '#4b3c35');
  add(
    find(d.top, 'top', a.clothes),
    d.topColor ?? textilePalette[a.clothes % textilePalette.length],
  );
  if (stage !== 'child' && d.beard && d.beard !== 'none' && requestedBody !== 'female')
    add(
      dollAssets.find((v) => v.id === d.beard && v.slot === 'beard'),
      d.hairColor ?? hairPalette[a.hair % hairPalette.length],
    );
  let hair: DollAsset | undefined = find(d.hairStyle, 'hair', a.hair, 'any');
  if (stage === 'child')
    hair =
      dollAssets.find(
        (v) => v.slot === 'hair' && /buzzcut|plain|pixie|bob|curly_short|bangs|pigtails/.test(v.id),
      ) ?? hair;
  if (age < 3) hair = undefined;
  add(
    hair,
    age > 60 ? '#bcb8b0' : (d.hairColor ?? hairPalette[a.hair % hairPalette.length]),
    stage === 'child' || stage === 'teen' ? 0.8 : 1,
  );
  for (const [slot, id, color] of [
    ['coat', d.coat, d.coatColor ?? '#5d6a73'],
    ['glasses', d.glasses, undefined],
    ['hat', d.hat, d.topColor],
    ['backpack', d.backpack, '#79634d'],
    ['mask', d.mask, '#ccd7cb'],
  ] as const) {
    if (id && id !== 'none') {
      const asset = dollAssets.find((v) => v.slot === slot && v.id === id);
      if (asset && fits(asset, clothingBody)) add(asset, color);
    }
  }
  return layers.sort((a, b) => a.asset.z - b.asset.z);
}
