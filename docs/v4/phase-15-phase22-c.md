# Phase 15 life dossier — phase22-c

Date: 2026-11-08T18:12:40.387Z  |  45 years  |  20668 events  |  312 named persons  |  144 alive  |  84 s

State facts: 5774 events, 3159 ticks, 1470 reactions, 23 transitions. Active 147, ended 1576. Positions 135.

Critique: **pass** — warn:high_repetition.

## Klara

Born 1912.01, died 1937.12 (age 25).
Education: apprenticeship 0; occupation: none; roles: infant, child, factory_helper, workshop_dogsbody, job_seeker, office:公共礼仪官, honest_boxer, chorus_performer, separated, office:部门主管, office:临时主席, movement_member.

### State snapshot
- wish-power [person] (ended 1937.12: owner_died) parameters={"intensity":0.75,"fixation":0.66,"irony":0.3} links={} ticks=0
- p22-family-legend [person] (ended 1918.1: duration expired) parameters={"warmth":70,"secrecy":34,"danger":14,"promise":40} links={} ticks=4
- apprenticeship-contract [person] (ended 1929.1: duration expired) parameters={"progress":60,"failures":0,"trade":"木工","paid":false} links={} ticks=4
- yf18-first-awakening [person] (ended 1927.1: duration expired) parameters={"intensity":50,"nerve":15,"talk":0,"reciprocated":false,"secret":true} links={"beloved":"Lena"} ticks=1
- yf18-first-awakening [person] (ended 1929.1: duration expired) parameters={"intensity":73,"nerve":33,"talk":5,"reciprocated":true,"secret":true} links={"beloved":"Lena"} ticks=3
- fa17-starving-artist [person] (ended 1937.12: owner_died) parameters={"craft":46,"recognition":13,"need":67,"integrity":59} links={} ticks=3
- fa17-muse [person] (ended 1937.12: owner_died) parameters={"inspiration":58,"dependence":51,"credit":10,"autonomy":65} links={"artist":"Josef Lechner 2"} ticks=6

### 115 subject events

- **1912.02** `vienna-life-birth-letter-from-the-dead/the-letter-is-a-bill` tags: infancy, family, secret, letter, drama
  信里没有问候，只有一张旧账单：棺材、墓地、一趟从边境回来的车费。Josef Bauer把账单翻过来，背面用铅笔写着“别让孩子知道”。Klara伸手去抓纸角，Josef Bauer没有让。
  _effects: cash -4 (paid an old funeral debt); flag +family_debt_letter; mood -0.03_

- **1912.03** `p22-comic-name-register::ctx-vienna-1912::milieu-tenement/the-name-is-corrected` tags: infancy, family, bureaucracy, name, official, comic, tender, drama
  Josef Bauer当场发现，要求改回来。登记员叹了口气，收了三克朗，把“嚏”划掉，在旁边写上正确的字，然后把笔搁下；Klara全程睡着，什么也没损失，只是那张纸被折成了四折。
  _effects: cash -3 (fee to correct the register); mood 0.02; flag +name_corrected_

- **1912.04** `p22-comic-christening::ctx-vienna-1912::milieu-tenement/the-priest-sneezes` tags: infancy, family, christening, church, neighbor, comic, tender, drama
  神父念到孩子的名字时打了个大喷嚏，蜡烛灭了，Klara却笑出了声。Hermann Kral赶紧去点蜡烛，手一抖，火苗又灭了；教堂里第一次有人笑，神父也笑了，说这是今天最响的一声阿门。
  _effects: mood 0.04; relation acquaintance with person-phase15-Klara-world-vienna-1912; flag +christening_sneeze; state_add p22-family-legend state:world-vienna-1912:14_

- **1912.04** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Klara家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 10 -> 14; state_parameter p22-family-legend.warmth 70 -> 72; mood 0.01_
  _causes: evt:world-vienna-1912:000098_

- **1913.01** `vienna-life-infant-first-smile/neighbour-warning` tags: infancy, family, first, warm
  隔壁的女人探头进来，说孩子笑得太早，老人讲这不是好兆头。Josef Bauer没有接话，只把Klara往怀里拢了拢；孩子却伸手去抓那女人围裙上的扣子，抓得不肯松。
  _effects: mood -0.010000000000000002; flag +early_smile_omen_

- **1913.01** `state_tick:p22-family-legend/the-story-changes-hands/a-detail-goes-missing` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，故事里最要紧的那件东西不见了：先是名字，后来是地点。Klara问起时，大人说“你记错了”；可柜子最底层那只空盒子，谁也没有扔，锁却换过了，钥匙也不见了。
  _effects: state_parameter p22-family-legend.secrecy 14 -> 18; state_parameter p22-family-legend.danger 5 -> 8; state_parameter p22-family-legend.warmth 72 -> 70; mood -0.01_

- **1913.06** `iw18-infancy.ceiling-shadows::ctx-vienna-1912::milieu-tenement/the-coat-is-just-a-coat` tags: infancy, night, wonder, gaslight, fear, family, vienna, urban
  Josef Bauer把Klara抱起来，走到衣钩下面，让孩子伸手去抓那件旧大衣。粗呢的袖口擦过掌心，Klara先愣住，随后皱着鼻子哭了一声。Josef Bauer笑着把大衣掀开，说“看，只有衣服”，灯影也跟着晃了一下。
  _effects: mood 0.03; flag +learned_the_coat_rack_

- **1914.01** `vienna-life-toddler-wrong-cradle/the-neighbour-is-mistaken` tags: infancy, family, rumour, identity, comic, drama
  Josef Bauer把被子摊在桌上，指着上面的补丁说这是外婆的针脚。Anna Moser看了半天，承认自己认错了；Klara在旁边把一只木勺敲得咚咚响，像在给这场争论判案。
  _effects: relation acquaintance with person-anna-moser; mood 0.019999999999999997; skill_

- **1914.01** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Klara家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 18 -> 22; state_parameter p22-family-legend.warmth 70 -> 72; mood 0.01_
  _causes: evt:world-vienna-1912:000266_

- **1915.01** `vienna-life-child-family-legend/lost-relative` tags: childhood, family, secret, story
  Josef Bauer在收拾箱子时翻出一张没有署名的照片，说那是家里一个“去了很远地方”的人。Klara问还回不回来，Josef Bauer把照片翻过去，说先把名字记住，别在饭桌上问。
  _effects: knowledge “家里有一张没有署名的照片，照片上的人去了很远的地方。”; flag +family_legend_photo; mood -0.01_

- **1915.01** `state_tick:p22-family-legend/the-story-changes-hands/a-detail-goes-missing` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，故事里最要紧的那件东西不见了：先是名字，后来是地点。Klara问起时，大人说“你记错了”；可柜子最底层那只空盒子，谁也没有扔，锁却换过了，钥匙也不见了。
  _effects: state_parameter p22-family-legend.secrecy 22 -> 26; state_parameter p22-family-legend.danger 8 -> 11; state_parameter p22-family-legend.warmth 72 -> 70; mood -0.01_

- **1915.02** `vienna-early-childhood.stairwell-fall/neighbor-carries` tags: childhood, family, home, street, injury
  Emil Weiss的煤桶磕在楼梯转角，煤块滚了一地。Klara坐在平台上，膝盖渗出血珠。Emil Weiss把桶一放，夹起Klara进了自家门，用温水冲伤口，又拿一块干面包塞过来。Josef Bauer赶来时，Klara正坐在厨房凳上啃面包。
  _effects: health -0.020000000000000018 (膝盖擦破，已冲洗); food; relation acquaintance with person-josef-bauer_

- **1916.01** `vienna-life-child-first-friend/imaginary-friend` tags: childhood, friendship, family, comic
  院子里没有别的孩子，Klara给墙上的裂纹起了一个名字，每天吃饭时给它留一个位置。家里的人没有纠正，只在摆碗时多放一只空碗；Lena从门口经过，问Klara在等谁。
  _effects: skill; flag +imaginary_friend; relation friend with person-phase15-Lena-world-vienna-1912_

- **1916.02** `vienna-life-child-inherited-wish/the-dead-grandmothers-wish` tags: childhood, family, wish, grief, uncanny, drama
  Klara在饭桌上忽然说：“等我长大了，要把那间屋子买回来。”Josef Bauer的勺子停在半空，因为这句话是去世多年的外婆常说的，连“那间屋子”都指得一模一样。Klara说完就低头喝汤，好像只是随口。
  _effects: flag +inherited_wish_house; knowledge “孩子说要把“那间屋子”买回来，和去世的外婆说过的一模一样。”; mood -0.010000000000000002_

- **1916.02** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Klara家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 26 -> 30; state_parameter p22-family-legend.warmth 70 -> 72; mood 0.01_
  _causes: evt:world-vienna-1912:000642_

- **1917.01** `state_tick:p22-family-legend/the-story-changes-hands/a-detail-goes-missing` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，故事里最要紧的那件东西不见了：先是名字，后来是地点。Klara问起时，大人说“你记错了”；可柜子最底层那只空盒子，谁也没有扔，锁却换过了，钥匙也不见了。
  _effects: state_parameter p22-family-legend.secrecy 30 -> 34; state_parameter p22-family-legend.danger 11 -> 14; state_parameter p22-family-legend.warmth 72 -> 70; mood -0.01_

- **1917.06** `vienna-childhood-street.hoop/hoop-win` tags: childhood, street, social, home
  巷子窄，两个孩子并排推着铁环，铁环撞在一起叮当作响。Klara的钩子先绕过最后一块界石。Ferdinand Lechner 2不服，说再比一次，手却已经伸进口袋，摸出三颗彩色弹珠。Klara把弹珠举到眼前看，Ferdinand Lechner 2在旁边踢墙，踢得鞋尖发白。
  _effects: relation friend with person-materialized-world-vienna-1912-24; mood 0.05; skill; relation acquaintance with person-materialized-world-vienna-1912-24_

- **1918.01** `state_expire:p22-family-legend` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  Klara的「家族传说」到期；相关安排结束。
  _effects: state_remove p22-family-legend state:world-vienna-1912:14_

- **1918.01** `p9-gap-childhood-chores.mind-sibling/sibling-shelter-missed-river` tags: childhood, household, chores, school, task, daily, sibling, care
  巷口的喊声第二次传来时，Klara正用膝盖压住木盆边沿，给Berta Winter挡穿堂风。Berta Winter在旧布底下翻了个身，Klara立刻停住，等呼吸又匀了才敢动。Josef Bauer推门进来，先看见盆里睡着的Berta Winter，再看见Klara冻红的脚背，把灶上留的汤热了热。
  _effects: mood -0.02; relation kin with person:evt:world-vienna-1912:000062:child; relation kin with person-josef-bauer_

- **1919.01** `p9-gap-childhood-chores.market-line/line-both-families` tags: childhood, household, chores, school, task, daily, market, food
  队伍拐弯时，Luise Kral朝Klara招手。Klara挤过去，替两家把面包领出来，纸包用不同的绳结系住。家里人晚上解开绳结，先掂了掂份量，再问价钱；Klara把每一包的面包数、找零和欠的铜板都说了一遍，家里人听完才把两包分别收进柜子。
  _effects: food; relation acquaintance with person-luise-kral; skill; relation acquaintance with person-materialized-world-vienna-1912-6_

- **1920.01** `p9-gap-childhood-chores.laundry-help/laundry-bread-with-friend` tags: childhood, household, chores, school, task, daily, laundry, work
  两个孩子在院子两头跑，一个递，一个夹，床单在风里鼓起来。最后一条挂好，Karl Kraus从厨房拿出面包，先给了自家孩子，再掰一块给Klara。Klara把面包塞进围裙口袋，回家后放在家里人的碗边，说自己在外面吃过了。
  _effects: food; relation acquaintance with person-karl-kraus; skill; relation acquaintance with person-materialized-world-vienna-1912-7_

- **1921.01** `p9-gap-childhood-chores.market-line/line-half-flour` tags: childhood, household, chores, school, task, daily, market, food
  面粉袋压在胸口，越抱越沉。Klara前面的大婶一直往后靠，Klara就把膝盖顶住对方的篮子，硬留出半步。买到半袋面粉后，Klara的鞋跟留在人堆里，找回来时鞋面全是泥。回家路上布袋换了两次肩，赤脚踩过石板时脚底发麻。
  _effects: food; health -0.020000000000000018 (赤脚走石板路磨伤脚底); skill; relation acquaintance with person-materialized-world-vienna-1912-11_

- **1922.01** `p9-gap-childhood-chores.laundry-help/laundry-three-heller` tags: childhood, household, chores, school, task, daily, laundry, work
  “拽平，别留褶。”Franz Moser在绳子那头喊。Klara踮着脚把床单拉直，碱水把指缝泡得发白。收工时天已经黑了，Franz Moser数了三赫勒，又在围裙上擦干手才递过来。Klara把钱塞进袜筒，回家路上一直攥着，虎口的裂口沾了汗，火辣辣地疼。
  _effects: cash 0.03 (帮邻居晾床单挣的三赫勒); health -0.030000000000000027 (碱水泡手，虎口裂开); relation acquaintance with person-materialized-world-vienna-1912-7; relation acquaintance with person-materialized-world-vienna-1912-17_

- **1922.12** `vienna-childhood-street.market-errand/errand-lost-coin` tags: childhood, street, social, home
  土豆从围裙里滚出来，Klara蹲下去追，手心一松，三枚十克鲁泽的铜板叮叮当当掉在石板路上。两枚捡回来了，最后一枚滚进排水格栅，在铁条下转了个圈。Klara趴下去够，指甲刮在铁条上。回家Josef Bauer数完钱，脸色沉下来，Klara站在桌边不敢动。
  _effects: cash -0.3 (铜板掉进下水道); relation kin with person-josef-bauer; mood -0.06_

- **1923.01** `p9-gap-childhood-chores.market-line/line-both-families` tags: childhood, household, chores, school, task, daily, market, food
  Franz Lechner把Klara拽到队伍前头，往自己身前塞，说“孩子占不了多大地儿”。窗口一次递出两包面包，Klara把邻居那包夹在胳肢窝，自己这包抱在胸前。到Leopoldstädter Zinshaus, gemeinsamer Gang门口，Klara蹲下把两包并排，按Franz Lechner说的份量分开，连找零的铜板也分成两小堆。
  _effects: food; relation acquaintance with person-franz-lechner; skill; relation acquaintance with person-materialized-world-vienna-1912-20_

- **1924.02** `p9-childhood-adolescence.church-club/club-sign-up-hike` tags: adolescence, friendship, identity, work, school, secret, church
  Klara把十赫勒放在桌上的铁皮盒里，翻到歌本最后一页，用铅笔写下自己的名字。Mitzi Bauer 2在后面戳Klara的背，说乡下的草地能躺着听云。
  _effects: cash -10 (青年会远足车费); relation friend with person-materialized-world-vienna-1912-36; mood 0.03; relation acquaintance with person-materialized-world-vienna-1912-36_

- **1924.02** `vienna-youth-threshold.sibling-departure/quarrel-who-leaves` tags: adolescence, school, work, family, transition, injury
  车票只够一个人走，晚饭桌上话越说越大声。Anna Bauer说该自己走，Klara说自己也快够岁数了。母亲把汤勺往锅沿一磕，屋里静下来，最后Klara摔门出去在楼梯上坐了半宿，直到楼上有人喊冷。
  _effects: relation kin with person-anna-bauer; mood -0.07; health -0.030000000000000027 (在冰冷的楼梯上坐到半夜)_

- **1924.10** `r13-turn.exam-failure::ctx-vienna-reform-1930::milieu-tenement::reform-open-secondary/retake-fee` tags: education, exam, failure, school, work, reform, medical, schooling
  成绩单上差两分。Otto Winter 2说可以补考，但要先交一克朗卷子费，还得让Josef Bauer来签字。Josef Bauer在办公室门口把帽子捏变了形，说家里拿不出这份钱。Klara把错题抄到烟盒背面，第二天照样去上课，只是不再举手。
  _effects: cash -1 (落榜名单上的第三个名字); mood -0.14999999999999997; condition; flag +failed_entrance_exam; skill; relation guardian with person-josef-bauer; relation acquaintance with person-materialized-world-vienna-1912-16_

- **1925.01** `r13-edu.school-transfer::ctx-vienna-reform-1930::milieu-tenement/transfer-approved` tags: education, school, transfer, bureaucracy, family, reform, medical, schooling
  Klara的转学材料缺一张居住证明，Josef Berg让Klara去区公所补。Klara跑了三趟，第三趟正赶上下雨，Josef Berg看见Klara把湿透的纸一张张摊在柜台上，没再挑毛病，盖了章。Klara赶在开学前一天把名字写进新学校。那间教室在二楼，Klara第一天就找到了靠窗的座位，把旧课本摆好。
  _effects: flag +school_transfer_approved; relation acquaintance with person-materialized-world-vienna-1912-9_

- **1925.02** `r14-edu.leaving-school::ctx-vienna-reform-1930::milieu-tenement/sent-to-factory` tags: education, school_dropout, child_labour, poverty, reform, medical, schooling, home
  Josef Bauer把Klara的书包从钉子上取下来，说厂里招装订工，明天就去。Josef Lechner 2傍晚来家里，站在门口劝了半个钟头，Josef Bauer只说灶上还坐着锅。第二天清早，Klara穿着改短的围裙出门，书包留在门后，里面还有半块橡皮。头一个月工钱三克朗。
  _effects: cash 3 (书包挂在门后的钉子上); flag +left_school_for_factory; role; education none_

- **1925.02** `r15-work.master-takes-on::ctx-vienna-reform-1930::milieu-tenement/unpaid-trial` tags: work, craft, apprentice, trade, poverty, reform, medical, schooling
  Anna Huber先说试三个月，不给工钱，只管一顿午饭。家里同意了，因为多一张嘴比多一双手更难。Klara每天最早到，最晚走，三个月后师傅才把契约拿出来。
  _effects: food; mood -0.03999999999999998; state_add apprenticeship-contract state:world-vienna-1912:192; relation acquaintance with person-materialized-world-vienna-1912-21; education apprenticeship; role_

- **1925.08** `r13-turn.exam-failure::ctx-vienna-reform-1930::milieu-tenement::reform-open-secondary/name-missing` tags: education, exam, failure, school, work, reform, medical, schooling
  补考那天，Klara在考场门口等到钟响，监考说名单上没有名字。Grete Stein跑去教务处，回来时手里只有一张转学建议。Klara去了印刷厂当学徒，师傅说铅字比字母好认，至少不会骗人。
  _effects: condition; flag +left_school_after_exam_failure; relation colleague with person-grete-stein; education apprenticeship_

- **1925.12** `r13-turn.school-leaving::ctx-vienna-reform-1930::milieu-tenement::reform-leaving-age/signed-apprenticeship` tags: education, school, work, family, transition, reform, medical, schooling
  毕业钟敲过三下，Josef Lechner 2把成绩单按在讲台上，说Klara还能再读一年，只要家里肯出四克朗。家里人在走廊里把学徒契约展开，纸角还带着面粉。Klara签了名，第二天就站到刨床前，手指上多了第一道木刺。
  _effects: cash -2 (毕业钟响过以后); flag +left_school_for_apprenticeship; education apprenticeship_

- **1926.01** `state_tick:apprenticeship-contract/workshop-year/learned` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Klara又学会了一道工序。师傅没有夸，只把下一块料推到面前。
  _effects: state_parameter apprenticeship-contract.progress 8 -> 28; skill; mood 0.01999999999999999_

- **1926.01** `r14-edu.tutoring-sibling::ctx-vienna-reform-1930::milieu-tenement/sibling-resented-drilling` tags: education, tutored_sibling, family, tutoring, reform, medical, schooling, home
  Berta Winter把铅笔一摔，说再也不想看见豆子。Klara把豆子一颗颗收进碗里，说随你。那天晚上，Berta Winter自己把错题改了一遍，改完把本子推到Klara面前，不说话。Klara看了一遍，在页角画了一个很小的勾。
  _effects: flag +sibling_resented_tutoring; relation rival with person:evt:world-vienna-1912:000062:child_

- **1926.02** `yf18-body.danube-cabin::ctx-vienna-reform-1930::milieu-tenement/wade-in-first` tags: body, desire, river, swimming, shame, first_love, reform, medical
  多瑙河的浴棚按男女分开，木板缝里能看见对面的人影。Klara穿着借来的毛线泳衣，站在第三间门口不敢下水；Lena从水里冒出来，头发贴在额头上，说水不冷。Klara走进河里时，满脑子都是自己肋骨上那道疤。
  _effects: state_add yf18-first-awakening state:world-vienna-1912:193; relation friend with person-phase15-Lena-world-vienna-1912; mood 0.03; flag +yf18_first_awakening_active_

- **1926.10** `kernel-edu.friendship::ctx-vienna-reform-1930::milieu-tenement/edu-friend-moves-away` tags: adolescence, school, friendship, books, family, reform, medical, schooling
  Emil的父亲在车站找到活，全家要搬去另一区。临走前，Emil把一本旧书塞给Klara，扉页上写着地址。Klara把书读完，按地址写了信，信被退回来，上面盖着“查无此人”。那本旧书Klara一直留在书架上。
  _effects: knowledge “朋友搬走前留下的地址已经找不到人了。”; skill; flag +friend_moved_away; mood -0.04999999999999999_

- **1926.11** `state_reaction:wish-power/power-humiliation` tags: wish-power, wish, wish:power, power, status, ambition, state, state_reaction
  Klara把那句轻视记了很久。它没有变成一个决定，但也没有消失。
  _effects: mood -0.03999999999999998; flag +wish:power:wounded_
  _causes: evt:world-vienna-1912:003296_

- **1926.11** `yf18-body.danube-cabin::ctx-vienna-reform-1930::milieu-tenement/wade-in-first` tags: body, desire, river, swimming, shame, first_love, reform, medical
  多瑙河的浴棚按男女分开，木板缝里能看见对面的人影。Klara穿着借来的毛线泳衣，站在第三间门口不敢下水；Lena从水里冒出来，头发贴在额头上，说水不冷。Klara走进河里时，满脑子都是自己肋骨上那道疤。
  _effects: state_add yf18-first-awakening state:world-vienna-1912:255; health 0.020000000000000018 (cold river water and a long swim); relation friend with person-phase15-Lena-world-vienna-1912; mood 0.030000000000000027_

- **1927.01** `yf18-apprentice.press-guard::ctx-vienna-reform-1930::milieu-tenement/tie-the-sleeve-and-work` tags: apprenticeship, work, danger, machine, injury, refusal, reform, medical
  Klara把袖口卷到肘上，用麻绳扎紧，替Buchdruckerei Winter & Söhne把一叠纸送进压印机。前两百张很顺，第二百零一张时，纸角卡住，Klara伸手去拨，机器没有停；等Josef Lechner 2拉开Klara，食指的指甲已经翻了起来。
  _effects: health -0.07999999999999996 (a hand caught in an unguarded press); condition; state_parameter apprenticeship-contract.progress 28 -> 20; cash -2 (a doctor and a bandage); flag +yf18_press_injury; mood -0.04999999999999999; relation acquaintance with person-materialized-world-vienna-1912-18_

- **1927.01** `state_tick:apprenticeship-contract/workshop-year/learned` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Klara又学会了一道工序。师傅没有夸，只把下一块料推到面前。
  _effects: state_parameter apprenticeship-contract.progress 20 -> 40; skill; mood 0.020000000000000018_

- **1927.01** `state_expire:yf18-first-awakening` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Klara的「第一次心动」到期；相关安排结束。
  _effects: state_remove yf18-first-awakening state:world-vienna-1912:193; flag -yf18_first_awakening_active_

- **1927.01** `state_tick:yf18-first-awakening/half-year-of-glances/answered-glance` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Klara在教堂门口或学校走廊里又遇见Lena。这一次对方先点了头，Klara准备好的整段话全忘了，只把手里的书换到另一只手上；回家后Klara才发现，自己把书拿倒了。
  _effects: state_parameter yf18-first-awakening.intensity 55 -> 60; state_parameter yf18-first-awakening.nerve 7 -> 15; state_parameter yf18-first-awakening.reciprocated false -> true; relation friend with person-phase15-Lena-world-vienna-1912; mood 0.030000000000000027_

- **1927.01** `r13-civ.vaccination::ctx-vienna-reform-1930::milieu-tenement::r13-civ.vaccination-reform/reform-class-vaccinated` tags: health, vaccination, school, parent, public_health, reform, medical, schooling
  Friedrich Weiss让全班按座位排队，Alois Moser在讲台边摆开酒精瓶和针盒。轮到Klara时，Friedrich Weiss替她把袖子卷好，说别怕，去年他自己也种过。下课后，黑板上还留着一行没擦掉的日期。
  _effects: health 0.050000000000000044 (种痘室门口的袖子); condition; flag +vaccinated_in_school_campaign; relation acquaintance with person-materialized-world-vienna-1912-38; relation acquaintance with person-materialized-world-vienna-1912-38_

- **1927.02** `yf18-firstlook.parish-dance::ctx-vienna-reform-1930::milieu-tenement/friend-cuts-in` tags: first_love, dance, church, courtship, jealousy, reform, medical, schooling
  Anton在第二支曲子前把Emil请走，说Klara答应过要替她看管外套。Klara抱着一件不属于自己的大衣站在圣像下面，看他们在蜡烛光里转圈；回家路上，Klara把舞卡撕成小片，扔进多瑙运河。
  _effects: state_parameter yf18-first-awakening.intensity 50 -> 55; state_parameter yf18-first-awakening.nerve 15 -> 7; state_parameter yf18-first-awakening.talk 0 -> 5; relation friend with person-phase15-Emil-world-vienna-1912; mood -0.03999999999999998_

- **1927.04** `r1-cul.fan-letter::ctx-vienna-reform-1930::milieu-tenement/hid-letter-in-bookshop` tags: culture, letters, fandom, literacy, ambition, reform, medical, schooling
  Klara没有寄信，把信塞进Hermann Winter常去的书店，夹在一本旧书里。三个月后，书被卖掉，信也不见了；Luise Kral说那家书店上个月清过仓，旧书论斤卖。Klara去废纸站找了一下午，只找到半张写着我不敢寄的纸。
  _effects: cash -1 (寄给作者的信); mood -0.1; condition; flag +hid_letter_in_bookshop; knowledge “the bookshop sold its old stock by weight”; relation acquaintance with person-materialized-world-vienna-1912-44_

- **1927.08** `yf18-politics.latin-pamphlet::ctx-vienna-reform-1930::milieu-tenement/pass-it-on` tags: politics, school, pamphlet, censorship, awakening, reform, medical, schooling
  Josef Lechner 2把一本拉丁文课本推到Klara面前，说第三十四页的译文错了。Klara翻到那一页，夹在里面的是一张油印纸，写着面粉配给和工厂检查的数字。放学后，Klara把纸抄了一遍，塞进Josef的历史作业本；那天晚上，Klara第一次觉得自己住的街区有一张看不见的地图。
  _effects: knowledge “配给数字与官方公告并不一致”; flag +yf18_read_pamphlet; relation acquaintance with person-materialized-world-vienna-1912-11; mood 0.03; relation acquaintance with person-materialized-world-vienna-1912-51_

- **1927.12** `r1-fam.sibling-rivalry::ctx-vienna-reform-1930::milieu-tenement/rivalry.neither` tags: family, siblings, rivalry, apprenticeship, craft, reform, medical, schooling
  Hermann Winter看了看兄弟俩的手，说两个人的指节都不够硬，谁也不收。Josef Bauer求了半天，Hermann Winter答应让两人一起干杂活，管饭不给钱。Emil干了三天就走了，Klara留下来扫地、磨刀，磨到第六个月，Hermann Winter才让她碰第一块好木料。
  _effects: cash 1 (同一把刨子); flag +worked_up_from_dogsbody; role; skill_

- **1928.01** `yf18-firstlook.parish-dance::ctx-vienna-reform-1930::milieu-tenement/the-second-dance` tags: first_love, dance, church, courtship, jealousy, reform, medical, schooling
  舞卡上第一支曲子被Josef写走了。Klara在教会礼堂的木地板上踩错了两步，Josef说没关系，把手放回Klara背后；第三支曲子响起时，Anton在门口冲Klara比了个手势，Klara假装没看见。
  _effects: state_parameter yf18-first-awakening.intensity 60 -> 68; state_parameter yf18-first-awakening.nerve 15 -> 25; state_parameter yf18-first-awakening.reciprocated true -> true; mood 0.03999999999999998_

- **1928.01** `state_tick:apprenticeship-contract/workshop-year/learned` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Klara又学会了一道工序。师傅没有夸，只把下一块料推到面前。
  _effects: state_parameter apprenticeship-contract.progress 40 -> 60; skill; mood 0.020000000000000018_

- **1928.01** `state_tick:yf18-first-awakening/half-year-of-glances/answered-glance` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Klara在教堂门口或学校走廊里又遇见Lena。这一次对方先点了头，Klara准备好的整段话全忘了，只把手里的书换到另一只手上；回家后Klara才发现，自己把书拿倒了。
  _effects: state_parameter yf18-first-awakening.intensity 68 -> 73; state_parameter yf18-first-awakening.nerve 25 -> 33; state_parameter yf18-first-awakening.reciprocated true -> true; relation friend with person-phase15-Lena-world-vienna-1912; mood 0.030000000000000027_

- **1928.01** `p9-childhood-apprenticeship.cover-for-sibling/delivery-paid` tags: adolescence, work, apprenticeship, labour, training, family, task, task:family
  床单叠成四方，压得筐绳勒进肩膀。Klara照着地址找到利奥波德城的两户人家，一户在院子深处，一户要上四层楼。按件算下来是一克朗六十赫勒，Klara把铜币一枚枚码在Josef枕边。Gustav Stein在门口看见，只说“下回别敲错门”；家里省下的那份晚饭，让Josef多歇了一天。
  _effects: cash 1.6 (替妹妹送床单的计件工钱); health -0.030000000000000027 (背着湿床单走了几个街区); relation kin with person-phase15-Josef-world-vienna-1912; food; relation acquaintance with person-materialized-world-vienna-1912-52_

- **1928.07** `yf18-friend.inkwell::ctx-vienna-reform-1930::milieu-tenement/deny-everything` tags: exam, cheating, friendship, betrayal, school, reform, medical, schooling
  Grete Stein把Klara和Anton一起叫到讲台前，问墨水瓶底下的公式是谁写的。Klara说不知道；Anton低着头，袖口还沾着同样的蓝墨水。Grete Stein让两人各写一份检讨，Klara写到一半，听见Anton在旁边小声说“对不起”，笔尖把纸戳破了。
  _effects: reputation -0.03; flag +yf18_exam_suspicion; mood -0.03999999999999998_

- **1929.01** `state_expire:apprenticeship-contract` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick, state:apprenticeship-contract
  Klara的「学徒契约」到期；相关安排结束。
  _effects: state_remove apprenticeship-contract state:world-vienna-1912:192; role_

- **1929.01** `state_expire:yf18-first-awakening` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Klara的「第一次心动」到期；相关安排结束。
  _effects: state_remove yf18-first-awakening state:world-vienna-1912:255_

- **1929.01** `r13-civ.learn-instrument::ctx-vienna-reform-1930::milieu-tenement/teacher-left` tags: culture, music, instrument, learning, craft, reform, medical, schooling
  Grete Stein教了三周，忽然说要去外地，把琴谱留给Klara，却没提退学费。Klara抱着琴站在门口，听见楼上的钢琴声一遍遍弹同一段练习曲。
  _effects: mood -0.06; flag +music_teacher_left; skill_

- **1930.01** `major-work-first-employment/turned-away` tags: work, employment, unemployment, major
  Buchdruckerei Winter & Söhne的工头翻完工票，问Klara上一个东家是谁。Klara说厂子关了，工头又问有没有辞工证明；没有证明，名册就不能写。后面的人挤上来，Klara被推到台阶下面。中午的钟响了，Klara站在街对面，看新来的人把名字一个个写上去。
  _effects: cash -2 (carfare and waiting); reputation -0.03; flag +no_work_references; role; mood -0.07; relation acquaintance with person-materialized-world-vienna-1912-61; relation acquaintance with person-materialized-world-vienna-1912-61_

- **1930.01** `vienna-family-courtship/wait-for-a-better-year` tags: family, courtship, household, social, lifecycle
  Klara把话咽回去，只说等明年工钱稳一点再谈。Otto Winter没有追问，两人把桌上的面包分完，各自去上工；出门时Klara回头看了一眼，Otto Winter正把掉在桌上的面包屑拢进掌心，谁也没有把那个话头重新拾起来。
  _effects: relation acquaintance with person-otto-winter_

- **1930.01** `absurd15-wish.crown-for-a-day::ctx-vienna-reform-1930::milieu-tenement/the-delegation-never-comes` tags: wish, power, crown, office, irony, festival, reform, medical
  Klara等了一整天，代表团没有来。傍晚，Klara在窗户里看见游行队伍从街口经过，新的“国王”骑着借来的白马，朝人群挥手。Klara把订做的戏服退掉，押金没有拿回来。
  _effects: cash -2 (订做戏服的押金); mood -0.03999999999999998; flag +wish_crown_failed; relation acquaintance with person-materialized-world-vienna-1912-53_

- **1930.01** `state_reaction:wish-power/power-office` tags: wish-power, wish, wish:power, power, status, ambition, state, state_reaction
  Klara坐在那张有权力的桌子后面，签下自己的名字。愿望没有因此变近，但桌上的纸张、印章和等待回话的人，都变得具体了。
  _effects: reputation 0.06; flag +wish:power:has_tasted_office_
  _causes: evt:world-vienna-1912:004728_

- **1930.01** `r13-fam.arrange-childcare::ctx-vienna-reform-1930::milieu-tenement/childcare-arranged` tags: task, care, childcare, work, neighbor, wages, reform, medical
  Klara天没亮就把Mitzi Kral裹好，抱到楼下Alois Lechner家。Alois Lechner接过孩子，先摸了摸尿布，又指给Klara看灶上温着的米汤。Klara把一星期的工钱数出一份放在柜上，Alois Lechner数也没数就收进围裙；出门时，Klara听见孩子在屋里哭了一声，又停了。
  _effects: cash -2 (上工前把小的送下楼); condition; flag +arranged_daily_childcare; relation acquaintance with person-alois-lechner; knowledge “the minder keeps a pot of rice water on the stove”_

- **1930.02** `p9-gap-adult-unemployed.soup-kitchen/soup-got-scoop` tags: adulthood, unemployment, casual_labour, poverty, daily, relief, food, church
  风从教堂的拱廊里灌过来，队伍里没人说话，只听见罐子碰罐子的声音。Alois Kral 2排在前面，领完没走，站在墙根等Klara，把自己的面包掰了一半递过去。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-60_

- **1930.09** `r2-leisure.boxing-bout::ctx-vienna-reform-1930::milieu-tenement/refused-the-dive` tags: leisure, boxing, fix, violence, debt, reform, medical, schooling
  Klara没有倒。第九回合还剩四十秒，Klara把Gustav Huber逼到绳圈角，连续三拳打在他护齿上。Friedrich Weiss在台下砸了毛巾，Allgemeines Krankenhaus Wien站起来又坐下。终场铃响时，裁判举起Klara的手，观众却有一半在骂。
  _effects: cash 4 (第九回合的软拳); health -0.06000000000000005 (第九回合的软拳); reputation 0.08; flag +refused_to_take_dive; role; relation rival with person-materialized-world-vienna-1912-38; relation rival with person-materialized-world-vienna-1912-74; relation acquaintance with person-materialized-world-vienna-1912-74_

- **1931.01** `major-family.proposal-refused/proposal-refused.wait-for-the-brother` tags: family, courtship, refusal, major, lifecycle
  Josef Kral 2把话说得很慢：母亲还在，弟弟的学徒期还有三年。Klara点头，把准备好的结婚证词折起来放回口袋，那是借教堂的旧纸写的。两人在电车站分开，约好明年复活节再谈。Josef Kral 2上车前替母亲拢了拢披肩，没有回头看。
  _effects: relation friend with person-materialized-world-vienna-1912-76; flag +engagement_postponed; cash -1 (tram fare to the meeting); relation acquaintance with person-materialized-world-vienna-1912-76_

- **1931.01** `vienna-family-courtship/ask-to-share-a-home` tags: family, courtship, household, social, lifecycle
  Klara在Leopoldstädter Zinshaus, gemeinsamer Gang靠窗的桌边，把一只空咖啡杯转了半圈，说房租两人合付、桌子两人共用。Josef Kral 2的手停在糖罐盖上，问了一句“要是过不下去呢”，没有当场答应，只说要想一想；杯里的咖啡凉了，话还悬在桌面上。
  _effects: interaction_

- **1931.01** `absurd15-wish.crown-for-a-day::ctx-vienna-reform-1930::milieu-tenement/real-tiny-office` tags: wish, power, crown, office, irony, festival, reform, medical
  一个市民代表团真的来到Klara门口，带来一份任命书：公共礼仪官，负责节庆、吊唁和接待。职位不大，薪水也不高，但上面有印章，有任期，有一间可以锁门的办公室。Klara把任命书读了三遍，才确认这不是戏票。
  _effects: organization_found 市民礼仪处 (state); position 公共礼仪官 @org:absurd15-wish-office:evt:world-vienna-1912:005268; reputation 0.08; mood 0.04999999999999999; relation acquaintance with person-materialized-world-vienna-1912-48_

- **1931.01** `p9-social-daily-culture.pictures-or-concert/p9-social-daily-culture.pictures-or-concert.box-seat` tags: daily, culture, leisure, cafe, music, walk, task, task:culture
  Klara咬牙买了音乐厅楼座的票，两克朗五十赫勒，又向人借来一件硬领衬衫，领子磨得后颈发红。演奏到慢板时，Klara手心里的汗把节目单边角浸软，却连咳嗽都憋着，生怕在周围体面人中间出声。散场后Berta Winter等在门口，问值不值，Klara只把节目单折好收进口袋。
  _effects: cash -2.5 (音乐厅楼座票价); mood 0.08000000000000002; reputation 0.01999999999999999; skill_

- **1931.07** `fa17-cabaret.debut::ctx-klosterneuburg-rural-1912::milieu-tenement/small-part` tags: art, performance, cabaret, debut, reputation, failure, theatre, rural
  Josef Lechner 2只给了Klara三句台词和一个端盘子的动作。排练时，Klara把那三句念得太用力，导演让重来，说“你不是在演一个端盘子的人，你是在演一个怕被看见的人”。首演后没有人记住Klara，但乐队指挥记住了Klara每次上台前都在后台数拍子。
  _effects: state_add fa17-starving-artist state:world-vienna-1912:519; cash 1 (小角色的排练补贴); role; mood -0.020000000000000018; flag +debut_small_part; state_add fa17-muse state:world-vienna-1912:520; relation acquaintance with person-materialized-world-vienna-1912-45_

- **1931.09** `vienna-family-same-sex-female/private-household` tags: family, intimacy, same_sex, housing, lifecycle, partnership, household
  Klara和Luise Weiss合租一间房，对外说是表姐妹。两人共用一只炉子、一本账和一张床，白天各自上工，晚上把门闩好；房租从两人的工钱里各出一半，日子紧，却比各自的旧住处暖，窗台上还并排晾着两只杯子。
  _effects: relation partner with person-materialized-world-vienna-1912-10; household; mood 0.06; relation acquaintance with person-materialized-world-vienna-1912-10_

- **1932.01** `interaction_response` tags: interaction
  Josef Kral 2没有答应，只说现在不合适。Klara把这件事收回去，之后见面仍点头。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-76; interaction_
  _causes: evt:world-vienna-1912:005267_

- **1932.01** `r14-edu.sibling-exam::ctx-vienna-reform-1930::milieu-tenement/sibling-passed` tags: education, tutored_sibling, family, exam, reform, medical, schooling, home
  Berta Winter从考场出来，手里攥着准考证，说最后一道题做出来了。放榜那天，Klara陪Berta Winter去看榜，名字在中间偏下，够了。Berta Winter跳起来，又立刻站好，回头问Klara能不能把旧课本留下。报名费两克朗，Klara替Berta Winter交了。
  _effects: cash -2 (弟弟妹妹的准考证); flag +sibling_passed_exam; relation kin with person:evt:world-vienna-1912:000062:child_
  _causes: evt:world-vienna-1912:003072_

- **1932.01** `vienna-family-courtship/ask-to-share-a-home` tags: family, courtship, household, social, lifecycle
  Klara在Haus der Tante in Klosterneuburg靠窗的桌边，把一只空咖啡杯转了半圈，说房租两人合付、桌子两人共用。Ferdinand Lechner 2的手停在糖罐盖上，问了一句“要是过不下去呢”，没有当场答应，只说要想一想；杯里的咖啡凉了，话还悬在桌面上。
  _effects: interaction_

- **1932.01** `absurd15-wish.crown-for-a-day::ctx-klosterneuburg-rural-1912::milieu-tenement/real-tiny-office` tags: wish, power, crown, office, irony, festival, rural, agriculture
  一个市民代表团真的来到Klara门口，带来一份任命书：公共礼仪官，负责节庆、吊唁和接待。职位不大，薪水也不高，但上面有印章，有任期，有一间可以锁门的办公室。Klara把任命书读了三遍，才确认这不是戏票。
  _effects: organization_found 市民礼仪处 (state); position 公共礼仪官 @org:absurd15-wish-office:evt:world-vienna-1912:005828; reputation 0.08000000000000002; mood 0.04999999999999999_

- **1932.01** `state_tick:fa17-starving-artist/rent-and-pages/a-year-of-work` tags: fa17-starving-artist, art, craft, poverty, recognition, work, pride, ambition
  又一年过去，Klara把房租、颜料和纸张的钱分开写在一张账单背面。作品没有卖出去几件，但手上的线条比去年稳；夜里，Klara把一盏煤气灯移到画架最近的地方，继续修改同一个角落。
  _effects: state_parameter fa17-starving-artist.craft 42 -> 46; state_parameter fa17-starving-artist.recognition 12 -> 15; state_parameter fa17-starving-artist.need 55 -> 53; cash 1 (一张小画的价钱); mood 0.020000000000000018_

- **1932.01** `state_tick:fa17-muse/the-sitting-year/set-a-boundary` tags: fa17-muse, muse, art, desire, inspiration, dependence, vulnerability, beauty
  又一年过去，Klara学会了在进画室前先问清楚这次要坐多久、画完给谁看。Josef Lechner 2嫌Klara变得难安排，却也不得不把每次画像的时间写在纸上；那张纸后来被Klara收进了自己的抽屉。
  _effects: state_parameter fa17-muse.autonomy 55 -> 60; state_parameter fa17-muse.credit 10 -> 14; state_parameter fa17-muse.dependence 35 -> 31; mood 0.030000000000000027_

- **1932.01** `p9-social-relationship-initiative.cut-the-guarantee/settle-at-the-tavern` tags: courtship, friendship, family, social, initiative, housing, task, task:social
  没有签字，陪对方去酒馆把账当面谈清。掌柜的把欠条一张张摆在桌上，一共二十八克朗。有人替着说了几句好话，讲明利息怎么算、按月还多少，请掌柜的宽限到月底。谈下来先还五克朗，余下的立了新据，担保人一栏空着，掌柜的临走时瞪了一眼。
  _effects: cash -1.2 (酒馆里替对方先垫的第一笔款子和两杯酒); relation friend with person-materialized-world-vienna-1912-12; reputation -0.01999999999999999; mood 0.01999999999999999; relation acquaintance with person-materialized-world-vienna-1912-12_

- **1932.07** `vienna-tenement-neighbors.laundry_line_dispute/neighbor_yanks_clothes` tags: home, social, family, housing
  Luise Kral嫌Klara的床单滴水滴到Luise Kral家衬衫上，一把扯下床单扔在院子的石板上。Klara下楼捡起来时，床单角沾了泥，重洗又要费肥皂。两人在院子当中对喊，楼上有人推开窗看热闹。Klara把床单重新搭上绳子时，故意把水拧在Luise Kral那侧。
  _effects: relation rival with person-luise-kral; cash -0.15 (重洗床单的肥皂钱（其中0.15克朗记入债务）)_

- **1933.01** `interaction_response` tags: interaction
  Ferdinand Lechner 2没有答应，只说现在不合适。Klara把这件事收回去，之后见面仍点头。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-24; interaction_
  _causes: evt:world-vienna-1912:005827_

- **1933.01** `vienna-family-divorce/partner-moves-to-shared-housing` tags: family, marriage, divorce, housing, lifecycle, separation, household
  Luise Weiss把一只箱子和工票搬去合租房，带走一半锅碗。Klara留在Leopoldstädter Zinshaus, gemeinsamer Gang，把空出来的床租给一个学徒，用租金补房租；搬家花掉四克朗，Klara在户籍上成了分居的人，夜里听见隔壁床板响，总要愣一下。
  _effects: relation_end partner with person-materialized-world-vienna-1912-10; household; cash -4 (moving and separate goods（其中4克朗记入债务）); mood -0.060000000000000026; role_

- **1933.01** `vienna-family-courtship/ask-to-share-a-home` tags: family, courtship, household, social, lifecycle
  Klara在Leopoldstädter Zinshaus, gemeinsamer Gang靠窗的桌边，把一只空咖啡杯转了半圈，说房租两人合付、桌子两人共用。Gustav Huber的手停在糖罐盖上，问了一句“要是过不下去呢”，没有当场答应，只说要想一想；杯里的咖啡凉了，话还悬在桌面上。
  _effects: interaction_

- **1933.01** `r15-wish.power-offer::ctx-vienna-reform-1930::milieu-tenement/real-appointment` tags: politics, power, wish, office, status, reform, medical, schooling
  Maria Berg把一份任命书推到Klara面前。职位不大，但有印章、有预算、有能签字的地方。Klara签下名字时，第一次觉得那件一直想着的事有了一个可以摸到的边。
  _effects: reputation 0.11999999999999997; position 部门主管 @org-sdap_

- **1933.01** `state_tick:fa17-muse/the-sitting-year/absorbed-again` tags: fa17-muse, muse, art, desire, inspiration, dependence, vulnerability, beauty
  画室的门一关，时间就又变成Josef Lechner 2的。Klara坐在同一把椅子上，听见窗外电车经过，数到第七次才被允许动一下；回家路上，Klara发现自己的围巾上沾着一股松节油味，洗了两次也没掉。
  _effects: state_parameter fa17-muse.dependence 31 -> 37; state_parameter fa17-muse.inspiration 50 -> 52; state_parameter fa17-muse.credit 14 -> 12; mood -0.030000000000000027_

- **1933.01** `agency:organize_meeting` tags: agency, agency:organize_meeting
  Klara在Arbeiter-Zeitung im Vorwärts-Haus召集了一次小范围会议，和Emil Weiss把下一次行动、会费和分工写在纸上。
  _effects: project; historical development:seed-vienna-social-democracy-1912 as organizer; historical_influence; knowledge “我召集了一次关于维也纳社会民主党在工人街区、工会和报刊网络中持续活动，争取普选、劳动保护与社会救的会议。”; relation colleague with person-emil-weiss; reputation 0.020000000000000018_

- **1933.01** `initiative:found_process:org-sdap`
  Sozialdemokratische Arbeiterpartei Österreichs (SDAP)在Arbeiter-Zeitung im Vorwärts-Haus经过数年的招募、会议和互助，把分散的行动整理成公开纲领；这不是预先写好的历史，而是成员自己累积出来的运动。
  _effects: historical process Sozialdemokratische Arbeiterpartei Österreichs (SDAP)的持续运动; historical development:initiative-org-sdap-1933 as organizer; historical development:initiative-org-sdap-1933 as organizer; historical development:initiative-org-sdap-1933 as organizer; historical development:initiative-org-sdap-1933 as organizer; historical development:initiative-org-sdap-1933 as organizer; knowledge “Sozialdemokratische Arbeiterpartei Österreichs (SDAP)的持续运动不是”; reputation 0.03999999999999998_

- **1933.01** `historical_phase`
  历史进程《Sozialdemokratische Arbeiterpartei Österreichs (SDAP)在Arbeiter-Zeitung im Vorwär》从 emerging 进入 mobilizing。
  _effects: knowledge “我亲历或知晓「Sozialdemokratische Arbeiterpartei Österreichs (SDAP)”; knowledge “我亲历或知晓「Sozialdemokratische Arbeiterpartei Österreichs (SDAP)”; knowledge “我亲历或知晓「Sozialdemokratische Arbeiterpartei Österreichs (SDAP)”; knowledge “我亲历或知晓「Sozialdemokratische Arbeiterpartei Österreichs (SDAP)”; knowledge “我亲历或知晓「Sozialdemokratische Arbeiterpartei Österreichs (SDAP)”_
  _causes: evt:world-vienna-1912:006698_

- **1933.04** `vienna-market-debt.rent-arrears/rent-sell-furniture-move` tags: market, debt, money, home, shop
  邻居用麻绳把锅和铺盖捆在一起，打了个死结。他说城南有更便宜的屋子，但离厂远。你蹲在地上把最后几件衣服塞进布袋，听见看门人在楼下把垃圾桶挪来挪去。
  _effects: cash 2.8 (卖旧家具所得); mood -0.06; relation acquaintance with person-materialized-world-vienna-1912-67; relation acquaintance with person-materialized-world-vienna-1912-67_

- **1933.05** `p9-gap-adult-solitude.river-walk/river-walk.bridge` tags: adulthood, daily, solitude, ordinary, home, walk, river
  Klara在桥边站了一会儿，看一艘平底船靠岸卸煤，几个工人用铁锹往岸上甩。风把煤灰吹到她脸上，她抹了一把，往回走时脚步比来时轻，回到巷口还给自己买了块三赫勒的糖。
  _effects: mood 0.06; cash -0.03 (买了三赫勒的糖（其中0.03克朗记入债务）)_

- **1933.08** `vienna-social-movement.recruitment/join-and-carry` tags: development, social_movement, organization, politics
  Klara在楼梯下面接到一张折成四折的传单。纸上没有署名，只写着下一次集会的地址。Klara去了，在昏暗的屋里报上姓名，成为第二区夜班出租合作社的一员，并答应负责自己所在街区的联络。
  _effects: organization_membership; role; relation acquaintance with person-franz-lechner_

- **1934.01** `interaction_response` tags: interaction
  Gustav Huber没有答应，只说现在不合适。Klara把这件事收回去，之后见面仍点头。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-74; interaction_
  _causes: evt:world-vienna-1912:006396_

- **1934.01** `project_progressed` tags: project
  「Klara召集的会议」继续推进了一阶段。
  _effects: project_

- **1934.01** `r15-wish.found-faction::ctx-vienna-authoritarian-1934::milieu-tenement/took-over-a-club` tags: politics, power, wish, organization, office, status, vienna, urban
  一个快要散掉的政治俱乐部让Klara接手。会员只剩十一个人，欠着两个月房租，但那间办公室的门牌还挂着。Klara在第一次会上没有讲理想，只把账本翻开。
  _effects: reputation 0.03999999999999998; organization_found 接手后的俱乐部 (party); position 临时主席 @org:r15-club:evt:world-vienna-1912:006974_

- **1934.01** `state_reaction:wish-power/power-office` tags: wish-power, wish, wish:power, power, status, ambition, state, state_reaction
  Klara坐在那张有权力的桌子后面，签下自己的名字。愿望没有因此变近，但桌上的纸张、印章和等待回话的人，都变得具体了。
  _effects: reputation 0.06000000000000005_
  _causes: evt:world-vienna-1912:006974_

- **1934.01** `state_tick:fa17-starving-artist/rent-and-pages/another-rejection` tags: fa17-starving-artist, art, craft, poverty, recognition, work, pride, ambition
  画店老板把Klara的作品推回来，说尺寸不合墙面，题材也不合买主的口味。Klara抱着画走回阁楼，路上经过一家亮着灯的咖啡馆，玻璃里映出一个抱着旧画框的人，像一个迟到的搬运工。
  _effects: state_parameter fa17-starving-artist.need 53 -> 60; state_parameter fa17-starving-artist.recognition 15 -> 14; state_parameter fa17-starving-artist.integrity 65 -> 62; mood -0.03999999999999998; health -0.020000000000000018 (冬天阁楼里没有足够的煤)_

- **1934.01** `state_tick:fa17-muse/the-sitting-year/set-a-boundary` tags: fa17-muse, muse, art, desire, inspiration, dependence, vulnerability, beauty
  又一年过去，Klara学会了在进画室前先问清楚这次要坐多久、画完给谁看。Josef Lechner 2嫌Klara变得难安排，却也不得不把每次画像的时间写在纸上；那张纸后来被Klara收进了自己的抽屉。
  _effects: state_parameter fa17-muse.autonomy 60 -> 65; state_parameter fa17-muse.credit 12 -> 16; state_parameter fa17-muse.dependence 37 -> 33; mood 0.02999999999999997_

- **1934.01** `p9-work-jobsearch.railway-depot/railway-depot.eyesight-failed` tags: work, job_search, negotiation, wages, employment, task, railway, depot
  排在他前面的Mitzi Bauer 2很快过了关。轮到他时，医生把灯挪近了些，他还是念错。出了南站，太阳才刚爬上车皮，他站在路边把揉皱的证明捋平。
  _effects: mood -0.06; flag +seeking_work; relation acquaintance with person-materialized-world-vienna-1912-14; relation acquaintance with person-materialized-world-vienna-1912-14_

- **1934.01** `p9-social-family-conflict-care.sibling-medicine-bill/advance-with-room-claim` tags: family, care, siblings, inheritance, housing, money
  Klara把十四克朗的整张票子压在药费单上，说这钱不用还，只要求母亲那间朝院子的屋子以后归自己照看，钥匙也归自己管。Emil的咖啡杯在桌上顿了一下，说照看可以，房契上的名字另说；药费单总算从糖罐底下抽了出来，兄妹之间却多了一层账。
  _effects: cash -14 (先垫付母亲全部药费（其中14克朗记入债务）); flag +claims_mother_room_

- **1934.02** `vienna-social-movement.meeting/speak-and-organize` tags: development, social_movement, organization, meeting
  Klara在后屋的会议上报出自己街区的名字：谁家缺煤，谁被房东催租，谁知道哪间印刷厂还在招人。Die Fackel把这些事记进一本旧账本，散会时每个人带走一叠更小的纸条。
  _effects: skill; reputation 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-87_

- **1934.07** `vienna-courtship-courtyard.breakup/stay-for-the-rent` tags: adulthood, courtship, partner, social, family
  东西还到一半，两人算了算房租、煤钱和两个人的工钱凑在一起才够。最后钥匙没收回去，外套也留下；这个月能少花一克朗，话说到“以后”两个字就断了，谁都不往下接，炉子今晚还是得两个人一起生。
  _effects: mood -0.04999999999999999; cash 1 (合租省下一份房租)_

- **1934.11** `p9-social-tenement-neighbors.flour-loan/flour-loan.two-slices-of-bread` tags: housing, neighbors, tenement, daily, money, reputation
  Klara说自家也快见底了，不能再借面粉，临关门前往Karl Kraus手里塞了两块面包，说先给孩子垫一垫。Karl Kraus攥着面包站了一会儿，说了声谢谢就走了，楼梯上传来脚步和纸袋的磨蹭声。
  _effects: mood -0.020000000000000018_

- **1935.01** `project_completed` tags: project
  「Klara召集的会议」完成了当前阶段，参与者留下了实际的记录和后续安排。
  _effects: project_

- **1935.01** `vienna-life-injury-recovery/wound-infection` tags: health, work, family
  Klara的伤口在几天后肿起来，手腕发热。医生说要切开引流，费用比上次更高；Klara看着账单，先问能不能分两次付。
  _effects: cash -14 (drainage and medicine（其中14克朗记入债务）); condition_
  _causes: evt:world-vienna-1912:007150_

- **1935.01** `state_tick:fa17-muse/the-sitting-year/absorbed-again` tags: fa17-muse, muse, art, desire, inspiration, dependence, vulnerability, beauty
  画室的门一关，时间就又变成Josef Lechner 2的。Klara坐在同一把椅子上，听见窗外电车经过，数到第七次才被允许动一下；回家路上，Klara发现自己的围巾上沾着一股松节油味，洗了两次也没掉。
  _effects: state_parameter fa17-muse.dependence 33 -> 39; state_parameter fa17-muse.inspiration 52 -> 54; state_parameter fa17-muse.credit 16 -> 14; mood -0.030000000000000027_

- **1935.01** `agency:support_process` tags: agency, agency:support_process
  Klara想帮忙，但组织者不信任新来的人，只让其在外围等消息。
  _effects: mood -0.040000000000000036; reputation -0.010000000000000009_

- **1935.10** `p9-social-tenement-neighbors.rent-note/rent-note.together-to-office` tags: housing, neighbors, tenement, daily, money, reputation
  Klara和Luise Weiss叫上楼下两家，一同去房东的事务所。Friedrich Kral 2隔着柜台听他们说完，翻出账簿，答应先补上楼梯间的窗闩，涨租从下下个月起算。四人出门时挤在台阶上，谁也没先说话，Luise Weiss把帽子往后一推，说总算没白跑。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-10; mood 0.04999999999999999_

- **1936.01** `state_tick:fa17-starving-artist/rent-and-pages/another-rejection` tags: fa17-starving-artist, art, craft, poverty, recognition, work, pride, ambition
  画店老板把Klara的作品推回来，说尺寸不合墙面，题材也不合买主的口味。Klara抱着画走回阁楼，路上经过一家亮着灯的咖啡馆，玻璃里映出一个抱着旧画框的人，像一个迟到的搬运工。
  _effects: state_parameter fa17-starving-artist.need 60 -> 67; state_parameter fa17-starving-artist.recognition 14 -> 13; state_parameter fa17-starving-artist.integrity 62 -> 59; mood -0.03999999999999998_

- **1936.01** `state_tick:fa17-muse/the-sitting-year/absorbed-again` tags: fa17-muse, muse, art, desire, inspiration, dependence, vulnerability, beauty
  画室的门一关，时间就又变成Josef Lechner 2的。Klara坐在同一把椅子上，听见窗外电车经过，数到第七次才被允许动一下；回家路上，Klara发现自己的围巾上沾着一股松节油味，洗了两次也没掉。
  _effects: state_parameter fa17-muse.dependence 39 -> 45; state_parameter fa17-muse.inspiration 54 -> 56; state_parameter fa17-muse.credit 14 -> 12; mood -0.030000000000000027_

- **1936.01** `p10-family-tasks.appeal-inheritance/appeal-inheritance.watch` tags: adulthood, family, social, marriage, care, inheritance, task, appeal
  怀表是母亲陪嫁，表盖上有道划痕。Klara用指甲把表盖擦亮，说这个就够。兄弟把欠杂货店的账认下来，十一克朗。两人下楼时兄弟走在前面，到门口停了一下，说下个月一起去。
  _effects: relation kin with person-anna-bauer; mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-83_

- **1936.03** `p9-social-family-conflict-care.sick-parent-night/shifts-with-sibling` tags: family, care, siblings, inheritance, housing, money
  Klara和Josef把值班时辰写在门后的粉笔板上：Josef守前半夜，Klara守后半夜，医生说静养二十一天。煤油灯芯拧小，药粉分成小包摆在床头，便盆换水时尽量不碰出响。二十一天熬下来，Klara的眼皮肿了，走路发飘，但Josef Bauer每次起身总有人扶。
  _effects: relation kin with person-phase15-Josef-world-vienna-1912; flag +night_care_duty; relation acquaintance with person-materialized-world-vienna-1912-28_

- **1936.08** `vienna-legacy-worklife.sick-fund/sick-fund.fill-form` tags: legacy, work, family, reform, ordinary_life
  衙门走廊的地砖是黑白相间的，Klara站着站着就把重心从一只脚换到另一只脚。窗口里的办事员姓什么没人知道，只叫“三号窗”。表递进去时，里面说“等复核”，声音很平。
  _effects: relation colleague with person-anna-bauer; skill; relation acquaintance with person-materialized-world-vienna-1912-100_

- **1937.01** `state_reaction:wish-power/power-office` tags: wish-power, wish, wish:power, power, status, ambition, state, state_reaction
  Klara坐在那张有权力的桌子后面，签下自己的名字。愿望没有因此变近，但桌上的纸张、印章和等待回话的人，都变得具体了。
  _effects: reputation 0.06000000000000005_
  _causes: evt:world-vienna-1912:008447_

- **1937.01** `state_tick:fa17-muse/the-sitting-year/absorbed-again` tags: fa17-muse, muse, art, desire, inspiration, dependence, vulnerability, beauty
  画室的门一关，时间就又变成Josef Lechner 2的。Klara坐在同一把椅子上，听见窗外电车经过，数到第七次才被允许动一下；回家路上，Klara发现自己的围巾上沾着一股松节油味，洗了两次也没掉。
  _effects: state_parameter fa17-muse.dependence 45 -> 51; state_parameter fa17-muse.inspiration 56 -> 58; state_parameter fa17-muse.credit 12 -> 10; mood -0.030000000000000027_

- **1937.01** `p10-edu-work-tasks.apply-scholarship/p10-edu-work-tasks.apply-scholarship.rejected` tags: adulthood, education, work, task, night_school, apprenticeship, career, scholarship
  官员翻完工钱单，说家庭收入证明由房东签字不足为凭，还要户籍局盖章。申请被退回，理由写在纸条上：收入材料不充分。他当天傍晚去问夜校，簿记班的学费低得多，也收工龄够的人。他把那张退回的纸条留作书签。
  _effects: mood -0.05999999999999994; knowledge “基金会的收入证明必须由户籍局盖章，不接受房东签字的收据”; flag +night_school_applicant; relation acquaintance with person-materialized-world-vienna-1912-90_

- **1937.06** `statistical_infection`
  Klara在Leopoldstädter Zinshaus, gemeinsamer Gang病倒了，肺结核让身体发热、虚弱，接下来的日子只能卧床。

- **1937.09** `statistical_illness_worsened`
  Klara的肺结核没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1937.12** `statistical_death/tuberculosis` tags: death
  Klara咳了几个月，手帕上开始带血。1937年冬天，Klara在Leopoldstädter Zinshaus, gemeinsamer Gang的床上消瘦下去，再没有力气去上工。
  _effects: death (肺结核)_
## Mitzi

Born 1912.01, died 1947.01 (age 35).
Education: apprenticeship 0; occupation: none; roles: infant, child, pupil, playmate, emergency_admission, medicine_seeker, partner, registered_resident, movement_member, office:档案助理, liberated_1945.

### State snapshot
- wish-knowledge [person] (ended 1947.1: owner_died) parameters={"intensity":0.55,"fixation":0.5,"irony":0.3} links={} ticks=6
- p22-family-legend [person] (ended 1912.12: replaced_by:p22-family-legend) parameters={"warmth":67,"secrecy":14,"danger":5,"promise":45} links={} ticks=0
- p22-family-legend [person] (ended 1913.8: replaced_by:p22-family-legend) parameters={"warmth":68,"secrecy":14,"danger":8,"promise":40} links={} ticks=1
- p22-family-legend [person] (ended 1913.4: replaced_by:p22-family-legend) parameters={"warmth":37,"secrecy":84,"danger":55,"promise":40} links={} ticks=0
- p22-family-legend [person] (ended 1920.1: duration expired) parameters={"warmth":74,"secrecy":31,"danger":18,"promise":59} links={} ticks=4
- apprenticeship-contract [person] (ended 1928.1: the master ended the contract) parameters={"progress":13,"failures":2,"trade":"木工","paid":true} links={} ticks=3
- yf18-first-awakening [person] (ended 1929.1: duration expired) parameters={"intensity":68,"nerve":13,"talk":10,"reciprocated":true,"secret":true} links={"beloved":"Rosa"} ticks=3
- yf18-runaway-plan [person] (ended 1928.1: duration expired) parameters={"preparation":15,"suspicion":5,"resolve":55,"destination":"格拉茨","ticket":false} links={} ticks=1
- failed-apprentice [person] (ended 1928.2: replaced_by:apprenticeship-contract) parameters={} links={} ticks=0
- apprenticeship-contract [person] (ended 1931.1: duration expired) parameters={"progress":48,"failures":0,"trade":"木工","paid":false} links={} ticks=3

### 148 subject events

- **1912.04** `p22-comic-name-register::ctx-vienna-1912::milieu-tenement/the-clerk-hears-a-sneeze` tags: infancy, family, bureaucracy, name, official, comic, tender, drama
  登记员把Mitzi打喷嚏的声音当成了名字，低头就写，笔尖还在舌头上蘸了蘸。Rosa Lechner抱着孩子，没看见那行字；等到拿着纸回家，才发现孩子的名字里多了一个“嚏”。
  _effects: mood 0.04; knowledge “登记簿上孩子的名字被写成了喷嚏声。”; flag +registered_as_hatschi; state_add p22-family-legend state:world-vienna-1912:17_

- **1912.04** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Mitzi家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 10 -> 14; state_parameter p22-family-legend.warmth 65 -> 67; mood 0.01_
  _causes: evt:world-vienna-1912:000106_

- **1912.05** `vienna-life-birth-letter-from-the-dead/the-letter-is-real` tags: infancy, family, secret, letter, drama
  邮差把一封边角磨白的信塞进门缝，收信人是一个已经死了三年的名字。Rosa Lechner把Mitzi放在膝上，拆开信，里面只有一句：“孩子像不像他？”Anna Moser在门口探头，问是不是寄错了；Rosa Lechner把信折回去，说“没有寄错”。
  _effects: flag +letter_from_dead_relative; knowledge “一封写给死去亲人的信问：孩子像不像他。”; mood -0.04_

- **1912.12** `vienna-life-infant-first-smile/smile-at-the-lamp` tags: infancy, family, first, warm
  Alois Lechner把Mitzi抱到窗边，煤汽灯罩上有一圈晃动的光。孩子盯着看了很久，忽然笑出声，口水滴在Alois Lechner的袖口上。屋里的人都停了一下，像是听见了什么了不起的消息。
  _effects: mood 0.04; health 0.010000000000000009 (a good day)_

- **1912.12** `p22-comic-christening::ctx-vienna-1912::milieu-tenement/the-priest-sneezes` tags: infancy, family, christening, church, neighbor, comic, tender, drama
  神父念到孩子的名字时打了个大喷嚏，蜡烛灭了，Mitzi却笑出了声。Anna Moser赶紧去点蜡烛，手一抖，火苗又灭了；教堂里第一次有人笑，神父也笑了，说这是今天最响的一声阿门。
  _effects: mood 0.04; relation acquaintance with person-phase15-Mitzi-world-vienna-1912; flag +christening_sneeze; state_add p22-family-legend state:world-vienna-1912:18_

- **1913.01** `state_tick:p22-family-legend/the-story-changes-hands/a-detail-goes-missing` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，故事里最要紧的那件东西不见了：先是名字，后来是地点。Mitzi问起时，大人说“你记错了”；可柜子最底层那只空盒子，谁也没有扔，锁却换过了，钥匙也不见了。
  _effects: state_parameter p22-family-legend.secrecy 10 -> 14; state_parameter p22-family-legend.danger 5 -> 8; state_parameter p22-family-legend.warmth 70 -> 68; mood -0.01_

- **1913.04** `p22-warm-fathers-letter::ctx-vienna-1912::milieu-tenement/the-neighbour-remembers` tags: infancy, family, letter, uncle, warm, melancholy, memory, drama
  送信的邻居说，叔叔年轻时在桥边救过一个落水的孩子，自己却冻坏了肺。Alois Lechner听完把信折好，放进糖罐底下；Mitzi伸手去拍罐盖，拍得很响，像在替那封信回答。
  _effects: state_add p22-family-legend state:world-vienna-1912:39; mood 0.01999999999999999; relation acquaintance with person-phase15-Mitzi-world-vienna-1912; knowledge “叔叔曾经在桥边救过一个孩子。”_

- **1913.07** `vienna-infant-household.croup/doctor-call` tags: infancy, health, family, home
  Alois Lechner打发邻居去请街角的医生。医生提着皮包来，听了听胸口，留下半瓶药水，收走一克朗。Mitzi三天后不再咳得蜷成一团。
  _effects: cash -1 (医生出诊费和药水钱); relation acquaintance with person-anna-moser_

- **1913.08** `p22-strange-cradle-secret::ctx-vienna-1912::milieu-tenement/the-bundle-in-the-lining` tags: infancy, family, cradle, secret, inheritance, strange, dark, drama
  Alois Lechner拆洗摇篮衬里时，摸到一个硬角：一小块油布，里面包着一张当票和一缕头发，当票上的日期已经模糊。Alois Lechner看了很久，又把油布缝回去，针脚比原来更密。
  _effects: state_add p22-family-legend state:world-vienna-1912:38; mood -0.03; flag +cradle_bundle; knowledge “摇篮衬里藏着一张当票和一缕头发。”_

- **1913.08** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Mitzi家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 80 -> 84; state_parameter p22-family-legend.warmth 35 -> 37; mood 0.01_
  _causes: evt:world-vienna-1912:000278_

- **1914.01** `vienna-life-toddler-first-words/first-word-door` tags: infancy, family, first, comic
  门外有人上楼，Mitzi忽然指着门说：“爸爸。”Alois Lechner看了看空门口，没有纠正。那天晚上，孩子把家里每个人的名字都叫了一遍，叫错两个，却叫得很认真。
  _effects: skill; mood 0.01999999999999999; flag +first_word_door_

- **1914.01** `state_tick:p22-family-legend/the-story-changes-hands/the-wrong-person-hears` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，Mitzi在门口把故事讲给一个收旧瓶的人听。第二天，整条楼道都在传另一个版本；家里把窗关上，把声音压得更低，故事从此有了第二个名字。
  _effects: state_parameter p22-family-legend.secrecy 30 -> 25; state_parameter p22-family-legend.danger 10 -> 18; flag +legend_leaked; mood -0.02_

- **1915.01** `vienna-life-child-family-legend/lost-relative` tags: childhood, family, secret, story
  Rosa Lechner在收拾箱子时翻出一张没有署名的照片，说那是家里一个“去了很远地方”的人。Mitzi问还回不回来，Rosa Lechner把照片翻过去，说先把名字记住，别在饭桌上问。
  _effects: knowledge “家里有一张没有署名的照片，照片上的人去了很远的地方。”; flag +family_legend_photo; mood -0.01_

- **1915.01** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Mitzi家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 25 -> 29; state_parameter p22-family-legend.warmth 60 -> 62; mood 0.01_
  _causes: evt:world-vienna-1912:000449_

- **1915.02** `p22-comic-mistaken-child::ctx-klosterneuburg-rural-1912::milieu-tenement/the-hat-is-the-same` tags: childhood, family, market, neighbor, mistaken_identity, comic, tender, drama
  两个孩子的帽子一模一样，两个大人在摊子前换了半天，才发现怀里的孩子都在睡。Mitzi醒来时看见一张陌生的脸，愣了一会儿，又睡着了；两个母亲互相道歉，又互相检查帽子。
  _effects: mood 0.03; flag +hat_swap_

- **1915.02** `p22-strange-grandmother-voice::ctx-klosterneuburg-rural-1912::milieu-tenement/the-recipe-is-right` tags: childhood, family, grandmother, memory, omen, strange, eerie, drama
  Mitzi报出祖母做李子饺子的步骤，连她总把糖放两遍这个错也记得。Rosa Lechner先是笑，笑着笑着去擦眼睛；那天晚上，家里按孩子说的做了一遍，孩子坚持说糖要放两遍。
  _effects: mood 0.03; knowledge “祖母做李子饺子时会放两遍糖。”; state_parameter p22-family-legend.warmth 62 -> 66; state_parameter p22-family-legend.secrecy 29 -> 31_

- **1915.02** `p22-drama-fire::ctx-klosterneuburg-rural-1912::milieu-tenement/the-neighbour-catches-the-child` tags: childhood, family, fire, accident, neighbor, survival, dramatic, danger
  油灯倒了，窗帘先冒烟，随后窜起火。Emil Weiss冲进来，用湿毯子裹住Mitzi，自己的手背烧起一串水泡，后来留了疤。孩子的头发全是烟味，人还醒着，邻居的手一直抖，孩子记得。
  _effects: health -0.07999999999999996 (smoke and a tenement fire); condition; health -0.050000000000000044 (burns from the rescue); relation acquaintance with person-phase15-Mitzi-world-vienna-1912; cash -5 (burnt curtains and a new blanket); flag +fire_survived; mood -0.06_

- **1915.10** `vienna-early-childhood.stairwell-fall/arm-bruise` tags: childhood, family, home, street, injury
  楼梯间的灯罩空着，第三级踏板比别处高。Mitzi一脚踩空，滚到平台，右小臂磕在铁扶手的弯头上。Rosa Lechner听见哭声跑出来，把Mitzi抱回屋，用冷水毛巾敷那块青紫，再用旧布条缠了两圈。夜里Mitzi哭醒两次。
  _effects: health -0.040000000000000036 (从楼梯滚下，小臂挫伤); mood -0.05_

- **1916.01** `vienna-life-child-first-friend/shared-toy` tags: childhood, friendship, family, comic
  Josef Lechner在楼道里滚一只铁环，Mitzi站在门口看。Josef Lechner把铁环推过来，说“你推一次，我推一次”。两个人从楼梯口推到院子里，铁环倒下的声音把午睡的大人吵醒了一排。
  _effects: relation friend with person:evt:world-vienna-1912:000115:child; skill; mood 0.05000000000000001_

- **1916.01** `state_tick:p22-family-legend/the-story-changes-hands/told-at-the-table` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，Mitzi家的故事在饭桌上换了新的讲法：多了一句笑话，少了一处哭声。听的人把汤匙放下，等下一句；讲故事的人却先去看窗子有没有关好，谁也没有先动筷子。
  _effects: state_parameter p22-family-legend.warmth 66 -> 69; state_parameter p22-family-legend.secrecy 31 -> 29; state_parameter p22-family-legend.promise 55 -> 57; mood 0.009999999999999995_

- **1918.01** `state_tick:p22-family-legend/the-story-changes-hands/told-at-the-table` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，Mitzi家的故事在饭桌上换了新的讲法：多了一句笑话，少了一处哭声。听的人把汤匙放下，等下一句；讲故事的人却先去看窗子有没有关好，谁也没有先动筷子。
  _effects: state_parameter p22-family-legend.warmth 69 -> 72; state_parameter p22-family-legend.secrecy 29 -> 27; state_parameter p22-family-legend.promise 57 -> 59; mood 0.009999999999999995_

- **1918.01** `p9-gap-childhood-chores.mind-sibling/sibling-shelter-missed-river` tags: childhood, household, chores, school, task, daily, sibling, care
  河水那边传来同伴的笑声，Mitzi站在院门口听了听，还是回去把木盆扶正。Luise Lechner睡醒哭了一声，Mitzi把最后半块面包掰碎泡进温水，一勺一勺喂。Alois Lechner回来时，Mitzi正蹲在盆边打瞌睡，手里还攥着喂饭的木勺。
  _effects: mood -0.020000000000000004; relation kin with person:evt:world-vienna-1912:000286:child; relation kin with person-alois-lechner_

- **1918.02** `p9-childhood-household.fever-night/called-corner-doctor` tags: childhood, family, household, home, siblings, illness, neighbors
  楼梯上传来皮包磕碰的声音，Anna Moser把医生领进门。医生看了看Mitzi的舌苔，又听了听胸口，说先把热度压下去。药粉包在旧纸里，苦味隔着纸都能闻到。Rosa Lechner付了两克朗，把那张饮食单压在盐罐底下。
  _effects: cash -2 (出诊费和药粉); health 0.05999999999999999 (服药后热退了些); relation acquaintance with person-anna-moser_

- **1919.01** `p9-gap-childhood-chores.laundry-help/laundry-bread-with-friend` tags: childhood, household, chores, school, task, daily, laundry, work
  两个孩子在院子两头跑，一个递，一个夹，床单在风里鼓起来。最后一条挂好，Gustav Berg从厨房拿出面包，先给了自家孩子，再掰一块给Mitzi。Mitzi把面包塞进围裙口袋，回家后放在家里人的碗边，说自己在外面吃过了。
  _effects: food; skill; relation acquaintance with person-materialized-world-vienna-1912-7_

- **1919.01** `vienna-childhood-street.washhouse-fever/fever-scarlet` tags: childhood, street, social, home
  巷子里一家接一家地病倒。Mitzi烧到说胡话，Rosa Lechner把阁楼小屋腾出来，在门把手上系了块红布。医生隔着门看了Mitzi的喉咙，留下药粉，收下一克朗二十赫勒。Rosa Lechner把家里留着买煤的钱数了两遍，刚好够。
  _effects: cash -1.2 (付医生诊费); condition_

- **1919.02** `r2-rural.village-school::ctx-klosterneuburg-rural-1912::milieu-tenement/learned-the-letters` tags: rural, school, childhood, teacher, literacy, agriculture, small_town, peace
  Mitzi把石板放在膝盖上，Grete Stein用粉笔在木板上写字母。教室里只有一排课桌，后排的孩子坐在倒扣的奶桶上。下课铃是一只旧牛铃，Grete Stein摇的时候，窗外的羊也跟着叫。
  _effects: flag +learned_letters_at_village_school; role; skill; education primary_

- **1919.02** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Mitzi家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 27 -> 31; state_parameter p22-family-legend.warmth 72 -> 74; mood 0.009999999999999995_
  _causes: evt:world-vienna-1912:001192_

- **1919.02** `kernel-social.first-meeting::ctx-klosterneuburg-rural-1912::milieu-tenement/first-meeting.coal-basket` tags: social, friendship, first_meeting, childhood, neighbor, everyday, rural, agriculture
  在合住的出租公寓的楼梯上，Mitzi抱着一筐煤，Berta Winter从楼上下来，伸手托住筐底。两人把煤抬到四楼，在窗台上分了一块黑面包；此后上学、提水都结伴，谁家晚归就替谁留门。煤灰落在鞋面上，他们用同一块破布擦手。
  _effects: relation friend with person:evt:world-vienna-1912:000062:child; role; flag +childhood_friend; knowledge “那个总在楼梯上帮忙的孩子住在同一栋楼的顶层。”_

- **1919.05** `vienna-school-childhood.fountain-pen/fountain-pen.broken` tags: school, social, childhood
  “钢笔要钱，钱在账单上。”Rosa Lechner说完把纸折起来。Mitzi的自制笔漏了一页墨，Otto Winter 2用红笔写“重写”，本子边角被墨水泡皱。
  _effects: mood -0.05; relation kin with person-rosa-lechner; skill_

- **1920.01** `vienna-life-school-day/hungry-in-class` tags: childhood, school, hunger
  Mitzi早上只喝了一碗清汤，第二节课时眼前发黑。Otto Winter 2让孩子去走廊坐一会儿，给了半块面包；Mitzi把面包屑拢在手心吃完，胃里还是空的，但看Otto Winter 2的眼神软了些，回到座位时把腰挺直了一点。
  _effects: condition; relation acquaintance with person-materialized-world-vienna-1912-16; relation acquaintance with person-materialized-world-vienna-1912-16_

- **1920.01** `state_expire:p22-family-legend` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  Mitzi的「家族传说」到期；相关安排结束。
  _effects: state_remove p22-family-legend state:world-vienna-1912:39_

- **1920.01** `p9-gap-childhood-chores.stay-after-school/stay-list-instead` tags: childhood, household, chores, school, task, daily, teacher, learning
  锁门的人在走廊里咳嗽了一声。Otto Winter 2一边道歉一边收拾，最后从粉笔盒底下抽出一张旧练习纸，圈了四道题。Mitzi接过来，想问第二题怎么开头，Otto Winter 2已经提着包下楼了。校门口还有太阳，Mitzi把纸摊在台阶上看了一会儿。
  _effects: skill; mood -0.03; relation acquaintance with person-materialized-world-vienna-1912-16_

- **1920.05** `statistical_infection`
  Mitzi在Leopoldstädter Zinshaus, gemeinsamer Gang病倒了，伤寒让身体发热、虚弱，接下来的日子只能卧床。

- **1920.06** `statistical_illness_worsened`
  Mitzi的伤寒没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1920.06** `vienna-childhood-friends.courtyard-race/won-the-race-lost-a-button` tags: childhood, social, school, street
  Mitzi跑到第二圈时鞋带松了，索性踩着鞋后跟跑。最后一圈，Mitzi从床单底下钻过去，先拍到墙。Maria Kral喘着气，把两颗弹珠拍进Mitzi手心。Mitzi低头才发现外套少了一颗扣子；窗口的Maria Kral扔下一根别针，说先别着。
  _effects: mood 0.05; relation acquaintance with person-maria-kral_

- **1920.09** `statistical_illness_worsened`
  Mitzi的伤寒没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1920.10** `statistical_recovery`
  Mitzi从伤寒中慢慢恢复，能下床喝水，但身体还虚弱。

- **1921.01** `p9-gap-childhood-chores.laundry-help/laundry-dragged-docked-pay` tags: childhood, household, chores, school, task, daily, laundry, work
  床单太长，Mitzi拖着一角往绳子走，布边扫过煤渣，立刻黑了一道。Rosa Lechner弯腰看了看，脸沉下来，说这角得重洗，工钱扣一半。Mitzi接过一赫勒，蹲在盆边用清水搓那一道灰，搓到指节发红，水面上还浮着煤末。
  _effects: cash 0.01 (被扣后只剩一赫勒); mood -0.05_

- **1921.06** `vienna-childhood-street.washhouse-fever/fever-recover` tags: childhood, street, social, home
  洗衣房里全是蒸汽和碱水味。Mitzi靠在墙边等Alois Lechner，湿衣服堆在脚边。夜里Mitzi开始发烧，Alois Lechner把湿布叠成长条，敷在额头，凉了再换。三天后热度退下去，Mitzi的嘴唇起了一层白皮，Alois Lechner的手指也裂了口子。
  _effects: condition; relation kin with person-alois-lechner_

- **1921.08** `vienna-school-childhood.fountain-pen/fountain-pen.broken` tags: school, social, childhood
  Rosa Lechner把账单翻了个面，上面全是数字。Mitzi没再问，回家用线把旧笔尖绑在木杆上。第二天墨水从裂缝渗到指缝，Friedrich Weiss把本子推回来让重写。
  _effects: mood -0.05; relation kin with person-rosa-lechner; skill; relation acquaintance with person-materialized-world-vienna-1912-38_

- **1922.01** `p9-gap-childhood-chores.school-slate/slate-homemade-wood-ash` tags: childhood, household, chores, school, task, daily, supplies, education
  Rosa Lechner把空口袋翻给Mitzi看，里面只有线头和一枚扣子。Mitzi没再要，去木料堆挑了块没毛刺的薄板，用指头抹上湿煤灰，写一个字，抹一次。到Leopoldstädter Volksschule时木板边角已经把书包染黑，后排有人笑了一声，Mitzi把木板往桌肚里塞了塞。
  _effects: skill; mood -0.04000000000000001; relation kin with person-rosa-lechner_

- **1922.04** `vienna-childhood-friends.hidden-book/book-confiscated` tags: childhood, social, school, street
  Mitzi把书压在算术本底下，只露出书脊。Grete Stein走过来，抽走算术本，书也跟着滑出来。折角那页画着一艘帆船。Grete Stein合上书，说放学后擦黑板，擦一星期；书被锁进讲台抽屉，没往校长室送。
  _effects: mood -0.04999999999999999; relation acquaintance with person-grete-stein_

- **1923.01** `p9-gap-childhood-chores.market-line/line-both-families` tags: childhood, household, chores, school, task, daily, market, food
  Emil Weiss把Mitzi拽到队伍前头，往自己身前塞，说“孩子占不了多大地儿”。窗口一次递出两包面包，Mitzi把邻居那包夹在胳肢窝，自己这包抱在胸前。到Leopoldstädter Zinshaus, gemeinsamer Gang门口，Mitzi蹲下把两包并排，按Emil Weiss说的份量分开，连找零的铜板也分成两小堆。
  _effects: food; skill; relation acquaintance with person-materialized-world-vienna-1912-39_

- **1924.01** `state_tick:wish-knowledge/knowledge-pressure/press-on` tags: wish-knowledge, wish, wish:knowledge, knowledge, education, curiosity, state, state_tick
  Mitzi又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.01999999999999999; flag +wish:knowledge:pursuing_

- **1924.02** `vienna-youth-threshold.sibling-departure/take-over-bed-and-ledger` tags: adolescence, school, work, family, transition
  Franz Lechner走后，靠墙那张床空了出来，Mitzi把自己的铺盖搬过去，也接过那本记着欠账的旧账本：面包店三克朗、煤铺一克朗八十赫勒。晚上Mitzi坐在床沿一笔笔抄清，第一次知道家里的钱是怎么缺的。
  _effects: skill; mood -0.04999999999999999; cash -0.5 (替兄姐补齐欠煤铺的零头)_

- **1924.03** `r3-teen.parent-remarriage::ctx-vienna-reform-1930::milieu-tenement/conflict` tags: family, remarriage, stepfamily, grief, household, reform, medical, schooling
  Berta Weiss把Mitzi生父的旧大衣拿去当铺，说家里不缺这件碍事的衣服。Mitzi追到巷口，把当票抢回来，撕成两半。Alois Lechner站在两人中间，最后谁也没有帮。
  _effects: mood -0.1; condition; flag +conflict_over_dead_fathers_coat; relation rival with person-berta-weiss; relation rival with person-alois-lechner_

- **1925.01** `r13-edu.music-lesson::ctx-vienna-reform-1930::milieu-tenement/first-recital` tags: education, music, lesson, craft, culture, reform, medical, schooling
  Mitzi在期末演奏会上拉完一首短曲，弓毛断了两根，最后一个音还是稳住了。Friedrich Weiss在台下点头，师母把手套摘下来鼓掌。回家后，Mitzi把琴擦了三遍，才发现肩托把脖子磨出一道红印，碰一下就疼。Mitzi没有告诉任何人。琴盒没关。
  _effects: reputation 0.05; flag +first_recital; skill_

- **1925.02** `r15-work.master-takes-on::ctx-vienna-reform-1930::milieu-tenement/signed-contract` tags: work, craft, apprentice, trade, poverty, reform, medical, schooling
  Alois Moser把学徒契约摊在桌上，指给Mitzi看期限、工钱和出师考试。Mitzi签了名，第二天站到刨床前，手指上多了第一道木刺。
  _effects: relation employer with person-materialized-world-vienna-1912-18; state_add apprenticeship-contract state:world-vienna-1912:148; relation acquaintance with person-materialized-world-vienna-1912-18; education apprenticeship; role_

- **1925.07** `r13-turn.school-leaving::ctx-vienna-reform-1930::milieu-tenement::reform-leaving-age/signed-apprenticeship` tags: education, school, work, family, transition, reform, medical, schooling
  毕业钟敲过三下，Grete Stein把成绩单按在讲台上，说Mitzi还能再读一年，只要家里肯出四克朗。家里人在走廊里把学徒契约展开，纸角还带着面粉。Mitzi签了名，第二天就站到刨床前，手指上多了第一道木刺。
  _effects: cash -2 (毕业钟响过以后); flag +left_school_for_apprenticeship; education apprenticeship_

- **1926.01** `state_reaction:wish-knowledge/knowledge-humiliation` tags: wish-knowledge, wish, wish:knowledge, knowledge, education, curiosity, state, state_reaction
  Mitzi把那句轻视记了很久。它没有变成一个决定，但也没有消失。
  _effects: mood -0.03999999999999998; flag +wish:knowledge:wounded_
  _causes: evt:world-vienna-1912:002889_

- **1926.01** `state_tick:apprenticeship-contract/workshop-year/mistake` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Mitzi废掉了一块料，师傅扣了工钱。晚饭时谁也没提这件事。
  _effects: state_parameter apprenticeship-contract.failures 0 -> 1; cash -1 (wasted material); mood -0.03999999999999998_

- **1926.01** `p9-childhood-youth-aspiration.trade-school-application/switched-to-church-class` tags: adolescence, education, aspiration, school, books, club, exam, task
  他从职业学校门口走开时，听见里面在搬长凳。拐过街角，教堂侧门开着，Friedrich Weiss正往黑板上写乘法表，招手让他进来坐最后一排。
  _effects: mood 0.02999999999999997; skill; flag +church_tutoring; relation acquaintance with person-materialized-world-vienna-1912-38; relation acquaintance with person-materialized-world-vienna-1912-32_

- **1926.02** `yf18-firstlook.atlas-margin::ctx-vienna-reform-1930::milieu-tenement/tear-out-the-page` tags: first_love, school, atlas, note, secrecy, reform, medical, schooling
  Mitzi把那页地图撕下来，折成四折藏进袜筒。回家路上，Mitzi在煤气灯下把字读了三遍，又把纸塞进炉子；火苗舔到“多瑙河”三个字时，Mitzi伸手抢出来，指尖烫出一个泡。
  _effects: state_add yf18-first-awakening state:world-vienna-1912:194; flag +yf18_burned_fingers; mood 0.010000000000000009; flag +yf18_first_awakening_active_

- **1926.02** `r3-teen.police-caution::ctx-vienna-reform-1930::milieu-tenement::reform-parent-notice/fined` tags: police, caution, record, family, work, reform, medical, schooling
  Luise Kral说按条例罚三克朗，交不出就通知学校。Alois Lechner从内衣口袋里摸出叠好的钞票，一张张数，数到第三张时手停了。回家后，那三克朗被写在厨房的账单上，旁边画了一道红线。
  _effects: cash -3 (派出所里的第一次签字); mood -0.08000000000000002; flag +fined_by_police; relation rival with person-alois-lechner_

- **1926.02** `r13-turn.exam-failure::ctx-vienna-reform-1930::milieu-tenement::reform-open-secondary/name-missing` tags: education, exam, failure, school, work, reform, medical, schooling
  补考那天，Mitzi在考场门口等到钟响，监考说名单上没有名字。Grete Stein跑去教务处，回来时手里只有一张转学建议。Mitzi去了印刷厂当学徒，师傅说铅字比字母好认，至少不会骗人。
  _effects: condition; flag +left_school_after_exam_failure; relation colleague with person-grete-stein; education apprenticeship_

- **1926.07** `r3-teen.police-caution::ctx-vienna-reform-1930::milieu-tenement::reform-parent-notice/cautioned` tags: police, caution, record, family, work, reform, medical, schooling
  Anton Winter 2把Mitzi的名字写进一本硬皮簿子，问一句写一句，最后让他按手印。Alois Lechner赶来时，Anton Winter 2说带回去好好管教，这次不立案。走出门口，Alois Lechner的手一直攥着Mitzi的袖子。
  _effects: reputation -0.04; flag +police_caution_recorded; relation guardian with person-alois-lechner; knowledge “the police opened a caution file in the subject’s name”; relation acquaintance with person-materialized-world-vienna-1912-51_

- **1926.12** `p9-childhood-adolescence.secret-in-the-stairwell/secret-ask-worker` tags: adolescence, friendship, identity, work, school, secret, church
  Mitzi去找Rosa Lechner 2，问能不能让Berta Winter留在纸料间。Rosa Lechner 2搓着手上洗不掉的墨，说要照规矩通知教区，否则厂里担不起。Mitzi回来的路上一直看自己的鞋尖。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-12; relation friend with person:evt:world-vienna-1912:000062:child; mood -0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-12_

- **1927.01** `yf18-apprentice.press-guard::ctx-vienna-reform-1930::milieu-tenement/call-the-inspector` tags: apprenticeship, work, danger, machine, injury, refusal, reform, medical
  Mitzi趁Sozialdemokratische Arbeiterpartei Österreichs (SDAP)去喝咖啡，跑到街角的工厂检查所，把卸下来的护板指给Friedrich Hofer看。Friedrich Hofer第二天带着卷尺来了，在压印机旁边量了很久；Sozialdemokratische Arbeiterpartei Österreichs (SDAP)陪着笑，等门一关，就把Mitzi的工具从案子上扫进了木箱。
  _effects: relation employer with person-victor-adler; reputation 0.03; state_parameter apprenticeship-contract.progress 10 -> 13; flag +yf18_reported_press; mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-14_

- **1927.01** `state_tick:apprenticeship-contract/workshop-year/mistake` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Mitzi废掉了一块料，师傅扣了工钱。晚饭时谁也没提这件事。
  _effects: state_parameter apprenticeship-contract.failures 1 -> 2; cash -1 (wasted material); mood -0.03999999999999998_

- **1927.01** `state_tick:yf18-first-awakening/half-year-of-glances/answered-glance` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Mitzi在教堂门口或学校走廊里又遇见Rosa。这一次对方先点了头，Mitzi准备好的整段话全忘了，只把手里的书换到另一只手上；回家后Mitzi才发现，自己把书拿倒了。
  _effects: state_parameter yf18-first-awakening.intensity 50 -> 55; state_parameter yf18-first-awakening.nerve 5 -> 13; state_parameter yf18-first-awakening.reciprocated false -> true; mood 0.02999999999999997_

- **1927.01** `r13-civ.first-aid-course::ctx-vienna-reform-1930::milieu-tenement/course-cancelled` tags: health, first_aid, course, skill, school, reform, medical, schooling
  Josefine Hofer来了两次，第三次教室门锁着，黑板上写着“课程暂停”。Mitzi和Emil在走廊里等了一刻钟，最后把绷带卷带回教室，互相缠着玩。
  _effects: mood -0.04999999999999999; flag +first_aid_course_cancelled_

- **1927.01** `yf18-runaway.bundle::ctx-vienna-reform-1930::milieu-tenement/hide-the-bundle` tags: runaway, escape, family, plan, night_train, reform, medical, schooling
  Mitzi把两件衬衫、一双袜子和小时候的洗礼证明卷进一块旧桌布，塞到床底下。Alois Lechner在厨房里数硬币，数了三遍都没有抬头；Mitzi躺在黑暗里，听见夜车从远处经过，铁轨的声音一直传到枕头下面。
  _effects: state_add yf18-runaway-plan state:world-vienna-1912:303; flag +yf18_bundle_hidden; mood 0.020000000000000018; flag +yf18_runaway_plan_active_

- **1927.04** `r13-turn.school-leaving::ctx-vienna-reform-1930::milieu-tenement::reform-leaving-age/signed-apprenticeship` tags: education, school, work, family, transition, reform, medical, schooling
  毕业钟敲过三下，Josef Lechner 2把成绩单按在讲台上，说Mitzi还能再读一年，只要家里肯出四克朗。家里人在走廊里把学徒契约展开，纸角还带着面粉。Mitzi签了名，第二天就站到刨床前，手指上多了第一道木刺。
  _effects: cash -2 (毕业钟响过以后); education apprenticeship_

- **1928.01** `yf18-firstlook.parish-dance::ctx-vienna-reform-1930::milieu-tenement/friend-cuts-in` tags: first_love, dance, church, courtship, jealousy, reform, medical, schooling
  Anton在第二支曲子前把Berta Winter请走，说Mitzi答应过要替她看管外套。Mitzi抱着一件不属于自己的大衣站在圣像下面，看他们在蜡烛光里转圈；回家路上，Mitzi把舞卡撕成小片，扔进多瑙运河。
  _effects: state_parameter yf18-first-awakening.intensity 55 -> 60; state_parameter yf18-first-awakening.nerve 13 -> 5; state_parameter yf18-first-awakening.talk 0 -> 5; relation friend with person-phase15-Anton-world-vienna-1912; relation friend with person:evt:world-vienna-1912:000062:child; mood -0.03999999999999998_

- **1928.01** `state_transition:apprenticeship-contract/expelled` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick, failed-apprentice
  Mitzi从「学徒契约」转入另一段处境：the master ended the contract
  _effects: state_transition apprenticeship-contract -> failed-apprentice; flag +failed_apprenticeship; mood -0.08000000000000002; role_

- **1928.01** `state_tick:yf18-first-awakening/half-year-of-glances/answered-glance` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Mitzi在教堂门口或学校走廊里又遇见Rosa。这一次对方先点了头，Mitzi准备好的整段话全忘了，只把手里的书换到另一只手上；回家后Mitzi才发现，自己把书拿倒了。
  _effects: state_parameter yf18-first-awakening.intensity 63 -> 68; state_parameter yf18-first-awakening.nerve 5 -> 13; state_parameter yf18-first-awakening.reciprocated true -> true; mood 0.030000000000000027_

- **1928.01** `state_expire:yf18-runaway-plan` tags: yf18-runaway-plan, escape, youth, plan, home, travel, risk, state
  Mitzi的「床底下的包袱」到期；相关安排结束。
  _effects: state_remove yf18-runaway-plan state:world-vienna-1912:303; flag -yf18_runaway_plan_active_

- **1928.01** `state_tick:wish-knowledge/knowledge-pressure/press-on` tags: wish-knowledge, wish, wish:knowledge, knowledge, education, curiosity, state, state_tick
  Mitzi又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.020000000000000018_

- **1928.01** `r13-edu.exam-eve::ctx-vienna-reform-1930::milieu-tenement/passed-entrance-exam` tags: education, exam, study, poverty, adolescence, reform, medical, schooling
  Mitzi把煤油灯芯剪短，省下油熬到后半夜。代数题做错三遍，Mitzi就用冷水拍脸，再把公式抄到手腕内侧。考试那天，监考把袖口翻了一遍，Mitzi还是把最后一道题解完了。放榜那天，Mitzi在人群后面站了很久，才敢往前挤。
  _effects: mood 0.06; flag +passed_entrance_exam; skill_

- **1928.02** `yf18-firstlook.essay-exam::ctx-vienna-reform-1930::milieu-tenement/the-teacher-keeps-it` tags: first_love, exam, essay, school, humiliation, reform, medical, schooling
  德语作文题是《我的家乡》。Mitzi写了半页多瑙河，剩下半页写一个总在电车上看书的人。Josef Lechner 2没有打分，只在页边写“感情太多，论据太少”，把作文折好放进自己的公文包；放学后，Mitzi看见Lena在门口等，忽然不敢走过去。
  _effects: state_parameter yf18-first-awakening.intensity 60 -> 66; state_parameter yf18-first-awakening.talk 5 -> 8; skill; reputation -0.010000000000000002; mood 0.010000000000000009; relation acquaintance with person-materialized-world-vienna-1912-11_

- **1928.02** `state_reaction:yf18-first-awakening/exam-week-distraction` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  考试周里，Mitzi把课本摊在桌上，眼睛却一直看着窗外那条电车线。笔记的页边多了几个没有写完的名字，Mitzi用橡皮擦掉，纸面起了毛。
  _effects: state_parameter yf18-first-awakening.intensity 66 -> 63; state_parameter yf18-first-awakening.talk 8 -> 10_
  _causes: evt:world-vienna-1912:003780_

- **1928.02** `state_reaction:wish-knowledge/knowledge-humiliation` tags: wish-knowledge, wish, wish:knowledge, knowledge, education, curiosity, state, state_reaction
  Mitzi把那句轻视记了很久。它没有变成一个决定，但也没有消失。
  _effects: mood -0.03999999999999998_
  _causes: evt:world-vienna-1912:003780_

- **1928.02** `r15-work.master-takes-on::ctx-vienna-reform-1930::milieu-tenement/unpaid-trial` tags: work, craft, apprentice, trade, poverty, reform, medical, schooling
  Friedrich Berg先说试三个月，不给工钱，只管一顿午饭。家里同意了，因为多一张嘴比多一双手更难。Mitzi每天最早到，最晚走，三个月后师傅才把契约拿出来。
  _effects: food; mood -0.03999999999999998; state_add apprenticeship-contract state:world-vienna-1912:358; relation acquaintance with person-materialized-world-vienna-1912-29; education apprenticeship; role_

- **1928.06** `r13-turn.exam-failure::ctx-vienna-reform-1930::milieu-tenement::reform-open-secondary/retake-fee` tags: education, exam, failure, school, work, reform, medical, schooling
  成绩单上差两分。Friedrich Weiss说可以补考，但要先交一克朗卷子费，还得让Alois Lechner来签字。Alois Lechner在办公室门口把帽子捏变了形，说家里拿不出这份钱。Mitzi把错题抄到烟盒背面，第二天照样去上课，只是不再举手。
  _effects: cash -1 (落榜名单上的第三个名字); mood -0.15000000000000002; condition; flag +failed_entrance_exam; skill; relation guardian with person-alois-lechner_

- **1928.09** `r3-teen.police-caution::ctx-vienna-reform-1930::milieu-tenement::reform-parent-notice/cautioned` tags: police, caution, record, family, work, reform, medical, schooling
  Maria Berg把Mitzi的名字写进一本硬皮簿子，问一句写一句，最后让他按手印。Alois Lechner赶来时，Maria Berg说带回去好好管教，这次不立案。走出门口，Alois Lechner的手一直攥着Mitzi的袖子。
  _effects: reputation -0.04; relation guardian with person-alois-lechner; knowledge “the police opened a caution file in the subject’s name”; relation acquaintance with person-materialized-world-vienna-1912-53_

- **1928.10** `r3-teen.first-love::ctx-vienna-reform-1930::milieu-tenement/rejected` tags: love, courtship, school, tram, secrecy, reform, medical, schooling
  Mitzi把叠成方块的纸条塞给Anton，第二天在课桌里找回同一张纸，边角压平了，字没有被打开过。放学时Anton从另一边走了，Mitzi坐在电车上，一直坐到终点站。
  _effects: mood -0.16000000000000003; flag +first_love_rejected; relation acquaintance with person-phase15-Anton-world-vienna-1912_

- **1929.01** `state_expire:yf18-first-awakening` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Mitzi的「第一次心动」到期；相关安排结束。
  _effects: state_remove yf18-first-awakening state:world-vienna-1912:194; flag -yf18_first_awakening_active_

- **1929.01** `state_tick:apprenticeship-contract/workshop-year/learned` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Mitzi又学会了一道工序。师傅没有夸，只把下一块料推到面前。
  _effects: state_parameter apprenticeship-contract.progress 8 -> 28; skill; mood 0.020000000000000018_

- **1929.01** `r13-edu.music-lesson::ctx-vienna-reform-1930::milieu-tenement/first-recital` tags: education, music, lesson, craft, culture, reform, medical, schooling
  Mitzi在期末演奏会上拉完一首短曲，弓毛断了两根，最后一个音还是稳住了。Berta Kral 2在台下点头，师母把手套摘下来鼓掌。回家后，Mitzi把琴擦了三遍，才发现肩托把脖子磨出一道红印，碰一下就疼。Mitzi没有告诉任何人。琴盒没关。
  _effects: reputation 0.05; skill; relation acquaintance with person-materialized-world-vienna-1912-68_

- **1930.01** `state_tick:apprenticeship-contract/workshop-year/learned` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Mitzi又学会了一道工序。师傅没有夸，只把下一块料推到面前。
  _effects: state_parameter apprenticeship-contract.progress 28 -> 48; skill; mood 0.020000000000000018_

- **1930.01** `kernel-health.task-house-call::ctx-vienna-reform-1930::milieu-tenement::house-call-medical-students/house-call-medical-ambulance` tags: health, task, house_call, care, poverty, reform, medical, schooling
  助理医生拿不准，叫了救护车。Mitzi被抬进医院，走廊里等了六个小时才排到床位；家里人后来算了一笔账，救护车比药贵。救护车在石板上颠，他抓着担架边，数着路灯。医院门口的担架已经排到街上。
  _effects: move place-wien-allgemeines-krankenhaus; cash -15 (ambulance and hospital admission); health 0.05 (admitted for observation and oxygen); role; knowledge “实习医生拿不准就会叫救护车；走廊等六个小时才有床，车费比药贵。”_

- **1930.02** `vienna-illness-household.child-fever/call-doctor` tags: health, family, home
  夜里Friedrich Winter哭醒，Mitzi独自用湿布敷额，熬到街上有人扫雪才去请医生。医生进门时靴底带着雪泥，听完胸口说无大碍；那三克朗花得心疼，却换回一条稳下来的呼吸。
  _effects: health 0.1 (医生诊治后退烧); cash -3 (支付医生诊费和药粉); mood -0.050000000000000044_

- **1930.02** `vienna-courtship-courtyard.breakup/keys-and-photo-returned` tags: adulthood, courtship, partner, social, family, separation
  院子里晾着三条床单，风一过就拍到人脸上。Mitzi把备用钥匙和一张照相馆拍的合影交还，Anton把那件借来的外套叠好递回。两人说好各找各的住处，谁都没有提高声音；分手分得干净，可两个人心里都空了一块。
  _effects: relation_end partner with person-phase15-Anton-world-vienna-1912; mood -0.08999999999999997; flag +courtship_ended_cleanly_

- **1930.02** `vienna-parish-aid.rent-box/rent-box.accept-all` tags: faith, parish, mutual_aid, poverty, family
  煤袋落在台阶上，扬起细细一层黑末。Emil Weiss用铅笔头在蓝格册上写门牌号，问房东姓什么，又叮嘱别把面包票弄丢。灶上水壶开始叫，Mitzi才想起屋里连只干净的杯子都没有。
  _effects: cash 6 (互助会补上本月房租差额); food; flag +parish_registered_

- **1930.02** `statistical_infection`
  Mitzi在Allgemeines Krankenhaus病倒了，肺炎让身体发热、虚弱，接下来的日子只能卧床。

- **1930.02** `p9-gap-adult-unemployed.soup-kitchen/soup-got-scoop` tags: adulthood, unemployment, casual_labour, poverty, daily, relief, food, church
  教堂后院的铁锅冒着白汽，排队的人把各种罐子捧在胸前。Maria Kral穿着灰围裙一勺一勺地分，轮到Mitzi时锅底已经露出来，勺子刮出响声，还是刮了半勺倒进罐里。
  _effects: food; health 0.03 (热汤下肚驱了寒气); relation acquaintance with person-materialized-world-vienna-1912-60_

- **1930.03** `statistical_illness_worsened`
  Mitzi的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1930.04** `vienna-legacy-worklife.sick-fund/sick-fund.advance-from-fund` tags: legacy, work, family, reform, ordinary_life
  互助金的铁盒上了两把锁，钥匙一把在Mitzi手里，一把在邻街的面包师那里。取钱时面包师说“月底前要补回来”。药买回来了，雇主那边的人说手续“走流程”，说完就去忙别的。
  _effects: cash -2 (从互助金垫付药费); health 0.05999999999999999 (及时买到药)_

- **1930.05** `vienna-medical-treatment.sanatorium/ignore-diagnosis` tags: health, medical, family, money
  下午的活是搬纱锭，Mitzi蹲下去再站起来眼前发黑，扶墙站了一会儿。工友老约瑟夫把自己的水杯推过来，说去诊所开个假条吧，她摇头，说假条要扣钱。
  _effects: condition; mood -0.040000000000000036_

- **1930.06** `statistical_recovery`
  Mitzi从肺炎中慢慢恢复，能下床喝水，但身体还虚弱。

- **1931.01** `state_expire:apprenticeship-contract` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick, state:apprenticeship-contract
  Mitzi的「学徒契约」到期；相关安排结束。
  _effects: state_remove apprenticeship-contract state:world-vienna-1912:358; role_

- **1931.01** `kernel-health.task-pharmacy-hunt::ctx-vienna-reform-1930::milieu-hospital/pharmacy-aspirin-substitute` tags: health, task, pharmacy, shortage, black_market, reform, medical, schooling
  药房说没有货，Mitzi把处方叠好，去了下一家。天黑时手里只有一包阿司匹林和一瓶咳嗽糖浆；Ferdinand Lechner说总比空手强，把糖浆让给了孩子。回家后他把阿司匹林分成两半，糖浆瓶口用纸塞着，漏了一点。
  _effects: cash -8 (aspirin and cough syrup after a day of searching); health -0.03 (the prescribed medicine was not found); condition; role; relation acquaintance with person-materialized-world-vienna-1912-14_

- **1931.04** `p9-gap-adult-unemployed.factory-gate/gate-queue-clash` tags: adulthood, unemployment, casual_labour, poverty, daily, factory, hiring
  招工纸上的工钱写得明白，一天三克朗八十赫勒。Mitzi怕再等下去名额没了，从人缝里挤到前面，后面的Lena一把拽住袖子。门房抬头看了看乱糟糟的队伍，把玻璃窗拉上了。
  _effects: reputation -0.03; relation acquaintance with person-materialized-world-vienna-1912-57_

- **1931.09** `vienna-legacy-worklife.apprentice-wage/apprentice-wage.ask-master` tags: legacy, work, family, reform, ordinary_life
  掌柜的木尺敲了两下柜台，声音短促。Mitzi把问题又问了一遍，掌柜才说师兄是“老规矩进来的”。师兄这时转过身，笑了一下，笑得不太自然，说“没事，你问得对”。
  _effects: reputation -0.04; relation colleague with person-emil-weiss; skill_

- **1931.12** `vienna-market-debt.rent-arrears/rent-negotiate-installments` tags: market, debt, money, home, shop
  你没去借钱，直接下楼找房东，说月底前先付两克朗，剩下两克朗分两个星期补齐。房东叼着雪茄，拿铅笔在你的纸条背面写了个日期，说再拖一天就换锁。邻居在楼道口听见了，冲你摇了摇头，但没说什么。
  _effects: cash -2 (按分期付掉的第一笔欠租（其中2克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-45; flag +rent_installment_plan; relation acquaintance with person-materialized-world-vienna-1912-45_

- **1932.01** `vienna-life-injury-recovery/clinic-treatment` tags: health, work, family
  Mitzi在受伤后的第三天去了诊所。医生清洗伤口、换药，收下诊费，嘱咐不要急着回机器旁。Mitzi把药方折好，回家路上买了纱布。
  _effects: health 0.05 (wound treatment); cash -8 (clinic and bandages（其中8克朗记入债务）); condition_
  _causes: evt:world-vienna-1912:005535_

- **1932.01** `state_tick:wish-knowledge/knowledge-pressure/press-on` tags: wish-knowledge, wish, wish:knowledge, knowledge, education, curiosity, state, state_tick
  Mitzi又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.020000000000000018_

- **1932.01** `p9-social-relationship-initiative.borrow-handcart/handcart-and-ten` tags: courtship, friendship, family, social, initiative, housing, task, task:social
  星期天搬家的前一晚，有人坐在印厂友人家的厨房里把事说全：车要借，十克朗也要借。对方合上账本，从抽屉里数出两张五克朗，说月底先还三克朗，剩下的按月摊。手推车的轮轴有点响，搬之前得先上油。
  _effects: cash 10 (友人借给搬家应急的十克朗); relation friend with person:evt:world-vienna-1912:000062:child; mood 0.050000000000000044; relation acquaintance with person-materialized-world-vienna-1912-73_

- **1932.04** `vienna-courtship-courtyard.sunday-walk/second-bridge-promise` tags: adulthood, courtship, partner, social, family, partnership
  在第二个桥洞下，Klara先停下来，用鞋尖碾一颗烤栗子壳，说下星期天还是这个时候、还是这座桥。Mitzi点头，掏出四赫勒买了两小袋栗子，两人分着剥，手上都是糖渍；桥洞上的水还在滴，谁也没有提万一明天下雨怎么办。
  _effects: relation partner with person-phase15-Klara-world-vienna-1912; cash -0.04 (两小袋烤栗子（其中0.04克朗记入债务）); mood 0.06000000000000005_

- **1932.12** `vienna-market-debt.pawn-watch/keep-watch-borrow-elsewhere` tags: market, debt, money, home, shop
  你们站在当铺招牌下面，风从巷口灌进来。邻居说他婆娘这个月也要买煤，但两克朗还能匀出来。你把表给他看了一眼，说这表不能当，是爹留下的。他点点头，没再问。
  _effects: cash 2.3 (向邻居借来的现钱); relation acquaintance with person-materialized-world-vienna-1912-56; mood -0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-56_

- **1933.01** `p10-migration-tasks.pawn-belongings/pawn-keep-thimble` tags: adulthood, migration, housing, family, travel, task, pawn, sale
  伴侣把银顶针从他手边拿走，说那是她母亲的东西，不能当。两人在桌前争了几句，最后她翻出藏在罐子底下的三克朗，他拿着那点钱出门，剩下的路费还得另想办法。
  _effects: cash -3 (拿出家中私藏的三克朗补路费，仍不够（其中0.7克朗记入债务）); relation partner with person-phase15-Klara-world-vienna-1912; mood -0.040000000000000036_

- **1933.06** `p9-gap-adult-solitude.stopped-clock/stopped-clock.repair-shop` tags: adulthood, daily, solitude, ordinary, home, clock, time
  Mitzi用围裙裹着钟走到钟表铺，铺子里的老头把钟翻过来看了看，说要换发条，连工带料一克朗二十赫勒。她算了算这星期的菜钱，把钟又裹回围裙里提回家，搁在柜上，没再提修的事。
  _effects: mood -0.040000000000000036_

- **1934.01** `task-vienna-medical-work.second-opinion/second-opinion-refused` tags: health, medicine, hospital, care, knowledge, profession, task, task:health
  Mitzi把硬币在掌心摊开，只够第一份诊费的一半。Emil Weiss看了一眼托盘，把病历推回来，写了一张转诊单，说下星期带钱再来。Mitzi捏着那张纸走出门，在楼梯口站了一会儿，夜里还是靠原来的药粉硬撑。
  _effects: cash -0.5 (付不出全额诊费，只留下零钱（其中0.5克朗记入债务）); mood -0.020000000000000018_

- **1934.05** `vienna-adult-social.burial-fund/burial-fund.paid` tags: adulthood, social, work, family
  车间里管互助会的Rosa在午休时把本子摊在Mitzi的工具箱上，说这个月还差最后一份月钱。Mitzi从马甲内袋摸出二十个克罗伊策，Rosa当着他的面在本子上画了钩。
  _effects: cash -0.3 (缴纳丧葬互助会的月钱（其中0.3克朗记入债务）); relation colleague with person-phase15-Rosa-world-vienna-1912; reputation 0.04_

- **1934.08** `vienna-medical-treatment.sanatorium/home-rest` tags: health, medical, family, money
  安娜的汤锅外面包着旧毛巾，端进来时还烫手。Mitzi靠着枕头喝，喝一半咳一半。房东太太在走廊里故意大声说，肺病可不是闹着玩的，安娜探出头去，说医生讲了不传染。
  _effects: health 0.03 (在家休养但条件有限); food; cash -0.5 (房东要求的清洁费（其中0.5克朗记入债务）); relation friend with person-friedrich-hofer_

- **1935.01** `p10-migration-tasks.ask-travel-money/uncle-refuse-introduce-carrier` tags: adulthood, migration, housing, family, travel, task, loan, relative
  舅父听完摇了摇头，说钱不借，倒可以给他写张条子，介绍一个跑布吕恩的车夫，让他搭便车走。舅母把点心收进橱里，说路上总得带点吃的。他收了条子，坐车夫的车走了两天。
  _effects: relation kin with person-materialized-world-vienna-1912-60; cash -1 (路上给车夫买烟叶的道谢钱（其中1克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-28_

- **1935.04** `vienna-women-housework.piecework-bundle/piecework.hide-defects` tags: gender, housework, home, labour, family
  篮底那两件领子卷得很紧，Mitzi用围裙角把篮沿擦了擦。Gustav Weiss翻了翻面上几件，拿尺子比了比，没再往下。Friedrich Berg在走廊里问交了多少，Mitzi含混说了句够买面包。
  _effects: cash 0.7 (交活所得，含未返工的两件); reputation -0.02_

- **1935.08** `vienna-parish-aid.funeral-society/funeral-society.quit` tags: faith, parish, mutual_aid, poverty, family
  Mitzi说互助会先退了，这笔钱要留给煤和面包。Emil Weiss没争辩，在蓝皮本上把名字划了一道，问清楚是不是全家都退，然后把划掉的那行折进本子夹缝。她说以后想再进，要重新排三个月。门关上，Mitzi听见铅笔在楼梯上轻轻敲了两下栏杆。
  _effects: cash 0.4 (省下本周会费留作煤钱); flag +funeral_society_left_

- **1935.09** `vienna-history-kraus-lecture/listen-from-a-pillar` tags: history, culture, karl_kraus, cafe_central, public_lecture, press
  后厅的椅子不够，Mitzi 站在柱子旁听Karl Kraus 读一篇关于报纸谎言的文章。Karl Kraus 读到一半停下来，指出台下某位记者上周写的句子，那人把帽子压低。散场后，Mitzi 在账单背面抄下一句，墨迹被咖啡杯底印开。
  _effects: knowledge “Karl Kraus 在咖啡馆公开朗读时，会逐句引用报纸原文并指出其中的修辞和谎言。”; relation acquaintance with person-karl-kraus; cash -2 (coffee and a seat at Café Central（其中0.9克朗记入债务）); mood 0.020000000000000018; skill_

- **1936.01** `state_tick:wish-knowledge/knowledge-pressure/put-away` tags: wish-knowledge, wish, wish:knowledge, knowledge, education, curiosity, state, state_tick
  Mitzi暂时把那件事收进抽屉；日子还有别的东西要应付。
  _effects: mood -0.020000000000000018_

- **1936.01** `p9-work-jobsearch.ask-trial/ask-trial.no-vacancy` tags: work, job_search, negotiation, wages, employment, task, trial, factory
  Anton Kral 2没有接话，先从抽屉里撕下一角纸。Mitzi把名字、住址和手艺一样样说完，工头边写边应，写完把纸压回抽屉，说月底来问。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-86; flag +seeking_work; relation acquaintance with person-materialized-world-vienna-1912-86_

- **1936.06** `p9-history-medical-daily.clinic-queue/queue-until-noon` tags: health, medical, public_health, family, pharmacy, sanitation, daily
  Mitzi在诊所门口从五点半站到十一点，膝盖发僵，终于用最后四十赫勒付了挂号费。门房撕下转诊单，叫Mitzi去综合医院排队，药费还得另算；队伍拐过街角时天还黑着，Mitzi数着前面二十三个后脑勺，记住了综合医院药房下午才开窗口。
  _effects: cash -0.4 (诊所挂号费（其中0.4克朗记入债务）); knowledge “综合医院的药房比街角药房便宜，但要排到下午”_

- **1937.01** `p9-social-relationship-initiative.cut-the-guarantee/pay-small-part` tags: courtship, friendship, family, social, initiative, housing, task, task:social
  替他还了四克朗，剩下的数目不碰，条件是把赌债字据交出来，当天就去戒酒会挂个名。对方把字据给了，人却没去挂名。四克朗从工资袋里出去，母亲那瓶药只好再等十天，晚上咳得更紧。
  _effects: cash -4 (替友人偿还部分赌债（其中4克朗记入债务）); relation friend with person-materialized-world-vienna-1912-72; relation acquaintance with person-materialized-world-vienna-1912-72; relation acquaintance with person-materialized-world-vienna-1912-65_

- **1937.04** `vienna-courtship-courtyard.family-table/leave-before-dessert` tags: adulthood, courtship, partner, social, family, partnership
  问到后来，Alois Lechner提起别家有个更稳当的差事。Mitzi Bauer 2把餐巾往桌上一放，说吃好了，先走。两人在楼梯间站住，Mitzi Bauer 2说不是Mitzi的错，可下次再来还得一样坐这张桌子；Mitzi心里松了一点，也知道这顿饭没吃完，事情并没有过去。
  _effects: relation partner with person-materialized-world-vienna-1912-36; relation kin with person-alois-lechner; mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-36_

- **1937.12** `p9-social-tenement-neighbors.rent-note/rent-note.look-for-cheaper-bed` tags: housing, neighbors, tenement, daily, money, reputation
  Mitzi没去事务所，只在洗衣房打听更便宜的床位。有人提到利奥波德城另一条街上有一间合住的屋子，一个月少一克朗半，只是要跟三个人共用一间。Mitzi去看了两趟，量了窗子和床的位置，回来把箱子底下的旧报纸铺开算账。
  _effects: flag +looking_for_cheaper_housing; relation acquaintance with person-materialized-world-vienna-1912-104_

- **1938.01** `vienna-life-anschluss-1938/complies` tags: politics, persecution, 1938
  Berta Hofer 2在街口设了登记桌，要求住户交出姓名、职业和宗教。Mitzi排队填了表，回家把门牌擦干净。楼里有人连夜搬走，也有人站在阳台上挥手。
  _effects: role; cash -3 (new permits and stamps（其中3克朗记入债务）); condition; relation acquaintance with person-materialized-world-vienna-1912-92_

- **1938.01** `p9-work-jobsearch.relative-introduction/relative-introduction.warehouse-errand` tags: work, job_search, negotiation, wages, employment, task, relative, introduction
  “先替我看两个月仓库。”Josef Winter说得很平，好像这是最省事的安排。Mitzi跟着到仓库，麻袋咬破的地方漏出一路面粉，角落里那张床短得伸不直腿。
  _effects: relation kin with person-materialized-world-vienna-1912-93; food; condition_

- **1938.04** `vienna-housing-move.moving-day/moving-day-handcart` tags: housing, home, rent, family, money
  手推车每走十几步就要停一下，楼道里的门半开着，有人探头看热闹。Mitzi把照片铁盒交给Mitzi 2抱着，自己低头把最后一箱锅具拖上楼。天擦黑时，新屋里才勉强归置出下脚的地方。
  _effects: cash -1 (借手推车买烟熨谢邻居的小开销（其中1克朗记入债务）); relation acquaintance with person:evt:world-vienna-1912:000622:child_

- **1938.10** `p9-gap-adult-ordinary-day.lost-dog/lost-dog.feed-bread` tags: adulthood, daily, leisure, neighborhood, ordinary, animal, neighbor
  巷子里卖煤的正往板车上装货，看见狗绕过来，说这狗在环城道那边就有人找。Mitzi把面包递过去时，狗用鼻子拱了拱她的掌心。男人跑来时手里还攥着半截绳子，连声道谢，说这狗是替人看院子的。
  _effects: mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-81_

- **1939.01** `p10-migration-tasks.ask-travel-money/uncle-refuse-introduce-carrier` tags: adulthood, migration, housing, family, travel, task, loan, relative
  舅父听完摇了摇头，说钱不借，倒可以给他写张条子，介绍一个跑布吕恩的车夫，让他搭便车走。舅母把点心收进橱里，说路上总得带点吃的。他收了条子，坐车夫的车走了两天。
  _effects: relation kin with person-otto-winter; mood -0.030000000000000027; cash -1 (路上给车夫买烟叶的道谢钱（其中1克朗记入债务）)_

- **1939.02** `vienna-housing-move.rent-notice/rent-notice-pay` tags: housing, home, rent, family, money
  Mitzi把通知念给Gustav Stein听，Gustav Stein摇头说是楼梯间那几块新玻璃的账。Mitzi去楼下杂货铺换开一张五克朗的纸币，回屋一枚一枚摆开数，煤箱底多留了二十赫勒。
  _effects: cash -2 (按月多付两克朗房租（其中2克朗记入债务）); mood -0.030000000000000027_

- **1940.01** `p10-family-tasks.find-missing-kin/find-missing-kin.missing-list` tags: adulthood, family, social, marriage, care, inheritance, task, missing_kin
  警察局的桌子后面的人把哥哥的名字写进名册，撕下一张编号条。Mitzi在走廊里碰到一个女人，她找丈夫，手里也捏着一张条子。两人跑了两处收容所，登记簿翻到最后一页也没有。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-66; flag +brother_missing_registered; relation acquaintance with person-materialized-world-vienna-1912-100; relation acquaintance with person-materialized-world-vienna-1912-66_

- **1940.10** `vienna-legacy-worklife.apprentice-wage/apprentice-wage.ask-master` tags: legacy, work, family, reform, ordinary_life
  柜台上摊着两张工资袋，一张油墨新，一张已经磨毛了边。Mitzi把两袋并排放，掌柜伸出食指把旧的拨到一边，说“你管好自己的”。师兄在窗口看街对面修鞋摊，一直没回头。
  _effects: reputation -0.04000000000000001; relation colleague with person-franz-lechner; skill_

- **1940.11** `p9-social-tenement-neighbors.rent-note/rent-note.pay-increase` tags: housing, neighbors, tenement, daily, money, reputation
  Mitzi把纸条压在糖罐下面，算了半天：两克朗正好是四天的面包钱。月底还是把涨后的房租数出来交给看门人，铜币在桌上摞成两小堆。那一周的晚饭改成面包和稀汤，猪油省着抹。
  _effects: cash -2 (按涨租纸条多付的两克朗（其中2克朗记入债务）)_

- **1941.01** `state_tick:wish-knowledge/knowledge-pressure/press-on` tags: wish-knowledge, wish, wish:knowledge, knowledge, education, curiosity, state, state_tick
  Mitzi又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.020000000000000018_

- **1941.01** `p9-social-family-conflict-care.sibling-medicine-bill/refuse-push-bill` tags: family, care, siblings, inheritance, housing, money
  Mitzi把药费单从糖罐底下抽出来，对折，推回桌子中央，说上个月的工钱已经贴过煤钱，这回一个赫勒也拿不出。Franz Lechner的脸沉下来，练习本翻得哗哗响，最后把单子重新压回糖罐底下，起身去够门后的外套。三只咖啡杯里的渣子凉在桌上，兄妹这一回把话都说薄了。
  _effects: mood -0.020000000000000018_

- **1941.06** `vienna-parish-aid.sick-call/sick-call.help-in` tags: faith, parish, mutual_aid, poverty, family
  Mitzi和Ferdinand Kral 3一起上楼，门没锁，屋里一股酸味。病人裹着毯子坐在床沿咳嗽，炉子只剩灰。Mitzi去楼下讨了几块煤核，蹲着把火生起来，又用带来的面粉搅了一小锅稀粥。药粉冲开，碗底沉着白渣，Mitzi先垫了药钱，说以后再说。
  _effects: cash -0.6 (替病人垫上药粉钱（其中0.6克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-89; flag +parish_sick_visitor; relation acquaintance with person-materialized-world-vienna-1912-89_

- **1942.01** `p9-work-jobsearch.ask-trial/ask-trial.no-vacancy` tags: work, job_search, negotiation, wages, employment, task, trial, factory
  Josef Winter没有接话，先从抽屉里撕下一角纸。Mitzi把名字、住址和手艺一样样说完，工头边写边应，写完把纸压回抽屉，说月底来问。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-93_

- **1942.03** `vienna-social-movement.recruitment/join-and-carry` tags: development, social_movement, organization, politics
  Mitzi在楼梯下面接到一张折成四折的传单。纸上没有署名，只写着下一次集会的地址。Mitzi去了，在昏暗的屋里报上姓名，成为Freie Gewerkschaft der graphischen Arbeiter Wiens的一员，并答应负责自己所在街区的联络。
  _effects: organization_membership; role_

- **1943.01** `p10-family-tasks.find-missing-kin/find-missing-kin.toolbox` tags: adulthood, family, social, marriage, care, inheritance, task, missing_kin
  旅店老板把仓库门打开，工具箱靠在墙角，刨刃上还有木屑。老板说人走时没带，欠的房钱拿工具抵。Mitzi在旧货商那里把刨子和凿子卖了，换了三克朗，刚够一张回维也纳的车票。
  _effects: cash 3 (卖掉哥哥留下的工具换路费)_

- **1943.02** `p9-gap-adult-ordinary-day.flea-market-cup/flea-market-cup.buy-cracked` tags: adulthood, daily, leisure, neighborhood, ordinary, flea_market, object
  她付钱时，摊主找了几个铜板，顺手把杯子用旧报纸裹上。回家拆开报纸，杯底那道裂纹在灯下看得更清楚。她还是倒了半杯茶进去试，看水从缝里渗出来，在桌上慢慢汪成一小片。
  _effects: cash -0.4 (买下有裂纹的描金边杯子（其中0.4克朗记入债务）); mood 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-119_

- **1943.03** `vienna-women-housework.wash-day/wash-day.send-out` tags: gender, housework, home, labour, family
  洗衣妇把工服从报纸里抖出来，翻开领口看了看油垢，点头收下。Mitzi转身回屋，铜板在围裙口袋里磕出轻响。Lena还在楼梯上嘟囔，说这钱不如买半斤猪油。
  _effects: cash -0.5 (请洗衣妇代洗工服（其中0.5克朗记入债务）); mood 0.030000000000000027; relation acquaintance with person-phase15-Lena-world-vienna-1912_

- **1943.03** `vienna-historical-social-movement.district-list/hold-list-and-watch` tags: history, historical_process, social_movement, organization, politics
  Grete Lechner 2把会费账本推回去，说外头那个组织答应给煤，只要名单。Mitzi把账本合上，用一块旧布包好塞进缝纫机底下，说先看看谁在往外递话。两人都没再提这事。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-79; mood -0.030000000000000027; flag +kept_district_list_private; relation acquaintance with person-materialized-world-vienna-1912-79_

- **1943.10** `p9-history-union-political.meeting/meeting-speak-up` tags: politics, union, party, meeting, leaflet, police, strike, reform
  Mitzi站起来报出自己车间的计件工价：糊一百个纸盒二十八赫勒，比隔壁车间少六个。屋里一下子静了，Marie Huber把草稿推过来，让书记员把这几个数字写在动议第一行。散会时有人拍了拍Mitzi的肩膀。
  _effects: reputation 0.04; relation colleague with person-marie-huber; relation acquaintance with person-materialized-world-vienna-1912-99_

- **1944.01** `agency:attend_meeting` tags: agency, agency:attend_meeting
  Mitzi走到Versammlungsraum der graphischen Arbeiter门口，看见便衣和拥挤的人群，最终没有进去。
  _effects: mood -0.020000000000000018_

- **1944.04** `vienna-parish-aid.funeral-society/funeral-society.quit` tags: faith, parish, mutual_aid, poverty, family
  Mitzi说互助会先退了，这笔钱要留给煤和面包。Luise Kral没争辩，在蓝皮本上把名字划了一道，问清楚是不是全家都退，然后把划掉的那行折进本子夹缝。她说以后想再进，要重新排三个月。门关上，Mitzi听见铅笔在楼梯上轻轻敲了两下栏杆。
  _effects: cash 0.4 (省下本周会费留作煤钱); relation acquaintance with person-luise-kral_

- **1944.12** `vienna-church-community.saint-vincent-box/box-request-granted` tags: faith, social, family, home
  Mitzi在圣文生会门口登记，领到一张面包券和一小袋土豆。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-28; mood 0.030000000000000027_

- **1945.01** `vienna-life-1945-liberation/survives` tags: war, liberation, 1945
  苏联士兵进城时，Mitzi躲在门后听见坦克履带压过石板路。几天后街口贴出告示，Mitzi去领了一份汤和一块面包。
  _effects: role; food; cash -2 (replacement documents（其中2克朗记入债务）)_

- **1945.01** `state_tick:wish-knowledge/knowledge-pressure/press-on` tags: wish-knowledge, wish, wish:knowledge, knowledge, education, curiosity, state, state_tick
  Mitzi又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.020000000000000018_

- **1945.01** `p10-migration-tasks.pawn-belongings/pawn-watch-and-coat` tags: adulthood, migration, housing, family, travel, task, pawn, sale
  他把怀表和两件冬衣递上铁栅栏后的柜台，当铺的人翻过表壳、抖了抖衣领，报出九克朗，写在一张蓝纸当票上。他留下那套木工工具，把当票折成小方块塞进身份证后面，数钱时手指有点抖。
  _effects: cash 9 (当掉怀表与两件冬衣换来的现钱); mood -0.050000000000000044; knowledge “当铺赎当期限六个月，过期死当，蓝纸当票要收好”_

- **1945.03** `vienna-market-debt.coal-credit/coal-scavenge-station` tags: market, debt, money, home, shop
  你把已经掏出来的赫勒又放回口袋，说不赊了。老板哼了一声，把账本往柜台上一合。你拎着空筐跟邻居往火车站方向走，在货运站边的煤渣堆里捡了半袋碎煤和焦炭。手指冻得发僵，指甲缝里全是黑灰。
  _effects: food_

- **1945.05** `vienna-housing-move.moving-day/moving-day-handcart` tags: housing, home, rent, family, money
  第一趟过街口时车上的煤箱差点翻下来，Katharina Moser 2用膝盖顶住，Mitzi把绳子又收了一道。第三趟回来，两人靠在门框上喘气，鞋底都是灰，省下的钱还揣在围裙里。
  _effects: cash -1 (借手推车买烟熨谢邻居的小开销（其中1克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-104_

- **1945.07** `p9-history-medical-daily.clinic-queue/give-place-to-mother` tags: health, medical, public_health, family, pharmacy, sanitation, daily
  Gustav Weiss抱着孩子连声道谢时，Mitzi已经弯着腰在咳。药房玻璃瓶上贴着褪色标签，喝下去满嘴甘草味；后半夜Mitzi听见自己牙齿打颤，炉子早灭了。
  _effects: cash -0.6 (街角药房买退烧药（其中0.6克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-28_

- **1945.11** `vienna-market-household.market-credit/market-credit.pay-later` tags: home, market, food, social
  菜贩玛丽亚把账记在木牌上，Mitzi答应周五还。到了周五，Mitzi把三个克朗数了又数，终于递过去，Friedrich Winter在旁边看着。
  _effects: cash -3 (偿还市场赊账（其中3克朗记入债务）); food; relation acquaintance with person:evt:world-vienna-1912:001622:child_

- **1946.04** `statistical_infection`
  Mitzi在Leopoldstädter Zinshaus, gemeinsamer Gang病倒了，肺炎让身体发热、虚弱，接下来的日子只能卧床。

- **1946.06** `statistical_illness_worsened`
  Mitzi的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1946.08** `statistical_recovery`
  Mitzi从肺炎中慢慢恢复，能下床喝水，但身体还虚弱。

- **1947.01** `statistical_death/other` tags: death
  Mitzi在Leopoldstädter Zinshaus, gemeinsamer Gang突发急病，高热和虚弱持续了几天。医生没能给出明确诊断，Mitzi在一个夜里去世。
  _effects: death (急性疾病)_
## Josef

Born 1912.01, died 1940.01 (age 28).
Education: apprenticeship 1; occupation: none; roles: infant, child, home_tutor, police_record, worker, reconciled_relative, office:太平间杂役, vaccination_refuser, partner, father, registered_resident, deserted, pledge_holder.

### State snapshot
- wish-craft [person] (ended 1940.1: owner_died) parameters={"intensity":0.55,"fixation":0.5,"irony":0.3} links={} ticks=4
- p22-family-legend [person] (ended 1912.3: replaced_by:p22-family-legend) parameters={"warmth":67,"secrecy":14,"danger":5,"promise":45} links={} ticks=0
- p22-family-legend [person] (ended 1917.1: duration expired) parameters={"warmth":63,"secrecy":60,"danger":25,"promise":59} links={} ticks=3
- yf18-first-awakening [person] (ended 1928.1: duration expired) parameters={"intensity":49,"nerve":5,"talk":23,"reciprocated":false,"secret":true} links={"beloved":"Rosa"} ticks=2
- yf18-first-awakening [person] (ended 1930.1: duration expired) parameters={"intensity":72,"nerve":0,"talk":55,"reciprocated":false,"secret":true} links={"beloved":"Klara"} ticks=5
- apprenticeship-contract [person] (ended 1928.1: duration expired) parameters={"progress":28,"failures":0,"trade":"木工","paid":false} links={} ticks=2
- ld18-impossible-attachment [person] (ended 1940.1: owner_died) parameters={"devotion":77,"improvisation":35,"pressure":90,"discretion":8,"grief":9,"named":"the one who waited outside"} links={"beloved":"Gustav Bauer"} ticks=6
- public-scandal [person] (ended 1935.1: 公开嘲笑自己的丑闻，丑闻不再能伤到这个人) parameters={} links={} ticks=0
- oj18-odd-apprenticeship [person] (ended 1937.1: duration expired) parameters={"trust":4,"strangeKnowledge":30,"reliability":40,"nightsWorked":0,"post":"太平间杂役"} links={} ticks=2
- ml18-reversal [person] (ended 1938.1: duration expired) parameters={"strain":26,"swing":-4,"public":false,"story":"瓶盖专利的官司"} links={} ticks=2
- debt-bondage [person] (ended 1940.1: owner_died) parameters={"debt":10,"creditor":"房东"} links={} ticks=0

### 137 subject events

- **1912.03** `p22-strange-cradle-secret::ctx-vienna-1912::milieu-tenement/the-ticket-is-redeemed` tags: infancy, family, cradle, secret, inheritance, strange, dark, drama
  Josef Bauer拿着当票去赎，取回一把银勺子，勺柄上刻着一个看不清的字母。回家后把勺子塞进Josef手里，说“用吧”；孩子敲着桌沿，勺子发出很轻的响声，像在回答什么。
  _effects: cash -5 (redeeming the pawn ticket); health 0.010000000000000009 (a silver spoon to cut the first teeth); state_add p22-family-legend state:world-vienna-1912:13; flag +spoon_returned_

- **1912.08** `p22-comic-name-register::ctx-vienna-1912::milieu-tenement/the-clerk-hears-a-sneeze` tags: infancy, family, bureaucracy, name, official, comic, tender, drama
  登记员把Josef打喷嚏的声音当成了名字，低头就写，笔尖还在舌头上蘸了蘸。Josef Bauer抱着孩子，没看见那行字；等到拿着纸回家，才发现孩子的名字里多了一个“嚏”。
  _effects: mood 0.04; knowledge “登记簿上孩子的名字被写成了喷嚏声。”; flag +registered_as_hatschi; state_add p22-family-legend state:world-vienna-1912:12_

- **1912.08** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Josef家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 10 -> 14; state_parameter p22-family-legend.warmth 65 -> 67; mood 0.01_
  _causes: evt:world-vienna-1912:000092_

- **1912.09** `vienna-life-birth-letter-from-the-dead/the-letter-is-real` tags: infancy, family, secret, letter, drama
  邮差把一封边角磨白的信塞进门缝，收信人是一个已经死了三年的名字。Josef Bauer把Josef放在膝上，拆开信，里面只有一句：“孩子像不像他？”Anna Moser在门口探头，问是不是寄错了；Josef Bauer把信折回去，说“没有寄错”。
  _effects: flag +letter_from_dead_relative; knowledge “一封写给死去亲人的信问：孩子像不像他。”; mood -0.04_

- **1913.01** `vienna-life-infant-first-smile/smile-at-the-lamp` tags: infancy, family, first, warm
  Josef Bauer把Josef抱到窗边，煤汽灯罩上有一圈晃动的光。孩子盯着看了很久，忽然笑出声，口水滴在Josef Bauer的袖口上。屋里的人都停了一下，像是听见了什么了不起的消息。
  _effects: mood 0.04; health 0.010000000000000009 (a good day)_

- **1913.01** `state_tick:p22-family-legend/the-story-changes-hands/told-at-the-table` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，Josef家的故事在饭桌上换了新的讲法：多了一句笑话，少了一处哭声。听的人把汤匙放下，等下一句；讲故事的人却先去看窗子有没有关好，谁也没有先动筷子。
  _effects: state_parameter p22-family-legend.warmth 55 -> 58; state_parameter p22-family-legend.secrecy 60 -> 58; state_parameter p22-family-legend.promise 55 -> 57; mood 0.01_

- **1914.01** `vienna-life-toddler-wrong-cradle/the-neighbour-is-mistaken` tags: infancy, family, rumour, identity, comic, drama
  Josef Bauer把被子摊在桌上，指着上面的补丁说这是外婆的针脚。Anna Moser看了半天，承认自己认错了；Josef在旁边把一只木勺敲得咚咚响，像在给这场争论判案。
  _effects: relation acquaintance with person-anna-moser; mood 0.020000000000000004; skill_

- **1915.01** `vienna-life-child-family-legend/lost-relative` tags: childhood, family, secret, story
  Josef Bauer在收拾箱子时翻出一张没有署名的照片，说那是家里一个“去了很远地方”的人。Josef问还回不回来，Josef Bauer把照片翻过去，说先把名字记住，别在饭桌上问。
  _effects: knowledge “家里有一张没有署名的照片，照片上的人去了很远的地方。”; flag +family_legend_photo; mood -0.01_

- **1915.01** `state_tick:p22-family-legend/the-story-changes-hands/told-at-the-table` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，Josef家的故事在饭桌上换了新的讲法：多了一句笑话，少了一处哭声。听的人把汤匙放下，等下一句；讲故事的人却先去看窗子有没有关好，谁也没有先动筷子。
  _effects: state_parameter p22-family-legend.warmth 58 -> 61; state_parameter p22-family-legend.secrecy 58 -> 56; state_parameter p22-family-legend.promise 57 -> 59; mood 0.01_

- **1916.01** `vienna-life-child-first-friend/stolen-marble` tags: childhood, friendship, family, comic
  Lena把Josef的玻璃弹珠藏进鞋里，被当场看见。Lena说只是“替你拿着”，Josef没有揭穿，也没有再拿出第二颗。两个人蹲在墙根，把一只蚂蚁看了很久，谁也没有先回家。
  _effects: relation friend with person-phase15-Lena-world-vienna-1912; skill; mood -0.01_

- **1916.02** `vienna-life-child-inherited-wish/the-caregiver-cries` tags: childhood, family, wish, grief, uncanny, drama
  Josef Bauer没有回答，起身去洗碗，水开得很大。Josef跟到厨房，拽了拽衣角，说“你别哭，我不说了”。Josef Bauer蹲下来，把孩子抱得很紧，说“你说，你继续说”。
  _effects: mood -0.05; flag +inherited_wish_grief_

- **1916.02** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Josef家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 56 -> 60; state_parameter p22-family-legend.warmth 61 -> 63; mood 0.01_
  _causes: evt:world-vienna-1912:000638_

- **1917.01** `state_expire:p22-family-legend` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  Josef的「家族传说」到期；相关安排结束。
  _effects: state_remove p22-family-legend state:world-vienna-1912:13_

- **1918.01** `p9-gap-childhood-chores.mind-sibling/sibling-falls-at-well` tags: childhood, household, chores, school, task, daily, sibling, care
  土豆滚进墙角的煤灰里，Josef弯腰去追，再抬头时Berta Winter已经坐在井台边，裤腿湿了一片，哭声一抽一抽。Luise Moser把孩子抱进灶间，Josef跟在后面，手指抠着门框。Josef Bauer回来没问经过，只把Josef的碗收走一半，说“看个人都看不住”。
  _effects: mood -0.06; relation kin with person-josef-bauer; relation acquaintance with person-materialized-world-vienna-1912-1_

- **1919.01** `p9-gap-childhood-chores.laundry-help/laundry-bread-with-friend` tags: childhood, household, chores, school, task, daily, laundry, work
  两个孩子在院子两头跑，一个递，一个夹，床单在风里鼓起来。最后一条挂好，Josefine Hofer从厨房拿出面包，先给了自家孩子，再掰一块给Josef。Josef把面包塞进围裙口袋，回家后放在家里人的碗边，说自己在外面吃过了。
  _effects: food; relation acquaintance with person-josefine-hofer; skill; relation acquaintance with person-materialized-world-vienna-1912-7_

- **1919.12** `vienna-childhood-street.cigarette-card/card-trade` tags: childhood, street, social, home
  烟草店门口的石阶上摆着一排烟画。Josef把三张皱巴巴的卡摊开，Klara挑了挑，从口袋里摸出一张皇帝像。交换完，Klara转身进了杂货铺，把皇帝像往柜台上一拍，换了一块糖。Josef站在门外，手里还留着卡片的油墨味。
  _effects: mood 0.04; relation friend with person-phase15-Klara-world-vienna-1912_

- **1920.01** `p9-gap-childhood-chores.market-line/line-half-flour` tags: childhood, household, chores, school, task, daily, market, food
  队伍从面包房门口拐进巷子，Josef把布袋夹在腋下，学着前面人的样子，用胳膊肘顶住后面人的篮子。窗口的伙计舀面粉时，Josef踮脚看着秤，直到半袋面倒进袋口。挤出人群时鞋跟被踩掉，Josef单脚跳了两步，在泥里摸回鞋，索性赤脚走回家。
  _effects: food; health -0.020000000000000018 (赤脚走石板路磨伤脚底); skill_

- **1921.01** `p9-gap-childhood-chores.laundry-help/laundry-dragged-docked-pay` tags: childhood, household, chores, school, task, daily, laundry, work
  床单太长，Josef拖着一角往绳子走，布边扫过煤渣，立刻黑了一道。Franz Moser弯腰看了看，脸沉下来，说这角得重洗，工钱扣一半。Josef接过一赫勒，蹲在盆边用清水搓那一道灰，搓到指节发红，水面上还浮着煤末。
  _effects: cash 0.01 (被扣后只剩一赫勒); mood -0.05; relation acquaintance with person-materialized-world-vienna-1912-7_

- **1922.01** `p9-gap-childhood-chores.market-line/line-both-families` tags: childhood, household, chores, school, task, daily, market, food
  队伍拐弯时，Ferdinand Lechner 2朝Josef招手。Josef挤过去，替两家把面包领出来，纸包用不同的绳结系住。家里人晚上解开绳结，先掂了掂份量，再问价钱；Josef把每一包的面包数、找零和欠的铜板都说了一遍，家里人听完才把两包分别收进柜子。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-24; skill; relation acquaintance with person-materialized-world-vienna-1912-24_

- **1922.08** `vienna-childhood-street.cigarette-card/card-gift` tags: childhood, street, social, home
  Josef每天放学都在柜台前站一会儿，看玻璃板底下压着的烟画，顺手把歪了的报纸摞齐。Mitzi擦完柜台，从抽屉最里面摸出一张揉皱的风景卡，边角还沾着烟丝，塞过来时说了句“别挡着门”。Josef把卡夹进课本，第二天带了一张重复的来给Mitzi看。
  _effects: mood 0.06; reputation 0.02; relation friend with person-phase15-Mitzi-world-vienna-1912_

- **1923.01** `p9-gap-childhood-chores.laundry-help/laundry-three-heller` tags: childhood, household, chores, school, task, daily, laundry, work
  “拽平，别留褶。”Alois Lechner在绳子那头喊。Josef踮着脚把床单拉直，碱水把指缝泡得发白。收工时天已经黑了，Alois Lechner数了三赫勒，又在围裙上擦干手才递过来。Josef把钱塞进袜筒，回家路上一直攥着，虎口的裂口沾了汗，火辣辣地疼。
  _effects: cash 0.03 (帮邻居晾床单挣的三赫勒); health -0.030000000000000027 (碱水泡手，虎口裂开); relation acquaintance with person-alois-lechner_

- **1924.01** `state_tick:wish-craft/craft-pressure/press-on` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_tick
  Josef又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.02; flag +wish:craft:pursuing_

- **1924.08** `vienna-adolescence.workshop-apprentice/apprenticeship-rejected` tags: adolescence, school, work, family, social
  “太小，手也薄。”Buchdruckerei Winter & Söhne说完，把Josef推过的木板翻过来，指着上面一道啃痕。Josef Bauer把布包往肩上提了提，说打扰了。Josef在门口多站了一会儿，直到里面的刨子声把话头盖过去，才跟着Josef Bauer下楼。
  _effects: mood -0.08; reputation -0.05; relation kin with person-josef-bauer_

- **1925.01** `r13-fam.help-homework::ctx-vienna-reform-1930::milieu-tenement/sums-finished` tags: task, family, school, homework, sibling, literacy, reform, medical
  Josef把煤油灯往桌子中间挪，让Berta Winter看清算术本上的格子。孩子把七加八数了三遍，Josef没有直接说答案，只把豆子一颗颗排在桌上。最后一页写完时，灯芯已经烧黑，Josef才发现自己的作业还空着半页。
  _effects: flag +helped_sibling_with_homework; role; skill; relation kin with person:evt:world-vienna-1912:000062:child; skill_

- **1925.03** `r13-turn.exam-failure::ctx-vienna-reform-1930::milieu-tenement::reform-open-secondary/retake-fee` tags: education, exam, failure, school, work, reform, medical, schooling
  成绩单上差两分。Josef Lechner 2说可以补考，但要先交一克朗卷子费，还得让Josef Bauer来签字。Josef Bauer在办公室门口把帽子捏变了形，说家里拿不出这份钱。Josef把错题抄到烟盒背面，第二天照样去上课，只是不再举手。
  _effects: cash -1 (落榜名单上的第三个名字); mood -0.15; condition; flag +failed_entrance_exam; skill; relation guardian with person-josef-bauer; relation acquaintance with person-materialized-world-vienna-1912-11_

- **1925.09** `vienna-youth-threshold.night-class/enroll-night-class` tags: adolescence, school, work, family, transition, injury
  Josef Lechner 2在黑板上写下课程表和书本费：一学期三克朗，另加六十赫勒杂费。Josef下工后啃着冷土豆赶到教室，坐到公共长桌最靠煤气灯的一头。手指上还留着白天的油污，握笔时在本子上蹭出灰印，但座位号已经登记在册。
  _effects: cash -3.6 (夜校学费与书本杂费); education secondary; skill; health -0.030000000000000027 (白天上工夜里上课睡眠不足)_

- **1925.10** `yf18-firstlook.tram-glove::ctx-vienna-reform-1930::milieu-tenement/return-it-at-the-gate` tags: first_love, love, tram, glove, youth, courtship, reform, medical
  下一站，Josef追下车，把那只手套递还给Klara。Klara说了一声谢谢，手指在毛线手套里缩了一下；Josef回到车上才发现自己坐过了两站，只好沿着环城路走回家。
  _effects: state_add yf18-first-awakening state:world-vienna-1912:191; relation friend with person-phase15-Klara-world-vienna-1912; mood 0.03_

- **1926.01** `state_tick:yf18-first-awakening/half-year-of-glances/rehearsed-conversation` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Josef在厨房里对着镜子练了七遍开场白，第二天却在离Klara三步远的地方拐进面包店。Josef买了一袋并不需要的盐，回家路上把开场白又想了一遍；这一次，连标点都更熟练了。
  _effects: state_parameter yf18-first-awakening.intensity 45 -> 51; state_parameter yf18-first-awakening.talk 0 -> 3; mood 0.010000000000000009_

- **1926.01** `r14-edu.tutoring-sibling::ctx-vienna-reform-1930::milieu-tenement/own-marks-slipped` tags: education, tutored_sibling, family, tutoring, reform, medical, schooling, home
  Josef每晚给Berta Winter讲题，自己的作业只能留到深夜。期中考试，Josef的名次掉了十几位，Grete Stein在家长会上点名。回家后，Josef看见Berta Winter趴在桌上睡着了，算术本还摊在胳膊下面，就没有叫醒。
  _effects: mood -0.06; flag +neglected_own_studies; relation rival with person-josef-bauer_

- **1926.02** `yf18-firstlook.atlas-margin::ctx-vienna-reform-1930::milieu-tenement/read-it-to-the-class` tags: first_love, school, atlas, note, secrecy, reform, medical, schooling
  Josef以为那是谁开的玩笑，把地图册举起来念给全班听。Grete Stein问是谁写的；教室最后一排有人把书立起来挡住脸。放学后，Rosa在楼梯口等Josef，只说了一句“你念错了一个字”，就从他身边走过去。
  _effects: state_add yf18-first-awakening state:world-vienna-1912:190; reputation -0.02; relation acquaintance with person-phase15-Rosa-world-vienna-1912; mood -0.020000000000000004; flag +yf18_first_awakening_active_

- **1926.02** `r15-work.master-takes-on::ctx-vienna-reform-1930::milieu-tenement/unpaid-trial` tags: work, craft, apprentice, trade, poverty, reform, medical, schooling
  Anton Winter先说试三个月，不给工钱，只管一顿午饭。家里同意了，因为多一张嘴比多一双手更难。Josef每天最早到，最晚走，三个月后师傅才把契约拿出来。
  _effects: food; mood -0.03999999999999998; state_add apprenticeship-contract state:world-vienna-1912:254; relation acquaintance with person-materialized-world-vienna-1912-35; education apprenticeship; role_

- **1926.03** `vienna-adolescence.workshop-apprentice/apprenticeship-rejected` tags: adolescence, school, work, family, social
  Buchdruckerei Winter & Söhne捏了捏Josef的虎口，又让Josef张开手指，说骨节还没长开，推硬木会伤手。Josef Bauer想再问一句，Buchdruckerei Winter & Söhne已经转身去搬木料。Josef退到门槛外，听见刨子重新响起来，木花从门缝里卷到脚边。
  _effects: mood -0.08000000000000002; reputation -0.05; relation kin with person-josef-bauer_

- **1926.04** `state_reaction:wish-craft/craft-humiliation` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_reaction
  Josef把那句轻视记了很久。它没有变成一个决定，但也没有消失。
  _effects: mood -0.03999999999999998; flag +wish:craft:wounded_
  _causes: evt:world-vienna-1912:003320_

- **1927.01** `vienna-life-apprenticeship/factory-hand` tags: adolescence, work, apprenticeship, employment, injury
  Buchdruckerei Winter & Söhne把Josef分到装订间，每天站十个小时，工钱按件算。第一周结束，Josef的指关节肿了，工头说习惯就好。
  _effects: employment Buchbinderhilfe @ org-winter-print; health -0.040000000000000036 (standing all day); condition_

- **1927.01** `yf18-dare.bridge-rail::ctx-vienna-reform-1930::milieu-tenement/climb-back-down` tags: dare, bridge, river, friendship, risk, reform, medical, schooling
  Josef的手已经搭上栏杆，听见桥下有驳船拉笛，忽然把手收回来。Klara骂了一句，Rosa却把围巾解下来递给Josef；三个人在桥头站了一会儿，谁也没有再提这件事。
  _effects: state_parameter yf18-first-awakening.intensity 40 -> 43; state_parameter yf18-first-awakening.nerve 10 -> 5; relation friend with person-phase15-Rosa-world-vienna-1912; relation friend with person-phase15-Klara-world-vienna-1912; mood -0.010000000000000009_

- **1927.01** `state_tick:yf18-first-awakening/half-year-of-glances/rehearsed-conversation` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Josef在厨房里对着镜子练了七遍开场白，第二天却在离Rosa三步远的地方拐进面包店。Josef买了一袋并不需要的盐，回家路上把开场白又想了一遍；这一次，连标点都更熟练了。
  _effects: state_parameter yf18-first-awakening.intensity 43 -> 49; state_parameter yf18-first-awakening.talk 20 -> 23; mood 0.010000000000000009_

- **1927.01** `state_tick:yf18-first-awakening/half-year-of-glances/rehearsed-conversation` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Josef在厨房里对着镜子练了七遍开场白，第二天却在离Klara三步远的地方拐进面包店。Josef买了一袋并不需要的盐，回家路上把开场白又想了一遍；这一次，连标点都更熟练了。
  _effects: state_parameter yf18-first-awakening.intensity 51 -> 57; state_parameter yf18-first-awakening.talk 3 -> 6; mood 0.010000000000000009_

- **1927.01** `state_tick:apprenticeship-contract/workshop-year/learned` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Josef又学会了一道工序。师傅没有夸，只把下一块料推到面前。
  _effects: state_parameter apprenticeship-contract.progress 8 -> 28; skill; mood 0.020000000000000018_

- **1927.01** `r13-civ.learn-instrument::ctx-vienna-reform-1930::milieu-tenement/self-taught` tags: culture, music, instrument, learning, craft, reform, medical, schooling
  Josef没有钱请老师，就趴在窗边听隔壁的留声机，再把听到的调子按在琴弦上。手指磨出茧子，音还是不准，但他第一次拉完了一整支曲子。
  _effects: mood 0.02999999999999997; flag +learned_instrument_by_ear; skill; relation acquaintance with person-materialized-world-vienna-1912-38_

- **1927.03** `yf18-politics.latin-pamphlet::ctx-vienna-reform-1930::milieu-tenement/burn-it-in-the-courtyard` tags: politics, school, pamphlet, censorship, awakening, reform, medical, schooling
  Josef在学校的煤炉边把油印纸烧了，灰烬和煤渣混在一起。Josef Lechner 2第二天问第三十四页读得怎么样，Josef说译文看不出来；Josef Lechner 2点点头，把课本收回去，从此没有再借给Josef任何书。
  _effects: mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-11; flag +yf18_burned_pamphlet_

- **1927.10** `vienna-youth-threshold.night-class/give-up-for-overtime` tags: adolescence, school, work, family, transition, injury
  工头说这个月赶印一批账簿，晚上加班每小时多给二十赫勒。Josef站在教室门口听完课程表，转身回厂里搬纸。Friedrich Weiss追出来说座位可以保留两周，Josef点点头，手已经摸上了作坊的门把，夜里机器的声音把课本的事盖了过去。
  _effects: cash 1.6 (夜间加班多挣的工钱); skill; mood -0.03999999999999998; health -0.040000000000000036 (连续夜间加班)_

- **1928.01** `vienna-life-young-worker/hand-caught` tags: adolescence, labour, union, injury
  Josef在压纸时右手被滚轴卷进去，工头拉下电闸，血滴在铅字盘上。Buchdruckerei Winter & Söhne让人把Josef送到医院，医药费先由厂里垫付。
  _effects: health -0.17999999999999994 (hand caught in press); condition; cash -4 (hospital transport)_

- **1928.01** `yf18-friend.two-tickets::ctx-vienna-reform-1930::milieu-tenement/confront-at-the-cloakroom` tags: first_love, friendship, betrayal, dance, tickets, reform, medical, schooling
  Josef在衣帽间堵住Anton，问那两张票怎么到了Emil手里。Anton说Josef从来没敢开口，自己只是替Josef把话说了；Josef把票根揉成一团，塞进Anton的西装口袋，转身时撞翻了侍者的托盘。
  _effects: state_parameter yf18-first-awakening.intensity 57 -> 62; state_parameter yf18-first-awakening.talk 6 -> 16; state_parameter yf18-first-awakening.nerve 25 -> 20; relation friend with person-phase15-Emil-world-vienna-1912; reputation -0.020000000000000004; mood -0.04999999999999999_

- **1928.01** `state_expire:yf18-first-awakening` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Josef的「第一次心动」到期；相关安排结束。
  _effects: state_remove yf18-first-awakening state:world-vienna-1912:190; flag -yf18_first_awakening_active_

- **1928.01** `state_tick:yf18-first-awakening/half-year-of-glances/talked-about` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Josef只把Klara的名字写在一张草稿纸背面，第二天那张纸就在教室后排传了一圈。有人把名字念出来，有人问Josef是不是要请人喝咖啡；Josef说那是表姐的名字，声音大得连自己都吓了一跳。
  _effects: state_parameter yf18-first-awakening.talk 16 -> 28; state_parameter yf18-first-awakening.nerve 20 -> 14; reputation -0.030000000000000013; mood -0.030000000000000027_

- **1928.01** `state_expire:apprenticeship-contract` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick, state:apprenticeship-contract
  Josef的「学徒契约」到期；相关安排结束。
  _effects: state_remove apprenticeship-contract state:world-vienna-1912:254; role_

- **1928.01** `state_tick:wish-craft/craft-pressure/put-away` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_tick
  Josef暂时把那件事收进抽屉；日子还有别的东西要应付。
  _effects: mood -0.020000000000000018_

- **1928.01** `p9-childhood-apprenticeship.learn-the-task/demoted-to-clean` tags: adolescence, work, apprenticeship, labour, training, family, task, task:work
  Anna Hofer 2用食指在字行上划过去，停在一处宽缝上，又停在下一处窄缝上。Josef想去改，Anna Hofer 2已经把字盘抽走，让先去洗墨辊。Josef蹲在后院搓了半下午，指关节被清洗剂咬得发白；收工前Anna Hofer 2才让Josef站在旁边看，记住字距该留几线。
  _effects: health -0.030000000000000027 (清洗剂气味熏得他头晕); mood -0.050000000000000044; skill; relation acquaintance with person-materialized-world-vienna-1912-57_

- **1928.03** `yf18-performance.choir-solo::ctx-vienna-reform-1930::milieu-tenement/finish-in-falsetto` tags: performance, choir, humiliation, school, voice, reform, medical, schooling
  教堂音乐会的独唱轮到Josef，第一句拉丁文还稳，唱到“荣耀”那个高音时，嗓子忽然劈了一下。Josef看见Josef Bauer在第三排低下头，Berta Kral 2在风琴旁边打手势让继续；Josef用假声把剩下的两小节唱完，声音细得像一根线。
  _effects: reputation -0.01999999999999999; relation acquaintance with person-materialized-world-vienna-1912-68; flag +yf18_finished_solo; mood 0.010000000000000009; relation acquaintance with person-materialized-world-vienna-1912-68_

- **1928.05** `yf18-runaway.bundle::ctx-vienna-reform-1930::milieu-tenement/unpack-and-boil-water` tags: runaway, escape, family, plan, night_train, reform, medical, schooling
  Josef把包袱重新打开，衬衫上的褶子已经压平了。Josef把洗礼证明放回抽屉，去厨房烧了一壶水；Josef Bauer醒来时，桌上多了一杯茶，Josef说今天不想去上学。
  _effects: mood -0.030000000000000027; relation kin with person-josef-bauer; flag +yf18_unpacked_

- **1928.11** `yf18-firstlook.parish-dance::ctx-vienna-reform-1930::milieu-tenement/friend-cuts-in` tags: first_love, dance, church, courtship, jealousy, reform, medical, schooling
  Anton在第二支曲子前把Emil请走，说Josef答应过要替她看管外套。Josef抱着一件不属于自己的大衣站在圣像下面，看他们在蜡烛光里转圈；回家路上，Josef把舞卡撕成小片，扔进多瑙运河。
  _effects: state_parameter yf18-first-awakening.intensity 67 -> 72; state_parameter yf18-first-awakening.nerve 9 -> 1; state_parameter yf18-first-awakening.talk 38 -> 43; relation friend with person-phase15-Emil-world-vienna-1912; mood -0.040000000000000036_

- **1929.01** `yf18-friend.two-tickets::ctx-vienna-reform-1930::milieu-tenement/confront-at-the-cloakroom` tags: first_love, friendship, betrayal, dance, tickets, reform, medical, schooling
  Josef在衣帽间堵住Anton，问那两张票怎么到了Berta Winter手里。Anton说Josef从来没敢开口，自己只是替Josef把话说了；Josef把票根揉成一团，塞进Anton的西装口袋，转身时撞翻了侍者的托盘。
  _effects: state_parameter yf18-first-awakening.intensity 62 -> 67; state_parameter yf18-first-awakening.talk 28 -> 38; state_parameter yf18-first-awakening.nerve 14 -> 9; reputation -0.01999999999999999; mood -0.050000000000000044_

- **1929.01** `state_reaction:wish-craft/craft-humiliation` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_reaction
  Josef把那句轻视记了很久。它没有变成一个决定，但也没有消失。
  _effects: mood -0.040000000000000036_
  _causes: evt:world-vienna-1912:004231_

- **1929.01** `state_tick:yf18-first-awakening/half-year-of-glances/talked-about` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Josef只把Klara的名字写在一张草稿纸背面，第二天那张纸就在教室后排传了一圈。有人把名字念出来，有人问Josef是不是要请人喝咖啡；Josef说那是表姐的名字，声音大得连自己都吓了一跳。
  _effects: state_parameter yf18-first-awakening.talk 43 -> 55; state_parameter yf18-first-awakening.nerve 1 -> 0; reputation -0.03; mood -0.030000000000000027_

- **1929.01** `r13-work.part-time::ctx-vienna-reform-1930::milieu-tenement/late-for-class` tags: work, part_time, school, adolescence, cash, reform, medical, schooling
  Josef接了一单远活，回来时天已经黑透。第二天的算术课，Josef在课堂上睡着了，Berta Kral 2用粉笔头敲了敲课桌。放学后Berta Kral 2把Josef留下，说再缺两次课就要叫家长；Josef摸着口袋里那几枚铜板，没有说是去送货了。
  _effects: cash 1 (放学后的四个钟头); reputation -0.05000000000000002; flag +work13_part_time_made_late_for_school; relation rival with person-materialized-world-vienna-1912-68_

- **1929.05** `p9-social-courtship-friendship.opened-letter/opened-letter-cold-reply` tags: courtship, friendship, social, adulthood, reputation, leopoldstadt
  Josef信了听来的话，把回信写得又短又冷，只问对方家里到底嫌哪一样，写完封了口，第二天一早塞进街角的邮筒。此后走廊里碰见Friedrich Weiss，两边都只点头，话绕开信的事走；Josef与Grete Lechner之间那点热乎气，也被这四行字压凉了。
  _effects: mood -0.06000000000000005; relation acquaintance with person-materialized-world-vienna-1912-62; relation acquaintance with person-materialized-world-vienna-1912-62_

- **1929.11** `statistical_infection`
  Josef在Leopoldstädter Zinshaus, gemeinsamer Gang病倒了，肺结核让身体发热、虚弱，接下来的日子只能卧床。

- **1929.12** `statistical_illness_worsened`
  Josef的肺结核没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1930.01** `vienna-family-courtship/ask-to-share-a-home` tags: family, courtship, household, social, lifecycle
  Josef在Leopoldstädter Zinshaus, gemeinsamer Gang靠窗的桌边，把一只空咖啡杯转了半圈，说房租两人合付、桌子两人共用。Lena的手停在糖罐盖上，问了一句“要是过不下去呢”，没有当场答应，只说要想一想；杯里的咖啡凉了，话还悬在桌面上。
  _effects: interaction_

- **1930.01** `state_expire:yf18-first-awakening` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Josef的「第一次心动」到期；相关安排结束。
  _effects: state_remove yf18-first-awakening state:world-vienna-1912:191_

- **1930.01** `r13-civ.recover-at-home::ctx-vienna-reform-1930::milieu-tenement/kin-nursed` tags: health, recovery, care, household, food, reform, medical, schooling
  Alois Kral 2把粥熬得很稀，一勺一勺吹凉，托着Josef的后颈喂下去。窗帘拉开半尺，太阳从床脚移到墙上，Josef第一次觉得退烧后的骨头是轻的。Alois Kral 2把药钱记在日历背面，说下个月少买两次肉。
  _effects: cash -2 (退烧后的第一碗粥); food; health 0.07999999999999996 (退烧后的第一碗粥); flag +recovered_with_kin_care; relation partner with person-materialized-world-vienna-1912-60_

- **1930.02** `p9-work-transport.strike-rumor/strike-rumor-sign` tags: work, factory, railway, transport, shift, labour, strike, rumor
  下班后Josef沿着玛利亚希尔夫大街走到工会活动室，屋里烟雾腾腾，木椅上坐满了人。Alois Lechner念了几条要求，每小时加两赫勒，每班有固定的休息。Josef在名单上签了字，捐了二十赫勒进罢工箱，但没答应站到队伍最前面去。
  _effects: cash -0.2 (捐给罢工箱的钱); skill; relation acquaintance with person-alois-lechner_

- **1930.02** `vienna-family-same-sex-male/denounced-to-police` tags: family, intimacy, same_sex, persecution, lifecycle, partnership, injury, unemployment
  旅店伙计记下了Josef和Alois Kral 2的名字。几天后警察来敲门，把两人带去问话；Josef丢了工位，罚了八克朗，Alois Kral 2的家里把人接走。Josef在档案里留下一条警察记录，手指上还留着问话时磕出的淤青。
  _effects: relation partner with person-materialized-world-vienna-1912-60; health -0.07999999999999996 (police questioning); reputation -0.2; unemployment (dismissed after police visit); cash -8 (fine and lost work); role; relation acquaintance with person-materialized-world-vienna-1912-60_

- **1930.02** `vienna-market-household.soup-kitchen/soup-kitchen.share` tags: home, market, food, social
  汤锅冒着热气，Josef盛出两勺倒进Anton Kral带来的罐子里。Anton Kral说了声谢谢就匆匆上楼。隔天罐子还回来，锅底搁着一小块猪油。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-37; mood 0.050000000000000044; relation acquaintance with person-materialized-world-vienna-1912-37_

- **1930.03** `statistical_illness_worsened`
  Josef的肺结核没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1930.03** `vienna-tenement-neighbors.sick_child_doorstep/borrows_coal_risk` tags: home, social, family, housing, injury
  Josef把自家煤箱里仅剩的四块煤分了两块给Helene Winter，自己家那一夜没生火，裹着大衣睡的。孩子烧退了，Helene Winter第二天还煤时多塞了一把粗盐。Josef当天下午就开始流清鼻涕，第三天咳得直不起腰。
  _effects: health -0.07999999999999996 (受凉咳嗽); food; relation friend with person-helene-winter_

- **1930.05** `statistical_recovery`
  Josef熬过了这场肺结核，能坐起来喝一点汤，但身体还很虚。

- **1930.11** `vienna-legacy-worklife.hours-ledger/hours-ledger.refuse` tags: legacy, work, family, reform, ordinary_life
  工头把表折成四折塞进围裙口袋，说“你会后悔的”。Josef当天下午去账房窗口排队，窗上的铁栅栏有股锈味。账房先生翻了半天蓝皮本子，最后从抽屉里数出八克朗硬币，一枚一枚推过台面。
  _effects: cash 8 (追回的拖欠计件工资); reputation -0.02999999999999997; relation colleague with person-materialized-world-vienna-1912-69; relation acquaintance with person-materialized-world-vienna-1912-69_

- **1931.01** `interaction_response` tags: interaction
  Lena没有答应，只说现在不合适。Josef把这件事收回去，之后见面仍点头。
  _effects: relation acquaintance with person-phase15-Lena-world-vienna-1912; interaction_
  _causes: evt:world-vienna-1912:004720_

- **1931.01** `major-work-first-employment/hired-regular` tags: work, employment, unemployment, major
  清晨六点，印刷厂门口已经站了十几个人。Buchdruckerei Winter & Söhne的工头让Josef把手摊开，看了看指节，又问能不能读一页纸。Josef读完，工头在名册上写了名字：明天六点，带工票和一双干净的手。第一周洗墨辊，月底工资三十克朗，柜上先预支四克朗。
  _effects: employment Druckerhelfer @ org-winter-print; role; cash 4 (first wage advance); relation colleague with person-materialized-world-vienna-1912-57; flag +first_regular_job_

- **1931.01** `kernel-social.reconciliation::ctx-vienna-reform-1930::milieu-tenement/reconciliation.shared-pot` tags: task, task:social, social, reconciliation, family, apology, conflict, reform
  Josef端着一锅炖肉去敲Berta Winter的门，说肉炖多了，一个人吃不完。Berta Winter让他进屋，把两只盘子摆在桌上；两人先谈煤价，再谈母亲的坟，最后才提那笔说不清的钱。Franz Moser在楼下等消息，等到灯灭才走。
  _effects: relation kin with person:evt:world-vienna-1912:000062:child; cash -2 (meat and coal for the reconciliation supper); role; flag +family_reconciled; knowledge “两人把煤价、母亲的坟和那笔钱都谈到了。”_

- **1931.11** `vienna-courtship-courtyard.breakup/courtyard-quarrel` tags: adulthood, courtship, partner, social, family, separation
  话没说完就变成了争。Alois Kral 2把外套扔在晾衣杆下，Josef说了一句不中听的，声音大得整院都听见。Mitzi在三楼把窗开了一条缝，看完了全程，第二天院子里人人都知道；这一架把两个人的关系吵断了，也把Josef的名字在院子里吵薄了一层。
  _effects: relation_end partner with person-materialized-world-vienna-1912-60; reputation -0.07000000000000006; relation acquaintance with person-phase15-Mitzi-world-vienna-1912; mood -0.09999999999999998_

- **1932.01** `r14-edu.sibling-exam::ctx-vienna-reform-1930::milieu-tenement/sibling-failed` tags: education, tutored_sibling, family, exam, reform, medical, schooling, home
  Berta Winter差三分。回家路上，Berta Winter一句话也没说，进了门就把自己关在屋里。Josef把饭菜放在门口，敲了两下，没有回应。半夜，Josef听见屋里有人在翻书，翻到天亮。第二天清早，Berta Winter出来洗脸，眼睛肿着，问Josef能不能再教一年。补考费一克朗。
  _effects: cash -1 (弟弟妹妹的准考证); flag +sibling_failed_exam; relation kin with person:evt:world-vienna-1912:000062:child_
  _causes: evt:world-vienna-1912:003071_

- **1932.01** `vienna-life-work-injury/crushed-hand` tags: adulthood, labour, injury
  Josef在换纸时左手被压板夹住。工友关掉机器，工头拿来急救箱，把伤手包起来送去医院；厂里先垫了十克朗医药费，事故报告写的是“操作不慎”。Josef的左手从此握不紧拳，指尖总是凉的，天阴时骨缝里发疼。
  _effects: health -0.24 (crushed left hand); condition; cash 10 (employer medical advance)_

- **1932.01** `vienna-family-divorce/reconcile-for-now` tags: family, marriage, divorce, housing, lifecycle, partnership
  Josef和Alois Kral 2在楼道里吵到半夜，最后因为下个月的房租又坐回同一张桌。谁都没有提和好，只把账本重新摊开；Alois Kral 2把煤钱推过来，Josef接过去数了两遍，手指碰到一起又分开，屋里的灯亮到很晚。
  _effects: relation partner with person-materialized-world-vienna-1912-60; mood -0.030000000000000027_

- **1932.01** `state_tick:wish-craft/craft-pressure/press-on` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_tick
  Josef又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.020000000000000018_

- **1932.01** `task-vienna-family-care.courtship-invitation/polite-refusal-church` tags: family, care, courtship, siblings, inheritance, housing, task, task:family
  Anton把手里的 Semmel 换到另一只手，说家里不许她单独跟人出门，连星期天下午也不行。她声音不大，但话说得很清楚，随后补一句：教堂下个月有集体郊游，母亲也去，Josef若愿意可以一道走。Josef谢过她，转身时纸袋被捏出一道折痕。
  _effects: mood -0.030000000000000027; relation acquaintance with person-phase15-Anton-world-vienna-1912; relation acquaintance with person-materialized-world-vienna-1912-48_

- **1932.02** `vienna-life-depression/leaves-vienna` tags: adulthood, depression, work, migration, unemployment
  Josef听说下奥地利的砖厂还招人，收拾了一只箱子，坐早班火车离开维也纳。厂里的工头在背后说，走了就别回来。
  _effects: move place-klosterneuburg-aunt-house; unemployment (left the Vienna factory); cash -8 (train ticket and lodgings)_

- **1932.04** `vienna-tenement-neighbors.sick_child_doorstep/refuses_grudge` tags: home, social, family, housing
  Helene Huber敲门想借半块煤给发烧的孩子烧热水，Josef那天刚和Helene Huber为走廊堆东西吵过嘴，没开门，隔着门板说自家也不够用。后半夜听见Helene Huber抱着孩子下楼去敲药房的门。第二天在走廊碰见，Helene Huber低头绕过去，手里的铜壶碰在栏杆上，响了一声。
  _effects: relation rival with person-materialized-world-vienna-1912-75; mood -0.050000000000000044_

- **1932.08** `vienna-medical-treatment.toothache/dentist-pull` tags: health, medical, family, money
  诊室在二楼，楼梯间飘着石炭酸味。医生把钳子举到灯下看了看，叫Josef攥紧扶手。Gustav Huber站在门边数墙上的价目表：拔牙两克朗五十赫勒，药棉五十赫勒，连消炎水另算。
  _effects: cash -3 (牙医拔牙费用); health 0.05999999999999994 (拔除病牙解除疼痛); mood -0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-74_

- **1932.12** `hs18-queue.refugee::ctx-vienna-reform-1930::milieu-tenement/sign-as-guarantor` tags: refugee, queue, station, papers, official, history, reform, medical
  登记桌后面，Grete Bauer把表格推过来，说这一家人缺一个本地担保人。Helene Huber抱着一只藤箱，箱角用绳子捆了三道。Josef写下自己的名字和门牌号，笔尖顿了一下；Grete Bauer盖章时没有抬头，只说“出了事找你”。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-75; flag +guaranteed_refugee_family; knowledge “担保人要替被担保的人负责。”; reputation -0.010000000000000009; relation acquaintance with person-materialized-world-vienna-1912-32_

- **1933.01** `vienna-life-injury-recovery/wound-infection` tags: health, work, family, injury
  Josef的伤口在几天后肿起来，手腕发热。医生说要切开引流，费用比上次更高；Josef看着账单，先问能不能分两次付。
  _effects: health -0.12 (wound infection); cash -14 (drainage and medicine); condition_
  _causes: evt:world-vienna-1912:005823_

- **1933.01** `vienna-family-courtship/ask-to-share-a-home` tags: family, courtship, household, social, lifecycle
  Josef在Leopoldstädter Zinshaus, gemeinsamer Gang靠窗的桌边，把一只空咖啡杯转了半圈，说房租两人合付、桌子两人共用。Helene Huber的手停在糖罐盖上，问了一句“要是过不下去呢”，没有当场答应，只说要想一想；杯里的咖啡凉了，话还悬在桌面上。
  _effects: interaction; relation acquaintance with person-materialized-world-vienna-1912-75_

- **1933.01** `r13-fam.arrange-childcare::ctx-vienna-reform-1930::milieu-tenement/childcare-arranged` tags: task, care, childcare, work, neighbor, wages, reform, medical
  Josef天没亮就把Luise Bauer裹好，抱到楼下Josef Bauer家。Josef Bauer接过孩子，先摸了摸尿布，又指给Josef看灶上温着的米汤。Josef把一星期的工钱数出一份放在柜上，Josef Bauer数也没数就收进围裙；出门时，Josef听见孩子在屋里哭了一声，又停了。
  _effects: cash -2 (上工前把小的送下楼); condition; flag +arranged_daily_childcare; relation acquaintance with person-josef-bauer; knowledge “the minder keeps a pot of rice water on the stove”_

- **1933.05** `state_reaction:wish-craft/craft-humiliation` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_reaction
  Josef把那句轻视记了很久。它没有变成一个决定，但也没有消失。
  _effects: mood -0.0399999999999997_
  _causes: evt:world-vienna-1912:006759_

- **1933.06** `ld18-wedding.objection::ctx-vienna-authoritarian-1934::milieu-tenement/the-bride-says-no` tags: love, wedding, marriage, queer, scandal, choice, secret_intimacy, vienna
  婚期定在星期日上午，教堂里坐满了人。Grete Bauer问到Josef是否愿意时，Josef看见Gustav Bauer站在最后一排，手里攥着一只手套。Josef说“不愿意”，声音不大，但前排的人全听见了；Lena把戒指放回托盘，转身先走了出去。
  _effects: state_add ld18-impossible-attachment state:world-vienna-1912:621; state_add public-scandal state:world-vienna-1912:622; reputation -0.09999999999999998; cash -2 (the cancelled feast and the deposit); flag +refused_at_the_altar; relation acquaintance with person-materialized-world-vienna-1912-67; flag +impossible_attachment_active_

- **1933.06** `state_reaction:ld18-impossible-attachment/a-family-wedding` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  亲戚的婚礼上，Josef被安排和伴侣分开坐。司仪问有没有人反对，Josef低头喝汤；伴侣在另一桌替别人倒酒，手很稳，酒没有洒出来。散席时，两个人在衣帽间碰见，只说了一句“外面下雨”。
  _effects: state_parameter ld18-impossible-attachment.pressure 55 -> 65; state_parameter ld18-impossible-attachment.grief 5 -> 9_
  _causes: evt:world-vienna-1912:006965_

- **1933.06** `vienna-tenement-neighbors.shared_stove_fire/fire_scald_hand` tags: home, social, family, housing, injury
  Josef在合租房走廊的公用灶台上煮土豆，转身取盐时袖子扫翻了铁锅，滚水浇在左手背上。Ferdinand Lechner 3从隔壁冲出来，扯下自己的围裙裹住烫伤处，又跑下楼叫来住在二楼的接生婆。接生婆用蛋清和旧亚麻布包扎，嘱咐三天不能沾水。
  _effects: health -0.050000000000000044 (左手背烫伤); relation friend with person-materialized-world-vienna-1912-82; relation acquaintance with person-materialized-world-vienna-1912-82_

- **1933.06** `state_reaction:public-scandal/gossip` tags: public-scandal, scandal, reputation, social, state, state_reaction, home, family
  Josef走进咖啡馆时，邻桌的声音低了一拍。没有人当面说什么，但每个人都知道该说什么。
  _effects: reputation -0.030000000000000027_
  _causes: evt:world-vienna-1912:006971_

- **1933.10** `hs18-cinema.newsreel::ctx-vienna-authoritarian-1934::milieu-tenement/leave-early` tags: cinema, newsreel, neighbor, recognition, media, history, vienna, urban
  Josef在第二本胶片放到一半时起身，摸黑从侧门出去。Elisabeth Hofer在门口抽烟，问是不是片子太旧。Josef说不是，是座位太硬；街上的雨刚停，海报被泡得只剩半张脸。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-85; flag +left_newsreel_early; relation acquaintance with person-materialized-world-vienna-1912-86; relation acquaintance with person-materialized-world-vienna-1912-85_

- **1934.01** `interaction_response` tags: interaction
  Helene Huber没有答应，只说现在不合适。Josef把这件事收回去，之后见面仍点头。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-75; interaction_
  _causes: evt:world-vienna-1912:006391_

- **1934.01** `vienna-family-courtship/ask-to-share-a-home` tags: family, courtship, household, social, lifecycle
  Josef在Leopoldstädter Zinshaus, gemeinsamer Gang靠窗的桌边，把一只空咖啡杯转了半圈，说房租两人合付、桌子两人共用。Mitzi Bauer 2的手停在糖罐盖上，问了一句“要是过不下去呢”，没有当场答应，只说要想一想；杯里的咖啡凉了，话还悬在桌面上。
  _effects: interaction_

- **1934.01** `state_tick:ld18-impossible-attachment/invented-anniversary/the-date-that-is-not-on-paper` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  Josef和伴侣把认识的那一天当作纪念日。没有登记，没有证人，只有一块从旧货摊买来的蛋糕和两杯兑了水的酒；Josef在日历上画了一个别人看不懂的记号，第二年又画在同一个格子里。
  _effects: state_parameter ld18-impossible-attachment.devotion 65 -> 69; state_parameter ld18-impossible-attachment.pressure 65 -> 62; mood 0.020000000000000018_

- **1934.01** `r13-civ.enter-hospital::ctx-vienna-authoritarian-1934::milieu-tenement/admitted-third-class` tags: health, hospital, admission, deposit, institution, vienna, urban, crisis
  Anton Winter 2把押金收据和住院单钉在一起，让Josef去三楼东侧等床。走廊里全是折叠床，Hermann Bauer给Josef一条洗得发硬的毯子，说今晚先别喝水。Josef把鞋塞在枕头下面，听着隔壁的呻吟睡了过去。
  _effects: cash -8 (住院处窗口的押金); health 0.06000000000000005 (住院处窗口的押金); condition; flag +hospitalized_third_class; relation acquaintance with person-materialized-world-vienna-1912-56; relation acquaintance with person-materialized-world-vienna-1912-51; relation acquaintance with person-materialized-world-vienna-1912-56_

- **1934.01** `oj18-mortuary.first-body::ctx-vienna-authoritarian-1934::milieu-tenement/municipal-mortuary` tags: death, mortuary, funeral, work, odd_job, night, everyday, vienna
  市立太平间缺一个夜班杂役，Friedrich Hofer只问Josef怕不怕冷。地下室的抽屉一排十二个，有的拉开了就不再推回去；Josef的工作是登记遗物、给无名尸挂上编号，再在天亮前把地拖干净。
  _effects: organization_found 市立太平间 (state); position 太平间杂役 @morgue:person-phase15-Josef-world-vienna-1912-evt:world-vienna-1912:007551; state_add oj18-odd-apprenticeship state:world-vienna-1912:671; cash 2 (municipal night wages); condition; flag +mortuary_worker; knowledge “太平间地下室的抽屉一排十二个，无名尸也要有编号。”; relation acquaintance with person-materialized-world-vienna-1912-73; role; flag +odd_job_apprentice_

- **1934.04** `vienna-courtship-courtyard.breakup/courtyard-quarrel` tags: adulthood, courtship, partner, social, family, separation
  话没说完就变成了争。Grete Lechner把外套扔在晾衣杆下，Josef说了一句不中听的，声音大得整院都听见。Grete Stein在三楼把窗开了一条缝，看完了全程，第二天院子里人人都知道；这一架把两个人的关系吵断了，也把Josef的名字在院子里吵薄了一层。
  _effects: relation_end partner with person-materialized-world-vienna-1912-62; reputation -0.07000000000000006; relation acquaintance with person-grete-stein; mood -0.050000000000000044_

- **1934.08** `r3-mig.smuggler-guide::ctx-vienna-authoritarian-1934::milieu-tenement/crossed-under-the-bridge` tags: migration, border, smuggling, river, risk, vienna, urban, crisis
  Anna Bauer把船从芦苇里撑出来，说好八克朗，先付一半。船底铺着湿麻袋，Josef趴在上面，听见桨碰到岸边的石头。走到河心，Berta Hofer的手电在岸上扫了一圈，Anna Bauer把船停进桥影里，等光过去才继续划。
  _effects: cash -8 (船夫的价码); health -0.040000000000000036 (船夫的价码); condition; flag +crossed_river_by_night; relation acquaintance with person-anna-bauer; knowledge “the bridge shadow is out of the patrol’s sightline”; relation acquaintance with person-materialized-world-vienna-1912-88_

- **1935.01** `interaction_response` tags: interaction
  Mitzi Bauer 2没有答应，只说现在不合适。Josef把这件事收回去，之后见面仍点头。
  _effects: interaction_
  _causes: evt:world-vienna-1912:006964_

- **1935.01** `vienna-tenement-neighbors.laundry_line_dispute/neighbor_yanks_clothes` tags: home, social, family, housing
  Josef Lechner 2嫌Josef的床单滴水滴到Josef Lechner 2家衬衫上，一把扯下床单扔在院子的石板上。Josef下楼捡起来时，床单角沾了泥，重洗又要费肥皂。两人在院子当中对喊，楼上有人推开窗看热闹。Josef把床单重新搭上绳子时，故意把水拧在Josef Lechner 2那侧。
  _effects: relation rival with person-materialized-world-vienna-1912-11; cash -0.15 (重洗床单的肥皂钱)_
  _causes: evt:world-vienna-1912:006971_

- **1935.01** `af17-humiliation.puppet-show::ctx-vienna-authoritarian-1934::milieu-tenement/laughed-first` tags: humiliation, public, scandal, theatre, charity, reputation, absurd, vienna
  慈善市集的木偶戏把Josef的丑闻编成三幕，木偶穿着和Josef一样的灰外套，连走路的姿势都学得出来。第一幕还没演完，Josef先笑出了声，笑得比谁都响；人群愣了一下，也跟着笑。市长夫人当场请Josef为下一场义卖剪彩，Ferdinand Lechner 2在幕布后面朝Josef举了举木偶。
  _effects: reputation 0.05999999999999994; cash 2 (下一场义卖的剪彩酬劳); state_remove public-scandal state:world-vienna-1912:622; relation acquaintance with person-materialized-world-vienna-1912-24; flag +laughed_at_own_caricature; mood 0.030000000000000027_

- **1935.01** `state_tick:ld18-impossible-attachment/invented-anniversary/the-date-that-is-not-on-paper` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  Josef和伴侣把认识的那一天当作纪念日。没有登记，没有证人，只有一块从旧货摊买来的蛋糕和两杯兑了水的酒；Josef在日历上画了一个别人看不懂的记号，第二年又画在同一个格子里。
  _effects: state_parameter ld18-impossible-attachment.devotion 69 -> 73; state_parameter ld18-impossible-attachment.pressure 62 -> 59; mood 0.020000000000000018_

- **1935.01** `state_tick:oj18-odd-apprenticeship/strange-year/blamed-for-the-noise` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  楼上住户投诉夜里有人拖椅子，管事的把巡查簿翻到Josef的那一页，说签字太潦草，看不出巡过几趟。Josef想辩解，却想起那晚确实在楼梯间多站了一刻钟；扣掉的工钱刚好够买一双不漏水的鞋。
  _effects: state_parameter oj18-odd-apprenticeship.trust 20 -> 4; state_parameter oj18-odd-apprenticeship.reliability 50 -> 40; mood -0.020000000000000018; flag +odd_job_scare_

- **1935.01** `p9-social-daily-culture.lending-library/p9-social-daily-culture.lending-library.read-in-aisle` tags: daily, culture, leisure, cafe, music, walk, task, task:knowledge
  Josef站在书架前抽出一本厚小说，就着门口的光读了半章，Franz Lechner在柜台后抬起眼皮看了一眼，没说话。读到要紧处，Josef摸出铅笔头把页码记在车票背面，把书插回原处，说下次带够押金再来；白读半章，管理员的眼神却凉了一点。
  _effects: skill; mood 0.020000000000000018_

- **1935.01** `vienna-tenement-neighbors.sick_child_doorstep/helps_fetch_doctor` tags: home, social, family, housing, injury
  隔壁Berta Winter的小儿子烧到说胡话，额头烫得能烘手。Berta Winter在楼道里抹眼泪，说请不起医生。Josef下楼叫了街角药房的伙计，花四十赫勒买了一包退烧药粉，又帮着用湿布敷了一整夜。天亮时孩子退了烧，Berta Winter端来一碗热汤面，面底下卧着一个鸡蛋。
  _effects: cash -0.4 (买退烧药粉); health -0.020000000000000018 (熬夜照料病人)_

- **1935.11** `r1-hc.vaccination::ctx-vienna-authoritarian-1934::milieu-tenement/refuses-vaccination` tags: health, vaccination, smallpox, prevention, institution, vienna, urban, crisis
  Josef听说种痘会让人发烧，抱着孩子绕开巷口。两个月后，隔壁院子出了天花，防疫队把整栋楼封了；Josef隔着窗户看他们给每个人检查胳膊，Otto Lechner的胳膊上已经有两个白疤。
  _effects: cash -3 (胳膊上的三个疤); health -0.07999999999999996 (胳膊上的三个疤); condition; flag +refused_vaccination; role; relation acquaintance with person-materialized-world-vienna-1912-39; knowledge “the smallpox squad checks arms at the door”; relation acquaintance with person-materialized-world-vienna-1912-18; relation acquaintance with person-materialized-world-vienna-1912-39_

- **1936.01** `vienna-family-courtship/ask-to-share-a-home` tags: family, courtship, household, social, lifecycle
  Josef在Leopoldstädter Zinshaus, gemeinsamer Gang靠窗的桌边，把一只空咖啡杯转了半圈，说房租两人合付、桌子两人共用。Mitzi Bauer 2的手停在糖罐盖上，问了一句“要是过不下去呢”，没有当场答应，只说要想一想；杯里的咖啡凉了，话还悬在桌面上。
  _effects: interaction_

- **1936.01** `office16-budget.sign-or-block::ctx-vienna-authoritarian-1934::milieu-tenement/signed-with-margin` tags: office, budget, permit, administration, power, economy, vienna, urban
  Josef在预算表上签了字，把冬季煤房的款项从三笔并成一笔，又给夜班守卫加了半份津贴。Hermann Moser 2算出省下的钱刚好够修屋顶；没有人鼓掌，但一月的会议室不再需要穿大衣。
  _effects: organization_funds; reputation 0.040000000000000036; skill; mood 0.020000000000000018; flag +signed_balanced_budget; knowledge “把冬季煤房的款项并成一笔后，省下的钱够修会议室屋顶。”; relation acquaintance with person-materialized-world-vienna-1912-42_

- **1936.01** `state_tick:ld18-impossible-attachment/invented-anniversary/a-form-with-an-empty-line` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  户籍窗口换了一张新表格，配偶一栏不能空着。Josef最后写了“同住人”，办事员抬头看了一眼，说这不作数。回家后，Josef把表格折成很小的一块，塞进针线盒；伴侣问今天顺不顺利，Josef说和平时一样。
  _effects: state_parameter ld18-impossible-attachment.pressure 59 -> 65; state_parameter ld18-impossible-attachment.discretion 25 -> 22; mood -0.020000000000000018_

- **1936.01** `state_tick:wish-craft/craft-pressure/press-on` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_tick
  Josef又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.020000000000000018_

- **1936.01** `agency:attend_meeting` tags: agency, agency:attend_meeting
  Josef走到Versammlungsraum der graphischen Arbeiter门口，看见便衣和拥挤的人群，最终没有进去。
  _effects: mood -0.040000000000000036_

- **1936.01** `vienna-housing-move.sublet-room/sublet-declined` tags: housing, home, rent, family, money
  Josef正要把空床许给Josef Winter，Anna Bauer却在楼梯上拦住了，说这条街上去年有人招了生人合住，失过钥匙，惹出些麻烦。Josef回家把铺盖重新叠好，回绝了Josef Winter，只让他白天来喝口热水。空床仍空着，房租还是从自己的工钱里补。
  _effects: relation acquaintance with person-anna-bauer; relation acquaintance with person-materialized-world-vienna-1912-93; relation acquaintance with person-materialized-world-vienna-1912-93_

- **1936.02** `ml18-business.bottle-cap-patent::ctx-vienna-authoritarian-1934::milieu-tenement/the-patent-is-contested` tags: business, patent, money, windfall, invention, comic, vienna, urban
  许可合同签下两周，另一家瓶盖厂拿出一张更早的图纸，说Josef的专利只是把软木垫换了个方向。Friedrich Berg把两份图纸并排看了很久，最后让双方先停售。Josef付了十二克朗的律师费，Allgemeines Krankenhaus Wien把订单转给了出价更低的那家。
  _effects: cash -12 (legal fees for the patent dispute); state_add ml18-reversal state:world-vienna-1912:761; flag +patent_disputed; knowledge “另一家厂拿出的图纸日期比我的专利申请早两个月。”; mood -0.010000000000000009; relation acquaintance with person-materialized-world-vienna-1912-29; flag +fortune_reversed; mood -0.010000000000000009_

- **1936.03** `state_reaction:ml18-reversal/a-second-chance-arrives` tags: ml18-reversal, money, luck, reversal, risk, debt, reputation, loss
  一封没有署名的信里夹着一张彩票，号码是Josef上个月随口说过的。信纸是廉价的学生用纸，字迹却写得很慢。Josef把彩票翻过来，背面只写着一句：这次别再押上房租。
  _effects: state_parameter ml18-reversal.swing -20 -> -10; state_parameter ml18-reversal.strain 35 -> 30; mood 0.020000000000000018; flag +reversal_second_chance_
  _causes: evt:world-vienna-1912:008625_

- **1937.01** `interaction_response` tags: interaction, partnership, household
  Mitzi Bauer 2在几天后找到Josef，说可以试试。两人开始合付房租，也把各自欠的账摊在桌上。
  _effects: relation partner with person-materialized-world-vienna-1912-36; household; role; interaction_
  _causes: evt:world-vienna-1912:008069_

- **1937.01** `vienna-family-fatherhood/child-born-at-home` tags: family, childbirth, death, lifecycle, birth, state, state:raising-child, raising-child
  Mitzi Bauer 2在Leopoldstädter Zinshaus, gemeinsamer Gang生下一个孩子，取名Helene Bauer。Josef在厨房和走廊之间来回，接生的人让烧水、拿布、付六克朗；孩子天亮后睡着了，Josef从此在户籍表上多了“父亲”一栏，手背上还留着烫水壶的红印。
  _effects: birth female; cash -6 (midwife fee); role; state_add raising-child state:world-vienna-1912:760_

- **1937.01** `office16-budget.sign-or-block::ctx-vienna-authoritarian-1934::milieu-tenement/signed-with-margin` tags: office, budget, permit, administration, power, economy, vienna, urban
  Josef在预算表上签了字，把冬季煤房的款项从三笔并成一笔，又给夜班守卫加了半份津贴。Anton Winter 2算出省下的钱刚好够修屋顶；没有人鼓掌，但一月的会议室不再需要穿大衣。
  _effects: reputation 0.040000000000000036; skill; mood 0.020000000000000018; knowledge “把冬季煤房的款项并成一笔后，省下的钱够修会议室屋顶。”_

- **1937.01** `state_tick:ld18-impossible-attachment/invented-anniversary/a-form-with-an-empty-line` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  户籍窗口换了一张新表格，配偶一栏不能空着。Josef最后写了“同住人”，办事员抬头看了一眼，说这不作数。回家后，Josef把表格折成很小的一块，塞进针线盒；伴侣问今天顺不顺利，Josef说和平时一样。
  _effects: state_parameter ld18-impossible-attachment.pressure 65 -> 71; state_parameter ld18-impossible-attachment.discretion 22 -> 19; mood -0.020000000000000018_

- **1937.01** `state_expire:oj18-odd-apprenticeship` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  Josef的「奇职学徒」到期；相关安排结束。
  _effects: state_remove oj18-odd-apprenticeship state:world-vienna-1912:671; role; flag -odd_job_apprentice_

- **1937.01** `state_tick:ml18-reversal/reversal-half-year/the-swing-holds` tags: ml18-reversal, money, luck, reversal, risk, debt, reputation, loss
  半年里没有新的坏消息。Josef把零钱分成三份：房租、还账、留一点在抽屉里。旧债主没有上门，咖啡馆里的人也不再每见一次就提那件赔本的事；日子没有变好，但至少不再往下滑。
  _effects: state_parameter ml18-reversal.swing -10 -> -4; state_parameter ml18-reversal.strain 30 -> 26; cash 1 (small economies and an odd job); mood 0.010000000000000009_

- **1937.01** `r13-work.strike-fund::ctx-vienna-authoritarian-1934::milieu-tenement/collected-forty-kroner` tags: work, union, strike, mutual_aid, food, vienna, urban, crisis
  Josef拿着锡罐在市场和厂门口转了一天。肉铺老板放了两枚克朗，面包房给了一袋隔夜面包，Helene Kral 2把准备交房租的钱数出三分之一。天黑时锡罐里有四十多克朗，Josef把每一笔都写在包装纸上，连半赫勒也没漏。
  _effects: cash -2 (罢工第七天的汤锅); food; flag +work13_strike_fund_collected; relation friend with person-materialized-world-vienna-1912-69; organization_funds; relation acquaintance with person-materialized-world-vienna-1912-23_

- **1937.11** `p9-gap-adult-solitude.window-argument/window-argument.nod` tags: adulthood, daily, solitude, ordinary, home, neighbor, overheard
  Josef在窗边听了一刻钟，只听出是工钱和面包账的事，最后把窗虚掩上睡了。第二天清早在楼梯口碰见那个女人，眼睛有点肿，两人错身时她点了点头，谁也没说话。
  _effects: mood 0.020000000000000018; flag +knows_downstairs_quarrel_

- **1937.11** `major-family.separation-widowhood/separation-widowhood.boots-sold` tags: family, separation, widowhood, housing, major, lifecycle, household
  Mitzi Bauer 2连着三个星期日没有回来。Josef去问工头，工头说Mitzi Bauer 2跟着一批季节工去了下奥地利，铺盖已经托人搬进合租房。Josef把Mitzi Bauer 2的靴子卖了八克朗，用这笔钱付了房租，又把Mitzi Bauer 2的工票收进抽屉。门房问要不要留话，Josef说不用，顺手把门牌上的灰擦了。
  _effects: household; relation_end partner with person-materialized-world-vienna-1912-36; role; flag +deserted_by_partner; cash 8 (sold the partner's boots to pay the rent); mood -0.020000000000000018_

- **1938.01** `r14-edu.sibling-favour::ctx-vienna-authoritarian-1934::milieu-tenement/sibling-paid-the-fees` tags: education, tutored_sibling, family, reunion, vienna, urban, crisis, war
  Berta Winter在城里站稳了脚，托人带来一个信封，里面是八克朗和一张夜校报名单。信上只写：当年你教我算术，现在轮到我付学费。Josef把报名单看了三遍，填好，第二天一早就去交了。
  _effects: cash 8 (多年后的一封家信); flag +sibling_repaid_tutoring; relation kin with person:evt:world-vienna-1912:000062:child_
  _causes: evt:world-vienna-1912:005596_

- **1938.01** `state_reaction:ld18-impossible-attachment/a-question-at-the-office` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  办公室有人问Josef，为什么总有一个女人在楼下等她。Josef说那是表妹；对方笑了一下，说现在的表妹真体贴。下午，Josef把桌上的相框扣倒，又在没人时翻回来，用袖子擦了擦玻璃上的灰。
  _effects: state_parameter ld18-impossible-attachment.pressure 71 -> 79; state_parameter ld18-impossible-attachment.discretion 19 -> 15; reputation -0.020000000000000018_
  _causes: evt:world-vienna-1912:009090_

- **1938.01** `vienna-life-anschluss-1938/complies` tags: politics, persecution, 1938
  Josef Winter在街口设了登记桌，要求住户交出姓名、职业和宗教。Josef排队填了表，回家把门牌擦干净。楼里有人连夜搬走，也有人站在阳台上挥手。
  _effects: role; cash -3 (new permits and stamps); condition_

- **1938.01** `curse15-betrayal.signature::ctx-vienna-authoritarian-1934::milieu-tenement/the-seal-was-used` tags: betrayal, office, power, politics, curse, institution, vienna, urban
  Alois Moser用Josef留在抽屉里的印章签了一份采购单，把库房里最后一批煤卖给了城外的砖厂。Josef发现时，账已经做平，签字栏里是Josef自己的名字。Alois Moser说只是替Josef省了麻烦，还把那支用旧的印泥放回了原处。
  _effects: cash -3 (为平账先垫出去的钱); reputation -0.09999999999999998; relation rival with person-materialized-world-vienna-1912-18; condition; flag +seal_used_by_trusted_hand; mood -0.010000000000000009_

- **1938.01** `state_tick:ld18-impossible-attachment/invented-anniversary/the-date-that-is-not-on-paper` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  Josef和伴侣把认识的那一天当作纪念日。没有登记，没有证人，只有一块从旧货摊买来的蛋糕和两杯兑了水的酒；Josef在日历上画了一个别人看不懂的记号，第二年又画在同一个格子里。
  _effects: state_parameter ld18-impossible-attachment.devotion 73 -> 77; state_parameter ld18-impossible-attachment.pressure 79 -> 76; mood 0.020000000000000018_

- **1938.01** `state_expire:ml18-reversal` tags: ml18-reversal, money, luck, reversal, risk, debt, reputation, loss
  Josef的「运势倒转」到期；相关安排结束。
  _effects: state_remove ml18-reversal state:world-vienna-1912:761; flag -fortune_reversed_

- **1938.01** `p10-family-tasks.arrange-childcare/arrange-childcare.quit-job` tags: adulthood, family, social, marriage, care, inheritance, task, childcare
  Josef把半天工的工钱单交回去，换回自己看孩子。晚饭从两顿并成一顿，土豆和面包皮煮一锅，伴侣把煤钱数了两遍。孩子睡下后，Josef在窗边缝袜子，一枚针扎了手指，她含住指头继续缝。
  _effects: cash -4 (辞掉半天工少了一份收入); food; health -0.040000000000000036 (营养不足和夜里缝补的劳累); relation acquaintance with person-materialized-world-vienna-1912-52_

- **1938.03** `r2-leisure.stage-door::ctx-vienna-authoritarian-1934::milieu-tenement::stage-door-war/autograph-after-benefit` tags: leisure, theatre, celebrity, autograph, class, vienna, urban, crisis
  义演结束，后台门口挤满伤兵和家属。Rosa Lechner 2没有卸妆，站在门口一个一个签名，签到手抖。Josef把本子递过去时，看见他的戏服袖口磨破了，里面露出绷带。Franz Hofer说下一个，Rosa Lechner 2说等一下，这位还没签。
  _effects: mood 0.07999999999999996; condition; flag +autograph_after_benefit; relation friend with person-materialized-world-vienna-1912-12; knowledge “the actor is performing with a bandaged arm”; relation acquaintance with person-materialized-world-vienna-1912-12; relation acquaintance with person-materialized-world-vienna-1912-101_

- **1938.05** `vienna-legacy-worklife.sick-fund/sick-fund.fill-form` tags: legacy, work, family, reform, ordinary_life, injury
  表格有四栏，第四栏要写“工种及所属行会”。Josef问工友平时怎么称呼自己的活，工友靠在机器旁边说“就是上油”。办事员的印章是木柄的，按下去时咔的一声。
  _effects: health -0.030000000000000027 (在衙门走廊站了大半天); relation colleague with person-materialized-world-vienna-1912-14; skill; relation acquaintance with person-materialized-world-vienna-1912-14_

- **1938.07** `state_reaction:wish-craft/craft-humiliation` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_reaction
  Josef把那句轻视记了很久。它没有变成一个决定，但也没有消失。
  _effects: mood -0.050000000000000044_
  _causes: evt:world-vienna-1912:009685_

- **1938.08** `r3-war.defeat-rumor::ctx-vienna-authoritarian-1934::milieu-tenement::defeat-rumor-crisis/witnessed-records-evacuated` tags: war, rumor, defeat, bread, fear, vienna, urban, crisis
  第二天，面包房开门时，队伍排得比平时长。Franz Lechner说昨晚听见火车站在烧文件，Josef说那是暖气；话没说完，一辆卡车拉着档案柜从街口拐过去。Otto Berg 2站在门口，手里的钥匙串一直响。
  _effects: food; flag +witnessed_records_being_evacuated; relation acquaintance with person-materialized-world-vienna-1912-100; knowledge “the government is moving its files”; relation acquaintance with person-materialized-world-vienna-1912-100; relation acquaintance with person-materialized-world-vienna-1912-102_

- **1939.01** `state_reaction:ld18-impossible-attachment/a-question-at-the-office` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  办公室有人问Josef，为什么总有一个女人在楼下等她。Josef说那是表妹；对方笑了一下，说现在的表妹真体贴。下午，Josef把桌上的相框扣倒，又在没人时翻回来，用袖子擦了擦玻璃上的灰。
  _effects: state_parameter ld18-impossible-attachment.pressure 76 -> 84; state_parameter ld18-impossible-attachment.discretion 15 -> 11; reputation -0.020000000000000018_
  _causes: evt:world-vienna-1912:009700_

- **1939.01** `p22-child-matchmaker::ctx-vienna-authoritarian-1934::milieu-tenement/the-enemy-was-the-landlord` tags: child, matchmaker, family_album, enemy, warm, ironic, reconciliation, scandal
  Katharina Moser 2看完相册，笑着说这栋楼正好是他的。Josef以为他在开玩笑，直到Katharina Moser 2拿着房契上门；Katharina Moser 2说看在孩子的份上，房租可以晚交一个月。那天晚上，孩子把照片从相册里撕下来，放进了自己的铅笔盒。孩子把铅笔盒合上，说以后不再贴照片了。
  _effects: state_add debt-bondage state:world-vienna-1912:881; cash -4 (the rent increase and the late fee); relation rival with person-materialized-world-vienna-1912-104; relation kin with person:evt:world-vienna-1912:002763:child; flag +enemy_was_landlord; relation acquaintance with person-materialized-world-vienna-1912-104_

- **1939.01** `state_tick:ld18-impossible-attachment/invented-anniversary/a-form-with-an-empty-line` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  户籍窗口换了一张新表格，配偶一栏不能空着。Josef最后写了“同住人”，办事员抬头看了一眼，说这不作数。回家后，Josef把表格折成很小的一块，塞进针线盒；伴侣问今天顺不顺利，Josef说和平时一样。
  _effects: state_parameter ld18-impossible-attachment.pressure 84 -> 90; state_parameter ld18-impossible-attachment.discretion 11 -> 8; mood -0.020000000000000018_

- **1939.01** `kernel-social.lending::ctx-vienna-authoritarian-1934::milieu-tenement::lending-crisis/lending.sewing-machine` tags: task, task:social, social, lending, debt, neighbor, money, everyday
  Josef的房租也到期了，只好把Mitzi 2的缝纫机搬到自己屋里，说等还钱再还机器。Mitzi 2来取针线盒时，看见缝纫机头上盖着布，站了一会儿就走了；第二天，整栋楼都知道这件事。
  _effects: role; reputation -0.040000000000000036; flag +seized_sewing_machine; knowledge “缝纫机被扣作抵押，针线盒还留在邻居手里。”_
## Rosa

Born 1912.01, died 1939.01 (age 27).
Education: secondary 1; occupation: none; roles: infant, child, playmate, home_tutor, roof_group_member, union_member, deferred_treatment, refused_lender, office:无线电修理匠, office:助理文书, office:师傅, warehouse_keeper, reliable_carter, watched_by_police.

### State snapshot
- p22-child-omen [person] (ended 1918.1: duration expired) parameters={"strangeness":70,"attention":83,"protection":29,"fear":69} links={} ticks=3
- p22-family-legend [person] (ended 1920.1: exit condition met) parameters={"warmth":70,"secrecy":45,"danger":18,"promise":57} links={} ticks=3
- apprenticeship-contract [person] (ended 1927.1: duration expired) parameters={"progress":10,"failures":1,"trade":"木工","paid":true} links={} ticks=2
- yf18-runaway-plan [person] (ended 1928.1: duration expired) parameters={"preparation":47,"suspicion":25,"resolve":68,"destination":"格拉茨","ticket":true} links={} ticks=2
- yf18-first-awakening [person] (ended 1928.1: duration expired) parameters={"intensity":50,"nerve":10,"talk":25,"reciprocated":true,"secret":true} links={"beloved":"Hedwig"} ticks=2
- apprenticeship-contract [person] (ended 1928.1: the master ended the contract) parameters={"progress":5,"failures":2,"trade":"木工","paid":true} links={} ticks=2
- failed-apprentice [person] (ended 1928.3: replaced_by:apprenticeship-contract) parameters={} links={} ticks=0
- yf18-runaway-plan [person] (ended 1930.1: duration expired) parameters={"preparation":57,"suspicion":15,"resolve":58,"destination":"格拉茨","ticket":false} links={} ticks=2
- apprenticeship-contract [person] (ended 1931.1: passed the journeyman test) parameters={"progress":50,"failures":0,"trade":"木工","paid":true} links={} ticks=2
- oj18-odd-apprenticeship [person] (ended 1933.1: duration expired) parameters={"trust":42,"strangeKnowledge":33,"reliability":55,"nightsWorked":24,"post":"香水铺学徒"} links={} ticks=2
- journeyman [person] (ended 1939.1: owner_died) parameters={} links={} ticks=0
- bc18-bureaucratic-ghost [person] (ended 1933.1: duration expired) parameters={"fileDepth":49,"sightings":3,"risk":77,"duplicates":3,"officialStatus":"被冒领的死者","alias":"远房表姐的弟弟"} links={} ticks=3
- oj18-odd-apprenticeship [person] (ended 1936.1: duration expired) parameters={"trust":14,"strangeKnowledge":10,"reliability":45,"nightsWorked":0,"post":"无线电修理匠"} links={} ticks=2
- wc17-master-craftsperson [person] (ended 1939.1: owner_died) parameters={"standards":75,"backlog":5,"debt":5,"markRegistered":true} links={} ticks=2
- lc19-workshop-talisman [person] (ended 1937.1: duration expired) parameters={"reliance":29,"dignity":55,"protection":6,"debt":5} links={} ticks=2
- office-under-siege [person] (ended 1937.1: duration expired) parameters={"exposure":60,"support":45,"months":0,"cause":"scandal turned into publicity","positionId":"pos:workshop:person-phase15-Rosa-world-vienna-1912-evt:world-vienna-1912:006980:师傅:6980"} links={} ticks=1
- debt-bondage [person] (ended 1939.1: owner_died) parameters={"debt":20,"creditor":"银行"} links={} ticks=1

### 140 subject events

- **1912.02** `p22-warm-naming-feast::ctx-vienna-1912::milieu-tenement/the-cake-falls` tags: infancy, family, feast, name, neighbor, warm, tender, drama
  蛋糕从桌边滑下去，Emil Weiss用围裙接住了，奶油还是蹭了一手，桌布上也留了一块白印。大家把没沾地的半边分着吃；Franz Lechner舔着手指说，这是最好吃的一次掉蛋糕。
  _effects: mood 0.049999999999999996; cash -2 (a feast cake); flag +cake_saved_

- **1912.03** `vienna-life-infant-feeding/fed-enough` tags: infancy, food, household
  Rosa Lechner在Lechner-Wohnung, Leopoldstadt给Rosa喂奶，随后把洗净的布尿片挂在窗边。孩子吃饱后睡着了，锅里还留着半碗燕麦糊。
  _effects: cash -2 (milk and oatmeal)_

- **1912.12** `vienna-life-birth-letter-from-the-dead/the-letter-is-real` tags: infancy, family, secret, letter, drama
  邮差把一封边角磨白的信塞进门缝，收信人是一个已经死了三年的名字。Rosa Lechner把Rosa放在膝上，拆开信，里面只有一句：“孩子像不像他？”Hermann Kral在门口探头，问是不是寄错了；Rosa Lechner把信折回去，说“没有寄错”。
  _effects: flag +letter_from_dead_relative; knowledge “一封写给死去亲人的信问：孩子像不像他。”; mood -0.04_

- **1913.01** `vienna-life-toddler-wrong-cradle/the-neighbour-is-mistaken` tags: infancy, family, rumour, identity, comic, drama
  Rosa Lechner把被子摊在桌上，指着上面的补丁说这是外婆的针脚。Hermann Kral看了半天，承认自己认错了；Rosa在旁边把一只木勺敲得咚咚响，像在给这场争论判案。
  _effects: relation acquaintance with person-hermann-kral; mood 0.019999999999999997; skill_

- **1913.02** `p22-strange-doctor-prediction::ctx-vienna-1912::milieu-tenement/the-doctor-writes-nothing` tags: infancy, family, doctor, illness, omen, strange, dark, drama
  医生听完胸口，提笔写了一句，又划掉，只留下一个墨团。他把纸折好，说“把屋子烧暖一点”；Alois Lechner等医生走后，对着灯看那张纸，认出墨团底下露出半个“冬”字，灯芯正好爆了一下。
  _effects: state_add p22-child-omen state:world-vienna-1912:40; mood -0.04000000000000001; knowledge “医生写下又划掉的诊断里，露出一个“冬”字。”_

- **1913.02** `state_reaction:p22-child-omen/a-stranger-touches-the-door` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  一个陌生人把手按在Rosa家的门框上，说这样能把坏运气留在门外。大人没有拦，只等那人走远，才用湿布把门框擦了一遍，布上留下一点灰，门框上留下一道浅印。
  _effects: state_parameter p22-child-omen.attention 65 -> 70; state_parameter p22-child-omen.fear 55 -> 59; state_parameter p22-child-omen.protection 25 -> 27; mood -0.01_
  _causes: evt:world-vienna-1912:000284_

- **1913.06** `iw18-infancy.first-word::ctx-vienna-1912::milieu-tenement/the-dog-gets-the-first-word` tags: infancy, first_word, memory, family, wonder, eerie, vienna, urban
  Rosa追着炉边的狗爬了半间屋，忽然拍着地板喊出狗的名字。狗吓得钻到床下，Rosa Lechner笑得把水壶都放下了；邻居在门外问出了什么事。那天晚上，家里给狗多留了半块面包。
  _effects: mood 0.04000000000000001; food; flag +first_word_dog_name_

- **1914.01** `vienna-life-toddler-first-words/first-word-nonsense` tags: infancy, family, first, comic
  Rosa说了一长串谁也听不懂的话，最后用力点头，像是在宣布一件已经决定的事。Alois Lechner认真听完，也点了点头；孩子满意地爬走了，留下大人们互相看着，忍不住笑。
  _effects: mood 0.04000000000000001; skill_

- **1914.01** `state_tick:p22-child-omen/the-omen-returns/the-coincidence-repeats` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  又过了一年，同一件小事又发生了：钟停在同一个时刻，门口的狗对着空处叫。Rosa正在学系鞋带，抬头问“又来了吗”；大人说没有，手却先去摸门框，谁也没有回答。
  _effects: state_parameter p22-child-omen.strangeness 60 -> 65; state_parameter p22-child-omen.attention 70 -> 74; state_parameter p22-child-omen.fear 59 -> 62; mood -0.01_

- **1914.02** `vienna-life-toddler-accident/scalded-hand` tags: infancy, accident, family, danger, injury
  厨房的锅盖没有盖严，Rosa伸手去够桌上的勺子，蒸汽先扑到手腕上。Alois Lechner把孩子抱到水缸边，一瓢一瓢地浇冷水；孩子哭得打嗝，锅里的汤还在冒泡。
  _effects: health -0.07999999999999996 (scalded hand); condition; cash -1 (bandages and ointment); mood -0.04999999999999999_

- **1915.01** `vienna-life-child-family-legend/happy-legend` tags: childhood, family, secret, story
  Alois Lechner讲起自己小时候在乡下追一只白鹅，追到河边，鹅没追到，倒捡回一篮鸭蛋。Rosa笑得从凳子上滑下来，Alois Lechner也跟着笑，说这个家不是只有欠账和葬礼。
  _effects: mood 0.04; mood 0.01999999999999999_

- **1915.02** `p22-warm-night-move::ctx-klosterneuburg-rural-1912::milieu-tenement/the-cradle-goes-first` tags: childhood, family, move, neighbor, tenement, warm, bittersweet, drama
  搬家定在夜里，怕白天遇见旧房东。Anna Moser在前面打灯，Rosa Lechner抱着摇篮，Rosa抱着一只枕头跟在后面。新屋有一扇能看见院子的窗，孩子把枕头放在窗台上，说这是给月亮留的。
  _effects: mood 0.05; health 0.010000000000000009 (a less crowded room); relation acquaintance with person-phase15-Rosa-world-vienna-1912; cash -3 (moving at night); flag +moved_at_night; state_add p22-family-legend state:world-vienna-1912:49_

- **1915.02** `p22-comic-mistaken-child::ctx-klosterneuburg-rural-1912::milieu-tenement/the-hat-is-the-same` tags: childhood, family, market, neighbor, mistaken_identity, comic, tender, drama
  两个孩子的帽子一模一样，两个大人在摊子前换了半天，才发现怀里的孩子都在睡。Rosa醒来时看见一张陌生的脸，愣了一会儿，又睡着了；两个母亲互相道歉，又互相检查帽子。
  _effects: mood 0.03; flag +hat_swap_

- **1915.02** `p22-strange-grandmother-voice::ctx-klosterneuburg-rural-1912::milieu-tenement/the-child-is-playing` tags: childhood, family, grandmother, memory, omen, strange, eerie, drama
  Rosa Lechner认定孩子在学大人说话，笑着拍手。Rosa愣了一下，又把那句话说得更响；Franz Lechner也跟着学，三个人的声音在厨房里撞来撞去，最后谁也说不清原句是什么，一起笑了。
  _effects: mood 0.020000000000000004; relation kin with person-phase15-Rosa-world-vienna-1912; flag +saying_is_a_game_

- **1915.02** `state_reaction:p22-child-omen/a-stranger-touches-the-door` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  一个陌生人把手按在Rosa家的门框上，说这样能把坏运气留在门外。大人没有拦，只等那人走远，才用湿布把门框擦了一遍，布上留下一点灰，门框上留下一道浅印。
  _effects: state_parameter p22-child-omen.attention 74 -> 79; state_parameter p22-child-omen.fear 62 -> 66; state_parameter p22-child-omen.protection 27 -> 29; mood -0.009999999999999995_
  _causes: evt:world-vienna-1912:000457_

- **1915.03** `p9-childhood-household.name-day-gift/old-shoes` tags: childhood, family, household, home, siblings, illness, neighbors, injury
  报纸窸窸窣窣打开，露出一双旧鞋。Rosa认出鞋帮上的补丁，是弟妹穿剩下的。Rosa把脚伸进去，脚后跟还空着一指，脚趾却挤在前头。Rosa Lechner看了看，说垫层布就好了，起身去柜子里翻布头。
  _effects: mood -0.01999999999999999; relation kin with person-rosa-lechner; health -0.020000000000000018 (鞋挤脚走路发疼)_

- **1916.01** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Rosa家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 35 -> 39; state_parameter p22-family-legend.warmth 65 -> 67; mood 0.009999999999999995_
  _causes: evt:world-vienna-1912:000551_

- **1916.01** `vienna-life-child-first-friend/shared-toy` tags: childhood, friendship, family, comic
  Josef Lechner在楼道里滚一只铁环，Rosa站在门口看。Josef Lechner把铁环推过来，说“你推一次，我推一次”。两个人从楼梯口推到院子里，铁环倒下的声音把午睡的大人吵醒了一排。
  _effects: relation friend with person:evt:world-vienna-1912:000115:child; skill; mood 0.05000000000000002_

- **1916.01** `state_tick:p22-child-omen/the-omen-returns/the-coincidence-repeats` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  又过了一年，同一件小事又发生了：钟停在同一个时刻，门口的狗对着空处叫。Rosa正在学系鞋带，抬头问“又来了吗”；大人说没有，手却先去摸门框，谁也没有回答。
  _effects: state_parameter p22-child-omen.strangeness 65 -> 70; state_parameter p22-child-omen.attention 79 -> 83; state_parameter p22-child-omen.fear 66 -> 69; mood -0.009999999999999995_

- **1916.01** `state_tick:p22-family-legend/the-story-changes-hands/a-detail-goes-missing` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，故事里最要紧的那件东西不见了：先是名字，后来是地点。Rosa问起时，大人说“你记错了”；可柜子最底层那只空盒子，谁也没有扔，锁却换过了，钥匙也不见了。
  _effects: state_parameter p22-family-legend.secrecy 39 -> 43; state_parameter p22-family-legend.danger 15 -> 18; state_parameter p22-family-legend.warmth 67 -> 65; mood -0.009999999999999995_

- **1917.02** `p9-childhood-household.fever-night/hospital-deposit` tags: childhood, family, household, home, siblings, illness, neighbors
  围巾从Rosa的头一直裹到脚，Alois Lechner抱着人下楼，在电车踏板上差点滑倒。急诊窗口先收押金，Alois Lechner把内袋里的票子一张张抹平，数出六克朗。Rosa躺在观察室的窄床上，头顶的灯管嗡嗡响，Alois Lechner的手一直按着被角。
  _effects: cash -6 (医院急诊押金和电车票); health 0.08 (在医院接受处理); mood -0.04000000000000001_

- **1918.01** `state_expire:p22-child-omen` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  Rosa的「孩子身上的兆头」到期；相关安排结束。
  _effects: state_remove p22-child-omen state:world-vienna-1912:40_

- **1918.01** `state_tick:p22-family-legend/the-story-changes-hands/told-at-the-table` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，Rosa家的故事在饭桌上换了新的讲法：多了一句笑话，少了一处哭声。听的人把汤匙放下，等下一句；讲故事的人却先去看窗子有没有关好，谁也没有先动筷子。
  _effects: state_parameter p22-family-legend.warmth 65 -> 68; state_parameter p22-family-legend.secrecy 43 -> 41; state_parameter p22-family-legend.promise 55 -> 57; mood 0.009999999999999995_

- **1918.01** `p9-gap-childhood-chores.market-line/line-both-families` tags: childhood, household, chores, school, task, daily, market, food
  队伍拐弯时，Sigmund Freud朝Rosa招手。Rosa挤过去，替两家把面包领出来，纸包用不同的绳结系住。家里人晚上解开绳结，先掂了掂份量，再问价钱；Rosa把每一包的面包数、找零和欠的铜板都说了一遍，家里人听完才把两包分别收进柜子。
  _effects: food; relation acquaintance with person-sigmund-freud; skill; relation acquaintance with person-materialized-world-vienna-1912-7_

- **1918.05** `r14-soc.childhood-oath::ctx-klosterneuburg-rural-1912::milieu-tenement/shared-last-bread` tags: childhood_friendship, childhood_oath, poverty, loyalty, neighbor, rural, agriculture, small_town
  面包房后门的泔水桶边，Maria Kraus捡起半块没沾灰的黑面包，掰成两半。Rosa把大的那半推回去，说自己早上吃过；其实Rosa的胃从昨夜就在叫。两人蹲在台阶上吃完，约好谁也不许把这件事说出去。多年后Rosa仍记得，那半块面包边上有股煤灰味。
  _effects: cash -1 (砖墙根下的铜纽扣); mood 0.05; flag +shared_last_bread; relation friend with person:evt:world-vienna-1912:000183:child_

- **1919.01** `p9-gap-childhood-chores.mind-sibling/sibling-shelter-missed-river` tags: childhood, household, chores, school, task, daily, sibling, care
  巷口的喊声第二次传来时，Rosa正用膝盖压住木盆边沿，给Luise Lechner挡穿堂风。Luise Lechner在旧布底下翻了个身，Rosa立刻停住，等呼吸又匀了才敢动。Alois Lechner推门进来，先看见盆里睡着的Luise Lechner，再看见Rosa冻红的脚背，把灶上留的汤热了热。
  _effects: mood -0.02; relation kin with person:evt:world-vienna-1912:000286:child; relation kin with person-alois-lechner_

- **1919.02** `r2-rural.village-school::ctx-klosterneuburg-rural-1912::milieu-tenement/kept-home-for-the-harvest` tags: rural, school, childhood, teacher, literacy, agriculture, small_town, peace
  Alois Lechner在门口等Rosa，说今天再不摘豆子，霜一来就全烂。Grete Stein把课本合上，说落下的课自己补。Rosa跟着Alois Lechner走进地里，手指沾满豆荚的绒毛，书包挂在篱笆上。
  _effects: flag +kept_home_for_harvest; skill; relation kin with person-alois-lechner_

- **1919.02** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Rosa家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 41 -> 45; state_parameter p22-family-legend.warmth 68 -> 70; mood 0.010000000000000009_
  _causes: evt:world-vienna-1912:001198_

- **1919.02** `r14-soc.patron-child::ctx-klosterneuburg-rural-1912::milieu-tenement/turned-away-at-the-door` tags: cross_class_childhood, childhood_friendship, charity, shame, class, rural, agriculture, small_town
  Rosa拎着母亲让送去的醋栗站在别墅正门，Mitzi正和穿水手服的表亲们拍照。Mitzi看了Rosa一眼，说送错门了。Josefine Hofer把醋栗接过去，顺手放在门房外的台阶上。Rosa走回巷子时，听见身后钢琴又响起来；那篮醋栗第二天出现在厨房的垃圾桶里，谁也没再提。
  _effects: mood -0.12; reputation -0.02; flag +turned_away_at_villa; relation acquaintance with person-phase15-Mitzi-world-vienna-1912_

- **1919.02** `kernel-social.first-meeting::ctx-klosterneuburg-rural-1912::milieu-tenement/first-meeting.coal-basket` tags: social, friendship, first_meeting, childhood, neighbor, everyday, rural, agriculture
  在合住的出租公寓的楼梯上，Rosa抱着一筐煤，Berta Winter从楼上下来，伸手托住筐底。两人把煤抬到四楼，在窗台上分了一块黑面包；此后上学、提水都结伴，谁家晚归就替谁留门。煤灰落在鞋面上，他们用同一块破布擦手。
  _effects: relation friend with person:evt:world-vienna-1912:000062:child; role; flag +childhood_friend; knowledge “那个总在楼梯上帮忙的孩子住在同一栋楼的顶层。”_

- **1920.01** `state_exit:p22-family-legend` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  Rosa不再处于「家族传说」；条件已经改变。
  _effects: state_remove p22-family-legend state:world-vienna-1912:49_

- **1920.01** `p9-gap-childhood-chores.laundry-help/laundry-dragged-docked-pay` tags: childhood, household, chores, school, task, daily, laundry, work
  “你看看这角。”Ferdinand Lechner 2把床单拎起来，煤渣簌簌往下掉。Rosa伸手去拍，反而把灰按进布纹里。Ferdinand Lechner 2从工钱里数回两枚，只留一赫勒在Rosa手心，让重洗那角。晚饭前Rosa一直蹲在井台边，换了两盆水，指甲缝里全是黑泥。
  _effects: cash 0.01 (被扣后只剩一赫勒); mood -0.05; relation acquaintance with person-materialized-world-vienna-1912-24; relation acquaintance with person-materialized-world-vienna-1912-24_

- **1920.11** `vienna-childhood-friends.courtyard-race/won-the-race-lost-a-button` tags: childhood, social, school, street
  Rosa跑到第二圈时鞋带松了，索性踩着鞋后跟跑。最后一圈，Rosa从床单底下钻过去，先拍到墙。Karl Kraus喘着气，把两颗弹珠拍进Rosa手心。Rosa低头才发现外套少了一颗扣子；窗口的Karl Kraus扔下一根别针，说先别着。
  _effects: mood 0.05; relation acquaintance with person-karl-kraus_

- **1921.01** `p9-gap-childhood-chores.market-line/line-sold-out-potatoes` tags: childhood, household, chores, school, task, daily, market, food
  “卖完了。”三个字从窗口里传出来，Rosa后面的队伍立刻散了一半。Rosa没走，趴在窗台上看伙计扫面屑，直到人家挥手赶人。旁边摊子的土豆带着泥，Rosa用围裙兜住，一枚一枚数铜板，回家报账时连找零都说清了。
  _effects: food; mood -0.03; skill; relation acquaintance with person-materialized-world-vienna-1912-1_

- **1921.09** `vienna-childhood-street.market-errand/errand-ok` tags: childhood, street, social, home
  市场里的菜摊一字排开，Rosa把十五克鲁泽排在掌心，先买了土豆，又去盐摊上要了一小包。摊主用旧报纸把盐裹好，Rosa把它塞进围裙内袋，土豆兜在身前。回家时Alois Lechner接过铜板一枚枚数，土豆一颗没少。
  _effects: food; cash -0.15 (市场花销); relation kin with person-alois-lechner_

- **1922.01** `p9-gap-childhood-chores.laundry-help/laundry-bread-with-friend` tags: childhood, household, chores, school, task, daily, laundry, work
  两个孩子在院子两头跑，一个递，一个夹，床单在风里鼓起来。最后一条挂好，Hedwig Stein从厨房拿出面包，先给了自家孩子，再掰一块给Rosa。Rosa把面包塞进围裙口袋，回家后放在家里人的碗边，说自己在外面吃过了。
  _effects: food; relation acquaintance with person-hedwig-stein; skill_

- **1922.05** `statistical_infection`
  Rosa在Leopoldstädter Zinshaus, gemeinsamer Gang病倒了，伤寒让身体发热、虚弱，接下来的日子只能卧床。

- **1922.06** `statistical_illness_worsened`
  Rosa的伤寒没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1922.06** `vienna-childhood-friends.courtyard-race/won-the-race-lost-a-button` tags: childhood, social, school, street
  Rosa跑到第二圈时鞋带松了，索性踩着鞋后跟跑。最后一圈，Rosa从床单底下钻过去，先拍到墙。Maria Kral喘着气，把两颗弹珠拍进Rosa手心。Rosa低头才发现外套少了一颗扣子；窗口的Maria Kral扔下一根别针，说先别着。
  _effects: mood 0.05; relation acquaintance with person-maria-kral_

- **1922.09** `statistical_recovery`
  Rosa从伤寒中慢慢恢复，能下床喝水，但身体还虚弱。

- **1923.01** `p9-gap-childhood-chores.mind-sibling/sibling-shelter-missed-river` tags: childhood, household, chores, school, task, daily, sibling, care
  河水那边传来同伴的笑声，Rosa站在院门口听了听，还是回去把木盆扶正。Friedrich Winter睡醒哭了一声，Rosa把最后半块面包掰碎泡进温水，一勺一勺喂。Rosa Lechner回来时，Rosa正蹲在盆边打瞌睡，手里还攥着喂饭的木勺。
  _effects: mood -0.02; relation kin with person:evt:world-vienna-1912:001622:child; relation kin with person-rosa-lechner; relation acquaintance with person-materialized-world-vienna-1912-9_

- **1924.02** `vienna-youth-threshold.sibling-departure/coins-into-box` tags: adolescence, school, work, family, transition
  Franz Lechner的箱子摊在床板上，里面是两件衬衫、一双旧靴和母亲塞的一小袋面粉。Rosa把攒了半年的零钱数到第三遍，一共一克朗二十赫勒，全塞进箱角的袜子里。Franz Lechner看见了，没说话，只把箱子扣上，铜扣响了一声。
  _effects: cash -1.2 (把攒下的零钱塞给离家的兄姐); mood -0.03_

- **1924.03** `vienna-adolescence.brothers-torn-jacket/sew-it-yourself` tags: adolescence, school, work, family, social
  外套腋下裂了一道口子，里布翻出来。Rosa把袖口套在桌角上撑开，穿针时试了三次才引上线。针脚一针长一针短，像蜈蚣。Alois Lechner端着汤进来，站在桌边看了一会儿，把碗往Rosa那边推了推，自己只留了半碗。
  _effects: skill; food; relation kin with person-alois-lechner_

- **1925.01** `r13-edu.boarding-school::ctx-vienna-reform-1930::milieu-tenement/admitted-to-dormitory` tags: education, boarding_school, residence, family, scholarship, reform, medical, schooling
  Rosa把铁皮箱绑在自行车后座，骑了三十里到寄宿学校。舍监检查行李，把家里的腌菜罐没收，说会招老鼠。Rosa在熄灯后偷偷把罐子从垃圾堆捡回来，藏在床底，第一顿饭就着腌菜吃完了两碗粥。第一个星期Rosa把腌菜分给同屋，换回三张邮票和一支不漏水的钢笔。
  _effects: flag +boarding_school_admitted; education secondary_

- **1925.02** `r15-work.master-takes-on::ctx-vienna-reform-1930::milieu-tenement/signed-contract` tags: work, craft, apprentice, trade, poverty, reform, medical, schooling
  Rosa Lechner 2把学徒契约摊在桌上，指给Rosa看期限、工钱和出师考试。Rosa签了名，第二天站到刨床前，手指上多了第一道木刺。
  _effects: relation employer with person-materialized-world-vienna-1912-12; state_add apprenticeship-contract state:world-vienna-1912:149; relation acquaintance with person-materialized-world-vienna-1912-12; education apprenticeship; role_

- **1925.02** `r3-teen.sexual-rumor::ctx-vienna-reform-1930::milieu-tenement::reform-school-paint-order/denied` tags: rumor, shame, school, reputation, institution, reform, medical, schooling
  墙上出现了一行关于Rosa的脏话，Katharina Lechner让全班提水刷墙，刷了三遍还能看见白印。Emil Hofer在背后学那句话的腔调，Rosa回头时，他正低头抠桌角的漆。
  _effects: reputation -0.06; condition; flag +target_of_sexual_rumor; relation rival with person-materialized-world-vienna-1912-43; relation acquaintance with person-materialized-world-vienna-1912-43; relation acquaintance with person-materialized-world-vienna-1912-41_

- **1926.01** `vienna-life-apprenticeship/factory-hand` tags: adolescence, work, apprenticeship, employment
  Buchdruckerei Winter & Söhne把Rosa分到装订间，每天站十个小时，工钱按件算。第一周结束，Rosa的指关节肿了，工头说习惯就好。
  _effects: employment Buchbinderhilfe @ org-winter-print; condition_

- **1926.01** `state_tick:apprenticeship-contract/workshop-year/mistake` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Rosa废掉了一块料，师傅扣了工钱。晚饭时谁也没提这件事。
  _effects: state_parameter apprenticeship-contract.failures 0 -> 1; cash -1 (wasted material); mood -0.039999999999999994_

- **1926.01** `r13-fam.help-homework::ctx-vienna-reform-1930::milieu-tenement/sums-finished` tags: task, family, school, homework, sibling, literacy, reform, medical
  Rosa把煤油灯往桌子中间挪，让Luise Lechner看清算术本上的格子。孩子把七加八数了三遍，Rosa没有直接说答案，只把豆子一颗颗排在桌上。最后一页写完时，灯芯已经烧黑，Rosa才发现自己的作业还空着半页。
  _effects: flag +helped_sibling_with_homework; role; skill; relation kin with person:evt:world-vienna-1912:000286:child; skill_

- **1926.01** `r15-work.master-takes-on::ctx-vienna-reform-1930::milieu-tenement/signed-contract` tags: work, craft, apprentice, trade, poverty, reform, medical, schooling
  Anton Winter把学徒契约摊在桌上，指给Rosa看期限、工钱和出师考试。Rosa签了名，第二天站到刨床前，手指上多了第一道木刺。
  _effects: relation employer with person-materialized-world-vienna-1912-35; state_add apprenticeship-contract state:world-vienna-1912:257; relation acquaintance with person-materialized-world-vienna-1912-35; education apprenticeship_

- **1926.02** `r3-teen.police-caution::ctx-vienna-reform-1930::milieu-tenement::reform-parent-notice/fined` tags: police, caution, record, family, work, reform, medical, schooling
  Maria Berg说按条例罚三克朗，交不出就通知学校。Alois Lechner从内衣口袋里摸出叠好的钞票，一张张数，数到第三张时手停了。回家后，那三克朗被写在厨房的账单上，旁边画了一道红线。
  _effects: cash -3 (派出所里的第一次签字); mood -0.08; flag +fined_by_police; relation rival with person-alois-lechner; relation acquaintance with person-materialized-world-vienna-1912-53_

- **1926.02** `yf18-runaway.bundle::ctx-vienna-reform-1930::milieu-tenement/buy-the-ticket-tonight` tags: runaway, escape, family, plan, night_train, reform, medical, schooling
  Rosa趁Alois Lechner去上夜班，把储钱罐砸在窗台上。硬币滚进床缝，Rosa趴在地上摸到最后一枚，跑去南站买了一张最便宜的单程票；售票员问要不要往返，Rosa说不用，声音比自己想象中平静。
  _effects: state_add yf18-runaway-plan state:world-vienna-1912:195; cash -3 (the savings jar was broken for a ticket); flag +yf18_ticket_bought; mood 0.04000000000000001; flag +yf18_runaway_plan_active_

- **1926.02** `yf18-firstlook.atlas-margin::ctx-vienna-reform-1930::milieu-tenement/read-it-to-the-class` tags: first_love, school, atlas, note, secrecy, reform, medical, schooling
  Rosa以为那是谁开的玩笑，把地图册举起来念给全班听。Grete Stein问是谁写的；教室最后一排有人把书立起来挡住脸。放学后，Hedwig在楼梯口等Rosa，只说了一句“你念错了一个字”，就从他身边走过去。
  _effects: state_add yf18-first-awakening state:world-vienna-1912:196; reputation -0.020000000000000004; relation acquaintance with person-phase15-Hedwig-world-vienna-1912; mood -0.020000000000000004; flag +yf18_first_awakening_active_

- **1926.04** `r3-teen.first-friend-group::ctx-vienna-reform-1930::milieu-tenement/admitted` tags: friendship, roof, belonging, betrayal, class, reform, medical, schooling
  屋顶上的暗号是两声口哨。Rosa吹对了一声，第二声卡在喉咙里，Josef笑着替她补上。四个人分吃一袋偷来的栗子，壳扔到楼下，砸在Katharina Lechner的雨棚上。
  _effects: mood 0.08; flag +joined_roof_group; role_

- **1926.04** `vienna-youth-threshold.first-wage/quarrel-over-money` tags: adolescence, school, work, family, transition
  Rosa想把钱留着买件厚外套，Alois Lechner说屋顶漏水、煤还差两袋。话越说越硬，针线篮被碰翻在地上，扣子滚到炉脚。信封最后被撕成两半，一人一半，那顿饭谁也没添第二碗。
  _effects: relation kin with person-alois-lechner; cash 4 (争执后交给家里的一半工资); mood -0.06000000000000001_

- **1927.01** `state_reaction:yf18-runaway-plan/a-family-question` tags: yf18-runaway-plan, escape, youth, plan, home, travel, risk, state
  饭桌上又为房租吵起来。Rosa把面包掰成很小的块，听见父亲说“这个家养不起闲人”；Rosa没有回嘴，只在心里把格拉茨的地址又背了一遍。
  _effects: state_parameter yf18-runaway-plan.suspicion 15 -> 23; state_parameter yf18-runaway-plan.resolve 70 -> 68_
  _causes: evt:world-vienna-1912:003301_

- **1927.01** `yf18-firstlook.parish-dance::ctx-vienna-reform-1930::milieu-tenement/friend-cuts-in` tags: first_love, dance, church, courtship, jealousy, reform, medical, schooling
  Anton在第二支曲子前把Mitzi请走，说Rosa答应过要替她看管外套。Rosa抱着一件不属于自己的大衣站在圣像下面，看他们在蜡烛光里转圈；回家路上，Rosa把舞卡撕成小片，扔进多瑙运河。
  _effects: state_parameter yf18-first-awakening.intensity 40 -> 45; state_parameter yf18-first-awakening.nerve 10 -> 2; state_parameter yf18-first-awakening.talk 20 -> 25; relation friend with person-phase15-Anton-world-vienna-1912; relation friend with person-phase15-Mitzi-world-vienna-1912; mood -0.04000000000000001_

- **1927.01** `state_expire:apprenticeship-contract` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick, state:apprenticeship-contract
  Rosa的「学徒契约」到期；相关安排结束。
  _effects: state_remove apprenticeship-contract state:world-vienna-1912:149; role_

- **1927.01** `state_tick:yf18-runaway-plan/three-months-of-preparation/route-memorised` tags: yf18-runaway-plan, escape, youth, plan, home, travel, risk, state
  Rosa把去车站的路又走了一遍，记住了哪一段有煤气灯、哪一段住着巡夜的警察。回家后，Rosa在旧日历背面画了一条线，标出换乘的站名；那条线短得可笑，却比课本上的任何地图都清楚。
  _effects: state_parameter yf18-runaway-plan.preparation 35 -> 47; state_parameter yf18-runaway-plan.suspicion 23 -> 25; mood 0.010000000000000009_

- **1927.01** `state_tick:yf18-first-awakening/half-year-of-glances/answered-glance` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Rosa在教堂门口或学校走廊里又遇见Hedwig。这一次对方先点了头，Rosa准备好的整段话全忘了，只把手里的书换到另一只手上；回家后Rosa才发现，自己把书拿倒了。
  _effects: state_parameter yf18-first-awakening.intensity 45 -> 50; state_parameter yf18-first-awakening.nerve 2 -> 10; state_parameter yf18-first-awakening.reciprocated false -> true; relation friend with person-phase15-Hedwig-world-vienna-1912; mood 0.03_

- **1927.01** `state_tick:apprenticeship-contract/workshop-year/mistake` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Rosa废掉了一块料，师傅扣了工钱。晚饭时谁也没提这件事。
  _effects: state_parameter apprenticeship-contract.failures 0 -> 1; cash -1 (wasted material); mood -0.04000000000000001_

- **1927.01** `r13-fam.help-homework::ctx-vienna-reform-1930::milieu-tenement/sums-finished` tags: task, family, school, homework, sibling, literacy, reform, medical
  Rosa把煤油灯往桌子中间挪，让Friedrich Winter看清算术本上的格子。孩子把七加八数了三遍，Rosa没有直接说答案，只把豆子一颗颗排在桌上。最后一页写完时，灯芯已经烧黑，Rosa才发现自己的作业还空着半页。
  _effects: skill; relation kin with person:evt:world-vienna-1912:001622:child; skill_

- **1927.02** `yf18-apprentice.press-guard::ctx-vienna-reform-1930::milieu-tenement/refuse-the-machine` tags: apprenticeship, work, danger, machine, injury, refusal, reform, medical
  教堂年历的订单催得紧，Buchdruckerei Winter & Söhne把压印机的护板卸了，说这样进纸快一半。Rosa看着那块铁板，说手会进去；Buchdruckerei Winter & Söhne把工钱袋往桌上一扔，问Rosa是不是不想出师了。Rosa没有碰机器，那天下午的活由Anna Hofer 2接手。
  _effects: state_parameter apprenticeship-contract.progress 10 -> 5; state_parameter apprenticeship-contract.failures 1 -> 2; flag +yf18_refused_unguarded_press; mood 0.01999999999999999; relation acquaintance with person-materialized-world-vienna-1912-57; relation acquaintance with person-materialized-world-vienna-1912-2_

- **1927.12** `r13-turn.school-leaving::ctx-vienna-reform-1930::milieu-tenement::reform-leaving-age/signed-apprenticeship` tags: education, school, work, family, transition, reform, medical, schooling
  毕业钟敲过三下，Josef Lechner 2把成绩单按在讲台上，说Rosa还能再读一年，只要家里肯出四克朗。家里人在走廊里把学徒契约展开，纸角还带着面粉。Rosa签了名，第二天就站到刨床前，手指上多了第一道木刺。
  _effects: cash -2 (毕业钟响过以后); flag +left_school_for_apprenticeship; role; education apprenticeship; relation acquaintance with person-materialized-world-vienna-1912-11_

- **1928.01** `vienna-life-young-worker/joins-union` tags: adolescence, labour, union
  工会的人在厂门口拦住Rosa，说学徒工也该有工票和保险。Rosa每月交一克朗会费，把会员证塞进上衣内袋。
  _effects: role; cash -1 (union dues); relation acquaintance with person-alois-lechner_

- **1928.01** `state_expire:yf18-runaway-plan` tags: yf18-runaway-plan, escape, youth, plan, home, travel, risk, state
  Rosa的「床底下的包袱」到期；相关安排结束。
  _effects: state_remove yf18-runaway-plan state:world-vienna-1912:195; flag -yf18_runaway_plan_active_

- **1928.01** `state_expire:yf18-first-awakening` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Rosa的「第一次心动」到期；相关安排结束。
  _effects: state_remove yf18-first-awakening state:world-vienna-1912:196; flag -yf18_first_awakening_active_

- **1928.01** `state_transition:apprenticeship-contract/expelled` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick, failed-apprentice
  Rosa从「学徒契约」转入另一段处境：the master ended the contract
  _effects: state_transition apprenticeship-contract -> failed-apprentice; flag +failed_apprenticeship; mood -0.07999999999999999; role_

- **1928.01** `r13-edu.exam-eve::ctx-vienna-reform-1930::milieu-tenement/memorized-wrong-step` tags: education, exam, study, poverty, adolescence, reform, medical, schooling
  Rosa把老师讲的例题步骤全背下来，却没弄懂为什么移项。卷子发下来，第一道大题就卡住，Rosa在草稿纸上画满小人，交卷前只写出一个答案。回家后Rosa把那张卷子折成纸飞机，扔出窗外，又下楼捡了回来。纸飞机摔在煤堆上。
  _effects: mood -0.08000000000000002; skill; relation acquaintance with person-materialized-world-vienna-1912-38_

- **1928.03** `r15-work.master-takes-on::ctx-vienna-reform-1930::milieu-tenement/signed-contract` tags: work, craft, apprentice, trade, poverty, reform, medical, schooling
  Anna Hofer 2把学徒契约摊在桌上，指给Rosa看期限、工钱和出师考试。Rosa签了名，第二天站到刨床前，手指上多了第一道木刺。
  _effects: relation employer with person-materialized-world-vienna-1912-57; state_add apprenticeship-contract state:world-vienna-1912:360; education apprenticeship; role_

- **1928.06** `p10-edu-thresholds.technische-hochschule-entrance/drawing-fail` tags: adolescence, education, school, exam, apprenticeship, work, transition, technical_school
  制图室里全是铅笔划纸的声音，尺子压住纸边，他的手心把纸角压出了汗渍。收卷时他把错的地方又看了一遍，才把纸递出去。回家路上他把图纸卷成筒，握在手里不松。
  _effects: cash -3 (技术学院考试报名费); mood -0.14999999999999997; skill; flag +kept_failed_drawing_

- **1928.06** `r3-teen.first-rent::ctx-vienna-reform-1930::milieu-tenement::reform-rent-receipt/short` tags: housing, rent, arrears, eviction, independence, reform, medical, schooling
  Rosa把一半的钱推过去，说剩下的下周补。Helene Winter没有接，先问是不是厂里又短了工钱。Rosa点头。Helene Winter把收据写成两张，一张给现在，一张压在茶杯下面。
  _effects: cash -3 (第一张房租收据); condition; flag +short_first_rent; relation rival with person-helene-winter_

- **1928.08** `yf18-runaway.cousin-letter::ctx-vienna-reform-1930::milieu-tenement/answer-in-secret` tags: runaway, letter, cousin, work, plan, reform, medical, schooling
  格拉茨的表姐来信，说旅馆缺一个叠床单的女孩，管吃住，工钱少但能攒下。Rosa把信藏在算术本里，用铅笔在背面写回信；邮票是从Alois Lechner的抽屉里偷的，信封上不敢写自己的名字，只写了“内详”。
  _effects: state_add yf18-runaway-plan state:world-vienna-1912:359; cash -1 (a stolen stamp and writing paper); flag +yf18_cousin_reply; mood 0.030000000000000027; flag +yf18_runaway_plan_active_

- **1928.08** `state_reaction:yf18-runaway-plan/a-family-question` tags: yf18-runaway-plan, escape, youth, plan, home, travel, risk, state
  饭桌上又为房租吵起来。Rosa把面包掰成很小的块，听见父亲说“这个家养不起闲人”；Rosa没有回嘴，只在心里把格拉茨的地址又背了一遍。
  _effects: state_parameter yf18-runaway-plan.suspicion 5 -> 13; state_parameter yf18-runaway-plan.resolve 60 -> 58_
  _causes: evt:world-vienna-1912:004246_

- **1929.01** `state_tick:yf18-runaway-plan/three-months-of-preparation/route-memorised` tags: yf18-runaway-plan, escape, youth, plan, home, travel, risk, state
  Rosa把去车站的路又走了一遍，记住了哪一段有煤气灯、哪一段住着巡夜的警察。回家后，Rosa在旧日历背面画了一条线，标出换乘的站名；那条线短得可笑，却比课本上的任何地图都清楚。
  _effects: state_parameter yf18-runaway-plan.preparation 45 -> 57; state_parameter yf18-runaway-plan.suspicion 13 -> 15; mood 0.010000000000000009_

- **1929.01** `state_tick:apprenticeship-contract/workshop-year/learned` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Rosa又学会了一道工序。师傅没有夸，只把下一块料推到面前。
  _effects: state_parameter apprenticeship-contract.progress 10 -> 30; skill; mood 0.020000000000000018_

- **1929.01** `r13-edu.dropout-return::ctx-vienna-reform-1930::milieu-tenement/returned-to-school` tags: education, dropout, return, school, work, reform, medical, schooling
  Rosa退学半年后，在工厂门口看见以前的同学背着书包走过。Rosa回家翻出课本，书页已经发黄。第二天，Rosa去找Berta Kral 2，Berta Kral 2让Rosa先跟班旁听两周。Rosa坐在最后一排，把落下的笔记一页页补回来。两个月后，Rosa的座位从最后一排换到中间。
  _effects: flag +returned_to_school; education secondary; relation acquaintance with person-materialized-world-vienna-1912-68_

- **1929.08** `r2-leisure.football-match::ctx-vienna-reform-1930::milieu-tenement/missed-the-penalty` tags: leisure, football, sport, crowd, violence, reform, medical, schooling
  终场前两分钟，Gustav Berg指向点球点。Rosa把球放在泥里，往后退了七步。Lena在看台上喊别用力，可Rosa还是抽了一脚，球飞过横梁，落进土豆地。Berta Winter把帽子摔在地上，又捡起来，拍了拍泥。
  _effects: mood -0.15000000000000002; flag +missed_penalty_in_mud; skill; relation rival with person:evt:world-vienna-1912:000062:child; relation acquaintance with person-phase15-Lena-world-vienna-1912_

- **1930.01** `oj18-perfume.apprentice::ctx-vienna-reform-1930::milieu-tenement/nose-returns` tags: perfume, apprentice, smell, shop, craft, work, odd_job, reform
  Rosa感冒了三天，鼻子像塞了棉花。Buchdruckerei Winter & Söhne把十二只小瓶排在柜台上，让Rosa闭眼闻；前十一只都答错了，最后一只，Rosa说出“佛手柑和一点旧木头”。Buchdruckerei Winter & Söhne把那只瓶子推到一边，说“记住这个味道，它比你的名字值钱”。
  _effects: state_add oj18-odd-apprenticeship state:world-vienna-1912:406; skill; reputation 0.03; flag +perfume_apprentice; knowledge “第十二只瓶子是佛手柑和旧木头，师傅说这个味道比名字值钱。”; relation acquaintance with person-materialized-world-vienna-1912-70; role; flag +odd_job_apprentice_

- **1930.01** `state_expire:yf18-runaway-plan` tags: yf18-runaway-plan, escape, youth, plan, home, travel, risk, state
  Rosa的「床底下的包袱」到期；相关安排结束。
  _effects: state_remove yf18-runaway-plan state:world-vienna-1912:359; flag -yf18_runaway_plan_active_

- **1930.01** `state_tick:apprenticeship-contract/workshop-year/learned` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Rosa又学会了一道工序。师傅没有夸，只把下一块料推到面前。
  _effects: state_parameter apprenticeship-contract.progress 30 -> 50; skill; mood 0.020000000000000018_

- **1930.01** `p9-social-daily-culture.last-standing-ticket/p9-social-daily-culture.last-standing-ticket.buy-for-elder` tags: daily, culture, leisure, cafe, music, walk, task, task:culture
  前面的老人掏零钱时手抖得厉害，数了三遍也没凑够。Rosa替老人把四十赫勒递进窗口，老人连声道谢，硬塞回一枚十赫勒铜板。等Rosa自己买票时，窗口已经挂出“售罄”的牌子，只好站在剧院门廊下听里面隐约的乐声，脚底冰凉；这一趟净少三十赫勒，却让队伍里的人都记住了这份体面。
  _effects: cash -0.4 (替排队的老人垫付站票钱); cash 0.1 (老人硬塞回的铜板); reputation 0.04; mood -0.030000000000000027_

- **1930.02** `r2-law.rent-contract::ctx-vienna-reform-1930::milieu-tenement::r2-law.rent-contract-reform/landlord-evades-control` tags: law, rent, contract, housing, tenement, reform, medical, schooling
  Anton Winter把租金拆成“房租”和“家具使用费”两张收据，总数没降。Rosa去问Friedrich Hofer，Friedrich Hofer说家具费不归租金管制管。Anton Winter在走廊里说，要住就签，不住有人等着；Josef Bauer把自己的两张收据拿出来，数目一模一样。
  _effects: cash -9 (租约上的第十三条); condition; flag +paid_disguised_furniture_fee; relation rival with person-materialized-world-vienna-1912-35; knowledge “the landlord splits rent into rent and furniture fees”_

- **1930.02** `vienna-housing-move.rent-notice/rent-notice-demand-repair` tags: housing, home, rent, family, money
  楼道里正晾着几家洗过的衣服，Rosa和Katharina Lechner站在水滴下面说话，声音压得低。Katharina Lechner说这栋楼里的住户不是头一回被这样要钱，先凑个口信比一个人硬顶强。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-41; mood 0.030000000000000027; flag +rent_dispute_

- **1930.04** `vienna-history-schnitzler-theatre/speak-in-the-foyer` tags: history, culture, arthur_schnitzler, burgtheater, theatre
  Rosa 在门廊里拦住Arthur Schnitzler，说第二幕的医生讲得太像真的。Arthur Schnitzler 停了一下，回答说他当过医生，知道那种语气；然后礼貌地告辞，没有留下地址。Rosa 看着他走进雨里，才想起自己忘了问下一部戏什么时候上演。
  _effects: relation acquaintance with person-arthur-schnitzler; knowledge “Schnitzler 当过医生，他的剧作里医生和官员的说话方式来自医院与部委的经验，而不是单纯的舞台效果。”; cash -3 (theatre ticket); reputation 0.010000000000000002_

- **1930.05** `vienna-legacy-worklife.sick-fund/sick-fund.keep-quiet` tags: legacy, work, family, reform, ordinary_life, injury
  止咳药水是褐色的，瓶口塞着软木塞，摇一摇会起沫。Rosa看着工友把表折成小块，折了三折才塞进帽檐。墙上的规章还贴在那里，纸角被风掀起，没人去按。
  _effects: mood -0.050000000000000044; health -0.040000000000000036 (没有正规病假，只能靠药水撑着); relation colleague with person-phase15-Emil-world-vienna-1912_

- **1930.10** `bc18-ghost.death-certificate::ctx-vienna-reform-1930::milieu-tenement/collect-the-benefit` tags: bureaucracy, legal, death, identity, mistake, paperwork, absurd, reform
  邻居出主意说，死者家属可以领一笔丧葬补助。Rosa让Anna Hofer 2冒充远房表姐，自己在旁边按了手印；钱到手后，两人在厨房里分成三份，第三份留着买煤。第二个星期，Franz Huber寄来一封信，说抚恤金已经核准，请家属来拍一张遗像；Rosa把信压在盐罐下面，盐受潮结了块。
  _effects: cash 4 (冒领的丧葬补助分成); state_add bc18-bureaucratic-ghost state:world-vienna-1912:465; relation acquaintance with person-materialized-world-vienna-1912-57; condition; flag +collected_own_funeral_benefit; mood 0.010000000000000009; relation acquaintance with person-materialized-world-vienna-1912-55; flag +bureaucratic_ghost; mood -0.010000000000000009_

- **1930.10** `state_reaction:oj18-odd-apprenticeship/the-thing-in-the-basement` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  夜班结束前，Rosa听见地下室传来拖拽声。下去时，门开着，地上只有一道湿拖把的痕迹；第二天，所有人都说那间屋子锁了十年。
  _effects: state_parameter oj18-odd-apprenticeship.strangeKnowledge 15 -> 23; state_parameter oj18-odd-apprenticeship.trust 35 -> 32; mood -0.030000000000000027; knowledge “地下室那扇门后面有东西被搬动过，但巡查簿上没有记录。”_
  _causes: evt:world-vienna-1912:005281_

- **1931.01** `r15-work.journeyman-test::ctx-vienna-reform-1930::milieu-tenement/passed` tags: work, craft, apprentice, exam, journeyman, reform, medical, schooling
  Rosa把最后一块接榫敲进去，严丝合缝。Alois Moser没有夸，只把成品翻过来看了看底，然后在自己名字旁边写下Rosa的名字。
  _effects: reputation 0.06; flag +passed_journeyman_test; state_transition apprenticeship-contract -> journeyman; relation acquaintance with person-materialized-world-vienna-1912-18; role_
  _causes: evt:world-vienna-1912:002572_

- **1931.01** `state_tick:oj18-odd-apprenticeship/strange-year/trusted-with-the-keys` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  两年过去，Rosa已经能闭着眼说出哪块地板会响、哪盏煤气灯该在几点关。师傅把备用钥匙交下来，没有解释为什么第三把钥匙磨得最亮；Rosa也没有问，只在巡查簿最后一页画了一个小小的记号。
  _effects: state_parameter oj18-odd-apprenticeship.trust 32 -> 42; state_parameter oj18-odd-apprenticeship.strangeKnowledge 23 -> 33; state_parameter oj18-odd-apprenticeship.nightsWorked 0 -> 24; cash 2 (night-shift wages); skill_

- **1931.01** `state_tick:bc18-bureaucratic-ghost/paper-trail-year/another-window-opens` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  一个税务员把Rosa的死亡记录和一张新房租收据订在一起，寄到了另一个区。三个星期后，Rosa收到一封要求“已故纳税人”补缴暖气税的信；去问时，窗口说档案正在路上，让Rosa先等通知。通知没有来，房租却涨了。
  _effects: state_parameter bc18-bureaucratic-ghost.fileDepth 35 -> 42; state_parameter bc18-bureaucratic-ghost.risk 40 -> 50; cash -1 (跑窗口的车钱); flag +heating_tax_for_the_dead; mood -0.030000000000000027_

- **1931.01** `kernel-health.task-pharmacy-hunt::ctx-vienna-reform-1930::milieu-tenement/pharmacy-gives-up` tags: health, task, pharmacy, shortage, black_market, reform, medical, schooling
  Rosa在柜台前站了很久，最后把处方留在那里，说等有货再来。回家路上经过医院，看见药房窗口也挂着“无货”；第二天，处方被雨水泡烂在口袋里。Rosa把湿透的处方摊在炉边烤，字还是糊了。
  _effects: cash -1 (tram fare and a paper envelope for the prescription); condition; role; knowledge “医院药房也会挂“无货”；处方留在柜台，第二天下雨就泡烂了。”_

- **1931.04** `mb17-border.permit-window::ctx-vienna-reform-1930::milieu-tenement/turned-back` tags: migration, border, papers, permit, station, official, belonging, reform
  Grete Bauer把材料推回来，说出生纸缺了教区印章。Rosa解释自己是从乡下赶来的，对方只指了指墙上的告示；排在后头的Anna Moser 2递来半块面包，两个人坐在候车室里等下一班回去的车，谁也没有先说话。
  _effects: cash -2 (the return ticket and a wasted day); mood -0.06000000000000005; relation acquaintance with person-materialized-world-vienna-1912-58; flag +mb17_turned_back_at_border; knowledge “边境窗口只承认带教区印章的出生证明。”; relation acquaintance with person-materialized-world-vienna-1912-32; relation acquaintance with person-materialized-world-vienna-1912-58_

- **1931.11** `vienna-historical-social-movement.public-meeting/back-immediate-action` tags: history, historical_process, social_movement, organization, politics
  Rosa把帽子捏在手里上台，说救济表格要填三张、盖章两处，煤却今晚就见底。年轻人拍椅子背，Anna Hofer 2在门口皱着眉。主持人记下赞成与反对的人数，纸板上的字越写越小。
  _effects: reputation 0.05000000000000002; relation acquaintance with person-materialized-world-vienna-1912-57; mood 0.030000000000000027_

- **1932.01** `r15-work.first-commission::ctx-vienna-reform-1930::milieu-tenement/paid-in-full` tags: work, craft, journeyman, commerce, reputation, reform, medical, schooling
  Anton Kral来取货，把工钱一张张数在桌上。Rosa第一次没有经过师傅的手接过钱。晚上收工后，Rosa把工具箱擦了一遍，又把订单簿翻到新的一页。
  _effects: cash 4 (第一笔自己的订单); mood 0.05999999999999994; reputation 0.05; flag +first_independent_commission; relation acquaintance with person-materialized-world-vienna-1912-37_
  _causes: evt:world-vienna-1912:005021_

- **1932.01** `vienna-life-injury-recovery/clinic-treatment` tags: health, work, family
  Rosa在受伤后的第三天去了诊所。医生清洗伤口、换药，收下诊费，嘱咐不要急着回机器旁。Rosa把药方折好，回家路上买了纱布。
  _effects: health 0.05 (wound treatment); cash -8 (clinic and bandages); condition_
  _causes: evt:world-vienna-1912:005280_

- **1932.01** `vienna-life-work-injury/crushed-hand` tags: adulthood, labour, injury
  Rosa在换纸时左手被压板夹住。工友关掉机器，工头拿来急救箱，把伤手包起来送去医院；厂里先垫了十克朗医药费，事故报告写的是“操作不慎”。Rosa的左手从此握不紧拳，指尖总是凉的，天阴时骨缝里发疼。
  _effects: health -0.05 (crushed left hand); condition; cash 10 (employer medical advance)_

- **1932.01** `bc18-ghost.double-tax::ctx-vienna-reform-1930::milieu-tenement/pay-both` tags: bureaucracy, tax, identity, paperwork, legal, absurd, money, reform
  税吏先来收活人的税，三天后，另一个窗口又来收死人的遗产税。Rosa把两张税单并排放在桌上，发现名字、门牌和年份都分毫不差，只有税率不同。为了避免再被请去问话，Rosa把两份都交了；月底，家里的煤只够烧到复活节。
  _effects: cash -4 (活人和死人两份税单); state_parameter bc18-bureaucratic-ghost.risk 50 -> 55; mood -0.030000000000000027; condition; flag +paid_tax_twice_

- **1932.01** `state_reaction:bc18-bureaucratic-ghost/another-file-opened` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  Rosa刚在一个窗口证明自己活着，另一个窗口又从抽屉里抽出一张死亡通知。两个办事员隔着走廊互相看了一眼，谁也没有先开口；Rosa站在中间，忽然明白自己不是一个人，而是一份正在被转抄的卷宗。
  _effects: state_parameter bc18-bureaucratic-ghost.risk 55 -> 67; state_parameter bc18-bureaucratic-ghost.duplicates 2 -> 3; state_parameter bc18-bureaucratic-ghost.sightings 2 -> 3; flag +another_file_opened; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:005838_

- **1932.01** `state_tick:bc18-bureaucratic-ghost/paper-trail-year/another-window-opens` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  一个税务员把Rosa的死亡记录和一张新房租收据订在一起，寄到了另一个区。三个星期后，Rosa收到一封要求“已故纳税人”补缴暖气税的信；去问时，窗口说档案正在路上，让Rosa先等通知。通知没有来，房租却涨了。
  _effects: state_parameter bc18-bureaucratic-ghost.fileDepth 42 -> 49; state_parameter bc18-bureaucratic-ghost.risk 67 -> 77; cash -1 (跑窗口的车钱); mood -0.030000000000000027_

- **1932.01** `kernel-social.lending::ctx-klosterneuburg-rural-1912::milieu-tenement/lending.refused` tags: task, task:social, social, lending, debt, neighbor, money, everyday
  Rosa说自己也等钱交房租，把口袋翻给Grete Stein 2看。Grete Stein 2没有再求，转身去敲另一扇门；第二天，楼道里有人说Rosa见死不救，Rosa听见了，只把煤筐往门里挪了挪。那天夜里，两家都早早关了灯。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-48; role; reputation -0.03; flag +loan_refused; knowledge “邻居转身去敲了别人的门，楼道里开始议论这件事。”; relation acquaintance with person-materialized-world-vienna-1912-48_

- **1932.11** `vienna-parish-aid.rent-box/rent-box.refuse` tags: faith, parish, mutual_aid, poverty, family
  Rosa说这个月还能撑，房租差的那几克朗打算替人洗衣补上，请Alois Kral 2把篮子提回去给更困难的人家。Alois Kral 2在门口停了一会儿，把一小块肥皂留在窗台上，说不是救济，是教区多出来的。门关上后，屋里只剩煤箱底刮出的响声。
  _effects: mood -0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-60; flag +parish_refused_aid; relation acquaintance with person-materialized-world-vienna-1912-60_

- **1932.12** `vienna-housing-move.rent-notice/rent-notice-demand-repair` tags: housing, home, rent, family, money
  Rosa没有立刻答话，先去敲Friedrich Hofer的门。两人一起数落墙上的水渍和门框里灌进来的风，楼梯间的窗户修好了，自家墙皮还在剥落。Friedrich Hofer提议一起把话带给看门人：先修好漏水的墙角，涨租的事再谈。Rosa把纸重新折好，请他把话带到门外。
  _effects: relation acquaintance with person-friedrich-hofer; mood 0.030000000000000027_

- **1933.01** `vienna-life-depression/short-time` tags: adulthood, depression, work
  Rosa改成每周上三天班，工钱按日结算。家里的面包从每天一条变成隔天一条，Rosa开始把午饭省下来带回家。
  _effects: cash -3 (short-time work); condition_

- **1933.01** `oj18-radio.repair::ctx-vienna-reform-1930::milieu-tenement/cold-joint` tags: radio, repair, craft, customer, work, odd_job, suspense, reform
  Anton Kral的收音机只发出炒豆子一样的杂音。Rosa把后板拆开，发现一根接地线被老鼠咬断，焊点冷得像一颗坏牙。修好以后，Anton Kral留Rosa听完了整点新闻；出门时，Rosa在巷口还听见那台机器在响。
  _effects: organization_found 屋顶无线电修理铺 (household_firm); position 无线电修理匠 @radio:person-phase15-Rosa-world-vienna-1912-evt:world-vienna-1912:006403; state_add oj18-odd-apprenticeship state:world-vienna-1912:569; cash 2 (radio repair fee); skill; reputation 0.03; relation colleague with person-materialized-world-vienna-1912-37; flag +radio_repairer; knowledge “收音机的接地线被老鼠咬断，焊点冷得像一颗坏牙。”_

- **1933.01** `state_expire:oj18-odd-apprenticeship` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  Rosa的「奇职学徒」到期；相关安排结束。
  _effects: state_remove oj18-odd-apprenticeship state:world-vienna-1912:406; role; flag -odd_job_apprentice_

- **1933.01** `state_expire:bc18-bureaucratic-ghost` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  Rosa的「档案里的活鬼」到期；相关安排结束。
  _effects: state_remove bc18-bureaucratic-ghost state:world-vienna-1912:465; flag -bureaucratic_ghost_

- **1933.01** `agency:attend_meeting` tags: agency, agency:attend_meeting
  Rosa走到Arbeiter-Zeitung im Vorwärts-Haus门口，看见便衣和拥挤的人群，最终没有进去。
  _effects: mood -0.040000000000000036; reputation -0.010000000000000009_

- **1933.02** `ds17-courtship.parlour::ctx-vienna-authoritarian-1934::milieu-printshop/the-letter-in-the-piano-bench` tags: love, courtship, intimacy, secret, class, secret_intimacy, vienna, urban
  Rosa把写了三遍的信塞进琴凳，又在散场前取了回来。Alois Kral 2问是不是有话要说，Rosa说天气要变了；两个人隔着Hermann Bauer的毛线篮坐到钟响。回家后，Rosa把信烧了，灰倒进花盆，第二天那盆天竺葵就蔫了。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-60; cash -1 (the parlour fee and a pot of geraniums); mood -0.030000000000000027; flag +unsent_letter; relation acquaintance with person-materialized-world-vienna-1912-56_

- **1934.01** `wc17-commission.masterwork::ctx-vienna-authoritarian-1934::milieu-factory/masterpiece-accepted` tags: craft, commission, masterwork, workshop, reputation, patronage, vienna, urban
  主顾在契约上按了印，要求一把带黄铜镶边的胡桃木书柜。Rosa带着Luise Lechner做了四十天，刨花堆到窗台；交货那天，主顾把尾款数了两遍，又在工匠名册上添了Rosa的名字。
  _effects: organization_found 师傅作坊 (household_firm); position 师傅 @workshop:person-phase15-Rosa-world-vienna-1912-evt:world-vienna-1912:006980; state_add wc17-master-craftsperson state:world-vienna-1912:623; cash 4 (masterwork commission fee); skill; reputation 0.08000000000000002; relation acquaintance with person-materialized-world-vienna-1912-32; flag +masterwork_accepted; knowledge “主顾把尾款数了两遍，并把我的名字写进了工匠名册。”; role; flag +master_craftsperson_

- **1934.01** `state_tick:oj18-odd-apprenticeship/strange-year/blamed-for-the-noise` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  楼上住户投诉夜里有人拖椅子，管事的把巡查簿翻到Rosa的那一页，说签字太潦草，看不出巡过几趟。Rosa想辩解，却想起那晚确实在楼梯间多站了一刻钟；扣掉的工钱刚好够买一双不漏水的鞋。
  _effects: state_parameter oj18-odd-apprenticeship.trust 30 -> 14; state_parameter oj18-odd-apprenticeship.reliability 55 -> 45; mood -0.050000000000000044; flag +odd_job_scare_

- **1934.01** `p10-family-tasks.arrange-childcare/arrange-childcare.neighbor` tags: adulthood, family, social, marriage, care, inheritance, task, childcare
  邻居老太太的屋里有一股樟脑味，她把孩子放在膝上颠了颠，说先试一星期。Rosa每周付一克朗，早晨把孩子裹好送过去，晚上接回来时孩子手里攥着老太太给的干面包皮。
  _effects: cash -1 (每周付邻居老太太的照看费); relation acquaintance with person-materialized-world-vienna-1912-83; relation acquaintance with person-materialized-world-vienna-1912-83_

- **1934.02** `vienna-legacy-worklife.hours-ledger/hours-ledger.sign` tags: legacy, work, family, reform, ordinary_life
  老工人凑近看那张表，说这纸比工资袋还薄。Rosa把拇指蘸进印泥，按下去时听见工头说了句“下一个”。学徒在旁边数少掉的铜板，数到四十赫勒时不出声了。
  _effects: cash -1 (星期六下午减少的计件工钱); mood 0.050000000000000044; flag +accepted_hours_reform_

- **1934.04** `p9-history-union-political.split/split-leave-room` tags: politics, union, party, meeting, leaflet, police, strike, reform
  Rosa把会员证放在桌上，说今晚不想在被逼着选的名单上留名，起身出了门。街角的互助厨房还亮着灯，Gustav Weiss 2在那儿削土豆，Rosa洗了手坐下帮忙，一整晚没提会上的事。
  _effects: cash -0.2 (在互助厨房帮着买了几把盐); relation colleague with person-materialized-world-vienna-1912-91; relation acquaintance with person-materialized-world-vienna-1912-42_

- **1934.12** `bc18-enemy.accidental-help::ctx-vienna-authoritarian-1934::milieu-factory/warehouse-sinecure` tags: enemy, mistake, work, reputation, absurd, luck, social, vienna
  Gustav Weiss 2把Rosa的名字推荐给码头仓库，说那里正缺一个“能扛两百斤的人”。Rosa去了才知道，岗位是看管一只装满旧账本的暖房，工钱三克朗，主要工作是别让老鼠咬纸。Gustav Weiss 2听说后，在工会门口堵了三天，问这算哪门子惩罚。
  _effects: cash 3 (仓库暖房的看管工钱); role; relation rival with person-materialized-world-vienna-1912-91; flag +enemy_recommended_a_sinecure; mood 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-91_

- **1935.01** `lc19-workshop.mascot::ctx-vienna-authoritarian-1934::milieu-printshop/the-master-calls-it-a-joke` tags: workshop, apprentice, talisman, luck, reputation, absurd, comic, vienna
  屋顶无线电修理铺对主顾说，Rosa只是学徒，不是护身符。可他说这话时，手一直搭在Rosa的椅背上；主顾笑着点头，临走还是往Rosa手里塞了一枚铜币。Rosa把铜币压在磨刀石下，没花。
  _effects: state_add lc19-workshop-talisman state:world-vienna-1912:672; cash 1 (a copper coin from a customer); mood 0.010000000000000009; flag +lc19_lucky_chair_denied; relation acquaintance with person-materialized-world-vienna-1912-92; role; flag +lc19_workshop_talisman; knowledge “作坊里的人开始把我的在场当成生意的一部分；我还没有决定这算保护还是价钱。”_

- **1935.01** `state_tick:wc17-master-craftsperson/workshop-year/commissions-arrive` tags: wc17-master-craftsperson, craft, work, master, workshop, ownership, reputation, state
  Rosa的作坊又接了两单：一扇橡木门、一只修到一半的八音盒。Rosa把工钱先付给学徒，自己留下最后一张钞票，用铅笔在账本背面记下欠料行的数目。
  _effects: state_parameter wc17-master-craftsperson.backlog 3 -> 5; cash 2 (workshop commissions); reputation 0.01999999999999999_

- **1935.01** `agency:attend_meeting` tags: agency, agency:attend_meeting
  Rosa走到Arbeiter-Zeitung im Vorwärts-Haus门口，看见便衣和拥挤的人群，最终没有进去。
  _effects: mood -0.040000000000000036; reputation -0.010000000000000009_

- **1935.04** `bc18-inherit.parrot-condition::ctx-vienna-authoritarian-1934::milieu-factory/parrot-outlives` tags: inheritance, family, condition, absurd, death, legal, quiet, vienna
  姑妈的遗嘱只有一条：谁替她养那只灰鹦鹉满两年，谁就拿十二克朗。Rosa搬进阁楼，每天煮谷子、换水、用旧报纸垫笼底。鹦鹉学会了学门铃响，也学会了在Rosa咳嗽时叫“吃药”。两年后，公证人Friedrich Berg来验鸟，鹦鹉在他帽子上拉了一泡；Rosa拿到钱，先买了一只新笼子。
  _effects: cash 12 (养满两年鹦鹉得到的遗产); skill; relation kin with person-materialized-world-vienna-1912-38; condition; flag +kept_the_parrot; mood 0.030000000000000027_

- **1935.08** `vienna-courtship-courtyard.letter-answer/mother-opened-letter` tags: adulthood, courtship, partner, social, family
  回信没有到Rosa手里。Berta Weiss 2的母亲先拆了它，连信封上的邮戳一起摊在洗衣房的桌上，说有人写字来缠自家孩子。话传到院子里时已经添了油，Grete Stein隔着栏杆把原话学了一遍，说得很难听；Berta Weiss 2再见到Rosa时，眼睛先往母亲那边看。Rosa站在水桶边，知道这封信已经被拆成了两家的脸面。
  _effects: reputation -0.06; mood -0.07999999999999996; relation acquaintance with person-materialized-world-vienna-1912-90; relation acquaintance with person-materialized-world-vienna-1912-90_

- **1936.01** `office16-scandal.public-hearing::ctx-vienna-authoritarian-1934::milieu-printshop/the-scandal-helps` tags: office, scandal, media, reputation, politics, power, vienna, urban
  照片登出后，Rosa收到十七封邀请函，都是请去讲“如何面对舆论”。一个工商业协会送来一笔“研究资助”，请Rosa去讲一次闭门课；课酬刚好补上办公室这个月的缺口。
  _effects: reputation 0.05000000000000002; organization_funds; state_add office-under-siege state:world-vienna-1912:706; flag +scandal_turned_into_speaking_fee; knowledge “十七封邀请函里，有十二封问的是同一件事：能不能把丑闻讲成经验。”; mood 0.040000000000000036; flag +office_under_siege_

- **1936.01** `state_expire:oj18-odd-apprenticeship` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  Rosa的「奇职学徒」到期；相关安排结束。
  _effects: state_remove oj18-odd-apprenticeship state:world-vienna-1912:569_

- **1936.01** `state_tick:lc19-workshop-talisman/talisman-year/a-bad-week` tags: lc19-workshop-talisman, workshop, craft, luck, talisman, reputation, dependence, exploitation
  连着三单退货，Rosa被请到门口站了一个下午。雨停后，生意真的回来了；师傅把一只红包塞进Rosa手里，说“你看，还是你管用”。Rosa摸着红包，觉得那钱比工钱轻。
  _effects: state_parameter lc19-workshop-talisman.protection 10 -> 6; state_parameter lc19-workshop-talisman.reliance 25 -> 29; state_parameter lc19-workshop-talisman.dignity 60 -> 55; cash 1 (a red envelope after the bad week); mood -0.020000000000000018_

- **1936.01** `r13-civ.sick-leave::ctx-vienna-authoritarian-1934::milieu-printshop/leave-refused` tags: work, sick_leave, foreman, wages, health, vienna, urban, crisis
  Gustav Weiss 2把请假条推回来，说这个月已经有人请过病假，车间不能再少人。Rosa站在机器旁边咳到中午，皮带轮的声音盖住了胸口的风箱声。下班时，她的眼睛里全是机油熏出的红丝。
  _effects: mood -0.09999999999999998; flag +sick_leave_refused; relation rival with person-materialized-world-vienna-1912-91; relation acquaintance with person-materialized-world-vienna-1912-72_

- **1936.01** `initiative:found_process:taxi:person-anna-bauer-evt:world-vienna-1912:006736`
  第二区夜班出租合作社在Leopoldstädter Zinshaus, gemeinsamer Gang经过数年的招募、会议和互助，把分散的行动整理成公开纲领；这不是预先写好的历史，而是成员自己累积出来的运动。
  _effects: historical process 第二区夜班出租合作社的持续运动; historical development:initiative-taxi:person-anna-bauer-evt:world-vienna-1912:006736-1936 as organizer; historical development:initiative-taxi:person-anna-bauer-evt:world-vienna-1912:006736-1936 as organizer; knowledge “第二区夜班出租合作社的持续运动不是一次会议，而是我们这些年积累出来的持续组织。”; reputation 0.03999999999999998_

- **1936.01** `historical_phase`
  历史进程《第二区夜班出租合作社在Leopoldstädter Zinshaus, gemeinsamer Gang经过数年的招募、会议和互助，把分散的行动整理成公开纲领；》从 emerging 进入 mobilizing。
  _effects: knowledge “我亲历或知晓「第二区夜班出租合作社在Leopoldstädter Zinshaus, gemeinsamer Gang经”; knowledge “我亲历或知晓「第二区夜班出租合作社在Leopoldstädter Zinshaus, gemeinsamer Gang经”_
  _causes: evt:world-vienna-1912:008379_

- **1936.04** `p9-social-courtship-friendship.fasching-dance/dance-first-polka` tags: courtship, friendship, social, adulthood, reputation, leopoldstadt
  波尔卡重新响起时，Rosa走到靠墙的长凳前向Grete Lechner 2弯腰。姑母手里的扇子停了停，没说话。入场费和小费一共一克朗，Rosa把找零塞回内袋；一支舞跳完，Grete Lechner 2说了自己住在哪条街，Rosa把名字和门牌在心里念了两遍。
  _effects: cash -1 (付给乐队的小费与舞会入场费); relation acquaintance with person-materialized-world-vienna-1912-79; relation acquaintance with person-materialized-world-vienna-1912-79_

- **1936.12** `r3-ind.delivery-cart::ctx-vienna-authoritarian-1934::milieu-printshop/reached-the-door` tags: work, delivery, cart, winter, goods, vienna, urban, crisis
  Rosa提前给马蹄缠了麻布，绕开结冰的坡道，从后街把车赶到Hermann Bauer门口时，陶罐一个没碎。Hermann Bauer数完货，多给了一个铜板，说这条街上只有她肯在雪天送货。Rosa把钱揣好，又用毯子把剩下的货盖严。
  _effects: cash 3 (雪里的车轴); flag +delivered_in_the_snow; role; relation friend with person-materialized-world-vienna-1912-56; knowledge “the back street stays passable when the main slope ices over”_

- **1937.01** `office16-admin.quiet-ledger::ctx-vienna-authoritarian-1934::milieu-printshop/nothing-moved` tags: office, administration, budget, competence, quiet, power, vienna, urban
  账本看上去是平的：修屋顶的钱被挪去补煤款，煤款又被挪去付印刷费。Rosa在每一栏都签了字，知道明年还会这样。散会后，Berta Hofer 2把一张催修屋顶的纸条压在台灯下面。
  _effects: organization_funds; reputation -0.010000000000000009; mood -0.030000000000000027; flag +deferred_maintenance; knowledge “屋顶的修理费被挪去补煤款，煤款又被挪去付印刷费。”_

- **1937.01** `state_tick:wc17-master-craftsperson/workshop-year/winter-thin` tags: wc17-master-craftsperson, craft, work, master, workshop, ownership, reputation, state
  冬天来得早，煤价涨了，主顾却要压价。Rosa守着冷掉的胶锅，把最后一块好木料留给一单可能退掉的活；账本上的欠款又添了一行。
  _effects: state_parameter wc17-master-craftsperson.debt 2 -> 5; cash -1 (workshop winter costs); mood -0.030000000000000027_

- **1937.01** `state_expire:lc19-workshop-talisman` tags: lc19-workshop-talisman, workshop, craft, luck, talisman, reputation, dependence, exploitation
  Rosa的「作坊的吉祥物」到期；相关安排结束。
  _effects: state_remove lc19-workshop-talisman state:world-vienna-1912:672; role; flag -lc19_workshop_talisman_

- **1937.01** `state_expire:office-under-siege` tags: office-under-siege, office, scandal, pressure, politics, legal, risk, state
  Rosa的「职位受围」到期；相关安排结束。
  _effects: state_remove office-under-siege state:world-vienna-1912:706; flag -office_under_siege_

- **1937.01** `agency:support_process` tags: agency, agency:support_process
  Rosa想帮忙，但组织者不信任新来的人，只让其在外围等消息。
  _effects: mood -0.040000000000000036; reputation -0.010000000000000009_

- **1937.04** `p22-goat-heir::ctx-vienna-authoritarian-1934::milieu-tenement/goat-sold-at-auction` tags: inheritance, absurd, comic, goat, tenement, legal, rumor, public
  拍卖行把山羊牵上台，槌子落下时，它忽然挣脱绳子，在人群里撞翻了两个花盆。买主说这羊不吉利，只肯出半价；Rosa拿到的钱刚够付律师费，楼契被银行收走，天井里只剩一截被啃过的牵绳。买主把它牵走时，它回头看了一眼那栋楼。
  _effects: cash -3 (lawyers and auction fees ate the goat price); state_add debt-bondage state:world-vienna-1912:820; reputation -0.03; relation acquaintance with person-materialized-world-vienna-1912-52; flag +goat_sold; mood -0.029999999999999805; relation acquaintance with person-materialized-world-vienna-1912-52_

- **1937.06** `ld18-performance.tango::ctx-vienna-authoritarian-1934::milieu-printshop/the-curtain-stays-down` tags: performance, desire, dance, public, queer, nightlife, public_desire, vienna
  第二支曲子还没跳完，一个穿黑衣的男人走到台前，说这里不是那种地方。Franz Moser把幕拉上，乐队改奏华尔兹；Rosa和Rosa Moser在后台坐着，听见观众跺脚，谁也没有出去。
  _effects: relation friend with person-materialized-world-vienna-1912-78; flag +cancelled_tango_

- **1938.01** `vienna-life-anschluss-1938/resists` tags: politics, persecution, 1938
  Rosa在登记桌旁说了句“这里以前不是这样”。Josef Winter记下地址，当晚两个穿制服的人来敲门，把Rosa带到警局，第二天放回来时脸上有伤。
  _effects: condition; role; cash -5 (fine and lost work); relation acquaintance with person-materialized-world-vienna-1912-93_

- **1938.01** `office16-rival.removal-motion::ctx-vienna-authoritarian-1934::milieu-tenement/counter-motion` tags: office, rivalry, politics, removal, power, intrigue, vienna, urban
  Rosa没有等投票，而是让Katharina Huber把委员会过去三年的差旅账目复印了十份。会议开始前，Josef Winter的动议被一份“程序审查”取代；审查没有找到Rosa的问题，却找到了两次重复报销。
  _effects: reputation -0.03; relation rival with person-materialized-world-vienna-1912-93; flag +rival_audited; knowledge “委员会的差旅账目里有两次重复报销。”; mood 0.010000000000000009; relation acquaintance with person-materialized-world-vienna-1912-102_

- **1938.01** `state_tick:debt-bondage/interest/pay-interest` tags: debt-bondage, debt, work, poverty, legal, state, state_tick
  Rosa又付了一年的利息。本金几乎没动，债主的账本却翻到了新一页。
  _effects: cash -3 (debt interest); state_parameter debt-bondage.debt 18 -> 20_

- **1938.01** `agency:support_process` tags: agency, agency:support_process
  Rosa为第二区夜班出租合作社在Leopoldstädter Zinshaus, gemeinsam出了力：整理名单、传递消息或替同伴作证，名字被记进参与记录。
  _effects: historical development:initiative-taxi:person-anna-bauer-evt:world-vienna-1912:006736-1936 as supporter; historical_influence; reputation 0.015000000000000013_

- **1939.01** `statistical_death/violence` tags: death
  Rosa在Leopoldstädter Zinshaus, gemeinsamer Gang卷入一场冲突，头部和胸口受了重伤。旁人把人抬回家，夜里伤势恶化。Franz Lechner在场。
  _effects: death (暴力); role; flag -master_craftsperson_
## Emil

Born 1912.01, alive at 1957.
Education: apprenticeship 0; occupation: none; roles: infant, child, charity_scholar, workshop_dogsbody, factory_helper, partner, father, office:电梯员, job_seeker, charity_visitor, separated, registered_resident, shopkeeper, office:助理文书, machine_hand, liberated_1945, day_laborer, polite_estrangement, kept_the_wall, actor, office:联络员, kinsman_helper.

### State snapshot
- wish-love [person] (active) parameters={"intensity":0.55,"fixation":0.6,"irony":0.44999999999999996} links={} ticks=8
- p22-child-omen [person] (ended 1913.9: replaced_by:p22-child-omen) parameters={"strangeness":45,"attention":39,"protection":45,"fear":23} links={} ticks=1
- raising-child [household] (ended 1932.1: duration expired) parameters={"caregiverBurden":74,"schoolProgress":65,"childConfidence":0,"careDebt":0,"schoolEnrolled":true,"leftHome":false} links={"child":"Josef Lechner"} ticks=10
- p22-family-legend [person] (ended 1920.1: exit condition met) parameters={"warmth":53,"secrecy":80,"danger":34,"promise":55} links={} ticks=4
- p22-child-omen [person] (ended 1919.1: duration expired) parameters={"strangeness":43,"attention":38,"protection":52,"fear":28} links={} ticks=4
- raising-child [household] (ended 1932.1: duration expired) parameters={"caregiverBurden":100,"schoolProgress":16,"childConfidence":0,"careDebt":0,"schoolEnrolled":false,"leftHome":false} links={"child":"Luise Lechner"} ticks=10
- yf18-first-awakening [person] (ended 1926.1: duration expired) parameters={"intensity":60,"nerve":5,"talk":0,"reciprocated":false,"secret":true} links={"beloved":"Rosa"} ticks=1
- apprenticeship-contract [person] (ended 1929.1: the master ended the contract) parameters={"progress":20,"failures":2,"trade":"木工","paid":false} links={} ticks=4
- yf18-runaway-plan [person] (ended 1927.1: duration expired) parameters={"preparation":15,"suspicion":5,"resolve":55,"destination":"格拉茨","ticket":false} links={} ticks=1
- yf18-first-awakening [person] (ended 1928.1: duration expired) parameters={"intensity":43,"nerve":10,"talk":25,"reciprocated":false,"secret":true} links={"beloved":"Josef"} ticks=2
- ld18-impossible-attachment [person] (ended 1933.1: duration expired) parameters={"devotion":49,"improvisation":35,"pressure":38,"discretion":42,"grief":0,"named":"the page with the pencil mark"} links={"beloved":"Mitzi"} ticks=5
- raising-child [household] (ended 1949.1: duration expired) parameters={"caregiverBurden":76,"schoolProgress":31,"childConfidence":10,"careDebt":6,"schoolEnrolled":false,"leftHome":true} links={"child":"Ferdinand 2"} ticks=11
- yf18-first-awakening [person] (ended 1930.1: duration expired) parameters={"intensity":51,"nerve":18,"talk":23,"reciprocated":true,"secret":true} links={"beloved":"Mitzi"} ticks=2
- failed-apprentice [person] (ended 1939.1: duration expired) parameters={} links={} ticks=1
- p22-wild-fortune [person] (ended 1931.1: replaced_by:p22-wild-fortune) parameters={"height":60,"absurdity":65,"witnesses":70,"fragility":55} links={} ticks=0
- p22-scandal-engine [person] (ended 1931.1: replaced_by:p22-scandal-engine) parameters={"heat":45,"reach":60,"leverage":50,"shame":40} links={} ticks=0
- p22-wild-fortune [person] (ended 1934.1: duration expired) parameters={"height":64,"absurdity":74,"witnesses":71,"fragility":62} links={} ticks=2
- p22-scandal-engine [person] (ended 1932.1: replaced_by:p22-scandal-engine) parameters={"heat":45,"reach":60,"leverage":50,"shame":40} links={} ticks=0
- oj18-odd-apprenticeship [person] (ended 1934.1: duration expired) parameters={"trust":24,"strangeKnowledge":20,"reliability":50,"nightsWorked":24,"post":"电梯员"} links={} ticks=3
- raising-child [household] (ended 1955.1: duration expired) parameters={"caregiverBurden":89,"schoolProgress":83,"childConfidence":0,"careDebt":0,"schoolEnrolled":false,"leftHome":true} links={"child":"Elisabeth Lechner"} ticks=12
- p22-scandal-engine [person] (ended 1934.1: replaced_by:p22-scandal-engine) parameters={"heat":83,"reach":74,"leverage":33,"shame":69} links={} ticks=1
- public-scandal [person] (ended 1934.1: duration expired) parameters={} links={} ticks=1
- fm17-miracle-witness [person] (ended 1938.1: duration expired) parameters={"certainty":44,"attention":80,"obligation":15} links={} ticks=5
- p22-scandal-engine [person] (ended 1937.1: duration expired) parameters={"heat":69,"reach":67,"leverage":36,"shame":62} links={} ticks=2
- public-scandal [person] (ended 1936.1: duration expired) parameters={} links={} ticks=1
- raising-child [household] (active) parameters={"caregiverBurden":84,"schoolProgress":85,"childConfidence":0,"careDebt":0,"schoolEnrolled":false,"leftHome":true} links={"child":"Luise Bauer"} ticks=10
- strike-committee [organization] (ended 1939.1: duration expired) parameters={"demand":"恢复工钱并撤回黑名单","solidarity":0.6,"fund":6,"daysOut":0,"blacklistRisk":0.45,"settlementOffered":false} links={} ticks=1
- ml18-sudden-fortune [household] (ended 1942.1: duration expired) parameters={"principal":40,"spent":0,"claims":7,"public":true,"source":"墙里的铁盒"} links={} ticks=3
- bc18-bureaucratic-ghost [person] (ended 1946.1: duration expired) parameters={"fileDepth":33,"sightings":2,"risk":22,"duplicates":2,"officialStatus":"在户籍册上已死亡","alias":"一份注销的配给卡"} links={} ticks=3
- ml18-sudden-fortune [household] (ended 1949.1: duration expired) parameters={"principal":43,"spent":5,"claims":4,"public":true,"source":"押错的马"} links={} ticks=3
- bc18-bureaucratic-ghost [person] (ended 1950.1: duration expired) parameters={"fileDepth":36,"sightings":2,"risk":37,"duplicates":2,"officialStatus":"在户籍册上已死亡","alias":"一份注销的配给卡"} links={} ticks=3
- ml18-sudden-fortune [household] (ended 1950.2: replaced_by:ml18-sudden-fortune) parameters={"principal":10,"spent":0,"claims":5,"public":true,"source":"叔父的印刷所"} links={} ticks=1
- blacklisted [person] (ended 1955.1: duration expired) parameters={"reason":"strike settlement","severity":0.6} links={} ticks=1
- ml18-sudden-fortune [household] (ended 1952.1: duration expired) parameters={"principal":0,"spent":5,"claims":6,"public":true,"source":"转卖的金矿股份"} links={} ticks=2
- pc20-second-chance [person] (ended 1953.1: replaced_by:pc20-second-chance) parameters={"credibility":40,"debt":35,"hope":55,"suspicion":45} links={} ticks=0
- fa17-starving-artist [person] (active) parameters={"craft":49,"recognition":4,"need":52,"integrity":29} links={} ticks=3
- pc20-second-chance [person] (ended 1957.1: duration expired) parameters={"credibility":37,"debt":36,"hope":54,"suspicion":48} links={} ticks=4
- lc17-empty-nest [household] (active) parameters={"quiet":75,"reorientation":17,"roomKept":true} links={} ticks=3
- stage-sovereign [person] (ended 1955.1: duration expired) parameters={"production":"《铅皮王冠》","role":"被废黜的国王","publicBelief":12,"costumeQuality":65,"scandal":6,"performances":0} links={} ticks=2
- bc18-bureaucratic-ghost [person] (active) parameters={"fileDepth":67,"sightings":3,"risk":47,"duplicates":4,"officialStatus":"同时死亡与新生","alias":"少了一个字母的名字"} links={} ticks=3
- em18-family-archive [household] (active) parameters={"order":15,"secrets":55,"quarrel":25,"access":35} links={} ticks=0

### 267 subject events

- **1912.04** `p22-strange-doctor-prediction::ctx-vienna-1912::milieu-tenement/the-doctor-is-optimistic` tags: infancy, family, doctor, illness, omen, strange, dark, drama
  医生说孩子只是瘦，开了一瓶味道很坏的补药，说“过了春天就好了”。Josef Bauer把这句话记了很多年；每年春天，家里都要说一遍，像在核对一张旧账单，药瓶上还贴着手写的标签。
  _effects: mood 0.03; health 0.010000000000000009 (a tonic and a hopeful sentence); state_add p22-child-omen state:world-vienna-1912:10; flag +doctor_optimism_

- **1912.04** `vienna-infant-household.laundry-day/scalded-hand` tags: infancy, health, family, home, injury
  Josef Bauer提热水壶往木盆里兑水时壶底脱了焊，滚水溅在左手背上。她咬着牙把壶搁下，Emil被响声惊得大哭。手背起了水泡，接下来三天她只能用一只手洗尿布。
  _effects: health -0.07999999999999996 (左手被开水烫伤); mood -0.05_

- **1912.11** `vienna-life-birth-letter-from-the-dead/the-neighbour-takes-it` tags: infancy, family, secret, letter, drama
  Katharina Bauer把信从门缝里抽走，说这封信已经转过三家，不该再往这里送。Josef Bauer问上面写了什么；Katharina Bauer把信折成四折塞进自己口袋，说“都是旧账”。那天夜里，Josef Bauer在厨房坐到很晚。
  _effects: flag +neighbor_intercepted_letter; relation acquaintance with person-katharina-bauer; mood -0.019999999999999997_

- **1913.01** `vienna-life-infant-first-smile/smile-at-the-lamp` tags: infancy, family, first, warm
  Josef Bauer把Emil抱到窗边，煤汽灯罩上有一圈晃动的光。孩子盯着看了很久，忽然笑出声，口水滴在Josef Bauer的袖口上。屋里的人都停了一下，像是听见了什么了不起的消息。
  _effects: mood 0.04; health 0.010000000000000009 (a good day)_

- **1913.01** `state_tick:p22-child-omen/the-omen-returns/the-coincidence-repeats` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  又过了一年，同一件小事又发生了：钟停在同一个时刻，门口的狗对着空处叫。Emil正在学系鞋带，抬头问“又来了吗”；大人说没有，手却先去摸门框，谁也没有回答。
  _effects: state_parameter p22-child-omen.strangeness 40 -> 45; state_parameter p22-child-omen.attention 35 -> 39; state_parameter p22-child-omen.fear 20 -> 23; mood -0.01_

- **1913.05** `p22-strange-cradle-secret::ctx-vienna-1912::milieu-tenement/the-ticket-is-redeemed` tags: infancy, family, cradle, secret, inheritance, strange, dark, drama
  Josef Bauer拿着当票去赎，取回一把银勺子，勺柄上刻着一个看不清的字母。回家后把勺子塞进Emil手里，说“用吧”；孩子敲着桌沿，勺子发出很轻的响声，像在回答什么。
  _effects: cash -5 (redeeming the pawn ticket); state_add p22-family-legend state:world-vienna-1912:32; flag +spoon_returned_

- **1913.05** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Emil家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 60 -> 64; state_parameter p22-family-legend.warmth 55 -> 57; mood 0.01_
  _causes: evt:world-vienna-1912:000256_

- **1913.08** `vienna-life-toddler-wrong-cradle/the-swap-story-spreads` tags: infancy, family, rumour, identity, comic, drama
  三天后，整条楼道都在说这家的孩子“抱错了”。Josef Bauer抱着Emil去敲Emil Weiss的门，Emil Weiss不开，只在门里说“我也是听来的”。Emil在母亲怀里睡着了，口水把她的领口洇出一小片深色。
  _effects: flag +cradle_swap_rumour; relation rival with person-emil-weiss; mood -0.05_

- **1913.09** `p22-strange-doctor-prediction::ctx-vienna-1912::milieu-tenement/the-doctor-asks-for-the-cradle` tags: infancy, family, doctor, illness, omen, strange, dark, drama
  医生问孩子睡在哪里，看见摇篮紧挨着炉子，皱起眉头。他让Josef Bauer当晚就把摇篮挪到窗边；Emil换了位置，第一夜睡得比从前沉，窗边的风比炉边冷，孩子却睡得很沉。
  _effects: mood -0.01; state_add p22-child-omen state:world-vienna-1912:33; flag +cradle_moved_

- **1914.01** `vienna-life-toddler-first-words/first-word-nonsense` tags: infancy, family, first, comic
  Emil说了一长串谁也听不懂的话，最后用力点头，像是在宣布一件已经决定的事。Josef Bauer认真听完，也点了点头；孩子满意地爬走了，留下大人们互相看着，忍不住笑。
  _effects: mood 0.04; skill_

- **1914.01** `state_tick:p22-family-legend/the-story-changes-hands/a-detail-goes-missing` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，故事里最要紧的那件东西不见了：先是名字，后来是地点。Emil问起时，大人说“你记错了”；可柜子最底层那只空盒子，谁也没有扔，锁却换过了，钥匙也不见了。
  _effects: state_parameter p22-family-legend.secrecy 64 -> 68; state_parameter p22-family-legend.danger 25 -> 28; state_parameter p22-family-legend.warmth 57 -> 55; mood -0.01_

- **1914.01** `state_tick:p22-child-omen/the-omen-returns/the-coincidence-repeats` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  又过了一年，同一件小事又发生了：钟停在同一个时刻，门口的狗对着空处叫。Emil正在学系鞋带，抬头问“又来了吗”；大人说没有，手却先去摸门框，谁也没有回答。
  _effects: state_parameter p22-child-omen.strangeness 35 -> 40; state_parameter p22-child-omen.attention 30 -> 34; state_parameter p22-child-omen.fear 25 -> 28; mood -0.01_

- **1915.01** `vienna-life-child-family-legend/lost-relative` tags: childhood, family, secret, story
  Josef Bauer在收拾箱子时翻出一张没有署名的照片，说那是家里一个“去了很远地方”的人。Emil问还回不回来，Josef Bauer把照片翻过去，说先把名字记住，别在饭桌上问。
  _effects: knowledge “家里有一张没有署名的照片，照片上的人去了很远的地方。”; flag +family_legend_photo; mood -0.009999999999999998_

- **1915.02** `vienna-early-childhood.stairwell-fall/landlord-complaint` tags: childhood, family, home, street
  摔伤之后两天，房东女人在门厅拦住Josef Bauer，楼里的Emil Weiss正提着菜篮站在门边。房东女人说楼梯间不许孩子嬉闹，铁扶手磕坏要赔。Josef Bauer把裹着布条的Emil往身后一拉，回了句“灯都没有，谁看得见台阶”。房东女人把话记在房租本边上，说下回修灯的钱从房租里扣。
  _effects: mood -0.07; flag +stairs_accident_noted_

- **1915.02** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Emil家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 68 -> 72; state_parameter p22-family-legend.warmth 55 -> 57; mood 0.010000000000000002_
  _causes: evt:world-vienna-1912:000441_

- **1916.01** `vienna-life-child-first-friend/shared-toy` tags: childhood, friendship, family, comic
  Hedwig在楼道里滚一只铁环，Emil站在门口看。Hedwig把铁环推过来，说“你推一次，我推一次”。两个人从楼梯口推到院子里，铁环倒下的声音把午睡的大人吵醒了一排。
  _effects: relation friend with person-phase15-Hedwig-world-vienna-1912; skill; mood 0.05_

- **1916.01** `state_tick:p22-family-legend/the-story-changes-hands/a-detail-goes-missing` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，故事里最要紧的那件东西不见了：先是名字，后来是地点。Emil问起时，大人说“你记错了”；可柜子最底层那只空盒子，谁也没有扔，锁却换过了，钥匙也不见了。
  _effects: state_parameter p22-family-legend.secrecy 72 -> 76; state_parameter p22-family-legend.danger 28 -> 31; state_parameter p22-family-legend.warmth 57 -> 55; mood -0.010000000000000002_

- **1916.01** `state_tick:p22-child-omen/the-omen-returns/the-coincidence-repeats` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  又过了一年，同一件小事又发生了：钟停在同一个时刻，门口的狗对着空处叫。Emil正在学系鞋带，抬头问“又来了吗”；大人说没有，手却先去摸门框，谁也没有回答。
  _effects: state_parameter p22-child-omen.strangeness 40 -> 45; state_parameter p22-child-omen.attention 34 -> 38; state_parameter p22-child-omen.fear 28 -> 31; mood -0.01_

- **1917.02** `vienna-early-childhood.stairwell-fall/arm-bruise` tags: childhood, family, home, street, injury
  楼梯间的灯罩空着，第三级踏板比别处高。Emil一脚踩空，滚到平台，右小臂磕在铁扶手的弯头上。Josef Bauer听见哭声跑出来，把Emil抱回屋，用冷水毛巾敷那块青紫，再用旧布条缠了两圈。夜里Emil哭醒两次。
  _effects: health -0.040000000000000036 (从楼梯滚下，小臂挫伤); mood -0.05_

- **1917.04** `vienna-life-child-inherited-wish/the-child-wants-a-dog` tags: childhood, family, wish, grief, uncanny, drama
  Emil说那句话只是想要一只狗，而且要“会看门的、不咬人的、像外婆家那只一样”。Josef Bauer松了一口气，又有点失落；那天下午，两个人用旧毛线给一只并不存在的狗量了脖围。
  _effects: mood 0.04; skill_

- **1918.01** `state_tick:p22-family-legend/the-story-changes-hands/a-detail-goes-missing` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，故事里最要紧的那件东西不见了：先是名字，后来是地点。Emil问起时，大人说“你记错了”；可柜子最底层那只空盒子，谁也没有扔，锁却换过了，钥匙也不见了。
  _effects: state_parameter p22-family-legend.secrecy 76 -> 80; state_parameter p22-family-legend.danger 31 -> 34; state_parameter p22-family-legend.warmth 55 -> 53; mood -0.010000000000000002_

- **1918.01** `state_tick:p22-child-omen/the-omen-returns/nothing-happens` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  又过了一年，什么也没有发生。Emil照常吃饭、摔跤、把鞋穿反；那个说过预言的人搬走了。家里把红绳解下来，却没有扔，只收进针线盒最里面，红绳上落了一点灰。
  _effects: state_parameter p22-child-omen.strangeness 45 -> 43; state_parameter p22-child-omen.fear 31 -> 28; state_parameter p22-child-omen.protection 50 -> 52; mood 0.010000000000000002_

- **1918.01** `p9-gap-childhood-chores.market-line/line-half-flour` tags: childhood, household, chores, school, task, daily, market, food
  队伍从面包房门口拐进巷子，Emil把布袋夹在腋下，学着前面人的样子，用胳膊肘顶住后面人的篮子。窗口的伙计舀面粉时，Emil踮脚看着秤，直到半袋面倒进袋口。挤出人群时鞋跟被踩掉，Emil单脚跳了两步，在泥里摸回鞋，索性赤脚走回家。
  _effects: food; health -0.020000000000000018 (赤脚走石板路磨伤脚底); skill; relation acquaintance with person-materialized-world-vienna-1912-9_

- **1919.01** `state_expire:p22-child-omen` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  Emil的「孩子身上的兆头」到期；相关安排结束。
  _effects: state_remove p22-child-omen state:world-vienna-1912:33_

- **1919.01** `p9-gap-childhood-chores.laundry-help/laundry-dragged-docked-pay` tags: childhood, household, chores, school, task, daily, laundry, work
  床单太长，Emil拖着一角往绳子走，布边扫过煤渣，立刻黑了一道。Otto Winter弯腰看了看，脸沉下来，说这角得重洗，工钱扣一半。Emil接过一赫勒，蹲在盆边用清水搓那一道灰，搓到指节发红，水面上还浮着煤末。
  _effects: cash 0.01 (被扣后只剩一赫勒); mood -0.05; relation acquaintance with person-otto-winter_

- **1919.04** `vienna-childhood-street.hoop/hoop-mother-call` tags: childhood, street, social, home
  二楼窗口有人喊了一声，Emil抬头应着，脚却没动。铁环卡在Lena的鞋边，Lena说要再玩一圈。Emil把铁钩递过去，说明天借你。Lena这才挪开脚，用鞋尖把铁环拨到Emil面前。
  _effects: relation friend with person-phase15-Lena-world-vienna-1912; relation friend with person-phase15-Lena-world-vienna-1912; mood -0.02_

- **1919.12** `statistical_infection`
  Emil在Leopoldstädter Zinshaus, gemeinsamer Gang病倒了，肺炎让身体发热、虚弱，接下来的日子只能卧床。

- **1920.01** `state_exit:p22-family-legend` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  Emil不再处于「家族传说」；条件已经改变。
  _effects: state_remove p22-family-legend state:world-vienna-1912:32_

- **1920.01** `p9-gap-childhood-chores.market-line/line-half-flour` tags: childhood, household, chores, school, task, daily, market, food
  队伍从面包房门口拐进巷子，Emil把布袋夹在腋下，学着前面人的样子，用胳膊肘顶住后面人的篮子。窗口的伙计舀面粉时，Emil踮脚看着秤，直到半袋面倒进袋口。挤出人群时鞋跟被踩掉，Emil单脚跳了两步，在泥里摸回鞋，索性赤脚走回家。
  _effects: food; health -0.020000000000000018 (赤脚走石板路磨伤脚底); skill; relation acquaintance with person-materialized-world-vienna-1912-24_

- **1920.03** `statistical_illness_worsened`
  Emil的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1920.06** `statistical_recovery`
  Emil熬过了这场肺炎，能坐起来喝一点汤，但身体还很虚。

- **1921.01** `p9-gap-childhood-chores.laundry-help/laundry-bread-with-friend` tags: childhood, household, chores, school, task, daily, laundry, work
  Ferdinand Lechner 2家的孩子站在绳子另一头，Emil递夹子时故意慢半拍，两个人把床单拉得没有一道褶。收工后Ferdinand Lechner 2端出半包隔夜面包，掰开时掉了一桌屑。Emil把分到的那块用围裙兜住，回家路上闻着麦味，硬是没咬。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-24; skill; relation acquaintance with person-materialized-world-vienna-1912-11_

- **1922.01** `p9-gap-childhood-chores.market-line/line-half-flour` tags: childhood, household, chores, school, task, daily, market, food
  面粉袋压在胸口，越抱越沉。Emil前面的大婶一直往后靠，Emil就把膝盖顶住对方的篮子，硬留出半步。买到半袋面粉后，Emil的鞋跟留在人堆里，找回来时鞋面全是泥。回家路上布袋换了两次肩，赤脚踩过石板时脚底发麻。
  _effects: food; health -0.020000000000000018 (赤脚走石板路磨伤脚底); skill_

- **1922.01** `vienna-childhood-friends.hidden-book/book-confiscated` tags: childhood, social, school, street
  Emil把书压在算术本底下，只露出书脊。Katharina Lechner走过来，抽走算术本，书也跟着滑出来。折角那页画着一艘帆船。Katharina Lechner合上书，说放学后擦黑板，擦一星期；书被锁进讲台抽屉，没往校长室送。
  _effects: mood -0.05; relation acquaintance with person-materialized-world-vienna-1912-41; relation acquaintance with person-materialized-world-vienna-1912-41_

- **1922.05** `vienna-childhood-street.cigarette-card/card-stolen` tags: childhood, street, social, home
  巷口有人跑过来，肩膀撞在Emil的胳膊上。烟画卡脱手，被风卷到路中间。Emil追了两步，鞋底在湿石板上打滑，手掌先着地。Rosa从后面追上去，在拐角抓住那男孩的袖子，布条撕下来一截，人还是跑了。
  _effects: mood -0.08000000000000002; relation friend with person-phase15-Rosa-world-vienna-1912; condition_

- **1923.01** `p9-gap-childhood-chores.laundry-help/laundry-three-heller` tags: childhood, household, chores, school, task, daily, laundry, work
  “拽平，别留褶。”Hedwig Stein在绳子那头喊。Emil踮着脚把床单拉直，碱水把指缝泡得发白。收工时天已经黑了，Hedwig Stein数了三赫勒，又在围裙上擦干手才递过来。Emil把钱塞进袜筒，回家路上一直攥着，虎口的裂口沾了汗，火辣辣地疼。
  _effects: cash 0.03 (帮邻居晾床单挣的三赫勒); health -0.030000000000000027 (碱水泡手，虎口裂开); relation acquaintance with person-hedwig-stein_

- **1924.01** `state_tick:wish-love/love-pressure/press-on` tags: wish-love, wish, wish:love, love, family, intimacy, state, state_tick
  Emil又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.020000000000000004; flag +wish:love:pursuing_

- **1924.02** `p9-childhood-adolescence.church-club/club-one-visit-only` tags: adolescence, friendship, identity, work, school, secret, church
  Emil去了一个下午，看那些旧歌本里夹着褪色的圣像卡，工厂来的几个年轻人在最后一排用手指敲长凳打拍子。第二个星期天Emil没再去，在院子里帮母亲晾被单。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-36; mood 0.010000000000000009; skill; relation acquaintance with person-materialized-world-vienna-1912-36_

- **1924.02** `vienna-adolescence.brothers-torn-jacket/sew-it-yourself` tags: adolescence, school, work, family, social
  外套腋下裂了一道口子，里布翻出来。Emil把袖口套在桌角上撑开，穿针时试了三次才引上线。针脚一针长一针短，像蜈蚣。Josef Bauer端着汤进来，站在桌边看了一会儿，把碗往Emil那边推了推，自己只留了半碗。
  _effects: skill; food; relation kin with person-josef-bauer_

- **1924.08** `r2-faith.parish-school-fee::ctx-vienna-reform-1930::milieu-tenement/free-place-granted` tags: faith, school, charity, education, fees, reform, medical, schooling
  Hedwig Stein在学费簿上找到Emil的名字，用红笔在旁边写了“免”。Grete Stein说课本还得自己买，Hedwig Stein就从柜子里翻出一本旧算术，封面写着上一个学生的名字。Emil把书抱回家，Josef Bauer用报纸包了书皮，说念完这本再说。
  _effects: flag +received_free_parish_school_place; role; relation friend with person-grete-stein; knowledge “the parish keeps a red-ink list of fee exemptions”; education primary_

- **1924.12** `statistical_infection`
  Emil在Leopoldstädter Zinshaus, gemeinsamer Gang病倒了，肺炎让身体发热、虚弱，接下来的日子只能卧床。

- **1925.01** `p9-childhood-apprenticeship.cover-for-sibling/damp-linen-returned` tags: adolescence, work, apprenticeship, labour, training, family, task, task:family
  Emil解释说路上没下雨，是床单叠得太厚。客户不听，Helene Kral也没帮腔，只把湿床单抖开，让Emil自己晾。Emil把布角一寸寸翻过来，跟Helene Kral说以后会分开叠、不让潮气闷在里头。Helene Kral哼了一声，算是记下了。
  _effects: health -0.030000000000000027 (蹲久了膝盖发酸，又吹了晚风); mood -0.04000000000000001; skill; relation acquaintance with person-materialized-world-vienna-1912-19; relation acquaintance with person-materialized-world-vienna-1912-19_

- **1925.02** `yf18-firstlook.tram-glove::ctx-vienna-reform-1930::milieu-tenement/keep-it-in-the-satchel` tags: first_love, love, tram, glove, youth, courtship, reform, medical
  Emil把手套塞进书包最里层，回家后放在枕头下面。第二天上学，Emil每隔一会儿就摸一下书包带，像在确认一件不能给家里看见的东西；手套上还留着电车木座的气味。
  _effects: state_add yf18-first-awakening state:world-vienna-1912:143; flag +yf18_kept_glove; mood 0.020000000000000004; flag +yf18_first_awakening_active_

- **1925.02** `r15-work.master-takes-on::ctx-vienna-reform-1930::milieu-tenement/unpaid-trial` tags: work, craft, apprentice, trade, poverty, reform, medical, schooling
  Anton Winter先说试三个月，不给工钱，只管一顿午饭。家里同意了，因为多一张嘴比多一双手更难。Emil每天最早到，最晚走，三个月后师傅才把契约拿出来。
  _effects: food; mood -0.04000000000000001; state_add apprenticeship-contract state:world-vienna-1912:144; relation acquaintance with person-materialized-world-vienna-1912-35; education apprenticeship; role_

- **1925.02** `r1-fam.sibling-rivalry::ctx-vienna-reform-1930::milieu-tenement/rivalry.neither` tags: family, siblings, rivalry, apprenticeship, craft, reform, medical, schooling
  Josef Lechner 2看了看兄弟俩的手，说两个人的指节都不够硬，谁也不收。Josef Bauer求了半天，Josef Lechner 2答应让两人一起干杂活，管饭不给钱。Klara干了三天就走了，Emil留下来扫地、磨刀，磨到第六个月，Josef Lechner 2才让他碰第一块好木料。
  _effects: cash 1 (同一把刨子); flag +worked_up_from_dogsbody; role; skill; relation acquaintance with person-phase15-Klara-world-vienna-1912_

- **1925.03** `statistical_illness_worsened`
  Emil的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1925.06** `statistical_recovery`
  Emil熬过了这场肺炎，能坐起来喝一点汤，但身体还很虚。

- **1925.09** `r13-turn.exam-failure::ctx-vienna-reform-1930::milieu-tenement::reform-open-secondary/name-missing` tags: education, exam, failure, school, work, reform, medical, schooling
  补考那天，Emil在考场门口等到钟响，监考说名单上没有名字。Friedrich Weiss跑去教务处，回来时手里只有一张转学建议。Emil去了印刷厂当学徒，师傅说铅字比字母好认，至少不会骗人。
  _effects: condition; flag +left_school_after_exam_failure; relation colleague with person-materialized-world-vienna-1912-38; education apprenticeship; relation acquaintance with person-materialized-world-vienna-1912-38_

- **1926.01** `vienna-life-apprenticeship/factory-hand` tags: adolescence, work, apprenticeship, employment, injury
  Buchdruckerei Winter & Söhne把Emil分到装订间，每天站十个小时，工钱按件算。第一周结束，Emil的指关节肿了，工头说习惯就好。
  _effects: employment Buchbinderhilfe @ org-winter-print; health -0.040000000000000036 (standing all day); condition_

- **1926.01** `state_expire:yf18-first-awakening` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Emil的「第一次心动」到期；相关安排结束。
  _effects: state_remove yf18-first-awakening state:world-vienna-1912:143; flag -yf18_first_awakening_active_

- **1926.01** `state_tick:apprenticeship-contract/workshop-year/learned` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Emil又学会了一道工序。师傅没有夸，只把下一块料推到面前。
  _effects: state_parameter apprenticeship-contract.progress 8 -> 28; skill; mood 0.01999999999999999_

- **1926.01** `r13-civ.learn-instrument::ctx-vienna-reform-1930::milieu-tenement/weekly-lessons` tags: culture, music, instrument, learning, craft, reform, medical, schooling
  Josef Lechner 2把一把旧小提琴放在Emil肩上，说先别拉，先听空弦。Emil练到指尖发红，Josef Lechner 2用铅笔在谱上圈出三个音，让下周再来。学费按周付，四克朗一个月。
  _effects: cash -4 (借来的琴弓); flag +took_violin_lessons; skill; relation colleague with person-materialized-world-vienna-1912-11; knowledge “the teacher marks the three notes to practise each week”_

- **1926.02** `yf18-runaway.bundle::ctx-vienna-reform-1930::milieu-tenement/hide-the-bundle` tags: runaway, escape, family, plan, night_train, reform, medical, schooling
  Emil把两件衬衫、一双袜子和小时候的洗礼证明卷进一块旧桌布，塞到床底下。Josef Bauer在厨房里数硬币，数了三遍都没有抬头；Emil躺在黑暗里，听见夜车从远处经过，铁轨的声音一直传到枕头下面。
  _effects: state_add yf18-runaway-plan state:world-vienna-1912:189; flag +yf18_bundle_hidden; mood 0.01999999999999999; flag +yf18_runaway_plan_active_

- **1926.02** `r3-teen.police-caution::ctx-vienna-reform-1930::milieu-tenement::reform-parent-notice/fined` tags: police, caution, record, family, work, reform, medical, schooling
  Franz Huber说按条例罚三克朗，交不出就通知学校。Josef Bauer从内衣口袋里摸出叠好的钞票，一张张数，数到第三张时手停了。回家后，那三克朗被写在厨房的账单上，旁边画了一道红线。
  _effects: cash -3 (派出所里的第一次签字); mood -0.08000000000000002; flag +fined_by_police; relation rival with person-josef-bauer; relation acquaintance with person-materialized-world-vienna-1912-55; relation acquaintance with person-materialized-world-vienna-1912-39_

- **1926.02** `r14-edu.leaving-school::ctx-vienna-reform-1930::milieu-tenement/sent-to-factory` tags: education, school_dropout, child_labour, poverty, reform, medical, schooling, home
  Josef Bauer把Emil的书包从钉子上取下来，说厂里招装订工，明天就去。Friedrich Weiss傍晚来家里，站在门口劝了半个钟头，Josef Bauer只说灶上还坐着锅。第二天清早，Emil穿着改短的围裙出门，书包留在门后，里面还有半块橡皮。头一个月工钱三克朗。
  _effects: cash 3 (书包挂在门后的钉子上); flag +left_school_for_factory; role; education none_

- **1926.05** `vienna-adolescence.brothers-torn-jacket/sew-it-yourself` tags: adolescence, school, work, family, social
  外套腋下裂了一道口子，里布翻出来。Emil把袖口套在桌角上撑开，穿针时试了三次才引上线。针脚一针长一针短，像蜈蚣。Josef Bauer端着汤进来，站在桌边看了一会儿，把碗往Emil那边推了推，自己只留了半碗。
  _effects: skill; food; relation kin with person-josef-bauer_

- **1926.06** `yf18-firstlook.atlas-margin::ctx-vienna-reform-1930::milieu-tenement/read-it-to-the-class` tags: first_love, school, atlas, note, secrecy, reform, medical, schooling
  Emil以为那是谁开的玩笑，把地图册举起来念给全班听。Grete Stein问是谁写的；教室最后一排有人把书立起来挡住脸。放学后，Josef在楼梯口等Emil，只说了一句“你念错了一个字”，就从他身边走过去。
  _effects: state_add yf18-first-awakening state:world-vienna-1912:252; reputation -0.02; relation acquaintance with person-phase15-Josef-world-vienna-1912; mood -0.01999999999999999; flag +yf18_first_awakening_active_

- **1926.07** `vienna-apprentice-printshop.lung-cough/lung-cough.stopped` tags: work, apprentice, factory, social, injury
  Emil揣着止咳糖继续上工，排到下午手一抖，整行字歪进字夹。Buchdruckerei Winter & Söhne看见发青的嘴唇，让Emil去后院筛一星期的旧铅字——更脏，但不用赶时。
  _effects: health -0.06000000000000005 (带咳上工并筛旧铅字); skill; reputation 0.03_

- **1927.01** `state_tick:apprenticeship-contract/workshop-year/mistake` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Emil废掉了一块料，师傅扣了工钱。晚饭时谁也没提这件事。
  _effects: state_parameter apprenticeship-contract.failures 0 -> 1; cash -1 (wasted material); mood -0.03999999999999998_

- **1927.01** `state_expire:yf18-runaway-plan` tags: yf18-runaway-plan, escape, youth, plan, home, travel, risk, state
  Emil的「床底下的包袱」到期；相关安排结束。
  _effects: state_remove yf18-runaway-plan state:world-vienna-1912:189; flag -yf18_runaway_plan_active_

- **1927.01** `state_tick:yf18-first-awakening/half-year-of-glances/rehearsed-conversation` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Emil在厨房里对着镜子练了七遍开场白，第二天却在离Josef三步远的地方拐进面包店。Emil买了一袋并不需要的盐，回家路上把开场白又想了一遍；这一次，连标点都更熟练了。
  _effects: state_parameter yf18-first-awakening.intensity 40 -> 46; state_parameter yf18-first-awakening.talk 20 -> 23; mood 0.010000000000000009_

- **1927.01** `p9-childhood-youth-aspiration.join-a-club/joined-and-borrowed` tags: adolescence, education, aspiration, school, books, club, exam, task
  Emil跟着Marie Huber走进印刷厂后面的屋子，交了十赫勒会费，在借书簿上按了手印。他挑了一本讲蒸汽机的册子，封面烫金已经磨掉；管理员说下月十赫勒要按时交，书才能续借。
  _effects: cash -0.1 (工人青年会月费); skill; relation friend with person-marie-huber; flag +workers_youth_member; mood 0.04000000000000001_

- **1927.01** `state_reaction:yf18-first-awakening/exam-week-distraction` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  考试周里，Emil把课本摊在桌上，眼睛却一直看着窗外那条电车线。笔记的页边多了几个没有写完的名字，Emil用橡皮擦掉，纸面起了毛。
  _effects: state_parameter yf18-first-awakening.intensity 46 -> 43; state_parameter yf18-first-awakening.talk 23 -> 25_
  _causes: evt:world-vienna-1912:003523_

- **1927.02** `yf18-apprentice.press-guard::ctx-vienna-reform-1930::milieu-tenement/tie-the-sleeve-and-work` tags: apprenticeship, work, danger, machine, injury, refusal, reform, medical
  Emil把袖口卷到肘上，用麻绳扎紧，替Buchdruckerei Winter & Söhne把一叠纸送进压印机。前两百张很顺，第二百零一张时，纸角卡住，Emil伸手去拨，机器没有停；等Anna Hofer 2拉开Emil，食指的指甲已经翻了起来。
  _effects: health -0.07999999999999996 (a hand caught in an unguarded press); condition; state_parameter apprenticeship-contract.progress 28 -> 20; cash -2 (a doctor and a bandage); flag +yf18_press_injury; mood -0.04999999999999999; relation acquaintance with person-materialized-world-vienna-1912-57_

- **1927.12** `vienna-youth-threshold.night-class/give-up-for-overtime` tags: adolescence, school, work, family, transition, injury
  工头说这个月赶印一批账簿，晚上加班每小时多给二十赫勒。Emil站在教室门口听完课程表，转身回厂里搬纸。Josef Lechner 2追出来说座位可以保留两周，Emil点点头，手已经摸上了作坊的门把，夜里机器的声音把课本的事盖了过去。
  _effects: cash 1.6 (夜间加班多挣的工钱); skill; mood -0.04000000000000001; health -0.040000000000000036 (连续夜间加班)_

- **1928.01** `vienna-life-young-worker/hand-caught` tags: adolescence, labour, union, injury
  Emil在压纸时右手被滚轴卷进去，工头拉下电闸，血滴在铅字盘上。Buchdruckerei Winter & Söhne让人把Emil送到医院，医药费先由厂里垫付。
  _effects: health -0.17999999999999994 (hand caught in press); condition; cash -4 (hospital transport)_

- **1928.01** `state_reaction:wish-love/love-betrayal` tags: wish-love, wish, wish:love, love, family, intimacy, state, state_reaction
  Emil反复回想最后一次见面。对方说过的话被拆成很多小块，每一块都能扎人。
  _effects: mood -0.06_
  _causes: evt:world-vienna-1912:003766_

- **1928.01** `state_tick:apprenticeship-contract/workshop-year/mistake` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Emil废掉了一块料，师傅扣了工钱。晚饭时谁也没提这件事。
  _effects: state_parameter apprenticeship-contract.failures 1 -> 2; cash -1 (wasted material); mood -0.03999999999999998_

- **1928.01** `state_expire:yf18-first-awakening` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Emil的「第一次心动」到期；相关安排结束。
  _effects: state_remove yf18-first-awakening state:world-vienna-1912:252; flag -yf18_first_awakening_active_

- **1928.01** `state_tick:wish-love/love-pressure/press-on` tags: wish-love, wish, wish:love, love, family, intimacy, state, state_tick
  Emil又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.020000000000000018_

- **1928.01** `r13-civ.carry-message::ctx-vienna-reform-1930::milieu-tenement/searched-at-platform` tags: politics, courier, message, risk, underground, reform, medical, schooling
  站台口临时设了检查，站台上的巡警让乘客把包打开。Emil把课本抱在胸前，轮到时手心全是汗。巡警翻了两页，问为什么去那么远的区，Emil说去给姑妈送药。
  _effects: health -0.030000000000000027 (电车上的信封); flag +searched_while_carrying_message; relation rival with person-materialized-world-vienna-1912-53; knowledge “the platform check was looking for printed leaflets, not let”; relation acquaintance with person-materialized-world-vienna-1912-53_

- **1928.02** `ld18-letter.schoolbook::ctx-vienna-reform-1930::milieu-tenement/the-letter-changes-hands` tags: love, letter, school, secret, queer, courtship, secret_intimacy, reform
  Emil把写给Mitzi的信折成四折，夹在拉丁文课本第三百页。第二天，书还回来时，页边多了一行铅笔字：“星期四，图书馆关门前。”两个人在书架之间站得很近，谁都没有先提那封信。
  _effects: state_add ld18-impossible-attachment state:world-vienna-1912:301; relation friend with person-phase15-Mitzi-world-vienna-1912; mood 0.04999999999999999; flag +letter_in_the_schoolbook; flag +impossible_attachment_active_

- **1928.06** `vienna-adolescence.workshop-apprentice/apprenticeship-accepted` tags: adolescence, school, work, family, social
  作坊里全是松木味。Buchdruckerei Winter & Söhne把一块方木夹进台钳，让Emil推刨子。Emil推了十分钟，木花卷到脚背上，刨面总算平了。Buchdruckerei Winter & Söhne用拇指摸了摸，收下Emil，从钱盒里数出三克朗，说是头一周的饭钱。Josef Bauer在门口把围裙攥得很紧。
  _effects: cash 3 ({subject}学徒首周的膳食预付款); education apprenticeship; reputation 0.1; relation kin with person-josef-bauer_

- **1928.08** `yf18-firstlook.atlas-margin::ctx-vienna-reform-1930::milieu-tenement/read-it-to-the-class` tags: first_love, school, atlas, note, secrecy, reform, medical, schooling
  Emil以为那是谁开的玩笑，把地图册举起来念给全班听。Friedrich Weiss问是谁写的；教室最后一排有人把书立起来挡住脸。放学后，Mitzi在楼梯口等Emil，只说了一句“你念错了一个字”，就从他身边走过去。
  _effects: state_add yf18-first-awakening state:world-vienna-1912:356; reputation -0.020000000000000004; relation acquaintance with person-phase15-Mitzi-world-vienna-1912; mood -0.020000000000000018; flag +yf18_first_awakening_active_

- **1928.08** `yf18-firstlook.essay-exam::ctx-vienna-reform-1930::milieu-tenement/the-teacher-keeps-it` tags: first_love, exam, essay, school, humiliation, reform, medical, schooling
  德语作文题是《我的家乡》。Emil写了半页多瑙河，剩下半页写一个总在电车上看书的人。Friedrich Weiss没有打分，只在页边写“感情太多，论据太少”，把作文折好放进自己的公文包；放学后，Emil看见Anton在门口等，忽然不敢走过去。
  _effects: state_parameter yf18-first-awakening.intensity 40 -> 46; state_parameter yf18-first-awakening.talk 20 -> 23; skill; reputation -0.009999999999999995; mood 0.010000000000000009_

- **1928.11** `r13-turn.exam-failure::ctx-vienna-reform-1930::milieu-tenement::reform-open-secondary/retake-fee` tags: education, exam, failure, school, work, reform, medical, schooling
  成绩单上差两分。Josef Lechner 2说可以补考，但要先交一克朗卷子费，还得让Josef Bauer来签字。Josef Bauer在办公室门口把帽子捏变了形，说家里拿不出这份钱。Emil把错题抄到烟盒背面，第二天照样去上课，只是不再举手。
  _effects: cash -1 (落榜名单上的第三个名字); mood -0.15000000000000002; condition; flag +failed_entrance_exam; skill; relation guardian with person-josef-bauer_

- **1929.01** `state_transition:apprenticeship-contract/expelled` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick, failed-apprentice
  Emil从「学徒契约」转入另一段处境：the master ended the contract
  _effects: state_transition apprenticeship-contract -> failed-apprentice; flag +failed_apprenticeship; mood -0.07999999999999996; role_

- **1929.01** `state_tick:ld18-impossible-attachment/invented-anniversary/the-date-that-is-not-on-paper` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  Emil和伴侣把认识的那一天当作纪念日。没有登记，没有证人，只有一块从旧货摊买来的蛋糕和两杯兑了水的酒；Emil在日历上画了一个别人看不懂的记号，第二年又画在同一个格子里。
  _effects: state_parameter ld18-impossible-attachment.devotion 45 -> 49; state_parameter ld18-impossible-attachment.pressure 15 -> 12; mood 0.020000000000000018_

- **1929.01** `state_tick:yf18-first-awakening/half-year-of-glances/answered-glance` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Emil在教堂门口或学校走廊里又遇见Mitzi。这一次对方先点了头，Emil准备好的整段话全忘了，只把手里的书换到另一只手上；回家后Emil才发现，自己把书拿倒了。
  _effects: state_parameter yf18-first-awakening.intensity 46 -> 51; state_parameter yf18-first-awakening.nerve 10 -> 18; state_parameter yf18-first-awakening.reciprocated false -> true; relation friend with person-phase15-Mitzi-world-vienna-1912; mood 0.030000000000000027_

- **1929.01** `r13-civ.vaccination::ctx-vienna-reform-1930::milieu-tenement::r13-civ.vaccination-reform/reform-card-lost` tags: health, vaccination, school, parent, public_health, reform, medical, schooling
  Grete Lechner种完痘把卡片交给老师，老师随手夹进点名册里。放学时点名册被带去办公室，Emil空着手回家，Josef Bauer问有没有证明，他只能把袖子拉起来。
  _effects: health 0.040000000000000036 (种痘室门口的袖子); mood -0.030000000000000027; condition; flag +vaccination_card_misplaced; knowledge “the school keeps the vaccination card in the class register”; relation acquaintance with person-materialized-world-vienna-1912-62_

- **1930.01** `major-family.proposal-refused/proposal-refused.wait-for-the-brother` tags: family, courtship, refusal, major, lifecycle
  Rosa Lechner 2把话说得很慢：母亲还在，弟弟的学徒期还有三年。Emil点头，把准备好的结婚证词折起来放回口袋，那是借教堂的旧纸写的。两人在电车站分开，约好明年复活节再谈。Rosa Lechner 2上车前替母亲拢了拢披肩，没有回头看。
  _effects: relation friend with person-materialized-world-vienna-1912-12; flag +engagement_postponed; cash -1 (tram fare to the meeting); relation acquaintance with person-materialized-world-vienna-1912-12_

- **1930.01** `vienna-family-courtship/ask-to-share-a-home` tags: family, courtship, household, social, lifecycle
  Emil在Leopoldstädter Zinshaus, gemeinsamer Gang靠窗的桌边，把一只空咖啡杯转了半圈，说房租两人合付、桌子两人共用。Mitzi Bauer 2的手停在糖罐盖上，问了一句“要是过不下去呢”，没有当场答应，只说要想一想；杯里的咖啡凉了，话还悬在桌面上。
  _effects: interaction_

- **1930.01** `state_tick:ld18-impossible-attachment/invented-anniversary/a-form-with-an-empty-line` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  户籍窗口换了一张新表格，配偶一栏不能空着。Emil最后写了“同住人”，办事员抬头看了一眼，说这不作数。回家后，Emil把表格折成很小的一块，塞进针线盒；伴侣问今天顺不顺利，Emil说和平时一样。
  _effects: state_parameter ld18-impossible-attachment.pressure 12 -> 18; state_parameter ld18-impossible-attachment.discretion 55 -> 52; mood -0.020000000000000018_

- **1930.01** `state_expire:yf18-first-awakening` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Emil的「第一次心动」到期；相关安排结束。
  _effects: state_remove yf18-first-awakening state:world-vienna-1912:356; flag -yf18_first_awakening_active_

- **1930.01** `p10-migration-tasks.emigrate/emigrate-sell-and-sail` tags: adulthood, migration, housing, family, travel, task, emigration, passport
  旧货商把床架往秤上一放，报了个数。工具他留了一套最顺手的，用旧布裹了三层。领事馆的窗户开得很高，队伍里有人咳嗽，有人把文件摊在膝盖上又看一遍。
  _effects: cash -8 (补齐船票、护照手续费与体检单费用，已扣卖家具所得); mood 0.06; condition; knowledge “去美国的船票加手续费一共一百多克朗，统舱最便宜”; relation acquaintance with person-materialized-world-vienna-1912-2_

- **1930.02** `p9-gap-adult-ordinary-day.organ-grinder/organ-grinder.follow-monkey` tags: adulthood, daily, leisure, neighborhood, ordinary, music, street
  猴子走在她前面，红绳在项圈后面拖着一截。乐师在面包店台阶上坐下，从兜里掏出一块干硬的面包掰成两半，一半给了猴子。他说这条巷子里只有面包店老板娘肯让他靠墙歇脚。
  _effects: relation acquaintance with person-phase15-Rosa-world-vienna-1912; skill_

- **1930.02** `p22-forged-review::ctx-vienna-reform-1930::milieu-tenement/the-review-becomes-a-school` tags: forged_review, opera, fame, fraud, comic, media, art, scandal
  死去的评论家在最贵的报纸上给一部没人看过的歌剧写了四颗星。Emil把剪报贴在排练厅门口，第二天票房排到街角；Anton Winter问是谁写的，Emil说是一个死人，死人不会否认。三个月后，歌剧院把这部戏列进了秋季剧目。
  _effects: state_add p22-wild-fortune state:world-vienna-1912:404; state_add p22-scandal-engine state:world-vienna-1912:405; cash 5 (a share of the revived opera receipts); reputation 0.039999999999999994; relation acquaintance with person-materialized-world-vienna-1912-35; flag +forged_review_believed; mood 0.030000000000000027; flag +wild_fortune_active; flag +scandal_engine_active_

- **1930.10** `oj18-lift.stuck::ctx-vienna-reform-1930::milieu-tenement/hand-crank` tags: lift, building, work, night, passenger, odd_job, suspense, reform
  电梯停在四楼半，门缝里只看见一截电线。Emil让Anna Moser 2抓紧扶手，自己摇动手柄，一格一格把轿厢放下来。门开时，Anna Moser 2的白大褂后背全湿了；他塞给Emil两张钞票，说手术室里还有人等着。
  _effects: organization_found 环城大道写字楼管理处 (other); position 电梯员 @building:person-phase15-Emil-world-vienna-1912-evt:world-vienna-1912:005261; state_add oj18-odd-apprenticeship state:world-vienna-1912:462; cash 2 (the doctor's reward); reputation 0.03; relation acquaintance with person-materialized-world-vienna-1912-58; flag +lift_operator; knowledge “电梯停在四楼半时，手动柄要一格一格放，不能一次松到底。”; relation acquaintance with person-materialized-world-vienna-1912-58; role; flag +odd_job_apprentice_

- **1931.01** `interaction_response` tags: interaction, partnership, household
  Mitzi Bauer 2在几天后找到Emil，说可以试试。两人开始合付房租，也把各自欠的账摊在桌上。
  _effects: relation partner with person-materialized-world-vienna-1912-36; household; role; interaction_
  _causes: evt:world-vienna-1912:004716_

- **1931.01** `vienna-family-fatherhood/child-born-at-home` tags: family, childbirth, death, lifecycle, birth, injury, state, state:raising-child
  Mitzi Bauer 2在Leopoldstädter Zinshaus, gemeinsamer Gang生下一个孩子，取名Maria Bauer。Emil在厨房和走廊之间来回，接生的人让烧水、拿布、付六克朗；孩子天亮后睡着了，Emil从此在户籍表上多了“父亲”一栏，手背上还留着烫水壶的红印。
  _effects: birth female; health -0.03999999999999997 (childbirth); cash -6 (midwife fee); role; state_add raising-child state:world-vienna-1912:459_

- **1931.01** `p22-forged-review::ctx-vienna-reform-1930::milieu-tenement/the-review-becomes-a-school` tags: forged_review, opera, fame, fraud, comic, media, art, scandal
  死去的评论家在最贵的报纸上给一部没人看过的歌剧写了四颗星。Emil把剪报贴在排练厅门口，第二天票房排到街角；Maria Moser 2问是谁写的，Emil说是一个死人，死人不会否认。三个月后，歌剧院把这部戏列进了秋季剧目。
  _effects: state_add p22-wild-fortune state:world-vienna-1912:460; state_add p22-scandal-engine state:world-vienna-1912:461; cash 5 (a share of the revived opera receipts); reputation 0.04000000000000001; relation acquaintance with person-materialized-world-vienna-1912-72; mood 0.02999999999999997; relation acquaintance with person-materialized-world-vienna-1912-72; flag -wild_fortune_active; flag +wild_fortune_active; flag -scandal_engine_active; flag +scandal_engine_active_

- **1931.01** `state_reaction:ld18-impossible-attachment/a-question-at-the-office` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  办公室有人问Emil，为什么总有一个女人在楼下等她。Emil说那是表妹；对方笑了一下，说现在的表妹真体贴。下午，Emil把桌上的相框扣倒，又在没人时翻回来，用袖子擦了擦玻璃上的灰。
  _effects: state_parameter ld18-impossible-attachment.pressure 18 -> 26; state_parameter ld18-impossible-attachment.discretion 52 -> 48; reputation -0.01999999999999999_
  _causes: evt:world-vienna-1912:005259_

- **1931.01** `state_tick:ld18-impossible-attachment/invented-anniversary/a-form-with-an-empty-line` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  户籍窗口换了一张新表格，配偶一栏不能空着。Emil最后写了“同住人”，办事员抬头看了一眼，说这不作数。回家后，Emil把表格折成很小的一块，塞进针线盒；伴侣问今天顺不顺利，Emil说和平时一样。
  _effects: state_parameter ld18-impossible-attachment.pressure 26 -> 32; state_parameter ld18-impossible-attachment.discretion 48 -> 45; mood -0.020000000000000018_

- **1931.01** `state_tick:oj18-odd-apprenticeship/strange-year/trusted-with-the-keys` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  两年过去，Emil已经能闭着眼说出哪块地板会响、哪盏煤气灯该在几点关。师傅把备用钥匙交下来，没有解释为什么第三把钥匙磨得最亮；Emil也没有问，只在巡查簿最后一页画了一个小小的记号。
  _effects: state_parameter oj18-odd-apprenticeship.trust 30 -> 40; state_parameter oj18-odd-apprenticeship.strangeKnowledge 10 -> 20; state_parameter oj18-odd-apprenticeship.nightsWorked 0 -> 24; cash 2 (night-shift wages); skill_

- **1931.01** `r13-fam.negotiate-rent::ctx-vienna-reform-1930::milieu-tenement/rent-refused` tags: task, commerce, housing, rent, negotiation, reform, medical, schooling
  Helene Kral把收据本合上，说这条街上等着租的人排到了巷口。Emil把准备好的账目念到一半，Helene Kral已经转身去敲下一家的门。第二天，门缝里塞进来一张纸条，欠租的数目后面多了一个月。
  _effects: cash -8 (房东的收租日); condition; flag +rent_increase_refused; relation rival with person-materialized-world-vienna-1912-19_

- **1931.01** `initiative:found_process:building:person-josefine-hofer-evt:world-vienna-1912:004069`
  环城大道写字楼管理处在Leopoldstädter Zinshaus, gemeinsamer Gang经过数年的招募、会议和互助，把分散的行动整理成公开纲领；这不是预先写好的历史，而是成员自己累积出来的运动。
  _effects: historical process 环城大道写字楼管理处的持续运动; historical development:initiative-building:person-josefine-hofer-evt:world-vienna-1912:004069-1931 as organizer; historical development:initiative-building:person-josefine-hofer-evt:world-vienna-1912:004069-1931 as organizer; historical development:initiative-building:person-josefine-hofer-evt:world-vienna-1912:004069-1931 as organizer; knowledge “环城大道写字楼管理处的持续运动不是一次会议，而是我们这些年积累出来的持续组织。”; reputation 0.04000000000000001_

- **1931.01** `historical_phase`
  历史进程《环城大道写字楼管理处在Leopoldstädter Zinshaus, gemeinsamer Gang经过数年的招募、会议和互助，把分散的行动整理成公开纲领；》从 emerging 进入 mobilizing。
  _effects: knowledge “我亲历或知晓「环城大道写字楼管理处在Leopoldstädter Zinshaus, gemeinsamer Gang经”; knowledge “我亲历或知晓「环城大道写字楼管理处在Leopoldstädter Zinshaus, gemeinsamer Gang经”; knowledge “我亲历或知晓「环城大道写字楼管理处在Leopoldstädter Zinshaus, gemeinsamer Gang经”_
  _causes: evt:world-vienna-1912:005557_

- **1931.12** `vienna-adult-social.sunday-table/sunday-table.argument` tags: adulthood, social, work, family, partnership
  星期天中午，Emil和Mitzi Bauer 2在出租屋的厨房桌边分面包，话题从房租转到Emil母亲上个月的药钱。Mitzi Bauer 2把刀放下，说这个家不能总先填那边的窟窿。面包凉了，汤也没再热。
  _effects: relation partner with person-materialized-world-vienna-1912-36; mood -0.050000000000000044_

- **1932.01** `vienna-life-work-injury/dismissed-after-accident` tags: adulthood, labour, injury, unemployment
  Buchdruckerei Winter & Söhne在事故后第三天通知Emil不用再来了，说岗位不能一直空着。Emil拿着医院证明去工会，诊断书被工头压在抽屉里；治伤花去六克朗，Emil的手还没好，工作先没了，工牌交回去时手指还缠着纱布。
  _effects: unemployment (dismissed after accident); health -0.12 (injury and lost job); cash -6 (medical treatment)_

- **1932.01** `p22-forged-review::ctx-vienna-reform-1930::milieu-tenement/the-dead-critic-signs-again` tags: forged_review, opera, fame, fraud, comic, media, art, scandal
  第二篇署名同一个死人的剧评出现在另一家报纸上，笔迹却不一样。Ferdinand Kral 2请来笔迹专家，Emil Huber在咖啡馆里把两张剪报并排摊开；Emil发现自己的墨水在纸背留下同样的蓝点，而这一次，没有人再笑。他把两张纸叠在一起，蓝点重合得像一枚印章。
  _effects: state_add p22-scandal-engine state:world-vienna-1912:517; state_add public-scandal state:world-vienna-1912:518; reputation -0.04999999999999999; relation rival with person-materialized-world-vienna-1912-65; flag +forged_review_exposed; mood -0.040000000000000036; relation acquaintance with person-materialized-world-vienna-1912-80; relation acquaintance with person-materialized-world-vienna-1912-65; flag -scandal_engine_active; flag +scandal_engine_active_

- **1932.01** `state_reaction:p22-scandal-engine/a-new-scandal-feeds-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Emil的新故事登出来时，旧的那一页也被重新翻到桌面上。Emil发现两件事共用同一个证人，而那个证人上周还来借过盐。
  _effects: state_parameter p22-scandal-engine.heat 70 -> 76; state_parameter p22-scandal-engine.reach 65 -> 69; state_parameter p22-scandal-engine.shame 60 -> 63; state_parameter p22-scandal-engine.leverage 35 -> 37; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:005819_

- **1932.01** `state_tick:ld18-impossible-attachment/invented-anniversary/a-form-with-an-empty-line` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  户籍窗口换了一张新表格，配偶一栏不能空着。Emil最后写了“同住人”，办事员抬头看了一眼，说这不作数。回家后，Emil把表格折成很小的一块，塞进针线盒；伴侣问今天顺不顺利，Emil说和平时一样。
  _effects: state_parameter ld18-impossible-attachment.pressure 32 -> 38; state_parameter ld18-impossible-attachment.discretion 45 -> 42; mood -0.020000000000000018_

- **1932.01** `state_tick:p22-wild-fortune/the-story-gets-taller/the-crowd-remembers` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  一年过去，Emil的荒唐故事没有变小，反而多了一个愿意作证的人。债主没有立刻上门，亲戚也还愿意来吃饭；Emil把新添的银器擦了一遍，发现其中一只底下刻着别人的名字。
  _effects: state_parameter p22-wild-fortune.height 60 -> 64; state_parameter p22-wild-fortune.absurdity 65 -> 68; state_parameter p22-wild-fortune.witnesses 70 -> 75; state_parameter p22-wild-fortune.fragility 55 -> 57; mood 0.020000000000000018_

- **1932.01** `state_tick:wish-love/love-pressure/press-on` tags: wish-love, wish, wish:love, love, family, intimacy, state, state_tick
  Emil又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.020000000000000018_

- **1932.01** `p9-social-daily-culture.last-standing-ticket/p9-social-daily-culture.last-standing-ticket.got-ticket` tags: daily, culture, leisure, cafe, music, walk, task, task:culture
  Emil挤到窗口前，把一克朗硬币推进凹槽，换回一张印着座号的薄纸片。顶层站席的栏杆被前面的人汗湿，Emil侧身找了个能看见舞台边的位置，倚着烫手的铁栏看完两幕；散场时小腿发麻，嘴里还哼着刚听到的曲调，幕间也和邻座搭上了两句话。
  _effects: cash -1 (约瑟夫施塔特剧院顶层站票); mood 0.06000000000000005; skill; relation acquaintance with person-materialized-world-vienna-1912-71_

- **1932.02** `df18-dream.water-in-the-cellar::ctx-vienna-reform-1930::milieu-tenement/tell-the-landlord` tags: dream, omen, home, water, coincidence, eerie, everyday, reform
  Emil把梦告诉房东。房东笑了一声，说老房子下水慢，做梦都带水汽。第二天，房东带人来查，真在墙里找到一条裂缝，顺手把地窖的租金减了一克朗。Emil把省下的钱买了一盏新灯，放在楼梯口。
  _effects: cash 1 (房东减掉的一克朗地窖租金); reputation 0.01999999999999999; relation acquaintance with person-friedrich-hofer; knowledge “房东因为我的梦查了墙，减了地窖租金。”; flag +df18_landlord_fixed_crack; mood 0.020000000000000018_

- **1932.08** `state_reaction:public-scandal/gossip` tags: public-scandal, scandal, reputation, social, state, state_reaction, home, market
  Emil走进咖啡馆时，邻桌的声音低了一拍。没有人当面说什么，但每个人都知道该说什么。
  _effects: mood -0.030000000000000027; reputation -0.03_
  _causes: evt:world-vienna-1912:006258_

- **1932.12** `vienna-legacy-worklife.union-office/union-office.enroll-first` tags: legacy, work, family, reform, ordinary_life
  来问入会的是个瘦高的年轻人，帽檐捏在手里，说自己在第十六区的织布厂做了半年。Emil把名册翻到空白页，蘸水笔尖在“住址”那栏停了一下，等他报出街名。老成员在角落里把账本合上，声音很轻。
  _effects: cash 1 (新会员的入会费先记在桌上); relation acquaintance with person-materialized-world-vienna-1912-83; skill; relation acquaintance with person-materialized-world-vienna-1912-59; relation acquaintance with person-materialized-world-vienna-1912-83_

- **1932.12** `af17-humiliation.puppet-show::ctx-vienna-reform-1930::milieu-tenement/left-the-bazaar` tags: humiliation, public, scandal, theatre, charity, reputation, absurd, reform
  第三幕开始前，Emil从侧门走出市集，围巾遮到眼睛。外面正在下冻雨，马车夫要价一克朗，Emil没有还价。第二天，Helene Kral 2在报纸上写“被自己的影子追着跑的人”，文章不刻薄，却让Emil在公寓门口站了很久才进去。
  _effects: reputation -0.03; cash -1 (冻雨里的马车); relation acquaintance with person-materialized-world-vienna-1912-69; condition; flag +fled_the_puppet_show; mood -0.050000000000000044; relation acquaintance with person-materialized-world-vienna-1912-43; relation acquaintance with person-materialized-world-vienna-1912-69_

- **1932.12** `state_reaction:p22-wild-fortune/a-witness-laughs` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  Emil的荒唐运气成了酒馆里的笑话。有人学着Emil走路的样子，有人问下一次什么时候轮到自己；Emil笑着应付，回家后把窗帘拉得比平时早。
  _effects: state_parameter p22-wild-fortune.absurdity 68 -> 74; state_parameter p22-wild-fortune.witnesses 75 -> 71; state_parameter p22-wild-fortune.fragility 57 -> 62; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:006389_

- **1933.01** `major-work-first-employment/turned-away` tags: work, employment, unemployment, major
  Buchdruckerei Winter & Söhne的工头翻完工票，问Emil上一个东家是谁。Emil说厂子关了，工头又问有没有辞工证明；没有证明，名册就不能写。后面的人挤上来，Emil被推到台阶下面。中午的钟响了，Emil站在街对面，看新来的人把名字一个个写上去。
  _effects: cash -2 (carfare and waiting); reputation -0.03; flag +no_work_references; role; mood -0.07000000000000006; relation acquaintance with person-materialized-world-vienna-1912-62_

- **1933.01** `fm17-miracle.witness::ctx-vienna-reform-1930::milieu-tenement/a-light-on-the-grave` tags: faith, miracle, vision, public_scandal, witness, reputation, doubt, reform
  万灵节傍晚，Emil和Helene Lechner 2在墓园点蜡烛。一团淡蓝色的光在Emil母亲的墓碑上方停了几息，又慢慢散开。Helene Lechner 2先跪下，随后旁边几家人也跪了。没有人问Emil最近为什么被报纸写，但所有人看Emil的眼神都变了。
  _effects: state_add fm17-miracle-witness state:world-vienna-1912:568; reputation 0.04000000000000001; mood 0.020000000000000018; flag +fm17_light_seen; flag +fm17_miracle_witnessed; knowledge “我看见的那件事，到今天我仍说不出它是什么。”_

- **1933.01** `state_expire:ld18-impossible-attachment` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  Emil的「无法登记的伴侣」到期；相关安排结束。
  _effects: state_remove ld18-impossible-attachment state:world-vienna-1912:301; flag -impossible_attachment_active_

- **1933.01** `state_tick:oj18-odd-apprenticeship/strange-year/blamed-for-the-noise` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  楼上住户投诉夜里有人拖椅子，管事的把巡查簿翻到Emil的那一页，说签字太潦草，看不出巡过几趟。Emil想辩解，却想起那晚确实在楼梯间多站了一刻钟；扣掉的工钱刚好够买一双不漏水的鞋。
  _effects: state_parameter oj18-odd-apprenticeship.trust 40 -> 24; state_parameter oj18-odd-apprenticeship.reliability 60 -> 50; mood -0.050000000000000044; flag +odd_job_scare_

- **1933.01** `state_tick:p22-scandal-engine/the-rumor-learns-new-words/the-story-turns-on-its-keeper` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  一个曾经替Emil传话的人搬走了，带走了半条街的信任。第二天，信箱里多了一张没有署名的明信片，上面只写着“我还记得”；Emil把明信片翻过来，背面是空的。
  _effects: state_parameter p22-scandal-engine.heat 76 -> 83; state_parameter p22-scandal-engine.reach 69 -> 74; state_parameter p22-scandal-engine.leverage 37 -> 33; state_parameter p22-scandal-engine.shame 63 -> 69; mood -0.020000000000000018_

- **1933.01** `r13-civ.join-charity::ctx-vienna-reform-1930::milieu-tenement/accepted-as-visitor` tags: social, charity, membership, poverty, respectability, reform, medical, schooling
  Emil Weiss把登记簿摊在门房的小桌上，让Emil写下姓名和住址。Emil写完后，Emil Weiss在名字旁边画了一个小十字，说下周去给孤老送煤。本子上前面几行，墨迹已经褪成了褐色。
  _effects: cash -1 (慈善会登记簿上的空行); reputation 0.04000000000000001; flag +joined_charity_visiting_round; role; relation acquaintance with person-emil-weiss_

- **1933.05** `vienna-family-same-sex-male/leave-vienna` tags: family, intimacy, same_sex, persecution, lifecycle, partnership, migration
  姑母家的门开着，厨房里飘出汤味。Emil和Franz Huber把箱子放在同一间屋里，十二克朗的车票钱已经花光；姑母没有多问，只添了两只碗。
  _effects: relation partner with person-materialized-world-vienna-1912-55; move place-klosterneuburg-aunt-house; move place-klosterneuburg-aunt-house; cash -12 (train tickets and lodging（其中12克朗记入债务）)_

- **1934.01** `vienna-family-divorce/partner-moves-to-shared-housing` tags: family, marriage, divorce, housing, lifecycle, separation, household
  Mitzi Bauer 2把一只箱子和工票搬去合租房，带走一半锅碗。Emil留在Leopoldstädter Zinshaus, gemeinsamer Gang，把空出来的床租给一个学徒，用租金补房租；搬家花掉四克朗，Emil在户籍上成了分居的人，夜里听见隔壁床板响，总要愣一下。
  _effects: relation_end partner with person-materialized-world-vienna-1912-36; household; cash -4 (moving and separate goods（其中4克朗记入债务）); mood -0.06000000000000005; role_

- **1934.01** `vienna-family-courtship/ask-to-share-a-home` tags: family, courtship, household, social, lifecycle
  Emil在Leopoldstädter Zinshaus, gemeinsamer Gang靠窗的桌边，把一只空咖啡杯转了半圈，说房租两人合付、桌子两人共用。Anna Hofer 2的手停在糖罐盖上，问了一句“要是过不下去呢”，没有当场答应，只说要想一想；杯里的咖啡凉了，话还悬在桌面上。
  _effects: interaction_

- **1934.01** `p22-forged-review::ctx-vienna-authoritarian-1934::milieu-tenement/the-dead-critic-signs-again` tags: forged_review, opera, fame, fraud, comic, media, art, scandal
  第二篇署名同一个死人的剧评出现在另一家报纸上，笔迹却不一样。Franz Lechner请来笔迹专家，Grete Stein在咖啡馆里把两张剪报并排摊开；Emil发现自己的墨水在纸背留下同样的蓝点，而这一次，没有人再笑。他把两张纸叠在一起，蓝点重合得像一枚印章。
  _effects: state_add p22-scandal-engine state:world-vienna-1912:619; state_add public-scandal state:world-vienna-1912:620; reputation -0.05; relation rival with person-grete-stein; mood -0.040000000000000036; flag -scandal_engine_active; flag +scandal_engine_active_

- **1934.01** `state_reaction:fm17-miracle-witness/fm17-miracle-press` tags: fm17-miracle-witness, faith, miracle, vision, witness, religion, reputation, doubt
  晚报的插图版把Emil画在教堂门口，旁边是一团被画得很亮的光。Emil没有接受采访，但邻居已经把那份报纸压在柜台玻璃下面。
  _effects: state_parameter fm17-miracle-witness.attention 35 -> 45; state_parameter fm17-miracle-witness.obligation 10 -> 15; mood -0.030000000000000027_
  _causes: evt:world-vienna-1912:006960_

- **1934.01** `state_expire:p22-wild-fortune` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  Emil的「荒唐横财」到期；相关安排结束。
  _effects: state_remove p22-wild-fortune state:world-vienna-1912:460; flag -wild_fortune_active_

- **1934.01** `state_expire:oj18-odd-apprenticeship` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  Emil的「奇职学徒」到期；相关安排结束。
  _effects: state_remove oj18-odd-apprenticeship state:world-vienna-1912:462; role; flag -odd_job_apprentice_

- **1934.01** `state_expire:public-scandal` tags: public-scandal, scandal, reputation, social, state, state_tick, state:public-scandal
  Emil的「公开丑闻」到期；相关安排结束。
  _effects: state_remove public-scandal state:world-vienna-1912:518_

- **1934.01** `state_tick:fm17-miracle-witness/the-story-year/story-hardens` tags: fm17-miracle-witness, faith, miracle, vision, witness, religion, reputation, doubt
  故事传到第三个人嘴里时，已经多了“白光”“香气”和“死去的人叫了她的名字”。Emil想纠正，却发现每纠正一次，别人就多记一条；到最后，连她自己都开始怀疑当时站在哪里。
  _effects: state_parameter fm17-miracle-witness.attention 45 -> 55; state_parameter fm17-miracle-witness.certainty 55 -> 50; reputation -0.020000000000000004; mood -0.030000000000000027_

- **1934.01** `r13-work.practice-craft::ctx-klosterneuburg-rural-1912::milieu-tenement::rural-cart-shaft/repaired-the-shaft` tags: work, craft, practice, wood, skill, rural, agriculture, small_town
  Emil把榆木车辕翻过来，顺着裂纹凿到尽头，再嵌进一块同纹的补木。车夫在旁边抽完一袋烟，套上马试了一圈，回来时说比新的还稳。Maria Weiss收下工钱，分给Emil两个克朗，说这手艺在村里够吃一辈子。
  _effects: cash 3 (第四十个榫头); flag +work13_repaired_a_cart_shaft; skill; relation colleague with person-materialized-world-vienna-1912-59_

- **1934.07** `p9-history-medical-daily.clinic-queue/give-place-to-mother` tags: health, medical, public_health, family, pharmacy, sanitation, daily, injury
  Grete Stein 2怀里的孩子脸烧得通红，Emil往后退了半步，把用粉笔写的号码塞进Grete Stein 2手里。药房伙计收了六十赫勒，给一瓶褐色药水；回家路上Emil一阵阵发冷。
  _effects: cash -0.6 (街角药房买退烧药（其中0.6克朗记入债务）); health -0.04999999999999999 (延误就诊，发热加重); relation acquaintance with person-materialized-world-vienna-1912-48; relation acquaintance with person-materialized-world-vienna-1912-48_

- **1934.10** `ad20-neighbor-dispute::ctx-klosterneuburg-rural-1912::milieu-tenement/the-landlord-hears` tags: neighbor, dispute, home, everyday, public, obligation, rural, agriculture
  Hermann Moser 2听见争吵，第二天就来了，说这栋楼最近“不太平”，房租要加。Emil问这跟晾衣绳有什么关系；Hermann Moser 2说“跟名声有关系”。Emil Weiss在门后听着，没有出来帮腔。
  _effects: cash -2 (rent raised after the quarrel（其中2克朗记入债务）); flag +rent_raised_after_quarrel; relation acquaintance with person-emil-weiss; mood -0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-42_

- **1934.12** `p9-social-family-conflict-care.sibling-medicine-bill/refuse-push-bill` tags: family, care, siblings, inheritance, housing, money
  Emil把药费单从糖罐底下抽出来，对折，推回桌子中央，说上个月的工钱已经贴过煤钱，这回一个赫勒也拿不出。Klara的脸沉下来，练习本翻得哗哗响，最后把单子重新压回糖罐底下，起身去够门后的外套。三只咖啡杯里的渣子凉在桌上，兄妹这一回把话都说薄了。
  _effects: relation kin with person-phase15-Klara-world-vienna-1912; mood -0.040000000000000036_

- **1935.01** `interaction_response` tags: interaction
  Anna Hofer 2没有答应，只说现在不合适。Emil把这件事收回去，之后见面仍点头。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-57; interaction_
  _causes: evt:world-vienna-1912:006959_

- **1935.01** `vienna-life-injury-recovery/clinic-treatment` tags: health, work, family
  Emil在受伤后的第三天去了诊所。医生清洗伤口、换药，收下诊费，嘱咐不要急着回机器旁。Emil把药方折好，回家路上买了纱布。
  _effects: health 0.04999999999999999 (wound treatment); cash -8 (clinic and bandages（其中8克朗记入债务）); condition_
  _causes: evt:world-vienna-1912:005818_

- **1935.01** `p21-duel-at-dawn::ctx-klosterneuburg-rural-1912::milieu-tenement/the-pistol-lowers` tags: duel, honor, violence, public, scandal, rival, politics, high_drama
  天边刚泛白，城北采石场的碎石堆还挂着夜里的水汽。Alois Moser数到七，Emil把枪口压低了一寸，Emil Weiss也把枪放下。两个人隔着湿石头站了一会儿，最后是Emil Weiss先伸出手；Alois Moser把两把决斗手枪都收进木盒，像收起一套不用的餐具。
  _effects: relation rival with person-emil-weiss; reputation 0.03; flag +duel_ended_without_blood; knowledge “采石场的雾里，双方都把枪口压低了一寸。”; cash -1 (the doctor came anyway（其中1克朗记入债务）); mood 0.010000000000000009; relation acquaintance with person-materialized-world-vienna-1912-18_

- **1935.01** `state_reaction:p22-scandal-engine/a-public-apology-cools-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Emil在报纸上登了道歉，流言却没有立刻停。第二天，有人在门口放了一束花，也有人把花拿走了；Emil把空花瓶留在窗台上，没有扔。
  _effects: state_parameter p22-scandal-engine.heat 70 -> 62; state_parameter p22-scandal-engine.reach 65 -> 62; state_parameter p22-scandal-engine.shame 60 -> 56; state_parameter p22-scandal-engine.leverage 35 -> 40; mood 0.010000000000000009_
  _causes: evt:world-vienna-1912:007542_

- **1935.01** `state_tick:fm17-miracle-witness/the-story-year/told-kindly` tags: fm17-miracle-witness, faith, miracle, vision, witness, religion, reputation, doubt
  Emil又把那件事讲了一遍，这次没有添油加醋。听的人问：“你确定不是灯影？”Emil说确定，也不确定。对方点点头，没有追问；这反而让Emil松了一口气。
  _effects: state_parameter fm17-miracle-witness.attention 55 -> 60; state_parameter fm17-miracle-witness.certainty 50 -> 54; reputation 0.010000000000000009; mood 0.010000000000000009_

- **1935.01** `state_tick:p22-scandal-engine/the-rumor-learns-new-words/the-story-turns-on-its-keeper` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  一个曾经替Emil传话的人搬走了，带走了半条街的信任。第二天，信箱里多了一张没有署名的明信片，上面只写着“我还记得”；Emil把明信片翻过来，背面是空的。
  _effects: state_parameter p22-scandal-engine.heat 62 -> 69; state_parameter p22-scandal-engine.reach 62 -> 67; state_parameter p22-scandal-engine.leverage 40 -> 36; state_parameter p22-scandal-engine.shame 56 -> 62; mood -0.020000000000000018_

- **1935.01** `kernel-health.task-house-call::ctx-klosterneuburg-rural-1912::milieu-tenement/house-call-doctor-late` tags: health, task, house_call, care, poverty, rural, agriculture, small_town
  医生到的时候天已经黑了。他摸了摸额头，说准备后事，收了出诊费就走；Mitzi Bauer 2不肯走，用湿布擦了一夜。天亮时Emil退了烧，枕头湿了一大片。邻居把账单压在钟底下，继续擦身，直到天亮。
  _effects: cash -8 (house call fee paid even though the doctor gave no treatment（其中8克朗记入债务）); health 0.020000000000000018 (fever broke after a night of cold compresses); condition; relation acquaintance with person-materialized-world-vienna-1912-36; knowledge “医生说“准备后事”以后，邻居用湿布擦了一夜，烧自己退了。”_

- **1935.03** `vienna-medical-treatment.night-fever/sweat-it-out` tags: health, medical, family, money
  Emil说胡话时念着车间的排班表，Grete Stein 2一句句应着，拿小勺往嘴里送温水。床头那半瓶退烧药早见了底，她没舍得倒最后一滴，留着天亮再说。
  _effects: relation friend with person-materialized-world-vienna-1912-48_

- **1935.10** `p9-social-tenement-neighbors.flour-loan/flour-loan.two-slices-of-bread` tags: housing, neighbors, tenement, daily, money, reputation
  Emil说自家也快见底了，不能再借面粉，临关门前往Emil Weiss手里塞了两块面包，说先给孩子垫一垫。Emil Weiss攥着面包站了一会儿，说了声谢谢就走了，楼梯上传来脚步和纸袋的磨蹭声。
  _effects: mood -0.009999999999999565_

- **1935.11** `vienna-market-household.market-credit/market-credit.default` tags: home, market, food, social
  欠账拖了半个月。玛丽亚在菜摊前看见Emil路过，直接喊住要钱。Emil拿不出，玛丽亚把已经称好的土豆倒回筐里。Mitzi Bauer 2提着篮子站在两步外，什么也没说。
  _effects: reputation -0.15; relation acquaintance with person-materialized-world-vienna-1912-36_

- **1936.01** `state_tick:fm17-miracle-witness/the-story-year/story-hardens` tags: fm17-miracle-witness, faith, miracle, vision, witness, religion, reputation, doubt
  故事传到第三个人嘴里时，已经多了“白光”“香气”和“死去的人叫了她的名字”。Emil想纠正，却发现每纠正一次，别人就多记一条；到最后，连她自己都开始怀疑当时站在哪里。
  _effects: state_parameter fm17-miracle-witness.attention 60 -> 70; state_parameter fm17-miracle-witness.certainty 54 -> 49; reputation -0.02_

- **1936.01** `state_expire:public-scandal` tags: public-scandal, scandal, reputation, social, state, state_tick, state:public-scandal
  Emil的「公开丑闻」到期；相关安排结束。
  _effects: state_remove public-scandal state:world-vienna-1912:620_

- **1936.01** `state_tick:wish-love/love-pressure/press-on` tags: wish-love, wish, wish:love, love, family, intimacy, state, state_tick
  Emil又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.020000000000000018_

- **1936.01** `p10-family-tasks.find-missing-kin/find-missing-kin.missing-list` tags: adulthood, family, social, marriage, care, inheritance, task, missing_kin
  失踪名册的纸很薄，办事员用钢笔一戳就洇开。Emil把编号条收进证夹，出门时有个女人问她是不是也找人。两人结伴去收容所，门房说名单上没这个人。回家路上女人说下星期还去，Emil点头。
  _effects: mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-55; flag +brother_missing_registered_

- **1936.01** `vienna-market-debt.rent-arrears/rent-negotiate-installments` tags: market, debt, money, home, shop
  你没去借钱，直接下楼找房东，说月底前先付两克朗，剩下两克朗分两个星期补齐。房东叼着雪茄，拿铅笔在你的纸条背面写了个日期，说再拖一天就换锁。邻居在楼道口听见了，冲你摇了摇头，但没说什么。
  _effects: cash -2 (按分期付掉的第一笔欠租（其中2克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-55; flag +rent_installment_plan_

- **1936.03** `vienna-housing-move.moving-day/moving-day-handcart` tags: housing, home, rent, family, money
  手推车每走十几步就要停一下，楼道里的门半开着，有人探头看热闹。Emil把照片铁盒交给Grete Stein 2抱着，自己低头把最后一箱锅具拖上楼。天擦黑时，新屋里才勉强归置出下脚的地方。
  _effects: cash -1 (借手推车买烟熨谢邻居的小开销（其中1克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-48_

- **1937.01** `state_tick:fm17-miracle-witness/the-story-year/story-hardens` tags: fm17-miracle-witness, faith, miracle, vision, witness, religion, reputation, doubt
  故事传到第三个人嘴里时，已经多了“白光”“香气”和“死去的人叫了她的名字”。Emil想纠正，却发现每纠正一次，别人就多记一条；到最后，连她自己都开始怀疑当时站在哪里。
  _effects: state_parameter fm17-miracle-witness.attention 70 -> 80; state_parameter fm17-miracle-witness.certainty 49 -> 44; reputation -0.02_

- **1937.01** `state_expire:p22-scandal-engine` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Emil的「流言发动机」到期；相关安排结束。
  _effects: state_remove p22-scandal-engine state:world-vienna-1912:619; flag -scandal_engine_active_

- **1937.01** `p9-work-jobsearch.ask-trial/ask-trial.deposit-refused` tags: work, job_search, negotiation, wages, employment, task, trial, factory
  “十克朗押金，先交后干。”Rosa Lechner 2说得很平。Emil把两只口袋翻给人家看，柜台上只落下一张皱车票。工头收回话头，他也不再问，提着帽子走出栅栏。
  _effects: flag +seeking_work; reputation -0.010000000000000002_

- **1937.04** `vienna-church-community.saint-vincent-box/box-request-granted` tags: faith, social, family, home
  Emil在圣文生会门口登记，领到一张面包券和一小袋土豆。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-18; mood 0.030000000000000027_

- **1937.06** `vienna-medical-treatment.night-fever/hospital-night` tags: health, medical, family, money
  护士把冰袋按在Emil额上，水顺着鬓角流进衣领。Ferdinand Lechner 2坐在床脚，数着窗外渐渐亮起的铺面门板，说回去给炉子添块煤。隔壁床的老头整夜在喊一个女人的名字。
  _effects: cash -2 (医院急诊押金); health 0.08 (急诊观察和冰敷退烧)_

- **1937.11** `vienna-housing-move.sublet-room/sublet-full` tags: housing, home, rent, family, money, household
  Emil把床上的旧褥子重新铺平，Anna Bauer放下自己的铺盖卷，从怀里掏出一把钥匙看了看。厨房里多了一口人的碗，灶边的煤省着烧也够。Alois Kral 2在门口看了一眼，没多话。
  _effects: cash 4 (出租空床收进的月租); household; relation acquaintance with person-materialized-world-vienna-1912-60; relation acquaintance with person-materialized-world-vienna-1912-60_

- **1938.01** `vienna-life-anschluss-1938/complies` tags: politics, persecution, 1938
  Josef Winter在街口设了登记桌，要求住户交出姓名、职业和宗教。Emil排队填了表，回家把门牌擦干净。楼里有人连夜搬走，也有人站在阳台上挥手。
  _effects: role; cash -3 (new permits and stamps（其中3克朗记入债务）); condition; relation acquaintance with person-materialized-world-vienna-1912-93_

- **1938.01** `state_expire:fm17-miracle-witness` tags: fm17-miracle-witness, faith, miracle, vision, witness, religion, reputation, doubt
  Emil的「见过无法解释之事的人」到期；相关安排结束。
  _effects: state_remove fm17-miracle-witness state:world-vienna-1912:568_

- **1938.01** `task-vienna-family-care.reconcile-siblings/cupboard-again` tags: family, care, courtship, siblings, inheritance, housing, task, task:family
  Emil刚提一句“那年分东西”，Berta Winter就把勺子放下，说柜子是他先看中的，凭什么让。话越说越硬，汤还剩半碗，Berta Winter起身拿了帽子，椅子在石地上刮出一声。Emil一个人坐到教堂的钟敲完，把两份饭钱都付了。
  _effects: relation kin with person:evt:world-vienna-1912:000062:child; cash -0.4 (付了两份饭钱); mood -0.030000000000000027_

- **1938.08** `vienna-housing-move.rent-notice/rent-notice-pay` tags: housing, home, rent, family, money
  Emil把通知念给Alois Moser听，Alois Moser摇头说是楼梯间那几块新玻璃的账。Emil去楼下杂货铺换开一张五克朗的纸币，回屋一枚一枚摆开数，煤箱底多留了二十赫勒。
  _effects: cash -2 (按月多付两克朗房租（其中2克朗记入债务）)_

- **1938.08** `p9-social-tenement-neighbors.stove-and-line/stove-and-line.move-to-line-end` tags: housing, neighbors, tenement, daily, money, reputation
  Emil把自己泡着的衣服端到绳子最末一段，把靠近炉子的位置让给Anton，条件是对方看着火，别让水烧干。Anton点头，往炉膛里添了一块煤，说中午以前一定把炉子空出来。两家的盆就挨着放在窗下。
  _effects: relation acquaintance with person-phase15-Anton-world-vienna-1912; mood 0.030000000000000027_

- **1939.01** `state_expire:failed-apprentice` tags: failed-apprentice, craft, work, failure, stigma, state, state_tick, state:failed-apprentice
  Emil的「学徒契约终止」到期；相关安排结束。
  _effects: state_remove failed-apprentice state:world-vienna-1912:366_

- **1939.01** `p9-work-career.clerk-post/p9-work-career.clerk-post.nodeposit` tags: work, career, craft, clerk, education, task, office, application
  Emil考得不错，Josef Winter把分数记在名册上，说位置可以给他，但保证金十五克朗要先交，还得有铺保。他手头只有十克朗出头，保人一时也找不到。椅子给了下一位，那人进门时袖口已经熨得笔直。Emil把答卷折好带走，纸边被汗浸软了。
  _effects: cash -1 (往返内城的车钱与考试杂费); mood -0.030000000000000027; reputation -0.009999999999999995_

- **1939.08** `vienna-parish-aid.funeral-society/funeral-society.defer` tags: faith, parish, mutual_aid, poverty, family
  Emil把抽屉拉开又推上，铜币在木板上滚了半圈。Rosa Moser合上本子说，拖欠的人不少，可规矩就是规矩。她走下两级台阶又回头提醒，发工钱那天她会在教堂侧门等着。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-78; relation acquaintance with person-materialized-world-vienna-1912-78_

- **1940.01** `p9-history-public-action.organize-relief/backyard-stove` tags: politics, union, party, activism, public_action, relief, leaflet, task
  工会后院的墙根还堆着旧木牌，Emil 把炉子支在避风处，Emil Hofer 蹲着吹火，烟从墙头翻出去。二十只碗排在地上，汤盛到第七碗时锅底已经刮得响。
  _effects: cash -3 (买柴火和盐); food; relation acquaintance with person-materialized-world-vienna-1912-107; relation acquaintance with person-materialized-world-vienna-1912-107_

- **1940.04** `vienna-medical-treatment.sanatorium/home-rest` tags: health, medical, family, money
  安娜的汤锅外面包着旧毛巾，端进来时还烫手。Emil靠着枕头喝，喝一半咳一半。房东太太在走廊里故意大声说，肺病可不是闹着玩的，安娜探出头去，说医生讲了不传染。
  _effects: health 0.03 (在家休养但条件有限); food; cash -0.5 (房东要求的清洁费); relation friend with person-materialized-world-vienna-1912-10; relation acquaintance with person-materialized-world-vienna-1912-10_

- **1940.08** `vienna-market-household.friday-fish/friday-fish.share` tags: home, market, food, social
  鱼还滴着水，Emil在走廊里分成两份。一份拿进自家，一份搁在Maria Moser 2的门口。傍晚Maria Moser 2来还盘子，盘子里是一小袋面粉。
  _effects: cash -6 (买鱼); food; relation acquaintance with person-materialized-world-vienna-1912-72_

- **1940.12** `vienna-adult-social.sunday-table/sunday-table.argument` tags: adulthood, social, work, family, partnership
  星期天中午，Emil和Franz Huber在出租屋的厨房桌边分面包，话题从房租转到Emil母亲上个月的药钱。Franz Huber把刀放下，说这个家不能总先填那边的窟窿。面包凉了，汤也没再热。
  _effects: relation partner with person-materialized-world-vienna-1912-55; mood -0.020000000000000018_

- **1941.01** `af17-wish.family-inheritance::ctx-vienna-authoritarian-1934::milieu-tenement/kept-the-shop-and-the-sisters` tags: wish, love, family, inheritance, shop, debt, irony, vienna
  遗嘱把烟铺、楼上的两位老小姐和十四克朗的赊账一起留给Emil。Gustav Weiss第一次见面就叫Emil“侄子”，把钥匙、账本和一只总在柜台下打盹的猫交过来。Emil原本只想要一个家，现在有了一个需要每天清晨六点开门的家；Emil Huber在门口抽完一支雪茄，提醒Emil月底先还利息。
  _effects: role; cash -2 (先还一部分烟铺赊账); relation kin with person-materialized-world-vienna-1912-28; relation acquaintance with person-materialized-world-vienna-1912-65; reputation 0.020000000000000004; condition; flag +kept_the_tobacco_shop; mood 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-28_

- **1941.01** `state_tick:wish-love/love-pressure/press-on` tags: wish-love, wish, wish:love, love, family, intimacy, state, state_tick
  Emil又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.020000000000000018_

- **1941.01** `p9-social-daily-culture.lending-library/p9-social-daily-culture.lending-library.read-in-aisle` tags: daily, culture, leisure, cafe, music, walk, task, task:knowledge
  Emil站在书架前抽出一本厚小说，就着门口的光读了半章，Ferdinand Lechner 2在柜台后抬起眼皮看了一眼，没说话。读到要紧处，Emil摸出铅笔头把页码记在车票背面，把书插回原处，说下次带够押金再来；白读半章，管理员的眼神却凉了一点。
  _effects: skill; mood 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-24_

- **1941.01** `vienna-tenement-neighbors.laundry_line_dispute/compromise_split_line` tags: home, social, family, housing
  Emil把洗好的床单搭上院子里的公用晾衣绳，占了整条。Maria Moser 2抱着一盆湿衣服下来，说自家孩子明天要穿干净衬衫上学。两人在绳子两头扯了一阵，最后Emil把床单对折，腾出一半，Maria Moser 2用木夹子把衬衫一件件排上去。谁也没道歉，但第二天见面都点了头。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-72; mood 0.020000000000000018_

- **1941.07** `ad20-neighbor-dispute::ctx-vienna-authoritarian-1934::milieu-tenement/the-line-moves` tags: neighbor, dispute, home, everyday, public, obligation, vienna, urban
  隔壁把晾衣绳往Emil这边挪了一尺，水滴正好落在窗台上。Emil拿粉笔在墙上画了一道线；Ferdinand Bauer看见了，又把绳子挪回去半尺。两个人都觉得自己让了步，晚饭时却都把窗户关得很紧。
  _effects: mood -0.020000000000000018; flag +laundry_line_dispute_

- **1941.09** `r3-mig.smuggler-guide::ctx-vienna-authoritarian-1934::milieu-tenement/rowed-own-crossing` tags: migration, border, smuggling, river, risk, vienna, urban, crisis
  Emil凑不出船钱，Franz Lechner让他自己划，他蹲在船头抽旱烟。船到河心开始漏水，Emil用帽子舀水，Franz Lechner说“再快一点，水比人快”。靠岸时船已经沉到膝盖，Emil的鞋留在河底。
  _effects: cash -4 (船夫的价码（其中4克朗记入债务）); condition; flag +rowed_own_crossing; relation colleague with person-franz-lechner; knowledge “the old boat leaks below the waterline”_

- **1941.12** `r3-war.occupied-bells::ctx-vienna-authoritarian-1934::milieu-tenement/surrendered-copper` tags: war, occupation, requisition, bells, resistance, vienna, urban, crisis
  Emil带人把铜锅、门把手和教堂的烛台堆在广场上，Josef Lechner 4逐个过秤。Anton Kral想把曾祖父的怀表留下，被Emil按住手；Grete Stein把自己的铜十字架也放进堆里，说“称这个的时候轻一点”。
  _effects: cash -4 (钟楼上的征用令（其中4克朗记入债务）); mood -0.040000000000000036; flag +surrendered_copper_to_occupier; relation colleague with person-materialized-world-vienna-1912-37; relation friend with person-grete-stein; relation acquaintance with person-materialized-world-vienna-1912-105_

- **1942.01** `p10-migration-tasks.return-home/return-ticket-refunded` tags: adulthood, migration, housing, family, travel, task, return, train
  动身前一天，城里的作坊捎话让他去试工。他把车票退掉，扣了些手续费，拎着工具袋去了作坊，在车床边站了一整天。哥哥的信还压在枕头下，他回了一封，说再等等看。
  _effects: cash -1 (退票扣除的手续费（其中1克朗记入债务）); mood 0.040000000000000036; relation kin with person-anna-bauer; knowledge “城里那家作坊开工，试工一天给两克朗五十赫勒，转正看手艺”; relation acquaintance with person-materialized-world-vienna-1912-104_

- **1942.01** `vienna-parish-aid.soup-kitchen/soup-kitchen.take-and-carry` tags: faith, parish, mutual_aid, poverty, family
  汤是豆子熬的，表面浮着几粒油星，气味把整条巷子都占了。Friedrich Winter排在前面，回头替Emil看着位置，嘴里数着还剩几个人。铁罐递过去时烫手，Emil用围裙角垫着。
  _effects: food; relation acquaintance with person:evt:world-vienna-1912:001622:child; mood 0.030000000000000027_

- **1942.03** `p9-social-family-conflict-care.cousin-bed/give-camp-bed-and-board` tags: family, care, siblings, inheritance, housing, money
  Emil让Katharina Moser 2睡厨房的行军床，讲好每月三克朗饭钱，煤钱另算。白天把铺盖卷起来靠在碗柜边，晚上再铺开；厨房多一个人，面包和煤都下去得快，伙食上短了两克朗。看门人再来问时，Emil把藤箱指过去，说人住下了，灯油钱也记在账上。
  _effects: cash 3 (表亲交来的饭钱); relation kin with person-materialized-world-vienna-1912-104; flag +kin_staying_over_

- **1942.12** `vienna-market-debt.pawn-watch/pawn-whole-watch` tags: market, debt, money, home, shop
  你把银壳怀表推到绒布托盘上，当铺掌柜用放大镜扫了一眼机芯，报出八克朗。你盯着那张窄票上模糊的赎当日期，想起父亲在第十区工棚里上弦的样子。邻居在门外咳嗽，你捏着票和钱走出来，先拐去房东那里付了半个月的欠租。
  _effects: cash 8 (典当银壳怀表所得); mood -0.050000000000000044; flag +watch_pawned_

- **1943.01** `office16-scandal.public-hearing::ctx-vienna-authoritarian-1934::milieu-tenement/the-wrong-signature` tags: office, scandal, media, reputation, politics, power, vienna, urban
  报纸放大的签名其实是Josef Winter的：两个字母写得太像。更正启事登在第七版，只有三行；Emil的名字被拿掉了，Josef Winter的名字留了下来。第二天，Josef Winter没有来上班，桌上的茶杯还是满的。
  _effects: reputation 0.02; relation acquaintance with person-materialized-world-vienna-1912-93; flag +scandal_misdirected; knowledge “被登出来的签名是书记员的，更正启事在第七版。”; mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-100_

- **1943.02** `p9-social-family-conflict-care.christmas-soup/ledger-on-table` tags: family, care, siblings, inheritance, housing, money
  Emil把旧账本摊在汤锅旁边，翻到药费那一页，说今天得当场算清才肯坐下。Berta Winter的勺子停在半空，最后也把本子拉过去，一行行对起数来。汤在炉子上咕嘟着，谁也没先盛；等账算到最后一个赫勒，Emil在页脚写下“结清”，两人才同时伸手去够勺子。
  _effects: relation kin with person:evt:world-vienna-1912:000062:child; flag +medicine_bill_settled_

- **1943.06** `bc18-ghost.death-certificate::ctx-vienna-authoritarian-1934::milieu-tenement/accepts-the-file` tags: bureaucracy, legal, death, identity, mistake, paperwork, absurd, vienna
  户籍官Josef Lechner 4为了结掉一桩陈年失踪案，在档案上给Emil盖了“推定死亡”。三天后，Emil收到一张慰问卡和一本作废的配给簿；同一天，追了半年的债主忽然不再上门。旧货商听说后，花两克朗买走一份抄本，说要给一个躲债的朋友看看格式。
  _effects: cash 2 (卖给旧货商的死亡证明抄本); state_add bc18-bureaucratic-ghost state:world-vienna-1912:1154; reputation -0.010000000000000002; relation acquaintance with person-materialized-world-vienna-1912-105; flag +declared_dead_while_alive; mood 0.010000000000000009; flag +bureaucratic_ghost_

- **1943.06** `state_reaction:bc18-bureaucratic-ghost/another-file-opened` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  Emil刚在一个窗口证明自己活着，另一个窗口又从抽屉里抽出一张死亡通知。两个办事员隔着走廊互相看了一眼，谁也没有先开口；Emil站在中间，忽然明白自己不是一个人，而是一份正在被转抄的卷宗。
  _effects: state_parameter bc18-bureaucratic-ghost.risk 20 -> 32; state_parameter bc18-bureaucratic-ghost.duplicates 1 -> 2; state_parameter bc18-bureaucratic-ghost.sightings 1 -> 2; flag +another_file_opened; mood -0.010000000000000009_
  _causes: evt:world-vienna-1912:012740_

- **1943.08** `vienna-legacy-worklife.sick-fund/sick-fund.keep-quiet` tags: legacy, work, family, reform, ordinary_life, injury
  止咳药水是褐色的，瓶口塞着软木塞，摇一摇会起沫。Emil看着工友把表折成小块，折了三折才塞进帽檐。墙上的规章还贴在那里，纸角被风掀起，没人去按。
  _effects: health -0.039999999999999904 (没有正规病假，只能靠药水撑着); relation colleague with person-materialized-world-vienna-1912-117; relation acquaintance with person-materialized-world-vienna-1912-117_

- **1944.01** `office16-admin.quiet-ledger::ctx-vienna-authoritarian-1934::milieu-tenement/nothing-moved` tags: office, administration, budget, competence, quiet, power, vienna, urban
  账本看上去是平的：修屋顶的钱被挪去补煤款，煤款又被挪去付印刷费。Emil在每一栏都签了字，知道明年还会这样。散会后，Hermann Moser 2把一张催修屋顶的纸条压在台灯下面。
  _effects: reputation -0.009999999999999998; flag +deferred_maintenance; knowledge “屋顶的修理费被挪去补煤款，煤款又被挪去付印刷费。”; relation acquaintance with person-materialized-world-vienna-1912-23_

- **1944.01** `state_tick:bc18-bureaucratic-ghost/paper-trail-year/kept-the-files-apart` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  这一年，Emil学会了同时带三张纸出门：一张证明活着，一张证明死了，一张证明自己从没搬过家。窗口后面的人各自只看自己那一张，偶尔还会夸Emil的材料齐全。年底，Emil从补发的配给里省下一小袋面粉，觉得自己像个熟练的走私犯。
  _effects: state_parameter bc18-bureaucratic-ghost.fileDepth 25 -> 29; state_parameter bc18-bureaucratic-ghost.risk 32 -> 27; cash 1 (省下的配给和车钱); mood 0.010000000000000009_

- **1944.01** `r13-work.factory-gate::ctx-vienna-authoritarian-1934::milieu-tenement/trial-at-the-drill` tags: work, hiring, factory, queue, cash, vienna, urban, crisis
  Katharina Huber没有看推荐信，只把Emil带到车间尽头，指着一台停着的钻床说，钻三个孔就留下。Emil对准划线，铁屑卷成一条蓝灰色的弹簧。Katharina Huber把工钱袋往柜台上一丢，说从今天算起，别迟到。
  _effects: cash 1 (铁门开了一条缝); flag +work13_hired_after_trial_at_gate; role; skill; relation colleague with person-materialized-world-vienna-1912-102; employment Bohrer @ org-winter-print; relation acquaintance with person-materialized-world-vienna-1912-102; relation acquaintance with person-materialized-world-vienna-1912-110_

- **1944.01** `vienna-medical-treatment.sanatorium/home-rest` tags: health, medical, family, money
  安娜的汤锅外面包着旧毛巾，端进来时还烫手。Emil靠着枕头喝，喝一半咳一半。房东太太在走廊里故意大声说，肺病可不是闹着玩的，安娜探出头去，说医生讲了不传染。
  _effects: health 0.03 (在家休养但条件有限); food; cash -0.5 (房东要求的清洁费); relation friend with person-anna-bauer_

- **1944.02** `state_reaction:wish-love/love-betrayal` tags: wish-love, wish, wish:love, love, family, intimacy, state, state_reaction
  Emil反复回想最后一次见面。对方说过的话被拆成很多小块，每一块都能扎人。
  _effects: flag +wish:love:afraid_of_being_left_
  _causes: evt:world-vienna-1912:012862_

- **1944.03** `vienna-market-debt.pawn-watch/pawn-chain-only` tags: market, debt, money, home, shop
  链子从你指缝里滑下去，落在绒布上几乎没有声音。掌柜说两克朗四十赫勒，你点了点头。出门时你把表掏出来上了几圈弦，它还在走，只是再没法挂在马甲上了。
  _effects: cash 2.4 (典当银表链所得); mood -0.010000000000000009; relation acquaintance with person-materialized-world-vienna-1912-20; relation acquaintance with person-materialized-world-vienna-1912-20_

- **1945.01** `vienna-life-injury-recovery/wound-infection` tags: health, work, family
  Emil的伤口在几天后肿起来，手腕发热。医生说要切开引流，费用比上次更高；Emil看着账单，先问能不能分两次付。
  _effects: cash -14 (drainage and medicine（其中14克朗记入债务）); condition_
  _causes: evt:world-vienna-1912:012739_

- **1945.01** `state_tick:bc18-bureaucratic-ghost/paper-trail-year/kept-the-files-apart` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  这一年，Emil学会了同时带三张纸出门：一张证明活着，一张证明死了，一张证明自己从没搬过家。窗口后面的人各自只看自己那一张，偶尔还会夸Emil的材料齐全。年底，Emil从补发的配给里省下一小袋面粉，觉得自己像个熟练的走私犯。
  _effects: state_parameter bc18-bureaucratic-ghost.fileDepth 29 -> 33; state_parameter bc18-bureaucratic-ghost.risk 27 -> 22; cash 1 (省下的配给和车钱); mood 0.010000000000000009_

- **1945.01** `state_tick:wish-love/love-pressure/put-away` tags: wish-love, wish, wish:love, love, family, intimacy, state, state_tick
  Emil暂时把那件事收进抽屉；日子还有别的东西要应付。
  _effects: mood -0.010000000000000009_

- **1945.01** `vienna-housing-move.moving-day/moving-day-handcart` tags: housing, home, rent, family, money
  手推车每走十几步就要停一下，楼道里的门半开着，有人探头看热闹。Emil把照片铁盒交给Anna Hofer 2抱着，自己低头把最后一箱锅具拖上楼。天擦黑时，新屋里才勉强归置出下脚的地方。
  _effects: cash -1 (借手推车买烟熨谢邻居的小开销（其中0.7克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-57_

- **1945.04** `vienna-church-community.saint-vincent-box/box-request-granted` tags: faith, social, family, home
  Emil在圣文生会门口登记，领到一张面包券和一小袋土豆。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-43; mood 0.030000000000000027_

- **1946.01** `vienna-life-1945-liberation/survives` tags: war, liberation, 1945
  苏联士兵进城时，Emil躲在门后听见坦克履带压过石板路。几天后街口贴出告示，Emil去领了一份汤和一块面包。
  _effects: role; food; cash -2 (replacement documents)_

- **1946.01** `state_expire:bc18-bureaucratic-ghost` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  Emil的「档案里的活鬼」到期；相关安排结束。
  _effects: state_remove bc18-bureaucratic-ghost state:world-vienna-1912:1154; flag -bureaucratic_ghost_

- **1946.01** `r13-work.learn-machine::ctx-vienna-postwar-1945::milieu-factory/learned-in-three-nights` tags: work, machine, skill, training, factory, vienna, urban, postwar
  Emil Hofer先让Emil空转了一刻钟，听主轴的声音，再把手放在进给轮上，教Emil凭震动判断吃刀深浅。第三个晚上，Emil独自车完一根轴，量了三遍，尺寸都在公差里。Marie Huber把废料筐踢到一边，说这台机器以后归Emil开。
  _effects: flag +work13_learned_the_milling_machine; skill; relation colleague with person-materialized-world-vienna-1912-43_

- **1946.02** `vienna-market-debt.wage-garnishment/accept-garnishment` tags: market, debt, money, home, shop
  车间里机油味混着铁屑味。你回到车床前，摇把攥在手里发滑。工友凑过来低声说他婆娘上个月只好去当铺当了一对耳环。你没抬头，只是把卡盘又紧了一圈。
  _effects: cash -2 (工资被扣去还债); mood -0.050000000000000044_

- **1946.11** `p10-work-career.demotion-dismissal/p10-work-career.demotion-dismissal.suspension` tags: adulthood, work, career, wages, injury, pension, employment, demotion
  Emil和Emil Hofer在办公室门口争了几句，声音大到走廊都听得见。厂里最后把解雇改成停班一个月，期满再看有没有位置。他走出厂门时，门房把铜牌收回去，说下个月带证明再来。
  _effects: unemployment (停班一个月暂时没有工钱); relation colleague with person-materialized-world-vienna-1912-43; flag +suspended_pending_review_

- **1947.01** `office16-corruption.inspection::ctx-vienna-postwar-1945::milieu-tenement/clean-audit` tags: office, corruption, audit, legal, power, dark, vienna, urban
  Friedrich Winter带了两只空箱子来，走的时候还是空的。Emil把三年的合同、收据和会议记录按月份排在地上，Friedrich Winter抽查了十二份，每一份都能对上签字人；最后一句是“下次可以少准备一点”。
  _effects: reputation 0.05; organization_funds; skill; mood 0.030000000000000027; flag +passed_audit; knowledge “审计抽查了十二份合同，每一份都能对上签字人。”_

- **1947.02** `bc18-ghost.death-certificate::ctx-vienna-postwar-1945::milieu-tenement/accepts-the-file` tags: bureaucracy, legal, death, identity, mistake, paperwork, absurd, vienna
  户籍官Katharina Moser 2为了结掉一桩陈年失踪案，在档案上给Emil盖了“推定死亡”。三天后，Emil收到一张慰问卡和一本作废的配给簿；同一天，追了半年的债主忽然不再上门。旧货商听说后，花两克朗买走一份抄本，说要给一个躲债的朋友看看格式。
  _effects: cash 2 (卖给旧货商的死亡证明抄本); state_add bc18-bureaucratic-ghost state:world-vienna-1912:1317; reputation -0.01; relation acquaintance with person-materialized-world-vienna-1912-104; mood 0.010000000000000009; flag +bureaucratic_ghost; mood -0.010000000000000009_

- **1947.02** `state_reaction:bc18-bureaucratic-ghost/another-file-opened` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  Emil刚在一个窗口证明自己活着，另一个窗口又从抽屉里抽出一张死亡通知。两个办事员隔着走廊互相看了一眼，谁也没有先开口；Emil站在中间，忽然明白自己不是一个人，而是一份正在被转抄的卷宗。
  _effects: state_parameter bc18-bureaucratic-ghost.risk 20 -> 32; state_parameter bc18-bureaucratic-ghost.duplicates 1 -> 2; state_parameter bc18-bureaucratic-ghost.sightings 1 -> 2; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:015195_

- **1947.07** `bc18-crime.failed-burglary::ctx-vienna-postwar-1945::milieu-tenement/health-inspectors` tags: crime, burglary, mistake, absurd, police, legal, comic, vienna
  两人摸黑撬开一扇门，里面没有保险柜，只有背景布、三脚架和一池显影水。店主以为他们是卫生局派来查暗房通风的，殷勤地领着看排水口；Ferdinand Hofer只好装模作样地记了几笔，Emil顺手把柜台上一顶帽子戴走。临走时，店主还问要不要写整改通知。
  _effects: cash 1 (卖掉顺走的帽子); relation friend with person-materialized-world-vienna-1912-120; condition; flag +burglary_mistaken_for_inspection; mood 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-120; relation acquaintance with person-materialized-world-vienna-1912-128_

- **1948.01** `vienna-postwar-housing-1950s/stay-with-relatives` tags: adulthood, postwar, housing, family
  分房名单又往后推了一年，Emil一家搬进亲戚家的厨房隔间。Helene Berg送来一块旧帘子当隔断；夜里有人起身，全屋都听得见。
  _effects: cash -3 (shared household costs); condition; mood -0.010000000000000009; relation acquaintance with person:evt:world-vienna-1912:004120:child_

- **1948.01** `af17-wish.family-inheritance::ctx-vienna-postwar-1945::milieu-tenement/kept-the-shop-and-the-sisters` tags: wish, love, family, inheritance, shop, debt, irony, vienna
  遗嘱把烟铺、楼上的两位老小姐和十四克朗的赊账一起留给Emil。Mitzi Kral 2第一次见面就叫Emil“侄子”，把钥匙、账本和一只总在柜台下打盹的猫交过来。Emil原本只想要一个家，现在有了一个需要每天清晨六点开门的家；Gustav Moser在门口抽完一支雪茄，提醒Emil月底先还利息。
  _effects: cash -2 (先还一部分烟铺赊账); relation kin with person-materialized-world-vienna-1912-141; relation acquaintance with person:evt:world-vienna-1912:000945:child; reputation 0.02; mood 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-141_

- **1948.01** `state_tick:bc18-bureaucratic-ghost/paper-trail-year/kept-the-files-apart` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  这一年，Emil学会了同时带三张纸出门：一张证明活着，一张证明死了，一张证明自己从没搬过家。窗口后面的人各自只看自己那一张，偶尔还会夸Emil的材料齐全。年底，Emil从补发的配给里省下一小袋面粉，觉得自己像个熟练的走私犯。
  _effects: state_parameter bc18-bureaucratic-ghost.fileDepth 25 -> 29; state_parameter bc18-bureaucratic-ghost.risk 32 -> 27; cash 1 (省下的配给和车钱); mood 0.010000000000000009_

- **1948.01** `vienna-parish-aid.soup-kitchen/soup-kitchen.leave` tags: faith, parish, mutual_aid, poverty, family
  Emil看见熟人排在前面，帽檐压得低低的，便转身拐进旁边的小巷。Grete Berg 2追出来问怎么不领了，Emil说人太多，改天再来。回到屋里，灶是冷的，早上剩的半个土豆还在盘子里。Emil把它切成片，就着水咽下去。
  _effects: mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-146; food; relation acquaintance with person-materialized-world-vienna-1912-146_

- **1948.05** `vienna-medical-treatment.night-fever/hospital-night` tags: health, medical, family, money
  护士把冰袋按在Emil额上，水顺着鬓角流进衣领。Anna Bauer坐在床脚，数着窗外渐渐亮起的铺面门板，说回去给炉子添块煤。隔壁床的老头整夜在喊一个女人的名字。
  _effects: cash -2 (医院急诊押金); health 0.08 (急诊观察和冰敷退烧); relation friend with person-anna-bauer_

- **1948.12** `hs18-cinema.newsreel::ctx-vienna-postwar-1945::milieu-tenement/leave-early` tags: cinema, newsreel, neighbor, recognition, media, history, vienna, urban
  Emil在第二本胶片放到一半时起身，摸黑从侧门出去。Hermann Lechner在门口抽烟，问是不是片子太旧。Emil说不是，是座位太硬；街上的雨刚停，海报被泡得只剩半张脸。
  _effects: mood -0.010000000000000009; relation acquaintance with person:evt:world-vienna-1912:003200:child; flag +left_newsreel_early; relation acquaintance with person-materialized-world-vienna-1912-147_

- **1949.01** `state_tick:bc18-bureaucratic-ghost/paper-trail-year/another-window-opens` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  一个税务员把Emil的死亡记录和一张新房租收据订在一起，寄到了另一个区。三个星期后，Emil收到一封要求“已故纳税人”补缴暖气税的信；去问时，窗口说档案正在路上，让Emil先等通知。通知没有来，房租却涨了。
  _effects: state_parameter bc18-bureaucratic-ghost.fileDepth 29 -> 36; state_parameter bc18-bureaucratic-ghost.risk 27 -> 37; cash -1 (跑窗口的车钱); flag +heating_tax_for_the_dead_

- **1949.01** `state_tick:wish-love/love-pressure/press-on` tags: wish-love, wish, wish:love, love, family, intimacy, state, state_tick
  Emil又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.020000000000000018_

- **1949.01** `r13-work.factory-gate::ctx-vienna-postwar-1945::milieu-tenement/hired-as-hand` tags: work, hiring, factory, queue, cash, vienna, urban, postwar
  铁门只开了一条缝，Anton Bauer把人数到一百二十，才放最前面十个进去。Emil把冻裂的手摊在灯下，指节上的茧替他答了话。Anton Bauer在纸角写了个“明早六点”，Maria Bauer被推到一边，脚边的麻袋口还开着，土豆滚进了排水沟。
  _effects: cash 2 (铁门开了一条缝); flag +work13_hired_at_factory_gate; role; relation colleague with person-materialized-world-vienna-1912-119; employment Tagelöhner @ org-winter-print_

- **1949.01** `vienna-medical-treatment.toothache/barber-pull` tags: health, medical, family, money
  理发铺里还坐着等刮脸的老主顾，肥皂味和烟味混在一起。弗朗茨把围布往Emil胸前一系，说忍着点。钳子第一次滑脱，第二次才夹稳，牙出来时带着一小块肉，他用明矾水按住了。
  _effects: cash -1.2 (理发师拔牙收费); health 0.03 (病牙被拔除但手法粗糙); relation acquaintance with person-materialized-world-vienna-1912-106_

- **1949.08** `vienna-housing-move.sublet-room/sublet-full` tags: housing, home, rent, family, money, household
  Emil把床上的旧褥子重新铺平，Katharina Moser 2放下自己的铺盖卷，从怀里掏出一把钥匙看了看。厨房里多了一口人的碗，灶边的煤省着烧也够。Anton Berg在门口看了一眼，没多话。
  _effects: cash 4 (出租空床收进的月租); household; relation acquaintance with person:evt:world-vienna-1912:005124:child_

- **1949.09** `vienna-tenement-neighbors.lost_room_key/key_found_by_neighbor` tags: home, social, family, housing
  Emil傍晚从面粉厂下工回来，发现挂在腰带上的房门钥匙不见了，在楼梯间来回找了四趟。Mitzi Hofer在二楼拐角的煤堆旁捡到那把铜钥匙，钥匙上缠着红线，一眼就认出来。Mitzi Hofer敲开Emil的门，把钥匙拍在桌上，说自己眼神好使。
  _effects: relation friend with person-materialized-world-vienna-1912-15; mood 0.050000000000000044; relation acquaintance with person-materialized-world-vienna-1912-15_

- **1950.01** `r15-org.strike-settlement::ctx-vienna-postwar-1945::milieu-printshop/settled-without-him` tags: work, strike, union, negotiation, organization, vienna, urban, postwar
  工会和厂方谈成了，条件是Emil不再回到车间。没有人当面说这是代价，但Emil在签字那天没有被叫进会议室。
  _effects: mood -0.020000000000000018; flag +sacrificed_in_strike_settlement; unemployment (罢工的第七天); state_add blacklisted state:world-vienna-1912:1422; flag +blacklisted_

- **1950.01** `state_expire:bc18-bureaucratic-ghost` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  Emil的「档案里的活鬼」到期；相关安排结束。
  _effects: state_remove bc18-bureaucratic-ghost state:world-vienna-1912:1317; flag -bureaucratic_ghost_

- **1950.01** `p9-social-daily-culture.lending-library/p9-social-daily-culture.lending-library.read-in-aisle` tags: daily, culture, leisure, cafe, music, walk, task, task:knowledge
  Emil站在书架前抽出一本厚小说，就着门口的光读了半章，Hermann Winter 2在柜台后抬起眼皮看了一眼，没说话。读到要紧处，Emil摸出铅笔头把页码记在车票背面，把书插回原处，说下次带够押金再来；白读半章，管理员的眼神却凉了一点。
  _effects: skill; mood 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-107_

- **1950.01** `df18-dream.water-in-the-cellar::ctx-vienna-postwar-1945::milieu-tenement/ignore-the-dream` tags: dream, omen, home, water, coincidence, eerie, everyday, vienna
  Emil醒后只当是晚饭太咸，翻个身又睡了。下午，地窖的水管爆开，煤和旧箱子泡在齐膝的水里。Mitzi Moser 2帮着舀水，Emil一边舀一边想起梦里的水位，正好到第二个台阶。
  _effects: cash -4 (泡坏的煤和旧箱子); health -0.03 (在冷水里舀了一下午); condition; relation acquaintance with person-materialized-world-vienna-1912-139; knowledge “我没有理会梦，地窖真的淹了。”; flag +df18_ignored_flood_dream; mood -0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-139_

- **1950.08** `vienna-church-community.tenement-prayer/rent-prayer-argument` tags: faith, social, family, home
  有人抱怨守夜人太多，踩坏了楼梯木板。楼里的人围着看，谁也没先走开。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-114; reputation -0.03; mood -0.06000000000000005; relation acquaintance with person-materialized-world-vienna-1912-114_

- **1950.08** `vienna-parish-aid.sick-call/sick-call.with-priest` tags: faith, parish, mutual_aid, poverty, family
  Emil觉得一个人去不合适，绕到教堂请了修女一同上楼。修女看过病人，留下药包和一小瓶圣水，说会从教区账上出钱请医生来看一趟。Anna Bauer在楼下等着，说这样妥当，病人家里没男人，多个见证人心里安稳。
  _effects: relation acquaintance with person-anna-bauer; mood 0.040000000000000036; flag +parish_sick_visitor_

- **1951.01** `vienna-life-injury-recovery/wound-infection` tags: health, work, family, injury
  Emil的伤口在几天后肿起来，手腕发热。医生说要切开引流，费用比上次更高；Emil看着账单，先问能不能分两次付。
  _effects: health -0.12 (wound infection); cash -14 (drainage and medicine)_
  _causes: evt:world-vienna-1912:013976_

- **1951.01** `ml18-family.fortune-split::ctx-vienna-postwar-1945::milieu-tenement/split-it-equally` tags: family, money, windfall, inheritance, conflict, dark, vienna, urban
  星期天的晚饭多摆了一副刀叉。Berta Winter带着一本记账簿来，说钱是大家的运气，不该只落在一个人家里。Emil把二十四克朗分成三份，Berta Winter数了两遍；Franz Huber把烤肉端上桌，谁也没有再提那本账簿。
  _effects: cash -24 (the windfall was divided among the family); state_parameter ml18-sudden-fortune.principal 20 -> 0; state_parameter ml18-sudden-fortune.claims 2 -> 4; relation kin with person:evt:world-vienna-1912:000062:child; flag +fortune_split_equally; mood 0.020000000000000018_

- **1951.01** `kernel-social.reconciliation::ctx-vienna-postwar-1945::milieu-tenement/reconciliation.cold-peace` tags: task, task:social, social, reconciliation, family, apology, conflict, vienna
  Anna Bauer收下了锅，却没有让Emil进门，说东西留下，人先回去。Emil在门口站了一会儿，把锅盖掀开又盖上；第二天，空锅被放在门槛上，里面压着一张写着“收到了”的纸条。
  _effects: relation kin with person-anna-bauer; role; flag +cold_peace; knowledge “对方只收下东西，没有让进门，也没有提那笔钱。”_

- **1951.09** `vienna-housing-move.sublet-room/sublet-full` tags: housing, home, rent, family, money, household
  Emil把床上的旧褥子重新铺平，Luise Huber放下自己的铺盖卷，从怀里掏出一把钥匙看了看。厨房里多了一口人的碗，灶边的煤省着烧也够。Emil Lechner在门口看了一眼，没多话。
  _effects: cash 4 (出租空床收进的月租); household_

- **1951.12** `fa17-studio.private-failure::ctx-vienna-postwar-1945::milieu-tenement/sell-as-pulp` tags: art, writing, failure, poverty, privacy, craft, plagiarism, vienna
  Emil把没有写完的稿子卖给一家专门印消遣读物的小出版社，换来的钱刚好够付一个月房租。编辑把结尾改成了火车相撞，又在封面上印了一个陌生的笔名。Emil在报摊上看见那本册子时，先认出了自己写的一句雨，然后才认出那个名字不是自己的。
  _effects: cash 2 (卖掉残稿的稿费); state_add fa17-starving-artist state:world-vienna-1912:1516; reputation 0.01; knowledge “出版社把结尾改成了火车相撞，封面上的笔名不是我。”; flag +sold_under_pseudonym_

- **1951.12** `r13-rel.friendship-after-separation::ctx-vienna-postwar-1945::milieu-tenement::friendship-after-separation-postwar/refused-to-be-neighbours` tags: relationship, separation, friendship, ex_partner, civility, vienna, urban, postwar
  Emil听说Katharina Moser 2要搬进同一个院子，连夜去找房东，说宁可多付两克朗也要换到后排。Katharina Moser 2搬来那天，Emil把窗帘拉上，孩子趴在窗台看。两个家隔着一堵墙，谁也没有先敲门。
  _effects: cash -2 (街角的点头); role; relation acquaintance with person-materialized-world-vienna-1912-104_

- **1952.01** `pc20-wish.inherited-wish::ctx-vienna-postwar-1945::milieu-tenement/child-accepts` tags: wish, inheritance, child, second_chance, family, love, irony, legacy
  Elisabeth Bauer把那个愿望接了过去，问得很细：从哪一年开始，失败过几次，家里还有谁记得。Emil一边答一边发现，自己从来没有把这些事完整地说给Elisabeth Bauer听过；Franz Huber把灯芯剪短，屋里暗下来，话反而更清楚。
  _effects: state_parameter wish-love.intensity 0.55 -> 0.65; state_parameter wish-love.fixation 0.5 -> 0.6; state_add pc20-second-chance state:world-vienna-1912:1515; flag +child_accepted_wish; knowledge “孩子问起那个愿望从哪一年开始，{subject}才发现自己从没完整讲过。”; flag +second_chance_open_

- **1952.01** `state_tick:fa17-starving-artist/rent-and-pages/another-rejection` tags: fa17-starving-artist, art, craft, poverty, recognition, work, pride, ambition
  画店老板把Emil的作品推回来，说尺寸不合墙面，题材也不合买主的口味。Emil抱着画走回阁楼，路上经过一家亮着灯的咖啡馆，玻璃里映出一个抱着旧画框的人，像一个迟到的搬运工。
  _effects: state_parameter fa17-starving-artist.need 40 -> 47; state_parameter fa17-starving-artist.recognition 3 -> 2; state_parameter fa17-starving-artist.integrity 35 -> 32; mood -0.040000000000000036; health -0.020000000000000004 (冬天阁楼里没有足够的煤)_

- **1952.01** `kernel-migrate.emigration-papers::ctx-vienna-postwar-1945::milieu-tenement/civic-emigration-refused` tags: migration, papers, bureaucracy, port, emigration, vienna, urban, postwar
  他的申请被退回，理由是“担保人收入不足”。Josef Hofer 2说可以找第二担保人；他翻遍通讯录，发现能签字的人不是已经走了，就是不肯再担保。回家后，他把通讯录上能签字的名字一个个划掉。
  _effects: flag +emigration_papers_refused; cash -2 (照片、表格和往返车钱); relation acquaintance with person-materialized-world-vienna-1912-128; reputation -0.01; health -0.020000000000000004 (奔走找担保人后的疲惫); knowledge “护照申请需要担保人收入证明，找不到第二担保人就办不下去”_

- **1952.01** `initiative:found_process:taxi:person-materialized-world-vienna-1912-36-evt:world-vienna-1912:006827`
  第二区夜班出租合作社在Leopoldstädter Zinshaus, gemeinsamer Gang经过数年的招募、会议和互助，把分散的行动整理成公开纲领；这不是预先写好的历史，而是成员自己累积出来的运动。
  _effects: historical process 第二区夜班出租合作社的持续运动; historical development:initiative-taxi:person-materialized-world-vienna-1912-36-evt:world-vienna-1912:006827-1952 as organizer; historical development:initiative-taxi:person-materialized-world-vienna-1912-36-evt:world-vienna-1912:006827-1952 as organizer; historical development:initiative-taxi:person-materialized-world-vienna-1912-36-evt:world-vienna-1912:006827-1952 as organizer; historical development:initiative-taxi:person-materialized-world-vienna-1912-36-evt:world-vienna-1912:006827-1952 as organizer; knowledge “第二区夜班出租合作社的持续运动不是一次会议，而是我们这些年积累出来的持续组织。”; reputation 0.04_

- **1952.01** `historical_phase`
  历史进程《第二区夜班出租合作社在Leopoldstädter Zinshaus, gemeinsamer Gang经过数年的招募、会议和互助，把分散的行动整理成公开纲领；》从 emerging 进入 mobilizing。
  _effects: knowledge “我亲历或知晓「第二区夜班出租合作社在Leopoldstädter Zinshaus, gemeinsamer Gang经”; knowledge “我亲历或知晓「第二区夜班出租合作社在Leopoldstädter Zinshaus, gemeinsamer Gang经”; knowledge “我亲历或知晓「第二区夜班出租合作社在Leopoldstädter Zinshaus, gemeinsamer Gang经”; knowledge “我亲历或知晓「第二区夜班出租合作社在Leopoldstädter Zinshaus, gemeinsamer Gang经”_
  _causes: evt:world-vienna-1912:017978_

- **1952.05** `vienna-medical-treatment.night-fever/sweat-it-out` tags: health, medical, family, money, injury
  醋水的酸味混着汗气，屋子小得转不开身。Hermann Lechner把布拧到不滴水，敷上去时Emil打了个激灵。窗外送奶车吱呀碾过石板，她才想起自己家的炉子还灭着。
  _effects: health -0.04000000000000001 (高烧硬熬伤身); relation friend with person:evt:world-vienna-1912:003200:child_

- **1952.08** `vienna-adult-social.burial-fund/burial-fund.skipped` tags: adulthood, social, work, family
  Emil对Emil Hofer说这个月实在挤不出来，房租刚涨了半个克朗。Emil Hofer把本子翻到另一页，说那就先记着，只是下个月得补齐。午休铃响时，Emil的工具箱上还留着本子压出的印子。
  _effects: relation colleague with person-materialized-world-vienna-1912-43_

- **1952.09** `df18-blessing.laundry-water::ctx-vienna-postwar-1945::milieu-tenement/the-candle-stall` tags: blessing, omen, water, faith, fraud, consolation, religious, eerie
  Anna Hofer 2在门口摆了一只木箱，卖蜡烛和印着水渍的小卡片，说摸一摸就能好。Emil看着邻居把零钱收进围裙，没有阻止。几天后，楼道里排起了队；Emil从后门进出，怕被人认成那个“显灵”的女人。
  _effects: cash 2 (邻居分给subject的蜡烛钱); reputation 0.020000000000000004; knowledge “邻居把我的水渍变成了卖蜡烛的摊子。”; flag +df18_water_stain_shrine; condition_

- **1953.01** `pc20-wish.inherited-wish::ctx-vienna-postwar-1945::milieu-tenement/wish-rewritten` tags: wish, inheritance, child, second_chance, family, love, irony, legacy
  Emil把那个愿望念到一半，忽然停下来，说后面几句不算数了。Elisabeth Bauer问那算什么，Emil说算一个老人终于承认自己当年想要的东西并不适合所有人；Franz Huber把纸翻过来，在背面写下新的日期。
  _effects: state_parameter wish-love.irony 0.3 -> 0.44999999999999996; state_parameter wish-love.intensity 0.65 -> 0.55; state_add pc20-second-chance state:world-vienna-1912:1549; relation partner with person-materialized-world-vienna-1912-55; flag +wish_rewritten; knowledge “愿望念到一半就不算数了，背面写上了新的日期。”; flag -second_chance_open; flag +second_chance_open_

- **1953.01** `state_tick:wish-love/love-pressure/press-on` tags: wish-love, wish, wish:love, love, family, intimacy, state, state_tick
  Emil又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.020000000000000018_

- **1953.01** `kernel-social.reconciliation::ctx-vienna-postwar-1945::milieu-tenement/reconciliation.cold-peace` tags: task, task:social, social, reconciliation, family, apology, conflict, vienna
  Berta Winter收下了锅，却没有让Emil进门，说东西留下，人先回去。Emil在门口站了一会儿，把锅盖掀开又盖上；第二天，空锅被放在门槛上，里面压着一张写着“收到了”的纸条。
  _effects: relation kin with person:evt:world-vienna-1912:000062:child; knowledge “对方只收下东西，没有让进门，也没有提那笔钱。”_

- **1953.03** `absurd15-stage.cast-the-king::ctx-vienna-postwar-1945::milieu-tenement/cast-as-king` tags: performance, theatre, power, irony, work, pretend, vienna, urban
  Katharina Moser 2把一顶掉漆的铅皮王冠扣在Emil头上，说不用演得像国王，只要像一个人突然被允许坐下。首演那天，Emil在台上忘了两句台词，观众却以为那是停顿。
  _effects: state_add stage-sovereign state:world-vienna-1912:1592; cash 2 (首演酬劳); role; reputation 0.03; flag +stage_sovereign; reputation 0.04000000000000001_

- **1953.04** `af17-wish.family-inheritance::ctx-vienna-postwar-1945::milieu-tenement/the-will-was-a-joke` tags: wish, love, family, inheritance, shop, debt, irony, vienna
  公证人念到最后一段，停了一下：死者把烟铺留给了“那个总在门口躲雨的年轻人”，落款处画着一只猫。铺子其实早就抵押出去，剩下的只有一只木腿、一本手写配方和两位没有血缘的老小姐。Emil帮她们把煤搬上楼，没有答应什么；Franz Moser却把配方塞进Emil的口袋，说冬天用得着。
  _effects: cash -1 (帮两位老小姐买煤); relation acquaintance with person-materialized-world-vienna-1912-7; skill; condition; flag +kept_the_recipe; mood 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-7_

- **1953.11** `vienna-housing-move.rent-notice/rent-notice-neighbors-together` tags: housing, home, rent, family, money
  Emil把Luise Kral和楼里另两户人家叫到楼道，把那张纸摆在窗台上传看。看门人在楼梯拐角听着，说房东礼拜三来收钱。几家人合计好，到那天一起等在门厅，先把克朗递过去，再把修补的事一件件摆出来。Emil把纸折进围裙口袋，觉得人凑齐了话也硬气些。
  _effects: relation acquaintance with person-luise-kral; mood 0.040000000000000036; flag +tenant_collective_

- **1954.01** `vienna-life-injury-recovery/wound-infection` tags: health, work, family, injury
  Emil的伤口在几天后肿起来，手腕发热。医生说要切开引流，费用比上次更高；Emil看着账单，先问能不能分两次付。
  _effects: health -0.12 (wound infection); cash -14 (drainage and medicine)_
  _causes: evt:world-vienna-1912:018185_

- **1954.01** `pc20-enemy.old-enemy-ally::ctx-vienna-postwar-1945::milieu-tenement/truce` tags: enemy, ally, second_chance, reconciliation, rivalry, politics, truce, vienna
  两个人没有握手，也没有关门。Berta Moser 2把一包烟放在门槛上，Emil没有捡；过了半晌，Emil把自己的火柴盒踢过去，Berta Moser 2接住，点了一支，谁都没有提当年的事。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-159; state_parameter pc20-second-chance.suspicion 40 -> 37; flag +uneasy_truce_with_old_enemy; knowledge “门槛上有一包烟，火柴盒被踢过去又接住，谁都没有提当年。”; relation acquaintance with person-materialized-world-vienna-1912-159_

- **1954.01** `state_tick:fa17-starving-artist/rent-and-pages/a-year-of-work` tags: fa17-starving-artist, art, craft, poverty, recognition, work, pride, ambition
  又一年过去，Emil把房租、颜料和纸张的钱分开写在一张账单背面。作品没有卖出去几件，但手上的线条比去年稳；夜里，Emil把一盏煤气灯移到画架最近的地方，继续修改同一个角落。
  _effects: state_parameter fa17-starving-artist.craft 45 -> 49; state_parameter fa17-starving-artist.recognition 2 -> 5; state_parameter fa17-starving-artist.need 47 -> 45; cash 1 (一张小画的价钱); mood 0.020000000000000018_

- **1954.01** `state_tick:pc20-second-chance/kept-word/kept-word` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  Emil把答应过的事又做了一遍：按时出现，把欠下的小钱还掉，没有在旧话上添新的解释。对方没有鼓掌，只把杯子往Emil这边推了推；这一次的沉默比上次轻。
  _effects: state_parameter pc20-second-chance.credibility 45 -> 51; state_parameter pc20-second-chance.suspicion 37 -> 32; state_parameter pc20-second-chance.hope 50 -> 54; mood 0.020000000000000018_

- **1954.01** `state_tick:stage-sovereign/performance-run/lost-the-crowd` tags: stage-sovereign, performance, theatre, pretend, status, irony, power, no-real-authority
  新排的戏没有坐满。Emil在第二幕听见后排有人笑，不是笑台词，是笑那顶歪掉的王冠。散场后，经理说下一轮要换一个更年轻的国王。
  _effects: state_parameter stage-sovereign.publicBelief 20 -> 12; state_parameter stage-sovereign.scandal 0 -> 6; mood -0.040000000000000036_

- **1954.01** `agency:support_process` tags: agency, agency:support_process
  Emil想帮忙，但组织者不信任新来的人，只让其在外围等消息。
  _effects: mood -0.040000000000000036; reputation -0.009999999999999995_

- **1954.02** `bc18-ghost.death-certificate::ctx-vienna-postwar-1945::milieu-tenement/correct-it-twice` tags: bureaucracy, legal, death, identity, mistake, paperwork, absurd, vienna
  Emil在窗口要求更正，Otto Kral把表格翻了三遍，最后开出一张新的出生证明，名字却少了一个字母。于是城里同时住着一个死人、一个活人，和一个只在档案里出生的陌生人。Emil拿着两张纸站在区公所门口，忽然不知道该用哪一张去领下个月的煤票。
  _effects: cash -1 (更正材料的手续费和车钱); state_add bc18-bureaucratic-ghost state:world-vienna-1912:1625; relation rival with person:evt:world-vienna-1912:002514:child; condition; flag +two_living_files_one_death; flag +bureaucratic_ghost_

- **1954.11** `vienna-church-community.tenement-prayer/rent-prayer-help` tags: faith, social, family, home
  Emil在楼梯间守夜时，邻居说起楼下老太太病重。
  _effects: condition; food; relation acquaintance with person:evt:world-vienna-1912:005256:child_

- **1955.01** `office16-rival.removal-motion::ctx-vienna-postwar-1945::milieu-hospital/motion-carries` tags: office, rivalry, politics, removal, power, intrigue, vienna, urban
  投票结果是十九比十七。Emil把印章、钥匙和一本写满批注的账本放进纸箱，最后一圈走廊走得比平时慢。Rosa Berg在门口等着接手，手里已经拿着新的编制表；表上第一个被划掉的名字是Emil的秘书。
  _effects: position_end 联络员 @building:person-materialized-world-vienna-1912-15-evt:world-vienna-1912:018097; reputation -0.05; mood -0.040000000000000036; condition; relation rival with person:evt:world-vienna-1912:002249:child; flag +removed_by_vote; knowledge “新编制表第一个划掉的是我的秘书。”_

- **1955.01** `state_expire:blacklisted` tags: blacklisted, work, stigma, politics, employment, state, state_tick, state:blacklisted
  Emil的「雇主黑名单」到期；相关安排结束。
  _effects: state_remove blacklisted state:world-vienna-1912:1422; flag -blacklisted_

- **1955.01** `state_tick:pc20-second-chance/kept-word/small-relapse` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  Emil晚了半个钟头，进门时先解释路上的电车，又解释口袋里的收据。对方没有追问，只把已经凉掉的汤端回厨房；Emil听见锅盖碰在灶台上，知道这次不是天气的问题。
  _effects: state_parameter pc20-second-chance.credibility 51 -> 44; state_parameter pc20-second-chance.suspicion 32 -> 40; state_parameter pc20-second-chance.debt 30 -> 33_

- **1955.01** `state_expire:stage-sovereign` tags: stage-sovereign, performance, theatre, pretend, status, irony, power, no-real-authority
  Emil的「舞台上的君主」到期；相关安排结束。
  _effects: state_remove stage-sovereign state:world-vienna-1912:1592; flag -stage_sovereign_

- **1955.01** `state_tick:bc18-bureaucratic-ghost/paper-trail-year/another-window-opens` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  一个税务员把Emil的死亡记录和一张新房租收据订在一起，寄到了另一个区。三个星期后，Emil收到一封要求“已故纳税人”补缴暖气税的信；去问时，窗口说档案正在路上，让Emil先等通知。通知没有来，房租却涨了。
  _effects: state_parameter bc18-bureaucratic-ghost.fileDepth 40 -> 47; state_parameter bc18-bureaucratic-ghost.risk 15 -> 25; cash -1 (跑窗口的车钱)_

- **1955.01** `p9-social-relationship-initiative.apology-at-bakery/settle-the-account` tags: courtship, friendship, family, social, initiative, housing, task, task:social
  两个星期不来往，门口碰见时Emil和Friedrich Winter都先看别处。这次Emil先开口，把账本里的一页撕下来摊在柜台上，说数字是自己写错的；Friedrich Winter看了半天，说下回别在酒馆里算账。
  _effects: cash -0.4 (一小束紫罗兰和两只 Semmel); mood 0.07999999999999996_

- **1955.06** `ad20-neighbor-dispute::ctx-vienna-postwar-1945::milieu-tenement/the-line-moves` tags: neighbor, dispute, home, everyday, public, obligation, vienna, urban
  隔壁把晾衣绳往Emil这边挪了一尺，水滴正好落在窗台上。Emil拿粉笔在墙上画了一道线；Emil Lechner看见了，又把绳子挪回去半尺。两个人都觉得自己让了步，晚饭时却都把窗户关得很紧。
  _effects: mood -0.020000000000000018_

- **1955.06** `state_reaction:bc18-bureaucratic-ghost/another-file-opened` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  Emil刚在一个窗口证明自己活着，另一个窗口又从抽屉里抽出一张死亡通知。两个办事员隔着走廊互相看了一眼，谁也没有先开口；Emil站在中间，忽然明白自己不是一个人，而是一份正在被转抄的卷宗。
  _effects: state_parameter bc18-bureaucratic-ghost.risk 25 -> 37; state_parameter bc18-bureaucratic-ghost.duplicates 3 -> 4; state_parameter bc18-bureaucratic-ghost.sightings 2 -> 3; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:019777_

- **1955.08** `r2-law.mortgage-foreclosure::ctx-vienna-postwar-1945::milieu-tenement/auction-stayed` tags: finance, mortgage, auction, housing, court, vienna, urban, postwar
  Emil在拍卖前三天把欠款凑齐，Helene Kral 2点完钞票，把槌子放回抽屉，说这次算“暂缓”，不是“撤销”。Mitzi Stein在门口把公告撕下一角，留给Emil做凭证；Luise Bauer问房子保住了没有，Emil说保到下一次。
  _effects: cash -28 (拍卖槌落在第七号); flag +mortgage_arrears_paid; relation acquaintance with person-materialized-world-vienna-1912-69; knowledge “the auction can be stayed but not cancelled”; relation acquaintance with person-materialized-world-vienna-1912-167_

- **1955.10** `vienna-housing-move.rent-notice/rent-notice-neighbors-together` tags: housing, home, rent, family, money
  Emil把Ferdinand Berg和楼里另两户人家叫到楼道，把那张纸摆在窗台上传看。看门人在楼梯拐角听着，说房东礼拜三来收钱。几家人合计好，到那天一起等在门厅，先把克朗递过去，再把修补的事一件件摆出来。Emil把纸折进围裙口袋，觉得人凑齐了话也硬气些。
  _effects: relation acquaintance with person:evt:world-vienna-1912:004622:child; mood 0.040000000000000036_

- **1956.01** `bc18-ghost.census-night::ctx-vienna-postwar-1945::milieu-tenement/counted-twice` tags: bureaucracy, census, identity, paperwork, absurd, neighborhood, legal, vienna
  普查员在门口翻了半天名册，说Emil在死亡栏里，不能算进住户。Emil把他请进屋，倒了一杯水；普查员想了很久，最后在“死者”旁边的空行里又添了一个“同名房客”。月底，住房补贴按两个人头发下来，Emil买了一双新鞋，另一份钱塞进了门房的口袋。
  _effects: cash 1 (多算一个人头得到的住房补贴); state_parameter bc18-bureaucratic-ghost.duplicates 2 -> 3; state_parameter bc18-bureaucratic-ghost.fileDepth 47 -> 51; relation acquaintance with person-materialized-world-vienna-1912-128; condition; flag +counted_as_two_people; mood 0.010000000000000009_

- **1956.01** `state_tick:fa17-starving-artist/rent-and-pages/another-rejection` tags: fa17-starving-artist, art, craft, poverty, recognition, work, pride, ambition
  画店老板把Emil的作品推回来，说尺寸不合墙面，题材也不合买主的口味。Emil抱着画走回阁楼，路上经过一家亮着灯的咖啡馆，玻璃里映出一个抱着旧画框的人，像一个迟到的搬运工。
  _effects: state_parameter fa17-starving-artist.need 45 -> 52; state_parameter fa17-starving-artist.recognition 5 -> 4; state_parameter fa17-starving-artist.integrity 32 -> 29; mood -0.040000000000000036; health -0.020000000000000018 (冬天阁楼里没有足够的煤)_

- **1956.01** `state_tick:pc20-second-chance/kept-word/small-relapse` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  Emil晚了半个钟头，进门时先解释路上的电车，又解释口袋里的收据。对方没有追问，只把已经凉掉的汤端回厨房；Emil听见锅盖碰在灶台上，知道这次不是天气的问题。
  _effects: state_parameter pc20-second-chance.credibility 44 -> 37; state_parameter pc20-second-chance.suspicion 40 -> 48; state_parameter pc20-second-chance.debt 33 -> 36; mood -0.030000000000000027_

- **1956.01** `state_tick:bc18-bureaucratic-ghost/paper-trail-year/kept-the-files-apart` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  这一年，Emil学会了同时带三张纸出门：一张证明活着，一张证明死了，一张证明自己从没搬过家。窗口后面的人各自只看自己那一张，偶尔还会夸Emil的材料齐全。年底，Emil从补发的配给里省下一小袋面粉，觉得自己像个熟练的走私犯。
  _effects: state_parameter bc18-bureaucratic-ghost.fileDepth 51 -> 55; state_parameter bc18-bureaucratic-ghost.risk 37 -> 32; cash 1 (省下的配给和车钱); mood 0.010000000000000009_

- **1956.01** `p9-work-jobsearch.ask-trial/ask-trial.no-vacancy` tags: work, job_search, negotiation, wages, employment, task, trial, factory
  Mitzi Moser 2没有接话，先从抽屉里撕下一角纸。Emil把名字、住址和手艺一样样说完，工头边写边应，写完把纸压回抽屉，说月底来问。
  _effects: mood -0.029999999999999916; relation acquaintance with person-materialized-world-vienna-1912-139_

- **1956.07** `p9-social-tenement-neighbors.stairwell-rumor/stairwell-rumor.ask-straight` tags: housing, neighbors, tenement, daily, money, reputation
  Emil在楼梯间拦住Katharina Moser 2，问那句话是从哪儿听来的，又趁送活的人上门时当面看清是谁。原来是对面作坊的裁缝来取改好的裤子。Katharina Moser 2听完把话咽回去，第二天洗衣房里没人再提。
  _effects: reputation 0.04000000000000001; relation acquaintance with person-materialized-world-vienna-1912-104_

- **1956.10** `vienna-tenement-neighbors.lost_room_key/key_lost_landlady` tags: home, social, family, housing
  Emil把钥匙丢在了回家路上的有轨电车轨道旁，天黑也没找着。房东太太说换锁芯要一克朗五十赫勒，从下月房租里扣。Franz Huber借给Emil一把旧挂锁，但锁鼻和门扣对不上，只能用铁丝拧着凑合。那夜Emil睡不踏实，总觉得有人在拧门。
  _effects: cash -1.5 (换锁芯费用); relation acquaintance with person-materialized-world-vienna-1912-55; mood -0.010000000000000009_

- **1957.01** `vienna-life-injury-recovery/clinic-treatment` tags: health, work, family
  Emil在受伤后的第三天去了诊所。医生清洗伤口、换药，收下诊费，嘱咐不要急着回机器旁。Emil把药方折好，回家路上买了纱布。
  _effects: health 0.050000000000000044 (wound treatment); cash -8 (clinic and bandages)_
  _causes: evt:world-vienna-1912:019937_

- **1957.01** `bc18-ghost.quiet-correction::ctx-vienna-postwar-1945::milieu-tenement/keep-both-documents` tags: bureaucracy, paperwork, identity, absurd, legal, quiet, comic, vienna
  Emil没有去销死亡证明，又去补了一张出生证明。此后办事，哪边队伍短就用哪张纸：领煤票用活人的，避开税务用死人的，给孩子报名用刚出生的。Berta Moser 2在档案里给Emil做了三个不同颜色的标签，说这样至少不容易拿错；Emil觉得，这是自己在官僚系统里得到过的最诚实的建议。
  _effects: cash 1 (用不同身份省下的配给差额); state_parameter bc18-bureaucratic-ghost.fileDepth 55 -> 60; state_parameter bc18-bureaucratic-ghost.risk 32 -> 37; state_parameter bc18-bureaucratic-ghost.officialStatus 同时活着和死了 -> 同时死亡与新生; flag +kept_both_certificates; mood 0.010000000000000009_

- **1957.01** `state_expire:pc20-second-chance` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  Emil的「第二次机会」到期；相关安排结束。
  _effects: state_remove pc20-second-chance state:world-vienna-1912:1549; flag -second_chance_open_

- **1957.01** `state_tick:bc18-bureaucratic-ghost/paper-trail-year/another-window-opens` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  一个税务员把Emil的死亡记录和一张新房租收据订在一起，寄到了另一个区。三个星期后，Emil收到一封要求“已故纳税人”补缴暖气税的信；去问时，窗口说档案正在路上，让Emil先等通知。通知没有来，房租却涨了。
  _effects: state_parameter bc18-bureaucratic-ghost.fileDepth 60 -> 67; state_parameter bc18-bureaucratic-ghost.risk 37 -> 47; cash -1 (跑窗口的车钱)_

- **1957.01** `kernel-family.housing-relative::ctx-vienna-postwar-1945::milieu-tenement/housing-relative.lodged-elsewhere` tags: task, task:family, family, housing, relatives, godparent, guardian, household
  Emil在楼里替教父Helene Berg问了一圈，最后在洗衣妇家找到一张空床，每月三克朗。Helene Berg把箱子搬过去，Emil替他垫了第一个月的房租；两人在楼梯口分开，Helene Berg说等找到工就还。床板短了一截，箱子只能竖着放。
  _effects: cash -3 (first month’s bed rent for the relative); relation kin with person:evt:world-vienna-1912:004120:child; role; role; flag +relative_lodged_elsewhere; knowledge “洗衣妇家有一张空床，每月三克朗。”_
## Lena

Born 1912.01, died 1948.01 (age 36).
Education: higher 3; occupation: none; roles: infant, child, pupil, child_worker, music_pupil, reform_school_inmate, movement_member, performer, typist, registered_resident, kinsman_helper, permit_holder, displaced_person, secret_lover, host.

### State snapshot
- p22-child-omen [person] (ended 1913.1: replaced_by:p22-child-omen) parameters={"strangeness":45,"attention":39,"protection":45,"fear":23} links={} ticks=1
- p22-family-legend [person] (ended 1913.2: replaced_by:p22-family-legend) parameters={"warmth":77,"secrecy":16,"danger":5,"promise":42} links={} ticks=1
- p22-child-omen [person] (ended 1918.1: duration expired) parameters={"strangeness":43,"attention":44,"protection":49,"fear":24} links={} ticks=3
- p22-family-legend [person] (ended 1918.1: duration expired) parameters={"warmth":60,"secrecy":70,"danger":28,"promise":57} links={} ticks=3
- apprenticeship-contract [person] (ended 1927.2: replaced_by:apprenticeship-contract) parameters={"progress":10,"failures":1,"trade":"木工","paid":true} links={} ticks=1
- apprenticeship-contract [person] (ended 1929.1: duration expired) parameters={"progress":5,"failures":1,"trade":"细木工","paid":true} links={} ticks=2
- apprenticeship-contract [person] (ended 1928.11: replaced_by:scholarship-holder) parameters={"progress":10,"failures":2,"trade":"木工","paid":true} links={} ticks=2
- yf18-first-awakening [person] (ended 1929.1: duration expired) parameters={"intensity":52,"nerve":13,"talk":2,"reciprocated":true,"secret":true} links={"beloved":"Anton"} ticks=2
- scholarship-holder [person] (ended 1931.1: scholarship revoked, moved to night school) parameters={"standing":66,"stipend_months_left":12} links={} ticks=2
- hs18-street-witness [person] (ended 1934.1: duration expired) parameters={"certainty":71,"danger":20,"retellings":0,"claim":"我在面包队里看见了那张脸，但没有出声。","quiet":false} links={} ticks=4
- debt-bondage [person] (ended 1933.1: duration expired) parameters={"debt":22,"creditor":"银行"} links={} ticks=3
- night-school [person] (ended 1934.1: duration expired) parameters={"progress":30,"tuition_arrears":0} links={} ticks=3
- under-investigation [person] (ended 1942.1: duration expired) parameters={"progress":15,"charge":"逃税"} links={} ticks=1

### 177 subject events

- **1912.02** `p22-comic-christening::ctx-vienna-1912::milieu-tenement/the-priest-sneezes` tags: infancy, family, christening, church, neighbor, comic, tender, drama
  神父念到孩子的名字时打了个大喷嚏，蜡烛灭了，Lena却笑出了声。Friedrich Hofer赶紧去点蜡烛，手一抖，火苗又灭了；教堂里第一次有人笑，神父也笑了，说这是今天最响的一声阿门。
  _effects: mood 0.04; relation acquaintance with person-phase15-Lena-world-vienna-1912; flag +christening_sneeze; state_add p22-family-legend state:world-vienna-1912:16_

- **1912.02** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Lena家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 10 -> 14; state_parameter p22-family-legend.warmth 70 -> 72; mood 0.01_
  _causes: evt:world-vienna-1912:000104_

- **1912.05** `vienna-life-infant-first-smile/colic-night` tags: infancy, family, first, warm, injury
  夜里Lena哭了很久，Josefine Hofer抱着孩子在屋里来回走，数着地板缝。天快亮时孩子终于打了个嗝，安静下来；Josefine Hofer坐在床沿，发现自己还保持着走路的姿势。
  _effects: mood -0.03; health -0.010000000000000009 (lost sleep)_

- **1912.07** `p22-strange-doctor-prediction::ctx-vienna-1912::milieu-tenement/the-doctor-is-optimistic` tags: infancy, family, doctor, illness, omen, strange, dark, drama
  医生说孩子只是瘦，开了一瓶味道很坏的补药，说“过了春天就好了”。Josefine Hofer把这句话记了很多年；每年春天，家里都要说一遍，像在核对一张旧账单，药瓶上还贴着手写的标签。
  _effects: mood 0.03; health 0.010000000000000009 (a tonic and a hopeful sentence); state_add p22-child-omen state:world-vienna-1912:15; flag +doctor_optimism_

- **1913.01** `vienna-life-toddler-first-words/first-word-door` tags: infancy, family, first, comic
  门外有人上楼，Lena忽然指着门说：“爸爸。”Josefine Hofer看了看空门口，没有纠正。那天晚上，孩子把家里每个人的名字都叫了一遍，叫错两个，却叫得很认真。
  _effects: skill; mood 0.020000000000000004; flag +first_word_door_

- **1913.01** `state_tick:p22-child-omen/the-omen-returns/the-coincidence-repeats` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  又过了一年，同一件小事又发生了：钟停在同一个时刻，门口的狗对着空处叫。Lena正在学系鞋带，抬头问“又来了吗”；大人说没有，手却先去摸门框，谁也没有回答。
  _effects: state_parameter p22-child-omen.strangeness 40 -> 45; state_parameter p22-child-omen.attention 35 -> 39; state_parameter p22-child-omen.fear 20 -> 23; mood -0.01_

- **1913.01** `state_tick:p22-family-legend/the-story-changes-hands/told-at-the-table` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，Lena家的故事在饭桌上换了新的讲法：多了一句笑话，少了一处哭声。听的人把汤匙放下，等下一句；讲故事的人却先去看窗子有没有关好，谁也没有先动筷子。
  _effects: state_parameter p22-family-legend.warmth 72 -> 75; state_parameter p22-family-legend.secrecy 14 -> 12; state_parameter p22-family-legend.promise 40 -> 42; mood 0.01_

- **1913.01** `p22-strange-doctor-prediction::ctx-vienna-1912::milieu-tenement/the-doctor-is-optimistic` tags: infancy, family, doctor, illness, omen, strange, dark, drama
  医生说孩子只是瘦，开了一瓶味道很坏的补药，说“过了春天就好了”。Josefine Hofer把这句话记了很多年；每年春天，家里都要说一遍，像在核对一张旧账单，药瓶上还贴着手写的标签。
  _effects: mood 0.03; state_add p22-child-omen state:world-vienna-1912:36_

- **1913.01** `state_reaction:p22-child-omen/a-stranger-touches-the-door` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  一个陌生人把手按在Lena家的门框上，说这样能把坏运气留在门外。大人没有拦，只等那人走远，才用湿布把门框擦了一遍，布上留下一点灰，门框上留下一道浅印。
  _effects: state_parameter p22-child-omen.attention 35 -> 40; state_parameter p22-child-omen.fear 20 -> 24; state_parameter p22-child-omen.protection 45 -> 47; mood -0.01_
  _causes: evt:world-vienna-1912:000271_

- **1913.02** `p22-strange-cradle-secret::ctx-vienna-1912::milieu-tenement/the-ticket-is-redeemed` tags: infancy, family, cradle, secret, inheritance, strange, dark, drama
  Josefine Hofer拿着当票去赎，取回一把银勺子，勺柄上刻着一个看不清的字母。回家后把勺子塞进Lena手里，说“用吧”；孩子敲着桌沿，勺子发出很轻的响声，像在回答什么。
  _effects: cash -5 (redeeming the pawn ticket); state_add p22-family-legend state:world-vienna-1912:37; flag +spoon_returned_

- **1913.02** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Lena家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 60 -> 64; state_parameter p22-family-legend.warmth 55 -> 57; mood 0.01_
  _causes: evt:world-vienna-1912:000274_

- **1914.01** `vienna-life-birth-letter-from-the-dead/the-letter-is-real` tags: infancy, family, secret, letter, drama
  邮差把一封边角磨白的信塞进门缝，收信人是一个已经死了三年的名字。Josefine Hofer把Lena放在膝上，拆开信，里面只有一句：“孩子像不像他？”Emil Weiss在门口探头，问是不是寄错了；Josefine Hofer把信折回去，说“没有寄错”。
  _effects: flag +letter_from_dead_relative; knowledge “一封写给死去亲人的信问：孩子像不像他。”; mood -0.04_

- **1914.01** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Lena家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 12 -> 16; state_parameter p22-family-legend.warmth 75 -> 77; mood 0.01_
  _causes: evt:world-vienna-1912:000269_

- **1914.01** `state_tick:p22-child-omen/the-omen-returns/nothing-happens` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  又过了一年，什么也没有发生。Lena照常吃饭、摔跤、把鞋穿反；那个说过预言的人搬走了。家里把红绳解下来，却没有扔，只收进针线盒最里面，红绳上落了一点灰。
  _effects: state_parameter p22-child-omen.strangeness 40 -> 38; state_parameter p22-child-omen.fear 24 -> 21; state_parameter p22-child-omen.protection 47 -> 49; mood 0.009999999999999998_

- **1914.01** `state_tick:p22-family-legend/the-story-changes-hands/a-detail-goes-missing` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，故事里最要紧的那件东西不见了：先是名字，后来是地点。Lena问起时，大人说“你记错了”；可柜子最底层那只空盒子，谁也没有扔，锁却换过了，钥匙也不见了。
  _effects: state_parameter p22-family-legend.secrecy 64 -> 68; state_parameter p22-family-legend.danger 25 -> 28; state_parameter p22-family-legend.warmth 57 -> 55; mood -0.010000000000000002_

- **1914.02** `vienna-life-toddler-accident/safe-in-the-doorway` tags: infancy, accident, family, danger
  Josefine Hofer在最后一刻抓住了Lena的后领。孩子悬在两级台阶之间，鞋底蹭着地，手里还攥着那只线轴。Josefine Hofer把孩子放回地上，蹲下来看了很久，才说：“再跑，我就把门关上。”
  _effects: mood -0.02; skill_

- **1915.02** `vienna-early-childhood.stairwell-fall/neighbor-carries` tags: childhood, family, home, street, injury
  Emil Weiss的煤桶磕在楼梯转角，煤块滚了一地。Lena坐在平台上，膝盖渗出血珠。Emil Weiss把桶一放，夹起Lena进了自家门，用温水冲伤口，又拿一块干面包塞过来。Josefine Hofer赶来时，Lena正坐在厨房凳上啃面包。
  _effects: health -0.020000000000000018 (膝盖擦破，已冲洗); food; relation acquaintance with person-josefine-hofer_

- **1915.02** `vienna-life-child-family-legend/stolen-inheritance` tags: childhood, family, secret, story
  Josefine Hofer说，家里本来有一件东西，后来被“更会说话的人”拿走了。Lena问是什么，Josefine Hofer只说是一块表，表盖里刻着姓。孩子记住了“表盖里刻着姓”，却没有记住那个姓。
  _effects: knowledge “家里有一块表盖里刻着姓的表，被一个更会说话的人拿走了。”; flag +family_legend_watch_

- **1915.10** `p9-childhood-household.supper-bowl/gave-potato-to-younger` tags: childhood, family, household, home, siblings, illness, neighbors
  Anton的碗先见了底，Lena把自己那块土豆拨过去，说“我不爱吃面的”。Josefine Hofer没拆穿，转身去灶口添煤，回来时把半片香肠压在Lena的面包下面。锅底刮得响，Lena把香肠又分了一半给Anton。
  _effects: food; relation kin with person-phase15-Anton-world-vienna-1912; mood 0.03_

- **1916.01** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Lena家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 68 -> 72; state_parameter p22-family-legend.warmth 55 -> 57; mood 0.010000000000000002_
  _causes: evt:world-vienna-1912:000640_

- **1916.01** `vienna-life-child-first-friend/shared-toy` tags: childhood, friendship, family, comic
  Hedwig在楼道里滚一只铁环，Lena站在门口看。Hedwig把铁环推过来，说“你推一次，我推一次”。两个人从楼梯口推到院子里，铁环倒下的声音把午睡的大人吵醒了一排。
  _effects: skill; mood 0.05_

- **1916.01** `state_tick:p22-child-omen/the-omen-returns/the-coincidence-repeats` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  又过了一年，同一件小事又发生了：钟停在同一个时刻，门口的狗对着空处叫。Lena正在学系鞋带，抬头问“又来了吗”；大人说没有，手却先去摸门框，谁也没有回答。
  _effects: state_parameter p22-child-omen.strangeness 38 -> 43; state_parameter p22-child-omen.attention 40 -> 44; state_parameter p22-child-omen.fear 21 -> 24; mood -0.009999999999999995_

- **1916.01** `state_tick:p22-family-legend/the-story-changes-hands/told-at-the-table` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，Lena家的故事在饭桌上换了新的讲法：多了一句笑话，少了一处哭声。听的人把汤匙放下，等下一句；讲故事的人却先去看窗子有没有关好，谁也没有先动筷子。
  _effects: state_parameter p22-family-legend.warmth 57 -> 60; state_parameter p22-family-legend.secrecy 72 -> 70; state_parameter p22-family-legend.promise 55 -> 57; mood 0.009999999999999995_

- **1916.09** `vienna-early-childhood.fever-night/father-absent` tags: childhood, family, home, street, partnership
  Lena烧到半夜，床上只有Josefine Hofer一个人守着。水缸见了底，Josefine Hofer一手抱Lena，一手提桶下楼，桶沿在楼梯上磕了一下，水泼出来打湿鞋面。天亮时Friedrich Hofer推门进来，Josefine Hofer把沾着药味的湿被单团起来，塞进Friedrich Hofer怀里。
  _effects: health 0.019999999999999997 (服药后略见好转); relation partner with person-friedrich-hofer; mood -0.1_

- **1917.01** `vienna-life-child-inherited-wish/the-child-wants-a-dog` tags: childhood, family, wish, grief, uncanny, drama
  Lena说那句话只是想要一只狗，而且要“会看门的、不咬人的、像外婆家那只一样”。Josefine Hofer松了一口气，又有点失落；那天下午，两个人用旧毛线给一只并不存在的狗量了脖围。
  _effects: mood 0.039999999999999994; skill_

- **1918.01** `vienna-life-school-enrolment/enrolled` tags: childhood, school, fees
  Josefine Hofer带Lena到Leopoldstädter Volksschule报名。Grete Stein在名册上写下孩子的姓名和出生月份，收了两克朗书本费，让孩子第二天带一块石板来。
  _effects: education primary; cash -2 (school books（其中2克朗记入债务）); role; relation acquaintance with person-grete-stein_

- **1918.01** `state_expire:p22-child-omen` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  Lena的「孩子身上的兆头」到期；相关安排结束。
  _effects: state_remove p22-child-omen state:world-vienna-1912:36_

- **1918.01** `state_expire:p22-family-legend` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  Lena的「家族传说」到期；相关安排结束。
  _effects: state_remove p22-family-legend state:world-vienna-1912:37_

- **1918.01** `p9-gap-childhood-chores.stay-after-school/stay-twice-cleaning` tags: childhood, household, chores, school, task, daily, teacher, learning
  “想留下，就把教室收拾干净。”Josef Lechner 2把灰桶推到Lena脚边。Lena提着桶下楼梯，灰从桶沿洒出来，在鞋面上落了一层白。擦完课桌，Josef Lechner 2已经坐在炉边，用粉笔头在地上画竖式，让Lena蹲在旁边一道一道算。
  _effects: skill; relation acquaintance with person-materialized-world-vienna-1912-11; relation acquaintance with person-materialized-world-vienna-1912-11_

- **1918.09** `p22-comic-job-or-child::ctx-vienna-university-1912::milieu-school/the-shift-is-lost` tags: childhood, family, work, laundry, neighbor, comic, tender, drama
  Friedrich Hofer选了家长会，少拿一天工钱。回家的路上买了半磅面包和一小块猪油；Lena把家长会上的画摊在桌上，画纸边角被油浸透了，画里有一台冒蒸汽的洗衣机，旁边站着两个人。
  _effects: cash -4 (a day's wages lost); mood 0.01999999999999999; flag +chose_child_

- **1919.01** `vienna-life-school-day/hungry-in-class` tags: childhood, school, hunger
  Lena早上只喝了一碗清汤，第二节课时眼前发黑。Grete Stein让孩子去走廊坐一会儿，给了半块面包；Lena把面包屑拢在手心吃完，胃里还是空的，但看Grete Stein的眼神软了些，回到座位时把腰挺直了一点。
  _effects: condition; relation acquaintance with person-grete-stein_

- **1919.01** `p9-gap-childhood-chores.fetch-coal/coal-neighbor-speaks` tags: childhood, household, chores, school, task, daily, coal, errand
  掌柜不肯赊，Emil Weiss从队尾挤过来，说这户人家的男人在印刷所做了十年，欠不了一筐煤。掌柜把“两赫勒”写在门牌号旁边，煤只装了小半筐。Lena抱着筐经过Emil Weiss身边，Emil Weiss替Lena把绳结紧了紧。
  _effects: cash -0.02 (赊账添的两赫勒利息); food; relation acquaintance with person-emil-weiss_

- **1920.01** `r13-edu.school-roll-call::ctx-vienna-university-1912::milieu-school/attends-through-frost` tags: education, school, attendance, childhood, poverty, university, culture, schooling
  Lena踩着结冰的台阶进教室，第三个空位还空着。Josef Lechner 2让Lena把昨天的课文背完，又用戒尺敲了敲黑板，叫全班跟着念。放学时名字被写在红榜末尾，Lena把冻僵的手指揣进袖口，觉得明天还能来。放学路上，Lena把冻裂的手贴在热煤渣上。
  _effects: mood 0.03; flag +school_attendance_streak; skill_

- **1920.04** `r1-child.bully-teacher-son::ctx-vienna-university-1912::milieu-school/fought-in-the-snow` tags: bullying, school, teacher, class, fear, university, culture, schooling
  Lena在放学路上把教师儿子推倒在雪里，两个人滚成一团。Otto Winter 2赶来时，先扶起自己的儿子，再问Lena为什么打人。Lena说她先切我的橡皮。Otto Winter 2说一块橡皮也值得动手？那天Lena在走廊站到天黑。
  _effects: reputation -0.08; flag +fought_teachers_son; relation rival with person-materialized-world-vienna-1912-16; relation acquaintance with person-materialized-world-vienna-1912-16_

- **1920.07** `p9-childhood-school.truant-prater/truant-turned-back` tags: childhood, school, teacher, peers, lessons, truancy
  巷子口的风把河边的腥气吹散了。Lena站住，说算术课要听写，回去还来得及。Josef骂了一句“胆小鬼”，一个人走了。Lena从后门溜进教室，在长凳上坐了半天，心跳才慢下来。下课铃响时，老师朝Lena这边看了一眼，没点名。
  _effects: mood 0.04000000000000001; education primary_

- **1920.10** `vienna-school-childhood.spelling-bee/spelling-bee.win` tags: school, social, childhood
  拼写比赛结束时，Maria Stein敲了敲讲台说“记住这个词”。Lena袖口上多了一枚小十字章，回家路上Berta Winter追着要看，最后用三颗李子换了眼福。
  _effects: reputation 0.08; mood 0.09999999999999998; relation acquaintance with person-materialized-world-vienna-1912-34; food; relation acquaintance with person-materialized-world-vienna-1912-34_

- **1921.01** `vienna-life-child-labour/folds-notices` tags: childhood, labour, piecework
  Buchdruckerei Winter & Söhne把一捆教区通告交给Josefine Hofer带回家。Lena放学后在厨房桌上折页到夜里，手指沾满油墨，两周后交回六千张，拿到三克朗二十赫勒；钱交给Josefine Hofer时，Lena的指尖已经洗不干净，指甲缝里留着一圈黑；家里从此多了一个能挣几个铜板的孩子。
  _effects: cash 3.2 (folding parish notices); condition; role_

- **1921.01** `r14-edu.music-lessons::ctx-vienna-university-1912::milieu-school/accepted-as-pupil` tags: education, arts_training, music, craft, university, culture, schooling, school
  Otto Winter 2让Lena把手放在琴键上，先不按键，只听节拍器。Lena坐了十分钟，手心全是汗。Otto Winter 2说手型不对，但耳朵可以教。从那天起，Lena每周三放学后去琴房，练到天黑，回家的路上手指还在桌板上敲。每月学费三克朗。
  _effects: cash -3 (琴房里漏风的窗); role; skill; relation colleague with person-materialized-world-vienna-1912-16; relation acquaintance with person-materialized-world-vienna-1912-36_

- **1921.03** `r1-child.punishment-peas::ctx-vienna-university-1912::milieu-school/left-hand-for-the-ruler` tags: school, punishment, teacher, dialect, authority, university, culture, schooling
  Friedrich Weiss举起戒尺时，Lena先把左手伸出去，说打右手明天写不了字。教室里有人笑，Friedrich Weiss愣了一下，尺子落在左手心上，只打了两下。那天Lena用左手抄完了五十遍，字歪得像刚学走路的笔画。
  _effects: reputation 0.04; flag +offered_left_hand_to_ruler; skill; relation rival with person-materialized-world-vienna-1912-38; relation acquaintance with person-materialized-world-vienna-1912-38_

- **1922.01** `p9-gap-childhood-chores.school-slate/slate-borrowed-from-teacher` tags: childhood, household, chores, school, task, daily, supplies, education
  Friedrich Weiss用拇指摸了摸石板上的裂缝，没说话，从讲台抽屉最底下抽出一块旧石板，木框还在，边角被磨得发亮。借的条件是每天放学擦黑板、倒炉灰。Lena把石板抱在怀里，当晚就用湿布擦了三遍，第二天袖口全是白粉。
  _effects: skill; relation acquaintance with person-materialized-world-vienna-1912-38_

- **1922.11** `r14-edu.boarding-arrival::ctx-vienna-university-1912::milieu-school/hazed-by-older-students` tags: education, boarding_isolation, boarding_school, childhood, university, culture, schooling, school
  Lena刚把箱子塞进床底，几个高年级学生就围过来，让Lena把家里带来的香肠交出来。Lena不给，箱子被踢翻，衬衫散了一地。Emil Hofer站在门边，想帮忙又退回去。熄灯后，Lena蹲在地上捡东西，膝盖磕在床脚上。
  _effects: mood -0.16; flag +hazed_at_boarding_school; relation rival with person-materialized-world-vienna-1912-43; relation acquaintance with person-materialized-world-vienna-1912-43_

- **1923.01** `p9-gap-childhood-chores.market-line/line-sold-out-potatoes` tags: childhood, household, chores, school, task, daily, market, food
  “卖完了。”三个字从窗口里传出来，Lena后面的队伍立刻散了一半。Lena没走，趴在窗台上看伙计扫面屑，直到人家挥手赶人。旁边摊子的土豆带着泥，Lena用围裙兜住，一枚一枚数铜板，回家报账时连找零都说清了。
  _effects: food; mood -0.03; skill; relation acquaintance with person-materialized-world-vienna-1912-9_

- **1924.01** `r14-edu.boarding-letter::ctx-vienna-university-1912::milieu-school/wrote-and-hid-it` tags: education, boarding_isolation, letter, childhood, university, culture, schooling, school
  Lena在自习课上写信，写家里那条狗，写宿舍的冷，写Friedrich Hofer查房时手电筒的光。写到一半，Emil Hofer探头来看，Lena把纸捂住。信最后没有寄出去，折成小方块，塞在枕头套里，夜里翻身时能听见纸响。
  _effects: mood -0.05; flag +wrote_unsent_letter; skill_
  _causes: evt:world-vienna-1912:002066_

- **1924.01** `p9-childhood-apprenticeship.ask-for-trial/trial-granted` tags: adolescence, work, apprenticeship, labour, training, family, task, task:work
  Maria Kral没接地址，先看Lena的手。纸样堆在墙角，落着灰，Lena一张张抖开、按厚薄分摞，纸边把食指划出三道细口。午后Maria Kral端来一碗扁豆汤和半块面包，又把一克朗二十赫勒压在秤砣下，说试工三天，干不满没有工钱。
  _effects: cash 1.2 (试工半日按小时折算的铜币); food; skill; relation acquaintance with person-maria-kral; relation acquaintance with person-materialized-world-vienna-1912-28_

- **1924.02** `r3-teen.disability-at-school::ctx-vienna-university-1912::milieu-school/excluded` tags: disability, school, injury, access, institution, university, culture, schooling
  体育课点名时，Katharina Lechner把Lena的名字跳了过去，说坐着看就行。期末的体育证书上盖了“免修”，升学表却因此少了一项。Lena把证书折好，夹进最厚的那本书里。
  _effects: mood -0.1; reputation -0.04; condition; flag +excluded_from_physical_education; relation acquaintance with person-materialized-world-vienna-1912-41; relation acquaintance with person-materialized-world-vienna-1912-18_

- **1924.02** `r13-turn.exam-failure::ctx-vienna-university-1912::milieu-school/name-missing` tags: education, exam, failure, school, work, university, culture, schooling
  补考那天，Lena在考场门口等到钟响，监考说名单上没有名字。Josef Lechner 2跑去教务处，回来时手里只有一张转学建议。Lena去了印刷厂当学徒，师傅说铅字比字母好认，至少不会骗人。
  _effects: condition; flag +left_school_after_exam_failure; role; relation colleague with person-materialized-world-vienna-1912-11; education apprenticeship_

- **1924.02** `p9-childhood-adolescence.courtyard-gang/gang-help-with-bread` tags: adolescence, friendship, identity, work, school, secret, church
  面包房关门前Lena和Rosa凑了四赫勒，分到一块凉了的面包。夜里母亲问Lena吃了什么，Lena只答在院子里喝的水。
  _effects: cash -4 (凑钱买面包（其中4克朗记入债务）); relation friend with person-phase15-Rosa-world-vienna-1912_

- **1924.12** `r13-turn.exam-failure::ctx-vienna-reform-1930::milieu-tenement::reform-open-secondary/name-missing` tags: education, exam, failure, school, work, reform, medical, schooling
  补考那天，Lena在考场门口等到钟响，监考说名单上没有名字。Grete Stein跑去教务处，回来时手里只有一张转学建议。Lena去了印刷厂当学徒，师傅说铅字比字母好认，至少不会骗人。
  _effects: relation colleague with person-grete-stein; education apprenticeship_

- **1925.01** `r13-edu.music-lesson::ctx-vienna-reform-1930::milieu-school/first-recital` tags: education, music, lesson, craft, culture, reform, medical, schooling
  Lena在期末演奏会上拉完一首短曲，弓毛断了两根，最后一个音还是稳住了。Friedrich Weiss在台下点头，师母把手套摘下来鼓掌。回家后，Lena把琴擦了三遍，才发现肩托把脖子磨出一道红印，碰一下就疼。Lena没有告诉任何人。琴盒没关。
  _effects: reputation 0.05; flag +first_recital; skill_

- **1925.02** `r15-work.master-takes-on::ctx-vienna-reform-1930::milieu-school/signed-contract` tags: work, craft, apprentice, trade, poverty, reform, medical, schooling
  Maria Lechner把学徒契约摊在桌上，指给Lena看期限、工钱和出师考试。Lena签了名，第二天站到刨床前，手指上多了第一道木刺。
  _effects: relation employer with person-materialized-world-vienna-1912-30; state_add apprenticeship-contract state:world-vienna-1912:147; relation acquaintance with person-materialized-world-vienna-1912-30; education apprenticeship_

- **1925.09** `r13-turn.school-leaving::ctx-vienna-reform-1930::milieu-tenement::reform-leaving-age/signed-apprenticeship` tags: education, school, work, family, transition, reform, medical, schooling
  毕业钟敲过三下，Friedrich Weiss把成绩单按在讲台上，说Lena还能再读一年，只要家里肯出四克朗。家里人在走廊里把学徒契约展开，纸角还带着面粉。Lena签了名，第二天就站到刨床前，手指上多了第一道木刺。
  _effects: cash -2 (毕业钟响过以后); flag +left_school_for_apprenticeship; education apprenticeship_

- **1926.01** `state_tick:apprenticeship-contract/workshop-year/mistake` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Lena废掉了一块料，师傅扣了工钱。晚饭时谁也没提这件事。
  _effects: state_parameter apprenticeship-contract.failures 0 -> 1; cash -1 (wasted material); mood -0.04_

- **1926.01** `r13-edu.boarding-school::ctx-vienna-university-1912::milieu-university/admitted-to-dormitory` tags: education, boarding_school, residence, family, scholarship, university, culture, schooling
  Lena把铁皮箱绑在自行车后座，骑了三十里到寄宿学校。舍监检查行李，把家里的腌菜罐没收，说会招老鼠。Lena在熄灯后偷偷把罐子从垃圾堆捡回来，藏在床底，第一顿饭就着腌菜吃完了两碗粥。第一个星期Lena把腌菜分给同屋，换回三张邮票和一支不漏水的钢笔。
  _effects: flag +boarding_school_admitted; education secondary_

- **1926.02** `r15-work.master-takes-on::ctx-vienna-reform-1930::milieu-tenement/signed-contract` tags: work, craft, apprentice, trade, poverty, reform, medical, schooling
  Anton Winter把学徒契约摊在桌上，指给Lena看期限、工钱和出师考试。Lena签了名，第二天站到刨床前，手指上多了第一道木刺。
  _effects: relation employer with person-materialized-world-vienna-1912-35; state_add apprenticeship-contract state:world-vienna-1912:256; relation acquaintance with person-materialized-world-vienna-1912-35; education apprenticeship_

- **1926.02** `vienna-youth-threshold.night-class/enroll-night-class` tags: adolescence, school, work, family, transition
  Josef Lechner 2在黑板上写下课程表和书本费：一学期三克朗，另加六十赫勒杂费。Lena下工后啃着冷土豆赶到教室，坐到公共长桌最靠煤气灯的一头。手指上还留着白天的油污，握笔时在本子上蹭出灰印，但座位号已经登记在册。
  _effects: cash -3.6 (夜校学费与书本杂费（其中0.6克朗记入债务）); education secondary; skill_

- **1926.06** `r3-crime.juvenile-court::ctx-vienna-reform-1930::milieu-school::court-without-bars/sent-to-reform-school` tags: crime, youth, court, family, school, reform, medical, schooling
  Gustav Berg说家里管不了，不如让学校管。Josefine Hofer想说什么，被Maria Winter递过来的一张表格挡住了。Lena被带走时，Josefine Hofer追到走廊尽头，把一包糖塞进Lena的口袋。Maria Winter说“到了那边会检查”，又把糖拿走了。
  _effects: condition; flag +sent_to_reform_school; role; relation rival with person-josefine-hofer; move place-wien-volksschule-leopoldstadt; education apprenticeship; relation acquaintance with person-materialized-world-vienna-1912-2_

- **1927.01** `vienna-life-apprenticeship/factory-hand` tags: adolescence, work, apprenticeship, employment
  Buchdruckerei Winter & Söhne把Lena分到装订间，每天站十个小时，工钱按件算。第一周结束，Lena的指关节肿了，工头说习惯就好。
  _effects: employment Buchbinderhilfe @ org-winter-print; condition_

- **1927.01** `state_tick:apprenticeship-contract/workshop-year/mistake` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Lena废掉了一块料，师傅扣了工钱。晚饭时谁也没提这件事。
  _effects: state_parameter apprenticeship-contract.failures 0 -> 1; cash -1 (wasted material（其中1克朗记入债务）); mood -0.04_

- **1927.01** `r13-edu.library-study::ctx-vienna-university-1912::milieu-university/inventory-closed` tags: education, library, study, reading, poverty, university, culture, schooling
  Lena赶到时，阅览室门口挂着“盘点停开”的牌子。Lena在台阶上坐到天黑，把带来的笔记背了两遍，回家时鞋底湿透，第二天发起低烧。低烧退了以后，Lena再去，门口换了新牌子：阅览室每天只开三个钟头，Lena把借书证收进抽屉，等秋天再来。
  _effects: mood -0.04000000000000001; relation acquaintance with person-materialized-world-vienna-1912-48_

- **1927.01** `r1-cul.fan-letter::ctx-vienna-reform-1930::milieu-school/quoted-without-permission` tags: culture, letters, fandom, literacy, ambition, reform, medical, schooling
  Lena的信寄出半年，没有回音。后来Anton Winter在一篇文章里引用了这封信，没有署名，只写一个读者说。Lena在报上读到自己的句子，先是高兴，随后发现文章里的意思和自己写的相反。
  _effects: mood -0.08; reputation 0.03; flag +letter_quoted_without_permission; relation acquaintance with person-materialized-world-vienna-1912-35; knowledge “the quoted sentence means the opposite of what was written”_

- **1927.02** `vienna-apprentice-printshop.union-leaflet/union-leaflet.caught` tags: work, apprentice, factory, social
  Lena把传单卷进裤腰，在门口被Buchdruckerei Winter & Söhne叫住。Buchdruckerei Winter & Söhne抽出纸卷念了两行，说“印刷所不是煽动所”，把学徒补贴减半，并要Anna Hofer 2在排字房当众道歉。
  _effects: cash -1.5 (学徒补贴被减半); relation colleague with person-materialized-world-vienna-1912-57; relation colleague with person-materialized-world-vienna-1912-57; relation acquaintance with person-materialized-world-vienna-1912-57_

- **1927.06** `yf18-firstlook.atlas-margin::ctx-vienna-reform-1930::milieu-school/tear-out-the-page` tags: first_love, school, atlas, note, secrecy, reform, medical, schooling
  Lena把那页地图撕下来，折成四折藏进袜筒。回家路上，Lena在煤气灯下把字读了三遍，又把纸塞进炉子；火苗舔到“多瑙河”三个字时，Lena伸手抢出来，指尖烫出一个泡。
  _effects: state_add yf18-first-awakening state:world-vienna-1912:302; flag +yf18_burned_fingers; mood 0.009999999999999995; flag +yf18_first_awakening_active_

- **1928.01** `vienna-life-young-worker/long-shift` tags: adolescence, labour, union
  Lena连续上了十二天夜班，最后一天在机器旁睡着，被工头踢醒。月底多拿了两克朗，咳嗽却一直没好。
  _effects: cash 2 (overtime pay); condition_

- **1928.01** `state_tick:apprenticeship-contract/workshop-year/mistake` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Lena废掉了一块料，师傅扣了工钱。晚饭时谁也没提这件事。
  _effects: state_parameter apprenticeship-contract.failures 0 -> 1; cash -1 (wasted material（其中0.5克朗记入债务）); mood -0.04000000000000001_

- **1928.01** `state_tick:apprenticeship-contract/workshop-year/mistake` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Lena废掉了一块料，师傅扣了工钱。晚饭时谁也没提这件事。
  _effects: state_parameter apprenticeship-contract.failures 1 -> 2; cash -1 (wasted material（其中1克朗记入债务）); mood -0.04000000000000001_

- **1928.01** `state_tick:yf18-first-awakening/half-year-of-glances/answered-glance` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Lena在教堂门口或学校走廊里又遇见Anton。这一次对方先点了头，Lena准备好的整段话全忘了，只把手里的书换到另一只手上；回家后Lena才发现，自己把书拿倒了。
  _effects: state_parameter yf18-first-awakening.intensity 47 -> 52; state_parameter yf18-first-awakening.nerve 5 -> 13; state_parameter yf18-first-awakening.reciprocated false -> true; relation friend with person-phase15-Anton-world-vienna-1912; mood 0.03_

- **1928.01** `p9-childhood-apprenticeship.leave-bad-workshop/half-measures-stay` tags: adolescence, work, apprenticeship, labour, training, family, task, task:work
  “换清洗剂要加钱。”Buchdruckerei Winter & Söhne说完，只让人拆了半扇木板。Lena站在窗口试了试风，知道这已经是能争到的全部。此后每天上午还好，过了中午，太阳穴就开始一跳一跳地疼；Lena把手指在围裙上搓热，继续排字，工钱一分没少。
  _effects: health 0.019999999999999997 (窗户拆掉一半后气味稍减); condition; cash 1 (保住工位，照常领日薪)_

- **1928.02** `state_reaction:yf18-first-awakening/exam-week-distraction` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  考试周里，Lena把课本摊在桌上，眼睛却一直看着窗外那条电车线。笔记的页边多了几个没有写完的名字，Lena用橡皮擦掉，纸面起了毛。
  _effects: state_parameter yf18-first-awakening.intensity 50 -> 47; state_parameter yf18-first-awakening.talk 0 -> 2_
  _causes: evt:world-vienna-1912:003780_

- **1928.02** `ld18-letter.schoolbook::ctx-vienna-reform-1930::milieu-school/burned-before-the-answer` tags: love, letter, school, secret, queer, courtship, secret_intimacy, reform
  Lena在炉子前把信烧了，纸灰卷起来，像一片黑叶子。Anton第二天问有没有话要说，Lena说没有。两个人还是一起走了一段路，在面包店门口分开，谁也没有回头。
  _effects: relation acquaintance with person-phase15-Anton-world-vienna-1912; mood -0.04000000000000001; flag +burned_the_schoolbook_letter_

- **1928.11** `r15-education.entry-offer::ctx-vienna-reform-1930::milieu-school/full-scholarship` tags: education, scholarship, opportunity, reform, medical, schooling, school, teacher
  Lena的成绩打动了本地学校，拿到一份覆盖学费的奖学金；家里第一次不用为这笔钱吵到半夜。
  _effects: state_add scholarship-holder state:world-vienna-1912:357; role_

- **1929.01** `state_expire:apprenticeship-contract` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick, state:apprenticeship-contract
  Lena的「学徒契约」到期；相关安排结束。
  _effects: state_remove apprenticeship-contract state:world-vienna-1912:253_

- **1929.01** `state_expire:yf18-first-awakening` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Lena的「第一次心动」到期；相关安排结束。
  _effects: state_remove yf18-first-awakening state:world-vienna-1912:302; flag -yf18_first_awakening_active_

- **1929.01** `state_tick:scholarship-holder/annual-renewal/renewed` tags: scholarship-holder, education, scholarship, means_tested, state, state_tick
  Lena的成绩足够续上奖学金；家里这一年不用再为学费发愁。
  _effects: state_parameter scholarship-holder.standing 55 -> 63; cash 25 (scholarship stipend paid)_

- **1929.01** `r13-edu.dropout-return::ctx-vienna-reform-1930::milieu-school/returned-to-school` tags: education, dropout, return, school, work, reform, medical, schooling
  Lena退学半年后，在工厂门口看见以前的同学背着书包走过。Lena回家翻出课本，书页已经发黄。第二天，Lena去找Josef Lechner 2，Josef Lechner 2让Lena先跟班旁听两周。Lena坐在最后一排，把落下的笔记一页页补回来。两个月后，Lena的座位从最后一排换到中间。
  _effects: flag +returned_to_school; education secondary_

- **1930.01** `r15-education.tuition-vs-debt::ctx-vienna-medical-1930::milieu-university/family-pays` tags: education, debt, family, medical, university, knowledge, student, research
  家里咬牙还清这一期学费；Lena的奖学金保住了，但家庭现金见了底。父亲把空钱包放回抽屉，母亲没有问还剩多少。
  _effects: cash -45 (tuition paid from family savings（其中45克朗记入债务）); state_parameter scholarship-holder.standing 63 -> 66_

- **1930.01** `state_reaction:scholarship-holder/reaction-debt` tags: scholarship-holder, education, scholarship, means_tested, state, state_reaction, debt, family
  Lena发现奖学金并不能替家里还债，只能替自己争一点时间。
  _effects: flag +scholarship-holder:family-debt_
  _causes: evt:world-vienna-1912:004731_

- **1930.01** `r13-edu.literacy-class::ctx-vienna-reform-1930::milieu-school/signs-own-name` tags: education, literacy, adult_education, class, belonging, reform, medical, schooling
  Lena在石板上写自己的名字，写到第三遍才把最后一笔收住。Friedrich Weiss把Lena的手按在粉笔上，说慢慢来。放学时，Lena把石板抱在怀里，经过肉铺时第一次看懂招牌上写的是“今日有肝”。那天晚上，Lena在账本封皮上又写了一遍，写到最后一笔时手没有抖。
  _effects: mood 0.08000000000000002; flag +learned_to_sign_name; skill_

- **1930.01** `p9-social-courtship-friendship.returned-sugar-box/sugar-box-accept-and-work` tags: courtship, friendship, social, adulthood, reputation, leopoldstadt
  Lena不再说什么，把纸条夹进账本，第二天照常上工，工装穿得比平日整齐。师傅问起星期天的事，只说没成；收工时Lena把工具一件件擦过，又把动过的柜台抹了一遍，师傅教了怎么上蜡，手艺上多了一点，心里却空着一块。
  _effects: mood -0.03999999999999998; skill; relation acquaintance with person-anna-bauer_

- **1930.02** `p9-gap-adult-solitude.window-argument/window-argument.peek` tags: adulthood, daily, solitude, ordinary, home, neighbor, overheard
  Lena下楼倒水，在楼梯口看见院子里站着一对夫妻，男人的围裙上还沾着面粉，女的攥着一张工钱条。她没插话，提着壶又上楼，关门时听见那女人说“一星期八克朗怎么够”。
  _effects: mood -0.02999999999999997; skill_

- **1930.02** `vienna-market-debt.rent-arrears/rent-negotiate-installments` tags: market, debt, money, home, shop
  你没去借钱，直接下楼找房东，说月底前先付两克朗，剩下两克朗分两个星期补齐。房东叼着雪茄，拿铅笔在你的纸条背面写了个日期，说再拖一天就换锁。邻居在楼道口听见了，冲你摇了摇头，但没说什么。
  _effects: cash -2 (按分期付掉的第一笔欠租（其中2克朗记入债务）); relation acquaintance with person-friedrich-hofer; flag +rent_installment_plan_

- **1930.02** `vienna-courtship-courtyard.sunday-walk/separate-coffee` tags: adulthood, courtship, partner, social, family
  两人拐进街角的咖啡馆，站到锌皮柜台前。Otto Winter点了牛奶咖啡，Lena要了黑咖啡，十二赫勒一杯。侍者把两杯推过来时，两人几乎同时把钱币按在柜台上，各付各的，谁也没说什么；那一声铜板响，把客气摆得比咖啡还清楚。
  _effects: cash -0.12 (自己那杯黑咖啡（其中0.12克朗记入债务）); relation acquaintance with person-otto-winter; mood -0.030000000000000027_

- **1930.03** `vienna-social-movement.recruitment/join-and-carry` tags: development, social_movement, organization, politics
  Lena在楼梯下面接到一张折成四折的传单。纸上没有署名，只写着下一次集会的地址。Lena去了，在昏暗的屋里报上姓名，成为Sozialdemokratische Arbeiterpartei Österreichs (SDAP)的一员，并答应负责自己所在街区的联络。
  _effects: organization_membership; role; relation acquaintance with person-phase15-Anton-world-vienna-1912_

- **1930.04** `p22-goat-heir::ctx-vienna-reform-1930::milieu-school/goat-sold-at-auction` tags: inheritance, absurd, comic, goat, tenement, legal, rumor, public
  拍卖行把山羊牵上台，槌子落下时，它忽然挣脱绳子，在人群里撞翻了两个花盆。买主说这羊不吉利，只肯出半价；Lena拿到的钱刚够付律师费，楼契被银行收走，天井里只剩一截被啃过的牵绳。买主把它牵走时，它回头看了一眼那栋楼。
  _effects: cash -3 (lawyers and auction fees ate the goat price（其中3克朗记入债务）); state_add debt-bondage state:world-vienna-1912:464; reputation -0.03; relation acquaintance with person-josefine-hofer; flag +goat_sold; mood -0.03999999999999998_

- **1930.05** `hs18-queue.figure::ctx-vienna-reform-1930::milieu-school/pretend-not-to-see` tags: historical_figure, queue, recognition, bread, witness, history, reform, medical
  Lena把头转向橱窗，假装在看一双标价离谱的鞋。Maria Kral从队伍旁走过，靴跟敲得很慢。Arthur Schnitzler往前挪了一步，帽檐仍压着；两人之间隔着三个人和一整条街的沉默。
  _effects: state_add hs18-street-witness state:world-vienna-1912:463; knowledge “保持沉默也需要记住每一个细节。”; flag +ignored_historical_figure_in_queue; mood -0.02999999999999997_

- **1931.01** `state_tick:scholarship-holder/annual-renewal/revoked` tags: scholarship-holder, education, scholarship, means_tested, state, state_tick, night-school
  Lena的奖学金被取消，学校把过去一年的费用开成一张账单。
  _effects: state_transition scholarship-holder -> night-school; cash -60 (back-dated tuition bill（其中58克朗记入债务）)_

- **1931.01** `state_tick:hs18-street-witness/memory-drift/holds` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Lena又把那天的顺序在脑子里走了一遍：先是门响，再是靴子，最后才是那声喊。细节还在，只是每讲一次，旁边就多出一点别人替你补上的颜色。
  _effects: state_parameter hs18-street-witness.certainty 75 -> 77_

- **1931.01** `state_tick:debt-bondage/interest/pay-interest` tags: debt-bondage, debt, work, poverty, legal, state, state_tick
  Lena又付了一年的利息。本金几乎没动，债主的账本却翻到了新一页。
  _effects: cash -3 (debt interest（其中3克朗记入债务）); state_parameter debt-bondage.debt 18 -> 20_

- **1931.01** `task-vienna-writer-researcher.abandon-project/project-sold` tags: knowledge, culture, writing, editor, library, publication, task, task:knowledge
  房租催到门口，Lena把已写的章节卖给一家小报，换了八克朗，够付一个月房租和两顿热饭。长篇锁进抽屉，钥匙搁在盐罐后面，Josefine Hofer问起时他只说“先不提了”，第二天照常去上工。
  _effects: cash 8 (小报买下章节的稿酬); mood -0.06; reputation -0.02; flag +novel_shelved_

- **1931.03** `vienna-social-movement.meeting/quiet-solidarity` tags: development, social_movement, organization, meeting
  Lena没有发言，只把带来的面包分成几份。散会时，一个不认识的女人把她的地址塞给Lena，说那条街还需要有人继续收会费。
  _effects: relation acquaintance with person-emil-weiss; relation acquaintance with person-materialized-world-vienna-1912-23_

- **1932.01** `vienna-life-work-injury/dismissed-after-accident` tags: adulthood, labour, injury, unemployment
  Buchdruckerei Winter & Söhne在事故后第三天通知Lena不用再来了，说岗位不能一直空着。Lena拿着医院证明去工会，诊断书被工头压在抽屉里；治伤花去六克朗，Lena的手还没好，工作先没了，工牌交回去时手指还缠着纱布。
  _effects: unemployment (dismissed after accident); cash -6 (medical treatment（其中6克朗记入债务）)_

- **1932.01** `state_reaction:night-school/reaction-unemployment` tags: night-school, education, night_school, work, state, state_reaction, adulthood, labour
  Lena失业后第一次认真考虑把夜校读到底。
  _effects: flag +night-school:reacted_
  _causes: evt:world-vienna-1912:005831_

- **1932.01** `state_tick:hs18-street-witness/memory-drift/holds` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Lena又把那天的顺序在脑子里走了一遍：先是门响，再是靴子，最后才是那声喊。细节还在，只是每讲一次，旁边就多出一点别人替你补上的颜色。
  _effects: state_parameter hs18-street-witness.certainty 77 -> 79_

- **1932.01** `state_tick:debt-bondage/interest/pay-interest` tags: debt-bondage, debt, work, poverty, legal, state, state_tick
  Lena又付了一年的利息。本金几乎没动，债主的账本却翻到了新一页。
  _effects: cash -3 (debt interest（其中3克朗记入债务）); state_parameter debt-bondage.debt 20 -> 22_

- **1932.01** `state_tick:night-school/annual/held` tags: night-school, education, night_school, work, state, state_tick
  Lena又撑过一年夜校；工位和课桌仍然互相偷时间，但进度在缓慢累积。
  _effects: state_parameter night-school.progress 0 -> 15_

- **1932.01** `r14-edu.archive-assistant::ctx-vienna-university-1912::milieu-university/volunteered-in-vain` tags: education, archive_research, archive, research, university, culture, schooling, student
  Lena在档案馆做了一个冬天没有工钱的义工，编完了三箱信札。Maria Kral说经费没有批下来，只能给一张感谢状。Lena把感谢状夹进笔记本，第二年没有再出现。地下室的钥匙还留在门房，Maria Kral没有去取。
  _effects: mood -0.04999999999999999; flag +volunteered_at_archive; skill_

- **1932.05** `vienna-illness-household.mother-falls/mother-returns-to-work` tags: health, family, home
  Josefine Hofer不肯躺着，第三天就去帮人洗衣挣回一克朗。Lena晚上发现她的腿又肿了，那点工钱抵不上药钱；炉边的药布还没干，又得重新煮。
  _effects: cash 1 (母亲洗衣挣的零钱); mood -0.050000000000000044_

- **1932.07** `statistical_infection`
  Lena在Leopoldstädter Volksschule病倒了，肺炎让身体发热、虚弱，接下来的日子只能卧床。

- **1932.08** `statistical_recovery`
  Lena从肺炎中慢慢恢复，能下床喝水，但身体还虚弱。

- **1933.01** `r14-edu.first-recital::ctx-vienna-reform-1930::milieu-school/successful-recital` tags: education, arts_training, music, performance, reform, medical, schooling, school
  Lena在礼堂弹完最后一支曲子，手还停在琴键上，掌声才响起来。Mitzi Bauer 2坐在第三排，没有鼓掌，只点了一下头。后台，Mitzi Bauer 2递来一杯水，说有几个音踩错了。Lena喝了一口，说知道，下次不会了。酬金五克朗，Lena全买了琴弦。
  _effects: cash 5 (礼堂第三排的掌声); reputation 0.1; role_
  _causes: evt:world-vienna-1912:001686_

- **1933.01** `state_tick:hs18-street-witness/memory-drift/blurs` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Lena忽然想不起那个人先迈的是左脚还是右脚。邻居说自己记得清清楚楚，还补了一个细节；Lena听着，竟分不清那是自己看见的，还是后来听来的。
  _effects: state_parameter hs18-street-witness.certainty 79 -> 71; mood -0.020000000000000018_

- **1933.01** `state_expire:debt-bondage` tags: debt-bondage, debt, work, poverty, legal, state, state_tick, state:debt-bondage
  Lena的「债务束缚」到期；相关安排结束。
  _effects: state_remove debt-bondage state:world-vienna-1912:464_

- **1933.01** `state_tick:night-school/annual/held` tags: night-school, education, night_school, work, state, state_tick
  Lena又撑过一年夜校；工位和课桌仍然互相偷时间，但进度在缓慢累积。
  _effects: state_parameter night-school.progress 15 -> 30_

- **1933.01** `r13-civ.public-lecture::ctx-vienna-university-1912::milieu-university/asked-question` tags: culture, lecture, debate, knowledge, institution, university, schooling, student
  提问时间，Lena站起来问贫民区的水井为什么不在统计表里。礼堂安静了一下，Elisabeth Weiss把眼镜摘下来，说这个问题比今天的讲稿更重要。散场后，他让Lena把地址写在纸角上。
  _effects: reputation 0.04999999999999999; flag +questioned_lecturer_on_water_statistics; relation colleague with person-materialized-world-vienna-1912-77; knowledge “the lecturer wants a list of unregistered wells in the distr”; relation acquaintance with person-materialized-world-vienna-1912-77_

- **1934.01** `r14-edu.boarding-reunion::ctx-vienna-authoritarian-1934::milieu-university/warm-reunion` tags: education, boarding_isolation, reunion, memory, vienna, urban, crisis, war
  Lena在同学会上见到Emil Hofer，两人都老了不少。Emil Hofer说还记得那间靠窗的床，冬天玻璃上结冰，Lena用指甲在上面画过一只鸟。Lena笑起来，说早忘了。散场时，Emil Hofer把电话号码写在纸巾上，Lena放进了口袋。
  _effects: mood 0.06; flag +boarding_reunion; relation friend with person-materialized-world-vienna-1912-43_
  _causes: evt:world-vienna-1912:002153_

- **1934.01** `state_expire:hs18-street-witness` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Lena的「街面上的目击者」到期；相关安排结束。
  _effects: state_remove hs18-street-witness state:world-vienna-1912:463_

- **1934.01** `state_expire:night-school` tags: night-school, education, night_school, work, state, state_tick, state:night-school
  Lena的「夜校生」到期；相关安排结束。
  _effects: state_remove night-school state:world-vienna-1912:478_

- **1934.01** `r13-civ.publish-at-own-cost::ctx-vienna-authoritarian-1934::milieu-school/printer-absconded` tags: culture, publishing, book, debt, reputation, vienna, urban, crisis
  Lena把印费交给Josef Hofer，说好两周取书。到了日子，铺面已经换了锁，隔壁木匠说Josef Hofer连夜搬走了滚筒。Lena站在门口，手里还捏着那张写着“五百册”的收据。
  _effects: cash -10 (自费印刷的账单（其中10克朗记入债务）); mood -0.12000000000000005; flag +printer_absconded_with_printing_fee; knowledge “the printer left with the press and the advance payment”; relation acquaintance with person-materialized-world-vienna-1912-81; relation acquaintance with person-materialized-world-vienna-1912-32_

- **1934.02** `vienna-courtship-courtyard.sunday-walk/separate-coffee` tags: adulthood, courtship, partner, social, family
  两人拐进街角的咖啡馆，站到锌皮柜台前。Ferdinand Kral 3点了牛奶咖啡，Lena要了黑咖啡，十二赫勒一杯。侍者把两杯推过来时，两人几乎同时把钱币按在柜台上，各付各的，谁也没说什么；那一声铜板响，把客气摆得比咖啡还清楚。
  _effects: cash -0.12 (自己那杯黑咖啡（其中0.12克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-89; mood -0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-89_

- **1935.01** `r13-edu.exam-retake::ctx-vienna-authoritarian-1934::milieu-university/same-step-skipped` tags: education, exam, retake, matriculation, persistence, vienna, urban, crisis
  Lena又栽在同一道题上，分数只多了两分。Elisabeth Weiss把卷子摊开，说Lena不是不会，是每次都在同一个步骤跳步。Lena把那张卷子贴在床头，每天睡前看一遍，看到后来连错在哪一行都记得。下一次补考，Lena在那一步停了很久。笔尖顿住。
  _effects: cash -2 (补考名单上的名字（其中2克朗记入债务）); mood -0.09999999999999998; skill_

- **1935.03** `p9-gap-adult-unemployed.dock-morning/dock-watched-tools` tags: adulthood, unemployment, casual_labour, poverty, daily, dock
  河面的雾散尽时，码头上的人走了一半。Lena蹲在石阶上替Elisabeth Weiss守着麻绳和铁钩，看装卸工在跳板上喊号子。汤送来时还烫嘴，豆子沉在碗底。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-77; relation acquaintance with person-materialized-world-vienna-1912-86_

- **1935.10** `vienna-market-debt.pawn-watch/keep-watch-borrow-elsewhere` tags: market, debt, money, home, shop
  你们站在当铺招牌下面，风从巷口灌进来。邻居说他婆娘这个月也要买煤，但两克朗还能匀出来。你把表给他看了一眼，说这表不能当，是爹留下的。他点点头，没再问。
  _effects: cash 2.3 (向邻居借来的现钱); relation acquaintance with person-materialized-world-vienna-1912-77; mood -0.030000000000000027_

- **1936.01** `r13-edu.typing-course::ctx-vienna-authoritarian-1934::milieu-school/forty-words-a-minute` tags: education, typing, office, work, training, vienna, urban, crisis
  Lena的手指在字母盘上找键，找了三个星期才不用低头。结业测试要求每分钟四十个词，Lena打到第三十九个时卡住，深吸一口气，把最后一行打完。Berta Weiss 2掐停秒表，说可以去找工作了，Lena的手还在抖。Berta Weiss 2把秒表收进抽屉。
  _effects: cash 2 (打字机的字母盘); flag +typing_certificate; role; skill; relation acquaintance with person-materialized-world-vienna-1912-90_

- **1936.06** `p9-history-union-political.reform-meeting/reform-study-committee` tags: politics, union, party, meeting, leaflet, police, strike, reform
  会议开到最后，只通过成立一个研究委员会，说三个月后交报告。散会时Lena和Franz Moser在门口商量下一步，有人提议先发动街区签名，把工价和房租的数字附在报告后面。
  _effects: relation colleague with person-materialized-world-vienna-1912-7; mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-60; relation acquaintance with person-materialized-world-vienna-1912-7_

- **1937.01** `r13-edu.literacy-class::ctx-vienna-authoritarian-1934::milieu-school/mocked-by-younger-students` tags: education, literacy, adult_education, class, belonging, vienna, urban, crisis
  Lena被年轻同学笑说口音重，念课文时全班哄笑。Lena把书合上，第二天没来。Elisabeth Weiss托人带话，Lena只说家里忙，其实每天那个时辰都坐在河边，用树枝在泥地上划自己的名字。河水涨起来的那天，Lena在泥地上写的名字被冲掉了，Lena又写了一遍。
  _effects: mood -0.08999999999999997; skill_

- **1937.03** `p9-social-courtship-friendship.friend-intercession/intercession-too-far` tags: courtship, friendship, social, adulthood, reputation, leopoldstadt
  Lena听到Berta Weiss 2把工钱和家底夸过了头，脸沉下来，当晚就照地址找上门去解释。话到嘴边绕成一团，Maria Moser 2的母亲把网兜往桌上一搁，说年轻人有话该早说，不该让旁人来传。Lena站在门里，名声在面包店门口折了一道，Maria Moser 2始终没有出来。
  _effects: reputation -0.04000000000000001; relation acquaintance with person-materialized-world-vienna-1912-72; relation acquaintance with person-materialized-world-vienna-1912-72_

- **1937.05** `p9-gap-adult-unemployed.factory-gate/gate-queue-clash` tags: adulthood, unemployment, casual_labour, poverty, daily, factory, hiring
  招工纸上的工钱写得明白，一天三克朗八十赫勒。Lena怕再等下去名额没了，从人缝里挤到前面，后面的Franz Lechner一把拽住袖子。门房抬头看了看乱糟糟的队伍，把玻璃窗拉上了。
  _effects: reputation -0.03; mood -0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-42_

- **1937.12** `vienna-historical-social-movement.relief-network/open-the-books-again` tags: history, historical_process, social_movement, organization, politics
  墙面粗灰，Lena用图钉钉上分发清单，纸边被穿堂风吹得直抖。老人说自家也在等煤，Elisabeth Weiss把围巾往肩上紧了紧，没接话。有人围上来看，有人转身回屋。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-77; reputation 0.03; skill_

- **1938.01** `vienna-life-anschluss-1938/complies` tags: politics, persecution, 1938
  Berta Hofer 2在街口设了登记桌，要求住户交出姓名、职业和宗教。Lena排队填了表，回家把门牌擦干净。楼里有人连夜搬走，也有人站在阳台上挥手。
  _effects: role; cash -3 (new permits and stamps（其中3克朗记入债务）); condition; relation acquaintance with person-materialized-world-vienna-1912-92_

- **1938.01** `r13-edu.graduation-project::ctx-vienna-authoritarian-1934::milieu-university/shoebox-model` tags: education, university, graduation, design, architecture, vienna, urban, crisis
  Lena买不起模型材料，用旧鞋盒和火柴棍搭了一套。评审说太过简陋，Lena当场把盒子拆开，讲解每一根火柴承什么力。评审没有再说话，给了及格，Elisabeth Weiss在走廊里拍了拍Lena的肩。那张拆开的鞋盒Lena一直留着，压平了夹在图纸里。
  _effects: cash -2 (毕业设计的最后一张图（其中2克朗记入债务）); mood -0.050000000000000044; education higher_

- **1938.03** `vienna-family-childbirth/difficult-birth` tags: family, childbirth, death, lifecycle, birth, state, state:raising-child, raising-child
  Lena难产，接生的人守了两天。孩子最后生下来，取名Luise Winter；Lena一直发烧，医院又收走二十克朗，Friedrich Winter把钟表送进当铺。Lena落下产后虚弱的毛病，抱孩子时手臂发抖，站久了眼前就发黑。
  _effects: birth female; condition; cash -20 (midwife and hospital（其中20克朗记入债务）); state_add raising-child state:world-vienna-1912:882_

- **1938.04** `vienna-courtship-courtyard.letter-answer/reply-at-bakery` tags: adulthood, courtship, partner, social, family, partnership
  第四天，Friedrich Winter的回信从门缝底下塞进来，纸边被门槛磨毛了。Friedrich Winter约Lena星期六早上在街角面包店门口见，说想买一个两赫勒的小圆面包，两个人分。Emil Weiss在楼道里撞见Lena读信，笑着问是不是好消息；Lena把信折回四折，塞进内袋贴着胸口。
  _effects: relation partner with person:evt:world-vienna-1912:001622:child; relation acquaintance with person-emil-weiss; mood 0.07000000000000006_

- **1938.11** `vienna-legacy-worklife.sick-fund/sick-fund.advance-from-fund` tags: legacy, work, family, reform, ordinary_life
  互助金的铁盒上了两把锁，钥匙一把在Lena手里，一把在邻街的面包师那里。取钱时面包师说“月底前要补回来”。药买回来了，雇主那边的人说手续“走流程”，说完就去忙别的。
  _effects: cash -2 (从互助金垫付药费（其中2克朗记入债务）); health 0.05999999999999999 (及时买到药); relation acquaintance with person-emil-weiss; relation acquaintance with person-materialized-world-vienna-1912-104_

- **1938.11** `vienna-social-movement.meeting/quiet-solidarity` tags: development, social_movement, organization, meeting
  Lena没有发言，只把带来的面包分成几份。散会时，一个不认识的女人把她的地址塞给Lena，说那条街还需要有人继续收会费。
  _effects: relation acquaintance with person-emil-weiss; relation acquaintance with person-materialized-world-vienna-1912-29_

- **1939.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Lena被叫到学校，老师说Luise Winter这学期总在课上看窗外。回家的路上，Lena没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 20 -> 15; state_parameter raising-child.caregiverBurden 45 -> 50; cash -2 (extra lessons and replacement pencils（其中2克朗记入债务）); mood -0.030000000000000027_

- **1939.01** `p10-migration-tasks.return-home/return-ticket-refunded` tags: adulthood, migration, housing, family, travel, task, return, train
  动身前一天，城里的作坊捎话让他去试工。他把车票退掉，扣了些手续费，拎着工具袋去了作坊，在车床边站了一整天。哥哥的信还压在枕头下，他回了一封，说再等等看。
  _effects: cash -1 (退票扣除的手续费（其中1克朗记入债务）); mood 0.040000000000000036; relation kin with person-phase15-Anton-world-vienna-1912; knowledge “城里那家作坊开工，试工一天给两克朗五十赫勒，转正看手艺”; relation acquaintance with person-materialized-world-vienna-1912-39; relation acquaintance with person-materialized-world-vienna-1912-37_

- **1939.03** `ml18-business.bottle-cap-patent::ctx-vienna-authoritarian-1934::milieu-university/license-it-and-keep-the-patent` tags: business, patent, money, windfall, invention, comic, vienna, urban
  Lena没有卖断，而是和Sozialdemokratische Arbeiterpartei Österreichs (SDAP)签了按瓶抽成的许可：每卖出一千瓶，付两克朗。第一年只卖了四千瓶，Lena拿到八克朗，却保住了专利。Katharina Moser 2在许可书上盖了一个小章，说这种条款以后会值钱；Lena把章看了一会儿，没敢笑。
  _effects: cash 8 (first royalty payment on the bottle-cap patent); state_add ml18-sudden-fortune state:world-vienna-1912:933; skill; flag +licensed_patent; mood 0.050000000000000044; flag +sudden_fortune; reputation 0.01999999999999999; mood 0.030000000000000027_

- **1939.06** `state_reaction:ml18-sudden-fortune/a-relative-remembers` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  一个多年没走动的亲戚提着一盒点心上门，先问Lena的身体，再问那笔钱是怎么来的。临走时他说起小时候替Lena家垫过一冬天的煤钱，数字记不清了，但意思很清楚。
  _effects: state_parameter ml18-sudden-fortune.claims 0 -> 1; flag +windfall_claim_by_relative; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:010372_

- **1939.07** `vienna-social-movement.aftermath/keep-the-list` tags: development, social_movement, organization, consequence
  Lena把第二区夜班出租合作社的名单藏进缝纫机抽屉的夹层。名单上有二十几个名字，其中两个已经搬走，一个被工厂开除。Lena没有把最后一行划掉。
  _effects: flag +movement_list_holder; reputation 0.03_

- **1939.11** `vienna-legacy-worklife.union-office/union-office.enroll-first` tags: legacy, work, family, reform, ordinary_life
  来问入会的是个瘦高的年轻人，帽檐捏在手里，说自己在第十六区的织布厂做了半年。Lena把名册翻到空白页，蘸水笔尖在“住址”那栏停了一下，等他报出街名。老成员在角落里把账本合上，声音很轻。
  _effects: cash 1 (新会员的入会费先记在桌上); relation acquaintance with person-materialized-world-vienna-1912-90; skill; relation acquaintance with person-materialized-world-vienna-1912-73_

- **1940.01** `vienna-family-childbirth/son-born` tags: family, childbirth, death, lifecycle, birth, state, state:raising-child, raising-child
  Lena在Leopoldstädter Zinshaus, gemeinsamer Gang生下一个男婴，取名Alois Winter。工友凑的钱抵了一部分，家里还是从糖罐里数出六克朗给接生的人；Friedrich Winter把消息带到工厂，回来时把唯一的摇篮重新刷了一遍，Lena躺在床上出了一身虚汗。
  _effects: birth male; cash -6 (midwife fee（其中6克朗记入债务）); state_add raising-child state:world-vienna-1912:932_

- **1940.01** `state_tick:ml18-sudden-fortune/fortune-year/money-slips-away` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  钱在一年里薄了一层：屋顶要修，姐夫来借，彩票站的老主顾说有个稳赚的买卖。Lena把账本翻到最后一页，发现写下的支出比记得的多出四克朗；窗外有人在敲铁皮，声音像在催账。
  _effects: state_parameter ml18-sudden-fortune.principal 20 -> 15; state_parameter ml18-sudden-fortune.spent 0 -> 5; cash -1 (the account does not balance); mood -0.020000000000000018_

- **1940.01** `kernel-culture.museum-library::ctx-vienna-authoritarian-1934::milieu-university/civic-library-closed` tags: culture, library, museum, research, knowledge, vienna, urban, crisis
  她到得太晚，阅览室已经关门。Otto Lechner隔着玻璃摆手，她站在台阶上看了一会儿海报，发现下周有一场讲座；回家后，她把要查的问题重新列了一遍。她把问题清单折好，决定下周讲座后再来一次。
  _effects: flag +library_access_refused; knowledge “图书馆下周有一场讲座，讲座后可能可以申请调阅闭架书”; relation acquaintance with person-materialized-world-vienna-1912-39; cash -0.2 (白跑一趟的车钱); reputation -0.010000000000000009_

- **1940.08** `vienna-medical-treatment.night-fever/corner-doctor` tags: health, medical, family, money
  施特劳斯医生用酒精棉擦手，把药粉倒进小纸袋，折口时指甲掐出印子。他说夜里别再喝醋水，那东西烧胃。Elisabeth Weiss把炉火拨旺，在灶上坐了一壶水，答应第二天替Lena去铺子里告假。
  _effects: cash -4 (医生出诊费和药费（其中4克朗记入债务）); health 0.05 (药粉和糖浆缓解症状); relation friend with person-materialized-world-vienna-1912-77_

- **1941.01** `vienna-family-childbirth/daughter-born` tags: family, childbirth, death, lifecycle, birth, state, state:raising-child, raising-child
  Lena在Leopoldstädter Zinshaus, gemeinsamer Gang生下一个女婴，取名Elisabeth Winter。接生的人收六克朗，Friedrich Winter在走廊烧水，邻居借来一只摇篮；Lena起身时眼前发黑，三天后腰还像断了一样，孩子哭声响亮，把屋里的冷气都顶了回去。
  _effects: birth female; cash -6 (midwife fee（其中6克朗记入债务）); state_add raising-child state:world-vienna-1912:981_

- **1941.01** `ml18-tax.audit-of-the-windfall::ctx-vienna-authoritarian-1934::milieu-university/hide-the-ledger` tags: tax, legal, money, windfall, bureaucracy, comic, vienna, urban
  Franz Huber把账本塞进钢琴后面的夹层，说等风声过去再拿出来。Hermann Moser 2第二次来时带了一个记录员和一张搜查令；钢琴被挪开时，琴键响了一串不成调的音。Lena看见黑皮本翻开的那一页上，已经用红笔圈出了三笔利息。
  _effects: cash -10 (the accountant's fee for hiding the ledger（其中10克朗记入债务）); state_add under-investigation state:world-vienna-1912:982; relation colleague with person-materialized-world-vienna-1912-55; flag +tax_ledger_hidden; knowledge “黑皮本上被红笔圈出的三笔利息都没有报税。”; mood -0.050000000000000044; relation acquaintance with person-materialized-world-vienna-1912-55_

- **1941.01** `kernel-family.housing-relative::ctx-vienna-authoritarian-1934::milieu-tenement/housing-relative.lodged-elsewhere` tags: task, task:family, family, housing, relatives, godparent, guardian, household
  Lena在楼里替教父Grete Lechner问了一圈，最后在洗衣妇家找到一张空床，每月三克朗。Grete Lechner把箱子搬过去，Lena替他垫了第一个月的房租；两人在楼梯口分开，Grete Lechner说等找到工就还。床板短了一截，箱子只能竖着放。
  _effects: cash -3 (first month’s bed rent for the relative); relation kin with person-materialized-world-vienna-1912-62; role; role; flag +relative_lodged_elsewhere; knowledge “洗衣妇家有一张空床，每月三克朗。”_

- **1941.02** `p9-social-courtship-friendship.opened-letter/opened-letter-cold-reply` tags: courtship, friendship, social, adulthood, reputation, leopoldstadt
  Lena信了听来的话，把回信写得又短又冷，只问对方家里到底嫌哪一样，写完封了口，第二天一早塞进街角的邮筒。此后走廊里碰见Berta Winter，两边都只点头，话绕开信的事走；Lena与Luise Huber之间那点热乎气，也被这四行字压凉了。
  _effects: mood -0.06000000000000005; relation acquaintance with person-materialized-world-vienna-1912-112; relation acquaintance with person-materialized-world-vienna-1912-112_

- **1941.11** `vienna-church-community.tenement-prayer/rent-prayer-help` tags: faith, social, family, home
  Lena在楼梯间守夜时，邻居说起楼下老太太病重。
  _effects: condition; food; relation acquaintance with person-materialized-world-vienna-1912-114; relation acquaintance with person-materialized-world-vienna-1912-114_

- **1942.01** `hist15-occ.requisition-notice::ctx-vienna-authoritarian-1934::milieu-tenement/hand-over-the-grain` tags: occupation, requisition, shortage, institution, history, family, vienna, urban
  Katharina Huber把征用单按在柜台上，Lena家里的两袋面粉被划走一袋，换回一张盖蓝章的收据。Katharina Huber说下周还会来，如果地窖里再翻出粮食，收据就不作数了。
  _effects: cash -4 (被征用的粮食折价（其中4克朗记入债务）); flag +requisition_receipt; knowledge “征用收据只在下一批检查前有效。”; relation acquaintance with person-materialized-world-vienna-1912-102; relation acquaintance with person-materialized-world-vienna-1912-58_

- **1942.01** `state_expire:under-investigation` tags: under-investigation, legal, police, investigation, risk, state, state_tick, state:under-investigation
  Lena的「被调查」到期；相关安排结束。
  _effects: state_remove under-investigation state:world-vienna-1912:982_

- **1942.01** `r13-civ.help-refugee::ctx-vienna-authoritarian-1934::milieu-tenement/sheltered-two-nights` tags: social, refugee, shelter, war, trust, vienna, urban, crisis
  Berta Bauer 2站在走廊尽头，脚边一只用绳子捆住的纸箱，问能不能借宿两晚。Lena把厨房的折叠床打开，又烧了一壶水。夜里，Berta Bauer 2在梦里说了一种她听不懂的话，Lena把门闩又检查了一遍。
  _effects: cash -2 (走廊里的陌生口音（其中2克朗记入债务）); food; flag +sheltered_refugee_two_nights; relation friend with person-materialized-world-vienna-1912-27; relation acquaintance with person-materialized-world-vienna-1912-27; relation acquaintance with person-materialized-world-vienna-1912-105_

- **1942.03** `p9-social-tenement-neighbors.gramophone-wall/gramophone-wall.cotton-in-ears` tags: housing, neighbors, tenement, daily, money, reputation
  Lena忍到天亮，第二天去药房买了五分钱的棉花，撕成两小团塞在耳里。夜里的进行曲还剩一点闷响，翻个身也就过去了。此后在楼梯间遇见Berta Moser只是点头，再没有进过那家的门。
  _effects: cash -0.05 (在药房买棉花塞耳朵（其中0.05克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-114_

- **1942.10** `p9-social-family-conflict-care.cousin-bed/give-camp-bed-and-board` tags: family, care, siblings, inheritance, housing, money
  Lena让Otto Berg 2睡厨房的行军床，讲好每月三克朗饭钱，煤钱另算。白天把铺盖卷起来靠在碗柜边，晚上再铺开；厨房多一个人，面包和煤都下去得快，伙食上短了两克朗。看门人再来问时，Lena把藤箱指过去，说人住下了，灯油钱也记在账上。
  _effects: cash 3 (表亲交来的饭钱); relation kin with person-materialized-world-vienna-1912-100; flag +kin_staying_over; relation acquaintance with person-materialized-world-vienna-1912-100_

- **1942.11** `p9-gap-adult-ordinary-day.organ-grinder/organ-grinder.poured-water` tags: adulthood, daily, leisure, neighborhood, ordinary, music, street
  泼水的女人探出头说了声对不起，扔下一枚十赫勒的银币，硬币在湿石板上转了两圈。乐师捡起来对着光看了看，气消了一半，重新摇起琴。猴子抖了抖毛，水珠溅了Lena一手。
  _effects: mood -0.020000000000000018; relation acquaintance with person-alois-lechner_

- **1942.12** `p9-social-courtship-friendship.returned-sugar-box/sugar-box-ask-reason` tags: courtship, friendship, social, adulthood, reputation, leopoldstadt
  Lena把糖盒原样收进柜子，糖纸没动，第二天一早去请介绍人再去问一次原因。介绍人傍晚回来，站在走廊里压低声音说，对方家里嫌这边没有自己的灶。Lena把铁皮糖盒放进碗柜最上层，盖子上那束花磕掉了一块漆，屋里静得只剩水壶在响。
  _effects: mood -0.040000000000000036; relation acquaintance with person-materialized-world-vienna-1912-72; relation acquaintance with person-materialized-world-vienna-1912-103_

- **1943.01** `r14-edu.music-teacher-legacy::ctx-vienna-authoritarian-1934::milieu-university/teacher-forgot` tags: education, arts_training, music, legacy, vienna, urban, crisis, war
  Lena在音乐厅门口遇见Mitzi Bauer 2，叫了一声。Mitzi Bauer 2停下，看了半天，说抱歉，记不清了。Lena提起琴房和那本旧练习曲，Mitzi Bauer 2点点头，说教过的学生太多。两人一起走了一段，到路口分开，Mitzi Bauer 2往左，Lena往右。
  _effects: mood -0.039999999999999813; flag +forgotten_by_music_teacher; relation acquaintance with person-materialized-world-vienna-1912-36_
  _causes: evt:world-vienna-1912:006157_

- **1943.01** `r14-edu.boarding-reunion::ctx-vienna-authoritarian-1934::milieu-university/warm-reunion` tags: education, boarding_isolation, reunion, memory, vienna, urban, crisis, war
  Lena在同学会上见到Emil Hofer，两人都老了不少。Emil Hofer说还记得那间靠窗的床，冬天玻璃上结冰，Lena用指甲在上面画过一只鸟。Lena笑起来，说早忘了。散场时，Emil Hofer把电话号码写在纸巾上，Lena放进了口袋。
  _effects: mood 0.06000000000000005; relation friend with person-materialized-world-vienna-1912-43_
  _causes: evt:world-vienna-1912:006158_

- **1943.01** `r13-civ.arrange-move::ctx-vienna-authoritarian-1934::milieu-tenement/trunk-withheld` tags: social, housing, moving, landlord, cash, vienna, urban, crisis
  Lena把最后一箱书搬下楼时，Ferdinand Hofer堵在门口，说墙皮被蹭掉一块，箱子先留下。Lena说要赶车，Ferdinand Hofer说那就把修墙的钱付了。板车在巷口按铃，Lena只抱走了装证件的木盒。
  _effects: cash -2 (板车与押金收据); flag +landlord_withheld_trunk; relation rival with person-materialized-world-vienna-1912-120; knowledge “the landlord keeps the trunk against a wall repair claim”; relation acquaintance with person-materialized-world-vienna-1912-120_

- **1943.03** `vienna-parish-aid.sick-call/sick-call.help-in` tags: faith, parish, mutual_aid, poverty, family
  Lena和Ferdinand Lechner 2一起上楼，门没锁，屋里一股酸味。病人裹着毯子坐在床沿咳嗽，炉子只剩灰。Lena去楼下讨了几块煤核，蹲着把火生起来，又用带来的面粉搅了一小锅稀粥。药粉冲开，碗底沉着白渣，Lena先垫了药钱，说以后再说。
  _effects: cash -0.6 (替病人垫上药粉钱（其中0.6克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-24; flag +parish_sick_visitor_

- **1943.03** `vienna-women-housework.piecework-bundle/piecework.overnight` tags: gender, housework, home, labour, family
  Lena点着煤油灯缝到后半夜，把一捆领子全做完了。针脚密是密，可天亮时她看东西重影，手指被针扎了三回。星期六交活，Anton Kral量了量尺寸，收下整捆，数出七十五赫勒推过桌面。
  _effects: cash 0.75 (交了一整捆衬衫领子的计件工钱); mood 0.020000000000000018_

- **1943.07** `p9-social-tenement-neighbors.stove-and-line/stove-and-line.first-come-order` tags: housing, neighbors, tenement, daily, money, reputation
  Lena把四只洗衣盆按到厨房的先后排成一列，用粉笔在门后写下各家的时辰：六点到七点半、七点半到九点。Alois Kral 2起初嘟囔，看到自家名字排在第二格，也就把水壶提了回去。晾衣绳按同样次序分两段，谁家的床单先上谁先占。
  _effects: mood 0.040000000000000036; relation acquaintance with person-materialized-world-vienna-1912-60_

- **1944.01** `hist15-occ.work-permit::ctx-vienna-authoritarian-1934::milieu-tenement/permit-granted` tags: occupation, work, permit, institution, shortage, history, vienna, urban
  Hermann Winter 2在通行证上盖了章，又用铅笔在角落写了一个日期。Lena拿到许可，可以去城西的修配厂上工；走出劳动局时，Lena把证件摸了三遍，确认它还在口袋里。
  _effects: cash -2 (通行证手续费（其中2克朗记入债务）); role; flag +work_permit_granted; knowledge “城西修配厂只认盖蓝章的通行证。”; relation acquaintance with person-materialized-world-vienna-1912-107_

- **1944.01** `r14-spec.ship-passage::ctx-vienna-authoritarian-1934::milieu-tenement/the-ticket-given-away` tags: migration, ship, passage, departure, fare, vienna, urban, crisis
  Lena把船票让给Franz Moser，说自己再等一年。Franz Moser在上船前把地址写在烟盒背面；十八克朗的票只退回八克朗，Lena损失十克朗，字被雨打湿，回家后只剩一半。Lena回到公寓，Friedrich Berg在楼下问是不是不走了；Lena说是，先不走了。当天夜里，Lena把那只窄包重新塞回床底。
  _effects: cash -10 (统舱里的船票（其中6克朗记入债务）); mood -0.040000000000000036; flag +spec14_stayed_behind_

- **1944.08** `vienna-social-movement.meeting/speak-and-organize` tags: development, social_movement, organization, meeting
  Lena在后屋的会议上报出自己街区的名字：谁家缺煤，谁被房东催租，谁知道哪间印刷厂还在招人。Wiener Psychoanalytische Vereinigung把这些事记进一本旧账本，散会时每个人带走一叠更小的纸条。
  _effects: skill; reputation 0.01999999999999999_

- **1944.12** `vienna-market-household.soup-kitchen/soup-kitchen.sell` tags: home, market, food, social
  鞋匠敲后门问有没有热汤，Lena把剩下的半锅倒进他的罐子里，收下两个十字币。Grete Lechner提着空碗上来时，只看见Lena把硬币塞进围裙口袋。
  _effects: cash 2 (卖出半锅扁豆汤); relation acquaintance with person-materialized-world-vienna-1912-62_

- **1945.01** `vienna-life-1945-liberation/displaced` tags: war, liberation, 1945, migration
  炮火把Lena住的那条街烧掉一半。Lena跟着人群走到城外，在临时收容所登记，床位上铺的是发霉的稻草。
  _effects: move place-klosterneuburg-aunt-house; role; cash -5 (temporary shelter)_

- **1945.01** `r13-work.open-shop::ctx-vienna-authoritarian-1934::milieu-tenement/licence-refused` tags: commerce, shop, capital, licence, risk, vienna, urban, crisis
  Lena把申请递进执照窗口，Anton Bauer的房契却少一个签章。办事员把材料推回来，说铺面不能用来做食品生意。押金已经付了，卷帘门开了半天又拉下去；Lena坐在空铺子里，把货单折成一只小船。
  _effects: cash -4 (卷帘门上的第一块木牌); mood -0.010000000000000009; flag +work13_shop_licence_refused; knowledge “the lease lacks a signature needed for a food licence”; relation acquaintance with person-materialized-world-vienna-1912-119_

- **1945.01** `r13-rel.secret-courtship::ctx-vienna-postwar-1945::milieu-tenement/letters-under-the-bread` tags: relationship, courtship, secret, risk, partner, vienna, urban, postwar
  Lena和Franz Lechner 2约在后门见面，一次在送奶车走后，一次在晚祷钟响时。Franz Lechner 2把信藏在面包底下，Lena把回信塞进空奶瓶。Katharina Berg替他们望风，收一枚铜板，从不多问。
  _effects: flag +secret_courtship; role; relation partner with person-materialized-world-vienna-1912-121; relation colleague with person:evt:world-vienna-1912:004615:child; relation acquaintance with person-materialized-world-vienna-1912-121_

- **1945.03** `vienna-medical-treatment.night-fever/sweat-it-out` tags: health, medical, family, money, injury
  醋水的酸味混着汗气，屋子小得转不开身。Hermann Winter 2把布拧到不滴水，敷上去时Lena打了个激灵。窗外送奶车吱呀碾过石板，她才想起自己家的炉子还灭着。
  _effects: health -0.039999999999999994 (高烧硬熬伤身); condition; relation friend with person-materialized-world-vienna-1912-107_

- **1945.07** `vienna-family-childbirth/daughter-born` tags: family, childbirth, death, lifecycle, birth, injury, state, state:raising-child
  Lena在Leopoldstädter Zinshaus, gemeinsamer Gang生下一个女婴，取名Berta 2。接生的人收六克朗，Franz Lechner 2在走廊烧水，邻居借来一只摇篮；Lena起身时眼前发黑，三天后腰还像断了一样，孩子哭声响亮，把屋里的冷气都顶了回去。
  _effects: birth female; health -0.05999999999999998 (childbirth); cash -6 (midwife fee); relation acquaintance with person-materialized-world-vienna-1912-10; state_add raising-child state:world-vienna-1912:1223_

- **1945.07** `state_reaction:mb17-remittance-web/family-emergency` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  故乡来了一封电报，说屋顶塌了一角，老人暂时住到邻居家。Lena当晚就去邮局，把本来留着交学费的钱先汇了出去；回家后，他把墙上的缴费单取下来，折好放进抽屉。
  _effects: state_parameter mb17-remittance-web.obligation 56 -> 66; state_parameter mb17-remittance-web.arrears 4 -> 5; cash -3 (an emergency money order sent home)_
  _causes: evt:world-vienna-1912:013940_

- **1945.10** `vienna-women-housework.wash-day/wash-day.rush` tags: gender, housework, home, labour, family, injury
  木盆边的水渍映着天光，Lena跪在石阶上揉搓床单，肘弯发酸。晾绳上的湿布滴答作响，Berta Moser探身把自家被单也挂上去，两人没多说话。
  _effects: health -0.020000000000000004 (长时间浸在碱水里，手部皮肤开裂); relation acquaintance with person-materialized-world-vienna-1912-114_

- **1946.01** `state_tick:mb17-remittance-web/remittance-year/posted-in-time` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  Lena把工钱摊在桌上，先数出房租和煤钱，再把剩下的换成一张汇款单。邮局职员在单子上敲了章，说“两周能到”；回家的路上，他买了一张最便宜的明信片，写了两行字又划掉一行。
  _effects: cash -2 (the money order and postage); state_parameter mb17-remittance-web.supportSent 6 -> 8; state_parameter mb17-remittance-web.arrears 5 -> 4; state_parameter mb17-remittance-web.obligation 66 -> 63; mood 0.010000000000000009_

- **1946.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Lena被叫到学校，老师说Berta 2这学期总在课上看窗外。回家的路上，Lena没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 20 -> 15; state_parameter raising-child.caregiverBurden 45 -> 50; cash -2 (extra lessons and replacement pencils); mood -0.010000000000000009_

- **1946.01** `kernel-family.housing-relative::ctx-vienna-postwar-1945::milieu-tenement/housing-relative.taken-in` tags: task, task:family, family, housing, relatives, godparent, guardian, household
  教父Ferdinand Kral 3的房东把阁楼收回，Lena把自家床边的空地量了量，还是让教父把箱子搬进来。Lena在床和墙之间搭了一块木板，夜里翻身会碰到箱子；房东来收租时看见多了一个人，说下个月要加两克朗。
  _effects: household; relation kin with person-materialized-world-vienna-1912-89; role; cash -5 (extra rent, coal and food for the relative); role; flag +overcrowded_flat; knowledge “房东说添一个人住，下个月要加两克朗房租。”_

- **1946.01** `p9-social-courtship-friendship.friend-intercession/intercession-concert-ticket` tags: courtship, friendship, social, adulthood, reputation, leopoldstadt
  Lena不再让Grete Lechner 2传话，托其带去一张星期天音乐会的站票，花了一克朗二十赫勒，位置在柱子后头。票上不写多余的字，只说若不方便，票留着也无妨。Grete Lechner 2把票揣进衬衫内袋，Lena则把找回来的铜板一枚枚放进铁盒，等一个回音。
  _effects: cash -1.2 (音乐会站票一张); relation acquaintance with person:evt:world-vienna-1912:000945:child_

- **1946.02** `state_reaction:mb17-remittance-web/border-closes` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  边境又收紧了，往故乡的列车要换乘三次。邮局说汇款还能走，但信可能压在路上；Lena还是把两张单子一起递进窗口，像把一句话交给一个不保证送达的人。
  _effects: state_parameter mb17-remittance-web.arrears 4 -> 6; flag +mb17_border_slow_letters_
  _causes: evt:world-vienna-1912:014558_

- **1946.11** `vienna-parish-aid.funeral-society/funeral-society.defer` tags: faith, parish, mutual_aid, poverty, family
  Lena把抽屉拉开又推上，铜币在木板上滚了半圈。Ferdinand Kral 3合上本子说，拖欠的人不少，可规矩就是规矩。她走下两级台阶又回头提醒，发工钱那天她会在教堂侧门等着。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-89_

- **1947.01** `vienna-life-injury-recovery/clinic-treatment` tags: health, work, family
  Lena在受伤后的第三天去了诊所。医生清洗伤口、换药，收下诊费，嘱咐不要急着回机器旁。Lena把药方折好，回家路上买了纱布。
  _effects: health 0.05000000000000002 (wound treatment); cash -8 (clinic and bandages); condition_
  _causes: evt:world-vienna-1912:013937_

- **1947.01** `vienna-family-divorce/separate-under-one-roof` tags: family, marriage, divorce, housing, lifecycle, separation
  Lena和Franz Lechner 2把床铺分开，米和煤也各算各的。两人仍住在Leopoldstädter Zinshaus, gemeinsamer Gang，因为谁都没有钱再租一间房；孩子在两床之间来回，三克朗买了隔开的锅碗和煤油，家里从此有两本账，夜里两盏灯先后熄灭。
  _effects: relation_end partner with person-materialized-world-vienna-1912-121; mood -0.08; cash -3 (separate household goods)_

- **1947.01** `r15-fam.school-registration::ctx-vienna-postwar-1945::milieu-university/half-scholarship` tags: family, child, school, education, school_child, vienna, urban, postwar
  校长看了Elisabeth Winter的算术本，说可以免掉一半学费。Lena在办公室里坐了很久，反复确认“不是借的”；出来时，Elisabeth Winter正在操场上追一只皮球，鞋底已经磨穿了。
  _effects: state_parameter raising-child.caregiverBurden 50 -> 38; state_parameter raising-child.schoolProgress 15 -> 32; state_parameter raising-child.childConfidence 55 -> 65; state_parameter raising-child.careDebt 0 -> 0; state_parameter raising-child.schoolEnrolled false -> true; state_parameter raising-child.leftHome false -> false; cash 2 (the first instalment of the school grant); reputation 0.03_

- **1947.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Berta 2这周主动擦了黑板。Lena把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 32 -> 35; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:014702_

- **1947.01** `r13-fam.foster-child::ctx-vienna-postwar-1945::milieu-tenement::foster-postwar/orphanage-full` tags: task, care, foster, child, household, orphan, vienna, urban
  孤儿院的院长说孩子太多，床不够，让Lena再等一个月。Emil把Luise Winter领回临时收容所，Lena每周去看一次。孩子渐渐肯说话了，却总是在Lena起身时抓住衣角，问下一次什么时候来。
  _effects: cash -2 (门口多出来的一双小鞋); condition; flag +waited_for_foster_placement; relation acquaintance with person:evt:world-vienna-1912:009769:child_

- **1947.07** `statistical_infection`
  Lena在Leopoldstädter Zinshaus, gemeinsamer Gang病倒了，肺炎让身体发热、虚弱，接下来的日子只能卧床。

- **1947.09** `statistical_illness_worsened`
  Lena的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1947.12** `statistical_illness_worsened`
  Lena的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1948.01** `statistical_death/pneumonia` tags: death
  Lena在Leopoldstädter Zinshaus, gemeinsamer Gang发起高烧，咳嗽越来越深。邻居帮忙去请医生，医生到时只留下药粉和一张账单；几天后呼吸变得很浅。Franz Lechner 2在场。
  _effects: death (肺炎)_
## Anton

Born 1912.01, died 1942.01 (age 30).
Education: apprenticeship 4; occupation: none; roles: infant, child, pupil, child_worker, library_borrower, caretaker, apprentice, movement_member, separated, office:师傅, office:放映员, journeyman, parish_petitioner, shelter_resident, refugee.

### State snapshot
- p22-family-legend [person] (ended 1918.1: duration expired) parameters={"warmth":40,"secrecy":90,"danger":58,"promise":42} links={} ticks=3
- yf18-first-awakening [person] (ended 1929.1: duration expired) parameters={"intensity":79,"nerve":40,"talk":17,"reciprocated":true,"secret":true} links={"beloved":"Josef"} ticks=4
- failed-apprentice [person] (ended 1936.1: duration expired) parameters={} links={} ticks=1
- pc20-second-chance [person] (ended 1934.1: replaced_by:pc20-second-chance) parameters={"credibility":48,"debt":43,"hope":65,"suspicion":38} links={} ticks=1
- oj18-odd-apprenticeship [person] (ended 1935.1: duration expired) parameters={"trust":50,"strangeKnowledge":38,"reliability":50,"nightsWorked":48,"post":"放映学徒"} links={} ticks=3
- p22-wild-fortune [person] (ended 1936.1: duration expired) parameters={"height":64,"absurdity":68,"witnesses":75,"fragility":57} links={} ticks=2
- p22-scandal-engine [person] (ended 1936.1: duration expired) parameters={"heat":48,"reach":68,"leverage":55,"shame":45} links={} ticks=2
- pc20-second-chance [person] (ended 1937.1: duration expired) parameters={"credibility":42,"debt":55,"hope":33,"suspicion":40} links={} ticks=3
- public-scandal [person] (ended 1936.1: duration expired) parameters={} links={} ticks=1
- fm17-miracle-witness [person] (ended 1937.1: duration expired) parameters={"certainty":59,"attention":40,"obligation":10} links={} ticks=2

### 139 subject events

- **1913.01** `vienna-life-infant-first-smile/smile-at-the-lamp` tags: infancy, family, first, warm
  Josefine Hofer把Anton抱到窗边，煤汽灯罩上有一圈晃动的光。孩子盯着看了很久，忽然笑出声，口水滴在Josefine Hofer的袖口上。屋里的人都停了一下，像是听见了什么了不起的消息。
  _effects: mood 0.04; health 0.010000000000000009 (a good day)_

- **1913.04** `p22-strange-cradle-secret::ctx-vienna-1912::milieu-tenement/the-bundle-in-the-lining` tags: infancy, family, cradle, secret, inheritance, strange, dark, drama
  Josefine Hofer拆洗摇篮衬里时，摸到一个硬角：一小块油布，里面包着一张当票和一缕头发，当票上的日期已经模糊。Josefine Hofer看了很久，又把油布缝回去，针脚比原来更密。
  _effects: state_add p22-family-legend state:world-vienna-1912:31; mood -0.03; flag +cradle_bundle; knowledge “摇篮衬里藏着一张当票和一缕头发。”_

- **1913.04** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Anton家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 80 -> 84; state_parameter p22-family-legend.warmth 35 -> 37; mood 0.01_
  _causes: evt:world-vienna-1912:000253_

- **1913.07** `vienna-life-toddler-first-words/first-word-more` tags: infancy, family, first, comic
  Anton把空碗推回Josefine Hofer面前，清清楚楚地说了一个字：“还要。”Josefine Hofer愣住，随后把锅底最后一点糊刮进碗里。孩子学会了用一句话让世界再转一圈。
  _effects: skill; mood 0.03_

- **1913.10** `iw18-infancy.first-word::ctx-vienna-1912::milieu-tenement/the-dog-gets-the-first-word` tags: infancy, first_word, memory, family, wonder, eerie, vienna, urban
  Anton追着炉边的狗爬了半间屋，忽然拍着地板喊出狗的名字。狗吓得钻到床下，Josefine Hofer笑得把水壶都放下了；邻居在门外问出了什么事。那天晚上，家里给狗多留了半块面包。
  _effects: mood 0.04000000000000001; food; flag +first_word_dog_name_

- **1914.01** `vienna-life-toddler-wrong-cradle/the-neighbour-is-mistaken` tags: infancy, family, rumour, identity, comic, drama
  Josefine Hofer把被子摊在桌上，指着上面的补丁说这是外婆的针脚。Anna Moser看了半天，承认自己认错了；Anton在旁边把一只木勺敲得咚咚响，像在给这场争论判案。
  _effects: relation acquaintance with person-anna-moser; mood 0.02; skill_

- **1914.01** `state_tick:p22-family-legend/the-story-changes-hands/a-detail-goes-missing` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，故事里最要紧的那件东西不见了：先是名字，后来是地点。Anton问起时，大人说“你记错了”；可柜子最底层那只空盒子，谁也没有扔，锁却换过了，钥匙也不见了。
  _effects: state_parameter p22-family-legend.secrecy 84 -> 88; state_parameter p22-family-legend.danger 55 -> 58; state_parameter p22-family-legend.warmth 37 -> 35; mood -0.01_

- **1914.05** `statistical_infection`
  Anton在Hofer-Wohnung, Leopoldstadt病倒了，痢疾让身体发热、虚弱，接下来的日子只能卧床。

- **1914.06** `statistical_illness_worsened`
  Anton的痢疾没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1914.09** `statistical_illness_worsened`
  Anton的痢疾没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1914.11** `statistical_recovery`
  Anton熬过了这场痢疾，能坐起来喝一点汤，但身体还很虚。

- **1915.01** `vienna-life-child-family-legend/happy-legend` tags: childhood, family, secret, story
  Josefine Hofer讲起自己小时候在乡下追一只白鹅，追到河边，鹅没追到，倒捡回一篮鸭蛋。Anton笑得从凳子上滑下来，Josefine Hofer也跟着笑，说这个家不是只有欠账和葬礼。
  _effects: mood 0.04; mood 0.02_

- **1915.11** `statistical_infection`
  Anton在Leopoldstädter Zinshaus, gemeinsamer Gang病倒了，痢疾让身体发热、虚弱，接下来的日子只能卧床。

- **1915.12** `statistical_illness_worsened`
  Anton的痢疾没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1916.01** `vienna-life-child-first-friend/stolen-marble` tags: childhood, friendship, family, comic
  Hedwig把Anton的玻璃弹珠藏进鞋里，被当场看见。Hedwig说只是“替你拿着”，Anton没有揭穿，也没有再拿出第二颗。两个人蹲在墙根，把一只蚂蚁看了很久，谁也没有先回家。
  _effects: relation friend with person-phase15-Hedwig-world-vienna-1912; skill; mood -0.010000000000000002_

- **1916.01** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Anton家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 88 -> 92; state_parameter p22-family-legend.warmth 35 -> 37; mood 0.010000000000000002_
  _causes: evt:world-vienna-1912:000632_

- **1916.01** `state_tick:p22-family-legend/the-story-changes-hands/told-at-the-table` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，Anton家的故事在饭桌上换了新的讲法：多了一句笑话，少了一处哭声。听的人把汤匙放下，等下一句；讲故事的人却先去看窗子有没有关好，谁也没有先动筷子。
  _effects: state_parameter p22-family-legend.warmth 37 -> 40; state_parameter p22-family-legend.secrecy 92 -> 90; state_parameter p22-family-legend.promise 40 -> 42; mood 0.010000000000000002_

- **1916.03** `statistical_illness_worsened`
  Anton的痢疾没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1916.05** `statistical_recovery`
  Anton熬过了这场痢疾，能坐起来喝一点汤，但身体还很虚。

- **1917.01** `vienna-life-child-inherited-wish/the-dead-grandmothers-wish` tags: childhood, family, wish, grief, uncanny, drama
  Anton在饭桌上忽然说：“等我长大了，要把那间屋子买回来。”Josefine Hofer的勺子停在半空，因为这句话是去世多年的外婆常说的，连“那间屋子”都指得一模一样。Anton说完就低头喝汤，好像只是随口。
  _effects: flag +inherited_wish_house; knowledge “孩子说要把“那间屋子”买回来，和去世的外婆说过的一模一样。”; mood -0.010000000000000002_

- **1918.01** `vienna-life-school-enrolment/half-day-place` tags: childhood, school, fees
  学校只收半日班，Otto Berg说下午还有空位，但课本要家里自己买。Josefine Hofer先交了一克朗，把Anton的名字写在候补名单上。
  _effects: education primary; cash -1 (partial school fee（其中1克朗记入债务）); role; relation acquaintance with person-materialized-world-vienna-1912-20_

- **1918.01** `state_expire:p22-family-legend` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  Anton的「家族传说」到期；相关安排结束。
  _effects: state_remove p22-family-legend state:world-vienna-1912:31_

- **1918.01** `p9-gap-childhood-chores.school-slate/slate-bought-secondhand` tags: childhood, household, chores, school, task, daily, supplies, education
  Friedrich Hofer把八个赫勒排成三摞，最后还差两枚，向摊主说了句好话，才把石板和一支石笔一起拿走。石板背面有一道旧划痕，Anton用指甲抠了抠，抠不掉。回家路上Anton把石板贴在胸口，隔着布也能感觉到石头的凉。
  _effects: cash -0.08 (买二手石板和石笔（其中0.08克朗记入债务）); skill; relation kin with person-friedrich-hofer; relation acquaintance with person-materialized-world-vienna-1912-16_

- **1918.04** `vienna-childhood-street.cigarette-card/card-gift` tags: childhood, street, social, home
  烟草店的门铃响一次，Anton就往柜台边挪一步。Berta Bauer 2终于从柜台底下抽出一张风景卡，用手掌抹了抹，还是皱的。“拿去吧。”Berta Bauer 2说完就去招呼别的客人。Anton把卡举到鼻子前闻，一股烟草味，回家路上把多出来的一张卡分给Berta Bauer 2看。
  _effects: mood 0.06; reputation 0.02; relation friend with person-materialized-world-vienna-1912-27; relation acquaintance with person-materialized-world-vienna-1912-27_

- **1918.10** `statistical_infection`
  Anton在Leopoldstädter Zinshaus, gemeinsamer Gang病倒了，肺炎让身体发热、虚弱，接下来的日子只能卧床。

- **1918.12** `statistical_illness_worsened`
  Anton的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1919.01** `vienna-life-school-day/recites` tags: childhood, school, hunger
  Otto Winter 2让Anton站到黑板前背乘法表。孩子背到七乘八时停了一下，还是背完了；放学时手指冻得发红，石板上的字被袖子擦掉一半，Otto Winter 2在名册上给了一个小小的勾，Anton把石板抱在胸前，一路没舍得放进书包。
  _effects: education primary_

- **1919.01** `p9-gap-childhood-chores.stay-after-school/stay-twice-cleaning` tags: childhood, household, chores, school, task, daily, teacher, learning
  “想留下，就把教室收拾干净。”Grete Stein把灰桶推到Anton脚边。Anton提着桶下楼梯，灰从桶沿洒出来，在鞋面上落了一层白。擦完课桌，Grete Stein已经坐在炉边，用粉笔头在地上画竖式，让Anton蹲在旁边一道一道算。
  _effects: skill; relation acquaintance with person-grete-stein_

- **1919.02** `r1-child.bully-teacher-son::ctx-vienna-university-1912::milieu-school/fought-in-the-snow` tags: bullying, school, teacher, class, fear, university, culture, schooling
  Anton在放学路上把教师儿子推倒在雪里，两个人滚成一团。Otto Winter 2赶来时，先扶起自己的儿子，再问Anton为什么打人。Anton说他先切我的橡皮。Otto Winter 2说一块橡皮也值得动手？那天Anton在走廊站到天黑。
  _effects: reputation -0.08; flag +fought_teachers_son; relation rival with person-materialized-world-vienna-1912-16_

- **1919.03** `statistical_illness_worsened`
  Anton的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1919.04** `statistical_recovery`
  Anton熬过了这场肺炎，能坐起来喝一点汤，但身体还很虚。

- **1919.07** `statistical_infection`
  Anton在Leopoldstädter Zinshaus, gemeinsamer Gang病倒了，肺炎让身体发热、虚弱，接下来的日子只能卧床。

- **1919.08** `statistical_recovery`
  Anton从肺炎中慢慢恢复，能下床喝水，但身体还虚弱。

- **1920.01** `p9-gap-childhood-chores.school-slate/slate-borrowed-from-teacher` tags: childhood, household, chores, school, task, daily, supplies, education
  Grete Stein用拇指摸了摸石板上的裂缝，没说话，从讲台抽屉最底下抽出一块旧石板，木框还在，边角被磨得发亮。借的条件是每天放学擦黑板、倒炉灰。Anton把石板抱在怀里，当晚就用湿布擦了三遍，第二天袖口全是白粉。
  _effects: skill; relation acquaintance with person-grete-stein_

- **1920.09** `r1-child.bully-teacher-son::ctx-vienna-university-1912::milieu-school/eraser-cut-in-half` tags: bullying, school, teacher, class, fear, university, culture, schooling
  教师儿子把Anton的橡皮切成两半，说穷人的橡皮本来就只有半块。Anton没有还手，把半块橡皮收进铅笔盒。第二天Anton发现自己的作业本被撕了两页，Grete Stein问是谁干的，全班都看着窗外。
  _effects: mood -0.08; flag +bullied_by_teachers_son; skill; relation rival with person:evt:world-vienna-1912:000062:child_

- **1921.01** `vienna-life-child-labour/runs-errands` tags: childhood, labour, piecework
  Anton放学后替Buchdruckerei Winter & Söhne的排字工送校样，穿过两条街，拿到一克朗。回家时天已经黑了，Josefine Hofer把饭留在锅里；Anton的鞋底磨薄，脚后跟起了泡，却把那一克朗捏得平平整整，放进Josefine Hofer的围裙口袋；这跑腿的差事从此固定下来，Anton也算家里一个能挣钱的孩子。
  _effects: cash 1 (running errands); role_

- **1921.01** `p9-gap-childhood-chores.laundry-help/laundry-dragged-docked-pay` tags: childhood, household, chores, school, task, daily, laundry, work
  床单太长，Anton拖着一角往绳子走，布边扫过煤渣，立刻黑了一道。Franz Moser弯腰看了看，脸沉下来，说这角得重洗，工钱扣一半。Anton接过一赫勒，蹲在盆边用清水搓那一道灰，搓到指节发红，水面上还浮着煤末。
  _effects: cash 0.01 (被扣后只剩一赫勒); mood -0.05; relation acquaintance with person-materialized-world-vienna-1912-7; relation acquaintance with person-materialized-world-vienna-1912-7; relation acquaintance with person-materialized-world-vienna-1912-15_

- **1921.01** `vienna-childhood-street.washhouse-fever/fever-recover` tags: childhood, street, social, home
  洗衣房里全是蒸汽和碱水味。Anton靠在墙边等Josefine Hofer，湿衣服堆在脚边。夜里Anton开始发烧，Josefine Hofer把湿布叠成长条，敷在额头，凉了再换。三天后热度退下去，Anton的嘴唇起了一层白皮，Josefine Hofer的手指也裂了口子。
  _effects: condition; relation kin with person-josefine-hofer_

- **1921.02** `r14-edu.humiliation::ctx-vienna-university-1912::milieu-school/classmate-defends` tags: education, school_humiliation, reputation, childhood, university, culture, schooling, school
  Otto Winter 2还要再说，Mitzi Bauer 2站起来说补丁是自己家也有的。教室里静下来，Otto Winter 2把书往桌上一放，说今天的课不上了。Mitzi Bauer 2坐下时看了Anton一眼。放学路上，两人一前一后走，谁也没有先开口。
  _effects: reputation 0.020000000000000004; flag +classmate_defended_me; relation friend with person-materialized-world-vienna-1912-36; relation acquaintance with person-materialized-world-vienna-1912-36_

- **1921.04** `vienna-childhood-friends.courtyard-race/won-the-race-lost-a-button` tags: childhood, social, school, street
  Anton跑到第二圈时鞋带松了，索性踩着鞋后跟跑。最后一圈，Anton从床单底下钻过去，先拍到墙。Helene Winter喘着气，把两颗弹珠拍进Anton手心。Anton低头才发现外套少了一颗扣子；窗口的Helene Winter扔下一根别针，说先别着。
  _effects: mood 0.05; relation acquaintance with person-helene-winter_

- **1921.08** `vienna-school-childhood.spelling-bee/spelling-bee.fail` tags: school, social, childhood
  Anton拼到一半停住，Grete Stein的尺子落在桌角上。放学后楼梯间只剩Anton一个人，把“Notwendigkeit”抄了二十遍，墨水瓶见了底。
  _effects: mood -0.06; skill; relation acquaintance with person-grete-stein_

- **1921.12** `r1-child.library-card::ctx-vienna-university-1912::milieu-school::reading-room-culture/third-name-on-the-card` tags: library, reading, books, poverty, school, university, culture, schooling
  Anton在借书卡上看见前两个名字都被划掉了，第三个空着。Anton Winter说卡上只能写三个名字，写满就换新卡。Anton借了一本讲机器的书，回家路上把书贴在胸口，怕雨点打湿。
  _effects: flag +first_library_card; role; skill; relation colleague with person-materialized-world-vienna-1912-35; relation acquaintance with person-materialized-world-vienna-1912-35; relation acquaintance with person-materialized-world-vienna-1912-38_

- **1922.01** `p9-gap-childhood-chores.stay-after-school/stay-twice-cleaning` tags: childhood, household, chores, school, task, daily, teacher, learning
  “想留下，就把教室收拾干净。”Friedrich Weiss把灰桶推到Anton脚边。Anton提着桶下楼梯，灰从桶沿洒出来，在鞋面上落了一层白。擦完课桌，Friedrich Weiss已经坐在炉边，用粉笔头在地上画竖式，让Anton蹲在旁边一道一道算。
  _effects: skill; relation acquaintance with person-materialized-world-vienna-1912-38_

- **1922.02** `p9-childhood-household.strap-by-the-door/took-punishment` tags: childhood, family, household, home, siblings, illness, neighbors
  Anton把手掌摊在身前，眼睛盯着门后的皮带。几下之后，Friedrich Hofer停了手。Anton自己去找扫帚，把地上的碎瓷一片片扫干净，又用湿布擦灶台。两个人在厨房里各做各的，只听见烟纸燃烧的细响。
  _effects: mood -0.05; relation kin with person-friedrich-hofer_

- **1922.02** `r1-child.library-card::ctx-vienna-university-1912::milieu-school::reading-room-culture/confiscated-in-class` tags: library, reading, books, poverty, school, university, culture, schooling
  Anton把书藏在课桌里，被Friedrich Weiss没收。Friedrich Weiss翻了两页，发现是讲蒸汽机的，放学后把书还回来，说下次别在课上读。Anton问能不能借老师的书，Friedrich Weiss说先把这本读完。
  _effects: flag +teacher_lent_book; skill; relation friend with person-materialized-world-vienna-1912-38; knowledge “the teacher keeps a shelf of engineering books”; relation acquaintance with person-materialized-world-vienna-1912-11_

- **1922.04** `vienna-school-childhood.fountain-pen/fountain-pen.broken` tags: school, social, childhood
  Friedrich Hofer把账单翻了个面，上面全是数字。Anton没再问，回家用线把旧笔尖绑在木杆上。第二天墨水从裂缝渗到指缝，Grete Stein把本子推回来让重写。
  _effects: mood -0.05; relation kin with person-friedrich-hofer; skill_

- **1922.05** `vienna-childhood-friends.secret-kiosk/found-coin-under-rack` tags: childhood, social, school, street
  Anton蹲下系鞋带，看见架子底下有一枚两赫勒。Anton用鞋尖把它拨出来，攥在手心，站起来时耳朵发热。Helene Kral正低头数报纸，Anton把硬币放在柜台上，说要那张火车头。找零的铜板掉在掌心，Helene Kral看了Anton一眼，没说话。
  _effects: cash -0.02 (买画片花掉捡到的硬币（其中0.02克朗记入债务）); condition; relation acquaintance with person-materialized-world-vienna-1912-19; relation acquaintance with person-materialized-world-vienna-1912-19_

- **1923.01** `p9-gap-childhood-chores.market-line/line-half-flour` tags: childhood, household, chores, school, task, daily, market, food
  队伍从面包房门口拐进巷子，Anton把布袋夹在腋下，学着前面人的样子，用胳膊肘顶住后面人的篮子。窗口的伙计舀面粉时，Anton踮脚看着秤，直到半袋面倒进袋口。挤出人群时鞋跟被踩掉，Anton单脚跳了两步，在泥里摸回鞋，索性赤脚走回家。
  _effects: food; skill_

- **1924.01** `r13-edu.ask-teacher::ctx-vienna-university-1912::milieu-school/note-under-inkwell` tags: education, teacher, help, school, confidence, university, culture, schooling
  Anton等到天黑，Josef Lechner 2一直在改别的班的卷子，头也没抬。Anton把问题写在纸条上压在墨水瓶下，第二天发现纸条还在原处，只是背面多了一行字：“先看第三章。”Anton按纸条翻到第三章，发现那页夹着一张旧的辅助线图，图上的线画得很轻。
  _effects: skill_

- **1924.02** `r3-teen.first-cigarette::ctx-vienna-university-1912::milieu-school/refuses` tags: smoking, friendship, risk, family, school, university, culture, schooling
  Anton把烟推回去，说家里有人咳血。Emil Hofer把烟叼在自己嘴上，说胆小鬼才拿家里当借口。放学路上两人隔着三步走，谁也没先开口。他把手插进空口袋，摸到上午剩下的一截粉笔，捏成了两段。
  _effects: reputation 0.03; flag +refused_first_cigarette; relation acquaintance with person-materialized-world-vienna-1912-43; relation acquaintance with person-materialized-world-vienna-1912-43_

- **1924.02** `r3-teen.first-friend-group::ctx-vienna-university-1912::milieu-school/split` tags: friendship, roof, belonging, betrayal, class, university, culture, schooling
  团里有人偷了市场的香肠，被抓住后供出了所有人。Emil Hofer把Anton拉到楼梯拐角，让他把责任推给最小的那个，说这样大家都能脱身。Anton没答应，只把口袋里的香肠纸揉成一团。第二天，屋顶上的折叠椅少了一把，Emil Hofer见了他也不再吹那两声口哨。
  _effects: mood -0.1; flag +friend_group_split; relation rival with person-materialized-world-vienna-1912-43_

- **1924.02** `vienna-youth-threshold.school-leaving/one-more-year-commercial` tags: adolescence, school, work, family, transition
  Anton把离校证明推回Josef Lechner 2的桌面，说想再读一年，考商业学校。Josef Lechner 2翻出旧课本和一张油印的考试科目表，书费要两克朗四十赫勒。家里那口锅还得照常烧，这笔钱最终是从母亲的首饰盒底抠出来的。
  _effects: cash -2.4 (商业学校考试用的旧课本与报名费（其中2.4克朗记入债务）); education primary; mood 0.05000000000000002_

- **1924.12** `vienna-adolescence.workshop-apprentice/apprenticeship-accepted` tags: adolescence, school, work, family, social
  作坊里全是松木味。Buchdruckerei Winter & Söhne把一块方木夹进台钳，让Anton推刨子。Anton推了十分钟，木花卷到脚背上，刨面总算平了。Buchdruckerei Winter & Söhne用拇指摸了摸，收下Anton，从钱盒里数出三克朗，说是头一周的饭钱。Josefine Hofer在门口把围裙攥得很紧。
  _effects: cash 3 ({subject}学徒首周的膳食预付款); education apprenticeship; reputation 0.1; relation kin with person-josefine-hofer_

- **1925.01** `r13-edu.boarding-school::ctx-vienna-reform-1930::milieu-tenement/admitted-to-dormitory` tags: education, boarding_school, residence, family, scholarship, reform, medical, schooling
  Anton把铁皮箱绑在自行车后座，骑了三十里到寄宿学校。舍监检查行李，把家里的腌菜罐没收，说会招老鼠。Anton在熄灯后偷偷把罐子从垃圾堆捡回来，藏在床底，第一顿饭就着腌菜吃完了两碗粥。第一个星期Anton把腌菜分给同屋，换回三张邮票和一支不漏水的钢笔。
  _effects: flag +boarding_school_admitted; education secondary_

- **1925.02** `r14-edu.leaving-school::ctx-vienna-reform-1930::milieu-tenement/kept-home-for-kin` tags: education, school_dropout, child_labour, poverty, reform, medical, schooling, home
  Friedrich Hofer病倒在床，Anton留在家里看弟妹、煮稀粥、去井边打水。Friedrich Weiss托人带来一包旧课本，Anton在灶火边翻了两页，弟弟哭了，只好合上。一个月后，学校把Anton的名字从名册上划掉，墨迹很淡。
  _effects: mood -0.06; flag +left_school_for_family; role_

- **1925.02** `yf18-firstlook.tram-glove::ctx-vienna-reform-1930::milieu-school/return-it-at-the-gate` tags: first_love, love, tram, glove, youth, courtship, reform, medical
  下一站，Anton追下车，把那只手套递还给Josef。Josef说了一声谢谢，手指在毛线手套里缩了一下；Anton回到车上才发现自己坐过了两站，只好沿着环城路走回家。
  _effects: state_add yf18-first-awakening state:world-vienna-1912:142; relation friend with person-phase15-Josef-world-vienna-1912; mood 0.03; flag +yf18_first_awakening_active_

- **1926.01** `vienna-life-apprenticeship/printshop-apprentice` tags: adolescence, work, apprenticeship, employment
  Buchdruckerei Winter & Söhne让Anton下周一到排字房报到，先搬铅字和扫地，月薪十八克朗。家里用第一笔预付工资买了双结实的鞋。
  _effects: education apprenticeship; employment Schriftsetzerlehrling @ org-winter-print; cash 6 (apprentice advance); role_

- **1926.01** `yf18-dare.bridge-rail::ctx-vienna-reform-1930::milieu-tenement/fall-on-the-ice` tags: dare, bridge, river, friendship, risk, reform, medical, schooling
  Anton走到第四步，鞋底在霜上滑了一下，整个人挂在栏杆外侧。Klara抓住Anton的手腕，Hedwig跑去叫桥头卖烤栗子的老人；Anton被拉上来时，膝盖已经湿透，第二天走路一瘸一拐。
  _effects: state_parameter yf18-first-awakening.intensity 45 -> 51; state_parameter yf18-first-awakening.nerve 25 -> 15; relation friend with person-phase15-Klara-world-vienna-1912; flag +yf18_bridge_scare; mood -0.03_

- **1926.01** `state_tick:yf18-first-awakening/half-year-of-glances/answered-glance` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Anton在教堂门口或学校走廊里又遇见Josef。这一次对方先点了头，Anton准备好的整段话全忘了，只把手里的书换到另一只手上；回家后Anton才发现，自己把书拿倒了。
  _effects: state_parameter yf18-first-awakening.intensity 51 -> 56; state_parameter yf18-first-awakening.nerve 15 -> 23; state_parameter yf18-first-awakening.reciprocated false -> true; relation friend with person-phase15-Josef-world-vienna-1912; mood 0.03_

- **1926.01** `p9-childhood-apprenticeship.leave-bad-workshop/walked-off-unpaid` tags: adolescence, work, apprenticeship, labour, training, family, task, task:work
  Anton以为走就走了，工钱总会结。等到月底，家里人把空钱袋翻过来，Anton才回到作坊。Buchdruckerei Winter & Söhne正在给新学徒示范上墨，头也没抬，说人没打招呼就走，只能给几个铜币。Anton站在门口，听见里面的机器又转起来，铜币在掌心硌得生疼。
  _effects: cash -1.5 (没拿到最后一个月的整月工钱); mood -0.07999999999999999; unemployment (不告而别离开作坊); relation acquaintance with person-materialized-world-vienna-1912-42_

- **1926.04** `kernel-edu.friendship::ctx-vienna-reform-1930::milieu-tenement/edu-friend-moves-away` tags: adolescence, school, friendship, books, family, reform, medical, schooling
  Lena的父亲在车站找到活，全家要搬去另一区。临走前，Lena把一本旧书塞给Anton，扉页上写着地址。Anton把书读完，按地址写了信，信被退回来，上面盖着“查无此人”。那本旧书Anton一直留在书架上。
  _effects: knowledge “朋友搬走前留下的地址已经找不到人了。”; skill; flag +friend_moved_away; mood -0.04999999999999999_

- **1927.01** `state_tick:yf18-first-awakening/half-year-of-glances/talked-about` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Anton只把Josef的名字写在一张草稿纸背面，第二天那张纸就在教室后排传了一圈。有人把名字念出来，有人问Anton是不是要请人喝咖啡；Anton说那是表姐的名字，声音大得连自己都吓了一跳。
  _effects: state_parameter yf18-first-awakening.talk 0 -> 12; state_parameter yf18-first-awakening.nerve 23 -> 17; reputation -0.03; mood -0.030000000000000027_

- **1927.01** `task-vienna-youth-apprenticeship-search/no-vacancy` tags: task, task:work, work, adolescence, apprenticeship
  Anton问了三家印刷厂，得到的回答都是“今年不收学徒”。最后一家让他把名字写在纸角上，说有空缺再通知，但谁都知道那张纸会被压在账本下面。
  _effects: mood -0.04999999999999999; knowledge “今年印刷厂大多不收新学徒。”_

- **1927.02** `yf18-family.one-apprenticeship::ctx-vienna-reform-1930::milieu-tenement/yield-to-the-younger` tags: siblings, apprenticeship, scarcity, family_duty, choice, reform, medical, schooling
  木匠铺只收一个学徒，押金却要两份。Josefine Hofer把两张表格摊在桌上，说家里只拿得出一次；Anton看见Hedwig把铅笔削得很尖，最后说让Hedwig去。第二天，Anton去码头找了半日工，回家时Hedwig正在院子里练刨花，刨子是新领的，柄上还缠着纸条。
  _effects: state_add apprenticeship-contract state:world-vienna-1912:251; cash 2 (half-day wages from the docks); relation kin with person-phase15-Hedwig-world-vienna-1912; flag +yf18_yielded_apprenticeship; mood -0.020000000000000018; role; education apprenticeship; role_

- **1927.09** `yf18-dare.bridge-rail::ctx-vienna-reform-1930::milieu-tenement/walk-the-rail` tags: dare, bridge, river, friendship, risk, reform, medical, schooling
  多瑙河上的铁桥在夜里只剩两排灯。Anton翻过栏杆，鞋底踩上结霜的钢梁，走了七步；Lena在桥头喊了一声，风把声音吹散。Anton翻回来时，Josef把一支烟塞进Anton嘴里，手抖得点不着火。
  _effects: state_parameter yf18-first-awakening.intensity 64 -> 74; state_parameter yf18-first-awakening.nerve 17 -> 32; state_parameter yf18-first-awakening.talk 12 -> 17; reputation 0.020000000000000004; flag +yf18_walked_bridge_rail; mood 0.04999999999999999_

- **1928.01** `yf18-firstlook.essay-exam::ctx-vienna-reform-1930::milieu-tenement/fail-the-exam` tags: first_love, exam, essay, school, humiliation, reform, medical, schooling
  成绩单发下来，作文那一栏是“不及格”。Anton把成绩单折成小方块，塞进电车月票的夹层；回家路上，Anton第一次觉得Lena的名字比分数更沉。夜里Anton把作文重写了一遍，没有交。
  _effects: state_parameter yf18-first-awakening.intensity 56 -> 64; state_parameter yf18-first-awakening.secret true -> true; flag +yf18_failed_essay; mood -0.03999999999999998_

- **1928.01** `state_tick:yf18-first-awakening/half-year-of-glances/answered-glance` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Anton在教堂门口或学校走廊里又遇见Josef。这一次对方先点了头，Anton准备好的整段话全忘了，只把手里的书换到另一只手上；回家后Anton才发现，自己把书拿倒了。
  _effects: state_parameter yf18-first-awakening.intensity 74 -> 79; state_parameter yf18-first-awakening.nerve 32 -> 40; state_parameter yf18-first-awakening.reciprocated true -> true; relation friend with person-phase15-Josef-world-vienna-1912; mood 0.02999999999999997_

- **1928.01** `r13-work.part-time::ctx-vienna-reform-1930::milieu-tenement/late-for-class` tags: work, part_time, school, adolescence, cash, reform, medical, schooling
  Anton接了一单远活，回来时天已经黑透。第二天的算术课，Anton在课堂上睡着了，Josef Lechner 2用粉笔头敲了敲课桌。放学后Josef Lechner 2把Anton留下，说再缺两次课就要叫家长；Anton摸着口袋里那几枚铜板，没有说是去送货了。
  _effects: cash 1 (放学后的四个钟头); reputation -0.05; flag +work13_part_time_made_late_for_school; relation rival with person-materialized-world-vienna-1912-11_

- **1928.05** `yf18-dare.prater-slide::ctx-vienna-reform-1930::milieu-tenement/ride-in-the-dark` tags: dare, prater, fairground, comic, friendship, reform, medical, schooling
  普拉特的木滑道在闭园后还亮着一盏值班灯。Anton和Emil从围栏底下钻进去，用一块麻袋垫着滑下来，木槽里的蜡味呛得人直笑。滑到底时，Gustav Moser 2提着灯站在出口，问他们要不要再买一张票。
  _effects: mood 0.04999999999999999; cash -1 (a late ticket paid to the watchman); reputation -0.010000000000000002; relation friend with person-phase15-Emil-world-vienna-1912; flag +yf18_prater_stunt; relation acquaintance with person-materialized-world-vienna-1912-45_

- **1928.08** `r3-teen.first-love::ctx-vienna-reform-1930::milieu-tenement/reciprocated` tags: love, courtship, school, tram, secrecy, reform, medical, schooling
  Mitzi把回信写在电车月票背面：星期三，六点，第二站。Anton提前半小时到，站在报亭旁边，把那张月票看了十几遍。Mitzi从电车上下来时，围巾被风吹到脸上，两个人都笑了。
  _effects: mood 0.12; flag +first_love_reciprocated; relation partner with person-phase15-Mitzi-world-vienna-1912_

- **1929.01** `state_expire:yf18-first-awakening` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Anton的「第一次心动」到期；相关安排结束。
  _effects: state_remove yf18-first-awakening state:world-vienna-1912:142; flag -yf18_first_awakening_active_

- **1929.01** `p9-childhood-youth-aspiration.ask-a-mentor/asked-to-come-back-later` tags: adolescence, education, aspiration, school, books, club, exam, task
  Hermann Bauer看了看Anton抄的字母表，说大小不一，让他回去用直尺画格子重抄一遍，下个月再来。少年把纸折好，在咖啡馆门口站了一会儿，走回印刷厂时绕到排字房窗外看了很久。
  _effects: mood -0.03; skill; flag +mentor_pending_retry; relation acquaintance with person-materialized-world-vienna-1912-56; relation acquaintance with person-materialized-world-vienna-1912-56_

- **1929.02** `yf18-body.false-alarm::ctx-vienna-reform-1930::milieu-tenement/carry-the-coal` tags: body, pregnancy_scare, class, shame, exam, comic, reform, medical
  Rosa在电车月票背面写了“晚了十天”，Anton把攒着买课本的钱塞进鞋垫，陪她去了她母亲家。助产士Grete Stein把窗帘拉上，问了几句，又让Rosa喝了一杯糖水；最后她说只是考试周乱了日子，转头让Anton把后院那筐煤搬进厨房。
  _effects: cash -3 (the textbook money went on a doctor's visit（其中2.5克朗记入债务）); relation acquaintance with person-grete-stein; flag +yf18_false_alarm; mood 0.01999999999999999_

- **1930.01** `r13-civ.clinic-first-visit::ctx-vienna-reform-1930::milieu-tenement/chronic-cough` tags: health, clinic, queue, diagnosis, institution, reform, medical, schooling
  Anton在诊所走廊的第三张长凳上坐到中午，膝上压着挂号纸和一块湿手帕。Otto Berg把听诊器贴上来不到半分钟，说是潮气和烟，开了褐色止咳糖浆，又让下周再来。药费从当天的菜钱里扣走，回家时篮子里只剩半棵卷心菜。
  _effects: cash -3 (诊所走廊的第三张长凳（其中3克朗记入债务）); condition; flag +clinic_first_visit; knowledge “the clinic doctor called the cough chronic bronchitis”; relation acquaintance with person-materialized-world-vienna-1912-55_

- **1930.02** `vienna-social-movement.recruitment/join-and-carry` tags: development, social_movement, organization, politics
  Anton在楼梯下面接到一张折成四折的传单。纸上没有署名，只写着下一次集会的地址。Anton去了，在昏暗的屋里报上姓名，成为第二区夜班出租合作社的一员，并答应负责自己所在街区的联络。
  _effects: organization_membership; role; relation acquaintance with person-helene-winter_

- **1930.03** `ad20-apprenticeship-review::ctx-vienna-reform-1930::milieu-tenement/tools-returned` tags: craft, apprentice, work, review, everyday, stigma, reform, medical
  第二区夜班出租合作社把Anton的工具一件件摆在桌上，凿子、刨子、尺，摆得很整齐。Anton知道这是什么意思。第二区夜班出租合作社说不是手艺不好，是“店里养不起”。Anton把工具收进布袋，布袋比来时轻，因为有一把凿子已经磨短了。
  _effects: state_add failed-apprentice state:world-vienna-1912:458; relation employer with person-materialized-world-vienna-1912-14; flag +apprenticeship_failed; mood -0.06; cash -1 (tools repaired before returning them（其中1克朗记入债务）)_

- **1930.03** `vienna-courtship-courtyard.family-table/nod-and-pots` tags: adulthood, courtship, partner, social, family, partnership
  汤喝到一半，Josefine Hofer放下勺子点了头，但说得很清楚：先攒出一套锅碗、一只挂钟，再把话往下说。Gustav Huber在桌下用膝盖碰了碰Anton，Josefine Hofer把最后一块煮牛肉推过来，饭桌上的空气总算松了；这一顿让对方家里管了饭，自家灶上省下两克朗的吃食，也吃出一个带条件的准信。
  _effects: relation partner with person-materialized-world-vienna-1912-74; relation kin with person-josefine-hofer; food; relation acquaintance with person-materialized-world-vienna-1912-74_

- **1930.05** `p9-social-family-conflict-care.sibling-medicine-bill/split-per-head` tags: family, care, siblings, inheritance, housing, money
  Anton把旧练习本翻到空白一页，写下母亲、自己和Lena的名字。十四克朗的药费单，Anton和Lena各摊五克朗，余下四克朗从母亲的养老金里扣；Anton把五克朗硬币一枚枚摞在桌沿，Lena盯着那一栏看了半天，也从围裙口袋里摸出钱来。
  _effects: cash -5 (分摊母亲药费中自己的一份（其中5克朗记入债务）)_

- **1930.11** `p9-gap-adult-solitude.window-argument/window-argument.peek` tags: adulthood, daily, solitude, ordinary, home, neighbor, overheard
  Anton下楼倒水，在楼梯口看见院子里站着一对夫妻，男人的围裙上还沾着面粉，女的攥着一张工钱条。她没插话，提着壶又上楼，关门时听见那女人说“一星期八克朗怎么够”。
  _effects: mood -0.030000000000000027; skill_

- **1931.01** `p9-social-relationship-initiative.cut-the-guarantee/settle-at-the-tavern` tags: courtship, friendship, family, social, initiative, housing, task, task:social
  没有签字，陪对方去酒馆把账当面谈清。掌柜的把欠条一张张摆在桌上，一共二十八克朗。有人替着说了几句好话，讲明利息怎么算、按月还多少，请掌柜的宽限到月底。谈下来先还五克朗，余下的立了新据，担保人一栏空着，掌柜的临走时瞪了一眼。
  _effects: cash -1.2 (酒馆里替对方先垫的第一笔款子和两杯酒); relation friend with person-phase15-Emil-world-vienna-1912; reputation -0.02; mood 0.020000000000000018_

- **1931.01** `p9-gap-adult-solitude.leaking-shoe/leaking-shoe.belt-patch` tags: adulthood, daily, solitude, ordinary, home, repair, shoe, poverty
  Anton拆下一条旧皮带的头，蒙在鞋底破口上，用钉子一点点敲进去。第三下时锥子扎透鞋面，扎进左手拇指根，血滴在鞋帮上。她用围裙擦了擦，还是把皮子钉完了，第二天走路时鞋底有块硬响。
  _effects: mood -0.02999999999999997_

- **1931.12** `oj18-cinema.reel::ctx-vienna-reform-1930::milieu-tenement/cut-the-reel` tags: cinema, film, projection, night, censorship, work, odd_job, reform
  放映到第十一本，胶片在片门里卷成一团。Anton剪掉烧焦的一截，发现后面接的是一卷没送审的新闻片：军靴踏过广场，镜头扫过一张张被按下去的脸。Otto Lechner在黑暗里说“接回正片”，Anton照做了。
  _effects: organization_found 小巷电影院 (household_firm); position 放映员 @cinema:person-phase15-Anton-world-vienna-1912-evt:world-vienna-1912:005817; state_add oj18-odd-apprenticeship state:world-vienna-1912:516; cash 1 (projectionist wages); skill; flag +cut_the_reel; knowledge “第十一本胶片里夹着没送审的新闻片，{projectionist}让我接回正片。”; relation acquaintance with person-materialized-world-vienna-1912-39; role; flag +odd_job_apprentice_

- **1932.01** `vienna-family-divorce/partner-moves-to-shared-housing` tags: family, marriage, divorce, housing, lifecycle, separation, household
  Gustav Huber把一只箱子和工票搬去合租房，带走一半锅碗。Anton留在Leopoldstädter Zinshaus, gemeinsamer Gang，把空出来的床租给一个学徒，用租金补房租；搬家花掉四克朗，Anton在户籍上成了分居的人，夜里听见隔壁床板响，总要愣一下。
  _effects: relation_end partner with person-materialized-world-vienna-1912-74; household; cash -4 (moving and separate goods（其中4克朗记入债务）); mood -0.06; role_

- **1932.01** `pc20-apprentice.second-workshop::ctx-vienna-reform-1930::milieu-tenement/reopen-bench` tags: craft, apprentice, failure, workshop, second_chance, tools, patronage, reform
  Elisabeth Weiss把工作台的钥匙放在Anton手心里，说工具可以借，名声不能借。Anton擦了一整夜的刨子，第二天在门口挂出小木牌；第一位客人不是Franz Huber，而是一个要修椅背的邻居。
  _effects: organization_found 重新开张的作坊 (household_firm); position 师傅 @workshop:person-phase15-Anton-world-vienna-1912-evt:world-vienna-1912:005815; state_add pc20-second-chance state:world-vienna-1912:515; relation colleague with person-materialized-world-vienna-1912-77; cash -2 (tools, rent and a new sign（其中2克朗记入债务）); flag +reopened_workshop_after_failure; knowledge “工作台的钥匙还能用，工具可以借，名声不能借。”; relation acquaintance with person-materialized-world-vienna-1912-77; flag +second_chance_open_

- **1932.01** `state_tick:oj18-odd-apprenticeship/strange-year/trusted-with-the-keys` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  两年过去，Anton已经能闭着眼说出哪块地板会响、哪盏煤气灯该在几点关。师傅把备用钥匙交下来，没有解释为什么第三把钥匙磨得最亮；Anton也没有问，只在巡查簿最后一页画了一个小小的记号。
  _effects: state_parameter oj18-odd-apprenticeship.trust 30 -> 40; state_parameter oj18-odd-apprenticeship.strangeKnowledge 18 -> 28; state_parameter oj18-odd-apprenticeship.nightsWorked 0 -> 24; cash 2 (night-shift wages); skill_

- **1932.01** `agency:attend_meeting` tags: agency, agency:attend_meeting
  Anton走到Arbeiter-Zeitung im Vorwärts-Haus门口，看见便衣和拥挤的人群，最终没有进去。
  _effects: mood -0.03999999999999998_

- **1932.04** `p9-social-courtship-friendship.fasching-dance/dance-first-polka` tags: courtship, friendship, social, adulthood, reputation, leopoldstadt
  波尔卡重新响起时，Anton走到靠墙的长凳前向Helene Kral 2弯腰。姑母手里的扇子停了停，没说话。入场费和小费一共一克朗，Anton把找零塞回内袋；一支舞跳完，Helene Kral 2说了自己住在哪条街，Anton把名字和门牌在心里念了两遍。
  _effects: cash -1 (付给乐队的小费与舞会入场费); relation acquaintance with person-materialized-world-vienna-1912-69; relation acquaintance with person-materialized-world-vienna-1912-69_

- **1932.09** `vienna-medical-treatment.night-fever/corner-doctor` tags: health, medical, family, money
  施特劳斯医生用酒精棉擦手，把药粉倒进小纸袋，折口时指甲掐出印子。他说夜里别再喝醋水，那东西烧胃。Helene Lechner 2把炉火拨旺，在灶上坐了一壶水，答应第二天替Anton去铺子里告假。
  _effects: cash -4 (医生出诊费和药费); health 0.05 (药粉和糖浆缓解症状); relation friend with person-materialized-world-vienna-1912-66; relation acquaintance with person-materialized-world-vienna-1912-66_

- **1932.11** `vienna-historical-social-movement.district-list/hold-list-and-watch` tags: history, historical_process, social_movement, organization, politics
  楼梯间的灯泡忽明忽暗，Anton让Franz Lechner记下今晚进出院子的人。名单留在桌上没动，像一件没人认领的活。快到午夜，Franz Lechner只说了一句，明早再核一遍。
  _effects: mood -0.030000000000000027; flag +kept_district_list_private_

- **1933.01** `p22-forged-review::ctx-vienna-reform-1930::milieu-tenement/the-review-becomes-a-school` tags: forged_review, opera, fame, fraud, comic, media, art, scandal
  死去的评论家在最贵的报纸上给一部没人看过的歌剧写了四颗星。Anton把剪报贴在排练厅门口，第二天票房排到街角；Josef Lechner 3问是谁写的，Anton说是一个死人，死人不会否认。三个月后，歌剧院把这部戏列进了秋季剧目。
  _effects: state_add p22-wild-fortune state:world-vienna-1912:566; state_add p22-scandal-engine state:world-vienna-1912:567; cash 5 (a share of the revived opera receipts); reputation 0.039999999999999994; relation acquaintance with person-materialized-world-vienna-1912-47; flag +forged_review_believed; mood 0.02999999999999997; relation acquaintance with person-materialized-world-vienna-1912-47; flag +wild_fortune_active; flag +scandal_engine_active_

- **1933.01** `state_tick:pc20-second-chance/kept-word/small-relapse` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  Anton晚了半个钟头，进门时先解释路上的电车，又解释口袋里的收据。对方没有追问，只把已经凉掉的汤端回厨房；Anton听见锅盖碰在灶台上，知道这次不是天气的问题。
  _effects: state_parameter pc20-second-chance.credibility 55 -> 48; state_parameter pc20-second-chance.suspicion 30 -> 38; state_parameter pc20-second-chance.debt 40 -> 43; mood -0.030000000000000027_

- **1933.01** `r14-work.apprenticeship-exam::ctx-vienna-reform-1930::milieu-tenement/passed-the-guild-exam` tags: work, apprenticeship, craft, exam, status, reform, medical, schooling
  Franz Moser在学徒证上签字，笔尖在“满师”两个字上停了一下。Gustav Huber让Anton把一只燕尾榫拆开再装回去，Anton用了十一分钟。考场外，Josef问题目难不难，Anton把刨子递过去，说先把刃磨直。
  _effects: cash 2 (师傅签字的学徒证); flag +apprenticeship; role; skill; relation colleague with person-materialized-world-vienna-1912-7; knowledge “a dovetail joint can be taken apart and reset in eleven minu”; education apprenticeship_

- **1933.05** `bc18-inherit.forty-seven-franz::ctx-vienna-authoritarian-1934::milieu-tenement/bury-the-stranger` tags: inheritance, mistaken_identity, debt, funeral, work, absurd, family, vienna
  遗嘱里还附了一笔丧葬费，条件是要有“家属”到场。死者没有亲人，Anton只好穿黑衣站在墓旁，听牧师念一个从未听过的名字。雨把花圈上的纸花打湿，泥水漫过鞋面；葬礼结束后，Josef Lechner 3把九克朗交给他，说账已结清。Anton回家脱鞋，发现袜子上沾着别人的土。
  _effects: cash 7 (以家属身份到场后的遗产余款); reputation 0.03; relation acquaintance with person-materialized-world-vienna-1912-47; condition; flag +buried_a_stranger_for_the_estate; mood -0.010000000000000009_

- **1933.06** `r15-curse.betrayal-at-table::ctx-vienna-authoritarian-1934::milieu-tenement/lie-that-stuck` tags: betrayal, social, family, trust, secret, vienna, urban, crisis
  Helene Lechner 2告诉所有人Anton偷了东西。没有人找到赃物，但每个人都在传。Anton去市场时，摊主把零钱放在柜台上，不再递到手里。
  _effects: mood -0.07999999999999996; reputation -0.1; flag +false_accusation; relation rival with person-materialized-world-vienna-1912-66; state_add public-scandal state:world-vienna-1912:618; relation acquaintance with person-materialized-world-vienna-1912-75_

- **1933.06** `state_reaction:p22-scandal-engine/a-new-scandal-feeds-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Anton的新故事登出来时，旧的那一页也被重新翻到桌面上。Anton发现两件事共用同一个证人，而那个证人上周还来借过盐。
  _effects: state_parameter p22-scandal-engine.heat 45 -> 51; state_parameter p22-scandal-engine.reach 60 -> 64; state_parameter p22-scandal-engine.shame 40 -> 43; state_parameter p22-scandal-engine.leverage 50 -> 52; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:006954_

- **1933.06** `state_reaction:public-scandal/gossip` tags: public-scandal, scandal, reputation, social, state, state_reaction, betrayal, family
  Anton走进咖啡馆时，邻桌的声音低了一拍。没有人当面说什么，但每个人都知道该说什么。
  _effects: mood -0.030000000000000027; reputation -0.03_
  _causes: evt:world-vienna-1912:006954_

- **1933.08** `p9-gap-adult-solitude.window-argument/window-argument.peek` tags: adulthood, daily, solitude, ordinary, home, neighbor, overheard
  Anton下楼倒水，在楼梯口看见院子里站着一对夫妻，男人的围裙上还沾着面粉，女的攥着一张工钱条。她没插话，提着壶又上楼，关门时听见那女人说“一星期八克朗怎么够”。
  _effects: mood -0.030000000000000027; skill_

- **1934.01** `pc20-apprentice.second-workshop::ctx-vienna-authoritarian-1934::milieu-tenement/sweep-up` tags: craft, apprentice, failure, workshop, second_chance, tools, patronage, vienna
  Anton把工作台擦干净，把刨花扫进麻袋，最后把钥匙还给Friedrich Weiss。Friedrich Weiss没有挽留，只让Anton把门口那块旧木牌摘下来；Anton照做了，木牌背面还留着当年没刻完的名字。
  _effects: state_add pc20-second-chance state:world-vienna-1912:617; relation colleague with person-materialized-world-vienna-1912-38; cash -1 (the unpaid rent for the bench（其中1克朗记入债务）); flag +swept_the_bench_and_left; knowledge “旧木牌背面还有当年没刻完的名字，{subject}没有把它翻过来。”; mood -0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-53; flag -second_chance_open; flag +second_chance_open_

- **1934.01** `state_tick:oj18-odd-apprenticeship/strange-year/trusted-with-the-keys` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  两年过去，Anton已经能闭着眼说出哪块地板会响、哪盏煤气灯该在几点关。师傅把备用钥匙交下来，没有解释为什么第三把钥匙磨得最亮；Anton也没有问，只在巡查簿最后一页画了一个小小的记号。
  _effects: state_parameter oj18-odd-apprenticeship.trust 40 -> 50; state_parameter oj18-odd-apprenticeship.strangeKnowledge 28 -> 38; state_parameter oj18-odd-apprenticeship.nightsWorked 24 -> 48; cash 2 (night-shift wages); skill_

- **1934.01** `state_tick:p22-wild-fortune/the-story-gets-taller/the-crowd-remembers` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  一年过去，Anton的荒唐故事没有变小，反而多了一个愿意作证的人。债主没有立刻上门，亲戚也还愿意来吃饭；Anton把新添的银器擦了一遍，发现其中一只底下刻着别人的名字。
  _effects: state_parameter p22-wild-fortune.height 60 -> 64; state_parameter p22-wild-fortune.absurdity 65 -> 68; state_parameter p22-wild-fortune.witnesses 70 -> 75; state_parameter p22-wild-fortune.fragility 55 -> 57; mood 0.020000000000000018_

- **1934.01** `state_tick:p22-scandal-engine/the-rumor-learns-new-words/the-story-gets-a-new-witness` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  又过了一年，流言没有熄，却学会了新的说法。Anton在咖啡馆里听见自己的故事被讲成三个版本，每个版本都比上一个多一个证人；没有人来追问，也没有人真正忘记。
  _effects: state_parameter p22-scandal-engine.heat 51 -> 48; state_parameter p22-scandal-engine.reach 64 -> 68; state_parameter p22-scandal-engine.leverage 52 -> 55; state_parameter p22-scandal-engine.shame 43 -> 45; mood 0.010000000000000009_

- **1934.01** `agency:attend_meeting` tags: agency, agency:attend_meeting
  Anton走到Arbeiter-Zeitung im Vorwärts-Haus门口，看见便衣和拥挤的人群，最终没有进去。
  _effects: mood -0.040000000000000036_

- **1934.04** `ad20-police-stop::ctx-vienna-authoritarian-1934::milieu-tenement/taken-in` tags: police, legal, street, everyday, obligation, risk, vienna, urban
  Alois Moser让Anton靠墙站好，把口袋里的东西一件件放在地上。钥匙、手帕、半块面包，还有一张写着地址的纸。Alois Moser把纸对着路灯看了很久，最后说“跟我们走一趟”。
  _effects: cash -2 (a fine after the police stop（其中2克朗记入债务）); reputation -0.03; flag +police_stop_record; mood -0.050000000000000044; relation acquaintance with person-materialized-world-vienna-1912-18_

- **1934.05** `r2-faith.priest-rivalry::ctx-vienna-authoritarian-1934::milieu-tenement/old-priest-stays` tags: faith, church, conflict, sermon, usury, vienna, urban, crisis
  Anton把两份布道稿都抄了下来，挨家请人在请愿书上签名。Anton Kral第一个签，说老神父至少还肯听人说完。主教最后把年轻神父调去了郊区，Anton Kral 2在下一个主日念到“宽恕”时，停了两秒。
  _effects: reputation 0.05; flag +petitioned_to_keep_old_priest; role; relation friend with person-materialized-world-vienna-1912-86; relation rival with person-materialized-world-vienna-1912-43; relation acquaintance with person-materialized-world-vienna-1912-86_

- **1934.10** `vienna-market-debt.rent-arrears/rent-negotiate-installments` tags: market, debt, money, home, shop
  你没去借钱，直接下楼找房东，说月底前先付两克朗，剩下两克朗分两个星期补齐。房东叼着雪茄，拿铅笔在你的纸条背面写了个日期，说再拖一天就换锁。邻居在楼道口听见了，冲你摇了摇头，但没说什么。
  _effects: cash -2 (按分期付掉的第一笔欠租（其中2克朗记入债务）); relation acquaintance with person-friedrich-hofer; flag +rent_installment_plan_

- **1935.01** `fm17-miracle.witness::ctx-vienna-authoritarian-1934::milieu-tenement/a-light-on-the-grave` tags: faith, miracle, vision, public_scandal, witness, reputation, doubt, vienna
  万灵节傍晚，Anton和Alois Lechner在墓园点蜡烛。一团淡蓝色的光在Anton母亲的墓碑上方停了几息，又慢慢散开。Alois Lechner先跪下，随后旁边几家人也跪了。没有人问Anton最近为什么被报纸写，但所有人看Anton的眼神都变了。
  _effects: state_add fm17-miracle-witness state:world-vienna-1912:670; reputation 0.04; mood 0.020000000000000018; flag +fm17_light_seen; flag +fm17_miracle_witnessed; knowledge “我看见的那件事，到今天我仍说不出它是什么。”_

- **1935.01** `state_expire:oj18-odd-apprenticeship` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  Anton的「奇职学徒」到期；相关安排结束。
  _effects: state_remove oj18-odd-apprenticeship state:world-vienna-1912:516; role; flag -odd_job_apprentice_

- **1935.01** `state_tick:pc20-second-chance/kept-word/kept-word` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  Anton把答应过的事又做了一遍：按时出现，把欠下的小钱还掉，没有在旧话上添新的解释。对方没有鼓掌，只把杯子往Anton这边推了推；这一次的沉默比上次轻。
  _effects: state_parameter pc20-second-chance.credibility 30 -> 36; state_parameter pc20-second-chance.suspicion 50 -> 45; state_parameter pc20-second-chance.hope 25 -> 29; mood 0.020000000000000018_

- **1935.01** `r13-civ.quarantine::ctx-vienna-authoritarian-1934::milieu-tenement::r13-civ.quarantine-crisis/crisis-lodger-fever` tags: health, quarantine, epidemic, neighbor, confinement, vienna, urban, crisis
  Ferdinand Lechner半夜敲墙，说同屋的人烧得说胡话。Anton隔着板壁问要不要去叫医生，Ferdinand Lechner说医生来了也只给退热粉，还要收出诊费。天亮时，楼梯间多了一股石灰水味，Berta Hofer把白线画到了隔壁门口。
  _effects: cash -2 (门框上的石灰线（其中2克朗记入债务）); flag +crisis_quarantine_house; relation acquaintance with person-materialized-world-vienna-1912-14; knowledge “a second household on the stair was placed under quarantine”; relation acquaintance with person-materialized-world-vienna-1912-88_

- **1935.05** `p9-social-tenement-neighbors.evicted-neighbours/evicted-neighbours.district-office-queue` tags: housing, neighbors, tenement, daily, money, reputation
  区公所的长凳坐满了人。Anton Winter 2的笔尖在名册上划了一道，把纸推过来时没有抬眼。Anton把纸折了三折，塞进Rosa Moser手里。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-78; mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-78_

- **1936.01** `office16-appointment.patronage-ledger::ctx-vienna-authoritarian-1934::milieu-tenement/the-list-was-already-signed` tags: office, appointment, patronage, organization, politics, power, vienna, urban
  上一任在离任前签了一份四十人的任命名单，最后一行没有日期。Anton把Ferdinand Kral 3的名字添在第四十一行，注明“补录”；发薪日，会计问这四十一个人里为什么有六个已经去世。
  _effects: position 编外顾问 @workshop:person-phase15-Anton-world-vienna-1912-evt:world-vienna-1912:005815; flag +forty_first_name; knowledge “上一任留下的四十人名单里，有六个已经去世。”; mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-89; relation acquaintance with person-materialized-world-vienna-1912-51_

- **1936.01** `state_expire:failed-apprentice` tags: failed-apprentice, craft, work, failure, stigma, state, state_tick, state:failed-apprentice
  Anton的「学徒契约终止」到期；相关安排结束。
  _effects: state_remove failed-apprentice state:world-vienna-1912:458_

- **1936.01** `state_expire:p22-wild-fortune` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  Anton的「荒唐横财」到期；相关安排结束。
  _effects: state_remove p22-wild-fortune state:world-vienna-1912:566; flag -wild_fortune_active_

- **1936.01** `state_expire:p22-scandal-engine` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Anton的「流言发动机」到期；相关安排结束。
  _effects: state_remove p22-scandal-engine state:world-vienna-1912:567; flag -scandal_engine_active_

- **1936.01** `state_tick:pc20-second-chance/kept-word/kept-word` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  Anton把答应过的事又做了一遍：按时出现，把欠下的小钱还掉，没有在旧话上添新的解释。对方没有鼓掌，只把杯子往Anton这边推了推；这一次的沉默比上次轻。
  _effects: state_parameter pc20-second-chance.credibility 36 -> 42; state_parameter pc20-second-chance.suspicion 45 -> 40; state_parameter pc20-second-chance.hope 29 -> 33; mood 0.020000000000000018_

- **1936.01** `state_expire:public-scandal` tags: public-scandal, scandal, reputation, social, state, state_tick, state:public-scandal
  Anton的「公开丑闻」到期；相关安排结束。
  _effects: state_remove public-scandal state:world-vienna-1912:618_

- **1936.01** `state_tick:fm17-miracle-witness/the-story-year/told-kindly` tags: fm17-miracle-witness, faith, miracle, vision, witness, religion, reputation, doubt
  Anton又把那件事讲了一遍，这次没有添油加醋。听的人问：“你确定不是灯影？”Anton说确定，也不确定。对方点点头，没有追问；这反而让Anton松了一口气。
  _effects: state_parameter fm17-miracle-witness.attention 35 -> 40; state_parameter fm17-miracle-witness.certainty 55 -> 59; reputation 0.01; mood 0.010000000000000009_

- **1936.01** `r13-fam.seek-shelter::ctx-vienna-authoritarian-1934::milieu-tenement::shelter-crisis/shared-a-bed` tags: task, health, shelter, homelessness, night, charity, vienna, urban
  收容所门前排的队比平时多了一倍，Maria Berg把两张床并成一张，让两个女人各睡一头。Anton半夜醒来，发现旁边的人正把毯子往自己这边拉；两人谁也没有说话，最后各盖一半。
  _effects: cash -1 (收容所门口的队伍（其中1克朗记入债务）); condition; flag +shared_a_shelter_bed; role; relation acquaintance with person-materialized-world-vienna-1912-53; move place-wien_

- **1936.03** `p9-social-tenement-neighbors.stove-and-line/stove-and-line.first-come-order` tags: housing, neighbors, tenement, daily, money, reputation
  Anton把四只洗衣盆按到厨房的先后排成一列，用粉笔在门后写下各家的时辰：六点到七点半、七点半到九点。Emil Weiss起初嘟囔，看到自家名字排在第二格，也就把水壶提了回去。晾衣绳按同样次序分两段，谁家的床单先上谁先占。
  _effects: mood 0.040000000000000036; relation acquaintance with person-emil-weiss_

- **1936.05** `vienna-social-movement.recruitment/join-and-carry` tags: development, social_movement, organization, politics
  Anton在楼梯下面接到一张折成四折的传单。纸上没有署名，只写着下一次集会的地址。Anton去了，在昏暗的屋里报上姓名，成为第二区夜班出租合作社的一员，并答应负责自己所在街区的联络。
  _effects: organization_membership; relation acquaintance with person:evt:world-vienna-1912:000062:child_

- **1936.12** `r2-rural.barn-fire::ctx-vienna-authoritarian-1934::milieu-tenement/lost-the-barn` tags: rural, fire, neighbor, loss, insurance, vienna, urban, crisis
  火从草料棚烧起来，等Wiener Psychoanalytische Vereinigung的手压泵接上井水，谷仓只剩黑梁。Anton和Lena在灰里扒出半袋没烧透的麦子，袋口一碰就碎。Lena蹲在地上，把焦麦一粒粒捡进帽子。
  _effects: cash -18 (谷仓夜里的红光（其中18克朗记入债务）); flag +lost_barn_to_fire; relation colleague with person-phase15-Lena-world-vienna-1912_

- **1937.01** `office16-scandal.public-hearing::ctx-vienna-authoritarian-1934::milieu-tenement/the-wrong-signature` tags: office, scandal, media, reputation, politics, power, vienna, urban
  报纸放大的签名其实是Emil Berg的：两个字母写得太像。更正启事登在第七版，只有三行；Anton的名字被拿掉了，Emil Berg的名字留了下来。第二天，Emil Berg没有来上班，桌上的茶杯还是满的。
  _effects: reputation 0.019999999999999997; relation acquaintance with person-materialized-world-vienna-1912-94; flag +scandal_misdirected; knowledge “被登出来的签名是书记员的，更正启事在第七版。”; mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-94_

- **1937.01** `state_expire:pc20-second-chance` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  Anton的「第二次机会」到期；相关安排结束。
  _effects: state_remove pc20-second-chance state:world-vienna-1912:617; flag -second_chance_open_

- **1937.01** `state_expire:fm17-miracle-witness` tags: fm17-miracle-witness, faith, miracle, vision, witness, religion, reputation, doubt
  Anton的「见过无法解释之事的人」到期；相关安排结束。
  _effects: state_remove fm17-miracle-witness state:world-vienna-1912:670_

- **1937.01** `agency:attend_meeting` tags: agency, agency:attend_meeting
  Anton去了Versammlungsraum der graphischen Arbeiter，坐在后排听完了关于Freie Gewerkschaft der graphischen Arbeiter W的争论；散会时带走一张油印提纲。
  _effects: historical development:initiative-org-printers-union-1934 as participant; knowledge “我参加了Freie Gewerkschaft der graphischen Arbeiter Wiens在。”; mood 0.030000000000000027_

- **1937.02** `vienna-historical-social-movement.public-meeting/speak-with-rent-numbers` tags: history, historical_process, social_movement, organization, politics
  折叠椅缺了一条腿，Anton站着说话，把粮店赊账的单据举起来念。Alois Kral 2在第三排跟着报出另一家的房租，两人一唱一和。大厅后头有人喊先谈罢工，主持人敲纸板叫安静。
  _effects: reputation 0.05999999999999999; skill; relation acquaintance with person-materialized-world-vienna-1912-60; relation acquaintance with person-materialized-world-vienna-1912-60_

- **1937.06** `vienna-tenement-neighbors.lost_room_key/key_found_by_neighbor` tags: home, social, family, housing
  Anton傍晚从面粉厂下工回来，发现挂在腰带上的房门钥匙不见了，在楼梯间来回找了四趟。Alois Moser在二楼拐角的煤堆旁捡到那把铜钥匙，钥匙上缠着红线，一眼就认出来。Alois Moser敲开Anton的门，把钥匙拍在桌上，说自己眼神好使。
  _effects: relation friend with person-materialized-world-vienna-1912-18; mood 0.050000000000000044_

- **1938.01** `vienna-life-anschluss-1938/flees` tags: politics, persecution, 1938, migration
  Anton在夜里收拾了一只箱子，把证件缝进外套内衬，搭上往西的火车。Helene Winter 2第二天来查人，只看到空床和没关严的窗。
  _effects: move place-klosterneuburg-aunt-house; role; cash -20 (escape and lodging（其中17.6克朗记入债务）); condition; relation acquaintance with person-materialized-world-vienna-1912-23_

- **1938.01** `p9-work-jobsearch.ask-trial/ask-trial.deposit-refused` tags: work, job_search, negotiation, wages, employment, task, trial, factory
  栅栏边的工友听着都低下头。Grete Lechner小声说这押金上个月还没有。Anton数了三遍手里的赫勒，差得远，只好说声打扰了，沿着墙根往下一家走。
  _effects: mood -0.050000000000000044; flag +seeking_work; reputation -0.009999999999999995; relation acquaintance with person-materialized-world-vienna-1912-62_

- **1938.03** `p9-gap-adult-ordinary-day.flea-market-cup/flea-market-cup.haggle-cheap` tags: adulthood, daily, leisure, neighborhood, ordinary, flea_market, object
  她本来已经走开了两步，又回头还了个价。摊主说这杯子是从一位老小姐的遗产里收来的，光收旧货的车钱就不止这些。Anton把三十赫勒排在摊布上，老头盯着看了一会儿，把杯子推过来。
  _effects: cash -0.3 (还价后买下旧杯子（其中0.3克朗记入债务）); skill; relation acquaintance with person-materialized-world-vienna-1912-101_

- **1938.05** `vienna-social-movement.meeting/speak-and-organize` tags: development, social_movement, organization, meeting
  Anton在后屋的会议上报出自己街区的名字：谁家缺煤，谁被房东催租，谁知道哪间印刷厂还在招人。第二区夜班出租合作社把这些事记进一本旧账本，散会时每个人带走一叠更小的纸条。
  _effects: skill; reputation 0.020000000000000004_

- **1939.01** `agency:attend_meeting` tags: agency, agency:attend_meeting
  Anton走到Haus der Tante in Klosterneuburg门口，看见便衣和拥挤的人群，最终没有进去。
  _effects: mood -0.040000000000000036; reputation -0.009999999999999995_

- **1939.02** `vienna-parish-aid.rent-box/rent-box.food-only` tags: faith, parish, mutual_aid, poverty, family
  Anton只收下篮里的面包和豆子，把煤袋推回Mitzi Hofer手里，说房租自己再想办法，请她们给介绍点零工。Mitzi Hofer把煤放在走廊窗台，说礼拜四后院有人要拆旧木箱，一赫勒一捆，工钱不多但现结。Anton记下门牌，答应一早过去。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-15_

- **1939.07** `vienna-medical-treatment.toothache/drops-and-endure` tags: health, medical, family, money
  药房伙计从褐色瓶里倒出药水，叮嘱别咽。Otto Berg在柜台边说，这玩意儿治标不治本。Anton把棉球塞进嘴里，腮帮子鼓出一块，走回巷子时拿手帕捂着脸，怕风吹。
  _effects: cash -0.6 (牙痛药水（其中0.6克朗记入债务）); condition_

- **1940.01** `p9-social-relationship-initiative.apology-at-bakery/semmel-no-words` tags: courtship, friendship, family, social, initiative, housing, task, task:social
  在柜台前买了两只 Semmel，递过一只，自己咬另一只，旧账一个字没提。对方接过面包，两人并肩站在店门口，把那点热气吃完。钱的事还横在中间，但对方说星期六照旧来喝咖啡，别又躲着。
  _effects: cash -0.14 (两只 Semmel（其中0.14克朗记入债务）); food; relation friend with person-phase15-Emil-world-vienna-1912; mood 0.030000000000000027_

- **1940.03** `p9-social-courtship-friendship.opened-letter/opened-letter-cold-reply` tags: courtship, friendship, social, adulthood, reputation, leopoldstadt
  Anton信了听来的话，把回信写得又短又冷，只问对方家里到底嫌哪一样，写完封了口，第二天一早塞进街角的邮筒。此后走廊里碰见Friedrich Stein 2，两边都只点头，话绕开信的事走；Anton与Berta Bauer 2之间那点热乎气，也被这四行字压凉了。
  _effects: mood -0.06000000000000005; relation acquaintance with person-materialized-world-vienna-1912-27; relation acquaintance with person-materialized-world-vienna-1912-103_

- **1940.10** `vienna-medical-treatment.sanatorium/home-rest` tags: health, medical, family, money
  炉子封小了，屋里凉得快，Anton把大衣盖在被子上。安娜收碗时看见窗台上一排药瓶，没说什么，第二天多带了半块黑面包。楼下的管道工敲了一下午铁皮，咳嗽声混在里面听不真切。
  _effects: health 0.03 (在家休养但条件有限); food; cash -0.5 (房东要求的清洁费（其中0.5克朗记入债务）); relation friend with person-materialized-world-vienna-1912-18_

- **1941.01** `p10-family-tasks.arrange-childcare/arrange-childcare.neighbor` tags: adulthood, family, social, marriage, care, inheritance, task, childcare
  老太太接过孩子，用旧围裙兜着坐在窗边，说一克朗一周，六点送来六点接。Anton数出硬币，把奶瓶放在她灶台边。第三夜孩子还是哭醒，Anton抱着他在屋里走，天亮前靠着床沿打了个盹。
  _effects: cash -1 (每周付邻居老太太的照看费（其中1克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-55; health -0.03 (孩子夜里哭醒，{subject}睡眠不足)_

- **1942.01** `statistical_death/violence` tags: death
  Anton在Haus der Tante in Klosterneuburg卷入一场冲突，头部和胸口受了重伤。旁人把人抬回家，夜里伤势恶化。Gustav Huber在场。
  _effects: death (暴力)_
## Hedwig

Born 1912.01, died 1928.01 (age 16).
Education: apprenticeship 1; occupation: none; roles: infant, child, pupil, child_worker, juvenile_record, lyceum_student.

### State snapshot
- cursed-by-wish [person] (ended 1928.1: owner_died) parameters={"severity":0.6,"triggers":0} links={} ticks=0
- p22-family-legend [person] (ended 1913.1: replaced_by:p22-family-legend) parameters={"warmth":58,"secrecy":58,"danger":25,"promise":57} links={} ticks=1
- p22-child-omen [person] (ended 1920.1: duration expired) parameters={"strangeness":43,"attention":54,"protection":46,"fear":32} links={} ticks=4
- p22-family-legend [person] (ended 1918.1: duration expired) parameters={"warmth":35,"secrecy":83,"danger":66,"promise":40} links={} ticks=3
- apprenticeship-contract [person] (ended 1927.2: replaced_by:apprenticeship-contract) parameters={"progress":30,"failures":0,"trade":"木工","paid":true} links={} ticks=1
- yf18-first-awakening [person] (ended 1928.1: owner_died) parameters={"intensity":58,"nerve":36,"talk":30,"reciprocated":true,"secret":true} links={"beloved":"Klara"} ticks=2
- apprenticeship-contract [person] (ended 1928.1: owner_died) parameters={"progress":5,"failures":0,"trade":"细木工","paid":true} links={} ticks=0

### 66 subject events

- **1912.04** `vienna-life-birth-letter-from-the-dead/the-letter-is-real` tags: infancy, family, secret, letter, drama
  邮差把一封边角磨白的信塞进门缝，收信人是一个已经死了三年的名字。Josefine Hofer把Hedwig放在膝上，拆开信，里面只有一句：“孩子像不像他？”Hermann Kral在门口探头，问是不是寄错了；Josefine Hofer把信折回去，说“没有寄错”。
  _effects: flag +letter_from_dead_relative; knowledge “一封写给死去亲人的信问：孩子像不像他。”; mood -0.04000000000000001_

- **1912.06** `p22-strange-cradle-secret::ctx-vienna-1912::milieu-tenement/the-ticket-is-redeemed` tags: infancy, family, cradle, secret, inheritance, strange, dark, drama
  Josefine Hofer拿着当票去赎，取回一把银勺子，勺柄上刻着一个看不清的字母。回家后把勺子塞进Hedwig手里，说“用吧”；孩子敲着桌沿，勺子发出很轻的响声，像在回答什么。
  _effects: cash -5 (redeeming the pawn ticket); health 0.010000000000000009 (a silver spoon to cut the first teeth); state_add p22-family-legend state:world-vienna-1912:11; flag +spoon_returned_

- **1912.06** `p22-comic-christening::ctx-vienna-1912::milieu-tenement/the-wrong-name` tags: infancy, family, christening, church, neighbor, comic, tender, drama
  神父念的是另一张纸条上的名字。Josefine Hofer小声纠正，Hedwig正好吐出一口奶，落在登记簿边上；神父用袖子擦了擦，说这样也算盖过章了，只是纸角留下一小片湿痕。
  _effects: mood -0.010000000000000002; knowledge “洗礼时神父差点念错孩子的名字。”; flag +wrong_christening_name; cash -1 (a christening candle)_

- **1913.01** `vienna-life-infant-first-smile/colic-night` tags: infancy, family, first, warm, injury
  夜里Hedwig哭了很久，Josefine Hofer抱着孩子在屋里来回走，数着地板缝。天快亮时孩子终于打了个嗝，安静下来；Josefine Hofer坐在床沿，发现自己还保持着走路的姿势。
  _effects: mood -0.03; health -0.010000000000000009 (lost sleep)_

- **1913.01** `state_tick:p22-family-legend/the-story-changes-hands/told-at-the-table` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，Hedwig家的故事在饭桌上换了新的讲法：多了一句笑话，少了一处哭声。听的人把汤匙放下，等下一句；讲故事的人却先去看窗子有没有关好，谁也没有先动筷子。
  _effects: state_parameter p22-family-legend.warmth 55 -> 58; state_parameter p22-family-legend.secrecy 60 -> 58; state_parameter p22-family-legend.promise 55 -> 57; mood 0.01_

- **1913.01** `p22-strange-cradle-secret::ctx-vienna-1912::milieu-tenement/the-bundle-in-the-lining` tags: infancy, family, cradle, secret, inheritance, strange, dark, drama
  Josefine Hofer拆洗摇篮衬里时，摸到一个硬角：一小块油布，里面包着一张当票和一缕头发，当票上的日期已经模糊。Josefine Hofer看了很久，又把油布缝回去，针脚比原来更密。
  _effects: state_add p22-family-legend state:world-vienna-1912:35; mood -0.03; flag +cradle_bundle; knowledge “摇篮衬里藏着一张当票和一缕头发。”_

- **1913.07** `vienna-life-toddler-wrong-cradle/the-blanket-is-wrong` tags: infancy, family, rumour, identity, comic, drama
  Emil Weiss盯着Hedwig的摇篮看了很久，说这床蓝被子不是这家人的。Josefine Hofer把被子翻过来，角落绣着一个陌生的姓；Hedwig却抓着被角不放，像是认得它。Emil Weiss退后一步，说“我什么都没说”。
  _effects: flag +wrong_cradle_blanket; knowledge “摇篮里的蓝被子绣着一个陌生的姓。”; mood -0.03_

- **1913.08** `p22-strange-doctor-prediction::ctx-vienna-1912::milieu-tenement/the-doctor-is-optimistic` tags: infancy, family, doctor, illness, omen, strange, dark, drama
  医生说孩子只是瘦，开了一瓶味道很坏的补药，说“过了春天就好了”。Josefine Hofer把这句话记了很多年；每年春天，家里都要说一遍，像在核对一张旧账单，药瓶上还贴着手写的标签。
  _effects: mood 0.03; state_add p22-child-omen state:world-vienna-1912:34; flag +doctor_optimism_

- **1913.08** `state_reaction:p22-child-omen/a-stranger-touches-the-door` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  一个陌生人把手按在Hedwig家的门框上，说这样能把坏运气留在门外。大人没有拦，只等那人走远，才用湿布把门框擦了一遍，布上留下一点灰，门框上留下一道浅印。
  _effects: state_parameter p22-child-omen.attention 35 -> 40; state_parameter p22-child-omen.fear 20 -> 24; state_parameter p22-child-omen.protection 45 -> 47; mood -0.01_
  _causes: evt:world-vienna-1912:000262_

- **1914.01** `vienna-life-toddler-first-words/first-word-more` tags: infancy, family, first, comic
  Hedwig把空碗推回Josefine Hofer面前，清清楚楚地说了一个字：“还要。”Josefine Hofer愣住，随后把锅底最后一点糊刮进碗里。孩子学会了用一句话让世界再转一圈。
  _effects: skill; mood 0.03_

- **1914.01** `state_tick:p22-child-omen/the-omen-returns/the-whole-street-knows` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  又过了一年，整条街都知道了Hedwig的事。卖菜的女人在门口画十字，孩子被大人拉远；Hedwig不懂为什么，只学会在别人看过来时先低下头，也学会了绕路走，不再问为什么。
  _effects: state_parameter p22-child-omen.attention 40 -> 50; state_parameter p22-child-omen.fear 24 -> 32; state_parameter p22-child-omen.protection 47 -> 44; flag +omen_public; mood -0.02_

- **1914.01** `state_tick:p22-family-legend/the-story-changes-hands/the-wrong-person-hears` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，Hedwig在门口把故事讲给一个收旧瓶的人听。第二天，整条楼道都在传另一个版本；家里把窗关上，把声音压得更低，故事从此有了第二个名字。
  _effects: state_parameter p22-family-legend.secrecy 80 -> 75; state_parameter p22-family-legend.danger 55 -> 63; flag +legend_leaked; mood -0.02_

- **1915.01** `vienna-life-child-family-legend/lost-relative` tags: childhood, family, secret, story
  Josefine Hofer在收拾箱子时翻出一张没有署名的照片，说那是家里一个“去了很远地方”的人。Hedwig问还回不回来，Josefine Hofer把照片翻过去，说先把名字记住，别在饭桌上问。
  _effects: knowledge “家里有一张没有署名的照片，照片上的人去了很远的地方。”; flag +family_legend_photo; mood -0.010000000000000002_

- **1916.01** `vienna-life-child-first-friend/stolen-marble` tags: childhood, friendship, family, comic
  Lena把Hedwig的玻璃弹珠藏进鞋里，被当场看见。Lena说只是“替你拿着”，Hedwig没有揭穿，也没有再拿出第二颗。两个人蹲在墙根，把一只蚂蚁看了很久，谁也没有先回家。
  _effects: relation friend with person-phase15-Lena-world-vienna-1912; skill; mood -0.010000000000000002_

- **1916.01** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Hedwig家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 75 -> 79; state_parameter p22-family-legend.warmth 35 -> 37; mood 0.010000000000000002_
  _causes: evt:world-vienna-1912:000644_

- **1916.01** `state_tick:p22-child-omen/the-omen-returns/nothing-happens` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  又过了一年，什么也没有发生。Hedwig照常吃饭、摔跤、把鞋穿反；那个说过预言的人搬走了。家里把红绳解下来，却没有扔，只收进针线盒最里面，红绳上落了一点灰。
  _effects: state_parameter p22-child-omen.strangeness 40 -> 38; state_parameter p22-child-omen.fear 32 -> 29; state_parameter p22-child-omen.protection 44 -> 46; mood 0.010000000000000002_

- **1916.01** `state_tick:p22-family-legend/the-story-changes-hands/a-detail-goes-missing` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，故事里最要紧的那件东西不见了：先是名字，后来是地点。Hedwig问起时，大人说“你记错了”；可柜子最底层那只空盒子，谁也没有扔，锁却换过了，钥匙也不见了。
  _effects: state_parameter p22-family-legend.secrecy 79 -> 83; state_parameter p22-family-legend.danger 63 -> 66; state_parameter p22-family-legend.warmth 37 -> 35; mood -0.010000000000000002_

- **1916.02** `vienna-life-child-inherited-wish/the-dead-grandmothers-wish` tags: childhood, family, wish, grief, uncanny, drama
  Hedwig在饭桌上忽然说：“等我长大了，要把那间屋子买回来。”Josefine Hofer的勺子停在半空，因为这句话是去世多年的外婆常说的，连“那间屋子”都指得一模一样。Hedwig说完就低头喝汤，好像只是随口。
  _effects: flag +inherited_wish_house; knowledge “孩子说要把“那间屋子”买回来，和去世的外婆说过的一模一样。”; mood -0.01_

- **1916.03** `p9-childhood-household.fever-night/vinegar-compress` tags: childhood, family, household, home, siblings, illness, neighbors
  碗里倒上醋，兑一半凉水，Josefine Hofer把布巾浸透，拧到不滴水，敷在Hedwig的额头上。布一热就换，换下来的搭在床沿。Hedwig半夜说梦话，Josefine Hofer用手背试了试温度，又去换一盆水。天亮时枕布湿了一片，Josefine Hofer的手指白得像泡过石灰。
  _effects: health 0.03 (湿敷后退了烧); mood 0.02; relation kin with person-josefine-hofer_

- **1917.02** `vienna-early-childhood.fever-night/home-remedy` tags: childhood, family, home, street
  Hedwig烧得翻来覆去，Josefine Hofer把醋倒进温水，用布蘸着擦手心、脚心，又去灶间煮接骨木汁。勺子送到嘴边，Hedwig偏头躲，Josefine Hofer就等一会儿再喂。鸡叫时炉火压小，床脚用旧大衣堵住。两天后热度退了，嘴唇起了一层干皮。
  _effects: health 0.03 (土法退烧，热度渐退); mood -0.06_

- **1918.01** `vienna-life-school-enrolment/enrolled` tags: childhood, school, fees
  Josefine Hofer带Hedwig到Leopoldstädter Volksschule报名。Otto Berg在名册上写下孩子的姓名和出生月份，收了两克朗书本费，让孩子第二天带一块石板来。
  _effects: education primary; cash -2 (school books（其中2克朗记入债务）); role; relation acquaintance with person-materialized-world-vienna-1912-20; relation acquaintance with person-materialized-world-vienna-1912-20_

- **1918.01** `state_tick:p22-child-omen/the-omen-returns/the-coincidence-repeats` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  又过了一年，同一件小事又发生了：钟停在同一个时刻，门口的狗对着空处叫。Hedwig正在学系鞋带，抬头问“又来了吗”；大人说没有，手却先去摸门框，谁也没有回答。
  _effects: state_parameter p22-child-omen.strangeness 38 -> 43; state_parameter p22-child-omen.attention 50 -> 54; state_parameter p22-child-omen.fear 29 -> 32; mood -0.009999999999999998_

- **1918.01** `state_expire:p22-family-legend` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  Hedwig的「家族传说」到期；相关安排结束。
  _effects: state_remove p22-family-legend state:world-vienna-1912:35_

- **1918.01** `p9-gap-childhood-chores.laundry-help/laundry-three-heller` tags: childhood, household, chores, school, task, daily, laundry, work
  床单浸了碱水，沉得拽不动。Hedwig站在木凳上，把湿布一点点递过绳，水顺着肘弯滴进袖口。Josefine Hofer在绳头数夹子，最后一条挂好，从围裙口袋里摸出三枚赫勒，按进Hedwig掌心。晚上洗手时，虎口那道口子被水一蜇，Hedwig才看见。
  _effects: cash 0.03 (帮邻居晾床单挣的三赫勒); health -0.03 (碱水泡手，虎口裂开); relation acquaintance with person-josefine-hofer_

- **1918.04** `p22-comic-job-or-child::ctx-vienna-university-1912::milieu-school/the-child-comes-to-work` tags: childhood, family, work, laundry, neighbor, comic, tender, drama
  家长会和工作撞在同一天。Josefine Hofer把Hedwig带进洗衣房，孩子坐在一堆待叠的床单中间，把袜子按颜色排成队，还唱了学校学的那首歌。老板娘笑得直不起腰，准了半天假。
  _effects: mood 0.04000000000000001; mood 0.03; cash 2 (half a day's wages kept); flag +laundry_day_

- **1918.09** `p22-drama-factory-accident::ctx-vienna-university-1912::milieu-school/the-child-carries-the-tools` tags: childhood, family, work, factory, accident, foreman, dramatic, gritty
  Hedwig替Josefine Hofer把工具袋提到厂门口，袋子比孩子还宽。工头看了一眼，给了孩子一枚铜币，说“回家去”。Hedwig把铜币攥了一路，回家才发现手心全是汗，铜币被藏在枕头底下。
  _effects: cash 1 (a copper coin from the foreman); flag +tool_bag; mood 0.009999999999999995; relation acquaintance with person-materialized-world-vienna-1912-28_

- **1919.01** `vienna-life-school-day/hungry-in-class` tags: childhood, school, hunger
  Hedwig早上只喝了一碗清汤，第二节课时眼前发黑。Alois Stein让孩子去走廊坐一会儿，给了半块面包；Hedwig把面包屑拢在手心吃完，胃里还是空的，但看Alois Stein的眼神软了些，回到座位时把腰挺直了一点。
  _effects: condition; relation acquaintance with person-materialized-world-vienna-1912-25; relation acquaintance with person-materialized-world-vienna-1912-25_

- **1919.01** `p9-gap-childhood-chores.market-line/line-half-flour` tags: childhood, household, chores, school, task, daily, market, food
  面粉袋压在胸口，越抱越沉。Hedwig前面的大婶一直往后靠，Hedwig就把膝盖顶住对方的篮子，硬留出半步。买到半袋面粉后，Hedwig的鞋跟留在人堆里，找回来时鞋面全是泥。回家路上布袋换了两次肩，赤脚踩过石板时脚底发麻。
  _effects: food; skill_

- **1919.02** `vienna-school-childhood.spelling-bee/spelling-bee.fail` tags: school, social, childhood
  Hedwig拼到一半停住，Grete Stein的尺子落在桌角上。放学后楼梯间只剩Hedwig一个人，把“Notwendigkeit”抄了二十遍，墨水瓶见了底。
  _effects: mood -0.060000000000000005; skill; relation acquaintance with person-grete-stein_

- **1919.02** `statistical_infection`
  Hedwig在Leopoldstädter Zinshaus, gemeinsamer Gang病倒了，肺炎让身体发热、虚弱，接下来的日子只能卧床。

- **1919.03** `statistical_illness_worsened`
  Hedwig的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1919.03** `vienna-school-childhood.soup-kitchen/soup-kitchen.extra` tags: school, social, childhood
  Hedwig放学后留在学校汤厨房帮Grete Stein搅锅，木勺比Hedwig的手臂还长。Grete Stein多给了Hedwig一勺扁豆汤，Hedwig用铁皮饭盒带回家，倒进母亲的锅里。
  _effects: food; relation acquaintance with person-grete-stein; skill_

- **1919.03** `r1-child.epidemic-closure::ctx-vienna-medical-1930::milieu-school/pasteboard-boxes-during-closure` tags: school, epidemic, closure, labour, quarantine, medical, university, knowledge
  停课第三天，Josefine Hofer让Hedwig去印刷所领糊纸盒的活。纸盒堆在床边，Hedwig糊到半夜，手指被浆糊粘得张不开。Helene Kral来给邻居孩子看病，看见Hedwig在灯下数纸盒，说这孩子该睡觉。
  _effects: cash 2 (停课十四天); condition; flag +child_labour_during_closure; relation acquaintance with person-materialized-world-vienna-1912-11; relation acquaintance with person-materialized-world-vienna-1912-19_

- **1919.06** `statistical_recovery`
  Hedwig从肺炎中慢慢恢复，能下床喝水，但身体还虚弱。

- **1920.01** `state_expire:p22-child-omen` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  Hedwig的「孩子身上的兆头」到期；相关安排结束。
  _effects: state_remove p22-child-omen state:world-vienna-1912:34_

- **1920.01** `r13-edu.school-roll-call::ctx-vienna-university-1912::milieu-school/attends-through-frost` tags: education, school, attendance, childhood, poverty, university, culture, schooling
  Hedwig踩着结冰的台阶进教室，第三个空位还空着。Josef Lechner 2让Hedwig把昨天的课文背完，又用戒尺敲了敲黑板，叫全班跟着念。放学时名字被写在红榜末尾，Hedwig把冻僵的手指揣进袖口，觉得明天还能来。放学路上，Hedwig把冻裂的手贴在热煤渣上。
  _effects: mood 0.03; flag +school_attendance_streak; skill_

- **1920.06** `r1-child.bully-teacher-son::ctx-vienna-university-1912::milieu-school/eraser-cut-in-half` tags: bullying, school, teacher, class, fear, university, culture, schooling
  教师儿子把Hedwig的橡皮切成两半，说穷人的橡皮本来就只有半块。Hedwig没有还手，把半块橡皮收进铅笔盒。第二天Hedwig发现自己的作业本被撕了两页，Maria Stein问是谁干的，全班都看着窗外。
  _effects: mood -0.08; flag +bullied_by_teachers_son; skill; relation rival with person:evt:world-vienna-1912:000062:child; relation acquaintance with person-materialized-world-vienna-1912-34_

- **1920.08** `vienna-childhood-friends.secret-kiosk/found-coin-under-rack` tags: childhood, social, school, street
  明信片架子底下有灰，Hedwig的手指碰到一枚硬东西，摸出来是两赫勒。Helene Winter背对着柜台数报纸，Hedwig把硬币攥在掌心，指给Helene Winter看一张风景画片。找零时Helene Winter的手停了一下，多看了一眼，还是把画片递了过来。
  _effects: cash -0.02 (买画片花掉捡到的硬币); condition; relation acquaintance with person-helene-winter_

- **1921.01** `vienna-life-child-labour/folds-notices` tags: childhood, labour, piecework
  Buchdruckerei Winter & Söhne把一捆教区通告交给Josefine Hofer带回家。Hedwig放学后在厨房桌上折页到夜里，手指沾满油墨，两周后交回六千张，拿到三克朗二十赫勒；钱交给Josefine Hofer时，Hedwig的指尖已经洗不干净，指甲缝里留着一圈黑；家里从此多了一个能挣几个铜板的孩子。
  _effects: cash 3.2 (folding parish notices); condition; role_

- **1921.01** `p9-gap-childhood-chores.laundry-help/laundry-bread-with-friend` tags: childhood, household, chores, school, task, daily, laundry, work
  Maria Kral家的孩子站在绳子另一头，Hedwig递夹子时故意慢半拍，两个人把床单拉得没有一道褶。收工后Maria Kral端出半包隔夜面包，掰开时掉了一桌屑。Hedwig把分到的那块用围裙兜住，回家路上闻着麦味，硬是没咬。
  _effects: food; relation acquaintance with person-maria-kral; skill_

- **1921.03** `vienna-childhood-street.market-errand/errand-bullied` tags: childhood, street, social, home
  Hedwig被推到拱廊柱子边，围裙带子绕了两圈，系在铁环上。Hedwig一挣，肩膀撞上石柱，整条胳膊麻了一下。Berta Winter提着菜篮过来，把篮子往地上一放，从怀里摸出削土豆的小刀，挑开绳结，没跟那两个孩子说一句话。
  _effects: relation friend with person:evt:world-vienna-1912:000062:child; mood -0.05; condition_

- **1921.08** `vienna-school-childhood.spelling-bee/spelling-bee.win` tags: school, social, childhood
  拼写比赛结束时，Friedrich Weiss敲了敲讲台说“记住这个词”。Hedwig袖口上多了一枚小十字章，回家路上Mitzi追着要看，最后用三颗李子换了眼福。
  _effects: reputation 0.08; mood 0.1; relation acquaintance with person-materialized-world-vienna-1912-38; food; relation acquaintance with person-materialized-world-vienna-1912-38_

- **1922.01** `p9-gap-childhood-chores.market-line/line-sold-out-potatoes` tags: childhood, household, chores, school, task, daily, market, food
  木窗“咔”地合上，Hedwig的布袋还敞着口。伙计隔着板缝说下星期再来。Hedwig在墙根站了一会儿，把硬币排在掌心数了两遍，走到旁边土豆摊前，挑了几个小的，让摊主当面过秤。家里人晚上把钱和土豆倒在桌上，重新数了一遍。
  _effects: food; mood -0.03; skill; relation acquaintance with person-materialized-world-vienna-1912-39_

- **1923.01** `p9-gap-childhood-chores.fetch-coal/coal-refused-nuggets` tags: childhood, household, chores, school, task, daily, coal, errand
  Hedwig空手站在窗口，听掌柜说“叫你Friedrich Hofer来”，耳朵一直红到脖子。后墙的渣堆冻得硬，Hedwig用鞋尖刨开表层，把煤核一颗颗捡进围裙。回家路上碰到同巷的孩子，Hedwig把纸袋往身后藏，进门才交给Friedrich Hofer。
  _effects: mood -0.039999999999999994; food; skill_

- **1924.01** `r13-edu.ask-teacher::ctx-vienna-university-1912::milieu-school/note-under-inkwell` tags: education, teacher, help, school, confidence, university, culture, schooling
  Hedwig等到天黑，Friedrich Weiss一直在改别的班的卷子，头也没抬。Hedwig把问题写在纸条上压在墨水瓶下，第二天发现纸条还在原处，只是背面多了一行字：“先看第三章。”Hedwig按纸条翻到第三章，发现那页夹着一张旧的辅助线图，图上的线画得很轻。
  _effects: skill_

- **1924.02** `r3-crime.juvenile-court::ctx-vienna-university-1912::milieu-school/admonished-and-sent-home` tags: crime, youth, court, family, school, university, culture, schooling
  Helene Winter 2把案卷合上，问Hedwig知不知道错了。Hedwig的腿在长椅上晃着，够不着地，说“知道”。Josefine Hofer在旁边一直点头，Alois Moser把一张写着“训诫”的纸递给她。出门时，Josefine Hofer把纸折好放进内衣口袋，怕人看见。
  _effects: flag +admonished_by_juvenile_court; role; relation guardian with person-josefine-hofer; knowledge “the juvenile court keeps a record even without a sentence”; relation acquaintance with person-materialized-world-vienna-1912-23; relation acquaintance with person-materialized-world-vienna-1912-18_

- **1925.01** `major-education-scholarship-examination/half-scholarship` tags: education, scholarship, adolescence, major
  成绩排在第七名，离全免只差两个名次。Grete Stein替Hedwig去问，回来把一张纸摊在桌上：学费减半，另给十五克朗书费，车钱和冬衣自理。Josefine Hofer算了一夜，把准备换炉子的钱挪出来，第二天在同意书末尾按了手印。
  _effects: education secondary; cash 15 (half scholarship book grant); role; flag +half_fee_place; relation acquaintance with person-grete-stein_

- **1925.01** `r13-edu.music-lesson::ctx-vienna-reform-1930::milieu-tenement/muted-practice` tags: education, music, lesson, craft, culture, reform, medical, schooling
  Hedwig在阁楼练琴，楼下邻居上来敲门，说孩子要睡觉。Hedwig把弱音器夹上，声音闷得像蚊子。练到半夜，Hedwig索性放下琴，把谱子默写了一遍，第二天在课上凭记忆拉完，Grete Stein问Hedwig是不是没睡好。第二天Hedwig把弱音器取下来，换到更远的阁楼。
  _effects: mood -0.04000000000000001; skill_

- **1925.02** `r15-work.master-takes-on::ctx-vienna-reform-1930::milieu-tenement/signed-contract` tags: work, craft, apprentice, trade, poverty, reform, medical, schooling
  Gustav Stein把学徒契约摊在桌上，指给Hedwig看期限、工钱和出师考试。Hedwig签了名，第二天站到刨床前，手指上多了第一道木刺。
  _effects: relation employer with person-materialized-world-vienna-1912-52; state_add apprenticeship-contract state:world-vienna-1912:145; relation acquaintance with person-materialized-world-vienna-1912-52; education apprenticeship; role_

- **1925.02** `r3-teen.dormitory-theft::ctx-vienna-reform-1930::milieu-school/found-thief` tags: education, dormitory, theft, trust, institution, reform, medical, schooling
  Hedwig在柜门合页上抹了一层粉笔灰，第二天看见灰印落在邻床的鞋面上。Friedrich Weiss打开那只箱子，表就压在脏袜子下面。Emil Hofer把欠Hedwig的半块面包还了回来。
  _effects: flag +found_dormitory_thief; relation friend with person-materialized-world-vienna-1912-43; relation colleague with person-materialized-world-vienna-1912-38; knowledge “the watch was hidden in the neighboring bed”; relation acquaintance with person-materialized-world-vienna-1912-43_

- **1925.02** `yf18-firstlook.tram-glove::ctx-vienna-reform-1930::milieu-school/let-friend-return-it` tags: first_love, love, tram, glove, youth, courtship, reform, medical
  Hedwig把手套交给Emil，让Emil替自己去还。Emil回来时说，Klara问是谁捡到的；Emil顺口报了一个名字，Hedwig听见那名字不是自己的，笑得比平时响。
  _effects: state_add yf18-first-awakening state:world-vienna-1912:146; mood -0.010000000000000009; flag +yf18_first_awakening_active_

- **1925.02** `r15-education.entry-offer::ctx-vienna-reform-1930::milieu-school/offer-declined-black-humour` tags: education, scholarship, opportunity, reform, medical, schooling, school, teacher
  Hedwig把入学通知折成纸船放进河里；家里少了一张嘴吃饭，也少了一个读书人。
  _effects: cash 10 (sold the textbooks instead); education none_

- **1925.02** `r2-leisure.ferris-wheel::ctx-vienna-reform-1930::milieu-tenement::ferris-wheel-reform/found-a-loose-bolt` tags: leisure, fairground, ferris_wheel, fear, youth, reform, medical, schooling
  检查员来的时候，Ferdinand Lechner让Hedwig和Emil免费坐一趟，说帮忙试试新座椅。座舱升到顶，检查员在下面喊“晃一晃”。Hedwig抓着扶手摇了两下，听见铁架发出一种空心的响声。检查员在本子上写了一个字，Ferdinand Lechner的脸就沉了。
  _effects: reputation 0.03; condition; flag +found_loose_ferris_bolt; relation acquaintance with person-materialized-world-vienna-1912-14; knowledge “one of the ferris wheel bolts is loose”; relation acquaintance with person-materialized-world-vienna-1912-14_

- **1926.01** `yf18-friend.two-tickets::ctx-vienna-reform-1930::milieu-tenement/three-on-two-tickets` tags: first_love, friendship, betrayal, dance, tickets, reform, medical, schooling
  Hedwig最后还是去了，Mitzi和Lena已经坐在第三排。Hedwig在过道边加了一把椅子，三个人挤在两个座位上；引座员来查票，Mitzi说Hedwig是自己的妹妹，Hedwig在黑暗里笑得直抖，笑完才发现Lena的手一直放在Mitzi的袖子上。
  _effects: state_parameter yf18-first-awakening.intensity 35 -> 38; state_parameter yf18-first-awakening.talk 10 -> 18; state_parameter yf18-first-awakening.nerve 10 -> 15; relation friend with person-phase15-Mitzi-world-vienna-1912; relation friend with person-phase15-Lena-world-vienna-1912; reputation -0.009999999999999995; mood 0.010000000000000009_

- **1926.01** `state_tick:apprenticeship-contract/workshop-year/learned` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Hedwig又学会了一道工序。师傅没有夸，只把下一块料推到面前。
  _effects: state_parameter apprenticeship-contract.progress 10 -> 30; skill; mood 0.020000000000000004_

- **1926.01** `state_tick:yf18-first-awakening/half-year-of-glances/answered-glance` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Hedwig在教堂门口或学校走廊里又遇见Klara。这一次对方先点了头，Hedwig准备好的整段话全忘了，只把手里的书换到另一只手上；回家后Hedwig才发现，自己把书拿倒了。
  _effects: state_parameter yf18-first-awakening.intensity 38 -> 43; state_parameter yf18-first-awakening.nerve 15 -> 23; state_parameter yf18-first-awakening.reciprocated false -> true; relation friend with person-phase15-Klara-world-vienna-1912; mood 0.03_

- **1926.01** `task-vienna-youth-apprenticeship-search/no-vacancy` tags: task, task:work, work, adolescence, apprenticeship
  Hedwig问了三家印刷厂，得到的回答都是“今年不收学徒”。最后一家让他把名字写在纸角上，说有空缺再通知，但谁都知道那张纸会被压在账本下面。
  _effects: mood -0.05; knowledge “今年印刷厂大多不收新学徒。”; relation acquaintance with person-materialized-world-vienna-1912-45_

- **1926.02** `yf18-dare.prater-slide::ctx-vienna-reform-1930::milieu-school/sell-the-story` tags: dare, prater, fairground, comic, friendship, reform, medical, schooling
  第二天，Hedwig在教室里把滑道说成三层楼高、底下是鳄鱼池。Lena配合着补充细节，连Friedrich Weiss的灯都被说成探照灯；全班听得入神，只有后排的Rosa问了一句“那你为什么裤子破了”。
  _effects: reputation 0.03; mood 0.03; relation friend with person-phase15-Lena-world-vienna-1912; flag +yf18_prater_story_

- **1926.08** `r13-turn.exam-failure::ctx-vienna-reform-1930::milieu-school::reform-open-secondary/retake-fee` tags: education, exam, failure, school, work, reform, medical, schooling
  成绩单上差两分。Friedrich Weiss说可以补考，但要先交一克朗卷子费，还得让Friedrich Hofer来签字。Friedrich Hofer在办公室门口把帽子捏变了形，说家里拿不出这份钱。Hedwig把错题抄到烟盒背面，第二天照样去上课，只是不再举手。
  _effects: cash -1 (落榜名单上的第三个名字); mood -0.15; condition; flag +failed_entrance_exam; skill; relation guardian with person-friedrich-hofer_

- **1926.11** `yf18-friend.two-tickets::ctx-vienna-reform-1930::milieu-tenement/confront-at-the-cloakroom` tags: first_love, friendship, betrayal, dance, tickets, reform, medical, schooling
  Hedwig在衣帽间堵住Klara，问那两张票怎么到了Anton手里。Klara说Hedwig从来没敢开口，自己只是替Hedwig把话说了；Hedwig把票根揉成一团，塞进Klara的西装口袋，转身时撞翻了侍者的托盘。
  _effects: state_parameter yf18-first-awakening.intensity 51 -> 56; state_parameter yf18-first-awakening.talk 18 -> 28; state_parameter yf18-first-awakening.nerve 33 -> 28; relation friend with person-phase15-Klara-world-vienna-1912; reputation -0.020000000000000004; mood -0.05000000000000002_

- **1927.01** `yf18-firstlook.parish-dance::ctx-vienna-reform-1930::milieu-tenement/the-second-dance` tags: first_love, dance, church, courtship, jealousy, reform, medical, schooling
  舞卡上第一支曲子被Anton写走了。Hedwig在教会礼堂的木地板上踩错了两步，Anton说没关系，把手放回Hedwig背后；第三支曲子响起时，Klara在门口冲Hedwig比了个手势，Hedwig假装没看见。
  _effects: state_parameter yf18-first-awakening.intensity 43 -> 51; state_parameter yf18-first-awakening.nerve 23 -> 33; state_parameter yf18-first-awakening.reciprocated true -> true; mood 0.04000000000000001_

- **1927.01** `state_tick:yf18-first-awakening/half-year-of-glances/answered-glance` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Hedwig在教堂门口或学校走廊里又遇见Klara。这一次对方先点了头，Hedwig准备好的整段话全忘了，只把手里的书换到另一只手上；回家后Hedwig才发现，自己把书拿倒了。
  _effects: state_parameter yf18-first-awakening.intensity 56 -> 61; state_parameter yf18-first-awakening.nerve 28 -> 36; state_parameter yf18-first-awakening.reciprocated true -> true; relation friend with person-phase15-Klara-world-vienna-1912; mood 0.02999999999999997_

- **1927.01** `r13-edu.exam-eve::ctx-vienna-reform-1930::milieu-school/stairwell-cramming` tags: education, exam, study, poverty, adolescence, reform, medical, schooling
  Hedwig家交不起补习费，只能借同学的旧讲义。夜里楼梯间的灯被房东关掉，Hedwig蹲在厕所门口背单词，背到一半睡着了，第二天在考场上把年份写错。补考通知寄到家里，Josefine Hofer把它压在煤箱底下，没让Hedwig看见。第二天眼睛肿着。
  _effects: mood -0.07_

- **1927.01** `state_reaction:yf18-first-awakening/exam-week-distraction` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  考试周里，Hedwig把课本摊在桌上，眼睛却一直看着窗外那条电车线。笔记的页边多了几个没有写完的名字，Hedwig用橡皮擦掉，纸面起了毛。
  _effects: state_parameter yf18-first-awakening.intensity 61 -> 58; state_parameter yf18-first-awakening.talk 28 -> 30_
  _causes: evt:world-vienna-1912:003525_

- **1927.02** `yf18-family.one-apprenticeship::ctx-vienna-reform-1930::milieu-tenement/yield-to-the-younger` tags: siblings, apprenticeship, scarcity, family_duty, choice, reform, medical, schooling
  木匠铺只收一个学徒，押金却要两份。Josefine Hofer把两张表格摊在桌上，说家里只拿得出一次；Hedwig看见Lena把铅笔削得很尖，最后说让Lena去。第二天，Hedwig去码头找了半日工，回家时Lena正在院子里练刨花，刨子是新领的，柄上还缠着纸条。
  _effects: state_add apprenticeship-contract state:world-vienna-1912:253; cash 2 (half-day wages from the docks); relation kin with person-phase15-Lena-world-vienna-1912; flag +yf18_yielded_apprenticeship; mood -0.01999999999999999; role; education apprenticeship; role_

- **1928.01** `statistical_death/other` tags: death
  Hedwig在Leopoldstädter Zinshaus, gemeinsamer Gang突发急病，高热和虚弱持续了几天。医生没能给出明确诊断，Hedwig在一个夜里去世。Anton在场。
  _effects: death (急性疾病); flag -yf18_first_awakening_active; role_
## Alois Lechner

Born 1877.02, died 1954.02 (age 77).
Education: apprenticeship 3; occupation: none; roles: printer, union_member, union_secretary, father, street_violence_victim, office:档案助理, injured_worker, neighbourhood_helper, grieving_father, refused_kinsman, untreated_patient, sanatorium_patient, office:顾问, movement_member, denouncer, morphine_patient, godparent, chronic_pain_patient, guardian.

### State snapshot
- public-scandal [person] (ended 1918.1: duration expired) parameters={} links={} ticks=1
- p22-scandal-engine [person] (ended 1918.1: duration expired) parameters={"heat":68,"reach":54,"leverage":18,"shame":64} links={} ticks=2
- p22-wild-fortune [person] (ended 1918.1: duration expired) parameters={"height":34,"absurdity":55,"witnesses":60,"fragility":42} links={} ticks=2
- pl19-protected-scandal [person] (ended 1922.1: duration expired) parameters={"exposure":55,"protection":45,"leverage":71,"publicHeat":62} links={"protector":"Gustav Berg"} ticks=5
- sm18-missing-object [person] (ended 1919.1: 失物在失物招领处被领回) parameters={"attachment":55,"leads":25,"suspicion":5,"object":"孩子的洗礼铜牌"} links={} ticks=0
- public-scandal [person] (ended 1922.1: duration expired) parameters={} links={} ticks=1
- p22-scandal-engine [person] (ended 1919.6: replaced_by:p22-scandal-engine) parameters={"heat":61,"reach":49,"leverage":22,"shame":58} links={} ticks=0
- p22-wild-fortune [person] (ended 1921.1: replaced_by:p22-wild-fortune) parameters={"height":49,"absurdity":68,"witnesses":75,"fragility":47} links={} ticks=1
- p22-scandal-engine [person] (ended 1922.1: duration expired) parameters={"heat":38,"reach":63,"leverage":50,"shame":30} links={} ticks=2
- p22-wild-fortune [person] (ended 1923.1: duration expired) parameters={"height":34,"absurdity":55,"witnesses":60,"fragility":42} links={} ticks=2
- public-scandal [person] (ended 1924.1: duration expired) parameters={} links={} ticks=1
- p22-scandal-engine [person] (ended 1924.1: duration expired) parameters={"heat":47,"reach":50,"leverage":16,"shame":41} links={} ticks=2
- ad20-private-bargain [person] (ended 1923.1: duration expired) parameters={"leverage":50,"trust":59,"debt":53,"exit":22} links={"beneficiary":"Anna Moser"} ticks=2
- debt-bondage [person] (ended 1927.1: duration expired) parameters={"debt":33,"creditor":"死者家属"} links={} ticks=3
- p22-wild-fortune [person] (ended 1928.1: duration expired) parameters={"height":29,"absurdity":55,"witnesses":41,"fragility":69} links={} ticks=2
- af17-lucky-idiot [person] (ended 1929.1: duration expired) parameters={"streak":11,"suspicion":64,"explanation":"说不清"} links={} ticks=4
- pc20-second-chance [person] (ended 1933.1: duration expired) parameters={"credibility":56,"debt":43,"hope":53,"suspicion":48} links={} ticks=4
- bc18-ridiculous-fame [person] (ended 1934.1: duration expired) parameters={"notoriety":51,"legitimacy":0,"absurdity":77,"invitations":1,"boredom":20,"officialStory":"安全火柴的发明人"} links={} ticks=3
- office-under-siege [person] (ended 1934.1: duration expired) parameters={"exposure":40,"support":45,"months":0,"cause":"double invoiced paper","positionId":"pos:taxi:person-materialized-world-vienna-1912-37-evt:world-vienna-1912:003231:顾问:4637"} links={} ticks=1
- bc18-bureaucratic-ghost [person] (ended 1936.1: duration expired) parameters={"fileDepth":36,"sightings":3,"risk":49,"duplicates":3,"officialStatus":"在户籍册上已死亡","alias":"一份注销的配给卡"} links={} ticks=3
- pc20-second-chance [person] (ended 1939.1: duration expired) parameters={"credibility":64,"debt":30,"hope":72,"suspicion":28} links={} ticks=4
- eh19-late-testimony [person] (ended 1938.9: the corrected deposition ended the late testimony) parameters={"memory":55,"pressure":38,"danger":20,"truth":45} links={} ticks=0
- em18-late-bloom [person] (ended 1944.1: duration expired) parameters={"nerve":37,"stamina":32,"tether":92,"publicness":47} links={} ticks=6
- p21-fortune-reversal [person] (ended 1942.1: duration expired) parameters={"height":30,"fragility":80,"witnesses":75,"debt":25} links={} ticks=4
- eh19-late-testimony [person] (ended 1943.1: the corrected deposition ended the late testimony) parameters={"memory":61,"pressure":50,"danger":20,"truth":35} links={} ticks=3
- p21-fortune-reversal [person] (ended 1943.4: replaced_by:p21-fortune-reversal) parameters={"height":60,"fragility":50,"witnesses":70,"debt":10} links={} ticks=0
- eh19-late-testimony [person] (ended 1943.4: the corrected deposition ended the late testimony) parameters={"memory":50,"pressure":45,"danger":20,"truth":40} links={} ticks=0
- p21-fortune-reversal [person] (ended 1944.6: replaced_by:p21-fortune-reversal) parameters={"height":46,"fragility":64,"witnesses":75,"debt":15} links={} ticks=1
- em18-late-bloom [person] (ended 1950.1: duration expired) parameters={"nerve":66,"stamina":24,"tether":62,"publicness":40} links={} ticks=6
- eh19-late-testimony [person] (ended 1944.6: the corrected deposition ended the late testimony) parameters={"memory":55,"pressure":38,"danger":20,"truth":45} links={} ticks=0
- p21-fortune-reversal [person] (ended 1946.9: replaced_by:p21-fortune-reversal) parameters={"height":44,"fragility":66,"witnesses":70,"debt":20} links={} ticks=2
- eh19-late-testimony [person] (ended 1946.9: the corrected deposition ended the late testimony) parameters={"memory":55,"pressure":38,"danger":20,"truth":45} links={} ticks=0
- p21-fortune-reversal [person] (ended 1950.1: duration expired) parameters={"height":36,"fragility":74,"witnesses":70,"debt":25} links={} ticks=4
- eh19-late-testimony [person] (ended 1954.1: duration expired) parameters={"memory":51,"pressure":100,"danger":37,"truth":23} links={} ticks=6
- pc20-public-reversal [person] (ended 1949.5: replaced_by:pc20-public-reversal) parameters={"proof":44,"pressure":60,"support":37,"danger":45} links={"accuser":"Friedrich Berg 2"} ticks=0
- pc20-public-reversal [person] (ended 1950.2: replaced_by:pc20-public-reversal) parameters={"proof":41,"pressure":64,"support":37,"danger":42} links={"witness":"Gustav Huber 2"} ticks=1
- p21-scandal-web [person] (ended 1951.1: replaced_by:p21-scandal-web) parameters={"exposure":68,"loyalty":35,"leverage":44,"danger":45} links={} ticks=1
- p21-scandal-web [person] (ended 1952.10: replaced_by:p21-scandal-web) parameters={"exposure":57,"loyalty":39,"leverage":50,"danger":37} links={} ticks=1
- pc20-public-reversal [person] (ended 1953.1: replaced_by:pc20-public-reversal) parameters={"proof":73,"pressure":64,"support":52,"danger":58} links={"witness":"Gustav Bauer"} ticks=2
- em18-late-bloom [person] (ended 1951.6: replaced_by:em18-late-bloom) parameters={"nerve":56,"stamina":55,"tether":38,"publicness":10} links={} ticks=1
- em18-late-bloom [person] (ended 1954.2: owner_died) parameters={"nerve":75,"stamina":34,"tether":42,"publicness":41} links={} ticks=3
- pc20-public-reversal [person] (ended 1954.2: owner_died) parameters={"proof":32,"pressure":65,"support":30,"danger":51} links={"accuser":"Rosa Berg"} ticks=1
- p21-scandal-web [person] (ended 1954.2: owner_died) parameters={"exposure":65,"loyalty":39,"leverage":44,"danger":42} links={} ticks=2
- eh19-late-testimony [person] (ended 1954.2: owner_died) parameters={"memory":58,"pressure":32,"danger":15,"truth":43} links={} ticks=1

### 449 subject events

- **1912.03** `major-crisis.street-violence/victim-in-the-gutter` tags: crisis, politics, violence, death, street, reputation, injury
  Alois Lechner被人从背后推倒，后腰挨了两脚，左眼肿得睁不开。Rosa Lechner把Alois Lechner拖进面包房的送货门，用围裙按住流血的眉骨；外头有人吹哨，穿制服的人开始清场。Alois Lechner的工牌在混乱中丢了，第二天上班时，门房让他先去找医生开证明。
  _effects: health -0.16000000000000003 (kicked in the back and struck above the eye during the market fight); condition; flag +beaten_in_street_clash; role; relation acquaintance with person-rosa-lechner; reputation -0.02; cash -6 (doctor certificate for the employer)_

- **1912.10** `vienna-historical-social-movement.relief-network/leave-supplies-for-organization` tags: history, historical_process, social_movement, organization, politics
  Alois Lechner把能动的煤和面包都留给Wiener Psychoanalytische Vereinigung的储备，说自家还能撑几天。Emil Weiss不肯收那半条面包，Alois Lechner就放在窗台上吹凉。孩子问晚上吃什么，Alois Lechner说粥里多加点盐。
  _effects: food; relation acquaintance with person-emil-weiss; condition_

- **1913.01** `vienna-life-work-injury/crushed-hand` tags: adulthood, labour, injury
  Alois Lechner在换纸时左手被压板夹住。工友关掉机器，工头拿来急救箱，把伤手包起来送去医院；厂里先垫了十克朗医药费，事故报告写的是“操作不慎”。Alois Lechner的左手从此握不紧拳，指尖总是凉的，天阴时骨缝里发疼。
  _effects: health -0.24 (crushed left hand); condition; cash 10 (employer medical advance)_

- **1913.01** `office16-hire.protege::ctx-vienna-1912::milieu-printshop/hired-competent` tags: office, hire, patronage, bureaucracy, work, power, vienna, urban
  Alois Lechner把Rosa Lechner的名字写在编制表的空行上，又在旁边注了“试用三个月”。Gustav Berg提醒说预算只够半个位置，Alois Lechner还是把名字留下了。第二天，Rosa Lechner提前半小时到，把走廊里的旧档案按年份重新排了一遍。
  _effects: position 助理文书 @org-printers-union; organization_funds; relation colleague with person-rosa-lechner; reputation 0.03; flag +hired_protege_

- **1913.01** `agency:recruit_members` tags: agency, agency:recruit_members
  Alois Lechner找到Emil Weiss，把Freie Gewerkschaft der graphischen Arbeiter Wiens的章程和会费说清楚；对方留下地址，答应下次再来。
  _effects: organization_membership; relation acquaintance with person-emil-weiss; knowledge “我通过Alois Lechner加入了Freie Gewerkschaft der graphischen Arbeit”_

- **1913.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Josef Lechner这周主动擦了黑板。Alois Lechner把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 20 -> 23; mood 0.020000000000000004_
  _causes: evt:world-vienna-1912:000155_

- **1913.01** `initiative:found_process:org-printers-union`
  Freie Gewerkschaft der graphischen Arbeiter Wiens在Versammlungsraum der graphischen Arbeiter经过数年的招募、会议和互助，把分散的行动整理成公开纲领；这不是预先写好的历史，而是成员自己累积出来的运动。
  _effects: historical process Freie Gewerkschaft der graphischen Arbeiter Wiens的持续运动; historical development:initiative-org-printers-union-1913 as organizer; historical development:initiative-org-printers-union-1913 as organizer; historical development:initiative-org-printers-union-1913 as organizer; knowledge “Freie Gewerkschaft der graphischen Arbeiter Wiens的持续运动不是一次会议”; reputation 0.04000000000000001_

- **1913.01** `historical_phase`
  历史进程《Freie Gewerkschaft der graphischen Arbeiter Wiens在Versammlungsraum der graphisch》从 emerging 进入 mobilizing。
  _effects: knowledge “我亲历或知晓「Freie Gewerkschaft der graphischen Arbeiter Wiens在Ver”; knowledge “我亲历或知晓「Freie Gewerkschaft der graphischen Arbeiter Wiens在Ver”; knowledge “我亲历或知晓「Freie Gewerkschaft der graphischen Arbeiter Wiens在Ver”_
  _causes: evt:world-vienna-1912:000162_

- **1913.05** `p9-history-union-political.reform-meeting/reform-read-petition` tags: politics, union, party, meeting, leaflet, police, strike, reform
  提问时间一到，Alois Lechner站起来，把请愿书上的三条逐条读出：房租上限、成年男子普选、十小时工时。Friedrich Hofer在台上让记录员一条条记下，礼堂里有人跟着低声重复那三个数目。
  _effects: reputation 0.05; knowledge “市政厅旁的会议上，官员让记录员把三条请愿要求记进了正式记录”_

- **1914.01** `vienna-life-injury-recovery/clinic-treatment` tags: health, work, family
  Alois Lechner在受伤后的第三天去了诊所。医生清洗伤口、换药，收下诊费，嘱咐不要急着回机器旁。Alois Lechner把药方折好，回家路上买了纱布。
  _effects: health 0.050000000000000044 (wound treatment); cash -8 (clinic and bandages); condition_
  _causes: evt:world-vienna-1912:000001_

- **1914.01** `major-work-injury/injury-compensation-refused` tags: work, injury, disability, unemployment, major
  事故簿上写着“擅自清理滚筒”。Buchdruckerei Winter & Söhne的工头让Alois Lechner先按手印，说按了才有医药费；Luise Kral说护罩早就坏了，保险会的职员没有记下。窗口里的职员翻了两页，把文件合上，说这属于重大过失。Alois Lechner卖掉怀表付了十二克朗药费，右手从此伸不直，厂里也不再排班。
  _effects: health -0.18 (crushed right hand); condition; unemployment (dismissed after the accident report); cash -12 (medicine paid after the claim was refused); role; flag +compensation_denied_

- **1914.01** `ad20-child-teacher::ctx-vienna-1912::milieu-tenement/the-teacher-has-a-question` tags: family, child, school, teacher, everyday, public, vienna, urban
  Grete Stein问Alois Lechner，Mitzi Lechner最近为什么总在课上打瞌睡。Alois Lechner说家里晚上在赶一批活；Grete Stein点点头，说“别让孩子熬太晚”。Alois Lechner应了一声，心里却在算那批活还能不能按时交。
  _effects: relation acquaintance with person-grete-stein; state_parameter raising-child.schoolProgress 23 -> 25; mood 0.020000000000000004; flag +teacher_asked_homework_

- **1914.01** `state_reaction:raising-child/child-death-in-the-household` tags: raising-child, family, child, care, school, household, state, state_reaction
  孩子的名字从学校的名册上被划掉以后，家里的碗还多摆了一副。Alois Lechner没有把它收起来，直到有一天发现碗沿积了灰，才拿去洗。
  _effects: state_parameter raising-child.childConfidence 55 -> 25; state_parameter raising-child.caregiverBurden 45 -> 60; mood -0.1; flag +lost_child_
  _causes: evt:world-vienna-1912:000290_

- **1914.01** `state_reaction:raising-child/child-death-in-the-household` tags: raising-child, family, child, care, school, household, state, state_reaction
  孩子的名字从学校的名册上被划掉以后，家里的碗还多摆了一副。Alois Lechner没有把它收起来，直到有一天发现碗沿积了灰，才拿去洗。
  _effects: state_parameter raising-child.childConfidence 55 -> 25; state_parameter raising-child.caregiverBurden 45 -> 60; mood -0.1_
  _causes: evt:world-vienna-1912:000290_

- **1914.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner把Josef Lechner的旧课本包上书皮，又在本子上签了名。Josef Lechner今年学会了自己系鞋带，也学会了在饭桌上说“不”；Alois Lechner听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 20 -> 28; state_parameter raising-child.caregiverBurden 60 -> 57; mood 0.020000000000000004_

- **1914.01** `r13-fam.help-neighbour::ctx-vienna-1912::milieu-tenement/carried-the-coal` tags: task, social, neighbor, help, care, vienna, urban, peace
  Alois Lechner看见Anna Moser在楼梯口歇了三回，便把煤筐接过来，一筐一筐抬上三楼。最后一趟，Alois Lechner的腰在门框上撞了一下，Anna Moser从柜里摸出一小瓶李子酒，硬倒了一盅。
  _effects: food; health -0.030000000000000027 (把煤筐抬上三楼); flag +carried_neighbour_coal; role; relation friend with person-anna-moser_

- **1914.01** `p9-social-tenement-neighbors.stove-and-line/stove-and-line.sheet-quarrel` tags: housing, neighbors, tenement, daily, money, reputation
  Alois Lechner发现自己搭在栏杆上的床单被人挪到了绳尾，角上沾了煤灰，一时火起，在楼梯间拦住Hermann Hofer问是谁动的。Hermann Hofer说是Rosa Lechner嫌滴水，两人越说越响，最后各自回屋摔上门，炉子空着，谁也没再去烧水。
  _effects: mood -0.05000000000000002; relation acquaintance with person-materialized-world-vienna-1912-8_

- **1914.02** `vienna-family-divorce/separate-under-one-roof` tags: family, marriage, divorce, housing, lifecycle, separation
  Alois Lechner和Rosa Lechner把床铺分开，米和煤也各算各的。两人仍住在Lechner-Wohnung, Leopoldstadt，因为谁都没有钱再租一间房；孩子在两床之间来回，三克朗买了隔开的锅碗和煤油，家里从此有两本账，夜里两盏灯先后熄灭。
  _effects: relation_end partner with person-rosa-lechner; mood -0.08; mood -0.08; cash -3 (separate household goods)_

- **1914.10** `p9-social-courtship-friendship.kahlenberg-sunday/kahlenberg-rain` tags: courtship, friendship, social, adulthood, reputation, leopoldstadt, injury
  走到半山就落雨，三人挤进酒农的棚子，把篮子里的面包和盐分完，吃食折合一克朗。Hermann Hofer把外套顶在头上先跑，Berta Weiss与Alois Lechner留在最后收篮子；雨点打在葡萄叶上，Alois Lechner的鞋袜湿到傍晚，脚趾发麻，谁也没急着走。
  _effects: food; health -0.020000000000000018 (淋了雨，鞋袜湿到傍晚); relation acquaintance with person-berta-weiss; relation acquaintance with person-materialized-world-vienna-1912-8_

- **1915.01** `vienna-family-fatherhood/child-dies-at-birth` tags: family, childbirth, death, lifecycle, injury
  孩子出生时已经没有呼吸。Alois Lechner去市政办事处登记，付了六克朗，回来时Rosa Lechner还躺在床上看着天花板；邻居把借来的摇篮搬走了，Alois Lechner成了丧子的父亲，屋里没人知道该说什么，只有炉子还在响。
  _effects: health -0.12 (stillbirth); cash -6 (midwife and burial); role_

- **1915.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner被叫到学校，老师说Luise Lechner这学期总在课上看窗外。回家的路上，Alois Lechner没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 20 -> 15; state_parameter raising-child.caregiverBurden 60 -> 65; cash -2 (extra lessons and replacement pencils); mood -0.03_

- **1915.01** `kernel-family.housing-relative::ctx-klosterneuburg-rural-1912::milieu-tenement::housing-relative-rural/housing-relative.harvest-refused` tags: task, task:family, family, housing, relatives, godparent, guardian, household
  收成不好，Alois Lechner自家也缺人手，只能让Gustav Berg去别家问。Gustav Berg走时把工具留在门口，说等明年再来；Alois Lechner把工具收进棚里，心里知道明年未必有活。棚里的工具落了灰，他也没去擦。
  _effects: relation kin with person-gustav-berg; role; flag +harvest_relative_refused_

- **1915.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Luise Lechner这周主动擦了黑板。Alois Lechner把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 15 -> 18; mood 0.01999999999999999_
  _causes: evt:world-vienna-1912:000578_

- **1915.06** `curse15-betrayal.ledger-share::ctx-klosterneuburg-rural-1912::milieu-tenement/rent-book-rewritten` tags: betrayal, money, family, trust, curse, secret, rural, agriculture
  Friedrich Hofer在房东的租金簿上把Alois Lechner的名字划掉，换成自己的，又把两个人合住的房间说成是Friedrich Hofer一个人租的。房东没有多问，只让Alois Lechner月底前搬走。Friedrich Hofer站在门口，手里拿着那本不该由Friedrich Hofer保管的簿子。
  _effects: cash -2 (临时找住处与搬家的费用（其中2克朗记入债务）); relation rival with person-friedrich-hofer; reputation -0.04; flag +rent_book_taken; condition; mood -0.1_

- **1915.07** `p21-returned-enemy::ctx-klosterneuburg-rural-1912::milieu-tenement/the-hand-extended` tags: enemy, return, betrayal, revenge, debt, blacklist, history, public
  Friedrich Hofer在普拉特街的咖啡馆里坐到Alois Lechner对面，把一张发黄的借据推过来，却没有提还钱。他说自己接了一笔搬运生意，缺一个信得过的人；Alois Lechner看见借据背面还留着当年两个人的签名，墨迹已经发灰。
  _effects: relation colleague with person-friedrich-hofer; flag +old_enemy_alliance; cash 2 (an advance on the joint commission); knowledge “借据背面还留着当年两个人的签名，墨迹已经发灰。”; mood 0.010000000000000009_

- **1915.07** `p22-apology-proposal::ctx-klosterneuburg-rural-1912::milieu-tenement/the-apology-runs-twice` tags: apology, proposal, newspaper, romance, scandal, public, editor, irony
  Alois Lechner在报纸第三版登了一整版道歉，末尾顺笔写了一句“如果你愿意，下个星期天我在教堂门口等”。Helene Winter读完把报纸折好，真的来了；Gustav Kral在街对面数着围观的人，第二天又登了一篇《道歉的续篇》。两个人在教堂门口站了很久，谁也没有先提那版报纸。
  _effects: state_add p22-wild-fortune state:world-vienna-1912:60; relation partner with person-helene-winter; relation acquaintance with person-materialized-world-vienna-1912-4; reputation 0.04; cash 2 (the newspaper paid for the sequel); flag +apology_became_courtship; mood 0.04999999999999999; relation acquaintance with person-materialized-world-vienna-1912-4; flag +wild_fortune_active_

- **1916.01** `p22-dead-voice-child::ctx-klosterneuburg-rural-1912::milieu-tenement/the-neighbor-calls-it-a-seance` tags: child, dead_relative, voice, eerie, dark, grief, family_secret, scandal
  Anna Moser把这件事传遍了整条街，说Alois Lechner家请了招魂师。区里的人上门问话，孩子却躲在桌子底下不肯出来；Alois Lechner在门口解释了半天，最后只说了一句“她只是想奶奶了”。第二天，窗台上被人放了一小袋盐和一张驱邪的纸条。他把盐袋放在窗台，孩子从桌下伸出手把它推开了。
  _effects: state_add public-scandal state:world-vienna-1912:58; state_add p22-scandal-engine state:world-vienna-1912:59; relation rival with person-anna-moser; reputation -0.03; flag +seance_rumour; mood -0.03; flag +scandal_engine_active_

- **1916.01** `state_reaction:p22-scandal-engine/a-new-scandal-feeds-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Alois Lechner的新故事登出来时，旧的那一页也被重新翻到桌面上。Alois Lechner发现两件事共用同一个证人，而那个证人上周还来借过盐。
  _effects: state_parameter p22-scandal-engine.heat 55 -> 61; state_parameter p22-scandal-engine.reach 45 -> 49; state_parameter p22-scandal-engine.shame 55 -> 58; state_parameter p22-scandal-engine.leverage 20 -> 22; mood -0.020000000000000004_
  _causes: evt:world-vienna-1912:000551_

- **1916.01** `state_tick:p22-wild-fortune/the-story-gets-taller/a-witness-asks-for-proof` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  一个见证人要求Alois Lechner拿出证据。Alois Lechner翻遍抽屉，只找到一张被水浸过的收据；那天晚上，街上的故事换了主角，Alois Lechner的名字被挪到了最后一行。
  _effects: state_parameter p22-wild-fortune.height 40 -> 34; state_parameter p22-wild-fortune.witnesses 65 -> 60; state_parameter p22-wild-fortune.fragility 35 -> 42; mood -0.03_

- **1916.01** `p10-migration-tasks.emigrate/emigrate-sell-and-sail` tags: adulthood, migration, housing, family, travel, task, emigration, passport
  旧货商把床架往秤上一放，报了个数。工具他留了一套最顺手的，用旧布裹了三层。领事馆的窗户开得很高，队伍里有人咳嗽，有人把文件摊在膝盖上又看一遍。
  _effects: cash -8 (补齐船票、护照手续费与体检单费用，已扣卖家具所得); mood 0.06; condition; knowledge “去美国的船票加手续费一共一百多克朗，统舱最便宜”; relation acquaintance with person-materialized-world-vienna-1912-16_

- **1916.01** `state_reaction:public-scandal/gossip` tags: public-scandal, scandal, reputation, social, state, state_reaction, work, factory
  Alois Lechner走进咖啡馆时，邻桌的声音低了一拍。没有人当面说什么，但每个人都知道该说什么。
  _effects: mood -0.03; reputation -0.03_
  _causes: evt:world-vienna-1912:000784_

- **1916.05** `ad20-neighbor-dispute::ctx-klosterneuburg-rural-1912::milieu-tenement/the-line-moves` tags: neighbor, dispute, home, everyday, public, obligation, rural, agriculture
  隔壁把晾衣绳往Alois Lechner这边挪了一尺，水滴正好落在窗台上。Alois Lechner拿粉笔在墙上画了一道线；Mitzi Hofer看见了，又把绳子挪回去半尺。两个人都觉得自己让了步，晚饭时却都把窗户关得很紧。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-15; mood -0.01999999999999999; flag +laundry_line_dispute; relation acquaintance with person-materialized-world-vienna-1912-15_

- **1916.11** `p9-history-medical-daily.suspicious-death/accept-doctor-story` tags: health, medical, public_health, family, pharmacy, sanitation, daily
  Emil Weiss把死亡证明折好递给Ferdinand Lechner，说别折腾了。Alois Lechner从口袋里摸出一克朗二十赫勒，放在桌上凑棺材钱；回家后把药包丢进炉子，纸边发蓝，烧出一股焦甜味。
  _effects: cash -1.2 (帮死者家属凑葬礼钱（其中1.2克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-14; relation acquaintance with person-materialized-world-vienna-1912-14_

- **1917.01** `pl19-bridge.public-rumor::ctx-klosterneuburg-rural-1912::milieu-tenement/a-room-with-a-list` tags: scandal, protection, network, press, media, rumor, bridge, rural
  一位官员在散场后拦住Alois Lechner，说可以借一间会议室，每周二晚上用，条件是名单由他过目。Alois Lechner看见他手里还攥着当天的报纸，头版折得很整齐；那间会议室后来真的开了灯，只是门口多了一把没人坐的椅子。
  _effects: state_add pl19-protected-scandal state:world-vienna-1912:68; relation friend with person-gustav-berg; flag +official_room; knowledge “会议室每周二晚上开灯，名单要先给一位官员过目。”; flag +protected_scandal_active_

- **1917.01** `state_reaction:pl19-protected-scandal/a-public-question` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  有人在一场公开活动里问起Alois Lechner的“私人安排”，语气客气，问题却像一根针。Alois Lechner笑着答了别的事，回家后才发现手心全是汗。
  _effects: state_parameter pl19-protected-scandal.publicHeat 40 -> 52; state_parameter pl19-protected-scandal.protection 65 -> 59; reputation -0.03_
  _causes: evt:world-vienna-1912:000736_

- **1917.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner被叫到学校，老师说Luise Lechner这学期总在课上看窗外。回家的路上，Alois Lechner没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 18 -> 13; state_parameter raising-child.caregiverBurden 65 -> 70; cash -2 (extra lessons and replacement pencils); mood -0.03_

- **1917.01** `state_tick:p22-scandal-engine/the-rumor-learns-new-words/the-story-turns-on-its-keeper` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  一个曾经替Alois Lechner传话的人搬走了，带走了半条街的信任。第二天，信箱里多了一张没有署名的明信片，上面只写着“我还记得”；Alois Lechner把明信片翻过来，背面是空的。
  _effects: state_parameter p22-scandal-engine.heat 61 -> 68; state_parameter p22-scandal-engine.reach 49 -> 54; state_parameter p22-scandal-engine.leverage 22 -> 18; state_parameter p22-scandal-engine.shame 58 -> 64; mood -0.01999999999999999_

- **1917.01** `p9-work-jobsearch.ask-trial/ask-trial.deposit-refused` tags: work, job_search, negotiation, wages, employment, task, trial, factory
  “十克朗押金，先交后干。”Otto Winter 2说得很平。Alois Lechner把两只口袋翻给人家看，柜台上只落下一张皱车票。工头收回话头，他也不再问，提着帽子走出栅栏。
  _effects: mood -0.04999999999999999; flag +seeking_work; reputation -0.01_

- **1917.04** `vienna-housing-move.sublet-room/sublet-declined` tags: housing, home, rent, family, money
  Alois Lechner正要把空床许给Otto Winter，Mitzi Hofer却在楼梯上拦住了，说这条街上去年有人招了生人合住，失过钥匙，惹出些麻烦。Alois Lechner回家把铺盖重新叠好，回绝了Otto Winter，只让他白天来喝口热水。空床仍空着，房租还是从自己的工钱里补。
  _effects: mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-15; relation acquaintance with person-otto-winter_

- **1917.07** `vienna-adult-social.burial-fund/burial-fund.paid` tags: adulthood, social, work, family
  车间里管互助会的Ferdinand Lechner在午休时把本子摊在Alois Lechner的工具箱上，说这个月还差最后一份月钱。Alois Lechner从马甲内袋摸出二十个克罗伊策，Ferdinand Lechner当着他的面在本子上画了钩。
  _effects: cash -0.3 (缴纳丧葬互助会的月钱（其中0.3克朗记入债务）); relation colleague with person-materialized-world-vienna-1912-14; reputation 0.04_

- **1917.11** `vienna-tenement-neighbors.laundry_line_dispute/subject_yields_line` tags: home, social, family, housing
  Alois Lechner看Ferdinand Lechner盆里那几件小衬衫，把自家床单卷起来抱回屋，说等下午再晾。Ferdinand Lechner愣了一下，闷头把衣服挂好，收工回来时在Alois Lechner门口放了一小包用旧报纸裹的洗衣碱。Alois Lechner打开报纸，碱面里还掺着几粒粗盐。
  _effects: relation friend with person-materialized-world-vienna-1912-14; food_

- **1918.01** `sm18-object.tram-lost::ctx-klosterneuburg-rural-1912::milieu-tenement/advertises-in-the-paper` tags: object, loss, child, tram, family, everyday, rural, agriculture
  Alois Lechner在《新维也纳日报》的失物栏里登了三行小字，花了四十个铜板。第二天，一个卖旧货的人说在电车终点站见过那样的铜牌。Mitzi放学后跟着Alois Lechner去找，一路上把书包带绕在手指上，绕得发白。
  _effects: cash -1 (在报纸上登失物启事（其中1克朗记入债务）); state_add sm18-missing-object state:world-vienna-1912:70; mood -0.020000000000000018; flag +advertised_for_the_childs_medal; flag +something_is_missing_

- **1918.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner把Josef Lechner的旧课本包上书皮，又在本子上签了名。Josef Lechner今年学会了自己系鞋带，也学会了在饭桌上说“不”；Alois Lechner听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 23 -> 31; state_parameter raising-child.caregiverBurden 62 -> 59; mood 0.020000000000000018_

- **1918.01** `state_expire:public-scandal` tags: public-scandal, scandal, reputation, social, state, state_tick, state:public-scandal
  Alois Lechner的「公开丑闻」到期；相关安排结束。
  _effects: state_remove public-scandal state:world-vienna-1912:58_

- **1918.01** `state_expire:p22-scandal-engine` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Alois Lechner的「流言发动机」到期；相关安排结束。
  _effects: state_remove p22-scandal-engine state:world-vienna-1912:59; flag -scandal_engine_active_

- **1918.01** `state_expire:p22-wild-fortune` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  Alois Lechner的「荒唐横财」到期；相关安排结束。
  _effects: state_remove p22-wild-fortune state:world-vienna-1912:60; flag -wild_fortune_active_

- **1918.01** `state_tick:pl19-protected-scandal/the-network-meets/someone-wants-a-favor` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  有人替Alois Lechner挡了一次采访，随后在走廊里提起自己儿子的学徒期满。Alois Lechner知道这不是闲聊；当天晚上，那张写着名字的纸条被压在糖罐下面，像一枚没有付清的硬币。
  _effects: state_parameter pl19-protected-scandal.leverage 35 -> 47; state_parameter pl19-protected-scandal.protection 59 -> 55; state_parameter pl19-protected-scandal.exposure 45 -> 50; mood -0.020000000000000018_

- **1918.01** `kernel-health.task-house-call::ctx-klosterneuburg-rural-1912::milieu-tenement/house-call-syrup-only` tags: health, task, house_call, care, poverty, rural, agriculture, small_town
  医生没有来，只让药房送来一瓶止咳糖浆。Alois Lechner咳了三个星期，左肺留下杂音；Mitzi Hofer把窗户钉开一条缝，说新鲜空气比药便宜。后来他连上二楼都要停下来喘，空瓶在窗台上排成一排。瓶口结了一圈灰。
  _effects: cash -4 (cough syrup delivered instead of a visit（其中1克朗记入债务）); condition; role; relation acquaintance with person-materialized-world-vienna-1912-15; knowledge “请不到医生时，药房会送一瓶止咳糖浆；新鲜空气不要钱，肺里的杂音也不会自己消失。”_

- **1918.02** `vienna-courtship-courtyard.letter-answer/mother-opened-letter` tags: adulthood, courtship, partner, social, family
  回信没有到Alois Lechner手里。Anna Bauer的母亲先拆了它，连信封上的邮戳一起摊在洗衣房的桌上，说有人写字来缠自家孩子。话传到院子里时已经添了油，Emil Weiss隔着栏杆把原话学了一遍，说得很难听；Anna Bauer再见到Alois Lechner时，眼睛先往母亲那边看。Alois Lechner站在水桶边，知道这封信已经被拆成了两家的脸面。
  _effects: reputation -0.06; mood -0.08000000000000002; relation acquaintance with person-anna-bauer_

- **1918.12** `vienna-parish-aid.rent-box/rent-box.accept-all` tags: faith, parish, mutual_aid, poverty, family
  煤袋落在台阶上，扬起细细一层黑末。Gustav Berg用铅笔头在蓝格册上写门牌号，问房东姓什么，又叮嘱别把面包票弄丢。灶上水壶开始叫，Alois Lechner才想起屋里连只干净的杯子都没有。
  _effects: cash 6 (互助会补上本月房租差额); food; relation acquaintance with person-gustav-berg; flag +parish_registered_

- **1919.01** `sm18-object.lost-property::ctx-klosterneuburg-rural-1912::milieu-tenement/the-object-is-in-the-drawer` tags: object, loss, office, search, bureaucracy, everyday, rural, agriculture
  失物招领处在一间半地下室里，架子上按月份捆着纸包。Otto Winter翻到第三本登记簿，把一只用麻线扎紧的小包推过来。Alois Lechner报出针扣上的刻字，Otto Winter点头，收了两克朗保管费。
  _effects: cash -2 (失物招领处的保管费（其中2克朗记入债务）); state_remove sm18-missing-object state:world-vienna-1912:70; mood 0.04999999999999999; relation acquaintance with person-otto-winter; knowledge “失物一直在失物招领处的第三本登记簿下面”; flag +recovered_object_at_lost_property; flag -something_is_missing_

- **1919.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner被叫到学校，老师说Luise Lechner这学期总在课上看窗外。回家的路上，Alois Lechner没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 16 -> 11; state_parameter raising-child.caregiverBurden 70 -> 75; cash -2 (extra lessons and replacement pencils); mood -0.030000000000000027_

- **1919.01** `state_tick:pl19-protected-scandal/the-network-meets/network-holds` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  Alois Lechner又在后间见了那几个人。谁也没有提名字，只把下个月的班次、钥匙和该打的电话分了一遍；出门时，Alois Lechner发现自己的围巾被人重新叠过，像一件被妥善保管的证物。
  _effects: state_parameter pl19-protected-scandal.exposure 50 -> 45; state_parameter pl19-protected-scandal.protection 55 -> 59; state_parameter pl19-protected-scandal.publicHeat 52 -> 50; mood 0.010000000000000009_

- **1919.01** `p9-social-daily-culture.cafe-newspaper/p9-social-daily-culture.cafe-newspaper.talk-tram` tags: daily, culture, leisure, cafe, music, walk, task, task:daily
  Alois Lechner把报纸推到一边，和Otto Winter聊起电车票价要涨的传闻。两人拿过糖罐当算盘，在桌布上比划通勤开销，两杯咖啡四十赫勒，争论得忘了时间，直到窗外的煤气灯亮起来。Alois Lechner起身时发现大衣下摆沾了咖啡渍，晚饭的点早过了，却约好下回还坐这张桌子。
  _effects: cash -0.4 (两杯咖啡的价钱); relation acquaintance with person-otto-winter; mood 0.03999999999999998_

- **1919.01** `ad20-market-day::ctx-klosterneuburg-rural-1912::milieu-tenement/the-scale-is-light` tags: market, food, money, neighbor, everyday, credit, rural, agriculture
  市场日的人挤到棚布底下。Grete Stein把Alois Lechner的篮子放上秤，秤砣往下一沉，又悄悄用拇指抵住秤杆。Alois Lechner看见了，没有说；Grete Stein多塞了两根葱，说“今天的葱不值钱”。Maria Kral从过道那头走来，两个人同时把篮子往身后挪了挪。
  _effects: cash 1 (a market stall gave short weight and then overpaid in change); relation acquaintance with person-grete-stein; flag +market_short_weight; mood 0.020000000000000018; knowledge “市场那台秤的秤砣被摊主用拇指抵过。”_

- **1919.02** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Josef Lechner这周主动擦了黑板。Alois Lechner把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 31 -> 34; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:001198_

- **1919.02** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Luise Lechner这周主动擦了黑板。Alois Lechner把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 13 -> 16; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:001198_

- **1919.06** `p22-enemy-wedding::ctx-klosterneuburg-rural-1912::milieu-tenement/the-feud-signs-the-register` tags: wedding, enemies, marriage, feud, romantic, scandal, debt, power
  两家人的官司打了七年，最后一份和解书要求Alois Lechner和Helene Winter在同一个星期天结婚。婚礼上，Josefine Hofer把债务清单念成祝词，Ferdinand Lechner在最后一排数着来宾；交换戒指时，两个人都用了力，戒指差点套不进去。散场后，两家把账本合在一张桌上。
  _effects: state_add p22-wild-fortune state:world-vienna-1912:83; state_add p22-scandal-engine state:world-vienna-1912:84; cash 3 (the two families pooled their legal costs); relation_end rival with person-helene-winter; flag +enemy_wedding_kept; mood 0.030000000000000027; flag +wild_fortune_active; flag -scandal_engine_active; flag +scandal_engine_active_

- **1919.06** `state_reaction:pl19-protected-scandal/a-public-question` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  有人在一场公开活动里问起Alois Lechner的“私人安排”，语气客气，问题却像一根针。Alois Lechner笑着答了别的事，回家后才发现手心全是汗。
  _effects: state_parameter pl19-protected-scandal.publicHeat 50 -> 62; state_parameter pl19-protected-scandal.protection 59 -> 53; reputation -0.03_
  _causes: evt:world-vienna-1912:001305_

- **1919.12** `p9-history-medical-daily.suspicious-death/accept-doctor-story` tags: health, medical, public_health, family, pharmacy, sanitation, daily
  楼里的女人都来劝Grete Stein，说人死不能复生。Alois Lechner把药包从桌角拿起来，纸包上没写字，只有药房火漆印；炉门一开，火苗舔着纸角，Alois Lechner把炉门关上。
  _effects: cash -1.2 (帮死者家属凑葬礼钱); relation acquaintance with person-grete-stein_

- **1920.01** `p22-dead-voice-child::ctx-klosterneuburg-rural-1912::milieu-tenement/the-neighbor-calls-it-a-seance` tags: child, dead_relative, voice, eerie, dark, grief, family_secret, scandal
  Helene Winter把这件事传遍了整条街，说Alois Lechner家请了招魂师。区里的人上门问话，孩子却躲在桌子底下不肯出来；Alois Lechner在门口解释了半天，最后只说了一句“她只是想奶奶了”。第二天，窗台上被人放了一小袋盐和一张驱邪的纸条。他把盐袋放在窗台，孩子从桌下伸出手把它推开了。
  _effects: state_add public-scandal state:world-vienna-1912:81; state_add p22-scandal-engine state:world-vienna-1912:82; relation rival with person-helene-winter; reputation -0.03; mood -0.02999999999999997; flag +scandal_engine_active_

- **1920.01** `state_reaction:p22-scandal-engine/a-new-scandal-feeds-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Alois Lechner的新故事登出来时，旧的那一页也被重新翻到桌面上。Alois Lechner发现两件事共用同一个证人，而那个证人上周还来借过盐。
  _effects: state_parameter p22-scandal-engine.heat 55 -> 61; state_parameter p22-scandal-engine.reach 45 -> 49; state_parameter p22-scandal-engine.shame 55 -> 58; state_parameter p22-scandal-engine.leverage 20 -> 22; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:001303_

- **1920.01** `state_reaction:p22-scandal-engine/a-new-scandal-feeds-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Alois Lechner的新故事登出来时，旧的那一页也被重新翻到桌面上。Alois Lechner发现两件事共用同一个证人，而那个证人上周还来借过盐。
  _effects: state_parameter p22-scandal-engine.heat 35 -> 41; state_parameter p22-scandal-engine.reach 55 -> 59; state_parameter p22-scandal-engine.shame 25 -> 28; state_parameter p22-scandal-engine.leverage 45 -> 47; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:001423_

- **1920.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner把Josef Lechner的旧课本包上书皮，又在本子上签了名。Josef Lechner今年学会了自己系鞋带，也学会了在饭桌上说“不”；Alois Lechner听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 34 -> 42; state_parameter raising-child.caregiverBurden 59 -> 56; mood 0.020000000000000018_

- **1920.01** `state_tick:pl19-protected-scandal/the-network-meets/someone-wants-a-favor` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  有人替Alois Lechner挡了一次采访，随后在走廊里提起自己儿子的学徒期满。Alois Lechner知道这不是闲聊；当天晚上，那张写着名字的纸条被压在糖罐下面，像一枚没有付清的硬币。
  _effects: state_parameter pl19-protected-scandal.leverage 47 -> 59; state_parameter pl19-protected-scandal.protection 53 -> 49; state_parameter pl19-protected-scandal.exposure 45 -> 50; mood -0.020000000000000018_

- **1920.01** `state_tick:p22-wild-fortune/the-story-gets-taller/the-crowd-remembers` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  一年过去，Alois Lechner的荒唐故事没有变小，反而多了一个愿意作证的人。债主没有立刻上门，亲戚也还愿意来吃饭；Alois Lechner把新添的银器擦了一遍，发现其中一只底下刻着别人的名字。
  _effects: state_parameter p22-wild-fortune.height 45 -> 49; state_parameter p22-wild-fortune.absurdity 65 -> 68; state_parameter p22-wild-fortune.witnesses 70 -> 75; state_parameter p22-wild-fortune.fragility 45 -> 47; mood 0.020000000000000018_

- **1920.01** `state_tick:p22-scandal-engine/the-rumor-learns-new-words/the-story-gets-a-new-witness` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  又过了一年，流言没有熄，却学会了新的说法。Alois Lechner在咖啡馆里听见自己的故事被讲成三个版本，每个版本都比上一个多一个证人；没有人来追问，也没有人真正忘记。
  _effects: state_parameter p22-scandal-engine.heat 41 -> 38; state_parameter p22-scandal-engine.reach 59 -> 63; state_parameter p22-scandal-engine.leverage 47 -> 50; state_parameter p22-scandal-engine.shame 28 -> 30; mood 0.010000000000000009_

- **1920.01** `p9-social-daily-culture.pictures-or-concert/p9-social-daily-culture.pictures-or-concert.box-seat` tags: daily, culture, leisure, cafe, music, walk, task, task:culture
  Alois Lechner咬牙买了音乐厅楼座的票，两克朗五十赫勒，又向人借来一件硬领衬衫，领子磨得后颈发红。演奏到慢板时，Alois Lechner手心里的汗把节目单边角浸软，却连咳嗽都憋着，生怕在周围体面人中间出声。散场后Berta Weiss等在门口，问值不值，Alois Lechner只把节目单折好收进口袋。
  _effects: cash -2.5 (音乐厅楼座票价); mood 0.08000000000000002; reputation 0.020000000000000004; skill_

- **1920.01** `state_reaction:public-scandal/gossip` tags: public-scandal, scandal, reputation, social, state, state_reaction, work, factory
  Alois Lechner走进咖啡馆时，邻桌的声音低了一拍。没有人当面说什么，但每个人都知道该说什么。
  _effects: mood -0.02999999999999997; reputation -0.03_
  _causes: evt:world-vienna-1912:001552_

- **1920.04** `r2-leisure.picnic-rain::ctx-klosterneuburg-rural-1912::milieu-tenement/lost-the-ring-in-the-grass` tags: leisure, picnic, rain, etiquette, comedy, rural, agriculture, small_town
  Gustav Berg在收毯子时把一枚戒指甩进草里。三个人趴在地上找，Emil Weiss也过来帮忙，膝盖压坏了一块蛋糕。雨越下越大，草叶上的水珠把戒指藏得严严实实。Gustav Berg说算了，Alois Lechner却看见泥里有一点金光。
  _effects: cash -8 (草地上的第九块三明治（其中8克朗记入债务）); mood -0.08000000000000002; condition; flag +lost_ring_in_picnic_grass; relation friend with person-gustav-berg; relation acquaintance with person-emil-weiss_

- **1920.06** `curse15-betrayal.ledger-share::ctx-klosterneuburg-rural-1912::milieu-tenement/rent-book-rewritten` tags: betrayal, money, family, trust, curse, secret, rural, agriculture
  Emil Weiss在房东的租金簿上把Alois Lechner的名字划掉，换成自己的，又把两个人合住的房间说成是Emil Weiss一个人租的。房东没有多问，只让Alois Lechner月底前搬走。Emil Weiss站在门口，手里拿着那本不该由Emil Weiss保管的簿子。
  _effects: cash -2 (临时找住处与搬家的费用（其中1克朗记入债务）); relation rival with person-emil-weiss; reputation -0.039999999999999994; mood -0.09999999999999998_

- **1920.10** `hs18-scandal.sheet::ctx-klosterneuburg-rural-1912::milieu-tenement/trade-a-better-story` tags: scandal, newspaper, reputation, neighbor, reporter, history, rural, agriculture
  Alois Lechner把Anna Huber请进厨房，倒了一杯很淡的咖啡，讲了一个关于邻居家猫的故事。记者记了两页，笑得笔都停了。第二天登出来的标题温和了许多；Gustav Berg却问，为什么报上还有自己的门牌号。
  _effects: cash -1 (coffee for the reporter); reputation 0.02; relation acquaintance with person-materialized-world-vienna-1912-21; relation acquaintance with person-gustav-berg; flag +traded_story_with_reporter; knowledge “小报要的是故事，不是真相。”; relation acquaintance with person-materialized-world-vienna-1912-21_

- **1921.01** `p22-apology-proposal::ctx-klosterneuburg-rural-1912::milieu-tenement/the-apology-runs-twice` tags: apology, proposal, newspaper, romance, scandal, public, editor, irony
  Alois Lechner在报纸第三版登了一整版道歉，末尾顺笔写了一句“如果你愿意，下个星期天我在教堂门口等”。Emil Weiss读完把报纸折好，真的来了；Alois Moser在街对面数着围观的人，第二天又登了一篇《道歉的续篇》。两个人在教堂门口站了很久，谁也没有先提那版报纸。
  _effects: state_add p22-wild-fortune state:world-vienna-1912:87; relation acquaintance with person-materialized-world-vienna-1912-18; reputation 0.04; cash 2 (the newspaper paid for the sequel); mood 0.04999999999999999; relation acquaintance with person-materialized-world-vienna-1912-18; flag -wild_fortune_active; flag +wild_fortune_active_

- **1921.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner把Luise Lechner的旧课本包上书皮，又在本子上签了名。Luise Lechner今年学会了自己系鞋带，也学会了在饭桌上说“不”；Alois Lechner听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 11 -> 19; state_parameter raising-child.caregiverBurden 75 -> 72; mood 0.020000000000000018_

- **1921.01** `state_tick:pl19-protected-scandal/the-network-meets/someone-wants-a-favor` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  有人替Alois Lechner挡了一次采访，随后在走廊里提起自己儿子的学徒期满。Alois Lechner知道这不是闲聊；当天晚上，那张写着名字的纸条被压在糖罐下面，像一枚没有付清的硬币。
  _effects: state_parameter pl19-protected-scandal.leverage 59 -> 71; state_parameter pl19-protected-scandal.protection 49 -> 45; state_parameter pl19-protected-scandal.exposure 50 -> 55; mood -0.020000000000000018_

- **1921.01** `p9-social-relationship-initiative.borrow-handcart/only-the-cart` tags: courtship, friendship, family, social, initiative, housing, task, task:social
  开口时只提了手推车，钱的事咽回去。对方爽快地把车钥匙样的铁钩递过来，说用完了搁回院里就行。十克朗改去当铺想办法，一件旧外套和一只怀表抵了十二克朗，赎期三个月，票据折好收在证件夹里。
  _effects: cash 12 (当铺抵当旧外套和怀表换来的钱); relation friend with person-emil-weiss; mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-2_

- **1921.04** `vienna-housing-move.rent-notice/rent-notice-demand-repair` tags: housing, home, rent, family, money
  Alois Lechner没有立刻答话，先去敲Emil Weiss的门。两人一起数落墙上的水渍和门框里灌进来的风，楼梯间的窗户修好了，自家墙皮还在剥落。Emil Weiss提议一起把话带给看门人：先修好漏水的墙角，涨租的事再谈。Alois Lechner把纸重新折好，请他把话带到门外。
  _effects: relation acquaintance with person-emil-weiss; mood 0.02999999999999997; flag +rent_dispute_

- **1921.06** `ad20-favor-called-in::ctx-klosterneuburg-rural-1912::milieu-tenement/do-the-favor` tags: favor, obligation, everyday, trust, debt, risk, rural, agriculture
  Anna Moser说只需要Alois Lechner在明天下午去一趟车站，把一个箱子交给穿灰外套的人。Alois Lechner问箱子里是什么；Anna Moser说“你不需要知道”。Alois Lechner还是去了，因为当年Anna Moser替Alois Lechner垫过一笔医药费。
  _effects: state_add ad20-private-bargain state:world-vienna-1912:94; cash -1 (the trip to the station（其中1克朗记入债务）); relation acquaintance with person-anna-moser; flag +favor_done; mood -0.010000000000000009; knowledge “箱子里是什么，邻居没有说。”; flag +private_bargain_active_

- **1921.08** `vienna-church-community.saint-vincent-box/box-request-refused` tags: faith, social, family, home
  登记员用铅笔尖点着册子上一行字，说上个月十七号已经领过。Mitzi Hofer涨红了脸，Alois Lechner在队伍前站着，后面有人咂嘴。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-15; reputation -0.04000000000000001; mood -0.04999999999999999_

- **1922.01** `p22-child-matchmaker::ctx-klosterneuburg-rural-1912::milieu-tenement/the-album-is-shown-at-school` tags: child, matchmaker, family_album, enemy, warm, ironic, reconciliation, scandal
  孩子把相册带到学校，指着照片说Gustav Berg是家里的亲戚。老师把这件事告诉了街坊，街坊又在菜市场讲了一遍；到下午，Alois Lechner已经听见三个版本，其中一个说Gustav Berg要来分房子。孩子回家时，书包里多了一张同学画的“全家福”。他把那张全家福夹进课本，没有还给同学。
  _effects: state_add public-scandal state:world-vienna-1912:92; state_add p22-scandal-engine state:world-vienna-1912:93; reputation -0.03; flag +album_shown_at_school; mood -0.030000000000000027_

- **1922.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner被叫到学校，老师说Josef Lechner这学期总在课上看窗外。回家的路上，Alois Lechner没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 42 -> 37; state_parameter raising-child.caregiverBurden 56 -> 61; cash -2 (extra lessons and replacement pencils（其中1克朗记入债务）); mood -0.030000000000000027_

- **1922.01** `state_expire:pl19-protected-scandal` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  Alois Lechner的「被小圈子护住的私情」到期；相关安排结束。
  _effects: state_remove pl19-protected-scandal state:world-vienna-1912:68; flag -protected_scandal_active_

- **1922.01** `state_expire:public-scandal` tags: public-scandal, scandal, reputation, social, state, state_tick, state:public-scandal
  Alois Lechner的「公开丑闻」到期；相关安排结束。
  _effects: state_remove public-scandal state:world-vienna-1912:81_

- **1922.01** `state_expire:p22-scandal-engine` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Alois Lechner的「流言发动机」到期；相关安排结束。
  _effects: state_remove p22-scandal-engine state:world-vienna-1912:84; flag -scandal_engine_active_

- **1922.01** `state_tick:p22-wild-fortune/the-story-gets-taller/a-witness-asks-for-proof` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  一个见证人要求Alois Lechner拿出证据。Alois Lechner翻遍抽屉，只找到一张被水浸过的收据；那天晚上，街上的故事换了主角，Alois Lechner的名字被挪到了最后一行。
  _effects: state_parameter p22-wild-fortune.height 40 -> 34; state_parameter p22-wild-fortune.witnesses 65 -> 60; state_parameter p22-wild-fortune.fragility 35 -> 42; mood -0.030000000000000027_

- **1922.01** `state_tick:ad20-private-bargain/the-favor-ages/kept` tags: ad20-private-bargain, private, bargain, favor, debt, trust, leverage, exit
  那笔私下的安排又过了一年。没有人提起，但Alois Lechner在街上遇见对方时，两个人都多停了一拍。Alois Lechner知道，沉默本身也是利息。
  _effects: state_parameter ad20-private-bargain.trust 55 -> 59; state_parameter ad20-private-bargain.debt 55 -> 53; state_parameter ad20-private-bargain.exit 20 -> 22; mood 0.010000000000000009_

- **1922.01** `p10-migration-tasks.find-lodging/lodging-courtyard-room` tags: adulthood, migration, housing, family, travel, task, lodging, arrival
  他挑了朝院子的那间单间，付了一个月押金和半个月房租，房东点清钱才给钥匙。看门人把备用钥匙挂进门房的木板上，嘱咐他晚上十点以后别在楼梯上跺脚。屋里有张床、一只铁炉和半截蜡烛。
  _effects: cash -9 (单间一个月押金与半个月房租（其中9克朗记入债务）); residence; relation acquaintance with person-anna-moser; mood 0.030000000000000027_

- **1922.01** `vienna-adult-social.burial-fund/burial-fund.paid` tags: adulthood, social, work, family
  车间里管互助会的Marie Huber在午休时把本子摊在Alois Lechner的工具箱上，说这个月还差最后一份月钱。Alois Lechner从马甲内袋摸出二十个克罗伊策，Marie Huber当着他的面在本子上画了钩。
  _effects: cash -0.3 (缴纳丧葬互助会的月钱（其中0.3克朗记入债务）); relation colleague with person-marie-huber; reputation 0.04000000000000001_

- **1922.03** `vienna-legacy-worklife.sick-fund/sick-fund.advance-from-fund` tags: legacy, work, family, reform, ordinary_life
  药房在街口，柜台玻璃下面压着价目纸。Alois Lechner把两克朗推过去，伙计找回来十二赫勒，药片用报纸包成一个小包。工友接过去时手还在抖，报纸边角很快被汗洇软。
  _effects: cash -2 (从互助金垫付药费（其中2克朗记入债务）); health 0.05999999999999999 (及时买到药); relation acquaintance with person-franz-lechner; relation acquaintance with person-materialized-world-vienna-1912-28_

- **1922.04** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Josef Lechner这周主动擦了黑板。Alois Lechner把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 37 -> 40; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:002075_

- **1922.05** `vienna-tenement-neighbors.laundry_line_dispute/subject_yields_line` tags: home, social, family, housing
  Alois Lechner看Ferdinand Lechner盆里那几件小衬衫，把自家床单卷起来抱回屋，说等下午再晾。Ferdinand Lechner愣了一下，闷头把衣服挂好，收工回来时在Alois Lechner门口放了一小包用旧报纸裹的洗衣碱。Alois Lechner打开报纸，碱面里还掺着几粒粗盐。
  _effects: relation friend with person-materialized-world-vienna-1912-14; food_

- **1922.07** `p9-history-medical-daily.suspicious-death/accept-doctor-story` tags: health, medical, public_health, family, pharmacy, sanitation, daily
  楼里的女人都来劝Franz Moser，说人死不能复生。Alois Lechner把药包从桌角拿起来，纸包上没写字，只有药房火漆印；炉门一开，火苗舔着纸角，Alois Lechner把炉门关上。
  _effects: cash -1.2 (帮死者家属凑葬礼钱（其中1.2克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-7; relation acquaintance with person-materialized-world-vienna-1912-7_

- **1923.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner被叫到学校，老师说Luise Lechner这学期总在课上看窗外。回家的路上，Alois Lechner没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 19 -> 14; state_parameter raising-child.caregiverBurden 72 -> 77; cash -2 (extra lessons and replacement pencils（其中2克朗记入债务）); mood -0.030000000000000027_

- **1923.01** `state_expire:p22-wild-fortune` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  Alois Lechner的「荒唐横财」到期；相关安排结束。
  _effects: state_remove p22-wild-fortune state:world-vienna-1912:87; flag -wild_fortune_active_

- **1923.01** `state_tick:p22-scandal-engine/the-rumor-learns-new-words/the-story-turns-on-its-keeper` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  一个曾经替Alois Lechner传话的人搬走了，带走了半条街的信任。第二天，信箱里多了一张没有署名的明信片，上面只写着“我还记得”；Alois Lechner把明信片翻过来，背面是空的。
  _effects: state_parameter p22-scandal-engine.heat 40 -> 47; state_parameter p22-scandal-engine.reach 45 -> 50; state_parameter p22-scandal-engine.leverage 20 -> 16; state_parameter p22-scandal-engine.shame 35 -> 41; mood -0.020000000000000018_

- **1923.01** `state_expire:ad20-private-bargain` tags: ad20-private-bargain, private, bargain, favor, debt, trust, leverage, exit
  Alois Lechner的「私下的账」到期；相关安排结束。
  _effects: state_remove ad20-private-bargain state:world-vienna-1912:94; flag -private_bargain_active_

- **1923.01** `p10-migration-tasks.ask-travel-money/aunt-private-money` tags: adulthood, migration, housing, family, travel, task, loan, relative
  舅父在里屋翻账簿半天没出来，舅母趁空从围裙里掏出一卷私房钱，数出十克朗塞给他，说到了家乡先给她写封信。他把钱收下，出门时在门口站了一会儿，才把帽子戴正。
  _effects: cash 10 (舅母私下给的路费); relation kin with person-josef-bauer; mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-31_

- **1923.01** `vienna-parish-aid.funeral-society/funeral-society.defer` tags: faith, parish, mutual_aid, poverty, family
  Alois Lechner说这个月先欠着，等发工钱补上。Alois Moser在名字旁画了个小圈，写明欠两周，叮嘱别拖过月底，否则要重新排进新会员的等待期。她走时把楼道的门带严，说冷风灌进来煤烧得快。Alois Lechner回头数了数抽屉里的零钱，还差三个赫勒。
  _effects: mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-18_

- **1923.04** `vienna-legacy-worklife.hours-ledger/hours-ledger.read-for-others` tags: legacy, work, family, reform, ordinary_life
  围过来的工友有七八个，有人把耳朵凑到Alois Lechner嘴边，怕听漏一个数字。念到“星期六下午停工”时，人群里有人笑了一声，又马上收住。墙上的表被风掀起一角，Alois Lechner用拇指按住，继续往下念。
  _effects: skill; relation colleague with person-materialized-world-vienna-1912-32; reputation 0.04; relation acquaintance with person-materialized-world-vienna-1912-32_

- **1923.08** `vienna-tenement-neighbors.lost_room_key/key_found_by_neighbor` tags: home, social, family, housing
  Alois Lechner傍晚从面粉厂下工回来，发现挂在腰带上的房门钥匙不见了，在楼梯间来回找了四趟。Anna Huber在二楼拐角的煤堆旁捡到那把铜钥匙，钥匙上缠着红线，一眼就认出来。Anna Huber敲开Alois Lechner的门，把钥匙拍在桌上，说自己眼神好使。
  _effects: relation friend with person-materialized-world-vienna-1912-21; mood 0.04999999999999999_

- **1923.09** `vienna-medical-treatment.toothache/barber-pull` tags: health, medical, family, money
  Friedrich Hofer在门口替Alois Lechner捏着帽子，听见里面一声闷哼。弗朗茨把牙扔进搪瓷盘，说瞧这牙根都黑了。收钱时他多要了二十赫勒，算明矾水的钱，说下次别再拖成这样。
  _effects: cash -1.2 (理发师拔牙收费（其中1.2克朗记入债务）); health 0.03 (病牙被拔除但手法粗糙); mood -0.020000000000000018_

- **1924.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner把Josef Lechner的旧课本包上书皮，又在本子上签了名。Josef Lechner今年学会了自己系鞋带，也学会了在饭桌上说“不”；Alois Lechner听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 40 -> 48; state_parameter raising-child.caregiverBurden 61 -> 58; mood 0.020000000000000018_

- **1924.01** `state_expire:public-scandal` tags: public-scandal, scandal, reputation, social, state, state_tick, state:public-scandal
  Alois Lechner的「公开丑闻」到期；相关安排结束。
  _effects: state_remove public-scandal state:world-vienna-1912:92_

- **1924.01** `state_expire:p22-scandal-engine` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Alois Lechner的「流言发动机」到期；相关安排结束。
  _effects: state_remove p22-scandal-engine state:world-vienna-1912:93_

- **1924.01** `p9-work-jobsearch.railway-depot/railway-depot.no-baptism` tags: work, job_search, negotiation, wages, employment, task, railway, depot
  教区的办事员翻了很久簿子才开出证明，纸上的墨还没干透。Alois Lechner一路攥着往南站赶，月台上卸货的人已经排成两行，他站在队尾，听人说上午就招满了。
  _effects: cash -1 (往返教区的车钱（其中1克朗记入债务）); mood -0.07; relation acquaintance with person-materialized-world-vienna-1912-48_

- **1924.04** `p22-mistaken-inheritance::ctx-vienna-reform-1930::milieu-tenement/the-estate-comes-with-a-family` tags: mistaken_inheritance, funeral, corpse, identity, dark, reversal, debt, family
  陌生人的家属找上门，说既然Alois Lechner拿了遗产，就该替死者还债。Josef Lechner 2把借据摊在桌上，Josef Berg说法律上确实如此；Alois Lechner搬进那间公寓，却发现每个房间都住着原来的债主。窗户朝北，冬天没有太阳，房租却一分不少。把借据一张张摊开，发现每张都写着同一个地址。
  _effects: state_add debt-bondage state:world-vienna-1912:108; cash -4 (the dead man debts and the move); flag +estate_came_with_family; mood -0.040000000000000036_

- **1924.08** `df18-dream.water-in-the-cellar::ctx-vienna-reform-1930::milieu-tenement/ignore-the-dream` tags: dream, omen, home, water, coincidence, eerie, everyday, reform
  Alois Lechner醒后只当是晚饭太咸，翻个身又睡了。下午，地窖的水管爆开，煤和旧箱子泡在齐膝的水里。Hermann Moser 2帮着舀水，Alois Lechner一边舀一边想起梦里的水位，正好到第二个台阶。
  _effects: cash -4 (泡坏的煤和旧箱子（其中3克朗记入债务）); condition; relation acquaintance with person-materialized-world-vienna-1912-42; knowledge “我没有理会梦，地窖真的淹了。”; flag +df18_ignored_flood_dream; mood -0.03999999999999998; relation acquaintance with person-materialized-world-vienna-1912-42_

- **1924.08** `ml18-inheritance.conditional-will::ctx-vienna-reform-1930::milieu-tenement/contest-the-will` tags: inheritance, legal, family, money, conditions, cinema, quiet, reform
  Alois Lechner请了律师，说姑婆立遗嘱时已经认不清人。官司打了八个月，律师费、鉴定费和往返车钱加起来，最后拿到的十五克朗还不到原数的一半。Josef Bauer在法院门口递给Alois Lechner一张圣诞卡，里面没有字；Alois Lechner把它放进大衣内袋，回家路上买了两根蜡烛。
  _effects: cash 15 (the reduced settlement after contesting the will); relation rival with person-josef-bauer; relation acquaintance with person-materialized-world-vienna-1912-47; flag +contested_the_will; knowledge “律师费和鉴定费吃掉了遗嘱争议的大部分收益。”; mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-47_

- **1925.01** `p22-child-matchmaker::ctx-vienna-reform-1930::milieu-tenement/the-enemy-brings-a-cake` tags: child, matchmaker, family_album, enemy, warm, ironic, reconciliation, scandal
  孩子把一张陌生人的照片贴进家庭相册，说这是“爸爸以前最好的朋友”。Alois Lechner认出那是十年前打过官司的Emil Weiss，正要发火，孩子却说照片背面写着一行字：“等我回来吃饭。”第二天，Emil Weiss真的提着一只蛋糕站在门口。孩子把最大的一块留给Alois Lechner，Emil Weiss没有反对。
  _effects: relation friend with person-emil-weiss; cash 1 (the enemy brought a cake and a small gift); flag +enemy_brought_cake; mood 0.04999999999999999_

- **1925.01** `state_tick:debt-bondage/interest/pay-interest` tags: debt-bondage, debt, work, poverty, legal, state, state_tick
  Alois Lechner又付了一年的利息。本金几乎没动，债主的账本却翻到了新一页。
  _effects: cash -3 (debt interest); state_parameter debt-bondage.debt 24 -> 26_

- **1925.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner被叫到学校，老师说Luise Lechner这学期总在课上看窗外。回家的路上，Alois Lechner没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 14 -> 9; state_parameter raising-child.caregiverBurden 77 -> 82; cash -2 (extra lessons and replacement pencils); mood -0.030000000000000027_

- **1925.01** `kernel-health.task-tuberculosis-cure::ctx-vienna-reform-1930::milieu-tenement/tb-quits-job-for-cure` tags: health, task, tuberculosis, sanatorium, cure, reform, medical, schooling
  厂里不肯批假，Alois Lechner只好辞工。疗养院的账单先欠着，回到维也纳时，原来的位置已经有人；Alois Lechner把疗养院的收据和工票放在同一个铁盒里。铁盒盖上之前，他又看了一眼工票上的编号。
  _effects: cash -20 (sanatorium bill and travel（其中14克朗记入债务）); move place-klosterneuburg-aunt-house; health 0.019999999999999997 (sanatorium rest improved the cough); condition; role; knowledge “厂里不批疗养假，辞工才能进疗养院；回来时位置已经有人，收据和工票只能放一起。”_

- **1925.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Luise Lechner这周主动擦了黑板。Alois Lechner把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 9 -> 12; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:002690_

- **1925.02** `vienna-medical-treatment.night-fever/corner-doctor` tags: health, medical, family, money
  药粉含在嘴里发苦，Alois Lechner就着糖浆咽下去，喉头一阵凉。医生拎包出门时，楼梯间的煤气灯刚好灭了，Mitzi Hofer摸黑送他到拐角，回来时手里攥着找回的几枚赫勒。
  _effects: cash -4 (医生出诊费和药费（其中4克朗记入债务）); health 0.05 (药粉和糖浆缓解症状); relation friend with person-materialized-world-vienna-1912-15_

- **1925.06** `af17-luck.wallet-in-the-snow::ctx-klosterneuburg-rural-1912::milieu-tenement/kept-the-wallet` tags: luck, money, street, chance, irony, daily, rural, agriculture
  Alois Lechner把钱包塞进内袋，走了两条街才敢回头看。三克朗够买一周的煤，彩票也许什么都不是；但那天晚上，Alois Lechner把彩票压在盐罐底下，像压着一张还没有兑现的明天。
  _effects: cash 3 (the money in the lost wallet); state_add af17-lucky-idiot state:world-vienna-1912:157; flag +kept_the_snow_wallet; mood 0.020000000000000018; flag +lucky_idiot; mood 0.020000000000000018_

- **1925.12** `p9-history-union-political.police-observation/police-old-address` tags: politics, union, party, meeting, leaflet, police, strike, reform
  Anton Winter 2在巷口拦住Alois Lechner问住哪儿，Alois Lechner报了已经搬走半年的旧门牌，说和老婆孩子住那边。那人记下来便走了；当晚Alois Lechner托Emil Weiss把会员册转到另一处，自己绕了三条街才回Haus der Tante in Klosterneuburg。
  _effects: knowledge “街对面那两个人是警察局的便衣，在记散会人的住址”; relation acquaintance with person-emil-weiss; relation acquaintance with person-materialized-world-vienna-1912-51_

- **1926.01** `p22-inherited-debt::ctx-klosterneuburg-rural-1912::milieu-tenement/the-debt-is-the-house` tags: inheritance, debt, house, creditor, dark, reversal, legal, family
  律师说Alois Lechner继承了一栋小房子，附带一笔二十年的债。Rosa Lechner 2把账本摊在厨房桌上，说房子可以住，但每月要还的钱比房租还多；Josefine Hofer在旁边补了一句“这是合法的”。Alois Lechner搬进去的第一晚，发现厨房的抽屉里已经放着前任房客留下的还款日历。
  _effects: state_parameter debt-bondage.debt 26 -> 31; state_add p22-wild-fortune state:world-vienna-1912:156; cash -2 (the first mortgage payment（其中2克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-12; relation acquaintance with person-josefine-hofer; flag +debt_is_the_house; mood 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-12; flag +wild_fortune_active_

- **1926.01** `state_reaction:p22-wild-fortune/a-windfall-confirms-it` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  一笔意外的小钱进了门。Alois Lechner没有添新衣服，先把欠得最久的账单付了；收账的人在门口数了两遍，临走时说了一句“看来是真的”。
  _effects: state_parameter p22-wild-fortune.height 30 -> 35; state_parameter p22-wild-fortune.witnesses 40 -> 46; state_parameter p22-wild-fortune.fragility 65 -> 62; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:002718_

- **1926.01** `state_tick:debt-bondage/interest/pay-interest` tags: debt-bondage, debt, work, poverty, legal, state, state_tick
  Alois Lechner又付了一年的利息。本金几乎没动，债主的账本却翻到了新一页。
  _effects: cash -3 (debt interest); state_parameter debt-bondage.debt 31 -> 33_

- **1926.01** `state_tick:af17-lucky-idiot/luck-year/small-mercies` tags: af17-lucky-idiot, luck, fortune, windfall, suspicion, social, coincidence, absurd
  又一年过去，Alois Lechner在煤气灯下捡到一枚银币，又在当铺门口遇见一个认错人的老主顾。好事都不大，却一件接一件；街角咖啡馆里的人开始说，Alois Lechner一定知道什么别人不知道的门路。
  _effects: state_parameter af17-lucky-idiot.streak 12 -> 12; state_parameter af17-lucky-idiot.suspicion 25 -> 31; cash 1 (捡到的银币); mood 0.020000000000000018_

- **1926.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner把Josef Lechner的旧课本包上书皮，又在本子上签了名。Josef Lechner今年学会了自己系鞋带，也学会了在饭桌上说“不”；Alois Lechner听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 48 -> 56; state_parameter raising-child.caregiverBurden 58 -> 55; mood 0.020000000000000018_

- **1926.01** `p9-social-daily-culture.last-standing-ticket/p9-social-daily-culture.last-standing-ticket.buy-for-elder` tags: daily, culture, leisure, cafe, music, walk, task, task:culture
  前面的老人掏零钱时手抖得厉害，数了三遍也没凑够。Alois Lechner替老人把四十赫勒递进窗口，老人连声道谢，硬塞回一枚十赫勒铜板。等Alois Lechner自己买票时，窗口已经挂出“售罄”的牌子，只好站在剧院门廊下听里面隐约的乐声，脚底冰凉；这一趟净少三十赫勒，却让队伍里的人都记住了这份体面。
  _effects: cash -0.4 (替排队的老人垫付站票钱); cash 0.1 (老人硬塞回的铜板); reputation 0.04; mood -0.030000000000000027_

- **1926.02** `p9-gap-adult-solitude.leaking-shoe/leaking-shoe.stitched` tags: adulthood, daily, solitude, ordinary, home, repair, shoe, poverty
  Alois Lechner用鞋蜡把裂缝填上，又拿粗针和麻线把鞋底缝了一圈。针脚歪，鞋底一高一低，走路时右脚落地总比左脚重。第二天上工回来，脚后跟磨出一个水泡，可鞋没再渗水。
  _effects: skill_

- **1926.03** `vienna-medical-treatment.toothache/drops-and-endure` tags: health, medical, family, money
  药房伙计从褐色瓶里倒出药水，叮嘱别咽。Gustav Berg在柜台边说，这玩意儿治标不治本。Alois Lechner把棉球塞进嘴里，腮帮子鼓出一块，走回巷子时拿手帕捂着脸，怕风吹。
  _effects: cash -0.6 (牙痛药水（其中0.6克朗记入债务）); condition_

- **1926.12** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Josef Lechner这周主动擦了黑板。Alois Lechner把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 56 -> 59; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:003330_

- **1927.01** `bc18-luck.civic-mascot::ctx-klosterneuburg-rural-1912::milieu-tenement/luck-blamed-for-fire` tags: luck, charity, public, reputation, absurd, social, suspicion, rural
  仓库失火那晚，委员会的活动棚因为风向改变而保住了。第二天，Gustav Kral却在门口拦住Alois Lechner，说有人看见Alois Lechner在火起前从仓库边走过；幸运不能证明清白，反而像一种从别人那里借来的东西。Alois Lechner把铜别针还给她，回家路上第一次觉得，好运也会留下脚印。
  _effects: cash -1 (被委员会辞退后的车钱（其中1克朗记入债务）); reputation -0.04; state_parameter af17-lucky-idiot.suspicion 31 -> 46; relation rival with person-materialized-world-vienna-1912-4; condition; flag +luck_blamed_for_fire; mood -0.040000000000000036_

- **1927.01** `state_expire:debt-bondage` tags: debt-bondage, debt, work, poverty, legal, state, state_tick, state:debt-bondage
  Alois Lechner的「债务束缚」到期；相关安排结束。
  _effects: state_remove debt-bondage state:world-vienna-1912:108_

- **1927.01** `state_tick:p22-wild-fortune/the-story-gets-taller/a-witness-asks-for-proof` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  一个见证人要求Alois Lechner拿出证据。Alois Lechner翻遍抽屉，只找到一张被水浸过的收据；那天晚上，街上的故事换了主角，Alois Lechner的名字被挪到了最后一行。
  _effects: state_parameter p22-wild-fortune.height 35 -> 29; state_parameter p22-wild-fortune.witnesses 46 -> 41; state_parameter p22-wild-fortune.fragility 62 -> 69; mood -0.030000000000000027_

- **1927.01** `state_tick:af17-lucky-idiot/luck-year/small-mercies` tags: af17-lucky-idiot, luck, fortune, windfall, suspicion, social, coincidence, absurd
  又一年过去，Alois Lechner在煤气灯下捡到一枚银币，又在当铺门口遇见一个认错人的老主顾。好事都不大，却一件接一件；街角咖啡馆里的人开始说，Alois Lechner一定知道什么别人不知道的门路。
  _effects: state_parameter af17-lucky-idiot.streak 12 -> 12; state_parameter af17-lucky-idiot.suspicion 46 -> 52; cash 1 (捡到的银币); mood 0.020000000000000018_

- **1927.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner把Luise Lechner的旧课本包上书皮，又在本子上签了名。Luise Lechner今年学会了自己系鞋带，也学会了在饭桌上说“不”；Alois Lechner听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 12 -> 20; state_parameter raising-child.caregiverBurden 82 -> 79; mood 0.020000000000000018_

- **1927.01** `p9-social-daily-culture.cafe-newspaper/p9-social-daily-culture.cafe-newspaper.give-seat` tags: daily, culture, leisure, cafe, music, walk, task, task:daily
  Alois Lechner只喝了半杯就看见门口站着等位的老主顾，手里转着帽子。Alois Lechner把报纸叠好放回木架，起身让出窗边的位子，一杯 Melange 三十赫勒，侍者点头致意，没再收第二杯的钱。走出门时雨小了些，Alois Lechner站在檐下理了理衣领，觉得这半个下午也不算白来。
  _effects: cash -0.3 (一杯 Melange 的价钱); reputation 0.03; mood 0.020000000000000018_

- **1927.03** `p9-gap-adult-unemployed.labour-exchange/exchange-trial-work` tags: adulthood, unemployment, casual_labour, poverty, daily, labour_exchange, bureaucracy
  介绍所里那个Mitzi Bauer说木牌上的地址多半过时了，不如自己去问。Alois Lechner走了四十分钟到洗衣房，院子里晾着床单。老板娘让她先熨一件试试，看完说留下吧，明天还这个时辰来。
  _effects: cash 3 (洗衣房试工半天按件计酬); skill; relation acquaintance with person-materialized-world-vienna-1912-17_

- **1927.04** `r3-mig.smuggler-guide::ctx-klosterneuburg-rural-1912::milieu-tenement::dry-season-sandbars/guide-tried-to-sell-us` tags: migration, border, smuggling, river, risk, rural, agriculture, small_town
  船到河心，Alois Moser把桨横过来，说巡逻队今晚加了价，每人再加五克朗。Alois Lechner说没有钱，Alois Moser就把船往哨所那边撑。Anton Winter 2在岸上喊话，Alois Moser举手答应，Alois Lechner把口袋里的三克朗全扔进水里，趁他低头去捞时跳上了浅滩。
  _effects: cash -8 (船夫的价码（其中6克朗记入债务）); condition; flag +guide_tried_to_turn_me_in; relation rival with person-materialized-world-vienna-1912-18; knowledge “the boatman sells passengers to the patrol when the price is”_

- **1927.04** `vienna-housing-move.sublet-room/sublet-full` tags: housing, home, rent, family, money, household
  Alois Lechner把床上的旧褥子重新铺平，Luise Kral放下自己的铺盖卷，从怀里掏出一把钥匙看了看。厨房里多了一口人的碗，灶边的煤省着烧也够。Maria Winter在门口看了一眼，没多话。
  _effects: cash 4 (出租空床收进的月租); household; relation acquaintance with person-materialized-world-vienna-1912-2_

- **1928.01** `af17-luck.quiet-windfall::ctx-klosterneuburg-rural-1912::milieu-tenement/returned-at-the-box-office` tags: luck, windfall, daily, quiet, money, social, coincidence, rural
  Alois Lechner在歌剧院门口的雪水里捡到一只鳄鱼皮钱包，里面有九克朗、一张当晚的站票和一张调琴师的名片。Alois Lechner把钱包交到售票处，Alois Moser赶来时没有数钱，只问Alois Lechner会不会弹琴。三天后，Alois Moser替Alois Lechner调好了一架旧钢琴，没收工钱，还写了一张去乐器行的介绍信。
  _effects: cash 2 (失主给的谢礼); relation acquaintance with person-materialized-world-vienna-1912-18; reputation 0.03; state_parameter af17-lucky-idiot.suspicion 52 -> 42; skill; flag +returned_a_lost_wallet; mood 0.030000000000000027_

- **1928.01** `state_reaction:af17-lucky-idiot/windfall-talk` tags: af17-lucky-idiot, luck, fortune, windfall, suspicion, social, coincidence, absurd
  咖啡馆里有人问Alois Lechner，是不是替哪个议员跑过腿，或者认识一个会看牌的女人。Alois Lechner说自己只是运气好；这句话说出口，连Alois Lechner自己都觉得像在遮掩。
  _effects: state_parameter af17-lucky-idiot.suspicion 42 -> 54; reputation -0.02; flag +luck_explained_as_a_deal; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:003564_

- **1928.01** `state_expire:p22-wild-fortune` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  Alois Lechner的「荒唐横财」到期；相关安排结束。
  _effects: state_remove p22-wild-fortune state:world-vienna-1912:156; flag -wild_fortune_active_

- **1928.01** `state_tick:af17-lucky-idiot/luck-year/the-bill-comes-due` tags: af17-lucky-idiot, luck, fortune, windfall, suspicion, social, coincidence, absurd
  好运气没有出现。Alois Lechner错过电车，鞋跟断在环城大道的石缝里，回家才发现钥匙也丢了。邻居没有安慰，只说“总算轮到你了”，语气像在结一笔旧账。
  _effects: state_parameter af17-lucky-idiot.streak 12 -> 11; state_parameter af17-lucky-idiot.suspicion 54 -> 64; cash -1 (修鞋和配钥匙); mood -0.030000000000000027_

- **1928.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner被叫到学校，老师说Josef Lechner这学期总在课上看窗外。回家的路上，Alois Lechner没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 59 -> 54; state_parameter raising-child.caregiverBurden 55 -> 60; cash -2 (extra lessons and replacement pencils); mood -0.030000000000000027_

- **1928.01** `r13-civ.clinic-first-visit::ctx-vienna-reform-1930::milieu-tenement/dismissed-as-nerves` tags: health, clinic, queue, diagnosis, institution, reform, medical, schooling
  Alois Lechner把夜里咳醒的次数写在一张包装纸上，Josef Lechner 2扫了一眼，说是心事太重，给了几包安神粉。走廊尽头的护士压低声音，说住院部还有空床，但要医生签字。Alois Lechner把包装纸折回去，没再问。
  _effects: cash -1 (诊所走廊的第三张长凳); mood -0.07999999999999996; flag +clinic_dismissed_as_nerves; knowledge “the clinic doctor refused a hospital referral”; relation acquaintance with person-materialized-world-vienna-1912-55_

- **1928.01** `vienna-market-debt.coal-credit/coal-part-cash-part-furniture` tags: market, debt, money, home, shop
  你数出四十赫勒搁在秤盘上，说剩下的一克朗用那张旧折叠桌抵。老板撇了撇嘴，让伙计跟你上楼搬桌子。桌子腿有点晃，但木料还结实。邻居在楼道里搭了把手，账本上这一页只写了一行，没写利息。
  _effects: cash -0.4 (买煤付的部分现钱); food; relation acquaintance with person-materialized-world-vienna-1912-29; relation acquaintance with person-materialized-world-vienna-1912-29_

- **1928.06** `vienna-medical-treatment.sanatorium/ignore-diagnosis` tags: health, medical, family, money
  抽屉一推就卡住，Alois Lechner用膝盖顶了一下才合严。上工路上经过药房，橱窗里摆着润肺糖浆的广告画，她别过头去。车间主任点名时，她应声比平时慢了一拍。
  _effects: condition; mood -0.040000000000000036_

- **1928.06** `state_reaction:raising-child/child-death-in-the-household` tags: raising-child, family, child, care, school, household, state, state_reaction
  孩子的名字从学校的名册上被划掉以后，家里的碗还多摆了一副。Alois Lechner没有把它收起来，直到有一天发现碗沿积了灰，才拿去洗。
  _effects: state_parameter raising-child.childConfidence 29 -> 0; state_parameter raising-child.caregiverBurden 60 -> 75; mood -0.09999999999999998_
  _causes: evt:world-vienna-1912:004081_

- **1928.06** `state_reaction:raising-child/child-death-in-the-household` tags: raising-child, family, child, care, school, household, state, state_reaction
  孩子的名字从学校的名册上被划掉以后，家里的碗还多摆了一副。Alois Lechner没有把它收起来，直到有一天发现碗沿积了灰，才拿去洗。
  _effects: state_parameter raising-child.childConfidence 25 -> 0; state_parameter raising-child.caregiverBurden 79 -> 94; mood -0.09999999999999998_
  _causes: evt:world-vienna-1912:004081_

- **1928.06** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Luise Lechner这周主动擦了黑板。Alois Lechner把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 20 -> 23; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:004243_

- **1928.11** `p9-gap-adult-unemployed.moving-job/moving-heavy-books-bonus` tags: adulthood, unemployment, casual_labour, poverty, daily, moving, neighbor
  书箱落地时扬起一层灰，Gustav Weiss蹲下把绳子解开，说这些书比家具还金贵。Alois Lechner靠着墙喘气，Franz Lechner在边上笑，说下回这家的活儿还来。
  _effects: cash 0.6 (搬书箱额外给的辛苦钱); relation acquaintance with person-materialized-world-vienna-1912-28_

- **1929.01** `pc20-family.parent-mistake::ctx-vienna-reform-1930::milieu-tenement/cover` tags: parent, child, mistake, second_chance, family, school, repetition, intervention
  Alois Lechner替Luise Lechner向Friedrich Weiss请了病假，又把那件可能惹麻烦的东西藏进自己的工具箱。Friedrich Weiss看了Alois Lechner一眼，说病假可以补，别的东西补不了；Luise Lechner在里屋听见，门没有关严。
  _effects: state_add pc20-second-chance state:world-vienna-1912:312; relation acquaintance with person-materialized-world-vienna-1912-38; flag +covered_child_mistake; knowledge “病假可以补，别的东西补不了。”; relation acquaintance with person-materialized-world-vienna-1912-38; flag +second_chance_open_

- **1929.01** `state_reaction:pc20-second-chance/public-doubt` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  旧事被人在街上重新提起，Alois Lechner的名字和另一件事绑在一起。有人替Alois Lechner辩解，也有人只笑了一声；Alois Lechner回家后把当天的收据一张张摊开，像在给自己准备证词。
  _effects: state_parameter pc20-second-chance.suspicion 50 -> 58; state_parameter pc20-second-chance.credibility 40 -> 36; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:004218_

- **1929.01** `state_expire:af17-lucky-idiot` tags: af17-lucky-idiot, luck, fortune, windfall, suspicion, social, coincidence, absurd
  Alois Lechner的「走运的傻瓜」到期；相关安排结束。
  _effects: state_remove af17-lucky-idiot state:world-vienna-1912:157; flag -lucky_idiot_

- **1929.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner被叫到学校，老师说Luise Lechner这学期总在课上看窗外。回家的路上，Alois Lechner没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 23 -> 18; state_parameter raising-child.caregiverBurden 94 -> 99; cash -2 (extra lessons and replacement pencils); mood -0.030000000000000027_

- **1929.01** `r13-fam.care-sick-child::ctx-vienna-reform-1930::milieu-tenement/fever-worsens` tags: task, care, health, child, fever, night, reform, medical
  到了后半夜，Anna Weiss的呼吸越来越急，胸口凹下去一块。Alois Lechner把最后两克朗塞给邻居，让邻居去请医生；医生天亮才来，只说怎么不早点送医院。Alois Lechner抱着孩子坐在门槛上，等一辆借来的车。
  _effects: cash -5 (第三遍换湿布（其中3.6克朗记入债务）); flag +child_fever_worsened; health -0.09999999999999998 (the fever worsened before a doctor arrived); condition_

- **1929.01** `vienna-parish-aid.funeral-society/funeral-society.pay` tags: faith, parish, mutual_aid, poverty, family
  Alois Lechner数出八赫勒交给Emil Weiss，看她在蓝皮本上找到自家门牌，把这一周的格子划掉。Emil Weiss说上个月隔壁巷子的人走了，公账出了棺材和一场小弥撒，剩下的钱记在册尾。楼梯口的灯很暗，Alois Lechner盯着自己的名字看了两遍才转身。
  _effects: cash -0.4 (一周丧葬互助会会费); relation acquaintance with person-emil-weiss; flag +funeral_society_member_

- **1929.07** `vienna-housing-move.rent-notice/rent-notice-demand-repair` tags: housing, home, rent, family, money
  Alois Lechner没有立刻答话，先去敲Luise Kral的门。两人一起数落墙上的水渍和门框里灌进来的风，楼梯间的窗户修好了，自家墙皮还在剥落。Luise Kral提议一起把话带给看门人：先修好漏水的墙角，涨租的事再谈。Alois Lechner把纸重新折好，请他把话带到门外。
  _effects: mood 0.030000000000000027_

- **1929.09** `vienna-history-schnitzler-theatre/watch-from-the-gallery` tags: history, culture, arthur_schnitzler, burgtheater, theatre
  Alois Lechner 买的是顶层站票，幕间只能看见包厢一角。Arthur Schnitzler 的剧演到第三幕，台下有人低声议论上一季被禁的那部戏；散场后，Alois Lechner 在衣帽间外看见Arthur Schnitzler 被两位评论家围住。
  _effects: knowledge “Schnitzler 的剧作在 Burgtheater 上演时，观众会把剧情与维也纳的医生、官员和审查制度对照着议论。”; relation acquaintance with person-arthur-schnitzler; cash -3 (gallery ticket and coat check); mood 0.020000000000000018_

- **1929.12** `state_reaction:raising-child/child-death-in-the-household` tags: raising-child, family, child, care, school, household, state, state_reaction
  孩子的名字从学校的名册上被划掉以后，家里的碗还多摆了一副。Alois Lechner没有把它收起来，直到有一天发现碗沿积了灰，才拿去洗。
  _effects: state_parameter raising-child.childConfidence 55 -> 25; state_parameter raising-child.caregiverBurden 45 -> 60; mood -0.09999999999999998_
  _causes: evt:world-vienna-1912:004565_

- **1929.12** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Josef Lechner这周主动擦了黑板。Alois Lechner把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 54 -> 57; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:004748_

- **1930.01** `vienna-life-injury-recovery/home-care` tags: health, work, family, injury
  Alois Lechner没有去诊所，只用热水和旧布洗了伤口。第二天伤口周围发红，家里人把仅剩的干净床单撕成条。
  _effects: health -0.03 (untreated wound); cash -2 (clean cloth); condition_
  _causes: evt:world-vienna-1912:004436_

- **1930.01** `pc20-enemy.old-enemy-ally::ctx-vienna-reform-1930::milieu-union/alliance` tags: enemy, ally, second_chance, reconciliation, rivalry, politics, truce, reform
  Maria Kral在门口伸出手，说当年那件事他也有一半责任。Alois Lechner没有立刻握，只问他想要什么；Maria Kral说想要一个能一起把旧账查清的人。Otto Lechner在屋里听见，把两把椅子都搬到了桌边。
  _effects: state_parameter pc20-second-chance.suspicion 58 -> 50; state_parameter pc20-second-chance.credibility 36 -> 42; flag +old_enemy_became_ally; knowledge “旧敌说当年那件事他也有一半责任，想要一个一起查清旧账的人。”; relation acquaintance with person-materialized-world-vienna-1912-39_

- **1930.01** `state_reaction:pc20-second-chance/someone-vouches` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  一个不算亲近的人替Alois Lechner说了句话：不是保证Alois Lechner已经变好，只说那天Alois Lechner确实在场、确实没有躲。话传回来时，Alois Lechner正在补一只旧口袋，针脚第一次没有歪。
  _effects: state_parameter pc20-second-chance.credibility 42 -> 49; state_parameter pc20-second-chance.hope 40 -> 45; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:004509_

- **1930.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner把Josef Lechner的旧课本包上书皮，又在本子上签了名。Josef Lechner今年学会了自己系鞋带，也学会了在饭桌上说“不”；Alois Lechner听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 57 -> 65; state_parameter raising-child.caregiverBurden 75 -> 72; mood 0.020000000000000018_

- **1930.01** `state_tick:pc20-second-chance/kept-word/kept-word` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  Alois Lechner把答应过的事又做了一遍：按时出现，把欠下的小钱还掉，没有在旧话上添新的解释。对方没有鼓掌，只把杯子往Alois Lechner这边推了推；这一次的沉默比上次轻。
  _effects: state_parameter pc20-second-chance.credibility 45 -> 51; state_parameter pc20-second-chance.suspicion 58 -> 53; state_parameter pc20-second-chance.hope 45 -> 49; mood 0.020000000000000018_

- **1930.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner把Ferdinand 2的旧课本包上书皮，又在本子上签了名。Ferdinand 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Alois Lechner听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 23 -> 31; state_parameter raising-child.caregiverBurden 60 -> 57; mood 0.020000000000000018_

- **1930.01** `agency:attend_meeting` tags: agency, agency:attend_meeting
  Alois Lechner走到Arbeiter-Zeitung im Vorwärts-Haus门口，看见便衣和拥挤的人群，最终没有进去。
  _effects: mood -0.040000000000000036_

- **1930.02** `state_reaction:pc20-second-chance/public-doubt` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  旧事被人在街上重新提起，Alois Lechner的名字和另一件事绑在一起。有人替Alois Lechner辩解，也有人只笑了一声；Alois Lechner回家后把当天的收据一张张摊开，像在给自己准备证词。
  _effects: state_parameter pc20-second-chance.suspicion 50 -> 58; state_parameter pc20-second-chance.credibility 49 -> 45; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:004722_

- **1930.02** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Ferdinand 2这周主动擦了黑板。Alois Lechner把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 20 -> 23; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:004750_

- **1930.08** `vienna-medical-treatment.sanatorium/sanatorium-go` tags: health, medical, family, money
  安娜把钥匙拴在门后的钉子上，又反过来压了压窗栓。车票是硬纸的，打孔时咔嗒一声。Alois Lechner在车厢里把诊断书摊在膝盖上，窗外最后几排厂房退远了，松树的味道从窗缝钻进来。
  _effects: cash -12 (疗养院车票和住宿押金); health 0.11999999999999997 (疗养院松林空气和正规休养); relation friend with person-materialized-world-vienna-1912-42_

- **1930.08** `vienna-social-movement.recruitment/join-and-carry` tags: development, social_movement, organization, politics
  Alois Lechner在楼梯下面接到一张折成四折的传单。纸上没有署名，只写着下一次集会的地址。Alois Lechner去了，在昏暗的屋里报上姓名，成为第二区夜班出租合作社的一员，并答应负责自己所在街区的联络。
  _effects: organization_membership; role; relation acquaintance with person-materialized-world-vienna-1912-15_

- **1930.08** `ad20-landlord-visit::ctx-klosterneuburg-rural-1912::milieu-tenement/repairs-promised` tags: housing, rent, landlord, everyday, repair, public, rural, agriculture
  Emil Weiss带着木尺来了，先敲窗框，又敲暖气片。Alois Lechner把去年冬天裂开的缝指给他看；Emil Weiss说可以修，但材料钱要从下个月房租里扣。Alois Lechner算了算，还是点了头。窗外的雨顺着玻璃往下走，屋里第一次没有风。
  _effects: cash -1 (materials for the window repair); relation acquaintance with person-emil-weiss; flag +repair_promised; mood 0.020000000000000018_

- **1931.01** `office16-budget.sign-or-block::ctx-klosterneuburg-rural-1912::milieu-tenement/blocked-the-permit` tags: office, budget, permit, administration, power, economy, rural, agriculture
  Alois Lechner把一份扩建许可证压在抽屉最下面，理由是排水和消防通道不合规。申请人Mitzi Bauer在走廊里等到下班，最后只拿到一张写着“补件”的纸条。Alois Lechner知道这份许可明年还会再来，但今年不会从自己的桌上出去。
  _effects: reputation 0.02; skill; relation rival with person-materialized-world-vienna-1912-17; flag +blocked_permit; knowledge “扩建申请的排水图与消防通道不符合现行规定。”; relation acquaintance with person-materialized-world-vienna-1912-53_

- **1931.01** `state_tick:pc20-second-chance/kept-word/kept-word` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  Alois Lechner把答应过的事又做了一遍：按时出现，把欠下的小钱还掉，没有在旧话上添新的解释。对方没有鼓掌，只把杯子往Alois Lechner这边推了推；这一次的沉默比上次轻。
  _effects: state_parameter pc20-second-chance.credibility 51 -> 57; state_parameter pc20-second-chance.suspicion 53 -> 48; state_parameter pc20-second-chance.hope 49 -> 53; mood 0.020000000000000018_

- **1931.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner被叫到学校，老师说Luise Lechner这学期总在课上看窗外。回家的路上，Alois Lechner没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 18 -> 13; state_parameter raising-child.caregiverBurden 99 -> 100; cash -2 (extra lessons and replacement pencils); mood -0.030000000000000027_

- **1931.01** `agency:organize_meeting` tags: agency, agency:organize_meeting
  Alois Lechner原定在Leopoldstädter Zinshaus, gemeinsamer Gang开会，但来的人不够，或者有人临时退缩；最后只留下几张没发完的纸条。
  _effects: mood -0.040000000000000036_

- **1931.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Luise Lechner这周主动擦了黑板。Alois Lechner把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 13 -> 16; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:005551_

- **1931.06** `vienna-medical-treatment.night-fever/sweat-it-out` tags: health, medical, family, money, injury
  Alois Lechner说胡话时念着车间的排班表，Helene Lechner 2一句句应着，拿小勺往嘴里送温水。床头那半瓶退烧药早见了底，她没舍得倒最后一滴，留着天亮再说。
  _effects: health -0.03999999999999998 (高烧硬熬伤身); relation friend with person-materialized-world-vienna-1912-66; relation acquaintance with person-materialized-world-vienna-1912-66_

- **1931.09** `ad20-police-stop::ctx-vienna-reform-1930::milieu-tenement/taken-in` tags: police, legal, street, everyday, obligation, risk, reform, medical
  Maria Kral让Alois Lechner靠墙站好，把口袋里的东西一件件放在地上。钥匙、手帕、半块面包，还有一张写着地址的纸。Maria Kral把纸对着路灯看了很久，最后说“跟我们走一趟”。
  _effects: cash -2 (a fine after the police stop); reputation -0.03; flag +police_stop_record; health -0.020000000000000018 (a night in a holding cell); mood -0.050000000000000044_

- **1931.12** `bc18-fame.wrong-bust::ctx-vienna-reform-1930::milieu-tenement/plaque-stays` tags: fame, mistaken_identity, museum, public, invention, absurd, status, humiliation
  市立蜡像馆新添了一间“发明家厅”。Gustav Berg把Alois Lechner请到绿绒椅子上，说照片是从旧报纸上剪的，名字也核对过三遍。揭幕那天，Alois Lechner看见自己的蜡像握着一根安全火柴，铭牌上写着一个从未属于Alois Lechner的专利号；掌声很整齐，Gustav Berg把下一场讲解的酬劳塞进口袋，动作像在递一块糖。
  _effects: cash 4 (蜡像馆的讲解酬劳); state_add bc18-ridiculous-fame state:world-vienna-1912:480; reputation 0.029999999999999995; relation acquaintance with person-gustav-berg; flag +wax_museum_inventor; mood 0.030000000000000027; flag +ridiculously_famous; reputation 0.02; mood 0.020000000000000018_

- **1931.12** `state_reaction:bc18-ridiculous-fame/reprinted-wrong` tags: bc18-ridiculous-fame, fame, reputation, mistaken_identity, promotion, media, absurd, public
  报纸的周末副刊又把Alois Lechner的旧照片翻出来，配上一个更整齐的故事：发明、失败、谦逊的晚年。Alois Lechner写信去更正，编辑回了一张便条，说读者喜欢现在这个版本。
  _effects: state_parameter bc18-ridiculous-fame.notoriety 38 -> 44; state_parameter bc18-ridiculous-fame.absurdity 72 -> 77; state_parameter bc18-ridiculous-fame.legitimacy 12 -> 8; flag +story_reprinted_wrong; mood -0.010000000000000009_
  _causes: evt:world-vienna-1912:005602_

- **1932.01** `pc20-enemy.old-enemy-ally::ctx-vienna-reform-1930::milieu-union/alliance` tags: enemy, ally, second_chance, reconciliation, rivalry, politics, truce, reform
  Anna Bauer在门口伸出手，说当年那件事他也有一半责任。Alois Lechner没有立刻握，只问他想要什么；Anna Bauer说想要一个能一起把旧账查清的人。Maria Kral在屋里听见，把两把椅子都搬到了桌边。
  _effects: relation friend with person-anna-bauer; state_parameter pc20-second-chance.suspicion 48 -> 40; state_parameter pc20-second-chance.credibility 57 -> 63; knowledge “旧敌说当年那件事他也有一半责任，想要一个一起查清旧账的人。”_

- **1932.01** `state_reaction:raising-child/child-death-in-the-household` tags: raising-child, family, child, care, school, household, state, state_reaction
  孩子的名字从学校的名册上被划掉以后，家里的碗还多摆了一副。Alois Lechner没有把它收起来，直到有一天发现碗沿积了灰，才拿去洗。
  _effects: state_parameter raising-child.childConfidence 55 -> 25; state_parameter raising-child.caregiverBurden 45 -> 60; mood -0.09999999999999998_
  _causes: evt:world-vienna-1912:005642_

- **1932.01** `state_expire:raising-child` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner的「家里有个正在长大的孩子」到期；相关安排结束。
  _effects: state_remove raising-child state:world-vienna-1912:19_

- **1932.01** `state_tick:pc20-second-chance/kept-word/small-relapse` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  Alois Lechner晚了半个钟头，进门时先解释路上的电车，又解释口袋里的收据。对方没有追问，只把已经凉掉的汤端回厨房；Alois Lechner听见锅盖碰在灶台上，知道这次不是天气的问题。
  _effects: state_parameter pc20-second-chance.credibility 63 -> 56; state_parameter pc20-second-chance.suspicion 40 -> 48; state_parameter pc20-second-chance.debt 40 -> 43; mood -0.030000000000000027_

- **1932.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner被叫到学校，老师说Ferdinand 2这学期总在课上看窗外。回家的路上，Alois Lechner没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 31 -> 26; state_parameter raising-child.caregiverBurden 57 -> 62; cash -2 (extra lessons and replacement pencils)_

- **1932.01** `state_expire:raising-child` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner的「家里有个正在长大的孩子」到期；相关安排结束。
  _effects: state_remove raising-child state:world-vienna-1912:41_

- **1932.01** `state_tick:bc18-ridiculous-fame/ridiculous-fame-year/the-story-holds-another-year` tags: bc18-ridiculous-fame, fame, reputation, mistaken_identity, promotion, media, absurd, public
  又一年过去，Alois Lechner仍在被介绍成那个人物。邀请函从市郊的园艺会、女子学校和退伍军人酒馆寄来；Alois Lechner学会在签名后加一句模糊的谦辞，听起来像有许多往事不便细说。每一次应付都带来一点小钱，也让真正的解释更不合时宜。
  _effects: state_parameter bc18-ridiculous-fame.notoriety 44 -> 51; state_parameter bc18-ridiculous-fame.invitations 1 -> 2; cash 1 (一场小型演讲的车马费); reputation 0.010000000000000002; mood 0.020000000000000018_

- **1932.01** `agency:recruit_members` tags: agency, agency:recruit_members
  Alois Lechner试图招募Mitzi 2，但对方担心工作和警察，没有给出承诺。
  _effects: mood -0.020000000000000018_

- **1932.01** `initiative:found_process:taxi:person-materialized-world-vienna-1912-37-evt:world-vienna-1912:003231`
  第二区夜班出租合作社在Leopoldstädter Zinshaus, gemeinsamer Gang经过数年的招募、会议和互助，把分散的行动整理成公开纲领；这不是预先写好的历史，而是成员自己累积出来的运动。
  _effects: historical process 第二区夜班出租合作社的持续运动; historical development:initiative-taxi:person-materialized-world-vienna-1912-37-evt:world-vienna-1912:003231-1932 as organizer; historical development:initiative-taxi:person-materialized-world-vienna-1912-37-evt:world-vienna-1912:003231-1932 as organizer; knowledge “第二区夜班出租合作社的持续运动不是一次会议，而是我们这些年积累出来的持续组织。”; reputation 0.04_

- **1932.01** `historical_phase`
  历史进程《第二区夜班出租合作社在Leopoldstädter Zinshaus, gemeinsamer Gang经过数年的招募、会议和互助，把分散的行动整理成公开纲领；》从 emerging 进入 mobilizing。
  _effects: knowledge “我亲历或知晓「第二区夜班出租合作社在Leopoldstädter Zinshaus, gemeinsamer Gang经”; knowledge “我亲历或知晓「第二区夜班出租合作社在Leopoldstädter Zinshaus, gemeinsamer Gang经”_
  _causes: evt:world-vienna-1912:006132_

- **1932.01** `vienna-housing-move.flat-viewing/flat-viewing-too-damp` tags: housing, home, rent, family, money
  Alois Lechner在单间里站了一刻钟，脚底发潮，墙纸底下透出一股霉味。看门人说刷一层石灰就好，Karl Kraus却在门口轻轻咳了一声，提醒这背面没有阳光。Alois Lechner把定金收回口袋，谢过看门人，宁可多付三克朗，也不愿把湿气带进夜里。
  _effects: relation acquaintance with person-karl-kraus; flag +still_looking_for_room_

- **1932.01** `vienna-parish-aid.funeral-society/funeral-society.defer` tags: faith, parish, mutual_aid, poverty, family
  Alois Lechner说这个月先欠着，等发工钱补上。Anton Kral在名字旁画了个小圈，写明欠两周，叮嘱别拖过月底，否则要重新排进新会员的等待期。她走时把楼道的门带严，说冷风灌进来煤烧得快。Alois Lechner回头数了数抽屉里的零钱，还差三个赫勒。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-37_

- **1932.03** `vienna-history-kraus-lecture/leave-before-the-end` tags: history, culture, karl_kraus, cafe_central, public_lecture, press
  朗读开始不久，Alois Lechner 发现后排有人在记名字，便提前离开。走到门口时，Karl Kraus 的声音还在背后，句子像钉子一样短。第二天，Alois Lechner 在报摊上看到同一篇文章被删去了两段。
  _effects: knowledge “Café Central 的公开朗读吸引便衣和报纸记者，现场听众并不全是同情者。”; relation acquaintance with person-karl-kraus; cash -1 (coffee before leaving the reading)_

- **1933.01** `vienna-life-injury-recovery/wound-infection` tags: health, work, family, injury
  Alois Lechner的伤口在几天后肿起来，手腕发热。医生说要切开引流，费用比上次更高；Alois Lechner看着账单，先问能不能分两次付。
  _effects: health -0.12 (wound infection); cash -14 (drainage and medicine); condition_
  _causes: evt:world-vienna-1912:005604_

- **1933.01** `office16-corruption.inspection::ctx-vienna-reform-1930::milieu-union/fined` tags: office, corruption, audit, legal, power, dark, reform, medical
  Friedrich Hofer在第三份合同上停住了：同一批纸张被报了两次价，第二次的签字是Alois Lechner。罚款单当场开出，金额不算大，但足够让下一季度的办公用品全部改成最便宜的牌子。Alois Lechner没有争辩，只在收据背面写了日期。
  _effects: organization_funds; reputation -0.05; state_add office-under-siege state:world-vienna-1912:532; flag +fined_after_audit; knowledge “同一批纸张被报了两次价，第二次的签字是我的。”; relation acquaintance with person-materialized-world-vienna-1912-72; flag +office_under_siege_

- **1933.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Gustav Moser这周主动擦了黑板。Alois Lechner把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 28 -> 31; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:006241_

- **1933.01** `state_expire:pc20-second-chance` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  Alois Lechner的「第二次机会」到期；相关安排结束。
  _effects: state_remove pc20-second-chance state:world-vienna-1912:312; flag -second_chance_open_

- **1933.01** `state_tick:bc18-ridiculous-fame/ridiculous-fame-year/the-audience-gets-bored` tags: bc18-ridiculous-fame, fame, reputation, mistaken_identity, promotion, media, absurd, public
  观众开始厌倦同一个故事。园艺会请了更年轻的发明家，女子学校把Alois Lechner的名字从海报上撤下；Alois Lechner在咖啡馆听见有人说“那个人还在讲火柴”。同一个月，一张报纸把旧照片配上新标题，问Alois Lechner是否已经“过气”。纠正的冲动又回来，但没有人再提问。
  _effects: state_parameter bc18-ridiculous-fame.legitimacy 8 -> 0; state_parameter bc18-ridiculous-fame.boredom 8 -> 20; state_parameter bc18-ridiculous-fame.invitations 2 -> 1; reputation -0.02; mood -0.030000000000000027_

- **1933.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner把Elisabeth Lechner的旧课本包上书皮，又在本子上签了名。Elisabeth Lechner今年学会了自己系鞋带，也学会了在饭桌上说“不”；Alois Lechner听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 23 -> 31; state_parameter raising-child.caregiverBurden 60 -> 57; mood 0.020000000000000018_

- **1933.01** `agency:organize_meeting` tags: agency, agency:organize_meeting
  Alois Lechner在Versammlungsraum der graphischen Arbeiter召集了一次小范围会议，和Emil Weiss把下一次行动、会费和分工写在纸上。
  _effects: project; relation colleague with person-emil-weiss; reputation 0.02_

- **1933.01** `p9-history-medical-daily.suspicious-death/ask-pharmacy` tags: health, medical, public_health, family, pharmacy, sanitation, daily
  药房伙计把手一横，说没有处方存根不能查。Alois Lechner退到门口，从门玻璃反光里看见药剂师把本子合上；回家路上Alois Lechner在纸角记下那半个名字，墨水被雪水洇开。
  _effects: mood -0.050000000000000044; reputation -0.019999999999999997; knowledge “药房处方存根上的名字被水洇开，只认得出“施特”两字”; relation acquaintance with person-materialized-world-vienna-1912-41; relation acquaintance with person-materialized-world-vienna-1912-23_

- **1933.02** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Elisabeth Lechner这周主动擦了黑板。Alois Lechner把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 20 -> 23; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:006461_

- **1933.05** `vienna-adult-social.burial-fund/burial-fund.skipped` tags: adulthood, social, work, family
  Alois Lechner对Maria Moser 2说这个月实在挤不出来，房租刚涨了半个克朗。Maria Moser 2把本子翻到另一页，说那就先记着，只是下个月得补齐。午休铃响时，Alois Lechner的工具箱上还留着本子压出的印子。
  _effects: relation colleague with person-materialized-world-vienna-1912-72_

- **1933.07** `bc18-ghost.death-certificate::ctx-vienna-authoritarian-1934::milieu-tenement/accepts-the-file` tags: bureaucracy, legal, death, identity, mistake, paperwork, absurd, vienna
  户籍官Alois Moser为了结掉一桩陈年失踪案，在档案上给Alois Lechner盖了“推定死亡”。三天后，Alois Lechner收到一张慰问卡和一本作废的配给簿；同一天，追了半年的债主忽然不再上门。旧货商听说后，花两克朗买走一份抄本，说要给一个躲债的朋友看看格式。
  _effects: cash 2 (卖给旧货商的死亡证明抄本); state_add bc18-bureaucratic-ghost state:world-vienna-1912:585; reputation -0.010000000000000002; relation acquaintance with person-materialized-world-vienna-1912-18; flag +declared_dead_while_alive; mood 0.010000000000000009; flag +bureaucratic_ghost_

- **1933.07** `state_reaction:bc18-bureaucratic-ghost/another-file-opened` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  Alois Lechner刚在一个窗口证明自己活着，另一个窗口又从抽屉里抽出一张死亡通知。两个办事员隔着走廊互相看了一眼，谁也没有先开口；Alois Lechner站在中间，忽然明白自己不是一个人，而是一份正在被转抄的卷宗。
  _effects: state_parameter bc18-bureaucratic-ghost.risk 20 -> 32; state_parameter bc18-bureaucratic-ghost.duplicates 1 -> 2; state_parameter bc18-bureaucratic-ghost.sightings 1 -> 2; flag +another_file_opened; mood -0.010000000000000009_
  _causes: evt:world-vienna-1912:006731_

- **1934.01** `project_progressed` tags: project
  「Alois Lechner召集的会议」继续推进了一阶段。
  _effects: project_

- **1934.01** `office16-budget.sign-or-block::ctx-vienna-authoritarian-1934::milieu-tenement/signed-with-margin` tags: office, budget, permit, administration, power, economy, vienna, urban
  Alois Lechner在预算表上签了字，把冬季煤房的款项从三笔并成一笔，又给夜班守卫加了半份津贴。Friedrich Hofer算出省下的钱刚好够修屋顶；没有人鼓掌，但一月的会议室不再需要穿大衣。
  _effects: organization_funds; reputation 0.04; skill; mood 0.020000000000000018; flag +signed_balanced_budget; knowledge “把冬季煤房的款项并成一笔后，省下的钱够修会议室屋顶。”_

- **1934.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner把Ferdinand 2的旧课本包上书皮，又在本子上签了名。Ferdinand 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Alois Lechner听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 37 -> 45; state_parameter raising-child.caregiverBurden 62 -> 59; mood 0.020000000000000018_

- **1934.01** `state_expire:bc18-ridiculous-fame` tags: bc18-ridiculous-fame, fame, reputation, mistaken_identity, promotion, media, absurd, public
  Alois Lechner的「荒唐的名声」到期；相关安排结束。
  _effects: state_remove bc18-ridiculous-fame state:world-vienna-1912:480; flag -ridiculously_famous_

- **1934.01** `state_expire:office-under-siege` tags: office-under-siege, office, scandal, pressure, politics, legal, risk, state
  Alois Lechner的「职位受围」到期；相关安排结束。
  _effects: state_remove office-under-siege state:world-vienna-1912:532; flag -office_under_siege_

- **1934.01** `state_tick:bc18-bureaucratic-ghost/paper-trail-year/another-window-opens` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  一个税务员把Alois Lechner的死亡记录和一张新房租收据订在一起，寄到了另一个区。三个星期后，Alois Lechner收到一封要求“已故纳税人”补缴暖气税的信；去问时，窗口说档案正在路上，让Alois Lechner先等通知。通知没有来，房租却涨了。
  _effects: state_parameter bc18-bureaucratic-ghost.fileDepth 25 -> 32; state_parameter bc18-bureaucratic-ghost.risk 32 -> 42; cash -1 (跑窗口的车钱); flag +heating_tax_for_the_dead; mood -0.020000000000000018_

- **1934.01** `kernel-migrate.refugee-aid::ctx-vienna-authoritarian-1934::milieu-tenement/civic-refugee-search` tags: migration, refugee, missing_relative, care, postwar, vienna, urban, crisis
  名单墙前挤着十几个人，Gustav Stein指着一行被划掉的名字，说那是他妹妹。他替对方抄下名字，又去Grete Stein 2的窗口问；窗口说档案在另一栋楼，他去时那栋楼已经锁门。他在档案楼门口等到锁门，只记下了一个门牌号。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-52; knowledge “名单上被划掉的名字要查另一栋楼的档案，窗口关门后只能等明天”; cash -3 (抄名单的纸笔和跑两栋楼的车钱); flag +searched_refugee_list; health -0.010000000000000009 (在名单墙前站了一天); relation acquaintance with person-materialized-world-vienna-1912-52_

- **1934.03** `vienna-parish-aid.rent-box/rent-box.accept-all` tags: faith, parish, mutual_aid, poverty, family
  煤袋落在台阶上，扬起细细一层黑末。Josefine Hofer用铅笔头在蓝格册上写门牌号，问房东姓什么，又叮嘱别把面包票弄丢。灶上水壶开始叫，Alois Lechner才想起屋里连只干净的杯子都没有。
  _effects: cash 6 (互助会补上本月房租差额); food; relation acquaintance with person-josefine-hofer_

- **1934.07** `vienna-church-community.tenement-prayer/rent-prayer-argument` tags: faith, social, family, home
  Emil Weiss怪Alois Lechner把人都招到楼梯上，木头泡了潮气才裂的。Alois Lechner没还嘴，蹲下去看那道裂缝，指甲刮下一层朽木屑。
  _effects: relation acquaintance with person-emil-weiss; reputation -0.03_

- **1934.11** `p9-history-medical-daily.suspicious-death/accept-doctor-story` tags: health, medical, public_health, family, pharmacy, sanitation, daily, injury
  楼里的女人都来劝Josefine Hofer，说人死不能复生。Alois Lechner把药包从桌角拿起来，纸包上没写字，只有药房火漆印；炉门一开，火苗舔着纸角，Alois Lechner把炉门关上。
  _effects: cash -1.2 (帮死者家属凑葬礼钱); relation acquaintance with person-josefine-hofer; health -0.010000000000000009 (吸入烧药纸包的烟)_

- **1935.01** `project_completed` tags: project
  「Alois Lechner召集的会议」完成了当前阶段，参与者留下了实际的记录和后续安排。
  _effects: project_

- **1935.01** `pc20-family.parent-mistake::ctx-vienna-authoritarian-1934::milieu-tenement/intervene` tags: parent, child, mistake, second_chance, family, school, repetition, intervention
  Alois Lechner在Mitzi出门前拦住他，没有讲自己当年的故事，只把一件具体的事说清楚：那家店里的人不会替他签字，也不会替他坐牢。Mitzi听完，把口袋里的纸掏出来；Josef Lechner 2在门口等着，没有催。
  _effects: state_add pc20-second-chance state:world-vienna-1912:632; flag +stopped_child_mistake; knowledge “那家店里的人不会替{child}签字，也不会替{child}坐牢。”; flag +second_chance_open_

- **1935.01** `state_reaction:bc18-bureaucratic-ghost/another-file-opened` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  Alois Lechner刚在一个窗口证明自己活着，另一个窗口又从抽屉里抽出一张死亡通知。两个办事员隔着走廊互相看了一眼，谁也没有先开口；Alois Lechner站在中间，忽然明白自己不是一个人，而是一份正在被转抄的卷宗。
  _effects: state_parameter bc18-bureaucratic-ghost.risk 42 -> 54; state_parameter bc18-bureaucratic-ghost.duplicates 2 -> 3; state_parameter bc18-bureaucratic-ghost.sightings 2 -> 3_
  _causes: evt:world-vienna-1912:007547_

- **1935.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner被叫到学校，老师说Elisabeth Lechner这学期总在课上看窗外。回家的路上，Alois Lechner没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 31 -> 26; state_parameter raising-child.caregiverBurden 57 -> 62; cash -2 (extra lessons and replacement pencils)_

- **1935.01** `state_tick:bc18-bureaucratic-ghost/paper-trail-year/kept-the-files-apart` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  这一年，Alois Lechner学会了同时带三张纸出门：一张证明活着，一张证明死了，一张证明自己从没搬过家。窗口后面的人各自只看自己那一张，偶尔还会夸Alois Lechner的材料齐全。年底，Alois Lechner从补发的配给里省下一小袋面粉，觉得自己像个熟练的走私犯。
  _effects: state_parameter bc18-bureaucratic-ghost.fileDepth 32 -> 36; state_parameter bc18-bureaucratic-ghost.risk 54 -> 49; cash 1 (省下的配给和车钱); mood 0.010000000000000009_

- **1935.01** `agency:organize_meeting` tags: agency, agency:organize_meeting
  Alois Lechner原定在Versammlungsraum der graphischen Arbeiter开会，但来的人不够，或者有人临时退缩；最后只留下几张没发完的纸条。
  _effects: mood -0.010000000000000009_

- **1935.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Ferdinand 2这周主动擦了黑板。Alois Lechner把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 45 -> 48; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:007823_

- **1935.05** `vienna-medical-treatment.toothache/barber-pull` tags: health, medical, family, money
  理发铺里还坐着等刮脸的老主顾，肥皂味和烟味混在一起。弗朗茨把围布往Alois Lechner胸前一系，说忍着点。钳子第一次滑脱，第二次才夹稳，牙出来时带着一小块肉，他用明矾水按住了。
  _effects: cash -1.2 (理发师拔牙收费); health 0.030000000000000027 (病牙被拔除但手法粗糙); mood -0.020000000000000018_

- **1935.10** `vienna-legacy-worklife.sick-fund/sick-fund.fill-form` tags: legacy, work, family, reform, ordinary_life, injury
  衙门走廊的地砖是黑白相间的，Alois Lechner站着站着就把重心从一只脚换到另一只脚。窗口里的办事员姓什么没人知道，只叫“三号窗”。表递进去时，里面说“等复核”，声音很平。
  _effects: health -0.030000000000000027 (在衙门走廊站了大半天); relation colleague with person-materialized-world-vienna-1912-12; skill; relation acquaintance with person-materialized-world-vienna-1912-56_

- **1935.10** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Elisabeth Lechner这周主动擦了黑板。Alois Lechner把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 26 -> 29; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:008117_

- **1936.01** `vienna-life-injury-recovery/clinic-treatment` tags: health, work, family
  Alois Lechner在受伤后的第三天去了诊所。医生清洗伤口、换药，收下诊费，嘱咐不要急着回机器旁。Alois Lechner把药方折好，回家路上买了纱布。
  _effects: health 0.050000000000000044 (wound treatment); cash -8 (clinic and bandages)_
  _causes: evt:world-vienna-1912:007311_

- **1936.01** `curse15-betrayal.signature::ctx-vienna-authoritarian-1934::milieu-tenement/the-files-went-first` tags: betrayal, office, power, politics, curse, institution, vienna, urban
  Ferdinand Lechner 2先把Alois Lechner抽屉里的往来信件搬空，再在会议上说Alois Lechner从来没有保存过记录。没有人能证明那些信存在过，除了Alois Lechner自己。散会后，有人让Alois Lechner回家休息几天，工资照发。Alois Lechner知道这不是照顾，是让Alois Lechner别再回来。
  _effects: reputation -0.06; relation rival with person-materialized-world-vienna-1912-24; knowledge “我经手的信件在会议前被人搬空了。”; condition; flag +records_removed; relation acquaintance with person-materialized-world-vienna-1912-24_

- **1936.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner把Ferdinand 2的旧课本包上书皮，又在本子上签了名。Ferdinand 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Alois Lechner听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 32 -> 40; state_parameter raising-child.caregiverBurden 38 -> 35; mood 0.020000000000000018_

- **1936.01** `state_expire:bc18-bureaucratic-ghost` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  Alois Lechner的「档案里的活鬼」到期；相关安排结束。
  _effects: state_remove bc18-bureaucratic-ghost state:world-vienna-1912:585; flag -bureaucratic_ghost_

- **1936.01** `state_tick:pc20-second-chance/kept-word/kept-word` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  Alois Lechner把答应过的事又做了一遍：按时出现，把欠下的小钱还掉，没有在旧话上添新的解释。对方没有鼓掌，只把杯子往Alois Lechner这边推了推；这一次的沉默比上次轻。
  _effects: state_parameter pc20-second-chance.credibility 50 -> 56; state_parameter pc20-second-chance.suspicion 35 -> 30; state_parameter pc20-second-chance.hope 60 -> 64; mood 0.020000000000000018_

- **1936.01** `agency:recruit_members` tags: agency, agency:recruit_members
  Alois Lechner试图招募Ferdinand Lechner 2，但对方担心工作和警察，没有给出承诺。
  _effects: mood -0.040000000000000036_

- **1936.07** `vienna-parish-aid.funeral-society/funeral-society.pay` tags: faith, parish, mutual_aid, poverty, family
  Alois Lechner数出八赫勒交给Otto Berg，看她在蓝皮本上找到自家门牌，把这一周的格子划掉。Otto Berg说上个月隔壁巷子的人走了，公账出了棺材和一场小弥撒，剩下的钱记在册尾。楼梯口的灯很暗，Alois Lechner盯着自己的名字看了两遍才转身。
  _effects: cash -0.4 (一周丧葬互助会会费); relation acquaintance with person-materialized-world-vienna-1912-20_

- **1936.11** `vienna-housing-move.rent-notice/rent-notice-neighbors-together` tags: housing, home, rent, family, money
  Alois Lechner把Ferdinand Bauer和楼里另两户人家叫到楼道，把那张纸摆在窗台上传看。看门人在楼梯拐角听着，说房东礼拜三来收钱。几家人合计好，到那天一起等在门厅，先把克朗递过去，再把修补的事一件件摆出来。Alois Lechner把纸折进围裙口袋，觉得人凑齐了话也硬气些。
  _effects: mood 0.040000000000000036; flag +tenant_collective_

- **1936.12** `vienna-tenement-neighbors.laundry_line_dispute/subject_yields_line` tags: home, social, family, housing
  Alois Lechner看Grete Stein 2盆里那几件小衬衫，把自家床单卷起来抱回屋，说等下午再晾。Grete Stein 2愣了一下，闷头把衣服挂好，收工回来时在Alois Lechner门口放了一小包用旧报纸裹的洗衣碱。Alois Lechner打开报纸，碱面里还掺着几粒粗盐。
  _effects: relation friend with person-materialized-world-vienna-1912-48; food_

- **1936.12** `vienna-social-movement.recruitment/report-to-official` tags: development, social_movement, organization, politics
  Alois Lechner把传单交给楼里的门房。门房没有接，只让Alois Lechner自己去找警察局。那天傍晚，两个穿便衣的人在街口站了很久。
  _effects: role; reputation 0.019999999999999997_

- **1937.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Ferdinand 2这周主动擦了黑板。Alois Lechner把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 40 -> 43; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:008661_

- **1937.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner被叫到学校，老师说Elisabeth Lechner这学期总在课上看窗外。回家的路上，Alois Lechner没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 29 -> 24; state_parameter raising-child.caregiverBurden 62 -> 67; cash -2 (extra lessons and replacement pencils); mood -0.030000000000000027_

- **1937.01** `state_tick:pc20-second-chance/kept-word/kept-word` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  Alois Lechner把答应过的事又做了一遍：按时出现，把欠下的小钱还掉，没有在旧话上添新的解释。对方没有鼓掌，只把杯子往Alois Lechner这边推了推；这一次的沉默比上次轻。
  _effects: state_parameter pc20-second-chance.credibility 56 -> 62; state_parameter pc20-second-chance.suspicion 30 -> 25; state_parameter pc20-second-chance.hope 64 -> 68; mood 0.020000000000000018_

- **1937.01** `agency:organize_meeting` tags: agency, agency:organize_meeting
  Alois Lechner原定在Versammlungsraum der graphischen Arbeiter开会，但来的人不够，或者有人临时退缩；最后只留下几张没发完的纸条。
  _effects: mood -0.040000000000000036_

- **1937.12** `state_reaction:pc20-second-chance/public-doubt` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  旧事被人在街上重新提起，Alois Lechner的名字和另一件事绑在一起。有人替Alois Lechner辩解，也有人只笑了一声；Alois Lechner回家后把当天的收据一张张摊开，像在给自己准备证词。
  _effects: state_parameter pc20-second-chance.suspicion 25 -> 33; state_parameter pc20-second-chance.credibility 62 -> 58; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:008984_

- **1938.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner把Ferdinand 2的旧课本包上书皮，又在本子上签了名。Ferdinand 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Alois Lechner听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 43 -> 51; state_parameter raising-child.caregiverBurden 35 -> 32; mood 0.020000000000000018_

- **1938.01** `state_tick:pc20-second-chance/kept-word/kept-word` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  Alois Lechner把答应过的事又做了一遍：按时出现，把欠下的小钱还掉，没有在旧话上添新的解释。对方没有鼓掌，只把杯子往Alois Lechner这边推了推；这一次的沉默比上次轻。
  _effects: state_parameter pc20-second-chance.credibility 58 -> 64; state_parameter pc20-second-chance.suspicion 33 -> 28; state_parameter pc20-second-chance.hope 68 -> 72; mood 0.020000000000000018_

- **1938.01** `agency:organize_meeting` tags: agency, agency:organize_meeting
  Alois Lechner在Leopoldstädter Zinshaus, gemeinsamer Gang召集了一次小范围会议，和Anton Kral把下一次行动、会费和分工写在纸上。
  _effects: project; historical development:initiative-taxi:person-materialized-world-vienna-1912-37-evt:world-vienna-1912:003231-1932 as organizer; historical_influence; knowledge “我召集了一次关于第二区夜班出租合作社在Leopoldstädter Zinshaus, geme的会议。”; relation colleague with person-materialized-world-vienna-1912-37; reputation 0.02_

- **1938.02** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Luise Bauer这周主动擦了黑板。Alois Lechner把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 20 -> 23; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:009241_

- **1938.02** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Elisabeth Lechner这周主动擦了黑板。Alois Lechner把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 24 -> 27; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:009245_

- **1938.02** `eh19-bridge.question-arrives::ctx-vienna-authoritarian-1934::milieu-tenement/fill-the-form` tags: elderhood, testimony, history, memory, bureaucracy, ordinary, vienna, urban
  区里寄来一张问话单，只有一页，问的是一九三四年住过这条街的人。Alois Lechner把老花镜从抽屉里找出来，先写自己的名字，再写“记得不清楚”；写到第三个问题，笔尖在纸上停住，窗外有人在收晾衣绳。
  _effects: state_add eh19-late-testimony state:world-vienna-1912:830; knowledge “区里在核对一九三四年住过这条街的人。”; flag +late_testimony_questionnaire; mood -0.020000000000000018; flag +late_testimony_active_

- **1938.02** `state_reaction:eh19-late-testimony/official-return` tags: eh19-late-testimony, elderhood, testimony, memory, history, politics, legal, risk
  法院的人又来了，这次带着上一回的笔录。Alois Lechner看见自己的句子被打印成另一种语气，旁边还留着书记员画的一个问号；对方说只改一处，改完就可以回家。
  _effects: state_parameter eh19-late-testimony.pressure 30 -> 38; state_parameter eh19-late-testimony.danger 15 -> 20; mood -0.030000000000000027_
  _causes: evt:world-vienna-1912:009547_

- **1938.08** `em18-late-bloom.shop-sign::ctx-vienna-authoritarian-1934::milieu-tenement/the-cooperative-shop` tags: elderhood, late_life, shop, craft, work, reinvention, neighborhood, vienna
  Grete Lechner提议合租门面：Alois Lechner修旧家具，Grete Lechner修钟表，房租对半。Alois Lechner把工具摆到靠窗的一边，又在墙上钉了一排钩子；Grete Lechner说这样像从前师傅的作坊，Alois Lechner说先别急着像。
  _effects: state_add em18-late-bloom state:world-vienna-1912:831; cash -1 (half of the first month's rent); relation colleague with person-materialized-world-vienna-1912-62; flag +shop_shared; mood 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-62; flag +late_bloom_active_

- **1938.09** `p21-elder-testimony::ctx-vienna-authoritarian-1934::milieu-tenement/the-name-is-restored` tags: elderhood, testimony, death, family_secret, history, court, public, suspicious_death
  Alois Kral 2把那份旧证词从档案袋里抽出来，放在窗边的桌上。Alois Lechner用蓝铅笔改了三处，把死者的名字从“无名”改回“卡尔·魏斯”；Franz Lechner在旁边把每一页按顺序排好，Emil Weiss站在门口，手里的帽子一直没有戴上。签完字时，窗外正好有人敲响下午四点的钟。
  _effects: state_remove eh19-late-testimony state:world-vienna-1912:830; state_add p21-fortune-reversal state:world-vienna-1912:832; relation kin with person-franz-lechner; reputation 0.05; flag +dead_name_restored; knowledge “蓝铅笔改了三处，死者的名字从“无名”改回“卡尔·魏斯”。”; cash 2 (the court refunded part of the costs); mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-60; flag -late_testimony_active; flag +fortune_reversal_active_

- **1938.09** `state_reaction:raising-child/child-death-in-the-household` tags: raising-child, family, child, care, school, household, state, state_reaction
  孩子的名字从学校的名册上被划掉以后，家里的碗还多摆了一副。Alois Lechner没有把它收起来，直到有一天发现碗沿积了灰，才拿去洗。
  _effects: state_parameter raising-child.childConfidence 73 -> 43; state_parameter raising-child.caregiverBurden 32 -> 47; mood -0.09000000000000008_
  _causes: evt:world-vienna-1912:009550_

- **1938.09** `state_reaction:raising-child/child-death-in-the-household` tags: raising-child, family, child, care, school, household, state, state_reaction
  孩子的名字从学校的名册上被划掉以后，家里的碗还多摆了一副。Alois Lechner没有把它收起来，直到有一天发现碗沿积了灰，才拿去洗。
  _effects: state_parameter raising-child.childConfidence 25 -> 0; state_parameter raising-child.caregiverBurden 67 -> 82_
  _causes: evt:world-vienna-1912:009550_

- **1938.09** `state_reaction:raising-child/child-death-in-the-household` tags: raising-child, family, child, care, school, household, state, state_reaction
  孩子的名字从学校的名册上被划掉以后，家里的碗还多摆了一副。Alois Lechner没有把它收起来，直到有一天发现碗沿积了灰，才拿去洗。
  _effects: state_parameter raising-child.childConfidence 55 -> 25; state_parameter raising-child.caregiverBurden 45 -> 60_
  _causes: evt:world-vienna-1912:009550_

- **1938.09** `state_reaction:em18-late-bloom/public-eyes` tags: em18-late-bloom, elderhood, late_life, reinvention, love, work, legacy, risk
  有人在报纸的社交栏里看见Alois Lechner的名字，连旧住址都写对了。第二天，杂货店老板多问了一句，Alois Lechner笑着把话岔开；回家后，Alois Lechner把窗帘拉上，又打开。
  _effects: state_parameter em18-late-bloom.publicness 30 -> 36; reputation 0.02_
  _causes: evt:world-vienna-1912:009550_

- **1938.12** `kernel-health.chronic-pain::ctx-vienna-authoritarian-1934::milieu-tenement/pain-morphine-drops` tags: health, pain, elderhood, morphine, household, vienna, urban, crisis
  膝盖里的旧伤一到阴天就发作。Alois Lechner从药房买吗啡滴剂，先是十滴，后来半瓶；Grete Stein发现Alois Lechner把空瓶藏在花盆后面，数了数，一共十九只。滴管刻度磨得看不清，他把《圣经》挖空，藏了半瓶。瓶底沉着褐色药渣。
  _effects: cash -12 (morphine drops bought without a fresh prescription); health -0.020000000000000018 (chronic knee pain and increasing morphine use); condition; role; relation acquaintance with person-grete-stein; knowledge “吗啡滴剂越用越多，空瓶可以藏在花盆后面；药房不会每次都问处方。”_

- **1939.01** `project_progressed` tags: project
  「Alois Lechner召集的会议」继续推进了一阶段。
  _effects: project_

- **1939.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner被叫到学校，老师说Elisabeth Lechner这学期总在课上看窗外。回家的路上，Alois Lechner没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 27 -> 22; state_parameter raising-child.caregiverBurden 82 -> 87; cash -2 (extra lessons and replacement pencils)_

- **1939.01** `state_expire:pc20-second-chance` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  Alois Lechner的「第二次机会」到期；相关安排结束。
  _effects: state_remove pc20-second-chance state:world-vienna-1912:632; flag -second_chance_open_

- **1939.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner被叫到学校，老师说Luise Bauer这学期总在课上看窗外。回家的路上，Alois Lechner没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 23 -> 18; state_parameter raising-child.caregiverBurden 60 -> 65; cash -2 (extra lessons and replacement pencils)_

- **1939.01** `state_tick:em18-late-bloom/late-life-year/family-pressure` tags: em18-late-bloom, elderhood, late_life, reinvention, love, work, legacy, risk
  成年子女来了一趟，把账本翻到最后一页，说这年纪不该再折腾。Alois Lechner没有争，只把钥匙从桌上收进围裙口袋；那天晚上，新生活仍按原计划继续，只是没有再提。
  _effects: state_parameter em18-late-bloom.tether 45 -> 53; state_parameter em18-late-bloom.nerve 45 -> 41_

- **1939.01** `state_tick:p21-fortune-reversal/the-crowd-recounts/the-scaffold-shakes` tags: p21-fortune-reversal, fortune_reversal, fortune, reversal, inheritance, ruin, public, witnesses
  一笔该到的钱没有到。Alois Lechner在账房里坐到天黑，听见隔壁把算盘珠子拨得很快；回家时，门口已经有人等着，手里拿着一份折过三次的账单。
  _effects: state_parameter p21-fortune-reversal.height 60 -> 52; state_parameter p21-fortune-reversal.fragility 50 -> 58; state_parameter p21-fortune-reversal.debt 10 -> 15; reputation -0.02; flag +fortune_scaffold_shook_

- **1939.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Ferdinand 2这周主动擦了黑板。Alois Lechner把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 20 -> 23; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:010102_

- **1939.07** `em18-late-bloom.shop-sign::ctx-vienna-authoritarian-1934::milieu-tenement/the-lease-is-refused` tags: elderhood, late_life, shop, craft, work, reinvention, neighborhood, vienna
  房东把Alois Lechner的押金推回来，说这年纪要有担保人，还要一次付清半年房租。Alois Lechner在门口站了一会儿，把写好的招牌尺寸纸折起来；回家路上，Alois Lechner经过那扇空门面，里面已经挂上了成衣铺的布帘。
  _effects: cash -1 (the deposit was returned after a day); flag +lease_refused; knowledge “房东要求半年房租一次付清，才肯把空门面租给六十岁以上的人。”; relation acquaintance with person-materialized-world-vienna-1912-36_

- **1939.09** `state_reaction:ml18-sudden-fortune/a-relative-remembers` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  一个多年没走动的亲戚提着一盒点心上门，先问Alois Lechner的身体，再问那笔钱是怎么来的。临走时他说起小时候替Alois Lechner家垫过一冬天的煤钱，数字记不清了，但意思很清楚。
  _effects: state_parameter ml18-sudden-fortune.claims 2 -> 3; flag +windfall_claim_by_relative_
  _causes: evt:world-vienna-1912:010171_

- **1939.12** `eh19-bridge.question-arrives::ctx-vienna-authoritarian-1934::milieu-tenement/fill-the-form` tags: elderhood, testimony, history, memory, bureaucracy, ordinary, vienna, urban
  区里寄来一张问话单，只有一页，问的是一九三四年住过这条街的人。Alois Lechner把老花镜从抽屉里找出来，先写自己的名字，再写“记得不清楚”；写到第三个问题，笔尖在纸上停住，窗外有人在收晾衣绳。
  _effects: state_add eh19-late-testimony state:world-vienna-1912:897; knowledge “区里在核对一九三四年住过这条街的人。”; flag +late_testimony_active_

- **1939.12** `state_reaction:eh19-late-testimony/official-return` tags: eh19-late-testimony, elderhood, testimony, memory, history, politics, legal, risk
  法院的人又来了，这次带着上一回的笔录。Alois Lechner看见自己的句子被打印成另一种语气，旁边还留着书记员画的一个问号；对方说只改一处，改完就可以回家。
  _effects: state_parameter eh19-late-testimony.pressure 30 -> 38; state_parameter eh19-late-testimony.danger 15 -> 20_
  _causes: evt:world-vienna-1912:010143_

- **1940.01** `project_completed` tags: project
  「Alois Lechner召集的会议」完成了当前阶段，参与者留下了实际的记录和后续安排。
  _effects: project_

- **1940.01** `em18-late-bloom.courting-family::ctx-vienna-authoritarian-1934::milieu-union/the-child-threatens-the-will` tags: elderhood, late_life, love, family, inheritance, conflict, cohabitation, vienna
  Franz Lechner把一份旧遗嘱的抄件放在桌上，说如果Emil Stein搬进来，房子就该先写清楚归谁。Alois Lechner没有去看那张纸，只问Franz Lechner还记不记得小时候是谁在夜里背着去医院；Franz Lechner说记得，但那是两回事。
  _effects: state_parameter em18-late-bloom.tether 53 -> 68; state_parameter em18-late-bloom.nerve 41 -> 33; relation kin with person-franz-lechner; relation friend with person-materialized-world-vienna-1912-95; flag +inheritance_threat; knowledge “成年子女把旧遗嘱抄件放在桌上，要求先写清楚房子归谁。”; mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-95_

- **1940.01** `state_reaction:em18-late-bloom/a-death-in-the-household` tags: em18-late-bloom, elderhood, late_life, reinvention, love, work, legacy, risk
  家里少了一个人以后，Alois Lechner把新生活里最花钱的那一项划掉了。不是因为不想，而是因为账单、葬礼和空出来的房间都需要有人管；Alois Lechner把划掉的那一行又抄到另一张纸上。
  _effects: state_parameter em18-late-bloom.tether 68 -> 78; state_parameter em18-late-bloom.stamina 50 -> 46_
  _causes: evt:world-vienna-1912:010155_

- **1940.01** `state_reaction:p21-fortune-reversal/a-scandal-shrinks-the-height` tags: p21-fortune-reversal, fortune_reversal, fortune, reversal, inheritance, ruin, public, witnesses
  丑闻传来时，Alois Lechner正在清点新到的家具。第二天，送货的人问要不要把东西先拉回去；Alois Lechner说不用，但把最贵的那只箱子挪到了里屋。
  _effects: state_parameter p21-fortune-reversal.height 52 -> 46; state_parameter p21-fortune-reversal.witnesses 70 -> 75; state_parameter p21-fortune-reversal.fragility 58 -> 64_
  _causes: evt:world-vienna-1912:010239_

- **1940.01** `state_reaction:ml18-sudden-fortune/the-papers-hear-about-it` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  报纸的社会版把Alois Lechner家的门牌号和那笔钱的数目印在一起，标题是“一笔不该有的好运”。第二天门口多了两个陌生人，一个说是远亲，一个说代表一家孤儿院。
  _effects: state_parameter ml18-sudden-fortune.public true -> true; state_parameter ml18-sudden-fortune.claims 3 -> 5; reputation -0.02; flag +windfall_went_public_
  _causes: evt:world-vienna-1912:010239_

- **1940.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner把Ferdinand 2的旧课本包上书皮，又在本子上签了名。Ferdinand 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Alois Lechner听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 20 -> 28; state_parameter raising-child.caregiverBurden 45 -> 42; mood 0.020000000000000018_

- **1940.01** `state_tick:em18-late-bloom/late-life-year/takes-root` tags: em18-late-bloom, elderhood, late_life, reinvention, love, work, legacy, risk
  又一年过去，Alois Lechner把新生活的开销记在一本旧账簿背面：房租、药、车票，还有一件为公开场合买的衬衫。事情没有变轻，但Alois Lechner已经知道每周哪几天有力气，哪几天只适合坐在窗边。
  _effects: state_parameter em18-late-bloom.nerve 33 -> 37; state_parameter em18-late-bloom.stamina 46 -> 43; state_parameter em18-late-bloom.tether 78 -> 76; cash 1 (small receipts from the new work); mood 0.020000000000000018_

- **1940.01** `state_tick:p21-fortune-reversal/the-crowd-recounts/the-scaffold-shakes` tags: p21-fortune-reversal, fortune_reversal, fortune, reversal, inheritance, ruin, public, witnesses
  一笔该到的钱没有到。Alois Lechner在账房里坐到天黑，听见隔壁把算盘珠子拨得很快；回家时，门口已经有人等着，手里拿着一份折过三次的账单。
  _effects: state_parameter p21-fortune-reversal.height 46 -> 38; state_parameter p21-fortune-reversal.fragility 64 -> 72; state_parameter p21-fortune-reversal.debt 15 -> 20; reputation -0.02_

- **1940.01** `state_tick:eh19-late-testimony/version-drift/rehearsed` tags: eh19-late-testimony, elderhood, testimony, memory, history, politics, legal, risk
  又过了半年，Alois Lechner把证词在心里走了一遍。顺序还在，但每讲一次，旁边就多出一点别人补上的颜色；Alois Lechner把最重要的日期写在火柴盒背面，睡前又看了一次。
  _effects: state_parameter eh19-late-testimony.memory 55 -> 58; state_parameter eh19-late-testimony.truth 45 -> 43; state_parameter eh19-late-testimony.pressure 38 -> 40; mood 0.010000000000000009_

- **1940.01** `state_tick:ml18-sudden-fortune/fortune-year/money-keeps-working` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  一年过去，钱没有变多，却也没有一下花完。Alois Lechner把一部分存进邮局储蓄所，一部分借给楼下的鞋匠；鞋匠每月送来一双补好的鞋，利息就夹在鞋垫下面。街口的杂货商开始把好面粉留到Alois Lechner来的时候。
  _effects: cash 2 (interest and small repayments on the windfall); state_parameter ml18-sudden-fortune.claims 5 -> 6; mood 0.010000000000000009_

- **1940.01** `agency:recruit_members` tags: agency, agency:recruit_members
  Alois Lechner试图招募Ferdinand Lechner 2，但对方担心工作和警察，没有给出承诺。
  _effects: mood -0.040000000000000036_

- **1940.02** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Elisabeth Lechner这周主动擦了黑板。Alois Lechner把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 22 -> 25; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:010972_

- **1940.02** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Luise Bauer这周主动擦了黑板。Alois Lechner把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 18 -> 21; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:010972_

- **1940.05** `p9-gap-elder-solitude.pill-box/pill-box-low-supply` tags: elderhood, daily, solitude, memory, home, medicine, health
  她发现有一种药只剩三片，格子空了一半。想了想把药瓶放回抽屉，决定明天先去药房问能不能少买一点、赊到月底，摸出小本子把瓶上的名字和价钱抄下来。
  _effects: flag +pharmacy_short_supply_

- **1940.11** `vienna-elder-care.union-office/paperwork-blocked` tags: elderhood, health, family, social
  Friedrich Berg用指节敲了敲表格上的空格，说这一栏空着不能办。Alois Lechner攥着表格站在长凳旁，后面排队的人绕过他。
  _effects: mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-29; cash -1 (往返电车票)_

- **1941.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner把Elisabeth Lechner的旧课本包上书皮，又在本子上签了名。Elisabeth Lechner今年学会了自己系鞋带，也学会了在饭桌上说“不”；Alois Lechner听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 25 -> 33; state_parameter raising-child.caregiverBurden 87 -> 84; mood 0.020000000000000018_

- **1941.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner把Luise Bauer的旧课本包上书皮，又在本子上签了名。Luise Bauer今年学会了自己系鞋带，也学会了在饭桌上说“不”；Alois Lechner听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 21 -> 29; state_parameter raising-child.caregiverBurden 65 -> 62; mood 0.020000000000000018_

- **1941.01** `state_tick:em18-late-bloom/late-life-year/body-interrupts` tags: em18-late-bloom, elderhood, late_life, reinvention, love, work, legacy, risk
  入冬后，Alois Lechner在楼梯上停了三次。医生把“减少劳累”写在纸条上，Alois Lechner把它折好，放进装车票的口袋；第二天仍去开门，只是把营业时间改短了一小时。
  _effects: state_parameter em18-late-bloom.stamina 43 -> 35; health -0.030000000000000027 (the body is interrupting the new life); state_parameter em18-late-bloom.tether 76 -> 81; mood -0.030000000000000027_

- **1941.01** `state_tick:p21-fortune-reversal/the-crowd-recounts/the-scaffold-shakes` tags: p21-fortune-reversal, fortune_reversal, fortune, reversal, inheritance, ruin, public, witnesses
  一笔该到的钱没有到。Alois Lechner在账房里坐到天黑，听见隔壁把算盘珠子拨得很快；回家时，门口已经有人等着，手里拿着一份折过三次的账单。
  _effects: state_parameter p21-fortune-reversal.height 38 -> 30; state_parameter p21-fortune-reversal.fragility 72 -> 80; state_parameter p21-fortune-reversal.debt 20 -> 25; reputation -0.02_

- **1941.01** `state_tick:eh19-late-testimony/version-drift/rehearsed` tags: eh19-late-testimony, elderhood, testimony, memory, history, politics, legal, risk
  又过了半年，Alois Lechner把证词在心里走了一遍。顺序还在，但每讲一次，旁边就多出一点别人补上的颜色；Alois Lechner把最重要的日期写在火柴盒背面，睡前又看了一次。
  _effects: state_parameter eh19-late-testimony.memory 58 -> 61; state_parameter eh19-late-testimony.truth 43 -> 41; state_parameter eh19-late-testimony.pressure 40 -> 42; mood 0.010000000000000009_

- **1941.01** `state_tick:ml18-sudden-fortune/fortune-year/money-keeps-working` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  一年过去，钱没有变多，却也没有一下花完。Alois Lechner把一部分存进邮局储蓄所，一部分借给楼下的鞋匠；鞋匠每月送来一双补好的鞋，利息就夹在鞋垫下面。街口的杂货商开始把好面粉留到Alois Lechner来的时候。
  _effects: cash 2 (interest and small repayments on the windfall); state_parameter ml18-sudden-fortune.claims 6 -> 7; mood 0.010000000000000009_

- **1941.01** `agency:organize_meeting` tags: agency, agency:organize_meeting
  Alois Lechner在Versammlungsraum der graphischen Arbeiter召集了一次小范围会议，和Grete Stein把下一次行动、会费和分工写在纸上。
  _effects: project; historical development:initiative-org-printers-union-1934 as organizer; historical_influence; knowledge “我召集了一次关于Freie Gewerkschaft der graphischen Arbei的会议。”; relation colleague with person-grete-stein; reputation 0.02_

- **1941.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Ferdinand 2这周主动擦了黑板。Alois Lechner把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 28 -> 31; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:011247_

- **1941.01** `p9-gap-elderhood-daily.pension-window/p9-gap-elderhood-daily.pension-window.missing-page` tags: elderhood, daily, pension, housing, care, bureaucracy, cash
  Berta Hofer 2在窗口里翻到第三遍，说Alois Lechner的工资册缺了一页，缺的那年工龄对不上，这个月只能先按低档发。窗口递出来一张纸条，要她下周带着原雇主或见证人的证明再来；Mitzi Hofer 2凑近看了一眼，说自己在同一家厂干过，可以替她说话。
  _effects: cash 4 (按低档先发的当月养老金); flag +pension_gap_pending; relation acquaintance with person-materialized-world-vienna-1912-92_

- **1941.04** `vienna-elder-bereavement.old-colleague-funeral/old-colleague-funeral.stay-home` tags: elderhood, bereavement, family, health, memory, housing
  炉子里的煤烧得不匀，Alois Lechner蹲下去用铁钩捅了两下，烟从缝里冒出来。Rosa Lechner 2走的时候，手里那束花用旧报纸裹着，只露出一点白。
  _effects: cash -0.5 (托人买的一束花); food; mood -0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-12_

- **1941.06** `vienna-elder-care.winter-stairs/fall-on-stairs` tags: elderhood, health, family, social, injury
  Alois Moser听见闷响从窗户探头，看见Alois Lechner坐在冰上按着手腕。面包被踩进泥雪，Alois Moser跑下来捡起篮子。
  _effects: health -0.12 (楼梯滑倒手腕扭伤); cash -4 (请接骨师包扎); relation acquaintance with person-materialized-world-vienna-1912-18; food_

- **1942.01** `project_progressed` tags: project
  「Alois Lechner召集的会议」继续推进了一阶段。
  _effects: project_

- **1942.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner被叫到学校，老师说Ferdinand 2这学期总在课上看窗外。回家的路上，Alois Lechner没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 31 -> 26; state_parameter raising-child.caregiverBurden 42 -> 47; cash -2 (extra lessons and replacement pencils); mood -0.030000000000000027_

- **1942.01** `state_tick:em18-late-bloom/late-life-year/family-pressure` tags: em18-late-bloom, elderhood, late_life, reinvention, love, work, legacy, risk
  成年子女来了一趟，把账本翻到最后一页，说这年纪不该再折腾。Alois Lechner没有争，只把钥匙从桌上收进围裙口袋；那天晚上，新生活仍按原计划继续，只是没有再提。
  _effects: state_parameter em18-late-bloom.tether 81 -> 89; state_parameter em18-late-bloom.nerve 37 -> 33; mood -0.020000000000000018_

- **1942.01** `state_expire:p21-fortune-reversal` tags: p21-fortune-reversal, fortune_reversal, fortune, reversal, inheritance, ruin, public, witnesses
  Alois Lechner的「骤起骤落」到期；相关安排结束。
  _effects: state_remove p21-fortune-reversal state:world-vienna-1912:832; flag -fortune_reversal_active_

- **1942.01** `state_tick:eh19-late-testimony/version-drift/someone-coaches` tags: eh19-late-testimony, elderhood, testimony, memory, history, politics, legal, risk
  一个自称旧同事的人来家里，把一页写好的说法留在桌上，说这样对大家都好。Alois Lechner没有答应，也没有把纸扔掉；夜里，那张纸压在茶杯底下，边角被水汽卷了起来。
  _effects: state_parameter eh19-late-testimony.pressure 42 -> 50; state_parameter eh19-late-testimony.truth 41 -> 35; knowledge “有人希望我把日期说成一九三八年，而不是一九三四年。”; mood -0.020000000000000018_

- **1942.01** `state_expire:ml18-sudden-fortune` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  Alois Lechner的「一笔突然到手的钱」到期；相关安排结束。
  _effects: state_remove ml18-sudden-fortune state:world-vienna-1912:904_

- **1942.01** `agency:organize_meeting` tags: agency, agency:organize_meeting
  Alois Lechner在Leopoldstädter Zinshaus, gemeinsamer Gang召集了一次小范围会议，和Anton Kral把下一次行动、会费和分工写在纸上。
  _effects: project; historical development:initiative-taxi:person-materialized-world-vienna-1912-37-evt:world-vienna-1912:003231-1932 as organizer; historical_influence; knowledge “我召集了一次关于第二区夜班出租合作社在Leopoldstädter Zinshaus, geme的会议。”; relation colleague with person-materialized-world-vienna-1912-37; reputation 0.02_

- **1942.02** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Luise Bauer这周主动擦了黑板。Alois Lechner把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 29 -> 32; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:011555_

- **1942.07** `sm18-legend.well-light::ctx-vienna-authoritarian-1934::milieu-tenement/tells-the-children` tags: legend, well, light, neighborhood, uncanny, unresolved, vienna, urban
  Alois Lechner把井口的故事讲给巷子里的孩子听，说白灯是洗衣妇的衬裙，也说是一个等不到人的新娘。孩子们第二天就去看，回来时每人手里都拿着一块玻璃。Hermann Moser 2在门口摇头，说这条巷子又多了一个版本。
  _effects: reputation 0.03; mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-42; condition; flag +told_the_well_legend_

- **1942.08** `em18-late-bloom.rent-increase::ctx-vienna-authoritarian-1934::milieu-union/shares-with-the-neighbor` tags: elderhood, late_life, housing, rent, shop, money, risk, vienna
  Otto Berg 2提出把两家铺子中间的墙打通，合用一盏灯和一台暖炉。Alois Lechner起初嫌吵，后来发现客人等修鞋时会顺手看家具；月底分账，Alois Lechner第一次在账本上画了一条向上的线。
  _effects: cash -1 (the shared lamp and stove); state_parameter em18-late-bloom.tether 89 -> 94; state_parameter em18-late-bloom.publicness 42 -> 47; relation friend with person-materialized-world-vienna-1912-100; mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-100_

- **1943.01** `project_completed` tags: project
  「Alois Lechner召集的会议」完成了当前阶段，参与者留下了实际的记录和后续安排。
  _effects: project_

- **1943.01** `project_progressed` tags: project
  「Alois Lechner召集的会议」继续推进了一阶段。
  _effects: project_

- **1943.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Ferdinand 2这周主动擦了黑板。Alois Lechner把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 26 -> 29; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:011882_

- **1943.01** `p21-elder-testimony::ctx-vienna-authoritarian-1934::milieu-tenement/the-name-is-restored` tags: elderhood, testimony, death, family_secret, history, court, public, suspicious_death
  Anton Kral把那份旧证词从档案袋里抽出来，放在窗边的桌上。Alois Lechner用蓝铅笔改了三处，把死者的名字从“无名”改回“卡尔·魏斯”；Mitzi在旁边把每一页按顺序排好，Katharina Lechner站在门口，手里的帽子一直没有戴上。签完字时，窗外正好有人敲响下午四点的钟。
  _effects: state_remove eh19-late-testimony state:world-vienna-1912:897; state_add p21-fortune-reversal state:world-vienna-1912:1045; reputation 0.05; knowledge “蓝铅笔改了三处，死者的名字从“无名”改回“卡尔·魏斯”。”; cash 2 (the court refunded part of the costs); mood 0.030000000000000027; flag -late_testimony_active; flag +fortune_reversal_active_

- **1943.01** `state_reaction:em18-late-bloom/public-eyes` tags: em18-late-bloom, elderhood, late_life, reinvention, love, work, legacy, risk
  有人在报纸的社交栏里看见Alois Lechner的名字，连旧住址都写对了。第二天，杂货店老板多问了一句，Alois Lechner笑着把话岔开；回家后，Alois Lechner把窗帘拉上，又打开。
  _effects: state_parameter em18-late-bloom.publicness 36 -> 42; reputation 0.020000000000000004; mood -0.010000000000000009_
  _causes: evt:world-vienna-1912:011891_

- **1943.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner把Elisabeth Lechner的旧课本包上书皮，又在本子上签了名。Elisabeth Lechner今年学会了自己系鞋带，也学会了在饭桌上说“不”；Alois Lechner听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 33 -> 41; state_parameter raising-child.caregiverBurden 84 -> 81; mood 0.020000000000000018_

- **1943.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner把Luise Bauer的旧课本包上书皮，又在本子上签了名。Luise Bauer今年学会了自己系鞋带，也学会了在饭桌上说“不”；Alois Lechner听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 32 -> 40; state_parameter raising-child.caregiverBurden 62 -> 59; mood 0.020000000000000018_

- **1943.01** `state_tick:em18-late-bloom/late-life-year/takes-root` tags: em18-late-bloom, elderhood, late_life, reinvention, love, work, legacy, risk
  又一年过去，Alois Lechner把新生活的开销记在一本旧账簿背面：房租、药、车票，还有一件为公开场合买的衬衫。事情没有变轻，但Alois Lechner已经知道每周哪几天有力气，哪几天只适合坐在窗边。
  _effects: state_parameter em18-late-bloom.nerve 33 -> 37; state_parameter em18-late-bloom.stamina 35 -> 32; state_parameter em18-late-bloom.tether 94 -> 92; cash 1 (small receipts from the new work); mood 0.020000000000000018_

- **1943.01** `p9-gap-elderhood-care.pension-appeal/pension-appeal-refused` tags: elderhood, care, pension, housing, task, task:daily
  Berta Hofer 2说那一页工龄没有厂里盖章，无法证明，补发办不了。Alois Lechner把工资册收回布袋，下楼时在拐角歇了一回。回家后Josef Lechner 4帮她把册子又翻了一遍，在一张旧工资条背面找到铅笔写的年份，两人对着灯看了半天。
  _effects: mood -0.07999999999999996; relation acquaintance with person-materialized-world-vienna-1912-105; relation acquaintance with person-materialized-world-vienna-1912-105_

- **1943.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Elisabeth Lechner这周主动擦了黑板。Alois Lechner把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 41 -> 44; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:012470_

- **1943.04** `p21-elder-testimony::ctx-vienna-authoritarian-1934::milieu-tenement/the-name-is-restored` tags: elderhood, testimony, death, family_secret, history, court, public, suspicious_death
  Friedrich Berg把那份旧证词从档案袋里抽出来，放在窗边的桌上。Alois Lechner用蓝铅笔改了三处，把死者的名字从“无名”改回“卡尔·魏斯”；Franz Lechner在旁边把每一页按顺序排好，Anton Lechner站在门口，手里的帽子一直没有戴上。签完字时，窗外正好有人敲响下午四点的钟。
  _effects: state_remove eh19-late-testimony state:world-vienna-1912:1116; state_add p21-fortune-reversal state:world-vienna-1912:1117; relation kin with person-franz-lechner; reputation 0.05; knowledge “蓝铅笔改了三处，死者的名字从“无名”改回“卡尔·魏斯”。”; cash 2 (the court refunded part of the costs); mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-125; flag -late_testimony_active; flag -fortune_reversal_active; flag +fortune_reversal_active_

- **1943.06** `sm18-coincidence.photograph::ctx-vienna-authoritarian-1934::milieu-tenement/the-face-is-your-own` tags: coincidence, photograph, memory, elder, uncanny, unresolved, vienna, urban
  Alois Lechner在旧相册里翻到一张一九一二年的合影，最后一排站着一个和Alois Lechner年轻时一模一样的女人。照片背面只写着“四月，普拉特”。Grete Stein看了很久，说那个人也许是Alois Lechner的姑妈，可Alois Lechner记得姑妈那年还在乡下。
  _effects: mood -0.030000000000000027; knowledge “旧照片里有一个和本人年轻时一模一样的女人，背面写着“四月，普拉特””; relation acquaintance with person-grete-stein; flag +found_a_double_in_the_old_photograph_

- **1943.09** `eh19-bridge.question-arrives::ctx-vienna-authoritarian-1934::milieu-union/put-it-in-the-box` tags: elderhood, testimony, history, memory, bureaucracy, ordinary, vienna, urban
  Alois Lechner把问话单折成四折，塞进装旧证件的铁盒。盒子已经满了，她挑出一张一九三八年的配给证放在上面，又放回去；第二天，区里又寄来一张，同样的纸，同样的第三个问题。
  _effects: state_add eh19-late-testimony state:world-vienna-1912:1116; knowledge “区里第二次寄来同样的问题，说明他们还在查。”; flag +late_testimony_second_letter; mood -0.030000000000000027; flag +late_testimony_active_

- **1943.09** `kernel-health.chronic-pain::ctx-vienna-authoritarian-1934::milieu-tenement/pain-managed-at-home` tags: health, pain, elderhood, morphine, household, vienna, urban, crisis
  Alois Lechner把楼梯改成一步一步上，买菜只走平路，疼得厉害就坐下来揉。Berta Kral替Alois Lechner把煤筐拎上楼，换来一碗汤和一张旧报纸；两个人谁也没提医院。邻居把空筐靠在门边，顺手把楼梯上的冰敲掉。
  _effects: cash -4 (a cane, a hot-water bottle and tram fares to the market); health -0.010000000000000009 (chronic pain managed by rest and warmth); condition; role; relation acquaintance with person:evt:world-vienna-1912:002840:child; knowledge “膝盖疼的时候走平路、分几步上楼、用热水袋，比去医院的排队更管用。”_

- **1944.01** `project_completed` tags: project
  「Alois Lechner召集的会议」完成了当前阶段，参与者留下了实际的记录和后续安排。
  _effects: project_

- **1944.01** `state_reaction:p21-fortune-reversal/a-scandal-shrinks-the-height` tags: p21-fortune-reversal, fortune_reversal, fortune, reversal, inheritance, ruin, public, witnesses
  丑闻传来时，Alois Lechner正在清点新到的家具。第二天，送货的人问要不要把东西先拉回去；Alois Lechner说不用，但把最贵的那只箱子挪到了里屋。
  _effects: state_parameter p21-fortune-reversal.height 60 -> 54; state_parameter p21-fortune-reversal.witnesses 70 -> 75; state_parameter p21-fortune-reversal.fragility 50 -> 56; mood -0.030000000000000027_
  _causes: evt:world-vienna-1912:012560_

- **1944.01** `state_tick:p21-fortune-reversal/the-crowd-recounts/the-scaffold-shakes` tags: p21-fortune-reversal, fortune_reversal, fortune, reversal, inheritance, ruin, public, witnesses
  一笔该到的钱没有到。Alois Lechner在账房里坐到天黑，听见隔壁把算盘珠子拨得很快；回家时，门口已经有人等着，手里拿着一份折过三次的账单。
  _effects: state_parameter p21-fortune-reversal.height 54 -> 46; state_parameter p21-fortune-reversal.fragility 56 -> 64; state_parameter p21-fortune-reversal.debt 10 -> 15; reputation -0.01999999999999999_

- **1944.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner把Ferdinand 2的旧课本包上书皮，又在本子上签了名。Ferdinand 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Alois Lechner听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 12 -> 20; state_parameter raising-child.caregiverBurden 55 -> 52; mood 0.020000000000000018_

- **1944.01** `state_expire:em18-late-bloom` tags: em18-late-bloom, elderhood, late_life, reinvention, love, work, legacy, risk
  Alois Lechner的「迟开的花」到期；相关安排结束。
  _effects: state_remove em18-late-bloom state:world-vienna-1912:831; flag -late_bloom_active_

- **1944.01** `agency:organize_meeting` tags: agency, agency:organize_meeting
  Alois Lechner原定在Leopoldstädter Zinshaus, gemeinsamer Gang开会，但来的人不够，或者有人临时退缩；最后只留下几张没发完的纸条。
  _effects: mood -0.040000000000000036; reputation -0.010000000000000009_

- **1944.02** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Luise Bauer这周主动擦了黑板。Alois Lechner把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 40 -> 43; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:012832_

- **1944.05** `sm18-coincidence.photograph::ctx-vienna-postwar-1945::milieu-tenement/burns-the-photograph` tags: coincidence, photograph, memory, elder, uncanny, unresolved, vienna, urban
  Alois Lechner把照片拿到厨房，就着炉火点着。火苗先烧掉最后一排，那个女人的脸卷起来，变成一小块黑灰。Gustav Weiss在门口看见，什么也没说，只把窗子推开一点。
  _effects: mood -0.040000000000000036; relation acquaintance with person-materialized-world-vienna-1912-28; flag +burned_the_old_photograph_

- **1944.06** `p21-elder-testimony::ctx-vienna-postwar-1945::milieu-tenement/the-name-is-restored` tags: elderhood, testimony, death, family_secret, history, court, public, suspicious_death
  Josef Hofer 2把那份旧证词从档案袋里抽出来，放在窗边的桌上。Alois Lechner用蓝铅笔改了三处，把死者的名字从“无名”改回“卡尔·魏斯”；Mitzi在旁边把每一页按顺序排好，Grete Stein站在门口，手里的帽子一直没有戴上。签完字时，窗外正好有人敲响下午四点的钟。
  _effects: state_remove eh19-late-testimony state:world-vienna-1912:1177; state_add p21-fortune-reversal state:world-vienna-1912:1178; reputation 0.05000000000000002; knowledge “蓝铅笔改了三处，死者的名字从“无名”改回“卡尔·魏斯”。”; cash 2 (the court refunded part of the costs); mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-128; flag -late_testimony_active; flag -fortune_reversal_active; flag +fortune_reversal_active_

- **1944.06** `state_reaction:raising-child/child-death-in-the-household` tags: raising-child, family, child, care, school, household, state, state_reaction
  孩子的名字从学校的名册上被划掉以后，家里的碗还多摆了一副。Alois Lechner没有把它收起来，直到有一天发现碗沿积了灰，才拿去洗。
  _effects: state_parameter raising-child.childConfidence 40 -> 10; state_parameter raising-child.caregiverBurden 52 -> 67; mood -0.030000000000000027_
  _causes: evt:world-vienna-1912:013164_

- **1944.06** `state_reaction:raising-child/child-death-in-the-household` tags: raising-child, family, child, care, school, household, state, state_reaction
  孩子的名字从学校的名册上被划掉以后，家里的碗还多摆了一副。Alois Lechner没有把它收起来，直到有一天发现碗沿积了灰，才拿去洗。
  _effects: state_parameter raising-child.childConfidence 0 -> 0; state_parameter raising-child.caregiverBurden 81 -> 96_
  _causes: evt:world-vienna-1912:013164_

- **1944.10** `em18-late-bloom.shop-sign::ctx-vienna-postwar-1945::milieu-tenement/the-cooperative-shop` tags: elderhood, late_life, shop, craft, work, reinvention, neighborhood, vienna
  Hermann Lechner提议合租门面：Alois Lechner修旧家具，Hermann Lechner修钟表，房租对半。Alois Lechner把工具摆到靠窗的一边，又在墙上钉了一排钩子；Hermann Lechner说这样像从前师傅的作坊，Alois Lechner说先别急着像。
  _effects: state_add em18-late-bloom state:world-vienna-1912:1176; cash -1 (half of the first month's rent); relation colleague with person:evt:world-vienna-1912:003200:child; mood 0.020000000000000018; flag +late_bloom_active_

- **1944.11** `eh19-bridge.question-arrives::ctx-vienna-postwar-1945::milieu-tenement/fill-the-form` tags: elderhood, testimony, history, memory, bureaucracy, ordinary, vienna, urban
  区里寄来一张问话单，只有一页，问的是一九三四年住过这条街的人。Alois Lechner把老花镜从抽屉里找出来，先写自己的名字，再写“记得不清楚”；写到第三个问题，笔尖在纸上停住，窗外有人在收晾衣绳。
  _effects: state_add eh19-late-testimony state:world-vienna-1912:1177; knowledge “区里在核对一九三四年住过这条街的人。”; mood -0.020000000000000018; flag +late_testimony_active_

- **1944.11** `state_reaction:eh19-late-testimony/official-return` tags: eh19-late-testimony, elderhood, testimony, memory, history, politics, legal, risk
  法院的人又来了，这次带着上一回的笔录。Alois Lechner看见自己的句子被打印成另一种语气，旁边还留着书记员画的一个问号；对方说只改一处，改完就可以回家。
  _effects: state_parameter eh19-late-testimony.pressure 30 -> 38; state_parameter eh19-late-testimony.danger 15 -> 20; mood -0.01000000000000012_
  _causes: evt:world-vienna-1912:013162_

- **1945.01** `state_reaction:occupied-city-regime/liberation-ends-occupation` tags: occupied-city-regime, occupation, war, repression, curfew, requisition, shortage, place
  城里的旗子又换了一次。Alois Lechner站在街口，看见第一批士兵把岗哨撤走；没有人解释接下来会怎样，但通行证不再需要每天重签了。
  _effects: state_remove occupied-city-regime state:world-vienna-1912:1096; mood 0.030000000000000027_
  _causes: evt:world-vienna-1912:013167_

- **1945.01** `state_tick:em18-late-bloom/late-life-year/body-interrupts` tags: em18-late-bloom, elderhood, late_life, reinvention, love, work, legacy, risk
  入冬后，Alois Lechner在楼梯上停了三次。医生把“减少劳累”写在纸条上，Alois Lechner把它折好，放进装车票的口袋；第二天仍去开门，只是把营业时间改短了一小时。
  _effects: state_parameter em18-late-bloom.stamina 50 -> 42; health -0.030000000000000027 (the body is interrupting the new life); state_parameter em18-late-bloom.tether 45 -> 50; mood -0.030000000000000027_

- **1945.01** `state_tick:p21-fortune-reversal/the-crowd-recounts/the-scaffold-shakes` tags: p21-fortune-reversal, fortune_reversal, fortune, reversal, inheritance, ruin, public, witnesses
  一笔该到的钱没有到。Alois Lechner在账房里坐到天黑，听见隔壁把算盘珠子拨得很快；回家时，门口已经有人等着，手里拿着一份折过三次的账单。
  _effects: state_parameter p21-fortune-reversal.height 60 -> 52; state_parameter p21-fortune-reversal.fragility 50 -> 58; state_parameter p21-fortune-reversal.debt 10 -> 15; reputation -0.01999999999999999_

- **1945.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner把Elisabeth Lechner的旧课本包上书皮，又在本子上签了名。Elisabeth Lechner今年学会了自己系鞋带，也学会了在饭桌上说“不”；Alois Lechner听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 44 -> 52; state_parameter raising-child.caregiverBurden 96 -> 93; mood 0.020000000000000018_

- **1945.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner把Luise Bauer的旧课本包上书皮，又在本子上签了名。Luise Bauer今年学会了自己系鞋带，也学会了在饭桌上说“不”；Alois Lechner听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 43 -> 51; state_parameter raising-child.caregiverBurden 59 -> 56; mood 0.020000000000000018_

- **1945.01** `agency:recruit_members` tags: agency, agency:recruit_members
  Alois Lechner试图招募Luise Berg，但对方担心工作和警察，没有给出承诺。
  _effects: mood -0.040000000000000036; reputation -0.010000000000000009_

- **1945.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Elisabeth Lechner这周主动擦了黑板。Alois Lechner把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 52 -> 55; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:013728_

- **1945.07** `p9-gap-elderhood-daily.old-colleague-funeral/p9-gap-elderhood-daily.old-colleague-funeral.stood-long` tags: elderhood, daily, pension, housing, care, funeral, colleague, memory
  葬礼在城外公墓，Alois Lechner穿着袖口磨亮的黑外套，在墓前站得比旁人久，靴底让冻土冰得发麻。回来的电车上她把旧工资册翻开，一页页看那些签名和日期，邻座的Grete Stein问起，她才说起那同事当年替她顶过一班夜工。
  _effects: mood -0.020000000000000018; health -0.020000000000000018 (冻土上久站，脚趾发木); relation acquaintance with person-grete-stein_

- **1945.08** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Ferdinand 2这周主动擦了黑板。Alois Lechner把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 20 -> 23; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:014035_

- **1945.12** `vienna-elder-care.winter-stairs/ask-neighbor-to-buy-bread` tags: elderhood, health, family, social
  Alois Lechner在楼梯口叫住Berta Bauer 2，托她代买一条黑面包和半升牛奶。
  _effects: cash -2 (托邻居代买的食物); food; relation acquaintance with person-materialized-world-vienna-1912-27; relation acquaintance with person-materialized-world-vienna-1912-27_

- **1946.01** `state_tick:em18-late-bloom/late-life-year/family-pressure` tags: em18-late-bloom, elderhood, late_life, reinvention, love, work, legacy, risk
  成年子女来了一趟，把账本翻到最后一页，说这年纪不该再折腾。Alois Lechner没有争，只把钥匙从桌上收进围裙口袋；那天晚上，新生活仍按原计划继续，只是没有再提。
  _effects: state_parameter em18-late-bloom.tether 50 -> 58; state_parameter em18-late-bloom.nerve 45 -> 41; mood -0.020000000000000018_

- **1946.01** `state_tick:p21-fortune-reversal/the-crowd-recounts/the-scaffold-shakes` tags: p21-fortune-reversal, fortune_reversal, fortune, reversal, inheritance, ruin, public, witnesses
  一笔该到的钱没有到。Alois Lechner在账房里坐到天黑，听见隔壁把算盘珠子拨得很快；回家时，门口已经有人等着，手里拿着一份折过三次的账单。
  _effects: state_parameter p21-fortune-reversal.height 52 -> 44; state_parameter p21-fortune-reversal.fragility 58 -> 66; state_parameter p21-fortune-reversal.debt 15 -> 20; reputation -0.01999999999999999_

- **1946.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner被叫到学校，老师说Ferdinand 2这学期总在课上看窗外。回家的路上，Alois Lechner没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 23 -> 18; state_parameter raising-child.caregiverBurden 67 -> 72; cash -2 (extra lessons and replacement pencils)_

- **1946.01** `task-vienna-daily-culture.cafe-newspaper/cafe-newspaper.correct-reading` tags: elderhood, daily, culture, cafe, church, market, task, task:daily
  Friedrich Berg念到“每千立方尺”时把零吞掉了，Alois Lechner用手指敲了敲桌面，说出正确的数目。旁边喝咖啡的人抬起眼，Friedrich Berg把报纸往他面前一推，说那你来念。
  _effects: reputation 0.03; relation acquaintance with person-materialized-world-vienna-1912-29; flag +known_as_cafe_corrector_

- **1946.03** `sm18-legend.well-light::ctx-vienna-postwar-1945::milieu-tenement/tells-the-children` tags: legend, well, light, neighborhood, uncanny, unresolved, vienna, urban
  Alois Lechner把井口的故事讲给巷子里的孩子听，说白灯是洗衣妇的衬裙，也说是一个等不到人的新娘。孩子们第二天就去看，回来时每人手里都拿着一块玻璃。Otto Lechner在门口摇头，说这条巷子又多了一个版本。
  _effects: reputation 0.03; mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-39_

- **1946.03** `eh19-bridge.question-arrives::ctx-vienna-postwar-1945::milieu-tenement/fill-the-form` tags: elderhood, testimony, history, memory, bureaucracy, ordinary, vienna, urban
  区里寄来一张问话单，只有一页，问的是一九三四年住过这条街的人。Alois Lechner把老花镜从抽屉里找出来，先写自己的名字，再写“记得不清楚”；写到第三个问题，笔尖在纸上停住，窗外有人在收晾衣绳。
  _effects: state_add eh19-late-testimony state:world-vienna-1912:1242; knowledge “区里在核对一九三四年住过这条街的人。”; mood -0.020000000000000018; flag +late_testimony_active_

- **1946.03** `state_reaction:eh19-late-testimony/official-return` tags: eh19-late-testimony, elderhood, testimony, memory, history, politics, legal, risk
  法院的人又来了，这次带着上一回的笔录。Alois Lechner看见自己的句子被打印成另一种语气，旁边还留着书记员画的一个问号；对方说只改一处，改完就可以回家。
  _effects: state_parameter eh19-late-testimony.pressure 30 -> 38; state_parameter eh19-late-testimony.danger 15 -> 20; mood -0.030000000000000027_
  _causes: evt:world-vienna-1912:014353_

- **1946.08** `em18-late-bloom.rent-increase::ctx-vienna-postwar-1945::milieu-tenement/shares-with-the-neighbor` tags: elderhood, late_life, housing, rent, shop, money, risk, vienna
  Helene Kral 2提出把两家铺子中间的墙打通，合用一盏灯和一台暖炉。Alois Lechner起初嫌吵，后来发现客人等修鞋时会顺手看家具；月底分账，Alois Lechner第一次在账本上画了一条向上的线。
  _effects: cash -1 (the shared lamp and stove); state_parameter em18-late-bloom.tether 58 -> 63; state_parameter em18-late-bloom.publicness 30 -> 35; relation friend with person-materialized-world-vienna-1912-69; mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-104_

- **1946.09** `p21-elder-testimony::ctx-vienna-postwar-1945::milieu-tenement/the-name-is-restored` tags: elderhood, testimony, death, family_secret, history, court, public, suspicious_death
  Friedrich Berg把那份旧证词从档案袋里抽出来，放在窗边的桌上。Alois Lechner用蓝铅笔改了三处，把死者的名字从“无名”改回“卡尔·魏斯”；Franz Lechner在旁边把每一页按顺序排好，Gustav Moser 3站在门口，手里的帽子一直没有戴上。签完字时，窗外正好有人敲响下午四点的钟。
  _effects: state_remove eh19-late-testimony state:world-vienna-1912:1242; state_add p21-fortune-reversal state:world-vienna-1912:1243; relation kin with person-franz-lechner; reputation 0.04999999999999999; knowledge “蓝铅笔改了三处，死者的名字从“无名”改回“卡尔·魏斯”。”; cash 2 (the court refunded part of the costs); mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-137; flag -late_testimony_active; flag -fortune_reversal_active; flag +fortune_reversal_active_

- **1946.09** `state_reaction:em18-late-bloom/a-death-in-the-household` tags: em18-late-bloom, elderhood, late_life, reinvention, love, work, legacy, risk
  家里少了一个人以后，Alois Lechner把新生活里最花钱的那一项划掉了。不是因为不想，而是因为账单、葬礼和空出来的房间都需要有人管；Alois Lechner把划掉的那一行又抄到另一张纸上。
  _effects: state_parameter em18-late-bloom.tether 63 -> 73; state_parameter em18-late-bloom.stamina 42 -> 38; mood -0.040000000000000036_
  _causes: evt:world-vienna-1912:014355_

- **1946.09** `state_reaction:raising-child/child-death-in-the-household` tags: raising-child, family, child, care, school, household, state, state_reaction
  孩子的名字从学校的名册上被划掉以后，家里的碗还多摆了一副。Alois Lechner没有把它收起来，直到有一天发现碗沿积了灰，才拿去洗。
  _effects: state_parameter raising-child.childConfidence 25 -> 0; state_parameter raising-child.caregiverBurden 56 -> 71_
  _causes: evt:world-vienna-1912:014355_

- **1946.09** `state_reaction:ml18-sudden-fortune/a-relative-remembers` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  一个多年没走动的亲戚提着一盒点心上门，先问Alois Lechner的身体，再问那笔钱是怎么来的。临走时他说起小时候替Alois Lechner家垫过一冬天的煤钱，数字记不清了，但意思很清楚。
  _effects: state_parameter ml18-sudden-fortune.claims 2 -> 3; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:014680_

- **1947.01** `state_tick:em18-late-bloom/late-life-year/takes-root` tags: em18-late-bloom, elderhood, late_life, reinvention, love, work, legacy, risk
  又一年过去，Alois Lechner把新生活的开销记在一本旧账簿背面：房租、药、车票，还有一件为公开场合买的衬衫。事情没有变轻，但Alois Lechner已经知道每周哪几天有力气，哪几天只适合坐在窗边。
  _effects: state_parameter em18-late-bloom.nerve 41 -> 45; state_parameter em18-late-bloom.stamina 38 -> 35; state_parameter em18-late-bloom.tether 73 -> 71; cash 1 (small receipts from the new work); mood 0.020000000000000018_

- **1947.01** `state_tick:p21-fortune-reversal/the-crowd-recounts/the-scaffold-shakes` tags: p21-fortune-reversal, fortune_reversal, fortune, reversal, inheritance, ruin, public, witnesses
  一笔该到的钱没有到。Alois Lechner在账房里坐到天黑，听见隔壁把算盘珠子拨得很快；回家时，门口已经有人等着，手里拿着一份折过三次的账单。
  _effects: state_parameter p21-fortune-reversal.height 60 -> 52; state_parameter p21-fortune-reversal.fragility 50 -> 58; state_parameter p21-fortune-reversal.debt 10 -> 15; reputation -0.01999999999999999_

- **1947.01** `state_tick:ml18-sudden-fortune/fortune-year/money-slips-away` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  钱在一年里薄了一层：屋顶要修，姐夫来借，彩票站的老主顾说有个稳赚的买卖。Alois Lechner把账本翻到最后一页，发现写下的支出比记得的多出四克朗；窗外有人在敲铁皮，声音像在催账。
  _effects: state_parameter ml18-sudden-fortune.principal 50 -> 45; state_parameter ml18-sudden-fortune.spent 0 -> 5; cash -1 (the account does not balance); mood -0.020000000000000018_

- **1947.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner被叫到学校，老师说Elisabeth Lechner这学期总在课上看窗外。回家的路上，Alois Lechner没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 58 -> 53; state_parameter raising-child.caregiverBurden 93 -> 98; cash -2 (extra lessons and replacement pencils)_

- **1947.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner被叫到学校，老师说Luise Bauer这学期总在课上看窗外。回家的路上，Alois Lechner没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 51 -> 46; state_parameter raising-child.caregiverBurden 71 -> 76; cash -2 (extra lessons and replacement pencils)_

- **1947.01** `p9-gap-elderhood-care.give-tools/tools-given-all` tags: elderhood, care, pension, housing, task, task:social
  Alois Lechner把柜底的刨子、凿子和小锯擦干净，用一块旧布包好，交给新搬来的Helene Lechner。年轻人当场试了试刨子，刨出一卷薄木花，说比作坊里的好用。她把空出来的柜底又摸了摸，才关上柜门。
  _effects: mood 0.06000000000000005_

- **1947.02** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Elisabeth Lechner这周主动擦了黑板。Alois Lechner把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 55 -> 58; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:014611_

- **1947.03** `em18-late-bloom.legacy-walk::ctx-vienna-postwar-1945::milieu-tenement/the-child-remembers-differently` tags: elderhood, late_life, legacy, memory, family, child, neighborhood, vienna
  Alois Lechner带着Franz Lechner走了一遍旧街：原来的面包房成了鞋店，学校的铁门刷了新漆。Franz Lechner记得的是另一条路线，还有一次走丢时挨的那顿骂；两个人在街角站了一会儿，谁也没有把记忆改口。
  _effects: state_parameter em18-late-bloom.tether 61 -> 56; state_parameter em18-late-bloom.nerve 53 -> 56; relation kin with person-franz-lechner; knowledge “成年子女记得的旧街路线和老人记得的不一样。”; mood 0.020000000000000018; flag +legacy_walk_

- **1947.10** `em18-late-bloom.shop-sign::ctx-vienna-postwar-1945::milieu-tenement/the-lease-is-refused` tags: elderhood, late_life, shop, craft, work, reinvention, neighborhood, vienna
  房东把Alois Lechner的押金推回来，说这年纪要有担保人，还要一次付清半年房租。Alois Lechner在门口站了一会儿，把写好的招牌尺寸纸折起来；回家路上，Alois Lechner经过那扇空门面，里面已经挂上了成衣铺的布帘。
  _effects: cash -1 (the deposit was returned after a day); mood -0.040000000000000036; knowledge “房东要求半年房租一次付清，才肯把空门面租给六十岁以上的人。”_

- **1948.01** `em18-late-bloom.courting-family::ctx-vienna-postwar-1945::milieu-tenement/move-in-anyway` tags: elderhood, late_life, love, family, inheritance, conflict, cohabitation, vienna
  Alois Lechner把朝北的房间腾出来，给Mitzi Kral 2放了一张床和一只旧五斗柜。Franz Lechner知道后，把过年要送来的东西托邻居转交；Alois Lechner把东西收下，在厨房多摆了一副碗筷，谁也没有再提那副碗筷是给谁的。
  _effects: state_parameter em18-late-bloom.tether 71 -> 61; state_parameter em18-late-bloom.publicness 35 -> 45; state_parameter em18-late-bloom.nerve 45 -> 53; relation friend with person-materialized-world-vienna-1912-141; relation kin with person-franz-lechner; cash -1 (a bed and a chest for the north room); flag +cohabitation; relation acquaintance with person-materialized-world-vienna-1912-141_

- **1948.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Luise Bauer这周主动擦了黑板。Alois Lechner把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 46 -> 49; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:015226_

- **1948.01** `state_tick:em18-late-bloom/late-life-year/body-interrupts` tags: em18-late-bloom, elderhood, late_life, reinvention, love, work, legacy, risk
  入冬后，Alois Lechner在楼梯上停了三次。医生把“减少劳累”写在纸条上，Alois Lechner把它折好，放进装车票的口袋；第二天仍去开门，只是把营业时间改短了一小时。
  _effects: state_parameter em18-late-bloom.stamina 35 -> 27; health -0.030000000000000027 (the body is interrupting the new life); state_parameter em18-late-bloom.tether 56 -> 61; mood -0.030000000000000027_

- **1948.01** `state_tick:p21-fortune-reversal/the-crowd-recounts/the-scaffold-shakes` tags: p21-fortune-reversal, fortune_reversal, fortune, reversal, inheritance, ruin, public, witnesses
  一笔该到的钱没有到。Alois Lechner在账房里坐到天黑，听见隔壁把算盘珠子拨得很快；回家时，门口已经有人等着，手里拿着一份折过三次的账单。
  _effects: state_parameter p21-fortune-reversal.height 52 -> 44; state_parameter p21-fortune-reversal.fragility 58 -> 66; state_parameter p21-fortune-reversal.debt 15 -> 20; reputation -0.01999999999999999_

- **1948.01** `state_tick:ml18-sudden-fortune/fortune-year/money-keeps-working` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  一年过去，钱没有变多，却也没有一下花完。Alois Lechner把一部分存进邮局储蓄所，一部分借给楼下的鞋匠；鞋匠每月送来一双补好的鞋，利息就夹在鞋垫下面。街口的杂货商开始把好面粉留到Alois Lechner来的时候。
  _effects: cash 2 (interest and small repayments on the windfall); state_parameter ml18-sudden-fortune.claims 3 -> 4; mood 0.010000000000000009_

- **1948.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner把Ferdinand 2的旧课本包上书皮，又在本子上签了名。Ferdinand 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Alois Lechner听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 23 -> 31; state_parameter raising-child.caregiverBurden 79 -> 76; mood 0.020000000000000018_

- **1948.01** `p9-gap-elderhood-care.pension-appeal/pension-appeal-two-trips` tags: elderhood, care, pension, housing, task, task:daily
  第一次去，窗口说管档案的人不在，让她改天再来。Alois Lechner隔了四天又跑一趟，这回Mitzi Hofer陪她，Anton Kral才收下身份纸和邻居写的证明，说工龄要核，补发的钱月底汇到。她来回走了两趟，鞋底磨薄了一层。
  _effects: cash -1 (两趟往返的车钱与手续费); relation acquaintance with person-materialized-world-vienna-1912-15_

- **1948.02** `em18-late-bloom.courting-family::ctx-vienna-postwar-1945::milieu-union/separate-rooms` tags: elderhood, late_life, love, family, inheritance, conflict, cohabitation, vienna
  Alois Lechner把Rosa Kral带到家里吃饭，饭后却宣布两个人各住各的：白天一起看店，晚上回各自的房间。Franz Lechner把筷子放下，问这算什么；Alois Lechner说，算一个不用把房子写进谁名下的办法。
  _effects: state_parameter em18-late-bloom.tether 56 -> 64; state_parameter em18-late-bloom.publicness 45 -> 40; state_parameter em18-late-bloom.nerve 59 -> 62; relation kin with person-franz-lechner; relation friend with person-materialized-world-vienna-1912-145; cash -1 (the extra dinner and the separate keys); flag +living_apart_together; relation acquaintance with person-materialized-world-vienna-1912-145_

- **1948.12** `eh19-bridge.question-arrives::ctx-vienna-postwar-1945::milieu-tenement/put-it-in-the-box` tags: elderhood, testimony, history, memory, bureaucracy, ordinary, vienna, urban
  Alois Lechner把问话单折成四折，塞进装旧证件的铁盒。盒子已经满了，她挑出一张一九三八年的配给证放在上面，又放回去；第二天，区里又寄来一张，同样的纸，同样的第三个问题。
  _effects: state_add eh19-late-testimony state:world-vienna-1912:1344; knowledge “区里第二次寄来同样的问题，说明他们还在查。”; mood -0.030000000000000027; flag +late_testimony_active_

- **1948.12** `state_reaction:eh19-late-testimony/official-return` tags: eh19-late-testimony, elderhood, testimony, memory, history, politics, legal, risk
  法院的人又来了，这次带着上一回的笔录。Alois Lechner看见自己的句子被打印成另一种语气，旁边还留着书记员画的一个问号；对方说只改一处，改完就可以回家。
  _effects: state_parameter eh19-late-testimony.pressure 45 -> 53; state_parameter eh19-late-testimony.danger 20 -> 25; mood -0.030000000000000027_
  _causes: evt:world-vienna-1912:015613_

- **1949.01** `em18-late-bloom.legacy-walk::ctx-vienna-postwar-1945::milieu-tenement/the-child-remembers-differently` tags: elderhood, late_life, legacy, memory, family, child, neighborhood, vienna
  Alois Lechner带着Franz Lechner走了一遍旧街：原来的面包房成了鞋店，学校的铁门刷了新漆。Franz Lechner记得的是另一条路线，还有一次走丢时挨的那顿骂；两个人在街角站了一会儿，谁也没有把记忆改口。
  _effects: state_parameter em18-late-bloom.tether 61 -> 56; state_parameter em18-late-bloom.nerve 56 -> 59; relation kin with person-franz-lechner; knowledge “成年子女记得的旧街路线和老人记得的不一样。”; mood 0.020000000000000018_

- **1949.01** `state_tick:em18-late-bloom/late-life-year/takes-root` tags: em18-late-bloom, elderhood, late_life, reinvention, love, work, legacy, risk
  又一年过去，Alois Lechner把新生活的开销记在一本旧账簿背面：房租、药、车票，还有一件为公开场合买的衬衫。事情没有变轻，但Alois Lechner已经知道每周哪几天有力气，哪几天只适合坐在窗边。
  _effects: state_parameter em18-late-bloom.nerve 62 -> 66; state_parameter em18-late-bloom.stamina 27 -> 24; state_parameter em18-late-bloom.tether 64 -> 62; cash 1 (small receipts from the new work); mood 0.020000000000000018_

- **1949.01** `state_tick:p21-fortune-reversal/the-crowd-recounts/the-scaffold-shakes` tags: p21-fortune-reversal, fortune_reversal, fortune, reversal, inheritance, ruin, public, witnesses
  一笔该到的钱没有到。Alois Lechner在账房里坐到天黑，听见隔壁把算盘珠子拨得很快；回家时，门口已经有人等着，手里拿着一份折过三次的账单。
  _effects: state_parameter p21-fortune-reversal.height 44 -> 36; state_parameter p21-fortune-reversal.fragility 66 -> 74; state_parameter p21-fortune-reversal.debt 20 -> 25; reputation -0.01999999999999999_

- **1949.01** `state_expire:ml18-sudden-fortune` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  Alois Lechner的「一笔突然到手的钱」到期；相关安排结束。
  _effects: state_remove ml18-sudden-fortune state:world-vienna-1912:1266_

- **1949.01** `state_tick:eh19-late-testimony/version-drift/rehearsed` tags: eh19-late-testimony, elderhood, testimony, memory, history, politics, legal, risk
  又过了半年，Alois Lechner把证词在心里走了一遍。顺序还在，但每讲一次，旁边就多出一点别人补上的颜色；Alois Lechner把最重要的日期写在火柴盒背面，睡前又看了一次。
  _effects: state_parameter eh19-late-testimony.memory 50 -> 53; state_parameter eh19-late-testimony.truth 40 -> 38; state_parameter eh19-late-testimony.pressure 53 -> 55; mood 0.010000000000000009_

- **1949.01** `state_expire:raising-child` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner的「家里有个正在长大的孩子」到期；相关安排结束。
  _effects: state_remove raising-child state:world-vienna-1912:321_

- **1949.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner把Elisabeth Lechner的旧课本包上书皮，又在本子上签了名。Elisabeth Lechner今年学会了自己系鞋带，也学会了在饭桌上说“不”；Alois Lechner听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 53 -> 61; state_parameter raising-child.caregiverBurden 100 -> 97; mood 0.020000000000000018_

- **1949.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner把Luise Bauer的旧课本包上书皮，又在本子上签了名。Luise Bauer今年学会了自己系鞋带，也学会了在饭桌上说“不”；Alois Lechner听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 49 -> 57; state_parameter raising-child.caregiverBurden 76 -> 73; mood 0.020000000000000018_

- **1949.01** `kernel-migrate.pension-appeal::ctx-vienna-postwar-1945::milieu-tenement/civic-pension-missing` tags: elderhood, pension, bureaucracy, family, rural, vienna, urban, postwar
  窗口的玻璃后面坐着三个职员，只有最右边那个在收材料。Anton Bauer 3把他的工龄单翻来覆去看，说缺一份十年前的雇主证明；他问那家厂还在不在，Anton Bauer 3说“这不归我们管”。他把工龄单收回包里，去档案馆问那家厂的旧地址。
  _effects: flag +pension_missing_record; knowledge “养老金窗口只认雇主证明，不负责查找已经关门的工厂”; relation acquaintance with person-materialized-world-vienna-1912-132; cash -2 (补开证明的表格费和车钱); health -0.020000000000000018 (被告知材料不全后的失眠); relation acquaintance with person-materialized-world-vienna-1912-132_

- **1949.03** `p21-elder-testimony::ctx-vienna-postwar-1945::milieu-union/the-family-hears-a-different-death` tags: elderhood, testimony, death, family_secret, history, court, public, suspicious_death
  Franz Lechner在证词里读到另一段：卡尔·魏斯不是死于街头冲突，而是在一间公寓里被注射了镇静剂。Alois Lechner没有否认，只说“那时候说出来，会多死两个人”；Josef Hofer 2把钢笔放下，Rosa Bauer 2在门口说“你终于肯说了”。Franz Lechner把纸翻过去，背面还有一行被划掉的名字。
  _effects: relation kin with person-franz-lechner; state_add p21-scandal-web state:world-vienna-1912:1388; state_add grief state:world-vienna-1912:1389; flag +family_heard_other_death; knowledge “卡尔·魏斯不是死于街头冲突，而是在公寓里被注射了镇静剂。”; reputation -0.01999999999999999; mood -0.050000000000000044; relation acquaintance with person-materialized-world-vienna-1912-149; flag +scandal_web_active_

- **1949.04** `sm18-coincidence.photograph::ctx-vienna-postwar-1945::milieu-tenement/burns-the-photograph` tags: coincidence, photograph, memory, elder, uncanny, unresolved, vienna, urban
  Alois Lechner把照片拿到厨房，就着炉火点着。火苗先烧掉最后一排，那个女人的脸卷起来，变成一小块黑灰。Katharina Lechner在门口看见，什么也没说，只把窗子推开一点。
  _effects: mood -0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-41_

- **1949.05** `pc20-testimony.retraction::ctx-vienna-postwar-1945::milieu-tenement/retract` tags: elderhood, testimony, court, retraction, public_reversal, memory, witness, politics
  Alois Lechner在法庭上把上一次的日期改了回来，说那天先响的是门，不是窗。Josef Hofer 2让他确认，Alois Lechner说确认；Gustav Huber 2在旁听席上低下头，手指在膝盖上敲了两下，像在数一件只有他记得的事。
  _effects: state_add pc20-public-reversal state:world-vienna-1912:1387; state_parameter eh19-late-testimony.truth 38 -> 23; state_parameter eh19-late-testimony.pressure 63 -> 73; relation acquaintance with person-materialized-world-vienna-1912-128; flag +retracted_testimony; knowledge “那天先响的是门，不是窗；{subject}在法庭上把日期改了回来。”; relation acquaintance with person-materialized-world-vienna-1912-131; flag -public_reversal_active; flag +public_reversal_active_

- **1949.05** `state_reaction:pc20-public-reversal/someone-defends` tags: pc20-public-reversal, public_reversal, exoneration, accusation, testimony, proof, pressure, support
  一个旧同事在公开场合替Alois Lechner说了话，没有把Alois Lechner说成无辜，只把当年那份名单的次序讲清楚。第二天，另一个人在面包店门口拦住Alois Lechner，说自己一直觉得哪里不对。
  _effects: state_parameter pc20-public-reversal.support 30 -> 37; state_parameter pc20-public-reversal.proof 30 -> 34; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:016227_

- **1949.08** `state_reaction:ml18-sudden-fortune/a-relative-remembers` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  一个多年没走动的亲戚提着一盒点心上门，先问Alois Lechner的身体，再问那笔钱是怎么来的。临走时他说起小时候替Alois Lechner家垫过一冬天的煤钱，数字记不清了，但意思很清楚。
  _effects: state_parameter ml18-sudden-fortune.claims 1 -> 2_
  _causes: evt:world-vienna-1912:016241_

- **1950.01** `pc20-testimony.new-caption::ctx-vienna-postwar-1945::milieu-union/no-correction` tags: elderhood, testimony, newspaper, photograph, public_reversal, memory, family, vienna
  Friedrich Berg 2说版面已经排好，改一个字要挪三栏。Alois Lechner没有争，只把报纸带回家，用铅笔在照片下面画了一道横线；Franz Lechner问那是什么意思，Alois Lechner说意思是这张照片还没有说完。
  _effects: state_add pc20-public-reversal state:world-vienna-1912:1386; relation acquaintance with person-materialized-world-vienna-1912-130; flag +caption_unchanged; knowledge “照片下面被画了一道铅笔横线，意思是这张照片还没有说完。”; mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-130; flag +public_reversal_active_

- **1950.01** `state_reaction:eh19-late-testimony/official-return` tags: eh19-late-testimony, elderhood, testimony, memory, history, politics, legal, risk
  法院的人又来了，这次带着上一回的笔录。Alois Lechner看见自己的句子被打印成另一种语气，旁边还留着书记员画的一个问号；对方说只改一处，改完就可以回家。
  _effects: state_parameter eh19-late-testimony.pressure 55 -> 63; state_parameter eh19-late-testimony.danger 25 -> 30; mood -0.030000000000000027_
  _causes: evt:world-vienna-1912:016224_

- **1950.01** `state_reaction:pc20-public-reversal/someone-defends` tags: pc20-public-reversal, public_reversal, exoneration, accusation, testimony, proof, pressure, support
  一个旧同事在公开场合替Alois Lechner说了话，没有把Alois Lechner说成无辜，只把当年那份名单的次序讲清楚。第二天，另一个人在面包店门口拦住Alois Lechner，说自己一直觉得哪里不对。
  _effects: state_parameter pc20-public-reversal.support 30 -> 37; state_parameter pc20-public-reversal.proof 40 -> 44; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:016224_

- **1950.01** `state_expire:em18-late-bloom` tags: em18-late-bloom, elderhood, late_life, reinvention, love, work, legacy, risk
  Alois Lechner的「迟开的花」到期；相关安排结束。
  _effects: state_remove em18-late-bloom state:world-vienna-1912:1176; flag -late_bloom_active_

- **1950.01** `state_expire:p21-fortune-reversal` tags: p21-fortune-reversal, fortune_reversal, fortune, reversal, inheritance, ruin, public, witnesses
  Alois Lechner的「骤起骤落」到期；相关安排结束。
  _effects: state_remove p21-fortune-reversal state:world-vienna-1912:1243; flag -fortune_reversal_active_

- **1950.01** `state_tick:eh19-late-testimony/version-drift/rehearsed` tags: eh19-late-testimony, elderhood, testimony, memory, history, politics, legal, risk
  又过了半年，Alois Lechner把证词在心里走了一遍。顺序还在，但每讲一次，旁边就多出一点别人补上的颜色；Alois Lechner把最重要的日期写在火柴盒背面，睡前又看了一次。
  _effects: state_parameter eh19-late-testimony.memory 53 -> 56; state_parameter eh19-late-testimony.truth 23 -> 21; state_parameter eh19-late-testimony.pressure 73 -> 75; mood 0.010000000000000009_

- **1950.01** `state_tick:pc20-public-reversal/file-moves/a-copy-survives` tags: pc20-public-reversal, public_reversal, exoneration, accusation, testimony, proof, pressure, support
  书记员把一份抄件从抽屉底下抽出来，说原件已经调走，但这一份还在。Alois Lechner看见纸上自己的名字被红笔圈过，旁边有一行小字：此页曾由第三人核对。
  _effects: state_parameter pc20-public-reversal.proof 34 -> 41; state_parameter pc20-public-reversal.pressure 60 -> 64; state_parameter pc20-public-reversal.danger 45 -> 42; knowledge “档案里还有一份抄件，曾经由第三人核对过。”_

- **1950.01** `state_tick:p21-scandal-web/the-web-tightens/a-strand-snaps` tags: p21-scandal-web, scandal_web, scandal, secret, blackmail, network, leverage, danger
  一个证人搬走了，带走了他那一份记忆。Alois Lechner在旧地址门口站了半个下午，回来时发现信箱里多了一张没有署名的明信片，上面只写着“我还记得”。
  _effects: state_parameter p21-scandal-web.exposure 60 -> 68; state_parameter p21-scandal-web.leverage 50 -> 44; state_parameter p21-scandal-web.danger 40 -> 45; reputation -0.01999999999999999; flag +scandal_witness_left_

- **1950.01** `state_tick:ml18-sudden-fortune/fortune-year/money-keeps-working` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  一年过去，钱没有变多，却也没有一下花完。Alois Lechner把一部分存进邮局储蓄所，一部分借给楼下的鞋匠；鞋匠每月送来一双补好的鞋，利息就夹在鞋垫下面。街口的杂货商开始把好面粉留到Alois Lechner来的时候。
  _effects: cash 2 (interest and small repayments on the windfall); state_parameter ml18-sudden-fortune.claims 2 -> 3; mood 0.010000000000000009_

- **1950.01** `p9-gap-elderhood-care.pension-appeal/pension-appeal-partial` tags: elderhood, care, pension, housing, task, task:daily
  Alois Lechner把旧工资册摊在柜台上，Anton Kral翻到被划掉的那页，说缺一份厂里证明，答应先补三个月的差额，剩下的要她下月带证明再来。补发的九克朗扣了四十赫勒手续费，她数了两遍才放进布袋。
  _effects: cash 9 (补发部分养老金，扣除手续费); mood 0.050000000000000044; relation acquaintance with person-materialized-world-vienna-1912-65_

- **1950.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Luise Bauer这周主动擦了黑板。Alois Lechner把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 57 -> 60; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:016792_

- **1950.02** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Elisabeth Lechner这周主动擦了黑板。Alois Lechner把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 61 -> 64; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:016520_

- **1950.02** `pc20-testimony.retraction::ctx-vienna-postwar-1945::milieu-union/confirm` tags: elderhood, testimony, court, retraction, public_reversal, memory, witness, politics
  Alois Lechner没有改口，把上一次的说法一字一句重复完。Friedrich Berg问他是否确定，Alois Lechner说记得的不是纸上的日期，是门开后屋里那股煤气味；Gustav Bauer在旁听席上抬起头，第一次没有躲开他的目光。
  _effects: state_add pc20-public-reversal state:world-vienna-1912:1444; state_parameter eh19-late-testimony.truth 21 -> 31; state_parameter eh19-late-testimony.pressure 75 -> 83; relation acquaintance with person-materialized-world-vienna-1912-29; flag +confirmed_testimony; knowledge “记得的不是纸上的日期，是门开后屋里那股煤气味。”; relation acquaintance with person-materialized-world-vienna-1912-67; flag -public_reversal_active; flag +public_reversal_active_

- **1950.02** `state_reaction:pc20-public-reversal/someone-defends` tags: pc20-public-reversal, public_reversal, exoneration, accusation, testimony, proof, pressure, support
  一个旧同事在公开场合替Alois Lechner说了话，没有把Alois Lechner说成无辜，只把当年那份名单的次序讲清楚。第二天，另一个人在面包店门口拦住Alois Lechner，说自己一直觉得哪里不对。
  _effects: state_parameter pc20-public-reversal.support 45 -> 52; state_parameter pc20-public-reversal.proof 70 -> 74; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:016839_

- **1950.03** `vienna-elder-bereavement.old-colleague-funeral/old-colleague-funeral.go` tags: elderhood, bereavement, family, health, memory, housing
  Alois Lechner出来时在门口碰见工会的老簿子，油墨味还在。签名的人不多，名字一行行往下排，Berta Hofer 2那一行用黑框围了起来。
  _effects: cash -1 (买花和电车票); mood -0.020000000000000018; relation colleague with person-materialized-world-vienna-1912-92; flag +union_book_signed_

- **1950.03** `em18-late-bloom.shop-sign::ctx-vienna-postwar-1945::milieu-tenement/a-repair-bench` tags: elderhood, late_life, shop, craft, work, reinvention, neighborhood, vienna
  修鞋铺隔壁的小门面空了出来，Alois Lechner用两克朗付了押金，把旧车床搬进去。招牌是请街角的老漆匠写的，只写了“修理”两个字；第一天来了三个人，一个修伞，一个修锁，还有一个只是进来躲雨。
  _effects: state_add em18-late-bloom state:world-vienna-1912:1445; cash -2 (the deposit on the narrow shop); skill; reputation 0.020000000000000004; flag +shop_opened; flag +late_bloom_active_

- **1950.04** `state_reaction:ml18-sudden-fortune/the-papers-hear-about-it` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  报纸的社会版把Alois Lechner家的门牌号和那笔钱的数目印在一起，标题是“一笔不该有的好运”。第二天门口多了两个陌生人，一个说是远亲，一个说代表一家孤儿院。
  _effects: state_parameter ml18-sudden-fortune.public false -> true; state_parameter ml18-sudden-fortune.claims 4 -> 6; reputation -0.020000000000000004_
  _causes: evt:world-vienna-1912:017062_

- **1950.06** `state_reaction:ml18-sudden-fortune/a-relative-remembers` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  一个多年没走动的亲戚提着一盒点心上门，先问Alois Lechner的身体，再问那笔钱是怎么来的。临走时他说起小时候替Alois Lechner家垫过一冬天的煤钱，数字记不清了，但意思很清楚。
  _effects: state_parameter ml18-sudden-fortune.claims 1 -> 2_
  _causes: evt:world-vienna-1912:016968_

- **1951.01** `p21-elder-testimony::ctx-vienna-postwar-1945::milieu-tenement/the-family-hears-a-different-death` tags: elderhood, testimony, death, family_secret, history, court, public, suspicious_death
  Franz Lechner在证词里读到另一段：卡尔·魏斯不是死于街头冲突，而是在一间公寓里被注射了镇静剂。Alois Lechner没有否认，只说“那时候说出来，会多死两个人”；Anton Bauer 3把钢笔放下，Franz Bauer在门口说“你终于肯说了”。Franz Lechner把纸翻过去，背面还有一行被划掉的名字。
  _effects: relation kin with person-franz-lechner; state_add p21-scandal-web state:world-vienna-1912:1442; state_add grief state:world-vienna-1912:1443; knowledge “卡尔·魏斯不是死于街头冲突，而是在公寓里被注射了镇静剂。”; reputation -0.020000000000000004; mood -0.050000000000000044; relation acquaintance with person-materialized-world-vienna-1912-153; flag -scandal_web_active; flag +scandal_web_active_

- **1951.01** `state_reaction:ml18-sudden-fortune/the-papers-hear-about-it` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  报纸的社会版把Alois Lechner家的门牌号和那笔钱的数目印在一起，标题是“一笔不该有的好运”。第二天门口多了两个陌生人，一个说是远亲，一个说代表一家孤儿院。
  _effects: state_parameter ml18-sudden-fortune.public false -> true; state_parameter ml18-sudden-fortune.claims 3 -> 5; reputation -0.020000000000000004_
  _causes: evt:world-vienna-1912:016835_

- **1951.01** `state_reaction:raising-child/child-death-in-the-household` tags: raising-child, family, child, care, school, household, state, state_reaction
  孩子的名字从学校的名册上被划掉以后，家里的碗还多摆了一副。Alois Lechner没有把它收起来，直到有一天发现碗沿积了灰，才拿去洗。
  _effects: state_parameter raising-child.childConfidence 0 -> 0; state_parameter raising-child.caregiverBurden 97 -> 100; mood -0.06000000000000005_
  _causes: evt:world-vienna-1912:016835_

- **1951.01** `state_tick:eh19-late-testimony/version-drift/someone-coaches` tags: eh19-late-testimony, elderhood, testimony, memory, history, politics, legal, risk
  一个自称旧同事的人来家里，把一页写好的说法留在桌上，说这样对大家都好。Alois Lechner没有答应，也没有把纸扔掉；夜里，那张纸压在茶杯底下，边角被水汽卷了起来。
  _effects: state_parameter eh19-late-testimony.pressure 83 -> 91; state_parameter eh19-late-testimony.truth 31 -> 25; knowledge “有人希望我把日期说成一九三八年，而不是一九三四年。”_

- **1951.01** `state_tick:pc20-public-reversal/file-moves/the-file-disappears` tags: pc20-public-reversal, public_reversal, exoneration, accusation, testimony, proof, pressure, support
  Alois Lechner按约定时间去调卷，窗口的人说编号不对，又说管库的人病了。走廊尽头的门开着，里面只剩空架子和一层灰；Alois Lechner把手伸进去，摸到的是一截断掉的麻绳。
  _effects: state_parameter pc20-public-reversal.proof 74 -> 66; state_parameter pc20-public-reversal.danger 55 -> 61; state_parameter pc20-public-reversal.pressure 55 -> 60_

- **1951.01** `state_tick:em18-late-bloom/late-life-year/family-pressure` tags: em18-late-bloom, elderhood, late_life, reinvention, love, work, legacy, risk
  成年子女来了一趟，把账本翻到最后一页，说这年纪不该再折腾。Alois Lechner没有争，只把钥匙从桌上收进围裙口袋；那天晚上，新生活仍按原计划继续，只是没有再提。
  _effects: state_parameter em18-late-bloom.tether 30 -> 38; state_parameter em18-late-bloom.nerve 55 -> 51_

- **1951.01** `state_tick:ml18-sudden-fortune/fortune-year/money-slips-away` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  钱在一年里薄了一层：屋顶要修，姐夫来借，彩票站的老主顾说有个稳赚的买卖。Alois Lechner把账本翻到最后一页，发现写下的支出比记得的多出四克朗；窗外有人在敲铁皮，声音像在催账。
  _effects: state_parameter ml18-sudden-fortune.principal 0 -> 0; state_parameter ml18-sudden-fortune.spent 0 -> 5; cash -1 (the account does not balance)_

- **1951.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner把Elisabeth Lechner的旧课本包上书皮，又在本子上签了名。Elisabeth Lechner今年学会了自己系鞋带，也学会了在饭桌上说“不”；Alois Lechner听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 64 -> 72; state_parameter raising-child.caregiverBurden 100 -> 97; mood 0.020000000000000018_

- **1951.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner把Luise Bauer的旧课本包上书皮，又在本子上签了名。Luise Bauer今年学会了自己系鞋带，也学会了在饭桌上说“不”；Alois Lechner听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 60 -> 68; state_parameter raising-child.caregiverBurden 73 -> 70; mood 0.020000000000000018_

- **1951.01** `task-vienna-daily-culture.neighborhood-rumor/neighborhood-rumor.spread-further` tags: elderhood, daily, culture, cafe, church, market, task, task:social
  面包店柜台前排队的人伸着脖子听，Alois Lechner压低声音把楼道里的话讲了一遍，末尾还加了一句“我早觉得不对劲”。面粉的气味里，有人点头，有人只是把硬币往前推。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-131; reputation -0.06; mood -0.040000000000000036_

- **1951.06** `em18-late-bloom.shop-sign::ctx-vienna-postwar-1945::milieu-union/a-repair-bench` tags: elderhood, late_life, shop, craft, work, reinvention, neighborhood, vienna
  修鞋铺隔壁的小门面空了出来，Alois Lechner用两克朗付了押金，把旧车床搬进去。招牌是请街角的老漆匠写的，只写了“修理”两个字；第一天来了三个人，一个修伞，一个修锁，还有一个只是进来躲雨。
  _effects: state_add em18-late-bloom state:world-vienna-1912:1495; cash -2 (the deposit on the narrow shop); skill; reputation 0.019999999999999997; flag -late_bloom_active; flag +late_bloom_active_

- **1951.07** `em18-late-bloom.radio-hour::ctx-vienna-postwar-1945::milieu-union/refuses-the-microphone` tags: elderhood, late_life, fame, radio, comedy, mistaken_identity, absurd, vienna
  Alois Lechner在录音间门口站了很久，最后说嗓子不行，转身下了楼。编导追出来，把录音费塞进Alois Lechner的口袋；当天晚上，电台还是播了那段走廊里的脚步声和一句“算了”。
  _effects: cash 1 (the broadcast fee was pressed into a pocket); flag +radio_refused; reputation 0.010000000000000002; knowledge “电台没有经过同意，就播出了走廊里的脚步声。”_

- **1951.11** `em18-late-bloom.legacy-walk::ctx-vienna-postwar-1945::milieu-tenement/the-child-refuses` tags: elderhood, late_life, legacy, memory, family, child, neighborhood, vienna
  Franz Lechner说周末要加班，改天再去。Alois Lechner把准备好的路线图收回抽屉，图上用铅笔画了三个圈：旧居、作坊、学校；后来那张图被压在玻璃板下，边角慢慢卷起来。
  _effects: relation kin with person-franz-lechner; state_parameter em18-late-bloom.tether 30 -> 35; flag +walk_refused; knowledge “路线图上用铅笔画了旧居、作坊和学校三个圈。”_

- **1952.01** `em18-late-bloom.rent-increase::ctx-vienna-postwar-1945::milieu-tenement/moves-to-the-courtyard` tags: elderhood, late_life, housing, rent, shop, money, risk, vienna
  Alois Lechner把工具装进两只木箱，搬到后院一间更小的棚屋。新地方没有临街的窗，但房租少了一半；Katharina Moser 2来帮忙，说这里冬天会冷，Alois Lechner说先把招牌挂上，冷了再想办法。
  _effects: cash -2 (the move and the new sign); state_parameter em18-late-bloom.publicness 20 -> 10; state_parameter em18-late-bloom.nerve 51 -> 56; relation friend with person-materialized-world-vienna-1912-104; flag +moved_workshop_

- **1952.01** `state_tick:eh19-late-testimony/version-drift/detail-slips` tags: eh19-late-testimony, elderhood, testimony, memory, history, politics, legal, risk
  Alois Lechner忽然想不起那天先响的是门还是窗。邻居说自己记得清清楚楚，还补了一个细节；Alois Lechner听着，分不清那是自己看见的，还是后来听来的。
  _effects: state_parameter eh19-late-testimony.memory 56 -> 48; state_parameter eh19-late-testimony.pressure 91 -> 95; state_parameter eh19-late-testimony.danger 30 -> 32_

- **1952.01** `state_tick:p21-scandal-web/the-web-tightens/held` tags: p21-scandal-web, scandal_web, scandal, secret, blackmail, network, leverage, danger
  又过了一年，那几张纸仍锁在Alois Lechner的抽屉里。街上的问话没有变多，也没有变少；Alois Lechner在咖啡馆里数了数还能信任的人，发现名单比去年短，但每一个名字都还站得住。
  _effects: state_parameter p21-scandal-web.exposure 60 -> 57; state_parameter p21-scandal-web.loyalty 35 -> 39; state_parameter p21-scandal-web.danger 40 -> 37; mood 0.010000000000000009_

- **1952.01** `state_tick:pc20-public-reversal/file-moves/a-copy-survives` tags: pc20-public-reversal, public_reversal, exoneration, accusation, testimony, proof, pressure, support
  书记员把一份抄件从抽屉底下抽出来，说原件已经调走，但这一份还在。Alois Lechner看见纸上自己的名字被红笔圈过，旁边有一行小字：此页曾由第三人核对。
  _effects: state_parameter pc20-public-reversal.proof 66 -> 73; state_parameter pc20-public-reversal.pressure 60 -> 64; state_parameter pc20-public-reversal.danger 61 -> 58; knowledge “档案里还有一份抄件，曾经由第三人核对过。”_

- **1952.01** `state_expire:ml18-sudden-fortune` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  Alois Lechner的「一笔突然到手的钱」到期；相关安排结束。
  _effects: state_remove ml18-sudden-fortune state:world-vienna-1912:1468_

- **1952.01** `state_tick:em18-late-bloom/late-life-year/takes-root` tags: em18-late-bloom, elderhood, late_life, reinvention, love, work, legacy, risk
  又一年过去，Alois Lechner把新生活的开销记在一本旧账簿背面：房租、药、车票，还有一件为公开场合买的衬衫。事情没有变轻，但Alois Lechner已经知道每周哪几天有力气，哪几天只适合坐在窗边。
  _effects: state_parameter em18-late-bloom.nerve 55 -> 59; state_parameter em18-late-bloom.stamina 55 -> 52; state_parameter em18-late-bloom.tether 35 -> 33; cash 1 (small receipts from the new work); mood 0.020000000000000018_

- **1952.01** `agency:recruit_members` tags: agency, agency:recruit_members
  Alois Lechner试图招募Luise Bauer，但对方担心工作和警察，没有给出承诺。
  _effects: mood -0.030000000000000027; reputation -0.010000000000000002_

- **1952.04** `em18-late-bloom.legacy-walk::ctx-vienna-postwar-1945::milieu-union/the-subject-gets-lost` tags: elderhood, late_life, legacy, memory, family, child, neighborhood, vienna
  走到第三条巷子时，Alois Lechner忽然认不出方向。Franz Lechner没有说“你不是住了一辈子吗”，只把胳膊伸过来；两个人慢慢走回大路，Alois Lechner一路都在看门牌，像在核对别人的地址。
  _effects: health -0.020000000000000018 (the old streets became strange); relation kin with person-franz-lechner; state_parameter em18-late-bloom.stamina 45 -> 40; flag +got_lost; knowledge “第三条巷子让老人忽然认不出方向。”_

- **1952.09** `em18-late-bloom.rent-increase::ctx-vienna-postwar-1945::milieu-tenement/pays-the-increase` tags: elderhood, late_life, housing, rent, shop, money, risk, vienna
  房东把新租约摊在柜台上，说煤价涨了，房租每月多加一克朗。Alois Lechner把账本翻到最后一页，算了一遍修一把椅子的工钱，最后还是在租约上签了字；那天下午，Alois Lechner把修理价目也重新写了一张。
  _effects: cash -3 (the rent and the new price list); state_parameter em18-late-bloom.tether 43 -> 51; state_parameter em18-late-bloom.stamina 48 -> 45; flag +rent_paid; relation acquaintance with person-materialized-world-vienna-1912-114_

- **1952.10** `state_reaction:em18-late-bloom/a-death-in-the-household` tags: em18-late-bloom, elderhood, late_life, reinvention, love, work, legacy, risk
  家里少了一个人以后，Alois Lechner把新生活里最花钱的那一项划掉了。不是因为不想，而是因为账单、葬礼和空出来的房间都需要有人管；Alois Lechner把划掉的那一行又抄到另一张纸上。
  _effects: state_parameter em18-late-bloom.tether 33 -> 43; state_parameter em18-late-bloom.stamina 52 -> 48_
  _causes: evt:world-vienna-1912:017990_

- **1952.10** `p21-elder-testimony::ctx-vienna-postwar-1945::milieu-tenement/the-family-hears-a-different-death` tags: elderhood, testimony, death, family_secret, history, court, public, suspicious_death
  Franz Lechner在证词里读到另一段：卡尔·魏斯不是死于街头冲突，而是在一间公寓里被注射了镇静剂。Alois Lechner没有否认，只说“那时候说出来，会多死两个人”；Anton Bauer 3把钢笔放下，Anna Weiss 3在门口说“你终于肯说了”。Franz Lechner把纸翻过去，背面还有一行被划掉的名字。
  _effects: relation kin with person-franz-lechner; state_add p21-scandal-web state:world-vienna-1912:1530; state_add grief state:world-vienna-1912:1531; knowledge “卡尔·魏斯不是死于街头冲突，而是在公寓里被注射了镇静剂。”; reputation -0.019999999999999997; relation acquaintance with person-materialized-world-vienna-1912-163; flag -scandal_web_active; flag +scandal_web_active_

- **1952.10** `state_reaction:em18-late-bloom/public-eyes` tags: em18-late-bloom, elderhood, late_life, reinvention, love, work, legacy, risk
  有人在报纸的社交栏里看见Alois Lechner的名字，连旧住址都写对了。第二天，杂货店老板多问了一句，Alois Lechner笑着把话岔开；回家后，Alois Lechner把窗帘拉上，又打开。
  _effects: state_parameter em18-late-bloom.publicness 20 -> 26; reputation 0.020000000000000004_
  _causes: evt:world-vienna-1912:018006_

- **1952.10** `state_reaction:raising-child/child-death-in-the-household` tags: raising-child, family, child, care, school, household, state, state_reaction
  孩子的名字从学校的名册上被划掉以后，家里的碗还多摆了一副。Alois Lechner没有把它收起来，直到有一天发现碗沿积了灰，才拿去洗。
  _effects: state_parameter raising-child.childConfidence 0 -> 0; state_parameter raising-child.caregiverBurden 70 -> 85_
  _causes: evt:world-vienna-1912:018006_

- **1953.01** `pc20-testimony.new-caption::ctx-vienna-postwar-1945::milieu-union/no-correction` tags: elderhood, testimony, newspaper, photograph, public_reversal, memory, family, vienna
  Rosa Berg说版面已经排好，改一个字要挪三栏。Alois Lechner没有争，只把报纸带回家，用铅笔在照片下面画了一道横线；Franz Lechner问那是什么意思，Alois Lechner说意思是这张照片还没有说完。
  _effects: state_add pc20-public-reversal state:world-vienna-1912:1529; relation acquaintance with person:evt:world-vienna-1912:002249:child; knowledge “照片下面被画了一道铅笔横线，意思是这张照片还没有说完。”; flag -public_reversal_active; flag +public_reversal_active_

- **1953.01** `state_reaction:eh19-late-testimony/official-return` tags: eh19-late-testimony, elderhood, testimony, memory, history, politics, legal, risk
  法院的人又来了，这次带着上一回的笔录。Alois Lechner看见自己的句子被打印成另一种语气，旁边还留着书记员画的一个问号；对方说只改一处，改完就可以回家。
  _effects: state_parameter eh19-late-testimony.pressure 95 -> 100; state_parameter eh19-late-testimony.danger 32 -> 37_
  _causes: evt:world-vienna-1912:018004_

- **1953.01** `state_tick:eh19-late-testimony/version-drift/rehearsed` tags: eh19-late-testimony, elderhood, testimony, memory, history, politics, legal, risk
  又过了半年，Alois Lechner把证词在心里走了一遍。顺序还在，但每讲一次，旁边就多出一点别人补上的颜色；Alois Lechner把最重要的日期写在火柴盒背面，睡前又看了一次。
  _effects: state_parameter eh19-late-testimony.memory 48 -> 51; state_parameter eh19-late-testimony.truth 25 -> 23; state_parameter eh19-late-testimony.pressure 100 -> 100; mood 0.010000000000000009_

- **1953.01** `state_tick:em18-late-bloom/late-life-year/takes-root` tags: em18-late-bloom, elderhood, late_life, reinvention, love, work, legacy, risk
  又一年过去，Alois Lechner把新生活的开销记在一本旧账簿背面：房租、药、车票，还有一件为公开场合买的衬衫。事情没有变轻，但Alois Lechner已经知道每周哪几天有力气，哪几天只适合坐在窗边。
  _effects: state_parameter em18-late-bloom.nerve 59 -> 63; state_parameter em18-late-bloom.stamina 40 -> 37; state_parameter em18-late-bloom.tether 51 -> 49; cash 1 (small receipts from the new work); mood 0.020000000000000018_

- **1953.01** `state_tick:p21-scandal-web/the-web-tightens/a-strand-snaps` tags: p21-scandal-web, scandal_web, scandal, secret, blackmail, network, leverage, danger
  一个证人搬走了，带走了他那一份记忆。Alois Lechner在旧地址门口站了半个下午，回来时发现信箱里多了一张没有署名的明信片，上面只写着“我还记得”。
  _effects: state_parameter p21-scandal-web.exposure 60 -> 68; state_parameter p21-scandal-web.leverage 50 -> 44; state_parameter p21-scandal-web.danger 40 -> 45; reputation -0.020000000000000004_

- **1953.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner把Elisabeth Lechner的旧课本包上书皮，又在本子上签了名。Elisabeth Lechner今年学会了自己系鞋带，也学会了在饭桌上说“不”；Alois Lechner听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 72 -> 80; state_parameter raising-child.caregiverBurden 92 -> 89; mood 0.020000000000000018_

- **1953.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Alois Lechner把Luise Bauer的旧课本包上书皮，又在本子上签了名。Luise Bauer今年学会了自己系鞋带，也学会了在饭桌上说“不”；Alois Lechner听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 68 -> 76; state_parameter raising-child.caregiverBurden 85 -> 82; mood 0.020000000000000018_

- **1953.01** `agency:recruit_members` tags: agency, agency:recruit_members
  Alois Lechner找到Luise Bauer，把第二区夜班出租合作社的章程和会费说清楚；对方留下地址，答应下次再来。
  _effects: organization_membership; knowledge “我通过Alois Lechner加入了第二区夜班出租合作社。”_

- **1953.01** `eh19-bridge.question-arrives::ctx-vienna-postwar-1945::milieu-tenement/fill-the-form` tags: elderhood, testimony, history, memory, bureaucracy, ordinary, vienna, urban
  区里寄来一张问话单，只有一页，问的是一九三四年住过这条街的人。Alois Lechner把老花镜从抽屉里找出来，先写自己的名字，再写“记得不清楚”；写到第三个问题，笔尖在纸上停住，窗外有人在收晾衣绳。
  _effects: state_add eh19-late-testimony state:world-vienna-1912:1570; knowledge “区里在核对一九三四年住过这条街的人。”; mood -0.020000000000000018_

- **1953.06** `em18-late-bloom.courting-family::ctx-vienna-postwar-1945::milieu-tenement/move-in-anyway` tags: elderhood, late_life, love, family, inheritance, conflict, cohabitation, vienna
  Alois Lechner把朝北的房间腾出来，给Josef Hofer 2放了一张床和一只旧五斗柜。Franz Lechner知道后，把过年要送来的东西托邻居转交；Alois Lechner把东西收下，在厨房多摆了一副碗筷，谁也没有再提那副碗筷是给谁的。
  _effects: state_parameter em18-late-bloom.tether 54 -> 44; state_parameter em18-late-bloom.publicness 31 -> 41; state_parameter em18-late-bloom.nerve 63 -> 71; relation friend with person-materialized-world-vienna-1912-128; relation kin with person-franz-lechner; cash -1 (a bed and a chest for the north room)_

- **1953.07** `sm18-coincidence.photograph::ctx-vienna-postwar-1945::milieu-union/the-face-is-your-own` tags: coincidence, photograph, memory, elder, uncanny, unresolved, vienna, urban
  Alois Lechner在旧相册里翻到一张一九一二年的合影，最后一排站着一个和Alois Lechner年轻时一模一样的女人。照片背面只写着“四月，普拉特”。Luise Kral看了很久，说那个人也许是Alois Lechner的姑妈，可Alois Lechner记得姑妈那年还在乡下。
  _effects: mood -0.030000000000000027; knowledge “旧照片里有一个和本人年轻时一模一样的女人，背面写着“四月，普拉特””_

- **1953.08** `statistical_infection`
  Alois Lechner在Leopoldstädter Zinshaus, gemeinsamer Gang病倒了，肺炎让身体发热、虚弱，接下来的日子只能卧床。

- **1953.09** `statistical_illness_worsened`
  Alois Lechner的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1953.12** `statistical_illness_worsened`
  Alois Lechner的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1954.01** `em18-late-bloom.rent-increase::ctx-vienna-postwar-1945::milieu-union/shares-with-the-neighbor` tags: elderhood, late_life, housing, rent, shop, money, risk, vienna
  Franz Lechner提出把两家铺子中间的墙打通，合用一盏灯和一台暖炉。Alois Lechner起初嫌吵，后来发现客人等修鞋时会顺手看家具；月底分账，Alois Lechner第一次在账本上画了一条向上的线。
  _effects: cash -1 (the shared lamp and stove); state_parameter em18-late-bloom.tether 49 -> 54; state_parameter em18-late-bloom.publicness 26 -> 31; relation friend with person-franz-lechner; mood 0.030000000000000027_

- **1954.01** `state_expire:eh19-late-testimony` tags: eh19-late-testimony, elderhood, testimony, memory, history, politics, legal, risk
  Alois Lechner的「迟到的证词」到期；相关安排结束。
  _effects: state_remove eh19-late-testimony state:world-vienna-1912:1344; flag -late_testimony_active_

- **1954.01** `state_tick:em18-late-bloom/late-life-year/takes-root` tags: em18-late-bloom, elderhood, late_life, reinvention, love, work, legacy, risk
  又一年过去，Alois Lechner把新生活的开销记在一本旧账簿背面：房租、药、车票，还有一件为公开场合买的衬衫。事情没有变轻，但Alois Lechner已经知道每周哪几天有力气，哪几天只适合坐在窗边。
  _effects: state_parameter em18-late-bloom.nerve 71 -> 75; state_parameter em18-late-bloom.stamina 37 -> 34; state_parameter em18-late-bloom.tether 44 -> 42; cash 1 (small receipts from the new work); mood 0.020000000000000018_

- **1954.01** `state_tick:pc20-public-reversal/file-moves/the-file-disappears` tags: pc20-public-reversal, public_reversal, exoneration, accusation, testimony, proof, pressure, support
  Alois Lechner按约定时间去调卷，窗口的人说编号不对，又说管库的人病了。走廊尽头的门开着，里面只剩空架子和一层灰；Alois Lechner把手伸进去，摸到的是一截断掉的麻绳。
  _effects: state_parameter pc20-public-reversal.proof 40 -> 32; state_parameter pc20-public-reversal.danger 45 -> 51; state_parameter pc20-public-reversal.pressure 60 -> 65; mood -0.030000000000000027_

- **1954.01** `state_tick:p21-scandal-web/the-web-tightens/held` tags: p21-scandal-web, scandal_web, scandal, secret, blackmail, network, leverage, danger
  又过了一年，那几张纸仍锁在Alois Lechner的抽屉里。街上的问话没有变多，也没有变少；Alois Lechner在咖啡馆里数了数还能信任的人，发现名单比去年短，但每一个名字都还站得住。
  _effects: state_parameter p21-scandal-web.exposure 68 -> 65; state_parameter p21-scandal-web.loyalty 35 -> 39; state_parameter p21-scandal-web.danger 45 -> 42; mood 0.010000000000000009_

- **1954.01** `state_tick:eh19-late-testimony/version-drift/rehearsed` tags: eh19-late-testimony, elderhood, testimony, memory, history, politics, legal, risk
  又过了半年，Alois Lechner把证词在心里走了一遍。顺序还在，但每讲一次，旁边就多出一点别人补上的颜色；Alois Lechner把最重要的日期写在火柴盒背面，睡前又看了一次。
  _effects: state_parameter eh19-late-testimony.memory 55 -> 58; state_parameter eh19-late-testimony.truth 45 -> 43; state_parameter eh19-late-testimony.pressure 30 -> 32; mood 0.010000000000000009_

- **1954.01** `p9-gap-elderhood-care.join-aid/aid-neighbor-paid` tags: elderhood, care, pension, housing, task, task:social
  会费凑不齐，Alois Lechner在教堂门口犹豫半晌。住楼上的Josef Lechner 4看见了，替她垫了头一个月四十赫勒，说等她宽裕了再还。Alois Lechner在册子上签了名，回家把欠的钱记在日历背面，用红铅笔圈起来。
  _effects: cash 0.4 (邻居替她垫付的会费); relation acquaintance with person-materialized-world-vienna-1912-105_

- **1954.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Elisabeth Lechner这周主动擦了黑板。Alois Lechner把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 80 -> 83; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:019028_

- **1954.02** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Luise Bauer这周主动擦了黑板。Alois Lechner把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 76 -> 79; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:018826_

- **1954.02** `statistical_death/pneumonia` tags: death
  Alois Lechner在Leopoldstädter Zinshaus, gemeinsamer Gang发起高烧，咳嗽越来越深。邻居帮忙去请医生，医生到时只留下药粉和一张账单；几天后呼吸变得很浅。Luise Kral在场。
  _effects: death (肺炎); flag -late_bloom_active; flag -public_reversal_active; flag -scandal_web_active_