/**
 * Phase 18 Creative Index.
 *
 * A lightweight, deterministic creative-metadata and text-similarity index over
 * the runtime content library. It is an author/editor aid; the runtime registry
 * remains the canonical source.
 *
 *   pnpm v4:creative-index                 # rebuild docs/v4/creative-index.*
 *   pnpm v4:creative-index -- --query "一个贫穷裁缝继承了陌生人的城堡"
 *   pnpm v4:creative-index -- --kernel r15-court.charge-read
 *   pnpm v4:creative-index -- --gaps
 *   pnpm v4:creative-index -- --duplicates 0.82
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { ALL_STATES, GENERATED_STATE_PACKS } from '../packages/v4/content/states/index.js';
import { KERNEL_LIBRARY } from '../packages/v4/content/kernels/index.js';
import type { PlotKernel } from '../packages/v4/composition/types.js';

type Tone =
  | 'dark'
  | 'absurd'
  | 'romantic'
  | 'warm'
  | 'melancholy'
  | 'suspense'
  | 'comic'
  | 'triumphant'
  | 'gritty'
  | 'eerie'
  | 'political'
  | 'historical'
  | 'everyday'
  | 'erotic'
  | 'religious';

type Motif =
  | 'inheritance'
  | 'mistaken_identity'
  | 'betrayal'
  | 'debt'
  | 'escape'
  | 'marriage'
  | 'birth'
  | 'death'
  | 'class'
  | 'crime'
  | 'war'
  | 'revolution'
  | 'office'
  | 'religion'
  | 'supernatural'
  | 'art'
  | 'migration'
  | 'illness'
  | 'school'
  | 'work'
  | 'family'
  | 'love'
  | 'luck'
  | 'scandal'
  | 'travel'
  | 'secret';

type CreativeRecord = {
  id: string;
  title: string;
  pack: string;
  domain: string;
  stage: string;
  ageWindow: { min: number; max: number };
  tags: string[];
  roles: string[];
  conditions: string[];
  premise: string;
  situation: string;
  motivation: string[];
  conflict: string[];
  twist: string[];
  outcomePattern: string[];
  tone: Tone[];
  setting: string;
  motifs: Motif[];
  adaptiveContexts: string[];
  outcomeCount: number;
  searchText: string;
};

const packFor = new Map<string, string>();
for (const pack of GENERATED_STATE_PACKS) {
  for (const kernel of pack.kernels ?? []) packFor.set(kernel.id, pack.id);
  for (const state of pack.states) packFor.set(`state:${state.id}`, pack.id);
}
const stateById = new Map(ALL_STATES.map((state) => [state.id, state]));

const MOTIF_TERMS: Record<Motif, string[]> = {
  inheritance: ['继承', '遗产', '遗嘱', '继承人', 'estate', 'inherit', 'heir', 'will'],
  mistaken_identity: ['误认', '错认', '认错', '冒充', '身份', 'mistake', 'identity', 'impostor'],
  betrayal: ['背叛', '出卖', '告密', '叛徒', 'betray', 'betrayer', 'treason'],
  debt: ['债', '欠款', '借据', '利息', 'debt', 'loan', 'creditor'],
  escape: ['逃', '流亡', '越境', '出逃', 'escape', 'flee', 'border'],
  marriage: ['婚', '嫁', '娶', '婚礼', 'marriage', 'wedding', 'spouse'],
  birth: ['出生', '生孩子', '怀孕', '接生', 'birth', 'pregnan', 'midwife'],
  death: ['死', '葬礼', '临终', '死亡', 'death', 'funeral', 'die'],
  class: ['阶级', '工人', '贵族', '穷人', '富人', 'class', 'worker', 'noble', 'poverty'],
  crime: ['罪', '偷', '抢', '警察', '监狱', '法庭', 'crime', 'prison', 'police', 'court'],
  war: ['战', '军队', '征兵', '空袭', 'war', 'army', 'soldier', 'mobil'],
  revolution: ['革命', '起义', '政变', '革命者', 'revolution', 'uprising', 'coup'],
  office: ['职位', '官职', '部长', '官员', '办公室', 'office', 'position', 'minister'],
  religion: ['神', '教', '教堂', '信仰', '圣', 'religion', 'church', 'faith', 'priest'],
  supernatural: ['诅咒', '巫', '鬼', '神迹', '超自然', '魔法', 'curse', 'witch', 'ghost', 'miracle'],
  art: ['画', '音乐', '剧院', '小说', '诗', '艺术', 'art', 'painting', 'music', 'theatre', 'novel'],
  migration: ['移民', '侨', '护照', '边境', '故乡', 'migration', 'migrant', 'passport', 'diaspora'],
  illness: ['病', '医生', '医院', '药', '伤', 'illness', 'doctor', 'hospital', 'medicine'],
  school: ['学校', '老师', '学生', '考试', '大学', 'school', 'teacher', 'student', 'exam'],
  work: ['工作', '工厂', '作坊', '手艺', '工钱', 'work', 'factory', 'workshop', 'craft'],
  family: ['家庭', '父亲', '母亲', '孩子', '兄弟', '姐妹', 'family', 'father', 'mother', 'child'],
  love: ['爱', '恋情', '情人', '吻', '欲望', 'love', 'lover', 'desire', 'kiss'],
  luck: ['运气', '幸运', '彩票', '巧合', '好运', 'luck', 'lucky', 'lottery', 'coincidence'],
  scandal: ['丑闻', '名声', '谣言', '曝光', 'scandal', 'rumor', 'reputation'],
  travel: ['旅行', '火车', '车站', '出发', '旅店', 'travel', 'train', 'station', 'journey'],
  secret: ['秘密', '隐瞒', '私下', '暗号', 'secret', 'hidden', 'clandestine'],
};

const TONE_TERMS: Record<Tone, string[]> = {
  dark: ['死', '杀', '暴力', '血', '牢', '战', '黑暗', 'death', 'kill', 'violence', 'prison', 'war'],
  absurd: ['荒诞', '荒唐', '滑稽', '反讽', '误会', '巧合', 'absurd', 'irony', 'mistake', 'coincidence'],
  romantic: ['爱', '恋情', '吻', '婚', '情人', 'love', 'romance', 'kiss', 'wedding', 'lover'],
  warm: ['家', '孩子', '照顾', '温暖', '朋友', 'family', 'child', 'care', 'warm', 'friend'],
  melancholy: ['悲', '失去', '葬礼', '记忆', '孤独', 'grief', 'loss', 'funeral', 'memory', 'alone'],
  suspense: ['调查', '秘密', '警察', '跟踪', '嫌疑', 'investigation', 'secret', 'police', 'suspicion'],
  comic: ['笑', '笑话', '滑稽', '出丑', 'joke', 'laugh', 'comic', 'fool', 'humour', 'humor', 'farce', 'satire'],
  triumphant: ['成功', '名声', '胜利', '晋升', 'success', 'fame', 'victory', 'promotion'],
  gritty: ['工厂', '穷', '工钱', '煤', '租金', 'factory', 'poverty', 'wage', 'coal', 'rent'],
  eerie: ['诅咒', '巫', '鬼', '神迹', 'curse', 'witch', 'ghost', 'miracle', 'uncanny'],
  political: ['政治', '党', '政府', '官员', '选举', 'politics', 'party', 'government', 'office'],
  historical: ['历史', '战', '革命', '年代', 'history', 'war', 'revolution', 'era'],
  everyday: ['市场', '邻居', '房租', '面包', '日常', 'market', 'neighbor', 'rent', 'bread', 'daily'],
  erotic: ['欲望', '情人', '身体', '亲密', 'desire', 'lover', 'body', 'intimacy'],
  religious: ['神', '教', '信仰', '教堂', '祈祷', 'religion', 'faith', 'church', 'pray'],
};

const MOTIVATION_TERMS: [string, string[]][] = [
  ['power/status', ['权力', '地位', '职位', '名声', '威望', 'power', 'status', 'position', 'fame', 'reputation']],
  ['love/desire', ['爱', '欲望', '情人', '亲密', 'love', 'desire', 'lover', 'intimacy']],
  ['family/care', ['家庭', '孩子', '父母', '照护', '亲情', 'family', 'child', 'parent', 'care']],
  ['money/security', ['钱', '现金', '债', '房租', '工资', 'money', 'cash', 'debt', 'rent', 'wage']],
  ['survival/health', ['生存', '健康', '病', '伤', '饥饿', 'survival', 'health', 'illness', 'injury', 'hunger']],
  ['knowledge/craft', ['知识', '学习', '手艺', '技术', 'knowledge', 'learn', 'craft', 'skill']],
  ['freedom/escape', ['自由', '逃', '离开', '边境', 'freedom', 'escape', 'leave', 'border']],
  ['revenge/justice', ['复仇', '报复', '正义', '审判', 'revenge', 'justice', 'trial']],
  ['faith/meaning', ['信仰', '神', '灵魂', '意义', 'faith', 'religion', 'soul', 'meaning']],
  ['fame/recognition', ['名声', '成名', '被看见', 'fame', 'recognition', 'celebrity']],
  ['belonging/community', ['归属', '社区', '同乡', '组织', 'belonging', 'community', 'association']],
  ['adventure/curiosity', ['冒险', '旅行', '发现', '好奇心', 'adventure', 'travel', 'discover', 'curiosity']],
];

const CONFLICT_TERMS: [string, string[]][] = [
  ['betrayal', ['背叛', '出卖', '告密', 'betray', 'inform']],
  ['debt', ['债', '欠款', '利息', 'debt', 'loan']],
  ['illness', ['病', '伤', '医生', 'illness', 'injury', 'doctor']],
  ['war', ['战', '征兵', '空袭', 'war', 'army', 'mobil']],
  ['crime/legal', ['罪', '警察', '法庭', '监狱', 'crime', 'police', 'court', 'prison']],
  ['class/poverty', ['穷', '工人', '贵族', '阶级', 'poverty', 'worker', 'noble', 'class']],
  ['love rivalry', ['情敌', '嫉妒', '争风', 'rival', 'jealous']],
  ['secrecy', ['秘密', '隐瞒', '曝光', 'secret', 'hidden', 'exposure']],
  ['bureaucracy', ['官僚', '文件', '许可', '登记', 'bureaucracy', 'permit', 'paper']],
  ['occupation', ['工作', '工厂', '罢工', '职业', 'work', 'factory', 'strike', 'career']],
  ['family duty', ['家庭', '照护', '继承', 'family', 'care', 'inherit']],
  ['identity', ['身份', '名字', '冒充', '误认', 'identity', 'name', 'impostor', 'mistake']],
  ['supernatural', ['诅咒', '巫', '神迹', 'curse', 'witch', 'miracle']],
];

const TWIST_MARKERS = [
  '却',
  '反而',
  '没想到',
  '原来',
  '以为',
  '结果',
  '不料',
  '竟然',
  '居然',
  '阴差阳错',
  '误',
  '讽刺',
  '笑话',
  '荒唐',
  '意外',
  'suddenly',
  'instead',
  'unexpected',
  'mistake',
];

function textOf(kernel: PlotKernel): string {
  return [
    kernel.title,
    kernel.domain,
    kernel.stage,
    ...(kernel.tags ?? []),
    ...kernel.roles.map((role) => `${role.key} ${role.kind}`),
    ...(kernel.conditions ?? []).map((condition) => JSON.stringify(condition)),
    ...(kernel.adaptiveContexts ?? []).flatMap((context) => [
      context.id,
      ...context.conditions.map((condition) => JSON.stringify(condition)),
    ]),
    ...kernel.outcomes.flatMap((outcome) => [
      outcome.id,
      outcome.text,
      ...outcome.effects.map((effect) => `${effect.type} ${'reason' in effect ? String(effect.reason) : ''}`),
    ]),
  ].join(' ');
}

function matchesTerm(text: string, term: string): boolean {
  const lower = text.toLowerCase();
  const needle = term.toLowerCase();
  // ASCII terms use a left word boundary so "war" does not match "warm" and
  // "art" does not match "heart". Chinese terms are substring-matched.
  if (/^[a-z0-9_]+$/.test(needle)) {
    return new RegExp(`\\b${needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(lower);
  }
  return lower.includes(needle);
}

function matched(text: string, terms: string[]): boolean {
  return terms.some((term) => matchesTerm(text, term));
}

function unique<T>(values: T[]): T[] {
  return [...new Set(values)];
}

function classifyOutcome(kernel: PlotKernel): string[] {
  const pattern = new Set<string>();
  for (const outcome of kernel.outcomes) {
    for (const effect of outcome.effects) {
      if (['cash', 'food'].includes(effect.type)) {
        const amount = 'amount' in effect ? Number(effect.amount ?? 0) : 0;
        pattern.add(amount < 0 ? 'resource_loss' : 'resource_gain');
      } else if (effect.type === 'relation' || effect.type === 'relation_end') {
        pattern.add('relationship');
      } else if (effect.type === 'reputation' || effect.type === 'role') {
        pattern.add('status');
      } else if (effect.type === 'knowledge' || effect.type === 'flag') {
        pattern.add('knowledge');
      } else if (effect.type === 'health' || effect.type === 'condition') {
        pattern.add('body');
      } else if (effect.type === 'death') {
        pattern.add('death');
      } else if (effect.type === 'birth') {
        pattern.add('birth');
      } else if (effect.type === 'position' || effect.type === 'organization_found' || effect.type === 'organization_membership') {
        pattern.add('institution');
      } else if (effect.type === 'state_add' || effect.type === 'state_transition' || effect.type === 'state_remove') {
        pattern.add('state_change');
      } else if (effect.type === 'move' || effect.type === 'residence' || effect.type === 'household') {
        pattern.add('mobility');
      } else if (effect.type === 'education' || effect.type === 'employment' || effect.type === 'unemployment') {
        pattern.add('career');
      }
    }
  }
  return [...pattern].sort();
}

function buildRecord(kernel: PlotKernel): CreativeRecord {
  const text = textOf(kernel);
  const lower = text.toLowerCase();
  const motifs = (Object.keys(MOTIF_TERMS) as Motif[]).filter((motif) =>
    matched(lower, MOTIF_TERMS[motif]),
  );
  // Tone is a property of the authored situation/tags, not of every noun in
  // the prose. Using the full outcome text made almost every kernel "warm"
  // because family words appear in ordinary sentences.
  const toneText = [kernel.title, kernel.domain, kernel.stage, ...(kernel.tags ?? []), ...(kernel.contexts ?? [])].join(' ').toLowerCase();
  const tone = (Object.keys(TONE_TERMS) as Tone[])
    .filter((candidate) => matched(toneText, TONE_TERMS[candidate]))
    .slice(0, 3);
  const motivation = MOTIVATION_TERMS.filter(([, terms]) => matched(lower, terms)).map(
    ([label]) => label,
  );
  const conflict = CONFLICT_TERMS.filter(([, terms]) => matched(lower, terms)).map(
    ([label]) => label,
  );
  const twist = kernel.outcomes
    .filter((outcome) => TWIST_MARKERS.some((marker) => outcome.text.toLowerCase().includes(marker)))
    .map((outcome) => outcome.text.slice(0, 140))
    .slice(0, 3);
  const firstOutcome = kernel.outcomes[0]?.text ?? '';
  const conditions = (kernel.conditions ?? []).map((condition) => {
    const value = condition as unknown as Record<string, unknown>;
    return `${condition.kind}:${String(value.stateId ?? value.tag ?? value.role ?? value.in ?? '')}`;
  });
  const settingParts = [
    `stage=${kernel.stage}`,
    `domain=${kernel.domain}`,
    ...(kernel.contexts ?? []).map((context) => `context=${context}`),
    ...(kernel.tags ?? []).filter((tag) =>
      ['vienna', 'urban', 'rural', 'war', 'postwar', 'crisis', 'factory', 'hospital', 'school', 'court', 'church'].includes(tag),
    ),
  ];
  return {
    id: kernel.id,
    title: kernel.title,
    pack: packFor.get(kernel.id) ?? 'base',
    domain: kernel.domain,
    stage: kernel.stage,
    ageWindow: kernel.ageWindow,
    tags: kernel.tags ?? [],
    roles: kernel.roles.map((role) => `${role.key}:${role.kind}`),
    conditions,
    premise: `${kernel.title} — ${firstOutcome.slice(0, 180)}`,
    situation: conditions.join('; ') || (kernel.tags ?? []).slice(0, 8).join(', '),
    motivation,
    conflict,
    twist,
    outcomePattern: classifyOutcome(kernel),
    tone,
    setting: settingParts.join('; '),
    motifs,
    adaptiveContexts: (kernel.adaptiveContexts ?? []).map((context) => context.id),
    outcomeCount: kernel.outcomes.length,
    searchText: text.slice(0, 1600),
  };
}

const records = KERNEL_LIBRARY.map(buildRecord);
const recordById = new Map(records.map((record) => [record.id, record]));

/** Chinese bigrams/trigrams plus Latin words; deterministic and dependency-free. */
function tokenize(text: string): string[] {
  const normalized = text.toLowerCase().replace(/\s+/g, ' ');
  const tokens: string[] = [];
  for (const word of normalized.match(/[a-z0-9_]{2,}/g) ?? []) tokens.push(`w:${word}`);
  for (const run of normalized.match(/[\u4e00-\u9fff]+/g) ?? []) {
    const chars = [...run];
    for (let index = 0; index < chars.length - 1; index += 1) {
      tokens.push(`b:${chars[index]}${chars[index + 1]}`);
      if (index < chars.length - 2) tokens.push(`t:${chars[index]}${chars[index + 1]}${chars[index + 2]}`);
    }
  }
  return tokens;
}

