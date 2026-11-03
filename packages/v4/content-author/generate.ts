import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { chat, parseModelJSON } from '../../model/config.js';
import {
  assertGeneratedPack,
  validateGeneratedPack,
  type GeneratedNode,
  type GeneratedOutcome,
  type GeneratedPack,
} from '../generated.js';
import type { ContentNodeBrief, ContentFamilyBrief } from './briefs.js';
import { validateAuthoredPack } from './strict.js';

export type GenerationBrief = Omit<GeneratedPack, 'nodes'> & {
  nodeBriefs?: ContentNodeBrief[];
  allowedResidenceIds?: string[];
  forbidden?: string[];
};

export type PackAttempt = {
  attempt: number;
  tokens: number;
  model?: string;
  errors: string[];
  warnings: string[];
  rawFile?: string;
};

export type PackGenerationResult = {
  ok: boolean;
  pack?: GeneratedPack;
  /** Tokens for the successful call, or the sum of failed attempts. */
  tokens: number;
  successTokens: number;
  attempts: PackAttempt[];
  model?: string;
  errors: string[];
  warnings: string[];
};

export type GeneratePackOptions = {
  maxAttempts?: number;
  maxTokens?: number;
  timeoutMs?: number;
  rawDir?: string;
  onAttempt?: (attempt: PackAttempt) => void;
};

const EFFECT_NAMES = [
  'cash',
  'food',
  'health',
  'condition',
  'mood',
  'reputation',
  'skill',
  'flag',
  'education',
  'employment',
  'unemployment',
  'relation',
  'relation_end',
  'role',
  'move',
  'household',
  'residence',
  'birth',
  'death',
  'estate',
].join(', ');

const CONDITION_NAMES = [
  'age',
  'stage',
  'cash',
  'householdSize',
  'overcrowded',
  'health',
  'education',
  'employment',
  'placeKind',
  'hasRole',
  'notHasRole',
  'hasRelation',
  'notHasRelation',
  'worldYear',
  'pressure',
  'historicalProcess',
  'legacy',
].join(', ');

function schemaExample(brief: GenerationBrief) {
  const node = brief.nodeBriefs?.[0];
  return {
    id: brief.id,
    title: brief.title,
    stage: brief.stage,
    ageWindow: brief.ageWindow,
    tags: brief.tags,
    baseRate: brief.baseRate,
    conditions: brief.conditions ?? [],
    ...(brief.kind ? { kind: brief.kind } : {}),
    ...(brief.task ? { task: brief.task } : {}),
    nodes: [
      {
        id: node?.id ?? `${brief.id}.concrete-node`,
        title: node?.title ?? '具体事件标题',
        weight: node?.weight ?? 1,
        rate: Number((brief.baseRate / Math.max(1, brief.nodeBriefs?.length ?? 4)).toFixed(4)),
        conditions: node?.conditions ?? [],
        roles: node?.roles ?? [
          { key: 'subject', kind: 'subject', required: true, minAge: 18, maxAge: 60 },
          { key: 'neighbor', kind: 'neighbor', required: true, minAge: 25, maxAge: 75 },
        ],
        outcomes: [
          {
            id: 'concrete-outcome',
            weight: 1,
            text: '具体人物在具体地点做了一件具体的事，付出或得到具体的钱、食物、健康、关系后果。',
            effects: [
              { type: 'cash', householdId: '$household', amount: -2, reason: '具体开销' },
              {
                type: 'relation',
                a: '$subject',
                b: '$neighbor',
                kind: 'acquaintance',
                trust: 0.05,
                reason: '具体关系变化',
              },
            ],
            narration: [
              {
                id: 'default',
                key: 'concrete-outcome',
                text: '同一件事换一个观察角度，写出动作、物件、声音或气味，不重复 outcome 文本。',
                tone: ['dry'],
              },
              {
                id: 'alt',
                key: 'concrete-outcome',
                text: '再换一个场景细节和人物反应，仍然只写眼前发生的事，不写多年以后。',
                tone: ['matter-of-fact'],
              },
            ],
          },
        ],
      },
    ],
  };
}

