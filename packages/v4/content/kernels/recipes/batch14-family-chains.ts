import type { RoleRequirement } from '../../../domain.js';
import type { PlotKernel } from '../../../composition/types.js';
import type { RoleDecl } from './kit.js';
import { recipes, taskMeta } from './kit.js';

/**
 * Phase 14 · family long-life chains.
 *
 * Seeds, consequences and echoes of love, marriage, children, care and death.
 * Every mechanism is an ordinary kernel: history conditions read committed
 * EventFacts, returning people are selected by sharedHistoryTag, and follow-ups
 * are resolved by the existing composer. No relationship state lives here that
 * the simulator does not record.
 */

const URBAN = ['vienna', 'urban', 'war', 'postwar', 'reform', 'crisis', 'scarcity'];
const HOME = ['home', 'family', 'neighbor', 'poverty', 'everyday'];
const SOCIAL = [...HOME, 'cafe', 'market', 'shop', 'merchant', 'customer'];
const MEDICAL = [...HOME, 'health', 'medicine', 'hospital', 'doctor', 'care'];
const OFFICE = [...HOME, 'official', 'bureaucracy', 'state', 'papers', 'public_service'];
const COUNTER = [...HOME, 'work', 'shop', 'market', 'merchant', 'customer'];

type RoleOptions = Exclude<RoleDecl, RoleRequirement['kind']>[1];

/**
 * The compact kit predates RoleRequirement.sharedHistoryTag, but the runtime
 * already resolves it. Keep the declaration typed and preserve the field.
 */
function returning(
  kind: RoleRequirement['kind'],
  options: RoleOptions & { sharedHistoryTag?: string },
): RoleDecl {
  return [kind, options] as RoleDecl;
}

