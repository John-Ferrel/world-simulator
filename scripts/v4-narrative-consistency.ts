/**
 * Heuristic narrative/effect consistency audit.
 *
 * This is deliberately conservative: a flag is a prompt for a human/Critic
 * review, not proof of an error. It checks whether major claims in committed
 * prose have a corresponding structured effect type.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

type Sample = {
  eventId: string;
  date: { year: number; month: number };
  action: string;
  text: string;
  effects?: string[];
  trace?: unknown;
};

const path = process.argv[2] ?? 'docs/v4/playtest.json';
let report: {
  excerpts?: { name?: string; personId: string; events?: Sample[] }[];
};
try {
  report = JSON.parse(readFileSync(path, 'utf8')) as typeof report;
} catch {
  console.error(`cannot read ${path}; run pnpm v4:playtest first`);
  process.exit(2);
}

const events = (report.excerpts ?? []).flatMap((life) =>
  (life.events ?? []).map((event) => ({ ...event, life: life.name ?? life.personId })),
);

const RULES: {
  code: string;
  pattern: RegExp;
  requires: string[];
  note: string;
}[] = [
  {
    code: 'death_claim',
    pattern: /(死了|断气|咽气|下葬|葬礼|尸体|去世)/,
    requires: ['death'],
    note: 'prose claims a death but the event has no death effect',
  },
  {
    code: 'job_loss_claim',
    pattern: /(解雇|开除|失业|丢了工作|工钱停了)/,
    requires: ['unemployment', 'employment'],
    note: 'prose claims job loss without an employment-state effect',
  },
  {
    code: 'move_claim',
    pattern: /(搬走|迁往|搬到|离开维也纳|上了火车|过境)/,
    requires: ['move', 'household', 'residence'],
    note: 'prose claims a move without a move/household/residence effect',
  },
  {
    code: 'marriage_claim',
    pattern: /(结婚|婚礼|嫁给他|娶了她)/,
    requires: ['relation', 'birth'],
    note: 'prose claims a marriage without a relation effect',
  },
  {
    code: 'birth_claim',
    pattern: /(生下来|分娩|孩子出生|接生)/,
    requires: ['birth'],
    note: 'prose claims a birth without a birth effect',
  },
];

type Flag = {
  code: string;
  note: string;
  eventId: string;
  date: { year: number; month: number };
  action: string;
  life: string;
  text: string;
  effectTypes: string[];
};
const flags: Flag[] = [];
for (const event of events) {
  const types = new Set(event.effects ?? []);
  for (const rule of RULES) {
    if (!rule.pattern.test(event.text)) continue;
    if (rule.requires.some((type) => types.has(type))) continue;
    flags.push({
      code: rule.code,
      note: rule.note,
      eventId: event.eventId,
      date: event.date,
      action: event.action,
      life: event.life,
      text: event.text.slice(0, 220),
      effectTypes: [...types],
    });
  }
}

const unresolved = events.filter((event) => /[{}]/.test(event.text));
const output = {
  generatedAt: new Date().toISOString(),
  source: path,
  sampledEvents: events.length,
  flags,
  unresolvedTokenEvents: unresolved.length,
  limitation:
    'Keyword matching can miss paraphrases and can flag metaphors. Use this as a review queue, not an automatic literary verdict.',
};
mkdirSync('docs/v4', { recursive: true });
writeFileSync('docs/v4/phase-12-consistency.json', `${JSON.stringify(output, null, 2)}\n`);
console.log(
  JSON.stringify(
    {
      sampledEvents: events.length,
      flags: flags.length,
      byCode: Object.fromEntries(
        [...new Set(flags.map((flag) => flag.code))].map((code) => [
          code,
          flags.filter((flag) => flag.code === code).length,
        ]),
      ),
      unresolvedTokenEvents: unresolved.length,
    },
    null,
    2,
  ),
);
