import type { StateDefinition } from '../../state/types.js';

/**
 * Wish archetypes. These are mechanisms, not prophecies: they change which
 * opportunities appear, what the person notices and how they react to a few
 * concrete event tags. Real outcomes still require real world facts (a position,
 * a relationship, a conviction, a published work).
 */
const AUTHORS = 'phase15-content-factory/state-architect';

function wishState(
  archetype: string,
  title: string,
  description: string,
  tags: string[],
  weightTags: string[],
  extra: Partial<StateDefinition> = {},
): StateDefinition {
  return {
    id: `wish-${archetype}`,
    version: 1,
    packId: 'phase15-wish-archetypes',
    title,
    description,
    owner: 'person',
    slot: 'wish',
    conflict: 'replace',
    tags: ['wish', `wish:${archetype}`, ...tags],
    parameters: {
      intensity: { type: 'number', default: 0.6, min: 0, max: 1 },
      fixation: { type: 'number', default: 0.4, min: 0, max: 1 },
      irony: { type: 'number', default: 0.35, min: 0, max: 1 },
    },
    modifiers: [
      {
        kind: 'scene_weight',
        tags: weightTags,
        multiplier: 1.45,
      },
    ],
    ticks: [
      {
        id: `${archetype}-pressure`,
        everyMonths: 48,
        conditions: [{ kind: 'age', min: 12 }],
        outcomes: [
          {
            id: 'press-on',
            weight: 3,
            text: '{subject}又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。',
            effects: [
              {
                type: 'mood',
                personId: '$subject',
                amount: 0.02,
                reason: 'wish pressure becomes a private resolve',
              },
              {
                type: 'flag',
                personId: '$subject',
                flag: `wish:${archetype}:pursuing`,
                add: true,
                reason: 'the wish is still being pursued',
              },
            ],
          },
          {
            id: 'put-away',
            weight: 2,
            text: '{subject}暂时把那件事收进抽屉；日子还有别的东西要应付。',
            effects: [
              {
                type: 'mood',
                personId: '$subject',
                amount: -0.02,
                reason: 'a wish postponed without being abandoned',
              },
            ],
          },
        ],
      },
    ],
    reactions: [
      {
        id: `${archetype}-humiliation`,
        onTags: ['humiliation', 'betrayal'],
        chance: 0.7,
        check: { attribute: 'willpower', dc: 12 },
        effects: [
          {
            type: 'mood',
            personId: '$subject',
            amount: -0.04,
            reason: 'the wish makes an old wound sting',
          },
          {
            type: 'flag',
            personId: '$subject',
            flag: `wish:${archetype}:wounded`,
            add: true,
            reason: 'humiliation is remembered through the wish',
          },
        ],
        failureEffects: [
          {
            type: 'mood',
            personId: '$subject',
            amount: -0.1,
            reason: 'the wish turns a setback into a fixation',
          },
        ],
        text: '{subject}把那句轻视记了很久。它没有变成一个决定，但也没有消失。',
        significance: 0.35,
        cooldownMonths: 24,
      },
    ],
    provenance: {
      kind: 'authored',
      author: AUTHORS,
      rationale: 'A wish state changes attention and opportunities; it never grants the wish.',
    },
    ...extra,
  };
}

