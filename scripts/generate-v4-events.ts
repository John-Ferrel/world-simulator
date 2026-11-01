import '../packages/model/config.js';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { chat, parseModelJSON } from '../packages/model/config.js';
import {
  assertGeneratedPack,
  compileGeneratedPack,
  type GeneratedPack,
} from '../packages/v4/generated.js';
import {
  PHASE2_FAMILY_BRIEFS,
  PHASE3_FAMILY_BRIEFS,
  PHASE4_FAMILY_BRIEFS,
  generatePack,
  type GenerationBrief,
} from '../packages/v4/content-author/index.js';

const legacyBriefs: Record<string, Omit<GeneratedPack, 'nodes'>> = {
  'vienna-printshop-daily': {
    id: 'vienna-printshop-daily',
    title: '印刷厂的普通一天',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 60 },
    tags: ['work', 'factory', 'labour', 'social'],
    baseRate: 0.42,
    conditions: [
      { kind: 'employment', employed: true },
      { kind: 'placeKind', in: ['factory'] },
    ],
  },
  'vienna-tenement-neighbors': {
    id: 'vienna-tenement-neighbors',
    title: '合租楼里的邻里',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 70 },
    tags: ['home', 'social', 'family', 'housing'],
    baseRate: 0.4,
    conditions: [{ kind: 'placeKind', in: ['home'] }],
  },
  'vienna-childhood-friends': {
    id: 'vienna-childhood-friends',
    title: '同学、院子与第一份秘密',
    stage: 'childhood',
    ageWindow: { min: 7, max: 12 },
    tags: ['childhood', 'social', 'school', 'street'],
    baseRate: 0.35,
    conditions: [{ kind: 'placeKind', in: ['home', 'school', 'street'] }],
  },
  'vienna-adolescence': {
    id: 'vienna-adolescence',
    title: '十四岁前后的选择',
    stage: 'adolescence',
    ageWindow: { min: 12, max: 17 },
    tags: ['adolescence', 'school', 'work', 'family', 'social'],
    baseRate: 0.32,
    conditions: [{ kind: 'age', min: 12, max: 17 }],
  },
  'vienna-adult-social': {
    id: 'vienna-adult-social',
    title: '成年人之间的来往',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 65 },
    tags: ['adulthood', 'social', 'work', 'family'],
    baseRate: 0.22,
    conditions: [{ kind: 'age', min: 18, max: 65 }],
  },
  'vienna-church-community': {
    id: 'vienna-church-community',
    title: '教区、葬礼与邻里互助',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 75 },
    tags: ['faith', 'social', 'family', 'home'],
    baseRate: 0.18,
    conditions: [{ kind: 'placeKind', in: ['home', 'church'] }],
  },
  'vienna-infant-household': {
    id: 'vienna-infant-household',
    title: '婴儿床边的一年',
    stage: 'infancy',
    ageWindow: { min: 0, max: 2 },
    tags: ['infancy', 'health', 'family', 'home'],
    baseRate: 0.5,
    conditions: [{ kind: 'placeKind', in: ['home'] }],
  },
  'vienna-early-childhood': {
    id: 'vienna-early-childhood',
    title: '会走路以后',
    stage: 'childhood',
    ageWindow: { min: 3, max: 6 },
    tags: ['childhood', 'family', 'home', 'street'],
    baseRate: 0.45,
    conditions: [{ kind: 'placeKind', in: ['home', 'street'] }],
  },
  'vienna-childhood-street': {
    id: 'vienna-childhood-street',
    title: '街巷里的童年',
    stage: 'childhood',
    ageWindow: { min: 5, max: 11 },
    tags: ['childhood', 'street', 'social', 'home'],
    baseRate: 0.32,
    conditions: [{ kind: 'placeKind', in: ['home', 'street'] }],
  },
  'vienna-elder-care': {
    id: 'vienna-elder-care',
    title: '老年、药房与旧同事',
    stage: 'elderhood',
    ageWindow: { min: 60, max: 82 },
    tags: ['elderhood', 'health', 'family', 'social'],
    baseRate: 0.2,
    conditions: [{ kind: 'age', min: 60, max: 82 }],
  },
  'vienna-market-household': {
    id: 'vienna-market-household',
    title: '市场、赊账与家里的锅',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 70 },
    tags: ['home', 'market', 'food', 'social'],
    baseRate: 0.3,
    conditions: [{ kind: 'placeKind', in: ['home', 'shop'] }],
  },
  'vienna-apprentice-printshop': {
    id: 'vienna-apprentice-printshop',
    title: '排字房学徒',
    stage: 'adolescence',
    ageWindow: { min: 14, max: 17 },
    tags: ['work', 'apprentice', 'factory', 'social'],
    baseRate: 0.34,
    conditions: [{ kind: 'employment', employed: true }],
  },
  'vienna-illness-household': {
    id: 'vienna-illness-household',
    title: '家里的病与照护',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 75 },
    tags: ['health', 'family', 'home'],
    baseRate: 0.22,
    conditions: [{ kind: 'health', max: 0.85 }],
  },
  'vienna-school-childhood': {
    id: 'vienna-school-childhood',
    title: '国民学校的孩子',
    stage: 'childhood',
    ageWindow: { min: 7, max: 11 },
    tags: ['school', 'social', 'childhood'],
    baseRate: 0.38,
    conditions: [
      { kind: 'education', in: ['primary'] },
      { kind: 'placeKind', in: ['school', 'home'] },
    ],
  },
};

