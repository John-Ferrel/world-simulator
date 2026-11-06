import type { EventFact, Person, WorldState } from './domain.js';
import type { StateDefinition } from './state/types.js';
import { touchStateRevision } from './state/runtime.js';
import { WISH_STATES } from './content/states/wish-states.js';

export type WishArchetype =
  | 'power'
  | 'knowledge'
  | 'love'
  | 'wealth'
  | 'revenge'
  | 'freedom'
  | 'faith'
  | 'fame'
  | 'craft'
  | 'survival'
  | 'adventure'
  | 'beauty'
  | 'none';

export type WishCompilation = {
  archetype: WishArchetype;
  intensity: number;
  fixation: number;
  irony: number;
  stateId?: string;
  interpretation: string;
  privateGoal: string;
  matched: string[];
  compiledBy: 'deterministic-wish-compiler';
};

type WishRule = {
  archetype: Exclude<WishArchetype, 'none'>;
  pattern: RegExp;
  reading: string;
  goal: string;
};

const RULES: WishRule[] = [
  {
    archetype: 'power',
    pattern:
      /权力|权势|有权|统治者|国王|皇帝|沙皇|总统|首相|元首|独裁|王位|登上|掌权|power|king|emperor|ruler|throne|president|dominat/i,
    reading: '把“权力”当作一生的尺度：会更频繁地遇到政治、组织、职位和公开羞辱。',
    goal: '获得一个能被世界承认的真实职位或权力，而不只是被人称作有权。',
  },
  {
    archetype: 'knowledge',
    pattern:
      /知识|理解|真相|研究|科学|学问|读书|大学|学者|发明|发现|为什么|know|truth|science|research|study|scholar|invent/i,
    reading: '把“理解”当作一生的尺度：教育、档案、老师和未解的问题会更靠近。',
    goal: '弄懂一件别人没有替自己回答的事。',
  },
  {
    archetype: 'love',
    pattern:
      /爱|被爱|伴侣|婚姻|结婚|亲密|恋人|家庭|有人陪|不离不弃|love|marry|partner|intimacy|family/i,
    reading: '把“被选中、被留下”当作一生的尺度：亲密、拒绝和背叛会更重。',
    goal: '建立一段不因贫穷、战争或时间自动消失的亲密关系。',
  },
  {
    archetype: 'wealth',
    pattern: /财富|有钱|金钱|富有|发财|不再穷|摆脱贫困|大房子|wealth|rich|money|fortune|prosper/i,
    reading: '把“不再匮乏”当作一生的尺度：工钱、债务和意外收入会被放大。',
    goal: '让家里不再因为一笔小钱而失去住处或尊严。',
  },
  {
    archetype: 'revenge',
    pattern: /复仇|报仇|报复|血债|让他们付出|不能原谅|revenge|avenge|pay for|retribution/i,
    reading: '把“某件事不能过去”当作一生的尺度：背叛和伤害会被长期记住。',
    goal: '让伤害过自己的人承担一次真实的后果。',
  },
  {
    archetype: 'freedom',
    pattern: /自由|自己做主|不被安排|逃离|独立|freedom|independent|escape|autonomy/i,
    reading: '把“自己决定”当作一生的尺度：工作、婚姻和国家命令都会被拿来比较。',
    goal: '在一件具体的事情上，不再让别人替自己签字。',
  },
  {
    archetype: 'faith',
    pattern: /信仰|上帝|神|意义|救赎|殉道|宗教|faith|god|meaning|salvation|martyr/i,
    reading: '把“意义”当作一生的尺度：苦难、死亡和仪式会变得具体。',
    goal: '在最难的时候找到一个能站住而不必自欺的理由。',
  },
  {
    archetype: 'fame',
    pattern: /成名|出名|被看见|舞台|明星|名声|载入史册|fame|famous|stage|star|remembered/i,
    reading: '把“被看见”当作一生的尺度：舞台、报纸、喝彩和羞耻都会更近。',
    goal: '让一个陌生的公众记住自己的名字，不论是哪一种记住。',
  },
  {
    archetype: 'craft',
    pattern: /手艺|工匠|大师|作坊|修理|制作|印刷|木工|craft|master|workshop|build|repair/i,
    reading: '把“把东西做好”当作一生的尺度：师承、材料和成品会被认真对待。',
    goal: '做出一件自己愿意签名的成品。',
  },
  {
    archetype: 'survival',
    pattern: /活下来|活下去|活着|生存|不死|平安|健康|survive|live|safety|health/i,
    reading: '把“活下来”当作一生的尺度：疾病、战争和饥饿会先进入视线。',
    goal: '让下一年也还能自己走进厨房。',
  },
  {
    archetype: 'adventure',
    pattern: /远方|旅行|冒险|离开这里|出海|世界|adventure|travel|explore|journey|world/i,
    reading: '把“远方”当作一生的尺度：迁移、旅途和陌生地方会更有吸引力。',
    goal: '亲眼看见出生街区以外的一个地方。',
  },
  {
    archetype: 'beauty',
    pattern: /美|漂亮|英俊|魅力|艺术|beauty|beautiful|art|charm/i,
    reading: '把“美”当作一生的尺度：艺术、欲望和被观看会变得具体。',
    goal: '创造或成为一件被人认真注视的东西。',
  },
];

