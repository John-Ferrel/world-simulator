import { describe, expect, it } from 'vitest';
import type { HistoricalEvent, Person, World } from '../packages/contracts/index.js';
import { reconsider } from '../packages/cognition/index.js';
import { createWorld, newPerson } from '../packages/world-packs/index.js';
import { advanceIdentity, ensureIdentity } from '../packages/identity/index.js';

it('does not use another person’s unobserved event as evidence for an affiliation', () => {
  const w = worldWith(['reader', 'witness']);
  const external = fact(w, 'quiet_life', ['witness']);
  w.persons[0].beliefs = [
    { claimId: 'faith:unobserved', confidence: 0.95, sourceIds: [external.id] },
  ];
  run(w, [external]);
  expect(w.identity?.profiles.reader?.religion).toBeUndefined();
});

const worldWith = (ids: string[]) => {
  const world = createWorld('identity-fixture');
  world.persons = ids.map((id, i) => newPerson(world, id, 'town-0', i, 30));
  world.eventSeq = 0;
  return world;
};
const localsFor = (world: World) => {
  const locals = new Map<string, Person[]>();
  for (const person of world.persons)
    if (person.death === undefined && !person.journey) {
      const list = locals.get(person.locationId) ?? [];
      list.push(person);
      locals.set(person.locationId, list);
    }
  return locals;
};
const fact = (
  world: World,
  kind: string,
  personIds: string[],
  data: Record<string, unknown> = {},
): HistoricalEvent => {
  const event: HistoricalEvent = {
    id: `${world.id}:e${++world.eventSeq}`,
    worldId: world.id,
    month: world.month,
    kind,
    personIds,
    locationId: 'town-0',
    causeIds: [],
    significance: 1,
    text: kind,
    data,
  };
  return event;
};
const run = (world: World, events: HistoricalEvent[]) => {
  const emitted: HistoricalEvent[] = [];
  const emit = (
    kind: string,
    personIds: string[],
    locationId: string | undefined,
    text: string,
    data: Record<string, unknown> = {},
    causeIds: string[] = [],
    significance = 0.5,
  ): HistoricalEvent => {
    const event: HistoricalEvent = {
      id: `${world.id}:e${++world.eventSeq}`,
      worldId: world.id,
      month: world.month,
      kind,
      personIds,
      locationId,
      causeIds,
      significance,
      text,
      data,
    };
    emitted.push(event);
    for (const id of personIds) {
      const person = world.persons.find((candidate) => candidate.id === id);
      if (person && !person.memories.some((memory) => memory.eventId === event.id))
        person.memories.push({
          id: `memory-${person.id}-${event.id}`,
          eventId: event.id,
          month: event.month,
          salience: significance,
        });
    }
    return event;
  };
  const state = advanceIdentity(world, emit, localsFor(world), events);
  return { state, emitted };
};