const briefs: Record<string, GenerationBrief> = {
  ...legacyBriefs,
  ...Object.fromEntries(PHASE2_FAMILY_BRIEFS.map((brief) => [brief.id, brief])),
  ...Object.fromEntries(PHASE3_FAMILY_BRIEFS.map((brief) => [brief.id, brief])),
  ...Object.fromEntries(PHASE4_FAMILY_BRIEFS.map((brief) => [brief.id, brief])),
};

const family = process.argv[2];
if (!family || !briefs[family]) {
  console.error(`usage: tsx scripts/generate-v4-events.ts <${Object.keys(briefs).join('|')}>`);
  process.exit(1);
}
const brief = briefs[family]!;
mkdirSync(resolve('packages/v4/content/generated'), { recursive: true });

if ('nodeBriefs' in brief) {
  const result = await generatePack(brief, {
    maxAttempts: 3,
    maxTokens: 8000,
    timeoutMs: 180000,
    onAttempt: (attempt) => {
      console.error(
        `${brief.id} attempt ${attempt.attempt}: ${attempt.tokens} tokens, ${attempt.errors.length} errors`,
      );
    },
  });
  if (!result.ok || !result.pack) {
    console.error(
      JSON.stringify(
        {
          status: 'failed',
          family: brief.id,
          tokens: result.tokens,
          errors: result.errors,
          attempts: result.attempts,
          written: false,
        },
        null,
        2,
      ),
    );
    process.exit(1);
  }
  assertGeneratedPack(result.pack);
  const scenes = compileGeneratedPack(result.pack);
  const output = resolve(`packages/v4/content/generated/${brief.id}.json`);
  writeFileSync(output, JSON.stringify(result.pack, null, 2) + '\n');
  console.log(
    JSON.stringify({
      status: 'written',
      file: output,
      nodes: result.pack.nodes.length,
      scenes: scenes.length,
      outcomes: result.pack.nodes.reduce((sum, node) => sum + node.outcomes.length, 0),
      narrations: result.pack.nodes.reduce(
        (sum, node) =>
          sum +
          node.outcomes.reduce((inner, outcome) => inner + (outcome.narration?.length ?? 0), 0),
        0,
      ),
      tokens: result.successTokens,
      model: result.model,
      warnings: result.warnings,
      attempts: result.attempts,
    }),
  );
} else {
  const schemaExample = {
    id: brief.id,
    title: brief.title,
    stage: brief.stage,
    ageWindow: brief.ageWindow,
    tags: brief.tags,
    baseRate: brief.baseRate,
    conditions: brief.conditions,
    nodes: [
      {
        id: `${brief.id}.example`,
        title: '具体事件标题',
        weight: 1,
        rate: 0.2,
        conditions: [{ kind: 'health', min: 0.3 }],
        roles: [
          { key: 'subject', kind: 'subject', required: true, minAge: 18, maxAge: 60 },
          {
            key: 'employer',
            kind: 'employer',
            required: true,
            minAge: 18,
            maxAge: 80,
            organizationKind: 'factory',
          },
        ],
        outcomes: [
          {
            id: 'concrete-outcome',
            weight: 1,
            text: '{subject}在{workplace}做了具体的事，{employer}作出了具体回应。后果是具体的。',
            effects: [
              { type: 'health', personId: '$subject', amount: -0.03, reason: '具体原因' },
              { type: 'cash', householdId: '$household', amount: 2, reason: '具体收入' },
              {
                type: 'relation',
                a: '$subject',
                b: '$employer',
                kind: 'employer',
                trust: -0.1,
                fear: 0.05,
                reason: '具体关系变化',
              },
            ],
            narration: [
              {
                id: 'default',
                key: 'concrete-outcome',
                text: '{subject}在{workplace}做了具体的事。{employer}的回应具体而直接。',
                tone: ['dry'],
              },
            ],
          },
        ],
      },
    ],
  };

  const prompt = `你是一个历史人生模拟游戏的内容作者。为1900年代维也纳生成一个事件族包，严格输出 JSON，不要 markdown，不要解释。

事件族：${brief.title} (${brief.id})
适用阶段：${brief.stage}
年龄：${brief.ageWindow.min}-${brief.ageWindow.max}
标签：${brief.tags.join(', ')}
基础年发生率：${brief.baseRate}
共同条件：${JSON.stringify(brief.conditions ?? [])}

请生成 4 个真正不同的具体事件节点，每个节点 2-3 个 outcome，每个 outcome 2 个叙事变体。事件必须有具体人物、地点、动作、物件、钱或身体后果；不能是“努力工作”“关系变好”这种空话。可以有小事，也可以有改变命运的事。

输出必须是这个形状（字段名和结构不能变）：
${JSON.stringify(schemaExample, null, 2)}

约束：
- 只能使用 Effects 类型：cash, food, health, condition, mood, reputation, skill, flag, education, unemployment, relation, relation_end, role, move, household, residence, birth, death, estate。
- 效果引用只能使用 $subject, $mother, $father, $partner, $teacher, $employer, $worker, $neighbor, $household, $residence, $school, $workplace；不能写真实人物 ID。引用必须与 roles 里声明的 key 完全一致。
- relation 效果必须使用 { a, b, kind, trust/affection/obligation/fear/respect, reason }，绝对不能用 { personId, amount }。kind 只能是 kin/guardian/partner/friend/colleague/employer/rival/acquaintance。
- cash 和 food 效果必须使用 { householdId: '$household', amount: 数字, reason }，不能用 personId。food 的数量单位是家庭一顿/一天的份额，通常 1–4，不要写 0.02。
- 角色 kind 只能是 subject, parent, guardian, sibling, partner, teacher, employer, worker, union_member, neighbor, official, organization。
- 条件 kind 只能是 age, stage, cash, householdSize, overcrowded, health, education, employment, placeKind, hasRole, hasRelation, notHasRelation, worldYear, pressure。
- 文本里可以用 {subject} {mother} {father} {partner} {teacher} {employer} {neighbor} {residence} {place} {school} {workplace} {child}，不能出现内部字段名或数值。
- 不要写“多年后”“从此”“她决定”“命运”“属性”等空泛或未来总结。
- 不要写露骨性内容、未成年人性内容、血腥猎奇；可以写疾病、工伤、贫困、死亡，但要具体、克制。
- 事件之间可以用 followupIds 指向本包内节点 id；不要引用不存在的事件。
- 同一节点、同一 outcome 的文本必须彼此不同，不能只换形容词。
- 输出 JSON 之外不能有任何字符。`;

  const result = await chat(
    [
      {
        role: 'system',
        content:
          '你是严谨的历史游戏内容作者，熟悉1900年代维也纳工人生活。你只输出可编译的 JSON 内容，不写解释。',
      },
      { role: 'user', content: prompt },
    ],
    { conversation: `v4-content:${brief.id}`, maxTokens: 6000, json: true, timeoutMs: 120000 },
  );

  const pack = parseModelJSON(result.text) as GeneratedPack;
  writeFileSync(`/tmp/opencode/${brief.id}.raw.json`, JSON.stringify(pack, null, 2));
  assertGeneratedPack(pack);
  const scenes = compileGeneratedPack(pack);
  const output = resolve(`packages/v4/content/generated/${brief.id}.json`);
  writeFileSync(output, JSON.stringify(pack, null, 2) + '\n');
  console.log(
    JSON.stringify({
      file: output,
      nodes: pack.nodes.length,
      scenes: scenes.length,
      tokens: result.tokens,
      model: result.model,
    }),
  );
}
