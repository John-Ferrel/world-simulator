import { describe, expect, it } from 'vitest';
import type { HistoricalEvent, Person, Settlement, World } from '../packages/contracts/index.js';
import {
  advanceSociety,
  applySocietyToLife,
  type SocietyState,
} from '../packages/society/index.js';
import { appendCauseId, reconsider } from '../packages/cognition/index.js';
import type { Emit } from '../packages/simulation-core/index.js';

const settlement = (): Settlement => ({
  id: 'town:1',
  name: 'Town',
  x: 0,
  y: 0,
  biome: 'plains',
  neighbors: [],
  polityId: 'p',
  cohort: { id: 'c', children: 0, adults: 0, elders: 0 },
  food: 0,
  coin: 0,
  fertility: 0,
  knowledge: 0,
  prosperity: 0,
  scarcity: 0.8,
  price: 1,
  unrest: 0.9,
  birthRemainder: 0,
  deathRemainder: 0,
  economy: {
    unemployment: 0.1,
    healthcare: 0,
    education: 0,
    infrastructure: 0,
    inflation: 0,
    productionMultiplier: 1,
    tradeMultiplier: 1,
  },
});
const person = (id: string, ownerId?: string): Person => ({
  id,
  version: 0,
  name: `Person ${id}`,
  ownerId,
  birth: -480,
  locationId: 'town:1',
  originCohortId: 'cohort-a',
  parents: [],
  householdId: `home-${id}`,
  occupation: '织工',
  coin: 2,
  health: 1,
  stress: 0.2,
  values: { care: 0.7, ambition: 0.5, tradition: 0.5 },
  skills: { craft: 0.3, learning: 0.2 },
  goals: [],
  memories: [],
  beliefs: [],
  relationships: [],
  plans: [],
  commitments: [],
  appearance: { skin: 0, hair: 0, clothes: 0 },
});
const world = (persons: Person[]): World => ({
  schema: 'slw/1',
  id: 'world',
  seed: 'reproducible-seed',
  epoch: 0,
  month: 17,
  revision: 0,
  pack: { id: 'test', version: '1' },
  status: 'running',
  parameters: { researchRate: 1 },
  baselinePopulation: persons.length,
  collapseMonths: 0,
  maxYears: 100,
  settlements: [settlement()],
  polities: [],
  persons,
  organizations: [],
  conflicts: [],
  claims: [],
  eventSeq: 0,
  appliedCommands: [],
  processedJobs: [],
  audit: { producedFood: 0, consumedFood: 0, destroyedFood: 0, births: 0, deaths: 0 },
  terminalEvidence: [],
});
function emitFor(events: HistoricalEvent[]): Emit {
  return (kind, people, locationId, text, data = {}, causeIds = [], significance = 0.5) => {
    const e: HistoricalEvent = {
      id: `test:e${events.length + 1}`,
      worldId: 'world',
      month: 17,
      kind,
      personIds: people,
      locationId,
      text,
      data,
      causeIds,
      significance,
    };
    events.push(e);
    return e;
  };
}

