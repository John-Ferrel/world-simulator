import { it, expect } from 'vitest';
import { createWorld } from '../packages/world-packs/index.js';
import {
  advanceSociety,
  applySocietyToLife,
  applyLaborDisruption,
  laborWageFactor,
} from '../packages/society/index.js';
import { initializeLife } from '../packages/cognition/life.js';
import { historicalCareer } from '../packages/worldlines/careers.js';
it('makes an active labor dispute affect real income and production only during its declared window', () => {
  const w = createWorld('labor-window'),
    p = w.persons[0],
    s = w.settlements.find((s) => s.id === p.locationId)!;
  initializeLife(p, w);
  s.economy = {
    unemployment: 0.1,
    healthcare: 0.5,
    education: 0.5,
    infrastructure: 0.5,
    inflation: 0.02,
    productionMultiplier: 1,
    tradeMultiplier: 1,
  };
  advanceSociety(
    w,
    () => ({
      id: 'setup',
      worldId: w.id,
      month: 0,
      kind: 'setup',
      personIds: [],
      text: '',
      causeIds: [],
      significance: 0.1,
      data: {},
    }),
    new Map([[s.id, [p]]]),
  );
  w.society!.profiles[p.id].activeStrikeId = 'd';
  w.society!.laborDisputes = {
    d: {
      id: 'd',
      locationId: s.id,
      participants: [p.id],
      starts: 1,
      until: 3,
      status: 'active',
      causeIds: ['strike-source'],
    },
  };
  expect(laborWageFactor(w, p.id)).toBe(1);
  w.month = 1;
  expect(laborWageFactor(w, p.id)).toBe(0.25);
  applyLaborDisruption(w);
  expect(s.economy.productionMultiplier).toBeLessThan(1);
  w.month = 3;
  expect(laborWageFactor(w, p.id)).toBe(1);
});
it('close relationships and funded aid reduce unmet needs rather than reversing their meaning', () => {
  const w = createWorld('social-needs'),
    p = w.persons[0],
    s = w.settlements.find((s) => s.id === p.locationId)!;
  initializeLife(p, w);
  const locals = new Map([[s.id, [p]]]);
  advanceSociety(
    w,
    () => ({
      id: 'source',
      worldId: w.id,
      month: 0,
      kind: 'source',
      personIds: [],
      text: '',
      causeIds: [],
      significance: 0.1,
      data: {},
    }),
    locals,
  );
  const profile = w.society!.profiles[p.id];
  profile.safetyNet = 1;
  profile.wagePressure = 0;
  profile.institutionIds = ['funded-community'];
  p.life!.needs.safety = 0.5;
  p.life!.needs.belonging = 0.5;
  applySocietyToLife(w, locals);
  expect(p.life!.needs.safety).toBeLessThan(0.5);
  expect(p.life!.needs.belonging).toBeLessThan(0.5);
});
it('retains archival careers as scoped hints without assigning government authority or fate', () => {
  expect(historicalCareer('PHYSICIST')).toBe('研究员');
  expect(historicalCareer('POLITICIAN')).toBe('政务工作者');
  expect(historicalCareer('ACTOR')).toBe('艺术工作者');
  expect(historicalCareer(undefined)).toBeUndefined();
});
