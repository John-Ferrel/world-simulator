import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { GeneratedPack } from '../packages/v4/generated.js';
import type { EventEffect } from '../packages/v4/domain.js';

const dir = resolve('packages/v4/content/generated');
const packs = readdirSync(dir)
  .filter((file) => file.startsWith('p10-') && file.endsWith('.json'))
  .sort()
  .map((file) => JSON.parse(readFileSync(resolve(dir, file), 'utf8')) as GeneratedPack);

const CUES: { label: string; pattern: RegExp; effects: EventEffect['type'][] }[] = [
  {
    label: 'education',
    pattern: /入学|注册|录取|学费减半|奖学金|毕业|退学|学籍|夜校|实科中学|大学|考试通过|出师|资格/,
    effects: ['education'],
  },
  {
    label: 'employment',
    pattern: /工作|受雇|录用|上班|工票|工资|职位|晋升|升职|解雇|失业|退休|雇主|雇他|雇她/,
    effects: ['employment', 'unemployment'],
  },
  {
    label: 'marriage',
    pattern: /结婚|婚礼|求婚|订婚|同居|丈夫|妻子|配偶|嫁|娶/,
    effects: ['relation', 'household'],
  },
  {
    label: 'birth',
    pattern: /怀孕|生产|生下一|出生|婴儿|孩子落地|产婆/,
    effects: ['birth'],
  },
  {
    label: 'death',
    pattern: /去世|死了|死亡|葬礼|夭折|断气|丧事|埋/,
    effects: ['death', 'estate'],
  },
  {
    label: 'move',
    pattern: /搬家|迁居|迁往|搬到|移民|逃往|离开维也纳|回乡|驱逐/,
    effects: ['move', 'residence'],
  },
  {
    label: 'organization',
    pattern: /加入|入会|工会会员|党员|组织成员|签名入会/,
    effects: ['organization_membership', 'role'],
  },
  {
    label: 'injury',
    pattern: /重伤|断手|断指|失明|残疾|吐血|伤口|骨折|烫伤/,
    effects: ['health', 'condition'],
  },
];

const findings: {
  pack: string;
  node: string;
  outcome: string;
  cue: string;
  effects: EventEffect['type'][];
  text: string;
}[] = [];

for (const pack of packs) {
  for (const node of pack.nodes) {
    for (const outcome of node.outcomes) {
      const types = new Set<EventEffect['type']>(
        outcome.effects.map((effect) => effect.type as EventEffect['type']),
      );
      for (const cue of CUES) {
        if (cue.pattern.test(outcome.text) && !cue.effects.some((type) => types.has(type))) {
          findings.push({
            pack: pack.id,
            node: node.id,
            outcome: outcome.id,
            cue: cue.label,
            effects: [...types],
            text: outcome.text.slice(0, 220),
          });
        }
      }
    }
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  packs: packs.length,
  nodes: packs.reduce((sum, pack) => sum + pack.nodes.length, 0),
  outcomes: packs.reduce(
    (sum, pack) => sum + pack.nodes.reduce((inner, node) => inner + node.outcomes.length, 0),
    0,
  ),
  findings,
  byPack: Object.fromEntries(
    packs.map((pack) => [pack.id, findings.filter((finding) => finding.pack === pack.id).length]),
  ),
};
writeFileSync('docs/v4/phase-10-consistency.json', `${JSON.stringify(report, null, 2)}\n`);
console.log(
  JSON.stringify(
    {
      packs: report.packs,
      nodes: report.nodes,
      outcomes: report.outcomes,
      findings: findings.length,
      byPack: report.byPack,
      samples: findings.slice(0, 12),
    },
    null,
    2,
  ),
);