describe('experience-driven personal identity', () => {
  it('gives persecution, aid, betrayal, achievement, and failure distinct evidenced effects', () => {
    const w = worldWith([
      'persecuted',
      'recipient',
      'betrayer',
      'betrayed',
      'learner',
      'failed',
      'bereaved',
      'deceased',
      'war-witness',
    ]);
    const [
      persecuted,
      recipient,
      betrayer,
      betrayed,
      learner,
      failed,
      bereaved,
      deceased,
      warWitness,
    ] = w.persons;
    const learnerOpennessBaseline = learner.skills.learning;
    deceased.death = 0;
    bereaved.relationships.push({
      personId: deceased.id,
      trust: 0.9,
      attachment: 0.9,
      kind: 'kin',
      since: 0,
    });
    for (const person of w.persons) {
      person.values = { care: 0.5, ambition: 0.5, tradition: 0.5 };
      person.goals = [
        {
          id: `goal-${person.id}`,
          kind: 'belong',
          strength: 0.5,
          progress: 0,
          status: 'active',
          causeIds: [],
        },
      ];
    }
    const experiences = [
      fact(w, 'persecution_evidence', [persecuted.id], { classification: 'persecution-evidence' }),
      fact(w, 'agency_aid', [betrayer.id, recipient.id], { amount: 2, recipientId: recipient.id }),
      fact(w, 'social_betrayal', [betrayer.id, betrayed.id], { wage: 1 }),
      fact(w, 'agenda_step_completed', [learner.id], { action: 'research' }),
      fact(w, 'plan_failed', [failed.id], { reason: '资金不足' }),
      fact(w, 'bereavement', [bereaved.id, deceased.id]),
      fact(w, 'combat_casualty', [warWitness.id], { role: 'civilian' }),
    ];
    const { state, emitted } = run(w, experiences);

    expect(persecuted.values.tradition).toBeLessThan(0.5);
    expect(persecuted.values.care).toBe(0.5);
    expect(state.profiles.persecuted.axes.autonomy).toBeGreaterThan(0.5);
    expect(recipient.values.care).toBeGreaterThan(0.5);
    expect(state.profiles.recipient.axes.solidarity).toBeGreaterThan(0.5);
    expect(state.profiles.betrayed.axes.institutionalTrust).toBeLessThan(0.5);
    expect(state.profiles.betrayed.axes.institutionalTrust).toBeLessThan(
      state.profiles.betrayer.axes.institutionalTrust,
    );
    expect(state.profiles.learner.axes.pluralism).toBeGreaterThan(learnerOpennessBaseline);
    expect(failed.values.ambition).toBeLessThan(0.5);
    expect(state.profiles.failed.axes.autonomy).toBeLessThan(0.5);
    expect(bereaved.values.tradition).toBeGreaterThan(0.5);
    expect(bereaved.values.care).toBeGreaterThan(0.5);
    expect(warWitness.values.tradition).toBeLessThan(0.5);
    expect(state.profiles['war-witness'].axes.solidarity).toBeGreaterThan(0.5);
    const warShift = emitted.find(
      (event) => event.kind === 'identity_shift' && event.personIds[0] === warWitness.id,
    );
    expect(warShift?.text).toContain('更重视互助与共同承担');
    expect(warShift?.text).not.toContain('重新衡量自己的价值取向');
    expect(w.agency?.needsReplan.persecuted.causeIds).toContain(
      emitted.find((e) => e.kind === 'identity_shift' && e.personIds[0] === persecuted.id)?.id,
    );
    expect(w.agency?.needsReplan.recipient).toBeDefined();
    expect(
      persecuted.goals.some((goal) => goal.status === 'active' && goal.kind === 'reform'),
    ).toBe(true);
    expect(recipient.goals.some((goal) => goal.status === 'active' && goal.kind === 'belong')).toBe(
      true,
    );
  });

  it('spreads explicit beliefs through trusted local ties while rumors lower confidence, not truth', () => {
    const w = worldWith(['speaker', 'friend', 'stranger', 'traveler']);
    const [speaker, friend, stranger, traveler] = w.persons;
    speaker.relationships.push({
      personId: friend.id,
      trust: 0.9,
      attachment: 0.8,
      kind: 'friend',
      since: 0,
    });
    speaker.relationships.push({
      personId: traveler.id,
      trust: 0.95,
      attachment: 0.8,
      kind: 'friend',
      since: 0,
    });
    traveler.journey = {
      planId: 'journey-1',
      routeId: 'route-1',
      fromId: 'town-0',
      toId: 'town-1',
      departed: 0,
      distanceKm: 10,
      progressKm: 1,
      lastApplied: 0,
      blockedMonths: 0,
      causeIds: [],
    };
    const source = fact(w, 'faith_practice', [speaker.id]);
    speaker.memories.push({ id: 'source-memory', eventId: source.id, month: 0, salience: 0.8 });
    w.claims.push({
      id: 'faith:lantern_path',
      subjectId: speaker.id,
      predicate: 'A personal spiritual tradition',
      truth: 'unknown',
      sourceIds: [source.id],
    });
    speaker.beliefs.push({
      claimId: 'faith:lantern_path',
      confidence: 0.85,
      sourceIds: [source.id],
    });
    const witness = fact(w, 'faith_witness', [speaker.id, stranger.id], {
      tradition: 'faith:lantern_path',
    });
    const first = run(w, [witness]);
    const propagated = friend.beliefs.find((belief) => belief.claimId === 'faith:lantern_path');
    expect(propagated).toBeDefined();
    expect(propagated!.confidence).toBeGreaterThan(0);
    expect(propagated!.confidence).toBeLessThan(0.5);
    const initialConfidence = propagated!.confidence;
    expect(propagated!.sourceIds).toContain(
      first.emitted.find((e) => e.kind === 'belief_influenced')?.id,
    );
    expect(stranger.beliefs.some((belief) => belief.claimId === 'faith:lantern_path')).toBe(false);
    expect(traveler.beliefs.some((belief) => belief.claimId === 'faith:lantern_path')).toBe(false);

    const travelerSource = fact(w, 'faith_practice', [traveler.id]);
    traveler.memories.push({
      id: 'traveler-source-memory',
      eventId: travelerSource.id,
      month: 0,
      salience: 0.8,
    });
    w.claims.push({
      id: 'faith:travelers_path',
      subjectId: traveler.id,
      predicate: 'A personal spiritual tradition',
      truth: 'unknown',
      sourceIds: [travelerSource.id],
    });
    traveler.beliefs.push({
      claimId: 'faith:travelers_path',
      confidence: 0.85,
      sourceIds: [travelerSource.id],
    });
    const travelingWitness = fact(w, 'faith_witness', [traveler.id, friend.id], {
      tradition: 'faith:travelers_path',
    });
    run(w, [travelingWitness]);
    expect(friend.beliefs.some((belief) => belief.claimId === 'faith:travelers_path')).toBe(false);

    const rumor = fact(w, 'rumor', [speaker.id], { claimId: 'faith:lantern_path' });
    run(w, [rumor]);
    expect(
      friend.beliefs.find((belief) => belief.claimId === 'faith:lantern_path')!.confidence,
    ).toBeLessThan(initialConfidence);
    expect(w.claims[0].truth).toBe('unknown');
  });

  it('only records affiliations with explicit belief and experience evidence', () => {
    const w = worldWith([
      'descriptive-name-only',
      'explicit-believer',
      'unsupported-claim',
      'political-contact',
    ]);
    const [nameOnly, believer, unsupported, contact] = w.persons;
    nameOnly.name = 'Buddhist Christian Muslim';
    const evidence = fact(w, 'faith_practice', [believer.id], {
      tradition: 'faith:river_covenant',
    });
    const politicalEvidence = fact(w, 'political_commitment', [contact.id], {
      ideology: 'socialist',
    });
    believer.memories.push({ id: 'mem-faith', eventId: evidence.id, month: 0, salience: 0.8 });
    believer.beliefs.push({
      claimId: 'faith:river_covenant',
      confidence: 0.8,
      sourceIds: [evidence.id],
    });
    unsupported.beliefs.push({ claimId: 'faith:invented', confidence: 0.9, sourceIds: [] });
    unsupported.beliefs.push({ claimId: 'political:socialist', confidence: 0.9, sourceIds: [] });
    w.claims.push({
      id: 'faith:river_covenant',
      subjectId: believer.id,
      predicate: 'An explicitly held faith claim',
      truth: 'unknown',
      sourceIds: [evidence.id],
    });

    const { state, emitted } = run(w, [politicalEvidence]);
    expect(state.profiles[believer.id].religion?.id).toBe('faith:river_covenant');
    expect(state.profiles[contact.id].political?.id).toBe('socialist');
    expect(state.profiles[unsupported.id]?.religion).toBeUndefined();
    expect(state.profiles[unsupported.id]?.political).toBeUndefined();
    expect(state.profiles[nameOnly.id]).toBeUndefined();
    expect(emitted.filter((event) => event.kind === 'identity_affiliation_changed')).toHaveLength(
      2,
    );
    expect(w.claims[0].truth).toBe('unknown');
  });

  it('is idempotent for replayed experiences and gives owned and ordinary people equal changes', () => {
    const left = worldWith(['person']),
      right = structuredClone(left);
    right.eventSeq = left.eventSeq;
    right.persons[0].ownerId = 'test-account';
    const shared = fact(left, 'political_repression', ['person'], {
      classification: 'coercive-policy',
    });
    const rightEvent = { ...shared, worldId: right.id };
    right.eventSeq = left.eventSeq;
    const first = run(left, [shared]);
    const changed = { ...left.persons[0].values };
    const emittedCount = first.emitted.length;
    run(left, [shared]);
    const second = run(right, [rightEvent]);
    expect(left.persons[0].values).toEqual(changed);
    expect(first.emitted.length).toBe(emittedCount);
    expect(right.persons[0].values).toEqual(left.persons[0].values);
    expect(second.state.profiles.person.axes).toEqual(first.state.profiles.person.axes);
    expect(left.agency?.needsReplan.person.causeIds).toEqual(
      right.agency?.needsReplan.person.causeIds,
    );
  });

  it('keeps grief, stress, and goal response in reconsider without uniform value drift', () => {
    const w = worldWith(['remembering']),
      person = w.persons[0];
    const before = { ...person.values };
    const bereavement = fact(w, 'death', [person.id]);
    reconsider(person, bereavement, 'survive');
    expect(person.values).toEqual(before);
    expect(person.stress).toBeGreaterThan(0);
    expect(person.goals.some((goal) => goal.kind === 'survive' && goal.status === 'active')).toBe(
      true,
    );
  });
});