function nodeCards(brief: GenerationBrief): string {
  if (!brief.nodeBriefs?.length) return '';
  return brief.nodeBriefs
    .map(
      (node, index) => `节点 ${index + 1}
- id 必须是 "${node.id}"
- 标题必须是 "${node.title}"
- 事件前提：${node.premise}
- 必须使用这些 roles（key、kind、年龄、性别、organizationKind 都不能改）：
${JSON.stringify(node.roles, null, 2)}
- 节点条件（固定）：${JSON.stringify(node.conditions ?? [], null, 2)}
- 本节点只允许这些 effect 类型：${(node.allowedEffects ?? []).join(', ') || '见全局列表'}
- 正文 token 只能使用：${node.roles.map((role) => `{${role.key}}`).join(' ')} 以及 {subject} {residence} {place} {school} {workplace} {age} {year}
${node.forbiddenTokens?.length ? `- 正文禁止使用这些 token：${node.forbiddenTokens.map((token) => `{${token}}`).join(' ')}` : ''}
- 写 2 到 3 个 outcome。可参考的方向：${node.outcomeHints.join('；')}`,
    )
    .join('\n\n');
}

function buildPrompt(brief: GenerationBrief, previousErrors: string[]): string {
  const cards = nodeCards(brief);
  const fixedResidences = brief.allowedResidenceIds?.length
    ? `\n本包允许的固定住址（只在写 residence/move effect 时使用，不能写别的地点 id）：${brief.allowedResidenceIds.join(', ')}。residence effect 形状为 { "type": "residence", "householdId": "$household", "residenceId": "上面的某个 id", "reason": "具体原因" }。`
    : '';
  const retry =
    previousErrors.length > 0
      ? `\n上一次输出没有通过验证。必须修正以下问题，然后重新输出完整 JSON：\n- ${previousErrors
          .slice(0, 20)
          .join('\n- ')}`
      : '';
  const effectShapes = `effect 字段名必须完全按下面写，不能改别名：
- health/mood/reputation：{ "type": "health", "personId": "$subject", "amount": -0.04, "reason": "..." }
- skill：{ "type": "skill", "personId": "$subject", "skill": "numeracy", "amount": 0.04, "reason": "..." }
- condition：{ "type": "condition", "personId": "$subject", "condition": "bronchitis", "add": true, "reason": "..." }
- flag：{ "type": "flag", "personId": "$subject", "flag": "seeking_work", "add": true, "reason": "..." }
- education：{ "type": "education", "personId": "$subject", "status": "vocational", "level": 1, "reason": "..." }
- employment：{ "type": "employment", "personId": "$subject", "organizationId": "$employer", "occupation": "印刷厂跑腿", "wage": 8, "workplaceId": "$workplace", "reason": "..." }（只有 roles 同时有 employer 且 subject 已就业时才可用）
- unemployment：{ "type": "unemployment", "personId": "$subject", "reason": "..." }
- relation：{ "type": "relation", "a": "$subject", "b": "$neighbor", "kind": "acquaintance", "trust": 0.05, "affection": 0, "obligation": 0, "fear": 0, "respect": 0, "reason": "..." }
- relation_end：{ "type": "relation_end", "a": "$subject", "b": "$partner", "kind": "partner", "reason": "..." }
- cash：{ "type": "cash", "householdId": "$household", "amount": -2, "reason": "..." }
- food：{ "type": "food", "householdId": "$household", "amount": 2, "reason": "..." }
- household：{ "type": "household", "personId": "$worker", "householdId": "$household", "reason": "..." }
- residence：{ "type": "residence", "householdId": "$household", "residenceId": "允许的住址 id", "reason": "..." }
- death：{ "type": "death", "personId": "$partner", "cause": "stroke", "reason": "..." }
- estate：{ "type": "estate", "personId": "$subject", "heirHouseholdId": "$household", "amount": 12, "reason": "..." }
所有人物引用字段必须叫 personId，不能写 person；所有数量字段必须叫 amount，不能写 delta。`;
  return `你是历史人生模拟游戏的内容作者。为1900年代维也纳生成一个事件族包，严格输出 JSON，不要 markdown，不要解释。

事件族：${brief.title} (${brief.id})
阶段：${brief.stage}
年龄：${brief.ageWindow.min}-${brief.ageWindow.max}
标签：${brief.tags.join(', ')}
基础年发生率：${brief.baseRate}\n任务类型：${brief.kind === 'task' ? '主动任务（kind=task；由人物按效用选择，不按年发生率随机触发）' : '普通事件（kind=event；按年发生率抽样）'}\n任务写作：${brief.kind === 'task' ? '必须写人物主动发起或尝试的具体行动；结果可以是成功、部分成功、被拒绝、失败或付出代价。不要把任务写成外部事件突然降临到人物头上。每个节点至少有一个 outcome 体现拒绝、失败或代价，而不是只有成功。' : '写实际发生的生活遭遇，不要求人物主动发起。'}
共同条件：${JSON.stringify(brief.conditions ?? [])}
${fixedResidences}

${cards || `请生成 ${brief.nodeBriefs?.length ?? 4} 个真正不同的具体事件节点。`}

写作要求：
- 每个节点写 2 到 3 个 outcome，每个 outcome 写至少 2 个叙事变体；变体之间必须换细节、动作和观察角度，不能只换形容词。
- 文本要具体：写清楚人名/角色、维也纳的区、街、店、机构、物件、价格（克朗/赫勒）、身体感觉和直接后果。价格要符合 1900 年代工人生活。
- 可以有小事，也可以有改变命运的事；但只写眼前发生的事，不写“多年后”“从此”“命运”“属性”这类总结。
- 不写露骨性内容、未成年人性内容、血腥猎奇；疾病、工伤、贫困、死亡要具体、克制。
- 不出现内部字段名、数值属性、模型说明或英文占位符。正文里只允许使用 roles 中声明的 {key}，以及 {subject} {residence} {place} {school} {workplace} {age} {year}；禁止自行创造 {foreman} {master} {doctor} {landlord} 等未声明 token。需要师傅/工头时，使用节点卡已经声明的 employer、journeyman、worker 等角色 key。
- 不要写 followupIds 或 followupTargets；本批内容不设后续事件。
- 同一节点内 outcome 文本必须彼此不同；整个包内也不能出现重复或近似重复的 outcome 文本。

结构约束：
- 顶层 id/title/stage/ageWindow/tags/baseRate/conditions/kind/task 必须与上面给出的一致；task 元数据是固定契约，不要改写。
- nodes 数量必须正好 ${brief.nodeBriefs?.length ?? 4}，id 和 title 必须与节点卡完全一致；roles 必须原样复制节点卡，不要增删角色。
- 只能使用节点卡写明的 effect 类型；没有 employer 角色时不要写 employment effect；没有 worker/neighbor 等角色时不要写 household effect。
- outcome.id 在每个包内唯一；weight 为正数。
- effects 只能使用：${EFFECT_NAMES}。
${effectShapes}
- conditions 只能使用：${CONDITION_NAMES}。
- 角色 kind 只能是 subject, parent, guardian, sibling, partner, teacher, employer, worker, union_member, neighbor, official, organization。
- relation effect 必须使用 { a, b, kind, trust/affection/obligation/fear/respect, reason }，kind 只能是 kin/guardian/partner/friend/colleague/employer/rival/acquaintance。
- cash/food effect 必须使用 { householdId: "$household", amount, reason }；food 单位是家庭一顿/一天的份额，通常 1-4。
- skill 只能是 literacy/numeracy/craft/social；education.status 只能是 none/home/primary/secondary/apprenticeship/higher。
- 所有 effect 的 reason 必须是纯文本，不能带 {token}。
- 每个 outcome 至少 2 个 effects；不要写空 effect、未知 effect 或没有原因的效果。
- 叙事文本 50-140 个汉字；outcome 文本 60-160 个汉字。

输出必须是这个形状（字段名和结构不能变）：
${JSON.stringify(schemaExample(brief), null, 2)}
${retry}

JSON 之外不能有任何字符。`;
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined;
}

