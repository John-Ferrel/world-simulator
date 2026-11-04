import type { RoleRequirement } from '../../../domain.js';
import type { PlotKernel } from '../../../composition/types.js';
import { recipes, taskMeta } from './kit.js';
import type { RoleDecl } from './kit.js';

/**
 * Phase 14 · social echoes.
 *
 * Friendship, enmity, reputation and social debt over decades. Seeds are
 * ordinary social incidents; the consequences require the earlier event by
 * semantic tag, and the returning person is cast from people who actually
 * shared that event (`sharedHistoryTag`), never from a fresh stranger.
 *
 * Every number in the prose is the number in the effect. A rumour that costs a
 * job produces an `unemployment` effect; a death in the coffeehouse is a
 * committed `death`; a public apology that is accepted changes reputation and
 * leaves a flag that later scenes can read.
 */

const URBAN = [
  'vienna',
  'urban',
  'peace',
  'industrial',
  'war',
  'postwar',
  'reform',
  'crisis',
  'scarcity',
];
const HOME = ['home', 'family', 'neighbor', 'poverty', 'everyday'];
const CAFE = ['culture', 'cafe', 'art', 'writing', 'debate'];
const SHOP = ['work', 'shop', 'market', 'merchant', 'customer'];
const WORK = ['work', 'factory', 'print', 'craft', 'foreman', 'injury', 'union'];
const MARKET = ['work', 'shop', 'market', 'merchant', 'customer'];
const GOV = ['official', 'bureaucracy', 'state', 'papers', 'public_service'];
const WAR = ['war', 'army', 'soldier', 'front', 'mobilization'];

type LinkedRoleOptions = Exclude<RoleDecl, string>[1] & { sharedHistoryTag: string };

/** A role that may only be filled by someone who shared a tagged event. */
const linked = (kind: RoleRequirement['kind'], options: LinkedRoleOptions): RoleDecl => [
  kind,
  options,
];