const docTokenCounts = records.map((record) => {
  const counts = new Map<string, number>();
  for (const token of tokenize(record.searchText)) counts.set(token, (counts.get(token) ?? 0) + 1);
  return counts;
});
const documentFrequency = new Map<string, number>();
for (const counts of docTokenCounts) {
  for (const token of counts.keys()) documentFrequency.set(token, (documentFrequency.get(token) ?? 0) + 1);
}
const idf = (token: string): number =>
  Math.log((records.length + 1) / ((documentFrequency.get(token) ?? 0) + 1)) + 1;

function vectorFor(counts: Map<string, number>): Map<string, number> {
  const vector = new Map<string, number>();
  for (const [token, count] of counts) vector.set(token, (1 + Math.log(count)) * idf(token));
  return vector;
}

const docVectors = docTokenCounts.map(vectorFor);

function cosine(a: Map<string, number>, b: Map<string, number>): number {
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (const [token, value] of a) {
    na += value * value;
    const other = b.get(token);
    if (other) dot += value * other;
  }
  for (const value of b.values()) nb += value * value;
  if (na === 0 || nb === 0) return 0;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

function queryVector(text: string): Map<string, number> {
  const counts = new Map<string, number>();
  for (const token of tokenize(text)) counts.set(token, (counts.get(token) ?? 0) + 1);
  return vectorFor(counts);
}

function tagJaccard(a: string[], b: string[]): number {
  const left = new Set(a);
  const right = new Set(b);
  let intersection = 0;
  for (const value of left) if (right.has(value)) intersection += 1;
  const union = new Set([...a, ...b]).size;
  return union === 0 ? 0 : intersection / union;
}

function similarToText(text: string, limit = 10): { record: CreativeRecord; score: number }[] {
  const query = queryVector(text);
  return records
    .map((record, index) => ({
      record,
      score: cosine(query, docVectors[index]!),
    }))
    .sort((a, b) => b.score - a.score || a.record.id.localeCompare(b.record.id))
    .slice(0, limit);
}

function similarKernels(kernelId: string, limit = 10): { record: CreativeRecord; score: number }[] {
  const source = recordById.get(kernelId);
  if (!source) return [];
  const index = records.findIndex((record) => record.id === kernelId);
  const sourceTags = source.tags;
  return records
    .map((record, candidateIndex) => {
      if (candidateIndex === index) return { record, score: 0 };
      return {
        record,
        score:
          cosine(docVectors[index]!, docVectors[candidateIndex]!) * 0.85 +
          tagJaccard(sourceTags, record.tags) * 0.1 +
          (source.outcomePattern.filter((x) => record.outcomePattern.includes(x)).length /
            Math.max(1, new Set([...source.outcomePattern, ...record.outcomePattern]).size)) *
            0.05,
      };
    })
    .sort((a, b) => b.score - a.score || a.record.id.localeCompare(b.record.id))
    .slice(0, limit);
}

function frequencies<T extends string>(values: T[]): [T, number][] {
  const map = new Map<T, number>();
  for (const value of values) map.set(value, (map.get(value) ?? 0) + 1);
  return [...map.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

const stageCounts = frequencies(records.map((record) => record.stage));
const domainCounts = frequencies(records.map((record) => record.domain));
const motifCounts = frequencies(records.flatMap((record) => record.motifs));
const toneCounts = frequencies(records.flatMap((record) => record.tone));
const packCounts = frequencies(records.map((record) => record.pack));
const duplicatePairs: { a: string; b: string; score: number; titles: [string, string] }[] = [];
for (let i = 0; i < records.length; i += 1) {
  for (let j = i + 1; j < records.length; j += 1) {
    const score = cosine(docVectors[i]!, docVectors[j]!);
    if (score >= 0.2) {
      duplicatePairs.push({
        a: records[i]!.id,
        b: records[j]!.id,
        score,
        titles: [records[i]!.title, records[j]!.title],
      });
    }
  }
}
duplicatePairs.sort((a, b) => b.score - a.score);

function args() {
  return process.argv.slice(2);
}

function printQuery(text: string) {
  console.log(`Query: ${text}`);
  for (const { record, score } of similarToText(text, 12)) {
    console.log(
      `${score.toFixed(3)}  ${record.id}  [${record.pack}]  ${record.title}  (${record.tone.join(', ')})`,
    );
    console.log(`       motifs: ${record.motifs.join(', ') || '—'}; ${record.premise.slice(0, 120)}`);
  }
}

function printGaps() {
  console.log('Stage coverage');
  for (const [stage, count] of stageCounts) console.log(`  ${stage.padEnd(14)} ${count}`);
  console.log('\nLeast-covered domains');
  for (const [domain, count] of domainCounts.slice().reverse().slice(0, 15)) {
    console.log(`  ${domain.padEnd(18)} ${count}`);
  }
  console.log('\nTop motifs');
  for (const [motif, count] of motifCounts.slice(0, 20)) console.log(`  ${motif.padEnd(20)} ${count}`);
  console.log('\nUnderused motifs');
  for (const [motif, count] of motifCounts.slice(-15)) console.log(`  ${motif.padEnd(20)} ${count}`);
  console.log('\nTone distribution');
  for (const [tone, count] of toneCounts) console.log(`  ${tone.padEnd(14)} ${count}`);
  console.log(`\nPairs with text similarity >= 0.20: ${duplicatePairs.length}`);
  for (const pair of duplicatePairs.slice(0, 20)) {
    console.log(`  ${pair.score.toFixed(3)} ${pair.a} <> ${pair.b} (${pair.titles.join(' / ')})`);
  }
}

function writeIndex() {
  const index = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    source: 'ALL_STATES + KERNEL_LIBRARY + GENERATED_STATE_PACKS',
    counts: {
      states: ALL_STATES.length,
      kernels: KERNEL_LIBRARY.length,
      generatedPacks: GENERATED_STATE_PACKS.length,
      records: records.length,
    },
    stageCounts,
    domainCounts,
    motifCounts,
    toneCounts,
    packCounts,
    highSimilarityPairs: duplicatePairs.slice(0, 100),
    records: records.map(({ searchText, ...rest }) => rest),
  };
  mkdirSync('docs/v4', { recursive: true });
  writeFileSync('docs/v4/creative-index.json', `${JSON.stringify(index, null, 2)}\n`);
  const md: string[] = [
    '# Creative Index',
    '',
    `Generated: ${index.generatedAt}`,
    '',
    'A deterministic author/editor aid over the runtime content. It is not the registry and does not change runtime behavior.',
    '',
    '## Query',
    '',
    '```bash',
    'pnpm v4:creative-index -- --query "一个贫穷裁缝收到律师来信，继承了陌生人的城堡"',
    'pnpm v4:creative-index -- --kernel office16-hire.protege',
    'pnpm v4:creative-index -- --gaps',
    'pnpm v4:creative-index -- --duplicates 0.15',
    'pnpm v4:creative-index -- --pack packages/v4/content/states/generated/pack-<name>.json',
    '```',
    '',
    '## Counts',
    '',
    '| Metric | Count |',
    '|---|---:|',
    `| States | ${ALL_STATES.length} |`,
    `| Kernels | ${KERNEL_LIBRARY.length} |`,
    `| Generated packs | ${GENERATED_STATE_PACKS.length} |`,
    `| Creative records | ${records.length} |`,
    '',
    '## Stage coverage',
    '',
    '| Stage | Kernels |',
    '|---|---:|',
    ...stageCounts.map(([stage, count]) => `| ${stage} | ${count} |`),
    '',
    '## Underused motifs',
    '',
    '| Motif | Kernels |',
    '|---|---:|',
    ...motifCounts.slice(-15).map(([motif, count]) => `| ${motif} | ${count} |`),
    '',
    '## Tone distribution',
    '',
    '| Tone | Kernels |',
    '|---|---:|',
    ...toneCounts.map(([tone, count]) => `| ${tone} | ${count} |`),
    '',
    '## High-similarity pairs',
    '',
    `Pairs >= 0.20: **${duplicatePairs.length}**. These are candidates for an editor, not automatic rejects.`,
    '',
    '| Score | A | B |',
    '|---:|---|---|',
    ...duplicatePairs.slice(0, 30).map((pair) => `| ${pair.score.toFixed(3)} | ${pair.titles[0]} | ${pair.titles[1]} |`),
    '',
    '## Metadata schema',
    '',
    'Each record has: `premise`, `situation`, `motivation`, `conflict`, `twist`, `outcomePattern`, `tone`, `setting`, `motifs` and `searchText` (searchText is omitted from JSON for size; the CLI recomputes it from the runtime).',
    '',
    'Use semantic similarity as a prompt for divergence, not a prohibition. A shared motif is allowed if the conflict, motivation, twist or outcome pattern differs.',
  ];
  writeFileSync('docs/v4/creative-index.md', `${md.join('\n')}\n`);
  console.log(
    JSON.stringify({
      states: ALL_STATES.length,
      kernels: KERNEL_LIBRARY.length,
      records: records.length,
      highSimilarityPairs: duplicatePairs.length,
      output: ['docs/v4/creative-index.json', 'docs/v4/creative-index.md'],
    }),
  );
}

const argv = args();
if (argv.includes('--query')) {
  const text = argv.slice(argv.indexOf('--query') + 1).join(' ').trim();
  if (!text) {
    console.error('usage: v4-creative-index.ts --query "<idea>"');
    process.exit(1);
  }
  printQuery(text);
} else if (argv.includes('--kernel')) {
  const id = argv[argv.indexOf('--kernel') + 1];
  const record = id ? recordById.get(id) : undefined;
  if (!record) {
    console.error(`unknown kernel: ${id ?? '(missing)'}`);
    process.exit(1);
  }
  console.log(JSON.stringify(record, null, 2));
  console.log('\nNearest:');
  for (const { record: near, score } of similarKernels(record.id, 8)) {
    console.log(`${score.toFixed(3)}  ${near.id}  ${near.title}`);
  }
} else if (argv.includes('--pack')) {
  const file = argv[argv.indexOf('--pack') + 1];
  if (!file) {
    console.error('usage: v4-creative-index.ts --pack <pack.json>');
    process.exit(1);
  }
  const pack = JSON.parse(readFileSync(file, 'utf8')) as {
    id: string;
    kernels?: PlotKernel[];
  };
  const rows = (pack.kernels ?? []).map((kernel) => {
    const matches = similarToText(textOf(kernel), 4).filter(
      (match) => match.record.id !== kernel.id,
    ).slice(0, 3);
    return {
      id: kernel.id,
      title: kernel.title,
      maxScore: matches[0]?.score ?? 0,
      nearest: matches.map((match) => ({
        id: match.record.id,
        title: match.record.title,
        score: Number(match.score.toFixed(3)),
      })),
    };
  });
  rows.sort((a, b) => b.maxScore - a.maxScore);
  console.log(
    JSON.stringify(
      {
        pack: pack.id,
        kernels: rows.length,
        highSimilarityKernels: rows.filter((row) => row.maxScore >= 0.15).length,
        rows,
      },
      null,
      2,
    ),
  );
} else if (argv.includes('--gaps')) {
  printGaps();
} else if (argv.includes('--duplicates')) {
  const threshold = Number(argv[argv.indexOf('--duplicates') + 1] ?? 0.2);
  console.log(`Pairs >= ${threshold}: ${duplicatePairs.filter((pair) => pair.score >= threshold).length}`);
  for (const pair of duplicatePairs.filter((pair) => pair.score >= threshold).slice(0, 50)) {
    console.log(`${pair.score.toFixed(3)} ${pair.a} <> ${pair.b} (${pair.titles.join(' / ')})`);
  }
} else {
  writeIndex();
}
