import type { PlotKernel } from '../../../composition/types.js';
import { recipes } from './kit.js';

/**
 * Batch 1 · work and commerce.
 *
 * Fifty concrete mechanisms in the wage economy of Vienna and its hinterland,
 * 1900–1935: hiring fairs, indenture, piece rates, foremen, unions, lockouts,
 * accidents, benefit queues, family firms and the small frauds that keep a
 * household afloat. Each outcome changes work, money, health, skill, relations
 * or organisational state; none is a mood-only vignette.
 */
export const BATCH1_WORK_COMMERCE: PlotKernel[] = recipes([
  // 1. Hiring fair -----------------------------------------------------------
  {
    id: 'r1-work.hiring-fair',
    title: '招聘集市上的帽子',
    domain: 'work',
    stage: 'adulthood',
    ages: [16, 55],
    tags: ['work', 'hiring', 'market', 'rural', 'seasonal'],
    contexts: ['vienna', 'rural', 'peace', 'industrial'],
    milieus: ['farm', 'shop', 'factory'],
    roles: {
      steward: ['worker', { minAge: 30, maxAge: 65 }],
      rival: ['worker', { minAge: 16, maxAge: 55 }],
    },
    outcomes: [
      {
        id: 'hired-for-harvest',
        w: 0.4,
        text: '{steward}把{subject}的手翻过来看了一遍，指节上的老茧比帽子上的徽章更管用。他在名单上划了一道，让{subject}明早带自己的镰刀到东家谷仓。{rival}排在后面，把帽檐压得更低，脚边那袋干粮一直没打开。',
        significance: 0.72,
        fx: {
          cash: 2,
          role: 'harvest_hand',
          relation: ['steward', 'employer', 0.04, 0],
          flag: 'hired_at_hiring_fair',
          knowledge: ['the estate pays two kroner in advance for harvest hands', 0.8, 'steward'],
        },
      },
      {
        id: 'passed-over',
        w: 0.35,
        text: '{steward}把名单合上，说今年只要会扶犁的。{subject}在雨里站到集市散场，最后把带来的干粮分给{rival}一半。回家的路上，{subjectPronoun}把帽子摘下来，帽里缝着的工钱袋还是空的，只有一枚铜板在袋角响。',
        significance: 0.74,
        when: { skill: { name: 'craft', max: 0.2 } },
        fx: {
          unemployment: 'no estate would take an unskilled hand',
          mood: -0.12,
          flag: 'passed_over_at_hiring_fair',
        },
      },
      {
        id: 'negotiated-a-gang',
        w: 0.25,
        text: '{subject}没有急着应声，先问{steward}割一亩算几个铜板。{steward}愣了一下，报了个更高的价，条件是带三个短工。{rival}在后面哼了一声，{subject}把名字写在第一个，又替{rival}把名字添在第二个。',
        significance: 0.76,
        when: { skill: { name: 'social', min: 0.3 } },
        fx: {
          cash: 4,
          role: 'gang_leader',
          relation: ['steward', 'colleague', 0.08, 0],
          flag: 'negotiated_harvest_wage',
        },
      },
    ],
    variants: [
      {
        id: 'war-substitute-hands',
        when: { contextTags: ['war'] },
        title: '男人走后，集市换了人',
        roles: {
          matron: ['worker', { minAge: 35, maxAge: 65 }],
        },
        outcomes: [
          {
            id: 'hired-as-substitute',
            w: 0.6,
            text: '{matron}把名册翻到新的一页，说男人都上了前线，地里总得有人。{subject}当场试了试她递来的镰刀，刀刃缺了一角，握把却磨得发亮。{matron}点头，让{subjectPronoun}明天带两个女人一起来。',
            significance: 0.76,
            fx: {
              cash: 3,
              role: 'substitute_laborer',
              relation: ['matron', 'employer', 0.06, 0],
              flag: 'hired_as_wartime_substitute',
            },
          },
          {
            id: 'rejected-as-too-slight',
            w: 0.4,
            text: '{matron}捏了捏{subject}的手腕，说这胳膊抬不动一捆麦子。{subject}没有争，只把袖子挽到肘上，露出晒黑的皮肤。{matron}还是摇头，转头去问下一个。集市收摊时，{subject}帮着捡了一下午烂菜叶。',
            significance: 0.72,
            fx: {
              unemployment: 'turned away from the wartime hiring fair',
              mood: -0.1,
              flag: 'rejected_as_wartime_substitute',
            },
          },
        ],
      },
    ],
    baseRate: 0.06,
    cooldownYears: 2,
  },

  // 2. First apprenticeship -------------------------------------------------
  {
    id: 'r1-work.first-apprenticeship',
    title: '契约上的第一枚指印',
    domain: 'work',
    stage: 'adolescence',
    ages: [14, 18],
    tags: ['work', 'apprenticeship', 'craft', 'family', 'contract'],
    contexts: ['vienna', 'urban', 'peace', 'industrial', 'schooling'],
    milieus: ['printshop', 'factory', 'shop'],
    roles: {
      master: ['worker', { minAge: 35, maxAge: 68 }],
      parent: ['parent', { minAge: 35, maxAge: 60 }],
      rival: ['worker', { minAge: 14, maxAge: 20 }],
      workshop: ['organization', { organizationKind: 'household_firm' }],
    },
    outcomes: [
      {
        id: 'signed-the-indenture',
        w: 0.4,
        text: '{master}把学徒契约在桌上抹平，指着“三年、管饭、无工钱”那一行让{parent}看。{parent}的拇指在纸边停了很久，最后蘸了印泥。{subject}按下去时，指印比别人的都小一圈，{master}把纸举到灯下，说这就算入了门。',
        significance: 0.84,
        fx: [
          { education: ['apprenticeship', 1] },
          { employment: ['workshop', 'Lehrling', 10] },
          {
            role: 'apprentice',
            relation: ['master', 'colleague', 0.06, 0],
            flag: 'signed_indenture',
          },
        ],
      },
      {
        id: 'parent-refused',
        w: 0.3,
        text: '{parent}把契约推回去，说家里少一张吃饭的嘴，也少一双手。{master}收起印泥，说过了这个村就没有这个店。{subject}跟着{parent}走到门口，回头看见{rival}已经坐在案前试刨子，刨花一卷卷落在地上。',
        significance: 0.78,
        fx: {
          unemployment: 'kept home instead of being indentured',
          mood: -0.14,
          relation: ['parent', 'rival', -0.1, 0],
          flag: 'indenture_refused',
        },
      },
      {
        id: 'passed-the-bench-test',
        w: 0.3,
        text: '{master}没有拿契约，先丢给{subject}一块歪料，让{subjectPronoun}刨平。{subject}刨到第三遍，木纹终于顺了；{master}用指甲刮了刮，才把契约翻到签名那页。{rival}在旁边看着，手里的刨子一直没动。',
        significance: 0.82,
        when: { skill: { name: 'craft', min: 0.2 } },
        fx: [
          { education: ['apprenticeship', 1] },
          { employment: ['workshop', 'Lehrling', 10] },
          {
            role: 'apprentice',
            skill: { craft: 0.03 },
            relation: ['master', 'colleague', 0.1, 0],
            flag: 'passed_workshop_test',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'reform-night-school',
        when: { legacyKinds: ['reform'] },
        title: '契约之外的夜校',
        roles: {
          teacher: ['teacher', { minAge: 22, maxAge: 60 }],
        },
        outcomes: [
          {
            id: 'attended-night-class',
            w: 0.55,
            text: '契约写明三年无工钱，{teacher}却在夜校给学徒留了座位。{subject}白天刨木，晚上抄图样，手指上的墨和木屑混成一层黑。{master}起初骂浪费灯油，后来拿着{subject}画的榫卯图看了半天。',
            significance: 0.8,
            fx: [
              { education: ['apprenticeship', 2] },
              {
                skill: { literacy: 0.05, craft: 0.03 },
                relation: ['teacher', 'colleague', 0.1, 0],
                role: 'night_school_apprentice',
                flag: 'attended_apprentice_night_school',
              },
            ],
          },
          {
            id: 'too-tired-to-stay-awake',
            w: 0.45,
            text: '{subject}在夜校第二排睡着了，额头磕在描图纸上。{teacher}没有叫醒{subjectPronoun}，只把当天的图样折好塞进工具袋。第二天开料时，{subject}把墨线弹歪，{master}扣了半碗午饭，说学徒的眼睛不该发直。',
            significance: 0.7,
            fx: {
              health: -0.05,
              condition: 'exhaustion',
              relation: ['teacher', 'acquaintance', 0.04, 0],
              flag: 'missed_apprentice_night_school',
            },
          },
        ],
      },
    ],
    baseRate: 0.05,
    cooldownYears: 5,
  },

  // 3. Factory speedup: the midday break is cut ------------------------------
  {
    id: 'r1-work.factory-break-speedup',
    title: '午休被划掉的那一格',
    domain: 'work',
    stage: 'adulthood',
    ages: [18, 55],
    tags: ['work', 'factory', 'speedup', 'fatigue', 'foreman'],
    contexts: ['industrial', 'factory', 'crisis'],
    milieus: ['factory', 'printshop'],
    conditions: [{ kind: 'employment', employed: true }],
    roles: {
      employer: ['organization', { organizationKind: 'factory' }],
      foreman: ['worker', { minAge: 30, maxAge: 65 }],
      mate: ['worker', { minAge: 18, maxAge: 58 }],
    },
    outcomes: [
      {
        id: 'swallowed-the-shorter-break',
        w: 0.4,
        text: '{foreman}把午休牌子翻到背面，写上“自愿加班”。{subject}跟着人群回到机台，饭盒还热着，手已经伸进料槽。月底多发两克朗，{mate}说这钱带着铁屑味，{subject}没有反驳，只把饭盒里剩下的半个面包塞给他。',
        significance: 0.72,
        fx: {
          cash: 2,
          health: -0.05,
          condition: 'swollen ankles',
          relation: ['mate', 'colleague', 0.05, 0.02],
          flag: 'skipped_lunch_break',
        },
      },
      {
        id: 'kept-the-break',
        w: 0.3,
        text: '{subject}把饭盒放在{foreman}的办公桌上，说机器要停，人也要停。{foreman}盯了{subjectPronoun}一会儿，把加班名单上的名字划掉。下午{subject}被调去看仓库，工钱少了一克朗，{mate}路过时朝门里竖了下大拇指。',
        significance: 0.74,
        fx: {
          cash: -1,
          role: 'break_guard',
          reputation: 0.04,
          relation: ['foreman', 'rival', -0.14, 0],
          flag: 'refused_skipped_break',
        },
      },
      {
        id: 'mate-caught-in-the-belt',
        w: 0.3,
        text: '午休取消后的第三天，{mate}的手套被卷进传送带。{subject}拉下闸刀时，{foreman}先去看计数器，再去看人。救护车来之前，{mate}一直问今天的件数算不算，血滴在计件牌上，把数字糊住了。',
        significance: 0.82,
        fx: {
          health: -0.06,
          role: 'first_aid_witness',
          relation: ['mate', 'friend', 0.12, 0.05],
          flag: 'witnessed_hand_injury',
          knowledge: ['the press had no guard when the break was cut', 0.9, 'mate'],
        },
      },
    ],
    variants: [
      {
        id: 'wartime-soup-break',
        when: { processKinds: ['war_mobilization'] },
        title: '配给汤代替午休',
        roles: {
          canteen: ['worker', { minAge: 25, maxAge: 60 }],
        },
        outcomes: [
          {
            id: 'drank-and-returned',
            w: 0.6,
            text: '{canteen}把一勺稀汤舀进{subject}的饭盒，说这就是午休。汤里浮着两片萝卜，{subject}站在机器旁喝完，手心刚暖过来就得去换料。{foreman}在旁边记时间，说战时要按分钟算。',
            significance: 0.72,
            fx: {
              food: 2,
              health: -0.04,
              condition: 'hunger',
              relation: ['canteen', 'acquaintance', 0.04, 0],
              flag: 'wartime_soup_break',
            },
          },
          {
            id: 'refused-the-soup',
            w: 0.4,
            text: '{subject}把饭盒推回去，说汤可以不要，午休不能不算。{canteen}压低声音说别让{foreman}听见，{subject}还是把话重复了一遍。下午{subject}的工时被记成“自愿缩短”，晚饭时家里人多看了一眼{subjectPronoun}的空碗。',
            significance: 0.76,
            fx: {
              cash: -2,
              role: 'break_guard',
              relation: ['foreman', 'rival', -0.12, 0],
              flag: 'refused_wartime_soup_break',
            },
          },
        ],
      },
    ],
    baseRate: 0.07,
    cooldownYears: 3,
  },

  // 4. Wage theft: the overtime lines are erased ----------------------------
  {
    id: 'r1-work.erased-overtime',
    title: '被擦掉的三行加班',
    domain: 'work',
    stage: 'adulthood',
    ages: [18, 60],
    tags: ['work', 'wages', 'overtime', 'ledger', 'foreman'],
    contexts: ['industrial', 'urban', 'crisis'],
    milieus: ['factory', 'printshop', 'shop'],
    conditions: [{ kind: 'employment', employed: true }],
    roles: {
      employer: ['organization', { organizationKind: 'factory' }],
      foreman: ['worker', { minAge: 30, maxAge: 65 }],
      clerk: ['worker', { minAge: 20, maxAge: 60 }],
    },
    outcomes: [
      {
        id: 'confronted-with-the-copy',
        w: 0.35,
        text: '{subject}把烟盒背面的钟点抄件摊在{clerk}面前，三行被橡皮擦得发毛的加班又显出来。{clerk}去叫{foreman}，{foreman}说记错了班次，从抽屉里补了五克朗。钱是旧的，边角还沾着机油，{subject}一张张数完才走。',
        significance: 0.76,
        when: { skill: { name: 'numeracy', min: 0.35 } },
        fx: {
          cash: 5,
          role: 'wage_claimant',
          relation: ['foreman', 'rival', -0.1, 0],
          flag: 'recovered_overtime_pay',
          knowledge: ['the time book can be made to show erased hours', 0.85],
        },
      },
      {
        id: 'swallowed-the-short-pay',
        w: 0.4,
        text: '信封比上月薄。{subject}在楼梯间数了两遍，把少掉的三行加班咽回去。回家路上买了两根蜡烛，剩下的钱塞进米缸。夜里{subjectPronoun}梦见自己在钟面上擦字，擦到手指发黑，醒来时枕边还有一股橡皮味。',
        significance: 0.6,
        fx: {
          cash: -4,
          mood: -0.1,
          flag: 'overtime_erased',
        },
      },
      {
        id: 'stole-the-time-book-page',
        w: 0.25,
        text: '趁{clerk}去倒茶，{subject}把考勤簿翻到本月，撕下那三页夹进外套。{foreman}的脚步声从走廊尽头传来，{subject}把外套搭在手臂上，慢慢走回车间。那天下午{subjectPronoun}一直没敢弯腰，纸页在腋下窸窸窣窣地响。',
        significance: 0.7,
        fx: {
          flag: 'stole_timebook_pages',
          knowledge: ['the time book records the erased overtime', 0.9, 'clerk'],
          relation: ['clerk', 'colleague', 0.05, 0],
        },
      },
    ],
    baseRate: 0.06,
    cooldownYears: 3,
  },

  // 5. Piecework: the bamboo tallies do not agree ----------------------------
  {
    id: 'r1-work.piecework-tally',
    title: '竹牌上的件数',
    domain: 'work',
    stage: 'adulthood',
    ages: [16, 60],
    tags: ['work', 'piecework', 'factory', 'tally', 'wages'],
    contexts: ['industrial', 'factory', 'peace'],
    milieus: ['factory', 'printshop'],
    conditions: [{ kind: 'employment', employed: true }],
    roles: {
      employer: ['organization', { organizationKind: 'factory' }],
      foreman: ['worker', { minAge: 30, maxAge: 65 }],
      mate: ['worker', { minAge: 16, maxAge: 58 }],
    },
    outcomes: [
      {
        id: 'won-the-recount',
        w: 0.4,
        text: '{subject}把竹牌从筐底倒出来，十根一捆重数，发现{foreman}把两捆算成了一捆。{foreman}起初说竹牌会掉，{subject}把散落的牌子全摊在秤台上。补发的三克朗是铜币，装在纸上，压得纸都黑了。',
        significance: 0.76,
        when: { skill: { name: 'numeracy', min: 0.4 } },
        fx: {
          cash: 3,
          skill: { numeracy: 0.03 },
          role: 'tally_keeper',
          relation: ['foreman', 'rival', -0.08, 0],
          flag: 'won_piecework_recount',
        },
      },
      {
        id: 'accepted-the-undercount',
        w: 0.35,
        text: '收工时{foreman}报了个整数，{subject}明知少了两捆，还是在本上按了手印。{mate}在旁边低声说下回自己数，{subject}把竹牌踢回筐里，说数了也没用。回家路上，{subjectPronoun}把手插在口袋里，指甲一直掐着掌心。',
        significance: 0.62,
        fx: {
          cash: -2,
          mood: -0.08,
          relation: ['mate', 'colleague', 0.04, 0],
          flag: 'accepted_undercount',
        },
      },
      {
        id: 'stole-a-mates-tally',
        w: 0.25,
        text: '{subject}趁{mate}去喝水，从{mate}的筐里抓了一把竹牌塞进自己的捆里。第二天{mate}被扣了钱，蹲在门口一根根数剩下的牌子；{subject}从旁边走过，口袋里的竹牌硌着大腿，走一步响一下。',
        significance: 0.74,
        fx: {
          cash: 1,
          relation: ['mate', 'rival', -0.18, 0],
          reputation: -0.05,
          flag: 'stole_piecework_tally',
        },
      },
    ],
    variants: [
      {
        id: 'compositors-piece-rate',
        when: { milieuTags: ['print', 'craft'] },
        title: '按千字算钱的排字房',
        roles: {
          master: ['worker', { minAge: 35, maxAge: 70 }],
        },
        outcomes: [
          {
            id: 'counted-the-lines',
            w: 0.55,
            text: '{master}按千字给排字工算钱，{subject}把排好的版心一行行数过，发现{master}少算了三行小字。{subject}没有吵，只把那三行用红笔圈出来放在{master}的茶缸旁。月底工钱多了一克朗，茶缸里的水却凉了。',
            significance: 0.74,
            fx: {
              cash: 1,
              skill: { numeracy: 0.03, literacy: 0.03 },
              role: 'piece_compositor',
              relation: ['master', 'rival', -0.06, 0],
              flag: 'counted_composition_lines',
            },
          },
          {
            id: 'let-the-master-count',
            w: 0.45,
            text: '{master}数版心时把夹注漏了，{subject}看在眼里，没有作声。月底少拿两克朗，{subject}把那页版心留了一份，夹在自己的字典里。以后再排夹注，{subjectPronoun}会先在心里数一遍。',
            significance: 0.66,
            fx: {
              cash: -2,
              skill: { literacy: 0.02 },
              flag: 'master-undercounted-composition',
            },
          },
        ],
      },
    ],
    baseRate: 0.06,
    cooldownYears: 3,
  },

  // 6. Strike vote -----------------------------------------------------------
  {
    id: 'r1-work.strike-vote',
    title: '举起又放下的手',
    domain: 'work',
    stage: 'adulthood',
    ages: [18, 60],
    tags: ['work', 'union', 'strike', 'vote', 'solidarity'],
    contexts: ['industrial', 'crisis', 'reform'],
    milieus: ['union', 'factory'],
    conditions: [{ kind: 'employment', employed: true }],
    roles: {
      union: ['organization', { organizationKind: 'union' }],
      organizer: ['union_member', { minAge: 25, maxAge: 65 }],
      mate: ['worker', { minAge: 18, maxAge: 58 }],
    },
    outcomes: [
      {
        id: 'voted-yes',
        w: 0.4,
        text: '{organizer}把罢工提案念到第二遍，问赞成的人举手。{subject}的手举到一半，看见{mate}盯着自己的饭盒，还是举直了。散会时{organizer}把一张写满班组的纸塞过来，让{subject}明天收齐签名。',
        significance: 0.8,
        when: { hasRole: 'union_member' },
        fx: {
          role: 'strike_committee',
          membership: ['union', true, 'voted for strike action'],
          relation: ['organizer', 'colleague', 0.12, 0],
          flag: 'voted_for_strike',
        },
      },
      {
        id: 'voted-no',
        w: 0.35,
        text: '{subject}没有举手。{organizer}的目光在{subjectPronoun}脸上停了一下，接着念反对的人。{mate}在门口拉住{subject}，说家里有孩子的人不能丢工。回家的路上，两个人谁也没提刚才那一屋子人，只听见鞋底踩过碎煤渣。',
        significance: 0.72,
        fx: {
          relation: ['mate', 'friend', 0.08, 0],
          flag: 'voted_against_strike',
          knowledge: ['the strike vote split the workshop', 0.8],
        },
      },
      {
        id: 'abstained',
        w: 0.25,
        text: '{subject}把手放在膝盖上，既没举也没放下。{organizer}数完票，说少了一票，屋里静得能听见煤炉响。{mate}先站起来走了，{subject}跟着走到门口，被{organizer}叫住问名字，{subjectPronoun}只说了自己的工号。',
        significance: 0.66,
        fx: {
          mood: -0.08,
          flag: 'abstained_from_strike_vote',
          relation: ['organizer', 'acquaintance', 0.04, 0],
        },
      },
    ],
    variants: [
      {
        id: 'repression-at-the-door',
        when: { processKinds: ['political_repression'] },
        title: '门口站着穿制服的人',
        roles: {
          gendarme: ['official', { minAge: 25, maxAge: 60 }],
        },
        outcomes: [
          {
            id: 'voted-under-watch',
            w: 0.55,
            text: '{gendarme}站在工会活动室门口，手按在警棍上，说开会可以，罢工不行。{organizer}把提案念得比上次快，{subject}在举手的间隙看见窗外又来了两个人。票数够了，却没有一个人欢呼，大家把椅子轻轻放回桌下。',
            significance: 0.82,
            fx: {
              role: 'strike_committee',
              membership: ['union', true, 'voted under police watch'],
              relation: ['organizer', 'colleague', 0.08, 0],
              flag: 'voted_under_police_watch',
              knowledge: ['the police recorded the strike vote', 0.85, 'gendarme'],
            },
          },
          {
            id: 'postponed-the-vote',
            w: 0.45,
            text: '{organizer}看见{gendarme}，把提案折回口袋，说今天只讨论互助金。{subject}明白这是缓兵，却也跟着松了口气。散会后{gendarme}记下几个名字，{subject}从后门出去，绕了两条街才回家。',
            significance: 0.72,
            fx: {
              mood: -0.06,
              flag: 'strike_vote_postponed',
              knowledge: ['the union postponed the vote under police pressure', 0.8, 'organizer'],
              condition: 'watchfulness',
            },
          },
        ],
      },
    ],
    baseRate: 0.05,
    cooldownYears: 4,
  },

  // 7. Lockout ---------------------------------------------------------------
  {
    id: 'r1-work.lockout-gate',
    title: '铁链绕过厂门',
    domain: 'work',
    stage: 'adulthood',
    ages: [18, 60],
    tags: ['work', 'lockout', 'factory', 'union', 'hunger'],
    contexts: ['industrial', 'crisis'],
    milieus: ['factory', 'union'],
    conditions: [{ kind: 'employment', employed: true }],
    roles: {
      employer: ['organization', { organizationKind: 'factory' }],
      foreman: ['worker', { minAge: 30, maxAge: 65 }],
      mate: ['worker', { minAge: 18, maxAge: 58 }],
      union: ['organization', { organizationKind: 'union' }],
      gendarme: ['official', { minAge: 25, maxAge: 60 }],
    },
    outcomes: [
      {
        id: 'waited-in-the-rain',
        w: 0.4,
        text: '铁链从门把绕到灯柱，{foreman}站在门里记下每个靠近的人。{subject}和{mate}在雨里等到中午，厂方只递出一张纸，说开工另行通知。{union}的人在街角支起汤锅，{subject}把最后一块面包掰成三份。',
        significance: 0.82,
        fx: {
          unemployment: 'locked out until further notice',
          cash: -3,
          relation: ['mate', 'friend', 0.1, 0.04],
          flag: 'locked_out',
        },
      },
      {
        id: 'helped-at-the-soup-kitchen',
        w: 0.3,
        text: '{subject}没有在门口等，跟着{union}的人去街角支锅。{mate}从家里扛来一袋土豆，{foreman}在门里看着，没有出来。傍晚每人分到一碗汤，{subject}把碗底最后一口留给{mate}的孩子，自己舔了舔勺背。',
        significance: 0.74,
        fx: {
          food: 3,
          cash: 1,
          relation: ['mate', 'friend', 0.12, 0.06],
          membership: ['union', true, 'helped at the lockout soup kitchen'],
          flag: 'fed_at_union_soup_kitchen',
        },
      },
      {
        id: 'pushed-the-gate',
        w: 0.3,
        text: '{subject}和几个年轻人去推铁门，{gendarme}的警棍先落在门闩上，再落在{subject}的肩头。{foreman}在门里喊“别闹”，声音被雨盖住。{mate}把{subject}拖到巷子里，铁链还在响，{subject}的耳朵里也一直响。',
        significance: 0.84,
        fx: {
          health: -0.1,
          condition: 'bruised shoulder',
          cash: -2,
          role: 'lockout_agitator',
          relation: ['gendarme', 'rival', -0.12, 0],
          flag: 'tried_to_break_lockout',
        },
      },
    ],
    baseRate: 0.04,
    cooldownYears: 6,
  },

  // 8. Promotion over a rival ------------------------------------------------
  {
    id: 'r1-work.promotion-rival',
    title: '副工长的空位',
    domain: 'work',
    stage: 'adulthood',
    ages: [22, 55],
    tags: ['work', 'promotion', 'rivalry', 'foreman', 'factory'],
    contexts: ['industrial', 'factory', 'peace', 'crisis'],
    milieus: ['factory', 'printshop'],
    conditions: [{ kind: 'employment', employed: true }],
    roles: {
      employer: ['organization', { organizationKind: 'factory' }],
      foreman: ['worker', { minAge: 30, maxAge: 65 }],
      rival: ['worker', { minAge: 22, maxAge: 55 }],
    },
    outcomes: [
      {
        id: 'promoted-on-measurement',
        w: 0.4,
        text: '{foreman}把两把游标卡尺放在{subject}和{rival}之间，让两人各量一件废件。{subject}报出的数比{rival}准半毫米，{foreman}就在工牌背面写了“副工长”。{rival}把自己的卡尺收进盒子，盒盖合得很重。',
        significance: 0.84,
        when: { skill: { name: 'craft', min: 0.4 } },
        fx: {
          employment: ['employer', 'Vorarbeiter', 38],
          role: 'deputy_foreman',
          relation: ['rival', 'rival', -0.16, 0],
          flag: 'promoted_over_rival',
        },
      },
      {
        id: 'declined-the-badge',
        w: 0.3,
        text: '{subject}把任命书推回去，说{foreman}的班次排得不对，自己上去也是挨骂。{foreman}愣了一下，把纸收进抽屉。{rival}在门口听见，第二天给{subject}带了一包烟，烟盒上还沾着车间的油。',
        significance: 0.72,
        fx: {
          role: 'steady_hand',
          relation: ['rival', 'friend', 0.12, 0.02],
          flag: 'declined_promotion',
        },
      },
      {
        id: 'rival-took-the-badge',
        w: 0.3,
        text: '厂部最终把副工长的袖标给了{rival}。{rival}上任第一天就改了交接班表，把{subject}排到最脏的磷化槽。{subject}没有争，只把自己的卡尺锁进工具箱，钥匙挂在脖子上，走路时一下一下敲着胸口。',
        significance: 0.76,
        fx: {
          relation: ['rival', 'rival', -0.2, 0],
          condition: 'resentment',
          flag: 'passed_over_for_promotion',
        },
      },
    ],
    baseRate: 0.05,
    cooldownYears: 4,
  },

  // 9. Foreman retaliation ---------------------------------------------------
  {
    id: 'r1-work.foreman-retaliation',
    title: '油槽底的碎铁',
    domain: 'work',
    stage: 'adulthood',
    ages: [18, 58],
    tags: ['work', 'foreman', 'retaliation', 'danger', 'factory'],
    contexts: ['industrial', 'factory', 'crisis'],
    milieus: ['factory', 'printshop'],
    conditions: [{ kind: 'employment', employed: true }],
    roles: {
      employer: ['organization', { organizationKind: 'factory' }],
      foreman: ['worker', { minAge: 30, maxAge: 65 }],
      mate: ['worker', { minAge: 18, maxAge: 58 }],
    },
    outcomes: [
      {
        id: 'cleaned-the-sump',
        w: 0.4,
        text: '{foreman}把清理油槽的活派给{subject}，说这是“照顾老手”。槽底积着半尺黑泥，{subject}跪着刮到夜里，膝盖被铁屑磨破。{mate}偷偷递来一瓶煤油，说别让{foreman}看见，{subject}把瓶子塞进围裙，先擦手上的油。',
        significance: 0.74,
        fx: {
          health: -0.08,
          condition: 'oil rash',
          cash: 1,
          relation: ['foreman', 'rival', -0.12, 0],
          flag: 'cleaned_oil_sump',
        },
      },
      {
        id: 'appealed-to-the-office',
        w: 0.35,
        text: '{subject}没有下槽，直接去厂部递了张纸，写明{foreman}把危险活派给不戴护具的人。厂部让{foreman}自己处理，{foreman}笑着把纸折好，第二天照旧派{subject}下槽。{subject}这才明白，纸在厂里绕一圈，最后还会回到派活的人手里。',
        significance: 0.78,
        fx: {
          relation: ['foreman', 'rival', -0.18, 0],
          role: 'complaint_filer',
          cash: -2,
          flag: 'appealed_foreman_retaliation',
          knowledge: ['the factory office returns complaints to the foreman', 0.85],
        },
      },
      {
        id: 'quit-on-the-spot',
        w: 0.25,
        text: '{subject}把围裙挂在钉子上，走出车间时谁也没看。{foreman}在后面说“走了就别回来”，{mate}追到门口塞给{subject}半包烟。到家以后，{subject}才想起工钱还没结，第二天托{mate}去要，{mate}回来说账房让本人来。',
        significance: 0.8,
        fx: {
          unemployment: 'walked off the job after retaliation',
          mood: 0.04,
          cash: -3,
          relation: ['mate', 'friend', 0.08, 0.02],
          flag: 'quit_over_foreman',
        },
      },
    ],
    baseRate: 0.06,
    cooldownYears: 3,
  },

  // 10. Embezzlement temptation ---------------------------------------------
  {
    id: 'r1-work.embezzlement-temptation',
    title: '保险柜里多出的一叠',
    domain: 'commerce',
    stage: 'adulthood',
    ages: [20, 60],
    tags: ['work', 'money', 'temptation', 'office', 'trust'],
    contexts: ['urban', 'industrial', 'peace', 'crisis'],
    milieus: ['shop', 'government', 'factory'],
    conditions: [{ kind: 'employment', employed: true }],
    roles: {
      employer: ['organization', { organizationKind: 'household_firm' }],
      bookkeeper: ['worker', { minAge: 28, maxAge: 65 }],
      auditor: ['official', { minAge: 30, maxAge: 68 }],
    },
    outcomes: [
      {
        id: 'returned-the-difference',
        w: 0.35,
        text: '{subject}把多出的十二克朗重新点了一遍，用纸条捆好放回保险柜，在便笺上写“差额待查”。{bookkeeper}第二天看见便笺，先锁门，再给{subject}倒了杯茶，说这事到此为止。茶杯底下压着两克朗，{subject}没有拿。',
        significance: 0.78,
        when: { minCash: 4 },
        fx: {
          cash: 2,
          role: 'cashier',
          relation: ['bookkeeper', 'friend', 0.14, 0.04],
          flag: 'returned_embezzled_cash',
        },
      },
      {
        id: 'took-the-folded-notes',
        w: 0.35,
        text: '{subject}把十二克朗塞进袜筒，回家路上买了一只烤鸡。夜里听见楼梯响，{subjectPronoun}坐起来两次，把钱换到米缸底下，又换到枕头里。{bookkeeper}第二天问起差额，{subject}说账本本来就乱，说完先去看窗外的雨。',
        significance: 0.84,
        when: { maxCash: 3 },
        fx: {
          cash: 12,
          condition: 'sleepless nights',
          relation: ['bookkeeper', 'rival', -0.1, 0],
          flag: 'embezzled_petty_cash',
        },
      },
      {
        id: 'covered-the-bookkeeper',
        w: 0.3,
        text: '{bookkeeper}承认自己挪了钱给住院的妻子。{subject}没有告发，而是把差额记成“运输损耗”，又从自己工钱里垫了六克朗。{auditor}来查账时，{bookkeeper}的手一直在桌下抖，{subject}把账本翻到那一页，先替{bookkeeper}按住了纸角。',
        significance: 0.74,
        fx: {
          cash: -6,
          relation: ['bookkeeper', 'friend', 0.16, 0.05],
          flag: 'covered_bookkeeper_shortfall',
          knowledge: ['the bookkeeper diverted cash for a hospital bill', 0.9, 'bookkeeper'],
        },
      },
    ],
    baseRate: 0.04,
    cooldownYears: 5,
  },

  // __NEXT_BATCH__
]);
