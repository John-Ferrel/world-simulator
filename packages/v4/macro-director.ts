import { chat } from '../model/config.js';
import {
  MACRO_PARAM_KEYS,
  macroSnapshot,
  type MacroProposal,
  type MacroSnapshot,
  type MacroState,
} from './macro.js';
import type { WorldState } from './domain.js';
import { GENERATED_PACKS } from './content/generated/index.js';
import { VIENNA_1912_SCENES } from './content/vienna-1912.js';
import { VIENNA_LIFE_SCENES } from './content/vienna-life.js';
import { VIENNA_POSTWAR_SCENES } from './content/vienna-postwar.js';
import { VIENNA_HISTORY_SCENES } from './content/vienna-history.js';
import { VIENNA_FAMILY_RUNTIME_SCENES } from './content/vienna-family.js';
import { PHASE4_FAMILY_BRIEFS } from './content-author/phase4-briefs.js';

/**
 * Known event families are derived from the compiled content, not invented by
 * the model. The Director may only change policies for families in this list.
 */
export function knownMacroFamilyIds(): string[] {
  const ids = new Set<string>();
  for (const pack of GENERATED_PACKS) ids.add(pack.id);
  for (const brief of PHASE4_FAMILY_BRIEFS) ids.add(brief.id);
  for (const scene of [
    ...VIENNA_1912_SCENES,
    ...VIENNA_LIFE_SCENES,
    ...VIENNA_POSTWAR_SCENES,
    ...VIENNA_HISTORY_SCENES,
    ...VIENNA_FAMILY_RUNTIME_SCENES,
  ]) {
    ids.add(scene.familyId ?? scene.id);
  }
  return [...ids].sort();
}

export type MacroDirectorInput = {
  world: WorldState;
  state: MacroState;
  knownFamilies?: string[];
  maxTokens?: number;
};

function schemaExample(): string {
  return JSON.stringify(
    {
      version: 1,
      regionId: 'region-lower-austria',
      effectiveFrom: { year: 1917, month: 1 },
      durationMonths: 12,
      summary: '战时运输恶化，粮食和燃料供应继续紧张。',
      confidence: 0.68,
      maintainStatus: false,
      developments: [
        {
          type: 'social_change',
          description: '一个由印刷工和女工组成的地下反战组织在利奥波德城出现。',
          severity: 0.7,
          organization: { name: 'Leopoldstadt Anti-War Group', kind: 'other' },
          eventFamilyIds: ['vienna-social-movement'],
        },
      ],
      parameterChanges: {
        foodSupply: -0.12,
        warIntensity: 0.08,
        stability: -0.05,
      },
      eventPoolChanges: [
        {
          familyId: 'vienna-market-household',
          weightMultiplier: 1.25,
        },
      ],
      historicalMoves: [
        {
          processId: 'development:example',
          intent: 'escalate',
          magnitude: 0.08,
          note: '继续扩大集会与救济网络。',
        },
      ],
      actions: [
        {
          kind: 'organize',
          processId: 'development:example',
          organizationId: 'org-example',
          actorPersonId: 'person-example',
          title: '在利奥波德城组织一次救济会议',
          description: '由现有组织召集成员和邻里，讨论配给、会费和下一步行动。',
          intensity: 0.6,
        },
      ],
    },
    null,
    2,
  );
}

