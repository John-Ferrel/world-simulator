import { monthIndex, type EventFact, type WorldDate } from './domain.js';

/**
 * A life passage is a projection over committed facts, not a second history.
 * It groups nearby events from the same action family so the observer can read
 * a short continuous episode without duplicating or inventing facts.
 */
export type LifePassage = {
  id: string;
  from: WorldDate;
  to: WorldDate;
  title: string;
  eventIds: string[];
  text: string;
};

function familyKey(event: EventFact): string {
  if (event.provenance.kind === 'system' && event.provenance.sourceId) {
    return `system:${event.provenance.sourceId.split(':').slice(0, 3).join(':')}`;
  }
  const slash = event.action.indexOf('/');
  return slash > 0 ? event.action.slice(0, slash) : event.action;
}

function eventText(event: EventFact): string {
  const text = event.immediateText.trim();
  if (text.length > 0) return text;
  if (event.title) return event.title;
  return event.action;
}

export function buildLifePassages(
  events: readonly EventFact[],
  options: { maxEvents?: number; maxPassages?: number } = {},
): LifePassage[] {
  const sorted = [...events]
    .filter((event) => event.immediateText.trim().length > 0 || Boolean(event.title))
    .sort((a, b) => monthIndex(a.date) - monthIndex(b.date) || a.id.localeCompare(b.id));
  const maxEvents = Math.max(1, Math.min(12, options.maxEvents ?? 5));
  const groups: { events: EventFact[]; key: string }[] = [];
  for (const event of sorted) {
    const key = familyKey(event);
    const last = groups[groups.length - 1];
    const sameMonth =
      last && monthIndex(last.events[last.events.length - 1]!.date) === monthIndex(event.date);
    const sameFamily = last?.key === key;
    const room = last && last.events.length < maxEvents;
    if (last && sameFamily && room && (sameMonth || last.events.length < 2)) {
      last.events.push(event);
    } else {
      groups.push({ events: [event], key });
    }
  }
  const passages = groups.map((group, index) => {
    const first = group.events[0]!;
    const last = group.events[group.events.length - 1]!;
    const title = first.title ?? first.action.split('/')[0] ?? '人生片段';
    return {
      id: `passage:${first.id}:${index}`,
      from: { ...first.date },
      to: { ...last.date },
      title,
      eventIds: group.events.map((event) => event.id),
      text: group.events.map(eventText).join(' '),
    };
  });
  return passages.slice(-Math.max(1, options.maxPassages ?? 40));
}
