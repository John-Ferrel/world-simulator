import type { PlotKernel } from '../../../composition/types.js';
import { recipes } from './kit.js';

/**
 * Phase 13 · relationship-chain Event recipes.
 *
 * The chain is deliberate: a first contact creates an acquaintance, a test or a
 * betrayal changes its kind, courtship creates a partner relation, cohabitation
 * and marriage move a real household, childbirth and conflict change roles and
 * conditions, and separation/divorce/widowhood end or re-form the bond. Prose is
 * the index; the typed relation/role/household/interaction effects are the state.
 *
 * Interaction effects are used where a real answer must be committed later
 * (betrothal, a rival's request). They are resolved by the ordinary engine
 * interaction pass, never by narration.
 */

const URBAN = ['vienna', 'urban', 'peace', 'industrial', 'war', 'postwar', 'reform', 'crisis'];
const WIDE = [
  'vienna',
  'urban',
  'peace',
  'industrial',
  'war',
  'postwar',
  'reform',
  'crisis',
  'scarcity',
  'rural',
  'small_town',
];
const HOME = ['home', 'family', 'neighbor', 'poverty', 'everyday'];
const WORK = ['work', 'factory', 'print', 'craft', 'foreman', 'injury', 'union'];
const SHOP = ['work', 'shop', 'market', 'merchant', 'customer'];
const CAFE = ['culture', 'cafe', 'art', 'writing', 'debate'];
const HOSPITAL = ['health', 'medicine', 'hospital', 'doctor', 'care'];
const GOVERNMENT = ['official', 'bureaucracy', 'state', 'papers', 'public_service'];
const FARM = ['farm', 'vineyard', 'rural', 'land', 'seasonal_work'];
const ARMY = ['war', 'army', 'soldier', 'front', 'mobilization'];
const UNIVERSITY = ['university', 'student', 'research', 'writing', 'teacher'];

