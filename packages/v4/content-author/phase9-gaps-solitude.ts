import type { ContentFamilyBrief } from './briefs.js';
import type { EventEffect, RoleRequirement, SceneCondition } from '../domain.js';

/**
 * Solitary ordinary-life events.
 *
 * These exist because the candidate audit found adults and elders with tasks
 * but zero castable passive events: their household/location had no second
 * person to cast as neighbour or worker. A scene does not need a second person
 * to be a real event. These families use the subject role only and change
 * mood, health, skill, cash or household food, never inventing a relationship.
 */

const subject = (minAge: number, maxAge: number): RoleRequirement => ({
  key: 'subject',
  kind: 'subject',
  required: true,
  minAge,
  maxAge,
});

const age = (min: number, max: number): SceneCondition => ({ kind: 'age', min, max });

const ordinaryEffects: EventEffect['type'][] = [
  'cash',
  'food',
  'health',
  'condition',
  'mood',
  'reputation',
  'skill',
  'flag',
];

export const PHASE9_SOLITUDE_BRIEFS: ContentFamilyBrief[] = [
  {
    id: 'p9-gap-adult-solitude',
    kind: 'event',
    title: '一个人也能过完的下午',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 80 },
    tags: ['adulthood', 'daily', 'solitude', 'ordinary', 'home'],
    baseRate: 0.1,
    conditions: [age(18, 80)],
    nodeBriefs: [
      {
        id: 'p9-gap-adult-solitude.misdelivered-letter',
        title: '一封寄错的信',
        premise:
          '门房把一封信从门缝里塞进来，收信人的名字不是这户人家，地址却写着同一扇门。信封边缘磨毛，邮戳模糊；收信人也许早就搬走，也许就在楼上，只是门牌写错了一位。',
        weight: 1,
        rateShare: 0.17,
        tags: ['daily', 'letter', 'home', 'solitude'],
        conditions: [age(18, 80)],
        roles: [subject(18, 80)],
        allowedEffects: ordinaryEffects,
        outcomeHints: [
          '她把信送到楼上，问了两户都不是，最后交给门房登记',
          '她把信拆开，发现是银行的催款单，又原样封好，放回门房窗口',
          '她把信压在糖罐下，过了几天才想起，信封已经沾了油',
        ],
      },
      {
        id: 'p9-gap-adult-solitude.leaking-shoe',
        title: '修一只漏水的鞋',
        premise:
          '右脚鞋底开了一道口，踩过水洼就渗进来。鞋匠铺要价够买两天的面包，家里还有一小罐鞋蜡和一根粗针；窗外的雨一时停不下来，明天还得穿这双鞋出门。',
        weight: 1,
        rateShare: 0.17,
        tags: ['daily', 'repair', 'shoe', 'poverty'],
        conditions: [age(18, 80)],
        roles: [subject(18, 80)],
        allowedEffects: ordinaryEffects,
        outcomeHints: [
          '她用鞋蜡和粗线把裂缝缝住，鞋底不平，走路时一高一低',
          '她拆下旧皮带补在鞋底，针扎进手指，血滴在鞋面上',
          '她没有修好，第二天在厂门口站了半天，脚趾冻得发麻',
        ],
      },
      {
        id: 'p9-gap-adult-solitude.stopped-clock',
        title: '停了的钟',
        premise:
          '屋里唯一的座钟停在凌晨三点，发条拧不动。没有钟，上工只能靠楼下的教堂钟声；可教堂的钟在风里传得不远，冬天窗户关着，常常听不见。',
        weight: 1,
        rateShare: 0.17,
        tags: ['daily', 'clock', 'home', 'time'],
        conditions: [age(18, 80)],
        roles: [subject(18, 80)],
        allowedEffects: ordinaryEffects,
        outcomeHints: [
          '她把钟拆开，发现一根发条断了，用铁丝勉强接上，钟又走了几天',
          '她不再修钟，每天早晨听教堂钟声，迟到过一次',
          '她拿钟去钟表铺问价，修理工钱太贵，又把钟提回家',
        ],
      },
      {
        id: 'p9-gap-adult-solitude.remake-coat',
        title: '把旧外套改小',
        premise:
          '柜子里挂着一件亡故亲戚留下的厚外套，肩太宽，袖口磨破。拆开可以给孩子改一件冬衣，也可以自己改成短外套；针线盒里只剩一小卷灰线，剪刀钝得咬布。',
        weight: 1,
        rateShare: 0.16,
        tags: ['daily', 'mending', 'clothing', 'household'],
        conditions: [age(18, 80)],
        roles: [subject(18, 80)],
        allowedEffects: ordinaryEffects,
        outcomeHints: [
          '她拆了外套，改出一件短上衣，剩下的布头拼成两只手套',
          '剪刀太钝，袖口剪歪了，她索性把两只袖子都裁短',
          '她改到一半就放下，外套在椅背上搭了一个冬天',
        ],
      },
      {
        id: 'p9-gap-adult-solitude.window-argument',
        title: '窗边听见的争吵',
        premise:
          '楼下院子里有人吵架，声音从晾衣绳下面传上来，听不清在争什么，只知道一个男人在反复说“账不是这么算的”。屋里没点灯，窗玻璃映着对面厨房的火光。',
        weight: 1,
        rateShare: 0.16,
        tags: ['daily', 'home', 'neighbor', 'overheard'],
        conditions: [age(18, 80)],
        roles: [subject(18, 80)],
        allowedEffects: ordinaryEffects,
        outcomeHints: [
          '她关上窗，争吵声变成闷响，她在床上翻到很晚',
          '她下楼看了一眼，发现是楼下的夫妻在为工钱吵架，没插话就回来了',
          '她听了半天，第二天在楼梯口遇见那个女人，只点了点头',
        ],
      },
      {
        id: 'p9-gap-adult-solitude.river-walk',
        title: '一个人走到多瑙河边',
        premise:
          '星期天下午没有活，屋里太冷，她沿着巷子一直走到河边。河面上有运煤的平底船，对岸的树还是秃的；风把围巾吹到脸上，脚下是湿的碎石路。',
        weight: 1,
        rateShare: 0.17,
        tags: ['daily', 'walk', 'river', 'solitude'],
        conditions: [age(18, 80)],
        roles: [subject(18, 80)],
        allowedEffects: ordinaryEffects,
        outcomeHints: [
          '她沿着河走了很远，回来时天已经黑了，脚底发热',
          '她在桥边站了一会儿，看见一艘船卸货，回家时心情轻了些',
          '风太大，她走到半路就折返，在面包店买了一个剩面包',
        ],
      },
    ],
  },
  {
    id: 'p9-gap-elder-solitude',
    kind: 'event',
    title: '老年屋子里的一天',
    stage: 'elderhood',
    ageWindow: { min: 60, max: 85 },
    tags: ['elderhood', 'daily', 'solitude', 'memory', 'home'],
    baseRate: 0.11,
    conditions: [age(60, 85)],
    nodeBriefs: [
      {
        id: 'p9-gap-elder-solitude.old-photographs',
        title: '整理一盒旧照片',
        premise:
          '柜子顶上有一只铁盒，里面是几十张发黄的照片：婚礼、厂门口的合影、一个早夭的孩子。老人本来只想找一张身份照，结果把整盒都倒在了床上。',
        weight: 1,
        rateShare: 0.17,
        tags: ['elderhood', 'memory', 'photographs', 'solitude'],
        conditions: [age(60, 85)],
        roles: [subject(60, 85)],
        allowedEffects: ordinaryEffects,
        outcomeHints: [
          '她把照片按年份排好，发现有一张背面写着从未听过的名字',
          '她看了一半就收起来，把铁盒放回柜顶，晚饭只煮了一点汤',
          '她挑出一张厂门口的合影，第二天拿给楼下的旧同事看',
        ],
      },
      {
        id: 'p9-gap-elder-solitude.sunday-lunch',
        title: '一个人的星期日午餐',
        premise:
          '星期日，楼里飘着别人家的烤肉味，老人给自己煮了一小锅面疙瘩，切了半根香肠。桌上摆着两只盘子，另一只是亡故伴侣留下的，平时收在柜里，今天不知怎么就拿了出来。',
        weight: 1,
        rateShare: 0.17,
        tags: ['elderhood', 'food', 'sunday', 'solitude'],
        conditions: [age(60, 85)],
        roles: [subject(60, 85)],
        allowedEffects: ordinaryEffects,
        outcomeHints: [
          '她吃了半锅，把另一只盘子收回去，下午睡了一觉',
          '她把两只盘子都摆好，吃完后仔细洗干净',
          '面疙瘩煮糊了，她刮掉锅底，最后只吃了面包和香肠',
        ],
      },
      {
        id: 'p9-gap-elder-solitude.cemetery-afternoon',
        title: '在墓园坐一个下午',
        premise:
          '墓园在城郊，电车到终点还要走一段。老人的伴侣葬在这里，墓碑上的字被风雨磨浅；她带了一小盆常春藤和一块抹布，本来只打算待一个小时。',
        weight: 1,
        rateShare: 0.17,
        tags: ['elderhood', 'cemetery', 'memory', 'solitude'],
        conditions: [age(60, 85)],
        roles: [subject(60, 85)],
        allowedEffects: ordinaryEffects,
        outcomeHints: [
          '她擦干净墓碑，坐到太阳偏西，末班电车差点错过',
          '她在墓园遇到另一个来扫墓的老人，两人一起走到电车站',
          '那天下雨，她只待了一刻钟，花盆放在碑前就回了城',
        ],
      },
      {
        id: 'p9-gap-elder-solitude.pill-box',
        title: '把药盒按星期分好',
        premise:
          '医生开了三种药，剂量不同，有的早上吃，有的晚上吃。药盒是硬纸做的，格子上的字已经模糊；老人戴上眼镜，把药片倒在桌上，一片片数。',
        weight: 1,
        rateShare: 0.16,
        tags: ['elderhood', 'medicine', 'health', 'solitude'],
        conditions: [age(60, 85)],
        roles: [subject(60, 85)],
        allowedEffects: ordinaryEffects,
        outcomeHints: [
          '她分好了七天的药，在每个格子上画了太阳和月亮',
          '她数到一半忘了哪种药已经放过，只好全部倒回去重来',
          '她发现有一种药只剩三片，决定明天先去药房问能不能少买一点',
        ],
      },
      {
        id: 'p9-gap-elder-solitude.gramophone',
        title: '留声机上的一张旧唱片',
        premise:
          '留声机是儿子留下的，唱针已经钝了，唱片只有几张。老人挑出一张圆舞曲，摇柄转了几圈，声音沙沙地响起来，像从隔壁房间传来。',
        weight: 1,
        rateShare: 0.16,
        tags: ['elderhood', 'music', 'gramophone', 'solitude'],
        conditions: [age(60, 85)],
        roles: [subject(60, 85)],
        allowedEffects: ordinaryEffects,
        outcomeHints: [
          '她听完一面，又摇了一次柄，把另一面也听完',
          '唱针跳到中间，反复卡在同一小节，她干脆把唱片收起来',
          '声音太响，楼下敲了敲暖气管，她把音量调小，坐在椅子上听完',
        ],
      },
      {
        id: 'p9-gap-elder-solitude.letter-to-kin',
        title: '给远方的亲戚写一封信',
        premise:
          '抽屉里还有几张信纸和一枚旧邮票，远方的侄女上个月来信问身体怎么样。老人想回信，写到一半又觉得没什么可说；窗外的天短了，墨水瓶里只剩一个底。',
        weight: 1,
        rateShare: 0.17,
        tags: ['elderhood', 'letter', 'kin', 'solitude'],
        conditions: [age(60, 85)],
        roles: [subject(60, 85)],
        allowedEffects: ordinaryEffects,
        outcomeHints: [
          '她把信写完，贴上邮票，第二天让门房帮忙投进邮筒',
          '她写了三行就停下，把信纸折起来放进抽屉，打算明天再写',
          '她把信写完，又加了一句“不必回信”，封口时手有些抖',
        ],
      },
    ],
  },
];