const BUILTIN_TEXT_TOKENS = new Set([
  'subject',
  'place',
  'residence',
  'school',
  'workplace',
  'age',
  'year',
  'household',
  'child',
]);

const ROLE_TOKEN_ALIASES: Record<string, string[]> = {
  foreman: ['employer', 'journeyman', 'worker'],
  master: ['employer', 'teacher'],
  boss: ['employer'],
  office: ['official', 'employer'],
  doctor: ['employer', 'official'],
  physician: ['employer', 'official'],
  landlord: ['official', 'neighbor', 'employer'],
  editor: ['employer', 'official'],
  teacher: ['teacher'],
  mother: ['parent'],
  father: ['parent'],
  parent: ['parent'],
};

function normalizeRoleTokens(text: string, roleKeys: Set<string>): string {
  return text.replace(/\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g, (token, key: string) => {
    if (BUILTIN_TEXT_TOKENS.has(key) || roleKeys.has(key)) return token;
    const target = (ROLE_TOKEN_ALIASES[key] ?? []).find((candidate) => roleKeys.has(candidate));
    return target ? `{${target}}` : token;
  });
}

function normalizeEffectValue(value: unknown, roleKeys: Set<string>): unknown {
  if (typeof value === 'string') return normalizeRoleTokens(value, roleKeys);
  if (Array.isArray(value)) return value.map((item) => normalizeEffectValue(item, roleKeys));
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, entry]) => [
        key,
        normalizeEffectValue(entry, roleKeys),
      ]),
    );
  }
  return value;
}

