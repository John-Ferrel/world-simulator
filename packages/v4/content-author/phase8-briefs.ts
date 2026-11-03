import type { ContentFamilyBrief, ContentNodeBrief } from './briefs.js';
import type { GeneratedTaskMeta } from '../generated.js';
import type {
  EventEffect,
  Organization,
  PersonAgencyGoal,
  PersonLife,
  RoleRequirement,
  TaskDomain,
  TaskNeed,
} from '../domain.js';

/**
 * Phase 8 active-task contracts.
 *
 * A task pack is not scheduled by the yearly event rate. It is offered to a
 * person by Agency, filtered by the same age/stage/role/condition grammar as a
 * scene, and ranked with `taskUtility`. The briefs below therefore keep the
 * cast, conditions and metadata fixed while leaving prose and typed outcomes to
 * the content author.
 *
 * Pack age windows preserve the requested theme range. The runtime stage is the
 * lifecycle slice in which those tasks are actually offered (the engine buckets
 * task definitions by `stage`). Node conditions stay inside that slice.
 */

type Skill = keyof PersonLife['skills'];
type CapabilityName =
  | 'literacy'
  | 'numeracy'
  | 'social_insight'
  | 'craft_affinity'
  | 'frail_body'
  | 'craft'
  | 'social'
  | 'health';

function task(
  domain: TaskDomain,
  goals: PersonAgencyGoal[],
  needs: TaskNeed[],
  baseUtility: number,
  risk: number,
  skills: Skill[] = [],
  capability?: CapabilityName,
): GeneratedTaskMeta {
  return { domain, goals, needs, baseUtility, risk, skills, ...(capability ? { capability } : {}) };
}

function role(
  key: string,
  kind: RoleRequirement['kind'],
  minAge: number,
  maxAge: number,
  required = true,
  extra: Partial<RoleRequirement> = {},
): RoleRequirement {
  return { key, kind, required, minAge, maxAge, ...extra };
}

const subject = (minAge: number, maxAge: number) => role('subject', 'subject', minAge, maxAge);
const parent = (minAge = 45, maxAge = 80, required = true) =>
  role('parent', 'parent', minAge, maxAge, required);
const sibling = (minAge = 25, maxAge = 65, required = true) =>
  role('sibling', 'sibling', minAge, maxAge, required);
const partner = (minAge = 18, maxAge = 35, required = true) =>
  role('partner', 'partner', minAge, maxAge, required);
const neighbor = (minAge = 18, maxAge = 75, required = true) =>
  role('neighbor', 'neighbor', minAge, maxAge, required);
const worker = (minAge = 18, maxAge = 60, required = true) =>
  role('worker', 'worker', minAge, maxAge, required);
const official = (minAge = 30, maxAge = 65, required = true) =>
  role('official', 'official', minAge, maxAge, required);
const teacher = (minAge = 30, maxAge = 65, required = true) =>
  role('teacher', 'teacher', minAge, maxAge, required);
const employer = (minAge = 35, maxAge = 70, required = true) =>
  role('employer', 'employer', minAge, maxAge, required);

/**
 * Organization roles are generic. The condition grammar has no
 * `organizationKind` condition, so the same narrowing lives on the role
 * requirement (`RoleRequirement.organizationKind`). No seed organization id is
 * embedded in a task contract.
 */
function organization(key: string, kind: Organization['kind'], required = true): RoleRequirement {
  return { key, kind: 'organization', required, organizationKind: kind };
}

function historical(
  key: string,
  historicalId: string,
  minAge: number,
  maxAge: number,
  required = true,
): RoleRequirement {
  return { key, kind: 'historical', required, minAge, maxAge, historicalId };
}

const workEffects: EventEffect['type'][] = [
  'cash',
  'mood',
  'reputation',
  'skill',
  'flag',
  'employment',
  'unemployment',
  'relation',
  'health',
];
const workHealthEffects: EventEffect['type'][] = [...workEffects, 'health'];
const learningEffects: EventEffect['type'][] = [
  'cash',
  'mood',
  'reputation',
  'relation',
  'skill',
  'flag',
  'health',
];
const educationEffects: EventEffect['type'][] = [
  'cash',
  'mood',
  'reputation',
  'relation',
  'skill',
  'flag',
  'education',
];
const socialEffects: EventEffect['type'][] = [
  'cash',
  'food',
  'mood',
  'reputation',
  'relation',
  'relation_end',
  'skill',
  'flag',
];
const healthEffects: EventEffect['type'][] = [
  'cash',
  'food',
  'health',
  'condition',
  'mood',
  'relation',
  'reputation',
  'flag',
];
const politicsEffects: EventEffect['type'][] = [
  'cash',
  'mood',
  'reputation',
  'relation',
  'relation_end',
  'role',
  'skill',
  'employment',
  'unemployment',
  'flag',
];
const cultureEffects: EventEffect['type'][] = [
  'cash',
  'food',
  'mood',
  'reputation',
  'relation',
  'skill',
  'flag',
  'education',
];
const familyEffects: EventEffect['type'][] = [
  'cash',
  'food',
  'health',
  'condition',
  'mood',
  'reputation',
  'relation',
  'relation_end',
  'household',
  'residence',
  'flag',
];
const dailyEffects: EventEffect['type'][] = [
  'cash',
  'food',
  'health',
  'mood',
  'reputation',
  'relation',
  'flag',
];
const specialEffects: EventEffect['type'][] = [
  'cash',
  'health',
  'condition',
  'mood',
  'reputation',
  'relation',
  'skill',
  'flag',
  'employment',
  'unemployment',
];
const specialCareEffects: EventEffect['type'][] = [...specialEffects, 'food'];

const node = (brief: ContentNodeBrief): ContentNodeBrief => brief;

