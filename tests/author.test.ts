import { describe, expect, it } from 'vitest';
import { createWorld } from '../packages/world-packs/index.js';
import { advance } from '../packages/simulation-core/index.js';
import type { HistoricalEvent } from '../packages/contracts/index.js';
import {
  advanceRules,
  compileRule,
  eventAuthorProposalFrom,
  fallbackEventDefinition,
  installDefinition,
  observeWorld,
  RuleCompileError,
  type RuleDefinition,
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
      id: `${w.id}:author${++seq}`,
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

describe('dynamic event observer and automatic publication', () => {
  it('detects a real local pressure and does not duplicate the same request', () => {
    const w = createWorld('author-observe');
    const site = w.settlements[0];
    site.scarcity = 0.8;
    site.unrest = 0.6;
    site.food = 0;
    const first = observeWorld(w, []);
    expect(first).toHaveLength(1);
    expect(first[0].siteId).toBe(site.id);
    expect(first[0].pressure).toBe('shortage');
    const second = observeWorld(w, []);
    expect(second).toHaveLength(0);
    expect(w.runtime?.authorRequests).toHaveLength(1);
  });

  it('compiles a deterministic fallback event and produces a real occurrence', () => {
    const w = createWorld('author-fallback');
    const site = w.settlements[0];
    site.scarcity = 0.8;
    site.unrest = 0.6;
    site.food = 0;
    const request = observeWorld(w, [])[0];
    const raw = { ...fallbackEventDefinition(w, request), chance: 1 };
    const compiled = compileRule(raw, w, { source: 'builtin', jobId: request.jobId });
    installDefinition(w, compiled.definition, 'author-activation');
    const { emit, events } = emitFor(w);
    const result = advanceRules(w, emit, []);
    expect(result.occurrences).toBe(1);
    expect(events.some((event) => event.kind === 'rule_occurrence')).toBe(true);
    expect(compiled.definition.kind).toBe('event');
    expect(compiled.definition.provenance.source).toBe('builtin');
    expect(compiled.definition.provenance.jobId).toBe(request.jobId);
  });

  it('publishes through the canonical command and marks the author request used', () => {
    const w = createWorld('author-command');
    const site = w.settlements[0];
    site.scarcity = 0.8;
    site.unrest = 0.6;
    site.food = 0;
    site.fertility = 0;
    const request = observeWorld(w, [])[0];
    const definition = { ...fallbackEventDefinition(w, request), chance: 1 };
    const published = advance(
      w,
      [
        {
          id: 'author-publish-1',
          kind: 'rule_proposal',
          proposal: definition,
          source: 'builtin',
          jobId: request.jobId,
        },
      ],
      false,
    );
    expect(published.results[0].ok).toBe(true);
    expect(published.world.runtime?.authorRequests[0].status).toBe('used');
    const next = advance(published.world);
    expect(next.events.some((event) => event.kind === 'rule_occurrence')).toBe(true);
  });

  it('rejects a malformed author proposal instead of inventing a source', () => {
    const w = createWorld('author-reject');
    const request = observeWorld(w, [])[0] ?? {
      id: 'author-test',
      siteId: w.settlements[0].id,
      reason: 'test',
      month: 0,
      kind: 'event_author' as const,
      causeIds: [],
      status: 'open' as const,
      jobId: 'author-job-test',
    };
    const raw = {
      ...fallbackEventDefinition(w, request),
      effects: [{ type: 'transfer', from: 'ghost', to: 'site', resource: 'coin', amount: 99 }],
    };
    expect(() => compileRule(raw, w, { source: 'model' })).toThrow(RuleCompileError);
  });

  it('records a rejected auto-published definition instead of admitting it', () => {
    const w = createWorld('author-rejected-history');
    const out = advance(
      w,
      [
        {
          id: 'bad-rule',
          kind: 'rule_proposal',
          proposal: {
            ...fallbackEventDefinition(w, {
              id: 'r',
              siteId: w.settlements[0].id,
              reason: 'test',
              month: 0,
              kind: 'event_author',
              causeIds: [],
              status: 'open',
              jobId: 'j',
            }),
            effects: [{ type: 'transfer', from: 'ghost', to: 'site', resource: 'coin', amount: 1 }],
          },
          source: 'builtin',
        },
      ],
      false,
    );
    expect(out.results[0].ok).toBe(false);
    expect(out.events.some((event) => event.kind === 'rule_definition_rejected')).toBe(true);
    expect(out.world.runtime?.active ?? {}).toEqual({});
  });

  it('forces model provenance and job scope while leaving semantic validation to the world compiler', () => {
    const job = {
      id: 'author-job-1',
      observed_month: 3,
      payload: { request: { id: 'request-1', reason: 'shortage', siteId: 'town-0' } },
    };
    const result = eventAuthorProposalFrom(
      {
        title: '街角互助',
        scope: { kind: 'site', ids: ['town-0'] },
        roles: [{ name: 'a', occupation: '农人' }],
        trigger: { kind: 'periodic', interval: 1 },
        conditions: { op: 'all', args: [] },
        effects: [{ type: 'transfer', from: 'a', to: 'site', resource: 'coin', amount: 1 }],
      },
      job,
    ) as unknown as { proposal: RuleDefinition };
    expect(result.proposal.kind).toBe('event');
    expect(result.proposal.provenance.source).toBe('model');
    expect(result.proposal.provenance.jobId).toBe(job.id);
  });
});