function normalizeGeneratedOutcome(
  raw: unknown,
  roleKeys: Set<string>,
): GeneratedOutcome | undefined {
  const record = asRecord(raw);
  if (!record) return undefined;
  if (typeof record.id !== 'string' || record.id.length === 0) return undefined;
  const effects = Array.isArray(record.effects)
    ? (normalizeEffectValue(record.effects, roleKeys) as GeneratedOutcome['effects'])
    : [];
  const cleanedEffects = effects.filter((effect) => {
    if (!effect || typeof effect !== 'object') return false;
    if (['cash', 'food', 'health', 'mood', 'reputation', 'skill', 'estate'].includes(effect.type)) {
      const amount = (effect as { amount?: unknown }).amount;
      if (typeof amount !== 'number' || !Number.isFinite(amount) || amount === 0) return false;
    }
    if (effect.type === 'cash' || effect.type === 'food')
      (effect as { householdId: string }).householdId = '$household';
    if (effect.type === 'education') {
      const status = (effect as { status?: string }).status;
      if (status === 'vocational') (effect as { status: string }).status = 'apprenticeship';
      if (status === 'university') (effect as { status: string }).status = 'higher';
    }
    return true;
  });
  if (cleanedEffects.length === 0) return undefined;
  const text = typeof record.text === 'string' ? normalizeRoleTokens(record.text, roleKeys) : '';
  if (text.length < 20) return undefined;
  const narration = Array.isArray(record.narration)
    ? record.narration
        .map((variant) => {
          const v = asRecord(variant);
          if (!v || typeof v.text !== 'string') return undefined;
          const normalized = normalizeRoleTokens(v.text, roleKeys);
          if (normalized.length < 20) return undefined;
          return {
            ...(v as object),
            key: record.id as string,
            text: normalized,
          } as GeneratedOutcome['narration'] extends (infer T)[] | undefined ? T : never;
        })
        .filter((variant): variant is NonNullable<typeof variant> => Boolean(variant))
    : undefined;
  return {
    ...(record as object),
    id: record.id,
    text,
    effects: cleanedEffects,
    narration,
  } as GeneratedOutcome;
}

function normalizePack(raw: unknown, brief: GenerationBrief): GeneratedPack {
  const record = asRecord(raw);
  if (!record) throw new Error('model output is not a JSON object');
  const rawNodes = Array.isArray(record.nodes) ? record.nodes : [];
  const nodes: GeneratedNode[] = [];
  if (brief.nodeBriefs?.length) {
    if (rawNodes.length !== brief.nodeBriefs.length) {
      throw new Error(`expected ${brief.nodeBriefs.length} nodes, got ${rawNodes.length}`);
    }
    for (const [index, nodeBrief] of brief.nodeBriefs.entries()) {
      const match =
        rawNodes.find((value) => asRecord(value)?.id === nodeBrief.id) ?? rawNodes[index];
      const nodeRecord = asRecord(match);
      if (!nodeRecord) throw new Error(`${nodeBrief.id}: node is not an object`);
      const roleKeys = new Set(nodeBrief.roles.map((role) => role.key));
      const rawOutcomes = Array.isArray(nodeRecord.outcomes) ? nodeRecord.outcomes : [];
      const outcomes = rawOutcomes
        .map((outcome) => normalizeGeneratedOutcome(outcome, roleKeys))
        .filter((outcome): outcome is GeneratedOutcome => Boolean(outcome));
      nodes.push({
        id: nodeBrief.id,
        title: nodeBrief.title,
        weight: nodeBrief.weight ?? 1,
        rate: Number(
          (brief.baseRate * (nodeBrief.rateShare ?? 1 / brief.nodeBriefs!.length)).toFixed(4),
        ),
        conditions: nodeBrief.conditions ?? [],
        roles: nodeBrief.roles,
        tags: nodeBrief.tags,
        outcomes: outcomes as GeneratedOutcome[],
        ...(nodeBrief.task ? { task: { ...nodeBrief.task } } : {}),
      });
    }
  } else {
    for (const value of rawNodes) {
      const node = asRecord(value);
      if (!node) throw new Error('node is not an object');
      nodes.push(node as unknown as GeneratedNode);
    }
  }
  return {
    id: brief.id,
    title: brief.title,
    stage: brief.stage,
    ageWindow: { ...brief.ageWindow },
    tags: [...brief.tags],
    baseRate: brief.baseRate,
    conditions: [...(brief.conditions ?? [])],
    ...(brief.kind ? { kind: brief.kind } : {}),
    ...(brief.task ? { task: { ...brief.task } } : {}),
    nodes,
  };
}

