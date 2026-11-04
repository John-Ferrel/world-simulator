/**
 * Render five real playtest excerpts as a readable life dossier.
 * Input: docs/v4/playtest.json (written by scripts/v4-playtest.ts).
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const path = process.argv[2] ?? 'docs/v4/playtest.json';
const report = JSON.parse(readFileSync(path, 'utf8')) as {
  generatedAt: string;
  seed: string;
  startDate: { year: number; month: number };
  date: { year: number; month: number };
  excerpts?: {
    kind: string;
    selectionBasis: string;
    personId: string;
    name: string | null;
    born?: { year: number; month: number };
    died?: { year: number; month: number } | null;
    age?: number | null;
    totalEvents: number;
    excerptEventCount: number;
    truncated: boolean;
    events: {
      date: { year: number; month: number };
      action: string;
      title?: string | null;
      text: string;
      composed?: unknown;
      subjectIsFocal?: boolean;
      effects?: string[];
    }[];
  }[];
};

const labels: Record<string, string> = {
  short_lived_child: '短命的孩子',
  long_lived_adult: '长寿的成年人',
  working_adult: '工作中的成年人',
  oldest_lived: '剩余人物中的年长者',
  parent_life: '养育者',
};

const lines = [
  '# Phase 13 — 五段真实人生',
  '',
  `来源：\`${path}\`，seed \`${report.seed}\`，${report.startDate.year}–${report.date.year}。`,
  '',
  '这些不是手写样章；它们来自实时 Engine 已提交的 EventFact，每人抽取 15 条事件，保留原始文本、日期、动作和效果类型。',
  '',
];

for (const excerpt of report.excerpts ?? []) {
  const name = excerpt.name ?? excerpt.personId;
  const birth = excerpt.born
    ? `${excerpt.born.year}.${String(excerpt.born.month).padStart(2, '0')}`
    : '?';
  const death = excerpt.died
    ? `${excerpt.died.year}.${String(excerpt.died.month).padStart(2, '0')}`
    : '仍在生活';
  lines.push(`## ${labels[excerpt.kind] ?? excerpt.kind} — ${name}`, '');
  lines.push(
    `生 ${birth}，${death}${excerpt.age !== null && excerpt.age !== undefined ? `，享年/年龄 ${excerpt.age}` : ''}。` +
      `共 ${excerpt.totalEvents} 条记录，这里抽取 ${excerpt.excerptEventCount} 条${excerpt.truncated ? '（截断）' : ''}。`,
    '',
    `选取依据：${excerpt.selectionBasis}`,
    '',
  );
  for (const event of excerpt.events) {
    const date = `${event.date.year}.${String(event.date.month).padStart(2, '0')}`;
    const title = event.title ? `《${event.title}》` : '';
    const composed = event.composed ? ' **[composed]**' : '';
    const participantOnly = event.subjectIsFocal === false ? ' **[as participant]**' : '';
    const effects = event.effects?.length ? `（效果：${event.effects.join(', ')}）` : '';
    lines.push(
      `- **${date}** ${title}${composed}${participantOnly} \`${event.action}\`${effects}`,
      `  ${event.text}`,
      '',
    );
  }
  lines.push('---', '');
}

lines.push(
  '## 阅读说明',
  '',
  '- 事件文本来自 `EventFact.immediateText`；效果类型来自同一条已提交事实。',
  '- 抽取按人生全周期均匀采样，可能跳过相邻事件；这不是完整逐年日志。',
  '- 这不是文学评分；文学判断见 `docs/v4/phase-13-critique.md`。',
);
mkdirSync('docs/v4', { recursive: true });
writeFileSync('docs/v4/phase-13-lives.md', `${lines.join('\n')}\n`);
console.log(`wrote docs/v4/phase-13-lives.md with ${report.excerpts?.length ?? 0} lives`);