export const PHASE8_TASK_BRIEFS: ContentFamilyBrief[] = [
  {
    id: 'task-vienna-poor-apprentice',
    kind: 'task',
    task: task('work', ['work', 'status'], ['cash', 'status'], 1.2, 0.15, ['craft']),
    title: '穷学徒的作坊与工钱',
    stage: 'adolescence',
    ageWindow: { min: 12, max: 30 },
    tags: ['adolescence', 'apprentice', 'work', 'education', 'poverty', 'printshop'],
    baseRate: 0.1,
    conditions: [
      { kind: 'age', min: 12, max: 17 },
      { kind: 'cash', max: 60 },
    ],
    nodeBriefs: [
      node({
        id: 'task-vienna-poor-apprentice.ask-responsibility',
        title: '多要一道工序',
        premise:
          '印厂的学徒干了半年，仍只管搬纸、洗墨辊和给机器上油。今天师傅在压印机旁调墨，他鼓起勇气问能不能学上版；墙角还有一摞没裁的纸。',
        conditions: [
          { kind: 'age', min: 13, max: 17 },
          { kind: 'employment', employed: true },
          { kind: 'education', in: ['primary', 'apprenticeship'] },
        ],
        roles: [subject(13, 17), role('foreman', 'worker', 30, 65), employer(35, 70, false)],
        allowedEffects: workEffects,
        task: task('work', ['work', 'status'], ['autonomy', 'status'], 1.3, 0.1, ['craft']),
        outcomeHints: [
          '师傅让他第二天早到半小时，先学着给整版上墨，工钱暂时不变。',
          '师傅说等这批急活赶完再教，只让他继续搬纸。',
          '师傅嫌他越级多事，叫他先管好自己的活；他打算去问街对面的作坊。',
        ],
      }),
      node({
        id: 'task-vienna-poor-apprentice.request-advance',
        title: '预支一周的工钱',
        premise:
          '星期五发薪，房东已经在楼梯口等着。学徒的工资袋比上月薄，他想向师傅预支下周工钱，或者问能不能涨一点；柜台上的账本写着谁还欠着工具钱。',
        conditions: [
          { kind: 'age', min: 15, max: 17 },
          { kind: 'employment', employed: true },
          { kind: 'cash', max: 25 },
        ],
        roles: [subject(15, 17), role('foreman', 'worker', 30, 65), employer(35, 70, false)],
        allowedEffects: workEffects,
        task: task('work', ['survival', 'work'], ['cash', 'autonomy'], 1.5, 0.3, [
          'numeracy',
          'social',
        ]),
        outcomeHints: [
          '师傅数出几枚硬币，预支了下周的一半工钱，但下周要连本带利扣回去。',
          '师傅把工资袋推回来，说厂里没有预支的规矩，还提醒他别让房东牵着走。',
          '他没有再开口，转头向两个工友借钱，答应发薪当天就还。',
        ],
      }),
      node({
        id: 'task-vienna-poor-apprentice.better-workshop',
        title: '隔着街的另一家作坊',
        premise:
          '他听说另一家印厂给学徒管一顿午饭，师傅也不拿墨刀敲人。下班后他绕到那条街，站在门口看招工牌，玻璃里映出自己沾着油墨的袖口。',
        conditions: [
          { kind: 'age', min: 14, max: 17 },
          { kind: 'employment', employed: true },
          { kind: 'placeKind', in: ['factory'] },
        ],
        roles: [
          subject(14, 17),
          role('journeyman', 'worker', 18, 40, false),
          role('foreman', 'worker', 30, 70),
          employer(35, 70, false),
        ],
        allowedEffects: workEffects,
        task: task('work', ['work', 'status'], ['cash', 'autonomy'], 1.35, 0.35, [
          'craft',
          'social',
        ]),
        outcomeHints: [
          '新作坊答应让他试工一周，工钱要等试工结束再谈。',
          '新作坊没有空缺，只留下他的名字；旧作坊却听说了这件事。',
          '他看完招工牌又回到旧作坊，要求师傅给他一份写明工钱的字据。',
        ],
      }),
      node({
        id: 'task-vienna-poor-apprentice.learn-specialty',
        title: '老排字工的手势',
        premise:
          '车间最老的排字工闭着眼也能从字盘里摸出字母。他午休时教一个年轻工人如何把松动的铅字夹紧；学徒站在旁边，手里还拿着抹布，不敢先开口。',
        conditions: [
          { kind: 'age', min: 12, max: 16 },
          { kind: 'employment', employed: true },
          { kind: 'hasRelation', relationKind: 'colleague', minTrust: 0.2 },
        ],
        roles: [subject(12, 16), role('oldWorker', 'worker', 45, 70)],
        allowedEffects: learningEffects,
        task: task('education', ['knowledge', 'work'], ['knowledge', 'status'], 1.25, 0.1, [
          'craft',
          'literacy',
        ]),
        outcomeHints: [
          '老工人让他在下班后留下来，手把手教他排一版小广告。',
          '老工人只演示了一遍，说剩下的要靠眼睛和手腕自己记。',
          '老工人把他赶回去搬纸，说学徒先要学会不弄坏别人的铅字。',
        ],
      }),
      node({
        id: 'task-vienna-poor-apprentice.cover-coworker',
        title: '替病倒的工友顶一班',
        premise:
          '一个工友在机器旁咳得直不起腰，工头问谁愿意顶后半班。学徒已经干了一整天，但顶班有加班费，也能让工友记住这个人情；机器不能停到明天。',
        conditions: [
          { kind: 'age', min: 15, max: 17 },
          { kind: 'employment', employed: true },
          { kind: 'health', min: 0.5 },
        ],
        roles: [
          subject(15, 17),
          role('sickWorker', 'worker', 18, 50),
          role('foreman', 'worker', 30, 65),
        ],
        allowedEffects: workHealthEffects,
        task: task('work', ['work', 'care'], ['cash', 'status'], 1.4, 0.35, ['craft', 'social']),
        outcomeHints: [
          '他顶完后半班，拿到加班费，回家时手指抖得端不住汤碗。',
          '工头答应下星期补半天休，到了下星期却装作忘了。',
          '病倒的工友不要他替班，只求他顺路去药房买一包退烧药。',
        ],
      }),
      node({
        id: 'task-vienna-poor-apprentice.foreman-introduction',
        title: '亲戚在厂门口等他',
        premise:
          '一个在更大印厂做事的远房亲戚答应星期天带他去见工头。母亲把唯一一件没有补丁的衬衫熨平，亲戚却迟到，嘴里说厂里刚裁过人。',
        conditions: [
          { kind: 'age', min: 12, max: 17 },
          { kind: 'cash', max: 50 },
        ],
        roles: [
          subject(12, 17),
          role('relative', 'neighbor', 35, 65),
          role('foreman', 'worker', 30, 65),
          employer(35, 70, false),
        ],
        allowedEffects: workEffects,
        task: task('work', ['work', 'belonging'], ['cash', 'status', 'belonging'], 1.3, 0.25, [
          'social',
        ]),
        outcomeHints: [
          '亲戚把他带到工头面前，工头让他下星期来试半天。',
          '工头说暂时没有空缺，但答应把他的名字记在招工簿上。',
          '亲戚临时反悔，不肯为一个刚离开旧作坊的学徒作保。',
        ],
      }),
    ],
  },
  {
    id: 'task-vienna-bourgeois-youth',
    kind: 'task',
    task: task('education', ['knowledge', 'status'], ['status', 'knowledge'], 1.25, 0.15, [
      'literacy',
      'social',
    ]),
    title: '资产阶级青年的学校与沙龙',
    stage: 'adulthood',
    ageWindow: { min: 15, max: 35 },
    tags: ['bourgeois', 'education', 'culture', 'salon', 'university', 'family'],
    baseRate: 0.1,
    conditions: [
      { kind: 'age', min: 18, max: 35 },
      { kind: 'cash', min: 40 },
      { kind: 'education', in: ['secondary', 'higher'] },
    ],
    nodeBriefs: [
      node({
        id: 'task-vienna-bourgeois-youth.university-registration',
        title: '大学注册处的长桌',
        premise:
          '中学毕业证书、洗礼证明和一笔注册费摊在长桌上。书记员说拉丁文考试在星期三，若错过就要等到明年；窗外的环城大道上，电车一辆接一辆。',
        conditions: [
          { kind: 'age', min: 18, max: 20 },
          { kind: 'education', in: ['secondary'] },
          { kind: 'cash', min: 50 },
        ],
        roles: [subject(18, 20), teacher(30, 65), official(30, 65)],
        allowedEffects: educationEffects,
        task: task('education', ['knowledge', 'status'], ['knowledge', 'status'], 1.4, 0.2, [
          'literacy',
          'numeracy',
        ]),
        outcomeHints: [
          '他通过考试并拿到注册号，第一学期的课表夹在腋下。',
          '拉丁文没有过，他报名秋季预备班，把入学推迟一年。',
          '家里不肯付注册费，他转去申请一笔只够交学费的奖学金。',
        ],
      }),
      node({
        id: 'task-vienna-bourgeois-youth.salon-invitation',
        title: '沙龙楼梯上的名片',
        premise:
          '一位银行家的夫人在星期二下午开沙龙，门口堆着湿伞和名片。年轻人被同学带来，外套袖口磨白，口袋里只有一张写着自己名字的纸。',
        conditions: [
          { kind: 'age', min: 20, max: 35 },
          { kind: 'cash', min: 60 },
          { kind: 'education', in: ['secondary', 'higher'] },
        ],
        roles: [subject(20, 35), role('host', 'neighbor', 30, 60), neighbor(25, 50, false)],
        allowedEffects: cultureEffects,
        task: task('social', ['status', 'belonging'], ['belonging', 'status'], 1.2, 0.3, [
          'social',
          'literacy',
        ]),
        outcomeHints: [
          '他在钢琴旁和一个出版商谈了很久，临走时拿到一张可以去拜访的地址。',
          '女主人礼貌地请他喝茶，却始终没有把他介绍给房间里的任何人。',
          '他在楼梯口看见自己的旧外套，转身下楼，改请同学去咖啡馆谈。',
        ],
      }),
      node({
        id: 'task-vienna-bourgeois-youth.concert-outing',
        title: '星期天的音乐会票',
        premise:
          '爱乐音乐会的楼座票要四克朗，站票便宜一半。年轻人想约一位在书店认识的朋友去听，但先要确认对方家里是否允许，也要算清楚这个月还剩多少钱。',
        conditions: [
          { kind: 'age', min: 18, max: 35 },
          { kind: 'cash', min: 30 },
        ],
        roles: [subject(18, 35), role('companion', 'neighbor', 18, 35)],
        allowedEffects: cultureEffects,
        task: task('culture', ['belonging', 'status'], ['belonging', 'status'], 1.1, 0.1, [
          'social',
        ]),
        outcomeHints: [
          '他买了两张最便宜的楼座票，两个人在幕间分了一块面包。',
          '朋友临时被家里叫走，他一个人听完，回来时把票根夹进书里。',
          '他嫌票价太贵，改约对方去听教堂的免费音乐会。',
        ],
      }),
      node({
        id: 'task-vienna-bourgeois-youth.study-funding',
        title: '父亲账本上的学费',
        premise:
          '父亲的账本摊在餐桌上，左边是店铺的欠款，右边是儿子的学费。母亲把汤端上来又端走，谁都没有先动勺子；窗外传来送煤车的铁轮声。',
        conditions: [
          { kind: 'age', min: 18, max: 25 },
          { kind: 'education', in: ['secondary', 'higher'] },
          { kind: 'cash', min: 40 },
        ],
        roles: [subject(18, 25), parent(45, 65), sibling(18, 30, false)],
        allowedEffects: educationEffects,
        task: task('education', ['knowledge', 'family'], ['knowledge', 'cash'], 1.3, 0.25, [
          'numeracy',
          'social',
        ]),
        outcomeHints: [
          '父亲答应付一个学期，条件是他每星期回家替店里记一次账。',
          '家里只肯借，不肯给；他拿着一张写明年限的借条离开餐桌。',
          '父亲把账本合上，说店里的位置比讲堂更稳，他当晚没有再说服。',
        ],
      }),
      node({
        id: 'task-vienna-bourgeois-youth.travel-prague',
        title: '去布拉格的车票',
        premise:
          '布拉格有一场夏季讲座，车票和住宿要自己先垫。年轻人把时刻表抄在纸上，母亲已经开始问那边有没有亲戚可以借宿；父亲只关心店里的活谁来做。',
        conditions: [
          { kind: 'age', min: 18, max: 30 },
          { kind: 'cash', min: 50 },
          { kind: 'education', in: ['secondary', 'higher'] },
        ],
        roles: [subject(18, 30), role('relative', 'neighbor', 30, 65)],
        allowedEffects: cultureEffects,
        task: task('migration', ['knowledge', 'status'], ['autonomy', 'knowledge'], 1.2, 0.3, [
          'social',
          'numeracy',
        ]),
        outcomeHints: [
          '他坐夜车去布拉格，听完讲座又带回一叠笔记和两个新地址。',
          '他在车站误了换乘，钱花在旅店上，讲座只赶上最后一场。',
          '他决定多留两周，给家里写信说要在那边旁听，行李随后寄到。',
        ],
      }),
      node({
        id: 'task-vienna-bourgeois-youth.family-business-or-study',
        title: '账房还是讲堂',
        premise:
          '家里的纺织品铺子缺一个管账的人，父亲已经把钥匙放在桌上；同一张桌上还有大学的听课证。母亲说两条路都能走，但只能先走一条。',
        conditions: [
          { kind: 'age', min: 18, max: 25 },
          { kind: 'cash', min: 80 },
          { kind: 'education', in: ['secondary', 'higher'] },
        ],
        roles: [
          subject(18, 25),
          parent(45, 65),
          teacher(30, 65, false),
          role('employer', 'employer', 35, 70, false),
        ],
        allowedEffects: [...educationEffects, 'employment', 'unemployment'],
        task: task(
          'education',
          ['status', 'knowledge', 'family'],
          ['autonomy', 'status'],
          1.5,
          0.35,
          ['numeracy', 'social'],
        ),
        outcomeHints: [
          '他选了大学，父亲停掉每月的零用钱，他去找家教补贴。',
          '他接过账房钥匙，但报名了夜间的经济课程，把两件事都压在身上。',
          '他和父亲谈成一年试用：先管账，若考试通过再回学校。',
        ],
      }),
    ],
  },
  {
    id: 'task-vienna-medical-work',
    kind: 'task',
    task: task('health', ['care', 'survival'], ['health', 'care'], 1.3, 0.2, ['social']),
    title: '诊所、病房与第二位医生',
    stage: 'adulthood',
    ageWindow: { min: 22, max: 70 },
    tags: ['health', 'medicine', 'hospital', 'care', 'knowledge', 'profession'],
    baseRate: 0.1,
    conditions: [{ kind: 'age', min: 22, max: 59 }],
    nodeBriefs: [
      node({
        id: 'task-vienna-medical-work.second-opinion',
        title: '第二位医生的诊室',
        premise:
          '第一位医生说是慢性胃炎，只开了药粉和一张饮食单。病人夜里仍疼得蜷起来，于是带着病历去另一间诊室；门口已经排了七个人，墙上的钟慢了一刻。',
        conditions: [
          { kind: 'age', min: 22, max: 59 },
          { kind: 'health', max: 0.8 },
        ],
        roles: [
          subject(22, 59),
          role('doctor', 'worker', 30, 70, true, { occupation: 'Arzt' }),
          neighbor(25, 70, false),
        ],
        allowedEffects: healthEffects,
        task: task('health', ['survival', 'care'], ['health', 'care'], 1.5, 0.25, ['social']),
        outcomeHints: [
          '第二位医生听了心口，改了诊断，换掉原来的药粉。',
          '第二位医生同意第一位医生的判断，但开了一个更便宜的替代方子。',
          '他付不起第二份诊费，只拿到一张转诊单和一句“下星期再来”。',
        ],
      }),
      node({
        id: 'task-vienna-medical-work.house-call',
        title: '雪夜里的出诊',
        premise:
          '电话从利奥波德城的一间合租房打来，说孩子烧到抽搐。医生提着皮包出门，雪把电车轨道埋了一半；那家人上个月还欠着药费，屋里连一盏亮着的灯都没有。',
        conditions: [
          { kind: 'age', min: 25, max: 59 },
          { kind: 'employment', employed: true },
          { kind: 'hasRole', role: 'physician' },
        ],
        roles: [
          subject(25, 59),
          neighbor(5, 80),
          parent(25, 55, false),
          organization('hospital', 'other', false),
        ],
        allowedEffects: healthEffects,
        task: task('health', ['care', 'work'], ['care', 'cash'], 1.4, 0.35, ['social', 'numeracy']),
        outcomeHints: [
          '他守到天亮，把孩子从肺炎边缘拉回来，临走时收下一筐煤抵诊费。',
          '他到时孩子已经不再抽搐，只能陪着母亲坐一会儿，写下死亡证明。',
          '他嫌夜路太远、诊费没有着落，让电话那头去找值班医生，第二天又后悔。',
        ],
      }),
      node({
        id: 'task-vienna-medical-work.senior-training',
        title: '资深医生身后的实习位',
        premise:
          '医院走廊里，资深医生带着一群学生查房，年轻助手只能站在最后。今天他鼓起勇气问能不能跟完整个冬季的病房，而不是只抄病历和换墨水瓶。',
        conditions: [
          { kind: 'age', min: 22, max: 32 },
          { kind: 'education', in: ['higher'] },
          { kind: 'employment', employed: true },
        ],
        roles: [
          subject(22, 32),
          role('seniorDoctor', 'worker', 45, 70, true, { occupation: 'Arzt' }),
          organization('hospital', 'other', false),
        ],
        allowedEffects: [...educationEffects, 'health'],
        task: task('education', ['knowledge', 'status'], ['knowledge', 'status'], 1.3, 0.15, [
          'literacy',
          'social',
        ]),
        outcomeHints: [
          '资深医生让他从下周起跟着查房，先从记录体温和脉搏开始。',
          '资深医生没有答应，只把一叠旧病历交给他，让他先学会写清楚。',
          '资深医生推荐他去另一家诊所，说那里的主任更愿意带年轻人。',
        ],
      }),
      node({
        id: 'task-vienna-medical-work.research-treatment',
        title: '病历夹里的对照',
        premise:
          '一本德文医学期刊上登着两种疗法的小样本对照，数字并不漂亮。年轻医生想把其中一种用在病房里，但需要资深医生点头，也需要家属签字；窗外的雪把病房照得发白。',
        conditions: [
          { kind: 'age', min: 25, max: 59 },
          { kind: 'education', in: ['higher'] },
          { kind: 'employment', employed: true },
        ],
        roles: [
          subject(25, 59),
          role('seniorDoctor', 'worker', 40, 70, true, { occupation: 'Arzt' }),
          historical('freud', 'Q9215', 54, 62, false),
        ],
        allowedEffects: [
          'health',
          'condition',
          'skill',
          'flag',
          'relation',
          'reputation',
          'mood',
          'cash',
        ],
        task: task('knowledge', ['knowledge', 'care'], ['knowledge', 'status'], 1.2, 0.2, [
          'literacy',
          'numeracy',
        ]),
        outcomeHints: [
          '小规模试用后，几个病人的症状减轻，他把结果写成一页简报。',
          '试用没有明显差别，他在病历上写下“证据不足”，没有再推广。',
          '资深医生认为样本太少，把期刊合上，他只好把想法留在笔记里。',
        ],
      }),
      node({
        id: 'task-vienna-medical-work.health-campaign',
        title: '诊所门前的宣传桌',
        premise:
          '区里的诊所想在集市口摆一张桌子，量体重、发肥皂、讲婴儿腹泻的预防。需要市政厅的许可，也需要几个愿意在星期天站半天的人；旁边肉铺的老板嫌桌子挡路。',
        conditions: [
          { kind: 'age', min: 28, max: 59 },
          { kind: 'employment', employed: true },
          { kind: 'hasRole', role: 'physician' },
        ],
        roles: [
          subject(28, 59),
          official(30, 65),
          organization('hospital', 'other', false),
          neighbor(18, 60),
        ],
        allowedEffects: [
          'health',
          'condition',
          'reputation',
          'relation',
          'cash',
          'food',
          'mood',
          'flag',
          'role',
        ],
        task: task('health', ['care', 'cause'], ['health', 'care', 'status'], 1.4, 0.3, [
          'social',
          'numeracy',
        ]),
        outcomeHints: [
          '许可批下来，桌子在集市口摆了一个月，量体重的人排到了肉铺门口。',
          '市政厅把活动当成党派宣传，只批了一天，还派人来记录讲话。',
          '来的人不多，但一个脱水婴儿被及时发现，母亲后来带着鸡蛋来道谢。',
        ],
      }),
      node({
        id: 'task-vienna-medical-work.poor-patient',
        title: '付不起药费的病人',
        premise:
          '药房柜台上的药瓶标着一克朗二十赫勒，病人把口袋里的硬币数了两遍。医生知道这家人靠洗衣服过活，也知道诊所的账上不能一直赊；柜台上还放着没盖章的处方。',
        conditions: [
          { kind: 'age', min: 22, max: 59 },
          { kind: 'employment', employed: true },
          { kind: 'cash', min: 15 },
        ],
        roles: [subject(22, 59), neighbor(10, 75), parent(25, 55, false)],
        allowedEffects: healthEffects,
        task: task('health', ['care'], ['care', 'health'], 1.3, 0.2, ['social']),
        outcomeHints: [
          '他替病人垫了药费，在处方背面写下还款日期。',
          '他去找教区互助会，凑齐药费，但病人得在册子上按下手印。',
          '他想起这家人上次也欠着诊费，把处方推回去，只留下饮食单。',
        ],
      }),
    ],
  },
  {
    id: 'task-vienna-activist',
    kind: 'task',
    task: task('politics', ['cause', 'belonging'], ['belonging', 'status'], 1.3, 0.35, [
      'social',
      'literacy',
    ]),
    title: '工会、政党与街头的名单',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 60 },
    tags: ['politics', 'activism', 'union', 'party', 'leaflet', 'meeting'],
    baseRate: 0.1,
    conditions: [{ kind: 'age', min: 18, max: 59 }],
    nodeBriefs: [
      node({
        id: 'task-vienna-activist.join-union',
        title: '工会活动室的入会表',
        premise:
          '工会活动室在印刷厂后面，墙上贴着会费和罢工基金的数字。一个老会员把入会表推过来，问他愿不愿意在下周会议上自我介绍；门边还靠着上次集会用过的木牌。',
        conditions: [
          { kind: 'age', min: 18, max: 59 },
          { kind: 'employment', employed: true },
          { kind: 'placeKind', in: ['factory'] },
          { kind: 'notHasRole', role: 'union_member' },
        ],
        roles: [
          subject(18, 59),
          role('unionMember', 'union_member', 25, 65),
          organization('union', 'union'),
        ],
        allowedEffects: politicsEffects,
        task: task('politics', ['cause', 'belonging'], ['belonging', 'safety'], 1.3, 0.3, [
          'social',
          'literacy',
        ]),
        outcomeHints: [
          '他填了表，按周交会费，名字被写进蓝皮会员册。',
          '他去了一次会议，但拒绝在会费之外再签罢工基金承诺。',
          '厂里听说了入会的事，工头暗示他下个月可能没有班可上。',
        ],
      }),
      node({
        id: 'task-vienna-activist.recruit-coworker',
        title: '午饭时的空座位',
        premise:
          '午饭时，一个年轻工友独自坐在窗边，抱怨工钱被扣。工会会员端着汤坐过去，先问他家里几口人，再问他知不知道下个月的请愿；食堂里有人竖起耳朵。',
        conditions: [
          { kind: 'age', min: 20, max: 59 },
          { kind: 'employment', employed: true },
          { kind: 'placeKind', in: ['factory'] },
          { kind: 'hasRole', role: 'union_member' },
        ],
        roles: [subject(20, 59), worker(18, 60), employer(35, 70, false)],
        allowedEffects: politicsEffects,
        task: task('politics', ['cause', 'belonging'], ['belonging', 'status'], 1.25, 0.4, [
          'social',
        ]),
        outcomeHints: [
          '工友在工资被扣后第二天来交了会费，还带来同车间的两个人。',
          '工友把谈话告诉了工头，下午工会会员就被叫去问话。',
          '工友答应来听一次会，但始终没有在名册上签字。',
        ],
      }),
      node({
        id: 'task-vienna-activist.publish-leaflet',
        title: '油印机旁的夜班',
        premise:
          '一份要求缩短工时和承认工会的传单要赶在星期一早班前印出来。纸张是大家凑钱买的，油墨从厂里刮来半罐；谁去分发，谁就可能被警察记下名字。',
        conditions: [
          { kind: 'age', min: 20, max: 59 },
          { kind: 'employment', employed: true },
          { kind: 'placeKind', in: ['factory'] },
          { kind: 'hasRole', role: 'printer' },
        ],
        roles: [subject(20, 59), worker(20, 60), organization('union', 'union')],
        allowedEffects: politicsEffects,
        task: task('politics', ['cause', 'status'], ['belonging', 'status'], 1.35, 0.55, [
          'literacy',
          'craft',
        ]),
        outcomeHints: [
          '传单在早班前塞进更衣柜和面包袋，午休时已经有人在楼梯间读。',
          '警察在厂门口搜包，传单被没收，他还收到一张传唤单。',
          '排字工不肯冒险开机，他只好手写几张，贴到市场附近的墙上。',
        ],
      }),
      node({
        id: 'task-vienna-activist.speak-meeting',
        title: '后屋的发言顺序',
        premise:
          '后屋挤了四十多人，长凳不够，后来的人靠墙站着。主持人把发言名单钉在门边，第一个名字被划掉，第二个名字就是他；桌上只有半瓶啤酒和一只会停的钟。',
        conditions: [
          { kind: 'age', min: 20, max: 59 },
          { kind: 'hasRole', role: 'union_member' },
          { kind: 'developmentType', type: 'social_change' },
        ],
        roles: [
          subject(20, 59),
          role('chair', 'union_member', 30, 65),
          official(30, 65, false),
          organization('union', 'union'),
        ],
        allowedEffects: politicsEffects,
        task: task('politics', ['cause', 'status'], ['belonging', 'status'], 1.3, 0.45, [
          'social',
          'literacy',
        ]),
        outcomeHints: [
          '他把工价和工时讲清楚，会议通过了一项要求加薪的动议。',
          '他的话被嘘声打断，会议分成两派，事后有人怪他太急。',
          '他站到桌边又坐下，把发言让给了旁边的老工人。',
        ],
      }),
      node({
        id: 'task-vienna-activist.negotiate-employer',
        title: '厂长办公室里的三个人',
        premise:
          '厂长把怀表放在桌上，说只能谈一刻钟。工会代表带着一张写满工价和工时的纸，门外站着两个被扣了工资的工人；窗台上摆着一盆快枯的常春藤。',
        conditions: [
          { kind: 'age', min: 25, max: 59 },
          { kind: 'employment', employed: true },
          { kind: 'placeKind', in: ['factory'] },
          { kind: 'hasRole', role: 'union_member' },
        ],
        roles: [subject(25, 59), employer(35, 70), official(30, 65, false), worker(18, 60)],
        allowedEffects: [...politicsEffects, 'cash'],
        task: task('politics', ['work', 'cause'], ['cash', 'safety'], 1.5, 0.6, [
          'social',
          'numeracy',
        ]),
        outcomeHints: [
          '厂长同意给被扣工资的工人补一半，并答应下月再谈工时。',
          '厂长叫来门房，把代表请出办公室，第二天车间门口贴出停工通知。',
          '市政厅的官员把双方请去谈了两个小时，最后只成立了一个没有期限的委员会。',
        ],
      }),
      node({
        id: 'task-vienna-activist.contact-adler',
        title: '社会民主党总部的一封信',
        premise:
          '工会想请一位有名望的党领袖来维也纳郊区讲话，但总部离工厂很远。会员在信纸上写了三遍称呼，最后决定亲自把信送到编辑部；街角的报摊已经卖完了当天的《工人报》。',
        conditions: [
          { kind: 'age', min: 22, max: 59 },
          { kind: 'hasRole', role: 'union_member' },
          { kind: 'historicalProcess', processKind: 'social_movement' },
        ],
        roles: [
          subject(22, 59),
          historical('adler', 'Q366845', 58, 66),
          organization('party', 'party', false),
        ],
        allowedEffects: [...politicsEffects, 'relation'],
        task: task('politics', ['cause', 'status'], ['belonging', 'status'], 1.4, 0.4, [
          'literacy',
          'social',
        ]),
        outcomeHints: [
          'Adler 回了信，答应派一位演说者，还附上一叠党的小册子。',
          '回信很客气，只说总部排不出人，建议他们先和本地支部联系。',
          '信在编辑部压了两个星期，他索性搭电车进城，在门口等到散会。',
        ],
      }),
    ],
  },
  {
    id: 'task-vienna-special-capability',
    kind: 'task',
    task: task('special', ['knowledge', 'status'], ['knowledge', 'autonomy'], 1.2, 0.2, []),
    title: '一门手艺、一副身体与一张纸',
    stage: 'adulthood',
    ageWindow: { min: 12, max: 60 },
    tags: ['special', 'capability', 'literacy', 'numeracy', 'craft', 'care'],
    baseRate: 0.1,
    conditions: [{ kind: 'age', min: 18, max: 59 }],
    nodeBriefs: [
      node({
        id: 'task-vienna-special-capability.decipher-document',
        title: '抽屉里的手写契据',
        premise:
          '邻居在清理亡夫的抽屉时找到一张手写契据，上面写着屋顶修缮费摊派和一条用小字补上的期限。她只上过两年学，把纸拿来请人读；纸角还沾着咖啡渍。',
        conditions: [
          { kind: 'age', min: 18, max: 59 },
          { kind: 'capability', capability: 'literacy' },
        ],
        roles: [subject(18, 59), neighbor(30, 75), official(30, 65, false)],
        allowedEffects: specialEffects,
        task: task(
          'knowledge',
          ['knowledge', 'status'],
          ['knowledge', 'autonomy'],
          1.25,
          0.1,
          ['literacy'],
          'literacy',
        ),
        outcomeHints: [
          '他读出一条对邻居有利的旧条款，替她省下了一笔摊派。',
          '他把日期读错了一天，邻居错过了申诉，只能重新递材料。',
          '他不敢确定小字的意思，坚持等市政厅的书记员来读。',
        ],
      }),
      node({
        id: 'task-vienna-special-capability.calculate-debt',
        title: '利息滚到第几周',
        premise:
          '街角杂货店的赊账本上，一袋面粉的价钱被写成两种数字。邻居说她已经还了三次，店主说还差两周的利息；两个人把账本推到能算数的人面前。',
        conditions: [
          { kind: 'age', min: 18, max: 59 },
          { kind: 'capability', capability: 'numeracy' },
          { kind: 'cash', max: 40 },
        ],
        roles: [subject(18, 59), neighbor(25, 70), worker(30, 65, false)],
        allowedEffects: specialEffects,
        task: task(
          'work',
          ['work', 'status'],
          ['cash', 'autonomy'],
          1.3,
          0.15,
          ['numeracy'],
          'numeracy',
        ),
        outcomeHints: [
          '他按周重算，发现店主多收了一周的利息，邻居拿回了几个硬币。',
          '他的算法没错，但店主不认账，邻居最后还是按原数付了。',
          '他建议邻居改成分期，把每周该还的数字写在账本封底。',
        ],
      }),
      node({
        id: 'task-vienna-special-capability.mediate-dispute',
        title: '院子里的两把钥匙',
        premise:
          '两家人共用一间厨房和一只水龙头，最近为谁该在星期天先用炉子吵到房东那里。钥匙只有两把，孩子们开始把对方的水桶藏起来。',
        conditions: [
          { kind: 'age', min: 18, max: 59 },
          { kind: 'capability', capability: 'social_insight' },
          { kind: 'householdSize', min: 3 },
        ],
        roles: [
          subject(18, 59),
          role('firstParty', 'neighbor', 18, 75),
          role('secondParty', 'neighbor', 18, 75),
        ],
        allowedEffects: [
          'cash',
          'food',
          'health',
          'condition',
          'mood',
          'reputation',
          'relation',
          'relation_end',
          'skill',
          'flag',
        ],
        task: task(
          'social',
          ['belonging', 'family'],
          ['belonging', 'safety'],
          1.2,
          0.2,
          ['social'],
          'social_insight',
        ),
        outcomeHints: [
          '两家人同意按星期分炉子，钥匙各留一把，孩子也不再藏水桶。',
          '他们当面点头，过了一个星期又为一块煤渣吵起来。',
          '调解失败，其中一家开始找房子，院子里的厨房只剩一把钥匙。',
        ],
      }),
      node({
        id: 'task-vienna-special-capability.repair-machine',
        title: '停转的踏车',
        premise:
          '裁缝铺的踏车在赶活时卡住，飞轮转半圈就发出刮擦声。店主已经准备请城里的技师，但技师要两天后才到，而婚礼的礼服星期天就要交。',
        conditions: [
          { kind: 'age', min: 18, max: 59 },
          { kind: 'capability', capability: 'craft_affinity' },
          { kind: 'placeKind', in: ['home', 'factory'] },
        ],
        roles: [subject(18, 59), worker(20, 60), employer(35, 70, false)],
        allowedEffects: [...specialEffects, 'employment', 'unemployment'],
        task: task(
          'work',
          ['work', 'status'],
          ['cash', 'status'],
          1.35,
          0.25,
          ['craft'],
          'craft_affinity',
        ),
        outcomeHints: [
          '他拆开轴套，用锉刀修好磨损的边，踏车在傍晚重新转起来。',
          '机器当天转了，第二天又卡住，店主只好还是去请技师。',
          '他请技师来修，自己蹲在旁边递工具，把每一步都记在纸上。',
        ],
      }),
      node({
        id: 'task-vienna-special-capability.hard-journey',
        title: '去疗养院的三次换车',
        premise:
          '医生说要换到城外的松树林住六周，车票要换三次，最后一次是窄轨小火车。病人胸口发紧，提不动箱子，但家里的床和炉子也不能一直空着。',
        conditions: [
          { kind: 'age', min: 18, max: 59 },
          { kind: 'capability', capability: 'frail_body' },
          { kind: 'health', max: 0.7 },
        ],
        roles: [subject(18, 59), neighbor(25, 70), official(30, 65, false)],
        allowedEffects: [...specialEffects, 'food'],
        task: task(
          'health',
          ['survival', 'care'],
          ['health', 'safety'],
          1.1,
          0.4,
          [],
          'frail_body',
        ),
        outcomeHints: [
          '他在每个站台都坐下来歇一会儿，天黑前到了疗养院，六周后咳嗽轻了。',
          '他在第二次换车时晕倒，被送回维也纳，疗养的事拖到明年。',
          '他退掉车票，把邻居请来照看炉子，改用城里的门诊和药粉。',
        ],
      }),
      node({
        id: 'task-vienna-special-capability.nurse-patient',
        title: '隔壁床的夜班',
        premise:
          '邻居家的男人得了流感，女人白天在洗衣房上工，家里还有两个孩子。病人需要有人夜里看着、按时喂药、换湿透的床单；走廊里的水龙头整夜滴着水。',
        conditions: [
          { kind: 'age', min: 18, max: 59 },
          { kind: 'capability', capability: 'health' },
          { kind: 'health', min: 0.5 },
        ],
        roles: [subject(18, 59), neighbor(5, 80), parent(25, 55, false)],
        allowedEffects: specialCareEffects,
        task: task(
          'health',
          ['care', 'survival'],
          ['health', 'care'],
          1.25,
          0.2,
          ['social'],
          'health',
        ),
        outcomeHints: [
          '他守了三夜，病人的烧退了，女人回来时把工钱分了一半给他。',
          '病人好转，他自己却开始咳嗽，只好把夜班交给另一个邻居。',
          '病人的呼吸越来越急，他不再等，连夜去敲医生的门。',
        ],
      }),
    ],
  },
  {
    id: 'task-vienna-daily-culture',
    kind: 'task',
    task: task('daily', ['rest', 'belonging'], ['belonging', 'status'], 1.0, 0.05, ['social']),
    title: '老年人在咖啡馆、教堂与市场',
    stage: 'elderhood',
    ageWindow: { min: 12, max: 80 },
    tags: ['elderhood', 'daily', 'culture', 'cafe', 'church', 'market'],
    baseRate: 0.1,
    conditions: [{ kind: 'age', min: 60, max: 80 }],
    nodeBriefs: [
      node({
        id: 'task-vienna-daily-culture.cafe-newspaper',
        title: '咖啡馆里的第二份报纸',
        premise:
          '早晨的咖啡馆里，一份《新自由报》在几张桌子之间传来传去。有人读到议会争吵，有人只关心煤气价格；侍者把咖啡杯放下时，杯底压着昨天的另一份报。',
        conditions: [
          { kind: 'age', min: 60, max: 80 },
          { kind: 'cash', min: 3 },
        ],
        roles: [subject(60, 80), neighbor(55, 85), worker(18, 60, false)],
        allowedEffects: [...dailyEffects, 'skill'],
        task: task('daily', ['rest', 'belonging'], ['belonging', 'status'], 1.0, 0.05, [
          'literacy',
          'social',
        ]),
        outcomeHints: [
          '他把报纸让给邻桌，两个人就一条议会新闻争到咖啡凉了。',
          '他听见有人把新闻读错，纠正了一句，桌边忽然安静下来。',
          '他替腿脚不便的邻居买了一份报，回来时自己的咖啡已经收走。',
        ],
      }),
      node({
        id: 'task-vienna-daily-culture.cinema-concert',
        title: '周日下午的楼座',
        premise:
          '电影院星期天加演一场，楼座比正厅便宜二十赫勒。老人已经很久没进过黑暗的大厅，担心自己的耳朵受不了铜管乐，也担心回来时天已经黑了。',
        conditions: [
          { kind: 'age', min: 60, max: 80 },
          { kind: 'cash', min: 5 },
        ],
        roles: [subject(60, 80), neighbor(55, 85), worker(18, 60, false)],
        allowedEffects: dailyEffects,
        task: task('culture', ['rest', 'belonging'], ['belonging', 'status'], 1.0, 0.05, [
          'social',
        ]),
        outcomeHints: [
          '他买了楼座最后一排的票，散场时还跟着人群哼了一段旋律。',
          '铜管乐一响他就捂耳朵，没等中场便扶着栏杆走出去。',
          '邻居替他付了票钱，他回家路上一路计算着怎么还这份人情。',
        ],
      }),
      node({
        id: 'task-vienna-daily-culture.church-festival',
        title: '教堂前的教区节',
        premise:
          '教区节在星期天午后开始，门口搭起卖甜点和蜡烛的棚子，孩子们在台阶上跑。老人被请去帮忙摆椅子，也可能只是去喝一碗汤；钟楼上的鸽子被铃声惊起。',
        conditions: [
          { kind: 'age', min: 60, max: 80 },
          { kind: 'placeKind', in: ['home', 'church'] },
        ],
        roles: [subject(60, 80), neighbor(50, 85), organization('church', 'church', false)],
        allowedEffects: dailyEffects,
        task: task('culture', ['belonging', 'rest'], ['belonging', 'status'], 1.0, 0.05, [
          'social',
        ]),
        outcomeHints: [
          '他帮忙摆完椅子，留下来喝了一碗汤，还答应下次带一盘点心。',
          '他把口袋里的零钱全投进捐款箱，回家时没有钱坐电车。',
          '他走到教堂门口，看见和自己吵过架的教友，转身去了市场。',
        ],
      }),
      node({
        id: 'task-vienna-daily-culture.market-bargain',
        title: '收摊前的半篮李子',
        premise:
          '市场收摊前，卖水果的女人把碰伤的李子堆到一边，半篮只要几赫勒。老人数着口袋里的硬币，想着家里的糖罐和明天会不会下雨；旁边的鱼摊已经开始冲洗石板。',
        conditions: [
          { kind: 'age', min: 60, max: 80 },
          { kind: 'cash', max: 30 },
        ],
        roles: [subject(60, 80), role('marketWoman', 'worker', 30, 70), neighbor(50, 85, false)],
        allowedEffects: dailyEffects,
        task: task('daily', ['survival', 'rest'], ['food', 'cash'], 1.1, 0.05, [
          'numeracy',
          'social',
        ]),
        outcomeHints: [
          '他挑出还能吃的半篮，付了钱，女人又塞给他一只苹果。',
          '他觉得价钱已经够低，按原价付了，女人反而不好意思。',
          '他回家才发现篮底有几只已经烂透，第二天拎回来换了几个。',
        ],
      }),
      node({
        id: 'task-vienna-daily-culture.neighborhood-rumor',
        title: '楼梯间传开的话',
        premise:
          '楼道里有人说三楼的女人把房客的钱藏起来了，也有人说那是她死去的丈夫留下的债。话从看门人传到面包店，又传回楼梯间；每个人都能补上一个细节。',
        conditions: [
          { kind: 'age', min: 60, max: 80 },
          { kind: 'householdSize', min: 1 },
        ],
        roles: [
          subject(60, 80),
          neighbor(30, 75),
          role('otherNeighbor', 'neighbor', 30, 75, false),
        ],
        allowedEffects: ['cash', 'mood', 'reputation', 'relation', 'relation_end', 'flag'],
        task: task('social', ['belonging', 'status'], ['belonging', 'safety'], 0.9, 0.2, [
          'social',
        ]),
        outcomeHints: [
          '他上楼问了当事人，把听来的话当面说清，谣言在当天下午停了。',
          '他把听来的话又讲给面包店的人，三楼的女人从此不再和他打招呼。',
          '他没有传话，只提醒那家人把门锁换掉，免得债主找错门。',
        ],
      }),
      node({
        id: 'task-vienna-daily-culture.public-lecture',
        title: '市立图书馆的公开讲座',
        premise:
          '图书馆的讲座题目是“维也纳的水与下水道”，海报贴在借书处。老人年轻时在工地挑过土，想知道后来那些管道究竟通到哪里；座位有限，要提前半小时到。',
        conditions: [
          { kind: 'age', min: 60, max: 80 },
          { kind: 'education', in: ['primary', 'secondary', 'higher', 'apprenticeship'] },
        ],
        roles: [subject(60, 80), teacher(30, 70), neighbor(50, 85, false)],
        allowedEffects: [...dailyEffects, 'education', 'skill'],
        task: task('knowledge', ['knowledge', 'belonging'], ['knowledge', 'status'], 1.0, 0.05, [
          'literacy',
          'social',
        ]),
        outcomeHints: [
          '他在提问时间讲了自己当年挑土的工地，讲师请他上台画了一条旧管线。',
          '讲座还没到一半，他就在暖气和低声讲解里睡着了，散场时才醒。',
          '他在门口遇见一个多年不见的老同事，两人没听完就去喝咖啡了。',
        ],
      }),
    ],
  },
  {
    id: 'task-vienna-family-care',
    kind: 'task',
    task: task('family', ['family', 'care'], ['belonging', 'care'], 1.2, 0.15, ['social']),
    title: '求婚、照护与家里的房间',
    stage: 'adulthood',
    ageWindow: { min: 16, max: 80 },
    tags: ['family', 'care', 'courtship', 'siblings', 'inheritance', 'housing'],
    baseRate: 0.1,
    conditions: [{ kind: 'age', min: 18, max: 59 }],
    allowedResidenceIds: ['place-wien-leopoldstadt-tenement', 'place-klosterneuburg-aunt-house'],
    nodeBriefs: [
      node({
        id: 'task-vienna-family-care.courtship-invitation',
        title: '星期天下午的邀请',
        premise:
          '两人在面包店门口遇见，手里都拿着刚买的 Semmel。年轻人想请对方星期天去多瑙运河边散步，但对方家里规矩严，必须先问清楚谁能同行。',
        conditions: [
          { kind: 'age', min: 18, max: 35 },
          { kind: 'notHasRelation', relationKind: 'partner' },
          { kind: 'cash', min: 5 },
        ],
        roles: [subject(18, 35), partner(18, 35), neighbor(18, 70, false)],
        allowedEffects: ['cash', 'food', 'mood', 'reputation', 'relation', 'relation_end', 'flag'],
        task: task('family', ['family', 'belonging'], ['belonging', 'status'], 1.3, 0.2, [
          'social',
        ]),
        outcomeHints: [
          '对方答应了散步，还说到时候会带上妹妹一起走前半段。',
          '对方礼貌地拒绝，说家里不许单独出门，但可以参加教堂的集体郊游。',
          '年轻人请对方的姑妈先来家里坐一趟，把见面的规矩谈清楚。',
        ],
      }),
      node({
        id: 'task-vienna-family-care.reconcile-siblings',
        title: '分家后第一次同桌',
        premise:
          '父亲留下的房子和债务分完之后，兄妹已经两年没有坐在同一张桌上。母亲的忌日快到了，教堂要安排一顿简单的饭，谁去请谁成了问题。',
        conditions: [
          { kind: 'age', min: 25, max: 59 },
          { kind: 'hasRelation', relationKind: 'kin', minTrust: 0.1 },
        ],
        roles: [subject(25, 59), sibling(25, 65), parent(60, 85, false)],
        allowedEffects: ['cash', 'food', 'mood', 'reputation', 'relation', 'relation_end', 'flag'],
        task: task('family', ['family', 'belonging'], ['belonging', 'care'], 1.2, 0.2, ['social']),
        outcomeHints: [
          '兄妹在汤桌前把旧账说开，最后一起去了墓地。',
          '一句话又提起分家时的那只柜子，饭没吃完就散了。',
          '他们没有和好，只约定每年忌日在教堂门口见一面。',
        ],
      }),
      node({
        id: 'task-vienna-family-care.care-sick-parent',
        title: '床边的一夜',
        premise:
          '老母亲夜里咳得睡不着，药粉只剩两包，医生说明天才能再来。家里还有孩子要上学，炉子要添煤，明天一早还得有人去上工；床边的水盆已经换了三次。',
        conditions: [
          { kind: 'age', min: 30, max: 59 },
          { kind: 'hasRelation', relationKind: 'kin' },
        ],
        roles: [subject(30, 59), parent(65, 90), neighbor(30, 75, false)],
        allowedEffects: familyEffects,
        task: task('family', ['care', 'family'], ['care', 'health'], 1.4, 0.25, ['social']),
        outcomeHints: [
          '他守到天亮，按时喂药，母亲的呼吸慢慢平下来。',
          '他请邻居白天来搭把手，付了一点钱，自己去上工。',
          '他决定把母亲送去医院，先向工头请一天假，再想办法凑押金。',
        ],
      }),
      node({
        id: 'task-vienna-family-care.ask-relative-money',
        title: '舅舅家的门铃',
        premise:
          '房租、药费和学校的书本费挤在同一个月。能借的人已经借过一圈，只剩下住在隔壁区的舅舅；他上一次借钱时说过“这是最后一次”。',
        conditions: [
          { kind: 'age', min: 18, max: 59 },
          { kind: 'cash', max: 25 },
          { kind: 'hasRelation', relationKind: 'kin' },
        ],
        roles: [subject(18, 59), role('relative', 'neighbor', 35, 75), parent(45, 75, false)],
        allowedEffects: ['cash', 'food', 'mood', 'reputation', 'relation', 'relation_end', 'flag'],
        task: task('family', ['survival', 'family'], ['cash', 'safety'], 1.4, 0.35, ['social']),
        outcomeHints: [
          '舅舅借了钱，但要求写下还款日期，还让他每月来报一次账。',
          '舅舅没有借钱，只装了一袋面粉和半瓶油让他带回去。',
          '他没有开口借钱，改问舅舅的铺子要不要一个周末帮工。',
        ],
      }),
      node({
        id: 'task-vienna-family-care.room-move',
        title: '换到朝北的小间',
        premise:
          '一家五口挤在两间房，房东说隔壁那间朝北的小间空出来了，租金少三克朗，但要自己修窗户。孩子们已经在争谁睡靠近炉子的位置；楼道里堆着没处放的箱子。',
        conditions: [
          { kind: 'age', min: 25, max: 59 },
          { kind: 'overcrowded', value: true },
        ],
        roles: [subject(25, 59), neighbor(30, 70), worker(18, 60, false)],
        allowedEffects: familyEffects,
        task: task('family', ['family', 'survival'], ['cash', 'autonomy'], 1.3, 0.25, [
          'numeracy',
          'social',
        ]),
        outcomeHints: [
          '他们搬进朝北的小间，用省下的租金买了玻璃和煤。',
          '他们没有搬，只把空出来的床位租给一个学徒，家里更挤了。',
          '房东临时改口，说小间已经答应给别人，除非他们加钱。',
        ],
      }),
      node({
        id: 'task-vienna-family-care.inheritance-guardianship',
        title: '公证人桌上的遗嘱',
        premise:
          '公证人的桌上摊着遗嘱、房产登记和一份监护人同意书。老人想把房子留给照顾自己的女儿，又担心儿子们不服；最小的孩子还未成年，墨水在纸上洇开一小块。',
        conditions: [
          { kind: 'age', min: 35, max: 59 },
          { kind: 'cash', min: 30 },
          { kind: 'hasRelation', relationKind: 'kin' },
        ],
        roles: [subject(35, 59), official(30, 65), sibling(25, 65), parent(65, 90, false)],
        allowedEffects: [
          'cash',
          'food',
          'mood',
          'reputation',
          'relation',
          'relation_end',
          'flag',
          'household',
          'residence',
        ],
        task: task('family', ['family', 'status'], ['status', 'safety'], 1.2, 0.3, [
          'literacy',
          'numeracy',
        ]),
        outcomeHints: [
          '遗嘱签了字，监护人也在场，房子的归属暂时定下来。',
          '一个兄弟当场提出异议，公证人把文件收回抽屉，约下次再谈。',
          '公证人说还缺一张死亡证明，事情拖到月底，家里人开始互相埋怨。',
        ],
      }),
    ],
  },
  {
    id: 'task-vienna-writer-researcher',
    kind: 'task',
    task: task('knowledge', ['knowledge', 'status'], ['knowledge', 'status'], 1.2, 0.2, [
      'literacy',
    ]),
    title: '稿子、图书馆与朗读夜',
    stage: 'adulthood',
    ageWindow: { min: 16, max: 75 },
    tags: ['knowledge', 'culture', 'writing', 'editor', 'library', 'publication'],
    baseRate: 0.1,
    conditions: [
      { kind: 'age', min: 18, max: 59 },
      { kind: 'education', in: ['secondary', 'higher'] },
    ],
    nodeBriefs: [
      node({
        id: 'task-vienna-writer-researcher.submit-piece',
        title: '编辑部窗下的稿子',
        premise:
          '稿子改了四遍，信封上写着《新自由报》副刊的地址。编辑部在环城大道旁，窗下堆着退稿和咖啡杯；作者在门口站了一会儿，才把信封投进铜口。',
        conditions: [
          { kind: 'age', min: 18, max: 59 },
          { kind: 'education', in: ['secondary', 'higher'] },
        ],
        roles: [
          subject(18, 59),
          role('editor', 'worker', 30, 65, true, { occupation: 'Redakteur' }),
          worker(25, 60, false),
        ],
        allowedEffects: ['cash', 'mood', 'reputation', 'relation', 'skill', 'flag'],
        task: task('knowledge', ['knowledge', 'status'], ['status', 'knowledge'], 1.3, 0.35, [
          'literacy',
          'social',
        ]),
        outcomeHints: [
          '稿子被采用，编辑删了两段，寄来一张稿费单。',
          '稿子被退回，页边有一行字，说题目太大、细节太少。',
          '编辑没有退稿，只说先留着，等下一期有篇幅再谈。',
        ],
      }),
      node({
        id: 'task-vienna-writer-researcher.editor-feedback',
        title: '红铅笔划过的校样',
        premise:
          '编辑把校样推回来，红铅笔从第一段划到最后一段，页边只写了“再具体些”。作者想知道哪些句子该留，哪些该删，但编辑已经要去开下一场会。',
        conditions: [
          { kind: 'age', min: 20, max: 59 },
          { kind: 'education', in: ['secondary', 'higher'] },
        ],
        roles: [
          subject(20, 59),
          role('editor', 'worker', 30, 65, true, { occupation: 'Redakteur' }),
        ],
        allowedEffects: ['cash', 'mood', 'reputation', 'relation', 'skill', 'flag'],
        task: task('knowledge', ['knowledge', 'status'], ['knowledge', 'status'], 1.15, 0.15, [
          'literacy',
          'social',
        ]),
        outcomeHints: [
          '编辑在楼梯口停下来，逐段说了删改的理由，作者记满一张纸。',
          '编辑只说“你自己再看一遍”，把校样塞回他手里。',
          '编辑建议他换一个题目，说现在的写法更像社论，不像小说。',
        ],
      }),
      node({
        id: 'task-vienna-writer-researcher.library-research',
        title: '闭馆前的最后一张桌子',
        premise:
          '图书馆的阅览室六点关门，管理员已经开始收报纸。桌上摊着三本互相矛盾的书、一叠卡片和半截铅笔；作者要找的那条引文还差最后一个脚注。',
        conditions: [
          { kind: 'age', min: 18, max: 59 },
          { kind: 'education', in: ['secondary', 'higher'] },
          { kind: 'cash', min: 5 },
        ],
        roles: [subject(18, 59), role('librarian', 'worker', 25, 65), neighbor(25, 65, false)],
        allowedEffects: ['cash', 'mood', 'reputation', 'relation', 'skill', 'flag'],
        task: task('knowledge', ['knowledge'], ['knowledge', 'autonomy'], 1.2, 0.1, [
          'literacy',
          'numeracy',
        ]),
        outcomeHints: [
          '他在闭馆前找到那条引文，管理员允许他把最后一册书借走。',
          '档案室提前关门，他只能凭记忆补上脚注，回去再核对。',
          '邻桌的学者把自己的笔记借给他，两人约好第二天在咖啡馆继续谈。',
        ],
      }),
      node({
        id: 'task-vienna-writer-researcher.public-reading',
        title: '咖啡馆后厅的朗读夜',
        premise:
          '咖啡馆后厅摆了二十把椅子，门口收进门费。作者要读一篇还没发表的小说，朋友答应来捧场，但下午的报纸上有一篇尖刻的剧评，可能会把听众带走。',
        conditions: [
          { kind: 'age', min: 25, max: 59 },
          { kind: 'education', in: ['secondary', 'higher'] },
          { kind: 'hasRole', role: 'writer' },
        ],
        roles: [
          subject(25, 59),
          historical('schnitzler', 'Q44331', 48, 56, false),
          neighbor(25, 65),
        ],
        allowedEffects: ['cash', 'food', 'mood', 'reputation', 'relation', 'skill', 'flag'],
        task: task('culture', ['status', 'knowledge'], ['status', 'belonging'], 1.15, 0.3, [
          'literacy',
          'social',
        ]),
        outcomeHints: [
          '后厅坐满了一半，读完以后有人提问，门口又多卖了几本小册子。',
          '只来了七个人，但其中一位听众提出了最尖锐也最有用的问题。',
          '开场前就有不少人退票，他索性取消朗读，把稿子寄给编辑。',
        ],
      }),
      node({
        id: 'task-vienna-writer-researcher.correspond-kraus',
        title: '给《火炬》编辑的一封信',
        premise:
          '《火炬》最近一篇关于新闻语言的文章在咖啡馆里被人反复引用。作者写了一封六页的信，指出文中一处自相矛盾，又附上自己的短文；信寄往洛林街的编辑部。',
        conditions: [
          { kind: 'age', min: 22, max: 59 },
          { kind: 'education', in: ['secondary', 'higher'] },
        ],
        roles: [subject(22, 59), historical('kraus', 'Q44328', 36, 44), worker(30, 65, false)],
        allowedEffects: ['cash', 'mood', 'reputation', 'relation', 'skill', 'flag'],
        task: task('knowledge', ['knowledge', 'status'], ['knowledge', 'status'], 1.25, 0.25, [
          'literacy',
          'social',
        ]),
        outcomeHints: [
          'Kraus 回了一张措辞尖刻的明信片，却在下一期里引用了他的短文。',
          '信没有回音，一个月后原稿被退回，页边多了几处红笔批注。',
          'Kraus 没有回信，但托人带话，请他去参加下一次朗读会。',
        ],
      }),
      node({
        id: 'task-vienna-writer-researcher.abandon-project',
        title: '写到一半的手稿',
        premise:
          '一部关于维也纳家庭的小说写到第三十七页就停住了。房租、母亲的药费和编辑的催稿信堆在桌角；继续写要几个月，放弃又可惜，桌下的废纸篓已经满了。',
        conditions: [
          { kind: 'age', min: 18, max: 59 },
          { kind: 'education', in: ['secondary', 'higher'] },
        ],
        roles: [subject(18, 59), role('editor', 'worker', 30, 65, false), neighbor(25, 65, false)],
        allowedEffects: ['cash', 'mood', 'reputation', 'relation', 'skill', 'flag'],
        task: task('knowledge', ['knowledge', 'status'], ['autonomy', 'status'], 1.1, 0.2, [
          'literacy',
        ]),
        outcomeHints: [
          '他把第三十七页撕掉，从第一人称重新写起，三个月后交出一份短稿。',
          '他把手稿卖给一家小报，换了一个月的房租，长篇暂时锁进抽屉。',
          '他把已写的章节拆成三篇随笔，先换稿费，也给自己留一条退路。',
        ],
      }),
    ],
  },
];
