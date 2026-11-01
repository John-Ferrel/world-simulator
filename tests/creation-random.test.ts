import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { BirthRequestSchema, type Settlement } from '../packages/contracts/index.js';
import { createEarthWorld } from '../packages/world-packs/earth/index.js';
import {
  NAME_CULTURES,
  availableNameCultures,
  creationCatalogStats,
  generateRichBirthDraft,
  inferNameCulture,
  rerollRichBirthDraft,
  toBirthRequest,
  type CreationSettlement,
  type CreationWorld,
  type NameCultureId,
  type RichBirthDraft,
} from '../packages/creation/random.js';

const earth = createEarthWorld('creation-random-earth', 1, 30, 1900);

function realSettlement(
  code: string,
  predicate: (settlement: Settlement) => boolean = () => true,
): Settlement {
  const site = earth.settlements.find(
    (settlement) => (settlement.regionId ?? settlement.polityId) === code && predicate(settlement),
  );
  if (!site) throw new Error(`测试世界缺少 ${code} 的真实地点`);
  return site;
}

function mineWorld(): CreationWorld {
  return {
    seed: 'frozen-world',
    month: 24,
    calendar: { startYear: 1900 },
    settlements: [
      {
        id: 'site-han',
        name: '临河港',
        regionId: 'CHN',
        polityId: 'CHN',
        lon: 121.5,
        lat: 31.2,
        cohort: { children: 20, adults: 80, elders: 10 },
      },
      {
        id: 'site-japanese',
        name: '灰坂町',
        regionId: 'JPN',
        polityId: 'JPN',
        lon: 139.7,
        lat: 35.7,
        cohort: { children: 8, adults: 40, elders: 8 },
      },
      {
        id: 'site-west-african',
        name: '盐市',
        regionId: 'NGA',
        polityId: 'NGA',
        lon: 3.4,
        lat: 6.5,
        cohort: { children: 12, adults: 60, elders: 5 },
      },
    ],
  };
}

function deepFreeze<T>(value: T): T {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const child of Object.values(value as Record<string, unknown>)) deepFreeze(child);
  }
  return value;
}

