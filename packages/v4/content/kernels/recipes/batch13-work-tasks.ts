import type { PlotKernel } from '../../../composition/types.js';
import { recipes, taskMeta } from './kit.js';

/**
 * Phase 13 · work, commerce, craft and labour-politics tasks.
 *
 * Fifty active tasks for the wage economy of Vienna and its hinterland,
 * 1900–1935. Every task is something the subject chooses to attempt, not an
 * accident that happens to them: walking to the factory gate, asking a foreman
 * for a place, pricing stock, collecting a debt, standing for the union
 * committee. Outcomes change employment, wages, skill, household cash, health,
 * organization treasuries or membership. Failure is a real institutional or
 * physical consequence, not a mood note.
 */
export const BATCH13_WORK_TASKS: PlotKernel[] = recipes([
  // 1. Job search at the factory gate ----------------------------------------
  {
    id: 'r13-work.factory-gate',
    title: '铁门开了一条缝',
    domain: 'work',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 55],
    tags: ['work', 'hiring', 'factory', 'queue', 'cash'],
    contexts: ['vienna', 'urban', 'industrial', 'factory', 'crisis', 'postwar'],
    milieus: ['factory', 'print', 'work', 'home', 'poverty'],
    conditions: [{ kind: 'employment', employed: false }],
    roles: {
      gatekeeper: ['worker', { minAge: 35, maxAge: 68 }],
      rival: ['worker', { minAge: 16, maxAge: 50 }],
      factory: ['organization', { organizationKind: 'factory' }],
    },
    outcomes: [
      {
        id: 'hired-as-hand',
        w: 0.3,
        text: '铁门只开了一条缝，{gatekeeper}把人数到一百二十，才放最前面十个进去。{subject}把冻裂的手摊在灯下，指节上的茧替{subjectPronoun}答了话。{gatekeeper}在纸角写了个“明早六点”，{rival}被推到一边，脚边的麻袋口还开着，土豆滚进了排水沟。',
        significance: 0.78,
        fx: {
          cash: 2,
          employment: ['factory', 'Tagelöhner', 8],
          role: 'day_laborer',
          relation: ['gatekeeper', 'colleague', 0.08, 0],
          flag: 'work13_hired_at_factory_gate',
        },
      },
      {
        id: 'turned-away',
        w: 0.4,
        text: '{gatekeeper}把名单卷起来，说今天只要会看图纸的。{subject}在铁门外站到换班，听见里面皮带轮转了一整天。{rival}分给{subject}半块黑面包，两人谁也没提明天还来不来；电车票钱花掉了，口袋里的铜板只够买一小袋煤。',
        significance: 0.72,
        fx: {
          cash: -1,
          mood: -0.12,
          flag: 'work13_turned_away_at_factory_gate',
          knowledge: ['the factory takes only ten men from a gate queue of over a hundred', 0.8],
        },
      },
      {
        id: 'trial-at-the-drill',
        w: 0.3,
        text: '{gatekeeper}没有看推荐信，只把{subject}带到车间尽头，指着一台停着的钻床说，钻三个孔就留下。{subject}对准划线，铁屑卷成一条蓝灰色的弹簧。{gatekeeper}把工钱袋往柜台上一丢，说从今天算起，别迟到。',
        significance: 0.8,
        when: { skill: { name: 'craft', min: 0.25 } },
        fx: {
          cash: 1,
          employment: ['factory', 'Bohrer', 10],
          role: 'machine_hand',
          skill: { craft: 0.03 },
          relation: ['gatekeeper', 'colleague', 0.06, 0],
          flag: 'work13_hired_after_trial_at_gate',
        },
      },
    ],
    variants: [
      {
        id: 'crisis-queue',
        when: { processKinds: ['economic_crisis'] },
        title: '铁门外的第四个小时',
        outcomes: [
          {
            id: 'hired-as-blackleg',
            w: 0.35,
            text: '{gatekeeper}把铁门拉开半人高，喊的是顶替罢工者的名字。{subject}从人群缝里挤进去，听见身后有人骂“黑腿”。车间里空着三排机台，皮带轮转得比平时快，{gatekeeper}说干满今天就有工钱，明天的事明天再说。',
            significance: 0.82,
            fx: {
              cash: 4,
              employment: ['factory', 'Tagelöhner', 7],
              reputation: -0.1,
              relation: ['rival', 'rival', -0.12, 0],
              flag: 'work13_blackleg_at_factory_gate',
            },
          },
          {
            id: 'crushed-in-the-press',
            w: 0.4,
            text: '{gatekeeper}数到第五十个人就把名单合上了。人群往前一涌，{subject}的鞋跟被踩掉，手肘撞在铁门上。{rival}从下面钻过去，替{subject}把名字喊了一遍，{gatekeeper}头也没抬。天黑时，队伍散成几股，沿着墙根往电车站走。',
            significance: 0.72,
            fx: {
              cash: -2,
              health: -0.03,
              mood: -0.1,
              condition: 'bruised_arm',
              flag: 'work13_pressed_in_gate_queue',
            },
          },
          {
            id: 'side-door-promise',
            w: 0.25,
            text: '{gatekeeper}让{subject}帮着把两筐废铁搬进账房，说是“看着顺眼”。他压低声说，明天从侧门进来，别跟队伍里的人说话。{subject}把这话记在心里，回家的路上绕开了工会贴告示的那面墙。',
            significance: 0.7,
            fx: {
              cash: 1,
              flag: 'work13_side_door_promise',
              relation: ['gatekeeper', 'acquaintance', 0.05, 0],
              knowledge: ['the gatekeeper will open the side door tomorrow', 0.8, 'gatekeeper'],
            },
          },
        ],
      },
    ],
    task: taskMeta('work', ['work', 'survival'], ['cash', 'food'], 1.05, 0.15, ['craft']),
  },

  // 2. Ask for a trial shift --------------------------------------------------
  {
    id: 'r13-work.trial-shift',
    title: '先做一个班',
    domain: 'work',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 50],
    tags: ['work', 'hiring', 'trial', 'workshop', 'risk'],
    contexts: ['vienna', 'urban', 'industrial', 'factory', 'postwar', 'crisis'],
    milieus: ['factory', 'print', 'work', 'shop', 'craft'],
    conditions: [{ kind: 'employment', employed: false }],
    roles: {
      master: ['worker', { minAge: 30, maxAge: 68 }],
      mate: ['worker', { minAge: 18, maxAge: 60 }],
      workshop: ['organization', { organizationKind: 'household_firm' }],
    },
    outcomes: [
      {
        id: 'kept-after-trial',
        w: 0.4,
        text: '{master}把一摞刚印好的纸推到{subject}面前，让{subject}数到五百张一叠。{subject}数到第三摞时，{master}伸手抽走中间一张，看了看墨色，说留下吧，明天带自己的围裙。{mate}在门口把扫帚往墙边一靠，给{subject}腾出半个柜子。',
        significance: 0.78,
        fx: {
          cash: 1,
          employment: ['workshop', 'Hilfsarbeiter', 9],
          relation: ['master', 'colleague', 0.1, 0],
          skill: { craft: 0.02 },
          flag: 'work13_kept_after_trial_shift',
        },
      },
      {
        id: 'unpaid-trial-dismissed',
        w: 0.35,
        text: '{master}说试工没有工钱，只管一顿午饭。{subject}从早上六点干到天黑，中午那碗汤里只有两片土豆。收工时{master}说人已经够了，让{subject}把借的围裙留下。{mate}送{subject}到门口，塞过来一小块肥皂，说下回别再来这条街。',
        significance: 0.74,
        fx: {
          cash: -1,
          health: -0.03,
          mood: -0.14,
          flag: 'work13_unpaid_trial_shift',
          knowledge: ['the workshop uses unpaid trial shifts to clear its backlog', 0.8, 'mate'],
        },
      },
      {
        id: 'hurt-on-trial',
        w: 0.25,
        text: '{subject}在第二小时就被派去搬压纸板。木板比看上去沉，{subject}换手时，整摞纸滑下来，边角在手腕上划开一道口子。{master}先骂了一句，再让{mate}去拿碘酒；血滴在纸堆上，{mate}用废纸把它盖住。',
        significance: 0.8,
        fx: {
          cash: -2,
          health: -0.12,
          condition: 'hand_injury',
          relation: ['mate', 'friend', 0.08, 0],
          flag: 'work13_injured_on_trial_shift',
        },
      },
    ],
    variants: [
      {
        id: 'war-substitute-trial',
        when: { contextTags: ['war'] },
        title: '试工的人手不够',
        outcomes: [
          {
            id: 'hired-as-substitute',
            w: 0.55,
            text: '{master}把征兵告示从墙上撕下来，团成一团塞进炉子。他说厂里少了七个男人，{subject}只要能让压纸机转起来，今天就算上工。{subject}第一次摸到机器的手轮，铁是冷的，转起来以后却烫手。',
            significance: 0.8,
            fx: {
              cash: 2,
              employment: ['workshop', 'Maschinenarbeiter', 8],
              role: 'substitute_worker',
              relation: ['master', 'colleague', 0.08, 0],
              flag: 'work13_hired_as_wartime_substitute',
            },
          },
          {
            id: 'turned-away-for-insurance',
            w: 0.45,
            text: '{master}上下打量{subject}，说这身板搬不动纸垛。{subject}当着他的面把一摞纸抱到柜台上，纸边把胳膊勒出红印。{master}还是摇头，说保险不认。出门时，{subject}看见招工纸上又添了一行小字：只收有兵役豁免的。',
            significance: 0.72,
            fx: {
              unemployment:
                'refused a wartime trial shift because the insurance did not cover women',
              mood: -0.1,
              flag: 'work13_refused_wartime_trial',
              knowledge: ['the workshop hires only men with military exemptions', 0.8, 'master'],
            },
          },
        ],
      },
    ],
    task: taskMeta('work', ['work', 'survival'], ['cash', 'food'], 0.98, 0.2, ['craft']),
  },

  // 3. Prepare for an interview ----------------------------------------------
  {
    id: 'r13-work.interview-prep',
    title: '借来的硬领',
    domain: 'work',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 40],
    tags: ['work', 'interview', 'shop', 'preparation', 'class'],
    contexts: ['vienna', 'urban', 'industrial', 'schooling', 'postwar', 'reform'],
    milieus: ['home', 'poverty', 'shop', 'factory'],
    roles: {
      clerk: ['worker', { minAge: 20, maxAge: 65 }],
      neighbor: ['neighbor', { minAge: 18, maxAge: 75 }],
    },
    outcomes: [
      {
        id: 'borrowed-collar',
        w: 0.4,
        text: '{neighbor}把自己结婚时的硬领借给{subject}，又用湿布把领口擦了一遍。镜子只有巴掌大，{subject}练了三遍怎么进门、怎么把帽子拿在手里。{clerk}的柜台在两条街外，招的是会写字的人；{subject}把地址抄在纸片上，睡前又看了一遍。',
        significance: 0.7,
        fx: {
          cash: -1,
          relation: ['neighbor', 'friend', 0.1, 0],
          skill: { social: 0.03 },
          flag: 'work13_prepared_for_interview',
        },
      },
      {
        id: 'memorized-the-stock-list',
        w: 0.35,
        text: '{subject}把货单上的品名抄了二十遍，连花体也照着描。油灯烧到半夜，纸上落下两滴灯油。第二天{clerk}问起一种卖断货的线，{subject}报出了替代的编号和价钱，{clerk}在名册上把{subject}的名字往前挪了一格。',
        significance: 0.74,
        when: { skill: { name: 'literacy', min: 0.35 } },
        fx: {
          skill: { literacy: 0.03 },
          flag: 'work13_memorized_stock_list',
          knowledge: ['the shop keeps a substitute list behind the counter', 0.8, 'clerk'],
        },
      },
      {
        id: 'slept-through',
        w: 0.25,
        text: '{subject}把硬领放在椅背上，坐着背到后半夜，天亮时却睡过了头。跑到店门口，{clerk}正在关账房的窗。{subject}说路上电车坏了，{clerk}看了一眼{subject}没系好的领扣，说下个月再来问吧。',
        significance: 0.68,
        fx: {
          cash: -1,
          mood: -0.1,
          flag: 'work13_missed_shop_interview',
        },
      },
    ],
    variants: [
      {
        id: 'postwar-veterans-first',
        when: { contextTags: ['postwar'] },
        title: '退伍军人优先',
        roles: {
          workshop: ['organization', { organizationKind: 'household_firm' }],
        },
        outcomes: [
          {
            id: 'temporary-clerk',
            w: 0.5,
            text: '{clerk}把招工纸翻过来，背面印着“退伍军人优先”。{subject}没有服役记录，只把在印刷厂做过三年的证明推过去。{clerk}看了很久，说先做一个月临时工，等上面的名额下来再说。{subject}接过临时工牌，牌子上的号码是手写的。',
            significance: 0.76,
            fx: {
              cash: 1,
              employment: ['workshop', 'Aushilfe', 8],
              flag: 'work13_hired_as_postwar_temporary',
            },
          },
          {
            id: 'veterans-only',
            w: 0.5,
            text: '{clerk}连{subject}的证明都没接，说这条街上的铺子今年只招伤残军人。{subject}走出门，看见台阶下坐着两个缺腿的人，手里也捏着同样的招工纸。{neighbor}在街角等着，听完只说了一句：明天去码头问问。',
            significance: 0.76,
            fx: {
              unemployment: 'the shop reserved its vacancies for disabled veterans',
              mood: -0.12,
              flag: 'work13_refused_postwar_veteran_quota',
              knowledge: [
                'postwar shop vacancies are reserved for disabled veterans',
                0.8,
                'clerk',
              ],
            },
          },
        ],
      },
    ],
    task: taskMeta('work', ['work', 'status'], ['cash', 'status'], 0.8, 0.1, [
      'social',
      'literacy',
    ]),
  },

  // 4. Ask a foreman for work ------------------------------------------------
  {
    id: 'r13-work.ask-foreman',
    title: '工头兜里的粉笔头',
    domain: 'work',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 59],
    tags: ['work', 'hiring', 'foreman', 'favour', 'queue'],
    contexts: ['vienna', 'urban', 'industrial', 'factory', 'crisis', 'war'],
    milieus: ['factory', 'print', 'work', 'shop', 'home'],
    conditions: [{ kind: 'employment', employed: false }],
    roles: {
      foreman: ['worker', { minAge: 30, maxAge: 68 }],
      mate: ['worker', { minAge: 18, maxAge: 60 }],
      workshop: ['organization', { organizationKind: 'factory' }],
    },
    outcomes: [
      {
        id: 'given-broom-and-number',
        w: 0.35,
        text: '{foreman}正蹲在机器边上换皮带，听完没抬头，只把粉笔从耳朵后面取下来，在门框上写了个“七”。他说七点前来，先扫地、添油，工钱按杂工算。{subject}把那个数字记在手心，回家路上一直攥着拳头，怕汗把它抹掉。',
        significance: 0.74,
        fx: {
          cash: 1,
          employment: ['workshop', 'Hilfsarbeiter', 8],
          role: 'sweeper',
          relation: ['foreman', 'colleague', 0.06, 0],
          flag: 'work13_foreman_gave_a_start',
        },
      },
      {
        id: 'name-on-the-board',
        w: 0.35,
        text: '{foreman}说这个月不添人，让{subject}把名字写在门房的纸板上。纸板上已经有四十多个名字，最上面一行被雨泡花了。{subject}写得很小，挤在一个“王”字旁边，{foreman}看了一眼说，回去等吧，别天天来。',
        significance: 0.7,
        fx: {
          cash: -1,
          flag: 'work13_name_on_the_gate_board',
          knowledge: ['the gate board already holds more than forty names', 0.85, 'foreman'],
        },
      },
      {
        id: 'nephew-got-the-place',
        w: 0.3,
        text: '{foreman}的侄子从后面进来，手里提着两瓶酒。{foreman}把酒塞到柜台底下，转头对{subject}说位子满了。{subject}在门口站了一会儿，听见里面有人笑，笑声和皮带轮的响声混在一起。回家的路上，{subject}第一次绕到工会办事处的窗前。',
        significance: 0.76,
        when: { notHasRole: 'union_member' },
        fx: {
          relation: ['foreman', 'rival', -0.12, 0],
          mood: -0.14,
          flag: 'work13_foreman_nephew_got_the_job',
          knowledge: ['the foreman reserves places for his relatives', 0.8, 'foreman'],
        },
      },
    ],
    task: taskMeta('work', ['work', 'survival'], ['cash', 'food'], 0.95, 0.18, ['social']),
  },

  // 5. Apprenticeship completion ---------------------------------------------
  {
    id: 'r13-work.apprenticeship-exam',
    title: '三年后的最后一件活',
    domain: 'education',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 22],
    tags: ['work', 'apprenticeship', 'exam', 'craft', 'credential'],
    contexts: ['vienna', 'urban', 'industrial', 'schooling', 'postwar'],
    milieus: ['print', 'craft', 'factory', 'shop', 'work'],
    roles: {
      examiner: ['worker', { minAge: 40, maxAge: 70 }],
      master: ['worker', { minAge: 35, maxAge: 68 }],
      workshop: ['organization', { organizationKind: 'household_firm' }],
    },
    outcomes: [
      {
        id: 'passed-the-exam',
        w: 0.4,
        text: '{examiner}把{subject}做的抽屉翻过来，看底板上的燕尾榫，又用角尺量了对角线。{master}站在旁边，手一直插在围裙口袋里。{examiner}在证书上盖了章，说从今天起按帮工算工钱。{subject}把刨子放回工具箱，发现手心全是汗。',
        significance: 0.86,
        fx: {
          cash: 3,
          role: 'journeyman',
          employment: ['workshop', 'Geselle', 12],
          skill: { craft: 0.05 },
          relation: ['master', 'colleague', 0.12, 0],
          flag: 'work13_passed_journeyman_exam',
        },
      },
      {
        id: 'six-more-months',
        w: 0.35,
        text: '{examiner}把抽屉往桌上一放，说缝大得能塞进一枚硬币。{master}想替{subject}说话，被{examiner}抬手挡住。证书收回抽屉，{subject}得再跟半年师，工钱还是学徒的数目。回作坊的路上，{master}把自己的旧角尺塞给{subject}，一句话也没说。',
        significance: 0.76,
        fx: {
          cash: -2,
          mood: -0.16,
          skill: { craft: 0.02 },
          relation: ['examiner', 'rival', -0.1, 0],
          flag: 'work13_failed_journeyman_exam',
        },
      },
      {
        id: 'exam-piece-cracked',
        w: 0.25,
        text: '{subject}刨最后一块面板时，木纹突然翻起来，刃口啃掉一角。{examiner}没说话，只把废料推到一边，让{subject}重新领料。{master}替{subject}垫了木料钱，说手艺是磨出来的，不是考出来的；{subject}在工棚里做到天亮，才把第二块板刨平。',
        significance: 0.72,
        when: { skill: { name: 'craft', max: 0.35 } },
        fx: {
          cash: -3,
          skill: { craft: 0.03 },
          relation: ['master', 'colleague', 0.06, 0],
          flag: 'work13_exam_piece_cracked',
        },
      },
    ],
    task: taskMeta('education', ['work', 'status'], ['status'], 0.85, 0.2, ['craft']),
  },

  // 6. Learn a machine --------------------------------------------------------
  {
    id: 'r13-work.learn-machine',
    title: '新铣床的进给表',
    domain: 'craft',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 55],
    tags: ['work', 'machine', 'skill', 'training', 'factory'],
    contexts: ['vienna', 'urban', 'industrial', 'factory', 'crisis'],
    milieus: ['factory', 'print', 'work', 'craft'],
    conditions: [{ kind: 'employment', employed: true }],
    roles: {
      operator: ['worker', { minAge: 28, maxAge: 65 }],
      foreman: ['worker', { minAge: 32, maxAge: 68 }],
    },
    outcomes: [
      {
        id: 'learned-in-three-nights',
        w: 0.4,
        text: '{operator}先让{subject}空转了一刻钟，听主轴的声音，再把手放在进给轮上，教{subject}凭震动判断吃刀深浅。第三个晚上，{subject}独自车完一根轴，量了三遍，尺寸都在公差里。{foreman}把废料筐踢到一边，说这台机器以后归{subject}开。',
        significance: 0.78,
        fx: {
          skill: { craft: 0.06 },
          role: 'machine_hand',
          relation: ['operator', 'colleague', 0.1, 0],
          flag: 'work13_learned_the_milling_machine',
        },
      },
      {
        id: 'scrapped-a-piece',
        w: 0.35,
        text: '{subject}把进给量看错了一格，刀头啃进铸铁，火星溅到围裙上。{foreman}拉下总闸，整排机器慢慢停住。废件被摆在门口示众，赔偿从下个月工钱里扣。{operator}蹲下来看了看刀架，说不是手笨，是没人教过{subject}看那张表。',
        significance: 0.76,
        fx: {
          cash: -6,
          skill: { craft: 0.02 },
          relation: ['foreman', 'rival', -0.12, 0],
          flag: 'work13_scrapped_a_machine_piece',
        },
      },
      {
        id: 'corrected-the-feed-table',
        w: 0.25,
        text: '{subject}把进给表抄在烟盒背面，晚上在灯下算主轴转速和齿数。第二天{subject}指出表上印错了一行，{operator}试了一遍，果然如此。{foreman}没夸人，只让{subject}把这行改在车间的黑板上，从此换刀的人都先看黑板。',
        significance: 0.74,
        when: { skill: { name: 'numeracy', min: 0.35 } },
        fx: {
          skill: { numeracy: 0.03 },
          reputation: 0.04,
          relation: ['operator', 'colleague', 0.05, 0],
          flag: 'work13_corrected_the_feed_table',
        },
      },
    ],
    variants: [
      {
        id: 'pressroom-training',
        when: { milieuTags: ['print'] },
        title: '滚筒的转速',
        outcomes: [
          {
            id: 'learned-the-press',
            w: 0.55,
            text: '{operator}让{subject}先听滚筒的声音，再把手掌贴在机架上，说正常的震动该像心跳。{subject}调了三回压力，印出来的第一张校样没有重影。老师傅把校样举到窗边，说这双手可以上夜班了。',
            significance: 0.78,
            fx: {
              cash: 2,
              skill: { craft: 0.05 },
              role: 'pressman',
              relation: ['operator', 'colleague', 0.08, 0],
              flag: 'work13_learned_the_press',
            },
          },
          {
            id: 'overwound-the-pressure',
            w: 0.45,
            text: '{subject}把压力调重了半圈，橡皮布被压出一道沟，整版纸印成了黑块。停机、换布、重排版，损失记在{subject}名下。{operator}没骂人，只让{subject}把手伸进机器，摸一摸滚筒的间隙。',
            significance: 0.74,
            fx: {
              cash: -5,
              skill: { craft: 0.02 },
              relation: ['operator', 'colleague', 0.04, 0],
              flag: 'work13_overwound_the_press',
            },
          },
        ],
      },
    ],
    task: taskMeta('craft', ['work', 'status'], ['cash', 'status'], 0.85, 0.25, [
      'craft',
      'numeracy',
    ]),
  },

  // 7. Practice a craft -------------------------------------------------------
  {
    id: 'r13-work.practice-craft',
    title: '第四十个榫头',
    domain: 'craft',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 59],
    tags: ['work', 'craft', 'practice', 'wood', 'skill'],
    contexts: ['vienna', 'urban', 'industrial', 'rural', 'small_town', 'postwar'],
    milieus: ['print', 'craft', 'work', 'shop', 'home', 'farm'],
    roles: {
      master: ['worker', { minAge: 35, maxAge: 70 }],
      neighbor: ['neighbor', { minAge: 18, maxAge: 80 }],
    },
    outcomes: [
      {
        id: 'joint-fits',
        w: 0.4,
        text: '{subject}把第四十个榫头敲进卯眼，声音是闷的，不晃。{master}路过，用拇指按了按接缝，说这回不用胶也能站住。{subject}把废掉的三十九个榫头扫进灶膛，火苗从锯末里窜起来，屋里全是松木的味。',
        significance: 0.74,
        fx: {
          cash: 2,
          skill: { craft: 0.07 },
          relation: ['master', 'colleague', 0.06, 0],
          flag: 'work13_forty_practice_mortises',
        },
      },
      {
        id: 'split-good-wood',
        w: 0.35,
        text: '{subject}练到半夜，刨刃吃得太深，一块好料从中间裂开。木料钱要从下周的菜钱里出，{neighbor}听见响声，隔着墙问是不是在劈柴。{subject}把裂开的板子翻过来，看见木纹里有一道旧钉眼，才明白这块料本来就不该用。',
        significance: 0.66,
        fx: {
          cash: -2,
          mood: -0.08,
          skill: { craft: 0.02 },
          flag: 'work13_split_good_wood',
        },
      },
      {
        id: 'sold-first-stool',
        w: 0.25,
        text: '{subject}把攒下的边角料拼成一张小凳，榫卯全是手工，凳面用碎布擦了四遍。周末拿到市场，一个推婴儿车的女人给了{subject}五个克朗，还问能不能再做一张。{subject}收下钱，第一次觉得手艺可以换来别的东西。',
        significance: 0.78,
        when: { skill: { name: 'craft', min: 0.4 } },
        fx: {
          cash: 5,
          reputation: 0.05,
          role: 'cabinetmaker',
          flag: 'work13_sold_first_stool',
        },
      },
    ],
    variants: [
      {
        id: 'rural-cart-shaft',
        when: { contextTags: ['rural'] },
        title: '车辕上的裂纹',
        outcomes: [
          {
            id: 'repaired-the-shaft',
            w: 0.5,
            text: '{subject}把榆木车辕翻过来，顺着裂纹凿到尽头，再嵌进一块同纹的补木。车夫在旁边抽完一袋烟，套上马试了一圈，回来时说比新的还稳。{master}收下工钱，分给{subject}两个克朗，说这手艺在村里够吃一辈子。',
            significance: 0.74,
            fx: {
              cash: 3,
              skill: { craft: 0.05 },
              relation: ['master', 'colleague', 0.08, 0],
              flag: 'work13_repaired_a_cart_shaft',
            },
          },
          {
            id: 'shaft-broke-again',
            w: 0.5,
            text: '{subject}的补木嵌得太浅，车辕装上不到半里就断了，车斗歪进沟里。车夫骂着把断辕扛回来，{master}当着院里的人让{subject}赔木料。{subject}连夜重做，手背上留了一道斧口。',
            significance: 0.76,
            fx: {
              cash: -4,
              health: -0.04,
              condition: 'hand_cut',
              relation: ['master', 'rival', -0.1, 0],
              flag: 'work13_cart_shaft_broke_again',
            },
          },
        ],
      },
    ],
    task: taskMeta('craft', ['work', 'status'], ['cash', 'status'], 0.72, 0.15, ['craft']),
  },

  // 8. Ask for a raise --------------------------------------------------------
  {
    id: 'r13-work.ask-raise',
    title: '账房窗口前的两克朗',
    domain: 'work',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 59],
    tags: ['work', 'wages', 'negotiation', 'workshop', 'conflict'],
    contexts: ['vienna', 'urban', 'industrial', 'factory', 'crisis', 'postwar'],
    milieus: ['factory', 'print', 'work', 'craft', 'shop'],
    conditions: [{ kind: 'employment', employed: true }],
    roles: {
      master: ['worker', { minAge: 35, maxAge: 68 }],
      clerk: ['worker', { minAge: 20, maxAge: 65 }],
      workshop: ['organization', { organizationKind: 'factory' }],
    },
    outcomes: [
      {
        id: 'two-kroner-raise',
        w: 0.4,
        text: '{subject}等账房只剩{clerk}一个人，才把工钱袋放在柜台上，说这条街上同样的活已经给十二个克朗。{clerk}翻了翻工资册，让{subject}明天来找{master}。第二天，工资册上{subject}那一行的数字改成了十二，墨水还没干透。',
        significance: 0.76,
        fx: {
          cash: 2,
          employment: ['workshop', 'Facharbeiter', 12],
          reputation: 0.04,
          flag: 'work13_wage_raised_to_twelve',
          knowledge: ['the wage book can be changed with the clerk’s help', 0.8, 'clerk'],
        },
      },
      {
        id: 'piecework-instead',
        w: 0.35,
        text: '{master}听完没有加钱，只把计件单推过来，说多干多得。{subject}算了算，要做到天黑以后才抵得上两克朗。{clerk}在旁边低着头打算盘，算珠碰得很轻。{subject}把计件单折好，塞进围裙口袋。',
        significance: 0.72,
        fx: {
          cash: 3,
          health: -0.04,
          condition: 'exhaustion',
          flag: 'work13_took_piecework_instead_of_raise',
          knowledge: ['the master prefers piecework to a raise', 0.8, 'master'],
        },
      },
      {
        id: 'collective-raise-request',
        w: 0.25,
        text: '{subject}没有单独去，而是等午休时把三个帮工叫到院子里，一起把工钱数目报给{master}。{master}看了{clerk}一眼，说下个月起每人加一克朗，但加班不再另算。{subject}点头，回头看见三个人的脸色并不一样。',
        significance: 0.76,
        when: { skill: { name: 'social', min: 0.35 } },
        fx: {
          cash: 1,
          employment: ['workshop', 'Facharbeiter', 11],
          relation: ['clerk', 'colleague', 0.04, 0],
          reputation: 0.06,
          flag: 'work13_collective_raise_request',
        },
      },
    ],
    variants: [
      {
        id: 'crisis-no-money',
        when: { contextTags: ['crisis'] },
        title: '账房说没有钱',
        outcomes: [
          {
            id: 'advance-instead',
            w: 0.35,
            text: '{clerk}把账本翻给{subject}看，红字比黑字多。{master}说订单少了三成，能保住工位已经不容易。{subject}要的那两克朗没有，但{clerk}悄悄把预支栏指给{subject}，说可以借，下月从工钱里扣。',
            significance: 0.74,
            fx: {
              cash: 4,
              flag: 'work13_took_an_advance',
              knowledge: ['the workshop is short of orders, not short of ledgers', 0.8, 'clerk'],
            },
          },
          {
            id: 'accepted-wage-cut',
            w: 0.35,
            text: '{master}说要么接受减工钱，要么把位子让给外面排队的人。{subject}在院子里站了一刻钟，最后在减薪单上签了字。回家时买的面包比上周小了一圈，{clerk}问起，{subject}只说铺子里改了规矩。',
            significance: 0.8,
            fx: {
              cash: -2,
              employment: ['workshop', 'Facharbeiter', 8],
              mood: -0.08,
              flag: 'work13_accepted_wage_cut',
            },
          },
          {
            id: 'changed-workshop-for-pay',
            w: 0.3,
            text: '{subject}没有签字，第二天去对街的铺子问工。那边的师傅听过{subject}的名字，愿意多出一克朗。{subject}把这个数报回账房，{master}沉默了一会儿，让{clerk}把工资册改了；涨的钱不多，但{subject}从此知道别家肯要自己。',
            significance: 0.8,
            fx: {
              cash: 1,
              employment: ['workshop', 'Facharbeiter', 11],
              relation: ['master', 'rival', -0.14, 0],
              flag: 'work13_changed_workshop_for_pay',
            },
          },
        ],
      },
    ],
    task: taskMeta('work', ['work', 'status'], ['cash', 'status'], 0.78, 0.25, [
      'social',
      'numeracy',
    ]),
  },

  // 9. Negotiate piece rates --------------------------------------------------
  {
    id: 'r13-work.piece-rates',
    title: '计件单上的小数点',
    domain: 'work',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 59],
    tags: ['work', 'wages', 'piecework', 'factory', 'negotiation'],
    contexts: ['vienna', 'urban', 'industrial', 'factory', 'crisis'],
    milieus: ['factory', 'print', 'work', 'craft'],
    conditions: [{ kind: 'employment', employed: true }],
    roles: {
      foreman: ['worker', { minAge: 32, maxAge: 68 }],
      mate: ['worker', { minAge: 18, maxAge: 60 }],
      workshop: ['organization', { organizationKind: 'factory' }],
    },
    outcomes: [
      {
        id: 'rate-raised',
        w: 0.35,
        text: '{foreman}把计件单钉在墙上，{subject}看完没有签字，先问废品怎么算。{mate}在后面帮腔，说上个月三件废活全扣在工人头上。{foreman}把单价从八赫勒改到九赫勒，又在废品栏添了“材料由厂方负担”。',
        significance: 0.74,
        fx: {
          cash: 2,
          employment: ['workshop', 'Stückarbeiter', 11],
          relation: ['mate', 'colleague', 0.1, 0],
          relation2: ['foreman', 'colleague', 0.04, 0],
          flag: 'work13_piece_rate_raised',
        },
      },
      {
        id: 'rate-cut-accepted',
        w: 0.35,
        text: '{foreman}说单价已经定死，谁不干就出去。{subject}算了一晚，发现自己要比上个月多干两成才能拿到同样的钱。第二天{subject}把计件单签了，{mate}在角落里把自己的那份揉成一团。',
        significance: 0.74,
        fx: {
          cash: -2,
          employment: ['workshop', 'Stückarbeiter', 8],
          mood: -0.1,
          relation: ['mate', 'colleague', 0.02, 0],
          flag: 'work13_piece_rate_cut',
        },
      },
      {
        id: 'timed-the-job',
        w: 0.3,
        text: '{subject}没有吵，只把每道工序的用时记在纸上。三天后，{subject}把那张纸交给{foreman}，上面写着换一次线轴要停多久、搬一次料要走几步。{foreman}看了半天，把单价往上调了半赫勒，条件是这张纸不外传。',
        significance: 0.72,
        when: { skill: { name: 'social', min: 0.3 } },
        fx: {
          cash: 1,
          reputation: 0.05,
          relation: ['foreman', 'rival', -0.06, 0],
          flag: 'work13_timed_the_piece_job',
          knowledge: ['the foreman will trade a rate rise for silence', 0.8, 'foreman'],
        },
      },
    ],
    variants: [
      {
        id: 'typesetting-lines',
        when: { milieuTags: ['print'] },
        title: '按行算的排字房',
        outcomes: [
          {
            id: 'counted-the-blank-lines',
            w: 0.55,
            text: '{subject}把一页讣告的活字排完，数了行数，发现{foreman}把空行也算进了钱。{mate}说这是老规矩，{subject}却把空行一根根抽出来，重新码在字盘里。{foreman}过来看了一眼，说以后按实际行数算。',
            significance: 0.72,
            fx: {
              cash: 2,
              skill: { craft: 0.03 },
              relation: ['mate', 'colleague', 0.06, 0],
              flag: 'work13_counted_type_lines',
            },
          },
          {
            id: 'typesetting-error',
            w: 0.45,
            text: '{subject}为了赶速度，把一个字母排倒了。校样印出来，主顾把纸摔在柜台上，整版重排的钱从{subject}的计件里扣。{foreman}把错字挑出来，钉在{subject}的字盘上方，说让{subject}每天先看它一眼。',
            significance: 0.72,
            fx: {
              cash: -5,
              reputation: -0.04,
              flag: 'work13_typesetting_error',
            },
          },
        ],
      },
    ],
    task: taskMeta('work', ['work', 'status'], ['cash', 'status'], 0.8, 0.2, [
      'numeracy',
      'social',
    ]),
  },

  // 10. Volunteer for overtime ------------------------------------------------
  {
    id: 'r13-work.volunteer-overtime',
    title: '黑板上的空格',
    domain: 'work',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 55],
    tags: ['work', 'overtime', 'wages', 'exhaustion', 'factory'],
    contexts: ['vienna', 'urban', 'industrial', 'factory', 'war', 'crisis'],
    milieus: ['factory', 'print', 'work', 'craft'],
    conditions: [{ kind: 'employment', employed: true }],
    roles: {
      foreman: ['worker', { minAge: 32, maxAge: 68 }],
      mate: ['worker', { minAge: 18, maxAge: 60 }],
    },
    outcomes: [
      {
        id: 'signed-for-sunday',
        w: 0.4,
        text: '{foreman}把星期天的加班格擦干净，{subject}第一个把名字写上去。那天车间只剩一半灯，皮带轮的声音显得特别大。中午发了一块面包和一杯代用咖啡，天黑收工时，{foreman}把加班钱一张张数给{subject}。',
        significance: 0.72,
        fx: {
          cash: 5,
          health: -0.05,
          condition: 'exhaustion',
          flag: 'work13_volunteered_for_sunday',
        },
      },
      {
        id: 'gave-slot-to-mate',
        w: 0.3,
        text: '{subject}看见{mate}在黑板前站了很久，家里有病人，加班钱对他家更要紧。{subject}把自己的名字擦掉，替{mate}写上。{foreman}问是谁改的，{mate}没吭声。下班时，{mate}在门口塞给{subject}一小袋面粉，说下回再还。',
        significance: 0.7,
        fx: {
          cash: -1,
          food: 1,
          relation: ['mate', 'friend', 0.12, 0],
          reputation: 0.04,
          flag: 'work13_gave_overtime_to_mate',
        },
      },
      {
        id: 'foreman-crossed-it-out',
        w: 0.3,
        text: '{subject}在加班格上写了名字，{foreman}看了{subject}发青的眼圈，把名字划掉，说机器不能交给一个站不稳的人。车间里没有工会的人替{subject}说话，{subject}想争，腿却先软了一下。回家的路上，{subject}在药铺门口站了很久。',
        significance: 0.7,
        when: { notHasRole: 'union_member' },
        fx: {
          health: 0.01,
          mood: -0.08,
          relation: ['foreman', 'acquaintance', 0.04, 0],
          flag: 'work13_overtime_refused_on_health',
        },
      },
    ],
    variants: [
      {
        id: 'war-munitions-sunday',
        when: { contextTags: ['war'] },
        title: '军需车间的星期日',
        outcomes: [
          {
            id: 'twelve-hour-sunday',
            w: 0.55,
            text: '{foreman}说军需订单压着，星期天全车间都来。{subject}在机器前站了十二个钟头，午饭是配给汤和一块掺了锯末的面包。收工时，{foreman}多发了一张代价券，说下个月凭券买煤。',
            significance: 0.76,
            fx: {
              cash: 6,
              food: 1,
              health: -0.06,
              condition: 'exhaustion',
              flag: 'work13_worked_wartime_sunday',
            },
          },
          {
            id: 'eye-injury-at-overtime',
            w: 0.45,
            text: '{subject}在加班时被飞出的铁屑划伤了眼皮，{foreman}让{subject}去水龙头下冲一冲就回来。血止住以后，{subject}看东西总有一层雾，但那天还算满勤。',
            significance: 0.8,
            fx: {
              cash: 5,
              health: -0.1,
              condition: 'eye_injury',
              flag: 'work13_eye_injured_during_overtime',
            },
          },
        ],
      },
    ],
    task: taskMeta('work', ['work', 'survival'], ['cash', 'food'], 0.8, 0.25, ['craft']),
  },

  // 11. Refuse unsafe work ----------------------------------------------------
  {
    id: 'r13-work.refuse-unsafe',
    title: '护罩还挂在墙上',
    domain: 'work',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 59],
    tags: ['work', 'safety', 'refusal', 'factory', 'union'],
    contexts: ['vienna', 'urban', 'industrial', 'factory', 'war', 'crisis'],
    milieus: ['factory', 'print', 'work', 'craft'],
    conditions: [{ kind: 'employment', employed: true }],
    roles: {
      foreman: ['worker', { minAge: 32, maxAge: 68 }],
      mate: ['worker', { minAge: 18, maxAge: 60 }],
      union: ['organization', { organizationKind: 'union' }],
    },
    outcomes: [
      {
        id: 'refused-and-sent-home',
        w: 0.35,
        text: '{foreman}让{subject}把手伸到传动轴下面掏废纸，护罩还挂在墙上，螺丝少了两颗。{subject}没有伸手，把护罩拖过来扣上，说等装好再开。{foreman}当场让{subject}回家，工钱记半天；出门时，门房把{subject}的工具袋扔在台阶上。',
        significance: 0.74,
        fx: {
          cash: -4,
          relation: ['foreman', 'rival', -0.16, 0],
          reputation: 0.04,
          flag: 'work13_refused_unguarded_shaft',
        },
      },
      {
        id: 'ran-it-and-mate-was-hurt',
        w: 0.35,
        text: '{subject}还是把手伸了进去，指尖刚碰到废纸，皮带就咬住了袖子。{mate}扑过来拉总闸，手掌被飞轮擦掉一块皮。{foreman}先去看机器，再让人把{mate}扶到水龙头边；地上的血混着机油，脚印一直拖到门口。',
        significance: 0.86,
        fx: {
          health: -0.03,
          condition: 'shaken',
          relation: ['mate', 'colleague', -0.05, 0],
          flag: 'work13_unguarded_shaft_injury',
          knowledge: ['the guard was missing before the shift started', 0.9],
        },
      },
      {
        id: 'stopped-the-line',
        w: 0.3,
        text: '{subject}没有碰机器，而是让{mate}去门口等工会的人。{foreman}骂了两句，见{subject}把总闸锁上，只好把整排机器停下。工会代表赶来时，护罩已经装回原位，螺丝是新的；{foreman}说这是“保养”，代表让{subject}把时间写下来。',
        significance: 0.8,
        when: { hasRole: 'union_member' },
        fx: {
          role: 'safety_rep',
          reputation: 0.1,
          relation: ['foreman', 'rival', -0.12, 0],
          funds: ['union', -1, 'representative time spent on a guard complaint'],
          flag: 'work13_called_union_over_guard',
        },
      },
    ],
    variants: [
      {
        id: 'war-no-stopping',
        when: { processKinds: ['war_mobilization'] },
        title: '军需不许停机',
        outcomes: [
          {
            id: 'forced-to-run',
            w: 0.55,
            text: '{foreman}把军需处的红单子拍在机台上，说停机一小时要报到团部。{subject}重新开动机器，把袖口扎紧，眼睛盯着传动轴。那天下午皮带断了，抽在铁架上，声音像枪响；没有人受伤，但{subject}的手一直抖到下班。',
            significance: 0.78,
            fx: {
              cash: 4,
              health: -0.05,
              condition: 'shaken',
              flag: 'work13_ran_unguarded_for_munitions',
            },
          },
          {
            id: 'wedged-the-guard',
            w: 0.45,
            text: '{subject}找了一块木楔，把护罩硬卡回原位，又用铁丝缠了两圈。{foreman}看见了，没再说什么。机器转起来时，木楔跟着震，{subject}每隔一刻钟就去看一眼。那天产量少了两成，但人都在。',
            significance: 0.74,
            fx: {
              cash: 1,
              skill: { craft: 0.02 },
              relation: ['foreman', 'colleague', 0.04, 0],
              flag: 'work13_wedged_the_guard',
            },
          },
        ],
      },
    ],
    task: taskMeta('work', ['work', 'survival'], ['health', 'cash'], 0.72, 0.45, ['craft']),
  },

  // 12. Report a safety defect ------------------------------------------------
  {
    id: 'r13-work.report-defect',
    title: '报修单压在茶壶底下',
    domain: 'work',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 59],
    tags: ['work', 'safety', 'bureaucracy', 'factory', 'whistleblowing'],
    contexts: ['vienna', 'urban', 'industrial', 'factory', 'reform', 'crisis'],
    milieus: ['factory', 'print', 'work', 'craft'],
    conditions: [{ kind: 'employment', employed: true }],
    roles: {
      foreman: ['worker', { minAge: 32, maxAge: 68 }],
      clerk: ['worker', { minAge: 20, maxAge: 65 }],
      workshop: ['organization', { organizationKind: 'factory' }],
    },
    outcomes: [
      {
        id: 'defect-fixed',
        w: 0.4,
        text: '{subject}把松动的螺栓画在纸上，标了机台号和班次，交给{clerk}。{clerk}起初把纸压在茶壶底下，{subject}就站在窗口不走，直到他把维修班叫来。第二天螺栓换了新的，{foreman}在早会上说这是“例行保养”，没提{subject}的名字。',
        significance: 0.74,
        fx: {
          cash: 2,
          reputation: 0.05,
          relation: ['foreman', 'colleague', 0.06, 0],
          flag: 'work13_reported_and_fixed_defect',
        },
      },
      {
        id: 'form-lost',
        w: 0.35,
        text: '{subject}把报修单交上去，三天没有回音。再去问，{clerk}说单子夹在工资册里弄丢了，让{subject}重写一张。那台机器还在转，螺栓一天比一天松；{subject}每次经过都绕开半步，耳朵却一直听着它的声音。',
        significance: 0.72,
        fx: {
          condition: 'unsafe_machine_duty',
          mood: -0.06,
          flag: 'work13_safety_form_lost',
          knowledge: ['the repair request never reached the maintenance book', 0.8, 'clerk'],
        },
      },
      {
        id: 'kept-a-duplicate',
        w: 0.25,
        text: '{subject}把报修单抄了两份，一份交上去，一份折好塞进内袋。{foreman}说{subject}越级告状，把{subject}调到最旧的那台机器上。那张纸一直没离身，边角磨得起毛；{subject}知道，真出事时它比口头的话管用。',
        significance: 0.76,
        when: { skill: { name: 'literacy', min: 0.4 } },
        fx: {
          relation: ['foreman', 'rival', -0.14, 0],
          flag: 'work13_kept_duplicate_repair_form',
          knowledge: ['a duplicate repair form is hidden in the worker’s coat', 0.9],
        },
      },
    ],
    task: taskMeta('work', ['work', 'cause'], ['health', 'status'], 0.7, 0.3, ['literacy']),
  },

  // 13. Union recruitment -----------------------------------------------------
  {
    id: 'r13-work.union-recruit',
    title: '更衣室里的入会表',
    domain: 'politics',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 55],
    tags: ['work', 'union', 'recruitment', 'solidarity', 'risk'],
    contexts: ['vienna', 'urban', 'industrial', 'factory', 'crisis', 'reform'],
    milieus: ['union', 'factory', 'print', 'work'],
    conditions: [
      { kind: 'employment', employed: true },
      { kind: 'hasRole', role: 'union_member' },
    ],
    roles: {
      mate: ['worker', { minAge: 18, maxAge: 60 }],
      union: ['organization', { organizationKind: 'union' }],
      foreman: ['worker', { minAge: 32, maxAge: 68 }],
    },
    outcomes: [
      {
        id: 'mate-signed',
        w: 0.4,
        text: '更衣室里只剩{subject}和{mate}。{subject}把入会表铺在长凳上，指着会费那一栏说，一个月两杯啤酒钱，换的是出事时有人替{mate}说话。{mate}用铅笔签了名，又让{subject}把名字描一遍，怕自己写得不像。',
        significance: 0.76,
        fx: {
          membership: ['union', true, 'signed after a changing-room recruitment talk'],
          funds: ['union', 1, 'first monthly dues from a new member'],
          relation: ['mate', 'friend', 0.12, 0],
          flag: 'work13_recruited_a_union_member',
        },
      },
      {
        id: 'mate-reported-it',
        w: 0.3,
        text: '{mate}把入会表推回来，说家里有人在厂里做事，不能沾这个。第二天{foreman}把{subject}叫到磅秤旁，问是不是在更衣室发纸。{subject}说只是聊天，{foreman}让{subject}把口袋翻出来；那天的入会表少了两张。',
        significance: 0.78,
        fx: {
          relation: ['mate', 'rival', -0.2, 0],
          reputation: -0.05,
          flag: 'work13_recruitment_reported_to_foreman',
          knowledge: ['the foreman knows who is recruiting in the changing room', 0.85, 'foreman'],
        },
      },
      {
        id: 'postponed-the-talk',
        w: 0.3,
        text: '{subject}在更衣室里开了个头，{mate}一直看门口，话没说完就散了。{subject}把表格收回怀里，纸角被汗浸软。第二天{mate}照常和{subject}一起搬料，只是不再并排走；那张表在{subject}的内袋里放了半个月，字都压模糊了。',
        significance: 0.62,
        when: { skill: { name: 'social', max: 0.35 } },
        fx: {
          mood: -0.06,
          flag: 'work13_recruitment_talk_failed',
        },
      },
    ],
    variants: [
      {
        id: 'repression-no-lists',
        when: { processKinds: ['political_repression'] },
        title: '名单不能留在车间',
        outcomes: [
          {
            id: 'memorized-the-names',
            w: 0.55,
            text: '警察上午来过厂里，{subject}把入会表留在家里，只带了一张空白纸。{mate}报一个名字，{subject}就用只有自己看得懂的缩写记一个，记完把纸嚼软，吐进炉灰。下班时{subject}能背出十一个名字，一个也没写下来。',
            significance: 0.72,
            fx: {
              skill: { social: 0.03 },
              relation: ['mate', 'colleague', 0.06, 0],
              flag: 'work13_memorized_recruitment_names',
            },
          },
          {
            id: 'list-found',
            w: 0.45,
            text: '{subject}把名单藏在工具箱夹层，警察来查时，工具被一件件摆在桌上。名单被抽出来，{mate}的名字圈了红笔。{foreman}站在门口，说车间里不许有这种纸；{subject}被停班三天，{mate}再没和{subject}说过话。',
            significance: 0.8,
            fx: {
              cash: -3,
              relation: ['mate', 'rival', -0.22, 0],
              reputation: -0.08,
              flag: 'work13_recruitment_list_seized',
            },
          },
        ],
      },
    ],
    task: taskMeta('politics', ['belonging', 'cause'], ['belonging', 'status'], 0.78, 0.35, [
      'social',
    ]),
  },

  // 14. Become a delegate -----------------------------------------------------
  {
    id: 'r13-work.union-delegate',
    title: '车间里多了一把椅子',
    domain: 'politics',
    kind: 'task',
    stage: 'adulthood',
    ages: [20, 59],
    tags: ['work', 'union', 'election', 'delegate', 'status'],
    contexts: ['vienna', 'urban', 'industrial', 'factory', 'reform', 'crisis'],
    milieus: ['union', 'factory', 'print', 'work'],
    conditions: [{ kind: 'employment', employed: true }],
    roles: {
      union: ['organization', { organizationKind: 'union' }],
      mate: ['worker', { minAge: 18, maxAge: 60 }],
      foreman: ['worker', { minAge: 32, maxAge: 68 }],
    },
    outcomes: [
      {
        id: 'elected-delegate',
        w: 0.4,
        text: '投票箱是一只旧茶叶盒，票写在裁开的包装纸上。{subject}得了二十三票，比对手多四票。{union}的书记把一枚铜章别在{subject}的衣领内侧，说以后车间的申诉要先经过{subject}的手；{mate}在旁边鼓掌，掌心拍得很响。',
        significance: 0.82,
        fx: {
          role: 'union_delegate',
          membership: ['union', true, 'elected as the workshop delegate'],
          reputation: 0.08,
          relation: ['mate', 'colleague', 0.08, 0],
          flag: 'work13_elected_union_delegate',
        },
      },
      {
        id: 'lost-by-three-votes',
        w: 0.35,
        text: '{subject}站在茶箱旁边数票，数到最后少了三张。对手把帽子往头上一扣，说下回再争。{subject}把落选的纸条折好，塞进工具箱；第二天照常上工，只是路过工会活动室时不再停脚。',
        significance: 0.7,
        fx: {
          mood: -0.1,
          relation: ['mate', 'colleague', 0.04, 0],
          flag: 'work13_lost_delegate_election',
        },
      },
      {
        id: 'nomination-blocked',
        w: 0.25,
        text: '{subject}的名字刚写上候选纸，{foreman}就说{subject}上个月迟到三次，不合规矩。{union}的书记翻了翻考勤簿，没找到那三次。{foreman}把纸从墙上揭下来，说车间里的选举要“稳妥”；{subject}把书记拉到一边，让他把考勤簿抄一份带走。',
        significance: 0.74,
        when: { skill: { name: 'social', min: 0.4 } },
        fx: {
          reputation: 0.06,
          relation: ['foreman', 'rival', -0.12, 0],
          flag: 'work13_delegate_nomination_blocked',
          knowledge: ['the foreman invented absences to block the nomination', 0.8],
        },
      },
    ],
    variants: [
      {
        id: 'crisis-polling-under-police',
        when: { contextTags: ['crisis'] },
        title: '警察站在票箱旁',
        outcomes: [
          {
            id: 'elected-anyway',
            w: 0.5,
            text: '两个巡警站在车间门口，说集会超过十个人就要登记。{subject}把投票改成午休时逐台机器进行，茶叶盒从一个工具箱传到另一个工具箱。傍晚开票，{subject}赢了六票；巡警记下{subject}的名字，才离开厂门。',
            significance: 0.82,
            fx: {
              role: 'union_delegate',
              membership: ['union', true, 'elected during a policed workplace vote'],
              reputation: 0.1,
              flag: 'work13_elected_delegate_under_police',
            },
          },
          {
            id: 'vote-called-off',
            w: 0.5,
            text: '{foreman}把巡警领进车间，说今天有人“聚众”。茶叶盒被踢翻，票纸散在油污里。{subject}蹲下去捡，被巡警用靴尖拨开。选举改到下个月，可下个月车间要停一半机器；{subject}把湿透的票纸摊在窗台上，一张张晾干。',
            significance: 0.74,
            fx: {
              mood: -0.12,
              relation: ['foreman', 'rival', -0.1, 0],
              flag: 'work13_delegate_vote_called_off',
              knowledge: ['the foreman used the police to stop the delegate vote', 0.85],
            },
          },
        ],
      },
    ],
    task: taskMeta(
      'politics',
      ['status', 'belonging', 'cause'],
      ['status', 'belonging'],
      0.75,
      0.35,
      ['social'],
    ),
  },

  // 15. Collective bargaining -------------------------------------------------
  {
    id: 'r13-work.collective-bargaining',
    title: '长桌两边的水杯',
    domain: 'politics',
    kind: 'task',
    stage: 'adulthood',
    ages: [22, 59],
    tags: ['work', 'union', 'bargaining', 'wages', 'institution'],
    contexts: ['vienna', 'urban', 'industrial', 'factory', 'reform', 'postwar', 'crisis'],
    milieus: ['union', 'factory', 'print', 'work'],
    conditions: [{ kind: 'employment', employed: true }],
    roles: {
      union: ['organization', { organizationKind: 'union' }],
      master: ['worker', { minAge: 40, maxAge: 70 }],
      clerk: ['worker', { minAge: 22, maxAge: 65 }],
      factory: ['organization', { organizationKind: 'factory' }],
    },
    outcomes: [
      {
        id: 'five-percent-signed',
        w: 0.35,
        text: '长桌两边各放一只水杯，谁也不先喝。{subject}把计件工人的名单推到中间，说少了这四十个人，合同签了也不算数。{master}和{clerk}低声算了半个钟头，最后在百分之五那一行按了指印；散会时，水杯里的水一口没少。',
        significance: 0.84,
        fx: {
          cash: 2,
          employment: ['factory', 'Facharbeiter', 12],
          funds: ['union', -2, 'strike and bargaining fund spent on the settlement'],
          reputation: 0.06,
          relation: ['clerk', 'colleague', 0.04, 0],
          flag: 'work13_collective_agreement_signed',
        },
      },
      {
        id: 'talks-adjourned',
        w: 0.35,
        text: '{master}说总厂没有授权，今天只能谈程序。{subject}把工人按机器分组的名单留下，{clerk}把它夹进账本，说下周再谈。走出厂门时，天已经黑了；{subject}知道下周的班表会先被改动，最难谈的那几个人会被调去上夜班。',
        significance: 0.72,
        fx: {
          mood: -0.08,
          flag: 'work13_bargaining_adjourned',
          knowledge: ['the employer will reshuffle shifts before the next bargaining round', 0.75],
        },
      },
      {
        id: 'lockout',
        w: 0.3,
        text: '{subject}把最后一条要求念完，{master}站起来，说厂里今天起关门。工人被挡在铁栅外，{clerk}把工资结算单一张张递出来，数字算到罢工前一天。{subject}接过自己的那张，发现上面多扣了一笔“工具保管费”。',
        significance: 0.86,
        when: { skill: { name: 'social', max: 0.4 } },
        fx: {
          cash: -3,
          unemployment: 'locked out after a failed bargaining round',
          relation: ['clerk', 'colleague', 0.05, 0],
          flag: 'work13_locked_out_after_bargaining',
        },
      },
    ],
    variants: [
      {
        id: 'reform-eight-hour-clause',
        when: { legacyKinds: ['reform'] },
        title: '八小时写进合同',
        outcomes: [
          {
            id: 'hours-clause-won',
            w: 0.55,
            text: '新法把八小时写进了纸面，{master}却想用“自愿加班”把它绕过去。{subject}把车间过去三个月的加班钟点抄成一张表，一栏栏念出来。{clerk}听到第九行，抬手让{master}别再争；合同最后添了一句：加班须经工人代表签字。',
            significance: 0.84,
            fx: {
              cash: 2,
              employment: ['factory', 'Facharbeiter', 13],
              reputation: 0.08,
              flag: 'work13_eight_hour_clause_won',
            },
          },
          {
            id: 'employer-stalls-on-hours',
            w: 0.45,
            text: '{master}说八小时是给官办工厂的，私人厂子按订单算。{subject}把合同草案带回去，工人们围着看，没人愿意先签名。拖到第三周，厂里招了几个新工人，合同的事就搁在{clerk}的抽屉里，和去年的那张放在一起。',
            significance: 0.74,
            fx: {
              mood: -0.08,
              flag: 'work13_hours_clause_stalled',
              knowledge: ['the employer is hiring around the eight-hour clause', 0.8, 'clerk'],
            },
          },
        ],
      },
    ],
    task: taskMeta(
      'politics',
      ['work', 'cause', 'status'],
      ['cash', 'status', 'belonging'],
      0.82,
      0.3,
      ['social', 'numeracy'],
    ),
  },

  // 16. Strike vote -----------------------------------------------------------
  {
    id: 'r13-work.strike-vote',
    title: '举手表决的一分钟',
    domain: 'politics',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 59],
    tags: ['work', 'union', 'strike', 'vote', 'risk'],
    contexts: ['vienna', 'urban', 'industrial', 'factory', 'crisis', 'postwar'],
    milieus: ['union', 'factory', 'print', 'work'],
    conditions: [{ kind: 'employment', employed: true }],
    roles: {
      union: ['organization', { organizationKind: 'union' }],
      mate: ['worker', { minAge: 18, maxAge: 60 }],
      foreman: ['worker', { minAge: 32, maxAge: 68 }],
    },
    outcomes: [
      {
        id: 'strike-authorized',
        w: 0.4,
        text: '{union}的书记把怀表放在桌上，说表决只开一分钟。{subject}先举手，{mate}跟着举，后排的人一个接一个，手影像一片慢慢立起来的麦子。书记数完，在纸角写下“通过”，又让{subject}进罢工委员会；散会时，{foreman}站在门外，把每个人的脸都看了一遍。',
        significance: 0.84,
        fx: {
          role: 'strike_committee',
          reputation: 0.08,
          funds: ['union', -3, 'strike committee expenses'],
          flag: 'work13_strike_authorized',
        },
      },
      {
        id: 'vote-fails',
        w: 0.35,
        text: '举手的人不到一半。{mate}举到一半又放下，说家里这个月要交房租。{subject}把票数重新数了一遍，还是不够。书记把怀表收进口袋，说下个月再议；第二天厂里贴出加半赫勒的告示，像是对这场表决的答复。',
        significance: 0.72,
        fx: {
          mood: -0.12,
          relation: ['mate', 'colleague', 0.04, 0],
          flag: 'work13_strike_vote_failed',
        },
      },
      {
        id: 'abstained',
        w: 0.25,
        text: '书记念到{subject}的名字时，{subject}把手放在膝盖上，没有举。{mate}看了{subject}一眼，什么也没说。表决通过以后，车间里有人开始收工具，{subject}照常去开自己的机器；从那天起，午饭时没人再坐在{subject}旁边。',
        significance: 0.66,
        when: { maxCash: 4 },
        fx: {
          mood: -0.05,
          relation: ['mate', 'rival', -0.08, 0],
          flag: 'work13_abstained_from_strike_vote',
        },
      },
    ],
    variants: [
      {
        id: 'repression-banned-meeting',
        when: { processKinds: ['political_repression'] },
        title: '投票前夜的门房',
        outcomes: [
          {
            id: 'met-in-the-cellar',
            w: 0.55,
            text: '集会许可被驳回了，{subject}把投票挪到酒馆地窖。二十几个人挤在酒桶之间，用火柴照明，{union}的书记把名字写在卷烟纸上。轮到{subject}时，{subject}听见楼上有人敲地板；表决在一分钟内结束，纸被塞进鞋底。',
            significance: 0.82,
            fx: {
              role: 'strike_committee',
              reputation: 0.08,
              health: -0.02,
              flag: 'work13_cellar_strike_vote',
            },
          },
          {
            id: 'meeting-broken-up',
            w: 0.45,
            text: '会还没开始，门房就领着巡警进来，说这间屋子漏了煤气。桌子被掀翻，票纸踩在靴底。{subject}从后窗跳进院子，脚踝扭了一下，回家时鞋里全是碎玻璃。第二天车间里没人提投票，只传{subject}的名字被记在了派出所的本子上。',
            significance: 0.8,
            fx: {
              cash: -2,
              health: -0.06,
              condition: 'sprained_ankle',
              reputation: -0.06,
              flag: 'work13_strike_meeting_broken_up',
            },
          },
        ],
      },
    ],
    task: taskMeta('politics', ['cause', 'belonging', 'work'], ['status', 'belonging'], 0.8, 0.4, [
      'social',
    ]),
  },

  // 17. Strike fund -----------------------------------------------------------
  {
    id: 'r13-work.strike-fund',
    title: '罢工第七天的汤锅',
    domain: 'politics',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 59],
    tags: ['work', 'union', 'strike', 'mutual_aid', 'food'],
    contexts: ['vienna', 'urban', 'industrial', 'factory', 'crisis', 'postwar'],
    milieus: ['union', 'factory', 'print', 'work', 'shop', 'home'],
    roles: {
      union: ['organization', { organizationKind: 'union' }],
      neighbor: ['neighbor', { minAge: 18, maxAge: 80 }],
      grocer: ['worker', { minAge: 25, maxAge: 70 }],
    },
    outcomes: [
      {
        id: 'collected-forty-kroner',
        w: 0.4,
        text: '{subject}拿着锡罐在市场和厂门口转了一天。肉铺老板放了两枚克朗，面包房给了一袋隔夜面包，{neighbor}把准备交房租的钱数出三分之一。天黑时锡罐里有四十多克朗，{subject}把每一笔都写在包装纸上，连半赫勒也没漏。',
        significance: 0.8,
        fx: {
          cash: -2,
          food: 1,
          funds: ['union', 10, 'street collection for the strike fund'],
          relation: ['neighbor', 'friend', 0.1, 0],
          flag: 'work13_strike_fund_collected',
        },
      },
      {
        id: 'soup-kitchen-opened',
        w: 0.35,
        text: '{subject}把工会活动室的长桌拼起来，用两口大锅煮扁豆汤。{grocer}赊了半袋豆子和一筐洋葱，条件是罢工结束后先还他。第一天来了三十七个人，{subject}给每个碗里多舀半勺；汤不够时，就往锅里再添一壶水。',
        significance: 0.76,
        fx: {
          cash: -1,
          food: 2,
          health: 0.02,
          funds: ['union', -8, 'soup kitchen for striking families'],
          relation: ['grocer', 'colleague', 0.08, 0],
          flag: 'work13_strike_soup_kitchen',
        },
      },
      {
        id: 'books-short',
        w: 0.25,
        text: '{subject}晚上对账，发现锡罐里的钱和纸上少了三克朗。管钱的{neighbor}说可能是找零时弄错了，{subject}没有当场翻脸，只把当天的捐款重新抄了一遍。第二天，{neighbor}没有再来帮忙，汤锅前少了一个人。',
        significance: 0.74,
        when: { skill: { name: 'numeracy', min: 0.3 } },
        fx: {
          cash: -3,
          reputation: -0.06,
          relation: ['neighbor', 'acquaintance', -0.05, 0],
          flag: 'work13_strike_fund_books_short',
          knowledge: ['three kroner are missing from the strike fund tin', 0.85],
        },
      },
    ],
    task: taskMeta('politics', ['cause', 'belonging'], ['food', 'belonging'], 0.82, 0.2, [
      'numeracy',
      'social',
    ]),
  },

  // 18. Return to work --------------------------------------------------------
  {
    id: 'r13-work.return-to-work',
    title: '纠察线外的早晨',
    domain: 'work',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 59],
    tags: ['work', 'strike', 'return', 'solidarity', 'wages'],
    contexts: ['vienna', 'urban', 'industrial', 'factory', 'crisis', 'postwar'],
    milieus: ['factory', 'print', 'work', 'union'],
    roles: {
      union: ['organization', { organizationKind: 'union' }],
      mate: ['worker', { minAge: 18, maxAge: 60 }],
      foreman: ['worker', { minAge: 32, maxAge: 68 }],
      factory: ['organization', { organizationKind: 'factory' }],
    },
    outcomes: [
      {
        id: 'crossed-the-line',
        w: 0.35,
        text: '{subject}从煤场后墙翻进厂区，围裙里还揣着昨天的传单。{foreman}在车间门口等着，把工牌塞给{subject}，说从今天起算正常出勤。午休时{mate}从纠察线上看见{subject}，把帽子往下拉了拉；下班路上，没有人跟{subject}同路。',
        significance: 0.84,
        fx: {
          cash: 1,
          employment: ['factory', 'Tagelöhner', 9],
          reputation: -0.12,
          relation: ['mate', 'rival', -0.22, 0],
          flag: 'work13_crossed_the_picket_line',
        },
      },
      {
        id: 'waited-for-terms',
        w: 0.35,
        text: '厂门外的纠察线没有撤，{subject}在街角站了一上午，最后把工具袋放在地上，坐到罢工者那一侧。那天没有工钱，中午吃的是工会的扁豆汤。傍晚{union}的书记说，合同里已经写进了复工不追究的条款，{subject}才站起来拍掉裤子上的灰。',
        significance: 0.74,
        fx: {
          cash: -5,
          mood: -0.08,
          relation: ['mate', 'friend', 0.1, 0],
          flag: 'work13_waited_for_strike_terms',
        },
      },
      {
        id: 'returned-with-contract',
        w: 0.3,
        text: '{subject}作为代表先进了厂，把复工条件一条条念给{foreman}听：先复工的不得报复，欠薪分两周补发。{foreman}听完，让账房把补发名单贴在门口。{subject}走出车间时，纠察线已经撤了，{mate}在人群里朝{subject}点了点头。',
        significance: 0.84,
        when: { hasRole: 'union_delegate' },
        fx: {
          cash: 2,
          employment: ['factory', 'Facharbeiter', 12],
          reputation: 0.08,
          funds: ['union', -2, 'settlement expenses'],
          flag: 'work13_returned_with_union_terms',
        },
      },
    ],
    variants: [
      {
        id: 'postwar-rehiring-list',
        when: { contextTags: ['postwar'] },
        title: '战后复工名单',
        outcomes: [
          {
            id: 'rehired-first',
            w: 0.55,
            text: '厂门口贴出复工名单，{subject}的名字在第三行。{foreman}说先回来的先上工，工钱按战前算。{subject}走进车间，发现自己那台机器已经换了新皮带，工具箱却还在原位，锁眼上落了一层灰。',
            significance: 0.8,
            fx: {
              cash: 1,
              employment: ['factory', 'Facharbeiter', 11],
              flag: 'work13_rehired_from_postwar_list',
            },
          },
          {
            id: 'left-off-the-list',
            w: 0.45,
            text: '{subject}在名单上从头看到尾，没有自己的名字。{foreman}说厂里先收伤残军人和战前的老工人，让{subject}过两个月再来问。{subject}把工具箱从寄存处取回来，铁皮上还贴着战前的工号；回家的路上，{subject}把工号刮掉了。',
            significance: 0.86,
            fx: {
              unemployment: 'left off the postwar rehiring list',
              mood: -0.12,
              flag: 'work13_left_off_postwar_rehiring_list',
            },
          },
        ],
      },
    ],
    task: taskMeta('work', ['work', 'survival', 'belonging'], ['cash', 'food'], 0.85, 0.3, [
      'social',
    ]),
  },

  // 19. Start a small shop ----------------------------------------------------
  {
    id: 'r13-work.open-shop',
    title: '卷帘门上的第一块木牌',
    domain: 'commerce',
    kind: 'task',
    stage: 'adulthood',
    ages: [20, 59],
    tags: ['commerce', 'shop', 'capital', 'licence', 'risk'],
    contexts: ['vienna', 'urban', 'industrial', 'postwar', 'crisis'],
    milieus: ['shop', 'home', 'poverty', 'market'],
    conditions: [{ kind: 'cash', min: 5 }],
    roles: {
      landlord: ['worker', { minAge: 35, maxAge: 75 }],
      shop: ['organization', { organizationKind: 'other' }],
      rival: ['worker', { minAge: 25, maxAge: 65 }],
    },
    outcomes: [
      {
        id: 'opened-the-shutter',
        w: 0.4,
        text: '{subject}把积了灰的卷帘门推上去，用粉笔在木牌上写了自己的姓。{landlord}收下押金，提醒{subject}下个月初交租；{rival}在对街的铺子门口看着，把同样的货摆得更靠外。第一天卖出去三包盐、两把纽扣，{subject}把它们记在账本第一页。',
        significance: 0.86,
        fx: {
          cash: -15,
          role: 'shopkeeper',
          employment: ['shop', 'Kaufmann', 10],
          reputation: 0.05,
          flag: 'work13_opened_a_small_shop',
        },
      },
      {
        id: 'licence-refused',
        w: 0.3,
        text: '{subject}把申请递进执照窗口，{landlord}的房契却少一个签章。办事员把材料推回来，说铺面不能用来做食品生意。押金已经付了，卷帘门开了半天又拉下去；{subject}坐在空铺子里，把货单折成一只小船。',
        significance: 0.74,
        fx: {
          cash: -4,
          mood: -0.1,
          flag: 'work13_shop_licence_refused',
          knowledge: ['the lease lacks a signature needed for a food licence', 0.85],
        },
      },
      {
        id: 'traded-from-the-kitchen',
        w: 0.3,
        text: '{subject}租不起铺面，把临街的窗台改成柜台，货架是拆开的旧衣箱。{landlord}说邻居已经抱怨过两次，{subject}答应每天收摊后把窗台擦干净。第一个月只赚了四克朗，但来买盐和火柴的人开始记得{subject}的名字。',
        significance: 0.8,
        when: { maxCash: 12 },
        fx: {
          cash: -6,
          role: 'shopkeeper',
          employment: ['shop', 'Händler', 6],
          flag: 'work13_traded_from_the_kitchen',
        },
      },
    ],
    variants: [
      {
        id: 'postwar-vacant-shop',
        when: { contextTags: ['postwar'] },
        title: '空出来的铺面',
        outcomes: [
          {
            id: 'took-the-vacant-lease',
            w: 0.55,
            text: '战前那家鞋铺没有撑到战后，货架还钉在墙上。{landlord}把租金压到战前的七成，只要{subject}肯自己修门面。{subject}用旧报纸糊了墙，把“鞋”字改成“杂货”，开张那天，整条街的人都来看新招牌。',
            significance: 0.84,
            fx: {
              cash: -9,
              role: 'shopkeeper',
              employment: ['shop', 'Kaufmann', 9],
              flag: 'work13_took_a_postwar_vacant_shop',
            },
          },
          {
            id: 'lease-dispute',
            w: 0.45,
            text: '{landlord}先答应租，等{subject}把货搬进去，又说得加一笔“门面修缮费”。{subject}把口头约定复述了一遍，{landlord}说没有纸就不算。货堆在走廊里过了一夜，第二天{subject}把最贵的两箱搬回去，剩下的折价卖给了对街的{rival}。',
            significance: 0.78,
            fx: {
              cash: -5,
              relation: ['landlord', 'rival', -0.15, 0],
              flag: 'work13_shop_lease_dispute',
            },
          },
        ],
      },
    ],
    task: taskMeta('commerce', ['work', 'status'], ['cash', 'status'], 0.95, 0.3, [
      'numeracy',
      'social',
    ]),
  },

  // 20. Find a supplier -------------------------------------------------------
  {
    id: 'r13-work.find-supplier',
    title: '后巷仓库的样布',
    domain: 'commerce',
    kind: 'task',
    stage: 'adulthood',
    ages: [20, 59],
    tags: ['commerce', 'supply', 'credit', 'shop', 'negotiation'],
    contexts: ['vienna', 'urban', 'industrial', 'crisis', 'postwar'],
    milieus: ['shop', 'market', 'home'],
    roles: {
      supplier: ['worker', { minAge: 28, maxAge: 70 }],
      rival: ['worker', { minAge: 22, maxAge: 65 }],
    },
    outcomes: [
      {
        id: 'thirty-days-credit',
        w: 0.4,
        text: '{supplier}把样布铺在装土豆的木箱上，先问{subject}一个月能卖几匹。{subject}报了实数，没有夸大，{supplier}反而点头，说头一批货可以三十天后再结。走的时候，{subject}把样布角剪下一小块，回家对着灯比了半宿。',
        significance: 0.74,
        fx: {
          relation: ['supplier', 'colleague', 0.1, 0],
          flag: 'work13_supplier_gave_credit',
          knowledge: ['the supplier extends thirty days of credit to small shops', 0.8, 'supplier'],
        },
      },
      {
        id: 'cash-only',
        w: 0.35,
        text: '{supplier}把样布收回去，说新铺子一律现钱。{subject}把口袋里的钱数了两遍，只够买半匹，剩下的钱还要留着交电费。{supplier}见{subject}数得仔细，让了半步，说可以先拿一匹，下次必须现结。',
        significance: 0.72,
        fx: {
          cash: -8,
          flag: 'work13_bought_supplies_cash_only',
        },
      },
      {
        id: 'short-samples',
        w: 0.25,
        text: '{subject}把样布一寸寸量过，发现每匹比说好的短半尺。{supplier}说这是“缩水”，{subject}把尺子放在柜台上，让他自己看。最后每匹降了两个赫勒，{rival}在旁边看完，回去也把自己的进货单改了。',
        significance: 0.7,
        when: { skill: { name: 'numeracy', min: 0.3 } },
        fx: {
          cash: -2,
          relation: ['supplier', 'rival', -0.1, 0],
          flag: 'work13_caught_short_measure',
          knowledge: ['the supplier’s bolts run half a foot short', 0.85],
        },
      },
    ],
    task: taskMeta('commerce', ['work', 'status'], ['cash'], 0.78, 0.2, ['numeracy', 'social']),
  },

  // 21. Price goods -----------------------------------------------------------
  {
    id: 'r13-work.price-goods',
    title: '粉笔写的价签',
    domain: 'commerce',
    kind: 'task',
    stage: 'adulthood',
    ages: [20, 59],
    tags: ['commerce', 'pricing', 'market', 'competition', 'shop'],
    contexts: ['vienna', 'urban', 'industrial', 'crisis', 'postwar'],
    milieus: ['shop', 'market', 'home'],
    conditions: [{ kind: 'cash', min: 3 }],
    roles: {
      customer: ['neighbor', { minAge: 18, maxAge: 80 }],
      rival: ['worker', { minAge: 22, maxAge: 65 }],
      shop: ['organization', { organizationKind: 'other' }],
    },
    outcomes: [
      {
        id: 'undercut-the-row',
        w: 0.35,
        text: '{subject}把糖和面粉的价签各擦低一赫勒，粉笔字写得比谁都大。{customer}拎着篮子转了一圈，回来把两包糖都放进{subject}的柜台。对街的{rival}看见，把自己的价签也改了；到傍晚，整条街的糖价都落回原处，只有{subject}的秤盘空得最快。',
        significance: 0.78,
        fx: {
          cash: 8,
          relation: ['rival', 'rival', -0.14, 0],
          flag: 'work13_undercut_the_row',
        },
      },
      {
        id: 'priced-too-high',
        w: 0.35,
        text: '{subject}按进货单加了三成，价签写得干干净净，可一整天只卖出一包盐。{customer}拿起一罐果酱看了看，又放回去，说隔两条街便宜两赫勒。天黑前{subject}把价签擦掉重写，粉笔灰落在鞋面上，像一层薄雪。',
        significance: 0.74,
        fx: {
          cash: -2,
          mood: -0.06,
          flag: 'work13_priced_goods_too_high',
          knowledge: ['customers compare prices within two streets', 0.8, 'customer'],
        },
      },
      {
        id: 'costed-on-paper',
        w: 0.3,
        text: '{subject}把进货、运费、损耗和房租摊在一张纸上，算出每包糖至少该卖多少。价签没有落到最低，但每笔生意都留下一点。{rival}笑{subject}不会做生意，{subject}只把那张纸压在柜台玻璃下，月底一算，抽屉里第一次有了余钱。',
        significance: 0.72,
        when: { skill: { name: 'numeracy', min: 0.3 } },
        fx: {
          cash: 3,
          skill: { numeracy: 0.03 },
          reputation: 0.04,
          flag: 'work13_costed_goods_on_paper',
        },
      },
    ],
    variants: [
      {
        id: 'crisis-repricing',
        when: { contextTags: ['crisis'] },
        title: '一天改三次价签',
        outcomes: [
          {
            id: 'repriced-at-noon',
            w: 0.55,
            text: '早上进的糖，中午就涨了价。{subject}把价签擦了又写，写到第三遍时，粉笔只剩一个头。{customer}排队时还在数零钱，轮到柜前才发现又贵了两赫勒；{subject}按早上的价卖给她，账本上那一行用红笔圈了起来。',
            significance: 0.76,
            fx: {
              cash: 4,
              flag: 'work13_repriced_goods_in_crisis',
              knowledge: ['wholesale prices move faster than the chalkboard', 0.8],
            },
          },
          {
            id: 'sold-at-a-loss',
            w: 0.45,
            text: '{subject}怕压货，把面粉按进货价卖了出去，想着回头再补。第二天批发价又涨，补货的钱已经不够。{rival}在门口看着{subject}空掉的货架，什么都没说；{subject}把账本翻到最后一页，发现这个月卖得越多，亏得越多。',
            significance: 0.74,
            fx: {
              cash: -3,
              mood: -0.08,
              flag: 'work13_sold_stock_at_a_loss',
            },
          },
        ],
      },
    ],
    task: taskMeta('commerce', ['work', 'status'], ['cash'], 0.72, 0.15, ['numeracy']),
  },

  // 22. Advertise -------------------------------------------------------------
  {
    id: 'r13-work.advertise',
    title: '橱窗里的手写海报',
    domain: 'commerce',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 59],
    tags: ['commerce', 'advertising', 'shop', 'competition', 'literacy'],
    contexts: ['vienna', 'urban', 'industrial', 'crisis', 'postwar'],
    milieus: ['shop', 'market', 'home'],
    conditions: [{ kind: 'cash', min: 3 }],
    roles: {
      printer: ['worker', { minAge: 22, maxAge: 70 }],
      rival: ['worker', { minAge: 22, maxAge: 65 }],
      shop: ['organization', { organizationKind: 'other' }],
    },
    outcomes: [
      {
        id: 'poster-brought-customers',
        w: 0.4,
        text: '{printer}用红色油墨印了三十张海报，{subject}把它们贴在面包房、澡堂和电车站的柱子上。海报上写着“新到咖啡，一磅九赫勒”，字歪了一点，价格却看得清。第三天，三个从没进过店的客人拿着海报来问，{subject}把海报上的价又让了半赫勒。',
        significance: 0.74,
        fx: {
          cash: 5,
          reputation: 0.05,
          relation: ['printer', 'colleague', 0.06, 0],
          flag: 'work13_poster_brought_customers',
        },
      },
      {
        id: 'painted-over',
        w: 0.3,
        text: '{subject}一早去贴海报，发现墙上已经被{rival}的招贴盖住了，糨糊还是湿的。{subject}把湿纸揭下来，底下露出自己那张的一角。两人在墙边站了一会儿，{rival}说这条街只容得下一家做广告的；{subject}把剩下的海报抱回去，改贴在自家橱窗里。',
        significance: 0.72,
        fx: {
          cash: -1,
          relation: ['rival', 'rival', -0.16, 0],
          flag: 'work13_advertising_poster_covered',
        },
      },
      {
        id: 'newspaper-ad',
        w: 0.3,
        text: '{subject}去报社问价，一行字要六个克朗，抵得上半天的流水。{subject}只买了最小的版面，把店名和“赊账可谈”四个字登上去。报纸出来那天，{subject}自己买了三份，一份贴在橱窗，一份寄给乡下的亲戚，一份压在账本里。',
        significance: 0.74,
        when: { skill: { name: 'literacy', min: 0.35 } },
        fx: {
          cash: -6,
          reputation: 0.06,
          flag: 'work13_placed_a_newspaper_ad',
          knowledge: ['a small newspaper notice costs six kroner', 0.8],
        },
      },
    ],
    task: taskMeta('commerce', ['work', 'status'], ['cash', 'status'], 0.7, 0.15, [
      'literacy',
      'social',
    ]),
  },

  // 23. Keep accounts ---------------------------------------------------------
  {
    id: 'r13-work.keep-accounts',
    title: '两本账之间的那根线',
    domain: 'commerce',
    kind: 'task',
    stage: 'adulthood',
    ages: [20, 59],
    tags: ['commerce', 'accounts', 'shop', 'institution', 'trust'],
    contexts: ['vienna', 'urban', 'industrial', 'reform', 'crisis'],
    milieus: ['shop', 'market', 'official'],
    conditions: [{ kind: 'cash', min: 5 }],
    roles: {
      clerk: ['worker', { minAge: 20, maxAge: 65 }],
      official: ['official', { minAge: 25, maxAge: 70 }],
      shop: ['organization', { organizationKind: 'other' }],
    },
    outcomes: [
      {
        id: 'books-balanced',
        w: 0.4,
        text: '{subject}把一月的进货、赊账和现钱摊在柜台上，{clerk}念一笔，{subject}在账本上勾一笔。到最后一页，两边的数目对上了，只差半赫勒的零头。{subject}把那半赫勒画成一个小圈，写上“煤”，两个人都笑了；这是这个月第一次对账不用重来。',
        significance: 0.74,
        fx: {
          cash: 2,
          skill: { numeracy: 0.04 },
          reputation: 0.04,
          relation: ['clerk', 'colleague', 0.06, 0],
          flag: 'work13_books_balanced',
        },
      },
      {
        id: 'twelve-kroner-gap',
        w: 0.35,
        text: '{subject}对了三遍，账上还是少十二克朗。{clerk}说可能是赊账那页漏记了，{subject}却在那页背面看见一笔被擦掉的字。两人没有吵，只把当天的抽屉倒在桌上，一枚一枚数。数到最后，{clerk}把围裙解下来，说这活自己干不了。',
        significance: 0.76,
        fx: {
          cash: -3,
          relation: ['clerk', 'rival', -0.12, 0],
          flag: 'work13_accounts_twelve_kroner_short',
          knowledge: ['an entry was erased from the credit page', 0.8],
        },
      },
      {
        id: 'one-book-only',
        w: 0.25,
        text: '{subject}只记一本流水，赊账写在烟盒背面，月底再把烟盒抄进账本。这次抄到一半，{official}来店里问上个月的营业额，{subject}翻遍柜台也找不到那张烟盒。{official}把现有账本合上，说下个月带正式单据来。',
        significance: 0.72,
        when: { skill: { name: 'numeracy', max: 0.3 } },
        fx: {
          condition: 'tax_exposure',
          mood: -0.06,
          flag: 'work13_kept_only_one_ledger',
        },
      },
    ],
    variants: [
      {
        id: 'reform-tax-inspection',
        when: { legacyKinds: ['reform'] },
        title: '税务所要看第二本',
        outcomes: [
          {
            id: 'clean-book-accepted',
            w: 0.55,
            text: '税务所的新规要求每笔赊账都贴印花。{subject}把账本、进货单和收据按月份扎成三捆，{official}翻了一个下午，只挑出两张没写日期的。罚了半个克朗，账本被盖上蓝章；{subject}把章印吹干，夹回账本第一页。',
            significance: 0.76,
            fx: {
              cash: -2,
              reputation: 0.04,
              flag: 'work13_tax_inspection_passed',
            },
          },
          {
            id: 'hidden-ledger-found',
            w: 0.45,
            text: '{official}翻开柜台下的暗格，抽出那本记着赊账和“人情价”的旧账。{subject}说是废纸，{official}却翻到有签名的那页。补税的单子当场开出来，{clerk}站在门口，把围裙带子绕在手指上，一圈又一圈。',
            significance: 0.8,
            fx: {
              cash: -6,
              relation: ['clerk', 'rival', -0.08, 0],
              flag: 'work13_hidden_ledger_found',
              knowledge: ['the second ledger lists credit sales that were never taxed', 0.9],
            },
          },
        ],
      },
    ],
    task: taskMeta('commerce', ['work', 'status'], ['cash', 'status'], 0.72, 0.2, ['numeracy']),
  },

  // 24. Apply for a loan ------------------------------------------------------
  {
    id: 'r13-work.apply-loan',
    title: '银行柜台前的担保人',
    domain: 'commerce',
    kind: 'task',
    stage: 'adulthood',
    ages: [20, 59],
    tags: ['commerce', 'credit', 'bank', 'guarantor', 'capital'],
    contexts: ['vienna', 'urban', 'industrial', 'reform', 'crisis'],
    milieus: ['shop', 'official', 'home', 'market'],
    conditions: [{ kind: 'cash', min: 3 }],
    roles: {
      banker: ['official', { minAge: 30, maxAge: 70 }],
      guarantor: ['neighbor', { minAge: 25, maxAge: 75 }],
      shop: ['organization', { organizationKind: 'other' }],
    },
    outcomes: [
      {
        id: 'loan-granted',
        w: 0.35,
        text: '{banker}把申请单看了两遍，问{subject}拿什么抵押。{guarantor}把自己的房契复印件放在柜台上，说这条街上的铺子不能倒。{banker}让两人分别按了指印，批了八十克朗，分十二个月还。出门时{subject}把钞票缝进内袋，针脚走得很密。',
        significance: 0.86,
        fx: {
          cash: 25,
          relation: ['guarantor', 'friend', 0.08, 0],
          flag: 'work13_obtained_a_bank_loan',
          knowledge: ['the loan is repayable over twelve months at five percent', 0.85, 'banker'],
        },
      },
      {
        id: 'refused-no-guarantor',
        w: 0.4,
        text: '{banker}问了三遍担保人是谁，{subject}答不出来。{guarantor}在门外听见，转身走了。{banker}把申请单推回来，说没有房契或公职担保，银行不做这种生意。{subject}把单子折好，走出银行时，台阶上的雪被人踩成了黑泥。',
        significance: 0.72,
        fx: {
          cash: -1,
          mood: -0.1,
          flag: 'work13_loan_refused_no_guarantor',
        },
      },
      {
        id: 'smaller-coop-loan',
        w: 0.25,
        text: '{banker}不肯批全额，却提起街角的储蓄合作社。{subject}当天下午去问，合作社只要两个社员作保，批了四十克朗，利息按周算。钱少了一半，但不用押房契；{subject}把两张钞票摊在柜台上，先买了一台旧秤。',
        significance: 0.78,
        when: { skill: { name: 'social', min: 0.3 } },
        fx: {
          cash: 12,
          relation: ['banker', 'colleague', 0.06, 0],
          flag: 'work13_took_a_small_cooperative_loan',
        },
      },
    ],
    task: taskMeta('commerce', ['work', 'status'], ['cash'], 0.85, 0.35, ['numeracy', 'social']),
  },

  // 25. Repay debt ------------------------------------------------------------
  {
    id: 'r13-work.repay-debt',
    title: '还款簿上的红格子',
    domain: 'commerce',
    kind: 'task',
    stage: 'adulthood',
    ages: [20, 59],
    tags: ['commerce', 'debt', 'credit', 'obligation', 'household'],
    contexts: ['vienna', 'urban', 'industrial', 'crisis', 'postwar'],
    milieus: ['shop', 'home', 'market'],
    roles: {
      creditor: ['worker', { minAge: 30, maxAge: 75 }],
      guarantor: ['neighbor', { minAge: 25, maxAge: 75 }],
    },
    outcomes: [
      {
        id: 'paid-in-full',
        w: 0.35,
        text: '{subject}把二十克朗一张张码在桌上，{creditor}数完，在还款簿的最后一格画了红勾。{guarantor}在旁边看着，直到{creditor}把借据撕成两半才坐下。出门时{subject}的口袋空了，但走路的声音比来时轻；那本还款簿被{creditor}收进抽屉，压在别的借据下面。',
        significance: 0.78,
        fx: {
          cash: -20,
          relation: ['creditor', 'colleague', 0.1, 0],
          relation2: ['guarantor', 'friend', 0.08, 0],
          flag: 'work13_repaid_debt_in_full',
        },
      },
      {
        id: 'asked-extension',
        w: 0.35,
        text: '{subject}只凑出五克朗，剩下的请求宽限到月底。{creditor}把五克朗收下，在还款簿上添了一行小字：逾期按周加息。{guarantor}没有说话，只把日期记在自己的烟盒上。回家的路上，{subject}算了一遍利息，发现月底要还的比今天更多。',
        significance: 0.7,
        fx: {
          cash: -5,
          relation: ['creditor', 'acquaintance', 0.04, 0],
          flag: 'work13_debt_extension_granted',
          knowledge: ['the creditor charges weekly interest on late payments', 0.85],
        },
      },
      {
        id: 'pledge-seized',
        w: 0.3,
        text: '还款日过了三天，{creditor}带着{guarantor}上门，把{subject}的缝纫机抬走了。{subject}说再给一周，{creditor}指着还款簿上的红格子说，规矩就是规矩。缝纫机被抬下楼时，踏板在墙上磕掉一块灰；{guarantor}站在门口，始终没有抬头。',
        significance: 0.78,
        when: { maxCash: 6 },
        fx: {
          cash: -8,
          condition: 'sewing_machine_seized',
          relation: ['guarantor', 'rival', -0.1, 0],
          flag: 'work13_debt_pledge_seized',
        },
      },
    ],
    task: taskMeta('commerce', ['family', 'status'], ['cash'], 0.8, 0.25, ['numeracy']),
  },

  // 26. Hire an assistant -----------------------------------------------------
  {
    id: 'r13-work.hire-assistant',
    title: '柜台后面多一个人',
    domain: 'commerce',
    kind: 'task',
    stage: 'adulthood',
    ages: [22, 59],
    tags: ['commerce', 'shop', 'hiring', 'labour', 'trust'],
    contexts: ['vienna', 'urban', 'industrial', 'postwar', 'crisis'],
    milieus: ['home', 'shop'],
    conditions: [{ kind: 'hasRole', role: 'shopkeeper' }],
    roles: {
      assistant: ['worker', { minAge: 16, maxAge: 55 }],
      shop: ['organization', { organizationKind: 'other' }],
    },
    outcomes: [
      {
        id: 'hired-assistant',
        w: 0.45,
        text: '{assistant}在门口站了半个钟头，才开口问要不要人。{subject}让{assistant}把一筐土豆按大小分开，又让{assistant}算一遍找零。算盘打错了两次，第三次却一分不差。{subject}从抽屉里摸出一把备用钥匙，说工钱先按六克朗，管一顿午饭。',
        significance: 0.8,
        fx: {
          cash: -2,
          relation: ['assistant', 'colleague', 0.08, 0],
          skill: { social: 0.02 },
          flag: 'work13_hired_a_shop_assistant',
          raw: [
            {
              type: 'employment',
              personId: '$assistant',
              organizationId: '$shop',
              occupation: 'Ladenhilfe',
              wage: 6,
              workplaceId: '@workplace',
              reason: 'hired behind the shop counter',
            },
          ],
        },
      },
      {
        id: 'could-not-afford',
        w: 0.3,
        text: '{subject}把工钱和房租算了两遍，柜台后面实在站不下第二个人。{assistant}听完，把袖子放下来，说可以去别家问问。{subject}送{assistant}到门口，把当天卖剩的一小袋豆子塞过去；回到柜台，{subject}自己把两筐货搬进了里屋。',
        significance: 0.66,
        fx: {
          cash: 1,
          mood: -0.06,
          flag: 'work13_could_not_afford_assistant',
        },
      },
      {
        id: 'hired-a-relative',
        w: 0.25,
        text: '{subject}本想在门口贴招工纸，{assistant}的母亲先一步托人来说情。{assistant}是自己人，工钱可以少给，饭桌上多一双筷子。第一个月相安无事，第二个月{assistant}开始把柜台当自家的，{subject}想开口，又想起那层亲戚关系。',
        significance: 0.72,
        when: { minCash: 15 },
        fx: {
          cash: -3,
          relation: ['assistant', 'friend', 0.1, 0],
          flag: 'work13_hired_a_relative',
          knowledge: ['a relative behind the counter blurs the wage bargain', 0.75],
          raw: [
            {
              type: 'employment',
              personId: '$assistant',
              organizationId: '$shop',
              occupation: 'Ladenhilfe',
              wage: 4,
              workplaceId: '@workplace',
              reason: 'a relative taken on at the shop',
            },
          ],
        },
      },
    ],
    task: taskMeta('commerce', ['work', 'belonging'], ['cash', 'status'], 0.7, 0.2, [
      'social',
      'numeracy',
    ]),
  },

  // 27. Dismiss an assistant --------------------------------------------------
  {
    id: 'r13-work.dismiss-assistant',
    title: '围裙挂在钉子上',
    domain: 'commerce',
    kind: 'task',
    stage: 'adulthood',
    ages: [22, 59],
    tags: ['commerce', 'shop', 'dismissal', 'conflict', 'labour'],
    contexts: ['vienna', 'urban', 'industrial', 'crisis', 'postwar'],
    milieus: ['home', 'shop'],
    conditions: [{ kind: 'hasRole', role: 'shopkeeper' }],
    roles: {
      assistant: ['worker', { minAge: 16, maxAge: 55 }],
      shop: ['organization', { organizationKind: 'other' }],
    },
    outcomes: [
      {
        id: 'dismissed-for-theft',
        w: 0.4,
        text: '{subject}在秤盘底下找到三枚硬币，正是当天少掉的找零。{assistant}说是客人掉的，{subject}让{assistant}把围裙解下来。工钱算到当天，钥匙收回；{assistant}走到门口，把围裙挂在钉子上，钉子歪了一下，墙皮落在柜台边。',
        significance: 0.8,
        fx: {
          reputation: 0.04,
          relation: ['assistant', 'rival', -0.2, 0],
          flag: 'work13_dismissed_assistant_for_theft',
          knowledge: ['the assistant was skimming the till', 0.85],
          raw: [
            {
              type: 'unemployment',
              personId: '$assistant',
              reason: 'dismissed from the shop for taking money from the till',
            },
          ],
        },
      },
      {
        id: 'kept-on-half-wages',
        w: 0.35,
        text: '生意淡了，{subject}把{assistant}叫到里屋，说工钱只能给一半，活却一样多。{assistant}低头想了一会儿，问午饭还管不管。{subject}说管。第二天{assistant}照常来开门，只是不再主动擦柜台；两个人一整天说的话，比账本上的字还少。',
        significance: 0.74,
        fx: {
          cash: 2,
          relation: ['assistant', 'acquaintance', 0.02, 0],
          flag: 'work13_assistant_half_wages',
          raw: [
            {
              type: 'employment',
              personId: '$assistant',
              organizationId: '$shop',
              occupation: 'Ladenhilfe',
              wage: 3,
              workplaceId: '@workplace',
              reason: 'kept on at half wages during a slow season',
            },
          ],
        },
      },
      {
        id: 'assistant-quit-first',
        w: 0.25,
        text: '{subject}还没开口，{assistant}先把围裙叠好放在柜台上，说对街的铺子多给两克朗。{subject}想说点什么，最后只问什么时候走。{assistant}说今天。门铃响了一声，柜台后面空出来一块地方，地板上的脚印过了很久才扫掉。',
        significance: 0.66,
        when: { skill: { name: 'social', max: 0.35 } },
        fx: {
          cash: -1,
          mood: -0.08,
          flag: 'work13_assistant_quit_first',
        },
      },
    ],
    task: taskMeta('commerce', ['work', 'status'], ['cash', 'status'], 0.68, 0.3, ['social']),
  },

  // 28. Buy a second-hand machine --------------------------------------------
  {
    id: 'r13-work.buy-secondhand-machine',
    title: '雨棚下的二手织机',
    domain: 'craft',
    kind: 'task',
    stage: 'adulthood',
    ages: [20, 59],
    tags: ['craft', 'machine', 'purchase', 'risk', 'workshop'],
    contexts: ['vienna', 'urban', 'industrial', 'crisis', 'postwar'],
    milieus: ['factory', 'print', 'work', 'craft', 'shop'],
    conditions: [{ kind: 'cash', min: 8 }],
    roles: {
      dealer: ['worker', { minAge: 30, maxAge: 70 }],
      mechanic: ['worker', { minAge: 28, maxAge: 70 }],
      workshop: ['organization', { organizationKind: 'household_firm' }],
    },
    outcomes: [
      {
        id: 'bought-and-it-runs',
        w: 0.4,
        text: '{dealer}在雨棚下摇了两圈手轮，织机的声音有点涩，却没有异响。{subject}蹲下去看齿轮，牙口还完整，只是缺一只梭子。价钱从二十五压到十八，{subject}用板车把机器拉回作坊，路上轮子碾过水洼，织机蒙着的油布湿了一半。',
        significance: 0.8,
        fx: {
          cash: -18,
          skill: { craft: 0.03 },
          reputation: 0.04,
          flag: 'work13_bought_secondhand_loom',
        },
      },
      {
        id: 'bought-a-wreck',
        w: 0.35,
        text: '织机拉回来第二天，主轴就卡死了。{mechanic}拆开一看，轴承里塞着铁屑，齿轮是用旧料拼的。{dealer}不认账，说卖的时候转得好好的。{subject}把修理费记在账本最后一页，那台机器在墙角停了半个月，油布上积了一层灰。',
        significance: 0.82,
        fx: {
          cash: -15,
          condition: 'broken_machine_debt',
          relation: ['dealer', 'rival', -0.18, 0],
          flag: 'work13_bought_a_wreck',
          knowledge: ['the dealer sold a loom with a shimmed bearing', 0.85],
        },
      },
      {
        id: 'paid-mechanic-to-look',
        w: 0.25,
        text: '{subject}没有当场付钱，先请{mechanic}带着听针和油壶去看。{mechanic}把机器转了半圈，又摸了摸机架，说轴承要换，别的还值这个价。{subject}拿这话去压价，{dealer}骂了一句，还是让了两个克朗；修理费加上去，正好抵掉让掉的钱。',
        significance: 0.74,
        when: { skill: { name: 'numeracy', min: 0.3 } },
        fx: {
          cash: -20,
          skill: { craft: 0.02 },
          flag: 'work13_had_machine_inspected',
          knowledge: ['the loom needs a new bearing but is otherwise sound', 0.85, 'mechanic'],
        },
      },
    ],
    variants: [
      {
        id: 'printroom-secondhand',
        when: { milieuTags: ['print'] },
        title: '油布下的旧印刷机',
        outcomes: [
          {
            id: 'bought-the-old-press',
            w: 0.55,
            text: '印刷机停在一间倒闭的报社后屋里，滚筒上还缠着去年的纸。{dealer}踩了两下踏板，机器转得慢，却没有卡。{subject}把每个墨辊都摸了一遍，最后用二十克朗买下，又花了两天把机器拆开、擦净、重新上油。',
            significance: 0.8,
            fx: {
              cash: -20,
              skill: { craft: 0.03 },
              flag: 'work13_bought_secondhand_press',
            },
          },
          {
            id: 'press-missing-parts',
            w: 0.45,
            text: '{subject}把印刷机拉回来才发现，叼纸牙少了两排，墨斗的轴也弯了。{dealer}说零件早被人拆走卖了。{subject}在旧货摊上找了半个月，配上的牙口不齐，印出来的纸边总是毛的。那台机器能转，但每印一百张就要停一次。',
            significance: 0.78,
            fx: {
              cash: -12,
              condition: 'press_needs_repairs',
              flag: 'work13_press_missing_parts',
              knowledge: ['the secondhand press is missing its gripper rows', 0.85],
            },
          },
        ],
      },
    ],
    task: taskMeta('craft', ['work', 'status'], ['cash', 'status'], 0.76, 0.35, [
      'craft',
      'numeracy',
    ]),
  },

  // 29. Repair a machine ------------------------------------------------------
  {
    id: 'r13-work.repair-machine',
    title: '蒸汽阀没有放尽',
    domain: 'craft',
    kind: 'task',
    stage: 'adulthood',
    ages: [20, 59],
    tags: ['craft', 'repair', 'steam', 'danger', 'workshop'],
    contexts: ['vienna', 'urban', 'industrial', 'factory', 'war', 'crisis'],
    milieus: ['factory', 'print', 'work', 'craft'],
    conditions: [{ kind: 'employment', employed: true }],
    roles: {
      foreman: ['worker', { minAge: 32, maxAge: 68 }],
      mate: ['worker', { minAge: 18, maxAge: 60 }],
      workshop: ['organization', { organizationKind: 'factory' }],
    },
    outcomes: [
      {
        id: 'fixed-the-valve',
        w: 0.45,
        text: '{subject}等到压力表落回零，才松开阀盖的六颗螺栓。垫圈已经硬了，{subject}从废料箱里剪了一块石棉板，照着旧垫圈描线、钻孔。装回去以后，阀门不再渗汽；{foreman}用手背试了试温度，让{subject}把剩下的垫圈也换掉。',
        significance: 0.76,
        fx: {
          cash: 6,
          skill: { craft: 0.05 },
          relation: ['foreman', 'colleague', 0.1, 0],
          flag: 'work13_repaired_steam_valve',
        },
      },
      {
        id: 'scalded',
        w: 0.3,
        text: '{subject}以为管道已经凉了，扳手一用力，阀盖就弹开。蒸汽从缝里喷出来，{subject}的手臂和脸侧立刻起了水泡。{mate}把{subject}拖到水龙头下，{foreman}去叫救护车；车间里弥漫着一股铁锈和烫肉混在一起的味道。',
        significance: 0.88,
        fx: {
          cash: -4,
          health: -0.3,
          condition: 'scalding_burns',
          relation: ['mate', 'friend', 0.06, 0],
          flag: 'work13_scalded_by_steam_valve',
        },
      },
      {
        id: 'waited-for-the-fitter',
        w: 0.2,
        text: '{subject}看了半天，没敢动那颗锈死的螺栓，转身去请厂外的老修理工。老人来了一看，说再晚半天，阀杆就要卡死。{subject}在旁边递扳手，记住了先泄压、再松螺栓的顺序；修完以后，{foreman}把工钱扣了四克朗，说这活本来该厂里人干。',
        significance: 0.7,
        when: { skill: { name: 'craft', max: 0.3 } },
        fx: {
          cash: -4,
          skill: { craft: 0.02 },
          flag: 'work13_called_a_fitter',
          knowledge: ['a steam valve must be vented before the bonnet is opened', 0.9],
        },
      },
      {
        id: 'killed-by-the-valve-cap',
        w: 0.05,
        text: '{subject}没有等压力表回到零，就拧开了阀盖。蒸汽把铁盖顶起来，正打在胸口；{foreman}冲进来时，压力表还在往上走。人们把{subject}抬到院子里，雪地上留下一道长长的水痕，急救箱送到时，人已经没有气了。',
        significance: 0.95,
        fx: {
          death: {
            cause: 'an unvented steam valve cap struck the chest',
            reason: 'opened the valve before the pressure had dropped',
          },
        },
      },
    ],
    task: taskMeta('craft', ['work', 'survival'], ['cash', 'health'], 0.7, 0.55, ['craft']),
  },

  // 30. Take on a contract ----------------------------------------------------
  {
    id: 'r13-work.take-contract',
    title: '合同背面的交货期',
    domain: 'commerce',
    kind: 'task',
    stage: 'adulthood',
    ages: [22, 59],
    tags: ['commerce', 'contract', 'workshop', 'delivery', 'risk'],
    contexts: ['vienna', 'urban', 'industrial', 'factory', 'war', 'crisis'],
    milieus: ['shop', 'work', 'factory', 'craft'],
    roles: {
      merchant: ['worker', { minAge: 30, maxAge: 70 }],
      rival: ['worker', { minAge: 25, maxAge: 65 }],
      workshop: ['organization', { organizationKind: 'household_firm' }],
    },
    outcomes: [
      {
        id: 'signed-and-delivered',
        w: 0.35,
        text: '{merchant}把合同摊在柜台上，交货期写在背面，字比正面还小。{subject}算了一遍工时，把日期往后挪了三天，{merchant}想了想，签了。接下来的半个月，作坊的灯亮到半夜；交货那天，{merchant}验完货，把尾款数在桌上，多给了两克朗，说是赶工的茶钱。',
        significance: 0.8,
        fx: {
          cash: 20,
          reputation: 0.08,
          relation: ['merchant', 'colleague', 0.08, 0],
          flag: 'work13_completed_a_contract',
        },
      },
      {
        id: 'penalty-for-late-delivery',
        w: 0.35,
        text: '最后一批货晚了两天，{merchant}按合同扣掉一成，又把次品挑出来摆在门口。{subject}想争，{merchant}指着背面那行小字让{subject}自己念。尾款比算好的少了十二克朗，{rival}站在对面，把这一切看在眼里，第二天就来问{subject}的工人要不要跳槽。',
        significance: 0.8,
        fx: {
          cash: -12,
          relation: ['merchant', 'rival', -0.12, 0],
          relation2: ['rival', 'rival', -0.06, 0],
          flag: 'work13_paid_late_delivery_penalty',
        },
      },
      {
        id: 'refused-the-terms',
        w: 0.3,
        text: '{subject}把合同翻过来，指着交货期和罚则，说这个价只够做一半的活。{merchant}说别家抢着接，{subject}把合同推回去，只留下定金。走出门时，{rival}正往里走，两人擦肩而过；{subject}知道这单生意没了，但作坊不用为一个赔本的日期熬夜。',
        significance: 0.72,
        when: { skill: { name: 'numeracy', min: 0.3 } },
        fx: {
          cash: 2,
          relation: ['merchant', 'colleague', 0.05, 0],
          flag: 'work13_refused_a_bad_contract',
          knowledge: ['the contract’s penalty clause exceeds the profit margin', 0.85],
        },
      },
    ],
    variants: [
      {
        id: 'war-supply-contract',
        when: { contextTags: ['war'] },
        title: '军需处的订单',
        outcomes: [
          {
            id: 'took-the-army-order',
            w: 0.55,
            text: '军需处的订单用红纸印着，数量是平时的三倍，交货期只给十天。{subject}把作坊里所有能用的机器都开起来，又临时雇了三个女工。第十天清晨，最后一箱货装上卡车；军官在收据上盖了章，钱要等到下个月才拨。',
            significance: 0.82,
            fx: {
              cash: 22,
              reputation: 0.08,
              flag: 'work13_took_a_war_supply_contract',
            },
          },
          {
            id: 'fixed-price-squeeze',
            w: 0.45,
            text: '军需处把单价定死，原料却一天一个价。{subject}做到第七天，发现每做一件要倒贴半克朗。想停，合同上写着“战时拒单按逃役论”；只能把自家存的面粉钱垫进去。交货那天，{subject}在收据上按了指印，手指半天没伸直。',
            significance: 0.82,
            fx: {
              cash: 8,
              mood: -0.08,
              condition: 'war_contract_debt',
              flag: 'work13_squeezed_by_fixed_price_order',
            },
          },
        ],
      },
    ],
    task: taskMeta('commerce', ['work', 'status'], ['cash', 'status'], 0.8, 0.35, [
      'numeracy',
      'craft',
    ]),
  },

  // 31. Subcontract -----------------------------------------------------------
  {
    id: 'r13-work.subcontract',
    title: '转包给后街的作坊',
    domain: 'commerce',
    kind: 'task',
    stage: 'adulthood',
    ages: [22, 59],
    tags: ['commerce', 'subcontract', 'workshop', 'quality', 'trust'],
    contexts: ['vienna', 'urban', 'industrial', 'factory', 'crisis'],
    milieus: ['work', 'factory', 'craft', 'shop'],
    roles: {
      subcontractor: ['worker', { minAge: 25, maxAge: 70 }],
      mate: ['worker', { minAge: 18, maxAge: 60 }],
      workshop: ['organization', { organizationKind: 'household_firm' }],
    },
    outcomes: [
      {
        id: 'subcontract-held',
        w: 0.4,
        text: '{subject}把一捆半成品推到板车上，亲自送到后街的作坊。{subcontractor}翻看了一遍，说锁边太粗，得再修。{subject}没有争，留下两克朗的定钱和一张写明尺寸的纸。三天后货送回来，针脚比{subject}自己做的还密，只是边角料被扣下了。',
        significance: 0.76,
        fx: {
          cash: 8,
          relation: ['subcontractor', 'colleague', 0.08, 0],
          flag: 'work13_subcontracted_work',
        },
      },
      {
        id: 'quality-rejected',
        w: 0.35,
        text: '货送回来时，{subject}一眼就看出袖口歪了。拆开一看，里面的衬布是旧料，洗过两次就会缩。{subcontractor}说价钱只够这个做法，{subject}把整批货退回去，赔了主顾六克朗。{mate}连夜拆线，拆到手指起泡，废布料装了满满一筐。',
        significance: 0.78,
        fx: {
          cash: -6,
          relation: ['subcontractor', 'rival', -0.14, 0],
          reputation: -0.05,
          flag: 'work13_subcontract_rejected',
        },
      },
      {
        id: 'taught-the-jig',
        w: 0.25,
        text: '{subject}没有只交货，而是在后街作坊待了一下午，用一块木板做了个定位夹具，教{subcontractor}怎么一次对准袖口。{subcontractor}试了三件，速度快了一半。下一批货的价钱没有涨，但送回来的次品少了；{subject}把夹具留在那里，说算借的。',
        significance: 0.72,
        when: { skill: { name: 'craft', min: 0.4 } },
        fx: {
          skill: { craft: 0.02 },
          relation: ['subcontractor', 'friend', 0.1, 0],
          flag: 'work13_taught_subcontractor_a_jig',
          knowledge: ['the back-street workshop can meet quality with a jig', 0.8],
        },
      },
    ],
    task: taskMeta('commerce', ['work', 'status'], ['cash', 'status'], 0.72, 0.2, [
      'craft',
      'social',
    ]),
  },

  // 32. Deliver goods ---------------------------------------------------------
  {
    id: 'r13-work.deliver-goods',
    title: '板车上的十二箱',
    domain: 'commerce',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 59],
    tags: ['commerce', 'delivery', 'transport', 'weather', 'bribe'],
    contexts: ['vienna', 'urban', 'industrial', 'war', 'crisis'],
    milieus: ['shop', 'market', 'home'],
    roles: {
      carter: ['worker', { minAge: 20, maxAge: 65 }],
      guard: ['official', { minAge: 25, maxAge: 65 }],
      shop: ['organization', { organizationKind: 'other' }],
    },
    outcomes: [
      {
        id: 'delivered-on-time',
        w: 0.4,
        text: '{subject}把十二只木箱码在板车上，用麻绳捆了两道，轮子碾过石子路时，箱角互相磕着响。走到第三道街口，车轴响了一声，{carter}蹲下去紧了紧销子。货送到时比约定早半个钟头，店主验完封条，在送货单上画了押。',
        significance: 0.72,
        fx: {
          cash: 6,
          relation: ['carter', 'colleague', 0.08, 0],
          flag: 'work13_delivered_goods_on_time',
        },
      },
      {
        id: 'rain-ruined-two-boxes',
        w: 0.35,
        text: '半路下起雨，{subject}把油布往箱子上盖，风却把一角掀开。送到时，最上面两只纸箱已经软了，里面的货染了水汽。店主把湿箱挑出来，从货款里扣了五克朗。{carter}说这条街的排水沟一堵，雨就专往板车上灌。',
        significance: 0.74,
        fx: {
          cash: -5,
          condition: 'wet_stock',
          relation: ['carter', 'rival', -0.06, 0],
          flag: 'work13_delivery_ruined_by_rain',
        },
      },
      {
        id: 'bribed-the-guard',
        w: 0.25,
        text: '{guard}在路口设了检查，说板车不许走这条街。{subject}把三枚硬币压在送货单下面递过去，{guard}用指头弹了弹，说下次早点来。车推过去以后，{subject}回头看了一眼，{guard}正在把硬币收进手套里，动作很熟。',
        significance: 0.72,
        when: { maxCash: 8 },
        fx: {
          cash: -3,
          relation: ['guard', 'acquaintance', 0.04, 0],
          flag: 'work13_bribed_a_route_guard',
          knowledge: ['the route guard takes a small payment to let carts through', 0.8],
        },
      },
    ],
    task: taskMeta('commerce', ['work', 'survival'], ['cash', 'food'], 0.75, 0.2, ['social']),
  },

  // 33. Collect a debt --------------------------------------------------------
  {
    id: 'r13-work.collect-debt',
    title: '门口的三次敲门',
    domain: 'commerce',
    kind: 'task',
    stage: 'adulthood',
    ages: [20, 59],
    tags: ['commerce', 'debt', 'collection', 'neighbor', 'conflict'],
    contexts: ['vienna', 'urban', 'industrial', 'crisis', 'postwar'],
    milieus: ['shop', 'home', 'poverty', 'market'],
    roles: {
      debtor: ['neighbor', { minAge: 20, maxAge: 75 }],
      mate: ['worker', { minAge: 18, maxAge: 65 }],
    },
    outcomes: [
      {
        id: 'debt-paid',
        w: 0.35,
        text: '{subject}第三次敲门时，{debtor}才把门开了一条缝。屋里桌上摆着半块面包和一张当票。{subject}没有进门，只把欠条摊在门框上。{debtor}回屋翻了一阵，数出十克朗，硬币还带着体温；{subject}在欠条背面写了“清”，把纸撕成两半。',
        significance: 0.74,
        fx: {
          cash: 10,
          relation: ['debtor', 'rival', -0.1, 0],
          flag: 'work13_collected_a_debt',
        },
      },
      {
        id: 'took-goods-instead',
        w: 0.35,
        text: '{debtor}说没有现钱，指了指墙角的缝纫机。{subject}和{mate}把机器抬上板车，{debtor}的妻子站在楼梯口，手里还攥着没做完的活。机器折了四克朗，剩下的六克朗算清；下楼时{subject}听见门在背后关上，插销落得很重。',
        significance: 0.76,
        fx: {
          cash: 4,
          food: 2,
          relation: ['debtor', 'rival', -0.18, 0],
          flag: 'work13_took_goods_for_debt',
        },
      },
      {
        id: 'wrote-it-off',
        w: 0.3,
        text: '{subject}在门口站了一会儿，看见{debtor}家的孩子在楼梯上啃面包皮。欠条没有拿出来，{subject}只说下个月再说。回家的路上，{mate}问这笔账还记不记，{subject}说记着，但不催了；账本上那一行被折了一个角。',
        significance: 0.68,
        when: { skill: { name: 'social', max: 0.35 } },
        fx: {
          mood: -0.06,
          relation: ['debtor', 'acquaintance', 0.06, 0],
          flag: 'work13_wrote_off_a_debt',
          knowledge: ['the debtor’s household has no cash to seize', 0.8],
        },
      },
    ],
    task: taskMeta('commerce', ['work', 'family'], ['cash', 'food'], 0.7, 0.3, ['social']),
  },

  // 34. File an invoice -------------------------------------------------------
  {
    id: 'r13-work.file-invoice',
    title: '复写纸下的发票',
    domain: 'commerce',
    kind: 'task',
    stage: 'adulthood',
    ages: [20, 59],
    tags: ['commerce', 'invoice', 'bureaucracy', 'payment', 'literacy'],
    contexts: ['vienna', 'urban', 'industrial', 'reform', 'crisis'],
    milieus: ['shop', 'official', 'market'],
    roles: {
      clerk: ['worker', { minAge: 20, maxAge: 65 }],
      official: ['official', { minAge: 25, maxAge: 70 }],
      shop: ['organization', { organizationKind: 'other' }],
    },
    outcomes: [
      {
        id: 'invoice-paid-in-thirty-days',
        w: 0.4,
        text: '{subject}把发票垫上复写纸，一笔一笔写清货名、数量和单价，又把收货单钉在后面。{clerk}接过去，对着账本核了一遍，在右上角写了“三十日内付”。第三十天，{subject}在柜台拿到十二克朗，纸币上还带着银行捆扎的纸带。',
        significance: 0.74,
        fx: {
          cash: 12,
          relation: ['clerk', 'colleague', 0.06, 0],
          flag: 'work13_invoice_paid_on_time',
        },
      },
      {
        id: 'invoice-lost',
        w: 0.35,
        text: '发票交上去两个月，钱一直没有到。{subject}去问，{clerk}说单据在传递时丢了，让{subject}补一份。补写的发票没有原始收货单，{clerk}只肯先付一半。{subject}回作坊翻遍抽屉，找到一张被油墨弄脏的送货单，边角上还有{clerk}的签名。',
        significance: 0.72,
        fx: {
          cash: -2,
          relation: ['clerk', 'rival', -0.1, 0],
          flag: 'work13_invoice_lost',
          knowledge: ['a signed delivery note survives in the workshop drawer', 0.8],
        },
      },
      {
        id: 'double-entry-caught',
        w: 0.25,
        text: '{subject}把同一批货开了两张发票，一张交给主顾，一张留给自己的账。{official}来核对时，两张纸的编号只差一个数字。{subject}说是抄错了，{official}没有当场拆穿，只把两张都收走。半个月后，主顾那边扣下了全部货款，等调查结束。',
        significance: 0.72,
        when: { skill: { name: 'numeracy', min: 0.35 } },
        fx: {
          cash: -1,
          reputation: 0.04,
          flag: 'work13_double_invoice_caught',
          knowledge: ['the duplicate invoice numbers are on file at the tax office', 0.85],
        },
      },
    ],
    task: taskMeta('commerce', ['work', 'status'], ['cash'], 0.7, 0.2, ['literacy', 'numeracy']),
  },

  // 35. Deal with a tax audit -------------------------------------------------
  {
    id: 'r13-work.tax-audit',
    title: '蓝铅笔划过第三行',
    domain: 'commerce',
    kind: 'task',
    stage: 'adulthood',
    ages: [22, 59],
    tags: ['commerce', 'tax', 'audit', 'shop', 'institution'],
    contexts: ['vienna', 'urban', 'industrial', 'reform', 'crisis'],
    milieus: ['shop', 'official', 'market'],
    conditions: [{ kind: 'hasRole', role: 'shopkeeper' }],
    roles: {
      auditor: ['official', { minAge: 30, maxAge: 70 }],
      clerk: ['worker', { minAge: 20, maxAge: 65 }],
      shop: ['organization', { organizationKind: 'other' }],
    },
    outcomes: [
      {
        id: 'books-accepted',
        w: 0.35,
        text: '{auditor}把账本摊在柜台上，用蓝铅笔一行行往下划。划到进货那页，停了一下，问为什么同一家供货商有两个价。{subject}把运费单找出来，一张张贴在旁边。{auditor}看完，把铅笔收进上衣口袋，说账目清楚，只补了三个克朗的印花税。',
        significance: 0.74,
        fx: {
          cash: -3,
          reputation: 0.05,
          skill: { numeracy: 0.02 },
          flag: 'work13_tax_audit_passed',
        },
      },
      {
        id: 'assessment-and-fine',
        w: 0.35,
        text: '{auditor}在第三行停住，说这笔“损耗”没有单据。{subject}解释是路上碎了两箱，{auditor}摇头，把同类店铺的平均数填进表里。补税加罚金一共十二克朗，限期十天。{clerk}在旁边打算盘，算珠越拨越快；{subject}看着蓝铅笔在纸上画了一个圈。',
        significance: 0.8,
        fx: {
          cash: -12,
          condition: 'tax_penalty',
          mood: -0.08,
          flag: 'work13_tax_assessment_and_fine',
        },
      },
      {
        id: 'appealed-with-receipts',
        w: 0.3,
        text: '{subject}没有当场签字，回家把半年的进货单、运费收据和损坏记录按月份扎成四捆。第二次去时，{auditor}翻得很慢，最后把罚款一栏划掉，只留补税。{subject}走出税务所，手里的收据捆得整整齐齐；那根扎绳是从面包袋上解下来的。',
        significance: 0.76,
        when: { skill: { name: 'literacy', min: 0.4 } },
        fx: {
          cash: -6,
          reputation: 0.04,
          relation: ['auditor', 'acquaintance', 0.05, 0],
          flag: 'work13_appealed_tax_assessment',
        },
      },
    ],
    variants: [
      {
        id: 'reform-new-tax-form',
        when: { legacyKinds: ['reform'] },
        title: '新税法的第一张表',
        outcomes: [
          {
            id: 'filed-the-new-form',
            w: 0.55,
            text: '税务所换了新表，格子比旧表多出一倍。{subject}在窗口前站了一个下午，把营业额、房租、机器折旧一项项填进去，连买扫帚的钱也单列一行。{auditor}核对完，说{subject}是这条街上第一个填对的；那张表被当作样张钉在窗口旁边。',
            significance: 0.76,
            fx: {
              cash: -2,
              reputation: 0.05,
              flag: 'work13_filed_new_tax_form_correctly',
              knowledge: ['the new tax form allows machine depreciation as a deduction', 0.85],
            },
          },
          {
            id: 'missed-the-deduction',
            w: 0.45,
            text: '{subject}照着旧账本填新表，漏掉了机器折旧那一栏。{auditor}用蓝铅笔把整栏圈起来，说少报的扣除不能补，多算的税却要照缴。补缴五克朗那天，{subject}把新表折好收进抽屉，准备明年照着填。',
            significance: 0.74,
            fx: {
              cash: -5,
              mood: -0.06,
              flag: 'work13_missed_tax_deduction',
            },
          },
        ],
      },
    ],
    task: taskMeta('commerce', ['work', 'status'], ['cash', 'status'], 0.68, 0.25, [
      'numeracy',
      'literacy',
    ]),
  },

  // 36. Insure a shop ---------------------------------------------------------
  {
    id: 'r13-work.insure-shop',
    title: '保单上的火灾条款',
    domain: 'commerce',
    kind: 'task',
    stage: 'adulthood',
    ages: [22, 59],
    tags: ['commerce', 'insurance', 'shop', 'risk', 'contract'],
    contexts: ['vienna', 'urban', 'industrial', 'reform', 'crisis'],
    milieus: ['shop', 'official', 'market'],
    conditions: [{ kind: 'hasRole', role: 'shopkeeper' }],
    roles: {
      agent: ['worker', { minAge: 25, maxAge: 70 }],
      clerk: ['worker', { minAge: 20, maxAge: 65 }],
      shop: ['organization', { organizationKind: 'other' }],
    },
    outcomes: [
      {
        id: 'policy-signed',
        w: 0.4,
        text: '{agent}把保单铺在柜台上，指着火灾、雷击和水渍三栏，说一年八克朗。{subject}问煤油灯算不算火灾，{agent}说只要不是故意放的都算。签字时{subject}的手停了一下，还是把名字写上去；{clerk}作为见证人，在角落盖了个小章。',
        significance: 0.74,
        fx: {
          cash: -8,
          flag: 'work13_shop_insured',
          knowledge: [
            'the policy covers fire, lightning and water damage but not boiler explosions',
            0.85,
            'agent',
          ],
        },
      },
      {
        id: 'premium-too-high',
        w: 0.35,
        text: '{agent}报出的保费比房租还高，因为铺子隔壁是木匠作坊。{subject}让他把锅炉那一条念了一遍，果然不保。{agent}走后，{subject}把保单样张夹进账本，又在门口多放了一桶沙；那桶沙后来一直没动过，桶底生了锈。',
        significance: 0.7,
        fx: {
          mood: -0.08,
          flag: 'work13_shop_uninsured_premium',
          knowledge: [
            'the premium doubles because of the neighbouring carpentry shop',
            0.8,
            'agent',
          ],
        },
      },
      {
        id: 'agent-cheated',
        w: 0.25,
        text: '{subject}没有细看保单，只听见“全保”两个字就按了手印。半年后隔壁失火，火苗从屋檐窜过来，{agent}却指着背面的小字说，木结构铺面不在承保范围。{subject}把保单举到灯下，才看见那行字印得比蚂蚁还小。',
        significance: 0.76,
        when: { skill: { name: 'literacy', max: 0.3 } },
        fx: {
          cash: -10,
          condition: 'uninsured_shop',
          relation: ['agent', 'rival', -0.14, 0],
          flag: 'work13_bought_a_worthless_policy',
        },
      },
    ],
    task: taskMeta('commerce', ['work', 'family'], ['cash', 'status'], 0.66, 0.2, ['literacy']),
  },

  // 37. Rebuild after a fire --------------------------------------------------
  {
    id: 'r13-work.rebuild-after-fire',
    title: '烧黑的房梁',
    domain: 'commerce',
    kind: 'task',
    stage: 'adulthood',
    ages: [22, 59],
    tags: ['commerce', 'fire', 'rebuilding', 'shop', 'debt'],
    contexts: ['vienna', 'urban', 'industrial', 'postwar', 'crisis'],
    milieus: ['shop', 'home', 'market'],
    conditions: [{ kind: 'cash', min: 3 }],
    roles: {
      carpenter: ['worker', { minAge: 25, maxAge: 70 }],
      landlord: ['worker', { minAge: 35, maxAge: 75 }],
      shop: ['organization', { organizationKind: 'other' }],
    },
    outcomes: [
      {
        id: 'rebuilt-the-front',
        w: 0.4,
        text: '{carpenter}把烧黑的房梁锯掉一截，接上新木，接缝处用铁箍包住。{subject}在灰堆里翻出没烧透的货，能卖的擦干净摆回架上。卷帘门重新拉开那天，{landlord}送来一盆炭火，说这条街的铺子不能全黑着；第一批客人买的是盐和蜡烛。',
        significance: 0.84,
        fx: {
          cash: -18,
          reputation: 0.06,
          employment: ['shop', 'Kaufmann', 9],
          relation: ['carpenter', 'colleague', 0.08, 0],
          flag: 'work13_rebuilt_shop_after_fire',
        },
      },
      {
        id: 'only-boarded-up',
        w: 0.35,
        text: '{subject}算了一遍，重铺屋顶的钱够租两年新铺面，于是只把临街的窗用木板钉上。货搬到后院，熟客从侧门进来，买完就走。{landlord}来看了两次，说这样下去租约到期就不续；{subject}把钉子又敲紧了一颗。',
        significance: 0.74,
        fx: {
          cash: -4,
          condition: 'shop_closed',
          mood: -0.1,
          flag: 'work13_shop_boarded_up_after_fire',
        },
      },
      {
        id: 'traded-from-the-back-room',
        w: 0.25,
        text: '{subject}没有修门面，把后院腾出来，货架靠着熏黑的墙摆。客人得穿过一条窄巷才能进来，但价钱比街上便宜。第一个月赚得不多，{carpenter}来修屋顶时，{subject}用两袋面粉抵了工钱；两个人都觉得这买卖划算。',
        significance: 0.78,
        when: { maxCash: 10 },
        fx: {
          cash: -8,
          role: 'shopkeeper',
          employment: ['shop', 'Händler', 6],
          flag: 'work13_traded_from_back_room_after_fire',
        },
      },
    ],
    task: taskMeta('commerce', ['family', 'work'], ['cash', 'food'], 0.7, 0.3, [
      'craft',
      'numeracy',
    ]),
  },

  // 38. Move to a better workshop --------------------------------------------
  {
    id: 'r13-work.move-workshop',
    title: '朝北的窗户',
    domain: 'work',
    kind: 'task',
    stage: 'adulthood',
    ages: [22, 59],
    tags: ['work', 'workshop', 'rent', 'premises', 'craft'],
    contexts: ['vienna', 'urban', 'industrial', 'reform', 'crisis'],
    milieus: ['factory', 'print', 'work', 'craft', 'shop'],
    roles: {
      landlord: ['worker', { minAge: 35, maxAge: 75 }],
      foreman: ['worker', { minAge: 30, maxAge: 68 }],
      workshop: ['organization', { organizationKind: 'household_firm' }],
    },
    outcomes: [
      {
        id: 'moved-in',
        w: 0.4,
        text: '新作坊有一扇朝北的窗，光线匀，不用再点灯干活。{subject}把机器拆成三块，用板车分两趟运过去，地脚螺栓重新灌了水泥。{landlord}收下押金，说楼上是住家，夜里十点以后不许开机器；{subject}点头，心里算着交货期。',
        significance: 0.78,
        fx: {
          cash: -12,
          reputation: 0.04,
          relation: ['landlord', 'acquaintance', 0.04, 0],
          flag: 'work13_moved_to_better_workshop',
          knowledge: [
            'the new workshop has steady north light but a ten o’clock noise curfew',
            0.8,
            'landlord',
          ],
        },
      },
      {
        id: 'rent-rose-again',
        w: 0.35,
        text: '{subject}刚把机器装好，{landlord}就来说房租要按“临街铺面”算。合同上写的是后院，{landlord}却指着新开的门说改动过。{subject}没有力气再搬一次，只好先付了六克朗。{foreman}来看了新作坊，说光线好，就是房东比机器难伺候。',
        significance: 0.72,
        fx: {
          cash: -6,
          relation: ['landlord', 'rival', -0.1, 0],
          flag: 'work13_workshop_rent_raised',
        },
      },
      {
        id: 'stayed-put',
        w: 0.25,
        text: '{subject}去看了新作坊，回来又在旧屋里站了半天。搬家要停工三天，三天不交货，主顾就会去找别人。{subject}把窗户擦了一遍，让光多进来一点；机器还是挤在原处，转身时膝盖会撞到料架。',
        significance: 0.68,
        when: { maxCash: 8 },
        fx: {
          mood: -0.06,
          condition: 'crowded_workshop',
          flag: 'work13_stayed_in_crowded_workshop',
        },
      },
    ],
    task: taskMeta('work', ['work', 'status'], ['cash', 'status'], 0.68, 0.2, [
      'craft',
      'numeracy',
    ]),
  },

  // 39. Share a workshop ------------------------------------------------------
  {
    id: 'r13-work.share-workshop',
    title: '两台机器一个电表',
    domain: 'work',
    kind: 'task',
    stage: 'adulthood',
    ages: [22, 59],
    tags: ['work', 'workshop', 'partnership', 'costs', 'trust'],
    contexts: ['vienna', 'urban', 'industrial', 'crisis', 'postwar'],
    milieus: ['factory', 'print', 'work', 'craft'],
    roles: {
      partner: ['worker', { minAge: 25, maxAge: 68 }],
      foreman: ['worker', { minAge: 30, maxAge: 68 }],
      workshop: ['organization', { organizationKind: 'household_firm' }],
    },
    outcomes: [
      {
        id: 'shared-costs',
        w: 0.4,
        text: '{subject}和{partner}把两台机器并排摆好，中间留一条能推板车的缝。房租、电费和煤各记一半，账本由{subject}管，钥匙一人一把。第一个月结算，电费比预想的少，因为两台机器从不同时开；两个人在账本背面画了一条线，算是分了界。',
        significance: 0.74,
        fx: {
          cash: 4,
          relation: ['partner', 'colleague', 0.1, 0],
          flag: 'work13_shared_a_workshop',
          knowledge: ['the two machines can share a meter if they never run together', 0.8],
        },
      },
      {
        id: 'partner-took-the-work',
        w: 0.35,
        text: '{subject}出去送货，回来时看见{partner}正在做一批本该属于{subject}的活。{partner}说主顾自己找上门的，机器闲着也是闲着。两人在电表下面吵了一架，最后把钥匙要回来一把；房租还是各付一半，但中间的缝用粉笔画成了实线。',
        significance: 0.78,
        fx: {
          cash: -5,
          relation: ['partner', 'rival', -0.18, 0],
          flag: 'work13_partner_stole_work',
        },
      },
      {
        id: 'wrote-a-schedule',
        w: 0.25,
        text: '{subject}没有吵，只在墙上钉了一块黑板，把两台机器的使用时段和电费抄在上面。{partner}起初不写，后来发现自己那栏总被别人占，也开始用粉笔。月底一算，电费降了，争执也少了；黑板上最后一行写着“星期六下午，谁也不许开机”。',
        significance: 0.72,
        when: { skill: { name: 'numeracy', min: 0.3 } },
        fx: {
          cash: 2,
          skill: { numeracy: 0.02 },
          relation: ['partner', 'colleague', 0.06, 0],
          flag: 'work13_workshop_schedule_posted',
        },
      },
    ],
    task: taskMeta('work', ['work', 'status'], ['cash', 'status'], 0.7, 0.25, [
      'numeracy',
      'social',
    ]),
  },

  // 40. Join a cooperative ----------------------------------------------------
  {
    id: 'r13-work.join-cooperative',
    title: '股金簿上的名字',
    domain: 'commerce',
    kind: 'task',
    stage: 'adulthood',
    ages: [20, 59],
    tags: ['commerce', 'cooperative', 'membership', 'capital', 'solidarity'],
    contexts: ['vienna', 'urban', 'industrial', 'reform', 'postwar'],
    milieus: ['shop', 'work', 'market', 'union', 'farm'],
    roles: {
      cooperative: ['organization', { organizationKind: 'other' }],
      clerk: ['worker', { minAge: 25, maxAge: 70 }],
      mate: ['worker', { minAge: 18, maxAge: 60 }],
    },
    outcomes: [
      {
        id: 'bought-a-share',
        w: 0.4,
        text: '{clerk}把股金簿翻到新的一页，让{subject}自己写名字。十克朗的股金换来一张盖蓝章的纸，还有在月底大会上的一票。{mate}也买了半股，两人把纸折好，夹在同一个铁盒里。{clerk}说合作社不保赚，但赚了按股分，亏了也按股摊。',
        significance: 0.8,
        fx: {
          cash: -10,
          membership: ['cooperative', true, 'bought a share in the consumers’ cooperative'],
          relation: ['mate', 'friend', 0.08, 0],
          flag: 'work13_joined_cooperative',
        },
      },
      {
        id: 'share-too-expensive',
        w: 0.35,
        text: '{subject}把股金数目看了三遍，十克朗够买两个月的煤。{clerk}说可以分期，但分期期间没有投票权。{subject}没有签，只买了两袋合作社的面粉；出门时看见{mate}在簿子上写名字，笔尖很稳，像是早就想好了。',
        significance: 0.7,
        fx: {
          mood: -0.08,
          flag: 'work13_cooperative_share_too_expensive',
          knowledge: [
            'the cooperative allows installment shares without voting rights',
            0.8,
            'clerk',
          ],
        },
      },
      {
        id: 'worked-first-then-bought',
        w: 0.25,
        text: '{subject}没有现钱，先替合作社搬了三天货，按日折算股金。第三天傍晚，{clerk}在簿子上写下{subject}的名字，股金栏写着“已抵”。{subject}的手上还沾着面粉，按指印时在纸上留了一个白印；{clerk}说这样也算数。',
        significance: 0.76,
        when: { maxCash: 6 },
        fx: {
          cash: -4,
          membership: ['cooperative', true, 'worked off the share contribution'],
          relation: ['clerk', 'colleague', 0.06, 0],
          flag: 'work13_worked_for_cooperative_share',
        },
      },
    ],
    task: taskMeta('commerce', ['belonging', 'work'], ['cash', 'belonging'], 0.72, 0.15, [
      'social',
    ]),
  },

  // 41. Start a cooperative ---------------------------------------------------
  {
    id: 'r13-work.start-cooperative',
    title: '合作社的第一张桌子',
    domain: 'commerce',
    kind: 'task',
    stage: 'adulthood',
    ages: [22, 59],
    tags: ['commerce', 'cooperative', 'founding', 'institution', 'capital'],
    contexts: ['vienna', 'urban', 'industrial', 'reform', 'postwar'],
    milieus: ['shop', 'work', 'market', 'union', 'official'],
    conditions: [{ kind: 'cash', min: 8 }],
    roles: {
      cooperative: ['organization', { organizationKind: 'other' }],
      official: ['official', { minAge: 28, maxAge: 70 }],
      mate: ['worker', { minAge: 18, maxAge: 65 }],
    },
    outcomes: [
      {
        id: 'registered-the-cooperative',
        w: 0.35,
        text: '{subject}和{mate}把七个人的名字写在章程末尾，凑出十二克朗的注册费。{official}把章程逐条念过，问亏了钱谁赔，{subject}说按股摊，谁也不能把铺子搬走。章盖下来时，纸上的墨水还没干；{subject}把第一张桌子搬到窗边，当作开会的长桌。',
        significance: 0.86,
        fx: {
          cash: -12,
          membership: ['cooperative', true, 'founded a registered cooperative'],
          role: 'cooperative_founder',
          reputation: 0.08,
          flag: 'work13_founded_a_cooperative',
        },
      },
      {
        id: 'registration-refused',
        w: 0.35,
        text: '{official}把章程翻到第三页，说“按劳分配”这一条不合现行商法。{subject}问该怎么改，{official}说改成按股分红，再找两个有房产的发起人。{mate}在门外等着，听完只说了一句：那还叫什么合作社。十二克朗的注册费退了九克朗。',
        significance: 0.74,
        fx: {
          cash: -3,
          mood: -0.1,
          flag: 'work13_cooperative_registration_refused',
          knowledge: [
            'the registrar requires property-owning founders and share-based distribution',
            0.85,
            'official',
          ],
        },
      },
      {
        id: 'handshake-cooperative',
        w: 0.3,
        text: '{subject}没有再去窗口，把七个人叫到酒馆后屋，在一张纸上写下“有钱同使，有活同做”，每人按了指印。没有章程，没有公章，只有一把挂在门后的锁和三本各自记的账。{mate}把那张纸折好，说这比官府的章管用；{subject}没有接话。',
        significance: 0.76,
        when: { skill: { name: 'literacy', max: 0.35 } },
        fx: {
          cash: -6,
          membership: ['cooperative', true, 'founded an informal cooperative by handshake'],
          condition: 'informal_cooperative',
          flag: 'work13_informal_cooperative',
        },
      },
    ],
    variants: [
      {
        id: 'reform-municipal-cooperative',
        when: { legacyKinds: ['reform'] },
        title: '市政厅鼓励的合作社',
        outcomes: [
          {
            id: 'chartered-with-help',
            w: 0.55,
            text: '市政厅新设了合作社登记窗口，办事员替{subject}把章程改成标准格式，注册费减半。{subject}只需要凑齐五个发起人和一份铺面租约。章盖下来那天，{mate}把章程贴在墙上，{subject}在第一条下面添了一句：入社自愿，退社自由。',
            significance: 0.84,
            fx: {
              cash: -8,
              membership: ['cooperative', true, 'chartered under the reform-era cooperative law'],
              role: 'cooperative_founder',
              reputation: 0.08,
              flag: 'work13_chartered_reform_cooperative',
            },
          },
          {
            id: 'rules-imposed',
            w: 0.45,
            text: '办事员说可以登记，但章程必须写明市政厅派一名监察员，账本每季度送审。{subject}算了算，送审的车费和抄账的工钱比税还重。{mate}说先登记再说，{subject}却在签名栏前停了很久；最后签了，笔尖把纸戳出一个小洞。',
            significance: 0.76,
            fx: {
              cash: -9,
              membership: ['cooperative', true, 'registered with a municipal supervisor'],
              flag: 'work13_cooperative_under_supervision',
              knowledge: [
                'the municipality appoints a supervisor and audits the books quarterly',
                0.85,
                'official',
              ],
            },
          },
        ],
      },
    ],
    task: taskMeta('commerce', ['work', 'cause', 'belonging'], ['cash', 'belonging'], 0.8, 0.3, [
      'social',
      'numeracy',
    ]),
  },

  // 42. Sell a family business ------------------------------------------------
  {
    id: 'r13-work.sell-business',
    title: '柜台上的钥匙',
    domain: 'commerce',
    kind: 'task',
    stage: 'adulthood',
    ages: [25, 59],
    tags: ['commerce', 'sale', 'family_firm', 'exit', 'grief'],
    contexts: ['vienna', 'urban', 'industrial', 'crisis', 'postwar'],
    milieus: ['shop', 'market', 'official'],
    conditions: [{ kind: 'cash', min: 5 }],
    roles: {
      buyer: ['worker', { minAge: 28, maxAge: 65 }],
      lawyer: ['official', { minAge: 30, maxAge: 70 }],
      shop: ['organization', { organizationKind: 'other' }],
    },
    outcomes: [
      {
        id: 'sold-at-price',
        w: 0.35,
        text: '{lawyer}把契约念到第三页，{buyer}把一沓钞票推过桌面。{subject}数了两遍，在转让栏签了名，又把柜台钥匙从钥匙圈上取下来。钥匙在桌上转了一圈才停；{buyer}伸手去拿时，{subject}已经站起来，去看墙上那块还没摘的旧招牌。',
        significance: 0.88,
        fx: {
          cash: 25,
          loseRole: 'shopkeeper',
          unemployment: 'sold the family shop and left the counter',
          flag: 'work13_sold_family_business',
        },
      },
      {
        id: 'sold-cheap',
        w: 0.35,
        text: '债主催得紧，{subject}没有等第二个买主。{buyer}压了价，只肯出十二克朗，还要把存货算在里面。{lawyer}把笔递过来，说再拖下去连这个数也没有。{subject}签完字，把账本最后一页撕下来留作念想；剩下的纸连同铺子一起归了{buyer}。',
        significance: 0.84,
        fx: {
          cash: 12,
          loseRole: 'shopkeeper',
          unemployment: 'sold the family shop under pressure',
          mood: -0.08,
          flag: 'work13_sold_business_cheap',
        },
      },
      {
        id: 'buyer-backed-out',
        w: 0.3,
        text: '{buyer}看了三次铺面，最后一次带着木匠来量柜台，却在签约当天没有出现。{lawyer}派人去找，回话说{buyer}在别处盘下了一间更便宜的。{subject}把准备好的契约收进抽屉，第二天照常开门；熟客问起，{subject}只说铺子还不卖。',
        significance: 0.72,
        when: { minCash: 10 },
        fx: {
          cash: -1,
          mood: -0.1,
          flag: 'work13_business_sale_fell_through',
        },
      },
    ],
    task: taskMeta('commerce', ['family', 'status'], ['cash', 'status'], 0.7, 0.25, [
      'numeracy',
      'social',
    ]),
  },

  // 43. Inherit a business ----------------------------------------------------
  {
    id: 'r13-work.inherit-business',
    title: '父亲的账本和印章',
    domain: 'commerce',
    kind: 'task',
    stage: 'adulthood',
    ages: [20, 59],
    tags: ['commerce', 'inheritance', 'family_firm', 'debt', 'succession'],
    contexts: ['vienna', 'urban', 'industrial', 'postwar', 'crisis'],
    milieus: ['shop', 'market', 'home'],
    roles: {
      parent: ['parent', { minAge: 45, maxAge: 80 }],
      clerk: ['worker', { minAge: 20, maxAge: 68 }],
      shop: ['organization', { organizationKind: 'other' }],
    },
    outcomes: [
      {
        id: 'took-over-the-shop',
        w: 0.4,
        text: '{parent}把账本、印章和一把铜钥匙一起推到{subject}面前，说铺子从今天起归{subject}。账本最后一页记着欠供货商的钱，也记着三个老主顾的赊账。{clerk}站在柜台后面，等{subject}开口；{subject}先把印章收进内袋，再让{clerk}把今天卖出的货念一遍。',
        significance: 0.84,
        fx: {
          cash: 8,
          role: 'shopkeeper',
          employment: ['shop', 'Kaufmann', 9],
          relation: ['clerk', 'colleague', 0.06, 0],
          flag: 'work13_inherited_family_business',
        },
      },
      {
        id: 'debts-came-with-it',
        w: 0.35,
        text: '钥匙交到手里第二天，供货商就拿着欠条上门。{parent}说那些账是铺子的，不是{subjectPronoun}的；供货商说铺子现在归{subject}，账也归{subject}。{subject}把存货盘了一遍，能抵的抵，剩下十克朗写了还款计划；印章还在，但盖下去的第一份文件是欠条。',
        significance: 0.84,
        fx: {
          cash: -10,
          role: 'shopkeeper',
          employment: ['shop', 'Kaufmann', 9],
          condition: 'inherited_debt',
          flag: 'work13_inherited_business_with_debts',
        },
      },
      {
        id: 'sold-the-stock',
        w: 0.25,
        text: '{subject}没有接铺子，把货按批发价盘给了对街的商人，货架和柜台折了十四克朗。{parent}坐在里屋，没有出来看。{subject}把父亲的印章留在抽屉里，只带走账本；锁门时，钥匙在锁孔里转了两圈才拔出来。',
        significance: 0.8,
        when: { maxCash: 8 },
        fx: {
          cash: 14,
          unemployment: 'sold off the family stock instead of taking over the shop',
          mood: -0.06,
          flag: 'work13_sold_inherited_stock',
        },
      },
    ],
    task: taskMeta('commerce', ['family', 'work'], ['cash', 'status'], 0.78, 0.2, [
      'numeracy',
      'social',
    ]),
  },

  // 44. Train an apprentice ---------------------------------------------------
  {
    id: 'r13-work.train-apprentice',
    title: '学徒的第一把锉刀',
    domain: 'education',
    kind: 'task',
    stage: 'adulthood',
    ages: [25, 59],
    tags: ['work', 'apprenticeship', 'training', 'craft', 'patience'],
    contexts: ['vienna', 'urban', 'industrial', 'schooling', 'postwar'],
    milieus: ['print', 'craft', 'factory', 'work', 'shop'],
    roles: {
      apprentice: ['worker', { minAge: 14, maxAge: 20 }],
      foreman: ['worker', { minAge: 35, maxAge: 70 }],
      workshop: ['organization', { organizationKind: 'household_firm' }],
    },
    outcomes: [
      {
        id: 'apprentice-learned',
        w: 0.4,
        text: '{apprentice}第一次拿锉刀，手腕是僵的，锉出来的面中间凹下去一块。{subject}没有接手，只把{apprentice}的手指挪到锉柄前端，让{subjectPronoun}自己再推十下。第十下时，铁屑终于均匀地落在虎钳两边。{foreman}路过，看了一眼，说这徒弟可以留下。',
        significance: 0.74,
        fx: {
          skill: { craft: 0.02 },
          reputation: 0.05,
          relation: ['apprentice', 'colleague', 0.12, 0],
          flag: 'work13_trained_an_apprentice',
        },
      },
      {
        id: 'apprentice-quit',
        w: 0.3,
        text: '{apprentice}干了三天就不来了。{subject}去{apprentice}家里问，母亲说厂里给的钱多，学徒工钱连鞋都买不起。{subject}把没用完的料放回架子，那把锉刀还留在虎钳上，柄上缠着{apprentice}自己缠的布条。{foreman}说今年别指望再分到学徒了。',
        significance: 0.7,
        fx: {
          cash: 1,
          mood: -0.06,
          relation: ['apprentice', 'acquaintance', 0.04, 0],
          flag: 'work13_apprentice_quit',
        },
      },
      {
        id: 'taught-him-wrong',
        w: 0.3,
        text: '{subject}自己锉活时习惯把锉刀压得很重，也照这个手法教{apprentice}。一个月后，{foreman}拿起{apprentice}做的活，发现每个面都向一边斜。{foreman}把活摔在案上，问是谁教的；{subject}没有吭声。{apprentice}重新从站姿学起，手腕上贴了膏药。',
        significance: 0.74,
        when: { skill: { name: 'craft', max: 0.35 } },
        fx: {
          relation: ['apprentice', 'rival', -0.08, 0],
          condition: 'bad_habit',
          flag: 'work13_taught_apprentice_bad_habit',
        },
      },
    ],
    task: taskMeta('education', ['work', 'status'], ['status', 'care'], 0.7, 0.15, ['craft']),
  },

  // 45. Mentor a younger worker ----------------------------------------------
  {
    id: 'r13-work.mentor-worker',
    title: '午休时的两句提醒',
    domain: 'education',
    kind: 'task',
    stage: 'adulthood',
    ages: [28, 59],
    tags: ['work', 'mentoring', 'safety', 'solidarity', 'youth'],
    contexts: ['vienna', 'urban', 'industrial', 'factory', 'crisis'],
    milieus: ['factory', 'print', 'work', 'craft', 'union'],
    roles: {
      youth: ['worker', { minAge: 16, maxAge: 24 }],
      foreman: ['worker', { minAge: 32, maxAge: 68 }],
    },
    outcomes: [
      {
        id: 'warned-about-the-machine',
        w: 0.4,
        text: '{subject}把自己的饭盒挪到一边，让{youth}坐下，说自己十九岁那年也被这台机器咬过。{subject}把袖子卷起来，露出一道旧疤，又教{youth}怎么在换料前先听飞轮的声音。{youth}第二天再来时，先停了机器，才把手伸进去。',
        significance: 0.72,
        when: { hasRole: 'union_member' },
        fx: {
          relation: ['youth', 'friend', 0.12, 0],
          reputation: 0.04,
          skill: { social: 0.02 },
          flag: 'work13_mentored_a_young_worker',
        },
      },
      {
        id: 'youth-reported-him',
        w: 0.25,
        text: '{subject}提醒{youth}别替{foreman}私下搬料，{youth}却把这话学给了{foreman}听。下午{foreman}把{subject}叫到办公室，问是不是在拉帮结派。{subject}说是教新人规矩，{foreman}让他少管闲事；走出办公室，{youth}正在擦机器，头也没抬。',
        significance: 0.72,
        fx: {
          relation: ['youth', 'rival', -0.14, 0],
          mood: -0.08,
          flag: 'work13_mentoring_reported',
        },
      },
      {
        id: 'said-nothing',
        w: 0.35,
        text: '午休时{youth}坐在对面，{subject}看见{subject}的手腕上有一道新划痕，想问，又觉得不关自己的事。{foreman}来催下午的活，{youth}把饭盒一收就进了车间。{subject}后来听说{youth}那天下午被皮带擦伤了胳膊，伤得不重，但请了三天假。',
        significance: 0.62,
        fx: {
          mood: -0.04,
          flag: 'work13_stayed_silent_with_young_worker',
          knowledge: ['the young worker was injured at the belt a week later', 0.7],
        },
      },
    ],
    task: taskMeta('education', ['work', 'care'], ['status', 'care'], 0.62, 0.15, [
      'social',
      'craft',
    ]),
  },

  // 46. Retire and hand over ------------------------------------------------
  {
    id: 'r13-work.retire-handover',
    title: '交还工具的那天',
    domain: 'work',
    kind: 'task',
    stage: 'elderhood',
    ages: [60, 75],
    tags: ['work', 'retirement', 'handover', 'pension', 'craft'],
    contexts: ['vienna', 'urban', 'industrial', 'factory', 'reform', 'postwar'],
    milieus: ['factory', 'print', 'work', 'craft', 'shop'],
    roles: {
      apprentice: ['worker', { minAge: 16, maxAge: 28 }],
      foreman: ['worker', { minAge: 35, maxAge: 70 }],
      workshop: ['organization', { organizationKind: 'household_firm' }],
    },
    outcomes: [
      {
        id: 'handed-over-the-tools',
        w: 0.4,
        text: '{subject}把用了几十年的卡尺、锉刀和一把自制的划线针排在案上，让{apprentice}一件件认。{apprentice}拿起卡尺时，{subject}伸手把零点校了一遍，才放手。{foreman}在门口等着，手里拿着结算单；{subject}签完字，把围裙叠好放在案角，没有带走。',
        significance: 0.86,
        fx: {
          cash: 6,
          health: 0.02,
          loseRole: 'machine_hand',
          relation: ['apprentice', 'colleague', 0.1, 0],
          skill: { craft: 0.02 },
          flag: 'work13_retired_and_handed_over',
        },
      },
      {
        id: 'stayed-on-half-days',
        w: 0.35,
        text: '结算单签了，{subject}第二天还是来了，说家里的凳子坐着不舒服。{foreman}让{subject}每周来三个上午，带{apprentice}磨刀、校机器，工钱按半日算。{subject}把工具又摊回案上，位置和昨天一模一样；{apprentice}说这算退休还是算上工，{subject}说都算。',
        significance: 0.74,
        fx: {
          cash: 3,
          relation: ['apprentice', 'colleague', 0.08, 0],
          condition: 'partial_retirement',
          flag: 'work13_stayed_on_half_days',
        },
      },
      {
        id: 'pushed-out-without-pension',
        w: 0.25,
        text: '{foreman}说厂里要换新机器，老工人得先腾位子。{subject}的工龄差两年才够养老金，账房只结了当月的工钱。工具是{subject}自己的，一把把装进布袋；{apprentice}想帮忙，被{foreman}叫走了。走出厂门时，{subject}回头看了一眼那扇铁门。',
        significance: 0.82,
        when: { maxCash: 4 },
        fx: {
          cash: -2,
          mood: -0.14,
          unemployment: 'pushed out two years short of a pension',
          flag: 'work13_pushed_out_without_pension',
        },
      },
    ],
    variants: [
      {
        id: 'reform-pension-window',
        when: { legacyKinds: ['reform'] },
        title: '养老金窗口前的队',
        outcomes: [
          {
            id: 'pension-approved',
            w: 0.55,
            text: '养老金窗口前排了二十几个人，{subject}手里攥着工龄册和两张证人签字。办事员一页页翻过，在最后一行盖了章，说下个月起按周领。{subject}把回执折好放进内袋，走出市政厅时，台阶上的阳光比来时亮。',
            significance: 0.82,
            fx: {
              cash: 8,
              loseRole: 'machine_hand',
              health: 0.02,
              flag: 'work13_pension_approved',
              knowledge: ['the pension is paid weekly from the municipal office', 0.85],
            },
          },
          {
            id: 'pension-delayed',
            w: 0.45,
            text: '办事员说工龄册上缺了战时两年的记录，得回原厂补证明。{subject}跑了两趟，厂里管档案的人已经换过三任，谁也找不到那本册子。窗口最后给了一张临时条子，钱要等复核；{subject}把条子夹进工龄册，册子比来时厚了一点。',
            significance: 0.74,
            fx: {
              cash: -2,
              mood: -0.1,
              flag: 'work13_pension_delayed',
              knowledge: ['two wartime years are missing from the pension record', 0.85],
            },
          },
        ],
      },
    ],
    task: taskMeta('work', ['rest', 'family'], ['cash', 'health'], 0.82, 0.1, ['craft']),
  },

  // 47. Look for part-time work ----------------------------------------------
  {
    id: 'r13-work.part-time',
    title: '放学后的四个钟头',
    domain: 'work',
    kind: 'task',
    stage: 'adolescence',
    ages: [14, 17],
    tags: ['work', 'part_time', 'school', 'adolescence', 'cash'],
    contexts: ['vienna', 'urban', 'industrial', 'schooling', 'war', 'crisis'],
    milieus: ['shop', 'market', 'work', 'school', 'home', 'poverty'],
    roles: {
      grocer: ['worker', { minAge: 28, maxAge: 70 }],
      teacher: ['teacher', { minAge: 22, maxAge: 65 }],
      shop: ['organization', { organizationKind: 'other' }],
    },
    outcomes: [
      {
        id: 'errands-after-school',
        w: 0.4,
        text: '{grocer}让{subject}放学后送两趟货，按趟给钱，天黑前必须回铺子交账。{subject}把书包挂在柜台后面，提着篮子穿过三条街；第一趟送错了一户，第二趟跑得鞋底发热。收工时{grocer}数了三个铜板，说明天还来。',
        significance: 0.74,
        fx: {
          cash: 2,
          employment: ['shop', 'Laufbursche', 3],
          relation: ['grocer', 'colleague', 0.06, 0],
          flag: 'work13_took_part_time_errands',
        },
      },
      {
        id: 'late-for-class',
        w: 0.3,
        text: '{subject}接了一单远活，回来时天已经黑透。第二天的算术课，{subject}在课堂上睡着了，{teacher}用粉笔头敲了敲课桌。放学后{teacher}把{subject}留下，说再缺两次课就要叫家长；{subject}摸着口袋里那几枚铜板，没有说是去送货了。',
        significance: 0.72,
        fx: {
          cash: 1,
          reputation: -0.05,
          relation: ['teacher', 'rival', -0.08, 0],
          flag: 'work13_part_time_made_late_for_school',
        },
      },
      {
        id: 'parents-refused',
        w: 0.3,
        text: '{subject}把招工纸条带回家，父亲看了一眼就揉成团，说家里还没穷到要孩子去站柜台。母亲把纸条从炉子里抢出来，抹平了夹进课本。第二天放学，{subject}还是绕到铺子门口看了一眼，{grocer}正把一筐土豆搬进后屋。',
        significance: 0.7,
        when: { minCash: 8 },
        fx: {
          mood: -0.08,
          flag: 'work13_parents_refused_part_time',
          knowledge: ['the grocer needs a boy after school', 0.8, 'grocer'],
        },
      },
    ],
    variants: [
      {
        id: 'war-factory-after-school',
        when: { contextTags: ['war'] },
        title: '工厂缺人的下午',
        outcomes: [
          {
            id: 'hired-at-the-factory',
            w: 0.55,
            text: '厂里贴出招少年工的告示，{subject}谎报了一岁。工头让{subject}把一筐废料拖到后院，又量了量{subject}的肩宽，说可以上机器。第一个下午，{subject}的手被毛刺扎了七八处；收工时领到三个克朗，比送货多一倍。',
            significance: 0.8,
            fx: {
              cash: 3,
              employment: ['shop', 'Jungarbeiter', 5],
              health: -0.03,
              condition: 'cut_hands',
              flag: 'work13_hired_as_wartime_boy',
            },
          },
          {
            id: 'school-found-out',
            w: 0.45,
            text: '{teacher}在街上看见{subject}穿着工装，第二天把{subject}叫到办公室。{subject}说家里需要钱，{teacher}说十四岁进厂要厂里开证明。证明没有开，工钱结到当天；{subject}回教室时，手上还留着机油味。',
            significance: 0.74,
            fx: {
              cash: 2,
              reputation: -0.06,
              relation: ['teacher', 'rival', -0.1, 0],
              flag: 'work13_school_found_factory_work',
            },
          },
        ],
      },
    ],
    task: taskMeta('work', ['family', 'work'], ['cash', 'food'], 0.88, 0.12, ['social']),
  },

  // 48. Claim unemployment benefit -------------------------------------------
  {
    id: 'r13-work.unemployment-benefit',
    title: '补助金窗口的第二张表',
    domain: 'work',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 59],
    tags: ['work', 'unemployment', 'benefit', 'institution', 'poverty'],
    contexts: ['vienna', 'urban', 'industrial', 'postwar', 'reform', 'crisis'],
    milieus: ['official', 'home', 'poverty', 'union'],
    conditions: [{ kind: 'employment', employed: false }],
    roles: {
      official: ['official', { minAge: 25, maxAge: 70 }],
      neighbor: ['neighbor', { minAge: 18, maxAge: 75 }],
    },
    outcomes: [
      {
        id: 'benefit-approved',
        w: 0.4,
        text: '{official}把{subject}的工龄册翻到最后一页，又对照了厂里寄来的解雇单，说可以领十二周。钱不多，每周够买面包和煤。{subject}在表格上按了手印，{official}把一张薄薄的领取券推过来，说下周同一时间来，别迟到。',
        significance: 0.74,
        fx: {
          cash: 6,
          flag: 'work13_unemployment_benefit_approved',
          knowledge: [
            'the benefit runs for twelve weeks and must be collected in person',
            0.85,
            'official',
          ],
        },
      },
      {
        id: 'rejected-missing-book',
        w: 0.35,
        text: '{official}说工龄册上少了最后三个月的盖章，不能算连续就业。{subject}说厂里倒闭时没人盖章，{official}说那就去找厂里。厂门已经锁了，账房改成了仓库。{subject}回到家，把工龄册一页页翻过，发现最后那页的纸比前面薄。',
        significance: 0.72,
        fx: {
          cash: -1,
          mood: -0.1,
          flag: 'work13_benefit_rejected_missing_stamp',
          knowledge: ['the final three months of employment were never stamped', 0.85],
        },
      },
      {
        id: 'emergency-coal-voucher',
        w: 0.25,
        text: '{subject}填表时把每一栏都写满了，连失业前最后一个月的加班钟点也写上。{official}看完，说表填得清楚，又额外给了一张煤票。{neighbor}在门口等着，帮{subject}把半袋煤抬回去；两个人上楼时，谁也没提下周的钱够不够。',
        significance: 0.7,
        when: { skill: { name: 'literacy', min: 0.35 } },
        fx: {
          cash: 1,
          food: 2,
          relation: ['official', 'acquaintance', 0.04, 0],
          flag: 'work13_benefit_emergency_coal',
        },
      },
    ],
    variants: [
      {
        id: 'postwar-benefit-office',
        when: { contextTags: ['postwar'] },
        title: '战后失业登记处',
        outcomes: [
          {
            id: 'postwar-benefit-granted',
            w: 0.55,
            text: '战后新设的失业登记处在一间旧学校里，课桌当柜台用。{official}问{subject}战前做什么，又问他有没有被征召。{subject}把退伍证明和工厂解雇单一起递过去，{official}在两张纸之间来回看了三遍，最后批了十六周。',
            significance: 0.8,
            fx: {
              cash: 8,
              flag: 'work13_postwar_benefit_granted',
              knowledge: [
                'the postwar benefit runs longer for returning soldiers',
                0.85,
                'official',
              ],
            },
          },
          {
            id: 'sent-to-relief-work',
            w: 0.45,
            text: '{official}说补助金只发给有家属的人，{subject}单身，只能去修路队领工钱。第二天{subject}扛着铁锹站在城郊，和几十个男人一起把碎砖填进车辙。工钱按日结，比补助多两克朗，但一天下来，手掌磨出了三个水泡。',
            significance: 0.78,
            fx: {
              cash: 2,
              health: -0.04,
              condition: 'blistered_hands',
              flag: 'work13_sent_to_relief_work',
            },
          },
        ],
      },
    ],
    task: taskMeta('work', ['survival', 'family'], ['cash', 'food'], 1.0, 0.1, ['literacy']),
  },

  // 49. Borrow a reference letter --------------------------------------------
  {
    id: 'r13-work.reference-letter',
    title: '旧工头的一封荐书',
    domain: 'work',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 55],
    tags: ['work', 'reference', 'hiring', 'favour', 'reputation'],
    contexts: ['vienna', 'urban', 'industrial', 'factory', 'crisis', 'postwar'],
    milieus: ['factory', 'print', 'work', 'shop', 'home'],
    conditions: [{ kind: 'employment', employed: false }],
    roles: {
      foreman: ['worker', { minAge: 35, maxAge: 70 }],
      master: ['worker', { minAge: 35, maxAge: 70 }],
      workshop: ['organization', { organizationKind: 'factory' }],
    },
    outcomes: [
      {
        id: 'letter-written',
        w: 0.4,
        text: '{foreman}在门房里听完，从抽屉里摸出一张印着厂名的信纸，写{subject}“手脚干净，肯学机器”，又签了名。墨水没干，他用吸墨纸按了按，说别拿去给太大的厂，小厂才看这个。{subject}把信折成四折，放进内袋最里面。',
        significance: 0.76,
        fx: {
          cash: 1,
          relation: ['foreman', 'friend', 0.12, 0],
          flag: 'work13_obtained_reference_letter',
          knowledge: ['the old foreman still has letterhead from the factory', 0.8, 'foreman'],
        },
      },
      {
        id: 'letter-refused',
        w: 0.35,
        text: '{foreman}说{subject}走的时候没有打招呼，现在写信等于打自己的脸。{subject}站在门房外，把来意又说了一遍，{foreman}低头去拨炉子，不再接话。回家的路上，{subject}把准备好的一小包烟叶捏碎了，撒在路边的雪里。',
        significance: 0.72,
        fx: {
          mood: -0.1,
          relation: ['foreman', 'rival', -0.1, 0],
          flag: 'work13_reference_letter_refused',
        },
      },
      {
        id: 'overstated-and-found-out',
        w: 0.25,
        text: '{subject}嫌荐书写得太轻，自己在末尾添了一句“能独立看图纸”。新厂的{master}让{subject}当场画一张简单的装配图，{subject}画到一半就停了。{master}把信举起来，问最后那句是谁写的；{subject}接过信，没有回答。',
        significance: 0.74,
        when: { maxCash: 4 },
        fx: {
          cash: -2,
          reputation: -0.08,
          mood: -0.08,
          flag: 'work13_forged_reference_caught',
        },
      },
    ],
    task: taskMeta('work', ['work', 'status'], ['cash', 'status'], 0.8, 0.15, [
      'social',
      'literacy',
    ]),
  },

  // 50. Sell tools to pay wages ----------------------------------------------
  {
    id: 'r13-work.sell-tools',
    title: '当掉工具发工钱',
    domain: 'commerce',
    kind: 'task',
    stage: 'adulthood',
    ages: [22, 59],
    tags: ['commerce', 'pawn', 'tools', 'wages', 'liquidity'],
    contexts: ['vienna', 'urban', 'industrial', 'crisis', 'postwar'],
    milieus: ['shop', 'work', 'craft', 'factory', 'market'],
    roles: {
      pawnbroker: ['worker', { minAge: 30, maxAge: 75 }],
      mate: ['worker', { minAge: 18, maxAge: 60 }],
      workshop: ['organization', { organizationKind: 'household_firm' }],
    },
    outcomes: [
      {
        id: 'pawned-the-tools',
        w: 0.4,
        text: '{pawnbroker}把{subject}的整套锉刀和卡尺摊在柜台上，逐件看钢口，最后给了十二克朗，当票上写着三个月为期。{subject}把钱直接拿去作坊，给{mate}和另外两个帮工发了工钱。回家时工具袋空了，肩上的重量却轻得让人不习惯。',
        significance: 0.78,
        fx: {
          cash: 12,
          condition: 'tools_in_pawn',
          relation: ['mate', 'friend', 0.08, 0],
          flag: 'work13_pawned_tools_to_pay_wages',
        },
      },
      {
        id: 'sold-the-lathe',
        w: 0.3,
        text: '{subject}把用了七年的小车床卖给旧货商，铜轴按斤称，床身按件算，一共十八克朗。买主带人来抬机器时，{subject}蹲在门口抽烟，看着地脚螺栓被一根根拧出来。工钱发下去了，作坊里却空出一块，走路时会不自觉绕开。',
        significance: 0.8,
        fx: {
          cash: 18,
          mood: -0.1,
          condition: 'no_lathe',
          flag: 'work13_sold_the_lathe',
        },
      },
      {
        id: 'paid-late',
        w: 0.3,
        text: '{subject}舍不得当工具，让{mate}再等一周。{mate}等到第五天，家里孩子病了，来敲作坊的门。{subject}把抽屉里最后三克朗数给他，{mate}接过钱，说这不是工钱，是打发。第二天{mate}没有来上工，工具箱也搬走了。',
        significance: 0.74,
        when: { maxCash: 5 },
        fx: {
          cash: -3,
          reputation: -0.06,
          relation: ['mate', 'rival', -0.12, 0],
          flag: 'work13_paid_wages_late',
        },
      },
    ],
    task: taskMeta('commerce', ['work', 'survival'], ['cash'], 0.7, 0.3, ['numeracy', 'social']),
  },
]);
