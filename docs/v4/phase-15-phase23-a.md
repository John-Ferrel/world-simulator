# Phase 15 life dossier — phase23-a

Date: 2026-11-11T19:17:00.964Z  |  45 years  |  19022 events  |  302 named persons  |  153 alive  |  71 s

State facts: 5397 events, 2810 ticks, 1412 reactions, 33 transitions. Active 167, ended 1627. Positions 84.

Critique: **pass** — warn:high_repetition.

## Klara

Born 1912.01, died 1916.01 (age 4).
Education: none 0; occupation: none; roles: infant, child.

### State snapshot
- wish-power [person] (ended 1916.1: owner_died) parameters={"intensity":0.75,"fixation":0.66,"irony":0.3} links={} ticks=0

### 4 subject events

- **1913.10** `iw18-infancy.ceiling-shadows::ctx-vienna-1912::milieu-tenement/fever-behind-the-shadows` tags: infancy, night, wonder, gaslight, fear, family, vienna, urban
  后半夜Klara烧起来，额头烫得像炉盖。Josef Bauer把湿布叠成窄条，一遍遍擦孩子的手心；煤气灯的影子在墙上忽长忽短，Klara哭一阵停一阵。天快亮时，Josef Bauer抱着孩子去敲隔壁的门，借来一支体温计。
  _effects: health -0.02999999999999997 (an infant fever at night); condition; cash -1 (a borrowed thermometer and medicine); mood -0.039999999999999994; flag +infant_night_fever_

- **1914.01** `vienna-life-toddler-wrong-cradle/the-neighbour-is-mistaken` tags: infancy, family, rumour, identity, comic, drama
  Josef Bauer把被子摊在桌上，指着上面的补丁说这是外婆的针脚。Hermann Kral看了半天，承认自己认错了；Klara在旁边把一只木勺敲得咚咚响，像在给这场争论判案。
  _effects: mood 0.020000000000000004; skill_

- **1915.01** `vienna-life-child-family-legend/happy-legend` tags: childhood, family, secret, story
  Josef Bauer讲起自己小时候在乡下追一只白鹅，追到河边，鹅没追到，倒捡回一篮鸭蛋。Klara笑得从凳子上滑下来，Josef Bauer也跟着笑，说这个家不是只有欠账和葬礼。
  _effects: mood 0.04; mood 0.01999999999999999_

- **1916.01** `statistical_death/other` tags: death
  Klara在Leopoldstädter Zinshaus, gemeinsamer Gang突发急病，高热和虚弱持续了几天。医生没能给出明确诊断，Klara在一个夜里去世。Anna Bauer在场。
  _effects: death (急性疾病)_
## Mitzi

Born 1912.01, died 1919.01 (age 7).
Education: none 0; occupation: none; roles: infant, child.

### State snapshot
- wish-knowledge [person] (ended 1919.1: owner_died) parameters={"intensity":0.55,"fixation":0.5,"irony":0.3} links={} ticks=0
- p22-family-legend [person] (ended 1913.3: replaced_by:p22-family-legend) parameters={"warmth":68,"secrecy":24,"danger":8,"promise":65} links={} ticks=1
- p22-family-legend [person] (ended 1913.9: replaced_by:p22-family-legend) parameters={"warmth":65,"secrecy":50,"danger":10,"promise":40} links={} ticks=0
- p22-family-legend [person] (ended 1916.12: replaced_by:p22-family-legend) parameters={"warmth":62,"secrecy":66,"danger":25,"promise":57} links={} ticks=1
- p22-family-legend [person] (ended 1919.1: owner_died) parameters={"warmth":68,"secrecy":38,"danger":15,"promise":57} links={} ticks=1

### 21 subject events

- **1912.02** `vienna-life-birth-letter-from-the-dead/the-letter-is-real` tags: infancy, family, secret, letter, drama
  邮差把一封边角磨白的信塞进门缝，收信人是一个已经死了三年的名字。Alois Lechner把Mitzi放在膝上，拆开信，里面只有一句：“孩子像不像他？”Hermann Kral在门口探头，问是不是寄错了；Alois Lechner把信折回去，说“没有寄错”。
  _effects: flag +letter_from_dead_relative; knowledge “一封写给死去亲人的信问：孩子像不像他。”; mood -0.04_

- **1912.08** `p22-warm-fathers-letter::ctx-vienna-1912::milieu-tenement/the-recipe-arrives` tags: infancy, family, letter, uncle, warm, melancholy, memory, drama
  信是叔叔死前写的，在邮袋里压了两年才到。Alois Lechner拆开时先笑出声：里面没有遗言，只有一张李子饺子的做法和一个关于祖母的笨笑话。那天晚上，全家真的吃了饺子。
  _effects: state_add p22-family-legend state:world-vienna-1912:14; mood 0.039999999999999994; knowledge “家里有一封叔叔留下的信，里面写着李子饺子的做法。”_

- **1912.10** `p22-warm-naming-feast::ctx-vienna-1912::milieu-tenement/the-cake-falls` tags: infancy, family, feast, name, neighbor, warm, tender, drama
  蛋糕从桌边滑下去，Emil Weiss用围裙接住了，奶油还是蹭了一手，桌布上也留了一块白印。大家把没沾地的半边分着吃；Mitzi Lechner舔着手指说，这是最好吃的一次掉蛋糕。
  _effects: mood 0.05; relation acquaintance with person-alois-lechner; cash -2 (a feast cake); flag +cake_saved_

- **1913.01** `state_tick:p22-family-legend/the-story-changes-hands/a-detail-goes-missing` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，故事里最要紧的那件东西不见了：先是名字，后来是地点。Mitzi问起时，大人说“你记错了”；可柜子最底层那只空盒子，谁也没有扔，锁却换过了，钥匙也不见了。
  _effects: state_parameter p22-family-legend.secrecy 20 -> 24; state_parameter p22-family-legend.danger 5 -> 8; state_parameter p22-family-legend.warmth 70 -> 68; mood -0.01_

- **1913.02** `vienna-life-toddler-first-words/first-word-door` tags: infancy, family, first, comic
  门外有人上楼，Mitzi忽然指着门说：“爸爸。”Alois Lechner看了看空门口，没有纠正。那天晚上，孩子把家里每个人的名字都叫了一遍，叫错两个，却叫得很认真。
  _effects: skill; mood 0.02; flag +first_word_door_

- **1913.03** `vienna-infant-household.croup/cough-worsens` tags: infancy, health, family, home, injury
  药钱凑不齐，Rosa Lechner把旧披肩又裹紧一层。Mitzi的咳声从尖利变成发闷，Rosa Lechner数着面包筐里剩下的半块黑面包，没说话。
  _effects: health -0.09999999999999998 (咳嗽迁延未愈); food; mood -0.05_

- **1913.03** `p22-warm-anonymous-gifts::ctx-vienna-1912::milieu-tenement/a-parcel-of-coal` tags: infancy, family, gift, poverty, neighbor, warm, mystery, drama
  门口多了一小包煤，用旧报纸裹着，纸上没有字，还沾着一点面粉。Alois Lechner追到楼梯口，只看见一个穿灰外套的人拐过街角；那堆煤让屋里暖了整整一个星期。
  _effects: cash 3 (anonymous coal saved fuel money); health 0.020000000000000018 (a warmer room); mood 0.03; flag +anonymous_gift_coal; state_add p22-family-legend state:world-vienna-1912:27_

- **1913.09** `p22-strange-cradle-secret::ctx-vienna-1912::milieu-tenement/the-ticket-is-redeemed` tags: infancy, family, cradle, secret, inheritance, strange, dark, drama
  Rosa Lechner拿着当票去赎，取回一把银勺子，勺柄上刻着一个看不清的字母。回家后把勺子塞进Mitzi手里，说“用吧”；孩子敲着桌沿，勺子发出很轻的响声，像在回答什么。
  _effects: cash -5 (redeeming the pawn ticket); health 0.010000000000000009 (a silver spoon to cut the first teeth); state_add p22-family-legend state:world-vienna-1912:28; flag +spoon_returned_

- **1914.01** `vienna-life-toddler-wrong-cradle/the-swap-story-spreads` tags: infancy, family, rumour, identity, comic, drama
  三天后，整条楼道都在说这家的孩子“抱错了”。Alois Lechner抱着Mitzi去敲Emil Weiss的门，Emil Weiss不开，只在门里说“我也是听来的”。Mitzi在母亲怀里睡着了，口水把她的领口洇出一小片深色。
  _effects: flag +cradle_swap_rumour; relation rival with person-emil-weiss; mood -0.05_

- **1914.01** `state_tick:p22-family-legend/the-story-changes-hands/told-at-the-table` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，Mitzi家的故事在饭桌上换了新的讲法：多了一句笑话，少了一处哭声。听的人把汤匙放下，等下一句；讲故事的人却先去看窗子有没有关好，谁也没有先动筷子。
  _effects: state_parameter p22-family-legend.warmth 55 -> 58; state_parameter p22-family-legend.secrecy 60 -> 58; state_parameter p22-family-legend.promise 55 -> 57; mood 0.01_

- **1915.02** `vienna-life-child-family-legend/happy-legend` tags: childhood, family, secret, story
  Rosa Lechner讲起自己小时候在乡下追一只白鹅，追到河边，鹅没追到，倒捡回一篮鸭蛋。Mitzi笑得从凳子上滑下来，Rosa Lechner也跟着笑，说这个家不是只有欠账和葬礼。
  _effects: mood 0.04; mood 0.020000000000000018_

- **1915.02** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Mitzi家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 58 -> 62; state_parameter p22-family-legend.warmth 58 -> 60; mood 0.010000000000000002_
  _causes: evt:world-vienna-1912:000392_

- **1916.01** `vienna-life-child-first-friend/shared-toy` tags: childhood, friendship, family, comic
  Rosa在楼道里滚一只铁环，Mitzi站在门口看。Rosa把铁环推过来，说“你推一次，我推一次”。两个人从楼梯口推到院子里，铁环倒下的声音把午睡的大人吵醒了一排。
  _effects: relation friend with person-phase15-Rosa-world-vienna-1912; skill; mood 0.05_

- **1916.08** `p9-childhood-household.supper-bowl/caught-adding-ladle` tags: childhood, family, household, home, siblings, illness, neighbors
  锅盖还冒着气，Mitzi听见Alois Lechner去灶口添煤，勺子立刻伸进锅里，刮起粘在锅边的半个土豆。Alois Lechner回来时没坐下，只站在桌边看。Mitzi把勺子放回碗里，膝盖并紧，手心在桌沿上蹭出一层汗。
  _effects: mood -0.04000000000000001; relation kin with person-alois-lechner_

- **1916.08** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Mitzi家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 62 -> 66; state_parameter p22-family-legend.warmth 60 -> 62; mood 0.009999999999999995_
  _causes: evt:world-vienna-1912:000666_

- **1916.12** `p22-warm-night-move::ctx-klosterneuburg-rural-1912::milieu-tenement/the-cradle-goes-first` tags: childhood, family, move, neighbor, tenement, warm, bittersweet, drama
  搬家定在夜里，怕白天遇见旧房东。Berta Weiss在前面打灯，Rosa Lechner抱着摇篮，Mitzi抱着一只枕头跟在后面。新屋有一扇能看见院子的窗，孩子把枕头放在窗台上，说这是给月亮留的。
  _effects: mood 0.05; health 0.01 (a less crowded room); relation acquaintance with person-phase15-Mitzi-world-vienna-1912; cash -3 (moving at night); flag +moved_at_night; state_add p22-family-legend state:world-vienna-1912:36_

- **1917.01** `vienna-life-child-inherited-wish/the-child-wants-a-dog` tags: childhood, family, wish, grief, uncanny, drama
  Mitzi说那句话只是想要一只狗，而且要“会看门的、不咬人的、像外婆家那只一样”。Alois Lechner松了一口气，又有点失落；那天下午，两个人用旧毛线给一只并不存在的狗量了脖围。
  _effects: mood 0.04000000000000001; skill_

- **1917.01** `state_tick:p22-family-legend/the-story-changes-hands/told-at-the-table` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，Mitzi家的故事在饭桌上换了新的讲法：多了一句笑话，少了一处哭声。听的人把汤匙放下，等下一句；讲故事的人却先去看窗子有没有关好，谁也没有先动筷子。
  _effects: state_parameter p22-family-legend.warmth 65 -> 68; state_parameter p22-family-legend.secrecy 35 -> 33; state_parameter p22-family-legend.promise 55 -> 57; mood 0.010000000000000009_

- **1917.02** `kernel-child.first-school-day::ctx-klosterneuburg-rural-1912::milieu-tenement/edu-school-fees-keep-home` tags: childhood, school, enrolment, teacher, fees, rural, agriculture, small_town
  学费免了，可校服和课本还要三克朗。Alois Lechner在门口和Hermann Lechner说了很久，最后把Mitzi领回家，说等秋天卖了东西再来。Mitzi站在校门外，看别的孩子排队进教室，手里的石板一直没有打开。
  _effects: education none; cash -1 (school registration stamp); reputation -0.03; relation kin with person-alois-lechner; flag +kept_from_school_for_fees; relation acquaintance with person-materialized-world-vienna-1912-19_

- **1917.04** `p22-drama-inheritance-papers::ctx-klosterneuburg-rural-1912::milieu-tenement/the-papers-are-copied` tags: childhood, family, inheritance, papers, secret, official, dramatic, dark
  家里花钱要了一份副本。副本和原件一字不差，唯独少了一页；公证人说那一页本来就不存在。Mitzi在旁边数纸角，数来数去都是双数，只有那一份是单数。
  _effects: cash -8 (a certified copy); knowledge “继承文书的副本少了一页。”; flag +missing_page; state_parameter p22-family-legend.secrecy 33 -> 38_

- **1918.01** `p9-gap-childhood-chores.market-line/line-half-flour` tags: childhood, household, chores, school, task, daily, market, food
  面粉袋压在胸口，越抱越沉。Mitzi前面的大婶一直往后靠，Mitzi就把膝盖顶住对方的篮子，硬留出半步。买到半袋面粉后，Mitzi的鞋跟留在人堆里，找回来时鞋面全是泥。回家路上布袋换了两次肩，赤脚踩过石板时脚底发麻。
  _effects: food; skill_
## Josef

Born 1912.01, alive at 1957.
Education: apprenticeship 0; occupation: none; roles: infant, child, medicine_seeker, office:档案助理, separated, workhouse_inmate, husband, father, refugee, amateur_actor, epidemic_water_carrier, liberated_1945, tenant_organizer, housing_waitlist, movement_member, office:放映员, grave_visitor, godparent, neighbourhood_collector, odd_job_apprentice.

### State snapshot
- wish-craft [person] (active) parameters={"intensity":0.55,"fixation":0.5,"irony":0.3} links={} ticks=9
- apprenticeship-contract [person] (ended 1930.1: duration expired) parameters={"progress":53,"failures":1,"trade":"木工","paid":true} links={} ticks=4
- yf18-runaway-plan [person] (ended 1929.1: duration expired) parameters={"preparation":37,"suspicion":30,"resolve":38,"destination":"格拉茨","ticket":false} links={} ticks=2
- yf18-runaway-plan [person] (ended 1929.1: duration expired) parameters={"preparation":31,"suspicion":21,"resolve":53,"destination":"格拉茨","ticket":false} links={} ticks=3
- office-under-siege [person] (ended 1937.1: duration expired) parameters={"exposure":60,"support":45,"months":0,"cause":"scandal turned into publicity","positionId":"pos:zoo:person-materialized-world-vienna-1912-69-evt:world-vienna-1912:004194:档案助理:5126"} links={} ticks=1
- public-scandal [person] (ended 1937.1: replaced_by:known-affair) parameters={} links={} ticks=0
- known-affair [person] (ended 1939.1: replaced_by:public-scandal) parameters={"notoriety":60,"grief":0,"exposure":85,"discretion":15,"remarried":false,"origin":"exposed"} links={} ticks=1
- p22-wild-fortune [person] (ended 1940.1: duration expired) parameters={"height":49,"absurdity":60,"witnesses":81,"fragility":49} links={} ticks=2
- fame [person] (ended 1939.1: duration expired) parameters={"level":0.55,"notoriety":true} links={} ticks=1
- public-scandal [person] (ended 1941.1: duration expired) parameters={} links={} ticks=1
- p22-scandal-engine [person] (ended 1941.1: duration expired) parameters={"heat":54,"reach":47,"leverage":21,"shame":57} links={} ticks=2
- pl19-protected-scandal [person] (ended 1940.1: duration expired) parameters={"exposure":65,"protection":36,"leverage":22,"publicHeat":55} links={"protector":"Hedwig"} ticks=2
- office-under-siege [person] (ended 1942.1: duration expired) parameters={"exposure":40,"support":45,"months":0,"cause":"double invoiced paper","positionId":"pos:zoo:person-materialized-world-vienna-1912-69-evt:world-vienna-1912:004194:档案助理:5126"} links={} ticks=1
- debt-bondage [person] (ended 1943.1: replaced_by:debt-bondage) parameters={"debt":10,"creditor":"房东"} links={} ticks=0
- debt-bondage [person] (ended 1945.1: duration expired) parameters={"debt":10,"creditor":"婚礼供应商"} links={} ticks=2
- p22-scandal-engine [person] (ended 1945.1: duration expired) parameters={"heat":59,"reach":48,"leverage":30,"shame":52} links={} ticks=2
- ad20-public-attention [person] (ended 1948.1: duration expired) parameters={"attention":28,"sympathy":48,"danger":10,"opportunity":52} links={} ticks=3
- under-investigation [person] (ended 1950.1: duration expired) parameters={"progress":15,"charge":"逃税"} links={} ticks=1
- institution-purge [organization] (ended 1951.1: duration expired) parameters={"target":"未说明","intensity":0.35,"denunciations":3,"vacancies":1,"reviewOpen":true} links={} ticks=1
- p23-dangerous-secret [person] (ended 1955.1: duration expired) parameters={"exposure":36,"leverage":7,"bodies":0,"loyalty":43} links={} ticks=2
- oj18-odd-apprenticeship [person] (ended 1953.3: the projection booth apprenticeship ended in disgrace) parameters={"trust":14,"strangeKnowledge":18,"reliability":40,"nightsWorked":0,"post":"放映学徒"} links={} ticks=1
- blacklisted [person] (ended 1955.1: replaced_by:blacklisted) parameters={"reason":"私藏被禁新闻片","severity":0.55} links={} ticks=0
- blacklisted [person] (active) parameters={"reason":"罢工失败","severity":0.7} links={} ticks=0
- public-scandal [person] (ended 1955.1: replaced_by:public-scandal) parameters={} links={} ticks=0
- under-investigation [person] (ended 1957.1: duration expired) parameters={"progress":35,"charge":"政治集会"} links={} ticks=2
- public-scandal [person] (ended 1957.1: duration expired) parameters={} links={} ticks=1
- fm17-miracle-witness [person] (ended 1957.1: duration expired) parameters={"certainty":55,"attention":35,"obligation":10} links={} ticks=1
- oj18-odd-apprenticeship [person] (active) parameters={"trust":20,"strangeKnowledge":15,"reliability":45,"nightsWorked":0,"post":"街头摄影师"} links={} ticks=0

### 238 subject events

- **1913.07** `p22-warm-anonymous-gifts::ctx-vienna-1912::milieu-tenement/the-gifts-stop` tags: infancy, family, gift, poverty, neighbor, warm, mystery, drama
  家里四处打听以后，包裹不再来了。Josef的鞋已经顶脚，Josef Bauer把那只毛线小鞋拆开，添了线，重新织成一只手套；手套只有一只，另一只留给明年，虽然明年可能就不冷了。
  _effects: mood -0.03; cash 1 (the bootee was unravelled and reused); flag +gifts_stopped; condition_

- **1914.01** `vienna-life-birth-letter-from-the-dead/the-letter-is-real` tags: infancy, family, secret, letter, drama
  邮差把一封边角磨白的信塞进门缝，收信人是一个已经死了三年的名字。Josef Bauer把Josef放在膝上，拆开信，里面只有一句：“孩子像不像他？”Hermann Kral在门口探头，问是不是寄错了；Josef Bauer把信折回去，说“没有寄错”。
  _effects: flag +letter_from_dead_relative; knowledge “一封写给死去亲人的信问：孩子像不像他。”; mood -0.04000000000000001_

- **1915.02** `vienna-life-child-family-legend/lost-relative` tags: childhood, family, secret, story
  Josef Bauer在收拾箱子时翻出一张没有署名的照片，说那是家里一个“去了很远地方”的人。Josef问还回不回来，Josef Bauer把照片翻过去，说先把名字记住，别在饭桌上问。
  _effects: knowledge “家里有一张没有署名的照片，照片上的人去了很远的地方。”; flag +family_legend_photo; mood -0.01_

- **1916.01** `vienna-life-child-first-friend/stolen-marble` tags: childhood, friendship, family, comic
  Hedwig把Josef的玻璃弹珠藏进鞋里，被当场看见。Hedwig说只是“替你拿着”，Josef没有揭穿，也没有再拿出第二颗。两个人蹲在墙根，把一只蚂蚁看了很久，谁也没有先回家。
  _effects: skill; mood -0.01_

- **1916.02** `vienna-life-child-inherited-wish/the-dead-grandmothers-wish` tags: childhood, family, wish, grief, uncanny, drama
  Josef在饭桌上忽然说：“等我长大了，要把那间屋子买回来。”Josef Bauer的勺子停在半空，因为这句话是去世多年的外婆常说的，连“那间屋子”都指得一模一样。Josef说完就低头喝汤，好像只是随口。
  _effects: flag +inherited_wish_house; knowledge “孩子说要把“那间屋子”买回来，和去世的外婆说过的一模一样。”; mood -0.010000000000000009_

- **1916.02** `kernel-child.household-rules::ctx-klosterneuburg-rural-1912::milieu-tenement/edu-rules-hides-bread` tags: childhood, family, food, rules, everyday, rural, agriculture, small_town
  锅里只剩一层薄汤。Josef趁Josef Bauer去院里提水，掰下半个面包塞进嘴里，又把剩下的藏进围裙口袋。晚饭时Josef Bauer数了面包，没有骂，只把Josef的那份挪到自己盘边。夜里Josef听见灶台那边有轻轻的哭声。
  _effects: food; relation kin with person-josef-bauer; flag +hid_bread; mood -0.05_

- **1916.11** `p9-childhood-household.half-bed/slept-on-kitchen-bench` tags: childhood, family, household, home, siblings, illness, neighbors
  床上的被子全裹在Elisabeth Bauer身上，Josef拽了两下没拽动，索性抱着外套去了厨房。长凳短，Josef把膝盖蜷起来，后背贴住灶台，余温一会儿就散了。清早Josef Bauer进来生火，先看见一双脚露在长凳外，把自己的毯子搭上去，又往灶里添了把煤。
  _effects: relation kin with person-josef-bauer_

- **1916.11** `p22-comic-mistaken-child::ctx-klosterneuburg-rural-1912::milieu-tenement/the-cherries-under-the-stall` tags: childhood, family, market, neighbor, mistaken_identity, comic, tender, drama
  市场尽头，一个老太太抓住Josef的手腕，说“你可回来了”。Josef低头看见摊子底下露出两只鞋；真正的孩子正躲在那里吃樱桃，嘴边全是红的，手里还攥着老太太的篮子。
  _effects: mood 0.04; relation acquaintance with person-phase15-Josef-world-vienna-1912; flag +mistaken_for_grandson; cash 1 (a handful of cherries)_

- **1917.02** `iw18-school.bell-rope::ctx-klosterneuburg-rural-1912::milieu-tenement/the-teacher-rings-it` tags: childhood, school, bell, comic, play, injury, rural, agriculture
  Grete Stein没有让孩子再爬煤箱，而是把Josef抱起来，让孩子自己抓住铃绳。铃响时，Josef离地很高，能看见院子里所有孩子的头顶。Grete Stein放下孩子后，说“以后想摇铃就来找我”，Josef点头，手心还留着粗麻绳的印子。
  _effects: relation acquaintance with person-grete-stein; mood 0.04; flag +lifted_to_the_bell_

- **1918.01** `p9-gap-childhood-chores.laundry-help/laundry-bread-with-friend` tags: childhood, household, chores, school, task, daily, laundry, work
  Sigmund Freud家的孩子站在绳子另一头，Josef递夹子时故意慢半拍，两个人把床单拉得没有一道褶。收工后Sigmund Freud端出半包隔夜面包，掰开时掉了一桌屑。Josef把分到的那块用围裙兜住，回家路上闻着麦味，硬是没咬。
  _effects: food; relation acquaintance with person-sigmund-freud; skill; relation acquaintance with person-materialized-world-vienna-1912-19_

- **1918.02** `vienna-childhood-street.market-errand/errand-ok` tags: childhood, street, social, home
  市场里的菜摊一字排开，Josef把十五克鲁泽排在掌心，先买了土豆，又去盐摊上要了一小包。摊主用旧报纸把盐裹好，Josef把它塞进围裙内袋，土豆兜在身前。回家时Josef Bauer接过铜板一枚枚数，土豆一颗没少。
  _effects: food; cash -0.15 (市场花销); relation kin with person-josef-bauer_

- **1919.01** `p9-gap-childhood-chores.market-line/line-sold-out-potatoes` tags: childhood, household, chores, school, task, daily, market, food
  “卖完了。”三个字从窗口里传出来，Josef后面的队伍立刻散了一半。Josef没走，趴在窗台上看伙计扫面屑，直到人家挥手赶人。旁边摊子的土豆带着泥，Josef用围裙兜住，一枚一枚数铜板，回家报账时连找零都说清了。
  _effects: food; mood -0.03; skill; relation acquaintance with person-materialized-world-vienna-1912-26_

- **1919.02** `vienna-childhood-friends.courtyard-race/fell-on-wet-stones` tags: childhood, social, school, street
  Josef想从床单底下钻过去，脚下一滑，膝盖磕在石板棱上。Sigmund Freud听见哭声出来，先看了看伤口，又回去端水。手帕扎得很紧，Josef试着站起来，被Sigmund Freud按回台阶上。
  _effects: relation acquaintance with person-sigmund-freud_

- **1919.02** `vienna-childhood-street.cigarette-card/card-trade` tags: childhood, street, social, home
  烟草店门口的石阶上摆着一排烟画。Josef把三张皱巴巴的卡摊开，Anton挑了挑，从口袋里摸出一张皇帝像。交换完，Anton转身进了杂货铺，把皇帝像往柜台上一拍，换了一块糖。Josef站在门外，手里还留着卡片的油墨味。
  _effects: mood 0.04_

- **1920.01** `p9-gap-childhood-chores.laundry-help/laundry-bread-with-friend` tags: childhood, household, chores, school, task, daily, laundry, work
  两个孩子在院子两头跑，一个递，一个夹，床单在风里鼓起来。最后一条挂好，Berta Lechner从厨房拿出面包，先给了自家孩子，再掰一块给Josef。Josef把面包塞进围裙口袋，回家后放在家里人的碗边，说自己在外面吃过了。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-9; skill; relation acquaintance with person-materialized-world-vienna-1912-9; relation acquaintance with person-materialized-world-vienna-1912-6_

- **1920.06** `p9-childhood-household.fever-night/vinegar-compress` tags: childhood, family, household, home, siblings, illness, neighbors
  没有钱请医生，Josef Bauer把醋瓶拎到床边，拿两只碗轮换着兑水。Josef烧得嘴唇起皮，Josef Bauer用小勺喂了两口温水，又把冷布敷上去。鸡叫时热度退了一点，Josef睁开眼，看见Josef Bauer趴在床沿，手指还攥着湿布。
  _effects: health 0.03 (湿敷后退了烧); mood 0.019999999999999997; relation kin with person-josef-bauer_

- **1921.01** `p9-gap-childhood-chores.market-line/line-both-families` tags: childhood, household, chores, school, task, daily, market, food
  队伍拐弯时，Josef Bauer朝Josef招手。Josef挤过去，替两家把面包领出来，纸包用不同的绳结系住。家里人晚上解开绳结，先掂了掂份量，再问价钱；Josef把每一包的面包数、找零和欠的铜板都说了一遍，家里人听完才把两包分别收进柜子。
  _effects: food; relation acquaintance with person-josef-bauer; skill; relation acquaintance with person-materialized-world-vienna-1912-21_

- **1922.01** `p9-gap-childhood-chores.fetch-coal/coal-neighbor-speaks` tags: childhood, household, chores, school, task, daily, coal, errand
  “记我名下。”Helene Weiss说完，掌柜才把秤砣挪开。账本上多出两赫勒的利息，煤筐却只装了半下。Josef跟着Helene Weiss走出门，Helene Weiss低声嘱咐明天先把钱送来，别让掌柜再找到话头。
  _effects: cash -0.02 (赊账添的两赫勒利息); food; relation acquaintance with person-materialized-world-vienna-1912-10; relation acquaintance with person-materialized-world-vienna-1912-10_

- **1922.01** `vienna-childhood-street.cigarette-card/card-stolen` tags: childhood, street, social, home
  巷口有人跑过来，肩膀撞在Josef的胳膊上。烟画卡脱手，被风卷到路中间。Josef追了两步，鞋底在湿石板上打滑，手掌先着地。Elisabeth Winter从后面追上去，在拐角抓住那男孩的袖子，布条撕下来一截，人还是跑了。
  _effects: mood -0.08; relation friend with person:evt:world-vienna-1912:000335:child; condition_

- **1922.12** `p9-childhood-household.name-day-gift/passed-gift-to-younger` tags: childhood, family, household, home, siblings, illness, neighbors
  Josef把木马推给弟妹，说“这个给你”，自己翻开那本旧图画书。纸页发黄，角上留着别人的铅笔字。Josef Bauer问真的不要木马吗，Josef点头，眼睛没离开书页。此后几天，Josef一有空就翻那本书，连书脊都摸得发亮。
  _effects: relation kin with person-josef-bauer; mood 0.04; flag +likes_reading_

- **1923.01** `p9-gap-childhood-chores.laundry-help/laundry-dragged-docked-pay` tags: childhood, household, chores, school, task, daily, laundry, work
  “你看看这角。”Helene Winter把床单拎起来，煤渣簌簌往下掉。Josef伸手去拍，反而把灰按进布纹里。Helene Winter从工钱里数回两枚，只留一赫勒在Josef手心，让重洗那角。晚饭前Josef一直蹲在井台边，换了两盆水，指甲缝里全是黑泥。
  _effects: cash 0.01 (被扣后只剩一赫勒); mood -0.05; relation acquaintance with person-helene-winter; relation acquaintance with person-materialized-world-vienna-1912-12_

- **1924.01** `state_tick:wish-craft/craft-pressure/press-on` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_tick
  Josef又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.02; flag +wish:craft:pursuing_

- **1924.01** `p9-childhood-apprenticeship.ask-for-trial/trial-granted` tags: adolescence, work, apprenticeship, labour, training, family, task, task:work
  Maria Bauer没接地址，先看Josef的手。纸样堆在墙角，落着灰，Josef一张张抖开、按厚薄分摞，纸边把食指划出三道细口。午后Maria Bauer端来一碗扁豆汤和半块面包，又把一克朗二十赫勒压在秤砣下，说试工三天，干不满没有工钱。
  _effects: cash 1.2 (试工半日按小时折算的铜币); food; skill; relation acquaintance with person-materialized-world-vienna-1912-40; relation acquaintance with person-materialized-world-vienna-1912-40_

- **1924.05** `vienna-adolescence.workshop-apprentice/apprenticeship-rejected` tags: adolescence, school, work, family, social
  “太小，手也薄。”Buchdruckerei Winter & Söhne说完，把Josef推过的木板翻过来，指着上面一道啃痕。Josef Bauer把布包往肩上提了提，说打扰了。Josef在门口多站了一会儿，直到里面的刨子声把话头盖过去，才跟着Josef Bauer下楼。
  _effects: mood -0.08; reputation -0.05; relation kin with person-josef-bauer_

- **1925.03** `vienna-youth-threshold.night-class/borrow-notes-at-home` tags: adolescence, school, work, family, transition
  学费凑不出来，Josef就向同屋的学徒借笔记。晚上把灶台边的桌子擦干净，用铅笔头把讲义抄在旧账单背面，Franz Stein允他每两周交一次抄本抵作练习。抄到第三页时灯芯烧短了，字迹开始发颤。
  _effects: skill; relation acquaintance with person-materialized-world-vienna-1912-21; skill; mood 0.020000000000000004_

- **1926.01** `p9-childhood-youth-aspiration.join-a-club/joined-and-borrowed` tags: adolescence, education, aspiration, school, books, club, exam, task
  Josef跟着Hermann Winter走进印刷厂后面的屋子，交了十赫勒会费，在借书簿上按了手印。他挑了一本讲蒸汽机的册子，封面烫金已经磨掉；管理员说下月十赫勒要按时交，书才能续借。
  _effects: cash -0.1 (工人青年会月费); skill; relation friend with person-materialized-world-vienna-1912-17; flag +workers_youth_member; mood 0.04; relation acquaintance with person-materialized-world-vienna-1912-17_

- **1926.01** `r13-turn.exam-failure::ctx-vienna-reform-1930::milieu-tenement::reform-open-secondary/name-missing` tags: education, exam, failure, school, work, reform, medical, schooling
  补考那天，Josef在考场门口等到钟响，监考说名单上没有名字。Franz Stein跑去教务处，回来时手里只有一张转学建议。Josef去了印刷厂当学徒，师傅说铅字比字母好认，至少不会骗人。
  _effects: condition; flag +left_school_after_exam_failure; relation colleague with person-materialized-world-vienna-1912-21; education apprenticeship_

- **1926.02** `r15-work.master-takes-on::ctx-vienna-reform-1930::milieu-tenement/signed-contract` tags: work, craft, apprentice, trade, poverty, reform, medical, schooling
  Ferdinand Winter 3把学徒契约摊在桌上，指给Josef看期限、工钱和出师考试。Josef签了名，第二天站到刨床前，手指上多了第一道木刺。
  _effects: relation employer with person-materialized-world-vienna-1912-50; state_add apprenticeship-contract state:world-vienna-1912:124; relation acquaintance with person-materialized-world-vienna-1912-50; education apprenticeship; role_

- **1926.08** `yf18-runaway.bundle::ctx-vienna-reform-1930::milieu-tenement/hide-the-bundle` tags: runaway, escape, family, plan, night_train, reform, medical, schooling
  Josef把两件衬衫、一双袜子和小时候的洗礼证明卷进一块旧桌布，塞到床底下。Josef Bauer在厨房里数硬币，数了三遍都没有抬头；Josef躺在黑暗里，听见夜车从远处经过，铁轨的声音一直传到枕头下面。
  _effects: state_add yf18-runaway-plan state:world-vienna-1912:126; flag +yf18_bundle_hidden; mood 0.020000000000000004_

- **1927.01** `state_tick:apprenticeship-contract/workshop-year/mistake` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Josef废掉了一块料，师傅扣了工钱。晚饭时谁也没提这件事。
  _effects: state_parameter apprenticeship-contract.failures 0 -> 1; cash -1 (wasted material); mood -0.04000000000000001_

- **1927.01** `state_tick:yf18-runaway-plan/three-months-of-preparation/bundle-under-the-bed` tags: yf18-runaway-plan, escape, youth, plan, home, travel, risk, state
  Josef把包袱重新塞回床底，又在上面压了一双冬鞋。母亲进来换床单时，Josef站在门口，假装在看墙上的圣像；床单抖开的声音像一列很慢的火车，Josef数着它经过的每一节车厢。
  _effects: state_parameter yf18-runaway-plan.preparation 15 -> 19; state_parameter yf18-runaway-plan.suspicion 5 -> 11; mood -0.009999999999999995_

- **1927.01** `p9-childhood-youth-aspiration.ask-a-mentor/weekly-lesson` tags: adolescence, education, aspiration, school, books, club, exam, task
  Katharina Bauer 3把老花镜往鼻梁上推了推，让Josef用食指在字盘空位上比画。咖啡馆伙计来续水时，老人把字母表折起来，说下星期带旧字样本来看。
  _effects: skill; relation acquaintance with person-materialized-world-vienna-1912-36; flag +typesetting_mentor; mood 0.06; relation acquaintance with person-materialized-world-vienna-1912-36_

- **1927.02** `yf18-runaway.cousin-letter::ctx-vienna-reform-1930::milieu-tenement/show-the-letter-to-parent` tags: runaway, letter, cousin, work, plan, reform, medical, schooling
  Josef把信放在晚饭桌上。Josef Bauer读完，问格拉茨远不远，又说家里的房租下个月要涨；那晚谁也没有说行或不行，信被压在糖罐下面，第二天边角沾了咖啡。
  _effects: state_add yf18-runaway-plan state:world-vienna-1912:125; relation kin with person-josef-bauer; flag +yf18_family_knows_letter; mood -0.010000000000000002; flag +yf18_runaway_plan_active_

- **1927.02** `statistical_infection`
  Josef在Leopoldstädter Zinshaus, gemeinsamer Gang病倒了，肺炎让身体发热、虚弱，接下来的日子只能卧床。

- **1927.03** `statistical_illness_worsened`
  Josef的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1927.06** `statistical_illness_worsened`
  Josef的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1927.07** `r13-turn.school-leaving::ctx-vienna-reform-1930::milieu-tenement::reform-leaving-age/signed-apprenticeship` tags: education, school, work, family, transition, reform, medical, schooling
  毕业钟敲过三下，Rosa Winter把成绩单按在讲台上，说Josef还能再读一年，只要家里肯出四克朗。家里人在走廊里把学徒契约展开，纸角还带着面粉。Josef签了名，第二天就站到刨床前，手指上多了第一道木刺。
  _effects: cash -2 (毕业钟响过以后); flag +left_school_for_apprenticeship; education apprenticeship_

- **1927.08** `statistical_recovery`
  Josef熬过了这场肺炎，能坐起来喝一点汤，但身体还很虚。

- **1927.08** `yf18-dare.prater-slide::ctx-vienna-reform-1930::milieu-tenement/ride-in-the-dark` tags: dare, prater, fairground, comic, friendship, reform, medical, schooling
  普拉特的木滑道在闭园后还亮着一盏值班灯。Josef和Emil Winter从围栏底下钻进去，用一块麻袋垫着滑下来，木槽里的蜡味呛得人直笑。滑到底时，Rosa Winter提着灯站在出口，问他们要不要再买一张票。
  _effects: mood 0.05; cash -1 (a late ticket paid to the watchman); reputation -0.010000000000000002; relation friend with person:evt:world-vienna-1912:000337:child; flag +yf18_prater_stunt; relation acquaintance with person-materialized-world-vienna-1912-15_

- **1927.08** `state_reaction:yf18-runaway-plan/a-family-question` tags: yf18-runaway-plan, escape, youth, plan, home, travel, risk, state
  饭桌上又为房租吵起来。Josef把面包掰成很小的块，听见父亲说“这个家养不起闲人”；Josef没有回嘴，只在心里把格拉茨的地址又背了一遍。
  _effects: state_parameter yf18-runaway-plan.suspicion 20 -> 28; state_parameter yf18-runaway-plan.resolve 40 -> 38_
  _causes: evt:world-vienna-1912:002663_

- **1927.11** `yf18-apprentice.press-guard::ctx-vienna-reform-1930::milieu-tenement/call-the-inspector` tags: apprenticeship, work, danger, machine, injury, refusal, reform, medical
  Josef趁Wiener Psychoanalytische Vereinigung去喝咖啡，跑到街角的工厂检查所，把卸下来的护板指给Mitzi Weiss看。Mitzi Weiss第二天带着卷尺来了，在压印机旁边量了很久；Wiener Psychoanalytische Vereinigung陪着笑，等门一关，就把Josef的工具从案子上扫进了木箱。
  _effects: relation employer with person-sigmund-freud; reputation 0.03; state_parameter apprenticeship-contract.progress 10 -> 13; flag +yf18_reported_press; mood 0.03; relation acquaintance with person-materialized-world-vienna-1912-30; relation acquaintance with person-materialized-world-vienna-1912-52_

- **1927.11** `state_reaction:yf18-runaway-plan/a-family-question` tags: yf18-runaway-plan, escape, youth, plan, home, travel, risk, state
  饭桌上又为房租吵起来。Josef把面包掰成很小的块，听见父亲说“这个家养不起闲人”；Josef没有回嘴，只在心里把格拉茨的地址又背了一遍。
  _effects: state_parameter yf18-runaway-plan.suspicion 11 -> 19; state_parameter yf18-runaway-plan.resolve 55 -> 53_
  _causes: evt:world-vienna-1912:002661_

- **1928.01** `yf18-runaway.mother-bundle::ctx-vienna-reform-1930::milieu-tenement/tell-the-truth` tags: runaway, family, discovery, lie, plan, reform, medical, schooling
  Josef Bauer把包袱放在桌上，问Josef是不是打算走。Josef说是，又说不出为什么；Josef Bauer没有打，只把包袱里的衬衫一件件叠好，说格拉茨的冬天比维也纳冷。那天夜里，Josef听见Josef Bauer在厨房里数钱，数到很晚。
  _effects: state_parameter yf18-runaway-plan.suspicion 0 -> 20; state_parameter yf18-runaway-plan.resolve 35 -> 40; state_parameter yf18-runaway-plan.preparation 20 -> 25; relation kin with person-josef-bauer; flag +yf18_parent_knows_plan; mood -0.020000000000000004_

- **1928.01** `state_tick:apprenticeship-contract/workshop-year/learned` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Josef又学会了一道工序。师傅没有夸，只把下一块料推到面前。
  _effects: state_parameter apprenticeship-contract.progress 13 -> 33; skill; mood 0.020000000000000004_

- **1928.01** `state_tick:yf18-runaway-plan/three-months-of-preparation/route-memorised` tags: yf18-runaway-plan, escape, youth, plan, home, travel, risk, state
  Josef把去车站的路又走了一遍，记住了哪一段有煤气灯、哪一段住着巡夜的警察。回家后，Josef在旧日历背面画了一条线，标出换乘的站名；那条线短得可笑，却比课本上的任何地图都清楚。
  _effects: state_parameter yf18-runaway-plan.preparation 25 -> 37; state_parameter yf18-runaway-plan.suspicion 28 -> 30; mood 0.010000000000000002_

- **1928.01** `state_tick:yf18-runaway-plan/three-months-of-preparation/route-memorised` tags: yf18-runaway-plan, escape, youth, plan, home, travel, risk, state
  Josef把去车站的路又走了一遍，记住了哪一段有煤气灯、哪一段住着巡夜的警察。回家后，Josef在旧日历背面画了一条线，标出换乘的站名；那条线短得可笑，却比课本上的任何地图都清楚。
  _effects: state_parameter yf18-runaway-plan.preparation 19 -> 31; state_parameter yf18-runaway-plan.suspicion 19 -> 21; mood 0.010000000000000002_

- **1928.01** `state_tick:wish-craft/craft-pressure/press-on` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_tick
  Josef又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.020000000000000004_

- **1928.01** `r13-civ.learn-instrument::ctx-vienna-reform-1930::milieu-tenement/weekly-lessons` tags: culture, music, instrument, learning, craft, reform, medical, schooling
  Grete Lechner把一把旧小提琴放在Josef肩上，说先别拉，先听空弦。Josef练到指尖发红，Grete Lechner用铅笔在谱上圈出三个音，让下周再来。学费按周付，四克朗一个月。
  _effects: cash -4 (借来的琴弓); flag +took_violin_lessons; skill; relation colleague with person-materialized-world-vienna-1912-39; knowledge “the teacher marks the three notes to practise each week”; relation acquaintance with person-materialized-world-vienna-1912-39_

- **1928.03** `yf18-performance.choir-solo::ctx-vienna-reform-1930::milieu-tenement/finish-in-falsetto` tags: performance, choir, humiliation, school, voice, reform, medical, schooling
  教堂音乐会的独唱轮到Josef，第一句拉丁文还稳，唱到“荣耀”那个高音时，嗓子忽然劈了一下。Josef看见Josef Bauer在第三排低下头，Rosa Winter在风琴旁边打手势让继续；Josef用假声把剩下的两小节唱完，声音细得像一根线。
  _effects: reputation -0.019999999999999997; relation acquaintance with person-materialized-world-vienna-1912-15; flag +yf18_finished_solo; mood 0.009999999999999995_

- **1928.03** `state_reaction:wish-craft/craft-humiliation` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_reaction
  Josef把那句轻视记了很久。它没有变成一个决定，但也没有消失。
  _effects: mood -0.04; flag +wish:craft:wounded_
  _causes: evt:world-vienna-1912:003003_

- **1928.09** `r3-teen.first-move-away::ctx-vienna-reform-1930::milieu-tenement::reform-workers-dormitory/room-near-work` tags: housing, leaving_home, lodging, work, independence, reform, medical, schooling
  Josef在工厂后街租了一个床位，和两个车工合住。房东太太每天收一次煤钱，洗脸水要自己下楼打。第一夜，他听着隔壁的机器声睡着，梦里还在数工票上的尺寸。天没亮，隔壁的车工就敲门叫他一起上工。
  _effects: cash -3 (行李放在楼梯口); mood 0.04; flag +moved_to_lodging_near_work; relation colleague with person-anna-bauer; move place-wien-printshop-winter_

- **1928.10** `vienna-adolescence.brothers-torn-jacket/sew-it-yourself` tags: adolescence, school, work, family, social
  Josef在厨房找到一截粗线，颜色和外套差了一截。缝到一半，线打结，Josef用牙咬断，重新来。Josef Bauer坐在对面，没问外套的事，只把汤碗推过来，说“先吃”。Josef把最后一针打完，汤面已经结了一层薄皮。
  _effects: skill; food; relation kin with person-josef-bauer_

- **1929.01** `state_tick:apprenticeship-contract/workshop-year/learned` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Josef又学会了一道工序。师傅没有夸，只把下一块料推到面前。
  _effects: state_parameter apprenticeship-contract.progress 33 -> 53; skill; mood 0.020000000000000004_

- **1929.01** `state_expire:yf18-runaway-plan` tags: yf18-runaway-plan, escape, youth, plan, home, travel, risk, state
  Josef的「床底下的包袱」到期；相关安排结束。
  _effects: state_remove yf18-runaway-plan state:world-vienna-1912:125; flag -yf18_runaway_plan_active_

- **1929.01** `state_expire:yf18-runaway-plan` tags: yf18-runaway-plan, escape, youth, plan, home, travel, risk, state
  Josef的「床底下的包袱」到期；相关安排结束。
  _effects: state_remove yf18-runaway-plan state:world-vienna-1912:126_

- **1929.01** `p9-childhood-youth-aspiration.ask-a-mentor/asked-to-come-back-later` tags: adolescence, education, aspiration, school, books, club, exam, task
  Katharina Bauer 3看了看Josef抄的字母表，说大小不一，让他回去用直尺画格子重抄一遍，下个月再来。少年把纸折好，在咖啡馆门口站了一会儿，走回印刷厂时绕到排字房窗外看了很久。
  _effects: mood -0.03; skill; flag +mentor_pending_retry; relation acquaintance with person-materialized-world-vienna-1912-36_

- **1930.01** `state_expire:apprenticeship-contract` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick, state:apprenticeship-contract
  Josef的「学徒契约」到期；相关安排结束。
  _effects: state_remove apprenticeship-contract state:world-vienna-1912:124; role_

- **1930.01** `p9-work-jobsearch.railway-depot/railway-depot.eyesight-failed` tags: work, job_search, negotiation, wages, employment, task, railway, depot
  字牌贴在石灰墙上，最后两行他实在分不清。Friedrich Hofer用笔杆敲敲桌面，Hermann Lechner把名字写进另一本册子，说有缺再叫。Josef把证明一张张叠好，折边已经发软。
  _effects: mood -0.06; flag +seeking_work; relation acquaintance with person-materialized-world-vienna-1912-19; relation acquaintance with person-materialized-world-vienna-1912-2_

- **1930.02** `vienna-medical-treatment.night-fever/hospital-night` tags: health, medical, family, money
  电车在环城大道上哐当响，Maria Bauer攥着Josef的胳膊，怕人从座位上滑下去。急诊厅的煤气灯发黄，长椅上全是咳嗽声，押金窗口的铜盘递出两克朗，换来一张硬纸号牌。
  _effects: cash -2 (医院急诊押金); health 0.08 (急诊观察和冰敷退烧); relation friend with person-materialized-world-vienna-1912-40_

- **1930.02** `vienna-courtship-courtyard.family-table/leave-before-dessert` tags: adulthood, courtship, partner, social, family, partnership
  问到后来，Josef Bauer提起别家有个更稳当的差事。Luise Stein把餐巾往桌上一放，说吃好了，先走。两人在楼梯间站住，Luise Stein说不是Josef的错，可下次再来还得一样坐这张桌子；Josef心里松了一点，也知道这顿饭没吃完，事情并没有过去。
  _effects: relation partner with person-materialized-world-vienna-1912-71; relation kin with person-josef-bauer; mood 0.03; relation acquaintance with person-materialized-world-vienna-1912-71_

- **1930.02** `vienna-tenement-neighbors.laundry_line_dispute/compromise_split_line` tags: home, social, family, housing
  Josef把洗好的床单搭上院子里的公用晾衣绳，占了整条。Karl Kraus抱着一盆湿衣服下来，说自家孩子明天要穿干净衬衫上学。两人在绳子两头扯了一阵，最后Josef把床单对折，腾出一半，Karl Kraus用木夹子把衬衫一件件排上去。谁也没道歉，但第二天见面都点了头。
  _effects: relation acquaintance with person-karl-kraus; mood 0.020000000000000004_

- **1930.06** `vienna-market-household.soup-kitchen/soup-kitchen.sell` tags: home, market, food, social
  鞋匠敲后门问有没有热汤，Josef把剩下的半锅倒进他的罐子里，收下两个十字币。Gustav Winter提着空碗上来时，只看见Josef把硬币塞进围裙口袋。
  _effects: cash 2 (卖出半锅扁豆汤); food; relation acquaintance with person-materialized-world-vienna-1912-5; relation acquaintance with person-materialized-world-vienna-1912-5_

- **1930.07** `p10-work-career.first-position/p10-work-career.first-position.hired` tags: adulthood, work, career, wages, injury, pension, employment, first_job
  Josef把地址纸条递给门房，门房在招工簿上写下他的名字。试工两天，他跟着Franz Lechner 2给车床油箱上油，手指沾满黑油。Wiener Psychoanalytische Vereinigung在周末把他留下，说下周起按周发薪，先领八克朗，中午在厂里吃一顿。
  _effects: employment 机器厂上油工 @ org-wednesday-psychological-society; cash 8 (第一周工钱); skill; relation acquaintance with person-materialized-world-vienna-1912-42_

- **1930.12** `r2-rural.bee-swarm::ctx-klosterneuburg-rural-1912::milieu-tenement::reform-honey-coop/moved-the-bees-into-the-new-hive` tags: rural, bees, honey, craft, neighbor, agriculture, small_town, peace
  Wiener Psychoanalytische Vereinigung发下新式蜂箱，说统一收购蜂蜜。Josef把旧木箱里的蜂赶进新箱，蜂在箱口挤成一团。Hermann Kral说这箱子好，就是蜂还不认路。Josef被蜇了两下，没敢松手。
  _effects: cash 2 (屋檐下的蜂群); flag +joined_honey_coop; relation colleague with person-hermann-kral; organization_membership_

- **1931.01** `state_reaction:wish-craft/craft-humiliation` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_reaction
  Josef把那句轻视记了很久。它没有变成一个决定，但也没有消失。
  _effects: mood -0.1_
  _causes: evt:world-vienna-1912:003784_

- **1931.01** `p9-social-daily-culture.cafe-newspaper/p9-social-daily-culture.cafe-newspaper.give-seat` tags: daily, culture, leisure, cafe, music, walk, task, task:daily
  Josef只喝了半杯就看见门口站着等位的老主顾，手里转着帽子。Josef把报纸叠好放回木架，起身让出窗边的位子，一杯 Melange 三十赫勒，侍者点头致意，没再收第二杯的钱。走出门时雨小了些，Josef站在檐下理了理衣领，觉得这半个下午也不算白来。
  _effects: cash -0.3 (一杯 Melange 的价钱); reputation 0.03; mood 0.02; relation acquaintance with person-materialized-world-vienna-1912-64_

- **1931.04** `vienna-parish-aid.soup-kitchen/soup-kitchen.take-and-carry` tags: faith, parish, mutual_aid, poverty, family
  汤是豆子熬的，表面浮着几粒油星，气味把整条巷子都占了。Hermann Kral排在前面，回头替Josef看着位置，嘴里数着还剩几个人。铁罐递过去时烫手，Josef用围裙角垫着。
  _effects: food; relation acquaintance with person-hermann-kral; mood 0.03_

- **1931.09** `vienna-tenement-neighbors.shared_stove_fire/fire_burns_curtain` tags: home, social, family, housing
  Josef在公用灶台上热猪油，油星子溅到旁边晾着的床单上，火苗顺着床单爬上木隔板。Berta Lechner拎起水桶泼过去，火灭了，但床单烧掉半幅，隔板熏黑一片。房东扣了那户人家两克朗押金，那家的女人在楼道里哭了一下午。
  _effects: cash -2 (赔给房东的隔板熏黑损失); relation acquaintance with person-materialized-world-vienna-1912-9_

- **1932.01** `vienna-life-depression/laid-off` tags: adulthood, depression, work, unemployment
  厂里把一张短工名单贴在厂门口。Josef的名字在第三行，旁边写着“下周等通知”。等到月底，通知没有来，工票也停了。
  _effects: unemployment (laid off in the depression); cash -5 (lost wages); condition_

- **1932.01** `state_tick:wish-craft/craft-pressure/press-on` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_tick
  Josef又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.02_

- **1932.01** `kernel-civic.petition-drive::ctx-klosterneuburg-rural-1912::milieu-tenement/civic-petition-refused` tags: politics, petition, reform, neighbor, organization, rural, agriculture, small_town
  他把签名纸送到市政厅，Anna Stein 2说格式不对，要按街道分开。他回去重抄，发现有几个名字已经认不出；再去时，窗口换了一个人，说前一班没有交接。他坐在市政厅台阶上重抄，风把纸吹到花坛里。
  _effects: flag +petition_refused; reputation 0.02; relation acquaintance with person-materialized-world-vienna-1912-43; cash -0.5 (重抄签名纸的纸笔钱); knowledge “请愿书要按街道分页，窗口换班时前一班可能没有交接”; relation acquaintance with person-materialized-world-vienna-1912-43_

- **1932.02** `ml18-luck.strongbox-in-the-wall::ctx-klosterneuburg-rural-1912::milieu-tenement/the-inflation-ate-them` tags: money, luck, housing, windfall, inflation, ownership, rural, agriculture
  铁盒里的纸币已经作废，银扣也只值几个铜板。Franz Lechner 2把纸币一张张摊在窗台上，说战前的纸现在只能糊墙；Karl Kraus笑得直不起腰，说这盒子在他家墙里藏了二十年，原来是一堆废纸。Josef把当票收好，去当铺换回一只银勺，勺柄上刻着外祖母的姓。
  _effects: cash 2 (the silver spoon redeemed with the old pawn ticket); relation acquaintance with person-karl-kraus; flag +worthless_strongbox; knowledge “墙里的旧纸币已经作废，当票还能换回一只银勺。”; mood -0.02_

- **1932.02** `r15-ordinary.quiet-year::ctx-vienna-reform-1930::milieu-tenement/small-good-day` tags: ordinary, daily, family, leisure, peace, reform, medical, schooling
  这一年没有发生什么大事。Josef把窗台擦干净，邻居送来一把樱桃，孩子在走廊里跑来跑去。晚上熄灯前，Josef想起一件很久以前的事，笑了一下。
  _effects: food; mood 0.04000000000000001; flag +ordinary_good_year_

- **1932.07** `r2-leisure.football-match::ctx-vienna-reform-1930::milieu-tenement/missed-the-penalty` tags: leisure, football, sport, crowd, violence, reform, medical, schooling
  终场前两分钟，Anna Stein 2指向点球点。Josef把球放在泥里，往后退了七步。Anna Bauer在看台上喊别用力，可Josef还是抽了一脚，球飞过横梁，落进土豆地。Josef Berg把帽子摔在地上，又捡起来，拍了拍泥。
  _effects: mood -0.15; flag +missed_penalty_in_mud; skill; relation rival with person-materialized-world-vienna-1912-24; relation acquaintance with person-anna-bauer; relation acquaintance with person-materialized-world-vienna-1912-24; relation acquaintance with person-materialized-world-vienna-1912-76_

- **1932.08** `r1-civ.suffrage-tea-room::ctx-vienna-reform-1930::milieu-tenement::r1-civ.suffrage-tea-room-reform/reform-partial-franchise` tags: politics, suffrage, petition, women, meeting, reform, medical, schooling
  市议会通过了一条折中条款：寡妇和独立纳税的女工可以投票，住在家里的女佣不行。Grete Winter把报纸读了三遍，说这不是胜利；Rosa Winter说先让能投的人去投。Josef把条款抄在请愿书背面，抄到“住在家里的”几个字时，笔停住了。
  _effects: reputation 0.039999999999999994; flag +partial_women_franchise_passed; relation colleague with person-materialized-world-vienna-1912-2; knowledge “the council split the franchise between ratepaying women and”_

- **1932.09** `vienna-medical-treatment.toothache/barber-pull` tags: health, medical, family, money
  Hermann Winter在门口替Josef捏着帽子，听见里面一声闷哼。弗朗茨把牙扔进搪瓷盘，说瞧这牙根都黑了。收钱时他多要了二十赫勒，算明矾水的钱，说下次别再拖成这样。
  _effects: cash -1.2 (理发师拔牙收费); health 0.029999999999999992 (病牙被拔除但手法粗糙); mood -0.02_

- **1933.01** `vienna-tenement-neighbors.laundry_line_dispute/compromise_split_line` tags: home, social, family, housing
  Josef把洗好的床单搭上院子里的公用晾衣绳，占了整条。Berta Lechner抱着一盆湿衣服下来，说自家孩子明天要穿干净衬衫上学。两人在绳子两头扯了一阵，最后Josef把床单对折，腾出一半，Berta Lechner用木夹子把衬衫一件件排上去。谁也没道歉，但第二天见面都点了头。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-9; mood 0.02_
  _causes: evt:world-vienna-1912:004234_

- **1933.01** `vienna-life-injury-recovery/clinic-treatment` tags: health, work, family
  Josef在受伤后的第三天去了诊所。医生清洗伤口、换药，收下诊费，嘱咐不要急着回机器旁。Josef把药方折好，回家路上买了纱布。
  _effects: health 0.05 (wound treatment); cash -8 (clinic and bandages); condition_
  _causes: evt:world-vienna-1912:004458_

- **1933.01** `kernel-health.task-pharmacy-hunt::ctx-vienna-reform-1930::milieu-tenement/pharmacy-aspirin-substitute` tags: health, task, pharmacy, shortage, black_market, reform, medical, schooling
  药房说没有货，Josef把处方叠好，去了下一家。天黑时手里只有一包阿司匹林和一瓶咳嗽糖浆；Otto Winter说总比空手强，把糖浆让给了孩子。回家后他把阿司匹林分成两半，糖浆瓶口用纸塞着，漏了一点。
  _effects: cash -8 (aspirin and cough syrup after a day of searching); health -0.03 (the prescribed medicine was not found); condition; role; relation acquaintance with person-otto-winter_

- **1933.03** `vienna-historical-social-movement.relief-network/allocate-by-need` tags: history, historical_process, social_movement, organization, politics
  Maria Kral说三号院的老太太咳得直不起腰，Josef把一个木箱底的碎煤单独拢出来，用报纸包好。借条上写的是两千克朗，其实只值几赫勒的煤，但手印按得很重。
  _effects: food; relation acquaintance with person-maria-kral; mood 0.04_

- **1933.03** `vienna-tenement-neighbors.shared_stove_fire/fire_scald_hand` tags: home, social, family, housing
  Josef在合租房走廊的公用灶台上煮土豆，转身取盐时袖子扫翻了铁锅，滚水浇在左手背上。Helene Kral从隔壁冲出来，扯下自己的围裙裹住烫伤处，又跑下楼叫来住在二楼的接生婆。接生婆用蛋清和旧亚麻布包扎，嘱咐三天不能沾水。
  _effects: relation friend with person-materialized-world-vienna-1912-16; relation acquaintance with person-materialized-world-vienna-1912-16_

- **1933.12** `p9-gap-adult-ordinary-day.wash-day/wash-day.listen-gossip` tags: adulthood, daily, leisure, neighborhood, ordinary, laundry, neighbor, household
  院子里孩子们从湿石板之间跳过去，把晾衣绳碰得一晃。Hedwig说到一半，被自家孩子喊回去添柴。Josef乘机把最后一只木夹子夹好，端起木盆，盆底的水滴了一路。
  _effects: mood 0.010000000000000002; relation acquaintance with person-phase15-Hedwig-world-vienna-1912_

- **1934.01** `agency:attend_meeting` tags: agency, agency:attend_meeting
  Josef走到Berggasse 19, Wohnung und Ordination门口，看见便衣和拥挤的人群，最终没有进去。
  _effects: mood -0.039999999999999994_

- **1934.10** `r3-crime.vagrancy-arrest::ctx-vienna-authoritarian-1934::milieu-tenement::benches-and-stations/sent-to-the-workhouse` tags: crime, police, poverty, workhouse, homelessness, vienna, urban, crisis
  Emil Stein说拘留室满了，把Josef送上了一辆去乡下的卡车。车上还有三个人，谁也不说话。Josef被分到甜菜地，晚上睡在谷仓，工钱直接记在拘留所的账上。Anton Weiss后来告诉Josef的妹妹，说“他去外地找活了”。
  _effects: condition; flag +sent_to_the_workhouse; role; knowledge “workhouse wages are credited to the police station”; relation acquaintance with person-materialized-world-vienna-1912-44; relation acquaintance with person-materialized-world-vienna-1912-91; relation acquaintance with person-materialized-world-vienna-1912-60_

- **1934.11** `p9-social-family-conflict-care.sibling-medicine-bill/split-per-head` tags: family, care, siblings, inheritance, housing, money
  Josef把旧练习本翻到空白一页，写下母亲、自己和Anna Bauer的名字。十四克朗的药费单，Josef和Anna Bauer各摊五克朗，余下四克朗从母亲的养老金里扣；Josef把五克朗硬币一枚枚摞在桌沿，Anna Bauer盯着那一栏看了半天，也从围裙口袋里摸出钱来。
  _effects: cash -5 (分摊母亲药费中自己的一份（其中5克朗记入债务）); relation kin with person-anna-bauer_

- **1934.12** `vienna-tenement-neighbors.lost_room_key/key_found_by_neighbor` tags: home, social, family, housing
  Josef傍晚从面粉厂下工回来，发现挂在腰带上的房门钥匙不见了，在楼梯间来回找了四趟。Grete Winter在二楼拐角的煤堆旁捡到那把铜钥匙，钥匙上缠着红线，一眼就认出来。Grete Winter敲开Josef的门，把钥匙拍在桌上，说自己眼神好使。
  _effects: relation friend with person-materialized-world-vienna-1912-2; mood 0.05_

- **1935.01** `vienna-tenement-neighbors.laundry_line_dispute/neighbor_yanks_clothes` tags: home, social, family, housing
  Helene Kral嫌Josef的床单滴水滴到Helene Kral家衬衫上，一把扯下床单扔在院子的石板上。Josef下楼捡起来时，床单角沾了泥，重洗又要费肥皂。两人在院子当中对喊，楼上有人推开窗看热闹。Josef把床单重新搭上绳子时，故意把水拧在Helene Kral那侧。
  _effects: relation rival with person-materialized-world-vienna-1912-16; cash -0.15 (重洗床单的肥皂钱)_
  _causes: evt:world-vienna-1912:005190_

- **1935.01** `vienna-family-divorce/partner-moves-to-shared-housing` tags: family, marriage, divorce, housing, lifecycle, separation, household
  Luise Stein把一只箱子和工票搬去合租房，带走一半锅碗。Josef留在Leopoldstädter Zinshaus, gemeinsamer Gang，把空出来的床租给一个学徒，用租金补房租；搬家花掉四克朗，Josef在户籍上成了分居的人，夜里听见隔壁床板响，总要愣一下。
  _effects: relation_end partner with person-materialized-world-vienna-1912-71; household; cash -4 (moving and separate goods（其中4克朗记入债务）); mood -0.06; role_

- **1935.01** `r13-work.practice-craft::ctx-vienna-authoritarian-1934::milieu-tenement/split-good-wood` tags: work, craft, practice, wood, skill, vienna, urban, crisis
  Josef练到半夜，刨刃吃得太深，一块好料从中间裂开。木料钱要从下周的菜钱里出，Friedrich Hofer听见响声，隔着墙问是不是在劈柴。Josef把裂开的板子翻过来，看见木纹里有一道旧钉眼，才明白这块料本来就不该用。
  _effects: cash -2 (第四十个榫头（其中2克朗记入债务）); mood -0.08; flag +work13_split_good_wood; skill_

- **1935.03** `vienna-legacy-worklife.hours-ledger/hours-ledger.read-for-others` tags: legacy, work, family, reform, ordinary_life
  铅笔头短得捏不住，Josef把它夹在两指之间，在表格背面写下两个名字。被漏掉的人一个叫扬，一个叫弗兰茨，都是每天清早从火车站走来的临时工。工头看了一眼背面，没说话，把表贴回墙上。
  _effects: skill; relation colleague with person-materialized-world-vienna-1912-68; reputation 0.04000000000000001; relation acquaintance with person-materialized-world-vienna-1912-68_

- **1935.09** `vienna-medical-treatment.toothache/dentist-pull` tags: health, medical, family, money
  诊室在二楼，楼梯间飘着石炭酸味。医生把钳子举到灯下看了看，叫Josef攥紧扶手。Luise Kral站在门边数墙上的价目表：拔牙两克朗五十赫勒，药棉五十赫勒，连消炎水另算。
  _effects: cash -3 (牙医拔牙费用); health 0.05999999999999999 (拔除病牙解除疼痛); mood -0.03_

- **1935.09** `p9-gap-adult-ordinary-day.wash-day/wash-day.listen-gossip` tags: adulthood, daily, leisure, neighborhood, ordinary, laundry, neighbor, household
  院子里孩子们从湿石板之间跳过去，把晾衣绳碰得一晃。Ferdinand Bauer说到一半，被自家孩子喊回去添柴。Josef乘机把最后一只木夹子夹好，端起木盆，盆底的水滴了一路。
  _effects: mood 0.010000000000000009; relation acquaintance with person-materialized-world-vienna-1912-31; relation acquaintance with person-materialized-world-vienna-1912-31; relation acquaintance with person-materialized-world-vienna-1912-54_

- **1936.01** `office16-scandal.public-hearing::ctx-vienna-authoritarian-1934::milieu-tenement/the-scandal-helps` tags: office, scandal, media, reputation, politics, power, vienna, urban
  照片登出后，Josef收到十七封邀请函，都是请去讲“如何面对舆论”。一个工商业协会送来一笔“研究资助”，请Josef去讲一次闭门课；课酬刚好补上办公室这个月的缺口。
  _effects: reputation 0.05; organization_funds; state_add office-under-siege state:world-vienna-1912:534; flag +scandal_turned_into_speaking_fee; knowledge “十七封邀请函里，有十二封问的是同一件事：能不能把丑闻讲成经验。”; mood 0.04000000000000001; flag +office_under_siege_

- **1936.01** `state_tick:wish-craft/craft-pressure/put-away` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_tick
  Josef暂时把那件事收进抽屉；日子还有别的东西要应付。
  _effects: mood -0.01999999999999999_

- **1936.01** `agency:attend_meeting` tags: agency, agency:attend_meeting
  Josef走到Arbeiter-Zeitung im Vorwärts-Haus门口，看见便衣和拥挤的人群，最终没有进去。
  _effects: mood -0.04000000000000001; reputation -0.009999999999999995_

- **1936.07** `hs18-radio.crystal::ctx-vienna-authoritarian-1934::milieu-tenement/charge-pennies` tags: radio, neighbor, comic, daily, media, shortage, vienna, urban
  Josef把矿石收音机放在窗台上，邻居们自带小板凳，挤得屋里没有下脚处。有人往桌上放两枚铜币，有人带半块糖。Luise Huber说这比电影院便宜；话音刚落，天线碰到铁栏，声音又没了。
  _effects: cash 2 (neighbors paid a few coins to listen); relation friend with person-materialized-world-vienna-1912-68; reputation 0.020000000000000004; skill_

- **1937.01** `vienna-life-injury-recovery/clinic-treatment` tags: health, work, family
  Josef在受伤后的第三天去了诊所。医生清洗伤口、换药，收下诊费，嘱咐不要急着回机器旁。Josef把药方折好，回家路上买了纱布。
  _effects: health 0.05000000000000002 (wound treatment); cash -8 (clinic and bandages)_
  _causes: evt:world-vienna-1912:004057_

- **1937.01** `p23-wedding-dress::ctx-vienna-authoritarian-1934::milieu-tenement/she-wears-it-to-another-wedding` tags: love, desire, obsession, stalker, wedding, fear, high_drama, vienna
  Josef把裙子穿去了Luise Winter表妹的婚礼。席间有人问是谁裁的，Josef说是旧货店；话没说完，Otto Winter从邻桌站起来，说领口的针脚是自己缝的。音乐还在响，Luise Winter的叉子停在盘子上，整个大厅忽然安静得能听见冰化开的声音。
  _effects: state_add public-scandal state:world-vienna-1912:578; state_add known-affair state:world-vienna-1912:579; relation rival with person-otto-winter; reputation -0.039999999999999994; mood -0.04000000000000001; flag +dress_worn; flag +known_affair_active_

- **1937.01** `vienna-family-fatherhood/child-born-at-home` tags: family, childbirth, death, lifecycle, birth, injury, state, state:raising-child
  Luise Winter在Leopoldstädter Zinshaus, gemeinsamer Gang生下一个孩子，取名Mitzi Bauer。Josef在厨房和走廊之间来回，接生的人让烧水、拿布、付六克朗；孩子天亮后睡着了，Josef从此在户籍表上多了“父亲”一栏，手背上还留着烫水壶的红印。
  _effects: birth female; health -0.08000000000000002 (childbirth); cash -6 (midwife fee); role; state_add raising-child state:world-vienna-1912:580_

- **1937.01** `p22-love-letter-serial::ctx-vienna-authoritarian-1934::milieu-tenement/the-city-reads-between-the-lines` tags: love_letter, newspaper, serial, romance, scandal, fame, secrecy, editor
  一封没有署名的情书被报社买下，连载了整整一个月。全城都在猜收信人是谁；Josef每天买两份报纸，一份剪下来，一份留着不拆。Luise Winter在第七期之后走进编辑部，说再写下去，家里就要先读到结局了。报纸销量涨了三倍，两个人却开始从后门进出。
  _effects: state_add p22-wild-fortune state:world-vienna-1912:581; state_add fame state:world-vienna-1912:582; cash 5 (the newspaper paid for the letters); reputation 0.04999999999999999; relation acquaintance with person-materialized-world-vienna-1912-30; flag +love_letter_serial; mood 0.04000000000000001; relation acquaintance with person-materialized-world-vienna-1912-28; flag +wild_fortune_active_

- **1937.01** `state_reaction:fame/scandal` tags: fame, reputation, media, status, state, state_reaction, love_letter, newspaper
  Josef的名字出现在报纸上，但这次不是在文化版。街角的报童把那一版折到最上面。
  _effects: reputation -0.08; state_parameter fame.notoriety false -> true_
  _causes: evt:world-vienna-1912:006684_

- **1937.01** `state_expire:office-under-siege` tags: office-under-siege, office, scandal, pressure, politics, legal, risk, state
  Josef的「职位受围」到期；相关安排结束。
  _effects: state_remove office-under-siege state:world-vienna-1912:534; flag -office_under_siege_

- **1937.01** `state_reaction:p22-wild-fortune/a-windfall-confirms-it` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  一笔意外的小钱进了门。Josef没有添新衣服，先把欠得最久的账单付了；收账的人在门口数了两遍，临走时说了一句“看来是真的”。
  _effects: state_parameter p22-wild-fortune.height 50 -> 55; state_parameter p22-wild-fortune.witnesses 80 -> 86; state_parameter p22-wild-fortune.fragility 45 -> 42; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:006912_

- **1937.01** `agency:recruit_members` tags: agency, agency:recruit_members
  Josef找到Otto Winter，把普拉特动物园夜班队的章程和会费说清楚；对方留下地址，答应下次再来。
  _effects: organization_membership; relation acquaintance with person-otto-winter; knowledge “我通过Josef加入了普拉特动物园夜班队。”_

- **1937.03** `vienna-tenement-neighbors.laundry_line_dispute/subject_yields_line` tags: home, social, family, housing
  Josef看Elisabeth Winter 2盆里那几件小衬衫，把自家床单卷起来抱回屋，说等下午再晾。Elisabeth Winter 2愣了一下，闷头把衣服挂好，收工回来时在Josef门口放了一小包用旧报纸裹的洗衣碱。Josef打开报纸，碱面里还掺着几粒粗盐。
  _effects: relation friend with person-materialized-world-vienna-1912-75; food_

- **1937.05** `vienna-medical-treatment.night-fever/sweat-it-out` tags: health, medical, family, money, injury
  醋水的酸味混着汗气，屋子小得转不开身。Berta Kral把布拧到不滴水，敷上去时Josef打了个激灵。窗外送奶车吱呀碾过石板，她才想起自己家的炉子还灭着。
  _effects: health -0.03999999999999998 (高烧硬熬伤身); condition; relation friend with person-materialized-world-vienna-1912-4_

- **1937.06** `p9-gap-adult-solitude.window-argument/window-argument.closed` tags: adulthood, daily, solitude, ordinary, home, neighbor, overheard, injury
  Josef把窗关上，争吵声立刻变成闷响，像隔着一层棉被。可那男人的一句话还是从缝里钻进来，她躺到床上翻来覆去，数着墙上的水渍，到很晚才睡着。
  _effects: health -0.030000000000000027 (被楼下争吵搅得没睡好); mood -0.02999999999999997_

- **1938.01** `vienna-life-anschluss-1938/flees` tags: politics, persecution, 1938, migration
  Josef在夜里收拾了一只箱子，把证件缝进外套内衬，搭上往西的火车。Anton Weiss第二天来查人，只看到空床和没关严的窗。
  _effects: move place-klosterneuburg-aunt-house; role; cash -20 (escape and lodging); condition_

- **1938.01** `state_tick:known-affair/public-year/forgotten` tags: known-affair, love, scandal, secret, public, secret_intimacy, state, state_tick
  Josef的名字从闲谈里慢慢退了下去。街上有了新的婚礼、新的葬礼和新的丑闻；只有裁缝还记得Josef改过两次同一件外套的腰身。
  _effects: state_parameter known-affair.notoriety 65 -> 60; state_parameter known-affair.grief 0 -> 0; mood 0.020000000000000018_

- **1938.01** `state_tick:p22-wild-fortune/the-story-gets-taller/a-witness-asks-for-proof` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  一个见证人要求Josef拿出证据。Josef翻遍抽屉，只找到一张被水浸过的收据；那天晚上，街上的故事换了主角，Josef的名字被挪到了最后一行。
  _effects: state_parameter p22-wild-fortune.height 55 -> 49; state_parameter p22-wild-fortune.witnesses 86 -> 81; state_parameter p22-wild-fortune.fragility 42 -> 49; mood -0.030000000000000027_

- **1938.01** `agency:organize_meeting` tags: agency, agency:organize_meeting
  Josef原定在Leopoldstädter Zinshaus, gemeinsamer Gang开会，但来的人不够，或者有人临时退缩；最后只留下几张没发完的纸条。
  _effects: mood -0.03999999999999998; reputation -0.010000000000000002_

- **1938.01** `initiative:found_process:zoo:person-materialized-world-vienna-1912-69-evt:world-vienna-1912:004194`
  普拉特动物园夜班队在Leopoldstädter Zinshaus, gemeinsamer Gang经过数年的招募、会议和互助，把分散的行动整理成公开纲领；这不是预先写好的历史，而是成员自己累积出来的运动。
  _effects: historical process 普拉特动物园夜班队的持续运动; historical development:initiative-zoo:person-materialized-world-vienna-1912-69-evt:world-vienna-1912:004194-1938 as organizer; historical development:initiative-zoo:person-materialized-world-vienna-1912-69-evt:world-vienna-1912:004194-1938 as organizer; historical development:initiative-zoo:person-materialized-world-vienna-1912-69-evt:world-vienna-1912:004194-1938 as organizer; knowledge “普拉特动物园夜班队的持续运动不是一次会议，而是我们这些年积累出来的持续组织。”; reputation 0.04_

- **1938.01** `historical_phase`
  历史进程《普拉特动物园夜班队在Leopoldstädter Zinshaus, gemeinsamer Gang经过数年的招募、会议和互助，把分散的行动整理成公开纲领；这》从 emerging 进入 mobilizing。
  _effects: knowledge “我亲历或知晓「普拉特动物园夜班队在Leopoldstädter Zinshaus, gemeinsamer Gang经过”; knowledge “我亲历或知晓「普拉特动物园夜班队在Leopoldstädter Zinshaus, gemeinsamer Gang经过”; knowledge “我亲历或知晓「普拉特动物园夜班队在Leopoldstädter Zinshaus, gemeinsamer Gang经过”_
  _causes: evt:world-vienna-1912:007488_

- **1938.04** `pl19-bridge.public-rumor::ctx-vienna-authoritarian-1934::milieu-tenement/the-list-writes-itself` tags: scandal, protection, network, press, media, rumor, bridge, vienna
  Josef在报纸上看见自己的名字和一张旧照片，报纸像一盏关不掉的灯。Hedwig提议找几个人替Josef挡电话、挡记者、挡亲戚；Josef说不用，第二天却发现Hedwig已经把名单写好了，最上面一行是Josef自己。
  _effects: state_add pl19-protected-scandal state:world-vienna-1912:682; reputation -0.020000000000000004; flag +list_written_itself; knowledge “名单最上面一行是当事人的名字。”; flag +protected_scandal_active_

- **1938.10** `hs18-radio.rumor::ctx-vienna-authoritarian-1934::milieu-tenement/turn-it-up` tags: radio, blackout, rumor, panic, neighbor, politics, vienna, urban
  停电后的第三个小时，Lena把收音机搬到楼道，电池快没电了。女播音员说“请市民保持镇静”，随后是一段军乐。Josef听见有人开始收拾行李；楼下的铁门被风撞了三次，像有人在敲。
  _effects: state_add hs18-blackout-rumor state:world-vienna-1912:681; relation acquaintance with person-phase15-Lena-world-vienna-1912; mood -0.03999999999999998; flag +heard_radio_rumor_

- **1939.01** `p22-dead-voice-child::ctx-vienna-authoritarian-1934::milieu-tenement/the-neighbor-calls-it-a-seance` tags: child, dead_relative, voice, eerie, dark, grief, family_secret, scandal
  Gustav Bauer把这件事传遍了整条街，说Josef家请了招魂师。区里的人上门问话，孩子却躲在桌子底下不肯出来；Josef在门口解释了半天，最后只说了一句“她只是想奶奶了”。第二天，窗台上被人放了一小袋盐和一张驱邪的纸条。他把盐袋放在窗台，孩子从桌下伸出手把它推开了。
  _effects: state_add public-scandal state:world-vienna-1912:679; state_add p22-scandal-engine state:world-vienna-1912:680; relation rival with person-materialized-world-vienna-1912-49; relation kin with person:evt:world-vienna-1912:002850:child; reputation -0.03; flag +seance_rumour; mood -0.02999999999999997; relation acquaintance with person-materialized-world-vienna-1912-49; flag -known_affair_active; flag +scandal_engine_active_

- **1939.01** `state_expire:fame` tags: fame, reputation, media, status, state, state_tick, state:fame
  Josef的「公众名声」到期；相关安排结束。
  _effects: state_remove fame state:world-vienna-1912:582_

- **1939.01** `state_tick:pl19-protected-scandal/the-network-meets/someone-wants-a-favor` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  有人替Josef挡了一次采访，随后在走廊里提起自己儿子的学徒期满。Josef知道这不是闲聊；当天晚上，那张写着名字的纸条被压在糖罐下面，像一枚没有付清的硬币。
  _effects: state_parameter pl19-protected-scandal.leverage 10 -> 22; state_parameter pl19-protected-scandal.protection 40 -> 36; state_parameter pl19-protected-scandal.exposure 60 -> 65; mood -0.020000000000000018_

- **1939.01** `r13-civ.rehearse-play::ctx-vienna-authoritarian-1934::milieu-tenement/cast-as-understudy` tags: culture, theatre, rehearsal, play, ambition, vienna, urban, crisis
  Franz Lechner 2让Josef站在舞台边上看完整场，说先背熟替补的台词。排练室的暖气坏了，演员们穿着大衣念对白。散场时，Franz Lechner 2把一本卷了角的剧本塞给Josef，说明晚还来。
  _effects: flag +cast_as_understudy; role; skill; knowledge “the understudy must know the whole second act by Friday”_

- **1939.02** `ad20-train-journey::ctx-vienna-authoritarian-1934::milieu-tenement/the-compartment-sleeps` tags: travel, train, stranger, everyday, public, newcomer, vienna, urban
  车厢里暖得发困，Helene Kral把窗户推开一条缝，又把带来的面包掰成两半。Josef接过一半，发现里面夹着一片薄薄的香肠。两个人没有交换姓名，到站时各走各的，Josef却记住了那片香肠的味道。
  _effects: mood 0.020000000000000018; food; flag +quiet_train; relation acquaintance with person-materialized-world-vienna-1912-16_

- **1939.02** `state_reaction:p22-scandal-engine/a-public-apology-cools-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Josef在报纸上登了道歉，流言却没有立刻停。第二天，有人在门口放了一束花，也有人把花拿走了；Josef把空花瓶留在窗台上，没有扔。
  _effects: state_parameter p22-scandal-engine.heat 55 -> 47; state_parameter p22-scandal-engine.reach 45 -> 42; state_parameter p22-scandal-engine.shame 55 -> 51; state_parameter p22-scandal-engine.leverage 20 -> 25; mood 0.010000000000000009_
  _causes: evt:world-vienna-1912:008329_

- **1939.04** `r1-hc.cholera-cordon::ctx-vienna-authoritarian-1934::milieu-tenement::cholera-war-troop-train/cholera-war-nurse` tags: health, epidemic, cholera, quarantine, neighbor, vienna, urban, crisis
  Josef被叫去帮忙煮水，锅支在院子中间，火不能灭。Hermann Bauer躺在草垫上，嘴唇干裂，Josef用勺子一点点喂；到第三天，Hermann Bauer能坐起来，第一句话是问外面死了几个。
  _effects: cash 2 (院子门口的石灰线); health -0.08000000000000002 (院子门口的石灰线); condition; flag +nursed_neighbour_through_cholera; role; relation friend with person-materialized-world-vienna-1912-7; knowledge “boiled water kept the neighbour alive”; relation acquaintance with person-materialized-world-vienna-1912-7_

- **1939.10** `ml18-inheritance.uncles-press::ctx-vienna-authoritarian-1934::milieu-tenement/sell-the-subscription-list` tags: inheritance, family, business, debt, legal, money, vienna, urban
  公证人把一封厚信推到桌子中央：Josef的叔父在第二区留下一间小印刷所、一台坏掉的压机和十四克朗的欠账。Emil Bauer说那台压机早该当废铁，但订阅名单上还有三百个名字。Josef把名单卖给对街的印厂，替叔父还了债，剩下的钱刚好够换一套冬衣。
  _effects: cash 12 (sale of the print shop subscription list); state_add ml18-sudden-fortune state:world-vienna-1912:761; relation acquaintance with person:evt:world-vienna-1912:000457:child; skill; flag +inherited_print_shop; mood 0.03999999999999998; relation acquaintance with person-materialized-world-vienna-1912-79; flag +sudden_fortune; reputation 0.020000000000000004; mood 0.02999999999999997_

- **1940.01** `vienna-life-injury-recovery/home-care` tags: health, work, family, injury
  Josef没有去诊所，只用热水和旧布洗了伤口。第二天伤口周围发红，家里人把仅剩的干净床单撕成条。
  _effects: health -0.030000000000000027 (untreated wound); cash -2 (clean cloth); condition_
  _causes: evt:world-vienna-1912:007215_

- **1940.01** `office16-budget.sign-or-block::ctx-vienna-authoritarian-1934::milieu-tenement/signed-with-margin` tags: office, budget, permit, administration, power, economy, vienna, urban
  Josef在预算表上签了字，把冬季煤房的款项从三笔并成一笔，又给夜班守卫加了半份津贴。Josef Berg算出省下的钱刚好够修屋顶；没有人鼓掌，但一月的会议室不再需要穿大衣。
  _effects: organization_funds; reputation 0.039999999999999994; skill; mood 0.020000000000000018; flag +signed_balanced_budget; knowledge “把冬季煤房的款项并成一笔后，省下的钱够修会议室屋顶。”_

- **1940.01** `state_expire:p22-wild-fortune` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  Josef的「荒唐横财」到期；相关安排结束。
  _effects: state_remove p22-wild-fortune state:world-vienna-1912:581; flag -wild_fortune_active_

- **1940.01** `state_tick:p22-scandal-engine/the-rumor-learns-new-words/the-story-turns-on-its-keeper` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  一个曾经替Josef传话的人搬走了，带走了半条街的信任。第二天，信箱里多了一张没有署名的明信片，上面只写着“我还记得”；Josef把明信片翻过来，背面是空的。
  _effects: state_parameter p22-scandal-engine.heat 47 -> 54; state_parameter p22-scandal-engine.reach 42 -> 47; state_parameter p22-scandal-engine.leverage 25 -> 21; state_parameter p22-scandal-engine.shame 51 -> 57; mood -0.020000000000000018_

- **1940.01** `state_expire:pl19-protected-scandal` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  Josef的「被小圈子护住的私情」到期；相关安排结束。
  _effects: state_remove pl19-protected-scandal state:world-vienna-1912:682; flag -protected_scandal_active_

- **1940.01** `state_tick:wish-craft/craft-pressure/put-away` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_tick
  Josef暂时把那件事收进抽屉；日子还有别的东西要应付。
  _effects: mood -0.020000000000000018_

- **1940.01** `agency:recruit_members` tags: agency, agency:recruit_members
  Josef找到Grete Winter，把普拉特动物园夜班队的章程和会费说清楚；对方留下地址，答应下次再来。
  _effects: organization_membership; relation acquaintance with person-materialized-world-vienna-1912-2; historical development:initiative-zoo:person-materialized-world-vienna-1912-69-evt:world-vienna-1912:004194-1938 as supporter; knowledge “我通过Josef加入了普拉特动物园夜班队。”_

- **1940.01** `office16-hire.protege::ctx-vienna-authoritarian-1934::milieu-tenement/hired-relative` tags: office, hire, patronage, bureaucracy, work, power, vienna, urban
  名单上添的是Hedwig，一个连公文格式都分不清的远房亲戚。Anton Bauer 2把考勤表放在桌上，没有问原因；Josef也没有解释，只在签字栏里写得比平时慢。第一个月，Hedwig迟到了七次，工资照发。
  _effects: position 档案助理 @zoo:person-materialized-world-vienna-1912-69-evt:world-vienna-1912:004194; relation kin with person-phase15-Hedwig-world-vienna-1912; flag +hired_relative; knowledge “考勤表上记了七次迟到，工资一次没有扣。”; mood 0.020000000000000018_

- **1940.03** `oj18-mortuary.first-body::ctx-vienna-authoritarian-1934::milieu-tenement/refused-the-child` tags: death, mortuary, funeral, work, odd_job, night, everyday, vienna
  Josef跟着Grete Huber进到后间，看见一具孩子的棺材，尺寸只比鞋盒大一点。Josef把毛巾放回盆里，说自己做不了。Grete Huber没有劝，只把当天的工钱数给Josef；那枚铜板在口袋里响了一路，像有人在后面跟着。
  _effects: cash 1 (a day's mortuary pay); mood -0.06; relation acquaintance with person-materialized-world-vienna-1912-26; condition; flag +refused_mortuary; knowledge “那具孩子的棺材只比鞋盒大一点，{master}没有劝我留下。”_

- **1941.01** `office16-corruption.inspection::ctx-vienna-authoritarian-1934::milieu-tenement/fined` tags: office, corruption, audit, legal, power, dark, vienna, urban
  Josef Berg在第三份合同上停住了：同一批纸张被报了两次价，第二次的签字是Josef。罚款单当场开出，金额不算大，但足够让下一季度的办公用品全部改成最便宜的牌子。Josef没有争辩，只在收据背面写了日期。
  _effects: organization_funds; reputation -0.05; mood -0.06; state_add office-under-siege state:world-vienna-1912:829; flag +fined_after_audit; knowledge “同一批纸张被报了两次价，第二次的签字是我的。”; flag +office_under_siege_

- **1941.01** `state_expire:public-scandal` tags: public-scandal, scandal, reputation, social, state, state_tick, state:public-scandal
  Josef的「公开丑闻」到期；相关安排结束。
  _effects: state_remove public-scandal state:world-vienna-1912:679_

- **1941.01** `state_expire:p22-scandal-engine` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Josef的「流言发动机」到期；相关安排结束。
  _effects: state_remove p22-scandal-engine state:world-vienna-1912:680; flag -scandal_engine_active_

- **1941.01** `r13-civ.help-refugee::ctx-vienna-authoritarian-1934::milieu-tenement/sent-to-relief-office` tags: social, refugee, shelter, war, trust, vienna, urban, crisis
  Josef没有让Josef Stein进门，只把救济站的地址写在烟盒背面，又画了怎么绕过岗亭。Josef Stein把烟盒攥在手里，鞠了一躬。第二天，走廊的墙上多了一张用铅笔写的谢谢。
  _effects: reputation 0.03; flag +directed_refugee_to_relief; knowledge “the relief office opens at seven and does not ask for a resi”; relation acquaintance with person-materialized-world-vienna-1912-53; relation acquaintance with person-materialized-world-vienna-1912-93_

- **1941.06** `vienna-tenement-neighbors.sick_child_doorstep/helps_fetch_doctor` tags: home, social, family, housing, injury
  隔壁Gustav Bauer 2的小儿子烧到说胡话，额头烫得能烘手。Gustav Bauer 2在楼道里抹眼泪，说请不起医生。Josef下楼叫了街角药房的伙计，花四十赫勒买了一包退烧药粉，又帮着用湿布敷了一整夜。天亮时孩子退了烧，Gustav Bauer 2端来一碗热汤面，面底下卧着一个鸡蛋。
  _effects: cash -0.4 (买退烧药粉); health -0.020000000000000018 (熬夜照料病人); relation friend with person-materialized-world-vienna-1912-54_

- **1941.08** `vienna-courtship-courtyard.breakup/stay-for-the-rent` tags: adulthood, courtship, partner, social, family
  东西还到一半，两人算了算房租、煤钱和两个人的工钱凑在一起才够。最后钥匙没收回去，外套也留下；这个月能少花一克朗，话说到“以后”两个字就断了，谁都不往下接，炉子今晚还是得两个人一起生。
  _effects: mood -0.050000000000000044; cash 1 (合租省下一份房租)_

- **1941.10** `ad20-school-meeting::ctx-vienna-authoritarian-1934::milieu-tenement/teacher-blames` tags: family, school, child, meeting, everyday, public, vienna, urban
  Otto Huber说Luise 2这学期退步，是因为家里晚上太吵。Josef想说自己夜里在做计件活，话到嘴边又咽回去；Luise 2站在走廊尽头，书包带子断了一边。回家的路上，Josef把书包带打了个结，谁也没有提老师的话。
  _effects: state_parameter raising-child.childConfidence 39 -> 35; relation acquaintance with person-materialized-world-vienna-1912-110; relation kin with person:evt:world-vienna-1912:002844:child; cash -1 (extra exercise books after the meeting); mood -0.040000000000000036; relation acquaintance with person-materialized-world-vienna-1912-110_

- **1942.01** `p22-child-matchmaker::ctx-vienna-authoritarian-1934::milieu-tenement/the-enemy-was-the-landlord` tags: child, matchmaker, family_album, enemy, warm, ironic, reconciliation, scandal
  Elisabeth Lechner看完相册，笑着说这栋楼正好是他的。Josef以为他在开玩笑，直到Elisabeth Lechner拿着房契上门；Elisabeth Lechner说看在孩子的份上，房租可以晚交一个月。那天晚上，孩子把照片从相册里撕下来，放进了自己的铅笔盒。孩子把铅笔盒合上，说以后不再贴照片了。
  _effects: state_add debt-bondage state:world-vienna-1912:891; cash -4 (the rent increase and the late fee); relation rival with person-materialized-world-vienna-1912-28; relation kin with person:evt:world-vienna-1912:002846:child; flag +enemy_was_landlord; mood -0.050000000000000044_

- **1942.01** `state_expire:office-under-siege` tags: office-under-siege, office, scandal, pressure, politics, legal, risk, state
  Josef的「职位受围」到期；相关安排结束。
  _effects: state_remove office-under-siege state:world-vienna-1912:829; flag -office_under_siege_

- **1942.01** `task-vienna-family-care.reconcile-siblings/meet-at-church-door` tags: family, care, courtship, siblings, inheritance, housing, task, task:family
  两人谁也没提柜子，饭吃得客气而生分。临走时Josef提议：和不和好另说，每年忌日就在教堂门口见一面，站十分钟也好。Anna Bauer想了一下，说行，但别指望他进屋。Josef把这话记在心上，回去路上把没送出去的半包烟丝塞回口袋。
  _effects: relation kin with person-anna-bauer; flag +truce_with_sibling_

- **1942.06** `vienna-market-household.friday-fish/friday-fish.salt` tags: home, market, food, social
  腌鲱鱼切成两段，一段今天吃，一段留着。黑面包硬得要用刀锯。Berta Weiss 2来借盐，眼睛落在鱼上，说可以用半棵卷心菜换一块。Josef切了一指宽递过去。
  _effects: cash -2 (腌鲱鱼和黑面包); food; relation acquaintance with person-materialized-world-vienna-1912-6_

- **1942.09** `vienna-housing-move.sublet-room/sublet-full` tags: housing, home, rent, family, money, household
  Josef把床上的旧褥子重新铺平，Gustav Bauer放下自己的铺盖卷，从怀里掏出一把钥匙看了看。厨房里多了一口人的碗，灶边的煤省着烧也够。Otto Moser在门口看了一眼，没多话。
  _effects: cash 4 (出租空床收进的月租); household; relation acquaintance with person-materialized-world-vienna-1912-82; relation acquaintance with person-materialized-world-vienna-1912-82_

- **1943.01** `vienna-life-injury-recovery/clinic-treatment` tags: health, work, family
  Josef在受伤后的第三天去了诊所。医生清洗伤口、换药，收下诊费，嘱咐不要急着回机器旁。Josef把药方折好，回家路上买了纱布。
  _effects: health 0.050000000000000044 (wound treatment); cash -8 (clinic and bandages)_
  _causes: evt:world-vienna-1912:008100_

- **1943.01** `p22-fake-engagement::ctx-vienna-authoritarian-1934::milieu-tenement/the-notary-wants-a-date` tags: fake_engagement, inheritance, romance, scandal, debt, marriage, notary, courtship
  Anton Bauer 2说光有订婚不够，必须在秋天前举行婚礼。Emil Winter开始躲着Josef，Marie Huber却主动来问要不要帮忙；Josef在债主的账本和婚礼请柬之间来回翻，发现两边写的都是同一个日期。房子还没到手，酒席的定金已经付了。他把请柬压在账本下面，像压住一张欠条。
  _effects: state_add debt-bondage state:world-vienna-1912:974; state_add p22-scandal-engine state:world-vienna-1912:975; cash -3 (wedding deposits and a notary fee); relation acquaintance with person-materialized-world-vienna-1912-79; flag +engagement_deadline; mood -0.030000000000000027; flag +scandal_engine_active_

- **1943.01** `state_reaction:p22-scandal-engine/a-new-scandal-feeds-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Josef的新故事登出来时，旧的那一页也被重新翻到桌面上。Josef发现两件事共用同一个证人，而那个证人上周还来借过盐。
  _effects: state_parameter p22-scandal-engine.heat 40 -> 46; state_parameter p22-scandal-engine.reach 35 -> 39; state_parameter p22-scandal-engine.shame 40 -> 43; state_parameter p22-scandal-engine.leverage 30 -> 32; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:010041_

- **1943.01** `p9-social-daily-culture.pictures-or-concert/p9-social-daily-culture.pictures-or-concert.cheap-picture` tags: daily, culture, leisure, cafe, music, walk, task, task:culture
  Josef和Katharina Bauer 3买了影戏棚最便宜的边座，边座和两粒糖一共五十赫勒。一刻钟的活动影戏里火车朝观众冲过来，棚里有人叫出了声。散场后两人还站在门口看下一场的招牌，Josef把剩下几个铜板在口袋里攥得发热，又买了两粒糖，一人一粒含回家。
  _effects: cash -0.5 (影戏棚边座和两粒糖); mood 0.050000000000000044; relation friend with person-materialized-world-vienna-1912-36_

- **1943.04** `ml18-loan.backroom-moneylender::ctx-vienna-authoritarian-1934::milieu-tenement/win-and-repay` tags: debt, loan, gambling, crime, money, risk, vienna, urban
  Helene Weiss把二十克朗推过桌面，借条上写着每周两成利息。Josef拿这笔钱押了一场球，赢回的数目刚好够还本息；Helene Weiss数完钱，把借条撕成两半，说下回别再找他。Josef把撕碎的纸片收进口袋，回家路上第一次觉得路灯很亮。
  _effects: cash 5 (the small profit left after repaying the moneylender); state_parameter debt-bondage.debt 18 -> 8; relation acquaintance with person-materialized-world-vienna-1912-10; flag +repaid_shark; mood 0.030000000000000027_

- **1943.06** `vienna-medical-treatment.toothache/barber-pull` tags: health, medical, family, money
  Otto Huber在门口替Josef捏着帽子，听见里面一声闷哼。弗朗茨把牙扔进搪瓷盘，说瞧这牙根都黑了。收钱时他多要了二十赫勒，算明矾水的钱，说下次别再拖成这样。
  _effects: cash -1.2 (理发师拔牙收费); health 0.030000000000000027 (病牙被拔除但手法粗糙); mood -0.020000000000000018_

- **1943.12** `vienna-tenement-neighbors.lost_room_key/key_found_by_neighbor` tags: home, social, family, housing
  Josef傍晚从面粉厂下工回来，发现挂在腰带上的房门钥匙不见了，在楼梯间来回找了四趟。Friedrich Huber在二楼拐角的煤堆旁捡到那把铜钥匙，钥匙上缠着红线，一眼就认出来。Friedrich Huber敲开Josef的门，把钥匙拍在桌上，说自己眼神好使。
  _effects: relation friend with person-materialized-world-vienna-1912-22; mood 0.050000000000000044; relation acquaintance with person-materialized-world-vienna-1912-22_

- **1944.01** `p22-debt-bakery::ctx-vienna-authoritarian-1934::milieu-tenement/the-bread-is-a-day-old` tags: bakery, debt, partnership, warm, ironic, work, creditor, bread
  面包房开在一条没有客人的巷子里，Luise Kral每天把账本翻得哗哗响。Josef试着把面包送到工厂门口，工人说太贵；送到学校门口，孩子说太硬。到月底，烤箱里只剩下半炉发酸的面团。他把硬面包切成片，放在窗台上晾着，谁也没来买。
  _effects: state_parameter debt-bondage.debt 12 -> 18; cash -3 (the unsold bread and the flour); relation acquaintance with person-luise-kral; reputation -0.020000000000000004; flag +bakery_bread_stale; mood -0.030000000000000027_

- **1944.01** `state_reaction:p22-scandal-engine/a-new-scandal-feeds-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Josef的新故事登出来时，旧的那一页也被重新翻到桌面上。Josef发现两件事共用同一个证人，而那个证人上周还来借过盐。
  _effects: state_parameter p22-scandal-engine.heat 46 -> 52; state_parameter p22-scandal-engine.reach 39 -> 43; state_parameter p22-scandal-engine.shame 43 -> 46; state_parameter p22-scandal-engine.leverage 32 -> 34; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:010700_

- **1944.01** `state_tick:debt-bondage/interest/pay-interest` tags: debt-bondage, debt, work, poverty, legal, state, state_tick
  Josef又付了一年的利息。本金几乎没动，债主的账本却翻到了新一页。
  _effects: cash -3 (debt interest); state_parameter debt-bondage.debt 8 -> 10_

- **1944.01** `state_tick:p22-scandal-engine/the-rumor-learns-new-words/the-story-turns-on-its-keeper` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  一个曾经替Josef传话的人搬走了，带走了半条街的信任。第二天，信箱里多了一张没有署名的明信片，上面只写着“我还记得”；Josef把明信片翻过来，背面是空的。
  _effects: state_parameter p22-scandal-engine.heat 52 -> 59; state_parameter p22-scandal-engine.reach 43 -> 48; state_parameter p22-scandal-engine.leverage 34 -> 30; state_parameter p22-scandal-engine.shame 46 -> 52; mood -0.020000000000000018_

- **1944.01** `state_tick:wish-craft/craft-pressure/press-on` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_tick
  Josef又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.020000000000000018_

- **1944.01** `r13-fam.write-missing-relative::ctx-vienna-authoritarian-1934::milieu-tenement/letter-sent` tags: task, family, letter, missing, war, literacy, vienna, urban
  Josef替Anna Bauer写信，把最后知道的部队番号、收容站和一处旧住址都写上去。Anna Bauer不识字，却要Josef把“家里都好”念三遍，怕写错。信投进邮筒时，她伸手在筒口摸了一下；Josef把回信地址又描粗了一笔。
  _effects: cash -1 (没有地址的信); flag +wrote_to_missing_relative; skill; relation kin with person-anna-bauer; knowledge “A letter with the last known unit and shelter addresses was ”_

- **1944.09** `vienna-social-movement.recruitment/read-and-decline` tags: development, social_movement, organization, politics
  Josef把传单读了两遍，记下上面的地址，却没有去。第二天照常上工；午休时听见两个工友低声谈论同一场集会。
  _effects: mood -0.010000000000000009_

- **1944.10** `r2-leisure.stage-door::ctx-vienna-postwar-1945::milieu-tenement/got-the-autograph` tags: leisure, theatre, celebrity, autograph, class, vienna, urban, postwar
  Elisabeth Lechner把本子接过去，问Josef叫什么。Josef说了名字，Elisabeth Lechner在签名下面又写了一行：给一个在雨里等四十分钟的人。Ferdinand Bauer提着道具箱催，Elisabeth Lechner把本子递回来，围巾滑下来，露出一张比台上老得多的脸。Elisabeth Huber在人群后面踮脚。
  _effects: mood 0.07999999999999996; flag +got_stage_door_autograph; relation acquaintance with person-materialized-world-vienna-1912-28; relation rival with person-materialized-world-vienna-1912-93; knowledge “the actor writes a personal line under every autograph”_

- **1945.01** `vienna-life-1945-liberation/survives` tags: war, liberation, 1945
  苏联士兵进城时，Josef躲在门后听见坦克履带压过石板路。几天后街口贴出告示，Josef去领了一份汤和一块面包。
  _effects: role; food; cash -2 (replacement documents)_

- **1945.01** `r15-fam.school-registration::ctx-vienna-authoritarian-1934::milieu-tenement/keeps-home` tags: family, child, school, education, school_child, vienna, urban, crisis
  Josef没有给Alois Bauer报名。家里需要一双能看摊的手，学校也还欠着上一学期的纸笔钱；晚上Alois Bauer把别人的课本借来看，Josef假装没有看见。
  _effects: state_parameter raising-child.caregiverBurden 67 -> 55; state_parameter raising-child.schoolProgress 17 -> 8; state_parameter raising-child.childConfidence 35 -> 40; state_parameter raising-child.careDebt 2 -> 6; state_parameter raising-child.schoolEnrolled false -> false; state_parameter raising-child.leftHome true -> false; cash 1 (the child's small earnings at the stall); relation kin with person:evt:world-vienna-1912:007215:child; flag +child_kept_from_school_

- **1945.01** `state_expire:debt-bondage` tags: debt-bondage, debt, work, poverty, legal, state, state_tick, state:debt-bondage
  Josef的「债务束缚」到期；相关安排结束。
  _effects: state_remove debt-bondage state:world-vienna-1912:974_

- **1945.01** `state_expire:p22-scandal-engine` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Josef的「流言发动机」到期；相关安排结束。
  _effects: state_remove p22-scandal-engine state:world-vienna-1912:975; flag -scandal_engine_active_

- **1945.01** `r13-work.unemployment-benefit::ctx-vienna-postwar-1945::milieu-tenement::postwar-benefit-office/sent-to-relief-work` tags: work, unemployment, benefit, institution, poverty, vienna, urban, postwar
  Grete Winter说补助金只发给有家属的人，Josef单身，只能去修路队领工钱。第二天Josef扛着铁锹站在城郊，和几十个男人一起把碎砖填进车辙。工钱按日结，比补助多两克朗，但一天下来，手掌磨出了三个水泡。
  _effects: cash 2 (补助金窗口的第二张表); health -0.040000000000000036 (补助金窗口的第二张表); condition; flag +work13_sent_to_relief_work_

- **1945.03** `ml18-luck.wrong-horse::ctx-vienna-postwar-1945::milieu-tenement/split-it-with-the-bookmaker` tags: gambling, luck, money, horse_race, absurd, windfall, vienna, urban
  Ferdinand Weiss 2把票翻过来，说这行字本来该写“蓝星期一”，Josef要是咬住不放，他也没办法。Josef想了一会儿，说一人一半，但下次写清楚。Ferdinand Weiss 2先是不信，随后从抽屉里数出三十克朗，手比平时慢。Emil Winter在门外听见，回家路上一直没说话，进门才说这比全拿走强。
  _effects: cash 30 (half the winnings shared with the bookmaker); state_add ml18-sudden-fortune state:world-vienna-1912:1186; relation friend with person-materialized-world-vienna-1912-46; reputation 0.06; flag +split_the_winnings; mood 0.06; flag -sudden_fortune; flag +sudden_fortune; reputation 0.020000000000000004; mood 0.030000000000000027_

- **1945.05** `ad20-shop-opening::ctx-vienna-postwar-1945::milieu-tenement/the-street-watches` tags: shop, business, opening, everyday, public, obligation, vienna, urban
  Josef把新店的招牌挂上去时，街对面已经站了几个人。第一位客人买了一包针，第二位问能不能赊账，第三位什么也没买，只说“看看”。到傍晚，Josef发现自己记住了每一张脸，却忘了算今天的账。
  _effects: state_add ad20-public-attention state:world-vienna-1912:1187; cash 3 (the first day’s takings); reputation 0.03; relation acquaintance with person-materialized-world-vienna-1912-15; flag +shop_opened; mood 0.03999999999999998; flag +public_attention_active_

- **1945.07** `vienna-parish-aid.rent-box/rent-box.accept-all` tags: faith, parish, mutual_aid, poverty, family
  煤袋落在台阶上，扬起细细一层黑末。Otto Huber用铅笔头在蓝格册上写门牌号，问房东姓什么，又叮嘱别把面包票弄丢。灶上水壶开始叫，Josef才想起屋里连只干净的杯子都没有。
  _effects: cash 6 (互助会补上本月房租差额); food; relation acquaintance with person-materialized-world-vienna-1912-110; flag +parish_registered_

- **1946.01** `ml18-family.school-gate-car::ctx-vienna-postwar-1945::milieu-tenement/move-the-child-to-a-better-school` tags: family, money, child, school, reputation, dark, vienna, urban
  新雇的马车每天把孩子送到校门口，车夫穿得比老师还整齐。第三天，Emil Hofer把Josef叫到走廊，说班上有家长联名，要求孩子转学，理由是“这家人突然有钱，来路不明”。Josef没有争辩，第二周把孩子送进了城另一头的学校，学费贵了一倍。
  _effects: cash -30 (tuition and carriage for the new school); state_parameter ml18-sudden-fortune.principal 45 -> 15; state_parameter raising-child.schoolProgress 8 -> 20; state_parameter raising-child.childConfidence 40 -> 45; relation kin with person:evt:world-vienna-1912:007215:child; flag +child_moved_school; mood 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-77_

- **1946.01** `state_tick:ad20-public-attention/the-attention-cycle/cools` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  Josef发现最近没有人再提那件事。报纸换了头版，邻居也换了话题；本该轻松，Josef却在买菜时反复整理衣领，好像还在等一个不会来的目光。
  _effects: state_parameter ad20-public-attention.attention 40 -> 32; state_parameter ad20-public-attention.sympathy 45 -> 42; state_parameter ad20-public-attention.opportunity 50 -> 48; mood -0.010000000000000009_

- **1946.01** `r13-fam.care-sick-child::ctx-vienna-postwar-1945::milieu-tenement/fever-worsens` tags: task, care, health, child, fever, night, vienna, urban
  到了后半夜，Alois Bauer的呼吸越来越急，胸口凹下去一块。Josef把最后两克朗塞给邻居，让邻居去请医生；医生天亮才来，只说怎么不早点送医院。Josef抱着孩子坐在门槛上，等一辆借来的车。
  _effects: cash -5 (第三遍换湿布); health -0.020000000000000018 (第三遍换湿布); flag +child_fever_worsened; health -0.09999999999999998 (the fever worsened before a doctor arrived); condition_

- **1946.04** `ad20-funeral::ctx-vienna-postwar-1945::milieu-tenement/a-place-to-stand` tags: funeral, death, grief, everyday, debt, public, vienna, urban
  Josef站在人群最后一排，手里没有花，只带了一把伞。Franz Bauer回头看见，往旁边挪了半步，让出一块干地。仪式很长，伞一直没打开；散场时，Franz Bauer说“下次别站那么远”，Josef点了点头。
  _effects: mood 0.020000000000000018; relation acquaintance with person:evt:world-vienna-1912:001622:child; flag +funeral_stand; food_

- **1946.04** `ad20-family-dinner::ctx-vienna-postwar-1945::milieu-tenement/the-fourth-bowl` tags: family, dinner, everyday, obligation, public, grief, vienna, urban
  Lena来得比约定早，手里提着一小袋栗子。Josef多摆了一副碗筷，又把汤里的肉往那只碗里拨了两块。饭吃到一半，Lena忽然说“你们家吃饭真安静”，Josef才发现自己一直在听楼上的脚步。
  _effects: food; mood 0.030000000000000027; relation acquaintance with person-phase15-Lena-world-vienna-1912; flag +family_dinner_guest; relation acquaintance with person-materialized-world-vienna-1912-113_

- **1946.08** `vienna-tenement-neighbors.shared_stove_fire/fire_no_damage` tags: home, social, family, housing
  Josef刚把锅端下灶，火苗就蹿了起来，Luise Kral一脚踩灭地上的油布，顺手抄起沙箱里的沙子盖住灶口。两人都没受伤，但Luise Kral的鞋底烧穿一个洞，那是唯一一双出门的鞋。
  _effects: relation friend with person-luise-kral; mood -0.010000000000000009_

- **1946.08** `ad20-loan::ctx-vienna-postwar-1945::milieu-tenement/loan-refused` tags: loan, debt, credit, everyday, obligation, money, vienna, urban
  Katharina Weiss把Josef的收入证明翻来覆去看了两遍，说数目不够。Josef问能不能少借一点；Katharina Weiss说“少借也要还得起”。走出门时，Josef把证明信重新叠好，发现上面有一道自己刚才捏出的折痕。
  _effects: flag +loan_refused; mood -0.030000000000000027; cash -1 (paperwork and a wasted morning)_

- **1947.01** `state_tick:ad20-public-attention/the-attention-cycle/warms` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  Josef在街角被人认出来，对方没有要求什么，只说“上次那件事做得不错”。这句客气话被旁边的人听见，下午便有两个陌生人朝Josef点头。关注没有减少，但空气松了一点。
  _effects: state_parameter ad20-public-attention.attention 32 -> 28; state_parameter ad20-public-attention.sympathy 42 -> 48; state_parameter ad20-public-attention.opportunity 48 -> 52; mood 0.020000000000000018_

- **1947.01** `task-vienna-family-care.reconcile-siblings/cupboard-again` tags: family, care, courtship, siblings, inheritance, housing, task, task:family
  Josef刚提一句“那年分东西”，Anna Bauer就把勺子放下，说柜子是他先看中的，凭什么让。话越说越硬，汤还剩半碗，Anna Bauer起身拿了帽子，椅子在石地上刮出一声。Josef一个人坐到教堂的钟敲完，把两份饭钱都付了。
  _effects: relation kin with person-anna-bauer; cash -0.4 (付了两份饭钱); mood -0.06_

- **1947.08** `vienna-housing-move.sublet-room/sublet-full` tags: housing, home, rent, family, money, household
  Josef把床上的旧褥子重新铺平，Mitzi Berg放下自己的铺盖卷，从怀里掏出一把钥匙看了看。厨房里多了一口人的碗，灶边的煤省着烧也够。Anna Berg在门口看了一眼，没多话。
  _effects: cash 4 (出租空床收进的月租); household; relation acquaintance with person:evt:world-vienna-1912:001251:child_

- **1947.09** `vienna-market-household.friday-fish/friday-fish.salt` tags: home, market, food, social
  Josef把腌鲱鱼放在黑面包上，咸味够配一大杯水。Elisabeth Winter 3拿着盐罐过来，看见鱼就说拿卷心菜换。换完以后，两家灶上都多了一样东西。
  _effects: cash -2 (腌鲱鱼和黑面包); food; relation acquaintance with person-materialized-world-vienna-1912-108; relation acquaintance with person-materialized-world-vienna-1912-108_

- **1948.01** `vienna-tenement-neighbors.laundry_line_dispute/compromise_split_line` tags: home, social, family, housing
  Josef把洗好的床单搭上院子里的公用晾衣绳，占了整条。Luise Kral抱着一盆湿衣服下来，说自家孩子明天要穿干净衬衫上学。两人在绳子两头扯了一阵，最后Josef把床单对折，腾出一半，Luise Kral用木夹子把衬衫一件件排上去。谁也没道歉，但第二天见面都点了头。
  _effects: relation acquaintance with person-luise-kral; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:012600_

- **1948.01** `ml18-charity.neighborhood-clinic::ctx-vienna-postwar-1945::milieu-tenement/the-family-blocks-the-donation` tags: charity, money, clinic, reputation, community, warm, vienna, urban
  捐款的事刚说出口，家里的兄弟先来了。他说这笔钱该留给自家人，不该拿去给街上的孩子看病。Emil Huber 3在诊所门口等了半小时，最后把图纸卷起来；Josef站在空铺面里，听见隔壁肉铺的锯骨声一下一下传过来。
  _effects: cash -2 (the notary's fee for the abandoned clinic deed); relation acquaintance with person-materialized-world-vienna-1912-80; flag +family_blocked_clinic; knowledge “诊所的铺面已经租下，但家里的兄弟不同意把横财捐出去。”; mood -0.02999999999999997; relation acquaintance with person-materialized-world-vienna-1912-130; relation acquaintance with person-materialized-world-vienna-1912-80_

- **1948.01** `state_expire:ad20-public-attention` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  Josef的「被看见的日常」到期；相关安排结束。
  _effects: state_remove ad20-public-attention state:world-vienna-1912:1187; flag -public_attention_active_

- **1948.01** `state_tick:wish-craft/craft-pressure/press-on` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_tick
  Josef又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.020000000000000018_

- **1948.01** `r13-fam.arrange-childcare::ctx-vienna-postwar-1945::milieu-tenement/childcare-arranged` tags: task, care, childcare, work, neighbor, wages, vienna, urban
  Josef天没亮就把Alois Bauer裹好，抱到楼下Elisabeth Winter 3家。Elisabeth Winter 3接过孩子，先摸了摸尿布，又指给Josef看灶上温着的米汤。Josef把一星期的工钱数出一份放在柜上，Elisabeth Winter 3数也没数就收进围裙；出门时，Josef听见孩子在屋里哭了一声，又停了。
  _effects: cash -2 (上工前把小的送下楼); condition; flag +arranged_daily_childcare; relation acquaintance with person-materialized-world-vienna-1912-108; knowledge “the minder keeps a pot of rice water on the stove”_

- **1948.04** `vienna-parish-aid.soup-kitchen/soup-kitchen.help-wash` tags: faith, parish, mutual_aid, poverty, family
  Josef喝完汤没走，留下来帮修女把大锅刷净，又把木碗按大小摞好。厨房后头有半块面包和一碗剩汤，修女说是帮忙人的午饭。Otto Huber在门口等着一起回去，说下回还来，洗锅的活总有人要干。
  _effects: food; skill; relation acquaintance with person-materialized-world-vienna-1912-110; mood 0.020000000000000018_

- **1948.11** `vienna-church-community.tenement-prayer/rent-prayer-help` tags: faith, social, family, home
  Josef在楼梯间守夜时，邻居说起楼下老太太病重。
  _effects: condition; food; relation acquaintance with person:evt:world-vienna-1912:002587:child_

- **1949.01** `ml18-tax.audit-of-the-windfall::ctx-vienna-postwar-1945::milieu-tenement/hide-the-ledger` tags: tax, legal, money, windfall, bureaucracy, comic, vienna, urban
  Gustav Bauer 2把账本塞进钢琴后面的夹层，说等风声过去再拿出来。Elisabeth Huber第二次来时带了一个记录员和一张搜查令；钢琴被挪开时，琴键响了一串不成调的音。Josef看见黑皮本翻开的那一页上，已经用红笔圈出了三笔利息。
  _effects: cash -10 (the accountant's fee for hiding the ledger); state_add under-investigation state:world-vienna-1912:1334; relation colleague with person-materialized-world-vienna-1912-54; flag +tax_ledger_hidden; knowledge “黑皮本上被红笔圈出的三笔利息都没有报税。”; mood -0.04999999999999999_

- **1949.01** `r13-civ.ration-card::ctx-vienna-postwar-1945::milieu-tenement/queue-closed` tags: politics, rationing, food, war, institution, vienna, urban, postwar
  Josef排到窗口时，Mitzi Huber把木牌翻成“今日止”，说本区的配额发完了，明天再来。队伍没有散，有人开始数前面还有多少人。Josef把身份证攥在手里，站到腿发麻。
  _effects: mood -0.08000000000000002; flag +ration_queue_closed; knowledge “the district quota can run out before the window closes”_

- **1949.03** `major-crisis.rent-increase/tenant-meeting` tags: crisis, housing, rent, eviction, family, poverty
  巷口洗衣房的老板娘把几张椅子摆开，叫来半条街的租户。Josef把涨租单摊在桌上，逐条念出上面的数字；Helene Bauer站在门边，既没走，也没替房东说话。大家决定先集体迟交一个月，签名纸传到Josef手里时，纸上已经有一块油渍。
  _effects: cash -2 (paper, ink and tram fare for the tenants meeting); role; flag +rent_strike; relation acquaintance with person:evt:world-vienna-1912:002537:child; reputation 0.03_

- **1949.08** `r1-civ.naturalisation-oath::ctx-vienna-postwar-1945::milieu-tenement/citizenship-blocked-by-income` tags: migration, citizenship, papers, belonging, bureaucracy, vienna, urban, postwar
  Luise Huber说Josef的居留年限够了，但收入证明不够，要找一个本地担保人。Lena愿意签，Luise Huber又说担保人要负连带责任，Lena的笔停在半空。Josef看着那支笔，想起自己在这座城市搬过的七次家。
  _effects: mood -0.12; flag +citizenship_blocked_by_income; relation acquaintance with person-phase15-Lena-world-vienna-1912; relation acquaintance with person-materialized-world-vienna-1912-68; knowledge “a guarantor accepts joint liability for the applicant”_

- **1949.10** `vienna-parish-aid.funeral-society/funeral-society.quit` tags: faith, parish, mutual_aid, poverty, family
  Josef说互助会先退了，这笔钱要留给煤和面包。Otto Winter 3没争辩，在蓝皮本上把名字划了一道，问清楚是不是全家都退，然后把划掉的那行折进本子夹缝。她说以后想再进，要重新排三个月。门关上，Josef听见铅笔在楼梯上轻轻敲了两下栏杆。
  _effects: cash 0.4 (省下本周会费留作煤钱); relation acquaintance with person-materialized-world-vienna-1912-140; flag +funeral_society_left; relation acquaintance with person-materialized-world-vienna-1912-140_

- **1950.01** `state_expire:under-investigation` tags: under-investigation, legal, police, investigation, risk, state, state_tick, state:under-investigation
  Josef的「被调查」到期；相关安排结束。
  _effects: state_remove under-investigation state:world-vienna-1912:1334_

- **1950.01** `vienna-housing-move.flat-viewing/flat-viewing-deposit` tags: housing, home, rent, family, money, household, injury
  窗子推开只有一线天光，墙纸边角翘起，Josef用指甲一刮便掉下一层湿粉。看门人揣好定金，说这间是朝北的，冬天火炉要添得勤些。Emil Stein站在楼梯口没进屋，只替Josef看着箱子。
  _effects: cash -4 (当场付下定金和钥匙钱); residence; health -0.030000000000000027 (在新屋里待久了关节发凉)_

- **1950.04** `vienna-social-movement.recruitment/join-and-carry` tags: development, social_movement, organization, politics
  Josef在楼梯下面接到一张折成四折的传单。纸上没有署名，只写着下一次集会的地址。Josef去了，在昏暗的屋里报上姓名，成为圣马克斯殡葬合作社的一员，并答应负责自己所在街区的联络。
  _effects: organization_membership; role_

- **1950.12** `vienna-legacy-worklife.union-office/union-office.write-off` tags: legacy, work, family, reform, ordinary_life
  账本的纸边已经发毛，Josef翻到那一页时，手指沾上一层灰。有人说“三十四克朗够买两袋面粉”，没人接话。最后举手表决，赞成销账的手比反对的多两只，老成员把手放下去时，椅子又晃了一下。
  _effects: mood -0.040000000000000036; relation acquaintance with person-materialized-world-vienna-1912-142; flag +union_debt_written_off; relation acquaintance with person-materialized-world-vienna-1912-142_

- **1951.01** `vienna-postwar-housing-1950s/waiting-list` tags: adulthood, postwar, housing, family
  Josef去住房局问结果，办事员翻过卡片说分数不够：家里人口少，现住房虽挤但还没到拆除标准。回程的电车上，Hermann Winter劝他明年再递一次申请。
  _effects: role; cash -2 (application and tram fare); mood -0.040000000000000036; relation acquaintance with person-materialized-world-vienna-1912-17_

- **1951.01** `state_expire:institution-purge` tags: institution-purge, purge, repression, organization, loyalty, surveillance, politics, state
  Josef的「组织清洗」到期；相关安排结束。
  _effects: state_remove institution-purge state:world-vienna-1912:1411_

- **1951.01** `r13-fam.write-missing-relative::ctx-vienna-postwar-1945::milieu-tenement/letter-returned` tags: task, family, letter, missing, war, literacy, vienna, urban
  信过了三个星期被退回来，信封上盖着“查无此人”，边角已经磨毛。Mitzi Berg不认得那四个字，让Josef念；Josef念成“还在路上”，把信折好放进抽屉。Mitzi Berg点点头，第二天又问有没有回信。
  _effects: cash -1 (没有地址的信); mood -0.12; condition; flag +letter_returned_undeliverable; relation kin with person-materialized-world-vienna-1912-76_

- **1951.02** `r3-mig.transit-camp::ctx-vienna-postwar-1945::milieu-tenement::postwar-transit-wave/registered-by-nationality` tags: migration, refugees, camp, family, papers, vienna, urban, postwar
  Elisabeth Bauer 2按国籍把人分成三队，Josef被推到“无国籍”那一队。登记卡上只写了姓、年龄和一双鞋的尺码。第三排的草垫已经被人占了，Luise Huber挪出半个位置，说“夜里冷，别脱鞋”。
  _effects: food; condition; flag +registered_in_transit_camp; relation friend with person-materialized-world-vienna-1912-68; knowledge “the camp sorts people by nationality, not by family”; relation acquaintance with person-materialized-world-vienna-1912-156_

- **1951.07** `vienna-courtship-courtyard.breakup/keys-and-photo-returned` tags: adulthood, courtship, partner, social, family, separation
  院子里晾着三条床单，风一过就拍到人脸上。Josef把备用钥匙和一张照相馆拍的合影交还，Emil Winter把那件借来的外套叠好递回。两人说好各找各的住处，谁都没有提高声音；分手分得干净，可两个人心里都空了一块。
  _effects: relation_end partner with person:evt:world-vienna-1912:000337:child; mood -0.08999999999999997; flag +courtship_ended_cleanly; relation acquaintance with person-materialized-world-vienna-1912-139_

- **1951.12** `vienna-market-household.soup-kitchen/soup-kitchen.sell` tags: home, market, food, social
  鞋匠敲后门问有没有热汤，Josef把剩下的半锅倒进他的罐子里，收下两个十字币。Helene Weiss 2提着空碗上来时，只看见Josef把硬币塞进围裙口袋。
  _effects: cash 2 (卖出半锅扁豆汤); food; relation acquaintance with person-materialized-world-vienna-1912-141; relation acquaintance with person-materialized-world-vienna-1912-141_

- **1952.01** `p23-lovers-ledger::ctx-vienna-postwar-1945::milieu-tenement/the-ledger-burns-first` tags: love, desire, betrayal, ledger, secret, blackmail, high_drama, vienna
  Emil Winter比Josef早到一步。炉膛里只剩一截没烧透的蓝线，Josef从灰里拈出来，认出那是账本装订用的线。Emil Winter说这样对大家都好；Josef没有回答，只把灰烬扫进一只信封，收进抽屉最深处。炉子里的火还没有完全灭。
  _effects: state_add p23-dangerous-secret state:world-vienna-1912:1525; knowledge “partner burned the ledger”; mood -0.030000000000000027; flag +ledger_burned_

- **1952.01** `state_tick:wish-craft/craft-pressure/put-away` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_tick
  Josef暂时把那件事收进抽屉；日子还有别的东西要应付。
  _effects: mood -0.020000000000000018_

- **1952.01** `r13-fam.negotiate-rent::ctx-vienna-postwar-1945::milieu-tenement::rent-postwar/repairs-instead` tags: task, commerce, housing, rent, negotiation, vienna, urban, postwar
  Anna Bauer说租金不能降，但可以把漏雨的屋顶修了。Josef让她把修屋顶的日期写在收据上，Anna Bauer写了又划掉，最后改成“尽快”。Josef收好收据，心想这条街上“尽快”大概能拖到下一个冬天。
  _effects: condition; flag +accepted_repairs_for_rent; relation acquaintance with person-anna-bauer; knowledge “the roof repair has only a vague promise”_

- **1952.02** `r2-law.guardianship-hearing::ctx-vienna-postwar-1945::milieu-tenement/took-ward-early` tags: law, guardianship, family, court, housing, vienna, urban, postwar
  Josef没有等审批，先把孩子接回自己屋里。Grete Winter上门时看见两张床挤在一间房，Marie Huber站在楼梯口说这是“临时照看”。Grete Winter把笔录写完，让Josef签，说签了就是承认违规，不签就带走孩子。
  _effects: condition; flag +took_ward_without_court_order; relation rival with person-materialized-world-vienna-1912-2; knowledge “the official will remove the child if the form is not signed”_

- **1952.04** `r3-crime.poisoning-case::ctx-vienna-postwar-1945::milieu-tenement::one-microscope/drank-from-the-pot` tags: crime, medical, poison, marriage, suspicion, vienna, urban, postwar
  Josef先盛了一碗，说“我先尝咸淡”。半个钟头后，Josef开始呕吐，Maria Winter 2跑去叫Ferdinand Bauer。洗胃时，Josef听见Grete Winter在门外问“谁做的汤”，Maria Winter 2说“是他自己”。Ferdinand Bauer把铜勺放进证物袋，说“先查查锅”。
  _effects: cash -6 (汤锅边搁着一把铜勺); health -0.19999999999999996 (汤锅边搁着一把铜勺); condition; flag +poisoned_by_own_soup; relation friend with person-materialized-world-vienna-1912-112; knowledge “the soup was poisoned before the subject tasted it”; relation acquaintance with person-materialized-world-vienna-1912-112_

- **1952.04** `oj18-cinema.reel::ctx-vienna-postwar-1945::milieu-tenement/cut-the-reel` tags: cinema, film, projection, night, censorship, work, odd_job, vienna
  放映到第十一本，胶片在片门里卷成一团。Josef剪掉烧焦的一截，发现后面接的是一卷没送审的新闻片：军靴踏过广场，镜头扫过一张张被按下去的脸。Elisabeth Huber在黑暗里说“接回正片”，Josef照做了。
  _effects: organization_found 小巷电影院 (household_firm); position 放映员 @cinema:person-phase15-Josef-world-vienna-1912-evt:world-vienna-1912:016277; state_add oj18-odd-apprenticeship state:world-vienna-1912:1586; cash 1 (projectionist wages); skill; flag +cut_the_reel; knowledge “第十一本胶片里夹着没送审的新闻片，{projectionist}让我接回正片。”; role; flag +odd_job_apprentice_

- **1952.06** `state_reaction:p23-dangerous-secret/a-witness-talks` tags: p23-dangerous-secret, secret, danger, leverage, exposure, loyalty, crime, politics
  审讯室里的灯亮了一夜。第二天，Josef在面包房门口听见有人低声复述自己的秘密，连停顿的位置都一模一样。
  _effects: state_parameter p23-dangerous-secret.exposure 20 -> 28; state_parameter p23-dangerous-secret.leverage 15 -> 11; state_parameter p23-dangerous-secret.loyalty 55 -> 49_
  _causes: evt:world-vienna-1912:016296_

- **1952.09** `vienna-parish-aid.soup-kitchen/soup-kitchen.leave` tags: faith, parish, mutual_aid, poverty, family
  Josef看见熟人排在前面，帽檐压得低低的，便转身拐进旁边的小巷。Elisabeth Winter 3追出来问怎么不领了，Josef说人太多，改天再来。回到屋里，灶是冷的，早上剩的半个土豆还在盘子里。Josef把它切成片，就着水咽下去。
  _effects: mood -0.010000000000000009; relation acquaintance with person-materialized-world-vienna-1912-108; food_

- **1953.01** `state_tick:p23-dangerous-secret/the-secret-changes-hands/a-second-person-learns` tags: p23-dangerous-secret, secret, danger, leverage, exposure, loyalty, crime, politics
  一个曾在场的人喝多了，把故事讲给了不该听的人。第二天，Josef在市场上看见两个陌生人站在菜摊旁边，什么也不买，只看着来往的人。Josef把篮子换到另一只手上，继续挑土豆。
  _effects: state_parameter p23-dangerous-secret.exposure 28 -> 36; state_parameter p23-dangerous-secret.leverage 11 -> 7; state_parameter p23-dangerous-secret.loyalty 49 -> 43_

- **1953.01** `state_tick:oj18-odd-apprenticeship/strange-year/the-logbook-mislaid` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  巡查簿在换班时不见了，第二天却出现在煤筐底下，最后几页被水泡得发皱。管事的说签字不能算数，扣了Josef半个月的夜班钱；Josef没有争，只在新的簿子第一页把日期写得很大。
  _effects: state_parameter oj18-odd-apprenticeship.trust 30 -> 14; state_parameter oj18-odd-apprenticeship.reliability 50 -> 40; flag +odd_job_scare_

- **1953.01** `r13-fam.care-sick-child::ctx-vienna-postwar-1945::milieu-tenement/fever-breaks` tags: task, care, health, child, fever, night, vienna, urban
  Josef把湿布拧到不再滴水，敷在Luise Bauer的额头上。孩子烧得说胡话，Josef就一遍遍念窗外的街名，直到天快亮时，孩子的手心终于出了一层汗。Josef把被子掖好，自己靠在床沿睡了过去，醒来时锅里还剩半碗冷粥。
  _effects: cash -2 (第三遍换湿布); health -0.030000000000000027 (第三遍换湿布); condition; flag +nursed_child_fever; relation guardian with person:evt:world-vienna-1912:014408:child_

- **1953.03** `oj18-cinema.censor::ctx-vienna-postwar-1945::milieu-tenement/reel-hidden` tags: cinema, film, censorship, projection, suspense, work, odd_job, vienna
  Josef把那卷胶片带回家，藏在面粉桶后面。第三天，Elisabeth Bauer 2带着两个便衣回来，放映室里只剩下正片。Josef被吊销放映资格，名字上了剧院的黑名单；那卷胶片最后出现在警察局的证物架上。
  _effects: state_add blacklisted state:world-vienna-1912:1625; position_end 放映员 @cinema:person-phase15-Josef-world-vienna-1912-evt:world-vienna-1912:016277; state_remove oj18-odd-apprenticeship state:world-vienna-1912:1586; cash -2 (fine and lost wages); reputation -0.04000000000000001; mood -0.040000000000000036; flag +hid_banned_reel; knowledge “便衣从面粉桶后面拿走了胶片，放映室的锁当天就换了。”; flag +blacklisted; role; flag -odd_job_apprentice_

- **1953.05** `r1-cul.confession::ctx-vienna-postwar-1945::milieu-tenement/penance-assigned` tags: faith, confession, secrecy, shame, church, vienna, urban, postwar
  Josef隔着帘子说了三件小事，最后一件是偷了邻居的煤。Hermann Lechner 2听完，让Josef把煤还回去，再请邻居吃一顿饭。Josef说邻居不会开门；Hermann Lechner 2说那就把煤放在门口，别留名字。
  _effects: mood 0.040000000000000036; condition; flag +confessed_small_theft; relation acquaintance with person-materialized-world-vienna-1912-133; knowledge “the penance is to return the coal without a name”; relation acquaintance with person-materialized-world-vienna-1912-133_

- **1953.11** `vienna-parish-aid.rent-box/rent-box.food-only` tags: faith, parish, mutual_aid, poverty, family
  Josef只收下篮里的面包和豆子，把煤袋推回Emil Bauer手里，说房租自己再想办法，请她们给介绍点零工。Emil Bauer把煤放在走廊窗台，说礼拜四后院有人要拆旧木箱，一赫勒一捆，工钱不多但现结。Josef记下门牌，答应一早过去。
  _effects: food; relation acquaintance with person:evt:world-vienna-1912:000457:child_

- **1954.01** `vienna-life-injury-recovery/clinic-treatment` tags: health, work, family
  Josef在受伤后的第三天去了诊所。医生清洗伤口、换药，收下诊费，嘱咐不要急着回机器旁。Josef把药方折好，回家路上买了纱布。
  _effects: health 0.050000000000000044 (wound treatment); cash -8 (clinic and bandages)_
  _causes: evt:world-vienna-1912:014408_

- **1954.01** `office16-budget.sign-or-block::ctx-vienna-postwar-1945::milieu-tenement/blocked-the-permit` tags: office, budget, permit, administration, power, economy, vienna, urban
  Josef把一份扩建许可证压在抽屉最下面，理由是排水和消防通道不合规。申请人Alois 2在走廊里等到下班，最后只拿到一张写着“补件”的纸条。Josef知道这份许可明年还会再来，但今年不会从自己的桌上出去。
  _effects: reputation 0.01999999999999999; skill; relation rival with person:evt:world-vienna-1912:002341:child; flag +blocked_permit; knowledge “扩建申请的排水图与消防通道不符合现行规定。”_

- **1954.01** `r13-fam.visit-grave::ctx-vienna-postwar-1945::milieu-tenement/flowers-placed` tags: task, family, grave, mourning, neighbor, grief, vienna, urban
  Josef陪Grete Winter去公墓，把一把野菊放在新翻的土上。木牌上的名字被雨冲得发白，Grete Winter用手指一笔一画描了一遍，描到最后一笔，指腹上全是泥。Josef没有劝，只蹲下来把歪掉的木牌扶正。
  _effects: cash -1 (公墓新翻的土); condition; flag +visited_a_grave_with_neighbour; role; relation friend with person-materialized-world-vienna-1912-2_

- **1954.01** `vienna-housing-move.rent-notice/rent-notice-demand-repair` tags: housing, home, rent, family, money
  Josef没有立刻答话，先去敲Mitzi Berg的门。两人一起数落墙上的水渍和门框里灌进来的风，楼梯间的窗户修好了，自家墙皮还在剥落。Mitzi Berg提议一起把话带给看门人：先修好漏水的墙角，涨租的事再谈。Josef把纸重新折好，请他把话带到门外。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-76; mood 0.030000000000000027; flag +rent_dispute_

- **1954.09** `vienna-social-movement.aftermath/keep-the-list` tags: development, social_movement, organization, consequence
  Josef把第二区夜班出租合作社的名单藏进缝纫机抽屉的夹层。名单上有二十几个名字，其中两个已经搬走，一个被工厂开除。Josef没有把最后一行划掉。
  _effects: flag +movement_list_holder; reputation 0.03_

- **1955.01** `p23-strike-betrayal::ctx-vienna-postwar-1945::milieu-tenement/the-committee-surrenders` tags: politics, labor, strike, betrayal, committee, blacklist, high_drama, vienna
  罢工进行到第三天，Luise Huber在委员会上举手同意复工。Josef站在厂房门口，听见里面的机器一台接一台响起来，像有人在数钱。Emil Bauer把罢工袖章摘下来，塞进Josef的口袋，说留着吧，下次还用得上。厂门口的雪被踩成了黑泥。
  _effects: state_add blacklisted state:world-vienna-1912:1666; state_add public-scandal state:world-vienna-1912:1667; relation rival with person-materialized-world-vienna-1912-68; relation friend with person:evt:world-vienna-1912:000457:child; flag +strike_surrendered; flag -blacklisted; flag +blacklisted_

- **1955.01** `p22-blacklist-soup::ctx-vienna-postwar-1945::milieu-tenement/the-menu-is-a-police-list` tags: blacklist, cook, soup_kitchen, warm, ironic, work, politics, community
  警察在汤锅旁边发现一张名单，上面写着常来吃饭的人名。Elisabeth Huber说这是政治集会，Josef说这只是记账；Otto 2在门口喊了一声，排队的人散了一半。第二天，厨房门口贴了封条，锅里的汤还没有凉。他把名单折好，塞进围裙口袋，锅里的汤还在冒气。
  _effects: state_add under-investigation state:world-vienna-1912:1668; state_add public-scandal state:world-vienna-1912:1669; relation rival with person-materialized-world-vienna-1912-93; relation acquaintance with person:evt:world-vienna-1912:003202:child; flag +soup_kitchen_sealed_

- **1955.01** `state_expire:p23-dangerous-secret` tags: p23-dangerous-secret, secret, danger, leverage, exposure, loyalty, crime, politics
  Josef的「危险的秘密」到期；相关安排结束。
  _effects: state_remove p23-dangerous-secret state:world-vienna-1912:1525_

- **1955.01** `r13-fam.arrange-childcare::ctx-vienna-postwar-1945::milieu-tenement/childcare-arranged` tags: task, care, childcare, work, neighbor, wages, vienna, urban
  Josef天没亮就把Luise Bauer裹好，抱到楼下Josef Bauer 2家。Josef Bauer 2接过孩子，先摸了摸尿布，又指给Josef看灶上温着的米汤。Josef把一星期的工钱数出一份放在柜上，Josef Bauer 2数也没数就收进围裙；出门时，Josef听见孩子在屋里哭了一声，又停了。
  _effects: cash -2 (上工前把小的送下楼); relation acquaintance with person-materialized-world-vienna-1912-80; knowledge “the minder keeps a pot of rice water on the stove”_

- **1955.05** `ad20-public-speech::ctx-vienna-postwar-1945::milieu-tenement/hall-empty` tags: speech, public, reputation, everyday, fame, scandal, vienna, urban
  Josef讲到一半，前排的人开始看表，后排的人陆续往门口走。Anna Weiss 4站在门边，想拦又不好拦。最后只剩下三排椅子，Josef把稿子念完，声音在空屋子里显得太大。
  _effects: reputation -0.03; mood -0.050000000000000044; flag +speech_hall_empty; cash -1 (the hall rental was not refunded); relation acquaintance with person-materialized-world-vienna-1912-172_

- **1955.09** `vienna-tenement-neighbors.sick_child_doorstep/borrows_coal_risk` tags: home, social, family, housing, injury
  Josef把自家煤箱里仅剩的四块煤分了两块给Luise Weiss，自己家那一夜没生火，裹着大衣睡的。孩子烧退了，Luise Weiss第二天还煤时多塞了一把粗盐。Josef当天下午就开始流清鼻涕，第三天咳得直不起腰。
  _effects: health -0.07999999999999996 (受凉咳嗽); food; relation friend with person:evt:world-vienna-1912:004998:child_

- **1955.09** `state_reaction:public-scandal/gossip` tags: public-scandal, scandal, reputation, social, state, state_reaction, home, family
  Josef走进咖啡馆时，邻桌的声音低了一拍。没有人当面说什么，但每个人都知道该说什么。
  _effects: reputation -0.03_
  _causes: evt:world-vienna-1912:018039_

- **1955.12** `sm18-object.child-schoolbag::ctx-vienna-postwar-1945::milieu-tenement/the-thimble-is-our-own` tags: child, school, object, accusation, misunderstanding, reputation, vienna, urban
  Otto Huber把顶针举到灯下，发现内圈刻着两个字：不是邻居家的姓，是Josef婆婆的姓。Josef这才想起，这只顶针是Mitzi Kral从家里针线篮拿去学校做手工的，昨天还说过。教室里有人笑了一声。
  _effects: mood 0.040000000000000036; relation acquaintance with person-materialized-world-vienna-1912-110; reputation 0.010000000000000009; knowledge “银顶针内圈刻着自家婆婆的姓，是孩子从家里拿去做手工的”; flag +thimble_was_our_own_

- **1956.01** `fm17-miracle.witness::ctx-vienna-postwar-1945::milieu-tenement/a-light-on-the-grave` tags: faith, miracle, vision, public_scandal, witness, reputation, doubt, vienna
  万灵节傍晚，Josef和Luise Bauer在墓园点蜡烛。一团淡蓝色的光在Josef母亲的墓碑上方停了几息，又慢慢散开。Luise Bauer先跪下，随后旁边几家人也跪了。没有人问Josef最近为什么被报纸写，但所有人看Josef的眼神都变了。
  _effects: state_add fm17-miracle-witness state:world-vienna-1912:1715; reputation 0.03999999999999998; mood 0.020000000000000018; flag +fm17_light_seen; flag +fm17_miracle_witnessed; knowledge “我看见的那件事，到今天我仍说不出它是什么。”_

- **1956.01** `state_tick:under-investigation/case-progress/evidence` tags: under-investigation, legal, police, investigation, risk, state, state_tick
  调查员又来找Josef谈了一次。问话比上次具体，记录也比上次长。
  _effects: state_parameter under-investigation.progress 20 -> 35; mood -0.040000000000000036_

- **1956.01** `state_tick:wish-craft/craft-pressure/press-on` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_tick
  Josef又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.020000000000000018_

- **1956.01** `r13-fam.collect-funeral-money::ctx-vienna-postwar-1945::milieu-tenement/enough-collected` tags: task, social, funeral, neighbor, charity, grief, vienna, urban
  Josef端着Ferdinand 2的旧帽子，从一楼走到四楼，一家一家敲门。有人给两枚铜板，有人给一件旧衬衣，还有人家把门开了一条缝又关上。到傍晚，帽子里的钱够买一口薄棺；Luise Winter接过帽子时，先数了数，又把钱倒出来重数了一遍。
  _effects: cash -2 (端着一顶帽子走楼道); flag +collected_funeral_money; role; knowledge “the building raised enough for a plain coffin”_

- **1956.09** `vienna-parish-aid.rent-box/rent-box.food-only` tags: faith, parish, mutual_aid, poverty, family
  Josef只收下篮里的面包和豆子，把煤袋推回Otto Huber手里，说房租自己再想办法，请她们给介绍点零工。Otto Huber把煤放在走廊窗台，说礼拜四后院有人要拆旧木箱，一赫勒一捆，工钱不多但现结。Josef记下门牌，答应一早过去。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-110_

- **1956.12** `vienna-historical-social-movement.district-list/demand-open-books` tags: history, historical_process, social_movement, organization, politics
  Josef把账本摊在灯下，一页一页念出日期和克朗数，念到买纸那笔时有人 From 门口咳嗽。Alois Weiss低头拨弄围巾穗子，没有替谁说话。桌子上的旧墨水瓶被碰倒，蓝墨慢慢洇进木纹。
  _effects: relation acquaintance with person:evt:world-vienna-1912:004540:child; reputation 0.04000000000000001; skill_

- **1957.01** `oj18-photo.blacklist::ctx-vienna-postwar-1945::milieu-tenement/press-card-refused` tags: photography, street, blacklist, press, work, odd_job, everyday, vienna
  报社的摄影部把Josef的证件退了回来，信封上盖着“暂不录用”。Josef把证件剪成两半，改在普拉特门口给游客拍骑马照；一个下午下来，赚的钱比在报社一天还多，只是再也没有人叫他“记者”。
  _effects: cash 2 (Prater tourist photographs); reputation -0.01999999999999999; state_add oj18-odd-apprenticeship state:world-vienna-1912:1763; flag +street_photographer; flag +press_card_refused; knowledge “报社的信封上盖着“暂不录用”，普拉特的游客照却比报社一天赚得多。”; relation acquaintance with person-materialized-world-vienna-1912-177; role; flag +odd_job_apprentice_

- **1957.01** `state_expire:under-investigation` tags: under-investigation, legal, police, investigation, risk, state, state_tick, state:under-investigation
  Josef的「被调查」到期；相关安排结束。
  _effects: state_remove under-investigation state:world-vienna-1912:1668_

- **1957.01** `state_expire:public-scandal` tags: public-scandal, scandal, reputation, social, state, state_tick, state:public-scandal
  Josef的「公开丑闻」到期；相关安排结束。
  _effects: state_remove public-scandal state:world-vienna-1912:1669_

- **1957.01** `state_expire:fm17-miracle-witness` tags: fm17-miracle-witness, faith, miracle, vision, witness, religion, reputation, doubt
  Josef的「见过无法解释之事的人」到期；相关安排结束。
  _effects: state_remove fm17-miracle-witness state:world-vienna-1912:1715_

- **1957.01** `p10-family-tasks.find-missing-kin/find-missing-kin.postcard` tags: adulthood, family, social, marriage, care, inheritance, task, missing_kin
  问询表要出生日期和最后通信地址，Josef写到一半停了笔，把哥哥的信从证件夹里翻出来照着抄。寄出去后每天看门房有没有信。两个月后明信片送到，画面是鲁尔河，背面铅笔字被雨水洇过。
  _effects: mood 0.12; cash -1 (寄往鲁尔的信和明信片邮费（其中1克朗记入债务）); knowledge “哥哥在鲁尔矿区做工，还活着”_
## Rosa

Born 1912.01, died 1916.07 (age 4).
Education: none 0; occupation: none; roles: infant, child.

### State snapshot
- p22-child-omen [person] (ended 1916.7: owner_died) parameters={"strangeness":36,"attention":35,"protection":49,"fear":14} links={} ticks=2
- p22-family-legend [person] (ended 1916.7: owner_died) parameters={"warmth":53,"secrecy":57,"danger":16,"promise":50} links={} ticks=2

### 19 subject events

- **1912.03** `p22-comic-name-register::ctx-vienna-1912::milieu-tenement/the-clerk-was-right` tags: infancy, family, bureaucracy, name, official, comic, tender, drama
  Alois Lechner回家说起这事，祖母忽然安静了：那个“嚏”正是祖父小时候的外号。登记员并不知道，可纸上多出来的字，像是从旧相册里走出来的；祖母翻到一半就停住了。
  _effects: mood -0.020000000000000004; knowledge “登记簿上的错字竟是祖父的外号。”; state_add p22-family-legend state:world-vienna-1912:16_

- **1912.09** `p22-warm-naming-feast::ctx-vienna-1912::milieu-tenement/the-cake-falls` tags: infancy, family, feast, name, neighbor, warm, tender, drama
  蛋糕从桌边滑下去，Hermann Kral用围裙接住了，奶油还是蹭了一手，桌布上也留了一块白印。大家把没沾地的半边分着吃；Mitzi Lechner舔着手指说，这是最好吃的一次掉蛋糕。
  _effects: mood 0.05; relation acquaintance with person-alois-lechner; cash -2 (a feast cake); flag +cake_saved_

- **1912.09** `p22-strange-doctor-prediction::ctx-vienna-1912::milieu-tenement/the-doctor-is-optimistic` tags: infancy, family, doctor, illness, omen, strange, dark, drama
  医生说孩子只是瘦，开了一瓶味道很坏的补药，说“过了春天就好了”。Alois Lechner把这句话记了很多年；每年春天，家里都要说一遍，像在核对一张旧账单，药瓶上还贴着手写的标签。
  _effects: mood 0.029999999999999992; state_add p22-child-omen state:world-vienna-1912:15; flag +doctor_optimism_

- **1913.01** `vienna-life-toddler-wrong-cradle/the-blanket-is-wrong` tags: infancy, family, rumour, identity, comic, drama
  Anna Moser盯着Rosa的摇篮看了很久，说这床蓝被子不是这家人的。Rosa Lechner把被子翻过来，角落绣着一个陌生的姓；Rosa却抓着被角不放，像是认得它。Anna Moser退后一步，说“我什么都没说”。
  _effects: flag +wrong_cradle_blanket; knowledge “摇篮里的蓝被子绣着一个陌生的姓。”; mood -0.03_

- **1913.01** `state_tick:p22-child-omen/the-omen-returns/nothing-happens` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  又过了一年，什么也没有发生。Rosa照常吃饭、摔跤、把鞋穿反；那个说过预言的人搬走了。家里把红绳解下来，却没有扔，只收进针线盒最里面，红绳上落了一点灰。
  _effects: state_parameter p22-child-omen.strangeness 40 -> 38; state_parameter p22-child-omen.fear 20 -> 17; state_parameter p22-child-omen.protection 45 -> 47; mood 0.01_

- **1913.01** `state_tick:p22-family-legend/the-story-changes-hands/a-detail-goes-missing` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，故事里最要紧的那件东西不见了：先是名字，后来是地点。Rosa问起时，大人说“你记错了”；可柜子最底层那只空盒子，谁也没有扔，锁却换过了，钥匙也不见了。
  _effects: state_parameter p22-family-legend.secrecy 45 -> 49; state_parameter p22-family-legend.danger 10 -> 13; state_parameter p22-family-legend.warmth 55 -> 53; mood -0.01_

- **1913.06** `vienna-life-birth-letter-from-the-dead/the-letter-is-a-bill` tags: infancy, family, secret, letter, drama
  信里没有问候，只有一张旧账单：棺材、墓地、一趟从边境回来的车费。Rosa Lechner把账单翻过来，背面用铅笔写着“别让孩子知道”。Rosa伸手去抓纸角，Rosa Lechner没有让。
  _effects: cash -4 (paid an old funeral debt); flag +family_debt_letter; mood -0.03_

- **1913.12** `iw18-infancy.first-word::ctx-vienna-1912::milieu-tenement/the-dead-grandmothers-name` tags: infancy, first_word, memory, family, wonder, eerie, vienna, urban
  Rosa扶着桌沿站起来，指着门口的空处，清清楚楚叫出一个名字。屋里没人教过这个词；Rosa Lechner手里的铝勺停在半空。那是去年冬天埋掉的老人的名字，窗外正好有送煤的车经过，铁轮压过石缝。
  _effects: mood -0.03; knowledge “孩子说出的第一个词，是去年死去的祖母的名字。”; flag +first_word_dead_name_

- **1913.12** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Rosa家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 49 -> 53; state_parameter p22-family-legend.warmth 53 -> 55; mood 0.01_
  _causes: evt:world-vienna-1912:000265_

- **1914.01** `vienna-life-toddler-first-words/first-word-nonsense` tags: infancy, family, first, comic
  Rosa说了一长串谁也听不懂的话，最后用力点头，像是在宣布一件已经决定的事。Rosa Lechner认真听完，也点了点头；孩子满意地爬走了，留下大人们互相看着，忍不住笑。
  _effects: mood 0.04000000000000001; skill_

- **1914.02** `vienna-life-toddler-accident/scalded-hand` tags: infancy, accident, family, danger, injury
  厨房的锅盖没有盖严，Rosa伸手去够桌上的勺子，蒸汽先扑到手腕上。Alois Lechner把孩子抱到水缸边，一瓢一瓢地浇冷水；孩子哭得打嗝，锅里的汤还在冒泡。
  _effects: health -0.07999999999999996 (scalded hand); condition; cash -1 (bandages and ointment); mood -0.05_

- **1915.04** `p9-childhood-household.name-day-gift/passed-gift-to-younger` tags: childhood, family, household, home, siblings, illness, neighbors
  Rosa把木马推给弟妹，说“这个给你”，自己翻开那本旧图画书。纸页发黄，角上留着别人的铅笔字。Alois Lechner问真的不要木马吗，Rosa点头，眼睛没离开书页。此后几天，Rosa一有空就翻那本书，连书脊都摸得发亮。
  _effects: relation kin with person-alois-lechner; mood 0.04; flag +likes_reading_

- **1916.01** `vienna-life-child-family-legend/stolen-inheritance` tags: childhood, family, secret, story
  Rosa Lechner说，家里本来有一件东西，后来被“更会说话的人”拿走了。Rosa问是什么，Rosa Lechner只说是一块表，表盖里刻着姓。孩子记住了“表盖里刻着姓”，却没有记住那个姓。
  _effects: knowledge “家里有一块表盖里刻着姓的表，被一个更会说话的人拿走了。”; flag +family_legend_watch_

- **1916.01** `state_tick:p22-child-omen/the-omen-returns/nothing-happens` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  又过了一年，什么也没有发生。Rosa照常吃饭、摔跤、把鞋穿反；那个说过预言的人搬走了。家里把红绳解下来，却没有扔，只收进针线盒最里面，红绳上落了一点灰。
  _effects: state_parameter p22-child-omen.strangeness 38 -> 36; state_parameter p22-child-omen.fear 17 -> 14; state_parameter p22-child-omen.protection 47 -> 49; mood 0.010000000000000002_

- **1916.01** `state_tick:p22-family-legend/the-story-changes-hands/a-detail-goes-missing` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，故事里最要紧的那件东西不见了：先是名字，后来是地点。Rosa问起时，大人说“你记错了”；可柜子最底层那只空盒子，谁也没有扔，锁却换过了，钥匙也不见了。
  _effects: state_parameter p22-family-legend.secrecy 53 -> 57; state_parameter p22-family-legend.danger 13 -> 16; state_parameter p22-family-legend.warmth 55 -> 53; mood -0.010000000000000002_

- **1916.02** `vienna-life-child-inherited-wish/the-dead-grandmothers-wish` tags: childhood, family, wish, grief, uncanny, drama
  Rosa在饭桌上忽然说：“等我长大了，要把那间屋子买回来。”Alois Lechner的勺子停在半空，因为这句话是去世多年的外婆常说的，连“那间屋子”都指得一模一样。Rosa说完就低头喝汤，好像只是随口。
  _effects: flag +inherited_wish_house; knowledge “孩子说要把“那间屋子”买回来，和去世的外婆说过的一模一样。”; mood -0.010000000000000002_

- **1916.03** `statistical_infection`
  Rosa在Lechner-Wohnung, Leopoldstadt病倒了，痢疾让身体发热、虚弱，接下来的日子只能卧床。

- **1916.06** `statistical_illness_worsened`
  Rosa的痢疾没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1916.07** `statistical_death/infant_diarrhoea` tags: death
  Rosa在Lechner-Wohnung, Leopoldstadt连续腹泻了两天，嘴唇干裂，喂水也留不住。家里没有钱再请医生，天亮前孩子停止了呼吸。Franz Lechner在场。
  _effects: death (婴幼儿腹泻与脱水)_
## Emil

Born 1912.01, died 1925.01 (age 13).
Education: none 0; occupation: none; roles: infant, child.

### State snapshot
- wish-love [person] (ended 1925.1: owner_died) parameters={"intensity":0.55,"fixation":0.5,"irony":0.3} links={} ticks=1
- p22-family-legend [person] (ended 1916.11: replaced_by:p22-family-legend) parameters={"warmth":67,"secrecy":39,"danger":15,"promise":55} links={} ticks=0
- p22-family-legend [person] (ended 1920.1: exit condition met) parameters={"warmth":35,"secrecy":77,"danger":60,"promise":67} links={} ticks=2

### 34 subject events

- **1912.02** `vienna-infant-household.laundry-day/scalded-hand` tags: infancy, health, family, home, injury
  Josef Bauer提热水壶往木盆里兑水时壶底脱了焊，滚水溅在左手背上。她咬着牙把壶搁下，Emil被响声惊得大哭。手背起了水泡，接下来三天她只能用一只手洗尿布。
  _effects: health -0.07999999999999996 (左手被开水烫伤); mood -0.05_

- **1913.04** `p22-warm-anonymous-gifts::ctx-vienna-1912::milieu-tenement/the-gifts-stop` tags: infancy, family, gift, poverty, neighbor, warm, mystery, drama
  家里四处打听以后，包裹不再来了。Emil的鞋已经顶脚，Josef Bauer把那只毛线小鞋拆开，添了线，重新织成一只手套；手套只有一只，另一只留给明年，虽然明年可能就不冷了。
  _effects: mood -0.03; cash 1 (the bootee was unravelled and reused); flag +gifts_stopped; condition_

- **1913.06** `vienna-life-birth-letter-from-the-dead/the-letter-is-real` tags: infancy, family, secret, letter, drama
  邮差把一封边角磨白的信塞进门缝，收信人是一个已经死了三年的名字。Josef Bauer把Emil放在膝上，拆开信，里面只有一句：“孩子像不像他？”Hermann Kral在门口探头，问是不是寄错了；Josef Bauer把信折回去，说“没有寄错”。
  _effects: flag +letter_from_dead_relative; knowledge “一封写给死去亲人的信问：孩子像不像他。”; mood -0.04_

- **1913.11** `vienna-life-toddler-wrong-cradle/the-neighbour-is-mistaken` tags: infancy, family, rumour, identity, comic, drama
  Josef Bauer把被子摊在桌上，指着上面的补丁说这是外婆的针脚。Helene Winter看了半天，承认自己认错了；Emil在旁边把一只木勺敲得咚咚响，像在给这场争论判案。
  _effects: relation acquaintance with person-helene-winter; mood 0.02; skill_

- **1914.01** `vienna-life-toddler-first-words/first-word-door` tags: infancy, family, first, comic
  门外有人上楼，Emil忽然指着门说：“爸爸。”Josef Bauer看了看空门口，没有纠正。那天晚上，孩子把家里每个人的名字都叫了一遍，叫错两个，却叫得很认真。
  _effects: skill; mood 0.02; flag +first_word_door_

- **1915.01** `vienna-life-child-family-legend/stolen-inheritance` tags: childhood, family, secret, story
  Josef Bauer说，家里本来有一件东西，后来被“更会说话的人”拿走了。Emil问是什么，Josef Bauer只说是一块表，表盖里刻着姓。孩子记住了“表盖里刻着姓”，却没有记住那个姓。
  _effects: knowledge “家里有一块表盖里刻着姓的表，被一个更会说话的人拿走了。”; flag +family_legend_watch_

- **1916.01** `vienna-life-child-first-friend/stolen-marble` tags: childhood, friendship, family, comic
  Hedwig把Emil的玻璃弹珠藏进鞋里，被当场看见。Hedwig说只是“替你拿着”，Emil没有揭穿，也没有再拿出第二颗。两个人蹲在墙根，把一只蚂蚁看了很久，谁也没有先回家。
  _effects: relation friend with person-phase15-Hedwig-world-vienna-1912; skill; mood -0.01_

- **1916.01** `p22-comic-mistaken-child::ctx-klosterneuburg-rural-1912::milieu-tenement/the-cherries-under-the-stall` tags: childhood, family, market, neighbor, mistaken_identity, comic, tender, drama
  市场尽头，一个老太太抓住Emil的手腕，说“你可回来了”。Emil低头看见摊子底下露出两只鞋；真正的孩子正躲在那里吃樱桃，嘴边全是红的，手里还攥着老太太的篮子。
  _effects: mood 0.04000000000000001; relation acquaintance with person-phase15-Emil-world-vienna-1912; flag +mistaken_for_grandson; cash 1 (a handful of cherries)_

- **1916.01** `p22-warm-night-move::ctx-klosterneuburg-rural-1912::milieu-tenement/the-cradle-goes-first` tags: childhood, family, move, neighbor, tenement, warm, bittersweet, drama
  搬家定在夜里，怕白天遇见旧房东。Berta Weiss在前面打灯，Josef Bauer抱着摇篮，Emil抱着一只枕头跟在后面。新屋有一扇能看见院子的窗，孩子把枕头放在窗台上，说这是给月亮留的。
  _effects: mood 0.05; health 0.01 (a less crowded room); relation acquaintance with person-phase15-Emil-world-vienna-1912; cash -3 (moving at night); flag +moved_at_night; state_add p22-family-legend state:world-vienna-1912:34_

- **1916.01** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Emil家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 35 -> 39; state_parameter p22-family-legend.warmth 65 -> 67; mood 0.009999999999999995_
  _causes: evt:world-vienna-1912:000655_

- **1916.11** `p22-drama-inheritance-papers::ctx-klosterneuburg-rural-1912::milieu-tenement/the-seal-is-wrong` tags: childhood, family, inheritance, papers, secret, official, dramatic, dark
  Emil把墨水瓶碰倒在继承文书上。Josef Bauer一边擦一边看见，纸角的火漆印是去年的，文书却写着十年前的日期。公证人伸手去够那张纸，慢了一步，脸一下子白了。
  _effects: knowledge “继承文书上的火漆印比文书日期新。”; flag +wrong_seal; mood -0.030000000000000027; cash -2 (ink and a ruined envelope); state_add p22-family-legend state:world-vienna-1912:35_

- **1917.01** `vienna-life-child-inherited-wish/the-child-wants-a-dog` tags: childhood, family, wish, grief, uncanny, drama
  Emil说那句话只是想要一只狗，而且要“会看门的、不咬人的、像外婆家那只一样”。Josef Bauer松了一口气，又有点失落；那天下午，两个人用旧毛线给一只并不存在的狗量了脖围。
  _effects: mood 0.04; skill_

- **1917.01** `state_tick:p22-family-legend/the-story-changes-hands/told-at-the-table` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，Emil家的故事在饭桌上换了新的讲法：多了一句笑话，少了一处哭声。听的人把汤匙放下，等下一句；讲故事的人却先去看窗子有没有关好，谁也没有先动筷子。
  _effects: state_parameter p22-family-legend.warmth 30 -> 33; state_parameter p22-family-legend.secrecy 75 -> 73; state_parameter p22-family-legend.promise 65 -> 67; mood 0.010000000000000009_

- **1917.03** `vienna-early-childhood.fever-night/home-remedy` tags: childhood, family, home, street
  Emil烧得翻来覆去，Josef Bauer把醋倒进温水，用布蘸着擦手心、脚心，又去灶间煮接骨木汁。勺子送到嘴边，Emil偏头躲，Josef Bauer就等一会儿再喂。鸡叫时炉火压小，床脚用旧大衣堵住。两天后热度退了，嘴唇起了一层干皮。
  _effects: health 0.03 (土法退烧，热度渐退); mood -0.06_

- **1917.06** `p9-childhood-household.supper-bowl/gave-potato-to-younger` tags: childhood, family, household, home, siblings, illness, neighbors
  Josef的碗先见了底，Emil把自己那块土豆拨过去，说“我不爱吃面的”。Josef Bauer没拆穿，转身去灶口添煤，回来时把半片香肠压在Emil的面包下面。锅底刮得响，Emil把香肠又分了一半给Josef。
  _effects: food; relation kin with person-phase15-Josef-world-vienna-1912; mood 0.03_

- **1917.06** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Emil家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 73 -> 77; state_parameter p22-family-legend.warmth 33 -> 35; mood 0.010000000000000009_
  _causes: evt:world-vienna-1912:000807_

- **1917.07** `vienna-childhood-street.washhouse-fever/fever-recover` tags: childhood, street, social, home, injury
  洗衣房里全是蒸汽和碱水味。Emil靠在墙边等Josef Bauer，湿衣服堆在脚边。夜里Emil开始发烧，Josef Bauer把湿布叠成长条，敷在额头，凉了再换。三天后热度退下去，Emil的嘴唇起了一层白皮，Josef Bauer的手指也裂了口子。
  _effects: health -0.03 (热病高烧); condition; relation kin with person-josef-bauer_

- **1918.01** `p9-gap-childhood-chores.laundry-help/laundry-three-heller` tags: childhood, household, chores, school, task, daily, laundry, work
  “拽平，别留褶。”Hermann Kral在绳子那头喊。Emil踮着脚把床单拉直，碱水把指缝泡得发白。收工时天已经黑了，Hermann Kral数了三赫勒，又在围裙上擦干手才递过来。Emil把钱塞进袜筒，回家路上一直攥着，虎口的裂口沾了汗，火辣辣地疼。
  _effects: cash 0.03 (帮邻居晾床单挣的三赫勒); relation acquaintance with person-hermann-kral; relation acquaintance with person-materialized-world-vienna-1912-18_

- **1919.01** `p9-gap-childhood-chores.fetch-coal/coal-refused-nuggets` tags: childhood, household, chores, school, task, daily, coal, errand
  Emil空手站在窗口，听掌柜说“叫你Josef Bauer来”，耳朵一直红到脖子。后墙的渣堆冻得硬，Emil用鞋尖刨开表层，把煤核一颗颗捡进围裙。回家路上碰到同巷的孩子，Emil把纸袋往身后藏，进门才交给Josef Bauer。
  _effects: mood -0.04000000000000001; food; skill; relation acquaintance with person-materialized-world-vienna-1912-17_

- **1919.01** `vienna-childhood-street.cigarette-card/card-gift` tags: childhood, street, social, home
  Emil每天放学都在柜台前站一会儿，看玻璃板底下压着的烟画，顺手把歪了的报纸摞齐。Anton擦完柜台，从抽屉最里面摸出一张揉皱的风景卡，边角还沾着烟丝，塞过来时说了句“别挡着门”。Emil把卡夹进课本，第二天带了一张重复的来给Anton看。
  _effects: mood 0.06; reputation 0.02; relation friend with person-phase15-Anton-world-vienna-1912_

- **1919.02** `vienna-childhood-friends.courtyard-race/fell-on-wet-stones` tags: childhood, social, school, street
  Emil想从床单底下钻过去，脚下一滑，膝盖磕在石板棱上。Sigmund Freud听见哭声出来，先看了看伤口，又回去端水。手帕扎得很紧，Emil试着站起来，被Sigmund Freud按回台阶上。
  _effects: relation acquaintance with person-sigmund-freud_

- **1920.01** `state_exit:p22-family-legend` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  Emil不再处于「家族传说」；条件已经改变。
  _effects: state_remove p22-family-legend state:world-vienna-1912:35_

- **1920.01** `p9-gap-childhood-chores.market-line/line-both-families` tags: childhood, household, chores, school, task, daily, market, food
  Luise Kral把Emil拽到队伍前头，往自己身前塞，说“孩子占不了多大地儿”。窗口一次递出两包面包，Emil把邻居那包夹在胳肢窝，自己这包抱在胸前。到Leopoldstädter Zinshaus, gemeinsamer Gang门口，Emil蹲下把两包并排，按Luise Kral说的份量分开，连找零的铜板也分成两小堆。
  _effects: food; relation acquaintance with person-luise-kral; skill; relation acquaintance with person-materialized-world-vienna-1912-6_

- **1921.01** `p9-gap-childhood-chores.fetch-coal/coal-neighbor-speaks` tags: childhood, household, chores, school, task, daily, coal, errand
  掌柜不肯赊，Hermann Winter从队尾挤过来，说这户人家的男人在印刷所做了十年，欠不了一筐煤。掌柜把“两赫勒”写在门牌号旁边，煤只装了小半筐。Emil抱着筐经过Hermann Winter身边，Hermann Winter替Emil把绳结紧了紧。
  _effects: cash -0.02 (赊账添的两赫勒利息); food; relation acquaintance with person-materialized-world-vienna-1912-17_

- **1922.01** `p9-gap-childhood-chores.laundry-help/laundry-three-heller` tags: childhood, household, chores, school, task, daily, laundry, work
  床单浸了碱水，沉得拽不动。Emil站在木凳上，把湿布一点点递过绳，水顺着肘弯滴进袖口。Anna Moser在绳头数夹子，最后一条挂好，从围裙口袋里摸出三枚赫勒，按进Emil掌心。晚上洗手时，虎口那道口子被水一蜇，Emil才看见。
  _effects: cash 0.03 (帮邻居晾床单挣的三赫勒); relation acquaintance with person-materialized-world-vienna-1912-31_

- **1922.04** `vienna-childhood-friends.hidden-book/book-confiscated` tags: childhood, social, school, street
  书页在桌肚里翻动时，Rosa Winter已经站在旁边。Emil的手还按在算术本上，书被抽走，书脊在讲台边磕了一声。Rosa Winter看了一眼折角，说“放学留下”，又拉开抽屉把书放进去。Emil盯着抽屉缝，整节课没听进去。
  _effects: mood -0.04999999999999999; relation acquaintance with person-materialized-world-vienna-1912-15; relation acquaintance with person-materialized-world-vienna-1912-15_

- **1922.04** `vienna-childhood-street.cigarette-card/card-gift` tags: childhood, street, social, home
  Emil每天放学都在柜台前站一会儿，看玻璃板底下压着的烟画，顺手把歪了的报纸摞齐。Emil Winter擦完柜台，从抽屉最里面摸出一张揉皱的风景卡，边角还沾着烟丝，塞过来时说了句“别挡着门”。Emil把卡夹进课本，第二天带了一张重复的来给Emil Winter看。
  _effects: mood 0.06; reputation 0.02; relation friend with person:evt:world-vienna-1912:000337:child_

- **1922.11** `p9-childhood-household.name-day-gift/wooden-horse` tags: childhood, family, household, home, siblings, illness, neighbors
  Josef Bauer把报纸包推到Emil面前，包得紧，Emil拆到第三层才看见木头。木马只有巴掌大，四条腿磨得圆滑，鬃毛是一刀一刀刻出来的。Emil把它揣进衣襟，上楼时用手护着，晚上放在枕头边，袖口蹭了一道黑印。
  _effects: mood 0.08000000000000002; relation kin with person-josef-bauer_

- **1923.01** `p9-gap-childhood-chores.fetch-coal/coal-half-credit` tags: childhood, household, chores, school, task, daily, coal, errand
  “月底一起结。”掌柜说完，把半筐煤推到柜台外。Emil用胸口顶住筐沿往家挪，煤灰落进领口，手心被麻绳磨得发亮。Josef Bauer在Leopoldstädter Zinshaus, gemeinsamer Gang门口等到人，先看了看筐底，再看了看Emil的手，把漏掉的碎渣扫进簸箕。
  _effects: food; relation kin with person-josef-bauer_

- **1924.01** `state_tick:wish-love/love-pressure/put-away` tags: wish-love, wish, wish:love, love, family, intimacy, state, state_tick
  Emil暂时把那件事收进抽屉；日子还有别的东西要应付。
  _effects: mood -0.020000000000000018_

- **1924.01** `task-vienna-poor-apprentice.foreman-introduction/foreman-records-name` tags: adolescence, apprentice, work, education, poverty, printshop, task, task:work
  工头说暂时没有空缺，但答应把他的名字记在招工簿上。亲戚在旁边补了两句好话，工头只点点头；他走出来时，招工簿还摊在门房的木台上。
  _effects: flag +name_in_hiring_book; relation acquaintance with person-materialized-world-vienna-1912-25; mood -0.01999999999999999; relation acquaintance with person-materialized-world-vienna-1912-25_

- **1924.02** `p9-childhood-adolescence.church-club/club-sign-up-hike` tags: adolescence, friendship, identity, work, school, secret, church
  Emil把十赫勒放在桌上的铁皮盒里，翻到歌本最后一页，用铅笔写下自己的名字。Mitzi Lechner在后面戳Emil的背，说乡下的草地能躺着听云。
  _effects: cash -10 (青年会远足车费（其中7.2克朗记入债务）); relation friend with person-mitzi-lechner; mood 0.030000000000000027_

- **1924.02** `vienna-adolescence.brothers-torn-jacket/sell-the-coat` tags: adolescence, school, work, family, social
  巷口的风把外套下摆吹起来。旧货贩子闻了闻领子，说给两克朗。Emil把钱卷进袜筒，回家前在楼梯口站了一会儿。Josef Bauer发现衣钩空了，问了三遍，Emil都说没看见，脚趾在鞋里把硬币越踩越紧。
  _effects: cash 2 (卖掉哥哥旧外套); relation kin with person-josef-bauer; mood -0.03999999999999998_

- **1925.01** `statistical_death/accident` tags: death
  Emil在Leopoldstädter Zinshaus, gemeinsamer Gang附近出了事故。工友和路人把人抬到门口，等医生赶到时已经没有了呼吸。Anna Bauer在场。
  _effects: death (意外事故)_
## Lena

Born 1912.01, died 1957.01 (age 45).
Education: apprenticeship 1; occupation: none; roles: infant, child, factory_hand, first_aid_certified, officers_valet, movement_member, waiting_spouse, registered_resident, keeper_of_family_secret, resistance_courier, bondholder, liberated_1945, housing_waitlist, partner, plot_owner, family_debtor, grave_visitor, apologized_publicly.

### State snapshot
- p22-family-legend [person] (ended 1913.10: replaced_by:p22-family-legend) parameters={"warmth":80,"secrecy":17,"danger":5,"promise":62} links={} ticks=1
- p22-child-omen [person] (ended 1920.1: duration expired) parameters={"strangeness":48,"attention":43,"protection":47,"fear":23} links={} ticks=4
- p22-family-legend [person] (ended 1918.1: duration expired) parameters={"warmth":80,"secrecy":24,"danger":5,"promise":69} links={} ticks=3
- apprenticeship-contract [person] (ended 1930.1: duration expired) parameters={"progress":65,"failures":1,"trade":"木工","paid":true} links={} ticks=4
- yf18-first-awakening [person] (ended 1931.1: duration expired) parameters={"intensity":81,"nerve":20,"talk":19,"reciprocated":true,"secret":true} links={"beloved":"Hedwig"} ticks=4
- ld18-public-desire [person] (ended 1932.1: duration expired) parameters={"spectacle":34,"rumorHeat":45,"defiance":10,"protection":0,"shame":49} links={} ticks=4
- bc18-bureaucratic-ghost [person] (ended 1933.1: duration expired) parameters={"fileDepth":44,"sightings":2,"risk":47,"duplicates":3,"officialStatus":"在更正后成为新生儿","alias":"一份注销的配给卡"} links={} ticks=3
- sm18-missing-object [person] (ended 1942.1: duration expired) parameters={"attachment":55,"leads":25,"suspicion":34,"object":"孩子的洗礼铜牌"} links={} ticks=4
- ld18-impossible-attachment [person] (ended 1945.1: the pressure made the attachment publicly legible) parameters={"devotion":82,"improvisation":60,"pressure":90,"discretion":26,"grief":12,"named":"the laundry-bill vows"} links={"beloved":"Luise Winter"} ticks=8
- p23-dangerous-secret [person] (ended 1946.1: duration expired) parameters={"exposure":79,"leverage":13,"bodies":0,"loyalty":17} links={} ticks=2
- known-affair [person] (ended 1944.1: duration expired) parameters={"notoriety":35,"grief":0,"exposure":75,"discretion":30,"remarried":false,"origin":"exposed"} links={} ticks=2
- p21-scandal-web [person] (ended 1947.1: duration expired) parameters={"exposure":85,"loyalty":7,"leverage":68,"danger":71} links={"keeper":"Helene Weiss"} ticks=6
- hs18-street-witness [person] (ended 1947.1: duration expired) parameters={"certainty":66,"danger":35,"retellings":0,"claim":"我用两条烟换回了邻居的钢琴，琴凳还在他们手里。","quiet":false} links={} ticks=4
- public-scandal [person] (ended 1945.1: replaced_by:known-affair) parameters={} links={} ticks=0
- p22-scandal-engine [person] (ended 1946.1: duration expired) parameters={"heat":64,"reach":57,"leverage":27,"shame":63} links={} ticks=2
- debt-bondage [person] (ended 1946.1: replaced_by:debt-bondage) parameters={"debt":49,"creditor":"遗产税征收员"} links={"creditor":"Elisabeth Huber"} ticks=2
- p21-fortune-reversal [person] (ended 1946.1: exit condition met) parameters={"height":3,"fragility":100,"witnesses":45,"debt":80} links={} ticks=3
- pl19-protected-scandal [person] (ended 1947.1: duration expired) parameters={"exposure":25,"protection":68,"leverage":27,"publicHeat":28} links={"lover":"Otto Huber","protector":"Anton Stein"} ticks=4
- known-affair [person] (ended 1946.1: replaced_by:known-affair) parameters={"notoriety":30,"grief":12,"exposure":80,"discretion":26,"remarried":false,"origin":"exposed"} links={} ticks=0
- under-investigation [person] (ended 1948.1: duration expired) parameters={"progress":35,"charge":"过失"} links={} ticks=2
- debt-bondage [person] (ended 1949.1: duration expired) parameters={"debt":29,"creditor":"邻居的律师"} links={} ticks=3
- p23-political-debt [person] (ended 1949.1: duration expired) parameters={"favor":45,"threat":41,"visibility":34,"conscience":44} links={} ticks=2
- known-affair [person] (ended 1948.1: duration expired) parameters={"notoriety":68,"grief":10,"exposure":75,"discretion":50,"remarried":false,"origin":"exposed"} links={} ticks=2
- p22-wild-fortune [person] (ended 1947.1: replaced_by:p22-wild-fortune) parameters={"height":54,"absurdity":80,"witnesses":61,"fragility":49} links={} ticks=1
- p22-scandal-engine [person] (ended 1948.1: duration expired) parameters={"heat":29,"reach":47,"leverage":36,"shame":17} links={} ticks=2
- ld18-impossible-attachment [person] (ended 1948.1: duration expired) parameters={"devotion":78,"improvisation":60,"pressure":29,"discretion":55,"grief":8,"named":"the laundry-bill vows"} links={"beloved":"Elisabeth Huber"} ticks=3
- p23-dangerous-secret [person] (ended 1950.1: duration expired) parameters={"exposure":36,"leverage":7,"bodies":0,"loyalty":43} links={} ticks=2
- p22-wild-fortune [person] (ended 1950.1: duration expired) parameters={"height":59,"absurdity":65,"witnesses":63,"fragility":44} links={} ticks=2
- df18-borrowed-luck [person] (ended 1950.1: duration expired) parameters={"luck":18,"debt":39,"creditorKnown":true,"price":"unknown"} links={"creditor":"Katharina Weiss"} ticks=4
- under-investigation [person] (ended 1950.1: duration expired) parameters={"progress":70,"charge":"诈骗"} links={} ticks=2
- ad20-public-attention [person] (ended 1950.1: duration expired) parameters={"attention":53,"sympathy":33,"danger":35,"opportunity":17} links={} ticks=3
- bc18-ridiculous-fame [person] (ended 1957.1: owner_died) parameters={"notoriety":22,"legitimacy":0,"absurdity":45,"invitations":0,"boredom":32,"officialStory":"被刮掉的名字"} links={} ticks=1

### 279 subject events

- **1912.02** `p22-warm-naming-feast::ctx-vienna-1912::milieu-tenement/the-name-is-too-long` tags: infancy, family, feast, name, neighbor, warm, tender, drama
  两个祖母的名字都想要，最后写在纸上连成一串。Anna Moser念到一半就笑了，说这孩子以后签名字要多蘸一次墨水；Lena在摇篮里睡着，拳头举在耳边，蛋糕上只插了一根蜡烛。
  _effects: mood 0.04; relation acquaintance with person-phase15-Lena-world-vienna-1912; flag +double_name; knowledge “我的名字里有两个祖母的名字。”; state_add p22-family-legend state:world-vienna-1912:12_

- **1912.03** `vienna-life-infant-first-smile/colic-night` tags: infancy, family, first, warm, injury
  夜里Lena哭了很久，Josefine Hofer抱着孩子在屋里来回走，数着地板缝。天快亮时孩子终于打了个嗝，安静下来；Josefine Hofer坐在床沿，发现自己还保持着走路的姿势。
  _effects: mood -0.030000000000000006; health -0.010000000000000009 (lost sleep)_

- **1912.10** `p22-strange-doctor-prediction::ctx-vienna-1912::milieu-tenement/the-doctor-is-optimistic` tags: infancy, family, doctor, illness, omen, strange, dark, drama
  医生说孩子只是瘦，开了一瓶味道很坏的补药，说“过了春天就好了”。Friedrich Hofer把这句话记了很多年；每年春天，家里都要说一遍，像在核对一张旧账单，药瓶上还贴着手写的标签。
  _effects: mood 0.03; health 0.010000000000000009 (a tonic and a hopeful sentence); state_add p22-child-omen state:world-vienna-1912:13; flag +doctor_optimism_

- **1912.10** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Lena家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 15 -> 19; state_parameter p22-family-legend.warmth 75 -> 77; mood 0.01_
  _causes: evt:world-vienna-1912:000094_

- **1913.01** `vienna-life-toddler-first-words/first-word-more` tags: infancy, family, first, comic
  Lena把空碗推回Friedrich Hofer面前，清清楚楚地说了一个字：“还要。”Friedrich Hofer愣住，随后把锅底最后一点糊刮进碗里。孩子学会了用一句话让世界再转一圈。
  _effects: skill; mood 0.03_

- **1913.01** `state_tick:p22-family-legend/the-story-changes-hands/told-at-the-table` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，Lena家的故事在饭桌上换了新的讲法：多了一句笑话，少了一处哭声。听的人把汤匙放下，等下一句；讲故事的人却先去看窗子有没有关好，谁也没有先动筷子。
  _effects: state_parameter p22-family-legend.warmth 77 -> 80; state_parameter p22-family-legend.secrecy 19 -> 17; state_parameter p22-family-legend.promise 60 -> 62; mood 0.01_

- **1913.01** `state_tick:p22-child-omen/the-omen-returns/the-coincidence-repeats` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  又过了一年，同一件小事又发生了：钟停在同一个时刻，门口的狗对着空处叫。Lena正在学系鞋带，抬头问“又来了吗”；大人说没有，手却先去摸门框，谁也没有回答。
  _effects: state_parameter p22-child-omen.strangeness 40 -> 45; state_parameter p22-child-omen.attention 35 -> 39; state_parameter p22-child-omen.fear 20 -> 23; mood -0.01_

- **1913.04** `vienna-life-toddler-wrong-cradle/the-blanket-is-wrong` tags: infancy, family, rumour, identity, comic, drama
  Anna Moser盯着Lena的摇篮看了很久，说这床蓝被子不是这家人的。Josefine Hofer把被子翻过来，角落绣着一个陌生的姓；Lena却抓着被角不放，像是认得它。Anna Moser退后一步，说“我什么都没说”。
  _effects: flag +wrong_cradle_blanket; knowledge “摇篮里的蓝被子绣着一个陌生的姓。”; mood -0.03_

- **1913.10** `p22-warm-fathers-letter::ctx-vienna-1912::milieu-tenement/the-recipe-arrives` tags: infancy, family, letter, uncle, warm, melancholy, memory, drama
  信是叔叔死前写的，在邮袋里压了两年才到。Friedrich Hofer拆开时先笑出声：里面没有遗言，只有一张李子饺子的做法和一个关于祖母的笨笑话。那天晚上，全家真的吃了饺子。
  _effects: state_add p22-family-legend state:world-vienna-1912:26; mood 0.04000000000000001; knowledge “家里有一封叔叔留下的信，里面写着李子饺子的做法。”_

- **1913.10** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Lena家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 20 -> 24; state_parameter p22-family-legend.warmth 70 -> 72; mood 0.01_
  _causes: evt:world-vienna-1912:000256_

- **1914.01** `vienna-life-birth-letter-from-the-dead/the-neighbour-takes-it` tags: infancy, family, secret, letter, drama
  Hermann Kral把信从门缝里抽走，说这封信已经转过三家，不该再往这里送。Friedrich Hofer问上面写了什么；Hermann Kral把信折成四折塞进自己口袋，说“都是旧账”。那天夜里，Friedrich Hofer在厨房坐到很晚。
  _effects: flag +neighbor_intercepted_letter; relation acquaintance with person-hermann-kral; mood -0.019999999999999997_

- **1914.01** `state_tick:p22-family-legend/the-story-changes-hands/told-at-the-table` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，Lena家的故事在饭桌上换了新的讲法：多了一句笑话，少了一处哭声。听的人把汤匙放下，等下一句；讲故事的人却先去看窗子有没有关好，谁也没有先动筷子。
  _effects: state_parameter p22-family-legend.warmth 72 -> 75; state_parameter p22-family-legend.secrecy 24 -> 22; state_parameter p22-family-legend.promise 65 -> 67; mood 0.009999999999999998_

- **1914.02** `vienna-life-toddler-accident/scalded-hand` tags: infancy, accident, family, danger, injury
  厨房的锅盖没有盖严，Lena伸手去够桌上的勺子，蒸汽先扑到手腕上。Friedrich Hofer把孩子抱到水缸边，一瓢一瓢地浇冷水；孩子哭得打嗝，锅里的汤还在冒泡。
  _effects: health -0.07999999999999996 (scalded hand); condition; cash -1 (bandages and ointment); mood -0.05_

- **1915.02** `vienna-early-childhood.stairwell-fall/arm-bruise` tags: childhood, family, home, street, injury
  楼梯间的灯罩空着，第三级踏板比别处高。Lena一脚踩空，滚到平台，右小臂磕在铁扶手的弯头上。Josefine Hofer听见哭声跑出来，把Lena抱回屋，用冷水毛巾敷那块青紫，再用旧布条缠了两圈。夜里Lena哭醒两次。
  _effects: health -0.040000000000000036 (从楼梯滚下，小臂挫伤); mood -0.05_

- **1915.02** `vienna-life-child-family-legend/stolen-inheritance` tags: childhood, family, secret, story
  Friedrich Hofer说，家里本来有一件东西，后来被“更会说话的人”拿走了。Lena问是什么，Friedrich Hofer只说是一块表，表盖里刻着姓。孩子记住了“表盖里刻着姓”，却没有记住那个姓。
  _effects: knowledge “家里有一块表盖里刻着姓的表，被一个更会说话的人拿走了。”; flag +family_legend_watch_

- **1916.01** `vienna-life-child-first-friend/shared-toy` tags: childhood, friendship, family, comic
  Hedwig在楼道里滚一只铁环，Lena站在门口看。Hedwig把铁环推过来，说“你推一次，我推一次”。两个人从楼梯口推到院子里，铁环倒下的声音把午睡的大人吵醒了一排。
  _effects: relation friend with person-phase15-Hedwig-world-vienna-1912; skill; mood 0.05_

- **1916.01** `state_tick:p22-child-omen/the-omen-returns/nothing-happens` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  又过了一年，什么也没有发生。Lena照常吃饭、摔跤、把鞋穿反；那个说过预言的人搬走了。家里把红绳解下来，却没有扔，只收进针线盒最里面，红绳上落了一点灰。
  _effects: state_parameter p22-child-omen.strangeness 45 -> 43; state_parameter p22-child-omen.fear 23 -> 20; state_parameter p22-child-omen.protection 45 -> 47; mood 0.009999999999999995_

- **1917.01** `vienna-life-child-inherited-wish/the-child-wants-a-dog` tags: childhood, family, wish, grief, uncanny, drama
  Lena说那句话只是想要一只狗，而且要“会看门的、不咬人的、像外婆家那只一样”。Friedrich Hofer松了一口气，又有点失落；那天下午，两个人用旧毛线给一只并不存在的狗量了脖围。
  _effects: mood 0.04000000000000001; skill_

- **1917.01** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Lena家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 22 -> 26; state_parameter p22-family-legend.warmth 75 -> 77; mood 0.010000000000000009_
  _causes: evt:world-vienna-1912:000663_

- **1917.01** `state_tick:p22-family-legend/the-story-changes-hands/told-at-the-table` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，Lena家的故事在饭桌上换了新的讲法：多了一句笑话，少了一处哭声。听的人把汤匙放下，等下一句；讲故事的人却先去看窗子有没有关好，谁也没有先动筷子。
  _effects: state_parameter p22-family-legend.warmth 77 -> 80; state_parameter p22-family-legend.secrecy 26 -> 24; state_parameter p22-family-legend.promise 67 -> 69; mood 0.010000000000000009_

- **1917.12** `vienna-early-childhood.stairwell-fall/arm-bruise` tags: childhood, family, home, street, injury
  黑楼梯间只有门缝透进来的一点光。Lena踩空时伸手去抓扶手，手臂先撞在铁端上，整个人滚下三级。Josefine Hofer把Lena抱到灶边，拿湿冷毛巾按住肿起的地方，又撕了一条旧布缠紧。第二天Lena举着胳膊下楼，照样去院子里玩。
  _effects: health -0.040000000000000036 (从楼梯滚下，小臂挫伤); mood -0.04999999999999999_

- **1918.01** `state_expire:p22-family-legend` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  Lena的「家族传说」到期；相关安排结束。
  _effects: state_remove p22-family-legend state:world-vienna-1912:26_

- **1918.01** `p9-gap-childhood-chores.market-line/line-sold-out-potatoes` tags: childhood, household, chores, school, task, daily, market, food
  “卖完了。”三个字从窗口里传出来，Lena后面的队伍立刻散了一半。Lena没走，趴在窗台上看伙计扫面屑，直到人家挥手赶人。旁边摊子的土豆带着泥，Lena用围裙兜住，一枚一枚数铜板，回家报账时连找零都说清了。
  _effects: food; mood -0.03; skill_

- **1919.01** `state_tick:p22-child-omen/the-omen-returns/the-coincidence-repeats` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  又过了一年，同一件小事又发生了：钟停在同一个时刻，门口的狗对着空处叫。Lena正在学系鞋带，抬头问“又来了吗”；大人说没有，手却先去摸门框，谁也没有回答。
  _effects: state_parameter p22-child-omen.strangeness 43 -> 48; state_parameter p22-child-omen.attention 39 -> 43; state_parameter p22-child-omen.fear 20 -> 23; mood -0.009999999999999995_

- **1919.01** `p9-gap-childhood-chores.laundry-help/laundry-three-heller` tags: childhood, household, chores, school, task, daily, laundry, work
  “拽平，别留褶。”Anna Bauer在绳子那头喊。Lena踮着脚把床单拉直，碱水把指缝泡得发白。收工时天已经黑了，Anna Bauer数了三赫勒，又在围裙上擦干手才递过来。Lena把钱塞进袜筒，回家路上一直攥着，虎口的裂口沾了汗，火辣辣地疼。
  _effects: cash 0.03 (帮邻居晾床单挣的三赫勒); health -0.030000000000000027 (碱水泡手，虎口裂开); relation acquaintance with person-anna-bauer; relation acquaintance with person-materialized-world-vienna-1912-18_

- **1920.01** `state_expire:p22-child-omen` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  Lena的「孩子身上的兆头」到期；相关安排结束。
  _effects: state_remove p22-child-omen state:world-vienna-1912:13_

- **1920.01** `p9-gap-childhood-chores.market-line/line-sold-out-potatoes` tags: childhood, household, chores, school, task, daily, market, food
  “卖完了。”三个字从窗口里传出来，Lena后面的队伍立刻散了一半。Lena没走，趴在窗台上看伙计扫面屑，直到人家挥手赶人。旁边摊子的土豆带着泥，Lena用围裙兜住，一枚一枚数铜板，回家报账时连找零都说清了。
  _effects: food; mood -0.03; skill; relation acquaintance with person-materialized-world-vienna-1912-7_

- **1921.01** `p9-gap-childhood-chores.laundry-help/laundry-bread-with-friend` tags: childhood, household, chores, school, task, daily, laundry, work
  Helene Weiss家的孩子站在绳子另一头，Lena递夹子时故意慢半拍，两个人把床单拉得没有一道褶。收工后Helene Weiss端出半包隔夜面包，掰开时掉了一桌屑。Lena把分到的那块用围裙兜住，回家路上闻着麦味，硬是没咬。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-10; skill; relation acquaintance with person-materialized-world-vienna-1912-10; relation acquaintance with person-materialized-world-vienna-1912-31_

- **1922.01** `p9-gap-childhood-chores.market-line/line-half-flour` tags: childhood, household, chores, school, task, daily, market, food
  面粉袋压在胸口，越抱越沉。Lena前面的大婶一直往后靠，Lena就把膝盖顶住对方的篮子，硬留出半步。买到半袋面粉后，Lena的鞋跟留在人堆里，找回来时鞋面全是泥。回家路上布袋换了两次肩，赤脚踩过石板时脚底发麻。
  _effects: food; health -0.020000000000000018 (赤脚走石板路磨伤脚底); skill; relation acquaintance with person-materialized-world-vienna-1912-12_

- **1922.03** `statistical_infection`
  Lena在Lechner-Wohnung, Leopoldstadt病倒了，伤寒让身体发热、虚弱，接下来的日子只能卧床。

- **1922.04** `statistical_recovery`
  Lena从伤寒中慢慢恢复，能下床喝水，但身体还虚弱。

- **1923.01** `p9-gap-childhood-chores.laundry-help/laundry-bread-with-friend` tags: childhood, household, chores, school, task, daily, laundry, work
  Hermann Kral家的孩子站在绳子另一头，Lena递夹子时故意慢半拍，两个人把床单拉得没有一道褶。收工后Hermann Kral端出半包隔夜面包，掰开时掉了一桌屑。Lena把分到的那块用围裙兜住，回家路上闻着麦味，硬是没咬。
  _effects: food; relation acquaintance with person-hermann-kral; skill_

- **1924.02** `p9-childhood-adolescence.courtyard-gang/gang-prater-locked-out` tags: adolescence, friendship, identity, work, school, secret, church
  Lena跟着Anton穿过普拉特大街，看人放完焰火才想起回家。院门已经上了闩，母亲的灯灭了，Lena在楼梯间坐到后半夜，膝盖冻得发僵。
  _effects: mood -0.020000000000000004_

- **1926.01** `p9-childhood-youth-aspiration.join-a-club/joined-and-borrowed` tags: adolescence, education, aspiration, school, books, club, exam, task
  Lena跟着Katharina Hofer走进印刷厂后面的屋子，交了十赫勒会费，在借书簿上按了手印。他挑了一本讲蒸汽机的册子，封面烫金已经磨掉；管理员说下月十赫勒要按时交，书才能续借。
  _effects: cash -0.1 (工人青年会月费); skill; relation friend with person-materialized-world-vienna-1912-55; flag +workers_youth_member; mood 0.04000000000000001; relation acquaintance with person-materialized-world-vienna-1912-55_

- **1926.04** `r15-work.master-takes-on::ctx-vienna-reform-1930::milieu-tenement/signed-contract` tags: work, craft, apprentice, trade, poverty, reform, medical, schooling
  Josef Berg把学徒契约摊在桌上，指给Lena看期限、工钱和出师考试。Lena签了名，第二天站到刨床前，手指上多了第一道木刺。
  _effects: relation employer with person-materialized-world-vienna-1912-24; state_add apprenticeship-contract state:world-vienna-1912:127; relation acquaintance with person-materialized-world-vienna-1912-24; education apprenticeship; role_

- **1926.11** `r2-leisure.cinema-fire::ctx-vienna-reform-1930::milieu-tenement::cinema-fire-reform/reported-blocked-fire-exit` tags: leisure, cinema, fire, panic, rescue, reform, medical, schooling
  Lena在检查那天看见消防水带被挪去压幕布，检查员一走，又挪了回去。Lena把这事告诉Friedrich Huber，Friedrich Huber说别多事，老板刚交了罚款。当晚电影放到一半，Lena一直盯着侧门，手心里全是汗。
  _effects: mood -0.06; reputation 0.02; condition; flag +reported_blocked_fire_exit; relation friend with person-materialized-world-vienna-1912-22; knowledge “the manager moved the fire hose back behind the screen”; relation acquaintance with person-materialized-world-vienna-1912-26; relation acquaintance with person-materialized-world-vienna-1912-22_

- **1926.12** `r13-turn.school-leaving::ctx-vienna-reform-1930::milieu-tenement::reform-leaving-age/straight-to-factory` tags: education, school, work, family, transition, reform, medical, schooling
  Rosa Winter把Lena的名字从升学名单上划掉，说厂里正缺人手。家里没有人争，只把午饭里的半块面包塞给Lena。Lena进了纺织厂，工牌上写着“临时”，每天站十二个钟头，月底工钱比学徒多两克朗。
  _effects: cash 2 (毕业钟响过以后); condition; flag +left_school_for_factory; role; relation acquaintance with person-materialized-world-vienna-1912-15_

- **1927.01** `state_tick:apprenticeship-contract/workshop-year/learned` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Lena又学会了一道工序。师傅没有夸，只把下一块料推到面前。
  _effects: state_parameter apprenticeship-contract.progress 5 -> 25; skill; mood 0.020000000000000004_

- **1927.01** `r13-civ.first-aid-course::ctx-vienna-reform-1930::milieu-tenement/certificate-earned` tags: health, first_aid, course, skill, school, reform, medical, schooling
  Luise Kral把一条绷带绕在Lena的小臂上，教怎么打结才不会勒住血管。Lena在同桌的手臂上练了三遍，最后一遍得到了点头。课程结束时，Luise Kral发了一张油印证书，上面盖着红十字的章。
  _effects: flag +earned_first_aid_certificate; role; skill; knowledge “a bandage must be tight enough to hold but loose enough for ”_

- **1927.01** `yf18-dare.bridge-rail::ctx-vienna-reform-1930::milieu-tenement/fall-on-the-ice` tags: dare, bridge, river, friendship, risk, reform, medical, schooling
  Lena走到第四步，鞋底在霜上滑了一下，整个人挂在栏杆外侧。Katharina Hofer抓住Lena的手腕，Hedwig跑去叫桥头卖烤栗子的老人；Lena被拉上来时，膝盖已经湿透，第二天走路一瘸一拐。
  _effects: state_parameter yf18-first-awakening.intensity 60 -> 66; state_parameter yf18-first-awakening.nerve 20 -> 10; relation friend with person-materialized-world-vienna-1912-55; flag +yf18_bridge_scare; mood -0.03_

- **1927.02** `yf18-apprentice.press-guard::ctx-vienna-reform-1930::milieu-tenement/refuse-the-machine` tags: apprenticeship, work, danger, machine, injury, refusal, reform, medical
  教堂年历的订单催得紧，Magistrat der k. k. Reichshaupt- und Residenzstadt Wien把压印机的护板卸了，说这样进纸快一半。Lena看着那块铁板，说手会进去；Magistrat der k. k. Reichshaupt- und Residenzstadt Wien把工钱袋往桌上一扔，问Lena是不是不想出师了。Lena没有碰机器，那天下午的活由Grete Winter接手。
  _effects: relation employer with person-friedrich-hofer; state_parameter apprenticeship-contract.progress 10 -> 5; state_parameter apprenticeship-contract.failures 0 -> 1; flag +yf18_refused_unguarded_press; mood 0.020000000000000004; relation acquaintance with person-materialized-world-vienna-1912-2; relation acquaintance with person-materialized-world-vienna-1912-52_

- **1927.04** `yf18-body.danube-cabin::ctx-vienna-reform-1930::milieu-tenement/jump-from-the-tower` tags: body, desire, river, swimming, shame, first_love, reform, medical
  Lena爬上河边的木跳台，下面的水黑得像一块铁。Hedwig在岸上抬头看，Lena想挥手，脚下一滑就掉了下去；浮上来时，嘴里全是河水的腥味，岸上的人都在鼓掌，Lena却只听见自己的心跳。
  _effects: state_add yf18-first-awakening state:world-vienna-1912:166; reputation 0.02; flag +yf18_jumped_tower; mood 0.05000000000000002; flag +yf18_first_awakening_active_

- **1927.07** `r13-turn.exam-failure::ctx-vienna-reform-1930::milieu-tenement::reform-open-secondary/name-missing` tags: education, exam, failure, school, work, reform, medical, schooling
  补考那天，Lena在考场门口等到钟响，监考说名单上没有名字。Rosa Winter跑去教务处，回来时手里只有一张转学建议。Lena去了印刷厂当学徒，师傅说铅字比字母好认，至少不会骗人。
  _effects: condition; flag +left_school_after_exam_failure; relation colleague with person-materialized-world-vienna-1912-15; education apprenticeship_

- **1928.01** `state_tick:apprenticeship-contract/workshop-year/learned` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Lena又学会了一道工序。师傅没有夸，只把下一块料推到面前。
  _effects: state_parameter apprenticeship-contract.progress 25 -> 45; skill; mood 0.020000000000000004_

- **1928.01** `state_tick:yf18-first-awakening/half-year-of-glances/answered-glance` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Lena在教堂门口或学校走廊里又遇见Hedwig。这一次对方先点了头，Lena准备好的整段话全忘了，只把手里的书换到另一只手上；回家后Lena才发现，自己把书拿倒了。
  _effects: state_parameter yf18-first-awakening.intensity 66 -> 71; state_parameter yf18-first-awakening.nerve 10 -> 18; state_parameter yf18-first-awakening.reciprocated false -> true; relation friend with person-phase15-Hedwig-world-vienna-1912; mood 0.03_

- **1928.01** `r13-edu.music-lesson::ctx-vienna-reform-1930::milieu-tenement/broken-string` tags: education, music, lesson, craft, culture, reform, medical, schooling
  Lena换把时用力过猛，弦轴崩了，琴弦抽在手背上。Rosa Winter没有责备，只让Lena先学三个月空弦。Lena每天对着镜子拉同一个音，拉到最后，连邻居都不再敲墙，只是经过门口时会放慢脚步。第二天Lena照常来，手上缠着布。弦上还有血。
  _effects: cash -2 (借来的小提琴); skill_

- **1928.02** `ld18-letter.schoolbook::ctx-vienna-reform-1930::milieu-tenement/read-aloud-in-class` tags: love, letter, school, secret, queer, courtship, secret_intimacy, reform
  Rosa Winter在课堂上翻到那封信，没有念出名字，只把句子读了一遍。教室里先是安静，随后有人笑。Katharina Hofer低下头，说那不是自己写的；Lena看着课本上的拉丁文，一个字也认不出来。
  _effects: state_add ld18-public-desire state:world-vienna-1912:167; reputation -0.06; relation friend with person-materialized-world-vienna-1912-55; mood -0.07; flag +letter_read_aloud; flag +public_desire_active_

- **1928.04** `r3-teen.first-move-away::ctx-vienna-reform-1930::milieu-tenement::reform-workers-dormitory/room-near-work` tags: housing, leaving_home, lodging, work, independence, reform, medical, schooling
  Lena在工厂后街租了一个床位，和两个车工合住。房东太太每天收一次煤钱，洗脸水要自己下楼打。第一夜，他听着隔壁的机器声睡着，梦里还在数工票上的尺寸。天没亮，隔壁的车工就敲门叫他一起上工。
  _effects: cash -3 (行李放在楼梯口); mood 0.04; flag +moved_to_lodging_near_work; relation colleague with person-hermann-kral; move place-wien-printshop-winter_

- **1928.07** `vienna-youth-threshold.sibling-departure/coins-into-box` tags: adolescence, school, work, family, transition
  Anton的箱子摊在床板上，里面是两件衬衫、一双旧靴和母亲塞的一小袋面粉。Lena把攒了半年的零钱数到第三遍，一共一克朗二十赫勒，全塞进箱角的袜子里。Anton看见了，没说话，只把箱子扣上，铜扣响了一声。
  _effects: cash -1.2 (把攒下的零钱塞给离家的兄姐); relation kin with person-phase15-Anton-world-vienna-1912; mood -0.03_

- **1929.01** `yf18-firstlook.essay-exam::ctx-vienna-reform-1930::milieu-tenement/fail-the-exam` tags: first_love, exam, essay, school, humiliation, reform, medical, schooling
  成绩单发下来，作文那一栏是“不及格”。Lena把成绩单折成小方块，塞进电车月票的夹层；回家路上，Lena第一次觉得Hedwig的名字比分数更沉。夜里Lena把作文重写了一遍，没有交。
  _effects: state_parameter yf18-first-awakening.intensity 71 -> 79; state_parameter yf18-first-awakening.secret true -> true; flag +yf18_failed_essay; mood -0.04_

- **1929.01** `state_reaction:yf18-first-awakening/exam-week-distraction` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  考试周里，Lena把课本摊在桌上，眼睛却一直看着窗外那条电车线。笔记的页边多了几个没有写完的名字，Lena用橡皮擦掉，纸面起了毛。
  _effects: state_parameter yf18-first-awakening.intensity 79 -> 76; state_parameter yf18-first-awakening.talk 5 -> 7_
  _causes: evt:world-vienna-1912:003007_

- **1929.01** `state_tick:apprenticeship-contract/workshop-year/learned` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Lena又学会了一道工序。师傅没有夸，只把下一块料推到面前。
  _effects: state_parameter apprenticeship-contract.progress 45 -> 65; skill; mood 0.020000000000000004_

- **1929.01** `state_tick:yf18-first-awakening/half-year-of-glances/talked-about` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Lena只把Hedwig的名字写在一张草稿纸背面，第二天那张纸就在教室后排传了一圈。有人把名字念出来，有人问Lena是不是要请人喝咖啡；Lena说那是表姐的名字，声音大得连自己都吓了一跳。
  _effects: state_parameter yf18-first-awakening.talk 7 -> 19; state_parameter yf18-first-awakening.nerve 18 -> 12; reputation -0.03; mood -0.03_

- **1929.01** `state_tick:ld18-public-desire/the-story-changes-hands/strangers-know-best` tags: ld18-public-desire, desire, public, scandal, reputation, body, rumor, notoriety
  一个陌生女人在电车上叫住Lena，说自己认识她的“那位”，还劝她趁年轻找个正经人家。Lena没有回答，提前一站下了车；走在回家的路上，她发现自己的步子越来越快，像在躲一个并不存在的人。
  _effects: state_parameter ld18-public-desire.rumorHeat 45 -> 53; state_parameter ld18-public-desire.shame 45 -> 49; reputation -0.029999999999999992; mood -0.02_

- **1929.01** `p9-childhood-youth-aspiration.ask-a-mentor/borrowed-specimen-book` tags: adolescence, education, aspiration, school, books, club, exam, task
  Friedrich Hofer说自己眼睛不行了，带不了徒弟，但从帆布袋里抽出一本旧字样本，让Lena拿回去临摹。书皮用麻线缝过三次，扉页上有一行褪色的签名。少年双手接过来，在咖啡馆门口鞠了个躬。
  _effects: skill; relation acquaintance with person-friedrich-hofer; flag +typesetting_specimen_book; cash -1 (咖啡馆里请老师傅喝一杯)_

- **1929.02** `p9-social-courtship-friendship.fasching-dance/dance-first-polka` tags: courtship, friendship, social, adulthood, reputation, leopoldstadt
  波尔卡重新响起时，Lena走到靠墙的长凳前向Helene Kral弯腰。姑母手里的扇子停了停，没说话。入场费和小费一共一克朗，Lena把找零塞回内袋；一支舞跳完，Helene Kral说了自己住在哪条街，Lena把名字和门牌在心里念了两遍。
  _effects: cash -1 (付给乐队的小费与舞会入场费); relation acquaintance with person-materialized-world-vienna-1912-16; relation acquaintance with person-materialized-world-vienna-1912-16_

- **1930.01** `state_expire:apprenticeship-contract` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick, state:apprenticeship-contract
  Lena的「学徒契约」到期；相关安排结束。
  _effects: state_remove apprenticeship-contract state:world-vienna-1912:127; role_

- **1930.01** `state_tick:yf18-first-awakening/half-year-of-glances/answered-glance` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Lena在教堂门口或学校走廊里又遇见Hedwig。这一次对方先点了头，Lena准备好的整段话全忘了，只把手里的书换到另一只手上；回家后Lena才发现，自己把书拿倒了。
  _effects: state_parameter yf18-first-awakening.intensity 76 -> 81; state_parameter yf18-first-awakening.nerve 12 -> 20; state_parameter yf18-first-awakening.reciprocated true -> true; relation friend with person-phase15-Hedwig-world-vienna-1912; mood 0.03_

- **1930.01** `state_tick:ld18-public-desire/the-story-changes-hands/a-new-version` tags: ld18-public-desire, desire, public, scandal, reputation, body, rumor, notoriety
  故事又换了一个版本：有人说Lena是为了钱，有人说是为了爱，还有人说她只是喜欢看别人议论。Lena在咖啡馆听见第三种说法，没有更正，只把杯子往窗边挪了挪；阳光照进来，她第一次觉得这些版本都离自己很远。
  _effects: state_parameter ld18-public-desire.rumorHeat 53 -> 49; state_parameter ld18-public-desire.spectacle 30 -> 32; mood 0.01_

- **1930.01** `p9-social-daily-culture.cafe-newspaper/p9-social-daily-culture.cafe-newspaper.talk-tram` tags: daily, culture, leisure, cafe, music, walk, task, task:daily
  Lena把报纸推到一边，和Katharina Moser聊起电车票价要涨的传闻。两人拿过糖罐当算盘，在桌布上比划通勤开销，两杯咖啡四十赫勒，争论得忘了时间，直到窗外的煤气灯亮起来。Lena起身时发现大衣下摆沾了咖啡渍，晚饭的点早过了，却约好下回还坐这张桌子。
  _effects: cash -0.4 (两杯咖啡的价钱); relation acquaintance with person-materialized-world-vienna-1912-32; mood 0.04; relation acquaintance with person-materialized-world-vienna-1912-32_

- **1930.02** `vienna-medical-treatment.night-fever/sweat-it-out` tags: health, medical, family, money
  Lena说胡话时念着车间的排班表，Luise Moser一句句应着，拿小勺往嘴里送温水。床头那半瓶退烧药早见了底，她没舍得倒最后一滴，留着天亮再说。
  _effects: condition; relation friend with person-materialized-world-vienna-1912-41; relation acquaintance with person-materialized-world-vienna-1912-41_

- **1930.02** `vienna-courtship-courtyard.sunday-walk/separate-coffee` tags: adulthood, courtship, partner, social, family
  两人拐进街角的咖啡馆，站到锌皮柜台前。Anna Bauer点了牛奶咖啡，Lena要了黑咖啡，十二赫勒一杯。侍者把两杯推过来时，两人几乎同时把钱币按在柜台上，各付各的，谁也没说什么；那一声铜板响，把客气摆得比咖啡还清楚。
  _effects: cash -0.12 (自己那杯黑咖啡); relation acquaintance with person-anna-bauer; mood -0.03_

- **1930.02** `p9-gap-adult-solitude.window-argument/window-argument.peek` tags: adulthood, daily, solitude, ordinary, home, neighbor, overheard
  Lena下楼倒水，在楼梯口看见院子里站着一对夫妻，男人的围裙上还沾着面粉，女的攥着一张工钱条。她没插话，提着壶又上楼，关门时听见那女人说“一星期八克朗怎么够”。
  _effects: mood -0.030000000000000002; skill_

- **1930.02** `bc18-ghost.death-certificate::ctx-vienna-reform-1930::milieu-tenement/accepts-the-file` tags: bureaucracy, legal, death, identity, mistake, paperwork, absurd, reform
  户籍官Grete Hofer为了结掉一桩陈年失踪案，在档案上给Lena盖了“推定死亡”。三天后，Lena收到一张慰问卡和一本作废的配给簿；同一天，追了半年的债主忽然不再上门。旧货商听说后，花两克朗买走一份抄本，说要给一个躲债的朋友看看格式。
  _effects: cash 2 (卖给旧货商的死亡证明抄本); state_add bc18-bureaucratic-ghost state:world-vienna-1912:290; reputation -0.009999999999999995; relation acquaintance with person-materialized-world-vienna-1912-59; flag +declared_dead_while_alive; mood 0.010000000000000002; relation acquaintance with person-materialized-world-vienna-1912-59; flag +bureaucratic_ghost; mood -0.010000000000000002_

- **1930.02** `state_reaction:bc18-bureaucratic-ghost/another-file-opened` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  Lena刚在一个窗口证明自己活着，另一个窗口又从抽屉里抽出一张死亡通知。两个办事员隔着走廊互相看了一眼，谁也没有先开口；Lena站在中间，忽然明白自己不是一个人，而是一份正在被转抄的卷宗。
  _effects: state_parameter bc18-bureaucratic-ghost.risk 20 -> 32; state_parameter bc18-bureaucratic-ghost.duplicates 1 -> 2; state_parameter bc18-bureaucratic-ghost.sightings 1 -> 2; flag +another_file_opened; mood -0.02_
  _causes: evt:world-vienna-1912:003777_

- **1930.02** `bc18-enemy.accidental-help::ctx-vienna-reform-1930::milieu-tenement/wrong-coal-delivery` tags: enemy, mistake, work, reputation, absurd, luck, social, reform
  Mitzi Weiss把二十袋“劣质煤”送到Lena门口，货到付款，想看Lena拿不出钱。卸货时，煤块黑得发亮，是上好的无烟煤；Lena付了钱，转手卖给面包房，净赚五克朗。Mitzi Weiss来打听煤的去向，Lena说已经烧了，还谢谢他记得自己怕冷。
  _effects: cash 5 (转卖无烟煤的差价); relation rival with person-materialized-world-vienna-1912-52; condition; flag +enemy_coal_was_anthracite; mood 0.029999999999999995_

- **1930.04** `p9-social-courtship-friendship.returned-sugar-box/sugar-box-go-in-person` tags: courtship, friendship, social, adulthood, reputation, leopoldstadt
  Lena亲自去Gustav Bauer家，把话说清：糖盒既退回来，以后不再托人登门。Gustav Bauer的母亲站在门里，说这都是为自家孩子打算，语气不重也不轻。Lena把帽子戴正，没有纠缠，下楼时一步一步数着台阶；门房和邻居都看在眼里，这一回至少把话说在了明处。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-49; reputation 0.03; relation acquaintance with person-materialized-world-vienna-1912-49; relation acquaintance with person-materialized-world-vienna-1912-63_

- **1930.04** `vienna-women-housework.coal-stove/coal-stove.cold-day` tags: gender, housework, home, labour, family
  孩子放学回来搓着手说冷，Lena把仅有的半捧煤末压进炉底，火苗细得像灯芯。她没接Friedrich Kral 2递来的煤块，只说等明天煤店开门。屋里哈气成雾，晚饭的土豆是凉的。
  _effects: mood -0.04; relation acquaintance with person-materialized-world-vienna-1912-69; relation acquaintance with person-materialized-world-vienna-1912-69_

- **1931.01** `state_expire:yf18-first-awakening` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Lena的「第一次心动」到期；相关安排结束。
  _effects: state_remove yf18-first-awakening state:world-vienna-1912:166; flag -yf18_first_awakening_active_

- **1931.01** `state_tick:ld18-public-desire/the-story-changes-hands/a-new-version` tags: ld18-public-desire, desire, public, scandal, reputation, body, rumor, notoriety
  故事又换了一个版本：有人说Lena是为了钱，有人说是为了爱，还有人说她只是喜欢看别人议论。Lena在咖啡馆听见第三种说法，没有更正，只把杯子往窗边挪了挪；阳光照进来，她第一次觉得这些版本都离自己很远。
  _effects: state_parameter ld18-public-desire.rumorHeat 49 -> 45; state_parameter ld18-public-desire.spectacle 32 -> 34; mood 0.010000000000000002_

- **1931.01** `state_tick:bc18-bureaucratic-ghost/paper-trail-year/another-window-opens` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  一个税务员把Lena的死亡记录和一张新房租收据订在一起，寄到了另一个区。三个星期后，Lena收到一封要求“已故纳税人”补缴暖气税的信；去问时，窗口说档案正在路上，让Lena先等通知。通知没有来，房租却涨了。
  _effects: state_parameter bc18-bureaucratic-ghost.fileDepth 25 -> 32; state_parameter bc18-bureaucratic-ghost.risk 32 -> 42; cash -1 (跑窗口的车钱); flag +heating_tax_for_the_dead; mood -0.03_

- **1931.01** `r13-civ.quarantine::ctx-vienna-reform-1930::milieu-tenement/observed-quarantine` tags: health, quarantine, epidemic, neighbor, confinement, reform, medical, schooling
  Grete Hofer在门框上画了一道白线，说十天内不许出门，菜和煤会有人送到楼梯口。Lena把线内的鞋一双双收进柜子，数了数米缸，又数了数窗台上的药包。第八天，送来的面包已经发硬。
  _effects: cash -2 (门框上的石灰线); mood -0.05; condition; flag +observed_quarantine; knowledge “the quarantine lasts ten days and food is left at the stairh”; relation acquaintance with person-materialized-world-vienna-1912-6_

- **1931.07** `vienna-parish-aid.funeral-society/funeral-society.defer` tags: faith, parish, mutual_aid, poverty, family
  Lena把抽屉拉开又推上，铜币在木板上滚了半圈。Ferdinand Weiss 2合上本子说，拖欠的人不少，可规矩就是规矩。她走下两级台阶又回头提醒，发工钱那天她会在教堂侧门等着。
  _effects: mood -0.020000000000000004; relation acquaintance with person-materialized-world-vienna-1912-46; relation acquaintance with person-materialized-world-vienna-1912-46_

- **1931.12** `vienna-women-housework.piecework-bundle/piecework.dispute-rate` tags: gender, housework, home, labour, family
  Helene Kral用拇指甲刮着一件领子的边线，说这儿跳了针。Lena把煤油灯往前推了推，让他凑近看，说线是细了点，活没少做。Berta Stein倚在门框上没走，屋里一时只有尺子碰桌面的响。
  _effects: cash 0.6 (争执后按降低的工价结算); reputation 0.03; relation colleague with person-materialized-world-vienna-1912-16; mood -0.03; relation acquaintance with person-materialized-world-vienna-1912-45_

- **1932.01** `bc18-ghost.quiet-correction::ctx-vienna-reform-1930::milieu-tenement/new-ration-book` tags: bureaucracy, paperwork, identity, absurd, legal, quiet, comic, reform
  为了把死亡记录销掉，Grete Hofer在同一个日期上开了一张出生证明，说这样账目最干净。于是Lena在官方文件里成了一个刚出生的婴儿，领到一本新配给簿和一张婴儿体检券。Lena把体检券给了邻居的孩子，自己拿着配给簿去煤店；店员看了看年龄栏，又看了看Lena的胡子，最后什么也没问。
  _effects: cash 2 (新生儿配给簿换到的煤和面粉); state_parameter bc18-bureaucratic-ghost.fileDepth 32 -> 40; state_parameter bc18-bureaucratic-ghost.risk 42 -> 52; state_parameter bc18-bureaucratic-ghost.duplicates 2 -> 3; state_parameter bc18-bureaucratic-ghost.officialStatus 在户籍册上已死亡 -> 在更正后成为新生儿; condition; flag +officially_reborn; mood 0.03; relation acquaintance with person-materialized-world-vienna-1912-19_

- **1932.01** `state_expire:ld18-public-desire` tags: ld18-public-desire, desire, public, scandal, reputation, body, rumor, notoriety
  Lena的「被全城观看的欲望」到期；相关安排结束。
  _effects: state_remove ld18-public-desire state:world-vienna-1912:167; flag -public_desire_active_

- **1932.01** `state_tick:bc18-bureaucratic-ghost/paper-trail-year/kept-the-files-apart` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  这一年，Lena学会了同时带三张纸出门：一张证明活着，一张证明死了，一张证明自己从没搬过家。窗口后面的人各自只看自己那一张，偶尔还会夸Lena的材料齐全。年底，Lena从补发的配给里省下一小袋面粉，觉得自己像个熟练的走私犯。
  _effects: state_parameter bc18-bureaucratic-ghost.fileDepth 40 -> 44; state_parameter bc18-bureaucratic-ghost.risk 52 -> 47; cash 1 (省下的配给和车钱); mood 0.009999999999999995_

- **1932.01** `r13-fam.begin-courtship::ctx-vienna-reform-1930::milieu-tenement/courtship-refused` tags: task, family, courtship, courting, marriage, reform, medical, schooling
  Emil Winter把花推回来，说家里已经替自己看好了人家。Lena把报纸重新裹好，花枝在手里折了一根。Maria Kral走过来，没有问结果，只说天要黑了；两人一前一后走回巷子，谁也没有提那束花。
  _effects: mood -0.14; flag +courtship_refused; relation acquaintance with person:evt:world-vienna-1912:000337:child_

- **1932.05** `p9-social-courtship-friendship.fasching-dance/dance-first-polka` tags: courtship, friendship, social, adulthood, reputation, leopoldstadt
  波尔卡重新响起时，Lena走到靠墙的长凳前向Josef Bauer 2弯腰。姑母手里的扇子停了停，没说话。入场费和小费一共一克朗，Lena把找零塞回内袋；一支舞跳完，Josef Bauer 2说了自己住在哪条街，Lena把名字和门牌在心里念了两遍。
  _effects: cash -1 (付给乐队的小费与舞会入场费); relation acquaintance with person-materialized-world-vienna-1912-80; relation acquaintance with person-materialized-world-vienna-1912-80_

- **1933.01** `state_expire:bc18-bureaucratic-ghost` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  Lena的「档案里的活鬼」到期；相关安排结束。
  _effects: state_remove bc18-bureaucratic-ghost state:world-vienna-1912:290; flag -bureaucratic_ghost_

- **1933.01** `r13-fam.help-neighbour::ctx-vienna-reform-1930::milieu-tenement/fixed-the-stove` tags: task, social, neighbor, help, care, reform, medical, schooling
  Maria Kral家的炉子倒烟，Lena蹲在地上把烟道拆开，掏出一团堵了多年的煤灰。手背被铁皮划了一道，Maria Kral用旧布条缠上，说这炉子是老伴生前盘的。火重新旺起来时，屋里的人都往后退了半步。
  _effects: condition; flag +repaired_neighbour_stove; skill; relation friend with person-maria-kral_

- **1933.04** `vienna-tenement-neighbors.laundry_line_dispute/neighbor_yanks_clothes` tags: home, social, family, housing
  Karl Kraus嫌Lena的床单滴水滴到Karl Kraus家衬衫上，一把扯下床单扔在院子的石板上。Lena下楼捡起来时，床单角沾了泥，重洗又要费肥皂。两人在院子当中对喊，楼上有人推开窗看热闹。Lena把床单重新搭上绳子时，故意把水拧在Karl Kraus那侧。
  _effects: relation rival with person-karl-kraus; cash -0.15 (重洗床单的肥皂钱)_

- **1933.04** `vienna-adult-social.burial-fund/burial-fund.paid` tags: adulthood, social, work, family
  车间里管互助会的Emil Bauer在午休时把本子摊在Lena的工具箱上，说这个月还差最后一份月钱。Lena从马甲内袋摸出二十个克罗伊策，Emil Bauer当着他的面在本子上画了钩。
  _effects: cash -0.3 (缴纳丧葬互助会的月钱); relation colleague with person:evt:world-vienna-1912:000457:child; reputation 0.04_

- **1933.11** `vienna-church-community.tenement-prayer/rent-prayer-help` tags: faith, social, family, home
  Lena在楼梯间守夜时，邻居说起楼下老太太病重。
  _effects: condition; food; relation acquaintance with person-materialized-world-vienna-1912-13; relation acquaintance with person-materialized-world-vienna-1912-13_

- **1934.01** `p9-social-daily-culture.pictures-or-concert/p9-social-daily-culture.pictures-or-concert.skip-both` tags: daily, culture, leisure, cafe, music, walk, task, task:culture
  Lena在影戏棚和音乐厅之间走了两趟，最后哪处都没进。Lena拐进常去的酒馆，花三十赫勒要了半升啤酒，听角落里有人拉琴，拉得不准但很响。Berta Stein找到Lena时，桌上的杯子已经空了一半，省下的票钱还在口袋里叮当响；这一晚没看成戏，倒把半升啤酒喝出了几分自在。
  _effects: cash -0.3 (酒馆半升啤酒); mood 0.03; relation friend with person-materialized-world-vienna-1912-45; relation acquaintance with person-materialized-world-vienna-1912-76_

- **1934.03** `r2-leisure.valet-boots::ctx-vienna-authoritarian-1934::milieu-tenement::valet-boots-war/polished-officers-boots` tags: domestic_service, valet, craft, humiliation, household, vienna, urban, crisis
  Magistrat der k. k. Reichshaupt- und Residenzstadt Wien穿着军靴回来，靴筒上全是战区的泥。Lena用温水一遍遍擦，泥里混着细砂和一种铁锈味。Magistrat der k. k. Reichshaupt- und Residenzstadt Wien说不用擦得太亮，前线没人看鞋。Lena还是擦到能照见灯，才把靴子放在床边。
  _effects: cash 2 (靴筒里的一枚砂砾); flag +polished_officers_boots; role; skill; knowledge “the master returned from the front with mud and lice”_

- **1934.06** `vienna-courtship-courtyard.sunday-walk/separate-coffee` tags: adulthood, courtship, partner, social, family
  两人拐进街角的咖啡馆，站到锌皮柜台前。Anna Stein 2点了牛奶咖啡，Lena要了黑咖啡，十二赫勒一杯。侍者把两杯推过来时，两人几乎同时把钱币按在柜台上，各付各的，谁也没说什么；那一声铜板响，把客气摆得比咖啡还清楚。
  _effects: cash -0.12 (自己那杯黑咖啡); relation acquaintance with person-materialized-world-vienna-1912-43; mood -0.03; relation acquaintance with person-materialized-world-vienna-1912-43_

- **1934.07** `vienna-history-kraus-lecture/listen-from-a-pillar` tags: history, culture, karl_kraus, cafe_central, public_lecture, press
  后厅的椅子不够，Lena 站在柱子旁听Karl Kraus 读一篇关于报纸谎言的文章。Karl Kraus 读到一半停下来，指出台下某位记者上周写的句子，那人把帽子压低。散场后，Lena 在账单背面抄下一句，墨迹被咖啡杯底印开。
  _effects: knowledge “Karl Kraus 在咖啡馆公开朗读时，会逐句引用报纸原文并指出其中的修辞和谎言。”; relation acquaintance with person-karl-kraus; cash -2 (coffee and a seat at Café Central); mood 0.01999999999999999; skill_

- **1934.10** `hs18-radio.crystal::ctx-vienna-authoritarian-1934::milieu-tenement/hide-from-landlord` tags: radio, neighbor, comic, daily, media, shortage, vienna, urban
  房东上楼时，Lena把收音机塞进被窝，Emil Bauer们装作在补袜子。耳机线从床单下露出来，像一根细蛇。房东闻到烟味，罚了Lena一盏灯的煤油钱，却没有发现声音从哪里来。
  _effects: cash -1 (landlord fined the household for the lamp); relation friend with person:evt:world-vienna-1912:000457:child; flag +hidden_radio_from_landlord; mood 0.01999999999999999_

- **1935.01** `r13-civ.quarantine::ctx-vienna-authoritarian-1934::milieu-tenement::r13-civ.quarantine-crisis/crisis-quarantine-work` tags: health, quarantine, epidemic, neighbor, confinement, vienna, urban, crisis
  Lena把派工单从门缝底下捡起来，上面写着“疫后复工，逾期除名”。她把白线擦掉半截，走到街口又停住，因为岗亭里坐着人。回家后，Lena把派工单钉在墙上，像钉一张欠条。
  _effects: cash -1 (门框上的石灰线); mood -0.10000000000000003; flag +quarantine_job_threatened; knowledge “the employer threatens to strike quarantined workers from th”; relation acquaintance with person-materialized-world-vienna-1912-54; relation acquaintance with person-materialized-world-vienna-1912-4_

- **1935.04** `r2-law.lawyer-fees::ctx-vienna-authoritarian-1934::milieu-tenement/contingency-fee` tags: law, lawyer, fees, debt, court, vienna, urban, crisis
  Franz Winter提出不收费，赢了拿三成。Lena算了一遍，觉得比先付二十克朗强，就签了。判决下来，赔偿金刚够补上欠租；Franz Winter从信封里抽出自己那一份，动作很快。Maria Hofer问还剩多少，Lena把信封倒过来，倒出几枚硬币。
  _effects: cash 12 (按小时计费的沉默); flag +signed_contingency_fee_agreement; relation colleague with person-materialized-world-vienna-1912-12; knowledge “the lawyer takes a third of any award”_

- **1935.07** `vienna-social-movement.recruitment/join-and-carry` tags: development, social_movement, organization, politics
  Lena在楼梯下面接到一张折成四折的传单。纸上没有署名，只写着下一次集会的地址。Lena去了，在昏暗的屋里报上姓名，成为环城大道写字楼管理处的一员，并答应负责自己所在街区的联络。
  _effects: organization_membership; role; relation acquaintance with person-josef-bauer_

- **1935.09** `vienna-courtship-courtyard.family-table/leave-before-dessert` tags: adulthood, courtship, partner, social, family, partnership
  问到后来，Friedrich Hofer提起别家有个更稳当的差事。Maria Hofer把餐巾往桌上一放，说吃好了，先走。两人在楼梯间站住，Maria Hofer说不是Lena的错，可下次再来还得一样坐这张桌子；Lena心里松了一点，也知道这顿饭没吃完，事情并没有过去。
  _effects: relation partner with person-materialized-world-vienna-1912-63; relation kin with person-friedrich-hofer; mood 0.03_

- **1935.10** `vienna-housing-move.rent-notice/rent-notice-pay` tags: housing, home, rent, family, money
  Lena把通知念给Josef Bauer听，Josef Bauer摇头说是楼梯间那几块新玻璃的账。Lena去楼下杂货铺换开一张五克朗的纸币，回屋一枚一枚摆开数，煤箱底多留了二十赫勒。
  _effects: cash -2 (按月多付两克朗房租); mood -0.03_

- **1936.01** `r13-civ.soup-kitchen::ctx-vienna-authoritarian-1934::milieu-tenement::r13-civ.soup-kitchen-crisis/crisis-locals-only` tags: social, charity, soup_kitchen, hunger, volunteer, vienna, urban, crisis
  有人在门口喊，说汤是给本区人喝的，不能便宜了外来的。Lena看了看锅里剩的底子，又看了看队伍里那些没票的人。Josef Bauer 2让Lena把门关一半，说先紧着孩子和老人。门板合上时，外面有人用德语和另一种话一起骂。
  _effects: mood -0.08000000000000002; reputation -0.04; flag +soup_kitchen_turned_away_outsiders; knowledge “the kitchen has no rule for outsiders and only enough for on”; relation acquaintance with person-materialized-world-vienna-1912-92_

- **1936.06** `r13-turn.debt-crisis::ctx-vienna-authoritarian-1934::milieu-tenement/pawned-the-wedding-clock` tags: finance, debt, poverty, household, pressure, vienna, urban, crisis
  催款单贴在门框上，写着七天内还清十二克朗。Lena把结婚时的座钟抱去当铺，掌柜只肯给四克朗，还要扣一个月保管费。回家时，Anna Stein 2在楼梯口问钟怎么不见了，Lena说送去修了。
  _effects: cash -8 (催款单贴在门框上); condition; flag +pawned_household_goods; relation acquaintance with person-materialized-world-vienna-1912-43; relation acquaintance with person-materialized-world-vienna-1912-67_

- **1936.10** `r13-rel.partner-migration::ctx-vienna-authoritarian-1934::milieu-tenement/took-the-factory-train` tags: relationship, migration, marriage, separation, money, vienna, urban, crisis
  Maria Hofer在另一座城找到活，工钱比这里多三成。Lena替Maria Hofer把铺盖卷好，塞进一只旧箱。站台上风很大，Maria Hofer说每月寄钱回来，Lena说先顾自己吃饭。车开走后，Lena在站台上把票根捡起来。
  _effects: cash 6 (站台上的车票); role; move place-wien; relation partner with person-materialized-world-vienna-1912-63_

- **1937.01** `vienna-family-divorce/reconcile-for-now` tags: family, marriage, divorce, housing, lifecycle, partnership
  Lena和Maria Hofer在楼道里吵到半夜，最后因为下个月的房租又坐回同一张桌。谁都没有提和好，只把账本重新摊开；Maria Hofer把煤钱推过来，Lena接过去数了两遍，手指碰到一起又分开，屋里的灯亮到很晚。
  _effects: relation partner with person-materialized-world-vienna-1912-63; mood -0.02999999999999997_

- **1937.01** `r13-fam.plan-wedding::ctx-vienna-authoritarian-1934::milieu-tenement::wedding-war/wedding-refused-by-unit` tags: task, family, marriage, wedding, household, debt, vienna, urban
  Maria Hofer的部队不准假，婚礼只能取消。Lena把做好的礼服叠好，送到裁缝那里改成一件能日常穿的外套。Maria Hofer托人带回来一张纸条，说等打完这一仗；Lena把纸条夹进祈祷书，没有回信。
  _effects: mood -0.16000000000000003; condition; flag +wartime_wedding_cancelled; relation partner with person-materialized-world-vienna-1912-63; knowledge “the unit refused leave for the wedding”_

- **1937.02** `ld18-wedding.private-rite::ctx-vienna-authoritarian-1934::milieu-tenement/rings-in-a-borrowed-room` tags: love, wedding, marriage, queer, secret, ritual, commitment, secret_intimacy
  婚礼在借来的房间里举行，证人是洗衣房的Mitzi Berg。戒指是从当铺买的，誓词写在洗衣单背面；Mitzi Berg念到“无论贫穷还是疾病”时，楼下有人敲门，三个人同时屏住呼吸。门开了，是来收煤气费的。
  _effects: state_add ld18-impossible-attachment state:world-vienna-1912:630; cash -1 (the pawnshop rings and the gas bill); mood 0.06; flag +private_wedding_rite; flag +impossible_attachment_active_

- **1937.02** `state_reaction:ld18-impossible-attachment/a-family-wedding` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  亲戚的婚礼上，Lena被安排和伴侣分开坐。司仪问有没有人反对，Lena低头喝汤；伴侣在另一桌替别人倒酒，手很稳，酒没有洒出来。散席时，两个人在衣帽间碰见，只说了一句“外面下雨”。
  _effects: state_parameter ld18-impossible-attachment.pressure 15 -> 25; state_parameter ld18-impossible-attachment.grief 0 -> 4; mood -0.019999999999999962_
  _causes: evt:world-vienna-1912:007212_

- **1937.10** `hist15-occ.requisition-notice::ctx-vienna-authoritarian-1934::milieu-tenement/hide-the-last-sack` tags: occupation, requisition, shortage, institution, history, family, vienna, urban
  Lena把最后一袋黑麦埋进煤堆下面，夜里听见巡逻队从窗前走过。第二天面包房照常开门，但货架上少了三排面包；Lena知道那不是因为城里没有粮。
  _effects: food; mood 0.020000000000000018; flag +hidden_grain_

- **1938.01** `vienna-life-anschluss-1938/complies` tags: politics, persecution, 1938
  Mitzi Weiss在街口设了登记桌，要求住户交出姓名、职业和宗教。Lena排队填了表，回家把门牌擦干净。楼里有人连夜搬走，也有人站在阳台上挥手。
  _effects: role; cash -3 (new permits and stamps); condition_

- **1938.01** `sm18-object.tram-lost::ctx-vienna-authoritarian-1934::milieu-tenement/advertises-in-the-paper` tags: object, loss, child, tram, family, everyday, vienna, urban
  Lena在《新维也纳日报》的失物栏里登了三行小字，花了四十个铜板。第二天，一个卖旧货的人说在电车终点站见过那样的铜牌。Maria 2放学后跟着Lena去找，一路上把书包带绕在手指上，绕得发白。
  _effects: cash -1 (在报纸上登失物启事); state_add sm18-missing-object state:world-vienna-1912:629; relation kin with person:evt:world-vienna-1912:002850:child; mood -0.020000000000000018; flag +advertised_for_the_childs_medal; flag +something_is_missing_

- **1938.01** `state_tick:ld18-impossible-attachment/invented-anniversary/someone-asks-for-the-papers` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  房东要续租，必须出示结婚证或亲属关系证明。Lena说伴侣是表妹，房东却问为什么表妹的姓和籍贯都对不上。那天晚上，两个人把箱子重新打包，又把已经叠好的衣服一件件拿出来；谁也没有说下个月住哪里。
  _effects: state_parameter ld18-impossible-attachment.pressure 25 -> 37; state_parameter ld18-impossible-attachment.discretion 55 -> 47; reputation -0.03; mood -0.040000000000000036_

- **1938.01** `r13-fam.keep-family-secret::ctx-vienna-authoritarian-1934::milieu-tenement::secret-crisis/police-search` tags: task, family, secret, reputation, sibling, fear, vienna, urban
  两个便衣跟着门房上楼，说要查一份“反动传单”。Lena把柜底的纸塞进Gustav Berg 2送来的面粉袋，又抓了一把面盖住。Anton站在门口拖时间，说家里只有老人和孩子；便衣翻到米缸时，Lena的膝盖一直在抖。
  _effects: condition; flag +hid_paper_during_police_search; role; relation kin with person-phase15-Anton-world-vienna-1912; knowledge “the police were looking for a printed leaflet, not the famil”; relation acquaintance with person-materialized-world-vienna-1912-103_

- **1938.03** `vienna-courtship-courtyard.breakup/keys-and-photo-returned` tags: adulthood, courtship, partner, social, family, separation
  院子里晾着三条床单，风一过就拍到人脸上。Lena把备用钥匙和一张照相馆拍的合影交还，Maria Hofer把那件借来的外套叠好递回。两人说好各找各的住处，谁都没有提高声音；分手分得干净，可两个人心里都空了一块。
  _effects: relation_end partner with person-materialized-world-vienna-1912-63; mood -0.08999999999999997; flag +courtship_ended_cleanly; relation acquaintance with person-materialized-world-vienna-1912-44_

- **1938.04** `ad20-neighbor-dispute::ctx-vienna-authoritarian-1934::milieu-tenement/the-line-moves` tags: neighbor, dispute, home, everyday, public, obligation, vienna, urban
  隔壁把晾衣绳往Lena这边挪了一尺，水滴正好落在窗台上。Lena拿粉笔在墙上画了一道线；Josef Stein看见了，又把绳子挪回去半尺。两个人都觉得自己让了步，晚饭时却都把窗户关得很紧。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-53; mood -0.020000000000000018; flag +laundry_line_dispute; relation acquaintance with person-materialized-world-vienna-1912-53_

- **1938.10** `state_reaction:sm18-missing-object/a-rumor-hardens` tags: sm18-missing-object, mystery, object, loss, memory, search, suspicion, everyday
  Lena在院子里听见两个人在说“那家的东西”，话头在看见Lena时停住。晚上，Lena把首饰盒从五斗柜挪到床边，又觉得这样更像在防谁。
  _effects: state_parameter sm18-missing-object.suspicion 5 -> 15; reputation -0.020000000000000004; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:007574_

- **1939.01** `hist15-occ.seed-occupation::ctx-vienna-authoritarian-1934::milieu-tenement/the-flag-changes` tags: occupation, war, curfew, history, place, institution, vienna, urban
  城门口的旗换了颜色，岗哨开始检查每一张纸。Lena回家时发现街角新钉了一块告示牌：天黑以后不许出门，地窖里的粮食要登记。晚上，巡逻队的靴声从窗下经过，比钟声还准。
  _effects: state_add occupied-city-regime state:world-vienna-1912:683; mood -0.06000000000000005; flag +saw_the_occupation_flag_

- **1939.01** `p22-child-matchmaker::ctx-vienna-authoritarian-1934::milieu-tenement/the-enemy-brings-a-cake` tags: child, matchmaker, family_album, enemy, warm, ironic, reconciliation, scandal
  孩子把一张陌生人的照片贴进家庭相册，说这是“爸爸以前最好的朋友”。Lena认出那是十年前打过官司的Rosa Kral，正要发火，孩子却说照片背面写着一行字：“等我回来吃饭。”第二天，Rosa Kral真的提着一只蛋糕站在门口。孩子把最大的一块留给Lena，Rosa Kral没有反对。
  _effects: relation friend with person-materialized-world-vienna-1912-37; relation kin with person:evt:world-vienna-1912:002850:child; cash 1 (the enemy brought a cake and a small gift); flag +enemy_brought_cake; mood 0.050000000000000044; relation acquaintance with person-materialized-world-vienna-1912-37_

- **1939.01** `state_reaction:ld18-impossible-attachment/a-question-at-the-office` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  办公室有人问Lena，为什么总有一个女人在楼下等她。Lena说那是表妹；对方笑了一下，说现在的表妹真体贴。下午，Lena把桌上的相框扣倒，又在没人时翻回来，用袖子擦了擦玻璃上的灰。
  _effects: state_parameter ld18-impossible-attachment.pressure 37 -> 45; state_parameter ld18-impossible-attachment.discretion 47 -> 43; reputation -0.020000000000000004_
  _causes: evt:world-vienna-1912:007724_

- **1939.01** `state_tick:sm18-missing-object/another-drawer/the-same-question` tags: sm18-missing-object, mystery, object, loss, memory, search, suspicion, everyday
  Lena把同一只抽屉拉开又推上，里面的东西已经按原来的位置摆了三遍。楼下有人搬煤，铁锹刮过石阶；Lena忽然想不起那件东西最后一次被谁拿在手里，只觉得每个人的脸都有一点可疑。
  _effects: state_parameter sm18-missing-object.suspicion 15 -> 23; state_parameter sm18-missing-object.leads 25 -> 23; mood -0.030000000000000027_

- **1939.01** `state_tick:ld18-impossible-attachment/invented-anniversary/the-date-that-is-not-on-paper` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  Lena和伴侣把认识的那一天当作纪念日。没有登记，没有证人，只有一块从旧货摊买来的蛋糕和两杯兑了水的酒；Lena在日历上画了一个别人看不懂的记号，第二年又画在同一个格子里。
  _effects: state_parameter ld18-impossible-attachment.devotion 70 -> 74; state_parameter ld18-impossible-attachment.pressure 45 -> 42; mood 0.020000000000000018_

- **1939.01** `p9-history-public-action.organize-relief/church-hall` tags: politics, union, party, activism, public_action, relief, leaflet, task
  教堂侧厅的长凳被挪到墙边，旧锅架在砖灶上，Berta Kral 蹲着添柴，Lena 把补好的账页贴在门板。第一锅汤滚起来时，排队的人从门口一直站到院里。
  _effects: cash -4 (垫付首日面粉和柴火); food; reputation 0.07; relation acquaintance with person-materialized-world-vienna-1912-4; relation acquaintance with person-materialized-world-vienna-1912-93_

- **1939.05** `p9-gap-adult-ordinary-day.market-closing/market-closing.share-spinach` tags: adulthood, daily, leisure, neighborhood, ordinary, market, food, bargain
  两人同时伸手，又同时缩回去。Berta Stein说自己本来想买回去做馅，Lena说那正好一人一半。摊主用草绳把菜捆好，嘴里嘟囔着收摊了收摊了，把剩下的零钱扒拉进木匣。
  _effects: cash -0.04 (分买最后一把菠菜); food; relation acquaintance with person-materialized-world-vienna-1912-45; relation acquaintance with person-materialized-world-vienna-1912-83_

- **1939.07** `r3-war.resistance-courier::ctx-vienna-authoritarian-1934::milieu-tenement/carried-message-in-tire` tags: war, occupation, resistance, courier, checkpoint, vienna, urban, crisis
  Lena把纸条卷进自行车内胎，打足气，骑过检查站时还按了两下车铃。Elisabeth Huber伸手拦车，问后座绑的什么；Lena说是给修女送的面粉。Elisabeth Huber捏了捏轮胎，手指沾了一点黑油，挥手放行。骑出半里，Lena才发现后背全湿了。
  _effects: flag +carried_message_in_tire; role; relation acquaintance with person-materialized-world-vienna-1912-93; knowledge “the checkpoint does not inspect tire pressure”; relation acquaintance with person-materialized-world-vienna-1912-109_

- **1940.01** `fw19-split.borrowed-goat::ctx-vienna-authoritarian-1934::milieu-tenement/goat-eats-ration-card` tags: goat, courtyard, ration, sharing, comic, warm, vienna, urban
  山羊把桌上的配给卡嚼了。Lena追出去时，只抢回半张；Mitzi Berg说“它不知道那是粮”，Emil 2却笑得直不起腰。那天晚上，全家用半张卡领了半份面包。
  _effects: cash -1 (cash -1); relation acquaintance with person-materialized-world-vienna-1912-76; state_parameter raising-child.careDebt 0 -> 2; flag +goat_ate_ration_card; mood 0.030000000000000027_

- **1940.01** `state_tick:sm18-missing-object/another-drawer/a-receipt-in-the-lining` tags: sm18-missing-object, mystery, object, loss, memory, search, suspicion, everyday
  半年过去，Lena又翻了一遍那只装旧纽扣的铁盒，在盒盖夹层里摸到一小片发黄的收据。上面的日期和那件东西最后一次出现的那天对得上，但字迹已经淡得只剩半个印章。
  _effects: state_parameter sm18-missing-object.leads 23 -> 29; state_parameter sm18-missing-object.suspicion 23 -> 21; mood 0.010000000000000009_

- **1940.01** `state_tick:ld18-impossible-attachment/invented-anniversary/a-form-with-an-empty-line` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  户籍窗口换了一张新表格，配偶一栏不能空着。Lena最后写了“同住人”，办事员抬头看了一眼，说这不作数。回家后，Lena把表格折成很小的一块，塞进针线盒；伴侣问今天顺不顺利，Lena说和平时一样。
  _effects: state_parameter ld18-impossible-attachment.pressure 42 -> 48; state_parameter ld18-impossible-attachment.discretion 43 -> 40; mood -0.020000000000000018_

- **1940.01** `r13-civ.help-refugee::ctx-vienna-authoritarian-1934::milieu-tenement/refused-at-door` tags: social, refugee, shelter, war, trust, vienna, urban, crisis
  Lena说家里没有空地方，把门关到只留一条缝。Anton的纸箱在楼梯口放了一夜，第二天早上不见了，只剩一圈湿印子。Lena下楼时绕开那块地方走。
  _effects: mood -0.07999999999999996; flag +refused_refugee_shelter_

- **1940.02** `vienna-medical-treatment.night-fever/sweat-it-out` tags: health, medical, family, money
  醋水的酸味混着汗气，屋子小得转不开身。Berta Lechner把布拧到不滴水，敷上去时Lena打了个激灵。窗外送奶车吱呀碾过石板，她才想起自己家的炉子还灭着。
  _effects: relation friend with person-materialized-world-vienna-1912-9; relation acquaintance with person-materialized-world-vienna-1912-9_

- **1940.04** `vienna-church-community.tenement-prayer/rent-prayer-help` tags: faith, social, family, home
  Lena在楼梯间守夜时，邻居说起楼下老太太病重。
  _effects: condition; food; relation acquaintance with person-materialized-world-vienna-1912-4_

- **1940.06** `r3-war.war-loan::ctx-vienna-authoritarian-1934::milieu-tenement/bought-war-bonds` tags: war, war_loan, bonds, bank, inflation, vienna, urban, crisis
  Mitzi Huber把第六期爱国债券的表格推到Lena面前，说“买一份也是爱国”。Lena把刚领的工钱数了一遍，留下房租，其余全买了债券；Anna Berg在旁边小声说，上一期的利息还没兑。Josef Berg在门口挂了一条横幅，红布被风吹得啪啪响。
  _effects: cash -10 (爱国债券的第六期); flag +bought_war_bonds; role; relation acquaintance with person-materialized-world-vienna-1912-113; knowledge “the previous bond interest is still unpaid”; relation acquaintance with person-materialized-world-vienna-1912-113_

- **1941.01** `sm18-object.lost-property::ctx-vienna-authoritarian-1934::milieu-tenement/someone-else-claimed-it` tags: object, loss, office, search, bureaucracy, everyday, vienna, urban
  登记簿上已经有人替这件东西签了字，笔迹很熟。Anton Bauer 2说那人自称是失主的亲戚，还准确说出了针扣背面的一道划痕。Lena站在柜台前，忽然想不起自己有没有把这道划痕告诉过别人。
  _effects: state_parameter sm18-missing-object.leads 29 -> 19; state_parameter sm18-missing-object.suspicion 21 -> 36; mood -0.030000000000000027; knowledge “有人替失物签了字，并说出了针扣背面的划痕”; flag +someone_claimed_the_object_first; relation acquaintance with person-materialized-world-vienna-1912-79_

- **1941.01** `state_tick:sm18-missing-object/another-drawer/a-receipt-in-the-lining` tags: sm18-missing-object, mystery, object, loss, memory, search, suspicion, everyday
  半年过去，Lena又翻了一遍那只装旧纽扣的铁盒，在盒盖夹层里摸到一小片发黄的收据。上面的日期和那件东西最后一次出现的那天对得上，但字迹已经淡得只剩半个印章。
  _effects: state_parameter sm18-missing-object.leads 19 -> 25; state_parameter sm18-missing-object.suspicion 36 -> 34; mood 0.010000000000000009_

- **1941.01** `state_tick:ld18-impossible-attachment/invented-anniversary/a-form-with-an-empty-line` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  户籍窗口换了一张新表格，配偶一栏不能空着。Lena最后写了“同住人”，办事员抬头看了一眼，说这不作数。回家后，Lena把表格折成很小的一块，塞进针线盒；伴侣问今天顺不顺利，Lena说和平时一样。
  _effects: state_parameter ld18-impossible-attachment.pressure 48 -> 54; state_parameter ld18-impossible-attachment.discretion 40 -> 37; mood -0.020000000000000018_

- **1941.01** `p9-social-daily-culture.singing-club/p9-social-daily-culture.singing-club.listen-only` tags: daily, culture, leisure, cafe, music, walk, task, task:social
  Lena坐在后厅角落的啤酒箱上听完整场排练，Berta Kral中途走过来问要不要在名册上签字，Lena说再想想。散场时人们三三两两去前厅续杯，Lena把空杯子放回柜台，顺着酒馆后门的巷子走回家，嘴里还留着半段旋律；这一晚没花钱，也和Berta Kral多说了两句话。
  _effects: mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-4_

- **1941.10** `p21-blackmail-wedding::ctx-vienna-authoritarian-1934::milieu-tenement/the-ring-goes-on` tags: blackmail, wedding, marriage, known-affair, scandal, power, love, secret
  戒指还是戴上了。Gustav Bauer的母亲坐在第一排，手里攥着一串念珠；Helene Weiss没有来，但托人送来一只空信封。Lena在婚宴上敬了三桌酒，回到新房才发现门锁已经换了，钥匙放在门垫下面。邻居在门外放了一挂鞭。
  _effects: state_add p21-scandal-web state:world-vienna-1912:895; cash 3 (an installment of the partner family dowry); flag +forced_wedding_completed; condition; knowledge “婚宴上少了一个人，门垫下多了一把新钥匙。”; mood -0.050000000000000044; flag +scandal_web_active_

- **1941.10** `state_reaction:ld18-impossible-attachment/a-family-wedding` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  亲戚的婚礼上，Lena被安排和伴侣分开坐。司仪问有没有人反对，Lena低头喝汤；伴侣在另一桌替别人倒酒，手很稳，酒没有洒出来。散席时，两个人在衣帽间碰见，只说了一句“外面下雨”。
  _effects: state_parameter ld18-impossible-attachment.pressure 54 -> 64; state_parameter ld18-impossible-attachment.grief 4 -> 8; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:009439_

- **1941.10** `state_reaction:ld18-impossible-attachment/a-question-at-the-office` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  办公室有人问Lena，为什么总有一个女人在楼下等她。Lena说那是表妹；对方笑了一下，说现在的表妹真体贴。下午，Lena把桌上的相框扣倒，又在没人时翻回来，用袖子擦了擦玻璃上的灰。
  _effects: state_parameter ld18-impossible-attachment.pressure 64 -> 72; state_parameter ld18-impossible-attachment.discretion 37 -> 33; reputation -0.020000000000000004_
  _causes: evt:world-vienna-1912:009439_

- **1941.10** `state_reaction:p21-scandal-web/a-new-scandal` tags: p21-scandal-web, scandal_web, scandal, secret, blackmail, network, leverage, danger
  新的丑闻登出来时，旧的那一页也被重新翻到桌面上。Lena发现两件事共用同一个证人，而那个证人上周还来借过盐。
  _effects: state_parameter p21-scandal-web.exposure 45 -> 51; state_parameter p21-scandal-web.danger 45 -> 49; state_parameter p21-scandal-web.loyalty 20 -> 17; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:009439_

- **1942.01** `p23-wedding-dress::ctx-vienna-authoritarian-1934::milieu-tenement/the-dress-fits-too-well` tags: love, desire, obsession, stalker, wedding, fear, high_drama, vienna
  包裹上没有寄件人，只有Lena的名字。裙子腰围一分不差，领口内侧缝着一小片标签，写着Lena从未告诉过任何人的旧地址。Gustav Bauer把裙子提起来，又放下；Lena走到窗边，看见街对面有个人影很快退进了门洞。
  _effects: state_add p23-dangerous-secret state:world-vienna-1912:892; state_add known-affair state:world-vienna-1912:893; knowledge “the dress was cut to the subject’s measurements”; mood -0.06000000000000005; flag +dress_fits; flag +known_affair_active_

- **1942.01** `vienna-family-childbirth/son-born` tags: family, childbirth, death, lifecycle, birth, state, state:raising-child, raising-child
  Lena在Leopoldstädter Zinshaus, gemeinsamer Gang生下一个男婴，取名Otto Bauer。工友凑的钱抵了一部分，家里还是从糖罐里数出六克朗给接生的人；Gustav Bauer把消息带到工厂，回来时把唯一的摇篮重新刷了一遍，Lena躺在床上出了一身虚汗。
  _effects: birth male; cash -6 (midwife fee); state_add raising-child state:world-vienna-1912:894_

- **1942.01** `hist15-occ.requisition-notice::ctx-vienna-authoritarian-1934::milieu-tenement/hand-over-the-grain` tags: occupation, requisition, shortage, institution, history, family, vienna, urban
  Anton Bauer 2把征用单按在柜台上，Lena家里的两袋面粉被划走一袋，换回一张盖蓝章的收据。Anton Bauer 2说下周还会来，如果地窖里再翻出粮食，收据就不作数了。
  _effects: cash -4 (被征用的粮食折价); food; flag +requisition_receipt; knowledge “征用收据只在下一批检查前有效。”_

- **1942.01** `state_expire:sm18-missing-object` tags: sm18-missing-object, mystery, object, loss, memory, search, suspicion, everyday
  Lena的「一件说不清下落的东西」到期；相关安排结束。
  _effects: state_remove sm18-missing-object state:world-vienna-1912:629; flag -something_is_missing_

- **1942.01** `state_tick:ld18-impossible-attachment/invented-anniversary/a-form-with-an-empty-line` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  户籍窗口换了一张新表格，配偶一栏不能空着。Lena最后写了“同住人”，办事员抬头看了一眼，说这不作数。回家后，Lena把表格折成很小的一块，塞进针线盒；伴侣问今天顺不顺利，Lena说和平时一样。
  _effects: state_parameter ld18-impossible-attachment.pressure 72 -> 78; state_parameter ld18-impossible-attachment.discretion 33 -> 30; mood -0.020000000000000018_

- **1942.01** `state_tick:p21-scandal-web/the-web-tightens/held` tags: p21-scandal-web, scandal_web, scandal, secret, blackmail, network, leverage, danger
  又过了一年，那几张纸仍锁在Lena的抽屉里。街上的问话没有变多，也没有变少；Lena在咖啡馆里数了数还能信任的人，发现名单比去年短，但每一个名字都还站得住。
  _effects: state_parameter p21-scandal-web.exposure 51 -> 48; state_parameter p21-scandal-web.loyalty 17 -> 21; state_parameter p21-scandal-web.danger 49 -> 46; mood 0.010000000000000009_

- **1942.01** `r13-fam.ask-neighbour-help::ctx-vienna-authoritarian-1934::milieu-tenement/borrowed-coal` tags: task, social, neighbor, help, poverty, vienna, urban, crisis
  Lena把空煤筐拎到隔壁门口，说只借一筐，等手头松了就还。Grete Winter看了看筐底的锈，进屋铲了半筐，又从灶边拿了两块引火的柴。Lena道谢时，Grete Winter说这条走廊里借东西要记着，不是记在纸上。
  _effects: food; condition; flag +borrowed_coal_from_neighbour; relation friend with person-materialized-world-vienna-1912-2_

- **1942.02** `vienna-housing-move.flat-viewing/flat-viewing-too-damp` tags: housing, home, rent, family, money
  Lena在单间里站了一刻钟，脚底发潮，墙纸底下透出一股霉味。看门人说刷一层石灰就好，Marie Huber却在门口轻轻咳了一声，提醒这背面没有阳光。Lena把定金收回口袋，谢过看门人，宁可多付三克朗，也不愿把湿气带进夜里。
  _effects: flag +still_looking_for_room_

- **1942.04** `vienna-medical-treatment.night-fever/hospital-night` tags: health, medical, family, money
  护士把冰袋按在Lena额上，水顺着鬓角流进衣领。Alois Lechner坐在床脚，数着窗外渐渐亮起的铺面门板，说回去给炉子添块煤。隔壁床的老头整夜在喊一个女人的名字。
  _effects: cash -2 (医院急诊押金); health 0.08 (急诊观察和冰敷退烧); relation friend with person-alois-lechner_

- **1942.11** `vienna-tenement-neighbors.lost_room_key/key_stolen_by_stranger` tags: home, social, family, housing
  Lena记得出门时钥匙还在，回来却没了。Katharina Weiss说下午看见一个穿灰外套的男人在楼道里转悠，手里晃着一把铜钥匙。两人下楼查看，房门虚掩，抽屉被拉开，攒着买煤的六克朗不见了。Katharina Weiss陪着Lena去街角警察岗亭报了案，警察记下灰外套，说会留意。
  _effects: cash -6 (被盗的买煤钱); relation friend with person-materialized-world-vienna-1912-70; mood -0.04999999999999982_

- **1943.01** `state_reaction:ld18-impossible-attachment/a-question-at-the-office` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  办公室有人问Lena，为什么总有一个女人在楼下等她。Lena说那是表妹；对方笑了一下，说现在的表妹真体贴。下午，Lena把桌上的相框扣倒，又在没人时翻回来，用袖子擦了擦玻璃上的灰。
  _effects: state_parameter ld18-impossible-attachment.pressure 78 -> 86; state_parameter ld18-impossible-attachment.discretion 30 -> 26; reputation -0.020000000000000004_
  _causes: evt:world-vienna-1912:009946_

- **1943.01** `state_reaction:p23-dangerous-secret/a-witness-talks` tags: p23-dangerous-secret, secret, danger, leverage, exposure, loyalty, crime, politics
  审讯室里的灯亮了一夜。第二天，Lena在面包房门口听见有人低声复述自己的秘密，连停顿的位置都一模一样。
  _effects: state_parameter p23-dangerous-secret.exposure 55 -> 63; state_parameter p23-dangerous-secret.leverage 25 -> 21; state_parameter p23-dangerous-secret.loyalty 35 -> 29; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:009946_

- **1943.01** `state_reaction:p21-scandal-web/a-new-scandal` tags: p21-scandal-web, scandal_web, scandal, secret, blackmail, network, leverage, danger
  新的丑闻登出来时，旧的那一页也被重新翻到桌面上。Lena发现两件事共用同一个证人，而那个证人上周还来借过盐。
  _effects: state_parameter p21-scandal-web.exposure 48 -> 54; state_parameter p21-scandal-web.danger 46 -> 50; state_parameter p21-scandal-web.loyalty 21 -> 18; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:009946_

- **1943.01** `hs18-occupation.piano::ctx-vienna-authoritarian-1934::milieu-tenement/buy-it-back` tags: occupation, piano, requisition, witness, neighbor, history, vienna, urban
  Lena把两条舍不得抽的烟塞给Anton Bauer 2，说这琴是替邻居保管的。Anton Bauer 2掂了掂烟，让工人把琴抬回门厅，却把琴凳留下了。Anna Berg晚上来道谢，Lena说别谢，明天要是再来，就说不认识我。
  _effects: cash -3 (two packs of cigarettes for the officer); relation acquaintance with person:evt:world-vienna-1912:001251:child; state_add hs18-street-witness state:world-vienna-1912:976; flag +bought_back_neighbors_piano; mood 0.010000000000000009; relation acquaintance with person-materialized-world-vienna-1912-96_

- **1943.01** `state_tick:ld18-impossible-attachment/invented-anniversary/the-date-that-is-not-on-paper` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  Lena和伴侣把认识的那一天当作纪念日。没有登记，没有证人，只有一块从旧货摊买来的蛋糕和两杯兑了水的酒；Lena在日历上画了一个别人看不懂的记号，第二年又画在同一个格子里。
  _effects: state_parameter ld18-impossible-attachment.devotion 74 -> 78; state_parameter ld18-impossible-attachment.pressure 86 -> 83; mood 0.020000000000000018_

- **1943.01** `state_tick:p23-dangerous-secret/the-secret-changes-hands/a-second-person-learns` tags: p23-dangerous-secret, secret, danger, leverage, exposure, loyalty, crime, politics
  一个曾在场的人喝多了，把故事讲给了不该听的人。第二天，Lena在市场上看见两个陌生人站在菜摊旁边，什么也不买，只看着来往的人。Lena把篮子换到另一只手上，继续挑土豆。
  _effects: state_parameter p23-dangerous-secret.exposure 63 -> 71; state_parameter p23-dangerous-secret.leverage 21 -> 17; state_parameter p23-dangerous-secret.loyalty 29 -> 23; mood -0.020000000000000018_

- **1943.01** `state_tick:known-affair/public-year/forgotten` tags: known-affair, love, scandal, secret, public, secret_intimacy, state, state_tick
  Lena的名字从闲谈里慢慢退了下去。街上有了新的婚礼、新的葬礼和新的丑闻；只有裁缝还记得Lena改过两次同一件外套的腰身。
  _effects: state_parameter known-affair.notoriety 40 -> 35; state_parameter known-affair.grief 0 -> 0; mood 0.020000000000000018_

- **1943.01** `state_tick:p21-scandal-web/the-web-tightens/held` tags: p21-scandal-web, scandal_web, scandal, secret, blackmail, network, leverage, danger
  又过了一年，那几张纸仍锁在Lena的抽屉里。街上的问话没有变多，也没有变少；Lena在咖啡馆里数了数还能信任的人，发现名单比去年短，但每一个名字都还站得住。
  _effects: state_parameter p21-scandal-web.exposure 54 -> 51; state_parameter p21-scandal-web.loyalty 18 -> 22; state_parameter p21-scandal-web.danger 50 -> 47; mood 0.010000000000000009_

- **1943.01** `r13-fam.propose-cohabitation::ctx-vienna-authoritarian-1934::milieu-tenement/wait-for-wedding` tags: task, family, cohabitation, household, courtship, vienna, urban, crisis
  Gustav Bauer把钥匙推回来，说母亲会打断自己的腿，还是等教堂定了日子再说。Lena把两把钥匙都收回口袋，钥匙齿在布上磨出一点响。两人坐着把茶喝完，谁也没有提那只已经收拾好的藤箱。
  _effects: mood -0.06000000000000005; condition; flag +waited_for_wedding; relation acquaintance with person-materialized-world-vienna-1912-49_

- **1943.04** `p21-absurd-inheritance::ctx-vienna-authoritarian-1934::milieu-tenement/the-debt-comes-with-the-room` tags: inheritance, absurd, family, secret, debt, fortune, legal, windfall
  衣帽间的门打开以后，先掉出来的是一叠催缴单。Elisabeth Huber把数目加了两遍，说遗产税、欠租和一位“贝尔格夫人”的年金都挂在房子上；Hermann Bauer退后一步，Helene Weiss把钥匙放回Lena手里，像放回一块烫过的铁。
  _effects: cash -5 (inheritance tax and arrears came with the room); state_add debt-bondage state:world-vienna-1912:1056; state_add p21-fortune-reversal state:world-vienna-1912:1057; relation acquaintance with person-materialized-world-vienna-1912-93; flag +inherited_a_debt; knowledge “催缴单上写着遗产税、欠租和一位“贝尔格夫人”的年金。”; flag +fortune_reversal_active_

- **1943.10** `p9-social-tenement-neighbors.stove-and-line/stove-and-line.sheet-quarrel` tags: housing, neighbors, tenement, daily, money, reputation
  Lena发现自己搭在栏杆上的床单被人挪到了绳尾，角上沾了煤灰，一时火起，在楼梯间拦住Anna Bauer问是谁动的。Anna Bauer说是Emil Stein嫌滴水，两人越说越响，最后各自回屋摔上门，炉子空着，谁也没再去烧水。
  _effects: relation acquaintance with person-anna-bauer_

- **1943.12** `pl19-scandal.friends-circle::ctx-vienna-authoritarian-1934::milieu-tenement/the-circle-holds` tags: love, friendship, protection, scandal, circle, impossible, vienna, urban
  七个人在长桌上吃饭，第八把椅子空着，桌上却摆了一副餐具。Anton Stein说这是给“今晚不能来的人”留的；没人追问。Lena把汤喝完，发现每个人都在替Otto Huber挡酒、挡话、挡窗外的视线，像一圈不太熟练的卫兵。
  _effects: state_add pl19-protected-scandal state:world-vienna-1912:1058; relation friend with person-materialized-world-vienna-1912-72; flag +circle_holds; knowledge “第八把椅子是留给不能公开出现的人的。”; relation acquaintance with person-materialized-world-vienna-1912-110; relation acquaintance with person-materialized-world-vienna-1912-72; flag +protected_scandal_active_

- **1943.12** `state_reaction:pl19-protected-scandal/a-public-question` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  有人在一场公开活动里问起Lena的“私人安排”，语气客气，问题却像一根针。Lena笑着答了别的事，回家后才发现手心全是汗。
  _effects: state_parameter pl19-protected-scandal.publicHeat 20 -> 32; state_parameter pl19-protected-scandal.protection 70 -> 64; reputation -0.030000000000000013_
  _causes: evt:world-vienna-1912:010687_

- **1944.01** `p22-dead-voice-child::ctx-vienna-authoritarian-1934::milieu-tenement/the-neighbor-calls-it-a-seance` tags: child, dead_relative, voice, eerie, dark, grief, family_secret, scandal
  Anton把这件事传遍了整条街，说Lena家请了招魂师。区里的人上门问话，孩子却躲在桌子底下不肯出来；Lena在门口解释了半天，最后只说了一句“她只是想奶奶了”。第二天，窗台上被人放了一小袋盐和一张驱邪的纸条。他把盐袋放在窗台，孩子从桌下伸出手把它推开了。
  _effects: state_add public-scandal state:world-vienna-1912:1054; state_add p22-scandal-engine state:world-vienna-1912:1055; relation kin with person:evt:world-vienna-1912:003202:child; reputation -0.03; flag +seance_rumour; flag +scandal_engine_active_

- **1944.01** `state_reaction:p22-scandal-engine/a-new-scandal-feeds-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Lena的新故事登出来时，旧的那一页也被重新翻到桌面上。Lena发现两件事共用同一个证人，而那个证人上周还来借过盐。
  _effects: state_parameter p22-scandal-engine.heat 55 -> 61; state_parameter p22-scandal-engine.reach 45 -> 49; state_parameter p22-scandal-engine.shame 55 -> 58; state_parameter p22-scandal-engine.leverage 20 -> 22_
  _causes: evt:world-vienna-1912:010683_

- **1944.01** `state_reaction:p23-dangerous-secret/a-witness-talks` tags: p23-dangerous-secret, secret, danger, leverage, exposure, loyalty, crime, politics
  审讯室里的灯亮了一夜。第二天，Lena在面包房门口听见有人低声复述自己的秘密，连停顿的位置都一模一样。
  _effects: state_parameter p23-dangerous-secret.exposure 71 -> 79; state_parameter p23-dangerous-secret.leverage 17 -> 13; state_parameter p23-dangerous-secret.loyalty 23 -> 17_
  _causes: evt:world-vienna-1912:010683_

- **1944.01** `state_tick:debt-bondage/interest/pay-interest` tags: debt-bondage, debt, work, poverty, legal, state, state_tick
  Lena又付了一年的利息。本金几乎没动，债主的账本却翻到了新一页。
  _effects: cash -3 (debt interest); state_parameter debt-bondage.debt 45 -> 47_

- **1944.01** `state_tick:p21-fortune-reversal/the-crowd-recounts/the-scaffold-shakes` tags: p21-fortune-reversal, fortune_reversal, fortune, reversal, inheritance, ruin, public, witnesses
  一笔该到的钱没有到。Lena在账房里坐到天黑，听见隔壁把算盘珠子拨得很快；回家时，门口已经有人等着，手里拿着一份折过三次的账单。
  _effects: state_parameter p21-fortune-reversal.height 25 -> 17; state_parameter p21-fortune-reversal.fragility 80 -> 88; state_parameter p21-fortune-reversal.debt 70 -> 75; reputation -0.01999999999999999; flag +fortune_scaffold_shook_

- **1944.01** `state_tick:pl19-protected-scandal/the-network-meets/someone-wants-a-favor` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  有人替Lena挡了一次采访，随后在走廊里提起自己儿子的学徒期满。Lena知道这不是闲聊；当天晚上，那张写着名字的纸条被压在糖罐下面，像一枚没有付清的硬币。
  _effects: state_parameter pl19-protected-scandal.leverage 15 -> 27; state_parameter pl19-protected-scandal.protection 64 -> 60; state_parameter pl19-protected-scandal.exposure 30 -> 35; mood -0.020000000000000018_

- **1944.01** `state_tick:ld18-impossible-attachment/invented-anniversary/the-date-that-is-not-on-paper` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  Lena和伴侣把认识的那一天当作纪念日。没有登记，没有证人，只有一块从旧货摊买来的蛋糕和两杯兑了水的酒；Lena在日历上画了一个别人看不懂的记号，第二年又画在同一个格子里。
  _effects: state_parameter ld18-impossible-attachment.devotion 78 -> 82; state_parameter ld18-impossible-attachment.pressure 83 -> 80; mood 0.020000000000000018_

- **1944.01** `state_expire:known-affair` tags: known-affair, love, scandal, secret, public, secret_intimacy, state, state_tick
  Lena的「已经公开的私情」到期；相关安排结束。
  _effects: state_remove known-affair state:world-vienna-1912:893; flag -known_affair_active_

- **1944.01** `state_tick:p21-scandal-web/the-web-tightens/the-keeper-sells` tags: p21-scandal-web, scandal_web, scandal, secret, blackmail, network, leverage, danger
  那个替Lena保管信件的人把副本卖给了报社。Lena是在报摊上看见自己的名字的；标题不大，但旁边配了一张旧照片，照片里的门牌还认得出来。
  _effects: state_parameter p21-scandal-web.exposure 51 -> 63; state_parameter p21-scandal-web.loyalty 22 -> 10; state_parameter p21-scandal-web.danger 47 -> 57; flag +scandal_web_sold; mood -0.040000000000000036_

- **1944.01** `state_tick:hs18-street-witness/memory-drift/holds` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Lena又把那天的顺序在脑子里走了一遍：先是门响，再是靴子，最后才是那声喊。细节还在，只是每讲一次，旁边就多出一点别人替你补上的颜色。
  _effects: state_parameter hs18-street-witness.certainty 80 -> 82_

- **1944.01** `r13-edu.literacy-class::ctx-vienna-authoritarian-1934::milieu-tenement/mocked-by-younger-students` tags: education, literacy, adult_education, class, belonging, vienna, urban, crisis
  Lena被年轻同学笑说口音重，念课文时全班哄笑。Lena把书合上，第二天没来。Rosa Winter托人带话，Lena只说家里忙，其实每天那个时辰都坐在河边，用树枝在泥地上划自己的名字。河水涨起来的那天，Lena在泥地上写的名字被冲掉了，Lena又写了一遍。
  _effects: skill_

- **1944.03** `vienna-church-community.tenement-prayer/rent-prayer-help` tags: faith, social, family, home
  Lena在楼梯间守夜时，邻居说起楼下老太太病重。
  _effects: condition; food; relation acquaintance with person-materialized-world-vienna-1912-60; relation acquaintance with person-materialized-world-vienna-1912-60_

- **1944.04** `vienna-tenement-neighbors.shared_stove_fire/fire_scald_hand` tags: home, social, family, housing
  Lena在合租房走廊的公用灶台上煮土豆，转身取盐时袖子扫翻了铁锅，滚水浇在左手背上。Otto Moser从隔壁冲出来，扯下自己的围裙裹住烫伤处，又跑下楼叫来住在二楼的接生婆。接生婆用蛋清和旧亚麻布包扎，嘱咐三天不能沾水。
  _effects: relation friend with person-materialized-world-vienna-1912-82; relation acquaintance with person-materialized-world-vienna-1912-82_

- **1944.09** `vienna-life-overcrowded-flat/apply-for-a-municipal-flat` tags: housing, home, health, family
  Lena去市政办事处登记申请更大的市营住宅。办事员收下表格和两克朗手续费，说前面还有几百户，至少要等两年；Lena把回执折好，回家路上看见新盖的市营楼房，窗户亮着，门却还进不去。
  _effects: cash -2 (municipal housing application); role_

- **1944.10** `state_reaction:public-scandal/gossip` tags: public-scandal, scandal, reputation, social, state, state_reaction, home, family
  Lena走进咖啡馆时，邻桌的声音低了一拍。没有人当面说什么，但每个人都知道该说什么。
  _effects: reputation -0.03_
  _causes: evt:world-vienna-1912:011179_

- **1945.01** `vienna-life-1945-liberation/survives` tags: war, liberation, 1945
  苏联士兵进城时，Lena躲在门后听见坦克履带压过石板路。几天后街口贴出告示，Lena去领了一份汤和一块面包。
  _effects: role; food; cash -2 (replacement documents); relation acquaintance with person-materialized-world-vienna-1912-36_

- **1945.01** `state_reaction:p21-fortune-reversal/a-scandal-shrinks-the-height` tags: p21-fortune-reversal, fortune_reversal, fortune, reversal, inheritance, ruin, public, witnesses
  丑闻传来时，Lena正在清点新到的家具。第二天，送货的人问要不要把东西先拉回去；Lena说不用，但把最贵的那只箱子挪到了里屋。
  _effects: state_parameter p21-fortune-reversal.height 17 -> 11; state_parameter p21-fortune-reversal.witnesses 40 -> 45; state_parameter p21-fortune-reversal.fragility 88 -> 94_
  _causes: evt:world-vienna-1912:011392_

- **1945.01** `state_reaction:ld18-impossible-attachment/a-family-wedding` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  亲戚的婚礼上，Lena被安排和伴侣分开坐。司仪问有没有人反对，Lena低头喝汤；伴侣在另一桌替别人倒酒，手很稳，酒没有洒出来。散席时，两个人在衣帽间碰见，只说了一句“外面下雨”。
  _effects: state_parameter ld18-impossible-attachment.pressure 80 -> 90; state_parameter ld18-impossible-attachment.grief 8 -> 12_
  _causes: evt:world-vienna-1912:011392_

- **1945.01** `state_reaction:p21-scandal-web/a-new-scandal` tags: p21-scandal-web, scandal_web, scandal, secret, blackmail, network, leverage, danger
  新的丑闻登出来时，旧的那一页也被重新翻到桌面上。Lena发现两件事共用同一个证人，而那个证人上周还来借过盐。
  _effects: state_parameter p21-scandal-web.exposure 63 -> 69; state_parameter p21-scandal-web.danger 57 -> 61; state_parameter p21-scandal-web.loyalty 10 -> 7_
  _causes: evt:world-vienna-1912:011392_

- **1945.01** `state_reaction:p22-scandal-engine/a-new-scandal-feeds-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Lena的新故事登出来时，旧的那一页也被重新翻到桌面上。Lena发现两件事共用同一个证人，而那个证人上周还来借过盐。
  _effects: state_parameter p22-scandal-engine.heat 61 -> 67; state_parameter p22-scandal-engine.reach 49 -> 53; state_parameter p22-scandal-engine.shame 58 -> 61; state_parameter p22-scandal-engine.leverage 22 -> 24_
  _causes: evt:world-vienna-1912:011475_

- **1945.01** `state_tick:p22-scandal-engine/the-rumor-learns-new-words/the-story-gets-a-new-witness` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  又过了一年，流言没有熄，却学会了新的说法。Lena在咖啡馆里听见自己的故事被讲成三个版本，每个版本都比上一个多一个证人；没有人来追问，也没有人真正忘记。
  _effects: state_parameter p22-scandal-engine.heat 67 -> 64; state_parameter p22-scandal-engine.reach 53 -> 57; state_parameter p22-scandal-engine.leverage 24 -> 27; state_parameter p22-scandal-engine.shame 61 -> 63; mood 0.010000000000000009_

- **1945.01** `state_tick:debt-bondage/interest/pay-interest` tags: debt-bondage, debt, work, poverty, legal, state, state_tick
  Lena又付了一年的利息。本金几乎没动，债主的账本却翻到了新一页。
  _effects: cash -3 (debt interest); state_parameter debt-bondage.debt 47 -> 49_

- **1945.01** `state_tick:p21-fortune-reversal/the-crowd-recounts/the-scaffold-shakes` tags: p21-fortune-reversal, fortune_reversal, fortune, reversal, inheritance, ruin, public, witnesses
  一笔该到的钱没有到。Lena在账房里坐到天黑，听见隔壁把算盘珠子拨得很快；回家时，门口已经有人等着，手里拿着一份折过三次的账单。
  _effects: state_parameter p21-fortune-reversal.height 11 -> 3; state_parameter p21-fortune-reversal.fragility 94 -> 100; state_parameter p21-fortune-reversal.debt 75 -> 80; reputation -0.01999999999999999_

- **1945.01** `state_tick:pl19-protected-scandal/the-network-meets/network-holds` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  Lena又在后间见了那几个人。谁也没有提名字，只把下个月的班次、钥匙和该打的电话分了一遍；出门时，Lena发现自己的围巾被人重新叠过，像一件被妥善保管的证物。
  _effects: state_parameter pl19-protected-scandal.exposure 35 -> 30; state_parameter pl19-protected-scandal.protection 60 -> 64; state_parameter pl19-protected-scandal.publicHeat 32 -> 30; mood 0.010000000000000009_

- **1945.01** `state_transition:ld18-impossible-attachment/papers-become-public` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  Lena从「无法登记的伴侣」转入另一段处境：the pressure made the attachment publicly legible
  _effects: state_transition ld18-impossible-attachment -> known-affair; reputation -0.1; flag +unregistered_attachment_exposed; flag -impossible_attachment_active; flag +known_affair_active_

- **1945.01** `state_tick:p21-scandal-web/the-web-tightens/a-strand-snaps` tags: p21-scandal-web, scandal_web, scandal, secret, blackmail, network, leverage, danger
  一个证人搬走了，带走了他那一份记忆。Lena在旧地址门口站了半个下午，回来时发现信箱里多了一张没有署名的明信片，上面只写着“我还记得”。
  _effects: state_parameter p21-scandal-web.exposure 69 -> 77; state_parameter p21-scandal-web.leverage 80 -> 74; state_parameter p21-scandal-web.danger 61 -> 66; reputation -0.020000000000000018; flag +scandal_witness_left_

- **1945.01** `state_tick:hs18-street-witness/memory-drift/blurs` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Lena忽然想不起那个人先迈的是左脚还是右脚。邻居说自己记得清清楚楚，还补了一个细节；Lena听着，竟分不清那是自己看见的，还是后来听来的。
  _effects: state_parameter hs18-street-witness.certainty 82 -> 74; mood -0.020000000000000018_

- **1945.01** `p9-work-career.night-course/p9-work-career.night-course.certificate` tags: work, career, craft, clerk, education, task, night_school, bookkeeping
  Lena在十月第一个星期三交了六克朗学费，又花一克朗二十赫勒买了课本。每个星期三下工后赶到商业夜校，Rosa Winter在煤气灯下把借方贷方写在黑板上，粉笔灰落进袖口。年底结课时他领到一张结业证，上面写着簿记、商业算术、书信三门均及格。
  _effects: cash -7 (夜校学费与课本费); skill; education apprenticeship; relation acquaintance with person-materialized-world-vienna-1912-15_

- **1945.03** `p22-goat-heir::ctx-vienna-postwar-1945::milieu-tenement/goat-keeps-the-building` tags: inheritance, absurd, comic, goat, tenement, legal, rumor, public
  公证人念完遗嘱，整栋楼归一只叫“伯爵”的山羊所有，条件是它继续住在天井里。Lena和Friedrich Huber把租金记在羊的名下，每天轮流挤奶；半年后，房东太太的侄子来争产，看见山羊站在楼梯口，竟先脱帽行了个礼。那天夜里，羊睡在门房，钥匙挂在它的角上。
  _effects: state_add p22-wild-fortune state:world-vienna-1912:1192; state_add p22-scandal-engine state:world-vienna-1912:1193; cash 4 (rent surplus held in the goat name); relation friend with person-materialized-world-vienna-1912-22; flag +goat_kept_building; mood 0.030000000000000027; flag +wild_fortune_active_

- **1945.03** `ld18-wedding.private-rite::ctx-vienna-postwar-1945::milieu-tenement/rings-in-a-borrowed-room` tags: love, wedding, marriage, queer, secret, ritual, commitment, secret_intimacy
  婚礼在借来的房间里举行，证人是洗衣房的Berta Huber 2。戒指是从当铺买的，誓词写在洗衣单背面；Berta Huber 2念到“无论贫穷还是疾病”时，楼下有人敲门，三个人同时屏住呼吸。门开了，是来收煤气费的。
  _effects: state_add ld18-impossible-attachment state:world-vienna-1912:1194; cash -1 (the pawnshop rings and the gas bill); mood 0.06000000000000005; relation acquaintance with person-materialized-world-vienna-1912-68; flag +impossible_attachment_active_

- **1945.03** `state_reaction:ld18-impossible-attachment/a-family-wedding` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  亲戚的婚礼上，Lena被安排和伴侣分开坐。司仪问有没有人反对，Lena低头喝汤；伴侣在另一桌替别人倒酒，手很稳，酒没有洒出来。散席时，两个人在衣帽间碰见，只说了一句“外面下雨”。
  _effects: state_parameter ld18-impossible-attachment.pressure 15 -> 25; state_parameter ld18-impossible-attachment.grief 0 -> 4; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:011956_

- **1946.01** `vienna-tenement-neighbors.laundry_line_dispute/neighbor_yanks_clothes` tags: home, social, family, housing
  Otto Moser嫌Lena的床单滴水滴到Otto Moser家衬衫上，一把扯下床单扔在院子的石板上。Lena下楼捡起来时，床单角沾了泥，重洗又要费肥皂。两人在院子当中对喊，楼上有人推开窗看热闹。Lena把床单重新搭上绳子时，故意把水拧在Otto Moser那侧。
  _effects: relation rival with person-materialized-world-vienna-1912-82; cash -0.15 (重洗床单的肥皂钱)_
  _causes: evt:world-vienna-1912:011349_

- **1946.01** `p23-good-deed-disaster::ctx-vienna-postwar-1945::milieu-tenement/the-rescued-sue-her` tags: family, neighborhood, good_deed, disaster, irony, warmth, high_drama, vienna
  Rosa Kral在法庭上说，那袋煤是Lena硬塞过来的，自己从来没求过谁。Emil Huber 3把起诉书念完，Lena才明白救人和赔钱是两件事。散庭后，Rosa Kral在走廊里低声说对不起；Lena点点头，却没有停下脚步。法院门口的台阶结着薄冰。
  _effects: state_add under-investigation state:world-vienna-1912:1188; state_add debt-bondage state:world-vienna-1912:1189; relation rival with person-materialized-world-vienna-1912-37; cash -6 (the lawsuit cost money); flag +sued_for_help; relation acquaintance with person-materialized-world-vienna-1912-130_

- **1946.01** `p23-ex-lover-judge::ctx-vienna-postwar-1945::milieu-tenement/the-case-file-becomes-a-letter` tags: politics, love, old_lover, trial, conspiracy, high_drama, vienna, urban
  Emil Huber 3把案卷推到桌角，底下压着一封没有署名的信。信里只有一行字：那年夏天，电车经过Ringstrasse时，你曾说会等我。Lena把信折好，听见法槌落下，案子因证据不足延期；Emil Bauer 2在门口回过头，什么也没问。
  _effects: state_add p23-political-debt state:world-vienna-1912:1190; state_add known-affair state:world-vienna-1912:1191; relation acquaintance with person-materialized-world-vienna-1912-130; knowledge “the judge once loved the subject”; mood 0.030000000000000027; flag +judge_helped; relation acquaintance with person-materialized-world-vienna-1912-86; flag -known_affair_active; flag +known_affair_active_

- **1946.01** `state_expire:p22-scandal-engine` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Lena的「流言发动机」到期；相关安排结束。
  _effects: state_remove p22-scandal-engine state:world-vienna-1912:1055; flag -scandal_engine_active_

- **1946.01** `state_exit:p21-fortune-reversal` tags: p21-fortune-reversal, fortune_reversal, fortune, reversal, inheritance, ruin, public, witnesses
  Lena不再处于「骤起骤落」；条件已经改变。
  _effects: state_remove p21-fortune-reversal state:world-vienna-1912:1057; flag -fortune_reversal_active_

- **1946.01** `state_reaction:p22-wild-fortune/a-windfall-confirms-it` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  一笔意外的小钱进了门。Lena没有添新衣服，先把欠得最久的账单付了；收账的人在门口数了两遍，临走时说了一句“看来是真的”。
  _effects: state_parameter p22-wild-fortune.height 55 -> 60; state_parameter p22-wild-fortune.witnesses 60 -> 66; state_parameter p22-wild-fortune.fragility 45 -> 42; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:012156_

- **1946.01** `state_tick:pl19-protected-scandal/the-network-meets/network-holds` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  Lena又在后间见了那几个人。谁也没有提名字，只把下个月的班次、钥匙和该打的电话分了一遍；出门时，Lena发现自己的围巾被人重新叠过，像一件被妥善保管的证物。
  _effects: state_parameter pl19-protected-scandal.exposure 30 -> 25; state_parameter pl19-protected-scandal.protection 64 -> 68; state_parameter pl19-protected-scandal.publicHeat 30 -> 28; mood 0.010000000000000009_

- **1946.01** `state_tick:p22-wild-fortune/the-story-gets-taller/a-witness-asks-for-proof` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  一个见证人要求Lena拿出证据。Lena翻遍抽屉，只找到一张被水浸过的收据；那天晚上，街上的故事换了主角，Lena的名字被挪到了最后一行。
  _effects: state_parameter p22-wild-fortune.height 60 -> 54; state_parameter p22-wild-fortune.witnesses 66 -> 61; state_parameter p22-wild-fortune.fragility 42 -> 49; mood -0.030000000000000027_

- **1946.01** `state_tick:p22-scandal-engine/the-rumor-learns-new-words/the-story-turns-on-its-keeper` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  一个曾经替Lena传话的人搬走了，带走了半条街的信任。第二天，信箱里多了一张没有署名的明信片，上面只写着“我还记得”；Lena把明信片翻过来，背面是空的。
  _effects: state_parameter p22-scandal-engine.heat 30 -> 37; state_parameter p22-scandal-engine.reach 45 -> 50; state_parameter p22-scandal-engine.leverage 35 -> 31; state_parameter p22-scandal-engine.shame 15 -> 21; mood -0.020000000000000018_

- **1946.01** `state_tick:ld18-impossible-attachment/invented-anniversary/the-date-that-is-not-on-paper` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  Lena和伴侣把认识的那一天当作纪念日。没有登记，没有证人，只有一块从旧货摊买来的蛋糕和两杯兑了水的酒；Lena在日历上画了一个别人看不懂的记号，第二年又画在同一个格子里。
  _effects: state_parameter ld18-impossible-attachment.devotion 70 -> 74; state_parameter ld18-impossible-attachment.pressure 25 -> 22; mood 0.020000000000000018_

- **1946.01** `state_expire:p23-dangerous-secret` tags: p23-dangerous-secret, secret, danger, leverage, exposure, loyalty, crime, politics
  Lena的「危险的秘密」到期；相关安排结束。
  _effects: state_remove p23-dangerous-secret state:world-vienna-1912:892_

- **1946.01** `state_tick:p21-scandal-web/the-web-tightens/a-strand-snaps` tags: p21-scandal-web, scandal_web, scandal, secret, blackmail, network, leverage, danger
  一个证人搬走了，带走了他那一份记忆。Lena在旧地址门口站了半个下午，回来时发现信箱里多了一张没有署名的明信片，上面只写着“我还记得”。
  _effects: state_parameter p21-scandal-web.exposure 77 -> 85; state_parameter p21-scandal-web.leverage 74 -> 68; state_parameter p21-scandal-web.danger 66 -> 71; reputation -0.020000000000000018_

- **1946.01** `state_tick:hs18-street-witness/memory-drift/blurs` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Lena忽然想不起那个人先迈的是左脚还是右脚。邻居说自己记得清清楚楚，还补了一个细节；Lena听着，竟分不清那是自己看见的，还是后来听来的。
  _effects: state_parameter hs18-street-witness.certainty 74 -> 66; mood -0.020000000000000018_

- **1946.01** `r13-fam.visit-grave::ctx-vienna-postwar-1945::milieu-tenement/wrong-grave` tags: task, family, grave, mourning, neighbor, grief, vienna, urban
  两人在坟场里绕了半个钟头，才找到那块刻着名字的石头。Katharina Weiss忽然说不是这一块，自己记得旁边有一棵小槐树。Lena陪她一排排找，天快黑时，守墓人过来说小槐树去年就砍了；Katharina Weiss站在空地上，把花放在了脚边。
  _effects: mood -0.030000000000000027; condition; flag +could_not_find_the_grave; relation friend with person-materialized-world-vienna-1912-70; knowledge “the old tree by the grave was cut down last year”_

- **1946.04** `state_reaction:p22-scandal-engine/a-public-apology-cools-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Lena在报纸上登了道歉，流言却没有立刻停。第二天，有人在门口放了一束花，也有人把花拿走了；Lena把空花瓶留在窗台上，没有扔。
  _effects: state_parameter p22-scandal-engine.heat 37 -> 29; state_parameter p22-scandal-engine.reach 50 -> 47; state_parameter p22-scandal-engine.shame 21 -> 17; state_parameter p22-scandal-engine.leverage 31 -> 36; mood 0.010000000000000009_
  _causes: evt:world-vienna-1912:012601_

- **1946.09** `df18-luck.borrowed-at-the-card-table::ctx-vienna-postwar-1945::milieu-tenement/the-favor` tags: luck, debt, bargain, gambling, obligation, night, supernatural, vienna
  牌桌上输掉最后一张钞票后，Katharina Weiss把一叠钱推到Lena面前，说不用写借条，只要Lena答应“以后有一天帮一个忙”。Lena数了数，正好二十克朗。Katharina Weiss没有说是什么忙，只把烟按灭在桌角，说时候到了会来找Lena。
  _effects: cash 20 (牌桌上借来的二十克朗); state_add df18-borrowed-luck state:world-vienna-1912:1244; flag +df18_took_card_money; mood 0.020000000000000018; flag +df18_luck_borrowed; knowledge “我得到了一点不该白拿的好运，代价还没有说清。”_

- **1947.01** `p23-lovers-ledger::ctx-vienna-postwar-1945::milieu-tenement/the-ledger-burns-first` tags: love, desire, betrayal, ledger, secret, blackmail, high_drama, vienna
  Gustav 2比Lena早到一步。炉膛里只剩一截没烧透的蓝线，Lena从灰里拈出来，认出那是账本装订用的线。Gustav 2说这样对大家都好；Lena没有回答，只把灰烬扫进一只信封，收进抽屉最深处。炉子里的火还没有完全灭。
  _effects: state_add p23-dangerous-secret state:world-vienna-1912:1241; knowledge “partner burned the ledger”; mood -0.010000000000000009; flag +ledger_burned_

- **1947.01** `state_reaction:known-affair/betrayal-in-public` tags: known-affair, love, scandal, secret, public, secret_intimacy, state, state_reaction
  背叛被讲出来以后，Lena的名字又上了一轮饭桌。有人替Lena不平，有人只想知道细节；Lena把杯子洗干净，放回柜子，决定这周不去市场。
  _effects: state_parameter known-affair.notoriety 45 -> 60; state_parameter known-affair.grief 0 -> 10_
  _causes: evt:world-vienna-1912:012604_

- **1947.01** `state_reaction:p23-dangerous-secret/a-witness-talks` tags: p23-dangerous-secret, secret, danger, leverage, exposure, loyalty, crime, politics
  审讯室里的灯亮了一夜。第二天，Lena在面包房门口听见有人低声复述自己的秘密，连停顿的位置都一模一样。
  _effects: state_parameter p23-dangerous-secret.exposure 20 -> 28; state_parameter p23-dangerous-secret.leverage 15 -> 11; state_parameter p23-dangerous-secret.loyalty 55 -> 49_
  _causes: evt:world-vienna-1912:012604_

- **1947.01** `vienna-family-childbirth/son-born` tags: family, childbirth, death, lifecycle, birth, state, state:raising-child, raising-child
  Lena在Leopoldstädter Zinshaus, gemeinsamer Gang生下一个男婴，取名Hermann 2。工友凑的钱抵了一部分，家里还是从糖罐里数出六克朗给接生的人；Gustav 2把消息带到工厂，回来时把唯一的摇篮重新刷了一遍，Lena躺在床上出了一身虚汗。
  _effects: birth male; cash -6 (midwife fee（其中6克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-71; state_add raising-child state:world-vienna-1912:1242_

- **1947.01** `p22-fake-engagement::ctx-vienna-postwar-1945::milieu-tenement/the-engagement-becomes-real` tags: fake_engagement, inheritance, romance, scandal, debt, marriage, notary, courtship
  遗嘱要求Lena在一年内结婚，否则房子归远房表亲。Gustav 2提议假订婚，条件是分到一间朝南的房；Emil Huber 3把戒指尺寸记进档案，Anna Bauer在门口偷听。半年后，两人在厨房里为一只锅吵了一架，吵完又一起把锅修好；Lena忽然发现，假戏已经不需要台词了。
  _effects: state_add p22-wild-fortune state:world-vienna-1912:1243; cash 6 (the inheritance was released after the engagement); relation acquaintance with person-materialized-world-vienna-1912-130; flag +fake_engagement_real; mood 0.050000000000000044; flag -wild_fortune_active; flag +wild_fortune_active_

- **1947.01** `state_reaction:ld18-impossible-attachment/a-family-wedding` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  亲戚的婚礼上，Lena被安排和伴侣分开坐。司仪问有没有人反对，Lena低头喝汤；伴侣在另一桌替别人倒酒，手很稳，酒没有洒出来。散席时，两个人在衣帽间碰见，只说了一句“外面下雨”。
  _effects: state_parameter ld18-impossible-attachment.pressure 22 -> 32; state_parameter ld18-impossible-attachment.grief 4 -> 8; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:012610_

- **1947.01** `state_reaction:p22-wild-fortune/a-windfall-confirms-it` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  一笔意外的小钱进了门。Lena没有添新衣服，先把欠得最久的账单付了；收账的人在门口数了两遍，临走时说了一句“看来是真的”。
  _effects: state_parameter p22-wild-fortune.height 50 -> 55; state_parameter p22-wild-fortune.witnesses 60 -> 66; state_parameter p22-wild-fortune.fragility 35 -> 32; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:012610_

- **1947.01** `state_expire:pl19-protected-scandal` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  Lena的「被小圈子护住的私情」到期；相关安排结束。
  _effects: state_remove pl19-protected-scandal state:world-vienna-1912:1058; flag -protected_scandal_active_

- **1947.01** `state_tick:under-investigation/case-progress/evidence` tags: under-investigation, legal, police, investigation, risk, state, state_tick
  调查员又来找Lena谈了一次。问话比上次具体，记录也比上次长。
  _effects: state_parameter under-investigation.progress 20 -> 35; mood -0.040000000000000036_

- **1947.01** `state_tick:debt-bondage/interest/pay-interest` tags: debt-bondage, debt, work, poverty, legal, state, state_tick
  Lena又付了一年的利息。本金几乎没动，债主的账本却翻到了新一页。
  _effects: cash -3 (debt interest（其中3克朗记入债务）); state_parameter debt-bondage.debt 25 -> 27_

- **1947.01** `state_tick:p23-political-debt/the-favor-comes-due/the-debt-is-serviced` tags: p23-political-debt, politics, debt, favor, threat, obligation, power, conspiracy
  债主派人来取一件小事：在一份名单上签个名，或者在某次会上晚到十分钟。Lena照做了，回家后把外套挂得比平时整齐。那晚的汤有点咸，但没有人提起。
  _effects: state_parameter p23-political-debt.favor 50 -> 45; state_parameter p23-political-debt.threat 35 -> 32; state_parameter p23-political-debt.visibility 25 -> 27; state_parameter p23-political-debt.conscience 45 -> 49_

- **1947.01** `state_tick:known-affair/public-year/retold` tags: known-affair, love, scandal, secret, public, secret_intimacy, state, state_tick
  Lena在市场上被人叫住，对方笑着说“就是那个人”。Lena也笑了一下，买完土豆就走；回到家才发现，手里的零钱少了一枚。
  _effects: state_parameter known-affair.notoriety 60 -> 68; reputation -0.02999999999999997; mood -0.020000000000000018_

- **1947.01** `state_tick:ld18-impossible-attachment/invented-anniversary/the-date-that-is-not-on-paper` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  Lena和伴侣把认识的那一天当作纪念日。没有登记，没有证人，只有一块从旧货摊买来的蛋糕和两杯兑了水的酒；Lena在日历上画了一个别人看不懂的记号，第二年又画在同一个格子里。
  _effects: state_parameter ld18-impossible-attachment.devotion 74 -> 78; state_parameter ld18-impossible-attachment.pressure 32 -> 29; mood 0.020000000000000018_

- **1947.01** `state_tick:df18-borrowed-luck/luck-account/price-arrives` tags: df18-borrowed-luck, luck, debt, obligation, superstition, risk, bargain, transfer
  第六个月，债主在楼梯口拦住Lena，说利息不能总按原来的算法。Lena看着对方手里的账本，忽然发现那上面的墨迹比上次新，数字也比上次多。
  _effects: cash -2 (利息被重新计算（其中2克朗记入债务）); state_parameter df18-borrowed-luck.debt 35 -> 41; state_parameter df18-borrowed-luck.luck 25 -> 20; mood -0.030000000000000027_

- **1947.01** `state_expire:p21-scandal-web` tags: p21-scandal-web, scandal_web, scandal, secret, blackmail, network, leverage, danger
  Lena的「丑闻蛛网」到期；相关安排结束。
  _effects: state_remove p21-scandal-web state:world-vienna-1912:895; flag -scandal_web_active_

- **1947.01** `state_expire:hs18-street-witness` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Lena的「街面上的目击者」到期；相关安排结束。
  _effects: state_remove hs18-street-witness state:world-vienna-1912:976_

- **1947.01** `r13-work.practice-craft::ctx-vienna-postwar-1945::milieu-tenement/split-good-wood` tags: work, craft, practice, wood, skill, vienna, urban, postwar
  Lena练到半夜，刨刃吃得太深，一块好料从中间裂开。木料钱要从下周的菜钱里出，Alois Lechner听见响声，隔着墙问是不是在劈柴。Lena把裂开的板子翻过来，看见木纹里有一道旧钉眼，才明白这块料本来就不该用。
  _effects: cash -2 (第四十个榫头（其中2克朗记入债务）); flag +work13_split_good_wood; skill_

- **1947.04** `ad20-public-mistake::ctx-vienna-postwar-1945::milieu-tenement/everyone-saw` tags: public, mistake, shame, everyday, reputation, comic, vienna, urban
  Lena在街口绊了一下，手里的纸包散开，里面的纽扣滚了一地。有人笑，有人弯腰帮忙，一个孩子把纽扣含进嘴里又吐出来。Lena蹲在地上捡，越捡越觉得所有人都在看自己的后脑勺。
  _effects: state_add ad20-public-attention state:world-vienna-1912:1295; reputation -0.03999999999999998; flag +public_mistake; knowledge “纽扣滚了一地，整条街都看见了。”; flag +public_attention_active_

- **1948.01** `p23-conman-amnesia::ctx-vienna-postwar-1945::milieu-tenement/the-policeman-at-the-next-table` tags: absurd, black_comedy, conman, memory, guilt, warmth, high_drama, vienna
  Grete Winter从隔壁桌站起来时，Berta Huber 2还在讲那个电车上认识的故事。Lena看见Berta Huber 2的手一直按在桌沿，指节发白。手铐扣上后，Berta Huber 2才慢慢转过头，说原来真的是你；那语气不像愤怒，倒像终于想起了一件旧事。
  _effects: state_add under-investigation state:world-vienna-1912:1294; relation rival with person-materialized-world-vienna-1912-67; reputation -0.04999999999999999; flag +conman_arrested_

- **1948.01** `state_reaction:p22-wild-fortune/a-witness-laughs` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  Lena的荒唐运气成了酒馆里的笑话。有人学着Lena走路的样子，有人问下一次什么时候轮到自己；Lena笑着应付，回家后把窗帘拉得比平时早。
  _effects: state_parameter p22-wild-fortune.absurdity 50 -> 56; state_parameter p22-wild-fortune.witnesses 66 -> 62; state_parameter p22-wild-fortune.fragility 32 -> 37_
  _causes: evt:world-vienna-1912:013204_

- **1948.01** `hs18-investigation.repair::ctx-vienna-postwar-1945::milieu-tenement/say-the-records-burned` tags: investigation, radio, paperwork, worker, police, history, vienna, urban
  Lena说修理铺去年失过火，底单都烧了。Grete Winter没有反驳，只问火是哪个月。Lena答得太快，对方在纸上记了一个圈。Josef Stein后来听说这件事，托人带话：那场火只烧了后院。
  _effects: state_parameter under-investigation.progress 50 -> 65; relation acquaintance with person-materialized-world-vienna-1912-53; flag +claimed_repair_records_burned; knowledge “谎话最怕被问月份。”_

- **1948.01** `state_reaction:p23-political-debt/a-purge-raises-the-price` tags: p23-political-debt, politics, debt, favor, threat, obligation, power, conspiracy
  单位里两个人被带走了。Lena经过空出来的办公桌时，看见抽屉里还留着半块面包；那天下午，债主的人又来了一次。
  _effects: state_parameter p23-political-debt.threat 32 -> 41; state_parameter p23-political-debt.visibility 27 -> 34; state_parameter p23-political-debt.conscience 49 -> 44_
  _causes: evt:world-vienna-1912:013206_

- **1948.01** `state_expire:under-investigation` tags: under-investigation, legal, police, investigation, risk, state, state_tick, state:under-investigation
  Lena的「被调查」到期；相关安排结束。
  _effects: state_remove under-investigation state:world-vienna-1912:1188_

- **1948.01** `state_tick:debt-bondage/interest/pay-interest` tags: debt-bondage, debt, work, poverty, legal, state, state_tick
  Lena又付了一年的利息。本金几乎没动，债主的账本却翻到了新一页。
  _effects: cash -3 (debt interest（其中3克朗记入债务）); state_parameter debt-bondage.debt 27 -> 29_

- **1948.01** `state_expire:known-affair` tags: known-affair, love, scandal, secret, public, secret_intimacy, state, state_tick
  Lena的「已经公开的私情」到期；相关安排结束。
  _effects: state_remove known-affair state:world-vienna-1912:1191; flag -known_affair_active_

- **1948.01** `state_expire:p22-scandal-engine` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Lena的「流言发动机」到期；相关安排结束。
  _effects: state_remove p22-scandal-engine state:world-vienna-1912:1193_

- **1948.01** `state_expire:ld18-impossible-attachment` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  Lena的「无法登记的伴侣」到期；相关安排结束。
  _effects: state_remove ld18-impossible-attachment state:world-vienna-1912:1194; flag -impossible_attachment_active_

- **1948.01** `state_tick:p23-dangerous-secret/the-secret-changes-hands/a-second-person-learns` tags: p23-dangerous-secret, secret, danger, leverage, exposure, loyalty, crime, politics
  一个曾在场的人喝多了，把故事讲给了不该听的人。第二天，Lena在市场上看见两个陌生人站在菜摊旁边，什么也不买，只看着来往的人。Lena把篮子换到另一只手上，继续挑土豆。
  _effects: state_parameter p23-dangerous-secret.exposure 28 -> 36; state_parameter p23-dangerous-secret.leverage 11 -> 7; state_parameter p23-dangerous-secret.loyalty 49 -> 43_

- **1948.01** `state_tick:p22-wild-fortune/the-story-gets-taller/the-crowd-remembers` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  一年过去，Lena的荒唐故事没有变小，反而多了一个愿意作证的人。债主没有立刻上门，亲戚也还愿意来吃饭；Lena把新添的银器擦了一遍，发现其中一只底下刻着别人的名字。
  _effects: state_parameter p22-wild-fortune.height 55 -> 59; state_parameter p22-wild-fortune.absurdity 56 -> 59; state_parameter p22-wild-fortune.witnesses 62 -> 67; state_parameter p22-wild-fortune.fragility 37 -> 39; mood 0.020000000000000018_

- **1948.01** `state_tick:df18-borrowed-luck/luck-account/paid-a-little` tags: df18-borrowed-luck, luck, debt, obligation, superstition, risk, bargain, transfer
  半年过去，Lena还了一点钱，也替债主跑了两趟腿。债主没有夸Lena，只在账本上划掉一小行；Lena却发现，自己开始下意识地绕开那家店。
  _effects: cash -1 (还掉一小笔（其中1克朗记入债务）); state_parameter df18-borrowed-luck.debt 41 -> 33; state_parameter df18-borrowed-luck.luck 20 -> 23; mood 0.010000000000000009_

- **1948.01** `state_tick:ad20-public-attention/the-attention-cycle/cools` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  Lena发现最近没有人再提那件事。报纸换了头版，邻居也换了话题；本该轻松，Lena却在买菜时反复整理衣领，好像还在等一个不会来的目光。
  _effects: state_parameter ad20-public-attention.attention 65 -> 57; state_parameter ad20-public-attention.sympathy 30 -> 27; state_parameter ad20-public-attention.opportunity 15 -> 13; mood -0.010000000000000009_

- **1948.01** `r13-work.unemployment-benefit::ctx-vienna-postwar-1945::milieu-tenement::postwar-benefit-office/postwar-benefit-granted` tags: work, unemployment, benefit, institution, poverty, vienna, urban, postwar
  战后新设的失业登记处在一间旧学校里，课桌当柜台用。Emil Huber 3问Lena战前做什么，又问他有没有被征召。Lena把退伍证明和工厂解雇单一起递过去，Emil Huber 3在两张纸之间来回看了三遍，最后批了十六周。
  _effects: cash 8 (补助金窗口的第二张表); flag +work13_postwar_benefit_granted; knowledge “the postwar benefit runs longer for returning soldiers”_

- **1948.03** `r2-faith.cemetery-plot::ctx-vienna-postwar-1945::milieu-tenement/bought-a-new-plot` tags: faith, cemetery, burial, scarcity, reuse, vienna, urban, postwar
  第七区已经没有新地，Grete Winter把地图翻到背面，指着一块靠近围墙的窄条，说十二克朗，二十年租期。Lena数完钱，Elisabeth Lechner在旁边量了尺寸，说棺材得斜着放。下葬那天，围墙外的电车每过一分钟就响一次。
  _effects: cash -12 (第七区的旧坟（其中8.2克朗记入债务）); condition; flag +bought_cemetery_plot; role; relation acquaintance with person-materialized-world-vienna-1912-2; knowledge “the new plots are a narrow strip along the cemetery wall”_

- **1948.11** `p9-history-medical-daily.clinic-queue/give-place-to-mother` tags: health, medical, public_health, family, pharmacy, sanitation, daily, injury
  Alois Kral抱着孩子连声道谢时，Lena已经弯着腰在咳。药房玻璃瓶上贴着褪色标签，喝下去满嘴甘草味；后半夜Lena听见自己牙齿打颤，炉子早灭了。
  _effects: cash -0.6 (街角药房买退烧药); health -0.05000000000000002 (延误就诊，发热加重)_

- **1949.01** `vienna-postwar-housing-1950s/stay-with-relatives` tags: adulthood, postwar, housing, family, injury
  分房名单又往后推了一年，Lena一家搬进亲戚家的厨房隔间。Emil 2送来一块旧帘子当隔断；夜里有人起身，全屋都听得见。
  _effects: cash -3 (shared household costs); health -0.03 (crowded sleeping space); condition; mood -0.020000000000000018; relation acquaintance with person:evt:world-vienna-1912:002846:child_

- **1949.01** `cj17-police.lineup::ctx-vienna-postwar-1945::milieu-tenement/wrong-man` tags: police, court, legal, investigation, mistaken_identity, humiliation, vienna, urban
  预审室里点着三盏煤气灯，Hermann Bauer从五个男人面前走过，在第四个人面前停住，又退回第二个。Elisabeth Huber把Lena的帽子摘下来看了看，最后在记录上写了“排除”。Lena走出警局时，天还没亮，扫街的人正在冲洗台阶。
  _effects: state_parameter under-investigation.progress 65 -> 55; reputation 0.020000000000000018; flag +cleared_in_lineup_

- **1949.01** `state_reaction:p22-wild-fortune/a-witness-laughs` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  Lena的荒唐运气成了酒馆里的笑话。有人学着Lena走路的样子，有人问下一次什么时候轮到自己；Lena笑着应付，回家后把窗帘拉得比平时早。
  _effects: state_parameter p22-wild-fortune.absurdity 59 -> 65; state_parameter p22-wild-fortune.witnesses 67 -> 63; state_parameter p22-wild-fortune.fragility 39 -> 44_
  _causes: evt:world-vienna-1912:013810_

- **1949.01** `state_expire:debt-bondage` tags: debt-bondage, debt, work, poverty, legal, state, state_tick, state:debt-bondage
  Lena的「债务束缚」到期；相关安排结束。
  _effects: state_remove debt-bondage state:world-vienna-1912:1189_

- **1949.01** `state_expire:p23-political-debt` tags: p23-political-debt, politics, debt, favor, threat, obligation, power, conspiracy
  Lena的「政治债务」到期；相关安排结束。
  _effects: state_remove p23-political-debt state:world-vienna-1912:1190_

- **1949.01** `state_tick:df18-borrowed-luck/luck-account/price-arrives` tags: df18-borrowed-luck, luck, debt, obligation, superstition, risk, bargain, transfer
  第六个月，债主在楼梯口拦住Lena，说利息不能总按原来的算法。Lena看着对方手里的账本，忽然发现那上面的墨迹比上次新，数字也比上次多。
  _effects: cash -2 (利息被重新计算); state_parameter df18-borrowed-luck.debt 33 -> 39; state_parameter df18-borrowed-luck.luck 23 -> 18_

- **1949.01** `state_tick:under-investigation/case-progress/evidence` tags: under-investigation, legal, police, investigation, risk, state, state_tick
  调查员又来找Lena谈了一次。问话比上次具体，记录也比上次长。
  _effects: state_parameter under-investigation.progress 55 -> 70_

- **1949.01** `state_tick:ad20-public-attention/the-attention-cycle/warms` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  Lena在街角被人认出来，对方没有要求什么，只说“上次那件事做得不错”。这句客气话被旁边的人听见，下午便有两个陌生人朝Lena点头。关注没有减少，但空气松了一点。
  _effects: state_parameter ad20-public-attention.attention 57 -> 53; state_parameter ad20-public-attention.sympathy 27 -> 33; state_parameter ad20-public-attention.opportunity 13 -> 17; mood 0.020000000000000018_

- **1949.01** `r13-fam.ask-relative-money::ctx-vienna-postwar-1945::milieu-tenement/loan-given` tags: task, family, debt, money, relative, request, vienna, urban
  Lena把信写了三遍，最后只留下房租的数目和一句“开春还”。Anton第三天就来了，从内袋摸出几张票子，没有数，只说别让嫂子知道。Lena要写借条，Anton把纸推开，说记得就行；两人在门口站了一会儿，谁也没有提小时候的事。
  _effects: cash 8 (信里只写了一个数目); flag +borrowed_from_sibling; role; relation kin with person-phase15-Anton-world-vienna-1912; knowledge “the sibling lent money without telling his wife”_

- **1949.03** `p9-social-courtship-friendship.friend-intercession/intercession-concert-ticket` tags: courtship, friendship, social, adulthood, reputation, leopoldstadt
  Lena不再让Alois Kral传话，托其带去一张星期天音乐会的站票，花了一克朗二十赫勒，位置在柱子后头。票上不写多余的字，只说若不方便，票留着也无妨。Alois Kral把票揣进衬衫内袋，Lena则把找回来的铜板一枚枚放进铁盒，等一个回音。
  _effects: cash -1.2 (音乐会站票一张); relation acquaintance with person-materialized-world-vienna-1912-141; relation acquaintance with person-materialized-world-vienna-1912-141_

- **1949.04** `p9-gap-adult-ordinary-day.market-closing/market-closing.fish-heads` tags: adulthood, daily, leisure, neighborhood, ordinary, market, food, bargain
  鱼头用报纸包着，报纸上还印着昨天的广告。Anton Bauer一边刮冰一边说，回去多搁姜，别舍不得醋。Lena把纸包拎在手里，能感觉到凉气从指缝里钻出来，走到家时报纸已经洇湿了一层。
  _effects: food; health 0.020000000000000018 (喝上了热鱼汤); relation acquaintance with person-materialized-world-vienna-1912-133_

- **1949.10** `vienna-tenement-neighbors.lost_room_key/key_found_by_neighbor` tags: home, social, family, housing
  Lena傍晚从面粉厂下工回来，发现挂在腰带上的房门钥匙不见了，在楼梯间来回找了四趟。Hermann Bauer在二楼拐角的煤堆旁捡到那把铜钥匙，钥匙上缠着红线，一眼就认出来。Hermann Bauer敲开Lena的门，把钥匙拍在桌上，说自己眼神好使。
  _effects: relation friend with person-materialized-world-vienna-1912-7; mood 0.050000000000000044_

- **1950.01** `vienna-life-injury-recovery/clinic-treatment` tags: health, work, family
  Lena在受伤后的第三天去了诊所。医生清洗伤口、换药，收下诊费，嘱咐不要急着回机器旁。Lena把药方折好，回家路上买了纱布。
  _effects: health 0.04999999999999999 (wound treatment); cash -8 (clinic and bandages); condition_
  _causes: evt:world-vienna-1912:013809_

- **1950.01** `state_expire:p23-dangerous-secret` tags: p23-dangerous-secret, secret, danger, leverage, exposure, loyalty, crime, politics
  Lena的「危险的秘密」到期；相关安排结束。
  _effects: state_remove p23-dangerous-secret state:world-vienna-1912:1241_

- **1950.01** `state_expire:p22-wild-fortune` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  Lena的「荒唐横财」到期；相关安排结束。
  _effects: state_remove p22-wild-fortune state:world-vienna-1912:1243; flag -wild_fortune_active_

- **1950.01** `state_expire:df18-borrowed-luck` tags: df18-borrowed-luck, luck, debt, obligation, superstition, risk, bargain, transfer
  Lena的「借来的好运」到期；相关安排结束。
  _effects: state_remove df18-borrowed-luck state:world-vienna-1912:1244; flag +df18_luck_settled_

- **1950.01** `state_expire:under-investigation` tags: under-investigation, legal, police, investigation, risk, state, state_tick, state:under-investigation
  Lena的「被调查」到期；相关安排结束。
  _effects: state_remove under-investigation state:world-vienna-1912:1294_

- **1950.01** `state_expire:ad20-public-attention` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  Lena的「被看见的日常」到期；相关安排结束。
  _effects: state_remove ad20-public-attention state:world-vienna-1912:1295; flag -public_attention_active_

- **1950.01** `r13-fam.apologize::ctx-vienna-postwar-1945::milieu-tenement/apology-rejected` tags: task, social, apology, reputation, conflict, vienna, urban, postwar
  Lena把带来的半块肥皂放在窗台上，说知道不够。Josef Weiss没有碰肥皂，只说那天在场的人都记得Lena笑的样子。Lena站到腿发麻，最后把肥皂收回口袋，转身时听见窗子从里面关上了。
  _effects: mood -0.07000000000000006; flag +apology_rejected; relation rival with person:evt:world-vienna-1912:002967:child_

- **1951.01** `p10-family-tasks.appeal-inheritance/appeal-inheritance.court` tags: adulthood, family, social, marriage, care, inheritance, task, appeal
  职员把信翻过来看背面，说私人纠纷不归这里管，去法院。律师的写字间在隔壁楼，开价三十克朗。Lena数了数证件夹里的钱，差得远。兄弟在门口说，那就等传票。Lena把信收好，下楼时鞋跟磕在石阶上。
  _effects: knowledge “遗产诉讼费要三十克朗，办事处不受理私人纠纷”_

- **1951.04** `vienna-tenement-neighbors.lost_room_key/key_stolen_by_stranger` tags: home, social, family, housing
  Lena记得出门时钥匙还在，回来却没了。Otto Huber说下午看见一个穿灰外套的男人在楼道里转悠，手里晃着一把铜钥匙。两人下楼查看，房门虚掩，抽屉被拉开，攒着买煤的六克朗不见了。Otto Huber陪着Lena去街角警察岗亭报了案，警察记下灰外套，说会留意。
  _effects: cash -6 (被盗的买煤钱)_

- **1951.05** `vienna-social-movement.aftermath/keep-the-list` tags: development, social_movement, organization, consequence
  Lena把环城大道写字楼管理处的名单藏进缝纫机抽屉的夹层。名单上有二十几个名字，其中两个已经搬走，一个被工厂开除。Lena没有把最后一行划掉。
  _effects: flag +movement_list_holder; reputation 0.030000000000000027_

- **1951.05** `p9-gap-adult-unemployed.labour-exchange/exchange-fee-lost` tags: adulthood, unemployment, casual_labour, poverty, daily, labour_exchange, bureaucracy
  介绍所的墙上钉着上百块木牌，大半翻过去露出灰白的背面。Emil Huber 3收了一克朗，从抽屉里摸出纸条，墨水还没干透。第二天Lena站在工厂门口，门房说清扫工昨天就齐了。
  _effects: cash -1 (职业介绍所登记费); mood -0.040000000000000036_

- **1951.08** `p9-gap-adult-solitude.remake-coat/remake-coat.short-jacket` tags: adulthood, daily, solitude, ordinary, home, mending, clothing, household
  Lena把外套的肩线拆开，往里收了四指，袖口剪掉一截，改出一件到胯骨的短上衣。剩下的布头拼成两只手套，针脚粗，戴着能挡风。她在镜子前转了一圈，肩还是有点空，但总算能穿出门。
  _effects: skill; mood 0.050000000000000044_

- **1952.01** `r13-fam.visit-grave::ctx-vienna-postwar-1945::milieu-tenement/flowers-placed` tags: task, family, grave, mourning, neighbor, grief, vienna, urban
  Lena陪Grete Huber去公墓，把一把野菊放在新翻的土上。木牌上的名字被雨冲得发白，Grete Huber用手指一笔一画描了一遍，描到最后一笔，指腹上全是泥。Lena没有劝，只蹲下来把歪掉的木牌扶正。
  _effects: cash -1 (公墓新翻的土); condition; flag +visited_a_grave_with_neighbour; role; relation friend with person-materialized-world-vienna-1912-26_

- **1953.01** `vienna-life-injury-recovery/home-care` tags: health, work, family, injury
  Lena没有去诊所，只用热水和旧布洗了伤口。第二天伤口周围发红，家里人把仅剩的干净床单撕成条。
  _effects: health -0.030000000000000027 (untreated wound); cash -2 (clean cloth); condition_
  _causes: evt:world-vienna-1912:013813_

- **1953.01** `r13-fam.apologize::ctx-vienna-postwar-1945::milieu-tenement/forgiven` tags: task, social, apology, reputation, conflict, vienna, urban, postwar
  Lena在院子的水龙头边等到Luise Kral，把那天酒桌上的话重复了一遍，没有找补。Luise Kral拧上水龙头，说那句话已经传到第三个院子了。Lena问要怎样才能收回，Luise Kral说收不回，但可以当着传话的人再说一遍是胡说的。
  _effects: reputation 0.03999999999999998; flag +apology_accepted; role; relation friend with person-luise-kral; knowledge “the insult has already reached three courtyards”_

- **1954.01** `kernel-migrate.refugee-aid::ctx-vienna-postwar-1945::milieu-tenement/civic-refugee-search` tags: migration, refugee, missing_relative, care, postwar, vienna, urban, reform
  名单墙前挤着十几个人，Josef Weiss指着一行被划掉的名字，说那是她妹妹。她替对方抄下名字，又去Elisabeth Huber的窗口问；窗口说档案在另一栋楼，她去时那栋楼已经锁门。她在档案楼门口等到锁门，只记下了一个门牌号。
  _effects: knowledge “名单上被划掉的名字要查另一栋楼的档案，窗口关门后只能等明天”; cash -3 (抄名单的纸笔和跑两栋楼的车钱); flag +searched_refugee_list; health -0.010000000000000009 (在名单墙前站了一天)_

- **1954.04** `vienna-legacy-worklife.hours-ledger/hours-ledger.refuse` tags: legacy, work, family, reform, ordinary_life
  学徒在旁边小声说，拒绝按手印的人名字会被单独抄在一张纸上。Lena没接话，把八克朗换成一克朗的硬币，数给家里时硬币在桌上滚了两圈才停。屋里的煤油灯芯剪得太短，光只够照亮手边的桌面。
  _effects: cash 8 (追回的拖欠计件工资); reputation -0.02999999999999997; relation colleague with person-materialized-world-vienna-1912-119; relation acquaintance with person-materialized-world-vienna-1912-119_

- **1954.05** `statistical_infection`
  Lena在Leopoldstädter Zinshaus, gemeinsamer Gang病倒了，肺炎让身体发热、虚弱，接下来的日子只能卧床。

- **1954.06** `statistical_recovery`
  Lena从肺炎中慢慢恢复，能下床喝水，但身体还虚弱。

- **1954.12** `p9-gap-adult-unemployed.labour-exchange/exchange-trial-work` tags: adulthood, unemployment, casual_labour, poverty, daily, labour_exchange, bureaucracy
  洗衣房里蒸汽弥漫，熨斗压在衬衫领子上咝咝作响。老板娘翻了翻Lena熨好的第一件，说领口还差些火候，手上倒还稳。两打熨完，三个克朗放在围裙口袋里，铜板还带着体温。
  _effects: cash 3 (洗衣房试工半天按件计酬); skill_

- **1955.01** `p9-social-relationship-initiative.cut-the-guarantee/refuse-to-sign` tags: courtship, friendship, family, social, initiative, housing, task, task:social
  把那张字据推回去，说房租和母亲的药费都在桌上摆着，这名字不能签。前两次的借条从证件夹里翻出来放在一起，摊平让对方看清。对方把纸卷起来收进外套，门带得比平常重，此后在街上碰见只当没认出来。
  _effects: relation_end friend with person-materialized-world-vienna-1912-82; mood -0.010000000000000009; reputation 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-148_

- **1955.01** `vienna-housing-move.rent-notice/rent-notice-demand-repair` tags: housing, home, rent, family, money
  Lena没有立刻答话，先去敲Helene Bauer的门。两人一起数落墙上的水渍和门框里灌进来的风，楼梯间的窗户修好了，自家墙皮还在剥落。Helene Bauer提议一起把话带给看门人：先修好漏水的墙角，涨租的事再谈。Lena把纸重新折好，请他把话带到门外。
  _effects: mood 0.030000000000000027; flag +rent_dispute_

- **1955.05** `vienna-tenement-neighbors.shared_stove_fire/fire_no_damage` tags: home, social, family, housing
  Lena刚把锅端下灶，火苗就蹿了起来，Anton Bauer一脚踩灭地上的油布，顺手抄起沙箱里的沙子盖住灶口。两人都没受伤，但Anton Bauer的鞋底烧穿一个洞，那是唯一一双出门的鞋。
  _effects: relation friend with person:evt:world-vienna-1912:002907:child; mood -0.04999999999999999_

- **1956.01** `r13-fam.return-hometown::ctx-vienna-postwar-1945::milieu-tenement::hometown-postwar/family-gone` tags: task, family, return, hometown, migration, relative, vienna, urban
  Lena回到老街区，老屋的屋顶塌了一角，院子里长满荨麻。Anton从城外赶来，说家里的人逃的逃、散的散，只剩自己还认得这块地。两人在门槛上坐了一会儿，Lena把箱子打开，里面是给每个人带的礼物，已经不知道该给谁。
  _effects: cash -2 (火车进站时看见旧钟楼); mood -0.030000000000000027; flag +returned_to_an_empty_home; relation kin with person-phase15-Anton-world-vienna-1912; knowledge “most of the family scattered during the war”_

- **1956.01** `vienna-church-community.tenement-prayer/rent-prayer-argument` tags: faith, social, family, home
  有人抱怨守夜人太多，踩坏了楼梯木板。楼里的人围着看，谁也没先走开。
  _effects: reputation -0.030000000000000027; mood -0.030000000000000027_

- **1956.02** `bc18-fame.wrong-bust::ctx-vienna-postwar-1945::milieu-tenement/widow-corrects` tags: fame, mistaken_identity, museum, public, invention, absurd, status, humiliation
  揭幕到一半，穿黑纱的Elisabeth Winter 3从第二排站起来，说那根火柴是她丈夫一八九三年在布尔诺登记的，专利号还刻在家里一只锡盒上。Elisabeth Bauer 2请她进办公室核对文件，Lena被留在展厅里，面对一队已经买票的小学生。第二天，铭牌换成了“无名热心市民”，Lena的名字被刮掉，只剩一道白痕。
  _effects: reputation -0.03999999999999998; state_add bc18-ridiculous-fame state:world-vienna-1912:1764; cash -1 (退掉车马费后的车钱); relation rival with person-materialized-world-vienna-1912-108; condition; flag +plaque_scraped_clean; mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-156; flag +ridiculously_famous; reputation 0.020000000000000018; mood 0.020000000000000018_

- **1956.02** `p9-gap-adult-solitude.misdelivered-letter/misdelivered-letter.sugar-jar` tags: adulthood, daily, solitude, ordinary, home, letter
  Lena把信压在厨房的糖罐底下，想着明天再问。三天后糖罐渗了油，信角洇出一片深色，收信人的名字糊了半个。她把信拿到门房那儿，门房说这地址已经退过两回了。
  _effects: skill_

- **1956.05** `vienna-historical-social-movement.public-meeting/back-immediate-action` tags: history, historical_process, social_movement, organization, politics
  有人喊罢工，有人喊谈判，Lena站到前排说先动才有得谈。保守派转身去拿大衣，Grete Berg 2追出去又回来，说外头雪深，别把人推到对面去。会议没散，火气没降。
  _effects: reputation 0.04999999999999999; mood 0.030000000000000027_

- **1957.01** `vienna-tenement-neighbors.laundry_line_dispute/subject_yields_line` tags: home, social, family, housing
  Lena看Anton Bauer盆里那几件小衬衫，把自家床单卷起来抱回屋，说等下午再晾。Anton Bauer愣了一下，闷头把衣服挂好，收工回来时在Lena门口放了一小包用旧报纸裹的洗衣碱。Lena打开报纸，碱面里还掺着几粒粗盐。
  _effects: relation friend with person:evt:world-vienna-1912:002907:child; food_
  _causes: evt:world-vienna-1912:018042_

- **1957.01** `state_tick:bc18-ridiculous-fame/ridiculous-fame-year/the-audience-gets-bored` tags: bc18-ridiculous-fame, fame, reputation, mistaken_identity, promotion, media, absurd, public
  观众开始厌倦同一个故事。园艺会请了更年轻的发明家，女子学校把Lena的名字从海报上撤下；Lena在咖啡馆听见有人说“那个人还在讲火柴”。同一个月，一张报纸把旧照片配上新标题，问Lena是否已经“过气”。纠正的冲动又回来，但没有人再提问。
  _effects: state_parameter bc18-ridiculous-fame.legitimacy 5 -> 0; state_parameter bc18-ridiculous-fame.boredom 20 -> 32; state_parameter bc18-ridiculous-fame.invitations 0 -> 0; reputation -0.020000000000000018_

- **1957.01** `p10-family-tasks.arrange-childcare/arrange-childcare.quit-job` tags: adulthood, family, social, marriage, care, inheritance, task, childcare
  厂里说半天工没了就没了，Lena没再争。厨房里少了一只面包，晚饭只有一锅糊糊。伴侣把勺子放下，说来年春天再说。夜里Lena替邻居补袜子，三个赫勒一双，缝到灯芯烧短。
  _effects: cash -4 (辞掉半天工少了一份收入（其中4克朗记入债务）); health -0.040000000000000036 (营养不足和夜里缝补的劳累)_
## Anton

Born 1912.01, alive at 1957.
Education: apprenticeship 0; occupation: none; roles: infant, child, housemaid, denouncer, ward_helper, creditor, emergency_admission, black_market_patient, separated, actor, father, registered_resident, office:放映员, tenant_organizer, movement_member, paid_out_heir, liberated_1945, bondholder, housing_waitlist, shopkeeper, polite_estrangement.

### State snapshot
- p22-family-legend [person] (ended 1912.8: replaced_by:p22-family-legend) parameters={"warmth":72,"secrecy":24,"danger":5,"promise":65} links={} ticks=0
- p22-family-legend [person] (ended 1917.1: duration expired) parameters={"warmth":75,"secrecy":20,"danger":8,"promise":42} links={} ticks=3
- raising-child [household] (ended 1937.1: duration expired) parameters={"caregiverBurden":63,"schoolProgress":43,"childConfidence":25,"careDebt":0,"schoolEnrolled":false,"leftHome":false} links={"child":"Katharina Winter"} ticks=8
- raising-child [household] (ended 1937.1: duration expired) parameters={"caregiverBurden":66,"schoolProgress":47,"childConfidence":25,"careDebt":0,"schoolEnrolled":false,"leftHome":false} links={"child":"Friedrich Winter"} ticks=7
- yf18-first-awakening [person] (ended 1929.1: duration expired) parameters={"intensity":68,"nerve":26,"talk":2,"reciprocated":true,"secret":true} links={"beloved":"Lena"} ticks=3
- apprenticeship-contract [person] (ended 1931.1: duration expired) parameters={"progress":8,"failures":2,"trade":"木工","paid":false} links={} ticks=3
- oj18-odd-apprenticeship [person] (ended 1933.1: duration expired) parameters={"trust":55,"strangeKnowledge":30,"reliability":60,"nightsWorked":24,"post":"调香学徒"} links={} ticks=2
- hs18-street-witness [person] (ended 1936.1: duration expired) parameters={"certainty":68,"danger":30,"retellings":0,"claim":"我在面包队里认出了那张脸，并把位置让给了他。","quiet":false} links={} ticks=5
- ad20-private-bargain [person] (ended 1937.1: duration expired) parameters={"leverage":66,"trust":51,"debt":61,"exit":22} links={"beneficiary":"Maria Stein"} ticks=4
- stage-sovereign [person] (ended 1937.1: duration expired) parameters={"production":"《铅皮王冠》","role":"被废黜的国王","publicBelief":28,"costumeQuality":65,"scandal":0,"performances":10} links={} ticks=2
- raising-child [household] (ended 1957.1: duration expired) parameters={"caregiverBurden":93,"schoolProgress":19,"childConfidence":0,"careDebt":8,"schoolEnrolled":false,"leftHome":false} links={"child":"Friedrich Bauer"} ticks=8
- raising-child [household] (ended 1957.1: duration expired) parameters={"caregiverBurden":40,"schoolProgress":68,"childConfidence":55,"careDebt":0,"schoolEnrolled":false,"leftHome":false} links={"child":"Berta Bauer"} ticks=8
- raising-child [household] (ended 1957.1: duration expired) parameters={"caregiverBurden":56,"schoolProgress":42,"childConfidence":55,"careDebt":0,"schoolEnrolled":false,"leftHome":false} links={"child":"Otto Bauer"} ticks=8
- raising-child [household] (active) parameters={"caregiverBurden":79,"schoolProgress":29,"childConfidence":25,"careDebt":0,"schoolEnrolled":false,"leftHome":false} links={"child":"Friedrich Bauer"} ticks=7
- oj18-odd-apprenticeship [person] (ended 1941.1: duration expired) parameters={"trust":40,"strangeKnowledge":28,"reliability":50,"nightsWorked":24,"post":"放映学徒"} links={} ticks=2
- mb17-remittance-web [household] (ended 1948.1: duration expired) parameters={"obligation":94,"supportSent":8,"arrears":12,"relativesAway":3} links={} ticks=6
- public-scandal [person] (ended 1944.1: duration expired) parameters={} links={} ticks=1
- p22-scandal-engine [person] (ended 1944.1: duration expired) parameters={"heat":68,"reach":54,"leverage":18,"shame":64} links={} ticks=2
- pl19-protected-scandal [person] (ended 1943.1: duration expired) parameters={"exposure":50,"protection":55,"leverage":47,"publicHeat":52} links={"protector":"Lena"} ticks=2
- ml18-sudden-fortune [household] (ended 1945.1: duration expired) parameters={"principal":20,"spent":0,"claims":5,"public":true,"source":"瓶盖专利的许可费"} links={} ticks=3
- bc18-bureaucratic-ghost [person] (ended 1950.1: duration expired) parameters={"fileDepth":53,"sightings":4,"risk":64,"duplicates":2,"officialStatus":"在户籍册上已死亡","alias":"一份注销的配给卡"} links={} ticks=4
- raising-child [household] (active) parameters={"caregiverBurden":67,"schoolProgress":30,"childConfidence":25,"careDebt":0,"schoolEnrolled":false,"leftHome":false} links={"child":"Anton Kral"} ticks=3
- ml18-sudden-fortune [household] (ended 1950.1: duration expired) parameters={"principal":20,"spent":5,"claims":1,"public":false,"source":"分给马票经纪人的一半"} links={} ticks=2
- stage-sovereign [person] (ended 1951.1: duration expired) parameters={"production":"《铅皮王冠》","role":"被废黜的国王","publicBelief":12,"costumeQuality":65,"scandal":6,"performances":0} links={} ticks=2
- raising-child [household] (active) parameters={"caregiverBurden":75,"schoolProgress":11,"childConfidence":25,"careDebt":0,"schoolEnrolled":false,"leftHome":false} links={"child":"Helene Kral"} ticks=3
- raising-child [household] (active) parameters={"caregiverBurden":54,"schoolProgress":39,"childConfidence":25,"careDebt":0,"schoolEnrolled":false,"leftHome":false} links={"child":"Franz 2"} ticks=2
- ml18-sudden-fortune [household] (ended 1952.10: replaced_by:ml18-sudden-fortune) parameters={"principal":42,"spent":0,"claims":3,"public":true,"source":"银行恐慌中的股票"} links={} ticks=0
- df18-uncanny-mark [person] (ended 1957.1: duration expired) parameters={"attention":73,"pain":29,"claimed":"curse","concealed":false} links={} ticks=5
- ml18-sudden-fortune [household] (ended 1955.1: duration expired) parameters={"principal":0,"spent":0,"claims":10,"public":true,"source":"赊账买的中奖彩票"} links={} ticks=3
- sm18-missing-object [person] (active) parameters={"attachment":45,"leads":13,"suspicion":68,"object":"邻居家的银顶针"} links={} ticks=1
- debt-bondage [person] (active) parameters={"debt":20,"creditor":"死者家属"} links={} ticks=2
- public-scandal [person] (active) parameters={} links={} ticks=0
- p21-scandal-web [person] (active) parameters={"exposure":80,"loyalty":17,"leverage":58,"danger":65} links={} ticks=0
- under-investigation [person] (active) parameters={"progress":25,"charge":"诈死逃债"} links={} ticks=0

### 221 subject events

- **1912.06** `p22-warm-fathers-letter::ctx-vienna-1912::milieu-tenement/the-recipe-arrives` tags: infancy, family, letter, uncle, warm, melancholy, memory, drama
  信是叔叔死前写的，在邮袋里压了两年才到。Friedrich Hofer拆开时先笑出声：里面没有遗言，只有一张李子饺子的做法和一个关于祖母的笨笑话。那天晚上，全家真的吃了饺子。
  _effects: state_add p22-family-legend state:world-vienna-1912:8; mood 0.04000000000000001; knowledge “家里有一封叔叔留下的信，里面写着李子饺子的做法。”_

- **1912.06** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Anton家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 20 -> 24; state_parameter p22-family-legend.warmth 70 -> 72; mood 0.01_
  _causes: evt:world-vienna-1912:000081_

- **1912.08** `p22-comic-christening::ctx-vienna-1912::milieu-tenement/the-priest-sneezes` tags: infancy, family, christening, church, neighbor, comic, tender, drama
  神父念到孩子的名字时打了个大喷嚏，蜡烛灭了，Anton却笑出了声。Friedrich Hofer赶紧去点蜡烛，手一抖，火苗又灭了；教堂里第一次有人笑，神父也笑了，说这是今天最响的一声阿门。
  _effects: mood 0.04; relation acquaintance with person-phase15-Anton-world-vienna-1912; flag +christening_sneeze; state_add p22-family-legend state:world-vienna-1912:9_

- **1913.01** `vienna-life-infant-first-smile/smile-at-the-lamp` tags: infancy, family, first, warm
  Friedrich Hofer把Anton抱到窗边，煤汽灯罩上有一圈晃动的光。孩子盯着看了很久，忽然笑出声，口水滴在Friedrich Hofer的袖口上。屋里的人都停了一下，像是听见了什么了不起的消息。
  _effects: mood 0.04000000000000001; health 0.010000000000000009 (a good day)_

- **1913.01** `state_tick:p22-family-legend/the-story-changes-hands/told-at-the-table` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，Anton家的故事在饭桌上换了新的讲法：多了一句笑话，少了一处哭声。听的人把汤匙放下，等下一句；讲故事的人却先去看窗子有没有关好，谁也没有先动筷子。
  _effects: state_parameter p22-family-legend.warmth 72 -> 75; state_parameter p22-family-legend.secrecy 14 -> 12; state_parameter p22-family-legend.promise 40 -> 42; mood 0.009999999999999998_

- **1913.02** `vienna-life-toddler-wrong-cradle/the-neighbour-is-mistaken` tags: infancy, family, rumour, identity, comic, drama
  Friedrich Hofer把被子摊在桌上，指着上面的补丁说这是外婆的针脚。Emil Weiss看了半天，承认自己认错了；Anton在旁边把一只木勺敲得咚咚响，像在给这场争论判案。
  _effects: relation acquaintance with person-emil-weiss; mood 0.020000000000000004; skill_

- **1913.02** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Anton家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 10 -> 14; state_parameter p22-family-legend.warmth 70 -> 72; mood 0.01_
  _causes: evt:world-vienna-1912:000084_

- **1913.02** `iw18-infancy.first-word::ctx-vienna-1912::milieu-tenement/the-dead-grandmothers-name` tags: infancy, first_word, memory, family, wonder, eerie, vienna, urban
  Anton扶着桌沿站起来，指着门口的空处，清清楚楚叫出一个名字。屋里没人教过这个词；Friedrich Hofer手里的铝勺停在半空。那是去年冬天埋掉的老人的名字，窗外正好有送煤的车经过，铁轮压过石缝。
  _effects: mood -0.03; knowledge “孩子说出的第一个词，是去年死去的祖母的名字。”; flag +first_word_dead_name_

- **1913.08** `vienna-life-toddler-first-words/first-word-nonsense` tags: infancy, family, first, comic
  Anton说了一长串谁也听不懂的话，最后用力点头，像是在宣布一件已经决定的事。Friedrich Hofer认真听完，也点了点头；孩子满意地爬走了，留下大人们互相看着，忍不住笑。
  _effects: mood 0.04; skill_

- **1914.02** `vienna-life-toddler-accident/bruised-arm` tags: infancy, accident, family, danger, injury
  Anton在楼梯口追一只滚下去的线轴，脚下一滑，胳膊先撞在铁扶手上。Friedrich Hofer听见哭声跑出来，用冷水毛巾敷住那块青紫，嘴里说着“没事”，手却一直在抖。
  _effects: health -0.050000000000000044 (fell at the stairwell); condition; mood -0.03_

- **1915.01** `vienna-life-child-family-legend/lost-relative` tags: childhood, family, secret, story
  Friedrich Hofer在收拾箱子时翻出一张没有署名的照片，说那是家里一个“去了很远地方”的人。Anton问还回不回来，Friedrich Hofer把照片翻过去，说先把名字记住，别在饭桌上问。
  _effects: knowledge “家里有一张没有署名的照片，照片上的人去了很远的地方。”; flag +family_legend_photo; mood -0.010000000000000002_

- **1915.01** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Anton家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 12 -> 16; state_parameter p22-family-legend.warmth 75 -> 77; mood 0.010000000000000002_
  _causes: evt:world-vienna-1912:000384_

- **1916.01** `vienna-life-child-first-friend/shared-toy` tags: childhood, friendship, family, comic
  Josef在楼道里滚一只铁环，Anton站在门口看。Josef把铁环推过来，说“你推一次，我推一次”。两个人从楼梯口推到院子里，铁环倒下的声音把午睡的大人吵醒了一排。
  _effects: relation friend with person-phase15-Josef-world-vienna-1912; skill; mood 0.05_

- **1916.01** `state_tick:p22-family-legend/the-story-changes-hands/a-detail-goes-missing` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，故事里最要紧的那件东西不见了：先是名字，后来是地点。Anton问起时，大人说“你记错了”；可柜子最底层那只空盒子，谁也没有扔，锁却换过了，钥匙也不见了。
  _effects: state_parameter p22-family-legend.secrecy 16 -> 20; state_parameter p22-family-legend.danger 5 -> 8; state_parameter p22-family-legend.warmth 77 -> 75; mood -0.009999999999999995_

- **1917.01** `vienna-life-child-inherited-wish/the-child-wants-a-dog` tags: childhood, family, wish, grief, uncanny, drama
  Anton说那句话只是想要一只狗，而且要“会看门的、不咬人的、像外婆家那只一样”。Friedrich Hofer松了一口气，又有点失落；那天下午，两个人用旧毛线给一只并不存在的狗量了脖围。
  _effects: mood 0.04000000000000001; skill_

- **1917.01** `state_expire:p22-family-legend` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  Anton的「家族传说」到期；相关安排结束。
  _effects: state_remove p22-family-legend state:world-vienna-1912:9_

- **1918.01** `p9-gap-childhood-chores.laundry-help/laundry-three-heller` tags: childhood, household, chores, school, task, daily, laundry, work
  床单浸了碱水，沉得拽不动。Anton站在木凳上，把湿布一点点递过绳，水顺着肘弯滴进袖口。Anna Moser在绳头数夹子，最后一条挂好，从围裙口袋里摸出三枚赫勒，按进Anton掌心。晚上洗手时，虎口那道口子被水一蜇，Anton才看见。
  _effects: cash 0.03 (帮邻居晾床单挣的三赫勒); health -0.030000000000000027 (碱水泡手，虎口裂开); relation acquaintance with person-anna-moser; relation acquaintance with person-materialized-world-vienna-1912-19_

- **1918.08** `vienna-childhood-street.market-errand/errand-bullied` tags: childhood, street, social, home
  Anton被推到拱廊柱子边，围裙带子绕了两圈，系在铁环上。Anton一挣，肩膀撞上石柱，整条胳膊麻了一下。Josef提着菜篮过来，把篮子往地上一放，从怀里摸出削土豆的小刀，挑开绳结，没跟那两个孩子说一句话。
  _effects: relation friend with person-phase15-Josef-world-vienna-1912; mood -0.05; condition_

- **1919.01** `p9-gap-childhood-chores.market-line/line-both-families` tags: childhood, household, chores, school, task, daily, market, food
  队伍拐弯时，Friedrich Hofer朝Anton招手。Anton挤过去，替两家把面包领出来，纸包用不同的绳结系住。家里人晚上解开绳结，先掂了掂份量，再问价钱；Anton把每一包的面包数、找零和欠的铜板都说了一遍，家里人听完才把两包分别收进柜子。
  _effects: food; relation acquaintance with person-friedrich-hofer; skill; relation acquaintance with person-materialized-world-vienna-1912-26_

- **1920.01** `p9-gap-childhood-chores.laundry-help/laundry-three-heller` tags: childhood, household, chores, school, task, daily, laundry, work
  床单浸了碱水，沉得拽不动。Anton站在木凳上，把湿布一点点递过绳，水顺着肘弯滴进袖口。Hermann Winter在绳头数夹子，最后一条挂好，从围裙口袋里摸出三枚赫勒，按进Anton掌心。晚上洗手时，虎口那道口子被水一蜇，Anton才看见。
  _effects: cash 0.03 (帮邻居晾床单挣的三赫勒); health -0.030000000000000027 (碱水泡手，虎口裂开); relation acquaintance with person-materialized-world-vienna-1912-17; relation acquaintance with person-materialized-world-vienna-1912-17; relation acquaintance with person-materialized-world-vienna-1912-10_

- **1921.01** `p9-gap-childhood-chores.market-line/line-both-families` tags: childhood, household, chores, school, task, daily, market, food
  Josefine Hofer把Anton拽到队伍前头，往自己身前塞，说“孩子占不了多大地儿”。窗口一次递出两包面包，Anton把邻居那包夹在胳肢窝，自己这包抱在胸前。到Leopoldstädter Zinshaus, gemeinsamer Gang门口，Anton蹲下把两包并排，按Josefine Hofer说的份量分开，连找零的铜板也分成两小堆。
  _effects: food; relation acquaintance with person-josefine-hofer; skill; relation acquaintance with person-materialized-world-vienna-1912-32_

- **1921.09** `vienna-childhood-friends.courtyard-race/fell-on-wet-stones` tags: childhood, social, school, street, injury
  晒衣绳上的水一滴一滴落在石板上。Anton跑到第二圈，鞋底一滑，膝盖先着地。Otto Winter从屋里端出半盆清水，蹲下冲掉伤口里的沙，又用手帕扎紧，说今天别跑了。
  _effects: health -0.040000000000000036 (膝盖在湿石板上磕破); relation acquaintance with person-otto-winter_

- **1922.01** `p9-gap-childhood-chores.laundry-help/laundry-three-heller` tags: childhood, household, chores, school, task, daily, laundry, work
  “拽平，别留褶。”Josefine Hofer在绳子那头喊。Anton踮着脚把床单拉直，碱水把指缝泡得发白。收工时天已经黑了，Josefine Hofer数了三赫勒，又在围裙上擦干手才递过来。Anton把钱塞进袜筒，回家路上一直攥着，虎口的裂口沾了汗，火辣辣地疼。
  _effects: cash 0.03 (帮邻居晾床单挣的三赫勒); health -0.030000000000000027 (碱水泡手，虎口裂开); relation acquaintance with person-josefine-hofer_

- **1922.06** `p9-childhood-household.strap-by-the-door/took-punishment` tags: childhood, family, household, home, siblings, illness, neighbors, injury
  Anton把手掌摊在身前，眼睛盯着门后的皮带。几下之后，Friedrich Hofer停了手。Anton自己去找扫帚，把地上的碎瓷一片片扫干净，又用湿布擦灶台。两个人在厨房里各做各的，只听见烟纸燃烧的细响。
  _effects: health -0.03 (挨了几下皮带); mood -0.05; relation kin with person-friedrich-hofer_

- **1922.07** `vienna-childhood-street.cigarette-card/card-gift` tags: childhood, street, social, home
  烟草店的门铃响一次，Anton就往柜台边挪一步。Lena终于从柜台底下抽出一张风景卡，用手掌抹了抹，还是皱的。“拿去吧。”Lena说完就去招呼别的客人。Anton把卡举到鼻子前闻，一股烟草味，回家路上把多出来的一张卡分给Lena看。
  _effects: mood 0.06; reputation 0.02; relation friend with person-phase15-Lena-world-vienna-1912_

- **1923.01** `p9-gap-childhood-chores.market-line/line-both-families` tags: childhood, household, chores, school, task, daily, market, food
  队伍拐弯时，Anna Moser朝Anton招手。Anton挤过去，替两家把面包领出来，纸包用不同的绳结系住。家里人晚上解开绳结，先掂了掂份量，再问价钱；Anton把每一包的面包数、找零和欠的铜板都说了一遍，家里人听完才把两包分别收进柜子。
  _effects: food; relation acquaintance with person-anna-moser; skill; relation acquaintance with person-materialized-world-vienna-1912-36_

- **1926.01** `p9-childhood-youth-aspiration.join-a-club/went-once-and-left` tags: adolescence, education, aspiration, school, books, club, exam, task
  Anton交了第一个月的会费，进去坐了一刻钟。屋里太吵，下棋的争论盖过了念书的声音，他借的书也被人翻得卷了边。下个月他路过门口，没再进去交十赫勒。
  _effects: cash -0.1 (只交了一个月会费); relation acquaintance with person-materialized-world-vienna-1912-55; flag +workers_youth_quit; mood -0.020000000000000004; relation acquaintance with person-materialized-world-vienna-1912-55_

- **1926.09** `yf18-body.danube-cabin::ctx-vienna-reform-1930::milieu-tenement/wade-in-first` tags: body, desire, river, swimming, shame, first_love, reform, medical
  多瑙河的浴棚按男女分开，木板缝里能看见对面的人影。Anton穿着借来的毛线泳衣，站在第三间门口不敢下水；Lena从水里冒出来，头发贴在额头上，说水不冷。Anton走进河里时，满脑子都是自己肋骨上那道疤。
  _effects: state_add yf18-first-awakening state:world-vienna-1912:121; health 0.019999999999999997 (cold river water and a long swim); relation friend with person-phase15-Lena-world-vienna-1912; mood 0.03; flag +yf18_first_awakening_active_

- **1927.01** `state_tick:yf18-first-awakening/half-year-of-glances/answered-glance` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Anton在教堂门口或学校走廊里又遇见Lena。这一次对方先点了头，Anton准备好的整段话全忘了，只把手里的书换到另一只手上；回家后Anton才发现，自己把书拿倒了。
  _effects: state_parameter yf18-first-awakening.intensity 50 -> 55; state_parameter yf18-first-awakening.nerve 15 -> 23; state_parameter yf18-first-awakening.reciprocated false -> true; relation friend with person-phase15-Lena-world-vienna-1912; mood 0.03_

- **1927.01** `r13-edu.music-lesson::ctx-vienna-reform-1930::milieu-tenement/broken-string` tags: education, music, lesson, craft, culture, reform, medical, schooling
  Anton换把时用力过猛，弦轴崩了，琴弦抽在手背上。Rosa Winter没有责备，只让Anton先学三个月空弦。Anton每天对着镜子拉同一个音，拉到最后，连邻居都不再敲墙，只是经过门口时会放慢脚步。第二天Anton照常来，手上缠着布。弦上还有血。
  _effects: cash -2 (借来的小提琴); health -0.019999999999999997 (借来的小提琴); skill; relation acquaintance with person-materialized-world-vienna-1912-15_

- **1927.06** `p9-childhood-adolescence.church-club/club-one-visit-only` tags: adolescence, friendship, identity, work, school, secret, church
  Anton去了一个下午，看那些旧歌本里夹着褪色的圣像卡，工厂来的几个年轻人在最后一排用手指敲长凳打拍子。第二个星期天Anton没再去，在院子里帮母亲晾被单。
  _effects: relation acquaintance with person-phase15-Lena-world-vienna-1912; mood 0.009999999999999995; skill_

- **1927.11** `yf18-politics.latin-pamphlet::ctx-vienna-reform-1930::milieu-tenement/pass-it-on` tags: politics, school, pamphlet, censorship, awakening, reform, medical, schooling
  Rosa Winter把一本拉丁文课本推到Anton面前，说第三十四页的译文错了。Anton翻到那一页，夹在里面的是一张油印纸，写着面粉配给和工厂检查的数字。放学后，Anton把纸抄了一遍，塞进Hedwig的历史作业本；那天晚上，Anton第一次觉得自己住的街区有一张看不见的地图。
  _effects: knowledge “配给数字与官方公告并不一致”; flag +yf18_read_pamphlet; relation acquaintance with person-materialized-world-vienna-1912-15; mood 0.029999999999999992; relation acquaintance with person-materialized-world-vienna-1912-52_

- **1927.12** `yf18-dare.bridge-rail::ctx-vienna-reform-1930::milieu-tenement/climb-back-down` tags: dare, bridge, river, friendship, risk, reform, medical, schooling
  Anton的手已经搭上栏杆，听见桥下有驳船拉笛，忽然把手收回来。Hedwig骂了一句，Lena却把围巾解下来递给Anton；三个人在桥头站了一会儿，谁也没有再提这件事。
  _effects: state_parameter yf18-first-awakening.intensity 60 -> 63; state_parameter yf18-first-awakening.nerve 23 -> 18; relation friend with person-phase15-Lena-world-vienna-1912; mood -0.010000000000000002_

- **1928.01** `yf18-firstlook.essay-exam::ctx-vienna-reform-1930::milieu-tenement/fail-the-exam` tags: first_love, exam, essay, school, humiliation, reform, medical, schooling
  成绩单发下来，作文那一栏是“不及格”。Anton把成绩单折成小方块，塞进电车月票的夹层；回家路上，Anton第一次觉得Katharina Hofer的名字比分数更沉。夜里Anton把作文重写了一遍，没有交。
  _effects: state_parameter yf18-first-awakening.intensity 55 -> 63; state_parameter yf18-first-awakening.secret true -> true; flag +yf18_failed_essay; mood -0.039999999999999994_

- **1928.01** `state_reaction:yf18-first-awakening/exam-week-distraction` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  考试周里，Anton把课本摊在桌上，眼睛却一直看着窗外那条电车线。笔记的页边多了几个没有写完的名字，Anton用橡皮擦掉，纸面起了毛。
  _effects: state_parameter yf18-first-awakening.intensity 63 -> 60; state_parameter yf18-first-awakening.talk 0 -> 2_
  _causes: evt:world-vienna-1912:002650_

- **1928.01** `state_tick:yf18-first-awakening/half-year-of-glances/answered-glance` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Anton在教堂门口或学校走廊里又遇见Lena。这一次对方先点了头，Anton准备好的整段话全忘了，只把手里的书换到另一只手上；回家后Anton才发现，自己把书拿倒了。
  _effects: state_parameter yf18-first-awakening.intensity 63 -> 68; state_parameter yf18-first-awakening.nerve 18 -> 26; state_parameter yf18-first-awakening.reciprocated true -> true; relation friend with person-phase15-Lena-world-vienna-1912; mood 0.030000000000000013_

- **1928.01** `r13-civ.learn-instrument::ctx-vienna-reform-1930::milieu-tenement/teacher-left` tags: culture, music, instrument, learning, craft, reform, medical, schooling
  Grete Lechner教了三周，忽然说要去外地，把琴谱留给Anton，却没提退学费。Anton抱着琴站在门口，听见楼上的钢琴声一遍遍弹同一段练习曲。
  _effects: mood -0.06; flag +music_teacher_left; skill; relation acquaintance with person-materialized-world-vienna-1912-39_

- **1928.02** `yf18-dare.prater-slide::ctx-vienna-reform-1930::milieu-tenement/ride-in-the-dark` tags: dare, prater, fairground, comic, friendship, reform, medical, schooling
  普拉特的木滑道在闭园后还亮着一盏值班灯。Anton和Hedwig从围栏底下钻进去，用一块麻袋垫着滑下来，木槽里的蜡味呛得人直笑。滑到底时，Franz Winter提着灯站在出口，问他们要不要再买一张票。
  _effects: mood 0.05; cash -1 (a late ticket paid to the watchman); reputation -0.01; flag +yf18_prater_stunt; relation acquaintance with person-materialized-world-vienna-1912-12_

- **1928.07** `r15-work.master-takes-on::ctx-vienna-reform-1930::milieu-tenement/unpaid-trial` tags: work, craft, apprentice, trade, poverty, reform, medical, schooling
  Anna Stein 2先说试三个月，不给工钱，只管一顿午饭。家里同意了，因为多一张嘴比多一双手更难。Anton每天最早到，最晚走，三个月后师傅才把契约拿出来。
  _effects: food; mood -0.039999999999999994; state_add apprenticeship-contract state:world-vienna-1912:218; relation acquaintance with person-materialized-world-vienna-1912-43; education apprenticeship; role_

- **1928.08** `r3-teen.foster-family::ctx-vienna-reform-1930::milieu-tenement/settles` tags: foster_care, family, placement, belonging, institution, reform, medical, schooling
  寄养母亲在碗柜第三层给Anton留了一个位置，放她的搪瓷碗和一把小勺。第一顿饭是土豆糊，Hedwig把唯一的蛋黄拨给她。Anton没有吃，先把碗洗了，洗得比谁都久。
  _effects: mood 0.06; flag +settled_with_foster_family; relation guardian with person-friedrich-hofer; move place-wien-leopoldstadt-tenement; relation acquaintance with person-materialized-world-vienna-1912-24_

- **1928.10** `r2-leisure.servant-trial::ctx-vienna-reform-1930::milieu-tenement/hired-after-trial` tags: domestic_service, servant, hiring, household, reference, reform, medical, schooling
  试用日的白围裙浆得发硬。Ferdinand Bauer让Anton先擦餐厅的十二把椅子，再用手背试炉门温度；k. u. k. Landwehr-Infanterie, Wiener Ergänzungsbezirk戴着戒指的手指在椅背上一划，举到窗边看。Anton说上一家做了两年，k. u. k. Landwehr-Infanterie, Wiener Ergänzungsbezirk问为什么离开，Ferdinand Bauer在门后轻轻咳了一声。
  _effects: cash 1 (试用日的白围裙); flag +hired_after_trial; role; relation colleague with person-materialized-world-vienna-1912-31; knowledge “the mistress reads references closely and tests dust with a ”; employment Dienstmädchen @ cinema:person-materialized-world-vienna-1912-43-evt:world-vienna-1912:002597; relation acquaintance with person-materialized-world-vienna-1912-31; relation acquaintance with person-materialized-world-vienna-1912-22_

- **1929.01** `state_expire:yf18-first-awakening` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Anton的「第一次心动」到期；相关安排结束。
  _effects: state_remove yf18-first-awakening state:world-vienna-1912:121; flag -yf18_first_awakening_active_

- **1929.01** `state_tick:apprenticeship-contract/workshop-year/mistake` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Anton废掉了一块料，师傅扣了工钱。晚饭时谁也没提这件事。
  _effects: state_parameter apprenticeship-contract.failures 0 -> 1; cash -1 (wasted material); mood -0.04000000000000001_

- **1929.01** `r13-edu.exam-eve::ctx-vienna-reform-1930::milieu-tenement/passed-entrance-exam` tags: education, exam, study, poverty, adolescence, reform, medical, schooling
  Anton把煤油灯芯剪短，省下油熬到后半夜。代数题做错三遍，Anton就用冷水拍脸，再把公式抄到手腕内侧。考试那天，监考把袖口翻了一遍，Anton还是把最后一道题解完了。放榜那天，Anton在人群后面站了很久，才敢往前挤。
  _effects: mood 0.06; flag +passed_entrance_exam; skill; relation acquaintance with person-materialized-world-vienna-1912-66_

- **1930.01** `oj18-perfume.apprentice::ctx-vienna-reform-1930::milieu-tenement/master-loses-his-nose` tags: perfume, apprentice, smell, shop, craft, work, odd_job, reform
  小巷电影院的鼻子先坏了：闻不出煤气味，也闻不出玫瑰。医生说是常年吸香料的结果。小巷电影院把配方本推到Anton面前，说“以后你闻，我记账”；柜台后面的椅子第一次让Anton坐。
  _effects: state_add oj18-odd-apprenticeship state:world-vienna-1912:257; cash 2 (took over the counter); skill; flag +perfume_apprentice; knowledge “师傅闻不出煤气味了，配方本从今天起由我闻、他记。”; role; flag +odd_job_apprentice_

- **1930.01** `state_tick:apprenticeship-contract/workshop-year/mistake` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Anton废掉了一块料，师傅扣了工钱。晚饭时谁也没提这件事。
  _effects: state_parameter apprenticeship-contract.failures 1 -> 2; cash -1 (wasted material); mood -0.04000000000000001_

- **1930.01** `kernel-social.lending::ctx-vienna-reform-1930::milieu-tenement/lending.coal-money` tags: task, task:social, social, lending, debt, neighbor, money, everyday
  Berta Weiss 2说煤店的账拖不过去，向Anton借五克朗。Anton从工钱袋里抽出钱，Berta Weiss 2在烟盒背面写了借条，说发薪日一定还；两人把烟盒压在厨房的盐罐下面。那天晚上，Anton家的炉子只烧了半筐煤。
  _effects: cash -5 (lent five kronen for the neighbour’s coal bill); relation acquaintance with person-materialized-world-vienna-1912-6; role; flag +loan_outstanding; knowledge “借条写在烟盒背面，压在厨房的盐罐下面。”; relation acquaintance with person-materialized-world-vienna-1912-6_

- **1930.02** `vienna-social-movement.recruitment/report-to-official` tags: development, social_movement, organization, politics
  Anton把传单交给楼里的门房。门房没有接，只让Anton自己去找警察局。那天傍晚，两个穿便衣的人在街口站了很久。
  _effects: role; reputation 0.019999999999999997; relation acquaintance with person-materialized-world-vienna-1912-4_

- **1930.02** `vienna-parish-aid.rent-box/rent-box.accept-all` tags: faith, parish, mutual_aid, poverty, family
  煤袋落在台阶上，扬起细细一层黑末。Berta Kral用铅笔头在蓝格册上写门牌号，问房东姓什么，又叮嘱别把面包票弄丢。灶上水壶开始叫，Anton才想起屋里连只干净的杯子都没有。
  _effects: cash 6 (互助会补上本月房租差额); food; relation acquaintance with person-materialized-world-vienna-1912-4; flag +parish_registered_

- **1930.02** `r2-faith.charity-hospital-bed::ctx-vienna-reform-1930::milieu-tenement::r2-faith.charity-hospital-bed-medical/helped-with-triage` tags: charity, hospital, bed, certificate, triage, reform, medical, schooling
  流感把病房塞满了，Anna Stein 2让Anton帮忙把走廊里的病人按轻重排队。Anton把一个喘不上气的孩子先推进去，后面的人骂了一声，又让开。Josef Berg拿来一摞慈善床的表格，Anna Stein 2说现在没空填，先救人。
  _effects: reputation 0.05; flag +helped_triage_during_epidemic; role; relation colleague with person-materialized-world-vienna-1912-43; knowledge “the charity bed paperwork can wait until after triage”_

- **1930.03** `vienna-medical-treatment.toothache/dentist-pull` tags: health, medical, family, money
  诊室在二楼，楼梯间飘着石炭酸味。医生把钳子举到灯下看了看，叫Anton攥紧扶手。Friedrich Hofer站在门边数墙上的价目表：拔牙两克朗五十赫勒，药棉五十赫勒，连消炎水另算。
  _effects: cash -3 (牙医拔牙费用); health 0.05999999999999999 (拔除病牙解除疼痛); mood -0.03_

- **1930.05** `vienna-legacy-worklife.sick-fund/sick-fund.fill-form` tags: legacy, work, family, reform, ordinary_life
  表格有四栏，第四栏要写“工种及所属行会”。Anton问工友平时怎么称呼自己的活，工友靠在机器旁边说“就是上油”。办事员的印章是木柄的，按下去时咔的一声。
  _effects: relation colleague with person-materialized-world-vienna-1912-43; skill_

- **1930.08** `p9-gap-adult-solitude.window-argument/window-argument.peek` tags: adulthood, daily, solitude, ordinary, home, neighbor, overheard
  Anton下楼倒水，在楼梯口看见院子里站着一对夫妻，男人的围裙上还沾着面粉，女的攥着一张工钱条。她没插话，提着壶又上楼，关门时听见那女人说“一星期八克朗怎么够”。
  _effects: mood -0.03; skill_

- **1931.01** `oj18-perfume.recipe::ctx-vienna-reform-1930::milieu-tenement/customer-allergy` tags: perfume, shop, recipe, theft, customer, work, odd_job, reform
  Berta Weiss 3试了新到的紫罗兰香精，脖颈当天起了一圈红疹。Anton认出那批香精兑了工业酒精，追到门口把人叫回来，退了钱，又写了一张配方让药房配温和的。Berta Weiss 3后来带来一篮李子，说是自家树上结的。
  _effects: cash -1 (refunded the harsh violet essence); reputation 0.03; relation friend with person-materialized-world-vienna-1912-30; skill; flag +warned_allergy; knowledge “那批紫罗兰香精兑了工业酒精，闻起来甜，擦在皮肤上会起疹。”; relation acquaintance with person-materialized-world-vienna-1912-30_

- **1931.01** `state_expire:apprenticeship-contract` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick, state:apprenticeship-contract
  Anton的「学徒契约」到期；相关安排结束。
  _effects: state_remove apprenticeship-contract state:world-vienna-1912:218; role_

- **1931.01** `state_tick:oj18-odd-apprenticeship/strange-year/learned-the-building` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  又过了一个冬天，Anton能从楼梯的响声判断是谁在值夜，也能从煤气灯的颜色判断哪一段管道该修。师傅把巡查路线改了三次，最后仍然照Anton画的那张走；两个人都没有提这件事。
  _effects: state_parameter oj18-odd-apprenticeship.trust 45 -> 55; state_parameter oj18-odd-apprenticeship.strangeKnowledge 20 -> 30; state_parameter oj18-odd-apprenticeship.nightsWorked 0 -> 24; cash 2 (night-shift wages); skill_

- **1931.01** `kernel-health.task-house-call::ctx-vienna-reform-1930::milieu-tenement::house-call-medical-students/house-call-medical-ambulance` tags: health, task, house_call, care, poverty, reform, medical, schooling
  助理医生拿不准，叫了救护车。Anton被抬进医院，走廊里等了六个小时才排到床位；家里人后来算了一笔账，救护车比药贵。救护车在石板上颠，他抓着担架边，数着路灯。医院门口的担架已经排到街上。
  _effects: move place-wien-allgemeines-krankenhaus; cash -15 (ambulance and hospital admission); health 0.05 (admitted for observation and oxygen); role; knowledge “实习医生拿不准就会叫救护车；走廊等六个小时才有床，车费比药贵。”_

- **1931.02** `p9-gap-adult-solitude.leaking-shoe/leaking-shoe.stitched` tags: adulthood, daily, solitude, ordinary, home, repair, shoe, poverty
  Anton用鞋蜡把裂缝填上，又拿粗针和麻线把鞋底缝了一圈。针脚歪，鞋底一高一低，走路时右脚落地总比左脚重。第二天上工回来，脚后跟磨出一个水泡，可鞋没再渗水。
  _effects: skill_

- **1931.06** `hs18-queue.figure::ctx-vienna-reform-1930::milieu-tenement/give-your-place` tags: historical_figure, queue, recognition, bread, witness, history, reform, medical
  队伍往前挪时，Anton认出前面那个把帽檐压低的人——报纸上见过那张脸，Sigmund Freud。对方手里也攥着一张配给证，指节冻得发白。Anton把自己的位置让出来，说自己去另一条队；Sigmund Freud点了一下头，没有报名字。
  _effects: state_add hs18-street-witness state:world-vienna-1912:328; relation acquaintance with person-sigmund-freud; food; flag +yielded_place_to_historical_figure_

- **1931.09** `p9-social-family-conflict-care.sick-parent-night/hire-neighbor-daycare` tags: family, care, siblings, inheritance, housing, money
  Anton请楼下的Hermann Kral白天来照看Friedrich Hofer，先付一周六克朗工钱，讲好每天另管两顿饭，煤钱也从这六克里出。Hermann Kral上午换床单，下午喂药，临走把便盆提到楼道口。Anton下工回来先摸煤箱，再在练习本上记下当天的饭钱和煤钱，看见Friedrich Hofer的嘴唇不再干裂。
  _effects: cash -6 (支付邻居照看工钱和煤钱); relation acquaintance with person-hermann-kral; health 0.040000000000000036 (白天有人按时喂药和换洗)_

- **1932.01** `vienna-life-depression/laid-off` tags: adulthood, depression, work, unemployment
  厂里把一张短工名单贴在厂门口。Anton的名字在第三行，旁边写着“下周等通知”。等到月底，通知没有来，工票也停了。
  _effects: unemployment (laid off in the depression); cash -5 (lost wages); condition_

- **1932.01** `state_tick:hs18-street-witness/memory-drift/holds` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Anton又把那天的顺序在脑子里走了一遍：先是门响，再是靴子，最后才是那声喊。细节还在，只是每讲一次，旁边就多出一点别人替你补上的颜色。
  _effects: state_parameter hs18-street-witness.certainty 80 -> 82_

- **1932.01** `r13-civ.ask-pharmacist::ctx-vienna-reform-1930::milieu-hospital/double-dose-caught` tags: health, pharmacy, advice, dosage, trust, reform, medical, schooling
  Grete Huber发现处方上写着一天三次，可瓶签上是一天六次，拿铅笔把“六”划掉，让Anton回去找医生重签。Anton问会不会得罪人，Grete Huber说吃错药的人不会来道谢。
  _effects: cash -2 (柜台后面的小秤); flag +pharmacist_caught_overdose; relation colleague with person-materialized-world-vienna-1912-26; knowledge “the bottle label doubled the prescribed dose”_

- **1932.08** `ad20-police-stop::ctx-vienna-reform-1930::milieu-hospital/sent-on` tags: police, legal, street, everyday, obligation, risk, reform, medical
  Anna Stein 2把Anton的证件翻了两遍，问这么晚去哪。Anton说回家；Anna Stein 2看了看地址，又看了看Anton的鞋，把证件还回来，说“走大路”。Anton走出十几步，才发现自己一直屏着呼吸。
  _effects: mood 0.009999999999999995; flag +police_let_go; knowledge “警察看了地址，让走大路。”_

- **1932.09** `vienna-medical-treatment.night-fever/sweat-it-out` tags: health, medical, family, money
  Anton说胡话时念着车间的排班表，Grete Huber一句句应着，拿小勺往嘴里送温水。床头那半瓶退烧药早见了底，她没舍得倒最后一滴，留着天亮再说。
  _effects: condition; relation friend with person-materialized-world-vienna-1912-26_

- **1932.10** `vienna-historical-social-movement.district-list/organize-relief-table` tags: history, historical_process, social_movement, organization, politics
  后屋的桌上摊着旧报纸，Anton用尺子画格子，一格一户，旁边写清煤价和面包房欠条。Lena指着第三格说那家孩子咳了整夜，先划过去。蜡烛烧到桌沿时，名单终于能看懂了。
  _effects: skill; relation acquaintance with person-phase15-Lena-world-vienna-1912; mood 0.03_

- **1933.01** `p23-revenge-marriage::ctx-vienna-reform-1930::milieu-hospital/they-decide-to-stay-married` tags: love, revenge, marriage, family_enemy, debt, warmth, high_drama, reform
  婚礼后的第三个月，Anton在厨房里煮汤，Friedrich Huber进来把一封信放在桌上。信是Grete Huber写的，说要收回房子。Friedrich Huber说我们可以搬走；Anton把汤勺放下，说那就搬。那天晚上，两个人第一次像夫妻那样商量一件小事。
  _effects: mood 0.05; flag +marriage_of_choice_

- **1933.01** `state_expire:oj18-odd-apprenticeship` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  Anton的「奇职学徒」到期；相关安排结束。
  _effects: state_remove oj18-odd-apprenticeship state:world-vienna-1912:257; role; flag -odd_job_apprentice_

- **1933.01** `state_tick:hs18-street-witness/memory-drift/holds` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Anton又把那天的顺序在脑子里走了一遍：先是门响，再是靴子，最后才是那声喊。细节还在，只是每讲一次，旁边就多出一点别人替你补上的颜色。
  _effects: state_parameter hs18-street-witness.certainty 82 -> 84_

- **1933.01** `r13-civ.recover-at-home::ctx-vienna-reform-1930::milieu-hospital/neighbor-soup` tags: health, recovery, care, household, food, reform, medical, schooling
  Hedwig端来一碗兑了水的牛奶，顺手把Anton家的炉子捅旺。Anton靠在床头，听Hedwig讲楼下谁也被传染了，谁家把病人送去了医院。人走后，屋里还留着一点煤烟和奶味。
  _effects: cash -1 (退烧后的第一碗粥); health 0.04 (退烧后的第一碗粥); flag +recovered_with_neighbor_help_

- **1933.01** `hs18-queue.refugee::ctx-vienna-authoritarian-1934::milieu-hospital/slip-food-and-leave` tags: refugee, queue, station, papers, official, history, vienna, urban
  Anton没有填表，只把半块面包和一张电车票塞进孩子的口袋。Anton Bauer 2敲了敲桌子，叫下一个。Maria Stein追到门口，问姓名；Anton摆摆手，说名字写在票背面。其实票背面什么也没有。
  _effects: cash -1 (gave away a tram ticket); relation acquaintance with person-materialized-world-vienna-1912-87; flag +helped_refugee_without_papers; mood 0.01999999999999999; relation acquaintance with person-materialized-world-vienna-1912-79; relation acquaintance with person-materialized-world-vienna-1912-87_

- **1933.10** `ad20-favor-called-in::ctx-vienna-authoritarian-1934::milieu-hospital/do-the-favor` tags: favor, obligation, everyday, trust, debt, risk, vienna, urban
  Maria Stein说只需要Anton在明天下午去一趟车站，把一个箱子交给穿灰外套的人。Anton问箱子里是什么；Maria Stein说“你不需要知道”。Anton还是去了，因为当年Maria Stein替Anton垫过一笔医药费。
  _effects: state_add ad20-private-bargain state:world-vienna-1912:428; cash -1 (the trip to the station); relation acquaintance with person-materialized-world-vienna-1912-87; flag +favor_done; mood -0.010000000000000009; knowledge “箱子里是什么，邻居没有说。”; flag +private_bargain_active_

- **1933.12** `p9-gap-adult-solitude.window-argument/window-argument.closed` tags: adulthood, daily, solitude, ordinary, home, neighbor, overheard
  Anton把窗关上，争吵声立刻变成闷响，像隔着一层棉被。可那男人的一句话还是从缝里钻进来，她躺到床上翻来覆去，数着墙上的水渍，到很晚才睡着。
  _effects: mood -0.03_

- **1934.01** `state_tick:hs18-street-witness/memory-drift/blurs` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Anton忽然想不起那个人先迈的是左脚还是右脚。邻居说自己记得清清楚楚，还补了一个细节；Anton听着，竟分不清那是自己看见的，还是后来听来的。
  _effects: state_parameter hs18-street-witness.certainty 84 -> 76; mood -0.020000000000000004_

- **1934.01** `state_tick:ad20-private-bargain/the-favor-ages/called-in` tags: ad20-private-bargain, private, bargain, favor, debt, trust, leverage, exit
  对方在一个不合时宜的时刻提起旧事，语气很客气，意思却不客气。Anton听见自己答应得太快，挂断以后才发现手心有一层薄汗。
  _effects: state_parameter ad20-private-bargain.leverage 50 -> 58; state_parameter ad20-private-bargain.debt 55 -> 59; state_parameter ad20-private-bargain.trust 55 -> 51; mood -0.03_

- **1934.01** `kernel-health.task-pharmacy-hunt::ctx-vienna-authoritarian-1934::milieu-hospital::pharmacy-war-requisition/pharmacy-war-flour-powder` tags: health, task, pharmacy, shortage, black_market, vienna, urban, crisis
  药房的后门开着，一个穿军大衣的人按包卖药：退烧粉、止血粉、止痛粉。Anton买了三包，回家发现其中一包是面粉；再去找人，后门已经锁了。他把那包面粉倒进碗里，又倒回纸袋，没舍得扔。
  _effects: cash -15 (three packets bought from a man in an army coat); condition; role; knowledge “后门按包卖的药可能是面粉；再回去找人，门已经锁了。”_

- **1934.02** `ml18-inheritance.uncles-press::ctx-vienna-authoritarian-1934::milieu-hospital/sell-the-subscription-list` tags: inheritance, family, business, debt, legal, money, vienna, urban
  公证人把一封厚信推到桌子中央：Anton的叔父在第二区留下一间小印刷所、一台坏掉的压机和十四克朗的欠账。Hedwig说那台压机早该当废铁，但订阅名单上还有三百个名字。Anton把名单卖给对街的印厂，替叔父还了债，剩下的钱刚好够换一套冬衣。
  _effects: cash 12 (sale of the print shop subscription list); state_add ml18-sudden-fortune state:world-vienna-1912:471; skill; flag +inherited_print_shop; mood 0.039999999999999994; flag +sudden_fortune; reputation 0.020000000000000004; mood 0.03_

- **1934.02** `vienna-courtship-courtyard.letter-answer/mother-opened-letter` tags: adulthood, courtship, partner, social, family
  回信没有到Anton手里。Friedrich Huber的母亲先拆了它，连信封上的邮戳一起摊在洗衣房的桌上，说有人写字来缠自家孩子。话传到院子里时已经添了油，Hedwig隔着栏杆把原话学了一遍，说得很难听；Friedrich Huber再见到Anton时，眼睛先往母亲那边看。Anton站在水桶边，知道这封信已经被拆成了两家的脸面。
  _effects: reputation -0.06; mood -0.08; relation acquaintance with person-materialized-world-vienna-1912-22_

- **1934.03** `vienna-family-divorce/partner-moves-to-shared-housing` tags: family, marriage, divorce, housing, lifecycle, separation, household
  Friedrich Huber把一只箱子和工票搬去合租房，带走一半锅碗。Anton留在Leopoldstädter Zinshaus, gemeinsamer Gang，把空出来的床租给一个学徒，用租金补房租；搬家花掉四克朗，Anton在户籍上成了分居的人，夜里听见隔壁床板响，总要愣一下。
  _effects: relation_end partner with person-materialized-world-vienna-1912-22; household; cash -4 (moving and separate goods); mood -0.06; role_

- **1935.01** `state_tick:hs18-street-witness/memory-drift/blurs` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Anton忽然想不起那个人先迈的是左脚还是右脚。邻居说自己记得清清楚楚，还补了一个细节；Anton听着，竟分不清那是自己看见的，还是后来听来的。
  _effects: state_parameter hs18-street-witness.certainty 76 -> 68; mood -0.02_

- **1935.01** `state_tick:ad20-private-bargain/the-favor-ages/called-in` tags: ad20-private-bargain, private, bargain, favor, debt, trust, leverage, exit
  对方在一个不合时宜的时刻提起旧事，语气很客气，意思却不客气。Anton听见自己答应得太快，挂断以后才发现手心有一层薄汗。
  _effects: state_parameter ad20-private-bargain.leverage 58 -> 66; state_parameter ad20-private-bargain.debt 59 -> 63; state_parameter ad20-private-bargain.trust 51 -> 47; mood -0.030000000000000002_

- **1935.01** `r13-civ.enter-hospital::ctx-vienna-authoritarian-1934::milieu-hospital/admitted-third-class` tags: health, hospital, admission, deposit, institution, vienna, urban, crisis
  Josef Berg把押金收据和住院单钉在一起，让Anton去三楼东侧等床。走廊里全是折叠床，Luise Stein给Anton一条洗得发硬的毯子，说今晚先别喝水。Anton把鞋塞在枕头下面，听着隔壁的呻吟睡了过去。
  _effects: cash -8 (住院处窗口的押金); health 0.05999999999999999 (住院处窗口的押金); condition; flag +hospitalized_third_class; relation acquaintance with person-materialized-world-vienna-1912-71; relation acquaintance with person-materialized-world-vienna-1912-71_

- **1935.08** `absurd15-stage.cast-the-king::ctx-vienna-authoritarian-1934::milieu-hospital/cast-as-king` tags: performance, theatre, power, irony, work, pretend, vienna, urban
  Lena把一顶掉漆的铅皮王冠扣在Anton头上，说不用演得像国王，只要像一个人突然被允许坐下。首演那天，Anton在台上忘了两句台词，观众却以为那是停顿。
  _effects: state_add stage-sovereign state:world-vienna-1912:530; cash 2 (首演酬劳); role; reputation 0.03; relation acquaintance with person-materialized-world-vienna-1912-77; flag +stage_sovereign; reputation 0.04000000000000001_

- **1936.01** `state_expire:hs18-street-witness` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Anton的「街面上的目击者」到期；相关安排结束。
  _effects: state_remove hs18-street-witness state:world-vienna-1912:328_

- **1936.01** `state_tick:ad20-private-bargain/the-favor-ages/kept` tags: ad20-private-bargain, private, bargain, favor, debt, trust, leverage, exit
  那笔私下的安排又过了一年。没有人提起，但Anton在街上遇见对方时，两个人都多停了一拍。Anton知道，沉默本身也是利息。
  _effects: state_parameter ad20-private-bargain.trust 47 -> 51; state_parameter ad20-private-bargain.debt 63 -> 61; state_parameter ad20-private-bargain.exit 20 -> 22; mood 0.010000000000000002_

- **1936.01** `state_tick:stage-sovereign/performance-run/held-the-crowd` tags: stage-sovereign, performance, theatre, pretend, status, irony, power, no-real-authority
  又一年在舞台上扮演君主。Anton学会了在说错台词时停顿，让观众以为那是表演；散场后，有人在门口等着看Anton卸妆，想确认王冠下面是不是一张普通的脸。
  _effects: state_parameter stage-sovereign.publicBelief 20 -> 28; state_parameter stage-sovereign.performances 0 -> 10; mood 0.03_

- **1936.01** `r13-work.open-shop::ctx-vienna-authoritarian-1934::milieu-tenement/licence-refused` tags: commerce, shop, capital, licence, risk, vienna, urban, crisis
  Anton把申请递进执照窗口，Helene Weiss的房契却少一个签章。办事员把材料推回来，说铺面不能用来做食品生意。押金已经付了，卷帘门开了半天又拉下去；Anton坐在空铺子里，把货单折成一只小船。
  _effects: cash -4 (卷帘门上的第一块木牌); mood -0.1; flag +work13_shop_licence_refused; knowledge “the lease lacks a signature needed for a food licence”_

- **1936.07** `p9-social-tenement-neighbors.stove-and-line/stove-and-line.move-to-line-end` tags: housing, neighbors, tenement, daily, money, reputation
  Anton把自己泡着的衣服端到绳子最末一段，把靠近炉子的位置让给Katharina Weiss，条件是对方看着火，别让水烧干。Katharina Weiss点头，往炉膛里添了一块煤，说中午以前一定把炉子空出来。两家的盆就挨着放在窗下。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-70; mood 0.03; relation acquaintance with person-materialized-world-vienna-1912-70; relation acquaintance with person-materialized-world-vienna-1912-37_

- **1936.08** `vienna-family-fatherhood/child-born-at-home` tags: family, childbirth, death, lifecycle, birth, injury, state, state:raising-child
  Elisabeth Winter在Leopoldstädter Zinshaus, gemeinsamer Gang生下一个孩子，取名Berta Bauer。Anton在厨房和走廊之间来回，接生的人让烧水、拿布、付六克朗；孩子天亮后睡着了，Anton从此在户籍表上多了“父亲”一栏，手背上还留着烫水壶的红印。
  _effects: birth female; health -0.05 (childbirth); cash -6 (midwife fee); role; state_add raising-child state:world-vienna-1912:575_

- **1937.01** `state_expire:ad20-private-bargain` tags: ad20-private-bargain, private, bargain, favor, debt, trust, leverage, exit
  Anton的「私下的账」到期；相关安排结束。
  _effects: state_remove ad20-private-bargain state:world-vienna-1912:428; flag -private_bargain_active_

- **1937.01** `state_expire:stage-sovereign` tags: stage-sovereign, performance, theatre, pretend, status, irony, power, no-real-authority
  Anton的「舞台上的君主」到期；相关安排结束。
  _effects: state_remove stage-sovereign state:world-vienna-1912:530; flag -stage_sovereign_

- **1937.01** `p9-history-public-action.organize-relief/credit-own-name` tags: politics, union, party, activism, public_action, relief, leaflet, task
  夜里 Anton 在灯下重算赊账，Ferdinand Weiss 2 坐在对面搓手，说先顾眼前。锅里剩下的汤已经凝了一层皮，窗外的风把账页吹得哗哗响。
  _effects: cash -5 (以自家名义赊购面粉); food; mood -0.05; relation acquaintance with person-materialized-world-vienna-1912-46; relation acquaintance with person-materialized-world-vienna-1912-46_

- **1937.04** `vienna-life-overcrowded-flat/move-to-shared-tenement` tags: housing, home, health, family, household, injury
  Anton把床架拆开，用绳子捆在借来的手推车上，搬进利奥波德城的合租房。押金和车钱花掉八克朗；新住处人多、墙薄，但至少每个人有一块能躺下的地方，Anton的腰在冷风里疼了一路，夜里却第一次不用侧着身睡。
  _effects: residence; cash -8 (deposit and cart); health -0.020000000000000004 (moving in winter); relation acquaintance with person-materialized-world-vienna-1912-75_

- **1937.10** `vienna-housing-move.rent-notice/rent-notice-neighbors-together` tags: housing, home, rent, family, money
  Anton把Grete Winter和楼里另两户人家叫到楼道，把那张纸摆在窗台上传看。看门人在楼梯拐角听着，说房东礼拜三来收钱。几家人合计好，到那天一起等在门厅，先把克朗递过去，再把修补的事一件件摆出来。Anton把纸折进围裙口袋，觉得人凑齐了话也硬气些。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-2; mood 0.04; flag +tenant_collective; relation acquaintance with person-materialized-world-vienna-1912-2_

- **1937.12** `vienna-medical-treatment.toothache/barber-pull` tags: health, medical, family, money
  Berta Kral在门口替Anton捏着帽子，听见里面一声闷哼。弗朗茨把牙扔进搪瓷盘，说瞧这牙根都黑了。收钱时他多要了二十赫勒，算明矾水的钱，说下次别再拖成这样。
  _effects: cash -1.2 (理发师拔牙收费); health 0.029999999999999992 (病牙被拔除但手法粗糙); mood -0.019999999999999997_

- **1938.01** `vienna-life-injury-recovery/clinic-treatment` tags: health, work, family
  Anton在受伤后的第三天去了诊所。医生清洗伤口、换药，收下诊费，嘱咐不要急着回机器旁。Anton把药方折好，回家路上买了纱布。
  _effects: health 0.05 (wound treatment); cash -8 (clinic and bandages); condition_
  _causes: evt:world-vienna-1912:006674_

- **1938.01** `vienna-life-anschluss-1938/complies` tags: politics, persecution, 1938
  Anton Weiss在街口设了登记桌，要求住户交出姓名、职业和宗教。Anton排队填了表，回家把门牌擦干净。楼里有人连夜搬走，也有人站在阳台上挥手。
  _effects: role; cash -3 (new permits and stamps); condition_

- **1938.01** `p10-family-tasks.arrange-childcare/arrange-childcare.sister` tags: adulthood, family, social, marriage, care, inheritance, task, childcare
  姐姐家在多瑙河对岸，院子里晾着床单。孩子在那里住了一个月，回来时脸圆了些，手里攥着一块河边的白石子。可他站在门口不肯叫Anton，姐姐蹲下来哄，Anton把行李提进屋，听见身后孩子叫了一声姨。
  _effects: mood -0.09999999999999998; relation kin with person-phase15-Hedwig-world-vienna-1912_

- **1938.01** `oj18-cinema.reel::ctx-vienna-authoritarian-1934::milieu-tenement/cut-the-reel` tags: cinema, film, projection, night, censorship, work, odd_job, vienna
  放映到第十一本，胶片在片门里卷成一团。Anton剪掉烧焦的一截，发现后面接的是一卷没送审的新闻片：军靴踏过广场，镜头扫过一张张被按下去的脸。Luise Stein在黑暗里说“接回正片”，Anton照做了。
  _effects: organization_found 小巷电影院 (household_firm); position 放映员 @cinema:person-phase15-Anton-world-vienna-1912-evt:world-vienna-1912:007710; state_add oj18-odd-apprenticeship state:world-vienna-1912:677; cash 1 (projectionist wages); skill; flag +cut_the_reel; knowledge “第十一本胶片里夹着没送审的新闻片，{projectionist}让我接回正片。”; role; flag +odd_job_apprentice_

- **1938.07** `vienna-legacy-worklife.union-office/union-office.post-ledger` tags: legacy, work, family, reform, ordinary_life
  浆糊是隔夜的，刷上去时带着股酸味。Anton把纸四角按平，有人凑近念出“一九〇一年，欠三十四克朗”。办公室里的椅子腿不平，坐在上面的人一动就晃，可没人起身。
  _effects: reputation 0.04999999999999999; relation acquaintance with person-materialized-world-vienna-1912-80; flag +union_ledger_public; relation acquaintance with person-materialized-world-vienna-1912-42; relation acquaintance with person-materialized-world-vienna-1912-80_

- **1938.10** `vienna-parish-aid.soup-kitchen/soup-kitchen.help-wash` tags: faith, parish, mutual_aid, poverty, family
  Anton喝完汤没走，留下来帮修女把大锅刷净，又把木碗按大小摞好。厨房后头有半块面包和一碗剩汤，修女说是帮忙人的午饭。Berta Huber 2在门口等着一起回去，说下回还来，洗锅的活总有人要干。
  _effects: food; skill; relation acquaintance with person-materialized-world-vienna-1912-67; mood 0.01999999999999999; relation acquaintance with person-materialized-world-vienna-1912-67_

- **1939.01** `fw19-split.borrowed-goat::ctx-vienna-authoritarian-1934::milieu-tenement/goat-eats-ration-card` tags: goat, courtyard, ration, sharing, comic, warm, vienna, urban
  山羊把桌上的配给卡嚼了。Anton追出去时，只抢回半张；Rosa Winter说“它不知道那是粮”，Maria 2却笑得直不起腰。那天晚上，全家用半张卡领了半份面包。
  _effects: cash -1 (cash -1); relation acquaintance with person-materialized-world-vienna-1912-15; state_parameter raising-child.careDebt 0 -> 2; flag +goat_ate_ration_card; mood 0.030000000000000027_

- **1939.01** `state_tick:oj18-odd-apprenticeship/strange-year/trusted-with-the-keys` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  两年过去，Anton已经能闭着眼说出哪块地板会响、哪盏煤气灯该在几点关。师傅把备用钥匙交下来，没有解释为什么第三把钥匙磨得最亮；Anton也没有问，只在巡查簿最后一页画了一个小小的记号。
  _effects: state_parameter oj18-odd-apprenticeship.trust 30 -> 40; state_parameter oj18-odd-apprenticeship.strangeKnowledge 18 -> 28; state_parameter oj18-odd-apprenticeship.nightsWorked 0 -> 24; cash 2 (night-shift wages); skill_

- **1939.01** `agency:attend_meeting` tags: agency, agency:attend_meeting
  Anton走到Arbeiter-Zeitung im Vorwärts-Haus门口，看见便衣和拥挤的人群，最终没有进去。
  _effects: mood -0.04000000000000001; reputation -0.010000000000000009_

- **1939.08** `vienna-tenement-neighbors.lost_room_key/key_stolen_by_stranger` tags: home, social, family, housing
  Anton记得出门时钥匙还在，回来却没了。Helene Kral说下午看见一个穿灰外套的男人在楼道里转悠，手里晃着一把铜钥匙。两人下楼查看，房门虚掩，抽屉被拉开，攒着买煤的六克朗不见了。Helene Kral陪着Anton去街角警察岗亭报了案，警察记下灰外套，说会留意。
  _effects: cash -6 (被盗的买煤钱); relation friend with person-materialized-world-vienna-1912-16; mood -0.1_

- **1939.08** `vienna-legacy-worklife.hours-ledger/hours-ledger.sign` tags: legacy, work, family, reform, ordinary_life
  印泥是赭红色的，像干了的面包瓤。Anton按完手印，工头把表举到窗边吹干，阳光里那张纸透出指印的轮廓。楼下第十区的街面传来运煤车的铁皮声，星期六下午突然显得很宽。
  _effects: cash -1 (星期六下午减少的计件工钱); mood 0.05; flag +accepted_hours_reform_

- **1940.01** `vienna-family-same-sex-male/private-arrangement` tags: family, intimacy, same_sex, persecution, lifecycle, partnership
  Anton和Friedrich Huber在城边租了一间小屋，对外只说是同事合住。房租四克朗，两人不同时出门，信件用假名，夜里把窗帘拉严；Friedrich Huber在门后放了一根木棍，Anton把两人的工票分开放，连咳嗽都压着声。
  _effects: relation partner with person-materialized-world-vienna-1912-22; mood 0.04; cash -4 (separate room rent)_

- **1940.01** `office16-corruption.inspection::ctx-vienna-authoritarian-1934::milieu-tenement/clean-audit` tags: office, corruption, audit, legal, power, dark, vienna, urban
  Anton Bauer 2带了两只空箱子来，走的时候还是空的。Anton把三年的合同、收据和会议记录按月份排在地上，Anton Bauer 2抽查了十二份，每一份都能对上签字人；最后一句是“下次可以少准备一点”。
  _effects: reputation 0.04999999999999999; organization_funds; skill; mood 0.03; flag +passed_audit; knowledge “审计抽查了十二份合同，每一份都能对上签字人。”_

- **1940.01** `p10-family-tasks.find-missing-kin/find-missing-kin.toolbox` tags: adulthood, family, social, marriage, care, inheritance, task, missing_kin
  仓库里一股潮味。Anton蹲下把工具箱打开，凿子用油布包着，刨子柄上缠着哥哥自己的麻绳。老板说人搬走两个月了。Anton把工具卖给旧货商，三克朗，买票时数了两遍。
  _effects: cash 3 (卖掉哥哥留下的工具换路费); mood -0.16_

- **1940.02** `major-crisis.rent-increase/tenant-meeting` tags: crisis, housing, rent, eviction, family, poverty
  巷口洗衣房的老板娘把几张椅子摆开，叫来半条街的租户。Anton把涨租单摊在桌上，逐条念出上面的数字；Mitzi Berg站在门边，既没走，也没替房东说话。大家决定先集体迟交一个月，签名纸传到Anton手里时，纸上已经有一块油渍。
  _effects: cash -2 (paper, ink and tram fare for the tenants meeting); role; flag +rent_strike; relation acquaintance with person-materialized-world-vienna-1912-76; reputation 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-76_

- **1940.02** `vienna-tenement-neighbors.laundry_line_dispute/compromise_split_line` tags: home, social, family, housing
  Anton把洗好的床单搭上院子里的公用晾衣绳，占了整条。Lena抱着一盆湿衣服下来，说自家孩子明天要穿干净衬衫上学。两人在绳子两头扯了一阵，最后Anton把床单对折，腾出一半，Lena用木夹子把衬衫一件件排上去。谁也没道歉，但第二天见面都点了头。
  _effects: relation acquaintance with person-phase15-Lena-world-vienna-1912; mood 0.01999999999999999_

- **1940.03** `vienna-housing-move.flat-viewing/flat-viewing-deposit` tags: housing, home, rent, family, money, household
  窗子推开只有一线天光，墙纸边角翘起，Anton用指甲一刮便掉下一层湿粉。看门人揣好定金，说这间是朝北的，冬天火炉要添得勤些。Otto Moser站在楼梯口没进屋，只替Anton看着箱子。
  _effects: cash -4 (当场付下定金和钥匙钱); residence; relation acquaintance with person-materialized-world-vienna-1912-82_

- **1940.06** `vienna-legacy-worklife.sick-fund/sick-fund.fill-form` tags: legacy, work, family, reform, ordinary_life
  衙门走廊的地砖是黑白相间的，Anton站着站着就把重心从一只脚换到另一只脚。窗口里的办事员姓什么没人知道，只叫“三号窗”。表递进去时，里面说“等复核”，声音很平。
  _effects: relation colleague with person-materialized-world-vienna-1912-52; skill_

- **1941.01** `state_expire:oj18-odd-apprenticeship` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  Anton的「奇职学徒」到期；相关安排结束。
  _effects: state_remove oj18-odd-apprenticeship state:world-vienna-1912:677; role; flag -odd_job_apprentice_

- **1941.01** `agency:attend_meeting` tags: agency, agency:attend_meeting
  Anton走到Arbeiter-Zeitung im Vorwärts-Haus门口，看见便衣和拥挤的人群，最终没有进去。
  _effects: mood -0.03999999999999998; reputation -0.010000000000000009_

- **1941.03** `pl19-bridge.public-rumor::ctx-vienna-authoritarian-1934::milieu-tenement/a-room-with-a-list` tags: scandal, protection, network, press, media, rumor, bridge, vienna
  一位官员在散场后拦住Anton，说可以借一间会议室，每周二晚上用，条件是名单由他过目。Anton看见他手里还攥着当天的报纸，头版折得很整齐；那间会议室后来真的开了灯，只是门口多了一把没人坐的椅子。
  _effects: state_add pl19-protected-scandal state:world-vienna-1912:887; relation friend with person-phase15-Lena-world-vienna-1912; flag +official_room; knowledge “会议室每周二晚上开灯，名单要先给一位官员过目。”; flag +protected_scandal_active_

- **1941.03** `state_reaction:pl19-protected-scandal/a-public-question` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  有人在一场公开活动里问起Anton的“私人安排”，语气客气，问题却像一根针。Anton笑着答了别的事，回家后才发现手心全是汗。
  _effects: state_parameter pl19-protected-scandal.publicHeat 40 -> 52; state_parameter pl19-protected-scandal.protection 65 -> 59; reputation -0.03_
  _causes: evt:world-vienna-1912:009418_

- **1941.06** `vienna-housing-move.rent-notice/rent-notice-pay` tags: housing, home, rent, family, money
  Anton把通知念给Maria Kral听，Maria Kral摇头说是楼梯间那几块新玻璃的账。Anton去楼下杂货铺换开一张五克朗的纸币，回屋一枚一枚摆开数，煤箱底多留了二十赫勒。
  _effects: cash -2 (按月多付两克朗房租); mood -0.030000000000000027_

- **1941.11** `r3-crime.false-accusation::ctx-vienna-authoritarian-1934::milieu-tenement/maid-confesses` tags: crime, court, servant, class, injustice, vienna, urban, crisis
  就在法官要敲槌时，Rosa Weiss 2忽然站起来，说糖罐是她打碎的，碎片埋在院子里的李树下。小巷电影院的脸涨得通红，Anton Bauer 2被叫去后院挖了半个钟头。Anton被当庭释放，门外下着雨，Rosa Weiss 2追出来，把一个纸包塞进Anton手里，里面是三个月的工钱。
  _effects: reputation 0.04999999999999999; flag +cleared_by_maid_confession; relation friend with person-materialized-world-vienna-1912-96; knowledge “the sugar bowl was broken and buried in the yard”; relation acquaintance with person-materialized-world-vienna-1912-96_

- **1942.01** `p22-dead-voice-child::ctx-vienna-authoritarian-1934::milieu-tenement/the-neighbor-calls-it-a-seance` tags: child, dead_relative, voice, eerie, dark, grief, family_secret, scandal
  Friedrich Huber把这件事传遍了整条街，说Anton家请了招魂师。区里的人上门问话，孩子却躲在桌子底下不肯出来；Anton在门口解释了半天，最后只说了一句“她只是想奶奶了”。第二天，窗台上被人放了一小袋盐和一张驱邪的纸条。他把盐袋放在窗台，孩子从桌下伸出手把它推开了。
  _effects: state_add public-scandal state:world-vienna-1912:885; state_add p22-scandal-engine state:world-vienna-1912:886; relation rival with person-materialized-world-vienna-1912-22; relation kin with person:evt:world-vienna-1912:002844:child; reputation -0.03; flag +seance_rumour; mood -0.030000000000000027; flag +scandal_engine_active_

- **1942.01** `state_tick:pl19-protected-scandal/the-network-meets/someone-wants-a-favor` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  有人替Anton挡了一次采访，随后在走廊里提起自己儿子的学徒期满。Anton知道这不是闲聊；当天晚上，那张写着名字的纸条被压在糖罐下面，像一枚没有付清的硬币。
  _effects: state_parameter pl19-protected-scandal.leverage 35 -> 47; state_parameter pl19-protected-scandal.protection 59 -> 55; state_parameter pl19-protected-scandal.exposure 45 -> 50; mood -0.020000000000000018_

- **1942.01** `r13-civ.help-refugee::ctx-vienna-authoritarian-1934::milieu-tenement/sent-to-relief-office` tags: social, refugee, shelter, war, trust, vienna, urban, crisis
  Anton没有让Josef进门，只把救济站的地址写在烟盒背面，又画了怎么绕过岗亭。Josef把烟盒攥在手里，鞠了一躬。第二天，走廊的墙上多了一张用铅笔写的谢谢。
  _effects: reputation 0.030000000000000027; flag +directed_refugee_to_relief; knowledge “the relief office opens at seven and does not ask for a resi”; relation acquaintance with person-materialized-world-vienna-1912-93_

- **1942.01** `office16-hire.protege::ctx-vienna-authoritarian-1934::milieu-tenement/refused-by-committee` tags: office, hire, patronage, bureaucracy, work, power, vienna, urban
  编制委员会只用了十分钟就否掉了Franz Bauer的名字：预算冻结，岗位归并，连桌子都要搬去仓库。Anton把那张表折起来，答应明年再试。Franz Bauer说没关系，第二天去了另一家事务所面试。
  _effects: mood -0.040000000000000036; relation acquaintance with person:evt:world-vienna-1912:001622:child; flag +protege_hiring_refused; knowledge “编制委员会今年冻住了所有新增岗位。”_

- **1942.06** `r3-mig.refugee-aid-society::ctx-vienna-authoritarian-1934::milieu-tenement::war-refugee-relief/police-raid-on-society` tags: migration, relief, organization, charity, risk, vienna, urban, crisis
  两个便衣从后门进来，Hermann Winter把名册摊在桌上，一页页翻。Berta Weiss 3说名册上只有领汤的人，Hermann Winter说“领汤的人也要登记原籍”。地下室的锅被踢翻，豆汤流到门槛。Anton从煤槽爬出去时，听见Berta Weiss 3在里屋咳嗽。
  _effects: mood -0.12; condition; flag +police_raid_on_aid_society; relation rival with person-materialized-world-vienna-1912-17; relation friend with person-materialized-world-vienna-1912-30; knowledge “the police take the society’s membership ledger”_

- **1942.07** `vienna-adult-social.burial-fund/burial-fund.skipped` tags: adulthood, social, work, family
  Anton对Josef Hofer说这个月实在挤不出来，房租刚涨了半个克朗。Josef Hofer把本子翻到另一页，说那就先记着，只是下个月得补齐。午休铃响时，Anton的工具箱上还留着本子压出的印子。
  _effects: mood -0.04999999999999999; relation colleague with person-materialized-world-vienna-1912-107; relation acquaintance with person-materialized-world-vienna-1912-107_

- **1942.10** `state_reaction:public-scandal/gossip` tags: public-scandal, scandal, reputation, social, state, state_reaction, childhood, street
  Anton走进咖啡馆时，邻桌的声音低了一拍。没有人当面说什么，但每个人都知道该说什么。
  _effects: mood -0.030000000000000027; reputation -0.030000000000000027_
  _causes: evt:world-vienna-1912:010170_

- **1943.01** `office16-budget.sign-or-block::ctx-vienna-authoritarian-1934::milieu-tenement/blocked-the-permit` tags: office, budget, permit, administration, power, economy, vienna, urban
  Anton把一份扩建许可证压在抽屉最下面，理由是排水和消防通道不合规。申请人Hermann Winter在走廊里等到下班，最后只拿到一张写着“补件”的纸条。Anton知道这份许可明年还会再来，但今年不会从自己的桌上出去。
  _effects: reputation 0.020000000000000018; skill; relation rival with person-materialized-world-vienna-1912-17; flag +blocked_permit; knowledge “扩建申请的排水图与消防通道不符合现行规定。”_

- **1943.01** `state_reaction:p22-scandal-engine/a-new-scandal-feeds-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Anton的新故事登出来时，旧的那一页也被重新翻到桌面上。Anton发现两件事共用同一个证人，而那个证人上周还来借过盐。
  _effects: state_parameter p22-scandal-engine.heat 55 -> 61; state_parameter p22-scandal-engine.reach 45 -> 49; state_parameter p22-scandal-engine.shame 55 -> 58; state_parameter p22-scandal-engine.leverage 20 -> 22; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:010168_

- **1943.01** `state_tick:p22-scandal-engine/the-rumor-learns-new-words/the-story-turns-on-its-keeper` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  一个曾经替Anton传话的人搬走了，带走了半条街的信任。第二天，信箱里多了一张没有署名的明信片，上面只写着“我还记得”；Anton把明信片翻过来，背面是空的。
  _effects: state_parameter p22-scandal-engine.heat 61 -> 68; state_parameter p22-scandal-engine.reach 49 -> 54; state_parameter p22-scandal-engine.leverage 22 -> 18; state_parameter p22-scandal-engine.shame 58 -> 64; mood -0.020000000000000018_

- **1943.01** `state_expire:pl19-protected-scandal` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  Anton的「被小圈子护住的私情」到期；相关安排结束。
  _effects: state_remove pl19-protected-scandal state:world-vienna-1912:887; flag -protected_scandal_active_

- **1943.01** `r13-fam.ask-neighbour-help::ctx-vienna-authoritarian-1934::milieu-tenement/borrowed-coal` tags: task, social, neighbor, help, poverty, vienna, urban, crisis
  Anton把空煤筐拎到隔壁门口，说只借一筐，等手头松了就还。Berta Kral看了看筐底的锈，进屋铲了半筐，又从灶边拿了两块引火的柴。Anton道谢时，Berta Kral说这条走廊里借东西要记着，不是记在纸上。
  _effects: food; condition; flag +borrowed_coal_from_neighbour; relation friend with person-materialized-world-vienna-1912-4_

- **1943.07** `r1-fam.inheritance-dispute::ctx-vienna-authoritarian-1934::milieu-tenement/inheritance.lost` tags: family, inheritance, will, court, workshop, vienna, urban, crisis
  官司打了两年。Mitzi Huber每次开庭都换一条领带，Lena每次都坐在同一把椅子上。最后法院把工坊判给了Lena，Anton拿到一笔折价款，扣掉诉讼费只剩一半。Anton在工坊门口站了很久，最后把钥匙从钥匙圈上拧下来，放在窗台上。
  _effects: cash 5 (封蜡下面的名字); condition; flag +lost_the_family_workshop; role; relation rival with person-phase15-Lena-world-vienna-1912; knowledge “法院把工坊判给了年长的那个孩子。”; relation acquaintance with person-materialized-world-vienna-1912-113_

- **1943.09** `vienna-social-movement.recruitment/join-and-carry` tags: development, social_movement, organization, politics
  Anton在楼梯下面接到一张折成四折的传单。纸上没有署名，只写着下一次集会的地址。Anton去了，在昏暗的屋里报上姓名，成为圣马克斯殡葬合作社的一员，并答应负责自己所在街区的联络。
  _effects: organization_membership; role; relation acquaintance with person-materialized-world-vienna-1912-110; relation acquaintance with person-materialized-world-vienna-1912-110_

- **1943.09** `vienna-medical-treatment.toothache/dentist-pull` tags: health, medical, family, money
  钳子夹住牙根时，Anton听见自己太阳穴里咯的一声。医生往牙槽里塞了团浸药棉，叫咬住别松。下楼时Luise Winter扶着胳膊，说嘴里的血味比啤酒苦多了。
  _effects: cash -3 (牙医拔牙费用); health 0.05999999999999999 (拔除病牙解除疼痛); mood -0.030000000000000027_

- **1944.01** `r15-fam.school-registration::ctx-vienna-authoritarian-1934::milieu-tenement/keeps-home` tags: family, child, school, education, school_child, vienna, urban, crisis
  Anton没有给Otto Bauer报名。家里需要一双能看摊的手，学校也还欠着上一学期的纸笔钱；晚上Otto Bauer把别人的课本借来看，Anton假装没有看见。
  _effects: state_parameter raising-child.caregiverBurden 52 -> 55; state_parameter raising-child.schoolProgress 24 -> 8; state_parameter raising-child.childConfidence 47 -> 40; state_parameter raising-child.careDebt 4 -> 6; state_parameter raising-child.schoolEnrolled false -> false; state_parameter raising-child.leftHome false -> false; cash 1 (the child's small earnings at the stall); flag +child_kept_from_school_

- **1944.01** `state_expire:public-scandal` tags: public-scandal, scandal, reputation, social, state, state_tick, state:public-scandal
  Anton的「公开丑闻」到期；相关安排结束。
  _effects: state_remove public-scandal state:world-vienna-1912:885_

- **1944.01** `state_expire:p22-scandal-engine` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Anton的「流言发动机」到期；相关安排结束。
  _effects: state_remove p22-scandal-engine state:world-vienna-1912:886; flag -scandal_engine_active_

- **1944.01** `agency:attend_meeting` tags: agency, agency:attend_meeting
  Anton去了Arbeiter-Zeitung im Vorwärts-Haus，坐在后排听完了关于Sozialdemokratische Arbeiterpartei Österreich的争论；散会时带走一张油印提纲。
  _effects: historical development:initiative-org-sdap-1934 as participant; knowledge “我参加了Sozialdemokratische Arbeiterpartei Österreichs (SD。”; mood 0.030000000000000027_

- **1944.01** `vienna-courtship-courtyard.sunday-walk/second-bridge-promise` tags: adulthood, courtship, partner, social, family, partnership
  在第二个桥洞下，Otto Moser先停下来，用鞋尖碾一颗烤栗子壳，说下星期天还是这个时候、还是这座桥。Anton点头，掏出四赫勒买了两小袋栗子，两人分着剥，手上都是糖渍；桥洞上的水还在滴，谁也没有提万一明天下雨怎么办。
  _effects: relation partner with person-materialized-world-vienna-1912-82; cash -0.04 (两小袋烤栗子); mood 0.06000000000000005_

- **1945.01** `vienna-life-1945-liberation/survives` tags: war, liberation, 1945
  苏联士兵进城时，Anton躲在门后听见坦克履带压过石板路。几天后街口贴出告示，Anton去领了一份汤和一块面包。
  _effects: role; food; cash -2 (replacement documents)_

- **1945.01** `office16-appointment.patronage-ledger::ctx-vienna-postwar-1945::milieu-tenement/list-rejected` tags: office, appointment, patronage, organization, politics, power, vienna, urban
  名单在委员会卡住了。Katharina Weiss的名字被划掉，理由是“没有相关资历”；Anton没有争，只把名单收回公文包。晚上，Katharina Weiss来问结果，Anton说再等一年；Katharina Weiss没有坐，站了一会儿就走了。
  _effects: reputation -0.01999999999999999; mood -0.030000000000000027; relation friend with person-materialized-world-vienna-1912-70; flag +appointment_list_rejected; knowledge “委员会以“没有相关资历”为由划掉了联络员的名字。”_

- **1945.01** `task-vienna-bourgeois-youth.salon-invitation/publisher-address` tags: bourgeois, education, culture, salon, university, family, task, task:social
  钢琴旁Anton Bauer 2把Anton介绍给一位出版商，两人从施蒂夫特聊到新出的诗集。临走时Hermann Winter在一张名片背面写下出版社的街名和门牌，让他下星期四上午去。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-79; relation acquaintance with person-materialized-world-vienna-1912-17; skill; mood 0.07000000000000006_

- **1945.01** `vienna-medical-treatment.toothache/barber-pull` tags: health, medical, family, money
  理发铺里还坐着等刮脸的老主顾，肥皂味和烟味混在一起。弗朗茨把围布往Anton胸前一系，说忍着点。钳子第一次滑脱，第二次才夹稳，牙出来时带着一小块肉，他用明矾水按住了。
  _effects: cash -1.2 (理发师拔牙收费); health 0.03 (病牙被拔除但手法粗糙); mood -0.020000000000000018_

- **1945.06** `vienna-housing-move.rent-notice/rent-notice-demand-repair` tags: housing, home, rent, family, money
  Anton没有立刻答话，先去敲Otto Moser的门。两人一起数落墙上的水渍和门框里灌进来的风，楼梯间的窗户修好了，自家墙皮还在剥落。Otto Moser提议一起把话带给看门人：先修好漏水的墙角，涨租的事再谈。Anton把纸重新折好，请他把话带到门外。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-82; mood 0.030000000000000027; flag +rent_dispute_

- **1945.09** `vienna-parish-aid.soup-kitchen/soup-kitchen.help-wash` tags: faith, parish, mutual_aid, poverty, family
  Anton喝完汤没走，留下来帮修女把大锅刷净，又把木碗按大小摞好。厨房后头有半块面包和一碗剩汤，修女说是帮忙人的午饭。Berta Kral在门口等着一起回去，说下回还来，洗锅的活总有人要干。
  _effects: food; skill; relation acquaintance with person-materialized-world-vienna-1912-4; mood 0.020000000000000018_

- **1945.12** `p9-social-family-conflict-care.christmas-soup/ledger-on-table` tags: family, care, siblings, inheritance, housing, money
  Anton把旧账本摊在汤锅旁边，翻到药费那一页，说今天得当场算清才肯坐下。Lena的勺子停在半空，最后也把本子拉过去，一行行对起数来。汤在炉子上咕嘟着，谁也没先盛；等账算到最后一个赫勒，Anton在页脚写下“结清”，两人才同时伸手去够勺子。
  _effects: mood -0.030000000000000027; flag +medicine_bill_settled_

- **1946.01** `agency:attend_meeting` tags: agency, agency:attend_meeting
  Anton去了Haus der Tante in Klosterneuburg，坐在后排听完了关于第二区夜班出租合作社在Haus der Tante in Klosterneuburg经过的争论；散会时带走一张油印提纲。
  _effects: historical development:initiative-taxi:person-alois-lechner-evt:world-vienna-1912:004501-1945 as participant; knowledge “我参加了第二区夜班出租合作社在Haus der Tante in Klosterneuburg经过数年的招募。”; mood 0.030000000000000027_

- **1946.02** `r3-war.war-loan::ctx-vienna-postwar-1945::milieu-tenement::postwar-bond-redemption/bonds-redeemed-at-fraction` tags: war, war_loan, bonds, bank, inflation, vienna, urban, postwar
  战后，债券兑付的通知贴在银行门口，按一百比一换新币。Anton把一叠债券摊在柜台上，Emil Huber 3数完说“够买一双鞋”。Emil Bauer 2在后面笑了一声，说“还不如当时买面粉”；Anton把换来的钱折好，真的去买了鞋。
  _effects: cash 2 (爱国债券的第六期); flag +war_bonds_redeemed_at_fraction; role; relation acquaintance with person-materialized-world-vienna-1912-130; relation colleague with person-materialized-world-vienna-1912-86; knowledge “war bonds were redeemed at a fraction of face value”; relation acquaintance with person-materialized-world-vienna-1912-130_

- **1946.11** `vienna-legacy-worklife.hours-ledger/hours-ledger.sign` tags: legacy, work, family, reform, ordinary_life
  印泥是赭红色的，像干了的面包瓤。Anton按完手印，工头把表举到窗边吹干，阳光里那张纸透出指印的轮廓。楼下第十区的街面传来运煤车的铁皮声，星期六下午突然显得很宽。
  _effects: cash -1 (星期六下午减少的计件工钱); mood 0.050000000000000044; relation acquaintance with person-materialized-world-vienna-1912-134_

- **1946.12** `bc18-ghost.death-certificate::ctx-vienna-postwar-1945::milieu-tenement/accepts-the-file` tags: bureaucracy, legal, death, identity, mistake, paperwork, absurd, vienna
  户籍官Ferdinand Weiss 3为了结掉一桩陈年失踪案，在档案上给Anton盖了“推定死亡”。三天后，Anton收到一张慰问卡和一本作废的配给簿；同一天，追了半年的债主忽然不再上门。旧货商听说后，花两克朗买走一份抄本，说要给一个躲债的朋友看看格式。
  _effects: cash 2 (卖给旧货商的死亡证明抄本); state_add bc18-bureaucratic-ghost state:world-vienna-1912:1240; reputation -0.010000000000000009; relation acquaintance with person-materialized-world-vienna-1912-137; flag +declared_dead_while_alive; mood 0.010000000000000009; relation acquaintance with person-materialized-world-vienna-1912-137; flag +bureaucratic_ghost; mood -0.010000000000000009_

- **1947.01** `office16-favor.private-sinecure::ctx-vienna-postwar-1945::milieu-tenement/the-favor-was-already-owed` tags: office, favor, corruption, patronage, family, power, vienna, urban
  Franz Bauer早在Anton上任前就挂在一个“临时调查员”的名下，工资由上一任签字。Anton不能新设岗位，只能补一份追认函；函上写明“工作内容另行通知”，而通知一直没有发出。
  _effects: relation friend with person:evt:world-vienna-1912:001622:child; flag +retroactive_sinecure; knowledge “临时调查员的岗位是上一任留下的，工作内容从未书面通知。”; mood 0.010000000000000009_

- **1947.01** `state_tick:bc18-bureaucratic-ghost/paper-trail-year/another-window-opens` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  一个税务员把Anton的死亡记录和一张新房租收据订在一起，寄到了另一个区。三个星期后，Anton收到一封要求“已故纳税人”补缴暖气税的信；去问时，窗口说档案正在路上，让Anton先等通知。通知没有来，房租却涨了。
  _effects: state_parameter bc18-bureaucratic-ghost.fileDepth 25 -> 32; state_parameter bc18-bureaucratic-ghost.risk 20 -> 30; cash -1 (跑窗口的车钱); flag +heating_tax_for_the_dead; mood -0.030000000000000027_

- **1947.01** `p9-work-jobsearch.railway-depot/railway-depot.eyesight-failed` tags: work, job_search, negotiation, wages, employment, task, railway, depot
  排在他前面的Grete Winter很快过了关。轮到他时，医生把灯挪近了些，他还是念错。出了南站，太阳才刚爬上车皮，他站在路边把揉皱的证明捋平。
  _effects: mood -0.06000000000000005; flag +seeking_work; relation acquaintance with person-materialized-world-vienna-1912-83; relation acquaintance with person-materialized-world-vienna-1912-83_

- **1947.05** `office16-office.lose-the-chair::ctx-vienna-postwar-1945::milieu-tenement/carried-out` tags: office, removal, loss, politics, power, transition, vienna, urban
  最后一次会议没有让Anton发言。保安把纸箱搬到门口，箱子里有半瓶墨水、一只坏掉的台灯和没写完的年度报告。Grete Winter跟在后面，手里拿着新的门锁；走廊尽头，秘书已经把名牌翻了过去。
  _effects: position_end 放映员 @cinema:person-phase15-Anton-world-vienna-1912-evt:world-vienna-1912:007710; reputation -0.06; mood -0.07999999999999996; condition; flag +carried_out_of_office; knowledge “名牌在会议结束前就被翻了过去。”_

- **1947.06** `bc18-crime.failed-burglary::ctx-vienna-postwar-1945::milieu-tenement/health-inspectors` tags: crime, burglary, mistake, absurd, police, legal, comic, vienna
  两人摸黑撬开一扇门，里面没有保险柜，只有背景布、三脚架和一池显影水。店主以为他们是卫生局派来查暗房通风的，殷勤地领着看排水口；Luise 2只好装模作样地记了几笔，Anton顺手把柜台上一顶帽子戴走。临走时，店主还问要不要写整改通知。
  _effects: cash 1 (卖掉顺走的帽子); relation friend with person:evt:world-vienna-1912:002844:child; condition; flag +burglary_mistaken_for_inspection; mood 0.020000000000000018_

- **1948.01** `bc18-ghost.own-funeral::ctx-vienna-postwar-1945::milieu-tenement/second-corpse` tags: bureaucracy, funeral, mistaken_identity, public, absurd, death, humiliation, vienna
  Anton Weiss把另一具同名尸体推进后间，说档案上只有一个名字，不能开两场葬礼。两个家庭在门口争起来，Anton只好当场解开领口，让众人看脖子上的胎记。警察来了，记下姓名和住址；Anna Berg在一旁小声问，那今晚到底埋谁。
  _effects: cash -2 (警察局的手续费和车钱); reputation -0.03; state_parameter bc18-bureaucratic-ghost.risk 30 -> 50; state_parameter bc18-bureaucratic-ghost.sightings 1 -> 3; condition; flag +argued_with_own_corpse; mood -0.040000000000000036_

- **1948.01** `state_tick:bc18-bureaucratic-ghost/paper-trail-year/kept-the-files-apart` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  这一年，Anton学会了同时带三张纸出门：一张证明活着，一张证明死了，一张证明自己从没搬过家。窗口后面的人各自只看自己那一张，偶尔还会夸Anton的材料齐全。年底，Anton从补发的配给里省下一小袋面粉，觉得自己像个熟练的走私犯。
  _effects: state_parameter bc18-bureaucratic-ghost.fileDepth 32 -> 36; state_parameter bc18-bureaucratic-ghost.risk 50 -> 45; cash 1 (省下的配给和车钱); mood 0.010000000000000009_

- **1948.01** `r13-civ.soup-kitchen::ctx-vienna-postwar-1945::milieu-tenement/pot-ran-dry` tags: social, charity, soup_kitchen, hunger, volunteer, vienna, urban, postwar
  锅底见了铁，队伍还有十几个人。Mitzi Weiss说面粉明天才到，让Anton去门口解释。Anton刚开口，一只空碗就砸在门框上。回家后，他把围裙上的汤渍搓了很久。
  _effects: reputation -0.05; flag +soup_kitchen_ran_out_

- **1948.08** `vienna-legacy-worklife.union-office/union-office.write-off` tags: legacy, work, family, reform, ordinary_life
  窗外有人来问入会，接待的人一时不知道怎么开口，Anton替他说“进来坐”。老成员把账本拿回去，用一块旧布包好，放进抽屉最里面。抽屉关上的声音比平时响。
  _effects: mood -0.040000000000000036; relation acquaintance with person:evt:world-vienna-1912:002341:child; flag +union_debt_written_off_

- **1948.12** `vienna-housing-move.flat-viewing/flat-viewing-too-damp` tags: housing, home, rent, family, money
  Anton在单间里站了一刻钟，脚底发潮，墙纸底下透出一股霉味。看门人说刷一层石灰就好，Hermann Kral 2却在门口轻轻咳了一声，提醒这背面没有阳光。Anton把定金收回口袋，谢过看门人，宁可多付三克朗，也不愿把湿气带进夜里。
  _effects: mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-81; flag +still_looking_for_room; relation acquaintance with person-materialized-world-vienna-1912-81_

- **1949.01** `bc18-ghost.pension-window::ctx-vienna-postwar-1945::milieu-tenement/prove-alive` tags: bureaucracy, pension, identity, legal, paperwork, absurd, poverty, vienna
  Anton花了三天跑教堂、区公所和旧雇主，最后拿到一张六个月内有效的“在世证明”。Luise Huber把证明压在玻璃板下，说下次再死，最好提前通知。养老金恢复了，每月两克朗；Anton走出门，阳光照在证明的钢印上，像一枚刚刚盖好的出生章。
  _effects: cash 2 (恢复发放的养老金); state_parameter bc18-bureaucratic-ghost.fileDepth 36 -> 46; state_parameter bc18-bureaucratic-ghost.risk 45 -> 42; relation acquaintance with person-materialized-world-vienna-1912-68; condition; flag +six_month_living_certificate; mood 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-68_

- **1949.01** `state_reaction:bc18-bureaucratic-ghost/another-file-opened` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  Anton刚在一个窗口证明自己活着，另一个窗口又从抽屉里抽出一张死亡通知。两个办事员隔着走廊互相看了一眼，谁也没有先开口；Anton站在中间，忽然明白自己不是一个人，而是一份正在被转抄的卷宗。
  _effects: state_parameter bc18-bureaucratic-ghost.risk 42 -> 54; state_parameter bc18-bureaucratic-ghost.duplicates 1 -> 2; state_parameter bc18-bureaucratic-ghost.sightings 3 -> 4; flag +another_file_opened; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:013802_

- **1949.01** `state_tick:bc18-bureaucratic-ghost/paper-trail-year/another-window-opens` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  一个税务员把Anton的死亡记录和一张新房租收据订在一起，寄到了另一个区。三个星期后，Anton收到一封要求“已故纳税人”补缴暖气税的信；去问时，窗口说档案正在路上，让Anton先等通知。通知没有来，房租却涨了。
  _effects: state_parameter bc18-bureaucratic-ghost.fileDepth 46 -> 53; state_parameter bc18-bureaucratic-ghost.risk 54 -> 64; cash -1 (跑窗口的车钱); mood -0.030000000000000027_

- **1949.01** `r13-fam.negotiate-rent::ctx-vienna-postwar-1945::milieu-tenement::rent-postwar/rent-control-invoked` tags: task, commerce, housing, rent, negotiation, vienna, urban, postwar
  Anton把市政厅新贴的租金告示抄在一张纸上，带给Berta Huber 2看。Berta Huber 2起初说那是给新房客的，Anton便指着告示上的日期，说不许涨。两人在门口争了半个钟头，最后按旧租收，收据上多盖了一个章。
  _effects: cash -3 (房东的收租日); condition; flag +invoked_rent_control; relation acquaintance with person-materialized-world-vienna-1912-67; knowledge “the new rent notice applies to sitting tenants”_

- **1949.04** `absurd15-stage.cast-the-king::ctx-vienna-postwar-1945::milieu-tenement/cast-as-king` tags: performance, theatre, power, irony, work, pretend, vienna, urban
  Emil Bauer把一顶掉漆的铅皮王冠扣在Anton头上，说不用演得像国王，只要像一个人突然被允许坐下。首演那天，Anton在台上忘了两句台词，观众却以为那是停顿。
  _effects: state_add stage-sovereign state:world-vienna-1912:1394; cash 2 (首演酬劳); reputation 0.03; flag +stage_sovereign; reputation 0.04000000000000001_

- **1949.05** `vienna-adult-social.burial-fund/burial-fund.paid` tags: adulthood, social, work, family
  车间里管互助会的Rosa Hofer在午休时把本子摊在Anton的工具箱上，说这个月还差最后一份月钱。Anton从马甲内袋摸出二十个克罗伊策，Rosa Hofer当着他的面在本子上画了钩。
  _effects: cash -0.3 (缴纳丧葬互助会的月钱); relation colleague with person-materialized-world-vienna-1912-134; reputation 0.039999999999999994_

- **1949.12** `vienna-housing-move.rent-notice/rent-notice-neighbors-together` tags: housing, home, rent, family, money
  Anton把Katharina Weiss和楼里另两户人家叫到楼道，把那张纸摆在窗台上传看。看门人在楼梯拐角听着，说房东礼拜三来收钱。几家人合计好，到那天一起等在门厅，先把克朗递过去，再把修补的事一件件摆出来。Anton把纸折进围裙口袋，觉得人凑齐了话也硬气些。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-70; mood 0.040000000000000036_

- **1950.01** `vienna-postwar-housing-1950s/waiting-list` tags: adulthood, postwar, housing, family
  Anton去住房局问结果，办事员翻过卡片说分数不够：家里人口少，现住房虽挤但还没到拆除标准。回程的电车上，Luise Stein劝他明年再递一次申请。
  _effects: role; cash -2 (application and tram fare); mood -0.040000000000000036; relation acquaintance with person-materialized-world-vienna-1912-71_

- **1950.01** `state_expire:bc18-bureaucratic-ghost` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  Anton的「档案里的活鬼」到期；相关安排结束。
  _effects: state_remove bc18-bureaucratic-ghost state:world-vienna-1912:1240; flag -bureaucratic_ghost_

- **1950.01** `state_tick:stage-sovereign/performance-run/lost-the-crowd` tags: stage-sovereign, performance, theatre, pretend, status, irony, power, no-real-authority
  新排的戏没有坐满。Anton在第二幕听见后排有人笑，不是笑台词，是笑那顶歪掉的王冠。散场后，经理说下一轮要换一个更年轻的国王。
  _effects: state_parameter stage-sovereign.publicBelief 20 -> 12; state_parameter stage-sovereign.scandal 0 -> 6; mood -0.040000000000000036_

- **1950.01** `p9-work-jobsearch.ask-trial/ask-trial.no-vacancy` tags: work, job_search, negotiation, wages, employment, task, trial, factory
  工头说眼下没有空缺，让他把名字和住址写在账本撕下的纸角上，说月底再来问。Anton看那张纸被随手压进抽屉，纸角还露出半截，知道多半不会有人翻。他道过谢，往街尾另一家走去。
  _effects: mood -0.040000000000000036; relation acquaintance with person-materialized-world-vienna-1912-110_

- **1950.02** `vienna-parish-aid.funeral-society/funeral-society.quit` tags: faith, parish, mutual_aid, poverty, family
  Anton说互助会先退了，这笔钱要留给煤和面包。Emil Weiss 4没争辩，在蓝皮本上把名字划了一道，问清楚是不是全家都退，然后把划掉的那行折进本子夹缝。她说以后想再进，要重新排三个月。门关上，Anton听见铅笔在楼梯上轻轻敲了两下栏杆。
  _effects: cash 0.4 (省下本周会费留作煤钱); relation acquaintance with person-materialized-world-vienna-1912-147; flag +funeral_society_left; relation acquaintance with person-materialized-world-vienna-1912-147_

- **1950.03** `vienna-medical-treatment.toothache/dentist-pull` tags: health, medical, family, money
  诊室在二楼，楼梯间飘着石炭酸味。医生把钳子举到灯下看了看，叫Anton攥紧扶手。Mitzi Huber 2站在门边数墙上的价目表：拔牙两克朗五十赫勒，药棉五十赫勒，连消炎水另算。
  _effects: cash -3 (牙医拔牙费用); health 0.05999999999999999 (拔除病牙解除疼痛); mood -0.030000000000000027_

- **1950.09** `p9-social-tenement-neighbors.stove-and-line/stove-and-line.sheet-quarrel` tags: housing, neighbors, tenement, daily, money, reputation
  Anton发现自己搭在栏杆上的床单被人挪到了绳尾，角上沾了煤灰，一时火起，在楼梯间拦住Anna Bauer问是谁动的。Anna Bauer说是Otto Winter 2嫌滴水，两人越说越响，最后各自回屋摔上门，炉子空着，谁也没再去烧水。
  _effects: relation acquaintance with person-anna-bauer; relation acquaintance with person-materialized-world-vienna-1912-100_

- **1950.10** `mb17-border.permit-window::ctx-vienna-postwar-1945::milieu-tenement/turned-back` tags: migration, border, papers, permit, station, official, belonging, vienna
  Elisabeth Huber把材料推回来，说出生纸缺了教区印章。Anton解释自己是从乡下赶来的，对方只指了指墙上的告示；排在后头的Mitzi 2递来半块面包，两个人坐在候车室里等下一班回去的车，谁也没有先说话。
  _effects: cash -2 (the return ticket and a wasted day); mood -0.04999999999999971; relation acquaintance with person:evt:world-vienna-1912:003611:child; flag +mb17_turned_back_at_border; knowledge “边境窗口只承认带教区印章的出生证明。”_

- **1951.01** `state_expire:stage-sovereign` tags: stage-sovereign, performance, theatre, pretend, status, irony, power, no-real-authority
  Anton的「舞台上的君主」到期；相关安排结束。
  _effects: state_remove stage-sovereign state:world-vienna-1912:1394; flag -stage_sovereign_

- **1951.01** `task-vienna-family-care.reconcile-siblings/soup-and-grave` tags: family, care, courtship, siblings, inheritance, housing, task, task:family
  饭桌摆在圣器室旁边，椅子不够，两人挨着坐。Lena说到欠账时声音低下去，Anton没有接话，只把盐罐递过去；出门时天已经擦黑，墓地的铁门还开着。
  _effects: cash -0.5 (墓前的蜡烛); mood 0.050000000000000044_

- **1951.04** `p9-gap-adult-unemployed.soup-kitchen/soup-pot-empty` tags: adulthood, unemployment, casual_labour, poverty, daily, relief, food, church
  前面还有七八个人时，Emil Huber 3已经直起腰把锅盖扣上了。队伍没散，有人骂了一句，有人蹲下把罐子收进布袋。Anton走到巷口，Emil Weiss 4从后面赶上来，罐子还温着。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-147_

- **1951.06** `ad20-loan::ctx-vienna-postwar-1945::milieu-tenement/loan-refused` tags: loan, debt, credit, everyday, obligation, money, vienna, urban
  Alois 2把Anton的收入证明翻来覆去看了两遍，说数目不够。Anton问能不能少借一点；Alois 2说“少借也要还得起”。走出门时，Anton把证明信重新叠好，发现上面有一道自己刚才捏出的折痕。
  _effects: flag +loan_refused; mood -0.030000000000000027; relation acquaintance with person:evt:world-vienna-1912:002341:child; cash -1 (paperwork and a wasted morning)_

- **1952.01** `r15-fam.child-leaves::ctx-vienna-postwar-1945::milieu-tenement/stays-for-now` tags: family, child, leaving, home, child_left_home, vienna, urban, postwar
  Otto Bauer说再等一年，等家里的债还掉一点。Anton没有劝，只把晚饭多添了一勺；夜里Anton听见Otto Bauer在隔壁翻书，煤油灯一直亮到后半夜。
  _effects: state_parameter raising-child.schoolProgress 16 -> 21; state_parameter raising-child.caregiverBurden 64 -> 68; cash -1 (another year of food and lamp oil); mood 0.010000000000000009_

- **1952.01** `r13-work.unemployment-benefit::ctx-vienna-postwar-1945::milieu-tenement::postwar-benefit-office/sent-to-relief-work` tags: work, unemployment, benefit, institution, poverty, vienna, urban, postwar
  Elisabeth Huber说补助金只发给有家属的人，Anton单身，只能去修路队领工钱。第二天Anton扛着铁锹站在城郊，和几十个男人一起把碎砖填进车辙。工钱按日结，比补助多两克朗，但一天下来，手掌磨出了三个水泡。
  _effects: cash 2 (补助金窗口的第二张表); condition; flag +work13_sent_to_relief_work_

- **1952.01** `vienna-market-household.friday-fish/friday-fish.buy` tags: home, market, food, social
  六个十字币换来一条鳟鱼和一把欧芹。Anton把鱼煎得两面焦黄，鱼尾巴给了闻着味来的Katharina Weiss。自家孩子用面包把盘底的黄油擦干净。
  _effects: cash -6 (买鳟鱼和黄油); food; mood 0.07999999999999996; relation acquaintance with person-materialized-world-vienna-1912-70_

- **1952.01** `df18-mark.first-appearance::ctx-vienna-postwar-1945::milieu-tenement/fever-hand` tags: body, mark, omen, illness, rumor, supernatural, eerie, vienna
  一连三天的高烧退下去以后，Anton的手腕上多了一块暗褐色的印子，边缘像五根很短的手指。诊所的医生说只是皮下色素，Marie Huber却在院子里看了很久，说这形状不是随便长的。Anton把袖子拉下来，回家路上一直用另一只手按着那块皮。
  _effects: cash -1 (去诊所问这块印子); state_add df18-uncanny-mark state:world-vienna-1912:1585; flag +df18_mark_appeared_after_fever; mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-106; flag +df18_mark_noticed; knowledge “我身上有一处说不清的痕迹，别人对它各有各的说法。”_

- **1952.01** `state_reaction:df18-uncanny-mark/mark-public` tags: df18-uncanny-mark, body, mark, omen, superstition, reputation, mystery, faith
  Anton在人群里挽了一下袖子，第二天就有人来问那块印子是不是“会动的”。Anton说不会，问的人却已经把自己的解释说完了。
  _effects: state_parameter df18-uncanny-mark.attention 25 -> 33; mood -0.020000000000000018; reputation -0.010000000000000009_
  _causes: evt:world-vienna-1912:016272_

- **1952.10** `vienna-social-movement.meeting/speak-and-organize` tags: development, social_movement, organization, meeting
  Anton在后屋的会议上报出自己街区的名字：谁家缺煤，谁被房东催租，谁知道哪间印刷厂还在招人。环城大道写字楼管理处把这些事记进一本旧账本，散会时每个人带走一叠更小的纸条。
  _effects: skill; reputation 0.01999999999999999; relation acquaintance with person-materialized-world-vienna-1912-156; relation acquaintance with person-materialized-world-vienna-1912-133_

- **1953.01** `ml18-family.school-gate-car::ctx-vienna-postwar-1945::milieu-tenement/the-child-leaves-home` tags: family, money, child, school, reputation, dark, vienna, urban
  第二个学期，Otto Bauer的成绩单上多了两个不及格，家里的争吵从钱转到衣服、朋友和马车。一天早晨，Anton在餐桌上找到一张字条：Otto Bauer去了乡下姨妈家，末尾写着“我更喜欢我们没钱的时候”。Otto Huber来家里送作业本，站在门口没有进来。
  _effects: cash -10 (travel and expenses after the child left); state_parameter raising-child.leftHome false -> true; state_parameter raising-child.childConfidence 12 -> 0; relation rival with person:evt:world-vienna-1912:006697:child; condition; flag +child_left_home; knowledge “字条上写着孩子更喜欢家里没钱的时候。”; mood -0.030000000000000027_

- **1953.01** `state_tick:df18-uncanny-mark/mark-year/story-grows` tags: df18-uncanny-mark, body, mark, omen, superstition, reputation, mystery, faith
  入冬后，Anton在集市上听见一个陌生女人向别人描述“那个有手印的人”。故事已经比原来多了一个雨夜和一声尖叫。Anton低头挑菜，发现自己的手正按着袖口。
  _effects: state_parameter df18-uncanny-mark.attention 33 -> 43; state_parameter df18-uncanny-mark.pain 5 -> 11; state_parameter df18-uncanny-mark.claimed illness -> curse; reputation -0.01999999999999999; mood -0.030000000000000027_

- **1953.01** `r14-work.start-shop::ctx-vienna-postwar-1945::milieu-tenement/signed-the-lease` tags: work, shop, shop_start, commerce, lease, risk, vienna, urban
  Elisabeth Bauer 2把租约摊在柜台上，手指点着“押金三个月”那一行。Anton数出十八克朗，纸币有鱼腥味，是这些年攒下的。Elisabeth Bauer 2把钥匙推过来时，又补了一句：前一家裁缝欠的电费要结清。Anton当天下午就去买了石灰，把墙刷到齐腰高。
  _effects: cash -18 (租下那间空铺); mood 0.07999999999999996; flag +shop_lease; role; relation acquaintance with person-materialized-world-vienna-1912-156; knowledge “the lease carries three months deposit and the previous tena”_

- **1953.05** `ml18-family.fortune-split::ctx-vienna-postwar-1945::milieu-tenement/the-sibling-takes-it` tags: family, money, windfall, inheritance, conflict, dark, vienna, urban
  晚饭后的第三天，Anton去邮局取钱，发现存折上少了三十克朗。Lena在母亲的旧照片前承认拿了钱，说这些年照顾母亲的情分总该折成数目。Otto Moser去叫了警察；Anton站在两个最熟悉的人中间，听见楼下有人把留声机开得很响。
  _effects: cash -30 (the sibling took thirty crowns from the savings book); state_parameter ml18-sudden-fortune.principal 28 -> 0; state_parameter ml18-sudden-fortune.claims 4 -> 7; relation rival with person-phase15-Lena-world-vienna-1912; condition; flag +family_fortune_stolen; knowledge “存折上少了三十克朗，取款单上的签名是模仿的。”; mood -0.09999999999999987_

- **1953.07** `vienna-legacy-worklife.apprentice-wage/apprentice-wage.hand-to-family` tags: legacy, work, family, reform, ordinary_life
  工资袋上的油墨还没干透，Anton的手指染了一点黑。母亲把硬币倒在厨房桌上，一枚枚排开，排到第六枚时停住。灶上的水壶响了，她拿起来又放下，没继续问。
  _effects: cash 3 (按新规定多出的学徒工资交给家里); food; relation colleague with person:evt:world-vienna-1912:002907:child_

- **1953.11** `vienna-tenement-neighbors.laundry_line_dispute/compromise_split_line` tags: home, social, family, housing
  Anton把洗好的床单搭上院子里的公用晾衣绳，占了整条。Luise Kral抱着一盆湿衣服下来，说自家孩子明天要穿干净衬衫上学。两人在绳子两头扯了一阵，最后Anton把床单对折，腾出一半，Luise Kral用木夹子把衬衫一件件排上去。谁也没道歉，但第二天见面都点了头。
  _effects: relation acquaintance with person-luise-kral; mood 0.020000000000000018_

- **1954.01** `r14-work.first-customer::ctx-vienna-postwar-1945::milieu-tenement/cut-at-cost` tags: shop, first_customer, customer, commerce, money, vienna, urban, postwar
  客人把价压到成本以下，Anton还是剪了布。尺子从布边滑过去时，Anton看见柜台上那盏煤油灯的影子在抖。客人走后，Anton把这一笔记成“开门生意”，没有把亏掉的两克朗写进去。
  _effects: cash 1 (第一位客人); mood -0.040000000000000036; flag +thin_first_sale; knowledge “the first sale was made below cost to keep the customer”_
  _causes: evt:world-vienna-1912:016632_

- **1954.01** `ml18-tax.audit-of-the-windfall::ctx-vienna-postwar-1945::milieu-tenement/the-inspector-was-an-old-friend` tags: tax, legal, money, windfall, bureaucracy, comic, vienna, urban
  Grete Winter进门后没有先翻账本，而是问Anton是不是在战前服过役。两个人对上了部队编号，Grete Winter把帽子放在桌上，说利息可以按小额储蓄申报，罚款就免了。Berta Huber 2松了一口气，手里的计算尺却还停在半空，像是不知道该不该落下去。
  _effects: cash -2 (the reduced tax assessment); state_parameter ml18-sudden-fortune.principal 30 -> 28; relation friend with person-materialized-world-vienna-1912-2; flag +tax_audit_friendly; mood 0.030000000000000027_

- **1954.01** `state_tick:df18-uncanny-mark/mark-year/story-grows` tags: df18-uncanny-mark, body, mark, omen, superstition, reputation, mystery, faith
  入冬后，Anton在集市上听见一个陌生女人向别人描述“那个有手印的人”。故事已经比原来多了一个雨夜和一声尖叫。Anton低头挑菜，发现自己的手正按着袖口。
  _effects: state_parameter df18-uncanny-mark.attention 43 -> 53; state_parameter df18-uncanny-mark.pain 11 -> 17; state_parameter df18-uncanny-mark.claimed curse -> curse; reputation -0.01999999999999999_

- **1954.01** `kernel-social.reconciliation::ctx-vienna-postwar-1945::milieu-tenement/reconciliation.cold-peace` tags: task, task:social, social, reconciliation, family, apology, conflict, vienna
  Lena收下了锅，却没有让Anton进门，说东西留下，人先回去。Anton在门口站了一会儿，把锅盖掀开又盖上；第二天，空锅被放在门槛上，里面压着一张写着“收到了”的纸条。
  _effects: role; flag +cold_peace; knowledge “对方只收下东西，没有让进门，也没有提那笔钱。”_

- **1954.03** `vienna-church-community.tenement-prayer/rent-prayer-argument` tags: faith, social, family, home
  有人抱怨守夜人太多，踩坏了楼梯木板。楼里的人围着看，谁也没先走开。
  _effects: relation acquaintance with person:evt:world-vienna-1912:004073:child; reputation -0.03_

- **1954.12** `curse15-betrayal.ledger-share::ctx-vienna-postwar-1945::milieu-tenement/rent-book-rewritten` tags: betrayal, money, family, trust, curse, secret, vienna, urban
  Emil Bauer在房东的租金簿上把Anton的名字划掉，换成自己的，又把两个人合住的房间说成是Emil Bauer一个人租的。房东没有多问，只让Anton月底前搬走。Emil Bauer站在门口，手里拿着那本不该由Emil Bauer保管的簿子。
  _effects: cash -2 (临时找住处与搬家的费用); relation rival with person:evt:world-vienna-1912:000457:child; reputation -0.04000000000000001; flag +rent_book_taken; condition_

- **1955.01** `r15-fam.child-returns::ctx-vienna-postwar-1945::milieu-tenement/returns-as-rent-collector` tags: family, child, return, home, child_returned, vienna, urban, postwar
  Otto Bauer穿着一身新制服回来，替房东清点屋里的家具。Anton把租约和收据一张张摊在桌上，Otto Bauer低头记在本子上；临走时，Otto Bauer说“这是工作”，声音很轻。
  _effects: cash -3 (the rent arrears were entered in the landlord's book); state_parameter raising-child.leftHome true -> false; state_parameter raising-child.caregiverBurden 88 -> 93; flag -child_left_home; flag +child_returned_as_agent_

- **1955.01** `state_tick:df18-uncanny-mark/mark-year/story-grows` tags: df18-uncanny-mark, body, mark, omen, superstition, reputation, mystery, faith
  入冬后，Anton在集市上听见一个陌生女人向别人描述“那个有手印的人”。故事已经比原来多了一个雨夜和一声尖叫。Anton低头挑菜，发现自己的手正按着袖口。
  _effects: state_parameter df18-uncanny-mark.attention 53 -> 63; state_parameter df18-uncanny-mark.pain 17 -> 23; state_parameter df18-uncanny-mark.claimed curse -> curse; reputation -0.020000000000000004_

- **1955.01** `r13-civ.new-district-lodging::ctx-vienna-postwar-1945::milieu-tenement/room-rented` tags: social, housing, lodging, landlady, district, vienna, urban, postwar
  Katharina Weiss把招租纸从门上揭下来，领Anton看了后间。屋里只有一张铁床和一只裂了口的洗手盆，窗户对着天井。Anton付了六克朗，Katharina Weiss把钥匙从围裙里解下来，说晚上十点关大门。
  _effects: cash -6 (新城区门牌下的招租纸); flag +lodging_secured_in_new_district; relation acquaintance with person-materialized-world-vienna-1912-70; knowledge “the front door is locked at ten every night”_

- **1955.02** `p22-debt-bakery::ctx-vienna-postwar-1945::milieu-tenement/the-oven-pays-both` tags: bakery, debt, partnership, warm, ironic, work, creditor, bread
  Josef Weiss收走了面包房，却发现烤箱是坏的，只有Anton会修。两个人商量了一夜，决定合伙：Josef Weiss出面粉，Anton出炉子，赚的钱先还债。第一个月，面包烤焦了三次；第三个月，门口开始有人排队。他把第一炉卖剩的面包送给街角的守夜人，换回一句“明天还来”。
  _effects: state_parameter debt-bondage.debt 24 -> 16; cash 4 (the bakery profit after the debt payment); relation friend with person:evt:world-vienna-1912:002967:child; relation colleague with person-materialized-world-vienna-1912-164; flag +debt_bakery_open; skill; mood 0.050000000000000044; relation acquaintance with person-materialized-world-vienna-1912-164_

- **1955.05** `p22-mistaken-inheritance::ctx-vienna-postwar-1945::milieu-tenement/the-estate-comes-with-a-family` tags: mistaken_inheritance, funeral, corpse, identity, dark, reversal, debt, family
  陌生人的家属找上门，说既然Anton拿了遗产，就该替死者还债。Josef Kral把借据摊在桌上，Emil Huber 3说法律上确实如此；Anton搬进那间公寓，却发现每个房间都住着原来的债主。窗户朝北，冬天没有太阳，房租却一分不少。把借据一张张摊开，发现每张都写着同一个地址。
  _effects: state_add debt-bondage state:world-vienna-1912:1714; cash -4 (the dead man debts and the move); relation acquaintance with person-materialized-world-vienna-1912-136; flag +estate_came_with_family; relation acquaintance with person-materialized-world-vienna-1912-136_

- **1955.10** `bc18-enemy.accidental-help::ctx-vienna-postwar-1945::milieu-tenement/wrong-coal-delivery` tags: enemy, mistake, work, reputation, absurd, luck, social, vienna
  Elisabeth Bauer 2把二十袋“劣质煤”送到Anton门口，货到付款，想看Anton拿不出钱。卸货时，煤块黑得发亮，是上好的无烟煤；Anton付了钱，转手卖给面包房，净赚五克朗。Elisabeth Bauer 2来打听煤的去向，Anton说已经烧了，还谢谢他记得自己怕冷。
  _effects: cash 5 (转卖无烟煤的差价); relation rival with person-materialized-world-vienna-1912-156; condition; flag +enemy_coal_was_anthracite; mood 0.030000000000000027_

- **1956.01** `sm18-object.child-schoolbag::ctx-vienna-postwar-1945::milieu-tenement/searched-in-front-of-the-class` tags: child, school, object, accusation, misunderstanding, reputation, vienna, urban
  缝纫课上，Otto Huber让每个孩子把口袋翻出来。那只银顶针从Mitzi Kral的书包夹层里滚到桌上，教室里一下安静了。Mitzi Kral说是捡的，Otto Huber看着Anton，等一个大人拿主意。
  _effects: state_add sm18-missing-object state:world-vienna-1912:1713; relation kin with person:evt:world-vienna-1912:011381:child; reputation -0.03; flag +child_accused_of_taking_the_thimble; flag +something_is_missing_

- **1956.01** `state_tick:df18-uncanny-mark/mark-year/story-grows` tags: df18-uncanny-mark, body, mark, omen, superstition, reputation, mystery, faith
  入冬后，Anton在集市上听见一个陌生女人向别人描述“那个有手印的人”。故事已经比原来多了一个雨夜和一声尖叫。Anton低头挑菜，发现自己的手正按着袖口。
  _effects: state_parameter df18-uncanny-mark.attention 63 -> 73; state_parameter df18-uncanny-mark.pain 23 -> 29; state_parameter df18-uncanny-mark.claimed curse -> curse; reputation -0.02; mood -0.030000000000000027_

- **1956.01** `state_tick:debt-bondage/interest/pay-interest` tags: debt-bondage, debt, work, poverty, legal, state, state_tick
  Anton又付了一年的利息。本金几乎没动，债主的账本却翻到了新一页。
  _effects: cash -3 (debt interest); state_parameter debt-bondage.debt 16 -> 18_

- **1956.02** `p9-gap-adult-unemployed.dock-morning/dock-shared-crates` tags: adulthood, unemployment, casual_labour, poverty, daily, dock
  木箱里装的是钉子，一车推上斜坡时Anton在前头拉，Josef Kral在后头推。结账时工头只点了一个名字，Josef Kral的嗓门整条巷子都听得见，最后多给了两克朗。
  _effects: cash 2 (争执后补到的搬运工钱); relation acquaintance with person-materialized-world-vienna-1912-136; relation acquaintance with person-materialized-world-vienna-1912-108_

- **1956.11** `vienna-legacy-worklife.sick-fund/sick-fund.keep-quiet` tags: legacy, work, family, reform, ordinary_life, injury
  止咳药水是褐色的，瓶口塞着软木塞，摇一摇会起沫。Anton看着工友把表折成小块，折了三折才塞进帽檐。墙上的规章还贴在那里，纸角被风掀起，没人去按。
  _effects: health -0.03999999999999998 (没有正规病假，只能靠药水撑着); relation colleague with person-materialized-world-vienna-1912-175; relation acquaintance with person-materialized-world-vienna-1912-175_

- **1957.01** `p21-staged-death::ctx-vienna-postwar-1945::milieu-tenement/the-coffin-is-too-light` tags: staged_death, debt, fraud, funeral, escape, betrayal, secret, high_drama
  抬棺的人在第一级台阶上停了一下，说这棺材轻得不对。Emil Bauer伸手敲了敲木板，里面传出的不是沉闷的回声；Elisabeth Bauer 2把登记簿合上，Otto Moser的黑纱滑到肩膀上。当天下午，警察在火车站候车室里找到了Anton，手里还攥着一张去林茨的车票。
  _effects: state_add public-scandal state:world-vienna-1912:1760; state_add p21-scandal-web state:world-vienna-1912:1761; state_add under-investigation state:world-vienna-1912:1762; relation partner with person-materialized-world-vienna-1912-82; reputation -0.06; cash -3 (funeral costs and a police fine); flag +staged_death_exposed; knowledge “抬棺的人在第一级台阶上停了一下，说这棺材轻得不对。”; mood -0.050000000000000044; flag +scandal_web_active_

- **1957.01** `state_reaction:p21-scandal-web/a-betrayal-reprices` tags: p21-scandal-web, scandal_web, scandal, secret, blackmail, network, leverage, danger
  背叛发生以后，Anton最先想到的不是损失，而是那个人知道多少。第二天，对方在街角点了点头，像在提醒Anton：现在两个人都有东西可以卖了。
  _effects: state_parameter p21-scandal-web.loyalty 25 -> 17; state_parameter p21-scandal-web.leverage 50 -> 58; state_parameter p21-scandal-web.danger 60 -> 65; flag +scandal_web_betrayed_
  _causes: evt:world-vienna-1912:018617_

- **1957.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Anton Kral这周主动擦了黑板。Anton把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 27 -> 30; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:018757_

- **1957.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton被叫到学校，老师说Helene Kral这学期总在课上看窗外。回家的路上，Anton没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 16 -> 11; state_parameter raising-child.caregiverBurden 70 -> 75; cash -2 (extra lessons and replacement pencils); mood -0.020000000000000018_

- **1957.01** `state_expire:df18-uncanny-mark` tags: df18-uncanny-mark, body, mark, omen, superstition, reputation, mystery, faith
  Anton的「不祥的印记」到期；相关安排结束。
  _effects: state_remove df18-uncanny-mark state:world-vienna-1912:1585; flag +df18_mark_faded_

- **1957.01** `state_tick:sm18-missing-object/another-drawer/the-same-question` tags: sm18-missing-object, mystery, object, loss, memory, search, suspicion, everyday
  Anton把同一只抽屉拉开又推上，里面的东西已经按原来的位置摆了三遍。楼下有人搬煤，铁锹刮过石阶；Anton忽然想不起那件东西最后一次被谁拿在手里，只觉得每个人的脸都有一点可疑。
  _effects: state_parameter sm18-missing-object.suspicion 60 -> 68; state_parameter sm18-missing-object.leads 15 -> 13_

- **1957.01** `state_tick:debt-bondage/interest/pay-interest` tags: debt-bondage, debt, work, poverty, legal, state, state_tick
  Anton又付了一年的利息。本金几乎没动，债主的账本却翻到了新一页。
  _effects: cash -3 (debt interest); state_parameter debt-bondage.debt 18 -> 20_

- **1957.01** `state_expire:raising-child` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton的「家里有个正在长大的孩子」到期；相关安排结束。
  _effects: state_remove raising-child state:world-vienna-1912:535; flag -raising_child_active_

- **1957.01** `state_expire:raising-child` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton的「家里有个正在长大的孩子」到期；相关安排结束。
  _effects: state_remove raising-child state:world-vienna-1912:575_

- **1957.01** `state_expire:raising-child` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton的「家里有个正在长大的孩子」到期；相关安排结束。
  _effects: state_remove raising-child state:world-vienna-1912:584_

- **1957.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton被叫到学校，老师说Friedrich Bauer这学期总在课上看窗外。回家的路上，Anton没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 34 -> 29; state_parameter raising-child.caregiverBurden 74 -> 79; cash -2 (extra lessons and replacement pencils)_

- **1957.01** `p9-work-career.night-course/p9-work-career.night-course.review` tags: work, career, craft, clerk, education, task, night_school, bookkeeping
  Anton和Emil Huber 4的书都缺页，两人把笔记摊在咖啡馆后桌，交替着抄，谁先到谁先占座位，一杯咖啡续到打烊。结课前一夜复习到十一点，Otto Huber第二天发卷子时扫了一眼他们的笔记，说抄得比听讲还整齐。Anton考了七十八分，结业证照发，只是名次靠后。
  _effects: cash -6 (夜校学费); cash -1 (咖啡馆里续杯与夜点); skill; relation friend with person-materialized-world-vienna-1912-177; relation acquaintance with person-materialized-world-vienna-1912-177_

- **1957.01** `state_reaction:public-scandal/gossip` tags: public-scandal, scandal, reputation, social, state, state_reaction, adulthood, family
  Anton走进咖啡馆时，邻桌的声音低了一拍。没有人当面说什么，但每个人都知道该说什么。
  _effects: reputation -0.030000000000000002_
  _causes: evt:world-vienna-1912:018972_
## Hedwig

Born 1912.01, died 1946.01 (age 34).
Education: apprenticeship 0; occupation: none; roles: infant, child, self_taught_carpenter, first_aid_certified, witness_in_servant_inquiry, teaching_case, separated, permit_holder, registered_resident, conscript, householder, records_courier, office:档案助理, office:入殓工, displaced_person, grieving_mother.

### State snapshot
- cursed-by-wish [person] (ended 1946.1: owner_died) parameters={"severity":0.65,"triggers":6} links={} ticks=0
- p22-family-legend [person] (ended 1913.2: replaced_by:p22-family-legend) parameters={"warmth":33,"secrecy":84,"danger":58,"promise":40} links={} ticks=1
- p22-child-omen [person] (ended 1919.1: duration expired) parameters={"strangeness":43,"attention":39,"protection":47,"fear":20} links={} ticks=3
- p22-family-legend [person] (ended 1920.1: duration expired) parameters={"warmth":73,"secrecy":26,"danger":8,"promise":67} links={} ticks=3
- yf18-first-awakening [person] (ended 1929.1: duration expired) parameters={"intensity":50,"nerve":21,"talk":20,"reciprocated":true,"secret":true} links={"beloved":"Lena"} ticks=3
- apprenticeship-contract [person] (ended 1928.1: the master ended the contract) parameters={"progress":3,"failures":2,"trade":"木工","paid":false} links={} ticks=2
- failed-apprentice [person] (ended 1935.1: duration expired) parameters={} links={} ticks=1
- ld18-impossible-attachment [person] (ended 1940.1: duration expired) parameters={"devotion":64,"improvisation":35,"pressure":70,"discretion":45,"grief":8,"named":"the page with the pencil mark"} links={"beloved":"Anton"} ticks=12
- p22-wild-fortune [person] (ended 1935.1: duration expired) parameters={"height":29,"absurdity":58,"witnesses":45,"fragility":32} links={} ticks=2
- public-scandal [person] (ended 1934.1: replaced_by:known-affair) parameters={} links={} ticks=0
- known-affair [person] (ended 1937.1: duration expired) parameters={"notoriety":55,"grief":0,"exposure":85,"discretion":15,"remarried":false,"origin":"exposed"} links={} ticks=3
- p23-dangerous-secret [person] (ended 1939.1: duration expired) parameters={"exposure":36,"leverage":7,"bodies":0,"loyalty":43} links={} ticks=2
- pc20-second-chance [person] (ended 1939.1: duration expired) parameters={"credibility":42,"debt":45,"hope":33,"suspicion":50} links={} ticks=3
- suspected-witchcraft [person] (ended 1939.1: duration expired) parameters={"evidence":0,"danger":20,"accuserKnown":true,"healerConsulted":false} links={} ticks=4
- mb17-newcomer [person] (ended 1942.1: duration expired) parameters={"language":28,"localNetwork":12,"housingStrain":71,"permitStatus":"provisional"} links={} ticks=4
- suspected-witchcraft [person] (ended 1941.1: duration expired) parameters={"evidence":7,"danger":20,"accuserKnown":true,"healerConsulted":false} links={} ticks=2
- under-investigation [person] (ended 1943.1: duration expired) parameters={"progress":45,"charge":"冒领彩票"} links={} ticks=2
- public-scandal [person] (ended 1943.1: duration expired) parameters={} links={} ticks=1
- p22-scandal-engine [person] (ended 1943.1: duration expired) parameters={"heat":59,"reach":52,"leverage":26,"shame":62} links={} ticks=2
- pl19-protected-scandal [person] (ended 1944.1: duration expired) parameters={"exposure":60,"protection":45,"leverage":27,"publicHeat":57} links={"protector":"Josef"} ticks=2
- oj18-odd-apprenticeship [person] (ended 1945.1: duration expired) parameters={"trust":16,"strangeKnowledge":43,"reliability":45,"nightsWorked":24,"post":"入殓学徒"} links={} ticks=3
- pc20-second-chance [person] (ended 1946.1: owner_died) parameters={"credibility":33,"debt":43,"hope":40,"suspicion":58} links={} ticks=1

### 188 subject events

- **1912.02** `p22-strange-doctor-prediction::ctx-vienna-1912::milieu-tenement/the-doctor-is-optimistic` tags: infancy, family, doctor, illness, omen, strange, dark, drama
  医生说孩子只是瘦，开了一瓶味道很坏的补药，说“过了春天就好了”。Friedrich Hofer把这句话记了很多年；每年春天，家里都要说一遍，像在核对一张旧账单，药瓶上还贴着手写的标签。
  _effects: mood 0.03; health 0.010000000000000009 (a tonic and a hopeful sentence); state_add p22-child-omen state:world-vienna-1912:11; flag +doctor_optimism_

- **1912.03** `vienna-life-birth-letter-from-the-dead/the-letter-is-a-bill` tags: infancy, family, secret, letter, drama
  信里没有问候，只有一张旧账单：棺材、墓地、一趟从边境回来的车费。Friedrich Hofer把账单翻过来，背面用铅笔写着“别让孩子知道”。Hedwig伸手去抓纸角，Friedrich Hofer没有让。
  _effects: cash -4 (paid an old funeral debt); flag +family_debt_letter; mood -0.030000000000000006_

- **1912.04** `p22-strange-cradle-secret::ctx-vienna-1912::milieu-tenement/the-bundle-in-the-lining` tags: infancy, family, cradle, secret, inheritance, strange, dark, drama
  Friedrich Hofer拆洗摇篮衬里时，摸到一个硬角：一小块油布，里面包着一张当票和一缕头发，当票上的日期已经模糊。Friedrich Hofer看了很久，又把油布缝回去，针脚比原来更密。
  _effects: state_add p22-family-legend state:world-vienna-1912:10; mood -0.03; flag +cradle_bundle; knowledge “摇篮衬里藏着一张当票和一缕头发。”_

- **1913.01** `vienna-life-infant-first-smile/smile-at-the-lamp` tags: infancy, family, first, warm
  Friedrich Hofer把Hedwig抱到窗边，煤汽灯罩上有一圈晃动的光。孩子盯着看了很久，忽然笑出声，口水滴在Friedrich Hofer的袖口上。屋里的人都停了一下，像是听见了什么了不起的消息。
  _effects: mood 0.04; health 0.010000000000000009 (a good day)_

- **1913.01** `state_tick:p22-family-legend/the-story-changes-hands/a-detail-goes-missing` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，故事里最要紧的那件东西不见了：先是名字，后来是地点。Hedwig问起时，大人说“你记错了”；可柜子最底层那只空盒子，谁也没有扔，锁却换过了，钥匙也不见了。
  _effects: state_parameter p22-family-legend.secrecy 80 -> 84; state_parameter p22-family-legend.danger 55 -> 58; state_parameter p22-family-legend.warmth 35 -> 33; mood -0.01_

- **1913.01** `state_tick:p22-child-omen/the-omen-returns/the-coincidence-repeats` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  又过了一年，同一件小事又发生了：钟停在同一个时刻，门口的狗对着空处叫。Hedwig正在学系鞋带，抬头问“又来了吗”；大人说没有，手却先去摸门框，谁也没有回答。
  _effects: state_parameter p22-child-omen.strangeness 40 -> 45; state_parameter p22-child-omen.attention 35 -> 39; state_parameter p22-child-omen.fear 20 -> 23; mood -0.01_

- **1913.02** `vienna-life-toddler-wrong-cradle/the-blanket-is-wrong` tags: infancy, family, rumour, identity, comic, drama
  Helene Winter盯着Hedwig的摇篮看了很久，说这床蓝被子不是这家人的。Friedrich Hofer把被子翻过来，角落绣着一个陌生的姓；Hedwig却抓着被角不放，像是认得它。Helene Winter退后一步，说“我什么都没说”。
  _effects: flag +wrong_cradle_blanket; knowledge “摇篮里的蓝被子绣着一个陌生的姓。”; mood -0.030000000000000006_

- **1913.02** `p22-warm-fathers-letter::ctx-vienna-1912::milieu-tenement/the-recipe-arrives` tags: infancy, family, letter, uncle, warm, melancholy, memory, drama
  信是叔叔死前写的，在邮袋里压了两年才到。Friedrich Hofer拆开时先笑出声：里面没有遗言，只有一张李子饺子的做法和一个关于祖母的笨笑话。那天晚上，全家真的吃了饺子。
  _effects: state_add p22-family-legend state:world-vienna-1912:25; mood 0.04; knowledge “家里有一封叔叔留下的信，里面写着李子饺子的做法。”_

- **1913.02** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Hedwig家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 20 -> 24; state_parameter p22-family-legend.warmth 70 -> 72; mood 0.01_
  _causes: evt:world-vienna-1912:000247_

- **1914.01** `vienna-life-toddler-first-words/first-word-more` tags: infancy, family, first, comic
  Hedwig把空碗推回Josefine Hofer面前，清清楚楚地说了一个字：“还要。”Josefine Hofer愣住，随后把锅底最后一点糊刮进碗里。孩子学会了用一句话让世界再转一圈。
  _effects: skill; mood 0.03_

- **1914.01** `state_tick:p22-family-legend/the-story-changes-hands/told-at-the-table` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，Hedwig家的故事在饭桌上换了新的讲法：多了一句笑话，少了一处哭声。听的人把汤匙放下，等下一句；讲故事的人却先去看窗子有没有关好，谁也没有先动筷子。
  _effects: state_parameter p22-family-legend.warmth 72 -> 75; state_parameter p22-family-legend.secrecy 24 -> 22; state_parameter p22-family-legend.promise 65 -> 67; mood 0.01_

- **1915.01** `vienna-life-child-family-legend/stolen-inheritance` tags: childhood, family, secret, story
  Friedrich Hofer说，家里本来有一件东西，后来被“更会说话的人”拿走了。Hedwig问是什么，Friedrich Hofer只说是一块表，表盖里刻着姓。孩子记住了“表盖里刻着姓”，却没有记住那个姓。
  _effects: knowledge “家里有一块表盖里刻着姓的表，被一个更会说话的人拿走了。”; flag +family_legend_watch_

- **1916.01** `vienna-life-child-first-friend/stolen-marble` tags: childhood, friendship, family, comic
  Josef把Hedwig的玻璃弹珠藏进鞋里，被当场看见。Josef说只是“替你拿着”，Hedwig没有揭穿，也没有再拿出第二颗。两个人蹲在墙根，把一只蚂蚁看了很久，谁也没有先回家。
  _effects: relation friend with person-phase15-Josef-world-vienna-1912; skill; mood -0.01_

- **1916.01** `state_tick:p22-child-omen/the-omen-returns/nothing-happens` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  又过了一年，什么也没有发生。Hedwig照常吃饭、摔跤、把鞋穿反；那个说过预言的人搬走了。家里把红绳解下来，却没有扔，只收进针线盒最里面，红绳上落了一点灰。
  _effects: state_parameter p22-child-omen.strangeness 45 -> 43; state_parameter p22-child-omen.fear 23 -> 20; state_parameter p22-child-omen.protection 45 -> 47; mood 0.010000000000000002_

- **1916.02** `vienna-life-child-inherited-wish/the-child-wants-a-dog` tags: childhood, family, wish, grief, uncanny, drama
  Hedwig说那句话只是想要一只狗，而且要“会看门的、不咬人的、像外婆家那只一样”。Josefine Hofer松了一口气，又有点失落；那天下午，两个人用旧毛线给一只并不存在的狗量了脖围。
  _effects: mood 0.04; skill_

- **1917.01** `state_tick:p22-family-legend/the-story-changes-hands/a-detail-goes-missing` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，故事里最要紧的那件东西不见了：先是名字，后来是地点。Hedwig问起时，大人说“你记错了”；可柜子最底层那只空盒子，谁也没有扔，锁却换过了，钥匙也不见了。
  _effects: state_parameter p22-family-legend.secrecy 22 -> 26; state_parameter p22-family-legend.danger 5 -> 8; state_parameter p22-family-legend.warmth 75 -> 73; mood -0.010000000000000002_

- **1918.01** `p9-gap-childhood-chores.market-line/line-half-flour` tags: childhood, household, chores, school, task, daily, market, food
  面粉袋压在胸口，越抱越沉。Hedwig前面的大婶一直往后靠，Hedwig就把膝盖顶住对方的篮子，硬留出半步。买到半袋面粉后，Hedwig的鞋跟留在人堆里，找回来时鞋面全是泥。回家路上布袋换了两次肩，赤脚踩过石板时脚底发麻。
  _effects: food; health -0.020000000000000018 (赤脚走石板路磨伤脚底); skill; relation acquaintance with person-materialized-world-vienna-1912-10; relation acquaintance with person-materialized-world-vienna-1912-15_

- **1919.01** `state_expire:p22-child-omen` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  Hedwig的「孩子身上的兆头」到期；相关安排结束。
  _effects: state_remove p22-child-omen state:world-vienna-1912:11_

- **1919.01** `p9-gap-childhood-chores.laundry-help/laundry-three-heller` tags: childhood, household, chores, school, task, daily, laundry, work
  “拽平，别留褶。”Josef Bauer在绳子那头喊。Hedwig踮着脚把床单拉直，碱水把指缝泡得发白。收工时天已经黑了，Josef Bauer数了三赫勒，又在围裙上擦干手才递过来。Hedwig把钱塞进袜筒，回家路上一直攥着，虎口的裂口沾了汗，火辣辣地疼。
  _effects: cash 0.03 (帮邻居晾床单挣的三赫勒); health -0.030000000000000027 (碱水泡手，虎口裂开); relation acquaintance with person-josef-bauer_

- **1920.01** `state_expire:p22-family-legend` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  Hedwig的「家族传说」到期；相关安排结束。
  _effects: state_remove p22-family-legend state:world-vienna-1912:25_

- **1920.01** `p9-gap-childhood-chores.market-line/line-sold-out-potatoes` tags: childhood, household, chores, school, task, daily, market, food
  “卖完了。”三个字从窗口里传出来，Hedwig后面的队伍立刻散了一半。Hedwig没走，趴在窗台上看伙计扫面屑，直到人家挥手赶人。旁边摊子的土豆带着泥，Hedwig用围裙兜住，一枚一枚数铜板，回家报账时连找零都说清了。
  _effects: food; mood -0.03; skill; relation acquaintance with person-materialized-world-vienna-1912-25_

- **1921.01** `p9-gap-childhood-chores.laundry-help/laundry-bread-with-friend` tags: childhood, household, chores, school, task, daily, laundry, work
  Friedrich Hofer家的孩子站在绳子另一头，Hedwig递夹子时故意慢半拍，两个人把床单拉得没有一道褶。收工后Friedrich Hofer端出半包隔夜面包，掰开时掉了一桌屑。Hedwig把分到的那块用围裙兜住，回家路上闻着麦味，硬是没咬。
  _effects: food; relation acquaintance with person-friedrich-hofer; skill; relation acquaintance with person-materialized-world-vienna-1912-28_

- **1921.11** `statistical_infection`
  Hedwig在Leopoldstädter Zinshaus, gemeinsamer Gang病倒了，肺炎让身体发热、虚弱，接下来的日子只能卧床。

- **1921.12** `statistical_illness_worsened`
  Hedwig的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1922.01** `p9-gap-childhood-chores.market-line/line-half-flour` tags: childhood, household, chores, school, task, daily, market, food
  队伍从面包房门口拐进巷子，Hedwig把布袋夹在腋下，学着前面人的样子，用胳膊肘顶住后面人的篮子。窗口的伙计舀面粉时，Hedwig踮脚看着秤，直到半袋面倒进袋口。挤出人群时鞋跟被踩掉，Hedwig单脚跳了两步，在泥里摸回鞋，索性赤脚走回家。
  _effects: food; health -0.020000000000000018 (赤脚走石板路磨伤脚底); skill; relation acquaintance with person-materialized-world-vienna-1912-16_

- **1922.03** `statistical_illness_worsened`
  Hedwig的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1922.05** `statistical_recovery`
  Hedwig熬过了这场肺炎，能坐起来喝一点汤，但身体还很虚。

- **1923.01** `p9-gap-childhood-chores.laundry-help/laundry-dragged-docked-pay` tags: childhood, household, chores, school, task, daily, laundry, work
  “你看看这角。”Anna Moser把床单拎起来，煤渣簌簌往下掉。Hedwig伸手去拍，反而把灰按进布纹里。Anna Moser从工钱里数回两枚，只留一赫勒在Hedwig手心，让重洗那角。晚饭前Hedwig一直蹲在井台边，换了两盆水，指甲缝里全是黑泥。
  _effects: cash 0.01 (被扣后只剩一赫勒); mood -0.05; relation acquaintance with person-anna-moser; relation acquaintance with person-materialized-world-vienna-1912-42_

- **1925.09** `vienna-youth-threshold.night-class/borrow-notes-at-home` tags: adolescence, school, work, family, transition
  学费凑不出来，Hedwig就向同屋的学徒借笔记。晚上把灶台边的桌子擦干净，用铅笔头把讲义抄在旧账单背面，Rosa Winter允他每两周交一次抄本抵作练习。抄到第三页时灯芯烧短了，字迹开始发颤。
  _effects: skill; relation acquaintance with person-materialized-world-vienna-1912-15; skill; mood 0.02_

- **1926.01** `p9-childhood-youth-aspiration.join-a-club/joined-and-borrowed` tags: adolescence, education, aspiration, school, books, club, exam, task
  Hedwig跟着Katharina Hofer走进印刷厂后面的屋子，交了十赫勒会费，在借书簿上按了手印。他挑了一本讲蒸汽机的册子，封面烫金已经磨掉；管理员说下月十赫勒要按时交，书才能续借。
  _effects: cash -0.1 (工人青年会月费); skill; relation friend with person-materialized-world-vienna-1912-55; flag +workers_youth_member; mood 0.04; relation acquaintance with person-materialized-world-vienna-1912-55_

- **1926.03** `yf18-friend.two-tickets::ctx-vienna-reform-1930::milieu-tenement/confront-at-the-cloakroom` tags: first_love, friendship, betrayal, dance, tickets, reform, medical, schooling
  Hedwig在衣帽间堵住Katharina Hofer，问那两张票怎么到了Lena手里。Katharina Hofer说Hedwig从来没敢开口，自己只是替Hedwig把话说了；Hedwig把票根揉成一团，塞进Katharina Hofer的西装口袋，转身时撞翻了侍者的托盘。
  _effects: state_parameter yf18-first-awakening.intensity 35 -> 40; state_parameter yf18-first-awakening.talk 10 -> 20; state_parameter yf18-first-awakening.nerve 10 -> 5; relation friend with person-materialized-world-vienna-1912-55; reputation -0.02; mood -0.05000000000000002_

- **1926.09** `yf18-firstlook.tram-glove::ctx-vienna-reform-1930::milieu-tenement/let-friend-return-it` tags: first_love, love, tram, glove, youth, courtship, reform, medical
  Hedwig把手套交给Anton，让Anton替自己去还。Anton回来时说，Lena问是谁捡到的；Anton顺口报了一个名字，Hedwig听见那名字不是自己的，笑得比平时响。
  _effects: state_add yf18-first-awakening state:world-vienna-1912:122; relation friend with person-phase15-Anton-world-vienna-1912; mood -0.01; flag +yf18_first_awakening_active_

- **1926.10** `r1-fam.sibling-rivalry::ctx-vienna-reform-1930::milieu-tenement/rivalry.lost` tags: family, siblings, rivalry, apprenticeship, craft, reform, medical, schooling
  Berta Weiss 2收了Anton。Hedwig在门口站到天黑，回家把父亲的工具箱打开，照着记忆里的样子练。Friedrich Hofer进来，说别跟你兄弟争，争来的东西不长久；Hedwig没有抬头，刨花落在脚背上，像一层薄雪。
  _effects: mood -0.1; flag +lost_apprenticeship_to_sibling; role; skill; relation rival with person-phase15-Anton-world-vienna-1912; relation acquaintance with person-materialized-world-vienna-1912-6_

- **1926.10** `r15-work.master-takes-on::ctx-vienna-reform-1930::milieu-tenement/unpaid-trial` tags: work, craft, apprentice, trade, poverty, reform, medical, schooling
  Elisabeth Lechner先说试三个月，不给工钱，只管一顿午饭。家里同意了，因为多一张嘴比多一双手更难。Hedwig每天最早到，最晚走，三个月后师傅才把契约拿出来。
  _effects: food; mood -0.04000000000000001; state_add apprenticeship-contract state:world-vienna-1912:123; education apprenticeship; role_

- **1927.01** `state_tick:yf18-first-awakening/half-year-of-glances/answered-glance` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Hedwig在教堂门口或学校走廊里又遇见Lena。这一次对方先点了头，Hedwig准备好的整段话全忘了，只把手里的书换到另一只手上；回家后Hedwig才发现，自己把书拿倒了。
  _effects: state_parameter yf18-first-awakening.intensity 40 -> 45; state_parameter yf18-first-awakening.nerve 5 -> 13; state_parameter yf18-first-awakening.reciprocated false -> true; mood 0.03_

- **1927.01** `state_tick:apprenticeship-contract/workshop-year/mistake` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Hedwig废掉了一块料，师傅扣了工钱。晚饭时谁也没提这件事。
  _effects: state_parameter apprenticeship-contract.failures 0 -> 1; cash -1 (wasted material); mood -0.04000000000000001_

- **1927.01** `r13-civ.first-aid-course::ctx-vienna-reform-1930::milieu-tenement/certificate-earned` tags: health, first_aid, course, skill, school, reform, medical, schooling
  Berta Bauer把一条绷带绕在Hedwig的小臂上，教怎么打结才不会勒住血管。Hedwig在同桌的手臂上练了三遍，最后一遍得到了点头。课程结束时，Berta Bauer发了一张油印证书，上面盖着红十字的章。
  _effects: flag +earned_first_aid_certificate; role; skill; knowledge “a bandage must be tight enough to hold but loose enough for ”; relation acquaintance with person-materialized-world-vienna-1912-51_

- **1927.05** `r3-teen.foster-family::ctx-vienna-reform-1930::milieu-tenement/settles` tags: foster_care, family, placement, belonging, institution, reform, medical, schooling
  寄养母亲在碗柜第三层给Hedwig留了一个位置，放她的搪瓷碗和一把小勺。第一顿饭是土豆糊，Anton把唯一的蛋黄拨给她。Hedwig没有吃，先把碗洗了，洗得比谁都久。
  _effects: mood 0.06; flag +settled_with_foster_family; relation guardian with person-friedrich-hofer; relation friend with person-phase15-Anton-world-vienna-1912; move place-wien-leopoldstadt-tenement_

- **1927.06** `r3-teen.police-caution::ctx-vienna-reform-1930::milieu-tenement::reform-parent-notice/fined` tags: police, caution, record, family, work, reform, medical, schooling
  Mitzi Weiss说按条例罚三克朗，交不出就通知学校。Friedrich Hofer从内衣口袋里摸出叠好的钞票，一张张数，数到第三张时手停了。回家后，那三克朗被写在厨房的账单上，旁边画了一道红线。
  _effects: cash -3 (派出所里的第一次签字); mood -0.08000000000000002; flag +fined_by_police; relation rival with person-friedrich-hofer; relation acquaintance with person-materialized-world-vienna-1912-52; relation acquaintance with person-materialized-world-vienna-1912-26_

- **1927.10** `yf18-friend.inkwell::ctx-vienna-reform-1930::milieu-tenement/deny-everything` tags: exam, cheating, friendship, betrayal, school, reform, medical, schooling
  Rosa Winter把Hedwig和Katharina Hofer一起叫到讲台前，问墨水瓶底下的公式是谁写的。Hedwig说不知道；Katharina Hofer低着头，袖口还沾着同样的蓝墨水。Rosa Winter让两人各写一份检讨，Hedwig写到一半，听见Katharina Hofer在旁边小声说“对不起”，笔尖把纸戳破了。
  _effects: reputation -0.030000000000000002; relation friend with person-materialized-world-vienna-1912-55; flag +yf18_exam_suspicion; mood -0.03999999999999998_

- **1928.01** `yf18-apprentice.press-guard::ctx-vienna-reform-1930::milieu-tenement/refuse-the-machine` tags: apprenticeship, work, danger, machine, injury, refusal, reform, medical
  教堂年历的订单催得紧，Allgemeines Krankenhaus Wien把压印机的护板卸了，说这样进纸快一半。Hedwig看着那块铁板，说手会进去；Allgemeines Krankenhaus Wien把工钱袋往桌上一扔，问Hedwig是不是不想出师了。Hedwig没有碰机器，那天下午的活由Berta Weiss 3接手。
  _effects: relation employer with person-friedrich-hofer; state_parameter apprenticeship-contract.progress 8 -> 3; state_parameter apprenticeship-contract.failures 1 -> 2; flag +yf18_refused_unguarded_press; mood 0.01999999999999999; relation acquaintance with person-materialized-world-vienna-1912-30_

- **1928.01** `state_tick:yf18-first-awakening/half-year-of-glances/answered-glance` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Hedwig在教堂门口或学校走廊里又遇见Lena。这一次对方先点了头，Hedwig准备好的整段话全忘了，只把手里的书换到另一只手上；回家后Hedwig才发现，自己把书拿倒了。
  _effects: state_parameter yf18-first-awakening.intensity 45 -> 50; state_parameter yf18-first-awakening.nerve 13 -> 21; state_parameter yf18-first-awakening.reciprocated true -> true; mood 0.03_

- **1928.01** `state_transition:apprenticeship-contract/expelled` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick, failed-apprentice
  Hedwig从「学徒契约」转入另一段处境：the master ended the contract
  _effects: state_transition apprenticeship-contract -> failed-apprentice; flag +failed_apprenticeship; mood -0.07999999999999999; role_

- **1928.01** `r13-edu.music-lesson::ctx-vienna-reform-1930::milieu-tenement/broken-string` tags: education, music, lesson, craft, culture, reform, medical, schooling
  Hedwig换把时用力过猛，弦轴崩了，琴弦抽在手背上。Rosa Winter没有责备，只让Hedwig先学三个月空弦。Hedwig每天对着镜子拉同一个音，拉到最后，连邻居都不再敲墙，只是经过门口时会放慢脚步。第二天Hedwig照常来，手上缠着布。弦上还有血。
  _effects: cash -2 (借来的小提琴); skill_

- **1928.05** `r2-leisure.scullery-punishment::ctx-vienna-reform-1930::milieu-tenement::scullery-punishment-reform/reported-to-inspector` tags: domestic_service, abuse, punishment, burn, servant, reform, medical, schooling
  检查员来查佣工合同，Allgemeines Krankenhaus Wien让Hedwig把手藏在围裙下面。Hedwig没有藏，摊开掌心，那块新疤还没有褪成白色。检查员看了一眼，又看了一眼Berta Weiss 2，把名字写进本子。Allgemeines Krankenhaus Wien说这是烫衣服不小心，谁家没有这种事。
  _effects: reputation 0.05; flag +reported_iron_burn_to_inspector; role; knowledge “the inspector recorded the burn and the household address”; relation colleague with person-materialized-world-vienna-1912-6; relation acquaintance with person-materialized-world-vienna-1912-59_

- **1928.06** `ld18-letter.schoolbook::ctx-vienna-reform-1930::milieu-tenement/the-letter-changes-hands` tags: love, letter, school, secret, queer, courtship, secret_intimacy, reform
  Hedwig把写给Anton的信折成四折，夹在拉丁文课本第三百页。第二天，书还回来时，页边多了一行铅笔字：“星期四，图书馆关门前。”两个人在书架之间站得很近，谁都没有先提那封信。
  _effects: state_add ld18-impossible-attachment state:world-vienna-1912:219; relation friend with person-phase15-Anton-world-vienna-1912; mood 0.04999999999999999; flag +letter_in_the_schoolbook; flag +impossible_attachment_active_

- **1929.01** `state_expire:yf18-first-awakening` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Hedwig的「第一次心动」到期；相关安排结束。
  _effects: state_remove yf18-first-awakening state:world-vienna-1912:122; flag -yf18_first_awakening_active_

- **1929.01** `state_tick:ld18-impossible-attachment/invented-anniversary/a-form-with-an-empty-line` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  户籍窗口换了一张新表格，配偶一栏不能空着。Hedwig最后写了“同住人”，办事员抬头看了一眼，说这不作数。回家后，Hedwig把表格折成很小的一块，塞进针线盒；伴侣问今天顺不顺利，Hedwig说和平时一样。
  _effects: state_parameter ld18-impossible-attachment.pressure 15 -> 21; state_parameter ld18-impossible-attachment.discretion 55 -> 52; mood -0.020000000000000018_

- **1929.01** `r13-civ.first-aid-course::ctx-vienna-reform-1930::milieu-tenement/certificate-earned` tags: health, first_aid, course, skill, school, reform, medical, schooling
  Grete Winter把一条绷带绕在Hedwig的小臂上，教怎么打结才不会勒住血管。Hedwig在同桌的手臂上练了三遍，最后一遍得到了点头。课程结束时，Grete Winter发了一张油印证书，上面盖着红十字的章。
  _effects: skill; knowledge “a bandage must be tight enough to hold but loose enough for ”; relation acquaintance with person-materialized-world-vienna-1912-2_

- **1930.01** `curse15-betrayal.name-on-the-list::ctx-vienna-reform-1930::milieu-tenement/sold-the-letter` tags: betrayal, politics, investigation, curse, denunciation, secret, reform, medical
  Berta Kral把Hedwig托付保管的一封旧信卖给了收旧纸的人。信里提到几个已经不用的名字，买主又把信转给了另一个买主。Hedwig再见到那封信时，它被压在一块玻璃下面，标价是Hedwig半个月的工钱。
  _effects: cash -1 (买回自己的旧信); reputation -0.05; relation rival with person-materialized-world-vienna-1912-4; knowledge “我写的一封旧信被人压在玻璃下面标价出售。”; flag +private_letter_sold; relation acquaintance with person-materialized-world-vienna-1912-4_

- **1930.01** `state_reaction:cursed-by-wish/curse-betrayal` tags: cursed-by-wish, wish, curse, supernatural, revenge, special, state, state_reaction
  背叛发生后的夜里，Hedwig听见墙里有一声很轻的响。第二天，Berta Kral病倒了；没有人把这两件事放在一起。
  _effects: health -0.11999999999999998 (the curse answers a real betrayal); condition; state_parameter cursed-by-wish.triggers 0 -> 1; mood 0.01999999999999999_
  _causes: evt:world-vienna-1912:003340_

- **1930.01** `state_tick:ld18-impossible-attachment/invented-anniversary/a-form-with-an-empty-line` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  户籍窗口换了一张新表格，配偶一栏不能空着。Hedwig最后写了“同住人”，办事员抬头看了一眼，说这不作数。回家后，Hedwig把表格折成很小的一块，塞进针线盒；伴侣问今天顺不顺利，Hedwig说和平时一样。
  _effects: state_parameter ld18-impossible-attachment.pressure 21 -> 27; state_parameter ld18-impossible-attachment.discretion 52 -> 49; mood -0.020000000000000018_

- **1930.01** `r13-civ.enter-hospital::ctx-vienna-reform-1930::milieu-tenement/admitted-third-class` tags: health, hospital, admission, deposit, institution, reform, medical, schooling
  Mitzi Weiss把押金收据和住院单钉在一起，让Hedwig去三楼东侧等床。走廊里全是折叠床，Luise Stein给Hedwig一条洗得发硬的毯子，说今晚先别喝水。Hedwig把鞋塞在枕头下面，听着隔壁的呻吟睡了过去。
  _effects: cash -8 (住院处窗口的押金); health 0.05999999999999999 (住院处窗口的押金); condition; flag +hospitalized_third_class; relation acquaintance with person-materialized-world-vienna-1912-71; relation acquaintance with person-materialized-world-vienna-1912-71_

- **1930.02** `vienna-adult-social.burial-fund/burial-fund.skipped` tags: adulthood, social, work, family
  Hedwig对Luise Huber说这个月实在挤不出来，房租刚涨了半个克朗。Luise Huber把本子翻到另一页，说那就先记着，只是下个月得补齐。午休铃响时，Hedwig的工具箱上还留着本子压出的印子。
  _effects: mood -0.05000000000000002; relation colleague with person-materialized-world-vienna-1912-68; relation acquaintance with person-materialized-world-vienna-1912-68_

- **1930.02** `bc18-crime.failed-burglary::ctx-vienna-reform-1930::milieu-tenement/health-inspectors` tags: crime, burglary, mistake, absurd, police, legal, comic, reform
  两人摸黑撬开一扇门，里面没有保险柜，只有背景布、三脚架和一池显影水。店主以为他们是卫生局派来查暗房通风的，殷勤地领着看排水口；Berta Weiss 2只好装模作样地记了几笔，Hedwig顺手把柜台上一顶帽子戴走。临走时，店主还问要不要写整改通知。
  _effects: cash 1 (卖掉顺走的帽子); relation friend with person-materialized-world-vienna-1912-6; condition; flag +burglary_mistaken_for_inspection; mood 0.020000000000000018_

- **1930.02** `vienna-courtship-courtyard.family-table/wage-question-silence` tags: adulthood, courtship, partner, social, family, partnership
  Friedrich Hofer问起工钱和房租，Hedwig报了个数，又补了一句冬天活少。桌上一时只剩刀叉声。Katharina Weiss低着头把面包掰成小块，Friedrich Hofer往汤里又加了一勺盐，谁都没再开口；这顿饭把两个人的将来问成了一个没答完的数目。
  _effects: mood -0.07; relation kin with person-friedrich-hofer; relation partner with person-materialized-world-vienna-1912-70; relation acquaintance with person-materialized-world-vienna-1912-70_

- **1930.03** `vienna-parish-aid.sick-call/sick-call.help-in` tags: faith, parish, mutual_aid, poverty, family, injury
  Hedwig和Otto Winter一起上楼，门没锁，屋里一股酸味。病人裹着毯子坐在床沿咳嗽，炉子只剩灰。Hedwig去楼下讨了几块煤核，蹲着把火生起来，又用带来的面粉搅了一小锅稀粥。药粉冲开，碗底沉着白渣，Hedwig先垫了药钱，说以后再说。
  _effects: cash -0.6 (替病人垫上药粉钱); health -0.019999999999999997 (在病人屋里待久了，嗓子发干); relation acquaintance with person-otto-winter; flag +parish_sick_visitor_

- **1930.10** `vienna-housing-move.moving-day/moving-day-cart` tags: housing, home, rent, family, money, household
  车夫把价钱咬得很死，Hedwig还到五克朗又添了二十赫勒，才说定跑一趟。Friedrich Hofer扶着床架，车过路口时煤箱歪了一下，细灰撒在路面上。到了地方，东西卸在门厅，天已经大亮。
  _effects: cash -6 (雇马车搬家具一趟的工钱); residence; relation acquaintance with person-friedrich-hofer_

- **1931.01** `vienna-life-injury-recovery/clinic-treatment` tags: health, work, family
  Hedwig在受伤后的第三天去了诊所。医生清洗伤口、换药，收下诊费，嘱咐不要急着回机器旁。Hedwig把药方折好，回家路上买了纱布。
  _effects: health 0.05 (wound treatment); cash -8 (clinic and bandages); condition_
  _causes: evt:world-vienna-1912:003342_

- **1931.01** `curse15-notice.the-second-illness::ctx-vienna-reform-1930::milieu-tenement/counts-the-interval` tags: curse, notice, illness, fear, knowledge, supernatural, reform, medical
  Hedwig把两次背叛和两次发烧的日期写在同一张纸上，发现中间都隔着十一天。Hedwig没有告诉任何人，只把纸折成很小的一块，塞进缝衣盒的夹层。那天夜里，Hedwig第一次试着在门口撒盐，动作熟练得让自己停了一下。
  _effects: knowledge “背叛与发烧之间隔着十一天。”; flag +curse_counted; skill; mood -0.020000000000000018_

- **1931.01** `state_tick:ld18-impossible-attachment/invented-anniversary/a-form-with-an-empty-line` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  户籍窗口换了一张新表格，配偶一栏不能空着。Hedwig最后写了“同住人”，办事员抬头看了一眼，说这不作数。回家后，Hedwig把表格折成很小的一块，塞进针线盒；伴侣问今天顺不顺利，Hedwig说和平时一样。
  _effects: state_parameter ld18-impossible-attachment.pressure 27 -> 33; state_parameter ld18-impossible-attachment.discretion 49 -> 46; mood -0.020000000000000018_

- **1931.01** `kernel-health.task-house-call::ctx-vienna-reform-1930::milieu-tenement::house-call-medical-students/house-call-medical-teaching` tags: health, task, house_call, care, poverty, reform, medical, schooling
  医院派来一名实习医生，身后跟着两个学生。他们把Hedwig的胸口听了个遍，最后请来上级；药费减半，但Hedwig被当成了讲课的病例。学生们走后，实习医生把听诊器在手里捂了很久，才敢再贴上来。
  _effects: cash -4 (reduced fee for a teaching-house call); health 0.03 (examined by a teaching team); condition; role; knowledge “教学出诊会有实习医生和学生轮流听诊，最后请上级定方案，药费可以减半。”; relation acquaintance with person-materialized-world-vienna-1912-22_

- **1931.01** `vienna-historical-social-movement.district-list/demand-open-books` tags: history, historical_process, social_movement, organization, politics
  Hedwig把账本摊在灯下，一页一页念出日期和克朗数，念到买纸那笔时有人 From 门口咳嗽。Anna Stein 2低头拨弄围巾穗子，没有替谁说话。桌子上的旧墨水瓶被碰倒，蓝墨慢慢洇进木纹。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-43; reputation 0.04; skill; relation acquaintance with person-materialized-world-vienna-1912-43_

- **1931.02** `p9-social-family-conflict-care.sick-parent-night/shifts-with-sibling` tags: family, care, siblings, inheritance, housing, money
  Hedwig和Lena把值班时辰写在门后的粉笔板上：Lena守前半夜，Hedwig守后半夜，医生说静养二十一天。煤油灯芯拧小，药粉分成小包摆在床头，便盆换水时尽量不碰出响。二十一天熬下来，Hedwig的眼皮肿了，走路发飘，但Friedrich Hofer每次起身总有人扶。
  _effects: relation kin with person-phase15-Lena-world-vienna-1912; flag +night_care_duty_

- **1931.03** `vienna-market-household.soup-kitchen/soup-kitchen.sell` tags: home, market, food, social
  鞋匠敲后门问有没有热汤，Hedwig把剩下的半锅倒进他的罐子里，收下两个十字币。Anna Stein 2提着空碗上来时，只看见Hedwig把硬币塞进围裙口袋。
  _effects: cash 2 (卖出半锅扁豆汤); relation acquaintance with person-materialized-world-vienna-1912-43_

- **1932.01** `state_tick:ld18-impossible-attachment/invented-anniversary/the-date-that-is-not-on-paper` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  Hedwig和伴侣把认识的那一天当作纪念日。没有登记，没有证人，只有一块从旧货摊买来的蛋糕和两杯兑了水的酒；Hedwig在日历上画了一个别人看不懂的记号，第二年又画在同一个格子里。
  _effects: state_parameter ld18-impossible-attachment.devotion 45 -> 49; state_parameter ld18-impossible-attachment.pressure 33 -> 30; mood 0.020000000000000018_

- **1932.01** `r13-fam.visit-grave::ctx-vienna-reform-1930::milieu-tenement/wrong-grave` tags: task, family, grave, mourning, neighbor, grief, reform, medical
  两人在坟场里绕了半个钟头，才找到那块刻着名字的石头。Maria Hofer忽然说不是这一块，自己记得旁边有一棵小槐树。Hedwig陪她一排排找，天快黑时，守墓人过来说小槐树去年就砍了；Maria Hofer站在空地上，把花放在了脚边。
  _effects: mood -0.09999999999999998; condition; flag +could_not_find_the_grave; relation friend with person-materialized-world-vienna-1912-63; knowledge “the old tree by the grave was cut down last year”; relation acquaintance with person-materialized-world-vienna-1912-63_

- **1932.02** `r2-leisure.horse-race::ctx-vienna-reform-1930::milieu-tenement/won-on-the-outside` tags: leisure, horse_racing, betting, debt, risk, reform, medical, schooling
  最后一道弯，Hedwig押的“黑旋风”从外道切进来，马蹄把泥甩到栏杆上。Anton Weiss抓着Hedwig的袖子，指甲掐进布里。冲线时，Berta Huber 2在围栏边低下头，像是在祈祷。Hedwig拿着彩票去兑钱，窗口后面的人数了三遍，才把一大叠钞票推出来。
  _effects: cash 20 (最后一道弯); mood 0.12; flag +won_horse_race_bet; relation friend with person-materialized-world-vienna-1912-60; knowledge “Black Whirlwind runs best on the outside rail”; relation acquaintance with person-materialized-world-vienna-1912-60; relation acquaintance with person-materialized-world-vienna-1912-67; relation acquaintance with person-materialized-world-vienna-1912-44_

- **1932.03** `vienna-medical-treatment.sanatorium/ignore-diagnosis` tags: health, medical, family, money
  抽屉一推就卡住，Hedwig用膝盖顶了一下才合严。上工路上经过药房，橱窗里摆着润肺糖浆的广告画，她别过头去。车间主任点名时，她应声比平时慢了一拍。
  _effects: condition; mood -0.03999999999999998_

- **1932.04** `vienna-tenement-neighbors.lost_room_key/key_found_by_neighbor` tags: home, social, family, housing
  Hedwig傍晚从面粉厂下工回来，发现挂在腰带上的房门钥匙不见了，在楼梯间来回找了四趟。Berta Weiss在二楼拐角的煤堆旁捡到那把铜钥匙，钥匙上缠着红线，一眼就认出来。Berta Weiss敲开Hedwig的门，把钥匙拍在桌上，说自己眼神好使。
  _effects: relation friend with person-berta-weiss; mood 0.04999999999999999_

- **1932.09** `p22-mistaken-inheritance::ctx-vienna-reform-1930::milieu-tenement/the-wrong-name-is-buried-right` tags: mistaken_inheritance, funeral, corpse, identity, dark, reversal, debt, family
  殡仪馆把两具棺材的标签贴反了，Hedwig因此继承了一个陌生人的小公寓。Anton Weiss说只要没人发现，就可以一直住下去；Hedwig却在死者的抽屉里找到一叠未寄出的信，收信人正是隔壁的Anton。葬礼那天，Hedwig把钥匙和信一起交了出去。
  _effects: state_add p22-wild-fortune state:world-vienna-1912:373; cash 3 (a reward for returning the estate); reputation 0.05; relation acquaintance with person-phase15-Anton-world-vienna-1912; relation acquaintance with person-materialized-world-vienna-1912-60; flag +wrong_coffin_righted; knowledge “殡仪馆把两具棺材的标签贴反了，死者的信指向隔壁的 claimant。”; mood 0.030000000000000027; flag +wild_fortune_active_

- **1933.01** `ld18-raid.private-club::ctx-vienna-reform-1930::milieu-tenement/the-owner-pays` tags: queer, raid, police, public, scandal, nightlife, secret_intimacy, reform
  Berta Weiss 2在门口和Mitzi Weiss低声说了几句，塞过去一只信封。警察走后，他转头对Hedwig说，下个月的酒钱要加一倍。Rosa Winter问要不要换地方；Hedwig说先把这个月过完。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-6; cash -1 (the raised bar bill after the bribe); state_parameter ld18-impossible-attachment.pressure 30 -> 35; flag +club_owner_paid_the_police_

- **1933.01** `state_tick:ld18-impossible-attachment/invented-anniversary/the-date-that-is-not-on-paper` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  Hedwig和伴侣把认识的那一天当作纪念日。没有登记，没有证人，只有一块从旧货摊买来的蛋糕和两杯兑了水的酒；Hedwig在日历上画了一个别人看不懂的记号，第二年又画在同一个格子里。
  _effects: state_parameter ld18-impossible-attachment.devotion 49 -> 53; state_parameter ld18-impossible-attachment.pressure 35 -> 32; mood 0.020000000000000018_

- **1933.01** `state_tick:p22-wild-fortune/the-story-gets-taller/the-crowd-remembers` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  一年过去，Hedwig的荒唐故事没有变小，反而多了一个愿意作证的人。债主没有立刻上门，亲戚也还愿意来吃饭；Hedwig把新添的银器擦了一遍，发现其中一只底下刻着别人的名字。
  _effects: state_parameter p22-wild-fortune.height 25 -> 29; state_parameter p22-wild-fortune.absurdity 55 -> 58; state_parameter p22-wild-fortune.witnesses 40 -> 45; state_parameter p22-wild-fortune.fragility 30 -> 32; mood 0.020000000000000018_

- **1933.01** `r13-civ.recover-at-home::ctx-vienna-reform-1930::milieu-tenement/kin-nursed` tags: health, recovery, care, household, food, reform, medical, schooling
  Katharina Weiss把粥熬得很稀，一勺一勺吹凉，托着Hedwig的后颈喂下去。窗帘拉开半尺，太阳从床脚移到墙上，Hedwig第一次觉得退烧后的骨头是轻的。Katharina Weiss把药钱记在日历背面，说下个月少买两次肉。
  _effects: cash -2 (退烧后的第一碗粥); food; health 0.08 (退烧后的第一碗粥); flag +recovered_with_kin_care; relation partner with person-materialized-world-vienna-1912-70_

- **1933.11** `vienna-courtship-courtyard.family-table/wage-question-silence` tags: adulthood, courtship, partner, social, family, partnership
  Friedrich Hofer问起工钱和房租，Hedwig报了个数，又补了一句冬天活少。桌上一时只剩刀叉声。Gustav Bauer 2低着头把面包掰成小块，Friedrich Hofer往汤里又加了一勺盐，谁都没再开口；这顿饭把两个人的将来问成了一个没答完的数目。
  _effects: mood -0.07; relation kin with person-friedrich-hofer; relation partner with person-materialized-world-vienna-1912-54; relation acquaintance with person-materialized-world-vienna-1912-54_

- **1934.01** `p23-wedding-dress::ctx-vienna-authoritarian-1934::milieu-tenement/she-wears-it-to-another-wedding` tags: love, desire, obsession, stalker, wedding, fear, high_drama, vienna
  Hedwig把裙子穿去了Katharina Weiss表妹的婚礼。席间有人问是谁裁的，Hedwig说是旧货店；话没说完，Elisabeth Winter从邻桌站起来，说领口的针脚是自己缝的。音乐还在响，Katharina Weiss的叉子停在盘子上，整个大厅忽然安静得能听见冰化开的声音。
  _effects: state_add public-scandal state:world-vienna-1912:429; state_add known-affair state:world-vienna-1912:430; relation partner with person-materialized-world-vienna-1912-70; relation rival with person:evt:world-vienna-1912:000335:child; reputation -0.04; mood -0.03999999999999998; flag +dress_worn; flag +known_affair_active_

- **1934.01** `vienna-family-divorce/partner-moves-to-shared-housing` tags: family, marriage, divorce, housing, lifecycle, separation, household
  Katharina Weiss把一只箱子和工票搬去合租房，带走一半锅碗。Hedwig留在Leopoldstädter Zinshaus, gemeinsamer Gang，把空出来的床租给一个学徒，用租金补房租；搬家花掉四克朗，Hedwig在户籍上成了分居的人，夜里听见隔壁床板响，总要愣一下。
  _effects: relation_end partner with person-materialized-world-vienna-1912-70; household; cash -4 (moving and separate goods); mood -0.06; role_

- **1934.01** `state_reaction:ld18-impossible-attachment/a-family-wedding` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  亲戚的婚礼上，Hedwig被安排和伴侣分开坐。司仪问有没有人反对，Hedwig低头喝汤；伴侣在另一桌替别人倒酒，手很稳，酒没有洒出来。散席时，两个人在衣帽间碰见，只说了一句“外面下雨”。
  _effects: state_parameter ld18-impossible-attachment.pressure 32 -> 42; state_parameter ld18-impossible-attachment.grief 0 -> 4; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:005184_

- **1934.01** `ld18-intimacy.hairwash::ctx-vienna-authoritarian-1934::milieu-tenement/a-knock-at-the-door` tags: love, intimacy, gentle, everyday, queer, body, secret_intimacy, vienna
  头发刚擦到一半，Rosa Kral来敲门收煤气钱。Hedwig把Mitzi Weiss推进壁橱，自己披上外套去开门；床上的湿毛巾还没来得及收。Rosa Kral看了一眼，说下次记得把水倒了，楼梯会滑。
  _effects: state_parameter ld18-impossible-attachment.pressure 42 -> 50; state_parameter ld18-impossible-attachment.discretion 46 -> 51; relation friend with person-materialized-world-vienna-1912-52; mood -0.020000000000000018_

- **1934.01** `state_tick:ld18-impossible-attachment/invented-anniversary/the-date-that-is-not-on-paper` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  Hedwig和伴侣把认识的那一天当作纪念日。没有登记，没有证人，只有一块从旧货摊买来的蛋糕和两杯兑了水的酒；Hedwig在日历上画了一个别人看不懂的记号，第二年又画在同一个格子里。
  _effects: state_parameter ld18-impossible-attachment.devotion 53 -> 57; state_parameter ld18-impossible-attachment.pressure 50 -> 47; mood 0.020000000000000018_

- **1934.01** `r13-work.reference-letter::ctx-vienna-authoritarian-1934::milieu-tenement/letter-refused` tags: work, reference, hiring, favour, reputation, vienna, urban, crisis
  Emil Hofer说Hedwig走的时候没有打招呼，现在写信等于打自己的脸。Hedwig站在门房外，把来意又说了一遍，Emil Hofer低头去拨炉子，不再接话。回家的路上，Hedwig把准备好的一小包烟叶捏碎了，撒在路边的雪里。
  _effects: mood -0.10000000000000003; flag +work13_reference_letter_refused; relation rival with person-materialized-world-vienna-1912-77; relation acquaintance with person-materialized-world-vienna-1912-77; relation acquaintance with person-materialized-world-vienna-1912-66_

- **1934.05** `vienna-women-housework.coal-stove/coal-stove.buy-coal` tags: gender, housework, home, labour, family
  炉门一开，黑烟先扑出来，Hedwig眯着眼把纸团往里塞。火苗舔着碎煤慢慢亮起来，Mitzi Lechner隔着门喊当心一氧化碳。水壶开始咕噜作响，屋里才有点热乎气。
  _effects: cash -0.6 (购买一小筐碎煤); food_

- **1934.06** `vienna-parish-aid.funeral-society/funeral-society.pay` tags: faith, parish, mutual_aid, poverty, family
  Hedwig数出八赫勒交给Berta Weiss 3，看她在蓝皮本上找到自家门牌，把这一周的格子划掉。Berta Weiss 3说上个月隔壁巷子的人走了，公账出了棺材和一场小弥撒，剩下的钱记在册尾。楼梯口的灯很暗，Hedwig盯着自己的名字看了两遍才转身。
  _effects: cash -0.4 (一周丧葬互助会会费); relation acquaintance with person-materialized-world-vienna-1912-30; flag +funeral_society_member_

- **1934.09** `vienna-market-household.friday-fish/friday-fish.buy` tags: home, market, food, social
  鱼摊快收了，Hedwig挑了一条最小的鳟鱼，摊主顺手抓了把欧芹丢进纸里。黄油在锅里化开，鱼皮卷起来，楼道里都是味。Anna Stein 2敲门时，Hedwig从鱼尾切下一小块递过去。
  _effects: cash -6 (买鳟鱼和黄油); food; mood 0.08000000000000002; relation acquaintance with person-materialized-world-vienna-1912-43_

- **1935.01** `curse15-notice.the-second-illness::ctx-vienna-authoritarian-1934::milieu-tenement/calls-it-a-fever` tags: curse, notice, illness, fear, knowledge, supernatural, vienna, urban
  医生说只是换季的烧，Hedwig便也这么说。第二次退烧后，Hedwig把那张写满日期的纸烧了，灰倒进花盆。花盆里的植物活了下来，Hedwig因此更愿意相信巧合，也不再去数下一个十一天。
  _effects: flag +curse_dismissed_as_fever; condition; mood 0.030000000000000027_

- **1935.01** `state_expire:failed-apprentice` tags: failed-apprentice, craft, work, failure, stigma, state, state_tick, state:failed-apprentice
  Hedwig的「学徒契约终止」到期；相关安排结束。
  _effects: state_remove failed-apprentice state:world-vienna-1912:174_

- **1935.01** `state_tick:ld18-impossible-attachment/invented-anniversary/a-form-with-an-empty-line` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  户籍窗口换了一张新表格，配偶一栏不能空着。Hedwig最后写了“同住人”，办事员抬头看了一眼，说这不作数。回家后，Hedwig把表格折成很小的一块，塞进针线盒；伴侣问今天顺不顺利，Hedwig说和平时一样。
  _effects: state_parameter ld18-impossible-attachment.pressure 47 -> 53; state_parameter ld18-impossible-attachment.discretion 51 -> 48; mood -0.020000000000000018_

- **1935.01** `state_expire:p22-wild-fortune` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  Hedwig的「荒唐横财」到期；相关安排结束。
  _effects: state_remove p22-wild-fortune state:world-vienna-1912:373; flag -wild_fortune_active_

- **1935.01** `state_tick:known-affair/public-year/forgotten` tags: known-affair, love, scandal, secret, public, secret_intimacy, state, state_tick
  Hedwig的名字从闲谈里慢慢退了下去。街上有了新的婚礼、新的葬礼和新的丑闻；只有裁缝还记得Hedwig改过两次同一件外套的腰身。
  _effects: state_parameter known-affair.notoriety 65 -> 60; state_parameter known-affair.grief 0 -> 0; mood 0.020000000000000018_

- **1935.01** `r13-civ.recover-at-home::ctx-vienna-authoritarian-1934::milieu-tenement/kin-nursed` tags: health, recovery, care, household, food, vienna, urban, crisis
  Gustav Bauer 2把粥熬得很稀，一勺一勺吹凉，托着Hedwig的后颈喂下去。窗帘拉开半尺，太阳从床脚移到墙上，Hedwig第一次觉得退烧后的骨头是轻的。Gustav Bauer 2把药钱记在日历背面，说下个月少买两次肉。
  _effects: cash -2 (退烧后的第一碗粥); food; health 0.08 (退烧后的第一碗粥); relation partner with person-materialized-world-vienna-1912-54_

- **1935.05** `vienna-tenement-neighbors.shared_stove_fire/fire_no_damage` tags: home, social, family, housing
  Hedwig刚把锅端下灶，火苗就蹿了起来，Otto Winter一脚踩灭地上的油布，顺手抄起沙箱里的沙子盖住灶口。两人都没受伤，但Otto Winter的鞋底烧穿一个洞，那是唯一一双出门的鞋。
  _effects: relation friend with person-otto-winter; mood -0.050000000000000044_

- **1935.10** `curse15-betrayal.name-on-the-list::ctx-vienna-authoritarian-1934::milieu-tenement/the-accusation-fails` tags: betrayal, politics, investigation, curse, denunciation, secret, vienna, urban
  Helene Weiss在众人面前说Hedwig用诅咒害人。没有人接话，因为上个月Helene Weiss也用同样的话说过另一个人。事情没有闹大，但Hedwig发现，从此每次走进那间屋子，都有人先看Hedwig的手。
  _effects: reputation -0.03; relation rival with person-materialized-world-vienna-1912-10; state_add suspected-witchcraft state:world-vienna-1912:533; flag +accusation_echoed; mood -0.040000000000000036_

- **1935.10** `state_reaction:cursed-by-wish/curse-betrayal` tags: cursed-by-wish, wish, curse, supernatural, revenge, special, state, state_reaction
  背叛发生后的夜里，Hedwig听见墙里有一声很轻的响。第二天，Helene Weiss病倒了；没有人把这两件事放在一起。
  _effects: health -0.18 (the curse answers a real betrayal); condition; state_parameter cursed-by-wish.triggers 2 -> 3; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:006191_

- **1936.01** `p23-lovers-ledger::ctx-vienna-authoritarian-1934::milieu-tenement/the-ledger-burns-first` tags: love, desire, betrayal, ledger, secret, blackmail, high_drama, vienna
  Gustav Bauer 2比Hedwig早到一步。炉膛里只剩一截没烧透的蓝线，Hedwig从灰里拈出来，认出那是账本装订用的线。Gustav Bauer 2说这样对大家都好；Hedwig没有回答，只把灰烬扫进一只信封，收进抽屉最深处。炉子里的火还没有完全灭。
  _effects: state_add p23-dangerous-secret state:world-vienna-1912:531; relation partner with person-materialized-world-vienna-1912-54; knowledge “partner burned the ledger”; mood -0.02999999999999997; flag +ledger_burned; relation acquaintance with person-materialized-world-vienna-1912-31_

- **1936.01** `state_reaction:p23-dangerous-secret/a-witness-talks` tags: p23-dangerous-secret, secret, danger, leverage, exposure, loyalty, crime, politics
  审讯室里的灯亮了一夜。第二天，Hedwig在面包房门口听见有人低声复述自己的秘密，连停顿的位置都一模一样。
  _effects: state_parameter p23-dangerous-secret.exposure 20 -> 28; state_parameter p23-dangerous-secret.leverage 15 -> 11; state_parameter p23-dangerous-secret.loyalty 55 -> 49; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:006186_

- **1936.01** `pc20-wish.literal-return::ctx-vienna-authoritarian-1934::milieu-tenement/curse-returns` tags: curse, wish, ordinary_life, second_chance, love, work, literal, irony
  Hedwig刚说完“以后不会再提”，厨房的灯就灭了。Gustav Bauer 2摸黑去找火柴，回来时看见Hedwig把同一句话又写在了纸上；Hermann Winter在门外问要不要帮忙，Hedwig说不用，声音却像另一个人。
  _effects: state_parameter cursed-by-wish.triggers 1 -> 2; state_parameter cursed-by-wish.severity 0.6 -> 0.65; state_add pc20-second-chance state:world-vienna-1912:532; relation partner with person-materialized-world-vienna-1912-54; flag +curse_returned_at_table; knowledge “灯灭的时候，{subject}又把同一句话写在了纸上。”; relation acquaintance with person-materialized-world-vienna-1912-17; flag +second_chance_open_

- **1936.01** `state_tick:ld18-impossible-attachment/invented-anniversary/the-date-that-is-not-on-paper` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  Hedwig和伴侣把认识的那一天当作纪念日。没有登记，没有证人，只有一块从旧货摊买来的蛋糕和两杯兑了水的酒；Hedwig在日历上画了一个别人看不懂的记号，第二年又画在同一个格子里。
  _effects: state_parameter ld18-impossible-attachment.devotion 57 -> 61; state_parameter ld18-impossible-attachment.pressure 53 -> 50; mood 0.020000000000000018_

- **1936.01** `state_tick:known-affair/public-year/forgotten` tags: known-affair, love, scandal, secret, public, secret_intimacy, state, state_tick
  Hedwig的名字从闲谈里慢慢退了下去。街上有了新的婚礼、新的葬礼和新的丑闻；只有裁缝还记得Hedwig改过两次同一件外套的腰身。
  _effects: state_parameter known-affair.notoriety 60 -> 55; state_parameter known-affair.grief 0 -> 0; mood 0.020000000000000018_

- **1936.01** `state_tick:suspected-witchcraft/rumor-season/whispers-fade` tags: suspected-witchcraft, witchcraft, rumor, religion, legal, reputation, fear, supernatural
  一年过去，Hedwig没有再点蜡烛，也没有再去那家后间。教堂的登记册翻到了新的一页，旧页边缘留着指甲划过的痕迹；街上的人开始讨论别的事。
  _effects: state_parameter suspected-witchcraft.evidence 15 -> 7; mood 0.020000000000000018_

- **1936.01** `r13-civ.rehearse-play::ctx-vienna-authoritarian-1934::milieu-tenement/rehearsal-broken-up` tags: culture, theatre, rehearsal, play, ambition, vienna, urban, crisis
  排练到第二幕，房东下来敲门，说楼下的住户嫌吵，再排就涨租。Anna Hofer把布景折起来，演员们抱着道具站在楼梯口。Hedwig最后走，关灯时看见舞台地板上有一圈粉笔画的走位线。
  _effects: mood -0.09999999999999998; flag +rehearsal_broken_up_by_landlord; relation acquaintance with person-materialized-world-vienna-1912-57; relation acquaintance with person-materialized-world-vienna-1912-76_

- **1936.02** `r3-war.blackout::ctx-vienna-authoritarian-1934::milieu-tenement/shared-candle` tags: war, blackout, warden, neighbor, air_raid, vienna, urban, crisis
  Hedwig用旧报纸把窗户糊了三层，屋里黑得连鞋都找不到。半夜有人敲门，Helene Weiss压低声音说自家孩子发烧，问能不能借一支蜡烛。Hedwig把蜡烛从门缝递出去，火苗在两人手里晃了一下，又被黑布盖住。
  _effects: mood 0.040000000000000036; flag +shared_candle_during_blackout; relation friend with person-materialized-world-vienna-1912-10; knowledge “the neighbor child is ill”; relation acquaintance with person-materialized-world-vienna-1912-93_

- **1936.03** `p9-social-family-conflict-care.sick-parent-night/hire-neighbor-daycare` tags: family, care, siblings, inheritance, housing, money
  Hedwig请楼下的Berta Weiss 2白天来照看Friedrich Hofer，先付一周六克朗工钱，讲好每天另管两顿饭，煤钱也从这六克里出。Berta Weiss 2上午换床单，下午喂药，临走把便盆提到楼道口。Hedwig下工回来先摸煤箱，再在练习本上记下当天的饭钱和煤钱，看见Friedrich Hofer的嘴唇不再干裂。
  _effects: cash -6 (支付邻居照看工钱和煤钱); food; relation acquaintance with person-materialized-world-vienna-1912-6; health 0.040000000000000036 (白天有人按时喂药和换洗)_

- **1936.03** `mb17-border.permit-window::ctx-vienna-authoritarian-1934::milieu-tenement/admitted-with-papers` tags: migration, border, papers, permit, station, official, belonging, vienna
  火车在清晨进站，Josef Berg把Hedwig的护照翻到最后一页，又看了看那张没有照片的出生纸。蓝章落下去，手续费和住址登记表一起被推到窗口；Hedwig把临时居留纸折成四折，塞进内衣口袋，走出站门时天还没有完全亮。
  _effects: cash -2 (the passport fee and the first week's rent); state_add mb17-newcomer state:world-vienna-1912:576; state_add mb17-remittance-web state:world-vienna-1912:577; role; flag +mb17_admitted_at_border; mood 0.030000000000000027; knowledge “临时居留纸要求在四十八小时内到区公所登记住址。”; flag +mb17_newcomer_active; flag +mb17_remittance_web_active_

- **1937.01** `vienna-tenement-neighbors.laundry_line_dispute/subject_yields_line` tags: home, social, family, housing
  Hedwig看Otto Winter盆里那几件小衬衫，把自家床单卷起来抱回屋，说等下午再晾。Otto Winter愣了一下，闷头把衣服挂好，收工回来时在Hedwig门口放了一小包用旧报纸裹的洗衣碱。Hedwig打开报纸，碱面里还掺着几粒粗盐。
  _effects: relation friend with person-otto-winter; food_
  _causes: evt:world-vienna-1912:006190_

- **1937.01** `vienna-life-injury-recovery/clinic-treatment` tags: health, work, family
  Hedwig在受伤后的第三天去了诊所。医生清洗伤口、换药，收下诊费，嘱咐不要急着回机器旁。Hedwig把药方折好，回家路上买了纱布。
  _effects: health 0.05 (wound treatment); cash -8 (clinic and bandages)_
  _causes: evt:world-vienna-1912:006192_

- **1937.01** `ld18-breakup.returned-keys::ctx-vienna-authoritarian-1934::milieu-tenement/one-last-winter` tags: breakup, grief, love, keys, queer, ending, secret_intimacy, vienna
  两个人约定再过一个冬天，等Katharina Weiss的弟弟找到工作就分开。那个冬天特别长，煤贵，汤稀；她们还是每周洗一次头发，还是为谁忘了买盐吵架。春天来的时候，Katharina Weiss的箱子已经收好了，谁也没有先提。
  _effects: state_parameter ld18-impossible-attachment.pressure 50 -> 60; state_parameter ld18-impossible-attachment.devotion 61 -> 56; relation friend with person-materialized-world-vienna-1912-70; mood -0.040000000000000036; flag +one_last_winter_

- **1937.01** `state_tick:ld18-impossible-attachment/invented-anniversary/the-date-that-is-not-on-paper` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  Hedwig和伴侣把认识的那一天当作纪念日。没有登记，没有证人，只有一块从旧货摊买来的蛋糕和两杯兑了水的酒；Hedwig在日历上画了一个别人看不懂的记号，第二年又画在同一个格子里。
  _effects: state_parameter ld18-impossible-attachment.devotion 56 -> 60; state_parameter ld18-impossible-attachment.pressure 60 -> 57; mood 0.020000000000000018_

- **1937.01** `state_expire:known-affair` tags: known-affair, love, scandal, secret, public, secret_intimacy, state, state_tick
  Hedwig的「已经公开的私情」到期；相关安排结束。
  _effects: state_remove known-affair state:world-vienna-1912:430; flag -known_affair_active_

- **1937.01** `state_tick:p23-dangerous-secret/the-secret-changes-hands/a-second-person-learns` tags: p23-dangerous-secret, secret, danger, leverage, exposure, loyalty, crime, politics
  一个曾在场的人喝多了，把故事讲给了不该听的人。第二天，Hedwig在市场上看见两个陌生人站在菜摊旁边，什么也不买，只看着来往的人。Hedwig把篮子换到另一只手上，继续挑土豆。
  _effects: state_parameter p23-dangerous-secret.exposure 28 -> 36; state_parameter p23-dangerous-secret.leverage 11 -> 7; state_parameter p23-dangerous-secret.loyalty 49 -> 43; mood -0.020000000000000018_

- **1937.01** `state_tick:pc20-second-chance/kept-word/kept-word` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  Hedwig把答应过的事又做了一遍：按时出现，把欠下的小钱还掉，没有在旧话上添新的解释。对方没有鼓掌，只把杯子往Hedwig这边推了推；这一次的沉默比上次轻。
  _effects: state_parameter pc20-second-chance.credibility 30 -> 36; state_parameter pc20-second-chance.suspicion 60 -> 55; state_parameter pc20-second-chance.hope 25 -> 29; mood 0.020000000000000018_

- **1937.01** `state_tick:suspected-witchcraft/rumor-season/whispers-fade` tags: suspected-witchcraft, witchcraft, rumor, religion, legal, reputation, fear, supernatural
  一年过去，Hedwig没有再点蜡烛，也没有再去那家后间。教堂的登记册翻到了新的一页，旧页边缘留着指甲划过的痕迹；街上的人开始讨论别的事。
  _effects: state_parameter suspected-witchcraft.evidence 7 -> 0; mood 0.020000000000000018_

- **1937.01** `state_tick:mb17-newcomer/first-year/puts-down-roots` tags: mb17-newcomer, migration, newcomer, language, network, housing, belonging, state
  一年过去，Hedwig能在菜市场用德语讲价，也知道哪家铺子肯赊半块黄油。房东仍叫他“新来的”，但楼下的面包师已经记住了他买哪一种面包，还会把前一天剩的那只小圆面包留出来。
  _effects: state_parameter mb17-newcomer.language 18 -> 22; state_parameter mb17-newcomer.localNetwork 6 -> 11; state_parameter mb17-newcomer.housingStrain 65 -> 63; mood 0.020000000000000018_

- **1937.01** `p10-edu-work-tasks.qualification-exam/p10-edu-work-tasks.qualification-exam.failed` tags: adulthood, education, work, task, night_school, apprenticeship, career, exam
  考前一天他在厂里加班到十点，第二天头脑发沉，复利题算错一道，连错三步。成绩下来四门只剩一门及格，报名费不退。Rosa Winter把卷子还给他，说那道题错在第一步，他盯着自己的字没吭声。
  _effects: cash -5 (报名费不退，考试未过); health -0.04 (加班后应试，整日头沉乏力); mood -0.09999999999999998; skill_

- **1937.01** `r1-hc.tuberculosis-diagnosis::ctx-vienna-authoritarian-1934::milieu-tenement::tb-war-army-xray/tb-war-passed-fit` tags: health, tuberculosis, diagnosis, work, waiting_list, vienna, urban, crisis
  铅屏风后面的医生只看了几秒，就在表上写了“合格”。Mitzi Weiss把军装塞进Hedwig怀里，说咳嗽到了前线自然会好。Hedwig抱着那套粗呢衣服，闻见上面别人的汗味。
  _effects: condition; flag +passed_unfit_for_service; role; knowledge “the conscription X-ray missed the cavity”; relation acquaintance with person-materialized-world-vienna-1912-101_

- **1937.06** `vienna-women-housework.piecework-bundle/piecework.hide-defects` tags: gender, housework, home, labour, family
  篮底那两件领子卷得很紧，Hedwig用围裙角把篮沿擦了擦。Anton Weiss翻了翻面上几件，拿尺子比了比，没再往下。Ferdinand Weiss 2在走廊里问交了多少，Hedwig含混说了句够买面包。
  _effects: cash 0.7 (交活所得，含未返工的两件); mood -0.040000000000000036; reputation -0.020000000000000004; relation acquaintance with person-materialized-world-vienna-1912-46_

- **1938.01** `vienna-life-anschluss-1938/complies` tags: politics, persecution, 1938
  Mitzi Weiss在街口设了登记桌，要求住户交出姓名、职业和宗教。Hedwig排队填了表，回家把门牌擦干净。楼里有人连夜搬走，也有人站在阳台上挥手。
  _effects: role; cash -3 (new permits and stamps); condition_

- **1938.01** `p22-child-matchmaker::ctx-vienna-authoritarian-1934::milieu-tenement/the-enemy-brings-a-cake` tags: child, matchmaker, family_album, enemy, warm, ironic, reconciliation, scandal
  孩子把一张陌生人的照片贴进家庭相册，说这是“爸爸以前最好的朋友”。Hedwig认出那是十年前打过官司的Josef，正要发火，孩子却说照片背面写着一行字：“等我回来吃饭。”第二天，Josef真的提着一只蛋糕站在门口。孩子把最大的一块留给Hedwig，Josef没有反对。
  _effects: relation friend with person-phase15-Josef-world-vienna-1912; relation kin with person:evt:world-vienna-1912:002846:child; cash 1 (the enemy brought a cake and a small gift); flag +enemy_brought_cake; mood 0.050000000000000044_

- **1938.01** `state_tick:ld18-impossible-attachment/invented-anniversary/the-date-that-is-not-on-paper` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  Hedwig和伴侣把认识的那一天当作纪念日。没有登记，没有证人，只有一块从旧货摊买来的蛋糕和两杯兑了水的酒；Hedwig在日历上画了一个别人看不懂的记号，第二年又画在同一个格子里。
  _effects: state_parameter ld18-impossible-attachment.devotion 60 -> 64; state_parameter ld18-impossible-attachment.pressure 57 -> 54; mood 0.020000000000000018_

- **1938.01** `state_tick:pc20-second-chance/kept-word/kept-word` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  Hedwig把答应过的事又做了一遍：按时出现，把欠下的小钱还掉，没有在旧话上添新的解释。对方没有鼓掌，只把杯子往Hedwig这边推了推；这一次的沉默比上次轻。
  _effects: state_parameter pc20-second-chance.credibility 36 -> 42; state_parameter pc20-second-chance.suspicion 55 -> 50; state_parameter pc20-second-chance.hope 29 -> 33; mood 0.020000000000000018_

- **1938.01** `state_tick:suspected-witchcraft/rumor-season/whispers-fade` tags: suspected-witchcraft, witchcraft, rumor, religion, legal, reputation, fear, supernatural
  一年过去，Hedwig没有再点蜡烛，也没有再去那家后间。教堂的登记册翻到了新的一页，旧页边缘留着指甲划过的痕迹；街上的人开始讨论别的事。
  _effects: state_parameter suspected-witchcraft.evidence 0 -> 0; mood 0.020000000000000018_

- **1938.01** `state_reaction:ld18-impossible-attachment/a-family-wedding` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  亲戚的婚礼上，Hedwig被安排和伴侣分开坐。司仪问有没有人反对，Hedwig低头喝汤；伴侣在另一桌替别人倒酒，手很稳，酒没有洒出来。散席时，两个人在衣帽间碰见，只说了一句“外面下雨”。
  _effects: state_parameter ld18-impossible-attachment.pressure 54 -> 64; state_parameter ld18-impossible-attachment.grief 4 -> 8; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:007454_

- **1938.01** `p10-family-tasks.arrange-childcare/arrange-childcare.quit-job` tags: adulthood, family, social, marriage, care, inheritance, task, childcare
  Hedwig把半天工的工钱单交回去，换回自己看孩子。晚饭从两顿并成一顿，土豆和面包皮煮一锅，伴侣把煤钱数了两遍。孩子睡下后，Hedwig在窗边缝袜子，一枚针扎了手指，她含住指头继续缝。
  _effects: cash -4 (辞掉半天工少了一份收入); food_

- **1938.01** `vienna-parish-aid.sick-call/sick-call.door-only` tags: faith, parish, mutual_aid, poverty, family
  Hedwig把药包和半块肥皂交给开门的孩子，嘱咐用水冲开、一天两次，就下了楼。楼梯间里孩子一直站在门口看着，手里攥着纸包，没关门。Hedwig走到二层又折回去，帮他把门带上，说自己家里也等着火。
  _effects: health 0.010000000000000002 (没有久留，避开了病人的屋子); relation acquaintance with person-materialized-world-vienna-1912-68; mood -0.030000000000000027_

- **1938.02** `vienna-medical-treatment.night-fever/corner-doctor` tags: health, medical, family, money
  药粉含在嘴里发苦，Hedwig就着糖浆咽下去，喉头一阵凉。医生拎包出门时，楼梯间的煤气灯刚好灭了，Josef Bauer摸黑送他到拐角，回来时手里攥着找回的几枚赫勒。
  _effects: cash -4 (医生出诊费和药费); health 0.05 (药粉和糖浆缓解症状); relation friend with person-josef-bauer_

- **1938.03** `p9-social-family-conflict-care.christmas-soup/serve-first-talk-later` tags: family, care, siblings, inheritance, housing, money
  Hedwig先给Lena盛了满满一碗，扁豆和面团结结实实压在勺底，那块熏肉切开分了两份，锅里的吃食折合两克朗。药费的事一句没提，只问要不要再添点汤。Lena吃到一半才开口，说上次说话太冲；桌边多摆的那把椅子，最后有人坐下了。
  _effects: relation kin with person-phase15-Lena-world-vienna-1912; mood 0.050000000000000044_

- **1939.01** `curse15-betrayal.name-on-the-list::ctx-vienna-authoritarian-1934::milieu-tenement/the-accusation-fails` tags: betrayal, politics, investigation, curse, denunciation, secret, vienna, urban
  Berta Stein在众人面前说Hedwig用诅咒害人。没有人接话，因为上个月Berta Stein也用同样的话说过另一个人。事情没有闹大，但Hedwig发现，从此每次走进那间屋子，都有人先看Hedwig的手。
  _effects: reputation -0.03; relation rival with person-materialized-world-vienna-1912-45; state_add suspected-witchcraft state:world-vienna-1912:678; mood -0.040000000000000036_

- **1939.01** `state_reaction:cursed-by-wish/curse-betrayal` tags: cursed-by-wish, wish, curse, supernatural, revenge, special, state, state_reaction
  背叛发生后的夜里，Hedwig自己发起了高烧；Berta Stein第二天照常出门。没有人把这两件事放在一起。
  _effects: state_parameter cursed-by-wish.triggers 3 -> 4; mood -0.06000000000000005_
  _causes: evt:world-vienna-1912:007712_

- **1939.01** `state_tick:ld18-impossible-attachment/invented-anniversary/a-form-with-an-empty-line` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  户籍窗口换了一张新表格，配偶一栏不能空着。Hedwig最后写了“同住人”，办事员抬头看了一眼，说这不作数。回家后，Hedwig把表格折成很小的一块，塞进针线盒；伴侣问今天顺不顺利，Hedwig说和平时一样。
  _effects: state_parameter ld18-impossible-attachment.pressure 64 -> 70; state_parameter ld18-impossible-attachment.discretion 48 -> 45; mood -0.020000000000000018_

- **1939.01** `state_expire:p23-dangerous-secret` tags: p23-dangerous-secret, secret, danger, leverage, exposure, loyalty, crime, politics
  Hedwig的「危险的秘密」到期；相关安排结束。
  _effects: state_remove p23-dangerous-secret state:world-vienna-1912:531_

- **1939.01** `state_expire:pc20-second-chance` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  Hedwig的「第二次机会」到期；相关安排结束。
  _effects: state_remove pc20-second-chance state:world-vienna-1912:532; flag -second_chance_open_

- **1939.01** `state_expire:suspected-witchcraft` tags: suspected-witchcraft, witchcraft, rumor, religion, legal, reputation, fear, supernatural
  Hedwig的「被疑巫术」到期；相关安排结束。
  _effects: state_remove suspected-witchcraft state:world-vienna-1912:533_

- **1939.01** `state_tick:mb17-newcomer/first-year/moves-again` tags: mb17-newcomer, migration, newcomer, language, network, housing, belonging, state
  房东把房租涨了一截，Hedwig在同一个星期里丢了工。夜里他把行李重新捆好，发现自己已经能听懂搬家公司问的那句德语，却还不足以跟人争一份租约；第二天清早，他把钥匙放在门房，没有回头。
  _effects: state_parameter mb17-newcomer.language 22 -> 24; state_parameter mb17-newcomer.localNetwork 11 -> 7; state_parameter mb17-newcomer.housingStrain 63 -> 73; mood -0.050000000000000044; flag +mb17_moved_again_

- **1939.01** `p9-work-jobsearch.ask-trial/ask-trial.accepted` tags: work, job_search, negotiation, wages, employment, task, trial, factory
  午休的哨子刚响，Friedrich Huber夹着烟走到门口。Hedwig报上姓名、住址和干过的活，声音有点发紧。工头嗯了一声，说明早六点来，管一顿午饭，干得好再谈工钱。
  _effects: flag +trial_work_pending; relation acquaintance with person-materialized-world-vienna-1912-22; mood 0.050000000000000044; relation acquaintance with person-materialized-world-vienna-1912-12_

- **1939.02** `vienna-housing-move.flat-viewing/flat-viewing-deposit` tags: housing, home, rent, family, money, household
  窗子推开只有一线天光，墙纸边角翘起，Hedwig用指甲一刮便掉下一层湿粉。看门人揣好定金，说这间是朝北的，冬天火炉要添得勤些。Elisabeth Winter 2站在楼梯口没进屋，只替Hedwig看着箱子。
  _effects: cash -4 (当场付下定金和钥匙钱); residence; relation acquaintance with person-materialized-world-vienna-1912-75_

- **1939.06** `vienna-legacy-worklife.sick-fund/sick-fund.advance-from-fund` tags: legacy, work, family, reform, ordinary_life
  药房在街口，柜台玻璃下面压着价目纸。Hedwig把两克朗推过去，伙计找回来十二赫勒，药片用报纸包成一个小包。工友接过去时手还在抖，报纸边角很快被汗洇软。
  _effects: cash -2 (从互助金垫付药费); health 0.05999999999999999 (及时买到药); relation acquaintance with person-materialized-world-vienna-1912-46_

- **1939.07** `vienna-women-housework.piecework-bundle/piecework.dispute-rate` tags: gender, housework, home, labour, family
  铜板一枚枚落在桌面上，比说好的少了十五赫勒。Hedwig没去捡，先问Franz Winter下捆还送不送。Franz Winter含糊应了一声，拎起布包就走。Josef Stein这才进来，说下回得先讲好价。
  _effects: cash 0.6 (争执后按降低的工价结算); reputation 0.03; relation colleague with person-materialized-world-vienna-1912-12; mood -0.030000000000000027_

- **1939.11** `p9-social-tenement-neighbors.stove-and-line/stove-and-line.first-come-order` tags: housing, neighbors, tenement, daily, money, reputation
  Hedwig把四只洗衣盆按到厨房的先后排成一列，用粉笔在门后写下各家的时辰：六点到七点半、七点半到九点。Anton Weiss起初嘟囔，看到自家名字排在第二格，也就把水壶提了回去。晾衣绳按同样次序分两段，谁家的床单先上谁先占。
  _effects: mood 0.040000000000000036; relation acquaintance with person-materialized-world-vienna-1912-60; relation acquaintance with person-materialized-world-vienna-1912-80_

- **1940.01** `state_expire:ld18-impossible-attachment` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  Hedwig的「无法登记的伴侣」到期；相关安排结束。
  _effects: state_remove ld18-impossible-attachment state:world-vienna-1912:219; flag -impossible_attachment_active_

- **1940.01** `state_tick:suspected-witchcraft/rumor-season/whispers-fade` tags: suspected-witchcraft, witchcraft, rumor, religion, legal, reputation, fear, supernatural
  一年过去，Hedwig没有再点蜡烛，也没有再去那家后间。教堂的登记册翻到了新的一页，旧页边缘留着指甲划过的痕迹；街上的人开始讨论别的事。
  _effects: state_parameter suspected-witchcraft.evidence 15 -> 7; mood 0.020000000000000018_

- **1940.01** `r13-fam.set-up-household::ctx-vienna-authoritarian-1934::milieu-tenement/room-rented` tags: task, family, household, housing, marriage, vienna, urban, crisis
  Hedwig跟着Anna Bauer看了后院的屋子，墙皮掉了一半，窗子对着煤棚，但有一扇能锁的门。Anna Bauer要三个月的押金，Hedwig把工钱袋倒在桌上，Gustav Bauer 2又从鞋底摸出几张票子。当天下午，两人用借来的手推车把床架和一口锅搬了进去。
  _effects: cash -8 (第一间自己的屋子); flag +set_up_household; role; relation partner with person-materialized-world-vienna-1912-54; household_

- **1940.03** `r1-civ.meeting-ban-order::ctx-vienna-authoritarian-1934::milieu-tenement/rescued-union-records` tags: politics, police, repression, meeting, organization, vienna, urban, crisis
  Hedwig绕到后院，从煤棚的窗户翻进活动室，把签到簿和会费匣抱出来。Elisabeth Huber在前门敲门，Gustav Bauer 2故意把水桶碰倒。Hedwig从墙头跳下时扭了脚，签到簿却一页没湿。
  _effects: condition; flag +rescued_union_records; role; relation friend with person-materialized-world-vienna-1912-54; knowledge “the membership book is now hidden outside the hall”; organization_funds_

- **1941.01** `hist15-occ.seed-occupation::ctx-vienna-authoritarian-1934::milieu-tenement/the-old-clerk-stays` tags: occupation, war, curfew, history, place, institution, vienna, urban
  新来的军官站在市政厅门口，旧办事员还在窗后盖章。Hedwig排队领一张新的通行证，窗口里的人低声说：“名字照旧写，住址别改。”队伍里没有人说话，只有纸张翻动的声音。
  _effects: state_add occupied-city-regime state:world-vienna-1912:824; mood -0.030000000000000027; knowledge “旧办事员仍在窗后盖章，只要名字和住址不改，通行证还能办。”_

- **1941.01** `vienna-family-childbirth/difficult-birth` tags: family, childbirth, death, lifecycle, birth, state, state:raising-child, raising-child
  Hedwig难产，接生的人守了两天。孩子最后生下来，取名Rosa 2；Hedwig一直发烧，医院又收走二十克朗，Gustav Bauer 2把钟表送进当铺。Hedwig落下产后虚弱的毛病，抱孩子时手臂发抖，站久了眼前就发黑。
  _effects: birth female; condition; cash -20 (midwife and hospital); state_add raising-child state:world-vienna-1912:825_

- **1941.01** `p22-cursed-lottery::ctx-vienna-authoritarian-1934::milieu-tenement/the-ticket-was-already-claimed` tags: lottery, curse, cursed_by_wish, dark, reversal, windfall, public, debt
  Hedwig拿着彩票去兑奖，柜台后面的人说这张票已经被人领过了，领奖人是一个三年前去世的人。Elisabeth Huber把票翻到背面，发现签名和死亡证明上的笔迹一模一样；Hedwig站在窗口前，忽然想起这张外套是从旧货市场买来的。
  _effects: state_add under-investigation state:world-vienna-1912:826; state_add public-scandal state:world-vienna-1912:827; state_add p22-scandal-engine state:world-vienna-1912:828; cash -3 (a lawyer and a lost day); relation rival with person-materialized-world-vienna-1912-93; flag +ticket_already_claimed; mood -0.06000000000000005; flag +scandal_engine_active_

- **1941.01** `state_tick:mb17-newcomer/first-year/puts-down-roots` tags: mb17-newcomer, migration, newcomer, language, network, housing, belonging, state
  一年过去，Hedwig能在菜市场用德语讲价，也知道哪家铺子肯赊半块黄油。房东仍叫他“新来的”，但楼下的面包师已经记住了他买哪一种面包，还会把前一天剩的那只小圆面包留出来。
  _effects: state_parameter mb17-newcomer.language 24 -> 28; state_parameter mb17-newcomer.localNetwork 7 -> 12; state_parameter mb17-newcomer.housingStrain 73 -> 71; mood 0.020000000000000018_

- **1941.01** `state_expire:suspected-witchcraft` tags: suspected-witchcraft, witchcraft, rumor, religion, legal, reputation, fear, supernatural
  Hedwig的「被疑巫术」到期；相关安排结束。
  _effects: state_remove suspected-witchcraft state:world-vienna-1912:678_

- **1941.01** `agency:attend_meeting` tags: agency, agency:attend_meeting
  Hedwig走到Arbeiter-Zeitung im Vorwärts-Haus门口，看见便衣和拥挤的人群，最终没有进去。
  _effects: mood -0.040000000000000036_

- **1941.05** `curse15-betrayal.ledger-share::ctx-vienna-authoritarian-1934::milieu-tenement/the-witness-stays-quiet` tags: betrayal, money, family, trust, curse, secret, vienna, urban
  Katharina Bauer 3在办事处说了Hedwig一整个下午的坏话，从欠债说到那场没人看见的火灾。旁边的人没有替Hedwig说一句话。几天后，Hedwig发现自己的名字从互助会的名单上被划掉了，Katharina Bauer 3只说“我也要养家”。
  _effects: reputation -0.08000000000000002; relation rival with person-materialized-world-vienna-1912-36; cash -1 (互助会停止发放的补贴); condition; flag +reputation_damaged_by_betrayal_

- **1941.05** `state_reaction:cursed-by-wish/curse-betrayal` tags: cursed-by-wish, wish, curse, supernatural, revenge, special, state, state_reaction
  背叛发生后的夜里，Hedwig自己发起了高烧；Katharina Bauer 3第二天照常出门。没有人把这两件事放在一起。
  _effects: state_parameter cursed-by-wish.triggers 4 -> 5; mood -0.06000000000000005_
  _causes: evt:world-vienna-1912:009427_

- **1941.07** `oj18-mortuary.first-body::ctx-vienna-authoritarian-1934::milieu-tenement/coffin-coop` tags: death, mortuary, funeral, work, odd_job, night, everyday, vienna
  师傅Rosa Kral把一块冷毛巾塞进Hedwig手里，让Hedwig先擦死者的脸，再擦自己的。殡葬合作社的规矩写在门背后：先入殓，后结账；无名者也要有一块写着日期的木牌。Hedwig做完第一具，手抖得点不着烟。
  _effects: organization_found 圣马克斯殡葬合作社 (other); position 入殓工 @mortuary:person-phase15-Hedwig-world-vienna-1912-evt:world-vienna-1912:009429; state_add oj18-odd-apprenticeship state:world-vienna-1912:890; cash 1 (first mortuary wages); skill; flag +mortuary_worker; knowledge “殡葬合作社的规矩：先入殓，后结账；无名者也要有一块日期木牌。”; role; flag +odd_job_apprentice_

- **1941.07** `state_reaction:oj18-odd-apprenticeship/the-thing-in-the-basement` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  夜班结束前，Hedwig听见地下室传来拖拽声。下去时，门开着，地上只有一道湿拖把的痕迹；第二天，所有人都说那间屋子锁了十年。
  _effects: state_parameter oj18-odd-apprenticeship.strangeKnowledge 25 -> 33; state_parameter oj18-odd-apprenticeship.trust 25 -> 22; mood -0.030000000000000027; knowledge “地下室那扇门后面有东西被搬动过，但巡查簿上没有记录。”_
  _causes: evt:world-vienna-1912:009429_

- **1942.01** `state_reaction:p22-scandal-engine/a-public-apology-cools-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Hedwig在报纸上登了道歉，流言却没有立刻停。第二天，有人在门口放了一束花，也有人把花拿走了；Hedwig把空花瓶留在窗台上，没有扔。
  _effects: state_parameter p22-scandal-engine.heat 60 -> 52; state_parameter p22-scandal-engine.reach 50 -> 47; state_parameter p22-scandal-engine.shame 60 -> 56; state_parameter p22-scandal-engine.leverage 25 -> 30; mood 0.010000000000000009_
  _causes: evt:world-vienna-1912:009334_

- **1942.01** `vienna-family-childbirth/difficult-birth` tags: family, childbirth, death, lifecycle, birth, state, state:raising-child, raising-child
  Hedwig难产，接生的人守了两天。孩子最后生下来，取名Anna 2；Hedwig一直发烧，医院又收走二十克朗，Gustav Bauer 2把钟表送进当铺。Hedwig落下产后虚弱的毛病，抱孩子时手臂发抖，站久了眼前就发黑。
  _effects: birth female; cash -20 (midwife and hospital); state_add raising-child state:world-vienna-1912:888_

- **1942.01** `pl19-bridge.public-rumor::ctx-vienna-authoritarian-1934::milieu-tenement/the-back-room-opens` tags: scandal, protection, network, press, media, rumor, bridge, vienna
  报纸卖完的第二天，Josef把Hedwig领进洗衣房后面的小间。桌上已经坐着门房、一位排字工和两个不肯说名字的人；他们没有问绯闻是真是假，只问Hedwig以后还打不打算出门。Hedwig说打算，Josef就把一盏灯往桌中间推了推。
  _effects: state_add pl19-protected-scandal state:world-vienna-1912:889; relation friend with person-phase15-Josef-world-vienna-1912; reputation -0.020000000000000004; flag +rumor_network; knowledge “洗衣房后间的人没有问绯闻真假，只问当事人还出不出门。”; flag +protected_scandal_active_

- **1942.01** `state_reaction:public-scandal/gossip` tags: public-scandal, scandal, reputation, social, state, state_reaction, protection, network
  Hedwig走进咖啡馆时，邻桌的声音低了一拍。没有人当面说什么，但每个人都知道该说什么。
  _effects: mood -0.030000000000000027; reputation -0.03_
  _causes: evt:world-vienna-1912:009424_

- **1942.01** `state_reaction:pl19-protected-scandal/a-public-question` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  有人在一场公开活动里问起Hedwig的“私人安排”，语气客气，问题却像一根针。Hedwig笑着答了别的事，回家后才发现手心全是汗。
  _effects: state_parameter pl19-protected-scandal.publicHeat 45 -> 57; state_parameter pl19-protected-scandal.protection 55 -> 49; reputation -0.03_
  _causes: evt:world-vienna-1912:009424_

- **1942.01** `state_expire:mb17-newcomer` tags: mb17-newcomer, migration, newcomer, language, network, housing, belonging, state
  Hedwig的「初到维也纳的人」到期；相关安排结束。
  _effects: state_remove mb17-newcomer state:world-vienna-1912:576; flag -mb17_newcomer_active_

- **1942.01** `state_tick:under-investigation/case-progress/evidence` tags: under-investigation, legal, police, investigation, risk, state, state_tick
  调查员又来找Hedwig谈了一次。问话比上次具体，记录也比上次长。
  _effects: state_parameter under-investigation.progress 30 -> 45; mood -0.040000000000000036_

- **1942.01** `state_tick:p22-scandal-engine/the-rumor-learns-new-words/the-story-turns-on-its-keeper` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  一个曾经替Hedwig传话的人搬走了，带走了半条街的信任。第二天，信箱里多了一张没有署名的明信片，上面只写着“我还记得”；Hedwig把明信片翻过来，背面是空的。
  _effects: state_parameter p22-scandal-engine.heat 52 -> 59; state_parameter p22-scandal-engine.reach 47 -> 52; state_parameter p22-scandal-engine.leverage 30 -> 26; state_parameter p22-scandal-engine.shame 56 -> 62; mood -0.020000000000000018_

- **1942.01** `state_tick:oj18-odd-apprenticeship/strange-year/learned-the-building` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  又过了一个冬天，Hedwig能从楼梯的响声判断是谁在值夜，也能从煤气灯的颜色判断哪一段管道该修。师傅把巡查路线改了三次，最后仍然照Hedwig画的那张走；两个人都没有提这件事。
  _effects: state_parameter oj18-odd-apprenticeship.trust 22 -> 32; state_parameter oj18-odd-apprenticeship.strangeKnowledge 33 -> 43; state_parameter oj18-odd-apprenticeship.nightsWorked 0 -> 24; cash 2 (night-shift wages); skill_

- **1942.01** `r13-work.advertise::ctx-vienna-authoritarian-1934::milieu-tenement/poster-brought-customers` tags: commerce, advertising, shop, competition, literacy, vienna, urban, crisis
  Luise Huber用红色油墨印了三十张海报，Hedwig把它们贴在面包房、澡堂和电车站的柱子上。海报上写着“新到咖啡，一磅九赫勒”，字歪了一点，价格却看得清。第三天，三个从没进过店的客人拿着海报来问，Hedwig把海报上的价又让了半赫勒。
  _effects: cash 5 (橱窗里的手写海报); reputation 0.04999999999999999; flag +work13_poster_brought_customers; relation colleague with person-materialized-world-vienna-1912-68_

- **1942.04** `vienna-legacy-worklife.sick-fund/sick-fund.advance-from-fund` tags: legacy, work, family, reform, ordinary_life
  互助金的铁盒上了两把锁，钥匙一把在Hedwig手里，一把在邻街的面包师那里。取钱时面包师说“月底前要补回来”。药买回来了，雇主那边的人说手续“走流程”，说完就去忙别的。
  _effects: cash -2 (从互助金垫付药费); health 0.06 (及时买到药); relation acquaintance with person-materialized-world-vienna-1912-82; relation acquaintance with person-materialized-world-vienna-1912-82; relation acquaintance with person-materialized-world-vienna-1912-79_

- **1942.05** `p9-social-tenement-neighbors.gramophone-wall/gramophone-wall.knock-and-bargain` tags: housing, neighbors, tenement, daily, money, reputation
  Hedwig上楼敲了Alois Huber的门，说唱针刮在墙上，夜班的人睡不安稳。Alois Huber把留声机从墙边挪到窗下，垫了一块毛毡，答应十点以后不再放。下楼时进行曲还在响，但闷了些，Hedwig能听见自家水壶的响声了。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-118; health 0.03 (夜里终于能早些入睡); relation acquaintance with person-materialized-world-vienna-1912-118_

- **1943.01** `vienna-family-childbirth/daughter-born` tags: family, childbirth, death, lifecycle, birth, state, state:raising-child, raising-child
  Hedwig在Leopoldstädter Zinshaus, gemeinsamer Gang生下一个女婴，取名Luise 2。接生的人收六克朗，Gustav Bauer 2在走廊烧水，邻居借来一只摇篮；Hedwig起身时眼前发黑，三天后腰还像断了一样，孩子哭声响亮，把屋里的冷气都顶了回去。
  _effects: birth female; cash -6 (midwife fee); state_add raising-child state:world-vienna-1912:973_

- **1943.01** `curse15-betrayal.signature::ctx-vienna-authoritarian-1934::milieu-tenement/the-files-went-first` tags: betrayal, office, power, politics, curse, institution, vienna, urban
  Maria Winter 2先把Hedwig抽屉里的往来信件搬空，再在会议上说Hedwig从来没有保存过记录。没有人能证明那些信存在过，除了Hedwig自己。散会后，有人让Hedwig回家休息几天，工资照发。Hedwig知道这不是照顾，是让Hedwig别再回来。
  _effects: reputation -0.06; relation rival with person-materialized-world-vienna-1912-112; knowledge “我经手的信件在会议前被人搬空了。”; condition; flag +records_removed; relation acquaintance with person-materialized-world-vienna-1912-112_

- **1943.01** `state_reaction:cursed-by-wish/curse-betrayal` tags: cursed-by-wish, wish, curse, supernatural, revenge, special, state, state_reaction
  背叛发生后的夜里，Hedwig听见墙里有一声很轻的响。第二天，Maria Winter 2病倒了；没有人把这两件事放在一起。
  _effects: condition; state_parameter cursed-by-wish.triggers 5 -> 6; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:010037_

- **1943.01** `state_expire:under-investigation` tags: under-investigation, legal, police, investigation, risk, state, state_tick, state:under-investigation
  Hedwig的「被调查」到期；相关安排结束。
  _effects: state_remove under-investigation state:world-vienna-1912:826_

- **1943.01** `state_expire:public-scandal` tags: public-scandal, scandal, reputation, social, state, state_tick, state:public-scandal
  Hedwig的「公开丑闻」到期；相关安排结束。
  _effects: state_remove public-scandal state:world-vienna-1912:827_

- **1943.01** `state_expire:p22-scandal-engine` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Hedwig的「流言发动机」到期；相关安排结束。
  _effects: state_remove p22-scandal-engine state:world-vienna-1912:828; flag -scandal_engine_active_

- **1943.01** `state_tick:pl19-protected-scandal/the-network-meets/someone-wants-a-favor` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  有人替Hedwig挡了一次采访，随后在走廊里提起自己儿子的学徒期满。Hedwig知道这不是闲聊；当天晚上，那张写着名字的纸条被压在糖罐下面，像一枚没有付清的硬币。
  _effects: state_parameter pl19-protected-scandal.leverage 15 -> 27; state_parameter pl19-protected-scandal.protection 49 -> 45; state_parameter pl19-protected-scandal.exposure 55 -> 60; mood -0.020000000000000018_

- **1943.01** `agency:attend_meeting` tags: agency, agency:attend_meeting
  Hedwig去了Arbeiter-Zeitung im Vorwärts-Haus，坐在后排听完了关于Sozialdemokratische Arbeiterpartei Österreich的争论；散会时带走一张油印提纲。
  _effects: historical development:initiative-org-sdap-1934 as participant; knowledge “我参加了Sozialdemokratische Arbeiterpartei Österreichs (SD。”; mood 0.030000000000000027_

- **1943.01** `p21-returned-enemy::ctx-vienna-authoritarian-1934::milieu-tenement/the-hand-extended` tags: enemy, return, betrayal, revenge, debt, blacklist, history, public
  Berta Stein在普拉特街的咖啡馆里坐到Hedwig对面，把一张发黄的借据推过来，却没有提还钱。他说自己接了一笔搬运生意，缺一个信得过的人；Hedwig看见借据背面还留着当年两个人的签名，墨迹已经发灰。
  _effects: relation colleague with person-materialized-world-vienna-1912-45; flag +old_enemy_alliance; cash 2 (an advance on the joint commission); knowledge “借据背面还留着当年两个人的签名，墨迹已经发灰。”; mood 0.010000000000000009_

- **1943.05** `vienna-tenement-neighbors.shared_stove_fire/fire_scald_hand` tags: home, social, family, housing
  Hedwig在合租房走廊的公用灶台上煮土豆，转身取盐时袖子扫翻了铁锅，滚水浇在左手背上。Gustav Berg 2从隔壁冲出来，扯下自己的围裙裹住烫伤处，又跑下楼叫来住在二楼的接生婆。接生婆用蛋清和旧亚麻布包扎，嘱咐三天不能沾水。
  _effects: relation friend with person-materialized-world-vienna-1912-103; relation acquaintance with person-materialized-world-vienna-1912-103_

- **1944.01** `vienna-family-childbirth/daughter-born` tags: family, childbirth, death, lifecycle, birth, state, state:raising-child, raising-child
  Hedwig在Leopoldstädter Zinshaus, gemeinsamer Gang生下一个女婴，取名Helene 2。接生的人收六克朗，Gustav Bauer 2在走廊烧水，邻居借来一只摇篮；Hedwig起身时眼前发黑，三天后腰还像断了一样，孩子哭声响亮，把屋里的冷气都顶了回去。
  _effects: birth female; cash -6 (midwife fee); state_add raising-child state:world-vienna-1912:1052_

- **1944.01** `pc20-family.parent-mistake::ctx-vienna-authoritarian-1934::milieu-tenement/cover` tags: parent, child, mistake, second_chance, family, school, repetition, intervention
  Hedwig替Otto 2向Otto Huber请了病假，又把那件可能惹麻烦的东西藏进自己的工具箱。Otto Huber看了Hedwig一眼，说病假可以补，别的东西补不了；Otto 2在里屋听见，门没有关严。
  _effects: state_add pc20-second-chance state:world-vienna-1912:1053; relation acquaintance with person-materialized-world-vienna-1912-110; relation kin with person:evt:world-vienna-1912:003202:child; flag +covered_child_mistake; knowledge “病假可以补，别的东西补不了。”; relation acquaintance with person-materialized-world-vienna-1912-110; flag +second_chance_open_

- **1944.01** `state_expire:pl19-protected-scandal` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  Hedwig的「被小圈子护住的私情」到期；相关安排结束。
  _effects: state_remove pl19-protected-scandal state:world-vienna-1912:889; flag -protected_scandal_active_

- **1944.01** `state_tick:oj18-odd-apprenticeship/strange-year/blamed-for-the-noise` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  楼上住户投诉夜里有人拖椅子，管事的把巡查簿翻到Hedwig的那一页，说签字太潦草，看不出巡过几趟。Hedwig想辩解，却想起那晚确实在楼梯间多站了一刻钟；扣掉的工钱刚好够买一双不漏水的鞋。
  _effects: state_parameter oj18-odd-apprenticeship.trust 32 -> 16; state_parameter oj18-odd-apprenticeship.reliability 55 -> 45; mood -0.050000000000000044; flag +odd_job_scare_

- **1944.01** `agency:support_process` tags: agency, agency:support_process
  Hedwig想帮忙，但组织者不信任新来的人，只让其在外围等消息。
  _effects: mood -0.009999999999999787_

- **1944.06** `vienna-parish-aid.rent-box/rent-box.food-only` tags: faith, parish, mutual_aid, poverty, family
  Hedwig只收下篮里的面包和豆子，把煤袋推回Otto Moser手里，说房租自己再想办法，请她们给介绍点零工。Otto Moser把煤放在走廊窗台，说礼拜四后院有人要拆旧木箱，一赫勒一捆，工钱不多但现结。Hedwig记下门牌，答应一早过去。
  _effects: food; flag +seeking_work; relation acquaintance with person-materialized-world-vienna-1912-82_

- **1944.08** `vienna-housing-move.flat-viewing/flat-viewing-too-damp` tags: housing, home, rent, family, money
  Hedwig在单间里站了一刻钟，脚底发潮，墙纸底下透出一股霉味。看门人说刷一层石灰就好，Katharina Bauer 3却在门口轻轻咳了一声，提醒这背面没有阳光。Hedwig把定金收回口袋，谢过看门人，宁可多付三克朗，也不愿把湿气带进夜里。
  _effects: flag +still_looking_for_room_

- **1945.01** `vienna-tenement-neighbors.laundry_line_dispute/subject_yields_line` tags: home, social, family, housing
  Hedwig看Gustav Berg 2盆里那几件小衬衫，把自家床单卷起来抱回屋，说等下午再晾。Gustav Berg 2愣了一下，闷头把衣服挂好，收工回来时在Hedwig门口放了一小包用旧报纸裹的洗衣碱。Hedwig打开报纸，碱面里还掺着几粒粗盐。
  _effects: relation friend with person-materialized-world-vienna-1912-103; food_
  _causes: evt:world-vienna-1912:010677_

- **1945.01** `vienna-life-1945-liberation/displaced` tags: war, liberation, 1945, migration
  炮火把Hedwig住的那条街烧掉一半。Hedwig跟着人群走到城外，在临时收容所登记，床位上铺的是发霉的稻草。
  _effects: move place-klosterneuburg-aunt-house; role; cash -5 (temporary shelter)_

- **1945.01** `vienna-family-childbirth/stillbirth` tags: family, childbirth, death, lifecycle
  孩子生下来没有哭声。接生的人把布盖上去，Gustav Bauer 2在楼梯间坐了很久；Hedwig在床上躺了三天，家里没有办葬礼，只去市政办事处登记，付了六克朗。登记表上母亲一栏写着Hedwig的名字；此后邻居提起Hedwig，只说“那个没了孩子的母亲”，柜子里还留着没拆的襁褓。
  _effects: cash -6 (midwife and burial); role_

- **1945.01** `state_tick:pc20-second-chance/kept-word/small-relapse` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  Hedwig晚了半个钟头，进门时先解释路上的电车，又解释口袋里的收据。对方没有追问，只把已经凉掉的汤端回厨房；Hedwig听见锅盖碰在灶台上，知道这次不是天气的问题。
  _effects: state_parameter pc20-second-chance.credibility 40 -> 33; state_parameter pc20-second-chance.suspicion 50 -> 58; state_parameter pc20-second-chance.debt 40 -> 43_

- **1945.01** `state_expire:oj18-odd-apprenticeship` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  Hedwig的「奇职学徒」到期；相关安排结束。
  _effects: state_remove oj18-odd-apprenticeship state:world-vienna-1912:890; role; flag -odd_job_apprentice_

- **1945.01** `p9-social-daily-culture.last-standing-ticket/p9-social-daily-culture.last-standing-ticket.buy-for-elder` tags: daily, culture, leisure, cafe, music, walk, task, task:culture
  前面的老人掏零钱时手抖得厉害，数了三遍也没凑够。Hedwig替老人把四十赫勒递进窗口，老人连声道谢，硬塞回一枚十赫勒铜板。等Hedwig自己买票时，窗口已经挂出“售罄”的牌子，只好站在剧院门廊下听里面隐约的乐声，脚底冰凉；这一趟净少三十赫勒，却让队伍里的人都记住了这份体面。
  _effects: cash -0.4 (替排队的老人垫付站票钱); cash 0.1 (老人硬塞回的铜板); reputation 0.04000000000000001_

- **1946.01** `statistical_death/violence` tags: death
  Hedwig在Haus der Tante in Klosterneuburg卷入一场冲突，头部和胸口受了重伤。旁人把人抬回家，夜里伤势恶化。Gustav Bauer 2在场。
  _effects: death (暴力); flag -second_chance_open_
## Josef Stein

Born 1895.01, died 1949.01 (age 54).
Education: primary 2; occupation: none; roles: resident, worker, tenant_organizer, partner, street_fight_suspect, father, office:入殓工, odd_job_apprentice.

### State snapshot
- public-scandal [person] (ended 1929.1: replaced_by:known-affair) parameters={} links={} ticks=0
- known-affair [person] (ended 1930.1: replaced_by:public-scandal) parameters={"notoriety":55,"grief":0,"exposure":80,"discretion":20,"remarried":false,"origin":"exposed"} links={} ticks=0
- p22-wild-fortune [person] (ended 1932.1: duration expired) parameters={"height":44,"absurdity":60,"witnesses":75,"fragility":52} links={} ticks=2
- fame [person] (ended 1930.1: replaced_by:fame) parameters={"level":0.55,"notoriety":true} links={} ticks=0
- public-scandal [person] (ended 1930.1: a front-page correction cleared the inserted confession) parameters={} links={} ticks=0
- under-investigation [person] (ended 1932.1: duration expired) parameters={"progress":45,"charge":"冒领荣誉"} links={} ticks=2
- fame [person] (ended 1932.1: duration expired) parameters={"level":0.4,"notoriety":true} links={} ticks=1
- pl19-public-ally [person] (ended 1936.1: duration expired) parameters={"visibility":77,"loyalty":48,"cost":67} links={"ally":"Josef Berg"} ticks=5
- ld18-impossible-attachment [person] (ended 1935.1: the pressure made the attachment publicly legible) parameters={"devotion":65,"improvisation":35,"pressure":100,"discretion":7,"grief":13,"named":"the one who waited outside"} links={"beloved":"Luise Huber"} ticks=3
- public-scandal [person] (ended 1935.1: duration expired) parameters={} links={} ticks=1
- pl19-protected-scandal [person] (ended 1938.1: duration expired) parameters={"exposure":78,"protection":31,"leverage":71,"publicHeat":74} links={"protector":"Otto Winter"} ticks=5
- known-affair [person] (ended 1936.1: replaced_by:public-scandal) parameters={"notoriety":30,"grief":13,"exposure":80,"discretion":7,"remarried":false,"origin":"exposed"} links={} ticks=0
- public-scandal [person] (ended 1936.1: replaced_by:known-affair) parameters={} links={} ticks=0
- known-affair [person] (ended 1938.1: replaced_by:public-scandal) parameters={"notoriety":80,"grief":7,"exposure":85,"discretion":15,"remarried":false,"origin":"exposed"} links={} ticks=1
- p22-wild-fortune [person] (ended 1938.1: replaced_by:p22-wild-fortune) parameters={"height":44,"absurdity":60,"witnesses":75,"fragility":52} links={} ticks=1
- fame [person] (ended 1938.1: duration expired) parameters={"level":0.55,"notoriety":false} links={} ticks=1
- p23-dangerous-secret [person] (ended 1940.1: duration expired) parameters={"exposure":58,"leverage":0,"bodies":1,"loyalty":27} links={} ticks=2
- ad20-private-bargain [person] (ended 1939.1: duration expired) parameters={"leverage":70,"trust":45,"debt":57,"exit":17} links={"beneficiary":"Ferdinand Moser"} ticks=3
- public-scandal [person] (ended 1938.7: replaced_by:public-scandal) parameters={} links={} ticks=0
- p22-wild-fortune [person] (ended 1940.1: duration expired) parameters={"height":34,"absurdity":88,"witnesses":85,"fragility":62} links={} ticks=2
- p22-scandal-engine [person] (ended 1940.1: duration expired) parameters={"heat":68,"reach":68,"leverage":30,"shame":60} links={} ticks=2
- pl19-protected-scandal [person] (ended 1943.1: the public heat outran the protection) parameters={"exposure":85,"protection":10,"leverage":54,"publicHeat":95} links={"protector":"Katharina Bauer 3"} ticks=4
- public-scandal [person] (ended 1940.1: replaced_by:public-scandal) parameters={} links={} ticks=0
- under-investigation [person] (ended 1942.1: duration expired) parameters={"progress":50,"charge":"盗窃"} links={} ticks=2
- public-scandal [person] (ended 1940.12: replaced_by:public-scandal) parameters={} links={} ticks=0
- p22-scandal-engine [person] (ended 1943.1: duration expired) parameters={"heat":70,"reach":61,"leverage":33,"shame":70} links={} ticks=2
- p22-wild-fortune [person] (ended 1943.1: duration expired) parameters={"height":34,"absurdity":55,"witnesses":60,"fragility":42} links={} ticks=2
- public-scandal [person] (ended 1942.1: 公开嘲笑自己的丑闻，丑闻不再能伤到这个人) parameters={} links={} ticks=0
- debt-bondage [person] (ended 1943.1: duration expired) parameters={"debt":22,"creditor":"银行"} links={} ticks=3
- known-affair [person] (ended 1943.1: replaced_by:public-scandal) parameters={"notoriety":30,"grief":0,"exposure":80,"discretion":10,"remarried":false,"origin":"exposed"} links={} ticks=0
- public-scandal [person] (ended 1943.1: replaced_by:known-affair) parameters={} links={} ticks=0
- p22-scandal-engine [person] (ended 1945.1: duration expired) parameters={"heat":55,"reach":41,"leverage":48,"shame":65} links={} ticks=2
- known-affair [person] (ended 1946.1: duration expired) parameters={"notoriety":46,"grief":0,"exposure":85,"discretion":10,"remarried":false,"origin":"exposed"} links={} ticks=3
- sm18-missing-object [person] (ended 1948.1: duration expired) parameters={"attachment":50,"leads":24,"suspicion":79,"object":"邻居家的银顶针"} links={} ticks=4
- ad20-public-attention [person] (ended 1948.1: duration expired) parameters={"attention":22,"sympathy":37,"danger":18,"opportunity":48} links={} ticks=5
- ad20-public-attention [person] (ended 1948.1: duration expired) parameters={"attention":65,"sympathy":30,"danger":35,"opportunity":15} links={} ticks=1
- oj18-odd-apprenticeship [person] (ended 1949.1: owner_died) parameters={"trust":35,"strangeKnowledge":35,"reliability":55,"nightsWorked":24,"post":"入殓学徒"} links={} ticks=1

### 194 subject events

- **1926.02** `p9-social-tenement-neighbors.stove-and-line/stove-and-line.first-come-order` tags: housing, neighbors, tenement, daily, money, reputation
  Josef Stein把四只洗衣盆按到厨房的先后排成一列，用粉笔在门后写下各家的时辰：六点到七点半、七点半到九点。Ferdinand Bauer起初嘟囔，看到自家名字排在第二格，也就把水壶提了回去。晾衣绳按同样次序分两段，谁家的床单先上谁先占。
  _effects: mood 0.04; relation acquaintance with person-materialized-world-vienna-1912-31; relation acquaintance with person-materialized-world-vienna-1912-31_

- **1926.05** `major-crisis.rent-increase/tenant-meeting` tags: crisis, housing, rent, eviction, family, poverty
  巷口洗衣房的老板娘把几张椅子摆开，叫来半条街的租户。Josef Stein把涨租单摊在桌上，逐条念出上面的数字；Anna Stein 2站在门边，既没走，也没替房东说话。大家决定先集体迟交一个月，签名纸传到Josef Stein手里时，纸上已经有一块油渍。
  _effects: cash -2 (paper, ink and tram fare for the tenants meeting); role; flag +rent_strike; relation acquaintance with person-materialized-world-vienna-1912-43; reputation 0.03; relation acquaintance with person-materialized-world-vienna-1912-43_

- **1926.12** `p9-history-medical-daily.suspicious-death/accept-doctor-story` tags: health, medical, public_health, family, pharmacy, sanitation, daily, injury
  楼里的女人都来劝Friedrich Hofer，说人死不能复生。Josef Stein把药包从桌角拿起来，纸包上没写字，只有药房火漆印；炉门一开，火苗舔着纸角，Josef Stein把炉门关上。
  _effects: cash -1.2 (帮死者家属凑葬礼钱); relation acquaintance with person-friedrich-hofer; health -0.010000000000000009 (吸入烧药纸包的烟); relation acquaintance with person-materialized-world-vienna-1912-58; relation acquaintance with person-materialized-world-vienna-1912-28_

- **1927.01** `vienna-family-divorce/reconcile-for-now` tags: family, marriage, divorce, housing, lifecycle
  Josef Stein和Franz Stein在楼道里吵到半夜，最后因为下个月的房租又坐回同一张桌。谁都没有提和好，只把账本重新摊开；Franz Stein把煤钱推过来，Josef Stein接过去数了两遍，手指碰到一起又分开，屋里的灯亮到很晚。
  _effects: mood -0.03_

- **1927.05** `vienna-legacy-worklife.sick-fund/sick-fund.keep-quiet` tags: legacy, work, family, reform, ordinary_life
  工友咳的时候用手背挡着嘴，指节发红。Josef Stein说“先别填”，声音压得很低。旁边有人听见了，没说什么，只把自己那份互助金登记簿往桌里推了推。
  _effects: mood -0.05_

- **1927.10** `r2-leisure.picnic-rain::ctx-vienna-reform-1930::milieu-tenement/saved-the-picnic` tags: leisure, picnic, rain, etiquette, comedy, reform, medical, schooling
  Josef Stein把毯子四角一提，兜住剩下的三明治和杯子，往亭子下面跑。Anna Stein 2举着伞追，伞面被风翻过去两次。Hermann Winter在隔壁毯子上喊，说维也纳人野餐要看云，不看日历。雨点砸在铁皮亭顶上，像有人撒了一把豆子。
  _effects: mood 0.04; flag +saved_picnic_from_rain; skill; relation friend with person-materialized-world-vienna-1912-43; relation acquaintance with person-materialized-world-vienna-1912-17; relation acquaintance with person-materialized-world-vienna-1912-17_

- **1928.01** `vienna-family-courtship/ask-to-share-a-home` tags: family, courtship, household, social, lifecycle
  Josef Stein在Leopoldstädter Zinshaus, gemeinsamer Gang靠窗的桌边，把一只空咖啡杯转了半圈，说房租两人合付、桌子两人共用。Maria Hofer的手停在糖罐盖上，问了一句“要是过不下去呢”，没有当场答应，只说要想一想；杯里的咖啡凉了，话还悬在桌面上。
  _effects: interaction; relation acquaintance with person-materialized-world-vienna-1912-63_

- **1928.02** `vienna-social-movement.recruitment/read-and-decline` tags: development, social_movement, organization, politics
  Josef Stein把传单读了两遍，记下上面的地址，却没有去。第二天照常上工；午休时听见两个工友低声谈论同一场集会。
  _effects: mood -0.010000000000000002_

- **1928.08** `vienna-parish-aid.sick-call/sick-call.help-in` tags: faith, parish, mutual_aid, poverty, family, injury
  Josef Stein和Mitzi Lechner一起上楼，门没锁，屋里一股酸味。病人裹着毯子坐在床沿咳嗽，炉子只剩灰。Josef Stein去楼下讨了几块煤核，蹲着把火生起来，又用带来的面粉搅了一小锅稀粥。药粉冲开，碗底沉着白渣，Josef Stein先垫了药钱，说以后再说。
  _effects: food; cash -0.6 (替病人垫上药粉钱); health -0.020000000000000018 (在病人屋里待久了，嗓子发干); relation acquaintance with person-mitzi-lechner; flag +parish_sick_visitor_

- **1929.01** `interaction_response` tags: interaction, partnership, household
  Maria Hofer在几天后找到Josef Stein，说可以试试。两人开始合付房租，也把各自欠的账摊在桌上。
  _effects: relation partner with person-materialized-world-vienna-1912-63; household; role; role; interaction_
  _causes: evt:world-vienna-1912:002612_

- **1929.01** `p23-revenge-marriage::ctx-vienna-reform-1930::milieu-hospital/the-groom-writes-another-name` tags: love, revenge, marriage, family_enemy, debt, warmth, high_drama, reform
  Maria Hofer在签名栏停住，笔尖落下的不是自己的名字。Josef Berg抬头看了一眼，又低下头；Josef Stein把婚书转过来，看见那三个字排得很整齐，像早就练过。Maria Hofer说对不起，Josef Stein却笑了，说这倒省得我装。窗外的乐队还在奏一支旧华尔兹。
  _effects: state_add public-scandal state:world-vienna-1912:202; state_add known-affair state:world-vienna-1912:203; relation partner with person-materialized-world-vienna-1912-63; relation rival with person-materialized-world-vienna-1912-37; mood -0.05; flag +wrong_name_on_certificate; relation acquaintance with person-materialized-world-vienna-1912-37; relation acquaintance with person-materialized-world-vienna-1912-24; flag +known_affair_active_

- **1929.01** `p22-love-letter-serial::ctx-vienna-reform-1930::milieu-hospital/the-city-reads-between-the-lines` tags: love_letter, newspaper, serial, romance, scandal, fame, secrecy, editor
  一封没有署名的情书被报社买下，连载了整整一个月。全城都在猜收信人是谁；Josef Stein每天买两份报纸，一份剪下来，一份留着不拆。Maria Hofer在第七期之后走进编辑部，说再写下去，家里就要先读到结局了。报纸销量涨了三倍，两个人却开始从后门进出。
  _effects: state_add p22-wild-fortune state:world-vienna-1912:204; state_add fame state:world-vienna-1912:205; cash 5 (the newspaper paid for the letters); reputation 0.05; relation partner with person-materialized-world-vienna-1912-63; relation acquaintance with person-friedrich-hofer; flag +love_letter_serial; mood 0.04; flag +wild_fortune_active_

- **1929.01** `state_reaction:fame/scandal` tags: fame, reputation, media, status, state, state_reaction, love_letter, newspaper
  Josef Stein的名字出现在报纸上，但这次不是在文化版。街角的报童把那一版折到最上面。
  _effects: reputation -0.08; state_parameter fame.notoriety false -> true_
  _causes: evt:world-vienna-1912:002939_

- **1930.01** `p23-national-hero::ctx-vienna-reform-1930::milieu-tenement/the-real-hero-returns` tags: politics, media, fame, impostor, hero, war, high_drama, reform
  真正的守边人从战俘营回来时，报纸正在印Josef Stein的第二次专访。那人缺了两根手指，站在报社门口，说自己只守了一天半。Josef Berg把Josef Stein叫进办公室，桌上的奖章还没有收进盒子；窗外，记者们已经围住了那个缺手指的人。
  _effects: state_add public-scandal state:world-vienna-1912:248; state_add under-investigation state:world-vienna-1912:249; reputation -0.06; state_add fame state:world-vienna-1912:250; mood -0.06; flag +real_hero_returned; relation acquaintance with person-materialized-world-vienna-1912-10; flag -known_affair_active_

- **1930.01** `p22-apology-confession::ctx-vienna-reform-1930::milieu-tenement/the-correction-runs-on-page-one` tags: apology, confession, newspaper, dark, reversal, scandal, under_investigation, blacklist
  Josef Stein在报纸上登了道歉，承认自己在一场纠纷里说了重话。见报的版本却多出一句“我也承认那笔钱是我拿的”；Josef Stein拿着原稿冲到编辑部，Mitzi Hofer说排版时不小心串了行。Anna Stein 2在门口听见这句话，转身就走；Mitzi Weiss却把报纸折好，放进了口袋。
  _effects: state_remove public-scandal state:world-vienna-1912:248; cash 2 (the newspaper paid for the correction); reputation 0.05; relation acquaintance with person-materialized-world-vienna-1912-43; relation rival with person-materialized-world-vienna-1912-58; relation acquaintance with person-materialized-world-vienna-1912-52; flag +correction_page_one; mood 0.03; relation acquaintance with person-materialized-world-vienna-1912-52_

- **1930.01** `state_reaction:fame/scandal` tags: fame, reputation, media, status, state, state_reaction, apology, confession
  Josef Stein的名字出现在报纸上，但这次不是在文化版。街角的报童把那一版折到最上面。
  _effects: reputation -0.08; state_parameter fame.notoriety true -> true_
  _causes: evt:world-vienna-1912:003281_

- **1930.01** `state_tick:p22-wild-fortune/the-story-gets-taller/a-witness-asks-for-proof` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  一个见证人要求Josef Stein拿出证据。Josef Stein翻遍抽屉，只找到一张被水浸过的收据；那天晚上，街上的故事换了主角，Josef Stein的名字被挪到了最后一行。
  _effects: state_parameter p22-wild-fortune.height 50 -> 44; state_parameter p22-wild-fortune.witnesses 80 -> 75; state_parameter p22-wild-fortune.fragility 45 -> 52; mood -0.03_

- **1930.06** `vienna-housing-move.rent-notice/rent-notice-demand-repair` tags: housing, home, rent, family, money
  Josef Stein没有立刻答话，先去敲Berta Weiss 3的门。两人一起数落墙上的水渍和门框里灌进来的风，楼梯间的窗户修好了，自家墙皮还在剥落。Berta Weiss 3提议一起把话带给看门人：先修好漏水的墙角，涨租的事再谈。Josef Stein把纸重新折好，请他把话带到门外。
  _effects: mood 0.03; flag +rent_dispute_

- **1930.08** `vienna-legacy-worklife.union-office/union-office.enroll-first` tags: legacy, work, family, reform, ordinary_life
  一克朗硬币在桌上排开。Josef Stein数了两遍，才在名册上写“已缴”。窗外有人探头问这里是不是工会，接待的人这次知道怎么开口了，把门拉开一半。
  _effects: cash 1 (新会员的入会费先记在桌上); relation acquaintance with person-hermann-kral; skill_

- **1930.10** `p10-work-career.wage-shortfall/p10-work-career.wage-shortfall.refuse` tags: adulthood, work, career, wages, injury, pension, employment, deduction
  Josef Stein把工资袋推回柜台，说不讲清楚就不收。第二天他被调去洗料间，工钱按日算，水汽熏得眼睛发红。Berta Weiss 2路过门口看了一眼，没敢多站。
  _effects: employment 洗料间日工 @ org-allgemeines-krankenhaus; health -0.030000000000000027 (洗料间水汽和碱水刺激); condition_

- **1931.01** `pl19-bridge.first-ally::ctx-vienna-reform-1930::milieu-tenement/the-ally-speaks-first` tags: fame, ally, public, politics, scandal, media, bridge, reform
  集会开始前，Josef Stein的助手们还在争论谁该先上台。Josef Berg把外套脱下来搭在椅背上，说“我先去”，然后走到麦克风前，把Josef Stein这些年替选区做的事讲了三件。台下有人开始鼓掌；Josef Stein站在侧幕后面，第一次觉得丑闻不一定只能一个人扛。
  _effects: state_add pl19-public-ally state:world-vienna-1912:280; relation friend with person-materialized-world-vienna-1912-24; reputation 0.020000000000000004; flag +first_public_ally; knowledge “盟友在集会上先上台，讲了三件选区旧事。”; flag +public_ally_active_

- **1931.01** `state_reaction:pl19-public-ally/a-scandal-splashes` tags: pl19-public-ally, love, politics, alliance, public, power, liability, public_ally
  另一桩丑闻在报纸上炸开时，Josef Stein的名字被顺带写进了同一段。盟友在电话里沉默了很久，最后只问：“这次需要我站在哪一边？”
  _effects: state_parameter pl19-public-ally.cost 15 -> 25; state_parameter pl19-public-ally.loyalty 70 -> 65; state_parameter pl19-public-ally.visibility 55 -> 59_
  _causes: evt:world-vienna-1912:003705_

- **1931.01** `state_tick:under-investigation/case-progress/evidence` tags: under-investigation, legal, police, investigation, risk, state, state_tick
  调查员又来找Josef Stein谈了一次。问话比上次具体，记录也比上次长。
  _effects: state_parameter under-investigation.progress 30 -> 45; mood -0.039999999999999994_

- **1931.06** `vienna-tenement-neighbors.sick_child_doorstep/refuses_grudge` tags: home, social, family, housing
  Anton Stein敲门想借半块煤给发烧的孩子烧热水，Josef Stein那天刚和Anton Stein为走廊堆东西吵过嘴，没开门，隔着门板说自家也不够用。后半夜听见Anton Stein抱着孩子下楼去敲药房的门。第二天在走廊碰见，Anton Stein低头绕过去，手里的铜壶碰在栏杆上，响了一声。
  _effects: relation rival with person-materialized-world-vienna-1912-72; mood -0.05000000000000002_

- **1931.08** `vienna-medical-treatment.sanatorium/home-rest` tags: health, medical, family, money
  炉子封小了，屋里凉得快，Josef Stein把大衣盖在被子上。安娜收碗时看见窗台上一排药瓶，没说什么，第二天多带了半块黑面包。楼下的管道工敲了一下午铁皮，咳嗽声混在里面听不真切。
  _effects: health 0.030000000000000027 (在家休养但条件有限); food; cash -0.5 (房东要求的清洁费); relation friend with person-materialized-world-vienna-1912-72; relation acquaintance with person-materialized-world-vienna-1912-72_

- **1931.10** `p9-history-medical-daily.sanitation-inspection/sign-and-demand-repair` tags: health, medical, public_health, family, pharmacy, sanitation, daily
  签字时Josef Stein把笔握得很紧，在“住户意见”一栏写了“下水道堵塞，垃圾箱无盖”。Josef Berg念了一遍，说会转给房东；Anton Stein凑过来看，问要不要按手印。
  _effects: reputation 0.04; relation acquaintance with person-materialized-world-vienna-1912-72; knowledge “卫生巡查员把下水道堵塞记进了记录，说会通知房东限期修”_

- **1931.11** `statistical_infection`
  Josef Stein在Haus der Tante in Klosterneuburg病倒了，肺炎让身体发热、虚弱，接下来的日子只能卧床。

- **1931.11** `df18-luck.borrowed-at-the-card-table::ctx-klosterneuburg-rural-1912::milieu-tenement/leave-the-table` tags: luck, debt, bargain, gambling, obligation, night, supernatural, rural
  Josef Stein把牌一推，说今晚不借也不玩。Gustav Winter耸耸肩，把桌上的钱收回口袋。Josef Stein走到街上，口袋里的硬币只够买一杯咖啡；但经过当铺时，Josef Stein没有停。第二天上工，Josef Stein的手指还在发痒，像少做了一件本该做的事。
  _effects: cash -1 (一杯咖啡); flag +df18_refused_card_money; mood 0.020000000000000004; knowledge “我拒绝了牌桌上的钱，但手指还记得那种感觉。”; relation acquaintance with person-materialized-world-vienna-1912-5_

- **1931.12** `statistical_illness_worsened`
  Josef Stein的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1932.01** `state_expire:p22-wild-fortune` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  Josef Stein的「荒唐横财」到期；相关安排结束。
  _effects: state_remove p22-wild-fortune state:world-vienna-1912:204; flag -wild_fortune_active_

- **1932.01** `state_expire:under-investigation` tags: under-investigation, legal, police, investigation, risk, state, state_tick, state:under-investigation
  Josef Stein的「被调查」到期；相关安排结束。
  _effects: state_remove under-investigation state:world-vienna-1912:249_

- **1932.01** `state_expire:fame` tags: fame, reputation, media, status, state, state_tick, state:fame
  Josef Stein的「公众名声」到期；相关安排结束。
  _effects: state_remove fame state:world-vienna-1912:250_

- **1932.01** `state_tick:pl19-public-ally/the-joint-appearance/a-question-too-far` tags: pl19-public-ally, love, politics, alliance, public, power, liability, public_ally
  有人问盟友，晚上回家时会不会替Josef Stein数钱。盟友笑着挡了回去，Josef Stein却看见对方之后整场都没有再碰话筒；回程的马车上，两个人第一次为一句没有说完的话争吵。
  _effects: state_parameter pl19-public-ally.cost 25 -> 33; state_parameter pl19-public-ally.loyalty 65 -> 60; reputation -0.019999999999999997_

- **1932.03** `statistical_illness_worsened`
  Josef Stein的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1932.03** `vienna-church-community.tenement-prayer/rent-prayer-help` tags: faith, social, family, home
  楼梯间只点一根蜡烛。Karl Kraus凑过来低声说，楼下老寡妇的喘病又重了，教区明早才能派修女来。Josef Stein把汤碗接过去，碗底还温着。
  _effects: condition; food_

- **1932.04** `statistical_recovery`
  Josef Stein从肺炎中慢慢恢复，能下床喝水，但身体还虚弱。

- **1932.09** `ld18-wedding.objection::ctx-vienna-reform-1930::milieu-tenement/the-bride-says-no` tags: love, wedding, marriage, queer, scandal, choice, secret_intimacy, reform
  婚期定在星期日上午，教堂里坐满了人。Grete Hofer问到Josef Stein是否愿意时，Josef Stein看见Luise Huber站在最后一排，手里攥着一只手套。Josef Stein说“不愿意”，声音不大，但前排的人全听见了；Hermann Kral 2把戒指放回托盘，转身先走了出去。
  _effects: state_add ld18-impossible-attachment state:world-vienna-1912:361; state_add public-scandal state:world-vienna-1912:362; reputation -0.1; cash -2 (the cancelled feast and the deposit); flag +refused_at_the_altar; relation acquaintance with person-materialized-world-vienna-1912-81; relation acquaintance with person-materialized-world-vienna-1912-59; flag +impossible_attachment_active_

- **1932.09** `state_reaction:pl19-public-ally/a-scandal-splashes` tags: pl19-public-ally, love, politics, alliance, public, power, liability, public_ally
  另一桩丑闻在报纸上炸开时，Josef Stein的名字被顺带写进了同一段。盟友在电话里沉默了很久，最后只问：“这次需要我站在哪一边？”
  _effects: state_parameter pl19-public-ally.cost 33 -> 43; state_parameter pl19-public-ally.loyalty 60 -> 55; state_parameter pl19-public-ally.visibility 59 -> 63_
  _causes: evt:world-vienna-1912:004604_

- **1932.09** `state_reaction:ld18-impossible-attachment/a-family-wedding` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  亲戚的婚礼上，Josef Stein被安排和伴侣分开坐。司仪问有没有人反对，Josef Stein低头喝汤；伴侣在另一桌替别人倒酒，手很稳，酒没有洒出来。散席时，两个人在衣帽间碰见，只说了一句“外面下雨”。
  _effects: state_parameter ld18-impossible-attachment.pressure 55 -> 65; state_parameter ld18-impossible-attachment.grief 5 -> 9; mood -0.020000000000000004_
  _causes: evt:world-vienna-1912:004604_

- **1932.09** `state_reaction:ld18-impossible-attachment/a-question-at-the-office` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  办公室有人问Josef Stein，为什么总有一个女人在楼下等她。Josef Stein说那是表妹；对方笑了一下，说现在的表妹真体贴。下午，Josef Stein把桌上的相框扣倒，又在没人时翻回来，用袖子擦了擦玻璃上的灰。
  _effects: state_parameter ld18-impossible-attachment.pressure 65 -> 73; state_parameter ld18-impossible-attachment.discretion 25 -> 21; reputation -0.01999999999999999_
  _causes: evt:world-vienna-1912:004604_

- **1932.10** `vienna-housing-move.moving-day/moving-day-handcart` tags: housing, home, rent, family, money
  手推车每走十几步就要停一下，楼道里的门半开着，有人探头看热闹。Josef Stein把照片铁盒交给Luise Huber抱着，自己低头把最后一箱锅具拖上楼。天擦黑时，新屋里才勉强归置出下脚的地方。
  _effects: cash -1 (借手推车买烟熨谢邻居的小开销); relation acquaintance with person-materialized-world-vienna-1912-68; relation acquaintance with person-materialized-world-vienna-1912-68_

- **1932.11** `vienna-market-household.friday-fish/friday-fish.salt` tags: home, market, food, social
  腌鲱鱼切成两段，一段今天吃，一段留着。黑面包硬得要用刀锯。Hermann Bauer来借盐，眼睛落在鱼上，说可以用半棵卷心菜换一块。Josef Stein切了一指宽递过去。
  _effects: cash -2 (腌鲱鱼和黑面包); food; relation acquaintance with person-materialized-world-vienna-1912-7; relation acquaintance with person-materialized-world-vienna-1912-7_

- **1933.01** `state_tick:pl19-public-ally/the-joint-appearance/a-question-too-far` tags: pl19-public-ally, love, politics, alliance, public, power, liability, public_ally
  有人问盟友，晚上回家时会不会替Josef Stein数钱。盟友笑着挡了回去，Josef Stein却看见对方之后整场都没有再碰话筒；回程的马车上，两个人第一次为一句没有说完的话争吵。
  _effects: state_parameter pl19-public-ally.cost 43 -> 51; state_parameter pl19-public-ally.loyalty 55 -> 50; reputation -0.01999999999999999_

- **1933.01** `state_tick:ld18-impossible-attachment/invented-anniversary/a-form-with-an-empty-line` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  户籍窗口换了一张新表格，配偶一栏不能空着。Josef Stein最后写了“同住人”，办事员抬头看了一眼，说这不作数。回家后，Josef Stein把表格折成很小的一块，塞进针线盒；伴侣问今天顺不顺利，Josef Stein说和平时一样。
  _effects: state_parameter ld18-impossible-attachment.pressure 73 -> 79; state_parameter ld18-impossible-attachment.discretion 21 -> 18; mood -0.01999999999999999_

- **1933.02** `state_reaction:public-scandal/gossip` tags: public-scandal, scandal, reputation, social, state, state_reaction, home, family
  Josef Stein走进咖啡馆时，邻桌的声音低了一拍。没有人当面说什么，但每个人都知道该说什么。
  _effects: mood -0.030000000000000027; reputation -0.03_
  _causes: evt:world-vienna-1912:005115_

- **1933.08** `vienna-tenement-neighbors.laundry_line_dispute/subject_yields_line` tags: home, social, family, housing
  Josef Stein看Karl Kraus盆里那几件小衬衫，把自家床单卷起来抱回屋，说等下午再晾。Karl Kraus愣了一下，闷头把衣服挂好，收工回来时在Josef Stein门口放了一小包用旧报纸裹的洗衣碱。Josef Stein打开报纸，碱面里还掺着几粒粗盐。
  _effects: relation friend with person-karl-kraus; food_

- **1933.11** `pl19-bridge.public-rumor::ctx-vienna-authoritarian-1934::milieu-tenement/a-room-with-a-list` tags: scandal, protection, network, press, media, rumor, bridge, vienna
  一位官员在散场后拦住Josef Stein，说可以借一间会议室，每周二晚上用，条件是名单由他过目。Josef Stein看见他手里还攥着当天的报纸，头版折得很整齐；那间会议室后来真的开了灯，只是门口多了一把没人坐的椅子。
  _effects: state_add pl19-protected-scandal state:world-vienna-1912:414; relation friend with person-otto-winter; flag +official_room; knowledge “会议室每周二晚上开灯，名单要先给一位官员过目。”; flag +protected_scandal_active_

- **1933.11** `state_reaction:pl19-public-ally/a-scandal-splashes` tags: pl19-public-ally, love, politics, alliance, public, power, liability, public_ally
  另一桩丑闻在报纸上炸开时，Josef Stein的名字被顺带写进了同一段。盟友在电话里沉默了很久，最后只问：“这次需要我站在哪一边？”
  _effects: state_parameter pl19-public-ally.cost 51 -> 61; state_parameter pl19-public-ally.loyalty 50 -> 45; state_parameter pl19-public-ally.visibility 63 -> 67_
  _causes: evt:world-vienna-1912:005082_

- **1933.11** `state_reaction:ld18-impossible-attachment/a-question-at-the-office` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  办公室有人问Josef Stein，为什么总有一个女人在楼下等她。Josef Stein说那是表妹；对方笑了一下，说现在的表妹真体贴。下午，Josef Stein把桌上的相框扣倒，又在没人时翻回来，用袖子擦了擦玻璃上的灰。
  _effects: state_parameter ld18-impossible-attachment.pressure 79 -> 87; state_parameter ld18-impossible-attachment.discretion 18 -> 14; reputation -0.01999999999999999_
  _causes: evt:world-vienna-1912:005082_

- **1933.11** `state_reaction:pl19-protected-scandal/a-public-question` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  有人在一场公开活动里问起Josef Stein的“私人安排”，语气客气，问题却像一根针。Josef Stein笑着答了别的事，回家后才发现手心全是汗。
  _effects: state_parameter pl19-protected-scandal.publicHeat 40 -> 52; state_parameter pl19-protected-scandal.protection 65 -> 59; reputation -0.03_
  _causes: evt:world-vienna-1912:005082_

- **1934.01** `hist15-purge.seed::ctx-vienna-authoritarian-1934::milieu-tenement/the-file-stays-closed` tags: purge, repression, organization, surveillance, history, work, vienna, urban
  人事科的门开了又关，Josef Stein的档案被放在最下面。没有人解释为什么，只有Berta Weiss 2把一叠旧表格推过来，说“先把这个月做完”。窗外的口号声一阵高一阵低，处里的打字机一直没有停。
  _effects: state_add institution-purge state:world-vienna-1912:413; mood -0.01999999999999999; knowledge “审查名单还没有公开，但人事科已经把所有档案重新排过。”_

- **1934.01** `hist15-purge.loyalty-questionnaire::ctx-vienna-authoritarian-1934::milieu-hospital/refuse-the-list` tags: purge, repression, loyalty, denunciation, organization, history, vienna, urban
  Josef Stein把名单推回去，说记不清。Anton Bauer 2没有发火，只在Josef Stein的档案上添了一行。走廊里的人都低着头，没有人问谈话持续了多久。
  _effects: flag +refused_loyalty_questionnaire; mood -0.04999999999999999; state_parameter institution-purge.intensity 0.35 -> 0.37; knowledge “拒绝在名单上签字会被记入档案。”; relation acquaintance with person-materialized-world-vienna-1912-79_

- **1934.01** `state_tick:pl19-public-ally/the-joint-appearance/the-crowd-warms` tags: pl19-public-ally, love, politics, alliance, public, power, liability, public_ally
  两个人一起出现在集市口。Josef Stein讲预算，盟友讲谁家的屋顶漏了；散场时，一个卖苹果的老妇人塞给盟友一只苹果，说“你比报纸上看着像人”。Josef Stein把这句话记了很久。
  _effects: state_parameter pl19-public-ally.loyalty 45 -> 49; state_parameter pl19-public-ally.visibility 67 -> 70; state_parameter pl19-public-ally.cost 61 -> 59; mood 0.01999999999999999_

- **1934.01** `state_tick:ld18-impossible-attachment/invented-anniversary/a-form-with-an-empty-line` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  户籍窗口换了一张新表格，配偶一栏不能空着。Josef Stein最后写了“同住人”，办事员抬头看了一眼，说这不作数。回家后，Josef Stein把表格折成很小的一块，塞进针线盒；伴侣问今天顺不顺利，Josef Stein说和平时一样。
  _effects: state_parameter ld18-impossible-attachment.pressure 87 -> 93; state_parameter ld18-impossible-attachment.discretion 14 -> 11; mood -0.01999999999999999_

- **1934.01** `state_tick:pl19-protected-scandal/the-network-meets/someone-wants-a-favor` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  有人替Josef Stein挡了一次采访，随后在走廊里提起自己儿子的学徒期满。Josef Stein知道这不是闲聊；当天晚上，那张写着名字的纸条被压在糖罐下面，像一枚没有付清的硬币。
  _effects: state_parameter pl19-protected-scandal.leverage 35 -> 47; state_parameter pl19-protected-scandal.protection 59 -> 55; state_parameter pl19-protected-scandal.exposure 45 -> 50; mood -0.020000000000000018_

- **1934.01** `p9-social-tenement-neighbors.stairwell-rumor/stairwell-rumor.repeat-at-bakery` tags: housing, neighbors, tenement, daily, money, reputation
  Josef Stein在面包店排队时把听来的话又讲了一遍，添了“夜里常有男人上楼”一句。到傍晚，整栋楼都在说二楼女房客的事，连看门人都在门口站着看。二楼的门一直关着，Josef Stein回家时才觉得那句话说得太响。
  _effects: reputation -0.06_

- **1934.07** `kernel-health.street-violence::ctx-vienna-authoritarian-1934::milieu-tenement/street-violence-kills` tags: health, violence, street, injury, death, vienna, urban, crisis
  Josef Stein从地上摸到半块砖。砖拍在Maria Stein的太阳穴上，人倒下去时后脑磕到石沿，抽搐了两下就不动了。Josef Huber把Josef Stein拉进院子，说今晚别回家。院子里的煤棚门没关，风把血味吹进楼道。他把手上的血在裤子上擦了两下。
  _effects: condition; death (head injury after being struck with a brick); role; flag +killed_in_street_fight; relation acquaintance with person-materialized-world-vienna-1912-13; knowledge “砖头打在太阳穴上，人倒下时后脑磕到石沿；邻居让今晚别回家。”; relation acquaintance with person-materialized-world-vienna-1912-13_

- **1934.10** `state_reaction:public-scandal/gossip` tags: public-scandal, scandal, reputation, social, state, state_reaction, courtship, friendship
  Josef Stein走进咖啡馆时，邻桌的声音低了一拍。没有人当面说什么，但每个人都知道该说什么。
  _effects: mood -0.030000000000000027; reputation -0.02999999999999997_
  _causes: evt:world-vienna-1912:005614_

- **1934.12** `vienna-legacy-worklife.union-office/union-office.post-ledger` tags: legacy, work, family, reform, ordinary_life
  窗外是维也纳第十五区的一条窄街，卖烤栗子的炉子冒着白烟。Josef Stein贴完纸退后两步看，发现“欠”字被浆糊洇开了一点。老成员没说话，只把眼镜摘下来擦了又擦。
  _effects: reputation 0.04999999999999999; flag +union_ledger_public; relation acquaintance with person-materialized-world-vienna-1912-86_

- **1935.01** `state_reaction:ld18-impossible-attachment/a-question-at-the-office` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  办公室有人问Josef Stein，为什么总有一个女人在楼下等她。Josef Stein说那是表妹；对方笑了一下，说现在的表妹真体贴。下午，Josef Stein把桌上的相框扣倒，又在没人时翻回来，用袖子擦了擦玻璃上的灰。
  _effects: state_parameter ld18-impossible-attachment.pressure 93 -> 100; state_parameter ld18-impossible-attachment.discretion 11 -> 7; reputation -0.020000000000000018_
  _causes: evt:world-vienna-1912:005487_

- **1935.01** `state_reaction:ld18-impossible-attachment/a-family-wedding` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  亲戚的婚礼上，Josef Stein被安排和伴侣分开坐。司仪问有没有人反对，Josef Stein低头喝汤；伴侣在另一桌替别人倒酒，手很稳，酒没有洒出来。散席时，两个人在衣帽间碰见，只说了一句“外面下雨”。
  _effects: state_parameter ld18-impossible-attachment.pressure 100 -> 100; state_parameter ld18-impossible-attachment.grief 9 -> 13; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:005543_

- **1935.01** `ld18-raid.private-club::ctx-vienna-authoritarian-1934::milieu-tenement/the-back-door` tags: queer, raid, police, public, scandal, nightlife, secret_intimacy, vienna
  Mitzi Berg把后厨的门打开，让Josef Stein和Luise Huber从煤堆后面出去。巷子里下着雨，Luise Huber的高跟鞋陷进泥里，Josef Stein蹲下去替她拔出来。两个人一路跑到河边，才敢笑出声。
  _effects: relation friend with person-materialized-world-vienna-1912-68; state_parameter ld18-impossible-attachment.pressure 100 -> 100; mood 0.020000000000000018; flag +escaped_a_police_raid_

- **1935.01** `state_reaction:pl19-public-ally/a-scandal-splashes` tags: pl19-public-ally, love, politics, alliance, public, power, liability, public_ally
  另一桩丑闻在报纸上炸开时，Josef Stein的名字被顺带写进了同一段。盟友在电话里沉默了很久，最后只问：“这次需要我站在哪一边？”
  _effects: state_parameter pl19-public-ally.cost 59 -> 69; state_parameter pl19-public-ally.loyalty 49 -> 44; state_parameter pl19-public-ally.visibility 70 -> 74_
  _causes: evt:world-vienna-1912:005565_

- **1935.01** `state_tick:pl19-public-ally/the-joint-appearance/the-crowd-warms` tags: pl19-public-ally, love, politics, alliance, public, power, liability, public_ally
  两个人一起出现在集市口。Josef Stein讲预算，盟友讲谁家的屋顶漏了；散场时，一个卖苹果的老妇人塞给盟友一只苹果，说“你比报纸上看着像人”。Josef Stein把这句话记了很久。
  _effects: state_parameter pl19-public-ally.loyalty 44 -> 48; state_parameter pl19-public-ally.visibility 74 -> 77; state_parameter pl19-public-ally.cost 69 -> 67; mood 0.020000000000000018_

- **1935.01** `state_transition:ld18-impossible-attachment/papers-become-public` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  Josef Stein从「无法登记的伴侣」转入另一段处境：the pressure made the attachment publicly legible
  _effects: state_transition ld18-impossible-attachment -> known-affair; reputation -0.09999999999999998; flag +unregistered_attachment_exposed; flag -impossible_attachment_active; flag +known_affair_active_

- **1935.01** `state_expire:public-scandal` tags: public-scandal, scandal, reputation, social, state, state_tick, state:public-scandal
  Josef Stein的「公开丑闻」到期；相关安排结束。
  _effects: state_remove public-scandal state:world-vienna-1912:362_

- **1935.01** `state_tick:pl19-protected-scandal/the-network-meets/someone-wants-a-favor` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  有人替Josef Stein挡了一次采访，随后在走廊里提起自己儿子的学徒期满。Josef Stein知道这不是闲聊；当天晚上，那张写着名字的纸条被压在糖罐下面，像一枚没有付清的硬币。
  _effects: state_parameter pl19-protected-scandal.leverage 47 -> 59; state_parameter pl19-protected-scandal.protection 55 -> 51; state_parameter pl19-protected-scandal.exposure 50 -> 55; mood -0.020000000000000018_

- **1935.04** `vienna-family-fatherhood/child-born-at-home` tags: family, childbirth, death, lifecycle, birth, state, state:raising-child, raising-child
  Berta Stein 2在Villa Schnitzler, Sternwartestraße 71生下一个孩子，取名Elisabeth Stein。Josef Stein在厨房和走廊之间来回，接生的人让烧水、拿布、付六克朗；孩子天亮后睡着了，Josef Stein从此在户籍表上多了“父亲”一栏，手背上还留着烫水壶的红印。
  _effects: birth female; cash -6 (midwife fee); role; state_add raising-child state:world-vienna-1912:515_

- **1935.12** `vienna-housing-move.rent-notice/rent-notice-neighbors-together` tags: housing, home, rent, family, money
  Josef Stein把Ferdinand Moser和楼里另两户人家叫到楼道，把那张纸摆在窗台上传看。看门人在楼梯拐角听着，说房东礼拜三来收钱。几家人合计好，到那天一起等在门厅，先把克朗递过去，再把修补的事一件件摆出来。Josef Stein把纸折进围裙口袋，觉得人凑齐了话也硬气些。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-95; mood 0.03999999999999998; flag +tenant_collective_

- **1936.01** `p23-wedding-dress::ctx-vienna-authoritarian-1934::milieu-tenement/she-wears-it-to-another-wedding` tags: love, desire, obsession, stalker, wedding, fear, high_drama, vienna
  Josef Stein把裙子穿去了Berta Stein 2表妹的婚礼。席间有人问是谁裁的，Josef Stein说是旧货店；话没说完，Friedrich Hofer 2从邻桌站起来，说领口的针脚是自己缝的。音乐还在响，Berta Stein 2的叉子停在盘子上，整个大厅忽然安静得能听见冰化开的声音。
  _effects: state_add public-scandal state:world-vienna-1912:511; state_add known-affair state:world-vienna-1912:512; relation rival with person-materialized-world-vienna-1912-94; reputation -0.03999999999999998; mood -0.03999999999999998; flag +dress_worn; relation acquaintance with person-materialized-world-vienna-1912-94; flag -known_affair_active; flag +known_affair_active_

- **1936.01** `p22-love-letter-serial::ctx-vienna-authoritarian-1934::milieu-tenement/the-city-reads-between-the-lines` tags: love_letter, newspaper, serial, romance, scandal, fame, secrecy, editor
  一封没有署名的情书被报社买下，连载了整整一个月。全城都在猜收信人是谁；Josef Stein每天买两份报纸，一份剪下来，一份留着不拆。Berta Stein 2在第七期之后走进编辑部，说再写下去，家里就要先读到结局了。报纸销量涨了三倍，两个人却开始从后门进出。
  _effects: state_add p22-wild-fortune state:world-vienna-1912:513; state_add fame state:world-vienna-1912:514; cash 5 (the newspaper paid for the letters); reputation 0.04999999999999999; relation acquaintance with person-materialized-world-vienna-1912-86; mood 0.03999999999999998; relation acquaintance with person-materialized-world-vienna-1912-95; flag +wild_fortune_active_

- **1936.01** `state_expire:pl19-public-ally` tags: pl19-public-ally, love, politics, alliance, public, power, liability, public_ally
  Josef Stein的「站在聚光灯里的盟友」到期；相关安排结束。
  _effects: state_remove pl19-public-ally state:world-vienna-1912:280; flag -public_ally_active_

- **1936.01** `state_tick:pl19-protected-scandal/the-network-meets/someone-wants-a-favor` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  有人替Josef Stein挡了一次采访，随后在走廊里提起自己儿子的学徒期满。Josef Stein知道这不是闲聊；当天晚上，那张写着名字的纸条被压在糖罐下面，像一枚没有付清的硬币。
  _effects: state_parameter pl19-protected-scandal.leverage 59 -> 71; state_parameter pl19-protected-scandal.protection 51 -> 47; state_parameter pl19-protected-scandal.exposure 55 -> 60; mood -0.020000000000000018_

- **1936.03** `ad20-favor-called-in::ctx-vienna-authoritarian-1934::milieu-hospital/do-the-favor` tags: favor, obligation, everyday, trust, debt, risk, vienna, urban
  Ferdinand Moser说只需要Josef Stein在明天下午去一趟车站，把一个箱子交给穿灰外套的人。Josef Stein问箱子里是什么；Ferdinand Moser说“你不需要知道”。Josef Stein还是去了，因为当年Ferdinand Moser替Josef Stein垫过一笔医药费。
  _effects: state_add ad20-private-bargain state:world-vienna-1912:563; cash -1 (the trip to the station); relation acquaintance with person-materialized-world-vienna-1912-95; flag +favor_done; mood -0.010000000000000009; knowledge “箱子里是什么，邻居没有说。”; flag +private_bargain_active_

- **1936.06** `vienna-housing-move.sublet-room/sublet-declined` tags: housing, home, rent, family, money
  Josef Stein正要把空床许给Berta Stein 2，Ferdinand Moser却在楼梯上拦住了，说这条街上去年有人招了生人合住，失过钥匙，惹出些麻烦。Josef Stein回家把铺盖重新叠好，回绝了Berta Stein 2，只让他白天来喝口热水。空床仍空着，房租还是从自己的工钱里补。
  _effects: mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-95_

- **1937.01** `p23-lovers-ledger::ctx-vienna-authoritarian-1934::milieu-tenement/the-ledger-burns-first` tags: love, desire, betrayal, ledger, secret, blackmail, high_drama, vienna
  Berta Stein 2比Josef Stein早到一步。炉膛里只剩一截没烧透的蓝线，Josef Stein从灰里拈出来，认出那是账本装订用的线。Berta Stein 2说这样对大家都好；Josef Stein没有回答，只把灰烬扫进一只信封，收进抽屉最深处。炉子里的火还没有完全灭。
  _effects: state_add p23-dangerous-secret state:world-vienna-1912:561; knowledge “partner burned the ledger”; mood -0.02999999999999997; flag +ledger_burned_

- **1937.01** `state_reaction:known-affair/betrayal-in-public` tags: known-affair, love, scandal, secret, public, secret_intimacy, state, state_reaction
  背叛被讲出来以后，Josef Stein的名字又上了一轮饭桌。有人替Josef Stein不平，有人只想知道细节；Josef Stein把杯子洗干净，放回柜子，决定这周不去市场。
  _effects: state_parameter known-affair.notoriety 65 -> 80; state_parameter known-affair.grief 0 -> 10_
  _causes: evt:world-vienna-1912:006587_

- **1937.01** `state_reaction:p23-dangerous-secret/a-witness-talks` tags: p23-dangerous-secret, secret, danger, leverage, exposure, loyalty, crime, politics
  审讯室里的灯亮了一夜。第二天，Josef Stein在面包房门口听见有人低声复述自己的秘密，连停顿的位置都一模一样。
  _effects: state_parameter p23-dangerous-secret.exposure 20 -> 28; state_parameter p23-dangerous-secret.leverage 15 -> 11; state_parameter p23-dangerous-secret.loyalty 55 -> 49; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:006587_

- **1937.01** `pl19-scandal.wrong-lover::ctx-vienna-authoritarian-1934::milieu-tenement/let-the-error-stand` tags: scandal, press, mistaken_identity, fame, love, comic, vienna, urban
  报纸把Ferdinand Moser写成了Josef Stein的情人。Ferdinand Moser起初很生气，三天后却开始收到花和采访邀请；Josef Stein没有更正，因为更正会把Berta Stein 2的名字也带出来。Ferdinand Moser在街上遇见Josef Stein时，只说了一句“下次记得付我稿费”。
  _effects: state_add bc18-ridiculous-fame state:world-vienna-1912:562; state_parameter known-affair.notoriety 80 -> 85; relation acquaintance with person-materialized-world-vienna-1912-95; reputation 0.020000000000000018; knowledge “报纸把那个被认错的人写成了情人，真正的名字没有被印出来。”; flag +ridiculously_famous; reputation 0.020000000000000018; mood 0.020000000000000018_

- **1937.01** `state_reaction:pl19-protected-scandal/a-public-question` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  有人在一场公开活动里问起Josef Stein的“私人安排”，语气客气，问题却像一根针。Josef Stein笑着答了别的事，回家后才发现手心全是汗。
  _effects: state_parameter pl19-protected-scandal.publicHeat 52 -> 64; state_parameter pl19-protected-scandal.protection 47 -> 41; reputation -0.030000000000000027_
  _causes: evt:world-vienna-1912:006590_

- **1937.01** `state_reaction:ad20-private-bargain/a-betrayal-reprices-the-favour` tags: ad20-private-bargain, private, bargain, favor, debt, trust, leverage, exit
  背叛的消息传来时，Josef Stein先想到的不是损失，而是那笔私下的账。对方也知道Josef Stein会先想到这个。
  _effects: state_parameter ad20-private-bargain.leverage 50 -> 62; state_parameter ad20-private-bargain.trust 55 -> 45; state_parameter ad20-private-bargain.exit 20 -> 15; mood -0.03999999999999998_
  _causes: evt:world-vienna-1912:006644_

- **1937.01** `state_tick:pl19-protected-scandal/the-network-meets/a-member-sells-a-piece` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  照片没有登报，却出现在一封没有署名的信里。Josef Stein认出拍照的角度：只有站在后楼梯第二级的人才拍得到。第二天，那个位置换了一把新锁，钥匙却少了一把。
  _effects: state_parameter pl19-protected-scandal.exposure 60 -> 78; state_parameter pl19-protected-scandal.publicHeat 64 -> 74; state_parameter pl19-protected-scandal.protection 41 -> 31; reputation -0.03999999999999998; knowledge “后楼梯第二级是唯一能拍到那张照片的位置，而钥匙少了一把。”_

- **1937.01** `state_tick:known-affair/public-year/forgotten` tags: known-affair, love, scandal, secret, public, secret_intimacy, state, state_tick
  Josef Stein的名字从闲谈里慢慢退了下去。街上有了新的婚礼、新的葬礼和新的丑闻；只有裁缝还记得Josef Stein改过两次同一件外套的腰身。
  _effects: state_parameter known-affair.notoriety 85 -> 80; state_parameter known-affair.grief 10 -> 7; mood 0.020000000000000018_

- **1937.01** `state_tick:p22-wild-fortune/the-story-gets-taller/a-witness-asks-for-proof` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  一个见证人要求Josef Stein拿出证据。Josef Stein翻遍抽屉，只找到一张被水浸过的收据；那天晚上，街上的故事换了主角，Josef Stein的名字被挪到了最后一行。
  _effects: state_parameter p22-wild-fortune.height 50 -> 44; state_parameter p22-wild-fortune.witnesses 80 -> 75; state_parameter p22-wild-fortune.fragility 45 -> 52; mood -0.02999999999999997_

- **1937.01** `state_tick:ad20-private-bargain/the-favor-ages/called-in` tags: ad20-private-bargain, private, bargain, favor, debt, trust, leverage, exit
  对方在一个不合时宜的时刻提起旧事，语气很客气，意思却不客气。Josef Stein听见自己答应得太快，挂断以后才发现手心有一层薄汗。
  _effects: state_parameter ad20-private-bargain.leverage 62 -> 70; state_parameter ad20-private-bargain.debt 55 -> 59; state_parameter ad20-private-bargain.trust 45 -> 41; mood -0.030000000000000027_

- **1937.04** `vienna-church-community.tenement-prayer/rent-prayer-help` tags: faith, social, family, home
  Josef Stein跪在冰冷的亚麻油毡上念完三遍圣母经。Ferdinand Bauer端来一碗热汤，说楼下老太太咳了一整夜，问明天能不能替她捎药。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-31_

- **1937.07** `vienna-housing-move.rent-notice/rent-notice-neighbors-together` tags: housing, home, rent, family, money
  Josef Stein把Marie Huber和楼里另两户人家叫到楼道，把那张纸摆在窗台上传看。看门人在楼梯拐角听着，说房东礼拜三来收钱。几家人合计好，到那天一起等在门厅，先把克朗递过去，再把修补的事一件件摆出来。Josef Stein把纸折进围裙口袋，觉得人凑齐了话也硬气些。
  _effects: mood 0.03999999999999998_

- **1937.11** `r3-crime.poisoning-case::ctx-vienna-authoritarian-1934::milieu-tenement::one-microscope/drank-from-the-pot` tags: crime, medical, poison, marriage, suspicion, vienna, urban, crisis
  Josef Stein先盛了一碗，说“我先尝咸淡”。半个钟头后，Josef Stein开始呕吐，Franz Winter跑去叫Emil Bauer 2。洗胃时，Josef Stein听见Josef Berg在门外问“谁做的汤”，Franz Winter说“是他自己”。Emil Bauer 2把铜勺放进证物袋，说“先查查锅”。
  _effects: cash -6 (汤锅边搁着一把铜勺); condition; flag +poisoned_by_own_soup; relation friend with person-materialized-world-vienna-1912-12; knowledge “the soup was poisoned before the subject tasted it”_

- **1938.01** `p22-two-weddings::ctx-vienna-authoritarian-1934::milieu-hospital/the-cakes-are-swapped` tags: wedding, bigamy, farce, scandal, love, known_affair, public, comic
  两家订了同一家酒楼，连蛋糕都写错了名字。中午第一场婚礼切开的蛋糕里掉出一枚不属于新娘的戒指，Franz Winter和Rosa Kral同时伸手去捡；Josef Berg在登记簿上找到两个相同的签名。宾客们没有散，反而坐下来等第二场，像等一出加演。
  _effects: state_add public-scandal state:world-vienna-1912:608; state_add p22-wild-fortune state:world-vienna-1912:609; state_add p22-scandal-engine state:world-vienna-1912:610; cash -2 (the restaurant charged for both weddings); relation partner with person-materialized-world-vienna-1912-12; relation rival with person-materialized-world-vienna-1912-37; flag +wedding_cakes_swapped; mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-12; flag -known_affair_active; flag -wild_fortune_active; flag +wild_fortune_active; flag +scandal_engine_active_

- **1938.01** `state_reaction:p23-dangerous-secret/a-witness-talks` tags: p23-dangerous-secret, secret, danger, leverage, exposure, loyalty, crime, politics
  审讯室里的灯亮了一夜。第二天，Josef Stein在面包房门口听见有人低声复述自己的秘密，连停顿的位置都一模一样。
  _effects: state_parameter p23-dangerous-secret.exposure 28 -> 36; state_parameter p23-dangerous-secret.leverage 11 -> 7; state_parameter p23-dangerous-secret.loyalty 49 -> 43; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:007088_

- **1938.01** `state_reaction:p22-scandal-engine/a-new-scandal-feeds-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Josef Stein的新故事登出来时，旧的那一页也被重新翻到桌面上。Josef Stein发现两件事共用同一个证人，而那个证人上周还来借过盐。
  _effects: state_parameter p22-scandal-engine.heat 65 -> 71; state_parameter p22-scandal-engine.reach 60 -> 64; state_parameter p22-scandal-engine.shame 55 -> 58; state_parameter p22-scandal-engine.leverage 25 -> 27; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:007088_

- **1938.01** `state_expire:pl19-protected-scandal` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  Josef Stein的「被小圈子护住的私情」到期；相关安排结束。
  _effects: state_remove pl19-protected-scandal state:world-vienna-1912:414; flag -protected_scandal_active_

- **1938.01** `state_expire:fame` tags: fame, reputation, media, status, state, state_tick, state:fame
  Josef Stein的「公众名声」到期；相关安排结束。
  _effects: state_remove fame state:world-vienna-1912:514_

- **1938.01** `state_tick:p23-dangerous-secret/the-secret-changes-hands/the-secret-spills` tags: p23-dangerous-secret, secret, danger, leverage, exposure, loyalty, crime, politics
  秘密最终从一扇没关严的窗户里漏了出去。Josef Stein听见楼下有人复述细节，连那晚桌上的酒瓶位置都说对了。当天下午，两个穿大衣的人来敲门，其中一个手里拿着Josef Stein三年前写的一张收据。
  _effects: state_parameter p23-dangerous-secret.exposure 36 -> 50; state_parameter p23-dangerous-secret.leverage 7 -> 0; state_parameter p23-dangerous-secret.loyalty 43 -> 33; state_parameter p23-dangerous-secret.bodies 0 -> 1; mood -0.03999999999999998_

- **1938.01** `state_tick:ad20-private-bargain/the-favor-ages/kept` tags: ad20-private-bargain, private, bargain, favor, debt, trust, leverage, exit
  那笔私下的安排又过了一年。没有人提起，但Josef Stein在街上遇见对方时，两个人都多停了一拍。Josef Stein知道，沉默本身也是利息。
  _effects: state_parameter ad20-private-bargain.trust 41 -> 45; state_parameter ad20-private-bargain.debt 59 -> 57; state_parameter ad20-private-bargain.exit 15 -> 17; mood 0.010000000000000009_

- **1938.01** `vienna-tenement-neighbors.laundry_line_dispute/neighbor_yanks_clothes` tags: home, social, family, housing
  Hedwig嫌Josef Stein的床单滴水滴到Hedwig家衬衫上，一把扯下床单扔在院子的石板上。Josef Stein下楼捡起来时，床单角沾了泥，重洗又要费肥皂。两人在院子当中对喊，楼上有人推开窗看热闹。Josef Stein把床单重新搭上绳子时，故意把水拧在Hedwig那侧。
  _effects: relation rival with person-phase15-Hedwig-world-vienna-1912; cash -0.15 (重洗床单的肥皂钱)_

- **1938.06** `curse15-betrayal.ledger-share::ctx-vienna-authoritarian-1934::milieu-hospital/the-witness-stays-quiet` tags: betrayal, money, family, trust, curse, secret, vienna, urban
  Helene Kral在办事处说了Josef Stein一整个下午的坏话，从欠债说到那场没人看见的火灾。旁边的人没有替Josef Stein说一句话。几天后，Josef Stein发现自己的名字从互助会的名单上被划掉了，Helene Kral只说“我也要养家”。
  _effects: reputation -0.07999999999999996; relation rival with person-materialized-world-vienna-1912-16; cash -1 (互助会停止发放的补贴); condition; flag +reputation_damaged_by_betrayal_

- **1938.07** `r15-curse.betrayal-at-table::ctx-vienna-authoritarian-1934::milieu-hospital/lie-that-stuck` tags: betrayal, social, family, trust, secret, vienna, urban, crisis
  Helene Kral告诉所有人Josef Stein偷了东西。没有人找到赃物，但每个人都在传。Josef Stein去市场时，摊主把零钱放在柜台上，不再递到手里。
  _effects: mood -0.07999999999999996; reputation -0.09999999999999998; flag +false_accusation; relation rival with person-materialized-world-vienna-1912-16; state_add public-scandal state:world-vienna-1912:657_

- **1939.01** `state_reaction:p23-dangerous-secret/a-witness-talks` tags: p23-dangerous-secret, secret, danger, leverage, exposure, loyalty, crime, politics
  审讯室里的灯亮了一夜。第二天，Josef Stein在面包房门口听见有人低声复述自己的秘密，连停顿的位置都一模一样。
  _effects: state_parameter p23-dangerous-secret.exposure 50 -> 58; state_parameter p23-dangerous-secret.leverage 0 -> 0; state_parameter p23-dangerous-secret.loyalty 33 -> 27; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:007570_

- **1939.01** `pl19-bridge.public-rumor::ctx-vienna-authoritarian-1934::milieu-hospital/the-list-writes-itself` tags: scandal, protection, network, press, media, rumor, bridge, vienna
  Josef Stein在报纸上看见自己的名字和一张旧照片，报纸像一盏关不掉的灯。Katharina Bauer 3提议找几个人替Josef Stein挡电话、挡记者、挡亲戚；Josef Stein说不用，第二天却发现Katharina Bauer 3已经把名单写好了，最上面一行是Josef Stein自己。
  _effects: state_add pl19-protected-scandal state:world-vienna-1912:656; relation friend with person-materialized-world-vienna-1912-36; reputation -0.020000000000000018; flag +list_written_itself; knowledge “名单最上面一行是当事人的名字。”; relation acquaintance with person-materialized-world-vienna-1912-36; flag +protected_scandal_active_

- **1939.01** `state_reaction:public-scandal/gossip` tags: public-scandal, scandal, reputation, social, state, state_reaction, protection, network
  Josef Stein走进咖啡馆时，邻桌的声音低了一拍。没有人当面说什么，但每个人都知道该说什么。
  _effects: mood -0.030000000000000027; reputation -0.02999999999999997_
  _causes: evt:world-vienna-1912:007611_

- **1939.01** `state_expire:ad20-private-bargain` tags: ad20-private-bargain, private, bargain, favor, debt, trust, leverage, exit
  Josef Stein的「私下的账」到期；相关安排结束。
  _effects: state_remove ad20-private-bargain state:world-vienna-1912:563; flag -private_bargain_active_

- **1939.01** `state_tick:p22-wild-fortune/the-story-gets-taller/the-crowd-remembers` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  一年过去，Josef Stein的荒唐故事没有变小，反而多了一个愿意作证的人。债主没有立刻上门，亲戚也还愿意来吃饭；Josef Stein把新添的银器擦了一遍，发现其中一只底下刻着别人的名字。
  _effects: state_parameter p22-wild-fortune.height 30 -> 34; state_parameter p22-wild-fortune.absurdity 85 -> 88; state_parameter p22-wild-fortune.witnesses 80 -> 85; state_parameter p22-wild-fortune.fragility 60 -> 62; mood 0.020000000000000018_

- **1939.01** `state_tick:p22-scandal-engine/the-rumor-learns-new-words/the-story-gets-a-new-witness` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  又过了一年，流言没有熄，却学会了新的说法。Josef Stein在咖啡馆里听见自己的故事被讲成三个版本，每个版本都比上一个多一个证人；没有人来追问，也没有人真正忘记。
  _effects: state_parameter p22-scandal-engine.heat 71 -> 68; state_parameter p22-scandal-engine.reach 64 -> 68; state_parameter p22-scandal-engine.leverage 27 -> 30; state_parameter p22-scandal-engine.shame 58 -> 60; mood 0.010000000000000009_

- **1939.05** `hs18-scandal.sheet::ctx-vienna-authoritarian-1934::milieu-tenement/complain-to-the-police` tags: scandal, newspaper, reputation, neighbor, reporter, history, vienna, urban
  Josef Stein带着报纸去警局，说门牌号写错了。值班警察把报纸翻来覆去看了两遍，最后在边角写了一个日期，说“这类事不归我们管”。回家路上，Josef Stein看见报摊把同一版报纸摆到了最显眼的位置。
  _effects: reputation -0.010000000000000009; flag +complained_about_scandal_sheet; knowledge “警察不会为小报的错字立案。”; mood -0.040000000000000036; relation acquaintance with person-materialized-world-vienna-1912-80_

- **1939.05** `state_reaction:pl19-protected-scandal/a-public-question` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  有人在一场公开活动里问起Josef Stein的“私人安排”，语气客气，问题却像一根针。Josef Stein笑着答了别的事，回家后才发现手心全是汗。
  _effects: state_parameter pl19-protected-scandal.publicHeat 55 -> 67; state_parameter pl19-protected-scandal.protection 40 -> 34; reputation -0.030000000000000027_
  _causes: evt:world-vienna-1912:008214_

- **1939.06** `bc18-crime.inept-blackmail::ctx-vienna-authoritarian-1934::milieu-hospital/pay-hush-money` tags: crime, blackmail, photograph, mistake, humiliation, absurd, reputation, vienna
  Josef Stein先给了两克朗，Ferdinand Weiss 2又要四克朗；第三次来收钱时，Josef Stein把他带到了警察局。警员在Ferdinand Weiss 2的口袋里找到三张别人的照片，其中一张是市议员在酒馆后门。Josef Stein拿回自己的照片，也花掉了一个下午，回家时晚饭已经凉了。
  _effects: cash -4 (付给勒索者的封口钱); reputation -0.020000000000000018; relation rival with person-materialized-world-vienna-1912-46; condition; flag +paid_then_reported_blackmail; mood -0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-46_

- **1939.09** `statistical_infection`
  Josef Stein在Leopoldstädter Zinshaus, gemeinsamer Gang病倒了，肺结核让身体发热、虚弱，接下来的日子只能卧床。

- **1939.11** `ml18-bank.run-on-the-savings::ctx-vienna-authoritarian-1934::milieu-hospital/withdraw-in-time` tags: bank, money, crisis, savings, risk, reversal, vienna, urban
  天还没亮，银行门口已经排到街角。Berta Stein 2在门里喊，说只是谣言，存款都在；排队的人没有散，反而把箱子放在脚边。Josef Stein排到中午，取出了四十克朗，回家把钱分成三份藏好。第二天银行照常开门，Franz Winter说白排了一天；Josef Stein说排一天总比排三年强。
  _effects: cash 40 (savings withdrawn during the bank run); relation partner with person-materialized-world-vienna-1912-12; skill; flag +withdrew_savings; mood 0.050000000000000044_

- **1939.12** `statistical_illness_worsened`
  Josef Stein的肺结核没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1940.01** `statistical_recovery`
  Josef Stein从肺结核中慢慢恢复，能下床喝水，但身体还虚弱。

- **1940.01** `p22-apology-confession::ctx-vienna-authoritarian-1934::milieu-tenement/the-confession-is-believed` tags: apology, confession, newspaper, dark, reversal, scandal, under_investigation, blacklist
  警察按着报纸上的那句话找上门，Anton Weiss把Josef Stein带去做笔录。Josef Stein解释那只是排版错误，Emil Bauer 2却在电话里说原稿已经丢了；Berta Huber 2在走廊里作证，说Josef Stein确实曾提过那笔钱。天黑时，Josef Stein还没有回家。笔录签完，发现自己的名字比那行认罪更陌生。
  _effects: state_add under-investigation state:world-vienna-1912:733; state_add public-scandal state:world-vienna-1912:734; state_add p22-scandal-engine state:world-vienna-1912:735; relation rival with person-materialized-world-vienna-1912-86; relation rival with person-materialized-world-vienna-1912-67; reputation -0.050000000000000044; flag +confession_believed; mood -0.050000000000000044; relation acquaintance with person-materialized-world-vienna-1912-60_

- **1940.01** `state_reaction:p22-scandal-engine/a-new-scandal-feeds-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Josef Stein的新故事登出来时，旧的那一页也被重新翻到桌面上。Josef Stein发现两件事共用同一个证人，而那个证人上周还来借过盐。
  _effects: state_parameter p22-scandal-engine.heat 65 -> 71; state_parameter p22-scandal-engine.reach 55 -> 59; state_parameter p22-scandal-engine.shame 65 -> 68; state_parameter p22-scandal-engine.leverage 30 -> 32; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:008211_

- **1940.01** `state_expire:p23-dangerous-secret` tags: p23-dangerous-secret, secret, danger, leverage, exposure, loyalty, crime, politics
  Josef Stein的「危险的秘密」到期；相关安排结束。
  _effects: state_remove p23-dangerous-secret state:world-vienna-1912:561_

- **1940.01** `state_expire:p22-wild-fortune` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  Josef Stein的「荒唐横财」到期；相关安排结束。
  _effects: state_remove p22-wild-fortune state:world-vienna-1912:609; flag -wild_fortune_active_

- **1940.01** `state_expire:p22-scandal-engine` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Josef Stein的「流言发动机」到期；相关安排结束。
  _effects: state_remove p22-scandal-engine state:world-vienna-1912:610; flag -scandal_engine_active_

- **1940.01** `state_tick:pl19-protected-scandal/the-network-meets/someone-wants-a-favor` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  有人替Josef Stein挡了一次采访，随后在走廊里提起自己儿子的学徒期满。Josef Stein知道这不是闲聊；当天晚上，那张写着名字的纸条被压在糖罐下面，像一枚没有付清的硬币。
  _effects: state_parameter pl19-protected-scandal.leverage 10 -> 22; state_parameter pl19-protected-scandal.protection 34 -> 30; state_parameter pl19-protected-scandal.exposure 60 -> 65; mood -0.020000000000000018_

- **1940.07** `vienna-legacy-worklife.union-office/union-office.enroll-first` tags: legacy, work, family, reform, ordinary_life
  来问入会的是个瘦高的年轻人，帽檐捏在手里，说自己在第十六区的织布厂做了半年。Josef Stein把名册翻到空白页，蘸水笔尖在“住址”那栏停了一下，等他报出街名。老成员在角落里把账本合上，声音很轻。
  _effects: cash 1 (新会员的入会费先记在桌上); skill_

- **1940.08** `p22-goat-heir::ctx-vienna-authoritarian-1934::milieu-hospital/goat-sold-at-auction` tags: inheritance, absurd, comic, goat, tenement, legal, rumor, public
  拍卖行把山羊牵上台，槌子落下时，它忽然挣脱绳子，在人群里撞翻了两个花盆。买主说这羊不吉利，只肯出半价；Josef Stein拿到的钱刚够付律师费，楼契被银行收走，天井里只剩一截被啃过的牵绳。买主把它牵走时，它回头看了一眼那栋楼。
  _effects: cash -3 (lawyers and auction fees ate the goat price); state_add debt-bondage state:world-vienna-1912:805; reputation -0.030000000000000027; flag +goat_sold; mood -0.040000000000000036_

- **1940.12** `r15-curse.betrayal-at-table::ctx-vienna-authoritarian-1934::milieu-tenement/lie-that-stuck` tags: betrayal, social, family, trust, secret, vienna, urban, crisis
  Anna Berg告诉所有人Josef Stein偷了东西。没有人找到赃物，但每个人都在传。Josef Stein去市场时，摊主把零钱放在柜台上，不再递到手里。
  _effects: mood -0.07999999999999996; reputation -0.09999999999999998; relation rival with person:evt:world-vienna-1912:001251:child; state_add public-scandal state:world-vienna-1912:804; relation acquaintance with person-materialized-world-vienna-1912-44_

- **1940.12** `state_reaction:pl19-protected-scandal/a-rival-lets-slip` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  那个替Josef Stein保守秘密的人，在另一个场合把话说漏了半句。没有人当场追问，但第二天，Josef Stein发现后间的门没有关严。
  _effects: state_parameter pl19-protected-scandal.exposure 65 -> 75; state_parameter pl19-protected-scandal.leverage 22 -> 30; state_parameter pl19-protected-scandal.publicHeat 79 -> 83; mood -0.030000000000000027_
  _causes: evt:world-vienna-1912:008777_

- **1941.01** `p22-apology-proposal::ctx-vienna-authoritarian-1934::milieu-tenement/the-apology-runs-twice` tags: apology, proposal, newspaper, romance, scandal, public, editor, irony
  Josef Stein在报纸第三版登了一整版道歉，末尾顺笔写了一句“如果你愿意，下个星期天我在教堂门口等”。Marie Huber读完把报纸折好，真的来了；Emil Bauer 2在街对面数着围观的人，第二天又登了一篇《道歉的续篇》。两个人在教堂门口站了很久，谁也没有先提那版报纸。
  _effects: state_add p22-wild-fortune state:world-vienna-1912:803; relation acquaintance with person-materialized-world-vienna-1912-86; reputation 0.040000000000000036; cash 2 (the newspaper paid for the sequel); flag +apology_became_courtship; mood 0.050000000000000044; flag +wild_fortune_active_

- **1941.01** `state_reaction:pl19-protected-scandal/a-public-question` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  有人在一场公开活动里问起Josef Stein的“私人安排”，语气客气，问题却像一根针。Josef Stein笑着答了别的事，回家后才发现手心全是汗。
  _effects: state_parameter pl19-protected-scandal.publicHeat 67 -> 79; state_parameter pl19-protected-scandal.protection 30 -> 24; reputation -0.030000000000000027_
  _causes: evt:world-vienna-1912:008774_

- **1941.01** `state_reaction:p22-scandal-engine/a-public-apology-cools-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Josef Stein在报纸上登了道歉，流言却没有立刻停。第二天，有人在门口放了一束花，也有人把花拿走了；Josef Stein把空花瓶留在窗台上，没有扔。
  _effects: state_parameter p22-scandal-engine.heat 71 -> 63; state_parameter p22-scandal-engine.reach 59 -> 56; state_parameter p22-scandal-engine.shame 68 -> 64; state_parameter p22-scandal-engine.leverage 32 -> 37; mood 0.010000000000000009_
  _causes: evt:world-vienna-1912:008774_

- **1941.01** `state_tick:pl19-protected-scandal/the-network-meets/someone-wants-a-favor` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  有人替Josef Stein挡了一次采访，随后在走廊里提起自己儿子的学徒期满。Josef Stein知道这不是闲聊；当天晚上，那张写着名字的纸条被压在糖罐下面，像一枚没有付清的硬币。
  _effects: state_parameter pl19-protected-scandal.leverage 30 -> 42; state_parameter pl19-protected-scandal.protection 24 -> 20; state_parameter pl19-protected-scandal.exposure 75 -> 80; mood -0.020000000000000018_

- **1941.01** `state_tick:under-investigation/case-progress/evidence` tags: under-investigation, legal, police, investigation, risk, state, state_tick
  调查员又来找Josef Stein谈了一次。问话比上次具体，记录也比上次长。
  _effects: state_parameter under-investigation.progress 35 -> 50; mood -0.040000000000000036_

- **1941.01** `state_tick:p22-scandal-engine/the-rumor-learns-new-words/the-story-turns-on-its-keeper` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  一个曾经替Josef Stein传话的人搬走了，带走了半条街的信任。第二天，信箱里多了一张没有署名的明信片，上面只写着“我还记得”；Josef Stein把明信片翻过来，背面是空的。
  _effects: state_parameter p22-scandal-engine.heat 63 -> 70; state_parameter p22-scandal-engine.reach 56 -> 61; state_parameter p22-scandal-engine.leverage 37 -> 33; state_parameter p22-scandal-engine.shame 64 -> 70; mood -0.020000000000000018_

- **1941.01** `state_tick:debt-bondage/interest/pay-interest` tags: debt-bondage, debt, work, poverty, legal, state, state_tick
  Josef Stein又付了一年的利息。本金几乎没动，债主的账本却翻到了新一页。
  _effects: cash -3 (debt interest); state_parameter debt-bondage.debt 18 -> 20_

- **1941.01** `state_reaction:public-scandal/gossip` tags: public-scandal, scandal, reputation, social, state, state_reaction, refugee, shelter
  Josef Stein走进咖啡馆时，邻桌的声音低了一拍。没有人当面说什么，但每个人都知道该说什么。
  _effects: mood -0.030000000000000027; reputation -0.030000000000000027_
  _causes: evt:world-vienna-1912:009162_

- **1941.02** `vienna-housing-move.rent-notice/rent-notice-demand-repair` tags: housing, home, rent, family, money
  Josef Stein没有立刻答话，先去敲Ferdinand Moser的门。两人一起数落墙上的水渍和门框里灌进来的风，楼梯间的窗户修好了，自家墙皮还在剥落。Ferdinand Moser提议一起把话带给看门人：先修好漏水的墙角，涨租的事再谈。Josef Stein把纸重新折好，请他把话带到门外。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-95; mood 0.030000000000000027_

- **1941.10** `vienna-tenement-neighbors.laundry_line_dispute/neighbor_yanks_clothes` tags: home, social, family, housing
  Ferdinand Moser嫌Josef Stein的床单滴水滴到Ferdinand Moser家衬衫上，一把扯下床单扔在院子的石板上。Josef Stein下楼捡起来时，床单角沾了泥，重洗又要费肥皂。两人在院子当中对喊，楼上有人推开窗看热闹。Josef Stein把床单重新搭上绳子时，故意把水拧在Ferdinand Moser那侧。
  _effects: relation rival with person-materialized-world-vienna-1912-95; cash -0.15 (重洗床单的肥皂钱)_

- **1942.01** `hist15-occ.seed-occupation::ctx-vienna-authoritarian-1934::milieu-tenement/the-flag-changes` tags: occupation, war, curfew, history, place, institution, vienna, urban
  城门口的旗换了颜色，岗哨开始检查每一张纸。Josef Stein回家时发现街角新钉了一块告示牌：天黑以后不许出门，地窖里的粮食要登记。晚上，巡逻队的靴声从窗下经过，比钟声还准。
  _effects: state_add occupied-city-regime state:world-vienna-1912:869; mood -0.05999999999999972; flag +saw_the_occupation_flag; relation acquaintance with person-materialized-world-vienna-1912-113_

- **1942.01** `af17-humiliation.puppet-show::ctx-vienna-authoritarian-1934::milieu-hospital/laughed-first` tags: humiliation, public, scandal, theatre, charity, reputation, absurd, vienna
  慈善市集的木偶戏把Josef Stein的丑闻编成三幕，木偶穿着和Josef Stein一样的灰外套，连走路的姿势都学得出来。第一幕还没演完，Josef Stein先笑出了声，笑得比谁都响；人群愣了一下，也跟着笑。市长夫人当场请Josef Stein为下一场义卖剪彩，Emil Bauer 2在幕布后面朝Josef Stein举了举木偶。
  _effects: reputation 0.06000000000000005; cash 2 (下一场义卖的剪彩酬劳); state_remove public-scandal state:world-vienna-1912:804; relation acquaintance with person-materialized-world-vienna-1912-86; flag +laughed_at_own_caricature; mood 0.030000000000000027_

- **1942.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Josef Stein被叫到学校，老师说Elisabeth Stein这学期总在课上看窗外。回家的路上，Josef Stein没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 23 -> 18; state_parameter raising-child.caregiverBurden 47 -> 52; cash -2 (extra lessons and replacement pencils); mood -0.030000000000000027_

- **1942.01** `state_tick:pl19-protected-scandal/the-network-meets/someone-wants-a-favor` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  有人替Josef Stein挡了一次采访，随后在走廊里提起自己儿子的学徒期满。Josef Stein知道这不是闲聊；当天晚上，那张写着名字的纸条被压在糖罐下面，像一枚没有付清的硬币。
  _effects: state_parameter pl19-protected-scandal.leverage 42 -> 54; state_parameter pl19-protected-scandal.protection 20 -> 16; state_parameter pl19-protected-scandal.exposure 80 -> 85; mood -0.020000000000000018_

- **1942.01** `state_expire:under-investigation` tags: under-investigation, legal, police, investigation, risk, state, state_tick, state:under-investigation
  Josef Stein的「被调查」到期；相关安排结束。
  _effects: state_remove under-investigation state:world-vienna-1912:733_

- **1942.01** `state_tick:p22-wild-fortune/the-story-gets-taller/a-witness-asks-for-proof` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  一个见证人要求Josef Stein拿出证据。Josef Stein翻遍抽屉，只找到一张被水浸过的收据；那天晚上，街上的故事换了主角，Josef Stein的名字被挪到了最后一行。
  _effects: state_parameter p22-wild-fortune.height 40 -> 34; state_parameter p22-wild-fortune.witnesses 65 -> 60; state_parameter p22-wild-fortune.fragility 35 -> 42; mood -0.010000000000000009_

- **1942.01** `state_tick:debt-bondage/interest/pay-interest` tags: debt-bondage, debt, work, poverty, legal, state, state_tick
  Josef Stein又付了一年的利息。本金几乎没动，债主的账本却翻到了新一页。
  _effects: cash -3 (debt interest); state_parameter debt-bondage.debt 20 -> 22_

- **1942.02** `curse15-betrayal.ledger-share::ctx-vienna-authoritarian-1934::milieu-tenement/sold-the-share` tags: betrayal, money, family, trust, curse, secret, vienna, urban
  Ferdinand Moser把Josef Stein寄放在杂货铺后间的木箱搬走了，里面是两个人合买的缝纫机零件和一小袋银币。Josef Stein追到码头时，Ferdinand Moser已经上了船，只留下一张写着“算我借的”的纸条。一个月后，Josef Stein在旧货摊上看见那台缝纫机，摊主说是从当铺收来的。
  _effects: cash -4 (被卷走的合买本钱); relation rival with person-materialized-world-vienna-1912-95; flag +betrayed_over_money; knowledge “我的合伙人带着合买的零件和银币上了船。”; condition_

- **1942.04** `p9-gap-adult-solitude.window-argument/window-argument.peek` tags: adulthood, daily, solitude, ordinary, home, neighbor, overheard
  Josef Stein下楼倒水，在楼梯口看见院子里站着一对夫妻，男人的围裙上还沾着面粉，女的攥着一张工钱条。她没插话，提着壶又上楼，关门时听见那女人说“一星期八克朗怎么够”。
  _effects: skill_

- **1942.09** `vienna-legacy-worklife.hours-ledger/hours-ledger.read-for-others` tags: legacy, work, family, reform, ordinary_life
  铅笔头短得捏不住，Josef Stein把它夹在两指之间，在表格背面写下两个名字。被漏掉的人一个叫扬，一个叫弗兰茨，都是每天清早从火车站走来的临时工。工头看了一眼背面，没说话，把表贴回墙上。
  _effects: skill; reputation 0.040000000000000036_

- **1943.01** `p22-dead-voice-child::ctx-vienna-authoritarian-1934::milieu-hospital/the-dead-relative-had-a-secret` tags: child, dead_relative, voice, eerie, dark, grief, family_secret, scandal
  孩子说出祖母临终前的一句悄悄话，那句话里有一个陌生男人的名字。家里人听见后把碗放下，Josef Stein看见他的手指在桌沿上停住了；Ferdinand Moser在门外假装扫地，耳朵却贴着门缝。那天晚上，家里的灯亮到很晚，没有人先开口。
  _effects: state_add known-affair state:world-vienna-1912:959; state_add public-scandal state:world-vienna-1912:960; state_add p22-scandal-engine state:world-vienna-1912:961; relation acquaintance with person-materialized-world-vienna-1912-95; flag +dead_grandmother_secret; flag +known_affair_active; flag -known_affair_active; flag +scandal_engine_active_

- **1943.01** `state_reaction:pl19-protected-scandal/a-public-question` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  有人在一场公开活动里问起Josef Stein的“私人安排”，语气客气，问题却像一根针。Josef Stein笑着答了别的事，回家后才发现手心全是汗。
  _effects: state_parameter pl19-protected-scandal.publicHeat 83 -> 95; state_parameter pl19-protected-scandal.protection 16 -> 10; reputation -0.030000000000000027_
  _causes: evt:world-vienna-1912:009955_

- **1943.01** `state_reaction:p22-scandal-engine/a-new-scandal-feeds-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Josef Stein的新故事登出来时，旧的那一页也被重新翻到桌面上。Josef Stein发现两件事共用同一个证人，而那个证人上周还来借过盐。
  _effects: state_parameter p22-scandal-engine.heat 50 -> 56; state_parameter p22-scandal-engine.reach 35 -> 39; state_parameter p22-scandal-engine.shame 60 -> 63; state_parameter p22-scandal-engine.leverage 45 -> 47_
  _causes: evt:world-vienna-1912:010160_

- **1943.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Josef Stein被叫到学校，老师说Katharina Stein这学期总在课上看窗外。回家的路上，Josef Stein没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 23 -> 18; state_parameter raising-child.caregiverBurden 47 -> 52; cash -2 (extra lessons and replacement pencils)_

- **1943.01** `state_transition:pl19-protected-scandal/heat-becomes-public` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  Josef Stein从「被小圈子护住的私情」转入另一段处境：the public heat outran the protection
  _effects: state_transition pl19-protected-scandal -> known-affair; reputation -0.040000000000000036; flag -protected_scandal_active; flag +known_affair_active_

- **1943.01** `state_expire:p22-scandal-engine` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Josef Stein的「流言发动机」到期；相关安排结束。
  _effects: state_remove p22-scandal-engine state:world-vienna-1912:735; flag -scandal_engine_active_

- **1943.01** `state_expire:p22-wild-fortune` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  Josef Stein的「荒唐横财」到期；相关安排结束。
  _effects: state_remove p22-wild-fortune state:world-vienna-1912:803; flag -wild_fortune_active_

- **1943.01** `state_expire:debt-bondage` tags: debt-bondage, debt, work, poverty, legal, state, state_tick, state:debt-bondage
  Josef Stein的「债务束缚」到期；相关安排结束。
  _effects: state_remove debt-bondage state:world-vienna-1912:805_

- **1943.01** `state_expire:institution-purge` tags: institution-purge, purge, repression, organization, loyalty, surveillance, politics, state
  Josef Stein的「组织清洗」到期；相关安排结束。
  _effects: state_remove institution-purge state:world-vienna-1912:880_

- **1943.04** `vienna-medical-treatment.night-fever/sweat-it-out` tags: health, medical, family, money
  Josef Stein说胡话时念着车间的排班表，Ferdinand Moser一句句应着，拿小勺往嘴里送温水。床头那半瓶退烧药早见了底，她没舍得倒最后一滴，留着天亮再说。
  _effects: condition; relation friend with person-materialized-world-vienna-1912-95_

- **1943.05** `ad20-shop-opening::ctx-vienna-authoritarian-1934::milieu-tenement/the-street-watches` tags: shop, business, opening, everyday, public, obligation, vienna, urban
  Josef Stein把新店的招牌挂上去时，街对面已经站了几个人。第一位客人买了一包针，第二位问能不能赊账，第三位什么也没买，只说“看看”。到傍晚，Josef Stein发现自己记住了每一张脸，却忘了算今天的账。
  _effects: state_add ad20-public-attention state:world-vienna-1912:1034; cash 3 (the first day’s takings); reputation 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-95; flag +shop_opened; mood 0.040000000000000036; flag +public_attention_active_

- **1943.08** `vienna-legacy-worklife.sick-fund/sick-fund.fill-form` tags: legacy, work, family, reform, ordinary_life
  表格有四栏，第四栏要写“工种及所属行会”。Josef Stein问工友平时怎么称呼自己的活，工友靠在机器旁边说“就是上油”。办事员的印章是木柄的，按下去时咔的一声。
  _effects: skill_

- **1943.11** `state_reaction:ad20-public-attention/a-scandal-sticks` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  旧闻被重新排上版面，标题比上次短，意思却更重。Josef Stein没有买那份报纸，但整条街都知道了标题。
  _effects: state_parameter ad20-public-attention.attention 40 -> 50; state_parameter ad20-public-attention.danger 10 -> 18; state_parameter ad20-public-attention.sympathy 45 -> 40; mood -0.030000000000000027_
  _causes: evt:world-vienna-1912:010726_

- **1943.12** `statistical_infection`
  Josef Stein在Villa Schnitzler, Sternwartestraße 71病倒了，肺炎让身体发热、虚弱，接下来的日子只能卧床。

- **1943.12** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Katharina Stein这周主动擦了黑板。Josef Stein把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 18 -> 21; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:010807_

- **1944.01** `sm18-object.child-schoolbag::ctx-vienna-authoritarian-1934::milieu-tenement/asks-where-she-found-it` tags: child, school, object, accusation, misunderstanding, reputation, vienna, urban
  Josef Stein没有当场骂Katharina Stein，只让Rosa Winter把顶针先收好，自己蹲下来问是在哪里捡的。Katharina Stein说在楼梯拐角，旁边还有一只装纽扣的铁盒。Josef Stein记得那只铁盒是邻居家的，心里反而更沉。
  _effects: state_add sm18-missing-object state:world-vienna-1912:1033; knowledge “孩子说顶针是在楼梯拐角捡的，旁边有一只装纽扣的铁盒”; flag +child_said_she_found_the_thimble; flag +something_is_missing_

- **1944.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Katharina Stein这周主动擦了黑板。Josef Stein把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 18 -> 21; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:010590_

- **1944.01** `state_reaction:sm18-missing-object/a-rumor-hardens` tags: sm18-missing-object, mystery, object, loss, memory, search, suspicion, everyday
  Josef Stein在院子里听见两个人在说“那家的东西”，话头在看见Josef Stein时停住。晚上，Josef Stein把首饰盒从五斗柜挪到床边，又觉得这样更像在防谁。
  _effects: state_parameter sm18-missing-object.suspicion 30 -> 40; reputation -0.020000000000000018; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:010711_

- **1944.01** `state_reaction:p22-scandal-engine/a-public-apology-cools-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Josef Stein在报纸上登了道歉，流言却没有立刻停。第二天，有人在门口放了一束花，也有人把花拿走了；Josef Stein把空花瓶留在窗台上，没有扔。
  _effects: state_parameter p22-scandal-engine.heat 56 -> 48; state_parameter p22-scandal-engine.reach 39 -> 36; state_parameter p22-scandal-engine.shame 63 -> 59; state_parameter p22-scandal-engine.leverage 47 -> 52; mood 0.010000000000000009_
  _causes: evt:world-vienna-1912:010711_

- **1944.01** `state_tick:known-affair/public-year/retold` tags: known-affair, love, scandal, secret, public, secret_intimacy, state, state_tick
  Josef Stein在市场上被人叫住，对方笑着说“就是那个人”。Josef Stein也笑了一下，买完土豆就走；回到家才发现，手里的零钱少了一枚。
  _effects: state_parameter known-affair.notoriety 30 -> 38; reputation -0.030000000000000027; mood -0.020000000000000018_

- **1944.01** `state_tick:ad20-public-attention/the-attention-cycle/warms` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  Josef Stein在街角被人认出来，对方没有要求什么，只说“上次那件事做得不错”。这句客气话被旁边的人听见，下午便有两个陌生人朝Josef Stein点头。关注没有减少，但空气松了一点。
  _effects: state_parameter ad20-public-attention.attention 50 -> 46; state_parameter ad20-public-attention.sympathy 40 -> 46; state_parameter ad20-public-attention.opportunity 50 -> 54; mood 0.020000000000000018_

- **1944.01** `state_tick:p22-scandal-engine/the-rumor-learns-new-words/the-story-turns-on-its-keeper` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  一个曾经替Josef Stein传话的人搬走了，带走了半条街的信任。第二天，信箱里多了一张没有署名的明信片，上面只写着“我还记得”；Josef Stein把明信片翻过来，背面是空的。
  _effects: state_parameter p22-scandal-engine.heat 48 -> 55; state_parameter p22-scandal-engine.reach 36 -> 41; state_parameter p22-scandal-engine.leverage 52 -> 48; state_parameter p22-scandal-engine.shame 59 -> 65; mood -0.020000000000000018_

- **1944.03** `statistical_illness_worsened`
  Josef Stein的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1944.06** `statistical_recovery`
  Josef Stein熬过了这场肺炎，能坐起来喝一点汤，但身体还很虚。

- **1944.07** `vienna-housing-move.sublet-room/sublet-daylight-only` tags: housing, home, rent, family, money
  Josef Stein和Emil Bauer 2谈妥只出租白天，夜里不留宿，收两克朗。床仍归Josef Stein家，钥匙只在白天给。Emil Bauer 2说不碍事，他住的工棚不许带人，白天有个落脚的地方就够。Ferdinand Moser听了点头，说这样少些闲话；到了傍晚，Josef Stein把床铺重新收好，屋里照旧几口人。
  _effects: cash 2 (白天出租床位的钱); relation acquaintance with person-materialized-world-vienna-1912-86; mood 0.020000000000000018_

- **1944.12** `vienna-adult-social.sunday-table/sunday-table.repair` tags: adulthood, social, work, family, partnership
  Franz Winter从柜子里拿出攒了三个月的零钱袋，倒在桌上，说先给Josef Stein买双能进厂的结实靴子。Josef Stein数出鞋匠要的数目，把剩下的又推回袋子中央。
  _effects: cash -3 (凑钱买了一双结实的工靴); health 0.019999999999999997 (脚上有了不漏水的靴子); relation partner with person-materialized-world-vienna-1912-12_

- **1945.01** `r15-fam.school-registration::ctx-vienna-authoritarian-1934::milieu-tenement/enrolls` tags: family, child, school, education, school_child, vienna, urban, crisis
  Josef Stein带着Katharina Stein去学校登记。孩子的名字被写在名册最后一行，墨水还没有干；回家的路上，Katharina Stein一直捏着那张课程表，Josef Stein则在算这个月还能剩下多少煤钱。
  _effects: state_parameter raising-child.caregiverBurden 52 -> 45; state_parameter raising-child.schoolProgress 21 -> 20; state_parameter raising-child.childConfidence 57 -> 55; state_parameter raising-child.careDebt 0 -> 0; state_parameter raising-child.schoolEnrolled false -> true; state_parameter raising-child.leftHome false -> false; cash -1 (the first school books and a slate); mood 0.030000000000000027_

- **1945.01** `r13-turn.child-death::ctx-vienna-authoritarian-1934::milieu-tenement::medical-antitoxin-shortage/fire-in-the-flat` tags: family, death, child, grief, health, vienna, urban, crisis
  半夜灶间的炭盆引着了柴堆，Josef Stein被烟呛醒时，Katharina Stein的床已经过不去人。Ferdinand Moser用湿被子裹住Josef Stein，有人从后院翻窗进去，抱出来的孩子已经没有气。消防队天亮才到，站在门口往墙上浇水。
  _effects: cash -12 (小棺材抬过院子); health -0.019999999999999997 (小棺材抬过院子); condition; flag +child_died_in_house_fire; relation friend with person-materialized-world-vienna-1912-95; death (出租屋火灾吸入浓烟)_

- **1945.01** `state_reaction:raising-child/child-death-in-the-household` tags: raising-child, family, child, care, school, household, state, state_reaction
  孩子的名字从学校的名册上被划掉以后，家里的碗还多摆了一副。Josef Stein没有把它收起来，直到有一天发现碗沿积了灰，才拿去洗。
  _effects: state_parameter raising-child.childConfidence 55 -> 25; state_parameter raising-child.caregiverBurden 45 -> 60; mood -0.07000000000000006; flag +lost_child_
  _causes: evt:world-vienna-1912:011269_

- **1945.01** `state_tick:known-affair/public-year/retold` tags: known-affair, love, scandal, secret, public, secret_intimacy, state, state_tick
  Josef Stein在市场上被人叫住，对方笑着说“就是那个人”。Josef Stein也笑了一下，买完土豆就走；回到家才发现，手里的零钱少了一枚。
  _effects: state_parameter known-affair.notoriety 38 -> 46; reputation -0.030000000000000027_

- **1945.01** `state_tick:sm18-missing-object/another-drawer/the-same-question` tags: sm18-missing-object, mystery, object, loss, memory, search, suspicion, everyday
  Josef Stein把同一只抽屉拉开又推上，里面的东西已经按原来的位置摆了三遍。楼下有人搬煤，铁锹刮过石阶；Josef Stein忽然想不起那件东西最后一次被谁拿在手里，只觉得每个人的脸都有一点可疑。
  _effects: state_parameter sm18-missing-object.suspicion 40 -> 48; state_parameter sm18-missing-object.leads 40 -> 38_

- **1945.01** `state_tick:ad20-public-attention/the-attention-cycle/cools` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  Josef Stein发现最近没有人再提那件事。报纸换了头版，邻居也换了话题；本该轻松，Josef Stein却在买菜时反复整理衣领，好像还在等一个不会来的目光。
  _effects: state_parameter ad20-public-attention.attention 46 -> 38; state_parameter ad20-public-attention.sympathy 46 -> 43; state_parameter ad20-public-attention.opportunity 54 -> 52_

- **1945.01** `state_exit:raising-child` tags: raising-child, family, child, care, school, household, state, state_tick
  Josef Stein不再处于「家里有个正在长大的孩子」；条件已经改变。
  _effects: state_remove raising-child state:world-vienna-1912:515; flag -raising_child_active_

- **1945.01** `state_exit:raising-child` tags: raising-child, family, child, care, school, household, state, state_tick
  Josef Stein不再处于「家里有个正在长大的孩子」；条件已经改变。
  _effects: state_remove raising-child state:world-vienna-1912:526_

- **1945.01** `state_expire:p22-scandal-engine` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Josef Stein的「流言发动机」到期；相关安排结束。
  _effects: state_remove p22-scandal-engine state:world-vienna-1912:961_

- **1945.03** `vienna-parish-aid.soup-kitchen/soup-kitchen.leave` tags: faith, parish, mutual_aid, poverty, family
  Josef Stein看见熟人排在前面，帽檐压得低低的，便转身拐进旁边的小巷。Gustav Stein追出来问怎么不领了，Josef Stein说人太多，改天再来。回到屋里，灶是冷的，早上剩的半个土豆还在盘子里。Josef Stein把它切成片，就着水咽下去。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-132; food; relation acquaintance with person-materialized-world-vienna-1912-132_

- **1945.04** `vienna-market-household.friday-fish/friday-fish.buy` tags: home, market, food, social
  六个十字币换来一条鳟鱼和一把欧芹。Josef Stein把鱼煎得两面焦黄，鱼尾巴给了闻着味来的Ferdinand Moser。自家孩子用面包把盘底的黄油擦干净。
  _effects: cash -6 (买鳟鱼和黄油); food; mood 0.07999999999999996; relation acquaintance with person-materialized-world-vienna-1912-95_

- **1945.11** `bc18-crime.inept-blackmail::ctx-vienna-postwar-1945::milieu-hospital/mourning-card` tags: crime, blackmail, photograph, mistake, humiliation, absurd, reputation, vienna
  Gustav Stein在葬礼上偷拍了一张Josef Stein靠着棺材睡着的照片，说只要不给四克朗，就把照片寄给Josef Stein的老板。Josef Stein还没有凑钱，照片先被家里人选去做了悼念卡；亲戚们说，只有真正伤心的人才会累成这样。Gustav Stein拿着底片站在门口，第一次不知道该威胁谁。
  _effects: cash 3 (相馆支付的悼念卡照片使用费); reputation 0.030000000000000027; relation rival with person-materialized-world-vienna-1912-132; condition; flag +blackmail_photo_became_mourning_card; mood 0.020000000000000018_

- **1946.01** `state_expire:known-affair` tags: known-affair, love, scandal, secret, public, secret_intimacy, state, state_tick
  Josef Stein的「已经公开的私情」到期；相关安排结束。
  _effects: state_remove known-affair state:world-vienna-1912:1006; flag -known_affair_active_

- **1946.01** `state_tick:sm18-missing-object/another-drawer/the-same-question` tags: sm18-missing-object, mystery, object, loss, memory, search, suspicion, everyday
  Josef Stein把同一只抽屉拉开又推上，里面的东西已经按原来的位置摆了三遍。楼下有人搬煤，铁锹刮过石阶；Josef Stein忽然想不起那件东西最后一次被谁拿在手里，只觉得每个人的脸都有一点可疑。
  _effects: state_parameter sm18-missing-object.suspicion 48 -> 56; state_parameter sm18-missing-object.leads 38 -> 36; mood -0.030000000000000027_

- **1946.01** `state_tick:ad20-public-attention/the-attention-cycle/cools` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  Josef Stein发现最近没有人再提那件事。报纸换了头版，邻居也换了话题；本该轻松，Josef Stein却在买菜时反复整理衣领，好像还在等一个不会来的目光。
  _effects: state_parameter ad20-public-attention.attention 38 -> 30; state_parameter ad20-public-attention.sympathy 43 -> 40; state_parameter ad20-public-attention.opportunity 52 -> 50; mood -0.010000000000000009_

- **1947.01** `sm18-object.lost-property::ctx-vienna-postwar-1945::milieu-hospital/someone-else-claimed-it` tags: object, loss, office, search, bureaucracy, everyday, vienna, urban
  登记簿上已经有人替这件东西签了字，笔迹很熟。Emil Huber 3说那人自称是失主的亲戚，还准确说出了针扣背面的一道划痕。Josef Stein站在柜台前，忽然想不起自己有没有把这道划痕告诉过别人。
  _effects: state_parameter sm18-missing-object.leads 36 -> 26; state_parameter sm18-missing-object.suspicion 56 -> 71; mood -0.030000000000000027; knowledge “有人替失物签了字，并说出了针扣背面的划痕”; flag +someone_claimed_the_object_first; relation acquaintance with person-materialized-world-vienna-1912-130_

- **1947.01** `state_tick:sm18-missing-object/another-drawer/the-same-question` tags: sm18-missing-object, mystery, object, loss, memory, search, suspicion, everyday
  Josef Stein把同一只抽屉拉开又推上，里面的东西已经按原来的位置摆了三遍。楼下有人搬煤，铁锹刮过石阶；Josef Stein忽然想不起那件东西最后一次被谁拿在手里，只觉得每个人的脸都有一点可疑。
  _effects: state_parameter sm18-missing-object.suspicion 71 -> 79; state_parameter sm18-missing-object.leads 26 -> 24; mood -0.029999999999999916_

- **1947.01** `state_tick:ad20-public-attention/the-attention-cycle/cools` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  Josef Stein发现最近没有人再提那件事。报纸换了头版，邻居也换了话题；本该轻松，Josef Stein却在买菜时反复整理衣领，好像还在等一个不会来的目光。
  _effects: state_parameter ad20-public-attention.attention 30 -> 22; state_parameter ad20-public-attention.sympathy 40 -> 37; state_parameter ad20-public-attention.opportunity 50 -> 48_

- **1947.02** `ad20-public-mistake::ctx-vienna-postwar-1945::milieu-hospital/everyone-saw` tags: public, mistake, shame, everyday, reputation, comic, vienna, urban
  Josef Stein在街口绊了一下，手里的纸包散开，里面的纽扣滚了一地。有人笑，有人弯腰帮忙，一个孩子把纽扣含进嘴里又吐出来。Josef Stein蹲在地上捡，越捡越觉得所有人都在看自己的后脑勺。
  _effects: state_add ad20-public-attention state:world-vienna-1912:1284; reputation -0.040000000000000036; flag +public_mistake; knowledge “纽扣滚了一地，整条街都看见了。”_

- **1947.09** `vienna-housing-move.sublet-room/sublet-full` tags: housing, home, rent, family, money, household
  Josef Stein把床上的旧褥子重新铺平，Emil Bauer 2放下自己的铺盖卷，从怀里掏出一把钥匙看了看。厨房里多了一口人的碗，灶边的煤省着烧也够。Gustav Stein在门口看了一眼，没多话。
  _effects: cash 4 (出租空床收进的月租); household; relation acquaintance with person-materialized-world-vienna-1912-132_

- **1947.10** `oj18-mortuary.first-body::ctx-vienna-postwar-1945::milieu-hospital/coffin-coop` tags: death, mortuary, funeral, work, odd_job, night, everyday, vienna
  师傅Emil Bauer 2把一块冷毛巾塞进Josef Stein手里，让Josef Stein先擦死者的脸，再擦自己的。殡葬合作社的规矩写在门背后：先入殓，后结账；无名者也要有一块写着日期的木牌。Josef Stein做完第一具，手抖得点不着烟。
  _effects: organization_found 圣马克斯殡葬合作社 (other); position 入殓工 @mortuary:person-materialized-world-vienna-1912-53-evt:world-vienna-1912:013134; state_add oj18-odd-apprenticeship state:world-vienna-1912:1285; cash 1 (first mortuary wages); skill; flag +mortuary_worker; knowledge “殡葬合作社的规矩：先入殓，后结账；无名者也要有一块日期木牌。”; role; flag +odd_job_apprentice_

- **1948.01** `state_expire:sm18-missing-object` tags: sm18-missing-object, mystery, object, loss, memory, search, suspicion, everyday
  Josef Stein的「一件说不清下落的东西」到期；相关安排结束。
  _effects: state_remove sm18-missing-object state:world-vienna-1912:1033; flag -something_is_missing_

- **1948.01** `state_expire:ad20-public-attention` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  Josef Stein的「被看见的日常」到期；相关安排结束。
  _effects: state_remove ad20-public-attention state:world-vienna-1912:1034; flag -public_attention_active_

- **1948.01** `state_expire:ad20-public-attention` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  Josef Stein的「被看见的日常」到期；相关安排结束。
  _effects: state_remove ad20-public-attention state:world-vienna-1912:1284_

- **1948.01** `state_tick:oj18-odd-apprenticeship/strange-year/learned-the-building` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  又过了一个冬天，Josef Stein能从楼梯的响声判断是谁在值夜，也能从煤气灯的颜色判断哪一段管道该修。师傅把巡查路线改了三次，最后仍然照Josef Stein画的那张走；两个人都没有提这件事。
  _effects: state_parameter oj18-odd-apprenticeship.trust 25 -> 35; state_parameter oj18-odd-apprenticeship.strangeKnowledge 25 -> 35; state_parameter oj18-odd-apprenticeship.nightsWorked 0 -> 24; cash 2 (night-shift wages); skill_

- **1948.08** `p9-work-transport.strike-rumor/strike-rumor-sign` tags: work, factory, railway, transport, shift, labour, strike, rumor
  下班后Josef Stein沿着玛利亚希尔夫大街走到工会活动室，屋里烟雾腾腾，木椅上坐满了人。Emil Bauer念了几条要求，每小时加两赫勒，每班有固定的休息。Josef Stein在名单上签了字，捐了二十赫勒进罢工箱，但没答应站到队伍最前面去。
  _effects: cash -0.2 (捐给罢工箱的钱); skill_

- **1949.01** `curse15-betrayal.signature::ctx-vienna-postwar-1945::milieu-tenement/the-files-went-first` tags: betrayal, office, power, politics, curse, institution, vienna, urban
  Emil Bauer 2先把Josef Stein抽屉里的往来信件搬空，再在会议上说Josef Stein从来没有保存过记录。没有人能证明那些信存在过，除了Josef Stein自己。散会后，有人让Josef Stein回家休息几天，工资照发。Josef Stein知道这不是照顾，是让Josef Stein别再回来。
  _effects: reputation -0.030000000000000027; relation rival with person-materialized-world-vienna-1912-86; knowledge “我经手的信件在会议前被人搬空了。”; condition; flag +records_removed_