export const WISH_STATES: StateDefinition[] = [
  wishState(
    'power',
    '对权力的执念',
    '这个人把“有权势”当作衡量自己和世界的尺子。机会、羞辱和职位都会被这尺子重新丈量。',
    ['power', 'status', 'ambition'],
    ['politics', 'power', 'status', 'history', 'organization', 'work', 'crime', 'court'],
    {
      reactions: [
        {
          id: 'power-office',
          onTags: ['office', 'power'],
          chance: 0.75,
          effects: [
            {
              type: 'reputation',
              personId: '$subject',
              amount: 0.06,
              reason: 'a real office feeds the wish for power',
            },
            {
              type: 'flag',
              personId: '$subject',
              flag: 'wish:power:has_tasted_office',
              add: true,
              reason: 'the wish now has a concrete comparison',
            },
          ],
          text: '{subject}坐在那张有权力的桌子后面，签下自己的名字。愿望没有因此变近，但桌上的纸张、印章和等待回话的人，都变得具体了。',
          significance: 0.75,
          cooldownMonths: 36,
        },
        {
          id: 'power-humiliation',
          onTags: ['humiliation', 'betrayal'],
          chance: 0.7,
          check: { attribute: 'willpower', dc: 13 },
          effects: [
            {
              type: 'mood',
              personId: '$subject',
              amount: -0.04,
              reason: 'the wish makes an old wound sting',
            },
            {
              type: 'flag',
              personId: '$subject',
              flag: 'wish:power:wounded',
              add: true,
              reason: 'humiliation is remembered through the wish',
            },
          ],
          failureEffects: [
            {
              type: 'mood',
              personId: '$subject',
              amount: -0.1,
              reason: 'the wish turns a setback into a fixation',
            },
            {
              type: 'flag',
              personId: '$subject',
              flag: 'wish:power:fixated_on_revenge',
              add: true,
              reason: 'a failed composure check hardens the wish',
            },
          ],
          text: '{subject}把那句轻视记了很久。它没有变成一个决定，但也没有消失。',
          significance: 0.4,
          cooldownMonths: 24,
        },
      ],
      ticks: [
        {
          id: 'power-opportunity',
          everyMonths: 60,
          conditions: [
            { kind: 'age', min: 20 },
            { kind: 'history', tag: 'office', maxCount: 0 },
          ],
          check: { attribute: 'willpower', dc: 13, stateBonus: { 'wish:power': 1 } },
          outcomes: [
            {
              id: 'real-office',
              result: 'success',
              weight: 2,
              text: '一次地方会议把{subject}推到台前。没有盛大的任命仪式，只有一间办公室、一枚印章和一份需要签字的预算。{subject}第一次真正拥有可以命令别人的位置。',
              effects: [
                {
                  type: 'organization_found',
                  organization: {
                    id: 'org:wish-faction:$eventId',
                    name: '权力俱乐部',
                    kind: 'party',
                    treasury: 1,
                    authorityRules: ['chair signs decisions', 'members vote on admissions'],
                  },
                  reason: 'a wish for power produced a real organization',
                },
                {
                  type: 'position',
                  organizationId: 'org:wish-faction:$eventId',
                  title: '主席',
                  holderId: '$subject',
                  wage: 0,
                  authority: ['预算', '签字', '人事'],
                  reason: 'a real office with budget and signature',
                },
                { type: 'reputation', personId: '$subject', amount: 0.1, reason: 'a real office' },
              ],
            },
            {
              id: 'puppet-office',
              result: 'success',
              weight: 1,
              text: '{subject}被推上一个有名无实的位置。办公室很大，秘书很客气，所有需要决定的事都被送到另一间屋里。{subject}每天签字，签的都是别人写好的东西。',
              effects: [
                {
                  type: 'organization_found',
                  organization: {
                    id: 'org:wish-puppet:$eventId',
                    name: '名誉委员会',
                    kind: 'party',
                    treasury: 0,
                    authorityRules: ['honorary chair has no budget authority'],
                  },
                  reason: 'a wish for power produced a puppet organization',
                },
                {
                  type: 'position',
                  organizationId: 'org:wish-puppet:$eventId',
                  title: '名誉主席',
                  holderId: '$subject',
                  wage: 0,
                  authority: [],
                  reason: 'a title without authority',
                },
                {
                  type: 'reputation',
                  personId: '$subject',
                  amount: 0.05,
                  reason: 'a public title',
                },
              ],
            },
            {
              id: 'stage-king',
              result: 'failure',
              weight: 1,
              text: '{subject}没有得到任命，但一家剧院正在找一张适合扮演国王的脸。{subject}穿上戏服，在舞台上签下了一份不是任命书的文件。',
              effects: [
                {
                  type: 'state_add',
                  ownerType: 'person',
                  ownerId: '$subject',
                  stateId: 'stage-king',
                  parameters: { role: '国王', audience: 300 },
                  durationMonths: 3,
                  reason: 'power found a stage instead of an office',
                },
                { type: 'reputation', personId: '$subject', amount: 0.03, reason: 'a stage role' },
              ],
            },
            {
              id: 'nothing',
              result: 'failure',
              weight: 2,
              text: '{subject}又等了一年。名单上没有名字，门也没有开。{subject}把那份写好的计划折起来，放回抽屉。',
              effects: [
                {
                  type: 'mood',
                  personId: '$subject',
                  amount: -0.04,
                  reason: 'the wish is refused again',
                },
              ],
            },
          ],
        },
      ],
    },
  ),
  wishState(
    'knowledge',
    '对理解的执念',
    '这个人想知道事情为什么是这样。书、老师、档案和一个没人肯回答的问题都会变得比别的东西亮。',
    ['knowledge', 'education', 'curiosity'],
    ['education', 'knowledge', 'science', 'school', 'book', 'research', 'faith'],
  ),
  wishState(
    'love',
    '对亲密关系的执念',
    '这个人渴望被选中、被留下。它会改变对亲密、拒绝和背叛的敏感度，但不能替任何人做出回答。',
    ['love', 'family', 'intimacy'],
    ['love', 'courtship', 'family', 'marriage', 'friendship', 'social', 'intimacy'],
    {
      reactions: [
        {
          id: 'love-betrayal',
          onTags: ['betrayal', 'separation'],
          chance: 0.8,
          check: { attribute: 'resilience', dc: 11 },
          effects: [
            {
              type: 'mood',
              personId: '$subject',
              amount: -0.06,
              reason: 'the wish makes a separation cut deeper',
            },
          ],
          failureEffects: [
            {
              type: 'mood',
              personId: '$subject',
              amount: -0.12,
              reason: 'a failed resilience check turns loss into a long grief',
            },
            {
              type: 'flag',
              personId: '$subject',
              flag: 'wish:love:afraid_of_being_left',
              add: true,
              reason: 'the wish has learned to expect abandonment',
            },
          ],
          text: '{subject}反复回想最后一次见面。对方说过的话被拆成很多小块，每一块都能扎人。',
          significance: 0.55,
          cooldownMonths: 18,
        },
      ],
    },
  ),
  wishState(
    'wealth',
    '对摆脱匮乏的执念',
    '这不是贪财，而是再也不想回到没钱的房间。工钱、债务和一次意外收入都会被放大。',
    ['wealth', 'money', 'security'],
    ['work', 'market', 'commerce', 'crime', 'finance', 'shop', 'debt'],
    {
      reactions: [
        {
          id: 'wealth-shortage',
          onTags: ['unemployment', 'debt', 'eviction'],
          chance: 0.8,
          effects: [
            {
              type: 'mood',
              personId: '$subject',
              amount: -0.07,
              reason: 'a shortage is felt through the wish to never be poor again',
            },
            {
              type: 'flag',
              personId: '$subject',
              flag: 'wish:wealth:emergency_mode',
              add: true,
              reason: 'the wish narrows attention to survival',
            },
          ],
          text: '{subject}把最后一个硬币数了两遍。贫穷不是一个抽象的词，它有一张具体的桌子和一盏不肯亮的灯。',
          significance: 0.5,
          cooldownMonths: 12,
        },
      ],
    },
  ),
  wishState(
    'revenge',
    '对报复的执念',
    '这个人不肯让某件事过去。它不是必然的暴力，而是一种持续的选择：记住、等待、拒绝和解。',
    ['revenge', 'grudge', 'violence'],
    ['crime', 'violence', 'law', 'betrayal', 'family', 'politics', 'military'],
    {
      reactions: [
        {
          id: 'revenge-trigger',
          onTags: ['betrayal', 'injury', 'humiliation'],
          chance: 0.85,
          check: { attribute: 'willpower', dc: 13 },
          effects: [
            {
              type: 'flag',
              personId: '$subject',
              flag: 'wish:revenge:prepared',
              add: true,
              reason: 'the old injury is still active',
            },
            {
              type: 'mood',
              personId: '$subject',
              amount: -0.05,
              reason: 'remembering is work',
            },
          ],
          failureEffects: [
            {
              type: 'flag',
              personId: '$subject',
              flag: 'wish:revenge:consumed',
              add: true,
              reason: 'the grudge has taken over',
            },
            {
              type: 'reputation',
              personId: '$subject',
              amount: -0.04,
              reason: 'people can see the fixation',
            },
          ],
          text: '{subject}没有当场做什么。回家以后，{subject}把对方的名字写在一张纸上，又折起来放进口袋。',
          significance: 0.6,
          cooldownMonths: 24,
        },
      ],
    },
  ),
  wishState(
    'freedom',
    '对自由的执念',
    '这个人不愿被安排。工作、婚姻、家庭义务和国家命令都会被拿来和“我能不能自己决定”比较。',
    ['freedom', 'autonomy'],
    ['work', 'law', 'migration', 'family', 'politics', 'travel', 'marriage'],
  ),
  wishState(
    'faith',
    '对意义的执念',
    '这个人需要在苦难里找到一个能站住的东西。宗教、意识形态、艺术或一种私人仪式都可能成为它。',
    ['faith', 'meaning'],
    ['faith', 'church', 'religion', 'culture', 'charity', 'suffering', 'death'],
  ),
  wishState(
    'fame',
    '对被人看见的执念',
    '这个人不想默默无闻。舞台、报纸、喝彩和羞耻都会比旁人更具体。',
    ['fame', 'status', 'performance'],
    ['culture', 'performance', 'theatre', 'art', 'media', 'reputation', 'social'],
  ),
  wishState(
    'craft',
    '对手艺的执念',
    '这个人相信把东西做好能换来一种安稳。工具、材料、师承和成品会被认真对待。',
    ['craft', 'work', 'mastery'],
    ['craft', 'work', 'apprentice', 'workshop', 'factory', 'trade', 'art'],
  ),
  wishState(
    'survival',
    '对活着的执念',
    '这个人只想活下来。危险、疾病和饥饿比任何抽象理想都更先进入视线。',
    ['survival', 'safety', 'health'],
    ['health', 'illness', 'war', 'migration', 'hunger', 'violence', 'shelter'],
  ),
  wishState(
    'adventure',
    '对远方的执念',
    '这个人不想在出生的街区里过完一生。远方既是机会，也是一次次把熟悉生活撕开的动作。',
    ['adventure', 'migration', 'curiosity'],
    ['migration', 'travel', 'adventure', 'ship', 'train', 'foreign', 'exploration'],
  ),
  wishState(
    'beauty',
    '对美的执念',
    '这个人把美当作一种真实的力量。它可能通向艺术，也可能通向被观看、被占有或自我消耗。',
    ['beauty', 'art', 'desire'],
    ['art', 'beauty', 'fashion', 'courtship', 'performance', 'culture', 'social'],
  ),
];

export const WISH_STATE_IDS = new Set(WISH_STATES.map((state) => state.id));
