import type { PlotKernel } from '../../../composition/types.js';
import { recipes, taskMeta } from './kit.js';

/**
 * Phase 12 Recipe Kit proof set.
 *
 * These recipes are deliberately small and concrete. They demonstrate the
 * compact authoring format; additional domain packs add mechanisms rather than
 * reskinning these texts.
 */
export const KIT_RECIPES: PlotKernel[] = recipes([
  {
    id: 'recipe-work.machine-speedup',
    title: '皮带轮又快了半圈',
    domain: 'work',
    stage: 'adulthood',
    ages: [18, 58],
    tags: ['work', 'factory', 'injury', 'union', 'wages'],
    contexts: ['industrial', 'factory', 'crisis'],
    milieus: ['factory', 'printshop'],
    conditions: [{ kind: 'employment', employed: true }],
    roles: {
      foreman: ['worker', { minAge: 30, maxAge: 68 }],
      mate: ['worker', { minAge: 18, maxAge: 60 }],
      union: ['organization', { organizationKind: 'union' }],
    },
    outcomes: [
      {
        id: 'refused-extra-run',
        w: 0.4,
        text: '{subject}把护罩重新扣上，拒绝在交接班前再跑一桶。{foreman}没有吼，只把秒表放在机台上，让整个车间听见指针走完一分钟。{mate}低头继续装纸，谁也没有看{subjectPronoun}。',
        significance: 0.64,
        trace: {
          motive: '不想在疲劳时继续开机',
          conflict: '工头用秒表逼整条车间加班',
          response: '扣上护罩，拒绝再跑一桶',
        },
        fx: {
          reputation: -0.05,
          relation: ['foreman', 'rival', -0.18, 0],
          flag: 'refused_speedup',
          knowledge: ['foreman records refusal on the shift sheet', 0.8, 'foreman'],
        },
      },
      {
        id: 'kept-running',
        w: 0.35,
        text: '下班铃响过，{subject}还是把皮带推了上去。第三个钟头，{mate}的袖口被卷进滚筒，众人扯断电源时，墙上已经溅了一排黑点。{foreman}先去看机器，再去看人。',
        significance: 0.86,
        fx: [
          { cash: 3, health: -0.06, condition: 'exhaustion' },
          {
            relation: ['mate', 'colleague', -0.1, 0.05],
            knowledge: ['the guard was loose before the extra run', 0.9],
            flag: 'saw_machine_injury',
          },
        ],
      },
      {
        id: 'called-union',
        w: 0.25,
        text: '{subject}没有碰机器，而是让{mate}去街角打电话。{union}的代表赶来时，{foreman}已经把秒表收进口袋，说今晚只是“试车”。代表要{subject}把试车的钟点写下来，签上名字。',
        significance: 0.7,
        when: { hasRole: 'union_member' },
        fx: [
          {
            relation: ['union', 'colleague', 0.2, 0],
            membership: ['union', true, 'called the union during a speedup'],
            role: 'union_contact',
            funds: ['union', -2, 'representative time lost on a speedup complaint'],
          },
        ],
      },
    ],
  },
  {
    id: 'recipe-work.wage-shortfall',
    title: '少了两克朗的信封',
    domain: 'work',
    stage: 'adulthood',
    ages: [16, 65],
    tags: ['work', 'wages', 'shop', 'debt', 'conflict'],
    contexts: ['urban', 'industrial', 'crisis'],
    milieus: ['shop', 'factory', 'printshop'],
    conditions: [{ kind: 'employment', employed: true }],
    roles: {
      employer: ['employer', { required: true }],
      clerk: ['worker', { minAge: 16, maxAge: 60 }],
    },
    outcomes: [
      {
        id: 'counted-aloud',
        w: 0.5,
        text: '{subject}把工钱倒在柜台上，一枚一枚数给{clerk}听。{employer}说上周迟到两次，扣的是“规矩”，不是工钱。{subject}问规矩写在哪一张纸上，柜台后面没有人回答。',
        significance: 0.6,
        fx: {
          cash: -2,
          relation: ['employer', 'rival', -0.16, 0],
          knowledge: ['the employer deducts wages without a written rule', 0.75, 'clerk'],
        },
      },
      {
        id: 'accepted-silently',
        w: 0.3,
        text: '{subject}把信封折好，塞进内袋。回家路上算了两遍，还是少两克朗。夜里{subjectPronoun}没有提这件事，只说明天要早点去，免得再被记迟到。',
        significance: 0.5,
        fx: {
          cash: -2,
          mood: -0.08,
          flag: 'accepted_wage_deduction',
        },
      },
      {
        id: 'took-ledger',
        w: 0.2,
        text: '趁{employer}去后屋拿货，{subject}翻开考勤簿，把两周的钟点抄在烟盒背面。{clerk}在门口望风，手指一直在抖。抄到最后一行时，{employer}的鞋底在楼梯上响了起来。',
        significance: 0.74,
        fx: [
          {
            knowledge: ['the attendance ledger contradicts the paid hours', 0.9],
            flag: 'copied_attendance_ledger',
            relation: ['clerk', 'colleague', 0.12, 0],
          },
          { mood: 0.08 },
        ],
      },
    ],
  },
  {
    id: 'recipe-family.inheritance-room',
    title: '母亲房里的那张床',
    domain: 'family',
    stage: 'adulthood',
    ages: [24, 70],
    tags: ['family', 'inheritance', 'housing', 'grief', 'conflict'],
    contexts: ['urban', 'postwar', 'crisis'],
    milieus: ['tenement'],
    conditions: [{ kind: 'householdSize', min: 2 }],
    roles: {
      sibling: ['sibling', { minAge: 18, maxAge: 75 }],
      neighbor: ['neighbor', { minAge: 25, maxAge: 80 }],
    },
    outcomes: [
      {
        id: 'signed-away',
        w: 0.4,
        text: '母亲下葬后第三天，{sibling}把房契摊在桌上，说照顾老人的人该多得一间。{subject}看见{neighbor}在门缝外站着，手里还端着葬礼剩下的面包。{subjectPronoun}签了字，笔尖在纸上停了一下。',
        significance: 0.78,
        fx: {
          cash: -12,
          relation: ['sibling', 'rival', -0.22, -0.05],
          flag: 'gave_up_inheritance_room',
        },
      },
      {
        id: 'kept-room',
        w: 0.35,
        text: '{subject}没有签。{sibling}把椅子往后一推，说那就让法院来分。{neighbor}这才进门，把面包放在房契旁边，说这条街上为一张床打官司的人，最后都付不起律师。',
        significance: 0.72,
        fx: {
          relation: ['sibling', 'rival', -0.12, 0],
          flag: 'contested_inheritance_room',
          mood: -0.05,
        },
      },
      {
        id: 'shared-rent',
        w: 0.25,
        text: '{subject}提出把房间租出去，租金两人平分。{sibling}算了一遍，又算一遍，最后说租客不能是带孩子的。{neighbor}在门口笑了一声，说这条街上带孩子的租客才付得准时。',
        significance: 0.68,
        fx: {
          cash: 4,
          relation: ['sibling', 'colleague', 0.05, 0],
          knowledge: ['the inheritance room can be rented out', 0.7, 'neighbor'],
        },
      },
    ],
  },
  {
    id: 'recipe-health.pharmacy-mixup',
    title: '药瓶上的第二张标签',
    domain: 'health',
    stage: 'adulthood',
    ages: [20, 80],
    tags: ['health', 'medicine', 'error', 'institution', 'fear'],
    contexts: ['medical', 'urban', 'crisis'],
    milieus: ['hospital', 'shop'],
    roles: {
      pharmacist: ['worker', { minAge: 23, maxAge: 75 }],
      doctor: ['worker', { minAge: 28, maxAge: 78 }],
    },
    outcomes: [
      {
        id: 'caught-before-dose',
        w: 0.45,
        text: '{subject}把药瓶举到灯下，发现第二张标签下面还压着一行铅笔字。{pharmacist}伸手来夺，{subject}先一步把瓶子放进外套。{doctor}赶来时，柜台上已经围了三个等药的人。',
        significance: 0.82,
        fx: [
          {
            condition: ['suspected_dispensing_error'],
            knowledge: [
              'the pharmacy relabeled a bottle after a prescription change',
              0.85,
              'pharmacist',
            ],
            relation: ['pharmacist', 'rival', -0.2, 0],
          },
        ],
      },
      {
        id: 'took-dose',
        w: 0.3,
        text: '{subject}在回家路上按标签吞了第一剂。半夜醒来时，舌头发木，楼梯在眼前分成两层。{subjectPronoun}扶着墙走到院子里，吐在雪上，第二天才听人说那瓶药本来该给隔壁的老太太。',
        significance: 0.86,
        fx: {
          health: -0.2,
          condition: 'medication_reaction',
          knowledge: ['the bottle was meant for another patient', 0.65],
        },
      },
      {
        id: 'reported-to-doctor',
        w: 0.25,
        text: '{subject}没有拿药，直接去门诊找{doctor}。{doctor}听完，先问{subject}记不记得瓶盖的颜色，又让{pharmacist}把今天的处方簿送来。{pharmacist}送来时，少了一页。',
        significance: 0.76,
        fx: [
          {
            relation: ['doctor', 'colleague', 0.14, 0],
            knowledge: ['a prescription page is missing from the pharmacy book', 0.8, 'doctor'],
            flag: 'reported_pharmacy_error',
          },
        ],
      },
    ],
  },
  {
    id: 'recipe-civic.eviction-summons',
    title: '门缝里的蓝色传票',
    domain: 'civic',
    stage: 'adulthood',
    ages: [18, 80],
    tags: ['housing', 'institution', 'poverty', 'law', 'fear'],
    contexts: ['urban', 'reform', 'crisis', 'postwar'],
    milieus: ['tenement', 'government'],
    roles: {
      official: ['official', { minAge: 25, maxAge: 70 }],
      neighbor: ['neighbor', { minAge: 18, maxAge: 80 }],
    },
    outcomes: [
      {
        id: 'paid-arrears',
        w: 0.35,
        text: '{subject}在传票背面写下欠租数目，去当铺押了父亲的怀表。{official}点完钱，把印章盖得很轻，说下个月不能再晚。{neighbor}在走廊里问押了什么，{subject}说一件不走的旧东西。',
        significance: 0.7,
        fx: {
          cash: -15,
          reputation: 0.03,
          flag: 'paid_rent_arrears',
          knowledge: ['the eviction can be stayed by paying arrears', 0.9, 'official'],
        },
      },
      {
        id: 'organized-neighbors',
        w: 0.3,
        text: '{subject}没有去当铺，而是挨家敲门，把传票给{neighbor}看。到傍晚，走廊里凑出一张写满名字的纸，每家愿意先垫一克朗。{official}再来时，门口站的人比上次多。',
        significance: 0.8,
        fx: [
          {
            cash: 9,
            relation: ['neighbor', 'friend', 0.22, 0.05],
            reputation: 0.12,
            role: 'tenant_organizer',
            knowledge: ['neighbors will cover arrears collectively', 0.85, 'neighbor'],
          },
        ],
      },
      {
        id: 'ignored-summons',
        w: 0.35,
        text: '{subject}把传票塞进炉子。三天后，锁匠在门外量门框，{official}站在楼梯口念一张纸。{neighbor}把自家的孩子拉回屋里，门关得很慢。',
        significance: 0.84,
        fx: {
          cash: -4,
          mood: -0.18,
          condition: 'housing_insecurity',
          flag: 'eviction_pending',
        },
      },
    ],
  },
  {
    id: 'recipe-culture.confiscated-pamphlet',
    title: '字典里的那页纸',
    domain: 'culture',
    stage: 'adulthood',
    ages: [16, 70],
    tags: ['culture', 'censorship', 'writing', 'risk', 'knowledge'],
    contexts: ['urban', 'crisis', 'war', 'reform'],
    milieus: ['cafe', 'university', 'printshop'],
    conditions: [{ kind: 'skill', skill: 'literacy', min: 0.3 }],
    roles: {
      teacher: ['teacher', { minAge: 24, maxAge: 75 }],
      official: ['official', { required: false, minAge: 28, maxAge: 70 }],
    },
    outcomes: [
      {
        id: 'hid-page',
        w: 0.4,
        text: '{subject}把那页纸折成四折，夹进字典的“自由”词条。{teacher}看见了，没有问内容，只说字典借阅簿上不要写自己的真名。第二天，{official}在门口翻包时，{subject}把字典抱得更紧。',
        significance: 0.78,
        fx: [
          {
            knowledge: ['the confiscated page is hidden in a dictionary', 0.9],
            flag: 'hid_banned_page',
            relation: ['teacher', 'friend', 0.14, 0],
          },
        ],
      },
      {
        id: 'handed-over',
        w: 0.3,
        text: '{official}把手指伸进字典，抽出那页纸，读了两行就折起来。{teacher}说这是课上发的语法练习，{official}问哪一课教“罢工”这个词。{subject}看着字典被装进公文包。',
        significance: 0.8,
        fx: {
          relation: ['teacher', 'rival', -0.1, 0],
          reputation: -0.04,
          flag: 'banned_page_confiscated',
          knowledge: ['the official has the banned page and the teacher’s name', 0.8, 'official'],
        },
      },
      {
        id: 'copied-it',
        w: 0.3,
        text: '{subject}没有把纸带回家，而是坐在{teacher}的桌边抄了一遍。抄到“公民不服从”时，{teacher}把窗帘拉上。第二天，{subject}把原件还回书架，口袋里多了一张自己的字。',
        significance: 0.72,
        fx: {
          skill: { literacy: 0.04 },
          role: 'copyist',
          relation: ['teacher', 'colleague', 0.1, 0],
          knowledge: ['a handwritten copy of the banned page exists', 0.85],
        },
      },
    ],
  },
  {
    id: 'recipe-migration.border-papers',
    title: '站台上的三张纸',
    domain: 'migration',
    stage: 'adulthood',
    ages: [18, 65],
    tags: ['migration', 'institution', 'papers', 'risk', 'travel'],
    contexts: ['urban', 'war', 'crisis', 'postwar'],
    milieus: ['government', 'army'],
    roles: {
      official: ['official', { minAge: 25, maxAge: 70 }],
      stranger: ['neighbor', { required: false, minAge: 16, maxAge: 70 }],
    },
    outcomes: [
      {
        id: 'papers-accepted',
        w: 0.35,
        text: '{official}把三张纸对着灯看，又看{subject}的手。{subject}把手翻过来，指节上是印刷机的墨。{official}在第二张上盖了章，说下一趟车在四十分钟后。',
        significance: 0.8,
        fx: [
          { cash: -6, move: ['@station', 'left the district on valid papers'] },
          {
            knowledge: ['travel papers were accepted at the station', 0.9, 'official'],
            flag: 'migrated_with_papers',
          },
        ],
      },
      {
        id: 'bribe-refused',
        w: 0.3,
        text: '{subject}把硬币压在第三张纸下面推过去。{official}没有碰钱，只把纸推回来，说少的是出生证明，不是印花税。队伍后面有人咳了一声，{stranger}往旁边让了半步。',
        significance: 0.74,
        fx: {
          cash: -2,
          relation: ['official', 'rival', -0.12, 0],
          mood: -0.12,
          flag: 'refused_border_bribe',
          knowledge: ['a birth certificate is required to leave', 0.85, 'official'],
        },
      },
      {
        id: 'crossed-at-night',
        w: 0.35,
        text: '最后一班车开走后，{subject}跟着{stranger}沿铁轨走出站台。雪盖住枕木，巡道灯每过一分钟扫一次。{stranger}说被抓住就说是去上工，不要提行李里那本工会手册。',
        significance: 0.86,
        fx: [
          {
            cash: -3,
            health: -0.06,
            flag: 'crossed_border_without_papers',
            relation: ['stranger', 'friend', 0.1, 0],
            knowledge: ['there is a night path along the railway', 0.7, 'stranger'],
          },
        ],
      },
    ],
  },
  {
    id: 'recipe-war.missing-in-action',
    title: '名单上的空白',
    domain: 'war',
    stage: 'adulthood',
    ages: [20, 68],
    tags: ['war', 'family', 'missing', 'institution', 'grief'],
    contexts: ['war', 'postwar'],
    milieus: ['government', 'tenement'],
    roles: {
      official: ['official', { minAge: 25, maxAge: 70 }],
      neighbor: ['neighbor', { minAge: 18, maxAge: 80 }],
    },
    outcomes: [
      {
        id: 'declared-missing',
        w: 0.4,
        text: '{official}把名单摊开，在{subject}亲属的名字后面画了一道横线，说“失踪，待查”。{subject}问待查到什么时候，{official}说等下一张名单。{neighbor}在门外听见，回家把窗帘拉上了。',
        significance: 0.82,
        fx: [
          {
            mood: -0.2,
            flag: 'relative_declared_missing',
            knowledge: ['the army lists the relative as missing, not dead', 0.9, 'official'],
          },
        ],
      },
      {
        id: 'pension-applied',
        w: 0.3,
        text: '{subject}没有争“失踪”还是“阵亡”，只问抚恤金从哪个月算。{official}翻到表格背面，说要两份证人签字。{subject}想起{neighbor}在同一个院子住了十二年。',
        significance: 0.72,
        fx: [
          {
            cash: 5,
            relation: ['neighbor', 'friend', 0.08, 0],
            flag: 'applied_for_pension',
            knowledge: ['pension requires two neighbor witnesses', 0.9, 'official'],
          },
        ],
      },
      {
        id: 'searched-hospital',
        w: 0.3,
        text: '{subject}没有回家，直接去了伤兵医院。走廊里躺满缠着绷带的人，{subject}逐个看脸，看到第七排时，一个没有下巴的士兵抓住了{subjectPronoun}的袖子。',
        significance: 0.88,
        fx: {
          health: -0.04,
          mood: -0.1,
          knowledge: ['a wounded soldier recognized the family name', 0.7],
          flag: 'searched_hospital_for_missing_relative',
        },
      },
    ],
  },
  {
    id: 'recipe-education.scholarship-exam',
    title: '借来的钢笔',
    domain: 'education',
    stage: 'adolescence',
    ages: [12, 18],
    tags: ['education', 'exam', 'class', 'poverty', 'ambition'],
    contexts: ['schooling', 'reform', 'urban'],
    milieus: ['school', 'university'],
    roles: {
      teacher: ['teacher', { minAge: 22, maxAge: 70 }],
      rival: ['worker', { minAge: 12, maxAge: 18 }],
      school: ['organization', { organizationKind: 'school' }],
    },
    outcomes: [
      {
        id: 'passed',
        w: 0.35,
        text: '{subject}用{rival}借的钢笔写完最后一题，笔尖在纸上划出一道细缝。放榜那天，{teacher}把{subject}的名字念了两遍，{rival}站在人群后面，先鼓掌，再低头看自己的鞋。',
        significance: 0.84,
        fx: [
          {
            education: ['secondary', 3],
            role: 'scholarship_holder',
            relation: ['teacher', 'colleague', 0.16, 0],
            reputation: 0.08,
            funds: ['school', -8, 'scholarship stipend'],
          },
        ],
      },
      {
        id: 'failed-by-a-mark',
        w: 0.4,
        text: '成绩单上差一分。{teacher}说可以补考，但要交一克朗的卷子费。{subject}在教室坐到天黑，把错题抄了三遍，最后把{rival}的钢笔还回去，说下次不用了。',
        significance: 0.7,
        fx: {
          mood: -0.14,
          flag: 'failed_scholarship_exam',
          skill: { literacy: 0.03 },
          relation: ['rival', 'colleague', 0.04, 0],
        },
      },
      {
        id: 'cheated',
        w: 0.25,
        text: '最后一题，{subject}把邻桌的答案抄在掌心。{teacher}收卷时多看了一眼那只手，什么也没说。放榜时{subject}过了，但{teacher}把{subject}叫到走廊，让{subjectPronoun}把掌心的字洗掉再进教室。',
        significance: 0.76,
        fx: [
          {
            education: ['secondary', 2],
            reputation: -0.08,
            relation: ['teacher', 'rival', -0.06, 0],
            flag: 'cheated_scholarship_exam',
          },
        ],
      },
    ],
  },
  {
    id: 'recipe-street.market-informer',
    title: '称完菜以后',
    domain: 'street',
    stage: 'adulthood',
    ages: [18, 75],
    tags: ['market', 'neighbor', 'informer', 'trust', 'risk'],
    contexts: ['urban', 'war', 'crisis', 'reform'],
    milieus: ['shop', 'tenement'],
    roles: {
      neighbor: ['neighbor', { minAge: 18, maxAge: 80 }],
      official: ['official', { minAge: 25, maxAge: 70 }],
    },
    outcomes: [
      {
        id: 'warned-neighbor',
        w: 0.4,
        text: '称完菜，{subject}低声告诉{neighbor}，昨天有人在市场后门问起她丈夫的工会名册。{neighbor}的手在秤盘上停了一下，多抓了一把豆子塞进{subject}的篮子。',
        significance: 0.7,
        fx: {
          relation: ['neighbor', 'friend', 0.2, 0.06],
          knowledge: ['someone is asking about the neighbor’s union roster', 0.8],
          flag: 'warned_neighbor_of_informer',
        },
      },
      {
        id: 'sold-name',
        w: 0.3,
        text: '{official}在巷口等{subject}，说只要说出昨天谁在市场后门发纸，下个月的摊位费可以免。{subject}报了{neighbor}的名字。第二天，{neighbor}的摊位空着，秤被收走了。',
        significance: 0.86,
        fx: {
          cash: 4,
          relation: ['neighbor', 'rival', -0.3, -0.1],
          flag: 'sold_neighbor_name',
          mood: -0.1,
        },
      },
      {
        id: 'said-nothing',
        w: 0.3,
        text: '{subject}把菜钱数完，什么也没说。{neighbor}看了{subjectPronoun}一会儿，把篮子提走了。那天晚上，{subject}听见隔壁有人搬箱子，声音一直响到后半夜。',
        significance: 0.62,
        fx: {
          mood: -0.06,
          flag: 'stayed_silent_about_informer',
          knowledge: ['the neighbor left the building at night', 0.6],
        },
      },
    ],
  },
  {
    id: 'recipe-task.repair-printing-press',
    title: '修好那台停摆的印刷机',
    domain: 'work',
    kind: 'task',
    stage: 'adulthood',
    ages: [20, 60],
    tags: ['work', 'craft', 'print', 'repair', 'urgency'],
    contexts: ['industrial', 'factory', 'crisis'],
    milieus: ['printshop', 'factory'],
    conditions: [{ kind: 'employment', employed: true }],
    roles: {
      foreman: ['worker', { minAge: 30, maxAge: 68 }],
    },
    outcomes: [
      {
        id: 'repaired-in-time',
        w: 0.5,
        text: '{subject}在滚筒下面找到一片卷进去的铅字，手指被油墨和血粘在一起。机器重新转起来时，{foreman}把明天的排班表往{subject}这边推了推，算是认了这门手艺。',
        significance: 0.72,
        fx: {
          cash: 4,
          skill: { craft: 0.05 },
          reputation: 0.05,
          relation: ['foreman', 'colleague', 0.12, 0],
          flag: 'repaired_printing_press',
        },
      },
      {
        id: 'made-it-worse',
        w: 0.3,
        text: '{subject}拆下齿轮，发现少了一枚垫圈，却先装回了主轴。开机时，整排铅字飞出来，{foreman}一把把{subject}按到地上。机器停到第二天，修理费从工钱里扣。',
        significance: 0.76,
        fx: {
          cash: -6,
          health: -0.04,
          relation: ['foreman', 'rival', -0.16, 0],
          condition: 'hand_injury',
        },
      },
      {
        id: 'called-specialist',
        w: 0.2,
        text: '{subject}没有硬修，去街口请了退休的老机修工。老人摸了摸轴承，说缺的不是零件，是有人肯停下来听机器响。{foreman}站在旁边，把烟掐了。',
        significance: 0.64,
        fx: {
          cash: -2,
          knowledge: ['the press needs a new bearing, not a tighter gear', 0.9],
          skill: { craft: 0.03 },
          relation: ['foreman', 'colleague', 0.05, 0],
        },
      },
    ],
    task: taskMeta(
      'work',
      ['repair the stopped press before the morning edition'],
      ['income', 'status'],
      0.7,
      0.3,
      ['craft'],
    ),
  },
]);

export const KIT_RECIPE_OBJECTS: PlotKernel[] = KIT_RECIPES;
