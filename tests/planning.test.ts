import { initializeLife } from '../packages/cognition/life.js';
import { describe, expect, it } from 'vitest';
import type { HistoricalEvent, Person, Settlement, World } from '../packages/contracts/index.js';
import type { Emit } from '../packages/simulation-core/index.js';
import { adoptAgenda, advanceAgency, ensureAgency } from '../packages/planning/index.js';
import { AgendaProposalSchema } from '../packages/planning/schema.js';

const place = (id: string, neighbors: string[] = []): Settlement => ({
  id,
  name: id,
  x: 0,
  y: 0,
  biome: 'plains',
  neighbors,
  polityId: 'p',
  cohort: { id: `c-${id}`, children: 0, adults: 0, elders: 0 },
  food: 10,
  coin: 0,
  fertility: 0,
  knowledge: 0,
  prosperity: 0,
  scarcity: 0.1,
  price: 1,
  unrest: 0,
  birthRemainder: 0,
  deathRemainder: 0,
  economy: {
    unemployment: 0.05,
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
  birth: -400,
  locationId: 'a',
  originCohortId: 'c',
  parents: [],
  householdId: `h-${id}`,
  occupation: '织工',
  coin: 50,
  health: 1,
  stress: 0.1,
  values: { care: 0.6, ambition: 0.6, tradition: 0.4 },
  skills: { craft: 0.9, learning: 0.8 },
  goals: [],
  memories: [{ id: 'm1', eventId: 'prior-event', month: 0, salience: 0.4 }],
  beliefs: [],
  relationships: [],
  plans: [],
  commitments: [],
  appearance: { skin: 0, hair: 0, clothes: 0 },
});
const world = (persons: Person[]): World => ({
  schema: 'slw/1',
  id: 'planning-world',
  seed: 'planning-seed',
  epoch: 0,
  month: 10,
  revision: 0,
  pack: { id: 'test', version: '1' },
  status: 'running',
  calendar: { startYear: 1900, mode: 'historical-simulation', sources: [] },
  parameters: { researchRate: 1 },
  baselinePopulation: persons.length,
  collapseMonths: 0,
  maxYears: 100,
  settlements: [place('a', ['b']), place('b', ['a'])],
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
function emitter(events: HistoricalEvent[]): Emit {
  return (kind, people, locationId, text, data = {}, causeIds = [], significance = 0.5) => {
    const e: HistoricalEvent = {
      id: `evt-${events.length + 1}`,
      worldId: 'planning-world',
      month: 10,
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
const proposal = (p: Person, patch: Record<string, unknown> = {}) => ({
  version: 1,
  jobId: 'job-1',
  actorId: p.id,
  actorVersion: p.version,
  deadline: 20,
  evidenceIds: ['prior-event'],
  intention: '改善生活并学习手艺',
  rationale: '近期经历显示当地仍有机会',
  steps: [{ action: 'practice', label: '练习织造', months: 1 }],
  ...patch,
});

describe('dynamic agenda planning', () => {
  it('adopts only current, evidence-backed proposals with in-scope targets and unique jobs', () => {
    const actor = person('actor'),
      friend = person('friend'),
      w = world([actor, friend]),
      events: HistoricalEvent[] = [],
      emit = emitter(events);
    expect(() => adoptAgenda(w, proposal(actor, { actorVersion: 1 }), emit)).toThrow();
    expect(() => adoptAgenda(w, proposal(actor, { deadline: 9 }), emit)).toThrow();
    expect(() =>
      adoptAgenda(w, proposal(actor, { evidenceIds: ['never-observed'] }), emit),
    ).toThrow();
    expect(() => adoptAgenda(w, proposal(actor, { evidenceIds: [] }), emit)).toThrow();
    expect(() =>
      adoptAgenda(
        w,
        proposal(actor, { steps: [{ action: 'care', label: '照护陌生人', targetId: 'unknown' }] }),
        emit,
      ),
    ).toThrow();
    adoptAgenda(w, proposal(actor), emit);
    expect(w.processedJobs).toContain('job-1');
    expect(actor.intention).toBe(w.agency!.agendas[actor.id].intention);
    expect(() => adoptAgenda(w, proposal(actor, { actorVersion: actor.version }), emit)).toThrow(
      /已处理/,
    );
  });

  it('executes a multi-step agenda over real months and changes skills and relationships', () => {
    const actor = person('actor'),
      friend = person('friend'),
      w = world([actor, friend]),
      events: HistoricalEvent[] = [],
      emit = emitter(events);
    const plan = proposal(actor, {
      steps: [
        { action: 'practice', label: '反复练习织造', months: 2 },
        { action: 'socialize', label: '拜访朋友', months: 1, targetId: 'friend' },
      ],
    });
    adoptAgenda(w, plan, emit);
    const beforeSkill = actor.skills.craft,
      beforeTotal = actor.coin + friend.coin + w.settlements.reduce((n, s) => n + s.coin, 0);
    advanceAgency(w, emit);
    w.month++;
    advanceAgency(w, emit);
    expect(actor.skills.craft).toBeGreaterThan(beforeSkill);
    expect(ensureAgency(w).agendas.actor.cursor).toBe(1);
    w.month++;
    advanceAgency(w, emit);
    expect(ensureAgency(w).agendas.actor.status).toBe('complete');
    expect(friend.relationships.find((r) => r.personId === 'actor')).toMatchObject({
      kind: 'acquaintance',
      causeIds: expect.arrayContaining([
        events.find((e) => e.kind === 'agenda_step_completed' && e.data.action === 'socialize')!.id,
      ]),
    });
    expect(events.filter((e) => e.kind === 'agenda_step_completed')).toHaveLength(2);
    expect(actor.coin + friend.coin + w.settlements.reduce((n, s) => n + s.coin, 0)).toBe(
      beforeTotal,
    );
  });

  it('fails a plan that cannot fund its first step and requests replanning', () => {
    const actor = person('actor'),
      w = world([actor]),
      events: HistoricalEvent[] = [],
      emit = emitter(events);
    actor.coin = 0;
    adoptAgenda(
      w,
      proposal(actor, { steps: [{ action: 'organize', label: '建立行会', institution: 'guild' }] }),
      emit,
    );
    advanceAgency(w, emit);
    expect(ensureAgency(w).agendas.actor.status).toBe('failed');
    expect(ensureAgency(w).needsReplan.actor.reason).toMatch(/资金/);
    expect(events.some((e) => e.kind === 'agenda_step_failed')).toBe(true);
  });

  it('labels a fallback by its actual work while preserving an existing longer-term intention', () => {
    const actor = person('actor'),
      w = world([actor]),
      events: HistoricalEvent[] = [];
    actor.intention = '留在本地照顾家人';
    actor.coin = 0;
    ensureAgency(w).needsReplan.actor = { since: 0, reason: '眼下生活费不足', causeIds: [] };
    w.month = 13;
    advanceAgency(w, emitter(events));
    const agenda = ensureAgency(w).agendas.actor;
    expect(agenda.steps[0].action).toBe('seek_work');
    expect(agenda.intention).toBe('取得稳定收入并改善谋生能力');
    expect(actor.intention).toBe('留在本地照顾家人');
    expect(events.find((e) => e.kind === 'agenda_adopted')?.data.intention).toBe(agenda.intention);
  });

  it('creates a grounded rules fallback for a person who has no recorded memories', () => {
    const actor = person('newcomer'),
      w = world([actor]),
      events: HistoricalEvent[] = [],
      emit = emitter(events);
    actor.memories = [];
    advanceAgency(w, emit);
    expect(
      actor.memories.some((m) =>
        events.some((e) => e.id === m.eventId && e.kind === 'deliberation_context'),
      ),
    ).toBe(true);
    w.month = 13;
    advanceAgency(w, emit);
    expect(ensureAgency(w).agendas.newcomer.status).toBe('active');
    expect(events.find((e) => e.kind === 'agenda_adopted')?.causeIds).toContain(
      actor.memories.at(-1)!.eventId,
    );
  });

  it('rejects a model-requested duplicate employment without a fictitious job completion', () => {
    const actor = person('actor'),
      w = world([actor]),
      events: HistoricalEvent[] = [],
      emit = emitter(events);
    initializeLife(actor, w).career.employed = true;
    const coin = actor.coin;
    adoptAgenda(
      w,
      proposal(actor, { steps: [{ action: 'seek_work', label: '再找一份工作' }] }),
      emit,
    );
    advanceAgency(w, emit);
    expect(events.some((e) => e.kind === 'agenda_step_completed')).toBe(false);
    expect(ensureAgency(w).agendas.actor.status).toBe('failed');
    expect(ensureAgency(w).agendas.actor.lastFailure).toMatch(/已有工作/);
    expect(actor.coin).toBe(coin);
  });

  it('does not emit a completion when the seek-work action cannot find a job', () => {
    const actor = person('actor'),
      w = world([actor]),
      events: HistoricalEvent[] = [],
      emit = emitter(events);
    actor.life = {
      needs: { food: 0.5, rest: 0.5, safety: 0.5, belonging: 0.5, purpose: 0.5, autonomy: 0.5 },
      emotions: { hope: 0.5, fear: 0, grief: 0, anger: 0 },
      personality: {
        openness: 0.5,
        conscientiousness: 0.5,
        extraversion: 0.5,
        agreeableness: 0.5,
        neuroticism: 0.5,
      },
      career: { role: '织工', level: 1, experience: 0, employed: false, burnout: 0 },
      education: { level: 0, months: 0, field: 'general' },
      housing: { quality: 0.5, rent: 0 },
      debt: 0,
      fatigue: 0,
    };
    w.settlements[0].economy!.unemployment = 1;
    adoptAgenda(w, proposal(actor, { steps: [{ action: 'seek_work', label: '寻找工作' }] }), emit);
    advanceAgency(w, emit);
    expect(events.some((e) => e.kind === 'agenda_step_completed')).toBe(false);
    expect(events.some((e) => e.kind === 'agenda_step_failed')).toBe(true);
  });

  it('interrupts a plan when a new high-salience bereavement memory changes its premise', () => {
    const actor = person('actor'),
      w = world([actor]),
      events: HistoricalEvent[] = [],
      emit = emitter(events);
    adoptAgenda(w, proposal(actor), emit);
    w.month = 12;
    const death = emit('family_loss', [actor.id], 'a', '人物的亲人离世。', {}, [], 0.9);
    actor.memories.push({
      id: 'bereavement-memory',
      eventId: death.id,
      month: w.month,
      salience: 0.95,
    });
    advanceAgency(w, emit);
    expect(ensureAgency(w).agendas.actor.status).toBe('replan');
    expect(ensureAgency(w).needsReplan.actor.causeIds).toContain(death.id);
    expect(actor.skills.craft).toBe(0.9);
  });

  it('waits for the existing migration plan before completing later agenda work', () => {
    const actor = person('actor'),
      w = world([actor]),
      events: HistoricalEvent[] = [],
      emit = emitter(events);
    adoptAgenda(
      w,
      proposal(actor, {
        steps: [
          { action: 'relocate', label: '迁往邻近城镇', targetId: 'b', months: 1 },
          { action: 'practice', label: '适应新地方', months: 1 },
        ],
      }),
      emit,
    );
    advanceAgency(w, emit);
    expect(actor.locationId).toBe('a');
    const move = actor.plans.find((p) => p.kind === 'migrate')!;
    const paidCoin = actor.coin;
    w.month++;
    advanceAgency(w, emit);
    expect(actor.locationId).toBe('a');
    expect(actor.coin).toBe(paidCoin);
    expect(ensureAgency(w).agendas.actor.cursor).toBe(0);
    move.status = 'complete';
    actor.locationId = 'b';
    w.month++;
    advanceAgency(w, emit);
    w.month++;
    advanceAgency(w, emit);
    expect(ensureAgency(w).agendas.actor.status).toBe('complete');
    expect(ensureAgency(w).agendas.actor.cursor).toBe(2);
  });

  it('accounts for project duration and preserves coin while spending into the local economy', () => {
    const actor = person('actor'),
      w = world([actor]),
      events: HistoricalEvent[] = [],
      emit = emitter(events);
    w.settlements[0].unrest = 0.02;
    const beforeUnrest = w.settlements[0].unrest;
    adoptAgenda(
      w,
      proposal(actor, {
        steps: [{ action: 'project', label: '制作公共织机', months: 3, domain: 'civic' }],
      }),
      emit,
    );
    const total = () => actor.coin + w.settlements.reduce((n, s) => n + s.coin, 0);
    const before = total();
    advanceAgency(w, emit);
    const project = Object.values(ensureAgency(w).projects)[0];
    expect(project.progress).toBe(1);
    expect(project.status).toBe('active');
    w.month++;
    advanceAgency(w, emit);
    w.month++;
    advanceAgency(w, emit);
    expect(project.progress).toBe(3);
    expect(project.status).toBe('complete');
    expect(project.spent).toBe(5);
    expect(total()).toBe(before);
    expect(w.settlements[0].unrest).toBeLessThan(beforeUnrest);
  });

  it('cleans up in-flight project work if the planner dies', () => {
    const actor = person('actor'),
      w = world([actor]),
      events: HistoricalEvent[] = [],
      emit = emitter(events);
    adoptAgenda(
      w,
      proposal(actor, { steps: [{ action: 'project', label: '制作工具', months: 4 }] }),
      emit,
    );
    advanceAgency(w, emit);
    const project = Object.values(ensureAgency(w).projects)[0];
    expect(project.status).toBe('active');
    actor.death = w.month + 1;
    w.month++;
    advanceAgency(w, emit);
    expect(project.status).toBe('failed');
  });

  it('records the aid recipient in the committed action event and conserves transferred coin', () => {
    const actor = person('actor'),
      recipient = person('recipient'),
      w = world([actor, recipient]),
      events: HistoricalEvent[] = [],
      emit = emitter(events);
    recipient.coin = 0;
    adoptAgenda(w, proposal(actor, { steps: [{ action: 'aid', label: '资助困难邻居' }] }), emit);
    const total = () => actor.coin + recipient.coin + w.settlements.reduce((n, s) => n + s.coin, 0),
      before = total();
    advanceAgency(w, emit);
    const action = events.find(
      (e) => e.kind === 'agenda_step_completed' && e.data.action === 'aid',
    );
    expect(recipient.coin).toBe(2);
    expect(total()).toBe(before);
    expect(action?.personIds).toContain('recipient');
  });

  it('does not privilege an owner and rejects unknown actions or arbitrary effect fields', () => {
    const run = (ownerId?: string) => {
      const actor = person('actor', ownerId),
        w = world([actor]),
        events: HistoricalEvent[] = [],
        emit = emitter(events);
      adoptAgenda(w, proposal(actor), emit);
      advanceAgency(w, emit);
      return { world: w, events };
    };
    expect(run('player-1').world.agency).toEqual(run().world.agency);
    const raw = proposal(person('x')) as Record<string, any>;
    raw.steps = [{ action: 'rewrite_physics', label: '改变现实' }];
    expect(AgendaProposalSchema.safeParse(raw).success).toBe(false);
    raw.steps = [{ action: 'practice', label: '练习', effect: { coin: 1000 } }];
    expect(AgendaProposalSchema.safeParse(raw).success).toBe(false);
  });
});
