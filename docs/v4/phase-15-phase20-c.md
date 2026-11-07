# Phase 15 life dossier — phase20-c

Date: 2026-11-07T13:07:53.685Z  |  45 years  |  20879 events  |  360 named persons  |  197 alive  |  74 s

State facts: 4792 events, 2826 ticks, 1110 reactions, 18 transitions. Active 225, ended 1101. Positions 130.

Critique: **pass** — warn:high_repetition.

## Klara

Born 1912.01, died 1931.12 (age 19).
Education: apprenticeship 1; occupation: none; roles: infant, child, reform_school_inmate, self_taught_carpenter, day_laborer, wife, grieving_mother.

### State snapshot
- wish-power [person] (ended 1931.12: owner_died) parameters={"intensity":0.75,"fixation":0.66,"irony":0.3} links={} ticks=0
- iw18-imaginary-friend [person] (ended 1920.1: duration expired) parameters={"closeness":52,"secrecy":25,"boldness":38} links={} ticks=2
- apprenticeship-contract [person] (ended 1929.1: duration expired) parameters={"progress":73,"failures":0,"trade":"木工","paid":true} links={} ticks=4
- yf18-first-awakening [person] (ended 1928.1: duration expired) parameters={"intensity":66,"nerve":46,"talk":0,"reciprocated":true,"secret":true} links={"beloved":"Lena"} ticks=3
- yf18-runaway-plan [person] (ended 1929.1: duration expired) parameters={"preparation":69,"suspicion":35,"resolve":73,"destination":"格拉茨","ticket":true} links={} ticks=3
- yf18-first-awakening [person] (ended 1931.1: duration expired) parameters={"intensity":58,"nerve":36,"talk":0,"reciprocated":true,"secret":true} links={"beloved":"Elisabeth Bauer"} ticks=3
- apprenticeship-contract [person] (ended 1931.12: owner_died) parameters={"progress":50,"failures":0,"trade":"木工","paid":true} links={} ticks=2
- yf18-runaway-plan [person] (ended 1931.1: duration expired) parameters={"preparation":27,"suspicion":15,"resolve":53,"destination":"格拉茨","ticket":false} links={} ticks=2
- stage-sovereign [person] (ended 1931.1: duration expired) parameters={"production":"市庆游行","role":"节日国王","publicBelief":25,"costumeQuality":55,"scandal":0,"performances":0} links={} ticks=1

### 76 subject events

- **1915.08** `vienna-early-childhood.stairwell-fall/arm-bruise` tags: childhood, family, home, street, injury
  楼梯间的灯罩空着，第三级踏板比别处高。Klara一脚踩空，滚到平台，右小臂磕在铁扶手的弯头上。Josef Bauer听见哭声跑出来，把Klara抱回屋，用冷水毛巾敷那块青紫，再用旧布条缠了两圈。夜里Klara哭醒两次。
  _effects: health -0.040000000000000036 (从楼梯滚下，小臂挫伤); mood -0.049999999999999996_

- **1918.01** `iw18-home.ration-tin::ctx-klosterneuburg-rural-1912::milieu-tenement/puts-back-the-coin` tags: childhood, family, money, hunger, secret, school, rural, agriculture
  Klara已经把硬币攥在手心，走到门口又折回来，把硬币放回铁盒，还照着原来的顺序摆好。Josef Bauer回来时，Klara正在数面粉袋上的补丁；那天下午孩子没有出门，只把面包铺的香味想了一遍又一遍。
  _effects: state_parameter raising-child.childConfidence 57 -> 59; mood -0.01; flag +put_coin_back_

- **1918.01** `iw18-friend.chair-by-the-stove::ctx-klosterneuburg-rural-1912::milieu-tenement/a-guest-named-by-the-child` tags: childhood, play, imaginary_friend, solitude, family, wonder, rural, agriculture
  Klara从碗橱里多拿了一只缺口的盘子，摆在灶边那把没人坐的椅子上，还认真地告诉屋里的人：今天有客人。盘子里放着一小块土豆和一片面包边。Josef Bauer问客人叫什么，Klara说了一个从没听过的名字。
  _effects: state_add iw18-imaginary-friend state:world-vienna-1912:33; food; mood 0.04; flag +invisible_guest_named; flag +imaginary_friend_active_

- **1918.01** `p9-gap-childhood-chores.mind-sibling/sibling-falls-at-well` tags: childhood, household, chores, school, task, daily, sibling, care
  Anton Bauer的鞋掉在井台边，Klara先去捡鞋，回头才看见Anton Bauer摔在湿石头上。Josefine Hofer用围裙裹住Anton Bauer，血从膝盖渗出来。Josef Bauer夜里把Klara叫到灶台前，数落了很久，最后把锅里剩下的半勺汤倒回大锅，只给Klara留了半碗。
  _effects: health -0.030000000000000027 (在井台边摔了一跤); mood -0.06; relation kin with person-josef-bauer_

- **1918.06** `kernel-child.first-errand::ctx-klosterneuburg-rural-1912::milieu-tenement/edu-errand-good-change` tags: childhood, family, market, money, errand, rural, agriculture, small_town
  Josef Bauer把两枚十字币放进Klara手心，让去街角买盐和半块面包。Klara把钱攥出汗，先数了一遍，又在柜台前重数一遍。Ferdinand Winter 2把面包用纸包好，找回一枚铜币；Klara把铜币含在嘴里跑回家，咸味一直留到门口。
  _effects: food; skill; relation kin with person-josef-bauer; flag +ran_first_errand; relation acquaintance with person-materialized-world-vienna-1912-6_

- **1918.06** `p9-childhood-household.water-and-coal/ignored-mother-call` tags: childhood, family, household, home, siblings, illness, neighbors, injury
  “再提一桶！”Katharina Bauer的声音从灶台边追下来，Klara把门在身后带上，脚步没停。傍晚回家，水缸底只剩一层浑水。Katharina Bauer把扁担往地上一放，Klara挑着两只桶在院子和井台之间走了四趟，肩膀磨得发烫。
  _effects: health -0.050000000000000044 (傍晚被罚挑水四趟); relation kin with person-katharina-bauer_

- **1919.01** `state_tick:iw18-imaginary-friend/friend-year/fading` tags: iw18-imaginary-friend, childhood, play, imaginary_friend, solitude, imagination, secret, state
  Klara这一年很少再和那把椅子说话。学校里有了新的同桌，放学后要在楼梯间跳格子；有一天Klara把书包扔在椅面上，才想起自己已经三天没有给朋友留位置。椅面凉得很快，像一块普通木头。
  _effects: state_parameter iw18-imaginary-friend.closeness 60 -> 52; state_parameter iw18-imaginary-friend.boldness 40 -> 38; mood -0.010000000000000002_

- **1919.01** `p9-gap-childhood-chores.market-line/line-both-families` tags: childhood, household, chores, school, task, daily, market, food
  Karl Kraus把Klara拽到队伍前头，往自己身前塞，说“孩子占不了多大地儿”。窗口一次递出两包面包，Klara把邻居那包夹在胳肢窝，自己这包抱在胸前。到Leopoldstädter Zinshaus, gemeinsamer Gang门口，Klara蹲下把两包并排，按Karl Kraus说的份量分开，连找零的铜板也分成两小堆。
  _effects: food; relation acquaintance with person-karl-kraus; skill; relation acquaintance with person-materialized-world-vienna-1912-7_

- **1919.05** `vienna-childhood-friends.courtyard-race/fell-on-wet-stones` tags: childhood, social, school, street, injury
  晒衣绳上的水一滴一滴落在石板上。Klara跑到第二圈，鞋底一滑，膝盖先着地。Helene Moser从屋里端出半盆清水，蹲下冲掉伤口里的沙，又用手帕扎紧，说今天别跑了。
  _effects: health -0.040000000000000036 (膝盖在湿石板上磕破); relation acquaintance with person-materialized-world-vienna-1912-10; relation acquaintance with person-materialized-world-vienna-1912-10_

- **1920.01** `state_expire:iw18-imaginary-friend` tags: iw18-imaginary-friend, childhood, play, imaginary_friend, solitude, imagination, secret, state
  Klara的「一个只有孩子看得见的朋友」到期；相关安排结束。
  _effects: state_remove iw18-imaginary-friend state:world-vienna-1912:33; flag -imaginary_friend_active_

- **1920.01** `p9-gap-childhood-chores.mind-sibling/sibling-falls-at-well` tags: childhood, household, chores, school, task, daily, sibling, care
  Berta Bauer的鞋掉在井台边，Klara先去捡鞋，回头才看见Berta Bauer摔在湿石头上。Helene Weiss用围裙裹住Berta Bauer，血从膝盖渗出来。Katharina Bauer夜里把Klara叫到灶台前，数落了很久，最后把锅里剩下的半勺汤倒回大锅，只给Klara留了半碗。
  _effects: health -0.030000000000000027 (在井台边摔了一跤); mood -0.060000000000000005; relation kin with person-katharina-bauer; relation acquaintance with person-materialized-world-vienna-1912-5_

- **1921.01** `p9-gap-childhood-chores.laundry-help/laundry-three-heller` tags: childhood, household, chores, school, task, daily, laundry, work
  床单浸了碱水，沉得拽不动。Klara站在木凳上，把湿布一点点递过绳，水顺着肘弯滴进袖口。Otto Winter在绳头数夹子，最后一条挂好，从围裙口袋里摸出三枚赫勒，按进Klara掌心。晚上洗手时，虎口那道口子被水一蜇，Klara才看见。
  _effects: cash 0.03 (帮邻居晾床单挣的三赫勒); health -0.030000000000000027 (碱水泡手，虎口裂开); relation acquaintance with person-otto-winter; relation acquaintance with person-materialized-world-vienna-1912-28_

- **1922.01** `p9-gap-childhood-chores.market-line/line-both-families` tags: childhood, household, chores, school, task, daily, market, food
  Katharina Hofer把Klara拽到队伍前头，往自己身前塞，说“孩子占不了多大地儿”。窗口一次递出两包面包，Klara把邻居那包夹在胳肢窝，自己这包抱在胸前。到Leopoldstädter Zinshaus, gemeinsamer Gang门口，Klara蹲下把两包并排，按Katharina Hofer说的份量分开，连找零的铜板也分成两小堆。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-2; skill; relation acquaintance with person-materialized-world-vienna-1912-2; relation acquaintance with person-materialized-world-vienna-1912-23_

- **1923.01** `p9-gap-childhood-chores.laundry-help/laundry-three-heller` tags: childhood, household, chores, school, task, daily, laundry, work
  “拽平，别留褶。”Berta Weiss在绳子那头喊。Klara踮着脚把床单拉直，碱水把指缝泡得发白。收工时天已经黑了，Berta Weiss数了三赫勒，又在围裙上擦干手才递过来。Klara把钱塞进袜筒，回家路上一直攥着，虎口的裂口沾了汗，火辣辣地疼。
  _effects: cash 0.03 (帮邻居晾床单挣的三赫勒); health -0.030000000000000027 (碱水泡手，虎口裂开); relation acquaintance with person-berta-weiss_

- **1923.08** `vienna-childhood-street.market-errand/errand-lost-coin` tags: childhood, street, social, home
  菜摊前的地面是湿的。Klara弯腰捡土豆时，一枚铜板从指缝里滑出去，顺着水沟格栅掉了下去。Klara把剩下的钱摊在柜台上，让摊主帮忙数，还是少了三十克鲁泽。晚上Josef Bauer把钱一枚枚排开，问了三遍怎么少的，Klara每答一次，声音就低一点。
  _effects: cash -0.3 (铜板掉进下水道); relation kin with person-josef-bauer; mood -0.06_

- **1924.04** `vienna-adolescence.brothers-torn-jacket/sell-the-coat` tags: adolescence, school, work, family, social
  巷口的风把外套下摆吹起来。旧货贩子闻了闻领子，说给两克朗。Klara把钱卷进袜筒，回家前在楼梯口站了一会儿。Katharina Bauer发现衣钩空了，问了三遍，Klara都说没看见，脚趾在鞋里把硬币越踩越紧。
  _effects: cash 2 (卖掉哥哥旧外套); relation kin with person-katharina-bauer; mood -0.04000000000000001_

- **1924.05** `vienna-youth-threshold.sibling-departure/coins-into-box` tags: adolescence, school, work, family, transition
  Anna Bauer的箱子摊在床板上，里面是两件衬衫、一双旧靴和母亲塞的一小袋面粉。Klara把攒了半年的零钱数到第三遍，一共一克朗二十赫勒，全塞进箱角的袜子里。Anna Bauer看见了，没说话，只把箱子扣上，铜扣响了一声。
  _effects: cash -1.2 (把攒下的零钱塞给离家的兄姐); relation kin with person-anna-bauer; mood -0.03_

- **1925.01** `r15-work.master-takes-on::ctx-vienna-reform-1930::milieu-tenement/signed-contract` tags: work, craft, apprentice, trade, poverty, reform, medical, schooling
  Anton Weiss把学徒契约摊在桌上，指给Klara看期限、工钱和出师考试。Klara签了名，第二天站到刨床前，手指上多了第一道木刺。
  _effects: relation employer with person-materialized-world-vienna-1912-4; state_add apprenticeship-contract state:world-vienna-1912:90; relation acquaintance with person-materialized-world-vienna-1912-4; education apprenticeship; role_

- **1925.01** `p9-childhood-apprenticeship.cover-for-sibling/forewoman-catches` tags: adolescence, work, apprenticeship, labour, training, family, task, task:family
  Rosa Lechner把Klara叫到巷口，问Hermann Bauer叫什么、住在哪间屋。Klara答到一半就停住了。Rosa Lechner说这半天的活不算数，说冒名顶替坏了规矩。Klara回到Leopoldstädter Zinshaus, gemeinsamer Gang时，Hermann Bauer正扶着床沿站着，听完只说“别去了”，说完又低下头，像是自己连累了Klara。
  _effects: mood -0.07; relation kin with person:evt:world-vienna-1912:000324:child; health -0.020000000000000018 (白跑一趟，路上没吃东西)_

- **1925.06** `yf18-firstlook.tram-glove::ctx-vienna-reform-1930::milieu-tenement/return-it-at-the-gate` tags: first_love, love, tram, glove, youth, courtship, reform, medical
  下一站，Klara追下车，把那只手套递还给Lena。Lena说了一声谢谢，手指在毛线手套里缩了一下；Klara回到车上才发现自己坐过了两站，只好沿着环城路走回家。
  _effects: state_add yf18-first-awakening state:world-vienna-1912:91; relation friend with person-phase15-Lena-world-vienna-1912; mood 0.03; relation acquaintance with person-materialized-world-vienna-1912-50; flag +yf18_first_awakening_active_

- **1925.12** `r3-teen.foster-family::ctx-vienna-reform-1930::milieu-tenement/rejected` tags: foster_care, family, placement, belonging, institution, reform, medical, schooling
  寄养父亲数了数橱柜里的面包，说多一张嘴就是多一份配给。Alois Lechner 2来做回访时，他已经把Klara的行李放在门口。Klara抱着包袱站在雪里，听见屋里Josef Bauer在哭，门没有开。
  _effects: mood -0.14; condition; flag +returned_from_foster_placement; relation rival with person-josef-bauer; move place-wien-magistrat; relation acquaintance with person-materialized-world-vienna-1912-34_

- **1926.01** `state_reaction:wish-power/power-humiliation` tags: wish-power, wish, wish:power, power, status, ambition, state, state_reaction
  Klara把那句轻视记了很久。它没有变成一个决定，但也没有消失。
  _effects: mood -0.09999999999999998; flag +wish:power:fixated_on_revenge_
  _causes: evt:world-vienna-1912:002423_

- **1926.01** `yf18-dare.bridge-rail::ctx-vienna-reform-1930::milieu-government/climb-back-down` tags: dare, bridge, river, friendship, risk, reform, medical, schooling
  Klara的手已经搭上栏杆，听见桥下有驳船拉笛，忽然把手收回来。Elisabeth Bauer骂了一句，Emil却把围巾解下来递给Klara；三个人在桥头站了一会儿，谁也没有再提这件事。
  _effects: state_parameter yf18-first-awakening.intensity 45 -> 48; state_parameter yf18-first-awakening.nerve 25 -> 20; mood -0.010000000000000009_

- **1926.01** `state_tick:apprenticeship-contract/workshop-year/learned` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Klara又学会了一道工序。师傅没有夸，只把下一块料推到面前。
  _effects: state_parameter apprenticeship-contract.progress 10 -> 30; skill; mood 0.020000000000000018_

- **1926.01** `state_tick:yf18-first-awakening/half-year-of-glances/answered-glance` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Klara在教堂门口或学校走廊里又遇见Lena。这一次对方先点了头，Klara准备好的整段话全忘了，只把手里的书换到另一只手上；回家后Klara才发现，自己把书拿倒了。
  _effects: state_parameter yf18-first-awakening.intensity 48 -> 53; state_parameter yf18-first-awakening.nerve 20 -> 28; state_parameter yf18-first-awakening.reciprocated false -> true; relation friend with person-phase15-Lena-world-vienna-1912; mood 0.02999999999999997_

- **1926.01** `r14-edu.tutoring-sibling::ctx-vienna-reform-1930::milieu-school/sibling-resented-drilling` tags: education, tutored_sibling, family, tutoring, reform, medical, schooling, school
  Berta Bauer把铅笔一摔，说再也不想看见豆子。Klara把豆子一颗颗收进碗里，说随你。那天晚上，Berta Bauer自己把错题改了一遍，改完把本子推到Klara面前，不说话。Klara看了一遍，在页角画了一个很小的勾。
  _effects: flag +sibling_resented_tutoring; relation rival with person:evt:world-vienna-1912:000322:child_

- **1926.03** `r3-crime.juvenile-court::ctx-vienna-reform-1930::milieu-government::court-without-bars/sent-to-reform-school` tags: crime, youth, court, family, school, reform, medical, schooling
  Friedrich Hofer说家里管不了，不如让学校管。Katharina Bauer想说什么，被Helene Bauer递过来的一张表格挡住了。Klara被带走时，Katharina Bauer追到走廊尽头，把一包糖塞进Klara的口袋。Helene Bauer说“到了那边会检查”，又把糖拿走了。
  _effects: condition; flag +sent_to_reform_school; role; relation rival with person-katharina-bauer; move place-wien-volksschule-leopoldstadt; education apprenticeship; relation acquaintance with person-materialized-world-vienna-1912-45_

- **1926.10** `yf18-runaway.bundle::ctx-vienna-reform-1930::milieu-government/buy-the-ticket-tonight` tags: runaway, escape, family, plan, night_train, reform, medical, schooling
  Klara趁Katharina Bauer去上夜班，把储钱罐砸在窗台上。硬币滚进床缝，Klara趴在地上摸到最后一枚，跑去南站买了一张最便宜的单程票；售票员问要不要往返，Klara说不用，声音比自己想象中平静。
  _effects: state_add yf18-runaway-plan state:world-vienna-1912:116; cash -3 (the savings jar was broken for a ticket); flag +yf18_ticket_bought; mood 0.03999999999999998; flag +yf18_runaway_plan_active_

- **1927.01** `yf18-apprentice.press-guard::ctx-vienna-reform-1930::milieu-school/call-the-inspector` tags: apprenticeship, work, danger, machine, injury, refusal, reform, medical
  Klara趁Wiener Psychoanalytische Vereinigung去喝咖啡，跑到街角的工厂检查所，把卸下来的护板指给Alois Lechner 2看。Alois Lechner 2第二天带着卷尺来了，在压印机旁边量了很久；Wiener Psychoanalytische Vereinigung陪着笑，等门一关，就把Klara的工具从案子上扫进了木箱。
  _effects: relation employer with person-materialized-world-vienna-1912-7; reputation 0.03; state_parameter apprenticeship-contract.progress 30 -> 33; flag +yf18_reported_press; mood 0.030000000000000027_

- **1927.01** `yf18-firstlook.parish-dance::ctx-vienna-reform-1930::milieu-school/the-second-dance` tags: first_love, dance, church, courtship, jealousy, reform, medical, schooling
  舞卡上第一支曲子被Emil写走了。Klara在教会礼堂的木地板上踩错了两步，Emil说没关系，把手放回Klara背后；第三支曲子响起时，Elisabeth Bauer在门口冲Klara比了个手势，Klara假装没看见。
  _effects: state_parameter yf18-first-awakening.intensity 53 -> 61; state_parameter yf18-first-awakening.nerve 28 -> 38; state_parameter yf18-first-awakening.reciprocated true -> true; mood 0.03999999999999998_

- **1927.01** `state_tick:yf18-runaway-plan/three-months-of-preparation/route-memorised` tags: yf18-runaway-plan, escape, youth, plan, home, travel, risk, state
  Klara把去车站的路又走了一遍，记住了哪一段有煤气灯、哪一段住着巡夜的警察。回家后，Klara在旧日历背面画了一条线，标出换乘的站名；那条线短得可笑，却比课本上的任何地图都清楚。
  _effects: state_parameter yf18-runaway-plan.preparation 45 -> 57; state_parameter yf18-runaway-plan.suspicion 31 -> 33; mood 0.010000000000000009_

- **1927.01** `state_tick:apprenticeship-contract/workshop-year/learned` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Klara又学会了一道工序。师傅没有夸，只把下一块料推到面前。
  _effects: state_parameter apprenticeship-contract.progress 33 -> 53; skill; mood 0.020000000000000018_

- **1927.01** `state_tick:yf18-first-awakening/half-year-of-glances/answered-glance` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Klara在教堂门口或学校走廊里又遇见Lena。这一次对方先点了头，Klara准备好的整段话全忘了，只把手里的书换到另一只手上；回家后Klara才发现，自己把书拿倒了。
  _effects: state_parameter yf18-first-awakening.intensity 61 -> 66; state_parameter yf18-first-awakening.nerve 38 -> 46; state_parameter yf18-first-awakening.reciprocated true -> true; relation friend with person-phase15-Lena-world-vienna-1912; mood 0.02999999999999997_

- **1927.01** `p9-childhood-apprenticeship.cover-for-sibling/delivery-paid` tags: adolescence, work, apprenticeship, labour, training, family, task, task:family
  床单叠成四方，压得筐绳勒进肩膀。Klara照着地址找到利奥波德城的两户人家，一户在院子深处，一户要上四层楼。按件算下来是一克朗六十赫勒，Klara把铜币一枚枚码在Hermann Bauer枕边。Helene Bauer在门口看见，只说“下回别敲错门”；家里省下的那份晚饭，让Hermann Bauer多歇了一天。
  _effects: cash 1.6 (替妹妹送床单的计件工钱); health -0.030000000000000027 (背着湿床单走了几个街区); relation kin with person:evt:world-vienna-1912:000324:child; food_

- **1927.06** `statistical_infection`
  Klara在Leopoldstädter Volksschule病倒了，肺炎让身体发热、虚弱，接下来的日子只能卧床。

- **1927.09** `r3-crime.juvenile-court::ctx-vienna-reform-1930::milieu-school::court-without-bars/sent-to-reform-school` tags: crime, youth, court, family, school, reform, medical, schooling
  Alois Lechner 2说家里管不了，不如让学校管。Katharina Bauer想说什么，被Maria Kral递过来的一张表格挡住了。Klara被带走时，Katharina Bauer追到走廊尽头，把一包糖塞进Klara的口袋。Maria Kral说“到了那边会检查”，又把糖拿走了。
  _effects: relation rival with person-katharina-bauer; education apprenticeship_

- **1927.09** `statistical_illness_worsened`
  Klara的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1927.10** `state_reaction:yf18-runaway-plan/a-family-question` tags: yf18-runaway-plan, escape, youth, plan, home, travel, risk, state
  饭桌上又为房租吵起来。Klara把面包掰成很小的块，听见父亲说“这个家养不起闲人”；Klara没有回嘴，只在心里把格拉茨的地址又背了一遍。
  _effects: state_parameter yf18-runaway-plan.suspicion 15 -> 23; state_parameter yf18-runaway-plan.resolve 70 -> 68_
  _causes: evt:world-vienna-1912:002720_

- **1927.11** `yf18-runaway.companion::ctx-vienna-reform-1930::milieu-school/find-another-companion` tags: runaway, friendship, companion, plan, betrayal, reform, medical, schooling
  Klara在车站遇见一个也要去格拉茨的年轻女工，两人合买了一张双人票，便宜两成。Elisabeth Bauer知道后说Klara早就想甩下自己；Klara没有解释，只把新同伴的地址写在旧信封背面。
  _effects: state_parameter yf18-runaway-plan.preparation 35 -> 45; state_parameter yf18-runaway-plan.suspicion 23 -> 31; state_parameter yf18-runaway-plan.resolve 68 -> 73; cash -1 (a shared ticket and a platform tea); flag +yf18_new_companion; mood 0.010000000000000009_

- **1927.12** `statistical_recovery`
  Klara熬过了这场肺炎，能坐起来喝一点汤，但身体还很虚。

- **1928.01** `state_tick:yf18-runaway-plan/three-months-of-preparation/route-memorised` tags: yf18-runaway-plan, escape, youth, plan, home, travel, risk, state
  Klara把去车站的路又走了一遍，记住了哪一段有煤气灯、哪一段住着巡夜的警察。回家后，Klara在旧日历背面画了一条线，标出换乘的站名；那条线短得可笑，却比课本上的任何地图都清楚。
  _effects: state_parameter yf18-runaway-plan.preparation 57 -> 69; state_parameter yf18-runaway-plan.suspicion 33 -> 35; mood 0.010000000000000009_

- **1928.01** `state_tick:apprenticeship-contract/workshop-year/learned` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Klara又学会了一道工序。师傅没有夸，只把下一块料推到面前。
  _effects: state_parameter apprenticeship-contract.progress 53 -> 73; skill; mood 0.020000000000000018_

- **1928.01** `state_expire:yf18-first-awakening` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Klara的「第一次心动」到期；相关安排结束。
  _effects: state_remove yf18-first-awakening state:world-vienna-1912:91; flag -yf18_first_awakening_active_

- **1928.01** `p9-childhood-youth-aspiration.ask-a-mentor/asked-to-come-back-later` tags: adolescence, education, aspiration, school, books, club, exam, task
  Maria Kral看了看Klara抄的字母表，说大小不一，让他回去用直尺画格子重抄一遍，下个月再来。少年把纸折好，在咖啡馆门口站了一会儿，走回印刷厂时绕到排字房窗外看了很久。
  _effects: mood -0.030000000000000027; skill; flag +mentor_pending_retry; relation acquaintance with person-maria-kral_

- **1928.02** `yf18-firstlook.tram-glove::ctx-vienna-reform-1930::milieu-school/return-it-at-the-gate` tags: first_love, love, tram, glove, youth, courtship, reform, medical
  下一站，Klara追下车，把那只手套递还给Elisabeth Bauer。Elisabeth Bauer说了一声谢谢，手指在毛线手套里缩了一下；Klara回到车上才发现自己坐过了两站，只好沿着环城路走回家。
  _effects: state_add yf18-first-awakening state:world-vienna-1912:159; mood 0.030000000000000027_

- **1928.08** `r1-fam.sibling-rivalry::ctx-vienna-reform-1930::milieu-school/rivalry.lost` tags: family, siblings, rivalry, apprenticeship, craft, reform, medical, schooling
  Maria Kral收了Elisabeth Bauer。Klara在门口站到天黑，回家把父亲的工具箱打开，照着记忆里的样子练。Katharina Bauer进来，说别跟你兄弟争，争来的东西不长久；Klara没有抬头，刨花落在脚背上，像一层薄雪。
  _effects: mood -0.10000000000000003; flag +lost_apprenticeship_to_sibling; role; skill; relation rival with person-elisabeth-bauer_

- **1928.09** `yf18-dare.prater-slide::ctx-vienna-reform-1930::milieu-school/caught-by-the-watchman` tags: dare, prater, fairground, comic, friendship, reform, medical, schooling
  Anton Weiss的灯从摩天轮那边晃过来时，Elisabeth Bauer已经跑没影了，Klara的鞋带却挂在木槽边。Anton Weiss把Klara带到园门口，记下住址，说星期一让学校来领人；Klara一路上只担心Elisabeth Bauer会不会把这件事讲给全班。
  _effects: reputation -0.05; mood -0.03999999999999998; flag +yf18_prater_caught; cash -2 (a fine paid at the Prater office)_

- **1929.01** `yf18-dare.bridge-rail::ctx-vienna-reform-1930::milieu-school/climb-back-down` tags: dare, bridge, river, friendship, risk, reform, medical, schooling
  Klara的手已经搭上栏杆，听见桥下有驳船拉笛，忽然把手收回来。Emil骂了一句，Elisabeth Bauer却把围巾解下来递给Klara；三个人在桥头站了一会儿，谁也没有再提这件事。
  _effects: state_parameter yf18-first-awakening.intensity 45 -> 48; state_parameter yf18-first-awakening.nerve 25 -> 20; mood -0.010000000000000009_

- **1929.01** `r1-cul.fan-letter::ctx-vienna-reform-1930::milieu-school/quoted-without-permission` tags: culture, letters, fandom, literacy, ambition, reform, medical, schooling
  Klara的信寄出半年，没有回音。后来Elisabeth Stein在一篇文章里引用了这封信，没有署名，只写一个读者说。Klara在报上读到自己的句子，先是高兴，随后发现文章里的意思和自己写的相反。
  _effects: mood -0.08000000000000002; reputation 0.03; flag +letter_quoted_without_permission; relation acquaintance with person-materialized-world-vienna-1912-38; knowledge “the quoted sentence means the opposite of what was written”; relation acquaintance with person-materialized-world-vienna-1912-38; relation acquaintance with person-materialized-world-vienna-1912-46_

- **1929.01** `state_expire:yf18-runaway-plan` tags: yf18-runaway-plan, escape, youth, plan, home, travel, risk, state
  Klara的「床底下的包袱」到期；相关安排结束。
  _effects: state_remove yf18-runaway-plan state:world-vienna-1912:116; flag -yf18_runaway_plan_active_

- **1929.01** `state_tick:yf18-first-awakening/half-year-of-glances/answered-glance` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Klara在教堂门口或学校走廊里又遇见Elisabeth Bauer。这一次对方先点了头，Klara准备好的整段话全忘了，只把手里的书换到另一只手上；回家后Klara才发现，自己把书拿倒了。
  _effects: state_parameter yf18-first-awakening.intensity 48 -> 53; state_parameter yf18-first-awakening.nerve 20 -> 28; state_parameter yf18-first-awakening.reciprocated false -> true; mood 0.02999999999999997_

- **1929.01** `state_expire:apprenticeship-contract` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick, state:apprenticeship-contract
  Klara的「学徒契约」到期；相关安排结束。
  _effects: state_remove apprenticeship-contract state:world-vienna-1912:90; role_

- **1929.01** `p9-childhood-apprenticeship.cover-for-sibling/forewoman-catches` tags: adolescence, work, apprenticeship, labour, training, family, task, task:family
  客户刚把床单接过去，Maria Moser就从楼梯口上来，盯着Klara看了两秒，说“你不是这家的”。Maria Moser当场把工钱收回，说明天要去找Hermann Bauer的雇主。Klara站在门口，手里还攥着空筐绳，回家一路上没吃东西，Hermann Bauer问起来，只摇了摇头。
  _effects: mood -0.06999999999999995; relation kin with person:evt:world-vienna-1912:000324:child; health -0.020000000000000018 (白跑一趟，路上没吃东西); relation acquaintance with person-materialized-world-vienna-1912-60_

- **1929.09** `yf18-runaway.bundle::ctx-vienna-reform-1930::milieu-school/hide-the-bundle` tags: runaway, escape, family, plan, night_train, reform, medical, schooling
  Klara把两件衬衫、一双袜子和小时候的洗礼证明卷进一块旧桌布，塞到床底下。Katharina Bauer在厨房里数硬币，数了三遍都没有抬头；Klara躺在黑暗里，听见夜车从远处经过，铁轨的声音一直传到枕头下面。
  _effects: state_add yf18-runaway-plan state:world-vienna-1912:185; flag +yf18_bundle_hidden; mood 0.020000000000000018_

- **1929.10** `r15-work.master-takes-on::ctx-vienna-reform-1930::milieu-school/signed-contract` tags: work, craft, apprentice, trade, poverty, reform, medical, schooling
  Ferdinand Berg把学徒契约摊在桌上，指给Klara看期限、工钱和出师考试。Klara签了名，第二天站到刨床前，手指上多了第一道木刺。
  _effects: relation employer with person-materialized-world-vienna-1912-12; state_add apprenticeship-contract state:world-vienna-1912:184; relation acquaintance with person-materialized-world-vienna-1912-12; education apprenticeship_

- **1930.01** `major-work-first-employment/hired-by-the-day` tags: work, employment, unemployment, major
  Buchdruckerei Winter & Söhne只招日工。Klara天亮前到门口，名字写在临时名单上，干一天算一天，一天一克朗，月底结二十六克朗。工头说下个月可能有正式位置，也可能没有；Klara把每天的工时记在烟盒背面，怕漏掉一天。
  _effects: employment Tagelöhner @ org-winter-print; role; cash 2 (first daily pay advance); relation colleague with person-materialized-world-vienna-1912-5; flag +day_labour_only_

- **1930.01** `major-family.proposal-accepted/proposal-accepted.registry-office` tags: family, marriage, household, major, lifecycle, partnership
  Klara和Otto Berg先在教区教堂行礼，神父把名字写进婚册，随后去市政办事处补登记。证人是楼下的洗衣妇和Otto Berg的工头。两人用盖过章的收据换了半公斤咖啡，回家把两只箱子并排塞进床底。收据压在镜子下面，镜角还夹着洗衣妇送的纸花。没有宴席，晚上照常上工，邻居第二天才知道他们结了婚。
  _effects: relation partner with person-materialized-world-vienna-1912-24; household; role; role; cash -6 (registry fee and coffee); relation acquaintance with person-materialized-world-vienna-1912-24_

- **1930.01** `absurd15-wish.crown-for-a-day::ctx-vienna-medical-1930::milieu-university/festival-king-only` tags: wish, power, crown, office, irony, festival, medical, university
  代表团没有带来任命书，只带来一套戏服：市庆游行需要一个“国王”，一天两场，管一顿饭。Klara穿上戏服时，围观的人鼓起掌来。掌声是真的，王冠是假的，晚饭也是真的。
  _effects: state_add stage-sovereign state:world-vienna-1912:215; cash 2 (游行演出的酬劳); flag +hired_as_festival_king; flag +stage_sovereign; reputation 0.04_

- **1930.01** `state_tick:yf18-first-awakening/half-year-of-glances/answered-glance` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Klara在教堂门口或学校走廊里又遇见Elisabeth Bauer。这一次对方先点了头，Klara准备好的整段话全忘了，只把手里的书换到另一只手上；回家后Klara才发现，自己把书拿倒了。
  _effects: state_parameter yf18-first-awakening.intensity 53 -> 58; state_parameter yf18-first-awakening.nerve 28 -> 36; state_parameter yf18-first-awakening.reciprocated true -> true; mood 0.030000000000000027_

- **1930.01** `state_tick:apprenticeship-contract/workshop-year/learned` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Klara又学会了一道工序。师傅没有夸，只把下一块料推到面前。
  _effects: state_parameter apprenticeship-contract.progress 10 -> 30; skill; mood 0.020000000000000018_

- **1930.01** `state_tick:yf18-runaway-plan/three-months-of-preparation/route-memorised` tags: yf18-runaway-plan, escape, youth, plan, home, travel, risk, state
  Klara把去车站的路又走了一遍，记住了哪一段有煤气灯、哪一段住着巡夜的警察。回家后，Klara在旧日历背面画了一条线，标出换乘的站名；那条线短得可笑，却比课本上的任何地图都清楚。
  _effects: state_parameter yf18-runaway-plan.preparation 15 -> 27; state_parameter yf18-runaway-plan.suspicion 13 -> 15; mood 0.010000000000000009_

- **1930.01** `p9-work-career.clerk-post/p9-work-career.clerk-post.archive` tags: work, career, craft, clerk, education, task, office, application
  Klara的信写得好，笔画干净，算盘也快，可速记一栏空了大半。Helene Bauer把卷子批了“文书可用，速记欠熟”，人事科把他安排到档案室抄旧保单，日薪两克朗四十赫勒，比正式办事员少一截。桌旁没有窗，只有一盏悬在头顶的灯，他抄到下班时右肩发僵。
  _effects: cash 2.4 (档案室抄写日薪); skill; health -0.020000000000000018 (阴面档案室坐久了肩颈发硬); flag +awaiting_clerk_slot; relation acquaintance with person-materialized-world-vienna-1912-48_

- **1930.02** `state_reaction:yf18-runaway-plan/a-family-question` tags: yf18-runaway-plan, escape, youth, plan, home, travel, risk, state
  饭桌上又为房租吵起来。Klara把面包掰成很小的块，听见父亲说“这个家养不起闲人”；Klara没有回嘴，只在心里把格拉茨的地址又背了一遍。
  _effects: state_parameter yf18-runaway-plan.suspicion 5 -> 13; state_parameter yf18-runaway-plan.resolve 55 -> 53_
  _causes: evt:world-vienna-1912:004016_

- **1930.10** `ad20-neighbor-dispute::ctx-vienna-reform-1930::milieu-school/the-line-moves` tags: neighbor, dispute, home, everyday, public, obligation, reform, medical
  隔壁把晾衣绳往Klara这边挪了一尺，水滴正好落在窗台上。Klara拿粉笔在墙上画了一道线；Helene Moser看见了，又把绳子挪回去半尺。两个人都觉得自己让了步，晚饭时却都把窗户关得很紧。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-10; mood -0.020000000000000018; flag +laundry_line_dispute_

- **1931.01** `vienna-family-childbirth/stillbirth` tags: family, childbirth, death, lifecycle, injury
  孩子生下来没有哭声。接生的人把布盖上去，Otto Berg在楼梯间坐了很久；Klara在床上躺了三天，家里没有办葬礼，只去市政办事处登记，付了六克朗。登记表上母亲一栏写着Klara的名字；此后邻居提起Klara，只说“那个没了孩子的母亲”，柜子里还留着没拆的襁褓。
  _effects: health -0.12 (stillbirth); cash -6 (midwife and burial); role_

- **1931.01** `absurd15-wish.crown-for-a-day::ctx-vienna-reform-1930::milieu-school/the-delegation-never-comes` tags: wish, power, crown, office, irony, festival, reform, medical
  Klara等了一整天，代表团没有来。傍晚，Klara在窗户里看见游行队伍从街口经过，新的“国王”骑着借来的白马，朝人群挥手。Klara把订做的戏服退掉，押金没有拿回来。
  _effects: cash -2 (订做戏服的押金); mood -0.040000000000000036; flag +wish_crown_failed_

- **1931.01** `state_expire:yf18-first-awakening` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Klara的「第一次心动」到期；相关安排结束。
  _effects: state_remove yf18-first-awakening state:world-vienna-1912:159_

- **1931.01** `state_tick:apprenticeship-contract/workshop-year/learned` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Klara又学会了一道工序。师傅没有夸，只把下一块料推到面前。
  _effects: state_parameter apprenticeship-contract.progress 30 -> 50; skill; mood 0.020000000000000018_

- **1931.01** `state_expire:yf18-runaway-plan` tags: yf18-runaway-plan, escape, youth, plan, home, travel, risk, state
  Klara的「床底下的包袱」到期；相关安排结束。
  _effects: state_remove yf18-runaway-plan state:world-vienna-1912:185_

- **1931.01** `state_expire:stage-sovereign` tags: stage-sovereign, performance, theatre, pretend, status, irony, power, no-real-authority
  Klara的「舞台上的君主」到期；相关安排结束。
  _effects: state_remove stage-sovereign state:world-vienna-1912:215; flag -stage_sovereign_

- **1931.01** `p9-social-relationship-initiative.introduce-two-people/overpraise` tags: courtship, friendship, family, social, initiative, housing, task, task:social
  介绍时把两边都夸过了头，说老友是印厂里最靠得住的人，说女工的手艺整条街都找不出第二个。话太多，两人反倒拘谨起来，各自看窗外。咖啡凉了，坐了不到一个钟头就散了，出门时谁也没提再见面。
  _effects: cash -0.9 (三杯咖啡和点心); relation acquaintance with person-otto-winter; mood -0.050000000000000044_

- **1931.06** `vienna-legacy-worklife.apprentice-wage/apprentice-wage.hand-to-family` tags: legacy, work, family, reform, ordinary_life
  家里那间屋子朝北，下午的光只够照亮桌角。Klara把车钱塞进外套内袋，听见母亲在数硬币时嘴里念念有词。师兄说过别到处讲，Klara就没讲，连妹妹问起也只说“够用”。
  _effects: cash 3 (按新规定多出的学徒工资交给家里); food; relation colleague with person-materialized-world-vienna-1912-48_

- **1931.06** `statistical_infection`
  Klara在Leopoldstädter Volksschule病倒了，肺炎让身体发热、虚弱，接下来的日子只能卧床。

- **1931.09** `statistical_illness_worsened`
  Klara的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1931.10** `vienna-printshop-daily.wage-shortfall/wage-argue-and-win` tags: work, factory, labour, social
  Josef Berg 2和另外两个人跟着Klara去了办公室门口。Buchdruckerei Winter & Söhne最后从抽屉里摸出几枚硬币，边给边在本子上写了一行字。
  _effects: cash 1 (退还的部分扣款); relation colleague with person-materialized-world-vienna-1912-59; relation colleague with person-materialized-world-vienna-1912-59; relation acquaintance with person-materialized-world-vienna-1912-59_

- **1931.12** `statistical_death/pneumonia` tags: death
  Klara在Leopoldstädter Zinshaus, gemeinsamer Gang发起高烧，咳嗽越来越深。邻居帮忙去请医生，医生到时只留下药粉和一张账单；几天后呼吸变得很浅。Otto Berg在场。
  _effects: death (肺炎)_
## Mitzi

Born 1912.01, died 1915.04 (age 3).
Education: none 0; occupation: none; roles: infant, child.

### State snapshot
- wish-knowledge [person] (ended 1915.4: owner_died) parameters={"intensity":0.55,"fixation":0.5,"irony":0.3} links={} ticks=0

### 5 subject events

- **1914.03** `vienna-infant-household.croup/doctor-call` tags: infancy, health, family, home
  Alois Lechner打发邻居去请街角的医生。医生提着皮包来，听了听胸口，留下半瓶药水，收走一克朗。Mitzi三天后不再咳得蜷成一团。
  _effects: cash -1 (医生出诊费和药水钱); health 0.021666666666666723 (服了止咳药水); relation acquaintance with person-helene-winter_

- **1914.10** `statistical_infection`
  Mitzi在Leopoldstädter Zinshaus, gemeinsamer Gang病倒了，肺炎让身体发热、虚弱，接下来的日子只能卧床。

- **1914.12** `statistical_illness_worsened`
  Mitzi的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1915.03** `statistical_illness_worsened`
  Mitzi的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1915.04** `statistical_death/pneumonia` tags: death
  Mitzi在Leopoldstädter Zinshaus, gemeinsamer Gang发起高烧，咳嗽越来越深。邻居帮忙去请医生，医生到时只留下药粉和一张账单；几天后呼吸变得很浅。Franz Lechner在场。
  _effects: death (肺炎)_
## Josef

Born 1912.01, died 1913.01 (age 1).
Education: none 0; occupation: none; roles: infant, child.

### State snapshot
- wish-craft [person] (ended 1913.1: owner_died) parameters={"intensity":0.55,"fixation":0.5,"irony":0.3} links={} ticks=0

### 1 subject events

- **1913.01** `statistical_death/other` tags: death
  Josef在Bauer-Wohnung, Leopoldstadt突发急病，高热和虚弱持续了几天。医生没能给出明确诊断，Josef在一个夜里去世。Anna Bauer在场。
  _effects: death (急性疾病)_
## Rosa

Born 1912.01, alive at 1957.
Education: apprenticeship 0; occupation: none; roles: infant, child, workshop_dogsbody, day_laborer, neighbourhood_helper, partner, movement_member, office:夜班司机, mother, registered_resident, watched_by_neighbours, chorus_performer, liberated_1945, refused_lender, adoptive_parent, teaching_case, denouncer.

### State snapshot
- yf18-first-awakening [person] (ended 1927.1: duration expired) parameters={"intensity":55,"nerve":28,"talk":10,"reciprocated":true,"secret":true} links={"beloved":"Emil"} ticks=2
- apprenticeship-contract [person] (ended 1928.1: the master ended the contract) parameters={"progress":23,"failures":2,"trade":"木工","paid":false} links={} ticks=3
- yf18-runaway-plan [person] (ended 1928.1: duration expired) parameters={"preparation":47,"suspicion":25,"resolve":68,"destination":"格拉茨","ticket":true} links={} ticks=2
- yf18-first-awakening [person] (ended 1931.1: duration expired) parameters={"intensity":65,"nerve":35,"talk":19,"reciprocated":true,"secret":true} links={"beloved":"Ferdinand Moser"} ticks=4
- failed-apprentice [person] (ended 1933.1: duration expired) parameters={} links={} ticks=1
- hs18-street-witness [person] (ended 1937.1: duration expired) parameters={"certainty":35,"danger":55,"retellings":1,"claim":"我把在面包队里看见的那张脸卖给了记者。","quiet":false} links={} ticks=6
- oj18-odd-apprenticeship [person] (ended 1935.1: duration expired) parameters={"trust":2,"strangeKnowledge":30,"reliability":45,"nightsWorked":0,"post":"动物园夜班饲养员"} links={} ticks=2
- oj18-workplace-legend [person] (ended 1935.1: duration expired) parameters={"legend":28,"truth":50,"oddity":35,"toldCount":2} links={} ticks=2
- oj18-odd-apprenticeship [person] (ended 1940.1: duration expired) parameters={"trust":47,"strangeKnowledge":38,"reliability":55,"nightsWorked":48,"post":"夜班出租车司机"} links={} ticks=3
- ld18-public-desire [person] (ended 1940.1: duration expired) parameters={"spectacle":73,"rumorHeat":66,"defiance":40,"protection":10,"shame":23} links={} ticks=3
- office-under-siege [person] (ended 1940.1: duration expired) parameters={"exposure":26,"support":65,"months":1,"cause":"newspaper photograph","positionId":"pos:taxi:person-phase15-Rosa-world-vienna-1912-evt:world-vienna-1912:006663:夜班司机:6663"} links={} ticks=2
- fa17-starving-artist [person] (ended 1950.1: duration expired) parameters={"craft":58,"recognition":23,"need":54,"integrity":62} links={} ticks=6
- fa17-muse [person] (ended 1946.1: duration expired) parameters={"inspiration":58,"dependence":51,"credit":10,"autonomy":65} links={"artist":"Josef Huber 2"} ticks=7
- ml18-reversal [person] (ended 1944.1: duration expired) parameters={"strain":66,"swing":-61,"public":true,"story":"银行门口的队伍"} links={} ticks=3
- institution-purge [organization] (ended 1944.1: duration expired) parameters={"target":"未说明","intensity":0.37,"denunciations":3,"vacancies":1,"reviewOpen":true} links={} ticks=1
- hs18-street-witness [person] (ended 1947.1: duration expired) parameters={"certainty":73,"danger":45,"retellings":0,"claim":"我签字证明那架钢琴是无人认领的。","quiet":false} links={} ticks=5
- bc18-bureaucratic-ghost [person] (ended 1950.1: duration expired) parameters={"fileDepth":63,"sightings":2,"risk":32,"duplicates":2,"officialStatus":"同时活着和死了","alias":"少了一个字母的名字"} links={} ticks=4
- institution-purge [organization] (ended 1949.1: duration expired) parameters={"target":"未说明","intensity":0.32999999999999996,"denunciations":2,"vacancies":1,"reviewOpen":true} links={} ticks=1
- ml18-sudden-fortune [household] (ended 1950.1: duration expired) parameters={"principal":12,"spent":0,"claims":5,"public":true,"source":"转卖的金矿股份"} links={} ticks=2
- ad20-private-bargain [person] (ended 1951.1: duration expired) parameters={"leverage":50,"trust":55,"debt":55,"exit":20} links={"beneficiary":"Katharina Lechner"} ticks=1
- ml18-sudden-fortune [household] (ended 1953.1: duration expired) parameters={"principal":55,"spent":5,"claims":3,"public":true,"source":"同一组号码"} links={} ticks=2
- raising-child [household] (active) parameters={"caregiverBurden":47,"schoolProgress":29,"childConfidence":55,"careDebt":0,"schoolEnrolled":false,"leftHome":false} links={"child":"Luise Berg"} ticks=2
- sm18-missing-object [person] (active) parameters={"attachment":25,"leads":6,"suspicion":36,"object":"孩子的洗礼铜牌"} links={} ticks=2
- raising-child [household] (active) parameters={"caregiverBurden":42,"schoolProgress":31,"childConfidence":55,"careDebt":0,"schoolEnrolled":false,"leftHome":false} links={"child":"Hermann Berg"} ticks=1
- raising-child [household] (active) parameters={"caregiverBurden":42,"schoolProgress":31,"childConfidence":55,"careDebt":0,"schoolEnrolled":false,"leftHome":false} links={"child":"Otto Berg"} ticks=1
- df18-uncanny-mark [person] (active) parameters={"attention":10,"pain":0,"claimed":"blessing","concealed":true} links={} ticks=0

### 250 subject events

- **1913.11** `vienna-life-infant-feeding/fed-enough` tags: infancy, food, household
  Rosa Lechner在Lechner-Wohnung, Leopoldstadt给Rosa喂奶，随后把洗净的布尿片挂在窗边。孩子吃饱后睡着了，锅里还留着半碗燕麦糊。
  _effects: cash -2 (milk and oatmeal)_

- **1914.09** `iw18-infancy.first-word::ctx-vienna-1912::milieu-tenement/the-dead-grandmothers-name` tags: infancy, first_word, memory, family, wonder, eerie, vienna, urban
  Rosa扶着桌沿站起来，指着门口的空处，清清楚楚叫出一个名字。屋里没人教过这个词；Rosa Lechner手里的铝勺停在半空。那是去年冬天埋掉的老人的名字，窗外正好有送煤的车经过，铁轮压过石缝。
  _effects: mood -0.03; knowledge “孩子说出的第一个词，是去年死去的祖母的名字。”; flag +first_word_dead_name_

- **1916.02** `p9-childhood-household.name-day-gift/old-shoes` tags: childhood, family, household, home, siblings, illness, neighbors, injury
  报纸窸窸窣窣打开，露出一双旧鞋。Rosa认出鞋帮上的补丁，是弟妹穿剩下的。Rosa把脚伸进去，脚后跟还空着一指，脚趾却挤在前头。Alois Lechner看了看，说垫层布就好了，起身去柜子里翻布头。
  _effects: mood -0.02; relation kin with person-alois-lechner; health -0.01999999999999999 (鞋挤脚走路发疼)_

- **1917.07** `p9-childhood-household.supper-bowl/saved-bread-for-morning` tags: childhood, family, household, home, siblings, illness, neighbors
  面包分到Rosa手里时，Rosa说在巷口吃过了，把它搁在桌角，用一块干净布盖上。夜里Rosa翻来覆去，胃里像有只手在拧，Mitzi Lechner的呼吸倒很匀。天亮后Alois Lechner掀开布，面包边已经硬得发白，Alois Lechner拿刀切成三份。
  _effects: food; relation kin with person-alois-lechner_

- **1917.11** `vienna-early-childhood.fever-night/doctor-bill` tags: childhood, family, home, street
  Rosa烧得嘴唇发干，Rosa Lechner把湿布敷上去，凉了再换，撑到窗外发白才去请医生。医生把听诊器贴在Rosa背上，留下三包药粉，收了一古尔登。Rosa Lechner从围裙内袋里摸出硬币，一枚一枚排在桌上，差一点不够。
  _effects: cash -1 (医生的诊金); health 0.05999999999999999 (服药后退烧); mood -0.05000000000000002_

- **1918.01** `p9-gap-childhood-chores.fetch-coal/coal-refused-nuggets` tags: childhood, household, chores, school, task, daily, coal, errand
  Rosa空手站在窗口，听掌柜说“叫你Alois Lechner来”，耳朵一直红到脖子。后墙的渣堆冻得硬，Rosa用鞋尖刨开表层，把煤核一颗颗捡进围裙。回家路上碰到同巷的孩子，Rosa把纸袋往身后藏，进门才交给Alois Lechner。
  _effects: mood -0.04000000000000001; food; skill; relation acquaintance with person-materialized-world-vienna-1912-5_

- **1918.02** `p9-childhood-household.fever-night/hospital-deposit` tags: childhood, family, household, home, siblings, illness, neighbors
  围巾从Rosa的头一直裹到脚，Rosa Lechner抱着人下楼，在电车踏板上差点滑倒。急诊窗口先收押金，Rosa Lechner把内袋里的票子一张张抹平，数出六克朗。Rosa躺在观察室的窄床上，头顶的灯管嗡嗡响，Rosa Lechner的手一直按着被角。
  _effects: cash -6 (医院急诊押金和电车票（其中0.5克朗记入债务）); health 0.08 (在医院接受处理); mood -0.039999999999999994_

- **1919.01** `p9-gap-childhood-chores.market-line/line-sold-out-potatoes` tags: childhood, household, chores, school, task, daily, market, food
  木窗“咔”地合上，Rosa的布袋还敞着口。伙计隔着板缝说下星期再来。Rosa在墙根站了一会儿，把硬币排在掌心数了两遍，走到旁边土豆摊前，挑了几个小的，让摊主当面过秤。家里人晚上把钱和土豆倒在桌上，重新数了一遍。
  _effects: food; mood -0.03; skill; relation acquaintance with person-materialized-world-vienna-1912-10; relation acquaintance with person-materialized-world-vienna-1912-25_

- **1920.01** `p9-gap-childhood-chores.mind-sibling/sibling-carried-afternoon` tags: childhood, household, chores, school, task, daily, sibling, care
  Emil Lechner哭得打嗝，手指一直朝井台方向指。Rosa蹲下把Emil Lechner驮上背，沿着墙根走，数砖缝给Emil Lechner听：一、二、三……数到第四圈，背上的呼吸才匀了。天黑时Rosa的胳膊麻得抬不过肩，Rosa Lechner回来接过孩子，Rosa扶着门框甩了好一会儿手。
  _effects: health -0.02999999999999997 (背弟妹走了一下午，胳膊酸痛); skill; relation kin with person:evt:world-vienna-1912:000283:child_

- **1921.01** `vienna-childhood-friends.courtyard-race/fell-on-wet-stones` tags: childhood, social, school, street, injury
  Rosa想从床单底下钻过去，脚下一滑，膝盖磕在石板棱上。Rosa Lechner听见哭声出来，先看了看伤口，又回去端水。手帕扎得很紧，Rosa试着站起来，被Rosa Lechner按回台阶上。
  _effects: health -0.03999999999999998 (膝盖在湿石板上磕破); relation acquaintance with person-rosa-lechner_

- **1921.01** `p9-gap-childhood-chores.laundry-help/laundry-three-heller` tags: childhood, household, chores, school, task, daily, laundry, work
  床单浸了碱水，沉得拽不动。Rosa站在木凳上，把湿布一点点递过绳，水顺着肘弯滴进袖口。Helene Winter在绳头数夹子，最后一条挂好，从围裙口袋里摸出三枚赫勒，按进Rosa掌心。晚上洗手时，虎口那道口子被水一蜇，Rosa才看见。
  _effects: cash 0.03 (帮邻居晾床单挣的三赫勒); health -0.02999999999999997 (碱水泡手，虎口裂开); relation acquaintance with person-helene-winter_

- **1922.01** `p9-gap-childhood-chores.market-line/line-sold-out-potatoes` tags: childhood, household, chores, school, task, daily, market, food
  木窗“咔”地合上，Rosa的布袋还敞着口。伙计隔着板缝说下星期再来。Rosa在墙根站了一会儿，把硬币排在掌心数了两遍，走到旁边土豆摊前，挑了几个小的，让摊主当面过秤。家里人晚上把钱和土豆倒在桌上，重新数了一遍。
  _effects: food; mood -0.03; skill; relation acquaintance with person-materialized-world-vienna-1912-39_

- **1922.03** `vienna-childhood-street.market-errand/errand-lost-coin` tags: childhood, street, social, home
  菜摊前的地面是湿的。Rosa弯腰捡土豆时，一枚铜板从指缝里滑出去，顺着水沟格栅掉了下去。Rosa把剩下的钱摊在柜台上，让摊主帮忙数，还是少了三十克鲁泽。晚上Rosa Lechner把钱一枚枚排开，问了三遍怎么少的，Rosa每答一次，声音就低一点。
  _effects: cash -0.3 (铜板掉进下水道); relation kin with person-rosa-lechner; mood -0.06_

- **1922.11** `p9-childhood-household.water-and-coal/helped-neighbor-for-bread` tags: childhood, family, household, home, siblings, illness, neighbors
  煤球滚到楼梯口，Rosa一颗颗追回来，膝盖在台阶上磕了一下。Friedrich Hofer扶着门框说够了够了，Rosa还是把最后一颗放进筐里。老人塞来一块面包，Rosa边跑边咬了一口，到Leopoldstädter Volksschule时嘴角还沾着煤灰。
  _effects: food; relation acquaintance with person-friedrich-hofer; reputation -0.02_

- **1923.01** `p9-gap-childhood-chores.laundry-help/laundry-dragged-docked-pay` tags: childhood, household, chores, school, task, daily, laundry, work
  床单太长，Rosa拖着一角往绳子走，布边扫过煤渣，立刻黑了一道。Luise Kral弯腰看了看，脸沉下来，说这角得重洗，工钱扣一半。Rosa接过一赫勒，蹲在盆边用清水搓那一道灰，搓到指节发红，水面上还浮着煤末。
  _effects: cash 0.01 (被扣后只剩一赫勒); mood -0.05000000000000002; relation acquaintance with person-luise-kral; relation acquaintance with person-materialized-world-vienna-1912-43_

- **1923.11** `vienna-childhood-friends.courtyard-race/fell-on-wet-stones` tags: childhood, social, school, street, injury
  Rosa想从床单底下钻过去，脚下一滑，膝盖磕在石板棱上。Hermann Kral听见哭声出来，先看了看伤口，又回去端水。手帕扎得很紧，Rosa试着站起来，被Hermann Kral按回台阶上。
  _effects: health -0.040000000000000036 (膝盖在湿石板上磕破); relation acquaintance with person-hermann-kral_

- **1924.05** `vienna-youth-threshold.sibling-departure/coins-into-box` tags: adolescence, school, work, family, transition
  Mitzi Lechner的箱子摊在床板上，里面是两件衬衫、一双旧靴和母亲塞的一小袋面粉。Rosa把攒了半年的零钱数到第三遍，一共一克朗二十赫勒，全塞进箱角的袜子里。Mitzi Lechner看见了，没说话，只把箱子扣上，铜扣响了一声。
  _effects: cash -1.2 (把攒下的零钱塞给离家的兄姐); relation kin with person-mitzi-lechner; mood -0.030000000000000027_

- **1924.12** `vienna-adolescence.workshop-apprentice/apprenticeship-accepted` tags: adolescence, school, work, family, social
  Buchdruckerei Winter & Söhne先看Rosa的手，又让Rosa推两下刨子试试。Rosa用力过猛，刨刀啃进木头，Buchdruckerei Winter & Söhne皱眉，让再来一遍。第二遍木花薄而匀。Buchdruckerei Winter & Söhne说“留下”，当面点了三克朗给Rosa Lechner，算头一周饭钱，又指了指墙上的钟，说迟到一刻钟扣半天。
  _effects: cash 3 ({subject}学徒首周的膳食预付款); education apprenticeship; reputation 0.1; relation kin with person-rosa-lechner_

- **1925.01** `r13-fam.help-homework::ctx-vienna-reform-1930::milieu-tenement/tears-on-the-page` tags: task, family, school, homework, sibling, literacy, reform, medical
  Maria Lechner把铅笔芯写断了两次，第三遍还是算错，眼泪滴在本子上，把墨迹洇开。Rosa把本子拿开，说再写一遍，孩子却把椅子往后一推。母亲在灶边喊别吵，Rosa只好把豆子收进碗里，听见Maria Lechner在床上抽鼻子。
  _effects: mood -0.06; flag +homework_ended_in_tears; relation kin with person:evt:world-vienna-1912:000362:child; condition_

- **1925.04** `r15-work.master-takes-on::ctx-vienna-reform-1930::milieu-tenement/unpaid-trial` tags: work, craft, apprentice, trade, poverty, reform, medical, schooling
  Hermann Moser先说试三个月，不给工钱，只管一顿午饭。家里同意了，因为多一张嘴比多一双手更难。Rosa每天最早到，最晚走，三个月后师傅才把契约拿出来。
  _effects: food; mood -0.03999999999999998; state_add apprenticeship-contract state:world-vienna-1912:94; relation acquaintance with person-materialized-world-vienna-1912-16; education apprenticeship; role_

- **1925.07** `vienna-adolescence.brothers-torn-jacket/sell-the-coat` tags: adolescence, school, work, family, social
  旧货贩子把外套翻过来看了看里布，伸出两个手指。Rosa接过两枚克朗，塞进鞋垫底下，走回家时脚心一直硌着。晚上Rosa Lechner站在门后，手搭在空衣钩上，问外套呢。Rosa说不知道，声音比平时高了一点。
  _effects: cash 2 (卖掉哥哥旧外套); relation kin with person-rosa-lechner; mood -0.03999999999999998_

- **1925.07** `yf18-firstlook.tram-glove::ctx-vienna-reform-1930::milieu-tenement/return-it-at-the-gate` tags: first_love, love, tram, glove, youth, courtship, reform, medical
  下一站，Rosa追下车，把那只手套递还给Emil。Emil说了一声谢谢，手指在毛线手套里缩了一下；Rosa回到车上才发现自己坐过了两站，只好沿着环城路走回家。
  _effects: state_add yf18-first-awakening state:world-vienna-1912:93; mood 0.02999999999999997; flag +yf18_first_awakening_active_

- **1926.01** `yf18-friend.two-tickets::ctx-vienna-reform-1930::milieu-tenement/confront-at-the-cloakroom` tags: first_love, friendship, betrayal, dance, tickets, reform, medical, schooling
  Rosa在衣帽间堵住Klara，问那两张票怎么到了Lena手里。Klara说Rosa从来没敢开口，自己只是替Rosa把话说了；Rosa把票根揉成一团，塞进Klara的西装口袋，转身时撞翻了侍者的托盘。
  _effects: state_parameter yf18-first-awakening.intensity 45 -> 50; state_parameter yf18-first-awakening.talk 0 -> 10; state_parameter yf18-first-awakening.nerve 25 -> 20; relation friend with person-phase15-Klara-world-vienna-1912; relation friend with person-phase15-Lena-world-vienna-1912; reputation -0.020000000000000004; mood -0.04999999999999999_

- **1926.01** `yf18-dare.prater-slide::ctx-vienna-reform-1930::milieu-tenement/caught-by-the-watchman` tags: dare, prater, fairground, comic, friendship, reform, medical, schooling
  Friedrich Hofer的灯从摩天轮那边晃过来时，Klara已经跑没影了，Rosa的鞋带却挂在木槽边。Friedrich Hofer把Rosa带到园门口，记下住址，说星期一让学校来领人；Rosa一路上只担心Klara会不会把这件事讲给全班。
  _effects: reputation -0.05; mood -0.03999999999999998; flag +yf18_prater_caught; relation friend with person-phase15-Klara-world-vienna-1912; cash -2 (a fine paid at the Prater office)_

- **1926.01** `state_tick:yf18-first-awakening/half-year-of-glances/answered-glance` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Rosa在教堂门口或学校走廊里又遇见Emil。这一次对方先点了头，Rosa准备好的整段话全忘了，只把手里的书换到另一只手上；回家后Rosa才发现，自己把书拿倒了。
  _effects: state_parameter yf18-first-awakening.intensity 50 -> 55; state_parameter yf18-first-awakening.nerve 20 -> 28; state_parameter yf18-first-awakening.reciprocated false -> true; mood 0.02999999999999997_

- **1926.01** `state_tick:apprenticeship-contract/workshop-year/learned` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Rosa又学会了一道工序。师傅没有夸，只把下一块料推到面前。
  _effects: state_parameter apprenticeship-contract.progress 8 -> 28; skill; mood 0.020000000000000018_

- **1926.01** `r14-edu.tutoring-sibling::ctx-vienna-reform-1930::milieu-tenement/sibling-improved` tags: education, tutored_sibling, family, tutoring, reform, medical, schooling, home
  Maria Lechner把算术本摊在厨房桌上，Rosa用豆子摆出十以内的加减。Maria Lechner算错时，Rosa不骂，只把豆子重新排一遍。两个月后，Maria Lechner的听写和算术都及格了，Rosa Lechner在饭桌上多给Rosa盛了半碗汤。
  _effects: flag +tutored_sibling_well; skill; relation kin with person:evt:world-vienna-1912:000362:child_

- **1926.02** `r3-teen.police-caution::ctx-vienna-reform-1930::milieu-tenement::reform-parent-notice/cautioned` tags: police, caution, record, family, work, reform, medical, schooling
  Helene Bauer把Rosa的名字写进一本硬皮簿子，问一句写一句，最后让他按手印。Rosa Lechner赶来时，Helene Bauer说带回去好好管教，这次不立案。走出门口，Rosa Lechner的手一直攥着Rosa的袖子。
  _effects: reputation -0.04; flag +police_caution_recorded; relation guardian with person-rosa-lechner; knowledge “the police opened a caution file in the subject’s name”; relation acquaintance with person-materialized-world-vienna-1912-45; relation acquaintance with person-materialized-world-vienna-1912-12_

- **1926.06** `yf18-runaway.bundle::ctx-vienna-reform-1930::milieu-tenement/buy-the-ticket-tonight` tags: runaway, escape, family, plan, night_train, reform, medical, schooling
  Rosa趁Rosa Lechner去上夜班，把储钱罐砸在窗台上。硬币滚进床缝，Rosa趴在地上摸到最后一枚，跑去南站买了一张最便宜的单程票；售票员问要不要往返，Rosa说不用，声音比自己想象中平静。
  _effects: state_add yf18-runaway-plan state:world-vienna-1912:117; cash -3 (the savings jar was broken for a ticket); flag +yf18_ticket_bought; mood 0.03999999999999998; flag +yf18_runaway_plan_active_

- **1927.01** `state_reaction:yf18-runaway-plan/a-family-question` tags: yf18-runaway-plan, escape, youth, plan, home, travel, risk, state
  饭桌上又为房租吵起来。Rosa把面包掰成很小的块，听见父亲说“这个家养不起闲人”；Rosa没有回嘴，只在心里把格拉茨的地址又背了一遍。
  _effects: state_parameter yf18-runaway-plan.suspicion 15 -> 23; state_parameter yf18-runaway-plan.resolve 70 -> 68_
  _causes: evt:world-vienna-1912:002711_

- **1927.01** `yf18-apprentice.press-guard::ctx-vienna-reform-1930::milieu-tenement/refuse-the-machine` tags: apprenticeship, work, danger, machine, injury, refusal, reform, medical
  教堂年历的订单催得紧，Die Fackel把压印机的护板卸了，说这样进纸快一半。Rosa看着那块铁板，说手会进去；Die Fackel把工钱袋往桌上一扔，问Rosa是不是不想出师了。Rosa没有碰机器，那天下午的活由Otto Hofer接手。
  _effects: state_parameter apprenticeship-contract.progress 28 -> 23; state_parameter apprenticeship-contract.failures 0 -> 1; flag +yf18_refused_unguarded_press; mood 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-33_

- **1927.01** `r3-teen.first-friend-group::ctx-vienna-reform-1930::milieu-tenement/excluded` tags: friendship, roof, belonging, betrayal, class, reform, medical, schooling
  Josef Huber 2说入伙要交二十个铜板买蜡烛，Rosa掏遍口袋只有九个。他们让她在楼梯口等，等到天黑也没人下来。楼上传来笑声，像隔着一层厚被子。Rosa把九个铜板在楼梯上排成一排，又一个个收进口袋。
  _effects: mood -0.12000000000000005; flag +excluded_from_friend_group; relation acquaintance with person-materialized-world-vienna-1912-55; relation acquaintance with person-materialized-world-vienna-1912-55_

- **1927.01** `state_tick:yf18-runaway-plan/three-months-of-preparation/route-memorised` tags: yf18-runaway-plan, escape, youth, plan, home, travel, risk, state
  Rosa把去车站的路又走了一遍，记住了哪一段有煤气灯、哪一段住着巡夜的警察。回家后，Rosa在旧日历背面画了一条线，标出换乘的站名；那条线短得可笑，却比课本上的任何地图都清楚。
  _effects: state_parameter yf18-runaway-plan.preparation 35 -> 47; state_parameter yf18-runaway-plan.suspicion 23 -> 25; mood 0.010000000000000009_

- **1927.01** `state_expire:yf18-first-awakening` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Rosa的「第一次心动」到期；相关安排结束。
  _effects: state_remove yf18-first-awakening state:world-vienna-1912:93; flag -yf18_first_awakening_active_

- **1927.01** `state_tick:apprenticeship-contract/workshop-year/mistake` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Rosa废掉了一块料，师傅扣了工钱。晚饭时谁也没提这件事。
  _effects: state_parameter apprenticeship-contract.failures 1 -> 2; cash -1 (wasted material); mood -0.040000000000000036_

- **1927.01** `p9-childhood-apprenticeship.cover-for-sibling/damp-linen-returned` tags: adolescence, work, apprenticeship, labour, training, family, task, task:family
  客户把床单贴在脸上，又摸了摸边角，说“还是潮的”，把门合上一半。Rosa把床单卷回筐里，背回洗衣房。Otto Winter没骂，只让在后院重晾，件钱等重送完再结。Rosa蹲在地上翻布角，晚风吹得膝盖发酸，天黑前才夹完最后一只夹子。
  _effects: health -0.030000000000000027 (蹲久了膝盖发酸，又吹了晚风); mood -0.040000000000000036; skill; relation acquaintance with person-otto-winter_

- **1927.05** `yf18-body.danube-cabin::ctx-vienna-reform-1930::milieu-tenement/stay-behind-the-curtain` tags: body, desire, river, swimming, shame, first_love, reform, medical
  Rosa把浴巾裹到下巴，说自己怕水。Emil在门外笑，说去年还见Rosa从木塔上跳下去；Rosa没有解释，只隔着板缝看Ferdinand Moser把水撩到肩上。回家时，Rosa的泳衣还是干的，衣角被手攥得起了皱。
  _effects: state_add yf18-first-awakening state:world-vienna-1912:138; flag +yf18_stayed_dry; mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-54_

- **1927.10** `vienna-youth-threshold.sibling-departure/quarrel-who-leaves` tags: adolescence, school, work, family, transition, injury
  车票只够一个人走，晚饭桌上话越说越大声。Mitzi Lechner说该自己走，Rosa说自己也快够岁数了。母亲把汤勺往锅沿一磕，屋里静下来，最后Rosa摔门出去在楼梯上坐了半宿，直到楼上有人喊冷。
  _effects: relation kin with person-mitzi-lechner; mood -0.07; health -0.030000000000000027 (在冰冷的楼梯上坐到半夜)_

- **1928.01** `yf18-dare.bridge-rail::ctx-vienna-reform-1930::milieu-tenement/walk-the-rail` tags: dare, bridge, river, friendship, risk, reform, medical, schooling
  多瑙河上的铁桥在夜里只剩两排灯。Rosa翻过栏杆，鞋底踩上结霜的钢梁，走了七步；Maria Lechner在桥头喊了一声，风把声音吹散。Rosa翻回来时，Berta Bauer把一支烟塞进Rosa嘴里，手抖得点不着火。
  _effects: state_parameter yf18-first-awakening.intensity 40 -> 50; state_parameter yf18-first-awakening.nerve 0 -> 15; state_parameter yf18-first-awakening.talk 0 -> 5; health -0.030000000000000027 (cold and fear on the bridge); reputation 0.02; flag +yf18_walked_bridge_rail; mood 0.050000000000000044_

- **1928.01** `state_expire:yf18-runaway-plan` tags: yf18-runaway-plan, escape, youth, plan, home, travel, risk, state
  Rosa的「床底下的包袱」到期；相关安排结束。
  _effects: state_remove yf18-runaway-plan state:world-vienna-1912:117; flag -yf18_runaway_plan_active_

- **1928.01** `state_tick:yf18-first-awakening/half-year-of-glances/answered-glance` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Rosa在教堂门口或学校走廊里又遇见Ferdinand Moser。这一次对方先点了头，Rosa准备好的整段话全忘了，只把手里的书换到另一只手上；回家后Rosa才发现，自己把书拿倒了。
  _effects: state_parameter yf18-first-awakening.intensity 50 -> 55; state_parameter yf18-first-awakening.nerve 15 -> 23; state_parameter yf18-first-awakening.reciprocated false -> true; relation friend with person-materialized-world-vienna-1912-54; mood 0.030000000000000027_

- **1928.01** `state_transition:apprenticeship-contract/expelled` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick, failed-apprentice
  Rosa从「学徒契约」转入另一段处境：the master ended the contract
  _effects: state_transition apprenticeship-contract -> failed-apprentice; flag +failed_apprenticeship; mood -0.07999999999999996; role_

- **1928.01** `p9-childhood-youth-aspiration.join-a-club/joined-and-borrowed` tags: adolescence, education, aspiration, school, books, club, exam, task
  Rosa跟着Elisabeth Bauer走进印刷厂后面的屋子，交了十赫勒会费，在借书簿上按了手印。他挑了一本讲蒸汽机的册子，封面烫金已经磨掉；管理员说下月十赫勒要按时交，书才能续借。
  _effects: cash -0.1 (工人青年会月费); skill; relation friend with person-elisabeth-bauer; flag +workers_youth_member; mood 0.040000000000000036_

- **1928.01** `state_reaction:yf18-first-awakening/exam-week-distraction` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  考试周里，Rosa把课本摊在桌上，眼睛却一直看着窗外那条电车线。笔记的页边多了几个没有写完的名字，Rosa用橡皮擦掉，纸面起了毛。
  _effects: state_parameter yf18-first-awakening.intensity 55 -> 52; state_parameter yf18-first-awakening.talk 5 -> 7_
  _causes: evt:world-vienna-1912:003391_

- **1928.04** `r1-fam.sibling-rivalry::ctx-vienna-reform-1930::milieu-tenement/rivalry.neither` tags: family, siblings, rivalry, apprenticeship, craft, reform, medical, schooling
  Josef Moser看了看兄弟俩的手，说两个人的指节都不够硬，谁也不收。Rosa Lechner求了半天，Josef Moser答应让两人一起干杂活，管饭不给钱。Katharina Lechner干了三天就走了，Rosa留下来扫地、磨刀，磨到第六个月，Josef Moser才让她碰第一块好木料。
  _effects: cash 1 (同一把刨子); flag +worked_up_from_dogsbody; role; skill; relation acquaintance with person:evt:world-vienna-1912:000086:child; relation acquaintance with person-materialized-world-vienna-1912-44_

- **1929.01** `state_tick:yf18-first-awakening/half-year-of-glances/talked-about` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Rosa只把Ferdinand Moser的名字写在一张草稿纸背面，第二天那张纸就在教室后排传了一圈。有人把名字念出来，有人问Rosa是不是要请人喝咖啡；Rosa说那是表姐的名字，声音大得连自己都吓了一跳。
  _effects: state_parameter yf18-first-awakening.talk 7 -> 19; state_parameter yf18-first-awakening.nerve 33 -> 27; reputation -0.03; mood -0.030000000000000027_

- **1929.01** `r13-edu.dropout-return::ctx-vienna-reform-1930::milieu-tenement/dropout-confirmed` tags: education, dropout, return, school, work, reform, medical, schooling
  Rosa回到学校，发现同班同学已经毕业，新班级里没人认识Rosa。Rosa在操场上站了一下午，最后没有进教室，跟着父亲去了工地。晚上Rosa把课本放进箱底，没舍得扔。工地的工头看Rosa年纪小，只让Rosa搬轻的。课本压在最底下。
  _effects: mood -0.07000000000000006; flag +dropout_confirmed; relation kin with person-rosa-lechner_

- **1929.02** `r1-cul.fan-letter::ctx-vienna-reform-1930::milieu-tenement/quoted-without-permission` tags: culture, letters, fandom, literacy, ambition, reform, medical, schooling
  Rosa的信寄出半年，没有回音。后来Maria Moser在一篇文章里引用了这封信，没有署名，只写一个读者说。Rosa在报上读到自己的句子，先是高兴，随后发现文章里的意思和自己写的相反。
  _effects: mood -0.07999999999999996; reputation 0.03; flag +letter_quoted_without_permission; relation acquaintance with person-materialized-world-vienna-1912-60; knowledge “the quoted sentence means the opposite of what was written”; relation acquaintance with person-materialized-world-vienna-1912-60_

- **1929.07** `r3-teen.first-rent::ctx-vienna-reform-1930::milieu-tenement::reform-rent-receipt/pays` tags: housing, rent, arrears, eviction, independence, reform, medical, schooling
  Friedrich Hofer把收据铺在油布上，用蘸水笔写日期。Rosa把硬币一枚枚码好，推到桌子对面，听见最后一枚碰到桌沿。Friedrich Hofer点完，把收据撕下来，说下个月还是这一天。
  _effects: cash -6 (第一张房租收据); flag +paid_first_rent; relation acquaintance with person-friedrich-hofer; knowledge “rent is due on the same day each month”; relation acquaintance with person-materialized-world-vienna-1912-34_

- **1929.11** `yf18-firstlook.parish-dance::ctx-vienna-reform-1930::milieu-tenement/the-second-dance` tags: first_love, dance, church, courtship, jealousy, reform, medical, schooling
  舞卡上第一支曲子被Hedwig写走了。Rosa在教会礼堂的木地板上踩错了两步，Hedwig说没关系，把手放回Rosa背后；第三支曲子响起时，Elisabeth Bauer在门口冲Rosa比了个手势，Rosa假装没看见。
  _effects: state_parameter yf18-first-awakening.intensity 52 -> 60; state_parameter yf18-first-awakening.nerve 23 -> 33; state_parameter yf18-first-awakening.reciprocated true -> true; relation friend with person-phase15-Hedwig-world-vienna-1912; mood 0.040000000000000036_

- **1929.12** `vienna-adolescence.workshop-apprentice/apprenticeship-accepted` tags: adolescence, school, work, family, social
  Buchdruckerei Winter & Söhne先看Rosa的手，又让Rosa推两下刨子试试。Rosa用力过猛，刨刀啃进木头，Buchdruckerei Winter & Söhne皱眉，让再来一遍。第二遍木花薄而匀。Buchdruckerei Winter & Söhne说“留下”，当面点了三克朗给Rosa Lechner，算头一周饭钱，又指了指墙上的钟，说迟到一刻钟扣半天。
  _effects: cash 3 ({subject}学徒首周的膳食预付款); education apprenticeship; reputation 0.1; relation kin with person-rosa-lechner_

- **1930.01** `vienna-family-courtship/ask-to-share-a-home` tags: family, courtship, household, social, lifecycle
  Rosa在Leopoldstädter Zinshaus, gemeinsamer Gang靠窗的桌边，把一只空咖啡杯转了半圈，说房租两人合付、桌子两人共用。Franz Weiss的手停在糖罐盖上，问了一句“要是过不下去呢”，没有当场答应，只说要想一想；杯里的咖啡凉了，话还悬在桌面上。
  _effects: interaction_

- **1930.01** `state_tick:yf18-first-awakening/half-year-of-glances/answered-glance` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Rosa在教堂门口或学校走廊里又遇见Ferdinand Moser。这一次对方先点了头，Rosa准备好的整段话全忘了，只把手里的书换到另一只手上；回家后Rosa才发现，自己把书拿倒了。
  _effects: state_parameter yf18-first-awakening.intensity 60 -> 65; state_parameter yf18-first-awakening.nerve 27 -> 35; state_parameter yf18-first-awakening.reciprocated true -> true; relation friend with person-materialized-world-vienna-1912-54; mood 0.030000000000000027_

- **1930.01** `r13-fam.arrange-childcare::ctx-vienna-reform-1930::milieu-tenement/minder-cancels` tags: task, care, childcare, work, neighbor, wages, reform, medical
  Otto Weiss说自家孙子也病了，这星期看不了。Rosa抱着Anna 2站在楼道里，听见厂里的汽笛响过第一遍。那天Rosa没有去上工，第二天门口的通知上多了一个红叉；Otto Weiss端来一碗粥，说下星期一定帮忙。
  _effects: cash -1 (上工前把小的送下楼); mood -0.12; condition; flag +missed_work_for_childcare; relation acquaintance with person-materialized-world-vienna-1912-8; knowledge “a missed shift is marked with a red cross”; relation acquaintance with person-materialized-world-vienna-1912-8_

- **1930.03** `statistical_infection`
  Rosa在Leopoldstädter Zinshaus, gemeinsamer Gang病倒了，肺结核让身体发热、虚弱，接下来的日子只能卧床。

- **1930.04** `vienna-tenement-neighbors.sick_child_doorstep/refuses_grudge` tags: home, social, family, housing
  Franz Weiss 2敲门想借半块煤给发烧的孩子烧热水，Rosa那天刚和Franz Weiss 2为走廊堆东西吵过嘴，没开门，隔着门板说自家也不够用。后半夜听见Franz Weiss 2抱着孩子下楼去敲药房的门。第二天在走廊碰见，Franz Weiss 2低头绕过去，手里的铜壶碰在栏杆上，响了一声。
  _effects: relation rival with person-materialized-world-vienna-1912-31; mood -0.050000000000000044; relation acquaintance with person-materialized-world-vienna-1912-31_

- **1930.04** `statistical_recovery`
  Rosa从肺结核中慢慢恢复，能下床喝水，但身体还虚弱。

- **1930.11** `vienna-legacy-worklife.sick-fund/sick-fund.fill-form` tags: legacy, work, family, reform, ordinary_life, injury
  衙门走廊的地砖是黑白相间的，Rosa站着站着就把重心从一只脚换到另一只脚。窗口里的办事员姓什么没人知道，只叫“三号窗”。表递进去时，里面说“等复核”，声音很平。
  _effects: health -0.030000000000000027 (在衙门走廊站了大半天); relation colleague with person-rosa-lechner; skill; relation acquaintance with person-materialized-world-vienna-1912-2_

- **1930.11** `vienna-women-housework.wash-day/wash-day.rush` tags: gender, housework, home, labour, family, injury
  木盆边的水渍映着天光，Rosa跪在石阶上揉搓床单，肘弯发酸。晾绳上的湿布滴答作响，Rosa Bauer探身把自家被单也挂上去，两人没多说话。
  _effects: health -0.020000000000000018 (长时间浸在碱水里，手部皮肤开裂); relation acquaintance with person-materialized-world-vienna-1912-43_

- **1931.01** `major-work-first-employment/hired-by-the-day` tags: work, employment, unemployment, major
  Buchdruckerei Winter & Söhne只招日工。Rosa天亮前到门口，名字写在临时名单上，干一天算一天，一天一克朗，月底结二十六克朗。工头说下个月可能有正式位置，也可能没有；Rosa把每天的工时记在烟盒背面，怕漏掉一天。
  _effects: employment Tagelöhner @ org-winter-print; role; cash 2 (first daily pay advance); relation colleague with person-materialized-world-vienna-1912-71; flag +day_labour_only; relation acquaintance with person-materialized-world-vienna-1912-71_

- **1931.01** `vienna-family-courtship/wait-for-a-better-year` tags: family, courtship, household, social, lifecycle
  Rosa把话咽回去，只说等明年工钱稳一点再谈。Josef Huber 2没有追问，两人把桌上的面包分完，各自去上工；出门时Rosa回头看了一眼，Josef Huber 2正把掉在桌上的面包屑拢进掌心，谁也没有把那个话头重新拾起来。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-55_

- **1931.01** `state_expire:yf18-first-awakening` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Rosa的「第一次心动」到期；相关安排结束。
  _effects: state_remove yf18-first-awakening state:world-vienna-1912:138_

- **1931.01** `p9-social-daily-culture.pictures-or-concert/p9-social-daily-culture.pictures-or-concert.cheap-picture` tags: daily, culture, leisure, cafe, music, walk, task, task:culture
  Rosa和Friedrich Hofer买了影戏棚最便宜的边座，边座和两粒糖一共五十赫勒。一刻钟的活动影戏里火车朝观众冲过来，棚里有人叫出了声。散场后两人还站在门口看下一场的招牌，Rosa把剩下几个铜板在口袋里攥得发热，又买了两粒糖，一人一粒含回家。
  _effects: cash -0.5 (影戏棚边座和两粒糖); mood 0.050000000000000044; relation friend with person-friedrich-hofer_

- **1931.06** `vienna-legacy-worklife.apprentice-wage/apprentice-wage.ask-master` tags: legacy, work, family, reform, ordinary_life
  掌柜的木尺敲了两下柜台，声音短促。Rosa把问题又问了一遍，掌柜才说师兄是“老规矩进来的”。师兄这时转过身，笑了一下，笑得不太自然，说“没事，你问得对”。
  _effects: reputation -0.04; relation colleague with person-materialized-world-vienna-1912-59; skill; relation acquaintance with person-materialized-world-vienna-1912-59_

- **1931.09** `hs18-queue.figure::ctx-vienna-reform-1930::milieu-tenement/sell-the-sighting` tags: historical_figure, queue, recognition, bread, witness, history, reform, medical
  Rosa没有排队，转身去找街角的记者。Maria Kral在后面喊“别堵路”，Rosa已经钻进电话亭。第二天，小报角落里登了一句话：某人在面包队里看见了那张脸。Rosa拿到几张钞票，也记住了记者没有问消息是真是假。
  _effects: cash 2 (sold the sighting to a newspaper); state_add hs18-street-witness state:world-vienna-1912:260; relation acquaintance with person-karl-kraus; reputation -0.02; flag +sold_historical_sighting_

- **1932.01** `r14-edu.sibling-exam::ctx-vienna-reform-1930::milieu-tenement/sibling-failed` tags: education, tutored_sibling, family, exam, reform, medical, schooling, home
  Maria Lechner差三分。回家路上，Maria Lechner一句话也没说，进了门就把自己关在屋里。Rosa把饭菜放在门口，敲了两下，没有回应。半夜，Rosa听见屋里有人在翻书，翻到天亮。第二天清早，Maria Lechner出来洗脸，眼睛肿着，问Rosa能不能再教一年。补考费一克朗。
  _effects: cash -1 (弟弟妹妹的准考证); flag +sibling_failed_exam; relation kin with person:evt:world-vienna-1912:000362:child_
  _causes: evt:world-vienna-1912:002674_

- **1932.01** `vienna-life-work-injury/dismissed-after-accident` tags: adulthood, labour, injury, unemployment
  Buchdruckerei Winter & Söhne在事故后第三天通知Rosa不用再来了，说岗位不能一直空着。Rosa拿着医院证明去工会，诊断书被工头压在抽屉里；治伤花去六克朗，Rosa的手还没好，工作先没了，工牌交回去时手指还缠着纱布。
  _effects: unemployment (dismissed after accident); health -0.12 (injury and lost job); cash -6 (medical treatment)_

- **1932.01** `vienna-family-courtship/ask-to-share-a-home` tags: family, courtship, household, social, lifecycle
  Rosa在Leopoldstädter Zinshaus, gemeinsamer Gang靠窗的桌边，把一只空咖啡杯转了半圈，说房租两人合付、桌子两人共用。Alois Stein的手停在糖罐盖上，问了一句“要是过不下去呢”，没有当场答应，只说要想一想；杯里的咖啡凉了，话还悬在桌面上。
  _effects: interaction; relation acquaintance with person-materialized-world-vienna-1912-80_

- **1932.01** `state_tick:hs18-street-witness/memory-drift/holds` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Rosa又把那天的顺序在脑子里走了一遍：先是门响，再是靴子，最后才是那声喊。细节还在，只是每讲一次，旁边就多出一点别人替你补上的颜色。
  _effects: state_parameter hs18-street-witness.certainty 65 -> 67_

- **1932.01** `r13-fam.help-neighbour::ctx-vienna-reform-1930::milieu-tenement/carried-the-coal` tags: task, social, neighbor, help, care, reform, medical, schooling
  Rosa看见Franz Weiss在楼梯口歇了三回，便把煤筐接过来，一筐一筐抬上三楼。最后一趟，Rosa的腰在门框上撞了一下，Franz Weiss从柜里摸出一小瓶李子酒，硬倒了一盅。
  _effects: food; health -0.030000000000000027 (把煤筐抬上三楼); flag +carried_neighbour_coal; role; relation friend with person-materialized-world-vienna-1912-25_

- **1932.08** `oj18-zoo.night::ctx-vienna-reform-1930::milieu-tenement/meat-ledger` tags: zoo, animals, night, keeper, work, odd_job, suspense, reform
  肉商的账本上少了二十公斤马肉，Rosa Lechner要Rosa签字认账。Rosa知道是夜班门房把肉转卖给了普拉特的香肠摊，但门房是Rosa Lechner的小舅子。Rosa不签，第二天被调去扫兽栏；臭味洗了三遍还在指甲缝里。
  _effects: reputation -0.03; cash -1 (lost the night-shift supplement); mood -0.040000000000000036; state_add oj18-odd-apprenticeship state:world-vienna-1912:279; flag +zoo_night_shift; flag +refused_meat_ledger; knowledge “少掉的二十公斤马肉被夜班门房卖给了香肠摊，门房是园长的亲戚。”; relation acquaintance with person-materialized-world-vienna-1912-49; role; flag +odd_job_apprentice_

- **1932.08** `p9-gap-adult-solitude.leaking-shoe/leaking-shoe.gave-up` tags: adulthood, daily, solitude, ordinary, home, repair, shoe, poverty
  Rosa缝了半个钟头，线老是从针眼里脱出来，最后把鞋往床底下一踢。第二天清早她穿着这双鞋站在厂门口等开门，湿石头地的凉气从裂缝里钻进来，脚趾冻得发麻，只能来回换脚。
  _effects: health -0.050000000000000044 (穿着漏水的鞋在冷地上站久了); mood -0.040000000000000036_

- **1933.01** `interaction_response` tags: interaction
  Alois Stein没有答应，只说现在不合适。Rosa把这件事收回去，之后见面仍点头。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-80; interaction_
  _causes: evt:world-vienna-1912:004804_

- **1933.01** `vienna-family-courtship/ask-to-share-a-home` tags: family, courtship, household, social, lifecycle
  Rosa在Leopoldstädter Zinshaus, gemeinsamer Gang靠窗的桌边，把一只空咖啡杯转了半圈，说房租两人合付、桌子两人共用。Josef Moser 2的手停在糖罐盖上，问了一句“要是过不下去呢”，没有当场答应，只说要想一想；杯里的咖啡凉了，话还悬在桌面上。
  _effects: interaction; relation acquaintance with person-materialized-world-vienna-1912-81_

- **1933.01** `oj18-zoo.escape::ctx-vienna-reform-1930::milieu-tenement/hid-the-chimp` tags: zoo, animals, escape, night, blame, work, odd_job, reform
  马戏班老板Rosa Bauer在普拉特门口拦住Rosa，说愿意出三十克朗买那只黑猩猩，还缺一个懂它脾气的驯养人。Rosa没有答应，也没有报告；夜里，Rosa把卡斯帕藏进废弃的鸟舍，每天多带一份面包。
  _effects: cash -1 (bread for the hidden chimpanzee（其中1克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-43; state_parameter oj18-odd-apprenticeship.strangeKnowledge 22 -> 30; state_add oj18-workplace-legend state:world-vienna-1912:313; mood -0.020000000000000018; flag +hid_chimp; knowledge “卡斯帕藏在废弃鸟舍里，听见面包纸响就会从梁上下来。”; relation acquaintance with person-materialized-world-vienna-1912-77; role; flag +workplace_legend_

- **1933.01** `state_expire:failed-apprentice` tags: failed-apprentice, craft, work, failure, stigma, state, state_tick, state:failed-apprentice
  Rosa的「学徒契约终止」到期；相关安排结束。
  _effects: state_remove failed-apprentice state:world-vienna-1912:168_

- **1933.01** `state_tick:hs18-street-witness/memory-drift/blurs` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Rosa忽然想不起那个人先迈的是左脚还是右脚。邻居说自己记得清清楚楚，还补了一个细节；Rosa听着，竟分不清那是自己看见的，还是后来听来的。
  _effects: state_parameter hs18-street-witness.certainty 67 -> 59; mood -0.020000000000000018_

- **1933.01** `state_tick:oj18-odd-apprenticeship/strange-year/blamed-for-the-noise` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  楼上住户投诉夜里有人拖椅子，管事的把巡查簿翻到Rosa的那一页，说签字太潦草，看不出巡过几趟。Rosa想辩解，却想起那晚确实在楼梯间多站了一刻钟；扣掉的工钱刚好够买一双不漏水的鞋。
  _effects: state_parameter oj18-odd-apprenticeship.trust 18 -> 2; state_parameter oj18-odd-apprenticeship.reliability 55 -> 45; mood -0.009999999999999898; flag +odd_job_scare_

- **1933.01** `p9-work-jobsearch.ask-trial/ask-trial.accepted` tags: work, job_search, negotiation, wages, employment, task, trial, factory
  厂门口的砖墙被太阳晒得发烫。Anton Weiss在旁听着，插了一句这后生看着手稳。工头把烟灰弹进阴沟，说试半天，午饭他管。Rosa点头时，肚子先响了一声。
  _effects: flag +trial_work_pending; relation acquaintance with person-materialized-world-vienna-1912-60; mood 0.050000000000000044; relation acquaintance with person-materialized-world-vienna-1912-4_

- **1933.03** `vienna-parish-aid.rent-box/rent-box.refuse` tags: faith, parish, mutual_aid, poverty, family
  Rosa说这个月还能撑，房租差的那几克朗打算替人洗衣补上，请Berta Weiss把篮子提回去给更困难的人家。Berta Weiss在门口停了一会儿，把一小块肥皂留在窗台上，说不是救济，是教区多出来的。门关上后，屋里只剩煤箱底刮出的响声。
  _effects: mood -0.030000000000000027; relation acquaintance with person-berta-weiss; flag +parish_refused_aid_

- **1933.04** `df18-dream.water-in-the-cellar::ctx-vienna-reform-1930::milieu-tenement/move-the-crates` tags: dream, omen, home, water, coincidence, eerie, everyday, reform
  梦里，Rosa看见地窖的水漫过脚踝，木箱一只只浮起来。第二天一早，Rosa把箱子和煤筐搬到床上。中午，楼下的水管裂了，水沿着墙根流进地窖，只浸湿了一只空桶。Berta Bauer 2说Rosa运气好，Rosa没有解释。
  _effects: cash -1 (搬箱子时打碎了一只罐子（其中1克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-51; knowledge “我梦见地窖进水，第二天水管真的裂了。”; flag +df18_moved_crates_before_flood; mood 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-51_

- **1934.01** `interaction_response` tags: interaction, partnership, household
  Josef Moser 2在几天后找到Rosa，说可以试试。两人开始合付房租，也把各自欠的账摊在桌上。
  _effects: relation partner with person-materialized-world-vienna-1912-81; household; role; role; interaction_
  _causes: evt:world-vienna-1912:005238_

- **1934.01** `vienna-life-injury-recovery/clinic-treatment` tags: health, work, family
  Rosa在受伤后的第三天去了诊所。医生清洗伤口、换药，收下诊费，嘱咐不要急着回机器旁。Rosa把药方折好，回家路上买了纱布。
  _effects: health 0.04999999999999999 (wound treatment); cash -8 (clinic and bandages（其中8克朗记入债务）); condition_
  _causes: evt:world-vienna-1912:004803_

- **1934.01** `vienna-family-courtship/ask-to-share-a-home` tags: family, courtship, household, social, lifecycle
  Rosa在Leopoldstädter Zinshaus, gemeinsamer Gang靠窗的桌边，把一只空咖啡杯转了半圈，说房租两人合付、桌子两人共用。Franz Weiss 2的手停在糖罐盖上，问了一句“要是过不下去呢”，没有当场答应，只说要想一想；杯里的咖啡凉了，话还悬在桌面上。
  _effects: interaction_

- **1934.01** `state_tick:hs18-street-witness/memory-drift/blurs` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Rosa忽然想不起那个人先迈的是左脚还是右脚。邻居说自己记得清清楚楚，还补了一个细节；Rosa听着，竟分不清那是自己看见的，还是后来听来的。
  _effects: state_parameter hs18-street-witness.certainty 59 -> 51_

- **1934.01** `state_tick:oj18-workplace-legend/story-year/story-grows-teeth` tags: oj18-workplace-legend, work, legend, odd_job, rumor, identity, night, state
  故事传到第三个街区时，已经多出一只会说话的猫和两具没有头的尸体。Rosa想纠正，发现自己越解释，听的人越兴奋；酒馆老板干脆把最离谱的版本写在黑板上，下面画了一个箭头：本店常客。
  _effects: state_parameter oj18-workplace-legend.legend 20 -> 28; state_parameter oj18-workplace-legend.truth 55 -> 50; state_parameter oj18-workplace-legend.toldCount 0 -> 2; flag +legend_exaggerated_

- **1934.01** `r13-fam.look-for-lost-relative::ctx-vienna-authoritarian-1934::milieu-tenement/wrong-person` tags: task, family, missing, official, war, search, vienna, urban
  Maria Kral说名单上有一个同姓的人，住在城北的收容站。Helene Winter连夜赶去，见到的却是一个比她儿子年轻的裁缝。Rosa陪她走回来，路上Helene Winter一直说名字没有错，是年份错了；Rosa没有纠正，只把她的胳膊挽得更紧。
  _effects: cash -1 (念错的名字（其中0.5克朗记入债务）); condition; flag +followed_a_false_lead; relation kin with person-helene-winter; knowledge “the name on the list belongs to another family”_

- **1934.03** `p9-social-tenement-neighbors.flour-loan/flour-loan.two-slices-of-bread` tags: housing, neighbors, tenement, daily, money, reputation
  Rosa说自家也快见底了，不能再借面粉，临关门前往Franz Berg手里塞了两块面包，说先给孩子垫一垫。Franz Berg攥着面包站了一会儿，说了声谢谢就走了，楼梯上传来脚步和纸袋的磨蹭声。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-1_

- **1934.06** `vienna-social-movement.recruitment/join-and-carry` tags: development, social_movement, organization, politics
  Rosa在楼梯下面接到一张折成四折的传单。纸上没有署名，只写着下一次集会的地址。Rosa去了，在昏暗的屋里报上姓名，成为圣马克斯殡葬合作社的一员，并答应负责自己所在街区的联络。
  _effects: organization_membership; role; relation acquaintance with person-materialized-world-vienna-1912-72; relation acquaintance with person-materialized-world-vienna-1912-72_

- **1934.07** `vienna-tenement-neighbors.lost_room_key/key_lost_landlady` tags: home, social, family, housing
  Rosa把钥匙丢在了回家路上的有轨电车轨道旁，天黑也没找着。房东太太说换锁芯要一克朗五十赫勒，从下月房租里扣。Ferdinand Weiss 2借给Rosa一把旧挂锁，但锁鼻和门扣对不上，只能用铁丝拧着凑合。那夜Rosa睡不踏实，总觉得有人在拧门。
  _effects: cash -1.5 (换锁芯费用); relation acquaintance with person-materialized-world-vienna-1912-71; mood -0.050000000000000044_

- **1935.01** `interaction_response` tags: interaction
  Franz Weiss 2没有答应，只说现在不合适。Rosa把这件事收回去，之后见面仍点头。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-31; interaction_
  _causes: evt:world-vienna-1912:005682_

- **1935.01** `state_tick:hs18-street-witness/memory-drift/blurs` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Rosa忽然想不起那个人先迈的是左脚还是右脚。邻居说自己记得清清楚楚，还补了一个细节；Rosa听着，竟分不清那是自己看见的，还是后来听来的。
  _effects: state_parameter hs18-street-witness.certainty 51 -> 43_

- **1935.01** `state_expire:oj18-odd-apprenticeship` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  Rosa的「奇职学徒」到期；相关安排结束。
  _effects: state_remove oj18-odd-apprenticeship state:world-vienna-1912:279; role; flag -odd_job_apprentice_

- **1935.01** `state_expire:oj18-workplace-legend` tags: oj18-workplace-legend, work, legend, odd_job, rumor, identity, night, state
  Rosa的「职场传说」到期；相关安排结束。
  _effects: state_remove oj18-workplace-legend state:world-vienna-1912:313; role; flag -workplace_legend_

- **1935.01** `r13-fam.reconcile-parent::ctx-vienna-authoritarian-1934::milieu-tenement/rebuffed` tags: task, family, parent, reconciliation, estrangement, vienna, urban, crisis
  Rosa Lechner让Rosa把面包提回去，说这些年没有Rosa也过来了。Rosa站在门口，看见墙上还挂着自己小时候的照片，玻璃裂了一道。Rosa Lechner顺着她的目光看过去，却没有把照片摘下来。
  _effects: condition; flag +parent_refused_reconciliation; relation rival with person-rosa-lechner_

- **1935.02** `vienna-family-courtship/ask-to-share-a-home` tags: family, courtship, household, social, lifecycle
  Rosa在Leopoldstädter Zinshaus, gemeinsamer Gang靠窗的桌边，把一只空咖啡杯转了半圈，说房租两人合付、桌子两人共用。Ferdinand Winter 2的手停在糖罐盖上，问了一句“要是过不下去呢”，没有当场答应，只说要想一想；杯里的咖啡凉了，话还悬在桌面上。
  _effects: interaction; relation acquaintance with person-materialized-world-vienna-1912-6_

- **1935.12** `vienna-legacy-worklife.hours-ledger/hours-ledger.refuse` tags: legacy, work, family, reform, ordinary_life
  学徒在旁边小声说，拒绝按手印的人名字会被单独抄在一张纸上。Rosa没接话，把八克朗换成一克朗的硬币，数给家里时硬币在桌上滚了两圈才停。屋里的煤油灯芯剪得太短，光只够照亮手边的桌面。
  _effects: cash 8 (追回的拖欠计件工资); reputation -0.03; relation colleague with person-materialized-world-vienna-1912-63; relation acquaintance with person-materialized-world-vienna-1912-63_

- **1936.01** `interaction_response` tags: interaction, partnership, household
  Ferdinand Winter 2在几天后找到Rosa，说可以试试。两人开始合付房租，也把各自欠的账摊在桌上。
  _effects: relation partner with person-materialized-world-vienna-1912-6; household; interaction_
  _causes: evt:world-vienna-1912:006152_

- **1936.01** `vienna-family-childbirth/son-born` tags: family, childbirth, death, lifecycle, birth, injury, state, state:raising-child
  Rosa在Leopoldstädter Zinshaus, gemeinsamer Gang生下一个男婴，取名Friedrich 2。工友凑的钱抵了一部分，家里还是从糖罐里数出六克朗给接生的人；Ferdinand Winter 2把消息带到工厂，回来时把唯一的摇篮重新刷了一遍，Rosa躺在床上出了一身虚汗。
  _effects: birth male; health -0.07999999999999996 (childbirth); cash -6 (midwife fee); state_add raising-child state:world-vienna-1912:412_

- **1936.01** `state_tick:hs18-street-witness/memory-drift/blurs` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Rosa忽然想不起那个人先迈的是左脚还是右脚。邻居说自己记得清清楚楚，还补了一个细节；Rosa听着，竟分不清那是自己看见的，还是后来听来的。
  _effects: state_parameter hs18-street-witness.certainty 43 -> 35_

- **1936.01** `r14-fam.midwife-receipt::ctx-vienna-authoritarian-1934::milieu-tenement/neighbours-collect` tags: task, family, childbirth, family_debt, medical_debt, vienna, urban, crisis
  Helene Moser收钱时，Rosa只凑出两克朗。消息在楼道里传开，傍晚有人敲门，塞进来几张揉皱的票子和一罐糖。Helene Moser把收据上的数目划掉，重新写了“六克朗，已清”。Rosa抱着孩子坐在床上，听见Ferdinand Winter 2在门外一户一户地道谢。
  _effects: cash 6 (接生婆的收据); mood 0.07999999999999996; flag +neighbours_paid_midwife; relation partner with person-materialized-world-vienna-1912-6; relation colleague with person-materialized-world-vienna-1912-10; birth female; state_add raising-child state:world-vienna-1912:426_

- **1936.06** `major-family.childbirth/childbirth.hospital-ward` tags: family, childbirth, household, major, lifecycle, birth, injury, partnership
  Rosa住进市立总医院的产房，六张床之间只隔一层布帘。同病房的女人教她怎么用布带裹住腰。孩子生下来时Ferdinand Winter 2还在走廊里，护士把襁褓递给他，他先看了看账单。出院那天，两人用借来的童车把孩子推回Leopoldstädter Zinshaus, gemeinsamer Gang，车轮一路吱呀响。
  _effects: birth female; health -0.09999999999999998 (hospital childbirth); relation partner with person-materialized-world-vienna-1912-6; role; role; cash -22 (hospital ward and borrowed pram); state_add raising-child state:world-vienna-1912:414_

- **1936.10** `vienna-tenement-neighbors.shared_stove_fire/fire_scald_hand` tags: home, social, family, housing, injury
  Rosa在合租房走廊的公用灶台上煮土豆，转身取盐时袖子扫翻了铁锅，滚水浇在左手背上。Anton Weiss从隔壁冲出来，扯下自己的围裙裹住烫伤处，又跑下楼叫来住在二楼的接生婆。接生婆用蛋清和旧亚麻布包扎，嘱咐三天不能沾水。
  _effects: health -0.04999999999999999 (左手背烫伤); relation friend with person-materialized-world-vienna-1912-4_

- **1936.12** `oj18-taxi.night-fare::ctx-vienna-authoritarian-1934::milieu-tenement/coop-keys` tags: taxi, night, driver, passenger, work, odd_job, everyday, vienna
  合作社的调度Otto Hofer把一枚铜牌和一把车钥匙推过柜台，说夜班只跑环城路，十一点以后不接去普拉特的车。Rosa把铜牌挂在后视镜上，第一晚就拉了七个客人，最后一个在车上睡着，打鼾像一台小马达。
  _effects: organization_found 第二区夜班出租合作社 (other); position 夜班司机 @taxi:person-phase15-Rosa-world-vienna-1912-evt:world-vienna-1912:006663; state_add oj18-odd-apprenticeship state:world-vienna-1912:413; cash 2 (night taxi fares); flag +taxi_night_shift; knowledge “夜班只跑环城路，十一点以后不接去普拉特的车。”; role; flag +odd_job_apprentice_

- **1937.01** `vienna-tenement-neighbors.laundry_line_dispute/neighbor_yanks_clothes` tags: home, social, family, housing
  Anton Weiss嫌Rosa的床单滴水滴到Anton Weiss家衬衫上，一把扯下床单扔在院子的石板上。Rosa下楼捡起来时，床单角沾了泥，重洗又要费肥皂。两人在院子当中对喊，楼上有人推开窗看热闹。Rosa把床单重新搭上绳子时，故意把水拧在Anton Weiss那侧。
  _effects: relation rival with person-materialized-world-vienna-1912-4; cash -0.15 (重洗床单的肥皂钱)_
  _causes: evt:world-vienna-1912:006666_

- **1937.01** `vienna-life-injury-recovery/home-care` tags: health, work, family, injury
  Rosa没有去诊所，只用热水和旧布洗了伤口。第二天伤口周围发红，家里人把仅剩的干净床单撕成条。
  _effects: health -0.030000000000000027 (untreated wound); cash -2 (clean cloth); condition_
  _causes: evt:world-vienna-1912:006661_

- **1937.01** `state_reaction:oj18-odd-apprenticeship/the-thing-in-the-basement` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  夜班结束前，Rosa听见地下室传来拖拽声。下去时，门开着，地上只有一道湿拖把的痕迹；第二天，所有人都说那间屋子锁了十年。
  _effects: state_parameter oj18-odd-apprenticeship.strangeKnowledge 10 -> 18; state_parameter oj18-odd-apprenticeship.trust 30 -> 27; mood -0.030000000000000027; knowledge “地下室那扇门后面有东西被搬动过，但巡查簿上没有记录。”_
  _causes: evt:world-vienna-1912:007049_

- **1937.01** `vienna-family-divorce/separate-under-one-roof` tags: family, marriage, divorce, housing, lifecycle, separation
  Rosa和Ferdinand Winter 2把床铺分开，米和煤也各算各的。两人仍住在Leopoldstädter Zinshaus, gemeinsamer Gang，因为谁都没有钱再租一间房；孩子在两床之间来回，三克朗买了隔开的锅碗和煤油，家里从此有两本账，夜里两盏灯先后熄灭。
  _effects: relation_end partner with person-materialized-world-vienna-1912-6; mood -0.04999999999999993; mood -0.07999999999999996; cash -3 (separate household goods)_

- **1937.01** `office16-budget.sign-or-block::ctx-vienna-authoritarian-1934::milieu-tenement/signed-for-a-favor` tags: office, budget, permit, administration, power, economy, vienna, urban
  Otto Hofer在签字前把一张剧院包厢的票根留在桌上，说是“给孩子的”。Rosa把票根推回去，却在许可证上签了名；排水图仍缺一页，但窗口当天就盖了章。扩建开工后，第一场雨把后院淹了半尺。
  _effects: organization_funds; relation friend with person-materialized-world-vienna-1912-33; flag +permit_for_favor; knowledge “许可证少了一页排水图，盖章时没有补。”; mood 0.020000000000000018_

- **1937.01** `ld18-performance.tango::ctx-vienna-authoritarian-1934::milieu-tenement/the-impresario-offers-a-contract` tags: performance, desire, dance, public, queer, nightlife, public_desire, vienna
  Helene Weiss把合同推过来，说只要她们每星期跳三场，就付双倍的钱。Rosa问要不要改舞步，Helene Weiss说不用，越像现在这样越好。Anna Weiss看着合同上的数字，先笑了，又有点想哭。
  _effects: state_add ld18-public-desire state:world-vienna-1912:446; cash 2 (the first week of the scandal contract); relation acquaintance with person-materialized-world-vienna-1912-5; mood 0.020000000000000018; flag +scandal_contract; flag +public_desire_active_

- **1937.01** `state_expire:hs18-street-witness` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Rosa的「街面上的目击者」到期；相关安排结束。
  _effects: state_remove hs18-street-witness state:world-vienna-1912:260_

- **1937.01** `state_tick:oj18-odd-apprenticeship/strange-year/trusted-with-the-keys` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  两年过去，Rosa已经能闭着眼说出哪块地板会响、哪盏煤气灯该在几点关。师傅把备用钥匙交下来，没有解释为什么第三把钥匙磨得最亮；Rosa也没有问，只在巡查簿最后一页画了一个小小的记号。
  _effects: state_parameter oj18-odd-apprenticeship.trust 27 -> 37; state_parameter oj18-odd-apprenticeship.strangeKnowledge 18 -> 28; state_parameter oj18-odd-apprenticeship.nightsWorked 0 -> 24; cash 2 (night-shift wages); skill_

- **1937.01** `r13-fam.arrange-childcare::ctx-vienna-authoritarian-1934::milieu-tenement::childcare-war/creche-full` tags: task, care, childcare, work, neighbor, wages, vienna, urban
  托儿所的名额满了，管事的让Rosa把孩子送到城另一头的教会收容所。Rosa算了一趟车钱和路上的时辰，知道赶不上早班。Marie Huber在门口听见，说可以替Rosa看半天，另一半时间让邻居轮着来；Rosa把孩子的名字写在纸条上，贴在自己工牌背面。
  _effects: cash -1 (上工前把小的送下楼); condition; flag +shared_childcare_with_neighbours; relation friend with person-marie-huber; knowledge “the neighbours will take turns watching the child”_

- **1937.01** `state_reaction:ld18-public-desire/a-wedding-invitation` tags: ld18-public-desire, desire, public, scandal, reputation, body, rumor, notoriety
  请柬上写着Rosa的名字，旁边用铅笔注了一句“一个人来也可以”。婚礼上，新娘把手捧花直接递给她，笑着说“下一个该你了”；同桌的人都在等Rosa怎么回答。她把花放在膝上，说这花很香。
  _effects: state_parameter ld18-public-desire.spectacle 65 -> 73; state_parameter ld18-public-desire.shame 10 -> 15; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:007396_

- **1938.01** `r14-edu.sibling-favour::ctx-vienna-authoritarian-1934::milieu-tenement/sibling-fell-ill` tags: education, tutored_sibling, family, reunion, vienna, urban, crisis, war
  Maria Lechner病倒的消息是邻居带来的。Rosa赶到时，屋里只有一张床和一只药罐，孩子坐在门槛上。Rosa留下来照顾了半个月，把自己的夜校报名费垫进了药钱。Maria Lechner退烧那天，叫了Rosa一声小名。药钱六克朗，是Rosa垫的。
  _effects: cash -6 (多年后的一封家信); health -0.020000000000000018 (多年后的一封家信); flag +cared_for_sick_sibling; relation kin with person:evt:world-vienna-1912:000362:child_
  _causes: evt:world-vienna-1912:004627_

- **1938.01** `vienna-life-anschluss-1938/complies` tags: politics, persecution, 1938
  Maria Stein在街口设了登记桌，要求住户交出姓名、职业和宗教。Rosa排队填了表，回家把门牌擦干净。楼里有人连夜搬走，也有人站在阳台上挥手。
  _effects: role; cash -3 (new permits and stamps); condition_

- **1938.01** `vienna-family-courtship/wait-for-a-better-year` tags: family, courtship, household, social, lifecycle
  Rosa把话咽回去，只说等明年工钱稳一点再谈。Franz Berg没有追问，两人把桌上的面包分完，各自去上工；出门时Rosa回头看了一眼，Franz Berg正把掉在桌上的面包屑拢进掌心，谁也没有把那个话头重新拾起来。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-1_

- **1938.01** `office16-scandal.public-hearing::ctx-vienna-authoritarian-1934::milieu-tenement/weathered` tags: office, scandal, media, reputation, politics, power, vienna, urban
  报纸在头版登了Rosa和承包商在一张桌子上的照片，配文只有一句“谁签的字”。质询会开了三个小时，Rosa把合同、比价单和验收记录一页页摊开；记者第二天没有再写，但把照片留在了档案里。
  _effects: reputation -0.029999999999999995; state_add office-under-siege state:world-vienna-1912:472; flag +scandal_weathered; knowledge “照片是真的，合同也是真的；报纸没有再追，但档案里留了底片。”; relation acquaintance with person-materialized-world-vienna-1912-15; flag +office_under_siege_

- **1938.01** `state_tick:ld18-public-desire/the-story-changes-hands/strangers-know-best` tags: ld18-public-desire, desire, public, scandal, reputation, body, rumor, notoriety
  一个陌生女人在电车上叫住Rosa，说自己认识她的“那位”，还劝她趁年轻找个正经人家。Rosa没有回答，提前一站下了车；走在回家的路上，她发现自己的步子越来越快，像在躲一个并不存在的人。
  _effects: state_parameter ld18-public-desire.rumorHeat 50 -> 58; state_parameter ld18-public-desire.shame 15 -> 19; reputation -0.03; mood -0.010000000000000009_

- **1938.01** `r13-civ.enter-hospital::ctx-vienna-authoritarian-1934::milieu-tenement/admitted-third-class` tags: health, hospital, admission, deposit, institution, vienna, urban, crisis
  Helene Bauer把押金收据和住院单钉在一起，让Rosa去三楼东侧等床。走廊里全是折叠床，Anton Weiss给Rosa一条洗得发硬的毯子，说今晚先别喝水。Rosa把鞋塞在枕头下面，听着隔壁的呻吟睡了过去。
  _effects: cash -8 (住院处窗口的押金); health 0.06000000000000005 (住院处窗口的押金); condition; flag +hospitalized_third_class; relation acquaintance with person-materialized-world-vienna-1912-4_

- **1938.12** `major-crisis.rent-increase/pay-the-increase` tags: crisis, housing, rent, eviction, family, poverty, injury
  房东没有露面，只让看门人Mitzi Kral把补款单塞进门缝：每月要多十四克朗，先交十八克朗（本月十四加四克朗手续费）才肯谈续租。Rosa把准备买冬煤的钱数了两遍，还是把钱交了，收据上写的是“自愿捐助”。Mitzi Kral低声说，不签的人已经有两家搬走了，楼下的煤价牌又换了数字。
  _effects: cash -18 (advance payment demanded with the rent increase); relation acquaintance with person-materialized-world-vienna-1912-17; flag +rent_increase_accepted; health -0.020000000000000018 (winter coal money spent on the rent increase); relation acquaintance with person-materialized-world-vienna-1912-17_

- **1939.01** `vienna-family-same-sex-female/public-suspicion` tags: family, intimacy, same_sex, housing, lifecycle, partnership
  楼里的邻居开始议论Rosa和Anna Berg 2。有人把门牌记下来，房东来敲门，说这栋楼不接受“这种住法”；Anna Berg 2把箱子拖出来又推回床下，搬家花掉五克朗，两人那一夜都没睡稳。Rosa在院子里被人盯着看，门上的名字也被人用手指划过。
  _effects: relation partner with person-materialized-world-vienna-1912-101; reputation -0.12; cash -5 (moving and lost rent); role; relation acquaintance with person-materialized-world-vienna-1912-101_

- **1939.01** `curse15-betrayal.signature::ctx-vienna-authoritarian-1934::milieu-tenement/the-seal-was-used` tags: betrayal, office, power, politics, curse, institution, vienna, urban
  Josef Moser 2用Rosa留在抽屉里的印章签了一份采购单，把库房里最后一批煤卖给了城外的砖厂。Rosa发现时，账已经做平，签字栏里是Rosa自己的名字。Josef Moser 2说只是替Rosa省了麻烦，还把那支用旧的印泥放回了原处。
  _effects: cash -3 (为平账先垫出去的钱); reputation -0.1; relation rival with person-materialized-world-vienna-1912-81; condition; flag +seal_used_by_trusted_hand_

- **1939.01** `state_tick:oj18-odd-apprenticeship/strange-year/trusted-with-the-keys` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  两年过去，Rosa已经能闭着眼说出哪块地板会响、哪盏煤气灯该在几点关。师傅把备用钥匙交下来，没有解释为什么第三把钥匙磨得最亮；Rosa也没有问，只在巡查簿最后一页画了一个小小的记号。
  _effects: state_parameter oj18-odd-apprenticeship.trust 37 -> 47; state_parameter oj18-odd-apprenticeship.strangeKnowledge 28 -> 38; state_parameter oj18-odd-apprenticeship.nightsWorked 24 -> 48; cash 2 (night-shift wages); skill_

- **1939.01** `state_tick:ld18-public-desire/the-story-changes-hands/strangers-know-best` tags: ld18-public-desire, desire, public, scandal, reputation, body, rumor, notoriety
  一个陌生女人在电车上叫住Rosa，说自己认识她的“那位”，还劝她趁年轻找个正经人家。Rosa没有回答，提前一站下了车；走在回家的路上，她发现自己的步子越来越快，像在躲一个并不存在的人。
  _effects: state_parameter ld18-public-desire.rumorHeat 58 -> 66; state_parameter ld18-public-desire.shame 19 -> 23; reputation -0.02999999999999997_

- **1939.01** `state_tick:office-under-siege/pressure-year/held-on` tags: office-under-siege, office, scandal, pressure, politics, legal, risk, state
  质询会开了两个小时，Rosa把每一笔签字都念了一遍。没有人被说服，但也没有人再追问；散会时，支持Rosa的人比进门时多了两个。
  _effects: state_parameter office-under-siege.support 60 -> 65; state_parameter office-under-siege.exposure 30 -> 26; state_parameter office-under-siege.months 0 -> 1; mood 0.010000000000000009_

- **1939.01** `agency:recruit_members` tags: agency, agency:recruit_members
  Rosa试图招募Ferdinand Winter 2，但对方担心工作和警察，没有给出承诺。
  _effects: mood -0.010000000000000009_

- **1939.04** `fa17-cabaret.debut::ctx-vienna-authoritarian-1934::milieu-tenement/small-part` tags: art, performance, cabaret, debut, reputation, failure, theatre, vienna
  Josef Huber 2只给了Rosa三句台词和一个端盘子的动作。排练时，Rosa把那三句念得太用力，导演让重来，说“你不是在演一个端盘子的人，你是在演一个怕被看见的人”。首演后没有人记住Rosa，但乐队指挥记住了Rosa每次上台前都在后台数拍子。
  _effects: state_add fa17-starving-artist state:world-vienna-1912:504; cash 1 (小角色的排练补贴); role; flag +debut_small_part; state_add fa17-muse state:world-vienna-1912:505_

- **1939.05** `vienna-tenement-neighbors.lost_room_key/key_stolen_by_stranger` tags: home, social, family, housing
  Rosa记得出门时钥匙还在，回来却没了。Maria Stein说下午看见一个穿灰外套的男人在楼道里转悠，手里晃着一把铜钥匙。两人下楼查看，房门虚掩，抽屉被拉开，攒着买煤的六克朗不见了。Maria Stein陪着Rosa去街角警察岗亭报了案，警察记下灰外套，说会留意。
  _effects: cash -6 (被盗的买煤钱); relation friend with person-materialized-world-vienna-1912-72_

- **1940.01** `vienna-life-injury-recovery/home-care` tags: health, work, family, injury
  Rosa没有去诊所，只用热水和旧布洗了伤口。第二天伤口周围发红，家里人把仅剩的干净床单撕成条。
  _effects: health -0.030000000000000027 (untreated wound); cash -2 (clean cloth)_
  _causes: evt:world-vienna-1912:006664_

- **1940.01** `state_expire:oj18-odd-apprenticeship` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  Rosa的「奇职学徒」到期；相关安排结束。
  _effects: state_remove oj18-odd-apprenticeship state:world-vienna-1912:413; role; flag -odd_job_apprentice_

- **1940.01** `state_expire:ld18-public-desire` tags: ld18-public-desire, desire, public, scandal, reputation, body, rumor, notoriety
  Rosa的「被全城观看的欲望」到期；相关安排结束。
  _effects: state_remove ld18-public-desire state:world-vienna-1912:446; flag -public_desire_active_

- **1940.01** `state_expire:office-under-siege` tags: office-under-siege, office, scandal, pressure, politics, legal, risk, state
  Rosa的「职位受围」到期；相关安排结束。
  _effects: state_remove office-under-siege state:world-vienna-1912:472; flag -office_under_siege_

- **1940.01** `state_tick:fa17-starving-artist/rent-and-pages/a-year-of-work` tags: fa17-starving-artist, art, craft, poverty, recognition, work, pride, ambition
  又一年过去，Rosa把房租、颜料和纸张的钱分开写在一张账单背面。作品没有卖出去几件，但手上的线条比去年稳；夜里，Rosa把一盏煤气灯移到画架最近的地方，继续修改同一个角落。
  _effects: state_parameter fa17-starving-artist.craft 42 -> 46; state_parameter fa17-starving-artist.recognition 12 -> 15; state_parameter fa17-starving-artist.need 55 -> 53; cash 1 (一张小画的价钱); mood 0.020000000000000018_

- **1940.01** `state_tick:fa17-muse/the-sitting-year/absorbed-again` tags: fa17-muse, muse, art, desire, inspiration, dependence, vulnerability, beauty
  画室的门一关，时间就又变成Josef Huber 2的。Rosa坐在同一把椅子上，听见窗外电车经过，数到第七次才被允许动一下；回家路上，Rosa发现自己的围巾上沾着一股松节油味，洗了两次也没掉。
  _effects: state_parameter fa17-muse.dependence 35 -> 41; state_parameter fa17-muse.inspiration 50 -> 52; state_parameter fa17-muse.credit 10 -> 8; mood -0.020000000000000018_

- **1940.01** `task-vienna-bourgeois-youth.concert-outing/balcony-bread` tags: bourgeois, education, culture, salon, university, family, task, task:culture
  Rosa买了两张最便宜的楼座票，一共四克朗。Marie Huber家里起初不准，说星期天要回家吃饭，后来松了口。幕间两人分了一块带来的面包，音乐厅的暖气把外套烘得发烫。
  _effects: cash -4 (两张楼座票); mood 0.08999999999999997; relation friend with person-marie-huber; skill_

- **1940.03** `vienna-housing-move.flat-viewing/flat-viewing-too-damp` tags: housing, home, rent, family, money
  Rosa在单间里站了一刻钟，脚底发潮，墙纸底下透出一股霉味。看门人说刷一层石灰就好，Alois Huber却在门口轻轻咳了一声，提醒这背面没有阳光。Rosa把定金收回口袋，谢过看门人，宁可多付三克朗，也不愿把湿气带进夜里。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-94; flag +still_looking_for_room; relation acquaintance with person-materialized-world-vienna-1912-94_

- **1940.05** `p9-social-family-conflict-care.sick-parent-night/hospital-deposit` tags: family, care, siblings, inheritance, housing, money
  Rosa跑了一趟医院，把Rosa Lechner送进病房：押金三克朗，搪瓷杯和旧毛巾一克朗二十赫勒，头三天的药费三克朗八十赫勒，一共八克朗。护士收走便盆，换上带刻度的玻璃壶。Rosa回到空了的床边，把塌下去的椅子扶正，才发现自己一整天只喝了一杯咖啡。
  _effects: cash -8 (住院押金和住院用品); flag +parent_hospitalized; relation acquaintance with person-materialized-world-vienna-1912-57_

- **1940.10** `vienna-tenement-neighbors.sick_child_doorstep/borrows_coal_risk` tags: home, social, family, housing, injury
  Rosa把自家煤箱里仅剩的四块煤分了两块给Otto Hofer，自己家那一夜没生火，裹着大衣睡的。孩子烧退了，Otto Hofer第二天还煤时多塞了一把粗盐。Rosa当天下午就开始流清鼻涕，第三天咳得直不起腰。
  _effects: health -0.07999999999999996 (受凉咳嗽); food; relation friend with person-materialized-world-vienna-1912-33_

- **1940.10** `vienna-life-overcrowded-flat/move-to-shared-tenement` tags: housing, home, health, family, household, injury
  Rosa把床架拆开，用绳子捆在借来的手推车上，搬进利奥波德城的合租房。押金和车钱花掉八克朗；新住处人多、墙薄，但至少每个人有一块能躺下的地方，Rosa的腰在冷风里疼了一路，夜里却第一次不用侧着身睡。
  _effects: residence; cash -8 (deposit and cart); health -0.020000000000000018 (moving in winter)_

- **1941.01** `office16-budget.sign-or-block::ctx-vienna-authoritarian-1934::milieu-tenement/signed-for-a-favor` tags: office, budget, permit, administration, power, economy, vienna, urban
  Otto Weiss 2在签字前把一张剧院包厢的票根留在桌上，说是“给孩子的”。Rosa把票根推回去，却在许可证上签了名；排水图仍缺一页，但窗口当天就盖了章。扩建开工后，第一场雨把后院淹了半尺。
  _effects: relation friend with person-materialized-world-vienna-1912-79; knowledge “许可证少了一页排水图，盖章时没有补。”; mood 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-79_

- **1941.01** `state_tick:fa17-muse/the-sitting-year/set-a-boundary` tags: fa17-muse, muse, art, desire, inspiration, dependence, vulnerability, beauty
  又一年过去，Rosa学会了在进画室前先问清楚这次要坐多久、画完给谁看。Josef Huber 2嫌Rosa变得难安排，却也不得不把每次画像的时间写在纸上；那张纸后来被Rosa收进了自己的抽屉。
  _effects: state_parameter fa17-muse.autonomy 55 -> 60; state_parameter fa17-muse.credit 8 -> 12; state_parameter fa17-muse.dependence 41 -> 37; mood 0.030000000000000027_

- **1941.01** `agency:recruit_members` tags: agency, agency:recruit_members
  Rosa找到Ferdinand Winter 2，把第二区夜班出租合作社的章程和会费说清楚；对方留下地址，答应下次再来。
  _effects: organization_membership; relation acquaintance with person-materialized-world-vienna-1912-6; knowledge “我通过Rosa加入了第二区夜班出租合作社。”_

- **1941.04** `ad20-loan::ctx-vienna-authoritarian-1934::milieu-tenement/loan-refused` tags: loan, debt, credit, everyday, obligation, money, vienna, urban
  Otto Winter把Rosa的收入证明翻来覆去看了两遍，说数目不够。Rosa问能不能少借一点；Otto Winter说“少借也要还得起”。走出门时，Rosa把证明信重新叠好，发现上面有一道自己刚才捏出的折痕。
  _effects: flag +loan_refused; mood -0.030000000000000027; relation acquaintance with person-otto-winter; cash -1 (paperwork and a wasted morning)_

- **1941.10** `ml18-bank.run-on-the-savings::ctx-vienna-authoritarian-1934::milieu-tenement/leave-it-and-lose-it` tags: bank, money, crisis, savings, risk, reversal, vienna, urban
  Ferdinand Winter 3把Rosa拉到一边，说银行只是缺现钱，资产还在，别去挤兑。Rosa信了他，把存折放回抽屉。两周后，银行关门，玻璃上贴着一张白纸，写着清算人的地址；Anna Berg 2把存折翻到最后一页，发现最后一笔利息停在三个月前。
  _effects: cash -35 (savings lost when the bank closed); state_add ml18-reversal state:world-vienna-1912:595; relation acquaintance with person-materialized-world-vienna-1912-63; condition; flag +savings_lost_in_bank; knowledge “银行关门时，最后一笔利息停在三个月前，清算人只留了一个地址。”; mood -0.010000000000000009; flag +fortune_reversed; mood -0.010000000000000009_

- **1941.12** `mb17-border.permit-window::ctx-vienna-authoritarian-1934::milieu-tenement/turned-back` tags: migration, border, papers, permit, station, official, belonging, vienna
  Helene Bauer把材料推回来，说出生纸缺了教区印章。Rosa解释自己是从乡下赶来的，对方只指了指墙上的告示；排在后头的Anton Winter递来半块面包，两个人坐在候车室里等下一班回去的车，谁也没有先说话。
  _effects: cash -2 (the return ticket and a wasted day); mood -0.05999999999999994; relation acquaintance with person-materialized-world-vienna-1912-41; flag +mb17_turned_back_at_border; knowledge “边境窗口只承认带教区印章的出生证明。”; relation acquaintance with person-materialized-world-vienna-1912-41_

- **1942.01** `hs18-occupation.piano::ctx-vienna-authoritarian-1934::milieu-tenement/sign-the-receipt` tags: occupation, piano, requisition, witness, neighbor, history, vienna, urban
  两名工人把Luise Berg家的钢琴抬上卡车，琴腿在门框上磕掉一块漆。Rosa Lechner把一张纸塞给Rosa，说只要签“屋内无人认领”，就不必再搬第二趟。Rosa签了名，看见Luise Berg站在对面窗帘后，手一直按在玻璃上。
  _effects: state_add hs18-street-witness state:world-vienna-1912:646; relation acquaintance with person:evt:world-vienna-1912:001742:child; knowledge “签字比争辩更快，也比争辩更难忘。”; flag +signed_abandoned_piano_receipt; mood -0.030000000000000027_

- **1942.01** `state_tick:fa17-starving-artist/rent-and-pages/a-year-of-work` tags: fa17-starving-artist, art, craft, poverty, recognition, work, pride, ambition
  又一年过去，Rosa把房租、颜料和纸张的钱分开写在一张账单背面。作品没有卖出去几件，但手上的线条比去年稳；夜里，Rosa把一盏煤气灯移到画架最近的地方，继续修改同一个角落。
  _effects: state_parameter fa17-starving-artist.craft 46 -> 50; state_parameter fa17-starving-artist.recognition 15 -> 18; state_parameter fa17-starving-artist.need 53 -> 51; cash 1 (一张小画的价钱); mood 0.020000000000000018_

- **1942.01** `state_tick:fa17-muse/the-sitting-year/absorbed-again` tags: fa17-muse, muse, art, desire, inspiration, dependence, vulnerability, beauty
  画室的门一关，时间就又变成Josef Huber 2的。Rosa坐在同一把椅子上，听见窗外电车经过，数到第七次才被允许动一下；回家路上，Rosa发现自己的围巾上沾着一股松节油味，洗了两次也没掉。
  _effects: state_parameter fa17-muse.dependence 37 -> 43; state_parameter fa17-muse.inspiration 52 -> 54; state_parameter fa17-muse.credit 12 -> 10; mood -0.020000000000000018_

- **1942.01** `state_tick:ml18-reversal/reversal-half-year/another-turn-of-the-screw` tags: ml18-reversal, money, luck, reversal, risk, debt, reputation, loss
  补洞的钱又从另一个洞漏出去：煤价涨了，房东换了锁，那个说好下月还钱的人搬走了。Rosa在账本上把同一笔支出记了两次，第二次是因为不相信第一次。夜里听见楼梯响，就以为是债主。
  _effects: state_parameter ml18-reversal.swing -45 -> -53; state_parameter ml18-reversal.strain 50 -> 58; cash -2 (coal, a new lock and a missing debtor)_

- **1942.01** `agency:recruit_members` tags: agency, agency:recruit_members
  Rosa找到Anton Weiss，把第二区夜班出租合作社的章程和会费说清楚；对方留下地址，答应下次再来。
  _effects: organization_membership; relation acquaintance with person-materialized-world-vienna-1912-4; knowledge “我通过Rosa加入了第二区夜班出租合作社。”_

- **1942.09** `vienna-social-movement.recruitment/join-and-carry` tags: development, social_movement, organization, politics
  Rosa在楼梯下面接到一张折成四折的传单。纸上没有署名，只写着下一次集会的地址。Rosa去了，在昏暗的屋里报上姓名，成为Wiener Psychoanalytische Vereinigung的一员，并答应负责自己所在街区的联络。
  _effects: organization_membership; relation acquaintance with person:evt:world-vienna-1912:001751:child_

- **1942.09** `bc18-inherit.parrot-condition::ctx-vienna-authoritarian-1934::milieu-tenement/parrot-dies` tags: inheritance, family, condition, absurd, death, legal, quiet, vienna
  鹦鹉死在第二个冬天。窗缝里灌进来的风把笼布吹开，它缩在食盆旁边，像一团被揉皱的灰纸。Helene Bauer说条件没有完成，十二克朗归了姑妈的教子；Rosa把鸟埋在院子里，留下那只笼子。春天，笼子里长出一丛野草，Rosa没有拔。
  _effects: cash -2 (鹦鹉的药费和笼布); reputation -0.010000000000000009; relation kin with person-materialized-world-vienna-1912-77; condition; flag +parrot_died_before_the_will_

- **1942.12** `hs18-radio.rumor::ctx-vienna-authoritarian-1934::milieu-tenement/turn-it-up` tags: radio, blackout, rumor, panic, neighbor, politics, vienna, urban
  停电后的第三个小时，Helene Bauer把收音机搬到楼道，电池快没电了。女播音员说“请市民保持镇静”，随后是一段军乐。Rosa听见有人开始收拾行李；楼下的铁门被风撞了三次，像有人在敲。
  _effects: state_add hs18-blackout-rumor state:world-vienna-1912:647; relation acquaintance with person-materialized-world-vienna-1912-45; flag +heard_radio_rumor_

- **1943.01** `fw19-split.evacuation-list::ctx-vienna-authoritarian-1934::milieu-tenement/refuse-the-list` tags: evacuation, railway, children, occupation, choice, vienna, urban, crisis
  Rosa把两个名字都从疏散表上划掉。Otto Weiss 2提醒说，留下的人要自己找地窖；那天夜里，Rosa把床挪到走廊，让两个孩子睡在离门最近的地方。
  _effects: state_parameter occupied-city-regime.severity 0.6 -> 0.7; state_parameter raising-child.caregiverBurden 59 -> 71; food; flag +refused_evacuation_

- **1943.01** `state_tick:fa17-muse/the-sitting-year/set-a-boundary` tags: fa17-muse, muse, art, desire, inspiration, dependence, vulnerability, beauty
  又一年过去，Rosa学会了在进画室前先问清楚这次要坐多久、画完给谁看。Josef Huber 2嫌Rosa变得难安排，却也不得不把每次画像的时间写在纸上；那张纸后来被Rosa收进了自己的抽屉。
  _effects: state_parameter fa17-muse.autonomy 60 -> 65; state_parameter fa17-muse.credit 10 -> 14; state_parameter fa17-muse.dependence 43 -> 39; mood 0.030000000000000027_

- **1943.01** `state_tick:ml18-reversal/reversal-half-year/another-turn-of-the-screw` tags: ml18-reversal, money, luck, reversal, risk, debt, reputation, loss
  补洞的钱又从另一个洞漏出去：煤价涨了，房东换了锁，那个说好下月还钱的人搬走了。Rosa在账本上把同一笔支出记了两次，第二次是因为不相信第一次。夜里听见楼梯响，就以为是债主。
  _effects: state_parameter ml18-reversal.swing -53 -> -61; state_parameter ml18-reversal.strain 58 -> 66; cash -2 (coal, a new lock and a missing debtor); mood -0.030000000000000027_

- **1943.01** `state_tick:hs18-street-witness/memory-drift/holds` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Rosa又把那天的顺序在脑子里走了一遍：先是门响，再是靴子，最后才是那声喊。细节还在，只是每讲一次，旁边就多出一点别人替你补上的颜色。
  _effects: state_parameter hs18-street-witness.certainty 85 -> 87_

- **1943.01** `agency:attend_meeting` tags: agency, agency:attend_meeting
  Rosa走到Berggasse 19, Wohnung und Ordination门口，看见便衣和拥挤的人群，最终没有进去。
  _effects: mood -0.020000000000000018_

- **1943.05** `vienna-parish-aid.rent-box/rent-box.food-only` tags: faith, parish, mutual_aid, poverty, family
  Rosa只收下篮里的面包和豆子，把煤袋推回Otto Winter手里，说房租自己再想办法，请她们给介绍点零工。Otto Winter把煤放在走廊窗台，说礼拜四后院有人要拆旧木箱，一赫勒一捆，工钱不多但现结。Rosa记下门牌，答应一早过去。
  _effects: food; flag +seeking_work; relation acquaintance with person-otto-winter_

- **1943.12** `r3-mig.ship-passage::ctx-vienna-authoritarian-1934::milieu-tenement/steerage-in-a-storm` tags: migration, ship, steerage, travel, health, vienna, urban, crisis
  Rosa的铺位在舱口下面，白天盖板一关，空气里全是煤灰和呕吐物的味道。第三天起风，船横着走了半天，Josef Stein把一桶海水泼在甲板上，说“吐完就好了”。Rosa抓着床架，听见螺旋桨露出水面的声音。
  _effects: health -0.07999999999999996 (甲板下的煤灰); condition; flag +steerage_in_storm; relation acquaintance with person-materialized-world-vienna-1912-66; knowledge “the steerage hatch is closed in heavy weather”; relation acquaintance with person-materialized-world-vienna-1912-91_

- **1943.12** `office16-budget.sign-or-block::ctx-vienna-authoritarian-1934::milieu-tenement/signed-with-margin` tags: office, budget, permit, administration, power, economy, vienna, urban
  Rosa在预算表上签了字，把冬季煤房的款项从三笔并成一笔，又给夜班守卫加了半份津贴。Rosa Lechner算出省下的钱刚好够修屋顶；没有人鼓掌，但一月的会议室不再需要穿大衣。
  _effects: reputation 0.03999999999999998; skill; mood 0.020000000000000018; flag +signed_balanced_budget; knowledge “把冬季煤房的款项并成一笔后，省下的钱够修会议室屋顶。”_

- **1944.01** `vienna-family-courtship/ask-to-share-a-home` tags: family, courtship, household, social, lifecycle
  Rosa在Leopoldstädter Zinshaus, gemeinsamer Gang靠窗的桌边，把一只空咖啡杯转了半圈，说房租两人合付、桌子两人共用。Emil 2的手停在糖罐盖上，问了一句“要是过不下去呢”，没有当场答应，只说要想一想；杯里的咖啡凉了，话还悬在桌面上。
  _effects: interaction_

- **1944.01** `hist15-occ.requisition-notice::ctx-vienna-authoritarian-1934::milieu-tenement/hide-the-last-sack` tags: occupation, requisition, shortage, institution, history, family, vienna, urban
  Rosa把最后一袋黑麦埋进煤堆下面，夜里听见巡逻队从窗前走过。第二天面包房照常开门，但货架上少了三排面包；Rosa知道那不是因为城里没有粮。
  _effects: food; mood 0.020000000000000018; flag +hidden_grain_

- **1944.01** `p9-gap-adult-solitude.stopped-clock/stopped-clock.repair-shop` tags: adulthood, daily, solitude, ordinary, home, clock, time
  Rosa用围裙裹着钟走到钟表铺，铺子里的老头把钟翻过来看了看，说要换发条，连工带料一克朗二十赫勒。她算了算这星期的菜钱，把钟又裹回围裙里提回家，搁在柜上，没再提修的事。
  _effects: mood -0.020000000000000018_

- **1944.01** `state_tick:fa17-starving-artist/rent-and-pages/another-rejection` tags: fa17-starving-artist, art, craft, poverty, recognition, work, pride, ambition
  画店老板把Rosa的作品推回来，说尺寸不合墙面，题材也不合买主的口味。Rosa抱着画走回阁楼，路上经过一家亮着灯的咖啡馆，玻璃里映出一个抱着旧画框的人，像一个迟到的搬运工。
  _effects: state_parameter fa17-starving-artist.need 51 -> 58; state_parameter fa17-starving-artist.recognition 18 -> 17; state_parameter fa17-starving-artist.integrity 65 -> 62; health -0.020000000000000018 (冬天阁楼里没有足够的煤)_

- **1944.01** `state_tick:fa17-muse/the-sitting-year/absorbed-again` tags: fa17-muse, muse, art, desire, inspiration, dependence, vulnerability, beauty
  画室的门一关，时间就又变成Josef Huber 2的。Rosa坐在同一把椅子上，听见窗外电车经过，数到第七次才被允许动一下；回家路上，Rosa发现自己的围巾上沾着一股松节油味，洗了两次也没掉。
  _effects: state_parameter fa17-muse.dependence 39 -> 45; state_parameter fa17-muse.inspiration 54 -> 56; state_parameter fa17-muse.credit 14 -> 12_

- **1944.01** `state_expire:ml18-reversal` tags: ml18-reversal, money, luck, reversal, risk, debt, reputation, loss
  Rosa的「运势倒转」到期；相关安排结束。
  _effects: state_remove ml18-reversal state:world-vienna-1912:595; flag -fortune_reversed_

- **1944.01** `state_expire:institution-purge` tags: institution-purge, purge, repression, organization, loyalty, surveillance, politics, state
  Rosa的「组织清洗」到期；相关安排结束。
  _effects: state_remove institution-purge state:world-vienna-1912:621_

- **1944.01** `state_tick:hs18-street-witness/memory-drift/blurs` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Rosa忽然想不起那个人先迈的是左脚还是右脚。邻居说自己记得清清楚楚，还补了一个细节；Rosa听着，竟分不清那是自己看见的，还是后来听来的。
  _effects: state_parameter hs18-street-witness.certainty 87 -> 79_

- **1944.01** `r13-edu.study-group::ctx-vienna-authoritarian-1934::milieu-tenement/both-pass-exam` tags: education, study_group, mutual_aid, politics, belonging, vienna, urban, crisis
  Rosa和Ferdinand Weiss 2在阁楼里支起一块旧门板当桌子，每周三晚上互相考问。Ferdinand Weiss 2把容易错的公式写在烟盒背面，Rosa负责讲解历史背景。考试结果出来，两个人都过了，Ferdinand Weiss 2把烟盒送给Rosa作纪念，说以后别再弄丢。烟盒被Rosa放在书架上，一直没拆。
  _effects: flag +study_group_passed; skill; relation colleague with person-materialized-world-vienna-1912-71_

- **1944.07** `p9-social-courtship-friendship.opened-letter/opened-letter-church-steps` tags: courtship, friendship, social, adulthood, reputation, leopoldstadt
  Rosa请同住的Elisabeth Huber 2跑一趟，把Anna 2约到教堂前的台阶上。石台阶还带着晨露，两人各占一级，把原信从头念完；念到“工钱”那处，Anna 2说那是家里人的意思，不是自己的话。Rosa把信纸折回原样，至少这一回没有隔着别人传话。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-106; relation acquaintance with person:evt:world-vienna-1912:001785:child; relation acquaintance with person-materialized-world-vienna-1912-106_

- **1945.01** `interaction_response` tags: interaction, partnership, household
  Emil 2在几天后找到Rosa，说可以试试。两人开始合付房租，也把各自欠的账摊在桌上。
  _effects: relation partner with person:evt:world-vienna-1912:001808:child; household; role; interaction_
  _causes: evt:world-vienna-1912:011062_

- **1945.01** `vienna-life-injury-recovery/wound-infection` tags: health, work, family, injury
  Rosa的伤口在几天后肿起来，手腕发热。医生说要切开引流，费用比上次更高；Rosa看着账单，先问能不能分两次付。
  _effects: health -0.009166666666667067 (wound infection); cash -14 (drainage and medicine（其中14克朗记入债务）); condition_
  _causes: evt:world-vienna-1912:011256_

- **1945.01** `vienna-life-1945-liberation/survives` tags: war, liberation, 1945
  苏联士兵进城时，Rosa躲在门后听见坦克履带压过石板路。几天后街口贴出告示，Rosa去领了一份汤和一块面包。
  _effects: role; food; cash -2 (replacement documents（其中2克朗记入债务）)_

- **1945.01** `office16-rival.removal-motion::ctx-vienna-postwar-1945::milieu-tenement/motion-carries` tags: office, rivalry, politics, removal, power, intrigue, vienna, urban
  投票结果是十九比十七。Rosa把印章、钥匙和一本写满批注的账本放进纸箱，最后一圈走廊走得比平时慢。Alois Hofer在门口等着接手，手里已经拿着新的编制表；表上第一个被划掉的名字是Rosa的秘书。
  _effects: position_end 夜班司机 @taxi:person-phase15-Rosa-world-vienna-1912-evt:world-vienna-1912:006663; reputation -0.04999999999999999; condition; relation rival with person-materialized-world-vienna-1912-15; flag +removed_by_vote; knowledge “新编制表第一个划掉的是我的秘书。”_

- **1945.01** `state_tick:fa17-muse/the-sitting-year/absorbed-again` tags: fa17-muse, muse, art, desire, inspiration, dependence, vulnerability, beauty
  画室的门一关，时间就又变成Josef Huber 2的。Rosa坐在同一把椅子上，听见窗外电车经过，数到第七次才被允许动一下；回家路上，Rosa发现自己的围巾上沾着一股松节油味，洗了两次也没掉。
  _effects: state_parameter fa17-muse.dependence 45 -> 51; state_parameter fa17-muse.inspiration 56 -> 58; state_parameter fa17-muse.credit 12 -> 10_

- **1945.01** `state_tick:hs18-street-witness/memory-drift/blurs` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Rosa忽然想不起那个人先迈的是左脚还是右脚。邻居说自己记得清清楚楚，还补了一个细节；Rosa听着，竟分不清那是自己看见的，还是后来听来的。
  _effects: state_parameter hs18-street-witness.certainty 79 -> 71_

- **1945.01** `kernel-social.lending::ctx-vienna-postwar-1945::milieu-tenement/lending.refused` tags: task, task:social, social, lending, debt, neighbor, money, everyday
  Rosa说自己也等钱交房租，把口袋翻给Luise Bauer看。Luise Bauer没有再求，转身去敲另一扇门；第二天，楼道里有人说Rosa见死不救，Rosa听见了，只把煤筐往门里挪了挪。那天夜里，两家都早早关了灯。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-19; role; reputation -0.030000000000000027; knowledge “邻居转身去敲了别人的门，楼道里开始议论这件事。”; relation acquaintance with person-materialized-world-vienna-1912-19_

- **1945.07** `vienna-family-childbirth/difficult-birth` tags: family, childbirth, death, lifecycle, birth, state, state:raising-child, raising-child
  Rosa难产，接生的人守了两天。孩子最后生下来，取名Grete 2；Rosa一直发烧，医院又收走二十克朗，Emil 2把钟表送进当铺。Rosa落下产后虚弱的毛病，抱孩子时手臂发抖，站久了眼前就发黑。
  _effects: birth female; condition; cash -20 (midwife and hospital（其中20克朗记入债务）); state_add raising-child state:world-vienna-1912:770_

- **1945.10** `vienna-legacy-worklife.sick-fund/sick-fund.keep-quiet` tags: legacy, work, family, reform, ordinary_life, injury
  止咳药水是褐色的，瓶口塞着软木塞，摇一摇会起沫。Rosa看着工友把表折成小块，折了三折才塞进帽檐。墙上的规章还贴在那里，纸角被风掀起，没人去按。
  _effects: health -0.04 (没有正规病假，只能靠药水撑着); relation colleague with person-materialized-world-vienna-1912-44_

- **1946.01** `hs18-blackout.denial::ctx-vienna-postwar-1945::milieu-tenement/read-it-aloud` tags: blackout, rumor, denial, official, neighbor, ambiguity, vienna, urban
  Hermann Berg把一张辟谣告示贴在电线杆上，说昨夜只是线路故障，没有人被捕。Rosa站在旁边，把告示从头到尾念给不识字的人听；念到“请勿传播谣言”时，Alois Hofer在人群里咳了一声。
  _effects: state_parameter hs18-blackout-rumor.officialDenial true -> true; state_parameter hs18-blackout-rumor.credibility 35 -> 30; state_parameter hs18-blackout-rumor.panic 37 -> 32; reputation 0.020000000000000018; flag +read_denial_aloud; knowledge “告示上的字和昨夜听到的话对不上。”_

- **1946.01** `state_tick:fa17-starving-artist/rent-and-pages/a-year-of-work` tags: fa17-starving-artist, art, craft, poverty, recognition, work, pride, ambition
  又一年过去，Rosa把房租、颜料和纸张的钱分开写在一张账单背面。作品没有卖出去几件，但手上的线条比去年稳；夜里，Rosa把一盏煤气灯移到画架最近的地方，继续修改同一个角落。
  _effects: state_parameter fa17-starving-artist.craft 50 -> 54; state_parameter fa17-starving-artist.recognition 17 -> 20; state_parameter fa17-starving-artist.need 58 -> 56; cash 1 (一张小画的价钱); mood 0.020000000000000018_

- **1946.01** `state_expire:fa17-muse` tags: fa17-muse, muse, art, desire, inspiration, dependence, vulnerability, beauty
  Rosa的「画布上的人」到期；相关安排结束。
  _effects: state_remove fa17-muse state:world-vienna-1912:505_

- **1946.01** `state_tick:hs18-street-witness/memory-drift/holds` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Rosa又把那天的顺序在脑子里走了一遍：先是门响，再是靴子，最后才是那声喊。细节还在，只是每讲一次，旁边就多出一点别人替你补上的颜色。
  _effects: state_parameter hs18-street-witness.certainty 71 -> 73_

- **1946.01** `r13-civ.midwife::ctx-vienna-postwar-1945::milieu-tenement/doctor-called` tags: health, midwife, birth, neighbor, night, vienna, urban, postwar
  Berta Weiss摸了半天肚子，忽然让Rosa去街口叫医生，说胎位不对。Rosa披着外套跑过两条街，医生来了以后只说了句“送医院”，又收了一次出诊费。天亮前，马车才把Elisabeth Huber 2拉走。
  _effects: cash -5 (夜里敲接生婆的门); flag +complicated_birth_sent_to_hospital; relation colleague with person-berta-weiss; knowledge “the midwife suspected a malpresentation before dawn”_

- **1946.02** `p9-gap-adult-solitude.river-walk/river-walk.bridge` tags: adulthood, daily, solitude, ordinary, home, walk, river
  Rosa在桥边站了一会儿，看一艘平底船靠岸卸煤，几个工人用铁锹往岸上甩。风把煤灰吹到她脸上，她抹了一把，往回走时脚步比来时轻，回到巷口还给自己买了块三赫勒的糖。
  _effects: mood 0.06000000000000005; cash -0.03 (买了三赫勒的糖（其中0.03克朗记入债务）)_

- **1946.02** `bc18-ghost.death-certificate::ctx-vienna-postwar-1945::milieu-tenement/correct-it-twice` tags: bureaucracy, legal, death, identity, mistake, paperwork, absurd, vienna
  Rosa在窗口要求更正，Alois Hofer把表格翻了三遍，最后开出一张新的出生证明，名字却少了一个字母。于是城里同时住着一个死人、一个活人，和一个只在档案里出生的陌生人。Rosa拿着两张纸站在区公所门口，忽然不知道该用哪一张去领下个月的煤票。
  _effects: cash -1 (更正材料的手续费和车钱（其中1克朗记入债务）); state_add bc18-bureaucratic-ghost state:world-vienna-1912:798; relation rival with person-materialized-world-vienna-1912-15; condition; flag +two_living_files_one_death; mood -0.030000000000000027; flag +bureaucratic_ghost; mood -0.010000000000000009_

- **1946.12** `vienna-women-housework.wash-day/wash-day.rush` tags: gender, housework, home, labour, family
  木盆边的水渍映着天光，Rosa跪在石阶上揉搓床单，肘弯发酸。晾绳上的湿布滴答作响，Berta Kraus探身把自家被单也挂上去，两人没多说话。
  _effects: relation acquaintance with person:evt:world-vienna-1912:000333:child_

- **1947.01** `vienna-family-childbirth/son-born` tags: family, childbirth, death, lifecycle, birth, state, state:raising-child, raising-child
  Rosa在Leopoldstädter Zinshaus, gemeinsamer Gang生下一个男婴，取名Otto 2。工友凑的钱抵了一部分，家里还是从糖罐里数出六克朗给接生的人；Emil 2把消息带到工厂，回来时把唯一的摇篮重新刷了一遍，Rosa躺在床上出了一身虚汗。
  _effects: birth male; cash -6 (midwife fee（其中1克朗记入债务）); state_add raising-child state:world-vienna-1912:836_

- **1947.01** `ml18-family.fortune-split::ctx-vienna-postwar-1945::milieu-tenement/the-sibling-takes-it` tags: family, money, windfall, inheritance, conflict, dark, vienna, urban
  晚饭后的第三天，Rosa去邮局取钱，发现存折上少了三十克朗。Maria Lechner在母亲的旧照片前承认拿了钱，说这些年照顾母亲的情分总该折成数目。Emil 2去叫了警察；Rosa站在两个最熟悉的人中间，听见楼下有人把留声机开得很响。
  _effects: cash -30 (the sibling took thirty crowns from the savings book（其中30克朗记入债务）); state_parameter ml18-sudden-fortune.principal 52 -> 22; state_parameter ml18-sudden-fortune.claims 2 -> 5; relation rival with person:evt:world-vienna-1912:000362:child; condition; flag +family_fortune_stolen; knowledge “存折上少了三十克朗，取款单上的签名是模仿的。”; mood -0.020000000000000018_

- **1947.01** `state_expire:hs18-street-witness` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Rosa的「街面上的目击者」到期；相关安排结束。
  _effects: state_remove hs18-street-witness state:world-vienna-1912:646_

- **1947.01** `state_tick:bc18-bureaucratic-ghost/paper-trail-year/kept-the-files-apart` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  这一年，Rosa学会了同时带三张纸出门：一张证明活着，一张证明死了，一张证明自己从没搬过家。窗口后面的人各自只看自己那一张，偶尔还会夸Rosa的材料齐全。年底，Rosa从补发的配给里省下一小袋面粉，觉得自己像个熟练的走私犯。
  _effects: state_parameter bc18-bureaucratic-ghost.fileDepth 40 -> 44; state_parameter bc18-bureaucratic-ghost.risk 15 -> 10; cash 1 (省下的配给和车钱); mood 0.010000000000000009_

- **1947.01** `r13-work.deliver-goods::ctx-vienna-postwar-1945::milieu-tenement/delivered-on-time` tags: commerce, delivery, transport, weather, bribe, vienna, urban, postwar
  Rosa把十二只木箱码在板车上，用麻绳捆了两道，轮子碾过石子路时，箱角互相磕着响。走到第三道街口，车轴响了一声，Helene Weiss蹲下去紧了紧销子。货送到时比约定早半个钟头，店主验完封条，在送货单上画了押。
  _effects: cash 6 (板车上的十二箱); flag +work13_delivered_goods_on_time; relation colleague with person-materialized-world-vienna-1912-5_

- **1947.05** `df18-dream.water-in-the-cellar::ctx-vienna-postwar-1945::milieu-tenement/tell-the-landlord` tags: dream, omen, home, water, coincidence, eerie, everyday, vienna
  Rosa把梦告诉房东。房东笑了一声，说老房子下水慢，做梦都带水汽。第二天，房东带人来查，真在墙里找到一条裂缝，顺手把地窖的租金减了一克朗。Rosa把省下的钱买了一盏新灯，放在楼梯口。
  _effects: cash 1 (房东减掉的一克朗地窖租金); reputation 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-33; knowledge “房东因为我的梦查了墙，减了地窖租金。”; flag +df18_landlord_fixed_crack; mood 0.020000000000000018_

- **1947.07** `vienna-medical-treatment.toothache/barber-pull` tags: health, medical, family, money
  理发铺里还坐着等刮脸的老主顾，肥皂味和烟味混在一起。弗朗茨把围布往Rosa胸前一系，说忍着点。钳子第一次滑脱，第二次才夹稳，牙出来时带着一小块肉，他用明矾水按住了。
  _effects: cash -1.2 (理发师拔牙收费（其中0.2克朗记入债务）); health 0.03 (病牙被拔除但手法粗糙); mood -0.020000000000000018_

- **1948.01** `bc18-ghost.double-tax::ctx-vienna-postwar-1945::milieu-tenement/ghost-pays` tags: bureaucracy, tax, identity, paperwork, legal, absurd, money, vienna
  死人的档案里挂着一笔从未结清的税，Rosa索性让那笔账继续欠着，自己用活人的名字去领煤票。两个窗口各自记账，互不打扰；Rosa每月省下一克朗，却要绕两条街，避免同时经过两家税务所。
  _effects: cash -1 (绕路多花的车钱（其中1克朗记入债务）); state_parameter bc18-bureaucratic-ghost.fileDepth 44 -> 52; state_parameter bc18-bureaucratic-ghost.risk 10 -> 22; flag +clean_living_tax_record; mood 0.010000000000000009; relation acquaintance with person-materialized-world-vienna-1912-121_

- **1948.01** `state_tick:fa17-starving-artist/rent-and-pages/a-year-of-work` tags: fa17-starving-artist, art, craft, poverty, recognition, work, pride, ambition
  又一年过去，Rosa把房租、颜料和纸张的钱分开写在一张账单背面。作品没有卖出去几件，但手上的线条比去年稳；夜里，Rosa把一盏煤气灯移到画架最近的地方，继续修改同一个角落。
  _effects: state_parameter fa17-starving-artist.craft 54 -> 58; state_parameter fa17-starving-artist.recognition 20 -> 23; state_parameter fa17-starving-artist.need 56 -> 54; cash 1 (一张小画的价钱); mood 0.020000000000000018_

- **1948.01** `state_tick:bc18-bureaucratic-ghost/paper-trail-year/another-window-opens` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  一个税务员把Rosa的死亡记录和一张新房租收据订在一起，寄到了另一个区。三个星期后，Rosa收到一封要求“已故纳税人”补缴暖气税的信；去问时，窗口说档案正在路上，让Rosa先等通知。通知没有来，房租却涨了。
  _effects: state_parameter bc18-bureaucratic-ghost.fileDepth 52 -> 59; state_parameter bc18-bureaucratic-ghost.risk 22 -> 32; cash -1 (跑窗口的车钱); flag +heating_tax_for_the_dead; mood -0.030000000000000027_

- **1948.01** `r13-fam.adopt-child::ctx-vienna-postwar-1945::milieu-tenement::adoption-reform/new-law-applied` tags: task, family, adoption, child, law, household, vienna, urban
  新颁布的未成年人保护法允许养父母登记，但办事处的表格还是旧版，没有“养”这一栏。Hermann Berg翻出一叠空白纸，让Rosa把情况写在背面，又请科长来签字。Ferdinand Weiss在长椅上数墙上的挂钟，数到第三遍时，Hermann Berg终于把章盖了下来。
  _effects: cash -6 (登记簿上的新姓氏); flag +adoption_under_reform_law; role; relation guardian with person:evt:world-vienna-1912:011781:child; knowledge “the reform law allows adoption but offices still use old for”; household_

- **1948.02** `statistical_infection`
  Rosa在Leopoldstädter Zinshaus, gemeinsamer Gang病倒了，肺炎让身体发热、虚弱，接下来的日子只能卧床。

- **1948.03** `statistical_illness_worsened`
  Rosa的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1948.04** `statistical_recovery`
  Rosa从肺炎中慢慢恢复，能下床喝水，但身体还虚弱。

- **1948.07** `vienna-adult-social.burial-fund/burial-fund.paid` tags: adulthood, social, work, family
  车间里管互助会的Elisabeth 2在午休时把本子摊在Rosa的工具箱上，说这个月还差最后一份月钱。Rosa从马甲内袋摸出二十个克罗伊策，Elisabeth 2当着他的面在本子上画了钩。
  _effects: cash -0.3 (缴纳丧葬互助会的月钱（其中0.3克朗记入债务）); relation colleague with person:evt:world-vienna-1912:003490:child; reputation 0.03999999999999998_

- **1948.12** `vienna-legacy-worklife.apprentice-wage/apprentice-wage.ask-master` tags: legacy, work, family, reform, ordinary_life
  掌柜的木尺敲了两下柜台，声音短促。Rosa把问题又问了一遍，掌柜才说师兄是“老规矩进来的”。师兄这时转过身，笑了一下，笑得不太自然，说“没事，你问得对”。
  _effects: reputation -0.03999999999999998; relation colleague with person-materialized-world-vienna-1912-35; skill; relation acquaintance with person-materialized-world-vienna-1912-35_

- **1949.01** `bc18-ghost.own-funeral::ctx-vienna-postwar-1945::milieu-tenement/lets-it-run` tags: bureaucracy, funeral, mistaken_identity, public, absurd, death, humiliation, vienna
  Rosa没有进门，只站在酒馆对面的雨棚下。Luise Berg在里面念悼词，说死者一生慷慨、爱吃甜、从不欠账；Rosa听见这些不属于自己的好话，忽然哭了起来。捐款盘里收了六克朗，Luise Berg把它们包进手帕。Rosa等到灯灭才走，雨已经停了。
  _effects: cash -1 (在雨棚下买的热酒（其中1克朗记入债务）); state_parameter bc18-bureaucratic-ghost.risk 32 -> 37; relation kin with person:evt:world-vienna-1912:001742:child; knowledge “远亲记得的并不是我欠过的账，而是我爱吃甜。”; condition; flag +watched_own_wake; mood -0.010000000000000009; relation acquaintance with person-materialized-world-vienna-1912-119_

- **1949.01** `state_tick:bc18-bureaucratic-ghost/paper-trail-year/kept-the-files-apart` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  这一年，Rosa学会了同时带三张纸出门：一张证明活着，一张证明死了，一张证明自己从没搬过家。窗口后面的人各自只看自己那一张，偶尔还会夸Rosa的材料齐全。年底，Rosa从补发的配给里省下一小袋面粉，觉得自己像个熟练的走私犯。
  _effects: state_parameter bc18-bureaucratic-ghost.fileDepth 59 -> 63; state_parameter bc18-bureaucratic-ghost.risk 37 -> 32; cash 1 (省下的配给和车钱); mood 0.010000000000000009_

- **1949.01** `kernel-health.task-house-call::ctx-vienna-postwar-1945::milieu-tenement::house-call-medical-students/house-call-medical-teaching` tags: health, task, house_call, care, poverty, vienna, urban, postwar
  医院派来一名实习医生，身后跟着两个学生。他们把Rosa的胸口听了个遍，最后请来上级；药费减半，但Rosa被当成了讲课的病例。学生们走后，实习医生把听诊器在手里捂了很久，才敢再贴上来。
  _effects: cash -4 (reduced fee for a teaching-house call（其中1克朗记入债务）); health 0.03 (examined by a teaching team); condition; role; knowledge “教学出诊会有实习医生和学生轮流听诊，最后请上级定方案，药费可以减半。”_

- **1949.08** `vienna-parish-aid.rent-box/rent-box.accept-all` tags: faith, parish, mutual_aid, poverty, family
  煤袋落在台阶上，扬起细细一层黑末。Franz Weiss用铅笔头在蓝格册上写门牌号，问房东姓什么，又叮嘱别把面包票弄丢。灶上水壶开始叫，Rosa才想起屋里连只干净的杯子都没有。
  _effects: cash 6 (互助会补上本月房租差额); food; relation acquaintance with person-materialized-world-vienna-1912-25; flag +parish_registered_

- **1949.09** `vienna-housing-move.sublet-room/sublet-full` tags: housing, home, rent, family, money, household
  Rosa把床上的旧褥子重新铺平，Maria Lechner放下自己的铺盖卷，从怀里掏出一把钥匙看了看。厨房里多了一口人的碗，灶边的煤省着烧也够。Friedrich Berg在门口看了一眼，没多话。
  _effects: cash 4 (出租空床收进的月租); household; relation acquaintance with person-materialized-world-vienna-1912-23; relation acquaintance with person-materialized-world-vienna-1912-23_

- **1950.01** `state_expire:fa17-starving-artist` tags: fa17-starving-artist, art, craft, poverty, recognition, work, pride, ambition
  Rosa的「饥饿的创作者」到期；相关安排结束。
  _effects: state_remove fa17-starving-artist state:world-vienna-1912:504_

- **1950.01** `state_expire:bc18-bureaucratic-ghost` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  Rosa的「档案里的活鬼」到期；相关安排结束。
  _effects: state_remove bc18-bureaucratic-ghost state:world-vienna-1912:798; flag -bureaucratic_ghost_

- **1950.01** `r13-fam.write-missing-relative::ctx-vienna-postwar-1945::milieu-tenement/letter-returned` tags: task, family, letter, missing, war, literacy, vienna, urban
  信过了三个星期被退回来，信封上盖着“查无此人”，边角已经磨毛。Elisabeth Huber 2不认得那四个字，让Rosa念；Rosa念成“还在路上”，把信折好放进抽屉。Elisabeth Huber 2点点头，第二天又问有没有回信。
  _effects: cash -1 (没有地址的信); flag +letter_returned_undeliverable; relation kin with person-materialized-world-vienna-1912-106_

- **1950.02** `ad20-favor-called-in::ctx-vienna-postwar-1945::milieu-tenement/do-the-favor` tags: favor, obligation, everyday, trust, debt, risk, vienna, urban
  Katharina Lechner说只需要Rosa在明天下午去一趟车站，把一个箱子交给穿灰外套的人。Rosa问箱子里是什么；Katharina Lechner说“你不需要知道”。Rosa还是去了，因为当年Katharina Lechner替Rosa垫过一笔医药费。
  _effects: state_add ad20-private-bargain state:world-vienna-1912:977; cash -1 (the trip to the station（其中1克朗记入债务）); relation acquaintance with person:evt:world-vienna-1912:000086:child; flag +favor_done; mood -0.010000000000000009; knowledge “箱子里是什么，邻居没有说。”; flag +private_bargain_active_

- **1951.01** `vienna-social-movement.recruitment/report-to-official` tags: development, social_movement, organization, politics
  Rosa把传单交给楼里的门房。门房没有接，只让Rosa自己去找警察局。那天傍晚，两个穿便衣的人在街口站了很久。
  _effects: role; reputation 0.020000000000000018_

- **1951.01** `state_expire:ad20-private-bargain` tags: ad20-private-bargain, private, bargain, favor, debt, trust, leverage, exit
  Rosa的「私下的账」到期；相关安排结束。
  _effects: state_remove ad20-private-bargain state:world-vienna-1912:977; flag -private_bargain_active_

- **1951.01** `r13-fam.keep-family-secret::ctx-vienna-postwar-1945::milieu-tenement/secret-exposed` tags: task, family, secret, reputation, sibling, fear, vienna, urban
  Ferdinand Weiss不知道从哪里听说了纸上的名字，整条走廊都在传。Rosa回家时，Katharina Lechner正把柜子里的东西翻了一地，说早该烧掉。两人吵到半夜，Rosa把纸摊在灯下，第一次读完最后一行；纸上的日期比Rosa记得的早了三年。
  _effects: reputation -0.12; condition; flag +family_secret_exposed; relation rival with person:evt:world-vienna-1912:000086:child; knowledge “the paper is three years older than the family claimed”_

- **1952.01** `r13-fam.seek-friend::ctx-vienna-postwar-1945::milieu-tenement/rebuffed` tags: task, social, friendship, loneliness, belonging, vienna, urban, postwar
  Rosa刚开口，Luise Weiss就把报纸举高，说这张桌子有人。Rosa端着杯子在门口站了一会儿，回去把椅子放正；第二天同一时辰，Luise Weiss没有来，桌上留着一圈没擦干的杯印。
  _effects: flag +rebuffed_while_seeking_friend; relation acquaintance with person:evt:world-vienna-1912:003533:child_

- **1952.03** `p9-social-tenement-neighbors.flour-loan/flour-loan.half-bag-with-note` tags: housing, neighbors, tenement, daily, money, reputation
  Rosa只舀出半袋，说自家也不宽裕，要Ferdinand Weiss把上次的煤钱一并记在纸上。Ferdinand Weiss接过纸片，当着面把日期和数目重写一遍，两人各留一半。面粉少了，账却清楚了，Rosa把纸片夹进账簿样的旧本子。
  _effects: relation acquaintance with person:evt:world-vienna-1912:000169:child_

- **1952.05** `p9-gap-adult-unemployed.labour-exchange/exchange-trial-work` tags: adulthood, unemployment, casual_labour, poverty, daily, labour_exchange, bureaucracy
  介绍所里那个Helene Weiss说木牌上的地址多半过时了，不如自己去问。Rosa走了四十分钟到洗衣房，院子里晾着床单。老板娘让她先熨一件试试，看完说留下吧，明天还这个时辰来。
  _effects: cash 3 (洗衣房试工半天按件计酬); skill_

- **1952.07** `vienna-market-debt.rent-arrears/rent-negotiate-installments` tags: market, debt, money, home, shop
  你没去借钱，直接下楼找房东，说月底前先付两克朗，剩下两克朗分两个星期补齐。房东叼着雪茄，拿铅笔在你的纸条背面写了个日期，说再拖一天就换锁。邻居在楼道口听见了，冲你摇了摇头，但没说什么。
  _effects: cash -2 (按分期付掉的第一笔欠租（其中2克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-15; flag +rent_installment_plan_

- **1952.12** `p9-social-courtship-friendship.fasching-dance/dance-first-polka` tags: courtship, friendship, social, adulthood, reputation, leopoldstadt
  波尔卡重新响起时，Rosa走到靠墙的长凳前向Emil Kral 2弯腰。姑母手里的扇子停了停，没说话。入场费和小费一共一克朗，Rosa把找零塞回内袋；一支舞跳完，Emil Kral 2说了自己住在哪条街，Rosa把名字和门牌在心里念了两遍。
  _effects: cash -1 (付给乐队的小费与舞会入场费); relation acquaintance with person-materialized-world-vienna-1912-154; relation acquaintance with person-materialized-world-vienna-1912-154_

- **1953.01** `r13-fam.visit-grave::ctx-vienna-postwar-1945::milieu-tenement/wrong-grave` tags: task, family, grave, mourning, neighbor, grief, vienna, urban
  两人在坟场里绕了半个钟头，才找到那块刻着名字的石头。Anna Weiss 3忽然说不是这一块，自己记得旁边有一棵小槐树。Rosa陪她一排排找，天快黑时，守墓人过来说小槐树去年就砍了；Anna Weiss 3站在空地上，把花放在了脚边。
  _effects: mood -0.050000000000000044; flag +could_not_find_the_grave; relation friend with person-materialized-world-vienna-1912-139; knowledge “the old tree by the grave was cut down last year”; relation acquaintance with person-materialized-world-vienna-1912-139_

- **1953.08** `statistical_infection`
  Rosa在Leopoldstädter Zinshaus, gemeinsamer Gang病倒了，肺炎让身体发热、虚弱，接下来的日子只能卧床。

- **1953.09** `statistical_illness_worsened`
  Rosa的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1953.11** `statistical_recovery`
  Rosa从肺炎中慢慢恢复，能下床喝水，但身体还虚弱。

- **1953.12** `vienna-market-household.soup-kitchen/soup-kitchen.share` tags: home, market, food, social
  汤锅冒着热气，Rosa盛出两勺倒进Ferdinand Weiss带来的罐子里。Ferdinand Weiss说了声谢谢就匆匆上楼。隔天罐子还回来，锅底搁着一小块猪油。
  _effects: relation acquaintance with person:evt:world-vienna-1912:000169:child; mood 0.050000000000000044_

- **1954.01** `p9-history-medical-daily.clinic-queue/queue-until-noon` tags: health, medical, public_health, family, pharmacy, sanitation, daily
  Rosa在诊所门口从五点半站到十一点，膝盖发僵，终于用最后四十赫勒付了挂号费。门房撕下转诊单，叫Rosa去综合医院排队，药费还得另算；队伍拐过街角时天还黑着，Rosa数着前面二十三个后脑勺，记住了综合医院药房下午才开窗口。
  _effects: cash -0.4 (诊所挂号费（其中0.4克朗记入债务）); knowledge “综合医院的药房比街角药房便宜，但要排到下午”_

- **1954.01** `r13-civ.hide-fugitive::ctx-vienna-postwar-1945::milieu-tenement/hid-for-three-nights` tags: politics, fugitive, shelter, risk, solidarity, vienna, urban, postwar
  Helene 2在阁楼的煤箱后面躲了三天，Rosa每天夜里送一次面包和水。第三天，楼下有人问起生人味，Rosa说那是煤烟。Helene 2走时，把一枚磨亮的纽扣留在窗台上。
  _effects: cash -1 (阁楼上的脚步声); food; flag +hid_fugitive_three_nights; relation friend with person:evt:world-vienna-1912:007134:child; knowledge “the fugitive crossed the yard before the morning roll call”_

- **1954.05** `vienna-church-community.saint-vincent-box/box-request-refused` tags: faith, social, family, home
  登记员翻遍册子，说这户上个月已经领过。楼里的人围着看，谁也没先走开。
  _effects: relation acquaintance with person:evt:world-vienna-1912:001686:child; reputation -0.03999999999999998_

- **1954.08** `vienna-medical-treatment.toothache/drops-and-endure` tags: health, medical, family, money
  药房伙计从褐色瓶里倒出药水，叮嘱别咽。Maria Lechner在柜台边说，这玩意儿治标不治本。Rosa把棉球塞进嘴里，腮帮子鼓出一块，走回巷子时拿手帕捂着脸，怕风吹。
  _effects: cash -0.6 (牙痛药水（其中0.6克朗记入债务）); condition_

- **1955.01** `sm18-object.tram-lost::ctx-vienna-postwar-1945::milieu-tenement/says-it-was-only-metal` tags: object, loss, child, tram, family, everyday, vienna, urban
  Rosa摸了摸空口袋，说那不过是块旧铜，丢了就丢了。晚上，Berta Berg睡着以后，Rosa又去电车站走了一趟，沿着白天的路线低头看每一块石板。
  _effects: state_add sm18-missing-object state:world-vienna-1912:1202; relation kin with person:evt:world-vienna-1912:014325:child; flag +searched_the_tram_route_at_night; flag +something_is_missing_

- **1955.01** `vienna-women-housework.wash-day/wash-day.rush` tags: gender, housework, home, labour, family
  木盆边的水渍映着天光，Rosa跪在石阶上揉搓床单，肘弯发酸。晾绳上的湿布滴答作响，Katharina Lechner探身把自家被单也挂上去，两人没多说话。
  _effects: relation acquaintance with person:evt:world-vienna-1912:000086:child_

- **1955.01** `state_reaction:sm18-missing-object/a-rumor-hardens` tags: sm18-missing-object, mystery, object, loss, memory, search, suspicion, everyday
  Rosa在院子里听见两个人在说“那家的东西”，话头在看见Rosa时停住。晚上，Rosa把首饰盒从五斗柜挪到床边，又觉得这样更像在防谁。
  _effects: state_parameter sm18-missing-object.suspicion 0 -> 10; reputation -0.019999999999999962; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:018837_

- **1955.01** `kernel-migrate.return-home::ctx-vienna-postwar-1945::milieu-tenement/civic-return-refused` tags: migration, return, border, family, war, vienna, urban, postwar
  她被拒绝入境，理由是“没有固定住所”。她在边境站给Maria Lechner打电话，电话转到邻居家；对方说“先回来再说”，她买了一张反向车票。她在边境站的长椅上坐到天亮，才买下反向车票。
  _effects: move place-wien; cash -5 (反向车票和电话费（其中5克朗记入债务）); flag +border_refused; relation acquaintance with person-materialized-world-vienna-1912-15; relation kin with person:evt:world-vienna-1912:000362:child; condition; knowledge “没有固定住址会被拒绝入境，亲戚的电话不能作为住址证明”_

- **1955.10** `vienna-tenement-neighbors.shared_stove_fire/fire_scald_hand` tags: home, social, family, housing
  Rosa在合租房走廊的公用灶台上煮土豆，转身取盐时袖子扫翻了铁锅，滚水浇在左手背上。Rosa 2从隔壁冲出来，扯下自己的围裙裹住烫伤处，又跑下楼叫来住在二楼的接生婆。接生婆用蛋清和旧亚麻布包扎，嘱咐三天不能沾水。
  _effects: relation friend with person:evt:world-vienna-1912:003449:child_

- **1955.11** `vienna-housing-move.rent-notice/rent-notice-demand-repair` tags: housing, home, rent, family, money
  Rosa没有立刻答话，先去敲Anna Winter的门。两人一起数落墙上的水渍和门框里灌进来的风，楼梯间的窗户修好了，自家墙皮还在剥落。Anna Winter提议一起把话带给看门人：先修好漏水的墙角，涨租的事再谈。Rosa把纸重新折好，请他把话带到门外。
  _effects: relation acquaintance with person:evt:world-vienna-1912:001751:child; mood 0.030000000000000027; flag +rent_dispute_

- **1956.01** `vienna-tenement-neighbors.laundry_line_dispute/subject_yields_line` tags: home, social, family, housing
  Rosa看Rosa 2盆里那几件小衬衫，把自家床单卷起来抱回屋，说等下午再晾。Rosa 2愣了一下，闷头把衣服挂好，收工回来时在Rosa门口放了一小包用旧报纸裹的洗衣碱。Rosa打开报纸，碱面里还掺着几粒粗盐。
  _effects: relation friend with person:evt:world-vienna-1912:003449:child; food_
  _causes: evt:world-vienna-1912:018834_

- **1956.01** `vienna-life-injury-recovery/clinic-treatment` tags: health, work, family
  Rosa在受伤后的第三天去了诊所。医生清洗伤口、换药，收下诊费，嘱咐不要急着回机器旁。Rosa把药方折好，回家路上买了纱布。
  _effects: health 0.05 (wound treatment); cash -8 (clinic and bandages（其中8克朗记入债务）)_
  _causes: evt:world-vienna-1912:018903_

- **1956.01** `state_tick:sm18-missing-object/another-drawer/the-same-question` tags: sm18-missing-object, mystery, object, loss, memory, search, suspicion, everyday
  Rosa把同一只抽屉拉开又推上，里面的东西已经按原来的位置摆了三遍。楼下有人搬煤，铁锹刮过石阶；Rosa忽然想不起那件东西最后一次被谁拿在手里，只觉得每个人的脸都有一点可疑。
  _effects: state_parameter sm18-missing-object.suspicion 10 -> 18; state_parameter sm18-missing-object.leads 10 -> 8; mood -0.030000000000000027_

- **1956.01** `r13-fam.ask-relative-money::ctx-vienna-postwar-1945::milieu-tenement/loan-refused` tags: task, family, debt, money, relative, request, vienna, urban
  Maria Lechner回信说自家也紧，孩子要交学费，实在腾不出。Rosa把信折好，放进炉子，火苗舔到“见谅”两个字时，她才把信夹出来。第二天，Rosa去当铺问那只旧表能当多少。
  _effects: mood -0.040000000000000036; flag +relative_refused_loan; relation kin with person:evt:world-vienna-1912:000362:child_

- **1956.07** `af17-luck.wallet-in-the-snow::ctx-vienna-postwar-1945::milieu-tenement/the-wallet-belonged-to-the-police` tags: luck, money, street, chance, irony, daily, vienna, urban
  Rosa刚把钱包交给街角岗亭，Hermann Berg就翻了翻里面的纸，问“你住哪条街”。钱包确实是失物，但失主是警局的人；Rosa拿回一张收据，回家路上总觉得有人在后面跟着。
  _effects: reputation 0.020000000000000018; relation acquaintance with person:evt:world-vienna-1912:001486:child; flag +returned_wallet_to_police; mood -0.020000000000000018_

- **1956.10** `r3-mig.chain-migration::ctx-vienna-postwar-1945::milieu-tenement/letter-with-job-order` tags: migration, family, chain, remittance, travel, vienna, urban, postwar
  Friedrich Berg从芝加哥寄来一封信，里面有一张屠宰场的招工单和一个地址。信纸背面写着“来的时候带一双厚鞋”。家里卖了一头牛，凑出船票钱。Rosa把招工单缝进衣领，Katharina 2说这种信不能给海关看。
  _effects: cash 6 (先走的那个人寄回了地址); mood 0.06000000000000005; flag +chain_migration_letter; relation friend with person-materialized-world-vienna-1912-23; knowledge “the cousin has a job order at a Chicago slaughterhouse”_

- **1956.11** `vienna-women-housework.piecework-bundle/piecework.overnight` tags: gender, housework, home, labour, family, injury
  Rosa点着煤油灯缝到后半夜，把一捆领子全做完了。针脚密是密，可天亮时她看东西重影，手指被针扎了三回。星期六交活，Josef Moser 2量了量尺寸，收下整捆，数出七十五赫勒推过桌面。
  _effects: cash 0.75 (交了一整捆衬衫领子的计件工钱); health -0.04 (通宵缝纫，眼睛疲劳，手指扎伤); mood 0.020000000000000018_

- **1957.01** `state_tick:sm18-missing-object/another-drawer/the-same-question` tags: sm18-missing-object, mystery, object, loss, memory, search, suspicion, everyday
  Rosa把同一只抽屉拉开又推上，里面的东西已经按原来的位置摆了三遍。楼下有人搬煤，铁锹刮过石阶；Rosa忽然想不起那件东西最后一次被谁拿在手里，只觉得每个人的脸都有一点可疑。
  _effects: state_parameter sm18-missing-object.suspicion 28 -> 36; state_parameter sm18-missing-object.leads 8 -> 6_

- **1957.01** `r13-civ.recover-at-home::ctx-vienna-postwar-1945::milieu-tenement/neighbor-soup` tags: health, recovery, care, household, food, vienna, urban, postwar
  Anna Berg端来一碗兑了水的牛奶，顺手把Rosa家的炉子捅旺。Rosa靠在床头，听Anna Berg讲楼下谁也被传染了，谁家把病人送去了医院。人走后，屋里还留着一点煤烟和奶味。
  _effects: cash -1 (退烧后的第一碗粥); health 0.04 (退烧后的第一碗粥); flag +recovered_with_neighbor_help; relation friend with person:evt:world-vienna-1912:008182:child_

- **1957.03** `vienna-courtship-courtyard.letter-answer/mother-opened-letter` tags: adulthood, courtship, partner, social, family
  回信没有到Rosa手里。Rosa Stein的母亲先拆了它，连信封上的邮戳一起摊在洗衣房的桌上，说有人写字来缠自家孩子。话传到院子里时已经添了油，Katharina 2隔着栏杆把原话学了一遍，说得很难听；Rosa Stein再见到Rosa时，眼睛先往母亲那边看。Rosa站在水桶边，知道这封信已经被拆成了两家的脸面。
  _effects: reputation -0.05999999999999994; relation acquaintance with person:evt:world-vienna-1912:004362:child_

- **1957.10** `df18-mark.first-appearance::ctx-vienna-postwar-1945::milieu-tenement/prayer-mark` tags: body, mark, omen, illness, rumor, supernatural, eerie, vienna
  复活节前的夜里，Rosa在城郊的路边十字架前跪了很久。第二天清早，左手掌心浮出一条细红线，像被针划过，却不疼。Rosa没有告诉任何人，只把手套戴得更紧；可每次点蜡烛，那条线都比昨天更清楚一点。
  _effects: cash -1 (买蜡烛和灯油); state_add df18-uncanny-mark state:world-vienna-1912:1290; flag +df18_mark_appeared_after_prayer; mood 0.020000000000000018; flag +df18_mark_noticed; knowledge “我身上有一处说不清的痕迹，别人对它各有各的说法。”_

- **1957.10** `state_reaction:sm18-missing-object/a-rumor-hardens` tags: sm18-missing-object, mystery, object, loss, memory, search, suspicion, everyday
  Rosa在院子里听见两个人在说“那家的东西”，话头在看见Rosa时停住。晚上，Rosa把首饰盒从五斗柜挪到床边，又觉得这样更像在防谁。
  _effects: state_parameter sm18-missing-object.suspicion 18 -> 28; reputation -0.020000000000000018; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:020358_

- **1957.11** `oj18-mortuary.first-body::ctx-vienna-postwar-1945::milieu-tenement/refused-the-child` tags: death, mortuary, funeral, work, odd_job, night, everyday, vienna
  Rosa跟着Helene Weiss进到后间，看见一具孩子的棺材，尺寸只比鞋盒大一点。Rosa把毛巾放回盆里，说自己做不了。Helene Weiss没有劝，只把当天的工钱数给Rosa；那枚铜板在口袋里响了一路，像有人在后面跟着。
  _effects: cash 1 (a day's mortuary pay); relation acquaintance with person-materialized-world-vienna-1912-5; condition; flag +refused_mortuary; knowledge “那具孩子的棺材只比鞋盒大一点，{master}没有劝我留下。”_
## Emil

Born 1912.01, alive at 1957.
Education: apprenticeship 0; occupation: none; roles: infant, child, self_taught_carpenter, witness_in_servant_inquiry, housemaid, office:联络员, job_seeker, partner, separated, displaced_tenant, watched_by_police, mourner, polite_estrangement, reconciled_sibling, displaced_person, health_volunteer, barn_prayer_host, bereaved_relative, shopkeeper, neighbourhood_helper, refused_lender.

### State snapshot
- wish-love [person] (active) parameters={"intensity":0.55,"fixation":0.5,"irony":0.3} links={} ticks=9
- ml18-sudden-fortune [household] (ended 1916.1: duration expired) parameters={"principal":20,"spent":0,"claims":3,"public":false,"source":"转卖的金矿股份"} links={} ticks=2
- iw18-child-secret [person] (ended 1921.1: duration expired) parameters={"weight":55,"tellUrge":34,"discovered":true} links={} ticks=3
- raising-child [household] (ended 1938.1: duration expired) parameters={"caregiverBurden":42,"schoolProgress":71,"childConfidence":55,"careDebt":0,"schoolEnrolled":false,"leftHome":false} links={"child":"Berta Berg"} ticks=10
- raising-child [household] (ended 1942.1: duration expired) parameters={"caregiverBurden":55,"schoolProgress":56,"childConfidence":55,"careDebt":0,"schoolEnrolled":false,"leftHome":false} links={"child":"Alois Berg"} ticks=11
- yf18-first-awakening [person] (ended 1929.1: duration expired) parameters={"intensity":64,"nerve":23,"talk":8,"reciprocated":true,"secret":true} links={"beloved":"Lena"} ticks=4
- apprenticeship-contract [person] (ended 1927.1: duration expired) parameters={"progress":30,"failures":0,"trade":"木工","paid":true} links={} ticks=2
- yf18-runaway-plan [person] (ended 1930.1: duration expired) parameters={"preparation":20,"suspicion":0,"resolve":35,"destination":"格拉茨","ticket":false} links={} ticks=1
- ml18-sudden-fortune [household] (ended 1933.1: duration expired) parameters={"principal":17,"spent":5,"claims":4,"public":true,"source":"瓶盖专利"} links={} ticks=3
- oj18-odd-apprenticeship [person] (ended 1934.1: duration expired) parameters={"trust":6,"strangeKnowledge":26,"reliability":45,"nightsWorked":0,"post":"动物园夜班饲养员"} links={} ticks=3
- bc18-ridiculous-fame [person] (ended 1932.1: duration expired) parameters={"notoriety":37,"legitimacy":10,"absurdity":70,"invitations":3,"boredom":9,"officialStory":"被仇人骂出名的人"} links={} ticks=2
- oj18-workplace-legend [person] (ended 1935.1: duration expired) parameters={"legend":23,"truth":57,"oddity":35,"toldCount":1} links={} ticks=2
- ml18-sudden-fortune [household] (ended 1941.1: duration expired) parameters={"principal":12,"spent":0,"claims":16,"public":true,"source":"附条件的遗嘱"} links={} ticks=6
- bc18-ridiculous-fame [person] (ended 1938.1: duration expired) parameters={"notoriety":59,"legitimacy":0,"absurdity":77,"invitations":2,"boredom":20,"officialStory":"安全火柴的发明人"} links={} ticks=3
- ad20-private-bargain [person] (ended 1941.1: duration expired) parameters={"leverage":83,"trust":27,"debt":61,"exit":22} links={"beneficiary":"Rosa"} ticks=5
- hs18-street-witness [person] (ended 1948.1: duration expired) parameters={"certainty":88,"danger":60,"retellings":4,"claim":"我签字证明那架钢琴是无人认领的。","quiet":false} links={} ticks=5
- lc17-caregiver [person] (ended 1949.1: duration expired) parameters={"burden":38,"resentment":18,"paidHelp":false} links={"patient":"Katharina Bauer"} ticks=5
- mb17-remittance-web [household] (ended 1955.1: duration expired) parameters={"obligation":94,"supportSent":9,"arrears":12,"relativesAway":3} links={} ticks=6
- grief [person] (ended 1954.1: duration expired) parameters={"loss":"住处","years":0} links={} ticks=1
- ml18-sudden-fortune [household] (ended 1954.12: replaced_by:ml18-sudden-fortune) parameters={"principal":4,"spent":0,"claims":1,"public":false,"source":"工厂合买彩票"} links={} ticks=0
- ml18-sudden-fortune [household] (ended 1957.1: duration expired) parameters={"principal":0,"spent":0,"claims":8,"public":true,"source":"押错的马"} links={} ticks=3

### 229 subject events

- **1913.03** `statistical_infection`
  Emil在Haus der Tante in Klosterneuburg病倒了，痢疾让身体发热、虚弱，接下来的日子只能卧床。

- **1913.05** `statistical_recovery`
  Emil从痢疾中慢慢恢复，能下床喝水，但身体还虚弱。

- **1913.10** `vienna-infant-household.laundry-day/sibling-watches` tags: infancy, health, family, home
  Josef Bauer在厨房的木盆里搓亚麻布，热水汽模糊了窗。Anna Bauer坐在摇床边的矮凳上晃拨浪鼓，Emil伸手去抓。等Josef Bauer晾完最后一块尿布，Emil已经在Anna Bauer的看护下睡熟，摇床没被蹬歪。
  _effects: relation kin with person-phase15-Emil-world-vienna-1912; health 0.020000000000000018 (被看护着，没磕碰); mood 0.03_

- **1914.09** `iw18-infancy.first-word::ctx-klosterneuburg-rural-1912::milieu-tenement/the-dog-gets-the-first-word` tags: infancy, first_word, memory, family, wonder, eerie, rural, agriculture
  Emil追着炉边的狗爬了半间屋，忽然拍着地板喊出狗的名字。狗吓得钻到床下，Josef Bauer笑得把水壶都放下了；邻居在门外问出了什么事。那天晚上，家里给狗多留了半块面包。
  _effects: mood 0.04; food; flag +first_word_dog_name_

- **1915.09** `vienna-early-childhood.stairwell-fall/arm-bruise` tags: childhood, family, home, street, injury
  黑楼梯间只有门缝透进来的一点光。Emil踩空时伸手去抓扶手，手臂先撞在铁端上，整个人滚下三级。Katharina Bauer把Emil抱到灶边，拿湿冷毛巾按住肿起的地方，又撕了一条旧布缠紧。第二天Emil举着胳膊下楼，照样去院子里玩。
  _effects: health -0.040000000000000036 (从楼梯滚下，小臂挫伤); mood -0.05_

- **1917.08** `vienna-childhood-street.hoop/hoop-win` tags: childhood, street, social, home
  铁环在石板缝上颠了一下，Emil用钩子一拨，抢先绕过煤车。Mitzi Lechner跟在后面，铁环倒在地上转了两圈。三颗玻璃弹珠从Mitzi Lechner的口袋里摸出来，有一颗还带着体温。Mitzi Lechner把弹珠按进Emil手心，转身踢了一脚墙根。
  _effects: relation friend with person-mitzi-lechner; mood 0.05; skill_

- **1918.01** `iw18-home.ration-tin::ctx-klosterneuburg-rural-1912::milieu-tenement/tells-mother` tags: childhood, family, money, hunger, secret, school, rural, agriculture
  Emil把铁盒端到桌上，说里面的钱对不上，可能是自己数错了。Josef Bauer把硬币倒出来，一枚枚排开，排到最后少了一枚；Josef Bauer没有问是谁拿的，只说“明天少买一次煤”。Emil低头把硬币又数了一遍，这次数得很慢。
  _effects: state_parameter raising-child.careDebt 0 -> 0; state_parameter raising-child.childConfidence 55 -> 57; mood -0.02; flag +counted_the_tin_together_

- **1918.01** `vienna-early-childhood.stairwell-fall/arm-bruise` tags: childhood, family, home, street, injury
  楼梯间的灯罩空着，第三级踏板比别处高。Emil一脚踩空，滚到平台，右小臂磕在铁扶手的弯头上。Josef Bauer听见哭声跑出来，把Emil抱回屋，用冷水毛巾敷那块青紫，再用旧布条缠了两圈。夜里Emil哭醒两次。
  _effects: health -0.040000000000000036 (从楼梯滚下，小臂挫伤); mood -0.050000000000000044_

- **1918.01** `p9-gap-childhood-chores.mind-sibling/sibling-falls-at-well` tags: childhood, household, chores, school, task, daily, sibling, care
  土豆滚进墙角的煤灰里，Emil弯腰去追，再抬头时Berta Bauer已经坐在井台边，裤腿湿了一片，哭声一抽一抽。Hermann Kral把孩子抱进灶间，Emil跟在后面，手指抠着门框。Katharina Bauer回来没问经过，只把Emil的碗收走一半，说“看个人都看不住”。
  _effects: health -0.030000000000000027 (在井台边摔了一跤); mood -0.06; relation kin with person-katharina-bauer_

- **1918.03** `iw18-secret.cellar-door::ctx-klosterneuburg-rural-1912::milieu-tenement/saw-the-bundle` tags: childhood, secret, family, cellar, knowledge, fear, rural, agriculture
  地窖门虚掩着，Emil下去找腌菜坛，看见Josef Bauer蹲在煤堆后面，把一包用油纸裹好的东西塞进墙缝。Josef Bauer听见脚步，回头时脸上还带着灰；Emil说自己只是来拿坛子，声音比平时高。
  _effects: state_add iw18-child-secret state:world-vienna-1912:32; knowledge “大人在酒窖的墙缝里藏了一包用油纸裹着的东西。”; relation kin with person-josef-bauer; mood -0.020000000000000004; flag +saw_cellar_bundle; flag +child_secret_active_

- **1918.07** `iw18-play.kite-on-roof::ctx-klosterneuburg-rural-1912::milieu-tenement/climbs-and-gets-it` tags: childhood, play, kite, roof, neighbor, comic, rural, agriculture
  风筝挂在修鞋铺的屋檐上，尾巴缠着铁皮烟囱。Emil踩着煤箱爬上矮墙，Elisabeth Bauer在下面扶着箱子，不停地说“慢一点”。Emil把风筝扯下来时撕了一个角，落地时膝盖先着地，手里还举着那截竹骨。
  _effects: health -0.010000000000000009 (a scrape while retrieving the kite); reputation 0.02; relation friend with person-elisabeth-bauer; mood 0.04000000000000001; flag +kite_from_roof_

- **1919.01** `state_tick:iw18-child-secret/secret-year/slipped` tags: iw18-child-secret, childhood, secret, knowledge, guilt, family, fear, state
  话是在洗碗时滑出来的。Emil说“那天我看见了”，说完立刻把水龙头开到最大。大人没有听清，问了一句“看见什么”；Emil摇头，说水太凉。那天夜里，Emil第一次希望自己当时没有下楼。
  _effects: state_parameter iw18-child-secret.tellUrge 35 -> 27; state_parameter iw18-child-secret.weight 55 -> 49; state_parameter iw18-child-secret.discovered false -> true; mood 0.02_

- **1919.01** `p9-gap-childhood-chores.laundry-help/laundry-dragged-docked-pay` tags: childhood, household, chores, school, task, daily, laundry, work
  床单太长，Emil拖着一角往绳子走，布边扫过煤渣，立刻黑了一道。Berta Weiss弯腰看了看，脸沉下来，说这角得重洗，工钱扣一半。Emil接过一赫勒，蹲在盆边用清水搓那一道灰，搓到指节发红，水面上还浮着煤末。
  _effects: cash 0.01 (被扣后只剩一赫勒); mood -0.05; relation acquaintance with person-berta-weiss; relation acquaintance with person-materialized-world-vienna-1912-20_

- **1919.01** `state_reaction:iw18-child-secret/a-school-note-reminds` tags: iw18-child-secret, childhood, secret, knowledge, guilt, family, fear, state
  Emil把老师要家长签字的纸条折成四折，忽然想起自己还有一件事没有告诉家里。纸条在口袋里放了一路，边角被手指捏得发亮。
  _effects: state_parameter iw18-child-secret.tellUrge 27 -> 31; state_parameter iw18-child-secret.weight 49 -> 51_
  _causes: evt:world-vienna-1912:001026_

- **1919.05** `vienna-childhood-friends.courtyard-race/fell-on-wet-stones` tags: childhood, social, school, street, injury
  晒衣绳上的水一滴一滴落在石板上。Emil跑到第二圈，鞋底一滑，膝盖先着地。Berta Weiss从屋里端出半盆清水，蹲下冲掉伤口里的沙，又用手帕扎紧，说今天别跑了。
  _effects: health -0.040000000000000036 (膝盖在湿石板上磕破); relation acquaintance with person-berta-weiss_

- **1920.01** `vienna-childhood-street.cigarette-card/card-gift` tags: childhood, street, social, home
  Emil每天放学都在柜台前站一会儿，看玻璃板底下压着的烟画，顺手把歪了的报纸摞齐。Rosa擦完柜台，从抽屉最里面摸出一张揉皱的风景卡，边角还沾着烟丝，塞过来时说了句“别挡着门”。Emil把卡夹进课本，第二天带了一张重复的来给Rosa看。
  _effects: mood 0.06; reputation 0.02; relation friend with person-phase15-Rosa-world-vienna-1912_

- **1920.01** `state_tick:iw18-child-secret/secret-year/held` tags: iw18-child-secret, childhood, secret, knowledge, guilt, family, fear, state
  这一年Emil把秘密藏得更深。走过地窖门口时，Emil会故意哼歌；饭桌上有人提起那件事，Emil就把汤勺在碗底转三圈。秘密没有变大，却像一颗卡在鞋里的石子，走每一步都知道它在。
  _effects: state_parameter iw18-child-secret.weight 51 -> 55; state_parameter iw18-child-secret.tellUrge 31 -> 34; mood -0.01_

- **1920.01** `p9-gap-childhood-chores.mind-sibling/sibling-shelter-missed-river` tags: childhood, household, chores, school, task, daily, sibling, care
  巷口的喊声第二次传来时，Emil正用膝盖压住木盆边沿，给Anton Bauer挡穿堂风。Anton Bauer在旧布底下翻了个身，Emil立刻停住，等呼吸又匀了才敢动。Katharina Bauer推门进来，先看见盆里睡着的Anton Bauer，再看见Emil冻红的脚背，把灶上留的汤热了热。
  _effects: mood -0.02; relation kin with person:evt:world-vienna-1912:000313:child; relation kin with person-katharina-bauer_

- **1921.01** `state_expire:iw18-child-secret` tags: iw18-child-secret, childhood, secret, knowledge, guilt, family, fear, state
  Emil的「孩子藏在口袋里的事」到期；相关安排结束。
  _effects: state_remove iw18-child-secret state:world-vienna-1912:32; flag -child_secret_active_

- **1921.01** `p9-gap-childhood-chores.market-line/line-half-flour` tags: childhood, household, chores, school, task, daily, market, food
  面粉袋压在胸口，越抱越沉。Emil前面的大婶一直往后靠，Emil就把膝盖顶住对方的篮子，硬留出半步。买到半袋面粉后，Emil的鞋跟留在人堆里，找回来时鞋面全是泥。回家路上布袋换了两次肩，赤脚踩过石板时脚底发麻。
  _effects: food; health -0.020000000000000018 (赤脚走石板路磨伤脚底); skill; relation acquaintance with person-materialized-world-vienna-1912-5; relation acquaintance with person-materialized-world-vienna-1912-17_

- **1922.01** `p9-gap-childhood-chores.laundry-help/laundry-three-heller` tags: childhood, household, chores, school, task, daily, laundry, work
  “拽平，别留褶。”Helene Winter在绳子那头喊。Emil踮着脚把床单拉直，碱水把指缝泡得发白。收工时天已经黑了，Helene Winter数了三赫勒，又在围裙上擦干手才递过来。Emil把钱塞进袜筒，回家路上一直攥着，虎口的裂口沾了汗，火辣辣地疼。
  _effects: cash 0.03 (帮邻居晾床单挣的三赫勒); health -0.030000000000000027 (碱水泡手，虎口裂开); relation acquaintance with person-helene-winter_

- **1923.01** `p9-gap-childhood-chores.market-line/line-both-families` tags: childhood, household, chores, school, task, daily, market, food
  Helene Winter把Emil拽到队伍前头，往自己身前塞，说“孩子占不了多大地儿”。窗口一次递出两包面包，Emil把邻居那包夹在胳肢窝，自己这包抱在胸前。到Leopoldstädter Zinshaus, gemeinsamer Gang门口，Emil蹲下把两包并排，按Helene Winter说的份量分开，连找零的铜板也分成两小堆。
  _effects: food; relation acquaintance with person-helene-winter; skill_

- **1923.04** `vienna-childhood-street.cigarette-card/card-trade` tags: childhood, street, social, home
  烟草店门口的石阶上摆着一排烟画。Emil把三张皱巴巴的卡摊开，Lena挑了挑，从口袋里摸出一张皇帝像。交换完，Lena转身进了杂货铺，把皇帝像往柜台上一拍，换了一块糖。Emil站在门外，手里还留着卡片的油墨味。
  _effects: mood 0.04; relation friend with person-phase15-Lena-world-vienna-1912_

- **1924.01** `state_tick:wish-love/love-pressure/press-on` tags: wish-love, wish, wish:love, love, family, intimacy, state, state_tick
  Emil又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.02; flag +wish:love:pursuing_

- **1924.03** `p9-childhood-adolescence.church-club/club-follow-without-paying` tags: adolescence, friendship, identity, work, school, secret, church
  Emil口袋里没有十赫勒，却还是跟着队伍走到车站。修女在栅栏边拦住Emil，翻了翻名册，说没交钱的孩子不能上车；Katharina Huber在车厢门口回头看。
  _effects: reputation -0.03; relation acquaintance with person-materialized-world-vienna-1912-48; mood -0.03; relation acquaintance with person-materialized-world-vienna-1912-48_

- **1924.07** `vienna-adolescence.brothers-torn-jacket/sew-it-yourself` tags: adolescence, school, work, family, social
  Emil在厨房找到一截粗线，颜色和外套差了一截。缝到一半，线打结，Emil用牙咬断，重新来。Katharina Bauer坐在对面，没问外套的事，只把汤碗推过来，说“先吃”。Emil把最后一针打完，汤面已经结了一层薄皮。
  _effects: skill; food; relation kin with person-katharina-bauer_

- **1924.12** `vienna-youth-threshold.sibling-departure/take-over-bed-and-ledger` tags: adolescence, school, work, family, transition
  Anna Bauer走后，靠墙那张床空了出来，Emil把自己的铺盖搬过去，也接过那本记着欠账的旧账本：面包店三克朗、煤铺一克朗八十赫勒。晚上Emil坐在床沿一笔笔抄清，第一次知道家里的钱是怎么缺的。
  _effects: skill; mood -0.05; cash -0.5 (替兄姐补齐欠煤铺的零头)_

- **1925.01** `r15-work.master-takes-on::ctx-vienna-reform-1930::milieu-tenement/signed-contract` tags: work, craft, apprentice, trade, poverty, reform, medical, schooling
  Helene Berg把学徒契约摊在桌上，指给Emil看期限、工钱和出师考试。Emil签了名，第二天站到刨床前，手指上多了第一道木刺。
  _effects: relation employer with person-materialized-world-vienna-1912-20; state_add apprenticeship-contract state:world-vienna-1912:88; education apprenticeship; role_

- **1925.01** `p9-childhood-apprenticeship.cover-for-sibling/damp-linen-returned` tags: adolescence, work, apprenticeship, labour, training, family, task, task:family
  客户把床单贴在脸上，又摸了摸边角，说“还是潮的”，把门合上一半。Emil把床单卷回筐里，背回洗衣房。Helene Bauer没骂，只让在后院重晾，件钱等重送完再结。Emil蹲在地上翻布角，晚风吹得膝盖发酸，天黑前才夹完最后一只夹子。
  _effects: health -0.030000000000000027 (蹲久了膝盖发酸，又吹了晚风); mood -0.04; skill; relation acquaintance with person-materialized-world-vienna-1912-45; relation acquaintance with person-materialized-world-vienna-1912-45_

- **1925.02** `yf18-firstlook.tram-glove::ctx-vienna-reform-1930::milieu-tenement/return-it-at-the-gate` tags: first_love, love, tram, glove, youth, courtship, reform, medical
  下一站，Emil追下车，把那只手套递还给Lena。Lena说了一声谢谢，手指在毛线手套里缩了一下；Emil回到车上才发现自己坐过了两站，只好沿着环城路走回家。
  _effects: state_add yf18-first-awakening state:world-vienna-1912:87; relation friend with person-phase15-Lena-world-vienna-1912; mood 0.03; relation acquaintance with person-materialized-world-vienna-1912-51; flag +yf18_first_awakening_active_

- **1925.06** `r1-fam.sibling-rivalry::ctx-vienna-reform-1930::milieu-tenement/rivalry.lost` tags: family, siblings, rivalry, apprenticeship, craft, reform, medical, schooling
  Franz Winter收了Elisabeth Bauer。Emil在门口站到天黑，回家把父亲的工具箱打开，照着记忆里的样子练。Katharina Bauer进来，说别跟你兄弟争，争来的东西不长久；Emil没有抬头，刨花落在脚背上，像一层薄雪。
  _effects: mood -0.1; flag +lost_apprenticeship_to_sibling; role; skill; relation rival with person-elisabeth-bauer; relation acquaintance with person-materialized-world-vienna-1912-9_

- **1925.08** `r3-teen.parent-remarriage::ctx-vienna-reform-1930::milieu-tenement/accepts` tags: family, remarriage, stepfamily, grief, household, reform, medical, schooling
  Hermann Kral把漏雨的屋檐修好，又在门牌上添了自己的姓。Emil没有叫他父亲，只在他修窗户时递钉子。晚饭桌上，Hermann Kral把最大的一块肉夹给Emil，Josef Bauer低头笑了。
  _effects: mood 0.04; flag +accepted_parent_remarriage; relation guardian with person-hermann-kral_

- **1926.01** `yf18-dare.bridge-rail::ctx-vienna-reform-1930::milieu-tenement/fall-on-the-ice` tags: dare, bridge, river, friendship, risk, reform, medical, schooling
  Emil走到第四步，鞋底在霜上滑了一下，整个人挂在栏杆外侧。Klara抓住Emil的手腕，Rosa跑去叫桥头卖烤栗子的老人；Emil被拉上来时，膝盖已经湿透，第二天走路一瘸一拐。
  _effects: health -0.07999999999999996 (a fall on the bridge rail); state_parameter yf18-first-awakening.intensity 45 -> 51; state_parameter yf18-first-awakening.nerve 25 -> 15; relation friend with person-phase15-Klara-world-vienna-1912; flag +yf18_bridge_scare; mood -0.03_

- **1926.01** `yf18-friend.two-tickets::ctx-vienna-reform-1930::milieu-tenement/give-them-away` tags: first_love, friendship, betrayal, dance, tickets, reform, medical, schooling
  Emil把两张票送给门口卖花的小女孩，自己在普拉特大街上看橱窗。橱窗里摆着一双和Maria Winter一样的白手套；Emil站到商店关门，回家时说票弄丢了，谁也没有再问。
  _effects: state_parameter yf18-first-awakening.intensity 51 -> 43; state_parameter yf18-first-awakening.secret true -> true; flag +yf18_gave_tickets_away; mood -0.01999999999999999; relation acquaintance with person-materialized-world-vienna-1912-50_

- **1926.01** `state_reaction:wish-love/love-betrayal` tags: wish-love, wish, wish:love, love, family, intimacy, state, state_reaction
  Emil反复回想最后一次见面。对方说过的话被拆成很多小块，每一块都能扎人。
  _effects: mood -0.12; flag +wish:love:afraid_of_being_left_
  _causes: evt:world-vienna-1912:002562_

- **1926.01** `state_tick:yf18-first-awakening/half-year-of-glances/answered-glance` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Emil在教堂门口或学校走廊里又遇见Lena。这一次对方先点了头，Emil准备好的整段话全忘了，只把手里的书换到另一只手上；回家后Emil才发现，自己把书拿倒了。
  _effects: state_parameter yf18-first-awakening.intensity 43 -> 48; state_parameter yf18-first-awakening.nerve 15 -> 23; state_parameter yf18-first-awakening.reciprocated false -> true; relation friend with person-phase15-Lena-world-vienna-1912; mood 0.02999999999999997_

- **1926.01** `state_tick:apprenticeship-contract/workshop-year/learned` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Emil又学会了一道工序。师傅没有夸，只把下一块料推到面前。
  _effects: state_parameter apprenticeship-contract.progress 10 -> 30; skill; mood 0.020000000000000018_

- **1926.01** `r14-edu.tutoring-sibling::ctx-vienna-reform-1930::milieu-tenement/sibling-resented-drilling` tags: education, tutored_sibling, family, tutoring, reform, medical, schooling, home
  Berta Bauer把铅笔一摔，说再也不想看见豆子。Emil把豆子一颗颗收进碗里，说随你。那天晚上，Berta Bauer自己把错题改了一遍，改完把本子推到Emil面前，不说话。Emil看了一遍，在页角画了一个很小的勾。
  _effects: flag +sibling_resented_tutoring; relation rival with person:evt:world-vienna-1912:000322:child_

- **1926.09** `yf18-runaway.bundle::ctx-vienna-reform-1930::milieu-tenement/unpack-and-boil-water` tags: runaway, escape, family, plan, night_train, reform, medical, schooling
  Emil把包袱重新打开，衬衫上的褶子已经压平了。Emil把洗礼证明放回抽屉，去厨房烧了一壶水；Katharina Bauer醒来时，桌上多了一杯茶，Emil说今天不想去上学。
  _effects: mood -0.03; relation kin with person-katharina-bauer; flag +yf18_unpacked_

- **1927.01** `state_tick:yf18-first-awakening/half-year-of-glances/rehearsed-conversation` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Emil在厨房里对着镜子练了七遍开场白，第二天却在离Lena三步远的地方拐进面包店。Emil买了一袋并不需要的盐，回家路上把开场白又想了一遍；这一次，连标点都更熟练了。
  _effects: state_parameter yf18-first-awakening.intensity 48 -> 54; state_parameter yf18-first-awakening.talk 0 -> 3; mood 0.010000000000000009_

- **1927.01** `state_expire:apprenticeship-contract` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick, state:apprenticeship-contract
  Emil的「学徒契约」到期；相关安排结束。
  _effects: state_remove apprenticeship-contract state:world-vienna-1912:88; role_

- **1927.01** `p9-childhood-apprenticeship.cover-for-sibling/damp-linen-returned` tags: adolescence, work, apprenticeship, labour, training, family, task, task:family
  Emil解释说路上没下雨，是床单叠得太厚。客户不听，Franz Weiss也没帮腔，只把湿床单抖开，让Emil自己晾。Emil把布角一寸寸翻过来，跟Franz Weiss说以后会分开叠、不让潮气闷在里头。Franz Weiss哼了一声，算是记下了。
  _effects: health -0.030000000000000027 (蹲久了膝盖发酸，又吹了晚风); mood -0.03999999999999998; skill; relation acquaintance with person-materialized-world-vienna-1912-25; relation acquaintance with person-materialized-world-vienna-1912-25_

- **1927.02** `r1-cul.fan-letter::ctx-vienna-reform-1930::milieu-tenement/quoted-without-permission` tags: culture, letters, fandom, literacy, ambition, reform, medical, schooling
  Emil的信寄出半年，没有回音。后来Otto Winter在一篇文章里引用了这封信，没有署名，只写一个读者说。Emil在报上读到自己的句子，先是高兴，随后发现文章里的意思和自己写的相反。
  _effects: mood -0.08000000000000002; reputation 0.03; flag +letter_quoted_without_permission; relation acquaintance with person-otto-winter; knowledge “the quoted sentence means the opposite of what was written”_

- **1927.11** `vienna-adolescence.brothers-torn-jacket/sell-the-coat` tags: adolescence, school, work, family, social
  巷口的风把外套下摆吹起来。旧货贩子闻了闻领子，说给两克朗。Emil把钱卷进袜筒，回家前在楼梯口站了一会儿。Katharina Bauer发现衣钩空了，问了三遍，Emil都说没看见，脚趾在鞋里把硬币越踩越紧。
  _effects: cash 2 (卖掉哥哥旧外套); relation kin with person-katharina-bauer; mood -0.03999999999999998_

- **1928.01** `r2-leisure.scullery-punishment::ctx-vienna-reform-1930::milieu-tenement::scullery-punishment-reform/reported-to-inspector` tags: domestic_service, abuse, punishment, burn, servant, reform, medical, schooling
  检查员来查佣工合同，k. u. k. Landwehr-Infanterie, Wiener Ergänzungsbezirk让Emil把手藏在围裙下面。Emil没有藏，摊开掌心，那块新疤还没有褪成白色。检查员看了一眼，又看了一眼Ferdinand Berg，把名字写进本子。k. u. k. Landwehr-Infanterie, Wiener Ergänzungsbezirk说这是烫衣服不小心，谁家没有这种事。
  _effects: reputation 0.05; flag +reported_iron_burn_to_inspector; role; knowledge “the inspector recorded the burn and the household address”; relation colleague with person-materialized-world-vienna-1912-12; relation acquaintance with person-materialized-world-vienna-1912-12_

- **1928.01** `state_tick:yf18-first-awakening/half-year-of-glances/answered-glance` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Emil在教堂门口或学校走廊里又遇见Lena。这一次对方先点了头，Emil准备好的整段话全忘了，只把手里的书换到另一只手上；回家后Emil才发现，自己把书拿倒了。
  _effects: state_parameter yf18-first-awakening.intensity 59 -> 64; state_parameter yf18-first-awakening.nerve 15 -> 23; state_parameter yf18-first-awakening.reciprocated true -> true; relation friend with person-phase15-Lena-world-vienna-1912; mood 0.02999999999999997_

- **1928.01** `state_tick:wish-love/love-pressure/put-away` tags: wish-love, wish, wish:love, love, family, intimacy, state, state_tick
  Emil暂时把那件事收进抽屉；日子还有别的东西要应付。
  _effects: mood -0.020000000000000018_

- **1928.01** `agency:care_for_kin` tags: agency, agency:care_for_kin
  Emil想照顾Helene Moser，但工作脱不开身，只能托邻居带一锅汤回去。
  _effects: mood -0.03999999999999998; reputation -0.009999999999999995_

- **1928.06** `yf18-dare.prater-slide::ctx-vienna-reform-1930::milieu-tenement/ride-in-the-dark` tags: dare, prater, fairground, comic, friendship, reform, medical, schooling
  普拉特的木滑道在闭园后还亮着一盏值班灯。Emil和Lena从围栏底下钻进去，用一块麻袋垫着滑下来，木槽里的蜡味呛得人直笑。滑到底时，Alois Lechner 2提着灯站在出口，问他们要不要再买一张票。
  _effects: mood 0.04999999999999999; cash -1 (a late ticket paid to the watchman); reputation -0.010000000000000002; relation friend with person-phase15-Lena-world-vienna-1912; flag +yf18_prater_stunt; relation acquaintance with person-materialized-world-vienna-1912-34_

- **1928.09** `yf18-firstlook.parish-dance::ctx-vienna-reform-1930::milieu-tenement/friend-cuts-in` tags: first_love, dance, church, courtship, jealousy, reform, medical, schooling
  Klara在第二支曲子前把Ferdinand Moser请走，说Emil答应过要替她看管外套。Emil抱着一件不属于自己的大衣站在圣像下面，看他们在蜡烛光里转圈；回家路上，Emil把舞卡撕成小片，扔进多瑙运河。
  _effects: state_parameter yf18-first-awakening.intensity 54 -> 59; state_parameter yf18-first-awakening.nerve 23 -> 15; state_parameter yf18-first-awakening.talk 3 -> 8; relation friend with person-phase15-Klara-world-vienna-1912; relation friend with person-materialized-world-vienna-1912-54; mood -0.03999999999999998; relation acquaintance with person-materialized-world-vienna-1912-54_

- **1929.01** `r2-leisure.servant-trial::ctx-vienna-reform-1930::milieu-tenement/hired-after-trial` tags: domestic_service, servant, hiring, household, reference, reform, medical, schooling
  试用日的白围裙浆得发硬。Rosa Moser让Emil先擦餐厅的十二把椅子，再用手背试炉门温度；k. u. k. Landwehr-Infanterie, Wiener Ergänzungsbezirk戴着戒指的手指在椅背上一划，举到窗边看。Emil说上一家做了两年，k. u. k. Landwehr-Infanterie, Wiener Ergänzungsbezirk问为什么离开，Rosa Moser在门后轻轻咳了一声。
  _effects: cash 1 (试用日的白围裙); flag +hired_after_trial; role; relation colleague with person-materialized-world-vienna-1912-64; knowledge “the mistress reads references closely and tests dust with a ”; employment Dienstmädchen @ cinema:person-materialized-world-vienna-1912-31-evt:world-vienna-1912:002787; relation acquaintance with person-materialized-world-vienna-1912-64; relation acquaintance with person-materialized-world-vienna-1912-33_

- **1929.01** `state_expire:yf18-first-awakening` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Emil的「第一次心动」到期；相关安排结束。
  _effects: state_remove yf18-first-awakening state:world-vienna-1912:87; flag -yf18_first_awakening_active_

- **1929.01** `p9-childhood-apprenticeship.cover-for-sibling/damp-linen-returned` tags: adolescence, work, apprenticeship, labour, training, family, task, task:family
  Emil解释说路上没下雨，是床单叠得太厚。客户不听，Otto Winter也没帮腔，只把湿床单抖开，让Emil自己晾。Emil把布角一寸寸翻过来，跟Otto Winter说以后会分开叠、不让潮气闷在里头。Otto Winter哼了一声，算是记下了。
  _effects: health -0.030000000000000027 (蹲久了膝盖发酸，又吹了晚风); mood -0.03999999999999998; skill; relation acquaintance with person-otto-winter_

- **1929.03** `yf18-runaway.cousin-letter::ctx-vienna-reform-1930::milieu-tenement/show-the-letter-to-parent` tags: runaway, letter, cousin, work, plan, reform, medical, schooling
  Emil把信放在晚饭桌上。Katharina Bauer读完，问格拉茨远不远，又说家里的房租下个月要涨；那晚谁也没有说行或不行，信被压在糖罐下面，第二天边角沾了咖啡。
  _effects: state_add yf18-runaway-plan state:world-vienna-1912:183; relation kin with person-katharina-bauer; flag +yf18_family_knows_letter; mood -0.010000000000000009; flag +yf18_runaway_plan_active_

- **1930.01** `state_expire:yf18-runaway-plan` tags: yf18-runaway-plan, escape, youth, plan, home, travel, risk, state
  Emil的「床底下的包袱」到期；相关安排结束。
  _effects: state_remove yf18-runaway-plan state:world-vienna-1912:183; flag -yf18_runaway_plan_active_

- **1930.01** `task-vienna-bourgeois-youth.study-funding/loan-with-term` tags: bourgeois, education, culture, salon, university, family, task, task:education
  家里只肯借，不肯给。Katharina Bauer拿出一张写明年限的借条，要Emil毕业后第一年收入里还清，月息照银行算。他签了名，把借条和学费一起收进皮夹。
  _effects: cash -50 (借到的学费); relation kin with person-katharina-bauer; mood -0.06; flag +family_loan_signed_

- **1930.04** `oj18-zoo.night::ctx-vienna-reform-1930::milieu-tenement/child-at-the-bear-pit` tags: zoo, animals, night, keeper, work, odd_job, suspense, reform
  一个男孩翻过熊池的矮栏去捡帽子。Emil没有喊，怕惊动母熊，只提着装苹果的桶绕到下风处，把桶敲得咚咚响。母熊转身时，孩子被Franz Weiss 2一把拽了上来；Emil的腿在后来的很多年里还会在梦里发软。
  _effects: health -0.040000000000000036 (the bear-pit rescue left the legs shaking); reputation 0.06; relation friend with person-materialized-world-vienna-1912-31; cash 2 (reward from the child's parents); state_add oj18-odd-apprenticeship state:world-vienna-1912:213; mood -0.020000000000000018; flag +zoo_night_shift; flag +saved_child_at_zoo; knowledge “母熊被苹果桶引开时，孩子已经挂在{keeper}的胳膊上了。”; relation acquaintance with person-materialized-world-vienna-1912-31; role; flag +odd_job_apprentice_

- **1930.04** `bc18-enemy.accidental-help::ctx-vienna-reform-1930::milieu-tenement/letter-printed-as-praise` tags: enemy, mistake, work, reputation, absurd, luck, social, reform
  Otto Winter写了一封告状信，列数Emil的懒惰、贪婪和“可疑的出身”，却把信封上的地址写成了报社。Maria Stein以为这是一篇自荐小品，删掉几处脏话登了出来；读者喜欢这种不留情面的自嘲，两个商行给Emil寄来聘书。Otto Winter在咖啡馆看见报纸，差点把杯子捏碎。
  _effects: cash 4 (商行聘书的预付薪金); reputation 0.05000000000000002; state_add bc18-ridiculous-fame state:world-vienna-1912:214; relation rival with person-otto-winter; relation acquaintance with person-materialized-world-vienna-1912-72; condition; flag +enemys_letter_became_an_advert; mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-72; flag +ridiculously_famous; reputation 0.01999999999999999; mood 0.020000000000000018_

- **1930.06** `vienna-tenement-neighbors.shared_stove_fire/fire_burns_curtain` tags: home, social, family, housing
  Emil在公用灶台上热猪油，油星子溅到旁边晾着的床单上，火苗顺着床单爬上木隔板。Rosa Lechner拎起水桶泼过去，火灭了，但床单烧掉半幅，隔板熏黑一片。房东扣了那户人家两克朗押金，那家的女人在楼道里哭了一下午。
  _effects: cash -2 (赔给房东的隔板熏黑损失); relation acquaintance with person-rosa-lechner_

- **1931.01** `vienna-tenement-neighbors.laundry_line_dispute/subject_yields_line` tags: home, social, family, housing
  Emil看Rosa Lechner盆里那几件小衬衫，把自家床单卷起来抱回屋，说等下午再晾。Rosa Lechner愣了一下，闷头把衣服挂好，收工回来时在Emil门口放了一小包用旧报纸裹的洗衣碱。Emil打开报纸，碱面里还掺着几粒粗盐。
  _effects: relation friend with person-rosa-lechner; food_
  _causes: evt:world-vienna-1912:003973_

- **1931.01** `bc18-fame.merchandise::ctx-vienna-reform-1930::milieu-tenement/lawsuit-sells-moustaches` tags: fame, merchandise, business, absurd, legal, public, reputation, reform
  Emil请Rosa Lechner递了状子，说假胡子用了Emil的脸。开庭那天，旁听席坐满了想看看“发明家本人”的人；法官问胡子与脸有何关系，庭里笑成一片。官司输了，Emil付了两克朗诉讼费；同一个月，假胡子的销量翻了一倍，Franz Weiss 2在报纸上登了一句“感谢那位不肯沉默的先生”。
  _effects: cash -2 (诉讼费和律师费); state_parameter bc18-ridiculous-fame.notoriety 20 -> 30; state_parameter bc18-ridiculous-fame.boredom 4 -> 9; reputation -0.01999999999999999; condition; relation acquaintance with person-rosa-lechner; flag +lost_moustache_lawsuit; mood -0.019999999999999962_

- **1931.01** `state_tick:oj18-odd-apprenticeship/strange-year/blamed-for-the-noise` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  楼上住户投诉夜里有人拖椅子，管事的把巡查簿翻到Emil的那一页，说签字太潦草，看不出巡过几趟。Emil想辩解，却想起那晚确实在楼梯间多站了一刻钟；扣掉的工钱刚好够买一双不漏水的鞋。
  _effects: state_parameter oj18-odd-apprenticeship.trust 38 -> 22; state_parameter oj18-odd-apprenticeship.reliability 65 -> 55; mood -0.050000000000000044; flag +odd_job_scare_

- **1931.01** `state_tick:bc18-ridiculous-fame/ridiculous-fame-year/the-story-holds-another-year` tags: bc18-ridiculous-fame, fame, reputation, mistaken_identity, promotion, media, absurd, public
  又一年过去，Emil仍在被介绍成那个人物。邀请函从市郊的园艺会、女子学校和退伍军人酒馆寄来；Emil学会在签名后加一句模糊的谦辞，听起来像有许多往事不便细说。每一次应付都带来一点小钱，也让真正的解释更不合时宜。
  _effects: state_parameter bc18-ridiculous-fame.notoriety 30 -> 37; state_parameter bc18-ridiculous-fame.invitations 2 -> 3; cash 1 (一场小型演讲的车马费); reputation 0.010000000000000009; mood 0.020000000000000018_

- **1931.01** `r13-fam.teach-parent-to-read::ctx-vienna-reform-1930::milieu-tenement::teach-parent-reform/school-full` tags: task, care, literacy, parent, school, intergenerational, reform, medical
  夜校的名额满了，登记的人让下个季度再来。Katharina Bauer把报名表折好，说本来也不是非学不可；Emil看见Katharina Bauer把那张纸夹进了祈祷书。回家的电车上，Katharina Bauer一直看着窗外的招牌，忽然问Emil那个字念什么。
  _effects: flag +night_school_waitlist; relation kin with person-katharina-bauer; knowledge “the parent keeps the enrolment form in the prayer book”; condition_

- **1931.03** `vienna-housing-move.moving-day/moving-day-handcart` tags: housing, home, rent, family, money, injury
  第一趟过街口时车上的煤箱差点翻下来，Franz Weiss 2用膝盖顶住，Emil把绳子又收了一道。第三趟回来，两人靠在门框上喘气，鞋底都是灰，省下的钱还揣在围裙里。
  _effects: cash -1 (借手推车买烟熨谢邻居的小开销); health -0.050000000000000044 (三趟推车扛家具累得肩臂酸痛); relation acquaintance with person-materialized-world-vienna-1912-31_

- **1931.05** `vienna-church-community.tenement-prayer/rent-prayer-argument` tags: faith, social, family, home
  有人抱怨守夜人太多，踩坏了楼梯木板。楼里的人围着看，谁也没先走开。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-43; reputation -0.03; mood -0.05999999999999994; relation acquaintance with person-materialized-world-vienna-1912-43_

- **1931.07** `vienna-tenement-neighbors.lost_room_key/key_lost_landlady` tags: home, social, family, housing
  Emil把钥匙丢在了回家路上的有轨电车轨道旁，天黑也没找着。房东太太说换锁芯要一克朗五十赫勒，从下月房租里扣。Karl Kraus借给Emil一把旧挂锁，但锁鼻和门扣对不上，只能用铁丝拧着凑合。那夜Emil睡不踏实，总觉得有人在拧门。
  _effects: cash -1.5 (换锁芯费用); mood -0.06000000000000005_

- **1932.01** `r14-edu.sibling-exam::ctx-vienna-reform-1930::milieu-tenement/sibling-passed` tags: education, tutored_sibling, family, exam, reform, medical, schooling, home
  Berta Bauer从考场出来，手里攥着准考证，说最后一道题做出来了。放榜那天，Emil陪Berta Bauer去看榜，名字在中间偏下，够了。Berta Bauer跳起来，又立刻站好，回头问Emil能不能把旧课本留下。报名费两克朗，Emil替Berta Bauer交了。
  _effects: cash -2 (弟弟妹妹的准考证); flag +sibling_passed_exam; relation kin with person:evt:world-vienna-1912:000322:child_
  _causes: evt:world-vienna-1912:002670_

- **1932.01** `vienna-life-depression/laid-off` tags: adulthood, depression, work, unemployment
  厂里把一张短工名单贴在厂门口。Emil的名字在第三行，旁边写着“下周等通知”。等到月底，通知没有来，工票也停了。
  _effects: unemployment (laid off in the depression); cash -5 (lost wages); condition_

- **1932.01** `state_expire:bc18-ridiculous-fame` tags: bc18-ridiculous-fame, fame, reputation, mistaken_identity, promotion, media, absurd, public
  Emil的「荒唐的名声」到期；相关安排结束。
  _effects: state_remove bc18-ridiculous-fame state:world-vienna-1912:214; flag -ridiculously_famous_

- **1932.01** `state_tick:wish-love/love-pressure/put-away` tags: wish-love, wish, wish:love, love, family, intimacy, state, state_tick
  Emil暂时把那件事收进抽屉；日子还有别的东西要应付。
  _effects: mood -0.020000000000000018_

- **1932.01** `r13-fam.seek-friend::ctx-vienna-reform-1930::milieu-tenement/rebuffed` tags: task, social, friendship, loneliness, belonging, reform, medical, schooling
  Emil刚开口，Helene Winter就把报纸举高，说这张桌子有人。Emil端着杯子在门口站了一会儿，回去把椅子放正；第二天同一时辰，Helene Winter没有来，桌上留着一圈没擦干的杯印。
  _effects: mood -0.09999999999999998; flag +rebuffed_while_seeking_friend; relation acquaintance with person-helene-winter_

- **1932.05** `bc18-crime.inept-blackmail::ctx-vienna-reform-1930::milieu-tenement/pay-hush-money` tags: crime, blackmail, photograph, mistake, humiliation, absurd, reputation, reform
  Emil先给了两克朗，Anton Bauer 2又要四克朗；第三次来收钱时，Emil把他带到了警察局。警员在Anton Bauer 2的口袋里找到三张别人的照片，其中一张是市议员在酒馆后门。Emil拿回自己的照片，也花掉了一个下午，回家时晚饭已经凉了。
  _effects: cash -4 (付给勒索者的封口钱); reputation -0.01999999999999999; relation rival with person-materialized-world-vienna-1912-39; condition; flag +paid_then_reported_blackmail; mood -0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-39; relation acquaintance with person-materialized-world-vienna-1912-55_

- **1933.01** `oj18-zoo.escape::ctx-vienna-reform-1930::milieu-tenement/hid-the-chimp` tags: zoo, animals, escape, night, blame, work, odd_job, reform
  马戏班老板Franz Berg在普拉特门口拦住Emil，说愿意出三十克朗买那只黑猩猩，还缺一个懂它脾气的驯养人。Emil没有答应，也没有报告；夜里，Emil把卡斯帕藏进废弃的鸟舍，每天多带一份面包。
  _effects: cash -1 (bread for the hidden chimpanzee); relation acquaintance with person-materialized-world-vienna-1912-1; state_parameter oj18-odd-apprenticeship.strangeKnowledge 18 -> 26; state_add oj18-workplace-legend state:world-vienna-1912:312; mood -0.020000000000000018; flag +hid_chimp; knowledge “卡斯帕藏在废弃鸟舍里，听见面包纸响就会从梁上下来。”; relation acquaintance with person-materialized-world-vienna-1912-70; relation acquaintance with person-materialized-world-vienna-1912-1; role; flag +workplace_legend_

- **1933.01** `state_tick:oj18-odd-apprenticeship/strange-year/blamed-for-the-noise` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  楼上住户投诉夜里有人拖椅子，管事的把巡查簿翻到Emil的那一页，说签字太潦草，看不出巡过几趟。Emil想辩解，却想起那晚确实在楼梯间多站了一刻钟；扣掉的工钱刚好够买一双不漏水的鞋。
  _effects: state_parameter oj18-odd-apprenticeship.trust 22 -> 6; state_parameter oj18-odd-apprenticeship.reliability 55 -> 45_

- **1933.01** `task-vienna-bourgeois-youth.family-business-or-study/ledger-and-evening-class` tags: bourgeois, education, culture, salon, university, family, task, task:education
  Emil接过账房钥匙，同时报了夜间的经济课程，一周三晚。白天对账，晚上听课，到周末眼睛发涩。Katharina Bauer没反对，只是把钥匙串上的铜牌擦了一遍交给他。
  _effects: cash 8 (管账的月钱); skill; relation kin with person-katharina-bauer_

- **1933.03** `vienna-courtship-courtyard.breakup/keys-and-photo-returned` tags: adulthood, courtship, partner, social, family, separation
  院子里晾着三条床单，风一过就拍到人脸上。Emil把备用钥匙和一张照相馆拍的合影交还，Ferdinand Winter 2把那件借来的外套叠好递回。两人说好各找各的住处，谁都没有提高声音；分手分得干净，可两个人心里都空了一块。
  _effects: relation_end partner with person-materialized-world-vienna-1912-6; mood -0.08999999999999997; flag +courtship_ended_cleanly_

- **1933.03** `state_reaction:wish-love/love-betrayal` tags: wish-love, wish, wish:love, love, family, intimacy, state, state_reaction
  Emil反复回想最后一次见面。对方说过的话被拆成很多小块，每一块都能扎人。
  _effects: mood -0.030000000000000027_
  _causes: evt:world-vienna-1912:005232_

- **1933.12** `vienna-legacy-worklife.union-office/union-office.write-off` tags: legacy, work, family, reform, ordinary_life
  账本的纸边已经发毛，Emil翻到那一页时，手指沾上一层灰。有人说“三十四克朗够买两袋面粉”，没人接话。最后举手表决，赞成销账的手比反对的多两只，老成员把手放下去时，椅子又晃了一下。
  _effects: mood -0.040000000000000036; relation acquaintance with person-anna-bauer; flag +union_debt_written_off; relation acquaintance with person-materialized-world-vienna-1912-79_

- **1934.01** `major-work-first-employment/turned-away` tags: work, employment, unemployment, major
  Buchdruckerei Winter & Söhne的工头翻完工票，问Emil上一个东家是谁。Emil说厂子关了，工头又问有没有辞工证明；没有证明，名册就不能写。后面的人挤上来，Emil被推到台阶下面。中午的钟响了，Emil站在街对面，看新来的人把名字一个个写上去。
  _effects: cash -2 (carfare and waiting); reputation -0.03; flag +no_work_references; role; relation acquaintance with person-materialized-world-vienna-1912-58; relation acquaintance with person-materialized-world-vienna-1912-58_

- **1934.01** `state_expire:oj18-odd-apprenticeship` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  Emil的「奇职学徒」到期；相关安排结束。
  _effects: state_remove oj18-odd-apprenticeship state:world-vienna-1912:213; role; flag -odd_job_apprentice_

- **1934.01** `state_tick:oj18-workplace-legend/story-year/story-holds` tags: oj18-workplace-legend, work, legend, odd_job, rumor, identity, night, state
  又有人来问那个老故事。Emil把烟按灭，从头讲了一遍，连哪天下雨、哪盏灯坏了都没有改。听的人散了以后，学徒在门口说“跟上次一样”；Emil知道，至少这一版还能再撑几年。
  _effects: state_parameter oj18-workplace-legend.legend 20 -> 23; state_parameter oj18-workplace-legend.truth 55 -> 57; state_parameter oj18-workplace-legend.toldCount 0 -> 1; reputation 0.01999999999999999_

- **1934.01** `p9-social-relationship-initiative.apology-at-bakery/settle-the-account` tags: courtship, friendship, family, social, initiative, housing, task, task:social
  七点刚过，Ferdinand Moser照例来买一只 Semmel。Emil把紫罗兰和两只 Semmel 放在柜台上，先付了四十赫勒，又把上回算错的账一笔一笔说清：借出去的是八克朗，记成了十克朗，是自己记错了。Ferdinand Moser听完没马上说话，把零钱数进围裙口袋，最后说中午过来喝碗汤。
  _effects: cash -0.4 (一小束紫罗兰和两只 Semmel); relation friend with person-materialized-world-vienna-1912-54; mood 0.07999999999999996_

- **1934.10** `vienna-legacy-worklife.sick-fund/sick-fund.advance-from-fund` tags: legacy, work, family, reform, ordinary_life
  药房在街口，柜台玻璃下面压着价目纸。Emil把两克朗推过去，伙计找回来十二赫勒，药片用报纸包成一个小包。工友接过去时手还在抖，报纸边角很快被汗洇软。
  _effects: cash -2 (从互助金垫付药费); relation acquaintance with person-materialized-world-vienna-1912-41; relation acquaintance with person-materialized-world-vienna-1912-41_

- **1934.11** `vienna-parish-aid.rent-box/rent-box.accept-all` tags: faith, parish, mutual_aid, poverty, family
  门铃是根铁丝拉的，响得发闷。Anton Moser 2提篮进门先看水槽里泡着的碗，再看墙角的煤箱，说价钱她心里有数。Emil把印泥盒推到桌边，按下去时指尖凉了一下。
  _effects: cash 6 (互助会补上本月房租差额); food; relation acquaintance with person-materialized-world-vienna-1912-21; flag +parish_registered; relation acquaintance with person-materialized-world-vienna-1912-21_

- **1935.01** `r14-edu.sibling-exam::ctx-vienna-reform-1930::milieu-tenement/sibling-left-for-work` tags: education, tutored_sibling, family, exam, reform, medical, schooling, home
  Berta Bauer没有等到毕业，跟着同乡去了铁路工地上工。走的那天，Emil把攒下的两克朗塞进Berta Bauer的口袋，Berta Bauer没有推辞。火车开走后，Emil在站台上站了很久，手里还拿着那本没讲完的算术书。
  _effects: cash 2 (弟弟妹妹的准考证); flag +sibling_left_school; relation kin with person:evt:world-vienna-1912:000322:child_
  _causes: evt:world-vienna-1912:003767_

- **1935.01** `vienna-family-courtship/ask-to-share-a-home` tags: family, courtship, household, social, lifecycle
  Emil在Leopoldstädter Zinshaus, gemeinsamer Gang靠窗的桌边，把一只空咖啡杯转了半圈，说房租两人合付、桌子两人共用。Katharina Hofer的手停在糖罐盖上，问了一句“要是过不下去呢”，没有当场答应，只说要想一想；杯里的咖啡凉了，话还悬在桌面上。
  _effects: interaction_

- **1935.01** `vienna-tenement-neighbors.shared_stove_fire/fire_no_damage` tags: home, social, family, housing
  Emil刚把锅端下灶，火苗就蹿了起来，Luise Kral一脚踩灭地上的油布，顺手抄起沙箱里的沙子盖住灶口。两人都没受伤，但Luise Kral的鞋底烧穿一个洞，那是唯一一双出门的鞋。
  _effects: relation friend with person-luise-kral_

- **1935.01** `vienna-legacy-worklife.hours-ledger/hours-ledger.refuse` tags: legacy, work, family, reform, ordinary_life
  工头把表折成四折塞进围裙口袋，说“你会后悔的”。Emil当天下午去账房窗口排队，窗上的铁栅栏有股锈味。账房先生翻了半天蓝皮本子，最后从抽屉里数出八克朗硬币，一枚一枚推过台面。
  _effects: cash 8 (追回的拖欠计件工资); reputation -0.03; relation colleague with person-materialized-world-vienna-1912-70_

- **1935.01** `state_expire:oj18-workplace-legend` tags: oj18-workplace-legend, work, legend, odd_job, rumor, identity, night, state
  Emil的「职场传说」到期；相关安排结束。
  _effects: state_remove oj18-workplace-legend state:world-vienna-1912:312; role; flag -workplace_legend_

- **1935.01** `p9-work-jobsearch.ask-trial/ask-trial.accepted` tags: work, job_search, negotiation, wages, employment, task, trial, factory
  午休的哨子刚响，Josef Moser 2夹着烟走到门口。Emil报上姓名、住址和干过的活，声音有点发紧。工头嗯了一声，说明早六点来，管一顿午饭，干得好再谈工钱。
  _effects: flag +trial_work_pending; relation acquaintance with person-materialized-world-vienna-1912-81; mood 0.050000000000000044; relation acquaintance with person-materialized-world-vienna-1912-81_

- **1935.01** `initiative:found_process:zoo:person-materialized-world-vienna-1912-51-evt:world-vienna-1912:004340`
  普拉特动物园夜班队在Leopoldstädter Zinshaus, gemeinsamer Gang经过数年的招募、会议和互助，把分散的行动整理成公开纲领；这不是预先写好的历史，而是成员自己累积出来的运动。
  _effects: historical process 普拉特动物园夜班队的持续运动; historical development:initiative-zoo:person-materialized-world-vienna-1912-51-evt:world-vienna-1912:004340-1935 as organizer; historical development:initiative-zoo:person-materialized-world-vienna-1912-51-evt:world-vienna-1912:004340-1935 as organizer; historical development:initiative-zoo:person-materialized-world-vienna-1912-51-evt:world-vienna-1912:004340-1935 as organizer; knowledge “普拉特动物园夜班队的持续运动不是一次会议，而是我们这些年积累出来的持续组织。”; reputation 0.04000000000000001_

- **1935.01** `historical_phase`
  历史进程《普拉特动物园夜班队在Leopoldstädter Zinshaus, gemeinsamer Gang经过数年的招募、会议和互助，把分散的行动整理成公开纲领；这》从 emerging 进入 mobilizing。
  _effects: knowledge “我亲历或知晓「普拉特动物园夜班队在Leopoldstädter Zinshaus, gemeinsamer Gang经过”; knowledge “我亲历或知晓「普拉特动物园夜班队在Leopoldstädter Zinshaus, gemeinsamer Gang经过”; knowledge “我亲历或知晓「普拉特动物园夜班队在Leopoldstädter Zinshaus, gemeinsamer Gang经过”_
  _causes: evt:world-vienna-1912:006383_

- **1935.04** `bc18-fame.wrong-bust::ctx-vienna-authoritarian-1934::milieu-tenement/plaque-stays` tags: fame, mistaken_identity, museum, public, invention, absurd, status, humiliation
  市立蜡像馆新添了一间“发明家厅”。Friedrich Hofer把Emil请到绿绒椅子上，说照片是从旧报纸上剪的，名字也核对过三遍。揭幕那天，Emil看见自己的蜡像握着一根安全火柴，铭牌上写着一个从未属于Emil的专利号；掌声很整齐，Friedrich Hofer把下一场讲解的酬劳塞进口袋，动作像在递一块糖。
  _effects: cash 4 (蜡像馆的讲解酬劳); state_add bc18-ridiculous-fame state:world-vienna-1912:380; reputation 0.029999999999999985; relation acquaintance with person-friedrich-hofer; flag +wax_museum_inventor; mood 0.030000000000000027; flag +ridiculously_famous; reputation 0.020000000000000004; mood 0.020000000000000018_

- **1936.01** `interaction_response` tags: interaction, partnership, household
  Katharina Hofer在几天后找到Emil，说可以试试。两人开始合付房租，也把各自欠的账摊在桌上。
  _effects: relation partner with person-materialized-world-vienna-1912-2; household; role; interaction_
  _causes: evt:world-vienna-1912:006143_

- **1936.01** `vienna-tenement-neighbors.laundry_line_dispute/neighbor_yanks_clothes` tags: home, social, family, housing
  Luise Kral嫌Emil的床单滴水滴到Luise Kral家衬衫上，一把扯下床单扔在院子的石板上。Emil下楼捡起来时，床单角沾了泥，重洗又要费肥皂。两人在院子当中对喊，楼上有人推开窗看热闹。Emil把床单重新搭上绳子时，故意把水拧在Luise Kral那侧。
  _effects: relation rival with person-luise-kral; cash -0.15 (重洗床单的肥皂钱)_
  _causes: evt:world-vienna-1912:006144_

- **1936.01** `bc18-fame.lecture-tour::ctx-vienna-authoritarian-1934::milieu-tenement/provincial-triumph` tags: fame, lecture, travel, absurd, public, invention, reputation, vienna
  外省的市民协会一个接一个发来邀请，请Emil讲“发明的未来”。Mitzi Kral把票价定得太高，礼堂却照样坐满；Emil在台上谈摩擦、谈火花、谈一种自己也没见过的机器，听众把每一句都记进小本子。散场后，Helene Bauer握着手说，这座城市需要更多像Emil这样敢想的人。
  _effects: cash 5 (巡回演讲的酬劳); state_parameter bc18-ridiculous-fame.notoriety 44 -> 52; state_parameter bc18-ridiculous-fame.invitations 1 -> 2; reputation 0.01999999999999999; skill; mood 0.020000000000000018_

- **1936.01** `vienna-parish-aid.sick-call/sick-call.door-only` tags: faith, parish, mutual_aid, poverty, family
  Emil把药包和半块肥皂交给开门的孩子，嘱咐用水冲开、一天两次，就下了楼。楼梯间里孩子一直站在门口看着，手里攥着纸包，没关门。Emil走到二层又折回去，帮他把门带上，说自己家里也等着火。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-25; mood -0.030000000000000027_

- **1936.01** `state_tick:bc18-ridiculous-fame/ridiculous-fame-year/the-story-holds-another-year` tags: bc18-ridiculous-fame, fame, reputation, mistaken_identity, promotion, media, absurd, public
  又一年过去，Emil仍在被介绍成那个人物。邀请函从市郊的园艺会、女子学校和退伍军人酒馆寄来；Emil学会在签名后加一句模糊的谦辞，听起来像有许多往事不便细说。每一次应付都带来一点小钱，也让真正的解释更不合时宜。
  _effects: state_parameter bc18-ridiculous-fame.notoriety 52 -> 59; state_parameter bc18-ridiculous-fame.invitations 2 -> 3; cash 1 (一场小型演讲的车马费); reputation 0.010000000000000009; mood 0.020000000000000018_

- **1936.01** `state_tick:wish-love/love-pressure/put-away` tags: wish-love, wish, wish:love, love, family, intimacy, state, state_tick
  Emil暂时把那件事收进抽屉；日子还有别的东西要应付。
  _effects: mood -0.020000000000000018_

- **1936.01** `p9-social-daily-culture.last-standing-ticket/p9-social-daily-culture.last-standing-ticket.church-organ` tags: daily, culture, leisure, cafe, music, walk, task, task:culture
  Emil数了数前面攒动的人头，把口袋里的硬币又攥紧了些，转身离开队伍。走到街角的教堂时，管风琴正从敞开的门里传出来，Emil在最后一排长凳上坐下，听完整段前奏曲，一个赫勒也没花，只跪得膝盖发酸。出门时与Grete Kral道了别，约好下回还来排队。
  _effects: mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-22; relation acquaintance with person-materialized-world-vienna-1912-22_

- **1936.02** `state_reaction:bc18-ridiculous-fame/reprinted-wrong` tags: bc18-ridiculous-fame, fame, reputation, mistaken_identity, promotion, media, absurd, public
  报纸的周末副刊又把Emil的旧照片翻出来，配上一个更整齐的故事：发明、失败、谦逊的晚年。Emil写信去更正，编辑回了一张便条，说读者喜欢现在这个版本。
  _effects: state_parameter bc18-ridiculous-fame.notoriety 38 -> 44; state_parameter bc18-ridiculous-fame.absurdity 72 -> 77; state_parameter bc18-ridiculous-fame.legitimacy 12 -> 8; flag +story_reprinted_wrong; mood -0.010000000000000009_
  _causes: evt:world-vienna-1912:006525_

- **1936.02** `state_reaction:wish-love/love-betrayal` tags: wish-love, wish, wish:love, love, family, intimacy, state, state_reaction
  Emil反复回想最后一次见面。对方说过的话被拆成很多小块，每一块都能扎人。
  _effects: mood -0.12_
  _causes: evt:world-vienna-1912:006734_

- **1936.05** `ad20-stranger-request::ctx-vienna-authoritarian-1934::milieu-tenement/take-the-envelope` tags: stranger, envelope, request, everyday, obligation, risk, vienna, urban
  Rosa在巷口拦住Emil，把一个没有字的信封塞过来，说“明天中午之前，别打开”。Emil问里面是什么；Rosa说“你不需要知道”。信封很薄，捏起来却像有一块硬东西。
  _effects: state_add ad20-private-bargain state:world-vienna-1912:411; cash 2 (payment for carrying the envelope); relation acquaintance with person-phase15-Rosa-world-vienna-1912; flag +envelope_taken; mood -0.010000000000000009; knowledge “信封很薄，里面像有一块硬东西。”; flag +private_bargain_active_

- **1936.11** `vienna-church-community.tenement-prayer/rent-prayer-help` tags: faith, social, family, home
  楼梯间只点一根蜡烛。Helene Winter凑过来低声说，楼下老寡妇的喘病又重了，教区明早才能派修女来。Emil把汤碗接过去，碗底还温着。
  _effects: food; relation acquaintance with person-helene-winter_

- **1937.01** `vienna-family-divorce/partner-moves-to-shared-housing` tags: family, marriage, divorce, housing, lifecycle, separation, household
  Katharina Hofer把一只箱子和工票搬去合租房，带走一半锅碗。Emil留在Leopoldstädter Zinshaus, gemeinsamer Gang，把空出来的床租给一个学徒，用租金补房租；搬家花掉四克朗，Emil在户籍上成了分居的人，夜里听见隔壁床板响，总要愣一下。
  _effects: relation_end partner with person-materialized-world-vienna-1912-2; household; cash -4 (moving and separate goods); mood -0.06000000000000005; role_

- **1937.01** `office16-budget.sign-or-block::ctx-vienna-authoritarian-1934::milieu-tenement/signed-with-margin` tags: office, budget, permit, administration, power, economy, vienna, urban
  Emil在预算表上签了字，把冬季煤房的款项从三笔并成一笔，又给夜班守卫加了半份津贴。Helene Bauer算出省下的钱刚好够修屋顶；没有人鼓掌，但一月的会议室不再需要穿大衣。
  _effects: organization_funds; reputation 0.03999999999999998; skill; mood 0.020000000000000018; flag +signed_balanced_budget; knowledge “把冬季煤房的款项并成一笔后，省下的钱够修会议室屋顶。”; relation acquaintance with person-materialized-world-vienna-1912-84_

- **1937.01** `ml18-business.bottle-cap-patent::ctx-vienna-authoritarian-1934::milieu-tenement/sell-the-patent-outright` tags: business, patent, money, windfall, invention, comic, vienna, urban
  破产拍卖会上，Emil用四克朗买下一张没人举牌的瓶盖专利，只因为图纸画得好看。三个月后，普拉特动物园夜班队的矿泉水厂找上门：那圈软木垫正好能解决他们的漏气问题。Helene Bauer核对完专利号，普拉特动物园夜班队当场开出八十克朗的支票。
  _effects: cash 80 (sale of the bottle-cap patent); state_add ml18-sudden-fortune state:world-vienna-1912:443; relation acquaintance with person-materialized-world-vienna-1912-51; reputation 0.06; flag +sold_patent; mood 0.09999999999999998; flag +sudden_fortune; reputation 0.020000000000000018; mood 0.030000000000000027_

- **1937.01** `state_tick:bc18-ridiculous-fame/ridiculous-fame-year/the-audience-gets-bored` tags: bc18-ridiculous-fame, fame, reputation, mistaken_identity, promotion, media, absurd, public
  观众开始厌倦同一个故事。园艺会请了更年轻的发明家，女子学校把Emil的名字从海报上撤下；Emil在咖啡馆听见有人说“那个人还在讲火柴”。同一个月，一张报纸把旧照片配上新标题，问Emil是否已经“过气”。纠正的冲动又回来，但没有人再提问。
  _effects: state_parameter bc18-ridiculous-fame.legitimacy 8 -> 0; state_parameter bc18-ridiculous-fame.boredom 8 -> 20; state_parameter bc18-ridiculous-fame.invitations 3 -> 2; reputation -0.020000000000000018; mood -0.030000000000000027_

- **1937.01** `state_tick:ad20-private-bargain/the-favor-ages/called-in` tags: ad20-private-bargain, private, bargain, favor, debt, trust, leverage, exit
  对方在一个不合时宜的时刻提起旧事，语气很客气，意思却不客气。Emil听见自己答应得太快，挂断以后才发现手心有一层薄汗。
  _effects: state_parameter ad20-private-bargain.leverage 55 -> 63; state_parameter ad20-private-bargain.debt 45 -> 49; state_parameter ad20-private-bargain.trust 35 -> 31; mood -0.030000000000000027_

- **1937.01** `agency:support_process` tags: agency, agency:support_process
  Emil想帮忙，但组织者不信任新来的人，只让其在外围等消息。
  _effects: mood -0.040000000000000036; reputation -0.010000000000000009_

- **1937.12** `r2-law.eviction-hearing::ctx-vienna-authoritarian-1934::milieu-tenement/eviction-ordered` tags: law, eviction, housing, court, tenement, vienna, urban, crisis
  Rosa Lechner说欠租事实清楚，合同也到期了，当庭判令腾房，限十五天。Helene Bauer的律师问能不能立即执行，Rosa Lechner说十五天已经是最短。Emil问孩子上学怎么办，Rosa Lechner说这个庭管不了学校；Franz Berg在门口等着，把自家的板车推了过来。
  _effects: cash -6 (驱逐听证的十五分钟); condition; flag +eviction_ordered_by_court; role; relation friend with person-materialized-world-vienna-1912-1; knowledge “the court gives fifteen days and does not rule on schooling”_

- **1938.01** `r14-edu.sibling-favour::ctx-vienna-authoritarian-1934::milieu-tenement/sibling-paid-the-fees` tags: education, tutored_sibling, family, reunion, vienna, urban, crisis, war
  Berta Bauer在城里站稳了脚，托人带来一个信封，里面是八克朗和一张夜校报名单。信上只写：当年你教我算术，现在轮到我付学费。Emil把报名单看了三遍，填好，第二天一早就去交了。
  _effects: cash 8 (多年后的一封家信); flag +sibling_repaid_tutoring; relation kin with person:evt:world-vienna-1912:000322:child_
  _causes: evt:world-vienna-1912:004625_

- **1938.01** `vienna-life-anschluss-1938/resists` tags: politics, persecution, 1938, injury
  Emil在登记桌旁说了句“这里以前不是这样”。Rosa Lechner记下地址，当晚两个穿制服的人来敲门，把Emil带到警局，第二天放回来时脸上有伤。
  _effects: health -0.12 (beaten in police custody); condition; role; cash -5 (fine and lost work)_

- **1938.01** `vienna-family-courtship/ask-to-share-a-home` tags: family, courtship, household, social, lifecycle
  Emil在Leopoldstädter Zinshaus, gemeinsamer Gang靠窗的桌边，把一只空咖啡杯转了半圈，说房租两人合付、桌子两人共用。Maria Winter的手停在糖罐盖上，问了一句“要是过不下去呢”，没有当场答应，只说要想一想；杯里的咖啡凉了，话还悬在桌面上。
  _effects: interaction_

- **1938.01** `office16-rival.removal-motion::ctx-vienna-authoritarian-1934::milieu-tenement/motion-carries` tags: office, rivalry, politics, removal, power, intrigue, vienna, urban
  投票结果是十九比十七。Emil把印章、钥匙和一本写满批注的账本放进纸箱，最后一圈走廊走得比平时慢。Helene Bauer在门口等着接手，手里已经拿着新的编制表；表上第一个被划掉的名字是Emil的秘书。
  _effects: position_end 联络员 @zoo:person-materialized-world-vienna-1912-51-evt:world-vienna-1912:004340; reputation -0.04999999999999999; mood -0.04999999999999993; condition; relation rival with person-materialized-world-vienna-1912-45; flag +removed_by_vote; knowledge “新编制表第一个划掉的是我的秘书。”_

- **1938.01** `state_expire:bc18-ridiculous-fame` tags: bc18-ridiculous-fame, fame, reputation, mistaken_identity, promotion, media, absurd, public
  Emil的「荒唐的名声」到期；相关安排结束。
  _effects: state_remove bc18-ridiculous-fame state:world-vienna-1912:380; flag -ridiculously_famous_

- **1938.01** `state_tick:ad20-private-bargain/the-favor-ages/called-in` tags: ad20-private-bargain, private, bargain, favor, debt, trust, leverage, exit
  对方在一个不合时宜的时刻提起旧事，语气很客气，意思却不客气。Emil听见自己答应得太快，挂断以后才发现手心有一层薄汗。
  _effects: state_parameter ad20-private-bargain.leverage 63 -> 71; state_parameter ad20-private-bargain.debt 49 -> 53; state_parameter ad20-private-bargain.trust 31 -> 27_

- **1938.01** `p9-social-daily-culture.last-standing-ticket/p9-social-daily-culture.last-standing-ticket.church-organ` tags: daily, culture, leisure, cafe, music, walk, task, task:culture
  Emil数了数前面攒动的人头，把口袋里的硬币又攥紧了些，转身离开队伍。走到街角的教堂时，管风琴正从敞开的门里传出来，Emil在最后一排长凳上坐下，听完整段前奏曲，一个赫勒也没花，只跪得膝盖发酸。出门时与Friedrich Huber道了别，约好下回还来排队。
  _effects: mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-57; relation acquaintance with person-materialized-world-vienna-1912-57_

- **1938.04** `r3-war.defeat-rumor::ctx-vienna-authoritarian-1934::milieu-tenement::defeat-rumor-crisis/witnessed-records-evacuated` tags: war, rumor, defeat, bread, fear, vienna, urban, crisis
  第二天，面包房开门时，队伍排得比平时长。Rosa说昨晚听见火车站在烧文件，Emil说那是暖气；话没说完，一辆卡车拉着档案柜从街口拐过去。Rosa Lechner站在门口，手里的钥匙串一直响。
  _effects: food; flag +witnessed_records_being_evacuated; relation acquaintance with person-rosa-lechner; knowledge “the government is moving its files”; relation acquaintance with person-materialized-world-vienna-1912-15_

- **1939.01** `interaction_response` tags: interaction, partnership, household
  Maria Winter在几天后找到Emil，说可以试试。两人开始合付房租，也把各自欠的账摊在桌上。
  _effects: relation partner with person-materialized-world-vienna-1912-50; household; role; interaction_
  _causes: evt:world-vienna-1912:007657_

- **1939.01** `af17-wish.family-inheritance::ctx-vienna-authoritarian-1934::milieu-tenement/sold-the-shop` tags: wish, love, family, inheritance, shop, debt, irony, vienna
  房产经纪人只用了两天就找到买主，要把烟铺改成一家卖进口香皂的店面。Emil在契约上签了字，拿到十二克朗，比继承来的赊账多出不少。Rosa Lechner和她的姐姐在月底搬去城郊的侄女家，临走前把猫留在空柜台下面；Emil没有回去看那只猫，只在账本最后一页写下“已结清”。
  _effects: cash 12 (卖掉烟铺的钱); relation acquaintance with person-materialized-world-vienna-1912-106; reputation -0.04999999999999999; condition; flag +sold_the_tobacco_shop; mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-106_

- **1939.01** `state_tick:ad20-private-bargain/the-favor-ages/called-in` tags: ad20-private-bargain, private, bargain, favor, debt, trust, leverage, exit
  对方在一个不合时宜的时刻提起旧事，语气很客气，意思却不客气。Emil听见自己答应得太快，挂断以后才发现手心有一层薄汗。
  _effects: state_parameter ad20-private-bargain.leverage 75 -> 83; state_parameter ad20-private-bargain.debt 59 -> 63; state_parameter ad20-private-bargain.trust 27 -> 23_

- **1939.01** `kernel-social.reconciliation::ctx-vienna-authoritarian-1934::milieu-tenement/reconciliation.cold-peace` tags: task, task:social, social, reconciliation, family, apology, conflict, vienna
  Hermann Bauer收下了锅，却没有让Emil进门，说东西留下，人先回去。Emil在门口站了一会儿，把锅盖掀开又盖上；第二天，空锅被放在门槛上，里面压着一张写着“收到了”的纸条。
  _effects: relation kin with person:evt:world-vienna-1912:000324:child; role; flag +cold_peace; knowledge “对方只收下东西，没有让进门，也没有提那笔钱。”_

- **1939.02** `p9-social-tenement-neighbors.stove-and-line/stove-and-line.sheet-quarrel` tags: housing, neighbors, tenement, daily, money, reputation
  Emil发现自己搭在栏杆上的床单被人挪到了绳尾，角上沾了煤灰，一时火起，在楼梯间拦住Maria Stein问是谁动的。Maria Stein说是Hedwig嫌滴水，两人越说越响，最后各自回屋摔上门，炉子空着，谁也没再去烧水。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-72_

- **1939.04** `r1-hc.funeral::ctx-vienna-authoritarian-1934::milieu-tenement::funeral-war-mass-grave/funeral-war-mass-grave` tags: death, funeral, grief, debt, institution, vienna, urban, crisis
  Maria Stein说阵亡的人合葬在城外，家里可以领一块木牌。Emil把木牌抱回家，钉在床头；Elisabeth Huber 2来看了，说名字刻得浅，过两年就看不见了。
  _effects: cash -4 (棺材铺的尺寸量错了); mood -0.030000000000000027; condition; flag +war_dead_buried_in_a_mass_grave; role; relation acquaintance with person-materialized-world-vienna-1912-72; relation acquaintance with person-materialized-world-vienna-1912-106; knowledge “the name on the wooden marker is cut shallow”_

- **1939.04** `state_reaction:ad20-private-bargain/a-debt-returns` tags: ad20-private-bargain, private, bargain, favor, debt, trust, leverage, exit
  新的债没有走正式渠道，而是被带进了同一间厨房。Emil在桌边听完数目，发现对方连还款日期都替自己算好了。
  _effects: state_parameter ad20-private-bargain.debt 53 -> 59; state_parameter ad20-private-bargain.leverage 71 -> 75_
  _causes: evt:world-vienna-1912:008163_

- **1939.06** `ad20-train-journey::ctx-vienna-authoritarian-1934::milieu-tenement/the-compartment-sleeps` tags: travel, train, stranger, everyday, public, newcomer, vienna, urban
  车厢里暖得发困，Rosa Lechner把窗户推开一条缝，又把带来的面包掰成两半。Emil接过一半，发现里面夹着一片薄薄的香肠。两个人没有交换姓名，到站时各走各的，Emil却记住了那片香肠的味道。
  _effects: mood 0.020000000000000018; food; flag +quiet_train; relation acquaintance with person-rosa-lechner_

- **1940.01** `vienna-family-courtship/wait-for-a-better-year` tags: family, courtship, household, social, lifecycle
  Emil把话咽回去，只说等明年工钱稳一点再谈。Anna Moser 3没有追问，两人把桌上的面包分完，各自去上工；出门时Emil回头看了一眼，Anna Moser 3正把掉在桌上的面包屑拢进掌心，谁也没有把那个话头重新拾起来。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-100; relation acquaintance with person-materialized-world-vienna-1912-100_

- **1940.01** `hs18-blackout.bakery::ctx-vienna-authoritarian-1934::milieu-tenement/sell-matches` tags: blackout, queue, bread, rumor, neighbor, shortage, vienna, urban
  Emil在门口卖火柴，一盒顶平时三盒的价。买的人不少，有人划亮一根照路，又舍不得扔掉。Elisabeth Weiss 2从柜台后喊“别在店里点火”；Emil把剩下的火柴塞进包里，觉得这钱赚得比面包还快。
  _effects: cash 3 (sold matches at blackout prices); state_parameter hs18-blackout-rumor.panic 67 -> 75; reputation -0.01999999999999999; flag +sold_matches_during_blackout; mood 0.010000000000000009; relation acquaintance with person-materialized-world-vienna-1912-77_

- **1940.01** `state_tick:ad20-private-bargain/the-favor-ages/kept` tags: ad20-private-bargain, private, bargain, favor, debt, trust, leverage, exit
  那笔私下的安排又过了一年。没有人提起，但Emil在街上遇见对方时，两个人都多停了一拍。Emil知道，沉默本身也是利息。
  _effects: state_parameter ad20-private-bargain.trust 23 -> 27; state_parameter ad20-private-bargain.debt 63 -> 61; state_parameter ad20-private-bargain.exit 20 -> 22; mood 0.010000000000000009_

- **1940.01** `state_tick:wish-love/love-pressure/put-away` tags: wish-love, wish, wish:love, love, family, intimacy, state, state_tick
  Emil暂时把那件事收进抽屉；日子还有别的东西要应付。
  _effects: mood -0.020000000000000018_

- **1940.01** `r13-fam.reconcile-sibling::ctx-vienna-authoritarian-1934::milieu-tenement/sibling-reconciled` tags: task, family, sibling, estrangement, reconciliation, station, vienna, urban
  Emil在车站长椅上认出Berta Bauer，对方正把车票捏在手里。两人隔着一个人的空位坐下，先说了几句天气，Emil才问那年为什么没有来送葬。Berta Bauer说车票买了，站台上又折回去；说到一半，两个人都看着铁轨，谁也没有再追问。
  _effects: flag +reconciled_with_estranged_sibling; role; relation kin with person:evt:world-vienna-1912:000322:child; knowledge “the sibling bought a ticket to the funeral but turned back”_

- **1940.10** `vienna-housing-move.rent-notice/rent-notice-neighbors-together` tags: housing, home, rent, family, money
  Emil把Maria Winter和楼里另两户人家叫到楼道，把那张纸摆在窗台上传看。看门人在楼梯拐角听着，说房东礼拜三来收钱。几家人合计好，到那天一起等在门厅，先把克朗递过去，再把修补的事一件件摆出来。Emil把纸折进围裙口袋，觉得人凑齐了话也硬气些。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-50; mood 0.040000000000000036; flag +tenant_collective_

- **1940.10** `vienna-parish-aid.funeral-society/funeral-society.pay` tags: faith, parish, mutual_aid, poverty, family
  Emil数出八赫勒交给Ferdinand Moser，看她在蓝皮本上找到自家门牌，把这一周的格子划掉。Ferdinand Moser说上个月隔壁巷子的人走了，公账出了棺材和一场小弥撒，剩下的钱记在册尾。楼梯口的灯很暗，Emil盯着自己的名字看了两遍才转身。
  _effects: cash -0.4 (一周丧葬互助会会费); relation acquaintance with person-materialized-world-vienna-1912-54; flag +funeral_society_member_

- **1941.01** `r14-edu.sibling-favour::ctx-vienna-authoritarian-1934::milieu-tenement/sibling-refused-help` tags: education, tutored_sibling, family, reunion, vienna, urban, crisis, war
  Emil开口借钱读夜校，Berta Bauer坐在新买的沙发上，说家里也有难处，孩子要上学。Emil看见茶几上放着一盒没拆的进口糖，没有提。临走时，Berta Bauer送到门口，说以后少来往，省得两边都为难。
  _effects: mood -0.040000000000000036; flag +sibling_refused_help; relation rival with person:evt:world-vienna-1912:000322:child_
  _causes: evt:world-vienna-1912:005932_

- **1941.01** `vienna-family-courtship/wait-for-a-better-year` tags: family, courtship, household, social, lifecycle
  Emil把话咽回去，只说等明年工钱稳一点再谈。Maria Winter没有追问，两人把桌上的面包分完，各自去上工；出门时Emil回头看了一眼，Maria Winter正把掉在桌上的面包屑拢进掌心，谁也没有把那个话头重新拾起来。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-50_

- **1941.01** `state_expire:ad20-private-bargain` tags: ad20-private-bargain, private, bargain, favor, debt, trust, leverage, exit
  Emil的「私下的账」到期；相关安排结束。
  _effects: state_remove ad20-private-bargain state:world-vienna-1912:411; flag -private_bargain_active_

- **1941.01** `r13-fam.visit-grave::ctx-vienna-authoritarian-1934::milieu-tenement/wrong-grave` tags: task, family, grave, mourning, neighbor, grief, vienna, urban
  两人在坟场里绕了半个钟头，才找到那块刻着名字的石头。Katharina Bauer忽然说不是这一块，自己记得旁边有一棵小槐树。Emil陪她一排排找，天快黑时，守墓人过来说小槐树去年就砍了；Katharina Bauer站在空地上，把花放在了脚边。
  _effects: mood -0.06000000000000005; condition; flag +could_not_find_the_grave; relation friend with person-katharina-bauer; knowledge “the old tree by the grave was cut down last year”_

- **1941.02** `vienna-parish-aid.soup-kitchen/soup-kitchen.take-and-carry` tags: faith, parish, mutual_aid, poverty, family
  汤是豆子熬的，表面浮着几粒油星，气味把整条巷子都占了。Hermann Berg排在前面，回头替Emil看着位置，嘴里数着还剩几个人。铁罐递过去时烫手，Emil用围裙角垫着。
  _effects: food; relation acquaintance with person:evt:world-vienna-1912:001486:child; mood 0.030000000000000027_

- **1941.07** `p9-gap-adult-solitude.misdelivered-letter/misdelivered-letter.upstairs` tags: adulthood, daily, solitude, ordinary, home, letter
  Emil拿着信上了四层楼，敲了两户都不是，门牌是七号还是十七号已看不清。第三户的老太太说那人去年就搬去法沃里滕了。她把信交回门房，门房在登记簿上写下一个赫勒的墨水钱。
  _effects: mood 0.030000000000000027; reputation 0.01999999999999999_

- **1941.12** `vienna-market-household.friday-fish/friday-fish.share` tags: home, market, food, social
  鱼还滴着水，Emil在走廊里分成两份。一份拿进自家，一份搁在Ferdinand Winter 2的门口。傍晚Ferdinand Winter 2来还盘子，盘子里是一小袋面粉。
  _effects: cash -6 (买鱼); food; relation acquaintance with person-materialized-world-vienna-1912-6; relation acquaintance with person-materialized-world-vienna-1912-6_

- **1942.01** `vienna-medical-treatment.toothache/dentist-pull` tags: health, medical, family, money
  诊室在二楼，楼梯间飘着石炭酸味。医生把钳子举到灯下看了看，叫Emil攥紧扶手。Katharina Bauer站在门边数墙上的价目表：拔牙两克朗五十赫勒，药棉五十赫勒，连消炎水另算。
  _effects: cash -3 (牙医拔牙费用); health 0.05999999999999999 (拔除病牙解除疼痛)_

- **1942.01** `r13-civ.clinic-first-visit::ctx-vienna-authoritarian-1934::milieu-tenement/stamp-on-credit` tags: health, clinic, queue, diagnosis, institution, vienna, urban, crisis
  Josef Weiss 2把挂号纸推回来，说没有疾病保险的印花就不能看门诊。Emil数出几枚硬币，手在柜台上停住，后面的人绕过他往前挤，把窗口堵得更紧。Josef Weiss 2最后把印花本翻到最后一页，说先记在账上，月底一起收。
  _effects: cash -2 (诊所走廊的第三张长凳); flag +clinic_fee_recorded_as_debt; relation acquaintance with person-materialized-world-vienna-1912-115; knowledge “the outpatient fee can be recorded against next month’s wage”; relation acquaintance with person-materialized-world-vienna-1912-115_

- **1942.02** `p9-gap-adult-unemployed.dock-morning/dock-watched-tools` tags: adulthood, unemployment, casual_labour, poverty, daily, dock
  工头第二次出来时眼皮都没抬。Ferdinand Winter 2把工具往Emil脚边一放，说去去就回，回来时用围裙兜着面包，汤罐用旧布裹着，两人在墙根分着吃完。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-6; relation acquaintance with person-materialized-world-vienna-1912-91_

- **1942.04** `r15-ordinary.quiet-year::ctx-vienna-authoritarian-1934::milieu-tenement/neighborhood-help` tags: ordinary, daily, family, leisure, peace, vienna, urban, crisis
  隔壁家的男人病了一个月，Emil每天替他们提水。没有人提报酬。后来那家人搬走时，把一把钥匙留给Emil，说以后路过可以进来坐。
  _effects: mood 0.020000000000000018; flag +neighborhood_help_

- **1942.05** `vienna-tenement-neighbors.laundry_line_dispute/neighbor_yanks_clothes` tags: home, social, family, housing
  Anton Weiss嫌Emil的床单滴水滴到Anton Weiss家衬衫上，一把扯下床单扔在院子的石板上。Emil下楼捡起来时，床单角沾了泥，重洗又要费肥皂。两人在院子当中对喊，楼上有人推开窗看热闹。Emil把床单重新搭上绳子时，故意把水拧在Anton Weiss那侧。
  _effects: relation rival with person-materialized-world-vienna-1912-4; cash -0.15 (重洗床单的肥皂钱); relation acquaintance with person-materialized-world-vienna-1912-4_

- **1943.01** `hs18-occupation.piano::ctx-vienna-authoritarian-1934::milieu-tenement/sign-the-receipt` tags: occupation, piano, requisition, witness, neighbor, history, vienna, urban
  两名工人把Franz Moser 2家的钢琴抬上卡车，琴腿在门框上磕掉一块漆。Rosa Lechner把一张纸塞给Emil，说只要签“屋内无人认领”，就不必再搬第二趟。Emil签了名，看见Franz Moser 2站在对面窗帘后，手一直按在玻璃上。
  _effects: state_add hs18-street-witness state:world-vienna-1912:681; relation acquaintance with person-materialized-world-vienna-1912-116; knowledge “签字比争辩更快，也比争辩更难忘。”; flag +signed_abandoned_piano_receipt; mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-116_

- **1943.01** `p9-social-daily-culture.cafe-newspaper/p9-social-daily-culture.cafe-newspaper.read-all` tags: daily, culture, leisure, cafe, music, walk, task, task:daily
  Emil把木架上的《新自由报》从头版读到讣告栏，中间续了两次水，第三杯 Melange 端上来时奶泡已经塌了，三杯一共六十赫勒。侍者把找零的铜板拍在桌上，没有催的意思；Emil折好报纸夹回木架，记住了议会辩论里的两个名字，出门时雨还没停。
  _effects: cash -0.6 (三杯 Melange 的咖啡钱); mood 0.050000000000000044; skill_

- **1943.05** `vienna-social-movement.recruitment/read-and-decline` tags: development, social_movement, organization, politics
  Emil把传单读了两遍，记下上面的地址，却没有去。第二天照常上工；午休时听见两个工友低声谈论同一场集会。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-35_

- **1943.08** `bc18-inherit.forty-seven-franz::ctx-vienna-authoritarian-1934::milieu-tenement/bury-the-stranger` tags: inheritance, mistaken_identity, debt, funeral, work, absurd, family, vienna
  遗嘱里还附了一笔丧葬费，条件是要有“家属”到场。死者没有亲人，Emil只好穿黑衣站在墓旁，听牧师念一个从未听过的名字。雨把花圈上的纸花打湿，泥水漫过鞋面；葬礼结束后，Rosa Lechner把九克朗交给他，说账已结清。Emil回家脱鞋，发现袜子上沾着别人的土。
  _effects: cash 7 (以家属身份到场后的遗产余款); reputation 0.03; relation acquaintance with person-rosa-lechner; condition; flag +buried_a_stranger_for_the_estate_

- **1943.11** `vienna-illness-household.mother-falls/hire-care` tags: health, family, home
  Emil托人请了巷尾的看护妇，每天来两回给Katharina Bauer擦洗换药，六克朗花得清清楚楚。看护费不便宜，Emil晚上多接了一份缝补的活，手指被针扎了几回；Katharina Bauer的腿伤有人料理，Emil却连着几夜睡不够。
  _effects: cash -6 (支付看护妇费用); health 0.08 (看护妇料理后伤势好转)_

- **1944.01** `hist15-occ.requisition-notice::ctx-vienna-authoritarian-1934::milieu-tenement/name-the-neighbor` tags: occupation, requisition, shortage, institution, history, family, vienna, urban
  Emil告诉Alois Hofer，Maria Winter家的地窖里还有两桶猪油。征用队下午就去了那户人家。Emil拿到一小袋盐和一张优先配给卡，回家时没有走平时那条街。
  _effects: cash 1 (检举邻居得到的配给奖励); reputation 0.01999999999999999; relation acquaintance with person-materialized-world-vienna-1912-50; flag +denounced_neighbor_for_grain_

- **1944.01** `lc17-care.offers-to-care::ctx-vienna-authoritarian-1934::milieu-tenement/moves-the-bed-in` tags: care, family, aging, health, household, duty, vienna, urban
  Katharina Bauer在楼梯口喘了两次才上到三楼。Emil没有开会，也没有和谁商量，晚上就把折叠床搬进走廊尽头的小房间，把闹钟拨到凌晨两点。第二天，Emil在药盒上贴了第一张写着时间的纸。
  _effects: state_add lc17-caregiver state:world-vienna-1912:722; relation kin with person-katharina-bauer; mood 0.020000000000000018; flag +moved_parent_into_the_flat_

- **1944.01** `state_tick:hs18-street-witness/memory-drift/holds` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Emil又把那天的顺序在脑子里走了一遍：先是门响，再是靴子，最后才是那声喊。细节还在，只是每讲一次，旁边就多出一点别人替你补上的颜色。
  _effects: state_parameter hs18-street-witness.certainty 85 -> 87_

- **1944.01** `state_tick:wish-love/love-pressure/press-on` tags: wish-love, wish, wish:love, love, family, intimacy, state, state_tick
  Emil又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.020000000000000018_

- **1944.01** `p9-social-relationship-initiative.apology-at-bakery/settle-the-account` tags: courtship, friendship, family, social, initiative, housing, task, task:social
  七点刚过，Anna Weiss照例来买一只 Semmel。Emil把紫罗兰和两只 Semmel 放在柜台上，先付了四十赫勒，又把上回算错的账一笔一笔说清：借出去的是八克朗，记成了十克朗，是自己记错了。Anna Weiss听完没马上说话，把零钱数进围裙口袋，最后说中午过来喝碗汤。
  _effects: cash -0.4 (一小束紫罗兰和两只 Semmel); relation friend with person:evt:world-vienna-1912:000477:child; mood 0.07999999999999996; relation acquaintance with person-materialized-world-vienna-1912-47_

- **1944.02** `p9-social-family-conflict-care.christmas-soup/serve-first-talk-later` tags: family, care, siblings, inheritance, housing, money
  Emil先给Hermann Bauer盛了满满一碗，扁豆和面团结结实实压在勺底，那块熏肉切开分了两份，锅里的吃食折合两克朗。药费的事一句没提，只问要不要再添点汤。Hermann Bauer吃到一半才开口，说上次说话太冲；桌边多摆的那把椅子，最后有人坐下了。
  _effects: food; relation kin with person:evt:world-vienna-1912:000324:child; mood 0.050000000000000044_

- **1944.04** `vienna-legacy-worklife.sick-fund/sick-fund.keep-quiet` tags: legacy, work, family, reform, ordinary_life
  止咳药水是褐色的，瓶口塞着软木塞，摇一摇会起沫。Emil看着工友把表折成小块，折了三折才塞进帽檐。墙上的规章还贴在那里，纸角被风掀起，没人去按。
  _effects: mood -0.050000000000000044; relation colleague with person-materialized-world-vienna-1912-51_

- **1944.08** `state_reaction:wish-love/love-betrayal` tags: wish-love, wish, wish:love, love, family, intimacy, state, state_reaction
  Emil反复回想最后一次见面。对方说过的话被拆成很多小块，每一块都能扎人。
  _effects: mood -0.06000000000000005_
  _causes: evt:world-vienna-1912:011189_

- **1945.01** `vienna-life-1945-liberation/displaced` tags: war, liberation, 1945, migration
  炮火把Emil住的那条街烧掉一半。Emil跟着人群走到城外，在临时收容所登记，床位上铺的是发霉的稻草。
  _effects: move place-klosterneuburg-aunt-house; role; cash -5 (temporary shelter)_

- **1945.01** `state_tick:hs18-street-witness/memory-drift/blurs` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Emil忽然想不起那个人先迈的是左脚还是右脚。邻居说自己记得清清楚楚，还补了一个细节；Emil听着，竟分不清那是自己看见的，还是后来听来的。
  _effects: state_parameter hs18-street-witness.certainty 87 -> 79; mood -0.020000000000000018_

- **1945.01** `state_tick:lc17-caregiver/care-year/worn-thin` tags: lc17-caregiver, care, family, illness, elder, duty, household, state
  Katharina Bauer今年摔了两次，第二次把胯骨摔裂了。Emil在医院走廊的硬椅上睡了四夜，回家以后发现厂里已经把位置给了别人；药费单、住院单和一张停工的证明一起压在桌玻璃下面，边角每天都被翻卷一点。
  _effects: state_parameter lc17-caregiver.burden 30 -> 38; state_parameter lc17-caregiver.resentment 10 -> 16; health -0.039999999999999994 (four nights on a hospital chair); cash -2 (medicine and hospital fees); mood -0.040000000000000036_

- **1945.01** `p10-family-tasks.appeal-inheritance/appeal-inheritance.half` tags: adulthood, family, social, marriage, care, inheritance, task, appeal
  二楼办事处里很冷，职员把信纸对着窗光照了照，说笔迹没错。四十二克朗用纸包好。兄弟在走廊里把纸包接过去，数了一遍，说以后各过各的。Emil把父亲的信收进证件夹。
  _effects: cash 42 (分得父亲存款的一半); relation_end kin with person-anna-bauer; mood 0.040000000000000036_

- **1945.03** `vienna-medical-treatment.sanatorium/sanatorium-go` tags: health, medical, family, money
  安娜把钥匙拴在门后的钉子上，又反过来压了压窗栓。车票是硬纸的，打孔时咔嗒一声。Emil在车厢里把诊断书摊在膝盖上，窗外最后几排厂房退远了，松树的味道从窗缝钻进来。
  _effects: cash -12 (疗养院车票和住宿押金); health 0.12000000000000001 (疗养院松林空气和正规休养); relation friend with person-materialized-world-vienna-1912-94; relation acquaintance with person-materialized-world-vienna-1912-94_

- **1945.09** `vienna-life-wwii-homefront/shelter` tags: war, homefront, shortage, injury
  警报响时Emil躲进地下室，和十几户人挤在长凳上。头顶传来闷响，灰尘从梁上落下。警报解除后，街上多了一堆碎瓦。
  _effects: health -0.020000000000000004 (shelter conditions); relation acquaintance with person-materialized-world-vienna-1912-55_

- **1946.01** `vienna-life-injury-recovery/clinic-treatment` tags: health, work, family
  Emil在受伤后的第三天去了诊所。医生清洗伤口、换药，收下诊费，嘱咐不要急着回机器旁。Emil把药方折好，回家路上买了纱布。
  _effects: health 0.05 (wound treatment); cash -8 (clinic and bandages); condition_
  _causes: evt:world-vienna-1912:011712_

- **1946.01** `state_tick:hs18-street-witness/memory-drift/holds` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Emil又把那天的顺序在脑子里走了一遍：先是门响，再是靴子，最后才是那声喊。细节还在，只是每讲一次，旁边就多出一点别人替你补上的颜色。
  _effects: state_parameter hs18-street-witness.certainty 79 -> 81_

- **1946.01** `state_tick:lc17-caregiver/care-year/carried` tags: lc17-caregiver, care, family, illness, elder, duty, household, state
  Emil又撑过一年。药盒按星期分好，账本上多了一栏“看护”，工钱少了一些，但还没有断；Katharina Bauer今年记得住Emil的名字，偶尔也记得住昨天吃了什么。
  _effects: state_parameter lc17-caregiver.burden 38 -> 34; state_parameter lc17-caregiver.resentment 16 -> 14; health -0.010000000000000009 (a year of broken nights); mood 0.010000000000000009_

- **1946.01** `kernel-social.reconciliation::ctx-vienna-postwar-1945::milieu-tenement/reconciliation.cold-peace` tags: task, task:social, social, reconciliation, family, apology, conflict, vienna
  Hermann Bauer收下了锅，却没有让Emil进门，说东西留下，人先回去。Emil在门口站了一会儿，把锅盖掀开又盖上；第二天，空锅被放在门槛上，里面压着一张写着“收到了”的纸条。
  _effects: relation kin with person:evt:world-vienna-1912:000324:child; knowledge “对方只收下东西，没有让进门，也没有提那笔钱。”_

- **1946.02** `vienna-medical-treatment.night-fever/hospital-night` tags: health, medical, family, money
  电车在环城大道上哐当响，Alois Bauer攥着Emil的胳膊，怕人从座位上滑下去。急诊厅的煤气灯发黄，长椅上全是咳嗽声，押金窗口的铜盘递出两克朗，换来一张硬纸号牌。
  _effects: cash -2 (医院急诊押金); health 0.08000000000000002 (急诊观察和冰敷退烧); relation friend with person-materialized-world-vienna-1912-73; relation acquaintance with person-materialized-world-vienna-1912-73_

- **1946.10** `vienna-housing-move.flat-viewing/flat-viewing-too-damp` tags: housing, home, rent, family, money
  Emil在单间里站了一刻钟，脚底发潮，墙纸底下透出一股霉味。看门人说刷一层石灰就好，Rosa Lechner却在门口轻轻咳了一声，提醒这背面没有阳光。Emil把定金收回口袋，谢过看门人，宁可多付三克朗，也不愿把湿气带进夜里。
  _effects: mood -0.020000000000000018; relation acquaintance with person-rosa-lechner; flag +still_looking_for_room_

- **1947.01** `state_reaction:hs18-street-witness/retold-in-public` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Emil在报上或会上听见自己的话被转述。句子大致没错，只是“我看见”被改成了“大家都看见”；回家的路上，有陌生人朝Emil点头。
  _effects: state_parameter hs18-street-witness.retellings 0 -> 2; state_parameter hs18-street-witness.certainty 81 -> 83; reputation 0.020000000000000018_
  _causes: evt:world-vienna-1912:012861_

- **1947.01** `hs18-witness.reporter::ctx-vienna-postwar-1945::milieu-tenement/sell-the-account` tags: witness, reporter, memory, money, risk, history, vienna, urban
  Friedrich Kral把几张钞票压在咖啡杯底下，说只要一段能上版的细节。Emil讲了钢琴、门洞和那件湿外套；对方记得很快，临走前问能不能用真名。Emil说用化名，记者笑了一下，说化名也得像真的。
  _effects: cash 4 (sold a witness account to a reporter); state_parameter hs18-street-witness.retellings 2 -> 4; state_parameter hs18-street-witness.danger 45 -> 60; state_parameter hs18-street-witness.certainty 83 -> 86; reputation 0.020000000000000018; flag +sold_witness_account_

- **1947.01** `state_tick:hs18-street-witness/memory-drift/holds` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Emil又把那天的顺序在脑子里走了一遍：先是门响，再是靴子，最后才是那声喊。细节还在，只是每讲一次，旁边就多出一点别人替你补上的颜色。
  _effects: state_parameter hs18-street-witness.certainty 86 -> 88_

- **1947.01** `state_tick:lc17-caregiver/care-year/carried` tags: lc17-caregiver, care, family, illness, elder, duty, household, state
  Emil又撑过一年。药盒按星期分好，账本上多了一栏“看护”，工钱少了一些，但还没有断；Katharina Bauer今年记得住Emil的名字，偶尔也记得住昨天吃了什么。
  _effects: state_parameter lc17-caregiver.burden 34 -> 30; state_parameter lc17-caregiver.resentment 14 -> 12; mood 0.010000000000000009_

- **1947.01** `r13-civ.public-health-campaign::ctx-vienna-postwar-1945::milieu-tenement/posters-pasted` tags: health, public_health, campaign, poster, institution, vienna, urban, postwar
  市立太平间的办事员把一叠防疫告示交给Emil，说浆糊要刷匀，别让风揭了角。Emil沿着市场街贴到天黑，手指被纸边割出细口。第二天，告示下面多了一行铅笔字：“水要煮开”。
  _effects: reputation 0.06; flag +pasted_public_health_notices; role; skill; knowledge “the notice was answered with a handwritten instruction to bo”_

- **1947.05** `vienna-historical-social-movement.district-list/hold-list-and-watch` tags: history, historical_process, social_movement, organization, politics
  Luise Weiss把会费账本推回去，说外头那个组织答应给煤，只要名单。Emil把账本合上，用一块旧布包好塞进缝纫机底下，说先看看谁在往外递话。两人都没再提这事。
  _effects: relation acquaintance with person:evt:world-vienna-1912:003533:child; mood -0.029999999999999916; flag +kept_district_list_private_

- **1947.07** `ad20-newspaper-interview::ctx-vienna-postwar-1945::milieu-tenement/story-prints-wrong` tags: media, interview, newspaper, everyday, public, reputation, vienna, urban
  Josef Huber 2把Emil的话记成了另一层意思。报纸出来时，标题写着“她说她从不后悔”；Emil记得自己说的是“后悔也没有用”。Emil把报纸折起来，又打开，最后还是把它塞进了炉子。
  _effects: reputation -0.02999999999999997; mood -0.040000000000000036; flag +interview_misquoted; knowledge “报纸把“后悔也没有用”写成了“从不后悔”。”_

- **1947.12** `vienna-legacy-worklife.union-office/union-office.post-ledger` tags: legacy, work, family, reform, ordinary_life
  窗外是维也纳第十五区的一条窄街，卖烤栗子的炉子冒着白烟。Emil贴完纸退后两步看，发现“欠”字被浆糊洇开了一点。老成员没说话，只把眼镜摘下来擦了又擦。
  _effects: reputation 0.04999999999999999; relation acquaintance with person:evt:world-vienna-1912:002533:child; flag +union_ledger_public; relation acquaintance with person-materialized-world-vienna-1912-134_

- **1948.01** `vienna-family-same-sex-male/private-arrangement` tags: family, intimacy, same_sex, persecution, lifecycle, partnership
  Emil和Friedrich Weiss在城边租了一间小屋，对外只说是同事合住。房租四克朗，两人不同时出门，信件用假名，夜里把窗帘拉严；Friedrich Weiss在门后放了一根木棍，Emil把两人的工票分开放，连咳嗽都压着声。
  _effects: relation partner with person:evt:world-vienna-1912:001686:child; mood 0.040000000000000036; cash -4 (separate room rent)_

- **1948.01** `af17-wish.family-inheritance::ctx-vienna-postwar-1945::milieu-tenement/the-will-was-a-joke` tags: wish, love, family, inheritance, shop, debt, irony, vienna
  公证人念到最后一段，停了一下：死者把烟铺留给了“那个总在门口躲雨的年轻人”，落款处画着一只猫。铺子其实早就抵押出去，剩下的只有一只木腿、一本手写配方和两位没有血缘的老小姐。Emil帮她们把煤搬上楼，没有答应什么；Helene Bauer却把配方塞进Emil的口袋，说冬天用得着。
  _effects: cash -1 (帮两位老小姐买煤); relation acquaintance with person-materialized-world-vienna-1912-45; skill; condition; flag +kept_the_recipe; mood 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-59_

- **1948.01** `state_expire:hs18-street-witness` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Emil的「街面上的目击者」到期；相关安排结束。
  _effects: state_remove hs18-street-witness state:world-vienna-1912:681_

- **1948.01** `state_tick:lc17-caregiver/care-year/worn-thin` tags: lc17-caregiver, care, family, illness, elder, duty, household, state
  Katharina Bauer今年摔了两次，第二次把胯骨摔裂了。Emil在医院走廊的硬椅上睡了四夜，回家以后发现厂里已经把位置给了别人；药费单、住院单和一张停工的证明一起压在桌玻璃下面，边角每天都被翻卷一点。
  _effects: state_parameter lc17-caregiver.burden 30 -> 38; state_parameter lc17-caregiver.resentment 12 -> 18; cash -2 (medicine and hospital fees); mood -0.010000000000000009_

- **1948.01** `state_tick:wish-love/love-pressure/press-on` tags: wish-love, wish, wish:love, love, family, intimacy, state, state_tick
  Emil又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.020000000000000018_

- **1948.01** `p9-social-daily-culture.sunday-hill/p9-social-daily-culture.sunday-hill.first-winery` tags: daily, culture, leisure, cafe, music, walk, task, task:daily
  Emil和Hermann Bauer在第一个酒棚就坐下了，要了一壶新酒，Josef Moser 2摸出一副磨损的纸牌。三人打到下午，太阳偏西也没再往上爬；Emil输了几个铜板，连酒带牌局一共一克朗五十赫勒，倒赢回一肚子笑话。回程的电车上，Emil靠着窗，酒意上来，差点坐过站。
  _effects: cash -1.5 (酒棚的新酒和牌局输的铜板); relation friend with person:evt:world-vienna-1912:000324:child; relation acquaintance with person-materialized-world-vienna-1912-81; mood 0.040000000000000036_

- **1948.03** `p9-social-family-conflict-care.sick-parent-night/hospital-deposit` tags: family, care, siblings, inheritance, housing, money
  Emil跑了一趟医院，把Katharina Bauer送进病房：押金三克朗，搪瓷杯和旧毛巾一克朗二十赫勒，头三天的药费三克朗八十赫勒，一共八克朗。护士收走便盆，换上带刻度的玻璃壶。Emil回到空了的床边，把塌下去的椅子扶正，才发现自己一整天只喝了一杯咖啡。
  _effects: cash -8 (住院押金和住院用品); health 0.05999999999999999 (父亲住进医院得到治疗); mood -0.06000000000000005; flag +parent_hospitalized_

- **1949.01** `r3-war.mia-ledger::ctx-vienna-postwar-1945::milieu-tenement::postwar-mia-clarification/found-unidentified-burial-record` tags: war, missing, bureaucracy, family, grief, vienna, urban, postwar
  战后清理档案，Hermann Berg找到一张模糊的埋葬记录，上面写着“无名，步兵，1916年7月”。Emil问是不是自己的兄弟，Hermann Berg说不能确定；Anna Berg 2建议去公墓看编号。那天下午，Emil在编号前站到关门。
  _effects: mood -0.010000000000000009; flag +found_unidentified_burial_record; role; knowledge “an unknown infantryman was buried in July 1916”; relation acquaintance with person-materialized-world-vienna-1912-101_

- **1949.01** `state_expire:lc17-caregiver` tags: lc17-caregiver, care, family, illness, elder, duty, household, state
  Emil的「照料一个衰弱的亲人」到期；相关安排结束。
  _effects: state_remove lc17-caregiver state:world-vienna-1912:722_

- **1949.05** `statistical_infection`
  Emil在Leopoldstädter Zinshaus, gemeinsamer Gang病倒了，肺炎让身体发热、虚弱，接下来的日子只能卧床。

- **1949.06** `statistical_illness_worsened`
  Emil的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1949.08** `r2-faith.saints-day-procession::ctx-vienna-postwar-1945::milieu-tenement::r2-faith.saints-day-procession-reform/prayer-in-the-barn` tags: faith, saints_day, procession, storm, official, vienna, urban, postwar
  Ferdinand Weiss 2不许圣像离开教堂，Emil就把邻人请到自家谷仓，在压葡萄的木桶上摆了一盏灯。二十几个人挤在干草里念经，Alois Hofer站在门口没有进来，只把一篮苹果放在门槛上。
  _effects: condition; flag +held_saints_prayer_in_barn; role; relation rival with person-materialized-world-vienna-1912-71; relation friend with person-materialized-world-vienna-1912-41_

- **1949.09** `vienna-parish-aid.soup-kitchen/soup-kitchen.help-wash` tags: faith, parish, mutual_aid, poverty, family
  Emil喝完汤没走，留下来帮修女把大锅刷净，又把木碗按大小摞好。厨房后头有半块面包和一碗剩汤，修女说是帮忙人的午饭。Luise Berg在门口等着一起回去，说下回还来，洗锅的活总有人要干。
  _effects: food; skill; relation acquaintance with person:evt:world-vienna-1912:001742:child; mood 0.020000000000000018_

- **1949.09** `statistical_illness_worsened`
  Emil的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1949.11** `statistical_recovery`
  Emil熬过了这场肺炎，能坐起来喝一点汤，但身体还很虚。

- **1949.12** `vienna-adult-social.sunday-table/sunday-table.argument` tags: adulthood, social, work, family, partnership
  星期天中午，Emil和Friedrich Weiss在出租屋的厨房桌边分面包，话题从房租转到Emil母亲上个月的药钱。Friedrich Weiss把刀放下，说这个家不能总先填那边的窟窿。面包凉了，汤也没再热。
  _effects: relation partner with person:evt:world-vienna-1912:001686:child; mood -0.050000000000000044_

- **1950.01** `vienna-postwar-housing-1950s/stay-with-relatives` tags: adulthood, postwar, housing, family
  分房名单又往后推了一年，Emil一家搬进亲戚家的厨房隔间。Lena送来一块旧帘子当隔断；夜里有人起身，全屋都听得见。
  _effects: cash -3 (shared household costs); condition; mood -0.020000000000000018; relation acquaintance with person-phase15-Lena-world-vienna-1912_

- **1950.01** `r13-fam.apologize::ctx-vienna-postwar-1945::milieu-tenement/apology-rejected` tags: task, social, apology, reputation, conflict, vienna, urban, postwar
  Emil把带来的半块肥皂放在窗台上，说知道不够。Ferdinand Winter 2没有碰肥皂，只说那天在场的人都记得Emil笑的样子。Emil站到腿发麻，最后把肥皂收回口袋，转身时听见窗子从里面关上了。
  _effects: mood -0.09999999999999998; flag +apology_rejected; relation rival with person-materialized-world-vienna-1912-6_

- **1950.06** `ad20-former-employer::ctx-vienna-postwar-1945::milieu-tenement/the-door-is-open` tags: work, employer, return, everyday, stigma, public, vienna, urban
  k. u. k. Landwehr-Infanterie, Wiener Ergänzungsbezirk在门口认出Emil，先问家里怎么样，又问这些年在哪。Emil说换了几份工；k. u. k. Landwehr-Infanterie, Wiener Ergänzungsbezirk点点头，说“有空来坐”。两个人都知道这不是一句工作邀请，但谁也没有把话挑明。
  _effects: mood 0.020000000000000018; flag +old_employer_cordial; cash 1 (a small gift from the old employer)_

- **1950.08** `vienna-market-household.friday-fish/friday-fish.buy` tags: home, market, food, social
  鱼摊快收了，Emil挑了一条最小的鳟鱼，摊主顺手抓了把欧芹丢进纸里。黄油在锅里化开，鱼皮卷起来，楼道里都是味。Emil Berg 3敲门时，Emil从鱼尾切下一小块递过去。
  _effects: cash -6 (买鳟鱼和黄油); food; mood 0.07999999999999996; relation acquaintance with person-materialized-world-vienna-1912-78_

- **1950.11** `vienna-tenement-neighbors.laundry_line_dispute/subject_yields_line` tags: home, social, family, housing
  Emil看Ferdinand Weiss盆里那几件小衬衫，把自家床单卷起来抱回屋，说等下午再晾。Ferdinand Weiss愣了一下，闷头把衣服挂好，收工回来时在Emil门口放了一小包用旧报纸裹的洗衣碱。Emil打开报纸，碱面里还掺着几粒粗盐。
  _effects: relation friend with person:evt:world-vienna-1912:000169:child; food_

- **1951.01** `r14-fam.sunday-rota::ctx-vienna-postwar-1945::milieu-tenement/rota-signed` tags: task, family, divorce, co_parenting, custody, vienna, urban, postwar
  两人在厨房桌上把星期几、几点、谁去接孩子一条条写下来。Katharina Hofer写到星期三时停住，说那天要上晚班；Emil把星期三换到星期四，又在旁边画了一个圈。Mitzi Berg在门口听着，最后把那张纸拿过去，用彩笔在周末那格画了一只小船。
  _effects: mood 0.040000000000000036; flag +co_parenting_rota; relation kin with person:evt:world-vienna-1912:009304:child_

- **1951.05** `vienna-housing-move.rent-notice/rent-notice-demand-repair` tags: housing, home, rent, family, money
  楼道里正晾着几家洗过的衣服，Emil和Katharina Hofer 2站在水滴下面说话，声音压得低。Katharina Hofer 2说这栋楼里的住户不是头一回被这样要钱，先凑个口信比一个人硬顶强。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-151; mood 0.030000000000000027; flag +rent_dispute; relation acquaintance with person-materialized-world-vienna-1912-151_

- **1951.09** `vienna-medical-treatment.toothache/barber-pull` tags: health, medical, family, money
  Anna Weiss在门口替Emil捏着帽子，听见里面一声闷哼。弗朗茨把牙扔进搪瓷盘，说瞧这牙根都黑了。收钱时他多要了二十赫勒，算明矾水的钱，说下次别再拖成这样。
  _effects: cash -1.2 (理发师拔牙收费); health 0.03 (病牙被拔除但手法粗糙); mood -0.020000000000000018_

- **1952.01** `state_tick:wish-love/love-pressure/press-on` tags: wish-love, wish, wish:love, love, family, intimacy, state, state_tick
  Emil又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.020000000000000018_

- **1952.01** `p9-social-daily-culture.last-standing-ticket/p9-social-daily-culture.last-standing-ticket.church-organ` tags: daily, culture, leisure, cafe, music, walk, task, task:culture
  Emil数了数前面攒动的人头，把口袋里的硬币又攥紧了些，转身离开队伍。走到街角的教堂时，管风琴正从敞开的门里传出来，Emil在最后一排长凳上坐下，听完整段前奏曲，一个赫勒也没花，只跪得膝盖发酸。出门时与Anna Weiss道了别，约好下回还来排队。
  _effects: mood 0.030000000000000027_

- **1953.01** `vienna-parish-aid.rent-box/rent-box.accept-all` tags: faith, parish, mutual_aid, poverty, family
  煤袋落在台阶上，扬起细细一层黑末。Emil 2用铅笔头在蓝格册上写门牌号，问房东姓什么，又叮嘱别把面包票弄丢。灶上水壶开始叫，Emil才想起屋里连只干净的杯子都没有。
  _effects: cash 6 (互助会补上本月房租差额); food; relation acquaintance with person:evt:world-vienna-1912:001808:child_

- **1953.01** `r13-work.rebuild-after-fire::ctx-vienna-postwar-1945::milieu-tenement/rebuilt-the-front` tags: commerce, fire, rebuilding, shop, debt, vienna, urban, postwar
  Josef Stein把烧黑的房梁锯掉一截，接上新木，接缝处用铁箍包住。Emil在灰堆里翻出没烧透的货，能卖的擦干净摆回架上。卷帘门重新拉开那天，Elisabeth Bauer 2送来一盆炭火，说这条街的铺子不能全黑着；第一批客人买的是盐和蜡烛。
  _effects: cash -18 (烧黑的房梁); reputation 0.06; flag +work13_rebuilt_shop_after_fire; relation colleague with person-materialized-world-vienna-1912-66; employment Kaufmann @ mortuary:person-materialized-world-vienna-1912-23-evt:world-vienna-1912:010323; relation acquaintance with person-materialized-world-vienna-1912-66; relation acquaintance with person-materialized-world-vienna-1912-146_

- **1953.06** `r15-curse.betrayal-at-table::ctx-vienna-postwar-1945::milieu-tenement/took-the-room` tags: betrayal, social, family, trust, secret, vienna, urban, postwar
  Luise Kral趁Emil不在，把租约上的名字改成了自己。Emil回家时，门口多了一只不属于自己的箱子；Luise Kral站在门里，说房东已经同意。
  _effects: mood -0.10000000000000009; relation rival with person-luise-kral; flag +home_taken_by_betrayal; state_add grief state:world-vienna-1912:1115_

- **1953.07** `ad20-landlord-visit::ctx-vienna-postwar-1945::milieu-tenement/rent-raised` tags: housing, rent, landlord, everyday, repair, public, vienna, urban
  Ferdinand Weiss 2看完窗子，说这栋楼的地税涨了，房租也得跟着涨。Emil把租约摊在桌上，指给他看还有半年；Ferdinand Weiss 2说“那就从下半年开始”。他走后，Emil把窗缝用旧报纸塞住，报纸上正好登着新房租的广告。
  _effects: cash -2 (rent increase after the landlord’s visit); flag +rent_raised; knowledge “房东说地税涨了，房租从下半年开始加。”_

- **1953.12** `vienna-adult-social.burial-fund/burial-fund.paid` tags: adulthood, social, work, family
  车间里管互助会的Mitzi Moser在午休时把本子摊在Emil的工具箱上，说这个月还差最后一份月钱。Emil从马甲内袋摸出二十个克罗伊策，Mitzi Moser当着他的面在本子上画了钩。
  _effects: cash -0.3 (缴纳丧葬互助会的月钱); relation colleague with person:evt:world-vienna-1912:006102:child; reputation 0.03999999999999998_

- **1954.01** `ml18-tax.audit-of-the-windfall::ctx-vienna-postwar-1945::milieu-tenement/pay-and-regularize` tags: tax, legal, money, windfall, bureaucracy, comic, vienna, urban
  Anna 2把黑皮本翻到Emil那一页，说邮局储蓄的利息没有报，数目不大，但漏了就是漏了。Friedrich Berg在旁边把计算尺推来推去，最后算出一个八克朗的数目。Emil当天去缴了款，把收据贴在账本最后一页；回家的路上，账本第一次没有在口袋里折着。
  _effects: cash -8 (back taxes and a small fine on the windfall's interest); state_parameter ml18-sudden-fortune.principal 12 -> 4; reputation 0.019999999999999962; relation acquaintance with person:evt:world-vienna-1912:001785:child; flag +taxes_paid; knowledge “邮局储蓄的利息也要报税，漏报的八克朗已经补齐。”; mood 0.020000000000000018_

- **1954.01** `state_expire:grief` tags: grief, death, family, mind, state, state_tick, state:grief
  Emil的「丧亲之痛」到期；相关安排结束。
  _effects: state_remove grief state:world-vienna-1912:1115_

- **1954.11** `vienna-housing-move.rent-notice/rent-notice-pay` tags: housing, home, rent, family, money
  Emil把通知念给Anna Moser 4听，Anna Moser 4摇头说是楼梯间那几块新玻璃的账。Emil去楼下杂货铺换开一张五克朗的纸币，回屋一枚一枚摆开数，煤箱底多留了二十赫勒。
  _effects: cash -2 (按月多付两克朗房租); food; mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-166_

- **1954.12** `ml18-luck.wrong-horse::ctx-vienna-postwar-1945::milieu-printshop/the-wrong-horse-wins` tags: gambling, luck, money, horse_race, absurd, windfall, vienna, urban
  Emil把“蓝多瑙”看成了“蓝星期一”，在柜台前把五克朗押在一匹没人看好的马上。最后一道弯，那匹马从外道切进来，Josef Lechner手里的铅笔停在票面上。赔率是一赔十二；Friedrich Weiss把赢来的钱数了两遍，Emil还在看自己的票，像不相信上面的名字。
  _effects: cash 60 (winnings from the wrong horse at long odds); state_add ml18-sudden-fortune state:world-vienna-1912:1156; reputation 0.030000000000000027; flag +wrong_horse_won; mood 0.08999999999999997; flag -sudden_fortune; flag +sudden_fortune; reputation 0.020000000000000018; mood 0.030000000000000027_

- **1954.12** `vienna-legacy-worklife.apprentice-wage/apprentice-wage.beer-with-senior` tags: legacy, work, family, reform, ordinary_life
  十二赫勒换来两杯淡啤酒，找零是四枚一赫勒的铜币。Emil把铜币收好，听师兄讲那年冬天的事，讲到一半师兄停了停，说“你别到处讲”。酒馆里有人拉手风琴，声音盖过了后半句。
  _effects: cash -1 (请师兄喝一杯啤酒); relation colleague with person-materialized-world-vienna-1912-23; skill_

- **1955.01** `af17-wish.family-inheritance::ctx-vienna-postwar-1945::milieu-printshop/kept-the-shop-and-the-sisters` tags: wish, love, family, inheritance, shop, debt, irony, vienna
  遗嘱把烟铺、楼上的两位老小姐和十四克朗的赊账一起留给Emil。Katharina Hofer第一次见面就叫Emil“侄子”，把钥匙、账本和一只总在柜台下打盹的猫交过来。Emil原本只想要一个家，现在有了一个需要每天清晨六点开门的家；Anna Moser 3在门口抽完一支雪茄，提醒Emil月底先还利息。
  _effects: role; cash -2 (先还一部分烟铺赊账); relation kin with person-materialized-world-vienna-1912-2; relation acquaintance with person-materialized-world-vienna-1912-100; reputation 0.020000000000000018; condition; flag +kept_the_tobacco_shop; mood 0.020000000000000018_

- **1955.01** `r13-fam.help-neighbour::ctx-vienna-postwar-1945::milieu-tenement/carried-the-coal` tags: task, social, neighbor, help, care, vienna, urban, postwar
  Emil看见Anton Winter在楼梯口歇了三回，便把煤筐接过来，一筐一筐抬上三楼。最后一趟，Emil的腰在门框上撞了一下，Anton Winter从柜里摸出一小瓶李子酒，硬倒了一盅。
  _effects: food; flag +carried_neighbour_coal; role; relation friend with person-materialized-world-vienna-1912-41_

- **1955.02** `p9-history-union-political.meeting/meeting-speak-up` tags: politics, union, party, meeting, leaflet, police, strike, reform
  Emil站起来报出自己车间的计件工价：糊一百个纸盒二十八赫勒，比隔壁车间少六个。屋里一下子静了，Luise Weiss把草稿推过来，让书记员把这几个数字写在动议第一行。散会时有人拍了拍Emil的肩膀。
  _effects: reputation 0.040000000000000036; relation colleague with person:evt:world-vienna-1912:003533:child_

- **1955.09** `vienna-church-community.tenement-prayer/rent-prayer-help` tags: faith, social, family, home
  楼梯间只点一根蜡烛。Berta Bauer 2凑过来低声说，楼下老寡妇的喘病又重了，教区明早才能派修女来。Emil把汤碗接过去，碗底还温着。
  _effects: condition; food; relation acquaintance with person-materialized-world-vienna-1912-51_

- **1956.01** `af17-wish.family-inheritance::ctx-vienna-postwar-1945::milieu-factory/kept-the-shop-and-the-sisters` tags: wish, love, family, inheritance, shop, debt, irony, vienna
  遗嘱把烟铺、楼上的两位老小姐和十四克朗的赊账一起留给Emil。Katharina Hofer第一次见面就叫Emil“侄子”，把钥匙、账本和一只总在柜台下打盹的猫交过来。Emil原本只想要一个家，现在有了一个需要每天清晨六点开门的家；Maria Stein在门口抽完一支雪茄，提醒Emil月底先还利息。
  _effects: cash -2 (先还一部分烟铺赊账); relation kin with person-materialized-world-vienna-1912-2; relation acquaintance with person-materialized-world-vienna-1912-72; reputation 0.020000000000000018; mood 0.020000000000000018_

- **1956.01** `state_tick:wish-love/love-pressure/put-away` tags: wish-love, wish, wish:love, love, family, intimacy, state, state_tick
  Emil暂时把那件事收进抽屉；日子还有别的东西要应付。
  _effects: mood -0.020000000000000018_

- **1956.01** `r13-civ.soup-kitchen::ctx-vienna-postwar-1945::milieu-tenement/served-three-hours` tags: social, charity, soup_kitchen, hunger, volunteer, vienna, urban, postwar
  Emil站在汤锅后面，把勺子往碗沿上磕两下，再递给下一只手。队伍从门口拐到巷子里，有人端着碗蹲在墙根吃。收摊时，Berta Hofer把锅底最后一点汤刮给Emil，说今天够了。
  _effects: reputation 0.050000000000000044; flag +volunteered_at_soup_kitchen; relation colleague with person-materialized-world-vienna-1912-112; relation acquaintance with person-materialized-world-vienna-1912-112_

- **1956.02** `p10-work-career.demotion-dismissal/p10-work-career.demotion-dismissal.suspension` tags: adulthood, work, career, wages, injury, pension, employment, demotion
  Emil和Friedrich Berg在办公室门口争了几句，声音大到走廊都听得见。厂里最后把解雇改成停班一个月，期满再看有没有位置。他走出厂门时，门房把铜牌收回去，说下个月带证明再来。
  _effects: unemployment (停班一个月暂时没有工钱); relation colleague with person-materialized-world-vienna-1912-23; flag +suspended_pending_review_

- **1956.05** `p9-social-tenement-neighbors.stove-and-line/stove-and-line.first-come-order` tags: housing, neighbors, tenement, daily, money, reputation
  Emil把四只洗衣盆按到厨房的先后排成一列，用粉笔在门后写下各家的时辰：六点到七点半、七点半到九点。Gustav Moser起初嘟囔，看到自家名字排在第二格，也就把水壶提了回去。晾衣绳按同样次序分两段，谁家的床单先上谁先占。
  _effects: mood 0.040000000000000036; relation acquaintance with person:evt:world-vienna-1912:006597:child; relation acquaintance with person-materialized-world-vienna-1912-105_

- **1956.12** `ml18-luck.strongbox-in-the-wall::ctx-vienna-postwar-1945::milieu-tenement/let-the-mason-keep-it` tags: money, luck, housing, windfall, inflation, ownership, vienna, urban
  Alois Hofer把铁盒递过来时，手没有松开。他说女儿在疗养院，下个月要交一笔钱。Emil看了看那只盒子，又看了看墙上新开的洞，说墙是他敲开的，盒子也该归他。Anton Winter想说什么，最后只说了一句“你们商量好了就行”。
  _effects: reputation 0.040000000000000036; relation friend with person-materialized-world-vienna-1912-15; flag +gave_strongbox_to_mason; mood 0.040000000000000036_

- **1957.01** `p9-social-tenement-neighbors.stairwell-rumor/stairwell-rumor.repeat-at-bakery` tags: housing, neighbors, tenement, daily, money, reputation
  Emil在面包店排队时把听来的话又讲了一遍，添了“夜里常有男人上楼”一句。到傍晚，整栋楼都在说二楼女房客的事，连看门人都在门口站着看。二楼的门一直关着，Emil回家时才觉得那句话说得太响。
  _effects: reputation -0.06000000000000005; relation acquaintance with person-materialized-world-vienna-1912-116_

- **1957.01** `kernel-social.lending::ctx-vienna-postwar-1945::milieu-tenement/lending.refused` tags: task, task:social, social, lending, debt, neighbor, money, everyday
  Emil说自己也等钱交房租，把口袋翻给Alois Hofer 2看。Alois Hofer 2没有再求，转身去敲另一扇门；第二天，楼道里有人说Emil见死不救，Emil听见了，只把煤筐往门里挪了挪。那天夜里，两家都早早关了灯。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-141; role; reputation -0.030000000000000027; flag +loan_refused; knowledge “邻居转身去敲了别人的门，楼道里开始议论这件事。”; relation acquaintance with person-materialized-world-vienna-1912-141_

- **1957.04** `vienna-tenement-neighbors.lost_room_key/key_found_by_neighbor` tags: home, social, family, housing
  Emil傍晚从面粉厂下工回来，发现挂在腰带上的房门钥匙不见了，在楼梯间来回找了四趟。Luise Weiss在二楼拐角的煤堆旁捡到那把铜钥匙，钥匙上缠着红线，一眼就认出来。Luise Weiss敲开Emil的门，把钥匙拍在桌上，说自己眼神好使。
  _effects: relation friend with person:evt:world-vienna-1912:003533:child; mood 0.050000000000000044_
## Lena

Born 1912.01, alive at 1957.
Education: higher 1; occupation: none; roles: infant, child, home_worker, movement_member, evicted_tenant, registered_resident, settled_by_mediator, cohabiting, black_market_patient, permit_holder, liberated_1945, water_rota_member, teaching_case.

### State snapshot
- ml18-sudden-fortune [household] (ended 1916.1: duration expired) parameters={"principal":20,"spent":0,"claims":3,"public":false,"source":"转卖的金矿股份"} links={} ticks=2
- raising-child [household] (ended 1938.1: duration expired) parameters={"caregiverBurden":42,"schoolProgress":71,"childConfidence":55,"careDebt":0,"schoolEnrolled":false,"leftHome":false} links={"child":"Berta Berg"} ticks=10
- raising-child [household] (ended 1942.1: duration expired) parameters={"caregiverBurden":55,"schoolProgress":56,"childConfidence":55,"careDebt":0,"schoolEnrolled":false,"leftHome":false} links={"child":"Alois Berg"} ticks=11
- apprenticeship-contract [person] (ended 1929.1: duration expired) parameters={"progress":20,"failures":2,"trade":"木工","paid":false} links={} ticks=4
- yf18-first-awakening [person] (ended 1931.1: duration expired) parameters={"intensity":79,"nerve":26,"talk":10,"reciprocated":true,"secret":true} links={"beloved":"Elisabeth Bauer"} ticks=3
- ml18-sudden-fortune [household] (ended 1933.1: duration expired) parameters={"principal":17,"spent":5,"claims":4,"public":true,"source":"瓶盖专利"} links={} ticks=3
- ml18-sudden-fortune [household] (ended 1941.1: duration expired) parameters={"principal":12,"spent":0,"claims":16,"public":true,"source":"附条件的遗嘱"} links={} ticks=6
- under-investigation [person] (ended 1940.1: duration expired) parameters={"progress":15,"charge":"逃税"} links={} ticks=1
- oj18-odd-apprenticeship [person] (ended 1944.1: duration expired) parameters={"trust":29,"strangeKnowledge":36,"reliability":55,"nightsWorked":24,"post":"动物园夜班饲养员"} links={} ticks=3
- mb17-remittance-web [household] (ended 1955.1: duration expired) parameters={"obligation":94,"supportSent":9,"arrears":12,"relativesAway":3} links={} ticks=6
- institution-purge [organization] (ended 1949.1: duration expired) parameters={"target":"未说明","intensity":0.32999999999999996,"denunciations":2,"vacancies":1,"reviewOpen":true} links={} ticks=1
- oj18-odd-apprenticeship [person] (ended 1952.1: duration expired) parameters={"trust":28,"strangeKnowledge":40,"reliability":55,"nightsWorked":24,"post":"动物园夜班饲养员"} links={} ticks=2
- oj18-workplace-legend [person] (ended 1952.1: duration expired) parameters={"legend":28,"truth":54,"oddity":35,"toldCount":1} links={} ticks=2
- ml18-sudden-fortune [household] (ended 1954.12: replaced_by:ml18-sudden-fortune) parameters={"principal":4,"spent":0,"claims":1,"public":false,"source":"工厂合买彩票"} links={} ticks=0
- ml18-sudden-fortune [household] (ended 1957.1: duration expired) parameters={"principal":0,"spent":0,"claims":8,"public":true,"source":"押错的马"} links={} ticks=3
- under-investigation [person] (ended 1956.1: duration expired) parameters={"progress":15,"charge":"逃税"} links={} ticks=1

### 184 subject events

- **1913.08** `statistical_infection`
  Lena在Hofer-Wohnung, Leopoldstadt病倒了，痢疾让身体发热、虚弱，接下来的日子只能卧床。

- **1913.09** `statistical_illness_worsened`
  Lena的痢疾没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1913.12** `statistical_illness_worsened`
  Lena的痢疾没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1914.02** `statistical_recovery`
  Lena熬过了这场痢疾，能坐起来喝一点汤，但身体还很虚。

- **1917.10** `vienna-early-childhood.fever-night/father-absent` tags: childhood, family, home, street
  Lena烧到半夜，床上只有Josefine Hofer一个人守着。水缸见了底，Josefine Hofer一手抱Lena，一手提桶下楼，桶沿在楼梯上磕了一下，水泼出来打湿鞋面。天亮时Friedrich Hofer推门进来，Josefine Hofer把沾着药味的湿被单团起来，塞进Friedrich Hofer怀里。
  _effects: health 0.019999999999999997 (服药后略见好转); mood -0.1_

- **1918.01** `p9-gap-childhood-chores.market-line/line-both-families` tags: childhood, household, chores, school, task, daily, market, food
  队伍拐弯时，Anna Moser朝Lena招手。Lena挤过去，替两家把面包领出来，纸包用不同的绳结系住。家里人晚上解开绳结，先掂了掂份量，再问价钱；Lena把每一包的面包数、找零和欠的铜板都说了一遍，家里人听完才把两包分别收进柜子。
  _effects: food; relation acquaintance with person-anna-moser; skill; relation acquaintance with person-materialized-world-vienna-1912-20_

- **1919.01** `p9-gap-childhood-chores.laundry-help/laundry-three-heller` tags: childhood, household, chores, school, task, daily, laundry, work
  “拽平，别留褶。”Franz Lechner在绳子那头喊。Lena踮着脚把床单拉直，碱水把指缝泡得发白。收工时天已经黑了，Franz Lechner数了三赫勒，又在围裙上擦干手才递过来。Lena把钱塞进袜筒，回家路上一直攥着，虎口的裂口沾了汗，火辣辣地疼。
  _effects: cash 0.03 (帮邻居晾床单挣的三赫勒); relation acquaintance with person-franz-lechner; relation acquaintance with person-materialized-world-vienna-1912-17_

- **1920.01** `p9-gap-childhood-chores.market-line/line-half-flour` tags: childhood, household, chores, school, task, daily, market, food
  队伍从面包房门口拐进巷子，Lena把布袋夹在腋下，学着前面人的样子，用胳膊肘顶住后面人的篮子。窗口的伙计舀面粉时，Lena踮脚看着秤，直到半袋面倒进袋口。挤出人群时鞋跟被踩掉，Lena单脚跳了两步，在泥里摸回鞋，索性赤脚走回家。
  _effects: food; skill; relation acquaintance with person-materialized-world-vienna-1912-8_

- **1921.01** `p9-gap-childhood-chores.laundry-help/laundry-three-heller` tags: childhood, household, chores, school, task, daily, laundry, work
  “拽平，别留褶。”Otto Winter在绳子那头喊。Lena踮着脚把床单拉直，碱水把指缝泡得发白。收工时天已经黑了，Otto Winter数了三赫勒，又在围裙上擦干手才递过来。Lena把钱塞进袜筒，回家路上一直攥着，虎口的裂口沾了汗，火辣辣地疼。
  _effects: cash 0.03 (帮邻居晾床单挣的三赫勒); relation acquaintance with person-otto-winter; relation acquaintance with person-materialized-world-vienna-1912-12_

- **1921.08** `vienna-childhood-friends.courtyard-race/won-the-race-lost-a-button` tags: childhood, social, school, street
  晒衣绳下挂着湿床单，孩子们绕着跑，鞋底把水甩到墙上。Lena在第三圈超过Helene Winter，手先碰到墙根。两颗玻璃弹珠进了Lena口袋，外套第二颗纽扣却崩进下水道。Helene Winter从二楼窗口骂了一句，扔下一根别针。
  _effects: mood 0.05; relation acquaintance with person-helene-winter_

- **1922.01** `p9-gap-childhood-chores.market-line/line-sold-out-potatoes` tags: childhood, household, chores, school, task, daily, market, food
  木窗“咔”地合上，Lena的布袋还敞着口。伙计隔着板缝说下星期再来。Lena在墙根站了一会儿，把硬币排在掌心数了两遍，走到旁边土豆摊前，挑了几个小的，让摊主当面过秤。家里人晚上把钱和土豆倒在桌上，重新数了一遍。
  _effects: food; mood -0.03; skill_

- **1923.01** `p9-gap-childhood-chores.laundry-help/laundry-bread-with-friend` tags: childhood, household, chores, school, task, daily, laundry, work
  两个孩子在院子两头跑，一个递，一个夹，床单在风里鼓起来。最后一条挂好，Ferdinand Berg从厨房拿出面包，先给了自家孩子，再掰一块给Lena。Lena把面包塞进围裙口袋，回家后放在家里人的碗边，说自己在外面吃过了。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-12; skill; relation acquaintance with person-materialized-world-vienna-1912-15_

- **1923.08** `statistical_infection`
  Lena在Leopoldstädter Zinshaus, gemeinsamer Gang病倒了，肺炎让身体发热、虚弱，接下来的日子只能卧床。

- **1923.09** `statistical_illness_worsened`
  Lena的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1923.10** `statistical_recovery`
  Lena从肺炎中慢慢恢复，能下床喝水，但身体还虚弱。

- **1924.07** `p9-childhood-adolescence.courtyard-gang/gang-corner-turn-back` tags: adolescence, friendship, identity, work, school, secret, church
  Lena只把Klara送到巷口的煤油灯下就折回去。第二天在水泵边，Klara学Lena走路的样子，几个人跟着笑，Lena拎起水桶没有接话。
  _effects: relation acquaintance with person-phase15-Klara-world-vienna-1912; mood -0.02_

- **1925.01** `r13-edu.boarding-school::ctx-vienna-reform-1930::milieu-tenement/admitted-to-dormitory` tags: education, boarding_school, residence, family, scholarship, reform, medical, schooling
  Lena把铁皮箱绑在自行车后座，骑了三十里到寄宿学校。舍监检查行李，把家里的腌菜罐没收，说会招老鼠。Lena在熄灯后偷偷把罐子从垃圾堆捡回来，藏在床底，第一顿饭就着腌菜吃完了两碗粥。第一个星期Lena把腌菜分给同屋，换回三张邮票和一支不漏水的钢笔。
  _effects: flag +boarding_school_admitted; education secondary_

- **1925.06** `r15-work.master-takes-on::ctx-vienna-reform-1930::milieu-tenement/unpaid-trial` tags: work, craft, apprentice, trade, poverty, reform, medical, schooling
  Franz Winter先说试三个月，不给工钱，只管一顿午饭。家里同意了，因为多一张嘴比多一双手更难。Lena每天最早到，最晚走，三个月后师傅才把契约拿出来。
  _effects: food; mood -0.039999999999999994; state_add apprenticeship-contract state:world-vienna-1912:92; relation acquaintance with person-materialized-world-vienna-1912-9; education apprenticeship; role_

- **1926.01** `vienna-life-apprenticeship/kept-at-home` tags: adolescence, work, apprenticeship
  家里算了一笔账：学徒工钱扣掉车费和饭钱，剩不下多少。Lena留在家里接缝纫店的零活，顺便照看弟弟妹妹。
  _effects: role; cash 2 (home piecework)_

- **1926.01** `state_tick:apprenticeship-contract/workshop-year/mistake` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Lena废掉了一块料，师傅扣了工钱。晚饭时谁也没提这件事。
  _effects: state_parameter apprenticeship-contract.failures 0 -> 1; cash -1 (wasted material); mood -0.039999999999999994_

- **1926.01** `p9-childhood-youth-aspiration.join-a-club/went-once-and-left` tags: adolescence, education, aspiration, school, books, club, exam, task
  Lena交了第一个月的会费，进去坐了一刻钟。屋里太吵，下棋的争论盖过了念书的声音，他借的书也被人翻得卷了边。下个月他路过门口，没再进去交十赫勒。
  _effects: cash -0.1 (只交了一个月会费); relation acquaintance with person-materialized-world-vienna-1912-48; flag +workers_youth_quit; mood -0.020000000000000004; relation acquaintance with person-materialized-world-vienna-1912-48_

- **1927.01** `yf18-apprentice.press-guard::ctx-vienna-reform-1930::milieu-tenement/tie-the-sleeve-and-work` tags: apprenticeship, work, danger, machine, injury, refusal, reform, medical
  Lena把袖口卷到肘上，用麻绳扎紧，替Sozialdemokratische Arbeiterpartei Österreichs (SDAP)把一叠纸送进压印机。前两百张很顺，第二百零一张时，纸角卡住，Lena伸手去拨，机器没有停；等Otto Hofer拉开Lena，食指的指甲已经翻了起来。
  _effects: condition; state_parameter apprenticeship-contract.progress 8 -> 0; cash -2 (a doctor and a bandage); flag +yf18_press_injury; mood -0.05; relation acquaintance with person-materialized-world-vienna-1912-33; relation acquaintance with person-materialized-world-vienna-1912-34_

- **1927.01** `state_tick:apprenticeship-contract/workshop-year/learned` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Lena又学会了一道工序。师傅没有夸，只把下一块料推到面前。
  _effects: state_parameter apprenticeship-contract.progress 0 -> 20; skill; mood 0.020000000000000018_

- **1927.01** `r13-civ.first-aid-course::ctx-vienna-reform-1930::milieu-tenement/fainted-at-demo` tags: health, first_aid, course, skill, school, reform, medical, schooling
  演示到骨折固定时，Anton Weiss把夹板按在Lena的腿上，Lena忽然眼前发白，从凳子上滑下去。醒来时，Elisabeth Bauer正拿湿毛巾拍Lena的额头，教室里有人在笑。
  _effects: mood -0.06; flag +fainted_during_first_aid_demo; relation acquaintance with person-materialized-world-vienna-1912-4; relation acquaintance with person-materialized-world-vienna-1912-4_

- **1927.03** `kernel-edu.friendship::ctx-vienna-reform-1930::milieu-tenement/edu-friend-forbidden` tags: adolescence, school, friendship, books, family, reform, medical, schooling
  Friedrich Hofer说Berta Bauer家里没有正经职业，不许再来往。Lena嘴上答应，放学还是绕路去Berta Bauer家。被发现后，Friedrich Hofer把借书证撕了。Berta Bauer在门口等了两天，第三天没有再来。Lena把撕碎的借书证捡起来，夹进书里。
  _effects: relation kin with person-friedrich-hofer; flag +forbidden_friendship; mood -0.07_

- **1927.04** `r3-teen.police-caution::ctx-vienna-reform-1930::milieu-tenement::reform-parent-notice/fined` tags: police, caution, record, family, work, reform, medical, schooling
  Alois Lechner 2说按条例罚三克朗，交不出就通知学校。Friedrich Hofer从内衣口袋里摸出叠好的钞票，一张张数，数到第三张时手停了。回家后，那三克朗被写在厨房的账单上，旁边画了一道红线。
  _effects: cash -3 (派出所里的第一次签字); mood -0.07999999999999999; flag +fined_by_police; relation rival with person-friedrich-hofer; relation acquaintance with person-materialized-world-vienna-1912-23_

- **1927.06** `r2-leisure.cinema-fire::ctx-vienna-reform-1930::milieu-tenement::cinema-fire-reform/cinema-fire-drill-worked` tags: leisure, cinema, fire, panic, rescue, reform, medical, schooling
  消防检查刚过，电影院换了新的石棉幕布，门口挂着“出口畅通”。放映到一半，胶片又卡了，焦味从放映室飘出来。Ferdinand Berg第一个冲到门口，把两扇门都推开。Anton Bauer 2在里面喊只是卡片，别慌。观众还是走了一半。
  _effects: reputation 0.03; condition; flag +cinema_fire_drill_worked; relation colleague with person-materialized-world-vienna-1912-12; knowledge “the new fire doors open outward and were tested during a jam”; relation acquaintance with person-materialized-world-vienna-1912-39_

- **1928.01** `state_tick:apprenticeship-contract/workshop-year/mistake` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Lena废掉了一块料，师傅扣了工钱。晚饭时谁也没提这件事。
  _effects: state_parameter apprenticeship-contract.failures 1 -> 2; cash -1 (wasted material); mood -0.03999999999999998_

- **1928.01** `r13-edu.boarding-school::ctx-vienna-reform-1930::milieu-tenement/admitted-to-dormitory` tags: education, boarding_school, residence, family, scholarship, reform, medical, schooling
  Lena把铁皮箱绑在自行车后座，骑了三十里到寄宿学校。舍监检查行李，把家里的腌菜罐没收，说会招老鼠。Lena在熄灯后偷偷把罐子从垃圾堆捡回来，藏在床底，第一顿饭就着腌菜吃完了两碗粥。第一个星期Lena把腌菜分给同屋，换回三张邮票和一支不漏水的钢笔。
  _effects: education secondary_

- **1928.02** `yf18-body.danube-cabin::ctx-vienna-reform-1930::milieu-tenement/wade-in-first` tags: body, desire, river, swimming, shame, first_love, reform, medical
  多瑙河的浴棚按男女分开，木板缝里能看见对面的人影。Lena穿着借来的毛线泳衣，站在第三间门口不敢下水；Elisabeth Bauer从水里冒出来，头发贴在额头上，说水不冷。Lena走进河里时，满脑子都是自己肋骨上那道疤。
  _effects: state_add yf18-first-awakening state:world-vienna-1912:160; health 0.019999999999999997 (cold river water and a long swim); mood 0.030000000000000027; flag +yf18_first_awakening_active_

- **1929.01** `yf18-dare.bridge-rail::ctx-vienna-reform-1930::milieu-tenement/fall-on-the-ice` tags: dare, bridge, river, friendship, risk, reform, medical, schooling
  Lena走到第四步，鞋底在霜上滑了一下，整个人挂在栏杆外侧。Berta Kraus抓住Lena的手腕，Hedwig跑去叫桥头卖烤栗子的老人；Lena被拉上来时，膝盖已经湿透，第二天走路一瘸一拐。
  _effects: state_parameter yf18-first-awakening.intensity 50 -> 56; state_parameter yf18-first-awakening.nerve 15 -> 5; relation friend with person:evt:world-vienna-1912:000333:child; flag +yf18_bridge_scare; mood -0.02999999999999997_

- **1929.01** `state_tick:yf18-first-awakening/half-year-of-glances/answered-glance` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Lena在教堂门口或学校走廊里又遇见Elisabeth Bauer。这一次对方先点了头，Lena准备好的整段话全忘了，只把手里的书换到另一只手上；回家后Lena才发现，自己把书拿倒了。
  _effects: state_parameter yf18-first-awakening.intensity 69 -> 74; state_parameter yf18-first-awakening.nerve 10 -> 18; state_parameter yf18-first-awakening.reciprocated true -> true; mood 0.02999999999999997_

- **1929.01** `state_expire:apprenticeship-contract` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick, state:apprenticeship-contract
  Lena的「学徒契约」到期；相关安排结束。
  _effects: state_remove apprenticeship-contract state:world-vienna-1912:92; role_

- **1929.07** `r3-teen.first-move-away::ctx-vienna-reform-1930::milieu-tenement::reform-workers-dormitory/room-near-work` tags: housing, leaving_home, lodging, work, independence, reform, medical, schooling
  Lena在工厂后街租了一个床位，和两个车工合住。房东太太每天收一次煤钱，洗脸水要自己下楼打。第一夜，他听着隔壁的机器声睡着，梦里还在数工票上的尺寸。天没亮，隔壁的车工就敲门叫他一起上工。
  _effects: cash -3 (行李放在楼梯口); mood 0.03999999999999998; flag +moved_to_lodging_near_work; relation colleague with person-materialized-world-vienna-1912-44; move place-wien-printshop-winter; relation acquaintance with person-materialized-world-vienna-1912-44; relation acquaintance with person-materialized-world-vienna-1912-25_

- **1929.08** `yf18-friend.two-tickets::ctx-vienna-reform-1930::milieu-tenement/confront-at-the-cloakroom` tags: first_love, friendship, betrayal, dance, tickets, reform, medical, schooling
  Lena在衣帽间堵住Maria Lechner，问那两张票怎么到了Berta Kraus手里。Maria Lechner说Lena从来没敢开口，自己只是替Lena把话说了；Lena把票根揉成一团，塞进Maria Lechner的西装口袋，转身时撞翻了侍者的托盘。
  _effects: state_parameter yf18-first-awakening.intensity 64 -> 69; state_parameter yf18-first-awakening.talk 0 -> 10; state_parameter yf18-first-awakening.nerve 15 -> 10; relation friend with person:evt:world-vienna-1912:000333:child; reputation -0.02; mood -0.04999999999999999_

- **1929.11** `yf18-firstlook.parish-dance::ctx-vienna-reform-1930::milieu-tenement/the-second-dance` tags: first_love, dance, church, courtship, jealousy, reform, medical, schooling
  舞卡上第一支曲子被Katharina Lechner写走了。Lena在教会礼堂的木地板上踩错了两步，Katharina Lechner说没关系，把手放回Lena背后；第三支曲子响起时，Elisabeth Bauer在门口冲Lena比了个手势，Lena假装没看见。
  _effects: state_parameter yf18-first-awakening.intensity 56 -> 64; state_parameter yf18-first-awakening.nerve 5 -> 15; state_parameter yf18-first-awakening.reciprocated false -> true; mood 0.03999999999999998_

- **1930.01** `state_tick:yf18-first-awakening/half-year-of-glances/answered-glance` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Lena在教堂门口或学校走廊里又遇见Elisabeth Bauer。这一次对方先点了头，Lena准备好的整段话全忘了，只把手里的书换到另一只手上；回家后Lena才发现，自己把书拿倒了。
  _effects: state_parameter yf18-first-awakening.intensity 74 -> 79; state_parameter yf18-first-awakening.nerve 18 -> 26; state_parameter yf18-first-awakening.reciprocated true -> true; mood 0.02999999999999997_

- **1930.01** `task-vienna-bourgeois-youth.study-funding/trade-for-ledger` tags: bourgeois, education, culture, salon, university, family, task, task:education
  Friedrich Hofer合上账本，说学费付一个学期，条件是Lena每星期天下午回家替店里记一次账。母亲这才把汤重新端上来，Hedwig在旁边笑他成了店里的半个伙计。
  _effects: cash -60 (父亲支付一学期学费); relation kin with person-friedrich-hofer; skill; mood 0.04999999999999999_

- **1930.03** `vienna-medical-treatment.night-fever/sweat-it-out` tags: health, medical, family, money
  Lena说胡话时念着车间的排班表，Maria Moser一句句应着，拿小勺往嘴里送温水。床头那半瓶退烧药早见了底，她没舍得倒最后一滴，留着天亮再说。
  _effects: condition; relation friend with person-materialized-world-vienna-1912-60; relation acquaintance with person-materialized-world-vienna-1912-60_

- **1930.06** `vienna-courtship-courtyard.sunday-walk/second-bridge-promise` tags: adulthood, courtship, partner, social, family, partnership
  在第二个桥洞下，Anna Bauer先停下来，用鞋尖碾一颗烤栗子壳，说下星期天还是这个时候、还是这座桥。Lena点头，掏出四赫勒买了两小袋栗子，两人分着剥，手上都是糖渍；桥洞上的水还在滴，谁也没有提万一明天下雨怎么办。
  _effects: relation partner with person-anna-bauer; cash -0.04 (两小袋烤栗子); mood 0.06_

- **1930.08** `p9-gap-adult-solitude.window-argument/window-argument.peek` tags: adulthood, daily, solitude, ordinary, home, neighbor, overheard
  Lena下楼倒水，在楼梯口看见院子里站着一对夫妻，男人的围裙上还沾着面粉，女的攥着一张工钱条。她没插话，提着壶又上楼，关门时听见那女人说“一星期八克朗怎么够”。
  _effects: mood -0.030000000000000027; skill_

- **1931.01** `vienna-social-movement.recruitment/read-and-decline` tags: development, social_movement, organization, politics
  Lena把传单读了两遍，记下上面的地址，却没有去。第二天照常上工；午休时听见两个工友低声谈论同一场集会。
  _effects: mood -0.010000000000000009; relation acquaintance with person-materialized-world-vienna-1912-58_

- **1931.01** `state_expire:yf18-first-awakening` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Lena的「第一次心动」到期；相关安排结束。
  _effects: state_remove yf18-first-awakening state:world-vienna-1912:160; flag -yf18_first_awakening_active_

- **1931.01** `p9-social-relationship-initiative.apology-at-bakery/violets-on-the-step` tags: courtship, friendship, family, social, initiative, housing, task, task:social
  话在喉咙里滚了几遍，终究没有等到对方进门。门一响，有人就把紫罗兰放在门槛边，转身往街角走。花被早晨的扫帚拨到墙根，对方捡起来闻了闻，追到巷口只看见一个拐弯的背影，午后托人捎来一句话，说钱的事再算。
  _effects: cash -0.24 (一束紫罗兰); relation friend with person-materialized-world-vienna-1912-35; mood -0.02999999999999997; relation acquaintance with person-materialized-world-vienna-1912-35; relation acquaintance with person-materialized-world-vienna-1912-63_

- **1931.07** `vienna-legacy-worklife.union-office/union-office.post-ledger` tags: legacy, work, family, reform, ordinary_life
  浆糊是隔夜的，刷上去时带着股酸味。Lena把纸四角按平，有人凑近念出“一九〇一年，欠三十四克朗”。办公室里的椅子腿不平，坐在上面的人一动就晃，可没人起身。
  _effects: reputation 0.05; relation acquaintance with person-materialized-world-vienna-1912-30; flag +union_ledger_public; relation acquaintance with person-materialized-world-vienna-1912-75; relation acquaintance with person-materialized-world-vienna-1912-30_

- **1932.01** `task-vienna-bourgeois-youth.travel-prague/stay-longer` tags: bourgeois, education, culture, salon, university, family, task, task:migration
  讲座结束后Lena又留了两周旁听，给家里写信说行李随后寄到。母亲回信问他住哪里、吃什么，他含糊过去；Maria Moser替他找了一个便宜的房间，靠煤炉取暖。
  _effects: cash -20 (延长住宿与伙食); food; mood 0.06; relation acquaintance with person-materialized-world-vienna-1912-60; education higher_

- **1932.04** `vienna-medical-treatment.toothache/barber-pull` tags: health, medical, family, money
  Grete Bauer在门口替Lena捏着帽子，听见里面一声闷哼。弗朗茨把牙扔进搪瓷盘，说瞧这牙根都黑了。收钱时他多要了二十赫勒，算明矾水的钱，说下次别再拖成这样。
  _effects: cash -1.2 (理发师拔牙收费); health 0.03 (病牙被拔除但手法粗糙); mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-46_

- **1932.04** `vienna-adult-social.burial-fund/burial-fund.paid` tags: adulthood, social, work, family
  车间里管互助会的Helene Weiss在午休时把本子摊在Lena的工具箱上，说这个月还差最后一份月钱。Lena从马甲内袋摸出二十个克罗伊策，Helene Weiss当着他的面在本子上画了钩。
  _effects: cash -0.3 (缴纳丧葬互助会的月钱); relation colleague with person-materialized-world-vienna-1912-5; reputation 0.04000000000000001; relation acquaintance with person-materialized-world-vienna-1912-5_

- **1932.06** `vienna-family-divorce/reconcile-for-now` tags: family, marriage, divorce, housing, lifecycle, partnership
  Lena和Anna Bauer在楼道里吵到半夜，最后因为下个月的房租又坐回同一张桌。谁都没有提和好，只把账本重新摊开；Anna Bauer把煤钱推过来，Lena接过去数了两遍，手指碰到一起又分开，屋里的灯亮到很晚。
  _effects: relation partner with person-anna-bauer; mood -0.030000000000000027_

- **1933.01** `p9-social-daily-culture.sunday-hill/p9-social-daily-culture.sunday-hill.rain-turn-back` tags: daily, culture, leisure, cafe, music, walk, task, task:daily
  走到半路雨点砸下来，山道立刻变得溜滑。Lena和Grete Weiss躲进路边的酒棚檐下，商量了几句，决定改乘电车回家，车票六十赫勒。Lena把带去的面包掰开分给同车躲雨的人，自己站在车尾，湿透的裤脚贴着腿，一路打着哆嗦；远足没走完，倒记住了一车陌生人的谢意。
  _effects: cash -0.6 (改乘电车回家的车票); food; mood -0.020000000000000018; relation friend with person-materialized-world-vienna-1912-75_

- **1934.01** `task-vienna-writer-researcher.abandon-project/project-sold` tags: knowledge, culture, writing, editor, library, publication, task, task:knowledge
  房租催到门口，Lena把已写的章节卖给一家小报，换了八克朗，够付一个月房租和两顿热饭。长篇锁进抽屉，钥匙搁在盐罐后面，Katharina Bauer问起时他只说“先不提了”，第二天照常去上工。
  _effects: cash 8 (小报买下章节的稿酬); mood -0.06; reputation -0.020000000000000004; flag +novel_shelved; relation acquaintance with person-materialized-world-vienna-1912-88_

- **1934.09** `vienna-medical-treatment.sanatorium/sanatorium-go` tags: health, medical, family, money
  疗养院的护士接过行李，把床号写在小黑板上。Lena躺下时听见走廊尽头有人在放唱片，咳嗽没那么紧了。安娜的信第三天到，说花浇过了，房东没来催租。
  _effects: cash -12 (疗养院车票和住宿押金); health 0.12000000000000001 (疗养院松林空气和正规休养); relation friend with person-materialized-world-vienna-1912-58_

- **1935.01** `p9-social-daily-culture.last-standing-ticket/p9-social-daily-culture.last-standing-ticket.got-ticket` tags: daily, culture, leisure, cafe, music, walk, task, task:culture
  Lena挤到窗口前，把一克朗硬币推进凹槽，换回一张印着座号的薄纸片。顶层站席的栏杆被前面的人汗湿，Lena侧身找了个能看见舞台边的位置，倚着烫手的铁栏看完两幕；散场时小腿发麻，嘴里还哼着刚听到的曲调，幕间也和邻座搭上了两句话。
  _effects: cash -1 (约瑟夫施塔特剧院顶层站票); mood 0.06; skill_

- **1936.01** `p9-work-jobsearch.ask-trial/ask-trial.no-vacancy` tags: work, job_search, negotiation, wages, employment, task, trial, factory
  工头说眼下没有空缺，让他把名字和住址写在账本撕下的纸角上，说月底再来问。Lena看那张纸被随手压进抽屉，纸角还露出半截，知道多半不会有人翻。他道过谢，往街尾另一家走去。
  _effects: mood -0.04000000000000001; relation acquaintance with person-materialized-world-vienna-1912-5; flag +seeking_work_

- **1936.06** `vienna-life-overcrowded-flat/take-in-a-lodger` tags: housing, home, health, family
  Lena把厨房角落隔出一块，租给一个在附近上工的学徒。每月多四克朗，但煤、水和厕所都要排队；夜里有人咳嗽，Lena睡不踏实，第二天眼下发青，孩子也在床上翻来覆去，四克朗换来一屋子醒着的人。
  _effects: cash 4 (lodger rent); condition; relation acquaintance with person-materialized-world-vienna-1912-74_

- **1936.10** `vienna-social-movement.recruitment/join-and-carry` tags: development, social_movement, organization, politics
  Lena在楼梯下面接到一张折成四折的传单。纸上没有署名，只写着下一次集会的地址。Lena去了，在昏暗的屋里报上姓名，成为Wiener Psychoanalytische Vereinigung的一员，并答应负责自己所在街区的联络。
  _effects: organization_membership; role; relation acquaintance with person-katharina-bauer_

- **1936.11** `vienna-parish-aid.soup-kitchen/soup-kitchen.help-wash` tags: faith, parish, mutual_aid, poverty, family
  Lena喝完汤没走，留下来帮修女把大锅刷净，又把木碗按大小摞好。厨房后头有半块面包和一碗剩汤，修女说是帮忙人的午饭。Alois Huber在门口等着一起回去，说下回还来，洗锅的活总有人要干。
  _effects: food; skill; relation acquaintance with person-materialized-world-vienna-1912-94; mood 0.01999999999999999; relation acquaintance with person-materialized-world-vienna-1912-94_

- **1936.11** `statistical_infection`
  Lena在Haus der Tante in Klosterneuburg病倒了，肺结核让身体发热、虚弱，接下来的日子只能卧床。

- **1936.12** `vienna-housing-move.rent-notice/rent-notice-neighbors-together` tags: housing, home, rent, family, money
  Lena把Otto Weiss和楼里另两户人家叫到楼道，把那张纸摆在窗台上传看。看门人在楼梯拐角听着，说房东礼拜三来收钱。几家人合计好，到那天一起等在门厅，先把克朗递过去，再把修补的事一件件摆出来。Lena把纸折进围裙口袋，觉得人凑齐了话也硬气些。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-8; mood 0.04000000000000001; flag +tenant_collective_

- **1936.12** `statistical_illness_worsened`
  Lena的肺结核没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1937.01** `p9-social-daily-culture.sunday-hill/p9-social-daily-culture.sunday-hill.rain-turn-back` tags: daily, culture, leisure, cafe, music, walk, task, task:daily
  走到半路雨点砸下来，山道立刻变得溜滑。Lena和Josef Berg 2躲进路边的酒棚檐下，商量了几句，决定改乘电车回家，车票六十赫勒。Lena把带去的面包掰开分给同车躲雨的人，自己站在车尾，湿透的裤脚贴着腿，一路打着哆嗦；远足没走完，倒记住了一车陌生人的谢意。
  _effects: cash -0.6 (改乘电车回家的车票); food; mood -0.020000000000000018; relation friend with person-materialized-world-vienna-1912-59; relation acquaintance with person-materialized-world-vienna-1912-59_

- **1937.02** `vienna-women-housework.wash-day/wash-day.quarrel` tags: gender, housework, home, labour, family
  铁桶磕在石沿上，水晃出来打湿了Lena的裙角。Maria Lechner的声音拔高，说轮到她就是轮到她。Lena咬着嘴没再喊，把盆往自己门前拖，湿石板上一道水痕。
  _effects: mood -0.04999999999999999; relation acquaintance with person:evt:world-vienna-1912:000362:child; reputation -0.020000000000000004_

- **1937.03** `statistical_illness_worsened`
  Lena的肺结核没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1937.04** `p9-social-tenement-neighbors.stove-and-line/stove-and-line.move-to-line-end` tags: housing, neighbors, tenement, daily, money, reputation
  Lena把自己泡着的衣服端到绳子最末一段，把靠近炉子的位置让给Katharina Bauer，条件是对方看着火，别让水烧干。Katharina Bauer点头，往炉膛里添了一块煤，说中午以前一定把炉子空出来。两家的盆就挨着放在窗下。
  _effects: relation acquaintance with person-katharina-bauer; mood 0.03_

- **1937.04** `statistical_recovery`
  Lena从肺结核中慢慢恢复，能下床喝水，但身体还虚弱。

- **1937.05** `vienna-tenement-neighbors.lost_room_key/key_stolen_by_stranger` tags: home, social, family, housing
  Lena记得出门时钥匙还在，回来却没了。Alois Bauer说下午看见一个穿灰外套的男人在楼道里转悠，手里晃着一把铜钥匙。两人下楼查看，房门虚掩，抽屉被拉开，攒着买煤的六克朗不见了。Alois Bauer陪着Lena去街角警察岗亭报了案，警察记下灰外套，说会留意。
  _effects: cash -6 (被盗的买煤钱); relation friend with person-materialized-world-vienna-1912-73; mood -0.09999999999999998; relation acquaintance with person-materialized-world-vienna-1912-73_

- **1937.06** `major-crisis.rent-increase/locks-changed` tags: crisis, housing, rent, eviction, family, poverty, migration
  第二个星期，Lena下工回来，门锁已经换了。床架、锅和一只装票据的铁盒堆在楼道里，看门人Luise Bauer把一张写有“自愿迁出”的纸递过来，说签了就能把东西搬进后院的共用间。Lena没有签，先把铁盒抱进怀里，手指被箱角划出一道口子。
  _effects: move place-wien-leopoldstadt-tenement; cash -9 (cart, storage and a replacement lock); condition; role; flag +evicted_

- **1938.01** `vienna-life-anschluss-1938/complies` tags: politics, persecution, 1938
  Alois Hofer在街口设了登记桌，要求住户交出姓名、职业和宗教。Lena排队填了表，回家把门牌擦干净。楼里有人连夜搬走，也有人站在阳台上挥手。
  _effects: role; cash -3 (new permits and stamps); condition_

- **1938.01** `p9-gap-adult-unemployed.factory-gate/gate-name-taken` tags: adulthood, unemployment, casual_labour, poverty, daily, factory, hiring
  玻璃后面的招工纸被门房用尺子压平，Lena的名字写在横线本上，墨迹歪着。旁边的Josef Berg 2凑过来看了一眼，说这厂子去年也招过两回，录用的多半是厂里老人的亲戚。
  _effects: flag +factory_callback; mood 0.02999999999999997_

- **1938.01** `task-vienna-bourgeois-youth.salon-invitation/retreat-to-cafe` tags: bourgeois, education, culture, salon, university, family, task, task:social
  Lena在楼梯口看见自己的旧外套挂在别人的大衣中间，袖口发亮。他没有进客厅，下楼找到同学，两人去咖啡馆坐了半晚，谈的还是那本没读完的书。
  _effects: cash -1 (咖啡馆两杯咖啡); mood -0.02999999999999997; relation friend with person-materialized-world-vienna-1912-8; relation acquaintance with person-materialized-world-vienna-1912-78_

- **1938.04** `vienna-medical-treatment.sanatorium/ignore-diagnosis` tags: health, medical, family, money
  抽屉一推就卡住，Lena用膝盖顶了一下才合严。上工路上经过药房，橱窗里摆着润肺糖浆的广告画，她别过头去。车间主任点名时，她应声比平时慢了一拍。
  _effects: condition; mood -0.03999999999999998_

- **1939.01** `ml18-tax.audit-of-the-windfall::ctx-vienna-authoritarian-1934::milieu-tenement/hide-the-ledger` tags: tax, legal, money, windfall, bureaucracy, comic, vienna, urban
  Maria Winter把账本塞进钢琴后面的夹层，说等风声过去再拿出来。Maria Stein第二次来时带了一个记录员和一张搜查令；钢琴被挪开时，琴键响了一串不成调的音。Lena看见黑皮本翻开的那一页上，已经用红笔圈出了三笔利息。
  _effects: cash -10 (the accountant's fee for hiding the ledger); state_add under-investigation state:world-vienna-1912:503; relation colleague with person-materialized-world-vienna-1912-50; flag +tax_ledger_hidden; knowledge “黑皮本上被红笔圈出的三笔利息都没有报税。”; mood -0.04999999999999999; relation acquaintance with person-materialized-world-vienna-1912-72_

- **1939.01** `kernel-social.reconciliation::ctx-vienna-authoritarian-1934::milieu-tenement/reconciliation.debt-settled` tags: task, task:social, social, reconciliation, family, apology, conflict, vienna
  Josef Moser把两人叫到厨房，把借条和账本摊在桌上，说今天要么还钱，要么写个期限。Hedwig先还四克朗，余下的按月在面包房门口交；Lena把借条折好，放进饼干盒。两人没有握手，但一起把账本翻到了新的一页。
  _effects: cash 4 (first instalment of the family debt); relation acquaintance with person-materialized-world-vienna-1912-44; role; flag +family_debt_settled; knowledge “余款每月在面包房门口交，借条放在饼干盒里。”_

- **1939.02** `vienna-parish-aid.sick-call/sick-call.with-priest` tags: faith, parish, mutual_aid, poverty, family
  Lena觉得一个人去不合适，绕到教堂请了修女一同上楼。修女看过病人，留下药包和一小瓶圣水，说会从教区账上出钱请医生来看一趟。Otto Hofer在楼下等着，说这样妥当，病人家里没男人，多个见证人心里安稳。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-33; mood 0.03999999999999998; flag +parish_sick_visitor_

- **1939.05** `hs18-queue.refugee::ctx-vienna-authoritarian-1934::milieu-tenement/give-a-false-address` tags: refugee, queue, station, papers, official, history, vienna, urban
  Lena把隔壁空屋的门牌号写在表格上。Otto Hofer看了一眼，居然没有追问。Franz Weiss千恩万谢，提着箱子往那条街走；Lena没有提醒那屋已经塌了半边，只把围巾拉高，转身去赶电车。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-25; knowledge “空屋的门牌号也能通过登记。”; flag +gave_false_refugee_address; mood -0.03999999999999998_

- **1939.08** `vienna-legacy-worklife.sick-fund/sick-fund.keep-quiet` tags: legacy, work, family, reform, ordinary_life
  止咳药水是褐色的，瓶口塞着软木塞，摇一摇会起沫。Lena看着工友把表折成小块，折了三折才塞进帽檐。墙上的规章还贴在那里，纸角被风掀起，没人去按。
  _effects: mood -0.04999999999999999; relation colleague with person-materialized-world-vienna-1912-89; relation acquaintance with person-materialized-world-vienna-1912-89_

- **1940.01** `ml18-family.fortune-split::ctx-vienna-authoritarian-1934::milieu-tenement/the-sibling-takes-it` tags: family, money, windfall, inheritance, conflict, dark, vienna, urban
  晚饭后的第三天，Lena去邮局取钱，发现存折上少了三十克朗。Hedwig在母亲的旧照片前承认拿了钱，说这些年照顾母亲的情分总该折成数目。Anna Bauer去叫了警察；Lena站在两个最熟悉的人中间，听见楼下有人把留声机开得很响。
  _effects: cash -30 (the sibling took thirty crowns from the savings book); state_parameter ml18-sudden-fortune.principal 42 -> 12; state_parameter ml18-sudden-fortune.claims 12 -> 15; relation rival with person-phase15-Hedwig-world-vienna-1912; condition; flag +family_fortune_stolen; knowledge “存折上少了三十克朗，取款单上的签名是模仿的。”; mood -0.09999999999999998_

- **1940.01** `state_expire:under-investigation` tags: under-investigation, legal, police, investigation, risk, state, state_tick, state:under-investigation
  Lena的「被调查」到期；相关安排结束。
  _effects: state_remove under-investigation state:world-vienna-1912:503_

- **1940.01** `r13-fam.propose-cohabitation::ctx-vienna-authoritarian-1934::milieu-tenement/keys-on-table` tags: task, family, cohabitation, household, courtship, vienna, urban, crisis
  Lena把两把钥匙放在桌上，一把是自家门，一把是今天刚配的。Anna Bauer没有立刻拿，先问房东知不知道，又问邻居会不会说闲话。Lena说已经跟门房讲过，只说是表亲来住；Anna Bauer把钥匙收进围裙口袋，当晚就提来一只藤箱。
  _effects: cash -5 (两把钥匙放在一张桌上); flag +moved_in_together; role; relation partner with person-anna-bauer; knowledge “the porter was told the partner is a cousin”; household_

- **1940.06** `vienna-legacy-worklife.union-office/union-office.enroll-first` tags: legacy, work, family, reform, ordinary_life
  来问入会的是个瘦高的年轻人，帽檐捏在手里，说自己在第十六区的织布厂做了半年。Lena把名册翻到空白页，蘸水笔尖在“住址”那栏停了一下，等他报出街名。老成员在角落里把账本合上，声音很轻。
  _effects: cash 1 (新会员的入会费先记在桌上); relation acquaintance with person:evt:world-vienna-1912:000477:child; skill; relation acquaintance with person-materialized-world-vienna-1912-103_

- **1940.10** `oj18-zoo.night::ctx-vienna-authoritarian-1934::milieu-tenement/child-at-the-bear-pit` tags: zoo, animals, night, keeper, work, odd_job, suspense, vienna
  一个男孩翻过熊池的矮栏去捡帽子。Lena没有喊，怕惊动母熊，只提着装苹果的桶绕到下风处，把桶敲得咚咚响。母熊转身时，孩子被Elisabeth Hofer一把拽了上来；Lena的腿在后来的很多年里还会在梦里发软。
  _effects: reputation 0.06; relation friend with person-materialized-world-vienna-1912-86; cash 2 (reward from the child's parents); state_add oj18-odd-apprenticeship state:world-vienna-1912:553; mood -0.020000000000000018; flag +zoo_night_shift; flag +saved_child_at_zoo; knowledge “母熊被苹果桶引开时，孩子已经挂在{keeper}的胳膊上了。”; relation acquaintance with person-materialized-world-vienna-1912-86; role; flag +odd_job_apprentice_

- **1940.12** `p9-gap-adult-ordinary-day.market-closing/market-closing.fish-heads` tags: adulthood, daily, leisure, neighborhood, ordinary, market, food, bargain
  鱼摊案板上的冰碴子踩在脚下咯吱响。Rosa Lechner把鱼鳃抠干净了才递过来，说这几个头是今天卖剩的鲤鱼。Lena回家烧了半锅水，姜片一下锅，厨房里那股腥气就压下去了一半。
  _effects: food; health 0.019999999999999997 (喝上了热鱼汤); relation acquaintance with person-materialized-world-vienna-1912-2_

- **1941.01** `state_tick:oj18-odd-apprenticeship/strange-year/blamed-for-the-noise` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  楼上住户投诉夜里有人拖椅子，管事的把巡查簿翻到Lena的那一页，说签字太潦草，看不出巡过几趟。Lena想辩解，却想起那晚确实在楼梯间多站了一刻钟；扣掉的工钱刚好够买一双不漏水的鞋。
  _effects: state_parameter oj18-odd-apprenticeship.trust 38 -> 22; state_parameter oj18-odd-apprenticeship.reliability 65 -> 55; mood -0.050000000000000044; flag +odd_job_scare_

- **1941.01** `r13-work.unemployment-benefit::ctx-vienna-authoritarian-1934::milieu-tenement/rejected-missing-book` tags: work, unemployment, benefit, institution, poverty, vienna, urban, crisis
  Rosa Lechner说工龄册上少了最后三个月的盖章，不能算连续就业。Lena说厂里倒闭时没人盖章，Rosa Lechner说那就去找厂里。厂门已经锁了，账房改成了仓库。Lena回到家，把工龄册一页页翻过，发现最后那页的纸比前面薄。
  _effects: cash -1 (补助金窗口的第二张表); mood -0.09999999999999998; flag +work13_benefit_rejected_missing_stamp; knowledge “the final three months of employment were never stamped”_

- **1941.05** `vienna-church-community.tenement-prayer/rent-prayer-argument` tags: faith, social, family, home
  有人抱怨守夜人太多，踩坏了楼梯木板。楼里的人围着看，谁也没先走开。
  _effects: relation acquaintance with person:evt:world-vienna-1912:001808:child; reputation -0.03; mood -0.05999999999999994_

- **1941.11** `ml18-inheritance.conditional-will::ctx-vienna-authoritarian-1934::milieu-tenement/contest-the-will` tags: inheritance, legal, family, money, conditions, cinema, quiet, vienna
  Lena请了律师，说姑婆立遗嘱时已经认不清人。官司打了八个月，律师费、鉴定费和往返车钱加起来，最后拿到的十五克朗还不到原数的一半。Alois Hofer在法院门口递给Lena一张圣诞卡，里面没有字；Lena把它放进大衣内袋，回家路上买了两根蜡烛。
  _effects: cash 15 (the reduced settlement after contesting the will); relation rival with person-materialized-world-vienna-1912-15; relation acquaintance with person-rosa-lechner; flag +contested_the_will; knowledge “律师费和鉴定费吃掉了遗嘱争议的大部分收益。”; mood -0.020000000000000018_

- **1941.11** `vienna-women-housework.piecework-bundle/piecework.hide-defects` tags: gender, housework, home, labour, family
  篮底那两件领子卷得很紧，Lena用围裙角把篮沿擦了擦。Katharina Lechner翻了翻面上几件，拿尺子比了比，没再往下。Elisabeth Weiss 2在走廊里问交了多少，Lena含混说了句够买面包。
  _effects: cash 0.7 (交活所得，含未返工的两件); mood -0.040000000000000036; reputation -0.020000000000000004_

- **1942.01** `vienna-life-injury-recovery/clinic-treatment` tags: health, work, family
  Lena在受伤后的第三天去了诊所。医生清洗伤口、换药，收下诊费，嘱咐不要急着回机器旁。Lena把药方折好，回家路上买了纱布。
  _effects: health 0.05 (wound treatment); cash -8 (clinic and bandages); condition_
  _causes: evt:world-vienna-1912:009552_

- **1942.01** `hist15-occ.requisition-notice::ctx-vienna-authoritarian-1934::milieu-tenement/name-the-neighbor` tags: occupation, requisition, shortage, institution, history, family, vienna, urban
  Lena告诉Josef Weiss 2，Alois Berg家的地窖里还有两桶猪油。征用队下午就去了那户人家。Lena拿到一小袋盐和一张优先配给卡，回家时没有走平时那条街。
  _effects: cash 1 (检举邻居得到的配给奖励); reputation 0.020000000000000004; relation acquaintance with person:evt:world-vienna-1912:001300:child; flag +denounced_neighbor_for_grain; relation acquaintance with person-materialized-world-vienna-1912-115_

- **1942.01** `r13-fam.adopt-child::ctx-vienna-authoritarian-1934::milieu-tenement/adoption-contested` tags: task, family, adoption, child, law, household, vienna, urban
  手续办到一半，孩子的亲戚赶来，说自家人还在，轮不到外人领走。Rosa Lechner把已经填好的表格扣在桌上；Rosa 2躲到Lena身后，手指抓着外套下摆。那人在走廊里骂了很久，最后被门房请了出去。
  _effects: cash -4 (登记簿上的新姓氏); condition; flag +adoption_contested_by_kin; relation guardian with person:evt:world-vienna-1912:003449:child; knowledge “the child’s aunt claims guardianship”_

- **1943.01** `state_tick:oj18-odd-apprenticeship/strange-year/learned-the-building` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  又过了一个冬天，Lena能从楼梯的响声判断是谁在值夜，也能从煤气灯的颜色判断哪一段管道该修。师傅把巡查路线改了三次，最后仍然照Lena画的那张走；两个人都没有提这件事。
  _effects: state_parameter oj18-odd-apprenticeship.trust 19 -> 29; state_parameter oj18-odd-apprenticeship.strangeKnowledge 26 -> 36; state_parameter oj18-odd-apprenticeship.nightsWorked 0 -> 24; cash 2 (night-shift wages); skill_

- **1943.01** `kernel-health.task-pharmacy-hunt::ctx-vienna-authoritarian-1934::milieu-tenement::pharmacy-war-requisition/pharmacy-war-morphine-trade` tags: health, task, pharmacy, shortage, black_market, vienna, urban, crisis
  军需处先领走了奎宁和碘酒，药房只剩阿司匹林和泻盐。Lena用一双旧靴子换了两支吗啡，药剂师把安瓿裹在报纸里，叮嘱别在街上打开。他把安瓿藏进帽衬，过检查站时低着头。
  _effects: cash -20 (boots and cash traded for two morphine ampoules); health 0.019999999999999997 (pain relief from a black-market ampoule); role; flag +traded_for_morphine; knowledge “军需处先领走奎宁和碘酒，药房只剩阿司匹林；旧靴子可以换两支吗啡。”_

- **1943.04** `r1-cul.spiritualist-seance::ctx-vienna-authoritarian-1934::milieu-tenement/table-rapped` tags: faith, seance, grief, fraud, occult, vienna, urban, crisis
  Lena在烛光里握着手，桌子敲了三下。Franz Weiss闭着眼说，是一个穿军装的人。Helene Bauer在角落里冷笑，伸手掀开桌布，下面只有一根细线；Franz Weiss没有睁眼，说线是上一个客人留下的。
  _effects: cash -2 (桌子敲了三下); mood -0.030000000000000027; flag +attended_seance; relation acquaintance with person-materialized-world-vienna-1912-25; knowledge “a thin thread runs under the seance table”; relation acquaintance with person-materialized-world-vienna-1912-45_

- **1943.04** `vienna-historical-social-movement.public-meeting/speak-with-rent-numbers` tags: history, historical_process, social_movement, organization, politics
  Lena上台只讲本街区：一间套房月租二十六克朗，三个失业的男人挤在一张床上。台下有人点头，有人低头看鞋。Freie Gewerkschaft der graphischen Arbeiter Wiens的书记把数字记进小册子，主持人把发言时间多给了一分钟。
  _effects: reputation 0.06; skill; relation acquaintance with person-materialized-world-vienna-1912-53; relation acquaintance with person-materialized-world-vienna-1912-53_

- **1943.04** `vienna-tenement-neighbors.lost_room_key/key_found_by_neighbor` tags: home, social, family, housing
  Lena傍晚从面粉厂下工回来，发现挂在腰带上的房门钥匙不见了，在楼梯间来回找了四趟。Rosa Lechner在二楼拐角的煤堆旁捡到那把铜钥匙，钥匙上缠着红线，一眼就认出来。Rosa Lechner敲开Lena的门，把钥匙拍在桌上，说自己眼神好使。
  _effects: relation friend with person-rosa-lechner; mood 0.050000000000000044_

- **1943.08** `state_reaction:oj18-odd-apprenticeship/the-thing-in-the-basement` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  夜班结束前，Lena听见地下室传来拖拽声。下去时，门开着，地上只有一道湿拖把的痕迹；第二天，所有人都说那间屋子锁了十年。
  _effects: state_parameter oj18-odd-apprenticeship.strangeKnowledge 18 -> 26; state_parameter oj18-odd-apprenticeship.trust 22 -> 19; mood -0.030000000000000027; knowledge “地下室那扇门后面有东西被搬动过，但巡查簿上没有记录。”_
  _causes: evt:world-vienna-1912:010287_

- **1944.01** `hist15-occ.work-permit::ctx-vienna-authoritarian-1934::milieu-tenement/permit-granted` tags: occupation, work, permit, institution, shortage, history, vienna, urban
  Alois Hofer在通行证上盖了章，又用铅笔在角落写了一个日期。Lena拿到许可，可以去城西的修配厂上工；走出劳动局时，Lena把证件摸了三遍，确认它还在口袋里。
  _effects: cash -2 (通行证手续费); role; flag +work_permit_granted; knowledge “城西修配厂只认盖蓝章的通行证。”_

- **1944.01** `state_expire:oj18-odd-apprenticeship` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  Lena的「奇职学徒」到期；相关安排结束。
  _effects: state_remove oj18-odd-apprenticeship state:world-vienna-1912:553; role; flag -odd_job_apprentice_

- **1944.01** `r14-work.negotiate-loan::ctx-vienna-authoritarian-1934::milieu-tenement/only-nine-kronen` tags: debt, loan, money, institution, risk, vienna, urban, crisis
  Ferdinand Winter 3只肯借九克朗，还要Lena把工钱袋每月先送到柜台。Maria Stein说这条件比利息还重，Ferdinand Winter 3把借据折起来，说那就请便。Lena追到门口，还是把九克朗收下了，纸币上有一股烟草和樟脑混在一起的味道。
  _effects: cash 9 (借据上的第二行); condition; flag +took_small_loan; knowledge “the lender wants the wage packet delivered before rent”_

- **1944.02** `p9-gap-adult-solitude.river-walk/river-walk.far` tags: adulthood, daily, solitude, ordinary, home, walk, river, injury
  Lena顺着河岸一直走，走过铁路桥又走回来，天已经黑透。回来时脚底发热，袜子磨在脚背上，她一路数着路灯走完最后一段巷子，进门先坐下脱了鞋。
  _effects: health -0.019999999999999997 (走了很远的碎石路，脚底发疼); mood 0.050000000000000044_

- **1944.10** `r2-faith.faith-healing::ctx-vienna-authoritarian-1934::milieu-tenement/felt-relief` tags: faith, healing, medicine, risk, miracle, vienna, urban, crisis
  帐篷里挤了二百多人，Anton Winter把掌心按在Lena额头上，说“热退了吧”。Lena当夜出了一身汗，第二天能自己走到井边。Berta Berg 3后来听说，只说了一句：肺炎也会这样忽好忽坏。Anna Bauer把药瓶收进柜子，没有扔。
  _effects: health 0.05 (按手之后的第二夜); condition; flag +felt_relief_after_faith_healing; relation friend with person-materialized-world-vienna-1912-41; knowledge “the doctor says pneumonia can improve for a day and then tur”; relation acquaintance with person-materialized-world-vienna-1912-83_

- **1944.12** `vienna-women-housework.piecework-bundle/piecework.hide-defects` tags: gender, housework, home, labour, family
  篮底那两件领子卷得很紧，Lena用围裙角把篮沿擦了擦。Alois Berg 2翻了翻面上几件，拿尺子比了比，没再往下。Franz Weiss在走廊里问交了多少，Lena含混说了句够买面包。
  _effects: cash 0.7 (交活所得，含未返工的两件); mood -0.040000000000000036; reputation -0.01999999999999999; relation acquaintance with person-materialized-world-vienna-1912-87_

- **1945.01** `r14-work.loan-default::ctx-vienna-postwar-1945::milieu-tenement/half-a-year-more` tags: debt, loan, loan_default, law, household, vienna, urban, postwar
  Helene Bauer把双方叫到楼下的门房，桌上摊着算到小数点后的账。Ferdinand Winter 3同意再宽限半年，条件是Lena每周多还一克朗，并在借据背面写清违约的后果。Friedrich Berg端来两杯水，杯底沉着茶叶。Lena签字时，笔尖把“半年”两个字洇开了。
  _effects: cash -6 (到期日那天); condition; flag +loan_rescheduled; relation acquaintance with person-materialized-world-vienna-1912-63; knowledge “the rescheduled loan costs one extra krone a week”_
  _causes: evt:world-vienna-1912:011391_

- **1945.01** `vienna-life-injury-recovery/wound-infection` tags: health, work, family
  Lena的伤口在几天后肿起来，手腕发热。医生说要切开引流，费用比上次更高；Lena看着账单，先问能不能分两次付。
  _effects: cash -14 (drainage and medicine); condition_
  _causes: evt:world-vienna-1912:011061_

- **1945.01** `vienna-parish-aid.rent-box/rent-box.accept-all` tags: faith, parish, mutual_aid, poverty, family
  煤袋落在台阶上，扬起细细一层黑末。Helene Weiss用铅笔头在蓝格册上写门牌号，问房东姓什么，又叮嘱别把面包票弄丢。灶上水壶开始叫，Lena才想起屋里连只干净的杯子都没有。
  _effects: cash 6 (互助会补上本月房租差额); food; relation acquaintance with person-materialized-world-vienna-1912-5; flag +parish_registered_

- **1945.10** `p9-social-tenement-neighbors.stove-and-line/stove-and-line.first-come-order` tags: housing, neighbors, tenement, daily, money, reputation
  Lena把四只洗衣盆按到厨房的先后排成一列，用粉笔在门后写下各家的时辰：六点到七点半、七点半到九点。Friedrich Huber起初嘟囔，看到自家名字排在第二格，也就把水壶提了回去。晾衣绳按同样次序分两段，谁家的床单先上谁先占。
  _effects: mood 0.040000000000000036; relation acquaintance with person-materialized-world-vienna-1912-57; relation acquaintance with person-materialized-world-vienna-1912-57_

- **1945.11** `vienna-life-overcrowded-flat/take-in-a-lodger` tags: housing, home, health, family
  Lena把厨房角落隔出一块，租给一个在附近上工的学徒。每月多四克朗，但煤、水和厕所都要排队；夜里有人咳嗽，Lena睡不踏实，第二天眼下发青，孩子也在床上翻来覆去，四克朗换来一屋子醒着的人。
  _effects: cash 4 (lodger rent)_

- **1946.01** `vienna-life-1945-liberation/survives` tags: war, liberation, 1945
  苏联士兵进城时，Lena躲在门后听见坦克履带压过石板路。几天后街口贴出告示，Lena去领了一份汤和一块面包。
  _effects: role; food; cash -2 (replacement documents)_

- **1946.01** `r13-fam.apologize::ctx-vienna-postwar-1945::milieu-tenement/apology-rejected` tags: task, social, apology, reputation, conflict, vienna, urban, postwar
  Lena把带来的半块肥皂放在窗台上，说知道不够。Ferdinand Weiss 2没有碰肥皂，只说那天在场的人都记得Lena笑的样子。Lena站到腿发麻，最后把肥皂收回口袋，转身时听见窗子从里面关上了。
  _effects: mood -0.12; flag +apology_rejected; relation rival with person-materialized-world-vienna-1912-71_

- **1946.09** `vienna-medical-treatment.night-fever/hospital-night` tags: health, medical, family, money
  护士把冰袋按在Lena额上，水顺着鬓角流进衣领。Ferdinand Weiss 2坐在床脚，数着窗外渐渐亮起的铺面门板，说回去给炉子添块煤。隔壁床的老头整夜在喊一个女人的名字。
  _effects: cash -2 (医院急诊押金); health 0.08 (急诊观察和冰敷退烧); relation friend with person-materialized-world-vienna-1912-71_

- **1946.11** `vienna-women-housework.wash-day/wash-day.send-out` tags: gender, housework, home, labour, family
  洗衣妇把工服从报纸里抖出来，翻开领口看了看油垢，点头收下。Lena转身回屋，铜板在围裙口袋里磕出轻响。Luise Bauer还在楼梯上嘟囔，说这钱不如买半斤猪油。
  _effects: cash -0.5 (请洗衣妇代洗工服); mood 0.030000000000000027_

- **1947.01** `ad20-neighbor-dispute::ctx-vienna-postwar-1945::milieu-tenement/the-line-moves` tags: neighbor, dispute, home, everyday, public, obligation, vienna, urban
  隔壁把晾衣绳往Lena这边挪了一尺，水滴正好落在窗台上。Lena拿粉笔在墙上画了一道线；Marie Huber看见了，又把绳子挪回去半尺。两个人都觉得自己让了步，晚饭时却都把窗户关得很紧。
  _effects: relation acquaintance with person-marie-huber; flag +laundry_line_dispute; relation acquaintance with person-materialized-world-vienna-1912-106_

- **1947.01** `r13-work.factory-gate::ctx-vienna-postwar-1945::milieu-tenement/turned-away` tags: work, hiring, factory, queue, cash, vienna, urban, postwar
  Elisabeth Hofer把名单卷起来，说今天只要会看图纸的。Lena在铁门外站到换班，听见里面皮带轮转了一整天。Hermann Berg分给Lena半块黑面包，两人谁也没提明天还来不来；电车票钱花掉了，口袋里的铜板只够买一小袋煤。
  _effects: cash -1 (铁门开了一条缝); flag +work13_turned_away_at_factory_gate; knowledge “the factory takes only ten men from a gate queue of over a h”_

- **1947.02** `p9-gap-adult-ordinary-day.market-closing/market-closing.bruised-apples` tags: adulthood, daily, leisure, neighborhood, ordinary, market, food, bargain
  苹果堆里混着几个已经发软的，摊主用围裙兜着往她篮子里倒，说拿回去喂猪也不亏。Lena在井边洗了半篮子，削皮时看见果核边有一圈褐色的痕，刀子挖下去，甜味还是冒出来。
  _effects: cash -0.1 (买收摊前的碰伤苹果); food; relation acquaintance with person-materialized-world-vienna-1912-79; relation acquaintance with person-materialized-world-vienna-1912-101_

- **1947.03** `hs18-refugee.return::ctx-vienna-postwar-1945::milieu-tenement/hide-the-claim` tags: refugee, return, housing, neighbor, postwar, history, vienna, urban
  Josef Lechner拿出了一张泡过水的租房纸，Lena说现在的房管处不认旧纸。Josef Lechner在楼梯口坐到天黑，箱子上的绳子勒进手心。Lena关门前听见箱轮在墙上刮了一下，像有人用指甲划门。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-132; reputation -0.020000000000000004; flag +denied_returning_tenant; mood -0.040000000000000036; relation acquaintance with person-materialized-world-vienna-1912-132_

- **1947.08** `vienna-parish-aid.funeral-society/funeral-society.defer` tags: faith, parish, mutual_aid, poverty, family
  Lena把抽屉拉开又推上，铜币在木板上滚了半圈。Marie Huber合上本子说，拖欠的人不少，可规矩就是规矩。她走下两级台阶又回头提醒，发工钱那天她会在教堂侧门等着。
  _effects: relation acquaintance with person-marie-huber_

- **1948.01** `vienna-life-injury-recovery/clinic-treatment` tags: health, work, family
  Lena在受伤后的第三天去了诊所。医生清洗伤口、换药，收下诊费，嘱咐不要急着回机器旁。Lena把药方折好，回家路上买了纱布。
  _effects: health 0.05 (wound treatment); cash -8 (clinic and bandages)_
  _causes: evt:world-vienna-1912:012024_

- **1948.01** `r13-civ.enter-hospital::ctx-vienna-postwar-1945::milieu-tenement/admitted-third-class` tags: health, hospital, admission, deposit, institution, vienna, urban, postwar
  Hermann Berg把押金收据和住院单钉在一起，让Lena去三楼东侧等床。走廊里全是折叠床，Elisabeth Winter 2给Lena一条洗得发硬的毯子，说今晚先别喝水。Lena把鞋塞在枕头下面，听着隔壁的呻吟睡了过去。
  _effects: cash -8 (住院处窗口的押金); health 0.05999999999999999 (住院处窗口的押金); condition; flag +hospitalized_third_class; relation acquaintance with person-materialized-world-vienna-1912-61; relation acquaintance with person-materialized-world-vienna-1912-61_

- **1948.03** `bc18-inherit.forty-seven-franz::ctx-vienna-postwar-1945::milieu-tenement/bury-the-stranger` tags: inheritance, mistaken_identity, debt, funeral, work, absurd, family, vienna
  遗嘱里还附了一笔丧葬费，条件是要有“家属”到场。死者没有亲人，Lena只好穿黑衣站在墓旁，听牧师念一个从未听过的名字。雨把花圈上的纸花打湿，泥水漫过鞋面；葬礼结束后，Alois Hofer把九克朗交给他，说账已结清。Lena回家脱鞋，发现袜子上沾着别人的土。
  _effects: cash 7 (以家属身份到场后的遗产余款); reputation 0.030000000000000013; relation acquaintance with person-materialized-world-vienna-1912-15; condition; flag +buried_a_stranger_for_the_estate; mood -0.010000000000000009_

- **1948.06** `ad20-family-dinner::ctx-vienna-postwar-1945::milieu-tenement/the-fourth-bowl` tags: family, dinner, everyday, obligation, public, grief, vienna, urban
  Anna Weiss来得比约定早，手里提着一小袋栗子。Lena多摆了一副碗筷，又把汤里的肉往那只碗里拨了两块。饭吃到一半，Anna Weiss忽然说“你们家吃饭真安静”，Lena才发现自己一直在听楼上的脚步。
  _effects: food; mood 0.030000000000000027; relation acquaintance with person:evt:world-vienna-1912:000477:child; flag +family_dinner_guest_

- **1948.06** `ad20-train-journey::ctx-vienna-postwar-1945::milieu-tenement/the-compartment-sleeps` tags: travel, train, stranger, everyday, public, newcomer, vienna, urban
  车厢里暖得发困，Emil Huber把窗户推开一条缝，又把带来的面包掰成两半。Lena接过一半，发现里面夹着一片薄薄的香肠。两个人没有交换姓名，到站时各走各的，Lena却记住了那片香肠的味道。
  _effects: mood 0.020000000000000018; food; flag +quiet_train; relation acquaintance with person-materialized-world-vienna-1912-131; relation acquaintance with person-materialized-world-vienna-1912-131_

- **1948.12** `vienna-housing-move.rent-notice/rent-notice-pay` tags: housing, home, rent, family, money
  Lena把通知念给Emil Berg 3听，Emil Berg 3摇头说是楼梯间那几块新玻璃的账。Lena去楼下杂货铺换开一张五克朗的纸币，回屋一枚一枚摆开数，煤箱底多留了二十赫勒。
  _effects: cash -2 (按月多付两克朗房租); food; mood -0.020000000000000018_

- **1949.01** `state_reaction:mb17-remittance-web/family-emergency` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  故乡来了一封电报，说屋顶塌了一角，老人暂时住到邻居家。Lena当晚就去邮局，把本来留着交学费的钱先汇了出去；回家后，他把墙上的缴费单取下来，折好放进抽屉。
  _effects: state_parameter mb17-remittance-web.obligation 56 -> 66; state_parameter mb17-remittance-web.arrears 3 -> 4; cash -3 (an emergency money order sent home); mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:014216_

- **1949.01** `vienna-postwar-housing-1950s/stay-with-relatives` tags: adulthood, postwar, housing, family
  分房名单又往后推了一年，Lena一家搬进亲戚家的厨房隔间。Katharina Lechner送来一块旧帘子当隔断；夜里有人起身，全屋都听得见。
  _effects: cash -3 (shared household costs); condition; relation acquaintance with person:evt:world-vienna-1912:000086:child_

- **1949.01** `state_tick:mb17-remittance-web/remittance-year/month-behind` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  这个月厂里少发了工钱。Lena把汇款单填到一半又放下，先给房东送去一部分；夜里他给故乡写信，说“下个月一定补上”，写完把信纸折了三折，像怕它自己会开口。
  _effects: cash -1 (the rent was paid first); state_parameter mb17-remittance-web.arrears 4 -> 5; state_parameter mb17-remittance-web.obligation 66 -> 70_

- **1949.01** `state_reaction:mb17-remittance-web/wages-arrive` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  厂里补发了一笔拖欠的工钱。Lena没有先还杂货铺的账，而是去邮局多填了一张汇款单；回来的路上，他给自己买了一支最便宜的烟，站在桥上看了一会儿水，才把剩下的钱数清楚。
  _effects: cash 1 (the factory paid part of the arrears); state_parameter mb17-remittance-web.supportSent 7 -> 8; state_parameter mb17-remittance-web.obligation 70 -> 68; mood 0.010000000000000009_
  _causes: evt:world-vienna-1912:014803_

- **1949.01** `p9-social-daily-culture.cafe-newspaper/p9-social-daily-culture.cafe-newspaper.give-seat` tags: daily, culture, leisure, cafe, music, walk, task, task:daily
  Lena只喝了半杯就看见门口站着等位的老主顾，手里转着帽子。Lena把报纸叠好放回木架，起身让出窗边的位子，一杯 Melange 三十赫勒，侍者点头致意，没再收第二杯的钱。走出门时雨小了些，Lena站在檐下理了理衣领，觉得这半个下午也不算白来。
  _effects: cash -0.3 (一杯 Melange 的价钱); reputation 0.03; mood 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-141_

- **1949.04** `oj18-zoo.night::ctx-vienna-postwar-1945::milieu-tenement/meat-ledger` tags: zoo, animals, night, keeper, work, odd_job, suspense, vienna
  肉商的账本上少了二十公斤马肉，Alois Hofer要Lena签字认账。Lena知道是夜班门房把肉转卖给了普拉特的香肠摊，但门房是Alois Hofer的小舅子。Lena不签，第二天被调去扫兽栏；臭味洗了三遍还在指甲缝里。
  _effects: reputation -0.03; cash -1 (lost the night-shift supplement); state_add oj18-odd-apprenticeship state:world-vienna-1912:928; flag +refused_meat_ledger; knowledge “少掉的二十公斤马肉被夜班门房卖给了香肠摊，门房是园长的亲戚。”; role; flag +odd_job_apprentice_

- **1949.04** `vienna-legacy-worklife.sick-fund/sick-fund.keep-quiet` tags: legacy, work, family, reform, ordinary_life, injury
  止咳药水是褐色的，瓶口塞着软木塞，摇一摇会起沫。Lena看着工友把表折成小块，折了三折才塞进帽檐。墙上的规章还贴在那里，纸角被风掀起，没人去按。
  _effects: health -0.040000000000000036 (没有正规病假，只能靠药水撑着); relation colleague with person-materialized-world-vienna-1912-4_

- **1949.10** `kernel-social.shared-stove::ctx-vienna-postwar-1945::milieu-tenement::shared-stove-scarcity/shared-stove.water-rota` tags: social, neighbor, everyday, laundry, cooperation, conflict, vienna, urban
  天没亮，Lena就去天井的水龙头前排着，替Anna 2占了一个位置。水来时两人把桶递来递去，Anna 2把最后半桶倒进Lena的锅里，说自家还有雨水。桶底结着薄冰，两人用围裙垫着手提。
  _effects: relation friend with person:evt:world-vienna-1912:001785:child; role; flag +water_rota; knowledge “天井的水龙头每天只开一小时，要提桶去排。”_

- **1950.01** `oj18-zoo.escape::ctx-vienna-postwar-1945::milieu-tenement/hid-the-chimp` tags: zoo, animals, escape, night, blame, work, odd_job, vienna
  马戏班老板Katharina Lechner在普拉特门口拦住Lena，说愿意出三十克朗买那只黑猩猩，还缺一个懂它脾气的驯养人。Lena没有答应，也没有报告；夜里，Lena把卡斯帕藏进废弃的鸟舍，每天多带一份面包。
  _effects: cash -1 (bread for the hidden chimpanzee); relation acquaintance with person:evt:world-vienna-1912:000086:child; state_parameter oj18-odd-apprenticeship.strangeKnowledge 22 -> 30; state_add oj18-workplace-legend state:world-vienna-1912:976; mood -0.020000000000000018; flag +hid_chimp; knowledge “卡斯帕藏在废弃鸟舍里，听见面包纸响就会从梁上下来。”; relation acquaintance with person-materialized-world-vienna-1912-151; role; flag +workplace_legend_

- **1950.01** `state_tick:oj18-odd-apprenticeship/strange-year/trusted-with-the-keys` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  两年过去，Lena已经能闭着眼说出哪块地板会响、哪盏煤气灯该在几点关。师傅把备用钥匙交下来，没有解释为什么第三把钥匙磨得最亮；Lena也没有问，只在巡查簿最后一页画了一个小小的记号。
  _effects: state_parameter oj18-odd-apprenticeship.trust 18 -> 28; state_parameter oj18-odd-apprenticeship.strangeKnowledge 30 -> 40; state_parameter oj18-odd-apprenticeship.nightsWorked 0 -> 24; cash 2 (night-shift wages); skill_

- **1950.01** `r13-fam.ask-neighbour-help::ctx-vienna-postwar-1945::milieu-tenement/borrowed-coal` tags: task, social, neighbor, help, poverty, vienna, urban, postwar
  Lena把空煤筐拎到隔壁门口，说只借一筐，等手头松了就还。Emil看了看筐底的锈，进屋铲了半筐，又从灶边拿了两块引火的柴。Lena道谢时，Emil说这条走廊里借东西要记着，不是记在纸上。
  _effects: food; condition; flag +borrowed_coal_from_neighbour_

- **1950.02** `vienna-tenement-neighbors.lost_room_key/key_stolen_by_stranger` tags: home, social, family, housing
  Lena记得出门时钥匙还在，回来却没了。Mitzi 2说下午看见一个穿灰外套的男人在楼道里转悠，手里晃着一把铜钥匙。两人下楼查看，房门虚掩，抽屉被拉开，攒着买煤的六克朗不见了。Mitzi 2陪着Lena去街角警察岗亭报了案，警察记下灰外套，说会留意。
  _effects: cash -6 (被盗的买煤钱); relation friend with person:evt:world-vienna-1912:002748:child; mood -0.010000000000000009_

- **1950.03** `p9-gap-adult-ordinary-day.market-closing/market-closing.fish-heads` tags: adulthood, daily, leisure, neighborhood, ordinary, market, food, bargain
  鱼摊案板上的冰碴子踩在脚下咯吱响。Katharina 2把鱼鳃抠干净了才递过来，说这几个头是今天卖剩的鲤鱼。Lena回家烧了半锅水，姜片一下锅，厨房里那股腥气就压下去了一半。
  _effects: food; health 0.019999999999999997 (喝上了热鱼汤); relation acquaintance with person-materialized-world-vienna-1912-66_

- **1950.06** `vienna-adult-social.burial-fund/burial-fund.paid` tags: adulthood, social, work, family
  车间里管互助会的Alois Hofer 2在午休时把本子摊在Lena的工具箱上，说这个月还差最后一份月钱。Lena从马甲内袋摸出二十个克罗伊策，Alois Hofer 2当着他的面在本子上画了钩。
  _effects: cash -0.3 (缴纳丧葬互助会的月钱); relation colleague with person-materialized-world-vienna-1912-141; reputation 0.04000000000000001_

- **1950.12** `state_reaction:mb17-remittance-web/family-emergency` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  故乡来了一封电报，说屋顶塌了一角，老人暂时住到邻居家。Lena当晚就去邮局，把本来留着交学费的钱先汇了出去；回家后，他把墙上的缴费单取下来，折好放进抽屉。
  _effects: state_parameter mb17-remittance-web.obligation 68 -> 78; state_parameter mb17-remittance-web.arrears 5 -> 6; cash -3 (an emergency money order sent home)_
  _causes: evt:world-vienna-1912:015637_

- **1951.01** `state_tick:mb17-remittance-web/remittance-year/month-behind` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  这个月厂里少发了工钱。Lena把汇款单填到一半又放下，先给房东送去一部分；夜里他给故乡写信，说“下个月一定补上”，写完把信纸折了三折，像怕它自己会开口。
  _effects: cash -1 (the rent was paid first); state_parameter mb17-remittance-web.arrears 6 -> 7; state_parameter mb17-remittance-web.obligation 78 -> 82_

- **1951.01** `state_tick:oj18-workplace-legend/story-year/story-holds` tags: oj18-workplace-legend, work, legend, odd_job, rumor, identity, night, state
  又有人来问那个老故事。Lena把烟按灭，从头讲了一遍，连哪天下雨、哪盏灯坏了都没有改。听的人散了以后，学徒在门口说“跟上次一样”；Lena知道，至少这一版还能再撑几年。
  _effects: state_parameter oj18-workplace-legend.legend 20 -> 23; state_parameter oj18-workplace-legend.truth 55 -> 57; state_parameter oj18-workplace-legend.toldCount 0 -> 1; reputation 0.01999999999999999_

- **1951.01** `r13-fam.confront-rumour::ctx-vienna-postwar-1945::milieu-tenement/rumor-spread` tags: task, social, rumor, reputation, conflict, vienna, urban, postwar
  Lena越说越快，Ferdinand Weiss 2反而往后退，说被冤枉的人才会这么急。Franz Weiss低头搓衣服，一句话也没接。第二天，Lena去市场买盐，摊主把秤盘往回一收，说今天不赊账。
  _effects: reputation -0.1; condition; flag +rumor_grew_after_confrontation; relation rival with person-materialized-world-vienna-1912-71_

- **1951.01** `state_reaction:oj18-workplace-legend/the-story-turns` tags: oj18-workplace-legend, work, legend, odd_job, rumor, identity, night, state
  酒馆里有人把另一件旧事也讲成了Lena的遭遇：同样的雨夜、同样的钥匙，连结尾都差不多。Lena听见时没有打断，只把杯子往桌角推了推。
  _effects: state_parameter oj18-workplace-legend.legend 23 -> 28; state_parameter oj18-workplace-legend.truth 57 -> 54; knowledge “有人把另一件旧事算在了我头上，只因为我的名字已经成了一个故事。”_
  _causes: evt:world-vienna-1912:016264_

- **1951.02** `vienna-medical-treatment.toothache/barber-pull` tags: health, medical, family, money
  理发铺里还坐着等刮脸的老主顾，肥皂味和烟味混在一起。弗朗茨把围布往Lena胸前一系，说忍着点。钳子第一次滑脱，第二次才夹稳，牙出来时带着一小块肉，他用明矾水按住了。
  _effects: cash -1.2 (理发师拔牙收费); health 0.03 (病牙被拔除但手法粗糙)_

- **1951.06** `vienna-social-movement.aftermath/keep-the-list` tags: development, social_movement, organization, consequence
  Lena把第二区夜班出租合作社的名单藏进缝纫机抽屉的夹层。名单上有二十几个名字，其中两个已经搬走，一个被工厂开除。Lena没有把最后一行划掉。
  _effects: flag +movement_list_holder; reputation 0.03_

- **1951.10** `r3-mig.property-expropriation::ctx-vienna-postwar-1945::milieu-tenement::reform-property-review/inventory-and-seal` tags: migration, property, expropriation, home, politics, vienna, urban, postwar
  Anna 2把一张清单摊在钢琴上，说这间屋按“敌产”登记，家具要逐件编号。Lena说钢琴是母亲的，Anna 2说“那就写母亲的名字，东西还是不能动”。他在琴盖上贴了一张封条，封条压住了琴键。
  _effects: condition; flag +apartment_listed_as_enemy_property; relation rival with person:evt:world-vienna-1912:001785:child; knowledge “the piano is sealed under the enemy property inventory”; relation acquaintance with person-materialized-world-vienna-1912-130_

- **1952.01** `state_expire:oj18-odd-apprenticeship` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  Lena的「奇职学徒」到期；相关安排结束。
  _effects: state_remove oj18-odd-apprenticeship state:world-vienna-1912:928; role; flag -odd_job_apprentice_

- **1952.01** `state_expire:oj18-workplace-legend` tags: oj18-workplace-legend, work, legend, odd_job, rumor, identity, night, state
  Lena的「职场传说」到期；相关安排结束。
  _effects: state_remove oj18-workplace-legend state:world-vienna-1912:976; role; flag -workplace_legend_

- **1952.01** `p10-family-tasks.appeal-inheritance/appeal-inheritance.half` tags: adulthood, family, social, marriage, care, inheritance, task, appeal
  办事处的职员把信读了第二遍，在清单上添了Lena的名字。存款八十四克朗，一人四十二。兄弟签完字把笔按在纸上，出了门就往另一头走。Lena把怀表留在桌上，说这个给你，兄弟没回头。
  _effects: cash 42 (分得父亲存款的一半); relation_end kin with person-phase15-Hedwig-world-vienna-1912; mood 0.040000000000000036_

- **1952.01** `state_reaction:mb17-remittance-web/border-closes` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  边境又收紧了，往故乡的列车要换乘三次。邮局说汇款还能走，但信可能压在路上；Lena还是把两张单子一起递进窗口，像把一句话交给一个不保证送达的人。
  _effects: state_parameter mb17-remittance-web.arrears 8 -> 10; mood -0.040000000000000036; flag +mb17_border_slow_letters_
  _causes: evt:world-vienna-1912:017029_

- **1952.04** `p9-gap-adult-solitude.remake-coat/remake-coat.crooked-sleeves` tags: adulthood, daily, solitude, ordinary, home, mending, clothing, household
  Lena的剪刀钝得咬布，一剪下去袖口走了斜线。她索性把两只袖子都裁短，袖边用灰线锁了一圈。锁边时线太短，接到第三段才够，右手食指被针顶出个红印，改完像件旧式的短褂。
  _effects: skill_

- **1952.06** `state_reaction:mb17-remittance-web/family-emergency` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  故乡来了一封电报，说屋顶塌了一角，老人暂时住到邻居家。Lena当晚就去邮局，把本来留着交学费的钱先汇了出去；回家后，他把墙上的缴费单取下来，折好放进抽屉。
  _effects: state_parameter mb17-remittance-web.obligation 82 -> 92; state_parameter mb17-remittance-web.arrears 7 -> 8; cash -3 (an emergency money order sent home)_
  _causes: evt:world-vienna-1912:016713_

- **1952.11** `p9-gap-adult-unemployed.labour-exchange/exchange-fee-lost` tags: adulthood, unemployment, casual_labour, poverty, daily, labour_exchange, bureaucracy
  一克朗是Lena身上最后一张整票。纸条上的地址在城郊，坐电车又花了几赫勒。工头叼着烟说你来晚了，Lena攥着纸条站了一会儿，回程的路走了一个钟头。
  _effects: cash -1 (职业介绍所登记费); relation acquaintance with person-materialized-world-vienna-1912-137_

- **1953.01** `state_tick:mb17-remittance-web/remittance-year/month-behind` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  这个月厂里少发了工钱。Lena把汇款单填到一半又放下，先给房东送去一部分；夜里他给故乡写信，说“下个月一定补上”，写完把信纸折了三折，像怕它自己会开口。
  _effects: cash -1 (the rent was paid first); state_parameter mb17-remittance-web.arrears 12 -> 12; state_parameter mb17-remittance-web.obligation 92 -> 96_

- **1953.01** `kernel-health.task-house-call::ctx-vienna-postwar-1945::milieu-tenement::house-call-medical-students/house-call-medical-teaching` tags: health, task, house_call, care, poverty, vienna, urban, postwar
  医院派来一名实习医生，身后跟着两个学生。他们把Lena的胸口听了个遍，最后请来上级；药费减半，但Lena被当成了讲课的病例。学生们走后，实习医生把听诊器在手里捂了很久，才敢再贴上来。
  _effects: cash -4 (reduced fee for a teaching-house call); health 0.03 (examined by a teaching team); condition; role; knowledge “教学出诊会有实习医生和学生轮流听诊，最后请上级定方案，药费可以减半。”_

- **1953.02** `state_reaction:mb17-remittance-web/border-closes` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  边境又收紧了，往故乡的列车要换乘三次。邮局说汇款还能走，但信可能压在路上；Lena还是把两张单子一起递进窗口，像把一句话交给一个不保证送达的人。
  _effects: state_parameter mb17-remittance-web.arrears 10 -> 12_
  _causes: evt:world-vienna-1912:017300_

- **1953.06** `vienna-medical-treatment.sanatorium/sanatorium-go` tags: health, medical, family, money
  疗养院的护士接过行李，把床号写在小黑板上。Lena躺下时听见走廊尽头有人在放唱片，咳嗽没那么紧了。安娜的信第三天到，说花浇过了，房东没来催租。
  _effects: cash -12 (疗养院车票和住宿押金); health 0.12000000000000001 (疗养院松林空气和正规休养); relation friend with person-materialized-world-vienna-1912-132_

- **1953.11** `vienna-housing-move.flat-viewing/flat-viewing-too-damp` tags: housing, home, rent, family, money
  Lena在单间里站了一刻钟，脚底发潮，墙纸底下透出一股霉味。看门人说刷一层石灰就好，Franz Moser 2却在门口轻轻咳了一声，提醒这背面没有阳光。Lena把定金收回口袋，谢过看门人，宁可多付三克朗，也不愿把湿气带进夜里。
  _effects: flag +still_looking_for_room_

- **1954.01** `p9-social-daily-culture.lending-library/p9-social-daily-culture.lending-library.pay-deposit` tags: daily, culture, leisure, cafe, music, walk, task, task:knowledge
  Lena从内袋里数出两克朗压在柜台上，Friedrich Hofer 2翻开借书卡，用铅笔把上次迟还的四天圈出来，还是把小说递了过来。Lena把书塞进外套里侧，出门就翻到第一页，边走边读，差点撞上推手推车的菜贩；两克朗换来的不只是一本小说，还有一整个下午的安静。
  _effects: cash -2 (租书店借小说的押金); skill; mood 0.040000000000000036; relation acquaintance with person-materialized-world-vienna-1912-140_

- **1954.01** `state_reaction:mb17-remittance-web/wages-arrive` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  厂里补发了一笔拖欠的工钱。Lena没有先还杂货铺的账，而是去邮局多填了一张汇款单；回来的路上，他给自己买了一支最便宜的烟，站在桥上看了一会儿水，才把剩下的钱数清楚。
  _effects: cash 1 (the factory paid part of the arrears); state_parameter mb17-remittance-web.supportSent 8 -> 9; state_parameter mb17-remittance-web.obligation 96 -> 94; mood 0.010000000000000009_
  _causes: evt:world-vienna-1912:018502_

- **1954.03** `state_reaction:ml18-sudden-fortune/a-relative-remembers` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  一个多年没走动的亲戚提着一盒点心上门，先问Lena的身体，再问那笔钱是怎么来的。临走时他说起小时候替Lena家垫过一冬天的煤钱，数字记不清了，但意思很清楚。
  _effects: state_parameter ml18-sudden-fortune.claims 0 -> 1; flag +windfall_claim_by_relative_
  _causes: evt:world-vienna-1912:018072_

- **1954.09** `vienna-medical-treatment.toothache/barber-pull` tags: health, medical, family, money
  理发铺里还坐着等刮脸的老主顾，肥皂味和烟味混在一起。弗朗茨把围布往Lena胸前一系，说忍着点。钳子第一次滑脱，第二次才夹稳，牙出来时带着一小块肉，他用明矾水按住了。
  _effects: cash -1.2 (理发师拔牙收费); health 0.03 (病牙被拔除但手法粗糙)_

- **1955.01** `state_reaction:ml18-sudden-fortune/a-relative-remembers` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  一个多年没走动的亲戚提着一盒点心上门，先问Lena的身体，再问那笔钱是怎么来的。临走时他说起小时候替Lena家垫过一冬天的煤钱，数字记不清了，但意思很清楚。
  _effects: state_parameter ml18-sudden-fortune.claims 2 -> 3; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:018597_

- **1955.01** `state_reaction:ml18-sudden-fortune/the-papers-hear-about-it` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  报纸的社会版把Lena家的门牌号和那笔钱的数目印在一起，标题是“一笔不该有的好运”。第二天门口多了两个陌生人，一个说是远亲，一个说代表一家孤儿院。
  _effects: state_parameter ml18-sudden-fortune.public true -> true; state_parameter ml18-sudden-fortune.claims 3 -> 5; reputation -0.020000000000000004; flag +windfall_went_public_
  _causes: evt:world-vienna-1912:018787_

- **1955.01** `ml18-tax.audit-of-the-windfall::ctx-vienna-postwar-1945::milieu-tenement/hide-the-ledger` tags: tax, legal, money, windfall, bureaucracy, comic, vienna, urban
  Josef Weiss 2把账本塞进钢琴后面的夹层，说等风声过去再拿出来。Grete Winter第二次来时带了一个记录员和一张搜查令；钢琴被挪开时，琴键响了一串不成调的音。Lena看见黑皮本翻开的那一页上，已经用红笔圈出了三笔利息。
  _effects: cash -10 (the accountant's fee for hiding the ledger); state_add under-investigation state:world-vienna-1912:1201; relation colleague with person-materialized-world-vienna-1912-115; knowledge “黑皮本上被红笔圈出的三笔利息都没有报税。”; mood -0.030000000000000027_

- **1955.01** `state_tick:ml18-sudden-fortune/fortune-year/money-keeps-working` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  一年过去，钱没有变多，却也没有一下花完。Lena把一部分存进邮局储蓄所，一部分借给楼下的鞋匠；鞋匠每月送来一双补好的鞋，利息就夹在鞋垫下面。街口的杂货商开始把好面粉留到Lena来的时候。
  _effects: cash 2 (interest and small repayments on the windfall); state_parameter ml18-sudden-fortune.claims 5 -> 6; mood 0.010000000000000009_

- **1955.01** `state_expire:mb17-remittance-web` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  Lena的「往故乡汇钱的户」到期；相关安排结束。
  _effects: state_remove mb17-remittance-web state:world-vienna-1912:729_

- **1955.01** `p9-work-jobsearch.ask-trial/ask-trial.no-vacancy` tags: work, job_search, negotiation, wages, employment, task, trial, factory
  工头说眼下没有空缺，让他把名字和住址写在账本撕下的纸角上，说月底再来问。Lena看那张纸被随手压进抽屉，纸角还露出半截，知道多半不会有人翻。他道过谢，往街尾另一家走去。
  _effects: mood -0.010000000000000009; relation acquaintance with person-materialized-world-vienna-1912-129; relation acquaintance with person-materialized-world-vienna-1912-129_

- **1955.03** `statistical_infection`
  Lena在Leopoldstädter Zinshaus, gemeinsamer Gang病倒了，肺炎让身体发热、虚弱，接下来的日子只能卧床。

- **1955.06** `statistical_illness_worsened`
  Lena的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1955.07** `vienna-legacy-worklife.hours-ledger/hours-ledger.refuse` tags: legacy, work, family, reform, ordinary_life
  工头把表折成四折塞进围裙口袋，说“你会后悔的”。Lena当天下午去账房窗口排队，窗上的铁栅栏有股锈味。账房先生翻了半天蓝皮本子，最后从抽屉里数出八克朗硬币，一枚一枚推过台面。
  _effects: cash 8 (追回的拖欠计件工资); reputation -0.03; relation colleague with person:evt:world-vienna-1912:000362:child_

- **1955.09** `statistical_recovery`
  Lena熬过了这场肺炎，能坐起来喝一点汤，但身体还很虚。

- **1955.10** `p9-gap-adult-unemployed.labour-exchange/exchange-fee-lost` tags: adulthood, unemployment, casual_labour, poverty, daily, labour_exchange, bureaucracy
  介绍所的墙上钉着上百块木牌，大半翻过去露出灰白的背面。Alois Hofer收了一克朗，从抽屉里摸出纸条，墨水还没干透。第二天Lena站在工厂门口，门房说清扫工昨天就齐了。
  _effects: cash -1 (职业介绍所登记费)_

- **1956.01** `vienna-housing-move.rent-notice/rent-notice-neighbors-together` tags: housing, home, rent, family, money
  Lena把Friedrich Weiss 3和楼里另两户人家叫到楼道，把那张纸摆在窗台上传看。看门人在楼梯拐角听着，说房东礼拜三来收钱。几家人合计好，到那天一起等在门厅，先把克朗递过去，再把修补的事一件件摆出来。Lena把纸折进围裙口袋，觉得人凑齐了话也硬气些。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-145; mood 0.040000000000000036; relation acquaintance with person-materialized-world-vienna-1912-145_

- **1956.01** `state_tick:ml18-sudden-fortune/fortune-year/money-keeps-working` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  一年过去，钱没有变多，却也没有一下花完。Lena把一部分存进邮局储蓄所，一部分借给楼下的鞋匠；鞋匠每月送来一双补好的鞋，利息就夹在鞋垫下面。街口的杂货商开始把好面粉留到Lena来的时候。
  _effects: cash 2 (interest and small repayments on the windfall); state_parameter ml18-sudden-fortune.claims 7 -> 8; mood 0.010000000000000009_

- **1956.01** `state_expire:under-investigation` tags: under-investigation, legal, police, investigation, risk, state, state_tick, state:under-investigation
  Lena的「被调查」到期；相关安排结束。
  _effects: state_remove under-investigation state:world-vienna-1912:1201_

- **1956.01** `p9-social-daily-culture.sunday-hill/p9-social-daily-culture.sunday-hill.reach-summit` tags: daily, culture, leisure, cafe, music, walk, task, task:daily
  Lena和Anna Weiss 3按原计划沿葡萄园间的土路往上走，鞋子沾满黄泥，到山顶时风把汗湿的衬衫吹得冰凉。下山在第一个酒棚坐下，两人合点了一壶新酒和一块面包，一共一克朗二十赫勒；Lena喝到第二杯时脸颊发烫，把剩下的半块面包包进手帕带回家，第二天腿酸，却睡得很沉。
  _effects: cash -1.2 (卡伦山酒棚的新酒和面包); food; health 0.019999999999999997 (星期天登山远足); relation friend with person-materialized-world-vienna-1912-139; mood 0.06000000000000005; relation acquaintance with person-materialized-world-vienna-1912-139_

- **1956.04** `vienna-tenement-neighbors.laundry_line_dispute/subject_yields_line` tags: home, social, family, housing
  Lena看Rosa 2盆里那几件小衬衫，把自家床单卷起来抱回屋，说等下午再晾。Rosa 2愣了一下，闷头把衣服挂好，收工回来时在Lena门口放了一小包用旧报纸裹的洗衣碱。Lena打开报纸，碱面里还掺着几粒粗盐。
  _effects: relation friend with person:evt:world-vienna-1912:003449:child; food_

- **1956.10** `vienna-women-housework.piecework-bundle/piecework.hide-defects` tags: gender, housework, home, labour, family
  篮底那两件领子卷得很紧，Lena用围裙角把篮沿擦了擦。Gustav Moser翻了翻面上几件，拿尺子比了比，没再往下。Franz Moser 2在走廊里问交了多少，Lena含混说了句够买面包。
  _effects: cash 0.7 (交活所得，含未返工的两件); mood -0.040000000000000036; reputation -0.020000000000000004_

- **1956.11** `state_reaction:ml18-sudden-fortune/a-relative-remembers` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  一个多年没走动的亲戚提着一盒点心上门，先问Lena的身体，再问那笔钱是怎么来的。临走时他说起小时候替Lena家垫过一冬天的煤钱，数字记不清了，但意思很清楚。
  _effects: state_parameter ml18-sudden-fortune.claims 6 -> 7_
  _causes: evt:world-vienna-1912:019375_

- **1957.01** `state_expire:ml18-sudden-fortune` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  Lena的「一笔突然到手的钱」到期；相关安排结束。
  _effects: state_remove ml18-sudden-fortune state:world-vienna-1912:1156_

- **1957.01** `r13-civ.soup-kitchen::ctx-vienna-postwar-1945::milieu-tenement/recognized-neighbor` tags: social, charity, soup_kitchen, hunger, volunteer, vienna, urban, postwar
  Lena舀到第七碗时，认出碗后面那张脸是楼下的Rosa 2。Rosa 2把帽檐压低，Lena什么也没问，只把勺子沉下去，多捞了一块土豆。后面的人开始敲碗。
  _effects: mood -0.050000000000000044; flag +saw_neighbor_in_soup_line; relation friend with person:evt:world-vienna-1912:003449:child; knowledge “the neighbor has been queueing at the soup kitchen”_

- **1957.03** `vienna-historical-social-movement.public-meeting/stay-and-tidy-chairs` tags: history, historical_process, social_movement, organization, politics
  椅子叠到一半，Rosa 2压低声音说今晚有三个人没投票就走了。Lena把最后一块瓜子壳扫进簸箕，说记住那三张脸，比上台多说一句有用。灯熄时大厅只剩木头发出的轻响。
  _effects: skill; relation acquaintance with person:evt:world-vienna-1912:007629:child; mood -0.020000000000000018_

- **1957.05** `vienna-church-community.tenement-prayer/rent-prayer-help` tags: faith, social, family, home
  Lena在楼梯间守夜时，邻居说起楼下老太太病重。
  _effects: condition; food; relation acquaintance with person:evt:world-vienna-1912:007493:child_

- **1957.09** `p9-gap-adult-ordinary-day.lost-dog/lost-dog.feed-bread` tags: adulthood, daily, leisure, neighborhood, ordinary, animal, neighbor
  狗的项圈上嵌着一块铜牌，磨得字迹模糊。Lena蹲在墙根，把面包撕成小块放在石板上，狗先闻了闻她的手指才低头吃。她摸了摸它的后颈，毛底下那根脊骨瘦得硌手。
  _effects: food; mood 0.030000000000000027_

- **1957.12** `p9-gap-adult-solitude.misdelivered-letter/misdelivered-letter.sugar-jar` tags: adulthood, daily, solitude, ordinary, home, letter
  Lena把信压在厨房的糖罐底下，想着明天再问。三天后糖罐渗了油，信角洇出一片深色，收信人的名字糊了半个。她把信拿到门房那儿，门房说这地址已经退过两回了。
  _effects: mood -0.030000000000000027; skill_
## Anton

Born 1912.01, died 1917.01 (age 5).
Education: none 0; occupation: none; roles: infant, child.

### State snapshot
No mechanism state was ever attached.

### 6 subject events

- **1913.01** `statistical_infection`
  Anton在Hofer-Wohnung, Leopoldstadt病倒了，痢疾让身体发热、虚弱，接下来的日子只能卧床。

- **1913.03** `statistical_illness_worsened`
  Anton的痢疾没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1913.06** `statistical_illness_worsened`
  Anton的痢疾没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1913.07** `statistical_recovery`
  Anton熬过了这场痢疾，能坐起来喝一点汤，但身体还很虚。

- **1914.04** `iw18-infancy.first-word::ctx-vienna-1912::milieu-tenement/a-word-for-bread` tags: infancy, first_word, memory, family, wonder, eerie, vienna, urban
  Anton指着桌上的面包说出一个短词，声音轻得像在试音。Josefine Hofer把面包掰下一角，泡进热水里喂给孩子；Anton吃完又指了一次，这次说得更清楚。厨房里的人都笑了，连灶上的水汽也像在往上冒。
  _effects: food; mood 0.03; flag +first_word_bread_

- **1917.01** `statistical_death/other` tags: death
  Anton在Leopoldstädter Zinshaus, gemeinsamer Gang突发急病，高热和虚弱持续了几天。医生没能给出明确诊断，Anton在一个夜里去世。Hedwig在场。
  _effects: death (急性疾病)_
## Hedwig

Born 1912.01, alive at 1957.
Education: apprenticeship 0; occupation: none; roles: infant, child, workshop_dogsbody, witness_in_servant_inquiry, grieving_mother, separated, teaching_case, day_laborer, cleared_name, renounced_inheritance, watched_by_police, grave_visitor, divorced, displaced_person, movement_member, letter_writer, witness.

### State snapshot
- cursed-by-wish [person] (ended 1957.1: the curse ended when the old story was told without a wish) parameters={"severity":0.7,"triggers":2} links={} ticks=0
- apprenticeship-contract [person] (ended 1928.1: the master ended the contract) parameters={"progress":11,"failures":2,"trade":"木工","paid":false} links={} ticks=3
- yf18-first-awakening [person] (ended 1929.1: duration expired) parameters={"intensity":61,"nerve":48,"talk":17,"reciprocated":true,"secret":true} links={"beloved":"Lena"} ticks=3
- failed-apprentice [person] (ended 1931.1: duration expired) parameters={} links={} ticks=1
- suspected-witchcraft [person] (ended 1931.2: 教区登记为无实据) parameters={"evidence":25,"danger":30,"accuserKnown":false,"healerConsulted":false} links={} ticks=0
- suspected-witchcraft [person] (ended 1936.1: duration expired) parameters={"evidence":14,"danger":20,"accuserKnown":true,"healerConsulted":false} links={} ticks=2
- suspected-witchcraft [person] (ended 1941.1: duration expired) parameters={"evidence":9,"danger":45,"accuserKnown":true,"healerConsulted":false} links={} ticks=4
- hs18-street-witness [person] (ended 1942.10: replaced_by:hs18-street-witness) parameters={"certainty":82,"danger":45,"retellings":0,"claim":"我用一桶煤换邻居家孩子躲过了一晚。","quiet":false} links={} ticks=1
- hs18-street-witness [person] (ended 1948.1: duration expired) parameters={"certainty":78,"danger":60,"retellings":2,"claim":"我签字证明那架钢琴是无人认领的。","quiet":false} links={} ticks=6
- ld18-public-desire [person] (ended 1949.1: duration expired) parameters={"spectacle":67,"rumorHeat":70,"defiance":40,"protection":10,"shame":22} links={} ticks=5
- suspected-witchcraft [person] (ended 1950.1: duration expired) parameters={"evidence":20,"danger":25,"accuserKnown":true,"healerConsulted":false} links={} ticks=1
- ml18-sudden-fortune [household] (ended 1955.1: duration expired) parameters={"principal":25,"spent":0,"claims":4,"public":true,"source":"旧合伙人的退款"} links={} ticks=1
- suspected-witchcraft [person] (ended 1956.1: duration expired) parameters={"evidence":15,"danger":20,"accuserKnown":true,"healerConsulted":false} links={} ticks=1
- pc20-second-chance [person] (active) parameters={"credibility":55,"debt":25,"hope":70,"suspicion":25} links={"counterpart":"Franz Berg"} ticks=0

### 248 subject events

- **1917.08** `p9-childhood-household.fever-night/called-corner-doctor` tags: childhood, family, household, home, siblings, illness, neighbors
  Gustav Berg披着外套去街角敲门，老医生过了半个钟头才提着皮包上楼。医生让Hedwig坐起来，把听诊器贴在背上，听完从纸包里抖出三撮药粉。Friedrich Hofer数出两克朗放在桌角，医生用铅笔头写：稀粥、温水、不要面包皮。
  _effects: cash -2 (出诊费和药粉); health 0.05999999999999999 (服药后热退了些); relation acquaintance with person-gustav-berg_

- **1917.12** `vienna-childhood-street.hoop/hoop-mother-call` tags: childhood, street, social, home
  二楼窗口有人喊了一声，Hedwig抬头应着，脚却没动。铁环卡在Mitzi Lechner的鞋边，Mitzi Lechner说要再玩一圈。Hedwig把铁钩递过去，说明天借你。Mitzi Lechner这才挪开脚，用鞋尖把铁环拨到Hedwig面前。
  _effects: relation friend with person-mitzi-lechner; relation friend with person-mitzi-lechner; mood -0.02_

- **1918.01** `p9-gap-childhood-chores.market-line/line-sold-out-potatoes` tags: childhood, household, chores, school, task, daily, market, food
  “卖完了。”三个字从窗口里传出来，Hedwig后面的队伍立刻散了一半。Hedwig没走，趴在窗台上看伙计扫面屑，直到人家挥手赶人。旁边摊子的土豆带着泥，Hedwig用围裙兜住，一枚一枚数铜板，回家报账时连找零都说清了。
  _effects: food; mood -0.030000000000000002; skill; relation acquaintance with person-materialized-world-vienna-1912-4_

- **1918.12** `vienna-early-childhood.fever-night/doctor-bill` tags: childhood, family, home, street
  Hedwig烧得嘴唇发干，Josefine Hofer把湿布敷上去，凉了再换，撑到窗外发白才去请医生。医生把听诊器贴在Hedwig背上，留下三包药粉，收了一古尔登。Josefine Hofer从围裙内袋里摸出硬币，一枚一枚排在桌上，差一点不够。
  _effects: cash -1 (医生的诊金); health 0.05999999999999999 (服药后退烧); mood -0.04999999999999999_

- **1919.01** `p9-gap-childhood-chores.laundry-help/laundry-three-heller` tags: childhood, household, chores, school, task, daily, laundry, work
  床单浸了碱水，沉得拽不动。Hedwig站在木凳上，把湿布一点点递过绳，水顺着肘弯滴进袖口。Anton Moser在绳头数夹子，最后一条挂好，从围裙口袋里摸出三枚赫勒，按进Hedwig掌心。晚上洗手时，虎口那道口子被水一蜇，Hedwig才看见。
  _effects: cash 0.03 (帮邻居晾床单挣的三赫勒); relation acquaintance with person-materialized-world-vienna-1912-7; relation acquaintance with person-materialized-world-vienna-1912-7; relation acquaintance with person-materialized-world-vienna-1912-15_

- **1920.01** `p9-gap-childhood-chores.market-line/line-half-flour` tags: childhood, household, chores, school, task, daily, market, food
  面粉袋压在胸口，越抱越沉。Hedwig前面的大婶一直往后靠，Hedwig就把膝盖顶住对方的篮子，硬留出半步。买到半袋面粉后，Hedwig的鞋跟留在人堆里，找回来时鞋面全是泥。回家路上布袋换了两次肩，赤脚踩过石板时脚底发麻。
  _effects: food; skill; relation acquaintance with person-materialized-world-vienna-1912-19; relation acquaintance with person-materialized-world-vienna-1912-17_

- **1921.01** `p9-gap-childhood-chores.laundry-help/laundry-dragged-docked-pay` tags: childhood, household, chores, school, task, daily, laundry, work
  “你看看这角。”Gustav Berg把床单拎起来，煤渣簌簌往下掉。Hedwig伸手去拍，反而把灰按进布纹里。Gustav Berg从工钱里数回两枚，只留一赫勒在Hedwig手心，让重洗那角。晚饭前Hedwig一直蹲在井台边，换了两盆水，指甲缝里全是黑泥。
  _effects: cash 0.01 (被扣后只剩一赫勒); mood -0.05; relation acquaintance with person-gustav-berg_

- **1921.09** `vienna-childhood-friends.courtyard-race/fell-on-wet-stones` tags: childhood, social, school, street
  晒衣绳上的水一滴一滴落在石板上。Hedwig跑到第二圈，鞋底一滑，膝盖先着地。Katharina Bauer从屋里端出半盆清水，蹲下冲掉伤口里的沙，又用手帕扎紧，说今天别跑了。
  _effects: relation acquaintance with person-katharina-bauer_

- **1922.01** `p9-gap-childhood-chores.market-line/line-both-families` tags: childhood, household, chores, school, task, daily, market, food
  队伍拐弯时，Rosa Lechner朝Hedwig招手。Hedwig挤过去，替两家把面包领出来，纸包用不同的绳结系住。家里人晚上解开绳结，先掂了掂份量，再问价钱；Hedwig把每一包的面包数、找零和欠的铜板都说了一遍，家里人听完才把两包分别收进柜子。
  _effects: food; relation acquaintance with person-rosa-lechner; skill_

- **1922.03** `vienna-childhood-street.market-errand/errand-lost-coin` tags: childhood, street, social, home
  土豆从围裙里滚出来，Hedwig蹲下去追，手心一松，三枚十克鲁泽的铜板叮叮当当掉在石板路上。两枚捡回来了，最后一枚滚进排水格栅，在铁条下转了个圈。Hedwig趴下去够，指甲刮在铁条上。回家Josefine Hofer数完钱，脸色沉下来，Hedwig站在桌边不敢动。
  _effects: cash -0.3 (铜板掉进下水道); relation kin with person-josefine-hofer; mood -0.06_

- **1923.01** `p9-gap-childhood-chores.laundry-help/laundry-three-heller` tags: childhood, household, chores, school, task, daily, laundry, work
  床单浸了碱水，沉得拽不动。Hedwig站在木凳上，把湿布一点点递过绳，水顺着肘弯滴进袖口。Helene Weiss在绳头数夹子，最后一条挂好，从围裙口袋里摸出三枚赫勒，按进Hedwig掌心。晚上洗手时，虎口那道口子被水一蜇，Hedwig才看见。
  _effects: cash 0.03 (帮邻居晾床单挣的三赫勒); relation acquaintance with person-materialized-world-vienna-1912-5; relation acquaintance with person-materialized-world-vienna-1912-5_

- **1923.10** `statistical_infection`
  Hedwig在Leopoldstädter Zinshaus, gemeinsamer Gang病倒了，肺炎让身体发热、虚弱，接下来的日子只能卧床。

- **1923.12** `statistical_illness_worsened`
  Hedwig的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1924.03** `statistical_illness_worsened`
  Hedwig的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1924.04** `statistical_recovery`
  Hedwig熬过了这场肺炎，能坐起来喝一点汤，但身体还很虚。

- **1925.01** `r13-edu.exam-eve::ctx-vienna-reform-1930::milieu-tenement/passed-entrance-exam` tags: education, exam, study, poverty, adolescence, reform, medical, schooling
  Hedwig把煤油灯芯剪短，省下油熬到后半夜。代数题做错三遍，Hedwig就用冷水拍脸，再把公式抄到手腕内侧。考试那天，监考把袖口翻了一遍，Hedwig还是把最后一道题解完了。放榜那天，Hedwig在人群后面站了很久，才敢往前挤。
  _effects: mood 0.06; flag +passed_entrance_exam; skill_

- **1925.11** `r15-work.master-takes-on::ctx-vienna-reform-1930::milieu-tenement/unpaid-trial` tags: work, craft, apprentice, trade, poverty, reform, medical, schooling
  Elisabeth Weiss先说试三个月，不给工钱，只管一顿午饭。家里同意了，因为多一张嘴比多一双手更难。Hedwig每天最早到，最晚走，三个月后师傅才把契约拿出来。
  _effects: food; mood -0.04000000000000001; state_add apprenticeship-contract state:world-vienna-1912:89; relation acquaintance with person-materialized-world-vienna-1912-40; education apprenticeship; role_

- **1926.01** `state_tick:apprenticeship-contract/workshop-year/mistake` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Hedwig废掉了一块料，师傅扣了工钱。晚饭时谁也没提这件事。
  _effects: state_parameter apprenticeship-contract.failures 0 -> 1; cash -1 (wasted material); mood -0.039999999999999994_

- **1926.01** `p9-childhood-youth-aspiration.join-a-club/joined-and-borrowed` tags: adolescence, education, aspiration, school, books, club, exam, task
  Hedwig跟着Otto Berg走进印刷厂后面的屋子，交了十赫勒会费，在借书簿上按了手印。他挑了一本讲蒸汽机的册子，封面烫金已经磨掉；管理员说下月十赫勒要按时交，书才能续借。
  _effects: cash -0.1 (工人青年会月费); skill; relation friend with person-materialized-world-vienna-1912-24; flag +workers_youth_member; mood 0.04; relation acquaintance with person-materialized-world-vienna-1912-24_

- **1926.04** `yf18-dare.prater-slide::ctx-vienna-reform-1930::milieu-tenement/ride-in-the-dark` tags: dare, prater, fairground, comic, friendship, reform, medical, schooling
  普拉特的木滑道在闭园后还亮着一盏值班灯。Hedwig和Emil从围栏底下钻进去，用一块麻袋垫着滑下来，木槽里的蜡味呛得人直笑。滑到底时，Luise Kral提着灯站在出口，问他们要不要再买一张票。
  _effects: mood 0.05; cash -1 (a late ticket paid to the watchman); reputation -0.01; relation friend with person-phase15-Emil-world-vienna-1912; flag +yf18_prater_stunt_

- **1926.06** `yf18-firstlook.tram-glove::ctx-vienna-reform-1930::milieu-tenement/return-it-at-the-gate` tags: first_love, love, tram, glove, youth, courtship, reform, medical
  下一站，Hedwig追下车，把那只手套递还给Lena。Lena说了一声谢谢，手指在毛线手套里缩了一下；Hedwig回到车上才发现自己坐过了两站，只好沿着环城路走回家。
  _effects: state_add yf18-first-awakening state:world-vienna-1912:115; relation friend with person-phase15-Lena-world-vienna-1912; mood 0.03; relation acquaintance with person-materialized-world-vienna-1912-51; flag +yf18_first_awakening_active_

- **1927.01** `yf18-firstlook.parish-dance::ctx-vienna-reform-1930::milieu-tenement/leave-before-the-last-dance` tags: first_love, dance, church, courtship, jealousy, reform, medical, schooling
  Hedwig在最后一支曲子前溜出礼堂，沿着教堂外墙走了一圈。窗子里传来手风琴声，Hedwig数到第三遍副歌才往家走；家里问舞会好不好，Hedwig说人太多，脚疼。
  _effects: state_parameter yf18-first-awakening.intensity 45 -> 39; state_parameter yf18-first-awakening.nerve 25 -> 22; mood -0.019999999999999997_

- **1927.01** `yf18-apprentice.press-guard::ctx-vienna-reform-1930::milieu-tenement/call-the-inspector` tags: apprenticeship, work, danger, machine, injury, refusal, reform, medical
  Hedwig趁小巷电影院去喝咖啡，跑到街角的工厂检查所，把卸下来的护板指给Friedrich Hofer看。Friedrich Hofer第二天带着卷尺来了，在压印机旁边量了很久；小巷电影院陪着笑，等门一关，就把Hedwig的工具从案子上扫进了木箱。
  _effects: relation employer with person-materialized-world-vienna-1912-4; reputation 0.03; state_parameter apprenticeship-contract.progress 8 -> 11; flag +yf18_reported_press; mood 0.03_

- **1927.01** `r2-leisure.cinema-fire::ctx-vienna-reform-1930::milieu-tenement::cinema-fire-reform/reported-blocked-fire-exit` tags: leisure, cinema, fire, panic, rescue, reform, medical, schooling
  Hedwig在检查那天看见消防水带被挪去压幕布，检查员一走，又挪了回去。Hedwig把这事告诉Mitzi Kral，Mitzi Kral说别多事，老板刚交了罚款。当晚电影放到一半，Hedwig一直盯着侧门，手心里全是汗。
  _effects: mood -0.06; reputation 0.02; condition; flag +reported_blocked_fire_exit; relation friend with person-materialized-world-vienna-1912-17; knowledge “the manager moved the fire hose back behind the screen”; relation acquaintance with person-materialized-world-vienna-1912-48_

- **1927.01** `state_tick:yf18-first-awakening/half-year-of-glances/answered-glance` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Hedwig在教堂门口或学校走廊里又遇见Lena。这一次对方先点了头，Hedwig准备好的整段话全忘了，只把手里的书换到另一只手上；回家后Hedwig才发现，自己把书拿倒了。
  _effects: state_parameter yf18-first-awakening.intensity 44 -> 49; state_parameter yf18-first-awakening.nerve 17 -> 25; state_parameter yf18-first-awakening.reciprocated false -> true; relation friend with person-phase15-Lena-world-vienna-1912; mood 0.03_

- **1927.01** `state_tick:apprenticeship-contract/workshop-year/mistake` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Hedwig废掉了一块料，师傅扣了工钱。晚饭时谁也没提这件事。
  _effects: state_parameter apprenticeship-contract.failures 1 -> 2; cash -1 (wasted material); mood -0.04000000000000001_

- **1927.01** `p9-childhood-youth-aspiration.ask-a-mentor/borrowed-specimen-book` tags: adolescence, education, aspiration, school, books, club, exam, task
  Rosa Bauer说自己眼睛不行了，带不了徒弟，但从帆布袋里抽出一本旧字样本，让Hedwig拿回去临摹。书皮用麻线缝过三次，扉页上有一行褪色的签名。少年双手接过来，在咖啡馆门口鞠了个躬。
  _effects: skill; relation acquaintance with person-materialized-world-vienna-1912-43; flag +typesetting_specimen_book; cash -1 (咖啡馆里请老师傅喝一杯); relation acquaintance with person-materialized-world-vienna-1912-43_

- **1927.01** `state_reaction:yf18-first-awakening/exam-week-distraction` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  考试周里，Hedwig把课本摊在桌上，眼睛却一直看着窗外那条电车线。笔记的页边多了几个没有写完的名字，Hedwig用橡皮擦掉，纸面起了毛。
  _effects: state_parameter yf18-first-awakening.intensity 49 -> 46; state_parameter yf18-first-awakening.talk 10 -> 12_
  _causes: evt:world-vienna-1912:003010_

- **1927.12** `yf18-friend.two-tickets::ctx-vienna-reform-1930::milieu-tenement/confront-at-the-cloakroom` tags: first_love, friendship, betrayal, dance, tickets, reform, medical, schooling
  Hedwig在衣帽间堵住Klara，问那两张票怎么到了Emil手里。Klara说Hedwig从来没敢开口，自己只是替Hedwig把话说了；Hedwig把票根揉成一团，塞进Klara的西装口袋，转身时撞翻了侍者的托盘。
  _effects: state_parameter yf18-first-awakening.intensity 39 -> 44; state_parameter yf18-first-awakening.talk 0 -> 10; state_parameter yf18-first-awakening.nerve 22 -> 17; relation friend with person-phase15-Klara-world-vienna-1912; relation friend with person-phase15-Emil-world-vienna-1912; reputation -0.02; mood -0.05_

- **1928.01** `r1-fam.sibling-rivalry::ctx-vienna-reform-1930::milieu-tenement/rivalry.neither` tags: family, siblings, rivalry, apprenticeship, craft, reform, medical, schooling
  Hermann Moser看了看兄弟俩的手，说两个人的指节都不够硬，谁也不收。Friedrich Hofer求了半天，Hermann Moser答应让两人一起干杂活，管饭不给钱。Lena干了三天就走了，Hedwig留下来扫地、磨刀，磨到第六个月，Hermann Moser才让她碰第一块好木料。
  _effects: cash 1 (同一把刨子); flag +worked_up_from_dogsbody; role; skill; relation acquaintance with person-phase15-Lena-world-vienna-1912; relation acquaintance with person-materialized-world-vienna-1912-16_

- **1928.01** `state_tick:yf18-first-awakening/half-year-of-glances/answered-glance` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Hedwig在教堂门口或学校走廊里又遇见Lena。这一次对方先点了头，Hedwig准备好的整段话全忘了，只把手里的书换到另一只手上；回家后Hedwig才发现，自己把书拿倒了。
  _effects: state_parameter yf18-first-awakening.intensity 56 -> 61; state_parameter yf18-first-awakening.nerve 40 -> 48; state_parameter yf18-first-awakening.reciprocated true -> true; relation friend with person-phase15-Lena-world-vienna-1912; mood 0.03_

- **1928.01** `state_transition:apprenticeship-contract/expelled` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick, failed-apprentice
  Hedwig从「学徒契约」转入另一段处境：the master ended the contract
  _effects: state_transition apprenticeship-contract -> failed-apprentice; flag +failed_apprenticeship; mood -0.08; role_

- **1928.01** `r13-civ.first-aid-course::ctx-vienna-reform-1930::milieu-tenement/fainted-at-demo` tags: health, first_aid, course, skill, school, reform, medical, schooling
  演示到骨折固定时，Luise Kral把夹板按在Hedwig的腿上，Hedwig忽然眼前发白，从凳子上滑下去。醒来时，Lena正拿湿毛巾拍Hedwig的额头，教室里有人在笑。
  _effects: mood -0.06; flag +fainted_during_first_aid_demo; relation acquaintance with person-luise-kral_

- **1928.10** `yf18-dare.bridge-rail::ctx-vienna-reform-1930::milieu-tenement/walk-the-rail` tags: dare, bridge, river, friendship, risk, reform, medical, schooling
  多瑙河上的铁桥在夜里只剩两排灯。Hedwig翻过栏杆，鞋底踩上结霜的钢梁，走了七步；Lena在桥头喊了一声，风把声音吹散。Hedwig翻回来时，Katharina Lechner把一支烟塞进Hedwig嘴里，手抖得点不着火。
  _effects: state_parameter yf18-first-awakening.intensity 46 -> 56; state_parameter yf18-first-awakening.nerve 25 -> 40; state_parameter yf18-first-awakening.talk 12 -> 17; reputation 0.019999999999999997; flag +yf18_walked_bridge_rail; mood 0.05_

- **1929.01** `state_expire:yf18-first-awakening` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Hedwig的「第一次心动」到期；相关安排结束。
  _effects: state_remove yf18-first-awakening state:world-vienna-1912:115; flag -yf18_first_awakening_active_

- **1929.01** `r13-edu.exam-eve::ctx-vienna-reform-1930::milieu-tenement/passed-entrance-exam` tags: education, exam, study, poverty, adolescence, reform, medical, schooling
  Hedwig把煤油灯芯剪短，省下油熬到后半夜。代数题做错三遍，Hedwig就用冷水拍脸，再把公式抄到手腕内侧。考试那天，监考把袖口翻了一遍，Hedwig还是把最后一道题解完了。放榜那天，Hedwig在人群后面站了很久，才敢往前挤。
  _effects: mood 0.06; skill_

- **1929.09** `r2-leisure.scullery-punishment::ctx-vienna-reform-1930::milieu-tenement::scullery-punishment-reform/reported-to-inspector` tags: domestic_service, abuse, punishment, burn, servant, reform, medical, schooling
  检查员来查佣工合同，小巷电影院让Hedwig把手藏在围裙下面。Hedwig没有藏，摊开掌心，那块新疤还没有褪成白色。检查员看了一眼，又看了一眼Elisabeth Winter 2，把名字写进本子。小巷电影院说这是烫衣服不小心，谁家没有这种事。
  _effects: reputation 0.05; flag +reported_iron_burn_to_inspector; role; knowledge “the inspector recorded the burn and the household address”; relation colleague with person-materialized-world-vienna-1912-61; relation acquaintance with person-materialized-world-vienna-1912-59; relation acquaintance with person-materialized-world-vienna-1912-57; relation acquaintance with person-materialized-world-vienna-1912-61_

- **1930.01** `curse15-betrayal.name-on-the-list::ctx-vienna-reform-1930::milieu-tenement/sold-the-letter` tags: betrayal, politics, investigation, curse, denunciation, secret, reform, medical
  Hermann Bauer 2把Hedwig托付保管的一封旧信卖给了收旧纸的人。信里提到几个已经不用的名字，买主又把信转给了另一个买主。Hedwig再见到那封信时，它被压在一块玻璃下面，标价是Hedwig半个月的工钱。
  _effects: cash -1 (买回自己的旧信); reputation -0.05; relation rival with person-materialized-world-vienna-1912-53; knowledge “我写的一封旧信被人压在玻璃下面标价出售。”; flag +private_letter_sold; relation acquaintance with person-materialized-world-vienna-1912-53_

- **1930.01** `state_reaction:cursed-by-wish/curse-betrayal` tags: cursed-by-wish, wish, curse, supernatural, revenge, special, state, state_reaction
  背叛发生后的夜里，Hedwig自己发起了高烧；Hermann Bauer 2第二天照常出门。没有人把这两件事放在一起。
  _effects: state_parameter cursed-by-wish.triggers 0 -> 1; mood -0.06_
  _causes: evt:world-vienna-1912:003974_

- **1930.01** `vienna-parish-aid.sick-call/sick-call.door-only` tags: faith, parish, mutual_aid, poverty, family
  Hedwig把药包和半块肥皂交给开门的孩子，嘱咐用水冲开、一天两次，就下了楼。楼梯间里孩子一直站在门口看着，手里攥着纸包，没关门。Hedwig走到二层又折回去，帮他把门带上，说自己家里也等着火。
  _effects: health 0.01 (没有久留，避开了病人的屋子); relation acquaintance with person-karl-kraus; mood -0.03_

- **1930.01** `r13-fam.care-sick-parent::ctx-vienna-reform-1930::milieu-tenement/parent-recovers` tags: task, care, health, parent, bedridden, duty, reform, medical
  Hedwig每天早晚给Friedrich Hofer翻身，把枕头拍松，再把药片碾碎拌进粥里。老人背上的褥疮结了一层薄痂，Hedwig用温水一点点擦，擦到自己的腰直不起来。第三周，Friedrich Hofer能扶着床沿坐起来，第一句话是问厂里有没有扣工钱。
  _effects: cash -3 (给床上的老人翻身); health -0.01 (给床上的老人翻身); condition; flag +nursed_parent_back_to_health; health 0.07 (recovered slowly under the subject’s care); relation kin with person-friedrich-hofer_

- **1930.08** `vienna-courtship-courtyard.family-table/nod-and-pots` tags: adulthood, courtship, partner, social, family, partnership
  汤喝到一半，Friedrich Hofer放下勺子点了头，但说得很清楚：先攒出一套锅碗、一只挂钟，再把话往下说。Hermann Winter在桌下用膝盖碰了碰Hedwig，Friedrich Hofer把最后一块煮牛肉推过来，饭桌上的空气总算松了；这一顿让对方家里管了饭，自家灶上省下两克朗的吃食，也吃出一个带条件的准信。
  _effects: relation partner with person-materialized-world-vienna-1912-47; relation kin with person-friedrich-hofer; food; relation acquaintance with person-materialized-world-vienna-1912-47_

- **1930.12** `vienna-housing-move.rent-notice/rent-notice-pay` tags: housing, home, rent, family, money
  Hedwig把通知念给Katharina Bauer听，Katharina Bauer摇头说是楼梯间那几块新玻璃的账。Hedwig去楼下杂货铺换开一张五克朗的纸币，回屋一枚一枚摆开数，煤箱底多留了二十赫勒。
  _effects: cash -2 (按月多付两克朗房租); food; mood -0.030000000000000027_

- **1931.01** `vienna-life-injury-recovery/clinic-treatment` tags: health, work, family
  Hedwig在受伤后的第三天去了诊所。医生清洗伤口、换药，收下诊费，嘱咐不要急着回机器旁。Hedwig把药方折好，回家路上买了纱布。
  _effects: health 0.05 (wound treatment); cash -8 (clinic and bandages); condition_
  _causes: evt:world-vienna-1912:004160_

- **1931.01** `vienna-family-childbirth/stillbirth` tags: family, childbirth, death, lifecycle, injury
  孩子生下来没有哭声。接生的人把布盖上去，Hermann Winter在楼梯间坐了很久；Hedwig在床上躺了三天，家里没有办葬礼，只去市政办事处登记，付了六克朗。登记表上母亲一栏写着Hedwig的名字；此后邻居提起Hedwig，只说“那个没了孩子的母亲”，柜子里还留着没拆的襁褓。
  _effects: health -0.05 (stillbirth); cash -6 (midwife and burial); role_

- **1931.01** `curse15-notice.the-second-illness::ctx-vienna-reform-1930::milieu-tenement/tells-the-priest` tags: curse, notice, illness, fear, knowledge, supernatural, reform, medical
  Hedwig在告解室里把事情说了一遍，没有提名字。神父沉默了很久，只问Hedwig是否愿意把那张纸交出来。Hedwig说没有纸。走出教堂时，Hedwig发现街对面有人一直在等，手里拿着一本新的登记册。
  _effects: state_add suspected-witchcraft state:world-vienna-1912:259; reputation -0.02; condition; mood -0.03999999999999998_

- **1931.01** `vienna-housing-move.flat-viewing/flat-viewing-too-damp` tags: housing, home, rent, family, money
  Hedwig在单间里站了一刻钟，脚底发潮，墙纸底下透出一股霉味。看门人说刷一层石灰就好，Anton Moser却在门口轻轻咳了一声，提醒这背面没有阳光。Hedwig把定金收回口袋，谢过看门人，宁可多付三克朗，也不愿把湿气带进夜里。
  _effects: mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-7; flag +still_looking_for_room_

- **1931.01** `state_expire:failed-apprentice` tags: failed-apprentice, craft, work, failure, stigma, state, state_tick, state:failed-apprentice
  Hedwig的「学徒契约终止」到期；相关安排结束。
  _effects: state_remove failed-apprentice state:world-vienna-1912:167_

- **1931.01** `r13-fam.negotiate-rent::ctx-vienna-reform-1930::milieu-tenement/rent-refused` tags: task, commerce, housing, rent, negotiation, reform, medical, schooling
  Maria Kral把收据本合上，说这条街上等着租的人排到了巷口。Hedwig把准备好的账目念到一半，Maria Kral已经转身去敲下一家的门。第二天，门缝里塞进来一张纸条，欠租的数目后面多了一个月。
  _effects: cash -8 (房东的收租日); condition; flag +rent_increase_refused; relation rival with person-maria-kral_

- **1931.02** `curse15-aftermath.the-inquiry::ctx-vienna-reform-1930::milieu-tenement/the-parish-clears-it` tags: witchcraft, investigation, reputation, rumor, legal, aftermath, reform, medical
  教区派人来问了两天，最后在登记册上写：无实据。Katharina Lechner不肯签字，笔被Friedrich Hofer收走了。Hedwig以为事情到此为止，直到发现邻居开始把自家孩子叫回屋里，只因为Hedwig在门口多站了一会儿。
  _effects: state_remove suspected-witchcraft state:world-vienna-1912:259; reputation 0.029999999999999995; relation rival with person:evt:world-vienna-1912:000086:child; flag +parish_found_no_evidence; mood -0.020000000000000018_

- **1932.01** `vienna-family-divorce/partner-moves-to-shared-housing` tags: family, marriage, divorce, housing, lifecycle, separation, household
  Hermann Winter把一只箱子和工票搬去合租房，带走一半锅碗。Hedwig留在Leopoldstädter Zinshaus, gemeinsamer Gang，把空出来的床租给一个学徒，用租金补房租；搬家花掉四克朗，Hedwig在户籍上成了分居的人，夜里听见隔壁床板响，总要愣一下。
  _effects: relation_end partner with person-materialized-world-vienna-1912-47; household; cash -4 (moving and separate goods（其中4克朗记入债务）); mood -0.06; role_

- **1932.01** `kernel-health.task-house-call::ctx-vienna-reform-1930::milieu-tenement::house-call-medical-students/house-call-medical-teaching` tags: health, task, house_call, care, poverty, reform, medical, schooling
  医院派来一名实习医生，身后跟着两个学生。他们把Hedwig的胸口听了个遍，最后请来上级；药费减半，但Hedwig被当成了讲课的病例。学生们走后，实习医生把听诊器在手里捂了很久，才敢再贴上来。
  _effects: cash -4 (reduced fee for a teaching-house call); health 0.03 (examined by a teaching team); condition; role; knowledge “教学出诊会有实习医生和学生轮流听诊，最后请上级定方案，药费可以减半。”_

- **1932.08** `ml18-luck.strongbox-in-the-wall::ctx-vienna-reform-1930::milieu-tenement/the-notes-are-still-good` tags: money, luck, housing, windfall, inflation, ownership, reform, medical
  泥瓦匠敲开卧室的旧墙，掉出一只锈死的铁盒；里面是一叠旧纸币、一枚银扣和一张当票。Helene Winter闻声上楼，说墙是他家的，盒子也该归他。Hedwig把当票翻过来，看见上面写着自己外祖母的名字，两个人都安静了一会儿。
  _effects: cash 45 (old banknotes found in the wall); state_add ml18-sudden-fortune state:world-vienna-1912:278; relation rival with person-helene-winter; relation acquaintance with person-materialized-world-vienna-1912-20; flag +found_strongbox; knowledge “铁盒里的当票写着外祖母的名字，纸币是很多年前的旧版。”; mood 0.06; relation acquaintance with person-materialized-world-vienna-1912-20; flag +sudden_fortune; reputation 0.020000000000000004; mood 0.030000000000000027_

- **1932.09** `vienna-historical-social-movement.district-list/demand-open-books` tags: history, historical_process, social_movement, organization, politics
  Hedwig把账本摊在灯下，一页一页念出日期和克朗数，念到买纸那笔时有人 From 门口咳嗽。Friedrich Hofer低头拨弄围巾穗子，没有替谁说话。桌子上的旧墨水瓶被碰倒，蓝墨慢慢洇进木纹。
  _effects: relation acquaintance with person-friedrich-hofer; reputation 0.039999999999999994; skill_

- **1932.12** `vienna-market-debt.coal-credit/coal-credit-full` tags: market, debt, money, home, shop
  邻居帮你把半筐煤抬上楼，楼梯窄，煤块滚了两级。你蹲下去捡，指甲缝里立刻嵌了黑泥。炉子生起来后，屋里那股潮冷气慢慢退了，你才想起晚饭还没着落。
  _effects: cash -1.5 (赊煤到期还款含利息（其中1.5克朗记入债务）); food; flag +coal_credit_debt_

- **1933.01** `state_reaction:ml18-sudden-fortune/a-relative-remembers` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  一个多年没走动的亲戚提着一盒点心上门，先问Hedwig的身体，再问那笔钱是怎么来的。临走时他说起小时候替Hedwig家垫过一冬天的煤钱，数字记不清了，但意思很清楚。
  _effects: state_parameter ml18-sudden-fortune.claims 2 -> 3; flag +windfall_claim_by_relative; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:005044_

- **1933.01** `state_reaction:ml18-sudden-fortune/the-papers-hear-about-it` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  报纸的社会版把Hedwig家的门牌号和那笔钱的数目印在一起，标题是“一笔不该有的好运”。第二天门口多了两个陌生人，一个说是远亲，一个说代表一家孤儿院。
  _effects: state_parameter ml18-sudden-fortune.public true -> true; state_parameter ml18-sudden-fortune.claims 3 -> 5; reputation -0.020000000000000004; flag +windfall_went_public_
  _causes: evt:world-vienna-1912:005061_

- **1933.01** `state_tick:ml18-sudden-fortune/fortune-year/money-slips-away` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  钱在一年里薄了一层：屋顶要修，姐夫来借，彩票站的老主顾说有个稳赚的买卖。Hedwig把账本翻到最后一页，发现写下的支出比记得的多出四克朗；窗外有人在敲铁皮，声音像在催账。
  _effects: state_parameter ml18-sudden-fortune.principal 40 -> 35; state_parameter ml18-sudden-fortune.spent 0 -> 5; cash -1 (the account does not balance（其中1克朗记入债务）); mood -0.020000000000000018_

- **1933.01** `p9-social-relationship-initiative.borrow-handcart/handcart-and-ten` tags: courtship, friendship, family, social, initiative, housing, task, task:social
  星期天搬家的前一晚，有人坐在印厂友人家的厨房里把事说全：车要借，十克朗也要借。对方合上账本，从抽屉里数出两张五克朗，说月底先还三克朗，剩下的按月摊。手推车的轮轴有点响，搬之前得先上油。
  _effects: cash 10 (友人借给搬家应急的十克朗); relation friend with person-materialized-world-vienna-1912-1; mood 0.04999999999999999; relation acquaintance with person-materialized-world-vienna-1912-1; relation acquaintance with person-materialized-world-vienna-1912-45_

- **1933.03** `ad20-train-journey::ctx-vienna-reform-1930::milieu-tenement/the-compartment-sleeps` tags: travel, train, stranger, everyday, public, newcomer, reform, medical
  车厢里暖得发困，Anna Weiss把窗户推开一条缝，又把带来的面包掰成两半。Hedwig接过一半，发现里面夹着一片薄薄的香肠。两个人没有交换姓名，到站时各走各的，Hedwig却记住了那片香肠的味道。
  _effects: mood 0.020000000000000018; food; flag +quiet_train; relation acquaintance with person:evt:world-vienna-1912:000477:child_

- **1933.04** `vienna-medical-treatment.sanatorium/home-rest` tags: health, medical, family, money
  安娜的汤锅外面包着旧毛巾，端进来时还烫手。Hedwig靠着枕头喝，喝一半咳一半。房东太太在走廊里故意大声说，肺病可不是闹着玩的，安娜探出头去，说医生讲了不传染。
  _effects: health 0.03 (在家休养但条件有限); food; cash -0.5 (房东要求的清洁费（其中0.5克朗记入债务）); relation friend with person-materialized-world-vienna-1912-19_

- **1933.04** `vienna-tenement-neighbors.lost_room_key/key_lost_landlady` tags: home, social, family, housing
  Hedwig把钥匙丢在了回家路上的有轨电车轨道旁，天黑也没找着。房东太太说换锁芯要一克朗五十赫勒，从下月房租里扣。Ferdinand Winter 2借给Hedwig一把旧挂锁，但锁鼻和门扣对不上，只能用铁丝拧着凑合。那夜Hedwig睡不踏实，总觉得有人在拧门。
  _effects: cash -1.5 (换锁芯费用（其中1.5克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-6; mood -0.06; relation acquaintance with person-materialized-world-vienna-1912-6_

- **1933.09** `vienna-courtship-courtyard.family-table/leave-before-dessert` tags: adulthood, courtship, partner, social, family, partnership
  问到后来，Friedrich Hofer提起别家有个更稳当的差事。Josef Huber 2把餐巾往桌上一放，说吃好了，先走。两人在楼梯间站住，Josef Huber 2说不是Hedwig的错，可下次再来还得一样坐这张桌子；Hedwig心里松了一点，也知道这顿饭没吃完，事情并没有过去。
  _effects: relation partner with person-materialized-world-vienna-1912-55; relation kin with person-friedrich-hofer; mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-55_

- **1934.01** `vienna-family-childbirth/daughter-born` tags: family, childbirth, death, lifecycle, birth, state, state:raising-child, raising-child
  Hedwig在Leopoldstädter Zinshaus, gemeinsamer Gang生下一个女婴，取名Maria 2。接生的人收六克朗，Josef Huber 2在走廊烧水，邻居借来一只摇篮；Hedwig起身时眼前发黑，三天后腰还像断了一样，孩子哭声响亮，把屋里的冷气都顶了回去。
  _effects: birth female; cash -6 (midwife fee（其中4克朗记入债务）); state_add raising-child state:world-vienna-1912:341_

- **1934.01** `curse15-betrayal.name-on-the-list::ctx-vienna-authoritarian-1934::milieu-tenement/the-accusation-fails` tags: betrayal, politics, investigation, curse, denunciation, secret, vienna, urban
  Anna Weiss在众人面前说Hedwig用诅咒害人。没有人接话，因为上个月Anna Weiss也用同样的话说过另一个人。事情没有闹大，但Hedwig发现，从此每次走进那间屋子，都有人先看Hedwig的手。
  _effects: reputation -0.03; relation rival with person:evt:world-vienna-1912:000477:child; state_add suspected-witchcraft state:world-vienna-1912:342; flag +accusation_echoed; mood -0.03999999999999998_

- **1934.01** `state_reaction:suspected-witchcraft/another-name` tags: suspected-witchcraft, witchcraft, rumor, religion, legal, reputation, fear, supernatural
  Anna Weiss在指控Hedwig的人面前添了一句话，说Hedwig曾经在夜里念过谁的名字。那句话没有证据，但登记册上又多了一行。Hedwig后来才知道，添这句话的人就是Anna Weiss。
  _effects: state_parameter suspected-witchcraft.evidence 15 -> 25; reputation -0.03; relation rival with person:evt:world-vienna-1912:000477:child_
  _causes: evt:world-vienna-1912:005677_

- **1934.01** `state_tick:ml18-sudden-fortune/fortune-year/money-keeps-working` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  一年过去，钱没有变多，却也没有一下花完。Hedwig把一部分存进邮局储蓄所，一部分借给楼下的鞋匠；鞋匠每月送来一双补好的鞋，利息就夹在鞋垫下面。街口的杂货商开始把好面粉留到Hedwig来的时候。
  _effects: cash 2 (interest and small repayments on the windfall); state_parameter ml18-sudden-fortune.claims 5 -> 6; mood 0.010000000000000009_

- **1934.01** `r13-work.factory-gate::ctx-vienna-authoritarian-1934::milieu-tenement/hired-as-hand` tags: work, hiring, factory, queue, cash, vienna, urban, crisis
  铁门只开了一条缝，Rosa Winter把人数到一百二十，才放最前面十个进去。Hedwig把冻裂的手摊在灯下，指节上的茧替她答了话。Rosa Winter在纸角写了个“明早六点”，Josef Stein被推到一边，脚边的麻袋口还开着，土豆滚进了排水沟。
  _effects: cash 2 (铁门开了一条缝); flag +work13_hired_at_factory_gate; role; relation colleague with person-materialized-world-vienna-1912-88; employment Tagelöhner @ org-winter-print; relation acquaintance with person-materialized-world-vienna-1912-88; relation acquaintance with person-materialized-world-vienna-1912-66_

- **1934.02** `vienna-legacy-worklife.hours-ledger/hours-ledger.sign` tags: legacy, work, family, reform, ordinary_life
  老工人凑近看那张表，说这纸比工资袋还薄。Hedwig把拇指蘸进印泥，按下去时听见工头说了句“下一个”。学徒在旁边数少掉的铜板，数到四十赫勒时不出声了。
  _effects: cash -1 (星期六下午减少的计件工钱（其中1克朗记入债务）); mood 0.04999999999999999; flag +accepted_hours_reform; relation acquaintance with person-materialized-world-vienna-1912-84_

- **1934.12** `vienna-market-household.market-credit/market-credit.pay-later` tags: home, market, food, social
  Hedwig捏着三个克朗硬币站在玛丽亚的菜摊前，土豆和洋葱已经装进布袋。周五结清时，玛丽亚用粉笔在小黑板上划掉名字，Marie Huber点点头。
  _effects: cash -3 (偿还市场赊账（其中3克朗记入债务）); food; relation acquaintance with person-marie-huber_

- **1935.01** `vienna-life-work-injury/dismissed-after-accident` tags: adulthood, labour, injury, unemployment
  Buchdruckerei Winter & Söhne在事故后第三天通知Hedwig不用再来了，说岗位不能一直空着。Hedwig拿着医院证明去工会，诊断书被工头压在抽屉里；治伤花去六克朗，Hedwig的手还没好，工作先没了，工牌交回去时手指还缠着纱布。
  _effects: unemployment (dismissed after accident); cash -6 (medical treatment（其中6克朗记入债务）)_

- **1935.01** `vienna-family-childbirth/stillbirth` tags: family, childbirth, death, lifecycle
  孩子生下来没有哭声。接生的人把布盖上去，Josef Huber 2在楼梯间坐了很久；Hedwig在床上躺了三天，家里没有办葬礼，只去市政办事处登记，付了六克朗。登记表上母亲一栏写着Hedwig的名字；此后邻居提起Hedwig，只说“那个没了孩子的母亲”，柜子里还留着没拆的襁褓。
  _effects: cash -6 (midwife and burial（其中6克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-10_

- **1935.01** `fm17-confession.velvet-box::ctx-vienna-authoritarian-1934::milieu-tenement/a-penitent-with-a-ledger` tags: faith, confession, suspected_witchcraft, investigation, priest, secret, doubt, vienna
  Hedwig没有说自己施了咒，只说害怕。Hermann Winter听完，从丝绒匣里取出一张空白纸，问Hedwig要不要给地方法官写一封信，把一切说清楚。Hedwig摇头；他把纸放回去，说：“那就先活着，别一个人待着。”
  _effects: mood 0.03999999999999998; relation acquaintance with person-materialized-world-vienna-1912-47; state_parameter suspected-witchcraft.evidence 25 -> 22; flag +fm17_confession_kept_close_

- **1935.01** `state_expire:ml18-sudden-fortune` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  Hedwig的「一笔突然到手的钱」到期；相关安排结束。
  _effects: state_remove ml18-sudden-fortune state:world-vienna-1912:278; flag -sudden_fortune_

- **1935.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Hedwig把Maria 2的旧课本包上书皮，又在本子上签了名。Maria 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Hedwig听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 20 -> 28; state_parameter raising-child.caregiverBurden 45 -> 42; mood 0.01999999999999999_

- **1935.01** `state_tick:suspected-witchcraft/rumor-season/whispers-fade` tags: suspected-witchcraft, witchcraft, rumor, religion, legal, reputation, fear, supernatural
  一年过去，Hedwig没有再点蜡烛，也没有再去那家后间。教堂的登记册翻到了新的一页，旧页边缘留着指甲划过的痕迹；街上的人开始讨论别的事。
  _effects: state_parameter suspected-witchcraft.evidence 22 -> 14; mood 0.01999999999999999_

- **1936.01** `vienna-family-childbirth/stillbirth` tags: family, childbirth, death, lifecycle
  孩子生下来没有哭声。接生的人把布盖上去，Josef Huber 2在楼梯间坐了很久；Hedwig在床上躺了三天，家里没有办葬礼，只去市政办事处登记，付了六克朗。登记表上母亲一栏写着Hedwig的名字；此后邻居提起Hedwig，只说“那个没了孩子的母亲”，柜子里还留着没拆的襁褓。
  _effects: cash -6 (midwife and burial)_

- **1936.01** `curse15-notice.the-second-illness::ctx-vienna-authoritarian-1934::milieu-tenement/calls-it-a-fever` tags: curse, notice, illness, fear, knowledge, supernatural, vienna, urban
  医生说只是换季的烧，Hedwig便也这么说。第二次退烧后，Hedwig把那张写满日期的纸烧了，灰倒进花盆。花盆里的植物活了下来，Hedwig因此更愿意相信巧合，也不再去数下一个十一天。
  _effects: flag +curse_dismissed_as_fever; condition; mood 0.03_

- **1936.01** `state_expire:suspected-witchcraft` tags: suspected-witchcraft, witchcraft, rumor, religion, legal, reputation, fear, supernatural
  Hedwig的「被疑巫术」到期；相关安排结束。
  _effects: state_remove suspected-witchcraft state:world-vienna-1912:342_

- **1936.01** `p9-social-daily-culture.last-standing-ticket/p9-social-daily-culture.last-standing-ticket.church-organ` tags: daily, culture, leisure, cafe, music, walk, task, task:culture
  Hedwig数了数前面攒动的人头，把口袋里的硬币又攥紧了些，转身离开队伍。走到街角的教堂时，管风琴正从敞开的门里传出来，Hedwig在最后一排长凳上坐下，听完整段前奏曲，一个赫勒也没花，只跪得膝盖发酸。出门时与Friedrich Berg道了别，约好下回还来排队。
  _effects: mood 0.03; relation acquaintance with person-materialized-world-vienna-1912-23; relation acquaintance with person-materialized-world-vienna-1912-23_

- **1936.02** `vienna-historical-social-movement.district-list/organize-relief-table` tags: history, historical_process, social_movement, organization, politics
  后屋的桌上摊着旧报纸，Hedwig用尺子画格子，一格一户，旁边写清煤价和面包房欠条。Hermann Bauer指着第三格说那家孩子咳了整夜，先划过去。蜡烛烧到桌沿时，名单终于能看懂了。
  _effects: skill; relation acquaintance with person:evt:world-vienna-1912:000324:child; mood 0.03_

- **1936.04** `r13-rel.friendship-test::ctx-vienna-authoritarian-1934::milieu-tenement::friendship-test-crisis/showed-the-ration-card` tags: relationship, friend, trust, test, accusation, vienna, urban, crisis
  配给站少了一袋面粉，Josef Stein说看见Hedwig最后一个离开。Hedwig没有争，只把自己的配给证摊在桌上，上面还粘着当天的印泥。Josef Stein看了很久，最后说也许是自己记错了。
  _effects: reputation 0.020000000000000004; role; relation friend with person-materialized-world-vienna-1912-66; relation acquaintance with person-materialized-world-vienna-1912-93_

- **1937.01** `vienna-family-childbirth/difficult-birth` tags: family, childbirth, death, lifecycle, birth, state, state:raising-child, raising-child
  Hedwig难产，接生的人守了两天。孩子最后生下来，取名Helene 2；Hedwig一直发烧，医院又收走二十克朗，Josef Huber 2把钟表送进当铺。Hedwig落下产后虚弱的毛病，抱孩子时手臂发抖，站久了眼前就发黑。
  _effects: birth female; condition; cash -20 (midwife and hospital（其中19克朗记入债务）); state_add raising-child state:world-vienna-1912:444_

- **1937.01** `curse15-notice.borrowed-mourning::ctx-vienna-authoritarian-1934::milieu-tenement/it-turns-in-the-hand` tags: curse, money, fear, client, ritual, supernatural, work, vienna
  Hedwig收了钱，却在灵堂里试着把那个名字指向Josef Huber 2。蜡烛刚点着，Hedwig自己的手先抖起来，火苗顺着袖口爬上去。Josef Huber 2扑灭了火，没有喊人，只把门打开。Hedwig走出去时，听见身后有人在数剩下的蜡烛。
  _effects: reputation -0.07; relation rival with person-materialized-world-vienna-1912-55; state_parameter cursed-by-wish.severity 0.6 -> 0.7; state_add suspected-witchcraft state:world-vienna-1912:445; flag +curse_recoiled_on_holder_

- **1937.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Hedwig把Maria 2的旧课本包上书皮，又在本子上签了名。Maria 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Hedwig听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 28 -> 36; state_parameter raising-child.caregiverBurden 42 -> 39; mood 0.01999999999999999_

- **1937.01** `kernel-family.inheritance::ctx-vienna-authoritarian-1934::milieu-tenement/inheritance.renounce-for-watch` tags: task, task:family, family, inheritance, siblings, estate, law, vienna
  Hedwig放弃存款，只拿走母亲的怀表；Lena答应替父亲还清杂货店的十一克朗。Alois Hofer在清单上注了一笔，两人在走廊里站了一会儿，Lena说下个月去上坟。Hedwig把表上弦，表针走得很响。
  _effects: relation kin with person-phase15-Lena-world-vienna-1912; role; flag +kept_family_watch; knowledge “兄弟答应替父亲还清杂货店的十一克朗。”_

- **1937.03** `df18-curse.name-in-the-door::ctx-vienna-authoritarian-1934::milieu-tenement/name-and-date` tags: curse, name, door, omen, neighbor, dark, supernatural, vienna
  Hedwig在自家门框上看见一行新刻的字，是自己的名字，下面还有当天的日期。刀痕很浅，像是用钥匙划的。Franz Berg说不是他，Hedwig也没有再问。那天夜里，Hedwig把门闩插了两遍，听见楼梯上有脚步声停了一下。
  _effects: mood -0.03; knowledge “门框上出现了我的名字和当天的日期。”; flag +df18_name_carved_on_door_

- **1937.11** `r2-law.eviction-hearing::ctx-vienna-authoritarian-1934::milieu-tenement/eviction-stayed` tags: law, eviction, housing, court, tenement, vienna, urban, crisis
  Helene Bauer只问了三个问题：欠了几个月、有没有孩子、有没有找过新住处。Hedwig说四个月、有两个、找过七家。Helene Bauer让Berta Berg 3把欠租单拿出来，算了算，说先付一个月，其余分三期；Berta Berg 3不同意，Helene Bauer说不同意就再排期，排到冬天。Mitzi Kral在旁听席上松了一口气。
  _effects: cash -12 (驱逐听证的十五分钟（其中12克朗记入债务）); flag +eviction_stayed_with_installment_plan; relation friend with person-materialized-world-vienna-1912-17; knowledge “the court will stay eviction if one month is paid and the re”; relation acquaintance with person-materialized-world-vienna-1912-83_

- **1938.01** `vienna-life-anschluss-1938/resists` tags: politics, persecution, 1938
  Hedwig在登记桌旁说了句“这里以前不是这样”。Rosa Lechner记下地址，当晚两个穿制服的人来敲门，把Hedwig带到警局，第二天放回来时脸上有伤。
  _effects: condition; role; cash -5 (fine and lost work（其中4克朗记入债务）)_

- **1938.01** `vienna-family-childbirth/stillbirth` tags: family, childbirth, death, lifecycle
  孩子生下来没有哭声。接生的人把布盖上去，Josef Huber 2在楼梯间坐了很久；Hedwig在床上躺了三天，家里没有办葬礼，只去市政办事处登记，付了六克朗。登记表上母亲一栏写着Hedwig的名字；此后邻居提起Hedwig，只说“那个没了孩子的母亲”，柜子里还留着没拆的襁褓。
  _effects: cash -6 (midwife and burial（其中6克朗记入债务）)_

- **1938.01** `curse15-notice.the-second-illness::ctx-vienna-authoritarian-1934::milieu-tenement/counts-the-interval` tags: curse, notice, illness, fear, knowledge, supernatural, vienna, urban
  Hedwig把两次背叛和两次发烧的日期写在同一张纸上，发现中间都隔着十一天。Hedwig没有告诉任何人，只把纸折成很小的一块，塞进缝衣盒的夹层。那天夜里，Hedwig第一次试着在门口撒盐，动作熟练得让自己停了一下。
  _effects: knowledge “背叛与发烧之间隔着十一天。”; flag +curse_counted; skill; mood -0.01999999999999999_

- **1938.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Hedwig把Helene 2的旧课本包上书皮，又在本子上签了名。Helene 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Hedwig听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 20 -> 28; state_parameter raising-child.caregiverBurden 45 -> 42; mood 0.01999999999999999_

- **1938.01** `state_tick:suspected-witchcraft/rumor-season/whispers-fade` tags: suspected-witchcraft, witchcraft, rumor, religion, legal, reputation, fear, supernatural
  一年过去，Hedwig没有再点蜡烛，也没有再去那家后间。教堂的登记册翻到了新的一页，旧页边缘留着指甲划过的痕迹；街上的人开始讨论别的事。
  _effects: state_parameter suspected-witchcraft.evidence 30 -> 22; mood 0.020000000000000004_

- **1938.01** `r13-fam.visit-grave::ctx-vienna-authoritarian-1934::milieu-tenement/flowers-placed` tags: task, family, grave, mourning, neighbor, grief, vienna, urban
  Hedwig陪Berta Weiss去公墓，把一把野菊放在新翻的土上。木牌上的名字被雨冲得发白，Berta Weiss用手指一笔一画描了一遍，描到最后一笔，指腹上全是泥。Hedwig没有劝，只蹲下来把歪掉的木牌扶正。
  _effects: cash -1 (公墓新翻的土); condition; flag +visited_a_grave_with_neighbour; role; relation friend with person-berta-weiss_

- **1938.11** `vienna-legacy-worklife.apprentice-wage/apprentice-wage.beer-with-senior` tags: legacy, work, family, reform, ordinary_life
  十二赫勒换来两杯淡啤酒，找零是四枚一赫勒的铜币。Hedwig把铜币收好，听师兄讲那年冬天的事，讲到一半师兄停了停，说“你别到处讲”。酒馆里有人拉手风琴，声音盖过了后半句。
  _effects: cash -1 (请师兄喝一杯啤酒（其中1克朗记入债务）); relation colleague with person-materialized-world-vienna-1912-7; skill_

- **1939.01** `vienna-family-childbirth/son-born` tags: family, childbirth, death, lifecycle, birth, state, state:raising-child, raising-child
  Hedwig在Leopoldstädter Zinshaus, gemeinsamer Gang生下一个男婴，取名Alois 2。工友凑的钱抵了一部分，家里还是从糖罐里数出六克朗给接生的人；Josef Huber 2把消息带到工厂，回来时把唯一的摇篮重新刷了一遍，Hedwig躺在床上出了一身虚汗。
  _effects: birth male; cash -6 (midwife fee（其中6克朗记入债务）); state_add raising-child state:world-vienna-1912:502_

- **1939.01** `fm17-confession.velvet-box::ctx-vienna-authoritarian-1934::milieu-tenement/the-seal-holds` tags: faith, confession, suspected_witchcraft, investigation, priest, secret, doubt, vienna
  Hedwig隔着木格说出邻居家的母牛、夜里的蜡烛和那个不肯散的梦。Rosa Lechner没有问名字，也没有说这是巫术；他只让Hedwig把蜡烛收进匣子，别再点。走出告解室时，Hedwig听见他在里面把丝绒匣的扣子扣上，声音很轻。
  _effects: mood 0.020000000000000004; relation acquaintance with person-rosa-lechner; state_parameter suspected-witchcraft.evidence 22 -> 17; flag +fm17_confession_sealed_

- **1939.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Hedwig把Maria 2的旧课本包上书皮，又在本子上签了名。Maria 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Hedwig听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 36 -> 44; state_parameter raising-child.caregiverBurden 39 -> 36; mood 0.020000000000000004_

- **1939.01** `state_tick:suspected-witchcraft/rumor-season/whispers-fade` tags: suspected-witchcraft, witchcraft, rumor, religion, legal, reputation, fear, supernatural
  一年过去，Hedwig没有再点蜡烛，也没有再去那家后间。教堂的登记册翻到了新的一页，旧页边缘留着指甲划过的痕迹；街上的人开始讨论别的事。
  _effects: state_parameter suspected-witchcraft.evidence 17 -> 9; mood 0.020000000000000004_

- **1939.01** `r13-fam.negotiate-rent::ctx-vienna-authoritarian-1934::milieu-tenement/rent-refused` tags: task, commerce, housing, rent, negotiation, vienna, urban, crisis
  Maria Stein把收据本合上，说这条街上等着租的人排到了巷口。Hedwig把准备好的账目念到一半，Maria Stein已经转身去敲下一家的门。第二天，门缝里塞进来一张纸条，欠租的数目后面多了一个月。
  _effects: cash -8 (房东的收租日（其中8克朗记入债务）); relation rival with person-materialized-world-vienna-1912-72; relation acquaintance with person-materialized-world-vienna-1912-72_

- **1939.10** `vienna-women-housework.wash-day/wash-day.send-out` tags: gender, housework, home, labour, family
  洗衣妇把工服从报纸里抖出来，翻开领口看了看油垢，点头收下。Hedwig转身回屋，铜板在围裙口袋里磕出轻响。Elisabeth Huber 2还在楼梯上嘟囔，说这钱不如买半斤猪油。
  _effects: cash -0.5 (请洗衣妇代洗工服（其中0.5克朗记入债务）); mood 0.03; relation acquaintance with person-materialized-world-vienna-1912-106; relation acquaintance with person-materialized-world-vienna-1912-106_

- **1940.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Maria 2这周主动擦了黑板。Hedwig把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 28 -> 31; mood 0.020000000000000004_
  _causes: evt:world-vienna-1912:008608_

- **1940.01** `vienna-family-childbirth/son-born` tags: family, childbirth, death, lifecycle, birth, state, state:raising-child, raising-child
  Hedwig在Leopoldstädter Zinshaus, gemeinsamer Gang生下一个男婴，取名Gustav 2。工友凑的钱抵了一部分，家里还是从糖罐里数出六克朗给接生的人；Josef Huber 2把消息带到工厂，回来时把唯一的摇篮重新刷了一遍，Hedwig躺在床上出了一身虚汗。
  _effects: birth male; cash -6 (midwife fee（其中5.2克朗记入债务）); state_add raising-child state:world-vienna-1912:551_

- **1940.01** `r15-curse.aftermath::ctx-vienna-authoritarian-1934::milieu-tenement/quiet-mercy` tags: curse, fear, supernatural, revenge, vienna, urban, crisis, war
  Ferdinand Moser病好以后来敲过门。两个人隔着门槛站了很久。Hedwig没有说原谅，只把一包药放在对方手里。Ferdinand Moser走后，Hedwig把门关上，背靠着它坐了一会儿。
  _effects: mood 0.05; relation acquaintance with person-materialized-world-vienna-1912-54; flag +curse_mercy; relation acquaintance with person-materialized-world-vienna-1912-54_

- **1940.01** `bc18-inherit.forty-seven-franz::ctx-vienna-authoritarian-1934::milieu-tenement/sell-the-horses` tags: inheritance, mistaken_identity, debt, funeral, work, absurd, family, vienna
  Hedwig把灵车和两匹马卖给了城西的殡仪馆，拿到的钱正好抵掉欠账，只剩下一盒黑手套和半瓶擦铜油。Alois Hofer说这笔遗产算是结清了；Hedwig却总觉得，自己像替一个陌生人做了一场没有尸体的买卖。
  _effects: cash 3 (卖掉灵车和马匹的余款); reputation -0.020000000000000004; relation acquaintance with person-materialized-world-vienna-1912-15; condition; flag +sold_inherited_hearse; mood -0.01_

- **1940.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Maria 2这周主动擦了黑板。Hedwig把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 20 -> 23; mood 0.019999999999999997_
  _causes: evt:world-vienna-1912:008798_

- **1940.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Hedwig把Helene 2的旧课本包上书皮，又在本子上签了名。Helene 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Hedwig听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 31 -> 39; state_parameter raising-child.caregiverBurden 42 -> 39; mood 0.020000000000000004_

- **1940.01** `state_tick:suspected-witchcraft/rumor-season/new-accuser` tags: suspected-witchcraft, witchcraft, rumor, religion, legal, reputation, fear, supernatural
  又一个人站了出来，说自家的母牛在Hedwig经过之后不再产奶。Hedwig没有辩解，因为辩解本身也需要被登记。Hedwig开始绕远路去市场，每月多出几枚铜币的车钱。
  _effects: state_parameter suspected-witchcraft.danger 35 -> 45; reputation -0.039999999999999994; cash -1 (绕远路增加的车钱（其中1克朗记入债务）); mood -0.04_

- **1940.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Hedwig把Alois 2的旧课本包上书皮，又在本子上签了名。Alois 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Hedwig听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 20 -> 28; state_parameter raising-child.caregiverBurden 45 -> 42; mood 0.02_

- **1940.01** `r13-fam.divorce::ctx-vienna-authoritarian-1934::milieu-tenement/property-split` tags: task, family, divorce, law, marriage, official, vienna, urban
  Hedwig不要赡养费，只要那台缝纫机和那只衣柜。Josef Huber 2起初不肯，Rosa Lechner把财产清单推到中间，说按法律一人一半。最后Hedwig拿走缝纫机，Josef Huber 2留下钟和柜子；两人在清单上签字时，笔尖把纸戳破了一个洞。
  _effects: cash -5 (登记簿上的注销线（其中5克朗记入债务）); condition; flag +divorce_with_property_split; role; relation rival with person-materialized-world-vienna-1912-55; relation_end partner with person-materialized-world-vienna-1912-55; knowledge “the sewing machine went to the subject, the clock to the par”_

- **1940.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Alois 2这周主动擦了黑板。Hedwig把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 28 -> 31; mood 0.02_
  _causes: evt:world-vienna-1912:009010_

- **1940.08** `hs18-blackout.cellar::ctx-vienna-authoritarian-1934::milieu-tenement/trade-for-shelter` tags: blackout, cellar, coal, neighbor, denunciation, history, vienna, urban
  Hedwig没有告发，也没有白帮忙。Helene Weiss把两桶煤分出一桶，换Hedwig在搜查时把楼上的孩子领到后院。成交时两人都没有提“煤”字，只说“今晚借个火”。
  _effects: state_add hs18-street-witness state:world-vienna-1912:552; relation acquaintance with person-materialized-world-vienna-1912-5; flag +traded_coal_for_shelter; mood 0.02_

- **1941.01** `curse15-notice.borrowed-mourning::ctx-vienna-authoritarian-1934::milieu-tenement/refuses-the-money` tags: curse, money, fear, client, ritual, supernatural, work, vienna
  Josef Moser 2把钱推过来，Hedwig又推回去。Hedwig说自己只是倒霉，不是什么会看事的人。Josef Moser 2把钱留在桌上走了，第二天又派人来取。Hedwig把那一夜省下来的蜡烛收进柜子，没有点过。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-81; flag +refused_curse_work; mood 0.020000000000000004; relation acquaintance with person-materialized-world-vienna-1912-81_

- **1941.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Hedwig被叫到学校，老师说Maria 2这学期总在课上看窗外。回家的路上，Hedwig没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 23 -> 18; state_parameter raising-child.caregiverBurden 45 -> 50; cash -2 (extra lessons and replacement pencils); mood -0.03_

- **1941.01** `state_expire:suspected-witchcraft` tags: suspected-witchcraft, witchcraft, rumor, religion, legal, reputation, fear, supernatural
  Hedwig的「被疑巫术」到期；相关安排结束。
  _effects: state_remove suspected-witchcraft state:world-vienna-1912:445_

- **1941.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Hedwig被叫到学校，老师说Gustav 2这学期总在课上看窗外。回家的路上，Hedwig没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 20 -> 15; state_parameter raising-child.caregiverBurden 45 -> 50; cash -2 (extra lessons and replacement pencils); mood -0.03_

- **1941.01** `state_tick:hs18-street-witness/memory-drift/holds` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Hedwig又把那天的顺序在脑子里走了一遍：先是门响，再是靴子，最后才是那声喊。细节还在，只是每讲一次，旁边就多出一点别人替你补上的颜色。
  _effects: state_parameter hs18-street-witness.certainty 80 -> 82_

- **1941.01** `r13-fam.write-missing-relative::ctx-vienna-authoritarian-1934::milieu-tenement/letter-returned` tags: task, family, letter, missing, war, literacy, vienna, urban
  信过了三个星期被退回来，信封上盖着“查无此人”，边角已经磨毛。Helene Moser不认得那四个字，让Hedwig念；Hedwig念成“还在路上”，把信折好放进抽屉。Helene Moser点点头，第二天又问有没有回信。
  _effects: cash -1 (没有地址的信（其中1克朗记入债务）); mood -0.12; condition; flag +letter_returned_undeliverable; relation kin with person-materialized-world-vienna-1912-10_

- **1941.06** `df18-dream.water-in-the-cellar::ctx-vienna-authoritarian-1934::milieu-tenement/tell-the-landlord` tags: dream, omen, home, water, coincidence, eerie, everyday, vienna
  Hedwig把梦告诉房东。房东笑了一声，说老房子下水慢，做梦都带水汽。第二天，房东带人来查，真在墙里找到一条裂缝，顺手把地窖的租金减了一克朗。Hedwig把省下的钱买了一盏新灯，放在楼梯口。
  _effects: cash 1 (房东减掉的一克朗地窖租金); reputation 0.020000000000000004; relation acquaintance with person-mitzi-lechner; knowledge “房东因为我的梦查了墙，减了地窖租金。”; flag +df18_landlord_fixed_crack; mood 0.020000000000000004_

- **1941.12** `r2-law.rent-contract::ctx-vienna-authoritarian-1934::milieu-tenement/sublet-a-room` tags: law, rent, contract, housing, tenement, vienna, urban, crisis
  Hedwig把靠街的小房间转租给Emil 2的表弟，租金正好补上涨幅。Katharina Lechner来查房时看见多了一张床，问合同里有没有写转租；Hedwig说第十三条只写修房，没写住人。Katharina Lechner在门口站了一会儿，说下个月加两克朗。
  _effects: cash 7 (租约上的第十三条); flag +sublet_room_without_landlord_consent; relation colleague with person:evt:world-vienna-1912:001808:child; knowledge “the landlord will raise rent for the extra lodger”_

- **1942.01** `fm17-cult.recruitment::ctx-vienna-authoritarian-1934::milieu-tenement/declines-the-school` tags: faith, cult, recruitment, family, child, school, money, curse
  Franz Weiss 2把学堂说得很好，Hedwig却注意到院角堆着没有拆封的床架，孩子们睡在草垫上。Hedwig说家里已经找好了学校，牵着Maria 2往外走。Franz Weiss 2在门口说，诅咒会跟着孩子；Hedwig没有回头，只把Maria 2的手握得更紧。
  _effects: mood -0.020000000000000004; flag +fm17_cult_refused_

- **1942.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Maria 2这周主动擦了黑板。Hedwig把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 39 -> 42; mood 0.020000000000000004_
  _causes: evt:world-vienna-1912:009844_

- **1942.01** `vienna-tenement-neighbors.shared_stove_fire/fire_no_damage` tags: home, social, family, housing
  Hedwig刚把锅端下灶，火苗就蹿了起来，Ferdinand Winter 2一脚踩灭地上的油布，顺手抄起沙箱里的沙子盖住灶口。两人都没受伤，但Ferdinand Winter 2的鞋底烧穿一个洞，那是唯一一双出门的鞋。
  _effects: relation friend with person-materialized-world-vienna-1912-6; mood -0.020000000000000018_

- **1942.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Hedwig被叫到学校，老师说Helene 2这学期总在课上看窗外。回家的路上，Hedwig没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 42 -> 37; state_parameter raising-child.caregiverBurden 39 -> 44; cash -2 (extra lessons and replacement pencils（其中2克朗记入债务）); mood -0.030000000000000027_

- **1942.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Hedwig被叫到学校，老师说Alois 2这学期总在课上看窗外。回家的路上，Hedwig没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 31 -> 26; state_parameter raising-child.caregiverBurden 42 -> 47; cash -2 (extra lessons and replacement pencils（其中2克朗记入债务）); mood -0.030000000000000027_

- **1942.01** `r13-fam.care-sick-child::ctx-vienna-authoritarian-1934::milieu-tenement::child-care-war/hospital-turned-away` tags: task, care, health, child, fever, night, vienna, urban
  Hedwig抱着Helene 2去医院，走廊里躺满缠绷带的士兵。挂号的人看了一眼孩子的脸，说病床先给伤员。Hedwig在门口站到天黑，最后用外套把孩子裹紧，走回家去；路上孩子问，医院为什么不收小孩。
  _effects: cash -1 (第三遍换湿布（其中1克朗记入债务）); flag +hospital_refused_child; knowledge “the hospital reserves beds for wounded soldiers”; condition_

- **1942.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Maria 2这周主动擦了黑板。Hedwig把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 18 -> 21; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:010184_

- **1942.07** `r3-crime.police-raid::ctx-vienna-authoritarian-1934::milieu-tenement::political-week/lined-against-the-wall` tags: crime, police, tenement, fear, politics, vienna, urban, crisis
  门是被靴子踹开的，Rosa Lechner把整层楼的人赶到走廊，让他们面朝墙站好，说“谁动谁先进去”。Helene Bauer的睡帽掉在地上，Katharina Berg 2只穿着袜子。抽屉被倒空，床垫被划开，Hedwig攒了三个月的房租从茶叶罐里消失，没有人说要开收据。
  _effects: cash -7 (凌晨四点门闩被撬开（其中7克朗记入债务）); mood -0.18000000000000002; condition; flag +survived_police_raid; relation rival with person-rosa-lechner; knowledge “the raid team took cash without logging it”; relation acquaintance with person-materialized-world-vienna-1912-95_

- **1942.10** `hs18-occupation.piano::ctx-vienna-authoritarian-1934::milieu-tenement/sign-the-receipt` tags: occupation, piano, requisition, witness, neighbor, history, vienna, urban
  两名工人把Helene Bauer家的钢琴抬上卡车，琴腿在门框上磕掉一块漆。Rosa Lechner把一张纸塞给Hedwig，说只要签“屋内无人认领”，就不必再搬第二趟。Hedwig签了名，看见Helene Bauer站在对面窗帘后，手一直按在玻璃上。
  _effects: state_add hs18-street-witness state:world-vienna-1912:645; relation acquaintance with person-materialized-world-vienna-1912-45; knowledge “签字比争辩更快，也比争辩更难忘。”; flag +signed_abandoned_piano_receipt; mood -0.04000000000000001_

- **1943.01** `vienna-tenement-neighbors.laundry_line_dispute/subject_yields_line` tags: home, social, family, housing
  Hedwig看Ferdinand Winter 2盆里那几件小衬衫，把自家床单卷起来抱回屋，说等下午再晾。Ferdinand Winter 2愣了一下，闷头把衣服挂好，收工回来时在Hedwig门口放了一小包用旧报纸裹的洗衣碱。Hedwig打开报纸，碱面里还掺着几粒粗盐。
  _effects: relation friend with person-materialized-world-vienna-1912-6; food_
  _causes: evt:world-vienna-1912:009846_

- **1943.01** `hs18-witness.reporter::ctx-vienna-authoritarian-1934::milieu-tenement/sell-the-account` tags: witness, reporter, memory, money, risk, history, vienna, urban
  Anna Winter把几张钞票压在咖啡杯底下，说只要一段能上版的细节。Hedwig讲了钢琴、门洞和那件湿外套；对方记得很快，临走前问能不能用真名。Hedwig说用化名，记者笑了一下，说化名也得像真的。
  _effects: cash 4 (sold a witness account to a reporter); state_parameter hs18-street-witness.retellings 0 -> 2; state_parameter hs18-street-witness.danger 45 -> 60; state_parameter hs18-street-witness.certainty 85 -> 88; reputation 0.020000000000000004; flag +sold_witness_account_

- **1943.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Hedwig把Maria 2的旧课本包上书皮，又在本子上签了名。Maria 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Hedwig听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 21 -> 29; state_parameter raising-child.caregiverBurden 50 -> 47; mood 0.020000000000000018_

- **1943.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Hedwig把Gustav 2的旧课本包上书皮，又在本子上签了名。Gustav 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Hedwig听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 15 -> 23; state_parameter raising-child.caregiverBurden 50 -> 47; mood 0.020000000000000018_

- **1943.01** `state_expire:fw19-separated-household` tags: fw19-separated-household, family, war, separation, evacuation, missing, occupation, migration
  Hedwig的「被战争拆开的家」到期；相关安排结束。
  _effects: state_remove fw19-separated-household state:world-vienna-1912:627_

- **1943.01** `state_tick:hs18-street-witness/memory-drift/holds` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Hedwig又把那天的顺序在脑子里走了一遍：先是门响，再是靴子，最后才是那声喊。细节还在，只是每讲一次，旁边就多出一点别人替你补上的颜色。
  _effects: state_parameter hs18-street-witness.certainty 88 -> 90_

- **1943.01** `p10-family-tasks.arrange-childcare/arrange-childcare.quit-job` tags: adulthood, family, social, marriage, care, inheritance, task, childcare
  Hedwig把半天工的工钱单交回去，换回自己看孩子。晚饭从两顿并成一顿，土豆和面包皮煮一锅，伴侣把煤钱数了两遍。孩子睡下后，Hedwig在窗边缝袜子，一枚针扎了手指，她含住指头继续缝。
  _effects: cash -4 (辞掉半天工少了一份收入（其中1.5克朗记入债务）)_

- **1943.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Alois 2这周主动擦了黑板。Hedwig把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 26 -> 29; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:010815_

- **1943.02** `vienna-women-housework.wash-day/wash-day.send-out` tags: gender, housework, home, labour, family
  洗衣妇把工服从报纸里抖出来，翻开领口看了看油垢，点头收下。Hedwig转身回屋，铜板在围裙口袋里磕出轻响。Elisabeth Huber 2还在楼梯上嘟囔，说这钱不如买半斤猪油。
  _effects: cash -0.5 (请洗衣妇代洗工服); mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-106_

- **1943.05** `p9-social-tenement-neighbors.stove-and-line/stove-and-line.sheet-quarrel` tags: housing, neighbors, tenement, daily, money, reputation
  Hedwig发现自己搭在栏杆上的床单被人挪到了绳尾，角上沾了煤灰，一时火起，在楼梯间拦住Katharina Bauer问是谁动的。Katharina Bauer说是Mitzi Kral嫌滴水，两人越说越响，最后各自回屋摔上门，炉子空着，谁也没再去烧水。
  _effects: mood -0.04999999999999999; relation acquaintance with person-katharina-bauer_

- **1943.12** `vienna-church-community.saint-vincent-box/box-request-refused` tags: faith, social, family, home
  登记员翻遍册子，说这户上个月已经领过。楼里的人围着看，谁也没先走开。
  _effects: relation acquaintance with person:evt:world-vienna-1912:001751:child; reputation -0.04000000000000001; mood -0.04999999999999999_

- **1944.01** `fw19-split.evacuation-list::ctx-vienna-authoritarian-1934::milieu-tenement/youngest-goes` tags: evacuation, railway, children, occupation, choice, vienna, urban, crisis
  Hedwig把Alois 2抱上马车，Helene 2留在月台上看着。Berta Kraus说下一班也许还有位置，也许没有；Hedwig把Helene 2的手攥得太紧，孩子后来在作文里写“家里的人那天没有回头”。
  _effects: state_add fw19-separated-household state:world-vienna-1912:723; cash -1 (cash -1（其中1克朗记入债务）); flag +sent_youngest_first; mood -0.08000000000000002; flag +family_split_active_

- **1944.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Hedwig把Helene 2的旧课本包上书皮，又在本子上签了名。Helene 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Hedwig听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 37 -> 45; state_parameter raising-child.caregiverBurden 44 -> 41; mood 0.020000000000000018_

- **1944.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Hedwig把Alois 2的旧课本包上书皮，又在本子上签了名。Alois 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Hedwig听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 29 -> 37; state_parameter raising-child.caregiverBurden 47 -> 44; mood 0.020000000000000018_

- **1944.01** `state_tick:hs18-street-witness/memory-drift/holds` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Hedwig又把那天的顺序在脑子里走了一遍：先是门响，再是靴子，最后才是那声喊。细节还在，只是每讲一次，旁边就多出一点别人替你补上的颜色。
  _effects: state_parameter hs18-street-witness.certainty 90 -> 92_

- **1944.01** `p10-family-tasks.appeal-inheritance/appeal-inheritance.watch` tags: adulthood, family, social, marriage, care, inheritance, task, appeal
  怀表是母亲陪嫁，表盖上有道划痕。Hedwig用指甲把表盖擦亮，说这个就够。兄弟把欠杂货店的账认下来，十一克朗。两人下楼时兄弟走在前面，到门口停了一下，说下个月一起去。
  _effects: relation kin with person-phase15-Lena-world-vienna-1912; mood 0.02999999999999997; relation acquaintance with person-materialized-world-vienna-1912-94_

- **1944.04** `ld18-performance.tango::ctx-vienna-authoritarian-1934::milieu-tenement/the-impresario-offers-a-contract` tags: performance, desire, dance, public, queer, nightlife, public_desire, vienna
  Rosa Lechner把合同推过来，说只要她们每星期跳三场，就付双倍的钱。Hedwig问要不要改舞步，Rosa Lechner说不用，越像现在这样越好。Marie Huber看着合同上的数字，先笑了，又有点想哭。
  _effects: state_add ld18-public-desire state:world-vienna-1912:724; cash 2 (the first week of the scandal contract); relation acquaintance with person-rosa-lechner; mood 0.020000000000000018; flag +scandal_contract; flag +public_desire_active_

- **1944.09** `bc18-inherit.parrot-condition::ctx-vienna-authoritarian-1934::milieu-tenement/parrot-repeats-secret` tags: inheritance, family, condition, absurd, death, legal, quiet, vienna
  鹦鹉在公证处忽然开口，反复说“盒子在钟后面”。Anton Winter脸色变了，Alois Hofer说鸟只会学舌；可回家一找，钟后面真有一只铁盒，里面是姑妈早年存下的银器。亲戚们打起了官司，Hedwig作为养鸟人出庭，拿了三克朗证人费，也记住了Alois Hofer在庭上擦汗的样子。
  _effects: cash 3 (出庭作证的证人费); reputation 0.020000000000000004; relation rival with person-materialized-world-vienna-1912-15; knowledge “公证人知道钟后面的铁盒，却从没在遗嘱里提起。”; condition; flag +parrot_revealed_the_silver; mood 0.020000000000000018_

- **1945.01** `vienna-life-1945-liberation/displaced` tags: war, liberation, 1945, migration
  炮火把Hedwig住的那条街烧掉一半。Hedwig跟着人群走到城外，在临时收容所登记，床位上铺的是发霉的稻草。
  _effects: move place-klosterneuburg-aunt-house; role; cash -5 (temporary shelter（其中5克朗记入债务）)_

- **1945.01** `state_reaction:fw19-separated-household/armistice-list` tags: fw19-separated-household, family, war, separation, evacuation, missing, occupation, migration
  停战的消息传到街上时，Hedwig没有去广场。Hedwig把家里所有能写字的地方都找出来，抄下同一个名字，准备第二天去问；那天夜里，整条街都在念名单。
  _effects: state_parameter fw19-separated-household.hope 30 -> 50; state_parameter fw19-separated-household.missing 30 -> 20; mood 0.04000000000000001_
  _causes: evt:world-vienna-1912:011713_

- **1945.01** `vienna-life-overcrowded-flat/take-in-a-lodger` tags: housing, home, health, family
  Hedwig把厨房角落隔出一块，租给一个在附近上工的学徒。每月多四克朗，但煤、水和厕所都要排队；夜里有人咳嗽，Hedwig睡不踏实，第二天眼下发青，孩子也在床上翻来覆去，四克朗换来一屋子醒着的人。
  _effects: cash 4 (lodger rent); condition_

- **1945.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Hedwig把Maria 2的旧课本包上书皮，又在本子上签了名。Maria 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Hedwig听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 29 -> 37; state_parameter raising-child.caregiverBurden 47 -> 44; mood 0.01999999999999999_

- **1945.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Hedwig把Gustav 2的旧课本包上书皮，又在本子上签了名。Gustav 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Hedwig听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 23 -> 31; state_parameter raising-child.caregiverBurden 47 -> 44; mood 0.01999999999999999_

- **1945.01** `state_tick:hs18-street-witness/memory-drift/blurs` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Hedwig忽然想不起那个人先迈的是左脚还是右脚。邻居说自己记得清清楚楚，还补了一个细节；Hedwig听着，竟分不清那是自己看见的，还是后来听来的。
  _effects: state_parameter hs18-street-witness.certainty 92 -> 84; mood -0.01999999999999999_

- **1945.01** `state_tick:fw19-separated-household/letters-and-lists/word-arrives` tags: fw19-separated-household, family, war, separation, evacuation, missing, occupation, migration
  Hedwig又在门口等邮差。这次来的不是信，是一张从难民名单上抄下来的地址，字迹被雨泡开了一半；Hedwig把纸贴在窗上晾干，认出其中一个姓，手才开始发抖。
  _effects: state_parameter fw19-separated-household.hope 50 -> 58; state_parameter fw19-separated-household.missing 20 -> 14; mood 0.01999999999999999_

- **1945.01** `state_tick:ld18-public-desire/the-story-changes-hands/strangers-know-best` tags: ld18-public-desire, desire, public, scandal, reputation, body, rumor, notoriety
  一个陌生女人在电车上叫住Hedwig，说自己认识她的“那位”，还劝她趁年轻找个正经人家。Hedwig没有回答，提前一站下了车；走在回家的路上，她发现自己的步子越来越快，像在躲一个并不存在的人。
  _effects: state_parameter ld18-public-desire.rumorHeat 50 -> 58; state_parameter ld18-public-desire.shame 10 -> 14; reputation -0.03; mood -0.01999999999999999_

- **1945.01** `task-vienna-family-care.room-move/take-in-apprentice` tags: family, care, courtship, siblings, inheritance, housing, task, task:family
  Hedwig算来算去舍不得那笔修窗钱，跟房东回话说先不搬。空出来的床位租给了一个学徒Friedrich Berg，一个月一克朗二十赫勒，连带管一顿晚饭。屋里比原来更挤，夜里翻身要侧着，孩子们把箱子当桌子用。
  _effects: household; cash 1.2 (学徒的搭铺钱); food; relation acquaintance with person-materialized-world-vienna-1912-44_

- **1945.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Alois 2这周主动擦了黑板。Hedwig把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 37 -> 40; mood 0.01999999999999999_
  _causes: evt:world-vienna-1912:012098_

- **1945.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Helene 2这周主动擦了黑板。Hedwig把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 45 -> 48; mood 0.01999999999999999_
  _causes: evt:world-vienna-1912:012115_

- **1945.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Maria 2这周主动擦了黑板。Hedwig把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 37 -> 40; mood 0.01999999999999999_
  _causes: evt:world-vienna-1912:012127_

- **1945.02** `vienna-parish-aid.rent-box/rent-box.food-only` tags: faith, parish, mutual_aid, poverty, family
  Hedwig只收下篮里的面包和豆子，把煤袋推回Helene Weiss手里，说房租自己再想办法，请她们给介绍点零工。Helene Weiss把煤放在走廊窗台，说礼拜四后院有人要拆旧木箱，一赫勒一捆，工钱不多但现结。Hedwig记下门牌，答应一早过去。
  _effects: food; flag +seeking_work; relation acquaintance with person-materialized-world-vienna-1912-5_

- **1945.07** `vienna-medical-treatment.toothache/drops-and-endure` tags: health, medical, family, money
  夜里疼醒时，Hedwig摸黑往棉球上又滴药水，手抖得洒在枕头上。Helene Bauer第二天一早来敲门，看见肿脸就说别硬撑了，可Hedwig只是摆摆手，说再熬一天也许就好了。
  _effects: cash -0.6 (牙痛药水); condition_

- **1946.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Hedwig把Helene 2的旧课本包上书皮，又在本子上签了名。Helene 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Hedwig听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 48 -> 56; state_parameter raising-child.caregiverBurden 41 -> 38; mood 0.01999999999999999_

- **1946.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Hedwig把Alois 2的旧课本包上书皮，又在本子上签了名。Alois 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Hedwig听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 40 -> 48; state_parameter raising-child.caregiverBurden 44 -> 41; mood 0.01999999999999999_

- **1946.01** `state_tick:hs18-street-witness/memory-drift/blurs` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Hedwig忽然想不起那个人先迈的是左脚还是右脚。邻居说自己记得清清楚楚，还补了一个细节；Hedwig听着，竟分不清那是自己看见的，还是后来听来的。
  _effects: state_parameter hs18-street-witness.certainty 84 -> 76; mood -0.01999999999999999_

- **1946.01** `state_tick:fw19-separated-household/letters-and-lists/word-arrives` tags: fw19-separated-household, family, war, separation, evacuation, missing, occupation, migration
  Hedwig又在门口等邮差。这次来的不是信，是一张从难民名单上抄下来的地址，字迹被雨泡开了一半；Hedwig把纸贴在窗上晾干，认出其中一个姓，手才开始发抖。
  _effects: state_parameter fw19-separated-household.hope 58 -> 66; state_parameter fw19-separated-household.missing 14 -> 8; mood 0.01999999999999999_

- **1946.01** `state_tick:ld18-public-desire/the-story-changes-hands/strangers-know-best` tags: ld18-public-desire, desire, public, scandal, reputation, body, rumor, notoriety
  一个陌生女人在电车上叫住Hedwig，说自己认识她的“那位”，还劝她趁年轻找个正经人家。Hedwig没有回答，提前一站下了车；走在回家的路上，她发现自己的步子越来越快，像在躲一个并不存在的人。
  _effects: state_parameter ld18-public-desire.rumorHeat 58 -> 66; state_parameter ld18-public-desire.shame 14 -> 18; reputation -0.03; mood -0.01999999999999999_

- **1946.01** `p10-family-tasks.arrange-childcare/arrange-childcare.neighbor` tags: adulthood, family, social, marriage, care, inheritance, task, childcare
  老太太接过孩子，用旧围裙兜着坐在窗边，说一克朗一周，六点送来六点接。Hedwig数出硬币，把奶瓶放在她灶台边。第三夜孩子还是哭醒，Hedwig抱着他在屋里走，天亮前靠着床沿打了个盹。
  _effects: cash -1 (每周付邻居老太太的照看费（其中1克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-2; relation acquaintance with person-materialized-world-vienna-1912-100; relation acquaintance with person-materialized-world-vienna-1912-2_

- **1946.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Gustav 2这周主动擦了黑板。Hedwig把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 31 -> 34; mood 0.01999999999999999_
  _causes: evt:world-vienna-1912:012800_

- **1946.02** `vienna-parish-aid.funeral-society/funeral-society.quit` tags: faith, parish, mutual_aid, poverty, family
  Hedwig说互助会先退了，这笔钱要留给煤和面包。Alois Bauer没争辩，在蓝皮本上把名字划了一道，问清楚是不是全家都退，然后把划掉的那行折进本子夹缝。她说以后想再进，要重新排三个月。门关上，Hedwig听见铅笔在楼梯上轻轻敲了两下栏杆。
  _effects: cash 0.4 (省下本周会费留作煤钱); relation acquaintance with person-materialized-world-vienna-1912-73; flag +funeral_society_left; relation acquaintance with person-materialized-world-vienna-1912-73_

- **1946.03** `vienna-courtship-courtyard.breakup/stay-for-the-rent` tags: adulthood, courtship, partner, social, family
  东西还到一半，两人算了算房租、煤钱和两个人的工钱凑在一起才够。最后钥匙没收回去，外套也留下；这个月能少花一克朗，话说到“以后”两个字就断了，谁都不往下接，炉子今晚还是得两个人一起生。
  _effects: mood -0.05000000000000002; cash 1 (合租省下一份房租)_

- **1946.09** `vienna-medical-treatment.night-fever/sweat-it-out` tags: health, medical, family, money
  醋水的酸味混着汗气，屋子小得转不开身。Otto Weiss把布拧到不滴水，敷上去时Hedwig打了个激灵。窗外送奶车吱呀碾过石板，她才想起自己家的炉子还灭着。
  _effects: condition; relation friend with person-materialized-world-vienna-1912-8; relation acquaintance with person-materialized-world-vienna-1912-8_

- **1946.12** `vienna-social-movement.recruitment/join-and-carry` tags: development, social_movement, organization, politics
  Hedwig在楼梯下面接到一张折成四折的传单。纸上没有署名，只写着下一次集会的地址。Hedwig去了，在昏暗的屋里报上姓名，成为环城大道写字楼管理处的一员，并答应负责自己所在街区的联络。
  _effects: organization_membership; role; relation acquaintance with person-materialized-world-vienna-1912-55_

- **1947.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Hedwig把Maria 2的旧课本包上书皮，又在本子上签了名。Maria 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Hedwig听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 43 -> 51; state_parameter raising-child.caregiverBurden 44 -> 41; mood 0.01999999999999999_

- **1947.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Hedwig把Gustav 2的旧课本包上书皮，又在本子上签了名。Gustav 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Hedwig听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 34 -> 42; state_parameter raising-child.caregiverBurden 44 -> 41; mood 0.01999999999999999_

- **1947.01** `state_tick:hs18-street-witness/memory-drift/holds` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Hedwig又把那天的顺序在脑子里走了一遍：先是门响，再是靴子，最后才是那声喊。细节还在，只是每讲一次，旁边就多出一点别人替你补上的颜色。
  _effects: state_parameter hs18-street-witness.certainty 76 -> 78_

- **1947.01** `state_expire:fw19-separated-household` tags: fw19-separated-household, family, war, separation, evacuation, missing, occupation, migration
  Hedwig的「被战争拆开的家」到期；相关安排结束。
  _effects: state_remove fw19-separated-household state:world-vienna-1912:723; flag -family_split_active_

- **1947.01** `state_tick:ld18-public-desire/the-story-changes-hands/a-new-version` tags: ld18-public-desire, desire, public, scandal, reputation, body, rumor, notoriety
  故事又换了一个版本：有人说Hedwig是为了钱，有人说是为了爱，还有人说她只是喜欢看别人议论。Hedwig在咖啡馆听见第三种说法，没有更正，只把杯子往窗边挪了挪；阳光照进来，她第一次觉得这些版本都离自己很远。
  _effects: state_parameter ld18-public-desire.rumorHeat 66 -> 62; state_parameter ld18-public-desire.spectacle 65 -> 67; mood 0.010000000000000009_

- **1947.01** `task-vienna-family-care.room-move/take-in-apprentice` tags: family, care, courtship, siblings, inheritance, housing, task, task:family
  Hedwig算来算去舍不得那笔修窗钱，跟房东回话说先不搬。空出来的床位租给了一个学徒Josef Weiss 2，一个月一克朗二十赫勒，连带管一顿晚饭。屋里比原来更挤，夜里翻身要侧着，孩子们把箱子当桌子用。
  _effects: household; cash 1.2 (学徒的搭铺钱); food; relation acquaintance with person-materialized-world-vienna-1912-12; relation acquaintance with person-materialized-world-vienna-1912-115_

- **1947.02** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Maria 2这周主动擦了黑板。Hedwig把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 40 -> 43; mood 0.01999999999999999_
  _causes: evt:world-vienna-1912:013238_

- **1947.03** `vienna-tenement-neighbors.lost_room_key/key_lost_landlady` tags: home, social, family, housing
  Hedwig把钥匙丢在了回家路上的有轨电车轨道旁，天黑也没找着。房东太太说换锁芯要一克朗五十赫勒，从下月房租里扣。Alois Hofer借给Hedwig一把旧挂锁，但锁鼻和门扣对不上，只能用铁丝拧着凑合。那夜Hedwig睡不踏实，总觉得有人在拧门。
  _effects: cash -1.5 (换锁芯费用（其中1.5克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-15; mood -0.06_

- **1947.04** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Helene 2这周主动擦了黑板。Hedwig把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 56 -> 59; mood 0.01999999999999999_
  _causes: evt:world-vienna-1912:013202_

- **1947.05** `vienna-adult-social.burial-fund/burial-fund.paid` tags: adulthood, social, work, family
  车间里管互助会的Katharina Lechner在午休时把本子摊在Hedwig的工具箱上，说这个月还差最后一份月钱。Hedwig从马甲内袋摸出二十个克罗伊策，Katharina Lechner当着他的面在本子上画了钩。
  _effects: cash -0.3 (缴纳丧葬互助会的月钱（其中0.3克朗记入债务）); relation colleague with person:evt:world-vienna-1912:000086:child; reputation 0.039999999999999994_

- **1947.05** `p9-social-family-conflict-care.christmas-soup/jam-at-door` tags: family, care, siblings, inheritance, housing, money
  Hedwig只送来一罐杏子果酱，没有进门，把罐子放在门槛里边，说了句汤你们先喝。Lena在屋里听见了，走到门口时人已经下楼。果酱罐上没有标签，只裹着一层报纸，瓶口用蜡封着；这一罐甜食抵得上一克朗的吃食，却没能把两个人重新按到一张桌上。
  _effects: food; relation kin with person-phase15-Lena-world-vienna-1912; mood -0.01999999999999999_

- **1947.08** `vienna-women-housework.wash-day/wash-day.rush` tags: gender, housework, home, labour, family
  木盆边的水渍映着天光，Hedwig跪在石阶上揉搓床单，肘弯发酸。晾绳上的湿布滴答作响，Maria Lechner探身把自家被单也挂上去，两人没多说话。
  _effects: relation acquaintance with person:evt:world-vienna-1912:000362:child_

- **1947.11** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Alois 2这周主动擦了黑板。Hedwig把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 48 -> 51; mood 0.01999999999999999_
  _causes: evt:world-vienna-1912:013233_

- **1948.01** `fm17-cult.recruitment::ctx-vienna-postwar-1945::milieu-tenement/declines-the-school` tags: faith, cult, recruitment, family, child, school, money, curse
  Anna Weiss把学堂说得很好，Hedwig却注意到院角堆着没有拆封的床架，孩子们睡在草垫上。Hedwig说家里已经找好了学校，牵着Helene 2往外走。Anna Weiss在门口说，诅咒会跟着孩子；Hedwig没有回头，只把Helene 2的手握得更紧。
  _effects: mood -0.01999999999999999; relation acquaintance with person:evt:world-vienna-1912:000477:child_

- **1948.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Helene 2这周主动擦了黑板。Hedwig把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 42 -> 45; mood 0.01999999999999999_
  _causes: evt:world-vienna-1912:013745_

- **1948.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Hedwig被叫到学校，老师说Helene 2这学期总在课上看窗外。回家的路上，Hedwig没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 59 -> 54; state_parameter raising-child.caregiverBurden 38 -> 43; cash -2 (extra lessons and replacement pencils); mood -0.03_

- **1948.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Hedwig被叫到学校，老师说Alois 2这学期总在课上看窗外。回家的路上，Hedwig没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 51 -> 46; state_parameter raising-child.caregiverBurden 41 -> 46; cash -2 (extra lessons and replacement pencils); mood -0.03_

- **1948.01** `state_expire:hs18-street-witness` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Hedwig的「街面上的目击者」到期；相关安排结束。
  _effects: state_remove hs18-street-witness state:world-vienna-1912:645_

- **1948.01** `state_tick:ld18-public-desire/the-story-changes-hands/strangers-know-best` tags: ld18-public-desire, desire, public, scandal, reputation, body, rumor, notoriety
  一个陌生女人在电车上叫住Hedwig，说自己认识她的“那位”，还劝她趁年轻找个正经人家。Hedwig没有回答，提前一站下了车；走在回家的路上，她发现自己的步子越来越快，像在躲一个并不存在的人。
  _effects: state_parameter ld18-public-desire.rumorHeat 62 -> 70; state_parameter ld18-public-desire.shame 18 -> 22; reputation -0.03; mood -0.020000000000000018_

- **1948.01** `p9-history-public-action.organize-relief/credit-own-name` tags: politics, union, party, activism, public_action, relief, leaflet, task
  市场掌柜把账本翻到空白页，铅笔写上“月底清”，Hedwig 把拇指按进印泥，红印盖得有点歪。Mitzi 2 扛着半袋面粉往回走，袋底漏出的粉在石板路上留下白印。
  _effects: cash -5 (以自家名义赊购面粉); food; mood -0.04999999999999999_

- **1948.03** `vienna-parish-aid.rent-box/rent-box.refuse` tags: faith, parish, mutual_aid, poverty, family
  Hedwig说这个月还能撑，房租差的那几克朗打算替人洗衣补上，请Josef Berg 2把篮子提回去给更困难的人家。Josef Berg 2在门口停了一会儿，把一小块肥皂留在窗台上，说不是救济，是教区多出来的。门关上后，屋里只剩煤箱底刮出的响声。
  _effects: mood -0.03; relation acquaintance with person-materialized-world-vienna-1912-59; flag +parish_refused_aid_

- **1948.06** `vienna-medical-treatment.toothache/dentist-pull` tags: health, medical, family, money
  诊室在二楼，楼梯间飘着石炭酸味。医生把钳子举到灯下看了看，叫Hedwig攥紧扶手。Josef Moser站在门边数墙上的价目表：拔牙两克朗五十赫勒，药棉五十赫勒，连消炎水另算。
  _effects: cash -3 (牙医拔牙费用); health 0.05999999999999999 (拔除病牙解除疼痛); mood -0.03_

- **1949.01** `vienna-postwar-housing-1950s/stay-with-relatives` tags: adulthood, postwar, housing, family
  分房名单又往后推了一年，Hedwig一家搬进亲戚家的厨房隔间。Anton Winter送来一块旧帘子当隔断；夜里有人起身，全屋都听得见。
  _effects: cash -3 (shared household costs（其中3克朗记入债务）); condition; mood -0.02999999999999997; relation acquaintance with person-materialized-world-vienna-1912-41_

- **1949.01** `curse15-betrayal.name-on-the-list::ctx-vienna-postwar-1945::milieu-tenement/denounced` tags: betrayal, politics, investigation, curse, denunciation, secret, vienna, urban
  Hermann Bauer 2把Hedwig在夜里说过的话整理成三页纸，交到了办事处。纸上没有一句是假的，但每一句都离开了原来的房间。第二天，Hedwig被叫去问话，问话的人已经知道该问什么。Hermann Bauer 2在走廊里遇见Hedwig，点了头，像只是借过一支笔。
  _effects: state_add suspected-witchcraft state:world-vienna-1912:927; reputation -0.06; relation rival with person-materialized-world-vienna-1912-53; flag +denounced_by_known_person; mood -0.04999999999999999_

- **1949.01** `state_reaction:cursed-by-wish/curse-betrayal` tags: cursed-by-wish, wish, curse, supernatural, revenge, special, state, state_reaction
  背叛发生后的夜里，Hedwig自己发起了高烧；Hermann Bauer 2第二天照常出门。没有人把这两件事放在一起。
  _effects: state_parameter cursed-by-wish.triggers 1 -> 2; mood -0.06_
  _causes: evt:world-vienna-1912:014456_

- **1949.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Hedwig被叫到学校，老师说Maria 2这学期总在课上看窗外。回家的路上，Hedwig没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 54 -> 49; state_parameter raising-child.caregiverBurden 41 -> 46; cash -2 (extra lessons and replacement pencils); mood -0.030000000000000027_

- **1949.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Hedwig被叫到学校，老师说Gustav 2这学期总在课上看窗外。回家的路上，Hedwig没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 45 -> 40; state_parameter raising-child.caregiverBurden 41 -> 46; cash -2 (extra lessons and replacement pencils); mood -0.030000000000000027_

- **1949.01** `state_expire:ld18-public-desire` tags: ld18-public-desire, desire, public, scandal, reputation, body, rumor, notoriety
  Hedwig的「被全城观看的欲望」到期；相关安排结束。
  _effects: state_remove ld18-public-desire state:world-vienna-1912:724; flag -public_desire_active_

- **1949.07** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Maria 2这周主动擦了黑板。Hedwig把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 51 -> 54; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:014586_

- **1949.09** `p9-gap-adult-solitude.leaking-shoe/leaking-shoe.gave-up` tags: adulthood, daily, solitude, ordinary, home, repair, shoe, poverty
  Hedwig缝了半个钟头，线老是从针眼里脱出来，最后把鞋往床底下一踢。第二天清早她穿着这双鞋站在厂门口等开门，湿石头地的凉气从裂缝里钻进来，脚趾冻得发麻，只能来回换脚。
  _effects: mood -0.03999999999999998_

- **1949.11** `vienna-parish-aid.soup-kitchen/soup-kitchen.take-and-carry` tags: faith, parish, mutual_aid, poverty, family
  汤是豆子熬的，表面浮着几粒油星，气味把整条巷子都占了。Anna 2排在前面，回头替Hedwig看着位置，嘴里数着还剩几个人。铁罐递过去时烫手，Hedwig用围裙角垫着。
  _effects: food; relation acquaintance with person:evt:world-vienna-1912:001785:child; mood 0.02999999999999997_

- **1950.01** `r15-fam.school-registration::ctx-vienna-postwar-1945::milieu-tenement/enrolls` tags: family, child, school, education, school_child, vienna, urban, postwar
  Hedwig带着Alois 2去学校登记。孩子的名字被写在名册最后一行，墨水还没有干；回家的路上，Alois 2一直捏着那张课程表，Hedwig则在算这个月还能剩下多少煤钱。
  _effects: state_parameter raising-child.caregiverBurden 46 -> 45; state_parameter raising-child.schoolProgress 49 -> 20; state_parameter raising-child.childConfidence 54 -> 55; state_parameter raising-child.careDebt 0 -> 0; state_parameter raising-child.schoolEnrolled true -> true; state_parameter raising-child.leftHome false -> false; cash -1 (the first school books and a slate); mood 0.030000000000000027_

- **1950.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Hedwig把Helene 2的旧课本包上书皮，又在本子上签了名。Helene 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Hedwig听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 57 -> 65; state_parameter raising-child.caregiverBurden 43 -> 40; mood 0.020000000000000018_

- **1950.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Hedwig把Alois 2的旧课本包上书皮，又在本子上签了名。Alois 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Hedwig听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 49 -> 57; state_parameter raising-child.caregiverBurden 46 -> 43; mood 0.020000000000000018_

- **1950.01** `state_expire:suspected-witchcraft` tags: suspected-witchcraft, witchcraft, rumor, religion, legal, reputation, fear, supernatural
  Hedwig的「被疑巫术」到期；相关安排结束。
  _effects: state_remove suspected-witchcraft state:world-vienna-1912:927_

- **1950.01** `p9-social-relationship-initiative.apology-at-bakery/violets-on-the-step` tags: courtship, friendship, family, social, initiative, housing, task, task:social
  话在喉咙里滚了几遍，终究没有等到对方进门。门一响，有人就把紫罗兰放在门槛边，转身往街角走。花被早晨的扫帚拨到墙根，对方捡起来闻了闻，追到巷口只看见一个拐弯的背影，午后托人捎来一句话，说钱的事再算。
  _effects: cash -0.24 (一束紫罗兰); relation friend with person-materialized-world-vienna-1912-113; mood -0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-113_

- **1950.04** `vienna-legacy-worklife.union-office/union-office.post-ledger` tags: legacy, work, family, reform, ordinary_life
  窗外是维也纳第十五区的一条窄街，卖烤栗子的炉子冒着白烟。Hedwig贴完纸退后两步看，发现“欠”字被浆糊洇开了一点。老成员没说话，只把眼镜摘下来擦了又擦。
  _effects: reputation 0.05; relation acquaintance with person-materialized-world-vienna-1912-53; flag +union_ledger_public; relation acquaintance with person-materialized-world-vienna-1912-141_

- **1950.06** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Helene 2这周主动擦了黑板。Hedwig把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 54 -> 57; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:015313_

- **1950.06** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Alois 2这周主动擦了黑板。Hedwig把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 46 -> 49; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:015313_

- **1950.09** `vienna-housing-move.rent-notice/rent-notice-pay` tags: housing, home, rent, family, money
  Hedwig把通知念给Anna Weiss 3听，Anna Weiss 3摇头说是楼梯间那几块新玻璃的账。Hedwig去楼下杂货铺换开一张五克朗的纸币，回屋一枚一枚摆开数，煤箱底多留了二十赫勒。
  _effects: cash -2 (按月多付两克朗房租); mood -0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-139_

- **1950.12** `bc18-inherit.forty-seven-franz::ctx-vienna-postwar-1945::milieu-tenement/bury-the-stranger` tags: inheritance, mistaken_identity, debt, funeral, work, absurd, family, vienna
  遗嘱里还附了一笔丧葬费，条件是要有“家属”到场。死者没有亲人，Hedwig只好穿黑衣站在墓旁，听牧师念一个从未听过的名字。雨把花圈上的纸花打湿，泥水漫过鞋面；葬礼结束后，Hermann Berg把九克朗交给他，说账已结清。Hedwig回家脱鞋，发现袜子上沾着别人的土。
  _effects: cash 7 (以家属身份到场后的遗产余款); reputation 0.03; relation acquaintance with person:evt:world-vienna-1912:001486:child; condition; flag +buried_a_stranger_for_the_estate; mood -0.010000000000000009_

- **1951.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Hedwig被叫到学校，老师说Maria 2这学期总在课上看窗外。回家的路上，Hedwig没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 23 -> 18; state_parameter raising-child.caregiverBurden 45 -> 50; cash -2 (extra lessons and replacement pencils（其中2克朗记入债务）); mood -0.030000000000000027_

- **1951.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Hedwig被叫到学校，老师说Gustav 2这学期总在课上看窗外。回家的路上，Hedwig没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 43 -> 38; state_parameter raising-child.caregiverBurden 46 -> 51; cash -2 (extra lessons and replacement pencils（其中2克朗记入债务）); mood -0.030000000000000027_

- **1951.01** `p9-work-jobsearch.ask-trial/ask-trial.no-vacancy` tags: work, job_search, negotiation, wages, employment, task, trial, factory
  Franz Weiss没有接话，先从抽屉里撕下一角纸。Hedwig把名字、住址和手艺一样样说完，工头边写边应，写完把纸压回抽屉，说月底来问。
  _effects: mood -0.040000000000000036; relation acquaintance with person-materialized-world-vienna-1912-25; relation acquaintance with person-materialized-world-vienna-1912-25_

- **1951.03** `vienna-life-overcrowded-flat/take-in-a-lodger` tags: housing, home, health, family
  Hedwig把厨房角落隔出一块，租给一个在附近上工的学徒。每月多四克朗，但煤、水和厕所都要排队；夜里有人咳嗽，Hedwig睡不踏实，第二天眼下发青，孩子也在床上翻来覆去，四克朗换来一屋子醒着的人。
  _effects: cash 4 (lodger rent)_

- **1951.03** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Gustav 2这周主动擦了黑板。Hedwig把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 40 -> 43; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:016011_

- **1951.04** `p9-social-family-conflict-care.sibling-medicine-bill/split-per-head` tags: family, care, siblings, inheritance, housing, money
  Hedwig把旧练习本翻到空白一页，写下母亲、自己和Lena的名字。十四克朗的药费单，Hedwig和Lena各摊五克朗，余下四克朗从母亲的养老金里扣；Hedwig把五克朗硬币一枚枚摞在桌沿，Lena盯着那一栏看了半天，也从围裙口袋里摸出钱来。
  _effects: cash -5 (分摊母亲药费中自己的一份（其中2克朗记入债务）); relation kin with person-phase15-Lena-world-vienna-1912_

- **1951.10** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Maria 2这周主动擦了黑板。Hedwig把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 20 -> 23; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:016043_

- **1951.12** `vienna-housing-move.moving-day/moving-day-handcart` tags: housing, home, rent, family, money
  第一趟过街口时车上的煤箱差点翻下来，Grete Kraus用膝盖顶住，Hedwig把绳子又收了一道。第三趟回来，两人靠在门框上喘气，鞋底都是灰，省下的钱还揣在围裙里。
  _effects: cash -1 (借手推车买烟熨谢邻居的小开销)_

- **1951.12** `vienna-medical-treatment.night-fever/sweat-it-out` tags: health, medical, family, money
  Hedwig说胡话时念着车间的排班表，Anna Bauer一句句应着，拿小勺往嘴里送温水。床头那半瓶退烧药早见了底，她没舍得倒最后一滴，留着天亮再说。
  _effects: relation friend with person-anna-bauer_

- **1952.01** `r13-civ.midwife::ctx-vienna-postwar-1945::milieu-tenement/safe-delivery` tags: health, midwife, birth, neighbor, night, vienna, urban, postwar
  Maria Winter把热水、剪刀和一卷粗线摆在桌上，让Hedwig按住Anna Weiss的肩膀。孩子落地时没有哭，Maria Winter倒提着小腿拍了两下，屋里才响起声音。Hedwig把剪子递过去，手背上全是产妇攥出的红印。
  _effects: cash -3 (夜里敲接生婆的门); flag +attended_safe_delivery; relation friend with person:evt:world-vienna-1912:000477:child; relation acquaintance with person-materialized-world-vienna-1912-50_

- **1952.07** `vienna-parish-aid.soup-kitchen/soup-kitchen.take-and-carry` tags: faith, parish, mutual_aid, poverty, family
  汤是豆子熬的，表面浮着几粒油星，气味把整条巷子都占了。Hermann Berg排在前面，回头替Hedwig看着位置，嘴里数着还剩几个人。铁罐递过去时烫手，Hedwig用围裙角垫着。
  _effects: food; relation acquaintance with person:evt:world-vienna-1912:005521:child; mood 0.030000000000000027_

- **1952.07** `p9-social-family-conflict-care.christmas-soup/serve-first-talk-later` tags: family, care, siblings, inheritance, housing, money
  Hedwig先给Lena盛了满满一碗，扁豆和面团结结实实压在勺底，那块熏肉切开分了两份，锅里的吃食折合两克朗。药费的事一句没提，只问要不要再添点汤。Lena吃到一半才开口，说上次说话太冲；桌边多摆的那把椅子，最后有人坐下了。
  _effects: food; relation kin with person-phase15-Lena-world-vienna-1912; mood 0.050000000000000044_

- **1952.08** `vienna-women-housework.wash-day/wash-day.quarrel` tags: gender, housework, home, labour, family
  铁桶磕在石沿上，水晃出来打湿了Hedwig的裙角。Anna Bauer的声音拔高，说轮到她就是轮到她。Hedwig咬着嘴没再喊，把盆往自己门前拖，湿石板上一道水痕。
  _effects: mood -0.050000000000000044; reputation -0.01999999999999999_

- **1952.10** `vienna-church-community.saint-vincent-box/box-request-refused` tags: faith, social, family, home
  登记员翻遍册子，说这户上个月已经领过。楼里的人围着看，谁也没先走开。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-143; reputation -0.039999999999999994; mood -0.050000000000000044; relation acquaintance with person-materialized-world-vienna-1912-143_

- **1953.01** `r15-curse.aftermath::ctx-vienna-postwar-1945::milieu-tenement/fear-spreads` tags: curse, fear, supernatural, revenge, vienna, urban, postwar, reform
  Gustav Weiss病倒以后，楼里开始有人避开Hedwig。没有人说是诅咒，但每个人都在数Hedwig最近和谁说过话。
  _effects: reputation -0.04000000000000001; flag +curse_suspected; relation acquaintance with person-materialized-world-vienna-1912-125_

- **1953.01** `p9-social-daily-culture.pictures-or-concert/p9-social-daily-culture.pictures-or-concert.cheap-picture` tags: daily, culture, leisure, cafe, music, walk, task, task:culture
  Hedwig和Grete Berg 2买了影戏棚最便宜的边座，边座和两粒糖一共五十赫勒。一刻钟的活动影戏里火车朝观众冲过来，棚里有人叫出了声。散场后两人还站在门口看下一场的招牌，Hedwig把剩下几个铜板在口袋里攥得发热，又买了两粒糖，一人一粒含回家。
  _effects: cash -0.5 (影戏棚边座和两粒糖); mood 0.050000000000000044; relation friend with person-materialized-world-vienna-1912-99; relation acquaintance with person-materialized-world-vienna-1912-99_

- **1953.11** `vienna-market-debt.pawn-watch/pawn-chain-only` tags: market, debt, money, home, shop
  链子从你指缝里滑下去，落在绒布上几乎没有声音。掌柜说两克朗四十赫勒，你点了点头。出门时你把表掏出来上了几圈弦，它还在走，只是再没法挂在马甲上了。
  _effects: cash 2.4 (典当银表链所得); mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-2_

- **1954.01** `curse15-notice.borrowed-mourning::ctx-vienna-postwar-1945::milieu-tenement/sells-the-mourning` tags: curse, money, fear, client, ritual, supernatural, work, vienna
  Luise Berg请Hedwig去家里坐一夜，说只要Hedwig在灵堂待到天亮，那个欠钱的人就会自己上门。Hedwig收了钱，在灵堂坐到天亮，什么也没有发生。一个月后，那个人真的来了，送来一袋面粉；Luise Berg把面粉分给Hedwig一半，没有解释。
  _effects: cash 3 (替人守灵的酬劳); reputation -0.03; relation acquaintance with person:evt:world-vienna-1912:001742:child; flag +sold_mourning_service; condition_

- **1954.01** `r13-civ.enter-hospital::ctx-vienna-postwar-1945::milieu-tenement/admitted-third-class` tags: health, hospital, admission, deposit, institution, vienna, urban, postwar
  Alois Hofer把押金收据和住院单钉在一起，让Hedwig去三楼东侧等床。走廊里全是折叠床，Emil给Hedwig一条洗得发硬的毯子，说今晚先别喝水。Hedwig把鞋塞在枕头下面，听着隔壁的呻吟睡了过去。
  _effects: cash -8 (住院处窗口的押金); health 0.05999999999999999 (住院处窗口的押金); condition; flag +hospitalized_third_class; relation acquaintance with person-phase15-Emil-world-vienna-1912_

- **1954.04** `r1-cul.letter-writing::ctx-vienna-postwar-1945::milieu-tenement/sent-the-long-letter` tags: culture, letters, longing, literacy, distance, vienna, urban, postwar
  Hedwig写到第三页，墨水用完了，就用铅笔接着写。信里说今年的煤比去年贵，说楼下新开了一家面包房，说到最后才问对方什么时候回来。Anna Weiss 3的回信只有半页，说别等，先把冬天过完。
  _effects: cash -0.5 (写到一半的信); mood -0.030000000000000027; flag +sent_the_long_letter; role; relation friend with person-materialized-world-vienna-1912-139; knowledge “the reply asks not to wait until spring”_

- **1954.06** `vienna-market-household.soup-kitchen/soup-kitchen.sell` tags: home, market, food, social
  鞋匠敲后门问有没有热汤，Hedwig把剩下的半锅倒进他的罐子里，收下两个十字币。Katharina Lechner提着空碗上来时，只看见Hedwig把硬币塞进围裙口袋。
  _effects: cash 2 (卖出半锅扁豆汤); relation acquaintance with person:evt:world-vienna-1912:000086:child_

- **1954.11** `vienna-social-movement.recruitment/join-and-carry` tags: development, social_movement, organization, politics
  Hedwig在楼梯下面接到一张折成四折的传单。纸上没有署名，只写着下一次集会的地址。Hedwig去了，在昏暗的屋里报上姓名，成为圣马克斯殡葬合作社的一员，并答应负责自己所在街区的联络。
  _effects: organization_membership; relation acquaintance with person-materialized-world-vienna-1912-166; relation acquaintance with person-materialized-world-vienna-1912-166_

- **1955.01** `curse15-betrayal.name-on-the-list::ctx-vienna-postwar-1945::milieu-tenement/the-accusation-fails` tags: betrayal, politics, investigation, curse, denunciation, secret, vienna, urban
  Anna Berg 2在众人面前说Hedwig用诅咒害人。没有人接话，因为上个月Anna Berg 2也用同样的话说过另一个人。事情没有闹大，但Hedwig发现，从此每次走进那间屋子，都有人先看Hedwig的手。
  _effects: reputation -0.03; relation rival with person-materialized-world-vienna-1912-101; state_add suspected-witchcraft state:world-vienna-1912:1200; mood -0.040000000000000036_

- **1955.01** `r14-soc.gamble-away-wages::ctx-vienna-postwar-1945::milieu-tenement/won-fifteen` tags: task, gambling_debt, gambling, money, risk, vienna, urban, postwar
  Hedwig押的那匹马在最后一个弯道超了过去。Ferdinand Weiss 2把十五克朗拍在柜台上，说“运气不错”。Hedwig请Mitzi Moser喝了半升啤酒，剩下的钱在口袋里响了一路。第二天，Hedwig又去了赛马场。那匹马的号码被Hedwig写在烟盒上，后来烟盒被雨淋烂了，号码还认得出。回家后，Hedwig把那张湿透的烟盒摊在炉边烘干。
  _effects: cash 15 (第三个栏架前的马); mood 0.2; condition; flag +gambling_winnings; relation colleague with person:evt:world-vienna-1912:006102:child; relation acquaintance with person-materialized-world-vienna-1912-71_

- **1956.01** `r15-curse.aftermath::ctx-vienna-postwar-1945::milieu-tenement/fear-spreads` tags: curse, fear, supernatural, revenge, vienna, urban, postwar, reform
  Grete Berg病倒以后，楼里开始有人避开Hedwig。没有人说是诅咒，但每个人都在数Hedwig最近和谁说过话。
  _effects: reputation -0.03999999999999998_

- **1956.01** `state_expire:suspected-witchcraft` tags: suspected-witchcraft, witchcraft, rumor, religion, legal, reputation, fear, supernatural
  Hedwig的「被疑巫术」到期；相关安排结束。
  _effects: state_remove suspected-witchcraft state:world-vienna-1912:1200_

- **1956.01** `kernel-health.task-house-call::ctx-vienna-postwar-1945::milieu-tenement::house-call-medical-students/house-call-medical-teaching` tags: health, task, house_call, care, poverty, vienna, urban, postwar
  医院派来一名实习医生，身后跟着两个学生。他们把Hedwig的胸口听了个遍，最后请来上级；药费减半，但Hedwig被当成了讲课的病例。学生们走后，实习医生把听诊器在手里捂了很久，才敢再贴上来。
  _effects: cash -4 (reduced fee for a teaching-house call（其中4克朗记入债务）); health 0.03 (examined by a teaching team); knowledge “教学出诊会有实习医生和学生轮流听诊，最后请上级定方案，药费可以减半。”; relation acquaintance with person-materialized-world-vienna-1912-132_

- **1956.02** `p9-gap-adult-ordinary-day.market-closing/market-closing.fish-heads` tags: adulthood, daily, leisure, neighborhood, ordinary, market, food, bargain
  鱼头用报纸包着，报纸上还印着昨天的广告。Elisabeth Lechner 2一边刮冰一边说，回去多搁姜，别舍不得醋。Hedwig把纸包拎在手里，能感觉到凉气从指缝里钻出来，走到家时报纸已经洇湿了一层。
  _effects: food; health 0.019999999999999997 (喝上了热鱼汤); relation acquaintance with person-materialized-world-vienna-1912-119_

- **1956.08** `vienna-housing-move.moving-day/moving-day-handcart` tags: housing, home, rent, family, money
  手推车每走十几步就要停一下，楼道里的门半开着，有人探头看热闹。Hedwig把照片铁盒交给Katharina Stein抱着，自己低头把最后一箱锅具拖上楼。天擦黑时，新屋里才勉强归置出下脚的地方。
  _effects: cash -1 (借手推车买烟熨谢邻居的小开销（其中1克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-118; relation acquaintance with person-materialized-world-vienna-1912-118_

- **1956.12** `p9-social-tenement-neighbors.stove-and-line/stove-and-line.first-come-order` tags: housing, neighbors, tenement, daily, money, reputation
  Hedwig把四只洗衣盆按到厨房的先后排成一列，用粉笔在门后写下各家的时辰：六点到七点半、七点半到九点。Grete Berg起初嘟囔，看到自家名字排在第二格，也就把水壶提了回去。晾衣绳按同样次序分两段，谁家的床单先上谁先占。
  _effects: mood 0.03999999999999998; relation acquaintance with person:evt:world-vienna-1912:003913:child_

- **1957.01** `pc20-wish.literal-return::ctx-vienna-postwar-1945::milieu-tenement/curse-lifted` tags: curse, wish, ordinary_life, second_chance, love, work, literal, irony
  Hedwig在饭桌上把那件旧事讲完，没有求原谅，也没有再许愿。Franz Berg听完，把汤勺放回锅里，说这顿饭终于只是顿饭；那天夜里，Hedwig第一次没有梦见门被推开。
  _effects: state_remove cursed-by-wish state:world-vienna-1912:seed:person-phase15-Hedwig-world-vienna-1912:cursed-by-wish; state_add pc20-second-chance state:world-vienna-1912:1289; health 0.03 (a night without the old dream); flag +curse_lifted_in_ordinary_life; knowledge “那顿饭没有许愿，也没有求原谅，诅咒却没有再回来。”; flag +second_chance_open_

- **1957.01** `vienna-housing-move.rent-notice/rent-notice-demand-repair` tags: housing, home, rent, family, money
  Hedwig没有立刻答话，先去敲Rosa的门。两人一起数落墙上的水渍和门框里灌进来的风，楼梯间的窗户修好了，自家墙皮还在剥落。Rosa提议一起把话带给看门人：先修好漏水的墙角，涨租的事再谈。Hedwig把纸重新折好，请他把话带到门外。
  _effects: relation acquaintance with person-phase15-Rosa-world-vienna-1912; mood 0.030000000000000027; flag +rent_dispute_

- **1957.04** `p9-gap-adult-solitude.remake-coat/remake-coat.crooked-sleeves` tags: adulthood, daily, solitude, ordinary, home, mending, clothing, household
  Hedwig的剪刀钝得咬布，一剪下去袖口走了斜线。她索性把两只袖子都裁短，袖边用灰线锁了一圈。锁边时线太短，接到第三段才够，右手食指被针顶出个红印，改完像件旧式的短褂。
  _effects: skill; mood -0.020000000000000018_

- **1957.10** `kernel-crisis.task-rescue-neighbor::ctx-vienna-postwar-1945::milieu-tenement/rescue-too-late` tags: task, rescue, fire, neighbor, betrayal, vienna, urban, postwar
  Hedwig撞开阁楼门，烟先滚出来，Luise Weiss倒在门后，手指还扣着门槛。Hedwig和Helene 2拽着Luise Weiss的腋下往外拖，拖到楼梯口时人已经没气；梁木跟着塌下，只压住一只烧焦的箱子。消防队赶开围观的人，登记了Hedwig的名字，Luise Weiss的名字写在另一张纸上。Hedwig的袖口烧穿，去诊所包扎花了三克朗，那只箱子留在院子里，谁也没再碰。
  _effects: death (smoke inhalation and burns in a building fire); health -0.03 (smoke inhalation while searching the burning room); condition; role; cash -3 (burnt clothes and a doctor visit（其中3克朗记入债务）); relation acquaintance with person:evt:world-vienna-1912:007134:child_

- **1957.11** `p9-social-tenement-neighbors.rent-note/rent-note.together-to-office` tags: housing, neighbors, tenement, daily, money, reputation
  Hedwig和Rosa Berg 2叫上楼下两家，一同去房东的事务所。Hermann Berg隔着柜台听他们说完，翻出账簿，答应先补上楼梯间的窗闩，涨租从下下个月起算。四人出门时挤在台阶上，谁也没先说话，Rosa Berg 2把帽子往后一推，说总算没白跑。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-177; mood 0.04999999999999999; relation acquaintance with person-materialized-world-vienna-1912-177_
## Anton Weiss

Born 1897.01, alive at 1957.
Education: primary 2; occupation: 店员 @ org-wednesday-psychological-society; roles: resident, worker, denouncer, partner, office:放映员, migrant, tenant_organizer, movement_member, home_patient, acting_director, debt_free, parted_unbetrothed, refugee_helper, neighbourhood_collector, petition_carrier, foster_parent, host, warehouse_keeper, deserter_helper, permit_holder, office:夜班司机, repatriation_volunteer, spa_guest, trusted_kitchen_maid, emergency_admission, morphine_patient.

### State snapshot
- under-investigation [person] (ended 1917.1: duration expired) parameters={"progress":15,"charge":"泄露政治言论"} links={} ticks=1
- oj18-odd-apprenticeship [person] (ended 1922.1: duration expired) parameters={"trust":45,"strangeKnowledge":28,"reliability":55,"nightsWorked":24,"post":"放映学徒"} links={} ticks=2
- office-under-siege [person] (ended 1925.1: duration expired) parameters={"exposure":60,"support":45,"months":0,"cause":"scandal turned into publicity","positionId":"pos:cinema:person-materialized-world-vienna-1912-4-evt:world-vienna-1912:000960:放映员:960"} links={} ticks=1
- bc18-ridiculous-fame [person] (ended 1927.1: duration expired) parameters={"notoriety":26,"legitimacy":6,"absurdity":70,"invitations":0,"boredom":28,"officialStory":"被仇人骂出名的人"} links={} ticks=3
- office-under-siege [person] (ended 1926.1: duration expired) parameters={"exposure":65,"support":30,"months":0,"cause":"double invoiced paper","positionId":"pos:cinema:person-materialized-world-vienna-1912-4-evt:world-vienna-1912:000960:放映员:960"} links={} ticks=1
- under-investigation [person] (ended 1927.1: duration expired) parameters={"progress":35,"charge":"行贿未遂"} links={} ticks=2
- office-patronage [person] (ended 1931.1: duration expired) parameters={"appointees":2,"favorDebt":25,"loyalty":43,"exposure":39,"officeTitle":"放映员","positionId":"pos:cinema:person-materialized-world-vienna-1912-4-evt:world-vienna-1912:000960:放映员:960"} links={} ticks=3
- bc18-ridiculous-fame [person] (ended 1931.1: duration expired) parameters={"notoriety":37,"legitimacy":10,"absurdity":75,"invitations":2,"boredom":4,"officialStory":"因拼写错误当上主任"} links={} ticks=2
- sm18-missing-object [person] (ended 1935.1: duration expired) parameters={"attachment":25,"leads":20,"suspicion":8,"object":"孩子的洗礼铜牌"} links={} ticks=4
- under-investigation [person] (ended 1933.1: duration expired) parameters={"progress":15,"charge":"逃税"} links={} ticks=1
- bc18-bureaucratic-ghost [person] (ended 1942.1: duration expired) parameters={"fileDepth":33,"sightings":2,"risk":30,"duplicates":3,"officialStatus":"在户籍册上已死亡","alias":"一份注销的配给卡"} links={} ticks=3
- oj18-odd-apprenticeship [person] (ended 1944.1: duration expired) parameters={"trust":0,"strangeKnowledge":18,"reliability":30,"nightsWorked":0,"post":"放映学徒"} links={} ticks=3
- institution-purge [organization] (ended 1944.1: duration expired) parameters={"target":"未说明","intensity":0.37,"denunciations":3,"vacancies":1,"reviewOpen":true} links={} ticks=1
- mb17-newcomer [person] (ended 1950.1: duration expired) parameters={"language":28,"localNetwork":10,"housingStrain":80,"permitStatus":"provisional"} links={} ticks=4
- office-under-siege [person] (ended 1946.1: duration expired) parameters={"exposure":85,"support":30,"months":0,"cause":"scandal turned into publicity","positionId":"pos:cinema:person-materialized-world-vienna-1912-4-evt:world-vienna-1912:008572:放映员:8572"} links={} ticks=1
- under-investigation [person] (ended 1949.1: duration expired) parameters={"progress":75,"charge":"泄露政治言论"} links={} ticks=4
- under-investigation [person] (ended 1947.1: duration expired) parameters={"progress":35,"charge":"行贿未遂"} links={} ticks=2
- oj18-odd-apprenticeship [person] (ended 1950.1: duration expired) parameters={"trust":50,"strangeKnowledge":30,"reliability":55,"nightsWorked":48,"post":"夜班出租车司机"} links={} ticks=3
- raising-child [household] (active) parameters={"caregiverBurden":54,"schoolProgress":24,"childConfidence":55,"careDebt":0,"schoolEnrolled":false,"leftHome":false} links={"child":"Grete Berg"} ticks=5
- institution-purge [organization] (ended 1949.1: duration expired) parameters={"target":"未说明","intensity":0.32999999999999996,"denunciations":2,"vacancies":1,"reviewOpen":true} links={} ticks=1
- raising-child [household] (active) parameters={"caregiverBurden":41,"schoolProgress":42,"childConfidence":55,"careDebt":0,"schoolEnrolled":false,"leftHome":false} links={"child":"Berta Berg"} ticks=4
- office-under-siege [person] (ended 1950.1: duration expired) parameters={"exposure":60,"support":45,"months":0,"cause":"scandal turned into publicity","positionId":"pos:taxi:person-materialized-world-vienna-1912-4-evt:world-vienna-1912:012296:夜班司机:12296"} links={} ticks=1
- ml18-sudden-fortune [household] (ended 1954.1: duration expired) parameters={"principal":62,"spent":0,"claims":3,"public":true,"source":"瓶盖专利"} links={} ticks=3
- mb17-newcomer [person] (active) parameters={"language":23,"localNetwork":8,"housingStrain":73,"permitStatus":"provisional"} links={} ticks=2
- ad20-public-attention [person] (ended 1955.1: duration expired) parameters={"attention":57,"sympathy":27,"danger":35,"opportunity":13} links={} ticks=2
- ad20-private-bargain [person] (active) parameters={"leverage":44,"trust":53,"debt":52,"exit":29} links={} ticks=2

### 343 subject events

- **1915.01** `p10-migration-tasks.ask-travel-money/uncle-refuse-introduce-carrier` tags: adulthood, migration, housing, family, travel, task, loan, relative
  舅父听完摇了摇头，说钱不借，倒可以给他写张条子，介绍一个跑布吕恩的车夫，让他搭便车走。舅母把点心收进橱里，说路上总得带点吃的。他收了条子，坐车夫的车走了两天。
  _effects: relation kin with person-hermann-kral; mood -0.03; cash -1 (路上给车夫买烟叶的道谢钱（其中1克朗记入债务）)_

- **1915.02** `p9-gap-adult-ordinary-day.flea-market-cup/flea-market-cup.walk-back-too-late` tags: adulthood, daily, leisure, neighborhood, ordinary, flea_market, object
  她走到街口又折回来，Anna Moser正在试一顶旧帽子，对着小镜子左右照。摊主摊手说杯子卖掉了，还说下回有好的瓷器给她留着。Anton Weiss把手里攥着的四十赫勒放回口袋，硬币碰出轻轻一声。
  _effects: mood -0.01; relation acquaintance with person-anna-moser_

- **1915.03** `vienna-history-sdap-public-meeting/listen-from-the-back` tags: history, social_democracy, sdap, public_meeting, politics
  Anton Weiss 站在《Arbeiter-Zeitung》印刷楼后厅的最后一排。Victor Adler 讲到八小时工作制和选举权时，台下有人把帽子举起来。散会时，一个熟识的排字工把油印提纲塞过来，纸上还带着油墨味；Anton Weiss 没有举手，只把提纲折成四折。
  _effects: knowledge “在1912年前后的维也纳，社会民主党把八小时工作制、选举权和组织权放在同一次集会里动员工人。”; historical development:seed-vienna-social-democracy-1912 as witness; mood 0.02_

- **1915.04** `vienna-social-movement.recruitment/report-to-official` tags: development, social_movement, organization, politics
  Anton Weiss把传单交给楼里的门房。门房没有接，只让Anton Weiss自己去找警察局。那天傍晚，两个穿便衣的人在街口站了很久。
  _effects: role; reputation 0.02_

- **1916.01** `vienna-market-debt.coal-credit/coal-part-cash-part-furniture` tags: market, debt, money, home, shop
  你数出四十赫勒搁在秤盘上，说剩下的一克朗用那张旧折叠桌抵。老板撇了撇嘴，让伙计跟你上楼搬桌子。桌子腿有点晃，但木料还结实。邻居在楼道里搭了把手，账本上这一页只写了一行，没写利息。
  _effects: cash -0.4 (买煤付的部分现钱（其中0.4克朗记入债务）); food; relation acquaintance with person-anna-moser_

- **1916.01** `r15-curse.betrayal-at-table::ctx-klosterneuburg-rural-1912::milieu-tenement/sold-a-secret` tags: betrayal, social, family, trust, secret, rural, agriculture, small_town
  Ferdinand Winter 2把Anton Weiss在饭桌上说过的名字和地址卖给了别人。几天后，Anton Weiss发现自己的话出现在一封不该出现的信里。Ferdinand Winter 2没有否认，只说“大家都要活”。
  _effects: mood -0.12; flag +betrayed_after_trusting; relation rival with person-materialized-world-vienna-1912-6; state_add under-investigation state:world-vienna-1912:25_

- **1916.01** `kernel-civic.petition-drive::ctx-klosterneuburg-rural-1912::milieu-tenement/civic-petition-refused` tags: politics, petition, reform, neighbor, organization, rural, agriculture, small_town
  他把签名纸送到市政厅，Friedrich Hofer说格式不对，要按街道分开。他回去重抄，发现有几个名字已经认不出；再去时，窗口换了一个人，说前一班没有交接。他坐在市政厅台阶上重抄，风把纸吹到花坛里。
  _effects: flag +petition_refused; reputation 0.02; relation acquaintance with person-friedrich-hofer; cash -0.5 (重抄签名纸的纸笔钱); knowledge “请愿书要按街道分页，窗口换班时前一班可能没有交接”_

- **1916.08** `p9-gap-adult-ordinary-day.lost-dog/lost-dog.feed-bread` tags: adulthood, daily, leisure, neighborhood, ordinary, animal, neighbor
  狗的项圈上嵌着一块铜牌，磨得字迹模糊。Anton Weiss蹲在墙根，把面包撕成小块放在石板上，狗先闻了闻她的手指才低头吃。她摸了摸它的后颈，毛底下那根脊骨瘦得硌手。
  _effects: mood 0.03_

- **1916.12** `vienna-tenement-neighbors.laundry_line_dispute/neighbor_yanks_clothes` tags: home, social, family, housing
  Ferdinand Winter 2嫌Anton Weiss的床单滴水滴到Ferdinand Winter 2家衬衫上，一把扯下床单扔在院子的石板上。Anton Weiss下楼捡起来时，床单角沾了泥，重洗又要费肥皂。两人在院子当中对喊，楼上有人推开窗看热闹。Anton Weiss把床单重新搭上绳子时，故意把水拧在Ferdinand Winter 2那侧。
  _effects: relation rival with person-materialized-world-vienna-1912-6; cash -0.15 (重洗床单的肥皂钱（其中0.15克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-6_

- **1917.01** `vienna-family-divorce/separate-under-one-roof` tags: family, marriage, divorce, housing, lifecycle, separation
  Anton Weiss和Helene Weiss把床铺分开，米和煤也各算各的。两人仍住在Haus der Tante in Klosterneuburg，因为谁都没有钱再租一间房；孩子在两床之间来回，三克朗买了隔开的锅碗和煤油，家里从此有两本账，夜里两盏灯先后熄灭。
  _effects: relation_end partner with person-materialized-world-vienna-1912-5; mood -0.08000000000000002; mood -0.08; cash -3 (separate household goods（其中3克朗记入债务）)_

- **1917.01** `vienna-medical-treatment.night-fever/hospital-night` tags: health, medical, family, money
  电车在环城大道上哐当响，Maria Kral攥着Anton Weiss的胳膊，怕人从座位上滑下去。急诊厅的煤气灯发黄，长椅上全是咳嗽声，押金窗口的铜盘递出两克朗，换来一张硬纸号牌。
  _effects: cash -2 (医院急诊押金（其中2克朗记入债务）); health 0.08 (急诊观察和冰敷退烧); relation friend with person-maria-kral_

- **1917.01** `state_expire:under-investigation` tags: under-investigation, legal, police, investigation, risk, state, state_tick, state:under-investigation
  Anton Weiss的「被调查」到期；相关安排结束。
  _effects: state_remove under-investigation state:world-vienna-1912:25_

- **1917.01** `p9-work-jobsearch.railway-depot/railway-depot.eyesight-failed` tags: work, job_search, negotiation, wages, employment, task, railway, depot
  排在他前面的Otto Winter很快过了关。轮到他时，医生把灯挪近了些，他还是念错。出了南站，太阳才刚爬上车皮，他站在路边把揉皱的证明捋平。
  _effects: mood -0.06; flag +seeking_work; relation acquaintance with person-materialized-world-vienna-1912-10; relation acquaintance with person-materialized-world-vienna-1912-10_

- **1917.04** `p9-social-courtship-friendship.opened-letter/opened-letter-cold-reply` tags: courtship, friendship, social, adulthood, reputation, leopoldstadt
  Anton Weiss信了听来的话，把回信写得又短又冷，只问对方家里到底嫌哪一样，写完封了口，第二天一早塞进街角的邮筒。此后走廊里碰见Katharina Bauer，两边都只点头，话绕开信的事走；Anton Weiss与Anna Bauer之间那点热乎气，也被这四行字压凉了。
  _effects: mood -0.06_

- **1917.09** `vienna-housing-move.moving-day/moving-day-cart` tags: housing, home, rent, family, money, household
  Anton Weiss把铁盒抱在怀里，其余东西都交给Karl Kraus和车夫。楼道里挡路的自行车被挪到墙边，锅沿碰上车挡板，咣的一声。新住处门前没有台阶，省得再抬。
  _effects: cash -6 (雇马车搬家具一趟的工钱（其中6克朗记入债务）); residence_

- **1918.01** `vienna-family-same-sex-male/leave-vienna` tags: family, intimacy, same_sex, persecution, lifecycle, partnership, migration
  两张车票分开买，Anton Weiss在月台这头，Josef Bauer在那头。火车开动后两人才在车厢连接处站到一起，谁也没有说话，只把行李往同一张座位底下推。
  _effects: relation partner with person-josef-bauer; move place-klosterneuburg-aunt-house; move place-klosterneuburg-aunt-house; cash -12 (train tickets and lodging（其中12克朗记入债务）)_

- **1918.01** `kernel-migrate.refugee-aid::ctx-klosterneuburg-rural-1912::milieu-tenement::civic-refugee-rural/civic-refugee-rural-farm` tags: migration, refugee, missing_relative, care, postwar, rural, agriculture, small_town
  收容所把一批难民送到乡下，Ferdinand Winter 2被分到葡萄园做工。他去看时，对方正在搬筐，手上全是划痕；农场主说“管饭就不错了”，他把自己带的奶酪留下。他离开时，Ferdinand Winter 2把一只编好的草篮塞给他。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-6; cash -2 (带给难民的奶酪和车钱（其中1.45克朗记入债务）); flag +refugee_farm_placement; knowledge “乡下安置只保证管饭，工钱要等收成后按桶算”_

- **1918.06** `p9-gap-adult-unemployed.labour-exchange/exchange-fee-lost` tags: adulthood, unemployment, casual_labour, poverty, daily, labour_exchange, bureaucracy
  一克朗是Anton Weiss身上最后一张整票。纸条上的地址在城郊，坐电车又花了几赫勒。工头叼着烟说你来晚了，Anton Weiss攥着纸条站了一会儿，回程的路走了一个钟头。
  _effects: cash -1 (职业介绍所登记费（其中1克朗记入债务）); mood -0.03999999999999998; relation acquaintance with person-materialized-world-vienna-1912-21_

- **1919.01** `p9-social-daily-culture.last-standing-ticket/p9-social-daily-culture.last-standing-ticket.got-ticket` tags: daily, culture, leisure, cafe, music, walk, task, task:culture
  Anton Weiss挤到窗口前，把一克朗硬币推进凹槽，换回一张印着座号的薄纸片。顶层站席的栏杆被前面的人汗湿，Anton Weiss侧身找了个能看见舞台边的位置，倚着烫手的铁栏看完两幕；散场时小腿发麻，嘴里还哼着刚听到的曲调，幕间也和邻座搭上了两句话。
  _effects: cash -1 (约瑟夫施塔特剧院顶层站票); mood 0.06; skill_

- **1919.04** `vienna-adult-social.sunday-table/sunday-table.repair` tags: adulthood, social, work, family, partnership
  Josef Bauer从柜子里拿出攒了三个月的零钱袋，倒在桌上，说先给Anton Weiss买双能进厂的结实靴子。Anton Weiss数出鞋匠要的数目，把剩下的又推回袋子中央。
  _effects: cash -3 (凑钱买了一双结实的工靴（其中3克朗记入债务）); health 0.019999999999999997 (脚上有了不漏水的靴子); relation partner with person-josef-bauer_

- **1919.05** `oj18-cinema.reel::ctx-klosterneuburg-rural-1912::milieu-tenement/cut-the-reel` tags: cinema, film, projection, night, censorship, work, odd_job, rural
  放映到第十一本，胶片在片门里卷成一团。Anton Weiss剪掉烧焦的一截，发现后面接的是一卷没送审的新闻片：军靴踏过广场，镜头扫过一张张被按下去的脸。Josef Huber在黑暗里说“接回正片”，Anton Weiss照做了。
  _effects: organization_found 小巷电影院 (household_firm); position 放映员 @cinema:person-materialized-world-vienna-1912-4-evt:world-vienna-1912:000960; state_add oj18-odd-apprenticeship state:world-vienna-1912:40; cash 1 (projectionist wages); skill; flag +cut_the_reel; knowledge “第十一本胶片里夹着没送审的新闻片，{projectionist}让我接回正片。”; relation acquaintance with person-materialized-world-vienna-1912-13; role; flag +odd_job_apprentice_

- **1919.09** `ml18-gambling.card-system::ctx-klosterneuburg-rural-1912::milieu-tenement/stop-while-ahead` tags: gambling, luck, money, casino, risk, absurd, rural, agriculture
  纸牌桌上连开三把庄。Anton Weiss按自己写在烟盒背面的翻倍法，把最后十五克朗押在闲上。庄家翻开一张四，闲家九点；Josef Bauer的手在桌下抓住Anton Weiss的袖子；Anton Weiss把赢回的三十克朗换成现钱，数出十克朗塞进袜筒，剩下的放进内袋，说今晚到此为止。
  _effects: cash 30 (winnings taken off the card table); state_add ml18-sudden-fortune state:world-vienna-1912:39; relation partner with person-josef-bauer; reputation 0.020000000000000004; flag +left_the_table_ahead; mood 0.08000000000000002; flag +sudden_fortune; reputation 0.019999999999999997; mood 0.030000000000000027_

- **1919.10** `vienna-parish-aid.sick-call/sick-call.help-in` tags: faith, parish, mutual_aid, poverty, family, injury
  Anton Weiss和Josefine Hofer一起上楼，门没锁，屋里一股酸味。病人裹着毯子坐在床沿咳嗽，炉子只剩灰。Anton Weiss去楼下讨了几块煤核，蹲着把火生起来，又用带来的面粉搅了一小锅稀粥。药粉冲开，碗底沉着白渣，Anton Weiss先垫了药钱，说以后再说。
  _effects: cash -0.6 (替病人垫上药粉钱); health -0.019999999999999997 (在病人屋里待久了，嗓子发干); flag +parish_sick_visitor_

- **1920.01** `oj18-cinema.censor::ctx-klosterneuburg-rural-1912::milieu-tenement/cuts-made` tags: cinema, film, censorship, projection, suspense, work, odd_job, rural
  Friedrich Hofer坐在最后一排，用铅笔在节目单上画线：接吻的镜头太长，街垒的镜头太真，结尾的国旗只能留半面。Anton Weiss照着剪了四十米，晚上Friedrich Hofer在许可证上盖章，顺手把两张票钱压在放映室的窗台上。
  _effects: cash 1 (censor's ticket money); state_parameter oj18-odd-apprenticeship.trust 30 -> 35; state_parameter oj18-odd-apprenticeship.reliability 50 -> 55; relation acquaintance with person-friedrich-hofer; flag +license_renewed; knowledge “审查员用铅笔在节目单上画了三条线，国旗只能留半面。”_

- **1920.01** `state_tick:ml18-sudden-fortune/fortune-year/money-slips-away` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  钱在一年里薄了一层：屋顶要修，姐夫来借，彩票站的老主顾说有个稳赚的买卖。Anton Weiss把账本翻到最后一页，发现写下的支出比记得的多出四克朗；窗外有人在敲铁皮，声音像在催账。
  _effects: state_parameter ml18-sudden-fortune.principal 30 -> 25; state_parameter ml18-sudden-fortune.spent 0 -> 5; cash -1 (the account does not balance); mood -0.01999999999999999_

- **1920.01** `state_tick:oj18-odd-apprenticeship/strange-year/trusted-with-the-keys` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  两年过去，Anton Weiss已经能闭着眼说出哪块地板会响、哪盏煤气灯该在几点关。师傅把备用钥匙交下来，没有解释为什么第三把钥匙磨得最亮；Anton Weiss也没有问，只在巡查簿最后一页画了一个小小的记号。
  _effects: state_parameter oj18-odd-apprenticeship.trust 35 -> 45; state_parameter oj18-odd-apprenticeship.strangeKnowledge 18 -> 28; state_parameter oj18-odd-apprenticeship.nightsWorked 0 -> 24; cash 2 (night-shift wages); skill_

- **1920.01** `p9-social-daily-culture.sunday-hill/p9-social-daily-culture.sunday-hill.first-winery` tags: daily, culture, leisure, cafe, music, walk, task, task:daily
  Anton Weiss和Ferdinand Berg在第一个酒棚就坐下了，要了一壶新酒，Gustav Berg摸出一副磨损的纸牌。三人打到下午，太阳偏西也没再往上爬；Anton Weiss输了几个铜板，连酒带牌局一共一克朗五十赫勒，倒赢回一肚子笑话。回程的电车上，Anton Weiss靠着窗，酒意上来，差点坐过站。
  _effects: cash -1.5 (酒棚的新酒和牌局输的铜板); relation friend with person-materialized-world-vienna-1912-12; relation acquaintance with person-gustav-berg; mood 0.04000000000000001; relation acquaintance with person-materialized-world-vienna-1912-12_

- **1920.02** `vienna-historical-social-movement.public-meeting/stay-and-tidy-chairs` tags: history, historical_process, social_movement, organization, politics
  Anton Weiss整场没上台，散会后留下把折叠椅叠好，扫掉地上的瓜子壳。Franz Lechner帮着把借来的煤气灯还给店主，顺手记下谁走得最早。Wiener Psychoanalytische Vereinigung的人问Anton Weiss为何不发言，Anton Weiss说先把椅子还齐。
  _effects: skill; mood -0.01999999999999999_

- **1920.08** `vienna-market-household.friday-fish/friday-fish.salt` tags: home, market, food, social
  腌鲱鱼切成两段，一段今天吃，一段留着。黑面包硬得要用刀锯。Anna Moser来借盐，眼睛落在鱼上，说可以用半棵卷心菜换一块。Anton Weiss切了一指宽递过去。
  _effects: cash -2 (腌鲱鱼和黑面包); food; relation acquaintance with person-anna-moser_

- **1920.08** `state_reaction:ml18-sudden-fortune/a-relative-remembers` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  一个多年没走动的亲戚提着一盒点心上门，先问Anton Weiss的身体，再问那笔钱是怎么来的。临走时他说起小时候替Anton Weiss家垫过一冬天的煤钱，数字记不清了，但意思很清楚。
  _effects: state_parameter ml18-sudden-fortune.claims 1 -> 2; flag +windfall_claim_by_relative; mood -0.01999999999999999_
  _causes: evt:world-vienna-1912:001182_

- **1920.12** `vienna-housing-move.moving-day/moving-day-cart` tags: housing, home, rent, family, money, household
  车夫把价钱咬得很死，Anton Weiss还到五克朗又添了二十赫勒，才说定跑一趟。Maria Kral 2扶着床架，车过路口时煤箱歪了一下，细灰撒在路面上。到了地方，东西卸在门厅，天已经大亮。
  _effects: cash -6 (雇马车搬家具一趟的工钱); residence; relation acquaintance with person-materialized-world-vienna-1912-26; relation acquaintance with person-materialized-world-vienna-1912-26_

- **1921.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss把Anna Weiss的旧课本包上书皮，又在本子上签了名。Anna Weiss今年学会了自己系鞋带，也学会了在饭桌上说“不”；Anton Weiss听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 13 -> 21; state_parameter raising-child.caregiverBurden 55 -> 52; mood 0.01999999999999999_

- **1921.01** `state_tick:ml18-sudden-fortune/fortune-year/money-keeps-working` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  一年过去，钱没有变多，却也没有一下花完。Anton Weiss把一部分存进邮局储蓄所，一部分借给楼下的鞋匠；鞋匠每月送来一双补好的鞋，利息就夹在鞋垫下面。街口的杂货商开始把好面粉留到Anton Weiss来的时候。
  _effects: cash 2 (interest and small repayments on the windfall); state_parameter ml18-sudden-fortune.claims 2 -> 3; mood 0.010000000000000009_

- **1921.01** `p10-migration-tasks.ask-travel-money/aunt-private-money` tags: adulthood, migration, housing, family, travel, task, loan, relative
  舅父在里屋翻账簿半天没出来，舅母趁空从围裙里掏出一卷私房钱，数出十克朗塞给他，说到了家乡先给她写封信。他把钱收下，出门时在门口站了一会儿，才把帽子戴正。
  _effects: cash 10 (舅母私下给的路费); relation kin with person-helene-winter; mood 0.03; relation acquaintance with person-materialized-world-vienna-1912-28_

- **1921.04** `vienna-tenement-neighbors.lost_room_key/key_lost_landlady` tags: home, social, family, housing
  Anton Weiss把钥匙丢在了回家路上的有轨电车轨道旁，天黑也没找着。房东太太说换锁芯要一克朗五十赫勒，从下月房租里扣。Friedrich Hofer借给Anton Weiss一把旧挂锁，但锁鼻和门扣对不上，只能用铁丝拧着凑合。那夜Anton Weiss睡不踏实，总觉得有人在拧门。
  _effects: cash -1.5 (换锁芯费用（其中1.5克朗记入债务）); relation acquaintance with person-friedrich-hofer; mood -0.06_

- **1921.09** `p9-gap-adult-solitude.remake-coat/remake-coat.short-jacket` tags: adulthood, daily, solitude, ordinary, home, mending, clothing, household
  Anton Weiss把外套的肩线拆开，往里收了四指，袖口剪掉一截，改出一件到胯骨的短上衣。剩下的布头拼成两只手套，针脚粗，戴着能挡风。她在镜子前转了一圈，肩还是有点空，但总算能穿出门。
  _effects: skill; mood 0.04999999999999999_

- **1921.11** `vienna-market-household.market-credit/market-credit.delay` tags: home, market, food, social
  周五Anton Weiss摊开手掌，只有两个克朗二十个十字币。玛丽亚挥挥手让下周再给。下周Anton Weiss把钱放到秤盘上，玛丽亚擦掉名字，却在木牌角上画了个叉。
  _effects: cash -3 (延迟偿还市场赊账（其中3克朗记入债务）); food; reputation -0.05_

- **1922.01** `state_expire:ml18-sudden-fortune` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  Anton Weiss的「一笔突然到手的钱」到期；相关安排结束。
  _effects: state_remove ml18-sudden-fortune state:world-vienna-1912:39; flag -sudden_fortune_

- **1922.01** `state_expire:oj18-odd-apprenticeship` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  Anton Weiss的「奇职学徒」到期；相关安排结束。
  _effects: state_remove oj18-odd-apprenticeship state:world-vienna-1912:40; role; flag -odd_job_apprentice_

- **1922.01** `agency:support_process` tags: agency, agency:support_process
  Anton Weiss为维也纳社会民主党在工人街区、工会和报刊网络中持续活动，争取普选、劳动保护与社会救济出了力：整理名单、传递消息或替同伴作证，名字被记进参与记录。
  _effects: historical development:seed-vienna-social-democracy-1912 as supporter; historical_influence; reputation 0.015_

- **1922.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Anna Weiss这周主动擦了黑板。Anton Weiss把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 21 -> 24; mood 0.01999999999999999_
  _causes: evt:world-vienna-1912:001654_

- **1922.06** `vienna-market-debt.pawn-watch/pawn-chain-only` tags: market, debt, money, home, shop
  链子从你指缝里滑下去，落在绒布上几乎没有声音。掌柜说两克朗四十赫勒，你点了点头。出门时你把表掏出来上了几圈弦，它还在走，只是再没法挂在马甲上了。
  _effects: cash 2.4 (典当银表链所得); mood -0.01999999999999999; relation acquaintance with person-materialized-world-vienna-1912-8; relation acquaintance with person-materialized-world-vienna-1912-8_

- **1922.09** `vienna-medical-treatment.toothache/barber-pull` tags: health, medical, family, money
  理发铺里还坐着等刮脸的老主顾，肥皂味和烟味混在一起。弗朗茨把围布往Anton Weiss胸前一系，说忍着点。钳子第一次滑脱，第二次才夹稳，牙出来时带着一小块肉，他用明矾水按住了。
  _effects: cash -1.2 (理发师拔牙收费（其中1.2克朗记入债务）); health 0.03 (病牙被拔除但手法粗糙); mood -0.01999999999999999_

- **1923.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss被叫到学校，老师说Anna Weiss这学期总在课上看窗外。回家的路上，Anton Weiss没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 24 -> 19; state_parameter raising-child.caregiverBurden 52 -> 57; cash -2 (extra lessons and replacement pencils（其中0.2克朗记入债务）); mood -0.03_

- **1923.01** `major-task.relocation-klosterneuburg/moved-with-promise` tags: task, task:migration, migration, move, klosterneuburg, household
  维也纳的房东把阁楼租金又涨了一成，Anton Weiss才下决心走。Anton Weiss在户籍办事处排了两个上午，把迁出证明和劳工证办齐。Josef Moser在表格上盖了章，提醒到克洛斯特新堡后三天内去镇公所报到。月底，一家人把锅、被子和工具捆上手推车推到北站，坐火车到克洛斯特新堡，再借一辆手推车把东西推上坡，搬进姑妈家的阁楼；姑妈说葡萄园正缺短工，天亮先去问，不一定留下。
  _effects: move place-klosterneuburg-aunt-house; flag +vineyard_work_promised; cash -18 (train tickets, cart and attic rent（其中18克朗记入债务）); role; knowledge “迁出维也纳后要到镇公所登记，劳工证要随身带。”; relation acquaintance with person-materialized-world-vienna-1912-44_

- **1923.04** `vienna-legacy-worklife.union-office/union-office.enroll-first` tags: legacy, work, family, reform, ordinary_life
  一克朗硬币在桌上排开。Anton Weiss数了两遍，才在名册上写“已缴”。窗外有人探头问这里是不是工会，接待的人这次知道怎么开口了，把门拉开一半。
  _effects: cash 1 (新会员的入会费先记在桌上); relation acquaintance with person-katharina-bauer; skill_

- **1923.07** `vienna-housing-move.moving-day/moving-day-sell-up` tags: housing, home, rent, family, money
  床架从楼梯上拖下来时油漆蹭掉了好几块，Anton Weiss站在旁边没作声。收破烂的走后，屋里空得回声都变大了，Anton Weiss抱着铁盒出门，只把门锁好，钥匙从看门人手里交出去。
  _effects: cash 2 (卖掉旧床架和桌子收进的钱); mood -0.03; relation acquaintance with person-maria-kral_

- **1923.07** `statistical_infection`
  Anton Weiss在Haus der Tante in Klosterneuburg病倒了，肺炎让身体发热、虚弱，接下来的日子只能卧床。

- **1923.09** `statistical_illness_worsened`
  Anton Weiss的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1923.12** `statistical_illness_worsened`
  Anton Weiss的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1924.01** `statistical_recovery`
  Anton Weiss熬过了这场肺炎，能坐起来喝一点汤，但身体还很虚。

- **1924.01** `office16-scandal.public-hearing::ctx-klosterneuburg-rural-1912::milieu-tenement/the-scandal-helps` tags: office, scandal, media, reputation, politics, power, rural, agriculture
  照片登出后，Anton Weiss收到十七封邀请函，都是请去讲“如何面对舆论”。一个工商业协会送来一笔“研究资助”，请Anton Weiss去讲一次闭门课；课酬刚好补上办公室这个月的缺口。
  _effects: reputation 0.05; organization_funds; state_add office-under-siege state:world-vienna-1912:61; flag +scandal_turned_into_speaking_fee; knowledge “十七封邀请函里，有十二封问的是同一件事：能不能把丑闻讲成经验。”; mood 0.04000000000000001; relation acquaintance with person-materialized-world-vienna-1912-7; relation acquaintance with person-materialized-world-vienna-1912-22; flag +office_under_siege_

- **1924.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Anna Weiss这周主动擦了黑板。Anton Weiss把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 19 -> 22; mood 0.01999999999999999_
  _causes: evt:world-vienna-1912:002080_

- **1924.01** `p9-work-jobsearch.ask-trial/ask-trial.no-vacancy` tags: work, job_search, negotiation, wages, employment, task, trial, factory
  Grete Bauer没有接话，先从抽屉里撕下一角纸。Anton Weiss把名字、住址和手艺一样样说完，工头边写边应，写完把纸压回抽屉，说月底来问。
  _effects: mood -0.04000000000000001; relation acquaintance with person-materialized-world-vienna-1912-46; relation acquaintance with person-materialized-world-vienna-1912-46; relation acquaintance with person-materialized-world-vienna-1912-31_

- **1924.06** `vienna-tenement-neighbors.lost_room_key/key_lost_landlady` tags: home, social, family, housing
  Anton Weiss把钥匙丢在了回家路上的有轨电车轨道旁，天黑也没找着。房东太太说换锁芯要一克朗五十赫勒，从下月房租里扣。Hermann Kral借给Anton Weiss一把旧挂锁，但锁鼻和门扣对不上，只能用铁丝拧着凑合。那夜Anton Weiss睡不踏实，总觉得有人在拧门。
  _effects: cash -1.5 (换锁芯费用（其中1.5克朗记入债务）); relation acquaintance with person-hermann-kral; mood -0.06_

- **1924.06** `major-crisis.rent-increase/tenant-meeting` tags: crisis, housing, rent, eviction, family, poverty
  巷口洗衣房的老板娘把几张椅子摆开，叫来半条街的租户。Anton Weiss把涨租单摊在桌上，逐条念出上面的数字；Hermann Kral站在门边，既没走，也没替房东说话。大家决定先集体迟交一个月，签名纸传到Anton Weiss手里时，纸上已经有一块油渍。
  _effects: cash -2 (paper, ink and tram fare for the tenants meeting); role; flag +rent_strike; relation acquaintance with person-hermann-kral; reputation 0.03_

- **1924.11** `bc18-enemy.accidental-help::ctx-klosterneuburg-rural-1912::milieu-tenement/letter-printed-as-praise` tags: enemy, mistake, work, reputation, absurd, luck, social, rural
  Elisabeth Winter写了一封告状信，列数Anton Weiss的懒惰、贪婪和“可疑的出身”，却把信封上的地址写成了报社。Friedrich Hofer以为这是一篇自荐小品，删掉几处脏话登了出来；读者喜欢这种不留情面的自嘲，两个商行给Anton Weiss寄来聘书。Elisabeth Winter在咖啡馆看见报纸，差点把杯子捏碎。
  _effects: cash 4 (商行聘书的预付薪金); reputation 0.05; state_add bc18-ridiculous-fame state:world-vienna-1912:62; relation rival with person-materialized-world-vienna-1912-32; relation acquaintance with person-friedrich-hofer; condition; flag +enemys_letter_became_an_advert; mood 0.03; relation acquaintance with person-materialized-world-vienna-1912-32; flag +ridiculously_famous; reputation 0.020000000000000004; mood 0.01999999999999999_

- **1925.01** `office16-corruption.inspection::ctx-klosterneuburg-rural-1912::milieu-tenement/fined` tags: office, corruption, audit, legal, power, dark, rural, agriculture
  Friedrich Hofer在第三份合同上停住了：同一批纸张被报了两次价，第二次的签字是Anton Weiss。罚款单当场开出，金额不算大，但足够让下一季度的办公用品全部改成最便宜的牌子。Anton Weiss没有争辩，只在收据背面写了日期。
  _effects: reputation -0.04999999999999999; mood -0.06; state_add office-under-siege state:world-vienna-1912:82; flag +fined_after_audit; knowledge “同一批纸张被报了两次价，第二次的签字是我的。”; relation acquaintance with person-materialized-world-vienna-1912-45_

- **1925.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss被叫到学校，老师说Anna Weiss这学期总在课上看窗外。回家的路上，Anton Weiss没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 22 -> 17; state_parameter raising-child.caregiverBurden 57 -> 62; cash -2 (extra lessons and replacement pencils（其中2克朗记入债务）); mood -0.030000000000000027_

- **1925.01** `state_expire:office-under-siege` tags: office-under-siege, office, scandal, pressure, politics, legal, risk, state
  Anton Weiss的「职位受围」到期；相关安排结束。
  _effects: state_remove office-under-siege state:world-vienna-1912:61; flag -office_under_siege_

- **1925.01** `state_tick:bc18-ridiculous-fame/ridiculous-fame-year/the-audience-gets-bored` tags: bc18-ridiculous-fame, fame, reputation, mistaken_identity, promotion, media, absurd, public
  观众开始厌倦同一个故事。园艺会请了更年轻的发明家，女子学校把Anton Weiss的名字从海报上撤下；Anton Weiss在咖啡馆听见有人说“那个人还在讲火柴”。同一个月，一张报纸把旧照片配上新标题，问Anton Weiss是否已经“过气”。纠正的冲动又回来，但没有人再提问。
  _effects: state_parameter bc18-ridiculous-fame.legitimacy 10 -> 2; state_parameter bc18-ridiculous-fame.boredom 4 -> 16; state_parameter bc18-ridiculous-fame.invitations 2 -> 1; reputation -0.020000000000000004; mood -0.030000000000000027_

- **1925.01** `kernel-health.task-house-call::ctx-klosterneuburg-rural-1912::milieu-tenement/house-call-doctor-arrives` tags: health, task, house_call, care, poverty, rural, agriculture, small_town
  医生在午后进门，先看了看炉子，再听胸口。他说是肺炎，留下三包药粉和一张账单；Hermann Kral替Anton Weiss把医生送到门口，回来时把药按顿分好。邻居把账单压在钟底下，说这钱先别急着还，药要按时吃。
  _effects: cash -12 (house call, medicine powder and a certificate（其中12克朗记入债务）); health 0.04 (pneumonia treated at home by a doctor); condition; role; relation acquaintance with person-hermann-kral; knowledge “医生出诊先看炉子再听胸口，三包药粉和一张账单就是全部治疗。”_

- **1925.06** `ml18-office.envelope-under-the-file::ctx-klosterneuburg-rural-1912::milieu-tenement/the-envelope-is-a-trap` tags: office, corruption, money, scandal, legal, risk, rural, agriculture
  信封里不是钞票，是裁成钞票大小的报纸。Helene Bauer带着两名记录员从侧门进来，桌上还摊着Anton Weiss没有合上的审计文件。Anton Weiss说这是有人栽赃，Helene Bauer把信封翻过来，背面写着一个只有Anton Weiss知道的编号。
  _effects: state_add under-investigation state:world-vienna-1912:83; state_parameter office-under-siege.exposure 40 -> 65; state_parameter office-under-siege.support 45 -> 30; reputation -0.06; flag +bribery_trap; knowledge “信封里装的是报纸剪成的假钞，背面有我的办公室编号。”; mood -0.08000000000000002_

- **1925.08** `vienna-social-movement.recruitment/join-and-carry` tags: development, social_movement, organization, politics
  Anton Weiss在楼梯下面接到一张折成四折的传单。纸上没有署名，只写着下一次集会的地址。Anton Weiss去了，在昏暗的屋里报上姓名，成为Wiener Psychoanalytische Vereinigung的一员，并答应负责自己所在街区的联络。
  _effects: organization_membership; role; relation acquaintance with person-hermann-kral_

- **1925.12** `vienna-parish-aid.soup-kitchen/soup-kitchen.take-and-carry` tags: faith, parish, mutual_aid, poverty, family
  汤是豆子熬的，表面浮着几粒油星，气味把整条巷子都占了。Franz Berg排在前面，回头替Anton Weiss看着位置，嘴里数着还剩几个人。铁罐递过去时烫手，Anton Weiss用围裙角垫着。
  _effects: food; mood 0.02999999999999997_

- **1926.01** `bc18-fame.lecture-tour::ctx-klosterneuburg-rural-1912::milieu-tenement/confession-applauded` tags: fame, lecture, travel, absurd, public, invention, reputation, rural
  讲到第三场，Anton Weiss放下讲稿，说自己其实不是发明家，只是被一张剪报推上了台。礼堂安静了一瞬，随后响起比前两场更长的掌声；Maria Kral说，一个肯承认此事的人比发明家更难得。募捐盘里多出三克朗，Alois Hofer当晚就把“诚实”写进了下一张海报。
  _effects: cash 3 (募捐盘里分到的钱); state_parameter bc18-ridiculous-fame.legitimacy 2 -> 14; state_parameter bc18-ridiculous-fame.notoriety 20 -> 26; reputation 0.03; flag +confession_mistaken_for_modesty; mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-15_

- **1926.01** `state_tick:bc18-ridiculous-fame/ridiculous-fame-year/the-audience-gets-bored` tags: bc18-ridiculous-fame, fame, reputation, mistaken_identity, promotion, media, absurd, public
  观众开始厌倦同一个故事。园艺会请了更年轻的发明家，女子学校把Anton Weiss的名字从海报上撤下；Anton Weiss在咖啡馆听见有人说“那个人还在讲火柴”。同一个月，一张报纸把旧照片配上新标题，问Anton Weiss是否已经“过气”。纠正的冲动又回来，但没有人再提问。
  _effects: state_parameter bc18-ridiculous-fame.legitimacy 14 -> 6; state_parameter bc18-ridiculous-fame.boredom 16 -> 28; state_parameter bc18-ridiculous-fame.invitations 1 -> 0; reputation -0.020000000000000004; mood -0.030000000000000027_

- **1926.01** `state_expire:office-under-siege` tags: office-under-siege, office, scandal, pressure, politics, legal, risk, state
  Anton Weiss的「职位受围」到期；相关安排结束。
  _effects: state_remove office-under-siege state:world-vienna-1912:82_

- **1926.01** `state_tick:under-investigation/case-progress/evidence` tags: under-investigation, legal, police, investigation, risk, state, state_tick
  调查员又来找Anton Weiss谈了一次。问话比上次具体，记录也比上次长。
  _effects: state_parameter under-investigation.progress 20 -> 35; mood -0.03999999999999998_

- **1926.01** `p9-social-daily-culture.lending-library/p9-social-daily-culture.lending-library.volksbibliothek` tags: daily, culture, leisure, cafe, music, walk, task, task:knowledge
  Anton Weiss听Luise Kral报出押金数目，把伸进内袋的手又抽了回来。问清免费阅览处的位置后，Anton Weiss穿过两条街，在 Volksbibliothek 的阅览室门口登记了姓名，坐在长桌边读了一下午；一个赫勒没花，只是不能把书带回家，天黑前就得还回去。
  _effects: mood 0.02999999999999997; skill_

- **1926.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Anna Weiss这周主动擦了黑板。Anton Weiss把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 17 -> 20; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:002686_

- **1926.06** `vienna-social-movement.meeting/quiet-solidarity` tags: development, social_movement, organization, meeting
  Anton Weiss没有发言，只把带来的面包分成几份。散会时，一个不认识的女人把她的地址塞给Anton Weiss，说那条街还需要有人继续收会费。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-7_

- **1927.01** `office16-favor.private-sinecure::ctx-klosterneuburg-rural-1912::milieu-tenement/favor-refused` tags: office, favor, corruption, patronage, family, power, rural, agriculture
  Anton Moser把一篮鸡蛋放在Anton Weiss家门口，说只要一个不用打卡的位子。Anton Weiss把鸡蛋拎回对方手里，说编制表不是自家的抽屉。两个人站在楼梯间，谁也没有再提这件事；第二天见面，还是点了头。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-7; reputation 0.03; flag +refused_private_favor; mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-34_

- **1927.01** `r1-cul.sports-match::ctx-klosterneuburg-rural-1912::milieu-tenement/twisted-ankle` tags: culture, sport, match, injury, bribe, rural, agriculture, small_town
  Anton Weiss在争顶时踩进一个坑，脚踝向外折了一下。Friedrich Kral把Anton Weiss架到场边，Elisabeth Weiss蹲下来捏了捏脚背，说骨头没事，韧带不好说。第二天Anton Weiss的脚肿得穿不进鞋，工位被别人顶了。
  _effects: cash -2 (最后一分钟的球（其中0.07克朗记入债务）); condition; flag +injured_in_match; relation colleague with person-materialized-world-vienna-1912-40; knowledge “a loose stone sits at the corner of the pitch”; relation acquaintance with person-materialized-world-vienna-1912-35; relation acquaintance with person-materialized-world-vienna-1912-40_

- **1927.01** `r15-ordinary.quiet-year::ctx-klosterneuburg-rural-1912::milieu-tenement/small-loss` tags: ordinary, daily, family, leisure, peace, rural, agriculture, small_town
  这一年没有发生什么大事，只是Anton Weiss常常觉得累。柜子里的一只碗被碰掉了，Anton Weiss把碎片扫起来，没有扔，放在抽屉最里面。
  _effects: mood -0.030000000000000027; flag +ordinary_sad_year_

- **1927.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss被叫到学校，老师说Anna Weiss这学期总在课上看窗外。回家的路上，Anton Weiss没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 20 -> 15; state_parameter raising-child.caregiverBurden 62 -> 67; cash -2 (extra lessons and replacement pencils（其中1克朗记入债务）); mood -0.030000000000000027_

- **1927.01** `state_expire:bc18-ridiculous-fame` tags: bc18-ridiculous-fame, fame, reputation, mistaken_identity, promotion, media, absurd, public
  Anton Weiss的「荒唐的名声」到期；相关安排结束。
  _effects: state_remove bc18-ridiculous-fame state:world-vienna-1912:62; flag -ridiculously_famous_

- **1927.01** `state_expire:under-investigation` tags: under-investigation, legal, police, investigation, risk, state, state_tick, state:under-investigation
  Anton Weiss的「被调查」到期；相关安排结束。
  _effects: state_remove under-investigation state:world-vienna-1912:83_

- **1927.01** `p9-work-jobsearch.ask-trial/ask-trial.deposit-refused` tags: work, job_search, negotiation, wages, employment, task, trial, factory
  栅栏边的工友听着都低下头。Otto Winter小声说这押金上个月还没有。Anton Weiss数了三遍手里的赫勒，差得远，只好说声打扰了，沿着墙根往下一家走。
  _effects: mood -0.050000000000000044; reputation -0.009999999999999995; relation acquaintance with person-materialized-world-vienna-1912-37_

- **1928.01** `office16-office.lose-the-chair::ctx-klosterneuburg-rural-1912::milieu-tenement/reappointed` tags: office, removal, loss, politics, power, transition, rural, agriculture
  计票拖到凌晨，Anton Weiss以两票之差留任。Grete Kral把已经写好的交接清单折起来，笑着说下次再来。Anton Weiss回到办公室，发现桌上的文件被人重新排过；最上面那份，是新一年的预算草案。
  _effects: reputation 0.06000000000000001; mood 0.06; organization_funds; state_add office-patronage state:world-vienna-1912:155; flag +reappointed; knowledge “桌上的文件被人重新排过，最上面是新一年的预算草案。”; flag +office_patronage_network_

- **1928.01** `p9-social-daily-culture.lending-library/p9-social-daily-culture.lending-library.pay-deposit` tags: daily, culture, leisure, cafe, music, walk, task, task:knowledge
  Anton Weiss从内袋里数出两克朗压在柜台上，Hermann Winter翻开借书卡，用铅笔把上次迟还的四天圈出来，还是把小说递了过来。Anton Weiss把书塞进外套里侧，出门就翻到第一页，边走边读，差点撞上推手推车的菜贩；两克朗换来的不只是一本小说，还有一整个下午的安静。
  _effects: cash -2 (租书店借小说的押金); skill; mood 0.03999999999999998; relation acquaintance with person-materialized-world-vienna-1912-47_

- **1928.11** `vienna-adult-social.burial-fund/burial-fund.paid` tags: adulthood, social, work, family
  车间里管互助会的Maria Moser在午休时把本子摊在Anton Weiss的工具箱上，说这个月还差最后一份月钱。Anton Weiss从马甲内袋摸出二十个克罗伊策，Maria Moser当着他的面在本子上画了钩。
  _effects: cash -0.3 (缴纳丧葬互助会的月钱（其中0.3克朗记入债务）); relation colleague with person-materialized-world-vienna-1912-60; reputation 0.04000000000000001; relation acquaintance with person-materialized-world-vienna-1912-60_

- **1929.01** `bc18-office.promotion-by-typo::ctx-vienna-reform-1930::milieu-tenement/accept-the-post` tags: office, promotion, bureaucracy, mistake, status, absurd, politics, reform
  晋升名单上，Maria Kral把“助理文书”误排成了“主任”。文件一路盖到市长办公室，竟没有人退回来；Anton Weiss在星期一搬进了有地毯的办公室，领到每月六克朗的主任薪金。Rosa Lechner在走廊里看了Anton Weiss一眼，没有问Anton Weiss会不会看预算，只问要不要配一名速记员。
  _effects: cash 6 (主任薪金); state_add bc18-ridiculous-fame state:world-vienna-1912:177; role; relation colleague with person-maria-kral; flag +promoted_by_a_typo; mood 0.030000000000000027; flag +ridiculously_famous; reputation 0.01999999999999999; mood 0.020000000000000018_

- **1929.01** `ml18-investment.transylvanian-mine::ctx-vienna-reform-1930::milieu-tenement/sell-the-shares-to-a-baron` tags: investment, mining, fraud, money, risk, business, reform, medical
  矿山还没出金，Anton Weiss就把股份转给了一个想给女儿做嫁妆的男爵，赚了二十五克朗。半年后，假金矿的消息见报，男爵在俱乐部里拦住Anton Weiss，问知不知道岩芯的事。Anton Weiss说不知道，手却一直放在酒杯后面。
  _effects: cash 25 (profit from selling the mining shares early); state_add ml18-sudden-fortune state:world-vienna-1912:178; reputation -0.01999999999999999; flag +sold_mine_shares_early; knowledge “男爵买下股份时，矿山还没有出过一克金。”; mood 0.03999999999999998; relation acquaintance with person-materialized-world-vienna-1912-20; flag +sudden_fortune; reputation 0.01999999999999999; mood 0.030000000000000027_

- **1929.01** `state_tick:office-patronage/patronage-year/someone-talks` tags: office-patronage, office, patronage, politics, power, network, obligation, state
  一个没被续聘的临时文书把名单抄给了外面。Anton Weiss在咖啡馆听见自己的名字和“照顾自己人”连在一起；没有人当面问，但下午的会议多了一把空椅子。
  _effects: state_parameter office-patronage.exposure 15 -> 27; state_parameter office-patronage.loyalty 55 -> 49; reputation -0.03; mood -0.030000000000000027; flag +patronage_rumor_

- **1929.01** `agency:support_process` tags: agency, agency:support_process
  Anton Weiss为维也纳社会民主党在工人街区、工会和报刊网络中持续活动，争取普选、劳动保护与社会救济出了力：整理名单、传递消息或替同伴作证，名字被记进参与记录。
  _effects: historical development:seed-vienna-social-democracy-1912 as supporter; historical_influence; reputation 0.015000000000000013_

- **1929.06** `p9-history-medical-daily.house-call/carry-child-hospital` tags: health, medical, public_health, family, pharmacy, sanitation, daily
  Anton Weiss用毯子裹住Anton Moser 2，搀着往综合医院急诊走，走到半路干脆背起来。长椅上挤满人，等到窗户发白，Anton Moser 2的烧退了些，Anton Weiss的胳膊却抖得端不住水杯；雪灌进后领，鞋底磨得只剩一层布，这一夜把两个人的人情结结实实绑在了一起。
  _effects: mood 0.04999999999999999; relation acquaintance with person-materialized-world-vienna-1912-21; relation acquaintance with person-materialized-world-vienna-1912-67_

- **1929.07** `major-crisis.rent-increase/tenant-meeting` tags: crisis, housing, rent, eviction, family, poverty
  巷口洗衣房的老板娘把几张椅子摆开，叫来半条街的租户。Anton Weiss把涨租单摊在桌上，逐条念出上面的数字；Anna Bauer站在门边，既没走，也没替房东说话。大家决定先集体迟交一个月，签名纸传到Anton Weiss手里时，纸上已经有一块油渍。
  _effects: cash -2 (paper, ink and tram fare for the tenants meeting); reputation 0.03_

- **1930.01** `office16-rival.removal-motion::ctx-vienna-reform-1930::milieu-tenement/motion-carries` tags: office, rivalry, politics, removal, power, intrigue, reform, medical
  投票结果是十九比十七。Anton Weiss把印章、钥匙和一本写满批注的账本放进纸箱，最后一圈走廊走得比平时慢。Maria Kral在门口等着接手，手里已经拿着新的编制表；表上第一个被划掉的名字是Anton Weiss的秘书。
  _effects: position_end 放映员 @cinema:person-materialized-world-vienna-1912-4-evt:world-vienna-1912:000960; reputation -0.04999999999999999; mood -0.08000000000000002; condition; relation rival with person-maria-kral; flag +removed_by_vote; knowledge “新编制表第一个划掉的是我的秘书。”_

- **1930.01** `vienna-church-community.tenement-prayer/rent-prayer-argument` tags: faith, social, family, home
  Anna Bauer怪Anton Weiss把人都招到楼梯上，木头泡了潮气才裂的。Anton Weiss没还嘴，蹲下去看那道裂缝，指甲刮下一层朽木屑。
  _effects: reputation -0.03; mood -0.06_

- **1930.01** `vienna-tenement-neighbors.shared_stove_fire/fire_no_damage` tags: home, social, family, housing
  Anton Weiss刚把锅端下灶，火苗就蹿了起来，Katharina Huber一脚踩灭地上的油布，顺手抄起沙箱里的沙子盖住灶口。两人都没受伤，但Katharina Huber的鞋底烧穿一个洞，那是唯一一双出门的鞋。
  _effects: relation friend with person-materialized-world-vienna-1912-48; mood -0.04999999999999999_

- **1930.01** `state_tick:office-patronage/patronage-year/someone-talks` tags: office-patronage, office, patronage, politics, power, network, obligation, state
  一个没被续聘的临时文书把名单抄给了外面。Anton Weiss在咖啡馆听见自己的名字和“照顾自己人”连在一起；没有人当面问，但下午的会议多了一把空椅子。
  _effects: state_parameter office-patronage.exposure 27 -> 39; state_parameter office-patronage.loyalty 49 -> 43; reputation -0.03; mood -0.030000000000000027_

- **1930.01** `state_tick:bc18-ridiculous-fame/ridiculous-fame-year/the-story-holds-another-year` tags: bc18-ridiculous-fame, fame, reputation, mistaken_identity, promotion, media, absurd, public
  又一年过去，Anton Weiss仍在被介绍成那个人物。邀请函从市郊的园艺会、女子学校和退伍军人酒馆寄来；Anton Weiss学会在签名后加一句模糊的谦辞，听起来像有许多往事不便细说。每一次应付都带来一点小钱，也让真正的解释更不合时宜。
  _effects: state_parameter bc18-ridiculous-fame.notoriety 30 -> 37; state_parameter bc18-ridiculous-fame.invitations 1 -> 2; cash 1 (一场小型演讲的车马费); reputation 0.010000000000000009; mood 0.020000000000000018_

- **1930.01** `r13-fam.repay-family-debt::ctx-vienna-reform-1930::milieu-tenement/debt-cleared` tags: task, commerce, debt, family, repayment, honour, reform, medical
  Anton Weiss把攒了半年的票子一张张抹平，当着Franz Weiss的面数清。Franz Weiss数到一半，把最后几张推回来，说利息就算了。Anton Weiss没有收，把钱重新推过去，说当初借的时候说好多少就是多少；Franz Weiss这才收下，把借条撕成两半。
  _effects: cash -12 (一克朗一克朗地数); flag +repaid_family_debt; role; knowledge “the old debt is finally cleared”_

- **1930.03** `p9-social-tenement-neighbors.stairwell-rumor/stairwell-rumor.ask-straight` tags: housing, neighbors, tenement, daily, money, reputation
  Anton Weiss在楼梯间拦住Josef Moser，问那句话是从哪儿听来的，又趁送活的人上门时当面看清是谁。原来是对面作坊的裁缝来取改好的裤子。Josef Moser听完把话咽回去，第二天洗衣房里没人再提。
  _effects: reputation 0.04000000000000001; relation acquaintance with person-materialized-world-vienna-1912-44_

- **1931.01** `vienna-tenement-neighbors.laundry_line_dispute/subject_yields_line` tags: home, social, family, housing
  Anton Weiss看Katharina Huber盆里那几件小衬衫，把自家床单卷起来抱回屋，说等下午再晾。Katharina Huber愣了一下，闷头把衣服挂好，收工回来时在Anton Weiss门口放了一小包用旧报纸裹的洗衣碱。Anton Weiss打开报纸，碱面里还掺着几粒粗盐。
  _effects: relation friend with person-materialized-world-vienna-1912-48; food_
  _causes: evt:world-vienna-1912:003890_

- **1931.01** `sm18-object.tram-lost::ctx-vienna-reform-1930::milieu-tenement/says-it-was-only-metal` tags: object, loss, child, tram, family, everyday, reform, medical
  Anton Weiss摸了摸空口袋，说那不过是块旧铜，丢了就丢了。晚上，Rosa Berg睡着以后，Anton Weiss又去电车站走了一趟，沿着白天的路线低头看每一块石板。
  _effects: state_add sm18-missing-object state:world-vienna-1912:242; mood -0.020000000000000018; relation kin with person:evt:world-vienna-1912:001718:child; flag +searched_the_tram_route_at_night; flag +something_is_missing_

- **1931.01** `state_expire:office-patronage` tags: office-patronage, office, patronage, politics, power, network, obligation, state
  Anton Weiss的「办公室的人情账」到期；相关安排结束。
  _effects: state_remove office-patronage state:world-vienna-1912:155; flag -office_patronage_network_

- **1931.01** `state_expire:bc18-ridiculous-fame` tags: bc18-ridiculous-fame, fame, reputation, mistaken_identity, promotion, media, absurd, public
  Anton Weiss的「荒唐的名声」到期；相关安排结束。
  _effects: state_remove bc18-ridiculous-fame state:world-vienna-1912:177; flag -ridiculously_famous_

- **1931.01** `r13-fam.help-neighbour::ctx-vienna-reform-1930::milieu-tenement/help-refused` tags: task, social, neighbor, help, care, reform, medical, schooling
  Rosa Bauer把煤筐往身后挪，说不用，自己搬得动。Anton Weiss站在楼梯转角，听见对方上一层歇一层，筐底在墙上刮出长长的白印。晚饭时，Anton Weiss把自家的汤盛了一碗，放在Rosa Bauer门口，没有敲门。
  _effects: mood -0.03999999999999998; flag +left_soup_at_neighbour_door_

- **1931.08** `vienna-housing-move.moving-day/moving-day-handcart` tags: housing, home, rent, family, money, injury
  手推车每走十几步就要停一下，楼道里的门半开着，有人探头看热闹。Anton Weiss把照片铁盒交给Katharina Huber抱着，自己低头把最后一箱锅具拖上楼。天擦黑时，新屋里才勉强归置出下脚的地方。
  _effects: cash -1 (借手推车买烟熨谢邻居的小开销); health -0.04999999999999999 (三趟推车扛家具累得肩臂酸痛)_

- **1932.01** `ml18-tax.audit-of-the-windfall::ctx-vienna-reform-1930::milieu-tenement/hide-the-ledger` tags: tax, legal, money, windfall, bureaucracy, comic, reform, medical
  Anton Weiss 3把账本塞进钢琴后面的夹层，说等风声过去再拿出来。Rosa Lechner第二次来时带了一个记录员和一张搜查令；钢琴被挪开时，琴键响了一串不成调的音。Anton Weiss看见黑皮本翻开的那一页上，已经用红笔圈出了三笔利息。
  _effects: cash -10 (the accountant's fee for hiding the ledger); state_add under-investigation state:world-vienna-1912:273; relation colleague with person-materialized-world-vienna-1912-58; flag +tax_ledger_hidden; knowledge “黑皮本上被红笔圈出的三笔利息都没有报税。”; mood -0.04999999999999999; relation acquaintance with person-materialized-world-vienna-1912-58_

- **1932.01** `ad20-family-dinner::ctx-vienna-reform-1930::milieu-tenement/the-fourth-bowl` tags: family, dinner, everyday, obligation, public, grief, reform, medical
  Anton Moser 2来得比约定早，手里提着一小袋栗子。Anton Weiss多摆了一副碗筷，又把汤里的肉往那只碗里拨了两块。饭吃到一半，Anton Moser 2忽然说“你们家吃饭真安静”，Anton Weiss才发现自己一直在听楼上的脚步。
  _effects: food; mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-21; flag +family_dinner_guest_

- **1932.01** `state_tick:sm18-missing-object/another-drawer/a-receipt-in-the-lining` tags: sm18-missing-object, mystery, object, loss, memory, search, suspicion, everyday
  半年过去，Anton Weiss又翻了一遍那只装旧纽扣的铁盒，在盒盖夹层里摸到一小片发黄的收据。上面的日期和那件东西最后一次出现的那天对得上，但字迹已经淡得只剩半个印章。
  _effects: state_parameter sm18-missing-object.leads 10 -> 16; state_parameter sm18-missing-object.suspicion 0 -> 0; mood 0.010000000000000009_

- **1932.01** `r13-civ.recover-at-home::ctx-vienna-reform-1930::milieu-tenement/back-to-work-too-soon` tags: health, recovery, care, household, food, reform, medical, schooling
  Anton Weiss退烧第二天就回工厂，站到下午，眼前一阵阵发黑。回家后半夜又烧起来，他把湿毛巾搭在额头上，听见自己的心跳撞着枕头。第二天早上，Anton Weiss又去了，因为请假的扣款比药贵。
  _effects: cash 2 (退烧后的第一碗粥); health -0.1 (退烧后的第一碗粥); condition; flag +returned_to_work_too_soon_

- **1932.05** `vienna-medical-treatment.night-fever/sweat-it-out` tags: health, medical, family, money, injury
  醋水的酸味混着汗气，屋子小得转不开身。Helene Weiss把布拧到不滴水，敷上去时Anton Weiss打了个激灵。窗外送奶车吱呀碾过石板，她才想起自己家的炉子还灭着。
  _effects: health -0.03999999999999998 (高烧硬熬伤身); condition; relation friend with person-materialized-world-vienna-1912-5_

- **1932.10** `vienna-housing-move.sublet-room/sublet-daylight-only` tags: housing, home, rent, family, money
  Anton Weiss和Katharina Lechner谈妥只出租白天，夜里不留宿，收两克朗。床仍归Anton Weiss家，钥匙只在白天给。Katharina Lechner说不碍事，他住的工棚不许带人，白天有个落脚的地方就够。Helene Moser听了点头，说这样少些闲话；到了傍晚，Anton Weiss把床铺重新收好，屋里照旧几口人。
  _effects: cash 2 (白天出租床位的钱); mood 0.020000000000000018_

- **1933.01** `state_tick:sm18-missing-object/another-drawer/a-receipt-in-the-lining` tags: sm18-missing-object, mystery, object, loss, memory, search, suspicion, everyday
  半年过去，Anton Weiss又翻了一遍那只装旧纽扣的铁盒，在盒盖夹层里摸到一小片发黄的收据。上面的日期和那件东西最后一次出现的那天对得上，但字迹已经淡得只剩半个印章。
  _effects: state_parameter sm18-missing-object.leads 16 -> 22; state_parameter sm18-missing-object.suspicion 0 -> 0; mood 0.010000000000000009_

- **1933.01** `state_expire:under-investigation` tags: under-investigation, legal, police, investigation, risk, state, state_tick, state:under-investigation
  Anton Weiss的「被调查」到期；相关安排结束。
  _effects: state_remove under-investigation state:world-vienna-1912:273_

- **1933.01** `r14-work.claim-unemployment::ctx-vienna-reform-1930::milieu-tenement/benefit-denied` tags: work, unemployment_benefit, institution, poverty, bureaucracy, reform, medical, schooling
  Maria Kral说Anton Weiss的工龄不够，或者离开的方式算“自愿”，两条都不符合。Anton Weiss问哪一条，Maria Kral把表格转过来，用手指点了点空白处。走廊里有人抱着孩子排队，孩子在哭。Anton Weiss把号码牌放在窗台上，走了出去。
  _effects: cash -1 (失业救济的号码牌); mood -0.12; condition; flag +benefit_denied; knowledge “a voluntary departure disqualifies the claim”_

- **1933.06** `p9-gap-adult-unemployed.dock-morning/dock-watched-tools` tags: adulthood, unemployment, casual_labour, poverty, daily, dock
  工头第二次出来时眼皮都没抬。Anna Bauer把工具往Anton Weiss脚边一放，说去去就回，回来时用围裙兜着面包，汤罐用旧布裹着，两人在墙根分着吃完。
  _effects: food_

- **1934.01** `state_tick:sm18-missing-object/another-drawer/the-same-question` tags: sm18-missing-object, mystery, object, loss, memory, search, suspicion, everyday
  Anton Weiss把同一只抽屉拉开又推上，里面的东西已经按原来的位置摆了三遍。楼下有人搬煤，铁锹刮过石阶；Anton Weiss忽然想不起那件东西最后一次被谁拿在手里，只觉得每个人的脸都有一点可疑。
  _effects: state_parameter sm18-missing-object.suspicion 0 -> 8; state_parameter sm18-missing-object.leads 22 -> 20; mood -0.030000000000000027_

- **1934.01** `p9-history-public-action.organize-relief/credit-own-name` tags: politics, union, party, activism, public_action, relief, leaflet, task
  市场掌柜把账本翻到空白页，铅笔写上“月底清”，Anton Weiss 把拇指按进印泥，红印盖得有点歪。Anna Moser 2 扛着半袋面粉往回走，袋底漏出的粉在石板路上留下白印。
  _effects: cash -5 (以自家名义赊购面粉); food; mood -0.050000000000000044; relation acquaintance with person-materialized-world-vienna-1912-49_

- **1934.01** `initiative:found_process:org-wednesday-psychological-society`
  Wiener Psychoanalytische Vereinigung在Berggasse 19, Wohnung und Ordination经过数年的招募、会议和互助，把分散的行动整理成公开纲领；这不是预先写好的历史，而是成员自己累积出来的运动。
  _effects: historical process Wiener Psychoanalytische Vereinigung的持续运动; historical development:initiative-org-wednesday-psychological-society-1934 as organizer; historical development:initiative-org-wednesday-psychological-society-1934 as organizer; historical development:initiative-org-wednesday-psychological-society-1934 as organizer; historical development:initiative-org-wednesday-psychological-society-1934 as organizer; historical development:initiative-org-wednesday-psychological-society-1934 as organizer; knowledge “Wiener Psychoanalytische Vereinigung的持续运动不是一次会议，而是我们这些年积累出来的”; reputation 0.04000000000000001_

- **1934.01** `historical_phase`
  历史进程《Wiener Psychoanalytische Vereinigung在Berggasse 19, Wohnung und Ordination经过数年的招募》从 emerging 进入 mobilizing。
  _effects: knowledge “我亲历或知晓「Wiener Psychoanalytische Vereinigung在Berggasse 19, Wo”; knowledge “我亲历或知晓「Wiener Psychoanalytische Vereinigung在Berggasse 19, Wo”; knowledge “我亲历或知晓「Wiener Psychoanalytische Vereinigung在Berggasse 19, Wo”; knowledge “我亲历或知晓「Wiener Psychoanalytische Vereinigung在Berggasse 19, Wo”; knowledge “我亲历或知晓「Wiener Psychoanalytische Vereinigung在Berggasse 19, Wo”_
  _causes: evt:world-vienna-1912:005908_

- **1934.03** `vienna-parish-aid.soup-kitchen/soup-kitchen.take-and-carry` tags: faith, parish, mutual_aid, poverty, family
  汤是豆子熬的，表面浮着几粒油星，气味把整条巷子都占了。Hedwig排在前面，回头替Anton Weiss看着位置，嘴里数着还剩几个人。铁罐递过去时烫手，Anton Weiss用围裙角垫着。
  _effects: food; mood 0.030000000000000027_

- **1934.05** `r3-war.refugee-train::ctx-vienna-authoritarian-1934::milieu-tenement/loaded-overcrowded-train` tags: war, refugee, train, station, migration, vienna, urban, crisis
  Anton Weiss把Anna Moser 2一家塞进第十节车厢，行李从窗口递进去时，Friedrich Hofer吹哨说超载。Rosa Lechner已经松开刹车，Anton Weiss把最后一个孩子从窗口举上去，自己抓着门把手跑了几步才松手。火车开走时，月台上落下一只小鞋。
  _effects: mood -0.06000000000000005; flag +loaded_refugees_onto_overcrowded_train; role; relation friend with person-materialized-world-vienna-1912-49; relation rival with person-rosa-lechner; relation acquaintance with person-materialized-world-vienna-1912-49_

- **1934.09** `vienna-tenement-neighbors.lost_room_key/key_lost_landlady` tags: home, social, family, housing
  Anton Weiss把钥匙丢在了回家路上的有轨电车轨道旁，天黑也没找着。房东太太说换锁芯要一克朗五十赫勒，从下月房租里扣。Friedrich Hofer借给Anton Weiss一把旧挂锁，但锁鼻和门扣对不上，只能用铁丝拧着凑合。那夜Anton Weiss睡不踏实，总觉得有人在拧门。
  _effects: cash -1.5 (换锁芯费用); relation acquaintance with person-friedrich-hofer; mood -0.06000000000000005_

- **1934.12** `r13-rel.proposal::ctx-vienna-authoritarian-1934::milieu-tenement::proposal-war/sewed-a-button-instead` tags: relationship, courtship, proposal, marriage, interaction, vienna, urban, crisis
  Anton Weiss没有求婚，只把一枚纽扣缝进Elisabeth Hofer的衣襟，说要是回不来，就把这个交给Anton Weiss母亲。Elisabeth Hofer把纽扣扯下来，重新缝回Anton Weiss的军装上，说你自己交。
  _effects: role; relation partner with person-materialized-world-vienna-1912-86; relation partner with person-materialized-world-vienna-1912-86; relation acquaintance with person-materialized-world-vienna-1912-86_

- **1935.01** `state_expire:sm18-missing-object` tags: sm18-missing-object, mystery, object, loss, memory, search, suspicion, everyday
  Anton Weiss的「一件说不清下落的东西」到期；相关安排结束。
  _effects: state_remove sm18-missing-object state:world-vienna-1912:242; flag -something_is_missing_

- **1935.01** `r13-fam.collect-funeral-money::ctx-vienna-authoritarian-1934::milieu-tenement/enough-collected` tags: task, social, funeral, neighbor, charity, grief, vienna, urban
  Anton Weiss端着Luise Kral的旧帽子，从一楼走到四楼，一家一家敲门。有人给两枚铜板，有人给一件旧衬衣，还有人家把门开了一条缝又关上。到傍晚，帽子里的钱够买一口薄棺；Rosa Bauer接过帽子时，先数了数，又把钱倒出来重数了一遍。
  _effects: cash -2 (端着一顶帽子走楼道（其中2克朗记入债务）); flag +collected_funeral_money; role; relation friend with person-materialized-world-vienna-1912-43; knowledge “the building raised enough for a plain coffin”_

- **1935.02** `vienna-market-household.friday-fish/friday-fish.share` tags: home, market, food, social
  Anton Weiss拎着鱼上楼，看见Friedrich Hofer蹲在门口用刀刮锅底。Anton Weiss把鱼放在两家之间的窗台上，切了一半推过去。第二天门口多了一小袋面粉。
  _effects: cash -6 (买鱼); food; relation acquaintance with person-friedrich-hofer_

- **1935.03** `vienna-housing-move.moving-day/moving-day-handcart` tags: housing, home, rent, family, money, injury
  手推车每走十几步就要停一下，楼道里的门半开着，有人探头看热闹。Anton Weiss把照片铁盒交给Hermann Bauer 2抱着，自己低头把最后一箱锅具拖上楼。天擦黑时，新屋里才勉强归置出下脚的地方。
  _effects: cash -1 (借手推车买烟熨谢邻居的小开销); health -0.04999999999999999 (三趟推车扛家具累得肩臂酸痛); relation acquaintance with person-materialized-world-vienna-1912-53; relation acquaintance with person-materialized-world-vienna-1912-53_

- **1935.10** `vienna-parish-aid.sick-call/sick-call.with-priest` tags: faith, parish, mutual_aid, poverty, family
  Anton Weiss觉得一个人去不合适，绕到教堂请了修女一同上楼。修女看过病人，留下药包和一小瓶圣水，说会从教区账上出钱请医生来看一趟。Hermann Winter在楼下等着，说这样妥当，病人家里没男人，多个见证人心里安稳。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-47; mood 0.040000000000000036_

- **1936.01** `vienna-social-movement.aftermath/keep-the-list` tags: development, social_movement, organization, consequence
  Anton Weiss把Sozialdemokratische Arbeiterpartei Österreichs (SDAP)的名单藏进缝纫机抽屉的夹层。名单上有二十几个名字，其中两个已经搬走，一个被工厂开除。Anton Weiss没有把最后一行划掉。
  _effects: flag +movement_list_holder; reputation 0.03_

- **1936.01** `p9-work-jobsearch.ask-trial/ask-trial.deposit-refused` tags: work, job_search, negotiation, wages, employment, task, trial, factory
  栅栏边的工友听着都低下头。Alois Hofer小声说这押金上个月还没有。Anton Weiss数了三遍手里的赫勒，差得远，只好说声打扰了，沿着墙根往下一家走。
  _effects: mood -0.050000000000000044; reputation -0.010000000000000009_

- **1936.05** `vienna-social-movement.recruitment/read-and-decline` tags: development, social_movement, organization, politics
  Anton Weiss把传单读了两遍，记下上面的地址，却没有去。第二天照常上工；午休时听见两个工友低声谈论同一场集会。
  _effects: mood -0.010000000000000009_

- **1936.08** `p9-gap-adult-solitude.river-walk/river-walk.far` tags: adulthood, daily, solitude, ordinary, home, walk, river, injury
  Anton Weiss顺着河岸一直走，走过铁路桥又走回来，天已经黑透。回来时脚底发热，袜子磨在脚背上，她一路数着路灯走完最后一段巷子，进门先坐下脱了鞋。
  _effects: health -0.020000000000000018 (走了很远的碎石路，脚底发疼); mood 0.050000000000000044_

- **1936.11** `p9-gap-adult-ordinary-day.lost-dog/lost-dog.return-address` tags: adulthood, daily, leisure, neighborhood, ordinary, animal, neighbor
  铜牌上的门牌号在六区一条窄街上，楼梯间的墙皮起了鼓包，二楼有人在拉手风琴。Anton Weiss牵着狗沿街走，狗时走时停，鼻子贴着一排门槛嗅过去。门房老头接过绳子时说了句这狗他认得，是四楼裁缝家的。
  _effects: relation acquaintance with person-katharina-bauer; mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-78_

- **1937.01** `p9-history-public-action.organize-relief/backyard-stove` tags: politics, union, party, activism, public_action, relief, leaflet, task
  Maria Stein 的话很简短：名单不能批。Anton Weiss 把表格折好，转头去搬砖搭灶。Franz Weiss 2 从家里抱来一捆柴，火星溅在围裙上，拍两下就灭了。
  _effects: cash -3 (买柴火和盐); food; mood -0.030000000000000027_

- **1937.11** `p9-gap-adult-ordinary-day.wedding-procession/wedding-procession.move-table` tags: adulthood, daily, leisure, neighborhood, ordinary, wedding, neighbor, celebration
  桌子是巷口酒馆借来的，桌腿有一只短了半寸，抬的时候总往一边歪。Anton Weiss扶着桌角，指甲缝里嵌进木刺。Maria Stein用围裙擦手，说改天请她喝咖啡，转身又去搬凳子。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-12_

- **1938.01** `r13-fam.foster-child::ctx-vienna-authoritarian-1934::milieu-tenement/child-taken-in` tags: task, care, foster, child, household, orphan, vienna, urban
  Franz Weiss把Katharina 2领到门口，说孩子的母亲去了外地做工，几个月没寄钱回来。Anton Weiss看见孩子脚上那双鞋小了一指，脚趾顶得发白，便让他们进屋。当晚，Anton Weiss把自家孩子的旧鞋找出来，又往锅里多加了一勺面糊；Katharina 2坐在灶边，一直没有开口。
  _effects: cash -3 (门口多出来的一双小鞋); flag +fostered_a_child; role; relation guardian with person:evt:world-vienna-1912:003445:child; knowledge “the child’s mother left with an evacuation train”; household_

- **1938.07** `p9-gap-adult-ordinary-day.organ-grinder/organ-grinder.listen-coins` tags: adulthood, daily, leisure, neighborhood, ordinary, music, street
  她本来只是去面包店买盐，被琴声绊住了脚。猴子蹲在帽沿上啃一颗栗子，风琴师脱下礼帽扇风，露出汗湿的额角。曲子完了，她数出两枚铜板放进帽子，听见身后有人吹口哨。
  _effects: cash -0.02 (给手摇风琴师的赏钱); mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-89_

- **1938.09** `r1-civ.petition-five-hundred::ctx-vienna-authoritarian-1934::milieu-tenement/collected-five-hundred` tags: politics, petition, housing, bureaucracy, neighbor, vienna, urban, crisis
  Anton Weiss没有回家，连夜走了三条街，把睡下的邻居一个个叫起来。有人穿着睡衣签，有人让孩子代签，还有人问签了会不会丢工。天亮时，纸上的名字凑到五百零四，最后一行是一个不识字的老太太按的手印。
  _effects: cash -1 (第五百个签名); health -0.040000000000000036 (第五百个签名); reputation 0.07999999999999999; flag +collected_five_hundred_signatures; role; skill; relation friend with person-otto-winter; relation friend with person-materialized-world-vienna-1912-77; relation acquaintance with person-materialized-world-vienna-1912-77_

- **1938.11** `ad20-landlord-visit::ctx-vienna-authoritarian-1934::milieu-tenement/repairs-promised` tags: housing, rent, landlord, everyday, repair, public, vienna, urban
  Luise Kral带着木尺来了，先敲窗框，又敲暖气片。Anton Weiss把去年冬天裂开的缝指给他看；Luise Kral说可以修，但材料钱要从下个月房租里扣。Anton Weiss算了算，还是点了头。窗外的雨顺着玻璃往下走，屋里第一次没有风。
  _effects: cash -1 (materials for the window repair); flag +repair_promised; mood 0.020000000000000018_

- **1939.01** `hist15-occ.requisition-notice::ctx-vienna-authoritarian-1934::milieu-tenement/name-the-neighbor` tags: occupation, requisition, shortage, institution, history, family, vienna, urban
  Anton Weiss告诉Alois Hofer，Berta Bauer 2家的地窖里还有两桶猪油。征用队下午就去了那户人家。Anton Weiss拿到一小袋盐和一张优先配给卡，回家时没有走平时那条街。
  _effects: cash 1 (检举邻居得到的配给奖励); reputation 0.020000000000000018; flag +denounced_neighbor_for_grain_

- **1939.01** `kernel-migrate.emigration-papers::ctx-vienna-authoritarian-1934::milieu-tenement/civic-emigration-refused` tags: migration, papers, bureaucracy, port, emigration, vienna, urban, crisis
  他的申请被退回，理由是“担保人收入不足”。Alois Hofer说可以找第二担保人；他翻遍通讯录，发现能签字的人不是已经走了，就是不肯再担保。回家后，他把通讯录上能签字的名字一个个划掉。
  _effects: flag +emigration_papers_refused; cash -2 (照片、表格和往返车钱); relation acquaintance with person-materialized-world-vienna-1912-15; reputation -0.010000000000000009; health -0.020000000000000018 (奔走找担保人后的疲惫); knowledge “护照申请需要担保人收入证明，找不到第二担保人就办不下去”; relation acquaintance with person-materialized-world-vienna-1912-96_

- **1939.02** `vienna-parish-aid.rent-box/rent-box.accept-all` tags: faith, parish, mutual_aid, poverty, family
  煤袋落在台阶上，扬起细细一层黑末。Franz Weiss 2用铅笔头在蓝格册上写门牌号，问房东姓什么，又叮嘱别把面包票弄丢。灶上水壶开始叫，Anton Weiss才想起屋里连只干净的杯子都没有。
  _effects: cash 6 (互助会补上本月房租差额); food; relation acquaintance with person-materialized-world-vienna-1912-31; flag +parish_registered_

- **1939.07** `bc18-ghost.death-certificate::ctx-vienna-authoritarian-1934::milieu-tenement/accepts-the-file` tags: bureaucracy, legal, death, identity, mistake, paperwork, absurd, vienna
  户籍官Rosa Lechner为了结掉一桩陈年失踪案，在档案上给Anton Weiss盖了“推定死亡”。三天后，Anton Weiss收到一张慰问卡和一本作废的配给簿；同一天，追了半年的债主忽然不再上门。旧货商听说后，花两克朗买走一份抄本，说要给一个躲债的朋友看看格式。
  _effects: cash 2 (卖给旧货商的死亡证明抄本); state_add bc18-bureaucratic-ghost state:world-vienna-1912:485; reputation -0.010000000000000009; flag +declared_dead_while_alive; mood 0.010000000000000009; flag +bureaucratic_ghost; mood -0.010000000000000009_

- **1939.10** `vienna-tenement-neighbors.sick_child_doorstep/refuses_grudge` tags: home, social, family, housing
  Katharina Lechner敲门想借半块煤给发烧的孩子烧热水，Anton Weiss那天刚和Katharina Lechner为走廊堆东西吵过嘴，没开门，隔着门板说自家也不够用。后半夜听见Katharina Lechner抱着孩子下楼去敲药房的门。第二天在走廊碰见，Katharina Lechner低头绕过去，手里的铜壶碰在栏杆上，响了一声。
  _effects: relation rival with person:evt:world-vienna-1912:000086:child; mood -0.050000000000000044_

- **1940.01** `bc18-ghost.pension-window::ctx-vienna-authoritarian-1934::milieu-tenement/posthumous-medal` tags: bureaucracy, pension, identity, legal, paperwork, absurd, poverty, vienna
  养老金办公室寄来一枚“忠诚遗属”铜章和三克朗，说这是对死者家属的最后抚恤。Anton Weiss不能亲自去领，只好让Katharina Bauer代收；邻居把铜章别在自家外套上，回来时只字不提三克朗。Anton Weiss没有追问，因为那枚铜章若挂在自己胸前，实在不知道该怎么解释。
  _effects: cash -1 (代领材料的车钱); state_parameter bc18-bureaucratic-ghost.risk 20 -> 28; state_parameter bc18-bureaucratic-ghost.duplicates 1 -> 2; reputation 0.010000000000000009; relation acquaintance with person-katharina-bauer; condition; flag +neighbor_kept_the_medal; mood -0.020000000000000018_

- **1940.01** `state_tick:bc18-bureaucratic-ghost/paper-trail-year/kept-the-files-apart` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  这一年，Anton Weiss学会了同时带三张纸出门：一张证明活着，一张证明死了，一张证明自己从没搬过家。窗口后面的人各自只看自己那一张，偶尔还会夸Anton Weiss的材料齐全。年底，Anton Weiss从补发的配给里省下一小袋面粉，觉得自己像个熟练的走私犯。
  _effects: state_parameter bc18-bureaucratic-ghost.fileDepth 25 -> 29; state_parameter bc18-bureaucratic-ghost.risk 40 -> 35; cash 1 (省下的配给和车钱); mood 0.010000000000000009_

- **1940.01** `kernel-family.housing-relative::ctx-vienna-authoritarian-1934::milieu-tenement/housing-relative.taken-in` tags: task, task:family, family, housing, relatives, godparent, guardian, household
  教父Hermann Berg的房东把阁楼收回，Anton Weiss把自家床边的空地量了量，还是让教父把箱子搬进来。Anton Weiss在床和墙之间搭了一块木板，夜里翻身会碰到箱子；房东来收租时看见多了一个人，说下个月要加两克朗。
  _effects: household; relation kin with person:evt:world-vienna-1912:001486:child; role; cash -5 (extra rent, coal and food for the relative); food; role; flag +overcrowded_flat; knowledge “房东说添一个人住，下个月要加两克朗房租。”_

- **1940.03** `ad20-public-speech::ctx-vienna-authoritarian-1934::milieu-tenement/hall-empty` tags: speech, public, reputation, everyday, fame, scandal, vienna, urban
  Anton Weiss讲到一半，前排的人开始看表，后排的人陆续往门口走。Alois Hofer站在门边，想拦又不好拦。最后只剩下三排椅子，Anton Weiss把稿子念完，声音在空屋子里显得太大。
  _effects: reputation -0.030000000000000027; mood -0.050000000000000044; flag +speech_hall_empty; cash -1 (the hall rental was not refunded)_

- **1940.11** `oj18-cinema.reel::ctx-vienna-authoritarian-1934::milieu-tenement/cut-the-reel` tags: cinema, film, projection, night, censorship, work, odd_job, vienna
  放映到第十一本，胶片在片门里卷成一团。Anton Weiss剪掉烧焦的一截，发现后面接的是一卷没送审的新闻片：军靴踏过广场，镜头扫过一张张被按下去的脸。Alois Kral在黑暗里说“接回正片”，Anton Weiss照做了。
  _effects: organization_found 小巷电影院 (household_firm); position 放映员 @cinema:person-materialized-world-vienna-1912-4-evt:world-vienna-1912:008572; state_add oj18-odd-apprenticeship state:world-vienna-1912:533; cash 1 (projectionist wages); skill; knowledge “第十一本胶片里夹着没送审的新闻片，{projectionist}让我接回正片。”; relation acquaintance with person-materialized-world-vienna-1912-103; role; flag +odd_job_apprentice_

- **1940.11** `state_reaction:bc18-bureaucratic-ghost/another-file-opened` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  Anton Weiss刚在一个窗口证明自己活着，另一个窗口又从抽屉里抽出一张死亡通知。两个办事员隔着走廊互相看了一眼，谁也没有先开口；Anton Weiss站在中间，忽然明白自己不是一个人，而是一份正在被转抄的卷宗。
  _effects: state_parameter bc18-bureaucratic-ghost.risk 28 -> 40; state_parameter bc18-bureaucratic-ghost.duplicates 2 -> 3; state_parameter bc18-bureaucratic-ghost.sightings 1 -> 2; flag +another_file_opened; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:008572_

- **1940.12** `vienna-housing-move.rent-notice/rent-notice-pay` tags: housing, home, rent, family, money
  Anton Weiss把通知念给Josef Huber 2听，Josef Huber 2摇头说是楼梯间那几块新玻璃的账。Anton Weiss去楼下杂货铺换开一张五克朗的纸币，回屋一枚一枚摆开数，煤箱底多留了二十赫勒。
  _effects: cash -2 (按月多付两克朗房租); food; mood -0.030000000000000027_

- **1941.01** `fw19-split.borrowed-goat::ctx-vienna-authoritarian-1934::milieu-tenement/goat-gives-milk` tags: goat, courtyard, ration, sharing, comic, warm, vienna, urban
  隔壁的Maria Lechner把山羊牵来，说只借三天。Josef 2蹲在门口挤奶，挤了半桶；Anton Weiss把第一碗送给Maria Lechner，第二碗留给Josef 2，自己舔了舔碗边。
  _effects: food; cash 1 (cash +1); state_parameter raising-child.childConfidence 55 -> 58; flag +borrowed_goat_milked; mood 0.050000000000000044_

- **1941.01** `state_tick:bc18-bureaucratic-ghost/paper-trail-year/kept-the-files-apart` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  这一年，Anton Weiss学会了同时带三张纸出门：一张证明活着，一张证明死了，一张证明自己从没搬过家。窗口后面的人各自只看自己那一张，偶尔还会夸Anton Weiss的材料齐全。年底，Anton Weiss从补发的配给里省下一小袋面粉，觉得自己像个熟练的走私犯。
  _effects: state_parameter bc18-bureaucratic-ghost.fileDepth 29 -> 33; state_parameter bc18-bureaucratic-ghost.risk 35 -> 30; cash 1 (省下的配给和车钱); mood 0.010000000000000009_

- **1941.01** `state_tick:oj18-odd-apprenticeship/strange-year/blamed-for-the-noise` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  楼上住户投诉夜里有人拖椅子，管事的把巡查簿翻到Anton Weiss的那一页，说签字太潦草，看不出巡过几趟。Anton Weiss想辩解，却想起那晚确实在楼梯间多站了一刻钟；扣掉的工钱刚好够买一双不漏水的鞋。
  _effects: state_parameter oj18-odd-apprenticeship.trust 30 -> 14; state_parameter oj18-odd-apprenticeship.reliability 50 -> 40; mood -0.050000000000000044; flag +odd_job_scare_

- **1941.01** `agency:support_process` tags: agency, agency:support_process
  Anton Weiss为Wiener Psychoanalytische Vereinigung在Berggass出了力：整理名单、传递消息或替同伴作证，名字被记进参与记录。
  _effects: historical development:initiative-org-wednesday-psychological-society-1934 as supporter; historical_influence; reputation 0.015000000000000013_

- **1941.02** `office16-scandal.public-hearing::ctx-vienna-authoritarian-1934::milieu-tenement/the-wrong-signature` tags: office, scandal, media, reputation, politics, power, vienna, urban
  报纸放大的签名其实是Alois Hofer的：两个字母写得太像。更正启事登在第七版，只有三行；Anton Weiss的名字被拿掉了，Alois Hofer的名字留了下来。第二天，Alois Hofer没有来上班，桌上的茶杯还是满的。
  _effects: reputation 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-15; flag +scandal_misdirected; knowledge “被登出来的签名是书记员的，更正启事在第七版。”; mood -0.020000000000000018_

- **1941.03** `bc18-enemy.accidental-help::ctx-vienna-authoritarian-1934::milieu-tenement/warehouse-sinecure` tags: enemy, mistake, work, reputation, absurd, luck, social, vienna
  Otto Weiss 2把Anton Weiss的名字推荐给码头仓库，说那里正缺一个“能扛两百斤的人”。Anton Weiss去了才知道，岗位是看管一只装满旧账本的暖房，工钱三克朗，主要工作是别让老鼠咬纸。Otto Weiss 2听说后，在工会门口堵了三天，问这算哪门子惩罚。
  _effects: cash 3 (仓库暖房的看管工钱); role; relation rival with person-materialized-world-vienna-1912-79; flag +enemy_recommended_a_sinecure; mood 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-79_

- **1941.03** `ad20-neighbor-dispute::ctx-vienna-authoritarian-1934::milieu-tenement/the-line-moves` tags: neighbor, dispute, home, everyday, public, obligation, vienna, urban
  隔壁把晾衣绳往Anton Weiss这边挪了一尺，水滴正好落在窗台上。Anton Weiss拿粉笔在墙上画了一道线；Lena看见了，又把绳子挪回去半尺。两个人都觉得自己让了步，晚饭时却都把窗户关得很紧。
  _effects: mood -0.020000000000000018; flag +laundry_line_dispute_

- **1942.01** `office16-corruption.inspection::ctx-vienna-authoritarian-1934::milieu-tenement/cover-up` tags: office, corruption, audit, legal, power, dark, vienna, urban
  Anton Weiss请Rosa Lechner去咖啡馆，把一只没有标记的信封留在桌上。Rosa Lechner没有碰信封，只把报告里“重复报销”改成“记账口径不一”；作为交换，Anton Weiss签了Rosa Lechner侄子的实习证明。两个人都没有提那只信封后来去了哪里。
  _effects: organization_funds; reputation -0.020000000000000018; flag +bribed_auditor; knowledge “审计报告里的“重复报销”被改成了“记账口径不一”，实习证明由我签字。”; mood 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-115_

- **1942.01** `state_expire:bc18-bureaucratic-ghost` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  Anton Weiss的「档案里的活鬼」到期；相关安排结束。
  _effects: state_remove bc18-bureaucratic-ghost state:world-vienna-1912:485; flag -bureaucratic_ghost_

- **1942.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss被叫到学校，老师说Katharina 2这学期总在课上看窗外。回家的路上，Anton Weiss没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 31 -> 26; state_parameter raising-child.caregiverBurden 42 -> 47; cash -2 (extra lessons and replacement pencils); mood -0.030000000000000027_

- **1942.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss被叫到学校，老师说Berta 2这学期总在课上看窗外。回家的路上，Anton Weiss没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 23 -> 18; state_parameter raising-child.caregiverBurden 45 -> 50; cash -2 (extra lessons and replacement pencils); mood -0.030000000000000027_

- **1942.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss被叫到学校，老师说Berta 2这学期总在课上看窗外。回家的路上，Anton Weiss没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 23 -> 18; state_parameter raising-child.caregiverBurden 45 -> 50; cash -2 (extra lessons and replacement pencils); mood -0.030000000000000027_

- **1942.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss被叫到学校，老师说Mitzi Berg这学期总在课上看窗外。回家的路上，Anton Weiss没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 20 -> 15; state_parameter raising-child.caregiverBurden 45 -> 50; cash -2 (extra lessons and replacement pencils); mood -0.030000000000000027_

- **1942.01** `agency:support_process` tags: agency, agency:support_process
  Anton Weiss想帮忙，但组织者不信任新来的人，只让其在外围等消息。
  _effects: mood -0.040000000000000036; reputation -0.010000000000000009_

- **1942.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Mitzi Berg这周主动擦了黑板。Anton Weiss把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 15 -> 18; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:010200_

- **1942.06** `ad20-job-interview::ctx-vienna-authoritarian-1934::milieu-tenement/hired-on-probation` tags: work, interview, employment, everyday, reputation, obligation, vienna, urban
  面试在一间改作办公室的公寓里进行。Wiener Psychoanalytische Vereinigung把三把椅子摆成一排，自己坐中间，让Anton Weiss坐最边上。问到第三句，Wiener Psychoanalytische Vereinigung忽然说：“客人若认出你，你先介绍店，还是先介绍自己？”Anton Weiss说先介绍店；Wiener Psychoanalytische Vereinigung在纸上画了一个圈，又把它涂成实心。
  _effects: employment 店员 @ org-wednesday-psychological-society; skill; flag +hired_on_probation; reputation 0.020000000000000018; mood 0.040000000000000036_

- **1942.08** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Rosa 2这周主动擦了黑板。Anton Weiss把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 15 -> 18; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:009926_

- **1942.11** `curse15-betrayal.signature::ctx-vienna-authoritarian-1934::milieu-tenement/the-files-went-first` tags: betrayal, office, power, politics, curse, institution, vienna, urban
  Emil Berg 3先把Anton Weiss抽屉里的往来信件搬空，再在会议上说Anton Weiss从来没有保存过记录。没有人能证明那些信存在过，除了Anton Weiss自己。散会后，有人让Anton Weiss回家休息几天，工资照发。Anton Weiss知道这不是照顾，是让Anton Weiss别再回来。
  _effects: reputation -0.06; relation rival with person-materialized-world-vienna-1912-78; knowledge “我经手的信件在会议前被人搬空了。”; condition; flag +records_removed_

- **1942.11** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Katharina 2这周主动擦了黑板。Anton Weiss把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 28 -> 31; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:009924_

- **1942.12** `r3-war.desertion-mp::ctx-vienna-authoritarian-1934::milieu-tenement/hid-deserter` tags: war, desertion, military_police, shelter, risk, vienna, urban, crisis
  Josef Berg 2敲谷仓门时，靴子上全是泥，手里攥着半张撕掉的地图。Anton Weiss让他进来，用干草盖住脚印；Helene Moser 2在楼上咳嗽了一声，没下楼。天亮前，Josef Weiss 2的摩托车在院外熄了火，Anton Weiss把Josef Berg 2推进地窖，自己坐在门槛上削土豆。
  _effects: flag +hid_deserter_from_military_police; role; relation friend with person-materialized-world-vienna-1912-59; relation rival with person-materialized-world-vienna-1912-115; relation acquaintance with person-materialized-world-vienna-1912-59; relation acquaintance with person-materialized-world-vienna-1912-110_

- **1943.01** `office16-budget.sign-or-block::ctx-vienna-authoritarian-1934::milieu-tenement/signed-with-margin` tags: office, budget, permit, administration, power, economy, vienna, urban
  Anton Weiss在预算表上签了字，把冬季煤房的款项从三笔并成一笔，又给夜班守卫加了半份津贴。Helene Bauer算出省下的钱刚好够修屋顶；没有人鼓掌，但一月的会议室不再需要穿大衣。
  _effects: reputation 0.03999999999999998; skill; mood 0.020000000000000018; flag +signed_balanced_budget; knowledge “把冬季煤房的款项并成一笔后，省下的钱够修会议室屋顶。”_

- **1943.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss被叫到学校，老师说Rosa 2这学期总在课上看窗外。回家的路上，Anton Weiss没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 18 -> 13; state_parameter raising-child.caregiverBurden 50 -> 55; cash -2 (extra lessons and replacement pencils); mood -0.009999999999999565_

- **1943.01** `state_tick:oj18-odd-apprenticeship/strange-year/blamed-for-the-noise` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  楼上住户投诉夜里有人拖椅子，管事的把巡查簿翻到Anton Weiss的那一页，说签字太潦草，看不出巡过几趟。Anton Weiss想辩解，却想起那晚确实在楼梯间多站了一刻钟；扣掉的工钱刚好够买一双不漏水的鞋。
  _effects: state_parameter oj18-odd-apprenticeship.trust 14 -> 0; state_parameter oj18-odd-apprenticeship.reliability 40 -> 30_

- **1943.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss被叫到学校，老师说Ferdinand 2这学期总在课上看窗外。回家的路上，Anton Weiss没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 18 -> 13; state_parameter raising-child.caregiverBurden 50 -> 55; cash -2 (extra lessons and replacement pencils)_

- **1943.01** `agency:support_process` tags: agency, agency:support_process
  Anton Weiss想帮忙，但组织者不信任新来的人，只让其在外围等消息。
  _effects: reputation -0.010000000000000009_

- **1943.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Ferdinand 2这周主动擦了黑板。Anton Weiss把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 13 -> 16; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:010783_

- **1943.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Berta 2这周主动擦了黑板。Anton Weiss把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 18 -> 21; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:010783_

- **1943.03** `vienna-parish-aid.rent-box/rent-box.food-only` tags: faith, parish, mutual_aid, poverty, family
  Anton Weiss只收下篮里的面包和豆子，把煤袋推回Josef Moser 2手里，说房租自己再想办法，请她们给介绍点零工。Josef Moser 2把煤放在走廊窗台，说礼拜四后院有人要拆旧木箱，一赫勒一捆，工钱不多但现结。Anton Weiss记下门牌，答应一早过去。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-81; relation acquaintance with person-materialized-world-vienna-1912-81_

- **1943.09** `vienna-church-community.tenement-prayer/rent-prayer-argument` tags: faith, social, family, home
  二楼的老木匠指着裂开的踏板骂起来。Anton Weiss手里还捏着念珠，Hermann Berg挡在中间说木板本来就朽了。房东太太在门后听着。
  _effects: relation acquaintance with person:evt:world-vienna-1912:001486:child; reputation -0.030000000000000027; mood -0.06000000000000005_

- **1943.11** `vienna-housing-move.sublet-room/sublet-declined` tags: housing, home, rent, family, money
  Anton Weiss正要把空床许给Otto Hofer，Emil却在楼梯上拦住了，说这条街上去年有人招了生人合住，失过钥匙，惹出些麻烦。Anton Weiss回家把铺盖重新叠好，回绝了Otto Hofer，只让他白天来喝口热水。空床仍空着，房租还是从自己的工钱里补。
  _effects: mood -0.020000000000000018_

- **1944.01** `office16-rival.removal-motion::ctx-vienna-authoritarian-1934::milieu-tenement/motion-fails` tags: office, rivalry, politics, removal, power, intrigue, vienna, urban
  会议室里有人念了一份动议，说Anton Weiss把预算当成人情。Alois Hofer把签名页传了一圈，最后停在自己手里：支持票比反对票少三张。Anton Weiss没有发言，只把下一季度的支出表放在桌上，表上每一笔都有收据。
  _effects: reputation 0.03999999999999998; relation rival with person-materialized-world-vienna-1912-15; flag +survived_removal_motion; knowledge “动议只拿到少数支持，三名原本签名的委员在投票前撤回了。”; mood 0.030000000000000027_

- **1944.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss被叫到学校，老师说Katharina 2这学期总在课上看窗外。回家的路上，Anton Weiss没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 26 -> 21; state_parameter raising-child.caregiverBurden 47 -> 52; cash -2 (extra lessons and replacement pencils); mood -0.030000000000000027_

- **1944.01** `state_expire:oj18-odd-apprenticeship` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  Anton Weiss的「奇职学徒」到期；相关安排结束。
  _effects: state_remove oj18-odd-apprenticeship state:world-vienna-1912:533; role; flag -odd_job_apprentice_

- **1944.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss被叫到学校，老师说Berta 2这学期总在课上看窗外。回家的路上，Anton Weiss没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 21 -> 16; state_parameter raising-child.caregiverBurden 50 -> 55; cash -2 (extra lessons and replacement pencils); mood -0.030000000000000027_

- **1944.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss被叫到学校，老师说Berta 2这学期总在课上看窗外。回家的路上，Anton Weiss没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 18 -> 13; state_parameter raising-child.caregiverBurden 50 -> 55; cash -2 (extra lessons and replacement pencils); mood -0.030000000000000027_

- **1944.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss被叫到学校，老师说Mitzi Berg这学期总在课上看窗外。回家的路上，Anton Weiss没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 18 -> 13; state_parameter raising-child.caregiverBurden 50 -> 55; cash -2 (extra lessons and replacement pencils); mood -0.030000000000000027_

- **1944.01** `agency:support_process` tags: agency, agency:support_process
  Anton Weiss为Wiener Psychoanalytische Vereinigung在Berggass出了力：整理名单、传递消息或替同伴作证，名字被记进参与记录。
  _effects: historical development:initiative-org-wednesday-psychological-society-1934 as supporter; historical_influence; reputation 0.015000000000000013_

- **1944.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Mitzi Berg这周主动擦了黑板。Anton Weiss把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 13 -> 16; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:011442_

- **1944.02** `vienna-legacy-worklife.hours-ledger/hours-ledger.sign` tags: legacy, work, family, reform, ordinary_life
  印泥是赭红色的，像干了的面包瓤。Anton Weiss按完手印，工头把表举到窗边吹干，阳光里那张纸透出指印的轮廓。楼下第十区的街面传来运煤车的铁皮声，星期六下午突然显得很宽。
  _effects: cash -1 (星期六下午减少的计件工钱); mood 0.050000000000000044; flag +accepted_hours_reform_

- **1944.06** `mb17-border.permit-window::ctx-vienna-authoritarian-1934::milieu-tenement/admitted-with-papers` tags: migration, border, papers, permit, station, official, belonging, vienna
  火车在清晨进站，Alois Hofer把Anton Weiss的护照翻到最后一页，又看了看那张没有照片的出生纸。蓝章落下去，手续费和住址登记表一起被推到窗口；Anton Weiss把临时居留纸折成四折，塞进内衣口袋，走出站门时天还没有完全亮。
  _effects: cash -2 (the passport fee and the first week's rent); state_add mb17-newcomer state:world-vienna-1912:708; state_add mb17-remittance-web state:world-vienna-1912:709; role; flag +mb17_admitted_at_border; mood 0.030000000000000027; knowledge “临时居留纸要求在四十八小时内到区公所登记住址。”; flag +mb17_newcomer_active; flag +mb17_remittance_web_active_

- **1944.09** `vienna-housing-move.rent-notice/rent-notice-pay` tags: housing, home, rent, family, money
  Anton Weiss把通知念给Franz Moser 2听，Franz Moser 2摇头说是楼梯间那几块新玻璃的账。Anton Weiss去楼下杂货铺换开一张五克朗的纸币，回屋一枚一枚摆开数，煤箱底多留了二十赫勒。
  _effects: cash -2 (按月多付两克朗房租); food; mood -0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-116_

- **1945.01** `state_reaction:mb17-remittance-web/border-closes` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  边境又收紧了，往故乡的列车要换乘三次。邮局说汇款还能走，但信可能压在路上；Anton Weiss还是把两张单子一起递进窗口，像把一句话交给一个不保证送达的人。
  _effects: state_parameter mb17-remittance-web.arrears 0 -> 2; mood -0.020000000000000018; flag +mb17_border_slow_letters_
  _causes: evt:world-vienna-1912:011482_

- **1945.01** `office16-scandal.public-hearing::ctx-vienna-postwar-1945::milieu-tenement/the-scandal-helps` tags: office, scandal, media, reputation, politics, power, vienna, urban
  照片登出后，Anton Weiss收到十七封邀请函，都是请去讲“如何面对舆论”。一个工商业协会送来一笔“研究资助”，请Anton Weiss去讲一次闭门课；课酬刚好补上办公室这个月的缺口。
  _effects: reputation 0.04999999999999999; organization_funds; state_add office-under-siege state:world-vienna-1912:749; knowledge “十七封邀请函里，有十二封问的是同一件事：能不能把丑闻讲成经验。”; mood 0.040000000000000036; flag +office_under_siege_

- **1945.01** `ml18-office.envelope-under-the-file::ctx-vienna-postwar-1945::milieu-tenement/the-envelope-is-a-trap` tags: office, corruption, money, scandal, legal, risk, vienna, urban
  信封里不是钞票，是裁成钞票大小的报纸。Helene Bauer带着两名记录员从侧门进来，桌上还摊着Anton Weiss没有合上的审计文件。Anton Weiss说这是有人栽赃，Helene Bauer把信封翻过来，背面写着一个只有Anton Weiss知道的编号。
  _effects: state_add under-investigation state:world-vienna-1912:751; state_parameter office-under-siege.exposure 60 -> 85; state_parameter office-under-siege.support 45 -> 30; reputation -0.06; knowledge “信封里装的是报纸剪成的假钞，背面有我的办公室编号。”_

- **1945.01** `state_reaction:mb17-newcomer/workplace-footing` tags: mb17-newcomer, migration, newcomer, language, network, housing, belonging, state
  工头让Anton Weiss把一箱零件搬到后间，又顺口教了他两个德语词。午休时，一个老工人把多余的汤推过来；Anton Weiss没有推回去，只把碗底最后一点喝干净，把空碗放回对方手边。
  _effects: state_parameter mb17-newcomer.localNetwork 6 -> 9; state_parameter mb17-newcomer.language 18 -> 19; mood 0.010000000000000009_
  _causes: evt:world-vienna-1912:011817_

- **1945.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss把Rosa 2的旧课本包上书皮，又在本子上签了名。Rosa 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Anton Weiss听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 13 -> 21; state_parameter raising-child.caregiverBurden 55 -> 52; mood 0.020000000000000018_

- **1945.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss把Ferdinand 2的旧课本包上书皮，又在本子上签了名。Ferdinand 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Anton Weiss听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 16 -> 24; state_parameter raising-child.caregiverBurden 55 -> 52; mood 0.020000000000000018_

- **1945.01** `state_tick:mb17-newcomer/first-year/moves-again` tags: mb17-newcomer, migration, newcomer, language, network, housing, belonging, state
  房东把房租涨了一截，Anton Weiss在同一个星期里丢了工。夜里他把行李重新捆好，发现自己已经能听懂搬家公司问的那句德语，却还不足以跟人争一份租约；第二天清早，他把钥匙放在门房，没有回头。
  _effects: state_parameter mb17-newcomer.language 19 -> 21; state_parameter mb17-newcomer.localNetwork 9 -> 5; state_parameter mb17-newcomer.housingStrain 65 -> 75; mood -0.050000000000000044; flag +mb17_moved_again_

- **1945.01** `state_tick:mb17-remittance-web/remittance-year/posted-in-time` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  Anton Weiss把工钱摊在桌上，先数出房租和煤钱，再把剩下的换成一张汇款单。邮局职员在单子上敲了章，说“两周能到”；回家的路上，他买了一张最便宜的明信片，写了两行字又划掉一行。
  _effects: cash -2 (the money order and postage); state_parameter mb17-remittance-web.supportSent 4 -> 6; state_parameter mb17-remittance-web.arrears 2 -> 1; state_parameter mb17-remittance-web.obligation 55 -> 52; mood 0.010000000000000009_

- **1945.01** `agency:recruit_members` tags: agency, agency:recruit_members
  Anton Weiss找到Josef Berg 2，把Wiener Psychoanalytische Vereinigung的章程和会费说清楚；对方留下地址，答应下次再来。
  _effects: organization_membership; relation acquaintance with person-materialized-world-vienna-1912-59; historical development:initiative-org-wednesday-psychological-society-1934 as supporter; knowledge “我通过Anton Weiss加入了Wiener Psychoanalytische Vereinigung。”_

- **1945.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Rosa 2这周主动擦了黑板。Anton Weiss把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 21 -> 24; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:012095_

- **1945.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Katharina 2这周主动擦了黑板。Anton Weiss把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 21 -> 24; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:012102_

- **1945.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Berta 2这周主动擦了黑板。Anton Weiss把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 16 -> 19; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:012102_

- **1945.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Berta 2这周主动擦了黑板。Anton Weiss把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 13 -> 16; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:012102_

- **1945.06** `r15-curse.betrayal-at-table::ctx-vienna-authoritarian-1934::milieu-tenement/sold-a-secret` tags: betrayal, social, family, trust, secret, vienna, urban, crisis
  Berta Kraus把Anton Weiss在饭桌上说过的名字和地址卖给了别人。几天后，Anton Weiss发现自己的话出现在一封不该出现的信里。Berta Kraus没有否认，只说“大家都要活”。
  _effects: mood -0.040000000000000036; relation rival with person:evt:world-vienna-1912:000333:child; state_add under-investigation state:world-vienna-1912:750_

- **1946.01** `office16-budget.sign-or-block::ctx-vienna-postwar-1945::milieu-tenement/blocked-the-permit` tags: office, budget, permit, administration, power, economy, vienna, urban
  Anton Weiss把一份扩建许可证压在抽屉最下面，理由是排水和消防通道不合规。申请人Maria Stein在走廊里等到下班，最后只拿到一张写着“补件”的纸条。Anton Weiss知道这份许可明年还会再来，但今年不会从自己的桌上出去。
  _effects: reputation 0.020000000000000018; skill; relation rival with person-materialized-world-vienna-1912-72; flag +blocked_permit; knowledge “扩建申请的排水图与消防通道不符合现行规定。”_

- **1946.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss被叫到学校，老师说Katharina 2这学期总在课上看窗外。回家的路上，Anton Weiss没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 24 -> 19; state_parameter raising-child.caregiverBurden 52 -> 57; cash -2 (extra lessons and replacement pencils); mood -0.030000000000000027_

- **1946.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss被叫到学校，老师说Berta 2这学期总在课上看窗外。回家的路上，Anton Weiss没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 19 -> 14; state_parameter raising-child.caregiverBurden 55 -> 60; cash -2 (extra lessons and replacement pencils); mood -0.030000000000000027_

- **1946.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss被叫到学校，老师说Berta 2这学期总在课上看窗外。回家的路上，Anton Weiss没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 16 -> 11; state_parameter raising-child.caregiverBurden 55 -> 60; cash -2 (extra lessons and replacement pencils)_

- **1946.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss被叫到学校，老师说Mitzi Berg这学期总在课上看窗外。回家的路上，Anton Weiss没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 19 -> 14; state_parameter raising-child.caregiverBurden 55 -> 60; cash -2 (extra lessons and replacement pencils)_

- **1946.01** `state_expire:office-under-siege` tags: office-under-siege, office, scandal, pressure, politics, legal, risk, state
  Anton Weiss的「职位受围」到期；相关安排结束。
  _effects: state_remove office-under-siege state:world-vienna-1912:749; flag -office_under_siege_

- **1946.01** `state_tick:under-investigation/case-progress/evidence` tags: under-investigation, legal, police, investigation, risk, state, state_tick
  调查员又来找Anton Weiss谈了一次。问话比上次具体，记录也比上次长。
  _effects: state_parameter under-investigation.progress 15 -> 30_

- **1946.01** `state_tick:under-investigation/case-progress/evidence` tags: under-investigation, legal, police, investigation, risk, state, state_tick
  调查员又来找Anton Weiss谈了一次。问话比上次具体，记录也比上次长。
  _effects: state_parameter under-investigation.progress 20 -> 35_

- **1946.01** `state_reaction:mb17-remittance-web/wages-arrive` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  厂里补发了一笔拖欠的工钱。Anton Weiss没有先还杂货铺的账，而是去邮局多填了一张汇款单；回来的路上，他给自己买了一支最便宜的烟，站在桥上看了一会儿水，才把剩下的钱数清楚。
  _effects: cash 1 (the factory paid part of the arrears); state_parameter mb17-remittance-web.supportSent 6 -> 7; state_parameter mb17-remittance-web.obligation 52 -> 50; mood 0.010000000000000009_
  _causes: evt:world-vienna-1912:012740_

- **1946.01** `agency:recruit_members` tags: agency, agency:recruit_members
  Anton Weiss找到Berta Kraus，把Wiener Psychoanalytische Vereinigung的章程和会费说清楚；对方留下地址，答应下次再来。
  _effects: organization_membership; knowledge “我通过Anton Weiss加入了Wiener Psychoanalytische Vereinigung。”_

- **1946.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Ferdinand 2这周主动擦了黑板。Anton Weiss把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 24 -> 27; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:012804_

- **1946.05** `vienna-legacy-worklife.sick-fund/sick-fund.keep-quiet` tags: legacy, work, family, reform, ordinary_life, injury
  止咳药水是褐色的，瓶口塞着软木塞，摇一摇会起沫。Anton Weiss看着工友把表折成小块，折了三折才塞进帽檐。墙上的规章还贴在那里，纸角被风掀起，没人去按。
  _effects: mood -0.050000000000000044; health -0.040000000000000036 (没有正规病假，只能靠药水撑着); relation colleague with person-materialized-world-vienna-1912-31_

- **1946.07** `hs18-blackout.denial::ctx-vienna-postwar-1945::milieu-tenement/read-it-aloud` tags: blackout, rumor, denial, official, neighbor, ambiguity, vienna, urban
  Helene Bauer把一张辟谣告示贴在电线杆上，说昨夜只是线路故障，没有人被捕。Anton Weiss站在旁边，把告示从头到尾念给不识字的人听；念到“请勿传播谣言”时，Alois Hofer在人群里咳了一声。
  _effects: state_parameter hs18-blackout-rumor.officialDenial true -> true; state_parameter hs18-blackout-rumor.credibility 35 -> 30; state_parameter hs18-blackout-rumor.panic 36 -> 31; reputation 0.020000000000000018; flag +read_denial_aloud; knowledge “告示上的字和昨夜听到的话对不上。”_

- **1946.08** `oj18-taxi.night-fare::ctx-vienna-postwar-1945::milieu-tenement/coop-keys` tags: taxi, night, driver, passenger, work, odd_job, everyday, vienna
  合作社的调度Friedrich Berg把一枚铜牌和一把车钥匙推过柜台，说夜班只跑环城路，十一点以后不接去普拉特的车。Anton Weiss把铜牌挂在后视镜上，第一晚就拉了七个客人，最后一个在车上睡着，打鼾像一台小马达。
  _effects: organization_found 第二区夜班出租合作社 (other); position 夜班司机 @taxi:person-materialized-world-vienna-1912-4-evt:world-vienna-1912:012296; state_add oj18-odd-apprenticeship state:world-vienna-1912:792; cash 2 (night taxi fares); flag +taxi_night_shift; knowledge “夜班只跑环城路，十一点以后不接去普拉特的车。”; relation acquaintance with person-materialized-world-vienna-1912-101; role; flag +odd_job_apprentice_

- **1946.09** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Mitzi Berg这周主动擦了黑板。Anton Weiss把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 16 -> 19; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:012488_

- **1947.01** `hs18-investigation.repair::ctx-vienna-postwar-1945::milieu-tenement/say-the-records-burned` tags: investigation, radio, paperwork, worker, police, history, vienna, urban
  Anton Weiss说修理铺去年失过火，底单都烧了。Helene Bauer没有反驳，只问火是哪个月。Anton Weiss答得太快，对方在纸上记了一个圈。Otto Hofer后来听说这件事，托人带话：那场火只烧了后院。
  _effects: state_parameter under-investigation.progress 30 -> 45; flag +claimed_repair_records_burned; knowledge “谎话最怕被问月份。”; mood -0.030000000000000027_

- **1947.01** `r3-crime.stop-and-search::ctx-vienna-postwar-1945::milieu-tenement/turned-out-and-released` tags: crime, police, papers, street, humiliation, vienna, urban, postwar
  Alois Hofer让Anton Weiss靠墙站好，先拍外套，再翻口袋。车票、钥匙、半块肥皂被摆在人行道上，Friedrich Weiss提着牛奶壶从旁边绕过去。Alois Hofer把身份证对着路灯看了很久，最后说“走吧”，地上的东西让Anton Weiss自己捡。
  _effects: mood -0.010000000000000009; flag +stopped_and_searched; knowledge “the patrol checks pockets after curfew”_

- **1947.01** `state_reaction:mb17-newcomer/hostile-notice` tags: mb17-newcomer, migration, newcomer, language, network, housing, belonging, state
  楼梯间有人用粉笔写了“外国人滚回去”，Anton Weiss的名字被写在下面，拼错了一个字母。他站着看了很久，最后用袖子把字擦掉，袖口留下一层白灰；楼上有人关门，声音比平时重。
  _effects: state_parameter mb17-newcomer.localNetwork 8 -> 4; state_parameter mb17-newcomer.housingStrain 75 -> 78; flag +mb17_public_humiliation_
  _causes: evt:world-vienna-1912:012986_

- **1947.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss把Rosa 2的旧课本包上书皮，又在本子上签了名。Rosa 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Anton Weiss听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 24 -> 32; state_parameter raising-child.caregiverBurden 52 -> 49; mood 0.020000000000000018_

- **1947.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss把Ferdinand 2的旧课本包上书皮，又在本子上签了名。Ferdinand 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Anton Weiss听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 27 -> 35; state_parameter raising-child.caregiverBurden 52 -> 49; mood 0.020000000000000018_

- **1947.01** `state_tick:mb17-newcomer/first-year/puts-down-roots` tags: mb17-newcomer, migration, newcomer, language, network, housing, belonging, state
  一年过去，Anton Weiss能在菜市场用德语讲价，也知道哪家铺子肯赊半块黄油。房东仍叫他“新来的”，但楼下的面包师已经记住了他买哪一种面包，还会把前一天剩的那只小圆面包留出来。
  _effects: state_parameter mb17-newcomer.language 22 -> 26; state_parameter mb17-newcomer.localNetwork 4 -> 9; state_parameter mb17-newcomer.housingStrain 78 -> 76; mood 0.020000000000000018_

- **1947.01** `state_tick:mb17-remittance-web/remittance-year/posted-in-time` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  Anton Weiss把工钱摊在桌上，先数出房租和煤钱，再把剩下的换成一张汇款单。邮局职员在单子上敲了章，说“两周能到”；回家的路上，他买了一张最便宜的明信片，写了两行字又划掉一行。
  _effects: cash -2 (the money order and postage); state_parameter mb17-remittance-web.supportSent 7 -> 9; state_parameter mb17-remittance-web.arrears 1 -> 0; state_parameter mb17-remittance-web.obligation 50 -> 47; mood 0.010000000000000009_

- **1947.01** `state_tick:under-investigation/case-progress/evidence` tags: under-investigation, legal, police, investigation, risk, state, state_tick
  调查员又来找Anton Weiss谈了一次。问话比上次具体，记录也比上次长。
  _effects: state_parameter under-investigation.progress 45 -> 60; mood -0.040000000000000036_

- **1947.01** `state_expire:under-investigation` tags: under-investigation, legal, police, investigation, risk, state, state_tick, state:under-investigation
  Anton Weiss的「被调查」到期；相关安排结束。
  _effects: state_remove under-investigation state:world-vienna-1912:751_

- **1947.01** `state_tick:oj18-odd-apprenticeship/strange-year/learned-the-building` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  又过了一个冬天，Anton Weiss能从楼梯的响声判断是谁在值夜，也能从煤气灯的颜色判断哪一段管道该修。师傅把巡查路线改了三次，最后仍然照Anton Weiss画的那张走；两个人都没有提这件事。
  _effects: state_parameter oj18-odd-apprenticeship.trust 30 -> 40; state_parameter oj18-odd-apprenticeship.strangeKnowledge 10 -> 20; state_parameter oj18-odd-apprenticeship.nightsWorked 0 -> 24; cash 2 (night-shift wages); skill_

- **1947.01** `agency:publish` tags: agency, agency:publish
  Anton Weiss把一篇短文交到印刷所，谈当前的争论；几天后，认识字的人在咖啡馆里传阅它。
  _effects: reputation 0.02999999999999997_

- **1947.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Rosa 2这周主动擦了黑板。Anton Weiss把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 32 -> 35; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:013485_

- **1947.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Katharina 2这周主动擦了黑板。Anton Weiss把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 19 -> 22; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:013496_

- **1947.02** `r3-war.refugee-train::ctx-vienna-postwar-1945::milieu-tenement::repatriation-train/filled-repatriation-form` tags: war, refugee, train, station, migration, vienna, urban, postwar
  Katharina 2的村子已经划到另一面旗子下，Josef Huber 2说这趟车只到边界。Anton Weiss帮她把行李搬下车，站台上全是等着换乘的人，孩子坐在箱子上吃冷土豆。Hermann Berg过来发登记表，Katharina 2不识字，Anton Weiss替她填了名字。
  _effects: flag +filled_repatriation_form; role; relation friend with person:evt:world-vienna-1912:003445:child; knowledge “the border has moved across her village”_

- **1947.12** `office16-hire.protege::ctx-vienna-postwar-1945::milieu-tenement/refused-by-committee` tags: office, hire, patronage, bureaucracy, work, power, vienna, urban
  编制委员会只用了十分钟就否掉了Emil的名字：预算冻结，岗位归并，连桌子都要搬去仓库。Anton Weiss把那张表折起来，答应明年再试。Emil说没关系，第二天去了另一家事务所面试。
  _effects: flag +protege_hiring_refused; knowledge “编制委员会今年冻住了所有新增岗位。”_

- **1947.12** `state_reaction:mb17-newcomer/workplace-footing` tags: mb17-newcomer, migration, newcomer, language, network, housing, belonging, state
  工头让Anton Weiss把一箱零件搬到后间，又顺口教了他两个德语词。午休时，一个老工人把多余的汤推过来；Anton Weiss没有推回去，只把碗底最后一点喝干净，把空碗放回对方手边。
  _effects: state_parameter mb17-newcomer.localNetwork 5 -> 8; state_parameter mb17-newcomer.language 21 -> 22; mood 0.010000000000000009_
  _causes: evt:world-vienna-1912:012984_

- **1948.01** `office16-corruption.inspection::ctx-vienna-postwar-1945::milieu-tenement/clean-audit` tags: office, corruption, audit, legal, power, dark, vienna, urban
  Alois Hofer带了两只空箱子来，走的时候还是空的。Anton Weiss把三年的合同、收据和会议记录按月份排在地上，Alois Hofer抽查了十二份，每一份都能对上签字人；最后一句是“下次可以少准备一点”。
  _effects: reputation 0.04999999999999999; organization_funds; skill; mood 0.030000000000000027; flag +passed_audit; knowledge “审计抽查了十二份合同，每一份都能对上签字人。”_

- **1948.01** `hist15-purge.seed::ctx-vienna-postwar-1945::milieu-tenement/the-file-stays-closed` tags: purge, repression, organization, surveillance, history, work, vienna, urban
  人事科的门开了又关，Anton Weiss的档案被放在最下面。没有人解释为什么，只有Friedrich Berg把一叠旧表格推过来，说“先把这个月做完”。窗外的口号声一阵高一阵低，处里的打字机一直没有停。
  _effects: state_add institution-purge state:world-vienna-1912:872; mood -0.020000000000000018; knowledge “审查名单还没有公开，但人事科已经把所有档案重新排过。”_

- **1948.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss把Katharina 2的旧课本包上书皮，又在本子上签了名。Katharina 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Anton Weiss听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 22 -> 30; state_parameter raising-child.caregiverBurden 57 -> 54; mood 0.020000000000000018_

- **1948.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss把Berta 2的旧课本包上书皮，又在本子上签了名。Berta 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Anton Weiss听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 14 -> 22; state_parameter raising-child.caregiverBurden 60 -> 57; mood 0.020000000000000018_

- **1948.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss把Berta 2的旧课本包上书皮，又在本子上签了名。Berta 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Anton Weiss听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 11 -> 19; state_parameter raising-child.caregiverBurden 60 -> 57; mood 0.020000000000000018_

- **1948.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss把Mitzi Berg的旧课本包上书皮，又在本子上签了名。Mitzi Berg今年学会了自己系鞋带，也学会了在饭桌上说“不”；Anton Weiss听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 14 -> 22; state_parameter raising-child.caregiverBurden 60 -> 57; mood 0.020000000000000018_

- **1948.01** `state_tick:under-investigation/case-progress/evidence` tags: under-investigation, legal, police, investigation, risk, state, state_tick
  调查员又来找Anton Weiss谈了一次。问话比上次具体，记录也比上次长。
  _effects: state_parameter under-investigation.progress 60 -> 75; mood -0.040000000000000036_

- **1948.01** `p9-work-jobsearch.request-raise/request-raise.postponed` tags: work, job_search, negotiation, wages, employment, task, raise, task:work
  “明年再说，眼下订单少。”小巷电影院把纸往桌边一推。Anton Weiss站着没动，想问哪个月，厂长的怀表已经合上。茶杯底下压着那两页活计，印子慢慢洇开。
  _effects: mood -0.06000000000000005; reputation 0.010000000000000009_

- **1948.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Ferdinand 2这周主动擦了黑板。Anton Weiss把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 35 -> 38; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:014172_

- **1948.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Berta 2这周主动擦了黑板。Anton Weiss把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 22 -> 25; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:014183_

- **1948.07** `r2-leisure.spa-cure::ctx-vienna-postwar-1945::milieu-tenement::spa-cure-reform/municipal-spa-place` tags: leisure, spa, health, routine, class, vienna, urban, postwar
  市立疗养院给工人家庭留了免费名额，Anton Weiss拿着工会的介绍信来，前台看了三遍，才把钥匙递出来。Franz Weiss 2说矿泉水和散步照旧，但伙食只有燕麦和牛奶。Anton Weiss说比家里的黑面包好。
  _effects: cash -1 (矿泉杯里的第十七口); condition; flag +municipal_spa_place; role; relation colleague with person-materialized-world-vienna-1912-31; knowledge “the municipal spa reserves places for worker families”_

- **1948.08** `r3-mig.xenophobic-landlord::ctx-vienna-postwar-1945::milieu-tenement/prepaid-year-of-rent` tags: migration, housing, hostility, landlord, poverty, vienna, urban, postwar
  Anton Weiss把一年的房租一次付清，十二克朗拍在桌上。Alois Bauer点了两遍，收下，却在租约背面加了一行：不得留宿亲友，不得在走廊做饭。Anton Weiss问访客算不算留宿，Alois Bauer说“你说呢”。
  _effects: cash -12 (门上的粉笔叉); condition; flag +prepaid_year_rent_foreigner; relation acquaintance with person-materialized-world-vienna-1912-73; knowledge “the lease forbids visitors and hallway cooking”; relation acquaintance with person-materialized-world-vienna-1912-73_

- **1949.01** `office16-scandal.public-hearing::ctx-vienna-postwar-1945::milieu-tenement/the-scandal-helps` tags: office, scandal, media, reputation, politics, power, vienna, urban
  照片登出后，Anton Weiss收到十七封邀请函，都是请去讲“如何面对舆论”。一个工商业协会送来一笔“研究资助”，请Anton Weiss去讲一次闭门课；课酬刚好补上办公室这个月的缺口。
  _effects: reputation 0.04999999999999999; organization_funds; state_add office-under-siege state:world-vienna-1912:917; knowledge “十七封邀请函里，有十二封问的是同一件事：能不能把丑闻讲成经验。”; mood 0.040000000000000036; flag +office_under_siege_

- **1949.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss把Rosa 2的旧课本包上书皮，又在本子上签了名。Rosa 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Anton Weiss听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 35 -> 43; state_parameter raising-child.caregiverBurden 49 -> 46; mood 0.020000000000000018_

- **1949.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss把Ferdinand 2的旧课本包上书皮，又在本子上签了名。Ferdinand 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Anton Weiss听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 38 -> 46; state_parameter raising-child.caregiverBurden 49 -> 46; mood 0.020000000000000018_

- **1949.01** `state_tick:mb17-newcomer/first-year/still-a-guest` tags: mb17-newcomer, migration, newcomer, language, network, housing, belonging, state
  Anton Weiss又搬了一次房，箱子里多了一把缺齿的梳子和一叠没寄出的信。新住处离电车线更远，邻居说德语很快；他只能点头，等对方走后再把门关上，把今天听错的词一个一个记在旧票据背面。
  _effects: state_parameter mb17-newcomer.language 26 -> 27; state_parameter mb17-newcomer.localNetwork 9 -> 7; state_parameter mb17-newcomer.housingStrain 76 -> 80; cash -1 (the move and a new rent deposit); mood -0.030000000000000027_

- **1949.01** `state_tick:mb17-remittance-web/remittance-year/month-behind` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  这个月厂里少发了工钱。Anton Weiss把汇款单填到一半又放下，先给房东送去一部分；夜里他给故乡写信，说“下个月一定补上”，写完把信纸折了三折，像怕它自己会开口。
  _effects: cash -1 (the rent was paid first); state_parameter mb17-remittance-web.arrears 0 -> 1; state_parameter mb17-remittance-web.obligation 47 -> 51; mood -0.030000000000000027_

- **1949.01** `state_expire:under-investigation` tags: under-investigation, legal, police, investigation, risk, state, state_tick, state:under-investigation
  Anton Weiss的「被调查」到期；相关安排结束。
  _effects: state_remove under-investigation state:world-vienna-1912:750_

- **1949.01** `state_tick:oj18-odd-apprenticeship/strange-year/trusted-with-the-keys` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  两年过去，Anton Weiss已经能闭着眼说出哪块地板会响、哪盏煤气灯该在几点关。师傅把备用钥匙交下来，没有解释为什么第三把钥匙磨得最亮；Anton Weiss也没有问，只在巡查簿最后一页画了一个小小的记号。
  _effects: state_parameter oj18-odd-apprenticeship.trust 40 -> 50; state_parameter oj18-odd-apprenticeship.strangeKnowledge 20 -> 30; state_parameter oj18-odd-apprenticeship.nightsWorked 24 -> 48; cash 2 (night-shift wages); skill_

- **1949.01** `agency:organize_meeting` tags: agency, agency:organize_meeting
  Anton Weiss原定在Leopoldstädter Zinshaus, gemeinsamer Gang开会，但来的人不够，或者有人临时退缩；最后只留下几张没发完的纸条。
  _effects: mood -0.040000000000000036; reputation -0.010000000000000009_

- **1949.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Berta 2这周主动擦了黑板。Anton Weiss把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 19 -> 22; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:014872_

- **1949.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Mitzi Berg这周主动擦了黑板。Anton Weiss把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 22 -> 25; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:014872_

- **1949.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Katharina 2这周主动擦了黑板。Anton Weiss把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 30 -> 33; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:014887_

- **1949.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Rosa 2这周主动擦了黑板。Anton Weiss把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 43 -> 46; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:014889_

- **1949.01** `state_reaction:mb17-newcomer/workplace-footing` tags: mb17-newcomer, migration, newcomer, language, network, housing, belonging, state
  工头让Anton Weiss把一箱零件搬到后间，又顺口教了他两个德语词。午休时，一个老工人把多余的汤推过来；Anton Weiss没有推回去，只把碗底最后一点喝干净，把空碗放回对方手边。
  _effects: state_parameter mb17-newcomer.localNetwork 7 -> 10; state_parameter mb17-newcomer.language 27 -> 28; mood 0.010000000000000009_
  _causes: evt:world-vienna-1912:014889_

- **1949.02** `vienna-legacy-worklife.sick-fund/sick-fund.advance-from-fund` tags: legacy, work, family, reform, ordinary_life
  药房在街口，柜台玻璃下面压着价目纸。Anton Weiss把两克朗推过去，伙计找回来十二赫勒，药片用报纸包成一个小包。工友接过去时手还在抖，报纸边角很快被汗洇软。
  _effects: cash -2 (从互助金垫付药费); health 0.05999999999999999 (及时买到药)_

- **1949.04** `vienna-tenement-neighbors.lost_room_key/key_stolen_by_stranger` tags: home, social, family, housing
  Anton Weiss记得出门时钥匙还在，回来却没了。Josef Berg 2说下午看见一个穿灰外套的男人在楼道里转悠，手里晃着一把铜钥匙。两人下楼查看，房门虚掩，抽屉被拉开，攒着买煤的六克朗不见了。Josef Berg 2陪着Anton Weiss去街角警察岗亭报了案，警察记下灰外套，说会留意。
  _effects: cash -6 (被盗的买煤钱); relation friend with person-materialized-world-vienna-1912-59; mood -0.09999999999999998_

- **1949.11** `df18-dream.water-in-the-cellar::ctx-vienna-postwar-1945::milieu-tenement/move-the-crates` tags: dream, omen, home, water, coincidence, eerie, everyday, vienna
  梦里，Anton Weiss看见地窖的水漫过脚踝，木箱一只只浮起来。第二天一早，Anton Weiss把箱子和煤筐搬到床上。中午，楼下的水管裂了，水沿着墙根流进地窖，只浸湿了一只空桶。Helene Weiss说Anton Weiss运气好，Anton Weiss没有解释。
  _effects: cash -1 (搬箱子时打碎了一只罐子); knowledge “我梦见地窖进水，第二天水管真的裂了。”; flag +df18_moved_crates_before_flood; mood 0.020000000000000018_

- **1950.01** `office16-budget.sign-or-block::ctx-vienna-postwar-1945::milieu-tenement/blocked-the-permit` tags: office, budget, permit, administration, power, economy, vienna, urban
  Anton Weiss把一份扩建许可证压在抽屉最下面，理由是排水和消防通道不合规。申请人Ferdinand Winter 2在走廊里等到下班，最后只拿到一张写着“补件”的纸条。Anton Weiss知道这份许可明年还会再来，但今年不会从自己的桌上出去。
  _effects: reputation 0.020000000000000018; skill; relation rival with person-materialized-world-vienna-1912-6; knowledge “扩建申请的排水图与消防通道不符合现行规定。”_

- **1950.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Berta 2这周主动擦了黑板。Anton Weiss把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 25 -> 28; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:015308_

- **1950.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss把Katharina 2的旧课本包上书皮，又在本子上签了名。Katharina 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Anton Weiss听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 33 -> 41; state_parameter raising-child.caregiverBurden 54 -> 51; mood 0.020000000000000018_

- **1950.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss把Berta 2的旧课本包上书皮，又在本子上签了名。Berta 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Anton Weiss听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 28 -> 36; state_parameter raising-child.caregiverBurden 57 -> 54; mood 0.020000000000000018_

- **1950.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss把Berta 2的旧课本包上书皮，又在本子上签了名。Berta 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Anton Weiss听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 22 -> 30; state_parameter raising-child.caregiverBurden 57 -> 54; mood 0.020000000000000018_

- **1950.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss把Mitzi Berg的旧课本包上书皮，又在本子上签了名。Mitzi Berg今年学会了自己系鞋带，也学会了在饭桌上说“不”；Anton Weiss听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 25 -> 33; state_parameter raising-child.caregiverBurden 57 -> 54; mood 0.020000000000000018_

- **1950.01** `state_expire:mb17-newcomer` tags: mb17-newcomer, migration, newcomer, language, network, housing, belonging, state
  Anton Weiss的「初到维也纳的人」到期；相关安排结束。
  _effects: state_remove mb17-newcomer state:world-vienna-1912:708; flag -mb17_newcomer_active_

- **1950.01** `state_expire:oj18-odd-apprenticeship` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  Anton Weiss的「奇职学徒」到期；相关安排结束。
  _effects: state_remove oj18-odd-apprenticeship state:world-vienna-1912:792; role; flag -odd_job_apprentice_

- **1950.01** `state_expire:office-under-siege` tags: office-under-siege, office, scandal, pressure, politics, legal, risk, state
  Anton Weiss的「职位受围」到期；相关安排结束。
  _effects: state_remove office-under-siege state:world-vienna-1912:917; flag -office_under_siege_

- **1950.01** `agency:support_process` tags: agency, agency:support_process
  Anton Weiss想帮忙，但组织者不信任新来的人，只让其在外围等消息。
  _effects: mood -0.040000000000000036; reputation -0.010000000000000009_

- **1950.05** `vienna-legacy-worklife.union-office/union-office.enroll-first` tags: legacy, work, family, reform, ordinary_life
  一克朗硬币在桌上排开。Anton Weiss数了两遍，才在名册上写“已缴”。窗外有人探头问这里是不是工会，接待的人这次知道怎么开口了，把门拉开一半。
  _effects: cash 1 (新会员的入会费先记在桌上); skill_

- **1950.06** `r1-civ.war-memorial-names::ctx-vienna-postwar-1945::milieu-tenement/added-omitted-war-dead-name` tags: war, memory, memorial, veterans, politics, vienna, urban, postwar
  Anton Weiss在夜里把那个名字补了上去，用的是同样的金漆。第二天，Alois Hofer发现了，用一块布蘸着松节油擦掉，说“名单要按档案来”。Elisabeth Winter 2站在台下看着，没有哭，只把手里的一朵纸花放在了台阶上。
  _effects: reputation 0.050000000000000044; condition; flag +added_omitted_war_dead_name; relation rival with person-materialized-world-vienna-1912-15; relation friend with person-materialized-world-vienna-1912-61; knowledge “the committee erases names that are not in the regimental fi”_

- **1950.06** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Ferdinand 2这周主动擦了黑板。Anton Weiss把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 46 -> 49; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:015306_

- **1950.09** `ad20-police-stop::ctx-vienna-postwar-1945::milieu-tenement/taken-in` tags: police, legal, street, everyday, obligation, risk, vienna, urban
  Hermann Berg让Anton Weiss靠墙站好，把口袋里的东西一件件放在地上。钥匙、手帕、半块面包，还有一张写着地址的纸。Hermann Berg把纸对着路灯看了很久，最后说“跟我们走一趟”。
  _effects: cash -2 (a fine after the police stop); reputation -0.030000000000000027; flag +police_stop_record; health -0.020000000000000018 (a night in a holding cell); mood -0.050000000000000044_

- **1951.01** `office16-admin.quiet-ledger::ctx-vienna-postwar-1945::milieu-tenement/balanced` tags: office, administration, budget, competence, quiet, power, vienna, urban
  Anton Weiss用三个月把账本上的零碎支出并成四类，又停掉两份没有人看的简报。年底结账时，Anna 2发现不仅没有赤字，还剩下够换一批档案柜的钱；没有剪彩，只有仓库里新柜子的木头味。
  _effects: organization_funds; reputation 0.040000000000000036; skill; mood 0.020000000000000018; flag +balanced_the_books; knowledge “停掉两份简报、合并零碎支出后，年底还剩一笔够换档案柜的钱。”_

- **1951.01** `r2-leisure.kitchen-shortweight::ctx-vienna-postwar-1945::milieu-tenement/told-the-housekeeper` tags: domestic_service, kitchen, theft, accounting, loyalty, vienna, urban, postwar
  Anton Weiss在楼梯口追上Josef Berg 2，说称可能不准。Josef Berg 2没回头，只说明天换一杆秤。第二天Anton Weiss被调去擦银器，Ferdinand Winter 2把一锅热水泼在门口，谁也没提黄油。
  _effects: reputation 0.040000000000000036; flag +reported_kitchen_shortweight; role; relation rival with person-materialized-world-vienna-1912-6; knowledge “the housekeeper will replace the butter scale without naming”; relation colleague with person-materialized-world-vienna-1912-59_

- **1951.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss把Rosa 2的旧课本包上书皮，又在本子上签了名。Rosa 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Anton Weiss听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 49 -> 57; state_parameter raising-child.caregiverBurden 46 -> 43; mood 0.020000000000000018_

- **1951.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss把Ferdinand 2的旧课本包上书皮，又在本子上签了名。Ferdinand 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Anton Weiss听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 49 -> 57; state_parameter raising-child.caregiverBurden 46 -> 43; mood 0.020000000000000018_

- **1951.01** `state_tick:mb17-remittance-web/remittance-year/posted-in-time` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  Anton Weiss把工钱摊在桌上，先数出房租和煤钱，再把剩下的换成一张汇款单。邮局职员在单子上敲了章，说“两周能到”；回家的路上，他买了一张最便宜的明信片，写了两行字又划掉一行。
  _effects: cash -2 (the money order and postage); state_parameter mb17-remittance-web.supportSent 9 -> 11; state_parameter mb17-remittance-web.arrears 3 -> 2; state_parameter mb17-remittance-web.obligation 51 -> 48; mood 0.010000000000000009_

- **1951.01** `agency:support_process` tags: agency, agency:support_process
  Anton Weiss为第二区夜班出租合作社在Leopoldstädter Zinshaus, gemeinsam出了力：整理名单、传递消息或替同伴作证，名字被记进参与记录。
  _effects: historical development:initiative-taxi:person-phase15-Rosa-world-vienna-1912-evt:world-vienna-1912:006663-1948 as supporter; historical_influence; reputation 0.015000000000000013_

- **1951.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Berta 2这周主动擦了黑板。Anton Weiss把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 30 -> 33; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:016314_

- **1951.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Mitzi Berg这周主动擦了黑板。Anton Weiss把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 33 -> 36; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:016314_

- **1951.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Katharina 2这周主动擦了黑板。Anton Weiss把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 41 -> 44; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:016318_

- **1951.04** `state_reaction:mb17-remittance-web/border-closes` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  边境又收紧了，往故乡的列车要换乘三次。邮局说汇款还能走，但信可能压在路上；Anton Weiss还是把两张单子一起递进窗口，像把一句话交给一个不保证送达的人。
  _effects: state_parameter mb17-remittance-web.arrears 1 -> 3; mood -0.040000000000000036_
  _causes: evt:world-vienna-1912:015746_

- **1951.06** `r1-hc.delirium-night::ctx-vienna-postwar-1945::milieu-tenement/delirium-fall` tags: health, delirium, withdrawal, fever, night, vienna, urban, postwar
  Anton Weiss从床上滚下来，额头磕在夜壶边，血顺着鼻梁流进嘴里。等Maria Moser 2叫来担架，人还在说明天要去开会；抬出去时，他手里攥着一只不属于这个季节的棉帽。
  _effects: cash -12 (天花板上爬满了虫子); health -0.26 (天花板上爬满了虫子); condition; role; knowledge “the night pot was beside the bed and the floor was bare ston”; move place-wien-allgemeines-krankenhaus_

- **1951.09** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Rosa 2这周主动擦了黑板。Anton Weiss把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 46 -> 49; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:016047_

- **1951.11** `vienna-housing-move.rent-notice/rent-notice-demand-repair` tags: housing, home, rent, family, money
  Anton Weiss没有立刻答话，先去敲Otto Weiss 2的门。两人一起数落墙上的水渍和门框里灌进来的风，楼梯间的窗户修好了，自家墙皮还在剥落。Otto Weiss 2提议一起把话带给看门人：先修好漏水的墙角，涨租的事再谈。Anton Weiss把纸重新折好，请他把话带到门外。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-79; mood 0.030000000000000027; flag +rent_dispute_

- **1952.01** `curse15-betrayal.signature::ctx-vienna-postwar-1945::milieu-tenement/the-seal-was-used` tags: betrayal, office, power, politics, curse, institution, vienna, urban
  Ferdinand Winter 2用Anton Weiss留在抽屉里的印章签了一份采购单，把库房里最后一批煤卖给了城外的砖厂。Anton Weiss发现时，账已经做平，签字栏里是Anton Weiss自己的名字。Ferdinand Winter 2说只是替Anton Weiss省了麻烦，还把那支用旧的印泥放回了原处。
  _effects: cash -3 (为平账先垫出去的钱); reputation -0.09999999999999998; relation rival with person-materialized-world-vienna-1912-6; condition; flag +seal_used_by_trusted_hand; mood -0.06999999999999995_

- **1952.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss把Katharina 2的旧课本包上书皮，又在本子上签了名。Katharina 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Anton Weiss听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 44 -> 52; state_parameter raising-child.caregiverBurden 51 -> 48; mood 0.020000000000000018_

- **1952.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss把Berta 2的旧课本包上书皮，又在本子上签了名。Berta 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Anton Weiss听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 39 -> 47; state_parameter raising-child.caregiverBurden 54 -> 51; mood 0.020000000000000018_

- **1952.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss把Berta 2的旧课本包上书皮，又在本子上签了名。Berta 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Anton Weiss听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 33 -> 41; state_parameter raising-child.caregiverBurden 54 -> 51; mood 0.020000000000000018_

- **1952.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss把Mitzi Berg的旧课本包上书皮，又在本子上签了名。Mitzi Berg今年学会了自己系鞋带，也学会了在饭桌上说“不”；Anton Weiss听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 36 -> 44; state_parameter raising-child.caregiverBurden 54 -> 51; mood 0.020000000000000018_

- **1952.01** `agency:support_process` tags: agency, agency:support_process
  Anton Weiss为第二区夜班出租合作社在Leopoldstädter Zinshaus, gemeinsam出了力：整理名单、传递消息或替同伴作证，名字被记进参与记录。
  _effects: historical development:initiative-taxi:person-phase15-Rosa-world-vienna-1912-evt:world-vienna-1912:006663-1948 as supporter; historical_influence; reputation 0.015000000000000013_

- **1952.04** `vienna-market-debt.pawn-watch/pawn-chain-only` tags: market, debt, money, home, shop
  链子从你指缝里滑下去，落在绒布上几乎没有声音。掌柜说两克朗四十赫勒，你点了点头。出门时你把表掏出来上了几圈弦，它还在走，只是再没法挂在马甲上了。
  _effects: cash 2.4 (典当银表链所得); mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-148_

- **1952.08** `absurd15-stage.cast-the-king::ctx-vienna-postwar-1945::milieu-tenement/not-king-material` tags: performance, theatre, power, irony, work, pretend, vienna, urban
  Berta Lechner看了Anton Weiss的手，说这双手适合拿账本，不适合拿权杖。Anton Weiss回家路上买了一张最便宜的站票，在最后一排看完了整场戏；散场时，Anton Weiss记住的不是国王的台词，而是他坐下时椅子发出的声音。
  _effects: skill; mood -0.040000000000000036; cash -1 (买了一张站票（其中1克朗记入债务）); flag +cast_refused; relation acquaintance with person-materialized-world-vienna-1912-148_

- **1952.08** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Berta 2这周主动擦了黑板。Anton Weiss把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 36 -> 39; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:016785_

- **1952.09** `vienna-tenement-neighbors.lost_room_key/key_lost_landlady` tags: home, social, family, housing
  Anton Weiss把钥匙丢在了回家路上的有轨电车轨道旁，天黑也没找着。房东太太说换锁芯要一克朗五十赫勒，从下月房租里扣。Otto Weiss 2借给Anton Weiss一把旧挂锁，但锁鼻和门扣对不上，只能用铁丝拧着凑合。那夜Anton Weiss睡不踏实，总觉得有人在拧门。
  _effects: cash -1.5 (换锁芯费用（其中0.5克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-79; mood -0.06000000000000005_

- **1953.01** `office16-office.lose-the-chair::ctx-vienna-postwar-1945::milieu-tenement/kept-the-keys` tags: office, removal, loss, politics, power, transition, vienna, urban
  移交清单少了一把储藏室的钥匙。Anton Weiss没有提，Alois Hofer也没有问；三个月后，清洁工在储藏室发现两箱以Anton Weiss名义订阅的行业期刊，收件地址仍是这间办公室。
  _effects: position_end 放映员 @cinema:person-materialized-world-vienna-1912-4-evt:world-vienna-1912:008572; relation acquaintance with person-materialized-world-vienna-1912-15; flag +kept_office_keys; knowledge “储藏室有两箱以我的名义订阅的期刊，收件地址仍是这间办公室。”; mood 0.020000000000000018_

- **1953.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss被叫到学校，老师说Rosa 2这学期总在课上看窗外。回家的路上，Anton Weiss没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 57 -> 52; state_parameter raising-child.caregiverBurden 43 -> 48; cash -2 (extra lessons and replacement pencils（其中2克朗记入债务）); mood -0.030000000000000027_

- **1953.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss被叫到学校，老师说Ferdinand 2这学期总在课上看窗外。回家的路上，Anton Weiss没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 57 -> 52; state_parameter raising-child.caregiverBurden 43 -> 48; cash -2 (extra lessons and replacement pencils（其中2克朗记入债务）); mood -0.030000000000000027_

- **1953.01** `p9-work-jobsearch.negotiate-hours/negotiate-hours.half-day` tags: work, job_search, negotiation, wages, employment, task, hours, saturday
  工时表铺在柜台上，边角卷起。Anton Weiss指着星期六，第二区夜班出租合作社的手指在数字上敲了两下，说下午歇可以，工钱按日扣。礼拜六中午，他推门出来，街上的影子短得像另一来处。
  _effects: cash -2 (星期六下午工钱按日扣减（其中2克朗记入债务）); health 0.030000000000000027 (终于有半天空闲); mood 0.050000000000000044_

- **1953.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Ferdinand 2这周主动擦了黑板。Anton Weiss把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 52 -> 55; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:017797_

- **1953.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Katharina 2这周主动擦了黑板。Anton Weiss把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 52 -> 55; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:017810_

- **1953.04** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Mitzi Berg这周主动擦了黑板。Anton Weiss把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 44 -> 47; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:017477_

- **1953.08** `sm18-neighbor.night-light::ctx-vienna-postwar-1945::milieu-tenement/tells-the-concierge` tags: neighbor, secret, night, window, suspicion, everyday, vienna, urban
  Anton Weiss把这件事告诉了门房。第二天，整栋楼都在传Otto Weiss 2家藏了人，连菜贩都多问了一句。Otto Weiss 2在院子里遇见Anton Weiss，没有发火，只把手里那袋土豆换到另一只手，像在让路。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-79; reputation -0.010000000000000009; condition; mood -0.020000000000000018; flag +told_the_concierge_about_the_neighbor_

- **1953.09** `ad20-public-mistake::ctx-vienna-postwar-1945::milieu-tenement/everyone-saw` tags: public, mistake, shame, everyday, reputation, comic, vienna, urban
  Anton Weiss在街口绊了一下，手里的纸包散开，里面的纽扣滚了一地。有人笑，有人弯腰帮忙，一个孩子把纽扣含进嘴里又吐出来。Anton Weiss蹲在地上捡，越捡越觉得所有人都在看自己的后脑勺。
  _effects: state_add ad20-public-attention state:world-vienna-1912:1106; reputation -0.03999999999999998; mood -0.050000000000000044; flag +public_mistake; knowledge “纽扣滚了一地，整条街都看见了。”; flag +public_attention_active_

- **1953.11** `mb17-border.permit-window::ctx-vienna-postwar-1945::milieu-hospital/admitted-with-papers` tags: migration, border, papers, permit, station, official, belonging, vienna
  火车在清晨进站，Alois Hofer把Anton Weiss的护照翻到最后一页，又看了看那张没有照片的出生纸。蓝章落下去，手续费和住址登记表一起被推到窗口；Anton Weiss把临时居留纸折成四折，塞进内衣口袋，走出站门时天还没有完全亮。
  _effects: cash -2 (the passport fee and the first week's rent（其中2克朗记入债务）); state_add mb17-newcomer state:world-vienna-1912:1104; state_add mb17-remittance-web state:world-vienna-1912:1105; mood 0.030000000000000027; knowledge “临时居留纸要求在四十八小时内到区公所登记住址。”; flag +mb17_newcomer_active; flag -mb17_remittance_web_active; flag +mb17_remittance_web_active_

- **1954.01** `office16-admin.quiet-ledger::ctx-vienna-postwar-1945::milieu-tenement/small-surplus` tags: office, administration, budget, competence, quiet, power, vienna, urban
  账目连续第二年没有超支，Alois Hofer在报告里加了一句“未发现异常”。Anton Weiss用结余给夜班守卫换了炉子，又把旧账本按年份装进箱子；没有人写报道，但来办事的人发现窗口开得比从前早。
  _effects: organization_funds; reputation 0.06; skill; mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-15; flag +quiet_surplus; knowledge “审计报告里只有一句“未发现异常”，但窗口提前开门被办事的人记住了。”_

- **1954.01** `state_tick:mb17-newcomer/first-year/still-a-guest` tags: mb17-newcomer, migration, newcomer, language, network, housing, belonging, state
  Anton Weiss又搬了一次房，箱子里多了一把缺齿的梳子和一叠没寄出的信。新住处离电车线更远，邻居说德语很快；他只能点头，等对方走后再把门关上，把今天听错的词一个一个记在旧票据背面。
  _effects: state_parameter mb17-newcomer.language 18 -> 19; state_parameter mb17-newcomer.localNetwork 6 -> 4; state_parameter mb17-newcomer.housingStrain 65 -> 69; cash -1 (the move and a new rent deposit); mood -0.030000000000000027_

- **1954.01** `state_tick:ad20-public-attention/the-attention-cycle/cools` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  Anton Weiss发现最近没有人再提那件事。报纸换了头版，邻居也换了话题；本该轻松，Anton Weiss却在买菜时反复整理衣领，好像还在等一个不会来的目光。
  _effects: state_parameter ad20-public-attention.attention 65 -> 57; state_parameter ad20-public-attention.sympathy 30 -> 27; state_parameter ad20-public-attention.opportunity 15 -> 13; mood -0.010000000000000009_

- **1954.01** `agency:support_process` tags: agency, agency:support_process
  Anton Weiss想帮忙，但组织者不信任新来的人，只让其在外围等消息。
  _effects: mood -0.040000000000000036; reputation -0.010000000000000009_

- **1954.01** `state_reaction:mb17-newcomer/workplace-footing` tags: mb17-newcomer, migration, newcomer, language, network, housing, belonging, state
  工头让Anton Weiss把一箱零件搬到后间，又顺口教了他两个德语词。午休时，一个老工人把多余的汤推过来；Anton Weiss没有推回去，只把碗底最后一点喝干净，把空碗放回对方手边。
  _effects: state_parameter mb17-newcomer.localNetwork 4 -> 7; state_parameter mb17-newcomer.language 19 -> 20; mood 0.010000000000000009_
  _causes: evt:world-vienna-1912:018534_

- **1954.02** `vienna-housing-move.sublet-room/sublet-full` tags: housing, home, rent, family, money, household
  Anton Weiss把床上的旧褥子重新铺平，Friedrich Berg放下自己的铺盖卷，从怀里掏出一把钥匙看了看。厨房里多了一口人的碗，灶边的煤省着烧也够。Hermann Berg在门口看了一眼，没多话。
  _effects: cash 4 (出租空床收进的月租); household; relation acquaintance with person:evt:world-vienna-1912:001486:child_

- **1954.03** `vienna-historical-social-movement.district-list/hold-list-and-watch` tags: history, historical_process, social_movement, organization, politics
  楼梯间的灯泡忽明忽暗，Anton Weiss让Maria Lechner记下今晚进出院子的人。名单留在桌上没动，像一件没人认领的活。快到午夜，Maria Lechner只说了一句，明早再核一遍。
  _effects: mood -0.030000000000000027; flag +kept_district_list_private_

- **1954.06** `vienna-medical-treatment.toothache/dentist-pull` tags: health, medical, family, money
  诊室在二楼，楼梯间飘着石炭酸味。医生把钳子举到灯下看了看，叫Anton Weiss攥紧扶手。Grete Winter站在门边数墙上的价目表：拔牙两克朗五十赫勒，药棉五十赫勒，连消炎水另算。
  _effects: cash -3 (牙医拔牙费用); health 0.06 (拔除病牙解除疼痛); mood -0.030000000000000027_

- **1955.01** `mb17-diaspora.sunday-table::ctx-vienna-postwar-1945::milieu-tenement/gossip-follows-the-letter` tags: migration, diaspora, community, food, belonging, mutual_aid, vienna, urban
  有人把一封刚从故乡寄来的信读出声，读到“他在维也纳大概忘了家里”时，桌边的人都笑了。Anton Weiss也跟着笑，手却停在汤勺上；他想起自己上个月没有寄出的那张汇款单。
  _effects: state_parameter mb17-newcomer.localNetwork 7 -> 4; mood -0.040000000000000036; flag +mb17_diaspora_gossip_

- **1955.01** `vienna-parish-aid.soup-kitchen/soup-kitchen.help-wash` tags: faith, parish, mutual_aid, poverty, family
  Anton Weiss喝完汤没走，留下来帮修女把大锅刷净，又把木碗按大小摞好。厨房后头有半块面包和一碗剩汤，修女说是帮忙人的午饭。Josef Weiss 2在门口等着一起回去，说下回还来，洗锅的活总有人要干。
  _effects: food; skill; relation acquaintance with person-materialized-world-vienna-1912-115; mood 0.020000000000000018_

- **1955.01** `state_expire:ad20-public-attention` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  Anton Weiss的「被看见的日常」到期；相关安排结束。
  _effects: state_remove ad20-public-attention state:world-vienna-1912:1106; flag -public_attention_active_

- **1955.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss把Grete Berg的旧课本包上书皮，又在本子上签了名。Grete Berg今年学会了自己系鞋带，也学会了在饭桌上说“不”；Anton Weiss听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 18 -> 26; state_parameter raising-child.caregiverBurden 52 -> 49; mood 0.020000000000000018_

- **1955.01** `agency:support_process` tags: agency, agency:support_process
  Anton Weiss想帮忙，但组织者不信任新来的人，只让其在外围等消息。
  _effects: mood -0.040000000000000036; reputation -0.010000000000000009_

- **1955.01** `initiative:found_process:org-wednesday-psychological-society`
  Wiener Psychoanalytische Vereinigung在Berggasse 19, Wohnung und Ordination经过数年的招募、会议和互助，把分散的行动整理成公开纲领；这不是预先写好的历史，而是成员自己累积出来的运动。
  _effects: historical process Wiener Psychoanalytische Vereinigung的持续运动; historical development:initiative-org-wednesday-psychological-society-1955 as organizer; historical development:initiative-org-wednesday-psychological-society-1955 as organizer; historical development:initiative-org-wednesday-psychological-society-1955 as organizer; historical development:initiative-org-wednesday-psychological-society-1955 as organizer; historical development:initiative-org-wednesday-psychological-society-1955 as organizer; knowledge “Wiener Psychoanalytische Vereinigung的持续运动不是一次会议，而是我们这些年积累出来的”; reputation 0.040000000000000036_

- **1955.01** `historical_phase`
  历史进程《Wiener Psychoanalytische Vereinigung在Berggasse 19, Wohnung und Ordination经过数年的招募》从 emerging 进入 mobilizing。
  _effects: knowledge “我亲历或知晓「Wiener Psychoanalytische Vereinigung在Berggasse 19, Wo”; knowledge “我亲历或知晓「Wiener Psychoanalytische Vereinigung在Berggasse 19, Wo”; knowledge “我亲历或知晓「Wiener Psychoanalytische Vereinigung在Berggasse 19, Wo”; knowledge “我亲历或知晓「Wiener Psychoanalytische Vereinigung在Berggasse 19, Wo”; knowledge “我亲历或知晓「Wiener Psychoanalytische Vereinigung在Berggasse 19, Wo”_
  _causes: evt:world-vienna-1912:019312_

- **1955.03** `vienna-tenement-neighbors.laundry_line_dispute/compromise_split_line` tags: home, social, family, housing
  Anton Weiss把洗好的床单搭上院子里的公用晾衣绳，占了整条。Alois Hofer 2抱着一盆湿衣服下来，说自家孩子明天要穿干净衬衫上学。两人在绳子两头扯了一阵，最后Anton Weiss把床单对折，腾出一半，Alois Hofer 2用木夹子把衬衫一件件排上去。谁也没道歉，但第二天见面都点了头。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-141; mood 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-141_

- **1955.07** `state_reaction:mb17-newcomer/workplace-footing` tags: mb17-newcomer, migration, newcomer, language, network, housing, belonging, state
  工头让Anton Weiss把一箱零件搬到后间，又顺口教了他两个德语词。午休时，一个老工人把多余的汤推过来；Anton Weiss没有推回去，只把碗底最后一点喝干净，把空碗放回对方手边。
  _effects: state_parameter mb17-newcomer.localNetwork 4 -> 7; state_parameter mb17-newcomer.language 20 -> 21; mood 0.010000000000000009_
  _causes: evt:world-vienna-1912:018790_

- **1955.11** `ad20-rent-renewal::ctx-vienna-postwar-1945::milieu-tenement/sign-the-side-letter` tags: rent, housing, renewal, everyday, obligation, money, vienna, urban
  Berta Moser 2把正式租约放在桌上，又从口袋里摸出一张对折的纸，说这是“补充条款”。Anton Weiss看见上面写着若提前搬走，押金不退。Berta Moser 2说大家都这么签；Anton Weiss看了看窗外的院子，还是把名字写在最后一行。
  _effects: state_add ad20-private-bargain state:world-vienna-1912:1189; cash -1 (the renewal fee); flag +side_letter_signed; mood -0.020000000000000018; knowledge “补充条款写着提前搬走不退押金。”; relation acquaintance with person-materialized-world-vienna-1912-170; flag +private_bargain_active_

- **1956.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Berta Berg这周主动擦了黑板。Anton Weiss把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 44 -> 47; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:019428_

- **1956.01** `office16-hire.protege::ctx-vienna-postwar-1945::milieu-tenement/refused-by-committee` tags: office, hire, patronage, bureaucracy, work, power, vienna, urban
  编制委员会只用了十分钟就否掉了Helene 2的名字：预算冻结，岗位归并，连桌子都要搬去仓库。Anton Weiss把那张表折起来，答应明年再试。Helene 2说没关系，第二天去了另一家事务所面试。
  _effects: mood -0.040000000000000036; knowledge “编制委员会今年冻住了所有新增岗位。”_

- **1956.01** `state_tick:mb17-newcomer/first-year/still-a-guest` tags: mb17-newcomer, migration, newcomer, language, network, housing, belonging, state
  Anton Weiss又搬了一次房，箱子里多了一把缺齿的梳子和一叠没寄出的信。新住处离电车线更远，邻居说德语很快；他只能点头，等对方走后再把门关上，把今天听错的词一个一个记在旧票据背面。
  _effects: state_parameter mb17-newcomer.language 21 -> 22; state_parameter mb17-newcomer.localNetwork 7 -> 5; state_parameter mb17-newcomer.housingStrain 69 -> 73; cash -1 (the move and a new rent deposit)_

- **1956.01** `state_tick:ad20-private-bargain/the-favor-ages/kept` tags: ad20-private-bargain, private, bargain, favor, debt, trust, leverage, exit
  那笔私下的安排又过了一年。没有人提起，但Anton Weiss在街上遇见对方时，两个人都多停了一拍。Anton Weiss知道，沉默本身也是利息。
  _effects: state_parameter ad20-private-bargain.trust 45 -> 49; state_parameter ad20-private-bargain.debt 56 -> 54; state_parameter ad20-private-bargain.exit 25 -> 27; mood 0.010000000000000009_

- **1956.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss被叫到学校，老师说Berta Berg这学期总在课上看窗外。回家的路上，Anton Weiss没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 47 -> 42; state_parameter raising-child.caregiverBurden 36 -> 41; cash -2 (extra lessons and replacement pencils); mood -0.010000000000000009_

- **1956.01** `agency:support_process` tags: agency, agency:support_process
  Anton Weiss想帮忙，但组织者不信任新来的人，只让其在外围等消息。
  _effects: reputation -0.010000000000000009_

- **1956.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Grete Berg这周主动擦了黑板。Anton Weiss把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 26 -> 29; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:020102_

- **1956.05** `absurd15-stage.cast-the-king::ctx-vienna-postwar-1945::milieu-tenement/not-king-material` tags: performance, theatre, power, irony, work, pretend, vienna, urban
  Josef Weiss 2看了Anton Weiss的手，说这双手适合拿账本，不适合拿权杖。Anton Weiss回家路上买了一张最便宜的站票，在最后一排看完了整场戏；散场时，Anton Weiss记住的不是国王的台词，而是他坐下时椅子发出的声音。
  _effects: skill; mood -0.040000000000000036; cash -1 (买了一张站票)_

- **1956.05** `vienna-medical-treatment.night-fever/hospital-night` tags: health, medical, family, money
  护士把冰袋按在Anton Weiss额上，水顺着鬓角流进衣领。Lena坐在床脚，数着窗外渐渐亮起的铺面门板，说回去给炉子添块煤。隔壁床的老头整夜在喊一个女人的名字。
  _effects: cash -2 (医院急诊押金); health 0.08 (急诊观察和冰敷退烧); relation friend with person-phase15-Lena-world-vienna-1912_

- **1956.06** `state_reaction:ad20-private-bargain/a-debt-returns` tags: ad20-private-bargain, private, bargain, favor, debt, trust, leverage, exit
  新的债没有走正式渠道，而是被带进了同一间厨房。Anton Weiss在桌边听完数目，发现对方连还款日期都替自己算好了。
  _effects: state_parameter ad20-private-bargain.debt 50 -> 56; state_parameter ad20-private-bargain.leverage 40 -> 44; mood -0.010000000000000231_
  _causes: evt:world-vienna-1912:019567_

- **1956.08** `vienna-legacy-worklife.apprentice-wage/apprentice-wage.ask-master` tags: legacy, work, family, reform, ordinary_life
  掌柜的木尺敲了两下柜台，声音短促。Anton Weiss把问题又问了一遍，掌柜才说师兄是“老规矩进来的”。师兄这时转过身，笑了一下，笑得不太自然，说“没事，你问得对”。
  _effects: reputation -0.040000000000000036; relation colleague with person-materialized-world-vienna-1912-72; skill_

- **1957.01** `p9-gap-elderhood-daily.landlord-heat/p9-gap-elderhood-daily.landlord-heat.chimney` tags: elderhood, daily, pension, housing, care, heating, winter
  Maria Stein清了烟道，捅出一堆黑灰和碎瓦，屋里倒烟，呛得Anton Weiss咳了好一阵，才慢慢暖起来。Anton Weiss把攒下的一摞旧报纸捆好递过去，Maria Stein在围裙上擦擦手接住，说这纸好烧，谢了一声就下楼了。
  _effects: health 0.03 (烟道通了，屋里不再倒烟); condition; mood 0.040000000000000036_

- **1957.01** `state_tick:ad20-private-bargain/the-favor-ages/kept` tags: ad20-private-bargain, private, bargain, favor, debt, trust, leverage, exit
  那笔私下的安排又过了一年。没有人提起，但Anton Weiss在街上遇见对方时，两个人都多停了一拍。Anton Weiss知道，沉默本身也是利息。
  _effects: state_parameter ad20-private-bargain.trust 49 -> 53; state_parameter ad20-private-bargain.debt 54 -> 52; state_parameter ad20-private-bargain.exit 27 -> 29; mood 0.010000000000000009_

- **1957.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton Weiss被叫到学校，老师说Grete Berg这学期总在课上看窗外。回家的路上，Anton Weiss没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 29 -> 24; state_parameter raising-child.caregiverBurden 49 -> 54; cash -2 (extra lessons and replacement pencils); mood -0.030000000000000027_

- **1957.01** `agency:support_process` tags: agency, agency:support_process
  Anton Weiss想帮忙，但组织者不信任新来的人，只让其在外围等消息。
  _effects: mood -0.040000000000000036; reputation -0.010000000000000009_

- **1957.01** `state_reaction:mb17-newcomer/workplace-footing` tags: mb17-newcomer, migration, newcomer, language, network, housing, belonging, state
  工头让Anton Weiss把一箱零件搬到后间，又顺口教了他两个德语词。午休时，一个老工人把多余的汤推过来；Anton Weiss没有推回去，只把碗底最后一点喝干净，把空碗放回对方手边。
  _effects: state_parameter mb17-newcomer.localNetwork 5 -> 8; state_parameter mb17-newcomer.language 22 -> 23; mood 0.010000000000000009_
  _causes: evt:world-vienna-1912:020830_

- **1957.12** `kernel-health.chronic-pain::ctx-vienna-postwar-1945::milieu-tenement/pain-morphine-drops` tags: health, pain, elderhood, morphine, household, vienna, urban, postwar
  膝盖里的旧伤一到阴天就发作。Anton Weiss从药房买吗啡滴剂，先是十滴，后来半瓶；Ferdinand Weiss 2发现Anton Weiss把空瓶藏在花盆后面，数了数，一共十九只。滴管刻度磨得看不清，他把《圣经》挖空，藏了半瓶。瓶底沉着褐色药渣。
  _effects: cash -12 (morphine drops bought without a fresh prescription); condition; role; relation acquaintance with person-materialized-world-vienna-1912-71; knowledge “吗啡滴剂越用越多，空瓶可以藏在花盆后面；药房不会每次都问处方。”; relation acquaintance with person-materialized-world-vienna-1912-71_