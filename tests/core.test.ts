import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { createWorld } from '../packages/world-packs/index.js';
import { advance, assertWorld } from '../packages/simulation-core/index.js';
import { population, type World, DefinitionSchema } from '../packages/contracts/index.js';
import { compileDefinition } from '../packages/dynamics/index.js';
import { random } from '../packages/simulation-core/random.js';
import { spawnAdult } from './helpers/spawn.js';
function run(w: World, months: number) {
  for (let m = 0; m < months && w.status === 'running'; m++) w = advance(w).world;
  return w;
}
function money(w: World) {
  return (
    w.persons.reduce((n, p) => n + p.coin, 0) +
    w.settlements.reduce((n, s) => n + s.coin, 0) +
    w.polities.reduce((n, p) => n + p.treasury, 0) +
    w.organizations.reduce((n, o) => n + o.treasury, 0)
  );
}
describe('canonical simulation', () => {
  it('seeds a real connected population and a stable baseline', () => {
    const w = createWorld();
    expect(population(w)).toBe(65520);
    expect(w.persons).toHaveLength(1000);
    expect(w.settlements).toHaveLength(36);
    assertWorld(w);
  });
  it('is deterministic over seeds, intervals and pure input', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 999999 }),
        fc.integer({ min: 1, max: 5 }),
        (seed, months) => {
          const a = createWorld(String(seed));
          const before = JSON.stringify(a);
          expect(run(a, months)).toEqual(run(createWorld(String(seed)), months));
          expect(JSON.stringify(a)).toBe(before);
        },
      ),
      { numRuns: 8 },
    );
  });
  it('balances currency and food production/consumption/destruction', () => {
    const w = createWorld('conservation');
    const initialMoney = money(w);
    const initialFood = w.settlements.reduce((n, s) => n + s.food, 0);
    const out = run(w, 24);
    expect(money(out)).toBeCloseTo(initialMoney, 5);
    expect(out.settlements.reduce((n, s) => n + s.food, 0)).toBeCloseTo(
      initialFood + out.audit.producedFood - out.audit.consumedFood - out.audit.destroyedFood,
      5,
    );
    assertWorld(out);
  });
  it('uses identical world physics for matched player-owned and ordinary inhabitants', () => {
    const a = createWorld('parity'),
      b = structuredClone(a);
    b.persons[0].ownerId = 'observer';
    const x = run(a, 12),
      y = run(b, 12);
    delete y.persons[0].ownerId;
    expect(y).toEqual(x);
  });
  it('food shock changes health, plans and causal identity rather than prose alone', () => {
    const w = createWorld('shock');
    const normal = run(w, 8);
    const shock = structuredClone(w);
    for (const s of shock.settlements) {
      s.food = 0;
      s.fertility = 0.15;
      s.coin = 10000;
    }
    const out = run(shock, 8);
    expect(out.persons.reduce((n, p) => n + p.stress, 0)).toBeGreaterThan(
      normal.persons.reduce((n, p) => n + p.stress, 0),
    );
    const changed = out.persons.find((p) => p.goals.some((g) => g.kind === 'survive'));
    expect(changed?.goals.find((g) => g.kind === 'survive')?.causeIds.length).toBeGreaterThan(0);
    expect(changed?.memories.length).toBeGreaterThan(0);
  });
  it('compiles durable innovations and rejects code/unknown mechanics/bounds', () => {
    expect(() =>
      compileDefinition({
        version: 1,
        kind: 'guild',
        name: 'bad',
        mechanism: 'eval',
        upkeep: 1,
        dues: 1,
        effect: 1,
        ttlMonths: 12,
        maxMembers: 100,
      }),
    ).toThrow();
    expect(() =>
      DefinitionSchema.parse({
        version: 1,
        kind: 'guild',
        name: 'bad',
        mechanism: 'pooled_production',
        upkeep: 1,
        dues: 1,
        effect: 0.1,
        ttlMonths: 12,
        maxMembers: 100,
        code: 'process.exit()',
      }),
    ).toThrow();
    const w = createWorld('institution');
    const actor = w.persons[0];
    actor.coin = 50;
    const p = {
      version: 1 as const,
      jobId: 'guild',
      actorId: actor.id,
      actorVersion: actor.version,
      deadline: 5,
      action: 'found' as const,
      definition: {
        version: 1 as const,
        kind: 'guild' as const,
        name: '共济粮社',
        mechanism: 'pooled_production' as const,
        upkeep: 1,
        dues: 1,
        effect: 0.15,
        ttlMonths: 120,
        maxMembers: 50,
      },
    };
    let out = advance(w, [{ id: 'proposal1', kind: 'proposal', proposal: p }], false);
    expect(out.results[0].ok).toBe(true);
    out = advance(out.world, [], true);
    const baseline = structuredClone(out.world);
    baseline.organizations = baseline.organizations.filter((o) => o.id !== 'org-guild');
    const withGuild = run(out.world, 48),
      without = run(baseline, 48);
    const guild = withGuild.organizations.find((o) => o.id === 'org-guild')!;
    expect(guild.memberIds.length).toBeGreaterThanOrEqual(3);
    expect(withGuild.settlements[0].food).not.toBe(without.settlements[0].food);
  });
  it('rejects stale, repeated and out of scope proposals without actor effects', () => {
    const w = createWorld('stale');
    const p = w.persons[0];
    const before = structuredClone(p);
    const out = advance(
      w,
      [
        {
          id: 'x',
          kind: 'proposal',
          proposal: {
            version: 1,
            jobId: 'x',
            actorId: p.id,
            actorVersion: 99,
            deadline: 9,
            action: 'research',
          },
        },
      ],
      false,
    );
    expect(out.results[0].ok).toBe(false);
    expect(out.world.persons[0]).toEqual(before);
  });
  it('shares a single event identity across two legitimate local observers', () => {
    let w = createWorld('shared');
    spawnAdult(w, { id: 'person-u1', name: '伊芙', locationId: 'town-0', ownerId: 'one' });
    spawnAdult(w, { id: 'person-u2', name: '阿岚', locationId: 'town-0', ownerId: 'two' });
    const ids = ['person-u1', 'person-u2'];
    let shared = false;
    for (let m = 0; m < 120 && !shared; m++) {
      const out = advance(w);
      w = out.world;
      shared = out.events.some((e) => ids.every((id) => e.personIds.includes(id)));
    }
    expect(shared).toBe(true);
  });
  it('separates beliefs from truth and forbids resurrection', () => {
    const w = createWorld('belief');
    w.claims.push({
      id: 'rumor',
      subjectId: 'polity-0',
      predicate: 'stole_grain',
      truth: 'false',
      sourceIds: [],
    });
    w.persons[0].beliefs.push({ claimId: 'rumor', confidence: 0.9, sourceIds: [] });
    const out = run(w, 12);
    expect(out.claims[0].truth).toBe('false');
    const dead = out.persons.find((p) => p.death !== undefined);
    expect(dead).toBeDefined();
    if (dead) {
      expect(dead.plans.some((p) => p.status === 'active')).toBe(false);
      const future = run(out, 12);
      expect(future.persons.find((p) => p.id === dead.id)?.death).toBe(dead.death);
    }
  });
  it('requires sustained global collapse with causal evidence, not a local loss', () => {
    let w = createWorld('ending');
    w.settlements[0].cohort = { id: 'cohort-town-0', children: 0, adults: 0, elders: 0 };
    expect(run(w, 12).status).toBe('running');
    w = createWorld('collapse');
    for (const s of w.settlements) {
      s.food = 0;
      s.fertility = 0;
      s.cohort.children = 0;
      s.cohort.adults = 1;
      s.cohort.elders = 0;
    }
    const out = run(w, 24);
    expect(out.status).toBe('archived');
    expect(out.terminalReason).toBe('civilization_collapse');
    expect(out.terminalEvidence.length).toBeGreaterThan(0);
    expect(() => advance(out)).toThrow();
  });
  it('entity-local random streams are reproducible and dispersed', () => {
    expect(random('a', 'b', 1)).toBe(random('a', 'b', 1));
    expect(random('a', 'b', 1)).not.toBe(random('a', 'b', 2));
  });
});