function intensityOf(wish: string): number {
  let value = 0.55;
  if (/最|世界|永远|绝不|一定|必须|全部|一切|absolute|most|world|never|must|everything/i.test(wish))
    value += 0.2;
  if (/也许|试试|一点|稍微|如果可以|maybe|perhaps|try|a little/i.test(wish)) value -= 0.2;
  return Math.max(0.2, Math.min(1, Number(value.toFixed(2))));
}

function ironyOf(wish: string): number {
  let value = 0.3;
  if (/讽刺|玩笑|荒诞|黑色幽默|戏|舞台|假装|irony|joke|absurd|stage|pretend/i.test(wish))
    value += 0.3;
  if (/认真|真心|只要|simply|genuinely/i.test(wish)) value -= 0.1;
  return Math.max(0.1, Math.min(0.9, Number(value.toFixed(2))));
}

/**
 * Deterministic wish compilation. It maps free text to one bounded archetype;
 * it does not promise the wish will happen. A later content factory may add
 * more archetypes, but the runtime still only sees a validated state id and
 * bounded parameters.
 */
export function compileWish(wish: string): WishCompilation {
  const text = wish.slice(0, 1000);
  const matched = RULES.filter((rule) => rule.pattern.test(text));
  const primary = matched[0];
  const intensity = intensityOf(text);
  const irony = ironyOf(text);
  if (!primary) {
    return {
      archetype: 'none',
      intensity,
      fixation: Math.min(1, intensity * 0.7),
      irony,
      interpretation: '没有匹配到已注册的愿望机制；愿望仍被保留为私人文本，不自动变成能力。',
      privateGoal: text.slice(0, 200) || '在没有保证的情况下继续生活。',
      matched: [],
      compiledBy: 'deterministic-wish-compiler',
    };
  }
  return {
    archetype: primary.archetype,
    intensity,
    fixation: Math.max(0.2, Math.min(1, Number((intensity * 0.8 + irony * 0.2).toFixed(2)))),
    irony,
    stateId: `wish-${primary.archetype}`,
    interpretation: `${primary.reading}强度 ${intensity.toFixed(2)}，反讽倾向 ${irony.toFixed(2)}；这只是机会与注意力，不是结果。`,
    privateGoal: primary.goal,
    matched: matched.map((rule) => rule.archetype),
    compiledBy: 'deterministic-wish-compiler',
  };
}

function slug(value: string): string {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 48) || 'x'
  );
}

/**
 * Attach the compiled wish state to a newborn and record a canonical
 * `wish_grant` fact. Idempotent: one active wish state per person.
 */
export function applyWishState(
  world: WorldState,
  childId: string,
  wish: string,
  definitions: StateDefinition[] = WISH_STATES,
): { event?: EventFact; compilation: WishCompilation; stateId?: string } {
  const compilation = compileWish(wish);
  const child = world.persons[childId];
  if (!child || !compilation.stateId) return { compilation };
  const definition = definitions.find((candidate) => candidate.id === compilation.stateId);
  if (!definition) return { compilation };
  world.states ??= {};
  const existing = Object.values(world.states).find(
    (state) =>
      state.active &&
      state.ownerType === 'person' &&
      state.ownerId === childId &&
      state.definitionId === definition.id,
  );
  if (existing) return { compilation, stateId: existing.id };
  const birth = [...world.events]
    .reverse()
    .find((event) => event.subjectId === childId && event.action === 'birth');
  const eventId = `evt:${world.id}:wish:${slug(childId)}`;
  if (world.events.some((event) => event.id === eventId)) {
    return { compilation };
  }
  const date = { ...world.date };
  const stateId = `state:${world.id}:wish:${slug(childId)}`;
  const event: EventFact = {
    id: eventId,
    date,
    placeId: child.locationId,
    subjectId: childId,
    participants: [{ personId: childId, role: 'subject' }],
    action: 'wish_grant',
    title: '出生愿望成形',
    tags: ['wish', `wish:${compilation.archetype}`, 'wish_grant', definition.id],
    causes: birth ? [birth.id] : [],
    effects: [
      {
        type: 'state_add',
        ownerType: 'person',
        ownerId: childId,
        stateId: definition.id,
        parameters: {
          intensity: compilation.intensity,
          fixation: compilation.fixation,
          irony: compilation.irony,
        },
        reason: `birth wish compiled as ${definition.id}`,
      },
    ],
    immediateText: `${child.name}的愿望被记成一条会持续影响选择的线：${compilation.interpretation}`,
    significance: 0.7,
    visibility: 'private',
    provenance: { kind: 'birth', sourceId: birth?.id },
  };
  world.states[stateId] = {
    id: stateId,
    definitionId: definition.id,
    version: definition.version,
    ownerType: 'person',
    ownerId: childId,
    since: { ...date },
    parameters: {
      intensity: compilation.intensity,
      fixation: compilation.fixation,
      irony: compilation.irony,
    },
    sourceEventId: eventId,
    active: true,
    tickCount: 0,
  };
  world.events.push(event);
  world.historyMeta.lastEventId = eventId;
  touchStateRevision(world);
  if (child.lifeContract) {
    child.lifeContract.privateGoal = child.lifeContract.privateGoal ?? compilation.privateGoal;
    child.lifeContract.interpretation =
      child.lifeContract.interpretation ??
      `${compilation.interpretation}（${compilation.privateGoal}）`;
    child.lifeContract.wishArchetype = compilation.archetype;
  }
  return { event, compilation, stateId };
}
