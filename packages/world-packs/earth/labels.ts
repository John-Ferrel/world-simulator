import type { World } from '../../contracts/index.js';

// Geographic/common labels stay valid when simulated regimes diverge. The raw
// Natural Earth source remains unchanged and is never a dated regime assertion.
const COMMON_LABELS: Readonly<Record<string, string>> = {
  CHN: '中国',
  PRK: '朝鲜',
  COD: '刚果（金）',
  COG: '刚果（布）',
  CAF: '中非',
  CYN: '北塞浦路斯',
};
const SOURCE_LABELS: Readonly<Record<string, string>> = {
  CHN: '中华人民共和国',
  PRK: '朝鲜民主主义人民共和国',
  COD: '刚果民主共和国',
  COG: '刚果共和国',
  CAF: '中非共和国',
  CYN: '北塞浦路斯土耳其共和国',
};
export function earthPolityLabel(id: string, original: string): string {
  return COMMON_LABELS[id] ?? original;
}
export function normalizeEarthPolityLabels(w: World) {
  if (!w.calendar || !w.pack.id.startsWith('earth-')) return [];
  const corrections: { polityId: string; previous: string; name: string }[] = [];
  for (const p of w.polities) {
    const name = p.name === SOURCE_LABELS[p.id] ? earthPolityLabel(p.id, p.name) : p.name;
    if (name !== p.name) {
      corrections.push({ polityId: p.id, previous: p.name, name });
      p.name = name;
    }
  }
  for (const p of w.sovereignty?.modernPolityRegistry ?? [])
    if (p.name === SOURCE_LABELS[p.id]) p.name = earthPolityLabel(p.id, p.name);
  return corrections;
}