export const BATCH14_FAMILY_CHAINS: PlotKernel[] = recipes([
  // 1 · courtship ---------------------------------------------------------
  {
    id: 'r14-fam.canal-bench',
    title: '运河长椅上的两张戏票',
    domain: 'family',
    stage: 'adulthood',
    ages: [17, 32],
    baseRate: 0.035,
    tags: ['family', 'courtship', 'secret_courtship', 'class_difference', 'reputation'],
    contexts: URBAN,
    milieus: SOCIAL,
    conditions: [
      { kind: 'notHasRelation', relationKind: 'partner' },
      { kind: 'health', min: 0.2 },
    ],
    roles: {
      beloved: ['partner', { minAge: 17, maxAge: 34, sex: 'opposite' }],
    },
    outcomes: [
      {
        id: 'meet-after-dark',
        w: 0.45,
        text: '散场后{subject}没有跟着人流走，绕到运河边的长椅，把两张站票压在报纸下面。{beloved}来时围巾上还带着剧院走廊的烟味，说家里只许跟门当户对的人来往。两人坐到末班电车过去，才把下次见面的日子定在星期四。',
        significance: 0.72,
        trace: {
          motive: '想再见一面，而不只是在散场人群里点头',
          conflict: '对方家庭讲究门第，见面只能避开熟人',
          response: '把下一次约会藏在报纸下面',
        },
        fx: {
          cash: -2,
          relation: ['beloved', 'acquaintance', 0.08, 0.18],
          flag: 'secret_courtship',
          knowledge: ['the beloved’s family forbids a match across class lines', 0.8, 'beloved'],
        },
        followup: { sceneId: 'r14-fam.cold-soup', delayMonths: 18 },
      },
      {
        id: 'someone-sees',
        w: 0.3,
        text: '有人在桥头等着，手里转着一把折刀，说已经跟了两个星期四。{beloved}往后退了半步，{subject}挡在前面，听见自己的声音在石栏上发空。第二天，家里的晚饭留在锅里，没有叫人上楼；楼道的灯亮了一夜。',
        significance: 0.66,
        fx: {
          reputation: -0.04,
          mood: -0.12,
          condition: 'courtship_watched',
          flag: 'caught_secret_courtship',
        },
      },
      {
        id: 'end-it-here',
        w: 0.25,
        text: '{subject}把没送出去的手套放回{beloved}的窗台，隔着玻璃说以后不来了。{beloved}没有开门，只把窗内的灯拧小。回家路上{subject}数着石板，发现那条路比来时短了一半。',
        significance: 0.58,
        fx: {
          relation: ['beloved', 'acquaintance', -0.06, 0.02],
          mood: -0.14,
          flag: 'ended_secret_courtship',
        },
      },
    ],
  },

  // 2 · proposal, parental objection -------------------------------------
  {
    id: 'r14-fam.cold-soup',
    title: '提亲那天的冷汤',
    domain: 'family',
    stage: 'adulthood',
    ages: [18, 36],
    baseRate: 0.03,
    tags: ['family', 'marriage', 'proposal', 'class_difference', 'refusal'],
    contexts: URBAN,
    milieus: SOCIAL,
    conditions: [
      { kind: 'history', tag: 'secret_courtship', minCount: 1, minYearsAgo: 1 },
      { kind: 'hasFlag', flag: 'secret_courtship' },
    ],
    roles: {
      beloved: returning('partner', {
        minAge: 18,
        maxAge: 38,
        sex: 'opposite',
        sharedHistoryTag: 'secret_courtship',
      }),
      mother: ['parent', { minAge: 40, maxAge: 74, sex: 'female' }],
    },
    outcomes: [
      {
        id: 'refused-at-the-table',
        w: 0.4,
        text: '{subject}把提亲的糖果放在桌上，{mother}没有拆纸包，只问{beloved}家一个月能剩下几克朗。汤在炉子上凉透了，{beloved}站起来告辞，椅子腿在砖地上刮出长声。{subject}追到楼下，看见对方把手套戴反了。',
        significance: 0.82,
        fx: {
          cash: -3,
          mood: -0.2,
          relation: [
            ['mother', 'rival', -0.18, 0],
            ['beloved', 'acquaintance', -0.1, 0.04],
          ],
          relation_end: ['beloved', 'acquaintance'],
          flag: 'proposal_refused_by_mother',
        },
      },
      {
        id: 'leave-through-the-yard',
        w: 0.35,
        text: '{mother}把糖果推回来，说这门亲事进了门就要悔。{subject}没有争，回屋收了一只箱子，从后院的门出去。两人在市政厅登记，戒指是铜的；{beloved}的母亲没有来，证婚人是登记处的一名书记员。',
        significance: 0.86,
        fx: [
          {
            cash: -8,
            relation: [
              ['beloved', 'partner', 0.16, 0.16],
              ['mother', 'kin', -0.24, 0],
            ],
            role: 'married',
            flag: 'married_against_mothers_wish',
          },
          {
            raw: [
              {
                type: 'household',
                personId: '$beloved',
                householdId: '$household',
                reason: 'married without the family’s consent',
              },
            ],
          },
        ],
      },
      {
        id: 'wait-one-year',
        w: 0.25,
        text: '{mother}没有说不行，只说等{beloved}出师再谈。{subject}把糖果收回柜子，{beloved}在门口站了一会儿，说一年不算长。那天夜里，{subject}把两个人的工钱算在纸上，算到最后，纸角被手指磨薄了。',
        significance: 0.64,
        fx: {
          relation: [
            ['mother', 'kin', 0.04, 0],
            ['beloved', 'acquaintance', 0.04, 0.08],
          ],
          condition: 'engagement_delayed',
          flag: 'proposal_delayed_one_year',
        },
      },
    ],
  },

  // 3 · former lover returns ---------------------------------------------
  {
    id: 'r14-fam.twenty-years-later',
    title: '站台上的旧围巾',
    domain: 'family',
    stage: 'adulthood',
    ages: [32, 68],
    baseRate: 0.015,
    tags: ['family', 'courtship', 'return', 'former_lover', 'memory'],
    contexts: URBAN,
    milieus: SOCIAL,
    conditions: [
      { kind: 'history', tag: 'secret_courtship', minCount: 1, minYearsAgo: 8 },
      { kind: 'hasRelation', relationKind: 'partner' },
    ],
    roles: {
      beloved: returning('partner', {
        minAge: 32,
        maxAge: 70,
        sex: 'opposite',
        sharedHistoryTag: 'secret_courtship',
      }),
    },
    outcomes: [
      {
        id: 'coffee-at-the-buffet',
        w: 0.4,
        text: '{subject}在车站自助餐台看见{beloved}，对方正把方糖掰成两半，动作和从前一样。两人隔着一张湿桌子说起这十几年各自的住处、孩子和腰上的毛病。汽笛响时，{beloved}把写着地址的纸推过来，{subject}没有推回去。',
        significance: 0.72,
        fx: {
          cash: -2,
          relation: ['beloved', 'friend', 0.12, 0.14],
          flag: 'old_love_returns',
          knowledge: ['the former lover lives two districts away', 0.85, 'beloved'],
        },
      },
      {
        id: 'close-the-door',
        w: 0.35,
        text: '{subject}把那张写着地址的纸折好，说家里还有人等着开饭。{beloved}点头，把没喝完的咖啡推到桌子中间，像推回一件借来的东西。{subject}走出车站才想起，自己一直没有问对方这些年住在哪里。',
        significance: 0.66,
        fx: {
          mood: -0.08,
          relation: ['beloved', 'acquaintance', -0.02, 0.06],
          flag: 'closed_old_chapter',
        },
      },
      {
        id: 'sundays-at-the-cafe',
        w: 0.25,
        text: '{subject}没有把地址带回家，而是每个星期天去车站咖啡馆坐一个钟头。{beloved}有时来，有时不来；两人从不说以后，只把各自的近况说一遍。第三个星期天，{subject}发现自己出门前会换一件干净的领子。',
        significance: 0.78,
        fx: {
          cash: -3,
          relation: ['beloved', 'friend', 0.1, 0.2],
          condition: 'old_attachment_rekindled',
          flag: 'secret_sunday_meetings',
        },
      },
    ],
  },

  // 4 · marriage and in-law conflict -------------------------------------
  {
    id: 'r14-fam.kitchen-lock',
    title: '厨房门上的新锁',
    domain: 'family',
    stage: 'adulthood',
    ages: [20, 50],
    baseRate: 0.03,
    tags: ['family', 'marriage', 'in_law_conflict', 'household', 'authority'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [
      { kind: 'hasRelation', relationKind: 'partner', sameHousehold: true },
      { kind: 'householdSize', min: 2 },
    ],
    roles: {
      partner: ['partner', { minAge: 20, maxAge: 52 }],
      motherInLaw: ['neighbor', { minAge: 45, maxAge: 78, sex: 'female' }],
    },
    outcomes: [
      {
        id: 'key-kept',
        w: 0.4,
        text: '{subject}下工回来，发现厨房门上多了一把锁，钥匙挂在{motherInLaw}的围裙带子上。灶上的锅换了位置，盐罐里掺了粗盐。{partner}坐在桌边削土豆，说母亲只是怕东西丢；{subject}把买回来的肉放进柜子，听见锁舌在身后合上。',
        significance: 0.76,
        fx: {
          relation: [
            ['motherInLaw', 'rival', -0.18, 0],
            ['partner', 'partner', -0.06, 0],
          ],
          condition: 'household_tension',
          flag: 'in_law_holds_kitchen_key',
        },
        followup: { sceneId: 'r14-fam.mother-in-law-suitcase', delayMonths: 60 },
      },
      {
        id: 'boundary-drawn',
        w: 0.35,
        text: '{subject}把锁卸下来，放在{motherInLaw}的针线篮里，说这间厨房是自己和{partner}在付煤钱。{partner}没有帮腔，只把削好的土豆推过来。{motherInLaw}当天收拾了一只箱子去住女儿家，临走把围裙留在椅背上。',
        significance: 0.72,
        fx: {
          relation: [
            ['motherInLaw', 'rival', -0.12, 0],
            ['partner', 'partner', 0.06, 0],
          ],
          flag: 'in_law_boundary_drawn',
          mood: -0.04,
        },
      },
      {
        id: 'kitchen-surrendered',
        w: 0.25,
        text: '{subject}没有提锁的事，只把肉票交出去，说以后菜由{motherInLaw}买。晚饭的汤咸得发苦，{partner}喝了两碗，什么也没说。夜里{subject}在走廊上洗自己的盘子，听见厨房里有人在数剩下的煤球。',
        significance: 0.68,
        fx: {
          mood: -0.12,
          relation: ['motherInLaw', 'acquaintance', -0.06, 0],
          condition: 'lost_kitchen_authority',
          flag: 'mother_in_law_runs_kitchen',
        },
      },
    ],
  },

  // 5 · in-law returns, needs care ---------------------------------------
  {
    id: 'r14-fam.mother-in-law-suitcase',
    title: '长辈的箱子搬回三楼',
    domain: 'family',
    stage: 'adulthood',
    ages: [28, 58],
    baseRate: 0.02,
    tags: ['family', 'care', 'housing', 'obligation'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [
      { kind: 'history', tag: 'in_law_conflict', minCount: 1, minYearsAgo: 3 },
      { kind: 'householdSize', max: 10 },
    ],
    roles: {
      motherInLaw: returning('neighbor', {
        minAge: 55,
        maxAge: 86,
        sex: 'female',
        sharedHistoryTag: 'in_law_conflict',
      }),
      partner: ['partner', { minAge: 28, maxAge: 60 }],
      neighbor: ['neighbor', { minAge: 25, maxAge: 75 }],
    },
    outcomes: [
      {
        id: 'take-her-in',
        w: 0.4,
        text: '{motherInLaw}提着箱子站在楼梯口，说房东把房子卖了，女儿家也挤不下。{subject}把贮藏室里的土豆筐搬出来，铺上一床旧褥子。{partner}在门后站了很久，最后进去把窗户上的报纸撕了，换上一块洗得发白的布帘。',
        significance: 0.8,
        fx: [
          {
            cash: -6,
            relation: [
              ['motherInLaw', 'kin', 0.06, 0.02],
              ['partner', 'partner', 0.08, 0.04],
            ],
            condition: 'caring_for_in_law',
            flag: 'in_law_moved_in',
          },
          {
            raw: [
              {
                type: 'household',
                personId: '$motherInLaw',
                householdId: '$household',
                reason: 'took in the widowed mother-in-law',
              },
            ],
          },
        ],
      },
      {
        id: 'pay-for-a-room',
        w: 0.35,
        text: '{subject}没有让箱子进门，只把八克朗塞进{motherInLaw}的手套里，说街角有一间带灶的屋子。{motherInLaw}数了数钱，问这算不算把老人打发了。{partner}把箱子提下楼，回来时手一直插在口袋里，没有看{subject}。',
        significance: 0.74,
        fx: {
          cash: -8,
          relation: [
            ['motherInLaw', 'rival', -0.12, 0],
            ['partner', 'partner', -0.1, 0],
          ],
          flag: 'paid_for_in_law_lodging',
          mood: -0.06,
        },
      },
      {
        id: 'neighbour-takes-her',
        w: 0.25,
        text: '{neighbor}听见楼梯上的动静，开门说自家有一张空床，先住几天再说。{motherInLaw}把箱子推进那扇门，回头看了{subject}一眼。{subject}把两克朗和一块肥皂放在门垫下面，没有敲门，只听见屋里的椅子响了一声。',
        significance: 0.7,
        fx: {
          cash: -2,
          relation: [
            ['neighbor', 'friend', 0.14, 0.06],
            ['motherInLaw', 'acquaintance', 0.02, 0],
          ],
          flag: 'in_law_lodges_next_door',
          knowledge: ['the neighbour keeps a spare bed for the mother-in-law', 0.75, 'neighbor'],
        },
      },
    ],
  },

  // 6 · marriage accumulates resentment ----------------------------------
  {
    id: 'r14-fam.chair-between-beds',
    title: '两床之间的一把椅子',
    domain: 'family',
    stage: 'adulthood',
    ages: [22, 60],
    baseRate: 0.03,
    tags: ['family', 'marriage', 'marriage_resentment', 'silence', 'household'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [
      { kind: 'history', tag: 'partnership', minCount: 1 },
      { kind: 'hasRelation', relationKind: 'partner', sameHousehold: true },
    ],
    roles: {
      partner: ['partner', { minAge: 22, maxAge: 62 }],
    },
    outcomes: [
      {
        id: 'chair-in-the-middle',
        w: 0.4,
        text: '{subject}把一把椅子放在两张床中间，上面搭着自己的外套。{partner}半夜回来，看见椅子没有挪，就在床沿坐下脱鞋。两人都醒着，谁也没有翻身；楼下的钟敲过两点，椅子上的外套滑到地上，没有人捡。',
        significance: 0.72,
        fx: {
          relation: ['partner', 'partner', -0.06, -0.08],
          condition: 'marriage_coldness',
          flag: 'separate_beds',
          mood: -0.06,
        },
      },
      {
        id: 'count-the-coins',
        w: 0.35,
        text: '月底，{subject}把煤钱和面包钱分成两叠，{partner}说每次都要算到铜板，日子过得像合租。{subject}把账本推过去，让对方自己算；{partner}没有接，起身把炉门关上。第二天早上，桌上多了一枚没人认领的硬币。',
        significance: 0.66,
        fx: {
          cash: -1,
          relation: ['partner', 'partner', -0.12, -0.04],
          condition: 'money_quarrel',
          flag: 'split_household_money',
          mood: -0.08,
        },
      },
      {
        id: 'mend-the-coat',
        w: 0.25,
        text: '{subject}把{partner}磨破的袖口翻过来缝好，针脚歪歪扭扭。{partner}第二天穿着去上工，晚上回来把一包热栗子放在桌上，说是路上看见的。两人没有提椅子，也没有提那些没说出口的话。',
        significance: 0.6,
        fx: {
          cash: -1,
          relation: ['partner', 'partner', 0.05, 0.06],
          mood: 0.04,
          flag: 'small_marriage_repair',
        },
      },
    ],
  },

  // 7 · affair discovered ------------------------------------------------
  {
    id: 'r14-fam.coat-check',
    title: '衣帽间的号牌',
    domain: 'family',
    stage: 'adulthood',
    ages: [25, 58],
    baseRate: 0.03,
    tags: ['family', 'marriage', 'forbidden_affair', 'betrayal', 'discovery'],
    contexts: URBAN,
    milieus: SOCIAL,
    conditions: [
      { kind: 'history', tag: 'forbidden_affair', minCount: 1, withinYears: 3 },
      { kind: 'hasFlag', flag: 'affair_started' },
      { kind: 'hasRelation', relationKind: 'partner' },
    ],
    roles: {
      partner: ['partner', { minAge: 25, maxAge: 60 }],
      lover: returning('neighbor', {
        minAge: 22,
        maxAge: 58,
        sharedHistoryTag: 'forbidden_affair',
      }),
    },
    outcomes: [
      {
        id: 'ticket-in-the-pocket',
        w: 0.4,
        text: '{partner}洗外套时从口袋里摸出两张衣帽间的号牌，号码不是同一晚的。{subject}回家时，桌上摆着那两张硬纸片，{lover}的围巾搭在椅背上。{partner}没有提高声音，只问要不要把箱子先收好；{subject}看见窗外的雪落在消防梯上，一直没有化。',
        significance: 0.86,
        fx: {
          cash: -3,
          reputation: -0.1,
          mood: -0.18,
          relation: [
            ['partner', 'partner', -0.3, -0.2],
            ['lover', 'acquaintance', -0.12, 0],
          ],
          flag: 'affair_discovered',
        },
        followup: { sceneId: 'r14-fam.court-corridor', delayMonths: 3 },
      },
      {
        id: 'terms-on-paper',
        w: 0.35,
        text: '{partner}没有闹，只列了一张纸：工钱交到柜上，晚上九点前回家，{lover}的名字不再出现。{subject}签了字，笔尖在纸上停了一下。{lover}第二天搬走了，留下一只打火机；{subject}把它放进抽屉最里面，和冬天的药瓶放在一起。',
        significance: 0.76,
        fx: {
          relation: [
            ['partner', 'partner', -0.1, -0.02],
            ['lover', 'acquaintance', -0.08, 0],
          ],
          relation_end: ['lover', 'acquaintance'],
          condition: 'marriage_on_terms',
          flag: 'affair_forgiven_with_terms',
          mood: -0.08,
        },
      },
      {
        id: 'lover-leaves-first',
        w: 0.25,
        text: '{lover}在院门口等到天黑，说再这样下去，三个人都要在这条街上抬不起头。{subject}问要不要一起走，{lover}把手里的小包换到另一只手上，说车票只买了一张。{subject}回到屋里，{partner}正在补袜子，谁也没有提门口站过谁。',
        significance: 0.72,
        fx: {
          mood: -0.12,
          relation: [
            ['lover', 'acquaintance', -0.06, 0.04],
            ['partner', 'partner', 0.02, 0],
          ],
          relation_end: ['lover', 'acquaintance'],
          flag: 'lover_left_town',
        },
      },
    ],
  },

  // 8 · separation and divorce -------------------------------------------
  {
    id: 'r14-fam.court-corridor',
    title: '法院走廊里的长凳',
    domain: 'family',
    stage: 'adulthood',
    ages: [25, 62],
    tags: ['family', 'marriage', 'divorce', 'institution'],
    contexts: URBAN,
    milieus: OFFICE,
    conditions: [{ kind: 'hasRelation', relationKind: 'partner' }],
    baseRate: 0.015,
    roles: {
      partner: ['partner', { minAge: 25, maxAge: 64 }],
    },
    outcomes: [
      {
        id: 'separation-granted',
        w: 0.4,
        when: { history: { tag: 'forbidden_affair', minCount: 1 } },
        text: '窗口里的办事员把两张表格推到长凳上，说财产各归各的，孩子的事另写一张。{subject}在签名处停了一会儿，{partner}已经先签了，笔迹比平时用力。走廊尽头的窗子开着，风把复写纸吹得翻了一页；两人一前一后下楼，没有走同一段楼梯。',
        significance: 0.84,
        fx: {
          cash: -6,
          relation: ['partner', 'partner', -0.2, -0.1],
          relation_end: ['partner', 'partner'],
          flag: 'divorced',
          role: 'divorced',
        },
        followup: { sceneId: 'r14-fam.sunday-suitcase', delayMonths: 2 },
      },
      {
        id: 'protection-written',
        w: 0.35,
        when: { history: { tag: 'domestic_violence_escape', minCount: 1 } },
        text: '法院的人没有问家里的细节，只把一张禁止靠近的纸推过来，说再有事就拿着它去分局。{subject}把纸折成四折，放进内袋，手指还能感觉到纸边的硬。{partner}在走廊另一头站着，没有过来；法警把门打开，让两个人从不同的出口出去。',
        significance: 0.86,
        fx: {
          cash: -2,
          relation: ['partner', 'partner', -0.3, -0.16],
          relation_end: ['partner', 'partner'],
          condition: 'fear_after_violence',
          flag: 'protection_order',
          role: 'divorced',
        },
        followup: { sceneId: 'r14-fam.sunday-suitcase', delayMonths: 3 },
      },
      {
        id: 'reconcile-on-the-stairs',
        w: 0.25,
        text: '{subject}和{partner}在楼梯口坐了一刻钟，谁也没有先去推那扇门。{partner}说家里的床还没拆，{subject}说孩子下星期要交学费。两人最后一起回了家，协议留在长凳上，被清洁工扫进了纸篓。',
        significance: 0.64,
        fx: {
          mood: -0.04,
          relation: ['partner', 'partner', -0.04, 0.02],
          flag: 'reconciliation_attempt',
        },
      },
    ],
  },

  // 9 · co-parenting after divorce ---------------------------------------
  {
    id: 'r14-fam.sunday-suitcase',
    title: '星期日下午的皮箱',
    domain: 'family',
    stage: 'adulthood',
    ages: [26, 58],
    baseRate: 0.03,
    tags: ['family', 'divorce', 'children', 'co_parenting', 'custody'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [{ kind: 'history', tag: 'separation', minCount: 1, withinYears: 5 }],
    roles: {
      formerPartner: returning('partner', {
        minAge: 26,
        maxAge: 60,
        sharedHistoryTag: 'separation',
      }),
      child: ['neighbor', { minAge: 3, maxAge: 16 }],
    },
    outcomes: [
      {
        id: 'handover-on-time',
        w: 0.4,
        text: '{child}把小皮箱放在门口，坐在台阶上等。{formerPartner}准时从街角过来，手里提着一袋苹果，说下个星期天再送回来。{subject}把孩子的围巾系好，退后一步；皮箱轮子在石板上响了一阵，拐过街角就听不见了。',
        significance: 0.7,
        fx: {
          relation: [
            ['formerPartner', 'acquaintance', 0.08, 0],
            ['child', 'kin', 0.06, 0.04],
          ],
          flag: 'co_parenting_works',
          mood: 0.06,
        },
      },
      {
        id: 'late-again',
        w: 0.35,
        text: '{formerPartner}迟了一个钟头，身上带着酒气，说厂里加班。{child}已经把皮箱提回屋里两次，最后一次坐在箱子上不肯起来。{subject}让{formerPartner}下星期再来，关上门后听见楼道里有人踢了一脚墙，灰落下来，落在孩子的帽子上。',
        significance: 0.74,
        fx: {
          relation: [
            ['formerPartner', 'rival', -0.12, 0],
            ['child', 'kin', 0.04, -0.02],
          ],
          condition: 'custody_friction',
          flag: 'late_handover',
          mood: -0.1,
        },
      },
      {
        id: 'child-refuses',
        w: 0.25,
        text: '{child}抓着门框，说今天不想去。{formerPartner}蹲下来哄了很久，最后把苹果放在门槛上，一个人走了。{subject}把苹果洗干净，切成四块；{child}只吃了一块，剩下的放在窗台上，看着它们慢慢变黄。',
        significance: 0.72,
        fx: {
          relation: [
            ['formerPartner', 'acquaintance', -0.04, 0],
            ['child', 'kin', 0.1, 0.08],
          ],
          condition: 'child_resists_visits',
          flag: 'child_refused_handover',
        },
      },
    ],
  },

  // 10 · sick child and medical bills ------------------------------------
  {
    id: 'r14-fam.pharmacy-bill',
    title: '药房账单的第三页',
    domain: 'family',
    stage: 'adulthood',
    ages: [22, 50],
    baseRate: 0.03,
    tags: ['family', 'children', 'child_illness', 'medical_debt', 'fear'],
    contexts: URBAN,
    milieus: MEDICAL,
    conditions: [{ kind: 'householdSize', min: 2 }],
    roles: {
      child: ['neighbor', { minAge: 1, maxAge: 12, sameHousehold: true }],
      doctor: ['worker', { minAge: 28, maxAge: 74 }],
    },
    outcomes: [
      {
        id: 'rent-money-to-pharmacy',
        w: 0.4,
        text: '{child}烧了三天，{doctor}把药方写在两张纸上，说一种药房没有，要去城另一头配。{subject}把下个月的房租数出来，先买了药，又买了两块冰。夜里孩子退了烧，{subject}坐在床边数剩下的硬币，发现连煤钱也不够了。',
        significance: 0.82,
        fx: {
          cash: -18,
          health: -0.02,
          relation: ['child', 'kin', 0.1, 0.08],
          condition: 'medical_debt',
          flag: 'paid_medicine_before_rent',
          knowledge: ['the second medicine is only sold across the river', 0.8, 'doctor'],
        },
        followup: { sceneId: 'r14-fam.small-coffin', delayMonths: 18 },
      },
      {
        id: 'charity-clinic',
        w: 0.35,
        text: '{doctor}看见{subject}把药方翻来覆去地看，便在背面写了一个地址，说那里的修女会按成本收药钱。{subject}抱着{child}走了四十分钟，队伍排到门外；最后付了三克朗，药瓶上贴着修女手写的剂量。',
        significance: 0.72,
        fx: {
          cash: -3,
          relation: [
            ['child', 'kin', 0.08, 0.06],
            ['doctor', 'colleague', 0.1, 0],
          ],
          flag: 'charity_treatment',
          knowledge: ['the convent clinic sells medicine at cost', 0.85, 'doctor'],
        },
      },
      {
        id: 'borrow-from-neighbour',
        w: 0.25,
        text: '{subject}敲开隔壁的门，说孩子病着，想借八克朗。邻居没有问什么时候还，只从糖罐后面摸出几张票子，又塞了一小包粗糖。{subject}把钱数了两遍，写了一张欠条，邻居看了一眼，折起来压在钟底下。',
        significance: 0.76,
        fx: {
          cash: -8,
          relation: [
            ['child', 'kin', 0.08, 0.04],
            ['doctor', 'colleague', 0.04, 0],
          ],
          condition: 'owes_neighbour_money',
          flag: 'borrowed_for_medicine',
        },
      },
    ],
  },

  // 11 · child death and grief -------------------------------------------
  {
    id: 'r14-fam.small-coffin',
    title: '小棺材量尺',
    domain: 'family',
    stage: 'adulthood',
    ages: [24, 56],
    baseRate: 0.008,
    tags: ['family', 'children', 'child_death', 'grief', 'loss'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [
      { kind: 'history', tag: 'child_illness', minCount: 1, withinYears: 2 },
      { kind: 'householdSize', min: 2 },
    ],
    roles: {
      child: ['neighbor', { minAge: 0, maxAge: 10, sameHousehold: true }],
      partner: ['partner', { minAge: 22, maxAge: 58 }],
      priest: ['official', { minAge: 30, maxAge: 76 }],
    },
    outcomes: [
      {
        id: 'buried-in-the-rain',
        w: 0.45,
        text: '{priest}在厨房桌上给{child}量了身长，说棺材不用定太大。{subject}去铺子里付了九克朗，回来时{partner}已经把孩子的小鞋收进纸盒。下葬那天下着湿雪，{subject}念到一半才发现自己还系着上工的围裙，带子上沾着面粉。',
        significance: 0.9,
        fx: [
          {
            cash: -9,
            health: -0.12,
            mood: -0.3,
            condition: 'grief',
            flag: 'lost_child',
            relation: ['partner', 'partner', 0.04, -0.04],
          },
          {
            raw: [
              {
                type: 'death',
                personId: '$child',
                cause: 'diphtheria',
                reason: 'child died of diphtheria',
              },
            ],
          },
        ],
      },
      {
        id: 'recovery-with-a-weak-chest',
        w: 0.3,
        text: '{child}在第十天退了烧，来诊的医生说肺上留了杂音，冬天要少出门。{subject}把药瓶排成一排，{partner}在窗缝上糊了纸条。孩子能坐起来那天，{subject}去当铺赎回了结婚时的银表，表壳上多了一道划痕。',
        significance: 0.8,
        fx: [
          {
            cash: -6,
            health: -0.06,
            relation: ['child', 'kin', 0.1, 0.08],
            flag: 'child_recovered_weak',
          },
          {
            raw: [
              {
                type: 'condition',
                personId: '$child',
                condition: 'weak_chest',
                add: true,
                reason: 'recovered from diphtheria',
              },
            ],
          },
        ],
      },
      {
        id: 'grief-splits-the-marriage',
        w: 0.25,
        text: '孩子活下来了，可{partner}整夜坐在床边，说那天是{subject}去晚了药房。两人从药钱吵到谁家的人来帮忙，最后把床分成了两张。孩子出院时，{subject}抱着{child}走在前头，{partner}提着空药瓶跟在后面；入秋后，两人去法院递了分居书，隔了三步走完那条街。',
        significance: 0.86,
        fx: {
          cash: -4,
          mood: -0.24,
          condition: 'grief',
          relation_end: ['partner', 'partner'],
          flag: 'grief_split_marriage',
        },
      },
    ],
  },

  // 12 · inheritance conflict --------------------------------------------
  {
    id: 'r14-fam.notary-watch',
    title: '公证人桌上的怀表',
    domain: 'family',
    stage: 'adulthood',
    ages: [26, 70],
    baseRate: 0.02,
    tags: ['family', 'inheritance', 'siblings', 'conflict', 'property'],
    contexts: URBAN,
    milieus: OFFICE,
    conditions: [{ kind: 'history', tag: 'parent_death', minCount: 1, withinYears: 2 }],
    roles: {
      sibling: returning('sibling', {
        minAge: 22,
        maxAge: 72,
        sharedHistoryTag: 'parent_death',
      }),
      notary: ['official', { minAge: 32, maxAge: 76 }],
    },
    outcomes: [
      {
        id: 'house-sold-and-split',
        w: 0.4,
        text: '{notary}把房契和一只怀表摆在桌上，说房子只能整卖，钱按三份分。{sibling}当场把怀表拨快了两分钟，说这样算时间才公道。{subject}在收据上签了字，出门时看见老屋的钥匙还挂在公证人的钉子上，谁也没有伸手。',
        significance: 0.8,
        fx: {
          cash: 12,
          relation: ['sibling', 'colleague', 0.04, 0],
          flag: 'sold_family_house',
          knowledge: ['the family house was sold whole, not divided', 0.9, 'notary'],
        },
      },
      {
        id: 'sibling-takes-the-watch',
        w: 0.35,
        text: '{sibling}把怀表揣进内袋，说照顾老人的人该多得一件。{subject}问那本存折怎么算，{sibling}把账本翻到最后一页，上面只有老人画的一个圈。{notary}咳了一声，说没有遗嘱就按法律分；{sibling}站起来，椅子在砖地上留下四道白印。',
        significance: 0.78,
        fx: {
          cash: 3,
          relation: ['sibling', 'rival', -0.2, 0],
          flag: 'cheated_inheritance',
          condition: 'inheritance_dispute',
          knowledge: ['the mother left no written will', 0.9, 'notary'],
        },
      },
      {
        id: 'appraisal-and-court',
        w: 0.25,
        text: '{subject}不同意估价，要求把缝纫机和那套餐具也算进去。{notary}把计算尺推来推去，最后说得另请评估人，费用先由两方垫付。{sibling}把四克朗拍在桌上，硬币滚到桌边；{subject}数出同样的数目，手指压着桌沿，没有让硬币再动。',
        significance: 0.76,
        fx: {
          cash: -4,
          relation: ['sibling', 'rival', -0.12, 0],
          condition: 'inheritance_dispute',
          flag: 'inheritance_in_court',
        },
      },
    ],
  },

  // 13 · family secret revealed ------------------------------------------
  {
    id: 'r14-fam.baptism-register',
    title: '洗礼簿里的一行字',
    domain: 'family',
    stage: 'adulthood',
    ages: [26, 68],
    baseRate: 0.015,
    tags: ['family', 'parent_death', 'family_secret', 'knowledge', 'siblings'],
    contexts: URBAN,
    milieus: OFFICE,
    conditions: [{ kind: 'history', tag: 'parent_death', minCount: 1, withinYears: 4 }],
    roles: {
      sibling: returning('sibling', {
        minAge: 22,
        maxAge: 70,
        sharedHistoryTag: 'parent_death',
      }),
      priest: ['official', { minAge: 30, maxAge: 78 }],
    },
    outcomes: [
      {
        id: 'a-name-crossed-out',
        w: 0.4,
        text: '{priest}把教区簿翻到母亲的名字，下面还有一行被墨水涂过的洗礼记录。{subject}对着灯看，认出日期比父母的婚礼早了七个月，孩子的名字和{sibling}只差一个字母。{sibling}把簿子合上，说这页纸不该留；{priest}没有伸手拦。',
        significance: 0.8,
        fx: {
          mood: -0.1,
          relation: ['sibling', 'rival', -0.08, 0],
          knowledge: ['a baptism entry predates the parents’ wedding', 0.9, 'priest'],
          flag: 'family_secret_known',
          condition: 'family_secret',
        },
      },
      {
        id: 'mothers-first-marriage',
        w: 0.35,
        text: '簿子上的地址把{subject}带到城边一间小屋。开门的老妇人说母亲在那里住过三年，前夫死在矿上，孩子跟了外婆。{sibling}在巷口等着，听完只说了一句“难怪那架钢琴一直不许人碰”。回家的电车上，两人都没有坐在一起。',
        significance: 0.72,
        fx: {
          mood: -0.06,
          relation: ['sibling', 'acquaintance', 0.04, 0],
          knowledge: ['the mother had an earlier marriage and a child', 0.85],
          flag: 'mother_had_first_marriage',
        },
      },
      {
        id: 'burn-the-page',
        w: 0.25,
        text: '{subject}没有抄下那行字，只问{priest}能不能把簿子留在原处。回家后，{subject}把母亲留下的信翻出来，在炉边坐了很久，最后只烧了信封，信纸又塞回箱底。{sibling}问找到什么，{subject}说只有一张旧收据。',
        significance: 0.76,
        fx: {
          mood: -0.12,
          condition: 'secret_guilt',
          flag: 'hid_family_secret',
          relation: ['sibling', 'acquaintance', 0.02, 0],
        },
      },
    ],
  },

  // 14 · sibling rivalry over the family business ------------------------
  {
    id: 'r14-fam.two-ledgers',
    title: '柜台上的粉笔线',
    domain: 'family',
    stage: 'adulthood',
    ages: [20, 62],
    baseRate: 0.025,
    tags: ['family', 'siblings', 'sibling_rivalry', 'family_business', 'conflict'],
    contexts: URBAN,
    milieus: COUNTER,
    conditions: [{ kind: 'householdSize', min: 2 }],
    roles: {
      sibling: ['sibling', { minAge: 18, maxAge: 64 }],
    },
    outcomes: [
      {
        id: 'divide-the-shop',
        w: 0.4,
        text: '{subject}在柜台上画了一道粉笔线，说前半间归{sibling}，后半间归自己。{sibling}把两本账分开，连一盒火柴也写进自己的那本。傍晚有人来买盐，看见两个人各站一边，放下钱就走了，盐也没有拿。',
        significance: 0.78,
        fx: {
          cash: -5,
          relation: ['sibling', 'rival', -0.08, 0],
          condition: 'business_partnership',
          flag: 'divided_family_business',
        },
        followup: { sceneId: 'r14-fam.apron-and-keys', delayMonths: 12 },
      },
      {
        id: 'buy-out-the-share',
        w: 0.35,
        text: '{subject}把二十克朗和一叠欠条放在桌上，说要把{sibling}的那一份买下来。{sibling}数了两遍，问这是不是母亲留下的钱；{subject}没有答。签字时{sibling}的笔尖把纸戳破了一个洞，后来用米粒粘上，痕迹一直在那里。',
        significance: 0.82,
        fx: {
          cash: -20,
          relation: ['sibling', 'rival', -0.16, 0],
          role: 'shop_owner',
          flag: 'bought_sibling_share',
        },
      },
      {
        id: 'one-ledger-again',
        w: 0.25,
        text: '{subject}把两本账并回一本，{sibling}在旁边看着，没有说话。晚上关店后，两人把当天的铜板倒在桌上，一枚一枚数。数到最后一枚，{sibling}忽然说，小时候也是这么分的，谁多拿一枚就要挨打。',
        significance: 0.7,
        fx: {
          cash: 2,
          relation: ['sibling', 'colleague', 0.06, 0.02],
          condition: 'business_partnership',
          flag: 'joint_ledger',
        },
      },
    ],
  },

  // 15 · return of a missing relative ------------------------------------
  {
    id: 'r14-fam.canvas-bag',
    title: '一只帆布包站在门口',
    domain: 'family',
    stage: 'adulthood',
    ages: [28, 72],
    baseRate: 0.015,
    tags: ['family', 'missing_relative', 'return', 'family_departure', 'reunion'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [{ kind: 'history', tag: 'missing_relative', minCount: 1, withinYears: 25 }],
    roles: {
      relative: returning('neighbor', {
        minAge: 24,
        maxAge: 29,
        sharedHistoryTag: 'missing_relative',
      }),
    },
    outcomes: [
      {
        id: 'taken-back-in',
        w: 0.4,
        text: '{relative}站在门口，脚边只有一只褪色的帆布包，包带上缝着旧名字。{subject}看了很久，才认出那道眉上的疤。屋里多摆了一副碗筷，{relative}吃到一半停下来，说车站的钟还是原来那个声音；{subject}把汤勺放下，去走廊上站了一会儿。',
        significance: 0.82,
        fx: [
          {
            cash: -4,
            relation: ['relative', 'kin', 0.1, 0.06],
            role: 'returned_relative',
            flag: 'missing_relative_returned',
            mood: 0.06,
          },
          {
            raw: [
              {
                type: 'household',
                personId: '$relative',
                householdId: '$household',
                reason: 'took in a relative who returned after years',
              },
            ],
          },
        ],
      },
      {
        id: 'no-room-at-the-table',
        w: 0.35,
        text: '{subject}没有让帆布包进门，只把两克朗和一张车票钱塞过去。{relative}在楼梯口站了一会儿，问是不是还记恨当年那封信。{subject}说屋子挤，孩子要念书；{relative}点头，下楼时手一直扶着墙。',
        significance: 0.76,
        fx: {
          cash: -2,
          relation: ['relative', 'rival', -0.1, 0],
          mood: -0.14,
          flag: 'turned_away_relative',
        },
      },
      {
        id: 'papers-do-not-match',
        w: 0.25,
        text: '{relative}拿不出身份证明，只说得出老屋后院那棵梨树。{subject}问了两件小时候的事，{relative}答对一件，另一件说记不清了。门房在走廊里听着，低声说这条街上冒充亲戚的人不少；{subject}把帆布包提到门内，又停住。',
        significance: 0.72,
        fx: {
          cash: -1,
          relation: ['relative', 'acquaintance', 0.02, 0],
          condition: 'family_reunion_uncertain',
          flag: 'relative_identity_unproven',
          knowledge: ['the returnee cannot prove the family connection', 0.7],
        },
      },
    ],
  },

  // 16 · widowhood -------------------------------------------------------
  {
    id: 'r14-fam.black-dress',
    title: '黑裙子的第二个冬天',
    domain: 'family',
    stage: 'adulthood',
    ages: [28, 68],
    baseRate: 0.015,
    tags: ['family', 'marriage', 'widowhood', 'death', 'grief'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [{ kind: 'hasRelation', relationKind: 'partner', sameHousehold: true }],
    roles: {
      partner: ['partner', { minAge: 28, maxAge: 70 }],
      stepchild: ['neighbor', { minAge: 5, maxAge: 20 }],
    },
    outcomes: [
      {
        id: 'scaffold-fall',
        w: 0.6,
        text: '工地上的人来敲门时，{subject}还在补{partner}的工裤。{partner}从脚手架上摔下来，抬到医院已经没有了气。葬礼花了十二克朗，{stepchild}在墓边一直攥着{subject}的袖子；回家后，{subject}把黑裙子改小了一寸，因为腰已经瘦得挂不住。',
        significance: 0.9,
        fx: [
          {
            cash: -12,
            health: -0.06,
            mood: -0.3,
            relation: ['stepchild', 'kin', 0.1, 0.04],
            role: 'widow',
            condition: 'grief',
            flag: 'widowed_by_accident',
          },
          {
            raw: [
              {
                type: 'death',
                personId: '$partner',
                cause: 'fall from scaffolding',
                reason: 'partner died in a building accident',
              },
            ],
          },
        ],
        followup: { sceneId: 'r14-fam.stepson-plate', delayMonths: 18 },
      },
      {
        id: 'tuberculosis-winter',
        w: 0.4,
        text: '{partner}咳了一冬，枕头上总有血丝。医生来家里看过两次，最后一次只把{subject}叫到走廊，说准备后事。人是在天亮前走的，{subject}把窗子打开，让屋里的药味散出去；{stepchild}站在门口，不肯进来。',
        significance: 0.88,
        fx: [
          {
            cash: -15,
            health: -0.04,
            mood: -0.28,
            relation: ['stepchild', 'kin', 0.08, 0],
            role: 'widow',
            condition: 'grief',
            flag: 'widowed_by_illness',
          },
          {
            raw: [
              {
                type: 'death',
                personId: '$partner',
                cause: 'tuberculosis',
                reason: 'partner died of tuberculosis',
              },
            ],
          },
        ],
        followup: { sceneId: 'r14-fam.stepson-plate', delayMonths: 18 },
      },
    ],
  },

  // 17 · stepfamily conflict ---------------------------------------------
  {
    id: 'r14-fam.stepson-plate',
    title: '那只摔碎的盘子',
    domain: 'family',
    stage: 'adulthood',
    ages: [32, 66],
    baseRate: 0.025,
    tags: ['family', 'stepfamily', 'stepfamily_conflict', 'widowhood', 'household'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [
      { kind: 'history', tag: 'widowhood', minCount: 1, minYearsAgo: 1 },
      { kind: 'householdSize', min: 2 },
    ],
    roles: {
      stepchild: returning('neighbor', {
        minAge: 7,
        maxAge: 24,
        sharedHistoryTag: 'widowhood',
      }),
    },
    outcomes: [
      {
        id: 'plate-against-the-wall',
        w: 0.4,
        text: '{stepchild}把盘子推到地上，说这个家没有一件东西是亲爹留下的。{subject}蹲下去捡碎片，手指被划了一道。门外有人敲了敲，问要不要帮忙；{subject}说不用，把碎片包进报纸，放进垃圾桶最底下。',
        significance: 0.78,
        fx: {
          cash: -2,
          health: -0.02,
          relation: ['stepchild', 'rival', -0.2, 0],
          condition: 'stepfamily_conflict',
          flag: 'stepchild_defiant',
          mood: -0.12,
        },
      },
      {
        id: 'a-place-at-the-table',
        w: 0.35,
        text: '{subject}把{stepchild}的盘子放回原来的位置，又在旁边添了一只小碟，装对方爱吃的李子酱。{stepchild}没有道谢，却把盘子吃空了。晚上收桌子时，{subject}发现那只碟子被洗过，倒扣在碗架上，水还在往下滴。',
        significance: 0.7,
        fx: {
          relation: ['stepchild', 'acquaintance', 0.08, 0.04],
          flag: 'stepfamily_truce',
          mood: 0.04,
        },
      },
      {
        id: 'packs-and-leaves',
        w: 0.25,
        text: '{stepchild}把衣服塞进一只面粉袋，说要去投奔姑母。{subject}没有拦，只把冬天的袜子找出来，塞进袋口。门关上以后，屋里安静得能听见煤在炉子里塌下去；{subject}把那只空盘子收进柜子，和旧人的杯子放在一起。',
        significance: 0.76,
        fx: {
          relation: ['stepchild', 'acquaintance', -0.08, 0],
          flag: 'stepchild_left_home',
          mood: -0.1,
          raw: [
            {
              type: 'move',
              personId: '$stepchild',
              locationId: '@station',
              reason: 'left to live with an aunt',
            },
          ],
        },
      },
    ],
  },

  // 18 · grown child rejects the parent ----------------------------------
  {
    id: 'r14-fam.returned-letter',
    title: '退回的信',
    domain: 'family',
    stage: 'adulthood',
    ages: [44, 78],
    baseRate: 0.02,
    tags: ['family', 'children', 'estrangement', 'disabled_child_care', 'rejection'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [{ kind: 'history', tag: 'disabled_child_care', minCount: 1, minYearsAgo: 5 }],
    roles: {
      child: returning('neighbor', {
        minAge: 18,
        maxAge: 40,
        sharedHistoryTag: 'disabled_child_care',
      }),
    },
    outcomes: [
      {
        id: 'letter-returned-unopened',
        w: 0.4,
        text: '信被退回来，封口没有拆，只在背面多了一行字：以后不必再写。{subject}把信放在桌上，坐到天黑，才想起信封里还夹着一张旧照片。有人来借火柴，看见照片上那个戴铁支架的孩子，什么也没有问。',
        significance: 0.8,
        fx: {
          mood: -0.2,
          condition: 'estrangement',
          flag: 'child_rejects_parent',
          knowledge: ['the child refuses all further letters', 0.9],
        },
      },
      {
        id: 'a-short-visit',
        w: 0.35,
        text: '{child}在星期天来了，站在门口没有脱外套，说只坐一刻钟。两人从天气说到房租，谁也没有提那些年。走的时候，{child}把带来的半磅咖啡放在桌上，说不是特意买的；{subject}送到楼梯口，听见脚步在二楼停了一下，又继续往下。',
        significance: 0.72,
        fx: {
          relation: ['child', 'kin', 0.05, 0.04],
          flag: 'awkward_reunion',
          mood: 0.04,
          knowledge: ['the child lives on the other side of the canal', 0.7, 'child'],
        },
      },
      {
        id: 'grandchild-at-the-door',
        w: 0.25,
        text: '敲门的是个半大孩子，手里拿着一张字条，说母亲让把这个送来。字条上只有地址和一句“别再往家里写”。{subject}把孩子让进屋，给了半块巧克力；孩子吃完，把包装纸叠成一只小船，放在桌上就走了。',
        significance: 0.74,
        fx: {
          mood: -0.04,
          relation: ['child', 'kin', -0.02, 0.02],
          flag: 'grandchild_visit',
          knowledge: ['the child has a family of her own now', 0.75],
        },
      },
    ],
  },

  // 19 · parent's death and funeral --------------------------------------
  {
    id: 'r14-fam.six-candles',
    title: '葬礼上的六支蜡烛',
    domain: 'family',
    stage: 'adulthood',
    ages: [30, 76],
    baseRate: 0.015,
    tags: ['family', 'parent_death', 'funeral', 'siblings', 'grief'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [{ kind: 'age', min: 30 }],
    roles: {
      parent: ['parent', { minAge: 55, maxAge: 92 }],
      sibling: ['sibling', { minAge: 24, maxAge: 74 }],
    },
    outcomes: [
      {
        id: 'parent-dies-after-stroke',
        w: 0.4,
        text: '{parent}在夜里中风，第二天早上已经说不出话。{subject}和{sibling}轮流守了两天，最后是{subject}合上对方的眼睛。葬礼用了十四克朗，六支蜡烛烧到一半就灭了；神父说风大，{sibling}却一直看着那截黑芯。',
        significance: 0.9,
        fx: [
          {
            cash: -14,
            mood: -0.26,
            relation: ['sibling', 'kin', 0.06, 0],
            flag: 'buried_parent_after_stroke',
            condition: 'grief',
          },
          {
            raw: [
              {
                type: 'death',
                personId: '$parent',
                cause: 'stroke',
                reason: 'parent died after a stroke',
              },
            ],
          },
        ],
        followup: [
          { sceneId: 'r14-fam.notary-watch', delayMonths: 2 },
          { sceneId: 'r14-fam.baptism-register', delayMonths: 3 },
        ],
      },
      {
        id: 'parent-dies-of-pneumonia',
        w: 0.35,
        text: '{parent}咳了半个月，医院说肺已经满了水。最后一夜，{subject}坐在床边给{parent}擦嘴，{sibling}去楼下买热汤，回来时人已经凉了。葬礼上来了不少旧工友，每人放下一枚铜板；{subject}把铜板数清，正好够付棺材的尾款。',
        significance: 0.9,
        fx: [
          {
            cash: -16,
            mood: -0.24,
            relation: ['sibling', 'kin', 0.02, 0],
            flag: 'buried_parent_after_pneumonia',
            condition: 'grief',
          },
          {
            raw: [
              {
                type: 'death',
                personId: '$parent',
                cause: 'pneumonia',
                reason: 'parent died of pneumonia',
              },
            ],
          },
        ],
        followup: [
          { sceneId: 'r14-fam.notary-watch', delayMonths: 2 },
          { sceneId: 'r14-fam.baptism-register', delayMonths: 3 },
        ],
      },
      {
        id: 'funeral-without-the-eldest',
        w: 0.25,
        text: '{parent}是在睡梦里走的，脸上还带着没吃完的药味。{sibling}没有赶上葬礼，只托人送来一只花圈，缎带上的名字写错了。{subject}一个人跟着棺材走到墓园门口，回来时把花圈上的缎带剪下来，塞进灶里烧了。',
        significance: 0.88,
        fx: [
          {
            cash: -10,
            mood: -0.22,
            relation: ['sibling', 'rival', -0.14, 0],
            flag: 'funeral_without_sibling',
            condition: 'grief',
          },
          {
            raw: [
              {
                type: 'death',
                personId: '$parent',
                cause: 'heart failure',
                reason: 'parent died in their sleep',
              },
            ],
          },
        ],
        followup: { sceneId: 'r14-fam.notary-watch', delayMonths: 2 },
      },
    ],
  },

  // 20 · family business handed over -------------------------------------
  {
    id: 'r14-fam.apron-and-keys',
    title: '围裙和钥匙',
    domain: 'family',
    stage: 'adulthood',
    ages: [24, 68],
    baseRate: 0.02,
    tags: ['family', 'family_business', 'succession', 'siblings', 'work'],
    contexts: URBAN,
    milieus: COUNTER,
    conditions: [{ kind: 'history', tag: 'family_business', minCount: 1, minYearsAgo: 1 }],
    roles: {
      sibling: returning('sibling', {
        minAge: 20,
        maxAge: 70,
        sharedHistoryTag: 'family_business',
      }),
    },
    outcomes: [
      {
        id: 'keys-to-the-subject',
        w: 0.4,
        text: '{sibling}把一串钥匙放在柜台上，说以后进货、记账、开门都归{subject}。钥匙上还挂着母亲用布条编的圈，磨得发亮。{subject}把围裙解下来洗了一遍，晾在店门口；第二天清早，第一个来敲门的是个学徒，手里提着两桶煤。',
        significance: 0.82,
        fx: {
          cash: -10,
          relation: ['sibling', 'colleague', 0.05, 0],
          role: 'shop_owner',
          flag: 'took_over_family_business',
          knowledge: ['the supplier gives credit until the first of the month', 0.8, 'sibling'],
        },
      },
      {
        id: 'keys-to-the-sibling',
        w: 0.35,
        text: '{subject}把钥匙推给{sibling}，说自己更适合在后屋干活。{sibling}接过钥匙，当场把货架上的罐头重新排了一遍，把贵的放到眼睛够得着的地方。年底分红时，{subject}的纸包比往年厚了一点，却再也不能自己决定进什么货。',
        significance: 0.78,
        fx: {
          cash: 6,
          relation: ['sibling', 'colleague', -0.02, 0],
          flag: 'stepped_back_from_business',
          role: 'workshop_hand',
        },
      },
      {
        id: 'sell-the-shop',
        w: 0.25,
        text: '两人都没有接钥匙。{subject}在门板上贴了一张出售的纸，{sibling}站在街对面看了一会儿，没有过来。买主是个外乡人，付了二十克朗现钱，把旧柜台拆下来当柴烧。{subject}留下围裙，钥匙全部交了出去。',
        significance: 0.8,
        fx: {
          cash: 20,
          relation: ['sibling', 'acquaintance', 0.02, 0],
          flag: 'sold_family_business',
          unemployment: 'family shop sold',
          mood: -0.08,
        },
        followup: { sceneId: 'r14-fam.note-from-1908', delayMonths: 24 },
      },
    ],
  },

  // 21 · migration and a left-behind child -------------------------------
  {
    id: 'r14-fam.ticket-to-hamburg',
    title: '一张去汉堡的船票',
    domain: 'family',
    stage: 'adulthood',
    ages: [22, 50],
    baseRate: 0.02,
    tags: ['family', 'migration', 'family_departure', 'left_behind_child', 'poverty'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [{ kind: 'householdSize', min: 2 }],
    roles: {
      partner: ['partner', { minAge: 34, maxAge: 52 }],
      child: ['neighbor', { minAge: 1, maxAge: 12, sameHousehold: true }],
    },
    outcomes: [
      {
        id: 'one-ticket-one-traveller',
        w: 0.4,
        text: '{child}还在睡，{subject}把最后一件衬衫塞进箱底，{partner}在门口提着灯。船票只买了一张，说好先过去找工，等攒够钱再接人。电车来的时候{subject}没有回头；到了车站才发现，箱子里塞着孩子的一只布老虎。',
        significance: 0.86,
        fx: {
          cash: -22,
          mood: -0.14,
          move: ['@station', 'left for Hamburg alone to find work'],
          condition: 'left_child_behind',
          flag: 'left_child_behind',
          relation: ['child', 'kin', -0.04, 0.06],
        },
      },
      {
        id: 'child-sent-ahead',
        w: 0.35,
        text: '{subject}把{child}送到城外的姑母家，说最多住一个冬天。{child}抱着布老虎站在院门口，问火车什么时候回来接人。{subject}把车票钱数了三遍，最后只买了一张站台票，看着孩子被牵进屋里。',
        significance: 0.82,
        fx: {
          cash: -18,
          mood: -0.12,
          relation: ['child', 'kin', 0.02, 0.04],
          condition: 'family_separated',
          flag: 'sent_child_ahead',
          raw: [
            {
              type: 'move',
              personId: '$child',
              locationId: '@rural',
              reason: 'sent to live with an aunt in the country',
            },
          ],
        },
      },
      {
        id: 'both-adults-sail',
        w: 0.25,
        text: '{subject}和{partner}把能卖的都卖了，凑出两张船票，把{child}留给外婆。临走那天下着雨，{child}把布老虎塞进{subject}的箱子，说到了那边再还。船开以后，{subject}在甲板上打开箱子，发现老虎的耳朵已经被雨打湿了。',
        significance: 0.84,
        fx: {
          cash: -25,
          mood: -0.16,
          move: ['@station', 'sailed with a partner, leaving the child with a grandmother'],
          condition: 'left_child_behind',
          flag: 'left_child_with_grandmother',
          relation: ['child', 'kin', -0.02, 0.02],
          raw: [
            {
              type: 'move',
              personId: '$partner',
              locationId: '@station',
              reason: 'sailed with the subject',
            },
          ],
        },
      },
    ],
  },

  // 22 · child's upward mobility and shame -------------------------------
  {
    id: 'r14-fam.chalk-on-coat',
    title: '新外套上的粉笔灰',
    domain: 'family',
    stage: 'adulthood',
    ages: [36, 68],
    baseRate: 0.025,
    tags: ['family', 'children', 'class_difference', 'shame', 'education'],
    contexts: URBAN,
    milieus: [...HOME, 'school', 'education', 'teacher'],
    conditions: [{ kind: 'history', tag: 'family_departure', minCount: 1, minYearsAgo: 2 }],
    roles: {
      child: returning('neighbor', {
        minAge: 16,
        maxAge: 21,
        sharedHistoryTag: 'family_departure',
      }),
    },
    outcomes: [
      {
        id: 'new-coat-old-lunch',
        w: 0.4,
        text: '{child}穿着学校发的深色外套回来，袖口沾着粉笔灰，说今天在讲堂里坐了第一排。{subject}把午饭包在旧报纸里递过去，{child}接的时候犹豫了一下。晚上{subject}把报纸摊平，发现上面还印着昨天的招工广告。',
        significance: 0.78,
        fx: {
          mood: -0.04,
          relation: ['child', 'kin', 0.06, 0.04],
          flag: 'child_upward_mobility',
          knowledge: ['the child now studies among people who own gloves', 0.75, 'child'],
        },
      },
      {
        id: 'do-not-mention-the-yard',
        w: 0.35,
        text: '{subject}在门口替{child}掸掉肩上的灰，低声说在学校别提后院那排厕所，也别说是哪条街长大的。{child}把外套袖子抽回去，说同学早就问过，自己已经照实说了。两人站在楼梯口，谁也没有先上楼。',
        significance: 0.76,
        fx: {
          relation: ['child', 'rival', -0.1, 0],
          condition: 'shame_of_origins',
          flag: 'asked_child_to_hide_origins',
          mood: -0.1,
        },
      },
      {
        id: 'first-money-back',
        w: 0.25,
        text: '{child}把六克朗放在桌上，说是替人抄讲义挣的。{subject}问有没有耽误功课，{child}说没有，又把钱往桌中间推了推。那晚{subject}用这钱买了煤，炉子烧得比平时旺；{child}在灯下写作业，外套搭在椅背上，粉笔灰落了一地。',
        significance: 0.72,
        fx: {
          cash: 6,
          relation: ['child', 'kin', 0.1, 0.06],
          role: 'supported_by_child',
          flag: 'child_supports_household',
          mood: 0.06,
        },
      },
    ],
  },

  // 23 · care for a disabled child ---------------------------------------
  {
    id: 'r14-fam.iron-brace',
    title: '夜里的铁支架',
    domain: 'family',
    stage: 'adulthood',
    ages: [22, 56],
    baseRate: 0.02,
    tags: ['family', 'children', 'disability', 'disabled_child_care', 'care'],
    contexts: URBAN,
    milieus: MEDICAL,
    conditions: [{ kind: 'householdSize', min: 2 }],
    roles: {
      child: ['neighbor', { minAge: 2, maxAge: 14, sameHousehold: true }],
    },
    outcomes: [
      {
        id: 'brace-and-debt',
        w: 0.4,
        text: '医生给{child}的左腿套上铁支架，说夜里也要戴着，骨头才不会歪。支架花了十六克朗，{subject}把过冬的煤钱先垫了进去。第一夜{child}哭到嗓子哑，{subject}坐在床边，把手伸进冰冷的铁条下面，替孩子揉脚背。',
        significance: 0.82,
        fx: {
          cash: -16,
          health: -0.02,
          relation: ['child', 'kin', 0.1, 0.08],
          condition: 'medical_debt',
          flag: 'disabled_child_care',
          knowledge: ['the brace must be worn at night to keep the bone straight', 0.9],
          raw: [
            {
              type: 'condition',
              personId: '$child',
              condition: 'polio_brace',
              add: true,
              reason: 'fitted with a leg brace',
            },
          ],
        },
      },
      {
        id: 'kept-behind-the-curtain',
        w: 0.35,
        text: '{subject}没有去领支架，只把{child}留在屋里，说外面的人会盯着看。白天窗帘拉着一半，{child}趴在窗台上看院子里的孩子踢球，膝盖顶着玻璃。{subject}下班回来，发现窗台上有一小片被呼吸蒙白的雾，擦了又会出现。',
        significance: 0.78,
        fx: {
          cash: -2,
          relation: ['child', 'kin', -0.04, 0.02],
          condition: 'isolation',
          flag: 'hid_disabled_child',
          mood: -0.12,
        },
      },
      {
        id: 'school-takes-the-child',
        w: 0.25,
        text: '学校的老师来家里看了一次，说学校肯收，只要有人每天背孩子上楼梯。{subject}当场应下，第二天把{child}背到三楼，铁支架在背上磕出响声。放学时老师把孩子送下来，说今天学会了写自己的名字。',
        significance: 0.74,
        fx: {
          cash: -1,
          relation: ['child', 'kin', 0.06, 0.06],
          flag: 'child_school_accepted',
          knowledge: ['the school will take the child if someone carries her upstairs', 0.85],
        },
      },
    ],
  },

  // 24 · old family debt -------------------------------------------------
  {
    id: 'r14-fam.note-from-1908',
    title: '一九〇八年的欠条',
    domain: 'family',
    stage: 'adulthood',
    ages: [26, 72],
    baseRate: 0.015,
    tags: ['family', 'debt', 'family_debt', 'inheritance', 'shame'],
    contexts: URBAN,
    milieus: OFFICE,
    conditions: [{ kind: 'history', tag: 'family_business', minCount: 1, withinYears: 20 }],
    roles: {
      creditor: ['neighbor', { minAge: 48, maxAge: 86 }],
      sibling: returning('sibling', {
        minAge: 22,
        maxAge: 72,
        sharedHistoryTag: 'family_business',
      }),
    },
    outcomes: [
      {
        id: 'paid-with-interest',
        w: 0.4,
        text: '{creditor}把欠条摊在桌上，纸边已经发脆，落款是父亲的名字，日期是一九〇八年。{subject}和{sibling}把二十二克朗数了三遍，连本带利还清。{creditor}在欠条背面写“收讫”，笔迹和当年一样小；{subject}把纸折好，带回去夹进账本。',
        significance: 0.8,
        fx: {
          cash: -22,
          relation: [
            ['creditor', 'acquaintance', 0.08, 0],
            ['sibling', 'colleague', 0.04, 0],
          ],
          flag: 'paid_family_debt',
          knowledge: ['the family debt dated from 1908 and was finally settled', 0.9, 'creditor'],
        },
      },
      {
        id: 'signature-denied',
        w: 0.35,
        text: '{subject}说那不是父亲的笔迹，{sibling}却记得小时候见过这张纸。{creditor}没有争，只把欠条收回铁盒，说那就让街坊来认。{subject}把两克朗拍在桌上当“辛苦钱”，出门时听见铁盒在身后合上，声音很轻，却像落了一把锁。',
        significance: 0.76,
        fx: {
          cash: -2,
          relation: [
            ['creditor', 'rival', -0.16, 0],
            ['sibling', 'rival', -0.08, 0],
          ],
          condition: 'family_disgrace',
          flag: 'denied_family_debt',
          reputation: -0.06,
        },
      },
      {
        id: 'sell-the-watch',
        w: 0.25,
        text: '{subject}没有动账上的钱，把父亲留下的怀表送进当铺，换回八克朗，又添了四克朗才把欠条赎出来。{sibling}问表呢，{subject}说表本来就不走。晚上两人把欠条烧在炉子里，火苗窜了一下，纸灰落在炉盖上，像一层薄雪。',
        significance: 0.78,
        fx: {
          cash: -4,
          relation: ['sibling', 'colleague', 0.02, 0],
          condition: 'lost_heirloom',
          flag: 'sold_heirloom_to_pay_debt',
          mood: -0.06,
        },
      },
    ],
  },

  // 25 · neighbour intervenes --------------------------------------------
  {
    id: 'r14-fam.three-knocks',
    title: '隔壁敲了三下墙',
    domain: 'family',
    stage: 'adulthood',
    ages: [24, 66],
    baseRate: 0.02,
    tags: ['family', 'domestic_violence', 'domestic_violence_escape', 'neighbor', 'help'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [{ kind: 'history', tag: 'domestic_violence_escape', minCount: 1, withinYears: 3 }],
    roles: {
      neighbour: ['neighbor', { minAge: 24, maxAge: 70 }],
      official: ['official', { minAge: 28, maxAge: 72 }],
    },
    outcomes: [
      {
        id: 'shelter-next-door',
        w: 0.4,
        text: '墙那边敲了三下，{neighbour}就提着一盏小灯过来，把{subject}的箱子和孩子的外套接过去。屋里只有一张床，{neighbour}在地上铺了毯子，说先住到周末。半夜有人在外头踢门，{neighbour}把灯吹灭，两个人坐在黑暗里，听着脚步声上楼又下楼。',
        significance: 0.8,
        fx: {
          cash: -1,
          relation: ['neighbour', 'friend', 0.2, 0.08],
          condition: 'sheltered_by_neighbor',
          flag: 'neighbour_gave_shelter',
          mood: 0.04,
        },
      },
      {
        id: 'neighbour-calls-the-police',
        w: 0.35,
        text: '{neighbour}没有进门，只下楼去街角打电话。巡警来的时候，{subject}已经把箱子拖到楼梯口，孩子的鞋还落在屋里。分局的人做了记录，给了一张写着地址的纸，说先去妇女收容所住几天。走廊里的邻居都开着门看，没有人说话。',
        significance: 0.82,
        fx: {
          cash: -2,
          relation: [
            ['neighbour', 'friend', 0.16, 0.04],
            ['official', 'colleague', 0.1, 0],
          ],
          condition: 'protection_order',
          flag: 'neighbour_called_police',
          knowledge: [
            'a women’s shelter is three streets from the district office',
            0.85,
            'official',
          ],
        },
      },
      {
        id: 'doors-stay-shut',
        w: 0.25,
        text: '{neighbour}把门开了一条缝，说自家孩子明天要上学，不能惹事。{subject}点头，把箱子又提回屋里。那天夜里，墙那边没有再敲；{subject}坐在床沿，听见隔壁的钟敲了十二下，每一下都像有人把门轻轻合上。',
        significance: 0.72,
        fx: {
          mood: -0.18,
          condition: 'isolation',
          flag: 'no_help_from_neighbour',
          relation: ['neighbour', 'acquaintance', -0.04, 0],
        },
      },
    ],
  },

  // 26 · begin an affair -------------------------------------------------
  {
    id: 'r14-fam.begin-affair',
    title: '旅馆后门的第二把钥匙',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [25, 56],
    tags: ['task', 'family', 'marriage', 'forbidden_affair', 'betrayal'],
    contexts: URBAN,
    milieus: SOCIAL,
    conditions: [{ kind: 'hasRelation', relationKind: 'partner' }],
    roles: {
      lover: ['neighbor', { minAge: 22, maxAge: 58 }],
    },
    outcomes: [
      {
        id: 'key-accepted',
        w: 0.45,
        text: '{lover}把一把小钥匙放在咖啡杯旁边，说旅馆后门的房间按周租，不会有人问名字。{subject}把钥匙收进内袋，指尖碰到里面的车票和家门钥匙。两人没有多坐，出门时一前一后，{subject}在街角回头，看见{lover}还站在灯下。',
        significance: 0.8,
        fx: {
          cash: -3,
          relation: ['lover', 'friend', 0.12, 0.18],
          condition: 'forbidden_affair',
          flag: 'affair_started',
          mood: 0.06,
        },
        followup: { sceneId: 'r14-fam.coat-check', delayMonths: 6 },
      },
      {
        id: 'letter-not-sent',
        w: 0.3,
        text: '{subject}把写好的信揣了三天，最后在邮筒前撕成四片。{lover}在约好的地方等到关门，第二天见面时只说了一句“知道了”。两人仍旧在市场上点头，{subject}回家后把外套口袋翻出来，确认没有留下任何纸角。',
        significance: 0.64,
        fx: {
          mood: -0.06,
          relation: ['lover', 'acquaintance', 0.06, 0.06],
          flag: 'refused_affair',
        },
      },
      {
        id: 'confession-at-home',
        w: 0.25,
        text: '{subject}没有去旅馆，回家把{lover}写的纸条放在饭桌上。家里的人读完，把纸条对折，又对折，最后放进灯罩里烧了。两人一夜没有睡，第二天照常去上工；{subject}知道这件事没有过去，只是被收进了一个更深的抽屉。',
        significance: 0.78,
        fx: {
          mood: -0.12,
          relation: ['lover', 'acquaintance', -0.06, 0],
          condition: 'confession',
          flag: 'confessed_affair',
        },
      },
    ],
    task: taskMeta('family', ['belonging'], ['belonging'], 0.55, 0.4, ['social']),
  },

  // 27 · escape domestic violence ----------------------------------------
  {
    id: 'r14-fam.hide-the-suitcase',
    title: '行李箱先寄到姐姐家',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [23, 58],
    tags: ['task', 'family', 'domestic_violence', 'domestic_violence_escape', 'safety'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [
      { kind: 'hasRelation', relationKind: 'partner', sameHousehold: true },
      { kind: 'history', tag: 'marriage_resentment', minCount: 1 },
    ],
    roles: {
      partner: ['partner', { minAge: 23, maxAge: 60 }],
      neighbour: ['neighbor', { minAge: 24, maxAge: 72 }],
      official: ['official', { minAge: 28, maxAge: 72 }],
    },
    outcomes: [
      {
        id: 'gone-before-dawn',
        w: 0.45,
        text: '{subject}把箱子先寄到姐姐家，只留下一个装换洗衣服的布包。天没亮，{neighbour}在楼梯口替{subject}看着门，{subject}抱着孩子从后门出去。走到街角时，楼上的窗子亮了一下，又灭了；{subject}没有回头，鞋底在薄冰上滑了一下。',
        significance: 0.88,
        fx: {
          cash: -5,
          relation: [
            ['partner', 'partner', -0.3, -0.16],
            ['neighbour', 'friend', 0.14, 0.04],
          ],
          condition: 'left_abusive_home',
          flag: 'escaped_domestic_violence',
          mood: 0.02,
        },
        followup: [
          { sceneId: 'r14-fam.three-knocks', delayMonths: 1 },
          { sceneId: 'r14-fam.court-corridor', delayMonths: 6 },
        ],
      },
      {
        id: 'report-at-the-station',
        w: 0.35,
        text: '{subject}没有走，先去了分局，把胳膊上的淤青给值班的巡警看，又要了一张验伤单。回家的路上，{subject}在药房买了两卷绷带，顺路把孩子的出生证明塞进内袋。那天晚上，{partner}被两个巡警叫下楼，屋里第一次安静得能听见水管响。',
        significance: 0.84,
        fx: {
          cash: -2,
          relation: [
            ['partner', 'partner', -0.28, -0.12],
            ['official', 'colleague', 0.08, 0],
          ],
          condition: 'police_report',
          flag: 'reported_domestic_violence',
        },
        followup: { sceneId: 'r14-fam.court-corridor', delayMonths: 6 },
      },
      {
        id: 'suitcase-unpacked',
        w: 0.2,
        text: '{subject}把寄走的箱子又要了回来，衣服一件件挂回柜子。{neighbour}在门口问是不是想好了，{subject}说孩子还要上学，房租也付到了年底。夜里{subject}把一把小刀藏在枕头下面，听见{partner}上楼，先把眼睛闭上。',
        significance: 0.7,
        fx: {
          cash: -1,
          condition: 'fear_at_home',
          flag: 'stayed_after_violence',
          mood: -0.16,
          relation: ['partner', 'partner', -0.1, -0.06],
        },
      },
    ],
    task: taskMeta('family', ['survival', 'family'], ['safety'], 0.9, 0.6, ['social']),
  },

  // 28 · co-parenting rota -----------------------------------------------
  {
    id: 'r14-fam.sunday-rota',
    title: '星期日排班表',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [26, 56],
    tags: ['task', 'family', 'divorce', 'co_parenting', 'custody'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [{ kind: 'history', tag: 'separation', minCount: 1, minYearsAgo: 1 }],
    roles: {
      formerPartner: returning('partner', {
        minAge: 26,
        maxAge: 58,
        sharedHistoryTag: 'separation',
      }),
      child: ['neighbor', { minAge: 3, maxAge: 16 }],
    },
    outcomes: [
      {
        id: 'rota-signed',
        w: 0.4,
        text: '两人在厨房桌上把星期几、几点、谁去接孩子一条条写下来。{formerPartner}写到星期三时停住，说那天要上晚班；{subject}把星期三换到星期四，又在旁边画了一个圈。{child}在门口听着，最后把那张纸拿过去，用彩笔在周末那格画了一只小船。',
        significance: 0.72,
        fx: {
          relation: [
            ['formerPartner', 'acquaintance', 0.08, 0],
            ['child', 'kin', 0.06, 0.04],
          ],
          flag: 'co_parenting_rota',
          mood: 0.04,
        },
      },
      {
        id: 'fight-on-the-landing',
        w: 0.35,
        text: '{formerPartner}说{subject}故意把交接时间定在自己上工的时候，{subject}把排班表拍在楼梯扶手上，说对方从来没准时过。{child}站在两层楼之间，书包带子绕在手腕上。最后{formerPartner}撕下星期三那一条，揉成团塞进口袋，走了。',
        significance: 0.74,
        fx: {
          relation: [
            ['formerPartner', 'rival', -0.16, 0],
            ['child', 'kin', 0.02, -0.04],
          ],
          condition: 'custody_friction',
          flag: 'rota_broken',
          mood: -0.1,
        },
      },
      {
        id: 'child-sets-the-terms',
        w: 0.25,
        text: '{child}把排班表拿过去，在星期五那格写了“我要去合唱团”，又把星期日改成“上午在{formerPartner}那里，下午回来”。两个大人看着那张纸，谁也没有反对。{subject}把彩笔帽盖好，忽然发现孩子的字已经比自己写得整齐。',
        significance: 0.7,
        fx: {
          relation: [
            ['child', 'kin', 0.08, 0.06],
            ['formerPartner', 'acquaintance', 0.02, 0],
          ],
          flag: 'child_sets_terms',
          knowledge: ['the child wants Sundays split between both households', 0.8, 'child'],
        },
      },
    ],
    task: taskMeta('family', ['family'], ['belonging'], 0.7, 0.2, ['social', 'numeracy']),
  },

  // 29 · childbirth and debt ---------------------------------------------
  {
    id: 'r14-fam.midwife-receipt',
    title: '接生婆的收据',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [19, 42],
    tags: ['task', 'family', 'childbirth', 'family_debt', 'medical_debt'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [
      { kind: 'hasRelation', relationKind: 'partner', sameHousehold: true },
      { kind: 'history', tag: 'partnership', minCount: 1 },
      { kind: 'age', max: 42 },
    ],
    roles: {
      subject: ['subject', { sex: 'female', minAge: 19, maxAge: 42 }],
      partner: ['partner', { minAge: 19, maxAge: 48, sex: 'male' }],
      midwife: ['neighbor', { minAge: 40, maxAge: 76, sex: 'female' }],
      lender: ['neighbor', { minAge: 35, maxAge: 78 }],
    },
    outcomes: [
      {
        id: 'borrow-eighteen',
        w: 0.4,
        text: '{midwife}把六克朗的收据压在枕头下，说孩子脐带收得好，不用再请医生。{subject}却还欠着药房十二克朗，只好去找{lender}。{lender}从柜子深处摸出十八克朗，让{subject}在纸上按个手印；{partner}回来时，看见桌上多了一小堆银币，先去看孩子，再去看那张纸。',
        significance: 0.86,
        fx: {
          cash: 18,
          relation: ['partner', 'partner', 0.04, 0.04],
          birth: {
            father: 'partner',
            sex: 'female',
            reason: 'child born at home; midwife and medicine bought on credit',
          },
          condition: 'medical_debt',
          flag: 'borrowed_for_childbirth',
        },
      },
      {
        id: 'wedding-ring-sold',
        w: 0.3,
        text: '{subject}把结婚戒指从手上褪下来，指节上留了一圈白印。当铺给了十二克朗，{midwife}收六克朗，剩下的刚够买一只鸡和半袋面。{partner}晚上回来，看见{subject}的手，什么也没问，只把自己的戒指也摘下来，放进同一个抽屉。',
        significance: 0.82,
        fx: {
          cash: 6,
          relation: ['partner', 'partner', 0.06, 0.04],
          birth: {
            father: 'partner',
            sex: 'male',
            reason: 'child born at home; wedding ring sold for the midwife',
          },
          condition: 'lost_wedding_ring',
          flag: 'sold_ring_for_midwife',
          mood: -0.04,
        },
      },
      {
        id: 'neighbours-collect',
        w: 0.3,
        text: '{midwife}收钱时，{subject}只凑出两克朗。消息在楼道里传开，傍晚有人敲门，塞进来几张揉皱的票子和一罐糖。{midwife}把收据上的数目划掉，重新写了“六克朗，已清”。{subject}抱着孩子坐在床上，听见{partner}在门外一户一户地道谢。',
        significance: 0.8,
        fx: {
          cash: 6,
          relation: [
            ['partner', 'partner', 0.06, 0.04],
            ['midwife', 'colleague', 0.08, 0],
          ],
          birth: {
            father: 'partner',
            sex: 'female',
            reason: 'child born at home; neighbours paid the midwife',
          },
          flag: 'neighbours_paid_midwife',
          mood: 0.08,
        },
      },
    ],
    task: taskMeta('family', ['family', 'survival'], ['cash'], 0.85, 0.4, ['social']),
  },

  // 30 · adoption / fostering --------------------------------------------
  {
    id: 'r14-fam.nephew-papers',
    title: '外甥的户口',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [26, 62],
    tags: ['task', 'family', 'adoption', 'fostering', 'parent_death'],
    contexts: URBAN,
    milieus: OFFICE,
    conditions: [{ kind: 'history', tag: 'parent_death', minCount: 1, withinYears: 12 }],
    roles: {
      sibling: returning('sibling', {
        minAge: 22,
        maxAge: 64,
        sharedHistoryTag: 'parent_death',
      }),
      nephew: ['neighbor', { minAge: 4, maxAge: 14 }],
      official: ['official', { minAge: 30, maxAge: 74 }],
    },
    outcomes: [
      {
        id: 'guardianship-granted',
        w: 0.4,
        text: '{official}把表格转过来，指着监护人一栏让{subject}签字。{sibling}在走廊上咳了一声，说自家连床都不够；{nephew}坐在长凳上，两只脚够不到地。{subject}签完字，带{nephew}去吃了碗面，孩子把汤喝到底，才问以后是不是住在一起。',
        significance: 0.84,
        fx: [
          {
            cash: -8,
            relation: [
              ['nephew', 'kin', 0.12, 0.08],
              ['sibling', 'kin', 0.04, 0],
            ],
            role: 'guardian',
            flag: 'fostered_nephew',
          },
          {
            raw: [
              {
                type: 'household',
                personId: '$nephew',
                householdId: '$household',
                reason: 'took in a nephew as ward',
              },
            ],
          },
        ],
      },
      {
        id: 'papers-refused',
        w: 0.35,
        text: '{official}说缺一份母亲的死亡证明，又缺一份父亲放弃抚养的声明。{sibling}在窗口前大声说早就没有父亲的消息；{official}只把表格推回来，让下次带齐。{nephew}在长凳上等到中午，最后和{subject}分吃了一个冷土豆。',
        significance: 0.76,
        fx: {
          cash: -3,
          relation: [
            ['official', 'rival', -0.1, 0],
            ['sibling', 'colleague', 0.04, 0],
          ],
          condition: 'guardianship_dispute',
          flag: 'fostering_blocked',
          knowledge: [
            'the guardianship petition needs a death certificate and a renunciation',
            0.9,
            'official',
          ],
        },
      },
      {
        id: 'aunt-takes-the-boy',
        w: 0.25,
        text: '{sibling}最后把孩子送到城外的姑母家，说乡下有牛奶，也比这里宽敞。{subject}送到车站，给{nephew}买了一张半价票，又在口袋里塞了两个苹果。火车开动后，{sibling}说这样也好；{subject}看着车窗里那张越来越小的脸，没有接话。',
        significance: 0.7,
        fx: {
          cash: -2,
          relation: [
            ['sibling', 'kin', 0.04, 0],
            ['nephew', 'kin', 0.02, 0.04],
          ],
          flag: 'nephew_sent_to_aunt',
          condition: 'family_separated',
        },
      },
    ],
    task: taskMeta('family', ['family', 'care'], ['belonging'], 0.72, 0.25, ['social']),
  },

  // 31 · aging parent care vs career --------------------------------------
  {
    id: 'r14-fam.resign-and-nurse',
    title: '辞职信和药碗',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [35, 66],
    tags: ['task', 'family', 'care', 'aging_parent', 'career_sacrifice'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [
      { kind: 'age', min: 35 },
      { kind: 'hasRelation', relationKind: 'kin' },
    ],
    roles: {
      mother: ['parent', { minAge: 60, maxAge: 94, sex: 'female' }],
    },
    outcomes: [
      {
        id: 'resigns-to-nurse',
        w: 0.4,
        text: '{mother}夜里起不来床，{subject}把药碗端到床边，第二天去厂里递了辞职信。工头说位置只能留一个月，{subject}点头，把工牌放在桌上。回家时{mother}问怎么这么早，{subject}说厂里放假；药碗里的汤还温着，勺子却找不到了。',
        significance: 0.84,
        fx: {
          unemployment: 'left work to nurse an aging mother',
          cash: -6,
          relation: ['mother', 'kin', 0.14, 0.08],
          condition: 'career_sacrifice',
          flag: 'nursed_aging_parent',
          mood: -0.06,
        },
      },
      {
        id: 'hire-a-day-nurse',
        w: 0.35,
        text: '{subject}没有辞职，把二十克朗交给介绍所，请了一个白天来喂药、擦身的女人。{mother}嫌外人手重，第一天就打翻了两次碗。{subject}下班回来，先看账本，再看母亲的背；夜里坐在厨房里，觉得比在车间还累。',
        significance: 0.78,
        fx: {
          cash: -20,
          relation: ['mother', 'kin', 0.06, 0.02],
          condition: 'care_debt',
          flag: 'paid_for_care',
          mood: -0.08,
        },
      },
      {
        id: 'mother-dies-at-home',
        w: 0.25,
        text: '{mother}在入冬后咳成肺炎，医生来看了两次，说不用再送医院。最后一夜，{subject}把炉子烧得很旺，握着那只干枯的手，听见呼吸一点点变浅。天亮时，屋里只剩药味和没喝完的半碗汤；{subject}把碗端到厨房，才发现自己一直没松手。',
        significance: 0.88,
        fx: [
          {
            cash: -10,
            mood: -0.28,
            relation: ['mother', 'kin', 0.1, 0.06],
            condition: 'grief',
            flag: 'mother_died_in_care',
          },
          {
            raw: [
              {
                type: 'death',
                personId: '$mother',
                cause: 'pneumonia',
                reason: 'mother died at home while being nursed',
              },
            ],
          },
        ],
      },
    ],
    task: taskMeta('family', ['family', 'care'], ['care', 'belonging'], 0.78, 0.3, ['social']),
  },

  // 32 · contest the will ------------------------------------------------
  {
    id: 'r14-fam.contest-will',
    title: '遗嘱上的墨迹',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [26, 70],
    tags: ['task', 'family', 'inheritance', 'family_debt', 'siblings', 'law'],
    contexts: URBAN,
    milieus: OFFICE,
    conditions: [{ kind: 'history', tag: 'parent_death', minCount: 1, withinYears: 3 }],
    roles: {
      sibling: returning('sibling', {
        minAge: 22,
        maxAge: 72,
        sharedHistoryTag: 'parent_death',
      }),
      lawyer: ['official', { minAge: 30, maxAge: 76 }],
    },
    outcomes: [
      {
        id: 'settled-before-the-judge',
        w: 0.4,
        text: '{lawyer}把两份清单并排放在桌上，说真打下去，律师费会把房子吃掉一半。{subject}和{sibling}在走廊里算了两个钟头，最后各退一步：{subject}拿存款，{sibling}拿房子。签字时两人的手都离得很远，纸中间空出一大块。',
        significance: 0.78,
        fx: {
          cash: 8,
          relation: ['sibling', 'colleague', 0.04, 0],
          condition: 'inheritance_settled',
          flag: 'settled_estate',
          mood: -0.04,
        },
      },
      {
        id: 'lost-in-court',
        w: 0.35,
        text: '法官看了遗嘱上的签名，说见证人只有一个，程序有瑕疵，但不足以推翻全文。{subject}败诉，还要付二十克朗的诉讼费。{sibling}在法院门口没有停步，{lawyer}把账单折好递过来，说可以分三次付；{subject}接的时候，手比想象中稳。',
        significance: 0.84,
        fx: {
          cash: -20,
          relation: ['sibling', 'rival', -0.2, 0],
          condition: 'inheritance_dispute',
          flag: 'lost_inheritance_case',
          mood: -0.14,
        },
      },
      {
        id: 'forged-signature',
        w: 0.25,
        text: '{subject}把遗嘱对着灯看，发现立遗嘱人的签名比平时往右歪了一指，日期也写在印章之后。{lawyer}请了笔迹鉴定，结论是有人临摹。{sibling}在庭外听见结果，脸一下白了；{subject}没有看对方，只把那张纸装回信封，像收回一件脏衣服。',
        significance: 0.82,
        fx: {
          cash: -5,
          relation: ['sibling', 'rival', -0.24, 0],
          knowledge: ['the will’s signature was copied after the seal was pressed', 0.9, 'lawyer'],
          flag: 'will_forged',
          reputation: 0.04,
        },
      },
    ],
    task: taskMeta('family', ['family', 'status'], ['status'], 0.6, 0.5, ['numeracy', 'social']),
  },

  // 33 · read the parish register ----------------------------------------
  {
    id: 'r14-fam.parish-copy',
    title: '教区簿的复印件',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [25, 68],
    tags: ['task', 'family', 'family_secret', 'parent_death', 'knowledge'],
    contexts: URBAN,
    milieus: OFFICE,
    conditions: [{ kind: 'history', tag: 'parent_death', minCount: 1, withinYears: 6 }],
    roles: {
      sibling: returning('sibling', {
        minAge: 22,
        maxAge: 70,
        sharedHistoryTag: 'parent_death',
      }),
      priest: ['official', { minAge: 30, maxAge: 80 }],
    },
    outcomes: [
      {
        id: 'entry-found',
        w: 0.4,
        text: '{priest}把教区簿搬到阅览室，翻到母亲出嫁那一年。{subject}在旁页看见一个被划掉的名字，出生日期比婚礼早半年。{priest}说旧簿子常有涂改，不一定作数；{subject}还是花两克朗复印了那一页，折好放进内袋。',
        significance: 0.78,
        fx: {
          cash: -2,
          knowledge: [
            'a crossed-out baptism entry shares the mother’s maiden name',
            0.85,
            'priest',
          ],
          flag: 'found_parish_record',
          mood: -0.04,
        },
        followup: { sceneId: 'r14-fam.baptism-register', delayMonths: 1 },
      },
      {
        id: 'page-cut-out',
        w: 0.35,
        text: '簿子翻到那一页，只剩下一条齐整的刀口，纸边发黄。{priest}说这本簿子以前存放在旧教堂，战后搬过两次，丢页不奇怪。{sibling}伸手摸了摸刀口，说这不像撕的，像有人拿尺子比着裁的。回家路上，两人都没有说话。',
        significance: 0.7,
        fx: {
          cash: -2,
          condition: 'uncertain_origin',
          flag: 'parish_page_missing',
          knowledge: ['the register page was cut out with a straight edge', 0.8, 'sibling'],
        },
      },
      {
        id: 'access-refused',
        w: 0.25,
        text: '{priest}把簿子合上，说没有直系亲属的书面许可不能查。{subject}问母亲算不算直系，{priest}只说规矩是主教区定的。{sibling}在门口等得不耐烦，说早该去问市政厅；{subject}回头看了一眼那扇关上的门，把帽子戴正才走。',
        significance: 0.68,
        fx: {
          cash: -1,
          relation: ['priest', 'rival', -0.12, 0],
          knowledge: ['the parish refuses access without written permission', 0.8, 'priest'],
          flag: 'refused_parish_access',
        },
      },
    ],
    task: taskMeta('family', ['family', 'knowledge'], ['belonging'], 0.55, 0.1, ['literacy']),
  },

  // 34 · make peace with a sibling ---------------------------------------
  {
    id: 'r14-fam.third-glass',
    title: '第三杯酒',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [24, 68],
    tags: ['task', 'family', 'siblings', 'sibling_rivalry', 'reconciliation'],
    contexts: URBAN,
    milieus: SOCIAL,
    conditions: [{ kind: 'history', tag: 'sibling_rivalry', minCount: 1 }],
    roles: {
      sibling: returning('sibling', {
        minAge: 22,
        maxAge: 70,
        sharedHistoryTag: 'sibling_rivalry',
      }),
    },
    outcomes: [
      {
        id: 'third-glass-shared',
        w: 0.4,
        text: '{subject}在酒馆角落等到第三杯，{sibling}才来，外套上还带着雨。两人先说起父亲的旧表，又说起那年谁多拿了一笔钱。说到一半，{sibling}把酒推过来，说这杯算赔罪；{subject}喝了一口，发现是兑了水的。',
        significance: 0.78,
        fx: {
          cash: -3,
          relation: ['sibling', 'friend', 0.18, 0.06],
          flag: 'sibling_reconciled',
          mood: 0.1,
        },
        followup: { sceneId: 'r14-fam.two-ledgers', delayMonths: 12 },
      },
      {
        id: 'old-argument-reopens',
        w: 0.35,
        text: '话没说几句，{sibling}又把分家那年的旧账翻出来，说{subject}当时躲在母亲身后。{subject}把杯子放下，说那笔钱早就贴进房租了。声音越来越高，酒馆老板过来收走酒瓶；两人一前一后出门，在街口往相反方向走。',
        significance: 0.72,
        fx: {
          relation: ['sibling', 'rival', -0.14, 0],
          condition: 'estrangement',
          flag: 'sibling_quarrel_renewed',
          mood: -0.12,
        },
      },
      {
        id: 'business-truce',
        w: 0.25,
        text: '{subject}没有提旧事，只把店里的账本摊开，说下个月进货缺一个帮手。{sibling}翻了两页，问工钱怎么算；{subject}说按天算，月底一起结。两人把杯子碰了一下，没有说和好，但{sibling}第二天清早就来了，围裙还是从前那条。',
        significance: 0.7,
        fx: {
          cash: 2,
          relation: ['sibling', 'colleague', 0.1, 0.02],
          flag: 'sibling_business_truce',
          knowledge: ['the sibling will help with the shop accounts', 0.75, 'sibling'],
        },
      },
    ],
    task: taskMeta('family', ['family'], ['belonging'], 0.62, 0.2, ['social']),
  },

  // 35 · search for a missing relative -----------------------------------
  {
    id: 'r14-fam.missing-photo',
    title: '寻人启事上的照片',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [26, 72],
    tags: ['task', 'family', 'missing_relative', 'family_departure', 'search'],
    contexts: URBAN,
    milieus: OFFICE,
    conditions: [{ kind: 'history', tag: 'family_departure', minCount: 1, withinYears: 20 }],
    roles: {
      missingRelative: returning('neighbor', {
        minAge: 24,
        maxAge: 29,
        sharedHistoryTag: 'family_departure',
      }),
    },
    outcomes: [
      {
        id: 'address-in-a-ledger',
        w: 0.4,
        text: '{subject}把寻人启事上的照片剪下来，跑了三个区的户籍处。最后一个老书记员从抽屉里翻出一本旧地址簿，指着一行褪色的字，说{missingRelative}五年前来迁过户口。{subject}抄下地址，手抖得把门牌号写了两遍；回家路上，才发现自己一直没吃午饭。',
        significance: 0.76,
        fx: {
          cash: -4,
          knowledge: ['the missing relative registered a new address five years ago', 0.85],
          flag: 'found_missing_relative_address',
          mood: 0.08,
        },
        followup: { sceneId: 'r14-fam.canvas-bag', delayMonths: 2 },
      },
      {
        id: 'trail-gone-cold',
        w: 0.35,
        text: '{subject}按着旧信封上的地址找过去，房子已经拆了，原地盖起一间车库。邻居说原来那家人战后就走了，有的去了美国，有的连名字都没留下。{subject}把照片收回口袋，在车库门口站了一会儿，水泥地上还有新轮胎的印子。',
        significance: 0.66,
        fx: {
          cash: -6,
          mood: -0.16,
          condition: 'searching_for_relative',
          flag: 'missing_trail_cold',
        },
      },
      {
        id: 'death-notice-in-the-paper',
        w: 0.25,
        text: '{subject}在一九三一年的旧报纸上找到一行小字，名字、年龄和那道眉上的疤都对得上，地点是汉堡的一间救济院。户籍处的人替{subject}抄了登记号，说可以写信去要一份死亡证明。{subject}把报纸折好，回家后没有立刻写信，只把照片翻过去扣在桌上。',
        significance: 0.8,
        fx: {
          cash: -2,
          mood: -0.22,
          condition: 'grief',
          flag: 'missing_relative_dead',
          knowledge: ['the missing relative died in a Hamburg poorhouse', 0.9],
        },
      },
    ],
    task: taskMeta('family', ['family'], ['belonging'], 0.6, 0.15, ['literacy']),
  },

  // 36 · widowhood and remarriage ----------------------------------------
  {
    id: 'r14-fam.second-wedding',
    title: '第二次婚礼的请帖',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [30, 68],
    tags: ['task', 'family', 'marriage', 'widowhood', 'remarriage', 'stepfamily'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [
      { kind: 'history', tag: 'widowhood', minCount: 1, minYearsAgo: 2 },
      { kind: 'notHasRelation', relationKind: 'partner' },
    ],
    roles: {
      newPartner: ['partner', { minAge: 30, maxAge: 70 }],
      stepchild: returning('neighbor', {
        minAge: 8,
        maxAge: 26,
        sharedHistoryTag: 'widowhood',
      }),
    },
    outcomes: [
      {
        id: 'small-wedding-at-home',
        w: 0.4,
        text: '{subject}和{newPartner}没有请乐队，只在厨房摆了两桌，汤里放足了肉。{stepchild}坐在靠门的位置，吃到一半才把礼物拿出来，是一只用旧布缝的针插。{newPartner}把针插放在窗台上，说以后这个家就用它；{subject}看见{stepchild}低头笑了一下。',
        significance: 0.86,
        fx: [
          {
            cash: -12,
            relation: [
              ['newPartner', 'partner', 0.14, 0.12],
              ['stepchild', 'kin', 0.06, 0.04],
            ],
            role: 'married',
            loseRole: 'widow',
            flag: 'remarried',
          },
          {
            raw: [
              {
                type: 'household',
                personId: '$newPartner',
                householdId: '$household',
                reason: 'remarried and moved in',
              },
            ],
          },
        ],
        followup: { sceneId: 'r14-fam.stepson-plate', delayMonths: 6 },
      },
      {
        id: 'child-objects',
        w: 0.35,
        text: '{stepchild}把请帖推回来，说父亲的照片还挂在墙上，家里不该再进一个外人。{subject}解释了很久，{newPartner}在门口听见，最后说日子可以往后推。请帖没有发出去，{subject}把烫金的字翻过去压在抽屉底，照片仍旧挂在原处。',
        significance: 0.76,
        fx: {
          cash: -2,
          relation: [
            ['stepchild', 'rival', -0.12, 0],
            ['newPartner', 'partner', 0.04, 0.02],
          ],
          condition: 'remarriage_conflict',
          flag: 'wedding_postponed_for_child',
          mood: -0.08,
        },
      },
      {
        id: 'registry-office-only',
        w: 0.25,
        text: '{subject}和{newPartner}只去了登记处，证人是楼下卖菜的女人。回到家里，{stepchild}已经把饭做好，桌上摆了三副碗筷，没有多问。{newPartner}把行李放进柜子，{subject}发现柜里还留着前一个人的位置，谁也没有去动。',
        significance: 0.8,
        fx: [
          {
            cash: -5,
            relation: [
              ['newPartner', 'partner', 0.08, 0.08],
              ['stepchild', 'kin', 0.04, 0.02],
            ],
            role: 'married',
            loseRole: 'widow',
            flag: 'quiet_remarriage',
          },
          {
            raw: [
              {
                type: 'household',
                personId: '$newPartner',
                householdId: '$household',
                reason: 'registered a quiet second marriage',
              },
            ],
          },
        ],
        followup: { sceneId: 'r14-fam.stepson-plate', delayMonths: 6 },
      },
    ],
    task: taskMeta('family', ['family', 'belonging'], ['belonging'], 0.72, 0.3, ['social']),
  },

  // 37 · stepfamily rules ------------------------------------------------
  {
    id: 'r14-fam.stepdaughter-satchel',
    title: '继子女的书包',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [30, 64],
    tags: ['task', 'family', 'stepfamily', 'stepfamily_conflict', 'school'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [{ kind: 'history', tag: 'stepfamily_conflict', minCount: 1 }],
    roles: {
      stepchild: returning('neighbor', {
        minAge: 7,
        maxAge: 20,
        sharedHistoryTag: 'stepfamily_conflict',
      }),
      partner: ['partner', { minAge: 30, maxAge: 66 }],
    },
    outcomes: [
      {
        id: 'satchel-bought',
        w: 0.4,
        text: '{subject}用六克朗买了一只帆布书包，里面放好铅笔和一块橡皮。{stepchild}接过去，先看包扣，再看{partner}的脸色；{partner}点头，孩子才把书包背上。第二天放学，书包带断了一边，{stepchild}用绳子系着回来，说还能用。',
        significance: 0.72,
        fx: {
          cash: -6,
          relation: [
            ['stepchild', 'kin', 0.08, 0.06],
            ['partner', 'partner', 0.04, 0],
          ],
          flag: 'stepchild_accepted_school',
          mood: 0.04,
        },
      },
      {
        id: 'runs-to-the-station',
        w: 0.35,
        text: '{stepchild}把书包塞进床底，说这个家没有一件东西是自己的，要去火车站找亲爹。{subject}追到街口，只看见路灯下一只跑掉的鞋。半夜，{partner}在候车室把人找回来；{stepchild}进门时没有看{subject}，把那只鞋踢到墙角。',
        significance: 0.82,
        fx: {
          cash: -2,
          relation: [
            ['stepchild', 'rival', -0.16, 0],
            ['partner', 'partner', -0.06, 0],
          ],
          condition: 'stepfamily_conflict',
          flag: 'stepchild_ran_away',
          mood: -0.14,
          raw: [
            {
              type: 'move',
              personId: '$stepchild',
              locationId: '@station',
              reason: 'ran away to look for the absent parent',
            },
          ],
        },
      },
      {
        id: 'rules-on-the-kitchen-door',
        w: 0.25,
        text: '{subject}把三条规矩写在纸上，贴在厨房门后：放学先回家，吃完饭再出门，衣柜最上一层归{stepchild}。{stepchild}看完，拿铅笔在最后一条下面画了一道线，说还要加一条“不许翻我的抽屉”。{subject}说好，两个人都在纸上签了名。',
        significance: 0.7,
        fx: {
          relation: ['stepchild', 'colleague', 0.08, 0.04],
          flag: 'stepfamily_rules',
          knowledge: ['the stepchild wants a drawer that nobody opens', 0.8, 'stepchild'],
        },
      },
    ],
    task: taskMeta('family', ['family'], ['belonging'], 0.66, 0.25, ['social']),
  },

  // 38 · write to an estranged child -------------------------------------
  {
    id: 'r14-fam.letter-to-daughter',
    title: '写给孩子的信',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [45, 80],
    tags: ['task', 'family', 'estrangement', 'children', 'letter'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [{ kind: 'history', tag: 'estrangement', minCount: 1 }],
    roles: {
      child: returning('neighbor', {
        minAge: 18,
        maxAge: 40,
        sharedHistoryTag: 'estrangement',
      }),
    },
    outcomes: [
      {
        id: 'answer-comes',
        w: 0.4,
        text: '{subject}写了四页，最后只寄出一页，留下地址和一句“若不愿意，不必回”。第十天，邮差送来一张明信片，上面只有一行字和一个新的门牌号。{subject}把明信片放在窗台上，读了很多遍，才想起自己一直没有问对方这些年过得怎样。',
        significance: 0.74,
        fx: {
          mood: 0.1,
          relation: ['child', 'kin', 0.08, 0.06],
          flag: 'letter_answered',
          knowledge: ['the child has moved to a new address', 0.85, 'child'],
        },
      },
      {
        id: 'returned-without-a-word',
        w: 0.35,
        text: '信退回来时，封口还是湿的，像是被人捏过。{subject}把信放在桌上，过了很久才拆开自己的那页，发现里面夹着的照片被抽走了，只剩一个方形的白印。{subject}把信重新折好，放回抽屉，没有再写第二封。',
        significance: 0.72,
        fx: {
          mood: -0.16,
          condition: 'estrangement',
          flag: 'letter_refused',
          relation: ['child', 'acquaintance', -0.04, 0],
        },
      },
      {
        id: 'a-visit-without-words',
        w: 0.25,
        text: '{child}在一个下雨的下午来了，站在门口，手里提着一袋煤。两人把煤搬进厨房，{subject}烧水，{child}修好了漏风的窗扣。茶凉了，谁也没有提那封信；{child}走时把门带上，{subject}听见脚步在楼梯拐角停了一下。',
        significance: 0.68,
        fx: {
          relation: ['child', 'acquaintance', 0.04, 0.04],
          flag: 'silent_visit',
          mood: 0.02,
        },
      },
    ],
    task: taskMeta('family', ['family'], ['belonging'], 0.58, 0.2, ['literacy']),
  },

  // 39 · funeral expenses and the headstone ------------------------------
  {
    id: 'r14-fam.headstone-date',
    title: '墓碑上的空日期',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [28, 72],
    tags: ['task', 'family', 'parent_death', 'funeral', 'grief'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [{ kind: 'history', tag: 'parent_death', minCount: 1, withinYears: 3 }],
    roles: {
      sibling: returning('sibling', {
        minAge: 22,
        maxAge: 74,
        sharedHistoryTag: 'parent_death',
      }),
      mason: ['worker', { minAge: 28, maxAge: 70 }],
    },
    outcomes: [
      {
        id: 'stone-with-both-dates',
        w: 0.4,
        text: '{mason}把石板样品摆在院子里，说刻名字和两个日期要十八克朗。{subject}和{sibling}对看了一眼，把老人的生日从教区簿上抄下来，又把忌日核对了三遍。刻好那天，石粉落在黑布上，像一层薄霜；{sibling}伸手把最后一道灰拂掉。',
        significance: 0.78,
        fx: {
          cash: -18,
          relation: ['sibling', 'colleague', 0.06, 0],
          flag: 'headstone_erected',
          mood: -0.04,
          knowledge: ['the headstone carries both the birth and death dates', 0.8, 'mason'],
        },
      },
      {
        id: 'wooden-cross-for-now',
        w: 0.35,
        text: '{subject}只买了一块四克朗的木牌，用墨水写上名字，插在土里。{sibling}说这样撑不过一个冬天，{subject}说等手头松了再换石头。开春后木牌果然歪了，字迹被雪水泡开，只剩一个模糊的姓。',
        significance: 0.68,
        fx: {
          cash: -4,
          mood: -0.1,
          condition: 'temporary_grave',
          flag: 'wooden_cross',
          relation: ['sibling', 'acquaintance', 0.02, 0],
        },
      },
      {
        id: 'grave-left-unmarked',
        w: 0.25,
        text: '{subject}把刻碑的钱先交了房租，想等下个季度再说。墓园管理处来催了两次，最后在土上插了一根木条，写着编号。{sibling}去看了一次，回来问名字什么时候能刻上；{subject}说不会忘，可那个季度过去后，木条也被人拔走了。',
        significance: 0.7,
        fx: {
          cash: -1,
          mood: -0.12,
          condition: 'unmarked_grave',
          flag: 'grave_unmarked',
          relation: ['sibling', 'rival', -0.06, 0],
        },
      },
    ],
    task: taskMeta('family', ['family'], ['belonging'], 0.55, 0.1, ['craft']),
  },

  // 40 · keep the family shop afloat -------------------------------------
  {
    id: 'r14-fam.counter-ledger',
    title: '柜台后的欠账本',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [24, 66],
    tags: ['task', 'work', 'family_business', 'family_debt', 'shop'],
    contexts: URBAN,
    milieus: COUNTER,
    conditions: [{ kind: 'history', tag: 'family_business', minCount: 1 }],
    roles: {
      sibling: returning('sibling', {
        minAge: 20,
        maxAge: 68,
        sharedHistoryTag: 'family_business',
      }),
    },
    outcomes: [
      {
        id: 'loan-signed',
        w: 0.4,
        text: '银行的办事员把贷款合同推过来，说二十克朗分十二个月还，铺面做抵押。{subject}逐条读完，在最后一页签了名；{sibling}在旁边按了手印。钱到账那天，两人先进了一批面粉和糖，又把欠账本上最老的三笔划掉。晚上关店时，柜台底下多了一把新锁。',
        significance: 0.8,
        fx: {
          cash: 20,
          relation: ['sibling', 'colleague', 0.06, 0],
          condition: 'business_debt',
          flag: 'shop_loan',
          knowledge: ['the shop is mortgaged against a twelve-month loan', 0.9],
        },
        followup: { sceneId: 'r14-fam.note-from-1908', delayMonths: 8 },
      },
      {
        id: 'stock-sold-cheap',
        w: 0.35,
        text: '{subject}把货架后面积压的罐头和蜡烛搬去市场，按半价盘给一个摊主。{sibling}心疼得直咂嘴，说那些罐头再放半年也不坏。换回的八克朗先付了煤钱，柜台上的空位没有补货，只用一张旧报纸铺着，客人来了就问有没有便宜的面粉。',
        significance: 0.7,
        fx: {
          cash: 8,
          relation: ['sibling', 'colleague', -0.02, 0],
          flag: 'sold_stock_cheap',
          mood: -0.06,
        },
      },
      {
        id: 'shutters-closed',
        w: 0.25,
        text: '{subject}算到半夜，发现欠账已经比货架上的东西还多，第二天没有卸门板。{sibling}来敲门，{subject}把账本从门缝里递出去，说谁愿意接就接。月底，铺面退了租，旧柜台被拆成木板；{subject}留下那本欠账本，第一页上还有长辈的笔迹。',
        significance: 0.84,
        fx: {
          cash: -8,
          relation: ['sibling', 'rival', -0.1, 0],
          unemployment: 'family shop closed',
          flag: 'closed_family_shop',
          mood: -0.16,
        },
      },
    ],
    task: taskMeta('work', ['work', 'status'], ['cash'], 0.7, 0.4, ['numeracy', 'social']),
  },

  // 41 · send for the left-behind child ----------------------------------
  {
    id: 'r14-fam.train-ticket-for-child',
    title: '给乡下孩子的车票',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [26, 58],
    tags: ['task', 'family', 'family_departure', 'left_behind_child', 'reunion'],
    contexts: URBAN,
    milieus: OFFICE,
    conditions: [{ kind: 'history', tag: 'family_departure', minCount: 1 }],
    roles: {
      child: returning('neighbor', {
        minAge: 6,
        maxAge: 18,
        sharedHistoryTag: 'family_departure',
      }),
      clerk: ['official', { minAge: 28, maxAge: 74 }],
    },
    outcomes: [
      {
        id: 'child-arrives',
        w: 0.4,
        text: '{subject}在车站窗口买了票，又去户籍处办了一张监护证明。{child}下车时穿着一件短了一截的外套，手里提着装苹果的纸袋。{subject}想接过来，孩子先把纸袋递给了{clerk}，才认出人来；站台上的钟正好敲了四下。',
        significance: 0.84,
        fx: [
          {
            cash: -12,
            relation: ['child', 'kin', 0.12, 0.08],
            flag: 'child_reunited',
            mood: 0.08,
          },
          {
            raw: [
              {
                type: 'household',
                personId: '$child',
                householdId: '$household',
                reason: 'sent for the child left in the countryside',
              },
            ],
          },
        ],
        followup: { sceneId: 'r14-fam.chalk-on-coat', delayMonths: 24 },
      },
      {
        id: 'papers-refused',
        w: 0.35,
        text: '{clerk}说监护证明上缺一个生父的签名，孩子不能迁户口。{subject}解释说人早就没了消息，{clerk}只把表格推回来，说那就去法院。{child}在长凳上等到关门，最后跟姑母回了乡下；站台上的纸袋留在座位底下，苹果滚出来一个。',
        significance: 0.78,
        fx: {
          cash: -3,
          condition: 'family_separated',
          flag: 'reunion_blocked',
          mood: -0.14,
          relation: ['child', 'kin', 0.02, 0.02],
        },
      },
      {
        id: 'child-will-not-come',
        w: 0.25,
        text: '车票寄过去半个月，回信只有两行：姑母年纪大了，地里的活走不开。{subject}又寄了第二张票，这次附上一件新外套；信退回来，外套被留下了。{subject}把票放在窗台上，直到日期过期，才拿去车站退了半价。',
        significance: 0.76,
        fx: {
          cash: -2,
          relation: ['child', 'acquaintance', -0.08, 0.02],
          condition: 'estrangement',
          flag: 'child_refused_reunion',
          mood: -0.12,
        },
      },
    ],
    task: taskMeta('family', ['family'], ['belonging'], 0.72, 0.3, ['social']),
  },

  // 42 · school for a disabled child -------------------------------------
  {
    id: 'r14-fam.school-steps',
    title: '学校门前的台阶',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [24, 58],
    tags: ['task', 'family', 'disability', 'disabled_child_care', 'school'],
    contexts: URBAN,
    milieus: [...HOME, 'school', 'education', 'teacher'],
    conditions: [{ kind: 'history', tag: 'disabled_child_care', minCount: 1 }],
    roles: {
      child: returning('neighbor', {
        minAge: 5,
        maxAge: 15,
        sharedHistoryTag: 'disabled_child_care',
      }),
    },
    outcomes: [
      {
        id: 'school-admits',
        w: 0.4,
        text: '学校的老师看了看{child}的铁支架，又看了看门口那六级台阶，说可以先在一楼上课。{subject}当场答应每天背孩子进出，老师让校工把旧课桌锯短了一条腿。第一天放学，{child}把写满字的石板举给{subject}看，石板上还留着手心的汗印。',
        significance: 0.74,
        fx: {
          cash: -2,
          relation: ['child', 'kin', 0.08, 0.06],
          flag: 'child_school_admitted',
          knowledge: ['the school will keep the child on the ground floor', 0.85],
        },
      },
      {
        id: 'headmaster-refuses',
        w: 0.35,
        text: '校长在办公室里说，学校没有看护残疾孩子的条件，楼梯也太陡。一位老师替{child}说了两句，被校长抬手打断。{subject}牵着孩子走下台阶，{child}一瘸一拐，铁支架在石阶上磕出空响；回家后，{subject}把课本收进箱子，没有说学校不要人。',
        significance: 0.76,
        fx: {
          relation: ['child', 'kin', 0.04, 0.04],
          condition: 'school_exclusion',
          flag: 'school_refused_child',
          mood: -0.12,
        },
      },
      {
        id: 'lessons-at-the-kitchen-table',
        w: 0.25,
        text: '{subject}从旧货摊买回一本识字课本和半盒粉笔，每天收工后在厨房教{child}写自己的名字。{child}写得慢，粉笔断了两根；{subject}把断头收进铁盒，说攒够了可以磨成粉再压一支。窗外有孩子背着书包跑过，两人都没有抬头。',
        significance: 0.68,
        fx: {
          cash: -5,
          skill: { literacy: 0.02 },
          relation: ['child', 'kin', 0.1, 0.06],
          flag: 'home_schooling',
          mood: 0.02,
        },
      },
    ],
    task: taskMeta('family', ['family', 'care'], ['belonging'], 0.64, 0.2, ['literacy']),
  },

  // 43 · pay an old family debt ------------------------------------------
  {
    id: 'r14-fam.old-creditor',
    title: '旧债主的名片',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [28, 72],
    tags: ['task', 'family', 'family_debt', 'obligation'],
    contexts: URBAN,
    milieus: OFFICE,
    conditions: [{ kind: 'history', tag: 'family_debt', minCount: 1, withinYears: 25 }],
    roles: {
      creditor: ['neighbor', { minAge: 48, maxAge: 88 }],
      sibling: returning('sibling', {
        minAge: 24,
        maxAge: 72,
        sharedHistoryTag: 'family_business',
      }),
    },
    outcomes: [
      {
        id: 'paid-in-full',
        w: 0.4,
        text: '{creditor}从名片夹后面抽出一张发黄的欠条，说利息按老规矩算，一共二十四克朗。{subject}和{sibling}把存款取空，又添上这个月的工钱，才把钱点齐。{creditor}在欠条上画了一道横线，说两清了；{subject}把那张纸带回家，烧在炉子里。',
        significance: 0.8,
        fx: {
          cash: -24,
          relation: [
            ['creditor', 'acquaintance', 0.1, 0],
            ['sibling', 'colleague', 0.04, 0],
          ],
          flag: 'old_debt_paid',
          mood: 0.04,
        },
      },
      {
        id: 'installments-agreed',
        w: 0.35,
        text: '{creditor}不肯免息，但同意每月还六克朗，分四个月还清。{subject}在日历上把四个日子圈出来，{sibling}在旁边写上“别忘”。第一个月还钱时，{creditor}把收据写在旧账本背面，墨迹压着父亲当年的签名，像是两代人挤在同一行里。',
        significance: 0.72,
        fx: {
          cash: -6,
          condition: 'debt_installments',
          flag: 'debt_installments',
          relation: ['creditor', 'acquaintance', 0.04, 0],
          knowledge: ['the old debt will be cleared in four monthly payments', 0.85, 'creditor'],
        },
      },
      {
        id: 'creditor-waives-it',
        w: 0.25,
        text: '{creditor}把欠条推回来，说当年借出去的钱早就从别处赚回来了，留着这张纸只是怕人忘了。{subject}问要不要写个收据，{creditor}摇头，只让{sibling}把欠条撕成两半。纸屑落在桌上，{subject}忽然觉得那笔钱比想象中轻。',
        significance: 0.74,
        fx: {
          relation: [
            ['creditor', 'friend', 0.12, 0.04],
            ['sibling', 'colleague', 0.06, 0],
          ],
          flag: 'debt_forgiven',
          mood: 0.1,
        },
      },
    ],
    task: taskMeta('family', ['status'], ['status'], 0.55, 0.3, ['numeracy']),
  },

  // 44 · win over the parents --------------------------------------------
  {
    id: 'r14-fam.matchmaker-again',
    title: '媒人第二次上门',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [19, 38],
    tags: ['task', 'family', 'courtship', 'parental_objection', 'marriage'],
    contexts: URBAN,
    milieus: SOCIAL,
    conditions: [
      { kind: 'history', tag: 'secret_courtship', minCount: 1, minYearsAgo: 1 },
      { kind: 'notHasRole', role: 'married' },
    ],
    roles: {
      beloved: returning('partner', {
        minAge: 19,
        maxAge: 40,
        sex: 'opposite',
        sharedHistoryTag: 'secret_courtship',
      }),
      mother: ['parent', { minAge: 40, maxAge: 76, sex: 'female' }],
    },
    outcomes: [
      {
        id: 'mother-relents',
        w: 0.4,
        text: '媒人第二次上门时，{mother}先问{beloved}的工钱，又问学徒还有几年出师。{beloved}把工票和师傅的担保信放在桌上，说婚后先住在后院那间小屋。{mother}看完信，去柜里取出一对银耳环，放在{beloved}手边，说定亲可以，婚礼要等秋天。',
        significance: 0.82,
        fx: {
          cash: -4,
          relation: [
            ['mother', 'kin', 0.12, 0.04],
            ['beloved', 'partner', 0.1, 0.12],
          ],
          role: 'engaged',
          flag: 'parental_consent_won',
          knowledge: ['the mother will consent if the wedding waits until autumn', 0.85, 'mother'],
        },
      },
      {
        id: 'refused-again',
        w: 0.35,
        text: '{mother}把媒人带来的点心原样推回去，说同一门亲事说两遍也不会变。{beloved}在门外听见，把帽子捏在手里，没有进来。{subject}送到巷口，{beloved}说要不就算了；{subject}没有答，只把对方衣领上的一根线头摘掉。',
        significance: 0.74,
        fx: {
          cash: -2,
          relation: [
            ['mother', 'rival', -0.18, 0],
            ['beloved', 'acquaintance', -0.04, 0.04],
          ],
          condition: 'forbidden_match',
          flag: 'consent_refused_again',
          mood: -0.14,
        },
      },
      {
        id: 'wedding-without-blessing',
        w: 0.25,
        text: '{subject}没有等媒人说完，回屋收了两件衣服，和{beloved}在登记处碰头。证婚人是从车间拉来的工友，戒指是铜的。晚上两人在小屋里煮了一锅面，{mother}没有来，只托人送来一床旧被子；{subject}把被子铺在床上，发现被角绣着自己的小名。',
        significance: 0.86,
        fx: [
          {
            cash: -8,
            relation: [
              ['beloved', 'partner', 0.16, 0.14],
              ['mother', 'kin', -0.16, 0],
            ],
            role: 'married',
            flag: 'married_without_blessing',
          },
          {
            raw: [
              {
                type: 'household',
                personId: '$beloved',
                householdId: '$household',
                reason: 'married without the mother’s blessing',
              },
            ],
          },
        ],
      },
    ],
    task: taskMeta('family', ['family', 'belonging'], ['belonging'], 0.75, 0.3, ['social']),
  },

  // 45 · truce with the mother-in-law ------------------------------------
  {
    id: 'r14-fam.mother-in-law-soup',
    title: '长辈的汤碗',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [26, 60],
    tags: ['task', 'family', 'in_law_conflict', 'care', 'household'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [{ kind: 'history', tag: 'in_law_conflict', minCount: 1, minYearsAgo: 2 }],
    roles: {
      motherInLaw: returning('neighbor', {
        minAge: 55,
        maxAge: 88,
        sex: 'female',
        sharedHistoryTag: 'in_law_conflict',
      }),
      partner: ['partner', { minAge: 26, maxAge: 62 }],
    },
    outcomes: [
      {
        id: 'soup-at-the-same-table',
        w: 0.4,
        text: '{subject}把汤端到{motherInLaw}面前，先给自己盛了半碗，坐在对面喝完。{motherInLaw}尝了一口，说盐放早了；{subject}没有争，只把盐罐推过去。{partner}回来时看见两人还在桌边，汤已经凉了，碗底剩着同一块胡萝卜。',
        significance: 0.74,
        fx: {
          relation: [
            ['motherInLaw', 'kin', 0.12, 0.06],
            ['partner', 'partner', 0.06, 0.04],
          ],
          flag: 'in_law_truce',
          mood: 0.06,
        },
      },
      {
        id: 'bowl-on-the-floor',
        w: 0.35,
        text: '{motherInLaw}说汤里有股锅底味，{subject}把碗收回灶台，手一滑，碗摔在地上。两人都愣住了，{partner}从里屋出来，看见地上的汤正往门槛下流。{motherInLaw}弯腰去捡碎片，{subject}先一步蹲下，手指被划了一道，谁也没有先开口。',
        significance: 0.72,
        fx: {
          cash: -1,
          health: -0.02,
          relation: ['motherInLaw', 'rival', -0.16, 0],
          condition: 'household_tension',
          flag: 'in_law_quarrel',
          mood: -0.1,
        },
      },
      {
        id: 'she-asks-for-help',
        w: 0.25,
        text: '{motherInLaw}喝完汤，把碗推到桌中间，说房东又要涨租，自己那份养老金不够。{subject}问要多少，{motherInLaw}说六克朗，又补一句“不白拿”。{subject}把钱数出来，{motherInLaw}从口袋里掏出一张写着借款日期的纸，字迹抖得厉害。',
        significance: 0.76,
        fx: {
          cash: -6,
          relation: ['motherInLaw', 'kin', 0.08, 0.02],
          condition: 'caring_for_in_law',
          flag: 'in_law_needs_care',
          knowledge: ['the mother-in-law’s pension no longer covers her rent', 0.8, 'motherInLaw'],
        },
      },
    ],
    task: taskMeta('family', ['family'], ['belonging'], 0.6, 0.2, ['social']),
  },
]);
