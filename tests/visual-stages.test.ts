import { describe, expect, it } from 'vitest';
import { appearanceLayers } from '../packages/visuals/paper-doll.js';

const person = {
  appearance: {
    skin: 1,
    hair: 2,
    clothes: 3,
    doll: { bodyType: 'female' as const },
  },
  occupation: '居民',
  health: 1,
  life: undefined,
};

const ids = (age: number) => appearanceLayers({ ...person, age }).map((layer) => layer.asset.id);

describe('life-stage paper doll', () => {
  it('uses infant/child assets and does not put adult hair on a newborn', () => {
    const newborn = appearanceLayers({ ...person, age: 0 });
    expect(newborn.some((layer) => layer.asset.id === 'body_bodies_child')).toBe(true);
    expect(newborn.some((layer) => layer.asset.id === 'head_heads_human_child')).toBe(true);
    expect(newborn.some((layer) => layer.asset.slot === 'hair')).toBe(false);
  });

  it('uses child body/head and a reduced hair layer for a school-age child', () => {
    const child = appearanceLayers({ ...person, age: 8 });
    expect(child.some((layer) => layer.asset.id === 'body_bodies_child')).toBe(true);
    expect(child.some((layer) => layer.asset.id === 'head_heads_human_child')).toBe(true);
    expect(child.find((layer) => layer.asset.slot === 'hair')?.scale).toBe(0.8);
  });

  it('uses a teen body consistently for adolescents', () => {
    const teen = appearanceLayers({ ...person, age: 15 });
    expect(teen.some((layer) => layer.asset.id === 'body_bodies_teen')).toBe(true);
    expect(teen.some((layer) => layer.asset.id === 'head_heads_human_child')).toBe(true);
  });

  it('switches to adult body/head and elderly head with grey hair later', () => {
    const adult = ids(30);
    expect(adult.some((id) => id === 'body_bodies_female')).toBe(true);
    expect(adult.some((id) => id === 'head_heads_human_female')).toBe(true);
    const elder = appearanceLayers({ ...person, age: 72 });
    expect(elder.some((layer) => layer.asset.id.includes('elderly'))).toBe(true);
    expect(elder.find((layer) => layer.asset.slot === 'hair')?.color).toBe('#bcb8b0');
  });
});
