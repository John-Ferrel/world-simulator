import type { ContentFamilyBrief, ContentNodeBrief } from './briefs.js';
import type {
  EventEffect,
  PersonAgencyGoal,
  PersonLife,
  Place,
  Relation,
  RoleRequirement,
  SceneCondition,
  SceneStage,
  TaskDomain,
  TaskNeed,
} from '../domain.js';
import type { GeneratedTaskMeta } from '../generated.js';

/**
 * Phase 10 "decisive life" briefs.
 *
 * Eight families, six nodes each, all authored against the bounded effect
 * grammar. Four families are passive events (education thresholds, working
 * life, family fate, crisis and migration); four are active tasks (education
 * and work initiative, family initiative, political initiative, migration
 * initiative). Each event outcome is expected to change a typed fact —
 * schooling, employment, wage, household, relation, role, birth, death, estate
 * or residence — rather than only a mood.
 *
 * Lifecycle caveat: the engine buckets a definition by exactly one `stage`,
 * while the requested windows sometimes span two stages. `p10-edu-thresholds`
 * keeps the requested 12-20 window and is authored on the adolescence bucket
 * (effective 12-17). `p10-edu-work-tasks` keeps the requested 12-30 window but
 * is authored on the adulthood bucket (effective 18-30) because five of its
 * six actions are early-career adult decisions; the 12-17 school threshold is
 * covered by the passive education family instead.
 *
 * War content is gated on a live war-mobilization process or a war-aftermath
 * legacy. It never assumes that a particular year, front or outcome happened.
 * Conditions and effect types only reference roles. The three families that
 * can emit a residence effect carry the two existing seed residence ids in
 * `allowedResidenceIds`; no other place id is authored here, and concrete
 * residences remain constrained by the publication validator's known list.
 */

type Skill = keyof PersonLife['skills'];

const role = (
  key: string,
  kind: RoleRequirement['kind'],
  minAge: number,
  maxAge: number,
  required = true,
  extra: Partial<RoleRequirement> = {},
): RoleRequirement => ({ key, kind, required, minAge, maxAge, ...extra });

const subject = (minAge: number, maxAge: number, sex?: RoleRequirement['sex']): RoleRequirement =>
  role('subject', 'subject', minAge, maxAge, true, sex ? { sex } : {});

const parent = (minAge = 30, maxAge = 65, required = true): RoleRequirement =>
  role('parent', 'parent', minAge, maxAge, required);

const partner = (minAge = 18, maxAge = 45, sameHousehold = false): RoleRequirement =>
  role('partner', 'partner', minAge, maxAge, true, sameHousehold ? { sameHousehold: true } : {});

const neighbor = (minAge = 18, maxAge = 70, required = true): RoleRequirement =>
  role('neighbor', 'neighbor', minAge, maxAge, required);

const worker = (minAge = 18, maxAge = 60, required = true): RoleRequirement =>
  role('worker', 'worker', minAge, maxAge, required);

const employer = (minAge = 35, maxAge = 70, required = true): RoleRequirement =>
  role('employer', 'employer', minAge, maxAge, required);

const teacher = (minAge = 30, maxAge = 65, required = true): RoleRequirement =>
  role('teacher', 'teacher', minAge, maxAge, required);

const official = (
  minAge = 30,
  maxAge = 65,
  required = true,
  organizationKind?: RoleRequirement['organizationKind'],
): RoleRequirement =>
  role(
    'official',
    'official',
    minAge,
    maxAge,
    required,
    organizationKind ? { organizationKind } : {},
  );

const unionMember = (minAge = 25, maxAge = 65, required = true): RoleRequirement =>
  role('unionMember', 'union_member', minAge, maxAge, required);

const organization = (
  key: string,
  kind: NonNullable<RoleRequirement['organizationKind']>,
  required = false,
): RoleRequirement => ({ key, kind: 'organization', required, organizationKind: kind });

function task(
  domain: TaskDomain,
  goals: PersonAgencyGoal[],
  needs: TaskNeed[],
  baseUtility: number,
  risk: number,
  skills: Skill[] = [],
): GeneratedTaskMeta {
  return { domain, goals, needs, baseUtility, risk, skills };
}

const age = (min: number, max: number): SceneCondition => ({ kind: 'age', min, max });
const cash = (min?: number, max?: number): SceneCondition => ({
  kind: 'cash',
  householdId: 'subject',
  ...(min === undefined ? {} : { min }),
  ...(max === undefined ? {} : { max }),
});
const employed = (value: boolean): SceneCondition => ({ kind: 'employment', employed: value });
const education = (values: string[]): SceneCondition => ({
  kind: 'education',
  in: values as never,
});
const placeKind = (values: Place['kind'][]): SceneCondition => ({ kind: 'placeKind', in: values });
const health = (min?: number, max?: number): SceneCondition => ({
  kind: 'health',
  ...(min === undefined ? {} : { min }),
  ...(max === undefined ? {} : { max }),
});
const householdSize = (min?: number, max?: number): SceneCondition => ({
  kind: 'householdSize',
  ...(min === undefined ? {} : { min }),
  ...(max === undefined ? {} : { max }),
});
const hasRelation = (
  relationKind: Relation['kind'],
  minTrust?: number,
  sameHousehold?: boolean,
): SceneCondition => ({
  kind: 'hasRelation',
  relationKind,
  ...(minTrust === undefined ? {} : { minTrust }),
  ...(sameHousehold === undefined ? {} : { sameHousehold }),
});
const notHasRole = (value: string): SceneCondition => ({ kind: 'notHasRole', role: value });
const hasRole = (value: string): SceneCondition => ({ kind: 'hasRole', role: value });
const capability = (value: string): SceneCondition => ({ kind: 'capability', capability: value });
const warProcess = (): SceneCondition => ({
  kind: 'historicalProcess',
  processKind: 'war_mobilization',
  phases: ['emerging', 'mobilizing', 'confrontation'],
});
const warAftermath = (): SceneCondition => ({ kind: 'legacy', legacyKind: 'war_aftermath' });
const repression = (): SceneCondition => ({
  kind: 'historicalProcess',
  processKind: 'political_repression',
  phases: ['mobilizing', 'confrontation', 'repression'],
});

const commonEffects: EventEffect['type'][] = [
  'mood',
  'reputation',
  'skill',
  'knowledge',
  'relation_end',
  'health',
  'condition',
  'flag',
  'cash',
  'food',
];

const educationEffects: EventEffect['type'][] = [
  ...commonEffects,
  'education',
  'employment',
  'cash',
  'food',
  'skill',
  'flag',
  'relation',
  'mood',
  'reputation',
  'health',
  'condition',
  'move',
  'residence',
];

const careerEffects: EventEffect['type'][] = [
  ...commonEffects,
  'employment',
  'unemployment',
  'cash',
  'food',
  'health',
  'condition',
  'role',
  'relation',
  'flag',
  'death',
  'estate',
  'organization_membership',
];

const familyEffects: EventEffect['type'][] = [
  ...commonEffects,
  'relation',
  'relation_end',
  'household',
  'residence',
  'role',
  'birth',
  'death',
  'estate',
  'cash',
  'food',
  'health',
  'condition',
];

const crisisEffects: EventEffect['type'][] = [
  ...commonEffects,
  'health',
  'condition',
  'death',
  'move',
  'residence',
  'unemployment',
  'employment',
  'role',
  'relation',
  'flag',
  'cash',
  'food',
  'estate',
];

const familyTaskEffects: EventEffect['type'][] = [
  ...commonEffects,
  'relation',
  'relation_end',
  'household',
  'residence',
  'role',
  'cash',
  'food',
  'flag',
  'health',
  'condition',
  'move',
  'estate',
  'death',
];

const politicsTaskEffects: EventEffect['type'][] = [
  ...commonEffects,
  'organization_membership',
  'role',
  'relation',
  'reputation',
  'flag',
  'knowledge',
  'cash',
  'food',
  'health',
  'condition',
  'unemployment',
  'cash',
];

const migrationTaskEffects: EventEffect['type'][] = [
  ...commonEffects,
  'move',
  'residence',
  'household',
  'cash',
  'food',
  'employment',
  'relation',
  'flag',
  'health',
  'condition',
  'unemployment',
  'role',
];

const node = (brief: ContentNodeBrief): ContentNodeBrief => brief;

