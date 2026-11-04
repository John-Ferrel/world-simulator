/**
 * Phase 14 complete-life dossier.
 *
 * Runs the real engine for several seeds, then writes every subject event for
 * selected people. This is deliberately not a "best of" sample: the dossier
 * keeps failures, dead ends, childhoods, and the years after a life ends.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { advanceV4Year } from '../packages/v4/engine.js';
import { ageAt, type EventFact, type Person, type WorldState } from '../packages/v4/domain.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { VIENNA_1912_SEED, VIENNA_1912_SCENES } from '../packages/v4/content/vienna-1912.js';
import { VIENNA_LIFE_SCENES } from '../packages/v4/content/vienna-life.js';
import { VIENNA_POSTWAR_SCENES } from '../packages/v4/content/vienna-postwar.js';
import { VIENNA_HISTORY_SCENES } from '../packages/v4/content/vienna-history.js';
import { VIENNA_DEVELOPMENT_SCENES } from '../packages/v4/content/vienna-developments.js';
import { VIENNA_FAMILY_RUNTIME_SCENES } from '../packages/v4/content/vienna-family.js';
import { ALL_EVENT_SCENES, ALL_TASKS } from '../packages/v4/content/generated/index.js';
import { DEFAULT_COMPOSITION } from '../packages/v4/composition/default.js';
import { parseComposedAction } from '../packages/v4/composition/replay.js';

const BASE_SCENES = [
  ...VIENNA_1912_SCENES,
  ...VIENNA_LIFE_SCENES,
  ...VIENNA_POSTWAR_SCENES,
  ...VIENNA_HISTORY_SCENES,
  ...VIENNA_DEVELOPMENT_SCENES,
  ...VIENNA_FAMILY_RUNTIME_SCENES,
  ...ALL_EVENT_SCENES,
];

type Run = {
  seed: string;
  world: WorldState;
  events: EventFact[];
};

type Selection = {
  role: string;
  person: Person;
  events: EventFact[];
};

const args = process.argv.slice(2);
const years = Number(args[0] ?? 70);
const seeds = (args[1] ?? 'vienna-1912-vertical-slice,phase14-b,phase14-c').split(',');
const perSeedLives = Number(args[2] ?? 2);

function runSeed(seed: string): Run {
  let world = applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
  world.seed = seed;
  const events: EventFact[] = [];
  for (let index = 0; index < years; index += 1) {
    const result = advanceV4Year(world, BASE_SCENES, {
      economy: { enabled: true },
      eventRuntime: true,
      agency: true,
      tasks: ALL_TASKS,
      composition: DEFAULT_COMPOSITION,
      maxOrdinaryEventsPerPerson: 4,
      maxAgencyActorsPerYear: 96,
    });
    world = result.world;
    events.push(...result.events);
  }
  return { seed, world, events };
}

function subjectEvents(events: EventFact[], personId: string): EventFact[] {
  return events
    .filter((event) => event.subjectId === personId)
    .sort(
      (a, b) =>
        a.date.year * 12 + a.date.month - (b.date.year * 12 + b.date.month) ||
        a.id.localeCompare(b.id),
    );
}

function birthCount(events: EventFact[], personId: string): number {
  return events.filter((event) =>
    event.effects.some(
      (effect) =>
        effect.type === 'birth' && effect.parentIds.some((parentId) => parentId === personId),
    ),
  ).length;
}

function selectLives(run: Run): Selection[] {
  const livingIds = Object.keys(run.world.persons);
  const withEvents = livingIds
    .map((id) => ({
      person: run.world.persons[id]!,
      events: subjectEvents(run.events, id),
    }))
    .filter((entry) => entry.events.length >= 8);
  const chosen = new Map<string, Selection>();
  const add = (role: string, entry: { person: Person; events: EventFact[] } | undefined) => {
    if (!entry || chosen.has(entry.person.id)) return;
    chosen.set(entry.person.id, { role, person: entry.person, events: entry.events });
  };

  const earlyDeath = [...withEvents]
    .filter((entry) => entry.person.died && entry.person.died.year - entry.person.born.year < 18)
    .sort((a, b) => b.events.length - a.events.length)[0];
  add('short_lived_child', earlyDeath);

  const worker = [...withEvents]
    .filter((entry) => entry.person.employment || entry.person.roles.includes('worker'))
    .sort((a, b) => b.events.length - a.events.length)[0];
  add('working_life', worker);

  const educated = [...withEvents]
    .filter(
      (entry) =>
        ['higher', 'university', 'apprenticeship'].includes(entry.person.education.status) ||
        /arzt|lehrer|schriftsteller|journalist|professor|schauspieler|beamter/i.test(
          entry.person.employment?.occupation ?? '',
        ),
    )
    .sort((a, b) => b.events.length - a.events.length)[0];
  add('educated_life', educated);

  const parent = [...withEvents].sort(
    (a, b) => birthCount(run.events, b.person.id) - birthCount(run.events, a.person.id),
  )[0];
  add('parent_life', parent);

  const historical = [...withEvents]
    .filter((entry) =>
      Object.values(run.world.macro?.developments ?? {}).some(
        (development) => development.historical?.participants[entry.person.id],
      ),
    )
    .sort((a, b) => b.events.length - a.events.length)[0];
  add('historical_life', historical);

  const capability = [...withEvents]
    .filter(
      (entry) =>
        entry.person.lifeContract?.capability ||
        entry.person.life?.flags.some((flag) => flag.startsWith('capability:')),
    )
    .sort((a, b) => b.events.length - a.events.length)[0];
  add('special_capability', capability);

  const oldest = [...withEvents].sort(
    (a, b) =>
      (b.person.died?.year ?? run.world.date.year) -
        b.person.born.year -
        ((a.person.died?.year ?? run.world.date.year) - a.person.born.year) ||
      b.events.length - a.events.length,
  )[0];
  add('oldest_life', oldest);

  const remaining = [...withEvents].sort((a, b) => b.events.length - a.events.length);
  for (const entry of remaining) {
    if (chosen.size >= perSeedLives + 4) break;
    add('additional_life', entry);
  }
  return [...chosen.values()];
}

function effectDescription(effect: EventFact['effects'][number]): string {
  switch (effect.type) {
    case 'cash':
      return `cash ${effect.amount} (${effect.reason})`;
    case 'food':
      return `food ${effect.amount}`;
    case 'health':
      return `health ${effect.amount}`;
    case 'condition':
      return `${effect.add ? 'condition +' : 'condition -'}${effect.condition}`;
    case 'mood':
      return `mood ${effect.amount}`;
    case 'reputation':
      return `reputation ${effect.amount}`;
    case 'skill':
      return `${effect.skill} ${effect.amount}`;
    case 'flag':
      return `${effect.add ? 'flag +' : 'flag -'}${effect.flag}`;
    case 'education':
      return `education ${effect.status}`;
    case 'employment':
      return `employment ${effect.occupation} @ ${effect.organizationId}`;
    case 'unemployment':
      return `unemployment (${effect.reason})`;
    case 'relation':
      return `relation ${effect.kind} with ${effect.b}`;
    case 'relation_end':
      return `relation_end ${effect.kind} with ${effect.b}`;
    case 'role':
      return `${effect.add ? 'role +' : 'role -'}${effect.role}`;
    case 'organization_membership':
      return `membership ${effect.add ? '+' : '-'}${effect.organizationId}`;
    case 'project':
      return `project ${effect.project.title ?? effect.project.id}`;
    case 'interaction':
      return `interaction ${effect.interaction.kind}: ${effect.interaction.subject}`;
    case 'move':
      return `move ${effect.locationId}`;
    case 'household':
      return `household ${effect.householdId}`;
    case 'residence':
      return `residence ${effect.residenceId}`;
    case 'birth':
      return `birth ${effect.childSex}${effect.childId ? ` ${effect.childId}` : ''}`;
    case 'death':
      return `death (${effect.cause})`;
    case 'estate':
      return `estate ${effect.amount}`;
    case 'knowledge':
      return `knowledge “${effect.proposition}”`;
    case 'historical_participation':
      return `historical ${effect.processId} as ${effect.role}`;
    case 'historical_influence':
      return `historical influence ${effect.dimension} ${effect.amount}`;
    case 'historical_process':
      return `historical process ${effect.process.title}`;
    case 'organization_funds':
      return `organization funds ${effect.amount}`;
    default:
      return (effect as { type: string }).type;
  }
}

const runs = seeds.map(runSeed);
const dossier = runs.map((run) => {
  const selections = selectLives(run);
  return {
    seed: run.seed,
    startDate: VIENNA_1912_SEED.date,
    endDate: run.world.date,
    persons: Object.keys(run.world.persons).length,
    alive: Object.values(run.world.persons).filter((person) => !person.died).length,
    events: run.events.length,
    selections: selections.map((selection) => ({
      role: selection.role,
      personId: selection.person.id,
      name: selection.person.name,
      sex: selection.person.sex,
      born: selection.person.born,
      died: selection.person.died ?? null,
      ageAtEnd: (selection.person.died?.year ?? run.world.date.year) - selection.person.born.year,
      occupation: selection.person.employment?.occupation ?? null,
      education: selection.person.education.status,
      capability:
        selection.person.lifeContract?.capability ??
        selection.person.life?.flags.find((flag) => flag.startsWith('capability:'))?.slice(11) ??
        null,
      eventCount: selection.events.length,
      events: selection.events.map((event) => ({
        id: event.id,
        date: event.date,
        age: ageAt(selection.person, event.date),
        action: event.action,
        title: event.title ?? null,
        text: event.immediateText,
        significance: event.significance,
        tags: event.tags ?? [],
        composed: parseComposedAction(event.action),
        causes: event.causes,
        historyRefs: event.historyRefs ?? [],
        effects: event.effects.map(effectDescription),
      })),
    })),
  };
});

mkdirSync('docs/v4', { recursive: true });
writeFileSync('docs/v4/phase-14-lives.json', `${JSON.stringify(dossier, null, 2)}\n`);

const lines: string[] = [
  '# Phase 14 — Complete Lives',
  '',
  `Runtime: ${years} years per seed, seeds ${seeds.join(', ')}.`,
  '',
  'These are complete chronological subject-event lists, not selected excerpts. They include childhood, failures, dead ends and death where the simulation produced them.',
  '',
];
for (const run of dossier) {
  lines.push(`# Seed ${run.seed}`, '');
  for (const selection of run.selections) {
    const death = selection.died
      ? `${selection.died.year}.${String(selection.died.month).padStart(2, '0')}`
      : 'still living';
    lines.push(
      `## ${selection.name} — ${selection.role}`,
      '',
      `Born ${selection.born.year}.${String(selection.born.month).padStart(2, '0')}, ${death}, age ${selection.ageAtEnd}. ` +
        `Occupation: ${selection.occupation ?? 'none recorded'}. Education: ${selection.education}.` +
        (selection.capability ? ` Capability: ${selection.capability}.` : ''),
      '',
      `${selection.eventCount} committed subject events.`,
      '',
    );
    for (const event of selection.events) {
      const date = `${event.date.year}.${String(event.date.month).padStart(2, '0')}`;
      const title = event.title ? `《${event.title}》` : '';
      const composed = event.composed ? ' **[composed]**' : '';
      const tags = event.tags.length > 0 ? ` tags: ${event.tags.join(', ')}` : '';
      const causes = [...new Set([...(event.causes ?? []), ...event.historyRefs])].filter(Boolean);
      const causal = causes.length > 0 ? ` ← ${causes.join(', ')}` : '';
      lines.push(
        `- **${date} · ${event.age}岁** ${title}${composed} \`${event.action}\`${tags}${causal}`,
        `  ${event.text}`,
        event.effects.length > 0 ? `  _effects: ${event.effects.join('; ')}_` : '',
        '',
      );
    }
    lines.push('---', '');
  }
}
lines.push(
  '## Notes',
  '',
  '- `[composed]` means a compiled Recipe kernel, not a hand-written pack scene.',
  '- `←` lists explicit cause/follow-up ids and history-condition matches; it is a factual link, not an interpretation.',
  '- Effects are the committed ledger, including debt notes and failed physical outcomes where present.',
  '- These lives are not curated for quality. Some are short, repetitive or historically thin; the dossier exists to make that inspectable.',
);
writeFileSync('docs/v4/phase-14-lives.md', `${lines.join('\n')}\n`);

console.log(
  JSON.stringify(
    {
      years,
      seeds,
      lives: dossier.map((run) => ({
        seed: run.seed,
        persons: run.persons,
        alive: run.alive,
        events: run.events,
        selected: run.selections.map((entry) => ({
          role: entry.role,
          name: entry.name,
          events: entry.eventCount,
        })),
      })),
    },
    null,
    2,
  ),
);