describe('society layer', () => {
  it('does not re-emit an established rivalry and keeps relationship and goal evidence bounded', () => {
    const ps = [person('a'), person('b')];
    for (const p of ps) {
      p.values.care = 0;
      p.stress = 1;
    }
    const w = world(ps),
      events: HistoricalEvent[] = [],
      key = JSON.stringify(['a', 'b']),
      state: SocietyState = {
        profiles: {},
        relations: {
          [key]: {
            a: 'a',
            b: 'b',
            kind: 'rival',
            trust: -0.9,
            attachment: 0.2,
            reciprocity: 0.2,
            contacts: 8,
            since: 0,
            causeIds: ['origin'],
            lastContact: 0,
          },
        },
        institutions: {},
        relationIndex: { a: [key], b: [key] },
        locationIndex: {},
        month: -1,
        sequence: 0,
        lifeAppliedMonth: -1,
      };
    (w as World & { society: SocietyState }).society = state;
    const locals = new Map([['town:1', ps]]);
    for (let month = 17; month < 37; month++) {
      w.month = month;
      advanceSociety(w, emitFor(events), locals);
    }
    expect(events.filter((event) => event.kind === 'social_rivalry')).toHaveLength(0);
    expect(state.relations[key].causeIds).toEqual(['origin']);

    const p = person('goal-holder');
    p.goals = (['survive', 'belong', 'learn', 'prosper'] as const).map((kind) => ({
      id: `goal-${kind}`,
      kind,
      strength: 0.7,
      progress: 0,
      status: 'active',
      causeIds: Array.from({ length: 30 }, (_, i) => `old-${i}`),
    }));
    const cause = {
      id: 'new-cause',
      worldId: 'world',
      month: 30,
      kind: 'job_lost',
      personIds: [p.id],
      locationId: 'town:1',
      text: '',
      data: {},
      causeIds: [],
      significance: 0.5,
    } satisfies HistoricalEvent;
    reconsider(p, cause, 'reform');
    for (const abandoned of p.goals.filter((goal) => goal.status === 'abandoned')) {
      expect(abandoned.causeIds.length).toBeLessThanOrEqual(16);
      expect(new Set(abandoned.causeIds).size).toBe(abandoned.causeIds.length);
      expect(abandoned.causeIds.at(-1)).toBe(cause.id);
      appendCauseId(abandoned.causeIds, cause.id);
      expect(abandoned.causeIds.filter((id) => id === cause.id)).toHaveLength(1);
    }
  });

  it('forms bounded indexed ties and grounded class identities without mutating legacy partner graph', () => {
    const ps = [person('a'), person('b'), person('c')],
      w = world(ps),
      events: HistoricalEvent[] = [];
    advanceSociety(w, emitFor(events), new Map([['town:1', ps]]));
    const s = (w as World & { society: SocietyState }).society;
    expect(Object.keys(s.profiles)).toHaveLength(3);
    expect(s.profiles.a.cultureId).toBe('local:cohort-a');
    expect(s.profiles.a.socialClass).toBe('destitute');
    expect(Object.keys(s.relations).length).toBeGreaterThan(0);
    expect(ps.every((p) => p.relationships.length === 0)).toBe(true);
    expect(
      events.every((e) => e.causeIds.every((id) => events.some((source) => source.id === id))),
    ).toBe(true);
  });

  it('organizes hardship into a dues-funded union, pays aid by transfer, and records labor conflict', () => {
    const ps = [person('a'), person('b'), person('c'), person('d')],
      w = world(ps),
      events: HistoricalEvent[] = [];
    w.month = 18;
    advanceSociety(w, emitFor(events), new Map([['town:1', ps]]));
    const s = (w as World & { society: SocietyState }).society;
    const union = Object.values(s.institutions).find((i) => i.kind === 'union');
    expect(union).toBeDefined();
    expect(union!.members.length).toBeGreaterThanOrEqual(3);
    expect(events.some((e) => e.kind === 'labor_strike')).toBe(true);
    expect(events.some((e) => e.kind === 'mutual_aid')).toBe(true);
    expect(union!.members.every((id) => s.profiles[id].identityEvidence.political?.length)).toBe(
      true,
    );
  });

  it('is deterministic and treats owned and non-owned people by the same rules', () => {
    const run = (owner?: string) => {
      const ps = [person('a', owner), person('b'), person('c')],
        w = world(ps),
        events: HistoricalEvent[] = [];
      advanceSociety(w, emitFor(events), new Map([['town:1', ps]]));
      return { state: (w as World & { society: SocietyState }).society, events };
    };
    const a = run('user-7'),
      b = run();
    expect(a.state).toEqual(b.state);
    expect(a.events.map((e) => [e.kind, e.personIds, e.data])).toEqual(
      b.events.map((e) => [e.kind, e.personIds, e.data]),
    );
    const repeated = run();
    expect(repeated.state).toEqual(b.state);
  });

  it('does not process a society month twice', () => {
    const ps = [person('a'), person('b')],
      w = world(ps),
      events: HistoricalEvent[] = [];
    const locals = new Map([['town:1', ps]]);
    advanceSociety(w, emitFor(events), locals);
    const count = events.length;
    advanceSociety(w, emitFor(events), locals);
    expect(events).toHaveLength(count);
  });

  it('forms a synthetic faith institution only from shared, explicit belief experience', () => {
    const ps = [person('a'), person('b')];
    for (const p of ps)
      p.beliefs = [
        { claimId: 'faith:lantern_path', confidence: 0.8, sourceIds: ['witnessed-ritual'] },
      ];
    const w = world(ps),
      events: HistoricalEvent[] = [];
    advanceSociety(w, emitFor(events), new Map([['town:1', ps]]));
    const s = (w as World & { society: SocietyState }).society;
    const faith = Object.values(s.institutions).find((i) => i.kind === 'faith');
    expect(faith?.members).toEqual(expect.arrayContaining(['a', 'b']));
    expect(ps.every((p) => s.profiles[p.id].religionId === 'faith:lantern_path')).toBe(true);
    for (const p of ps)
      expect(s.profiles[p.id].identityEvidence.religion).toEqual(
        expect.arrayContaining(
          events
            .filter((e) => e.kind === 'social_identity_adopted' && e.personIds.includes(p.id))
            .map((e) => e.id),
        ),
      );
  });

  it('rejects generic claims as religion and records belief loss', () => {
    const ps = [person('a'), person('b')];
    for (const p of ps)
      p.beliefs = [{ claimId: 'claim:production', confidence: 0.9, sourceIds: [] }];
    const w = world(ps),
      events: HistoricalEvent[] = [],
      locals = new Map([['town:1', ps]]);
    advanceSociety(w, emitFor(events), locals);
    const state = (w as World & { society: SocietyState }).society;
    expect(Object.values(state.institutions).some((i) => i.kind === 'faith')).toBe(false);
    for (const p of ps)
      p.beliefs = [{ claimId: 'faith:river_covenant', confidence: 0.9, sourceIds: [] }];
    w.month++;
    advanceSociety(w, emitFor(events), locals);
    expect(state.profiles.a.religionId).toBe('faith:river_covenant');
    for (const p of ps)
      p.beliefs = [{ claimId: 'faith:river_covenant', confidence: 0.1, sourceIds: [] }];
    w.month++;
    advanceSociety(w, emitFor(events), locals);
    expect(state.profiles.a.religionId).toBeUndefined();
    expect(events.some((e) => e.kind === 'religious_conversion')).toBe(true);
  });

  it('transfers dues, aid, wages, and upkeep without creating or destroying coin', () => {
    const ps = Array.from({ length: 10 }, (_, i) => person(`worker-${i}`)),
      w = world(ps),
      events: HistoricalEvent[] = [];
    w.month = 18;
    w.settlements[0].coin = 30;
    const total = () =>
      ps.reduce((n, p) => n + p.coin, 0) +
      w.settlements.reduce((n, s) => n + s.coin, 0) +
      Object.values((w as World & { society?: SocietyState }).society?.institutions ?? {}).reduce(
        (n, i) => n + i.treasury,
        0,
      );
    const before = total();
    advanceSociety(w, emitFor(events), new Map([['town:1', ps]]));
    expect(total()).toBeCloseTo(before, 8);
    expect(events.some((e) => e.kind === 'social_betrayal')).toBe(true);
  });

  it('records bereavement once and applies social consequences to life and goals', () => {
    const parent = person('parent'),
      child = person('child');
    parent.death = 17;
    parent.deathCause = 'illness';
    child.parents = ['parent'];
    child.goals = [
      { id: 'belong', kind: 'belong', strength: 0.5, progress: 0, status: 'active', causeIds: [] },
    ];
    child.life = {
      needs: { food: 0.5, rest: 0.5, safety: 0.5, belonging: 0.5, purpose: 0.5, autonomy: 0.5 },
      emotions: { hope: 0.5, fear: 0.1, grief: 0, anger: 0 },
      personality: {
        openness: 0.5,
        conscientiousness: 0.5,
        extraversion: 0.5,
        agreeableness: 0.5,
        neuroticism: 0.5,
      },
      career: { role: 'weaver', level: 1, experience: 0, employed: true, burnout: 0 },
      education: { level: 1, months: 0, field: 'general' },
      housing: { quality: 0.5, rent: 0 },
      debt: 0,
      fatigue: 0,
    };
    const w = world([parent, child]),
      events: HistoricalEvent[] = [],
      locals = new Map([['town:1', [parent, child]]]);
    advanceSociety(w, emitFor(events), locals);
    applySocietyToLife(w, locals);
    expect(child.life.emotions.grief).toBeGreaterThan(0);
    const loss = events.find((e) => e.kind === 'family_loss')!;
    expect(child.goals[0].causeIds).toContain(loss.id);
    w.month++;
    advanceSociety(w, emitFor(events), locals);
    expect(events.filter((e) => e.kind === 'family_loss')).toHaveLength(1);
  });

  it('rotates bounded contact attention across people', () => {
    const ps = Array.from({ length: 600 }, (_, i) => person(`p-${i}`)),
      w = world(ps),
      events: HistoricalEvent[] = [],
      locals = new Map([['town:1', ps]]);
    const reached = new Set<string>();
    for (let month = 1; month <= 6; month++) {
      w.month = month;
      advanceSociety(w, emitFor(events), locals);
      for (const e of events.filter((e) => e.kind === 'society_encounter'))
        for (const id of e.personIds) reached.add(id);
    }
    expect(reached.size).toBeGreaterThan(400);
  });

  it('rotates workplace attention so occupation groups outside the first window join later', () => {
    const ps = Array.from({ length: 35 * 3 }, (_, i) => {
      const p = person(`trade-${Math.floor(i / 3)}-${i % 3}`);
      p.occupation = `trade-${Math.floor(i / 3)}`;
      return p;
    });
    const w = world(ps),
      events: HistoricalEvent[] = [],
      locals = new Map([['town:1', ps]]);
    w.month = 3;
    advanceSociety(w, emitFor(events), locals);
    w.month = 6;
    advanceSociety(w, emitFor(events), locals);
    const state = (w as World & { society: SocietyState }).society,
      union = Object.values(state.institutions).find((i) => i.kind === 'union');
    expect(union).toBeDefined();
    for (let group = 0; group < 35; group++) expect(union!.members).toContain(`trade-${group}-0`);
  });

  it('moves household resources to a dependent and turns skilled work into mentorship', () => {
    const parent = person('caregiver'),
      child = person('dependent');
    parent.birth = -700;
    parent.coin = 20;
    child.birth = -100;
    child.coin = 0;
    child.parents = ['caregiver'];
    parent.householdId = child.householdId = 'family';
    const senior = person('senior'),
      apprentice = person('apprentice'),
      helper = person('helper');
    senior.skills.craft = 0.95;
    apprentice.skills.learning = 0.05;
    senior.occupation = apprentice.occupation = helper.occupation = 'potter';
    const ps = [parent, child, senior, apprentice, helper],
      w = world(ps),
      events: HistoricalEvent[] = [],
      locals = new Map([['town:1', ps]]);
    advanceSociety(w, emitFor(events), locals);
    expect(child.coin).toBeGreaterThan(0);
    expect(events.some((e) => e.kind === 'family_support')).toBe(true);
    expect(events.some((e) => e.kind === 'career_mentorship')).toBe(true);
  });
});