it('lets routine care and research reinforce values without repeatedly replacing a life goal', () => {
  const w = worldWith(['steady']);
  const p = w.persons[0];
  p.goals = [
    { id: 'lasting', kind: 'learn', strength: 0.8, progress: 0.2, status: 'active', causeIds: [] },
  ];
  const before = p.values.care;
  for (let month = 1; month <= 24; month++) {
    w.month = month;
    run(w, [fact(w, 'agenda_step_completed', [p.id], { action: month % 2 ? 'care' : 'research' })]);
  }
  expect(p.values.care).toBeGreaterThan(before);
  expect(p.goals.filter((g) => g.status === 'active').map((g) => g.id)).toEqual(['lasting']);
  expect(p.goals).toHaveLength(1);
  // Acute persecution still has authority to trigger evidenced radical change.
  run(w, [fact(w, 'persecution_evidence', [p.id], { classification: 'persecution-evidence' })]);
  expect(p.goals.some((g) => g.kind === 'reform' && g.status === 'active')).toBe(true);
});

it('does not log further personality movement after the relevant axes have reached their bounds', () => {
  const w = worldWith(['settled']);
  const p = w.persons[0];
  p.values = { care: 0.97, ambition: 0.97, tradition: 0.03 };
  p.goals = [
    {
      id: 'lasting-learning',
      kind: 'learn',
      strength: 0.8,
      progress: 0.1,
      status: 'active',
      causeIds: [],
    },
  ];
  ensureIdentity(w).profiles[p.id] = {
    personId: p.id,
    axes: {
      care: 0.97,
      ambition: 0.97,
      tradition: 0.03,
      solidarity: 0.97,
      autonomy: 0.97,
      pluralism: 0.97,
      institutionalTrust: 0.03,
    },
    pressure: {},
    inertia: 0.5,
    evidenceIds: [],
    lastShiftMonth: -1,
  };
  const shifts: HistoricalEvent[] = [];
  for (let month = 1; month <= 12; month++) {
    w.month = month;
    shifts.push(
      ...run(w, [
        fact(w, 'agenda_step_completed', [p.id], { action: month % 2 ? 'care' : 'research' }),
      ]).emitted.filter((e) => e.kind === 'identity_shift'),
    );
  }
  expect(shifts).toHaveLength(0);
  expect(p.values).toEqual({ care: 0.97, ambition: 0.97, tradition: 0.03 });
  const persecution = fact(w, 'persecution_evidence', [p.id], {
    classification: 'persecution-evidence',
  });
  const response = run(w, [persecution]);
  expect(response.emitted.some((e) => e.kind === 'identity_shift')).toBe(false);
  const goal = response.emitted.find((e) => e.kind === 'goal_transition');
  expect(goal?.causeIds).toContain(persecution.id);
  expect(p.goals.some((g) => g.kind === 'reform' && g.status === 'active')).toBe(true);
});