function mean(values: readonly number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function count(values: readonly string[], wanted: string): number {
  return values.filter((value) => value === wanted).length;
}

describe('seeded rich character creation', () => {
  it('contains a broad, grouped catalog rather than a handful of fixed templates', () => {
    const stats = creationCatalogStats();
    expect(stats.cultures).toBeGreaterThanOrEqual(20);
    expect(stats.surnames).toBeGreaterThanOrEqual(150);
    expect(stats.givenNames).toBeGreaterThanOrEqual(300);
    expect(stats.nameCombinations).toBeGreaterThan(1_000);
    expect(stats.wishes).toBeGreaterThanOrEqual(20);
    expect(stats.secrets).toBeGreaterThanOrEqual(20);
    expect(stats.destinyHooks).toBeGreaterThanOrEqual(20);
    expect(stats.familyBackgrounds).toBeGreaterThanOrEqual(16);
    expect(stats.personalityTendencies).toBeGreaterThanOrEqual(12);
    expect(stats.bodyNotes).toBeGreaterThanOrEqual(16);
    expect(stats.totalNarrativeCombinations).toBeGreaterThan(100_000);

    const required: NameCultureId[] = [
      'han',
      'japanese',
      'anglo',
      'south-asian',
      'arabic',
      'west-african',
      'latin-american',
    ];
    for (const id of required) {
      const culture = NAME_CULTURES[id];
      expect(culture.surnames.length).toBeGreaterThanOrEqual(8);
      expect(culture.male.length).toBeGreaterThanOrEqual(8);
      expect(culture.female.length).toBeGreaterThanOrEqual(8);
    }
    expect(
      availableNameCultures()
        .map((culture) => culture.label)
        .join(' '),
    ).toMatch(/汉|日本|南亚|阿拉伯|西非|拉丁/);
  });

  it('derives naming culture from real settlement geography and uses the world era', () => {
    expect(inferNameCulture(realSettlement('CHN'))).toBe('han');
    expect(inferNameCulture(realSettlement('JPN'))).toBe('japanese');
    expect(inferNameCulture(realSettlement('NGA'))).toBe('west-african');
    expect(inferNameCulture(realSettlement('BRA'))).toBe('latin-american');
    expect(inferNameCulture(realSettlement('IND', (site) => (site.lat ?? 99) < 15))).toBe('tamil');
    expect(inferNameCulture(realSettlement('EGY'))).toBe('arabic');

    const draft = generateRichBirthDraft(earth, { seed: 'era-check' });
    expect(draft.era.band).toBe('industrial');
    expect(draft.era.year).toBe(1900);

    const modern = generateRichBirthDraft(
      { ...mineWorld(), calendar: { startYear: 2020 } },
      { seed: 'era-check-2' },
    );
    expect(modern.era.band).toBe('contemporary');
    expect(modern.era.year).toBe(2022);
  });

  it('is reproducible for the same seed and nonce, and changes when either changes', () => {
    const first = generateRichBirthDraft(earth, { seed: 'stable-seed', nonce: 7 });
    const second = generateRichBirthDraft(earth, { seed: 'stable-seed', nonce: 7 });
    const otherNonce = generateRichBirthDraft(earth, { seed: 'stable-seed', nonce: 8 });
    const otherSeed = generateRichBirthDraft(earth, { seed: 'stable-seed-2', nonce: 7 });

    expect(first).toEqual(second);
    expect(first.seed).toBe('stable-seed#7');
    expect(otherNonce.seed).toBe('stable-seed#8');
    expect(otherNonce).not.toEqual(first);
    expect(otherSeed).not.toEqual(first);
  });

  it('applies partial overrides while still generating the remaining fields', () => {
    const site = realSettlement('JPN');
    const draft = generateRichBirthDraft(earth, {
      seed: 'override-seed',
      overrides: {
        name: '顾青梧',
        sex: 'male',
        health: 0.42,
        bodyNote: '早产，左耳听力很弱。',
        wish: '愿他学会拒绝。',
        preferredLocationId: site.id,
        cultureId: 'han',
        mode: 'legendary',
        familyBackgroundKind: 'declining_scholars',
        personalityTendency: 'skeptic',
        secretKind: 'buried_box',
        destinyHookKind: 'war_orphan',
        appearance: {
          skin: 7,
          hair: 2,
          clothes: 4,
          doll: { bodyType: 'female', hairStyle: 'hair_bob_adult', hairColor: '#252129' },
        },
      },
    });

    expect(draft.name).toBe('顾青梧');
    expect(draft.sex).toBe('male');
    expect(draft.health).toBe(0.42);
    expect(draft.bodyNote).toBe('早产，左耳听力很弱。');
    expect(draft.wish).toBe('愿他学会拒绝。');
    expect(draft.mode).toBe('legendary');
    expect(draft.familyBackground.kind).toBe('declining_scholars');
    expect(draft.personality.tendency).toBe('skeptic');
    expect(draft.secret.kind).toBe('buried_box');
    expect(draft.destinyHook.kind).toBe('war_orphan');
    expect(draft.birthplace.locationId).toBe(site.id);
    expect(draft.culture.id).toBe('han');
    expect(draft.culture.source).toBe('override');
    expect(draft.culture.diaspora).toBe(true);
    expect(draft.appearance.skin).toBe(7);
    expect(draft.appearance.doll.bodyType).toBe('female');
    expect(draft.appearance.doll.hairStyle).toBe('hair_bob_adult');
    expect(draft.appearance.doll.hairColor).toBe('#252129');
    // Fields that were not overridden still came from the seeded generator.
    expect(draft.secret.detail.length).toBeGreaterThan(0);
    expect(draft.destinyHook.omen.length).toBeGreaterThan(0);
    expect(draft.familyBackground.summary.length).toBeGreaterThan(0);
    expect(draft.fate.variance).toBeGreaterThan(0);

    const request = toBirthRequest(draft);
    expect(request).toEqual({
      name: '顾青梧',
      sex: 'male',
      health: 0.42,
      body: '早产，左耳听力很弱。',
      appearance: draft.appearance,
      wish: '愿他学会拒绝。',
      preferredLocationId: site.id,
      lifeMode: 'legendary',
    });
    expect(BirthRequestSchema.safeParse(request).success).toBe(true);
  });

  it('does not collapse name, sex, settlement or culture distributions', () => {
    const drafts = Array.from({ length: 120 }, (_, index) =>
      generateRichBirthDraft(earth, { seed: `distribution-${index}` }),
    );
    const names = drafts.map((draft) => draft.name);
    const sexes = drafts.map((draft) => draft.sex);
    const locations = drafts.map((draft) => draft.birthplace.locationId);
    const cultures = drafts.map((draft) => draft.culture.id);

    expect(new Set(names).size).toBeGreaterThan(50);
    expect(count(sexes, 'female')).toBeGreaterThan(25);
    expect(count(sexes, 'male')).toBeGreaterThan(25);
    expect(new Set(locations).size).toBeGreaterThan(20);
    expect(new Set(cultures).size).toBeGreaterThan(6);
    expect(drafts.every((draft) => draft.name.length <= 32)).toBe(true);
    expect(drafts.every((draft) => draft.health >= 0.2 && draft.health <= 1)).toBe(true);
  });

  it('makes legendary wider, not safer, and keeps dark ordinary outcomes possible', () => {
    const ordinary = Array.from({ length: 240 }, (_, index) =>
      generateRichBirthDraft(earth, {
        seed: `mode-ordinary-${index}`,
        overrides: { mode: 'ordinary' },
      }),
    );
    const legendary = Array.from({ length: 240 }, (_, index) =>
      generateRichBirthDraft(earth, {
        seed: `mode-legendary-${index}`,
        overrides: { mode: 'legendary' },
      }),
    );

    const ordinaryVariance = mean(ordinary.map((draft) => draft.fate.variance));
    const legendaryVariance = mean(legendary.map((draft) => draft.fate.variance));
    expect(legendaryVariance).toBeGreaterThan(ordinaryVariance + 0.3);
    expect(mean(legendary.map((draft) => draft.fate.hardship))).toBeGreaterThan(
      mean(ordinary.map((draft) => draft.fate.hardship)) + 0.05,
    );
    expect(mean(legendary.map((draft) => draft.secret.intensity))).toBeGreaterThan(
      mean(ordinary.map((draft) => draft.secret.intensity)) + 0.05,
    );
    expect(mean(legendary.map((draft) => draft.destinyHook.severity))).toBeGreaterThan(
      mean(ordinary.map((draft) => draft.destinyHook.severity)) + 0.02,
    );

    const ordinaryElite = ordinary.filter(
      (draft) => draft.familyBackground.wealth === 'elite',
    ).length;
    const legendaryElite = legendary.filter(
      (draft) => draft.familyBackground.wealth === 'elite',
    ).length;
    expect(legendaryElite).toBeGreaterThan(ordinaryElite);

    // Legendary is not a guarantee: it can still produce low health and severe hooks.
    expect(legendary.some((draft) => draft.health <= 0.5)).toBe(true);
    expect(legendary.some((draft) => draft.fate.certainty < 0.25)).toBe(true);
    expect(legendary.every((draft) => draft.fate.variance <= 1)).toBe(true);
    // Ordinary has its own dark paths; the mode is not a morality or safety switch.
    expect(ordinary.some((draft) => draft.destinyHook.severity >= 0.7)).toBe(true);
    expect(ordinary.some((draft) => draft.familyBackground.wealth === 'destitute')).toBe(true);
  });

  it('is JSON-safe, maps to a valid BirthRequest, and never mutates the world', () => {
    const world = deepFreeze(mineWorld());
    const before = JSON.stringify(world);
    const draft = generateRichBirthDraft(world, { seed: 'frozen-seed' });
    expect(JSON.stringify(world)).toBe(before);

    const jsonClone = JSON.parse(JSON.stringify(draft)) as RichBirthDraft;
    expect(jsonClone).toEqual(draft);
    expect(structuredClone(draft)).toEqual(draft);

    const request = toBirthRequest(draft);
    expect(BirthRequestSchema.safeParse(request).success).toBe(true);
    expect(request.appearance.doll).toEqual(draft.appearance.doll);
    expect(request.preferredLocationId).toBe(draft.birthplace.locationId);
    expect(JSON.stringify(draft)).not.toMatch(/undefined|function|\[object Object\]/);
  });

  it('supports rerolling only the name or only the destiny hook', () => {
    const base = generateRichBirthDraft(earth, {
      seed: 'reroll-base',
      overrides: { mode: 'legendary' },
    });
    const names = Array.from({ length: 8 }, (_, index) =>
      rerollRichBirthDraft(earth, base, 'name', { nonce: `name-${index}` }),
    );
    expect(new Set(names.map((draft) => draft.name)).size).toBeGreaterThan(1);
    for (const draft of names) {
      expect(draft.culture).toEqual(base.culture);
      expect(draft.birthplace).toEqual(base.birthplace);
      expect(draft.wish).toBe(base.wish);
      expect(draft.secret).toEqual(base.secret);
      expect(draft.destinyHook).toEqual(base.destinyHook);
      expect(draft.personality).toEqual(base.personality);
    }

    const hooks = Array.from({ length: 12 }, (_, index) =>
      rerollRichBirthDraft(earth, base, 'destinyHook', { nonce: `hook-${index}` }),
    );
    expect(new Set(hooks.map((draft) => draft.destinyHook.kind)).size).toBeGreaterThan(1);
    for (const draft of hooks) {
      expect(draft.name).toBe(base.name);
      expect(draft.wish).toBe(base.wish);
      expect(draft.birthplace).toEqual(base.birthplace);
      expect(draft.secret).toEqual(base.secret);
    }

    const all = rerollRichBirthDraft(earth, base, 'all', { nonce: 'all-1' });
    expect(all.seed).not.toBe(base.seed);
    expect(all).not.toEqual(base);
  });

  it('uses no Math.random in the generator source', () => {
    const source = readFileSync(new URL('../packages/creation/random.ts', import.meta.url), 'utf8');
    expect(source).not.toContain('Math.random');
  });

  it('maps every culture to a valid BirthRequest', () => {
    for (const id of Object.keys(NAME_CULTURES) as NameCultureId[]) {
      for (const sex of ['female', 'male', 'intersex'] as const) {
        const draft = generateRichBirthDraft(earth, {
          seed: `culture-${id}-${sex}`,
          overrides: { cultureId: id, sex },
        });
        const request = toBirthRequest(draft);
        expect(BirthRequestSchema.safeParse(request).success).toBe(true);
        expect(draft.culture.id).toBe(id);
        expect(NAME_CULTURES[id].male.length).toBeGreaterThan(0);
      }
    }
  });

  it('falls back to the fictional frontier culture for a world without ISO geography', () => {
    const settlement: CreationSettlement = {
      id: 'town-1',
      name: '苇湾',
      cohort: { children: 10, adults: 50, elders: 5 },
    };
    expect(inferNameCulture(settlement)).toBe('frontier');
    const draft = generateRichBirthDraft(
      { seed: 'fiction', month: 0, settlements: [settlement] },
      { seed: 'fiction-seed' },
    );
    expect(draft.culture.id).toBe('frontier');
    expect(draft.era.band).toBe('frontier');
  });
});
