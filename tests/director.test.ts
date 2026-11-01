import { describe, expect, it } from 'vitest';
import { createWorld } from '../packages/world-packs/index.js';
import { advance } from '../packages/simulation-core/index.js';
import type { HistoricalEvent } from '../packages/contracts/index.js';
import {
  applyDirectorProposal,
  compileDirectorProposal,
  directorProposalFrom,
  ensureRuntime,
  fallbackDirectorProposal,
  observeDirector,
  RuleCompileError,
} from '../packages/rules/index.js';

function emitFor(w: ReturnType<typeof createWorld>) {
  const events: HistoricalEvent[] = [];
  let seq = 0;
  const emit = (
    kind: string,
    people: string[],
    locationId: string | undefined,
    text: string,
    data: Record<string, unknown> = {},
    causes: string[] = [],
    significance = 0.5,
  ) => {
    const event: HistoricalEvent = {
      id: `${w.id}:director${++seq}`,
      worldId: w.id,
      month: w.month,
      kind,
      personIds: [...new Set(people)],
      locationId,
      text,
      data,
      causeIds: [...new Set(causes)],
      significance,
    };
    events.push(event);
    return event;
  };
  return { emit, events };
}

function highPressure(w: ReturnType<typeof createWorld>) {
  const site = w.settlements[0];
  site.scarcity = 0.8;
  site.unrest = 0.6;
  site.food = 0;
  return site;
}

