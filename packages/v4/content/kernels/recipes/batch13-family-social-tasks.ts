import type { PlotKernel } from '../../../composition/types.js';
import { recipes, taskMeta } from './kit.js';

/**
 * Phase 13 · family, care and social active tasks.
 *
 * These are attempts a person chooses through Agency, not annual random events.
 * Each task changes typed state: relations, household membership, cash, health,
 * conditions, roles, flags and knowledge. Text never claims a change the
 * simulator does not record.
 */

/** Vienna contexts. `peace`/`rural` are excluded so these bind to the city. */
const URBAN = ['vienna', 'urban', 'war', 'postwar', 'reform', 'crisis', 'scarcity'];
/** Contexts whose place table includes @station. */
const URBAN_STATION = ['vienna', 'urban', 'war', 'postwar', 'crisis', 'scarcity'];

const HOME = ['home', 'family', 'neighbor', 'poverty', 'everyday'];
const OUT = ['cafe', 'market', 'shop', 'merchant', 'customer'];
const SOCIAL = [...HOME, ...OUT];
const SCHOOL = [...HOME, 'school', 'education', 'teacher'];
const GOV = [...HOME, 'official', 'bureaucracy', 'state', 'papers', 'public_service'];

export const BATCH13_FAMILY_SOCIAL_TASKS: PlotKernel[] = recipes([
  // 1. Seek a friend -------------------------------------------------------
  {
    id: 'r13-fam.seek-friend',
    title: '食堂尽头空着一把椅子',
    domain: 'social',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 68],
    tags: ['task', 'social', 'friendship', 'loneliness', 'belonging'],
    contexts: URBAN,
    milieus: SOCIAL,
    roles: {
      friend: ['neighbor', { minAge: 18, maxAge: 68 }],
    },
    outcomes: [
      {
        id: 'shared-table',
        w: 0.45,
        text: '{subject}把两只手插在外套口袋里，在食堂尽头坐下，问对面的人能不能拼桌。{friend}把盐罐推过来，又把自己的面包掰了一半。两人从天气说到班次，直到洗碗的女人开始收凳子，{subject}才发现自己一晚上没有看钟。',
        significance: 0.72,
        fx: {
          cash: -1,
          relation: ['friend', 'friend', 0.12, 0.08],
          role: 'new_friend',
          flag: 'made_a_friend_at_the_canteen',
          knowledge: ['the canteen is quiet after the second bell', 0.7, 'friend'],
        },
      },
      {
        id: 'rebuffed',
        w: 0.3,
        text: '{subject}刚开口，{friend}就把报纸举高，说这张桌子有人。{subject}端着杯子在门口站了一会儿，回去把椅子放正；第二天同一时辰，{friend}没有来，桌上留着一圈没擦干的杯印。',
        significance: 0.56,
        fx: {
          mood: -0.1,
          relation: ['friend', 'acquaintance', -0.04, 0],
          flag: 'rebuffed_while_seeking_friend',
        },
      },
      {
        id: 'late-confidant',
        w: 0.25,
        text: '{subject}先说自己搬来这条街多久，再说房租、夜里的咳嗽和睡不着的毛病。{friend}听着，把自己年轻时的名字写在纸角，说以后在楼梯口碰见就叫这个名字。{subject}把纸角折好，忽然想起已经很久没人叫过自己娘家的姓。',
        significance: 0.7,
        when: { minAge: 40 },
        fx: {
          relation: ['friend', 'friend', 0.16, 0.06],
          mood: 0.08,
          flag: 'found_confidant_late_in_life',
          knowledge: ['the neighbor keeps a childhood name she no longer uses', 0.8, 'friend'],
        },
      },
    ],
    variants: [
      {
        id: 'seek-friend-war',
        when: { contextTags: ['war'] },
        title: '防空洞口的半支烟',
        outcomes: [
          {
            id: 'raid-friend',
            w: 0.6,
            text: '{friend}在防空洞口分给{subject}半支烟，两人背靠潮湿的砖墙，听远处炮声。{subject}说自己怕的不是炮，是回家后没人说话；{friend}把烟头按灭，说那就每天这个时辰在这儿等。',
            significance: 0.74,
            fx: {
              relation: ['friend', 'friend', 0.18, 0.1],
              condition: 'air_raid_anxiety',
              flag: 'air_raid_friend',
              knowledge: ['the cellar entrance is quiet after the all-clear', 0.8, 'friend'],
            },
          },
          {
            id: 'friend-evacuated',
            w: 0.4,
            text: '{subject}在防空洞口等到第三次警报，{friend}没有来。第二天听说那一片的人已经随疏散车走了，{subject}把带来的半块面包留在砖台上，回去时兜里还揣着给{friend}留的火柴。',
            significance: 0.66,
            fx: {
              mood: -0.16,
              relation: ['friend', 'acquaintance', 0.02, 0],
              flag: 'friend_evacuated_before_farewell',
              knowledge: ['the friend left with an evacuation train', 0.7],
            },
          },
        ],
      },
    ],
    task: taskMeta('social', ['belonging'], ['belonging'], 0.82, 0.1, ['social']),
  },

  // 2. Join a club --------------------------------------------------------
  {
    id: 'r13-fam.join-club',
    title: '合唱团第二排的空位',
    domain: 'social',
    kind: 'task',
    stage: 'adulthood',
    ages: [17, 62],
    tags: ['task', 'social', 'club', 'choir', 'organization', 'belonging'],
    contexts: URBAN,
    milieus: SOCIAL,
    conditions: [{ kind: 'notHasRole', role: 'club_member' }],
    roles: {
      member: ['neighbor', { minAge: 18, maxAge: 65 }],
      club: ['organization', { organizationKind: 'union' }],
    },
    outcomes: [
      {
        id: 'signed-the-roll',
        w: 0.45,
        text: '{member}把歌本塞进{subject}手里，说第二排缺一个唱中音的。{club}的屋子煤味很重，钢琴缺了两个键，{subject}还是跟着唱完了整首。散场时，{member}让{subject}在下星期的点名册上写名字，说来了就得来满一个冬天。',
        significance: 0.72,
        fx: [
          {
            membership: ['club', true, 'joined the workers’ choral society'],
            relation: ['member', 'friend', 0.14, 0.06],
            cash: -1,
            role: 'club_member',
            flag: 'joined_choir',
            skill: { social: 0.02 },
          },
        ],
      },
      {
        id: 'voice-rejected',
        w: 0.3,
        text: '{subject}唱到第二段就被{member}打断，说声音太直，会把整排带跑。{club}的人没有笑，只是把歌本收回去。{subject}在门口等到散场，问能不能先搬椅子、烧炉子；{member}说缺的是嗓子，不是手。',
        significance: 0.58,
        fx: {
          mood: -0.12,
          relation: ['member', 'acquaintance', -0.05, 0],
          knowledge: ['the choir chooses by voice, not by willingness', 0.8, 'member'],
        },
      },
      {
        id: 'probation',
        w: 0.25,
        text: '{member}让{subject}先试一个月，条件是每次排练提前来生炉子。{subject}把煤筐从地窖拖上来，手指缝里全是黑灰；唱到第三周，{member}把一本旧歌本放在炉边，说这本不用还。',
        significance: 0.66,
        when: { skill: { name: 'social', min: 0.25 } },
        fx: [
          {
            membership: ['club', true, 'admitted to the choir on probation'],
            relation: ['member', 'friend', 0.1, 0.03],
            cash: -1,
            condition: 'choir_probation',
            flag: 'stoked_the_choir_stove',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'club-crisis',
        when: { contextTags: ['crisis'] },
        title: '点名册上的陌生笔迹',
        outcomes: [
          {
            id: 'joined-under-watch',
            w: 0.55,
            text: '排练到一半，两个便衣推门进来，站在最后一排听。{member}没有停，只把一首哀歌换成进行曲。散场后，{member}让{subject}把点名册带回家藏一夜，说{club}里最近多了几个不唱歌只记名字的人。',
            significance: 0.78,
            fx: [
              {
                membership: ['club', true, 'joined the choir while it was watched'],
                relation: ['member', 'friend', 0.16, 0.05],
                role: 'club_member',
                flag: 'carried_choir_roll_home',
                knowledge: ['plainclothes men attend the choir rehearsals', 0.85, 'member'],
              },
            ],
          },
          {
            id: 'turned-away-for-safety',
            w: 0.45,
            text: '{member}在门口拦住{subject}，说这阵子别来了，名单上多一个名字就多一份麻烦。{subject}把歌本还回去，走到街角又回头，看见{club}的窗户用报纸糊了一半，里面还有人低声唱。',
            significance: 0.64,
            fx: {
              mood: -0.1,
              relation: ['member', 'acquaintance', 0.06, 0],
              flag: 'kept_off_choir_roll_for_safety',
              knowledge: ['the choir is being watched', 0.75, 'member'],
            },
          },
        ],
      },
    ],
    task: taskMeta('social', ['belonging'], ['belonging'], 0.78, 0.15, ['social']),
  },

  // 3. Invite someone to a café -------------------------------------------
  {
    id: 'r13-fam.invite-cafe',
    title: '靠窗那张小桌',
    domain: 'social',
    kind: 'task',
    stage: 'adulthood',
    ages: [17, 60],
    tags: ['task', 'social', 'cafe', 'friendship', 'invitation'],
    contexts: URBAN,
    milieus: SOCIAL,
    conditions: [{ kind: 'cash', min: 1 }],
    roles: {
      friend: ['neighbor', { minAge: 17, maxAge: 62 }],
    },
    outcomes: [
      {
        id: 'coffee-accepted',
        w: 0.45,
        text: '{subject}在柜台前把两枚硬币捏出汗，才开口请{friend}喝一杯。{friend}挑了靠窗的小桌，把糖块推给{subject}，说这里比家里暖和。两人坐到灯亮，杯底的渣子凉透了，{subject}还是没有把那句“以后常来”说出口。',
        significance: 0.64,
        fx: {
          cash: -2,
          mood: 0.1,
          relation: ['friend', 'friend', 0.12, 0.04],
          flag: 'bought_a_friend_coffee',
        },
      },
      {
        id: 'coffee-refused',
        w: 0.3,
        text: '{friend}说今天要赶回家给孩子做饭，改天吧。{subject}一个人把两杯都喝了，第二杯剩在桌上，侍者收走时问要不要打包。{subject}摇头，把找零数了两遍，正好够明天的面包。',
        significance: 0.54,
        fx: {
          cash: -1,
          mood: -0.08,
          relation: ['friend', 'acquaintance', -0.02, 0],
          flag: 'invitation_postponed',
        },
      },
      {
        id: 'confession',
        w: 0.25,
        text: '咖啡上来之前，{subject}忽然说这半年一直在攒钱，想搬出集体宿舍。{friend}没有笑，问押金差多少，又把自己房东的地址写在糖纸上。{subject}把糖纸收进内袋，觉得那杯咖啡比平时苦。',
        significance: 0.7,
        when: { maxCash: 2 },
        fx: {
          cash: -2,
          relation: ['friend', 'friend', 0.16, 0.08],
          role: 'future_tenant',
          flag: 'friend_gave_landlord_address',
          knowledge: ['a cheaper room may be free in the friend’s building', 0.8, 'friend'],
        },
      },
    ],
    variants: [
      {
        id: 'cafe-war',
        when: { contextTags: ['war'] },
        title: '厨房里的代用咖啡',
        outcomes: [
          {
            id: 'ersatz-coffee',
            w: 0.6,
            text: '咖啡馆已经改成配给站，{subject}把{friend}请回自家厨房，用炒过的大麦煮了一壶。两人围着炉子，把糖票摊在桌上算来算去；{friend}说这味道像战前的真咖啡，{subject}没有拆穿，只又添了一勺。',
            significance: 0.66,
            fx: {
              cash: -1,
              mood: 0.08,
              relation: ['friend', 'friend', 0.14, 0.04],
              condition: 'rationing_shortage',
              flag: 'shared_ersatz_coffee',
            },
          },
          {
            id: 'ration-refused',
            w: 0.4,
            text: '{friend}站在门口没有进来，说自家的糖票也已经见底。{subject}把壶从炉上端下来，倒进两个杯子，硬塞给{friend}一杯。{friend}喝完，把杯子在围裙上擦干，说明天轮到自己家去排队。',
            significance: 0.6,
            fx: {
              food: -1,
              relation: ['friend', 'friend', 0.1, 0.02],
              flag: 'shared_last_sugar',
            },
          },
        ],
      },
    ],
    task: taskMeta('social', ['belonging'], ['belonging'], 0.68, 0.1, ['social']),
  },

  // 4. Ask a neighbour for help -------------------------------------------
  {
    id: 'r13-fam.ask-neighbour-help',
    title: '敲隔壁那扇薄门',
    domain: 'social',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 75],
    tags: ['task', 'social', 'neighbor', 'help', 'poverty'],
    contexts: URBAN,
    milieus: HOME,
    roles: {
      neighbor: ['neighbor', { minAge: 20, maxAge: 78 }],
    },
    outcomes: [
      {
        id: 'borrowed-coal',
        w: 0.45,
        text: '{subject}把空煤筐拎到隔壁门口，说只借一筐，等手头松了就还。{neighbor}看了看筐底的锈，进屋铲了半筐，又从灶边拿了两块引火的柴。{subject}道谢时，{neighbor}说这条走廊里借东西要记着，不是记在纸上。',
        significance: 0.66,
        fx: {
          food: 1,
          relation: ['neighbor', 'friend', 0.12, 0.02],
          condition: 'owes_neighbor_favour',
          flag: 'borrowed_coal_from_neighbour',
        },
      },
      {
        id: 'door-closed',
        w: 0.3,
        text: '{neighbor}把门开了一条缝，说自家也不够烧。{subject}提着空筐站了一会儿，听见门后有孩子在哭，便没有再敲。回屋后，{subjectPronoun}把椅子拆了一条腿，塞进炉子。',
        significance: 0.56,
        fx: {
          mood: -0.1,
          relation: ['neighbor', 'acquaintance', -0.03, 0],
          flag: 'refused_neighbour_help',
        },
      },
      {
        id: 'work-in-exchange',
        w: 0.25,
        text: '{neighbor}说煤可以借，但要{subject}明天清早帮着把地窖里的土豆搬上来。{subject}答应了，蹲在门槛上把数目写在自己的手心里。{neighbor}看见那几个歪字，笑了一下，多给了半筐碎煤。',
        significance: 0.62,
        when: { employment: false },
        fx: {
          food: 1,
          skill: { numeracy: 0.02 },
          relation: ['neighbor', 'friend', 0.1, 0],
          role: 'neighbourhood_helper',
          flag: 'worked_for_borrowed_coal',
        },
      },
    ],
    task: taskMeta('social', ['survival', 'belonging'], ['food', 'belonging'], 0.76, 0.12, [
      'social',
    ]),
  },

  // 5. Help a neighbour ---------------------------------------------------
  {
    id: 'r13-fam.help-neighbour',
    title: '把煤筐抬上三楼',
    domain: 'social',
    kind: 'task',
    stage: 'adulthood',
    ages: [17, 70],
    tags: ['task', 'social', 'neighbor', 'help', 'care'],
    contexts: URBAN,
    milieus: HOME,
    roles: {
      neighbor: ['neighbor', { minAge: 45, maxAge: 80 }],
    },
    outcomes: [
      {
        id: 'carried-the-coal',
        w: 0.45,
        text: '{subject}看见{neighbor}在楼梯口歇了三回，便把煤筐接过来，一筐一筐抬上三楼。最后一趟，{subject}的腰在门框上撞了一下，{neighbor}从柜里摸出一小瓶李子酒，硬倒了一盅。',
        significance: 0.68,
        fx: {
          health: -0.03,
          food: 1,
          relation: ['neighbor', 'friend', 0.16, 0.04],
          role: 'neighbourhood_helper',
          flag: 'carried_neighbour_coal',
        },
      },
      {
        id: 'fixed-the-stove',
        w: 0.3,
        text: '{neighbor}家的炉子倒烟，{subject}蹲在地上把烟道拆开，掏出一团堵了多年的煤灰。手背被铁皮划了一道，{neighbor}用旧布条缠上，说这炉子是老伴生前盘的。火重新旺起来时，屋里的人都往后退了半步。',
        significance: 0.72,
        when: { skill: { name: 'craft', min: 0.2 } },
        fx: {
          health: -0.02,
          skill: { craft: 0.03 },
          relation: ['neighbor', 'friend', 0.2, 0.08],
          condition: 'cut_hand',
          flag: 'repaired_neighbour_stove',
        },
      },
      {
        id: 'help-refused',
        w: 0.25,
        text: '{neighbor}把煤筐往身后挪，说不用，自己搬得动。{subject}站在楼梯转角，听见对方上一层歇一层，筐底在墙上刮出长长的白印。晚饭时，{subject}把自家的汤盛了一碗，放在{neighbor}门口，没有敲门。',
        significance: 0.56,
        fx: {
          mood: -0.04,
          relation: ['neighbor', 'acquaintance', 0.06, 0],
          flag: 'left_soup_at_neighbour_door',
        },
      },
    ],
    task: taskMeta('social', ['belonging', 'care'], ['care', 'belonging'], 0.72, 0.08, [
      'craft',
      'social',
    ]),
  },

  // 6. Repair a friendship ------------------------------------------------
  {
    id: 'r13-fam.repair-friendship',
    title: '粘回去的搪瓷杯',
    domain: 'social',
    kind: 'task',
    stage: 'adulthood',
    ages: [16, 70],
    tags: ['task', 'social', 'friendship', 'repair', 'trust'],
    contexts: URBAN,
    milieus: SOCIAL,
    roles: {
      friend: ['neighbor', { minAge: 16, maxAge: 70 }],
    },
    outcomes: [
      {
        id: 'cup-mended',
        w: 0.45,
        text: '{subject}把那只摔掉瓷的杯子放在{friend}面前，杯口用锡焊过，焊痕发黑。{friend}没有接，只问还记不记得为什么吵。{subject}把那天的话原样说了一遍，说到一半停住，承认有一句是自己编的。{friend}这才把杯子转过来，看杯底的名字。',
        significance: 0.7,
        fx: {
          cash: -1,
          relation: ['friend', 'friend', 0.18, 0.08],
          role: 'reconciled_friend',
          flag: 'repaired_friendship',
          knowledge: ['the quarrel began with a lie about money', 0.8],
        },
      },
      {
        id: 'cup-refused',
        w: 0.3,
        text: '{friend}把杯子推回来，说摔坏的东西粘得再好也有缝。{subject}在门口站了一会儿，把杯子放进外套口袋，杯沿磕在扣子上，响了一声。回家的路上，{subject}绕开了两人常走的那条街。',
        significance: 0.6,
        fx: {
          mood: -0.12,
          relation: ['friend', 'acquaintance', -0.08, 0],
          flag: 'friendship_unrepaired',
        },
      },
      {
        id: 'argument-reopened',
        w: 0.25,
        text: '话说到一半，{friend}又把三年前的旧账翻出来，声音越来越高。{subject}把杯子放下，没有还嘴，只把桌上的水渍擦干。{friend}忽然停下来，问{subject}是不是觉得自己有理；{subject}说不是，只是不想再摔第二个杯子。',
        significance: 0.66,
        when: { relationKind: 'friend' },
        fx: {
          mood: -0.04,
          relation: ['friend', 'friend', 0.06, 0.02],
          condition: 'friendship_strained',
          flag: 'friendship_truce',
        },
      },
    ],
    task: taskMeta('social', ['belonging'], ['belonging'], 0.7, 0.15, ['social']),
  },

  // 7. Apologize ----------------------------------------------------------
  {
    id: 'r13-fam.apologize',
    title: '酒醒以后的那句话',
    domain: 'social',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 72],
    tags: ['task', 'social', 'apology', 'reputation', 'conflict'],
    contexts: URBAN,
    milieus: SOCIAL,
    roles: {
      offended: ['neighbor', { minAge: 18, maxAge: 72 }],
    },
    outcomes: [
      {
        id: 'forgiven',
        w: 0.4,
        text: '{subject}在院子的水龙头边等到{offended}，把那天酒桌上的话重复了一遍，没有找补。{offended}拧上水龙头，说那句话已经传到第三个院子了。{subject}问要怎样才能收回，{offended}说收不回，但可以当着传话的人再说一遍是胡说的。',
        significance: 0.7,
        fx: {
          reputation: 0.04,
          relation: ['offended', 'friend', 0.14, 0.04],
          role: 'apologized_publicly',
          flag: 'apology_accepted',
          knowledge: ['the insult has already reached three courtyards', 0.8, 'offended'],
        },
      },
      {
        id: 'apology-rejected',
        w: 0.35,
        text: '{subject}把带来的半块肥皂放在窗台上，说知道不够。{offended}没有碰肥皂，只说那天在场的人都记得{subject}笑的样子。{subject}站到腿发麻，最后把肥皂收回口袋，转身时听见窗子从里面关上了。',
        significance: 0.6,
        fx: {
          mood: -0.12,
          relation: ['offended', 'rival', -0.16, 0],
          flag: 'apology_rejected',
        },
      },
      {
        id: 'stiff-apology',
        w: 0.25,
        text: '{subject}把帽子捏在手里，站得笔直，说那天是自己失礼。{offended}看了{subjectPronoun}很久，说这句话说得像在念公文。两人都没有笑；最后{offended}让{subject}进屋喝口水，杯子放在桌子中间，谁也没有碰。',
        significance: 0.58,
        when: { minAge: 45 },
        fx: {
          relation: ['offended', 'acquaintance', 0.06, 0],
          condition: 'stiff_apology',
          flag: 'formal_apology_made',
        },
      },
    ],
    task: taskMeta('social', ['belonging', 'status'], ['belonging', 'status'], 0.66, 0.15, [
      'social',
    ]),
  },

  // 8. Confront a rumour --------------------------------------------------
  {
    id: 'r13-fam.confront-rumour',
    title: '洗衣房里那句话',
    domain: 'social',
    kind: 'task',
    stage: 'adulthood',
    ages: [17, 70],
    tags: ['task', 'social', 'rumor', 'reputation', 'conflict'],
    contexts: URBAN,
    milieus: SOCIAL,
    roles: {
      gossip: ['neighbor', { minAge: 20, maxAge: 72 }],
      witness: ['neighbor', { minAge: 18, maxAge: 70 }],
    },
    outcomes: [
      {
        id: 'rumor-stopped',
        w: 0.4,
        text: '{subject}把湿床单拧干，隔着蒸汽问{gossip}那句话是从哪儿听来的。{gossip}说全楼都在传，不止一个。{subject}让对方把原话再说一遍，然后当着{witness}的面把日期、工钱和那晚的去处一条条对给对方听。{gossip}的手在围裙上擦了半天，说也许是听岔了。',
        significance: 0.74,
        fx: {
          reputation: 0.08,
          relation: ['gossip', 'rival', -0.12, 0],
          role: 'rumor_stopper',
          flag: 'confronted_laundry_rumor',
          knowledge: ['the rumour started at the market stall, not in the laundry', 0.8, 'gossip'],
        },
      },
      {
        id: 'rumor-spread',
        w: 0.35,
        text: '{subject}越说越快，{gossip}反而往后退，说被冤枉的人才会这么急。{witness}低头搓衣服，一句话也没接。第二天，{subject}去市场买盐，摊主把秤盘往回一收，说今天不赊账。',
        significance: 0.68,
        fx: {
          reputation: -0.1,
          mood: -0.12,
          relation: ['gossip', 'rival', -0.2, 0],
          condition: 'social_rumor',
          flag: 'rumor_grew_after_confrontation',
        },
      },
      {
        id: 'laundry-fight',
        w: 0.25,
        text: '话没有说完，{gossip}把湿衣服甩在{subject}脸上。{subject}抓住对方的手腕，两人撞翻了洗衣盆，肥皂水漫过门槛。{witness}把两人拉开时，{subject}的手背已经破了皮；当天下午，楼长把两家的人都叫到走廊里。',
        significance: 0.72,
        when: { skill: { name: 'social', max: 0.25 } },
        fx: {
          health: -0.04,
          cash: -2,
          relation: ['gossip', 'rival', -0.28, 0],
          condition: 'bruised_knuckles',
          flag: 'laundry_brawl',
        },
      },
    ],
    variants: [
      {
        id: 'rumour-crisis',
        when: { contextTags: ['crisis'] },
        title: '门房本子上的名字',
        outcomes: [
          {
            id: 'denounced-name',
            w: 0.55,
            text: '洗衣房里的人压低声音说，{gossip}已经把{subject}的名字写进了门房的本子，说{subject}替罢工的人送过饭。{subject}没有吵，只问本子现在在谁手里。{witness}把最后一件衣服拧干，说昨晚看见本子被送进了分局。',
            significance: 0.82,
            fx: {
              reputation: -0.12,
              relation: ['gossip', 'rival', -0.24, 0],
              condition: 'police_attention',
              flag: 'named_in_porter_book',
              knowledge: [
                'the porter’s book was taken to the district police office',
                0.85,
                'witness',
              ],
            },
          },
          {
            id: 'warned-gossip',
            w: 0.45,
            text: '{subject}把{gossip}堵在煤棚里，没有提本子，只说分局的人上周也问过对方家里人的班次。{gossip}的脸一下白了，问{subject}是从哪儿听来的。{subject}说从哪儿听来的不重要，重要的是下一个名字会是谁。',
            significance: 0.7,
            fx: {
              relation: ['gossip', 'acquaintance', 0.08, 0],
              role: 'rumor_stopper',
              flag: 'silenced_informer_with_warning',
              knowledge: ['the gossip also fears the police', 0.75, 'gossip'],
            },
          },
        ],
      },
    ],
    task: taskMeta('social', ['belonging', 'status'], ['status', 'belonging'], 0.7, 0.3, [
      'social',
    ]),
  },

  // 9. Ask someone to dance ----------------------------------------------
  {
    id: 'r13-fam.ask-dance',
    title: '乐队奏到第三支曲子',
    domain: 'social',
    kind: 'task',
    stage: 'adulthood',
    ages: [16, 30],
    tags: ['task', 'social', 'courtship', 'dance', 'chaperone'],
    contexts: URBAN,
    milieus: SOCIAL,
    conditions: [{ kind: 'notHasRole', role: 'married' }],
    roles: {
      partner: ['partner', { minAge: 17, maxAge: 33, sex: 'opposite' }],
      chaperone: ['neighbor', { minAge: 35, maxAge: 75 }],
    },
    outcomes: [
      {
        id: 'dance-accepted',
        w: 0.45,
        text: '{subject}在柱子后面站了两支曲子，才走过去问{partner}下一支能不能一起跳。{partner}把手里的手套交给{chaperone}，跟着{subject}走进场子。{subject}踩了两次对方的鞋尖，第三次终于跟上拍子；{chaperone}在墙边把钟点记在手袋上。',
        significance: 0.7,
        fx: {
          cash: -1,
          relation: ['partner', 'acquaintance', 0.08, 0.14],
          role: 'courting',
          flag: 'danced_together',
          skill: { social: 0.02 },
        },
      },
      {
        id: 'dance-refused',
        w: 0.3,
        text: '{partner}说已经答应别人了，{subject}点头退开，手还保持着邀请的姿势。乐队换了曲子，{subject}在门口买了一杯水，看见{partner}和别人转过来，裙摆扫过地板上的锯末。',
        significance: 0.54,
        fx: {
          mood: -0.1,
          relation: ['partner', 'acquaintance', -0.03, 0],
          flag: 'dance_refused',
        },
      },
      {
        id: 'chaperone-intervenes',
        w: 0.25,
        text: '{subject}刚伸手，{chaperone}就过来替{partner}整理披肩，说该回家了。{partner}回头看了一眼，什么也没说。{subject}送到门口，{chaperone}把{partner}的手挽在自己臂弯里，脚步很快。',
        significance: 0.6,
        when: { maxCash: 1 },
        fx: {
          mood: -0.06,
          relation: ['chaperone', 'rival', -0.08, 0],
          relation2: ['partner', 'acquaintance', 0.04, 0.06],
          flag: 'chaperone_ended_the_dance',
        },
      },
    ],
    variants: [
      {
        id: 'dance-war',
        when: { contextTags: ['war'] },
        title: '兵营食堂的留声机',
        outcomes: [
          {
            id: 'dance-before-departure',
            w: 0.6,
            text: '兵营食堂的桌子都推到墙边，留声机放在一只弹药箱上。{partner}的军装袖口磨得发亮，请{subject}跳一支，说下星期就开拔。{chaperone}在门口催了三回；{subject}把名字和部队番号写在糖纸上，塞进对方口袋。',
            significance: 0.78,
            fx: {
              cash: -1,
              relation: ['partner', 'acquaintance', 0.12, 0.16],
              role: 'courting_soldier',
              flag: 'danced_before_departure',
              knowledge: ['the partner’s regiment and departure week', 0.9, 'partner'],
            },
          },
          {
            id: 'soldier-absent',
            w: 0.4,
            text: '{partner}没有来。食堂的灯亮到十点，{subject}把两只手套都戴上了，还是冷。{chaperone}说前线的名单昨天又贴出来；{subject}回家，把糖纸上的名字抄在日历背面，抄了三遍，怕自己忘了怎么写。',
            significance: 0.72,
            fx: {
              mood: -0.18,
              relation: ['partner', 'acquaintance', 0.02, 0.06],
              role: 'waiting_for_soldier',
              condition: 'separation_anxiety',
              flag: 'soldier_failed_to_come',
              knowledge: ['a new casualty list was posted at the barracks', 0.7, 'chaperone'],
            },
          },
        ],
      },
    ],
    task: taskMeta('social', ['belonging', 'family'], ['belonging'], 0.72, 0.12, ['social']),
  },

  // 10. Begin a courtship -------------------------------------------------
  {
    id: 'r13-fam.begin-courtship',
    title: '丁香开在院墙外',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [17, 36],
    tags: ['task', 'family', 'courtship', 'courting', 'marriage'],
    contexts: URBAN,
    milieus: SOCIAL,
    conditions: [
      { kind: 'notHasRelation', relationKind: 'partner' },
      { kind: 'notHasRole', role: 'courting' },
    ],
    roles: {
      partner: ['partner', { minAge: 17, maxAge: 38, sex: 'opposite' }],
      chaperone: ['neighbor', { minAge: 30, maxAge: 75 }],
    },
    outcomes: [
      {
        id: 'courtship-begun',
        w: 0.45,
        text: '{subject}把一束丁香放在{partner}家的窗台上，花枝用报纸裹着，怕被街上的人看见。{chaperone}在巷口等着，说只给一刻钟。{partner}出来时没有拿花，只问{subject}下个星期天去不去教堂；{subject}说去，声音比预想的轻。',
        significance: 0.72,
        fx: {
          cash: -2,
          relation: ['partner', 'acquaintance', 0.1, 0.16],
          relation2: ['chaperone', 'colleague', 0.06, 0],
          role: 'courting',
          flag: 'courtship_begun',
          knowledge: ['the partner’s family attends the Sunday service', 0.75, 'partner'],
        },
      },
      {
        id: 'courtship-refused',
        w: 0.3,
        text: '{partner}把花推回来，说家里已经替自己看好了人家。{subject}把报纸重新裹好，花枝在手里折了一根。{chaperone}走过来，没有问结果，只说天要黑了；两人一前一后走回巷子，谁也没有提那束花。',
        significance: 0.62,
        fx: {
          mood: -0.14,
          relation: ['partner', 'acquaintance', -0.08, 0],
          flag: 'courtship_refused',
        },
      },
      {
        id: 'family-conditions',
        w: 0.25,
        text: '{partner}收下花，却说家里要先把债还清，才谈得上定亲。{subject}问欠多少，{partner}说了一个数，又补一句“不是要你出”。{chaperone}在巷口咳了一声；{subject}把花枝上的刺一根根掐掉，说下个月再来。',
        significance: 0.7,
        when: { minCash: 4 },
        fx: {
          cash: -2,
          relation: ['partner', 'acquaintance', 0.08, 0.12],
          role: 'courting',
          condition: 'courtship_waiting_on_debt',
          flag: 'courtship_deferred_for_debt',
          knowledge: [
            'the partner’s family will not agree before the debt is paid',
            0.85,
            'partner',
          ],
        },
      },
    ],
    variants: [
      {
        id: 'courtship-war',
        when: { contextTags: ['war'] },
        title: '车站前的三分钟',
        outcomes: [
          {
            id: 'courtship-at-station',
            w: 0.6,
            text: '{partner}穿着军装，背包带勒进肩膀。{subject}把丁香塞进对方口袋，说等回来再谈。{chaperone}站在几步外，替两人看着站台上的巡警。汽笛响时，{partner}把一枚扣子放进{subject}手心，说别弄丢了。',
            significance: 0.8,
            fx: {
              cash: -1,
              relation: ['partner', 'acquaintance', 0.14, 0.2],
              role: 'courting_soldier',
              flag: 'courtship_before_departure',
              knowledge: ['the partner’s unit left from the north platform', 0.9, 'partner'],
            },
          },
          {
            id: 'courtship-postponed',
            w: 0.4,
            text: '{subject}赶到车站时，站台已经空了。{chaperone}从地上捡起一张被踩脏的糖纸，说人大概已经上车。{subject}把丁香放在候车室的长椅上，坐到来接站的搬运工开始赶人。',
            significance: 0.68,
            fx: {
              mood: -0.18,
              relation: ['partner', 'acquaintance', 0.04, 0.08],
              condition: 'separation_anxiety',
              flag: 'missed_departure',
            },
          },
        ],
      },
    ],
    task: taskMeta('family', ['family', 'belonging'], ['belonging'], 0.78, 0.18, ['social']),
  },

  // 11. Ask for a chaperoned walk -----------------------------------------
  {
    id: 'r13-fam.chaperoned-walk',
    title: '河堤上的一刻钟',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [16, 29],
    tags: ['task', 'family', 'courtship', 'chaperone', 'reputation'],
    contexts: URBAN,
    milieus: SOCIAL,
    conditions: [{ kind: 'notHasRelation', relationKind: 'partner' }],
    roles: {
      partner: ['partner', { minAge: 17, maxAge: 34, sex: 'opposite' }],
      chaperone: ['neighbor', { minAge: 35, maxAge: 78 }],
    },
    outcomes: [
      {
        id: 'walk-permitted',
        w: 0.45,
        text: '{subject}替{partner}把外套领子翻好，才回头问{chaperone}能不能一起走到多瑙河边。{chaperone}说只走一刻钟，走在后面三步。河风把两人的影子吹得并在一起；{subject}数着步子，发现{partner}故意走得很慢。',
        significance: 0.68,
        fx: {
          mood: 0.1,
          relation: ['partner', 'acquaintance', 0.1, 0.14],
          relation2: ['chaperone', 'colleague', 0.04, 0],
          role: 'courting',
          flag: 'chaperoned_riverside_walk',
        },
      },
      {
        id: 'walk-forbidden',
        w: 0.3,
        text: '{chaperone}把{subject}拉到门后，说{partner}家的父亲欠着裁缝的钱，走得太近会被人说闲话。{subject}在窗口看见{partner}在街对面等到天黑，手里的伞一直没有撑开。第二天，{chaperone}把窗帘换成了更厚的一层。',
        significance: 0.62,
        fx: {
          mood: -0.14,
          relation: ['partner', 'acquaintance', 0.04, 0.08],
          relation2: ['chaperone', 'rival', -0.1, 0],
          condition: 'courtship_blocked',
          flag: 'walk_forbidden',
        },
      },
      {
        id: 'walk-becomes-betrothal',
        w: 0.25,
        text: '走到桥中间，{partner}忽然停下来，说已经和家里提过{subject}的名字。{chaperone}在后面咳了一声，{subject}回头，看见老人正把脸转向河面。回家时，{partner}把一枚细戒指塞进{subject}的手套，{chaperone}装作没有看见。',
        significance: 0.78,
        when: { hasRole: 'engaged' },
        fx: {
          cash: -1,
          relation: ['partner', 'partner', 0.18, 0.2],
          role: 'engaged',
          flag: 'betrothal_on_the_bridge',
          knowledge: ['the partner has already spoken to his family', 0.85, 'partner'],
        },
      },
    ],
    variants: [
      {
        id: 'walk-postwar',
        when: { contextTags: ['postwar'] },
        title: '少了半代人的河边',
        outcomes: [
          {
            id: 'walk-without-crowd',
            w: 0.6,
            text: '{subject}和{partner}沿河边走，长椅上坐的多是女人和孩子，年轻男人少得能数出来。{chaperone}破例让两人走远了半条街，说这年头再端着架子，好人都被别人挑走了。{partner}把军帽摘下来拿在手里，帽檐上还有一处弹片擦过的凹痕。',
            significance: 0.72,
            fx: {
              mood: 0.08,
              relation: ['partner', 'acquaintance', 0.14, 0.16],
              role: 'courting',
              flag: 'postwar_courtship_walk',
              knowledge: ['the partner returned from the war with a dented cap', 0.8, 'partner'],
            },
          },
          {
            id: 'walk-shortened',
            w: 0.4,
            text: '{chaperone}只让走到第二个路灯，说家里还等着煤。{partner}没有争，把{subject}送到门口，从口袋里摸出一张折了四折的退伍证明，说下个月要去工厂报到。{subject}把证明上的日期看了两遍，才还回去。',
            significance: 0.64,
            fx: {
              relation: ['partner', 'acquaintance', 0.1, 0.1],
              condition: 'courtship_cautious',
              flag: 'short_postwar_walk',
              knowledge: ['the partner starts factory work next month', 0.8, 'partner'],
            },
          },
        ],
      },
    ],
    task: taskMeta('family', ['family', 'belonging'], ['belonging'], 0.72, 0.14, ['social']),
  },

  // 12. Propose cohabitation ----------------------------------------------
  {
    id: 'r13-fam.propose-cohabitation',
    title: '两把钥匙放在一张桌上',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 48],
    tags: ['task', 'family', 'cohabitation', 'household', 'courtship'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [
      { kind: 'hasRelation', relationKind: 'partner' },
      { kind: 'notHasRelation', relationKind: 'partner', sameHousehold: true },
      { kind: 'notHasRole', role: 'cohabiting' },
      { kind: 'overcrowded', value: false },
    ],
    roles: {
      partner: ['partner', { minAge: 18, maxAge: 50 }],
    },
    outcomes: [
      {
        id: 'keys-on-table',
        w: 0.45,
        text: '{subject}把两把钥匙放在桌上，一把是自家门，一把是今天刚配的。{partner}没有立刻拿，先问房东知不知道，又问邻居会不会说闲话。{subject}说已经跟门房讲过，只说是表亲来住；{partner}把钥匙收进围裙口袋，当晚就提来一只藤箱。',
        significance: 0.8,
        fx: [
          {
            cash: -5,
            relation: ['partner', 'partner', 0.16, 0.18],
            role: 'cohabiting',
            flag: 'moved_in_together',
            knowledge: ['the porter was told the partner is a cousin', 0.8],
          },
          {
            raw: [
              {
                type: 'household',
                personId: '$partner',
                householdId: '$household',
                reason: 'moved in without a wedding',
              },
            ],
          },
        ],
      },
      {
        id: 'wait-for-wedding',
        w: 0.3,
        text: '{partner}把钥匙推回来，说母亲会打断自己的腿，还是等教堂定了日子再说。{subject}把两把钥匙都收回口袋，钥匙齿在布上磨出一点响。两人坐着把茶喝完，谁也没有提那只已经收拾好的藤箱。',
        significance: 0.6,
        fx: {
          mood: -0.1,
          relation: ['partner', 'acquaintance', -0.02, 0.06],
          condition: 'cohabitation_refused',
          flag: 'waited_for_wedding',
        },
      },
      {
        id: 'rent-raised',
        w: 0.25,
        text: '藤箱刚搬进来，房东太太就上楼来，说多住一个人要加两克朗。{partner}把箱子又提回门口，{subject}拦住，说加的钱从自己的工钱里扣。房东太太下楼时，把楼梯踩得很响；隔壁的门开了一条缝，又关上。',
        significance: 0.72,
        when: { maxCash: 5 },
        fx: {
          cash: -3,
          relation: ['partner', 'partner', 0.1, 0.1],
          condition: 'rent_arrears',
          flag: 'paid_extra_rent_for_cohabitation',
          knowledge: ['the landlady charges two kronen for a second lodger', 0.85],
        },
      },
    ],
    task: taskMeta('family', ['family', 'belonging'], ['belonging', 'cash'], 0.8, 0.22, ['social']),
  },

  // 13. Ask a parent for consent ------------------------------------------
  {
    id: 'r13-fam.ask-parents-consent',
    title: '厨房桌上的第三副碗筷',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [17, 32],
    tags: ['task', 'family', 'courtship', 'marriage', 'consent', 'parent'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [
      { kind: 'hasRelation', relationKind: 'partner' },
      { kind: 'notHasRole', role: 'family_approved' },
    ],
    roles: {
      mother: ['parent', { minAge: 38, maxAge: 80, sex: 'female' }],
      partner: ['partner', { minAge: 17, maxAge: 34 }],
    },
    outcomes: [
      {
        id: 'consent-given',
        w: 0.45,
        text: '{subject}在厨房多摆了一副碗筷，等{mother}坐下才说{partner}的事。{mother}先问对方家几口人、父亲做什么，又问{subject}想清楚了没有。汤凉了一半，{mother}才把自己的银顶针从手上褪下来，放在{partner}的碗边，说定了就好好过。',
        significance: 0.76,
        fx: {
          cash: -1,
          relation: ['mother', 'kin', 0.16, 0.08],
          relation2: ['partner', 'partner', 0.1, 0.12],
          role: 'family_approved',
          flag: 'parental_consent_given',
          knowledge: ['the mother’s silver thimble is the family’s consent token', 0.85, 'mother'],
        },
      },
      {
        id: 'consent-refused',
        w: 0.3,
        text: '{mother}把碗筷收走一副，说这家门里不迎一个连房租都交不齐的人。{subject}说{partner}正在学徒，出师就有工钱；{mother}把抹布摔在桌上，问出师前谁养孩子。{partner}的名字在厨房里被念了三遍，每一遍都更难听。',
        significance: 0.7,
        fx: {
          mood: -0.16,
          relation: ['mother', 'rival', -0.2, 0],
          relation2: ['partner', 'partner', 0.08, 0.06],
          condition: 'forbidden_match',
          flag: 'parental_consent_refused',
        },
      },
      {
        id: 'consent-with-dowry',
        w: 0.25,
        text: '{mother}没有说行或不行，只从柜底取出一只小木匣，说里面是外婆留下的一对耳环，当了能付三个月房租。条件是新郎要入赘，孩子跟母姓。{subject}把木匣推回去一半，说要去问{partner}；{mother}把匣盖合上，说问清楚再来。',
        significance: 0.74,
        when: { maxCash: 3 },
        fx: {
          cash: -2,
          relation: ['mother', 'kin', 0.06, 0],
          relation2: ['partner', 'acquaintance', 0.04, 0],
          condition: 'dowry_negotiation',
          flag: 'dowry_terms_offered',
          knowledge: [
            'the mother will trade the earrings for an uxorilocal marriage',
            0.9,
            'mother',
          ],
        },
      },
    ],
    task: taskMeta('family', ['family', 'belonging'], ['belonging', 'status'], 0.74, 0.18, [
      'social',
      'numeracy',
    ]),
  },

  // 14. Plan a wedding -----------------------------------------------------
  {
    id: 'r13-fam.plan-wedding',
    title: '婚宴要摆几桌',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 42],
    tags: ['task', 'family', 'marriage', 'wedding', 'household', 'debt'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [
      { kind: 'hasRelation', relationKind: 'partner' },
      { kind: 'notHasRole', role: 'married' },
    ],
    roles: {
      partner: ['partner', { minAge: 18, maxAge: 46 }],
    },
    outcomes: [
      {
        id: 'modest-wedding',
        w: 0.45,
        text: '{subject}和{partner}在厨房桌上把亲戚名单划到只剩两桌，又去当铺问了一只银表能当多少。婚礼那天，借来的桌子拼在院子里，汤里只有几片肉；{partner}把戒指戴反了，众人笑了一阵，{subject}却没有纠正。',
        significance: 0.82,
        fx: [
          {
            cash: -10,
            relation: ['partner', 'partner', 0.18, 0.16],
            role: 'married',
            loseRole: 'engaged',
            flag: 'married_at_a_modest_wedding',
            knowledge: ['the wedding cost two months of wages', 0.8],
          },
          {
            raw: [
              {
                type: 'household',
                personId: '$partner',
                householdId: '$household',
                reason: 'moved in after the wedding',
              },
            ],
          },
        ],
      },
      {
        id: 'wedding-debt',
        w: 0.3,
        text: '{subject}不肯让{partner}家看轻，借了钱把婚宴摆到四桌，还请了乐队。散席后，账房把欠条一张张摊开，{partner}的姑母当场沉了脸。新婚第一夜，两人在灯下算到后半夜，喜烛烧完了一半。',
        significance: 0.84,
        when: { minCash: 20 },
        fx: [
          {
            cash: -20,
            relation: ['partner', 'partner', 0.1, 0.06],
            role: 'married',
            loseRole: 'engaged',
            condition: 'wedding_debt',
            flag: 'wedding_paid_on_credit',
            knowledge: ['the wedding debt will take a year to clear', 0.9],
          },
          {
            raw: [
              {
                type: 'household',
                personId: '$partner',
                householdId: '$household',
                reason: 'moved in after the wedding',
              },
            ],
          },
        ],
      },
      {
        id: 'wedding-postponed',
        w: 0.25,
        text: '日子定下来又退了。{subject}的工钱拖了两个月，{partner}家的母亲又病了一场；请帖没有发出去，只把订婚戒指重新收进盒子。{partner}说等开春再说，{subject}点头，却在回家路上绕到教堂门口，看别人家的花。',
        significance: 0.66,
        when: { maxCash: 5 },
        fx: {
          mood: -0.14,
          relation: ['partner', 'partner', 0.02, 0.04],
          condition: 'engagement_delayed',
          flag: 'wedding_postponed',
        },
      },
    ],
    variants: [
      {
        id: 'wedding-war',
        when: { contextTags: ['war'] },
        title: '开拔前一天的婚礼',
        outcomes: [
          {
            id: 'wedding-before-departure',
            w: 0.6,
            text: '教堂的钟被征去熔了，婚礼借了食堂的一张长桌。{partner}的军装还没有拆线，证婚人是临时拉来的军士。{subject}把戒指用红线缠了一圈，怕太松；宴席只有一锅炖豆子和半瓶酒，凌晨三点，{partner}就得去车站。',
            significance: 0.86,
            fx: [
              {
                cash: -6,
                relation: ['partner', 'partner', 0.2, 0.14],
                role: 'married',
                loseRole: 'engaged',
                condition: 'wartime_marriage',
                flag: 'married_before_departure',
              },
              {
                raw: [
                  {
                    type: 'household',
                    personId: '$partner',
                    householdId: '$household',
                    reason: 'moved in for the night before departure',
                  },
                ],
              },
            ],
          },
          {
            id: 'wedding-refused-by-unit',
            w: 0.4,
            text: '{partner}的部队不准假，婚礼只能取消。{subject}把做好的礼服叠好，送到裁缝那里改成一件能日常穿的外套。{partner}托人带回来一张纸条，说等打完这一仗；{subject}把纸条夹进祈祷书，没有回信。',
            significance: 0.72,
            fx: {
              mood: -0.16,
              relation: ['partner', 'partner', 0.06, 0.08],
              condition: 'engagement_delayed',
              flag: 'wartime_wedding_cancelled',
              knowledge: ['the unit refused leave for the wedding', 0.85],
            },
          },
        ],
      },
    ],
    task: taskMeta('family', ['family', 'belonging'], ['belonging', 'cash'], 0.86, 0.2, [
      'social',
      'numeracy',
    ]),
  },

  // 15. Set up a household ------------------------------------------------
  {
    id: 'r13-fam.set-up-household',
    title: '第一间自己的屋子',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 50],
    tags: ['task', 'family', 'household', 'housing', 'marriage'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [
      { kind: 'hasRelation', relationKind: 'partner' },
      { kind: 'notHasRole', role: 'householder' },
      { kind: 'overcrowded', value: false },
    ],
    roles: {
      partner: ['partner', { minAge: 18, maxAge: 52 }],
      landlady: ['neighbor', { minAge: 35, maxAge: 80, sex: 'female' }],
    },
    outcomes: [
      {
        id: 'room-rented',
        w: 0.45,
        text: '{subject}跟着{landlady}看了后院的屋子，墙皮掉了一半，窗子对着煤棚，但有一扇能锁的门。{landlady}要三个月的押金，{subject}把工钱袋倒在桌上，{partner}又从鞋底摸出几张票子。当天下午，两人用借来的手推车把床架和一口锅搬了进去。',
        significance: 0.82,
        fx: [
          {
            cash: -8,
            residence: ['@home', 'rented a room for the new household'],
            relation: ['partner', 'partner', 0.16, 0.12],
            relation2: ['landlady', 'acquaintance', 0.08, 0],
            role: 'householder',
            flag: 'set_up_household',
          },
          {
            raw: [
              {
                type: 'household',
                personId: '$partner',
                householdId: '$household',
                reason: 'moved into the first shared room',
              },
            ],
          },
        ],
      },
      {
        id: 'deposit-too-high',
        w: 0.3,
        text: '{landlady}把押金又加了两克朗，说带家具的屋子都这个价。{subject}数了三遍手里的钱，还是差一截；{partner}说可以先住自己家，被{subject}顶了回去。两人在巷口坐到天黑，最后把已经捆好的铺盖又解开。',
        significance: 0.68,
        when: { maxCash: 4 },
        fx: {
          cash: -2,
          mood: -0.1,
          relation: ['partner', 'partner', 0.02, 0.04],
          condition: 'housing_insecurity',
          flag: 'deposit_unaffordable',
        },
      },
      {
        id: 'move-in-with-in-laws',
        w: 0.25,
        text: '屋子没租成，{partner}的母亲腾出半间前屋，条件是新婚夫妇每月交饭钱。{subject}把箱子搬进去时，{landlady}站在楼下看，嘴角带着笑。当天晚上，两代人在一张桌上吃饭，谁的筷子都没有先动。',
        significance: 0.74,
        fx: [
          {
            cash: -3,
            relation: ['partner', 'partner', 0.08, 0.06],
            relation2: ['landlady', 'rival', -0.06, 0],
            condition: 'doubled_up_with_relatives',
            flag: 'moved_in_with_in_laws',
            knowledge: ['the couple pays board to the partner’s mother', 0.85],
          },
          {
            raw: [
              {
                type: 'household',
                personId: '$partner',
                householdId: '$household',
                reason: 'moved into the subject’s household after the room fell through',
              },
            ],
          },
        ],
      },
    ],
    variants: [
      {
        id: 'household-postwar',
        when: { contextTags: ['postwar'] },
        title: '隔板隔出来的新房',
        outcomes: [
          {
            id: 'partition-room',
            w: 0.6,
            text: '战后退伍的人挤满了出租屋，{landlady}把一间大屋用木板隔成两半，租给{subject}和{partner}。隔板只有一人高，隔壁的咳嗽和翻身都听得见；{subject}用旧报纸把缝糊上，{partner}在板壁上钉了一枚钉子挂外套。',
            significance: 0.76,
            fx: [
              {
                cash: -6,
                residence: ['@home', 'rented a partitioned room after the war'],
                relation: ['partner', 'partner', 0.14, 0.1],
                relation2: ['landlady', 'acquaintance', 0.06, 0],
                condition: 'thin_partition_walls',
                role: 'householder',
                flag: 'rented_partitioned_room',
              },
            ],
          },
          {
            id: 'housing-office-refused',
            w: 0.4,
            text: '{landlady}说市政厅的住房登记还没有批下来，不敢收人。{subject}和{partner}在住房办事处排了半天，窗口只递出一张写着“候补”的纸。回家路上，{partner}把那张纸折成一只小船，放进水沟里。',
            significance: 0.7,
            fx: [
              {
                cash: -1,
                mood: -0.12,
                relation: ['partner', 'partner', 0.06, 0.06],
                condition: 'housing_insecurity',
                flag: 'housing_waitlist',
                knowledge: ['the municipal housing list may take a year', 0.8],
              },
            ],
          },
        ],
      },
    ],
    task: taskMeta('family', ['family', 'belonging'], ['belonging', 'cash'], 0.84, 0.24, [
      'social',
      'numeracy',
    ]),
  },

  // 16. Share a budget -----------------------------------------------------
  {
    id: 'r13-fam.share-budget',
    title: '工钱倒在桌上分堆',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [20, 72],
    tags: ['task', 'family', 'budget', 'money', 'household', 'trust'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [{ kind: 'hasRelation', relationKind: 'partner', sameHousehold: true }],
    roles: {
      partner: ['partner', { minAge: 20, maxAge: 74 }],
    },
    outcomes: [
      {
        id: 'pooled-wages',
        w: 0.45,
        text: '{subject}把这个月的工钱倒在桌上，分成房租、煤、面包和一小堆应急的铜板。{partner}把自己的钱也推过来，只留下车票钱。两人把钱数了两遍，数目对上了，{subject}才把那只装钱的铁盒推到床底下，钥匙交给{partner}。',
        significance: 0.72,
        fx: {
          relation: ['partner', 'partner', 0.16, 0.08],
          condition: 'shared_budget',
          role: 'budget_keeper',
          flag: 'pooled_household_wages',
          knowledge: ['the household now keeps one emergency tin', 0.85],
        },
      },
      {
        id: 'separate-purses',
        w: 0.3,
        text: '{partner}不肯把钱并在一起，说各人的工钱各人管，房租对半分。{subject}把已经分好的煤钱又推回去一半，铁盒留在桌上，谁也没有去拿。那天晚上，两人各数各的铜板，灯芯剪了两次。',
        significance: 0.62,
        fx: {
          relation: ['partner', 'partner', -0.08, 0],
          condition: 'separate_purses',
          flag: 'kept_separate_money',
        },
      },
      {
        id: 'hidden-debt',
        w: 0.25,
        text: '{subject}在{partner}的外套里摸到一张当票，日期是上个月，当的是一对袖扣。{partner}回来看见当票摊在桌上，先说是替朋友当的，后来才承认外面还欠着钱。{subject}把铁盒里的应急钱倒出来，数到一半，手停住了。',
        significance: 0.74,
        when: { maxCash: 3 },
        fx: {
          cash: -6,
          relation: ['partner', 'partner', -0.14, 0],
          condition: 'hidden_debt',
          flag: 'found_partner_debt',
          knowledge: ['the partner pawned cufflinks to cover a private debt', 0.9],
        },
      },
    ],
    task: taskMeta('family', ['family', 'survival'], ['cash', 'belonging'], 0.76, 0.18, [
      'numeracy',
      'social',
    ]),
  },

  // 17. Negotiate the rent -------------------------------------------------
  {
    id: 'r13-fam.negotiate-rent',
    title: '房东的收租日',
    domain: 'commerce',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 78],
    tags: ['task', 'commerce', 'housing', 'rent', 'negotiation'],
    contexts: URBAN,
    milieus: HOME,
    roles: {
      landlady: ['neighbor', { minAge: 35, maxAge: 82, sex: 'female' }],
    },
    outcomes: [
      {
        id: 'rent-reduced',
        w: 0.4,
        text: '{subject}把漏水的墙角指给{landlady}看，又把这两年修炉子、换窗玻璃的账一笔笔报出来。{landlady}伸手摸了摸墙上的霉斑，说这个月的租减一克朗，明年再谈。{subject}让对方把话写在收据背面，两个人都按了手印。',
        significance: 0.7,
        fx: {
          cash: -2,
          relation: ['landlady', 'acquaintance', 0.08, 0],
          condition: 'rent_reduced',
          flag: 'negotiated_rent_reduction',
          knowledge: ['the landlord accepts written deductions for repairs', 0.85, 'landlady'],
        },
      },
      {
        id: 'rent-refused',
        w: 0.35,
        text: '{landlady}把收据本合上，说这条街上等着租的人排到了巷口。{subject}把准备好的账目念到一半，{landlady}已经转身去敲下一家的门。第二天，门缝里塞进来一张纸条，欠租的数目后面多了一个月。',
        significance: 0.68,
        fx: {
          cash: -8,
          relation: ['landlady', 'rival', -0.14, 0],
          condition: 'rent_arrears',
          flag: 'rent_increase_refused',
        },
      },
      {
        id: 'rent-deferred',
        w: 0.25,
        text: '{subject}说这个月厂里短了工，能不能宽限十天。{landlady}盯着{subject}脚上那双补过的鞋看了一会儿，把收据上的日期往后挪，说十天后连本带利一起算。{subject}点头时，听见里屋的钟敲了七下。',
        significance: 0.64,
        when: { maxCash: 3 },
        fx: {
          cash: -1,
          relation: ['landlady', 'acquaintance', 0.06, 0],
          condition: 'rent_deferred',
          flag: 'rent_grace_granted',
          knowledge: ['the landlady charges interest on late rent', 0.8, 'landlady'],
        },
      },
    ],
    variants: [
      {
        id: 'rent-postwar',
        when: { contextTags: ['postwar'] },
        title: '租金封顶的告示',
        outcomes: [
          {
            id: 'rent-control-invoked',
            w: 0.55,
            text: '{subject}把市政厅新贴的租金告示抄在一张纸上，带给{landlady}看。{landlady}起初说那是给新房客的，{subject}便指着告示上的日期，说不许涨。两人在门口争了半个钟头，最后按旧租收，收据上多盖了一个章。',
            significance: 0.74,
            fx: [
              {
                cash: -3,
                relation: ['landlady', 'acquaintance', 0.04, 0],
                condition: 'rent_control',
                flag: 'invoked_rent_control',
                knowledge: ['the new rent notice applies to sitting tenants', 0.9],
              },
            ],
          },
          {
            id: 'repairs-instead',
            w: 0.45,
            text: '{landlady}说租金不能降，但可以把漏雨的屋顶修了。{subject}让她把修屋顶的日期写在收据上，{landlady}写了又划掉，最后改成“尽快”。{subject}收好收据，心想这条街上“尽快”大概能拖到下一个冬天。',
            significance: 0.66,
            fx: {
              relation: ['landlady', 'acquaintance', 0.02, 0],
              condition: 'roof_promise',
              flag: 'accepted_repairs_for_rent',
              knowledge: ['the roof repair has only a vague promise', 0.8, 'landlady'],
            },
          },
        ],
      },
    ],
    task: taskMeta('commerce', ['survival', 'family'], ['cash', 'belonging'], 0.74, 0.2, [
      'numeracy',
      'social',
    ]),
  },

  // 18. Care for a sick child ---------------------------------------------
  {
    id: 'r13-fam.care-sick-child',
    title: '第三遍换湿布',
    domain: 'care',
    kind: 'task',
    stage: 'adulthood',
    ages: [20, 62],
    tags: ['task', 'care', 'health', 'child', 'fever', 'night'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [{ kind: 'householdSize', min: 2 }],
    roles: {
      child: ['neighbor', { minAge: 1, maxAge: 12, sameHousehold: true }],
    },
    outcomes: [
      {
        id: 'fever-breaks',
        w: 0.45,
        text: '{subject}把湿布拧到不再滴水，敷在{child}的额头上。孩子烧得说胡话，{subject}就一遍遍念窗外的街名，直到天快亮时，孩子的手心终于出了一层汗。{subject}把被子掖好，自己靠在床沿睡了过去，醒来时锅里还剩半碗冷粥。',
        significance: 0.74,
        fx: [
          { cash: -2, health: -0.03, condition: 'sleepless_night', flag: 'nursed_child_fever' },
          {
            raw: [
              {
                type: 'health',
                personId: '$child',
                amount: 0.06,
                reason: 'the fever broke after a night of cold compresses',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$child',
                kind: 'guardian',
                trust: 0.12,
                affection: 0.1,
                reason: 'sat through the child’s fever',
              },
            ],
          },
        ],
      },
      {
        id: 'fever-worsens',
        w: 0.3,
        text: '到了后半夜，{child}的呼吸越来越急，胸口凹下去一块。{subject}把最后两克朗塞给邻居，让邻居去请医生；医生天亮才来，只说怎么不早点送医院。{subject}抱着孩子坐在门槛上，等一辆借来的车。',
        significance: 0.82,
        fx: [
          { cash: -5, health: -0.02, flag: 'child_fever_worsened' },
          {
            raw: [
              {
                type: 'health',
                personId: '$child',
                amount: -0.1,
                reason: 'the fever worsened before a doctor arrived',
              },
              {
                type: 'condition',
                personId: '$child',
                condition: 'child_illness',
                add: true,
                reason: 'the child remained ill after the fever',
              },
            ],
          },
        ],
      },
      {
        id: 'home-remedy',
        w: 0.25,
        text: '{subject}用旧布包了炒热的盐，隔着衬衣在{child}的胸口来回推。孩子哭累了，终于睡沉；{subject}守在旁边，听着楼道里每一扇门开合。第二天，邻居送来一小瓶蜂蜜，说比药铺的糖浆管用。',
        significance: 0.68,
        when: { maxCash: 3 },
        fx: [
          { cash: -1, health: -0.02, role: 'carer', flag: 'used_heated_salt_remedy' },
          {
            raw: [
              {
                type: 'health',
                personId: '$child',
                amount: 0.03,
                reason: 'a home remedy eased the child’s cough',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$child',
                kind: 'guardian',
                trust: 0.08,
                affection: 0.08,
                reason: 'stayed up with the child',
              },
            ],
          },
        ],
      },
    ],
    variants: [
      {
        id: 'child-care-war',
        when: { contextTags: ['war'] },
        title: '配给奶掺了水',
        outcomes: [
          {
            id: 'milk-watered',
            w: 0.55,
            text: '配给站给的奶已经掺了水，{subject}把它煮开，撇掉上面那层薄薄的沫，还是喂给了{child}。孩子喝一半就推开碗，说苦；{subject}尝了一口，才发现锅底糊了。那一夜，{subject}把窗子开了又关，怕煤烟，也怕穿堂风。',
            significance: 0.76,
            fx: [
              {
                cash: -3,
                health: -0.04,
                flag: 'watered_milk_fed',
              },
              {
                raw: [
                  {
                    type: 'health',
                    personId: '$child',
                    amount: -0.06,
                    reason: 'rationed milk was watered and the child would not drink',
                  },
                  {
                    type: 'condition',
                    personId: '$child',
                    condition: 'child_malnutrition',
                    add: true,
                    reason: 'the child went hungry on watered milk',
                  },
                ],
              },
            ],
          },
          {
            id: 'hospital-turned-away',
            w: 0.45,
            text: '{subject}抱着{child}去医院，走廊里躺满缠绷带的士兵。挂号的人看了一眼孩子的脸，说病床先给伤员。{subject}在门口站到天黑，最后用外套把孩子裹紧，走回家去；路上孩子问，医院为什么不收小孩。',
            significance: 0.8,
            fx: [
              {
                cash: -1,
                flag: 'hospital_refused_child',
                knowledge: ['the hospital reserves beds for wounded soldiers', 0.85],
              },
              {
                raw: [
                  {
                    type: 'health',
                    personId: '$child',
                    amount: -0.05,
                    reason: 'the child was turned away from the overcrowded hospital',
                  },
                  {
                    type: 'condition',
                    personId: '$child',
                    condition: 'child_untreated',
                    add: true,
                    reason: 'the child remained untreated after the hospital refusal',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    task: taskMeta('care', ['care', 'family'], ['care', 'health'], 0.88, 0.2, ['social']),
  },

  // 19. Care for a sick parent --------------------------------------------
  {
    id: 'r13-fam.care-sick-parent',
    title: '给床上的老人翻身',
    domain: 'care',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 68],
    tags: ['task', 'care', 'health', 'parent', 'bedridden', 'duty'],
    contexts: URBAN,
    milieus: HOME,
    roles: {
      parent: ['parent', { minAge: 55, maxAge: 85, sameHousehold: true }],
    },
    outcomes: [
      {
        id: 'parent-recovers',
        w: 0.4,
        text: '{subject}每天早晚给{parent}翻身，把枕头拍松，再把药片碾碎拌进粥里。老人背上的褥疮结了一层薄痂，{subject}用温水一点点擦，擦到自己的腰直不起来。第三周，{parent}能扶着床沿坐起来，第一句话是问厂里有没有扣工钱。',
        significance: 0.76,
        fx: [
          { cash: -3, health: -0.04, condition: 'caregiver', flag: 'nursed_parent_back_to_health' },
          {
            raw: [
              {
                type: 'health',
                personId: '$parent',
                amount: 0.07,
                reason: 'recovered slowly under the subject’s care',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$parent',
                kind: 'kin',
                trust: 0.16,
                affection: 0.1,
                reason: 'was nursed through a long illness',
              },
            ],
          },
        ],
      },
      {
        id: 'parent-declines',
        w: 0.35,
        text: '{parent}的咳嗽在夜里越来越重，{subject}把炉子搬到床边，还是暖不透那间屋子。医生来看了两回，第二回只留下一张写着“静养”的纸。{subject}把纸折好，压在药瓶下面，开始学着给老人擦身、换床单。',
        significance: 0.78,
        fx: [
          { cash: -7, health: -0.03, flag: 'parent_bedridden' },
          {
            raw: [
              {
                type: 'health',
                personId: '$parent',
                amount: -0.08,
                reason: 'the illness worsened despite home care',
              },
              {
                type: 'condition',
                personId: '$parent',
                condition: 'bedridden_parent',
                add: true,
                reason: 'the parent became bedridden',
              },
            ],
          },
        ],
      },
      {
        id: 'hired-nurse',
        w: 0.25,
        text: '{subject}实在请不出假，只好按天雇了一个看护。女人每天来两趟，喂饭、擦身，走时把脏水倒在院子里。{subject}每晚回来都要闻一闻屋里的味道，确认没有长褥疮；工钱一半交给了看护，另一半买了煤。',
        significance: 0.7,
        when: { hasRole: 'married' },
        fx: [
          { cash: -9, role: 'carer', condition: 'paid_caregiver', flag: 'hired_nurse_for_parent' },
          {
            raw: [
              {
                type: 'health',
                personId: '$parent',
                amount: 0.04,
                reason: 'a paid nurse provided regular care',
              },
            ],
          },
        ],
      },
    ],
    variants: [
      {
        id: 'parent-care-war',
        when: { contextTags: ['war'] },
        title: '病房改成了伤员站',
        outcomes: [
          {
            id: 'nursed-at-home',
            w: 0.6,
            text: '医院把老人住的病房腾给了伤员，{subject}只好把{parent}接回家。借来的病床卡在楼梯转角，邻居们抬了半个钟头才进门。{subject}在床边支了一张草垫，夜里老人一咳，{subject}就伸手去摸那只盛温水的小碗。',
            significance: 0.78,
            fx: [
              { cash: -5, health: -0.05, condition: 'home_nursing', flag: 'nursed_parent_at_home' },
              {
                raw: [
                  {
                    type: 'health',
                    personId: '$parent',
                    amount: -0.03,
                    reason: 'was moved home when the hospital took in wounded soldiers',
                  },
                  {
                    type: 'relation',
                    a: '$subject',
                    b: '$parent',
                    kind: 'kin',
                    trust: 0.14,
                    affection: 0.08,
                    reason: 'took the parent home from the requisitioned ward',
                  },
                ],
              },
            ],
          },
          {
            id: 'hospital-corridor',
            w: 0.4,
            text: '{subject}每天去医院走廊里守两个钟头，给{parent}送一碗汤。护士说床位要等，等到第三个星期，{parent}已经不太认人。{subject}把汤匙送到老人嘴边，老人却叫了{subject}小时候的名字，叫得很清楚。',
            significance: 0.82,
            fx: [
              { cash: -4, mood: -0.12, condition: 'grief', flag: 'parent_in_hospital_corridor' },
              {
                raw: [
                  {
                    type: 'health',
                    personId: '$parent',
                    amount: -0.06,
                    reason: 'waited in a hospital corridor without a bed',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    task: taskMeta('care', ['care', 'family'], ['care', 'health'], 0.9, 0.24, ['social']),
  },

  // 20. Take a child to school --------------------------------------------
  {
    id: 'r13-fam.take-child-to-school',
    title: '书包带系紧一点',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [24, 56],
    tags: ['task', 'family', 'school', 'child', 'enrolment'],
    contexts: URBAN,
    milieus: SCHOOL,
    conditions: [{ kind: 'householdSize', min: 2 }],
    roles: {
      child: ['neighbor', { minAge: 6, maxAge: 12, sameHousehold: true }],
      teacher: ['teacher', { minAge: 22, maxAge: 72 }],
    },
    outcomes: [
      {
        id: 'child-enrolled',
        w: 0.45,
        text: '{subject}蹲在门口把{child}的书包带系紧，又把一块面包塞进侧袋。学校里挤了七十多个孩子，{teacher}按名字点名，点到{child}时抬头看了一眼。{subject}在走廊外等到铃响，听见里面开始念字母，才把攥皱的报名纸收进口袋。',
        significance: 0.78,
        fx: [
          {
            cash: -2,
            relation: ['child', 'guardian', 0.1, 0.08],
            role: 'school_parent',
            flag: 'child_enrolled',
          },
          {
            raw: [
              {
                type: 'education',
                personId: '$child',
                status: 'primary',
                level: 1,
                reason: 'enrolled at the district primary school',
              },
              {
                type: 'relation',
                a: '$subject',
                b: '$teacher',
                kind: 'acquaintance',
                trust: 0.06,
                reason: 'met the teacher at enrolment',
              },
            ],
          },
        ],
      },
      {
        id: 'school-refused',
        w: 0.3,
        text: '{teacher}翻到报名纸背面，说还缺一张出生证明和一双完整的鞋。{subject}低头看{child}脚上那双露脚趾的鞋，说下周补上；{teacher}把纸推回来，说名额只留到星期五。回家的路上，{child}一直问学校是什么样子。',
        significance: 0.7,
        fx: [
          {
            cash: -1,
            mood: -0.1,
            relation: ['teacher', 'rival', -0.08, 0],
            flag: 'school_enrolment_refused',
          },
          {
            raw: [
              {
                type: 'relation',
                a: '$subject',
                b: '$child',
                kind: 'guardian',
                trust: 0.04,
                affection: 0.04,
                reason: 'failed to enrol the child on the first attempt',
              },
              {
                type: 'condition',
                personId: '$child',
                condition: 'child_out_of_school',
                add: true,
                reason: 'the child was not enrolled',
              },
            ],
          },
        ],
      },
      {
        id: 'child-runs-home',
        w: 0.25,
        text: '把孩子送进教室不到一个钟头，{child}就从后门跑了出来，鞋掉了一只。{subject}在操场边追上，孩子说老师讲的字像蚂蚁，坐不住。{subject}没有骂，只把孩子背回家，一路上听见教室里传出整齐的读书声。',
        significance: 0.68,
        when: { maxCash: 3 },
        fx: [
          {
            mood: -0.08,
            relation: ['child', 'guardian', -0.06, 0.02],
            flag: 'child_ran_from_school',
          },
          {
            raw: [
              {
                type: 'condition',
                personId: '$child',
                condition: 'school_refusal',
                add: true,
                reason: 'the child ran home from school',
              },
            ],
          },
        ],
      },
    ],
    task: taskMeta('family', ['family', 'knowledge'], ['care', 'belonging'], 0.76, 0.12, [
      'social',
      'literacy',
    ]),
  },

  // 21. Help with homework ------------------------------------------------
  {
    id: 'r13-fam.help-homework',
    title: '算术本上的煤油印',
    domain: 'family',
    kind: 'task',
    stage: 'adolescence',
    ages: [12, 20],
    tags: ['task', 'family', 'school', 'homework', 'sibling', 'literacy'],
    contexts: URBAN,
    milieus: SCHOOL,
    conditions: [{ kind: 'householdSize', min: 2 }],
    roles: {
      younger: ['sibling', { minAge: 6, maxAge: 12 }],
    },
    outcomes: [
      {
        id: 'sums-finished',
        w: 0.45,
        text: '{subject}把煤油灯往桌子中间挪，让{younger}看清算术本上的格子。孩子把七加八数了三遍，{subject}没有直接说答案，只把豆子一颗颗排在桌上。最后一页写完时，灯芯已经烧黑，{subject}才发现自己的作业还空着半页。',
        significance: 0.7,
        fx: [
          {
            relation: ['younger', 'kin', 0.14, 0.08],
            role: 'home_tutor',
            flag: 'helped_sibling_with_homework',
            skill: { literacy: 0.02 },
          },
          {
            raw: [
              {
                type: 'skill',
                personId: '$younger',
                skill: 'numeracy',
                amount: 0.05,
                reason: 'learned sums at the kitchen table',
              },
            ],
          },
        ],
      },
      {
        id: 'tears-on-the-page',
        w: 0.3,
        text: '{younger}把铅笔芯写断了两次，第三遍还是算错，眼泪滴在本子上，把墨迹洇开。{subject}把本子拿开，说再写一遍，孩子却把椅子往后一推。母亲在灶边喊别吵，{subject}只好把豆子收进碗里，听见{younger}在床上抽鼻子。',
        significance: 0.58,
        fx: [
          {
            mood: -0.06,
            relation: ['younger', 'kin', -0.05, 0.02],
            flag: 'homework_ended_in_tears',
          },
          {
            raw: [
              {
                type: 'condition',
                personId: '$younger',
                condition: 'homework_struggle',
                add: true,
                reason: 'the homework session ended in tears',
              },
            ],
          },
        ],
      },
      {
        id: 'wrong-sum',
        w: 0.25,
        text: '{subject}自己把一道题算错，{younger}照着抄了。第二天，孩子把本子带回来，老师的红笔在页边画了一个大叉。{younger}没有怪{subject}，只问以后还能不能一起写；{subject}把错题重新算了一遍，算到一半，发现自己也不会。',
        significance: 0.64,
        when: { skill: { name: 'literacy', min: 0.4 } },
        fx: [
          {
            relation: ['younger', 'kin', 0.04, 0.02],
            flag: 'taught_sibling_a_wrong_sum',
            skill: { numeracy: 0.02 },
          },
          {
            raw: [
              {
                type: 'condition',
                personId: '$younger',
                condition: 'homework_error',
                add: true,
                reason: 'copied a wrong sum from the subject',
              },
            ],
          },
        ],
      },
    ],
    task: taskMeta('family', ['family', 'knowledge'], ['care', 'belonging'], 0.7, 0.1, [
      'literacy',
      'numeracy',
    ]),
  },

  // 22. Mediate a sibling conflict ----------------------------------------
  {
    id: 'r13-fam.mediate-sibling-conflict',
    title: '院子里那只被扔掉的帽子',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 66],
    tags: ['task', 'family', 'sibling', 'conflict', 'mediation'],
    contexts: URBAN,
    milieus: HOME,
    roles: {
      sibling_one: ['sibling', { minAge: 14, maxAge: 70 }],
      sibling_two: ['sibling', { minAge: 14, maxAge: 70 }],
    },
    outcomes: [
      {
        id: 'truce',
        w: 0.4,
        text: '{sibling_one}把{sibling_two}的帽子扔进院子，{sibling_two}又把晾衣杆撂倒。{subject}站在两人中间，先把帽子捡起来拍干净，再让两人各说一遍是谁先动的手。说到第三遍，两人都不那么肯定了；{subject}把帽子放在桌上，说谁再扔就赔谁的工钱。',
        significance: 0.74,
        fx: {
          relation: ['sibling_one', 'kin', 0.1, 0.04],
          relation2: ['sibling_two', 'kin', 0.1, 0.04],
          role: 'family_mediator',
          flag: 'mediated_sibling_fight',
          skill: { social: 0.03 },
        },
      },
      {
        id: 'fight-escalates',
        w: 0.35,
        text: '{subject}刚把两人分开，{sibling_one}就绕过{subjectPronoun}踹了{sibling_two}一脚。椅子翻倒，母亲的药瓶摔碎在地上；{subject}的手背被指甲划开一道口子。邻居敲门时，三个人都站着喘气，谁也不肯先说是谁先动的手。',
        significance: 0.78,
        fx: {
          health: -0.04,
          cash: -2,
          relation: ['sibling_one', 'rival', -0.16, 0],
          relation2: ['sibling_two', 'rival', -0.16, 0],
          condition: 'family_feud',
          flag: 'sibling_fight_escalated',
        },
      },
      {
        id: 'siblings-avoid-each-other',
        w: 0.25,
        text: '{subject}劝到天黑，两人终于不再动手，却也不肯同桌吃饭。{sibling_one}把铺盖搬到厨房，{sibling_two}把碗筷收进自己的柜子。{subject}在两人中间摆了一碟咸菜，第二天早上，咸菜还在原处，只少了一双筷子。',
        significance: 0.68,
        when: { maxCash: 3 },
        fx: {
          cash: -3,
          relation: ['sibling_one', 'kin', -0.06, 0],
          relation2: ['sibling_two', 'kin', -0.06, 0],
          condition: 'siblings_estranged',
          flag: 'siblings_split_household',
        },
      },
    ],
    variants: [
      {
        id: 'sibling-postwar',
        when: { contextTags: ['postwar'] },
        title: '战利品和一张欠条',
        outcomes: [
          {
            id: 'divided-belongings',
            w: 0.55,
            text: '{sibling_one}从战场带回来一只怀表和一把折刀，{sibling_two}说当年家里供人念书的钱还没有还。两人把东西摊在桌上，{subject}把怀表推到中间，说先算清母亲的药钱，再谈战利品。算到最后，折刀归了{subject}，谁也没有再争。',
            significance: 0.76,
            fx: {
              cash: -2,
              relation: ['sibling_one', 'kin', 0.06, 0],
              relation2: ['sibling_two', 'kin', 0.06, 0],
              role: 'family_mediator',
              flag: 'divided_postwar_souvenirs',
              knowledge: ['the siblings still dispute the cost of their mother’s medicine', 0.8],
            },
          },
          {
            id: 'soldier-brother-leaves',
            w: 0.45,
            text: '{sibling_one}说在这个家里住不下去，卷起军毯就要走。{sibling_two}没有拦，只把门打开。{subject}追到楼梯口，把母亲留下的那只汤勺塞进{sibling_one}的背包，说走到哪儿都要吃饭。',
            significance: 0.74,
            fx: {
              relation: ['sibling_one', 'kin', 0.04, 0.02],
              relation2: ['sibling_two', 'kin', -0.08, 0],
              condition: 'sibling_departure',
              flag: 'soldier_sibling_left_home',
            },
          },
        ],
      },
    ],
    task: taskMeta('family', ['family', 'belonging'], ['belonging', 'status'], 0.72, 0.24, [
      'social',
    ]),
  },

  // 23. Reconcile with a parent -------------------------------------------
  {
    id: 'r13-fam.reconcile-parent',
    title: '窗边那把旧刨子',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 68],
    tags: ['task', 'family', 'parent', 'reconciliation', 'estrangement'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [{ kind: 'notHasRole', role: 'reconciled_child' }],
    roles: {
      parent: ['parent', { minAge: 42, maxAge: 86 }],
    },
    outcomes: [
      {
        id: 'reconciled',
        w: 0.4,
        text: '{subject}把带来的面包放在窗台上，{parent}正在削一块木头，刨花落在鞋面上。两人先说了几句天气，{subject}才提起那年摔门的事。{parent}没有抬头，只把刨子递过来，让{subject}替{subjectPronoun}磨一磨；磨刀石响起来时，谁也没有再提旧账。',
        significance: 0.8,
        fx: {
          relation: ['parent', 'kin', 0.2, 0.1],
          role: 'reconciled_child',
          flag: 'reconciled_with_parent',
          knowledge: ['the parent kept the old plane sharpened', 0.8, 'parent'],
        },
      },
      {
        id: 'rebuffed',
        w: 0.35,
        text: '{parent}让{subject}把面包提回去，说这些年没有{subject}也过来了。{subject}站在门口，看见墙上还挂着自己小时候的照片，玻璃裂了一道。{parent}顺着{subjectPronoun}的目光看过去，却没有把照片摘下来。',
        significance: 0.66,
        fx: {
          mood: -0.16,
          relation: ['parent', 'rival', -0.18, 0],
          condition: 'estrangement',
          flag: 'parent_refused_reconciliation',
        },
      },
      {
        id: 'silent-truce',
        w: 0.25,
        text: '{subject}没有提旧事，只坐下来替{parent}把药片分进七个小纸包。{parent}起初不说话，后来问了一句厂里还缺不缺人。{subject}说缺，{parent}便把自己的旧工具袋推到桌下，说拿去用，别弄丢。',
        significance: 0.7,
        when: { minAge: 40 },
        fx: {
          relation: ['parent', 'kin', 0.1, 0.04],
          condition: 'unspoken_truce',
          flag: 'reconciled_without_words',
          knowledge: ['the parent still keeps a spare tool bag', 0.75, 'parent'],
        },
      },
    ],
    variants: [
      {
        id: 'parent-postwar',
        when: { contextTags: ['postwar'] },
        title: '从战俘营回来的那个人',
        outcomes: [
          {
            id: 'returned-father',
            w: 0.55,
            text: '{parent}从战俘营回来时，头发白了一半，右耳听不见。{subject}去车站接人，两人隔着人群站了很久。回家后，{parent}把一只从西伯利亚带回来的木勺放在桌上，说不知道{subject}还认不认这个家；{subject}把勺子收进抽屉，又拿出来摆好。',
            significance: 0.84,
            fx: {
              cash: -2,
              relation: ['parent', 'kin', 0.24, 0.08],
              condition: 'returned_prisoner_of_war',
              role: 'reconciled_child',
              flag: 'welcomed_returned_prisoner',
              knowledge: ['the parent spent years in a Siberian camp', 0.9, 'parent'],
            },
          },
          {
            id: 'father-changed',
            w: 0.45,
            text: '{parent}回来后不愿提营地的事，夜里常把窗子打开，说屋里太闷。{subject}去送饭，{parent}只问外面的粮价，不问{subject}这些年怎么过。两人坐在桌边，一顿饭吃完，谁也没有提到“原谅”两个字。',
            significance: 0.74,
            fx: {
              relation: ['parent', 'kin', 0.08, 0],
              condition: 'wartime_silence',
              flag: 'returned_parent_remote',
              knowledge: ['the parent sleeps with the window open', 0.7, 'parent'],
            },
          },
        ],
      },
    ],
    task: taskMeta('family', ['family', 'belonging'], ['belonging'], 0.74, 0.2, ['social']),
  },

  // 24. Ask a relative for money ------------------------------------------
  {
    id: 'r13-fam.ask-relative-money',
    title: '信里只写了一个数目',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 66],
    tags: ['task', 'family', 'debt', 'money', 'relative', 'request'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [{ kind: 'cash', max: 12 }],
    roles: {
      sibling: ['sibling', { minAge: 20, maxAge: 72 }],
    },
    outcomes: [
      {
        id: 'loan-given',
        w: 0.4,
        text: '{subject}把信写了三遍，最后只留下房租的数目和一句“开春还”。{sibling}第三天就来了，从内袋摸出几张票子，没有数，只说别让嫂子知道。{subject}要写借条，{sibling}把纸推开，说记得就行；两人在门口站了一会儿，谁也没有提小时候的事。',
        significance: 0.74,
        fx: {
          cash: 8,
          relation: ['sibling', 'kin', 0.12, 0.04],
          role: 'family_debtor',
          flag: 'borrowed_from_sibling',
          knowledge: ['the sibling lent money without telling his wife', 0.8, 'sibling'],
        },
      },
      {
        id: 'loan-refused',
        w: 0.3,
        text: '{sibling}回信说自家也紧，孩子要交学费，实在腾不出。{subject}把信折好，放进炉子，火苗舔到“见谅”两个字时，{subjectPronoun}才把信夹出来。第二天，{subject}去当铺问那只旧表能当多少。',
        significance: 0.6,
        fx: {
          mood: -0.12,
          relation: ['sibling', 'kin', -0.05, 0],
          flag: 'relative_refused_loan',
        },
      },
      {
        id: 'loan-with-strings',
        w: 0.3,
        text: '{sibling}把钱带来，却要{subject}在借条上写明：明年开春若还不上，就替{sibling}家的孩子交学费。{subject}盯着那行字看了很久，还是按了手印。{sibling}收起借条，说亲戚也要有凭据；{subject}把钱揣进怀里，觉得比借来的还沉。',
        significance: 0.76,
        when: { maxCash: 2 },
        fx: {
          cash: 10,
          relation: ['sibling', 'kin', 0.06, 0],
          condition: 'family_obligation',
          role: 'family_debtor',
          flag: 'accepted_conditional_family_loan',
          knowledge: ['the loan is secured by a promise to pay school fees', 0.9, 'sibling'],
        },
      },
    ],
    task: taskMeta('family', ['survival', 'family'], ['cash', 'belonging'], 0.78, 0.18, [
      'social',
      'numeracy',
    ]),
  },

  // 25. Repay a family debt -----------------------------------------------
  {
    id: 'r13-fam.repay-family-debt',
    title: '一克朗一克朗地数',
    domain: 'commerce',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 72],
    tags: ['task', 'commerce', 'debt', 'family', 'repayment', 'honour'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [
      { kind: 'cash', min: 3 },
      { kind: 'notHasRole', role: 'debt_free' },
    ],
    roles: {
      creditor: ['neighbor', { minAge: 35, maxAge: 82 }],
    },
    outcomes: [
      {
        id: 'debt-cleared',
        w: 0.4,
        text: '{subject}把攒了半年的票子一张张抹平，当着{creditor}的面数清。{creditor}数到一半，把最后几张推回来，说利息就算了。{subject}没有收，把钱重新推过去，说当初借的时候说好多少就是多少；{creditor}这才收下，把借条撕成两半。',
        significance: 0.78,
        fx: {
          cash: -12,
          relation: ['creditor', 'acquaintance', 0.16, 0],
          role: 'debt_free',
          flag: 'repaid_family_debt',
          knowledge: ['the old debt is finally cleared', 0.9, 'creditor'],
        },
      },
      {
        id: 'partial-payment',
        w: 0.35,
        text: '{subject}只凑够一半，把钱包在布里递过去，说剩下的年底还。{creditor}把布包掂了掂，没有打开，只在借条背面写了一个新的日期。{subject}出门时，听见{creditor}在屋里咳嗽，想起来这笔钱原本是给{creditor}家里办丧事用的。',
        significance: 0.68,
        fx: {
          cash: -5,
          relation: ['creditor', 'acquaintance', 0.06, 0],
          condition: 'family_debt',
          flag: 'made_partial_family_repayment',
        },
      },
      {
        id: 'collateral-demanded',
        w: 0.25,
        text: '{creditor}说钱可以缓，但要{subject}把母亲的缝纫机先搬过来押着。{subject}站在缝纫机旁，手按在冰凉的铁架上，最后还是摇了头。{creditor}把借条收回抽屉，说那就按规矩算利息；两人之间的账，从这一天起多了一层。',
        significance: 0.7,
        when: { employment: true },
        fx: {
          cash: -2,
          relation: ['creditor', 'rival', -0.12, 0],
          condition: 'family_debt',
          flag: 'refused_to_pledge_sewing_machine',
          knowledge: ['the creditor wanted the sewing machine as security', 0.85, 'creditor'],
        },
      },
    ],
    task: taskMeta('commerce', ['family', 'status'], ['cash', 'belonging'], 0.72, 0.18, [
      'numeracy',
      'social',
    ]),
  },

  // 26. Foster a child ----------------------------------------------------
  {
    id: 'r13-fam.foster-child',
    title: '门口多出来的一双小鞋',
    domain: 'care',
    kind: 'task',
    stage: 'adulthood',
    ages: [25, 66],
    tags: ['task', 'care', 'foster', 'child', 'household', 'orphan'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [{ kind: 'overcrowded', value: false }],
    roles: {
      child: ['neighbor', { minAge: 4, maxAge: 12 }],
      keeper: ['neighbor', { minAge: 30, maxAge: 74 }],
    },
    outcomes: [
      {
        id: 'child-taken-in',
        w: 0.45,
        text: '{keeper}把{child}领到门口，说孩子的母亲去了外地做工，几个月没寄钱回来。{subject}看见孩子脚上那双鞋小了一指，脚趾顶得发白，便让他们进屋。当晚，{subject}把自家孩子的旧鞋找出来，又往锅里多加了一勺面糊；{child}坐在灶边，一直没有开口。',
        significance: 0.84,
        fx: [
          {
            cash: -3,
            relation: ['child', 'guardian', 0.08, 0.06],
            relation2: ['keeper', 'acquaintance', 0.08, 0],
            role: 'foster_parent',
            flag: 'fostered_a_child',
            knowledge: ['the child’s mother left with an evacuation train', 0.8, 'keeper'],
          },
          {
            raw: [
              {
                type: 'household',
                personId: '$child',
                householdId: '$household',
                reason: 'taken in as a foster child',
              },
            ],
          },
        ],
      },
      {
        id: 'foster-refused',
        w: 0.3,
        text: '{subject}看了看自家两张床和已经见底的粮袋，说实在添不了一口人。{keeper}没有劝，只把{child}的手拉紧，转身下楼。{subject}站在门口，听见那双小鞋在楼梯上一下一下地响，响到二楼才停。',
        significance: 0.62,
        fx: {
          mood: -0.14,
          relation: ['keeper', 'acquaintance', -0.06, 0],
          flag: 'refused_to_foster',
        },
      },
      {
        id: 'child-runs-away',
        w: 0.25,
        text: '{child}在{subject}家住了两个星期，第三夜把枕头下的半块面包揣走，从后门跑了。{subject}追到车站，只看见一个穿短裤的影子钻进车厢底下。{keeper}赶来时，手里还攥着孩子落下的那只小鞋；两人在站台上站到列车开走。',
        significance: 0.74,
        when: { maxCash: 3 },
        fx: [
          {
            cash: -1,
            relation: ['child', 'acquaintance', -0.08, 0],
            condition: 'foster_breakdown',
            flag: 'foster_child_ran_away',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'foster-postwar',
        when: { contextTags: ['postwar'] },
        title: '孤儿院门口的队伍',
        outcomes: [
          {
            id: 'foster-from-orphanage',
            w: 0.6,
            text: '孤儿院门口排着领孩子的队伍，{keeper}把{child}推到{subject}面前，说这孩子夜里不哭，只是不肯吃饭。{subject}蹲下来，把带来的半块糖放在孩子手心；孩子没有吃，先把糖纸抹平，夹进衣袋。那天下午，{subject}在登记簿上按了手印。',
            significance: 0.86,
            fx: [
              {
                cash: -4,
                relation: ['child', 'guardian', 0.1, 0.08],
                relation2: ['keeper', 'acquaintance', 0.1, 0],
                role: 'foster_parent',
                flag: 'fostered_postwar_orphan',
                knowledge: ['the child hoards smooth paper and sugar wrappers', 0.75, 'keeper'],
              },
              {
                raw: [
                  {
                    type: 'household',
                    personId: '$child',
                    householdId: '$household',
                    reason: 'taken in from the postwar orphanage',
                  },
                ],
              },
            ],
          },
          {
            id: 'orphanage-full',
            w: 0.4,
            text: '孤儿院的院长说孩子太多，床不够，让{subject}再等一个月。{keeper}把{child}领回临时收容所，{subject}每周去看一次。孩子渐渐肯说话了，却总是在{subject}起身时抓住衣角，问下一次什么时候来。',
            significance: 0.72,
            fx: [
              {
                cash: -2,
                relation: ['child', 'acquaintance', 0.12, 0.04],
                relation2: ['keeper', 'acquaintance', 0.06, 0],
                condition: 'foster_pending',
                flag: 'waited_for_foster_placement',
              },
            ],
          },
        ],
      },
    ],
    task: taskMeta('care', ['care', 'family'], ['care', 'belonging'], 0.86, 0.2, ['social']),
  },

  // 27. Adopt a child -----------------------------------------------------
  {
    id: 'r13-fam.adopt-child',
    title: '登记簿上的新姓氏',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [28, 62],
    tags: ['task', 'family', 'adoption', 'child', 'law', 'household'],
    contexts: URBAN,
    milieus: GOV,
    conditions: [
      { kind: 'overcrowded', value: false },
      { kind: 'cash', min: 5 },
    ],
    roles: {
      child: ['neighbor', { minAge: 3, maxAge: 12 }],
      clerk: ['official', { minAge: 25, maxAge: 72 }],
    },
    outcomes: [
      {
        id: 'adoption-granted',
        w: 0.45,
        text: '{clerk}把表格翻到最后一页，让{subject}和{child}都在上面按手印。孩子的手指太小，按了两次才清楚；{clerk}在姓氏栏里写下{subject}的姓，又盖了一个蓝章。走出办事处时，{child}问以后是不是要改口，{subject}说想叫什么就叫什么。',
        significance: 0.88,
        fx: [
          {
            cash: -8,
            relation: ['child', 'guardian', 0.16, 0.12],
            role: 'adoptive_parent',
            flag: 'adoption_granted',
            knowledge: [
              'the court granted the adoption and changed the child’s surname',
              0.95,
              'clerk',
            ],
          },
          {
            raw: [
              {
                type: 'household',
                personId: '$child',
                householdId: '$household',
                reason: 'moved in as an adopted child',
              },
            ],
          },
        ],
      },
      {
        id: 'adoption-refused',
        w: 0.3,
        text: '{clerk}说还缺孩子生父的死亡证明，或者一份放弃抚养权的声明。{subject}跑了三趟教堂和医院，拿回来的纸都被退回来，说印章不对。{child}在走廊里睡着了，{subject}把外套盖在孩子身上，自己蹲在墙边等到下班。',
        significance: 0.74,
        fx: {
          cash: -6,
          mood: -0.1,
          relation: ['clerk', 'rival', -0.08, 0],
          condition: 'adoption_pending',
          flag: 'adoption_blocked_by_papers',
          knowledge: [
            'the adoption needs a death certificate or a relinquishment declaration',
            0.9,
            'clerk',
          ],
        },
      },
      {
        id: 'adoption-contested',
        w: 0.25,
        text: '手续办到一半，孩子的亲戚赶来，说自家人还在，轮不到外人领走。{clerk}把已经填好的表格扣在桌上；{child}躲到{subject}身后，手指抓着外套下摆。那人在走廊里骂了很久，最后被门房请了出去。',
        significance: 0.8,
        when: { minCash: 10 },
        fx: {
          cash: -4,
          relation: ['child', 'guardian', 0.12, 0.08],
          condition: 'adoption_dispute',
          flag: 'adoption_contested_by_kin',
          knowledge: ['the child’s aunt claims guardianship', 0.9],
        },
      },
    ],
    variants: [
      {
        id: 'adoption-reform',
        when: { contextTags: ['reform'] },
        title: '新法允了，办事处还没印表',
        outcomes: [
          {
            id: 'new-law-applied',
            w: 0.6,
            text: '新颁布的未成年人保护法允许养父母登记，但办事处的表格还是旧版，没有“养”这一栏。{clerk}翻出一叠空白纸，让{subject}把情况写在背面，又请科长来签字。{child}在长椅上数墙上的挂钟，数到第三遍时，{clerk}终于把章盖了下来。',
            significance: 0.86,
            fx: [
              {
                cash: -6,
                relation: ['child', 'guardian', 0.16, 0.1],
                relation2: ['clerk', 'acquaintance', 0.08, 0],
                role: 'adoptive_parent',
                flag: 'adoption_under_reform_law',
                knowledge: [
                  'the reform law allows adoption but offices still use old forms',
                  0.9,
                  'clerk',
                ],
              },
              {
                raw: [
                  {
                    type: 'household',
                    personId: '$child',
                    householdId: '$household',
                    reason: 'adopted under the new guardianship law',
                  },
                ],
              },
            ],
          },
          {
            id: 'old-forms-block',
            w: 0.4,
            text: '科长说新法还要等实施细则，旧表格上没有养父母一栏，盖了章也无效。{subject}把写满情况的纸折好，带回家里压在抽屉底下。{child}问是不是不能改姓了；{subject}说再等等，心里却不知道要等多久。',
            significance: 0.74,
            fx: [
              {
                mood: -0.12,
                relation: ['child', 'acquaintance', 0.06, 0.04],
                condition: 'adoption_pending',
                flag: 'adoption_delayed_by_forms',
                knowledge: ['the reform law lacks implementing rules', 0.85],
              },
            ],
          },
        ],
      },
    ],
    task: taskMeta('family', ['family', 'care'], ['care', 'belonging'], 0.86, 0.24, [
      'social',
      'literacy',
    ]),
  },

  // 28. Arrange childcare -------------------------------------------------
  {
    id: 'r13-fam.arrange-childcare',
    title: '上工前把小的送下楼',
    domain: 'care',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 50],
    tags: ['task', 'care', 'childcare', 'work', 'neighbor', 'wages'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [{ kind: 'householdSize', min: 2 }],
    roles: {
      child: ['neighbor', { minAge: 1, maxAge: 10, sameHousehold: true }],
      minder: ['neighbor', { minAge: 30, maxAge: 72 }],
    },
    outcomes: [
      {
        id: 'childcare-arranged',
        w: 0.45,
        text: '{subject}天没亮就把{child}裹好，抱到楼下{minder}家。{minder}接过孩子，先摸了摸尿布，又指给{subject}看灶上温着的米汤。{subject}把一星期的工钱数出一份放在柜上，{minder}数也没数就收进围裙；出门时，{subject}听见孩子在屋里哭了一声，又停了。',
        significance: 0.74,
        fx: {
          cash: -2,
          relation: ['minder', 'acquaintance', 0.12, 0.02],
          relation2: ['child', 'guardian', 0.04, 0.04],
          condition: 'childcare_arranged',
          flag: 'arranged_daily_childcare',
          knowledge: ['the minder keeps a pot of rice water on the stove', 0.8, 'minder'],
        },
      },
      {
        id: 'minder-cancels',
        w: 0.3,
        text: '{minder}说自家孙子也病了，这星期看不了。{subject}抱着{child}站在楼道里，听见厂里的汽笛响过第一遍。那天{subject}没有去上工，第二天门口的通知上多了一个红叉；{minder}端来一碗粥，说下星期一定帮忙。',
        significance: 0.7,
        fx: {
          cash: -1,
          mood: -0.12,
          relation: ['minder', 'acquaintance', -0.04, 0],
          condition: 'childcare_collapsed',
          flag: 'missed_work_for_childcare',
          knowledge: ['a missed shift is marked with a red cross', 0.8],
        },
      },
      {
        id: 'take-child-to-work',
        w: 0.25,
        text: '{subject}找不到人看孩子，只好把{child}裹在围裙里带进车间。孩子在布堆上睡着了，机器的震动把孩子一次次颠醒；工头走过来说下不为例。{subject}一只手按着摇篮，一只手接线头，到下班时，手指被线勒出几道深痕。',
        significance: 0.72,
        when: { maxCash: 2 },
        fx: {
          cash: -1,
          health: -0.03,
          relation: ['child', 'guardian', 0.06, 0.02],
          condition: 'child_at_workplace',
          flag: 'took_child_into_the_workshop',
        },
      },
    ],
    variants: [
      {
        id: 'childcare-war',
        when: { contextTags: ['war'] },
        title: '厂办托儿所的名额',
        outcomes: [
          {
            id: 'factory-creche',
            w: 0.55,
            text: '军工厂新设了托儿所，只收上夜班的女工的孩子。{subject}抱着{child}排了一早晨，登记的人问孩子有没有出过麻疹，又让{subject}把工牌摘下来看。名额批下来时，{subject}发现自己排在名单最后一个，前面还有二十多个名字被划掉。',
            significance: 0.78,
            fx: [
              {
                cash: -2,
                relation: ['child', 'guardian', 0.06, 0.04],
                condition: 'factory_creche_place',
                role: 'munition_worker_mother',
                flag: 'got_factory_creche_place',
                knowledge: ['the factory creche takes only night-shift mothers', 0.85],
              },
            ],
          },
          {
            id: 'creche-full',
            w: 0.45,
            text: '托儿所的名额满了，管事的让{subject}把孩子送到城另一头的教会收容所。{subject}算了一趟车钱和路上的时辰，知道赶不上早班。{minder}在门口听见，说可以替{subject}看半天，另一半时间让邻居轮着来；{subject}把孩子的名字写在纸条上，贴在自己工牌背面。',
            significance: 0.72,
            fx: [
              {
                cash: -1,
                relation: ['minder', 'friend', 0.1, 0.02],
                condition: 'childcare_shared',
                flag: 'shared_childcare_with_neighbours',
                knowledge: ['the neighbours will take turns watching the child', 0.8, 'minder'],
              },
            ],
          },
        ],
      },
    ],
    task: taskMeta('care', ['care', 'work'], ['care', 'cash'], 0.8, 0.18, ['social']),
  },

  // 29. Look for a lost relative ------------------------------------------
  {
    id: 'r13-fam.look-for-lost-relative',
    title: '念错的名字',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 76],
    tags: ['task', 'family', 'missing', 'official', 'war', 'search'],
    contexts: ['war', 'postwar'],
    milieus: GOV,
    roles: {
      aunt: ['neighbor', { minAge: 40, maxAge: 82, sex: 'female' }],
      clerk: ['official', { minAge: 25, maxAge: 72 }],
    },
    outcomes: [
      {
        id: 'name-on-list',
        w: 0.4,
        text: '{subject}替{aunt}把名字、出生年和最后住址写在纸上，递进窗口。{clerk}翻了三本名册，手指停在一行被水洇开的字上，说这个人登记在临时收容所。{aunt}听见时，手里的伞掉在地上；{subject}替她把伞捡起来，才发现自己的手也在抖。',
        significance: 0.8,
        fx: {
          cash: -2,
          relation: ['aunt', 'kin', 0.18, 0.08],
          role: 'family_searcher',
          flag: 'found_missing_relative_on_list',
          knowledge: ['the missing relative was registered at a transit shelter', 0.9, 'clerk'],
        },
      },
      {
        id: 'no-record',
        w: 0.35,
        text: '{clerk}把三本名册都翻完，说没有这个人，也许登记时用了别的写法。{aunt}不肯走，又把名字念了一遍，念到第三遍时声音低下去。{subject}扶她到走廊的长椅上坐下，替她把围巾重新系好；窗口后面已经叫了下一个号。',
        significance: 0.72,
        fx: {
          cash: -1,
          mood: -0.18,
          relation: ['aunt', 'kin', 0.1, 0.04],
          condition: 'grief',
          flag: 'missing_relative_no_record',
          knowledge: ['there is no record under the name the aunt remembers', 0.8, 'clerk'],
        },
      },
      {
        id: 'wrong-person',
        w: 0.25,
        text: '{clerk}说名单上有一个同姓的人，住在城北的收容站。{aunt}连夜赶去，见到的却是一个比她儿子年轻的裁缝。{subject}陪她走回来，路上{aunt}一直说名字没有错，是年份错了；{subject}没有纠正，只把她的胳膊挽得更紧。',
        significance: 0.68,
        when: { maxCash: 2 },
        fx: {
          cash: -1,
          mood: -0.1,
          relation: ['aunt', 'kin', 0.06, 0.02],
          condition: 'grief',
          flag: 'followed_a_false_lead',
          knowledge: ['the name on the list belongs to another family', 0.85, 'clerk'],
        },
      },
    ],
    task: taskMeta('family', ['family', 'care'], ['belonging', 'care'], 0.8, 0.18, [
      'social',
      'literacy',
    ]),
  },

  // 30. Write to a missing relative ---------------------------------------
  {
    id: 'r13-fam.write-missing-relative',
    title: '没有地址的信',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [16, 78],
    tags: ['task', 'family', 'letter', 'missing', 'war', 'literacy'],
    contexts: ['war', 'postwar'],
    milieus: GOV,
    roles: {
      aunt: ['neighbor', { minAge: 40, maxAge: 82, sex: 'female' }],
    },
    outcomes: [
      {
        id: 'letter-sent',
        w: 0.45,
        text: '{subject}替{aunt}写信，把最后知道的部队番号、收容站和一处旧住址都写上去。{aunt}不识字，却要{subject}把“家里都好”念三遍，怕写错。信投进邮筒时，她伸手在筒口摸了一下；{subject}把回信地址又描粗了一笔。',
        significance: 0.72,
        fx: [
          {
            cash: -1,
            relation: ['aunt', 'kin', 0.12, 0.04],
            flag: 'wrote_to_missing_relative',
            skill: { literacy: 0.02 },
          },
          {
            raw: [
              {
                type: 'knowledge',
                holderId: '$aunt',
                proposition: 'A letter with the last known unit and shelter addresses was posted.',
                confidence: 0.8,
                sourceKind: 'document',
                personId: '$subject',
                visibility: 'private',
                trueInWorld: true,
              },
            ],
          },
        ],
      },
      {
        id: 'letter-returned',
        w: 0.3,
        text: '信过了三个星期被退回来，信封上盖着“查无此人”，边角已经磨毛。{aunt}不认得那四个字，让{subject}念；{subject}念成“还在路上”，把信折好放进抽屉。{aunt}点点头，第二天又问有没有回信。',
        significance: 0.7,
        fx: [
          {
            cash: -1,
            mood: -0.12,
            relation: ['aunt', 'kin', 0.08, 0.02],
            condition: 'grief',
            flag: 'letter_returned_undeliverable',
          },
        ],
      },
      {
        id: 'letter-censored',
        w: 0.25,
        text: '信在邮局被拆开过，回来时少了一页，封口贴着审查条的残胶。{subject}没有告诉{aunt}，只把少掉的那页重新写了一遍，删去部队番号，改成“在那边”。寄第二封时，{subject}多贴了一张邮票，像是这样就能让信走得快些。',
        significance: 0.74,
        when: { skill: { name: 'literacy', min: 0.4 } },
        fx: [
          {
            cash: -2,
            relation: ['aunt', 'kin', 0.1, 0.02],
            condition: 'letter_censored',
            flag: 'letter_opened_by_censor',
            knowledge: ['the postal censor removes unit numbers', 0.85],
          },
        ],
      },
    ],
    task: taskMeta('family', ['family', 'care'], ['belonging', 'care'], 0.72, 0.12, [
      'literacy',
      'social',
    ]),
  },

  // 31. Visit a grave ------------------------------------------------------
  {
    id: 'r13-fam.visit-grave',
    title: '公墓新翻的土',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 80],
    tags: ['task', 'family', 'grave', 'mourning', 'neighbor', 'grief'],
    contexts: URBAN,
    milieus: HOME,
    roles: {
      neighbor: ['neighbor', { minAge: 35, maxAge: 82, sex: 'female' }],
    },
    outcomes: [
      {
        id: 'flowers-placed',
        w: 0.45,
        text: '{subject}陪{neighbor}去公墓，把一把野菊放在新翻的土上。木牌上的名字被雨冲得发白，{neighbor}用手指一笔一画描了一遍，描到最后一笔，指腹上全是泥。{subject}没有劝，只蹲下来把歪掉的木牌扶正。',
        significance: 0.7,
        fx: {
          cash: -1,
          relation: ['neighbor', 'friend', 0.14, 0.06],
          condition: 'mourning',
          role: 'grave_visitor',
          flag: 'visited_a_grave_with_neighbour',
        },
      },
      {
        id: 'wrong-grave',
        w: 0.3,
        text: '两人在坟场里绕了半个钟头，才找到那块刻着名字的石头。{neighbor}忽然说不是这一块，自己记得旁边有一棵小槐树。{subject}陪她一排排找，天快黑时，守墓人过来说小槐树去年就砍了；{neighbor}站在空地上，把花放在了脚边。',
        significance: 0.64,
        fx: {
          mood: -0.1,
          relation: ['neighbor', 'friend', 0.08, 0.02],
          condition: 'grief',
          flag: 'could_not_find_the_grave',
          knowledge: ['the old tree by the grave was cut down last year', 0.7],
        },
      },
      {
        id: 'neighbour-collapses',
        w: 0.25,
        text: '{neighbor}蹲下去擦墓碑，起身时晃了一下，{subject}一把扶住，才没有让她磕在石角上。守墓人端来一碗水，{neighbor}喝了两口，说没事，只是蹲久了。回去的路上，她一直抓着{subject}的胳膊，指甲隔着袖子掐进肉里。',
        significance: 0.72,
        when: { minAge: 55 },
        fx: [
          {
            cash: -2,
            health: -0.02,
            relation: ['neighbor', 'friend', 0.16, 0.08],
            flag: 'helped_neighbour_at_grave',
          },
          {
            raw: [
              {
                type: 'health',
                personId: '$neighbor',
                amount: -0.03,
                reason: 'nearly collapsed at the grave',
              },
              {
                type: 'condition',
                personId: '$neighbor',
                condition: 'frail_after_grave_visit',
                add: true,
                reason: 'the neighbour was frail after the grave visit',
              },
            ],
          },
        ],
      },
    ],
    task: taskMeta('family', ['family', 'care'], ['care', 'belonging'], 0.68, 0.1, ['social']),
  },

  // 32. Mourn a partner ----------------------------------------------------
  {
    id: 'r13-fam.mourn-partner',
    title: '衣柜里那件外套',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [26, 80],
    tags: ['task', 'family', 'grief', 'widow', 'mourning', 'partner'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [{ kind: 'hasRole', role: 'widowed' }],
    roles: {
      confidant: ['neighbor', { minAge: 30, maxAge: 82 }],
    },
    outcomes: [
      {
        id: 'mourning-ritual',
        w: 0.45,
        text: '{subject}把亡人的外套从衣柜里取出来，口袋翻了三遍，只找到一张电车票和半截铅笔。{confidant}坐在床边，帮{subject}把袖口重新缝好，说留着吧，别急着送人。两人点了一支蜡烛，看它烧到半夜，谁也没有吹灭。',
        significance: 0.74,
        fx: {
          health: -0.02,
          relation: ['confidant', 'friend', 0.16, 0.06],
          condition: 'mourning',
          role: 'mourner',
          flag: 'held_a_mourning_vigil',
          knowledge: ['the dead partner kept an old tram ticket in the coat', 0.8],
        },
      },
      {
        id: 'cannot-enter-room',
        w: 0.3,
        text: '{subject}在房门口站了很久，还是没能进去。{confidant}替{subject}把窗子打开，把床单换下来；{subject}坐在楼梯上，听见屋里扫帚刮过地板的声音。那天夜里，{subject}睡在厨房的长椅上，外套盖在膝盖上。',
        significance: 0.66,
        fx: {
          mood: -0.18,
          relation: ['confidant', 'friend', 0.1, 0.02],
          condition: 'grief',
          flag: 'could_not_enter_the_shared_room',
        },
      },
      {
        id: 'clothes-given-away',
        w: 0.25,
        text: '{subject}把亡人的衣服叠成三摞，一摞给收容所，一摞给街坊，最旧的那件留下。{confidant}帮着捆扎，绳子勒得太紧，{subject}又松开重系。送到门口时，收容所的人问要不要收据，{subject}摇头，说只要别剪掉扣子。',
        significance: 0.7,
        when: { maxCash: 2 },
        fx: {
          mood: -0.08,
          relation: ['confidant', 'friend', 0.12, 0.04],
          condition: 'grief',
          role: 'mourner',
          flag: 'gave_partner_clothes_to_shelter',
          knowledge: ['the shelter keeps the buttons when clothes are donated', 0.7, 'confidant'],
        },
      },
    ],
    variants: [
      {
        id: 'mourn-war',
        when: { contextTags: ['war'] },
        title: '没有尸体的葬礼',
        outcomes: [
          {
            id: 'memorial-without-body',
            w: 0.6,
            text: '部队只寄来一张写着“失踪”的纸，连尸体也没有。{subject}在车站的纪念牌前摆了一双旧鞋，{confidant}替{subject}念了名字。风把纸吹得贴在铁栏上，{subject}没有去揭，只把外套的扣子一颗颗扣好。',
            significance: 0.82,
            fx: {
              mood: -0.18,
              relation: ['confidant', 'friend', 0.16, 0.06],
              condition: 'ambiguous_loss',
              role: 'war_widow',
              flag: 'memorial_without_a_body',
              knowledge: ['the army lists the partner as missing, not dead', 0.9],
            },
          },
          {
            id: 'kept-the-letter',
            w: 0.4,
            text: '{subject}把最后一封信从枕下拿出来，让{confidant}念。信里说等打完这一仗就回来修屋顶；念到“别等我”时，{confidant}停了一下，{subject}说接着念。信纸折回去时，折痕已经磨得快断了。',
            significance: 0.74,
            fx: {
              mood: -0.12,
              relation: ['confidant', 'friend', 0.12, 0.04],
              condition: 'grief',
              role: 'mourner',
              flag: 'read_the_last_letter_aloud',
              knowledge: ['the last letter told the subject not to wait', 0.9],
            },
          },
        ],
      },
    ],
    task: taskMeta('family', ['family', 'rest'], ['care', 'belonging'], 0.72, 0.14, ['social']),
  },

  // 33. Remarry ------------------------------------------------------------
  {
    id: 'r13-fam.remarry',
    title: '第二次戴上的戒指',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [28, 72],
    tags: ['task', 'family', 'remarriage', 'widow', 'courtship', 'household'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [
      { kind: 'hasRole', role: 'widowed' },
      { kind: 'notHasRelation', relationKind: 'partner' },
    ],
    roles: {
      partner: ['partner', { minAge: 28, maxAge: 76, sex: 'opposite' }],
    },
    outcomes: [
      {
        id: 'remarried',
        w: 0.4,
        text: '{subject}在教堂门口站了一会儿，才让{partner}把戒指戴上。戒指是旧的，内圈刻着另一个人的名字，{subject}没有让人磨掉。宴席只摆了一桌，邻桌的一个孩子坐在末席，一直低头搅汤；{subject}夹了一块肉过去，孩子也没有抬头。',
        significance: 0.84,
        fx: [
          {
            cash: -5,
            relation: ['partner', 'partner', 0.16, 0.1],
            role: 'married',
            loseRole: 'widowed',
            condition: 'remarried',
            flag: 'remarried_after_widowhood',
            knowledge: ['the old wedding ring still bears the first spouse’s name', 0.9],
          },
          {
            raw: [
              {
                type: 'household',
                personId: '$partner',
                householdId: '$household',
                reason: 'moved in after the second marriage',
              },
            ],
          },
        ],
      },
      {
        id: 'proposal-refused',
        w: 0.35,
        text: '{subject}把戒指推回去，说自己这把年纪，不想再替谁洗衣做饭。{partner}没有恼，只把戒指收进盒子，说那就做个伴。两人又坐了一会儿；{subject}回家后，把亡人的照片从床头挪到柜顶，没有翻过去。',
        significance: 0.66,
        fx: {
          mood: -0.08,
          relation: ['partner', 'acquaintance', -0.02, 0.04],
          condition: 'remarriage_refused',
          flag: 'refused_second_marriage',
        },
      },
      {
        id: 'marriage-of-convenience',
        w: 0.25,
        text: '{subject}和{partner}把条件谈在桌上：{partner}的工钱付房租，{subject}替{partner}照顾老母亲；两人各睡各的屋，逢年过节一起吃饭。婚礼办得很小，{partner}在签字时手很稳。{subject}看着登记簿上的新名字，想起自己第一次结婚时，连字都不会写。',
        significance: 0.78,
        when: { maxCash: 3 },
        fx: [
          {
            cash: 3,
            relation: ['partner', 'partner', 0.08, 0.02],
            role: 'married',
            loseRole: 'widowed',
            condition: 'remarriage_of_convenience',
            flag: 'remarried_for_security',
            knowledge: ['the marriage is an arrangement about rent and elder care', 0.9],
          },
          {
            raw: [
              {
                type: 'household',
                personId: '$partner',
                householdId: '$household',
                reason: 'moved in under a practical marriage agreement',
              },
            ],
          },
        ],
      },
    ],
    variants: [
      {
        id: 'remarry-postwar',
        when: { contextTags: ['postwar'] },
        title: '遗属门前的新鞋印',
        outcomes: [
          {
            id: 'quick-remarriage',
            w: 0.55,
            text: '战后街上到处都是遗属，{partner}是少数回来的人之一。亡人的家里催{subject}再成家，说家里少一个挣工钱的。婚礼办得很快，{partner}把军大衣改成了外套；{subject}在签字时，听见隔壁桌有人议论{subject}“等不及”。',
            significance: 0.8,
            fx: [
              {
                cash: -4,
                relation: ['partner', 'partner', 0.12, 0.06],
                role: 'married',
                loseRole: 'widowed',
                condition: 'remarried_under_pressure',
                flag: 'remarried_after_the_war',
                knowledge: ['the neighbourhood says she remarried too quickly', 0.8],
              },
              {
                raw: [
                  {
                    type: 'household',
                    personId: '$partner',
                    householdId: '$household',
                    reason: 'moved in after a postwar remarriage',
                  },
                ],
              },
            ],
          },
          {
            id: 'chose-independence',
            w: 0.45,
            text: '{subject}把来说媒的人送走，回屋把亡人的军帽从箱底拿出来，掸掉灰，挂在墙上。{partner}在门口等了一会儿，见{subject}没有改口，便走了。{subject}把门闩插好，第一次觉得这间屋子是自己的。',
            significance: 0.72,
            fx: {
              mood: 0.06,
              relation: ['partner', 'acquaintance', -0.06, 0],
              role: 'independent_widow',
              flag: 'refused_postwar_remarriage',
              knowledge: ['the widow keeps her own household', 0.8],
            },
          },
        ],
      },
    ],
    task: taskMeta('family', ['family', 'belonging'], ['belonging', 'cash'], 0.8, 0.24, ['social']),
  },

  // 34. Separate -----------------------------------------------------------
  {
    id: 'r13-fam.separate',
    title: '把铺盖搬到走廊尽头',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [20, 72],
    tags: ['task', 'family', 'separation', 'marriage', 'household'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [{ kind: 'hasRelation', relationKind: 'partner', sameHousehold: true }],
    roles: {
      partner: ['partner', { minAge: 20, maxAge: 74 }],
    },
    outcomes: [
      {
        id: 'agreed-separation',
        w: 0.45,
        text: '{subject}和{partner}把床单、锅和工钱袋分成两堆，谁也没有争那只钟。{partner}把铺盖卷起来，搬到走廊尽头的小屋；{subject}替{subjectPronoun}把门带上，回到屋里，发现桌上还留着半杯水。两人没有去法院，只对门房说从此各过各的。',
        significance: 0.8,
        fx: {
          cash: -3,
          relationEnd: ['partner', 'partner'],
          role: 'separated',
          condition: 'separated',
          flag: 'separated_from_partner',
          knowledge: ['the couple agreed to live apart without a divorce', 0.9],
        },
      },
      {
        id: 'separation-fight',
        w: 0.35,
        text: '话说到一半，{partner}把那只钟摔在地上，玻璃碎了一地。{subject}的手背被飞片划出血，{partner}还要去抓{subjectPronoun}的胳膊，被隔壁的男人拦住。当天夜里，{subject}把铺盖搬到厨房，门从里面用椅子顶住。',
        significance: 0.82,
        fx: {
          cash: -2,
          health: -0.04,
          relationEnd: ['partner', 'partner'],
          relation: ['partner', 'rival', -0.24, 0],
          role: 'separated',
          condition: 'bruises',
          flag: 'violent_separation',
        },
      },
      {
        id: 'stay-for-money',
        w: 0.2,
        text: '{subject}算了一夜，发现自己搬出去就付不起房租，锅碗也要重新置办。第二天，{subject}把已经捆好的铺盖解开，照旧给{partner}做早饭。两人在桌边坐着，谁也没有提昨晚的话；{subject}把盐罐放得很轻。',
        significance: 0.7,
        when: { maxCash: 3 },
        fx: {
          cash: -1,
          relation: ['partner', 'partner', -0.1, 0],
          condition: 'separated_in_house',
          flag: 'stayed_for_housing',
          knowledge: ['leaving would cost more than staying', 0.8],
        },
      },
    ],
    variants: [
      {
        id: 'separation-crisis',
        when: { contextTags: ['crisis'] },
        title: '两间屋子只租得起一间',
        outcomes: [
          {
            id: 'forced-to-stay',
            w: 0.55,
            text: '失业的人挤满了出租屋，{subject}去问了六家，没有一家肯租单间。{partner}把自己的衣服收进一只箱子，却找不到地方放；最后箱子又塞回床底。两人把床用一块旧帘子隔开，夜里谁翻身，帘子都跟着动。',
            significance: 0.76,
            fx: [
              {
                cash: -2,
                relationEnd: ['partner', 'partner'],
                relation: ['partner', 'rival', -0.12, 0],
                condition: 'separated_in_house',
                role: 'separated',
                flag: 'separated_under_one_roof',
                knowledge: ['no landlord will rent a single room during the crisis', 0.85],
              },
            ],
          },
          {
            id: 'left-to-relative',
            w: 0.45,
            text: '{subject}把箱子寄到城外的亲戚家，自己先搬过去。{partner}没有送，只站在窗口看{subject}把箱子捆上板车。临走时，{subject}把家里的钥匙放在门槛下面，钥匙碰着砖，响了一声。',
            significance: 0.74,
            fx: [
              {
                cash: -3,
                relationEnd: ['partner', 'partner'],
                relation: ['partner', 'acquaintance', -0.04, 0],
                role: 'separated',
                condition: 'separated',
                flag: 'moved_out_to_relative',
              },
            ],
          },
        ],
      },
    ],
    task: taskMeta('family', ['family', 'survival'], ['belonging', 'cash'], 0.78, 0.34, ['social']),
  },

  // 35. Divorce ------------------------------------------------------------
  {
    id: 'r13-fam.divorce',
    title: '登记簿上的注销线',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [20, 72],
    tags: ['task', 'family', 'divorce', 'law', 'marriage', 'official'],
    contexts: URBAN,
    milieus: GOV,
    conditions: [{ kind: 'hasRelation', relationKind: 'partner' }],
    roles: {
      partner: ['partner', { minAge: 20, maxAge: 74 }],
      clerk: ['official', { minAge: 25, maxAge: 72 }],
    },
    outcomes: [
      {
        id: 'divorce-granted',
        w: 0.4,
        text: '{clerk}把两人的名字念了一遍，问还有没有挽回的余地。{subject}说没有，{partner}也没有出声。{clerk}在登记簿上画了一道注销线，收走八克朗的手续费；走出办事处时，{partner}往左，{subject}往右，谁也没有回头。',
        significance: 0.84,
        fx: {
          cash: -8,
          relationEnd: ['partner', 'partner'],
          loseRole: 'married',
          role: 'divorced',
          condition: 'divorced',
          flag: 'divorce_granted',
          knowledge: ['the marriage was struck from the register', 0.9, 'clerk'],
        },
      },
      {
        id: 'divorce-refused',
        w: 0.35,
        text: '{clerk}说除非能证明对方通奸或恶意遗弃，否则不能判离。{subject}拿不出证人，{partner}在走廊里冷笑，说早就知道会这样。两人在楼梯口又吵了一架，{clerk}叫来门房，把两人赶了出去。',
        significance: 0.72,
        fx: {
          cash: -2,
          relation: ['partner', 'rival', -0.2, 0],
          condition: 'marriage_stuck',
          flag: 'divorce_refused_for_lack_of_evidence',
          knowledge: ['divorce requires proof of adultery or desertion', 0.9, 'clerk'],
        },
      },
      {
        id: 'property-split',
        w: 0.25,
        text: '{subject}不要赡养费，只要那台缝纫机和那只衣柜。{partner}起初不肯，{clerk}把财产清单推到中间，说按法律一人一半。最后{subject}拿走缝纫机，{partner}留下钟和柜子；两人在清单上签字时，笔尖把纸戳破了一个洞。',
        significance: 0.82,
        when: { maxCash: 4 },
        fx: {
          cash: -5,
          relationEnd: ['partner', 'partner'],
          relation: ['partner', 'rival', -0.14, 0],
          loseRole: 'married',
          role: 'divorced',
          condition: 'divorced',
          flag: 'divorce_with_property_split',
          knowledge: [
            'the sewing machine went to the subject, the clock to the partner',
            0.9,
            'clerk',
          ],
        },
      },
    ],
    variants: [
      {
        id: 'divorce-reform',
        when: { contextTags: ['reform'] },
        title: '新法第一条',
        outcomes: [
          {
            id: 'reform-divorce',
            w: 0.6,
            text: '新的婚姻法把“感情破裂”写进了条文，{clerk}却还在用旧表格。{subject}和{partner}被叫进一间小屋，问了半个钟头；{clerk}最后说可以判，但要在报纸上登一条公告。公告费比手续费还贵，{subject}还是把钱数了出来。',
            significance: 0.84,
            fx: [
              {
                cash: -9,
                relationEnd: ['partner', 'partner'],
                loseRole: 'married',
                role: 'divorced',
                condition: 'divorced',
                flag: 'divorce_under_reform_law',
                knowledge: ['the new law requires a newspaper notice', 0.9, 'clerk'],
              },
            ],
          },
          {
            id: 'reconciled-at-court',
            w: 0.4,
            text: '{clerk}把两人留在屋里，自己去走廊抽烟。{partner}先开口，说房租下个月要交；{subject}说知道。两人把话说完，发现争的其实不是同一件事。{clerk}回来时，{subject}把已经填好的表格折起来，说再想想。',
            significance: 0.76,
            fx: [
              {
                cash: -1,
                relation: ['partner', 'partner', 0.08, 0.02],
                condition: 'marriage_reconsidered',
                role: 'reconciled_spouse',
                flag: 'withdrew_divorce_at_court',
                knowledge: ['the couple still agrees about the child’s schooling', 0.8],
              },
            ],
          },
        ],
      },
    ],
    task: taskMeta('family', ['family', 'survival'], ['belonging', 'status'], 0.8, 0.38, [
      'social',
      'literacy',
    ]),
  },

  // 36. Leave an abusive partner ------------------------------------------
  {
    id: 'r13-fam.leave-abusive-partner',
    title: '门闩从里面插上',
    domain: 'health',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 62],
    tags: ['task', 'health', 'domestic_violence', 'safety', 'partner', 'shelter'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [{ kind: 'hasRelation', relationKind: 'partner', sameHousehold: true }],
    roles: {
      partner: ['partner', { minAge: 18, maxAge: 64 }],
      confidant: ['neighbor', { minAge: 25, maxAge: 76 }],
    },
    outcomes: [
      {
        id: 'left-in-the-night',
        w: 0.4,
        text: '{subject}等{partner}睡熟，才把证件和一件换洗衣裳塞进布包。{confidant}在楼梯口等着，替{subject}提着鞋，两人光脚走过三段楼梯。到了街上，{subject}才发现自己的手一直在抖，布包的带子勒进掌心。',
        significance: 0.86,
        fx: [
          {
            cash: -3,
            health: -0.02,
            relationEnd: ['partner', 'partner'],
            relation: ['confidant', 'friend', 0.2, 0.06],
            role: 'left_abusive_partner',
            condition: 'safe_at_neighbour',
            flag: 'left_abusive_partner_at_night',
          },
        ],
      },
      {
        id: 'stayed-again',
        w: 0.35,
        text: '{subject}把布包又塞回床底，因为{partner}第二天清早煮了粥，还把摔坏的椅子修好。{confidant}在门口问要不要走，{subject}说再看看。那天夜里，{partner}又摔了一只碗；{subject}把厨房的刀收进柜子，坐在床边等到天亮。',
        significance: 0.76,
        fx: {
          health: -0.08,
          relation: ['partner', 'partner', -0.12, 0],
          condition: 'bruises',
          flag: 'stayed_with_abusive_partner',
          knowledge: ['the partner’s remorse lasts only until the next quarrel', 0.85],
        },
      },
      {
        id: 'neighbour-intervenes',
        w: 0.25,
        text: '{confidant}听见墙那边的响动，过来敲门，说借一勺盐。{partner}开门时，{subject}趁机把布包递出去。{confidant}没有接话，只把{subject}挡在身后，说今晚去{confidant}家睡。{partner}在门里骂了很久，最后把门摔上。',
        significance: 0.82,
        when: { maxCash: 2 },
        fx: [
          {
            cash: -2,
            health: -0.03,
            relationEnd: ['partner', 'partner'],
            relation: ['confidant', 'friend', 0.22, 0.08],
            role: 'left_abusive_partner',
            condition: 'bruises',
            flag: 'neighbour_helped_escape',
            knowledge: ['the neighbour will keep the spare key', 0.8, 'confidant'],
          },
        ],
      },
    ],
    task: taskMeta('health', ['survival', 'care'], ['health', 'belonging'], 0.92, 0.46, ['social']),
  },

  // 37. Seek shelter -------------------------------------------------------
  {
    id: 'r13-fam.seek-shelter',
    title: '收容所门口的队伍',
    domain: 'health',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 68],
    tags: ['task', 'health', 'shelter', 'homelessness', 'night', 'charity'],
    contexts: URBAN_STATION,
    milieus: GOV,
    conditions: [{ kind: 'cash', max: 8 }],
    roles: {
      matron: ['neighbor', { minAge: 32, maxAge: 76, sex: 'female' }],
    },
    outcomes: [
      {
        id: 'bed-found',
        w: 0.4,
        text: '{matron}把{subject}的名字写进本子，发了一张薄毯和一碗热汤。床铺是用木板搭的，翻个身就响；隔壁的女人一直咳嗽，{subject}却睡得很沉。天亮时，{matron}说只能住三夜，第四夜要去市政厅重新登记。',
        significance: 0.78,
        fx: [
          {
            cash: -1,
            move: ['@station', 'slept in the municipal night shelter'],
            relation: ['matron', 'acquaintance', 0.08, 0],
            role: 'shelter_resident',
            condition: 'sheltered',
            flag: 'slept_in_night_shelter',
            knowledge: [
              'the night shelter allows only three nights without re-registration',
              0.9,
              'matron',
            ],
          },
        ],
      },
      {
        id: 'turned-away',
        w: 0.35,
        text: '{matron}把门开了一条缝，说床位已经满了，让{subject}去火车站候车室碰碰运气。{subject}在雨里走回车站，长椅上已经躺满了人；{subjectPronoun}在墙角坐下来，把报纸盖在膝盖上，鞋里的水慢慢凉透。',
        significance: 0.8,
        fx: {
          cash: -1,
          health: -0.05,
          mood: -0.12,
          condition: 'homeless',
          flag: 'turned_away_from_shelter',
        },
      },
      {
        id: 'robbed-in-shelter',
        w: 0.25,
        text: '半夜有人摸{subject}的布包，{subject}惊醒时，包已经被拖到床板底下。{matron}提着灯赶来，只捡到一只空钱袋；里面原本放着最后三克朗。第二天，{subject}把毯子叠好，没说要去哪里。',
        significance: 0.76,
        when: { maxCash: 2 },
        fx: [
          {
            cash: -3,
            health: -0.03,
            condition: 'robbed_at_shelter',
            flag: 'robbed_in_night_shelter',
            knowledge: ['the shelter has no lockers and no night watch', 0.9, 'matron'],
          },
        ],
      },
    ],
    variants: [
      {
        id: 'shelter-crisis',
        when: { contextTags: ['crisis'] },
        title: '门前多了一倍的鞋',
        outcomes: [
          {
            id: 'shared-a-bed',
            w: 0.55,
            text: '收容所门前排的队比平时多了一倍，{matron}把两张床并成一张，让两个女人各睡一头。{subject}半夜醒来，发现旁边的人正把毯子往自己这边拉；两人谁也没有说话，最后各盖一半。',
            significance: 0.78,
            fx: [
              {
                cash: -1,
                health: -0.02,
                move: ['@station', 'shared a shelter bed during the crisis'],
                relation: ['matron', 'acquaintance', 0.06, 0],
                condition: 'sheltered',
                role: 'shelter_resident',
                flag: 'shared_a_shelter_bed',
              },
            ],
          },
          {
            id: 'shelter-closed',
            w: 0.45,
            text: '警察在门口贴了封条，说收容所收留了太多的外地人。{matron}站在封条旁边，把剩下的面包分给排队的人；分到{subject}时，{matron}多塞了一块。{subject}把面包揣进怀里，转身走进雨里。',
            significance: 0.82,
            fx: [
              {
                cash: -1,
                health: -0.04,
                food: 1,
                relation: ['matron', 'friend', 0.1, 0.02],
                condition: 'homeless',
                flag: 'shelter_closed_by_police',
                knowledge: ['the police closed the shelter to outsiders', 0.85, 'matron'],
              },
            ],
          },
        ],
      },
    ],
    task: taskMeta('health', ['survival'], ['health', 'belonging'], 0.88, 0.3, ['social']),
  },

  // 38. Move in with relatives --------------------------------------------
  {
    id: 'r13-fam.move-in-with-relatives',
    title: '亲戚家的前屋',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 72],
    tags: ['task', 'family', 'housing', 'relative', 'doubling_up', 'poverty'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [{ kind: 'cash', max: 8 }],
    roles: {
      relative: ['sibling', { minAge: 20, maxAge: 78 }],
    },
    outcomes: [
      {
        id: 'taken-in',
        w: 0.45,
        text: '{subject}把箱子搬到城另一头的{relative}家，木轮在石子路上颠掉了一颗钉子。{relative}把前屋的杂物挪到灶间，腾出一块能铺两张草垫的地方；晚上吃饭时，桌上多加了一碗汤。{subject}把房租钱推过去，{relative}又推回来，说先住着，别急着算。',
        significance: 0.8,
        fx: [
          {
            cash: -2,
            move: ['@home', 'moved in with relatives outside the city'],
            relation: ['relative', 'kin', 0.18, 0.08],
            condition: 'doubled_up_with_relatives',
            flag: 'took_refuge_with_relatives',
            knowledge: ['the relatives can keep the family for the winter', 0.8, 'relative'],
          },
        ],
      },
      {
        id: 'refused-at-door',
        w: 0.3,
        text: '{relative}站在门口，说自家也添了人口，前屋已经住满。{subject}把箱子又搬回车上，{relative}追出来塞了一袋土豆，说不是不帮，是实在挤不下。车走远时，{subject}回头看见{relative}还站在门口，围裙上沾着面粉。',
        significance: 0.72,
        fx: [
          {
            food: 1,
            mood: -0.14,
            relation: ['relative', 'kin', 0.04, 0],
            condition: 'housing_insecurity',
            flag: 'refused_by_relatives',
          },
        ],
      },
      {
        id: 'crowded-in',
        w: 0.25,
        text: '{relative}家腾不出整间屋，只把灶间旁边的一块地方让给{subject}。夜里灶火灭了，墙上的霜一点点渗进来；{subject}把外套盖在脚上，听见隔壁孩子在哭。住到第五天，{relative}开始念叨煤和面包的账。',
        significance: 0.74,
        when: { minAge: 50 },
        fx: [
          {
            cash: -1,
            health: -0.03,
            move: ['@home', 'crowded into the relatives’ kitchen corner'],
            relation: ['relative', 'kin', -0.06, 0],
            condition: 'overcrowded_home',
            flag: 'crowded_into_relatives_kitchen',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'relatives-postwar',
        when: { contextTags: ['postwar'] },
        title: '户籍册上多出来的一户',
        outcomes: [
          {
            id: 'registered-as-subtenant',
            w: 0.55,
            text: '战后住房登记查得严，{relative}让{subject}以“帮佣”的名义住进来，户口本上不能写亲戚。{subject}每天替{relative}挑水、看孩子，换前屋的一张草垫。警察来查夜时，{subject}得从后门出去，在柴棚里站到天亮。',
            significance: 0.8,
            fx: [
              {
                cash: -1,
                move: ['@home', 'lodged with relatives as a registered servant'],
                relation: ['relative', 'kin', 0.1, 0.02],
                condition: 'hidden_lodger',
                flag: 'lodged_as_servant_with_relatives',
                knowledge: ['the housing police check the register at night', 0.85],
              },
            ],
          },
          {
            id: 'housing-office-found-room',
            w: 0.45,
            text: '{relative}陪{subject}去住房办事处，排了三个上午，终于分到一间带公用厨房的屋子。钥匙拿到手时，{subject}在门口站了很久，才把箱子推进去。{relative}替{subject}把窗子打开，说这屋子小，但户口是自己的。',
            significance: 0.78,
            fx: [
              {
                cash: -3,
                residence: ['@home', 'allocated a small municipal room'],
                relation: ['relative', 'kin', 0.12, 0.04],
                role: 'householder',
                condition: 'municipal_tenant',
                flag: 'got_municipal_room',
                knowledge: ['the municipal room comes with a shared kitchen', 0.9],
              },
            ],
          },
        ],
      },
    ],
    task: taskMeta('family', ['family', 'survival'], ['cash', 'belonging'], 0.8, 0.24, ['social']),
  },

  // 39. Return to a hometown ----------------------------------------------
  {
    id: 'r13-fam.return-hometown',
    title: '火车进站时看见旧钟楼',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [25, 78],
    tags: ['task', 'family', 'return', 'hometown', 'migration', 'relative'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [{ kind: 'notHasRole', role: 'returned_home' }],
    roles: {
      relative: ['sibling', { minAge: 22, maxAge: 80 }],
    },
    outcomes: [
      {
        id: 'welcomed-home',
        w: 0.4,
        text: '火车进站时，{subject}先看见旧钟楼，钟面已经换成了白铁皮。{relative}在站台尽头等着，手里提着一篮李子；两人走近了，谁也没有先开口，最后是{relative}把篮子塞过来，说路上吃。回家的石板路比记忆里窄，墙根却还是那股潮味。',
        significance: 0.78,
        fx: [
          {
            cash: -4,
            move: ['@home', 'returned to the hometown'],
            relation: ['relative', 'kin', 0.18, 0.06],
            role: 'returned_home',
            condition: 'returned_to_hometown',
            flag: 'returned_to_hometown',
            knowledge: ['the old clock tower now has a tin face', 0.8, 'relative'],
          },
        ],
      },
      {
        id: 'door-closed',
        w: 0.35,
        text: '{relative}没有来车站。{subject}提着箱子走到老屋门口，门从里面拴着；敲了三遍，才有人隔着门说这房子已经换了姓。{subject}在台阶上坐到天黑，把带来的糖分成两份，一份放在门槛上，一份自己吃了。',
        significance: 0.72,
        fx: [
          {
            cash: -2,
            mood: -0.18,
            relation: ['relative', 'kin', -0.16, 0],
            condition: 'rejected_at_home',
            flag: 'hometown_door_closed',
            knowledge: ['the family house has passed to another household', 0.9],
          },
        ],
      },
      {
        id: 'town-changed',
        w: 0.25,
        text: '{subject}回到老街区，发现磨坊改成了仓库，旧学校门口挂着新招牌。{relative}陪着走了一圈，指给{subject}看哪家搬走了、哪家死了人。走到河边时，{subject}忽然说想留下；{relative}没有接话，只把烟递过来。',
        significance: 0.7,
        when: { minAge: 45 },
        fx: [
          {
            cash: -3,
            move: ['@home', 'returned to a changed hometown'],
            relation: ['relative', 'kin', 0.1, 0.02],
            condition: 'hometown_changed',
            flag: 'returned_to_changed_hometown',
            knowledge: [
              'the mill is now a warehouse and the school has a new sign',
              0.8,
              'relative',
            ],
          },
        ],
      },
    ],
    variants: [
      {
        id: 'hometown-postwar',
        when: { contextTags: ['postwar'] },
        title: '地图上换了的国名',
        outcomes: [
          {
            id: 'new-border',
            w: 0.55,
            text: '火车在边境停了两个钟头，检查员翻着{subject}的旧证件，问籍贯那一栏为什么写着另一个国名。{subject}解释说战前这里属于帝国，检查员把证件合上，说现在不是了。到了镇上，{relative}来接，第一句话是“你回来得太晚”。',
            significance: 0.82,
            fx: [
              {
                cash: -5,
                move: ['@home', 'crossed the new border back to the hometown'],
                relation: ['relative', 'kin', 0.12, 0.04],
                condition: 'stateless_uncertainty',
                flag: 'returned_across_new_border',
                knowledge: ['the hometown now lies in another state', 0.9],
              },
            ],
          },
          {
            id: 'family-gone',
            w: 0.45,
            text: '{subject}回到老街区，老屋的屋顶塌了一角，院子里长满荨麻。{relative}从城外赶来，说家里的人逃的逃、散的散，只剩自己还认得这块地。两人在门槛上坐了一会儿，{subject}把箱子打开，里面是给每个人带的礼物，已经不知道该给谁。',
            significance: 0.8,
            fx: [
              {
                cash: -2,
                mood: -0.2,
                relation: ['relative', 'kin', 0.1, 0.02],
                condition: 'grief',
                flag: 'returned_to_an_empty_home',
                knowledge: ['most of the family scattered during the war', 0.9],
              },
            ],
          },
        ],
      },
    ],
    task: taskMeta('family', ['family', 'belonging'], ['belonging', 'cash'], 0.74, 0.26, [
      'social',
    ]),
  },

  // 40. Inherit a family object -------------------------------------------
  {
    id: 'r13-fam.inherit-family-object',
    title: '铜锁撬开以后',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [22, 76],
    tags: ['task', 'family', 'inheritance', 'object', 'grief', 'sibling'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [
      { kind: 'hasRole', role: 'orphan' },
      { kind: 'notHasRole', role: 'keeper_of_family_object' },
    ],
    roles: {
      sibling: ['sibling', { minAge: 18, maxAge: 78 }],
    },
    outcomes: [
      {
        id: 'chest-opened',
        w: 0.4,
        text: '{subject}把樟木箱的铜锁撬开，里面是两床旧被面、一叠照片和一只没有表链的怀表。{sibling}伸手去拿照片，{subject}先看见了背面母亲的字，写得歪歪扭扭。两人把照片一张张摊在床上，谁也没有提怎么分；最后{subject}把怀表推给{sibling}，自己留下那叠照片。',
        significance: 0.8,
        fx: [
          {
            cash: 5,
            relation: ['sibling', 'kin', 0.12, 0.06],
            role: 'keeper_of_family_object',
            flag: 'opened_the_family_chest',
            knowledge: [
              'the mother wrote the children’s names on the back of each photograph',
              0.9,
            ],
          },
        ],
      },
      {
        id: 'chest-sold',
        w: 0.35,
        text: '{subject}把箱子里的银餐具和怀表拿到当铺，换回的钱刚好够付拖欠的房租。{sibling}知道后赶来，在门口站了很久，说那套餐具是外婆的陪嫁。{subject}把当票放在桌上，说房租不会等人；{sibling}拿起当票看了看，又放下。',
        significance: 0.76,
        fx: [
          {
            cash: 9,
            relation: ['sibling', 'kin', -0.16, 0],
            condition: 'sold_family_object',
            flag: 'sold_family_silver',
            knowledge: ['the silverware was the grandmother’s dowry', 0.9, 'sibling'],
          },
        ],
      },
      {
        id: 'chest-disputed',
        w: 0.25,
        text: '{subject}刚把箱子打开，{sibling}就说照片该归自己，因为父母最后几年是{subject}在照顾、{sibling}没有尽过力。{subject}把照片收回箱里，{sibling}伸手来夺，箱盖砸在两人的手背上。最后谁也没有拿走箱子，铜锁挂在扣上，晃了一夜。',
        significance: 0.74,
        when: { maxCash: 3 },
        fx: [
          {
            cash: -2,
            relation: ['sibling', 'rival', -0.2, 0],
            condition: 'inheritance_dispute',
            flag: 'family_chest_disputed',
            knowledge: ['the sibling claims the photographs belong to the eldest', 0.85],
          },
        ],
      },
    ],
    task: taskMeta('family', ['family', 'belonging'], ['belonging', 'cash'], 0.74, 0.2, ['social']),
  },

  // 41. Divide an inheritance ---------------------------------------------
  {
    id: 'r13-fam.divide-inheritance',
    title: '银烛台和那只怀表',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [22, 78],
    tags: ['task', 'family', 'inheritance', 'sibling', 'notary', 'conflict'],
    contexts: URBAN,
    milieus: GOV,
    conditions: [
      { kind: 'hasRole', role: 'orphan' },
      { kind: 'notHasRole', role: 'estate_settled' },
    ],
    roles: {
      sibling: ['sibling', { minAge: 18, maxAge: 80 }],
      notary: ['official', { minAge: 28, maxAge: 74 }],
    },
    outcomes: [
      {
        id: 'equal-split',
        w: 0.4,
        text: '{notary}把清单念了一遍，{subject}和{sibling}在桌边一件件认。银烛台归{subject}，父亲的怀表归{sibling}，那口大锅折成钱对半分。分到最后，{sibling}把母亲的一只顶针推过来，说这个不值钱，你留着；{subject}把它套在手指上，发现正好。',
        significance: 0.8,
        fx: {
          cash: 6,
          relation: ['sibling', 'kin', 0.14, 0.06],
          role: 'estate_settled',
          flag: 'divided_inheritance_equally',
          knowledge: ['the mother’s thimble fits the subject’s finger', 0.8, 'sibling'],
        },
      },
      {
        id: 'inheritance-quarrel',
        w: 0.35,
        text: '为了那套银餐具，两人把清单翻来覆去念了三遍。{sibling}说{subject}当年没有出医药费，{subject}说{sibling}连葬礼都没有回来。{notary}把笔放下，说再吵就按法律拍卖；两人都不说话了，只有窗外的雨敲着檐。',
        significance: 0.76,
        fx: {
          cash: -3,
          relation: ['sibling', 'rival', -0.22, 0],
          condition: 'family_feud',
          flag: 'inheritance_quarrel',
          knowledge: [
            'the silver service will be auctioned if the siblings cannot agree',
            0.9,
            'notary',
          ],
        },
      },
      {
        id: 'hidden-debt',
        w: 0.25,
        text: '清单底下压着一张欠条，是父亲生前欠木匠的工钱。{notary}说要先还债再分产；{subject}和{sibling}各掏了一半，分到手的钱只剩几张。{sibling}把欠条折好，说留着吧，别再让下一辈看见。',
        significance: 0.78,
        when: { maxCash: 3 },
        fx: {
          cash: -8,
          relation: ['sibling', 'kin', 0.08, 0],
          condition: 'inherited_debt',
          flag: 'paid_fathers_debt_before_inheritance',
          knowledge: ['the father owed the carpenter a year of wages', 0.9, 'notary'],
        },
      },
    ],
    task: taskMeta('family', ['family', 'status'], ['cash', 'belonging'], 0.76, 0.26, [
      'numeracy',
      'social',
    ]),
  },

  // 42. Take over a family shop -------------------------------------------
  {
    id: 'r13-fam.take-over-family-shop',
    title: '把家里的招牌重新钉上',
    domain: 'commerce',
    kind: 'task',
    stage: 'adulthood',
    ages: [22, 66],
    tags: ['task', 'commerce', 'shop', 'family_firm', 'succession', 'debt'],
    contexts: URBAN,
    milieus: [...HOME, ...OUT],
    conditions: [{ kind: 'notHasRole', role: 'shopkeeper' }],
    roles: {
      shop: ['organization', { organizationKind: 'household_firm' }],
      proprietor: ['parent', { minAge: 50, maxAge: 86 }],
    },
    outcomes: [
      {
        id: 'shop-taken-over',
        w: 0.45,
        text: '{subject}把褪色的招牌从阁楼里搬下来，重新钉在门楣上。{proprietor}站在柜台后面，把账本、钥匙和一枚旧印章一件件交过来，最后说欠街口面粉铺的钱下月要还。第一天开门，只卖出去两斤盐和一包针；{subject}还是把账记在了第一页。',
        significance: 0.84,
        fx: [
          {
            cash: -6,
            relation: ['proprietor', 'kin', 0.16, 0.06],
            role: 'shopkeeper',
            flag: 'took_over_family_shop',
            knowledge: ['the shop owes the flour merchant for one month', 0.9, 'proprietor'],
          },
          {
            raw: [
              {
                type: 'employment',
                personId: '$subject',
                organizationId: '$shop',
                occupation: 'Kaufmann',
                wage: 68,
                workplaceId: '@home',
                reason: 'took over the family shop',
              },
            ],
          },
        ],
      },
      {
        id: 'proprietor-refuses',
        w: 0.3,
        text: '{proprietor}把钥匙收回围裙口袋，说{subject}连账都算不清，铺子交出去不用半年就得关门。{subject}站在柜台外，看见{proprietor}把一叠赊账本摞好，动作比平时慢。那天下午，{subject}没有走，只坐在门口替{proprietor}招呼了两个客人。',
        significance: 0.68,
        fx: {
          cash: -2,
          mood: -0.1,
          relation: ['proprietor', 'rival', -0.14, 0],
          condition: 'succession_refused',
          flag: 'father_refused_to_hand_over_shop',
        },
      },
      {
        id: 'shop-in-debt',
        w: 0.25,
        text: '招牌刚钉上，债主就拿着欠条上门，说老掌柜欠了三个月的货款。{subject}把柜台里的现钱全数出来，还差一大截；{proprietor}坐在后屋不说话，手指一下一下敲着桌沿。最后{subject}把母亲的缝纫机押了出去，换来一张续租的收据。',
        significance: 0.82,
        when: { skill: { name: 'numeracy', min: 0.3 } },
        fx: [
          {
            cash: -12,
            relation: ['proprietor', 'kin', -0.04, 0],
            condition: 'shop_debt',
            flag: 'took_over_indebted_shop',
            knowledge: ['the shop’s debts exceed its cash by half', 0.9],
          },
          {
            raw: [
              {
                type: 'employment',
                personId: '$subject',
                organizationId: '$shop',
                occupation: 'Kaufmann',
                wage: 62,
                workplaceId: '@home',
                reason: 'took over the shop together with its debts',
              },
            ],
          },
        ],
      },
    ],
    variants: [
      {
        id: 'shop-crisis',
        when: { contextTags: ['crisis'] },
        title: '柜台前没有客人',
        outcomes: [
          {
            id: 'shop-kept-open',
            w: 0.55,
            text: '街上的人都在排队领救济，铺子里一天没有进来一个客人。{subject}把面粉分成小包，赊给楼里的邻居，账记在门板背面。{proprietor}说这样下去撑不过冬天；{subject}把最后一袋盐倒进罐子，说撑一天算一天。',
            significance: 0.8,
            fx: [
              {
                cash: -8,
                food: -1,
                relation: ['proprietor', 'kin', 0.1, 0.02],
                condition: 'shop_debt',
                role: 'shopkeeper',
                flag: 'kept_shop_open_during_crisis',
                knowledge: ['the neighbours owe the shop more than they can pay', 0.85],
              },
              {
                raw: [
                  {
                    type: 'employment',
                    personId: '$subject',
                    organizationId: '$shop',
                    occupation: 'Kaufmann',
                    wage: 58,
                    workplaceId: '@home',
                    reason: 'kept the family shop open through the crisis',
                  },
                ],
              },
            ],
          },
          {
            id: 'shop-closed',
            w: 0.45,
            text: '{subject}把最后一批货折价卖给街口的贩子，招牌摘下来靠在门后。{proprietor}坐在空柜台后面，说这铺子开了三十七年，第一次白天上门板。{subject}没有接话，只把钥匙放在{proprietor}手边；两人听见街上的失业队伍从门口走过去。',
            significance: 0.84,
            fx: [
              {
                cash: 4,
                relation: ['proprietor', 'kin', -0.1, 0],
                condition: 'shop_closed',
                role: 'former_shopkeeper',
                flag: 'closed_family_shop',
                knowledge: [
                  'the shop traded for thirty-seven years before closing',
                  0.9,
                  'proprietor',
                ],
              },
            ],
          },
        ],
      },
    ],
    task: taskMeta('commerce', ['work', 'family'], ['cash', 'status'], 0.84, 0.3, [
      'numeracy',
      'social',
    ]),
  },

  // 43. Intergenerational care --------------------------------------------
  {
    id: 'r13-fam.care-for-elder',
    title: '给床上的老人翻个身',
    domain: 'care',
    kind: 'task',
    stage: 'adulthood',
    ages: [16, 62],
    tags: ['task', 'care', 'elder', 'household', 'health', 'intergenerational'],
    contexts: URBAN,
    milieus: HOME,
    roles: {
      elder: ['neighbor', { minAge: 65, maxAge: 88, sameHousehold: true }],
    },
    outcomes: [
      {
        id: 'elder-comforted',
        w: 0.45,
        text: '{subject}把{elder}从床上扶起来，一只手托着后背，一只手把枕头拍松。老人瘦得肩胛骨像两只碗，{subject}替{subjectPronoun}把睡衣拉平，又用温水擦了脸。老人忽然说想晒太阳；{subject}把椅子挪到窗边，自己蹲在旁边，听{elder}讲了一个重复过三遍的故事。',
        significance: 0.72,
        fx: [
          {
            health: -0.03,
            relation: ['elder', 'friend', 0.16, 0.08],
            condition: 'caregiver',
            role: 'carer',
            flag: 'cared_for_elder_at_home',
            knowledge: ['the elder repeats the same story about the old courtyard', 0.8, 'elder'],
          },
        ],
      },
      {
        id: 'elder-fever',
        w: 0.3,
        text: '到了夜里，{elder}开始发烧，嘴唇干得起了皮。{subject}用勺子一点点喂水，水从嘴角流下来，打湿了枕巾。天亮时，{subject}去药铺抓药，回来发现老人把被子蹬到了地上；{subject}把被子重新盖好，坐在床边等到中午。',
        significance: 0.78,
        fx: [
          {
            cash: -3,
            health: -0.02,
            relation: ['elder', 'friend', 0.1, 0.04],
            flag: 'elder_fever_night',
          },
          {
            raw: [
              {
                type: 'health',
                personId: '$elder',
                amount: -0.08,
                reason: 'the elder developed a fever overnight',
              },
              {
                type: 'condition',
                personId: '$elder',
                condition: 'elder_illness',
                add: true,
                reason: 'the elder remained ill after the fever',
              },
            ],
          },
        ],
      },
      {
        id: 'family-conference',
        w: 0.25,
        text: '{subject}把家里人叫到厨房，说老人夜里需要人守，不能只靠一个人。有人提议送养老院，{subject}把费用算了一遍，众人都沉默了。最后定下轮班表：{subject}守前半夜，其他人守后半夜；表贴在灶边，第一晚就有人没有来。',
        significance: 0.7,
        when: { employment: true },
        fx: [
          {
            cash: -1,
            relation: ['elder', 'friend', 0.12, 0.04],
            role: 'carer',
            condition: 'care_rota',
            flag: 'organized_elder_care_rota',
            skill: { social: 0.02 },
            knowledge: ['the family rota already has a missing shift', 0.8],
          },
        ],
      },
    ],
    variants: [
      {
        id: 'elder-care-war',
        when: { contextTags: ['war'] },
        title: '养老院改成了伤兵站',
        outcomes: [
          {
            id: 'elder-kept-home',
            w: 0.6,
            text: '养老院被征作伤兵站，{subject}只好把{elder}接回家。借来的轮椅卡在楼梯口，{subject}背着老人上一层歇一层；老人伏在背上，轻得像一捆干柴。到家后，{subject}把床挪到窗边，答应每天开窗半个钟头。',
            significance: 0.8,
            fx: [
              {
                cash: -4,
                health: -0.04,
                relation: ['elder', 'friend', 0.18, 0.06],
                condition: 'home_nursing',
                role: 'carer',
                flag: 'brought_elder_home_from_requisitioned_home',
              },
            ],
          },
          {
            id: 'elder-left-behind',
            w: 0.4,
            text: '伤兵站只肯留能走动的老人，{elder}被挪到走廊尽头的临时铺位。{subject}每天去送饭，看见老人的床挨着痰盂，枕头下压着自家的门牌。{subject}把门牌收进衣袋，说明年开春就接你回去；老人点点头，没有问明年是哪一年。',
            significance: 0.82,
            fx: [
              {
                cash: -2,
                mood: -0.16,
                relation: ['elder', 'friend', 0.1, 0.02],
                condition: 'grief',
                flag: 'elder_left_in_corridor',
                knowledge: ['the elder keeps the old door plate under the pillow', 0.85],
              },
            ],
          },
        ],
      },
    ],
    task: taskMeta('care', ['care', 'family'], ['care', 'health'], 0.86, 0.2, ['social']),
  },

  // 44. Vouch for a friend ------------------------------------------------
  {
    id: 'r13-fam.vouch-for-friend',
    title: '借据上的第二个名字',
    domain: 'social',
    kind: 'task',
    stage: 'adulthood',
    ages: [20, 70],
    tags: ['task', 'social', 'friendship', 'debt', 'guarantee', 'risk'],
    contexts: URBAN,
    milieus: SOCIAL,
    roles: {
      friend: ['neighbor', { minAge: 20, maxAge: 68 }],
      creditor: ['neighbor', { minAge: 32, maxAge: 80 }],
    },
    outcomes: [
      {
        id: 'signed-guarantee',
        w: 0.4,
        text: '{creditor}把借据推到{subject}面前，说只要签个名，钱就借给{friend}。{subject}看见{friend}的手一直按在桌沿上，指节发白；{subject}把笔蘸了墨，在第二个名字后面又按了手印。{friend}没有说话，只把借据折好，收进内袋。',
        significance: 0.74,
        fx: {
          relation: ['friend', 'friend', 0.18, 0.06],
          relation2: ['creditor', 'acquaintance', 0.04, 0],
          condition: 'guarantor',
          role: 'guarantor',
          flag: 'vouched_for_friend_loan',
          knowledge: ['the loan falls due at the end of the quarter', 0.9, 'creditor'],
        },
      },
      {
        id: 'refused-to-sign',
        w: 0.35,
        text: '{subject}把借据推回去，说自己家里也等着米下锅。{friend}的脸沉下来，说认识这么多年，连个名字都不肯签。{subject}没有解释，只把桌上的茶钱付了；{friend}站起来时把椅子带倒，也没有扶。',
        significance: 0.66,
        fx: {
          cash: -1,
          mood: -0.12,
          relation: ['friend', 'rival', -0.16, 0],
          flag: 'refused_to_vouch',
        },
      },
      {
        id: 'friend-defaults',
        w: 0.25,
        text: '到了季末，{friend}没有还钱，人也搬走了。{creditor}拿着借据找到{subject}的门口，说第二个名字不是白签的。{subject}把家里能卖的铜壶和旧表都拿出来，还是差一截；{creditor}坐在门槛上，说下个月再来。',
        significance: 0.82,
        when: { maxCash: 3 },
        fx: {
          cash: -14,
          relationEnd: ['friend', 'friend'],
          relation: ['friend', 'rival', -0.3, 0],
          condition: 'guarantor_debt',
          flag: 'friend_defaulted_on_guaranteed_loan',
          knowledge: ['the friend left the district without repaying the loan', 0.95, 'creditor'],
        },
      },
    ],
    task: taskMeta('social', ['belonging', 'status'], ['belonging', 'cash'], 0.72, 0.36, [
      'social',
      'numeracy',
    ]),
  },

  // 45. Visit a sick friend in hospital -----------------------------------
  {
    id: 'r13-fam.visit-sick-friend',
    title: '病房里的糖水梨',
    domain: 'health',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 78],
    tags: ['task', 'health', 'hospital', 'friendship', 'visit', 'care'],
    contexts: URBAN,
    milieus: ['hospital', 'health', 'medicine', 'doctor', 'care'],
    conditions: [{ kind: 'cash', min: 1 }],
    roles: {
      friend: ['neighbor', { minAge: 18, maxAge: 72 }],
      nurse: ['worker', { minAge: 22, maxAge: 68, sex: 'female' }],
    },
    outcomes: [
      {
        id: 'visit-allowed',
        w: 0.45,
        text: '{nurse}只准{subject}待一刻钟。{subject}把糖水梨从罐子里倒进碗，{friend}撑着坐起来，喝了两口就放下，说太甜。两人没有说病情，只说了楼里谁家搬走了、哪家生了孩子；{nurse}来收碗时，{friend}已经把{subject}的手握得发红。',
        significance: 0.7,
        fx: {
          cash: -2,
          relation: ['friend', 'friend', 0.18, 0.08],
          condition: 'hospital_visit',
          flag: 'visited_sick_friend',
          knowledge: ['the friend is weaker than they admit', 0.8, 'friend'],
        },
      },
      {
        id: 'visit-refused',
        w: 0.3,
        text: '{nurse}把{subject}拦在门口，说病人刚打过针，不能见客。{subject}把糖水梨留在护士台，嘱咐护士转交；走到楼梯口又回来，问病人有没有说想吃什么。护士翻了一眼记录，说只说过想喝凉水。',
        significance: 0.58,
        fx: {
          cash: -1,
          mood: -0.08,
          relation: ['nurse', 'acquaintance', 0.02, 0],
          flag: 'hospital_visit_refused',
          knowledge: ['the friend asked only for cold water', 0.7, 'nurse'],
        },
      },
      {
        id: 'friend-worse',
        w: 0.25,
        text: '{subject}进去时，{friend}已经认不太清人，眼睛盯着天花板上的水渍。{subject}把梨放在床头，替{friend}把被角掖好；{friend}忽然抓住{subject}的袖子，叫了一个不是{subject}的名字。{nurse}过来换药，轻声说这几天都是这样。',
        significance: 0.74,
        when: { minAge: 55 },
        fx: [
          {
            cash: -1,
            relation: ['friend', 'friend', 0.12, 0.04],
            condition: 'grief',
            flag: 'friend_sank_after_visit',
          },
          {
            raw: [
              {
                type: 'health',
                personId: '$friend',
                amount: -0.06,
                reason: 'the friend’s condition worsened in hospital',
              },
            ],
          },
        ],
      },
    ],
    task: taskMeta('health', ['care', 'belonging'], ['care', 'health'], 0.68, 0.12, ['social']),
  },

  // 46. Collect funeral money for a neighbour -----------------------------
  {
    id: 'r13-fam.collect-funeral-money',
    title: '端着一顶帽子走楼道',
    domain: 'social',
    kind: 'task',
    stage: 'adulthood',
    ages: [25, 76],
    tags: ['task', 'social', 'funeral', 'neighbor', 'charity', 'grief'],
    contexts: URBAN,
    milieus: HOME,
    roles: {
      widow: ['neighbor', { minAge: 35, maxAge: 84, sex: 'female' }],
      neighbour: ['neighbor', { minAge: 25, maxAge: 80 }],
    },
    outcomes: [
      {
        id: 'enough-collected',
        w: 0.45,
        text: '{subject}端着{neighbour}的旧帽子，从一楼走到四楼，一家一家敲门。有人给两枚铜板，有人给一件旧衬衣，还有人家把门开了一条缝又关上。到傍晚，帽子里的钱够买一口薄棺；{widow}接过帽子时，先数了数，又把钱倒出来重数了一遍。',
        significance: 0.76,
        fx: {
          cash: -2,
          relation: ['widow', 'friend', 0.16, 0.06],
          relation2: ['neighbour', 'acquaintance', 0.08, 0],
          role: 'neighbourhood_collector',
          flag: 'collected_funeral_money',
          knowledge: ['the building raised enough for a plain coffin', 0.85],
        },
      },
      {
        id: 'collection-short',
        w: 0.3,
        text: '走到第四家，{subject}的帽子还是轻的。有人说明天再给，有人说自家也刚办过丧事。{subject}把帽子里的钱倒在{widow}的桌上，数了两遍，还差一口棺材的钱；{widow}说算了，用旧门板钉一个也行。',
        significance: 0.7,
        fx: [
          {
            cash: -1,
            relation: ['widow', 'acquaintance', 0.08, 0.02],
            flag: 'funeral_collection_short',
            knowledge: ['a plain coffin costs more than the building can raise', 0.8],
          },
          {
            raw: [
              {
                type: 'condition',
                personId: '$widow',
                condition: 'funeral_debt',
                add: true,
                reason: 'the building could not raise enough for the funeral',
              },
            ],
          },
        ],
      },
      {
        id: 'doors-closed',
        w: 0.25,
        text: '{subject}敲到第三家时，门后的人说这月已经随过两份份子。再往上走，走廊里只剩炒菜的油烟味；{subject}在楼梯口站了一会儿，把帽子里的钱整理好，自己又添了一克朗。回到{widow}家时，只说大家都难。',
        significance: 0.62,
        when: { maxCash: 3 },
        fx: {
          cash: -1,
          mood: -0.08,
          relation: ['widow', 'acquaintance', 0.06, 0],
          flag: 'funeral_donations_refused',
        },
      },
    ],
    task: taskMeta('social', ['belonging', 'care'], ['cash', 'belonging'], 0.7, 0.16, ['social']),
  },

  // 47. Reconcile with an estranged sibling -------------------------------
  {
    id: 'r13-fam.reconcile-sibling',
    title: '车站长椅上的两个人',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [25, 74],
    tags: ['task', 'family', 'sibling', 'estrangement', 'reconciliation', 'station'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [{ kind: 'notHasRole', role: 'reconciled_sibling' }],
    roles: {
      sibling: ['sibling', { minAge: 22, maxAge: 76 }],
    },
    outcomes: [
      {
        id: 'sibling-reconciled',
        w: 0.4,
        text: '{subject}在车站长椅上认出{sibling}，对方正把车票捏在手里。两人隔着一个人的空位坐下，先说了几句天气，{subject}才问那年为什么没有来送葬。{sibling}说车票买了，站台上又折回去；说到一半，两个人都看着铁轨，谁也没有再追问。',
        significance: 0.78,
        fx: {
          relation: ['sibling', 'kin', 0.22, 0.08],
          role: 'reconciled_sibling',
          flag: 'reconciled_with_estranged_sibling',
          knowledge: ['the sibling bought a ticket to the funeral but turned back', 0.9, 'sibling'],
        },
      },
      {
        id: 'train-missed',
        w: 0.35,
        text: '{subject}赶到车站时，{sibling}的车已经开了。站台上只剩一张被踩脏的站台票，{subject}把它捡起来，照着上面的日期看了很久。回家的路上，{subject}绕到邮局，买了一张明信片，写到一半又撕了。',
        significance: 0.66,
        fx: {
          mood: -0.16,
          relation: ['sibling', 'kin', -0.02, 0],
          condition: 'estrangement',
          flag: 'missed_estranged_sibling_at_station',
        },
      },
      {
        id: 'old-fight-reopened',
        w: 0.25,
        text: '话没有说几句，{sibling}又提起分家时那只柜子。{subject}说柜子早就烧了，{sibling}说烧了也是你拿走的。两人在站台上越说越响，检票员过来让两人让开路；{sibling}提起箱子就走，{subject}站在原地，手还伸着。',
        significance: 0.7,
        when: { minAge: 45 },
        fx: {
          health: -0.02,
          relation: ['sibling', 'rival', -0.14, 0],
          condition: 'family_feud',
          flag: 'sibling_reconciliation_failed',
        },
      },
    ],
    variants: [
      {
        id: 'sibling-return-postwar',
        when: { contextTags: ['postwar'] },
        title: '战俘营回来的那个人',
        outcomes: [
          {
            id: 'returned-brother',
            w: 0.55,
            text: '{sibling}从战俘营回来，瘦得军装空了一圈。{subject}去车站接，两人先没有认出来；后来{sibling}叫了{subject}小时候的绰号，{subject}才把箱子接过来。回家路上，{sibling}说在营里最想的是家里的酸菜；{subject}说今年腌得少，但还有一坛。',
            significance: 0.82,
            fx: {
              cash: -2,
              relation: ['sibling', 'kin', 0.24, 0.1],
              role: 'reconciled_sibling',
              condition: 'returned_prisoner_of_war',
              flag: 'welcomed_returned_sibling',
              knowledge: [
                'the sibling dreamed of the family’s pickled cabbage in the camp',
                0.9,
                'sibling',
              ],
            },
          },
          {
            id: 'brother-changed',
            w: 0.45,
            text: '{sibling}回来后不爱说话，吃饭时总把背对着门。{subject}试着提小时候的事，{sibling}只嗯了一声；提到分家，{sibling}把勺子放下，说那些都不重要了。两人把一顿饭吃完，{subject}收拾碗筷时，发现{sibling}的手一直在抖。',
            significance: 0.76,
            fx: {
              relation: ['sibling', 'kin', 0.08, 0.02],
              condition: 'wartime_silence',
              flag: 'returned_sibling_remote',
              knowledge: ['the sibling cannot sit with his back to the door', 0.8],
            },
          },
        ],
      },
    ],
    task: taskMeta('family', ['family', 'belonging'], ['belonging'], 0.72, 0.2, ['social']),
  },

  // 48. Introduce a partner to the family --------------------------------
  {
    id: 'r13-fam.introduce-partner',
    title: '星期天的第三副碗筷',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 42],
    tags: ['task', 'family', 'courtship', 'family_meal', 'partner', 'mother'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [
      { kind: 'hasRelation', relationKind: 'partner' },
      { kind: 'notHasRole', role: 'family_approved' },
    ],
    roles: {
      partner: ['partner', { minAge: 18, maxAge: 46 }],
      mother: ['parent', { minAge: 38, maxAge: 82, sex: 'female' }],
    },
    outcomes: [
      {
        id: 'accepted-at-table',
        w: 0.45,
        text: '{subject}把{partner}领进厨房，{mother}正在切面包，刀没有停。{partner}把带来的果酱放在桌角，说自家做的；{mother}看了一眼，让它搁着。吃饭时，{mother}问了三遍家里的情况，第三遍时语气松了；{partner}走时，{mother}把剩下的半条面包塞进了{partner}的口袋。',
        significance: 0.76,
        fx: {
          cash: -2,
          relation: ['mother', 'kin', 0.14, 0.04],
          relation2: ['partner', 'partner', 0.12, 0.08],
          role: 'family_approved',
          flag: 'partner_accepted_at_family_table',
          knowledge: ['the mother sent half a loaf home with the partner', 0.85, 'mother'],
        },
      },
      {
        id: 'cold-meal',
        w: 0.3,
        text: '{mother}全程没有问{partner}的名字，只把盐罐放在自己手边。{partner}试着夸汤好喝，{mother}说盐放多了。饭后，{subject}送{partner}到楼梯口，听见厨房里碗碟碰得很响；回到屋里，{mother}已经在擦桌子，抹布把桌面擦得发白。',
        significance: 0.66,
        fx: {
          mood: -0.1,
          relation: ['mother', 'rival', -0.12, 0],
          relation2: ['partner', 'partner', 0.06, 0.02],
          condition: 'family_disapproval',
          flag: 'partner_coldly_received',
        },
      },
      {
        id: 'mother-leaves-table',
        w: 0.25,
        text: '汤刚端上来，{mother}就站起来，说自己不舒服，回屋躺下。{partner}端着碗不知该不该喝；{subject}去敲门，门从里面拴上了。那顿饭最后只有两个人吃，{partner}把碗洗了，{subject}听见母亲在屋里翻身，床板响了一夜。',
        significance: 0.72,
        when: { maxCash: 3 },
        fx: {
          mood: -0.12,
          relation: ['mother', 'rival', -0.16, 0],
          relation2: ['partner', 'partner', 0.1, 0.04],
          condition: 'family_disapproval',
          flag: 'mother_left_the_table',
        },
      },
    ],
    task: taskMeta('family', ['family', 'belonging'], ['belonging', 'status'], 0.72, 0.2, [
      'social',
    ]),
  },

  // 49. Keep a family secret ----------------------------------------------
  {
    id: 'r13-fam.keep-family-secret',
    title: '柜子最底层那张纸',
    domain: 'family',
    kind: 'task',
    stage: 'adulthood',
    ages: [16, 72],
    tags: ['task', 'family', 'secret', 'reputation', 'sibling', 'fear'],
    contexts: URBAN,
    milieus: HOME,
    roles: {
      sibling: ['sibling', { minAge: 14, maxAge: 74 }],
      neighbour: ['neighbor', { minAge: 25, maxAge: 80 }],
    },
    outcomes: [
      {
        id: 'secret-kept',
        w: 0.4,
        text: '{neighbour}在楼道里拦住{subject}，问家里那张盖红章的纸是不是出了事。{subject}说只是旧房租收据，回家却把纸从柜底翻出来，和{sibling}一起塞进米缸夹层。两人把米重新铺平，{sibling}的手一直在抖；{subject}说这事到此为止，谁也别再提。',
        significance: 0.76,
        fx: {
          relation: ['sibling', 'kin', 0.12, 0.02],
          relation2: ['neighbour', 'acquaintance', -0.04, 0],
          condition: 'family_secret',
          role: 'keeper_of_family_secret',
          flag: 'hid_family_paper_in_rice_bin',
          knowledge: ['the paper is hidden between the rice bin’s layers', 0.9],
        },
      },
      {
        id: 'secret-exposed',
        w: 0.35,
        text: '{neighbour}不知道从哪里听说了纸上的名字，整条走廊都在传。{subject}回家时，{sibling}正把柜子里的东西翻了一地，说早该烧掉。两人吵到半夜，{subject}把纸摊在灯下，第一次读完最后一行；纸上的日期比{subject}记得的早了三年。',
        significance: 0.8,
        fx: {
          reputation: -0.12,
          relation: ['sibling', 'rival', -0.16, 0],
          relation2: ['neighbour', 'rival', -0.18, 0],
          condition: 'family_shame',
          flag: 'family_secret_exposed',
          knowledge: ['the paper is three years older than the family claimed', 0.9],
        },
      },
      {
        id: 'paper-burned',
        w: 0.25,
        text: '{subject}把纸凑到炉口，火苗舔到边角时，{sibling}伸手抢了一下，纸被撕成两半。两人各拿一半，看着火把字迹吃掉；最后{subject}把剩下的一半也丢进去，说这样就没人能拿来要挟。{sibling}没有说话，只把炉门关上。',
        significance: 0.7,
        when: { maxCash: 2 },
        fx: [
          {
            mood: -0.08,
            relation: ['sibling', 'kin', 0.06, 0],
            condition: 'family_secret',
            role: 'keeper_of_family_secret',
            flag: 'burned_family_paper',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'secret-crisis',
        when: { contextTags: ['crisis'] },
        title: '门房带来的两个人',
        outcomes: [
          {
            id: 'police-search',
            w: 0.55,
            text: '两个便衣跟着门房上楼，说要查一份“反动传单”。{subject}把柜底的纸塞进{neighbour}送来的面粉袋，又抓了一把面盖住。{sibling}站在门口拖时间，说家里只有老人和孩子；便衣翻到米缸时，{subject}的膝盖一直在抖。',
            significance: 0.86,
            fx: [
              {
                relation: ['sibling', 'kin', 0.16, 0.04],
                relation2: ['neighbour', 'friend', 0.12, 0],
                condition: 'family_secret',
                role: 'keeper_of_family_secret',
                flag: 'hid_paper_during_police_search',
                knowledge: [
                  'the police were looking for a printed leaflet, not the family paper',
                  0.9,
                ],
              },
            ],
          },
          {
            id: 'paper-surrendered',
            w: 0.45,
            text: '{subject}把纸从柜底拿出来，交给便衣，说这是家里留下的旧账。便衣对着灯看了很久，问立字的人现在在哪里；{subject}说死了。他们把纸折好带走，临走时记下了门牌。{sibling}从里屋出来，问交了什么，{subject}说一张没用的旧纸。',
            significance: 0.82,
            fx: [
              {
                reputation: -0.08,
                relation: ['sibling', 'kin', -0.12, 0],
                condition: 'family_secret_surrendered',
                flag: 'gave_family_paper_to_police',
                knowledge: ['the police recorded the family’s address', 0.9],
              },
            ],
          },
        ],
      },
    ],
    task: taskMeta('family', ['family', 'survival'], ['belonging', 'status'], 0.78, 0.34, [
      'social',
    ]),
  },

  // 50. Teach a parent to read --------------------------------------------
  {
    id: 'r13-fam.teach-parent-to-read',
    title: '在厨房桌上写自己的名字',
    domain: 'care',
    kind: 'task',
    stage: 'adulthood',
    ages: [14, 60],
    tags: ['task', 'care', 'literacy', 'parent', 'school', 'intergenerational'],
    contexts: URBAN,
    milieus: HOME,
    roles: {
      parent: ['parent', { minAge: 40, maxAge: 84 }],
    },
    outcomes: [
      {
        id: 'name-written',
        w: 0.45,
        text: '{subject}把面粉撒在桌上抹平，用指头写了一个“M”，让{parent}照着画。{parent}的手指粗得像胡萝卜，第一笔就戳穿了面层；{subject}又抹平一次，这次握着老人的手腕慢慢走。写到自己的名字时，{parent}忽然笑了，说原来这几个弯是这个意思。',
        significance: 0.76,
        fx: [
          {
            relation: ['parent', 'kin', 0.18, 0.08],
            role: 'teacher_of_parent',
            flag: 'taught_parent_to_write_name',
            skill: { literacy: 0.02 },
          },
          {
            raw: [
              {
                type: 'skill',
                personId: '$parent',
                skill: 'literacy',
                amount: 0.06,
                reason: 'learned to write their own name in flour',
              },
            ],
          },
        ],
      },
      {
        id: 'parent-gives-up',
        w: 0.3,
        text: '写到第三遍，{parent}把手指在围裙上擦了擦，说这玩意儿不是给自己这个年纪的人学的。{subject}还想劝，老人已经起身去灶边看火；桌上那层撒平的面粉留着半个字，被热气慢慢洇湿。晚上，{subject}把那张写着名字的纸压在盐罐底下。',
        significance: 0.64,
        fx: [
          {
            mood: -0.06,
            relation: ['parent', 'kin', 0.06, 0.02],
            flag: 'parent_gave_up_reading_lessons',
          },
          {
            raw: [
              {
                type: 'condition',
                personId: '$parent',
                condition: 'parent_literacy_stalled',
                add: true,
                reason: 'the parent gave up the reading lessons',
              },
            ],
          },
        ],
      },
      {
        id: 'parent-ashamed',
        w: 0.25,
        text: '{parent}写错了一笔，{subject}笑了一声，老人立刻把面粉抹平，说早就说过学不会。那晚{parent}没有吃饭，第二天却把{subject}的旧课本从柜顶拿下来，放在桌上，什么也没有说。{subject}翻开书，发现扉页上多了一个歪歪扭扭的签名。',
        significance: 0.7,
        when: { skill: { name: 'literacy', min: 0.3 } },
        fx: [
          {
            relation: ['parent', 'kin', -0.08, 0.04],
            flag: 'parent_learned_alone_at_night',
            skill: { literacy: 0.02 },
          },
          {
            raw: [
              {
                type: 'skill',
                personId: '$parent',
                skill: 'literacy',
                amount: 0.03,
                reason: 'practised a signature alone after being laughed at',
              },
              {
                type: 'condition',
                personId: '$parent',
                condition: 'humiliated_parent',
                add: true,
                reason: 'the parent was humiliated during the lesson',
              },
            ],
          },
        ],
      },
    ],
    variants: [
      {
        id: 'teach-parent-reform',
        when: { contextTags: ['reform'] },
        title: '夜校的报名表',
        outcomes: [
          {
            id: 'night-class',
            w: 0.6,
            text: '市政厅办起了工人夜校，{subject}替{parent}去报名。管登记的人问年龄，{subject}报小了五岁；{parent}在旁边扯{subjectPronoun}的袖子，最后自己说“四十七”。第一晚回家，老人把发的铅笔用布包好，说老师夸{parent}握笔稳。',
            significance: 0.8,
            fx: [
              {
                cash: -1,
                relation: ['parent', 'kin', 0.2, 0.1],
                role: 'teacher_of_parent',
                flag: 'enrolled_parent_in_night_school',
                knowledge: ['the adult night school takes workers after the evening shift', 0.9],
              },
              {
                raw: [
                  {
                    type: 'skill',
                    personId: '$parent',
                    skill: 'literacy',
                    amount: 0.08,
                    reason: 'began attending a workers’ night school',
                  },
                  {
                    type: 'condition',
                    personId: '$parent',
                    condition: 'adult_school_enrolled',
                    add: true,
                    reason: 'enrolled at the workers’ night school',
                  },
                ],
              },
            ],
          },
          {
            id: 'school-full',
            w: 0.4,
            text: '夜校的名额满了，登记的人让下个季度再来。{parent}把报名表折好，说本来也不是非学不可；{subject}看见{parent}把那张纸夹进了祈祷书。回家的电车上，{parent}一直看着窗外的招牌，忽然问{subject}那个字念什么。',
            significance: 0.72,
            fx: [
              {
                relation: ['parent', 'kin', 0.1, 0.04],
                flag: 'night_school_waitlist',
                knowledge: ['the parent keeps the enrolment form in the prayer book', 0.8],
              },
              {
                raw: [
                  {
                    type: 'condition',
                    personId: '$parent',
                    condition: 'parent_literacy_stalled',
                    add: true,
                    reason: 'the night school place was full',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    task: taskMeta('care', ['care', 'knowledge'], ['care', 'belonging'], 0.7, 0.1, [
      'literacy',
      'social',
    ]),
  },
]);