function rawFileName(brief: GenerationBrief, attempt: number): string {
  const dir = resolve('/tmp/opencode');
  mkdirSync(dir, { recursive: true });
  return resolve(dir, `${brief.id}.attempt-${attempt}.raw.json`);
}

function checkAllowedEffects(pack: GeneratedPack, brief: GenerationBrief): string[] {
  if (!brief.nodeBriefs?.length) return [];
  const errors: string[] = [];
  for (const [index, nodeBrief] of brief.nodeBriefs.entries()) {
    const node = pack.nodes[index];
    if (!node) continue;
    const allowed = new Set(nodeBrief.allowedEffects ?? []);
    if (allowed.size === 0) continue;
    for (const outcome of node.outcomes) {
      for (const effect of outcome.effects) {
        if (!allowed.has(effect.type)) {
          errors.push(
            `${node.id}/${outcome.id}: effect ${effect.type} is not allowed in this node`,
          );
        }
      }
    }
  }
  return errors;
}

/**
 * Ask the real model for one family, normalize its structural fields against
 * the brief, then require both the publishing validator and the stricter
 * authored-content validator to pass. Nothing is written to the repository.
 */
export async function generatePack(
  brief: GenerationBrief,
  options: GeneratePackOptions = {},
): Promise<PackGenerationResult> {
  const maxAttempts = Math.max(1, options.maxAttempts ?? 3);
  const attempts: PackAttempt[] = [];
  let previousErrors: string[] = [];
  let totalTokens = 0;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const prompt = buildPrompt(brief, previousErrors);
    try {
      const result = await chat(
        [
          {
            role: 'system',
            content:
              '你是严谨的历史游戏内容作者，熟悉1900年代维也纳工人生活。你只输出可编译的 JSON 内容，不写解释。',
          },
          { role: 'user', content: prompt },
        ],
        {
          conversation: `v4-content:${brief.id}:attempt-${attempt}`,
          maxTokens: options.maxTokens ?? 8000,
          json: true,
          timeoutMs: options.timeoutMs ?? 180000,
        },
      );
      totalTokens += result.tokens;
      const rawFile = rawFileName(brief, attempt);
      writeFileSync(rawFile, result.text.trim() + '\n');

      let errors: string[] = [];
      let warnings: string[] = [];
      let pack: GeneratedPack | undefined;
      try {
        const parsed = parseModelJSON(result.text);
        pack = normalizePack(parsed, brief);
        const base = validateGeneratedPack(pack);
        warnings = [...base.warnings];
        errors = [...base.errors];
        try {
          assertGeneratedPack(pack);
        } catch (error) {
          errors.push(String(error));
        }
        const strict = validateAuthoredPack(pack, {
          phase2: (brief.nodeBriefs?.length ?? 0) === 4 && brief.kind !== 'task',
        });
        errors.push(...strict.errors);
        warnings.push(...strict.warnings);
        errors.push(...checkAllowedEffects(pack, brief));
      } catch (error) {
        errors = [error instanceof Error ? error.message : String(error)];
      }

      const attemptRecord: PackAttempt = {
        attempt,
        tokens: result.tokens,
        model: result.model,
        errors,
        warnings,
        rawFile,
      };
      attempts.push(attemptRecord);
      options.onAttempt?.(attemptRecord);

      if (errors.length === 0 && pack) {
        return {
          ok: true,
          pack,
          tokens: result.tokens,
          successTokens: result.tokens,
          attempts,
          model: result.model,
          errors: [],
          warnings,
        };
      }
      previousErrors = errors;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const attemptRecord: PackAttempt = {
        attempt,
        tokens: 0,
        errors: [message],
        warnings: [],
      };
      attempts.push(attemptRecord);
      options.onAttempt?.(attemptRecord);
      previousErrors = [message];
    }
  }

  return {
    ok: false,
    tokens: totalTokens,
    successTokens: 0,
    attempts,
    errors: previousErrors,
    warnings: [],
  };
}

export function writeGeneratedPack(pack: GeneratedPack, directory: string): string {
  const file = resolve(directory, `${pack.id}.json`);
  mkdirSync(directory, { recursive: true });
  writeFileSync(file, JSON.stringify(pack, null, 2) + '\n');
  return file;
}

export function describeBrief(brief: ContentFamilyBrief) {
  return {
    id: brief.id,
    title: brief.title,
    stage: brief.stage,
    ageWindow: brief.ageWindow,
    tags: brief.tags,
    nodes: brief.nodeBriefs.length,
  };
}