describe('strong History Director', () => {
  it('detects a pressure window and observes its own cooldown', () => {
    const w = createWorld('director-observe');
    highPressure(w);
    const requests = observeDirector(w, []);
    expect(requests).toHaveLength(1);
    expect(requests[0].kind).toBe('history_director');
    expect(requests[0].pressure).toBe('shortage');
    expect(observeDirector(w, [])).toHaveLength(0);
  });

  it('seeds a real pressure through existing state with an audit event', () => {
    const w = createWorld('director-pressure');
    const site = highPressure(w);
    const request = observeDirector(w, [])[0];
    const compiled = compileDirectorProposal(
      {
        version: 1,
        jobId: request.jobId,
        action: 'seed_pressure',
        scope: { kind: 'site', ids: [site.id] },
        rationale: '测试压力创设',
        effects: [{ type: 'unrest', site: 'site', amount: 0.1 }],
        budget: 1,
        chainDepth: 0,
      },
      w,
      'director-cause',
    );
    const before = site.unrest;
    const { emit, events } = emitFor(w);
    const applied = applyDirectorProposal(w, compiled, request.causeIds, emit);
    expect(applied.event.kind).toBe('director_action');
    expect(site.unrest).toBeGreaterThan(before);
    expect(events.some((event) => event.kind === 'director_action')).toBe(true);
    expect(ensureRuntime(w).director?.actions.at(-1)?.accepted).toBe(true);
  });

  it('opens a real person opportunity without teleporting or forcing participation', () => {
    const w = createWorld('director-opportunity');
    const site = highPressure(w);
    const target = w.persons.find((p) => p.locationId === site.id && p.death === undefined)!;
    const request = observeDirector(w, [])[0];
    const compiled = compileDirectorProposal(
      {
        version: 1,
        jobId: request.jobId,
        action: 'open_opportunity',
        scope: { kind: 'site', ids: [site.id] },
        rationale: '邀请实际在场者讨论互助',
        effects: [
          {
            type: 'offer',
            role: 'beneficiary',
            intention: '参加本地互助讨论',
            action: 'socialize',
          },
        ],
        targetIds: [target.id],
        budget: 1,
      },
      w,
      'director-cause',
    );
    const { emit } = emitFor(w);
    applyDirectorProposal(w, compiled, [], emit);
    const opportunities = Object.values(ensureRuntime(w).opportunities);
    expect(opportunities).toHaveLength(1);
    expect(opportunities[0].personId).toBe(target.id);
    expect(opportunities[0].status).toBe('open');
    expect(target.locationId).toBe(site.id);
  });

  it('rejects direct state transfers, missing targets and over-budget actions', () => {
    const w = createWorld('director-reject');
    const site = highPressure(w);
    const target = w.persons.find((p) => p.locationId === site.id)!;
    const request = observeDirector(w, [])[0];
    expect(() =>
      compileDirectorProposal(
        {
          version: 1,
          jobId: request.jobId,
          action: 'seed_pressure',
          scope: { kind: 'site', ids: [site.id] },
          rationale: '非法直接转移',
          effects: [{ type: 'transfer', from: 'site', to: 'site', resource: 'coin', amount: 1 }],
        },
        w,
        'cause',
      ),
    ).toThrow(RuleCompileError);
    expect(() =>
      compileDirectorProposal(
        {
          version: 1,
          jobId: request.jobId,
          action: 'open_opportunity',
          scope: { kind: 'site', ids: [site.id] },
          rationale: '目标不在场',
          effects: [{ type: 'offer', role: 'beneficiary', intention: '邀请', action: 'socialize' }],
          targetIds: ['person-missing'],
        },
        w,
        'cause',
      ),
    ).toThrow(RuleCompileError);
    const valid = compileDirectorProposal(
      {
        version: 1,
        jobId: request.jobId,
        action: 'open_opportunity',
        scope: { kind: 'site', ids: [site.id] },
        rationale: '真实邀请',
        effects: [{ type: 'offer', role: 'beneficiary', intention: '邀请', action: 'socialize' }],
        targetIds: [target.id],
      },
      w,
      'cause',
    );
    const { emit } = emitFor(w);
    applyDirectorProposal(w, valid, [], emit);
    expect(() =>
      compileDirectorProposal(
        {
          version: 1,
          jobId: request.jobId,
          action: 'reshape_agenda',
          scope: { kind: 'site', ids: [site.id] },
          rationale: '同月第二次',
          preferences: { cooperation: 0.6 },
        },
        w,
        'cause',
      ),
    ).toThrow(/budget|month/i);
  });

  it('commissions an event definition through the same compiler and leaves prior history intact', () => {
    const w = createWorld('director-commission');
    const site = highPressure(w);
    const request = observeDirector(w, [])[0];
    const definition = {
      schemaVersion: 1,
      id: 'director.commissioned.test',
      version: 1,
      kind: 'event',
      title: '导演委托的地方事件',
      scope: { kind: 'site', ids: [site.id] },
      roles: [{ name: 'resident', minAge: 18, maxAge: 70, willingness: 0.8 }],
      trigger: { kind: 'periodic', interval: 1 },
      conditions: { op: 'all', args: [] },
      effects: [{ type: 'policy', role: 'resident', kind: 'cooperate', strength: 0.05, months: 6 }],
      chance: 1,
      cooldown: 6,
      maxOccurrences: 4,
      gas: 400,
      significance: 0.5,
      provenance: {
        source: 'director',
        model: 'test',
        observedMonth: w.month,
        compiler: 'rules/1',
      },
    };
    const compiled = compileDirectorProposal(
      {
        version: 1,
        jobId: request.jobId,
        action: 'commission_event',
        scope: { kind: 'site', ids: [site.id] },
        rationale: '补齐缺失事件族',
        definition,
        budget: 1,
      },
      w,
      'cause',
    );
    const { emit } = emitFor(w);
    const before = JSON.stringify(w.persons);
    const applied = applyDirectorProposal(w, compiled, [], emit);
    expect(applied.definition?.id).toBe('director.commissioned.test');
    expect(ensureRuntime(w).active['director.commissioned.test']).toBeDefined();
    expect(JSON.stringify(w.persons)).toBe(before);
  });

  it('applies a bounded multi-site world pressure instead of a free-text global delta', () => {
    const w = createWorld('director-world-budget');
    const compiled = compileDirectorProposal(
      {
        version: 1,
        jobId: 'director-world',
        action: 'seed_pressure',
        scope: { kind: 'world', ids: [] },
        rationale: '全球压力只落在有界的前两个真实城市',
        effects: [{ type: 'unrest', site: 'site', amount: 0.05 }],
        budget: 2,
        chainDepth: 0,
      },
      w,
      'cause',
    );
    const before = new Map(w.settlements.map((site) => [site.id, site.unrest]));
    const { emit } = emitFor(w);
    const applied = applyDirectorProposal(w, compiled, [], emit);
    expect(applied.event.data.affectedSiteIds).toHaveLength(2);
    for (const id of applied.event.data.affectedSiteIds as string[])
      expect(w.settlements.find((site) => site.id === id)!.unrest).toBeGreaterThan(
        before.get(id) ?? -1,
      );
  });

  it('records a rejected director proposal without changing the world', () => {
    const w = createWorld('director-rejected-history');
    const site = highPressure(w);
    const out = advance(
      w,
      [
        {
          id: 'bad-director',
          kind: 'director_action',
          proposal: {
            version: 1,
            jobId: 'bad-director',
            action: 'seed_pressure',
            scope: { kind: 'site', ids: [site.id] },
            rationale: '非法直接转移',
            effects: [{ type: 'transfer', from: 'site', to: 'site', resource: 'coin', amount: 1 }],
          },
        },
      ],
      false,
    );
    expect(out.results[0].ok).toBe(false);
    expect(out.events.some((event) => event.kind === 'director_proposal_rejected')).toBe(true);
    expect(out.world.runtime?.director?.actions ?? []).toHaveLength(0);
  });

  it('forces director model provenance and job scope', () => {
    const job = { id: 'director-job-1', observed_month: 6, payload: { request: { id: 'r1' } } };
    const result = directorProposalFrom(
      {
        action: 'reshape_agenda',
        scope: { kind: 'world', ids: [] },
        rationale: 'test',
        preferences: { innovation: 0.7 },
      },
      job,
    ) as { proposal: { jobId: string; version: number } };
    expect(result.proposal.jobId).toBe(job.id);
    expect(result.proposal.version).toBe(1);
  });

  it('creates a real historical-person contact opportunity at the same place', () => {
    const w = createWorld('director-historical');
    const site = w.settlements[0];
    const historical = w.persons.find((p) => p.locationId === site.id)!;
    historical.historicalIdentity = {
      qid: 'Q999001',
      sourceUrl: 'https://example.invalid/source',
      birthPrecision: 'year',
    };
    historical.name = '历史人物甲';
    const player = w.persons.find((p) => p.locationId === site.id && p.id !== historical.id)!;
    player.ownerId = 'historical-user';
    w.month = 12;
    const request = observeDirector(w, [])[0];
    expect(request.pressure).toBe('historical-contact');
    const proposal = fallbackDirectorProposal(w, request);
    expect(proposal.action).toBe('open_opportunity');
    if (proposal.action !== 'open_opportunity') return;
    expect(proposal.targetIds).toEqual([player.id]);
    const offer = proposal.effects.find((effect) => effect.type === 'offer');
    expect(offer?.type).toBe('offer');
    if (offer?.type === 'offer') expect(offer.targetId).toBe(`person:${historical.id}`);
    const compiled = compileDirectorProposal(proposal, w, 'cause');
    const { emit } = emitFor(w);
    applyDirectorProposal(w, compiled, [], emit);
    const opportunity = Object.values(ensureRuntime(w).opportunities)[0];
    expect(opportunity.personId).toBe(player.id);
    expect(opportunity.targetId).toBe(historical.id);
    expect(player.locationId).toBe(historical.locationId);
  });

  it('produces a deterministic fallback opportunity for a real local target', () => {
    const w = createWorld('director-fallback');
    const site = highPressure(w);
    const request = observeDirector(w, [])[0];
    const proposal = fallbackDirectorProposal(w, request);
    expect(['open_opportunity', 'reshape_agenda']).toContain(proposal.action);
    if (proposal.action === 'open_opportunity') {
      expect(proposal.targetIds).toHaveLength(1);
      expect(w.persons.find((p) => p.id === proposal.targetIds[0])?.locationId).toBe(site.id);
    }
  });
});