export const PHASE10_BRIEFS: ContentFamilyBrief[] = [
  {
    id: 'p10-edu-thresholds',
    kind: 'event',
    title: '考试、退学与出师的门槛',
    stage: 'adolescence' satisfies SceneStage,
    ageWindow: { min: 12, max: 20 },
    tags: ['adolescence', 'education', 'school', 'exam', 'apprenticeship', 'work', 'transition'],
    baseRate: 0.16,
    conditions: [age(12, 20)],
    nodeBriefs: [
      node({
        id: 'p10-edu-thresholds.buergerschule-exam',
        title: '商业学校的入学考试',
        premise:
          '考场设在市民学校二楼，长桌上只摆着编号纸和削好的铅笔。考试分算术、听写和口试，录取名额二十八人，走廊里却挤着一百多个孩子；母亲在楼下等着，手里攥着学费单和一张从报纸上剪下来的课程介绍。',
        weight: 1,
        rateShare: 0.17,
        tags: ['exam', 'buergerschule', 'admission'],
        conditions: [age(12, 14), education(['primary'])],
        roles: [subject(12, 14), teacher(30, 65), parent(30, 55)],
        allowedEffects: educationEffects,
        outcomeHints: [
          '算术题全做完，听写只错两个词，口试时把住址和父亲的职业说清楚，收到录取通知和缴费单',
          '听写时紧张漏了一整句，名次落到候补，学校让他九月再来问有没有空位',
          '考试前夜发烧，母亲劝他别去，他坚持到场，算术只做了一半，回家路上把铅笔折了',
        ],
      }),
      node({
        id: 'p10-edu-thresholds.realschule-scholarship',
        title: '一张减免学费的申请表',
        premise:
          '实科中学的公告栏上贴着一张基金会通知：成绩前列、家境困难的学生可以申请减免学费和书本费，但要附父亲的工资单、房东的租金收据和校长推荐信。表格只有一份，截止在星期五中午，办事窗口只开星期三和星期五。',
        weight: 1,
        rateShare: 0.17,
        tags: ['scholarship', 'realschule', 'fees'],
        conditions: [age(13, 16), education(['primary']), cash(undefined, 40)],
        roles: [subject(13, 16), teacher(30, 65), parent(30, 60), official(30, 65, false)],
        allowedEffects: educationEffects,
        outcomeHints: [
          '校长写下“勤勉”，父亲从厂里要来工资单，申请获准，学费减半，书费仍要自己出',
          '表格缺一张租金收据，他跑了两趟房东家，回来时窗口已关，只能等下一年',
          '基金会只给成绩第一名，他的名次差两位，回家后把通知剪下来夹进课本',
        ],
      }),
      node({
        id: 'p10-edu-thresholds.leave-school-for-work',
        title: '学年中途空出来的座位',
        premise:
          '父亲的工钱被减了一成，家里还有两个小的要吃饭。母亲把工厂的招工条和学校的课表放在同一张桌上，班主任说再读一年就能拿到毕业证明，厂里说名额只留到星期一。',
        weight: 1,
        rateShare: 0.17,
        tags: ['dropout', 'factory', 'family_money'],
        conditions: [age(13, 16), education(['primary']), cash(undefined, 25)],
        roles: [subject(13, 16), parent(30, 55), teacher(30, 65), employer(35, 70)],
        allowedEffects: educationEffects,
        outcomeHints: [
          '星期一去厂里报到，从学校领回课本，毕业证明没有拿到',
          '和父母谈成再读半年，白天上课，放学后去铺子送面包',
          '老师替他写了一封半工半读的申请，学校同意保留学籍，厂里只肯按日结钱',
        ],
      }),
      node({
        id: 'p10-edu-thresholds.night-school-fee',
        title: '夜校报名处的最后一张椅子',
        premise:
          '商业夜校在第七区的一间小学里开课，簿记、商业算术和德文书信三门，每星期三、五晚上。报名处只剩最后几个座位，学费要先交一学期，课本可以借旧的；白天在作坊干满十小时的人，晚上还要走四十分钟。',
        weight: 1,
        rateShare: 0.16,
        tags: ['night_school', 'bookkeeping', 'fees'],
        conditions: [age(14, 18), employed(true), cash(undefined, 50)],
        roles: [subject(14, 18), teacher(30, 65), worker(18, 50), parent(35, 60, false)],
        allowedEffects: educationEffects,
        outcomeHints: [
          '交学费报名，把课表钉在床头的墙上，第一周就因加班缺了一课',
          '学费差两克朗，他和老师谈成先交一半、替学校擦黑板抵剩下的',
          '他算了一笔账，觉得夜里的时间不如多接计件活，把报名表折起来带回家',
        ],
      }),
      node({
        id: 'p10-edu-thresholds.apprentice-review',
        title: '师傅的工作台前',
        premise:
          '三年学徒期满，师傅在作坊中央腾出一张工作台，让他独立做一件活：一副榫接的窗框，或者一版要上机的整页。考核费、材料费和师傅的评语都写在纸上；旁边的师兄弟停下手里的活看着，门外还有人来问今天能不能交活。',
        weight: 1,
        rateShare: 0.16,
        tags: ['apprenticeship', 'journeyman', 'review'],
        conditions: [age(16, 19), education(['apprenticeship']), employed(true)],
        roles: [
          subject(16, 19),
          role('master', 'worker', 40, 70),
          worker(20, 40, false),
          employer(35, 70, false),
        ],
        allowedEffects: educationEffects,
        outcomeHints: [
          '窗框四角严丝合缝，师傅在评语上写“可出师”，从下月起按伙计算工钱',
          '一记榫头敲裂了木料，师傅让他再做一件，出师推迟三个月',
          '他做的活合格，但师傅不肯放人，说作坊缺人手，出师证明要等明年',
        ],
      }),
      node({
        id: 'p10-edu-thresholds.technische-hochschule-entrance',
        title: '技术学院门口的报名桌',
        premise:
          '技术学院的入学考试分数学、制图和德语三场，报名要交中学毕业证明和一笔考试费。考场外的布告上写着录取名额和学费；他手里只有夜校的结业证和作坊师傅的推荐条，宿舍床位也还没有着落。',
        weight: 1,
        rateShare: 0.17,
        tags: ['technical_school', 'entrance', 'higher_education'],
        conditions: [age(17, 20), education(['secondary', 'apprenticeship']), cash(8)],
        roles: [subject(17, 20), teacher(30, 65), official(30, 65), worker(25, 60, false)],
        allowedEffects: educationEffects,
        outcomeHints: [
          '数学和制图都过线，德语作文差一分，学校让他先读一年预科再考',
          '考试费交了，制图题画错比例，未被录取，他把图纸带回去贴在墙上',
          '推荐条起了作用，教授同意他旁听一学期，学费照交，考试资格要看期末成绩',
        ],
      }),
    ],
  },
  {
    id: 'p10-work-career',
    kind: 'event',
    title: '第一份工、工头与养老金',
    stage: 'adulthood' satisfies SceneStage,
    ageWindow: { min: 18, max: 65 },
    tags: ['adulthood', 'work', 'career', 'wages', 'injury', 'pension', 'employment'],
    baseRate: 0.15,
    conditions: [age(18, 65)],
    nodeBriefs: [
      node({
        id: 'p10-work-career.first-position',
        title: '招工簿上的第一个名字',
        premise:
          '职业介绍所把一张写着地址的纸条推过柜台：机器厂招一名上油工，按周发薪，试用期两周。厂门口已经站了五个人，门房只让带证件的人进去；他的学徒证明还压在旧东家的抽屉里。',
        weight: 1,
        rateShare: 0.17,
        tags: ['first_job', 'hiring', 'labour_exchange'],
        conditions: [age(18, 22), employed(false)],
        roles: [subject(18, 22), employer(35, 70), worker(25, 60), official(30, 65, false)],
        allowedEffects: careerEffects,
        outcomeHints: [
          '门房收下他的名字，试工两天后被留下，从下周起按周领工钱',
          '旧东家扣着学徒证明，厂里只肯按日雇他，干满一个月再谈正式名册',
          '名额给了别人，他在门口等到下班，记下另一家厂子的招工日期',
        ],
      }),
      node({
        id: 'p10-work-career.promotion-to-foreman',
        title: '更衣室门上的新名牌',
        premise:
          '车间要添一个工头，管二十来个人和每天的活单。厂主把他叫进办公室，说他的活做得稳，但工人那边会怎么看他，要看他自己；原来的工头被调去看仓库，临走前把考勤簿摔在桌上。',
        weight: 1,
        rateShare: 0.17,
        tags: ['promotion', 'foreman', 'authority'],
        conditions: [age(25, 50), employed(true), placeKind(['factory'])],
        roles: [
          subject(25, 50),
          employer(35, 70),
          worker(25, 60),
          role('formerForeman', 'worker', 35, 65, false),
        ],
        allowedEffects: careerEffects,
        outcomeHints: [
          '接下工头的位置，工钱每周多四克朗，原来一起干活的几个人午饭时不再叫他',
          '他提出只代管一个月，工钱不加，工人那边的怨气小些，厂主把名字记在簿上',
          '他拒绝，厂主把位置给了另一个车间的人，原来的工头回来继续管他们',
        ],
      }),
      node({
        id: 'p10-work-career.demotion-dismissal',
        title: '月底结算后的空工位',
        premise:
          '厂里说订单少了三成，先停夜班，再把计件价往下压。车间门口贴出一张名单，上面有他的名字；工头让他去办公室谈，桌上摆着两个信封：一个是调去仓库的调令，一个是结清的工钱。',
        weight: 1,
        rateShare: 0.17,
        tags: ['demotion', 'dismissal', 'short_time'],
        conditions: [age(25, 60), employed(true), placeKind(['factory'])],
        roles: [
          subject(25, 60),
          employer(35, 70),
          worker(25, 60),
          role('foreman', 'worker', 35, 65, false),
        ],
        allowedEffects: careerEffects,
        outcomeHints: [
          '他拿调令去仓库，工钱少了三成，但班次还在，月底能领到钱',
          '他收下结清的工钱，把工具柜清空，第二天开始在码头等零工',
          '他和工头争了几句，厂里把解雇改成停班一个月，期满再看有没有位置',
        ],
      }),
      node({
        id: 'p10-work-career.wage-shortfall',
        title: '工资袋里少了三克朗',
        premise:
          '发薪日，工头把工资袋逐一递过来，说这个月机器停了两次、料废了两批，按厂规要扣钱。会计的簿子上没有写明扣的是哪一项；几个工人站在楼梯口数钱，有人把袋子倒过来抖。',
        weight: 1,
        rateShare: 0.16,
        tags: ['wages', 'deduction', 'dispute'],
        conditions: [age(20, 60), employed(true)],
        roles: [
          subject(20, 60),
          employer(35, 70),
          worker(20, 60),
          role('bookkeeper', 'official', 30, 65, false),
        ],
        allowedEffects: careerEffects,
        outcomeHints: [
          '他要求会计把扣款逐项写清楚，会计只写“材料损耗”，他收下钱，把纸条夹进工资册',
          '他和几个工人一起去找厂主，厂主补回一半，条件是不再提这件事',
          '他拒收工资袋，第二天被调去最脏的洗料间，工钱按日算',
        ],
      }),
      node({
        id: 'p10-work-career.workplace-injury',
        title: '传送带旁的担架',
        premise:
          '传送带的护罩松了一边，他伸手去拨卡住的料，袖子被卷进去。工头先关总闸，再让人去叫门房；厂医不在，事故簿摊在办公桌上，保险会的表格要填受伤时间、机器编号和两个见证人。',
        weight: 1,
        rateShare: 0.16,
        tags: ['injury', 'accident', 'insurance'],
        conditions: [age(20, 60), employed(true), placeKind(['factory']), health(0.4)],
        roles: [
          subject(20, 60),
          role('foreman', 'worker', 35, 65),
          worker(20, 60),
          role('doctor', 'worker', 30, 70, false, { occupation: 'Arzt' }),
        ],
        allowedEffects: careerEffects,
        outcomeHints: [
          '去医院接上骨头，厂里报事故，保险会付了药费，但他的右手再也使不上力',
          '他用布条缠住手继续上工，月底伤处化脓，厂里只按病假扣钱',
          '他拒绝在“自己不小心”的事故单上按手印，厂里把他调去看仓库，工钱照旧',
        ],
      }),
      node({
        id: 'p10-work-career.retirement-pension',
        title: '最后一张考勤卡',
        premise:
          '他五十八岁，厂医说他的肺不能再待在粉尘里，厂里劝他提前办退休。养老金要拿工龄册、保险单和最后三年的工资证明去办事处核定；会计提醒他，中间停班的那两年可能不算工龄。',
        weight: 1,
        rateShare: 0.17,
        tags: ['retirement', 'pension', 'age'],
        conditions: [age(55, 59), employed(true)],
        roles: [subject(55, 59), employer(35, 70), official(30, 65), worker(25, 60, false)],
        allowedEffects: careerEffects,
        outcomeHints: [
          '他办完提前退休，养老金比最后一份工钱少一半，但每天不用再听汽笛',
          '工龄册缺了停班那两年的记录，办事处让他去找旧东家开证明，退休推迟半年',
          '厂里愿意返聘他做半天门房，工钱按日算，养老金照领，他答应了',
        ],
      }),
    ],
  },
  {
    id: 'p10-family-fate',
    kind: 'event',
    title: '提亲、生育与遗产的房间',
    stage: 'adulthood' satisfies SceneStage,
    ageWindow: { min: 18, max: 75 },
    tags: [
      'adulthood',
      'family',
      'marriage',
      'birth',
      'death',
      'inheritance',
      'household',
      'housing',
    ],
    baseRate: 0.14,
    conditions: [age(18, 75)],
    allowedResidenceIds: ['place-wien-leopoldstadt-tenement', 'place-klosterneuburg-aunt-house'],
    nodeBriefs: [
      node({
        id: 'p10-family-fate.proposal-answer',
        title: '面包店后间的答复',
        premise:
          '两人已经一起走过两个冬天。一封折好的信和一枚从当铺赎回来的戒指放在桌上，信里写着婚期、住处和每月能拿出的工钱；对方的母亲坐在旁边，父亲在门口抽烟，没有人先动那杯咖啡。',
        weight: 1,
        rateShare: 0.17,
        tags: ['proposal', 'engagement', 'courtship'],
        conditions: [age(18, 35), hasRelation('partner', 0.3)],
        roles: [subject(18, 35), partner(18, 35), parent(40, 70)],
        allowedEffects: familyEffects,
        outcomeHints: [
          '对方答应，但要求婚后再等半年，等自己攒够嫁妆；两人把日期写在信背面',
          '对方的父亲提出要先有独立的一间房，来者拿不出押金，婚事搁下',
          '对方拒绝，说不想离开现在做工的铺子；来者把戒指收回口袋，信留在桌上',
        ],
      }),
      node({
        id: 'p10-family-fate.marriage-household',
        title: '两户人家的箱笼',
        premise:
          '婚礼在教区教堂办，酒席摆在院子里的长桌上。一方的箱笼、另一方的工具柜和两床被子要并进一间房；房东说多住一个人要加租，母亲说新婚的头一个月该住娘家。',
        weight: 1,
        rateShare: 0.17,
        tags: ['marriage', 'household_merge', 'rent'],
        conditions: [age(18, 40), hasRelation('partner', 0.4), householdSize(undefined, 6)],
        roles: [subject(18, 40), partner(18, 40), parent(40, 70), neighbor(25, 70)],
        allowedEffects: familyEffects,
        outcomeHints: [
          '两人租下朝院子的单间，把箱笼并到一处，房租占去半个月工钱',
          '两人先住进一方的娘家，加了一张床，屋里转身都难，但省下押金',
          '婚礼办完，两人仍各住原处，等攒够一笔押金再合住',
        ],
      }),
      node({
        id: 'p10-family-fate.childbirth',
        title: '黎明前的一盆热水',
        premise:
          '阵痛从午夜开始，接生婆让烧水、铺旧布，把剪刀在火上过一遍。丈夫在楼梯间来回走，房东在楼下敲门问什么时候能安静；医院在城另一头，电车要等天亮才有。',
        weight: 1,
        rateShare: 0.17,
        tags: ['birth', 'midwife', 'home'],
        conditions: [age(20, 40), hasRelation('partner', 0.3, true)],
        roles: [
          subject(20, 40, 'female'),
          role('partner', 'partner', 20, 45, true, { sameHousehold: true, sex: 'male' }),
          role('midwife', 'neighbor', 30, 70, true, { sex: 'female' }),
        ],
        allowedEffects: familyEffects,
        outcomeHints: [
          '天快亮时孩子落地，接生婆收了两克朗，母亲虚弱但清醒',
          '胎位不正，接生婆让丈夫去请医生，孩子保住了，她在床上躺了一个月',
          '孩子早产，丈夫连夜推车送去医院，母子都保住，欠下一笔药费',
        ],
      }),
      node({
        id: 'p10-family-fate.child-death',
        title: '儿科病房外的长椅',
        premise:
          '孩子烧了三天，诊所的医生说可能是猩红热，要送去医院隔离。床位还没有着落，孩子的手脚已经发凉；教区的人来问要不要先预备一块墓地，房东说屋子可能要空出来消毒。',
        weight: 1,
        rateShare: 0.16,
        tags: ['child_death', 'illness', 'funeral'],
        conditions: [age(25, 55), hasRelation('partner', 0.2, true), householdSize(3)],
        roles: [
          subject(25, 55),
          partner(25, 55, true),
          role('child', 'neighbor', 0, 12, true, { sameHousehold: true }),
          role('doctor', 'worker', 30, 70, false, { occupation: 'Arzt' }),
        ],
        allowedEffects: familyEffects,
        outcomeHints: [
          '孩子没等到床位，死在医院走廊，小棺材的钱记在互助会的账上',
          '没等死亡证明就把孩子葬在教区墓地，办事处罚了一笔，伴侣病了一场',
          '医生确诊是麻疹，孩子熬过来了，但耳朵从此听不见，家里的钱花光了',
        ],
      }),
      node({
        id: 'p10-family-fate.separation',
        title: '两床被子分开的夜晚',
        premise:
          '争吵从钱开始，转到谁的母亲该搬来住，最后停在“这日子过不下去”。一方把工钱袋放在桌上，另一方把自己的衣服收进箱子；教区说离婚要花钱、要证人，房东说租约上只写了一个名字。',
        weight: 1,
        rateShare: 0.16,
        tags: ['separation', 'quarrel', 'household'],
        conditions: [age(22, 55), hasRelation('partner', 0.2, true)],
        roles: [
          subject(22, 55),
          partner(22, 55, true),
          neighbor(25, 70),
          role('priest', 'official', 30, 70, false, { organizationKind: 'church' }),
        ],
        allowedEffects: familyEffects,
        outcomeHints: [
          '伴侣带着箱子搬回娘家，两人没有办离婚，只把共同的钱分了',
          '来者去教区问离婚手续，神父劝再等三个月，箱子又提回了屋',
          '两人继续住在一间房里，把床分开，账也分开，谁也不提以后',
        ],
      }),
      node({
        id: 'p10-family-fate.widow-inheritance',
        title: '遗产清单上的两行字',
        premise:
          '伴侣在冬天病重，医生已经不再开药，夜里只能靠湿布和一点止痛药水。对方的兄弟从外地赶来，坐在厨房里翻遗产清单：一间租来的房、一只怀表、几十克朗的存款和一笔欠煤店的账；家里只有结婚证和一张没写日期的遗嘱。',
        weight: 1,
        rateShare: 0.17,
        tags: ['widowhood', 'inheritance', 'estate'],
        conditions: [age(40, 75), hasRelation('partner', 0.3, true)],
        roles: [
          subject(40, 75),
          partner(40, 80, true),
          role('brother', 'neighbor', 30, 70, false),
          official(30, 65, false),
        ],
        allowedEffects: familyEffects,
        outcomeHints: [
          '怀表和存款留下，替死者还清煤账，兄弟拿走了工具和衣服',
          '兄弟拿出另一张更早的遗嘱，办事处让家里先找律师，遗产冻结了半年',
          '放弃继承，把房子退给房东，搬去城外的亲戚家，只带走一只箱子',
        ],
      }),
    ],
  },
  {
    id: 'p10-crisis-migration',
    kind: 'event',
    title: '驱逐、搜查与战后的站台',
    stage: 'adulthood' satisfies SceneStage,
    ageWindow: { min: 18, max: 70 },
    tags: ['adulthood', 'crisis', 'migration', 'war', 'police', 'eviction', 'refugee', 'housing'],
    baseRate: 0.13,
    conditions: [age(18, 70)],
    allowedResidenceIds: ['place-wien-leopoldstadt-tenement', 'place-klosterneuburg-aunt-house'],
    nodeBriefs: [
      node({
        id: 'p10-crisis-migration.eviction',
        title: '看门人换掉的锁',
        premise:
          '欠租三个月，房东不再收分期，让看门人把门锁换掉。家具被搬到院子里，床架靠着垃圾桶，邻居把能拿的都先搬进自己屋里；市政收容所在几个街区外，床位要排队。',
        weight: 1,
        rateShare: 0.17,
        tags: ['eviction', 'rent_arrears', 'shelter'],
        conditions: [age(18, 70), cash(undefined, 15), placeKind(['home'])],
        roles: [
          subject(18, 70),
          neighbor(25, 70),
          role('landlord', 'neighbor', 35, 70, false),
          official(30, 65, false),
        ],
        allowedEffects: crisisEffects,
        outcomeHints: [
          '他把家具寄放在邻居家，带家人去收容所排队，第二天在码头找零工',
          '他和房东谈成一周内补齐欠租，锁重新装上，但房租涨了一成',
          '他连夜搬去城外的姐姐家，工作丢了，孩子在新的学校被人叫外乡人',
        ],
      }),
      node({
        id: 'p10-crisis-migration.industrial-disability',
        title: '冲床之后的工作台',
        premise:
          '冲床的护罩少了一颗螺栓，他的手被压在里面。医院截掉了两根手指，厂里说可以调去做门房，工钱按日算；保险会的伤残评定要等三个月，期间没有工钱。',
        weight: 1,
        rateShare: 0.17,
        tags: ['industrial_accident', 'disability', 'compensation'],
        conditions: [age(18, 60), employed(true), placeKind(['factory']), health(0.4)],
        roles: [
          subject(18, 60),
          employer(35, 70),
          worker(18, 60),
          role('doctor', 'worker', 30, 70, false, { occupation: 'Arzt' }),
        ],
        allowedEffects: crisisEffects,
        outcomeHints: [
          '他接下门房的活，工钱少了一半，但每天还能进厂，伤残金批下来后补了一笔',
          '他不等评定就辞工，去街上帮人看摊，手伸不直，收入断断续续',
          '他让工友作证，和厂里打事故官司，厂里同意调他去仓库，工钱照旧',
        ],
      }),
      node({
        id: 'p10-crisis-migration.police-raid',
        title: '凌晨四点的敲门声',
        premise:
          '天没亮，楼下传来砸门声和靴子上楼的声音。便衣和巡警按着名单查住户，问谁去过工会后屋、谁家里有油印的纸；同屋的人还在睡，床底下有一只装传单的箱子。',
        weight: 1,
        rateShare: 0.17,
        tags: ['police', 'raid', 'repression', 'leaflet'],
        conditions: [age(18, 65), placeKind(['home']), repression()],
        roles: [
          subject(18, 65),
          official(30, 65, true, 'state'),
          neighbor(18, 70),
          unionMember(25, 65, false),
        ],
        allowedEffects: crisisEffects,
        outcomeHints: [
          '他咬定箱子是别人的，警察把传单带走，记下他的名字，第二天厂里把他叫去问话',
          '他被带去警察所关了两天，出来时工作没了，邻居替他藏了工具',
          '他把箱子从后窗递出去，警察只搜到几本旧账，但同楼的人开始躲着他',
        ],
      }),
      node({
        id: 'p10-crisis-migration.street-violence',
        title: '酒馆门口的拳头',
        premise:
          '星期六夜里，两个男人在酒馆门口推搡，一个人喊了句关于身份的话，啤酒杯摔碎在石板上。围观的人往后退，巡警在街角吹哨；他离得最近，手里还提着给家里买的半条面包。',
        weight: 1,
        rateShare: 0.17,
        tags: ['street_violence', 'police', 'witness'],
        conditions: [age(18, 65), placeKind(['street', 'other'])],
        roles: [subject(18, 65), worker(18, 60), neighbor(18, 65), official(30, 65)],
        allowedEffects: crisisEffects,
        outcomeHints: [
          '他去拉架，被碎杯子划破脸，缝了四针，巡警记下他的名字作证',
          '他躲开回家，第二天听说有人被打断了肋骨，街坊开始分成两派',
          '他挥拳帮了其中一边，被巡警一起带走，罚了钱，厂里记了一次过',
        ],
      }),
      node({
        id: 'p10-crisis-migration.mobilization',
        title: '报到通知与车站',
        premise:
          '一封盖着军营印章的信从门缝塞进来，写着报到日期、车站和随身物品。厂里说位置留到月底，但工钱不补；母亲的药、房租和刚会走路的孩子都要有人照看。街上已经有穿军装的人在贴公告。',
        weight: 1,
        rateShare: 0.16,
        tags: ['war', 'mobilization', 'conscription'],
        conditions: [age(18, 45), warProcess()],
        roles: [
          subject(18, 45, 'male'),
          official(30, 70, true, 'army'),
          neighbor(18, 70),
          parent(45, 75, false),
        ],
        allowedEffects: crisisEffects,
        outcomeHints: [
          '他按时去车站报到，把工钱袋和钥匙交给邻居，托他每月给母亲送煤',
          '他先去市政办事处问缓征，排了一天队只拿到一张待查的纸，回到厂里位置已经没了',
          '他没有去报到，搭夜车去城外的亲戚家，让家里对外说已经收到通知',
        ],
      }),
      node({
        id: 'p10-crisis-migration.refugee-return',
        title: '火车站站台上的箱子',
        premise:
          '战争结束后的第二年，车站里挤满从东部回来的家庭，行李用绳子捆着，孩子在长椅上睡着。他原来住的街区换了门牌，工厂只剩半堵墙；有人准备去美国，有人想回加利西亚的老家看看。',
        weight: 1,
        rateShare: 0.16,
        tags: ['war_aftermath', 'refugee', 'return', 'emigration'],
        conditions: [age(18, 70), warAftermath()],
        roles: [subject(18, 70), neighbor(18, 70), official(30, 65, false), worker(25, 60, false)],
        allowedEffects: crisisEffects,
        outcomeHints: [
          '他买了一张去美国的船票，把家具卖掉，在汉堡港等了三个星期',
          '他回到原来的街区，在废墟上找到旧邻居，几个人合租一间房，重新找活',
          '他决定回加利西亚的老家，走到半路听说那里也在打仗，又折回维也纳',
        ],
      }),
    ],
  },
  {
    id: 'p10-edu-work-tasks',
    kind: 'task',
    task: task(
      'education',
      ['knowledge', 'status', 'work'],
      ['knowledge', 'status', 'cash'],
      1.4,
      0.25,
      ['literacy', 'numeracy'],
    ),
    title: '奖学金、考试与调岗的申请',
    stage: 'adulthood' satisfies SceneStage,
    ageWindow: { min: 12, max: 30 },
    tags: ['adulthood', 'education', 'work', 'task', 'night_school', 'apprenticeship', 'career'],
    baseRate: 0.5,
    conditions: [age(12, 30)],
    nodeBriefs: [
      node({
        id: 'p10-edu-work-tasks.apply-scholarship',
        title: '基金会窗口前的申请表',
        premise:
          '技术学校的新学期招生简章贴在职业介绍所门口，旁边是基金会的助学通知：成绩合格、家庭收入低的学生可以申请减免学费，但要交工资单、房租收据、两封推荐信和一篇手写的申请。窗口下午三点关，队伍已经排到楼梯口。',
        weight: 1,
        tags: ['scholarship', 'application', 'technical_school'],
        conditions: [age(18, 28), education(['secondary', 'apprenticeship']), cash(undefined, 60)],
        roles: [subject(18, 28), official(30, 65), teacher(30, 65, false), employer(35, 70, false)],
        allowedEffects: educationEffects,
        task: task('education', ['knowledge', 'status'], ['knowledge', 'cash'], 1.45, 0.2, [
          'literacy',
          'numeracy',
        ]),
        outcomeHints: [
          '他交齐材料，基金会减免一半学费，但要求每学期交成绩单',
          '缺一封推荐信，窗口让他第二天再来，第二天名额已经满了',
          '申请被拒，理由是家庭收入证明不充分，他改报夜班，学费更低',
        ],
      }),
      node({
        id: 'p10-edu-work-tasks.qualification-exam',
        title: '商业学校的毕业考场',
        premise:
          '商业学校允许校外考生参加毕业考试，考簿记、商业算术、书信和速记，通过后可以拿到一张证明，去商号应征求职。报名费五克朗，考场在学校的旧礼堂，桌上只许放钢笔和算盘。',
        weight: 1,
        tags: ['exam', 'commercial_school', 'certificate'],
        conditions: [age(18, 30), education(['primary', 'apprenticeship']), cash(5)],
        roles: [subject(18, 30), teacher(30, 65), official(30, 65, false), worker(20, 50, false)],
        allowedEffects: educationEffects,
        task: task('education', ['knowledge', 'status'], ['knowledge', 'status'], 1.5, 0.25, [
          'numeracy',
          'literacy',
        ]),
        outcomeHints: [
          '四门都过线，学校发给他毕业证明，商号的招工处第一次让他进柜台谈',
          '簿记和算术过了，速记差两分，他只能拿到单科证明，明年再补考',
          '考试前夜加班到十点，第二天算错一道复利题，报名费没有退',
        ],
      }),
      node({
        id: 'p10-edu-work-tasks.ask-promotion',
        title: '厂长办公室外的半小时',
        premise:
          '他在包装间干了两年，能看发货单、会算箱数，也会替工头点名。厂里空出一个记账的位置，厂主说要从外面招人；他把自己记的出入库本子包在布里，站在办公室门外等。',
        weight: 1,
        tags: ['promotion', 'bookkeeping', 'factory'],
        conditions: [age(20, 30), employed(true), placeKind(['factory', 'shop'])],
        roles: [
          subject(20, 30),
          employer(35, 70),
          role('bookkeeper', 'official', 30, 65, false),
          worker(20, 55, false),
        ],
        allowedEffects: educationEffects,
        task: task('work', ['work', 'status'], ['status', 'cash'], 1.55, 0.35, [
          'numeracy',
          'social',
        ]),
        outcomeHints: [
          '厂主翻了他的本子，让他先兼管发货账，工钱每月加三克朗，试用三个月',
          '厂主说记账的位置要给商会介绍的人，让他继续管包装，但答应明年考虑',
          '他和会计吵了一架，厂主把本子留下，位置给了别人，他被调去夜班',
        ],
      }),
      node({
        id: 'p10-edu-work-tasks.seek-apprenticeship',
        title: '作坊门口的工具袋',
        premise:
          '他想从杂工转成学徒，学一门能带走的手艺。细木作坊的师傅说学徒期三年，头一年只管饭，不给工钱；他已经二十岁，比别的学徒大，师傅问他能不能从头扫地、磨刨子。',
        weight: 1,
        tags: ['apprenticeship', 'craft', 'career_change'],
        conditions: [age(18, 25), cash(undefined, 40)],
        roles: [
          subject(18, 25),
          role('master', 'worker', 40, 70),
          worker(20, 40, false),
          parent(40, 65, false),
        ],
        allowedEffects: educationEffects,
        task: task('work', ['work', 'status'], ['autonomy', 'status'], 1.35, 0.3, [
          'craft',
          'social',
        ]),
        outcomeHints: [
          '师傅收下他，头三个月只管饭，他白天学刨料，晚上替作坊看门',
          '师傅嫌他年纪大、手已经定了型，让他先去把一套榫头做出来再说',
          '他交不起工具押金，师傅让他用自己的旧工具试用一个月，再决定收不收',
        ],
      }),
      node({
        id: 'p10-edu-work-tasks.request-transfer',
        title: '调岗申请上的那一行',
        premise:
          '厂里在另一个区新开了一间车间，缺熟手，也缺一个会看图纸的人。他想调过去，因为新车间离家近、班次固定；但现在的工头不肯放人，说他一走，这条线就没人顶。',
        weight: 1,
        tags: ['transfer', 'factory', 'commute'],
        conditions: [age(20, 30), employed(true)],
        roles: [
          subject(20, 30),
          employer(35, 70),
          role('foreman', 'worker', 35, 65),
          worker(20, 55, false),
        ],
        allowedEffects: educationEffects,
        task: task('work', ['work', 'family'], ['autonomy', 'health'], 1.3, 0.3, [
          'social',
          'numeracy',
        ]),
        outcomeHints: [
          '厂主同意调岗，工钱不变，他每天少走四十分钟，但新工头把他当外人',
          '工头不放人，厂里让他兼做新车间的图纸活，两头跑，月底补了一点钱',
          '他去找工会代表，调岗批了，原来的工头从此不给他写证明',
        ],
      }),
      node({
        id: 'p10-edu-work-tasks.save-for-night-school',
        title: '火柴盒里的学费',
        premise:
          '夜校的簿记班下学期学费十二克朗，书费另算。他把加班费和卖旧报纸的钱藏在火柴盒里，母亲已经问过两次那盒火柴为什么摇起来会响；离报名还有六个星期。',
        weight: 1,
        tags: ['night_school', 'saving', 'family_money'],
        conditions: [age(18, 30), employed(true), cash(undefined, 45)],
        roles: [subject(18, 30), parent(40, 70), worker(20, 55, false), teacher(30, 65, false)],
        allowedEffects: educationEffects,
        task: task('education', ['knowledge', 'survival'], ['cash', 'knowledge'], 1.2, 0.15, [
          'numeracy',
        ]),
        outcomeHints: [
          '他攒够学费，报名那天把火柴盒里的钱倒在柜台上，书买的是旧的',
          '母亲拿走了钱交煤费，他和夜校老师谈成先听课、学费分三个月补',
          '他接了一个月的夜班，学费攒够了，但开课时已经缺了两堂',
        ],
      }),
    ],
  },
  {
    id: 'p10-family-tasks',
    kind: 'task',
    task: task('family', ['family', 'belonging'], ['belonging', 'care'], 1.3, 0.25, ['social']),
    title: '提亲、合住与寻找亲人',
    stage: 'adulthood' satisfies SceneStage,
    ageWindow: { min: 18, max: 45 },
    tags: ['adulthood', 'family', 'social', 'marriage', 'care', 'inheritance', 'task'],
    baseRate: 0.5,
    conditions: [age(18, 45)],
    nodeBriefs: [
      node({
        id: 'p10-family-tasks.propose-marriage',
        title: '星期天下午的提亲',
        premise:
          '来者请了假，穿上唯一一件没有补丁的外套，提着点心和一瓶酒去对方家。对方的父亲在工厂上过夜班，母亲在厨房烧水；来者要说的是婚期、住处和每月能拿出的钱。',
        weight: 1,
        tags: ['proposal', 'marriage', 'parents'],
        conditions: [age(20, 40), hasRelation('partner', 0.3), cash(3)],
        roles: [subject(20, 40), partner(20, 40), parent(40, 70)],
        allowedEffects: familyTaskEffects,
        task: task('family', ['family', 'belonging'], ['belonging', 'status'], 1.5, 0.35, [
          'social',
        ]),
        outcomeHints: [
          '对方的父亲问清工钱和房租，点头同意，婚期定在秋天，点心留下，酒被退回来',
          '对方的母亲嫌来者家里人口多，提亲没谈成；对方送到楼梯口，说再等等',
          '对方的父亲要求先找到固定工作，来者把招工条拿出来，父亲让下个月再来',
        ],
      }),
      node({
        id: 'p10-family-tasks.share-household',
        title: '一间房和两份工钱',
        premise:
          '两人都在城里做工，一个住舅母家，一个住工厂宿舍。合租一间房能把房租减半，也能互相照应；但房东只租给夫妻，厂里的宿舍又规定未婚工人必须住集体房。',
        weight: 1,
        tags: ['household', 'rent', 'cohabitation'],
        conditions: [age(20, 45), hasRelation('partner', 0.4), cash(undefined, 60)],
        roles: [
          subject(20, 45),
          partner(20, 45),
          role('landlord', 'neighbor', 35, 70),
          neighbor(25, 60, false),
        ],
        allowedEffects: familyTaskEffects,
        task: task('family', ['family', 'belonging'], ['autonomy', 'belonging'], 1.35, 0.3, [
          'social',
          'numeracy',
        ]),
        outcomeHints: [
          '两人合租一间朝院子的房，房东在租约上只写了来者的名字，另一方把家具搬来',
          '房东要一个担保人，两人找来厂里的工头作保，多付了一个月押金',
          '厂里不放另一方出宿舍，两人只能每星期见一次，合住的事拖到年底',
        ],
      }),
      node({
        id: 'p10-family-tasks.reconcile-quarrel',
        title: '厨房里的第三个人',
        premise:
          '上个月的争吵还没过去：一方把工钱借给了弟弟，另一方直到交房租才知道。现在两人睡在同一张床上，谁也不先说话；另一方的母亲每天来送菜，顺便问他们什么时候和好。',
        weight: 1,
        tags: ['quarrel', 'reconciliation', 'household_money'],
        conditions: [age(18, 45), hasRelation('partner', 0.2, true), householdSize(2)],
        roles: [
          subject(18, 45),
          partner(18, 45, true),
          parent(40, 70, false),
          neighbor(25, 65, false),
        ],
        allowedEffects: familyTaskEffects,
        task: task('social', ['family', 'belonging'], ['belonging', 'safety'], 1.25, 0.25, [
          'social',
        ]),
        outcomeHints: [
          '来者把借出去的钱要回一半，在桌上摊开账本，两人约定以后超过两克朗要先说',
          '伴侣不肯谈钱，只说要搬回娘家住一段；来者请来伴侣的母亲，三个人坐到半夜',
          '两人没有和好，但把房租和伙食费分开算，日子暂时过下去',
        ],
      }),
      node({
        id: 'p10-family-tasks.arrange-childcare',
        title: '上工前的托付',
        premise:
          '家里白天没有人看孩子，孩子还不到上学年龄。厂里的托儿所只收满三岁的，邻居的老太太愿意白天照看，但要按周付钱；一方的姐姐住在城外，说可以把孩子接去住一个月。',
        weight: 1,
        tags: ['childcare', 'work', 'family'],
        conditions: [age(22, 45), householdSize(2)],
        roles: [
          subject(22, 45),
          partner(22, 45, false),
          neighbor(50, 75),
          role('sister', 'sibling', 25, 50, false),
        ],
        allowedEffects: familyTaskEffects,
        task: task('family', ['family', 'care'], ['care', 'cash'], 1.45, 0.2, ['social']),
        outcomeHints: [
          '来者把孩子托给邻居老太太，每周付一克朗，孩子夜里还是哭醒',
          '姐姐把孩子接去城外，一个月后送回来，孩子会叫人了，但认生',
          '来者辞掉半天工，自己看孩子，家里少了一份工钱，晚饭改成一顿',
        ],
      }),
      node({
        id: 'p10-family-tasks.appeal-inheritance',
        title: '办事处二楼的一叠纸',
        premise:
          '父亲去世后留下一间租屋、一只怀表和一笔小存款。办事处的清单上只写了兄弟的名字，理由是他一直和父亲同住；来者手里有父亲最后一年写的信，信里说存款该分给两个女儿。',
        weight: 1,
        tags: ['inheritance', 'appeal', 'siblings'],
        conditions: [age(22, 45), hasRelation('kin', 0.2)],
        roles: [
          subject(22, 45),
          role('brother', 'sibling', 25, 55),
          official(30, 65),
          role('aunt', 'neighbor', 45, 75, false),
        ],
        allowedEffects: familyTaskEffects,
        task: task('family', ['family', 'status'], ['cash', 'status'], 1.2, 0.4, [
          'literacy',
          'social',
        ]),
        outcomeHints: [
          '办事处承认那封信，存款分了一半给来者，兄弟从此不再来往',
          '兄弟说信是伪造的，办事处让两人自己去法院，来者拿不出诉讼费',
          '来者放弃存款，只拿走母亲的怀表，兄弟答应替父亲还清欠账',
        ],
      }),
      node({
        id: 'p10-family-tasks.find-missing-kin',
        title: '红十字会的问询表',
        premise:
          '哥哥去德国做工后，头两个月还寄钱，第三个月信断了。来者去了红十字会、警察局和哥哥最后住过的旅店，得到的回答都一样：没有登记，或者已经搬走；表格上要填出生日期、最后一次通信的地址和一张照片。',
        weight: 1,
        tags: ['missing_kin', 'search', 'migration'],
        conditions: [age(18, 45), hasRelation('kin', 0.2)],
        roles: [
          subject(18, 45),
          role('brother', 'sibling', 20, 50, false),
          official(30, 65),
          neighbor(25, 65, false),
        ],
        allowedEffects: familyTaskEffects,
        task: task('family', ['family', 'belonging'], ['belonging', 'safety'], 1.3, 0.3, [
          'social',
          'literacy',
        ]),
        outcomeHints: [
          '旅店老板记得哥哥跟一批工人去了鲁尔，来者写信过去，两个月后收到一张明信片',
          '警察局把哥哥列进失踪名册，来者在办事处遇到另一个找丈夫的女人，两人结伴',
          '来者花光路费，只找到哥哥留下的一个工具箱，最后把工具卖了当路费回家',
        ],
      }),
    ],
  },
  {
    id: 'p10-politics-tasks',
    kind: 'task',
    task: task('politics', ['cause', 'belonging'], ['belonging', 'status'], 1.3, 0.4, [
      'social',
      'literacy',
    ]),
    title: '工会、传单与互助厨房',
    stage: 'adulthood' satisfies SceneStage,
    ageWindow: { min: 18, max: 65 },
    tags: ['adulthood', 'politics', 'social', 'union', 'party', 'relief', 'task'],
    baseRate: 0.5,
    conditions: [age(18, 65)],
    nodeBriefs: [
      node({
        id: 'p10-politics-tasks.join-union',
        title: '活动室门口的两张桌子',
        premise:
          '印刷厂后面的工会活动室每星期三晚上开门，桌上摆着入会表、会费收据和一张这个月的罢工基金账目。老会员说入会要有人介绍，还要连续交三个月会费；隔壁党部的门也开着，里面在念一份请愿书。',
        weight: 1,
        tags: ['union', 'party', 'membership'],
        conditions: [
          age(18, 65),
          employed(true),
          placeKind(['factory', 'union']),
          notHasRole('union_member'),
        ],
        roles: [
          subject(18, 65),
          unionMember(30, 65),
          organization('union', 'union', true),
          organization('party', 'party', false),
        ],
        allowedEffects: politicsTaskEffects,
        task: task('politics', ['cause', 'belonging'], ['belonging', 'safety'], 1.3, 0.3, [
          'social',
          'literacy',
        ]),
        outcomeHints: [
          '他填了入会表，交第一个月会费，名字被写进蓝皮会员册',
          '介绍人临时没来，他坐在后排听完会，下星期才补上签字',
          '他没有入工会，转去隔壁党部问入党手续，拿回一本小册子',
        ],
      }),
      node({
        id: 'p10-politics-tasks.organize-meeting',
        title: '借来的后屋和三十把椅子',
        premise:
          '车间要开一次会，讨论缩短工时和承认工会。后屋只能坐三十人，房东不肯借椅子，酒馆老板要收场地钱；开会前还要有人去通知三个班次，避开工头的眼线。',
        weight: 1,
        tags: ['meeting', 'organization', 'union'],
        conditions: [
          age(20, 65),
          hasRole('union_member'),
          placeKind(['factory', 'union', 'other']),
        ],
        roles: [
          subject(20, 65),
          unionMember(30, 65),
          role('innkeeper', 'neighbor', 35, 70),
          official(30, 65, false),
        ],
        allowedEffects: politicsTaskEffects,
        task: task('politics', ['cause', 'belonging'], ['belonging', 'status'], 1.4, 0.35, [
          'social',
        ]),
        outcomeHints: [
          '会议开成，三十多人挤在后屋，通过了要求加薪的动议，他把记录寄给工会',
          '酒馆老板临时反悔，他们改在院子里站着开，来的人少了一半',
          '警察在街对面站着，会议只谈了会费和互助金，敏感的话没有写进记录',
        ],
      }),
      node({
        id: 'p10-politics-tasks.publish-leaflet',
        title: '早班前的三百份传单',
        premise:
          '一份要求承认工会、缩短工时的传单要赶在星期一早班前印出来。纸是大家凑钱买的，油墨从厂里刮来半罐；排字工愿意帮忙，但说好原稿不留，废页要烧掉。谁去分发，谁就可能被门房记下名字。',
        weight: 1,
        tags: ['leaflet', 'printing', 'risk'],
        conditions: [
          age(20, 65),
          hasRole('union_member'),
          capability('literacy'),
          placeKind(['factory', 'union']),
        ],
        roles: [
          subject(20, 65),
          worker(18, 60),
          unionMember(25, 65, false),
          official(30, 65, false),
        ],
        allowedEffects: politicsTaskEffects,
        task: task('politics', ['cause', 'status'], ['belonging', 'status'], 1.35, 0.6, [
          'literacy',
          'craft',
        ]),
        outcomeHints: [
          '传单在早班前塞进更衣柜和面包袋，午休时已经有人在楼梯间读',
          '排字工不肯开机，他们只好手写几张，贴到市场附近的墙上',
          '警察在厂门口搜包，传单被没收，他收到一张传唤单，名字留在记录里',
        ],
      }),
      node({
        id: 'p10-politics-tasks.recruit-coworkers',
        title: '食堂长桌上的空座位',
        premise:
          '新来的包装工抱怨工钱被扣，却不知道工会能替他说话。他在食堂端着汤坐过去，先问家里几口人，再问下个月的请愿；旁边的工头竖着耳朵，桌上还有半块面包。',
        weight: 1,
        tags: ['recruitment', 'union', 'factory'],
        conditions: [age(20, 65), hasRole('union_member'), employed(true), placeKind(['factory'])],
        roles: [
          subject(20, 65),
          worker(18, 60),
          role('foreman', 'worker', 35, 65, false),
          unionMember(25, 65, false),
        ],
        allowedEffects: politicsTaskEffects,
        task: task('social', ['cause', 'belonging'], ['belonging', 'status'], 1.25, 0.45, [
          'social',
        ]),
        outcomeHints: [
          '工友第二天来交了会费，还带来同车间的两个人',
          '工友把谈话告诉了工头，下午他被叫去问话，会员册被翻了一遍',
          '工友答应来听一次会，但始终没有在名册上签字，见面时开始绕着他走',
        ],
      }),
      node({
        id: 'p10-politics-tasks.negotiate-employer',
        title: '怀表放在桌上的谈判',
        premise:
          '厂长把怀表放在桌上，说只能谈一刻钟。他带着工会的委托书、一张写满工价和工时的纸，门外站着两个被扣了工资的工人；窗台上的一盆常春藤已经枯了。',
        weight: 1,
        tags: ['negotiation', 'wages', 'union'],
        conditions: [
          age(25, 65),
          hasRole('union_member'),
          employed(true),
          placeKind(['factory', 'government']),
        ],
        roles: [subject(25, 65), employer(35, 70), worker(18, 60), official(30, 65, false)],
        allowedEffects: politicsTaskEffects,
        task: task('work', ['work', 'cause'], ['cash', 'safety'], 1.55, 0.6, [
          'social',
          'numeracy',
        ]),
        outcomeHints: [
          '厂长同意补回被扣工资的一半，并答应下月再谈工时，他在字据上签了字',
          '厂长叫来门房，把他请出办公室，第二天车间门口贴出停工通知',
          '市政厅的官员把双方请去谈了两小时，最后只成立了一个没有期限的委员会',
        ],
      }),
      node({
        id: 'p10-politics-tasks.organize-relief',
        title: '教堂侧厅的第一锅汤',
        premise:
          '厂里停了两个车间，街上有几家已经断粮。工会想开一间互助厨房，只有一只旧锅、半袋面粉和一本缺页的账本；教堂愿意借侧厅，市政办事处要求先交名单，房东们担心厨房把闲人招来。',
        weight: 1,
        tags: ['relief', 'mutual_aid', 'kitchen'],
        conditions: [age(20, 65), placeKind(['home', 'union', 'church']), cash(3)],
        roles: [
          subject(20, 65),
          neighbor(18, 70),
          organization('church', 'church', true),
          official(30, 65, false),
        ],
        allowedEffects: politicsTaskEffects,
        task: task('politics', ['care', 'belonging'], ['food', 'belonging'], 1.4, 0.25, [
          'social',
          'numeracy',
        ]),
        outcomeHints: [
          '他借下教堂侧厅，按名单每天煮一锅汤，账本贴在门口，谁领了多少都写着',
          '市政办事处不批名单，他们在工会后院支起炉子，先照顾最穷的几户',
          '面粉只够三天，他和邻居分头去市场赊账，把欠款记在自己名下',
        ],
      }),
    ],
  },
  {
    id: 'p10-migration-tasks',
    kind: 'task',
    task: task('migration', ['survival', 'family'], ['cash', 'safety'], 1.4, 0.4, [
      'social',
      'numeracy',
    ]),
    title: '搬家、船票与回乡的路费',
    stage: 'adulthood' satisfies SceneStage,
    ageWindow: { min: 18, max: 60 },
    tags: ['adulthood', 'migration', 'housing', 'family', 'travel', 'task'],
    baseRate: 0.5,
    conditions: [age(18, 60)],
    allowedResidenceIds: ['place-wien-leopoldstadt-tenement', 'place-klosterneuburg-aunt-house'],
    nodeBriefs: [
      node({
        id: 'p10-migration-tasks.move-district',
        title: '手推车上的三趟',
        premise:
          '房东要涨租，城北的工厂区有一间更便宜的房子，离新工地近，但离母亲和孩子的学校远。搬家要用手推车分三趟，还要跟旧房东结清煤账；新房东只肯按季度收租。',
        weight: 1,
        tags: ['moving', 'district', 'rent'],
        conditions: [age(18, 60), cash(undefined, 50), placeKind(['home'])],
        roles: [
          subject(18, 60),
          role('landlord', 'neighbor', 35, 70),
          neighbor(18, 60),
          worker(18, 55, false),
        ],
        allowedEffects: migrationTaskEffects,
        task: task('migration', ['family', 'survival'], ['cash', 'safety'], 1.3, 0.3, [
          'social',
          'numeracy',
        ]),
        outcomeHints: [
          '他分三趟把家具推到城北，旧房东扣了煤账，新房子离工地近，孩子转了学',
          '新房东要一次交一季度租金，他拿不出，改租了一间更小的合住房',
          '他决定不搬，和旧房东谈成按月付，母亲和孩子不用换地方',
        ],
      }),
      node({
        id: 'p10-migration-tasks.emigrate',
        title: '领事馆门口的队伍',
        premise:
          '去美国的船票在的里雅斯特上船，领事馆要看出生证明、无犯罪记录和一份体检单。船票加手续费要一百多克朗，他把家具和工具列了一张单子；同乡说汉堡的船更便宜，但要在港口等几个星期。',
        weight: 1,
        tags: ['emigration', 'passport', 'ship'],
        conditions: [age(18, 45), cash(30)],
        roles: [subject(18, 45), official(30, 65), neighbor(18, 60), worker(25, 60, false)],
        allowedEffects: migrationTaskEffects,
        task: task('migration', ['survival', 'status'], ['cash', 'autonomy'], 1.5, 0.55, [
          'social',
          'numeracy',
        ]),
        outcomeHints: [
          '他卖掉工具和床架，凑够船票，在的里雅斯特上船，行李只有一只箱子',
          '领事馆要一份他拿不出的证明，船期错过，他把票钱换成去汉堡的火车票',
          '他到了汉堡港，等了三个星期没有船位，钱花掉一半，最后回维也纳',
        ],
      }),
      node({
        id: 'p10-migration-tasks.return-home',
        title: '回乡的火车票',
        premise:
          '他在维也纳干了四年，工厂停工后一直打零工。家乡的哥哥写信说家里有一间空房，地里缺人手；回去的火车票要十几克朗，路上还要在布吕恩换车。',
        weight: 1,
        tags: ['return', 'train', 'family'],
        conditions: [age(18, 60), cash(undefined, 40), employed(false)],
        roles: [
          subject(18, 60),
          role('brother', 'sibling', 25, 60),
          worker(25, 60, false),
          official(30, 65, false),
        ],
        allowedEffects: migrationTaskEffects,
        task: task('migration', ['family', 'survival'], ['belonging', 'cash'], 1.25, 0.25, [
          'social',
        ]),
        outcomeHints: [
          '他买票回乡，哥哥在站台上等他，第二天就下地干活，城里的工具留给了工友',
          '车票钱不够，他先坐到布吕恩，在车站帮人搬行李换了一段路费',
          '他回程前接到维也纳一家作坊的试工通知，把票退了，留在城里',
        ],
      }),
      node({
        id: 'p10-migration-tasks.find-lodging',
        title: '看门人手里的钥匙',
        premise:
          '他刚下火车，行李寄存在车站，口袋里有一张写着地址的纸条。看门人带他看了三处房：一间朝院子的单间、一张合租的床位、一间和面包房共用的阁楼；每处都要押金，有的还要担保人。',
        weight: 1,
        tags: ['lodging', 'arrival', 'deposit'],
        conditions: [age(18, 60), cash(undefined, 35)],
        roles: [
          subject(18, 60),
          role('caretaker', 'neighbor', 30, 70),
          role('landlady', 'neighbor', 35, 70, false),
          worker(18, 55, false),
        ],
        allowedEffects: migrationTaskEffects,
        task: task('migration', ['survival', 'belonging'], ['safety', 'cash'], 1.4, 0.3, [
          'social',
          'numeracy',
        ]),
        outcomeHints: [
          '他租下朝院子的单间，交了一个月押金，钥匙只有一把，出门要挂在门房',
          '他先租床位，和三个工人合住，夜里有人打呼，但租金最便宜',
          '看门人要担保人，他拿不出，只好去车站候车室过夜，第二天再找',
        ],
      }),
      node({
        id: 'p10-migration-tasks.pawn-belongings',
        title: '当铺柜台上的工具',
        premise:
          '路费还差一截，来者把能卖的东西摊在床上：一套木工工具、一只怀表、两件冬衣和一枚银顶针。当铺按件给价，收旧货的只肯整堆买；每件东西都有来历，卖掉就赎不回来。',
        weight: 1,
        tags: ['pawn', 'sale', 'travel_money'],
        conditions: [age(18, 60), cash(undefined, 30)],
        roles: [
          subject(18, 60),
          role('pawnbroker', 'worker', 30, 70),
          neighbor(18, 65, false),
          partner(20, 55, false),
        ],
        allowedEffects: migrationTaskEffects,
        task: task('daily', ['survival', 'family'], ['cash', 'autonomy'], 1.15, 0.2, ['numeracy']),
        outcomeHints: [
          '来者当掉怀表和冬衣，留下工具，凑够路费，当票藏在身份证后面',
          '收旧货的整堆买走工具和床架，价钱压得很低，来者签了字',
          '伴侣把银顶针留下，说那是母亲的东西；来者改去工友家借钱',
        ],
      }),
      node({
        id: 'p10-migration-tasks.ask-travel-money',
        title: '舅父家的星期天',
        premise:
          '来者提着点心去舅父家，舅父在商号管仓库，认识跑长途的车夫。路费要二十克朗，舅父先问来者在维也纳干了什么、为什么回来，又问这笔钱什么时候能还；舅母在厨房里把碗洗得很响。',
        weight: 1,
        tags: ['loan', 'relative', 'travel_money'],
        conditions: [age(18, 60), cash(undefined, 25)],
        roles: [
          subject(18, 60),
          role('uncle', 'neighbor', 40, 70),
          role('aunt', 'neighbor', 35, 70, false),
          worker(25, 60, false),
        ],
        allowedEffects: migrationTaskEffects,
        task: task('family', ['survival', 'belonging'], ['cash', 'belonging'], 1.2, 0.2, [
          'social',
        ]),
        outcomeHints: [
          '舅父借给来者十五克朗，剩下的让来者去车站帮车夫装货抵，写了一张欠条',
          '舅父不肯借钱，只给来者介绍了一个跑布吕恩的车夫，让来者搭便车',
          '舅母拿出自己的私房钱，条件是到了家乡先给舅母写信，来者把钱收下',
        ],
      }),
    ],
  },
];