it('keeps an executable association alive after its founder dies', () => {
  let w = createWorld('legacy');
  const founder = w.persons[0];
  founder.birth = -95 * 12;
  const transfer = Math.max(0, 50 - founder.coin);
  w.settlements[0].coin -= transfer;
  founder.coin += transfer;
  w = advance(
    w,
    [
      {
        id: 'legacy-command',
        kind: 'proposal',
        proposal: {
          version: 1,
          jobId: 'legacy',
          actorId: founder.id,
          actorVersion: founder.version,
          deadline: 2,
          action: 'found',
          definition: {
            version: 1,
            kind: 'guild',
            name: '苇湾共济社',
            mechanism: 'pooled_production',
            upkeep: 1,
            dues: 1,
            effect: 0.12,
            ttlMonths: 600,
            maxMembers: 50,
          },
        },
      },
    ],
    false,
  ).world;
  for (let month = 0; month < 120 && w.persons[0].death === undefined; month++)
    w = advance(w).world;
  expect(w.persons[0].death).toBeDefined();
  w = run(w, 12);
  const org = w.organizations.find((o) => o.id === 'org-legacy')!;
  expect(org.status).toBe('active');
  expect(org.memberIds.length).toBeGreaterThanOrEqual(3);
  expect(org.leaderId).not.toBe(founder.id);
  expect(w.settlements[0].food).toBeGreaterThan(0);
});

