import type { EventFact, WorldDate, WorldState } from '../domain.js';
import type { MacroState } from '../macro.js';
import {
  historicalCandidatesForWindow,
  loadHistoricalIndex,
  queryHistoricalPeople,
  type HistoricalEventRecord,
  type HistoricalPersonRecord,
} from './index.js';

export type HistoricalReviewStatus = 'matched' | 'no-committed-analogue' | 'not-reached';

export type HistoricalReviewCandidate = {
  id: string;
  year: number;
  title: string;
  sourceType: 'fact' | 'inference';
  confidence: number;
  status: HistoricalReviewStatus;
  matchedEventIds: string[];
  note: string;
};

export type HistoricalReview = {
  date: WorldDate;
  window: { fromYear: number; toYear: number };
  countryCodes: string[];
  candidates: HistoricalReviewCandidate[];
  matchedCandidates: number;
  unobservedCandidates: number;
  historicalPeopleAlive: {
    id: string;
    title: string;
    realWorldDeath?: string;
    note: string;
  }[];
  forkSignals: string[];
  note: string;
};

function yearOf(value: string): number {
  return Number(value.slice(0, 4));
}

function worldCountryCodes(world: WorldState): string[] {
  const codes = new Set<string>();
  for (const place of Object.values(world.places)) {
    if (place.regionId?.includes('vienna') || place.regionId?.includes('lower-austria')) {
      codes.add('AUT');
    }
    if (place.regionId?.includes('klosterneuburg')) codes.add('AUT');
  }
  if (codes.size === 0) codes.add('AUT');
  return [...codes];
}

function committedEventsInWindow(world: WorldState, fromYear: number, toYear: number): EventFact[] {
  return world.events.filter(
    (event) =>
      event.date.year >= fromYear && event.date.year <= toYear && event.significance >= 0.35,
  );
}

function matchEvent(candidate: HistoricalEventRecord, events: EventFact[]): EventFact[] {
  const hooks = new Set(
    [...(candidate.candidateHooks ?? []), ...(candidate.causalTags ?? [])].map((value) =>
      value.toLowerCase(),
    ),
  );
  const titleWords = candidate.title
    .toLowerCase()
    .split(/[^a-z0-9\u4e00-\u9fff]+/)
    .filter((word) => word.length >= 5);
  return events.filter((event) => {
    const eventTags = new Set((event.tags ?? []).map((tag) => tag.toLowerCase()));
    const action = event.action.toLowerCase();
    const text = event.immediateText.toLowerCase();
    if ([...hooks].some((hook) => eventTags.has(hook) || action.includes(hook))) return true;
    if (titleWords.some((word) => text.includes(word))) return true;
    return false;
  });
}

function forkSignals(world: WorldState, macro: MacroState | undefined): string[] {
  const signals: string[] = [];
  for (const development of Object.values(macro?.developments ?? {})) {
    const process = development.historical;
    if (!process) continue;
    const influence = Object.values(process.participants).reduce(
      (sum, participant) => sum + participant.influence,
      0,
    );
    if (influence >= 0.5 && process.phase !== 'ended') {
      signals.push(
        `${development.id}: ${process.kind} in ${process.phase}, participation influence ${influence.toFixed(2)}`,
      );
    }
  }
  const offices = Object.values(world.positions).filter((position) => position.end === undefined);
  const powerful = offices.filter((position) => position.authority.length >= 2);
  if (powerful.length > 0) {
    signals.push(
      `${powerful.length} active offices carry at least two authority grants (e.g. ${powerful
        .slice(0, 3)
        .map((position) => position.title)
        .join(', ')})`,
    );
  }
  const playerBorn = Object.values(world.persons).filter(
    (person) => person.provenance.kind === 'birth' && person.roles.length > 3,
  );
  if (playerBorn.length > 0) {
    signals.push(
      `${playerBorn.length} player-born persons accumulated more than three public roles`,
    );
  }
  return signals.slice(0, 8);
}

/**
 * Deterministic five-year historical review. It does not rewrite the past and
 * does not force the real timeline. It records which indexed candidates have a
 * committed analogue in this world, which do not, and which real people are
 * still alive. It is safe to run without a model; a later Director pass may use
 * the result to propose a new架空 development.
 */
export function reviewHistoricalWorld(
  world: WorldState,
  fromYear: number,
  toYear: number,
): HistoricalReview {
  const index = loadHistoricalIndex();
  const countryCodes = worldCountryCodes(world);
  const candidates = historicalCandidatesForWindow(fromYear, toYear, countryCodes);
  const events = committedEventsInWindow(world, fromYear, toYear);
  const reviewed: HistoricalReviewCandidate[] = candidates.map((candidate) => {
    const record = index.byId.get(candidate.id) as HistoricalEventRecord | undefined;
    if (!record) {
      return {
        ...candidate,
        sourceType: candidate.sourceType as 'fact' | 'inference',
        status: 'not-reached',
        matchedEventIds: [],
        note: 'candidate record missing from index',
      };
    }
    const matches = matchEvent(record, events);
    return {
      id: candidate.id,
      year: candidate.year,
      title: candidate.title,
      sourceType: candidate.sourceType as 'fact' | 'inference',
      confidence: candidate.confidence,
      status: matches.length > 0 ? 'matched' : 'no-committed-analogue',
      matchedEventIds: matches.slice(0, 4).map((event) => event.id),
      note:
        matches.length > 0
          ? 'A committed event shares a hook or title term with this candidate. This is similarity, not proof the historical event occurred.'
          : 'No committed event in this window shares a hook or title term. The world may have diverged, or the event may simply not be witnessed by the named population.',
    };
  });
  const people = queryHistoricalPeople({
    aliveInYear: toYear,
    countryCodes,
    limit: 40,
  }).filter((person) => {
    const birth = person.birth ? yearOf(person.birth.date) : 0;
    const death = person.death ? yearOf(person.death.date) : 9999;
    return birth <= toYear && death >= fromYear;
  });
  const historicalPeopleAlive: HistoricalReview['historicalPeopleAlive'] = people.map(
    (person: HistoricalPersonRecord) => ({
      id: person.id,
      title: person.title,
      ...(person.death ? { realWorldDeath: person.death.date } : {}),
      note: 'Reference lifespan only; the simulator does not use it as a death command.',
    }),
  );
  const matchedCandidates = reviewed.filter((candidate) => candidate.status === 'matched').length;
  const unobservedCandidates = reviewed.filter(
    (candidate) => candidate.status === 'no-committed-analogue',
  ).length;
  return {
    date: { ...world.date },
    window: { fromYear, toYear },
    countryCodes,
    candidates: reviewed,
    matchedCandidates,
    unobservedCandidates,
    historicalPeopleAlive,
    forkSignals: forkSignals(world, world.macro),
    note: 'Deterministic review only. Similarity between a candidate and a committed event is not evidence that the real event happened; absence is not proof of divergence.',
  };
}

export function attachHistoricalReview(world: WorldState, review: HistoricalReview): void {
  if (!world.macro) return;
  world.macro.historyReview = review;
}