export function macroDirectorMessages(
  input: MacroDirectorInput,
): { role: string; content: string }[] {
  const knownFamilies = input.knownFamilies ?? knownMacroFamilyIds();
  const snapshot: MacroSnapshot = macroSnapshot(input.world, knownFamilies, input.state);
  return [
    {
      role: 'system',
      content: `你是 1900 年前后真实地球历史模拟游戏的历史导演（Macro Director）。
你的职责不是写小说，也不是逐人决定生死，而是根据当前世界状态、地区条件、已发生的事实和真实历史背景，提出未来一段时间的高层历史发展，并把它压缩成有界的宏观参数变化。

硬规则：
- 只能提出提案，不能执行、不能修改已提交事件、不能改写过去。
- 所有效果必须落在给定 schema 的 parameterChanges 或 eventPoolChanges 中；不要输出代码、SQL、URL、任意效果列表或具体人物死亡。
- 参数是 0..1 的归一化值；parameterChanges 是“增量”，单次绝对值不超过 0.5；必须保持在 0..1。
- 事件池只能引用 availableFamilies 中已有的 familyId；weightMultiplier 0..3。
- 不要把出生时预期寿命、年死亡人数等最终统计直接写成参数。用战争、粮食、卫生、医疗、稳定度等条件表达。
- 如果当前世界没有发生现实中的战争，不要凭空强制制造 1914 年战争伤亡；世界线可以偏离现实。
- 如果历史发展是新的组织/社会运动，developments 中可带 organization（名称、类型、可选 placeId）和 eventFamilyIds；organization 会由 Engine 创建为真实 Organization，eventFamilyIds 只能引用 availableFamilies 中的内容族。
- 如果历史发展无法由现有参数/事件池/组织表达，写进 developments，并在 summary 中说明能力缺口；不要偷偷降级成一句 chronicle。
- 快照中的 historicalPeople 是真实历史人物；你只能通过 developments/eventFamilyIds 提出他们可能遇到的机会，不能直接写他们的关系、死亡、胜利或失败。历史人物的真实死亡日期不是游戏死亡命令。
- 快照中的 developments.historical 是已经存在的历史进程。可以用 historicalMoves 对已有进程提出 support/oppose/escalate/deescalate，但绝不能直接指定阶段、胜负或结果；阶段由 Engine 根据参与、组织资源和事件结算。不要为了每年制造新闻而新建进程。
- developments 只用于真正新的组织、运动或外部冲击。如果快照中已有能表达同一件事的进程，使用 historicalMoves 和 actions，不要另建一个文字相似、零参与者的 development。
- 不要因为真实历史中某年发生某事就强制它发生；只有当前世界状态和已提交事实支持时才推进。
- 快照中的 organizations 是真实存在的组织与当前负责人。可以用 actions 提出具体行动：organize（组织会议/项目）、recruit（招募）、negotiate（谈判）、publish（出版/宣传）、relief（救济）、repress（压制）、reform（推动改革）、spawn_process（从现有组织形成新的持续进程）。actions 只描述意图和参与者，Engine 会按其资源、关系和反对力量结算成功或失败；不要直接写“已经成功”“已经夺权”“已经死亡”。
- actions 必须引用快照中的 organizationId/actorPersonId；negotiate 还必须引用 targetOrganizationId；reform/spawn_process 应引用已有的 processId 或现有组织。每次最多 6 条，intensity 0..1。
- historicalLegacy 是过去进程留下的制度/记忆/战后状态。你可以提出与这些持久后果相称的新机会，但不要用一个 support +0.1 代替制度变化。
- 可以返回“维持现状”：parameterChanges、eventPoolChanges、historicalMoves 和 actions 都为空时必须让 developments 为空，并明确 summary 为维持现状。除此之外不要返回空提案。
- 只输出 JSON，不要 Markdown。

可用参数：${MACRO_PARAM_KEYS.join(', ')}。
JSON 形状示例（数值仅为接口示例，不是历史事实）：
${schemaExample()}`,
    },
    {
      role: 'user',
      content: `当前世界快照：
${JSON.stringify(snapshot, null, 2)}

请提出未来 1–60 个月的地区走势。输出一个 JSON 对象。`,
    },
  ];
}

export async function compileMacroProposal(input: MacroDirectorInput): Promise<{
  proposal: MacroProposal;
  model: string;
  tokens: number;
  text: string;
}> {
  const knownFamilies = input.knownFamilies ?? knownMacroFamilyIds();
  const messages = macroDirectorMessages({ ...input, knownFamilies });
  const result = await chat(messages, {
    conversation: `v4-macro:${input.world.id}:${input.world.date.year}:${input.world.date.month}`,
    maxTokens: input.maxTokens ?? 1800,
    json: true,
  });
  const { parseMacroProposal } = await import('./macro.js');
  try {
    const proposal = parseMacroProposal(result.text, {
      world: input.world,
      state: input.state,
      knownFamilies: new Set(knownFamilies),
    });
    return { proposal, model: result.model, tokens: result.tokens, text: result.text };
  } catch (error) {
    // Keep a bounded excerpt for operator diagnosis; never persist it as world
    // history and never execute it.
    const raw = result.text.replace(/\s+/g, ' ').slice(0, 700);
    throw new Error(`${(error as Error).message} | raw: ${raw}`);
  }
}