export const BATCH14_SOCIAL_ECHOES: PlotKernel[] = recipes([
  // 1 ─ A childhood oath ──────────────────────────────────────────────────────
  {
    id: 'r14-soc.childhood-oath',
    title: '砖墙根下的铜纽扣',
    domain: 'relationship',
    stage: 'childhood',
    ages: [6, 11],
    tags: ['childhood_friendship', 'childhood_oath', 'poverty', 'loyalty', 'neighbor'],
    contexts: URBAN,
    milieus: HOME,
    roles: {
      friend: ['neighbor', { minAge: 5, maxAge: 11 }],
    },
    outcomes: [
      {
        id: 'pricked-thumbs',
        w: 0.45,
        text: '后院的砖墙根下，两个孩子用缝衣针扎破拇指，把血按在一起，换了一枚磨亮的黄铜纽扣和半截铅笔头。{friend}说谁家先搬走，谁就把纽扣寄回来；{subject}把纽扣缝进衬衣内袋，针脚歪得像一条小路。第二天，{friend}家的行李车停在了巷口，车板上还搁着没来得及收的煤油灯。',
        significance: 0.6,
        fx: {
          relation: ['friend', 'friend', 0.18, 0.1],
          flag: 'childhood_blood_oath',
          skill: { social: 0.01 },
          mood: 0.06,
        },
      },
      {
        id: 'shared-last-bread',
        w: 0.3,
        text: '面包房后门的泔水桶边，{friend}捡起半块没沾灰的黑面包，掰成两半。{subject}把大的那半推回去，说自己早上吃过；其实{subject}的胃从昨夜就在叫。两人蹲在台阶上吃完，约好谁也不许把这件事说出去。多年后{subject}仍记得，那半块面包边上有股煤灰味。',
        significance: 0.58,
        fx: {
          cash: -1,
          relation: ['friend', 'friend', 0.12, 0.08],
          flag: 'shared_last_bread',
          mood: 0.05,
        },
      },
      {
        id: 'told-the-clinic-secret',
        w: 0.25,
        text: '{subject}把母亲每月去郊区诊所的事告诉了{friend}，包括那张写着“神经衰弱”的纸和父亲夜里摔杯子的声音。{friend}听完，只把口袋里的玻璃弹珠全倒出来，说换着玩，谁也别提。那枚弹珠在{subject}的枕头下放了十几年；母亲后来再没提过那张纸，{friend}也再没问。',
        significance: 0.62,
        fx: {
          relation: ['friend', 'friend', 0.2, 0.12],
          knowledge: ['the subject mother attends a nerve clinic', 0.75, 'friend'],
          flag: 'childhood_secret_shared',
          mood: -0.03,
        },
      },
    ],
    baseRate: 0.05,
    cooldownYears: 8,
  },

  // 2 ─ A rich child's friendship ─────────────────────────────────────────────
  {
    id: 'r14-soc.patron-child',
    title: '铁栅栏后面的奶油蛋糕',
    domain: 'relationship',
    stage: 'childhood',
    ages: [7, 11],
    tags: ['cross_class_childhood', 'childhood_friendship', 'charity', 'shame', 'class'],
    contexts: URBAN,
    milieus: HOME,
    roles: {
      richChild: ['neighbor', { minAge: 6, maxAge: 11 }],
      gatekeeper: ['worker', { minAge: 25, maxAge: 60 }],
    },
    outcomes: [
      {
        id: 'invited-to-the-garden',
        w: 0.4,
        text: '{richChild}从铁栅栏后面招手，让{subject}从厨房旁的侧门进去。花园里有钢琴、一只吃饱的猫和一盘没动过的奶油蛋糕。{gatekeeper}盯着{subject}的鞋，{richChild}却把最大的那块推到{subject}面前，说吃不完也是喂猫。那天回家，{subject}的鞋底沾着花园里的湿土，舍不得刮掉，像把整条巷子关在门外。',
        significance: 0.64,
        fx: {
          cash: 1,
          relation: ['richChild', 'friend', 0.15, 0.1],
          flag: 'cross_class_pen_pal',
          mood: 0.1,
        },
      },
      {
        id: 'turned-away-at-the-door',
        w: 0.35,
        text: '{subject}拎着母亲让送去的醋栗站在别墅正门，{richChild}正和穿水手服的表亲们拍照。{richChild}看了{subject}一眼，说送错门了。{gatekeeper}把醋栗接过去，顺手放在门房外的台阶上。{subject}走回巷子时，听见身后钢琴又响起来；那篮醋栗第二天出现在厨房的垃圾桶里，谁也没再提。',
        significance: 0.62,
        fx: {
          relation: ['richChild', 'acquaintance', -0.08],
          mood: -0.12,
          flag: 'turned_away_at_villa',
          reputation: -0.02,
        },
      },
      {
        id: 'borrowed-lessons',
        w: 0.25,
        text: '{gatekeeper}在厨房教{subject}认了半页字母，条件是别让女主人看见。{richChild}把用剩的练习本塞过来，封面上还印着校徽。{subject}拿回家，用橡皮擦了三遍，才敢在第一页写下自己的名字。那本练习本后来被翻得掉了封皮，第一页的名字还在，封皮上的校徽被擦得只剩一圈金边。',
        significance: 0.7,
        fx: {
          skill: { literacy: 0.03 },
          relation: ['richChild', 'friend', 0.1],
          knowledge: ['the alphabet came from a rich household cook', 0.7, 'gatekeeper'],
          flag: 'borrowed_lessons',
          mood: 0.08,
        },
      },
    ],
    baseRate: 0.05,
    cooldownYears: 10,
  },

  // 3 ─ Class mobility and the old patron ─────────────────────────────────────
  {
    id: 'r14-soc.class-mobility-return',
    title: '绸布庄的旧账本',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [25, 59],
    tags: ['cross_class_childhood', 'class_mobility', 'old_friends', 'shame', 'money'],
    contexts: URBAN,
    milieus: [...HOME, ...CAFE, ...SHOP],
    conditions: [{ kind: 'history', tag: 'cross_class_childhood', minYearsAgo: 12 }],
    roles: {
      oldPatron: linked('neighbor', {
        minAge: 22,
        maxAge: 65,
        sharedHistoryTag: 'cross_class_childhood',
      }),
    },
    outcomes: [
      {
        id: 'hired-the-old-patron',
        w: 0.4,
        text: '{oldPatron}家家道中落后把绸布庄盘给了别人，如今站在柜台外，问{subject}的铺子要不要一个会记账的人。{subject}想起那年被拦在别墅正门外，还是让{oldPatron}进了后间。工钱定得比市价低两成，两人都没有提旧事。第一个月结账时，{oldPatron}把算盘拨得很慢，像在等谁先开口。',
        significance: 0.76,
        fx: {
          cash: -4,
          relation: ['oldPatron', 'colleague', 0.1],
          flag: 'hired_old_patron',
          knowledge: ['the old patron family lost the drapery business', 0.8],
          mood: 0.05,
        },
        followup: { sceneId: 'r14-soc.reunion-dinner', delayMonths: 180 },
      },
      {
        id: 'took-the-old-money',
        w: 0.35,
        text: '{oldPatron}约在咖啡馆，把一张十克朗的纸币压在杯垫下，说当年欠{subject}家一顿饭。{subject}收下了，又觉得那只戴惯戒指的手在发抖。两人谈到第三杯咖啡，谁也没有提花园、钢琴和那盘奶油蛋糕。回家后，那张纸币被{subject}压在米缸底下，一直没花。米缸见底时，那张纸还在。',
        significance: 0.7,
        fx: {
          cash: 10,
          relation: ['oldPatron', 'acquaintance', -0.05],
          flag: 'took_old_patron_money',
          mood: -0.08,
        },
        followup: { sceneId: 'r14-soc.reunion-dinner', delayMonths: 120 },
      },
      {
        id: 'still-equals',
        w: 0.25,
        text: '两人在电车候车棚里碰见，一个提着账本，一个提着药包。{oldPatron}说今年的煤又贵了，{subject}说巷口的自来水还是浑的。电车来了，两人挤在同一块踏板上，像小时候挤同一道墙缝。下车时两人往相反方向走，走了几步又同时回头，车灯把两张脸照得很旧。',
        significance: 0.62,
        fx: {
          relation: ['oldPatron', 'friend', 0.08, 0.05],
          flag: 'shared_tram_with_old_patron',
          mood: 0.05,
        },
        followup: { sceneId: 'r14-soc.reunion-dinner', delayMonths: 180 },
      },
    ],
    baseRate: 0.04,
    cooldownYears: 15,
  },

  // 4 ─ Friendship tested by money ────────────────────────────────────────────
  {
    id: 'r14-soc.friendship-money-test',
    title: '借据背面的“不急”',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [25, 45],
    tags: ['childhood_friendship', 'friendship_debt', 'money', 'trust', 'class'],
    contexts: URBAN,
    milieus: [...HOME, ...CAFE, ...SHOP],
    conditions: [{ kind: 'history', tag: 'childhood_friendship', minYearsAgo: 8 }],
    roles: {
      oldFriend: linked('neighbor', {
        minAge: 22,
        maxAge: 55,
        sharedHistoryTag: 'childhood_friendship',
      }),
    },
    outcomes: [
      {
        id: 'signed-the-note',
        w: 0.4,
        text: '{oldFriend}把一张写好的借据摊在咖啡杯旁边，要借二十克朗盘下街角的烟草铺。{subject}数出两张十克朗，又在借据背面添了一句“不急”。{oldFriend}把借据折成四折，塞进表壳后面，说等铺子开了张，第一包烟算{subject}的。三个月后，烟草铺的招牌挂了出来，第一包烟确实留在了柜台后面。',
        significance: 0.76,
        fx: {
          cash: -20,
          relation: ['oldFriend', 'friend', 0.15, 0.05],
          flag: 'loaned_twenty_kronen',
          knowledge: ['the tobacco shop lease costs twenty kronen', 0.8, 'oldFriend'],
        },
      },
      {
        id: 'refused-the-loan',
        w: 0.3,
        text: '{subject}把借据推回去，说家里的房租也欠着。{oldFriend}没有争，只把借据对折，再对折，收进内袋。两人把咖啡喝完，{oldFriend}先站起来，椅子在地板上刮出很长一声。那晚{subject}在账本上把欠租的数目又算了一遍，算到灯芯烧短。第二天，{oldFriend}的烟草铺没有开门。卷帘门上落着一把新锁。',
        significance: 0.68,
        fx: {
          relation: ['oldFriend', 'rival', -0.2],
          mood: -0.12,
          flag: 'refused_old_friend_loan',
        },
      },
      {
        id: 'co-signed-at-the-bank',
        w: 0.3,
        text: '{subject}没有掏钱，而是在银行柜台前替{oldFriend}做了担保。职员把印章举起来，问担保人是否知道后果。{subject}说知道，{oldFriend}在旁边低声说“三月一定还”。印章落下去，声音像一枚钉子。三月到了，银行的催款单先寄到{subject}家，信封上写着两个人的名字。两家人都不愿先提这笔账。',
        significance: 0.74,
        fx: {
          cash: -4,
          relation: ['oldFriend', 'friend', 0.12],
          flag: 'cosigned_old_friend_note',
          knowledge: ['the bank note falls due in March', 0.85, 'oldFriend'],
        },
        followup: { sceneId: 'r14-soc.reunion-dinner', delayMonths: 180 },
      },
    ],
    baseRate: 0.044,
    cooldownYears: 10,
  },

  // 5 ─ A reunion dinner ───────────────────────────────────────────────────────
  {
    id: 'r14-soc.reunion-dinner',
    title: '第三把椅子上的Gugelhupf',
    domain: 'social',
    stage: 'adulthood',
    ages: [45, 59],
    tags: ['childhood_friendship', 'reunion', 'memory', 'grief', 'class'],
    contexts: URBAN,
    milieus: CAFE,
    conditions: [{ kind: 'history', tag: 'childhood_friendship', minYearsAgo: 20 }],
    roles: {
      oldFriend: linked('neighbor', {
        minAge: 40,
        maxAge: 70,
        sharedHistoryTag: 'childhood_friendship',
      }),
    },
    outcomes: [
      {
        id: 'third-chair-kept',
        w: 0.45,
        text: '{oldFriend}比约定早到半小时，坐在咖啡馆最里面那把椅子上，桌上摆着两杯已经凉了的Melange。{subject}进门时，{oldFriend}从口袋里摸出那枚黄铜纽扣，放在桌布上，说“你当年缝得真难看”。两人笑到咳嗽，侍者又端来一块Gugelhupf。临走时{oldFriend}把纽扣留在桌布上，说“下回该你带”。',
        significance: 0.78,
        fx: {
          cash: -3,
          mood: 0.12,
          relation: ['oldFriend', 'friend', 0.2, 0.15],
          flag: 'reunion_dinner_kept',
        },
        followup: { sceneId: 'r14-soc.old-friend-dies', delayMonths: 120 },
      },
      {
        id: 'split-by-politics',
        w: 0.3,
        text: '第三杯咖啡上来时，{oldFriend}开始夸街口新贴的标语，{subject}把勺子放下，说那条街上被抓走的人里有一个是排字房的学徒。两人越说越快，最后{oldFriend}把餐巾揉成一团，说“你还是老样子”。杯子没有碎，盘子里的蛋糕剩了一半；出门后两人朝相反方向走，谁也没有回头。',
        significance: 0.72,
        fx: {
          relation: ['oldFriend', 'rival', -0.2],
          mood: -0.15,
          flag: 'reunion_split_by_politics',
        },
      },
      {
        id: 'empty-chair',
        w: 0.25,
        text: '{oldFriend}没有来，只托跑堂带来一张明信片，说医生不许再喝咖啡，改日再约。{subject}一个人把两份蛋糕吃完，把给{oldFriend}留的那枚纽扣又揣回内袋。出门时，雨把明信片上的字洇成一片蓝；跑堂收走另一只杯子时问要不要打包，{subject}说不用了。盘子里的另一份蛋糕被跑堂收走了。',
        significance: 0.64,
        fx: {
          cash: -2,
          mood: -0.08,
          relation: ['oldFriend', 'acquaintance', 0.05],
          flag: 'reunion_stood_up',
        },
      },
    ],
    baseRate: 0.024,
    cooldownYears: 10,
  },

  // 6 ─ The old photograph and the lost letter ────────────────────────────────
  {
    id: 'r14-soc.old-photograph',
    title: '大衣衬里的旧合影',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [45, 59],
    tags: ['childhood_friendship', 'old_photograph', 'lost_letter', 'memory', 'class'],
    contexts: URBAN,
    milieus: [...HOME, ...CAFE],
    conditions: [{ kind: 'history', tag: 'childhood_friendship', minYearsAgo: 25 }],
    roles: {
      oldFriend: linked('neighbor', {
        minAge: 40,
        maxAge: 70,
        sharedHistoryTag: 'childhood_friendship',
      }),
    },
    outcomes: [
      {
        id: 'letter-in-the-lining',
        w: 0.4,
        text: '{subject}拆开旧大衣的衬里，摸出一张发黄的班级合影和一封没有邮票的信。照片上的人站成一排，最左边的脸被水渍糊掉了；信里写着“等攒够船票钱就走”。{oldFriend}凑过来看，说那个糊掉的人不是我们班的。{subject}把信翻过来，封口处的胶已经发脆，落款是一个不认识的姓。',
        significance: 0.72,
        fx: {
          knowledge: [
            'a class photograph and an unsent letter were hidden in the coat lining',
            0.85,
          ],
          flag: 'found_lost_letter',
          mood: 0.05,
          relation: ['oldFriend', 'friend', 0.08],
        },
        followup: { sceneId: 'r14-soc.reunion-dinner', delayMonths: 6 },
      },
      {
        id: 'burned-unread',
        w: 0.3,
        text: '{subject}把信举到煤气灯口，火苗从一角咬进去，纸灰落在炉盖上。{oldFriend}问写了什么，{subject}说“没什么，都是旧账”。照片被塞回衬里，针脚重新缝好，只是比原来歪了一寸。{oldFriend}看着炉盖上的黑边，没有再问；那晚两人各自回家，楼梯上只听见鞋跟声。那件大衣后来再没有补过。',
        significance: 0.66,
        fx: {
          mood: -0.05,
          relation: ['oldFriend', 'acquaintance', -0.05],
          flag: 'burned_lost_letter',
        },
      },
      {
        id: 'posted-the-photograph',
        w: 0.3,
        text: '{subject}花两克朗把照片装进硬纸夹，寄给照片背面写着地址的那户人家。{oldFriend}说地址早就拆了，邮局只会退回。三周后，退件真的来了，信封上多了一行陌生人的字：“此人已迁往格拉茨”。{subject}把退件夹进相框背板，和原来的照片放在一起，像把两个人重新关进同一个抽屉。',
        significance: 0.68,
        fx: {
          cash: -2,
          relation: ['oldFriend', 'friend', 0.1],
          knowledge: ['the photographed classmate moved to Graz', 0.7],
          flag: 'posted_old_photograph',
          mood: -0.03,
        },
        followup: { sceneId: 'r14-soc.reunion-dinner', delayMonths: 6 },
      },
    ],
    baseRate: 0.02,
    cooldownYears: 12,
  },

  // 7 ─ An old friend dies ────────────────────────────────────────────────────
  {
    id: 'r14-soc.old-friend-dies',
    title: '咖啡馆窗边的勺子',
    domain: 'relationship',
    stage: 'elderhood',
    ages: [60, 85],
    tags: ['childhood_friendship', 'friend_death', 'grief', 'mortality'],
    contexts: URBAN,
    milieus: CAFE,
    conditions: [{ kind: 'history', tag: 'childhood_friendship', minYearsAgo: 20 }],
    roles: {
      oldFriend: linked('neighbor', {
        minAge: 55,
        maxAge: 90,
        sharedHistoryTag: 'childhood_friendship',
      }),
    },
    outcomes: [
      {
        id: 'stroke-at-the-table',
        w: 0.35,
        text: '{oldFriend}在咖啡馆靠窗的位置上突然低下头，勺子掉进杯子里。{subject}扶住那副瘦下去的肩膀，闻到一股药味。救护车来之前，跑堂已经把隔壁桌的客人请到门外。医生说是中风，葬在圣马克斯公墓，{subject}在坟前放了一枚黄铜纽扣。那副眼镜被{subject}收进抽屉，镜腿上还缠着一圈旧胶布。',
        significance: 0.9,
        fx: {
          cash: -6,
          mood: -0.3,
          health: -0.03,
          flag: 'buried_old_friend',
          raw: [
            {
              type: 'death',
              personId: '$oldFriend',
              cause: 'a stroke at the coffeehouse table',
              reason: 'the old friend collapsed over a coffee cup and did not wake',
            },
          ],
        },
      },
      {
        id: 'lost-speech',
        w: 0.4,
        text: '中风没有带走{oldFriend}，只带走了话。{subject}每周三去公寓，把报纸上的讣告念给{oldFriend}听，念到熟悉的名字就停一停。{oldFriend}用左手在床单上敲两下，意思是知道了。窗外晾着的床单被风吹起来，又落下去；{subject}把报纸翻到下一版，继续念。念完讣告，{subject}把报纸叠好，放在床头。',
        significance: 0.74,
        fx: {
          mood: -0.1,
          relation: ['oldFriend', 'friend', 0.2, 0.15],
          flag: 'nursed_old_friend_after_stroke',
        },
      },
      {
        id: 'moved-to-graz',
        w: 0.25,
        text: '{oldFriend}的女儿从格拉茨来接人，行李只有一只藤箱和那副总也擦不干净的眼镜。{subject}送到车站，{oldFriend}隔着车窗比了一个小时候割拇指的手势。火车开走后，站台上的钟还在走。三个月后，{oldFriend}寄来一张格拉茨的明信片，字是女儿代写的，只问候了一句。',
        significance: 0.7,
        fx: {
          relation: ['oldFriend', 'acquaintance', 0.1],
          mood: -0.12,
          flag: 'old_friend_moved_to_graz',
          knowledge: ['the old friend moved to Graz to live with a daughter', 0.8],
        },
        followup: { sceneId: 'r14-soc.old-photograph', delayMonths: 12 },
      },
    ],
    baseRate: 0.012,
    cooldownYears: 25,
  },

  // 8 ─ A denunciation in the printshop ───────────────────────────────────────
  {
    id: 'r14-soc.printshop-denunciation',
    title: '纸库后面的名字',
    domain: 'work',
    stage: 'adulthood',
    ages: [18, 40],
    tags: ['denunciation', 'workplace_rivalry', 'politics', 'print', 'fear'],
    contexts: URBAN,
    milieus: WORK,
    conditions: [{ kind: 'employment', employed: true }],
    roles: {
      rival: ['worker', { minAge: 18, maxAge: 45 }],
    },
    outcomes: [
      {
        id: 'named-the-setter',
        w: 0.35,
        text: '工头把{subject}叫到纸库后面，问昨夜是谁偷偷排了那张罢工传单。{subject}看见{rival}的字架还亮着灯，就说出了那个名字。第二天，{rival}的工票从板上被摘下来。工头拍了拍{subject}的肩，手掌很重。{subject}回到字架前，手心里全是汗，铅字却一个也没有排错。午休时没有人叫{subject}去吃饭。',
        significance: 0.78,
        fx: {
          relation: ['rival', 'rival', -0.4],
          reputation: -0.05,
          flag: 'denounced_workmate',
          knowledge: ['the foreman was looking for the handbill setter', 0.9],
        },
        followup: { sceneId: 'r14-soc.betrayal-apology', delayMonths: 180 },
      },
      {
        id: 'warned-the-setter',
        w: 0.4,
        text: '{subject}在洗手池边拦住{rival}，说工头已经知道了。两人把剩下的传单塞进锅炉，火苗从铁门缝里蹿出来。{rival}把手上的油墨洗了三遍，说“欠你一次”。工头进来时，只看见两个人在擦同一块肥皂。第二天，工头在纸上找不到一个名字，排字房照常开了工。',
        significance: 0.76,
        fx: {
          relation: ['rival', 'friend', 0.2, 0.05],
          flag: 'warned_workmate',
          condition: 'fear_of_dismissal',
          mood: 0.03,
        },
      },
      {
        id: 'kept-silent',
        w: 0.25,
        text: '{subject}说自己什么也没看见。工头盯了很久，最后让所有人把工票摊在桌上。警察进来时，排字房安静得能听见铅字落进字盘的声音。{rival}没有看{subject}，{subject}也没有看回去。下班后，{rival}在门口等了一会儿，见{subject}出来，只点了一下头，就先走了。那张工票在桌上留到下班。',
        significance: 0.7,
        fx: {
          relation: ['rival', 'acquaintance', 0.05],
          mood: -0.1,
          condition: 'questioned_over_handbill',
          flag: 'questioned_over_handbill',
        },
      },
    ],
    baseRate: 0.024,
    cooldownYears: 10,
  },

  // 9 ─ The betrayal apology ──────────────────────────────────────────────────
  {
    id: 'r14-soc.betrayal-apology',
    title: '洗手池边的旧工票',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [35, 59],
    tags: ['denunciation', 'betrayal', 'apology', 'workplace_rivalry', 'shame'],
    contexts: URBAN,
    milieus: WORK,
    conditions: [
      { kind: 'history', tag: 'denunciation', minYearsAgo: 10 },
      { kind: 'hasFlag', flag: 'denounced_workmate' },
    ],
    roles: {
      betrayed: linked('worker', {
        minAge: 30,
        maxAge: 70,
        sharedHistoryTag: 'denunciation',
      }),
    },
    outcomes: [
      {
        id: 'washed-hands',
        w: 0.4,
        text: '{subject}在洗手池边等到{betrayed}下班，说那年纸库后面的名字是自己说的。{betrayed}把水龙头关掉，擦干手，说“我知道”，然后从口袋里摸出一张旧工票，背面还留着被摘走的钉子眼。两人没有握手，但一起走到街口才分开。街口的煤气灯刚亮，两人在灯下站了一会儿。',
        significance: 0.76,
        fx: {
          relation: ['betrayed', 'acquaintance', 0.08, 0.05],
          mood: 0.08,
          flag: 'apology_accepted_coolly',
        },
      },
      {
        id: 'spat-on-the-floor',
        w: 0.35,
        text: '{subject}刚说完“对不起”，{betrayed}就往地上啐了一口，说这一句值几个钱。排字房里的人全抬起头。{betrayed}把当年被辞退的事从头数了一遍，声音不大，足够让整条字架听见。{subject}站在原地，直到下班铃响。洗手池的水一直开着，没有人去关；铃响过两遍，{subject}才动。',
        significance: 0.74,
        fx: {
          relation: ['betrayed', 'rival', -0.2],
          reputation: -0.08,
          mood: -0.15,
          flag: 'apology_refused',
        },
      },
      {
        id: 'ten-kronen-reparation',
        w: 0.25,
        text: '{subject}把十克朗装进信封，压在{betrayed}的字盘下面，说不是赔罪，是补那几个月的工钱。{betrayed}数了两遍，抽出一张塞回来，说“利息不要”。两人各拿一半，谁也没有再提纸库。信封被{betrayed}收进围裙内袋，走的时候还按了按，像怕它掉出来。字盘上的铅字被那封信压出了一道浅痕。',
        significance: 0.78,
        fx: {
          cash: -10,
          relation: ['betrayed', 'acquaintance', 0.12],
          flag: 'paid_for_betrayal',
        },
      },
    ],
    baseRate: 0.008,
    cooldownYears: 20,
  },

  // 10 ─ A rumour in the courtyard ────────────────────────────────────────────
  {
    id: 'r14-soc.courtyard-rumor',
    title: '洗衣房拧干的床单',
    domain: 'social',
    stage: 'adulthood',
    ages: [20, 55],
    tags: ['rumor', 'reputation', 'neighbor_conflict', 'shame', 'gender'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [{ kind: 'householdSize', min: 2 }],
    roles: {
      neighbor: ['neighbor', { minAge: 20, maxAge: 65 }],
      washerwoman: ['worker', { minAge: 18, maxAge: 60 }],
    },
    outcomes: [
      {
        id: 'seen-on-the-stairs',
        w: 0.4,
        text: '洗衣房里，{neighbor}把声音压得很低，说昨夜看见{subject}从三楼那个有妇之夫的门口出来，鞋跟还在楼梯上敲了两下。水盆里的床单拧成一股。{subject}站在门口，手里还提着刚买的盐。水盆里的水溅到{subject}的鞋面上，{neighbor}没有再抬头。水盆被端走时，鞋底在湿地上留下一串黑印。',
        significance: 0.74,
        fx: {
          reputation: -0.12,
          condition: 'watched_by_neighbors',
          relation: ['neighbor', 'rival', -0.2],
          flag: 'rumor_target',
          mood: -0.15,
        },
        followup: { sceneId: 'r14-soc.public-humiliation', delayMonths: 6 },
      },
      {
        id: 'slapped-in-the-courtyard',
        w: 0.35,
        text: '{subject}在院子里拦住{neighbor}，让对方把话再说一遍。{neighbor}笑着重复，{subject}的手先落下去。晾衣绳上的床单被扯下来，盖住了一只煤桶。{washerwoman}尖叫着去叫看门人，孩子们趴在每一扇窗后面看。看门人赶来时，{neighbor}已经退到煤堆后面，脸上留着一道红印。看门人把两人分开，谁也没有去捡那条床单。',
        significance: 0.78,
        fx: {
          relation: ['neighbor', 'rival', -0.35],
          reputation: -0.08,
          mood: 0.05,
          flag: 'slapped_rumor_monger',
          condition: 'neighborhood_feud',
        },
        followup: { sceneId: 'r14-soc.public-humiliation', delayMonths: 6 },
      },
      {
        id: 'opened-the-flat-door',
        w: 0.25,
        text: '{subject}把{neighbor}请上楼，推开自己那间屋的门，让对方面对一张空床、一只药罐和母亲的遗像。{neighbor}在门口站了一会儿，说“我也是听来的”。水烧开了，两人谁也没有去提壶。临走时{neighbor}把门带上，动作很轻；第二天，洗衣房里没有人再提那件事。茶壶在炉子上叫了很久，最后自己凉了。',
        significance: 0.66,
        fx: {
          relation: ['neighbor', 'acquaintance', 0.05],
          reputation: 0.03,
          flag: 'disarmed_rumor',
          mood: 0.04,
        },
      },
    ],
    baseRate: 0.04,
    cooldownYears: 8,
  },

  // 11 ─ Public humiliation ────────────────────────────────────────────────────
  {
    id: 'r14-soc.public-humiliation',
    title: '菜市场中央的秤砣',
    domain: 'social',
    stage: 'adulthood',
    ages: [22, 59],
    tags: ['public_humiliation', 'rumor', 'shame', 'reputation', 'market'],
    contexts: URBAN,
    milieus: MARKET,
    conditions: [{ kind: 'history', tag: 'rumor', minYearsAgo: 1 }],
    roles: {
      neighbor: linked('neighbor', {
        minAge: 22,
        maxAge: 70,
        sharedHistoryTag: 'rumor',
      }),
    },
    outcomes: [
      {
        id: 'market-voice',
        w: 0.4,
        text: '{neighbor}在菜市场中央把那句话又喊了一遍，声音压过秤砣落下的响。{subject}手里的纸袋被挤破，土豆滚到鱼摊下面。有人笑，有人低头挑菜。{subject}蹲下去捡，膝盖沾了一层鱼鳞。管理员拿扫帚把土豆从鱼摊下拨出来，{subject}没有道谢。那天回家，{subject}把剩下的菜洗了三遍。',
        significance: 0.82,
        fx: {
          cash: -4,
          reputation: -0.2,
          condition: 'public_shame',
          flag: 'humiliated_at_market',
          mood: -0.25,
        },
      },
      {
        id: 'lost-the-clerkship',
        w: 0.35,
        when: { employment: true },
        text: '那家商行的主任把{subject}叫到门廊，说街上的话已经传到账房，店里不能留一个说不清的人。{subject}把介绍信折好，放回内袋，走的时候还替店里把门带上。回家那条路，比来时多走了两条街。母亲问起工钱，{subject}说店里放了假，第二天照常出门，在公园坐到天黑。',
        significance: 0.8,
        fx: {
          reputation: -0.15,
          unemployment: 'dismissed after a rumor reached the firm',
          flag: 'dismissed_after_rumor',
          mood: -0.2,
        },
      },
      {
        id: 'engagement-broken',
        w: 0.25,
        text: '{subject}的定亲对象家托人送来一只小木盒，里面是定亲时交换的银勺和一张退婚的字条，理由写着“门风”。{subject}把银勺擦亮，放回盒里，没有去敲门。那晚院子里的水管滴了一整夜。退婚的人家后来搬去了另一条街；{subject}再经过那扇门，只看见新刷的绿漆。',
        significance: 0.84,
        fx: {
          mood: -0.3,
          condition: 'engagement_broken',
          flag: 'engagement_broken_by_rumor',
          reputation: -0.1,
        },
      },
    ],
    baseRate: 0.016,
    cooldownYears: 15,
  },

  // 12 ─ The boundary wall ────────────────────────────────────────────────────
  {
    id: 'r14-soc.neighbor-wall',
    title: '半砖界墙',
    domain: 'social',
    stage: 'adulthood',
    ages: [25, 59],
    tags: ['neighbor_conflict', 'property', 'law', 'boundary', 'courtyard'],
    contexts: URBAN,
    milieus: HOME,
    roles: {
      neighbor: ['neighbor', { minAge: 25, maxAge: 70 }],
      official: ['official', { minAge: 25, maxAge: 65 }],
    },
    outcomes: [
      {
        id: 'won-in-court',
        w: 0.35,
        text: '界墙往{subject}这边挪了半砖，{neighbor}说那是祖上留下的线。法院的人来量了两次，最后让{neighbor}把砖拆回去，诉讼费各付一半。{subject}付了八克朗，{official}在收据上盖了一个歪章。墙拆了，两家从此不再借盐。{official}走后，{neighbor}把拆下来的半砖码在自家窗台下，一块也没有扔。',
        significance: 0.74,
        fx: {
          cash: -8,
          relation: ['neighbor', 'rival', -0.2],
          flag: 'won_wall_dispute',
          knowledge: [
            'the court ordered the boundary wall moved back half a brick',
            0.9,
            'official',
          ],
        },
        followup: { sceneId: 'r14-soc.neighbor-rescue', delayMonths: 24 },
      },
      {
        id: 'took-a-hammer',
        w: 0.35,
        text: '夜里，{subject}抡起锤子把那半砖砸下来。{neighbor}披着外套冲出来，碎砖滚进天井，惊动了整栋楼。警察来的时候，墙已经缺了一个人能侧身通过的洞。{official}开了五克朗的罚单，说再动一块砖就上法庭。第二天，{neighbor}在洞口钉了一块铁皮，钉子上还挂着新漆。',
        significance: 0.76,
        fx: {
          cash: -5,
          relation: ['neighbor', 'rival', -0.35],
          flag: 'broke_neighbor_wall',
          condition: 'neighborhood_feud',
          mood: 0.05,
        },
        followup: { sceneId: 'r14-soc.neighbor-rescue', delayMonths: 24 },
      },
      {
        id: 'shared-the-mason',
        w: 0.3,
        text: '{subject}提议两家各出一半钱，请同一个泥瓦匠把墙砌直。{neighbor}算了半天，最后把四克朗放在门槛上，说“料钱你出”。墙砌好那天，两家的孩子已经在墙根下玩同一副石子。泥瓦匠收工时要两家人一起签字，{neighbor}先写了名字，{subject}把日期补上。那袋石灰后来砌进了两家的门槛。',
        significance: 0.7,
        fx: {
          cash: -4,
          relation: ['neighbor', 'colleague', 0.15, 0.05],
          flag: 'shared_fence_cost',
          mood: 0.06,
        },
        followup: { sceneId: 'r14-soc.neighbor-rescue', delayMonths: 36 },
      },
    ],
    baseRate: 0.04,
    cooldownYears: 10,
  },

  // 13 ─ The neighbour rescue ────────────────────────────────────────────────
  {
    id: 'r14-soc.neighbor-rescue',
    title: '三楼冒烟的厨房',
    domain: 'social',
    stage: 'adulthood',
    ages: [30, 59],
    tags: ['neighbor_rescue', 'saved_a_life', 'fire', 'neighbor_conflict', 'courage'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [{ kind: 'history', tag: 'neighbor_conflict', minYearsAgo: 2 }],
    roles: {
      neighbor: linked('neighbor', {
        minAge: 25,
        maxAge: 75,
        sharedHistoryTag: 'neighbor_conflict',
      }),
    },
    outcomes: [
      {
        id: 'carried-through-smoke',
        w: 0.4,
        text: '{neighbor}家的厨房先冒烟，火从煤箱后面蹿上来。{subject}用湿毛巾捂住口鼻，把倒在门边的{neighbor}拖过两级台阶。救护车到时，{subject}的眉毛已经燎掉一半，怀里还抱着对方那只装证件的铁盒。消防员把烧黑的锅拎出来时，{subject}才觉得手掌开始疼。担架抬走时，{subject}还问了一句“铁盒带出来没有”。',
        significance: 0.9,
        fx: {
          health: -0.1,
          condition: 'burned_hands',
          relation: ['neighbor', 'friend', 0.4, 0.2],
          flag: 'saved_neighbor_from_fire',
        },
        followup: { sceneId: 'r14-soc.favor-obligation', delayMonths: 12 },
      },
      {
        id: 'neighbor-broke-the-door',
        w: 0.35,
        text: '{subject}的屋子先起火，烟从门缝灌进走廊。是{neighbor}用劈柴的斧子劈开门板，把{subject}从床沿拖到楼梯口。两人坐在院子里咳到天亮，{neighbor}的手一直按在{subject}的后背上。天亮后，{neighbor}从自家灶上端来一壶热水，说烟味得用热水才洗得掉。那把斧子后来挂在走廊里，谁家有事都去拿。',
        significance: 0.86,
        fx: {
          health: -0.05,
          condition: 'smoke_inhalation',
          relation: ['neighbor', 'friend', 0.3, 0.2],
          flag: 'neighbor_saved_me',
        },
        followup: { sceneId: 'r14-soc.favor-obligation', delayMonths: 12 },
      },
      {
        id: 'courtyard-fire-brigade',
        w: 0.25,
        text: '火从顶楼烧下来时，两家人都挤在院子里，看着消防员把水龙带拖上楼梯。{subject}只抢出一只箱子和那枚旧纽扣，{neighbor}抢出一台缝纫机。天亮后，两人在废墟里分同一壶凉茶。消防员在楼梯口贴了封条，两人只好去街对面的酒馆坐到中午。',
        significance: 0.74,
        fx: {
          cash: -6,
          relation: ['neighbor', 'colleague', 0.1, 0.05],
          flag: 'fire_in_the_building',
          mood: -0.1,
        },
      },
    ],
    baseRate: 0.008,
    cooldownYears: 20,
  },

  // 14 ─ The favour becomes an obligation ────────────────────────────────────
  {
    id: 'r14-soc.favor-obligation',
    title: '藤箱底下的麦粒',
    domain: 'social',
    stage: 'adulthood',
    ages: [32, 59],
    tags: ['favor_obligation', 'neighbor_rescue', 'debt', 'obligation', 'neighbor_conflict'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [{ kind: 'history', tag: 'neighbor_rescue', minYearsAgo: 1 }],
    roles: {
      neighbor: linked('neighbor', {
        minAge: 28,
        maxAge: 80,
        sharedHistoryTag: 'neighbor_rescue',
      }),
    },
    outcomes: [
      {
        id: 'cousin-from-the-country',
        w: 0.4,
        text: '{neighbor}拎着一只藤箱上门，说表弟在城里找不到床位，能不能在{subject}家过一冬。{subject}看着自己那间已经住了四口人的屋子，还是把箱子接了过来。藤箱底下漏出几粒麦子，扫了三遍才干净。表弟在城里待了整整一个冬天，走时把藤箱底下的麦粒扫得干干净净。',
        significance: 0.72,
        fx: {
          cash: -3,
          condition: 'overcrowded_home',
          relation: ['neighbor', 'acquaintance', -0.05],
          flag: 'housed_neighbor_relative',
          mood: -0.05,
        },
        followup: { sceneId: 'r14-soc.favor-returned', delayMonths: 24 },
      },
      {
        id: 'you-owe-me-a-life',
        w: 0.35,
        when: { hasFlag: 'neighbor_saved_me' },
        text: '{neighbor}坐在门槛上，说医生要给腿里取弹片，开口就是十二克朗。“你那条命是我从烟里拖出来的，”{neighbor}说，“我不多要。”{subject}把准备交房租的钱数出来，纸币上还带着煤灰。{subject}把钱数了两遍才递过去，{neighbor}接钱时没有说谢谢。那笔房租后来拖了两个月，房东在门口贴了条子。',
        significance: 0.8,
        fx: {
          cash: -12,
          relation: ['neighbor', 'rival', -0.1],
          flag: 'favor_turned_into_debt',
          mood: -0.12,
        },
        followup: { sceneId: 'r14-soc.favor-returned', delayMonths: 24 },
      },
      {
        id: 'not-a-contract',
        w: 0.25,
        text: '{subject}把门开着一半，说救人的时候没想过要收账。{neighbor}的脸慢慢硬起来，说“行，算我白救”。门关上后，走廊里很久没有脚步声。第二天，两家的垃圾各自堆在各自的门边。那年冬天，两家都没有再借过煤；走廊里的灯坏了，也没有人换。开春后，那盏灯还是坏的。',
        significance: 0.74,
        fx: {
          relation: ['neighbor', 'rival', -0.3],
          flag: 'refused_favor_claim',
          mood: 0.03,
        },
        followup: { sceneId: 'r14-soc.favor-returned', delayMonths: 36 },
      },
    ],
    baseRate: 0.012,
    cooldownYears: 15,
  },

  // 15 ─ The favour returned ─────────────────────────────────────────────────
  {
    id: 'r14-soc.favor-returned',
    title: '糖罐下面的十克朗',
    domain: 'social',
    stage: 'adulthood',
    ages: [35, 59],
    tags: ['favor_returned', 'neighbor_rescue', 'gratitude', 'neighbor_conflict', 'care'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [{ kind: 'history', tag: 'neighbor_rescue', minYearsAgo: 3 }],
    roles: {
      neighbor: linked('neighbor', {
        minAge: 30,
        maxAge: 80,
        sharedHistoryTag: 'neighbor_rescue',
      }),
    },
    outcomes: [
      {
        id: 'nursed-through-typhoid',
        w: 0.4,
        text: '{subject}发高烧的第三夜，是{neighbor}提着冰袋上楼，把湿毛巾一遍遍换在额头上。退烧后，{subject}看见床头放着一小锅已经凉了的汤，汤面上结着一层油。{neighbor}说“当年你拖我出来的时候，也没问值不值”。第二天，{subject}把家里最后一点糖倒进{neighbor}的罐子里，谁也没有提当年的事。',
        significance: 0.82,
        fx: {
          health: 0.1,
          relation: ['neighbor', 'friend', 0.3, 0.2],
          flag: 'neighbor_nursed_me',
          mood: 0.12,
        },
      },
      {
        id: 'ten-kronen-back',
        w: 0.35,
        text: '{neighbor}把十克朗压在糖罐下面，说那年的医药钱总算凑齐了。{subject}数出五克朗推回去，说利息不收。两人在厨房里推来推去，最后把钱换成两袋煤，平分着搬进各自的门洞。两袋煤堆在门洞边，谁先烧完谁就去对方那里铲一铲。两家的门从此都留着一道缝。',
        significance: 0.76,
        fx: {
          cash: 10,
          relation: ['neighbor', 'friend', 0.2, 0.1],
          flag: 'favor_repaid_in_cash',
          mood: 0.08,
        },
      },
      {
        id: 'repaid-in-the-courtyard',
        w: 0.25,
        text: '{neighbor}在院子里当着所有晾衣服的人，把一篮煤和两只鸡塞给{subject}，说这是救命恩人的份。{subject}推不掉，只能收下；上楼时听见背后有人算那篮煤值多少钱。第二天，全楼都知道了。那两只鸡后来下了蛋，{subject}每天送一只过去，算是把话又圆了一点。',
        significance: 0.7,
        fx: {
          cash: 5,
          reputation: -0.05,
          relation: ['neighbor', 'acquaintance', 0.05],
          flag: 'favor_repaid_loudly',
          mood: -0.04,
        },
      },
    ],
    baseRate: 0.016,
    cooldownYears: 15,
  },

  // 16 ─ Workplace rivalry ─────────────────────────────────────────────────────
  {
    id: 'r14-soc.workplace-rivalry',
    title: '护罩里的断锉刀',
    domain: 'work',
    stage: 'adulthood',
    ages: [20, 50],
    tags: ['workplace_rivalry', 'work', 'competition', 'betrayal', 'promotion'],
    contexts: URBAN,
    milieus: WORK,
    conditions: [{ kind: 'employment', employed: true }],
    roles: {
      rival: ['worker', { minAge: 18, maxAge: 55 }],
    },
    outcomes: [
      {
        id: 'stole-the-idea',
        w: 0.35,
        text: '{subject}把{rival}在午休时画的夹具草图交了上去，说是自己琢磨的。工头当场在工票背面画了批注，还让{subject}下周去领工具间的钥匙。{rival}在机器后面看着，手里那把锉刀一直没有放下。午休时，{rival}把那张草图从笔记本上撕下来，扔进纸篓，纸团砸在{subject}脚边。',
        significance: 0.78,
        fx: {
          relation: ['rival', 'rival', -0.3],
          reputation: 0.05,
          flag: 'stole_rival_idea',
          knowledge: ['the jig sketch came from the rival lunch-hour notebook', 0.8],
        },
        followup: { sceneId: 'r14-soc.former-enemy-asks-help', delayMonths: 180 },
      },
      {
        id: 'sabotaged-machine',
        w: 0.35,
        text: '{subject}的机器在交班前突然卡死，护罩里塞着一截断锉刀。{subject}的虎口被飞出的皮带扣划开，血滴在油墨桶边。{rival}站在人群后面，说“机器老了”。工头把断锉刀收进口袋，没有问是谁的。医务室的人用酒精洗伤口，{subject}一声没吭，只看着工头把那截锉刀锁进抽屉。',
        significance: 0.84,
        fx: {
          health: -0.08,
          relation: ['rival', 'rival', -0.4],
          flag: 'rival_sabotaged_machine',
          condition: 'injured_hand',
          knowledge: ['a broken file was wedged under the press guard', 0.9],
        },
        followup: { sceneId: 'r14-soc.former-enemy-asks-help', delayMonths: 180 },
      },
      {
        id: 'shared-the-bonus',
        w: 0.3,
        text: '{subject}把季度奖金分成两份，一份塞进{rival}的工具箱。{rival}愣了半天，说“你疯了”。工头听说后，把两人叫去，问是谁的主意；{subject}说是自己的，{rival}却先开口说“我们俩的”。发奖金那天，{rival}请{subject}在车间后面抽了一支烟，两个人谁也没提那三克朗。那天下班，两人一前一后走出厂门，隔了三步。',
        significance: 0.72,
        fx: {
          cash: -3,
          relation: ['rival', 'colleague', 0.15, 0.05],
          flag: 'shared_bonus_with_rival',
          mood: 0.08,
        },
      },
    ],
    baseRate: 0.03,
    cooldownYears: 10,
  },

  // 17 ─ Mentor and apprentice ─────────────────────────────────────────────────
  {
    id: 'r14-soc.mentor-apprentice',
    title: '指缝里的铅字',
    domain: 'work',
    stage: 'adolescence',
    ages: [16, 18],
    tags: ['mentorship', 'craft', 'apprenticeship', 'trust', 'print'],
    contexts: URBAN,
    milieus: WORK,
    roles: {
      mentor: ['worker', { minAge: 30, maxAge: 65 }],
    },
    outcomes: [
      {
        id: 'the-trick',
        w: 0.4,
        text: '{mentor}把一枚铅字夹在指缝里，让{subject}闭着眼摸字脚，说“认字先认骨头”。{subject}摸错三次，{mentor}就用沾墨的手指在案台上敲三下。第四次摸对时，{mentor}把自己那把用了十年的镊子推到{subject}面前。那天收工，{subject}第一次独自排完一整版，{mentor}在门口等到最后一盏灯灭。字架上的灯比平时多亮了一刻钟。',
        significance: 0.74,
        fx: {
          skill: { craft: 0.03 },
          relation: ['mentor', 'colleague', 0.2],
          flag: 'mentor_taught_trick',
          mood: 0.08,
        },
        followup: { sceneId: 'r14-soc.protege-surpasses', delayMonths: 120 },
      },
      {
        id: 'covered-the-drinking',
        w: 0.3,
        text: '{mentor}在夜班前喝了半瓶烧酒，排字时把一行标题排倒了。{subject}趁工头还没过来，把那行字重新排好，又把酒瓶塞进废纸堆。{mentor}什么也没说，只在第二天把自己的围裙给了{subject}。第二天，{mentor}把围裙洗了，晾在字架旁边，谁也没有提烧酒的事。围裙上还留着洗不掉的墨点。',
        significance: 0.7,
        fx: {
          relation: ['mentor', 'colleague', 0.15],
          flag: 'covered_for_mentor',
          knowledge: ['the mentor drinks before the night shift', 0.85],
        },
        followup: { sceneId: 'r14-soc.protege-surpasses', delayMonths: 120 },
      },
      {
        id: 'reported-the-error',
        w: 0.3,
        text: '{subject}排错了一个数字，{mentor}没有替{subject}遮掩，直接指给工头看。工头扣了{subject}半天工钱。下班后，{mentor}在楼梯口说“这行错一个字，整版都得重来”，说完把一截新铅字塞进{subject}的口袋。那截铅字后来被{subject}磨成了一个小方块，一直放在工具箱最上层。那个数字后来被{subject}记了一辈子。',
        significance: 0.68,
        fx: {
          cash: -2,
          relation: ['mentor', 'acquaintance', -0.05],
          skill: { craft: 0.02 },
          flag: 'mentor_reported_error',
          mood: -0.06,
        },
        followup: { sceneId: 'r14-soc.protege-surpasses', delayMonths: 120 },
      },
    ],
    baseRate: 0.04,
    cooldownYears: 8,
  },

  // 18 ─ The protege surpasses the mentor ────────────────────────────────────
  {
    id: 'r14-soc.protege-surpasses',
    title: '字架前慢半拍的手',
    domain: 'work',
    stage: 'adulthood',
    ages: [28, 55],
    tags: ['mentorship', 'protege_surpasses', 'work', 'pride', 'class'],
    contexts: URBAN,
    milieus: WORK,
    conditions: [
      { kind: 'history', tag: 'mentorship', minYearsAgo: 8 },
      { kind: 'employment', employed: true },
    ],
    roles: {
      mentor: linked('worker', {
        minAge: 45,
        maxAge: 75,
        sharedHistoryTag: 'mentorship',
      }),
    },
    outcomes: [
      {
        id: 'passed-the-old-master',
        w: 0.4,
        text: '{subject}被提为排字房的领班，{mentor}还在原来的字架前站着。第一周排急件，{mentor}的手慢了半拍，{subject}当着众人的面把活分给了年轻学徒。下班后，{mentor}把自己的镊子擦干净，放回工具箱，说“该换了”。散工后，{subject}在工具间门口站了很久，才把那把旧镊子放进自己的抽屉。',
        significance: 0.82,
        fx: {
          relation: ['mentor', 'acquaintance', 0.05],
          role: 'foreman',
          flag: 'passed_old_mentor',
          mood: 0.1,
          knowledge: ['the old mentor can no longer keep up with rush work', 0.75],
        },
      },
      {
        id: 'sabotaged-proof',
        w: 0.35,
        text: '清样上少了一整行，{subject}在开机前发现是{mentor}把那条铅字抽走了。{mentor}说“你当年连字脚都摸不准”。{subject}没有吵，只把那行字重新排上，又把抽出的铅字锁进自己的抽屉。两人从此不再一起抽烟。{mentor}下班时把工具箱锁了两道，钥匙挂在腰上，走路时一直响。',
        significance: 0.8,
        fx: {
          relation: ['mentor', 'rival', -0.3],
          flag: 'mentor_sabotaged_proof',
          knowledge: ['the mentor pulled a line of type from the proof', 0.9],
          mood: -0.1,
        },
      },
      {
        id: 'left-him-behind',
        w: 0.25,
        text: '{subject}要去另一家报馆做校对，临走前问{mentor}要不要一起走。{mentor}说自己这辈子只认得这台机器。{subject}把新地址写在烟盒背面，塞进{mentor}的围裙口袋；三个月后，烟盒还在原处，字迹被油墨盖住了。半年后，{subject}收到一张没有署名的明信片，上面只写着“新机器还行”。',
        significance: 0.72,
        fx: {
          relation: ['mentor', 'acquaintance', 0.05],
          flag: 'left_mentor_behind',
          skill: { craft: 0.02 },
          mood: 0.05,
        },
      },
    ],
    baseRate: 0.012,
    cooldownYears: 20,
  },

  // 19 ─ The famous former classmate ─────────────────────────────────────────
  {
    id: 'r14-soc.famous-classmate',
    title: '音乐厅雨棚下',
    domain: 'social',
    stage: 'adulthood',
    ages: [35, 59],
    tags: ['cross_class_childhood', 'famous_classmate', 'class', 'reputation', 'memory'],
    contexts: URBAN,
    milieus: [...CAFE, ...SHOP],
    conditions: [{ kind: 'history', tag: 'cross_class_childhood', minYearsAgo: 15 }],
    roles: {
      famous: linked('neighbor', {
        minAge: 33,
        maxAge: 65,
        sharedHistoryTag: 'cross_class_childhood',
      }),
    },
    outcomes: [
      {
        id: 'recognized-at-the-lecture',
        w: 0.4,
        text: '{subject}在音乐厅门口排队时，看见海报上的名字和一张熟悉的脸。散场后，{famous}从侧门出来，先认出那枚黄铜纽扣，再认出{subject}。两人站在雨棚下说了十分钟，{famous}把家里地址写在票根背面。回家路上，{subject}把票根放在内袋，和那枚旧纽扣挨在一起。票根上的地址被雨打湿，字却还看得清。',
        significance: 0.78,
        fx: {
          relation: ['famous', 'friend', 0.15, 0.08],
          flag: 'reconnected_with_famous_classmate',
          reputation: 0.05,
          mood: 0.12,
        },
        followup: { sceneId: 'r14-soc.reunion-dinner', delayMonths: 12 },
      },
      {
        id: 'pretended-not-to-know',
        w: 0.35,
        text: '{subject}在书店签售的队伍里叫了一声旧名字，{famous}抬起头，目光从{subject}的袖口滑过去，说“下一位”。保安把手一伸。{subject}退到门口，把准备好的旧照片又放回内袋。街上下起小雨，{subject}在书店屋檐下站到队伍散尽，才把照片收好。保安把门关上，玻璃里映出{subject}自己的脸。',
        significance: 0.74,
        fx: {
          relation: ['famous', 'acquaintance', -0.08],
          mood: -0.18,
          flag: 'snubbed_by_famous_classmate',
        },
      },
      {
        id: 'sold-the-story',
        w: 0.25,
        text: '{subject}把那张发黄的班级合影卖给一个跑社会版的记者，换了六克朗。报纸登出来时，{famous}的脸被裁掉了，只剩{subject}在照片边上写的一行字。街坊拿着报纸来问，{subject}说“都是小时候的事”。记者后来又来要过两次照片，{subject}把价钱抬到十克朗，对方就没有再来。',
        significance: 0.72,
        fx: {
          cash: 6,
          reputation: -0.08,
          flag: 'sold_childhood_story',
          mood: -0.05,
        },
      },
    ],
    baseRate: 0.016,
    cooldownYears: 15,
  },

  // 20 ─ A historical figure, met as an ordinary person ──────────────────────
  {
    id: 'r14-soc.historical-encounter',
    title: '候车棚里的半边伞',
    domain: 'culture',
    stage: 'adulthood',
    ages: [25, 55],
    tags: ['historical_encounter', 'ordinary_life', 'culture', 'city'],
    contexts: URBAN,
    milieus: [...CAFE, ...SHOP],
    roles: {
      sage: ['historical', { historicalId: 'Q44328', minAge: 26, maxAge: 62 }],
    },
    outcomes: [
      {
        id: 'shared-umbrella',
        w: 0.4,
        text: '雨把电车候车棚挤满了。一个穿旧风衣的男人把伞往{subject}这边偏了偏，自己半边肩膀淋着，嘴里还在抱怨报纸把“剧院”印成了“剧完”。{subject}说自己也看见那一行，男人立刻问是哪一版，像在核对一张账单。车来了，男人把伞收好，先让{subject}上车，自己站在踏板上。',
        significance: 0.66,
        fx: {
          relation: ['sage', 'acquaintance', 0.08],
          mood: 0.06,
          flag: 'shared_umbrella_with_writer',
          knowledge: ['the newspaper misprinted a theatre notice', 0.6, 'sage'],
        },
      },
      {
        id: 'sold-him-tobacco',
        w: 0.35,
        text: '{subject}在烟纸店替人看柜台，{sage}来买一盒烟斗丝，数硬币数了很久。{subject}多包了一层纸，{sage}就说这层纸比烟草讲究，顺手把找零留在柜台上。出门前，{sage}回头问{subject}读不读报。找零是两枚磨亮的铜币，{subject}后来一直没花，放在柜台的糖罐里。那枚铜币后来被磨得发亮。',
        significance: 0.64,
        fx: {
          cash: 1,
          relation: ['sage', 'acquaintance', 0.05],
          flag: 'served_famous_writer',
          mood: 0.05,
        },
      },
      {
        id: 'quoted-in-a-lecture',
        w: 0.25,
        text: '{subject}在咖啡馆里跟人争一张戏票的价钱，{sage}坐在隔壁桌，把{subject}那句“穷人买的是座位，不是戏”记在信封背面。两周后，那句话出现在一篇讲演里，没有提{subject}的名字。咖啡馆的人开始叫{subject}“那个上过报的”。几个月后，{subject}在报摊上看见那篇讲演的铅印稿，把那一段剪下来夹进账本。',
        significance: 0.72,
        fx: {
          reputation: 0.05,
          relation: ['sage', 'acquaintance', 0.05],
          flag: 'quoted_by_writer',
          knowledge: ['the writer copied the subject remark into a lecture', 0.8],
        },
      },
    ],
    baseRate: 0.024,
    cooldownYears: 20,
  },

  // 21 ─ A secret kept ────────────────────────────────────────────────────────
  {
    id: 'r14-soc.secret-kept',
    title: '锁着的针线盒',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [22, 50],
    tags: ['secret_kept', 'secret', 'friendship', 'shame', 'trust'],
    contexts: URBAN,
    milieus: HOME,
    roles: {
      confider: ['neighbor', { minAge: 22, maxAge: 60, sex: 'female' }],
    },
    outcomes: [
      {
        id: 'forged-the-story',
        w: 0.4,
        text: '{confider}把一张出生证明摊在桌上，说孩子的父亲不能出现在纸上，求{subject}帮忙编一个死在海上的丈夫。{subject}在洗衣房的蒸汽里听完整件事，最后把自己的旧姓借了出去。纸上的墨迹干了，{confider}的手还在抖。孩子满月那天，{confider}送来一篮鸡蛋，篮底压着那张证明的副本。',
        significance: 0.78,
        fx: {
          relation: ['confider', 'friend', 0.2, 0.1],
          flag: 'kept_confider_secret',
          knowledge: [
            'the confider invented a dead husband on a birth certificate',
            0.9,
            'confider',
          ],
          condition: 'knows_forged_papers',
        },
        followup: { sceneId: 'r14-soc.secret-revealed', delayMonths: 96 },
      },
      {
        id: 'told-the-mother',
        w: 0.3,
        text: '{subject}觉得这事不能瞒，转头告诉了{confider}的母亲。第二天，{confider}在楼梯口拦住{subject}，眼睛肿着，说“我只告诉过你一个人”。从那以后，两家的门再没有同时开过。那年冬天，{confider}家的窗户一直挂着厚窗帘，{subject}再没有进去过。母亲把那张证明锁进柜子，钥匙再也没有交给{confider}。',
        significance: 0.74,
        fx: {
          relation: ['confider', 'rival', -0.3],
          flag: 'broke_confider_secret',
          mood: -0.15,
          knowledge: ['the confider mother now knows about the birth certificate', 0.8],
        },
      },
      {
        id: 'wrote-it-in-the-diary',
        w: 0.3,
        text: '{subject}没有答应，也没有拒绝，只在夜里把整件事写进一本锁着的日记。写到“孩子”两个字时，笔尖把纸戳破了。第二天，{confider}照常来借盐，{subject}照常递过去，两人都没有提那张证明。日记本后来被塞进针线盒底下，钥匙挂在{subject}的脖子上，洗澡也不摘。',
        significance: 0.7,
        fx: {
          knowledge: ['the confider secret is recorded in a locked diary', 0.85],
          flag: 'secret_in_diary',
          mood: -0.05,
          relation: ['confider', 'acquaintance', 0.05],
        },
      },
    ],
    baseRate: 0.03,
    cooldownYears: 12,
  },

  // 22 ─ The secret revealed ─────────────────────────────────────────────────
  {
    id: 'r14-soc.secret-revealed',
    title: '见证人一栏的旧姓',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [30, 59],
    tags: ['secret_revealed', 'secret_kept', 'marriage', 'shame', 'betrayal'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [
      { kind: 'history', tag: 'secret_kept', minYearsAgo: 5 },
      { kind: 'hasFlag', flag: 'kept_confider_secret' },
    ],
    roles: {
      confider: linked('neighbor', {
        minAge: 28,
        maxAge: 65,
        sex: 'female',
        sharedHistoryTag: 'secret_kept',
      }),
      partner: ['partner', { minAge: 25, maxAge: 70 }],
    },
    outcomes: [
      {
        id: 'certificate-in-the-drawer',
        w: 0.35,
        text: '{partner}找户口纸时翻出了那张出生证明，复印件上的见证人一栏写着{subject}的旧姓。{partner}把纸摊在饭桌上，等到{confider}来借盐的那天，当着三个人的面问“谁是那个死在海上的丈夫”。{confider}的盐罐掉在地上，碎成两半。那天夜里，{partner}收拾了一只箱子，把结婚戒指放在盐罐旁边。',
        significance: 0.86,
        fx: {
          relation: ['confider', 'rival', -0.4],
          relation_end: ['partner', 'partner'],
          flag: 'secret_revealed_at_table',
          condition: 'marriage_crisis',
          mood: -0.3,
        },
        followup: { sceneId: 'r14-soc.blackmail', delayMonths: 6 },
      },
      {
        id: 'parish-register',
        w: 0.35,
        text: '教区神父在婚礼登记簿上发现了重复的证人签名，把这件事告诉了{partner}。{partner}回家时没有摔门，只把结婚照从墙上取下来，反过来靠在墙角。{subject}说那是为了帮人，{partner}说“你帮的是别人，赔的是我们”。主日弥撒时，两人隔着过道坐，唱诗班唱到第二段，{partner}先走了。',
        significance: 0.82,
        fx: {
          relation: ['partner', 'rival', -0.25],
          relation2: ['confider', 'acquaintance', -0.1],
          flag: 'parish_register_exposed_secret',
          condition: 'marriage_frost',
          mood: -0.25,
          reputation: -0.05,
        },
        followup: { sceneId: 'r14-soc.blackmail', delayMonths: 6 },
      },
      {
        id: 'preempted-at-dinner',
        w: 0.3,
        text: '{subject}抢在{confider}之前，在家庭晚餐上把那张证明的事说了出来，说自己是被人求着签的字。{partner}放下刀叉，问{confider}为什么不自己说。{confider}站起来，椅子倒在地上，从此再没有进过这扇门。后来的家庭聚会，{partner}照常出席，只是不再让{subject}坐在自己右手边。晚餐剩下的汤在桌上结了一层皮。',
        significance: 0.8,
        fx: {
          relation: ['confider', 'rival', -0.4],
          relation2: ['partner', 'acquaintance', -0.1],
          flag: 'preempted_secret_reveal',
          reputation: -0.1,
          mood: -0.15,
        },
        followup: { sceneId: 'r14-soc.blackmail', delayMonths: 12 },
      },
    ],
    baseRate: 0.006,
    cooldownYears: 25,
  },

  // 23 ─ Blackmail ────────────────────────────────────────────────────────────
  {
    id: 'r14-soc.blackmail',
    title: '第三级台阶下的信封',
    domain: 'crime',
    stage: 'adulthood',
    ages: [32, 59],
    tags: ['blackmail', 'secret_revealed', 'money', 'fear', 'crime'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [{ kind: 'history', tag: 'secret_revealed', minYearsAgo: 1 }],
    roles: {
      extorter: linked('neighbor', {
        minAge: 28,
        maxAge: 70,
        sharedHistoryTag: 'secret_revealed',
      }),
    },
    outcomes: [
      {
        id: 'ten-kronen-a-month',
        w: 0.4,
        text: '当年求{subject}伪造出生证明的{extorter}在楼梯拐角拦住{subject}，说那桩事若传到教区，{subject}的铺子就别想再赊到面粉。价码是每月十克朗，装在信封里，放在第三级台阶下面。{subject}第一个月照做了，信封被雨水泡软了一角。第三个月，信封被人取走后又放回来，里面只剩一张写着“涨了”的纸条。',
        significance: 0.82,
        fx: {
          cash: -10,
          condition: 'blackmail_pressure',
          relation: ['extorter', 'rival', -0.2],
          flag: 'paying_blackmail',
          mood: -0.2,
        },
      },
      {
        id: 'went-to-the-police',
        w: 0.35,
        text: '{subject}把{extorter}约在咖啡馆，桌上放着一只空信封，桌下坐着便衣。{extorter}刚说出价码，便衣就站了起来。审讯记录写了三页，{subject}的名字也在上面；回家的路上，{subject}第一次觉得街上的目光比审讯室更亮。案子拖了半年，{extorter}最后只被判了三个月拘役，出来时还在同一条街上走。',
        significance: 0.8,
        fx: {
          reputation: -0.08,
          relation: ['extorter', 'rival', -0.4],
          flag: 'reported_blackmail',
          knowledge: ['the extorter demanded ten kronen a month', 0.9],
          mood: 0.05,
        },
      },
      {
        id: 'marked-bills',
        w: 0.25,
        text: '{subject}在五张一克朗的纸币角上做了针孔记号，装进信封。{extorter}来取钱时，{subject}让楼下的钟表匠认清了那张脸。钱追回来三克朗，剩下的被{extorter}塞进鞋底。钟表匠说“以后别把这种事带进这条街”。钟表匠后来把这件事讲给半条街听，{subject}再经过那间铺子，两人只点头。',
        significance: 0.84,
        fx: {
          cash: -5,
          relation: ['extorter', 'rival', -0.3],
          flag: 'trapped_blackmailer',
          reputation: 0.05,
          knowledge: ['the extorter was identified by the watchmaker', 0.85],
        },
      },
    ],
    baseRate: 0.008,
    cooldownYears: 20,
  },

  // 24 ─ A stranger helped during the war ────────────────────────────────────
  {
    id: 'r14-soc.war-stranger',
    title: '煤箱后面的草垫',
    domain: 'war',
    stage: 'adulthood',
    ages: [18, 45],
    tags: ['war_stranger', 'war_service', 'shelter', 'risk', 'solidarity'],
    contexts: ['war'],
    milieus: [...HOME, ...WAR],
    roles: {
      stranger: ['worker', { minAge: 18, maxAge: 45 }],
      patrol: ['official', { minAge: 22, maxAge: 55 }],
    },
    outcomes: [
      {
        id: 'three-nights-in-the-cellar',
        w: 0.4,
        text: '{stranger}敲开后门时，军大衣上全是泥，说自己是运输队跑出来的。{subject}把煤箱后面的草垫腾出来，三夜都从配给里省下半块面包。第四天清晨，{stranger}把一枚磨平的纽扣放在窗台上，说“等这阵风过去，我认得这扇门”。那枚纽扣被{subject}收进针线盒，和自家的扣子分开放。',
        significance: 0.8,
        fx: {
          cash: -2,
          health: -0.03,
          condition: 'fear_of_search',
          relation: ['stranger', 'acquaintance', 0.15, 0.05],
          flag: 'sheltered_deserter',
        },
      },
      {
        id: 'false-name-at-the-checkpoint',
        w: 0.35,
        text: '巡逻队在巷口查证件，{stranger}的手已经伸进外套。{subject}上前说这是自己家的帮工，名字和住址都报得很快。{patrol}盯着看了两遍，最后在本子上划了一道。等人走远，{stranger}才发现{subject}的后背全湿了。巡逻队走远后，{stranger}在门后低声说了一个地名，{subject}没有记住。那天夜里，巡逻队又敲了隔壁的门。',
        significance: 0.8,
        fx: {
          condition: 'watched_by_police',
          relation: ['stranger', 'acquaintance', 0.1],
          flag: 'lied_to_patrol',
          mood: 0.05,
          health: -0.02,
        },
      },
      {
        id: 'bread-on-the-step',
        w: 0.25,
        text: '{subject}没有开门，只把半块面包和一张写着“往北走，别走大路”的纸条放在台阶上。天亮前，面包不见了，纸条被踩进泥里。{subject}在窗后站到钟敲五下，才去烧水。第二年春天，台阶上又出现一张同样的纸条，字迹却不是同一个人的。{subject}把两张纸条都收进针线盒。',
        significance: 0.7,
        fx: {
          cash: -1,
          mood: -0.08,
          flag: 'left_bread_for_stranger',
          knowledge: ['a deserter passed through the courtyard', 0.7],
        },
      },
    ],
    baseRate: 0.012,
    cooldownYears: 20,
  },

  // 25 ─ Denounced during the war ────────────────────────────────────────────
  {
    id: 'r14-soc.war-denunciation',
    title: '兵营后面的白灰',
    domain: 'war',
    stage: 'adulthood',
    ages: [18, 55],
    tags: ['denunciation', 'war', 'repression', 'neighbor_conflict', 'fear'],
    contexts: ['war'],
    milieus: [...HOME, ...WAR],
    roles: {
      neighbor: ['neighbor', { minAge: 18, maxAge: 60 }],
      official: ['official', { minAge: 25, maxAge: 65 }],
    },
    outcomes: [
      {
        id: 'house-search',
        w: 0.4,
        text: '两个穿便衣的人在天亮前敲门，说有人举报这栋楼里藏着逃兵。{neighbor}站在对面门口，手里端着一盆水，眼睛看着楼梯。{subject}把地下室钥匙交出去时，指尖一直在抖。搜查的人翻走了两封信，没有找到人。搜查的人走后，{neighbor}把水泼在院子中央，门再也没有开过。',
        significance: 0.8,
        fx: {
          condition: 'watched_by_police',
          flag: 'searched_after_denunciation',
          health: -0.05,
          mood: -0.2,
          relation: ['neighbor', 'rival', -0.3],
        },
        followup: { sceneId: 'r14-soc.scapegoat', delayMonths: 6 },
      },
      {
        id: 'detained-at-the-barracks',
        w: 0.35,
        text: '{subject}被带到兵营后面的小屋问了一夜，问题绕来绕去，最后落在一张配给卡上。天亮前，一个军士把五克朗推回来，说“回去别乱说话”。{subject}走回家时，鞋底上全是兵营院里的白灰。回家后，{subject}把配给卡塞进灶膛，看着它烧成一小片黑。军士把门带上时，外面的雪已经停了。',
        significance: 0.82,
        fx: {
          cash: -5,
          flag: 'detained_in_war',
          condition: 'watched_by_police',
          health: -0.06,
          mood: -0.25,
        },
      },
      {
        id: 'named-the-neighbors-son',
        w: 0.25,
        text: '审问的人把一张名单推到{subject}面前，说只要指出一个人，就能回家。{subject}的手指停在{neighbor}家儿子的名字上。第二天，那个年轻人没有回来吃晚饭；{neighbor}在院子里烧掉了一双鞋。那年冬天，{neighbor}家门口的雪一直没有扫，堆到台阶第二级。名单被折好，塞进审问者的内袋。',
        significance: 0.88,
        fx: {
          relation: ['neighbor', 'rival', -0.4],
          flag: 'denounced_neighbors_son',
          reputation: -0.05,
          mood: -0.3,
          knowledge: ['the neighbor son was taken after the subject named him', 0.9],
        },
        followup: { sceneId: 'r14-soc.scapegoat', delayMonths: 6 },
      },
    ],
    baseRate: 0.008,
    cooldownYears: 20,
  },

  // 26 ─ The scapegoat ───────────────────────────────────────────────────────
  {
    id: 'r14-soc.scapegoat',
    title: '替罪的一箱配给罐头',
    domain: 'war',
    stage: 'adulthood',
    ages: [20, 55],
    tags: ['scapegoat', 'denunciation', 'public_humiliation', 'war', 'injustice'],
    contexts: ['war', 'vienna', 'urban', 'crisis', 'scarcity', 'postwar'],
    milieus: [...WORK, ...HOME],
    conditions: [
      { kind: 'history', kernelId: 'r14-soc.war-denunciation', minYearsAgo: 1 },
      { kind: 'employment', employed: true },
    ],
    roles: {
      accuser: linked('neighbor', {
        minAge: 20,
        maxAge: 65,
        sharedHistoryTag: 'denunciation',
      }),
    },
    outcomes: [
      {
        id: 'blamed-for-the-theft',
        w: 0.4,
        text: '仓库少了一箱配给罐头，{accuser}在众人面前说那天只有{subject}进过库房。工头没有再问，直接把{subject}的工票摘下来。{subject}抱着自己的饭盒走出大门时，雪正落在门房的玻璃上。工头把饭盒递出来，里面的勺子还在，汤已经凉了。门房说“明天来拿”，{subject}没有回头。',
        significance: 0.86,
        fx: {
          unemployment: 'blamed for a missing crate of rationed cans',
          reputation: -0.15,
          relation: ['accuser', 'rival', -0.35],
          flag: 'made_scapegoat',
          mood: -0.25,
        },
      },
      {
        id: 'cleared-by-the-bookkeeper',
        w: 0.35,
        text: '账房先生翻出库房的签字簿，证明那箱罐头在{subject}当班前就已经登记出库。{accuser}说“记错了”，工头把工票重新挂回去。{subject}没有道谢，只把签字簿那一页折了个角。签字簿被送回账房时，{accuser}在门口等着，说“字不是我签的”。纸角还折着，账房先生没有再说什么。',
        significance: 0.76,
        fx: {
          reputation: 0.05,
          relation: ['accuser', 'rival', -0.2],
          flag: 'cleared_of_scapegoat',
          knowledge: ['the ration crate left the store before the subject shift', 0.9],
          mood: 0.1,
        },
      },
      {
        id: 'took-the-blame',
        w: 0.25,
        text: '{subject}承认是自己拿的，因为家里还有两张嘴等着配给。工头扣了十克朗，没有报警。{accuser}在门口等着，说“算你识相”。{subject}把空饭盒夹在腋下，觉得它比来的时候重。配给站的人把名字从名单上划掉时，笔尖在纸上停了一下。配给站的人没有再抬头。',
        significance: 0.8,
        fx: {
          cash: -10,
          reputation: -0.2,
          condition: 'public_shame',
          flag: 'took_the_blame',
          relation: ['accuser', 'rival', -0.1],
          mood: -0.2,
        },
      },
    ],
    baseRate: 0.008,
    cooldownYears: 20,
  },

  // 27 ─ The con artist ──────────────────────────────────────────────────────
  {
    id: 'r14-soc.con-artist',
    title: '不存在的专利号',
    domain: 'crime',
    stage: 'adulthood',
    ages: [25, 55],
    tags: ['con_artist', 'fraud', 'money', 'trust', 'crime'],
    contexts: URBAN,
    milieus: [...CAFE, ...SHOP],
    roles: {
      swindler: ['neighbor', { minAge: 25, maxAge: 65 }],
    },
    outcomes: [
      {
        id: 'patent-that-did-not-exist',
        w: 0.4,
        text: '{swindler}把一张盖着红章的专利副本铺在桌上，说只要二十克朗入股，明年就能在每条街上装一台自动售烟机。{subject}数钱时，{swindler}一直用手帕擦杯子。三个月后，那个地址只剩一间空屋和半张撕掉的红章。巡警来做笔录，问了三遍“红章是什么颜色”，{subject}答了三遍。',
        significance: 0.84,
        fx: {
          cash: -20,
          relation: ['swindler', 'rival', -0.3],
          flag: 'conned_by_partner',
          condition: 'lost_savings',
          knowledge: ['the patent office has no record of the machine', 0.85],
          mood: -0.3,
        },
      },
      {
        id: 'small-stake',
        w: 0.35,
        text: '{subject}只肯出五克朗，说先看看第一批货。{swindler}笑着收下，写了一张收条，字迹漂亮得像请柬。收条后来被{subject}夹在账本里，每次翻到都停一下，像看一道没算完的账。月底盘账时，{subject}把收条抽出来看一眼，又放回去。那五克朗后来成了{subject}最贵的一课。',
        significance: 0.7,
        fx: {
          cash: -5,
          relation: ['swindler', 'acquaintance', -0.05],
          flag: 'small_loss_to_con_artist',
          knowledge: ['the con artist wrote a receipt for five kronen', 0.7],
          mood: -0.08,
        },
      },
      {
        id: 'checked-the-patent-office',
        w: 0.25,
        text: '{subject}在专利局排了一上午队，查不到{swindler}说的那个编号。回到咖啡馆时，{swindler}已经走了，桌上留着一只空杯和半块方糖。{subject}把收条交给巡警，巡警说“这种案子一年有几十起”。巡警把收条收进证物袋，说“留着吧，兴许哪天用得上”。证物袋后来被锁进柜子，再没有人来问过。',
        significance: 0.78,
        fx: {
          reputation: 0.08,
          relation: ['swindler', 'rival', -0.4],
          flag: 'exposed_con_artist',
          knowledge: ['the patent number on the prospectus was invented', 0.95],
          mood: 0.05,
        },
      },
    ],
    baseRate: 0.016,
    cooldownYears: 15,
  },

  // 28 ─ A former enemy asks for help ────────────────────────────────────────
  {
    id: 'r14-soc.former-enemy-asks-help',
    title: '纱布下面的旧仇',
    domain: 'relationship',
    stage: 'adulthood',
    ages: [40, 59],
    tags: ['former_enemy', 'workplace_rivalry', 'mercy', 'debt', 'class'],
    contexts: URBAN,
    milieus: [...HOME, ...CAFE],
    conditions: [{ kind: 'history', kernelId: 'r14-soc.workplace-rivalry', minYearsAgo: 10 }],
    roles: {
      enemy: linked('worker', {
        minAge: 38,
        maxAge: 70,
        sharedHistoryTag: 'workplace_rivalry',
      }),
    },
    outcomes: [
      {
        id: 'doctor-for-the-old-rival',
        w: 0.4,
        text: '{enemy}站在门口，一只眼睛蒙着纱布，说医生要十五克朗才肯动手术。{subject}想起那截断锉刀，还是把钱数了出来。{enemy}接过钱时，手比当年在机器旁抖得更厉害。两人没有提排字房，只约好下周三在诊所门口见。诊所的候诊椅上，两人隔着一个空位坐，谁也没有先开口。',
        significance: 0.82,
        fx: {
          cash: -15,
          relation: ['enemy', 'acquaintance', 0.1, 0.05],
          flag: 'helped_former_rival',
          mood: 0.08,
        },
      },
      {
        id: 'refused-at-the-door',
        w: 0.35,
        text: '{subject}把门开着一半，说“你当年在车间里做的那些事，怎么没想过今天”。{enemy}在门口站了很久，最后把帽子戴正，说“那就当我没来”。楼梯间的灯灭了，{subject}还握着门把。关门前，{subject}从门缝里看见{enemy}在楼梯上坐了很久，才扶着墙下去。第二天，{enemy}的纱布换成了眼罩。',
        significance: 0.74,
        fx: {
          relation: ['enemy', 'rival', -0.1],
          flag: 'refused_former_rival',
          mood: 0.04,
        },
      },
      {
        id: 'work-instead-of-money',
        w: 0.25,
        text: '{subject}没有给钱，而是让{enemy}来铺子里整理旧铅字，按天算工钱。第一天，{enemy}把“B”和“R”放反了两次。{subject}没有骂，只把字盘转过来，让两人都能看见。收工时，{enemy}把排好的字盘推过来，{subject}检查了一遍，只改了一个逗号。第三天，{enemy}自己带来了饭盒，放在字架旁边。饭盒里是两块冷土豆。',
        significance: 0.78,
        fx: {
          cash: -4,
          relation: ['enemy', 'colleague', 0.2, 0.05],
          flag: 'gave_former_rival_work',
          knowledge: ['the former rival can still read type by touch', 0.7],
          mood: 0.1,
        },
      },
    ],
    baseRate: 0.008,
    cooldownYears: 20,
  },

  // 29 ─ Searching for the old friend ────────────────────────────────────────
  {
    id: 'r14-soc.search-old-friend',
    title: '煤巷十七号',
    domain: 'social',
    kind: 'task',
    stage: 'adulthood',
    ages: [45, 59],
    tags: ['task', 'childhood_friendship', 'search', 'memory', 'bureaucracy'],
    contexts: URBAN,
    milieus: [...GOV, ...HOME],
    conditions: [{ kind: 'history', tag: 'childhood_friendship', minYearsAgo: 10 }],
    roles: {
      clerk: ['official', { minAge: 22, maxAge: 65 }],
      landlady: ['neighbor', { minAge: 30, maxAge: 75 }],
    },
    outcomes: [
      {
        id: 'address-in-the-register',
        w: 0.4,
        text: '{subject}在户籍处排了两个钟头，{clerk}把一本灰色登记簿翻到起毛的那一页，指了一个地址：煤巷十七号，三楼。手续费一克朗。{subject}把地址抄在烟盒背面，出门时才发现外面下着雨，纸上的墨迹已经化开。三天后，{subject}按地址找去，在楼下看见一个熟悉的身影正在抖床单。',
        significance: 0.72,
        fx: {
          cash: -1,
          flag: 'found_old_friend_address',
          knowledge: ['the old friend is registered at Coal Lane 17', 0.9, 'clerk'],
          mood: 0.1,
        },
        followup: { sceneId: 'r14-soc.reunion-dinner', delayMonths: 3 },
      },
      {
        id: 'demolished-house',
        w: 0.3,
        text: '地址找到了，房子却只剩一圈地基，砖缝里长着荨麻。{landlady}说那一片去年就拆了，住户大多搬去了外围的工棚。{subject}在废墟边站了一会儿，把带来的半包烟留给了一个捡砖的孩子。回程的电车上，{subject}把烟盒背面那张地址撕下来，扔进了车窗外的雨里。',
        significance: 0.62,
        fx: {
          cash: -1,
          mood: -0.1,
          flag: 'lost_old_friend_trail',
          knowledge: ['the old friend registered house was demolished', 0.8, 'landlady'],
        },
      },
      {
        id: 'wrong-name',
        w: 0.3,
        text: '户籍簿上有三个同名的人。{subject}按第一个地址找去，开门的是一个完全不认识的中年人，屋里供着别人的遗像。两人在门口喝了一杯水，谈了半天才发现彼此要找的不是同一个人。临走时那人送{subject}到楼梯口，说“要是找到了，替我问候一声”。',
        significance: 0.6,
        fx: {
          cash: -2,
          mood: -0.05,
          relation: ['landlady', 'acquaintance', 0.03],
          flag: 'wrong_old_friend',
          knowledge: ['three people in the district share the old friend name', 0.7],
        },
      },
    ],
    task: taskMeta('social', ['belonging'], ['belonging'], 0.72, 0.05, ['social']),
    baseRate: 0.02,
    cooldownYears: 10,
  },

  // 30 ─ Visiting the grave ──────────────────────────────────────────────────
  {
    id: 'r14-soc.visit-grave',
    title: '石缝里的黄铜纽扣',
    domain: 'social',
    kind: 'task',
    stage: 'elderhood',
    ages: [60, 90],
    tags: ['task', 'friend_death', 'grave', 'childhood_friendship', 'grief'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [
      { kind: 'history', tag: 'friend_death', includeParticipants: true, minYearsAgo: 1 },
    ],
    roles: {
      companion: linked('neighbor', {
        minAge: 55,
        maxAge: 95,
        sharedHistoryTag: 'childhood_friendship',
      }),
    },
    outcomes: [
      {
        id: 'brass-button-on-the-stone',
        w: 0.45,
        text: '墓园的门房认得{subject}，说今年来过三次了。{companion}把一束蜡菊放在碑前，{subject}从口袋里摸出那枚黄铜纽扣，放进石缝里，用鞋尖按了按。两人站到风把纸钱吹到隔壁坟上，才转身往门口走。门房递来一只铁皮水壶，两人各喝一口，谁也没有说下一次什么时候来。',
        significance: 0.76,
        fx: {
          cash: -2,
          mood: -0.1,
          relation: ['companion', 'friend', 0.15, 0.1],
          flag: 'visited_old_friend_grave',
        },
      },
      {
        id: 'could-not-find-the-plot',
        w: 0.3,
        text: '{subject}只记得葬礼那天下着雨，墓碑是一块没有照片的灰石。两人在第七区绕了半个钟头，问了一个掘墓人，才在一棵枯槐下面找到。{companion}说“名字都快磨平了”，{subject}用手指把凹下去的字描了一遍。离开时{companion}把枯槐上的一截断枝折下来，插在碑前的土里，说“留个记号”。',
        significance: 0.68,
        fx: {
          cash: -1,
          mood: -0.12,
          relation: ['companion', 'acquaintance', 0.05],
          flag: 'lost_grave_first',
          condition: 'grief',
        },
      },
      {
        id: 'confession-at-the-grave',
        w: 0.25,
        text: '{subject}对着墓碑说，那年借的二十克朗其实没有全用在铺子上，有一部分进了赛马场。{companion}没有转头，只把手里剩下的半支蜡烛插进土里。风把火苗吹向{subject}那边，像有人在听。下楼时{companion}在门口停了一下，说“那年的事，我早就知道了”。两人在门口分了剩下的半包烟。',
        significance: 0.72,
        fx: {
          relation: ['companion', 'acquaintance', -0.1],
          mood: 0.05,
          flag: 'confessed_at_grave',
        },
      },
    ],
    task: taskMeta('social', ['belonging', 'family'], ['belonging'], 0.6, 0.02, ['social']),
    baseRate: 0.012,
    cooldownYears: 5,
  },

  // 31 ─ Seeking forgiveness ────────────────────────────────────────────────
  {
    id: 'r14-soc.seek-forgiveness',
    title: '没有贴邮票的明信片',
    domain: 'social',
    kind: 'task',
    stage: 'adulthood',
    ages: [30, 59],
    tags: ['task', 'betrayal', 'apology', 'denunciation', 'shame'],
    contexts: URBAN,
    milieus: [...HOME, ...WORK],
    conditions: [
      { kind: 'history', tag: 'denunciation', minYearsAgo: 5 },
      { kind: 'hasFlag', flag: 'denounced_workmate' },
    ],
    roles: {
      betrayed: linked('worker', {
        minAge: 28,
        maxAge: 70,
        sharedHistoryTag: 'denunciation',
      }),
    },
    outcomes: [
      {
        id: 'letter-without-a-stamp',
        w: 0.4,
        text: '{subject}写了三页信，写到第四页时把纸揉了，最后只寄出一张明信片：“那年纸库后面的话是我说的。”{betrayed}两周后回了一张，背面只有一行：“知道了。别再寄了。”{subject}把两张纸叠在一起，放进抽屉最里面。明信片被{subject}压在玻璃板下，和一张旧工票放在一起。',
        significance: 0.72,
        fx: {
          cash: -1,
          relation: ['betrayed', 'acquaintance', 0.06],
          flag: 'letter_of_apology_sent',
          mood: 0.08,
        },
        followup: { sceneId: 'r14-soc.betrayal-apology', delayMonths: 60 },
      },
      {
        id: 'old-shop-empty',
        w: 0.3,
        text: '{subject}找到当年的排字房，门板上钉着一块“招租”的牌子。隔壁面包房的人说，{betrayed}早就搬去了格拉茨，走的时候没有留下地址。{subject}在门口站到面包出炉，买了一个面包，掰了一半放在门阶上。面包房的人问要不要留个地址，{subject}说不用了，把另一半也留在门阶上。',
        significance: 0.64,
        fx: {
          cash: -2,
          mood: -0.12,
          flag: 'apology_undelivered',
          knowledge: ['the betrayed typesetter moved to Graz', 0.75],
        },
      },
      {
        id: 'public-confession',
        w: 0.3,
        text: '{subject}在工会的例会上站起来，把当年举报的事说了一遍。会场安静了很久，有人把椅子挪开，也有人过来握手。{betrayed}坐在最后一排，等人都散了才走过来，说“你至少敢说”。会后{betrayed}在门口等了一会儿，两人一起走到电车站，谁也没有提纸库。电车站的风把两人的衣角吹在一起。',
        significance: 0.76,
        fx: {
          reputation: -0.03,
          relation: ['betrayed', 'acquaintance', 0.1],
          flag: 'public_confession',
          mood: 0.1,
        },
      },
    ],
    task: taskMeta('social', ['status', 'belonging'], ['status'], 0.65, 0.1, ['social']),
    baseRate: 0.012,
    cooldownYears: 10,
  },

  // 32 ─ A public apology ───────────────────────────────────────────────────
  {
    id: 'r14-soc.public-apology',
    title: '开秤前的一刻钟',
    domain: 'social',
    kind: 'task',
    stage: 'adulthood',
    ages: [28, 59],
    tags: ['task', 'public_apology', 'public_humiliation', 'reputation', 'market'],
    contexts: URBAN,
    milieus: MARKET,
    conditions: [{ kind: 'history', kernelId: 'r14-soc.public-humiliation', minYearsAgo: 3 }],
    roles: {
      humiliator: linked('neighbor', {
        minAge: 25,
        maxAge: 75,
        sharedHistoryTag: 'public_humiliation',
      }),
    },
    outcomes: [
      {
        id: 'read-aloud-on-the-steps',
        w: 0.4,
        text: '{subject}请市场管理员把早市开秤前的一刻钟留出来。{humiliator}站在台阶上，照着{subject}写的纸念：“那天我说的话是假的。”念到“对不起”时声音低下去，但排队买菜的人都听见了。管理员敲了一下秤，早市开始。散市时，管理员把那页纸收进抽屉，说“下回别在我这儿念”。',
        significance: 0.8,
        fx: {
          reputation: 0.1,
          relation: ['humiliator', 'acquaintance', 0.05],
          flag: 'public_apology_obtained',
          mood: 0.12,
        },
      },
      {
        id: 'apology-with-a-barb',
        w: 0.35,
        text: '{humiliator}在众人面前说“我收回那句话”，紧接着又补了一句“不过那家的事，谁说得清呢”。人群里有人笑。{subject}把准备好的纸揉成一团，转身去买菜，秤砣落下的声音比平时响。那天{subject}买的菜比平时少一半，回家把秤在桌上校了三遍。那天的菜价比平时贵了两个铜板。',
        significance: 0.72,
        fx: {
          reputation: -0.05,
          relation: ['humiliator', 'rival', -0.15],
          flag: 'hollow_public_apology',
          mood: -0.1,
        },
      },
      {
        id: 'apologized-for-the-slap',
        w: 0.25,
        text: '{subject}先开口，说那天在院子里动手是自己不对，请{humiliator}也把话收回去。{humiliator}愣了一会儿，说“那话是我编的”。两人没有握手，但管理员说今年的摊位可以挨着摆。管理员在摊位表上把两家画在一起，笔尖把纸戳了个小洞。收摊时，两家把剩下的菜互相换了一些。',
        significance: 0.74,
        fx: {
          reputation: 0.05,
          relation: ['humiliator', 'colleague', 0.1],
          flag: 'mutual_public_apology',
          mood: 0.08,
        },
      },
    ],
    task: taskMeta('social', ['status'], ['status'], 0.7, 0.15, ['social']),
    baseRate: 0.012,
    cooldownYears: 15,
  },

  // 33 ─ Joining the tenants' league ─────────────────────────────────────────
  {
    id: 'r14-soc.join-tenants',
    title: '地下室的手印',
    domain: 'civic',
    kind: 'task',
    stage: 'adulthood',
    ages: [25, 59],
    tags: ['task', 'tenants_association', 'neighbor_conflict', 'housing', 'organization'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [{ kind: 'history', tag: 'neighbor_conflict', minYearsAgo: 1 }],
    roles: {
      neighbor: linked('neighbor', {
        minAge: 25,
        maxAge: 75,
        sharedHistoryTag: 'neighbor_conflict',
      }),
    },
    outcomes: [
      {
        id: 'paid-the-dues',
        w: 0.4,
        text: '地下室的洗衣房里摆着一张长桌，{neighbor}把会费簿推过来，说每月两克朗，先交三个月。{subject}数出六克朗，在名字后面按了手印。墙上挂着一块手写的牌子：“租金不降，我们不搬。”墨水还没干透。散会时{neighbor}把一块硬纸板塞给{subject}，上面用炭笔写着下次开会的时间。',
        significance: 0.76,
        fx: {
          cash: -6,
          role: 'tenant_delegate',
          flag: 'tenants_association_member',
          relation: ['neighbor', 'colleague', 0.1],
          knowledge: ['the tenants league meets in the basement laundry', 0.8],
        },
      },
      {
        id: 'refused-to-sign',
        w: 0.3,
        text: '{subject}说房东认得自己的脸，签了名以后别想再续租。{neighbor}把会费簿合上，说“那你等着涨租吧”。洗衣房的门在身后关上，里面的说话声一下子变得很远。第二天，房东在门厅贴了一张涨租通知，{subject}的名字被红笔圈了出来。涨租通知在门厅贴了整整一个冬天。',
        significance: 0.62,
        fx: {
          mood: -0.08,
          flag: 'refused_tenants_league',
          relation: ['neighbor', 'acquaintance', -0.05],
        },
      },
      {
        id: 'elected-to-collect-signatures',
        w: 0.3,
        text: '{subject}被推举去挨家挨户收签名，一下午走了四层楼，鞋底磨得发热。有人在门缝里塞出三个铜板，有人把狗放出来。到天黑，纸上有了二十七户的名字，{neighbor}说够拿去见市政厅了。回家路上，{subject}把那张纸按在胸口，纸边被汗浸软了。那张纸后来被钉在洗衣房的墙上。',
        significance: 0.74,
        fx: {
          reputation: 0.05,
          role: 'tenant_delegate',
          flag: 'tenants_petition_driver',
          relation: ['neighbor', 'colleague', 0.15],
        },
      },
    ],
    task: taskMeta('civic', ['family', 'survival'], ['safety'], 0.7, 0.15, ['social']),
    baseRate: 0.016,
    cooldownYears: 10,
  },

  // 34 ─ The neighbourhood campaign ──────────────────────────────────────────
  {
    id: 'r14-soc.neighborhood-campaign',
    title: '街角的手压水泵',
    domain: 'civic',
    kind: 'task',
    stage: 'adulthood',
    ages: [28, 59],
    tags: ['task', 'neighborhood_campaign', 'tenants_association', 'civic', 'housing'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [{ kind: 'history', tag: 'tenants_association', minYearsAgo: 1 }],
    roles: {
      neighbor: linked('neighbor', {
        minAge: 25,
        maxAge: 75,
        sharedHistoryTag: 'tenants_association',
      }),
    },
    outcomes: [
      {
        id: 'pump-on-the-corner',
        w: 0.4,
        text: '{subject}把二十七户的签名和一张画着水管走向的纸送到市政厅，跑了四趟，终于等到一个办事员说“列入明年预算”。第二年春天，街角真的多了一台手压水泵。第一次压出水时，孩子们把鞋都弄湿了。水泵装好那天，{neighbor}第一个压水，{subject}站在旁边数着水流进桶里的声音。',
        significance: 0.8,
        fx: {
          reputation: 0.1,
          flag: 'won_neighborhood_campaign',
          role: 'tenant_delegate',
          relation: ['neighbor', 'friend', 0.15],
          mood: 0.15,
        },
      },
      {
        id: 'rent-strike',
        w: 0.35,
        text: '房东把租金又涨了一成，{subject}在洗衣房把账算给大家看：一户多交三克朗，整栋楼一个月就是九十。第二天，十二户人家把钥匙放在门房桌上。第三周，房东带着锁匠来，{neighbor}挡在楼梯口。房东最后答应暂缓涨租，条件是十二户人家把欠租在三个月内补齐。',
        significance: 0.84,
        fx: {
          cash: -5,
          condition: 'rent_strike',
          flag: 'organized_rent_strike',
          relation: ['neighbor', 'friend', 0.2],
          reputation: 0.08,
        },
      },
      {
        id: 'three-signatures',
        w: 0.25,
        text: '{subject}敲了三十扇门，只收到三个签名。有人说“管好自己家的事”，有人干脆不开门。{neighbor}把那张纸折起来，说“留着，明年再用”。纸角在口袋里磨了一个冬天，最后软得像布。那张纸后来被{subject}夹在门框上，每年春天取下来看一眼，再放回去。门框上的钉子每年春天都松一点。',
        significance: 0.66,
        fx: {
          mood: -0.12,
          flag: 'failed_neighborhood_campaign',
          relation: ['neighbor', 'acquaintance', 0.05],
        },
      },
    ],
    task: taskMeta('civic', ['cause', 'belonging'], ['safety', 'belonging'], 0.75, 0.25, [
      'social',
    ]),
    baseRate: 0.012,
    cooldownYears: 10,
  },

  // 35 ─ The club election ───────────────────────────────────────────────────
  {
    id: 'r14-soc.club-election',
    title: '饼干铁盒里的选票',
    domain: 'social',
    kind: 'task',
    stage: 'adulthood',
    ages: [25, 59],
    tags: ['task', 'club_election', 'club', 'status', 'community'],
    contexts: URBAN,
    milieus: [...CAFE, ...HOME],
    roles: {
      treasurer: ['worker', { minAge: 25, maxAge: 65 }],
    },
    outcomes: [
      {
        id: 'won-by-three-votes',
        w: 0.4,
        text: '合唱团在酒馆后厅改选，票箱是一只装饼干的铁盒。唱票唱到第三遍，{subject}比{treasurer}多三票。{treasurer}把账本推过来，说“你接”。散会后，两人在门口抽完同一支烟，谁也没有先提那三票。账本第一页记着上次义卖的收入，数字旁边有一道被擦过的铅笔痕。',
        significance: 0.78,
        fx: {
          role: 'club_president',
          flag: 'won_club_election',
          reputation: 0.08,
          relation: ['treasurer', 'acquaintance', -0.05],
          mood: 0.12,
        },
      },
      {
        id: 'disputed-the-count',
        w: 0.35,
        text: '{subject}输了五票，要求把票重新数一遍。数到第二遍还是五票，{treasurer}把铁盒盖上，说“再数就难看了”。{subject}说账本也得查，后厅一下子安静下来。那晚的合唱没有唱成。散会后，{treasurer}把铁盒抱在怀里，锁进酒馆老板的柜子。铁盒被放回柜子，账本却留在了桌上。',
        significance: 0.72,
        fx: {
          reputation: -0.05,
          relation: ['treasurer', 'rival', -0.25],
          flag: 'disputed_club_election',
          mood: -0.1,
        },
      },
      {
        id: 'withdrew-to-keep-the-club',
        w: 0.25,
        text: '{subject}在投票前站起来，说今年不选了，让{treasurer}连任，条件是账目每月贴在门口。{treasurer}答应得很快。散会后，几个老团员拍{subject}的肩，说“你倒像当家的”。第二个月，账目真的贴在了门口，第一页的墨迹被雨淋得发花。第一页是空白的，第二页才开始有字。',
        significance: 0.7,
        fx: {
          relation: ['treasurer', 'colleague', 0.1],
          flag: 'withdrew_from_club_election',
          reputation: 0.04,
          mood: 0.05,
        },
      },
    ],
    task: taskMeta('social', ['status', 'belonging'], ['status'], 0.7, 0.1, ['social']),
    baseRate: 0.024,
    cooldownYears: 5,
  },

  // 36 ─ The charity scandal ─────────────────────────────────────────────────
  {
    id: 'r14-soc.audit-charity',
    title: '募捐箱里少掉的四十克朗',
    domain: 'civic',
    kind: 'task',
    stage: 'adulthood',
    ages: [28, 59],
    tags: ['task', 'charity_scandal', 'club_election', 'money', 'accounting'],
    contexts: URBAN,
    milieus: [...CAFE, ...HOME],
    conditions: [{ kind: 'history', tag: 'club_election', minYearsAgo: 1 }],
    roles: {
      treasurer: linked('worker', {
        minAge: 25,
        maxAge: 70,
        sharedHistoryTag: 'club_election',
      }),
    },
    outcomes: [
      {
        id: 'forty-kronen-missing',
        w: 0.4,
        text: '{subject}把募捐箱里的钱倒在桌上，数了三遍，比账本少了四十克朗。{treasurer}说可能是上个月的义卖没记上。{subject}把每一张收条按日期排开，发现有三张是同一个笔迹补写的。委员会把账本收走时，{treasurer}站在门口，手里还攥着募捐箱的钥匙。三张收条被{subject}单独夹在一本旧书里。',
        significance: 0.84,
        fx: {
          reputation: 0.12,
          relation: ['treasurer', 'rival', -0.3],
          flag: 'exposed_charity_theft',
          knowledge: ['forty kronen are missing from the club charity box', 0.95],
          mood: 0.08,
        },
      },
      {
        id: 'buried-the-discrepancy',
        w: 0.35,
        text: '{subject}把账本合上，说差的钱自己补，别让团里的人在冬天丢脸。{treasurer}第二天送来四千克朗，用一张旧报纸包着。募捐箱照常摆在门口，只是{subject}再也没有往里面投过硬币。冬天过去，募捐箱里的钱照常送去买煤，账本上却多了一页空白。募捐箱的锁后来换过一次。',
        significance: 0.74,
        fx: {
          cash: -4,
          relation: ['treasurer', 'colleague', 0.1],
          flag: 'buried_charity_scandal',
          mood: -0.12,
          reputation: -0.03,
        },
      },
      {
        id: 'accused-of-the-theft',
        w: 0.25,
        text: '{treasurer}先去了委员会，说{subject}经手的账目对不上。委员会让{subject}把收条全部交出来，{subject}在自己抽屉里发现少了一叠。走廊里有人低声说“看着挺老实的”。调查没有结论，但募捐箱换了锁。换锁那天，{subject}把旧钥匙交出去，钥匙在桌上转了两圈才停。那把钥匙被丢进抽屉，再没有配过新的。',
        significance: 0.78,
        fx: {
          reputation: -0.15,
          relation: ['treasurer', 'rival', -0.35],
          flag: 'accused_in_charity_scandal',
          mood: -0.2,
          knowledge: ['a stack of receipts disappeared from the subject drawer', 0.8],
        },
      },
    ],
    task: taskMeta('civic', ['cause', 'status'], ['status'], 0.65, 0.2, ['numeracy']),
    baseRate: 0.008,
    cooldownYears: 10,
  },

  // 37 ─ Borrowing from a usurer ─────────────────────────────────────────────
  {
    id: 'r14-soc.borrow-from-usurer',
    title: '钟表铺后间的算盘',
    domain: 'finance',
    kind: 'task',
    stage: 'adulthood',
    ages: [22, 55],
    tags: ['task', 'criminal_debt', 'debt', 'money', 'fear'],
    contexts: URBAN,
    milieus: [...SHOP, ...HOME],
    roles: {
      lender: ['worker', { minAge: 30, maxAge: 70 }],
    },
    outcomes: [
      {
        id: 'eighteen-kronen-at-twenty-percent',
        w: 0.4,
        text: '{lender}在钟表铺后间放债，桌上摆着一把算盘和一杯冷茶。{subject}借十八克朗，周息两成，押的是下个月的工钱。{lender}让{subject}把名字写在借据上，又让在名字旁边按一个指印。“按重一点，”{lender}说，“省得以后不认”。借据被{subject}折成小方块，塞进内袋，走路时一直硌着胸口。',
        significance: 0.76,
        fx: {
          cash: 18,
          flag: 'criminal_debt',
          relation: ['lender', 'acquaintance', -0.1],
          knowledge: ['the usurer charges twenty percent a week', 0.95],
          mood: -0.05,
        },
      },
      {
        id: 'pawned-the-watch',
        w: 0.3,
        text: '{subject}没有借满，只拿了五克朗，把父亲的怀表留在柜台上。{lender}打开表盖看了看，说表走得不准，只能算这个价。{subject}把多出的一克朗推回去，拿走了当票。当票上的字很小，{subject}在门口就着煤气灯看了两遍，才认出父亲的表号。表盖里面刻着祖父的名字，{lender}没有看见。',
        significance: 0.68,
        fx: {
          cash: 5,
          flag: 'pawned_watch_to_usurer',
          relation: ['lender', 'acquaintance', -0.05],
          mood: -0.1,
        },
      },
      {
        id: 'walked-away',
        w: 0.3,
        text: '{subject}在门口站了一会儿，看见墙上挂着一排别人的当票，姓名都用墨涂掉了。最后{subject}说“再想想”，{lender}没有抬头，只把算盘珠子拨回原位。出门时，后间的钟正好敲了四下。后间的门在身后合上，街上的钟表同时敲响，声音从四面八方压过来。',
        significance: 0.6,
        fx: {
          flag: 'refused_usurer',
          mood: 0.05,
          knowledge: ['the usurer keeps a wall of pawn tickets', 0.7],
          relation: ['lender', 'acquaintance', -0.03],
        },
      },
    ],
    task: taskMeta('finance', ['survival'], ['cash'], 0.6, 0.45, ['numeracy']),
    baseRate: 0.016,
    cooldownYears: 5,
  },

  // 38 ─ Repaying the criminal debt ─────────────────────────────────────────
  {
    id: 'r14-soc.repay-criminal-debt',
    title: '撕成两半的借据',
    domain: 'finance',
    kind: 'task',
    stage: 'adulthood',
    ages: [25, 59],
    tags: ['task', 'criminal_debt', 'debt', 'money', 'law'],
    contexts: URBAN,
    milieus: [...SHOP, ...HOME],
    conditions: [{ kind: 'history', tag: 'criminal_debt', minYearsAgo: 1 }],
    roles: {
      lender: linked('worker', {
        minAge: 30,
        maxAge: 75,
        sharedHistoryTag: 'criminal_debt',
      }),
    },
    outcomes: [
      {
        id: 'paid-in-full',
        w: 0.4,
        text: '{subject}把二十克朗一张张铺在柜台上，{lender}用算盘核了两遍，把借据从铁盒里抽出来，当着{subject}的面撕成两半。撕到一半，{lender}停了一下，说“下次别来了”。{subject}把两半纸都收好，出门才扔掉。出门后{subject}把两半借据扔进阴沟，纸在水面上漂了一会儿才沉。阴沟的水把纸上的名字泡掉了。',
        significance: 0.78,
        fx: {
          cash: -20,
          flag: 'criminal_debt_paid',
          relation: ['lender', 'acquaintance', 0.05],
          mood: 0.12,
        },
      },
      {
        id: 'furniture-taken',
        w: 0.35,
        text: '{subject}只凑出八克朗。{lender}带着两个搬运工上楼，把五斗柜和一台缝纫机抬走了，说剩下的下周再算。{subject}站在空出来的墙角，地上留着柜脚压出的四个印子，像四个没写完的字。那天夜里，{subject}睡在地板上，因为床也跟着五斗柜一起被抬走了。第二天，{subject}去旧货市场找那台缝纫机。',
        significance: 0.82,
        fx: {
          cash: -8,
          condition: 'debt_collected_by_force',
          flag: 'debt_collected_by_force',
          mood: -0.25,
          relation: ['lender', 'rival', -0.3],
          health: -0.05,
        },
      },
      {
        id: 'reported-the-usurer',
        w: 0.25,
        text: '{subject}没有去后间，而是去了警察局。值班的警员听完，问借据上有没有写利息；{subject}说只写了数目。警员把帽子往后一推，说“那就难办了”。三个月后，{lender}的钟表铺关了门，{subject}的借据也不知被谁拿走了。街坊说{subject}做得对，可到了月底，还是没有人肯再借钱给{subject}。',
        significance: 0.76,
        fx: {
          reputation: 0.05,
          relation: ['lender', 'rival', -0.4],
          flag: 'reported_usurer',
          knowledge: ['the usurer closed the shop after a police visit', 0.8],
          mood: 0.05,
        },
      },
    ],
    task: taskMeta('finance', ['survival'], ['cash'], 0.65, 0.35, ['numeracy']),
    baseRate: 0.012,
    cooldownYears: 10,
  },

  // 39 ─ Gambling away the wages ─────────────────────────────────────────────
  {
    id: 'r14-soc.gamble-away-wages',
    title: '第三个栏架前的马',
    domain: 'leisure',
    kind: 'task',
    stage: 'adulthood',
    ages: [21, 55],
    tags: ['task', 'gambling_debt', 'gambling', 'money', 'risk'],
    contexts: URBAN,
    milieus: [...CAFE, ...SHOP, ...HOME],
    roles: {
      bookmaker: ['worker', { minAge: 25, maxAge: 70 }],
      mate: ['worker', { minAge: 18, maxAge: 60 }],
    },
    outcomes: [
      {
        id: 'lost-the-week',
        w: 0.4,
        text: '赛马场外的泥地上，{bookmaker}把{subject}的工钱数进帽子里，说“下周翻本”。{mate}拽了拽{subject}的袖子，{subject}没有动。回家的电车上，{subject}把口袋翻了三遍，只摸到一张赛马票的存根。第二天上工，{subject}把工票藏在鞋垫下面，怕家里翻出来。那天夜里，{subject}把赛马票的存根烧了，灰留在鞋垫上。',
        significance: 0.8,
        fx: {
          cash: -12,
          flag: 'gambling_debt',
          condition: 'gambling',
          relation: ['mate', 'acquaintance', -0.05],
          knowledge: ['the bookmaker takes bets behind the tram depot', 0.9],
          mood: -0.25,
        },
      },
      {
        id: 'won-fifteen',
        w: 0.35,
        text: '{subject}押的那匹马在最后一个弯道超了过去。{bookmaker}把十五克朗拍在柜台上，说“运气不错”。{subject}请{mate}喝了半升啤酒，剩下的钱在口袋里响了一路。第二天，{subject}又去了赛马场。那匹马的号码被{subject}写在烟盒上，后来烟盒被雨淋烂了，号码还认得出。回家后，{subject}把那张湿透的烟盒摊在炉边烘干。',
        significance: 0.72,
        fx: {
          cash: 15,
          flag: 'gambling_winnings',
          condition: 'gambling',
          mood: 0.2,
          relation: ['mate', 'colleague', 0.05],
        },
      },
      {
        id: 'rent-money-on-the-nose',
        w: 0.25,
        text: '{subject}把房租也押了上去。那匹马跑到第三个栏就停了。{bookmaker}把票根收走，说“明天再来”。{subject}在球场外的墙根蹲到天黑，回家时对家里说工钱还没发。第二天一早，{subject}去当铺问怀表的价钱，柜台后的人只摇头。房东来敲门时，{subject}从后门出去，在街上走到天黑。',
        significance: 0.86,
        fx: {
          cash: -18,
          flag: 'gambling_debt',
          condition: 'rent_in_arrears',
          mood: -0.35,
          health: -0.03,
          knowledge: ['the rent money was lost at the track', 0.9],
        },
      },
    ],
    task: taskMeta('leisure', ['rest', 'status'], ['cash'], 0.55, 0.4, ['numeracy']),
    baseRate: 0.024,
    cooldownYears: 5,
  },

  // 40 ─ Finding the stranger from the war ──────────────────────────────────
  {
    id: 'r14-soc.find-war-stranger',
    title: '疗养院走廊尽头的纽扣',
    domain: 'social',
    kind: 'task',
    stage: 'adulthood',
    ages: [32, 59],
    tags: ['task', 'war_stranger', 'search', 'gratitude', 'postwar'],
    contexts: [...URBAN, 'postwar'],
    milieus: [...GOV, ...HOME],
    conditions: [{ kind: 'history', tag: 'war_stranger', minYearsAgo: 8 }],
    roles: {
      stranger: linked('worker', {
        minAge: 30,
        maxAge: 65,
        sharedHistoryTag: 'war_stranger',
      }),
    },
    outcomes: [
      {
        id: 'name-on-the-red-cross-list',
        w: 0.4,
        text: '{subject}在红十字会的办事处翻了三天名单，终于在一个疗养院的名册上找到{stranger}。坐火车去的那天，{subject}带了一包烟和那枚磨平的纽扣。{stranger}从走廊尽头慢慢走过来，先看见纽扣，才看见人。疗养院的人说{stranger}下周就能出院，{subject}把回程车票多买了一张。',
        significance: 0.82,
        fx: {
          cash: -4,
          relation: ['stranger', 'friend', 0.2, 0.15],
          flag: 'found_war_stranger',
          mood: 0.18,
        },
      },
      {
        id: 'sanatorium-by-the-river',
        w: 0.35,
        text: '名单上的地址是一家肺病疗养院。{stranger}躺在床上，瘦得认不出来，枕边放着一只空烟盒。{subject}把带来的面包掰成小块，两人分着吃完。临走时，{stranger}说“那扇门我还记得”。护士来催探视时间，{subject}把剩下的半包烟留在枕边，说下次再带。走廊尽头的窗户开着，风把床单吹得鼓起来。',
        significance: 0.76,
        fx: {
          cash: -3,
          relation: ['stranger', 'friend', 0.15, 0.1],
          condition: 'visited_sanatorium',
          flag: 'war_stranger_in_sanatorium',
          mood: 0.05,
          health: -0.02,
        },
      },
      {
        id: 'same-name-different-man',
        w: 0.25,
        text: '名单上有两个同样的名字，{subject}先找到的那个不是当年的人。对方听完来意，说“你找的是我表哥，那人战后去了南边”。{subject}把地址记在手心，回程的电车上，字被汗洇开了。回程时{subject}在车站买了张明信片，写了两行，最后没有寄出去。那张明信片最后被夹在电话簿里。',
        significance: 0.62,
        fx: {
          cash: -2,
          mood: -0.05,
          flag: 'wrong_war_stranger',
          knowledge: ['the stranger has a cousin with the same name', 0.7],
        },
      },
    ],
    task: taskMeta('social', ['belonging'], ['belonging'], 0.6, 0.05, ['social']),
    baseRate: 0.012,
    cooldownYears: 15,
  },

  // 41 ─ Confronting the rumour ────────────────────────────────────────────
  {
    id: 'r14-soc.confront-rumor',
    title: '插上的门闩',
    domain: 'social',
    kind: 'task',
    stage: 'adulthood',
    ages: [20, 59],
    tags: ['task', 'rumor', 'reputation', 'neighbor_conflict', 'confrontation'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [{ kind: 'history', tag: 'rumor', minYearsAgo: 1 }],
    roles: {
      neighbor: linked('neighbor', {
        minAge: 20,
        maxAge: 70,
        sharedHistoryTag: 'rumor',
      }),
    },
    outcomes: [
      {
        id: 'stopped-the-story',
        w: 0.4,
        text: '{subject}在洗衣房等到{neighbor}来打水，把门从里面插上，说今天把话说清楚。{neighbor}起初还笑，后来声音低下去，承认是听来的。第二天，院子里的话少了一半。{subject}照常晾床单，只是不再借给{neighbor}洗衣盆。那天晚上，{neighbor}家的水桶在洗衣房里放了一夜，没有人去提。第二天清早，{neighbor}把水桶提走了。',
        significance: 0.76,
        fx: {
          reputation: 0.08,
          relation: ['neighbor', 'rival', -0.1],
          flag: 'stopped_rumor',
          mood: 0.1,
        },
      },
      {
        id: 'made-it-worse',
        w: 0.35,
        text: '{subject}在院子里把{neighbor}堵住，声音大得三层楼都听见。{neighbor}索性把话又说了一遍，还添了两个细节。围观的人越来越多，{subject}最后把手里的一篮衣服摔在地上，转身回屋。第二天，{neighbor}把晾衣绳往自家窗边挪了半尺，{subject}没有作声。那篮衣服在院子里躺到第二天，被雨淋透了。',
        significance: 0.78,
        fx: {
          reputation: -0.15,
          relation: ['neighbor', 'rival', -0.3],
          condition: 'neighborhood_feud',
          flag: 'escalated_rumor',
          mood: -0.2,
        },
      },
      {
        id: 'brought-a-witness',
        w: 0.25,
        text: '{subject}把门房的老婆子请到院子里，请对方说那晚{subject}一直在洗衣房。{neighbor}听完，说自己也是听来的。话没有完全断，但至少不再从{neighbor}嘴里出来。门房的老婆子临走前说“下回别为这种事敲我的门”。后来逢人便说，那晚是门房的老婆子替{subject}作保，{subject}欠下一个人情。',
        significance: 0.72,
        fx: {
          reputation: 0.05,
          relation: ['neighbor', 'acquaintance', 0.03],
          flag: 'brought_witness_to_rumor',
          knowledge: ['the porter wife can confirm the subject alibi', 0.8],
          mood: 0.06,
        },
      },
    ],
    task: taskMeta('social', ['status'], ['status'], 0.7, 0.2, ['social']),
    baseRate: 0.016,
    cooldownYears: 10,
  },

  // 42 ─ Repairing the boundary wall ────────────────────────────────────────
  {
    id: 'r14-soc.repair-fence',
    title: '界墙上的新灰浆',
    domain: 'civic',
    kind: 'task',
    stage: 'adulthood',
    ages: [25, 59],
    tags: ['task', 'neighbor_conflict', 'repair', 'boundary', 'reconciliation'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [{ kind: 'history', tag: 'neighbor_conflict', minYearsAgo: 1 }],
    roles: {
      neighbor: linked('neighbor', {
        minAge: 25,
        maxAge: 75,
        sharedHistoryTag: 'neighbor_conflict',
      }),
    },
    outcomes: [
      {
        id: 'shared-the-mason',
        w: 0.4,
        text: '{subject}请来上次那个泥瓦匠，把界墙重新砌直，灰浆里掺了新石灰。{neighbor}在墙那边递砖，手上沾着白灰，递到第三块时说了句“上次是我急”。墙砌到齐腰高，两家的孩子已经趴在上面看蚂蚁。收工时，{neighbor}把剩下的半袋石灰留在{subject}家门口，没有留字条。',
        significance: 0.8,
        fx: {
          cash: -6,
          relation: ['neighbor', 'friend', 0.2, 0.1],
          flag: 'rebuilt_boundary_wall',
          mood: 0.12,
        },
      },
      {
        id: 'built-it-higher',
        w: 0.35,
        text: '{subject}让泥瓦匠把墙加高了两尺，顶上还嵌了碎玻璃。{neighbor}在那边看着，什么也没说，第二天在自家门口装了一盏更亮的灯。两堵墙之间只剩一条窄缝，猫都过不去。那年夏天，两家的孩子在墙两边各玩各的，谁也不往对面看。碎玻璃在太阳底下亮得刺眼。',
        significance: 0.74,
        fx: {
          cash: -8,
          relation: ['neighbor', 'rival', -0.2],
          flag: 'fortified_boundary_wall',
          condition: 'neighborhood_feud',
          mood: -0.05,
        },
      },
      {
        id: 'left-it-broken',
        w: 0.25,
        text: '{subject}算了算工钱，决定让那个洞先留着。{neighbor}用一块旧门板挡在自己那边，风一吹就响。两家从此绕后门走，碰见时点一下头，像两个不熟的房客。入冬前，{neighbor}用那块旧门板挡了风，{subject}家的炉子却总往那边冒烟。开春后，那块门板被风刮倒，谁也没有扶。',
        significance: 0.6,
        fx: {
          mood: -0.05,
          relation: ['neighbor', 'acquaintance', -0.05],
          flag: 'left_boundary_wall_broken',
        },
      },
    ],
    task: taskMeta('civic', ['family'], ['safety'], 0.65, 0.1, ['craft']),
    baseRate: 0.016,
    cooldownYears: 10,
  },

  // 43 ─ Reconnecting with the famous classmate ─────────────────────────────
  {
    id: 'r14-soc.reconnect-famous',
    title: '后台门房的一张纸条',
    domain: 'social',
    kind: 'task',
    stage: 'adulthood',
    ages: [35, 59],
    tags: ['task', 'famous_classmate', 'cross_class_childhood', 'class', 'memory'],
    contexts: URBAN,
    milieus: [...CAFE, ...SHOP],
    conditions: [{ kind: 'history', tag: 'cross_class_childhood', minYearsAgo: 20 }],
    roles: {
      famous: linked('neighbor', {
        minAge: 33,
        maxAge: 70,
        sharedHistoryTag: 'cross_class_childhood',
      }),
    },
    outcomes: [
      {
        id: 'name-at-the-stage-door',
        w: 0.4,
        text: '{subject}在音乐厅后台门口等了四十分钟，把一张写着旧名字的纸条交给门房。{famous}出来时已经卸了妆，看见纸条，先问“你还留着那枚纽扣吗”。两人在台阶上坐到清场，{famous}把下一场演出的票塞进{subject}的口袋。演出散场后，{famous}把化妆间的门留了一条缝，说“下回来别在门口等”。',
        significance: 0.8,
        fx: {
          relation: ['famous', 'friend', 0.15, 0.1],
          flag: 'reconnected_with_famous_classmate',
          reputation: 0.05,
          mood: 0.16,
        },
      },
      {
        id: 'snubbed-at-the-stage-door',
        w: 0.35,
        text: '门房把纸条递进去，过了一会儿出来说“今晚不见客”。{subject}看见一辆黑色汽车从侧门开走，后座上的人正低头看节目单。{subject}把带来的旧照片放回内袋，沿着环城路走回家。回到家，{subject}把旧照片放回相框，照片上的两个人还并排站着。环城路的电车从身边过了三趟。',
        significance: 0.74,
        fx: {
          relation: ['famous', 'acquaintance', -0.05],
          mood: -0.2,
          flag: 'snubbed_at_stage_door',
        },
      },
      {
        id: 'letter-to-the-conservatory',
        w: 0.25,
        text: '{subject}不会写漂亮的客套话，只写了一句：“煤巷十七号的孩子想见你。”信寄到音乐学院，三周后收到一封短笺，约在咖啡馆。{famous}迟到半小时，进来第一句话是“那条巷子还在吗”。咖啡馆打烊时，{famous}把一张写着住址的纸条压在糖罐下面。糖罐下面的纸条被{subject}收进内袋。',
        significance: 0.76,
        fx: {
          cash: -1,
          relation: ['famous', 'friend', 0.12, 0.05],
          flag: 'letter_reached_famous_classmate',
          mood: 0.12,
        },
      },
    ],
    task: taskMeta('social', ['status', 'belonging'], ['status'], 0.6, 0.1, ['social']),
    baseRate: 0.016,
    cooldownYears: 15,
  },

  // 44 ─ Facing the con artist again ────────────────────────────────────────
  {
    id: 'r14-soc.face-con-artist',
    title: '抵债的港口画',
    domain: 'finance',
    kind: 'task',
    stage: 'adulthood',
    ages: [35, 59],
    tags: ['task', 'con_artist', 'fraud', 'revenge', 'money'],
    contexts: URBAN,
    milieus: [...CAFE, ...SHOP],
    conditions: [{ kind: 'history', tag: 'con_artist', minYearsAgo: 8 }],
    roles: {
      swindler: linked('neighbor', {
        minAge: 30,
        maxAge: 70,
        sharedHistoryTag: 'con_artist',
      }),
    },
    outcomes: [
      {
        id: 'reported-the-second-scheme',
        w: 0.4,
        text: '{swindler}在咖啡馆里又摊开一张图纸，说这回是电灯公司的新股。{subject}听完，把巡警叫到桌边。{swindler}被带走时还在笑，说“你还欠我五克朗的收条”。{subject}把那张旧收条交给警员，纸已经发黄。巡警把{swindler}带出门时，咖啡馆里的人都在看{subject}，像看一个迟来的证人。',
        significance: 0.82,
        fx: {
          reputation: 0.1,
          relation: ['swindler', 'rival', -0.3],
          flag: 'reported_con_artist',
          knowledge: ['the con artist was peddling electric shares', 0.9],
          mood: 0.1,
        },
      },
      {
        id: 'conned-twice',
        w: 0.3,
        text: '{subject}告诉自己只是去听听，最后还是把十五克朗推到桌子中间。{swindler}数钱的动作和十年前一模一样。三个月后，{subject}在同一个地址找到一间空屋，门上贴着一张新的招租纸。回家后，{subject}把账本翻到十年前那一页，发现两笔钱写在同一行。最后{subject}用墨把那一行涂掉了。',
        significance: 0.84,
        fx: {
          cash: -15,
          relation: ['swindler', 'rival', -0.2],
          flag: 'conned_twice',
          condition: 'lost_savings',
          mood: -0.3,
        },
      },
      {
        id: 'took-the-painting',
        w: 0.3,
        text: '{swindler}说手头只有一幅画能抵债。画上是一艘停在港口的船，颜料还没干透。{subject}把画挂在家里，逢人便说是“抵债来的”。后来有个画商看了一眼，说画布是新的，签名是后添的。画后来被{subject}取下来，卷好，塞进床底；搬家时也没有带走。床底下的灰把画框边磨白了。',
        significance: 0.72,
        fx: {
          flag: 'took_fake_painting',
          mood: -0.08,
          relation: ['swindler', 'rival', -0.1],
          knowledge: ['the painting offered as restitution is a forgery', 0.85],
        },
      },
    ],
    task: taskMeta('finance', ['survival', 'status'], ['cash'], 0.7, 0.3, ['numeracy']),
    baseRate: 0.01,
    cooldownYears: 15,
  },

  // 45 ─ Nursing the old friend ────────────────────────────────────────────
  {
    id: 'r14-soc.nurse-old-friend',
    title: '每周三的一锅汤',
    domain: 'care',
    kind: 'task',
    stage: 'adulthood',
    ages: [50, 59],
    tags: ['task', 'childhood_friendship', 'care', 'illness', 'loyalty'],
    contexts: URBAN,
    milieus: HOME,
    conditions: [{ kind: 'history', tag: 'childhood_friendship', minYearsAgo: 15 }],
    roles: {
      oldFriend: linked('neighbor', {
        minAge: 45,
        maxAge: 85,
        sharedHistoryTag: 'childhood_friendship',
      }),
    },
    outcomes: [
      {
        id: 'wednesdays-at-the-bedside',
        w: 0.4,
        text: '{oldFriend}的腿肿得穿不上鞋，{subject}每周三提着一锅汤上楼，把报纸上的讣告念一遍。念到熟悉的名字就停一停，两人都不说话。汤喝完后，{subject}把窗开一条缝，让煤气味散出去。有一天{oldFriend}忽然说想吃小时候那种黑面包，{subject}跑了三条街才买到。黑面包硬得切不动，两人泡在汤里吃。',
        significance: 0.78,
        fx: {
          cash: -4,
          relation: ['oldFriend', 'friend', 0.2, 0.15],
          flag: 'nursed_old_friend',
          mood: 0.05,
        },
        followup: { sceneId: 'r14-soc.old-friend-dies', delayMonths: 120 },
      },
      {
        id: 'paid-for-the-doctor',
        w: 0.35,
        text: '医生说要把人送进医院，先交十二克朗。{oldFriend}摆手说不去，{subject}还是去柜台把钱交了。收据被{subject}折成小方块，塞进{oldFriend}的枕头下面。出院那天，{oldFriend}说“这下又欠你了”。出院后，{oldFriend}把收据一张张贴在账本上，说“这笔账我记着”。那本账本后来被{oldFriend}放在枕头下面。',
        significance: 0.8,
        fx: {
          cash: -12,
          relation: ['oldFriend', 'friend', 0.18, 0.1],
          flag: 'paid_old_friend_doctor',
          mood: 0.06,
        },
        followup: { sceneId: 'r14-soc.old-friend-dies', delayMonths: 120 },
      },
      {
        id: 'could-not-go-on',
        w: 0.25,
        text: '{subject}自己也病了，第三周没有去。第四周上楼时，门是房东开的，说{oldFriend}已经被侄女接走了。床板上留着一只空药瓶和那枚黄铜纽扣。{subject}把纽扣揣好，下楼时扶着墙。下楼后，{subject}在院子里站了一会儿，才想起自己已经很多年没有哭过。院子里晾着的床单已经收了，只剩一根空绳。',
        significance: 0.7,
        fx: {
          mood: -0.18,
          relation: ['oldFriend', 'acquaintance', 0.05],
          flag: 'stopped_nursing_old_friend',
          health: -0.03,
        },
      },
    ],
    task: taskMeta('care', ['care', 'belonging'], ['care'], 0.7, 0.1, ['social']),
    baseRate: 0.012,
    cooldownYears: 10,
  },
]);