it('persists bounded cultural policies and changes future decision opportunities', () => {
  let w = createWorld('norm');
  const actor = w.persons[0];
  actor.coin = Math.max(actor.coin, 10);
  const initialCoin = actor.coin;
  w = advance(
    w,
    [
      {
        id: 'norm-command',
        kind: 'proposal',
        proposal: {
          version: 1,
          jobId: 'norm-job',
          actorId: actor.id,
          actorVersion: actor.version,
          deadline: 3,
          action: 'publish',
          policy: { version: 1, kind: 'cooperate', strength: 0.15, ttlMonths: 60 },
        },
      },
    ],
    false,
  ).world;
  expect(w.persons[0].coin).toBe(initialCoin - 2);
  expect(w.persons[0].policy?.causeIds.length).toBe(1);
  const without = structuredClone(w);
  delete without.persons[0].policy;
  const withNorm = run(w, 24),
    baseline = run(without, 24);
  expect(withNorm.persons[0].relationships).not.toEqual(baseline.persons[0].relationships);
  expect(withNorm.claims[0].truth).toBe('unknown');
  const expired = run(w, 61);
  expect(expired.persons[0].policy).toBeUndefined();
});

it('records a research discovery with an actual executable knowledge gain', () => {
  let w = createWorld('discovery');
  const actor = w.persons[0],
    before = w.settlements[0].knowledge;
  w = advance(
    w,
    [
      {
        id: 'research-command',
        kind: 'proposal',
        proposal: {
          version: 1,
          jobId: 'research-job',
          actorId: actor.id,
          actorVersion: actor.version,
          deadline: 2,
          action: 'research',
        },
      },
    ],
    false,
  ).world;
  w = run(w, 6);
  const discovery = w.discoveries?.find((d) => d.creatorId === actor.id);
  expect(discovery).toBeDefined();
  expect(discovery!.gain).toBeGreaterThan(0);
  expect(discovery!.mechanism).toBe('production_improvement');
  expect(w.settlements[0].knowledge).toBeGreaterThan(before);
  expect(discovery!.causeIds.length).toBe(1);
});

it('splits a conflicted charter through real membership and treasury transfers', () => {
  const w = createWorld('charter-split');
  const org = w.organizations[0];
  org.definition.splitOnConflict = true;
  const locals = w.persons.filter((p) => p.locationId === org.locationId).slice(0, 10);
  org.memberIds = locals.map((p) => p.id);
  org.leaderId = locals[0].id;
  org.treasury = 100;
  locals.forEach((p, i) => (p.values.tradition = i < 5 ? 0.1 : 0.9));
  const before = money(w);
  const out = advance(w);
  const split = out.world.organizations.find((o) => o.id.startsWith('split-'));
  expect(split).toBeDefined();
  expect(out.events.some((e) => e.kind === 'organization_split' && e.causeIds.length === 0)).toBe(
    true,
  );
  expect(split!.memberIds.every((id) => !out.world.organizations[0].memberIds.includes(id))).toBe(
    true,
  );
  expect(money(out.world)).toBeCloseTo(before, 5);
});

it('ends an irreversible knowledge transition from actual research evidence', () => {
  let w = createWorld('knowledge-ending');
  w.month = 120;
  for (const town of w.settlements) town.knowledge = 1;
  const actor = w.persons[0],
    town = w.settlements.find((s) => s.id === actor.locationId)!;
  town.knowledge = 0.979;
  w = advance(
    w,
    [
      {
        id: 'last-discovery',
        kind: 'proposal',
        proposal: {
          version: 1,
          jobId: 'last-discovery',
          actorId: actor.id,
          actorVersion: actor.version,
          deadline: 125,
          action: 'research',
        },
      },
    ],
    false,
  ).world;
  let terminal: any;
  for (let month = 0; month < 8 && w.status === 'running'; month++) {
    const result = advance(w);
    w = result.world;
    terminal = result.events.find((e) => e.kind === 'world_ending') ?? terminal;
  }
  expect(w.terminalReason).toBe('transformation');
  expect(terminal.causeIds.length).toBeGreaterThan(0);
  expect(w.discoveries?.some((d) => terminal.causeIds.includes(d.causeIds[0]))).toBe(true);
});