export const BATCH13_RELATIONSHIP_EVENTS: PlotKernel[] = recipes([
  // 1 ─ first contact at work ────────────────────────────────────────────────
  {
    id: 'r13-rel.first-meeting-work',
    title: '午饭钟响过以后',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [16, 60],
    tags: ['relationship', 'work', 'acquaintance', 'first_meeting', 'social'],
    contexts: URBAN,
    milieus: WORK,
    conditions: [{ kind: 'employment', employed: true }],
    roles: {
      mate: ['worker', { minAge: 16, maxAge: 60 }],
    },
    outcomes: [
      {
        id: 'shared-bread',
        w: 0.4,
        text: '{subject}在午休的汽笛声里坐到{mate}对面，把自己的面包掰了一半。{mate}没有客气，先从口袋里掏出一小撮盐。两个人交换了名字和工位号，机器重新转起来时，{subject}记住了那只沾着油墨的手。',
        significance: 0.58,
        fx: {
          relation: ['mate', 'acquaintance', 0.08, 0.02],
          role: 'work_acquaintance',
          skill: { social: 0.01 },
        },
      },
      {
        id: 'held-the-guard',
        w: 0.35,
        text: '{subject}的扳手卡在滚筒下面，{mate}伸手替{subjectPronoun}顶住护罩，手背被铁边划开一道口子。{subject}撕下衬衣下摆给{mate}缠上，{mate}说这机器认人，不认工票。下班时两人一起在洗手池边搓掉手上的墨。',
        significance: 0.62,
        fx: {
          relation: ['mate', 'colleague', 0.1, 0],
          role: 'workmate',
          flag: 'owes_workmate',
          knowledge: ['the press has a loose guard on the night shift', 0.7, 'mate'],
        },
      },
      {
        id: 'spoiled-the-proof',
        w: 0.25,
        when: { maxCash: 2 },
        text: '{subject}把{mate}递来的油壶当成玩笑，手一偏，油洒在当班的样张上。{mate}退后一步，让工头看清是谁的手。{subject}被扣了半天工钱，午饭时一个人坐在楼梯上，听见车间里有人在笑。',
        significance: 0.54,
        fx: {
          cash: -2,
          relation: ['mate', 'acquaintance', -0.04, 0],
          mood: -0.06,
          flag: 'bad_first_shift',
        },
      },
    ],
    variants: [
      {
        id: 'first-meeting-work-war',
        when: { contextTags: ['war'] },
        title: '战时的排字房',
        outcomes: [
          {
            id: 'shared-shift-under-shortage',
            w: 0.55,
            text: '战争把男人从排字房一批批抽走，{subject}和{mate}被编到同一张字架前。两人把铅字按字号排成两列，谁的手指慢一点，另一个就把蜡烛往那边挪一寸。下班时，两人共用一只手套走过结冰的院子。',
            significance: 0.62,
            fx: {
              relation: ['mate', 'colleague', 0.12, 0],
              role: 'war_workmate',
              cash: 1,
            },
          },
          {
            id: 'cellar-during-air-raid',
            w: 0.45,
            text: '空袭警报响时，{subject}和{mate}躲进地下室，{mate}把最后一截蜡烛分给{subject}。警报解除后，两人在楼梯上坐了很久，谁也没有先站起来。第二天，{mate}把{subject}的名字写进了同一班的排班表。',
            significance: 0.66,
            fx: {
              relation: ['mate', 'friend', 0.1, 0.04],
              role: 'air_raid_friend',
              flag: 'shared_air_raid_shelter',
            },
          },
        ],
      },
    ],
    baseRate: 0.06,
    cooldownYears: 3,
  },

  // 2 ─ first meeting at a dance ─────────────────────────────────────────────
  {
    id: 'r13-rel.first-meeting-dance',
    title: '舞曲换了第三支',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [17, 35],
    tags: ['relationship', 'dance', 'courtship', 'acquaintance', 'leisure'],
    contexts: ['vienna', 'urban', 'peace', 'postwar', 'reform', 'crisis'],
    milieus: [...CAFE, 'home', 'neighbor'],
    roles: {
      dancer: ['neighbor', { minAge: 17, maxAge: 35, sex: 'opposite' }],
    },
    outcomes: [
      {
        id: 'stepped-on-the-shoe',
        w: 0.4,
        text: '{subject}在舞曲换拍时踩了{dancer}的鞋尖。{dancer}没有抽回脚，只低声数着拍子，把{subject}带回节奏里。乐队停下来收钱时，两人还站在舞池边上，手心都是汗。',
        significance: 0.6,
        fx: {
          cash: -1,
          relation: ['dancer', 'acquaintance', 0.06, 0.1],
          role: 'dance_acquaintance',
        },
      },
      {
        id: 'walked-her-home',
        w: 0.35,
        text: '{subject}送{dancer}走到巷口，路灯下只剩一只猫。{dancer}说明天还来，{subject}说票太贵。{dancer}从手袋里摸出一张折过的票根塞给{subjectPronoun}，说这张不用再买。',
        significance: 0.64,
        fx: {
          relation: ['dancer', 'friend', 0.05, 0.12],
          role: 'walked_home',
          reputation: 0.02,
        },
      },
      {
        id: 'next-dance-taken',
        w: 0.25,
        when: { maxCash: 1 },
        text: '{subject}的手刚伸到{dancer}腰后，{dancer}就退开半步，说下一支曲子已经有人订了。{subject}站在乐队旁边把一杯温啤酒喝完，鞋底粘着别人洒下的糖水。',
        significance: 0.52,
        fx: {
          relation: ['dancer', 'acquaintance', -0.04, 0],
          mood: -0.08,
          flag: 'refused_dance',
        },
      },
    ],
    variants: [
      {
        id: 'first-meeting-dance-postwar',
        when: { contextTags: ['postwar', 'crisis'] },
        title: '借来的舞鞋',
        outcomes: [
          {
            id: 'borrowed-shoes',
            w: 0.55,
            text: '战后的舞会在一间改成礼堂的仓库里举行。{subject}的鞋是向邻居借的，大了一指；{dancer}把自己的鞋带解下来，替{subject}把鞋后跟绑紧。两人跳完一支，谁也没提仓库漏雨的屋顶。',
            significance: 0.64,
            fx: {
              cash: -1,
              relation: ['dancer', 'acquaintance', 0.08, 0.12],
              role: 'borrowed_shoes',
            },
          },
          {
            id: 'left-with-a-soldier',
            w: 0.45,
            text: '音乐停时，{dancer}被一个穿旧军装的人接走。{subject}把借来的鞋擦干净，第二天还回去时，鞋底已经磨穿了一个洞。邻居问舞会怎么样，{subject}说乐队还行。',
            significance: 0.5,
            fx: {
              relation: ['dancer', 'acquaintance', -0.02, 0],
              mood: -0.06,
              flag: 'borrowed_shoes_returned',
            },
          },
        ],
      },
    ],
    baseRate: 0.05,
    cooldownYears: 2,
  },

  // 3 ─ introduction by a friend ────────────────────────────────────────────
  {
    id: 'r13-rel.introduction-friend',
    title: '朋友家的第三把椅子',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [16, 45],
    tags: ['relationship', 'introduction', 'friend', 'acquaintance', 'social'],
    contexts: WIDE,
    milieus: [...HOME, ...CAFE, ...SHOP],
    roles: {
      friend: ['neighbor', { minAge: 16, maxAge: 60 }],
      newcomer: ['neighbor', { minAge: 16, maxAge: 45 }],
    },
    outcomes: [
      {
        id: 'talked-until-the-stove-died',
        w: 0.4,
        text: '{friend}把{newcomer}领到桌边，说这是自己厂里最能熬夜的人。{subject}给{newcomer}倒了半杯咖啡，{newcomer}先问{subject}上哪个班。三人聊到炉子熄了，{friend}借口去买烟，把位置留给两个人。',
        significance: 0.62,
        fx: {
          relation: [
            ['newcomer', 'acquaintance', 0.1, 0.06],
            ['friend', 'friend', 0.05, 0],
          ],
          role: 'introduced',
        },
      },
      {
        id: 'two-silent-ends',
        w: 0.35,
        when: { skill: { name: 'social', max: 0.35 } },
        text: '{friend}介绍完就去厨房帮忙，桌上只剩{subject}和{newcomer}。{newcomer}盯着墙上的圣像，{subject}数着桌布上的补丁。十分钟后{friend}回来，看见两人各坐一头，笑得有点勉强。',
        significance: 0.5,
        fx: {
          relation: ['newcomer', 'acquaintance', 0.02, 0],
          mood: -0.03,
        },
      },
      {
        id: 'saw-the-real-motive',
        w: 0.25,
        when: { maxCash: 3 },
        text: '{friend}在送{newcomer}出门时压低声音，说{subject}手头紧，但人可靠。{subject}在门后听见，才明白这顿饭是替谁借的钱。{newcomer}走后，{subject}把碗洗了三遍，没有问{friend}。',
        significance: 0.6,
        fx: {
          relation: [
            ['friend', 'friend', -0.08, 0],
            ['newcomer', 'acquaintance', 0.04, 0],
          ],
          flag: 'saw_through_introduction',
          knowledge: ['the friend arranged the dinner to ask for a loan', 0.7],
        },
      },
    ],
    variants: [
      {
        id: 'introduction-friend-rural',
        when: { contextTags: ['rural', 'small_town'] },
        title: '集市上的介绍',
        outcomes: [
          {
            id: 'apples-at-the-stall',
            w: 0.55,
            text: '集市散了一半，{friend}才把{newcomer}领到{subject}的摊前，说两家住得不远。{newcomer}捏了捏{subject}摊上的苹果，问是不是自家园子的。旁边卖布的女人一直看着，{friend}把声音压得更低。',
            significance: 0.58,
            fx: {
              relation: [
                ['newcomer', 'acquaintance', 0.06, 0.04],
                ['friend', 'friend', 0.04, 0],
              ],
              role: 'market_introduction',
            },
          },
          {
            id: 'straightened-the-carrying-pole',
            w: 0.45,
            text: '回村的路上，{friend}说{newcomer}家的地挨着河，嫁过去不用挑水。{subject}没有接话，只看见{newcomer}在岔路口停下来，替{subjectPronoun}把歪掉的扁担扶正。',
            significance: 0.64,
            fx: {
              relation: ['newcomer', 'friend', 0.05, 0.08],
              role: 'courting',
            },
          },
        ],
      },
    ],
    baseRate: 0.05,
    cooldownYears: 3,
  },

  // 4 ─ neighbourly help ────────────────────────────────────────────────────
  {
    id: 'r13-rel.neighborly-help',
    title: '借来的煤与一只手',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [18, 70],
    tags: ['relationship', 'neighbor', 'help', 'obligation', 'illness'],
    contexts: ['vienna', 'urban', 'war', 'postwar', 'crisis', 'reform', 'industrial'],
    milieus: [...HOME, ...HOSPITAL],
    roles: {
      neighbor: ['neighbor', { minAge: 18, maxAge: 75 }],
    },
    outcomes: [
      {
        id: 'coal-and-fever-powder',
        w: 0.4,
        text: '{neighbor}家的孩子烧了两夜，{subject}把自家的煤分了一半，又去药房赊了一包退烧粉。{neighbor}在门口接过药时手一直抖，说这钱一定要还。{subject}说先让孩子退烧，账以后再算。',
        significance: 0.66,
        fx: [
          {
            cash: -1,
            health: -0.02,
            role: 'obliged_neighbor',
            knowledge: ['the neighbor keeps a careful account of favours', 0.7, 'neighbor'],
          },
          {
            raw: [
              {
                type: 'relation',
                a: '$subject',
                b: '$neighbor',
                kind: 'friend',
                trust: 0.12,
                affection: 0.05,
                obligation: 0.08,
                reason: 'helped through a child’s fever',
              },
            ],
          },
        ],
      },
      {
        id: 'said-the-coal-was-short',
        w: 0.3,
        when: { maxCash: 2 },
        text: '{neighbor}来借煤时，{subject}说自家的煤也只够烧到周末。第二天，{neighbor}家的窗子一整天没有冒烟。{subject}在楼梯上遇见{neighbor}，两个人都往墙边让，谁也没先开口。',
        significance: 0.56,
        fx: {
          relation: ['neighbor', 'acquaintance', -0.06, 0],
          mood: -0.06,
          flag: 'refused_neighbor',
        },
      },
      {
        id: 'coal-at-the-door',
        w: 0.3,
        when: { maxCash: 1 },
        text: '大雪封了院子，{neighbor}把最后一筐煤搬进{subject}家，说自家还有柴。{subject}后来才知道，{neighbor}那晚烧的是旧家具。开春时，{subject}把第一笔工钱换成一袋煤，放在{neighbor}门口，没有留名字。',
        significance: 0.68,
        fx: {
          cash: 2,
          relation: ['neighbor', 'friend', 0.15, 0.04],
          role: 'grateful_neighbor',
        },
      },
    ],
    variants: [
      {
        id: 'neighborly-help-war',
        when: { contextTags: ['war', 'scarcity'] },
        title: '配给队里的位置',
        outcomes: [
          {
            id: 'place-in-the-queue',
            w: 0.5,
            text: '配给队从肉铺排到街角，{neighbor}把自己前面的位置让给{subject}，说家里还有半袋土豆。{subject}买完面包，回头看见{neighbor}重新排到队尾，围巾上落了一层雪。',
            significance: 0.66,
            fx: {
              cash: 1,
              relation: ['neighbor', 'friend', 0.12, 0.04],
              role: 'ration_queue_friend',
            },
          },
          {
            id: 'hid-the-extra-ration',
            w: 0.5,
            text: '巡警来查配给证时，{neighbor}把{subject}多领的一份藏进自己的篮子。{subject}事后要还，{neighbor}说等打完仗再算。两人把面包分着吃了，谁也没提那张证是谁的。',
            significance: 0.72,
            fx: {
              relation: ['neighbor', 'friend', 0.18, 0.06],
              role: 'shared_ration_risk',
              flag: 'shared_ration_risk',
              knowledge: ['the neighbor hid an extra ration during an inspection', 0.8, 'neighbor'],
            },
          },
        ],
      },
    ],
    baseRate: 0.06,
    cooldownYears: 2,
  },

  // 5 ─ shared lodging ──────────────────────────────────────────────────────
  {
    id: 'r13-rel.shared-lodging',
    title: '一张床与两条被子',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [18, 45],
    tags: ['relationship', 'housing', 'lodging', 'friend', 'poverty'],
    contexts: ['vienna', 'urban', 'war', 'postwar', 'crisis', 'industrial'],
    milieus: [...HOME, ...WORK],
    roles: {
      lodger: ['worker', { minAge: 18, maxAge: 45 }],
    },
    outcomes: [
      {
        id: 'chalk-line-on-the-floor',
        w: 0.45,
        text: '{lodger}把一只藤箱和一卷铺盖搬进{subject}的房间，两人用粉笔在地上划了一条线。房租、煤钱、灯油都各出一半，{lodger}还在窗台上摆了一只自己的杯子。第一夜，两个人都睡得很靠墙。',
        significance: 0.7,
        fx: [
          { cash: 3, role: 'took_lodger' },
          {
            raw: [
              {
                type: 'household',
                personId: '$lodger',
                householdId: '$household',
                reason: 'moved in to share the rent',
              },
              {
                type: 'role',
                personId: '$lodger',
                role: 'lodger',
                add: true,
                reason: 'rented half a room',
              },
            ],
          },
        ],
      },
      {
        id: 'boots-on-the-stairs',
        w: 0.3,
        text: '{lodger}夜里回来得晚，靴子踩在木楼梯上，整栋楼都听见。{subject}写过两张纸条，{lodger}把它们压在杯子底下。月底算煤钱时，两个人第一次为几块煤争到脸红。',
        significance: 0.62,
        fx: [
          {
            relation: ['lodger', 'colleague', -0.05, 0],
            flag: 'lodger_rules',
            condition: 'sleepless',
          },
          {
            raw: [
              {
                type: 'household',
                personId: '$lodger',
                householdId: '$household',
                reason: 'stayed on despite friction over rent and coal',
              },
            ],
          },
        ],
      },
      {
        id: 'left-for-a-drier-room',
        w: 0.25,
        when: { maxCash: 1 },
        text: '{lodger}嫌屋里太潮，月底搬去工厂宿舍，留下一只缺口的杯子和半袋面粉。{subject}把杯子收进柜子，房租重新变成一个人的数目。那天晚上，房间安静得能听见隔壁的钟。',
        significance: 0.56,
        fx: {
          cash: -1,
          relation: ['lodger', 'acquaintance', 0.02, 0],
          role: 'left_by_lodger',
          mood: -0.04,
        },
      },
    ],
    variants: [
      {
        id: 'shared-lodging-postwar',
        when: { contextTags: ['postwar', 'crisis'] },
        title: '隔出来的半间房',
        outcomes: [
          {
            id: 'sheet-across-the-room',
            w: 0.55,
            text: '战后房子紧，{lodger}租下{subject}家半间房，中间挂一块旧床单。两家共用一只炉子，谁先回家谁生火。孩子哭时，{lodger}会隔着床单敲两下墙，表示自己还没睡。',
            significance: 0.7,
            fx: [
              { cash: 4, role: 'shared_half_room' },
              {
                raw: [
                  {
                    type: 'household',
                    personId: '$lodger',
                    householdId: '$household',
                    reason: 'rented half a room behind a hanging sheet',
                  },
                ],
              },
            ],
          },
          {
            id: 'hid-the-lodger',
            w: 0.45,
            text: '房东发现多住了一个人，扬言要涨租。{subject}和{lodger}连夜把床单拆下来，把{lodger}的箱子藏进壁橱。第二天房东来查，只看见桌上多了一副碗筷。',
            significance: 0.66,
            fx: {
              cash: -2,
              relation: ['lodger', 'colleague', 0.1, 0],
              flag: 'hid_lodger_from_landlord',
              knowledge: ['the landlord does not know about the second lodger', 0.8],
            },
          },
        ],
      },
    ],
    baseRate: 0.04,
    cooldownYears: 4,
  },

  // 6 ─ friendship test ─────────────────────────────────────────────────────
  {
    id: 'r13-rel.friendship-test',
    title: '丢了的钱袋',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [16, 60],
    tags: ['relationship', 'friend', 'trust', 'test', 'accusation'],
    contexts: WIDE,
    milieus: [...HOME, ...SHOP, ...WORK],
    roles: {
      friend: ['neighbor', { minAge: 16, maxAge: 60 }],
      master: ['worker', { minAge: 25, maxAge: 68 }],
    },
    outcomes: [
      {
        id: 'stood-in-front',
        w: 0.4,
        text: '钱袋是在更衣室丢的。{master}要搜每个人的口袋，{subject}站到{friend}前面，说昨晚两人一起锁的门。{friend}的手在袖子里攥紧，{subject}没有回头。搜到第三个人时，钱袋从一条围裙里掉了出来。',
        significance: 0.7,
        fx: {
          relation: ['friend', 'friend', 0.18, 0.05],
          role: 'loyal_friend',
          reputation: 0.03,
          knowledge: ['the money bag was found on a third person', 0.8, 'master'],
        },
      },
      {
        id: 'hesitated-half-a-minute',
        w: 0.35,
        text: '{master}问到{friend}时，{subject}没有立刻开口。那半分钟里，{friend}看了{subject}一眼，把手从桌上收了回去。后来钱袋在柜台底下找到，{friend}只说了一句“没事”，之后午饭再没坐过来。',
        significance: 0.62,
        fx: {
          relation: ['friend', 'friend', -0.12, 0],
          mood: -0.06,
          flag: 'doubted_friend',
        },
      },
      {
        id: 'covered-the-theft',
        w: 0.25,
        when: { maxCash: 3 },
        text: '夜里{friend}来敲门，承认钱是自己拿的，因为家里断了粮。{subject}把仅有的两克朗塞给{friend}，让{friend}天亮前去还。{master}收了钱，没有报官，但把{friend}的名字从排班表上划掉了。',
        significance: 0.68,
        fx: {
          cash: -2,
          relation: ['friend', 'friend', 0.08, 0],
          role: 'covered_friend',
          knowledge: ['the friend stole from the till to feed a family', 0.85, 'friend'],
        },
      },
    ],
    variants: [
      {
        id: 'friendship-test-crisis',
        when: { contextTags: ['crisis', 'scarcity'] },
        title: '少了一袋面粉',
        outcomes: [
          {
            id: 'showed-the-ration-card',
            w: 0.5,
            text: '配给站少了一袋面粉，{friend}说看见{subject}最后一个离开。{subject}没有争，只把自己的配给证摊在桌上，上面还粘着当天的印泥。{friend}看了很久，最后说也许是自己记错了。',
            significance: 0.66,
            fx: {
              relation: ['friend', 'friend', -0.08, 0],
              role: 'cleared_name',
              reputation: 0.02,
            },
          },
          {
            id: 'found-under-the-stove',
            w: 0.5,
            text: '面粉最后在{friend}家的灶台下找到。{friend}说是孩子拖进去的，{subject}没有拆穿，只把口袋重新扎好。那天晚上，两家还是分吃了同一锅面糊，但{subject}记住了{friend}端碗时避开的目光。',
            significance: 0.7,
            fx: {
              relation: ['friend', 'friend', -0.16, 0],
              flag: 'unforgotten_theft',
              mood: -0.04,
            },
          },
        ],
      },
    ],
    baseRate: 0.04,
    cooldownYears: 3,
  },

  // 7 ─ betrayal by a friend ────────────────────────────────────────────────
  {
    id: 'r13-rel.betrayal-friend',
    title: '名册上的名字',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [17, 60],
    tags: ['relationship', 'friend', 'betrayal', 'work', 'risk'],
    contexts: ['vienna', 'urban', 'industrial', 'war', 'postwar', 'reform', 'crisis'],
    milieus: [...WORK, ...HOME],
    roles: {
      friend: ['neighbor', { minAge: 17, maxAge: 60 }],
      master: ['worker', { minAge: 28, maxAge: 68 }],
    },
    outcomes: [
      {
        id: 'name-on-the-list',
        w: 0.45,
        text: '{subject}在工会名册上签过名。三天后，{master}把{subject}叫进账房，桌上摊着那张名册的抄件，字迹是{friend}的。{subject}没有问为什么，只把工牌放在桌上。走出门口时，{friend}正站在楼梯下，手里还攥着另一份名单。',
        significance: 0.82,
        fx: [
          {
            endRelation: ['friend', 'friend'],
            relation: ['friend', 'rival', -0.2, 0],
            role: 'blacklisted',
            reputation: -0.08,
            cash: -4,
            knowledge: ['the friend copied the union roster for the master', 0.9, 'master'],
          },
        ],
      },
      {
        id: 'confronted-in-the-tavern',
        w: 0.3,
        text: '{subject}在酒馆堵住{friend}，把抄件拍在桌上。{friend}先说不是自己，后来又说家里等钱用。{subject}把杯子里的酒泼在{friend}脸上，老板过来赶人。两个人从此在街上遇见都绕开走。',
        significance: 0.74,
        fx: {
          relation: ['friend', 'rival', -0.3, -0.05],
          role: 'betrayed',
          mood: -0.12,
        },
      },
      {
        id: 'took-back-the-tools',
        w: 0.25,
        when: { skill: { name: 'social', min: 0.4 } },
        text: '{subject}没有去对质，只把{friend}借去的工具一件件要了回来。{friend}每次都说再宽限两天，最后一次把锤子放在门口就走了。{subject}把锤子擦干净，从此不再替{friend}担保任何事。',
        significance: 0.68,
        fx: {
          endRelation: ['friend', 'friend'],
          relation: ['friend', 'acquaintance', -0.05, 0],
          flag: 'kept_distance_after_betrayal',
        },
      },
    ],
    variants: [
      {
        id: 'betrayal-friend-war',
        when: { contextTags: ['war'] },
        title: '征兵名册旁的一行字',
        outcomes: [
          {
            id: 'moved-his-name-down-the-list',
            w: 0.5,
            text: '征兵名册贴出来时，{subject}看见自己的名字被人用铅笔挪到了下一批。{friend}说这是为{subject}好，前线活不过冬天。{subject}没有谢，只问是谁替{subjectPronoun}做的决定。第二天，{subject}自己去找了征兵官。',
            significance: 0.8,
            fx: {
              endRelation: ['friend', 'friend'],
              relation: ['friend', 'rival', -0.15, 0],
              role: 'volunteered_anyway',
              reputation: 0.04,
            },
          },
          {
            id: 'reported-the-deserter',
            w: 0.5,
            text: '{friend}把{subject}藏在地窖里的逃兵亲戚报了出去，换来一张免役证明。{subject}被叫去问话，回来时{friend}已经搬走，桌上留着一包烟。{subject}把烟扔进炉子，烟味在屋里散了两天。',
            significance: 0.84,
            fx: {
              endRelation: ['friend', 'friend'],
              relation: ['friend', 'rival', -0.2, 0],
              health: -0.03,
              role: 'denounced',
              knowledge: ['the friend traded a deserter for an exemption', 0.85],
            },
          },
        ],
      },
    ],
    baseRate: 0.03,
    cooldownYears: 5,
  },

  // 8 ─ rivalry at work ─────────────────────────────────────────────────────
  {
    id: 'r13-rel.workplace-rivalry',
    title: '同一台机器的两个班',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [18, 58],
    tags: ['relationship', 'rivalry', 'work', 'competition', 'status'],
    contexts: ['vienna', 'industrial', 'factory', 'peace', 'war', 'postwar', 'crisis'],
    milieus: WORK,
    conditions: [{ kind: 'employment', employed: true }],
    roles: {
      rival: ['worker', { minAge: 18, maxAge: 58 }],
      foreman: ['worker', { minAge: 30, maxAge: 68 }],
    },
    outcomes: [
      {
        id: 'behind-the-pace',
        w: 0.35,
        text: '{rival}把计件牌翻到新的一页，{subject}的牌还停在上午。午饭时，{rival}故意把成捆的纸样从{subject}脚边拖过去。{subject}没有抬头，只把机器又调快了一格，手指被纸边割出细口。',
        significance: 0.64,
        fx: {
          cash: 2,
          health: -0.04,
          relation: ['rival', 'rival', -0.1, 0],
          role: 'behind_the_pace',
        },
      },
      {
        id: 'reset-the-type',
        w: 0.3,
        text: '{subject}在换班时发现字模被人重新排过，印出来的一整版都是反字。{foreman}扣了{subject}的工钱，{rival}站在门口没有走。{subject}后来在自己的工具箱里找到一枚不属于{subjectPronoun}的铅块。',
        significance: 0.72,
        fx: {
          cash: -2,
          relation: ['rival', 'rival', -0.25, 0],
          role: 'sabotage_suspect',
          flag: 'suspected_sabotage',
          knowledge: ['a foreign piece of type was planted in the toolbox', 0.7],
        },
      },
      {
        id: 'cleared-the-jam-together',
        w: 0.35,
        when: { skill: { name: 'craft', min: 0.4 } },
        text: '{subject}的机器卡住时，{rival}没有趁机去领新活，而是蹲下来替{subject}掏出卡在齿轮里的纸团。两人满手油污地对看了一眼。下班后，{rival}把明天的排班表抄了一份给{subject}。',
        significance: 0.62,
        fx: {
          cash: 1,
          relation: ['rival', 'colleague', 0.12, 0],
          role: 'shift_partner',
        },
      },
    ],
    variants: [
      {
        id: 'workplace-rivalry-print',
        when: { milieuTags: ['print', 'craft'] },
        title: '铅字架前的较劲',
        outcomes: [
          {
            id: 'handed-over-the-type-case',
            w: 0.5,
            text: '两人同时伸手去够最上层的那盒小号字。{rival}先拿到，却在转身时把盒子递给了{subject}，说自己的眼睛今天花。{subject}接过来，发现盒底压着一张写着{subject}名字的排班条。',
            significance: 0.6,
            fx: {
              relation: ['rival', 'rival', 0.04, 0],
              role: 'shared_type_case',
            },
          },
          {
            id: 'knocked-over-the-form',
            w: 0.5,
            text: '夜班排字时，{rival}把{subject}排好的一整版打翻在地。铅字滚进机器底下，两个人趴在地上捡到天亮。{foreman}来开门时，{subject}正把最后一枚字按回版心，{rival}的手背上全是划痕。',
            significance: 0.74,
            fx: {
              cash: -3,
              condition: 'exhaustion',
              relation: ['rival', 'rival', -0.14, 0],
            },
          },
        ],
      },
    ],
    baseRate: 0.05,
    cooldownYears: 3,
  },

  // 9 ─ mentor relationship ────────────────────────────────────────────────
  {
    id: 'r13-rel.mentor-apprentice',
    title: '师傅留下的那把尺',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [15, 40],
    tags: ['relationship', 'mentor', 'craft', 'work', 'respect'],
    contexts: ['vienna', 'industrial', 'factory', 'peace', 'war', 'postwar', 'reform'],
    milieus: [...WORK, ...SHOP],
    roles: {
      mentor: ['worker', { minAge: 35, maxAge: 72 }],
    },
    outcomes: [
      {
        id: 'the-old-ruler',
        w: 0.4,
        text: '{mentor}让{subject}先磨了三天刻刀，才肯教怎么下刀。第四天，{mentor}把自己的旧尺放进{subject}的工具箱，说量线的时候手要稳，心要更稳。{subject}把尺子包在布里，第一次独自完成了一块版。',
        significance: 0.72,
        fx: [
          {
            role: 'apprentice',
            skill: { craft: 0.04 },
            cash: 1,
            knowledge: ['the mentor measures twice and cuts once', 0.8, 'mentor'],
          },
          {
            raw: [
              {
                type: 'relation',
                a: '$subject',
                b: '$mentor',
                kind: 'colleague',
                trust: 0.15,
                respect: 0.2,
                reason: 'took on an apprentice and gave him a rule',
              },
            ],
          },
        ],
      },
      {
        id: 'torn-up-the-form',
        w: 0.35,
        text: '{mentor}把{subject}排好的版整块拆掉，说字号差半号，读者会以为是错字。{subject}重排到半夜，手指被铅字磨破。第二天{mentor}没有夸，只把一块新围裙丢在{subject}的凳子上。',
        significance: 0.66,
        fx: [
          {
            skill: { craft: 0.03 },
            condition: 'cut_fingers',
            flag: 'mentor_trial',
          },
          {
            raw: [
              {
                type: 'relation',
                a: '$subject',
                b: '$mentor',
                kind: 'colleague',
                trust: 0.05,
                respect: 0.1,
                reason: 'survived a deliberately harsh trial',
              },
            ],
          },
        ],
      },
      {
        id: 'too-soft-hands',
        w: 0.25,
        when: { maxCash: 2 },
        text: '{mentor}看了{subject}的手，说这双手太软，吃不了这行的灰。{subject}在门口站了一会儿，把带来的学费重新揣回口袋。回家的路上，{subjectPronoun}在一家小铺前停下来，看别人怎么装订。',
        significance: 0.58,
        fx: {
          relation: ['mentor', 'acquaintance', -0.04, 0],
          mood: -0.1,
          flag: 'rejected_apprentice',
        },
      },
    ],
    variants: [
      {
        id: 'mentor-war',
        when: { contextTags: ['war'] },
        title: '师傅被征走以后',
        outcomes: [
          {
            id: 'kept-the-bench-running',
            w: 0.55,
            text: '{mentor}被征走前，把工具袋塞给{subject}，说别让这台机器停。{subject}一个人守了三个月，第一次独立接活时，把{mentor}的旧尺别在腰上。工钱不多，但每一块版都刻着{mentor}教过的下刀角度。',
            significance: 0.76,
            fx: [
              {
                role: 'kept_the_shop',
                skill: { craft: 0.05 },
                cash: 2,
              },
              {
                raw: [
                  {
                    type: 'relation',
                    a: '$subject',
                    b: '$mentor',
                    kind: 'colleague',
                    trust: 0.15,
                    respect: 0.2,
                    reason: 'held the workshop while the mentor was mobilized',
                  },
                ],
              },
            ],
          },
          {
            id: 'finished-the-orders',
            w: 0.45,
            text: '前线来信说{mentor}受了伤，{subject}把信读了三遍，第二天替{mentor}把没做完的订货赶完。客户嫌工慢，{subject}没有降价，只说师傅回来会认这笔账。',
            significance: 0.7,
            fx: {
              cash: -2,
              relation: ['mentor', 'colleague', 0.1, 0],
              role: 'held_the_bench',
            },
          },
        ],
      },
    ],
    baseRate: 0.04,
    cooldownYears: 4,
  },

  // 10 ─ falling in love ────────────────────────────────────────────────────
  {
    id: 'r13-rel.falling-in-love',
    title: '楼梯拐角的那一眼',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [18, 40],
    tags: ['relationship', 'courtship', 'love', 'partner', 'courtship'],
    contexts: ['vienna', 'urban', 'peace', 'industrial', 'war', 'postwar', 'reform', 'crisis'],
    milieus: [...HOME, ...WORK, ...CAFE],
    conditions: [{ kind: 'notHasRelation', relationKind: 'partner' }],
    roles: {
      beloved: ['neighbor', { minAge: 18, maxAge: 40, sex: 'opposite' }],
    },
    outcomes: [
      {
        id: 'fingers-on-the-lamp',
        w: 0.4,
        text: '{subject}在楼梯拐角撞见{beloved}，两个人同时去扶墙上的灯，手指碰在一起。{beloved}没有缩手，只问{subject}是不是也住三楼。那天晚上，{subject}在黑暗里听见自己的心跳，第二天特意早起了半个钟头。',
        significance: 0.74,
        fx: {
          relation: ['beloved', 'partner', 0.1, 0.2],
          role: 'in_love',
          mood: 0.12,
        },
      },
      {
        id: 'laughed-with-someone-else',
        w: 0.35,
        when: { skill: { name: 'social', max: 0.4 } },
        text: '{subject}替{beloved}把煤箱搬上四楼，{beloved}道了谢，转身把门关上。{subject}在门口站了一会儿，听见屋里有另一个人的笑声。下楼时，{subject}数着台阶，把想说的话一句句咽回去。',
        significance: 0.56,
        fx: {
          relation: ['beloved', 'acquaintance', 0.04, 0.08],
          role: 'lovelorn',
          mood: -0.08,
        },
      },
      {
        id: 'left-room-at-the-wash-basin',
        w: 0.25,
        when: { maxCash: 3 },
        text: '{subject}和{beloved}在洗衣房遇见了几次，从借肥皂说到各自的班次。{subject}没有问{beloved}有没有别人，只在每次洗完衣服后，把自己的盆往墙边挪一点，给{beloved}留出地方。',
        significance: 0.64,
        fx: {
          cash: -1,
          relation: ['beloved', 'friend', 0.08, 0.15],
          role: 'courting',
        },
      },
    ],
    variants: [
      {
        id: 'falling-in-love-postwar',
        when: { contextTags: ['postwar', 'crisis'] },
        title: '战后第一支慢舞',
        outcomes: [
          {
            id: 'slow-dance',
            w: 0.55,
            text: '战后的第一支慢舞在一家重新开张的咖啡馆里。{subject}的手在{beloved}背后停了一拍，{beloved}说自己的未婚夫没有回来。{subject}没有追问，只把舞步放得更慢，让两个人都能站稳。',
            significance: 0.74,
            fx: {
              relation: ['beloved', 'partner', 0.06, 0.16],
              role: 'in_love',
              flag: 'wary_beginning',
            },
          },
          {
            id: 'the-button',
            w: 0.45,
            text: '{beloved}在舞会结束时把一枚旧纽扣放进{subject}手心，说是从军装上剪下来的。{subject}握着那枚纽扣走回家，路灯一盏盏灭下去，手心里一直是热的。',
            significance: 0.62,
            fx: {
              relation: ['beloved', 'acquaintance', 0.08, 0.12],
              role: 'kept_button',
            },
          },
        ],
      },
    ],
    baseRate: 0.07,
    cooldownYears: 4,
  },

  // 11 ─ secret courtship ──────────────────────────────────────────────────
  {
    id: 'r13-rel.secret-courtship',
    title: '后门的两次敲门',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [18, 38],
    tags: ['relationship', 'courtship', 'secret', 'risk', 'partner'],
    contexts: ['vienna', 'urban', 'peace', 'war', 'postwar', 'reform', 'crisis'],
    milieus: [...HOME, ...CAFE],
    roles: {
      partner: ['partner', { minAge: 18, maxAge: 45, sex: 'opposite' }],
      confidant: ['neighbor', { minAge: 16, maxAge: 60 }],
    },
    outcomes: [
      {
        id: 'letters-under-the-bread',
        w: 0.4,
        text: '{subject}和{partner}约在后门见面，一次在送奶车走后，一次在晚祷钟响时。{partner}把信藏在面包底下，{subject}把回信塞进空奶瓶。{confidant}替他们望风，收一枚铜板，从不多问。',
        significance: 0.72,
        fx: {
          relation: [
            ['partner', 'partner', 0.08, 0.15],
            ['confidant', 'colleague', 0.08, 0],
          ],
          role: 'secret_lover',
          flag: 'secret_courtship',
        },
      },
      {
        id: 'note-found-on-the-stairs',
        w: 0.35,
        text: '房东太太在楼梯上捡到一张没有署名的纸条，认出是{partner}的字。第二天，整栋楼都在说{subject}夜里开后门。{partner}的母亲来把{partner}领走，{subject}站在门口，没有伸手。',
        significance: 0.72,
        fx: [
          {
            reputation: -0.08,
            role: 'talked_about',
            knowledge: ['the whole building knows about the back-door meetings', 0.8],
          },
          {
            raw: [
              {
                type: 'relation',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                trust: 0.02,
                affection: 0.1,
                fear: 0.12,
                reason: 'the secret courtship was exposed',
              },
            ],
          },
        ],
      },
      {
        id: 'returned-every-letter',
        w: 0.25,
        when: { maxCash: 2 },
        text: '{subject}数了数家里的账，发现连一张去城里的车票都买不起。{subjectPronoun}把{partner}的信全部退回，只在最上面写了一句“别等我”。{partner}在门口等了三夜，第四夜没有来。',
        significance: 0.7,
        fx: {
          endRelation: ['partner', 'partner'],
          role: 'renounced_love',
          mood: -0.1,
        },
      },
    ],
    variants: [
      {
        id: 'secret-courtship-crisis',
        when: { contextTags: ['crisis'] },
        title: '巡警走过窗下',
        outcomes: [
          {
            id: 'hid-him-in-the-coal-cellar',
            w: 0.55,
            text: '巡警在巷口查夜时，{subject}让{partner}躲进放煤的地窖，自己在楼上把灯熄了。靴声在窗外停了很久，{partner}在下面握住{subject}的手腕，两个人谁都没有出声。',
            significance: 0.76,
            fx: [
              {
                relation: ['partner', 'partner', 0.1, 0.06],
                role: 'hid_lover',
                flag: 'police_near_miss',
              },
              {
                raw: [
                  {
                    type: 'relation',
                    a: '$subject',
                    b: '$partner',
                    kind: 'partner',
                    fear: 0.08,
                    reason: 'hid a lover from a night patrol',
                  },
                ],
              },
            ],
          },
          {
            id: 'questioned-for-three-days',
            w: 0.45,
            text: '{partner}被带去问话，三天后放回来，眼角青了一块。{subject}没有问谁动的手，只把家里仅剩的鸡蛋煮了。{partner}吃完，说以后别再在后门等。',
            significance: 0.72,
            fx: [
              {
                relation: ['partner', 'partner', 0.06, 0],
                role: 'questioned_lover',
              },
              {
                raw: [
                  {
                    type: 'health',
                    personId: '$partner',
                    amount: -0.05,
                    reason: 'beaten during police questioning',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    baseRate: 0.05,
    cooldownYears: 4,
  },

  // 12 ─ chaperoned courtship ──────────────────────────────────────────────
  {
    id: 'r13-rel.chaperoned-courtship',
    title: '客厅里的第三个人',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [18, 35],
    tags: ['relationship', 'courtship', 'chaperone', 'family', 'respectability'],
    contexts: ['vienna', 'urban', 'peace', 'war', 'postwar', 'reform', 'crisis'],
    milieus: [...HOME, ...CAFE],
    roles: {
      partner: ['partner', { minAge: 18, maxAge: 40, sex: 'opposite' }],
      chaperone: ['neighbor', { minAge: 40, maxAge: 75, sex: 'female' }],
    },
    outcomes: [
      {
        id: 'approved-after-the-socks',
        w: 0.4,
        text: '{chaperone}坐在客厅的第三把椅子上，一边补袜子一边听{partner}说话。{partner}讲到工厂的工钱时，{chaperone}咳了一声，{partner}立刻换了个话题。临走时，{chaperone}对{subject}点点头，说这人嘴笨，但手上有活。',
        significance: 0.68,
        fx: {
          cash: -1,
          relation: [
            ['partner', 'partner', 0.1, 0.1],
            ['chaperone', 'colleague', 0.1, 0],
          ],
          role: 'approved_suitor',
        },
      },
      {
        id: 'reported-the-extra-two-minutes',
        w: 0.35,
        text: '{subject}送{partner}到门口，多站了两分钟。第二天，{chaperone}把这事告诉了{subject}的母亲，连两个人站的位置都比划出来。{subject}被叫去问话，{partner}那边也收到了同样的消息。',
        significance: 0.64,
        fx: [
          {
            reputation: 0.03,
            role: 'reported_courtship',
            relation: ['chaperone', 'rival', -0.05, 0],
          },
          {
            raw: [
              {
                type: 'relation',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                trust: 0.04,
                fear: 0.06,
                reason: 'the chaperone reported the meeting',
              },
            ],
          },
        ],
      },
      {
        id: 'slipped-out-the-back',
        w: 0.25,
        when: { skill: { name: 'social', min: 0.4 } },
        text: '{subject}借口去买线，把{chaperone}留在布店，自己从后门绕到{partner}的工坊。两个人只说了半刻钟，{chaperone}就找来了。回去的路上，{chaperone}一句话没说，{subject}却觉得整条街都在看{subjectPronoun}。',
        significance: 0.7,
        fx: {
          reputation: -0.05,
          relation: ['partner', 'partner', 0.06, 0.15],
          flag: 'stole_meeting',
        },
      },
    ],
    variants: [
      {
        id: 'chaperoned-courtship-war',
        when: { contextTags: ['war'] },
        title: '前线来信由她代读',
        outcomes: [
          {
            id: 'read-aloud-letters',
            w: 0.5,
            text: '{partner}的信从战地寄来，{chaperone}先拆开读了一遍，再把能念的段落念给{subject}听。念到“等我”时，{chaperone}停了一下，把信纸折回去，说剩下的等打完仗再读。',
            significance: 0.7,
            fx: {
              relation: [
                ['partner', 'partner', 0.08, 0],
                ['chaperone', 'colleague', 0.06, 0],
              ],
              role: 'censored_letters',
            },
          },
          {
            id: 'dictated-the-socks',
            w: 0.5,
            text: '{subject}不识字，{chaperone}替{subject}写回信，写完后念一遍，问有没有要添的。{subject}想了很久，说把旧围巾拆了，重新织成一双袜子。{chaperone}写下去时，笔尖在纸上停了停。',
            significance: 0.68,
            fx: {
              skill: { literacy: 0.02 },
              relation: ['partner', 'partner', 0, 0.12],
              role: 'dictated_letter',
            },
          },
        ],
      },
    ],
    baseRate: 0.04,
    cooldownYears: 4,
  },

  // 13 ─ class difference in courtship ─────────────────────────────────────
  {
    id: 'r13-rel.class-difference',
    title: '钢琴与煤箱',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [18, 40],
    tags: ['relationship', 'courtship', 'class', 'money', 'marriage'],
    contexts: ['vienna', 'urban', 'peace', 'industrial', 'postwar', 'reform'],
    milieus: [...HOME, ...SHOP, ...WORK, ...CAFE],
    roles: {
      partner: ['partner', { minAge: 18, maxAge: 40, sex: 'opposite' }],
      master: ['worker', { minAge: 30, maxAge: 65 }],
    },
    outcomes: [
      {
        id: 'she-chose-the-coal-box',
        w: 0.35,
        text: '{partner}家有一架钢琴，{subject}家只有一只煤箱。{partner}的母亲把{subject}带来的点心原样退回去，{partner}却在第二天自己走到{subject}的门口，手上没有戴手套。两个人开始算一份只够付房租的账。',
        significance: 0.74,
        fx: {
          cash: -10,
          relation: ['partner', 'partner', 0.15, 0.1],
          role: 'cut_off_by_family',
          knowledge: ['the partner’s family withdrew all support', 0.8],
        },
      },
      {
        id: 'night-school-ledgers',
        w: 0.3,
        when: { minCash: 6 },
        text: '{subject}开始去夜校学记账，把工钱的一部分换成书和墨水。{partner}每次来都带一张写满生词的小纸，{subject}把纸压在枕头下。半年后，{subject}第一次替工头读懂了整张送货单。',
        significance: 0.66,
        fx: {
          cash: -3,
          skill: { literacy: 0.05, numeracy: 0.04 },
          relation: ['partner', 'partner', 0.1, 0.04],
          role: 'self_improver',
        },
      },
      {
        id: 'the-shop-owner-warns',
        w: 0.35,
        text: '{master}把{subject}叫到柜台后，说店里不养和东家来往的人。{partner}站在楼梯上听见了，手里的网兜勒出一道印。当天下午，{subject}的排班被改到最晚一班。',
        significance: 0.68,
        fx: {
          cash: -1,
          relation: [
            ['partner', 'partner', -0.05, 0],
            ['master', 'rival', -0.15, 0],
          ],
          flag: 'forbidden_match',
        },
      },
    ],
    variants: [
      {
        id: 'class-difference-crisis',
        when: { contextTags: ['crisis', 'scarcity'] },
        title: '失业以后的门第',
        outcomes: [
          {
            id: 'returned-the-thimble',
            w: 0.5,
            text: '{subject}失业后，{partner}家派人退回了订婚的银顶针。{partner}追到巷口，把顶针重新塞回{subject}手里，说自己的工钱够两个人吃半饱。{subject}看见{partner}的鞋底已经磨穿。',
            significance: 0.74,
            fx: {
              cash: -5,
              relation: ['partner', 'partner', 0.12, 0.08],
              role: 'engaged_against_family',
            },
          },
          {
            id: 'refused-the-name',
            w: 0.5,
            text: '{partner}的父亲托{master}带话，只要{subject}肯入赘并把姓改掉，就替{subject}还清欠租。{subject}在桌前坐到天黑，最后把笔放下，说自己可以穷，但不能连名字都没有。',
            significance: 0.7,
            fx: [
              {
                relation: [
                  ['partner', 'partner', 0.08, 0],
                  ['master', 'rival', -0.1, 0],
                ],
                role: 'refused_dowry',
                flag: 'kept_name',
              },
            ],
          },
        ],
      },
    ],
    baseRate: 0.04,
    cooldownYears: 5,
  },

  // 14 ─ parental objection ────────────────────────────────────────────────
  {
    id: 'r13-rel.parental-objection',
    title: '长辈把门闩上',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [18, 35],
    tags: ['relationship', 'courtship', 'family', 'conflict', 'marriage'],
    contexts: ['vienna', 'urban', 'peace', 'postwar', 'reform', 'crisis', 'rural'],
    milieus: [...HOME],
    roles: {
      partner: ['partner', { minAge: 18, maxAge: 45, sex: 'opposite' }],
      parent: ['parent', { minAge: 40, maxAge: 75 }],
    },
    outcomes: [
      {
        id: 'walked-past-the-window',
        w: 0.35,
        text: '{parent}把门闩上，说除非{subject}从这门婚事上跨过去，否则别再进这个家。{subject}在门外站到半夜，{partner}提着一盏灯来接。两个人沿着结冰的运河走，谁都没有回头看那扇窗。',
        significance: 0.76,
        fx: {
          cash: -2,
          relation: [
            ['partner', 'partner', 0.12, 0.1],
            ['parent', 'kin', -0.2, -0.1],
          ],
          role: 'defiant_child',
        },
      },
      {
        id: 'burned-the-letters',
        w: 0.3,
        when: { maxCash: 3 },
        text: '{parent}把{partner}送来的礼物原封退回，又替{subject}答应了另一门亲事。{subject}在房里坐到天亮，最后把{partner}的信一封封投进炉子。婚礼那天，{subject}没有笑，{parent}在门口收礼金。',
        significance: 0.8,
        fx: {
          endRelation: ['partner', 'partner'],
          relation: ['parent', 'kin', 0.05, 0],
          role: 'dutiful_child',
          mood: -0.14,
        },
      },
      {
        id: 'counted-the-repairs',
        w: 0.35,
        when: { minAge: 26 },
        text: '{subject}没有吵，只把{partner}这些年在{subject}家修过的门窗一一数给{parent}听。{parent}沉着脸抽完一袋烟，最后让{partner}进屋吃饭。桌上多摆了一副碗筷，谁也没有先动。',
        significance: 0.68,
        fx: {
          cash: -3,
          relation: [
            ['partner', 'partner', 0.08, 0],
            ['parent', 'kin', 0.08, 0],
          ],
          role: 'consented_match',
        },
      },
    ],
    variants: [
      {
        id: 'parental-objection-rural',
        when: { contextTags: ['rural', 'small_town'] },
        title: '村里的闲话',
        outcomes: [
          {
            id: 'over-the-wall-in-the-rain',
            w: 0.55,
            text: '村里的闲话传到{parent}耳朵里，说{partner}家的地早就押给了债主。{parent}把{subject}关在院子里，不许再去河边。{partner}在墙外站了三夜，第四夜下起雨，{subject}翻墙出去时，鞋陷在泥里。',
            significance: 0.76,
            fx: {
              cash: -2,
              relation: [
                ['partner', 'partner', 0.1, 0.1],
                ['parent', 'kin', -0.15, 0],
              ],
              role: 'defied_village',
            },
          },
          {
            id: 'paid-her-own-bride-price',
            w: 0.45,
            text: '{parent}请来族里的老人评理，老人说这门亲事门当户对，只是彩礼少了两袋麦子。{partner}家凑不齐，{subject}把自己攒的嫁妆钱拿出来补上。{parent}收了钱，脸还是没有松开。',
            significance: 0.7,
            fx: {
              cash: -6,
              relation: [
                ['partner', 'partner', 0.06, 0],
                ['parent', 'kin', -0.05, 0],
              ],
              role: 'paid_own_betrothal',
            },
          },
        ],
      },
    ],
    baseRate: 0.05,
    cooldownYears: 5,
  },

  // 15 ─ proposal ───────────────────────────────────────────────────────────
  {
    id: 'r13-rel.proposal',
    title: '面包篮底下的戒指',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [18, 40],
    tags: ['relationship', 'courtship', 'proposal', 'marriage', 'interaction'],
    contexts: WIDE,
    milieus: [...HOME, ...CAFE, ...WORK],
    roles: {
      partner: ['partner', { minAge: 18, maxAge: 45, sex: 'opposite' }],
    },
    outcomes: [
      {
        id: 'asked-under-the-bread',
        w: 0.6,
        text: '{subject}把戒指藏在面包篮底下，等{partner}掰开时才看见。{partner}没有立刻回答，只把戒指举到灯下，问是不是铜的。{subject}说是，等以后换金的。窗外的电车正好开过，两个人谁也没听见下一句话。',
        significance: 0.8,
        fx: [
          { cash: -2, role: 'proposed' },
          {
            raw: [
              {
                type: 'interaction',
                interaction: {
                  id: 'betrothal:$eventId',
                  initiatorId: '$subject',
                  counterpartyIds: ['$partner'],
                  kind: 'proposal',
                  subject: '愿不愿意订下婚事',
                  status: 'pending',
                  created: { year: 1, month: 1 },
                  proposal: {
                    acceptIf: { minTrust: 0, chance: 0.78 },
                    causeEventId: '$eventId',
                    acceptText:
                      '{counterparty}把戒指戴上，说铜的也行，别到时候连铜的都当了。两人把面包分完，开始算第一笔要添的家具钱。',
                    rejectText:
                      '{counterparty}把戒指放回篮子，说现在还不是时候。{subject}把篮子收好，第二天照常去上工。',
                    acceptEffects: [
                      {
                        type: 'relation',
                        a: '$subject',
                        b: '$counterparty',
                        kind: 'partner',
                        trust: 0.1,
                        affection: 0.12,
                        obligation: 0.12,
                        reason: 'accepted a proposal',
                      },
                      {
                        type: 'role',
                        personId: '$subject',
                        role: 'betrothed',
                        add: true,
                        reason: 'accepted a proposal',
                      },
                      {
                        type: 'role',
                        personId: '$counterparty',
                        role: 'betrothed',
                        add: true,
                        reason: 'accepted a proposal',
                      },
                    ],
                    rejectEffects: [
                      {
                        type: 'role',
                        personId: '$counterparty',
                        role: 'declined_betrothal',
                        add: true,
                        reason: 'declined a proposal',
                      },
                      {
                        type: 'mood',
                        personId: '$counterparty',
                        amount: -0.05,
                        reason: 'declined a proposal',
                      },
                    ],
                  },
                  responses: [],
                  visibility: 'participants',
                },
              },
            ],
          },
        ],
      },
      {
        id: 'waited-for-steadier-work',
        w: 0.25,
        when: { maxCash: 2 },
        text: '{subject}把买戒指的钱先拿去补了房租。{partner}问起时，{subject}只说再等等，等工钱稳一点。两个人在门口站了一会儿，{partner}替{subject}把衣领翻好，说那就等。',
        significance: 0.6,
        fx: {
          relation: ['partner', 'partner', 0.04, 0],
          role: 'waiting_to_propose',
          flag: 'postponed_proposal',
        },
      },
      {
        id: 'asked-the-father-first',
        w: 0.15,
        when: { minAge: 28 },
        text: '{subject}先去了{partner}家，把工票和存折摊在桌上。{partner}的父亲逐张看完，问{subject}能不能保证{partner}不挨饿。{subject}说不能保证，但会把最后一块面包留给{partner}。',
        significance: 0.68,
        fx: {
          cash: -1,
          relation: ['partner', 'partner', 0, 0.03],
          role: 'formal_suitor',
        },
      },
    ],
    variants: [
      {
        id: 'proposal-war',
        when: { contextTags: ['war'] },
        title: '出征前的戒指',
        outcomes: [
          {
            id: 'ring-before-the-call-up',
            w: 0.55,
            text: '{subject}在征召令下来那天向{partner}求婚，戒指是从战友手里换来的。{partner}一边哭一边骂，最后还是把戒指戴上了。第二天早晨，{subject}的行李已经放在门口，戒指用线缠在手指上。',
            significance: 0.84,
            fx: [
              { cash: -2, role: 'wartime_betrothal' },
              {
                raw: [
                  {
                    type: 'interaction',
                    interaction: {
                      id: 'wartime-betrothal:$eventId',
                      initiatorId: '$subject',
                      counterpartyIds: ['$partner'],
                      kind: 'proposal',
                      subject: '出征前把婚事定下来',
                      status: 'pending',
                      created: { year: 1, month: 1 },
                      proposal: {
                        acceptIf: { minTrust: 0, chance: 0.85 },
                        causeEventId: '$eventId',
                        acceptText:
                          '{counterparty}把戒指戴上，又用线缠紧，说铜的也行，别到前线就摘。两人在门口站到天亮。',
                        rejectText:
                          '{counterparty}把戒指塞回{subject}的口袋，说等回来再戴。{subject}没有争，只把口袋按紧。',
                        acceptEffects: [
                          {
                            type: 'relation',
                            a: '$subject',
                            b: '$counterparty',
                            kind: 'partner',
                            trust: 0.08,
                            affection: 0.1,
                            obligation: 0.2,
                            reason: 'betrothed before mobilization',
                          },
                          {
                            type: 'role',
                            personId: '$subject',
                            role: 'betrothed',
                            add: true,
                            reason: 'betrothed before mobilization',
                          },
                          {
                            type: 'role',
                            personId: '$counterparty',
                            role: 'betrothed',
                            add: true,
                            reason: 'betrothed before mobilization',
                          },
                        ],
                        rejectEffects: [
                          {
                            type: 'role',
                            personId: '$counterparty',
                            role: 'declined_betrothal',
                            add: true,
                            reason: 'declined a wartime proposal',
                          },
                        ],
                      },
                      responses: [],
                      visibility: 'participants',
                    },
                  },
                ],
              },
            ],
          },
          {
            id: 'sewed-a-button-instead',
            w: 0.45,
            text: '{subject}没有求婚，只把一枚纽扣缝进{partner}的衣襟，说要是回不来，就把这个交给{subject}母亲。{partner}把纽扣扯下来，重新缝回{subject}的军装上，说你自己交。',
            significance: 0.78,
            fx: [
              {
                relation: ['partner', 'partner', 0.1, 0],
                role: 'parted_unbetrothed',
              },
              {
                raw: [
                  {
                    type: 'relation',
                    a: '$subject',
                    b: '$partner',
                    kind: 'partner',
                    obligation: 0.15,
                    reason: 'parted without a formal betrothal',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    baseRate: 0.05,
    cooldownYears: 5,
  },

  // 16 ─ accepted proposal ─────────────────────────────────────────────────
  {
    id: 'r13-rel.proposal-accepted',
    title: '订婚宴上的两副碗筷',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [18, 38],
    tags: ['relationship', 'courtship', 'engagement', 'family', 'marriage'],
    contexts: [
      'vienna',
      'urban',
      'peace',
      'industrial',
      'war',
      'postwar',
      'reform',
      'crisis',
      'rural',
    ],
    milieus: [...HOME, ...CAFE],
    roles: {
      partner: ['partner', { minAge: 18, maxAge: 45, sex: 'opposite' }],
      parent: ['parent', { minAge: 40, maxAge: 80 }],
    },
    outcomes: [
      {
        id: 'birth-dates-on-red-paper',
        w: 0.45,
        text: '{parent}把两家的生辰写在红纸上，压在灶神像下。{partner}的母亲带来一对银镯，{subject}家回了一床新被面。{partner}在桌下捏了捏{subject}的手，{parent}咳嗽一声，两个人立刻分开。',
        significance: 0.78,
        fx: [
          {
            cash: -6,
            relation: [
              ['partner', 'partner', 0.1, 0.05],
              ['parent', 'kin', 0.06, 0],
            ],
          },
          {
            raw: [
              {
                type: 'role',
                personId: '$subject',
                role: 'engaged',
                add: true,
                reason: 'betrothal agreed by both families',
              },
              {
                type: 'role',
                personId: '$partner',
                role: 'engaged',
                add: true,
                reason: 'betrothal agreed by both families',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                obligation: 0.15,
                reason: 'betrothal agreed by both families',
              },
            ],
          },
        ],
      },
      {
        id: 'argued-over-the-dowry',
        w: 0.3,
        when: { maxCash: 4 },
        text: '两家人为嫁妆争到天黑。{parent}说家里只拿得出一只箱子，{partner}的母亲把茶碗放下，说那就再等等。{partner}把{subject}拉到厨房，说没有嫁妆也嫁。{subject}看见{partner}的手在抖。',
        significance: 0.7,
        fx: [
          {
            cash: 3,
            relation: [
              ['partner', 'partner', -0.04, 0],
              ['parent', 'kin', -0.08, 0],
            ],
          },
          {
            raw: [
              {
                type: 'role',
                personId: '$subject',
                role: 'engaged',
                add: true,
                reason: 'engaged without a dowry',
              },
              {
                type: 'role',
                personId: '$partner',
                role: 'engaged',
                add: true,
                reason: 'engaged without a dowry',
              },
            ],
          },
        ],
      },
      {
        id: 'the-date-kept-slipping',
        w: 0.25,
        when: { minAge: 25 },
        text: '日子看了三个，都因为钱和住处推翻。{partner}把日历上的记号擦掉，说等开春。{subject}把新被面重新叠好，放进箱子最底层。两个人还是每周见一次，只是不再提具体哪一天。',
        significance: 0.62,
        fx: {
          role: 'engaged',
          flag: 'long_engagement',
          relation: ['partner', 'partner', 0, 0.03],
          mood: -0.03,
        },
      },
    ],
    variants: [
      {
        id: 'proposal-accepted-war',
        when: { contextTags: ['war'] },
        title: '订婚宴后的征召令',
        outcomes: [
          {
            id: 'sewed-the-ring-into-the-lining',
            w: 0.5,
            text: '{partner}的征召令在订婚宴后第三天送到。两家人把红纸收起来，{subject}连夜替{partner}缝了一件衬里，把订婚戒指缝在左胸口袋。{partner}上车时没有回头，{subject}一直站到月台空了。',
            significance: 0.82,
            fx: [
              {
                role: 'engaged',
                condition: 'sleepless',
                knowledge: ['the betrothal ring is sewn into the left breast pocket', 0.9],
              },
              {
                raw: [
                  {
                    type: 'relation',
                    a: '$subject',
                    b: '$partner',
                    kind: 'partner',
                    obligation: 0.2,
                    fear: 0.1,
                    reason: 'betrothed and separated by mobilization',
                  },
                  {
                    type: 'move',
                    personId: '$partner',
                    locationId: '@factory',
                    reason: 'mobilized three days after the betrothal',
                  },
                ],
              },
            ],
          },
          {
            id: 'wedding-before-departure',
            w: 0.5,
            text: '{partner}说把婚期提前，哪怕只办一桌。{subject}家凑了面粉和糖，婚礼在出征前一夜举行。第二天清早，{partner}穿着军装出门，{subject}把剩下的喜糖分给了整栋楼的孩子。',
            significance: 0.86,
            fx: [
              {
                cash: -8,
                role: 'married_before_departure',
                relation: ['partner', 'partner', 0, 0],
              },
              {
                raw: [
                  {
                    type: 'household',
                    personId: '$partner',
                    householdId: '$household',
                    reason: 'married the night before departure',
                  },
                  {
                    type: 'role',
                    personId: '$subject',
                    role: 'spouse',
                    add: true,
                    reason: 'married the night before departure',
                  },
                  {
                    type: 'role',
                    personId: '$partner',
                    role: 'spouse',
                    add: true,
                    reason: 'married the night before departure',
                  },
                  {
                    type: 'relation',
                    a: '$subject',
                    b: '$partner',
                    kind: 'partner',
                    trust: 0.12,
                    obligation: 0.2,
                    reason: 'married the night before departure',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    baseRate: 0.045,
    cooldownYears: 5,
  },

  // 17 ─ rejected proposal ─────────────────────────────────────────────────
  {
    id: 'r13-rel.proposal-rejected',
    title: '退回的银顶针',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [18, 40],
    tags: ['relationship', 'courtship', 'rejection', 'proposal', 'shame'],
    contexts: WIDE,
    milieus: [...HOME, ...WORK, ...CAFE],
    roles: {
      partner: ['partner', { minAge: 18, maxAge: 45, sex: 'opposite' }],
      gobetween: ['neighbor', { minAge: 30, maxAge: 70 }],
    },
    outcomes: [
      {
        id: 'gentle-refusal',
        w: 0.4,
        text: '{partner}把银顶针放回{subject}手里，说{subject}是个好人，但自己已经答应家里不再等。{subject}把顶针收进内袋，帮{partner}把围巾搭好。两个人一起走到巷口，然后一个往左，一个往右。',
        significance: 0.76,
        fx: {
          endRelation: ['partner', 'partner'],
          relation: ['partner', 'acquaintance', -0.04, 0],
          role: 'refused',
          mood: -0.1,
        },
      },
      {
        id: 'refused-in-public',
        w: 0.3,
        text: '{subject}在舞会上当着众人的面把戒指递过去，{partner}后退一步，说别这样。乐队停了，旁边的人开始笑。{subject}把戒指收回口袋，接下来的三支曲子都站在门边，谁请也不跳。',
        significance: 0.82,
        fx: {
          endRelation: ['partner', 'partner'],
          reputation: -0.1,
          role: 'jilted',
          cash: -2,
          mood: -0.12,
        },
      },
      {
        id: 'asked-for-time',
        w: 0.3,
        when: { maxCash: 2 },
        text: '{partner}没有收戒指，也没有说不。{partner}说等家里的事安顿好再谈，{subject}问要等多久，{partner}看着窗外没有回答。{subject}把戒指放回盒子，盒子在口袋里放了整个冬天。',
        significance: 0.6,
        fx: {
          relation: ['partner', 'partner', -0.02, 0],
          role: 'waiting_answer',
          flag: 'answer_pending',
        },
      },
    ],
    variants: [
      {
        id: 'proposal-rejected-rural',
        when: { contextTags: ['rural', 'small_town'] },
        title: '媒人走后的院子',
        outcomes: [
          {
            id: 'the-unfinished-pillowcase',
            w: 0.5,
            text: '媒人走后，{partner}家的门关了三天。第四天，{partner}在井边拦住{subject}，说自己做不了主。{subject}把带来的布包递过去，{partner}没有接，布包掉在地上，滚出一只绣了一半的枕套。',
            significance: 0.78,
            fx: {
              endRelation: ['partner', 'partner'],
              role: 'refused_by_family',
              mood: -0.12,
            },
          },
          {
            id: 'gifts-carried-back',
            w: 0.5,
            text: '{partner}的哥哥把彩礼原样抬回来，在院门口数给全村人看。{subject}的母亲当场哭了出来，{subject}却把东西一件件收进屋里，最后把门关上，说以后谁也不许再提。',
            significance: 0.8,
            fx: {
              endRelation: ['partner', 'partner'],
              cash: 2,
              reputation: -0.06,
              role: 'returned_gifts',
            },
          },
        ],
      },
    ],
    baseRate: 0.03,
    cooldownYears: 5,
  },
  // 18 ─ cohabitation ──────────────────────────────────────────────────────
  {
    id: 'r13-rel.cohabitation',
    title: '把铺盖搬上三楼',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [18, 40],
    tags: ['relationship', 'cohabitation', 'household', 'housing', 'courtship'],
    contexts: ['vienna', 'urban', 'peace', 'industrial', 'war', 'postwar', 'crisis', 'reform'],
    milieus: [...HOME],
    roles: {
      partner: ['partner', { minAge: 18, maxAge: 45, sex: 'opposite' }],
      landlady: ['neighbor', { minAge: 35, maxAge: 75, sex: 'female' }],
    },
    outcomes: [
      {
        id: 'trunk-up-the-stairs',
        w: 0.35,
        text: '{partner}把一只箱子和一卷铺盖搬上三楼，{landlady}站在楼梯口数箱子，说多一个人就多一份煤钱。{subject}把两个人的工票并排压在镜子下面。第一夜，箱子没有打开，两个人坐在床沿上听楼下的钟。',
        significance: 0.8,
        fx: [
          {
            cash: -4,
            role: 'shared_household',
            relation: [
              ['landlady', 'colleague', 0.05, 0],
              ['partner', 'partner', 0, 0],
            ],
          },
          {
            raw: [
              {
                type: 'household',
                personId: '$partner',
                householdId: '$household',
                reason: 'moved in together before marriage',
              },
              {
                type: 'role',
                personId: '$partner',
                role: 'cohabitant',
                add: true,
                reason: 'moved in together before marriage',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                trust: 0.08,
                affection: 0.08,
                obligation: 0.12,
                reason: 'moved in together before marriage',
              },
            ],
          },
        ],
      },
      {
        id: 'landlady-said-no',
        w: 0.25,
        text: '{landlady}看见{partner}的箱子，说这栋楼不留没名分的两个人。{subject}把箱子又搬下楼，{partner}在门口等着，脸上没有表情。两人在街角站了一会儿，最后各自回了各自的家。',
        significance: 0.7,
        fx: {
          cash: -3,
          relation: [
            ['partner', 'partner', 0.04, 0],
            ['landlady', 'rival', -0.12, 0],
          ],
          role: 'looked_for_a_room',
          flag: 'lodging_refused',
        },
      },
      {
        id: 'separate-corners',
        w: 0.2,
        when: { minCash: 4 },
        text: '{subject}租下两间相连的小房，中间有一道可以关上的门。{partner}把工钱分成两叠，一叠付房租，一叠放在{subject}的抽屉里。邻居问什么时候办事，{subject}说先把日子过起来再说。',
        significance: 0.66,
        fx: [
          { cash: -2, role: 'married_in_all_but_name', relation: ['partner', 'partner', 0, 0] },
          {
            raw: [
              {
                type: 'household',
                personId: '$partner',
                householdId: '$household',
                reason: 'took adjoining rooms to live together quietly',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                trust: 0.06,
                obligation: 0.1,
                reason: 'took adjoining rooms to live together quietly',
              },
            ],
          },
        ],
      },
      {
        id: 'child-before-the-wedding',
        w: 0.2,
        when: { sex: 'female' },
        text: '{subject}在入冬前发现自己有了身孕。{partner}把婚期从明年提前到月底，{landlady}在楼道里替他们算月份，算完没有再说什么。孩子生下来时，两人还没有办酒，只把摇篮放在床脚，{partner}每夜起来两次。',
        significance: 0.84,
        fx: [
          {
            birth: { father: 'partner' },
            cash: -6,
            role: 'new_parent',
            flag: 'child_before_wedding',
          },
          {
            raw: [
              {
                type: 'relation',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                obligation: 0.15,
                reason: 'a child was born before the wedding',
              },
            ],
          },
        ],
      },
    ],
    variants: [
      {
        id: 'cohabitation-postwar',
        when: { contextTags: ['postwar', 'crisis'] },
        title: '一间房，两家人',
        outcomes: [
          {
            id: 'two-families-one-stove',
            w: 0.55,
            text: '战后房子紧，{subject}和{partner}只能合租一间。房东用一块木板隔出半边，另一家带着孩子住在外头。两家共用一只炉子，谁先回家谁生火。{partner}把{subject}的工票和自己的钉在一起。',
            significance: 0.7,
            fx: [
              {
                cash: 2,
                role: 'shared_flat',
                relation: [
                  ['landlady', 'colleague', 0.06, 0],
                  ['partner', 'partner', 0, 0],
                ],
              },
              {
                raw: [
                  {
                    type: 'household',
                    personId: '$partner',
                    householdId: '$household',
                    reason: 'shared a subdivided flat after the war',
                  },
                  {
                    type: 'relation',
                    a: '$subject',
                    b: '$partner',
                    kind: 'partner',
                    trust: 0.05,
                    obligation: 0.1,
                    reason: 'shared a subdivided flat after the war',
                  },
                ],
              },
            ],
          },
          {
            id: 'evicted-for-the-arrangement',
            w: 0.45,
            text: '{landlady}发现两人同住，第二天就让人把箱子搬到走廊。{partner}把能带的东西塞进一只麻袋，{subject}去工厂求一间宿舍。宿管说只收单身，{subject}在登记簿前站了很久。',
            significance: 0.74,
            fx: {
              cash: -6,
              relation: [
                ['partner', 'partner', 0.04, 0.05],
                ['landlady', 'rival', -0.15, 0],
              ],
              role: 'moved_again',
              flag: 'evicted_for_cohabitation',
            },
          },
        ],
      },
    ],
    baseRate: 0.05,
    cooldownYears: 4,
  },

  // 19 ─ marriage ──────────────────────────────────────────────────────────
  {
    id: 'r13-rel.marriage-civil',
    title: '市政厅的两个签名',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [18, 45],
    tags: ['relationship', 'marriage', 'wedding', 'institution', 'household', 'courtship'],
    contexts: ['vienna', 'urban', 'peace', 'industrial', 'postwar', 'reform', 'war'],
    milieus: [...GOVERNMENT, ...HOME],
    roles: {
      partner: ['partner', { minAge: 18, maxAge: 50, sex: 'opposite' }],
      official: ['official', { minAge: 25, maxAge: 70 }],
    },
    outcomes: [
      {
        id: 'signed-at-the-registry',
        w: 0.45,
        text: '{official}把两张表格推过来，指着签名的地方说，写完就不能反悔。{partner}先签，笔尖在纸上停了一下；{subject}签得很快。走出市政厅时，两人手里只有一张薄薄的纸，{partner}把它折好，放进{subject}的内袋。',
        significance: 0.85,
        fx: [
          {
            cash: -8,
            role: 'married',
            relation: [
              ['official', 'colleague', 0.05, 0],
              ['partner', 'partner', 0, 0],
            ],
          },
          {
            raw: [
              {
                type: 'household',
                personId: '$partner',
                householdId: '$household',
                reason: 'married at the civil registry',
              },
              {
                type: 'role',
                personId: '$subject',
                role: 'spouse',
                add: true,
                reason: 'married at the civil registry',
              },
              {
                type: 'role',
                personId: '$partner',
                role: 'spouse',
                add: true,
                reason: 'married at the civil registry',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                trust: 0.1,
                obligation: 0.2,
                reason: 'married at the civil registry',
              },
            ],
          },
        ],
      },
      {
        id: 'no-feast-no-ring',
        w: 0.3,
        when: { maxCash: 2 },
        text: '两人没有办酒，也没有买戒指。{official}问要不要念一段祝词，{partner}说不用，{subject}却让{official}念完。回家的路上，两人用婚礼钱买了一只新锅和半斤肉，邻居在楼道里闻到香味，敲了敲门。',
        significance: 0.8,
        fx: [
          { cash: -3, role: 'married_without_feast', relation: ['partner', 'partner', 0, 0] },
          {
            raw: [
              {
                type: 'household',
                personId: '$partner',
                householdId: '$household',
                reason: 'married without a feast',
              },
              {
                type: 'role',
                personId: '$subject',
                role: 'spouse',
                add: true,
                reason: 'married without a feast',
              },
              {
                type: 'role',
                personId: '$partner',
                role: 'spouse',
                add: true,
                reason: 'married without a feast',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                trust: 0.06,
                obligation: 0.15,
                reason: 'married without a feast',
              },
            ],
          },
        ],
      },
      {
        id: 'could-not-read-the-form',
        w: 0.25,
        when: { education: ['none'] },
        text: '{official}把表格推过来，{subject}才看清上面全是小字。{partner}替{subject}念了一遍，念到“自愿”时停住，问{subject}听懂了没有。{subject}点头，按了一个手印，指印比签名大得多。',
        significance: 0.72,
        fx: [
          { cash: -2, role: 'married_by_thumbprint', relation: ['partner', 'partner', 0, 0] },
          {
            raw: [
              {
                type: 'household',
                personId: '$partner',
                householdId: '$household',
                reason: 'married by thumbprint at the registry',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                trust: 0.08,
                obligation: 0.18,
                reason: 'married by thumbprint at the registry',
              },
            ],
          },
        ],
      },
    ],
    variants: [
      {
        id: 'marriage-civil-war',
        when: { contextTags: ['war'] },
        title: '军装与结婚证',
        outcomes: [
          {
            id: 'married-in-uniform',
            w: 0.55,
            text: '{partner}穿着军装站在市政厅门口，靴子上还沾着营房的泥。{official}加快速度，把日期和名字念了两遍。两人没有时间吃饭，{subject}把结婚证缝进{partner}的衬里，送{partner}到电车站。',
            significance: 0.84,
            fx: [
              { cash: -5, role: 'war_wedding', relation: ['partner', 'partner', 0, 0] },
              {
                raw: [
                  {
                    type: 'household',
                    personId: '$partner',
                    householdId: '$household',
                    reason: 'married in uniform during the war',
                  },
                  {
                    type: 'role',
                    personId: '$subject',
                    role: 'spouse',
                    add: true,
                    reason: 'married in uniform during the war',
                  },
                  {
                    type: 'role',
                    personId: '$partner',
                    role: 'spouse',
                    add: true,
                    reason: 'married in uniform during the war',
                  },
                  {
                    type: 'relation',
                    a: '$subject',
                    b: '$partner',
                    kind: 'partner',
                    trust: 0.08,
                    obligation: 0.2,
                    reason: 'married in uniform during the war',
                  },
                ],
              },
            ],
          },
          {
            id: 'needed-command-permission',
            w: 0.45,
            text: '{official}说军人结婚要有上级许可，光有征召令不行。{partner}当天就写了申请，{subject}把信送到营房门口，卫兵说三个星期才有回音。三个星期后，回音来了，婚期已经错过。',
            significance: 0.7,
            fx: {
              cash: -2,
              role: 'engaged',
              flag: 'command_permission_delayed',
              relation: ['partner', 'partner', 0.04, 0],
            },
          },
        ],
      },
    ],
    baseRate: 0.04,
    cooldownYears: 5,
  },

  // 20 ─ elopement ─────────────────────────────────────────────────────────
  {
    id: 'r13-rel.elopement',
    title: '夜班火车',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [18, 30],
    tags: ['relationship', 'courtship', 'elopement', 'flight', 'marriage'],
    contexts: ['vienna', 'urban', 'peace', 'industrial', 'rural', 'postwar', 'crisis'],
    milieus: [...HOME, 'transport'],
    roles: {
      partner: ['partner', { minAge: 18, maxAge: 35, sex: 'opposite' }],
      friend: ['neighbor', { minAge: 18, maxAge: 40 }],
    },
    outcomes: [
      {
        id: 'caught-the-night-train',
        w: 0.35,
        text: '{friend}在站台尽头望风，{subject}和{partner}从货棚后面绕上车尾。行李只有一只箱子和两件换洗衣裳，{partner}的手一直按在箱扣上。火车开动时，{subject}看见{friend}在站台上把帽子举了一下。',
        significance: 0.85,
        fx: [
          { cash: -12, role: 'eloped', reputation: -0.12, relation: ['partner', 'partner', 0, 0] },
          {
            raw: [
              {
                type: 'household',
                personId: '$partner',
                householdId: '$household',
                reason: 'eloped and took a room near the station',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                trust: 0.15,
                affection: 0.08,
                obligation: 0.2,
                reason: 'eloped together',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$friend',
                kind: 'friend',
                trust: 0.1,
                obligation: 0.08,
                reason: 'the friend kept watch at the station',
              },
            ],
          },
        ],
      },
      {
        id: 'brought-back-from-the-platform',
        w: 0.35,
        text: '火车还没进站，{partner}的哥哥就带着两个人堵在检票口。{subject}被拽下站台时，鞋掉在铁轨边。{partner}没有喊，只把箱子抱得更紧。回家的车上，三个人一路没有说话。',
        significance: 0.8,
        fx: [
          { cash: -5, role: 'brought_back', reputation: -0.15 },
          {
            raw: [
              {
                type: 'relation',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                trust: 0.05,
                fear: 0.1,
                reason: 'caught while trying to elope',
              },
            ],
          },
        ],
      },
      {
        id: 'turned-back-at-the-gate',
        w: 0.3,
        when: { maxCash: 2 },
        text: '{subject}在站台上数了三遍钱，发现只够买到下一站。{partner}说到了那里可以找活，{subject}却想起家里还病着的母亲。检票员催最后一遍时，{subject}把票撕了，{partner}的箱子还提在手里。',
        significance: 0.7,
        fx: [
          {
            relation: ['partner', 'partner', -0.08, 0],
            role: 'stayed_for_family',
            mood: -0.15,
          },
        ],
      },
    ],
    variants: [
      {
        id: 'elopement-rural',
        when: { contextTags: ['rural', 'small_town'] },
        title: '葡萄园边的夜路',
        outcomes: [
          {
            id: 'walked-through-the-vines',
            w: 0.55,
            text: '两人没有去车站，而是沿着葡萄园的小路走。{partner}提着灯，{subject}抱着包袱，脚上全是泥。天快亮时，他们在一座石墙后面停下，{partner}说再走两里就是邻村，那里没人认识他们。',
            significance: 0.82,
            fx: [
              { cash: -6, role: 'eloped_on_foot', reputation: -0.1 },
              {
                raw: [
                  {
                    type: 'household',
                    personId: '$partner',
                    householdId: '$household',
                    reason: 'took shelter in the next village',
                  },
                  {
                    type: 'relation',
                    a: '$subject',
                    b: '$partner',
                    kind: 'partner',
                    trust: 0.12,
                    obligation: 0.2,
                    reason: 'eloped on foot through the vineyards',
                  },
                ],
              },
            ],
          },
          {
            id: 'dog-and-lanterns',
            w: 0.45,
            text: '村里的狗先叫了起来。{partner}把灯吹灭，两人蹲在石墙后面，听见脚步声从路上过去。天亮后，{subject}的母亲带人找到了他们，{partner}被按在地上，{subject}一直抓着{partner}的袖子。',
            significance: 0.78,
            fx: {
              reputation: -0.12,
              role: 'brought_back',
              relation: ['partner', 'partner', 0.03, 0.06],
              mood: -0.1,
            },
          },
        ],
      },
    ],
    baseRate: 0.025,
    cooldownYears: 8,
  },

  // 21 ─ long engagement ───────────────────────────────────────────────────
  {
    id: 'r13-rel.long-engagement',
    title: '存折上的婚期',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [19, 40],
    tags: ['relationship', 'engagement', 'money', 'waiting', 'marriage', 'courtship'],
    contexts: ['vienna', 'urban', 'peace', 'industrial', 'war', 'postwar', 'crisis'],
    milieus: [...HOME, ...WORK],
    roles: {
      partner: ['partner', { minAge: 19, maxAge: 45, sex: 'opposite' }],
      parent: ['parent', { minAge: 40, maxAge: 80 }],
    },
    outcomes: [
      {
        id: 'still-saving',
        w: 0.4,
        text: '{subject}每月把工钱的一部分存进邮局，存折上画着一道道横线。{partner}把自己的那份也添进去，说等够买一张床和一只柜子就办事。{parent}每次问起，{subject}都说明年，明年一定。',
        significance: 0.7,
        fx: {
          cash: 2,
          role: 'long_engaged',
          relation: ['partner', 'partner', 0.05, 0],
          flag: 'saving_for_the_wedding',
        },
      },
      {
        id: 'married-with-one-witness',
        w: 0.35,
        when: { maxCash: 3 },
        text: '两人没有再等。{subject}请了半天假，{partner}借了一件干净外套，登记处只有一个办事员和一个扫地的老头作证。出门后，两人在街角吃了碗面，{partner}把面里的肉都拨给{subject}。',
        significance: 0.82,
        fx: [
          { cash: -4, role: 'married_quietly', relation: ['partner', 'partner', 0, 0] },
          {
            raw: [
              {
                type: 'household',
                personId: '$partner',
                householdId: '$household',
                reason: 'married quietly without waiting for savings',
              },
              {
                type: 'role',
                personId: '$subject',
                role: 'spouse',
                add: true,
                reason: 'married quietly without waiting for savings',
              },
              {
                type: 'role',
                personId: '$partner',
                role: 'spouse',
                add: true,
                reason: 'married quietly without waiting for savings',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                trust: 0.1,
                obligation: 0.18,
                reason: 'married quietly without waiting for savings',
              },
            ],
          },
        ],
      },
      {
        id: 'broke-it-off-at-last',
        w: 0.25,
        when: { minAge: 28 },
        text: '{subject}等到了第二十八岁，存折上的数字还是不够。{partner}的母亲病了一场，家里的钱全填了药费。两人在河边坐了一下午，最后{subject}说别等了，{partner}没有争，只把戒指摘下来还回去。',
        significance: 0.8,
        fx: {
          endRelation: ['partner', 'partner'],
          role: 'engagement_broken',
          mood: -0.12,
        },
      },
    ],
    variants: [
      {
        id: 'long-engagement-war',
        when: { contextTags: ['war'] },
        title: '婚期推到停战以后',
        outcomes: [
          {
            id: 'waiting-for-the-armistice',
            w: 0.55,
            text: '{partner}在前线，信里说等打完仗就回来办事。{subject}把婚期写在日历背面，每过一个月就划掉一格。{parent}劝{subject}别等了，{subject}把日历翻过去，说再等等。',
            significance: 0.74,
            fx: {
              cash: 1,
              role: 'long_engaged',
              condition: 'sleepless',
              relation: ['partner', 'partner', 0.08, 0],
            },
          },
          {
            id: 'proxy-wedding',
            w: 0.45,
            text: '婚礼由{partner}的哥哥代为出席，{subject}一个人站在圣像前。宾客吃得很少，话说得更少。晚上{subject}把两个人的碗摆好，对着空椅子坐了很久，才把菜收进橱柜。',
            significance: 0.78,
            fx: {
              cash: -5,
              role: 'proxy_wedding',
              flag: 'married_by_proxy',
              relation: ['partner', 'partner', 0.06, 0],
            },
          },
        ],
      },
    ],
    baseRate: 0.04,
    cooldownYears: 5,
  },

  // 22 ─ separation ────────────────────────────────────────────────────────
  {
    id: 'r13-rel.separation',
    title: '两只箱子，一个地址',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [20, 55],
    tags: ['relationship', 'separation', 'household', 'conflict', 'marriage'],
    contexts: ['vienna', 'urban', 'peace', 'industrial', 'war', 'postwar', 'crisis'],
    milieus: [...HOME],
    conditions: [{ kind: 'hasRelation', relationKind: 'partner' }],
    roles: {
      partner: ['partner', { minAge: 20, maxAge: 60, sameHousehold: true }],
    },
    outcomes: [
      {
        id: 'moved-to-shared-housing',
        w: 0.4,
        text: '{partner}把衣服收进箱子，锅碗分了一半。{subject}没有拦，只把门后的雨伞递过去，说这几天有雨。{partner}走后，{subject}把两个人的合照翻过来扣在柜子上，第二天照常去上工。',
        significance: 0.8,
        fx: [
          {
            relation: ['partner', 'partner', -0.12, 0],
            role: 'separated',
          },
          {
            raw: [
              {
                type: 'household',
                personId: '$partner',
                householdId: 'household:shared-tenement',
                reason: 'moved out after the marriage broke down',
              },
            ],
          },
        ],
      },
      {
        id: 'separate-beds-same-room',
        w: 0.35,
        text: '两人没有钱租两间房，只好把床分开，中间拉一根绳子晾衣服。米和煤各算各的，孩子在两床之间来回。夜里谁翻身，另一张床就跟着响，两个人都装作睡着了。天亮后，{subject}先起来生火，把{partner}的那份水也烧上。',
        significance: 0.7,
        fx: {
          relation: ['partner', 'partner', -0.08, 0],
          role: 'separated',
          flag: 'under_one_roof',
          mood: -0.08,
        },
      },
      {
        id: 'quarrel-died-down',
        w: 0.25,
        when: { minCash: 4 },
        text: '吵到后半夜，{subject}去灶上烧了一壶水，{partner}把摔在地上的账本捡起来。两人谁也没有道歉，只把明天的房租凑齐，放在桌子中间。第二天早晨，{partner}还是把{subject}的鞋摆到了门口。',
        significance: 0.56,
        fx: {
          relation: ['partner', 'partner', 0.02, 0],
          cash: -1,
          mood: -0.03,
        },
      },
    ],
    variants: [
      {
        id: 'separation-war',
        when: { contextTags: ['war'] },
        title: '征召令替他们分了居',
        outcomes: [
          {
            id: 'mobilized-before-the-quarrel-ended',
            w: 0.55,
            text: '两人的争吵还没说完，{partner}的征召令就贴到了门上。{subject}替{partner}收拾行李时，把那件没补完的衬衣也塞了进去。{partner}在门口站了一会儿，说等回来再吵，{subject}没有笑。',
            significance: 0.78,
            fx: [
              {
                role: 'separated_by_war',
                relation: ['partner', 'partner', -0.02, 0],
              },
              {
                raw: [
                  {
                    type: 'move',
                    personId: '$partner',
                    locationId: '@factory',
                    reason: 'mobilized in the middle of a marital quarrel',
                  },
                ],
              },
            ],
          },
          {
            id: 'followed-to-the-garrison-town',
            w: 0.45,
            text: '{subject}把家具卖掉一半，带着箱子追到{partner}驻防的城外，在车站附近租了一间小屋。{partner}每晚只能出来一个钟头，两人在路灯下站着说话，像刚认识时那样。',
            significance: 0.76,
            fx: [
              { cash: -6, role: 'following_the_regiment' },
              {
                raw: [
                  {
                    type: 'move',
                    personId: '$partner',
                    locationId: '@factory',
                    reason: 'posted to a garrison town',
                  },
                  {
                    type: 'move',
                    personId: '$subject',
                    locationId: '@station',
                    reason: 'followed the partner to the garrison town',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    baseRate: 0.04,
    cooldownYears: 5,
  },

  // 23 ─ reconciliation ────────────────────────────────────────────────────
  {
    id: 'r13-rel.reconciliation',
    title: '门口的那双鞋',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [20, 60],
    tags: ['relationship', 'reconciliation', 'separation', 'marriage', 'repair'],
    contexts: WIDE,
    milieus: [...HOME],
    conditions: [{ kind: 'hasRelation', relationKind: 'partner' }],
    roles: {
      partner: ['partner', { minAge: 20, maxAge: 60 }],
      mediator: ['neighbor', { minAge: 30, maxAge: 75 }],
    },
    outcomes: [
      {
        id: 'put-the-shoes-back-inside',
        w: 0.4,
        text: '{mediator}把两人叫到楼道里，说房租又涨了，一个人扛不住。{partner}把箱子提回来，放在门边没有打开。{subject}烧了一锅水，{partner}去拿碗，手在橱柜上停了一下。那晚，门口多摆了一双鞋。',
        significance: 0.78,
        fx: [
          { cash: -1, loseRole: 'separated' },
          {
            raw: [
              {
                type: 'household',
                personId: '$partner',
                householdId: '$household',
                reason: 'returned home after a separation',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                trust: 0.1,
                obligation: 0.08,
                reason: 'returned home after a separation',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$mediator',
                kind: 'friend',
                trust: 0.08,
                reason: 'mediated a reconciliation',
              },
            ],
          },
          { role: 'reconciled' },
        ],
      },
      {
        id: 'agreed-to-live-apart',
        w: 0.3,
        text: '两人在{mediator}的桌边把话说开，决定不再住在一起，但每月一起给孩子送钱。{partner}把地址写在纸条上，{subject}把它夹进账本。走出门时，两人并肩走了一段，到了路口才分开。',
        significance: 0.66,
        fx: {
          relation: ['partner', 'partner', 0.05, 0],
          role: 'separated_amicably',
          knowledge: ['the partner’s new address is written in the account book', 0.7],
        },
      },
      {
        id: 'refused-the-return',
        w: 0.3,
        when: { maxCash: 2 },
        text: '{partner}在门口站了半个钟头，{subject}没有开门。{mediator}在楼梯上叹气，说人总要有个地方睡。{subject}隔着门说，这里已经不是那个地方了。脚步声下楼后，{subject}才把灯点上。',
        significance: 0.78,
        fx: {
          endRelation: ['partner', 'partner'],
          role: 'irreconcilable',
          mood: -0.1,
        },
      },
    ],
    variants: [
      {
        id: 'reconciliation-crisis',
        when: { contextTags: ['crisis', 'scarcity'] },
        title: '房东把两间房收回',
        outcomes: [
          {
            id: 'forced-back-together',
            w: 0.55,
            text: '{partner}租的那间房被房东收回，箱子只能堆在走廊。{subject}让{partner}先进屋，说只是暂住。两个人把床重新拼起来，中间还是留了一道缝。月底算账时，谁也没有提这道缝。',
            significance: 0.74,
            fx: [
              { cash: -2, role: 'reconciled_for_rent' },
              {
                raw: [
                  {
                    type: 'household',
                    personId: '$partner',
                    householdId: '$household',
                    reason: 'moved back in after losing the rented room',
                  },
                  {
                    type: 'relation',
                    a: '$subject',
                    b: '$partner',
                    kind: 'partner',
                    trust: -0.02,
                    obligation: 0.06,
                    reason: 'moved back in after losing the rented room',
                  },
                ],
              },
            ],
          },
          {
            id: 'kept-the-door-closed',
            w: 0.45,
            text: '{partner}的箱子在走廊放了三天，{subject}每天从旁边跨过去。第四天，{mediator}帮忙把箱子寄存在地下室。{subject}在账本上记下三个克朗的寄存费，没有写{partner}的名字。',
            significance: 0.72,
            fx: {
              endRelation: ['partner', 'partner'],
              role: 'irreconcilable',
              cash: -3,
            },
          },
        ],
      },
    ],
    baseRate: 0.035,
    cooldownYears: 4,
  },

  // 24 ─ domestic conflict ─────────────────────────────────────────────────
  {
    id: 'r13-rel.domestic-conflict',
    title: '账本摔在地上',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [20, 60],
    tags: ['relationship', 'marriage', 'conflict', 'money', 'household'],
    contexts: WIDE,
    milieus: [...HOME],
    conditions: [{ kind: 'hasRelation', relationKind: 'partner' }],
    roles: {
      partner: ['partner', { minAge: 20, maxAge: 60, sameHousehold: true }],
      neighbor: ['neighbor', { minAge: 20, maxAge: 70 }],
    },
    outcomes: [
      {
        id: 'cold-war-at-the-table',
        w: 0.4,
        text: '账本摔在地上，{partner}说{subject}又把钱借给了娘家。{subject}没有捡，只把汤勺放下。两个人隔着一锅凉汤坐到半夜，最后{partner}去厨房睡了。第二天，桌上只有一副碗筷。',
        significance: 0.68,
        fx: {
          relation: ['partner', 'partner', -0.1, 0],
          role: 'estranged_at_table',
          mood: -0.08,
        },
      },
      {
        id: 'split-the-last-loaf',
        w: 0.3,
        when: { minCash: 3 },
        text: '吵到一半，{partner}看见{subject}的手在抖，就把声音放低了。两人把剩下的面包掰成两半，谁也没有再提那笔钱。第二天，{partner}把自己的烟钱放进桌上的铁盒，{subject}看见了，没有说破。',
        significance: 0.52,
        fx: {
          relation: ['partner', 'partner', 0.02, 0],
          cash: -1,
          mood: 0.02,
        },
      },
      {
        id: 'neighbor-heard-everything',
        w: 0.3,
        text: '声音大到隔壁敲墙，{neighbor}端着一碗汤站在门口，说孩子被吵醒了。{partner}把话咽回去，{subject}接过汤，手一抖，汤洒在门槛上。第二天，整栋楼都知道他们家昨晚为什么吵。',
        significance: 0.7,
        fx: {
          relation: [
            ['partner', 'partner', -0.06, 0],
            ['neighbor', 'colleague', 0.08, 0],
          ],
          role: 'public_quarrel',
          reputation: -0.04,
        },
      },
    ],
    variants: [
      {
        id: 'domestic-conflict-war',
        when: { contextTags: ['war', 'scarcity'] },
        title: '配给证撕成两半',
        outcomes: [
          {
            id: 'ration-card-torn',
            w: 0.5,
            text: '配给证被撕成两半，{partner}说{subject}把肉票给了别人，{subject}说那是给生病的孩子换的药。两人在地上捡纸片，拼了半天也拼不齐。第二天，两人分头去办事处补办，排了一整天的队。',
            significance: 0.74,
            fx: {
              cash: -3,
              condition: 'exhaustion',
              relation: ['partner', 'partner', -0.12, 0],
              role: 'ration_quarrel',
            },
          },
          {
            id: 'shared-the-last-piece',
            w: 0.5,
            text: '{partner}把最后一块面包推到{subject}面前，说自己不饿。{subject}知道{partner}一天没吃东西，就掰成两半，硬塞回去一半。两人坐在冷灶边吃完，谁也没有再提那张配给证。',
            significance: 0.66,
            fx: {
              cash: -1,
              relation: ['partner', 'partner', 0.08, 0.04],
              role: 'shared_last_bread',
            },
          },
        ],
      },
    ],
    baseRate: 0.05,
    cooldownYears: 2,
  },

  // 25 ─ domestic violence with escape/help ────────────────────────────────
  {
    id: 'r13-rel.domestic-violence',
    title: '半夜的敲门声',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [20, 50],
    tags: ['relationship', 'domestic_violence', 'escape', 'help', 'safety'],
    contexts: ['vienna', 'urban', 'peace', 'industrial', 'war', 'postwar', 'crisis', 'reform'],
    milieus: [...HOME, ...HOSPITAL],
    conditions: [{ kind: 'hasRelation', relationKind: 'partner' }],
    roles: {
      partner: ['partner', { minAge: 20, maxAge: 55, sameHousehold: true }],
      helper: ['neighbor', { minAge: 25, maxAge: 70, sex: 'female' }],
      official: ['official', { minAge: 25, maxAge: 70, required: true }],
    },
    outcomes: [
      {
        id: 'left-with-the-helper',
        w: 0.4,
        text: '碗摔碎后，{subject}抓起外套跑下楼，{helper}在楼梯口一把拉住{subjectPronoun}，把{subject}带进自己家，反锁了门。{partner}在门外砸了两下，被楼里的人喝住。天亮前，{helper}陪{subject}去拿了衣服。',
        significance: 0.88,
        fx: [
          { health: -0.06, cash: -3, role: 'sheltered' },
          {
            raw: [
              {
                type: 'household',
                personId: '$subject',
                householdId: 'household:shared-tenement',
                reason: 'fled to a safe shared household',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                fear: 0.2,
                reason: 'left after violence at home',
              },
              {
                type: 'relation_end',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                reason: 'left after violence at home',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$helper',
                kind: 'friend',
                trust: 0.18,
                obligation: 0.06,
                reason: 'gave shelter after violence at home',
              },
            ],
          },
        ],
      },
      {
        id: 'filed-a-complaint',
        w: 0.3,
        text: '{subject}没有等到天亮，直接去了派出所。{official}让{subject}把经过写下来，又叫人去传{partner}。{partner}被关了一夜，第二天放出来，站在街对面看着{subject}搬走，没有说话。',
        significance: 0.85,
        fx: [
          { health: -0.06, cash: -2, role: 'complaint_filed', reputation: -0.05 },
          {
            raw: [
              {
                type: 'relation',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                fear: 0.25,
                reason: 'filed a complaint after violence',
              },
              {
                type: 'relation_end',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                reason: 'filed a complaint after violence',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$official',
                kind: 'acquaintance',
                trust: 0.1,
                reason: 'accepted a complaint about violence',
              },
              {
                type: 'household',
                personId: '$subject',
                householdId: 'household:shared-tenement',
                reason: 'moved out after filing a complaint',
              },
            ],
          },
        ],
      },
      {
        id: 'stayed-for-now',
        w: 0.3,
        when: { maxCash: 2 },
        text: '{partner}酒醒后跪在地上，说再也不会了。{subject}没有答应，也没有走，因为孩子第二天要交学费。{helper}把一把备用钥匙塞给{subject}，说门随时能开。{subject}把钥匙串在脖子上，藏在衣领里。',
        significance: 0.8,
        fx: [
          {
            health: -0.04,
            condition: 'bruised',
            role: 'watched_by_neighbors',
            mood: -0.15,
          },
          {
            raw: [
              {
                type: 'relation',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                trust: -0.25,
                fear: 0.3,
                reason: 'stayed after violence, with a neighbour’s key',
              },
              {
                type: 'knowledge',
                holderId: '$subject',
                proposition: 'the neighbour keeps a spare key for an emergency exit',
                confidence: 0.9,
                sourceKind: 'told',
                personId: '$helper',
                visibility: 'private',
                trueInWorld: true,
              },
            ],
          },
        ],
      },
    ],
    variants: [
      {
        id: 'domestic-violence-war',
        when: { contextTags: ['war'] },
        title: '从前线回来以后',
        outcomes: [
          {
            id: 'left-before-the-next-night',
            w: 0.55,
            text: '{partner}从前线回来后，夜里常常惊醒，摔东西，抓住{subject}的手腕不放。{helper}听见动静，敲门说要借盐。{subject}借着这句话出了门，只带走一个布包和孩子的出生证明。',
            significance: 0.88,
            fx: [
              { health: -0.08, cash: -4, role: 'sheltered_after_return' },
              {
                raw: [
                  {
                    type: 'household',
                    personId: '$subject',
                    householdId: 'household:shared-tenement',
                    reason: 'left a violent veteran household',
                  },
                  {
                    type: 'relation',
                    a: '$subject',
                    b: '$partner',
                    kind: 'partner',
                    fear: 0.3,
                    reason: 'left a violent veteran household',
                  },
                  {
                    type: 'relation_end',
                    a: '$subject',
                    b: '$partner',
                    kind: 'partner',
                    reason: 'left a violent veteran household',
                  },
                  {
                    type: 'relation',
                    a: '$subject',
                    b: '$helper',
                    kind: 'friend',
                    trust: 0.2,
                    reason: 'used a borrowed-salt excuse to get out',
                  },
                ],
              },
            ],
          },
          {
            id: 'reported-and-removed',
            w: 0.45,
            text: '{subject}去了退伍军人事务处，又去了派出所。{official}记录下{partner}的伤情和夜里的事，联系医院把人接走。{subject}回家收拾时，发现{partner}把军功章留在了桌上。',
            significance: 0.84,
            fx: [
              {
                health: -0.05,
                role: 'complaint_filed',
                relation: ['official', 'colleague', 0.12, 0],
              },
              {
                raw: [
                  {
                    type: 'relation_end',
                    a: '$subject',
                    b: '$partner',
                    kind: 'partner',
                    reason: 'had a violent veteran removed from the household',
                  },
                  {
                    type: 'condition',
                    personId: '$partner',
                    condition: 'shell_shock',
                    add: true,
                    reason: 'removed to hospital after violence at home',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    baseRate: 0.02,
    cooldownYears: 8,
  },

  // 26 ─ affair discovery ──────────────────────────────────────────────────
  {
    id: 'r13-rel.affair-discovery',
    title: '衣领上的香水',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [22, 55],
    tags: ['relationship', 'marriage', 'affair', 'betrayal', 'conflict'],
    contexts: WIDE,
    milieus: [...HOME, ...WORK, ...CAFE],
    conditions: [{ kind: 'hasRelation', relationKind: 'partner' }],
    roles: {
      partner: ['partner', { minAge: 22, maxAge: 55, sameHousehold: true }],
      lover: ['neighbor', { minAge: 20, maxAge: 50 }],
    },
    outcomes: [
      {
        id: 'confronted-at-the-door',
        w: 0.35,
        text: '{subject}在{partner}的衣领上闻到一股陌生的香水味，又在口袋里摸到一张咖啡馆的账单。{partner}先说是在同事家沾的，后来不说了。{subject}把账单摊在桌上，两个人坐到天亮，谁也没有去睡。',
        significance: 0.8,
        fx: {
          relation: [
            ['partner', 'partner', -0.3, -0.05],
            ['lover', 'rival', -0.15, 0],
          ],
          role: 'wronged_spouse',
          mood: -0.15,
        },
      },
      {
        id: 'said-nothing',
        w: 0.3,
        text: '{subject}把衣领翻回去，什么也没问。此后{partner}晚归，{subject}就先把饭收进橱柜；{partner}身上有香味，{subject}就把窗子打开。夜里{subject}睁着眼，听见{partner}在身旁翻来覆去。',
        significance: 0.7,
        fx: {
          relation: ['partner', 'partner', -0.15, 0],
          condition: 'sleepless',
          flag: 'feigned_ignorance',
        },
      },
      {
        id: 'packed-and-left',
        w: 0.35,
        when: { minCash: 4 },
        text: '{subject}没有吵，趁{partner}上工时把自己的东西收进两只箱子。房东问要不要留话，{subject}说不用。搬进合租房的第一夜，{subject}把床铺铺得很平，窗户开着，香水的味道终于散了。',
        significance: 0.88,
        fx: [
          { cash: -6, role: 'left_after_affair' },
          {
            raw: [
              {
                type: 'household',
                personId: '$subject',
                householdId: 'household:shared-tenement',
                reason: 'left after discovering an affair',
              },
              {
                type: 'relation_end',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                reason: 'left after discovering an affair',
              },
            ],
          },
        ],
      },
    ],
    variants: [
      {
        id: 'affair-discovery-war',
        when: { contextTags: ['war'] },
        title: '战地寄回的别人的信',
        outcomes: [
          {
            id: 'found-the-letter',
            w: 0.55,
            text: '{partner}从战地寄回一封信，信封里却夹着一张写给别人的照片。{subject}把照片翻过来，背面有一行女人的字。{subject}没有回信，只把照片放进抽屉，等{partner}回来当面问。',
            significance: 0.8,
            fx: {
              relation: ['partner', 'partner', -0.25, 0],
              role: 'wronged_spouse',
              knowledge: ['a woman’s photograph came inside the field letter', 0.85],
              flag: 'waited_to_confront',
            },
          },
          {
            id: 'burned-the-letter',
            w: 0.45,
            text: '{subject}把照片和信一起塞进炉子，看着火把那张脸卷起来。此后{partner}的每封信，{subject}都先放在桌上晾一天才拆。信里写前线的雪，{subject}回信只写家里的煤够不够烧。',
            significance: 0.72,
            fx: {
              relation: ['partner', 'partner', -0.1, 0],
              condition: 'sleepless',
              flag: 'burned_the_photograph',
            },
          },
        ],
      },
    ],
    baseRate: 0.025,
    cooldownYears: 6,
  },

  // 27 ─ trust repair ──────────────────────────────────────────────────────
  {
    id: 'r13-rel.trust-repair',
    title: '重新摆好的两副碗筷',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [22, 60],
    tags: ['relationship', 'marriage', 'repair', 'trust', 'affair'],
    contexts: WIDE,
    milieus: [...HOME],
    conditions: [{ kind: 'hasRelation', relationKind: 'partner' }],
    roles: {
      partner: ['partner', { minAge: 22, maxAge: 60, sameHousehold: true }],
      confidant: ['neighbor', { minAge: 25, maxAge: 70 }],
    },
    outcomes: [
      {
        id: 'wrote-down-the-rules',
        w: 0.4,
        text: '两人在{confidant}的见证下把话写在一张纸上：工钱怎么交、晚归怎么说、旧事不再翻。{partner}先签，{subject}签完把纸折好，放进装房契的铁盒。那天晚上，桌上重新摆了两副碗筷。',
        significance: 0.74,
        fx: [
          { role: 'reconciled', cash: -1 },
          {
            raw: [
              {
                type: 'relation',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                trust: 0.12,
                obligation: 0.1,
                reason: 'wrote down mutual rules after a breach of trust',
              },
              {
                type: 'knowledge',
                holderId: '$subject',
                proposition: 'the household rules are kept in the deed box',
                confidence: 0.9,
                sourceKind: 'witnessed',
                personId: '$confidant',
                visibility: 'private',
                trueInWorld: true,
              },
            ],
          },
        ],
      },
      {
        id: 'separate-rooms-same-flat',
        w: 0.3,
        text: '{subject}和{partner}没有分开，但把床搬到了两个房间。{partner}每月把工钱放在桌上，{subject}收下，记在账本里。两人一起吃饭，一起应付房东，夜里各自关门。{confidant}问这样算不算和好，{subject}说先过着。',
        significance: 0.68,
        fx: {
          relation: ['partner', 'partner', 0.04, 0],
          role: 'separated_under_roof',
          flag: 'half_reconciled',
        },
      },
      {
        id: 'the-third-fight',
        w: 0.3,
        when: { maxCash: 2 },
        text: '第三次谈话还是以摔门结束。{partner}说{subject}永远不会忘，{subject}说{partner}根本没有想让人忘。{confidant}在门外听见，没有再进去。第二天，{subject}把离婚申请的问询地址抄在纸上。',
        significance: 0.8,
        fx: {
          endRelation: ['partner', 'partner'],
          role: 'irreconcilable',
          mood: -0.1,
        },
      },
    ],
    variants: [
      {
        id: 'trust-repair-reform',
        when: { contextTags: ['reform'] },
        title: '诊所里的第三次谈话',
        outcomes: [
          {
            id: 'counsellor-listened',
            w: 0.55,
            text: '市立诊所新设了家庭咨询，{subject}和{partner}被{confidant}劝去了一次。医生没有问谁对谁错，只让两人各说一刻钟，中间不许打断。{partner}说到一半停了，{subject}第一次听见{partner}承认害怕。',
            significance: 0.74,
            fx: [
              { cash: -5, role: 'counseled' },
              {
                raw: [
                  {
                    type: 'relation',
                    a: '$subject',
                    b: '$partner',
                    kind: 'partner',
                    trust: 0.1,
                    obligation: 0.08,
                    reason: 'attended a family consultation together',
                  },
                ],
              },
            ],
          },
          {
            id: 'stopped-going',
            w: 0.45,
            text: '第二次谈话{partner}没有来。{subject}在诊所走廊坐到下班，医生把记录本合上，说下次可以一个人来。{subject}没有再去，把预约单折成一只小船，放进炉子。',
            significance: 0.72,
            fx: {
              endRelation: ['partner', 'partner'],
              role: 'irreconcilable',
              cash: -2,
            },
          },
        ],
      },
    ],
    baseRate: 0.035,
    cooldownYears: 4,
  },

  // 28 ─ divorce ───────────────────────────────────────────────────────────
  {
    id: 'r13-rel.divorce',
    title: '法院走廊的尽头',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [22, 58],
    tags: ['relationship', 'divorce', 'law', 'marriage', 'household'],
    contexts: ['vienna', 'urban', 'peace', 'industrial', 'postwar', 'reform', 'crisis'],
    milieus: [...GOVERNMENT, ...HOME],
    conditions: [{ kind: 'hasRelation', relationKind: 'partner' }],
    roles: {
      partner: ['partner', { minAge: 22, maxAge: 60 }],
      official: ['official', { minAge: 28, maxAge: 72 }],
    },
    outcomes: [
      {
        id: 'uncontested-decree',
        w: 0.4,
        text: '{official}把两份陈述并排放在桌上，问有没有要补充的。{subject}说没有，{partner}也说没有。印章落下去时，走廊里有人在拖地，水声一直响到门口。两人一前一后走出去，没有道别。',
        significance: 0.85,
        fx: [
          { cash: -10, role: 'divorced', relation: ['official', 'colleague', 0.04, 0] },
          {
            raw: [
              {
                type: 'relation_end',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                reason: 'uncontested divorce',
              },
            ],
          },
        ],
      },
      {
        id: 'contested-over-the-furniture',
        w: 0.35,
        text: '两人为一只柜子和半年的欠租在法庭上争了三个钟头。{partner}说柜子是娘家陪送的，{subject}说自己付了运费。{official}最后把柜子判给{partner}，{subject}在走廊里把钥匙交出去，钥匙串上还挂着两个人房门的那一把。',
        significance: 0.88,
        fx: [
          { cash: -18, role: 'divorced', reputation: -0.08 },
          {
            raw: [
              {
                type: 'relation_end',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                reason: 'contested divorce',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$partner',
                kind: 'rival',
                trust: -0.2,
                reason: 'fought over property in divorce court',
              },
            ],
          },
        ],
      },
      {
        id: 'could-not-afford-the-fee',
        w: 0.25,
        when: { maxCash: 1 },
        text: '{official}说诉讼费要先交，{subject}把口袋里的钱数了两遍，还是差一半。回家的路上，{subject}在法院门口坐了很久。{partner}已经搬走，婚没有离成，地址却已经分开。',
        significance: 0.66,
        fx: {
          relation: ['partner', 'partner', -0.05, 0],
          role: 'separated',
          flag: 'divorce_pending',
        },
      },
    ],
    variants: [
      {
        id: 'divorce-postwar',
        when: { contextTags: ['postwar', 'crisis'] },
        title: '战后堆积的离婚案',
        outcomes: [
          {
            id: 'quick-decree-for-returning-soldiers',
            w: 0.55,
            text: '战后法院一天要处理十几桩这样的案子。{official}问{partner}是否承认离家四年，{partner}点头。{subject}没有提另一个人的名字，只要求把孩子的姓留下。印章落下时，窗外正在拆防空的沙袋。',
            significance: 0.84,
            fx: [
              { cash: -8, role: 'divorced' },
              {
                raw: [
                  {
                    type: 'relation_end',
                    a: '$subject',
                    b: '$partner',
                    kind: 'partner',
                    reason: 'divorce after wartime separation',
                  },
                ],
              },
            ],
          },
          {
            id: 'case-adjourned',
            w: 0.45,
            text: '{partner}没有到庭，案子只能延期。{subject}在走廊里等到中午，{official}说下个月再来。回家的电车上，{subject}看见{partner}站在另一节车厢，两个人都没有动。',
            significance: 0.7,
            fx: {
              relation: ['partner', 'partner', -0.08, 0],
              role: 'separated',
              flag: 'divorce_pending',
            },
          },
        ],
      },
    ],
    baseRate: 0.02,
    cooldownYears: 10,
  },

  // 29 ─ widowhood ─────────────────────────────────────────────────────────
  {
    id: 'r13-rel.widowhood',
    title: '冬天留下的空枕头',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [28, 58],
    tags: ['relationship', 'marriage', 'death', 'grief', 'widowhood'],
    contexts: ['vienna', 'urban', 'peace', 'industrial', 'war', 'postwar', 'crisis'],
    milieus: [...HOME, ...HOSPITAL],
    conditions: [{ kind: 'hasRelation', relationKind: 'partner' }],
    roles: {
      partner: ['partner', { minAge: 28, maxAge: 65, sameHousehold: true }],
    },
    outcomes: [
      {
        id: 'pneumonia-took-him',
        w: 0.3,
        text: '{partner}咳了半个月，最后连水都咽不下。医生来看了两次，第二次只留下几包药和一张账单。下葬那天雪很厚，{subject}把{partner}的旧围巾放进棺材，回家后把它从箱底翻出来，又放回去。',
        significance: 0.9,
        fx: [
          { cash: -8, role: 'widowed', mood: -0.2 },
          {
            raw: [
              {
                type: 'death',
                personId: '$partner',
                cause: 'pneumonia after a winter of untreated fever',
                reason: 'died of pneumonia at home',
              },
            ],
          },
        ],
      },
      {
        id: 'tuberculosis-took-her',
        w: 0.2,
        text: '{partner}在疗养院住了半年，账单比药先到。最后一个月，{subject}每天下班后坐车去看，隔着玻璃比划。人走的那天，{subject}正在路上，赶到时床头已经收拾干净。',
        significance: 0.9,
        fx: [
          { cash: -12, health: -0.04, role: 'widowed', mood: -0.2 },
          {
            raw: [
              {
                type: 'death',
                personId: '$partner',
                cause: 'pulmonary tuberculosis after months in a sanatorium',
                reason: 'died of tuberculosis',
              },
            ],
          },
        ],
      },
      {
        id: 'nursed-through-the-winter',
        w: 0.3,
        text: '{subject}请了三个星期的假，每天熬粥、换布、数着药片。{partner}退烧那天，{subject}坐在床边睡着了，醒来时发现{partner}正看着{subjectPronoun}。开春后，两人把药瓶洗干净，留着装盐。',
        significance: 0.7,
        fx: [
          {
            cash: -6,
            health: -0.03,
            role: 'nursed_spouse',
            relation: ['partner', 'partner', 0.08, 0.04],
          },
        ],
      },
      {
        id: 'sent-to-the-spa',
        w: 0.2,
        when: { minCash: 8 },
        text: '{subject}把能卖的都卖了，送{partner}去南边的疗养地。{partner}走后，{subject}每周写一封信，信里只说家里的花开了、煤够烧。{partner}的回信越来越短，最后只剩一句“别寄钱了”。',
        significance: 0.68,
        fx: [
          {
            cash: -20,
            role: 'sent_to_spa',
            flag: 'spa_cure',
            relation: ['partner', 'partner', 0.05, 0],
          },
        ],
      },
    ],
    variants: [
      {
        id: 'widowhood-postwar',
        when: { contextTags: ['postwar'] },
        title: '战后才确诊的肺病',
        outcomes: [
          {
            id: 'hospital-bed-in-the-corridor',
            w: 0.55,
            text: '医院把病床加到了走廊，{partner}的床位挨着暖气片。{subject}每天送饭，护士说不能再收东西。人走的那晚，{subject}在走廊的长椅上坐到天亮，手里的饭盒还是温的。',
            significance: 0.9,
            fx: [
              { cash: -6, role: 'widowed', mood: -0.2 },
              {
                raw: [
                  {
                    type: 'death',
                    personId: '$partner',
                    cause: 'tuberculosis diagnosed too late in a crowded postwar ward',
                    reason: 'died in an overcrowded hospital corridor',
                  },
                ],
              },
            ],
          },
          {
            id: 'survived-the-sanatorium',
            w: 0.45,
            text: '{partner}从疗养院回来时瘦得脱了形，但能自己走楼梯。{subject}把家里的重活都接过去，{partner}坐在窗边糊纸盒，一天糊不了几个。两人算着药钱过日子，谁也没有提以后。',
            significance: 0.74,
            fx: [
              {
                cash: -10,
                role: 'caring_for_survivor',
                condition: 'exhaustion',
                relation: ['partner', 'partner', 0.06, 0.04],
              },
            ],
          },
        ],
      },
    ],
    baseRate: 0.012,
    cooldownYears: 12,
  },

  // 30 ─ remarriage ────────────────────────────────────────────────────────
  {
    id: 'r13-rel.remarriage',
    title: '第二次婚礼上的旧戒指',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [25, 58],
    tags: ['relationship', 'remarriage', 'marriage', 'courtship', 'household'],
    contexts: ['vienna', 'urban', 'peace', 'industrial', 'postwar', 'reform', 'crisis'],
    milieus: [...HOME, ...GOVERNMENT],
    conditions: [{ kind: 'notHasRelation', relationKind: 'partner' }],
    roles: {
      partner: ['partner', { minAge: 25, maxAge: 60, sex: 'opposite' }],
    },
    outcomes: [
      {
        id: 'quiet-remarriage',
        w: 0.4,
        text: '{subject}把旧戒指熔了，重新打成一枚素圈。婚礼只有一桌人，孩子坐在末席，把面包撕成小块。{partner}给孩子夹了一筷子菜，孩子没有道谢，但吃了。晚上，一家人第一次在同一盏灯下坐着。',
        significance: 0.82,
        fx: [
          { cash: -7, role: 'remarried', relation: ['partner', 'partner', 0, 0] },
          {
            raw: [
              {
                type: 'household',
                personId: '$partner',
                householdId: '$household',
                reason: 'remarried and moved in',
              },
              {
                type: 'role',
                personId: '$subject',
                role: 'spouse',
                add: true,
                reason: 'remarried',
              },
              {
                type: 'role',
                personId: '$partner',
                role: 'spouse',
                add: true,
                reason: 'remarried',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                trust: 0.1,
                obligation: 0.15,
                reason: 'remarried after a previous loss',
              },
            ],
          },
        ],
      },
      {
        id: 'child-objected',
        w: 0.3,
        when: { hasRole: 'widowed' },
        text: '孩子在婚礼前一天把{partner}送来的鞋踢到床下，说{subject}忘了从前的人。{subject}没有骂，只把鞋捡起来放回盒子。婚礼照常举行，孩子没有去，桌上留着一副空碗筷。',
        significance: 0.74,
        fx: [
          { cash: -5, role: 'remarried', relation: ['partner', 'partner', 0, 0] },
          {
            raw: [
              {
                type: 'household',
                personId: '$partner',
                householdId: '$household',
                reason: 'remarried over a child’s objection',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                trust: 0.02,
                obligation: 0.12,
                reason: 'remarried over a child’s objection',
              },
            ],
          },
        ],
      },
      {
        id: 'long-engagement-again',
        w: 0.3,
        when: { maxCash: 3 },
        text: '{partner}说等孩子大一点再搬过来，{subject}同意了。两人每周末一起吃饭，{partner}走时把工钱留下一部分。孩子开始叫{partner}的名字，不再叫“那个人”。这样过了两年，婚期还是没有定。',
        significance: 0.66,
        fx: {
          cash: 1,
          role: 'engaged_again',
          relation: ['partner', 'partner', 0.05, 0],
          flag: 'slow_remarriage',
        },
      },
    ],
    variants: [
      {
        id: 'remarriage-postwar',
        when: { contextTags: ['postwar'] },
        title: '战后重新凑起来的家',
        outcomes: [
          {
            id: 'two-widows-one-flat',
            w: 0.55,
            text: '两个人都失去了原来的伴侣，各自带着孩子。{subject}把两家的床并到一间屋里，{partner}把两只箱子摞在墙角。第一顿饭，四个孩子抢一只锅，{partner}把最大的那块肉夹给{subject}的孩子。',
            significance: 0.8,
            fx: [
              { cash: -4, role: 'remarried', relation: ['partner', 'partner', 0, 0] },
              {
                raw: [
                  {
                    type: 'household',
                    personId: '$partner',
                    householdId: '$household',
                    reason: 'merged two postwar households',
                  },
                  {
                    type: 'relation',
                    a: '$subject',
                    b: '$partner',
                    kind: 'partner',
                    trust: 0.08,
                    obligation: 0.12,
                    reason: 'merged two postwar households',
                  },
                ],
              },
            ],
          },
          {
            id: 'waited-for-the-pension',
            w: 0.45,
            text: '{subject}的抚恤金要等再婚满一年才停，{partner}说那就先不办手续。两人住在一起，对外说是亲戚。办事处来查过一次，孩子在门口说这是{subjectPronoun}叔叔。',
            significance: 0.66,
            fx: {
              cash: 3,
              role: 'engaged_again',
              flag: 'pension_delay',
              relation: ['partner', 'partner', 0.04, 0],
            },
          },
        ],
      },
    ],
    baseRate: 0.025,
    cooldownYears: 8,
  },

  // 31 ─ stepfamily conflict ───────────────────────────────────────────────
  {
    id: 'r13-rel.stepfamily-conflict',
    title: '饭桌上的第四个碗',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [25, 60],
    tags: ['relationship', 'stepfamily', 'family', 'conflict', 'household'],
    contexts: WIDE,
    milieus: [...HOME],
    conditions: [{ kind: 'hasRelation', relationKind: 'partner' }],
    roles: {
      partner: ['partner', { minAge: 25, maxAge: 60, sameHousehold: true }],
      stepchild: ['neighbor', { minAge: 8, maxAge: 20 }],
    },
    outcomes: [
      {
        id: 'rules-at-the-table',
        w: 0.35,
        text: '{stepchild}把碗推到桌边，说这不是{subjectPronoun}的家。{subject}把碗放回去，说从今天起吃饭要等人齐。{partner}夹在中间，筷子举了很久。那顿饭没有人添第二碗，碗底的汤凉了。',
        significance: 0.72,
        fx: [
          { role: 'strict_step_parent' },
          {
            raw: [
              {
                type: 'role',
                personId: '$stepchild',
                role: 'stepchild',
                add: true,
                reason: 'became a stepchild through remarriage',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$stepchild',
                kind: 'kin',
                trust: -0.12,
                fear: 0.05,
                reason: 'strict rules imposed on a stepchild',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                trust: 0.03,
                reason: 'tension over stepchild discipline',
              },
            ],
          },
        ],
      },
      {
        id: 'stepchild-ran-away',
        w: 0.3,
        text: '{stepchild}没有回家吃晚饭，第二天也没回来。{partner}找遍了车站和亲戚家，最后在城里的姑姑家找到人。{stepchild}不肯回来，姑姑说让孩子先住一阵。{partner}回来后，第一次对{subject}摔了门。',
        significance: 0.78,
        fx: [
          { role: 'blamed_step_parent' },
          {
            raw: [
              {
                type: 'household',
                personId: '$stepchild',
                householdId: 'household:shared-tenement',
                reason: 'sent to relatives in the city after running away',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$stepchild',
                kind: 'kin',
                trust: -0.2,
                reason: 'the stepchild ran away from home',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                trust: -0.08,
                reason: 'blamed for the stepchild running away',
              },
            ],
          },
        ],
      },
      {
        id: 'truce-over-mending',
        w: 0.35,
        when: { skill: { name: 'social', min: 0.4 } },
        text: '{subject}不逼{stepchild}叫{subjectPronoun}什么，只把{stepchild}破了的书包补好，放在门口。{stepchild}第二天背着去上学，回来时把书包挂在{subject}的椅背上。{partner}看见了，没有说破，只多添了一勺汤。',
        significance: 0.68,
        fx: [
          { role: 'step_parent' },
          {
            raw: [
              {
                type: 'role',
                personId: '$stepchild',
                role: 'stepchild',
                add: true,
                reason: 'a stepchild came to accept the household',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$stepchild',
                kind: 'kin',
                trust: 0.08,
                affection: 0.04,
                reason: 'a quiet truce with a stepchild',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                trust: 0.06,
                reason: 'a quiet truce with a stepchild',
              },
            ],
          },
        ],
      },
    ],
    variants: [
      {
        id: 'stepfamily-conflict-war',
        when: { contextTags: ['war', 'postwar'] },
        title: '别人家的孩子叫我爸爸',
        outcomes: [
          {
            id: 'accepted-the-child',
            w: 0.5,
            text: '孩子是{partner}从前一段婚姻带来的，父亲死在前线。{subject}第一次听见孩子开口叫{subjectPronoun}的时候，正在修一只坏掉的炉子。{subject}没有回头，只应了一声，手上继续拧螺丝。',
            significance: 0.7,
            fx: [
              { role: 'step_father' },
              {
                raw: [
                  {
                    type: 'role',
                    personId: '$stepchild',
                    role: 'stepchild',
                    add: true,
                    reason: 'a war orphan came to call the subject father',
                  },
                  {
                    type: 'relation',
                    a: '$subject',
                    b: '$stepchild',
                    kind: 'kin',
                    trust: 0.1,
                    affection: 0.04,
                    reason: 'a war orphan came to call the subject father',
                  },
                ],
              },
            ],
          },
          {
            id: 'child-sent-to-relatives',
            w: 0.5,
            text: '孩子始终不肯和{subject}同桌吃饭，{partner}只好把孩子送到城里的外婆家。走的那天，孩子背着一只小包袱，{subject}把路上吃的面包塞给孩子。孩子接了，还是没叫{subjectPronoun}。',
            significance: 0.76,
            fx: [
              { role: 'blamed_step_parent' },
              {
                raw: [
                  {
                    type: 'household',
                    personId: '$stepchild',
                    householdId: 'household:shared-tenement',
                    reason: 'sent to the grandmother in the city after refusing the household',
                  },
                  {
                    type: 'relation',
                    a: '$subject',
                    b: '$partner',
                    kind: 'partner',
                    trust: -0.05,
                    reason: 'sent the stepchild away',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    baseRate: 0.04,
    cooldownYears: 4,
  },

  // 32 ─ friendship after separation ───────────────────────────────────────
  {
    id: 'r13-rel.friendship-after-separation',
    title: '街角的点头',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [22, 60],
    tags: ['relationship', 'separation', 'friendship', 'ex_partner', 'civility'],
    contexts: WIDE,
    milieus: [...HOME, ...SHOP],
    roles: {
      ex: ['neighbor', { minAge: 22, maxAge: 60 }],
      friend: ['neighbor', { minAge: 22, maxAge: 65 }],
    },
    outcomes: [
      {
        id: 'civil-at-the-corner',
        w: 0.4,
        text: '{subject}在街角遇见{ex}，两人同时停了一下。{ex}问{subject}的母亲身体怎么样，{subject}说还好，又问{ex}的新住处漏不漏雨。{friend}在旁边的摊子付钱，装作没听见。临走时，两人互相点了下头。',
        significance: 0.68,
        fx: {
          relation: [
            ['ex', 'friend', 0.08, 0.02],
            ['friend', 'friend', 0.05, 0],
          ],
          role: 'civil_with_ex',
        },
      },
      {
        id: 'crossed-the-street',
        w: 0.35,
        text: '{subject}看见{ex}从对面走来，先拐进了布店。{ex}在门口停了一拍，没有跟进来。{friend}后来问{subject}要不要一起喝茶，{subject}说改天。那天晚上，{subject}把{ex}留下的旧手帕翻出来，又塞回抽屉。',
        significance: 0.58,
        fx: {
          relation: ['ex', 'acquaintance', -0.03, 0],
          role: 'avoids_ex',
          mood: -0.04,
        },
      },
      {
        id: 'old-affection-surfaced',
        w: 0.25,
        when: { maxCash: 2 },
        text: '{ex}在雨天替{subject}把晾在外面的衣服收进来，叠得和从前一样。{subject}接过衣服时，闻见{ex}身上还是那股肥皂味。{friend}在楼上看见了，第二天问{subject}是不是又想搬回去，{subject}没有回答。',
        significance: 0.7,
        fx: {
          relation: ['ex', 'friend', 0, 0.12],
          role: 'unfinished_business',
          flag: 'old_attachment',
        },
      },
    ],
    variants: [
      {
        id: 'friendship-after-separation-postwar',
        when: { contextTags: ['postwar'] },
        title: '同一个院子里的两个家',
        outcomes: [
          {
            id: 'shared-the-courtyard',
            w: 0.55,
            text: '两人离婚后仍住同一个院子，一个住东屋，一个住西屋。晾衣绳从中间分成两段，孩子的东西挂在中间。{ex}修屋顶时，{subject}在下面扶梯子。{friend}说这样也好，至少孩子不用跑两条街。',
            significance: 0.7,
            fx: {
              relation: [
                ['ex', 'friend', 0.1, 0.02],
                ['friend', 'friend', 0.06, 0],
              ],
              role: 'shared_courtyard',
            },
          },
          {
            id: 'refused-to-be-neighbours',
            w: 0.45,
            text: '{subject}听说{ex}要搬进同一个院子，连夜去找房东，说宁可多付两克朗也要换到后排。{ex}搬来那天，{subject}把窗帘拉上，孩子趴在窗台看。两个家隔着一堵墙，谁也没有先敲门。',
            significance: 0.66,
            fx: {
              relation: ['ex', 'acquaintance', -0.05, 0],
              role: 'kept_the_wall',
              cash: -2,
            },
          },
        ],
      },
    ],
    baseRate: 0.035,
    cooldownYears: 5,
  },

  // 33 ─ old friend returns ────────────────────────────────────────────────
  {
    id: 'r13-rel.old-friend-returns',
    title: '十年后的那封信',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [25, 70],
    tags: ['relationship', 'friend', 'return', 'memory', 'obligation'],
    contexts: WIDE,
    milieus: [...HOME, ...CAFE, ...SHOP],
    roles: {
      friend: ['neighbor', { minAge: 25, maxAge: 72 }],
    },
    outcomes: [
      {
        id: 'welcomed-back',
        w: 0.4,
        text: '{friend}从美洲回来，站在门口时，{subject}几乎没认出来。两人去街角喝了半升酒，{friend}说船上的事，{subject}说这十年楼里死了谁、谁家添了孩子。分别时，{friend}把一只小盒子塞给{subject}，里面是一把异国的硬币。',
        significance: 0.68,
        fx: {
          cash: -2,
          relation: ['friend', 'friend', 0.18, 0.08],
          role: 'reunited',
        },
      },
      {
        id: 'kept-him-at-the-door',
        w: 0.3,
        text: '{subject}请{friend}在门口等了一会儿，说屋里乱。{friend}站着没动，把帽子在手里转了两圈。两人说了几句天气，{friend}就说还要去看别人。{subject}关上门，从窗子里看见{friend}在巷口回头了一次。',
        significance: 0.56,
        fx: {
          relation: ['friend', 'acquaintance', -0.02, 0],
          flag: 'kept_distance',
        },
      },
      {
        id: 'asked-for-a-loan',
        w: 0.3,
        when: { maxCash: 3 },
        text: '{friend}第三天才说明来意：船票钱是借的，现在债主追到维也纳。{subject}把给孩子攒的学费拿出来，{friend}写了一张欠条，字迹比十年前抖。{subject}把欠条收进铁盒，说别让孩子知道。',
        significance: 0.7,
        fx: {
          cash: -8,
          relation: ['friend', 'friend', 0.06, 0],
          role: 'creditor_friend',
          knowledge: ['the old friend owes money from the passage home', 0.85, 'friend'],
        },
      },
    ],
    variants: [
      {
        id: 'old-friend-returns-crisis',
        when: { contextTags: ['crisis'] },
        title: '失业的人回来敲门',
        outcomes: [
          {
            id: 'shared-the-soup',
            w: 0.55,
            text: '{friend}在外地丢了工，回来时只剩一只帆布包。{subject}没有问能住多久，只把汤多添了一碗。两人挤在一间屋里睡了半个月，{friend}每天出去找活，回来时把面包掰成两半。',
            significance: 0.72,
            fx: {
              cash: -3,
              relation: ['friend', 'friend', 0.2, 0.05],
              role: 'took_in_old_friend',
            },
          },
          {
            id: 'could-not-take-him-in',
            w: 0.45,
            text: '{subject}家的床已经睡了三个人，实在腾不出地方。{subject}把{friend}带到工会的临时床位，替{friend}付了第一周的钱。{friend}说够了，转身把帆布包放在床脚，没有再看{subject}。',
            significance: 0.66,
            fx: {
              cash: -2,
              relation: ['friend', 'friend', 0.06, 0],
              role: 'found_a_bed',
            },
          },
        ],
      },
    ],
    baseRate: 0.03,
    cooldownYears: 6,
  },

  // 34 ─ former lover returns ──────────────────────────────────────────────
  {
    id: 'r13-rel.former-lover-returns',
    title: '旧照片背面',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [25, 55],
    tags: ['relationship', 'ex_lover', 'temptation', 'marriage', 'conflict'],
    contexts: WIDE,
    milieus: [...HOME, ...CAFE],
    conditions: [{ kind: 'hasRelation', relationKind: 'partner' }],
    roles: {
      partner: ['partner', { minAge: 25, maxAge: 55, sameHousehold: true }],
      former: ['neighbor', { minAge: 25, maxAge: 55, sex: 'opposite' }],
    },
    outcomes: [
      {
        id: 'put-the-photograph-back',
        w: 0.4,
        text: '{former}在咖啡馆把一张旧照片推过来，背面写着十年前的日期。{subject}看了一会儿，把照片推回去，说已经不记得那天穿什么了。回家的路上，{subject}买了两块糖，一块给孩子，一块给{partner}。',
        significance: 0.66,
        fx: {
          relation: [
            ['former', 'acquaintance', -0.02, 0],
            ['partner', 'partner', 0.04, 0],
          ],
          role: 'faithful',
        },
      },
      {
        id: 'told-the-partner',
        w: 0.35,
        when: { skill: { name: 'social', min: 0.4 } },
        text: '{subject}回家后把遇见{former}的事原原本本说了。{partner}听完，问{subject}还想不想见，{subject}说不想。{partner}没有追问，只把照片从{subject}的口袋里拿出来，放进炉子。两人坐着看它烧完。',
        significance: 0.72,
        fx: {
          relation: ['partner', 'partner', 0.08, 0.02],
          role: 'honest_spouse',
          flag: 'told_about_former_lover',
        },
      },
      {
        id: 'left-with-the-former',
        w: 0.25,
        text: '{subject}在咖啡馆坐到打烊，最后跟{former}走了。行李是第二天趁{partner}上工时回来收的，衣柜里少了一半。{partner}回来时，桌上放着钥匙和一张没有写完的纸条。{subject}没有回头。',
        significance: 0.9,
        fx: [
          { cash: -10, reputation: -0.12, role: 'left_for_former' },
          {
            raw: [
              {
                type: 'relation_end',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                reason: 'left the marriage for a former lover',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$former',
                kind: 'partner',
                trust: 0.1,
                affection: 0.2,
                reason: 'left the marriage for a former lover',
              },
              {
                type: 'household',
                personId: '$former',
                householdId: '$household',
                reason: 'moved in with a former lover',
              },
            ],
          },
        ],
      },
    ],
    variants: [
      {
        id: 'former-lover-war',
        when: { contextTags: ['war'] },
        title: '以为再也见不到',
        outcomes: [
          {
            id: 'found-her-alive',
            w: 0.55,
            text: '{former}从战俘营回来，才知道{subject}已经改嫁。两人在教堂门口遇见，{former}叫了{subject}从前的小名，{subject}的手一抖，篮子里的土豆滚了一地。{former}蹲下去捡，{subject}没有动。',
            significance: 0.8,
            fx: {
              relation: [
                ['former', 'acquaintance', 0, 0.1],
                ['partner', 'partner', 0.02, 0],
              ],
              role: 'met_the_returned',
              flag: 'past_returned',
            },
          },
          {
            id: 'chose-the-present',
            w: 0.45,
            text: '{subject}陪{former}在车站坐了一下午，把这些年的事一件件说清。末班车来时，{former}问{subject}要不要走，{subject}摇了摇头。{former}上车后，{subject}在站台上站到灯灭，回家时{partner}还留着饭。',
            significance: 0.76,
            fx: {
              relation: [
                ['former', 'friend', 0.06, 0.04],
                ['partner', 'partner', 0.08, 0],
              ],
              role: 'chose_the_present',
            },
          },
        ],
      },
    ],
    baseRate: 0.02,
    cooldownYears: 8,
  },
  // 35 ─ a mentor dies ─────────────────────────────────────────────────────
  {
    id: 'r13-rel.mentor-dies',
    title: '灵前的工具袋',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [16, 55],
    tags: ['relationship', 'mentor', 'death', 'grief', 'craft'],
    contexts: ['vienna', 'industrial', 'peace', 'war', 'postwar', 'reform'],
    milieus: [...WORK, ...SHOP],
    roles: {
      mentor: ['worker', { minAge: 45, maxAge: 80 }],
    },
    outcomes: [
      {
        id: 'stroke-in-the-composing-room',
        w: 0.45,
        text: '{mentor}在排字房倒下时，手里还捏着一枚小号铅字。学徒们把人抬到门口，医生赶来只说是中风。葬礼后，{mentor}的儿子把工具袋交给{subject}，说{mentor}生前写过{subject}的名字。',
        significance: 0.9,
        fx: [
          { cash: -3, role: 'mourner', skill: { craft: 0.02 } },
          {
            raw: [
              {
                type: 'death',
                personId: '$mentor',
                cause: 'stroke in the composing room',
                reason: 'died at the workshop bench',
              },
              {
                type: 'knowledge',
                holderId: '$subject',
                proposition: 'the mentor’s tool bag was left to the subject',
                confidence: 0.95,
                sourceKind: 'told',
                visibility: 'private',
                trueInWorld: true,
              },
            ],
          },
        ],
      },
      {
        id: 'fall-from-the-paper-stack',
        w: 0.25,
        text: '{mentor}去够最上层的纸垛，脚下的凳子滑了。人抬回家躺了两天，第三天夜里没了气。{subject}替{mentor}把没排完的版收好，发现最后一页的页边写着{subject}的名字，后面画了一个圈。',
        significance: 0.88,
        fx: [
          {
            cash: -2,
            role: 'mourner',
            knowledge: ['the mentor left a marked page for the subject', 0.8],
          },
          {
            raw: [
              {
                type: 'death',
                personId: '$mentor',
                cause: 'fall from a paper stack in the pressroom',
                reason: 'died after a fall at the workshop',
              },
            ],
          },
        ],
      },
      {
        id: 'retired-with-his-tools',
        w: 0.3,
        when: { skill: { name: 'craft', min: 0.5 } },
        text: '{mentor}没有死在工位上，活到了退休，把工具一件件擦干净，分给几个学徒。给{subject}的是那把旧尺，尺背上刻着一行小字：量线要稳，心要更稳。{subject}把尺子收进内袋，送{mentor}到门口。',
        significance: 0.7,
        fx: {
          cash: 1,
          role: 'journeyman',
          skill: { craft: 0.03 },
          relation: ['mentor', 'colleague', 0.1, 0],
          knowledge: ['the old ruler is inscribed with the mentor’s rule', 0.9, 'mentor'],
        },
      },
    ],
    variants: [
      {
        id: 'mentor-dies-postwar',
        when: { contextTags: ['postwar'] },
        title: '战后第二年的葬礼',
        outcomes: [
          {
            id: 'died-of-an-old-wound',
            w: 0.55,
            text: '{mentor}的旧伤在战后第二年复发，医院说没有床位。{subject}每天去送饭，最后一天，{mentor}让{subject}把工具袋拿近一点，摸了摸那把旧尺。葬礼上，来了很多{mentor}带过的学徒。',
            significance: 0.9,
            fx: [
              { cash: -4, role: 'mourner', skill: { craft: 0.02 } },
              {
                raw: [
                  {
                    type: 'death',
                    personId: '$mentor',
                    cause: 'an old wound reopened in a crowded postwar hospital',
                    reason: 'died of an old wound after the war',
                  },
                ],
              },
            ],
          },
          {
            id: 'lived-to-teach-again',
            w: 0.45,
            text: '{mentor}撑过了那个冬天，开春后又在作坊里带了一个新学徒。{subject}去看{mentor}时，{mentor}正用那只发抖的手教孩子磨刀。{subject}没有进去，只在门口站了一会儿，把带来的烟放在窗台上。',
            significance: 0.72,
            fx: {
              relation: ['mentor', 'colleague', 0.12, 0],
              skill: { craft: 0.02 },
              role: 'mentor_visited',
            },
          },
        ],
      },
    ],
    baseRate: 0.02,
    cooldownYears: 15,
  },

  // 36 ─ a rival asks for help ─────────────────────────────────────────────
  {
    id: 'r13-rel.rival-asks-help',
    title: '对手的学徒工票',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [18, 58],
    tags: ['relationship', 'rivalry', 'work', 'help', 'interaction'],
    contexts: ['vienna', 'industrial', 'factory', 'peace', 'war', 'postwar', 'crisis'],
    milieus: WORK,
    conditions: [{ kind: 'employment', employed: true }],
    roles: {
      rival: ['worker', { minAge: 18, maxAge: 58 }],
      foreman: ['worker', { minAge: 30, maxAge: 68 }],
    },
    outcomes: [
      {
        id: 'covered-the-shift',
        w: 0.4,
        text: '{rival}的学徒在开机时伤了手，{foreman}说要么找到替班，要么整组扣钱。{rival}在更衣室门口拦住{subject}，话说到一半就停住。{subject}没有立刻回答，只把手里的工牌翻过来又翻过去。',
        significance: 0.72,
        fx: [
          {
            flag: 'rival_asked_for_help',
            skill: { craft: 0.01 },
            reputation: 0.01,
          },
          {
            raw: [
              {
                type: 'interaction',
                interaction: {
                  id: 'rival-request:$eventId',
                  initiatorId: '$rival',
                  counterpartyIds: ['$subject'],
                  kind: 'request',
                  subject: '替受伤的学徒顶一个夜班',
                  status: 'pending',
                  created: { year: 1, month: 1 },
                  proposal: {
                    acceptIf: { minTrust: -0.2, chance: 0.8 },
                    causeEventId: '$eventId',
                    acceptText:
                      '{counterparty}留下来顶了夜班。{subject}在机器旁站到天亮，第二天两人在洗手池边点了点头。',
                    rejectText:
                      '{counterparty}说自己的班已经排满。{subject}没有再求，转身把更衣室的门带上。',
                    acceptEffects: [
                      {
                        type: 'relation',
                        a: '$subject',
                        b: '$counterparty',
                        kind: 'colleague',
                        trust: 0.15,
                        reason: 'covered a shift for a rival',
                      },
                    ],
                    rejectEffects: [
                      {
                        type: 'relation',
                        a: '$subject',
                        b: '$counterparty',
                        kind: 'rival',
                        trust: -0.05,
                        reason: 'refused to cover a rival’s shift',
                      },
                    ],
                  },
                  responses: [],
                  visibility: 'participants',
                },
              },
            ],
          },
        ],
      },
      {
        id: 'said-find-someone-else',
        w: 0.3,
        text: '{subject}说自己的机器也缺人，让{rival}去找工头。{rival}站了一会儿，把帽子捏扁了，转身走了。第二天，{subject}的工位上多了一堆没人愿意做的返工活，{foreman}说是“临时安排”。',
        significance: 0.62,
        fx: {
          relation: ['rival', 'rival', -0.12, 0],
          role: 'refused_rival',
          condition: 'exhaustion',
        },
      },
      {
        id: 'traded-a-favour',
        w: 0.3,
        when: { skill: { name: 'craft', min: 0.5 } },
        text: '{subject}答应顶班，但要{rival}把下周的轻松活换过来。{rival}骂了一句，还是把手里的排班条递过去。两人在机器旁击了一下掌，油污蹭到彼此袖口上。那一夜，产量比平时多了两成。',
        significance: 0.68,
        fx: {
          cash: 2,
          relation: ['rival', 'colleague', 0.08, 0],
          role: 'trade_partner',
        },
      },
    ],
    variants: [
      {
        id: 'rival-asks-help-crisis',
        when: { contextTags: ['crisis'] },
        title: '失业名单上的两个人',
        outcomes: [
          {
            id: 'shared-the-last-shift',
            w: 0.55,
            text: '厂里要裁一半人，{rival}的名字排在{subject}前面。{rival}来找{subject}，问能不能一起去找工头，说两个人的手艺都够留一个。{subject}把两人的计件牌并排放到工头桌上，说要么都留，要么都走。',
            significance: 0.74,
            fx: {
              relation: ['rival', 'colleague', 0.15, 0],
              role: 'stood_together',
              reputation: 0.05,
              knowledge: ['the foreman can keep only half the shift', 0.8, 'foreman'],
            },
          },
          {
            id: 'took-the-offer-alone',
            w: 0.45,
            text: '工头私下说只留一个，{subject}没有告诉{rival}，第二天照常上工。{rival}在门口等到中午，看见{subject}的计件牌还挂着，就把自己的工具收进袋子。两人从此没有再说过话。',
            significance: 0.8,
            fx: {
              relation: ['rival', 'rival', -0.25, 0],
              role: 'kept_the_job',
              flag: 'took_the_shift_alone',
              cash: 2,
            },
          },
        ],
      },
    ],
    baseRate: 0.03,
    cooldownYears: 4,
  },

  // 37 ─ caring for a sick partner ────────────────────────────────────────
  {
    id: 'r13-rel.caring-for-sick-partner',
    title: '夜里的第三遍水',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [22, 65],
    tags: ['relationship', 'marriage', 'care', 'illness', 'obligation'],
    contexts: ['vienna', 'urban', 'peace', 'industrial', 'war', 'postwar', 'reform', 'medical'],
    milieus: [...HOME, ...HOSPITAL],
    conditions: [{ kind: 'hasRelation', relationKind: 'partner' }],
    roles: {
      partner: ['partner', { minAge: 22, maxAge: 70, sameHousehold: true }],
    },
    outcomes: [
      {
        id: 'nursed-at-home',
        w: 0.45,
        text: '{partner}烧了五天，{subject}白天上工，夜里换布、喂水、数脉搏。第三夜，{subject}坐在床边睡着了，醒来时天已经亮了，{partner}正用指尖碰{subjectPronoun}的手背。药钱花了六克朗，人总算退了烧。',
        significance: 0.74,
        fx: {
          cash: -6,
          health: -0.06,
          condition: 'exhaustion',
          role: 'carer',
          relation: ['partner', 'partner', 0.12, 0.04],
        },
      },
      {
        id: 'took-him-to-the-hospital',
        w: 0.3,
        when: { minCash: 5 },
        text: '{subject}雇了一辆手推车，把{partner}送到医院。挂号、押金、药费，窗口一个一个地过。{partner}住进六人病房，{subject}每天下班后去看半个钟头，把家里的新闻念给{partner}听。',
        significance: 0.66,
        fx: {
          cash: -14,
          role: 'hospital_visitor',
          relation: ['partner', 'partner', 0.05, 0],
        },
      },
      {
        id: 'the-illness-settled-in',
        w: 0.25,
        text: '医生说{partner}的肺已经坏了，只能养着。{subject}把窗子钉上一层布挡风，又把自己的活换成夜班，好白天在家照看。{partner}瘦得脱了形，仍坚持自己洗脸，不让{subject}替。',
        significance: 0.72,
        fx: [
          {
            cash: -10,
            role: 'long_term_carer',
            flag: 'chronic_illness',
            relation: ['partner', 'partner', 0.06, 0.02],
          },
          {
            raw: [
              {
                type: 'health',
                personId: '$partner',
                amount: -0.15,
                reason: 'chronic lung illness settled in',
              },
            ],
          },
        ],
      },
    ],
    variants: [
      {
        id: 'caring-for-sick-partner-war',
        when: { contextTags: ['war', 'medical'] },
        title: '伤兵病房里的夫妻',
        outcomes: [
          {
            id: 'learned-to-change-the-dressing',
            w: 0.55,
            text: '医院缺人手，{subject}跟着护士学会了换药。{partner}的伤口在腿上，每次换布都要咬住皮带。{subject}手很稳，换完把布卷好，坐在床边给{partner}读报纸上的停战消息。',
            significance: 0.74,
            fx: {
              cash: -5,
              skill: { craft: 0.02 },
              health: -0.04,
              role: 'carer',
              relation: ['partner', 'partner', 0.12, 0.05],
            },
          },
          {
            id: 'sent-to-the-country',
            w: 0.45,
            text: '医生说城里的空气不适合养伤，{subject}把{partner}送到乡下的亲戚家。{partner}走后，{subject}每周坐火车去看，带着家里的汤和干净的布。有一次火车误点，{subject}在站台上坐到半夜。',
            significance: 0.7,
            fx: {
              cash: -8,
              relation: ['partner', 'partner', 0.06, 0.04],
              role: 'long_distance_carer',
            },
          },
        ],
      },
    ],
    baseRate: 0.035,
    cooldownYears: 4,
  },

  // 38 ─ partner migration ────────────────────────────────────────────────
  {
    id: 'r13-rel.partner-migration',
    title: '站台上的车票',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [20, 55],
    tags: ['relationship', 'migration', 'marriage', 'separation', 'money'],
    contexts: [
      'vienna',
      'urban',
      'industrial',
      'war',
      'postwar',
      'crisis',
      'migration',
      'scarcity',
    ],
    milieus: [...HOME, 'transport', ...WORK],
    conditions: [{ kind: 'hasRelation', relationKind: 'partner' }],
    roles: {
      partner: ['partner', { minAge: 20, maxAge: 55 }],
    },
    outcomes: [
      {
        id: 'took-the-factory-train',
        w: 0.45,
        text: '{partner}在另一座城找到活，工钱比这里多三成。{subject}替{partner}把铺盖卷好，塞进一只旧箱。站台上风很大，{partner}说每月寄钱回来，{subject}说先顾自己吃饭。车开走后，{subject}在站台上把票根捡起来。',
        significance: 0.78,
        fx: [
          { cash: 6, role: 'waiting_spouse' },
          {
            raw: [
              {
                type: 'move',
                personId: '$partner',
                locationId: '@station',
                reason: 'left for factory work in another city',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                trust: -0.05,
                obligation: 0.15,
                reason: 'left for factory work in another city',
              },
            ],
          },
        ],
      },
      {
        id: 'went-together',
        w: 0.3,
        when: { maxCash: 5 },
        text: '两人把家具卖了，合买了两张票。{subject}抱着锅，{partner}扛着箱子，在车厢连接处坐了一夜。到站时天刚亮，{partner}先跳下去，伸手接{subject}手里的锅。两人在陌生的站台上笑了一下。',
        significance: 0.8,
        fx: [
          { cash: -12, role: 'migrant_couple' },
          {
            raw: [
              {
                type: 'move',
                personId: '$partner',
                locationId: '@station',
                reason: 'migrated together for work',
              },
              {
                type: 'move',
                personId: '$subject',
                locationId: '@station',
                reason: 'migrated together for work',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                trust: 0.1,
                obligation: 0.12,
                reason: 'migrated together for work',
              },
            ],
          },
        ],
      },
      {
        id: 'stayed-with-the-children',
        w: 0.25,
        text: '{partner}要走，{subject}没有跟。孩子还在上学，房东也不肯退押金。两人在门口算了一遍账，最后{partner}一个人提着箱子走了。{subject}把孩子的鞋摆好，第二天照常去上工。',
        significance: 0.62,
        fx: {
          cash: -2,
          relation: ['partner', 'partner', 0.05, 0],
          role: 'kept_family_together',
        },
      },
    ],
    variants: [
      {
        id: 'partner-migration-port',
        when: { contextTags: ['crisis'], milieuTags: ['transport'] },
        title: '船票只买了一张',
        outcomes: [
          {
            id: 'one-passage',
            w: 0.55,
            text: '船票只够一个人。{partner}把票推给{subject}，{subject}又推回去，说到了那边先找活。最后{partner}上了船，{subject}在码头上站到船变成一个小点。回程的电车上，{subject}把{partner}留下的围巾抱在怀里。',
            significance: 0.8,
            fx: [
              { cash: -8, role: 'waiting_spouse' },
              {
                raw: [
                  {
                    type: 'move',
                    personId: '$partner',
                    locationId: '@station',
                    reason: 'sailed alone on a single passage',
                  },
                  {
                    type: 'relation',
                    a: '$subject',
                    b: '$partner',
                    kind: 'partner',
                    trust: 0.05,
                    obligation: 0.18,
                    reason: 'sailed alone on a single passage',
                  },
                ],
              },
            ],
          },
          {
            id: 'sold-the-passage',
            w: 0.45,
            text: '两人在码头把票卖给了别人，用那笔钱在医院给{subject}的母亲交了押金。回家的路上，{partner}说以后还有船，{subject}没有说话，只把{partner}的手握紧。',
            significance: 0.7,
            fx: {
              cash: 4,
              relation: ['partner', 'partner', 0.1, 0.06],
              role: 'chose_the_family',
            },
          },
        ],
      },
    ],
    baseRate: 0.03,
    cooldownYears: 5,
  },

  // 39 ─ long-distance marriage ────────────────────────────────────────────
  {
    id: 'r13-rel.long-distance-marriage',
    title: '每月一封没有署名的信',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [20, 58],
    tags: ['relationship', 'marriage', 'distance', 'letters', 'money'],
    contexts: [
      'vienna',
      'urban',
      'industrial',
      'war',
      'postwar',
      'crisis',
      'migration',
      'scarcity',
    ],
    milieus: [...HOME, 'transport', ...WORK],
    conditions: [{ kind: 'hasRelation', relationKind: 'partner' }],
    roles: {
      partner: ['partner', { minAge: 20, maxAge: 60 }],
    },
    outcomes: [
      {
        id: 'money-order-arrived',
        w: 0.4,
        text: '邮差送来一张汇款单，附言栏里只有“买煤”两个字。{subject}把钱取出来，先交了房租，又给自己买了一双不漏水的鞋。晚上写信时，{subject}写了很多，最后只寄出一句：家里都好。',
        significance: 0.7,
        fx: {
          cash: 4,
          role: 'absent_spouse',
          relation: ['partner', 'partner', 0.05, 0],
          flag: 'living_on_money_orders',
        },
      },
      {
        id: 'took-the-train-to-visit',
        w: 0.3,
        when: { minCash: 4 },
        text: '{subject}攒了三个月的假，坐夜车去看{partner}。{partner}在站台上等，瘦了，也黑了。两人在租来的小屋里住了三天，走时{partner}把{subject}送到站台，隔着车窗比划了一个吃饭的手势。',
        significance: 0.64,
        fx: {
          cash: -4,
          relation: ['partner', 'partner', 0.1, 0.08],
        },
      },
      {
        id: 'letters-grew-shorter',
        w: 0.3,
        text: '信从每周一封变成每月一封，最后只剩汇款单上的附言。{subject}把{partner}的旧信按日期摞好，用绳子捆起来。有一次{subject}写到一半，发现自己已经想不起{partner}说话的声音。',
        significance: 0.72,
        fx: {
          relation: ['partner', 'partner', -0.12, 0],
          role: 'estranged_absent',
          flag: 'distance_marriage',
        },
      },
    ],
    variants: [
      {
        id: 'long-distance-marriage-war',
        when: { contextTags: ['war'] },
        title: '军邮里的两行字',
        outcomes: [
          {
            id: 'field-post-arrived',
            w: 0.55,
            text: '军邮隔了一个月才到，信封上盖着检查章的紫印。{partner}只写了两行：还活着，别等我。{subject}把信读了三遍，第二天去邮局寄了一个包裹，里面是烟草、袜子和一张全家照。',
            significance: 0.72,
            fx: {
              cash: -3,
              relation: ['partner', 'partner', 0.06, 0.04],
              role: 'field_post_wife',
              flag: 'field_post_censored',
            },
          },
          {
            id: 'no-letter-for-half-a-year',
            w: 0.45,
            text: '半年没有信。{subject}每天去邮局问，柜台后面的人后来一见{subject}就摇头。{subject}开始把想说的话写在纸上，写完锁进抽屉，抽屉里已经积了厚厚一叠。',
            significance: 0.76,
            fx: {
              relation: ['partner', 'partner', -0.08, 0],
              role: 'waiting_for_field_post',
              condition: 'sleepless',
            },
          },
        ],
      },
    ],
    baseRate: 0.03,
    cooldownYears: 3,
  },

  // 40 ─ wartime separation ───────────────────────────────────────────────
  {
    id: 'r13-rel.wartime-separation',
    title: '征召令贴在门上',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [20, 45],
    tags: ['relationship', 'war', 'separation', 'mobilization', 'marriage'],
    contexts: ['war', 'scarcity'],
    milieus: [...HOME, ...ARMY, ...GOVERNMENT],
    conditions: [{ kind: 'hasRelation', relationKind: 'partner' }],
    roles: {
      subject: ['subject', { sex: 'female', minAge: 20, maxAge: 45 }],
      partner: ['partner', { minAge: 20, maxAge: 50, sex: 'male', sameHousehold: true }],
    },
    outcomes: [
      {
        id: 'reported-to-the-barracks',
        w: 0.5,
        text: '征召令贴在门上，{partner}看了很久，才伸手把它揭下来。{subject}连夜替{partner}缝了护膝，把家里的地址写在布条上，缝进衣领。第二天清早，{partner}背着包出门，{subject}站在窗口，没有下楼。',
        significance: 0.82,
        fx: [
          { cash: -3, role: 'soldier_wife' },
          {
            raw: [
              {
                type: 'move',
                personId: '$partner',
                locationId: '@factory',
                reason: 'reported to the barracks after mobilization',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                trust: 0.05,
                obligation: 0.1,
                fear: 0.15,
                reason: 'separated by mobilization',
              },
            ],
          },
        ],
      },
      {
        id: 'reserved-occupation',
        w: 0.25,
        when: { skill: { name: 'craft', min: 0.5 } },
        text: '{partner}的作坊被列为军需单位，征兵处给了一张保留证明。{subject}把证明钉在门后，{partner}却不太说话。楼里其他男人一个个走了，{partner}每天照常上工，回来时身上带着别人的目光。',
        significance: 0.66,
        fx: {
          cash: 2,
          relation: ['partner', 'partner', 0.08, 0],
          role: 'reserved_worker',
          flag: 'reserved_occupation',
        },
      },
      {
        id: 'followed-to-the-depot',
        w: 0.25,
        when: { maxCash: 4 },
        text: '{subject}把能卖的东西卖了，追到{partner}出发前的车站。两人在候车室的长椅上坐到半夜，{partner}把军帽摘下来放在膝上。检票时，{subject}把一包烟塞进{partner}的口袋，说别省着。',
        significance: 0.72,
        fx: [
          { cash: -6, role: 'followed_to_depot' },
          {
            raw: [
              {
                type: 'move',
                personId: '$partner',
                locationId: '@factory',
                reason: 'left from the depot for the front',
              },
              {
                type: 'move',
                personId: '$subject',
                locationId: '@station',
                reason: 'followed the partner to the departure depot',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                trust: 0.08,
                obligation: 0.12,
                reason: 'parted at the departure depot',
              },
            ],
          },
        ],
      },
    ],
    variants: [
      {
        id: 'wartime-separation-barracks',
        when: { milieuTags: ['army'] },
        title: '营房外的最后一面',
        outcomes: [
          {
            id: 'through-the-barracks-fence',
            w: 0.55,
            text: '出发前夜，{subject}赶到营房外，隔着铁栏把一包烟和一双袜子塞给{partner}。哨兵催了两次，{partner}把军帽摘下来，隔着栏杆碰了碰{subject}的额头。回去的电车上，{subject}一直攥着那只空烟盒。',
            significance: 0.78,
            fx: [
              { cash: -1, role: 'saw_him_off' },
              {
                raw: [
                  {
                    type: 'relation',
                    a: '$subject',
                    b: '$partner',
                    kind: 'partner',
                    trust: 0.1,
                    obligation: 0.15,
                    fear: 0.1,
                    reason: 'said goodbye through the barracks fence',
                  },
                ],
              },
            ],
          },
          {
            id: 'half-an-hour-in-the-visiting-room',
            w: 0.45,
            text: '营房只许家属进去半个钟头。{subject}在长椅上坐着，{partner}把军装上的扣子一颗颗数给{subject}看，说少了一颗，是训练时扯掉的。铃响时，两个人谁也没站起来，哨兵又摇了一次铃。',
            significance: 0.7,
            fx: {
              relation: ['partner', 'partner', 0.08, 0.04],
              role: 'barracks_visit',
              mood: 0.05,
            },
          },
        ],
      },
    ],
    baseRate: 0.06,
    cooldownYears: 2,
  },

  // 41 ─ prisoner return ───────────────────────────────────────────────────
  {
    id: 'r13-rel.prisoner-return',
    title: '战俘营回来的那双靴子',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [22, 50],
    tags: ['relationship', 'war', 'return', 'prisoner', 'marriage'],
    contexts: ['war', 'postwar', 'crisis'],
    milieus: [...HOME, ...GOVERNMENT, ...HOSPITAL],
    conditions: [{ kind: 'hasRelation', relationKind: 'partner' }],
    roles: {
      partner: ['partner', { minAge: 22, maxAge: 55 }],
    },
    outcomes: [
      {
        id: 'walked-in-from-the-station',
        w: 0.5,
        text: '{partner}从战俘营回来时，靴子已经开了口，人瘦得{subject}一时没认出来。{subject}把炉子捅旺，煮了一锅面。{partner}吃到一半停下来，说在营里最想的就是这口汤。晚上，两人把床并回去，谁也没有先睡。',
        significance: 0.8,
        fx: [
          { cash: -4, role: 'returned_pow' },
          {
            raw: [
              {
                type: 'household',
                personId: '$partner',
                householdId: '$household',
                reason: 'returned home from a prisoner-of-war camp',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                trust: 0.1,
                obligation: 0.15,
                reason: 'returned home from a prisoner-of-war camp',
              },
              {
                type: 'health',
                personId: '$partner',
                amount: -0.1,
                reason: 'weakened by the prisoner-of-war camp',
              },
            ],
          },
        ],
      },
      {
        id: 'a-stranger-at-the-table',
        w: 0.3,
        text: '{partner}回来了，却很少说话。夜里听见门响就坐起来，白天坐在窗边看院子。{subject}把饭端到{partner}手边，{partner}会说谢谢，像对一个不认识的人。两人还是同住，只是中间隔着一整张桌子的距离。',
        significance: 0.78,
        fx: [
          { role: 'returned_pow' },
          {
            raw: [
              {
                type: 'household',
                personId: '$partner',
                householdId: '$household',
                reason: 'returned changed from the prisoner-of-war camp',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                trust: -0.02,
                fear: 0.1,
                reason: 'returned changed from the prisoner-of-war camp',
              },
              {
                type: 'flag',
                personId: '$subject',
                flag: 'stranger_at_home',
                add: true,
                reason: 'the returned partner is a stranger',
              },
            ],
          },
        ],
      },
      {
        id: 'declared-dead-abroad',
        w: 0.2,
        when: { maxCash: 2 },
        text: '战后第三年，红十字会转来一张名单，{partner}的名字后面画了黑框。{subject}去市政厅办了死亡登记，领回一小笔抚恤金。回家的路上，{subject}看见一个背影像{partner}的人，追了半条街。',
        significance: 0.74,
        fx: [
          {
            cash: 5,
            role: 'waiting_widow',
            mood: -0.2,
            relation_end: ['partner', 'partner'],
          },
        ],
      },
    ],
    variants: [
      {
        id: 'prisoner-return-postwar',
        when: { contextTags: ['postwar'] },
        title: '战后第三年才到家',
        outcomes: [
          {
            id: 'home-after-three-years',
            w: 0.55,
            text: '{partner}到家时，孩子已经会写自己的名字，却不认识{partner}。{partner}在门口蹲下来，从口袋里摸出一块压扁的糖。孩子看了{subject}一眼，才伸手去接。那天晚上，{partner}睡在孩子床边，一夜没关灯。',
            significance: 0.82,
            fx: [
              { cash: -3, role: 'returned_pow' },
              {
                raw: [
                  {
                    type: 'household',
                    personId: '$partner',
                    householdId: '$household',
                    reason: 'returned home after three years as a prisoner',
                  },
                  {
                    type: 'relation',
                    a: '$subject',
                    b: '$partner',
                    kind: 'partner',
                    trust: 0.08,
                    obligation: 0.15,
                    reason: 'returned home after three years as a prisoner',
                  },
                ],
              },
            ],
          },
          {
            id: 'could-not-stay',
            w: 0.45,
            text: '{partner}在家住了半个月，还是走了。{partner}说屋里的墙离得太近，夜里睡不着。{subject}没有拦，只把洗干净的衣服叠好放进{partner}的包。{partner}走后，{subject}在床头发现一枚战俘营编号牌。',
            significance: 0.78,
            fx: [
              { role: 'returned_pow' },
              {
                raw: [
                  {
                    type: 'relation',
                    a: '$subject',
                    b: '$partner',
                    kind: 'partner',
                    trust: -0.08,
                    fear: 0.06,
                    reason: 'could not settle back into the household',
                  },
                  {
                    type: 'move',
                    personId: '$partner',
                    locationId: '@station',
                    reason: 'left again after failing to settle at home',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    baseRate: 0.03,
    cooldownYears: 6,
  },

  // 42 ─ missing partner ──────────────────────────────────────────────────
  {
    id: 'r13-rel.missing-partner',
    title: '名单上的一道横线',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [20, 55],
    tags: ['relationship', 'war', 'missing', 'grief', 'institution'],
    contexts: ['war', 'postwar', 'crisis'],
    milieus: [...GOVERNMENT, ...HOME],
    conditions: [{ kind: 'hasRelation', relationKind: 'partner' }],
    roles: {
      partner: ['partner', { minAge: 20, maxAge: 55 }],
      official: ['official', { minAge: 28, maxAge: 70 }],
    },
    outcomes: [
      {
        id: 'listed-as-missing',
        w: 0.45,
        text: '{official}把名单摊开，在{partner}的名字后面画了一道横线，说“失踪，待查”。{subject}问待查到什么时候，{official}说等下一张名单。{subject}把那张纸的边角记住，回家后在日历上画了同样的横线。',
        significance: 0.76,
        fx: [
          {
            cash: -2,
            role: 'waiting_for_missing',
            knowledge: ['the partner is listed as missing, not dead', 0.9, 'official'],
          },
          {
            raw: [
              {
                type: 'relation',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                trust: 0.02,
                fear: 0.1,
                reason: 'the partner was listed as missing',
              },
            ],
          },
        ],
      },
      {
        id: 'declared-dead-in-absentia',
        w: 0.25,
        text: '{official}说失踪满两年可以办死亡登记，{subject}在表格上签了字。回家的路上，{subject}买了一块黑布，却在门口站了很久才进去。屋里还留着{partner}的鞋，{subject}没有收，也没有擦。',
        significance: 0.84,
        fx: [{ cash: 5, role: 'presumed_widow', mood: -0.2, relation_end: ['partner', 'partner'] }],
      },
      {
        id: 'went-to-the-registry-every-week',
        w: 0.3,
        when: { skill: { name: 'social', min: 0.4 } },
        text: '{subject}每周三去一次伤兵登记处，把{partner}的姓名、部队、最后来信的日期报一遍。办事的人换了三个，后来一见{subject}就先把册子翻到那一页。{subject}把每次的回答都记在同一个本子上。',
        significance: 0.68,
        fx: [
          {
            role: 'searcher',
            relation: ['official', 'colleague', 0.06, 0],
            move: ['@government', 'searched the casualty registry every week'],
          },
          {
            raw: [
              {
                type: 'knowledge',
                holderId: '$subject',
                proposition: 'the casualty registry has no confirmed record of the partner',
                confidence: 0.7,
                sourceKind: 'document',
                personId: '$official',
                visibility: 'private',
                trueInWorld: true,
              },
            ],
          },
        ],
      },
    ],
    variants: [
      {
        id: 'missing-partner-postwar',
        when: { contextTags: ['postwar'] },
        title: '战后名单重新贴出来',
        outcomes: [
          {
            id: 'name-still-not-there',
            w: 0.55,
            text: '战后新的名单贴在市政厅墙上，{subject}从头看到尾，没有找到{partner}。旁边有人哭着从人群里挤出来，{subject}让开一步，又回头看了一眼那片墙。回家后，{subject}把{partner}的照片从抽屉里拿出来，摆到桌上。',
            significance: 0.78,
            fx: [
              {
                role: 'waiting_for_missing',
                mood: -0.1,
                flag: 'checked_the_postwar_list',
              },
              {
                raw: [
                  {
                    type: 'knowledge',
                    holderId: '$subject',
                    proposition: 'the partner is absent from the postwar casualty list',
                    confidence: 0.85,
                    sourceKind: 'document',
                    visibility: 'private',
                    trueInWorld: true,
                  },
                ],
              },
            ],
          },
          {
            id: 'found-a-witness',
            w: 0.45,
            text: '一个从同一战俘营回来的人找到{subject}，说最后见{partner}是在转运站，之后就不知道了。{subject}请对方坐下，把每一句话都记下来，连说话时的停顿也记。那张纸后来被{subject}折成四折，放在贴身的口袋里。',
            significance: 0.72,
            fx: [
              {
                role: 'searcher',
                relation: ['partner', 'partner', 0.04, 0],
                knowledge: ['a returned prisoner last saw the partner at a transit camp', 0.75],
              },
            ],
          },
        ],
      },
    ],
    baseRate: 0.025,
    cooldownYears: 8,
  },

  // 43 ─ inheritance conflict between partners ────────────────────────────
  {
    id: 'r13-rel.inheritance-conflict',
    title: '房契上的第二个名字',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [25, 65],
    tags: ['relationship', 'marriage', 'inheritance', 'property', 'conflict'],
    contexts: ['vienna', 'urban', 'peace', 'industrial', 'postwar', 'reform', 'crisis'],
    milieus: [...HOME, ...GOVERNMENT, ...SHOP],
    conditions: [{ kind: 'hasRelation', relationKind: 'partner' }],
    roles: {
      partner: ['partner', { minAge: 25, maxAge: 65 }],
      official: ['official', { minAge: 28, maxAge: 72 }],
    },
    outcomes: [
      {
        id: 'added-to-the-deed',
        w: 0.35,
        text: '{partner}从姑母那里继承了一间铺面，房契上只有{partner}的名字。{subject}把修屋顶、换门板的账单一张张摊开，{partner}看完，沉默了很久。第二天，两人去了登记处，把{subject}的名字添在第二行。',
        significance: 0.76,
        fx: [
          { cash: -12, role: 'co_owner' },
          {
            raw: [
              {
                type: 'relation',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                trust: 0.04,
                obligation: 0.1,
                reason: 'added to the deed after paying for repairs',
              },
              {
                type: 'knowledge',
                holderId: '$subject',
                proposition: 'the shop deed now carries both names',
                confidence: 0.95,
                sourceKind: 'document',
                personId: '$official',
                visibility: 'shared',
                trueInWorld: true,
              },
            ],
          },
        ],
      },
      {
        id: 'kept-the-deed-in-one-name',
        w: 0.4,
        text: '{partner}说铺面是姑母留给{partner}的，不能写外人的名字。{subject}把账单收回口袋，没有争。此后每次屋顶漏雨，{subject}都先问{partner}要不要修，{partner}说等等，雨就一滴一滴落在柜台后面。',
        significance: 0.74,
        fx: [
          {
            cash: -3,
            role: 'claimant',
            flag: 'deed_dispute',
          },
          {
            raw: [
              {
                type: 'relation',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                trust: -0.2,
                reason: 'the partner refused to share the inherited deed',
              },
              {
                type: 'knowledge',
                holderId: '$subject',
                proposition: 'the inherited shop remains in the partner’s name alone',
                confidence: 0.9,
                sourceKind: 'document',
                visibility: 'private',
                trueInWorld: true,
              },
            ],
          },
        ],
      },
      {
        id: 'threatened-to-leave',
        w: 0.25,
        when: { maxCash: 3 },
        text: '{subject}把自己的东西收进箱子，说既然铺面没有{subjectPronoun}的份，这个家也没有。{partner}这才去请{official}，但话已经说出口。{subject}在门口停了一下，还是把箱子提下了楼。',
        significance: 0.86,
        fx: [
          {
            cash: -4,
            role: 'separated',
            relation_end: ['partner', 'partner'],
            household: ['household:shared-tenement', 'moved out over the deed dispute'],
          },
        ],
      },
    ],
    variants: [
      {
        id: 'inheritance-conflict-postwar',
        when: { contextTags: ['postwar'] },
        title: '战后分到的那间房',
        outcomes: [
          {
            id: 'signed-half-over',
            w: 0.55,
            text: '市政把战后空置的住房分给伤残军人，{partner}分到一间，房契上只写{partner}。{subject}带着孩子搬进去，刷墙、铺地、修窗。第二年，{partner}在{official}的桌上把一半产权签给了{subject}。',
            significance: 0.76,
            fx: [
              { cash: -6, role: 'co_owner' },
              {
                raw: [
                  {
                    type: 'relation',
                    a: '$subject',
                    b: '$partner',
                    kind: 'partner',
                    trust: 0.06,
                    obligation: 0.12,
                    reason: 'signed over half of the postwar flat',
                  },
                ],
              },
            ],
          },
          {
            id: 'the-flat-stayed-his',
            w: 0.45,
            text: '房契始终只有{partner}的名字。{subject}把每一笔修缮都记在账本上，{partner}说等以后再说。后来{partner}的弟弟从战场上回来，搬进那间房，{subject}才知道“以后”是什么意思。',
            significance: 0.78,
            fx: [
              {
                role: 'claimant',
                flag: 'deed_dispute',
                relation: ['partner', 'partner', -0.18, 0],
                cash: -2,
              },
            ],
          },
        ],
      },
    ],
    baseRate: 0.025,
    cooldownYears: 6,
  },

  // 44 ─ later-life companionship ─────────────────────────────────────────
  {
    id: 'r13-rel.later-life-companionship',
    title: '公园长椅上的两只手套',
    domain: 'relationship',
    stage: 'elderhood',
    ages: [60, 85],
    tags: ['relationship', 'elderhood', 'companionship', 'loneliness', 'partner'],
    contexts: ['vienna', 'urban', 'peace', 'postwar', 'reform', 'crisis'],
    milieus: [...HOME, ...CAFE],
    conditions: [{ kind: 'notHasRelation', relationKind: 'partner' }],
    roles: {
      companion: ['neighbor', { minAge: 60, maxAge: 85 }],
    },
    outcomes: [
      {
        id: 'moved-in-together',
        w: 0.4,
        text: '{subject}和{companion}在公园长椅上坐了三个冬天。第四年，{companion}说自己的屋子太冷，{subject}说那就搬过来。两人把各自的旧家具拼在一起，抽屉里各留一格，谁也不翻谁的东西。',
        significance: 0.74,
        fx: [
          { role: 'companion', mood: 0.12 },
          {
            raw: [
              {
                type: 'household',
                personId: '$companion',
                householdId: '$household',
                reason: 'moved in together in later life',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$companion',
                kind: 'partner',
                trust: 0.08,
                affection: 0.15,
                obligation: 0.1,
                reason: 'late-life companionship',
              },
            ],
          },
        ],
      },
      {
        id: 'kept-separate-rooms',
        w: 0.35,
        text: '{subject}和{companion}没有住到一起，但每天下午在公园见面。{companion}带面包，{subject}带一小瓶酒。天黑前各自回家，走到路口互相挥一下手。楼里的人问是不是要办事，{subject}说都这把年纪了，图个说话的人。',
        significance: 0.66,
        fx: {
          relation: ['companion', 'friend', 0.1, 0.12],
          role: 'sweetheart',
          mood: 0.08,
        },
      },
      {
        id: 'family-interfered',
        w: 0.25,
        when: { maxCash: 4 },
        text: '{subject}的儿女听说{companion}常来，先问房子写谁的名字，又问存款还剩多少。{subject}把{companion}送出门，回来对儿女说，房子是你们的，日子是我的。第二天，{companion}没有来公园。',
        significance: 0.6,
        fx: {
          relation: ['companion', 'acquaintance', -0.02, 0],
          role: 'watched_elder',
          mood: -0.08,
        },
      },
    ],
    variants: [
      {
        id: 'later-life-companionship-postwar',
        when: { contextTags: ['postwar'] },
        title: '战争留下的两个老人',
        outcomes: [
          {
            id: 'two-photographs-on-the-shelf',
            w: 0.55,
            text: '两人的旧伴都死在战争里。{subject}把一张照片摆在柜子上，{companion}也摆了一张，两张照片隔着半臂的距离。清明节，两人一起去墓地，各看各的碑，回来时却在同一家小馆吃了饭。',
            significance: 0.74,
            fx: [
              { role: 'companion', mood: 0.08 },
              {
                raw: [
                  {
                    type: 'relation',
                    a: '$subject',
                    b: '$companion',
                    kind: 'partner',
                    trust: 0.06,
                    affection: 0.14,
                    obligation: 0.08,
                    reason: 'shared widowhood and late-life companionship',
                  },
                ],
              },
            ],
          },
          {
            id: 'kept-the-memory-separate',
            w: 0.45,
            text: '{companion}说可以一起过，但家里那张照片不能收。{subject}说自己的也不能收。两人笑了一下，把两把椅子摆到窗边，各坐一把，看同一条街上的雪。谁也没有再提搬到一起的事。',
            significance: 0.64,
            fx: {
              relation: ['companion', 'friend', 0.08, 0.1],
              role: 'sweetheart',
              mood: 0.06,
            },
          },
        ],
      },
    ],
    baseRate: 0.04,
    cooldownYears: 5,
  },

  // 45 ─ matchmaker ────────────────────────────────────────────────────────
  {
    id: 'r13-rel.matchmaker',
    title: '媒人带来的照片',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [18, 40],
    tags: ['relationship', 'courtship', 'matchmaker', 'family', 'introduction'],
    contexts: ['vienna', 'urban', 'peace', 'postwar', 'reform', 'rural'],
    milieus: [...HOME, ...SHOP],
    roles: {
      matchmaker: ['neighbor', { minAge: 40, maxAge: 75, sex: 'female' }],
      candidate: ['neighbor', { minAge: 18, maxAge: 42, sex: 'opposite' }],
    },
    outcomes: [
      {
        id: 'meeting-arranged',
        w: 0.45,
        text: '{matchmaker}把一张照片压在茶杯底下，说对方在布店做事，手很巧。{subject}看了一眼，照片上的人没有笑。三天后，两人在{subject}家见面，{matchmaker}坐在门口，一边剥豆一边听。临走时，对方把椅子轻轻放回原处。',
        significance: 0.66,
        fx: {
          cash: -2,
          relation: [
            ['candidate', 'acquaintance', 0.05, 0.06],
            ['matchmaker', 'colleague', 0.08, 0],
          ],
          role: 'introduced_by_matchmaker',
        },
      },
      {
        id: 'matchmaker-exaggerated',
        w: 0.3,
        when: { maxCash: 3 },
        text: '{matchmaker}说对方家里有两间房，见面才知道是合住的一间。{subject}没有当场拆穿，只把茶喝完。{matchmaker}后来解释，说两间是指“白天一间、夜里一间”。{subject}把照片还回去，说这门亲事算了。',
        significance: 0.6,
        fx: {
          relation: [
            ['candidate', 'acquaintance', -0.04, 0],
            ['matchmaker', 'rival', -0.1, 0],
          ],
          knowledge: ['the matchmaker exaggerated the candidate’s housing', 0.8],
        },
      },
      {
        id: 'refused-the-match',
        w: 0.25,
        text: '{subject}把照片推回去，说现在不想谈。{matchmaker}把照片收进手袋，又劝了两句，见{subject}不松口，就起身走了。第二天，楼里传开{subject}眼光高，{subject}听见了，没有解释。',
        significance: 0.56,
        fx: {
          relation: ['matchmaker', 'acquaintance', -0.04, 0],
          role: 'refused_match',
          reputation: -0.02,
        },
      },
    ],
    variants: [
      {
        id: 'matchmaker-rural',
        when: { contextTags: ['rural', 'small_town'] },
        title: '集市尽头的媒人',
        outcomes: [
          {
            id: 'families-met-at-the-market',
            w: 0.55,
            text: '{matchmaker}把两家约在集市尽头，说先看看人，再谈彩礼。{subject}和{candidate}被推到一处卖陶器的摊子前，两人都不知道说什么。{candidate}拿起一只碗，问{subject}家里几口人，{subject}答了，声音比平时小。',
            significance: 0.62,
            fx: {
              relation: [
                ['candidate', 'acquaintance', 0.06, 0.04],
                ['matchmaker', 'colleague', 0.06, 0],
              ],
              role: 'market_match',
            },
          },
          {
            id: 'bride-price-too-high',
            w: 0.45,
            text: '彩礼谈到第三天，{matchmaker}把数目写在桌上，{subject}家拿不出。{candidate}在门外听见，进来把自己的银镯子放在桌上，说这个也算。{matchmaker}把镯子推回去，说规矩不能破。',
            significance: 0.7,
            fx: {
              cash: -2,
              relation: [
                ['candidate', 'friend', 0.08, 0.06],
                ['matchmaker', 'rival', -0.06, 0],
              ],
              role: 'could_not_pay_bride_price',
            },
          },
        ],
      },
    ],
    baseRate: 0.035,
    cooldownYears: 4,
  },

  // 46 ─ a friend lends money ──────────────────────────────────────────────
  {
    id: 'r13-rel.friend-loan',
    title: '借出去的那张钞票',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [18, 60],
    tags: ['relationship', 'friend', 'money', 'debt', 'trust'],
    contexts: ['vienna', 'urban', 'industrial', 'war', 'postwar', 'crisis'],
    milieus: [...HOME, ...WORK, ...SHOP],
    roles: {
      friend: ['neighbor', { minAge: 18, maxAge: 60 }],
    },
    outcomes: [
      {
        id: 'lent-what-was-asked',
        w: 0.4,
        text: '{friend}在门口站了很久才开口，说孩子病了，药钱还差六克朗。{subject}把准备交房租的钱数出来，留下两张，其余都递过去。{friend}写了一张欠条，{subject}没有看，直接夹进账本。',
        significance: 0.72,
        fx: [
          { cash: -6, role: 'creditor_friend' },
          {
            raw: [
              {
                type: 'relation',
                a: '$subject',
                b: '$friend',
                kind: 'friend',
                trust: 0.1,
                obligation: 0.15,
                reason: 'lent money for medicine',
              },
              {
                type: 'knowledge',
                holderId: '$subject',
                proposition: 'the friend signed an IOU for six crowns',
                confidence: 0.9,
                sourceKind: 'document',
                personId: '$friend',
                visibility: 'private',
                trueInWorld: true,
              },
            ],
          },
        ],
      },
      {
        id: 'said-the-purse-was-empty',
        w: 0.3,
        text: '{subject}把口袋翻给{friend}看，说房租还差三克朗。{friend}点点头，说再去别处问问。此后两人见面，{friend}总先说明自己已经借到了，{subject}也总说手头松一点了。那张欠条始终没有出现。',
        significance: 0.6,
        fx: {
          relation: ['friend', 'friend', -0.1, 0],
          role: 'kept_purse',
          mood: -0.03,
        },
      },
      {
        id: 'lent-too-much',
        w: 0.3,
        when: { minCash: 8 },
        text: '{friend}说只要六克朗，{subject}把刚领的工钱整叠递过去，说多出来的先拿着。{friend}愣住，随后把欠条上的数目改成十四。三个月后，{friend}还了三克朗，剩下的再没提起。两人见面时都绕开账本。',
        significance: 0.74,
        fx: [
          { cash: -14, role: 'creditor_friend', flag: 'bad_loan' },
          {
            raw: [
              {
                type: 'relation',
                a: '$subject',
                b: '$friend',
                kind: 'friend',
                trust: 0.15,
                obligation: 0.2,
                reason: 'lent more than was asked',
              },
            ],
          },
        ],
      },
    ],
    variants: [
      {
        id: 'friend-loan-crisis',
        when: { contextTags: ['crisis', 'scarcity'] },
        title: '月底的借条',
        outcomes: [
          {
            id: 'borrowed-against-the-wage',
            w: 0.55,
            text: '月底工钱还没发，{friend}来借三克朗买面粉。{subject}把准备当掉的怀表推过去，说先拿去押，发了工钱再赎。{friend}接了表，第二天送来半袋面粉，说表还压在当铺，赎期写在纸上。',
            significance: 0.72,
            fx: [
              { cash: -3, role: 'pawned_for_friend' },
              {
                raw: [
                  {
                    type: 'relation',
                    a: '$subject',
                    b: '$friend',
                    kind: 'friend',
                    trust: 0.12,
                    obligation: 0.15,
                    reason: 'pawned a watch so the friend could buy flour',
                  },
                ],
              },
            ],
          },
          {
            id: 'the-iou-went-unpaid',
            w: 0.45,
            text: '借出去的钱到了年底也没有还。{subject}在账本上把那一行圈起来，又划掉。{friend}照样来串门，照样喝{subject}家的茶。有一次{subject}提起，{friend}说下个月，下个月又下个月。',
            significance: 0.7,
            fx: [
              { cash: -5, role: 'unpaid_creditor', flag: 'bad_loan' },
              {
                raw: [
                  {
                    type: 'relation',
                    a: '$subject',
                    b: '$friend',
                    kind: 'friend',
                    trust: -0.12,
                    obligation: 0.05,
                    reason: 'an old loan was never repaid',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    baseRate: 0.04,
    cooldownYears: 3,
  },

  // 47 ─ gossip about a courtship ─────────────────────────────────────────
  {
    id: 'r13-rel.gossip-courtship',
    title: '窗下的口哨',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [18, 40],
    tags: ['relationship', 'courtship', 'gossip', 'reputation', 'secret'],
    contexts: ['vienna', 'urban', 'peace', 'industrial', 'war', 'postwar', 'reform', 'crisis'],
    milieus: [...HOME, ...WORK, ...SHOP],
    roles: {
      partner: ['partner', { minAge: 18, maxAge: 45, sex: 'opposite' }],
      gossip: ['neighbor', { minAge: 30, maxAge: 75 }],
    },
    outcomes: [
      {
        id: 'ignored-the-whistles',
        w: 0.35,
        text: '口哨从窗下响过三次，{subject}没有开窗。第二天，{gossip}在楼道里问{subject}夜里等谁，{subject}说等送奶的。{partner}知道后笑了一声，说以后从后门走。两人照旧见面，只是时间改在天亮前。',
        significance: 0.68,
        fx: {
          reputation: -0.04,
          relation: ['partner', 'partner', 0.08, 0.02],
          role: 'talked_about',
        },
      },
      {
        id: 'confronted-the-gossip',
        w: 0.35,
        text: '{subject}在院子里拦住{gossip}，问那晚的口哨是不是{subjectPronoun}教的。{gossip}说只是提醒{subject}的母亲，别让{subject}坏了名声。{subject}把洗好的床单抖开，晾在两家窗户中间，从此那块布一直挡着。',
        significance: 0.66,
        fx: {
          relation: ['gossip', 'rival', -0.15, 0],
          reputation: -0.06,
          role: 'defended_honor',
          mood: 0.04,
        },
      },
      {
        id: 'gave-him-up',
        w: 0.3,
        when: { maxCash: 2 },
        text: '{gossip}的话传到了{subject}做工的地方，工头叫{subject}注意影响。{subject}当晚把{partner}约到巷口，说别再来了。{partner}问是不是因为那些话，{subject}说是因为自己撑不住。两人站了一会儿，各自回家。',
        significance: 0.78,
        fx: {
          endRelation: ['partner', 'partner'],
          role: 'yielded_to_gossip',
          mood: -0.12,
        },
      },
    ],
    variants: [
      {
        id: 'gossip-courtship-war',
        when: { contextTags: ['war'] },
        title: '枕边空着的时候',
        outcomes: [
          {
            id: 'gossip-about-the-soldier',
            w: 0.55,
            text: '{partner}在前线，{gossip}说看见{subject}夜里和一个穿军装的人走在一起。{subject}把那人写信的日期和部队番号摊在桌上，{gossip}看了半天，说也许是看错了。话还是传开了，{subject}去邮局时，柜台后面的人多看了{subject}两眼。',
            significance: 0.7,
            fx: {
              reputation: -0.08,
              relation: ['partner', 'partner', 0.04, 0],
              role: 'talked_about',
              knowledge: ['the rumour names a soldier from another regiment', 0.7],
            },
          },
          {
            id: 'wrote-to-the-front',
            w: 0.45,
            text: '{subject}把谣言写进给{partner}的信里，没有添油加醋。{partner}回信说，等我回去，谁说的就让谁当面再说一遍。{subject}把这句话读了很多遍，最后折起来，放在枕下。',
            significance: 0.66,
            fx: {
              relation: ['partner', 'partner', 0.1, 0.04],
              role: 'guarded_the_name',
            },
          },
        ],
      },
    ],
    baseRate: 0.035,
    cooldownYears: 3,
  },

  // 48 ─ wedding witness ──────────────────────────────────────────────────
  {
    id: 'r13-rel.wedding-witness',
    title: '证婚人签下的名字',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [18, 60],
    tags: ['relationship', 'marriage', 'friendship', 'wedding', 'obligation', 'courtship'],
    contexts: ['vienna', 'urban', 'peace', 'war', 'postwar', 'reform', 'crisis'],
    milieus: [...GOVERNMENT, ...HOME],
    roles: {
      partner: ['partner', { minAge: 18, maxAge: 55, sex: 'opposite' }],
      friend: ['neighbor', { minAge: 18, maxAge: 65 }],
    },
    outcomes: [
      {
        id: 'friend-signed',
        w: 0.45,
        text: '{friend}在证婚人一栏签了名，字写得比平时大。仪式结束后，{friend}把两个人送到门口，塞给{subject}一个小包，里面是一把新钥匙和两克朗。{subject}要还，{friend}说等你们吵架那天再还。',
        significance: 0.8,
        fx: [
          { cash: -6, role: 'witnessed_wedding', relation: ['partner', 'partner', 0, 0] },
          {
            raw: [
              {
                type: 'household',
                personId: '$partner',
                householdId: '$household',
                reason: 'married with a friend as witness',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                trust: 0.08,
                obligation: 0.15,
                reason: 'married with a friend as witness',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$friend',
                kind: 'friend',
                trust: 0.18,
                obligation: 0.1,
                reason: 'witnessed the wedding',
              },
              {
                type: 'role',
                personId: '$partner',
                role: 'spouse',
                add: true,
                reason: 'married with a friend as witness',
              },
            ],
          },
        ],
      },
      {
        id: 'friend-refused',
        w: 0.25,
        when: { hasRole: 'union_member' },
        text: '{friend}说自己刚在工会签了名，不能再去给教堂或市政厅作保。{subject}问是不是怕受牵连，{friend}没有否认。婚礼照常举行，证婚人换成了一个远房表亲。{friend}那天没有来。',
        significance: 0.7,
        fx: {
          cash: -2,
          relation: ['friend', 'friend', -0.15, 0],
          role: 'witness_refused',
        },
      },
      {
        id: 'witness-paid',
        w: 0.3,
        when: { maxCash: 2 },
        text: '两人凑不齐登记费，{friend}把账结了。{subject}要写欠条，{friend}把纸推回去，说等孩子出生再还。婚礼后，三个人在街角吃了面，{friend}把自己碗里的肉都拨给了{subject}。',
        significance: 0.72,
        fx: [
          { cash: 5, role: 'debt_to_witness' },
          {
            raw: [
              {
                type: 'relation',
                a: '$subject',
                b: '$partner',
                kind: 'partner',
                trust: 0.06,
                obligation: 0.12,
                reason: 'married with a friend paying the fees',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$friend',
                kind: 'friend',
                trust: 0.2,
                obligation: 0.2,
                reason: 'the friend paid the wedding fees',
              },
              {
                type: 'household',
                personId: '$partner',
                householdId: '$household',
                reason: 'married with a friend paying the fees',
              },
            ],
          },
        ],
      },
    ],
    variants: [
      {
        id: 'wedding-witness-war',
        when: { contextTags: ['war'] },
        title: '婚礼在营房外举行',
        outcomes: [
          {
            id: 'witness-in-uniform',
            w: 0.55,
            text: '婚礼在营房外的空地上举行，{friend}穿着军装站在证婚人旁边。仪式只用了十分钟，{partner}的假只有半天。{friend}把两个人的名字写进一本小册子，说等打完仗再补酒。',
            significance: 0.8,
            fx: [
              { cash: -4, role: 'witnessed_wedding', relation: ['partner', 'partner', 0, 0] },
              {
                raw: [
                  {
                    type: 'household',
                    personId: '$partner',
                    householdId: '$household',
                    reason: 'married outside the barracks during the war',
                  },
                  {
                    type: 'relation',
                    a: '$subject',
                    b: '$partner',
                    kind: 'partner',
                    trust: 0.08,
                    obligation: 0.18,
                    reason: 'married outside the barracks during the war',
                  },
                  {
                    type: 'relation',
                    a: '$subject',
                    b: '$friend',
                    kind: 'friend',
                    trust: 0.15,
                    obligation: 0.1,
                    reason: 'witnessed a wartime wedding',
                  },
                ],
              },
            ],
          },
          {
            id: 'no-witness-allowed',
            w: 0.45,
            text: '营房不许外人进，{friend}只能在门口等着。{subject}和{partner}在值班室签了字，证婚人是连里的文书。出来后，{friend}把带来的酒递过去，三个人蹲在墙根喝了一口。',
            significance: 0.74,
            fx: [
              { cash: -2, role: 'married_at_the_barracks' },
              {
                raw: [
                  {
                    type: 'relation',
                    a: '$subject',
                    b: '$partner',
                    kind: 'partner',
                    trust: 0.06,
                    obligation: 0.15,
                    reason: 'married at the barracks without a friend as witness',
                  },
                  {
                    type: 'relation',
                    a: '$subject',
                    b: '$friend',
                    kind: 'friend',
                    trust: 0.08,
                    reason: 'waited outside the barracks during the wedding',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    baseRate: 0.03,
    cooldownYears: 4,
  },

  // 49 ─ married colleagues ───────────────────────────────────────────────
  {
    id: 'r13-rel.married-colleagues',
    title: '同一台印刷机的夫妻',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [20, 55],
    tags: ['relationship', 'marriage', 'work', 'household', 'wages'],
    contexts: ['vienna', 'industrial', 'factory', 'peace', 'war', 'postwar', 'crisis'],
    milieus: WORK,
    conditions: [{ kind: 'hasRelation', relationKind: 'partner' }],
    roles: {
      partner: ['partner', { minAge: 20, maxAge: 55, sameHousehold: true }],
      foreman: ['worker', { minAge: 30, maxAge: 68 }],
    },
    outcomes: [
      {
        id: 'same-shift',
        w: 0.4,
        text: '两人被排在同一班，一个上纸，一个看墨。机器响起来时，说话全靠手势。中午{partner}把自己的面包掰一半放在{subject}的工具箱上，{subject}没有抬头，只把墨辊调慢了一格。',
        significance: 0.7,
        fx: {
          cash: 3,
          role: 'married_shift',
          relation: [
            ['partner', 'partner', 0.06, 0.02],
            ['foreman', 'colleague', 0.05, 0],
          ],
        },
      },
      {
        id: 'split-shifts',
        w: 0.35,
        text: '厂里把两人排成对班，一个天没亮出门，一个半夜才回。家里的床一直是温的，人却总见不着。{subject}在桌上留饭，{partner}在灶边留字条。有一次两人在门口遇见，{partner}说今天几号，{subject}想了半天。',
        significance: 0.64,
        fx: {
          cash: 1,
          condition: 'exhaustion',
          relation: ['partner', 'partner', -0.05, 0],
          role: 'split_shift',
        },
      },
      {
        id: 'one-of-them-dismissed',
        w: 0.25,
        when: { maxCash: 3 },
        text: '厂里裁人，{partner}的名字被划掉。{subject}去找{foreman}，{foreman}说夫妻两个不能都占着岗位。{partner}把工牌交出去，回家后把围裙洗了，挂在门后，第二天开始替人缝补。',
        significance: 0.78,
        fx: [
          { cash: -4, role: 'sole_earner', relation: ['partner', 'partner', 0.02, 0] },
          {
            raw: [
              {
                type: 'unemployment',
                personId: '$partner',
                reason: 'dismissed because the factory would not employ both spouses',
              },
            ],
          },
        ],
      },
    ],
    variants: [
      {
        id: 'married-colleagues-war',
        when: { contextTags: ['war'] },
        title: '夫妻都在军需车间',
        outcomes: [
          {
            id: 'same-munitions-bench',
            w: 0.55,
            text: '军需车间缺人，夫妻两个都被招进去，一个装药，一个验壳。规定不许说话，两人只能在上工时对看一眼。{partner}的手被火药染黄，{subject}每晚替{partner}搓手，搓下来的水都是黄的。',
            significance: 0.72,
            fx: [
              { cash: 4, role: 'munition_couple', health: -0.03 },
              {
                raw: [
                  {
                    type: 'relation',
                    a: '$subject',
                    b: '$partner',
                    kind: 'partner',
                    trust: 0.06,
                    obligation: 0.12,
                    reason: 'worked the same munitions bench',
                  },
                ],
              },
            ],
          },
          {
            id: 'one-stayed-home',
            w: 0.45,
            text: '车间只收一个人，{partner}让{subject}去，自己留在家里带孩子、排队领配给。{subject}每天带回一身火药味，{partner}把衣服挂在窗外吹一夜。工钱多了，两个人说话的时间却少了。',
            significance: 0.66,
            fx: {
              cash: 2,
              relation: ['partner', 'partner', 0.02, 0],
              role: 'war_wage_earner',
            },
          },
        ],
      },
    ],
    baseRate: 0.03,
    cooldownYears: 4,
  },

  // 50 ─ lodger after separation ──────────────────────────────────────────
  {
    id: 'r13-rel.lodger-after-separation',
    title: '空出来的床位',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [22, 60],
    tags: ['relationship', 'separation', 'housing', 'lodger', 'money'],
    contexts: ['vienna', 'urban', 'peace', 'industrial', 'postwar', 'crisis', 'reform'],
    milieus: [...HOME],
    conditions: [{ kind: 'notHasRelation', relationKind: 'partner' }],
    roles: {
      lodger: ['neighbor', { minAge: 18, maxAge: 55 }],
      ex: ['neighbor', { minAge: 22, maxAge: 60, required: true }],
    },
    outcomes: [
      {
        id: 'took-a-lodger',
        w: 0.45,
        text: '{ex}搬走后，床位空了一个月。{subject}在门口贴了一张招租纸条，第三天，{lodger}提着一只箱子来看房。两人说好房租、煤钱和熄灯时间，{subject}把旧住客留下的那只枕头收进柜子。',
        significance: 0.72,
        fx: [
          { cash: 4, role: 'took_lodger' },
          {
            raw: [
              {
                type: 'household',
                personId: '$lodger',
                householdId: '$household',
                reason: 'rented the empty bed after a separation',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$lodger',
                kind: 'colleague',
                trust: 0.05,
                obligation: 0.06,
                reason: 'rented the empty bed after a separation',
              },
            ],
          },
        ],
      },
      {
        id: 'the-lodger-brought-trouble',
        w: 0.3,
        text: '{lodger}夜里带人回来，走廊里全是烟味。{subject}说过两次，{lodger}把房租往桌上一拍，说付了钱就有权利。月底，{subject}在门口又贴了一张纸条，这次写的是“只租给上夜班的”。',
        significance: 0.7,
        fx: [
          { cash: 2, role: 'watched_lodger', condition: 'sleepless' },
          {
            raw: [
              {
                type: 'household',
                personId: '$lodger',
                householdId: '$household',
                reason: 'kept the lodger despite nightly disturbances',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$lodger',
                kind: 'rival',
                trust: -0.12,
                reason: 'conflict over a lodger’s night visitors',
              },
            ],
          },
        ],
      },
      {
        id: 'ex-asked-to-come-back',
        w: 0.25,
        when: { maxCash: 2 },
        text: '{ex}听说床位租出去了，在门口等{subject}下班，说与其让外人住，不如自己回来。{subject}把钥匙在手里转了一圈，说床已经租了，人也已经走了。{ex}站了一会儿，问能不能至少进来喝口水，{subject}说今天不方便。',
        significance: 0.62,
        fx: {
          relation: ['ex', 'acquaintance', -0.02, 0],
          role: 'refused_return',
          mood: -0.03,
        },
      },
    ],
    variants: [
      {
        id: 'lodger-after-separation-postwar',
        when: { contextTags: ['postwar'] },
        title: '隔间里的陌生人',
        outcomes: [
          {
            id: 'sublet-to-a-refugee',
            w: 0.55,
            text: '战后找房的人排到街上，{subject}把半间房租给一对从东边来的夫妇。男人睡地板，女人睡床，{subject}和孩子挤在厨房后面。虽然挤，房租却能按时交上，{subject}第一次不用月底去借钱。',
            significance: 0.72,
            fx: [
              { cash: 5, role: 'took_lodger' },
              {
                raw: [
                  {
                    type: 'household',
                    personId: '$lodger',
                    householdId: '$household',
                    reason: 'sublet half a room to a refugee couple',
                  },
                  {
                    type: 'relation',
                    a: '$subject',
                    b: '$lodger',
                    kind: 'colleague',
                    trust: 0.08,
                    obligation: 0.08,
                    reason: 'sublet half a room to a refugee couple',
                  },
                ],
              },
            ],
          },
          {
            id: 'housing-office-requisitioned-it',
            w: 0.45,
            text: '住房办事处说空出的半间要统一分配，{subject}拦不住，只能看着陌生人搬进来。分配来的是个寡言的老兵，每月把房租交给办事处，{subject}一分也拿不到，还得替{lodger}烧热水。',
            significance: 0.7,
            fx: {
              role: 'requisitioned_room',
              cash: -3,
              relation: ['lodger', 'colleague', -0.05, 0],
            },
          },
        ],
      },
    ],
    baseRate: 0.03,
    cooldownYears: 4,
  },
]);
