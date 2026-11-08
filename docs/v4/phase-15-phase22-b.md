# Phase 15 life dossier — phase22-b

Date: 2026-11-08T18:11:11.359Z  |  45 years  |  17950 events  |  294 named persons  |  136 alive  |  70 s

State facts: 4954 events, 2677 ticks, 1318 reactions, 28 transitions. Active 186, ended 1353. Positions 102.

Critique: **pass** — warn:high_repetition.

## Klara

Born 1912.01, died 1953.01 (age 41).
Education: apprenticeship 0; occupation: none; roles: infant, child, apprentice, partner, office:公共礼仪官, emergency_admission, watched_by_police, office:夜校同学会会长, displaced_person, denouncer, office:联络员, medicine_seeker, office:发起人.

### State snapshot
- wish-power [person] (ended 1953.1: owner_died) parameters={"intensity":0.75,"fixation":0.66,"irony":0.3} links={} ticks=0
- p22-family-legend [person] (ended 1912.2: replaced_by:p22-family-legend) parameters={"warmth":65,"secrecy":10,"danger":5,"promise":45} links={} ticks=0
- p22-family-legend [person] (ended 1917.1: duration expired) parameters={"warmth":75,"secrecy":20,"danger":8,"promise":42} links={} ticks=3
- yf18-first-awakening [person] (ended 1927.1: duration expired) parameters={"intensity":50,"nerve":15,"talk":0,"reciprocated":false,"secret":true} links={"beloved":"Hermann Berg"} ticks=1
- yf18-first-awakening [person] (ended 1929.1: duration expired) parameters={"intensity":68,"nerve":19,"talk":17,"reciprocated":true,"secret":true} links={"beloved":"Berta Huber 2"} ticks=3
- stage-sovereign [person] (ended 1931.1: duration expired) parameters={"production":"市庆游行","role":"节日国王","publicBelief":25,"costumeQuality":55,"scandal":0,"performances":0} links={} ticks=1
- stage-king [person] (ended 1933.1: duration expired) parameters={"role":"被处决的国王","audience":400} links={} ticks=1
- stage-king [person] (ended 1937.1: duration expired) parameters={"role":"被误认的部长","audience":12} links={} ticks=1
- ad20-public-attention [person] (ended 1939.1: duration expired) parameters={"attention":28,"sympathy":48,"danger":10,"opportunity":52} links={} ticks=3
- oj18-odd-apprenticeship [person] (ended 1940.1: duration expired) parameters={"trust":29,"strangeKnowledge":36,"reliability":55,"nightsWorked":24,"post":"动物园夜班饲养员"} links={} ticks=3
- stage-king [person] (ended 1942.1: duration expired) parameters={"role":"被误认的部长","audience":12} links={} ticks=1
- curse-bargain [person] (ended 1944.1: duration expired) parameters={"request":"借一个位置","price":1,"doubt":25,"sealed":true} links={} ticks=1
- under-investigation [person] (ended 1944.1: duration expired) parameters={"progress":25,"charge":"撬门入室"} links={} ticks=2
- curse-bargain [person] (ended 1945.1: duration expired) parameters={"request":"借一个位置","price":1,"doubt":30,"sealed":true} links={} ticks=1
- political-suspect [person] (ended 1950.1: the file became an arrest) parameters={"heat":0.85,"file":"运动内部审查"} links={} ticks=2
- debt-bondage [person] (ended 1951.1: duration expired) parameters={"debt":28,"creditor":"死者家属"} links={} ticks=3
- detained [person] (ended 1950.7: 起诉撤回，拘留结束) parameters={"charge":"政治嫌疑","months":6} links={} ticks=0
- office-under-siege [person] (ended 1952.1: duration expired) parameters={"exposure":40,"support":45,"months":0,"cause":"double invoiced paper","positionId":"pos:org:r15-faction:evt:world-vienna-1912:013254:发起人:13254"} links={} ticks=1
- bc18-ridiculous-fame [person] (ended 1953.1: owner_died) parameters={"notoriety":22,"legitimacy":7,"absurdity":50,"invitations":0,"boredom":20,"officialStory":"在葬礼上睡着的哀悼者"} links={} ticks=1

### 179 subject events

- **1912.02** `p22-comic-christening::ctx-vienna-1912::milieu-tenement/the-priest-sneezes` tags: infancy, family, christening, church, neighbor, comic, tender, drama
  神父念到孩子的名字时打了个大喷嚏，蜡烛灭了，Klara却笑出了声。Hermann Kral赶紧去点蜡烛，手一抖，火苗又灭了；教堂里第一次有人笑，神父也笑了，说这是今天最响的一声阿门。
  _effects: mood 0.03999999999999998; relation acquaintance with person-phase15-Klara-world-vienna-1912; flag +christening_sneeze; state_add p22-family-legend state:world-vienna-1912:16_

- **1912.02** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Klara家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 10 -> 14; state_parameter p22-family-legend.warmth 70 -> 72; mood 0.01_
  _causes: evt:world-vienna-1912:000100_

- **1912.12** `p22-comic-name-register::ctx-vienna-1912::milieu-tenement/the-clerk-hears-a-sneeze` tags: infancy, family, bureaucracy, name, official, comic, tender, drama
  登记员把Klara打喷嚏的声音当成了名字，低头就写，笔尖还在舌头上蘸了蘸。Josef Bauer抱着孩子，没看见那行字；等到拿着纸回家，才发现孩子的名字里多了一个“嚏”。
  _effects: mood 0.04000000000000001; knowledge “登记簿上孩子的名字被写成了喷嚏声。”; flag +registered_as_hatschi; state_add p22-family-legend state:world-vienna-1912:15_

- **1913.01** `vienna-life-infant-first-smile/smile-at-the-lamp` tags: infancy, family, first, warm
  Josef Bauer把Klara抱到窗边，煤汽灯罩上有一圈晃动的光。孩子盯着看了很久，忽然笑出声，口水滴在Josef Bauer的袖口上。屋里的人都停了一下，像是听见了什么了不起的消息。
  _effects: mood 0.04000000000000001; health 0.009999999999999898 (a good day)_

- **1913.01** `state_tick:p22-family-legend/the-story-changes-hands/a-detail-goes-missing` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，故事里最要紧的那件东西不见了：先是名字，后来是地点。Klara问起时，大人说“你记错了”；可柜子最底层那只空盒子，谁也没有扔，锁却换过了，钥匙也不见了。
  _effects: state_parameter p22-family-legend.secrecy 14 -> 18; state_parameter p22-family-legend.danger 5 -> 8; state_parameter p22-family-legend.warmth 72 -> 70; mood -0.01_

- **1913.02** `vienna-life-toddler-first-words/first-word-door` tags: infancy, family, first, comic
  门外有人上楼，Klara忽然指着门说：“爸爸。”Josef Bauer看了看空门口，没有纠正。那天晚上，孩子把家里每个人的名字都叫了一遍，叫错两个，却叫得很认真。
  _effects: skill; mood 0.020000000000000018; flag +first_word_door_

- **1913.05** `statistical_infection`
  Klara在Bauer-Wohnung, Leopoldstadt病倒了，肺炎让身体发热、虚弱，接下来的日子只能卧床。

- **1913.06** `statistical_illness_worsened`
  Klara的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1913.06** `iw18-infancy.ceiling-shadows::ctx-vienna-1912::milieu-tenement/the-shadow-bows` tags: infancy, night, wonder, gaslight, fear, family, vienna, urban
  煤气灯芯拧到最小，天花板上一件挂着的大衣被风推得晃了晃。Klara躺在摇篮里忽然笑出声，朝那片影子伸出两只手。Josef Bauer抬头看了很久，只看见衣钩和一块掉漆的墙皮。
  _effects: mood 0.020000000000000018; flag +laughed_at_ceiling_shadow_

- **1913.09** `statistical_recovery`
  Klara从肺炎中慢慢恢复，能下床喝水，但身体还虚弱。

- **1914.01** `vienna-life-toddler-wrong-cradle/the-blanket-is-wrong` tags: infancy, family, rumour, identity, comic, drama
  Hermann Kral盯着Klara的摇篮看了很久，说这床蓝被子不是这家人的。Josef Bauer把被子翻过来，角落绣着一个陌生的姓；Klara却抓着被角不放，像是认得它。Hermann Kral退后一步，说“我什么都没说”。
  _effects: flag +wrong_cradle_blanket; knowledge “摇篮里的蓝被子绣着一个陌生的姓。”; mood -0.030000000000000027_

- **1915.01** `state_tick:p22-family-legend/the-story-changes-hands/told-at-the-table` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，Klara家的故事在饭桌上换了新的讲法：多了一句笑话，少了一处哭声。听的人把汤匙放下，等下一句；讲故事的人却先去看窗子有没有关好，谁也没有先动筷子。
  _effects: state_parameter p22-family-legend.warmth 70 -> 73; state_parameter p22-family-legend.secrecy 18 -> 16; state_parameter p22-family-legend.promise 40 -> 42; mood 0.01_

- **1916.01** `vienna-life-child-first-friend/shared-toy` tags: childhood, friendship, family, comic
  Emil在楼道里滚一只铁环，Klara站在门口看。Emil把铁环推过来，说“你推一次，我推一次”。两个人从楼梯口推到院子里，铁环倒下的声音把午睡的大人吵醒了一排。
  _effects: skill; mood 0.05_

- **1916.01** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Klara家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 16 -> 20; state_parameter p22-family-legend.warmth 73 -> 75; mood 0.010000000000000002_
  _causes: evt:world-vienna-1912:000599_

- **1916.12** `p9-childhood-household.half-bed/gave-wall-side` tags: childhood, family, household, home, siblings, illness, neighbors, injury
  靠墙那块床板被炉火烘得温乎，Klara把枕头挪到床尾，让Elisabeth Bauer睡进去。门缝底下灌风，Klara把外套压在脚上，半夜还是冻醒了两回。Elisabeth Bauer倒没再滚下床，天亮时Klara的脚踝木得弯不过来，坐在床沿搓了半天。
  _effects: health -0.020000000000000018 (睡床尾受冷风); relation kin with person-elisabeth-bauer_

- **1917.01** `state_expire:p22-family-legend` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  Klara的「家族传说」到期；相关安排结束。
  _effects: state_remove p22-family-legend state:world-vienna-1912:16_

- **1918.01** `p9-gap-childhood-chores.market-line/line-sold-out-potatoes` tags: childhood, household, chores, school, task, daily, market, food
  “卖完了。”三个字从窗口里传出来，Klara后面的队伍立刻散了一半。Klara没走，趴在窗台上看伙计扫面屑，直到人家挥手赶人。旁边摊子的土豆带着泥，Klara用围裙兜住，一枚一枚数铜板，回家报账时连找零都说清了。
  _effects: food; mood -0.03; skill; relation acquaintance with person-materialized-world-vienna-1912-24_

- **1918.06** `iw18-play.kite-on-roof::ctx-klosterneuburg-rural-1912::milieu-tenement/the-kite-takes-the-washing` tags: childhood, play, kite, roof, neighbor, comic, rural, agriculture
  风筝落下来时钩住了晾衣绳，把一条湿床单拖过煤灰。床单的主人从窗口探出头，Klara和Elisabeth Bauer拔腿就跑，跑到街角才发现风筝还挂在绳上。第二天，Klara家的门缝里塞进来一张要赔床单的纸条。
  _effects: cash -1 (a laundry bill for the dirty sheet); reputation -0.02; mood 0.020000000000000004; flag +kite_in_the_washing_

- **1919.01** `p9-gap-childhood-chores.laundry-help/laundry-bread-with-friend` tags: childhood, household, chores, school, task, daily, laundry, work
  Grete Moser 2家的孩子站在绳子另一头，Klara递夹子时故意慢半拍，两个人把床单拉得没有一道褶。收工后Grete Moser 2端出半包隔夜面包，掰开时掉了一桌屑。Klara把分到的那块用围裙兜住，回家路上闻着麦味，硬是没咬。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-3; skill; relation acquaintance with person-materialized-world-vienna-1912-3; relation acquaintance with person-materialized-world-vienna-1912-23_

- **1920.01** `p9-gap-childhood-chores.market-line/line-sold-out-potatoes` tags: childhood, household, chores, school, task, daily, market, food
  “卖完了。”三个字从窗口里传出来，Klara后面的队伍立刻散了一半。Klara没走，趴在窗台上看伙计扫面屑，直到人家挥手赶人。旁边摊子的土豆带着泥，Klara用围裙兜住，一枚一枚数铜板，回家报账时连找零都说清了。
  _effects: food; mood -0.03; skill_

- **1921.01** `p9-gap-childhood-chores.laundry-help/laundry-bread-with-friend` tags: childhood, household, chores, school, task, daily, laundry, work
  两个孩子在院子两头跑，一个递，一个夹，床单在风里鼓起来。最后一条挂好，Grete Kral从厨房拿出面包，先给了自家孩子，再掰一块给Klara。Klara把面包塞进围裙口袋，回家后放在家里人的碗边，说自己在外面吃过了。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-17; skill; relation acquaintance with person-materialized-world-vienna-1912-17; relation acquaintance with person-materialized-world-vienna-1912-30_

- **1922.01** `p9-gap-childhood-chores.market-line/line-half-flour` tags: childhood, household, chores, school, task, daily, market, food
  面粉袋压在胸口，越抱越沉。Klara前面的大婶一直往后靠，Klara就把膝盖顶住对方的篮子，硬留出半步。买到半袋面粉后，Klara的鞋跟留在人堆里，找回来时鞋面全是泥。回家路上布袋换了两次肩，赤脚踩过石板时脚底发麻。
  _effects: food; skill; relation acquaintance with person-materialized-world-vienna-1912-13_

- **1923.01** `p9-gap-childhood-chores.laundry-help/laundry-dragged-docked-pay` tags: childhood, household, chores, school, task, daily, laundry, work
  床单太长，Klara拖着一角往绳子走，布边扫过煤渣，立刻黑了一道。Anton Bauer弯腰看了看，脸沉下来，说这角得重洗，工钱扣一半。Klara接过一赫勒，蹲在盆边用清水搓那一道灰，搓到指节发红，水面上还浮着煤末。
  _effects: cash 0.01 (被扣后只剩一赫勒); mood -0.05; relation acquaintance with person-materialized-world-vienna-1912-6; relation acquaintance with person-materialized-world-vienna-1912-6_

- **1925.01** `r13-edu.school-transfer::ctx-vienna-reform-1930::milieu-tenement/old-school-withholds-papers` tags: education, school, transfer, bureaucracy, family, reform, medical, schooling
  Klara等到学期过了一半，转学证还没有下来。原来旧学校不肯放人，说Klara欠着图书费。Klara把借的书一本本找齐还回去，管理员却找不到借书卡，最后Klara自己写了一张收据，按了手印。那张收据按上手印后，管理员才从抽屉里找出借书卡，说早就在这里了。
  _effects: cash -1 (跨区转学的居住证明); mood -0.05_

- **1926.01** `r13-edu.school-transfer::ctx-vienna-reform-1930::milieu-tenement/transfer-approved` tags: education, school, transfer, bureaucracy, family, reform, medical, schooling
  Klara的转学材料缺一张居住证明，Gustav Berg让Klara去区公所补。Klara跑了三趟，第三趟正赶上下雨，Gustav Berg看见Klara把湿透的纸一张张摊在柜台上，没再挑毛病，盖了章。Klara赶在开学前一天把名字写进新学校。那间教室在二楼，Klara第一天就找到了靠窗的座位，把旧课本摆好。
  _effects: flag +school_transfer_approved_

- **1926.02** `yf18-body.danube-cabin::ctx-vienna-reform-1930::milieu-tenement/wade-in-first` tags: body, desire, river, swimming, shame, first_love, reform, medical
  多瑙河的浴棚按男女分开，木板缝里能看见对面的人影。Klara穿着借来的毛线泳衣，站在第三间门口不敢下水；Hermann Berg从水里冒出来，头发贴在额头上，说水不冷。Klara走进河里时，满脑子都是自己肋骨上那道疤。
  _effects: state_add yf18-first-awakening state:world-vienna-1912:151; health 0.019999999999999997 (cold river water and a long swim); relation friend with person-materialized-world-vienna-1912-51; mood 0.03; relation acquaintance with person-materialized-world-vienna-1912-51; flag +yf18_first_awakening_active_

- **1926.03** `r13-turn.school-leaving::ctx-vienna-reform-1930::milieu-tenement::reform-leaving-age/signed-apprenticeship` tags: education, school, work, family, transition, reform, medical, schooling
  毕业钟敲过三下，Marie Huber把成绩单按在讲台上，说Klara还能再读一年，只要家里肯出四克朗。家里人在走廊里把学徒契约展开，纸角还带着面粉。Klara签了名，第二天就站到刨床前，手指上多了第一道木刺。
  _effects: cash -2 (毕业钟响过以后); flag +left_school_for_apprenticeship; role; education apprenticeship_

- **1926.09** `yf18-body.danube-cabin::ctx-vienna-reform-1930::milieu-tenement/wade-in-first` tags: body, desire, river, swimming, shame, first_love, reform, medical
  多瑙河的浴棚按男女分开，木板缝里能看见对面的人影。Klara穿着借来的毛线泳衣，站在第三间门口不敢下水；Berta Huber 2从水里冒出来，头发贴在额头上，说水不冷。Klara走进河里时，满脑子都是自己肋骨上那道疤。
  _effects: state_add yf18-first-awakening state:world-vienna-1912:184; health 0.019999999999999997 (cold river water and a long swim); relation friend with person-materialized-world-vienna-1912-56; mood 0.03; relation acquaintance with person-materialized-world-vienna-1912-56_

- **1927.01** `state_expire:yf18-first-awakening` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Klara的「第一次心动」到期；相关安排结束。
  _effects: state_remove yf18-first-awakening state:world-vienna-1912:151; flag -yf18_first_awakening_active_

- **1927.01** `state_tick:yf18-first-awakening/half-year-of-glances/talked-about` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Klara只把Berta Huber 2的名字写在一张草稿纸背面，第二天那张纸就在教室后排传了一圈。有人把名字念出来，有人问Klara是不是要请人喝咖啡；Klara说那是表姐的名字，声音大得连自己都吓了一跳。
  _effects: state_parameter yf18-first-awakening.talk 5 -> 17; state_parameter yf18-first-awakening.nerve 7 -> 1; reputation -0.030000000000000002; mood -0.029999999999999992_

- **1927.01** `r13-civ.carry-message::ctx-vienna-reform-1930::milieu-tenement/swallowed-message` tags: politics, courier, message, risk, underground, reform, medical, schooling
  Gustav Berg已经走到Klara面前，Klara把揉成团的车票连信封一起塞进嘴里，干咽下去。Gustav Berg捏住Klara的下巴，看了半天，只看见一嘴纸屑。Berta Bauer在人群里转过身，慢慢走远。
  _effects: health -0.019999999999999997 (电车上的信封); reputation 0.05; flag +swallowed_message_under_search; knowledge “the message was destroyed before the officer could read it”; relation acquaintance with person-materialized-world-vienna-1912-52_

- **1927.02** `yf18-firstlook.parish-dance::ctx-vienna-reform-1930::milieu-tenement/friend-cuts-in` tags: first_love, dance, church, courtship, jealousy, reform, medical, schooling
  Josef在第二支曲子前把Elisabeth Bauer请走，说Klara答应过要替她看管外套。Klara抱着一件不属于自己的大衣站在圣像下面，看他们在蜡烛光里转圈；回家路上，Klara把舞卡撕成小片，扔进多瑙运河。
  _effects: state_parameter yf18-first-awakening.intensity 50 -> 55; state_parameter yf18-first-awakening.nerve 15 -> 7; state_parameter yf18-first-awakening.talk 0 -> 5; mood -0.04_

- **1927.04** `r1-cul.fan-letter::ctx-vienna-reform-1930::milieu-tenement/quoted-without-permission` tags: culture, letters, fandom, literacy, ambition, reform, medical, schooling
  Klara的信寄出半年，没有回音。后来Anna Huber在一篇文章里引用了这封信，没有署名，只写一个读者说。Klara在报上读到自己的句子，先是高兴，随后发现文章里的意思和自己写的相反。
  _effects: mood -0.08000000000000002; reputation 0.03; flag +letter_quoted_without_permission; relation acquaintance with person-materialized-world-vienna-1912-46; knowledge “the quoted sentence means the opposite of what was written”; relation acquaintance with person-materialized-world-vienna-1912-46; relation acquaintance with person-materialized-world-vienna-1912-43_

- **1928.01** `yf18-firstlook.parish-dance::ctx-vienna-reform-1930::milieu-tenement/the-second-dance` tags: first_love, dance, church, courtship, jealousy, reform, medical, schooling
  舞卡上第一支曲子被Elisabeth Bauer写走了。Klara在教会礼堂的木地板上踩错了两步，Elisabeth Bauer说没关系，把手放回Klara背后；第三支曲子响起时，Josef在门口冲Klara比了个手势，Klara假装没看见。
  _effects: state_parameter yf18-first-awakening.intensity 55 -> 63; state_parameter yf18-first-awakening.nerve 1 -> 11; state_parameter yf18-first-awakening.reciprocated false -> true; mood 0.04_

- **1928.01** `state_tick:yf18-first-awakening/half-year-of-glances/answered-glance` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Klara在教堂门口或学校走廊里又遇见Berta Huber 2。这一次对方先点了头，Klara准备好的整段话全忘了，只把手里的书换到另一只手上；回家后Klara才发现，自己把书拿倒了。
  _effects: state_parameter yf18-first-awakening.intensity 63 -> 68; state_parameter yf18-first-awakening.nerve 11 -> 19; state_parameter yf18-first-awakening.reciprocated true -> true; relation friend with person-materialized-world-vienna-1912-56; mood 0.03_

- **1928.01** `r13-civ.first-aid-course::ctx-vienna-reform-1930::milieu-tenement/course-cancelled` tags: health, first_aid, course, skill, school, reform, medical, schooling
  Elisabeth Bauer 2来了两次，第三次教室门锁着，黑板上写着“课程暂停”。Klara和Elisabeth Bauer在走廊里等了一刻钟，最后把绷带卷带回教室，互相缠着玩。
  _effects: mood -0.04999999999999999; flag +first_aid_course_cancelled; relation acquaintance with person-materialized-world-vienna-1912-14_

- **1928.02** `state_reaction:wish-power/power-humiliation` tags: wish-power, wish, wish:power, power, status, ambition, state, state_reaction
  Klara把那句轻视记了很久。它没有变成一个决定，但也没有消失。
  _effects: mood -0.1; flag +wish:power:fixated_on_revenge_
  _causes: evt:world-vienna-1912:003451_

- **1929.01** `state_expire:yf18-first-awakening` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Klara的「第一次心动」到期；相关安排结束。
  _effects: state_remove yf18-first-awakening state:world-vienna-1912:184_

- **1929.01** `p9-childhood-youth-aspiration.ask-a-mentor/weekly-lesson` tags: adolescence, education, aspiration, school, books, club, exam, task
  Otto Lechner 2把老花镜往鼻梁上推了推，让Klara用食指在字盘空位上比画。咖啡馆伙计来续水时，老人把字母表折起来，说下星期带旧字样本来看。
  _effects: skill; relation acquaintance with person-materialized-world-vienna-1912-39; flag +typesetting_mentor; mood 0.06; relation acquaintance with person-materialized-world-vienna-1912-39_

- **1930.01** `absurd15-wish.crown-for-a-day::ctx-vienna-reform-1930::milieu-tenement/festival-king-only` tags: wish, power, crown, office, irony, festival, reform, medical
  代表团没有带来任命书，只带来一套戏服：市庆游行需要一个“国王”，一天两场，管一顿饭。Klara穿上戏服时，围观的人鼓起掌来。掌声是真的，王冠是假的，晚饭也是真的。
  _effects: state_add stage-sovereign state:world-vienna-1912:280; cash 2 (游行演出的酬劳); flag +hired_as_festival_king; relation acquaintance with person-materialized-world-vienna-1912-26; flag +stage_sovereign; reputation 0.04000000000000001_

- **1930.01** `state_reaction:wish-power/power-office` tags: wish-power, wish, wish:power, power, status, ambition, state, state_reaction
  Klara坐在那张有权力的桌子后面，签下自己的名字。愿望没有因此变近，但桌上的纸张、印章和等待回话的人，都变得具体了。
  _effects: reputation 0.06; flag +wish:power:has_tasted_office_
  _causes: evt:world-vienna-1912:004170_

- **1930.01** `p9-social-relationship-initiative.invite-to-theatre/unsigned-note` tags: courtship, friendship, family, social, initiative, housing, task, task:social
  开口成了问路，对方指完方向就转身去整理那叠乐谱。当晚有人坐在租来的房间里，把一张信纸写了撕、撕了写，最后只剩一句“星期天下午剧院有楼座”，没有署名，信封上写了书店的地址，邮票六赫勒。第二天投进街角的邮筒，此后三天经过书店都绕着走。
  _effects: cash -0.12 (邮票和信纸); mood -0.05000000000000002; relation acquaintance with person-materialized-world-vienna-1912-72; relation acquaintance with person-materialized-world-vienna-1912-72; relation acquaintance with person-materialized-world-vienna-1912-18_

- **1930.02** `vienna-housing-move.flat-viewing/flat-viewing-too-damp` tags: housing, home, rent, family, money
  Klara在单间里站了一刻钟，脚底发潮，墙纸底下透出一股霉味。看门人说刷一层石灰就好，Grete Hofer却在门口轻轻咳了一声，提醒这背面没有阳光。Klara把定金收回口袋，谢过看门人，宁可多付三克朗，也不愿把湿气带进夜里。
  _effects: mood -0.01999999999999999; relation acquaintance with person-materialized-world-vienna-1912-36; flag +still_looking_for_room; relation acquaintance with person-materialized-world-vienna-1912-36_

- **1930.02** `p9-gap-adult-unemployed.soup-kitchen/soup-pot-empty` tags: adulthood, unemployment, casual_labour, poverty, daily, relief, food, church
  锅底刮出焦味，Gustav Berg说今天就这些了，明天赶早。Klara把空罐子夹在腋下往回走，石板路上结了薄冰，Josefine Hofer在拐角等着，二话没说把罐子递过来。
  _effects: food; relation acquaintance with person-josefine-hofer_

- **1931.01** `absurd15-wish.crown-for-a-day::ctx-vienna-reform-1930::milieu-tenement/the-delegation-never-comes` tags: wish, power, crown, office, irony, festival, reform, medical
  Klara等了一整天，代表团没有来。傍晚，Klara在窗户里看见游行队伍从街口经过，新的“国王”骑着借来的白马，朝人群挥手。Klara把订做的戏服退掉，押金没有拿回来。
  _effects: cash -2 (订做戏服的押金); mood -0.03999999999999998; flag +wish_crown_failed_

- **1931.01** `state_expire:stage-sovereign` tags: stage-sovereign, performance, theatre, pretend, status, irony, power, no-real-authority
  Klara的「舞台上的君主」到期；相关安排结束。
  _effects: state_remove stage-sovereign state:world-vienna-1912:280; flag -stage_sovereign_

- **1931.01** `p10-edu-work-tasks.qualification-exam/p10-edu-work-tasks.qualification-exam.failed` tags: adulthood, education, work, task, night_school, apprenticeship, career, exam
  考前一天他在厂里加班到十点，第二天头脑发沉，复利题算错一道，连错三步。成绩下来四门只剩一门及格，报名费不退。Gustav Kral 2把卷子还给他，说那道题错在第一步，他盯着自己的字没吭声。
  _effects: cash -5 (报名费不退，考试未过); mood -0.10000000000000003; skill; relation acquaintance with person-materialized-world-vienna-1912-73_

- **1932.01** `r15-wish.power-offer::ctx-vienna-reform-1930::milieu-tenement/stage-understudy` tags: politics, power, wish, office, status, reform, medical, schooling
  正式职位没有落到Klara头上，但剧院正在排一出关于权力的戏。Gustav Berg说Klara的形象合适，可以在舞台上扮演那位即将被处决的国王。
  _effects: state_add stage-king state:world-vienna-1912:368; reputation 0.05000000000000002; relation acquaintance with person-materialized-world-vienna-1912-35; flag +stage_king; reputation 0.04000000000000001_

- **1932.01** `p9-work-jobsearch.railway-depot/railway-depot.no-baptism` tags: work, job_search, negotiation, wages, employment, task, railway, depot
  教区的办事员翻了很久簿子才开出证明，纸上的墨还没干透。Klara一路攥着往南站赶，月台上卸货的人已经排成两行，他站在队尾，听人说上午就招满了。
  _effects: cash -1 (往返教区的车钱); mood -0.07; flag +seeking_work; relation acquaintance with person-materialized-world-vienna-1912-28_

- **1932.04** `vienna-tenement-neighbors.laundry_line_dispute/neighbor_yanks_clothes` tags: home, social, family, housing
  Alois Weiss嫌Klara的床单滴水滴到Alois Weiss家衬衫上，一把扯下床单扔在院子的石板上。Klara下楼捡起来时，床单角沾了泥，重洗又要费肥皂。两人在院子当中对喊，楼上有人推开窗看热闹。Klara把床单重新搭上绳子时，故意把水拧在Alois Weiss那侧。
  _effects: relation rival with person-materialized-world-vienna-1912-49; cash -0.15 (重洗床单的肥皂钱); relation acquaintance with person-materialized-world-vienna-1912-49_

- **1932.06** `p9-social-tenement-neighbors.stove-and-line/stove-and-line.first-come-order` tags: housing, neighbors, tenement, daily, money, reputation
  Klara把四只洗衣盆按到厨房的先后排成一列，用粉笔在门后写下各家的时辰：六点到七点半、七点半到九点。Friedrich Hofer起初嘟囔，看到自家名字排在第二格，也就把水壶提了回去。晾衣绳按同样次序分两段，谁家的床单先上谁先占。
  _effects: mood 0.03999999999999998; relation acquaintance with person-materialized-world-vienna-1912-53_

- **1933.01** `state_reaction:wish-power/power-office` tags: wish-power, wish, wish:power, power, status, ambition, state, state_reaction
  Klara坐在那张有权力的桌子后面，签下自己的名字。愿望没有因此变近，但桌上的纸张、印章和等待回话的人，都变得具体了。
  _effects: reputation 0.06_
  _causes: evt:world-vienna-1912:005262_

- **1933.01** `absurd15-wish.crown-for-a-day::ctx-vienna-reform-1930::milieu-tenement/the-delegation-never-comes` tags: wish, power, crown, office, irony, festival, reform, medical
  Klara等了一整天，代表团没有来。傍晚，Klara在窗户里看见游行队伍从街口经过，新的“国王”骑着借来的白马，朝人群挥手。Klara把订做的戏服退掉，押金没有拿回来。
  _effects: cash -2 (订做戏服的押金); mood -0.03999999999999998_

- **1933.01** `state_expire:stage-king` tags: stage-king, performance, theatre, status, irony, state, state_tick, state:stage-king
  Klara的「舞台上的国王」到期；相关安排结束。
  _effects: state_remove stage-king state:world-vienna-1912:368; flag -stage_king_

- **1933.01** `r13-civ.clinic-first-visit::ctx-vienna-reform-1930::milieu-tenement/dismissed-as-nerves` tags: health, clinic, queue, diagnosis, institution, reform, medical, schooling
  Klara把夜里咳醒的次数写在一张包装纸上，Gustav Kral 2扫了一眼，说是心事太重，给了几包安神粉。走廊尽头的护士压低声音，说住院部还有空床，但要医生签字。Klara把包装纸折回去，没再问。
  _effects: cash -1 (诊所走廊的第三张长凳); mood -0.08000000000000002; flag +clinic_dismissed_as_nerves; knowledge “the clinic doctor refused a hospital referral”_

- **1933.07** `vienna-courtship-courtyard.sunday-walk/part-at-arch` tags: adulthood, courtship, partner, social, family
  走到桥洞前，Marie Huber说该往回走了，家里炉子还没生。Klara站在原地看着Marie Huber拐上台阶，围巾的一角被风掀起来；下周的事谁也没有提，两人就此分开，口袋里只剩一颗凉透的栗子。
  _effects: mood -0.050000000000000044; flag +uncertain_courtship_

- **1933.11** `p9-gap-adult-solitude.river-walk/river-walk.far` tags: adulthood, daily, solitude, ordinary, home, walk, river
  Klara顺着河岸一直走，走过铁路桥又走回来，天已经黑透。回来时脚底发热，袜子磨在脚背上，她一路数着路灯走完最后一段巷子，进门先坐下脱了鞋。
  _effects: mood 0.050000000000000044_

- **1934.01** `r15-wish.found-faction::ctx-vienna-authoritarian-1934::milieu-tenement/nobody-came` tags: politics, power, wish, organization, office, status, vienna, urban
  第一次会议只来了三个人，其中一个是房东，来问房租。Klara把章程念完，没有人反对，也没有人加入。办公室的钥匙还在，但那间屋子比街上更安静。
  _effects: mood -0.07999999999999996; reputation -0.020000000000000018; flag +faction_failed_to_form_

- **1934.01** `r13-fam.ask-neighbour-help::ctx-vienna-authoritarian-1934::milieu-tenement/borrowed-coal` tags: task, social, neighbor, help, poverty, vienna, urban, crisis
  Klara把空煤筐拎到隔壁门口，说只借一筐，等手头松了就还。Ferdinand Kraus看了看筐底的锈，进屋铲了半筐，又从灶边拿了两块引火的柴。Klara道谢时，Ferdinand Kraus说这条走廊里借东西要记着，不是记在纸上。
  _effects: food; condition; flag +borrowed_coal_from_neighbour; relation friend with person:evt:world-vienna-1912:000198:child_

- **1934.09** `vienna-courtship-courtyard.breakup/courtyard-quarrel` tags: adulthood, courtship, partner, social, family, separation
  话没说完就变成了争。Hermann Kral 2把外套扔在晾衣杆下，Klara说了一句不中听的，声音大得整院都听见。Anna Bauer在三楼把窗开了一条缝，看完了全程，第二天院子里人人都知道；这一架把两个人的关系吵断了，也把Klara的名字在院子里吵薄了一层。
  _effects: relation_end partner with person-materialized-world-vienna-1912-81; reputation -0.07; relation acquaintance with person-anna-bauer; mood -0.09999999999999998_

- **1934.12** `p9-social-family-conflict-care.sibling-medicine-bill/refuse-push-bill` tags: family, care, siblings, inheritance, housing, money
  Klara把药费单从糖罐底下抽出来，对折，推回桌子中央，说上个月的工钱已经贴过煤钱，这回一个赫勒也拿不出。Anna Bauer的脸沉下来，练习本翻得哗哗响，最后把单子重新压回糖罐底下，起身去够门后的外套。三只咖啡杯里的渣子凉在桌上，兄妹这一回把话都说薄了。
  _effects: relation kin with person-anna-bauer; mood -0.040000000000000036_

- **1935.01** `vienna-family-childbirth/son-born` tags: family, childbirth, death, lifecycle, birth, state, state:raising-child, raising-child
  Klara在Leopoldstädter Zinshaus, gemeinsamer Gang生下一个男婴，取名Otto 2。工友凑的钱抵了一部分，家里还是从糖罐里数出六克朗给接生的人；Hermann Kral 2把消息带到工厂，回来时把唯一的摇篮重新刷了一遍，Klara躺在床上出了一身虚汗。
  _effects: birth male; cash -6 (midwife fee（其中6克朗记入债务）); state_add raising-child state:world-vienna-1912:491_

- **1935.01** `absurd15-wish.crown-for-a-day::ctx-vienna-authoritarian-1934::milieu-tenement/real-tiny-office` tags: wish, power, crown, office, irony, festival, vienna, urban
  一个市民代表团真的来到Klara门口，带来一份任命书：公共礼仪官，负责节庆、吊唁和接待。职位不大，薪水也不高，但上面有印章，有任期，有一间可以锁门的办公室。Klara把任命书读了三遍，才确认这不是戏票。
  _effects: organization_found 市民礼仪处 (state); position 公共礼仪官 @org:absurd15-wish-office:evt:world-vienna-1912:006265; reputation 0.08000000000000002; mood 0.050000000000000044_

- **1935.01** `kernel-health.task-house-call::ctx-vienna-authoritarian-1934::milieu-tenement::house-call-medical-students/house-call-medical-ambulance` tags: health, task, house_call, care, poverty, vienna, urban, crisis
  助理医生拿不准，叫了救护车。Klara被抬进医院，走廊里等了六个小时才排到床位；家里人后来算了一笔账，救护车比药贵。救护车在石板上颠，他抓着担架边，数着路灯。医院门口的担架已经排到街上。
  _effects: move place-wien-allgemeines-krankenhaus; cash -15 (ambulance and hospital admission（其中15克朗记入债务）); health 0.05 (admitted for observation and oxygen); role; knowledge “实习医生拿不准就会叫救护车；走廊等六个小时才有床，车费比药贵。”; relation acquaintance with person-materialized-world-vienna-1912-86_

- **1935.03** `p9-social-tenement-neighbors.rent-note/rent-note.together-to-office` tags: housing, neighbors, tenement, daily, money, reputation
  Klara和Mitzi Moser叫上楼下两家，一同去房东的事务所。Luise Hofer隔着柜台听他们说完，翻出账簿，答应先补上楼梯间的窗闩，涨租从下下个月起算。四人出门时挤在台阶上，谁也没先说话，Mitzi Moser把帽子往后一推，说总算没白跑。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-24; mood 0.050000000000000044; relation acquaintance with person-materialized-world-vienna-1912-34_

- **1935.06** `vienna-housing-move.moving-day/moving-day-sell-up` tags: housing, home, rent, family, money
  床架从楼梯上拖下来时油漆蹭掉了好几块，Klara站在旁边没作声。收破烂的走后，屋里空得回声都变大了，Klara抱着铁盒出门，只把门锁好，钥匙从看门人手里交出去。
  _effects: cash 2 (卖掉旧床架和桌子收进的钱); mood -0.030000000000000027_

- **1935.09** `statistical_infection`
  Klara在Allgemeines Krankenhaus病倒了，肺结核让身体发热、虚弱，接下来的日子只能卧床。

- **1935.12** `statistical_illness_worsened`
  Klara的肺结核没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1935.12** `vienna-parish-aid.rent-box/rent-box.accept-all` tags: faith, parish, mutual_aid, poverty, family
  煤袋落在台阶上，扬起细细一层黑末。Mitzi Moser用铅笔头在蓝格册上写门牌号，问房东姓什么，又叮嘱别把面包票弄丢。灶上水壶开始叫，Klara才想起屋里连只干净的杯子都没有。
  _effects: cash 6 (互助会补上本月房租差额); food; relation acquaintance with person-materialized-world-vienna-1912-24; flag +parish_registered_

- **1936.01** `r15-wish.power-offer::ctx-vienna-authoritarian-1934::milieu-tenement/mistaken-identity` tags: politics, power, wish, office, status, vienna, urban, crisis
  一个代表团走错了房间，把Klara当成新来的部长，围着说了十分钟的请求。Klara没有纠正。等人走后，Klara坐在那张不属于自己的椅子上，听见走廊里有人在找真正的部长。
  _effects: mood 0.020000000000000018; reputation 0.03999999999999998; state_add stage-king state:world-vienna-1912:547; flag +mistaken_for_official; relation acquaintance with person-materialized-world-vienna-1912-96; flag +stage_king; reputation 0.03999999999999998_

- **1936.01** `state_reaction:wish-power/power-office` tags: wish-power, wish, wish:power, power, status, ambition, state, state_reaction
  Klara坐在那张有权力的桌子后面，签下自己的名字。愿望没有因此变近，但桌上的纸张、印章和等待回话的人，都变得具体了。
  _effects: reputation 0.06_
  _causes: evt:world-vienna-1912:006755_

- **1936.01** `agency:attend_meeting` tags: agency, agency:attend_meeting
  Klara去了Leopoldstädter Zinshaus, gemeinsamer Gang，坐在后排听完了关于圣马克斯殡葬合作社在Leopoldstädter Zinshaus, gemeinsame的争论；散会时带走一张油印提纲。
  _effects: historical development:initiative-mortuary:person-rosa-lechner-evt:world-vienna-1912:002427-1930 as participant; knowledge “我参加了圣马克斯殡葬合作社在Leopoldstädter Zinshaus, gemeinsamer Gan。”; mood 0.030000000000000027_

- **1936.02** `statistical_recovery`
  Klara从肺结核中慢慢恢复，能下床喝水，但身体还虚弱。

- **1936.04** `oj18-zoo.night::ctx-vienna-authoritarian-1934::milieu-tenement/child-at-the-bear-pit` tags: zoo, animals, night, keeper, work, odd_job, suspense, vienna
  一个男孩翻过熊池的矮栏去捡帽子。Klara没有喊，怕惊动母熊，只提着装苹果的桶绕到下风处，把桶敲得咚咚响。母熊转身时，孩子被Grete Kral一把拽了上来；Klara的腿在后来的很多年里还会在梦里发软。
  _effects: reputation 0.06; relation friend with person-materialized-world-vienna-1912-17; cash 2 (reward from the child's parents); state_add oj18-odd-apprenticeship state:world-vienna-1912:593; mood -0.020000000000000018; flag +zoo_night_shift; flag +saved_child_at_zoo; knowledge “母熊被苹果桶引开时，孩子已经挂在{keeper}的胳膊上了。”; role; flag +odd_job_apprentice_

- **1936.06** `vienna-legacy-worklife.sick-fund/sick-fund.fill-form` tags: legacy, work, family, reform, ordinary_life
  衙门走廊的地砖是黑白相间的，Klara站着站着就把重心从一只脚换到另一只脚。窗口里的办事员姓什么没人知道，只叫“三号窗”。表递进去时，里面说“等复核”，声音很平。
  _effects: relation colleague with person-materialized-world-vienna-1912-49; skill; relation acquaintance with person-materialized-world-vienna-1912-81; relation acquaintance with person-materialized-world-vienna-1912-98_

- **1936.06** `ad20-shop-opening::ctx-vienna-authoritarian-1934::milieu-hospital/the-street-watches` tags: shop, business, opening, everyday, public, obligation, vienna, urban
  Klara把新店的招牌挂上去时，街对面已经站了几个人。第一位客人买了一包针，第二位问能不能赊账，第三位什么也没买，只说“看看”。到傍晚，Klara发现自己记住了每一张脸，却忘了算今天的账。
  _effects: state_add ad20-public-attention state:world-vienna-1912:592; cash 3 (the first day’s takings); reputation 0.02999999999999997; relation acquaintance with person-materialized-world-vienna-1912-81; flag +shop_opened; mood 0.040000000000000036; flag +public_attention_active_

- **1937.01** `absurd15-wish.crown-for-a-day::ctx-vienna-authoritarian-1934::milieu-hospital/the-delegation-never-comes` tags: wish, power, crown, office, irony, festival, vienna, urban
  Klara等了一整天，代表团没有来。傍晚，Klara在窗户里看见游行队伍从街口经过，新的“国王”骑着借来的白马，朝人群挥手。Klara把订做的戏服退掉，押金没有拿回来。
  _effects: cash -2 (订做戏服的押金（其中2克朗记入债务）); mood -0.040000000000000036_

- **1937.01** `state_expire:stage-king` tags: stage-king, performance, theatre, status, irony, state, state_tick, state:stage-king
  Klara的「舞台上的国王」到期；相关安排结束。
  _effects: state_remove stage-king state:world-vienna-1912:547; flag -stage_king_

- **1937.01** `state_tick:ad20-public-attention/the-attention-cycle/warms` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  Klara在街角被人认出来，对方没有要求什么，只说“上次那件事做得不错”。这句客气话被旁边的人听见，下午便有两个陌生人朝Klara点头。关注没有减少，但空气松了一点。
  _effects: state_parameter ad20-public-attention.attention 40 -> 36; state_parameter ad20-public-attention.sympathy 45 -> 51; state_parameter ad20-public-attention.opportunity 50 -> 54; mood 0.020000000000000018_

- **1937.01** `state_tick:oj18-odd-apprenticeship/strange-year/trusted-with-the-keys` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  两年过去，Klara已经能闭着眼说出哪块地板会响、哪盏煤气灯该在几点关。师傅把备用钥匙交下来，没有解释为什么第三把钥匙磨得最亮；Klara也没有问，只在巡查簿最后一页画了一个小小的记号。
  _effects: state_parameter oj18-odd-apprenticeship.trust 38 -> 48; state_parameter oj18-odd-apprenticeship.strangeKnowledge 18 -> 28; state_parameter oj18-odd-apprenticeship.nightsWorked 0 -> 24; cash 2 (night-shift wages); skill_

- **1937.01** `p9-social-daily-culture.singing-club/p9-social-daily-culture.singing-club.join-second-row` tags: daily, culture, leisure, cafe, music, walk, task, task:social
  Klara把两克朗月费和徽章钱一起放在啤酒渍斑斑的桌上，Hermann Kral 2在名册上添了一行。钢琴缺的那个音在排练中途又卡住，Klara站在第二排跟着哼，声音被两边的人盖住，胸腔里却震得发麻；散场时能把副歌完整唱下来，也记住了怎么在人群里找准自己的声部。
  _effects: cash -2 (合唱团月费和铜徽章钱); mood 0.07; relation friend with person-materialized-world-vienna-1912-81; skill; relation acquaintance with person-materialized-world-vienna-1912-87_

- **1937.09** `office16-admin.quiet-ledger::ctx-vienna-authoritarian-1934::milieu-tenement/nothing-moved` tags: office, administration, budget, competence, quiet, power, vienna, urban
  账本看上去是平的：修屋顶的钱被挪去补煤款，煤款又被挪去付印刷费。Klara在每一栏都签了字，知道明年还会这样。散会后，Marie Huber把一张催修屋顶的纸条压在台灯下面。
  _effects: organization_funds; reputation -0.010000000000000009; mood -0.02999999999999997; flag +deferred_maintenance; knowledge “屋顶的修理费被挪去补煤款，煤款又被挪去付印刷费。”; relation acquaintance with person-materialized-world-vienna-1912-104_

- **1938.01** `vienna-life-anschluss-1938/resists` tags: politics, persecution, 1938
  Klara在登记桌旁说了句“这里以前不是这样”。Marie Huber记下地址，当晚两个穿制服的人来敲门，把Klara带到警局，第二天放回来时脸上有伤。
  _effects: condition; role; cash -5 (fine and lost work（其中5克朗记入债务）)_

- **1938.01** `vienna-family-divorce/reconcile-for-now` tags: family, marriage, divorce, housing, lifecycle
  Klara和Marie Huber在楼道里吵到半夜，最后因为下个月的房租又坐回同一张桌。谁都没有提和好，只把账本重新摊开；Marie Huber把煤钱推过来，Klara接过去数了两遍，手指碰到一起又分开，屋里的灯亮到很晚。
  _effects: mood -0.02999999999999997_

- **1938.01** `absurd15-wish.crown-for-a-day::ctx-vienna-authoritarian-1934::milieu-tenement/real-tiny-office` tags: wish, power, crown, office, irony, festival, vienna, urban
  一个市民代表团真的来到Klara门口，带来一份任命书：公共礼仪官，负责节庆、吊唁和接待。职位不大，薪水也不高，但上面有印章，有任期，有一间可以锁门的办公室。Klara把任命书读了三遍，才确认这不是戏票。
  _effects: organization_found 市民礼仪处 (state); position 公共礼仪官 @org:absurd15-wish-office:evt:world-vienna-1912:007722; reputation 0.08000000000000002; mood 0.04999999999999999_

- **1938.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Klara把Otto 2的旧课本包上书皮，又在本子上签了名。Otto 2今年学会了自己系鞋带，也学会了在饭桌上说“不”；Klara听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 28 -> 36; state_parameter raising-child.caregiverBurden 42 -> 39; mood 0.020000000000000018_

- **1938.01** `state_tick:ad20-public-attention/the-attention-cycle/cools` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  Klara发现最近没有人再提那件事。报纸换了头版，邻居也换了话题；本该轻松，Klara却在买菜时反复整理衣领，好像还在等一个不会来的目光。
  _effects: state_parameter ad20-public-attention.attention 36 -> 28; state_parameter ad20-public-attention.sympathy 51 -> 48; state_parameter ad20-public-attention.opportunity 54 -> 52; mood -0.010000000000000009_

- **1938.01** `agency:support_process` tags: agency, agency:support_process
  Klara想帮忙，但组织者不信任新来的人，只让其在外围等消息。
  _effects: mood -0.03999999999999998; reputation -0.010000000000000009_

- **1938.03** `vienna-medical-treatment.night-fever/corner-doctor` tags: health, medical, family, money
  药粉含在嘴里发苦，Klara就着糖浆咽下去，喉头一阵凉。医生拎包出门时，楼梯间的煤气灯刚好灭了，Rosa Lechner摸黑送他到拐角，回来时手里攥着找回的几枚赫勒。
  _effects: cash -4 (医生出诊费和药费（其中4克朗记入债务）); health 0.05 (药粉和糖浆缓解症状); relation friend with person-rosa-lechner_

- **1938.06** `office16-favor.private-sinecure::ctx-vienna-authoritarian-1934::milieu-hospital/sinecure-created` tags: office, favor, corruption, patronage, family, power, vienna, urban
  Klara在编制表最下面添了一行“顾问”，月薪两克朗，职责是“必要时提供咨询”。Rosa Lechner第二天就搬来一张靠窗的桌子，带来一盆天竺葵；一个月后，Rosa Lechner 2发现顾问唯一经手的文件是自己的午餐菜单。
  _effects: position 顾问 @org:absurd15-wish-office:evt:world-vienna-1912:007722; relation friend with person-rosa-lechner; flag +private_sinecure; knowledge “顾问岗位没有固定职责，考勤由我签字。”; mood 0.020000000000000018_

- **1938.08** `state_reaction:oj18-odd-apprenticeship/the-thing-in-the-basement` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  夜班结束前，Klara听见地下室传来拖拽声。下去时，门开着，地上只有一道湿拖把的痕迹；第二天，所有人都说那间屋子锁了十年。
  _effects: state_parameter oj18-odd-apprenticeship.strangeKnowledge 28 -> 36; state_parameter oj18-odd-apprenticeship.trust 48 -> 45; mood -0.02999999999999997; knowledge “地下室那扇门后面有东西被搬动过，但巡查簿上没有记录。”_
  _causes: evt:world-vienna-1912:008020_

- **1938.09** `vienna-historical-social-movement.public-meeting/back-immediate-action` tags: history, historical_process, social_movement, organization, politics
  Klara把帽子捏在手里上台，说救济表格要填三张、盖章两处，煤却今晚就见底。年轻人拍椅子背，Rosa Lechner在门口皱着眉。主持人记下赞成与反对的人数，纸板上的字越写越小。
  _effects: reputation 0.050000000000000044; relation acquaintance with person-rosa-lechner; mood 0.030000000000000027_

- **1939.01** `office16-rival.removal-motion::ctx-vienna-authoritarian-1934::milieu-hospital/counter-motion` tags: office, rivalry, politics, removal, power, intrigue, vienna, urban
  Klara没有等投票，而是让Gustav Berg把委员会过去三年的差旅账目复印了十份。会议开始前，Rosa Huber的动议被一份“程序审查”取代；审查没有找到Klara的问题，却找到了两次重复报销。
  _effects: reputation -0.030000000000000027; relation rival with person-materialized-world-vienna-1912-35; flag +rival_audited; knowledge “委员会的差旅账目里有两次重复报销。”; mood 0.010000000000000009_

- **1939.01** `state_reaction:wish-power/power-office` tags: wish-power, wish, wish:power, power, status, ambition, state, state_reaction
  Klara坐在那张有权力的桌子后面，签下自己的名字。愿望没有因此变近，但桌上的纸张、印章和等待回话的人，都变得具体了。
  _effects: reputation 0.05999999999999994_
  _causes: evt:world-vienna-1912:008176_

- **1939.01** `state_exit:raising-child` tags: raising-child, family, child, care, school, household, state, state_tick
  Klara不再处于「家里有个正在长大的孩子」；条件已经改变。
  _effects: state_remove raising-child state:world-vienna-1912:491; flag -raising_child_active_

- **1939.01** `state_expire:ad20-public-attention` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  Klara的「被看见的日常」到期；相关安排结束。
  _effects: state_remove ad20-public-attention state:world-vienna-1912:592; flag -public_attention_active_

- **1939.01** `state_tick:oj18-odd-apprenticeship/strange-year/blamed-for-the-noise` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  楼上住户投诉夜里有人拖椅子，管事的把巡查簿翻到Klara的那一页，说签字太潦草，看不出巡过几趟。Klara想辩解，却想起那晚确实在楼梯间多站了一刻钟；扣掉的工钱刚好够买一双不漏水的鞋。
  _effects: state_parameter oj18-odd-apprenticeship.trust 45 -> 29; state_parameter oj18-odd-apprenticeship.reliability 65 -> 55; mood -0.050000000000000044; flag +odd_job_scare_

- **1939.01** `agency:support_process` tags: agency, agency:support_process
  Klara为圣马克斯殡葬合作社在Leopoldstädter Zinshaus, gemeinsame出了力：整理名单、传递消息或替同伴作证，名字被记进参与记录。
  _effects: historical development:initiative-mortuary:person-rosa-lechner-evt:world-vienna-1912:002427-1930 as supporter; historical_influence; reputation 0.015000000000000013_

- **1939.05** `vienna-legacy-worklife.hours-ledger/hours-ledger.read-for-others` tags: legacy, work, family, reform, ordinary_life
  铅笔头短得捏不住，Klara把它夹在两指之间，在表格背面写下两个名字。被漏掉的人一个叫扬，一个叫弗兰茨，都是每天清早从火车站走来的临时工。工头看了一眼背面，没说话，把表贴回墙上。
  _effects: skill; relation colleague with person-materialized-world-vienna-1912-81; reputation 0.040000000000000036_

- **1939.05** `vienna-housing-move.sublet-room/sublet-full` tags: housing, home, rent, family, money, household
  Klara把床上的旧褥子重新铺平，Berta Bauer放下自己的铺盖卷，从怀里掏出一把钥匙看了看。厨房里多了一口人的碗，灶边的煤省着烧也够。Rosa Lechner在门口看了一眼，没多话。
  _effects: cash 4 (出租空床收进的月租); household; relation acquaintance with person-rosa-lechner_

- **1940.01** `office16-budget.sign-or-block::ctx-vienna-authoritarian-1934::milieu-hospital/blocked-the-permit` tags: office, budget, permit, administration, power, economy, vienna, urban
  Klara把一份扩建许可证压在抽屉最下面，理由是排水和消防通道不合规。申请人Alois Winter在走廊里等到下班，最后只拿到一张写着“补件”的纸条。Klara知道这份许可明年还会再来，但今年不会从自己的桌上出去。
  _effects: reputation 0.020000000000000018; skill; relation rival with person-materialized-world-vienna-1912-48; flag +blocked_permit; knowledge “扩建申请的排水图与消防通道不符合现行规定。”; relation acquaintance with person-materialized-world-vienna-1912-48_

- **1940.01** `state_expire:oj18-odd-apprenticeship` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  Klara的「奇职学徒」到期；相关安排结束。
  _effects: state_remove oj18-odd-apprenticeship state:world-vienna-1912:593; role; flag -odd_job_apprentice_

- **1940.01** `agency:support_process` tags: agency, agency:support_process
  Klara为圣马克斯殡葬合作社在Leopoldstädter Zinshaus, gemeinsame出了力：整理名单、传递消息或替同伴作证，名字被记进参与记录。
  _effects: historical development:initiative-mortuary:person-rosa-lechner-evt:world-vienna-1912:002427-1930 as supporter; historical_influence; reputation 0.015000000000000013_

- **1940.05** `vienna-historical-social-movement.district-list/demand-open-books` tags: history, historical_process, social_movement, organization, politics
  负责人说这是不信任，Klara回说数目对得上才叫信任。Berta Bauer把卷角的账页压平，指着一行重复的支出，屋里安静得能听见煤气灯嘶声。最后决定下次集会再报账。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-52; reputation 0.040000000000000036; skill_

- **1940.09** `vienna-legacy-worklife.sick-fund/sick-fund.keep-quiet` tags: legacy, work, family, reform, ordinary_life
  止咳药水是褐色的，瓶口塞着软木塞，摇一摇会起沫。Klara看着工友把表折成小块，折了三折才塞进帽檐。墙上的规章还贴在那里，纸角被风掀起，没人去按。
  _effects: mood -0.050000000000000044; relation colleague with person-materialized-world-vienna-1912-95; relation acquaintance with person-materialized-world-vienna-1912-95_

- **1940.10** `p9-gap-adult-unemployed.labour-exchange/exchange-trial-work` tags: adulthood, unemployment, casual_labour, poverty, daily, labour_exchange, bureaucracy
  洗衣房里蒸汽弥漫，熨斗压在衬衫领子上咝咝作响。老板娘翻了翻Klara熨好的第一件，说领口还差些火候，手上倒还稳。两打熨完，三个克朗放在围裙口袋里，铜板还带着体温。
  _effects: cash 3 (洗衣房试工半天按件计酬); skill; relation acquaintance with person-materialized-world-vienna-1912-115_

- **1941.01** `office16-budget.sign-or-block::ctx-vienna-authoritarian-1934::milieu-hospital/blocked-the-permit` tags: office, budget, permit, administration, power, economy, vienna, urban
  Klara把一份扩建许可证压在抽屉最下面，理由是排水和消防通道不合规。申请人Helene Hofer在走廊里等到下班，最后只拿到一张写着“补件”的纸条。Klara知道这份许可明年还会再来，但今年不会从自己的桌上出去。
  _effects: reputation 0.020000000000000018; skill; relation rival with person-materialized-world-vienna-1912-98; knowledge “扩建申请的排水图与消防通道不符合现行规定。”; relation acquaintance with person-materialized-world-vienna-1912-109_

- **1941.01** `r13-fam.return-hometown::ctx-vienna-authoritarian-1934::milieu-tenement/door-closed` tags: task, family, return, hometown, migration, relative, vienna, urban
  Josef没有来车站。Klara提着箱子走到老屋门口，门从里面拴着；敲了三遍，才有人隔着门说这房子已经换了姓。Klara在台阶上坐到天黑，把带来的糖分成两份，一份放在门槛上，一份自己吃了。
  _effects: cash -2 (火车进站时看见旧钟楼); mood -0.18000000000000005; condition; flag +hometown_door_closed; knowledge “the family house has passed to another household”_

- **1941.03** `r15-wish.power-offer::ctx-vienna-authoritarian-1934::milieu-hospital/mistaken-identity` tags: politics, power, wish, office, status, vienna, urban, crisis
  一个代表团走错了房间，把Klara当成新来的部长，围着说了十分钟的请求。Klara没有纠正。等人走后，Klara坐在那张不属于自己的椅子上，听见走廊里有人在找真正的部长。
  _effects: mood 0.020000000000000018; reputation 0.040000000000000036; state_add stage-king state:world-vienna-1912:799; flag +stage_king; reputation 0.040000000000000036_

- **1941.05** `p9-gap-adult-solitude.river-walk/river-walk.turned-back` tags: adulthood, daily, solitude, ordinary, home, walk, river
  Klara走到半路风忽然大起来，围巾抽在脸上生疼，她掉头往回走。路过面包店时橱窗里还剩几个昨天的圆面包，四赫勒一个，她买了两个，揣在怀里带回去当晚饭。
  _effects: food; cash -0.08 (两个剩面包四赫勒一个（其中0.08克朗记入债务）)_

- **1941.08** `p9-gap-adult-ordinary-day.wedding-procession/wedding-procession.dragged-in` tags: adulthood, daily, leisure, neighborhood, ordinary, wedding, neighbor, celebration
  长桌上铺着借来的白布，蛋糕是巷尾糕点铺烤的，奶油抹得高低不平。Klara被按在一条长凳上，对面坐着不认识的表亲，一个劲给她倒酒。她咬了一口蛋糕，杏仁味很重，糖霜粘在上颚。
  _effects: cash -2 (给邻居家婚礼的随礼（其中2克朗记入债务）); food; relation friend with person-rosa-lechner_

- **1942.01** `office16-admin.quiet-ledger::ctx-vienna-authoritarian-1934::milieu-hospital/nothing-moved` tags: office, administration, budget, competence, quiet, power, vienna, urban
  账本看上去是平的：修屋顶的钱被挪去补煤款，煤款又被挪去付印刷费。Klara在每一栏都签了字，知道明年还会这样。散会后，Mitzi Moser把一张催修屋顶的纸条压在台灯下面。
  _effects: organization_funds; reputation -0.010000000000000009; mood -0.030000000000000027; knowledge “屋顶的修理费被挪去补煤款，煤款又被挪去付印刷费。”; relation acquaintance with person-materialized-world-vienna-1912-120_

- **1942.01** `state_expire:stage-king` tags: stage-king, performance, theatre, status, irony, state, state_tick, state:stage-king
  Klara的「舞台上的国王」到期；相关安排结束。
  _effects: state_remove stage-king state:world-vienna-1912:799; flag -stage_king_

- **1942.01** `r13-edu.correspondence-course::ctx-vienna-authoritarian-1934::milieu-tenement/cannot-read-lessons` tags: education, correspondence, adult_education, literacy, mail, vienna, urban, crisis
  Klara读到第三课就跟不上，题目里的“比例”和“折旧”都认不全。Klara把讲义压在箱底，直到邮差来问续费，才发现已经欠了三期。钱退不回来，Klara把没拆的信封当柴烧了。第二年，Klara在厂里听人念夜校的招生简章，才知道那门课还在办。
  _effects: cash -3 (邮包里的第七课（其中3克朗记入债务）); mood -0.07000000000000006_

- **1942.10** `p9-gap-adult-unemployed.dock-morning/dock-watched-tools` tags: adulthood, unemployment, casual_labour, poverty, daily, dock
  工头第二次出来时眼皮都没抬。Rosa Lechner把工具往Klara脚边一放，说去去就回，回来时用围裙兜着面包，汤罐用旧布裹着，两人在墙根分着吃完。
  _effects: food; relation acquaintance with person-rosa-lechner_

- **1942.11** `bc18-crime.failed-burglary::ctx-vienna-authoritarian-1934::milieu-hospital/caught-in-darkroom` tags: crime, burglary, mistake, absurd, police, legal, comic, vienna
  显影液被Luise Kral碰翻，整盆药水泼在一张婚礼合影上。新郎的脸变成一团灰雾，店主抓住Klara的领子；Ferdinand Kraus来后，两人被关了一夜。第二天，Klara交了罚款三克朗，Luise Kral被新娘的家人追着要赔照片；那顶帽子也留在了拘留室。
  _effects: cash -3 (破坏暗房的罚款（其中3克朗记入债务）); reputation -0.040000000000000036; state_add under-investigation state:world-vienna-1912:828; relation rival with person-luise-kral; condition; flag +destroyed_a_wedding_portrait; mood -0.050000000000000044_

- **1943.01** `curse15-bargain.borrowed-name::ctx-vienna-authoritarian-1934::milieu-hospital/the-candle-bites` tags: wish, power, curse, ritual, bargain, office, irony, vienna
  仪式做完，Elisabeth Berg把铜钥匙放进Klara手里，钥匙却烫得像刚从炉子里夹出来。Klara松手时掌心已经起泡；第二天，聘书上的名字褪成一片空白，只有Klara的手还疼。Elisabeth Berg说这算成了，也算没成。
  _effects: state_add curse-bargain state:world-vienna-1912:827; flag +curse_recoiled_at_once; cash -1 (烫伤的药膏（其中1克朗记入债务）); mood -0.040000000000000036; flag +curse_bargain_made_

- **1943.01** `state_tick:under-investigation/case-progress/evidence` tags: under-investigation, legal, police, investigation, risk, state, state_tick
  调查员又来找Klara谈了一次。问话比上次具体，记录也比上次长。
  _effects: state_parameter under-investigation.progress 10 -> 25; mood -0.040000000000000036_

- **1943.01** `agency:attend_meeting` tags: agency, agency:attend_meeting
  Klara走到Berggasse 19, Wohnung und Ordination门口，看见便衣和拥挤的人群，最终没有进去。
  _effects: mood -0.040000000000000036; reputation -0.010000000000000009_

- **1943.01** `vienna-market-debt.coal-credit/coal-part-cash-part-furniture` tags: market, debt, money, home, shop
  你数出四十赫勒搁在秤盘上，说剩下的一克朗用那张旧折叠桌抵。老板撇了撇嘴，让伙计跟你上楼搬桌子。桌子腿有点晃，但木料还结实。邻居在楼道里搭了把手，账本上这一页只写了一行，没写利息。
  _effects: cash -0.4 (买煤付的部分现钱（其中0.4克朗记入债务）); food; relation acquaintance with person-materialized-world-vienna-1912-51_

- **1943.02** `vienna-market-household.market-credit/market-credit.pay-later` tags: home, market, food, social
  Klara捏着三个克朗硬币站在玛丽亚的菜摊前，土豆和洋葱已经装进布袋。周五结清时，玛丽亚用粉笔在小黑板上划掉名字，Hermann Berg点点头。
  _effects: cash -3 (偿还市场赊账（其中3克朗记入债务）); food; relation acquaintance with person-materialized-world-vienna-1912-51_

- **1943.10** `p9-gap-adult-solitude.remake-coat/remake-coat.short-jacket` tags: adulthood, daily, solitude, ordinary, home, mending, clothing, household
  Klara把外套的肩线拆开，往里收了四指，袖口剪掉一截，改出一件到胯骨的短上衣。剩下的布头拼成两只手套，针脚粗，戴着能挡风。她在镜子前转了一圈，肩还是有点空，但总算能穿出门。
  _effects: skill; mood 0.050000000000000044_

- **1944.01** `curse15-bargain.borrowed-name::ctx-vienna-authoritarian-1934::milieu-tenement/a-key-and-a-title` tags: wish, power, curse, ritual, bargain, office, irony, vienna
  办事处后门的Berta Moser 3把一份旧名册翻到空页，让Klara在“会长”后面签下名字。三天后，Klara真的收到一枚铜钥匙和一张聘书：夜校同学会会长，职责是保管储物间。同学会只有三个成员，储物间的锁已经坏了。Berta Moser 3没有再出现。
  _effects: organization_found 夜校同学会 (other); position 夜校同学会会长 @org:curse15-borrowed:evt:world-vienna-1912:010695; state_add curse-bargain state:world-vienna-1912:875; reputation 0.030000000000000027; cash -1 (聘书与印花的费用（其中1克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-126_

- **1944.01** `state_reaction:wish-power/power-office` tags: wish-power, wish, wish:power, power, status, ambition, state, state_reaction
  Klara坐在那张有权力的桌子后面，签下自己的名字。愿望没有因此变近，但桌上的纸张、印章和等待回话的人，都变得具体了。
  _effects: reputation 0.06000000000000005_
  _causes: evt:world-vienna-1912:010695_

- **1944.01** `state_expire:curse-bargain` tags: curse-bargain, curse, ritual, wish, bargain, debt, secret, supernatural
  Klara的「诅咒的定金」到期；相关安排结束。
  _effects: state_remove curse-bargain state:world-vienna-1912:827; flag +curse_bargain_closed_

- **1944.01** `state_expire:under-investigation` tags: under-investigation, legal, police, investigation, risk, state, state_tick, state:under-investigation
  Klara的「被调查」到期；相关安排结束。
  _effects: state_remove under-investigation state:world-vienna-1912:828_

- **1944.01** `r13-civ.dentist::ctx-vienna-authoritarian-1934::milieu-hospital/barber-pulled-wrong-tooth` tags: health, dentist, pain, cash, craft, vienna, urban, crisis
  Klara走进巷口的理发铺，剃头匠说拔牙只要一克朗。钳子夹住的是旁边那颗好牙，血涌出来时，剃头匠还在找棉花。Klara捂着嘴走回家，第二天腮帮子肿得睁不开眼。
  _effects: cash -1 (拔牙钳与门外的雪（其中1克朗记入债务）); condition; flag +barber_pulled_wrong_tooth_

- **1944.05** `vienna-women-housework.coal-stove/coal-stove.borrow-fire` tags: gender, housework, home, labour, family
  Klara端着一只旧锅去敲Berta Winter的门，想借几块烧红的炭。Berta Winter让她从自家炉膛里夹了一块，又抓了一小把引火的木片。Klara连声道谢，回来把炭放进炉栅，火是有了，屋里却还是冷得能呵出白气。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-62; food; mood 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-62_

- **1944.08** `vienna-social-movement.recruitment/report-to-official` tags: development, social_movement, organization, politics
  Klara把传单交给楼里的门房。门房没有接，只让Klara自己去找警察局。那天傍晚，两个穿便衣的人在街口站了很久。
  _effects: role; reputation 0.020000000000000018_

- **1944.08** `vienna-medical-treatment.night-fever/sweat-it-out` tags: health, medical, family, money
  醋水的酸味混着汗气，屋子小得转不开身。Anna Stein 2把布拧到不滴水，敷上去时Klara打了个激灵。窗外送奶车吱呀碾过石板，她才想起自己家的炉子还灭着。
  _effects: condition; relation friend with person-materialized-world-vienna-1912-124; relation acquaintance with person-materialized-world-vienna-1912-124_

- **1945.01** `vienna-life-1945-liberation/displaced` tags: war, liberation, 1945, migration
  炮火把Klara住的那条街烧掉一半。Klara跟着人群走到城外，在临时收容所登记，床位上铺的是发霉的稻草。
  _effects: move place-klosterneuburg-aunt-house; role; cash -5 (temporary shelter（其中2.7克朗记入债务）)_

- **1945.01** `state_expire:curse-bargain` tags: curse-bargain, curse, ritual, wish, bargain, debt, secret, supernatural
  Klara的「诅咒的定金」到期；相关安排结束。
  _effects: state_remove curse-bargain state:world-vienna-1912:875_

- **1945.01** `p9-work-jobsearch.railway-depot/railway-depot.eyesight-failed` tags: work, job_search, negotiation, wages, employment, task, railway, depot
  字牌贴在石灰墙上，最后两行他实在分不清。Ferdinand Bauer用笔杆敲敲桌面，Elisabeth Winter 2把名字写进另一本册子，说有缺再叫。Klara把证明一张张叠好，折边已经发软。
  _effects: mood -0.06000000000000005; relation acquaintance with person-materialized-world-vienna-1912-70; relation acquaintance with person-materialized-world-vienna-1912-70_

- **1945.06** `p9-social-tenement-neighbors.rent-note/rent-note.pay-increase` tags: housing, neighbors, tenement, daily, money, reputation
  Klara把纸条压在糖罐下面，算了半天：两克朗正好是四天的面包钱。月底还是把涨后的房租数出来交给看门人，铜币在桌上摞成两小堆。那一周的晚饭改成面包和稀汤，猪油省着抹。
  _effects: cash -2 (按涨租纸条多付的两克朗（其中2克朗记入债务）)_

- **1945.09** `vienna-women-housework.wash-day/wash-day.rush` tags: gender, housework, home, labour, family
  木盆边的水渍映着天光，Klara跪在石阶上揉搓床单，肘弯发酸。晾绳上的湿布滴答作响，Rosa Bauer探身把自家被单也挂上去，两人没多说话。
  _effects: relation acquaintance with person:evt:world-vienna-1912:000398:child_

- **1946.01** `p10-migration-tasks.find-lodging/lodging-courtyard-room` tags: adulthood, migration, housing, family, travel, task, lodging, arrival
  他挑了朝院子的那间单间，付了一个月押金和半个月房租，房东点清钱才给钥匙。看门人把备用钥匙挂进门房的木板上，嘱咐他晚上十点以后别在楼梯上跺脚。屋里有张床、一只铁炉和半截蜡烛。
  _effects: cash -9 (单间一个月押金与半个月房租（其中9克朗记入债务）); residence; relation acquaintance with person-materialized-world-vienna-1912-86; mood 0.030000000000000027_

- **1946.07** `vienna-legacy-worklife.hours-ledger/hours-ledger.sign` tags: legacy, work, family, reform, ordinary_life
  印泥是赭红色的，像干了的面包瓤。Klara按完手印，工头把表举到窗边吹干，阳光里那张纸透出指印的轮廓。楼下第十区的街面传来运煤车的铁皮声，星期六下午突然显得很宽。
  _effects: cash -1 (星期六下午减少的计件工钱（其中1克朗记入债务）); mood 0.050000000000000044; flag +accepted_hours_reform_

- **1947.01** `curse15-betrayal.signature::ctx-vienna-postwar-1945::milieu-hospital/the-vote-in-the-corridor` tags: betrayal, office, power, politics, curse, institution, vienna, urban
  Helene Hofer在走廊里凑够了票数，把Klara负责的那间办公室转给了一个更听话的人。会议记录写得很干净：因工作需要。Klara回到办公室时，门牌已经换了，钥匙还能插进去，只是转不动。
  _effects: reputation -0.07999999999999996; relation rival with person-materialized-world-vienna-1912-98; condition; flag +office_quietly_taken; cash -1 (重新置办办公用品的钱（其中1克朗记入债务）)_

- **1947.01** `state_reaction:wish-power/power-office` tags: wish-power, wish, wish:power, power, status, ambition, state, state_reaction
  Klara坐在那张有权力的桌子后面，签下自己的名字。愿望没有因此变近，但桌上的纸张、印章和等待回话的人，都变得具体了。
  _effects: reputation 0.05999999999999994_
  _causes: evt:world-vienna-1912:012261_

- **1947.01** `state_reaction:wish-power/power-humiliation` tags: wish-power, wish, wish:power, power, status, ambition, state, state_reaction
  Klara把那句轻视记了很久。它没有变成一个决定，但也没有消失。
  _effects: mood -0.050000000000000044_
  _causes: evt:world-vienna-1912:012261_

- **1947.01** `agency:attend_meeting` tags: agency, agency:attend_meeting
  Klara去了Leopoldstädter Zinshaus, gemeinsamer Gang，坐在后排听完了关于圣马克斯殡葬合作社在Leopoldstädter Zinshaus, gemeinsame的争论；散会时带走一张油印提纲。
  _effects: historical development:initiative-mortuary:person-materialized-world-vienna-1912-55-evt:world-vienna-1912:005769-1939 as participant; knowledge “我参加了圣马克斯殡葬合作社在Leopoldstädter Zinshaus, gemeinsamer Gan。”; mood 0.030000000000000027_

- **1947.07** `bc18-crime.failed-burglary::ctx-vienna-postwar-1945::milieu-hospital/health-inspectors` tags: crime, burglary, mistake, absurd, police, legal, comic, vienna
  两人摸黑撬开一扇门，里面没有保险柜，只有背景布、三脚架和一池显影水。店主以为他们是卫生局派来查暗房通风的，殷勤地领着看排水口；Hermann Winter 2只好装模作样地记了几笔，Klara顺手把柜台上一顶帽子戴走。临走时，店主还问要不要写整改通知。
  _effects: cash 1 (卖掉顺走的帽子); relation friend with person-materialized-world-vienna-1912-88; condition; flag +burglary_mistaken_for_inspection; mood 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-88_

- **1947.11** `p9-social-family-conflict-care.christmas-soup/ledger-on-table` tags: family, care, siblings, inheritance, housing, money
  Klara把旧账本摊在汤锅旁边，翻到药费那一页，说今天得当场算清才肯坐下。Josef的勺子停在半空，最后也把本子拉过去，一行行对起数来。汤在炉子上咕嘟着，谁也没先盛；等账算到最后一个赫勒，Klara在页脚写下“结清”，两人才同时伸手去够勺子。
  _effects: mood -0.020000000000000018; flag +medicine_bill_settled_

- **1948.01** `vienna-postwar-housing-1950s/stay-with-relatives` tags: adulthood, postwar, housing, family
  分房名单又往后推了一年，Klara一家搬进亲戚家的厨房隔间。Helene Bauer 3送来一块旧帘子当隔断；夜里有人起身，全屋都听得见。
  _effects: cash -3 (shared household costs（其中3克朗记入债务）); condition; mood -0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-139; relation acquaintance with person-materialized-world-vienna-1912-139_

- **1948.01** `r15-history.movement-price::ctx-vienna-postwar-1945::milieu-hospital/purged` tags: politics, movement, power, risk, history, vienna, urban, postwar
  有人翻出Klara两年前的一次妥协，说那是立场问题。Klara被移出名单，办公室的钥匙当天收回。Helene Bauer 2接替了位置，没有看Klara一眼。
  _effects: mood -0.050000000000000044; reputation -0.06000000000000005; state_add political-suspect state:world-vienna-1912:1023_

- **1948.01** `kernel-health.task-pharmacy-hunt::ctx-vienna-postwar-1945::milieu-tenement/pharmacy-last-bottle` tags: health, task, pharmacy, shortage, black_market, vienna, urban, postwar
  Klara跑了四家药房，最后在火车站附近的小店找到最后一瓶奎宁。掌柜先问给谁用，又看了看Klara的鞋，才把瓶子从柜台底下拿出来；价格是官价的三倍。他把瓶子塞进内袋，路上每隔一会儿摸一下。
  _effects: cash -25 (last bottle of quinine at three times the official price（其中25克朗记入债务）); health 0.04 (quinine obtained and taken); condition; role; knowledge “奎宁这类药会藏在柜台底下，先问给谁用，再看买药人的鞋；价格是官价三倍。”; relation acquaintance with person-materialized-world-vienna-1912-128_

- **1948.01** `p22-mistaken-inheritance::ctx-vienna-postwar-1945::milieu-hospital/the-estate-comes-with-a-family` tags: mistaken_inheritance, funeral, corpse, identity, dark, reversal, debt, family
  陌生人的家属找上门，说既然Klara拿了遗产，就该替死者还债。Hermann Winter 2把借据摊在桌上，Friedrich Bauer说法律上确实如此；Klara搬进那间公寓，却发现每个房间都住着原来的债主。窗户朝北，冬天没有太阳，房租却一分不少。把借据一张张摊开，发现每张都写着同一个地址。
  _effects: state_add debt-bondage state:world-vienna-1912:1073; cash -4 (the dead man debts and the move); relation acquaintance with person-materialized-world-vienna-1912-88; flag +estate_came_with_family; relation acquaintance with person-materialized-world-vienna-1912-100_

- **1948.06** `p9-social-tenement-neighbors.stairwell-rumor/stairwell-rumor.ask-straight` tags: housing, neighbors, tenement, daily, money, reputation
  Klara在楼梯间拦住Friedrich Bauer，问那句话是从哪儿听来的，又趁送活的人上门时当面看清是谁。原来是对面作坊的裁缝来取改好的裤子。Friedrich Bauer听完把话咽回去，第二天洗衣房里没人再提。
  _effects: reputation 0.040000000000000036; relation acquaintance with person:evt:world-vienna-1912:000561:child_

- **1948.10** `ad20-landlord-visit::ctx-vienna-postwar-1945::milieu-hospital/repairs-promised` tags: housing, rent, landlord, everyday, repair, public, vienna, urban
  Maria Berg带着木尺来了，先敲窗框，又敲暖气片。Klara把去年冬天裂开的缝指给他看；Maria Berg说可以修，但材料钱要从下个月房租里扣。Klara算了算，还是点了头。窗外的雨顺着玻璃往下走，屋里第一次没有风。
  _effects: cash -1 (materials for the window repair); relation acquaintance with person-materialized-world-vienna-1912-129; flag +repair_promised; mood 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-129_

- **1949.01** `r15-wish.found-faction::ctx-vienna-postwar-1945::milieu-hospital/founded` tags: politics, power, wish, organization, office, status, vienna, urban
  Klara和Josef Huber在咖啡馆后间成立了一个小小的政治俱乐部。桌子是借的，章程是手写的，但签名、印章和一间可以锁门的办公室是真的。Elisabeth Berg没有到场，只送来一句“先看看你们能撑多久”。
  _effects: cash -2 (一间借来的办公室); reputation 0.06000000000000005; organization_found 权力俱乐部 (party); position 发起人 @org:r15-faction:evt:world-vienna-1912:013254_

- **1949.01** `state_tick:political-suspect/police-interest/detained` tags: political-suspect, politics, repression, legal, surveillance, state, state_tick
  Klara在回家路上被拦住，问话从晚上八点持续到凌晨。没有正式指控，但名字被写进了另一本册子。
  _effects: state_parameter political-suspect.heat 0.7 -> 0.85; mood -0.020000000000000018_

- **1949.01** `state_tick:debt-bondage/interest/pay-interest` tags: debt-bondage, debt, work, poverty, legal, state, state_tick
  Klara又付了一年的利息。本金几乎没动，债主的账本却翻到了新一页。
  _effects: cash -3 (debt interest); state_parameter debt-bondage.debt 24 -> 26_

- **1949.01** `agency:support_process` tags: agency, agency:support_process
  Klara为圣马克斯殡葬合作社在Leopoldstädter Zinshaus, gemeinsame出了力：整理名单、传递消息或替同伴作证，名字被记进参与记录。
  _effects: historical development:initiative-mortuary:person-materialized-world-vienna-1912-55-evt:world-vienna-1912:005769-1939 as supporter; historical_influence; reputation 0.015000000000000013_

- **1949.09** `vienna-women-housework.piecework-bundle/piecework.dispute-rate` tags: gender, housework, home, labour, family
  Elisabeth Winter 2用拇指甲刮着一件领子的边线，说这儿跳了针。Klara把煤油灯往前推了推，让他凑近看，说线是细了点，活没少做。Maria Kral 2倚在门框上没走，屋里一时只有尺子碰桌面的响。
  _effects: cash 0.6 (争执后按降低的工价结算); reputation 0.030000000000000027; relation colleague with person-materialized-world-vienna-1912-70; mood -0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-114_

- **1949.09** `p9-social-tenement-neighbors.gramophone-wall/gramophone-wall.caretaker-notice` tags: housing, neighbors, tenement, daily, money, reputation
  Klara去找看门人，说院子里四面墙，声音绕不出去。第二天楼梯间的木板上贴了一张纸：晚上十点后请勿放留声机，鞋匠铺也请收锤。纸条没有落款，只有房东事务所的戳。Luise Bauer 2路过时看了很久，把留声机的盖子合上了。
  _effects: mood 0.040000000000000036; relation acquaintance with person-materialized-world-vienna-1912-112; relation acquaintance with person-materialized-world-vienna-1912-112_

- **1949.11** `vienna-historical-social-movement.public-meeting/back-immediate-action` tags: history, historical_process, social_movement, organization, politics
  有人喊罢工，有人喊谈判，Klara站到前排说先动才有得谈。保守派转身去拿大衣，Mitzi Hofer 2追出去又回来，说外头雪深，别把人推到对面去。会议没散，火气没降。
  _effects: reputation 0.050000000000000044; relation acquaintance with person-materialized-world-vienna-1912-118; mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-118_

- **1950.01** `r15-wish.faction-price::ctx-vienna-postwar-1945::milieu-tenement/split` tags: politics, power, wish, organization, intrigue, office, vienna, urban
  俱乐部在一次表决中分裂。Otto Lechner 2带走了将近一半的人，留下的那间办公室突然显得很大。Klara把两把没人坐的椅子搬到墙边，没有扔掉。
  _effects: reputation -0.050000000000000044; flag +faction_split_
  _causes: evt:world-vienna-1912:013254_

- **1950.01** `state_reaction:wish-power/power-office` tags: wish-power, wish, wish:power, power, status, ambition, state, state_reaction
  Klara坐在那张有权力的桌子后面，签下自己的名字。愿望没有因此变近，但桌上的纸张、印章和等待回话的人，都变得具体了。
  _effects: reputation 0.05999999999999994_
  _causes: evt:world-vienna-1912:013604_

- **1950.01** `curse15-betrayal.signature::ctx-vienna-postwar-1945::milieu-hospital/the-files-went-first` tags: betrayal, office, power, politics, curse, institution, vienna, urban
  Gustav Moser 2先把Klara抽屉里的往来信件搬空，再在会议上说Klara从来没有保存过记录。没有人能证明那些信存在过，除了Klara自己。散会后，有人让Klara回家休息几天，工资照发。Klara知道这不是照顾，是让Klara别再回来。
  _effects: reputation -0.06000000000000005; relation rival with person-materialized-world-vienna-1912-125; knowledge “我经手的信件在会议前被人搬空了。”; condition; flag +records_removed; relation acquaintance with person-materialized-world-vienna-1912-125_

- **1950.01** `state_reaction:wish-power/power-humiliation` tags: wish-power, wish, wish:power, power, status, ambition, state, state_reaction
  Klara把那句轻视记了很久。它没有变成一个决定，但也没有消失。
  _effects: flag +wish:power:wounded_
  _causes: evt:world-vienna-1912:013770_

- **1950.01** `state_transition:political-suspect/arrested` tags: political-suspect, politics, repression, legal, surveillance, state, state_tick, detained
  Klara从「政治嫌疑」转入另一段处境：the file became an arrest
  _effects: state_transition political-suspect -> detained; flag +political_arrest; flag +detained_

- **1950.01** `state_tick:debt-bondage/interest/pay-interest` tags: debt-bondage, debt, work, poverty, legal, state, state_tick
  Klara又付了一年的利息。本金几乎没动，债主的账本却翻到了新一页。
  _effects: cash -3 (debt interest); state_parameter debt-bondage.debt 26 -> 28_

- **1950.01** `agency:support_process` tags: agency, agency:support_process
  Klara为圣马克斯殡葬合作社在Leopoldstädter Zinshaus, gemeinsame出了力：整理名单、传递消息或替同伴作证，名字被记进参与记录。
  _effects: historical development:initiative-mortuary:person-materialized-world-vienna-1912-55-evt:world-vienna-1912:005769-1939 as supporter; historical_influence; reputation 0.014999999999999902_

- **1950.03** `vienna-tenement-neighbors.laundry_line_dispute/subject_yields_line` tags: home, social, family, housing
  Klara看Helene Bauer 3盆里那几件小衬衫，把自家床单卷起来抱回屋，说等下午再晾。Helene Bauer 3愣了一下，闷头把衣服挂好，收工回来时在Klara门口放了一小包用旧报纸裹的洗衣碱。Klara打开报纸，碱面里还掺着几粒粗盐。
  _effects: relation friend with person-materialized-world-vienna-1912-139; food_

- **1950.07** `cj17-court.charge-read::ctx-vienna-postwar-1945::milieu-hospital/legal-aid-works` tags: court, legal, trial, informant, sentence, prison, vienna, urban
  Elisabeth Berg把搜查记录翻到最后一页，指出上面缺了见证人的签名。Franz Bauer让书记官把纸递上来，看了很久，最后说这页不能作为证据。起诉被撤回，Klara在走廊里接过退还的保释金，Elisabeth Berg只收了一克朗的车马费。
  _effects: cash -2 (给辩护人的车马费和抄写费（其中2克朗记入债务）); state_remove detained state:world-vienna-1912:1166; condition; reputation 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-109; flag +case_dismissed_on_procedure; mood 0.040000000000000036; relation acquaintance with person-materialized-world-vienna-1912-144; flag -detained; flag +released_from_detention_

- **1950.07** `office16-favor.private-sinecure::ctx-vienna-postwar-1945::milieu-tenement/favor-refused` tags: office, favor, corruption, patronage, family, power, vienna, urban
  Mitzi Winter把一篮鸡蛋放在Klara家门口，说只要一个不用打卡的位子。Klara把鸡蛋拎回对方手里，说编制表不是自家的抽屉。两个人站在楼梯间，谁也没有再提这件事；第二天见面，还是点了头。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-103; reputation 0.030000000000000027; flag +refused_private_favor; mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-103_

- **1951.01** `office16-corruption.inspection::ctx-vienna-postwar-1945::milieu-hospital/fined` tags: office, corruption, audit, legal, power, dark, vienna, urban
  Elisabeth Berg在第三份合同上停住了：同一批纸张被报了两次价，第二次的签字是Klara。罚款单当场开出，金额不算大，但足够让下一季度的办公用品全部改成最便宜的牌子。Klara没有争辩，只在收据背面写了日期。
  _effects: organization_funds; reputation -0.050000000000000044; mood -0.040000000000000036; state_add office-under-siege state:world-vienna-1912:1191; flag +fined_after_audit; knowledge “同一批纸张被报了两次价，第二次的签字是我的。”; flag +office_under_siege_

- **1951.01** `state_expire:debt-bondage` tags: debt-bondage, debt, work, poverty, legal, state, state_tick, state:debt-bondage
  Klara的「债务束缚」到期；相关安排结束。
  _effects: state_remove debt-bondage state:world-vienna-1912:1073_

- **1951.01** `agency:attend_meeting` tags: agency, agency:attend_meeting
  Klara去了Verlag Die Fackel, Hintere Zollamtsstraße 3，坐在后排听完了关于Die Fackel在Verlag Die Fackel, Hintere Zollamt的争论；散会时带走一张油印提纲。
  _effects: historical development:initiative-org-die-fackel-1947 as participant; knowledge “我参加了Die Fackel在Verlag Die Fackel, Hintere Zollamtsstra。”; mood 0.030000000000000027_

- **1951.02** `p9-social-family-conflict-care.cousin-bed/three-days-only` tags: family, care, siblings, inheritance, housing, money
  Klara只答应让Luise Stein住三天，腾出半张床，又托Josef去打听便宜床位。三天里Luise Stein白天出去找活，傍晚回来坐在行军床边上，藤箱始终没有打开。第三天晚上Josef带回消息，说有一处工人宿舍，一周一克朗；Klara数出一克朗硬币放在箱盖上，替Luise Stein垫了第一周。
  _effects: cash -1 (替表亲垫付工人宿舍第一周（其中1克朗记入债务）); relation kin with person:evt:world-vienna-1912:001892:child_

- **1951.04** `p9-gap-adult-unemployed.labour-exchange/exchange-trial-work` tags: adulthood, unemployment, casual_labour, poverty, daily, labour_exchange, bureaucracy
  介绍所里那个Franz Bauer说木牌上的地址多半过时了，不如自己去问。Klara走了四十分钟到洗衣房，院子里晾着床单。老板娘让她先熨一件试试，看完说留下吧，明天还这个时辰来。
  _effects: cash 3 (洗衣房试工半天按件计酬); skill_

- **1951.10** `bc18-crime.inept-blackmail::ctx-vienna-postwar-1945::milieu-tenement/photographer-sells-print` tags: crime, blackmail, photograph, mistake, humiliation, absurd, reputation, vienna
  Alois Weiss把那张照片卖给了《晨报》，配文写“送别者的疲惫”。Klara收到两克朗模特费和一份报纸；照片里的Klara歪着头，嘴半张，确实像哭过。邻居开始叫Klara“那个在葬礼上睡着的人”，语气不算尊敬，也不完全是嘲笑。
  _effects: cash 2 (报纸给的照片使用费); state_add bc18-ridiculous-fame state:world-vienna-1912:1242; relation acquaintance with person-materialized-world-vienna-1912-49; flag +funeral_photo_in_the_paper; mood 0.010000000000000009; flag +ridiculously_famous; mood 0.020000000000000018_

- **1952.01** `office16-hire.protege::ctx-vienna-postwar-1945::milieu-hospital/hired-relative` tags: office, hire, patronage, bureaucracy, work, power, vienna, urban
  名单上添的是Helene Stein，一个连公文格式都分不清的远房亲戚。Josef把考勤表放在桌上，没有问原因；Klara也没有解释，只在签字栏里写得比平时慢。第一个月，Helene Stein迟到了七次，工资照发。
  _effects: position 档案助理 @org:r15-faction:evt:world-vienna-1912:013254; relation kin with person:evt:world-vienna-1912:002180:child; flag +hired_relative; knowledge “考勤表上记了七次迟到，工资一次没有扣。”; mood 0.020000000000000018_

- **1952.01** `state_expire:office-under-siege` tags: office-under-siege, office, scandal, pressure, politics, legal, risk, state
  Klara的「职位受围」到期；相关安排结束。
  _effects: state_remove office-under-siege state:world-vienna-1912:1191; flag -office_under_siege_

- **1952.01** `state_tick:bc18-ridiculous-fame/ridiculous-fame-year/the-audience-gets-bored` tags: bc18-ridiculous-fame, fame, reputation, mistaken_identity, promotion, media, absurd, public
  观众开始厌倦同一个故事。园艺会请了更年轻的发明家，女子学校把Klara的名字从海报上撤下；Klara在咖啡馆听见有人说“那个人还在讲火柴”。同一个月，一张报纸把旧照片配上新标题，问Klara是否已经“过气”。纠正的冲动又回来，但没有人再提问。
  _effects: state_parameter bc18-ridiculous-fame.legitimacy 15 -> 7; state_parameter bc18-ridiculous-fame.boredom 8 -> 20; state_parameter bc18-ridiculous-fame.invitations 0 -> 0; reputation -0.020000000000000018; mood -0.030000000000000027_

- **1952.01** `agency:support_process` tags: agency, agency:support_process
  Klara想帮忙，但组织者不信任新来的人，只让其在外围等消息。
  _effects: mood -0.040000000000000036; reputation -0.010000000000000009_

- **1952.01** `initiative:found_process:org:r15-faction:evt:world-vienna-1912:013254`
  权力俱乐部在Leopoldstädter Zinshaus, gemeinsamer Gang经过数年的招募、会议和互助，把分散的行动整理成公开纲领；这不是预先写好的历史，而是成员自己累积出来的运动。
  _effects: historical process 权力俱乐部的持续运动; historical development:initiative-org:r15-faction:evt:world-vienna-1912:013254-1952 as organizer; historical development:initiative-org:r15-faction:evt:world-vienna-1912:013254-1952 as organizer; knowledge “权力俱乐部的持续运动不是一次会议，而是我们这些年积累出来的持续组织。”; reputation 0.030000000000000027_

- **1952.01** `historical_phase`
  历史进程《权力俱乐部在Leopoldstädter Zinshaus, gemeinsamer Gang经过数年的招募、会议和互助，把分散的行动整理成公开纲领；这不是预先》从 emerging 进入 mobilizing。
  _effects: knowledge “我亲历或知晓「权力俱乐部在Leopoldstädter Zinshaus, gemeinsamer Gang经过数年的招”; knowledge “我亲历或知晓「权力俱乐部在Leopoldstädter Zinshaus, gemeinsamer Gang经过数年的招”_
  _causes: evt:world-vienna-1912:015193_

- **1953.01** `statistical_death/violence` tags: death
  Klara在Leopoldstädter Zinshaus, gemeinsamer Gang卷入一场冲突，头部和胸口受了重伤。旁人把人抬回家，夜里伤势恶化。Berta Bauer在场。
  _effects: death (暴力); flag -ridiculously_famous_
## Mitzi

Born 1912.01, alive at 1957.
Education: apprenticeship 0; occupation: none; roles: infant, child, pupil, roof_group_member, wife, medicine_seeker, refused_suitor, cooperative_founder, watched_by_police, marked_worker, office:夜班饲养员, displaced_person, housing_waitlist, separated, rescuer, mourner, apologized_publicly.

### State snapshot
- wish-knowledge [person] (active) parameters={"intensity":0.55,"fixation":0.5,"irony":0.3} links={} ticks=9
- p22-family-legend [person] (ended 1913.12: replaced_by:p22-family-legend) parameters={"warmth":80,"secrecy":17,"danger":5,"promise":62} links={} ticks=1
- p22-family-legend [person] (ended 1919.1: duration expired) parameters={"warmth":75,"secrecy":67,"danger":13,"promise":44} links={} ticks=4
- p22-child-omen [person] (ended 1920.1: exit condition met) parameters={"strangeness":61,"attention":74,"protection":31,"fear":56} links={} ticks=4
- iw18-imaginary-friend [person] (ended 1920.1: duration expired) parameters={"closeness":63,"secrecy":27,"boldness":40} links={} ticks=2
- yf18-first-awakening [person] (ended 1929.1: duration expired) parameters={"intensity":61,"nerve":43,"talk":7,"reciprocated":true,"secret":true} links={"beloved":"Lena"} ticks=3
- apprenticeship-contract [person] (ended 1929.1: the master ended the contract) parameters={"progress":37,"failures":2,"trade":"木工","paid":true} links={} ticks=4
- ml18-sudden-fortune [household] (ended 1930.1: duration expired) parameters={"principal":0,"spent":10,"claims":3,"public":true,"source":"分给马票经纪人的一半"} links={} ticks=3
- yf18-runaway-plan [person] (ended 1927.1: the plan was executed before dawn) parameters={"preparation":35,"suspicion":23,"resolve":68,"destination":"格拉茨","ticket":true} links={} ticks=0
- yf18-runaway-plan [person] (ended 1929.1: duration expired) parameters={"preparation":45,"suspicion":5,"resolve":60,"destination":"格拉茨","ticket":false} links={} ticks=1
- failed-apprentice [person] (ended 1937.1: duration expired) parameters={} links={} ticks=1
- em18-family-archive [household] (ended 1940.1: duration expired) parameters={"order":43,"secrets":61,"quarrel":62,"access":37} links={} ticks=11
- p22-wild-fortune [person] (ended 1933.1: duration expired) parameters={"height":64,"absurdity":68,"witnesses":75,"fragility":57} links={} ticks=2
- p22-scandal-engine [person] (ended 1931.1: replaced_by:p22-scandal-engine) parameters={"heat":45,"reach":60,"leverage":50,"shame":40} links={} ticks=0
- p22-scandal-engine [person] (ended 1932.1: replaced_by:p22-scandal-engine) parameters={"heat":70,"reach":65,"leverage":35,"shame":60} links={} ticks=0
- public-scandal [person] (ended 1932.1: replaced_by:public-scandal) parameters={} links={} ticks=0
- p22-scandal-engine [person] (ended 1933.1: replaced_by:p22-scandal-engine) parameters={"heat":76,"reach":69,"leverage":37,"shame":63} links={} ticks=0
- public-scandal [person] (ended 1933.1: replaced_by:public-scandal) parameters={} links={} ticks=0
- p22-scandal-engine [person] (ended 1934.1: replaced_by:p22-scandal-engine) parameters={"heat":76,"reach":69,"leverage":37,"shame":63} links={} ticks=0
- public-scandal [person] (ended 1935.1: duration expired) parameters={} links={} ticks=1
- p22-wild-fortune [person] (ended 1937.1: duration expired) parameters={"height":64,"absurdity":68,"witnesses":75,"fragility":57} links={} ticks=2
- p22-scandal-engine [person] (ended 1935.1: replaced_by:p22-scandal-engine) parameters={"heat":51,"reach":64,"leverage":52,"shame":43} links={} ticks=0
- fm17-miracle-witness [person] (ended 1935.1: duration expired) parameters={"certainty":50,"attention":45,"obligation":10} links={} ticks=2
- p22-scandal-engine [person] (ended 1937.1: replaced_by:p22-scandal-engine) parameters={"heat":73,"reach":73,"leverage":40,"shame":65} links={} ticks=1
- public-scandal [person] (ended 1937.1: duration expired) parameters={} links={} ticks=1
- mb17-remittance-web [household] (ended 1946.1: duration expired) parameters={"obligation":87,"supportSent":11,"arrears":12,"relativesAway":3} links={} ticks=6
- pl19-protected-scandal [person] (ended 1938.1: duration expired) parameters={"exposure":55,"protection":38,"leverage":10,"publicHeat":65} links={"protector":"Franz Hofer"} ticks=2
- public-scandal [person] (ended 1939.1: duration expired) parameters={} links={} ticks=1
- p22-scandal-engine [person] (ended 1939.1: duration expired) parameters={"heat":43,"reach":53,"leverage":25,"shame":40} links={} ticks=2
- ml18-sudden-fortune [household] (ended 1939.1: duration expired) parameters={"principal":12,"spent":0,"claims":4,"public":true,"source":"赌场的车马费"} links={} ticks=2
- pl19-protected-scandal [person] (ended 1939.1: duration expired) parameters={"exposure":55,"protection":49,"leverage":15,"publicHeat":57} links={"protector":"Rosa Bauer"} ticks=1
- hs18-street-witness [person] (ended 1941.1: the witness became more dangerous than the crime) parameters={"certainty":95,"danger":90,"retellings":1,"claim":"我没签字，但看见是谁搬走了钢琴。","quiet":false} links={} ticks=1
- p22-wild-fortune [person] (ended 1941.1: duration expired) parameters={"height":29,"absurdity":58,"witnesses":45,"fragility":32} links={} ticks=2
- political-suspect [person] (ended 1944.1: the file became an arrest) parameters={"heat":0.9700000000000001,"file":"政治档案"} links={} ticks=3
- bc18-bureaucratic-ghost [person] (ended 1944.1: duration expired) parameters={"fileDepth":39,"sightings":1,"risk":40,"duplicates":1,"officialStatus":"在户籍册上已死亡","alias":"一份注销的配给卡"} links={} ticks=3
- pc20-public-reversal [person] (ended 1948.1: duration expired) parameters={"proof":35,"pressure":88,"support":27,"danger":70} links={"accuser":"Ferdinand Lechner"} ticks=4
- oj18-odd-apprenticeship [person] (ended 1947.1: duration expired) parameters={"trust":24,"strangeKnowledge":30,"reliability":45,"nightsWorked":24,"post":"动物园夜班饲养员"} links={} ticks=3
- detained [person] (ended 1946.1: duration expired) parameters={"charge":"政治嫌疑","months":6} links={} ticks=1
- ml18-sudden-fortune [household] (ended 1946.1: duration expired) parameters={"principal":18,"spent":0,"claims":5,"public":true,"source":"叔父的印刷所"} links={} ticks=2

### 287 subject events

- **1912.11** `vienna-infant-household.croup/doctor-call` tags: infancy, health, family, home
  Rosa Lechner打发邻居去请街角的医生。医生提着皮包来，听了听胸口，留下半瓶药水，收走一克朗。Mitzi三天后不再咳得蜷成一团。
  _effects: cash -1 (医生出诊费和药水钱); health 0.039999999999999925 (服了止咳药水); relation acquaintance with person-hermann-kral_

- **1912.12** `p22-warm-naming-feast::ctx-vienna-1912::milieu-tenement/the-name-is-too-long` tags: infancy, family, feast, name, neighbor, warm, tender, drama
  两个祖母的名字都想要，最后写在纸上连成一串。Anna Moser念到一半就笑了，说这孩子以后签名字要多蘸一次墨水；Mitzi在摇篮里睡着，拳头举在耳边，蛋糕上只插了一根蜡烛。
  _effects: mood 0.04; relation acquaintance with person-phase15-Mitzi-world-vienna-1912; flag +double_name; knowledge “我的名字里有两个祖母的名字。”; state_add p22-family-legend state:world-vienna-1912:18_

- **1912.12** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Mitzi家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 15 -> 19; state_parameter p22-family-legend.warmth 75 -> 77; mood 0.01_
  _causes: evt:world-vienna-1912:000108_

- **1912.12** `vienna-life-birth-letter-from-the-dead/the-letter-is-a-bill` tags: infancy, family, secret, letter, drama
  信里没有问候，只有一张旧账单：棺材、墓地、一趟从边境回来的车费。Rosa Lechner把账单翻过来，背面用铅笔写着“别让孩子知道”。Mitzi伸手去抓纸角，Rosa Lechner没有让。
  _effects: cash -4 (paid an old funeral debt); flag +family_debt_letter; mood -0.03_

- **1913.01** `state_tick:p22-family-legend/the-story-changes-hands/told-at-the-table` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，Mitzi家的故事在饭桌上换了新的讲法：多了一句笑话，少了一处哭声。听的人把汤匙放下，等下一句；讲故事的人却先去看窗子有没有关好，谁也没有先动筷子。
  _effects: state_parameter p22-family-legend.warmth 77 -> 80; state_parameter p22-family-legend.secrecy 19 -> 17; state_parameter p22-family-legend.promise 60 -> 62; mood 0.01_

- **1913.02** `vienna-life-toddler-first-words/first-word-nonsense` tags: infancy, family, first, comic
  Mitzi说了一长串谁也听不懂的话，最后用力点头，像是在宣布一件已经决定的事。Rosa Lechner认真听完，也点了点头；孩子满意地爬走了，留下大人们互相看着，忍不住笑。
  _effects: mood 0.04; skill_

- **1913.10** `vienna-infant-household.laundry-day/sibling-watches` tags: infancy, health, family, home
  Rosa Lechner在厨房的木盆里搓亚麻布，热水汽模糊了窗。Mitzi Lechner坐在摇床边的矮凳上晃拨浪鼓，Mitzi伸手去抓。等Rosa Lechner晾完最后一块尿布，Mitzi已经在Mitzi Lechner的看护下睡熟，摇床没被蹬歪。
  _effects: relation kin with person-phase15-Mitzi-world-vienna-1912; health 0.020000000000000018 (被看护着，没磕碰); mood 0.03_

- **1913.10** `p22-strange-doctor-prediction::ctx-vienna-1912::milieu-tenement/the-doctor-writes-nothing` tags: infancy, family, doctor, illness, omen, strange, dark, drama
  医生听完胸口，提笔写了一句，又划掉，只留下一个墨团。他把纸折好，说“把屋子烧暖一点”；Alois Lechner等医生走后，对着灯看那张纸，认出墨团底下露出半个“冬”字，灯芯正好爆了一下。
  _effects: state_add p22-child-omen state:world-vienna-1912:36; mood -0.04000000000000001; knowledge “医生写下又划掉的诊断里，露出一个“冬”字。”_

- **1913.10** `state_reaction:p22-child-omen/a-stranger-touches-the-door` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  一个陌生人把手按在Mitzi家的门框上，说这样能把坏运气留在门外。大人没有拦，只等那人走远，才用湿布把门框擦了一遍，布上留下一点灰，门框上留下一道浅印。
  _effects: state_parameter p22-child-omen.attention 65 -> 70; state_parameter p22-child-omen.fear 55 -> 59; state_parameter p22-child-omen.protection 25 -> 27; mood -0.010000000000000002_
  _causes: evt:world-vienna-1912:000287_

- **1913.12** `p22-warm-anonymous-gifts::ctx-vienna-1912::milieu-tenement/a-parcel-of-coal` tags: infancy, family, gift, poverty, neighbor, warm, mystery, drama
  门口多了一小包煤，用旧报纸裹着，纸上没有字，还沾着一点面粉。Alois Lechner追到楼梯口，只看见一个穿灰外套的人拐过街角；那堆煤让屋里暖了整整一个星期。
  _effects: cash 3 (anonymous coal saved fuel money); mood 0.03; flag +anonymous_gift_coal; state_add p22-family-legend state:world-vienna-1912:35_

- **1913.12** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Mitzi家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 50 -> 54; state_parameter p22-family-legend.warmth 65 -> 67; mood 0.009999999999999998_
  _causes: evt:world-vienna-1912:000285_

- **1914.01** `vienna-life-toddler-wrong-cradle/the-blanket-is-wrong` tags: infancy, family, rumour, identity, comic, drama
  Friedrich Hofer盯着Mitzi的摇篮看了很久，说这床蓝被子不是这家人的。Alois Lechner把被子翻过来，角落绣着一个陌生的姓；Mitzi却抓着被角不放，像是认得它。Friedrich Hofer退后一步，说“我什么都没说”。
  _effects: flag +wrong_cradle_blanket; knowledge “摇篮里的蓝被子绣着一个陌生的姓。”; mood -0.03_

- **1914.01** `state_tick:p22-family-legend/the-story-changes-hands/a-detail-goes-missing` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，故事里最要紧的那件东西不见了：先是名字，后来是地点。Mitzi问起时，大人说“你记错了”；可柜子最底层那只空盒子，谁也没有扔，锁却换过了，钥匙也不见了。
  _effects: state_parameter p22-family-legend.secrecy 54 -> 58; state_parameter p22-family-legend.danger 10 -> 13; state_parameter p22-family-legend.warmth 67 -> 65; mood -0.01_

- **1914.01** `state_tick:p22-child-omen/the-omen-returns/the-coincidence-repeats` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  又过了一年，同一件小事又发生了：钟停在同一个时刻，门口的狗对着空处叫。Mitzi正在学系鞋带，抬头问“又来了吗”；大人说没有，手却先去摸门框，谁也没有回答。
  _effects: state_parameter p22-child-omen.strangeness 60 -> 65; state_parameter p22-child-omen.attention 70 -> 74; state_parameter p22-child-omen.fear 59 -> 62; mood -0.01_

- **1915.02** `p22-warm-night-move::ctx-klosterneuburg-rural-1912::milieu-tenement/the-cart-loses-a-wheel` tags: childhood, family, move, neighbor, tenement, warm, bittersweet, drama
  手推车在石子路上掉了一只轮子，锅碗滚了一地，邻居的独轮车吱呀作响。Emil Weiss从家里推来独轮车，两个孩子坐在车斗里笑；Rosa Lechner一边捡勺子，一边也忍不住笑。
  _effects: cash -2 (a broken cart wheel); mood 0.03; flag +cart_wheel_

- **1915.02** `p22-strange-grandmother-voice::ctx-klosterneuburg-rural-1912::milieu-tenement/the-child-is-playing` tags: childhood, family, grandmother, memory, omen, strange, eerie, drama
  Rosa Lechner认定孩子在学大人说话，笑着拍手。Mitzi愣了一下，又把那句话说得更响；Rosa也跟着学，三个人的声音在厨房里撞来撞去，最后谁也说不清原句是什么，一起笑了。
  _effects: mood 0.020000000000000004; relation kin with person-phase15-Mitzi-world-vienna-1912; flag +saying_is_a_game_

- **1915.02** `p22-drama-fire::ctx-klosterneuburg-rural-1912::milieu-tenement/the-neighbour-catches-the-child` tags: childhood, family, fire, accident, neighbor, survival, dramatic, danger
  油灯倒了，窗帘先冒烟，随后窜起火。Anna Moser冲进来，用湿毯子裹住Mitzi，自己的手背烧起一串水泡，后来留了疤。孩子的头发全是烟味，人还醒着，邻居的手一直抖，孩子记得。
  _effects: health -0.08000000000000002 (smoke and a tenement fire); condition; health -0.050000000000000044 (burns from the rescue); relation acquaintance with person-phase15-Mitzi-world-vienna-1912; cash -5 (burnt curtains and a new blanket); flag +fire_survived; mood -0.059999999999999984_

- **1915.02** `vienna-life-child-family-legend/stolen-inheritance` tags: childhood, family, secret, story
  Rosa Lechner说，家里本来有一件东西，后来被“更会说话的人”拿走了。Mitzi问是什么，Rosa Lechner只说是一块表，表盖里刻着姓。孩子记住了“表盖里刻着姓”，却没有记住那个姓。
  _effects: knowledge “家里有一块表盖里刻着姓的表，被一个更会说话的人拿走了。”; flag +family_legend_watch_

- **1915.02** `p22-strange-grandmother-voice::ctx-klosterneuburg-rural-1912::milieu-tenement/the-child-is-playing` tags: childhood, family, grandmother, memory, omen, strange, eerie, drama
  Rosa Lechner认定孩子在学大人说话，笑着拍手。Mitzi愣了一下，又把那句话说得更响；Mitzi Lechner也跟着学，三个人的声音在厨房里撞来撞去，最后谁也说不清原句是什么，一起笑了。
  _effects: mood 0.020000000000000018; relation kin with person-phase15-Mitzi-world-vienna-1912_

- **1915.11** `p22-comic-mistaken-child::ctx-klosterneuburg-rural-1912::milieu-tenement/the-cherries-under-the-stall` tags: childhood, family, market, neighbor, mistaken_identity, comic, tender, drama
  市场尽头，一个老太太抓住Mitzi的手腕，说“你可回来了”。Mitzi低头看见摊子底下露出两只鞋；真正的孩子正躲在那里吃樱桃，嘴边全是红的，手里还攥着老太太的篮子。
  _effects: mood 0.04000000000000001; relation acquaintance with person-phase15-Mitzi-world-vienna-1912; flag +mistaken_for_grandson; cash 1 (a handful of cherries)_

- **1916.01** `vienna-life-child-first-friend/shared-toy` tags: childhood, friendship, family, comic
  Emil Kral在楼道里滚一只铁环，Mitzi站在门口看。Emil Kral把铁环推过来，说“你推一次，我推一次”。两个人从楼梯口推到院子里，铁环倒下的声音把午睡的大人吵醒了一排。
  _effects: relation friend with person-materialized-world-vienna-1912-16; skill; mood 0.05; relation acquaintance with person-materialized-world-vienna-1912-16_

- **1916.01** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Mitzi家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 58 -> 62; state_parameter p22-family-legend.warmth 65 -> 67; mood 0.009999999999999995_
  _causes: evt:world-vienna-1912:000603_

- **1916.01** `state_tick:p22-family-legend/the-story-changes-hands/told-at-the-table` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，Mitzi家的故事在饭桌上换了新的讲法：多了一句笑话，少了一处哭声。听的人把汤匙放下，等下一句；讲故事的人却先去看窗子有没有关好，谁也没有先动筷子。
  _effects: state_parameter p22-family-legend.warmth 67 -> 70; state_parameter p22-family-legend.secrecy 62 -> 60; state_parameter p22-family-legend.promise 40 -> 42; mood 0.010000000000000009_

- **1916.01** `state_tick:p22-child-omen/the-omen-returns/nothing-happens` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  又过了一年，什么也没有发生。Mitzi照常吃饭、摔跤、把鞋穿反；那个说过预言的人搬走了。家里把红绳解下来，却没有扔，只收进针线盒最里面，红绳上落了一点灰。
  _effects: state_parameter p22-child-omen.strangeness 65 -> 63; state_parameter p22-child-omen.fear 62 -> 59; state_parameter p22-child-omen.protection 27 -> 29; mood 0.010000000000000009_

- **1916.02** `p22-drama-sibling-runs-away::ctx-klosterneuburg-rural-1912::milieu-tenement/the-neighbour-saw-him` tags: childhood, family, sibling, runaway, river, police, dramatic, dark
  邻居说在车站看见Mitzi Lechner，背着一只旧包，往南边去了。Rosa Lechner追到车站，回来时一个人；Mitzi问Mitzi Lechner呢，Rosa Lechner只说“会回来的”，然后把门闩上，车站的钟正好敲了四下，门闩响了很久。
  _effects: mood -0.03999999999999998; relation acquaintance with person-rosa-lechner; flag +station_sighting_

- **1917.01** `vienna-life-child-inherited-wish/the-dead-grandmothers-wish` tags: childhood, family, wish, grief, uncanny, drama
  Mitzi在饭桌上忽然说：“等我长大了，要把那间屋子买回来。”Rosa Lechner的勺子停在半空，因为这句话是去世多年的外婆常说的，连“那间屋子”都指得一模一样。Mitzi说完就低头喝汤，好像只是随口。
  _effects: flag +inherited_wish_house; knowledge “孩子说要把“那间屋子”买回来，和去世的外婆说过的一模一样。”; mood -0.010000000000000009_

- **1917.02** `kernel-child.first-school-day::ctx-klosterneuburg-rural-1912::milieu-tenement/edu-school-enrolled` tags: childhood, school, enrolment, teacher, fees, rural, agriculture, small_town
  开学那天，Rosa Lechner用旧布给Mitzi缝了一个书包，里面是一块石板、一支石笔和半块面包。Maria Moser在门口点名，念到Mitzi时抬头看了一眼，说进来吧，坐第三排。Mitzi把石板放正，手心全是汗。
  _effects: education primary; cash -2 (slate, chalk and a school bag); relation acquaintance with person-materialized-world-vienna-1912-15; role; skill; flag +started_school; relation acquaintance with person-materialized-world-vienna-1912-15_

- **1917.06** `p22-drama-inheritance-papers::ctx-klosterneuburg-rural-1912::milieu-tenement/the-papers-are-copied` tags: childhood, family, inheritance, papers, secret, official, dramatic, dark
  家里花钱要了一份副本。副本和原件一字不差，唯独少了一页；公证人说那一页本来就不存在。Mitzi在旁边数纸角，数来数去都是双数，只有那一份是单数。
  _effects: cash -8 (a certified copy); knowledge “继承文书的副本少了一页。”; flag +missing_page; state_parameter p22-family-legend.secrecy 60 -> 65; relation acquaintance with person-materialized-world-vienna-1912-12_

- **1918.01** `state_tick:p22-family-legend/the-story-changes-hands/told-at-the-table` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，Mitzi家的故事在饭桌上换了新的讲法：多了一句笑话，少了一处哭声。听的人把汤匙放下，等下一句；讲故事的人却先去看窗子有没有关好，谁也没有先动筷子。
  _effects: state_parameter p22-family-legend.warmth 72 -> 75; state_parameter p22-family-legend.secrecy 69 -> 67; state_parameter p22-family-legend.promise 42 -> 44; mood 0.010000000000000009_

- **1918.01** `state_tick:p22-child-omen/the-omen-returns/nothing-happens` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  又过了一年，什么也没有发生。Mitzi照常吃饭、摔跤、把鞋穿反；那个说过预言的人搬走了。家里把红绳解下来，却没有扔，只收进针线盒最里面，红绳上落了一点灰。
  _effects: state_parameter p22-child-omen.strangeness 63 -> 61; state_parameter p22-child-omen.fear 59 -> 56; state_parameter p22-child-omen.protection 29 -> 31; mood 0.010000000000000009_

- **1918.01** `p9-gap-childhood-chores.stay-after-school/stay-early-morning` tags: childhood, household, chores, school, task, daily, teacher, learning
  “老师，我能留下来吗？”Mitzi问完就盯着自己的鞋尖。Hermann Bauer想了一会儿，说早上来，人少。天没亮，Mitzi已经站在校门口，手指冻得伸不直。教室里只有炉火和粉笔灰的味道，Hermann Bauer把一道竖式拆成三行，让Mitzi跟着念一遍。
  _effects: skill; health -0.020000000000000004 (天没亮出门，早春的冷); relation acquaintance with person-materialized-world-vienna-1912-22; relation acquaintance with person-materialized-world-vienna-1912-22_

- **1918.02** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Mitzi家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 65 -> 69; state_parameter p22-family-legend.warmth 70 -> 72; mood 0.010000000000000009_
  _causes: evt:world-vienna-1912:000924_

- **1918.07** `iw18-friend.chair-by-the-stove::ctx-klosterneuburg-rural-1912::milieu-tenement/a-guest-named-by-the-child` tags: childhood, play, imaginary_friend, solitude, family, wonder, rural, agriculture
  Mitzi从碗橱里多拿了一只缺口的盘子，摆在灶边那把没人坐的椅子上，还认真地告诉屋里的人：今天有客人。盘子里放着一小块土豆和一片面包边。Rosa Lechner问客人叫什么，Mitzi说了一个从没听过的名字。
  _effects: state_add iw18-imaginary-friend state:world-vienna-1912:58; food; mood 0.04000000000000001; flag +invisible_guest_named; flag +imaginary_friend_active_

- **1918.08** `p9-childhood-household.fever-night/called-corner-doctor` tags: childhood, family, household, home, siblings, illness, neighbors
  楼梯上传来皮包磕碰的声音，Theresia Huber把医生领进门。医生看了看Mitzi的舌苔，又听了听胸口，说先把热度压下去。药粉包在旧纸里，苦味隔着纸都能闻到。Rosa Lechner付了两克朗，把那张饮食单压在盐罐底下。
  _effects: cash -2 (出诊费和药粉); health 0.06 (服药后热退了些); relation acquaintance with person-theresia-huber_

- **1918.10** `iw18-play.toy-theatre::ctx-klosterneuburg-rural-1912::milieu-tenement/the-child-charges-admission` tags: childhood, play, theatre, family, wonder, comic, rural, agriculture
  Mitzi把戏台搬到楼梯间，向来看的孩子收两枚纽扣或一张糖纸。第一场来了四个人，第二场来了七个；Rosa Lechner下楼倒水时，看见孩子正一本正经地检票，门口排着一串补丁裤子。
  _effects: cash 1 (buttons and paper taken as theatre admission); reputation 0.02; mood 0.04000000000000001; flag +toy_theatre_admission_

- **1919.01** `vienna-life-school-day/hungry-in-class` tags: childhood, school, hunger, injury
  Mitzi早上只喝了一碗清汤，第二节课时眼前发黑。Hermann Bauer让孩子去走廊坐一会儿，给了半块面包；Mitzi把面包屑拢在手心吃完，胃里还是空的，但看Hermann Bauer的眼神软了些，回到座位时把腰挺直了一点。
  _effects: health -0.03 (went to school hungry); condition; relation acquaintance with person-materialized-world-vienna-1912-22_

- **1919.01** `state_expire:p22-family-legend` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  Mitzi的「家族传说」到期；相关安排结束。
  _effects: state_remove p22-family-legend state:world-vienna-1912:35_

- **1919.01** `state_tick:iw18-imaginary-friend/friend-year/still-there` tags: iw18-imaginary-friend, childhood, play, imaginary_friend, solitude, imagination, secret, state
  又过了一年，Mitzi还给那把空椅子留着位置。椅面上有一道被裤子磨亮的痕迹，大人说那是旧漆；Mitzi知道那是朋友坐出来的。冬天煤少，Mitzi把最暖的位置让给椅子，自己坐在床沿。
  _effects: state_parameter iw18-imaginary-friend.closeness 60 -> 63; state_parameter iw18-imaginary-friend.secrecy 25 -> 27; mood 0.020000000000000018_

- **1919.01** `p9-gap-childhood-chores.laundry-help/laundry-dragged-docked-pay` tags: childhood, household, chores, school, task, daily, laundry, work
  “你看看这角。”Emil Kral把床单拎起来，煤渣簌簌往下掉。Mitzi伸手去拍，反而把灰按进布纹里。Emil Kral从工钱里数回两枚，只留一赫勒在Mitzi手心，让重洗那角。晚饭前Mitzi一直蹲在井台边，换了两盆水，指甲缝里全是黑泥。
  _effects: cash 0.01 (被扣后只剩一赫勒); mood -0.04999999999999999; relation acquaintance with person-materialized-world-vienna-1912-16; relation acquaintance with person-materialized-world-vienna-1912-2_

- **1919.09** `vienna-childhood-street.washhouse-fever/fever-recover` tags: childhood, street, social, home, injury
  洗衣房里全是蒸汽和碱水味。Mitzi靠在墙边等Rosa Lechner，湿衣服堆在脚边。夜里Mitzi开始发烧，Rosa Lechner把湿布叠成长条，敷在额头，凉了再换。三天后热度退下去，Mitzi的嘴唇起了一层白皮，Rosa Lechner的手指也裂了口子。
  _effects: health -0.09999999999999998 (热病高烧); condition; relation kin with person-rosa-lechner_

- **1919.11** `vienna-school-childhood.fountain-pen/fountain-pen.gift` tags: school, social, childhood
  旧钢笔的笔尖歪向左边，Mitzi写出来的字母也跟着歪。Rosa Lechner说工具包里翻出来的，凑合用。Maria Moser的红圈画在歪字母旁边。
  _effects: skill; relation kin with person-rosa-lechner; relation acquaintance with person-materialized-world-vienna-1912-15_

- **1920.01** `state_exit:p22-child-omen` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  Mitzi不再处于「孩子身上的兆头」；条件已经改变。
  _effects: state_remove p22-child-omen state:world-vienna-1912:36_

- **1920.01** `state_expire:iw18-imaginary-friend` tags: iw18-imaginary-friend, childhood, play, imaginary_friend, solitude, imagination, secret, state
  Mitzi的「一个只有孩子看得见的朋友」到期；相关安排结束。
  _effects: state_remove iw18-imaginary-friend state:world-vienna-1912:58; flag -imaginary_friend_active_

- **1920.01** `p9-gap-childhood-chores.stay-after-school/stay-twice-cleaning` tags: childhood, household, chores, school, task, daily, teacher, learning
  错题纸被Mitzi攥出了汗印。Grete Moser 3看了一眼，说留两次可以，先把炉灰倒了。灰桶提到后院时，风从巷口灌进来，灰扑了Mitzi一脸。Grete Moser 3回来没催，用粉笔在黑板上把一道竖式拆成三步，让Mitzi跟着写在自己的石板边上。
  _effects: skill; relation acquaintance with person-materialized-world-vienna-1912-31; health -0.020000000000000018 (倒炉灰吸入灰尘); relation acquaintance with person-materialized-world-vienna-1912-31_

- **1920.02** `r2-rural.child-farm-labor::ctx-klosterneuburg-rural-1912::milieu-tenement/kept-in-school` tags: rural, child_labour, harvest, school, injury, agriculture, small_town, peace
  Hermann Bauer来家里说Mitzi的算术跟得上，不该缺课。Rosa Lechner把学费的事说了一遍，Hermann Bauer说可以免一半。Mitzi坐在门槛上，一手攥着课本，一手攥着没剥完的豆子。
  _effects: flag +kept_child_in_school; skill; relation friend with person-materialized-world-vienna-1912-22; relation rival with person-rosa-lechner; education primary; relation acquaintance with person-materialized-world-vienna-1912-26_

- **1920.08** `iw18-school.ink-pot::ctx-klosterneuburg-rural-1912::milieu-tenement/the-teacher-says-nothing` tags: childhood, school, cruelty, shame, teacher, ink, rural, agriculture
  Anna Bauer 2从讲台抽屉里拿出一块湿布，把桌上的墨迹慢慢擦掉，又把Mitzi的抄写本翻到新的一页，说“重抄”。整个教室只有布擦过木头的沙沙声；Mitzi低头写字时，第一次明白有些大人不需要发火也能让人害怕。
  _effects: mood -0.01999999999999999; relation acquaintance with person-materialized-world-vienna-1912-13; skill; flag +ink_wiped_in_silence; relation acquaintance with person-materialized-world-vienna-1912-13_

- **1921.01** `p9-gap-childhood-chores.laundry-help/laundry-dragged-docked-pay` tags: childhood, household, chores, school, task, daily, laundry, work
  “你看看这角。”Hermann Kral把床单拎起来，煤渣簌簌往下掉。Mitzi伸手去拍，反而把灰按进布纹里。Hermann Kral从工钱里数回两枚，只留一赫勒在Mitzi手心，让重洗那角。晚饭前Mitzi一直蹲在井台边，换了两盆水，指甲缝里全是黑泥。
  _effects: cash 0.01 (被扣后只剩一赫勒); mood -0.05000000000000002; relation acquaintance with person-hermann-kral_

- **1921.01** `vienna-childhood-street.washhouse-fever/fever-recover` tags: childhood, street, social, home, injury
  Mitzi在洗衣房的长凳上睡着，醒来时喉咙像塞了棉花。Rosa Lechner把最后的干净布巾浸了凉水，敷在Mitzi额头上，整夜换了七八回。第四天Mitzi能坐起来喝粥，下嘴唇脱下一小片皮，Rosa Lechner用指尖替Mitzi拈掉。
  _effects: health -0.09999999999999998 (热病高烧); relation kin with person-rosa-lechner_

- **1921.07** `r2-leisure.swimming-lesson::ctx-klosterneuburg-rural-1912::milieu-tenement/nearly-drowned` tags: leisure, swimming, river, fear, lesson, rural, agriculture, small_town
  Mitzi刚把脚抬起来，水就没过下巴。河底的石头一滑，整个人往下沉，眼前全是绿色的光。Anna Bauer 2一把抓住Mitzi的后领，把人拖到浅水；Mitzi吐出一口水，咳得眼泪都出来。Marie Huber在岸上喊，Rosa Lechner已经跑进水里，鞋都没脱。
  _effects: health -0.09999999999999998 (多瑙河的第一口气); mood -0.15; condition; flag +nearly_drowned_in_river; relation guardian with person-materialized-world-vienna-1912-13; relation kin with person-rosa-lechner_

- **1922.01** `p9-gap-childhood-chores.stay-after-school/stay-list-instead` tags: childhood, household, chores, school, task, daily, teacher, learning
  锁门的人在走廊里咳嗽了一声。Anna Bauer 2一边道歉一边收拾，最后从粉笔盒底下抽出一张旧练习纸，圈了四道题。Mitzi接过来，想问第二题怎么开头，Anna Bauer 2已经提着包下楼了。校门口还有太阳，Mitzi把纸摊在台阶上看了一会儿。
  _effects: skill; mood -0.03; relation acquaintance with person-materialized-world-vienna-1912-13_

- **1922.03** `vienna-school-childhood.coal-sled/coal-sled.trade` tags: school, social, childhood
  Mitzi在坡顶遇到住同一栋楼的Lena，对方用一块焦炭换雪橇滑三次。Mitzi把焦炭带回家，Rosa Lechner把它添进炉子，屋里多暖了一刻钟。
  _effects: food; relation friend with person-phase15-Lena-world-vienna-1912; mood 0.04_

- **1922.10** `vienna-childhood-friends.courtyard-race/won-the-race-lost-a-button` tags: childhood, social, school, street
  晒衣绳下挂着湿床单，孩子们绕着跑，鞋底把水甩到墙上。Mitzi在第三圈超过Elisabeth Bauer 2，手先碰到墙根。两颗玻璃弹珠进了Mitzi口袋，外套第二颗纽扣却崩进下水道。Elisabeth Bauer 2从二楼窗口骂了一句，扔下一根别针。
  _effects: mood 0.049999999999999996; relation acquaintance with person-materialized-world-vienna-1912-14; relation acquaintance with person-materialized-world-vienna-1912-14_

- **1923.01** `p9-gap-childhood-chores.laundry-help/laundry-bread-with-friend` tags: childhood, household, chores, school, task, daily, laundry, work
  Hedwig Stein家的孩子站在绳子另一头，Mitzi递夹子时故意慢半拍，两个人把床单拉得没有一道褶。收工后Hedwig Stein端出半包隔夜面包，掰开时掉了一桌屑。Mitzi把分到的那块用围裙兜住，回家路上闻着麦味，硬是没咬。
  _effects: food; relation acquaintance with person-hedwig-stein; skill; relation acquaintance with person-materialized-world-vienna-1912-28_

- **1924.01** `state_tick:wish-knowledge/knowledge-pressure/press-on` tags: wish-knowledge, wish, wish:knowledge, knowledge, education, curiosity, state, state_tick
  Mitzi又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.020000000000000004; flag +wish:knowledge:pursuing_

- **1924.02** `vienna-youth-threshold.sibling-departure/coins-into-box` tags: adolescence, school, work, family, transition
  Mitzi Lechner的箱子摊在床板上，里面是两件衬衫、一双旧靴和母亲塞的一小袋面粉。Mitzi把攒了半年的零钱数到第三遍，一共一克朗二十赫勒，全塞进箱角的袜子里。Mitzi Lechner看见了，没说话，只把箱子扣上，铜扣响了一声。
  _effects: cash -1.2 (把攒下的零钱塞给离家的兄姐); mood -0.03_

- **1924.02** `r13-turn.school-leaving::ctx-vienna-reform-1930::milieu-tenement::reform-leaving-age/signed-apprenticeship` tags: education, school, work, family, transition, reform, medical, schooling
  毕业钟敲过三下，Maria Moser把成绩单按在讲台上，说Mitzi还能再读一年，只要家里肯出四克朗。家里人在走廊里把学徒契约展开，纸角还带着面粉。Mitzi签了名，第二天就站到刨床前，手指上多了第一道木刺。
  _effects: cash -2 (毕业钟响过以后); flag +left_school_for_apprenticeship; role; education apprenticeship_

- **1924.03** `r3-teen.first-friend-group::ctx-vienna-reform-1930::milieu-tenement/admitted` tags: friendship, roof, belonging, betrayal, class, reform, medical, schooling
  屋顶上的暗号是两声口哨。Mitzi吹对了一声，第二声卡在喉咙里，Berta Kral笑着替她补上。四个人分吃一袋偷来的栗子，壳扔到楼下，砸在Katharina Winter的雨棚上。
  _effects: mood 0.08; flag +joined_roof_group; role; relation friend with person-materialized-world-vienna-1912-50; relation acquaintance with person-materialized-world-vienna-1912-50; relation acquaintance with person-materialized-world-vienna-1912-11_

- **1924.03** `state_reaction:wish-knowledge/knowledge-humiliation` tags: wish-knowledge, wish, wish:knowledge, knowledge, education, curiosity, state, state_reaction
  Mitzi把那句轻视记了很久。它没有变成一个决定，但也没有消失。
  _effects: mood -0.04000000000000001; flag +wish:knowledge:wounded_
  _causes: evt:world-vienna-1912:002418_

- **1924.06** `r1-child.reform-school::ctx-vienna-reform-1930::milieu-tenement/could-not-write-the-word-steal` tags: reform_school, theft, institution, poverty, punishment, reform, medical, schooling
  Friedrich Hofer让Mitzi写悔过书，Mitzi写不出“偷”字，只画了一筐煤和一家人。Friedrich Hofer看了很久，把纸折起来，说回去吧，下不为例。Mitzi跑回家，看见母亲正在煮煤渣掺的糊糊。
  _effects: mood -0.06; flag +warned_not_sent_to_reform_school; relation colleague with person-friedrich-hofer; knowledge “the clerk let him go after a drawing instead of a confession”_

- **1925.01** `r13-edu.exam-eve::ctx-vienna-reform-1930::milieu-tenement/memorized-wrong-step` tags: education, exam, study, poverty, adolescence, reform, medical, schooling
  Mitzi把老师讲的例题步骤全背下来，却没弄懂为什么移项。卷子发下来，第一道大题就卡住，Mitzi在草稿纸上画满小人，交卷前只写出一个答案。回家后Mitzi把那张卷子折成纸飞机，扔出窗外，又下楼捡了回来。纸飞机摔在煤堆上。
  _effects: mood -0.08; skill_

- **1925.02** `r15-work.master-takes-on::ctx-vienna-reform-1930::milieu-tenement/turned-away` tags: work, craft, apprentice, trade, poverty, reform, medical, schooling
  Gustav Moser看了看Mitzi的手，说太小，拿不稳凿子。Mitzi回家没有提这件事，第二天去码头找零工。
  _effects: mood -0.08; flag +apprenticeship_refused; relation acquaintance with person-materialized-world-vienna-1912-33_

- **1925.07** `vienna-adolescence.brothers-torn-jacket/sew-it-yourself` tags: adolescence, school, work, family, social
  外套腋下裂了一道口子，里布翻出来。Mitzi把袖口套在桌角上撑开，穿针时试了三次才引上线。针脚一针长一针短，像蜈蚣。Rosa Lechner端着汤进来，站在桌边看了一会儿，把碗往Mitzi那边推了推，自己只留了半碗。
  _effects: skill; food; relation kin with person-rosa-lechner_

- **1925.08** `r15-work.master-takes-on::ctx-vienna-reform-1930::milieu-tenement/signed-contract` tags: work, craft, apprentice, trade, poverty, reform, medical, schooling
  Mitzi Hofer把学徒契约摊在桌上，指给Mitzi看期限、工钱和出师考试。Mitzi签了名，第二天站到刨床前，手指上多了第一道木刺。
  _effects: relation employer with person-materialized-world-vienna-1912-25; state_add apprenticeship-contract state:world-vienna-1912:153; relation acquaintance with person-materialized-world-vienna-1912-25; education apprenticeship_

- **1925.10** `kernel-edu.friendship::ctx-vienna-reform-1930::milieu-tenement/edu-friend-moves-away` tags: adolescence, school, friendship, books, family, reform, medical, schooling
  Klara的父亲在车站找到活，全家要搬去另一区。临走前，Klara把一本旧书塞给Mitzi，扉页上写着地址。Mitzi把书读完，按地址写了信，信被退回来，上面盖着“查无此人”。那本旧书Mitzi一直留在书架上。
  _effects: knowledge “朋友搬走前留下的地址已经找不到人了。”; skill; flag +friend_moved_away; mood -0.04999999999999999_

- **1926.01** `state_tick:apprenticeship-contract/workshop-year/learned` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Mitzi又学会了一道工序。师傅没有夸，只把下一块料推到面前。
  _effects: state_parameter apprenticeship-contract.progress 10 -> 30; skill; mood 0.020000000000000004_

- **1926.01** `p9-childhood-youth-aspiration.join-a-club/joined-and-borrowed` tags: adolescence, education, aspiration, school, books, club, exam, task
  Mitzi跟着Hermann Berg走进印刷厂后面的屋子，交了十赫勒会费，在借书簿上按了手印。他挑了一本讲蒸汽机的册子，封面烫金已经磨掉；管理员说下月十赫勒要按时交，书才能续借。
  _effects: cash -0.1 (工人青年会月费); skill; relation friend with person-materialized-world-vienna-1912-51; flag +workers_youth_member; mood 0.039999999999999994_

- **1926.02** `yf18-body.danube-cabin::ctx-vienna-reform-1930::milieu-tenement/wade-in-first` tags: body, desire, river, swimming, shame, first_love, reform, medical
  多瑙河的浴棚按男女分开，木板缝里能看见对面的人影。Mitzi穿着借来的毛线泳衣，站在第三间门口不敢下水；Lena从水里冒出来，头发贴在额头上，说水不冷。Mitzi走进河里时，满脑子都是自己肋骨上那道疤。
  _effects: state_add yf18-first-awakening state:world-vienna-1912:152; health 0.020000000000000018 (cold river water and a long swim); relation friend with person-phase15-Lena-world-vienna-1912; mood 0.03; relation acquaintance with person-materialized-world-vienna-1912-51; flag +yf18_first_awakening_active_

- **1926.03** `vienna-adolescence.workshop-apprentice/apprenticeship-accepted` tags: adolescence, school, work, family, social
  作坊里全是松木味。Buchdruckerei Winter & Söhne把一块方木夹进台钳，让Mitzi推刨子。Mitzi推了十分钟，木花卷到脚背上，刨面总算平了。Buchdruckerei Winter & Söhne用拇指摸了摸，收下Mitzi，从钱盒里数出三克朗，说是头一周的饭钱。Rosa Lechner在门口把围裙攥得很紧。
  _effects: cash 3 ({subject}学徒首周的膳食预付款); education apprenticeship; reputation 0.1; relation kin with person-rosa-lechner_

- **1926.12** `p9-childhood-adolescence.courtyard-gang/gang-help-with-bread` tags: adolescence, friendship, identity, work, school, secret, church
  面包房关门前Mitzi和Ferdinand Bauer凑了四赫勒，分到一块凉了的面包。夜里母亲问Mitzi吃了什么，Mitzi只答在院子里喝的水。
  _effects: food; cash -4 (凑钱买面包)_

- **1927.01** `yf18-apprentice.press-guard::ctx-vienna-reform-1930::milieu-tenement/refuse-the-machine` tags: apprenticeship, work, danger, machine, injury, refusal, reform, medical
  教堂年历的订单催得紧，Wiener Psychoanalytische Vereinigung把压印机的护板卸了，说这样进纸快一半。Mitzi看着那块铁板，说手会进去；Wiener Psychoanalytische Vereinigung把工钱袋往桌上一扔，问Mitzi是不是不想出师了。Mitzi没有碰机器，那天下午的活由Anna Bauer接手。
  _effects: relation employer with person-sigmund-freud; state_parameter apprenticeship-contract.progress 30 -> 25; state_parameter apprenticeship-contract.failures 0 -> 1; flag +yf18_refused_unguarded_press; mood 0.020000000000000004_

- **1927.01** `state_tick:yf18-first-awakening/half-year-of-glances/answered-glance` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Mitzi在教堂门口或学校走廊里又遇见Lena。这一次对方先点了头，Mitzi准备好的整段话全忘了，只把手里的书换到另一只手上；回家后Mitzi才发现，自己把书拿倒了。
  _effects: state_parameter yf18-first-awakening.intensity 44 -> 49; state_parameter yf18-first-awakening.nerve 12 -> 20; state_parameter yf18-first-awakening.reciprocated false -> true; relation friend with person-phase15-Lena-world-vienna-1912; mood 0.03_

- **1927.01** `state_tick:apprenticeship-contract/workshop-year/learned` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Mitzi又学会了一道工序。师傅没有夸，只把下一块料推到面前。
  _effects: state_parameter apprenticeship-contract.progress 25 -> 45; skill; mood 0.02_

- **1927.01** `p9-childhood-youth-aspiration.prepare-exam/cheat-sheet-washed-off` tags: adolescence, education, aspiration, school, books, club, exam, task
  Mitzi把公式用铅笔写在左手心，出门前在水龙头下搓了搓，字迹只剩浅浅灰印。考场上他凭记忆答题，算到第三题时手心出汗，灰印化开成一道黑线。他答完了，但不知道对不对。
  _effects: flag +exam_guilt; mood -0.029999999999999995; skill; relation kin with person-rosa-lechner_

- **1927.01** `state_reaction:yf18-first-awakening/exam-week-distraction` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  考试周里，Mitzi把课本摊在桌上，眼睛却一直看着窗外那条电车线。笔记的页边多了几个没有写完的名字，Mitzi用橡皮擦掉，纸面起了毛。
  _effects: state_parameter yf18-first-awakening.intensity 49 -> 46; state_parameter yf18-first-awakening.talk 0 -> 2_
  _causes: evt:world-vienna-1912:003220_

- **1927.01** `yf18-runaway.bundle::ctx-vienna-reform-1930::milieu-tenement/buy-the-ticket-tonight` tags: runaway, escape, family, plan, night_train, reform, medical, schooling
  Mitzi趁Rosa Lechner去上夜班，把储钱罐砸在窗台上。硬币滚进床缝，Mitzi趴在地上摸到最后一枚，跑去南站买了一张最便宜的单程票；售票员问要不要往返，Mitzi说不用，声音比自己想象中平静。
  _effects: state_add yf18-runaway-plan state:world-vienna-1912:210; cash -3 (the savings jar was broken for a ticket); flag +yf18_ticket_bought; mood 0.039999999999999994; flag +yf18_runaway_plan_active_

- **1927.01** `state_reaction:yf18-runaway-plan/a-family-question` tags: yf18-runaway-plan, escape, youth, plan, home, travel, risk, state
  饭桌上又为房租吵起来。Mitzi把面包掰成很小的块，听见父亲说“这个家养不起闲人”；Mitzi没有回嘴，只在心里把格拉茨的地址又背了一遍。
  _effects: state_parameter yf18-runaway-plan.suspicion 15 -> 23; state_parameter yf18-runaway-plan.resolve 70 -> 68_
  _causes: evt:world-vienna-1912:003420_

- **1927.01** `yf18-runaway.mother-bundle::ctx-vienna-reform-1930::milieu-tenement/leave-that-night` tags: runaway, family, discovery, lie, plan, reform, medical, schooling
  Mitzi趁Rosa Lechner睡着，把包袱从床底拖出来，从厨房窗口翻出去。巷子里的煤气灯灭了一盏，Mitzi摸着墙走到街口，回头看见自家窗户亮着；Rosa Lechner站在窗帘后面，没有开窗，也没有喊。
  _effects: state_remove yf18-runaway-plan state:world-vienna-1912:210; move place-wien; cash -2 (a few coins taken from the kitchen drawer); relation kin with person-rosa-lechner; health -0.020000000000000018 (a cold walk to the station); flag +yf18_left_in_night; mood 0.020000000000000004; flag -yf18_runaway_plan_active_

- **1927.02** `yf18-firstlook.parish-dance::ctx-vienna-reform-1930::milieu-tenement/leave-before-the-last-dance` tags: first_love, dance, church, courtship, jealousy, reform, medical, schooling
  Mitzi在最后一支曲子前溜出礼堂，沿着教堂外墙走了一圈。窗子里传来手风琴声，Mitzi数到第三遍副歌才往家走；家里问舞会好不好，Mitzi说人太多，脚疼。
  _effects: state_parameter yf18-first-awakening.intensity 50 -> 44; state_parameter yf18-first-awakening.nerve 15 -> 12; mood -0.020000000000000004_

- **1927.03** `p9-childhood-adolescence.secret-in-the-stairwell/secret-mother-sets-place` tags: adolescence, friendship, identity, work, school, secret, church
  Mitzi还是把这件事告诉了母亲。母亲没多问，在厨房案板旁多摆了一副碗筷，晚上让Rosa Bauer睡在炉边的旧垫子上，说先住下，别的事明早再想。
  _effects: relation friend with person:evt:world-vienna-1912:000398:child; food; mood 0.02; relation acquaintance with person-materialized-world-vienna-1912-24_

- **1928.01** `yf18-dare.bridge-rail::ctx-vienna-reform-1930::milieu-tenement/walk-the-rail` tags: dare, bridge, river, friendship, risk, reform, medical, schooling
  多瑙河上的铁桥在夜里只剩两排灯。Mitzi翻过栏杆，鞋底踩上结霜的钢梁，走了七步；Rosa Berg在桥头喊了一声，风把声音吹散。Mitzi翻回来时，Berta Berg把一支烟塞进Mitzi嘴里，手抖得点不着火。
  _effects: state_parameter yf18-first-awakening.intensity 46 -> 56; state_parameter yf18-first-awakening.nerve 20 -> 35; state_parameter yf18-first-awakening.talk 2 -> 7; health -0.030000000000000027 (cold and fear on the bridge); reputation 0.020000000000000004; flag +yf18_walked_bridge_rail; mood 0.05_

- **1928.01** `state_tick:yf18-first-awakening/half-year-of-glances/answered-glance` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Mitzi在教堂门口或学校走廊里又遇见Lena。这一次对方先点了头，Mitzi准备好的整段话全忘了，只把手里的书换到另一只手上；回家后Mitzi才发现，自己把书拿倒了。
  _effects: state_parameter yf18-first-awakening.intensity 56 -> 61; state_parameter yf18-first-awakening.nerve 35 -> 43; state_parameter yf18-first-awakening.reciprocated true -> true; relation friend with person-phase15-Lena-world-vienna-1912; mood 0.03_

- **1928.01** `state_tick:apprenticeship-contract/workshop-year/mistake` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Mitzi废掉了一块料，师傅扣了工钱。晚饭时谁也没提这件事。
  _effects: state_parameter apprenticeship-contract.failures 1 -> 2; cash -1 (wasted material); mood -0.04_

- **1928.01** `state_tick:wish-knowledge/knowledge-pressure/press-on` tags: wish-knowledge, wish, wish:knowledge, knowledge, education, curiosity, state, state_tick
  Mitzi又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.019999999999999997_

- **1928.01** `agency:seek_work` tags: agency, agency:seek_work
  Mitzi去了Buchdruckerei Winter & Söhne问工，得到的回答都是“下个月再来”。
  _effects: mood -0.04; reputation -0.010000000000000009_

- **1928.06** `r3-teen.police-caution::ctx-vienna-reform-1930::milieu-tenement::reform-parent-notice/cautioned` tags: police, caution, record, family, work, reform, medical, schooling
  Gustav Berg把Mitzi的名字写进一本硬皮簿子，问一句写一句，最后让他按手印。Rosa Lechner赶来时，Gustav Berg说带回去好好管教，这次不立案。走出门口，Rosa Lechner的手一直攥着Mitzi的袖子。
  _effects: reputation -0.04000000000000001; flag +police_caution_recorded; relation guardian with person-rosa-lechner; knowledge “the police opened a caution file in the subject’s name”_

- **1928.10** `r3-teen.domestic-servant-14::ctx-vienna-reform-1930::milieu-tenement/escapes` tags: work, domestic_service, servant, wages, escape, reform, medical, schooling
  Mitzi在天亮前从后门溜走，只带了一个包袱和一双鞋。她沿着电车轨道走到工厂区，门房问她会不会认字，她说会写自己的名字。Grete Kral后来托人带来一句话：太太把你的工钱扣了。
  _effects: flag +left_domestic_service_for_factory; relation friend with person-materialized-world-vienna-1912-17; move place-wien-printshop-winter; employment Arbeiterin @ org-winter-print; relation acquaintance with person-materialized-world-vienna-1912-17_

- **1928.10** `yf18-runaway.cousin-letter::ctx-vienna-reform-1930::milieu-tenement/answer-in-secret` tags: runaway, letter, cousin, work, plan, reform, medical, schooling
  格拉茨的表姐来信，说旅馆缺一个叠床单的女孩，管吃住，工钱少但能攒下。Mitzi把信藏在算术本里，用铅笔在背面写回信；邮票是从Rosa Lechner的抽屉里偷的，信封上不敢写自己的名字，只写了“内详”。
  _effects: state_add yf18-runaway-plan state:world-vienna-1912:243; cash -1 (a stolen stamp and writing paper); flag +yf18_cousin_reply; mood 0.03; flag +yf18_runaway_plan_active_

- **1929.01** `yf18-apprentice.press-guard::ctx-vienna-reform-1930::milieu-tenement/tie-the-sleeve-and-work` tags: apprenticeship, work, danger, machine, injury, refusal, reform, medical
  Mitzi把袖口卷到肘上，用麻绳扎紧，替Wiener Psychoanalytische Vereinigung把一叠纸送进压印机。前两百张很顺，第二百零一张时，纸角卡住，Mitzi伸手去拨，机器没有停；等Grete Hofer拉开Mitzi，食指的指甲已经翻了起来。
  _effects: health -0.07999999999999996 (a hand caught in an unguarded press); condition; state_parameter apprenticeship-contract.progress 45 -> 37; cash -2 (a doctor and a bandage); flag +yf18_press_injury; mood -0.05; relation acquaintance with person-materialized-world-vienna-1912-36_

- **1929.01** `state_expire:yf18-first-awakening` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Mitzi的「第一次心动」到期；相关安排结束。
  _effects: state_remove yf18-first-awakening state:world-vienna-1912:152; flag -yf18_first_awakening_active_

- **1929.01** `state_transition:apprenticeship-contract/expelled` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick, failed-apprentice
  Mitzi从「学徒契约」转入另一段处境：the master ended the contract
  _effects: state_transition apprenticeship-contract -> failed-apprentice; flag +failed_apprenticeship; mood -0.08; role_

- **1929.01** `state_expire:yf18-runaway-plan` tags: yf18-runaway-plan, escape, youth, plan, home, travel, risk, state
  Mitzi的「床底下的包袱」到期；相关安排结束。
  _effects: state_remove yf18-runaway-plan state:world-vienna-1912:243; flag -yf18_runaway_plan_active_

- **1929.01** `r13-edu.boarding-school::ctx-vienna-reform-1930::milieu-tenement/homesick-return` tags: education, boarding_school, residence, family, scholarship, reform, medical, schooling
  Mitzi在寄宿学校住了不到一个月，夜里总听见火车声，想起家里的炉子和妹妹。Mitzi给Rosa Lechner写信，写了撕、撕了写，最后只寄出一张明信片。Rosa Lechner来接Mitzi那天，Mitzi的箱子还没完全打开。回到家，Mitzi把铁皮箱放在床底，再没打开，腌菜罐却一直留在桌上。
  _effects: mood -0.04; relation kin with person-rosa-lechner_

- **1930.01** `major-family.proposal-accepted/proposal-accepted.uncle-tavern-debt` tags: family, marriage, household, major, lifecycle, partnership
  婚礼办在Franz Hofer舅舅的酒馆后间，桌子是从隔壁借的。Mitzi的姑妈带来一罐李子酱，Franz Hofer的工友喝到半夜，打碎了两只杯子。舅舅说圣烛节前还清，舅妈把杯子记在账本另一页；散席后，Franz Hofer把铺盖卷搬进Leopoldstädter Zinshaus, gemeinsamer Gang，两人数着欠条睡着。
  _effects: relation partner with person-materialized-world-vienna-1912-67; household; role; role; cash -22 (tavern bill for the wedding); flag +wedding_debt; relation acquaintance with person-materialized-world-vienna-1912-67_

- **1930.01** `p22-forged-review::ctx-vienna-reform-1930::milieu-tenement/the-review-becomes-a-school` tags: forged_review, opera, fame, fraud, comic, media, art, scandal
  死去的评论家在最贵的报纸上给一部没人看过的歌剧写了四颗星。Mitzi把剪报贴在排练厅门口，第二天票房排到街角；Luise Kral问是谁写的，Mitzi说是一个死人，死人不会否认。三个月后，歌剧院把这部戏列进了秋季剧目。
  _effects: state_add p22-wild-fortune state:world-vienna-1912:281; state_add p22-scandal-engine state:world-vienna-1912:282; cash 5 (a share of the revived opera receipts); reputation 0.04000000000000001; relation acquaintance with person-luise-kral; flag +forged_review_believed; mood 0.03; relation acquaintance with person-materialized-world-vienna-1912-40; flag +wild_fortune_active; flag +scandal_engine_active_

- **1930.01** `p9-work-career.journeyman-exam/p9-work-career.journeyman-exam.debt` tags: work, career, craft, clerk, education, task, apprentice, journeyman
  柜上要两克朗考试费，Mitzi翻遍口袋只有六赫勒。Rosa Winter把硬币替他排在台面，说钱先垫着，条件是出师后多留一年，工钱按伙计的八折。Mitzi盯着那张纸看了很久，最后签了名。证明拿到了，可接下来十二个月他仍旧离不开这间作坊。
  _effects: cash 2 (师傅垫付考试费，现钱过手); mood -0.03; relation employer with person-materialized-world-vienna-1912-57; flag +bound_by_apprenticeship_debt; relation acquaintance with person-materialized-world-vienna-1912-57_

- **1930.02** `vienna-courtship-courtyard.breakup/stay-for-the-rent` tags: adulthood, courtship, partner, social, family, partnership
  东西还到一半，两人算了算房租、煤钱和两个人的工钱凑在一起才够。最后钥匙没收回去，外套也留下；这个月能少花一克朗，话说到“以后”两个字就断了，谁都不往下接，炉子今晚还是得两个人一起生。
  _effects: mood -0.05; relation partner with person-materialized-world-vienna-1912-67; cash 1 (合租省下一份房租); relation acquaintance with person-materialized-world-vienna-1912-30_

- **1930.02** `vienna-printshop-daily.wage-shortfall/wage-take-it` tags: work, factory, labour, social
  Mitzi把少了钱的工钱袋塞进内袋，没再问。回家路上买了两块面包，比平时少一块。
  _effects: cash -1.8 (工钱被扣); food; mood -0.06_

- **1930.03** `vienna-legacy-worklife.sick-fund/sick-fund.keep-quiet` tags: legacy, work, family, reform, ordinary_life
  止咳药水是褐色的，瓶口塞着软木塞，摇一摇会起沫。Mitzi看着工友把表折成小块，折了三折才塞进帽檐。墙上的规章还贴在那里，纸角被风掀起，没人去按。
  _effects: mood -0.05000000000000002; relation colleague with person-materialized-world-vienna-1912-53; relation acquaintance with person-materialized-world-vienna-1912-53_

- **1930.03** `vienna-parish-aid.rent-box/rent-box.accept-all` tags: faith, parish, mutual_aid, poverty, family
  煤袋落在台阶上，扬起细细一层黑末。Franz Hofer用铅笔头在蓝格册上写门牌号，问房东姓什么，又叮嘱别把面包票弄丢。灶上水壶开始叫，Mitzi才想起屋里连只干净的杯子都没有。
  _effects: cash 6 (互助会补上本月房租差额); food; relation acquaintance with person-materialized-world-vienna-1912-67; flag +parish_registered_

- **1930.08** `vienna-adult-social.wage-loan/wage-loan.refused` tags: adulthood, social, work, family
  Mitzi在Buchdruckerei Winter & Söhne的走廊里拦住Buchdruckerei Winter & Söhne，话还没说完，对方就摆手说账上没这笔规矩。Mitzi回车间时，工头正往布告栏上钉新的计件单。
  _effects: mood -0.08000000000000002; reputation -0.05_

- **1931.01** `p22-forged-review::ctx-vienna-reform-1930::milieu-tenement/the-dead-critic-signs-again` tags: forged_review, opera, fame, fraud, comic, media, art, scandal
  第二篇署名同一个死人的剧评出现在另一家报纸上，笔迹却不一样。Rosa Winter请来笔迹专家，Maria Stein在咖啡馆里把两张剪报并排摊开；Mitzi发现自己的墨水在纸背留下同样的蓝点，而这一次，没有人再笑。他把两张纸叠在一起，蓝点重合得像一枚印章。
  _effects: state_add p22-scandal-engine state:world-vienna-1912:328; state_add public-scandal state:world-vienna-1912:329; reputation -0.05; relation rival with person-materialized-world-vienna-1912-69; flag +forged_review_exposed; mood -0.04000000000000001; relation acquaintance with person-materialized-world-vienna-1912-69; flag -scandal_engine_active; flag +scandal_engine_active_

- **1931.01** `state_tick:p22-wild-fortune/the-story-gets-taller/the-crowd-remembers` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  一年过去，Mitzi的荒唐故事没有变小，反而多了一个愿意作证的人。债主没有立刻上门，亲戚也还愿意来吃饭；Mitzi把新添的银器擦了一遍，发现其中一只底下刻着别人的名字。
  _effects: state_parameter p22-wild-fortune.height 60 -> 64; state_parameter p22-wild-fortune.absurdity 65 -> 68; state_parameter p22-wild-fortune.witnesses 70 -> 75; state_parameter p22-wild-fortune.fragility 55 -> 57; mood 0.020000000000000018_

- **1931.01** `r13-civ.midwife::ctx-vienna-reform-1930::milieu-tenement/doctor-called` tags: health, midwife, birth, neighbor, night, reform, medical, schooling
  Rosa Winter摸了半天肚子，忽然让Mitzi去街口叫医生，说胎位不对。Mitzi披着外套跑过两条街，医生来了以后只说了句“送医院”，又收了一次出诊费。天亮前，马车才把Berta Moser 2拉走。
  _effects: cash -5 (夜里敲接生婆的门); health -0.030000000000000027 (夜里敲接生婆的门); flag +complicated_birth_sent_to_hospital; relation colleague with person-materialized-world-vienna-1912-57; knowledge “the midwife suspected a malpresentation before dawn”; relation acquaintance with person-materialized-world-vienna-1912-44_

- **1931.04** `vienna-women-housework.piecework-bundle/piecework.dispute-rate` tags: gender, housework, home, labour, family
  铜板一枚枚落在桌面上，比说好的少了十五赫勒。Mitzi没去捡，先问Luise Kral下捆还送不送。Luise Kral含糊应了一声，拎起布包就走。Mitzi Lechner这才进来，说下回得先讲好价。
  _effects: cash 0.6 (争执后按降低的工价结算); reputation 0.03; relation colleague with person-luise-kral; mood -0.030000000000000027_

- **1932.01** `vienna-life-work-injury/crushed-hand` tags: adulthood, labour, injury
  Mitzi在换纸时左手被压板夹住。工友关掉机器，工头拿来急救箱，把伤手包起来送去医院；厂里先垫了十克朗医药费，事故报告写的是“操作不慎”。Mitzi的左手从此握不紧拳，指尖总是凉的，天阴时骨缝里发疼。
  _effects: health -0.24 (crushed left hand); condition; cash 10 (employer medical advance)_

- **1932.01** `vienna-family-same-sex-female/private-household` tags: family, intimacy, same_sex, housing, lifecycle, partnership, household
  Mitzi和Grete Kral合租一间房，对外说是表姐妹。两人共用一只炉子、一本账和一张床，白天各自上工，晚上把门闩好；房租从两人的工钱里各出一半，日子紧，却比各自的旧住处暖，窗台上还并排晾着两只杯子。
  _effects: relation partner with person-materialized-world-vienna-1912-17; household; mood 0.06_

- **1932.01** `p22-forged-review::ctx-vienna-reform-1930::milieu-tenement/the-dead-critic-signs-again` tags: forged_review, opera, fame, fraud, comic, media, art, scandal
  第二篇署名同一个死人的剧评出现在另一家报纸上，笔迹却不一样。Luise Kral请来笔迹专家，Rosa Lechner在咖啡馆里把两张剪报并排摊开；Mitzi发现自己的墨水在纸背留下同样的蓝点，而这一次，没有人再笑。他把两张纸叠在一起，蓝点重合得像一枚印章。
  _effects: state_add p22-scandal-engine state:world-vienna-1912:369; state_add public-scandal state:world-vienna-1912:370; reputation -0.05; relation rival with person-rosa-lechner; mood -0.03999999999999998; flag -scandal_engine_active; flag +scandal_engine_active_

- **1932.01** `state_reaction:p22-scandal-engine/a-new-scandal-feeds-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Mitzi的新故事登出来时，旧的那一页也被重新翻到桌面上。Mitzi发现两件事共用同一个证人，而那个证人上周还来借过盐。
  _effects: state_parameter p22-scandal-engine.heat 70 -> 76; state_parameter p22-scandal-engine.reach 65 -> 69; state_parameter p22-scandal-engine.shame 60 -> 63; state_parameter p22-scandal-engine.leverage 35 -> 37; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:004966_

- **1932.01** `state_tick:wish-knowledge/knowledge-pressure/put-away` tags: wish-knowledge, wish, wish:knowledge, knowledge, education, curiosity, state, state_tick
  Mitzi暂时把那件事收进抽屉；日子还有别的东西要应付。
  _effects: mood -0.020000000000000018_

- **1932.01** `p9-social-daily-culture.pictures-or-concert/p9-social-daily-culture.pictures-or-concert.skip-both` tags: daily, culture, leisure, cafe, music, walk, task, task:culture
  Mitzi在影戏棚和音乐厅之间走了两趟，最后哪处都没进。Mitzi拐进常去的酒馆，花三十赫勒要了半升啤酒，听角落里有人拉琴，拉得不准但很响。Otto Lechner 2找到Mitzi时，桌上的杯子已经空了一半，省下的票钱还在口袋里叮当响；这一晚没看成戏，倒把半升啤酒喝出了几分自在。
  _effects: cash -0.3 (酒馆半升啤酒); mood 0.030000000000000027; relation friend with person-materialized-world-vienna-1912-39; relation acquaintance with person-materialized-world-vienna-1912-39_

- **1932.05** `vienna-legacy-worklife.union-office/union-office.enroll-first` tags: legacy, work, family, reform, ordinary_life
  来问入会的是个瘦高的年轻人，帽檐捏在手里，说自己在第十六区的织布厂做了半年。Mitzi把名册翻到空白页，蘸水笔尖在“住址”那栏停了一下，等他报出街名。老成员在角落里把账本合上，声音很轻。
  _effects: cash 1 (新会员的入会费先记在桌上); relation acquaintance with person:evt:world-vienna-1912:000223:child; skill_

- **1933.01** `vienna-life-injury-recovery/wound-infection` tags: health, work, family, injury
  Mitzi的伤口在几天后肿起来，手腕发热。医生说要切开引流，费用比上次更高；Mitzi看着账单，先问能不能分两次付。
  _effects: health -0.12 (wound infection); cash -14 (drainage and medicine); condition_
  _causes: evt:world-vienna-1912:004964_

- **1933.01** `vienna-life-depression/short-time` tags: adulthood, depression, work, injury
  Mitzi改成每周上三天班，工钱按日结算。家里的面包从每天一条变成隔天一条，Mitzi开始把午饭省下来带回家。
  _effects: cash -3 (short-time work); health -0.040000000000000036 (reduced food)_

- **1933.01** `vienna-family-courtship/ask-to-share-a-home` tags: family, courtship, household, social, lifecycle
  Mitzi在Leopoldstädter Zinshaus, gemeinsamer Gang靠窗的桌边，把一只空咖啡杯转了半圈，说房租两人合付、桌子两人共用。Hermann Kral 2的手停在糖罐盖上，问了一句“要是过不下去呢”，没有当场答应，只说要想一想；杯里的咖啡凉了，话还悬在桌面上。
  _effects: interaction; relation acquaintance with person-materialized-world-vienna-1912-81_

- **1933.01** `p22-forged-review::ctx-vienna-reform-1930::milieu-tenement/the-dead-critic-signs-again` tags: forged_review, opera, fame, fraud, comic, media, art, scandal
  第二篇署名同一个死人的剧评出现在另一家报纸上，笔迹却不一样。Luise Kral请来笔迹专家，Hermann Lechner在咖啡馆里把两张剪报并排摊开；Mitzi发现自己的墨水在纸背留下同样的蓝点，而这一次，没有人再笑。他把两张纸叠在一起，蓝点重合得像一枚印章。
  _effects: state_add p22-scandal-engine state:world-vienna-1912:411; state_add public-scandal state:world-vienna-1912:412; reputation -0.05; relation rival with person-materialized-world-vienna-1912-54; mood -0.03999999999999998; relation acquaintance with person-materialized-world-vienna-1912-54; flag -scandal_engine_active; flag +scandal_engine_active_

- **1933.01** `state_reaction:p22-scandal-engine/a-new-scandal-feeds-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Mitzi的新故事登出来时，旧的那一页也被重新翻到桌面上。Mitzi发现两件事共用同一个证人，而那个证人上周还来借过盐。
  _effects: state_parameter p22-scandal-engine.heat 70 -> 76; state_parameter p22-scandal-engine.reach 65 -> 69; state_parameter p22-scandal-engine.shame 60 -> 63; state_parameter p22-scandal-engine.leverage 35 -> 37; mood -0.019999999999999962_
  _causes: evt:world-vienna-1912:005390_

- **1933.01** `state_expire:p22-wild-fortune` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  Mitzi的「荒唐横财」到期；相关安排结束。
  _effects: state_remove p22-wild-fortune state:world-vienna-1912:281; flag -wild_fortune_active_

- **1933.01** `kernel-health.task-pharmacy-hunt::ctx-vienna-reform-1930::milieu-tenement/pharmacy-last-bottle` tags: health, task, pharmacy, shortage, black_market, reform, medical, schooling
  Mitzi跑了四家药房，最后在火车站附近的小店找到最后一瓶奎宁。掌柜先问给谁用，又看了看Mitzi的鞋，才把瓶子从柜台底下拿出来；价格是官价的三倍。他把瓶子塞进内袋，路上每隔一会儿摸一下。
  _effects: cash -25 (last bottle of quinine at three times the official price); health 0.040000000000000036 (quinine obtained and taken); condition; role; knowledge “奎宁这类药会藏在柜台底下，先问给谁用，再看买药人的鞋；价格是官价三倍。”_

- **1933.02** `fm17-miracle.witness::ctx-vienna-authoritarian-1934::milieu-tenement/a-light-on-the-grave` tags: faith, miracle, vision, public_scandal, witness, reputation, doubt, vienna
  万灵节傍晚，Mitzi和Katharina Winter在墓园点蜡烛。一团淡蓝色的光在Mitzi母亲的墓碑上方停了几息，又慢慢散开。Katharina Winter先跪下，随后旁边几家人也跪了。没有人问Mitzi最近为什么被报纸写，但所有人看Mitzi的眼神都变了。
  _effects: state_add fm17-miracle-witness state:world-vienna-1912:451; reputation 0.04; mood 0.020000000000000018; flag +fm17_light_seen; flag +fm17_miracle_witnessed; knowledge “我看见的那件事，到今天我仍说不出它是什么。”_

- **1933.05** `vienna-parish-aid.soup-kitchen/soup-kitchen.leave` tags: faith, parish, mutual_aid, poverty, family
  Mitzi看见熟人排在前面，帽檐压得低低的，便转身拐进旁边的小巷。Luise Kral追出来问怎么不领了，Mitzi说人太多，改天再来。回到屋里，灶是冷的，早上剩的半个土豆还在盘子里。Mitzi把它切成片，就着水咽下去。
  _effects: mood -0.050000000000000044; relation acquaintance with person-luise-kral; food_

- **1933.08** `vienna-church-community.tenement-prayer/rent-prayer-help` tags: faith, social, family, home
  Mitzi在楼梯间守夜时，邻居说起楼下老太太病重。
  _effects: condition; food; relation acquaintance with person-materialized-world-vienna-1912-46; relation acquaintance with person-materialized-world-vienna-1912-46_

- **1934.01** `interaction_response` tags: interaction
  Hermann Kral 2没有答应，只说现在不合适。Mitzi把这件事收回去，之后见面仍点头。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-81; interaction_
  _causes: evt:world-vienna-1912:005389_

- **1934.01** `p22-forged-review::ctx-vienna-authoritarian-1934::milieu-factory/the-review-becomes-a-school` tags: forged_review, opera, fame, fraud, comic, media, art, scandal
  死去的评论家在最贵的报纸上给一部没人看过的歌剧写了四颗星。Mitzi把剪报贴在排练厅门口，第二天票房排到街角；Luise Huber问是谁写的，Mitzi说是一个死人，死人不会否认。三个月后，歌剧院把这部戏列进了秋季剧目。
  _effects: state_add p22-wild-fortune state:world-vienna-1912:449; state_add p22-scandal-engine state:world-vienna-1912:450; cash 5 (a share of the revived opera receipts); reputation 0.04; relation acquaintance with person-materialized-world-vienna-1912-65; mood 0.030000000000000027; flag +wild_fortune_active; flag -scandal_engine_active; flag +scandal_engine_active_

- **1934.01** `state_reaction:p22-scandal-engine/a-new-scandal-feeds-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Mitzi的新故事登出来时，旧的那一页也被重新翻到桌面上。Mitzi发现两件事共用同一个证人，而那个证人上周还来借过盐。
  _effects: state_parameter p22-scandal-engine.heat 45 -> 51; state_parameter p22-scandal-engine.reach 60 -> 64; state_parameter p22-scandal-engine.shame 40 -> 43; state_parameter p22-scandal-engine.leverage 50 -> 52; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:005829_

- **1934.01** `state_tick:fm17-miracle-witness/the-story-year/story-hardens` tags: fm17-miracle-witness, faith, miracle, vision, witness, religion, reputation, doubt
  故事传到第三个人嘴里时，已经多了“白光”“香气”和“死去的人叫了她的名字”。Mitzi想纠正，却发现每纠正一次，别人就多记一条；到最后，连她自己都开始怀疑当时站在哪里。
  _effects: state_parameter fm17-miracle-witness.attention 35 -> 45; state_parameter fm17-miracle-witness.certainty 55 -> 50; reputation -0.02; mood -0.030000000000000027_

- **1934.01** `state_reaction:public-scandal/gossip` tags: public-scandal, scandal, reputation, social, state, state_reaction, courtship, friendship
  Mitzi走进咖啡馆时，邻桌的声音低了一拍。没有人当面说什么，但每个人都知道该说什么。
  _effects: mood -0.030000000000000027; reputation -0.03_
  _causes: evt:world-vienna-1912:006034_

- **1934.01** `r13-work.start-cooperative::ctx-vienna-authoritarian-1934::milieu-factory::reform-municipal-cooperative/rules-imposed` tags: commerce, cooperative, founding, institution, capital, vienna, urban, crisis
  办事员说可以登记，但章程必须写明市政厅派一名监察员，账本每季度送审。Mitzi算了算，送审的车费和抄账的工钱比税还重。Luise Huber说先登记再说，Mitzi却在签名栏前停了很久；最后签了，笔尖把纸戳出一个小洞。
  _effects: cash -9 (合作社的第一张桌子); flag +work13_cooperative_under_supervision; organization_membership; knowledge “the municipality appoints a supervisor and audits the books ”; relation acquaintance with person-materialized-world-vienna-1912-35_

- **1934.02** `major-crisis.rent-increase/pay-the-increase` tags: crisis, housing, rent, eviction, family, poverty
  房东没有露面，只让看门人Karl Kraus把补款单塞进门缝：每月要多十四克朗，先交十八克朗（本月十四加四克朗手续费）才肯谈续租。Mitzi把准备买冬煤的钱数了两遍，还是把钱交了，收据上写的是“自愿捐助”。Karl Kraus低声说，不签的人已经有两家搬走了，楼下的煤价牌又换了数字。
  _effects: cash -18 (advance payment demanded with the rent increase); relation acquaintance with person-karl-kraus; flag +rent_increase_accepted_

- **1934.04** `p9-social-courtship-friendship.friend-intercession/intercession-formal-visit` tags: courtship, friendship, social, adulthood, reputation, leopoldstadt
  Mitzi让Marie Huber换件干净外套，星期天正式上Hermann Kral 2家去问一声。自己留在家里擦皮鞋、擦窗台，听见走廊有人上楼就站起来。Marie Huber天黑才回，说对方母亲让等答复，还问起房租和搭伙的事；Mitzi等了一整天，茶壶热了三遍，心一直悬着。
  _effects: mood -0.020000000000000018_

- **1934.07** `vienna-adult-social.burial-fund/burial-fund.paid` tags: adulthood, social, work, family
  车间里管互助会的Rosa Bauer在午休时把本子摊在Mitzi的工具箱上，说这个月还差最后一份月钱。Mitzi从马甲内袋摸出二十个克罗伊策，Rosa Bauer当着他的面在本子上画了钩。
  _effects: cash -0.3 (缴纳丧葬互助会的月钱); relation colleague with person:evt:world-vienna-1912:000398:child; reputation 0.04_

- **1935.01** `p22-forged-review::ctx-vienna-authoritarian-1934::milieu-printshop/the-dead-critic-signs-again` tags: forged_review, opera, fame, fraud, comic, media, art, scandal
  第二篇署名同一个死人的剧评出现在另一家报纸上，笔迹却不一样。Luise Kral请来笔迹专家，Luise Hofer在咖啡馆里把两张剪报并排摊开；Mitzi发现自己的墨水在纸背留下同样的蓝点，而这一次，没有人再笑。他把两张纸叠在一起，蓝点重合得像一枚印章。
  _effects: state_add p22-scandal-engine state:world-vienna-1912:493; state_add public-scandal state:world-vienna-1912:494; reputation -0.05; relation rival with person-materialized-world-vienna-1912-34; mood -0.040000000000000036; relation acquaintance with person-materialized-world-vienna-1912-34; flag -scandal_engine_active; flag +scandal_engine_active_

- **1935.01** `state_reaction:p22-scandal-engine/a-new-scandal-feeds-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Mitzi的新故事登出来时，旧的那一页也被重新翻到桌面上。Mitzi发现两件事共用同一个证人，而那个证人上周还来借过盐。
  _effects: state_parameter p22-scandal-engine.heat 70 -> 76; state_parameter p22-scandal-engine.reach 65 -> 69; state_parameter p22-scandal-engine.shame 60 -> 63; state_parameter p22-scandal-engine.leverage 35 -> 37; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:006308_

- **1935.01** `state_expire:public-scandal` tags: public-scandal, scandal, reputation, social, state, state_tick, state:public-scandal
  Mitzi的「公开丑闻」到期；相关安排结束。
  _effects: state_remove public-scandal state:world-vienna-1912:412_

- **1935.01** `state_tick:p22-wild-fortune/the-story-gets-taller/the-crowd-remembers` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  一年过去，Mitzi的荒唐故事没有变小，反而多了一个愿意作证的人。债主没有立刻上门，亲戚也还愿意来吃饭；Mitzi把新添的银器擦了一遍，发现其中一只底下刻着别人的名字。
  _effects: state_parameter p22-wild-fortune.height 60 -> 64; state_parameter p22-wild-fortune.absurdity 65 -> 68; state_parameter p22-wild-fortune.witnesses 70 -> 75; state_parameter p22-wild-fortune.fragility 55 -> 57; mood 0.020000000000000018_

- **1935.01** `state_expire:fm17-miracle-witness` tags: fm17-miracle-witness, faith, miracle, vision, witness, religion, reputation, doubt
  Mitzi的「见过无法解释之事的人」到期；相关安排结束。
  _effects: state_remove fm17-miracle-witness state:world-vienna-1912:451_

- **1935.01** `r13-edu.literacy-class::ctx-vienna-authoritarian-1934::milieu-factory/signs-own-name` tags: education, literacy, adult_education, class, belonging, vienna, urban, crisis
  Mitzi在石板上写自己的名字，写到第三遍才把最后一笔收住。Gustav Kral 2把Mitzi的手按在粉笔上，说慢慢来。放学时，Mitzi把石板抱在怀里，经过肉铺时第一次看懂招牌上写的是“今日有肝”。那天晚上，Mitzi在账本封皮上又写了一遍，写到最后一笔时手没有抖。
  _effects: mood 0.07999999999999996; flag +learned_to_sign_name; skill; relation acquaintance with person-materialized-world-vienna-1912-73_

- **1935.02** `vienna-courtship-courtyard.letter-answer/burn-the-letter` tags: adulthood, courtship, partner, social, family
  等到第九天，Mitzi把没寄出的草稿和那封写了一半的信一起塞进炉子。纸卷起来，火苗发蓝，屋里一股焦味；Mitzi拿火钩把灰捅散，决定不再去问信的下落。炉门上的铁片烫手，那个“亲”字先没了。
  _effects: mood -0.040000000000000036; flag +gave_up_on_letter; relation acquaintance with person-materialized-world-vienna-1912-94; relation acquaintance with person-materialized-world-vienna-1912-94_

- **1935.07** `r3-crime.stolen-bicycle::ctx-vienna-authoritarian-1934::milieu-factory::long-commute/receipt-saves-the-bike` tags: crime, transport, police, work, fraud, vienna, urban, crisis
  Mitzi从内袋里掏出那张折了四道的收据，Anna Huber的签名歪在角上。Rosa Berg 3对着路灯看了半天，又看了看车架，最后把车把还给Mitzi，说下次别贪便宜。Mitzi回头去找Anna Huber，那间修车铺已经换上了别人的招牌。
  _effects: cash -2 (车架上新刷的蓝漆); flag +proved_bicycle_purchase; relation rival with person-materialized-world-vienna-1912-46; knowledge “the seller vanished after the police stop”_

- **1935.07** `vienna-history-kraus-lecture/listen-from-a-pillar` tags: history, culture, karl_kraus, cafe_central, public_lecture, press
  后厅的椅子不够，Mitzi 站在柱子旁听Karl Kraus 读一篇关于报纸谎言的文章。Karl Kraus 读到一半停下来，指出台下某位记者上周写的句子，那人把帽子压低。散场后，Mitzi 在账单背面抄下一句，墨迹被咖啡杯底印开。
  _effects: knowledge “Karl Kraus 在咖啡馆公开朗读时，会逐句引用报纸原文并指出其中的修辞和谎言。”; relation acquaintance with person-karl-kraus; cash -2 (coffee and a seat at Café Central); mood 0.020000000000000018; skill_

- **1936.01** `vienna-life-injury-recovery/clinic-treatment` tags: health, work, family
  Mitzi在受伤后的第三天去了诊所。医生清洗伤口、换药，收下诊费，嘱咐不要急着回机器旁。Mitzi把药方折好，回家路上买了纱布。
  _effects: health 0.05000000000000002 (wound treatment); cash -8 (clinic and bandages); condition_
  _causes: evt:world-vienna-1912:004734_

- **1936.01** `pl19-bridge.public-rumor::ctx-vienna-authoritarian-1934::milieu-tenement/the-list-writes-itself` tags: scandal, protection, network, press, media, rumor, bridge, vienna
  Mitzi在报纸上看见自己的名字和一张旧照片，报纸像一盏关不掉的灯。Franz Hofer提议找几个人替Mitzi挡电话、挡记者、挡亲戚；Mitzi说不用，第二天却发现Franz Hofer已经把名单写好了，最上面一行是Mitzi自己。
  _effects: state_add pl19-protected-scandal state:world-vienna-1912:549; relation friend with person-materialized-world-vienna-1912-67; reputation -0.019999999999999997; flag +list_written_itself; knowledge “名单最上面一行是当事人的名字。”; relation acquaintance with person-materialized-world-vienna-1912-72; flag +protected_scandal_active_

- **1936.01** `state_reaction:pl19-protected-scandal/a-public-question` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  有人在一场公开活动里问起Mitzi的“私人安排”，语气客气，问题却像一根针。Mitzi笑着答了别的事，回家后才发现手心全是汗。
  _effects: state_parameter pl19-protected-scandal.publicHeat 55 -> 67; state_parameter pl19-protected-scandal.protection 40 -> 34; reputation -0.03_
  _causes: evt:world-vienna-1912:006765_

- **1936.01** `state_tick:p22-scandal-engine/the-rumor-learns-new-words/the-story-gets-a-new-witness` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  又过了一年，流言没有熄，却学会了新的说法。Mitzi在咖啡馆里听见自己的故事被讲成三个版本，每个版本都比上一个多一个证人；没有人来追问，也没有人真正忘记。
  _effects: state_parameter p22-scandal-engine.heat 76 -> 73; state_parameter p22-scandal-engine.reach 69 -> 73; state_parameter p22-scandal-engine.leverage 37 -> 40; state_parameter p22-scandal-engine.shame 63 -> 65; mood 0.010000000000000009_

- **1936.01** `state_tick:wish-knowledge/knowledge-pressure/put-away` tags: wish-knowledge, wish, wish:knowledge, knowledge, education, curiosity, state, state_tick
  Mitzi暂时把那件事收进抽屉；日子还有别的东西要应付。
  _effects: mood -0.020000000000000018_

- **1936.01** `r13-civ.interview-worker::ctx-vienna-authoritarian-1934::milieu-factory/worker-refuses` tags: knowledge, interview, worker, trust, journalism, vienna, urban, crisis
  Rosa Winter听Mitzi问完，把手套往肩上一搭，说没什么好讲的，讲了也登不出来。Mitzi追了两步，Rosa Winter已经走进机器声里，只留下一句“你去找工会”。
  _effects: mood -0.050000000000000044; flag +worker_refused_interview; knowledge “the worker said the union is the only place to ask”_

- **1936.02** `vienna-adult-social.wage-loan/wage-loan.granted` tags: adulthood, social, work, family
  Mitzi在Buchdruckerei Winter & Söhne的账房里向Buchdruckerei Winter & Söhne开口预支十二克朗，因为家里的煤和面包钱同时到期。Buchdruckerei Winter & Söhne从抽屉里数出钞票，让会计在发薪日扣回，并记下“下不为例”。
  _effects: cash 12 (预支工资，先拿到现金); reputation 0.05_

- **1937.01** `major-family.proposal-refused/proposal-refused.bad-blood` tags: family, courtship, refusal, major, lifecycle
  Gustav Hofer 2的母亲把Mitzi带来的点心原封退回，说家里不娶有肺病亲戚的人。点心是早上排队买的，油纸还热着，Mitzi把它抱在胸前。Gustav Hofer 2站在门后没有出来，只让妹妹传话。Mitzi把戒指留在门房，走回Leopoldstädter Zinshaus, gemeinsamer Gang时天还没黑，楼下的狗一直叫。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-99; role; flag +marriage_refused; cash -2 (pastries and the returned ring); relation acquaintance with person-materialized-world-vienna-1912-99_

- **1937.01** `vienna-family-courtship/ask-to-share-a-home` tags: family, courtship, household, social, lifecycle
  Mitzi在Leopoldstädter Zinshaus, gemeinsamer Gang靠窗的桌边，把一只空咖啡杯转了半圈，说房租两人合付、桌子两人共用。Gustav Hofer 2的手停在糖罐盖上，问了一句“要是过不下去呢”，没有当场答应，只说要想一想；杯里的咖啡凉了，话还悬在桌面上。
  _effects: interaction_

- **1937.01** `p22-child-matchmaker::ctx-vienna-authoritarian-1934::milieu-tenement/the-album-is-shown-at-school` tags: child, matchmaker, family_album, enemy, warm, ironic, reconciliation, scandal
  孩子把相册带到学校，指着照片说Luise Huber是家里的亲戚。老师把这件事告诉了街坊，街坊又在菜市场讲了一遍；到下午，Mitzi已经听见三个版本，其中一个说Luise Huber要来分房子。孩子回家时，书包里多了一张同学画的“全家福”。他把那张全家福夹进课本，没有还给同学。
  _effects: state_add public-scandal state:world-vienna-1912:594; state_add p22-scandal-engine state:world-vienna-1912:595; relation kin with person:evt:world-vienna-1912:002687:child; reputation -0.03; flag +album_shown_at_school; mood -0.030000000000000027; flag -scandal_engine_active; flag +scandal_engine_active_

- **1937.01** `state_reaction:p22-scandal-engine/a-new-scandal-feeds-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Mitzi的新故事登出来时，旧的那一页也被重新翻到桌面上。Mitzi发现两件事共用同一个证人，而那个证人上周还来借过盐。
  _effects: state_parameter p22-scandal-engine.heat 40 -> 46; state_parameter p22-scandal-engine.reach 45 -> 49; state_parameter p22-scandal-engine.shame 35 -> 38; state_parameter p22-scandal-engine.leverage 20 -> 22; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:007276_

- **1937.01** `state_expire:failed-apprentice` tags: failed-apprentice, craft, work, failure, stigma, state, state_tick, state:failed-apprentice
  Mitzi的「学徒契约终止」到期；相关安排结束。
  _effects: state_remove failed-apprentice state:world-vienna-1912:250_

- **1937.01** `state_expire:p22-wild-fortune` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  Mitzi的「荒唐横财」到期；相关安排结束。
  _effects: state_remove p22-wild-fortune state:world-vienna-1912:449; flag -wild_fortune_active_

- **1937.01** `state_expire:public-scandal` tags: public-scandal, scandal, reputation, social, state, state_tick, state:public-scandal
  Mitzi的「公开丑闻」到期；相关安排结束。
  _effects: state_remove public-scandal state:world-vienna-1912:494_

- **1937.01** `state_tick:pl19-protected-scandal/the-network-meets/network-holds` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  Mitzi又在后间见了那几个人。谁也没有提名字，只把下个月的班次、钥匙和该打的电话分了一遍；出门时，Mitzi发现自己的围巾被人重新叠过，像一件被妥善保管的证物。
  _effects: state_parameter pl19-protected-scandal.exposure 60 -> 55; state_parameter pl19-protected-scandal.protection 34 -> 38; state_parameter pl19-protected-scandal.publicHeat 67 -> 65; mood 0.010000000000000009_

- **1937.01** `r13-work.start-cooperative::ctx-vienna-authoritarian-1934::milieu-printshop::reform-municipal-cooperative/chartered-with-help` tags: commerce, cooperative, founding, institution, capital, vienna, urban, crisis
  市政厅新设了合作社登记窗口，办事员替Mitzi把章程改成标准格式，注册费减半。Mitzi只需要凑齐五个发起人和一份铺面租约。章盖下来那天，Luise Huber把章程贴在墙上，Mitzi在第一条下面添了一句：入社自愿，退社自由。
  _effects: cash -8 (合作社的第一张桌子); reputation 0.08; flag +work13_chartered_reform_cooperative; role; organization_membership; relation acquaintance with person-materialized-world-vienna-1912-3_

- **1937.01** `initiative:found_process:building:person-materialized-world-vienna-1912-44-evt:world-vienna-1912:005738`
  环城大道写字楼管理处在Leopoldstädter Zinshaus, gemeinsamer Gang经过数年的招募、会议和互助，把分散的行动整理成公开纲领；这不是预先写好的历史，而是成员自己累积出来的运动。
  _effects: historical process 环城大道写字楼管理处的持续运动; historical development:initiative-building:person-materialized-world-vienna-1912-44-evt:world-vienna-1912:005738-1937 as organizer; historical development:initiative-building:person-materialized-world-vienna-1912-44-evt:world-vienna-1912:005738-1937 as organizer; knowledge “环城大道写字楼管理处的持续运动不是一次会议，而是我们这些年积累出来的持续组织。”; reputation 0.04000000000000001_

- **1937.01** `historical_phase`
  历史进程《环城大道写字楼管理处在Leopoldstädter Zinshaus, gemeinsamer Gang经过数年的招募、会议和互助，把分散的行动整理成公开纲领；》从 emerging 进入 mobilizing。
  _effects: knowledge “我亲历或知晓「环城大道写字楼管理处在Leopoldstädter Zinshaus, gemeinsamer Gang经”; knowledge “我亲历或知晓「环城大道写字楼管理处在Leopoldstädter Zinshaus, gemeinsamer Gang经”_
  _causes: evt:world-vienna-1912:007541_

- **1937.02** `r1-civ.cellar-press::ctx-vienna-authoritarian-1934::milieu-printshop/distributed-via-church-box` tags: politics, press, underground, print, risk, vienna, urban, crisis
  Gustav Winter没有按时来。Mitzi抱着纸包在电车站等到收班，最后把纸塞进教堂门口的意见箱。第二天，纸上的一段话被抄在面包店的包装纸上，没有人知道是谁印的，Mitzi却认出了自己的错字。
  _effects: cash -0.5 (地窖里的脚踏印刷机); mood 0.050000000000000044; reputation 0.03; flag +distributed_sheet_via_church_box; knowledge “the church suggestion box is emptied only once a week”; relation acquaintance with person-materialized-world-vienna-1912-18_

- **1937.10** `vienna-medical-treatment.sanatorium/home-rest` tags: health, medical, family, money
  炉子封小了，屋里凉得快，Mitzi把大衣盖在被子上。安娜收碗时看见窗台上一排药瓶，没说什么，第二天多带了半块黑面包。楼下的管道工敲了一下午铁皮，咳嗽声混在里面听不真切。
  _effects: health 0.02999999999999997 (在家休养但条件有限); food; cash -0.5 (房东要求的清洁费); relation friend with person-gustav-berg_

- **1938.01** `interaction_response` tags: interaction
  Gustav Hofer 2没有答应，只说现在不合适。Mitzi把这件事收回去，之后见面仍点头。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-99; interaction_
  _causes: evt:world-vienna-1912:007275_

- **1938.01** `vienna-life-anschluss-1938/resists` tags: politics, persecution, 1938, injury
  Mitzi在登记桌旁说了句“这里以前不是这样”。Helene Hofer记下地址，当晚两个穿制服的人来敲门，把Mitzi带到警局，第二天放回来时脸上有伤。
  _effects: health -0.12 (beaten in police custody); condition; role; cash -5 (fine and lost work); relation acquaintance with person-materialized-world-vienna-1912-98_

- **1938.01** `pl19-bridge.public-rumor::ctx-vienna-authoritarian-1934::milieu-factory/the-back-room-opens` tags: scandal, protection, network, press, media, rumor, bridge, vienna
  报纸卖完的第二天，Rosa Bauer把Mitzi领进洗衣房后面的小间。桌上已经坐着门房、一位排字工和两个不肯说名字的人；他们没有问绯闻是真是假，只问Mitzi以后还打不打算出门。Mitzi说打算，Rosa Bauer就把一盏灯往桌中间推了推。
  _effects: state_add pl19-protected-scandal state:world-vienna-1912:640; relation friend with person:evt:world-vienna-1912:000398:child; reputation -0.020000000000000004; flag +rumor_network; knowledge “洗衣房后间的人没有问绯闻真假，只问当事人还出不出门。”; relation acquaintance with person-materialized-world-vienna-1912-104_

- **1938.01** `state_reaction:public-scandal/gossip` tags: public-scandal, scandal, reputation, social, state, state_reaction, protection, network
  Mitzi走进咖啡馆时，邻桌的声音低了一拍。没有人当面说什么，但每个人都知道该说什么。
  _effects: mood -0.030000000000000027; reputation -0.03_
  _causes: evt:world-vienna-1912:007729_

- **1938.01** `state_reaction:pl19-protected-scandal/a-public-question` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  有人在一场公开活动里问起Mitzi的“私人安排”，语气客气，问题却像一根针。Mitzi笑着答了别的事，回家后才发现手心全是汗。
  _effects: state_parameter pl19-protected-scandal.publicHeat 45 -> 57; state_parameter pl19-protected-scandal.protection 55 -> 49; reputation -0.03_
  _causes: evt:world-vienna-1912:007729_

- **1938.01** `state_expire:pl19-protected-scandal` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  Mitzi的「被小圈子护住的私情」到期；相关安排结束。
  _effects: state_remove pl19-protected-scandal state:world-vienna-1912:549; flag -protected_scandal_active_

- **1938.01** `state_tick:p22-scandal-engine/the-rumor-learns-new-words/the-story-gets-a-new-witness` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  又过了一年，流言没有熄，却学会了新的说法。Mitzi在咖啡馆里听见自己的故事被讲成三个版本，每个版本都比上一个多一个证人；没有人来追问，也没有人真正忘记。
  _effects: state_parameter p22-scandal-engine.heat 46 -> 43; state_parameter p22-scandal-engine.reach 49 -> 53; state_parameter p22-scandal-engine.leverage 22 -> 25; state_parameter p22-scandal-engine.shame 38 -> 40; mood 0.010000000000000009_

- **1938.01** `p9-social-daily-culture.lending-library/p9-social-daily-culture.lending-library.pay-deposit` tags: daily, culture, leisure, cafe, music, walk, task, task:knowledge
  Mitzi从内袋里数出两克朗压在柜台上，Anna Huber翻开借书卡，用铅笔把上次迟还的四天圈出来，还是把小说递了过来。Mitzi把书塞进外套里侧，出门就翻到第一页，边走边读，差点撞上推手推车的菜贩；两克朗换来的不只是一本小说，还有一整个下午的安静。
  _effects: cash -2 (租书店借小说的押金); skill; mood 0.040000000000000036_

- **1938.01** `p9-gap-adult-ordinary-day.lost-dog/lost-dog.return-address` tags: adulthood, daily, leisure, neighborhood, ordinary, animal, neighbor
  她照着铜牌一路问到那栋楼，门房说裁缝天不亮就出门了，天黑才回。Mitzi把狗绳在栏杆上绕了两圈，蹲下来拍了拍狗脑袋，狗伸出舌头舔了舔她的手背，才跟着门房往门廊里走。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-51; mood -0.020000000000000018_

- **1938.02** `vienna-housing-move.moving-day/moving-day-cart` tags: housing, home, rent, family, money, household
  车夫把价钱咬得很死，Mitzi还到五克朗又添了二十赫勒，才说定跑一趟。Katharina Winter扶着床架，车过路口时煤箱歪了一下，细灰撒在路面上。到了地方，东西卸在门厅，天已经大亮。
  _effects: cash -6 (雇马车搬家具一趟的工钱); residence; relation acquaintance with person-materialized-world-vienna-1912-11_

- **1938.09** `vienna-women-housework.care-old-parent/care.hire-neighbor` tags: gender, housework, home, labour, family, injury
  上午的日头照进走廊，Grete Moser 5扶着Rosa Lechner慢慢挪到椅子上。Mitzi听着隔壁的动静，低头缝完一整排扣眼，抬头时发现汤锅已经坐在炉上，火不旺不弱。
  _effects: cash -2.4 (付给邻居半个月的搭手钱); relation acquaintance with person-materialized-world-vienna-1912-41; mood 0.020000000000000018; health -0.010000000000000009 (夜里仍需起身照料，疲劳未消); relation acquaintance with person-materialized-world-vienna-1912-41_

- **1938.12** `vienna-courtship-courtyard.letter-answer/reply-at-bakery` tags: adulthood, courtship, partner, social, family, partnership
  第四天，Luise Berg的回信从门缝底下塞进来，纸边被门槛磨毛了。Luise Berg约Mitzi星期六早上在街角面包店门口见，说想买一个两赫勒的小圆面包，两个人分。Friedrich Bauer在楼道里撞见Mitzi读信，笑着问是不是好消息；Mitzi把信折回四折，塞进内袋贴着胸口。
  _effects: relation partner with person-materialized-world-vienna-1912-106; relation acquaintance with person:evt:world-vienna-1912:000561:child; mood 0.07000000000000006; relation acquaintance with person-materialized-world-vienna-1912-106_

- **1939.01** `vienna-life-injury-recovery/clinic-treatment` tags: health, work, family
  Mitzi在受伤后的第三天去了诊所。医生清洗伤口、换药，收下诊费，嘱咐不要急着回机器旁。Mitzi把药方折好，回家路上买了纱布。
  _effects: health 0.04999999999999999 (wound treatment); cash -8 (clinic and bandages)_
  _causes: evt:world-vienna-1912:007728_

- **1939.01** `state_expire:public-scandal` tags: public-scandal, scandal, reputation, social, state, state_tick, state:public-scandal
  Mitzi的「公开丑闻」到期；相关安排结束。
  _effects: state_remove public-scandal state:world-vienna-1912:594_

- **1939.01** `state_expire:p22-scandal-engine` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Mitzi的「流言发动机」到期；相关安排结束。
  _effects: state_remove p22-scandal-engine state:world-vienna-1912:595; flag -scandal_engine_active_

- **1939.01** `state_expire:pl19-protected-scandal` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  Mitzi的「被小圈子护住的私情」到期；相关安排结束。
  _effects: state_remove pl19-protected-scandal state:world-vienna-1912:640_

- **1939.01** `r13-work.report-defect::ctx-vienna-authoritarian-1934::milieu-factory/defect-fixed` tags: work, safety, bureaucracy, factory, whistleblowing, vienna, urban, crisis
  Mitzi把松动的螺栓画在纸上，标了机台号和班次，交给Rosa Winter。Rosa Winter起初把纸压在茶壶底下，Mitzi就站在窗口不走，直到他把维修班叫来。第二天螺栓换了新的，Luise Kral在早会上说这是“例行保养”，没提Mitzi的名字。
  _effects: cash 2 (报修单压在茶壶底下); reputation 0.05; flag +work13_reported_and_fixed_defect; relation colleague with person-luise-kral_

- **1939.03** `p22-mistaken-inheritance::ctx-vienna-authoritarian-1934::milieu-tenement/the-wrong-name-is-buried-right` tags: mistaken_inheritance, funeral, corpse, identity, dark, reversal, debt, family
  殡仪馆把两具棺材的标签贴反了，Mitzi因此继承了一个陌生人的小公寓。Rosa Bauer说只要没人发现，就可以一直住下去；Mitzi却在死者的抽屉里找到一叠未寄出的信，收信人正是隔壁的Maria Huber。葬礼那天，Mitzi把钥匙和信一起交了出去。
  _effects: state_add p22-wild-fortune state:world-vienna-1912:712; cash 3 (a reward for returning the estate); reputation 0.05; relation acquaintance with person-materialized-world-vienna-1912-100; relation acquaintance with person:evt:world-vienna-1912:000398:child; flag +wrong_coffin_righted; knowledge “殡仪馆把两具棺材的标签贴反了，死者的信指向隔壁的 claimant。”; mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-100; flag +wild_fortune_active_

- **1939.09** `vienna-social-movement.recruitment/read-and-decline` tags: development, social_movement, organization, politics
  Mitzi把传单读了两遍，记下上面的地址，却没有去。第二天照常上工；午休时听见两个工友低声谈论同一场集会。
  _effects: mood -0.010000000000000009_

- **1939.09** `r2-law.bankruptcy-hearing::ctx-vienna-authoritarian-1934::milieu-printshop/creditor-objects` tags: finance, bankruptcy, court, debt, shop, vienna, urban, crisis
  Rosa Winter的Anna Huber拿出一张送货单，说破产申请前两周还进过货，属于欺诈性交易。Rosa Huber把日期圈出来，让Mitzi解释；Mitzi说那批货是退回来的。Anna Huber要求查封店里的货架，Rosa Huber当场写了封条。
  _effects: cash -22 (破产听证会的第一排); condition; flag +creditor_challenged_bankruptcy; relation rival with person-materialized-world-vienna-1912-57; knowledge “a delivery two weeks before filing looks like a fraudulent p”_

- **1940.01** `state_reaction:wish-knowledge/knowledge-humiliation` tags: wish-knowledge, wish, wish:knowledge, knowledge, education, curiosity, state, state_reaction
  Mitzi把那句轻视记了很久。它没有变成一个决定，但也没有消失。
  _effects: mood -0.09999999999999998_
  _causes: evt:world-vienna-1912:008629_

- **1940.01** `hs18-occupation.piano::ctx-vienna-authoritarian-1934::milieu-printshop/refuse-to-sign` tags: occupation, piano, requisition, witness, neighbor, history, vienna, urban
  Mitzi把笔推回去，说钢琴的主人就住在隔壁。Rosa Lechner 2没有争，只让工人把琴盖也搬走，又记下Mitzi的门牌号。卡车开走时，Hermann Winter 2家的窗子开了又关；Mitzi站在空出来的门洞前，听见自己的呼吸声。
  _effects: state_add hs18-street-witness state:world-vienna-1912:711; reputation 0.020000000000000004; flag +refused_piano_receipt; mood -0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-96_

- **1940.01** `state_tick:p22-wild-fortune/the-story-gets-taller/the-crowd-remembers` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  一年过去，Mitzi的荒唐故事没有变小，反而多了一个愿意作证的人。债主没有立刻上门，亲戚也还愿意来吃饭；Mitzi把新添的银器擦了一遍，发现其中一只底下刻着别人的名字。
  _effects: state_parameter p22-wild-fortune.height 25 -> 29; state_parameter p22-wild-fortune.absurdity 55 -> 58; state_parameter p22-wild-fortune.witnesses 40 -> 45; state_parameter p22-wild-fortune.fragility 30 -> 32; mood 0.020000000000000018_

- **1940.01** `state_tick:wish-knowledge/knowledge-pressure/press-on` tags: wish-knowledge, wish, wish:knowledge, knowledge, education, curiosity, state, state_tick
  Mitzi又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.020000000000000018_

- **1940.01** `kernel-work.task-wage-claim::ctx-vienna-authoritarian-1934::milieu-factory/work-wage-claim-retaliated` tags: task, work, wages, claim, deduction, vienna, urban, crisis
  Mitzi拒绝在扣款单上签字，第二天被调去洗料间，工钱按日算，月底只剩二十克朗。Rosa Winter说这是“临时帮忙”，可班表上再没有Mitzi原来的位置。Mitzi把扣款单和调岗单钉在一起，交给工会干事；干事说可以申诉，但要等三个月。
  _effects: employment Waschhausarbeiter @ org-winter-print; relation colleague with person-materialized-world-vienna-1912-57; role; flag +wage_claim_refused; condition; cash -2 (调岗后的工钱差额)_

- **1940.04** `vienna-legacy-worklife.apprentice-wage/apprentice-wage.ask-master` tags: legacy, work, family, reform, ordinary_life
  掌柜的木尺敲了两下柜台，声音短促。Mitzi把问题又问了一遍，掌柜才说师兄是“老规矩进来的”。师兄这时转过身，笑了一下，笑得不太自然，说“没事，你问得对”。
  _effects: reputation -0.04000000000000001; relation colleague with person-materialized-world-vienna-1912-46; skill_

- **1940.09** `statistical_infection`
  Mitzi在Leopoldstädter Zinshaus, gemeinsamer Gang病倒了，肺炎让身体发热、虚弱，接下来的日子只能卧床。

- **1940.11** `ad20-stranger-request::ctx-vienna-authoritarian-1934::milieu-printshop/refuse-and-walk-on` tags: stranger, envelope, request, everyday, obligation, risk, vienna, urban
  Mitzi把信封推回去，说今天不方便。Rosa Berg没有生气，只把信封收回口袋，说“那就算了”。Mitzi走出巷口，回头看了一眼，Rosa Berg还站在原地，像在等另一个人。
  _effects: mood 0.010000000000000009; flag +envelope_refused; relation acquaintance with person:evt:world-vienna-1912:000223:child_

- **1940.12** `statistical_recovery`
  Mitzi从肺炎中慢慢恢复，能下床喝水，但身体还虚弱。

- **1941.01** `vienna-family-courtship/ask-to-share-a-home` tags: family, courtship, household, social, lifecycle
  Mitzi在Leopoldstädter Zinshaus, gemeinsamer Gang靠窗的桌边，把一只空咖啡杯转了半圈，说房租两人合付、桌子两人共用。Franz Weiss 2的手停在糖罐盖上，问了一句“要是过不下去呢”，没有当场答应，只说要想一想；杯里的咖啡凉了，话还悬在桌面上。
  _effects: interaction; relation acquaintance with person-materialized-world-vienna-1912-113_

- **1941.01** `hs18-occupation.lineup::ctx-vienna-authoritarian-1934::milieu-tenement/identify-the-man` tags: occupation, lineup, witness, denunciation, police, history, vienna, urban
  Mitzi指了指最左边那个人的鞋——鞋帮上有一道白灰，和那晚翻墙时蹭的一模一样。Rosa Lechner 2把名字记下，挥手让其余人走。Karl Kraus被带走时回头看了一眼，Mitzi没有避开那道目光。
  _effects: state_parameter hs18-street-witness.danger 60 -> 80; state_parameter hs18-street-witness.certainty 90 -> 95; state_parameter hs18-street-witness.retellings 0 -> 1; relation acquaintance with person-karl-kraus; flag +identified_man_in_lineup; mood -0.050000000000000044_

- **1941.01** `state_reaction:hs18-street-witness/interrogation-pressure` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  又有人来问那天的事。Mitzi把同一段话重说了一遍，对方却只记住其中两个名字；走的时候，门没有关严，楼道里的风把纸吹得直响。
  _effects: state_parameter hs18-street-witness.danger 80 -> 90; mood -0.030000000000000027_
  _causes: evt:world-vienna-1912:009211_

- **1941.01** `state_transition:hs18-street-witness/too-dangerous` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Mitzi从「街面上的目击者」转入另一段处境：the witness became more dangerous than the crime
  _effects: state_transition hs18-street-witness -> political-suspect; flag +witness_became_political_suspect_

- **1941.01** `state_expire:p22-wild-fortune` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  Mitzi的「荒唐横财」到期；相关安排结束。
  _effects: state_remove p22-wild-fortune state:world-vienna-1912:712; flag -wild_fortune_active_

- **1941.01** `r13-civ.sick-leave::ctx-vienna-authoritarian-1934::milieu-factory/leave-with-half-pay` tags: work, sick_leave, foreman, wages, health, vienna, urban, crisis
  Mitzi把请假条摊在Rosa Winter的桌上，说医生让卧床三天。Rosa Winter用铅笔在“病”字旁边点了一下，说可以走，但这三天的工钱要按半日算。Mitzi把条子折好，出门时听见他在背后把名字念给记账员听。
  _effects: cash -2 (请假条上的墨点); condition; flag +sick_leave_granted_with_deduction; knowledge “the workshop deducts half pay for sick days”_

- **1941.02** `vienna-historical-social-movement.district-list/demand-open-books` tags: history, historical_process, social_movement, organization, politics
  Mitzi把账本摊在灯下，一页一页念出日期和克朗数，念到买纸那笔时有人 From 门口咳嗽。Mitzi Moser低头拨弄围巾穗子，没有替谁说话。桌子上的旧墨水瓶被碰倒，蓝墨慢慢洇进木纹。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-24; reputation 0.039999999999999994; skill_

- **1941.04** `statistical_infection`
  Mitzi在Leopoldstädter Zinshaus, gemeinsamer Gang病倒了，肺结核让身体发热、虚弱，接下来的日子只能卧床。

- **1941.04** `bc18-ghost.death-certificate::ctx-vienna-authoritarian-1934::milieu-tenement/accepts-the-file` tags: bureaucracy, legal, death, identity, mistake, paperwork, absurd, vienna
  户籍官Rosa Lechner 2为了结掉一桩陈年失踪案，在档案上给Mitzi盖了“推定死亡”。三天后，Mitzi收到一张慰问卡和一本作废的配给簿；同一天，追了半年的债主忽然不再上门。旧货商听说后，花两克朗买走一份抄本，说要给一个躲债的朋友看看格式。
  _effects: cash 2 (卖给旧货商的死亡证明抄本); state_add bc18-bureaucratic-ghost state:world-vienna-1912:800; reputation -0.009999999999999995; relation acquaintance with person-materialized-world-vienna-1912-96; flag +declared_dead_while_alive; mood 0.010000000000000009; flag +bureaucratic_ghost; mood -0.010000000000000009_

- **1941.04** `r3-mig.exile-return::ctx-vienna-authoritarian-1934::milieu-tenement/return-refused-party-card` tags: migration, exile, return, politics, papers, vienna, urban, crisis
  Elisabeth Berg从档案里抽出一张旧党员证，上面的编号和Mitzi的出生日期对得上。Mitzi说那是年轻时被人代填的，Elisabeth Berg说“档案不认解释”。Lena在门外听见，把酒放在窗台上，没有进来。
  _effects: mood -0.16000000000000003; condition; flag +return_refused_party_card; knowledge “an old party card blocks the return visa”; relation acquaintance with person-materialized-world-vienna-1912-109_

- **1941.05** `statistical_recovery`
  Mitzi从肺结核中慢慢恢复，能下床喝水，但身体还虚弱。

- **1942.01** `interaction_response` tags: interaction
  Franz Weiss 2没有答应，只说现在不合适。Mitzi把这件事收回去，之后见面仍点头。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-113; interaction_
  _causes: evt:world-vienna-1912:009210_

- **1942.01** `vienna-life-injury-recovery/clinic-treatment` tags: health, work, family
  Mitzi在受伤后的第三天去了诊所。医生清洗伤口、换药，收下诊费，嘱咐不要急着回机器旁。Mitzi把药方折好，回家路上买了纱布。
  _effects: health 0.04999999999999999 (wound treatment); cash -8 (clinic and bandages)_
  _causes: evt:world-vienna-1912:009029_

- **1942.01** `hs18-suspect.photo::ctx-vienna-authoritarian-1934::milieu-factory/refuse-to-look` tags: political_suspect, photograph, police, neighbor, surveillance, history, vienna, urban
  Mitzi把照片推回去，说那天不在城里。Rosa Lechner 2没有追问，只把照片和一张车票放在一起。Mitzi看见车票上的日期，正是游行那天；票根却来自另一个方向。
  _effects: state_parameter political-suspect.heat 0.4 -> 0.52; flag +refused_photo_identification; knowledge “他们手里还有一张车票。”; mood -0.050000000000000044_

- **1942.01** `state_tick:political-suspect/police-interest/detained` tags: political-suspect, politics, repression, legal, surveillance, state, state_tick
  Mitzi在回家路上被拦住，问话从晚上八点持续到凌晨。没有正式指控，但名字被写进了另一本册子。
  _effects: state_parameter political-suspect.heat 0.52 -> 0.67; mood -0.039999999999999813_

- **1942.01** `state_tick:bc18-bureaucratic-ghost/paper-trail-year/another-window-opens` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  一个税务员把Mitzi的死亡记录和一张新房租收据订在一起，寄到了另一个区。三个星期后，Mitzi收到一封要求“已故纳税人”补缴暖气税的信；去问时，窗口说档案正在路上，让Mitzi先等通知。通知没有来，房租却涨了。
  _effects: state_parameter bc18-bureaucratic-ghost.fileDepth 25 -> 32; state_parameter bc18-bureaucratic-ghost.risk 20 -> 30; cash -1 (跑窗口的车钱); flag +heating_tax_for_the_dead_

- **1942.01** `p9-work-jobsearch.negotiate-hours/negotiate-hours.half-day` tags: work, job_search, negotiation, wages, employment, task, hours, saturday
  工时表铺在柜台上，边角卷起。Mitzi指着星期六，圣马克斯殡葬合作社的手指在数字上敲了两下，说下午歇可以，工钱按日扣。礼拜六中午，他推门出来，街上的影子短得像另一来处。
  _effects: cash -2 (星期六下午工钱按日扣减); health 0.03 (终于有半天空闲); mood 0.050000000000000044_

- **1942.08** `p9-history-union-political.meeting/meeting-speak-up` tags: politics, union, party, meeting, leaflet, police, strike, reform
  Mitzi站起来报出自己车间的计件工价：糊一百个纸盒二十八赫勒，比隔壁车间少六个。屋里一下子静了，Berta Berg把草稿推过来，让书记员把这几个数字写在动议第一行。散会时有人拍了拍Mitzi的肩膀。
  _effects: reputation 0.04000000000000001; relation colleague with person:evt:world-vienna-1912:000227:child_

- **1942.08** `vienna-life-overcrowded-flat/take-in-a-lodger` tags: housing, home, health, family
  Mitzi把厨房角落隔出一块，租给一个在附近上工的学徒。每月多四克朗，但煤、水和厕所都要排队；夜里有人咳嗽，Mitzi睡不踏实，第二天眼下发青，孩子也在床上翻来覆去，四克朗换来一屋子醒着的人。
  _effects: cash 4 (lodger rent); condition_

- **1942.09** `statistical_infection`
  Mitzi在Haus der Tante in Klosterneuburg病倒了，肺结核让身体发热、虚弱，接下来的日子只能卧床。

- **1942.09** `p9-gap-adult-solitude.misdelivered-letter/misdelivered-letter.opened` tags: adulthood, daily, solitude, ordinary, home, letter
  信封没封牢，Mitzi在灯下把它掀开，里面是维也纳联合银行的催款单，欠了三十四克朗。她认出那名字是楼上常穿黑裙的女人，便把纸原样叠回去，用米汤把封口粘好，放到门房窗台上。
  _effects: mood -0.040000000000000036; flag +knows_upstairs_debt_

- **1942.12** `statistical_illness_worsened`
  Mitzi的肺结核没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1943.01** `state_tick:political-suspect/police-interest/detained` tags: political-suspect, politics, repression, legal, surveillance, state, state_tick
  Mitzi在回家路上被拦住，问话从晚上八点持续到凌晨。没有正式指控，但名字被写进了另一本册子。
  _effects: state_parameter political-suspect.heat 0.67 -> 0.8200000000000001; mood -0.010000000000000009_

- **1943.01** `state_tick:bc18-bureaucratic-ghost/paper-trail-year/another-window-opens` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  一个税务员把Mitzi的死亡记录和一张新房租收据订在一起，寄到了另一个区。三个星期后，Mitzi收到一封要求“已故纳税人”补缴暖气税的信；去问时，窗口说档案正在路上，让Mitzi先等通知。通知没有来，房租却涨了。
  _effects: state_parameter bc18-bureaucratic-ghost.fileDepth 32 -> 39; state_parameter bc18-bureaucratic-ghost.risk 30 -> 40; cash -1 (跑窗口的车钱)_

- **1943.01** `p10-family-tasks.find-missing-kin/find-missing-kin.toolbox` tags: adulthood, family, social, marriage, care, inheritance, task, missing_kin
  旅店老板把仓库门打开，工具箱靠在墙角，刨刃上还有木屑。老板说人走时没带，欠的房钱拿工具抵。Mitzi在旧货商那里把刨子和凿子卖了，换了三克朗，刚够一张回维也纳的车票。
  _effects: cash 3 (卖掉哥哥留下的工具换路费); relation acquaintance with person-materialized-world-vienna-1912-86_

- **1943.01** `r2-law.invoice-fraud::ctx-vienna-authoritarian-1934::milieu-printshop/paid-twice` tags: finance, fraud, invoice, audit, shop, vienna, urban, crisis
  Mitzi把第二张发票夹进月结单，Rosa Winter没有细看就盖了章。钱到账那天，Mitzi去银行取出一半，放进茶叶罐。三个月后，Marie Huber来查账，Rosa Winter先把月结单抱出来，说每一张都有章；茶叶罐在柜子顶上，谁也没碰。
  _effects: cash 10 (一张发票报销两次); condition; flag +collected_duplicate_invoice_payment; relation acquaintance with person-materialized-world-vienna-1912-57; knowledge “the second invoice was approved without a delivery note”_

- **1943.02** `statistical_recovery`
  Mitzi从肺结核中慢慢恢复，能下床喝水，但身体还虚弱。

- **1943.04** `oj18-zoo.night::ctx-vienna-authoritarian-1934::milieu-factory/broken-tooth` tags: zoo, animals, night, keeper, work, odd_job, suspense, vienna
  夜里十一点，母狮不肯碰桶里的马肉。Mitzi举着煤油灯绕到兽栏后面，看见它右槽牙断了一截，牙龈肿得发亮。Mitzi把肉切碎，又去敲Rosa Winter的门；第二天兽医来了，Helene Bauer 2在晨会上第一次记住Mitzi的名字。
  _effects: organization_found 普拉特动物园夜班队 (other); position 夜班饲养员 @zoo:person-phase15-Mitzi-world-vienna-1912-evt:world-vienna-1912:010706; state_add oj18-odd-apprenticeship state:world-vienna-1912:877; skill; reputation 0.03; flag +zoo_night_shift; knowledge “母狮的右槽牙断了，牙龈肿得发亮，夜里不肯吃马肉。”; relation acquaintance with person-materialized-world-vienna-1912-120; role; flag +odd_job_apprentice_

- **1943.09** `vienna-church-community.tenement-prayer/rent-prayer-argument` tags: faith, social, family, home
  有人抱怨守夜人太多，踩坏了楼梯木板。楼里的人围着看，谁也没先走开。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-65; reputation -0.03_

- **1944.01** `pc20-investigation.exoneration::ctx-vienna-authoritarian-1934::milieu-factory/re-accused` tags: politics, investigation, exoneration, public_reversal, police, reputation, patronage, vienna
  Ferdinand Lechner说这次不起诉，但另一份材料已经转给了别的部门。Mitzi看见通知背面有一行铅笔字，写着另一个日期；Grete Moser 2在走廊里没有再让开，反而问Mitzi是不是还要去找律师。
  _effects: state_add pc20-public-reversal state:world-vienna-1912:876; state_parameter political-suspect.heat 0.8200000000000001 -> 0.9700000000000001; reputation -0.06; flag +reaccused_after_exoneration; knowledge “通知背面有一行铅笔字，写着另一个日期。”; relation acquaintance with person-materialized-world-vienna-1912-128; flag +public_reversal_active_

- **1944.01** `state_reaction:pc20-public-reversal/someone-defends` tags: pc20-public-reversal, public_reversal, exoneration, accusation, testimony, proof, pressure, support
  一个旧同事在公开场合替Mitzi说了话，没有把Mitzi说成无辜，只把当年那份名单的次序讲清楚。第二天，另一个人在面包店门口拦住Mitzi，说自己一直觉得哪里不对。
  _effects: state_parameter pc20-public-reversal.support 20 -> 27; state_parameter pc20-public-reversal.proof 25 -> 29; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:010708_

- **1944.01** `state_transition:political-suspect/arrested` tags: political-suspect, politics, repression, legal, surveillance, state, state_tick, detained
  Mitzi从「政治嫌疑」转入另一段处境：the file became an arrest
  _effects: state_transition political-suspect -> detained; flag +political_arrest; unemployment (detained); flag +detained_

- **1944.01** `state_expire:bc18-bureaucratic-ghost` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  Mitzi的「档案里的活鬼」到期；相关安排结束。
  _effects: state_remove bc18-bureaucratic-ghost state:world-vienna-1912:800; flag -bureaucratic_ghost_

- **1944.01** `state_tick:oj18-odd-apprenticeship/strange-year/the-logbook-mislaid` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  巡查簿在换班时不见了，第二天却出现在煤筐底下，最后几页被水泡得发皱。管事的说签字不能算数，扣了Mitzi半个月的夜班钱；Mitzi没有争，只在新的簿子第一页把日期写得很大。
  _effects: state_parameter oj18-odd-apprenticeship.trust 30 -> 14; state_parameter oj18-odd-apprenticeship.reliability 55 -> 45; mood -0.020000000000000018; flag +odd_job_scare_

- **1944.01** `state_tick:wish-knowledge/knowledge-pressure/press-on` tags: wish-knowledge, wish, wish:knowledge, knowledge, education, curiosity, state, state_tick
  Mitzi又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.020000000000000018_

- **1944.01** `r13-fam.set-up-household::ctx-vienna-authoritarian-1934::milieu-tenement/move-in-with-in-laws` tags: task, family, household, housing, marriage, vienna, urban, crisis
  屋子没租成，Anton Hofer的母亲腾出半间前屋，条件是新婚夫妇每月交饭钱。Mitzi把箱子搬进去时，Elisabeth Winter 2站在楼下看，嘴角带着笑。当天晚上，两代人在一张桌上吃饭，谁的筷子都没有先动。
  _effects: cash -3 (第一间自己的屋子); condition; flag +moved_in_with_in_laws; knowledge “the couple pays board to the partner’s mother”; household; relation acquaintance with person-materialized-world-vienna-1912-70_

- **1944.05** `vienna-parish-aid.funeral-society/funeral-society.defer` tags: faith, parish, mutual_aid, poverty, family
  Mitzi把抽屉拉开又推上，铜币在木板上滚了半圈。Anna Stein 2合上本子说，拖欠的人不少，可规矩就是规矩。她走下两级台阶又回头提醒，发工钱那天她会在教堂侧门等着。
  _effects: mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-124; relation acquaintance with person-materialized-world-vienna-1912-124_

- **1945.01** `vienna-life-1945-liberation/displaced` tags: war, liberation, 1945, migration
  炮火把Mitzi住的那条街烧掉一半。Mitzi跟着人群走到城外，在临时收容所登记，床位上铺的是发霉的稻草。
  _effects: move place-klosterneuburg-aunt-house; role; cash -5 (temporary shelter)_

- **1945.01** `state_tick:pc20-public-reversal/file-moves/the-file-disappears` tags: pc20-public-reversal, public_reversal, exoneration, accusation, testimony, proof, pressure, support
  Mitzi按约定时间去调卷，窗口的人说编号不对，又说管库的人病了。走廊尽头的门开着，里面只剩空架子和一层灰；Mitzi把手伸进去，摸到的是一截断掉的麻绳。
  _effects: state_parameter pc20-public-reversal.proof 29 -> 21; state_parameter pc20-public-reversal.danger 70 -> 76; state_parameter pc20-public-reversal.pressure 75 -> 80_

- **1945.01** `p9-social-daily-culture.cafe-newspaper/p9-social-daily-culture.cafe-newspaper.talk-tram` tags: daily, culture, leisure, cafe, music, walk, task, task:daily
  Mitzi把报纸推到一边，和Emil Weiss 2聊起电车票价要涨的传闻。两人拿过糖罐当算盘，在桌布上比划通勤开销，两杯咖啡四十赫勒，争论得忘了时间，直到窗外的煤气灯亮起来。Mitzi起身时发现大衣下摆沾了咖啡渍，晚饭的点早过了，却约好下回还坐这张桌子。
  _effects: cash -0.4 (两杯咖啡的价钱); relation acquaintance with person-materialized-world-vienna-1912-55; mood 0.040000000000000036; relation acquaintance with person-materialized-world-vienna-1912-55_

- **1945.01** `vienna-housing-move.moving-day/moving-day-handcart` tags: housing, home, rent, family, money
  手推车每走十几步就要停一下，楼道里的门半开着，有人探头看热闹。Mitzi把照片铁盒交给Alois Weiss抱着，自己低头把最后一箱锅具拖上楼。天擦黑时，新屋里才勉强归置出下脚的地方。
  _effects: cash -1 (借手推车买烟熨谢邻居的小开销)_

- **1946.01** `state_tick:pc20-public-reversal/file-moves/a-copy-survives` tags: pc20-public-reversal, public_reversal, exoneration, accusation, testimony, proof, pressure, support
  书记员把一份抄件从抽屉底下抽出来，说原件已经调走，但这一份还在。Mitzi看见纸上自己的名字被红笔圈过，旁边有一行小字：此页曾由第三人核对。
  _effects: state_parameter pc20-public-reversal.proof 21 -> 28; state_parameter pc20-public-reversal.pressure 80 -> 84; state_parameter pc20-public-reversal.danger 76 -> 73; knowledge “档案里还有一份抄件，曾经由第三人核对过。”_

- **1946.01** `state_tick:oj18-odd-apprenticeship/strange-year/trusted-with-the-keys` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  两年过去，Mitzi已经能闭着眼说出哪块地板会响、哪盏煤气灯该在几点关。师傅把备用钥匙交下来，没有解释为什么第三把钥匙磨得最亮；Mitzi也没有问，只在巡查簿最后一页画了一个小小的记号。
  _effects: state_parameter oj18-odd-apprenticeship.trust 14 -> 24; state_parameter oj18-odd-apprenticeship.strangeKnowledge 20 -> 30; state_parameter oj18-odd-apprenticeship.nightsWorked 0 -> 24; cash 2 (night-shift wages); skill_

- **1946.01** `state_expire:detained` tags: detained, legal, prison, detention, absence, state, state_tick, state:detained
  Mitzi的「被拘留」到期；相关安排结束。
  _effects: state_remove detained state:world-vienna-1912:892; flag -detained; flag +released_from_detention_

- **1946.01** `p9-social-relationship-initiative.cut-the-guarantee/refuse-to-sign` tags: courtship, friendship, family, social, initiative, housing, task, task:social
  把那张字据推回去，说房租和母亲的药费都在桌上摆着，这名字不能签。前两次的借条从证件夹里翻出来放在一起，摊平让对方看清。对方把纸卷起来收进外套，门带得比平常重，此后在街上碰见只当没认出来。
  _effects: mood -0.040000000000000036; reputation 0.03_

- **1946.01** `vienna-housing-move.rent-notice/rent-notice-demand-repair` tags: housing, home, rent, family, money
  Mitzi没有立刻答话，先去敲Josef的门。两人一起数落墙上的水渍和门框里灌进来的风，楼梯间的窗户修好了，自家墙皮还在剥落。Josef提议一起把话带给看门人：先修好漏水的墙角，涨租的事再谈。Mitzi把纸重新折好，请他把话带到门外。
  _effects: relation acquaintance with person-phase15-Josef-world-vienna-1912; mood 0.030000000000000027; flag +rent_dispute_

- **1946.04** `vienna-medical-treatment.toothache/dentist-pull` tags: health, medical, family, money
  诊室在二楼，楼梯间飘着石炭酸味。医生把钳子举到灯下看了看，叫Mitzi攥紧扶手。Karl Kraus站在门边数墙上的价目表：拔牙两克朗五十赫勒，药棉五十赫勒，连消炎水另算。
  _effects: cash -3 (牙医拔牙费用); health 0.05999999999999999 (拔除病牙解除疼痛)_

- **1946.06** `vienna-historical-social-movement.district-list/hold-list-and-watch` tags: history, historical_process, social_movement, organization, politics
  Elisabeth Kral把会费账本推回去，说外头那个组织答应给煤，只要名单。Mitzi把账本合上，用一块旧布包好塞进缝纫机底下，说先看看谁在往外递话。两人都没再提这事。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-18; flag +kept_district_list_private_

- **1946.06** `vienna-women-housework.piecework-bundle/piecework.dispute-rate` tags: gender, housework, home, labour, family
  铜板一枚枚落在桌面上，比说好的少了十五赫勒。Mitzi没去捡，先问Otto Bauer下捆还送不送。Otto Bauer含糊应了一声，拎起布包就走。Hermann Berg这才进来，说下回得先讲好价。
  _effects: cash 0.6 (争执后按降低的工价结算); reputation 0.03; relation colleague with person-materialized-world-vienna-1912-104_

- **1947.01** `state_tick:pc20-public-reversal/file-moves/a-copy-survives` tags: pc20-public-reversal, public_reversal, exoneration, accusation, testimony, proof, pressure, support
  书记员把一份抄件从抽屉底下抽出来，说原件已经调走，但这一份还在。Mitzi看见纸上自己的名字被红笔圈过，旁边有一行小字：此页曾由第三人核对。
  _effects: state_parameter pc20-public-reversal.proof 28 -> 35; state_parameter pc20-public-reversal.pressure 84 -> 88; state_parameter pc20-public-reversal.danger 73 -> 70; knowledge “档案里还有一份抄件，曾经由第三人核对过。”_

- **1947.01** `state_expire:oj18-odd-apprenticeship` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  Mitzi的「奇职学徒」到期；相关安排结束。
  _effects: state_remove oj18-odd-apprenticeship state:world-vienna-1912:877; role; flag -odd_job_apprentice_

- **1947.01** `p9-social-daily-culture.sunday-hill/p9-social-daily-culture.sunday-hill.reach-summit` tags: daily, culture, leisure, cafe, music, walk, task, task:daily
  Mitzi和Ferdinand Bauer按原计划沿葡萄园间的土路往上走，鞋子沾满黄泥，到山顶时风把汗湿的衬衫吹得冰凉。下山在第一个酒棚坐下，两人合点了一壶新酒和一块面包，一共一克朗二十赫勒；Mitzi喝到第二杯时脸颊发烫，把剩下的半块面包包进手帕带回家，第二天腿酸，却睡得很沉。
  _effects: cash -1.2 (卡伦山酒棚的新酒和面包); food; health 0.020000000000000004 (星期天登山远足); mood 0.06000000000000005_

- **1947.01** `vienna-women-housework.coal-stove/coal-stove.borrow-fire` tags: gender, housework, home, labour, family
  Mitzi端着一只旧锅去敲Franz Winter的门，想借几块烧红的炭。Franz Winter让她从自家炉膛里夹了一块，又抓了一小把引火的木片。Mitzi连声道谢，回来把炭放进炉栅，火是有了，屋里却还是冷得能呵出白气。
  _effects: food; mood 0.020000000000000018_

- **1947.05** `p9-social-tenement-neighbors.gramophone-wall/gramophone-wall.caretaker-notice` tags: housing, neighbors, tenement, daily, money, reputation
  Mitzi去找看门人，说院子里四面墙，声音绕不出去。第二天楼梯间的木板上贴了一张纸：晚上十点后请勿放留声机，鞋匠铺也请收锤。纸条没有落款，只有房东事务所的戳。Ferdinand Bauer路过时看了很久，把留声机的盖子合上了。
  _effects: mood 0.040000000000000036_

- **1947.07** `vienna-parish-aid.rent-box/rent-box.refuse` tags: faith, parish, mutual_aid, poverty, family
  Mitzi说这个月还能撑，房租差的那几克朗打算替人洗衣补上，请Luise Bauer 2把篮子提回去给更困难的人家。Luise Bauer 2在门口停了一会儿，把一小块肥皂留在窗台上，说不是救济，是教区多出来的。门关上后，屋里只剩煤箱底刮出的响声。
  _effects: mood -0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-112; flag +parish_refused_aid; relation acquaintance with person-materialized-world-vienna-1912-112_

- **1948.01** `state_expire:pc20-public-reversal` tags: pc20-public-reversal, public_reversal, exoneration, accusation, testimony, proof, pressure, support
  Mitzi的「公开翻案」到期；相关安排结束。
  _effects: state_remove pc20-public-reversal state:world-vienna-1912:876; flag -public_reversal_active_

- **1948.01** `state_tick:wish-knowledge/knowledge-pressure/put-away` tags: wish-knowledge, wish, wish:knowledge, knowledge, education, curiosity, state, state_tick
  Mitzi暂时把那件事收进抽屉；日子还有别的东西要应付。
  _effects: mood -0.020000000000000018_

- **1948.01** `task-vienna-family-care.care-sick-parent/neighbor-helps` tags: family, care, courtship, siblings, inheritance, housing, task, task:family
  天没亮，Mitzi就敲开Otto Weiss的门，说好白天请她过来照看，喂药、添煤、给孩子们热汤，回来结钱。Otto Weiss要了六十赫勒，Mitzi点头应下，赶去上工。晚上回来时药按时吃了，炉子也旺，只是孩子们把粥洒了一桌。
  _effects: cash -0.6 (付给邻居白天的照看钱); relation acquaintance with person-materialized-world-vienna-1912-86; health 0.02999999999999997 (有人按时喂药，病情稍稳)_

- **1948.03** `vienna-legacy-worklife.sick-fund/sick-fund.keep-quiet` tags: legacy, work, family, reform, ordinary_life
  止咳药水是褐色的，瓶口塞着软木塞，摇一摇会起沫。Mitzi看着工友把表折成小块，折了三折才塞进帽檐。墙上的规章还贴在那里，纸角被风掀起，没人去按。
  _effects: mood -0.050000000000000044; relation colleague with person-materialized-world-vienna-1912-109_

- **1948.08** `vienna-illness-household.mother-falls/stay-home-care` tags: health, family, home
  屋里只有一张床，Mitzi把椅子拼在床边守了三夜，给Rosa Lechner敷药换布。请假扣的工钱让人心疼，但腿伤见好；第四天早上，Rosa Lechner自己端起了粥碗。
  _effects: cash -4 (请假三天损失的工钱); health 0.09999999999999998 (在家照护后腿肿消退); relation kin with person-rosa-lechner_

- **1948.08** `p9-gap-adult-ordinary-day.wash-day/wash-day.wring-blanket` tags: adulthood, daily, leisure, neighborhood, ordinary, laundry, neighbor, household
  两个人拧毯子的时候，Franz Weiss 2在旁边递肥皂水，说你们俩力气倒合得上。毯子抬上绳子时还在滴水，Mitzi甩了甩手，看见自己掌纹里嵌着一道一道的布纹。
  _effects: relation friend with person-materialized-world-vienna-1912-49_

- **1948.11** `vienna-parish-aid.soup-kitchen/soup-kitchen.take-and-carry` tags: faith, parish, mutual_aid, poverty, family
  汤是豆子熬的，表面浮着几粒油星，气味把整条巷子都占了。Otto Weiss排在前面，回头替Mitzi看着位置，嘴里数着还剩几个人。铁罐递过去时烫手，Mitzi用围裙角垫着。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-86; mood 0.030000000000000027_

- **1949.01** `p9-social-daily-culture.last-standing-ticket/p9-social-daily-culture.last-standing-ticket.got-ticket` tags: daily, culture, leisure, cafe, music, walk, task, task:culture
  Mitzi挤到窗口前，把一克朗硬币推进凹槽，换回一张印着座号的薄纸片。顶层站席的栏杆被前面的人汗湿，Mitzi侧身找了个能看见舞台边的位置，倚着烫手的铁栏看完两幕；散场时小腿发麻，嘴里还哼着刚听到的曲调，幕间也和邻座搭上了两句话。
  _effects: cash -1 (约瑟夫施塔特剧院顶层站票); mood 0.06000000000000005; skill_

- **1949.02** `p9-social-tenement-neighbors.stove-and-line/stove-and-line.move-to-line-end` tags: housing, neighbors, tenement, daily, money, reputation
  Mitzi把自己泡着的衣服端到绳子最末一段，把靠近炉子的位置让给Helene Stein，条件是对方看着火，别让水烧干。Helene Stein点头，往炉膛里添了一块煤，说中午以前一定把炉子空出来。两家的盆就挨着放在窗下。
  _effects: mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-122_

- **1949.09** `hs18-queue.refugee::ctx-vienna-postwar-1945::milieu-tenement/sign-as-guarantor` tags: refugee, queue, station, papers, official, history, vienna, urban
  登记桌后面，Luise Lechner把表格推过来，说这一家人缺一个本地担保人。Maria Huber抱着一只藤箱，箱角用绳子捆了三道。Mitzi写下自己的名字和门牌号，笔尖顿了一下；Luise Lechner盖章时没有抬头，只说“出了事找你”。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-100; flag +guaranteed_refugee_family; knowledge “担保人要替被担保的人负责。”; reputation -0.010000000000000009_

- **1950.01** `vienna-life-injury-recovery/wound-infection` tags: health, work, family
  Mitzi的伤口在几天后肿起来，手腕发热。医生说要切开引流，费用比上次更高；Mitzi看着账单，先问能不能分两次付。
  _effects: cash -14 (drainage and medicine)_
  _causes: evt:world-vienna-1912:013273_

- **1950.01** `p9-work-jobsearch.railway-depot/railway-depot.eyesight-failed` tags: work, job_search, negotiation, wages, employment, task, railway, depot
  字牌贴在石灰墙上，最后两行他实在分不清。Friedrich Bauer用笔杆敲敲桌面，Grete Berg把名字写进另一本册子，说有缺再叫。Mitzi把证明一张张叠好，折边已经发软。
  _effects: mood -0.06000000000000005; flag +seeking_work; relation acquaintance with person-materialized-world-vienna-1912-148; relation acquaintance with person-materialized-world-vienna-1912-148_

- **1950.03** `vienna-historical-social-movement.public-meeting/stay-and-tidy-chairs` tags: history, historical_process, social_movement, organization, politics
  椅子叠到一半，Alois Weiss压低声音说今晚有三个人没投票就走了。Mitzi把最后一块瓜子壳扫进簸箕，说记住那三张脸，比上台多说一句有用。灯熄时大厅只剩木头发出的轻响。
  _effects: skill; mood -0.020000000000000018_

- **1950.04** `vienna-tenement-neighbors.lost_room_key/key_found_by_neighbor` tags: home, social, family, housing
  Mitzi傍晚从面粉厂下工回来，发现挂在腰带上的房门钥匙不见了，在楼梯间来回找了四趟。Elisabeth Kral在二楼拐角的煤堆旁捡到那把铜钥匙，钥匙上缠着红线，一眼就认出来。Elisabeth Kral敲开Mitzi的门，把钥匙拍在桌上，说自己眼神好使。
  _effects: relation friend with person-materialized-world-vienna-1912-18; mood 0.050000000000000044_

- **1950.04** `vienna-market-household.friday-fish/friday-fish.share` tags: home, market, food, social
  鱼还滴着水，Mitzi在走廊里分成两份。一份拿进自家，一份搁在Elisabeth Kral的门口。傍晚Elisabeth Kral来还盘子，盘子里是一小袋面粉。
  _effects: cash -6 (买鱼); food; relation acquaintance with person-materialized-world-vienna-1912-18_

- **1950.09** `vienna-church-community.tenement-prayer/rent-prayer-help` tags: faith, social, family, home
  楼梯间只点一根蜡烛。Friedrich Berg凑过来低声说，楼下老寡妇的喘病又重了，教区明早才能派修女来。Mitzi把汤碗接过去，碗底还温着。
  _effects: condition; food; relation acquaintance with person-materialized-world-vienna-1912-135; relation acquaintance with person-materialized-world-vienna-1912-135_

- **1951.01** `p9-history-public-action.organize-relief/backyard-stove` tags: politics, union, party, activism, public_action, relief, leaflet, task
  Ferdinand Lechner 的话很简短：名单不能批。Mitzi 把表格折好，转头去搬砖搭灶。Ferdinand Bauer 从家里抱来一捆柴，火星溅在围裙上，拍两下就灭了。
  _effects: cash -3 (买柴火和盐); food; mood -0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-128_

- **1951.04** `p9-gap-adult-solitude.leaking-shoe/leaking-shoe.gave-up` tags: adulthood, daily, solitude, ordinary, home, repair, shoe, poverty
  Mitzi缝了半个钟头，线老是从针眼里脱出来，最后把鞋往床底下一踢。第二天清早她穿着这双鞋站在厂门口等开门，湿石头地的凉气从裂缝里钻进来，脚趾冻得发麻，只能来回换脚。
  _effects: mood -0.040000000000000036_

- **1951.07** `vienna-illness-household.mother-falls/mother-returns-to-work` tags: health, family, home, injury
  Rosa Lechner不肯躺着，第三天就去帮人洗衣挣回一克朗。Mitzi晚上发现她的腿又肿了，那点工钱抵不上药钱；炉边的药布还没干，又得重新煮。
  _effects: health -0.050000000000000044 (过早劳作导致腿伤加重); cash 1 (母亲洗衣挣的零钱); mood -0.040000000000000036_

- **1952.01** `state_tick:wish-knowledge/knowledge-pressure/press-on` tags: wish-knowledge, wish, wish:knowledge, knowledge, education, curiosity, state, state_tick
  Mitzi又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.020000000000000018_

- **1952.01** `p10-family-tasks.find-missing-kin/find-missing-kin.toolbox` tags: adulthood, family, social, marriage, care, inheritance, task, missing_kin
  旅店老板把仓库门打开，工具箱靠在墙角，刨刃上还有木屑。老板说人走时没带，欠的房钱拿工具抵。Mitzi在旧货商那里把刨子和凿子卖了，换了三克朗，刚够一张回维也纳的车票。
  _effects: cash 3 (卖掉哥哥留下的工具换路费); mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-129_

- **1952.07** `p9-gap-adult-unemployed.labour-exchange/exchange-swap-tips` tags: adulthood, unemployment, casual_labour, poverty, daily, labour_exchange, bureaucracy
  介绍所的门关到一半，里面还在喊下一位。Mitzi和Alois Winter 2站在廊下，听着货栈、面粉厂、马厩各处的消息，最后只记住北站那条。烟盒纸塞进上衣口袋，走路时窸窸窣窣响。
  _effects: flag +has_work_lead; relation acquaintance with person-materialized-world-vienna-1912-161; relation acquaintance with person-materialized-world-vienna-1912-161_

- **1952.07** `p9-gap-adult-ordinary-day.flea-market-cup/flea-market-cup.buy-cracked` tags: adulthood, daily, leisure, neighborhood, ordinary, flea_market, object
  杯口描着金边，金已经磨掉了一半，露出底下的白瓷。摊主用一块脏布把杯子擦了擦，说这是老太太们喝咖啡用的。Mitzi把它对着光看，裂纹里有一条淡淡的褐线，像渗进去的茶渍。
  _effects: cash -0.4 (买下有裂纹的描金边杯子); mood 0.020000000000000018_

- **1952.08** `vienna-women-housework.care-old-parent/care.self-tend` tags: gender, housework, home, labour, family, injury
  药包用纸折着，Mitzi把它压在枕头边，夜里起来两回。手工篮里的领子只做了几件，线搁在窗台上受潮。Rosa Lechner说汤淡了，Mitzi又去添了一撮盐。
  _effects: cash -1.2 (少接计件活，收入减少); health -0.03 (日夜照料老人，睡眠不足); relation kin with person-rosa-lechner; food_

- **1952.12** `vienna-housing-move.moving-day/moving-day-handcart` tags: housing, home, rent, family, money, injury
  手推车每走十几步就要停一下，楼道里的门半开着，有人探头看热闹。Mitzi把照片铁盒交给Anna Huber抱着，自己低头把最后一箱锅具拖上楼。天擦黑时，新屋里才勉强归置出下脚的地方。
  _effects: cash -1 (借手推车买烟熨谢邻居的小开销); health -0.020000000000000004 (三趟推车扛家具累得肩臂酸痛); relation acquaintance with person-materialized-world-vienna-1912-46_

- **1953.01** `vienna-life-injury-recovery/clinic-treatment` tags: health, work, family
  Mitzi在受伤后的第三天去了诊所。医生清洗伤口、换药，收下诊费，嘱咐不要急着回机器旁。Mitzi把药方折好，回家路上买了纱布。
  _effects: health 0.05 (wound treatment); cash -8 (clinic and bandages)_
  _causes: evt:world-vienna-1912:014862_

- **1953.01** `p9-social-daily-culture.pictures-or-concert/p9-social-daily-culture.pictures-or-concert.skip-both` tags: daily, culture, leisure, cafe, music, walk, task, task:culture
  Mitzi在影戏棚和音乐厅之间走了两趟，最后哪处都没进。Mitzi拐进常去的酒馆，花三十赫勒要了半升啤酒，听角落里有人拉琴，拉得不准但很响。Franz Bauer找到Mitzi时，桌上的杯子已经空了一半，省下的票钱还在口袋里叮当响；这一晚没看成戏，倒把半升啤酒喝出了几分自在。
  _effects: cash -0.3 (酒馆半升啤酒); mood 0.030000000000000027; relation friend with person-materialized-world-vienna-1912-144; relation acquaintance with person-materialized-world-vienna-1912-144_

- **1953.06** `vienna-tenement-neighbors.shared_stove_fire/fire_no_damage` tags: home, social, family, housing
  Mitzi刚把锅端下灶，火苗就蹿了起来，Hermann Kral 2一脚踩灭地上的油布，顺手抄起沙箱里的沙子盖住灶口。两人都没受伤，但Hermann Kral 2的鞋底烧穿一个洞，那是唯一一双出门的鞋。
  _effects: relation friend with person-materialized-world-vienna-1912-81; mood -0.050000000000000044_

- **1954.01** `r13-fam.care-sick-child::ctx-vienna-postwar-1945::milieu-tenement/fever-breaks` tags: task, care, health, child, fever, night, vienna, urban
  Mitzi把湿布拧到不再滴水，敷在Rosa Winter的额头上。孩子烧得说胡话，Mitzi就一遍遍念窗外的街名，直到天快亮时，孩子的手心终于出了一层汗。Mitzi把被子掖好，自己靠在床沿睡了过去，醒来时锅里还剩半碗冷粥。
  _effects: cash -2 (第三遍换湿布); condition; flag +nursed_child_fever; health 0.06 (the fever broke after a night of cold compresses); relation guardian with person:evt:world-vienna-1912:012654:child_

- **1954.06** `vienna-postwar-housing-1950s/waiting-list` tags: adulthood, postwar, housing, family
  Mitzi去住房局问结果，办事员翻过卡片说分数不够：家里人口少，现住房虽挤但还没到拆除标准。回程的电车上，Alois Bauer劝他明年再递一次申请。
  _effects: role; cash -2 (application and tram fare); mood -0.040000000000000036; relation acquaintance with person:evt:world-vienna-1912:005421:child_

- **1954.08** `vienna-tenement-neighbors.lost_room_key/key_found_by_neighbor` tags: home, social, family, housing
  Mitzi傍晚从面粉厂下工回来，发现挂在腰带上的房门钥匙不见了，在楼梯间来回找了四趟。Ferdinand Kraus在二楼拐角的煤堆旁捡到那把铜钥匙，钥匙上缠着红线，一眼就认出来。Ferdinand Kraus敲开Mitzi的门，把钥匙拍在桌上，说自己眼神好使。
  _effects: mood 0.050000000000000044_

- **1955.01** `vienna-tenement-neighbors.laundry_line_dispute/subject_yields_line` tags: home, social, family, housing
  Mitzi看Hermann Kral 2盆里那几件小衬衫，把自家床单卷起来抱回屋，说等下午再晾。Hermann Kral 2愣了一下，闷头把衣服挂好，收工回来时在Mitzi门口放了一小包用旧报纸裹的洗衣碱。Mitzi打开报纸，碱面里还掺着几粒粗盐。
  _effects: relation friend with person-materialized-world-vienna-1912-81; food_
  _causes: evt:world-vienna-1912:015909_

- **1955.01** `r13-civ.quarantine::ctx-vienna-postwar-1945::milieu-tenement/broke-quarantine` tags: health, quarantine, epidemic, neighbor, confinement, vienna, urban, postwar
  Mitzi等到夜里，从后院的柴门溜出去上工。车间里没有人问，机器照常转，只有换班的人往旁边让了半步。回家时白线还在，Mitzi跨过去，鞋底带回一层湿泥。
  _effects: cash 3 (门框上的石灰线); reputation -0.1; flag +broke_quarantine; knowledge “the workshop does not ask why a quarantined worker returned”; relation acquaintance with person-materialized-world-vienna-1912-171_

- **1955.06** `p9-social-tenement-neighbors.stairwell-rumor/stairwell-rumor.ask-straight` tags: housing, neighbors, tenement, daily, money, reputation
  Mitzi在楼梯间拦住Otto Bauer，问那句话是从哪儿听来的，又趁送活的人上门时当面看清是谁。原来是对面作坊的裁缝来取改好的裤子。Otto Bauer听完把话咽回去，第二天洗衣房里没人再提。
  _effects: reputation 0.04000000000000001; relation acquaintance with person-materialized-world-vienna-1912-104; relation acquaintance with person-materialized-world-vienna-1912-80_

- **1955.12** `vienna-market-household.friday-fish/friday-fish.buy` tags: home, market, food, social
  鱼摊快收了，Mitzi挑了一条最小的鳟鱼，摊主顺手抓了把欧芹丢进纸里。黄油在锅里化开，鱼皮卷起来，楼道里都是味。Helene Bauer 4敲门时，Mitzi从鱼尾切下一小块递过去。
  _effects: cash -6 (买鳟鱼和黄油); food; mood 0.07999999999999996; relation acquaintance with person-materialized-world-vienna-1912-170; relation acquaintance with person-materialized-world-vienna-1912-170_

- **1956.01** `vienna-family-divorce/partner-moves-to-shared-housing` tags: family, marriage, divorce, housing, lifecycle, separation, household
  Anna Weiss 2把一只箱子和工票搬去合租房，带走一半锅碗。Mitzi留在Leopoldstädter Zinshaus, gemeinsamer Gang，把空出来的床租给一个学徒，用租金补房租；搬家花掉四克朗，Mitzi在户籍上成了分居的人，夜里听见隔壁床板响，总要愣一下。
  _effects: relation_end partner with person-materialized-world-vienna-1912-156; household; cash -4 (moving and separate goods); mood -0.06000000000000005; role_

- **1956.01** `state_tick:wish-knowledge/knowledge-pressure/press-on` tags: wish-knowledge, wish, wish:knowledge, knowledge, education, curiosity, state, state_tick
  Mitzi又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.020000000000000018_

- **1956.01** `kernel-crisis.task-rescue-neighbor::ctx-vienna-postwar-1945::milieu-tenement/rescue-pulls-neighbor-out` tags: task, rescue, fire, neighbor, betrayal, vienna, urban, postwar
  烟从阁楼窗口往外翻，Mitzi用湿毛巾捂住口鼻，摸到楼梯口。Emil Lechner瘫在门边，鞋底已经烧软；Mitzi把人拖到院子里，自己的手掌粘掉一层皮。消防队来后，把烧黑的楼梯封了，谁也不能再上去。邻居的鞋底在门槛上留下两块黑印。
  _effects: condition; relation acquaintance with person:evt:world-vienna-1912:000849:child; role; cash -2 (bandages, ointment and a new shirt); knowledge “阁楼起火时烟比火先到，湿毛巾只能顶一会儿；把人拖出来以后手掌会粘掉一层皮。”_

- **1956.01** `state_reaction:wish-knowledge/knowledge-humiliation` tags: wish-knowledge, wish, wish:knowledge, knowledge, education, curiosity, state, state_reaction
  Mitzi把那句轻视记了很久。它没有变成一个决定，但也没有消失。
  _effects: mood -0.040000000000000036_
  _causes: evt:world-vienna-1912:017332_

- **1956.01** `mb17-border.permit-window::ctx-vienna-postwar-1945::milieu-tenement/turned-back` tags: migration, border, papers, permit, station, official, belonging, vienna
  Helene Bauer 2把材料推回来，说出生纸缺了教区印章。Mitzi解释自己是从乡下赶来的，对方只指了指墙上的告示；排在后头的Josef Huber递来半块面包，两个人坐在候车室里等下一班回去的车，谁也没有先说话。
  _effects: cash -2 (the return ticket and a wasted day); relation acquaintance with person-materialized-world-vienna-1912-122; flag +mb17_turned_back_at_border; knowledge “边境窗口只承认带教区印章的出生证明。”_

- **1956.04** `vienna-parish-aid.funeral-society/funeral-society.quit` tags: faith, parish, mutual_aid, poverty, family
  Mitzi说互助会先退了，这笔钱要留给煤和面包。Anna Winter没争辩，在蓝皮本上把名字划了一道，问清楚是不是全家都退，然后把划掉的那行折进本子夹缝。她说以后想再进，要重新排三个月。门关上，Mitzi听见铅笔在楼梯上轻轻敲了两下栏杆。
  _effects: cash 0.4 (省下本周会费留作煤钱); flag +funeral_society_left_

- **1956.09** `vienna-women-housework.wash-day/wash-day.rush` tags: gender, housework, home, labour, family
  木盆边的水渍映着天光，Mitzi跪在石阶上揉搓床单，肘弯发酸。晾绳上的湿布滴答作响，Rosa Huber探身把自家被单也挂上去，两人没多说话。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-35_

- **1956.12** `r1-hc.funeral::ctx-vienna-postwar-1945::milieu-tenement/funeral-debt` tags: death, funeral, grief, debt, institution, vienna, urban, postwar
  葬礼后第三天，棺材铺的Anna Weiss 3拿着账单上门，说赊的账该结了。Mitzi把死者的怀表递过去，Anna Weiss 3看了看，说不够，又把桌上那对烛台拿走；烛台上还留着昨天烧剩的半截白蜡。
  _effects: cash -22 (棺材铺的尺寸量错了); mood -0.05999999999999994; condition; flag +funeral_debt; role; relation rival with person-materialized-world-vienna-1912-164; knowledge “the coffin maker takes household goods against the funeral b”; relation acquaintance with person-materialized-world-vienna-1912-164_

- **1957.01** `r13-fam.apologize::ctx-vienna-postwar-1945::milieu-tenement/forgiven` tags: task, social, apology, reputation, conflict, vienna, urban, postwar
  Mitzi在院子的水龙头边等到Otto Bauer，把那天酒桌上的话重复了一遍，没有找补。Otto Bauer拧上水龙头，说那句话已经传到第三个院子了。Mitzi问要怎样才能收回，Otto Bauer说收不回，但可以当着传话的人再说一遍是胡说的。
  _effects: reputation 0.04000000000000001; flag +apology_accepted; role; relation friend with person-materialized-world-vienna-1912-104; knowledge “the insult has already reached three courtyards”_
## Josef

Born 1912.01, alive at 1957.
Education: secondary 2; occupation: 货场临时装卸工 @ org-wien-magistrat; roles: infant, child, technical_school_graduate, office:档案助理, keeper_of_family_secret, charity_visitor, reconciled_relative, office:助理文书, refugee, complaining_tenant, tenant_organizer, tuberculosis_patient, displaced_person, shelter_resident, medicine_seeker.

### State snapshot
- wish-craft [person] (active) parameters={"intensity":0.55,"fixation":0.5,"irony":0.3} links={} ticks=9
- yf18-first-awakening [person] (ended 1928.1: duration expired) parameters={"intensity":74,"nerve":36,"talk":9,"reciprocated":true,"secret":true} links={"beloved":"Klara"} ticks=3
- apprenticeship-contract [person] (ended 1928.1: the master ended the contract) parameters={"progress":3,"failures":2,"trade":"木工","paid":false} links={} ticks=2
- failed-apprentice [person] (ended 1933.1: duration expired) parameters={} links={} ticks=1
- p22-wild-fortune [person] (ended 1933.1: duration expired) parameters={"height":64,"absurdity":68,"witnesses":75,"fragility":57} links={} ticks=2
- p22-scandal-engine [person] (ended 1932.1: replaced_by:p22-scandal-engine) parameters={"heat":42,"reach":64,"leverage":53,"shame":42} links={} ticks=1
- p22-scandal-engine [person] (ended 1935.1: duration expired) parameters={"heat":79,"reach":77,"leverage":42,"shame":68} links={} ticks=2
- public-scandal [person] (ended 1933.1: 公开嘲笑自己的丑闻，丑闻失去了咬人的力气) parameters={} links={} ticks=0
- bc18-ridiculous-fame [person] (ended 1935.1: duration expired) parameters={"notoriety":51,"legitimacy":2,"absurdity":80,"invitations":0,"boredom":18,"officialStory":"在义演里演自己的丑闻"} links={} ticks=2
- hs18-street-witness [person] (ended 1945.1: duration expired) parameters={"certainty":68,"danger":35,"retellings":0,"claim":"我用两条烟换回了邻居的钢琴，琴凳还在他们手里。","quiet":false} links={} ticks=5
- public-scandal [person] (active) parameters={} links={} ticks=0

### 178 subject events

- **1912.07** `p22-comic-name-register::ctx-vienna-1912::milieu-tenement/the-name-is-corrected` tags: infancy, family, bureaucracy, name, official, comic, tender, drama
  Josef Bauer当场发现，要求改回来。登记员叹了口气，收了三克朗，把“嚏”划掉，在旁边写上正确的字，然后把笔搁下；Josef全程睡着，什么也没损失，只是那张纸被折成了四折。
  _effects: cash -3 (fee to correct the register); mood 0.01999999999999999; flag +name_corrected_

- **1913.01** `vienna-life-infant-first-smile/smile-at-the-lamp` tags: infancy, family, first, warm
  Josef Bauer把Josef抱到窗边，煤汽灯罩上有一圈晃动的光。孩子盯着看了很久，忽然笑出声，口水滴在Josef Bauer的袖口上。屋里的人都停了一下，像是听见了什么了不起的消息。
  _effects: mood 0.04000000000000001; health 0.010000000000000009 (a good day)_

- **1914.01** `vienna-life-birth-letter-from-the-dead/the-letter-is-real` tags: infancy, family, secret, letter, drama
  邮差把一封边角磨白的信塞进门缝，收信人是一个已经死了三年的名字。Josef Bauer把Josef放在膝上，拆开信，里面只有一句：“孩子像不像他？”Emil Weiss在门口探头，问是不是寄错了；Josef Bauer把信折回去，说“没有寄错”。
  _effects: flag +letter_from_dead_relative; knowledge “一封写给死去亲人的信问：孩子像不像他。”; mood -0.03999999999999998_

- **1916.01** `vienna-life-child-first-friend/stolen-marble` tags: childhood, friendship, family, comic
  Klara把Josef的玻璃弹珠藏进鞋里，被当场看见。Klara说只是“替你拿着”，Josef没有揭穿，也没有再拿出第二颗。两个人蹲在墙根，把一只蚂蚁看了很久，谁也没有先回家。
  _effects: relation friend with person-phase15-Klara-world-vienna-1912; skill; mood -0.01_

- **1916.11** `p9-childhood-household.half-bed/chalk-line` tags: childhood, family, household, home, siblings, illness, neighbors, injury
  粉笔是Josef在讲台底下捡的，短得只剩指甲盖长。Josef趴在床板上，从这头划到那头，线歪了一点，又用唾沫擦掉重划。夜里Emil的膝盖越过线，Josef用胳膊肘顶回去，两个人在黑暗里推来推去，被子滑到地上。
  _effects: health -0.030000000000000027 (夜里推搡没睡踏实); relation kin with person-phase15-Emil-world-vienna-1912_

- **1918.01** `p9-gap-childhood-chores.market-line/line-sold-out-potatoes` tags: childhood, household, chores, school, task, daily, market, food
  “卖完了。”三个字从窗口里传出来，Josef后面的队伍立刻散了一半。Josef没走，趴在窗台上看伙计扫面屑，直到人家挥手赶人。旁边摊子的土豆带着泥，Josef用围裙兜住，一枚一枚数铜板，回家报账时连找零都说清了。
  _effects: food; mood -0.03; skill; relation acquaintance with person-materialized-world-vienna-1912-23_

- **1919.01** `p9-gap-childhood-chores.laundry-help/laundry-dragged-docked-pay` tags: childhood, household, chores, school, task, daily, laundry, work
  “你看看这角。”Luise Kral把床单拎起来，煤渣簌簌往下掉。Josef伸手去拍，反而把灰按进布纹里。Luise Kral从工钱里数回两枚，只留一赫勒在Josef手心，让重洗那角。晚饭前Josef一直蹲在井台边，换了两盆水，指甲缝里全是黑泥。
  _effects: cash 0.01 (被扣后只剩一赫勒); mood -0.049999999999999996; relation acquaintance with person-luise-kral; relation acquaintance with person-materialized-world-vienna-1912-19_

- **1919.04** `vienna-childhood-street.cigarette-card/card-gift` tags: childhood, street, social, home
  烟草店的门铃响一次，Josef就往柜台边挪一步。Klara终于从柜台底下抽出一张风景卡，用手掌抹了抹，还是皱的。“拿去吧。”Klara说完就去招呼别的客人。Josef把卡举到鼻子前闻，一股烟草味，回家路上把多出来的一张卡分给Klara看。
  _effects: mood 0.06; reputation 0.02; relation friend with person-phase15-Klara-world-vienna-1912_

- **1920.01** `p9-gap-childhood-chores.market-line/line-half-flour` tags: childhood, household, chores, school, task, daily, market, food
  队伍从面包房门口拐进巷子，Josef把布袋夹在腋下，学着前面人的样子，用胳膊肘顶住后面人的篮子。窗口的伙计舀面粉时，Josef踮脚看着秤，直到半袋面倒进袋口。挤出人群时鞋跟被踩掉，Josef单脚跳了两步，在泥里摸回鞋，索性赤脚走回家。
  _effects: food; skill; relation acquaintance with person-materialized-world-vienna-1912-13_

- **1921.01** `p9-gap-childhood-chores.laundry-help/laundry-dragged-docked-pay` tags: childhood, household, chores, school, task, daily, laundry, work
  床单太长，Josef拖着一角往绳子走，布边扫过煤渣，立刻黑了一道。Maria Kral弯腰看了看，脸沉下来，说这角得重洗，工钱扣一半。Josef接过一赫勒，蹲在盆边用清水搓那一道灰，搓到指节发红，水面上还浮着煤末。
  _effects: cash 0.01 (被扣后只剩一赫勒); mood -0.05; relation acquaintance with person-maria-kral; relation acquaintance with person-materialized-world-vienna-1912-24_

- **1922.01** `p9-gap-childhood-chores.market-line/line-both-families` tags: childhood, household, chores, school, task, daily, market, food
  Maria Kral把Josef拽到队伍前头，往自己身前塞，说“孩子占不了多大地儿”。窗口一次递出两包面包，Josef把邻居那包夹在胳肢窝，自己这包抱在胸前。到Leopoldstädter Zinshaus, gemeinsamer Gang门口，Josef蹲下把两包并排，按Maria Kral说的份量分开，连找零的铜板也分成两小堆。
  _effects: food; relation acquaintance with person-maria-kral; skill; relation acquaintance with person-materialized-world-vienna-1912-39_

- **1922.01** `vienna-childhood-street.cigarette-card/card-stolen` tags: childhood, street, social, home
  Josef正低头看卡上的皇帝胡子，一个穿背带裤的男孩从侧面撞过来。卡飞出去，落在马车辙里。Josef扑过去捡，手掌被碎石划开一道口子。Hedwig追到巷子尽头，只抓下一块袖布。回来时Josef还蹲在地上，把沾泥的卡往袖子上擦。
  _effects: mood -0.08; relation friend with person-phase15-Hedwig-world-vienna-1912; condition_

- **1923.01** `p9-gap-childhood-chores.laundry-help/laundry-bread-with-friend` tags: childhood, household, chores, school, task, daily, laundry, work
  Anton Bauer家的孩子站在绳子另一头，Josef递夹子时故意慢半拍，两个人把床单拉得没有一道褶。收工后Anton Bauer端出半包隔夜面包，掰开时掉了一桌屑。Josef把分到的那块用围裙兜住，回家路上闻着麦味，硬是没咬。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-6; skill; relation acquaintance with person-materialized-world-vienna-1912-6_

- **1924.01** `state_tick:wish-craft/craft-pressure/put-away` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_tick
  Josef暂时把那件事收进抽屉；日子还有别的东西要应付。
  _effects: mood -0.01999999999999999_

- **1925.01** `r13-edu.boarding-school::ctx-vienna-reform-1930::milieu-tenement/admitted-to-dormitory` tags: education, boarding_school, residence, family, scholarship, reform, medical, schooling
  Josef把铁皮箱绑在自行车后座，骑了三十里到寄宿学校。舍监检查行李，把家里的腌菜罐没收，说会招老鼠。Josef在熄灯后偷偷把罐子从垃圾堆捡回来，藏在床底，第一顿饭就着腌菜吃完了两碗粥。第一个星期Josef把腌菜分给同屋，换回三张邮票和一支不漏水的钢笔。
  _effects: flag +boarding_school_admitted; education secondary_

- **1925.02** `yf18-firstlook.tram-glove::ctx-vienna-reform-1930::milieu-tenement/keep-it-in-the-satchel` tags: first_love, love, tram, glove, youth, courtship, reform, medical
  Josef把手套塞进书包最里层，回家后放在枕头下面。第二天上学，Josef每隔一会儿就摸一下书包带，像在确认一件不能给家里看见的东西；手套上还留着电车木座的气味。
  _effects: state_add yf18-first-awakening state:world-vienna-1912:150; flag +yf18_kept_glove; mood 0.01999999999999999; flag +yf18_first_awakening_active_

- **1926.01** `vienna-life-apprenticeship/factory-hand` tags: adolescence, work, apprenticeship, employment
  Buchdruckerei Winter & Söhne把Josef分到装订间，每天站十个小时，工钱按件算。第一周结束，Josef的指关节肿了，工头说习惯就好。
  _effects: employment Buchbinderhilfe @ org-winter-print; condition_

- **1926.01** `state_tick:yf18-first-awakening/half-year-of-glances/answered-glance` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Josef在教堂门口或学校走廊里又遇见Klara。这一次对方先点了头，Josef准备好的整段话全忘了，只把手里的书换到另一只手上；回家后Josef才发现，自己把书拿倒了。
  _effects: state_parameter yf18-first-awakening.intensity 60 -> 65; state_parameter yf18-first-awakening.nerve 5 -> 13; state_parameter yf18-first-awakening.reciprocated false -> true; relation friend with person-phase15-Klara-world-vienna-1912; mood 0.03_

- **1926.01** `r13-edu.exam-eve::ctx-vienna-reform-1930::milieu-tenement/passed-entrance-exam` tags: education, exam, study, poverty, adolescence, reform, medical, schooling
  Josef把煤油灯芯剪短，省下油熬到后半夜。代数题做错三遍，Josef就用冷水拍脸，再把公式抄到手腕内侧。考试那天，监考把袖口翻了一遍，Josef还是把最后一道题解完了。放榜那天，Josef在人群后面站了很久，才敢往前挤。
  _effects: mood 0.06; flag +passed_entrance_exam; skill_

- **1926.01** `state_reaction:yf18-first-awakening/exam-week-distraction` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  考试周里，Josef把课本摊在桌上，眼睛却一直看着窗外那条电车线。笔记的页边多了几个没有写完的名字，Josef用橡皮擦掉，纸面起了毛。
  _effects: state_parameter yf18-first-awakening.intensity 65 -> 62; state_parameter yf18-first-awakening.talk 0 -> 2_
  _causes: evt:world-vienna-1912:002852_

- **1926.06** `r3-teen.first-friend-group::ctx-vienna-reform-1930::milieu-tenement/split` tags: friendship, roof, belonging, betrayal, class, reform, medical, schooling
  团里有人偷了市场的香肠，被抓住后供出了所有人。Lena把Josef拉到楼梯拐角，让他把责任推给最小的那个，说这样大家都能脱身。Josef没答应，只把口袋里的香肠纸揉成一团。第二天，屋顶上的折叠椅少了一把，Lena见了他也不再吹那两声口哨。
  _effects: mood -0.1; flag +friend_group_split; relation rival with person-phase15-Lena-world-vienna-1912_

- **1926.11** `r15-work.master-takes-on::ctx-vienna-reform-1930::milieu-tenement/unpaid-trial` tags: work, craft, apprentice, trade, poverty, reform, medical, schooling
  Rosa Winter先说试三个月，不给工钱，只管一顿午饭。家里同意了，因为多一张嘴比多一双手更难。Josef每天最早到，最晚走，三个月后师傅才把契约拿出来。
  _effects: food; mood -0.04; state_add apprenticeship-contract state:world-vienna-1912:183; relation acquaintance with person-materialized-world-vienna-1912-57; education apprenticeship; role_

- **1927.01** `yf18-dare.bridge-rail::ctx-vienna-reform-1930::milieu-tenement/walk-the-rail` tags: dare, bridge, river, friendship, risk, reform, medical, schooling
  多瑙河上的铁桥在夜里只剩两排灯。Josef翻过栏杆，鞋底踩上结霜的钢梁，走了七步；Lena在桥头喊了一声，风把声音吹散。Josef翻回来时，Klara把一支烟塞进Josef嘴里，手抖得点不着火。
  _effects: state_parameter yf18-first-awakening.intensity 62 -> 72; state_parameter yf18-first-awakening.nerve 13 -> 28; state_parameter yf18-first-awakening.talk 2 -> 7; reputation 0.02; flag +yf18_walked_bridge_rail; mood 0.05_

- **1927.01** `state_tick:yf18-first-awakening/half-year-of-glances/answered-glance` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Josef在教堂门口或学校走廊里又遇见Klara。这一次对方先点了头，Josef准备好的整段话全忘了，只把手里的书换到另一只手上；回家后Josef才发现，自己把书拿倒了。
  _effects: state_parameter yf18-first-awakening.intensity 72 -> 77; state_parameter yf18-first-awakening.nerve 28 -> 36; state_parameter yf18-first-awakening.reciprocated true -> true; relation friend with person-phase15-Klara-world-vienna-1912; mood 0.03_

- **1927.01** `state_tick:apprenticeship-contract/workshop-year/mistake` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Josef废掉了一块料，师傅扣了工钱。晚饭时谁也没提这件事。
  _effects: state_parameter apprenticeship-contract.failures 0 -> 1; cash -1 (wasted material); mood -0.04000000000000001_

- **1927.01** `r13-edu.exam-eve::ctx-vienna-reform-1930::milieu-tenement/memorized-wrong-step` tags: education, exam, study, poverty, adolescence, reform, medical, schooling
  Josef把老师讲的例题步骤全背下来，却没弄懂为什么移项。卷子发下来，第一道大题就卡住，Josef在草稿纸上画满小人，交卷前只写出一个答案。回家后Josef把那张卷子折成纸飞机，扔出窗外，又下楼捡了回来。纸飞机摔在煤堆上。
  _effects: mood -0.07999999999999999; skill_

- **1927.01** `state_reaction:yf18-first-awakening/exam-week-distraction` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  考试周里，Josef把课本摊在桌上，眼睛却一直看着窗外那条电车线。笔记的页边多了几个没有写完的名字，Josef用橡皮擦掉，纸面起了毛。
  _effects: state_parameter yf18-first-awakening.intensity 77 -> 74; state_parameter yf18-first-awakening.talk 7 -> 9_
  _causes: evt:world-vienna-1912:003216_

- **1927.06** `yf18-apprentice.press-guard::ctx-vienna-reform-1930::milieu-tenement/refuse-the-machine` tags: apprenticeship, work, danger, machine, injury, refusal, reform, medical
  教堂年历的订单催得紧，Buchdruckerei Winter & Söhne把压印机的护板卸了，说这样进纸快一半。Josef看着那块铁板，说手会进去；Buchdruckerei Winter & Söhne把工钱袋往桌上一扔，问Josef是不是不想出师了。Josef没有碰机器，那天下午的活由Luise Kral接手。
  _effects: relation employer with person-ferdinand-winter; state_parameter apprenticeship-contract.progress 8 -> 3; state_parameter apprenticeship-contract.failures 1 -> 2; flag +yf18_refused_unguarded_press; mood 0.01999999999999999_

- **1927.10** `vienna-apprentice-printshop.lead-type-drop/lead-type-drop.repaired` tags: work, apprentice, factory, social
  Rosa Winter把散落的铅字按字母补回字盘，Josef赶在午休前重新排完价目表。Buchdruckerei Winter & Söhne用指甲划过一行，说“排得还直”，没扣钱，只让把过道扫干净。
  _effects: skill; relation colleague with person-materialized-world-vienna-1912-57_

- **1928.01** `vienna-life-young-worker/hand-caught` tags: adolescence, labour, union
  Josef在压纸时右手被滚轴卷进去，工头拉下电闸，血滴在铅字盘上。Buchdruckerei Winter & Söhne让人把Josef送到医院，医药费先由厂里垫付。
  _effects: condition; cash -4 (hospital transport)_

- **1928.01** `state_reaction:wish-craft/craft-humiliation` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_reaction
  Josef把那句轻视记了很久。它没有变成一个决定，但也没有消失。
  _effects: mood -0.1_
  _causes: evt:world-vienna-1912:003441_

- **1928.01** `state_expire:yf18-first-awakening` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Josef的「第一次心动」到期；相关安排结束。
  _effects: state_remove yf18-first-awakening state:world-vienna-1912:150; flag -yf18_first_awakening_active_

- **1928.01** `state_transition:apprenticeship-contract/expelled` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick, failed-apprentice
  Josef从「学徒契约」转入另一段处境：the master ended the contract
  _effects: state_transition apprenticeship-contract -> failed-apprentice; flag +failed_apprenticeship; mood -0.08000000000000002; role_

- **1928.01** `state_tick:wish-craft/craft-pressure/put-away` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_tick
  Josef暂时把那件事收进抽屉；日子还有别的东西要应付。
  _effects: mood -0.020000000000000018_

- **1928.01** `p9-childhood-youth-aspiration.ask-a-mentor/asked-to-come-back-later` tags: adolescence, education, aspiration, school, books, club, exam, task
  Rosa Winter看了看Josef抄的字母表，说大小不一，让他回去用直尺画格子重抄一遍，下个月再来。少年把纸折好，在咖啡馆门口站了一会儿，走回印刷厂时绕到排字房窗外看了很久。
  _effects: mood -0.030000000000000027; skill; flag +mentor_pending_retry; relation acquaintance with person-materialized-world-vienna-1912-57_

- **1929.01** `r13-civ.learn-instrument::ctx-vienna-reform-1930::milieu-tenement/weekly-lessons` tags: culture, music, instrument, learning, craft, reform, medical, schooling
  Maria Moser把一把旧小提琴放在Josef肩上，说先别拉，先听空弦。Josef练到指尖发红，Maria Moser用铅笔在谱上圈出三个音，让下周再来。学费按周付，四克朗一个月。
  _effects: cash -4 (借来的琴弓); flag +took_violin_lessons; skill; relation colleague with person-materialized-world-vienna-1912-15; knowledge “the teacher marks the three notes to practise each week”; relation acquaintance with person-materialized-world-vienna-1912-15_

- **1930.01** `p22-forged-review::ctx-vienna-reform-1930::milieu-tenement/the-review-becomes-a-school` tags: forged_review, opera, fame, fraud, comic, media, art, scandal
  死去的评论家在最贵的报纸上给一部没人看过的歌剧写了四颗星。Josef把剪报贴在排练厅门口，第二天票房排到街角；Mitzi Berg 3问是谁写的，Josef说是一个死人，死人不会否认。三个月后，歌剧院把这部戏列进了秋季剧目。
  _effects: state_add p22-wild-fortune state:world-vienna-1912:278; state_add p22-scandal-engine state:world-vienna-1912:279; cash 5 (a share of the revived opera receipts); reputation 0.04; relation acquaintance with person-materialized-world-vienna-1912-53; flag +forged_review_believed; mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-53; flag +wild_fortune_active; flag +scandal_engine_active_

- **1930.01** `p9-social-daily-culture.cafe-newspaper/p9-social-daily-culture.cafe-newspaper.talk-tram` tags: daily, culture, leisure, cafe, music, walk, task, task:daily
  Josef把报纸推到一边，和Alois Berg聊起电车票价要涨的传闻。两人拿过糖罐当算盘，在桌布上比划通勤开销，两杯咖啡四十赫勒，争论得忘了时间，直到窗外的煤气灯亮起来。Josef起身时发现大衣下摆沾了咖啡渍，晚饭的点早过了，却约好下回还坐这张桌子。
  _effects: cash -0.4 (两杯咖啡的价钱); relation acquaintance with person-materialized-world-vienna-1912-47; mood 0.03999999999999998; relation acquaintance with person-materialized-world-vienna-1912-47_

- **1930.02** `vienna-family-same-sex-male/private-arrangement` tags: family, intimacy, same_sex, persecution, lifecycle, partnership
  Josef和Otto Lechner 2在城边租了一间小屋，对外只说是同事合住。房租四克朗，两人不同时出门，信件用假名，夜里把窗帘拉严；Otto Lechner 2在门后放了一根木棍，Josef把两人的工票分开放，连咳嗽都压着声。
  _effects: relation partner with person-materialized-world-vienna-1912-39; mood 0.03999999999999998; cash -4 (separate room rent)_

- **1930.02** `major-education-night-technical-school/night-school-certificate` tags: education, night_school, work, exhaustion, major
  夜校在第七区的旧校舍里，十二个工人挤在一张长桌前。Rosa Winter用粉笔画出齿轮的剖面，又让大家传看一只烧坏的保险盒。Josef把图纸带回家，在厨房桌上描到半夜。结业考试通过后，Josef拿到一张机械制图的证书，学费一共九克朗。
  _effects: education secondary; skill; cash -9 (evening-school fees); role; flag +night_school_certificate; relation acquaintance with person-materialized-world-vienna-1912-57_

- **1930.02** `vienna-medical-treatment.night-fever/hospital-night` tags: health, medical, family, money
  电车在环城大道上哐当响，Maria Kral攥着Josef的胳膊，怕人从座位上滑下去。急诊厅的煤气灯发黄，长椅上全是咳嗽声，押金窗口的铜盘递出两克朗，换来一张硬纸号牌。
  _effects: cash -2 (医院急诊押金); health 0.08 (急诊观察和冰敷退烧); relation friend with person-maria-kral_

- **1930.06** `vienna-market-household.soup-kitchen/soup-kitchen.keep` tags: home, market, food, social
  扁豆汤的香味从门缝飘出去，Elisabeth Bauer 2敲了门。Josef掀开锅盖又盖上，说只够自家吃。Elisabeth Bauer 2什么也没说就走了。夜里Josef听见隔壁有人用勺子刮碗底。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-14; mood -0.04999999999999999; relation acquaintance with person-materialized-world-vienna-1912-14_

- **1930.07** `vienna-tenement-neighbors.laundry_line_dispute/compromise_split_line` tags: home, social, family, housing
  Josef把洗好的床单搭上院子里的公用晾衣绳，占了整条。Grete Hofer抱着一盆湿衣服下来，说自家孩子明天要穿干净衬衫上学。两人在绳子两头扯了一阵，最后Josef把床单对折，腾出一半，Grete Hofer用木夹子把衬衫一件件排上去。谁也没道歉，但第二天见面都点了头。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-36; mood 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-36_

- **1930.08** `vienna-medical-treatment.work-injury/union-rep` tags: health, medical, family, money
  Rosa Winter把Josef领到工会代表面前，说护罩少了螺丝不是头一回。代表翻开小本记下机器编号，答应陪Josef去医院，费用由工会垫付，但要Buchdruckerei Winter & Söhne在事故单上签字，工头磨蹭半天才落笔。
  _effects: cash -0.3 (工会垫付后自理的零头); health 0.05999999999999999 (及时就医处理伤口); relation friend with person-materialized-world-vienna-1912-57; flag +union_contact_

- **1931.01** `state_tick:p22-wild-fortune/the-story-gets-taller/the-crowd-remembers` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  一年过去，Josef的荒唐故事没有变小，反而多了一个愿意作证的人。债主没有立刻上门，亲戚也还愿意来吃饭；Josef把新添的银器擦了一遍，发现其中一只底下刻着别人的名字。
  _effects: state_parameter p22-wild-fortune.height 60 -> 64; state_parameter p22-wild-fortune.absurdity 65 -> 68; state_parameter p22-wild-fortune.witnesses 70 -> 75; state_parameter p22-wild-fortune.fragility 55 -> 57; mood 0.020000000000000018_

- **1931.01** `state_tick:p22-scandal-engine/the-rumor-learns-new-words/the-story-gets-a-new-witness` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  又过了一年，流言没有熄，却学会了新的说法。Josef在咖啡馆里听见自己的故事被讲成三个版本，每个版本都比上一个多一个证人；没有人来追问，也没有人真正忘记。
  _effects: state_parameter p22-scandal-engine.heat 45 -> 42; state_parameter p22-scandal-engine.reach 60 -> 64; state_parameter p22-scandal-engine.leverage 50 -> 53; state_parameter p22-scandal-engine.shame 40 -> 42; mood 0.010000000000000009_

- **1931.01** `agency:attend_meeting` tags: agency, agency:attend_meeting
  Josef走到Arbeiter-Zeitung im Vorwärts-Haus门口，看见便衣和拥挤的人群，最终没有进去。
  _effects: mood -0.03999999999999998; reputation -0.009999999999999995_

- **1931.11** `vienna-tenement-neighbors.shared_stove_fire/fire_scald_hand` tags: home, social, family, housing
  Josef在合租房走廊的公用灶台上煮土豆，转身取盐时袖子扫翻了铁锅，滚水浇在左手背上。Alois Winter从隔壁冲出来，扯下自己的围裙裹住烫伤处，又跑下楼叫来住在二楼的接生婆。接生婆用蛋清和旧亚麻布包扎，嘱咐三天不能沾水。
  _effects: relation friend with person-materialized-world-vienna-1912-48; relation acquaintance with person-materialized-world-vienna-1912-48_

- **1931.11** `vienna-parish-aid.soup-kitchen/soup-kitchen.help-wash` tags: faith, parish, mutual_aid, poverty, family
  Josef喝完汤没走，留下来帮修女把大锅刷净，又把木碗按大小摞好。厨房后头有半块面包和一碗剩汤，修女说是帮忙人的午饭。Emil Weiss 2在门口等着一起回去，说下回还来，洗锅的活总有人要干。
  _effects: food; skill; mood 0.020000000000000018_

- **1932.01** `vienna-life-work-injury/dismissed-after-accident` tags: adulthood, labour, injury, unemployment
  Buchdruckerei Winter & Söhne在事故后第三天通知Josef不用再来了，说岗位不能一直空着。Josef拿着医院证明去工会，诊断书被工头压在抽屉里；治伤花去六克朗，Josef的手还没好，工作先没了，工牌交回去时手指还缠着纱布。
  _effects: unemployment (dismissed after accident); cash -6 (medical treatment)_

- **1932.01** `p22-forged-review::ctx-vienna-reform-1930::milieu-tenement/the-dead-critic-signs-again` tags: forged_review, opera, fame, fraud, comic, media, art, scandal
  第二篇署名同一个死人的剧评出现在另一家报纸上，笔迹却不一样。Anna Bauer请来笔迹专家，Hermann Weiss在咖啡馆里把两张剪报并排摊开；Josef发现自己的墨水在纸背留下同样的蓝点，而这一次，没有人再笑。他把两张纸叠在一起，蓝点重合得像一枚印章。
  _effects: state_add p22-scandal-engine state:world-vienna-1912:366; state_add public-scandal state:world-vienna-1912:367; reputation -0.05; relation rival with person-materialized-world-vienna-1912-74; flag +forged_review_exposed; mood -0.03999999999999998; relation acquaintance with person-materialized-world-vienna-1912-74; flag -scandal_engine_active; flag +scandal_engine_active_

- **1932.01** `state_reaction:p22-scandal-engine/a-new-scandal-feeds-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Josef的新故事登出来时，旧的那一页也被重新翻到桌面上。Josef发现两件事共用同一个证人，而那个证人上周还来借过盐。
  _effects: state_parameter p22-scandal-engine.heat 70 -> 76; state_parameter p22-scandal-engine.reach 65 -> 69; state_parameter p22-scandal-engine.shame 60 -> 63; state_parameter p22-scandal-engine.leverage 35 -> 37; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:004955_

- **1932.01** `state_tick:wish-craft/craft-pressure/press-on` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_tick
  Josef又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.020000000000000018; flag +wish:craft:pursuing_

- **1932.01** `r13-fam.ask-neighbour-help::ctx-vienna-reform-1930::milieu-tenement/door-closed` tags: task, social, neighbor, help, poverty, reform, medical, schooling
  Anton Bauer把门开了一条缝，说自家也不够烧。Josef提着空筐站了一会儿，听见门后有孩子在哭，便没有再敲。回屋后，他把椅子拆了一条腿，塞进炉子。
  _effects: mood -0.10000000000000003; flag +refused_neighbour_help; relation acquaintance with person-materialized-world-vienna-1912-6_

- **1932.01** `vienna-legacy-worklife.hours-ledger/hours-ledger.read-for-others` tags: legacy, work, family, reform, ordinary_life
  围过来的工友有七八个，有人把耳朵凑到Josef嘴边，怕听漏一个数字。念到“星期六下午停工”时，人群里有人笑了一声，又马上收住。墙上的表被风掀起一角，Josef用拇指按住，继续往下念。
  _effects: skill; relation colleague with person-materialized-world-vienna-1912-69; reputation 0.04000000000000001; relation acquaintance with person-materialized-world-vienna-1912-69_

- **1932.03** `p9-gap-adult-unemployed.pawnshop/pawn-neighbor-tops-up` tags: adulthood, unemployment, casual_labour, poverty, daily, pawn, cash
  伙计重新开票时抬眼看了看两个人。Hermann Berg说表是她家老头子留下的，不能就这么折在柜台上。出门后Josef把表重新戴上，表链贴着腕子，凉得叫人一激灵。
  _effects: cash 3 (邻居垫付的赎表钱); relation acquaintance with person-materialized-world-vienna-1912-51; relation acquaintance with person-materialized-world-vienna-1912-62; relation acquaintance with person-materialized-world-vienna-1912-51_

- **1932.09** `r13-rel.introduction-friend::ctx-vienna-reform-1930::milieu-tenement/two-silent-ends` tags: relationship, introduction, friend, acquaintance, social, reform, medical, schooling
  Lena介绍完就去厨房帮忙，桌上只剩Josef和Josef Hofer。Josef Hofer盯着墙上的圣像，Josef数着桌布上的补丁。十分钟后Lena回来，看见两人各坐一头，笑得有点勉强。
  _effects: mood -0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-20; relation acquaintance with person-materialized-world-vienna-1912-20_

- **1933.01** `vienna-tenement-neighbors.laundry_line_dispute/subject_yields_line` tags: home, social, family, housing
  Josef看Alois Winter盆里那几件小衬衫，把自家床单卷起来抱回屋，说等下午再晾。Alois Winter愣了一下，闷头把衣服挂好，收工回来时在Josef门口放了一小包用旧报纸裹的洗衣碱。Josef打开报纸，碱面里还掺着几粒粗盐。
  _effects: relation friend with person-materialized-world-vienna-1912-48; food_
  _causes: evt:world-vienna-1912:004957_

- **1933.01** `bc18-fame.charity-matinee::ctx-vienna-reform-1930::milieu-tenement/laughed-first` tags: scandal, theatre, charity, public, humiliation, reputation, absurd, reform
  慈善义演把Josef的丑闻编成一出独幕喜剧，海报上写着“本人出演本人”。Otto Lechner 2在后台替Josef别上一朵纸花，说笑第一声的人就赢了。幕布拉开，Josef看见台下坐着那些在咖啡馆议论过自己的人，先笑出了声；笑声传开，丑闻忽然变成一件大家可以一起笑的事。
  _effects: cash 3 (义演的酬劳); state_remove public-scandal state:world-vienna-1912:367; state_add bc18-ridiculous-fame state:world-vienna-1912:410; reputation 0.04000000000000001; relation acquaintance with person-materialized-world-vienna-1912-39; flag +laughed_at_own_scandal_on_stage; mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-41; flag +ridiculously_famous; reputation 0.020000000000000004; mood 0.020000000000000018_

- **1933.01** `state_expire:failed-apprentice` tags: failed-apprentice, craft, work, failure, stigma, state, state_tick, state:failed-apprentice
  Josef的「学徒契约终止」到期；相关安排结束。
  _effects: state_remove failed-apprentice state:world-vienna-1912:223_

- **1933.01** `state_expire:p22-wild-fortune` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  Josef的「荒唐横财」到期；相关安排结束。
  _effects: state_remove p22-wild-fortune state:world-vienna-1912:278; flag -wild_fortune_active_

- **1933.01** `state_tick:p22-scandal-engine/the-rumor-learns-new-words/the-story-gets-a-new-witness` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  又过了一年，流言没有熄，却学会了新的说法。Josef在咖啡馆里听见自己的故事被讲成三个版本，每个版本都比上一个多一个证人；没有人来追问，也没有人真正忘记。
  _effects: state_parameter p22-scandal-engine.heat 76 -> 73; state_parameter p22-scandal-engine.reach 69 -> 73; state_parameter p22-scandal-engine.leverage 37 -> 40; state_parameter p22-scandal-engine.shame 63 -> 65; mood 0.010000000000000009_

- **1933.01** `r13-fam.keep-family-secret::ctx-vienna-reform-1930::milieu-tenement/secret-kept` tags: task, family, secret, reputation, sibling, fear, reform, medical
  Luise Kral在楼道里拦住Josef，问家里那张盖红章的纸是不是出了事。Josef说只是旧房租收据，回家却把纸从柜底翻出来，和Anna Bauer一起塞进米缸夹层。两人把米重新铺平，Anna Bauer的手一直在抖；Josef说这事到此为止，谁也别再提。
  _effects: condition; flag +hid_family_paper_in_rice_bin; role; knowledge “the paper is hidden between the rice bin’s layers”_

- **1933.01** `state_reaction:p22-scandal-engine/a-new-scandal-feeds-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Josef的新故事登出来时，旧的那一页也被重新翻到桌面上。Josef发现两件事共用同一个证人，而那个证人上周还来借过盐。
  _effects: state_parameter p22-scandal-engine.heat 73 -> 79; state_parameter p22-scandal-engine.reach 73 -> 77; state_parameter p22-scandal-engine.shame 65 -> 68; state_parameter p22-scandal-engine.leverage 40 -> 42; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:005614_

- **1933.04** `p9-gap-adult-ordinary-day.wash-day/wash-day.shirt-in-mud` tags: adulthood, daily, leisure, neighborhood, ordinary, laundry, neighbor, household
  风是从巷口那栋新楼的方向刮过来的，绳子上的被单都鼓成了帆。衬衫落地时，几个搓衣的女人都停了手看。Josef弯腰去捡，听见身后有人说风大就早点收，别等出了事再怪人。
  _effects: relation acquaintance with person:evt:world-vienna-1912:000561:child; mood -0.020000000000000018_

- **1933.06** `vienna-historical-social-movement.relief-network/open-the-books-again` tags: history, historical_process, social_movement, organization, politics
  墙面粗灰，Josef用图钉钉上分发清单，纸边被穿堂风吹得直抖。老人说自家也在等煤，Anna Bauer把围巾往肩上紧了紧，没接话。有人围上来看，有人转身回屋。
  _effects: reputation 0.029999999999999985; skill_

- **1933.06** `vienna-tenement-neighbors.shared_stove_fire/fire_no_damage` tags: home, social, family, housing
  Josef刚把锅端下灶，火苗就蹿了起来，Mitzi一脚踩灭地上的油布，顺手抄起沙箱里的沙子盖住灶口。两人都没受伤，但Mitzi的鞋底烧穿一个洞，那是唯一一双出门的鞋。
  _effects: relation friend with person-phase15-Mitzi-world-vienna-1912; mood -0.050000000000000044_

- **1934.01** `bc18-fame.lecture-tour::ctx-vienna-authoritarian-1934::milieu-tenement/waterworks-question` tags: fame, lecture, travel, absurd, public, invention, reputation, vienna
  Gustav Berg请Josef顺便看看城里的水厂。Josef把一只标着“关闭”的阀门拧向另一边，半小时后，半条街的菜窖进了水。没有人受伤，镇公所赔了菜农六克朗，又给Josef两克朗车马费，请他尽快搭下一班车离开。Berta Winter在站台上说，这也算一种巡回演讲。
  _effects: cash 2 (镇公所给的车马费); state_parameter bc18-ridiculous-fame.legitimacy 20 -> 14; state_parameter bc18-ridiculous-fame.notoriety 40 -> 45; reputation -0.020000000000000004; condition; flag +flooded_a_cellar_on_tour; mood -0.020000000000000018_

- **1934.01** `state_reaction:bc18-ridiculous-fame/reprinted-wrong` tags: bc18-ridiculous-fame, fame, reputation, mistaken_identity, promotion, media, absurd, public
  报纸的周末副刊又把Josef的旧照片翻出来，配上一个更整齐的故事：发明、失败、谦逊的晚年。Josef写信去更正，编辑回了一张便条，说读者喜欢现在这个版本。
  _effects: state_parameter bc18-ridiculous-fame.notoriety 45 -> 51; state_parameter bc18-ridiculous-fame.absurdity 75 -> 80; state_parameter bc18-ridiculous-fame.legitimacy 14 -> 10; flag +story_reprinted_wrong; mood -0.010000000000000009_
  _causes: evt:world-vienna-1912:005816_

- **1934.01** `state_tick:bc18-ridiculous-fame/ridiculous-fame-year/the-audience-gets-bored` tags: bc18-ridiculous-fame, fame, reputation, mistaken_identity, promotion, media, absurd, public
  观众开始厌倦同一个故事。园艺会请了更年轻的发明家，女子学校把Josef的名字从海报上撤下；Josef在咖啡馆听见有人说“那个人还在讲火柴”。同一个月，一张报纸把旧照片配上新标题，问Josef是否已经“过气”。纠正的冲动又回来，但没有人再提问。
  _effects: state_parameter bc18-ridiculous-fame.legitimacy 10 -> 2; state_parameter bc18-ridiculous-fame.boredom 6 -> 18; state_parameter bc18-ridiculous-fame.invitations 1 -> 0; reputation -0.020000000000000004; mood -0.030000000000000027_

- **1934.01** `r13-civ.join-charity::ctx-vienna-authoritarian-1934::milieu-tenement/accepted-as-visitor` tags: social, charity, membership, poverty, respectability, vienna, urban, crisis
  Gustav Berg把登记簿摊在门房的小桌上，让Josef写下姓名和住址。Josef写完后，Gustav Berg在名字旁边画了一个小十字，说下周去给孤老送煤。本子上前面几行，墨迹已经褪成了褐色。
  _effects: cash -1 (慈善会登记簿上的空行); reputation 0.039999999999999994; flag +joined_charity_visiting_round; role; relation acquaintance with person-gustav-berg_

- **1934.01** `vienna-parish-aid.sick-call/sick-call.door-only` tags: faith, parish, mutual_aid, poverty, family
  Josef把药包和半块肥皂交给开门的孩子，嘱咐用水冲开、一天两次，就下了楼。楼梯间里孩子一直站在门口看着，手里攥着纸包，没关门。Josef走到二层又折回去，帮他把门带上，说自己家里也等着火。
  _effects: health 0.01 (没有久留，避开了病人的屋子); relation acquaintance with person-materialized-world-vienna-1912-24; mood -0.030000000000000027_

- **1934.04** `p9-social-family-conflict-care.sibling-medicine-bill/split-per-head` tags: family, care, siblings, inheritance, housing, money
  Josef把旧练习本翻到空白一页，写下母亲、自己和Anna Bauer的名字。十四克朗的药费单，Josef和Anna Bauer各摊五克朗，余下四克朗从母亲的养老金里扣；Josef把五克朗硬币一枚枚摞在桌沿，Anna Bauer盯着那一栏看了半天，也从围裙口袋里摸出钱来。
  _effects: cash -5 (分摊母亲药费中自己的一份（其中5克朗记入债务）)_

- **1934.11** `vienna-legacy-worklife.sick-fund/sick-fund.keep-quiet` tags: legacy, work, family, reform, ordinary_life, injury
  止咳药水是褐色的，瓶口塞着软木塞，摇一摇会起沫。Josef看着工友把表折成小块，折了三折才塞进帽檐。墙上的规章还贴在那里，纸角被风掀起，没人去按。
  _effects: mood -0.050000000000000044; health -0.04 (没有正规病假，只能靠药水撑着); relation colleague with person-materialized-world-vienna-1912-62; relation acquaintance with person-materialized-world-vienna-1912-72_

- **1935.01** `vienna-tenement-neighbors.laundry_line_dispute/neighbor_yanks_clothes` tags: home, social, family, housing
  Mitzi嫌Josef的床单滴水滴到Mitzi家衬衫上，一把扯下床单扔在院子的石板上。Josef下楼捡起来时，床单角沾了泥，重洗又要费肥皂。两人在院子当中对喊，楼上有人推开窗看热闹。Josef把床单重新搭上绳子时，故意把水拧在Mitzi那侧。
  _effects: relation rival with person-phase15-Mitzi-world-vienna-1912; cash -0.15 (重洗床单的肥皂钱（其中0.15克朗记入债务）)_
  _causes: evt:world-vienna-1912:005820_

- **1935.01** `vienna-family-divorce/reconcile-for-now` tags: family, marriage, divorce, housing, lifecycle, partnership
  Josef和Otto Lechner 2在楼道里吵到半夜，最后因为下个月的房租又坐回同一张桌。谁都没有提和好，只把账本重新摊开；Otto Lechner 2把煤钱推过来，Josef接过去数了两遍，手指碰到一起又分开，屋里的灯亮到很晚。
  _effects: relation partner with person-materialized-world-vienna-1912-39; mood -0.030000000000000027_

- **1935.01** `state_expire:p22-scandal-engine` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Josef的「流言发动机」到期；相关安排结束。
  _effects: state_remove p22-scandal-engine state:world-vienna-1912:366; flag -scandal_engine_active_

- **1935.01** `state_expire:bc18-ridiculous-fame` tags: bc18-ridiculous-fame, fame, reputation, mistaken_identity, promotion, media, absurd, public
  Josef的「荒唐的名声」到期；相关安排结束。
  _effects: state_remove bc18-ridiculous-fame state:world-vienna-1912:410; flag -ridiculously_famous_

- **1935.01** `kernel-social.reconciliation::ctx-vienna-authoritarian-1934::milieu-tenement/reconciliation.shared-pot` tags: task, task:social, social, reconciliation, family, apology, conflict, vienna
  Josef端着一锅炖肉去敲Klara的门，说肉炖多了，一个人吃不完。Klara让他进屋，把两只盘子摆在桌上；两人先谈煤价，再谈母亲的坟，最后才提那笔说不清的钱。Grete Moser 2在楼下等消息，等到灯灭才走。
  _effects: relation kin with person-phase15-Klara-world-vienna-1912; cash -2 (meat and coal for the reconciliation supper（其中2克朗记入债务）); role; flag +family_reconciled; knowledge “两人把煤价、母亲的坟和那笔钱都谈到了。”; relation acquaintance with person-materialized-world-vienna-1912-3_

- **1935.01** `vienna-medical-treatment.toothache/dentist-pull` tags: health, medical, family, money
  诊室在二楼，楼梯间飘着石炭酸味。医生把钳子举到灯下看了看，叫Josef攥紧扶手。Rosa Lechner站在门边数墙上的价目表：拔牙两克朗五十赫勒，药棉五十赫勒，连消炎水另算。
  _effects: cash -3 (牙医拔牙费用); health 0.05999999999999999 (拔除病牙解除疼痛); mood -0.030000000000000027_

- **1935.02** `p9-gap-adult-ordinary-day.wash-day/wash-day.listen-gossip` tags: adulthood, daily, leisure, neighborhood, ordinary, laundry, neighbor, household
  肥皂沫从Alois Berg的指缝里冒出来，她说话时手里不停，衣领在搓板上蹭得吱吱响。Josef把湿被单搭上绳子，被单沉甸甸地坠下来，她踮脚才够到第二根竹竿。
  _effects: mood 0.010000000000000009; relation acquaintance with person-materialized-world-vienna-1912-47_

- **1935.07** `vienna-legacy-worklife.hours-ledger/hours-ledger.sign` tags: legacy, work, family, reform, ordinary_life
  印泥是赭红色的，像干了的面包瓤。Josef按完手印，工头把表举到窗边吹干，阳光里那张纸透出指印的轮廓。楼下第十区的街面传来运煤车的铁皮声，星期六下午突然显得很宽。
  _effects: cash -1 (星期六下午减少的计件工钱（其中1克朗记入债务）); mood 0.050000000000000044; flag +accepted_hours_reform; relation acquaintance with person-materialized-world-vienna-1912-87_

- **1935.11** `vienna-market-debt.rent-arrears/rent-negotiate-installments` tags: market, debt, money, home, shop
  你没去借钱，直接下楼找房东，说月底前先付两克朗，剩下两克朗分两个星期补齐。房东叼着雪茄，拿铅笔在你的纸条背面写了个日期，说再拖一天就换锁。邻居在楼道口听见了，冲你摇了摇头，但没说什么。
  _effects: cash -2 (按分期付掉的第一笔欠租（其中1.8克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-14; flag +rent_installment_plan_

- **1936.01** `vienna-life-injury-recovery/clinic-treatment` tags: health, work, family
  Josef在受伤后的第三天去了诊所。医生清洗伤口、换药，收下诊费，嘱咐不要急着回机器旁。Josef把药方折好，回家路上买了纱布。
  _effects: health 0.05 (wound treatment); cash -8 (clinic and bandages（其中8克朗记入债务）); condition_
  _causes: evt:world-vienna-1912:006260_

- **1936.01** `state_tick:wish-craft/craft-pressure/press-on` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_tick
  Josef又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.020000000000000018_

- **1936.01** `agency:attend_meeting` tags: agency, agency:attend_meeting
  Josef去了Leopoldstädter Zinshaus, gemeinsamer Gang，坐在后排听完了关于圣马克斯殡葬合作社在Leopoldstädter Zinshaus, gemeinsame的争论；散会时带走一张油印提纲。
  _effects: historical development:initiative-mortuary:person-rosa-lechner-evt:world-vienna-1912:002427-1930 as participant; knowledge “我参加了圣马克斯殡葬合作社在Leopoldstädter Zinshaus, gemeinsamer Gan。”; mood 0.030000000000000027_

- **1936.08** `vienna-parish-aid.funeral-society/funeral-society.defer` tags: faith, parish, mutual_aid, poverty, family
  Josef把抽屉拉开又推上，铜币在木板上滚了半圈。Berta Bauer合上本子说，拖欠的人不少，可规矩就是规矩。她走下两级台阶又回头提醒，发工钱那天她会在教堂侧门等着。
  _effects: mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-52; relation acquaintance with person-materialized-world-vienna-1912-52_

- **1936.09** `p9-gap-adult-unemployed.dock-morning/dock-watched-tools` tags: adulthood, unemployment, casual_labour, poverty, daily, dock
  河面的雾散尽时，码头上的人走了一半。Josef蹲在石阶上替Katharina Winter守着麻绳和铁钩，看装卸工在跳板上喊号子。汤送来时还烫嘴，豆子沉在碗底。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-11; relation acquaintance with person-materialized-world-vienna-1912-35; relation acquaintance with person-materialized-world-vienna-1912-11_

- **1936.09** `r3-mig.border-village::ctx-vienna-authoritarian-1934::milieu-tenement/crossed-under-the-hay` tags: migration, border, village, smuggling, risk, vienna, urban, crisis
  Grete Kral把Josef藏在干草下面，赶着马车走田埂。经过界碑时，Marie Huber抬手拦了一下，Grete Kral说车上是喂牛的草，Marie Huber用刺刀往草里扎了两下，没扎到底。马车走出半里地，Grete Kral才让Josef出来换气。
  _effects: cash -6 (教堂钟声两边都听得见（其中6克朗记入债务）); condition; flag +crossed_under_hay; relation friend with person-materialized-world-vienna-1912-17; knowledge “the patrol probes hay with a bayonet but not to the bottom”_

- **1937.01** `curse15-betrayal.signature::ctx-vienna-authoritarian-1934::milieu-tenement/the-seal-was-used` tags: betrayal, office, power, politics, curse, institution, vienna, urban
  Mitzi Berg 3用Josef留在抽屉里的印章签了一份采购单，把库房里最后一批煤卖给了城外的砖厂。Josef发现时，账已经做平，签字栏里是Josef自己的名字。Mitzi Berg 3说只是替Josef省了麻烦，还把那支用旧的印泥放回了原处。
  _effects: cash -3 (为平账先垫出去的钱（其中3克朗记入债务）); reputation -0.1; relation rival with person-materialized-world-vienna-1912-53; condition; flag +seal_used_by_trusted_hand; mood -0.07000000000000006_

- **1937.01** `state_reaction:wish-craft/craft-humiliation` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_reaction
  Josef把那句轻视记了很久。它没有变成一个决定，但也没有消失。
  _effects: mood -0.09999999999999998_
  _causes: evt:world-vienna-1912:007261_

- **1937.01** `r13-work.unemployment-benefit::ctx-vienna-authoritarian-1934::milieu-tenement/benefit-approved` tags: work, unemployment, benefit, institution, poverty, vienna, urban, crisis
  Rosa Huber把Josef的工龄册翻到最后一页，又对照了厂里寄来的解雇单，说可以领十二周。钱不多，每周够买面包和煤。Josef在表格上按了手印，Rosa Huber把一张薄薄的领取券推过来，说下周同一时间来，别迟到。
  _effects: cash 6 (补助金窗口的第二张表); flag +work13_unemployment_benefit_approved; knowledge “the benefit runs for twelve weeks and must be collected in p”; relation acquaintance with person-materialized-world-vienna-1912-46_

- **1937.02** `vienna-market-household.market-credit/market-credit.delay` tags: home, market, food, social
  三个克朗拖了九天。玛丽亚收下时数都没数，只把Josef的名字从木牌上抹去，粉笔灰落在卷心菜上。Helene Hofer拎着篮子从旁边过去，没停脚。
  _effects: cash -3 (延迟偿还市场赊账（其中3克朗记入债务）); food; reputation -0.05; relation acquaintance with person-materialized-world-vienna-1912-98; relation acquaintance with person-materialized-world-vienna-1912-98_

- **1937.06** `vienna-medical-treatment.sanatorium/sanatorium-go` tags: health, medical, family, money
  安娜把钥匙拴在门后的钉子上，又反过来压了压窗栓。车票是硬纸的，打孔时咔嗒一声。Josef在车厢里把诊断书摊在膝盖上，窗外最后几排厂房退远了，松树的味道从窗缝钻进来。
  _effects: cash -12 (疗养院车票和住宿押金（其中12克朗记入债务）); health 0.12000000000000001 (疗养院松林空气和正规休养); relation friend with person-materialized-world-vienna-1912-81; relation acquaintance with person-materialized-world-vienna-1912-81_

- **1937.08** `p9-gap-adult-solitude.window-argument/window-argument.nod` tags: adulthood, daily, solitude, ordinary, home, neighbor, overheard
  Josef在窗边听了一刻钟，只听出是工钱和面包账的事，最后把窗虚掩上睡了。第二天清早在楼梯口碰见那个女人，眼睛有点肿，两人错身时她点了点头，谁也没说话。
  _effects: mood 0.020000000000000018; flag +knows_downstairs_quarrel_

- **1938.01** `vienna-life-anschluss-1938/flees` tags: politics, persecution, 1938, migration
  Josef在夜里收拾了一只箱子，把证件缝进外套内衬，搭上往西的火车。Rosa Lechner 2第二天来查人，只看到空床和没关严的窗。
  _effects: move place-klosterneuburg-aunt-house; role; cash -20 (escape and lodging（其中20克朗记入债务）); condition; relation acquaintance with person-materialized-world-vienna-1912-96_

- **1938.01** `p9-work-jobsearch.ask-trial/ask-trial.accepted` tags: work, job_search, negotiation, wages, employment, task, trial, factory
  厂门口的砖墙被太阳晒得发烫。Lena在旁听着，插了一句这后生看着手稳。工头把烟灰弹进阴沟，说试半天，午饭他管。Josef点头时，肚子先响了一声。
  _effects: flag +trial_work_pending; relation acquaintance with person-materialized-world-vienna-1912-35; mood 0.050000000000000044_

- **1938.03** `vienna-medical-treatment.night-fever/hospital-night` tags: health, medical, family, money
  护士把冰袋按在Josef额上，水顺着鬓角流进衣领。Alois Weiss坐在床脚，数着窗外渐渐亮起的铺面门板，说回去给炉子添块煤。隔壁床的老头整夜在喊一个女人的名字。
  _effects: cash -2 (医院急诊押金（其中2克朗记入债务）); health 0.08 (急诊观察和冰敷退烧); relation friend with person-materialized-world-vienna-1912-49; relation acquaintance with person-materialized-world-vienna-1912-49_

- **1938.04** `p9-social-tenement-neighbors.flour-loan/flour-loan.half-bag-with-note` tags: housing, neighbors, tenement, daily, money, reputation
  Josef只舀出半袋，说自家也不宽裕，要Maria Hofer把上次的煤钱一并记在纸上。Maria Hofer接过纸片，当着面把日期和数目重写一遍，两人各留一半。面粉少了，账却清楚了，Josef把纸片夹进账簿样的旧本子。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-80; relation acquaintance with person-materialized-world-vienna-1912-80_

- **1938.05** `p9-gap-adult-solitude.river-walk/river-walk.bridge` tags: adulthood, daily, solitude, ordinary, home, walk, river
  Josef在桥边站了一会儿，看一艘平底船靠岸卸煤，几个工人用铁锹往岸上甩。风把煤灰吹到她脸上，她抹了一把，往回走时脚步比来时轻，回到巷口还给自己买了块三赫勒的糖。
  _effects: mood 0.05999999999999994; cash -0.03 (买了三赫勒的糖（其中0.03克朗记入债务）)_

- **1939.01** `agency:support_process` tags: agency, agency:support_process
  Josef想帮忙，但组织者不信任新来的人，只让其在外围等消息。
  _effects: mood -0.040000000000000036_

- **1939.01** `vienna-housing-move.rent-notice/rent-notice-neighbors-together` tags: housing, home, rent, family, money
  Josef把Luise Kral和楼里另两户人家叫到楼道，把那张纸摆在窗台上传看。看门人在楼梯拐角听着，说房东礼拜三来收钱。几家人合计好，到那天一起等在门厅，先把克朗递过去，再把修补的事一件件摆出来。Josef把纸折进围裙口袋，觉得人凑齐了话也硬气些。
  _effects: relation acquaintance with person-luise-kral; mood 0.040000000000000036; flag +tenant_collective_

- **1939.01** `vienna-historical-social-movement.district-list/demand-open-books` tags: history, historical_process, social_movement, organization, politics
  Josef把账本摊在灯下，一页一页念出日期和克朗数，念到买纸那笔时有人 From 门口咳嗽。Lena低头拨弄围巾穗子，没有替谁说话。桌子上的旧墨水瓶被碰倒，蓝墨慢慢洇进木纹。
  _effects: relation acquaintance with person-phase15-Lena-world-vienna-1912; reputation 0.039999999999999994; skill_

- **1939.10** `kernel-social.neighbor-conflict::ctx-vienna-authoritarian-1934::milieu-tenement/neighbor-conflict.laundry-water` tags: social, neighbor, conflict, everyday, housing, scarcity, vienna, urban
  洗衣日，楼上泼下一盆灰水，Josef晾在绳子上的床单全成了黑点。Josef端着湿床单上楼，邻居说不是她泼的，是风吹翻了盆；两人在门口争到水凉，床单最后重洗了一遍，肥皂少了一块。
  _effects: relation acquaintance with person-marie-huber; role; cash -2 (soap and coal for rewashing the sheets（其中1克朗记入债务）); flag +laundry_war_

- **1940.01** `office16-admin.quiet-ledger::ctx-vienna-authoritarian-1934::milieu-tenement/small-surplus` tags: office, administration, budget, competence, quiet, power, vienna, urban
  账目连续第二年没有超支，Grete Moser 2在报告里加了一句“未发现异常”。Josef用结余给夜班守卫换了炉子，又把旧账本按年份装进箱子；没有人写报道，但来办事的人发现窗口开得比从前早。
  _effects: organization_funds; reputation 0.06; skill; mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-3; flag +quiet_surplus; knowledge “审计报告里只有一句“未发现异常”，但窗口提前开门被办事的人记住了。”; relation acquaintance with person-materialized-world-vienna-1912-105_

- **1940.01** `state_tick:wish-craft/craft-pressure/press-on` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_tick
  Josef又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.020000000000000018_

- **1940.01** `r13-work.interview-prep::ctx-vienna-authoritarian-1934::milieu-tenement/borrowed-collar` tags: work, interview, shop, preparation, class, vienna, urban, crisis
  Gustav Berg把自己结婚时的硬领借给Josef，又用湿布把领口擦了一遍。镜子只有巴掌大，Josef练了三遍怎么进门、怎么把帽子拿在手里。Emil Bauer 2的柜台在两条街外，招的是会写字的人；Josef把地址抄在纸片上，睡前又看了一遍。
  _effects: cash -1 (借来的硬领（其中1克朗记入债务）); flag +work13_prepared_for_interview; skill; relation friend with person-gustav-berg_

- **1940.06** `p9-social-tenement-neighbors.evicted-neighbours/evicted-neighbours.only-hot-water` tags: housing, neighbors, tenement, daily, money, reputation
  Josef没有开门，只从门缝递出一壶热水，说自家也挤不下。走廊里的箱子到半夜还堆着，孩子的哭声隔着门板一阵一阵。Josef坐在桌边没有点灯，第二天在楼梯间遇见时避开了目光。
  _effects: mood -0.06000000000000005; relation acquaintance with person:evt:world-vienna-1912:000198:child_

- **1940.08** `hs18-occupation.piano::ctx-vienna-authoritarian-1934::milieu-tenement/buy-it-back` tags: occupation, piano, requisition, witness, neighbor, history, vienna, urban
  Josef把两条舍不得抽的烟塞给Rosa Huber，说这琴是替邻居保管的。Rosa Huber掂了掂烟，让工人把琴抬回门厅，却把琴凳留下了。Gustav Winter晚上来道谢，Josef说别谢，明天要是再来，就说不认识我。
  _effects: cash -3 (two packs of cigarettes for the officer（其中3克朗记入债务）); relation acquaintance with person:evt:world-vienna-1912:000432:child; state_add hs18-street-witness state:world-vienna-1912:752; flag +bought_back_neighbors_piano; mood 0.010000000000000009_

- **1940.10** `vienna-parish-aid.soup-kitchen/soup-kitchen.leave` tags: faith, parish, mutual_aid, poverty, family
  Josef看见熟人排在前面，帽檐压得低低的，便转身拐进旁边的小巷。Rosa Bauer追出来问怎么不领了，Josef说人太多，改天再来。回到屋里，灶是冷的，早上剩的半个土豆还在盘子里。Josef把它切成片，就着水咽下去。
  _effects: mood -0.050000000000000044; relation acquaintance with person:evt:world-vienna-1912:000398:child; food_

- **1941.01** `hist15-occ.requisition-notice::ctx-vienna-authoritarian-1934::milieu-tenement/hide-the-last-sack` tags: occupation, requisition, shortage, institution, history, family, vienna, urban
  Josef把最后一袋黑麦埋进煤堆下面，夜里听见巡逻队从窗前走过。第二天面包房照常开门，但货架上少了三排面包；Josef知道那不是因为城里没有粮。
  _effects: food; mood 0.020000000000000018; flag +hidden_grain; relation acquaintance with person-materialized-world-vienna-1912-104_

- **1941.01** `state_tick:hs18-street-witness/memory-drift/holds` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Josef又把那天的顺序在脑子里走了一遍：先是门响，再是靴子，最后才是那声喊。细节还在，只是每讲一次，旁边就多出一点别人替你补上的颜色。
  _effects: state_parameter hs18-street-witness.certainty 80 -> 82_

- **1941.01** `agency:support_process` tags: agency, agency:support_process
  Josef想帮忙，但组织者不信任新来的人，只让其在外围等消息。
  _effects: mood -0.040000000000000036; reputation -0.009999999999999995_

- **1941.08** `p9-social-family-conflict-care.christmas-soup/jam-at-door` tags: family, care, siblings, inheritance, housing, money
  Josef只送来一罐杏子果酱，没有进门，把罐子放在门槛里边，说了句汤你们先喝。Klara在屋里听见了，走到门口时人已经下楼。果酱罐上没有标签，只裹着一层报纸，瓶口用蜡封着；这一罐甜食抵得上一克朗的吃食，却没能把两个人重新按到一张桌上。
  _effects: food; relation kin with person-phase15-Klara-world-vienna-1912; mood -0.020000000000000018_

- **1941.10** `vienna-housing-move.sublet-room/sublet-daylight-only` tags: housing, home, rent, family, money
  Josef和Elisabeth Berg谈妥只出租白天，夜里不留宿，收两克朗。床仍归Josef家，钥匙只在白天给。Elisabeth Berg说不碍事，他住的工棚不许带人，白天有个落脚的地方就够。Emil Weiss 2听了点头，说这样少些闲话；到了傍晚，Josef把床铺重新收好，屋里照旧几口人。
  _effects: cash 2 (白天出租床位的钱); relation acquaintance with person-materialized-world-vienna-1912-109; mood 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-109_

- **1941.12** `vienna-market-debt.rent-arrears/rent-borrow-from-neighbor` tags: market, debt, money, home, shop
  看门人正把垃圾桶往院角推，见你回来，眼神在你和门牌之间转了一圈。房东收下四克朗，在账本上划掉一行，没提换锁的事。你上楼时腿有点发软，楼梯扶手凉得扎手。
  _effects: cash 4 (向邻居借来补交欠租); relation acquaintance with person-materialized-world-vienna-1912-120; mood 0.040000000000000036; relation acquaintance with person-materialized-world-vienna-1912-120_

- **1942.01** `office16-office.lose-the-chair::ctx-vienna-authoritarian-1934::milieu-tenement/kept-the-keys` tags: office, removal, loss, politics, power, transition, vienna, urban
  移交清单少了一把储藏室的钥匙。Josef没有提，Ferdinand Bauer也没有问；三个月后，清洁工在储藏室发现两箱以Josef名义订阅的行业期刊，收件地址仍是这间办公室。
  _effects: position_end 助理文书 @mortuary:person-materialized-world-vienna-1912-55-evt:world-vienna-1912:005769; relation acquaintance with person:evt:world-vienna-1912:000401:child; flag +kept_office_keys; knowledge “储藏室有两箱以我的名义订阅的期刊，收件地址仍是这间办公室。”; mood 0.020000000000000018_

- **1942.01** `state_tick:hs18-street-witness/memory-drift/holds` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Josef又把那天的顺序在脑子里走了一遍：先是门响，再是靴子，最后才是那声喊。细节还在，只是每讲一次，旁边就多出一点别人替你补上的颜色。
  _effects: state_parameter hs18-street-witness.certainty 82 -> 84_

- **1942.01** `r13-civ.recover-at-home::ctx-vienna-authoritarian-1934::milieu-tenement/neighbor-soup` tags: health, recovery, care, household, food, vienna, urban, crisis
  Karl Kraus端来一碗兑了水的牛奶，顺手把Josef家的炉子捅旺。Josef靠在床头，听Karl Kraus讲楼下谁也被传染了，谁家把病人送去了医院。人走后，屋里还留着一点煤烟和奶味。
  _effects: cash -1 (退烧后的第一碗粥); health 0.04 (退烧后的第一碗粥); flag +recovered_with_neighbor_help; relation friend with person-karl-kraus_

- **1942.03** `major-crisis.rent-increase/tenant-meeting` tags: crisis, housing, rent, eviction, family, poverty
  巷口洗衣房的老板娘把几张椅子摆开，叫来半条街的租户。Josef把涨租单摊在桌上，逐条念出上面的数字；Ferdinand Kraus站在门边，既没走，也没替房东说话。大家决定先集体迟交一个月，签名纸传到Josef手里时，纸上已经有一块油渍。
  _effects: cash -2 (paper, ink and tram fare for the tenants meeting); role; flag +rent_strike; relation acquaintance with person:evt:world-vienna-1912:000198:child; reputation 0.03_

- **1942.11** `vienna-market-household.friday-fish/friday-fish.share` tags: home, market, food, social
  鱼还滴着水，Josef在走廊里分成两份。一份拿进自家，一份搁在Emil Lechner的门口。傍晚Emil Lechner来还盘子，盘子里是一小袋面粉。
  _effects: cash -6 (买鱼); food; relation acquaintance with person:evt:world-vienna-1912:000849:child_

- **1943.01** `state_tick:hs18-street-witness/memory-drift/blurs` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Josef忽然想不起那个人先迈的是左脚还是右脚。邻居说自己记得清清楚楚，还补了一个细节；Josef听着，竟分不清那是自己看见的，还是后来听来的。
  _effects: state_parameter hs18-street-witness.certainty 84 -> 76; mood -0.020000000000000018_

- **1943.01** `kernel-health.task-tuberculosis-cure::ctx-vienna-authoritarian-1934::milieu-tenement::tb-cure-war-requisition/tb-war-school-ward` tags: health, task, tuberculosis, sanatorium, cure, vienna, urban, crisis
  军队征用了疗养院，Josef被塞进一间改作病房的学校教室。床挨着床，夜里有人咳到天亮；护士只够发退烧药，剩下的靠病人自己。熄灯后有人低声报自己的团号，没人回应。教室的黑板上还留着半道算术题。
  _effects: move place-wien-allgemeines-krankenhaus; cash -8 (improvised ward fees and travel（其中8克朗记入债务）); condition; role; knowledge “疗养院被征用后，病床摆进学校教室，床挨着床，夜里有人咳到天亮。”_

- **1943.03** `hs18-queue.refugee::ctx-vienna-authoritarian-1934::milieu-tenement/slip-food-and-leave` tags: refugee, queue, station, papers, official, history, vienna, urban
  Josef没有填表，只把半块面包和一张电车票塞进孩子的口袋。Ferdinand Kral敲了敲桌子，叫下一个。Klara追到门口，问姓名；Josef摆摆手，说名字写在票背面。其实票背面什么也没有。
  _effects: cash -1 (gave away a tram ticket（其中1克朗记入债务）); relation acquaintance with person-phase15-Klara-world-vienna-1912; flag +helped_refugee_without_papers; mood 0.020000000000000018_

- **1943.07** `vienna-medical-treatment.night-fever/corner-doctor` tags: health, medical, family, money
  施特劳斯医生用酒精棉擦手，把药粉倒进小纸袋，折口时指甲掐出印子。他说夜里别再喝醋水，那东西烧胃。Klara把炉火拨旺，在灶上坐了一壶水，答应第二天替Josef去铺子里告假。
  _effects: cash -4 (医生出诊费和药费（其中4克朗记入债务）); health 0.05 (药粉和糖浆缓解症状); relation friend with person-phase15-Klara-world-vienna-1912_

- **1943.09** `p9-social-tenement-neighbors.stove-and-line/stove-and-line.first-come-order` tags: housing, neighbors, tenement, daily, money, reputation
  Josef把四只洗衣盆按到厨房的先后排成一列，用粉笔在门后写下各家的时辰：六点到七点半、七点半到九点。Rosa Lechner起初嘟囔，看到自家名字排在第二格，也就把水壶提了回去。晾衣绳按同样次序分两段，谁家的床单先上谁先占。
  _effects: mood 0.040000000000000036_

- **1944.01** `state_tick:hs18-street-witness/memory-drift/blurs` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Josef忽然想不起那个人先迈的是左脚还是右脚。邻居说自己记得清清楚楚，还补了一个细节；Josef听着，竟分不清那是自己看见的，还是后来听来的。
  _effects: state_parameter hs18-street-witness.certainty 76 -> 68; mood -0.020000000000000018_

- **1944.01** `state_tick:wish-craft/craft-pressure/press-on` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_tick
  Josef又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.020000000000000018_

- **1944.01** `p9-work-jobsearch.railway-depot/railway-depot.day-labor` tags: work, job_search, negotiation, wages, employment, task, railway, depot
  货场的煤烟落在肩上。Grete Kral帮他扛第一袋时教他把腰沉下去。站务员在名册边上记了日期，说干得好才有正式名分，Josef点头，把袋子往肩上一顶。
  _effects: employment 货场临时装卸工 @ org-wien-magistrat; condition; relation acquaintance with person-materialized-world-vienna-1912-95; mood 0.040000000000000036; relation acquaintance with person-materialized-world-vienna-1912-95; relation acquaintance with person-materialized-world-vienna-1912-126_

- **1944.10** `p9-social-tenement-neighbors.gramophone-wall/gramophone-wall.cotton-in-ears` tags: housing, neighbors, tenement, daily, money, reputation
  Josef忍到天亮，第二天去药房买了五分钱的棉花，撕成两小团塞在耳里。夜里的进行曲还剩一点闷响，翻个身也就过去了。此后在楼梯间遇见Rosa Berg 3只是点头，再没有进过那家的门。
  _effects: cash -0.05 (在药房买棉花塞耳朵（其中0.05克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-72_

- **1945.01** `vienna-life-1945-liberation/displaced` tags: war, liberation, 1945, migration
  炮火把Josef住的那条街烧掉一半。Josef跟着人群走到城外，在临时收容所登记，床位上铺的是发霉的稻草。
  _effects: move place-klosterneuburg-aunt-house; role; cash -5 (temporary shelter（其中4克朗记入债务）)_

- **1945.01** `state_expire:hs18-street-witness` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Josef的「街面上的目击者」到期；相关安排结束。
  _effects: state_remove hs18-street-witness state:world-vienna-1912:752_

- **1945.01** `p9-work-jobsearch.relative-introduction/relative-introduction.lead-works` tags: work, job_search, negotiation, wages, employment, task, relative, introduction
  舅公家的咖啡是兑了菊苣的。Josef把从前的活一样样报出来，舅公听着，偶尔嗯一声。转天Elisabeth Berg看他搬箱子的架势，说下星期来试杂活。
  _effects: relation kin with person-materialized-world-vienna-1912-98; relation acquaintance with person-materialized-world-vienna-1912-109; mood 0.050000000000000044_

- **1945.05** `vienna-market-household.market-credit/market-credit.delay` tags: home, market, food, social
  三个克朗拖了九天。玛丽亚收下时数都没数，只把Josef的名字从木牌上抹去，粉笔灰落在卷心菜上。Hermann Kral 2拎着篮子从旁边过去，没停脚。
  _effects: cash -3 (延迟偿还市场赊账（其中3克朗记入债务）); food; reputation -0.05; relation acquaintance with person-materialized-world-vienna-1912-81_

- **1946.01** `p9-work-career.reference/p9-work-career.reference.strong` tags: work, career, craft, clerk, education, task, reference, certificate
  Josef把新东家的信放在柜台上。Magistrat der k. k. Reichshaupt- und Residenzstadt Wien读完，抽出公司的信笺，蘸墨水写下“勤勉可靠，品行端正，因故离柜，并无纠葛”。写完吹干，盖了章，还多写一句“有需要可来函”。Josef把信纸夹进厚纸板，第二天一早就往玛丽亚希尔夫的新账房去了。
  _effects: reputation 0.05; flag +has_strong_reference_

- **1946.08** `vienna-social-movement.recruitment/read-and-decline` tags: development, social_movement, organization, politics
  Josef把传单读了两遍，记下上面的地址，却没有去。第二天照常上工；午休时听见两个工友低声谈论同一场集会。
  _effects: mood -0.010000000000000009_

- **1947.01** `p10-migration-tasks.move-district/move-share-smaller-room` tags: adulthood, migration, housing, family, travel, task, moving, district
  他拿不出一季度的租金，退回到城北一条巷子，改租一间和运煤工合住的屋子，两张床之间拉一根绳子挂衣服。押金四克朗照付，剩下的钱够买一星期的面包和煤球，可孩子转学的手续还压在旧房东那里。
  _effects: cash -6 (合住屋押金四克朗与搬运用度（其中6克朗记入债务）); residence; food; relation acquaintance with person-materialized-world-vienna-1912-109_

- **1947.04** `p9-history-union-political.reform-meeting/reform-study-committee` tags: politics, union, party, meeting, leaflet, police, strike, reform
  会议开到最后，只通过成立一个研究委员会，说三个月后交报告。散会时Josef和Otto Bauer在门口商量下一步，有人提议先发动街区签名，把工价和房租的数字附在报告后面。
  _effects: relation colleague with person-materialized-world-vienna-1912-104; mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-144_

- **1948.01** `state_tick:wish-craft/craft-pressure/put-away` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_tick
  Josef暂时把那件事收进抽屉；日子还有别的东西要应付。
  _effects: mood -0.020000000000000018_

- **1948.01** `r13-civ.clinic-first-visit::ctx-vienna-postwar-1945::milieu-tenement/stamp-on-credit` tags: health, clinic, queue, diagnosis, institution, vienna, urban, postwar
  Ferdinand Kraus把挂号纸推回来，说没有疾病保险的印花就不能看门诊。Josef数出几枚硬币，手在柜台上停住，后面的人绕过他往前挤，把窗口堵得更紧。Ferdinand Kraus最后把印花本翻到最后一页，说先记在账上，月底一起收。
  _effects: cash -2 (诊所走廊的第三张长凳（其中2克朗记入债务）); flag +clinic_fee_recorded_as_debt; relation acquaintance with person:evt:world-vienna-1912:000198:child; knowledge “the outpatient fee can be recorded against next month’s wage”_

- **1949.01** `r13-fam.seek-shelter::ctx-vienna-postwar-1945::milieu-tenement/bed-found` tags: task, health, shelter, homelessness, night, charity, vienna, urban
  Maria Hofer把Josef的名字写进本子，发了一张薄毯和一碗热汤。床铺是用木板搭的，翻个身就响；隔壁的女人一直咳嗽，Josef却睡得很沉。天亮时，Maria Hofer说只能住三夜，第四夜要去市政厅重新登记。
  _effects: cash -1 (收容所门口的队伍（其中1克朗记入债务）); condition; flag +slept_in_night_shelter; role; relation acquaintance with person-materialized-world-vienna-1912-80; knowledge “the night shelter allows only three nights without re-regist”; move place-wien_

- **1949.04** `vienna-parish-aid.funeral-society/funeral-society.pay` tags: faith, parish, mutual_aid, poverty, family
  Josef数出八赫勒交给Rosa Berg 3，看她在蓝皮本上找到自家门牌，把这一周的格子划掉。Rosa Berg 3说上个月隔壁巷子的人走了，公账出了棺材和一场小弥撒，剩下的钱记在册尾。楼梯口的灯很暗，Josef盯着自己的名字看了两遍才转身。
  _effects: cash -0.4 (一周丧葬互助会会费（其中0.4克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-72; flag +funeral_society_member_

- **1950.01** `r13-civ.press-card::ctx-vienna-postwar-1945::milieu-government/no-editorial-sponsor` tags: knowledge, press, credentials, reporter, institution, vienna, urban, postwar
  Otto Bauer翻到表格最后一栏，问是哪个编辑部担保。Josef报了一个名字，Otto Bauer打电话过去，对面说不认识。表格被推回来，照片还钉在角上。照片上的Josef看着自己的帽子，像在看别人。
  _effects: mood -0.07999999999999996; flag +press_card_refused; knowledge “a press card requires a named editor to vouch for the applic”; relation acquaintance with person-materialized-world-vienna-1912-138_

- **1950.08** `vienna-legacy-worklife.union-office/union-office.post-ledger` tags: legacy, work, family, reform, ordinary_life
  浆糊是隔夜的，刷上去时带着股酸味。Josef把纸四角按平，有人凑近念出“一九〇一年，欠三十四克朗”。办公室里的椅子腿不平，坐在上面的人一动就晃，可没人起身。
  _effects: reputation 0.04999999999999999; relation acquaintance with person-materialized-world-vienna-1912-72; flag +union_ledger_public_

- **1950.09** `vienna-housing-move.sublet-room/sublet-declined` tags: housing, home, rent, family, money
  Josef正要把空床许给Otto Bauer，Luise Bauer却在楼梯上拦住了，说这条街上去年有人招了生人合住，失过钥匙，惹出些麻烦。Josef回家把铺盖重新叠好，回绝了Otto Bauer，只让他白天来喝口热水。空床仍空着，房租还是从自己的工钱里补。
  _effects: mood -0.020000000000000018; relation acquaintance with person:evt:world-vienna-1912:005277:child; relation acquaintance with person-materialized-world-vienna-1912-104_

- **1951.01** `ml18-charity.neighborhood-clinic::ctx-vienna-postwar-1945::milieu-government/the-clinic-opens` tags: charity, money, clinic, reputation, community, warm, vienna, urban
  诊所设在街角一间改过的铺面里，门口挂着一块红砖色的木牌。Friedrich Bauer每周来两个下午，给孩子量体重、给老人听肺；Hermann Berg送来一盆天竺葵，Elisabeth Berg把候诊室的长凳刨平。Josef没有剪彩，只把第一张药方折好，放进抽屉最里面。
  _effects: cash -30 (endowment for the neighborhood clinic（其中17克朗记入债务）); state_parameter ml18-sudden-fortune.principal 18 -> 0; organization_found 街角诊所 (other); reputation 0.09999999999999999; flag +clinic_opened; knowledge “街角诊所的第一张药方锁在抽屉里，药是给孩子退烧的。”; mood 0.09999999999999998_

- **1951.01** `state_reaction:wish-craft/craft-humiliation` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_reaction
  Josef把那句轻视记了很久。它没有变成一个决定，但也没有消失。
  _effects: mood -0.09999999999999998_
  _causes: evt:world-vienna-1912:014366_

- **1951.01** `r13-work.practice-craft::ctx-vienna-postwar-1945::milieu-tenement/joint-fits` tags: work, craft, practice, wood, skill, vienna, urban, postwar
  Josef把第四十个榫头敲进卯眼，声音是闷的，不晃。Elisabeth Berg路过，用拇指按了按接缝，说这回不用胶也能站住。Josef把废掉的三十九个榫头扫进灶膛，火苗从锯末里窜起来，屋里全是松木的味。
  _effects: cash 2 (第四十个榫头); flag +work13_forty_practice_mortises; skill; relation colleague with person-materialized-world-vienna-1912-109_

- **1951.01** `initiative:found_process:mortuary:person-rosa-lechner-evt:world-vienna-1912:002427`
  圣马克斯殡葬合作社在Leopoldstädter Zinshaus, gemeinsamer Gang经过数年的招募、会议和互助，把分散的行动整理成公开纲领；这不是预先写好的历史，而是成员自己累积出来的运动。
  _effects: historical process 圣马克斯殡葬合作社的持续运动; historical development:initiative-mortuary:person-rosa-lechner-evt:world-vienna-1912:002427-1951 as organizer; historical development:initiative-mortuary:person-rosa-lechner-evt:world-vienna-1912:002427-1951 as organizer; historical development:initiative-mortuary:person-rosa-lechner-evt:world-vienna-1912:002427-1951 as organizer; historical development:initiative-mortuary:person-rosa-lechner-evt:world-vienna-1912:002427-1951 as organizer; historical development:initiative-mortuary:person-rosa-lechner-evt:world-vienna-1912:002427-1951 as organizer; knowledge “圣马克斯殡葬合作社的持续运动不是一次会议，而是我们这些年积累出来的持续组织。”; reputation 0.03999999999999998_

- **1951.01** `historical_phase`
  历史进程《圣马克斯殡葬合作社在Leopoldstädter Zinshaus, gemeinsamer Gang经过数年的招募、会议和互助，把分散的行动整理成公开纲领；这》从 emerging 进入 mobilizing。
  _effects: knowledge “我亲历或知晓「圣马克斯殡葬合作社在Leopoldstädter Zinshaus, gemeinsamer Gang经过”; knowledge “我亲历或知晓「圣马克斯殡葬合作社在Leopoldstädter Zinshaus, gemeinsamer Gang经过”; knowledge “我亲历或知晓「圣马克斯殡葬合作社在Leopoldstädter Zinshaus, gemeinsamer Gang经过”; knowledge “我亲历或知晓「圣马克斯殡葬合作社在Leopoldstädter Zinshaus, gemeinsamer Gang经过”; knowledge “我亲历或知晓「圣马克斯殡葬合作社在Leopoldstädter Zinshaus, gemeinsamer Gang经过”_
  _causes: evt:world-vienna-1912:014657_

- **1951.05** `r14-soc.neighbor-wall::ctx-vienna-postwar-1945::milieu-tenement/took-a-hammer` tags: neighbor_conflict, property, law, boundary, courtyard, vienna, urban, postwar
  夜里，Josef抡起锤子把那半砖砸下来。Hermann Berg披着外套冲出来，碎砖滚进天井，惊动了整栋楼。警察来的时候，墙已经缺了一个人能侧身通过的洞。Hermann Kral 2开了五克朗的罚单，说再动一块砖就上法庭。第二天，Hermann Berg在洞口钉了一块铁皮，钉子上还挂着新漆。
  _effects: cash -5 (半砖界墙（其中5克朗记入债务）); mood 0.050000000000000044; condition; flag +broke_neighbor_wall; relation rival with person-materialized-world-vienna-1912-51_

- **1951.06** `vienna-parish-aid.funeral-society/funeral-society.defer` tags: faith, parish, mutual_aid, poverty, family
  Josef把抽屉拉开又推上，铜币在木板上滚了半圈。Hermann Berg合上本子说，拖欠的人不少，可规矩就是规矩。她走下两级台阶又回头提醒，发工钱那天她会在教堂侧门等着。
  _effects: mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-51_

- **1952.01** `ml18-family.fortune-split::ctx-vienna-postwar-1945::milieu-tenement/the-sibling-takes-it` tags: family, money, windfall, inheritance, conflict, dark, vienna, urban
  晚饭后的第三天，Josef去邮局取钱，发现存折上少了三十克朗。Klara在母亲的旧照片前承认拿了钱，说这些年照顾母亲的情分总该折成数目。Otto Lechner 2去叫了警察；Josef站在两个最熟悉的人中间，听见楼下有人把留声机开得很响。
  _effects: cash -30 (the sibling took thirty crowns from the savings book（其中28克朗记入债务）); state_parameter ml18-sudden-fortune.principal 0 -> 0; state_parameter ml18-sudden-fortune.claims 5 -> 8; relation rival with person-phase15-Klara-world-vienna-1912; condition; flag +family_fortune_stolen; knowledge “存折上少了三十克朗，取款单上的签名是模仿的。”; mood -0.09999999999999998_

- **1952.01** `state_tick:wish-craft/craft-pressure/put-away` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_tick
  Josef暂时把那件事收进抽屉；日子还有别的东西要应付。
  _effects: mood -0.020000000000000018_

- **1952.01** `kernel-health.task-pharmacy-hunt::ctx-vienna-postwar-1945::milieu-tenement/pharmacy-last-bottle` tags: health, task, pharmacy, shortage, black_market, vienna, urban, postwar
  Josef跑了四家药房，最后在火车站附近的小店找到最后一瓶奎宁。掌柜先问给谁用，又看了看Josef的鞋，才把瓶子从柜台底下拿出来；价格是官价的三倍。他把瓶子塞进内袋，路上每隔一会儿摸一下。
  _effects: cash -25 (last bottle of quinine at three times the official price（其中25克朗记入债务）); health 0.04 (quinine obtained and taken); condition; role; knowledge “奎宁这类药会藏在柜台底下，先问给谁用，再看买药人的鞋；价格是官价三倍。”_

- **1952.05** `p9-gap-adult-solitude.misdelivered-letter/misdelivered-letter.opened` tags: adulthood, daily, solitude, ordinary, home, letter
  信封没封牢，Josef在灯下把它掀开，里面是维也纳联合银行的催款单，欠了三十四克朗。她认出那名字是楼上常穿黑裙的女人，便把纸原样叠回去，用米汤把封口粘好，放到门房窗台上。
  _effects: mood -0.040000000000000036; flag +knows_upstairs_debt_

- **1952.10** `vienna-legacy-worklife.hours-ledger/hours-ledger.read-for-others` tags: legacy, work, family, reform, ordinary_life
  围过来的工友有七八个，有人把耳朵凑到Josef嘴边，怕听漏一个数字。念到“星期六下午停工”时，人群里有人笑了一声，又马上收住。墙上的表被风掀起一角，Josef用拇指按住，继续往下念。
  _effects: skill; relation colleague with person-materialized-world-vienna-1912-109; reputation 0.03999999999999998_

- **1953.01** `kernel-migrate.emigration-papers::ctx-vienna-postwar-1945::milieu-government/civic-emigration-refused` tags: migration, papers, bureaucracy, port, emigration, vienna, urban, postwar
  他的申请被退回，理由是“担保人收入不足”。Ferdinand Lechner说可以找第二担保人；他翻遍通讯录，发现能签字的人不是已经走了，就是不肯再担保。回家后，他把通讯录上能签字的名字一个个划掉。
  _effects: flag +emigration_papers_refused; cash -2 (照片、表格和往返车钱); relation acquaintance with person-materialized-world-vienna-1912-128; reputation -0.010000000000000009; knowledge “护照申请需要担保人收入证明，找不到第二担保人就办不下去”; relation acquaintance with person-materialized-world-vienna-1912-128_

- **1953.06** `vienna-parish-aid.rent-box/rent-box.refuse` tags: faith, parish, mutual_aid, poverty, family
  Josef说这个月还能撑，房租差的那几克朗打算替人洗衣补上，请Hermann Berg把篮子提回去给更困难的人家。Hermann Berg在门口停了一会儿，把一小块肥皂留在窗台上，说不是救济，是教区多出来的。门关上后，屋里只剩煤箱底刮出的响声。
  _effects: mood -0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-51; flag +parish_refused_aid_

- **1953.08** `state_reaction:wish-craft/craft-humiliation` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_reaction
  Josef把那句轻视记了很久。它没有变成一个决定，但也没有消失。
  _effects: mood -0.040000000000000036; flag +wish:craft:wounded_
  _causes: evt:world-vienna-1912:015882_

- **1954.01** `r14-soc.neighbor-rescue::ctx-vienna-postwar-1945::milieu-tenement/carried-through-smoke` tags: neighbor_rescue, saved_a_life, fire, neighbor_conflict, courage, vienna, urban, postwar
  Hermann Berg家的厨房先冒烟，火从煤箱后面蹿上来。Josef用湿毛巾捂住口鼻，把倒在门边的Hermann Berg拖过两级台阶。救护车到时，Josef的眉毛已经燎掉一半，怀里还抱着对方那只装证件的铁盒。消防员把烧黑的锅拎出来时，Josef才觉得手掌开始疼。担架抬走时，Josef还问了一句“铁盒带出来没有”。
  _effects: condition; flag +saved_neighbor_from_fire; relation friend with person-materialized-world-vienna-1912-51_
  _causes: evt:world-vienna-1912:014855_

- **1954.01** `r13-fam.seek-shelter::ctx-vienna-postwar-1945::milieu-tenement/robbed-in-shelter` tags: task, health, shelter, homelessness, night, charity, vienna, urban
  半夜有人摸Josef的布包，Josef惊醒时，包已经被拖到床板底下。Rosa Berg 3提着灯赶来，只捡到一只空钱袋；里面原本放着最后三克朗。第二天，Josef把毯子叠好，没说要去哪里。
  _effects: cash -3 (收容所门口的队伍（其中3克朗记入债务）); condition; flag +robbed_in_night_shelter; knowledge “the shelter has no lockers and no night watch”_

- **1954.04** `r2-faith.burial-fund-claim::ctx-vienna-postwar-1945::milieu-tenement/members-voted-exception` tags: mutual_aid, burial, claim, dues, bureaucracy, vienna, urban, postwar
  月会上，Friedrich Bauer把Josef的情况念了一遍，说按规定不能发。Rosa Berg 3站起来，问在座的人谁没欠过三个月。投票结果是十一比四，补助照发。Josef在门外听见掌声，没有进去，只把帽子摘了下来。
  _effects: cash 8 (欠了三个月的会费); mood 0.07999999999999996; flag +burial_fund_exception_voted; organization_funds; knowledge “the members can override the arrears rule by vote”_

- **1954.08** `vienna-housing-move.rent-notice/rent-notice-pay` tags: housing, home, rent, family, money
  Josef把通知念给Rosa Berg 3听，Rosa Berg 3摇头说是楼梯间那几块新玻璃的账。Josef去楼下杂货铺换开一张五克朗的纸币，回屋一枚一枚摆开数，煤箱底多留了二十赫勒。
  _effects: cash -2 (按月多付两克朗房租); food; mood -0.030000000000000027_

- **1954.12** `vienna-market-debt.coal-credit/coal-credit-full` tags: market, debt, money, home, shop
  邻居帮你把半筐煤抬上楼，楼梯窄，煤块滚了两级。你蹲下去捡，指甲缝里立刻嵌了黑泥。炉子生起来后，屋里那股潮冷气慢慢退了，你才想起晚饭还没着落。
  _effects: cash -1.5 (赊煤到期还款含利息（其中0.5克朗记入债务）); food; flag +coal_credit_debt_

- **1955.01** `r14-soc.favor-obligation::ctx-vienna-postwar-1945::milieu-tenement/cousin-from-the-country` tags: favor_obligation, neighbor_rescue, debt, obligation, neighbor_conflict, vienna, urban, postwar
  Hermann Berg拎着一只藤箱上门，说表弟在城里找不到床位，能不能在Josef家过一冬。Josef看着自己那间已经住了四口人的屋子，还是把箱子接了过来。藤箱底下漏出几粒麦子，扫了三遍才干净。表弟在城里待了整整一个冬天，走时把藤箱底下的麦粒扫得干干净净。
  _effects: cash -3 (藤箱底下的麦粒（其中3克朗记入债务）); mood -0.050000000000000044; condition; flag +housed_neighbor_relative; relation acquaintance with person-materialized-world-vienna-1912-51_
  _causes: evt:world-vienna-1912:015743_

- **1955.01** `vienna-postwar-housing-1950s/stay-with-relatives` tags: adulthood, postwar, housing, family
  分房名单又往后推了一年，Josef一家搬进亲戚家的厨房隔间。Katharina Kraus送来一块旧帘子当隔断；夜里有人起身，全屋都听得见。
  _effects: cash -3 (shared household costs); condition; mood -0.030000000000000027_

- **1955.01** `p9-work-jobsearch.negotiate-hours/negotiate-hours.half-day` tags: work, job_search, negotiation, wages, employment, task, hours, saturday
  Mitzi Moser 2在旁边悄悄比了个手势，让他别逼太紧。东家最后说中午收摊，算一天的钱扣两克朗。Josef点头，把自己那块怀表跟店里的钟对了一眼。
  _effects: cash -2 (星期六下午工钱按日扣减); health 0.03 (终于有半天空闲); mood 0.050000000000000044; relation acquaintance with person-materialized-world-vienna-1912-171_

- **1955.04** `p9-social-tenement-neighbors.flour-loan/flour-loan.full-bag` tags: housing, neighbors, tenement, daily, money, reputation
  Josef把一整袋面粉倒进Emil Winter的空口袋，袋口用麻绳扎了两道，说等她男人发了薪再还。Emil Winter连声道谢，把写着借煤日期的小纸片折好放回围裙。柜子里只剩一袋面粉，Josef当晚煮汤时多加了一勺水。
  _effects: food; relation acquaintance with person:evt:world-vienna-1912:007622:child_

- **1955.11** `vienna-market-debt.pawn-watch/pawn-whole-watch` tags: market, debt, money, home, shop
  你把银壳怀表推到绒布托盘上，当铺掌柜用放大镜扫了一眼机芯，报出八克朗。你盯着那张窄票上模糊的赎当日期，想起父亲在第十区工棚里上弦的样子。邻居在门外咳嗽，你捏着票和钱走出来，先拐去房东那里付了半个月的欠租。
  _effects: cash 8 (典当银壳怀表所得); mood -0.05999999999999994; flag +watch_pawned_

- **1956.01** `state_tick:wish-craft/craft-pressure/put-away` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_tick
  Josef暂时把那件事收进抽屉；日子还有别的东西要应付。
  _effects: mood -0.020000000000000018_

- **1956.01** `r13-civ.collect-signatures::ctx-vienna-postwar-1945::milieu-government/rejected-for-addresses` tags: politics, petition, signatures, institution, neighborhood, vienna, urban, postwar
  Ferdinand Bauer把签名纸翻过来，说地址不全，有几页只写了楼号没有门牌。Josef说那些人怕报复，Ferdinand Bauer说怕报复就别签名。纸被退回来，边角已经卷了。
  _effects: mood -0.039999999999999813; flag +petition_rejected_for_missing_addresses; knowledge “the office rejects petitions without a full address for ever”_

- **1956.01** `r15-curse.betrayal-at-table::ctx-vienna-postwar-1945::milieu-tenement/lie-that-stuck` tags: betrayal, social, family, trust, secret, vienna, urban, postwar
  Mitzi Bauer告诉所有人Josef偷了东西。没有人找到赃物，但每个人都在传。Josef去市场时，摊主把零钱放在柜台上，不再递到手里。
  _effects: mood -0.030000000000000027; reputation -0.1; flag +false_accusation; relation rival with person:evt:world-vienna-1912:007112:child; state_add public-scandal state:world-vienna-1912:1507_

- **1956.10** `p9-work-transport.foreman-favor/foreman-favor-ask` tags: work, factory, railway, transport, shift, labour, overtime, foreman
  Josef在工间休息时走到Otto Bauer面前，问加班到底按什么排。工头头也没抬，说名单是车间主任批的，就这八个人，嫌多事可以去隔壁车间问问。名单最终没改，Josef回到机床边，Elisabeth Berg递过来一支烟，也没说话。
  _effects: reputation -0.020000000000000018; relation colleague with person-materialized-world-vienna-1912-109_

- **1956.10** `vienna-church-community.saint-vincent-box/box-request-granted` tags: faith, social, family, home
  圣文生会的修女在登记簿上写下Josef的门牌号，递过面包券和一小袋土豆。Gustav Winter在旁边按了指印作保，说这户男人在工厂有活。
  _effects: food; relation acquaintance with person:evt:world-vienna-1912:000432:child; mood 0.030000000000000027_

- **1956.12** `r3-mig.resettlement-selection::ctx-vienna-postwar-1945::milieu-government/over-age-for-labor-quota` tags: migration, resettlement, selection, medicine, papers, vienna, urban, postwar
  Luise Lechner说安置国的劳工配额只要三十五岁以下，Josef的出生年份超了两岁。Emil Winter把自己的出生证明借出来，说可以改年份。Josef看着那张纸，最后没有接。Luise Lechner说“下一批也许放宽”，把档案合上了。
  _effects: mood -0.07999999999999996; flag +over_age_for_labor_quota; relation friend with person:evt:world-vienna-1912:007622:child; knowledge “the labor quota stops at thirty-five”_

- **1957.01** `r14-soc.favor-returned::ctx-vienna-postwar-1945::milieu-tenement/ten-kronen-back` tags: favor_returned, neighbor_rescue, gratitude, neighbor_conflict, care, vienna, urban, postwar
  Hermann Berg把十克朗压在糖罐下面，说那年的医药钱总算凑齐了。Josef数出五克朗推回去，说利息不收。两人在厨房里推来推去，最后把钱换成两袋煤，平分着搬进各自的门洞。两袋煤堆在门洞边，谁先烧完谁就去对方那里铲一铲。两家的门从此都留着一道缝。
  _effects: cash 10 (糖罐下面的十克朗); mood 0.07999999999999996; flag +favor_repaid_in_cash; relation friend with person-materialized-world-vienna-1912-51_
  _causes: evt:world-vienna-1912:016248_

- **1957.01** `r13-fam.look-for-lost-relative::ctx-vienna-postwar-1945::milieu-government/no-record` tags: task, family, missing, official, war, search, vienna, urban
  Luise Winter 3把三本名册都翻完，说没有这个人，也许登记时用了别的写法。Helene Bauer 4不肯走，又把名字念了一遍，念到第三遍时声音低下去。Josef扶她到走廊的长椅上坐下，替她把围巾重新系好；窗口后面已经叫了下一个号。
  _effects: cash -1 (念错的名字); condition; flag +missing_relative_no_record; relation kin with person-materialized-world-vienna-1912-170; knowledge “there is no record under the name the aunt remembers”; relation acquaintance with person-materialized-world-vienna-1912-170; relation acquaintance with person-materialized-world-vienna-1912-162_
## Rosa

Born 1912.01, died 1915.02 (age 3).
Education: none 0; occupation: none; roles: infant, child.

### State snapshot
- p22-family-legend [person] (ended 1915.2: replaced_by:p22-family-legend) parameters={"warmth":35,"secrecy":88,"danger":58,"promise":40} links={} ticks=1
- p22-child-omen [person] (ended 1915.2: owner_died) parameters={"strangeness":65,"attention":69,"protection":25,"fear":58} links={} ticks=1
- p22-family-legend [person] (ended 1915.2: owner_died) parameters={"warmth":65,"secrecy":35,"danger":15,"promise":55} links={} ticks=0

### 13 subject events

- **1912.02** `p22-comic-christening::ctx-vienna-1912::milieu-tenement/the-wrong-name` tags: infancy, family, christening, church, neighbor, comic, tender, drama
  神父念的是另一张纸条上的名字。Rosa Lechner小声纠正，Rosa正好吐出一口奶，落在登记簿边上；神父用袖子擦了擦，说这样也算盖过章了，只是纸角留下一小片湿痕。
  _effects: mood -0.010000000000000002; knowledge “洗礼时神父差点念错孩子的名字。”; flag +wrong_christening_name; cash -1 (a christening candle)_

- **1912.03** `vienna-life-infant-feeding/fed-enough` tags: infancy, food, household
  Rosa Lechner在Lechner-Wohnung, Leopoldstadt给Rosa喂奶，随后把洗净的布尿片挂在窗边。孩子吃饱后睡着了，锅里还留着半碗燕麦糊。
  _effects: cash -2 (milk and oatmeal)_

- **1912.07** `p22-strange-cradle-secret::ctx-vienna-1912::milieu-tenement/the-bundle-in-the-lining` tags: infancy, family, cradle, secret, inheritance, strange, dark, drama
  Alois Lechner拆洗摇篮衬里时，摸到一个硬角：一小块油布，里面包着一张当票和一缕头发，当票上的日期已经模糊。Alois Lechner看了很久，又把油布缝回去，针脚比原来更密。
  _effects: state_add p22-family-legend state:world-vienna-1912:19; mood -0.03; flag +cradle_bundle; knowledge “摇篮衬里藏着一张当票和一缕头发。”_

- **1912.07** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Rosa家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 80 -> 84; state_parameter p22-family-legend.warmth 35 -> 37; mood 0.01_
  _causes: evt:world-vienna-1912:000113_

- **1913.01** `vienna-life-toddler-wrong-cradle/the-neighbour-is-mistaken` tags: infancy, family, rumour, identity, comic, drama
  Rosa Lechner把被子摊在桌上，指着上面的补丁说这是外婆的针脚。Emil Weiss看了半天，承认自己认错了；Rosa在旁边把一只木勺敲得咚咚响，像在给这场争论判案。
  _effects: relation acquaintance with person-emil-weiss; mood 0.020000000000000004; skill_

- **1913.01** `state_tick:p22-family-legend/the-story-changes-hands/a-detail-goes-missing` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，故事里最要紧的那件东西不见了：先是名字，后来是地点。Rosa问起时，大人说“你记错了”；可柜子最底层那只空盒子，谁也没有扔，锁却换过了，钥匙也不见了。
  _effects: state_parameter p22-family-legend.secrecy 84 -> 88; state_parameter p22-family-legend.danger 55 -> 58; state_parameter p22-family-legend.warmth 37 -> 35; mood -0.01_

- **1913.02** `p22-strange-doctor-prediction::ctx-vienna-1912::milieu-tenement/the-doctor-writes-nothing` tags: infancy, family, doctor, illness, omen, strange, dark, drama
  医生听完胸口，提笔写了一句，又划掉，只留下一个墨团。他把纸折好，说“把屋子烧暖一点”；Rosa Lechner等医生走后，对着灯看那张纸，认出墨团底下露出半个“冬”字，灯芯正好爆了一下。
  _effects: state_add p22-child-omen state:world-vienna-1912:37; mood -0.04; knowledge “医生写下又划掉的诊断里，露出一个“冬”字。”_

- **1913.02** `vienna-life-birth-letter-from-the-dead/the-letter-is-real` tags: infancy, family, secret, letter, drama
  邮差把一封边角磨白的信塞进门缝，收信人是一个已经死了三年的名字。Rosa Lechner把Rosa放在膝上，拆开信，里面只有一句：“孩子像不像他？”Alois Lechner在门口探头，问是不是寄错了；Rosa Lechner把信折回去，说“没有寄错”。
  _effects: flag +letter_from_dead_relative; knowledge “一封写给死去亲人的信问：孩子像不像他。”; mood -0.04_

- **1914.01** `vienna-life-toddler-first-words/first-word-nonsense` tags: infancy, family, first, comic
  Rosa说了一长串谁也听不懂的话，最后用力点头，像是在宣布一件已经决定的事。Rosa Lechner认真听完，也点了点头；孩子满意地爬走了，留下大人们互相看着，忍不住笑。
  _effects: mood 0.04; skill_

- **1914.01** `state_tick:p22-child-omen/the-omen-returns/the-coincidence-repeats` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  又过了一年，同一件小事又发生了：钟停在同一个时刻，门口的狗对着空处叫。Rosa正在学系鞋带，抬头问“又来了吗”；大人说没有，手却先去摸门框，谁也没有回答。
  _effects: state_parameter p22-child-omen.strangeness 60 -> 65; state_parameter p22-child-omen.attention 65 -> 69; state_parameter p22-child-omen.fear 55 -> 58; mood -0.01_

- **1914.02** `vienna-life-toddler-accident/bruised-arm` tags: infancy, accident, family, danger, injury
  Rosa在楼梯口追一只滚下去的线轴，脚下一滑，胳膊先撞在铁扶手上。Rosa Lechner听见哭声跑出来，用冷水毛巾敷住那块青紫，嘴里说着“没事”，手却一直在抖。
  _effects: health -0.050000000000000044 (fell at the stairwell); condition; mood -0.03_

- **1915.02** `p22-warm-night-move::ctx-klosterneuburg-rural-1912::milieu-tenement/the-cradle-goes-first` tags: childhood, family, move, neighbor, tenement, warm, bittersweet, drama
  搬家定在夜里，怕白天遇见旧房东。Emil Weiss在前面打灯，Rosa Lechner抱着摇篮，Rosa抱着一只枕头跟在后面。新屋有一扇能看见院子的窗，孩子把枕头放在窗台上，说这是给月亮留的。
  _effects: mood 0.05; health 0.010000000000000009 (a less crowded room); relation acquaintance with person-phase15-Rosa-world-vienna-1912; cash -3 (moving at night); flag +moved_at_night; state_add p22-family-legend state:world-vienna-1912:43_

- **1915.02** `p22-drama-fire::ctx-klosterneuburg-rural-1912::milieu-tenement/the-smoke-takes-the-child` tags: childhood, family, fire, accident, neighbor, survival, dramatic, danger
  烟先灌满屋子，Rosa没有醒。Theresia Huber把摇篮搬到院子里时，孩子已经软了，邻居没有把摇篮放下；Rosa Lechner坐在楼梯上，手里攥着一只小鞋，鞋底还沾着灶灰，楼下的雪被踩成灰色。
  _effects: death (smoke inhalation in a tenement fire); mood -0.12; cash -6 (burial after the fire)_
## Emil

Born 1912.01, died 1925.02 (age 13).
Education: secondary 2; occupation: none; roles: infant, child.

### State snapshot
- wish-love [person] (ended 1925.2: owner_died) parameters={"intensity":0.55,"fixation":0.5,"irony":0.3} links={} ticks=1
- p22-family-legend [person] (ended 1912.6: replaced_by:p22-family-legend) parameters={"warmth":70,"secrecy":10,"danger":5,"promise":40} links={} ticks=0
- p22-family-legend [person] (ended 1913.3: replaced_by:p22-family-legend) parameters={"warmth":73,"secrecy":19,"danger":8,"promise":60} links={} ticks=1
- p22-family-legend [person] (ended 1920.1: duration expired) parameters={"warmth":61,"secrecy":64,"danger":28,"promise":59} links={} ticks=4
- yf18-first-awakening [person] (ended 1925.2: owner_died) parameters={"intensity":45,"nerve":25,"talk":0,"reciprocated":false,"secret":true} links={"beloved":"Klara"} ticks=0
- apprenticeship-contract [person] (ended 1925.2: owner_died) parameters={"progress":10,"failures":0,"trade":"木工","paid":true} links={} ticks=0

### 42 subject events

- **1912.03** `p22-comic-name-register::ctx-vienna-1912::milieu-tenement/the-name-is-corrected` tags: infancy, family, bureaucracy, name, official, comic, tender, drama
  Josef Bauer当场发现，要求改回来。登记员叹了口气，收了三克朗，把“嚏”划掉，在旁边写上正确的字，然后把笔搁下；Emil全程睡着，什么也没损失，只是那张纸被折成了四折。
  _effects: cash -3 (fee to correct the register); mood 0.019999999999999997; flag +name_corrected_

- **1912.06** `p22-warm-naming-feast::ctx-vienna-1912::milieu-tenement/the-name-is-too-long` tags: infancy, family, feast, name, neighbor, warm, tender, drama
  两个祖母的名字都想要，最后写在纸上连成一串。Emil Weiss念到一半就笑了，说这孩子以后签名字要多蘸一次墨水；Emil在摇篮里睡着，拳头举在耳边，蛋糕上只插了一根蜡烛。
  _effects: mood 0.04000000000000001; relation acquaintance with person-phase15-Emil-world-vienna-1912; flag +double_name; knowledge “我的名字里有两个祖母的名字。”; state_add p22-family-legend state:world-vienna-1912:14_

- **1912.11** `p22-comic-christening::ctx-vienna-1912::milieu-tenement/the-priest-sneezes` tags: infancy, family, christening, church, neighbor, comic, tender, drama
  神父念到孩子的名字时打了个大喷嚏，蜡烛灭了，Emil却笑出了声。Katharina Bauer赶紧去点蜡烛，手一抖，火苗又灭了；教堂里第一次有人笑，神父也笑了，说这是今天最响的一声阿门。
  _effects: mood 0.039999999999999994; relation acquaintance with person-phase15-Emil-world-vienna-1912; flag +christening_sneeze; state_add p22-family-legend state:world-vienna-1912:13_

- **1913.01** `vienna-life-infant-first-smile/smile-at-the-lamp` tags: infancy, family, first, warm
  Josef Bauer把Emil抱到窗边，煤汽灯罩上有一圈晃动的光。孩子盯着看了很久，忽然笑出声，口水滴在Josef Bauer的袖口上。屋里的人都停了一下，像是听见了什么了不起的消息。
  _effects: mood 0.04; health 0.010000000000000009 (a good day)_

- **1913.01** `state_tick:p22-family-legend/the-story-changes-hands/a-detail-goes-missing` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，故事里最要紧的那件东西不见了：先是名字，后来是地点。Emil问起时，大人说“你记错了”；可柜子最底层那只空盒子，谁也没有扔，锁却换过了，钥匙也不见了。
  _effects: state_parameter p22-family-legend.secrecy 15 -> 19; state_parameter p22-family-legend.danger 5 -> 8; state_parameter p22-family-legend.warmth 75 -> 73; mood -0.01_

- **1913.02** `vienna-life-toddler-wrong-cradle/the-swap-story-spreads` tags: infancy, family, rumour, identity, comic, drama
  三天后，整条楼道都在说这家的孩子“抱错了”。Josef Bauer抱着Emil去敲Hermann Kral的门，Hermann Kral不开，只在门里说“我也是听来的”。Emil在母亲怀里睡着了，口水把她的领口洇出一小片深色。
  _effects: flag +cradle_swap_rumour; relation rival with person-hermann-kral; mood -0.04999999999999999_

- **1913.03** `p22-strange-cradle-secret::ctx-vienna-1912::milieu-tenement/the-ticket-is-redeemed` tags: infancy, family, cradle, secret, inheritance, strange, dark, drama
  Josef Bauer拿着当票去赎，取回一把银勺子，勺柄上刻着一个看不清的字母。回家后把勺子塞进Emil手里，说“用吧”；孩子敲着桌沿，勺子发出很轻的响声，像在回答什么。
  _effects: cash -5 (redeeming the pawn ticket); health 0.009999999999999898 (a silver spoon to cut the first teeth); state_add p22-family-legend state:world-vienna-1912:31; flag +spoon_returned_

- **1913.03** `vienna-life-birth-letter-from-the-dead/the-letter-is-real` tags: infancy, family, secret, letter, drama
  邮差把一封边角磨白的信塞进门缝，收信人是一个已经死了三年的名字。Josef Bauer把Emil放在膝上，拆开信，里面只有一句：“孩子像不像他？”Anna Moser在门口探头，问是不是寄错了；Josef Bauer把信折回去，说“没有寄错”。
  _effects: flag +letter_from_dead_relative; knowledge “一封写给死去亲人的信问：孩子像不像他。”; mood -0.03999999999999998_

- **1914.01** `vienna-life-toddler-first-words/first-word-nonsense` tags: infancy, family, first, comic
  Emil说了一长串谁也听不懂的话，最后用力点头，像是在宣布一件已经决定的事。Josef Bauer认真听完，也点了点头；孩子满意地爬走了，留下大人们互相看着，忍不住笑。
  _effects: mood 0.03999999999999998; skill_

- **1914.01** `state_tick:p22-family-legend/the-story-changes-hands/a-detail-goes-missing` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，故事里最要紧的那件东西不见了：先是名字，后来是地点。Emil问起时，大人说“你记错了”；可柜子最底层那只空盒子，谁也没有扔，锁却换过了，钥匙也不见了。
  _effects: state_parameter p22-family-legend.secrecy 60 -> 64; state_parameter p22-family-legend.danger 25 -> 28; state_parameter p22-family-legend.warmth 55 -> 53; mood -0.01_

- **1914.08** `statistical_infection`
  Emil在Bauer-Wohnung, Leopoldstadt病倒了，痢疾让身体发热、虚弱，接下来的日子只能卧床。

- **1914.09** `statistical_recovery`
  Emil从痢疾中慢慢恢复，能下床喝水，但身体还虚弱。

- **1916.01** `vienna-life-child-first-friend/shared-toy` tags: childhood, friendship, family, comic
  Klara在楼道里滚一只铁环，Emil站在门口看。Klara把铁环推过来，说“你推一次，我推一次”。两个人从楼梯口推到院子里，铁环倒下的声音把午睡的大人吵醒了一排。
  _effects: relation friend with person-phase15-Klara-world-vienna-1912; skill; mood 0.05_

- **1916.01** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Emil家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 64 -> 68; state_parameter p22-family-legend.warmth 53 -> 55; mood 0.009999999999999998_
  _causes: evt:world-vienna-1912:000594_

- **1916.01** `state_tick:p22-family-legend/the-story-changes-hands/told-at-the-table` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，Emil家的故事在饭桌上换了新的讲法：多了一句笑话，少了一处哭声。听的人把汤匙放下，等下一句；讲故事的人却先去看窗子有没有关好，谁也没有先动筷子。
  _effects: state_parameter p22-family-legend.warmth 55 -> 58; state_parameter p22-family-legend.secrecy 68 -> 66; state_parameter p22-family-legend.promise 55 -> 57; mood 0.010000000000000002_

- **1917.02** `vienna-childhood-street.hoop/hoop-mother-call` tags: childhood, street, social, home
  窗户上的玻璃响了一下，有人探出头，让Emil立刻回家。铁环还在Josef Hofer脚边，Emil蹲下去抽，抽不动。Josef Hofer说除非明天把铁钩带来。Emil点头，Josef Hofer把脚一抬，铁环滚到Emil手边，上面沾了一层鞋底灰。
  _effects: relation friend with person-materialized-world-vienna-1912-20; relation friend with person-materialized-world-vienna-1912-20; mood -0.02; relation acquaintance with person-materialized-world-vienna-1912-20_

- **1918.01** `state_tick:p22-family-legend/the-story-changes-hands/told-at-the-table` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，Emil家的故事在饭桌上换了新的讲法：多了一句笑话，少了一处哭声。听的人把汤匙放下，等下一句；讲故事的人却先去看窗子有没有关好，谁也没有先动筷子。
  _effects: state_parameter p22-family-legend.warmth 58 -> 61; state_parameter p22-family-legend.secrecy 66 -> 64; state_parameter p22-family-legend.promise 57 -> 59; mood 0.009999999999999998_

- **1918.01** `p9-gap-childhood-chores.laundry-help/laundry-three-heller` tags: childhood, household, chores, school, task, daily, laundry, work
  “拽平，别留褶。”Hermann Kral在绳子那头喊。Emil踮着脚把床单拉直，碱水把指缝泡得发白。收工时天已经黑了，Hermann Kral数了三赫勒，又在围裙上擦干手才递过来。Emil把钱塞进袜筒，回家路上一直攥着，虎口的裂口沾了汗，火辣辣地疼。
  _effects: cash 0.03 (帮邻居晾床单挣的三赫勒); health -0.030000000000000027 (碱水泡手，虎口裂开); relation acquaintance with person-hermann-kral; relation acquaintance with person-materialized-world-vienna-1912-14_

- **1918.04** `statistical_infection`
  Emil在Haus der Tante in Klosterneuburg病倒了，伤寒让身体发热、虚弱，接下来的日子只能卧床。

- **1918.06** `statistical_illness_worsened`
  Emil的伤寒没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1918.09** `statistical_illness_worsened`
  Emil的伤寒没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1918.10** `statistical_recovery`
  Emil熬过了这场伤寒，能坐起来喝一点汤，但身体还很虚。

- **1918.12** `statistical_infection`
  Emil在Haus der Tante in Klosterneuburg病倒了，伤寒让身体发热、虚弱，接下来的日子只能卧床。

- **1919.01** `p9-gap-childhood-chores.market-line/line-both-families` tags: childhood, household, chores, school, task, daily, market, food
  Anton Bauer把Emil拽到队伍前头，往自己身前塞，说“孩子占不了多大地儿”。窗口一次递出两包面包，Emil把邻居那包夹在胳肢窝，自己这包抱在胸前。到Haus der Tante in Klosterneuburg门口，Emil蹲下把两包并排，按Anton Bauer说的份量分开，连找零的铜板也分成两小堆。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-6; skill; relation acquaintance with person-materialized-world-vienna-1912-6_

- **1919.03** `statistical_illness_worsened`
  Emil的伤寒没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1919.06** `statistical_recovery`
  Emil熬过了这场伤寒，能坐起来喝一点汤，但身体还很虚。

- **1919.11** `vienna-childhood-street.cigarette-card/card-stolen` tags: childhood, street, social, home
  巷口有人跑过来，肩膀撞在Emil的胳膊上。烟画卡脱手，被风卷到路中间。Emil追了两步，鞋底在湿石板上打滑，手掌先着地。Josef从后面追上去，在拐角抓住那男孩的袖子，布条撕下来一截，人还是跑了。
  _effects: mood -0.08; relation friend with person-phase15-Josef-world-vienna-1912; condition_

- **1920.01** `state_expire:p22-family-legend` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  Emil的「家族传说」到期；相关安排结束。
  _effects: state_remove p22-family-legend state:world-vienna-1912:31_

- **1920.01** `p9-gap-childhood-chores.laundry-help/laundry-dragged-docked-pay` tags: childhood, household, chores, school, task, daily, laundry, work
  “你看看这角。”Hedwig Stein把床单拎起来，煤渣簌簌往下掉。Emil伸手去拍，反而把灰按进布纹里。Hedwig Stein从工钱里数回两枚，只留一赫勒在Emil手心，让重洗那角。晚饭前Emil一直蹲在井台边，换了两盆水，指甲缝里全是黑泥。
  _effects: cash 0.01 (被扣后只剩一赫勒); mood -0.049999999999999996; relation acquaintance with person-hedwig-stein_

- **1921.01** `p9-gap-childhood-chores.market-line/line-sold-out-potatoes` tags: childhood, household, chores, school, task, daily, market, food
  “卖完了。”三个字从窗口里传出来，Emil后面的队伍立刻散了一半。Emil没走，趴在窗台上看伙计扫面屑，直到人家挥手赶人。旁边摊子的土豆带着泥，Emil用围裙兜住，一枚一枚数铜板，回家报账时连找零都说清了。
  _effects: food; mood -0.03; skill; relation acquaintance with person-materialized-world-vienna-1912-24; relation acquaintance with person-materialized-world-vienna-1912-30_

- **1922.01** `p9-gap-childhood-chores.laundry-help/laundry-three-heller` tags: childhood, household, chores, school, task, daily, laundry, work
  床单浸了碱水，沉得拽不动。Emil站在木凳上，把湿布一点点递过绳，水顺着肘弯滴进袖口。Elisabeth Bauer 2在绳头数夹子，最后一条挂好，从围裙口袋里摸出三枚赫勒，按进Emil掌心。晚上洗手时，虎口那道口子被水一蜇，Emil才看见。
  _effects: cash 0.03 (帮邻居晾床单挣的三赫勒); relation acquaintance with person-materialized-world-vienna-1912-14_

- **1922.03** `vienna-childhood-friends.hidden-book/book-borrowed-and-returned` tags: childhood, social, school, street
  书在Emil的书包里藏了三天，课间才敢翻两页。还书那天，Emil把书角淋皱的事先说了，又把书页一张张抚平。Anna Bauer 2翻到最后一页，看了看书脊，说下次别带进院子，书却还是借给了Emil。
  _effects: skill; relation acquaintance with person-materialized-world-vienna-1912-13; relation acquaintance with person-materialized-world-vienna-1912-13_

- **1922.05** `vienna-childhood-street.cigarette-card/card-gift` tags: childhood, street, social, home
  Emil每天放学都在柜台前站一会儿，看玻璃板底下压着的烟画，顺手把歪了的报纸摞齐。Lena擦完柜台，从抽屉最里面摸出一张揉皱的风景卡，边角还沾着烟丝，塞过来时说了句“别挡着门”。Emil把卡夹进课本，第二天带了一张重复的来给Lena看。
  _effects: mood 0.06; reputation 0.02; relation friend with person-phase15-Lena-world-vienna-1912_

- **1923.01** `p9-gap-childhood-chores.market-line/line-sold-out-potatoes` tags: childhood, household, chores, school, task, daily, market, food
  “卖完了。”三个字从窗口里传出来，Emil后面的队伍立刻散了一半。Emil没走，趴在窗台上看伙计扫面屑，直到人家挥手赶人。旁边摊子的土豆带着泥，Emil用围裙兜住，一枚一枚数铜板，回家报账时连找零都说清了。
  _effects: food; mood -0.03; skill; relation acquaintance with person-materialized-world-vienna-1912-4; relation acquaintance with person-materialized-world-vienna-1912-39_

- **1924.01** `state_tick:wish-love/love-pressure/press-on` tags: wish-love, wish, wish:love, love, family, intimacy, state, state_tick
  Emil又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.020000000000000004; flag +wish:love:pursuing_

- **1924.08** `statistical_infection`
  Emil在Leopoldstädter Zinshaus, gemeinsamer Gang病倒了，伤寒让身体发热、虚弱，接下来的日子只能卧床。

- **1924.09** `statistical_illness_worsened`
  Emil的伤寒没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1924.12** `statistical_illness_worsened`
  Emil的伤寒没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1925.01** `r13-edu.boarding-school::ctx-vienna-reform-1930::milieu-tenement/admitted-to-dormitory` tags: education, boarding_school, residence, family, scholarship, reform, medical, schooling
  Emil把铁皮箱绑在自行车后座，骑了三十里到寄宿学校。舍监检查行李，把家里的腌菜罐没收，说会招老鼠。Emil在熄灯后偷偷把罐子从垃圾堆捡回来，藏在床底，第一顿饭就着腌菜吃完了两碗粥。第一个星期Emil把腌菜分给同屋，换回三张邮票和一支不漏水的钢笔。
  _effects: flag +boarding_school_admitted; education secondary_

- **1925.02** `yf18-firstlook.tram-glove::ctx-vienna-reform-1930::milieu-tenement/return-it-at-the-gate` tags: first_love, love, tram, glove, youth, courtship, reform, medical
  下一站，Emil追下车，把那只手套递还给Klara。Klara说了一声谢谢，手指在毛线手套里缩了一下；Emil回到车上才发现自己坐过了两站，只好沿着环城路走回家。
  _effects: state_add yf18-first-awakening state:world-vienna-1912:117; relation friend with person-phase15-Klara-world-vienna-1912; mood 0.03; flag +yf18_first_awakening_active_

- **1925.02** `r15-work.master-takes-on::ctx-vienna-reform-1930::milieu-tenement/signed-contract` tags: work, craft, apprentice, trade, poverty, reform, medical, schooling
  Maria Bauer把学徒契约摊在桌上，指给Emil看期限、工钱和出师考试。Emil签了名，第二天站到刨床前，手指上多了第一道木刺。
  _effects: relation employer with person-materialized-world-vienna-1912-26; state_add apprenticeship-contract state:world-vienna-1912:118; relation acquaintance with person-materialized-world-vienna-1912-26; education apprenticeship; role_

- **1925.02** `statistical_death/other` tags: death
  Emil在Leopoldstädter Zinshaus, gemeinsamer Gang突发急病，高热和虚弱持续了几天。医生没能给出明确诊断，Emil在一个夜里去世。Elisabeth Bauer在场。
  _effects: death (急性疾病); flag -yf18_first_awakening_active; role_
## Lena

Born 1912.01, died 1945.02 (age 33).
Education: apprenticeship 1; occupation: none; roles: infant, child, pupil, first_aid_certified, teacher_of_parent, office:顾问, office:师傅, separated, watched_by_police, liberated_1945.

### State snapshot
- p22-child-omen [person] (ended 1913.5: replaced_by:p22-child-omen) parameters={"strangeness":45,"attention":39,"protection":45,"fear":23} links={} ticks=1
- p22-family-legend [person] (ended 1918.1: duration expired) parameters={"warmth":38,"secrecy":86,"danger":58,"promise":42} links={} ticks=3
- p22-child-omen [person] (ended 1918.1: duration expired) parameters={"strangeness":43,"attention":39,"protection":47,"fear":20} links={} ticks=3
- apprenticeship-contract [person] (ended 1928.1: the master ended the contract) parameters={"progress":26,"failures":2,"trade":"木工","paid":false} links={} ticks=3
- yf18-runaway-plan [person] (ended 1929.1: duration expired) parameters={"preparation":32,"suspicion":10,"resolve":33,"destination":"格拉茨","ticket":false} links={} ticks=2
- yf18-first-awakening [person] (ended 1929.1: duration expired) parameters={"intensity":58,"nerve":43,"talk":0,"reciprocated":true,"secret":true} links={"beloved":"Klara"} ticks=2
- failed-apprentice [person] (ended 1937.1: duration expired) parameters={} links={} ticks=1
- p22-wild-fortune [person] (ended 1934.1: duration expired) parameters={"height":64,"absurdity":68,"witnesses":75,"fragility":57} links={} ticks=2
- p22-scandal-engine [person] (ended 1934.1: duration expired) parameters={"heat":52,"reach":65,"leverage":46,"shame":46} links={} ticks=2
- pc20-second-chance [person] (ended 1935.1: replaced_by:pc20-second-chance) parameters={"credibility":55,"debt":40,"hope":65,"suspicion":30} links={} ticks=0
- ad20-private-bargain [person] (ended 1936.1: duration expired) parameters={"leverage":62,"trust":55,"debt":63,"exit":22} links={"beneficiary":"Hermann Weiss"} ticks=3
- pc20-second-chance [person] (ended 1938.1: duration expired) parameters={"credibility":29,"debt":58,"hope":29,"suspicion":53} links={} ticks=3
- office-under-siege [person] (ended 1938.1: duration expired) parameters={"exposure":40,"support":54,"months":1,"cause":"newspaper photograph","positionId":"pos:zoo:person-karl-kraus-evt:world-vienna-1912:003673:顾问:5676"} links={} ticks=2
- debt-bondage [person] (ended 1943.1: duration expired) parameters={"debt":28,"creditor":"死者家属"} links={} ticks=3

### 171 subject events

- **1912.04** `p22-strange-doctor-prediction::ctx-vienna-1912::milieu-tenement/the-doctor-is-optimistic` tags: infancy, family, doctor, illness, omen, strange, dark, drama
  医生说孩子只是瘦，开了一瓶味道很坏的补药，说“过了春天就好了”。Josefine Hofer把这句话记了很多年；每年春天，家里都要说一遍，像在核对一张旧账单，药瓶上还贴着手写的标签。
  _effects: mood 0.03; health 0.009999999999999898 (a tonic and a hopeful sentence); state_add p22-child-omen state:world-vienna-1912:17; flag +doctor_optimism_

- **1912.07** `p22-comic-christening::ctx-vienna-1912::milieu-tenement/the-wrong-name` tags: infancy, family, christening, church, neighbor, comic, tender, drama
  神父念的是另一张纸条上的名字。Josefine Hofer小声纠正，Lena正好吐出一口奶，落在登记簿边上；神父用袖子擦了擦，说这样也算盖过章了，只是纸角留下一小片湿痕。
  _effects: mood -0.010000000000000002; knowledge “洗礼时神父差点念错孩子的名字。”; flag +wrong_christening_name; cash -1 (a christening candle)_

- **1912.10** `vienna-life-infant-first-smile/smile-at-the-lamp` tags: infancy, family, first, warm
  Josefine Hofer把Lena抱到窗边，煤汽灯罩上有一圈晃动的光。孩子盯着看了很久，忽然笑出声，口水滴在Josefine Hofer的袖口上。屋里的人都停了一下，像是听见了什么了不起的消息。
  _effects: mood 0.04; health 0.010000000000000009 (a good day)_

- **1913.01** `vienna-life-toddler-first-words/first-word-door` tags: infancy, family, first, comic
  门外有人上楼，Lena忽然指着门说：“爸爸。”Josefine Hofer看了看空门口，没有纠正。那天晚上，孩子把家里每个人的名字都叫了一遍，叫错两个，却叫得很认真。
  _effects: skill; mood 0.020000000000000004; flag +first_word_door_

- **1913.01** `state_tick:p22-child-omen/the-omen-returns/the-coincidence-repeats` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  又过了一年，同一件小事又发生了：钟停在同一个时刻，门口的狗对着空处叫。Lena正在学系鞋带，抬头问“又来了吗”；大人说没有，手却先去摸门框，谁也没有回答。
  _effects: state_parameter p22-child-omen.strangeness 40 -> 45; state_parameter p22-child-omen.attention 35 -> 39; state_parameter p22-child-omen.fear 20 -> 23; mood -0.01_

- **1913.02** `vienna-life-toddler-wrong-cradle/the-blanket-is-wrong` tags: infancy, family, rumour, identity, comic, drama
  Hermann Kral盯着Lena的摇篮看了很久，说这床蓝被子不是这家人的。Josefine Hofer把被子翻过来，角落绣着一个陌生的姓；Lena却抓着被角不放，像是认得它。Hermann Kral退后一步，说“我什么都没说”。
  _effects: flag +wrong_cradle_blanket; knowledge “摇篮里的蓝被子绣着一个陌生的姓。”; mood -0.03_

- **1913.05** `p22-strange-doctor-prediction::ctx-vienna-1912::milieu-tenement/the-doctor-is-optimistic` tags: infancy, family, doctor, illness, omen, strange, dark, drama
  医生说孩子只是瘦，开了一瓶味道很坏的补药，说“过了春天就好了”。Josefine Hofer把这句话记了很多年；每年春天，家里都要说一遍，像在核对一张旧账单，药瓶上还贴着手写的标签。
  _effects: mood 0.03; state_add p22-child-omen state:world-vienna-1912:34_

- **1913.10** `p22-strange-cradle-secret::ctx-vienna-1912::milieu-tenement/the-bundle-in-the-lining` tags: infancy, family, cradle, secret, inheritance, strange, dark, drama
  Josefine Hofer拆洗摇篮衬里时，摸到一个硬角：一小块油布，里面包着一张当票和一缕头发，当票上的日期已经模糊。Josefine Hofer看了很久，又把油布缝回去，针脚比原来更密。
  _effects: state_add p22-family-legend state:world-vienna-1912:33; mood -0.03; flag +cradle_bundle; knowledge “摇篮衬里藏着一张当票和一缕头发。”_

- **1914.01** `state_tick:p22-family-legend/the-story-changes-hands/told-at-the-table` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，Lena家的故事在饭桌上换了新的讲法：多了一句笑话，少了一处哭声。听的人把汤匙放下，等下一句；讲故事的人却先去看窗子有没有关好，谁也没有先动筷子。
  _effects: state_parameter p22-family-legend.warmth 35 -> 38; state_parameter p22-family-legend.secrecy 80 -> 78; state_parameter p22-family-legend.promise 40 -> 42; mood 0.01_

- **1914.01** `state_tick:p22-child-omen/the-omen-returns/the-coincidence-repeats` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  又过了一年，同一件小事又发生了：钟停在同一个时刻，门口的狗对着空处叫。Lena正在学系鞋带，抬头问“又来了吗”；大人说没有，手却先去摸门框，谁也没有回答。
  _effects: state_parameter p22-child-omen.strangeness 40 -> 45; state_parameter p22-child-omen.attention 35 -> 39; state_parameter p22-child-omen.fear 20 -> 23; mood -0.01_

- **1914.02** `vienna-life-toddler-accident/bruised-arm` tags: infancy, accident, family, danger, injury
  Lena在楼梯口追一只滚下去的线轴，脚下一滑，胳膊先撞在铁扶手上。Josefine Hofer听见哭声跑出来，用冷水毛巾敷住那块青紫，嘴里说着“没事”，手却一直在抖。
  _effects: health -0.050000000000000044 (fell at the stairwell); condition; mood -0.03_

- **1915.02** `vienna-early-childhood.stairwell-fall/neighbor-carries` tags: childhood, family, home, street, injury
  Hermann Kral的煤桶磕在楼梯转角，煤块滚了一地。Lena坐在平台上，膝盖渗出血珠。Hermann Kral把桶一放，夹起Lena进了自家门，用温水冲伤口，又拿一块干面包塞过来。Josefine Hofer赶来时，Lena正坐在厨房凳上啃面包。
  _effects: health -0.020000000000000018 (膝盖擦破，已冲洗); food; relation acquaintance with person-josefine-hofer_

- **1915.02** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Lena家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 78 -> 82; state_parameter p22-family-legend.warmth 38 -> 40; mood 0.01_
  _causes: evt:world-vienna-1912:000436_

- **1915.02** `vienna-life-child-family-legend/stolen-inheritance` tags: childhood, family, secret, story
  Josefine Hofer说，家里本来有一件东西，后来被“更会说话的人”拿走了。Lena问是什么，Josefine Hofer只说是一块表，表盖里刻着姓。孩子记住了“表盖里刻着姓”，却没有记住那个姓。
  _effects: knowledge “家里有一块表盖里刻着姓的表，被一个更会说话的人拿走了。”; flag +family_legend_watch_

- **1915.11** `p9-childhood-household.supper-bowl/saved-bread-for-morning` tags: childhood, family, household, home, siblings, illness, neighbors
  面包分到Lena手里时，Lena说在巷口吃过了，把它搁在桌角，用一块干净布盖上。夜里Lena翻来覆去，胃里像有只手在拧，Anton的呼吸倒很匀。天亮后Josefine Hofer掀开布，面包边已经硬得发白，Josefine Hofer拿刀切成三份。
  _effects: food; relation kin with person-josefine-hofer_

- **1916.01** `vienna-life-child-first-friend/imaginary-friend` tags: childhood, friendship, family, comic
  院子里没有别的孩子，Lena给墙上的裂纹起了一个名字，每天吃饭时给它留一个位置。家里的人没有纠正，只在摆碗时多放一只空碗；Hedwig从门口经过，问Lena在等谁。
  _effects: skill; flag +imaginary_friend_

- **1916.01** `state_tick:p22-family-legend/the-story-changes-hands/a-detail-goes-missing` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，故事里最要紧的那件东西不见了：先是名字，后来是地点。Lena问起时，大人说“你记错了”；可柜子最底层那只空盒子，谁也没有扔，锁却换过了，钥匙也不见了。
  _effects: state_parameter p22-family-legend.secrecy 82 -> 86; state_parameter p22-family-legend.danger 55 -> 58; state_parameter p22-family-legend.warmth 40 -> 38; mood -0.01_

- **1916.01** `state_tick:p22-child-omen/the-omen-returns/nothing-happens` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  又过了一年，什么也没有发生。Lena照常吃饭、摔跤、把鞋穿反；那个说过预言的人搬走了。家里把红绳解下来，却没有扔，只收进针线盒最里面，红绳上落了一点灰。
  _effects: state_parameter p22-child-omen.strangeness 45 -> 43; state_parameter p22-child-omen.fear 23 -> 20; state_parameter p22-child-omen.protection 45 -> 47; mood 0.01_

- **1916.07** `vienna-early-childhood.fever-night/home-remedy` tags: childhood, family, home, street
  Lena烧得翻来覆去，Josefine Hofer把醋倒进温水，用布蘸着擦手心、脚心，又去灶间煮接骨木汁。勺子送到嘴边，Lena偏头躲，Josefine Hofer就等一会儿再喂。鸡叫时炉火压小，床脚用旧大衣堵住。两天后热度退了，嘴唇起了一层干皮。
  _effects: health 0.03 (土法退烧，热度渐退); mood -0.06_

- **1917.01** `vienna-life-child-inherited-wish/the-dead-grandmothers-wish` tags: childhood, family, wish, grief, uncanny, drama
  Lena在饭桌上忽然说：“等我长大了，要把那间屋子买回来。”Josefine Hofer的勺子停在半空，因为这句话是去世多年的外婆常说的，连“那间屋子”都指得一模一样。Lena说完就低头喝汤，好像只是随口。
  _effects: flag +inherited_wish_house; knowledge “孩子说要把“那间屋子”买回来，和去世的外婆说过的一模一样。”; mood -0.01_

- **1917.09** `statistical_infection`
  Lena在Hofer-Wohnung, Leopoldstadt病倒了，肺炎让身体发热、虚弱，接下来的日子只能卧床。

- **1917.12** `statistical_illness_worsened`
  Lena的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1918.01** `vienna-life-school-enrolment/enrolled` tags: childhood, school, fees
  Josefine Hofer带Lena到Leopoldstädter Volksschule报名。Maria Moser在名册上写下孩子的姓名和出生月份，收了两克朗书本费，让孩子第二天带一块石板来。
  _effects: education primary; cash -2 (school books（其中2克朗记入债务）); role; relation acquaintance with person-materialized-world-vienna-1912-15; relation acquaintance with person-materialized-world-vienna-1912-15_

- **1918.01** `state_expire:p22-family-legend` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  Lena的「家族传说」到期；相关安排结束。
  _effects: state_remove p22-family-legend state:world-vienna-1912:33_

- **1918.01** `state_expire:p22-child-omen` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  Lena的「孩子身上的兆头」到期；相关安排结束。
  _effects: state_remove p22-child-omen state:world-vienna-1912:34_

- **1918.01** `p9-gap-childhood-chores.fetch-coal/coal-neighbor-speaks` tags: childhood, household, chores, school, task, daily, coal, errand
  “记我名下。”Josefine Hofer说完，掌柜才把秤砣挪开。账本上多出两赫勒的利息，煤筐却只装了半下。Lena跟着Josefine Hofer走出门，Josefine Hofer低声嘱咐明天先把钱送来，别让掌柜再找到话头。
  _effects: cash -0.02 (赊账添的两赫勒利息（其中0.02克朗记入债务）); food; relation acquaintance with person-josefine-hofer_

- **1918.02** `statistical_recovery`
  Lena从肺炎中慢慢恢复，能下床喝水，但身体还虚弱。

- **1918.05** `p22-comic-job-or-child::ctx-vienna-university-1912::milieu-school/the-child-comes-to-work` tags: childhood, family, work, laundry, neighbor, comic, tender, drama
  家长会和工作撞在同一天。Josefine Hofer把Lena带进洗衣房，孩子坐在一堆待叠的床单中间，把袜子按颜色排成队，还唱了学校学的那首歌。老板娘笑得直不起腰，准了半天假。
  _effects: mood 0.04000000000000001; mood 0.03; cash 2 (half a day's wages kept); flag +laundry_day_

- **1919.01** `vienna-life-school-day/recites` tags: childhood, school, hunger
  Hermann Bauer让Lena站到黑板前背乘法表。孩子背到七乘八时停了一下，还是背完了；放学时手指冻得发红，石板上的字被袖子擦掉一半，Hermann Bauer在名册上给了一个小小的勾，Lena把石板抱在胸前，一路没舍得放进书包。
  _effects: education primary; relation acquaintance with person-materialized-world-vienna-1912-22_

- **1919.01** `p9-gap-childhood-chores.laundry-help/laundry-dragged-docked-pay` tags: childhood, household, chores, school, task, daily, laundry, work
  “你看看这角。”Hermann Kral把床单拎起来，煤渣簌簌往下掉。Lena伸手去拍，反而把灰按进布纹里。Hermann Kral从工钱里数回两枚，只留一赫勒在Lena手心，让重洗那角。晚饭前Lena一直蹲在井台边，换了两盆水，指甲缝里全是黑泥。
  _effects: cash 0.01 (被扣后只剩一赫勒); mood -0.05; relation acquaintance with person-hermann-kral; relation acquaintance with person-materialized-world-vienna-1912-23_

- **1920.01** `p9-gap-childhood-chores.market-line/line-both-families` tags: childhood, household, chores, school, task, daily, market, food
  Helene Winter把Lena拽到队伍前头，往自己身前塞，说“孩子占不了多大地儿”。窗口一次递出两包面包，Lena把邻居那包夹在胳肢窝，自己这包抱在胸前。到Leopoldstädter Zinshaus, gemeinsamer Gang门口，Lena蹲下把两包并排，按Helene Winter说的份量分开，连找零的铜板也分成两小堆。
  _effects: food; relation acquaintance with person-helene-winter; skill; relation acquaintance with person-materialized-world-vienna-1912-31_

- **1920.07** `vienna-school-childhood.spelling-bee/spelling-bee.fail` tags: school, social, childhood
  “Notwendigkeit”少了一个字母，Anna Bauer 2没说话，只敲了敲桌角。Lena回家时手指上全是墨水，母亲问起，只说写了点作业。
  _effects: mood -0.06; skill; relation acquaintance with person-materialized-world-vienna-1912-13; relation acquaintance with person-materialized-world-vienna-1912-13_

- **1920.11** `r1-child.bully-teacher-son::ctx-vienna-university-1912::milieu-school/fought-in-the-snow` tags: bullying, school, teacher, class, fear, university, culture, schooling
  Lena在放学路上把教师儿子推倒在雪里，两个人滚成一团。Hermann Bauer赶来时，先扶起自己的儿子，再问Lena为什么打人。Lena说她先切我的橡皮。Hermann Bauer说一块橡皮也值得动手？那天Lena在走廊站到天黑。
  _effects: reputation -0.08; flag +fought_teachers_son; relation rival with person-materialized-world-vienna-1912-22_

- **1921.01** `p9-gap-childhood-chores.school-slate/slate-bought-secondhand` tags: childhood, household, chores, school, task, daily, supplies, education
  Josefine Hofer把八个赫勒排成三摞，最后还差两枚，向摊主说了句好话，才把石板和一支石笔一起拿走。石板背面有一道旧划痕，Lena用指甲抠了抠，抠不掉。回家路上Lena把石板贴在胸口，隔着布也能感觉到石头的凉。
  _effects: cash -0.08 (买二手石板和石笔); skill; relation kin with person-josefine-hofer_

- **1922.01** `p9-gap-childhood-chores.market-line/line-sold-out-potatoes` tags: childhood, household, chores, school, task, daily, market, food
  木窗“咔”地合上，Lena的布袋还敞着口。伙计隔着板缝说下星期再来。Lena在墙根站了一会儿，把硬币排在掌心数了两遍，走到旁边土豆摊前，挑了几个小的，让摊主当面过秤。家里人晚上把钱和土豆倒在桌上，重新数了一遍。
  _effects: food; mood -0.03; skill; relation acquaintance with person-materialized-world-vienna-1912-20_

- **1922.12** `r14-edu.boarding-arrival::ctx-vienna-university-1912::milieu-school/cold-dormitory` tags: education, boarding_isolation, boarding_school, childhood, university, culture, schooling, school
  Friedrich Hofer把Lena领到三楼的宿舍，指着一张靠窗的铁床，说被子每周三换。床垫上有一道凹痕，是上一个学生留下的。Berta Moser 2在对面铺被子，没有抬头。窗外是操场，雾很大，旗杆只露出半截。
  _effects: mood -0.08; flag +boarding_school_arrival; relation acquaintance with person-materialized-world-vienna-1912-44; relation acquaintance with person-materialized-world-vienna-1912-44_

- **1923.01** `p9-gap-childhood-chores.laundry-help/laundry-three-heller` tags: childhood, household, chores, school, task, daily, laundry, work
  床单浸了碱水，沉得拽不动。Lena站在木凳上，把湿布一点点递过绳，水顺着肘弯滴进袖口。Hedwig Stein在绳头数夹子，最后一条挂好，从围裙口袋里摸出三枚赫勒，按进Lena掌心。晚上洗手时，虎口那道口子被水一蜇，Lena才看见。
  _effects: cash 0.03 (帮邻居晾床单挣的三赫勒); relation acquaintance with person-hedwig-stein; relation acquaintance with person-materialized-world-vienna-1912-14_

- **1924.01** `r14-edu.boarding-letter::ctx-vienna-university-1912::milieu-school/letter-read-aloud` tags: education, boarding_isolation, letter, childhood, university, culture, schooling, school
  Friedrich Hofer查房时从枕头套里翻出那封信，在晨会上念了两段。念到“这里的饭像喂牲口”时，下面有人笑。Lena站在队列里，看见Berta Moser 2低着头。散会后，Friedrich Hofer让Lena把信抄十遍，贴在布告栏上。
  _effects: mood -0.18; reputation -0.09999999999999999; flag +letter_read_aloud; relation rival with person-friedrich-hofer_
  _causes: evt:world-vienna-1912:001969_

- **1924.01** `kernel-edu.prepare-for-exam::ctx-vienna-university-1912::milieu-school/edu-prepare-success` tags: task, adolescence, school, exam, study, university, culture, schooling
  Lena从Mitzi那里借来一本旧课本，缺了最后十页。两人每晚在厨房桌上抄题，Mitzi念，Lena写。考试那天，最后一道大题正好是抄过的题型，Lena把答案写得满满当当。成绩出来那天，Lena把借来的课本还了回去。
  _effects: skill; skill; reputation 0.04000000000000001; relation acquaintance with person-materialized-world-vienna-1912-15; flag +prepared_with_borrowed_book_

- **1924.02** `r13-turn.exam-failure::ctx-vienna-university-1912::milieu-school/retake-fee` tags: education, exam, failure, school, work, university, culture, schooling
  成绩单上差两分。Maria Moser说可以补考，但要先交一克朗卷子费，还得让Josefine Hofer来签字。Josefine Hofer在办公室门口把帽子捏变了形，说家里拿不出这份钱。Lena把错题抄到烟盒背面，第二天照样去上课，只是不再举手。
  _effects: cash -1 (落榜名单上的第三个名字); mood -0.15000000000000002; condition; flag +failed_entrance_exam; skill; relation guardian with person-josefine-hofer_

- **1924.02** `p9-childhood-adolescence.courtyard-gang/gang-bring-younger-neighbor` tags: adolescence, friendship, identity, work, school, secret, church
  Lena拉上隔壁更小的Mitzi一起去桥下，回程时那孩子的母亲堵在院门口，说Lena带坏了她家孩子，声音大得半条街都听见。
  _effects: reputation -0.04000000000000001; relation acquaintance with person-phase15-Mitzi-world-vienna-1912; mood -0.010000000000000009_

- **1924.10** `r13-turn.exam-failure::ctx-vienna-reform-1930::milieu-tenement::reform-open-secondary/retake-fee` tags: education, exam, failure, school, work, reform, medical, schooling
  成绩单上差两分。Maria Moser说可以补考，但要先交一克朗卷子费，还得让Friedrich Hofer来签字。Friedrich Hofer在办公室门口把帽子捏变了形，说家里拿不出这份钱。Lena把错题抄到烟盒背面，第二天照样去上课，只是不再举手。
  _effects: cash -1 (落榜名单上的第三个名字); mood -0.15000000000000002; skill; relation guardian with person-friedrich-hofer_

- **1925.01** `r13-edu.boarding-school::ctx-vienna-reform-1930::milieu-school/admitted-to-dormitory` tags: education, boarding_school, residence, family, scholarship, reform, medical, schooling
  Lena把铁皮箱绑在自行车后座，骑了三十里到寄宿学校。舍监检查行李，把家里的腌菜罐没收，说会招老鼠。Lena在熄灯后偷偷把罐子从垃圾堆捡回来，藏在床底，第一顿饭就着腌菜吃完了两碗粥。第一个星期Lena把腌菜分给同屋，换回三张邮票和一支不漏水的钢笔。
  _effects: flag +boarding_school_admitted; education secondary_

- **1925.02** `r15-work.master-takes-on::ctx-vienna-reform-1930::milieu-school/unpaid-trial` tags: work, craft, apprentice, trade, poverty, reform, medical, schooling
  Berta Weiss先说试三个月，不给工钱，只管一顿午饭。家里同意了，因为多一张嘴比多一双手更难。Lena每天最早到，最晚走，三个月后师傅才把契约拿出来。
  _effects: food; mood -0.040000000000000036; state_add apprenticeship-contract state:world-vienna-1912:119; education apprenticeship; role_

- **1926.01** `vienna-life-apprenticeship/printshop-apprentice` tags: adolescence, work, apprenticeship, employment
  Buchdruckerei Winter & Söhne让Lena下周一到排字房报到，先搬铅字和扫地，月薪十八克朗。家里用第一笔预付工资买了双结实的鞋。
  _effects: education apprenticeship; employment Schriftsetzerlehrling @ org-winter-print; cash 6 (apprentice advance)_

- **1926.01** `state_tick:apprenticeship-contract/workshop-year/learned` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Lena又学会了一道工序。师傅没有夸，只把下一块料推到面前。
  _effects: state_parameter apprenticeship-contract.progress 8 -> 28; skill; mood 0.020000000000000018_

- **1926.01** `r13-civ.first-aid-course::ctx-vienna-reform-1930::milieu-tenement/certificate-earned` tags: health, first_aid, course, skill, school, reform, medical, schooling
  Alois Weiss把一条绷带绕在Lena的小臂上，教怎么打结才不会勒住血管。Lena在同桌的手臂上练了三遍，最后一遍得到了点头。课程结束时，Alois Weiss发了一张油印证书，上面盖着红十字的章。
  _effects: flag +earned_first_aid_certificate; role; skill; knowledge “a bandage must be tight enough to hold but loose enough for ”; relation acquaintance with person-materialized-world-vienna-1912-49_

- **1926.10** `r2-leisure.cinema-fire::ctx-vienna-reform-1930::milieu-tenement::cinema-fire-reform/cinema-fire-drill-worked` tags: leisure, cinema, fire, panic, rescue, reform, medical, schooling
  消防检查刚过，电影院换了新的石棉幕布，门口挂着“出口畅通”。放映到一半，胶片又卡了，焦味从放映室飘出来。Luise Kral第一个冲到门口，把两扇门都推开。Anna Huber在里面喊只是卡片，别慌。观众还是走了一半。
  _effects: reputation 0.03; condition; flag +cinema_fire_drill_worked; relation colleague with person-luise-kral; knowledge “the new fire doors open outward and were tested during a jam”; relation acquaintance with person-materialized-world-vienna-1912-46_

- **1926.12** `vienna-apprentice-printshop.union-leaflet/union-leaflet.caught` tags: work, apprentice, factory, social
  Lena把传单卷进裤腰，在门口被Buchdruckerei Winter & Söhne叫住。Buchdruckerei Winter & Söhne抽出纸卷念了两行，说“印刷所不是煽动所”，把学徒补贴减半，并要Rosa Winter在排字房当众道歉。
  _effects: cash -1.5 (学徒补贴被减半); relation colleague with person-materialized-world-vienna-1912-57; relation colleague with person-materialized-world-vienna-1912-57; relation acquaintance with person-materialized-world-vienna-1912-57_

- **1927.01** `yf18-apprentice.press-guard::ctx-vienna-reform-1930::milieu-tenement/refuse-the-machine` tags: apprenticeship, work, danger, machine, injury, refusal, reform, medical
  教堂年历的订单催得紧，Buchdruckerei Winter & Söhne把压印机的护板卸了，说这样进纸快一半。Lena看着那块铁板，说手会进去；Buchdruckerei Winter & Söhne把工钱袋往桌上一扔，问Lena是不是不想出师了。Lena没有碰机器，那天下午的活由Luise Kral接手。
  _effects: relation employer with person-ferdinand-winter; state_parameter apprenticeship-contract.progress 28 -> 23; state_parameter apprenticeship-contract.failures 0 -> 1; flag +yf18_refused_unguarded_press; mood 0.020000000000000018_

- **1927.01** `state_tick:apprenticeship-contract/workshop-year/mistake` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick
  Lena废掉了一块料，师傅扣了工钱。晚饭时谁也没提这件事。
  _effects: state_parameter apprenticeship-contract.failures 1 -> 2; cash -1 (wasted material); mood -0.040000000000000036_

- **1927.01** `r13-civ.learn-instrument::ctx-vienna-reform-1930::milieu-tenement/teacher-left` tags: culture, music, instrument, learning, craft, reform, medical, schooling
  Maria Moser教了三周，忽然说要去外地，把琴谱留给Lena，却没提退学费。Lena抱着琴站在门口，听见楼上的钢琴声一遍遍弹同一段练习曲。
  _effects: mood -0.05999999999999994; flag +music_teacher_left; skill_

- **1927.02** `yf18-runaway.cousin-letter::ctx-vienna-reform-1930::milieu-tenement/show-the-letter-to-parent` tags: runaway, letter, cousin, work, plan, reform, medical, schooling
  Lena把信放在晚饭桌上。Josefine Hofer读完，问格拉茨远不远，又说家里的房租下个月要涨；那晚谁也没有说行或不行，信被压在糖罐下面，第二天边角沾了咖啡。
  _effects: state_add yf18-runaway-plan state:world-vienna-1912:185; relation kin with person-josefine-hofer; flag +yf18_family_knows_letter; mood -0.010000000000000009; flag +yf18_runaway_plan_active_

- **1927.06** `yf18-firstlook.tram-glove::ctx-vienna-reform-1930::milieu-tenement/return-it-at-the-gate` tags: first_love, love, tram, glove, youth, courtship, reform, medical
  下一站，Lena追下车，把那只手套递还给Klara。Klara说了一声谢谢，手指在毛线手套里缩了一下；Lena回到车上才发现自己坐过了两站，只好沿着环城路走回家。
  _effects: state_add yf18-first-awakening state:world-vienna-1912:209; relation friend with person-phase15-Klara-world-vienna-1912; mood 0.030000000000000027; flag +yf18_first_awakening_active_

- **1927.09** `yf18-firstlook.parish-dance::ctx-vienna-reform-1930::milieu-tenement/the-second-dance` tags: first_love, dance, church, courtship, jealousy, reform, medical, schooling
  舞卡上第一支曲子被Josef写走了。Lena在教会礼堂的木地板上踩错了两步，Josef说没关系，把手放回Lena背后；第三支曲子响起时，Klara在门口冲Lena比了个手势，Lena假装没看见。
  _effects: state_parameter yf18-first-awakening.intensity 45 -> 53; state_parameter yf18-first-awakening.nerve 25 -> 35; state_parameter yf18-first-awakening.reciprocated false -> true; relation friend with person-phase15-Josef-world-vienna-1912; mood 0.040000000000000036_

- **1928.01** `vienna-life-young-worker/long-shift` tags: adolescence, labour, union
  Lena连续上了十二天夜班，最后一天在机器旁睡着，被工头踢醒。月底多拿了两克朗，咳嗽却一直没好。
  _effects: cash 2 (overtime pay); condition_

- **1928.01** `yf18-apprentice.press-guard::ctx-vienna-reform-1930::milieu-tenement/call-the-inspector` tags: apprenticeship, work, danger, machine, injury, refusal, reform, medical
  Lena趁Buchdruckerei Winter & Söhne去喝咖啡，跑到街角的工厂检查所，把卸下来的护板指给Friedrich Hofer看。Friedrich Hofer第二天带着卷尺来了，在压印机旁边量了很久；Buchdruckerei Winter & Söhne陪着笑，等门一关，就把Lena的工具从案子上扫进了木箱。
  _effects: relation employer with person-ferdinand-winter; reputation 0.03; state_parameter apprenticeship-contract.progress 23 -> 26; flag +yf18_reported_press; mood 0.030000000000000027_

- **1928.01** `state_reaction:yf18-runaway-plan/a-family-question` tags: yf18-runaway-plan, escape, youth, plan, home, travel, risk, state
  饭桌上又为房租吵起来。Lena把面包掰成很小的块，听见父亲说“这个家养不起闲人”；Lena没有回嘴，只在心里把格拉茨的地址又背了一遍。
  _effects: state_parameter yf18-runaway-plan.suspicion 0 -> 8; state_parameter yf18-runaway-plan.resolve 35 -> 33_
  _causes: evt:world-vienna-1912:003413_

- **1928.01** `state_transition:apprenticeship-contract/expelled` tags: apprenticeship-contract, education, craft, apprentice, work, state, state_tick, failed-apprentice
  Lena从「学徒契约」转入另一段处境：the master ended the contract
  _effects: state_transition apprenticeship-contract -> failed-apprentice; flag +failed_apprenticeship; mood -0.07999999999999996; role_

- **1928.01** `state_tick:yf18-runaway-plan/three-months-of-preparation/route-memorised` tags: yf18-runaway-plan, escape, youth, plan, home, travel, risk, state
  Lena把去车站的路又走了一遍，记住了哪一段有煤气灯、哪一段住着巡夜的警察。回家后，Lena在旧日历背面画了一条线，标出换乘的站名；那条线短得可笑，却比课本上的任何地图都清楚。
  _effects: state_parameter yf18-runaway-plan.preparation 20 -> 32; state_parameter yf18-runaway-plan.suspicion 8 -> 10; mood 0.010000000000000009_

- **1928.01** `state_tick:yf18-first-awakening/half-year-of-glances/answered-glance` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Lena在教堂门口或学校走廊里又遇见Klara。这一次对方先点了头，Lena准备好的整段话全忘了，只把手里的书换到另一只手上；回家后Lena才发现，自己把书拿倒了。
  _effects: state_parameter yf18-first-awakening.intensity 53 -> 58; state_parameter yf18-first-awakening.nerve 35 -> 43; state_parameter yf18-first-awakening.reciprocated true -> true; relation friend with person-phase15-Klara-world-vienna-1912; mood 0.030000000000000027_

- **1928.01** `r13-work.part-time::ctx-vienna-reform-1930::milieu-tenement/errands-after-school` tags: work, part_time, school, adolescence, cash, reform, medical, schooling
  Rosa Winter让Lena放学后送两趟货，按趟给钱，天黑前必须回铺子交账。Lena把书包挂在柜台后面，提着篮子穿过三条街；第一趟送错了一户，第二趟跑得鞋底发热。收工时Rosa Winter数了三个铜板，说明天还来。
  _effects: cash 2 (放学后的四个钟头); flag +work13_took_part_time_errands; relation colleague with person-materialized-world-vienna-1912-57; employment Laufbursche @ org-wednesday-psychological-society_

- **1929.01** `state_expire:yf18-runaway-plan` tags: yf18-runaway-plan, escape, youth, plan, home, travel, risk, state
  Lena的「床底下的包袱」到期；相关安排结束。
  _effects: state_remove yf18-runaway-plan state:world-vienna-1912:185; flag -yf18_runaway_plan_active_

- **1929.01** `state_expire:yf18-first-awakening` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Lena的「第一次心动」到期；相关安排结束。
  _effects: state_remove yf18-first-awakening state:world-vienna-1912:209; flag -yf18_first_awakening_active_

- **1929.01** `r13-edu.dropout-return::ctx-vienna-reform-1930::milieu-tenement/dropout-confirmed` tags: education, dropout, return, school, work, reform, medical, schooling
  Lena回到学校，发现同班同学已经毕业，新班级里没人认识Lena。Lena在操场上站了一下午，最后没有进教室，跟着父亲去了工地。晚上Lena把课本放进箱底，没舍得扔。工地的工头看Lena年纪小，只让Lena搬轻的。课本压在最底下。
  _effects: mood -0.06999999999999995; flag +dropout_confirmed; relation kin with person-friedrich-hofer_

- **1929.02** `r2-uni.scholarship-renewal::ctx-vienna-reform-1930::milieu-tenement::reform-income-test/reform-neighbor-refuses` tags: education, scholarship, inspection, family, poverty, reform, medical, schooling
  邻居不肯在收入表上签字，说“签了就得罪人”。Gustav Berg按规定把申请退回，Lena的奖学金停了一学期。Friedrich Hofer在楼道里骂了一句，邻居家的门始终没有开。Lena去教务处问能不能补交，窗口说“等下一年”。
  _effects: cash -6 (奖学金复核表); flag +scholarship_suspended_for_missing_testimony; relation kin with person-friedrich-hofer_

- **1930.01** `p9-work-career.reference/p9-work-career.reference.bare` tags: work, career, craft, clerk, education, task, reference, certificate
  Buchdruckerei Winter & Söhne照着账本核了一遍，提笔只写“已离职，结清工钱，再无欠款”，落款盖了圆章，纸上大半是空白。Lena拿着这张纸走了两条街，在环城路的柱子旁读了两遍。新东家那边人事科的窗口收下它，没有多问，也没有叫他进去谈。
  _effects: mood -0.050000000000000044; reputation -0.01999999999999999; relation employer with person-ferdinand-winter_

- **1930.02** `p9-gap-adult-solitude.window-argument/window-argument.closed` tags: adulthood, daily, solitude, ordinary, home, neighbor, overheard
  Lena把窗关上，争吵声立刻变成闷响，像隔着一层棉被。可那男人的一句话还是从缝里钻进来，她躺到床上翻来覆去，数着墙上的水渍，到很晚才睡着。
  _effects: mood -0.030000000000000027_

- **1930.02** `vienna-courtship-courtyard.sunday-walk/second-bridge-promise` tags: adulthood, courtship, partner, social, family, partnership
  在第二个桥洞下，Elisabeth Winter 2先停下来，用鞋尖碾一颗烤栗子壳，说下星期天还是这个时候、还是这座桥。Lena点头，掏出四赫勒买了两小袋栗子，两人分着剥，手上都是糖渍；桥洞上的水还在滴，谁也没有提万一明天下雨怎么办。
  _effects: relation partner with person-materialized-world-vienna-1912-70; cash -0.04 (两小袋烤栗子); mood 0.06000000000000005; relation acquaintance with person-materialized-world-vienna-1912-70_

- **1930.06** `vienna-social-movement.recruitment/read-and-decline` tags: development, social_movement, organization, politics
  Lena把传单读了两遍，记下上面的地址，却没有去。第二天照常上工；午休时听见两个工友低声谈论同一场集会。
  _effects: mood -0.010000000000000009; relation acquaintance with person-materialized-world-vienna-1912-74_

- **1930.08** `vienna-housing-move.rent-notice/rent-notice-demand-repair` tags: housing, home, rent, family, money
  Lena没有立刻答话，先去敲Maria Kral的门。两人一起数落墙上的水渍和门框里灌进来的风，楼梯间的窗户修好了，自家墙皮还在剥落。Maria Kral提议一起把话带给看门人：先修好漏水的墙角，涨租的事再谈。Lena把纸重新折好，请他把话带到门外。
  _effects: relation acquaintance with person-maria-kral; mood 0.030000000000000027; flag +rent_dispute_

- **1930.10** `vienna-women-housework.coal-stove/coal-stove.buy-coal` tags: gender, housework, home, labour, family
  炉门一开，黑烟先扑出来，Lena眯着眼把纸团往里塞。火苗舔着碎煤慢慢亮起来，Anna Huber隔着门喊当心一氧化碳。水壶开始咕噜作响，屋里才有点热乎气。
  _effects: cash -0.6 (购买一小筐碎煤); food_

- **1931.01** `p22-forged-review::ctx-vienna-reform-1930::milieu-tenement/the-review-becomes-a-school` tags: forged_review, opera, fame, fraud, comic, media, art, scandal
  死去的评论家在最贵的报纸上给一部没人看过的歌剧写了四颗星。Lena把剪报贴在排练厅门口，第二天票房排到街角；Luise Kral问是谁写的，Lena说是一个死人，死人不会否认。三个月后，歌剧院把这部戏列进了秋季剧目。
  _effects: state_add p22-wild-fortune state:world-vienna-1912:326; state_add p22-scandal-engine state:world-vienna-1912:327; cash 5 (a share of the revived opera receipts); reputation 0.04000000000000001; relation acquaintance with person-luise-kral; flag +forged_review_believed; mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-56; flag +wild_fortune_active; flag +scandal_engine_active_

- **1931.01** `r13-civ.midwife::ctx-vienna-reform-1930::milieu-tenement/safe-delivery` tags: health, midwife, birth, neighbor, night, reform, medical, schooling
  Mitzi Moser把热水、剪刀和一卷粗线摆在桌上，让Lena按住Anna Huber的肩膀。孩子落地时没有哭，Mitzi Moser倒提着小腿拍了两下，屋里才响起声音。Lena把剪子递过去，手背上全是产妇攥出的红印。
  _effects: cash -3 (夜里敲接生婆的门); flag +attended_safe_delivery; relation friend with person-materialized-world-vienna-1912-46; relation acquaintance with person-materialized-world-vienna-1912-24_

- **1931.03** `vienna-parish-aid.funeral-society/funeral-society.quit` tags: faith, parish, mutual_aid, poverty, family
  Lena说互助会先退了，这笔钱要留给煤和面包。Hermann Lechner没争辩，在蓝皮本上把名字划了一道，问清楚是不是全家都退，然后把划掉的那行折进本子夹缝。她说以后想再进，要重新排三个月。门关上，Lena听见铅笔在楼梯上轻轻敲了两下栏杆。
  _effects: cash 0.4 (省下本周会费留作煤钱); relation acquaintance with person-materialized-world-vienna-1912-54; flag +funeral_society_left; relation acquaintance with person-materialized-world-vienna-1912-54_

- **1931.10** `vienna-women-housework.piecework-bundle/piecework.dispute-rate` tags: gender, housework, home, labour, family
  Rosa Huber用拇指甲刮着一件领子的边线，说这儿跳了针。Lena把煤油灯往前推了推，让他凑近看，说线是细了点，活没少做。Ferdinand Kraus倚在门框上没走，屋里一时只有尺子碰桌面的响。
  _effects: cash 0.6 (争执后按降低的工价结算); reputation 0.03; relation colleague with person-materialized-world-vienna-1912-35; mood -0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-35_

- **1932.01** `vienna-life-work-injury/crushed-hand` tags: adulthood, labour, injury
  Lena在换纸时左手被压板夹住。工友关掉机器，工头拿来急救箱，把伤手包起来送去医院；厂里先垫了十克朗医药费，事故报告写的是“操作不慎”。Lena的左手从此握不紧拳，指尖总是凉的，天阴时骨缝里发疼。
  _effects: condition; cash 10 (employer medical advance)_

- **1932.01** `state_tick:p22-wild-fortune/the-story-gets-taller/the-crowd-remembers` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  一年过去，Lena的荒唐故事没有变小，反而多了一个愿意作证的人。债主没有立刻上门，亲戚也还愿意来吃饭；Lena把新添的银器擦了一遍，发现其中一只底下刻着别人的名字。
  _effects: state_parameter p22-wild-fortune.height 60 -> 64; state_parameter p22-wild-fortune.absurdity 65 -> 68; state_parameter p22-wild-fortune.witnesses 70 -> 75; state_parameter p22-wild-fortune.fragility 55 -> 57; mood 0.020000000000000018_

- **1932.01** `state_tick:p22-scandal-engine/the-rumor-learns-new-words/the-story-turns-on-its-keeper` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  一个曾经替Lena传话的人搬走了，带走了半条街的信任。第二天，信箱里多了一张没有署名的明信片，上面只写着“我还记得”；Lena把明信片翻过来，背面是空的。
  _effects: state_parameter p22-scandal-engine.heat 45 -> 52; state_parameter p22-scandal-engine.reach 60 -> 65; state_parameter p22-scandal-engine.leverage 50 -> 46; state_parameter p22-scandal-engine.shame 40 -> 46; mood -0.020000000000000018_

- **1932.01** `p10-edu-work-tasks.request-transfer/p10-edu-work-tasks.request-transfer.union` tags: adulthood, education, work, task, night_school, apprenticeship, career, transfer
  他去找工会代表，代表翻了名册，说新车间确实缺会看图纸的。调岗批下来了，原来的Luise Kral从此不给他写证明，介绍信上也绕开他的名字。他拿到调令那天，没去原来的车间道别。
  _effects: relation_end colleague with person-luise-kral; employment 新车间的熟手 @ org-wednesday-psychological-society; reputation 0.03_

- **1932.02** `vienna-life-depression/short-time` tags: adulthood, depression, work
  Lena改成每周上三天班，工钱按日结算。家里的面包从每天一条变成隔天一条，Lena开始把午饭省下来带回家。
  _effects: cash -3 (short-time work); condition_

- **1932.10** `vienna-illness-household.mother-falls/hire-care` tags: health, family, home
  Lena托人请了巷尾的看护妇，每天来两回给Josefine Hofer擦洗换药，六克朗花得清清楚楚。看护费不便宜，Lena晚上多接了一份缝补的活，手指被针扎了几回；Josefine Hofer的腿伤有人料理，Lena却连着几夜睡不够。
  _effects: cash -6 (支付看护妇费用); health 0.08 (看护妇料理后伤势好转)_

- **1933.01** `r13-fam.teach-parent-to-read::ctx-vienna-reform-1930::milieu-tenement::teach-parent-reform/night-class` tags: task, care, literacy, parent, school, intergenerational, reform, medical
  市政厅办起了工人夜校，Lena替Josefine Hofer去报名。管登记的人问年龄，Lena报小了五岁；Josefine Hofer在旁边扯她的袖子，最后自己说“四十七”。第一晚回家，老人把发的铅笔用布包好，说老师夸Josefine Hofer握笔稳。
  _effects: cash -1 (在厨房桌上写自己的名字); flag +enrolled_parent_in_night_school; role; relation kin with person-josefine-hofer; knowledge “the adult night school takes workers after the evening shift”; skill; condition_

- **1933.01** `vienna-adult-social.burial-fund/burial-fund.paid` tags: adulthood, social, work, family
  车间里管互助会的Ferdinand Kraus在午休时把本子摊在Lena的工具箱上，说这个月还差最后一份月钱。Lena从马甲内袋摸出二十个克罗伊策，Ferdinand Kraus当着他的面在本子上画了钩。
  _effects: cash -0.3 (缴纳丧葬互助会的月钱); relation colleague with person:evt:world-vienna-1912:000198:child; reputation 0.04_

- **1933.04** `vienna-church-community.tenement-prayer/rent-prayer-argument` tags: faith, social, family, home
  有人抱怨守夜人太多，踩坏了楼梯木板。楼里的人围着看，谁也没先走开。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-3; reputation -0.03; mood -0.06000000000000005_

- **1933.07** `ad20-favor-called-in::ctx-vienna-authoritarian-1934::milieu-tenement/do-the-favor` tags: favor, obligation, everyday, trust, debt, risk, vienna, urban
  Hermann Weiss说只需要Lena在明天下午去一趟车站，把一个箱子交给穿灰外套的人。Lena问箱子里是什么；Hermann Weiss说“你不需要知道”。Lena还是去了，因为当年Hermann Weiss替Lena垫过一笔医药费。
  _effects: state_add ad20-private-bargain state:world-vienna-1912:448; cash -1 (the trip to the station); relation acquaintance with person-materialized-world-vienna-1912-74; flag +favor_done; mood -0.010000000000000009; knowledge “箱子里是什么，邻居没有说。”; flag +private_bargain_active_

- **1933.07** `state_reaction:ad20-private-bargain/a-debt-returns` tags: ad20-private-bargain, private, bargain, favor, debt, trust, leverage, exit
  新的债没有走正式渠道，而是被带进了同一间厨房。Lena在桌边听完数目，发现对方连还款日期都替自己算好了。
  _effects: state_parameter ad20-private-bargain.debt 55 -> 61; state_parameter ad20-private-bargain.leverage 50 -> 54; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:005826_

- **1934.01** `pc20-apprentice.second-workshop::ctx-vienna-authoritarian-1934::milieu-printshop/reopen-bench` tags: craft, apprentice, failure, workshop, second_chance, tools, patronage, vienna
  Gustav Kral 2把工作台的钥匙放在Lena手心里，说工具可以借，名声不能借。Lena擦了一整夜的刨子，第二天在门口挂出小木牌；第一位客人不是Grete Moser 2，而是一个要修椅背的邻居。
  _effects: organization_found 重新开张的作坊 (household_firm); position 师傅 @workshop:person-phase15-Lena-world-vienna-1912-evt:world-vienna-1912:005824; state_add pc20-second-chance state:world-vienna-1912:447; relation colleague with person-materialized-world-vienna-1912-73; cash -2 (tools, rent and a new sign); flag +reopened_workshop_after_failure; knowledge “工作台的钥匙还能用，工具可以借，名声不能借。”; relation acquaintance with person-materialized-world-vienna-1912-73; relation acquaintance with person-materialized-world-vienna-1912-3; flag +second_chance_open_

- **1934.01** `state_expire:p22-wild-fortune` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  Lena的「荒唐横财」到期；相关安排结束。
  _effects: state_remove p22-wild-fortune state:world-vienna-1912:326; flag -wild_fortune_active_

- **1934.01** `state_expire:p22-scandal-engine` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Lena的「流言发动机」到期；相关安排结束。
  _effects: state_remove p22-scandal-engine state:world-vienna-1912:327; flag -scandal_engine_active_

- **1934.01** `state_tick:ad20-private-bargain/the-favor-ages/called-in` tags: ad20-private-bargain, private, bargain, favor, debt, trust, leverage, exit
  对方在一个不合时宜的时刻提起旧事，语气很客气，意思却不客气。Lena听见自己答应得太快，挂断以后才发现手心有一层薄汗。
  _effects: state_parameter ad20-private-bargain.leverage 54 -> 62; state_parameter ad20-private-bargain.debt 61 -> 65; state_parameter ad20-private-bargain.trust 55 -> 51; mood -0.030000000000000027_

- **1934.01** `agency:support_process` tags: agency, agency:support_process
  Lena想帮忙，但组织者不信任新来的人，只让其在外围等消息。
  _effects: mood -0.040000000000000036_

- **1934.06** `vienna-history-kraus-lecture/leave-before-the-end` tags: history, culture, karl_kraus, cafe_central, public_lecture, press
  朗读开始不久，Lena 发现后排有人在记名字，便提前离开。走到门口时，Karl Kraus 的声音还在背后，句子像钉子一样短。第二天，Lena 在报摊上看到同一篇文章被删去了两段。
  _effects: knowledge “Café Central 的公开朗读吸引便衣和报纸记者，现场听众并不全是同情者。”; cash -1 (coffee before leaving the reading)_

- **1934.11** `vienna-courtship-courtyard.sunday-walk/separate-coffee` tags: adulthood, courtship, partner, social, family
  两人拐进街角的咖啡馆，站到锌皮柜台前。Rosa Huber点了牛奶咖啡，Lena要了黑咖啡，十二赫勒一杯。侍者把两杯推过来时，两人几乎同时把钱币按在柜台上，各付各的，谁也没说什么；那一声铜板响，把客气摆得比咖啡还清楚。
  _effects: cash -0.12 (自己那杯黑咖啡); relation acquaintance with person-materialized-world-vienna-1912-35_

- **1935.01** `vienna-family-divorce/partner-moves-to-shared-housing` tags: family, marriage, divorce, housing, lifecycle, separation, household
  Elisabeth Winter 2把一只箱子和工票搬去合租房，带走一半锅碗。Lena留在Leopoldstädter Zinshaus, gemeinsamer Gang，把空出来的床租给一个学徒，用租金补房租；搬家花掉四克朗，Lena在户籍上成了分居的人，夜里听见隔壁床板响，总要愣一下。
  _effects: relation_end partner with person-materialized-world-vienna-1912-70; household; cash -4 (moving and separate goods); mood -0.040000000000000036; role_

- **1935.01** `pc20-apprentice.second-workshop::ctx-vienna-authoritarian-1934::milieu-factory/sweep-up` tags: craft, apprentice, failure, workshop, second_chance, tools, patronage, vienna
  Lena把工作台擦干净，把刨花扫进麻袋，最后把钥匙还给Gustav Kral 2。Gustav Kral 2没有挽留，只让Lena把门口那块旧木牌摘下来；Lena照做了，木牌背面还留着当年没刻完的名字。
  _effects: state_add pc20-second-chance state:world-vienna-1912:492; relation colleague with person-materialized-world-vienna-1912-73; cash -1 (the unpaid rent for the bench); flag +swept_the_bench_and_left; knowledge “旧木牌背面还有当年没刻完的名字，{subject}没有把它翻过来。”; flag -second_chance_open; flag +second_chance_open_

- **1935.01** `state_tick:ad20-private-bargain/the-favor-ages/kept` tags: ad20-private-bargain, private, bargain, favor, debt, trust, leverage, exit
  那笔私下的安排又过了一年。没有人提起，但Lena在街上遇见对方时，两个人都多停了一拍。Lena知道，沉默本身也是利息。
  _effects: state_parameter ad20-private-bargain.trust 51 -> 55; state_parameter ad20-private-bargain.debt 65 -> 63; state_parameter ad20-private-bargain.exit 20 -> 22; mood 0.010000000000000009_

- **1935.01** `agency:support_process` tags: agency, agency:support_process
  Lena想帮忙，但组织者不信任新来的人，只让其在外围等消息。
  _effects: mood -0.010000000000000009_

- **1935.04** `vienna-printshop-daily.union-pamphlet/pamphlet-print-secretly` tags: work, factory, labour, social
  Rosa Bauer趁夜班把一版工会呼吁加薪的传单塞进Lena的排字盘里，说是替工友印的，谁都不会知道。Lena把那张纸压到排版最底层，机器照样轰隆转。
  _effects: flag +printed_union_pamphlet; relation colleague with person:evt:world-vienna-1912:000398:child; mood -0.030000000000000027_

- **1935.06** `vienna-housing-move.rent-notice/rent-notice-demand-repair` tags: housing, home, rent, family, money
  Lena没有立刻答话，先去敲Anna Bauer的门。两人一起数落墙上的水渍和门框里灌进来的风，楼梯间的窗户修好了，自家墙皮还在剥落。Anna Bauer提议一起把话带给看门人：先修好漏水的墙角，涨租的事再谈。Lena把纸重新折好，请他把话带到门外。
  _effects: relation acquaintance with person-anna-bauer; mood 0.030000000000000027_

- **1935.09** `vienna-courtship-courtyard.family-table/leave-before-dessert` tags: adulthood, courtship, partner, social, family, partnership
  问到后来，Josefine Hofer提起别家有个更稳当的差事。Anna Huber把餐巾往桌上一放，说吃好了，先走。两人在楼梯间站住，Anna Huber说不是Lena的错，可下次再来还得一样坐这张桌子；Lena心里松了一点，也知道这顿饭没吃完，事情并没有过去。
  _effects: relation partner with person-materialized-world-vienna-1912-46; relation kin with person-josefine-hofer; mood 0.030000000000000027_

- **1936.01** `office16-scandal.public-hearing::ctx-vienna-authoritarian-1934::milieu-printshop/weathered` tags: office, scandal, media, reputation, politics, power, vienna, urban
  报纸在头版登了Lena和承包商在一张桌子上的照片，配文只有一句“谁签的字”。质询会开了三个小时，Lena把合同、比价单和验收记录一页页摊开；记者第二天没有再写，但把照片留在了档案里。
  _effects: reputation -0.03; state_add office-under-siege state:world-vienna-1912:548; flag +scandal_weathered; knowledge “照片是真的，合同也是真的；报纸没有再追，但档案里留了底片。”; flag +office_under_siege_

- **1936.01** `state_expire:ad20-private-bargain` tags: ad20-private-bargain, private, bargain, favor, debt, trust, leverage, exit
  Lena的「私下的账」到期；相关安排结束。
  _effects: state_remove ad20-private-bargain state:world-vienna-1912:448; flag -private_bargain_active_

- **1936.01** `state_tick:pc20-second-chance/kept-word/small-relapse` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  Lena晚了半个钟头，进门时先解释路上的电车，又解释口袋里的收据。对方没有追问，只把已经凉掉的汤端回厨房；Lena听见锅盖碰在灶台上，知道这次不是天气的问题。
  _effects: state_parameter pc20-second-chance.credibility 30 -> 23; state_parameter pc20-second-chance.suspicion 50 -> 58; state_parameter pc20-second-chance.debt 55 -> 58; mood -0.030000000000000027_

- **1936.01** `p9-social-relationship-initiative.introduce-two-people/overpraise` tags: courtship, friendship, family, social, initiative, housing, task, task:social
  介绍时把两边都夸过了头，说老友是印厂里最靠得住的人，说女工的手艺整条街都找不出第二个。话太多，两人反倒拘谨起来，各自看窗外。咖啡凉了，坐了不到一个钟头就散了，出门时谁也没提再见面。
  _effects: cash -0.9 (三杯咖啡和点心); relation friend with person-materialized-world-vienna-1912-49; relation acquaintance with person:evt:world-vienna-1912:000398:child_

- **1936.01** `vienna-tenement-neighbors.lost_room_key/key_stolen_by_stranger` tags: home, social, family, housing
  Lena记得出门时钥匙还在，回来却没了。Grete Moser 2说下午看见一个穿灰外套的男人在楼道里转悠，手里晃着一把铜钥匙。两人下楼查看，房门虚掩，抽屉被拉开，攒着买煤的六克朗不见了。Grete Moser 2陪着Lena去街角警察岗亭报了案，警察记下灰外套，说会留意。
  _effects: cash -6 (被盗的买煤钱); mood -0.030000000000000027_

- **1936.01** `vienna-parish-aid.rent-box/rent-box.accept-all` tags: faith, parish, mutual_aid, poverty, family
  煤袋落在台阶上，扬起细细一层黑末。Gustav Berg用铅笔头在蓝格册上写门牌号，问房东姓什么，又叮嘱别把面包票弄丢。灶上水壶开始叫，Lena才想起屋里连只干净的杯子都没有。
  _effects: cash 6 (互助会补上本月房租差额); food; relation acquaintance with person-gustav-berg; flag +parish_registered_

- **1936.03** `vienna-women-housework.wash-day/wash-day.send-out` tags: gender, housework, home, labour, family
  洗衣妇把工服从报纸里抖出来，翻开领口看了看油垢，点头收下。Lena转身回屋，铜板在围裙口袋里磕出轻响。Josefine Hofer还在楼梯上嘟囔，说这钱不如买半斤猪油。
  _effects: cash -0.5 (请洗衣妇代洗工服); mood 0.030000000000000027; relation acquaintance with person-josefine-hofer_

- **1936.04** `vienna-life-overcrowded-flat/take-in-a-lodger` tags: housing, home, health, family
  Lena把厨房角落隔出一块，租给一个在附近上工的学徒。每月多四克朗，但煤、水和厕所都要排队；夜里有人咳嗽，Lena睡不踏实，第二天眼下发青，孩子也在床上翻来覆去，四克朗换来一屋子醒着的人。
  _effects: cash 4 (lodger rent); condition; relation acquaintance with person-materialized-world-vienna-1912-12_

- **1937.01** `vienna-life-injury-recovery/home-care` tags: health, work, family
  Lena没有去诊所，只用热水和旧布洗了伤口。第二天伤口周围发红，家里人把仅剩的干净床单撕成条。
  _effects: cash -2 (clean cloth); condition_
  _causes: evt:world-vienna-1912:005841_

- **1937.01** `state_expire:failed-apprentice` tags: failed-apprentice, craft, work, failure, stigma, state, state_tick, state:failed-apprentice
  Lena的「学徒契约终止」到期；相关安排结束。
  _effects: state_remove failed-apprentice state:world-vienna-1912:222_

- **1937.01** `state_tick:pc20-second-chance/kept-word/kept-word` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  Lena把答应过的事又做了一遍：按时出现，把欠下的小钱还掉，没有在旧话上添新的解释。对方没有鼓掌，只把杯子往Lena这边推了推；这一次的沉默比上次轻。
  _effects: state_parameter pc20-second-chance.credibility 23 -> 29; state_parameter pc20-second-chance.suspicion 58 -> 53; state_parameter pc20-second-chance.hope 25 -> 29; mood 0.020000000000000018_

- **1937.01** `state_tick:office-under-siege/pressure-year/new-allegation` tags: office-under-siege, office, scandal, pressure, politics, legal, risk, state
  第二天的报纸又登了一封匿名信，说Lena把一份合同给了亲戚。信里没有证据，但足够让两个原本答应到场的人临时出差。
  _effects: state_parameter office-under-siege.exposure 30 -> 40; state_parameter office-under-siege.support 60 -> 54; state_parameter office-under-siege.months 0 -> 1; reputation -0.029999999999999992; mood -0.020000000000000018_

- **1937.03** `vienna-historical-social-movement.relief-network/allocate-by-need` tags: history, historical_process, social_movement, organization, politics
  煤块在秤盘上碰出闷响，Lena用粉笔在麻袋上写门牌号，Otto Weiss挨户叫名。轮到放空碗那家时，Lena把面包掰成两半，一半放进碗里，一半留在自己手中，谁也没说话。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-86; mood 0.040000000000000036; relation acquaintance with person-materialized-world-vienna-1912-86_

- **1937.11** `vienna-medical-treatment.sanatorium/home-rest` tags: health, medical, family, money
  炉子封小了，屋里凉得快，Lena把大衣盖在被子上。安娜收碗时看见窗台上一排药瓶，没说什么，第二天多带了半块黑面包。楼下的管道工敲了一下午铁皮，咳嗽声混在里面听不真切。
  _effects: health 0.03 (在家休养但条件有限); food; cash -0.5 (房东要求的清洁费); relation friend with person-materialized-world-vienna-1912-51_

- **1938.01** `vienna-life-anschluss-1938/resists` tags: politics, persecution, 1938
  Lena在登记桌旁说了句“这里以前不是这样”。Otto Bauer记下地址，当晚两个穿制服的人来敲门，把Lena带到警局，第二天放回来时脸上有伤。
  _effects: condition; role; cash -5 (fine and lost work); relation acquaintance with person-materialized-world-vienna-1912-104_

- **1938.01** `office16-hire.protege::ctx-vienna-authoritarian-1934::milieu-printshop/hired-competent` tags: office, hire, patronage, bureaucracy, work, power, vienna, urban
  Lena把Rosa Berg的名字写在编制表的空行上，又在旁边注了“试用三个月”。Gustav Berg提醒说预算只够半个位置，Lena还是把名字留下了。第二天，Rosa Berg提前半小时到，把走廊里的旧档案按年份重新排了一遍。
  _effects: position 助理文书 @zoo:person-karl-kraus-evt:world-vienna-1912:003673; organization_funds; relation colleague with person:evt:world-vienna-1912:000223:child; reputation 0.03; flag +hired_protege_

- **1938.01** `state_expire:pc20-second-chance` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  Lena的「第二次机会」到期；相关安排结束。
  _effects: state_remove pc20-second-chance state:world-vienna-1912:492; flag -second_chance_open_

- **1938.01** `state_expire:office-under-siege` tags: office-under-siege, office, scandal, pressure, politics, legal, risk, state
  Lena的「职位受围」到期；相关安排结束。
  _effects: state_remove office-under-siege state:world-vienna-1912:548; flag -office_under_siege_

- **1938.01** `p9-social-daily-culture.pictures-or-concert/p9-social-daily-culture.pictures-or-concert.box-seat` tags: daily, culture, leisure, cafe, music, walk, task, task:culture
  Lena咬牙买了音乐厅楼座的票，两克朗五十赫勒，又向人借来一件硬领衬衫，领子磨得后颈发红。演奏到慢板时，Lena手心里的汗把节目单边角浸软，却连咳嗽都憋着，生怕在周围体面人中间出声。散场后Grete Moser 2等在门口，问值不值，Lena只把节目单折好收进口袋。
  _effects: cash -2.5 (音乐厅楼座票价); mood 0.07999999999999996; reputation 0.020000000000000004; skill_

- **1938.09** `vienna-legacy-worklife.sick-fund/sick-fund.keep-quiet` tags: legacy, work, family, reform, ordinary_life
  止咳药水是褐色的，瓶口塞着软木塞，摇一摇会起沫。Lena看着工友把表折成小块，折了三折才塞进帽檐。墙上的规章还贴在那里，纸角被风掀起，没人去按。
  _effects: mood -0.050000000000000044; relation colleague with person-materialized-world-vienna-1912-3_

- **1938.11** `vienna-parish-aid.sick-call/sick-call.with-priest` tags: faith, parish, mutual_aid, poverty, family
  Lena觉得一个人去不合适，绕到教堂请了修女一同上楼。修女看过病人，留下药包和一小瓶圣水，说会从教区账上出钱请医生来看一趟。Hermann Winter 2在楼下等着，说这样妥当，病人家里没男人，多个见证人心里安稳。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-88; mood 0.040000000000000036; flag +parish_sick_visitor; relation acquaintance with person-materialized-world-vienna-1912-88_

- **1938.12** `p9-social-tenement-neighbors.stove-and-line/stove-and-line.move-to-line-end` tags: housing, neighbors, tenement, daily, money, reputation
  Lena把自己泡着的衣服端到绳子最末一段，把靠近炉子的位置让给Elisabeth Kral，条件是对方看着火，别让水烧干。Elisabeth Kral点头，往炉膛里添了一块煤，说中午以前一定把炉子空出来。两家的盆就挨着放在窗下。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-18; mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-18_

- **1939.01** `office16-budget.sign-or-block::ctx-vienna-authoritarian-1934::milieu-tenement/blocked-the-permit` tags: office, budget, permit, administration, power, economy, vienna, urban
  Lena把一份扩建许可证压在抽屉最下面，理由是排水和消防通道不合规。申请人Elisabeth Winter 2在走廊里等到下班，最后只拿到一张写着“补件”的纸条。Lena知道这份许可明年还会再来，但今年不会从自己的桌上出去。
  _effects: reputation 0.02; skill; relation rival with person-materialized-world-vienna-1912-70; flag +blocked_permit; knowledge “扩建申请的排水图与消防通道不符合现行规定。”; relation acquaintance with person-materialized-world-vienna-1912-96_

- **1939.01** `agency:support_process` tags: agency, agency:support_process
  Lena为Wiener Psychoanalytische Vereinigung在Berggass出了力：整理名单、传递消息或替同伴作证，名字被记进参与记录。
  _effects: historical development:initiative-org-wednesday-psychological-society-1933 as supporter; historical_influence; reputation 0.015_

- **1939.01** `p9-gap-adult-ordinary-day.market-closing/market-closing.bruised-apples` tags: adulthood, daily, leisure, neighborhood, ordinary, market, food, bargain
  苹果堆里混着几个已经发软的，摊主用围裙兜着往她篮子里倒，说拿回去喂猪也不亏。Lena在井边洗了半篮子，削皮时看见果核边有一圈褐色的痕，刀子挖下去，甜味还是冒出来。
  _effects: cash -0.1 (买收摊前的碰伤苹果); food_

- **1939.09** `hs18-cinema.newsreel::ctx-vienna-authoritarian-1934::milieu-tenement/clap-with-the-crowd` tags: cinema, newsreel, neighbor, recognition, media, history, vienna, urban
  新闻片放到新修的桥，观众跟着鼓掌。Lena也拍了两下手，掌心却停在半空——画面角落里那家面包店，昨天还排着另一条队。Berta Berg说下回还来，Lena说票价太贵。
  _effects: cash -1 (two cinema tickets); mood 0.020000000000000018; flag +clapped_at_the_newsreel_

- **1940.01** `office16-budget.sign-or-block::ctx-vienna-authoritarian-1934::milieu-printshop/blocked-the-permit` tags: office, budget, permit, administration, power, economy, vienna, urban
  Lena把一份扩建许可证压在抽屉最下面，理由是排水和消防通道不合规。申请人Berta Berg在走廊里等到下班，最后只拿到一张写着“补件”的纸条。Lena知道这份许可明年还会再来，但今年不会从自己的桌上出去。
  _effects: reputation 0.02; skill; relation rival with person:evt:world-vienna-1912:000227:child; knowledge “扩建申请的排水图与消防通道不符合现行规定。”_

- **1940.01** `agency:support_process` tags: agency, agency:support_process
  Lena想帮忙，但组织者不信任新来的人，只让其在外围等消息。
  _effects: mood -0.040000000000000036_

- **1940.02** `p22-mistaken-inheritance::ctx-vienna-authoritarian-1934::milieu-factory/the-estate-comes-with-a-family` tags: mistaken_inheritance, funeral, corpse, identity, dark, reversal, debt, family
  陌生人的家属找上门，说既然Lena拿了遗产，就该替死者还债。Hermann Winter 2把借据摊在桌上，Mitzi Moser说法律上确实如此；Lena搬进那间公寓，却发现每个房间都住着原来的债主。窗户朝北，冬天没有太阳，房租却一分不少。把借据一张张摊开，发现每张都写着同一个地址。
  _effects: state_add debt-bondage state:world-vienna-1912:753; cash -4 (the dead man debts and the move); relation acquaintance with person-materialized-world-vienna-1912-88; flag +estate_came_with_family; mood -0.040000000000000036; relation acquaintance with person-materialized-world-vienna-1912-72_

- **1940.03** `vienna-women-housework.piecework-bundle/piecework.dispute-rate` tags: gender, housework, home, labour, family
  铜板一枚枚落在桌面上，比说好的少了十五赫勒。Lena没去捡，先问Ferdinand Kraus下捆还送不送。Ferdinand Kraus含糊应了一声，拎起布包就走。Gustav Berg这才进来，说下回得先讲好价。
  _effects: cash 0.6 (争执后按降低的工价结算); reputation 0.03; relation colleague with person:evt:world-vienna-1912:000198:child; mood -0.030000000000000027_

- **1940.08** `vienna-church-community.tenement-prayer/rent-prayer-help` tags: faith, social, family, home
  Lena在楼梯间守夜时，邻居说起楼下老太太病重。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-67; relation acquaintance with person-materialized-world-vienna-1912-67_

- **1941.01** `office16-appointment.patronage-ledger::ctx-vienna-authoritarian-1934::milieu-tenement/appointed-ally` tags: office, appointment, patronage, organization, politics, power, vienna, urban
  Lena把Friedrich Bauer的名字写在“联络员”后面，月薪一克朗，职责是每周来两次、把外面的消息带进来。Otto Bauer说这个岗位没有编制，Lena说先按临时用工算；第一个月，Friedrich Bauer带来的消息比文件还多。
  _effects: position 联络员 @zoo:person-karl-kraus-evt:world-vienna-1912:003673; organization_funds; relation colleague with person:evt:world-vienna-1912:000561:child; flag +appointed_ally; knowledge “联络员不在正式编制里，工资走临时用工。”; mood 0.020000000000000018_

- **1941.01** `state_tick:debt-bondage/interest/pay-interest` tags: debt-bondage, debt, work, poverty, legal, state, state_tick
  Lena又付了一年的利息。本金几乎没动，债主的账本却翻到了新一页。
  _effects: cash -3 (debt interest); state_parameter debt-bondage.debt 24 -> 26_

- **1941.01** `agency:support_process` tags: agency, agency:support_process
  Lena为Wiener Psychoanalytische Vereinigung在Berggass出了力：整理名单、传递消息或替同伴作证，名字被记进参与记录。
  _effects: historical development:initiative-org-wednesday-psychological-society-1933 as supporter; historical_influence; reputation 0.015_

- **1941.04** `state_reaction:mb17-remittance-web/family-emergency` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  故乡来了一封电报，说屋顶塌了一角，老人暂时住到邻居家。Lena当晚就去邮局，把本来留着交学费的钱先汇了出去；回家后，他把墙上的缴费单取下来，折好放进抽屉。
  _effects: state_parameter mb17-remittance-web.obligation 68 -> 78; state_parameter mb17-remittance-web.arrears 12 -> 12; cash -3 (an emergency money order sent home)_
  _causes: evt:world-vienna-1912:009729_

- **1941.05** `vienna-housing-move.rent-notice/rent-notice-pay` tags: housing, home, rent, family, money
  Lena把通知念给Hermann Berg听，Hermann Berg摇头说是楼梯间那几块新玻璃的账。Lena去楼下杂货铺换开一张五克朗的纸币，回屋一枚一枚摆开数，煤箱底多留了二十赫勒。
  _effects: cash -2 (按月多付两克朗房租); food; mood -0.009999999999999898_

- **1941.06** `p9-history-union-political.meeting/meeting-speak-up` tags: politics, union, party, meeting, leaflet, police, strike, reform
  Lena站起来报出自己车间的计件工价：糊一百个纸盒二十八赫勒，比隔壁车间少六个。屋里一下子静了，Rosa Bauer把草稿推过来，让书记员把这几个数字写在动议第一行。散会时有人拍了拍Lena的肩膀。
  _effects: reputation 0.04000000000000001; relation colleague with person:evt:world-vienna-1912:000398:child; relation acquaintance with person-materialized-world-vienna-1912-98_

- **1941.06** `r2-uni.anonymous-source::ctx-vienna-authoritarian-1934::milieu-printshop/source-vanished` tags: media, journalism, source, secrecy, police, vienna, urban, crisis
  Lena按约定等到九点，Ferdinand Kraus没有来。楼梯间的窗户开着，地上有一只摔碎的眼镜片。Lena去登记的地址找，门房说“昨天搬走了”。稿子没有消息源，Grete Moser 2把它放进“待核”抽屉，再也没有提起。
  _effects: condition; flag +source_vanished; knowledge “the source disappeared before the second meeting”_

- **1942.01** `state_reaction:mb17-remittance-web/border-closes` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  边境又收紧了，往故乡的列车要换乘三次。邮局说汇款还能走，但信可能压在路上；Lena还是把两张单子一起递进窗口，像把一句话交给一个不保证送达的人。
  _effects: state_parameter mb17-remittance-web.arrears 12 -> 12; mood -0.040000000000000036; flag +mb17_border_slow_letters_
  _causes: evt:world-vienna-1912:009607_

- **1942.01** `office16-favor.private-sinecure::ctx-vienna-authoritarian-1934::milieu-tenement/favor-refused` tags: office, favor, corruption, patronage, family, power, vienna, urban
  Hermann Winter 2把一篮鸡蛋放在Lena家门口，说只要一个不用打卡的位子。Lena把鸡蛋拎回对方手里，说编制表不是自家的抽屉。两个人站在楼梯间，谁也没有再提这件事；第二天见面，还是点了头。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-88; reputation 0.029999999999999992; flag +refused_private_favor; mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-109_

- **1942.01** `state_tick:mb17-remittance-web/remittance-year/posted-in-time` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  Lena把工钱摊在桌上，先数出房租和煤钱，再把剩下的换成一张汇款单。邮局职员在单子上敲了章，说“两周能到”；回家的路上，他买了一张最便宜的明信片，写了两行字又划掉一行。
  _effects: cash -2 (the money order and postage); state_parameter mb17-remittance-web.supportSent 8 -> 10; state_parameter mb17-remittance-web.arrears 12 -> 11; state_parameter mb17-remittance-web.obligation 78 -> 75; mood 0.010000000000000009_

- **1942.01** `state_tick:debt-bondage/interest/pay-interest` tags: debt-bondage, debt, work, poverty, legal, state, state_tick
  Lena又付了一年的利息。本金几乎没动，债主的账本却翻到了新一页。
  _effects: cash -3 (debt interest); state_parameter debt-bondage.debt 26 -> 28_

- **1942.01** `p9-work-career.journeyman-exam/p9-work-career.journeyman-exam.rework` tags: work, career, craft, clerk, education, task, apprentice, journeyman
  Lena想在午饭前把抽屉交上去，锯得太急，左角接缝处露了一道头发丝宽的光。Elisabeth Winter 2把抽屉翻过来对着窗，拿小锤柄敲了两下，说这道缝进了潮气就会张。证明先不写，再干三个月，工钱照学徒算。Lena重新量线，锯子放慢了一半。
  _effects: skill; mood -0.010000000000000009; relation employer with person-materialized-world-vienna-1912-70_

- **1942.09** `vienna-tenement-neighbors.lost_room_key/key_lost_landlady` tags: home, social, family, housing
  Lena把钥匙丢在了回家路上的有轨电车轨道旁，天黑也没找着。房东太太说换锁芯要一克朗五十赫勒，从下月房租里扣。Berta Berg借给Lena一把旧挂锁，但锁鼻和门扣对不上，只能用铁丝拧着凑合。那夜Lena睡不踏实，总觉得有人在拧门。
  _effects: cash -1.5 (换锁芯费用); relation acquaintance with person:evt:world-vienna-1912:000227:child_

- **1942.09** `p9-social-tenement-neighbors.gramophone-wall/gramophone-wall.caretaker-notice` tags: housing, neighbors, tenement, daily, money, reputation
  Lena去找看门人，说院子里四面墙，声音绕不出去。第二天楼梯间的木板上贴了一张纸：晚上十点后请勿放留声机，鞋匠铺也请收锤。纸条没有落款，只有房东事务所的戳。Berta Berg路过时看了很久，把留声机的盖子合上了。
  _effects: mood 0.040000000000000036; relation acquaintance with person:evt:world-vienna-1912:000227:child_

- **1942.10** `state_reaction:mb17-remittance-web/wages-arrive` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  厂里补发了一笔拖欠的工钱。Lena没有先还杂货铺的账，而是去邮局多填了一张汇款单；回来的路上，他给自己买了一支最便宜的烟，站在桥上看了一会儿水，才把剩下的钱数清楚。
  _effects: cash 1 (the factory paid part of the arrears); state_parameter mb17-remittance-web.supportSent 10 -> 11; state_parameter mb17-remittance-web.obligation 75 -> 73; mood 0.010000000000000009_
  _causes: evt:world-vienna-1912:010088_

- **1942.12** `p9-gap-adult-ordinary-day.organ-grinder/organ-grinder.follow-monkey` tags: adulthood, daily, leisure, neighborhood, ordinary, music, street
  猴子走在她前面，红绳在项圈后面拖着一截。乐师在面包店台阶上坐下，从兜里掏出一块干硬的面包掰成两半，一半给了猴子。他说这条巷子里只有面包店老板娘肯让他靠墙歇脚。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-3; skill_

- **1943.01** `state_reaction:mb17-remittance-web/border-closes` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  边境又收紧了，往故乡的列车要换乘三次。邮局说汇款还能走，但信可能压在路上；Lena还是把两张单子一起递进窗口，像把一句话交给一个不保证送达的人。
  _effects: state_parameter mb17-remittance-web.arrears 11 -> 12; mood -0.010000000000000009_
  _causes: evt:world-vienna-1912:010152_

- **1943.01** `state_expire:debt-bondage` tags: debt-bondage, debt, work, poverty, legal, state, state_tick, state:debt-bondage
  Lena的「债务束缚」到期；相关安排结束。
  _effects: state_remove debt-bondage state:world-vienna-1912:753_

- **1943.01** `p9-history-public-action.join-union-party/listen-only` tags: politics, union, party, activism, public_action, relief, leaflet, task
  Lena 坐在最后一排，把帽子搁在膝盖上。会上有人拍桌子说面粉又涨了半克朗，也有人低头数手指。Ferdinand Kraus 递来一杯温水，没提入会表，只在散会时拍了拍门框。
  _effects: cash -2 (散会时放入募捐罐); skill; relation acquaintance with person:evt:world-vienna-1912:000198:child_

- **1943.01** `r3-mig.transit-camp::ctx-vienna-authoritarian-1934::milieu-tenement/partner-separated-by-nationality` tags: migration, refugees, camp, family, papers, vienna, urban, crisis
  Helene Hofer说夫妻不同国籍要分开登记，Anna Huber被分到铁丝网另一侧。Lena隔着两道网把一块面包递过去，Anna Huber没接住，面包落在泥里。Helene Hofer吹哨让所有人回棚，Lena看见Anna Huber的手还伸在网眼上。
  _effects: mood -0.06000000000000005; condition; flag +partner_separated_by_nationality; relation kin with person-materialized-world-vienna-1912-46; knowledge “the camp separates married couples of different nationality”_

- **1943.06** `vienna-women-housework.piecework-bundle/piecework.dispute-rate` tags: gender, housework, home, labour, family
  Ferdinand Kraus用拇指甲刮着一件领子的边线，说这儿跳了针。Lena把煤油灯往前推了推，让他凑近看，说线是细了点，活没少做。Helene Bauer 2倚在门框上没走，屋里一时只有尺子碰桌面的响。
  _effects: cash 0.6 (争执后按降低的工价结算); reputation 0.03; relation colleague with person:evt:world-vienna-1912:000198:child; relation acquaintance with person-materialized-world-vienna-1912-120_

- **1943.11** `state_reaction:mb17-remittance-web/family-emergency` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  故乡来了一封电报，说屋顶塌了一角，老人暂时住到邻居家。Lena当晚就去邮局，把本来留着交学费的钱先汇了出去；回家后，他把墙上的缴费单取下来，折好放进抽屉。
  _effects: state_parameter mb17-remittance-web.obligation 73 -> 83; state_parameter mb17-remittance-web.arrears 12 -> 12; cash -3 (an emergency money order sent home); mood -0.040000000000000036_
  _causes: evt:world-vienna-1912:010574_

- **1943.11** `vienna-housing-move.rent-notice/rent-notice-neighbors-together` tags: housing, home, rent, family, money
  Lena把Alois Berg和楼里另两户人家叫到楼道，把那张纸摆在窗台上传看。看门人在楼梯拐角听着，说房东礼拜三来收钱。几家人合计好，到那天一起等在门厅，先把克朗递过去，再把修补的事一件件摆出来。Lena把纸折进围裙口袋，觉得人凑齐了话也硬气些。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-47; mood 0.040000000000000036; flag +tenant_collective; relation acquaintance with person-materialized-world-vienna-1912-47_

- **1944.01** `state_reaction:mb17-remittance-web/border-closes` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  边境又收紧了，往故乡的列车要换乘三次。邮局说汇款还能走，但信可能压在路上；Lena还是把两张单子一起递进窗口，像把一句话交给一个不保证送达的人。
  _effects: state_parameter mb17-remittance-web.arrears 12 -> 12_
  _causes: evt:world-vienna-1912:010659_

- **1944.01** `office16-hire.protege::ctx-vienna-authoritarian-1934::milieu-tenement/hired-relative` tags: office, hire, patronage, bureaucracy, work, power, vienna, urban
  名单上添的是Rosa Bauer，一个连公文格式都分不清的远房亲戚。Ferdinand Kral把考勤表放在桌上，没有问原因；Lena也没有解释，只在签字栏里写得比平时慢。第一个月，Rosa Bauer迟到了七次，工资照发。
  _effects: position 档案助理 @zoo:person-karl-kraus-evt:world-vienna-1912:003673; organization_funds; relation kin with person:evt:world-vienna-1912:000398:child; flag +hired_relative; knowledge “考勤表上记了七次迟到，工资一次没有扣。”; mood 0.020000000000000018_

- **1944.01** `state_tick:mb17-remittance-web/remittance-year/month-behind` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  这个月厂里少发了工钱。Lena把汇款单填到一半又放下，先给房东送去一部分；夜里他给故乡写信，说“下个月一定补上”，写完把信纸折了三折，像怕它自己会开口。
  _effects: cash -1 (the rent was paid first); state_parameter mb17-remittance-web.arrears 12 -> 12; state_parameter mb17-remittance-web.obligation 83 -> 87_

- **1944.01** `agency:support_process` tags: agency, agency:support_process
  Lena想帮忙，但组织者不信任新来的人，只让其在外围等消息。
  _effects: reputation -0.010000000000000009_

- **1944.02** `hist15-purge.seed::ctx-vienna-authoritarian-1934::milieu-printshop/a-name-is-read` tags: purge, repression, organization, surveillance, history, work, vienna, urban
  处里开会时，名单被念到一半。Lena听见自己的名字后面跟着“待审查”，也听见Elisabeth Winter 2的椅子在地上拖了一下。散会后，走廊尽头多了一张空桌，抽屉里还留着别人的铅笔。
  _effects: state_add institution-purge state:world-vienna-1912:918; mood -0.020000000000000018; flag +saw_the_purge_list_

- **1944.07** `state_reaction:ml18-sudden-fortune/the-papers-hear-about-it` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  报纸的社会版把Lena家的门牌号和那笔钱的数目印在一起，标题是“一笔不该有的好运”。第二天门口多了两个陌生人，一个说是远亲，一个说代表一家孤儿院。
  _effects: state_parameter ml18-sudden-fortune.public false -> true; state_parameter ml18-sudden-fortune.claims 2 -> 4; reputation -0.01999999999999999; flag +windfall_went_public_
  _causes: evt:world-vienna-1912:011207_

- **1944.09** `vienna-parish-aid.rent-box/rent-box.food-only` tags: faith, parish, mutual_aid, poverty, family
  Lena只收下篮里的面包和豆子，把煤袋推回Gustav Berg手里，说房租自己再想办法，请她们给介绍点零工。Gustav Berg把煤放在走廊窗台，说礼拜四后院有人要拆旧木箱，一赫勒一捆，工钱不多但现结。Lena记下门牌，答应一早过去。
  _effects: food; flag +seeking_work; relation acquaintance with person-gustav-berg_

- **1944.11** `statistical_infection`
  Lena在Leopoldstädter Zinshaus, gemeinsamer Gang病倒了，肺结核让身体发热、虚弱，接下来的日子只能卧床。

- **1944.12** `statistical_illness_worsened`
  Lena的肺结核没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1945.01** `state_reaction:mb17-remittance-web/border-closes` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  边境又收紧了，往故乡的列车要换乘三次。邮局说汇款还能走，但信可能压在路上；Lena还是把两张单子一起递进窗口，像把一句话交给一个不保证送达的人。
  _effects: state_parameter mb17-remittance-web.arrears 12 -> 12_
  _causes: evt:world-vienna-1912:011063_

- **1945.01** `state_reaction:ml18-sudden-fortune/a-relative-remembers` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  一个多年没走动的亲戚提着一盒点心上门，先问Lena的身体，再问那笔钱是怎么来的。临走时他说起小时候替Lena家垫过一冬天的煤钱，数字记不清了，但意思很清楚。
  _effects: state_parameter ml18-sudden-fortune.claims 1 -> 2; flag +windfall_claim_by_relative_
  _causes: evt:world-vienna-1912:011167_

- **1945.01** `vienna-life-1945-liberation/survives` tags: war, liberation, 1945
  苏联士兵进城时，Lena躲在门后听见坦克履带压过石板路。几天后街口贴出告示，Lena去领了一份汤和一块面包。
  _effects: role; food; cash -2 (replacement documents)_

- **1945.01** `office16-appointment.patronage-ledger::ctx-vienna-postwar-1945::milieu-printshop/appointed-ally` tags: office, appointment, patronage, organization, politics, power, vienna, urban
  Lena把Karl Kraus的名字写在“联络员”后面，月薪一克朗，职责是每周来两次、把外面的消息带进来。Helene Hofer说这个岗位没有编制，Lena说先按临时用工算；第一个月，Karl Kraus带来的消息比文件还多。
  _effects: position 联络员 @workshop:person-phase15-Lena-world-vienna-1912-evt:world-vienna-1912:005824; relation colleague with person-karl-kraus; knowledge “联络员不在正式编制里，工资走临时用工。”; mood 0.020000000000000018_

- **1945.01** `state_tick:ml18-sudden-fortune/fortune-year/money-keeps-working` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  一年过去，钱没有变多，却也没有一下花完。Lena把一部分存进邮局储蓄所，一部分借给楼下的鞋匠；鞋匠每月送来一双补好的鞋，利息就夹在鞋垫下面。街口的杂货商开始把好面粉留到Lena来的时候。
  _effects: cash 2 (interest and small repayments on the windfall); state_parameter ml18-sudden-fortune.claims 4 -> 5; mood 0.010000000000000009_

- **1945.01** `agency:attend_meeting` tags: agency, agency:attend_meeting
  Lena去了Haus der Tante in Klosterneuburg，坐在后排听完了关于圣马克斯殡葬合作社在Haus der Tante in Klosterneuburg经过数的争论；散会时带走一张油印提纲。
  _effects: historical development:initiative-mortuary:person-rosa-lechner-evt:world-vienna-1912:001525-1944 as participant; knowledge “我参加了圣马克斯殡葬合作社在Haus der Tante in Klosterneuburg经过数年的招募、。”; mood 0.030000000000000027_

- **1945.02** `statistical_death/tuberculosis` tags: death
  Lena咳了几个月，手帕上开始带血。1945年冬天，Lena在Haus der Tante in Klosterneuburg的床上消瘦下去，再没有力气去上工。Anna Huber在场。
  _effects: death (肺结核)_
## Anton

Born 1912.01, died 1916.12 (age 4).
Education: none 0; occupation: none; roles: infant, child.

### State snapshot
- p22-family-legend [person] (ended 1916.12: owner_died) parameters={"warmth":56,"secrecy":62,"danger":28,"promise":57} links={} ticks=2

### 12 subject events

- **1913.01** `vienna-life-infant-first-smile/smile-at-the-lamp` tags: infancy, family, first, warm
  Josefine Hofer把Anton抱到窗边，煤汽灯罩上有一圈晃动的光。孩子盯着看了很久，忽然笑出声，口水滴在Josefine Hofer的袖口上。屋里的人都停了一下，像是听见了什么了不起的消息。
  _effects: mood 0.04000000000000001; health 0.010000000000000009 (a good day)_

- **1913.05** `p22-strange-cradle-secret::ctx-vienna-1912::milieu-tenement/the-ticket-is-redeemed` tags: infancy, family, cradle, secret, inheritance, strange, dark, drama
  Josefine Hofer拿着当票去赎，取回一把银勺子，勺柄上刻着一个看不清的字母。回家后把勺子塞进Anton手里，说“用吧”；孩子敲着桌沿，勺子发出很轻的响声，像在回答什么。
  _effects: cash -5 (redeeming the pawn ticket); state_add p22-family-legend state:world-vienna-1912:30; flag +spoon_returned_

- **1913.06** `iw18-infancy.first-word::ctx-vienna-1912::milieu-tenement/the-dead-grandmothers-name` tags: infancy, first_word, memory, family, wonder, eerie, vienna, urban
  Anton扶着桌沿站起来，指着门口的空处，清清楚楚叫出一个名字。屋里没人教过这个词；Josefine Hofer手里的铝勺停在半空。那是去年冬天埋掉的老人的名字，窗外正好有送煤的车经过，铁轮压过石缝。
  _effects: mood -0.029999999999999995; knowledge “孩子说出的第一个词，是去年死去的祖母的名字。”; flag +first_word_dead_name_

- **1914.01** `vienna-life-toddler-wrong-cradle/the-neighbour-is-mistaken` tags: infancy, family, rumour, identity, comic, drama
  Josefine Hofer把被子摊在桌上，指着上面的补丁说这是外婆的针脚。Emil Weiss看了半天，承认自己认错了；Anton在旁边把一只木勺敲得咚咚响，像在给这场争论判案。
  _effects: relation acquaintance with person-emil-weiss; mood 0.02; skill_

- **1914.01** `state_tick:p22-family-legend/the-story-changes-hands/told-at-the-table` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，Anton家的故事在饭桌上换了新的讲法：多了一句笑话，少了一处哭声。听的人把汤匙放下，等下一句；讲故事的人却先去看窗子有没有关好，谁也没有先动筷子。
  _effects: state_parameter p22-family-legend.warmth 55 -> 58; state_parameter p22-family-legend.secrecy 60 -> 58; state_parameter p22-family-legend.promise 55 -> 57; mood 0.01_

- **1914.02** `vienna-life-toddler-accident/scalded-hand` tags: infancy, accident, family, danger, injury
  厨房的锅盖没有盖严，Anton伸手去够桌上的勺子，蒸汽先扑到手腕上。Josefine Hofer把孩子抱到水缸边，一瓢一瓢地浇冷水；孩子哭得打嗝，锅里的汤还在冒泡。
  _effects: health -0.07999999999999996 (scalded hand); condition; cash -1 (bandages and ointment); mood -0.05_

- **1915.01** `vienna-life-child-family-legend/stolen-inheritance` tags: childhood, family, secret, story
  Josefine Hofer说，家里本来有一件东西，后来被“更会说话的人”拿走了。Anton问是什么，Josefine Hofer只说是一块表，表盖里刻着姓。孩子记住了“表盖里刻着姓”，却没有记住那个姓。
  _effects: knowledge “家里有一块表盖里刻着姓的表，被一个更会说话的人拿走了。”; flag +family_legend_watch_

- **1916.01** `vienna-life-child-first-friend/shared-toy` tags: childhood, friendship, family, comic
  Hedwig在楼道里滚一只铁环，Anton站在门口看。Hedwig把铁环推过来，说“你推一次，我推一次”。两个人从楼梯口推到院子里，铁环倒下的声音把午睡的大人吵醒了一排。
  _effects: relation friend with person-phase15-Hedwig-world-vienna-1912; skill; mood 0.05_

- **1916.01** `state_tick:p22-family-legend/the-story-changes-hands/a-detail-goes-missing` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，故事里最要紧的那件东西不见了：先是名字，后来是地点。Anton问起时，大人说“你记错了”；可柜子最底层那只空盒子，谁也没有扔，锁却换过了，钥匙也不见了。
  _effects: state_parameter p22-family-legend.secrecy 58 -> 62; state_parameter p22-family-legend.danger 25 -> 28; state_parameter p22-family-legend.warmth 58 -> 56; mood -0.010000000000000002_

- **1916.06** `statistical_infection`
  Anton在Hofer-Wohnung, Leopoldstadt病倒了，痢疾让身体发热、虚弱，接下来的日子只能卧床。

- **1916.09** `statistical_illness_worsened`
  Anton的痢疾没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1916.12** `statistical_death/infant_diarrhoea` tags: death
  Anton在Hofer-Wohnung, Leopoldstadt连续腹泻了两天，嘴唇干裂，喂水也留不住。家里没有钱再请医生，天亮前孩子停止了呼吸。Hedwig在场。
  _effects: death (婴幼儿腹泻与脱水)_
## Hedwig

Born 1912.01, died 1927.04 (age 15).
Education: apprenticeship 0; occupation: none; roles: infant, child, pupil, reform_school_inmate, apprentice, workshop_dogsbody, first_aid_certified.

### State snapshot
- cursed-by-wish [person] (ended 1927.4: owner_died) parameters={"severity":0.6,"triggers":0} links={} ticks=0
- p22-child-omen [person] (ended 1919.1: duration expired) parameters={"strangeness":48,"attention":48,"protection":49,"fear":27} links={} ticks=4

### 49 subject events

- **1912.06** `vienna-life-birth-letter-from-the-dead/the-letter-is-a-bill` tags: infancy, family, secret, letter, drama
  信里没有问候，只有一张旧账单：棺材、墓地、一趟从边境回来的车费。Josefine Hofer把账单翻过来，背面用铅笔写着“别让孩子知道”。Hedwig伸手去抓纸角，Josefine Hofer没有让。
  _effects: cash -4 (paid an old funeral debt); flag +family_debt_letter; mood -0.030000000000000002_

- **1912.07** `p22-comic-name-register::ctx-vienna-1912::milieu-tenement/the-name-is-corrected` tags: infancy, family, bureaucracy, name, official, comic, tender, drama
  Josefine Hofer当场发现，要求改回来。登记员叹了口气，收了三克朗，把“嚏”划掉，在旁边写上正确的字，然后把笔搁下；Hedwig全程睡着，什么也没损失，只是那张纸被折成了四折。
  _effects: cash -3 (fee to correct the register); mood 0.02; flag +name_corrected_

- **1912.12** `p22-comic-christening::ctx-vienna-1912::milieu-tenement/the-candle-hits-the-font` tags: infancy, family, christening, church, neighbor, comic, tender, drama
  蜡烛从烛台上滑下来，正掉进洗礼盆，水花溅了Hermann Kral一脸，洗礼盆里的水晃了很久。Hedwig吓得大哭，Hermann Kral的帽子却浮在水面上，像一只黑色的船；孩子的鞋也湿了一只。
  _effects: mood -0.02; relation acquaintance with person-josefine-hofer; cash -1 (a ruined hat); condition_

- **1913.01** `vienna-life-infant-first-smile/smile-at-the-lamp` tags: infancy, family, first, warm
  Josefine Hofer把Hedwig抱到窗边，煤汽灯罩上有一圈晃动的光。孩子盯着看了很久，忽然笑出声，口水滴在Josefine Hofer的袖口上。屋里的人都停了一下，像是听见了什么了不起的消息。
  _effects: mood 0.04; health 0.010000000000000009 (a good day)_

- **1913.04** `p22-strange-doctor-prediction::ctx-vienna-1912::milieu-tenement/the-doctor-is-optimistic` tags: infancy, family, doctor, illness, omen, strange, dark, drama
  医生说孩子只是瘦，开了一瓶味道很坏的补药，说“过了春天就好了”。Josefine Hofer把这句话记了很多年；每年春天，家里都要说一遍，像在核对一张旧账单，药瓶上还贴着手写的标签。
  _effects: mood 0.03; state_add p22-child-omen state:world-vienna-1912:32; flag +doctor_optimism_

- **1913.04** `state_reaction:p22-child-omen/a-stranger-touches-the-door` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  一个陌生人把手按在Hedwig家的门框上，说这样能把坏运气留在门外。大人没有拦，只等那人走远，才用湿布把门框擦了一遍，布上留下一点灰，门框上留下一道浅印。
  _effects: state_parameter p22-child-omen.attention 35 -> 40; state_parameter p22-child-omen.fear 20 -> 24; state_parameter p22-child-omen.protection 45 -> 47; mood -0.009999999999999998_
  _causes: evt:world-vienna-1912:000274_

- **1914.01** `vienna-life-toddler-first-words/first-word-more` tags: infancy, family, first, comic
  Hedwig把空碗推回Josefine Hofer面前，清清楚楚地说了一个字：“还要。”Josefine Hofer愣住，随后把锅底最后一点糊刮进碗里。孩子学会了用一句话让世界再转一圈。
  _effects: skill; mood 0.03_

- **1914.01** `state_tick:p22-child-omen/the-omen-returns/nothing-happens` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  又过了一年，什么也没有发生。Hedwig照常吃饭、摔跤、把鞋穿反；那个说过预言的人搬走了。家里把红绳解下来，却没有扔，只收进针线盒最里面，红绳上落了一点灰。
  _effects: state_parameter p22-child-omen.strangeness 40 -> 38; state_parameter p22-child-omen.fear 24 -> 21; state_parameter p22-child-omen.protection 47 -> 49; mood 0.010000000000000002_

- **1915.01** `vienna-life-child-family-legend/happy-legend` tags: childhood, family, secret, story
  Josefine Hofer讲起自己小时候在乡下追一只白鹅，追到河边，鹅没追到，倒捡回一篮鸭蛋。Hedwig笑得从凳子上滑下来，Josefine Hofer也跟着笑，说这个家不是只有欠账和葬礼。
  _effects: mood 0.04; mood 0.02_

- **1916.01** `vienna-life-child-first-friend/shared-toy` tags: childhood, friendship, family, comic
  Lena在楼道里滚一只铁环，Hedwig站在门口看。Lena把铁环推过来，说“你推一次，我推一次”。两个人从楼梯口推到院子里，铁环倒下的声音把午睡的大人吵醒了一排。
  _effects: relation friend with person-phase15-Lena-world-vienna-1912; skill; mood 0.05_

- **1916.01** `state_tick:p22-child-omen/the-omen-returns/the-coincidence-repeats` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  又过了一年，同一件小事又发生了：钟停在同一个时刻，门口的狗对着空处叫。Hedwig正在学系鞋带，抬头问“又来了吗”；大人说没有，手却先去摸门框，谁也没有回答。
  _effects: state_parameter p22-child-omen.strangeness 38 -> 43; state_parameter p22-child-omen.attention 40 -> 44; state_parameter p22-child-omen.fear 21 -> 24; mood -0.010000000000000002_

- **1916.02** `vienna-life-child-inherited-wish/the-caregiver-cries` tags: childhood, family, wish, grief, uncanny, drama
  Josefine Hofer没有回答，起身去洗碗，水开得很大。Hedwig跟到厨房，拽了拽衣角，说“你别哭，我不说了”。Josefine Hofer蹲下来，把孩子抱得很紧，说“你说，你继续说”。
  _effects: mood -0.05; flag +inherited_wish_grief_

- **1916.07** `p9-childhood-household.fever-night/vinegar-compress` tags: childhood, family, household, home, siblings, illness, neighbors
  没有钱请医生，Josefine Hofer把醋瓶拎到床边，拿两只碗轮换着兑水。Hedwig烧得嘴唇起皮，Josefine Hofer用小勺喂了两口温水，又把冷布敷上去。鸡叫时热度退了一点，Hedwig睁开眼，看见Josefine Hofer趴在床沿，手指还攥着湿布。
  _effects: health 0.03 (湿敷后退了烧); mood 0.019999999999999997; relation kin with person-josefine-hofer_

- **1917.04** `vienna-early-childhood.fever-night/father-absent` tags: childhood, family, home, street
  Hedwig烧到半夜，床上只有Josefine Hofer一个人守着。水缸见了底，Josefine Hofer一手抱Hedwig，一手提桶下楼，桶沿在楼梯上磕了一下，水泼出来打湿鞋面。天亮时Friedrich Hofer推门进来，Josefine Hofer把沾着药味的湿被单团起来，塞进Friedrich Hofer怀里。
  _effects: health 0.019999999999999997 (服药后略见好转); mood -0.1_

- **1918.01** `vienna-life-school-enrolment/enrolled` tags: childhood, school, fees
  Josefine Hofer带Hedwig到Leopoldstädter Volksschule报名。Maria Moser在名册上写下孩子的姓名和出生月份，收了两克朗书本费，让孩子第二天带一块石板来。
  _effects: education primary; cash -2 (school books（其中2克朗记入债务）); role; relation acquaintance with person-materialized-world-vienna-1912-15; relation acquaintance with person-materialized-world-vienna-1912-15_

- **1918.01** `state_tick:p22-child-omen/the-omen-returns/the-coincidence-repeats` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  又过了一年，同一件小事又发生了：钟停在同一个时刻，门口的狗对着空处叫。Hedwig正在学系鞋带，抬头问“又来了吗”；大人说没有，手却先去摸门框，谁也没有回答。
  _effects: state_parameter p22-child-omen.strangeness 43 -> 48; state_parameter p22-child-omen.attention 44 -> 48; state_parameter p22-child-omen.fear 24 -> 27; mood -0.009999999999999995_

- **1918.01** `p9-gap-childhood-chores.market-line/line-half-flour` tags: childhood, household, chores, school, task, daily, market, food
  队伍从面包房门口拐进巷子，Hedwig把布袋夹在腋下，学着前面人的样子，用胳膊肘顶住后面人的篮子。窗口的伙计舀面粉时，Hedwig踮脚看着秤，直到半袋面倒进袋口。挤出人群时鞋跟被踩掉，Hedwig单脚跳了两步，在泥里摸回鞋，索性赤脚走回家。
  _effects: food; health -0.019999999999999997 (赤脚走石板路磨伤脚底); skill_

- **1918.07** `p22-comic-job-or-child::ctx-vienna-university-1912::milieu-school/the-child-comes-to-work` tags: childhood, family, work, laundry, neighbor, comic, tender, drama
  家长会和工作撞在同一天。Josefine Hofer把Hedwig带进洗衣房，孩子坐在一堆待叠的床单中间，把袜子按颜色排成队，还唱了学校学的那首歌。老板娘笑得直不起腰，准了半天假。
  _effects: mood 0.03999999999999998; mood 0.03; cash 2 (half a day's wages kept); flag +laundry_day_

- **1918.12** `p22-drama-factory-accident::ctx-vienna-university-1912::milieu-school/the-child-carries-the-tools` tags: childhood, family, work, factory, accident, foreman, dramatic, gritty
  Hedwig替Josefine Hofer把工具袋提到厂门口，袋子比孩子还宽。工头看了一眼，给了孩子一枚铜币，说“回家去”。Hedwig把铜币攥了一路，回家才发现手心全是汗，铜币被藏在枕头底下。
  _effects: cash 1 (a copper coin from the foreman); flag +tool_bag; mood 0.010000000000000009; relation acquaintance with person-materialized-world-vienna-1912-28_

- **1919.01** `vienna-life-school-day/hungry-in-class` tags: childhood, school, hunger
  Hedwig早上只喝了一碗清汤，第二节课时眼前发黑。Maria Moser让孩子去走廊坐一会儿，给了半块面包；Hedwig把面包屑拢在手心吃完，胃里还是空的，但看Maria Moser的眼神软了些，回到座位时把腰挺直了一点。
  _effects: condition; relation acquaintance with person-materialized-world-vienna-1912-15_

- **1919.01** `state_expire:p22-child-omen` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  Hedwig的「孩子身上的兆头」到期；相关安排结束。
  _effects: state_remove p22-child-omen state:world-vienna-1912:32_

- **1919.01** `p9-gap-childhood-chores.laundry-help/laundry-bread-with-friend` tags: childhood, household, chores, school, task, daily, laundry, work
  两个孩子在院子两头跑，一个递，一个夹，床单在风里鼓起来。最后一条挂好，Josefine Hofer从厨房拿出面包，先给了自家孩子，再掰一块给Hedwig。Hedwig把面包塞进围裙口袋，回家后放在家里人的碗边，说自己在外面吃过了。
  _effects: food; relation acquaintance with person-josefine-hofer; skill; relation acquaintance with person-materialized-world-vienna-1912-5_

- **1919.02** `vienna-school-childhood.spelling-bee/spelling-bee.win` tags: school, social, childhood
  拼写比赛结束时，Maria Moser敲了敲讲台说“记住这个词”。Hedwig袖口上多了一枚小十字章，回家路上Lena追着要看，最后用三颗李子换了眼福。
  _effects: reputation 0.08; mood 0.1; relation acquaintance with person-materialized-world-vienna-1912-15; food_

- **1920.01** `p9-gap-childhood-chores.school-slate/slate-borrowed-from-teacher` tags: childhood, household, chores, school, task, daily, supplies, education
  Anna Bauer 2用拇指摸了摸石板上的裂缝，没说话，从讲台抽屉最底下抽出一块旧石板，木框还在，边角被磨得发亮。借的条件是每天放学擦黑板、倒炉灰。Hedwig把石板抱在怀里，当晚就用湿布擦了三遍，第二天袖口全是白粉。
  _effects: skill; relation acquaintance with person-materialized-world-vienna-1912-13; relation acquaintance with person-materialized-world-vienna-1912-13_

- **1920.03** `r1-child.bully-teacher-son::ctx-vienna-university-1912::milieu-school/eraser-cut-in-half` tags: bullying, school, teacher, class, fear, university, culture, schooling
  教师儿子把Hedwig的橡皮切成两半，说穷人的橡皮本来就只有半块。Hedwig没有还手，把半块橡皮收进铅笔盒。第二天Hedwig发现自己的作业本被撕了两页，Anna Bauer 2问是谁干的，全班都看着窗外。
  _effects: mood -0.08000000000000002; flag +bullied_by_teachers_son; skill; relation rival with person-elisabeth-bauer_

- **1920.07** `vienna-childhood-friends.secret-kiosk/found-coin-under-rack` tags: childhood, social, school, street
  明信片架子底下有灰，Hedwig的手指碰到一枚硬东西，摸出来是两赫勒。Luise Kral背对着柜台数报纸，Hedwig把硬币攥在掌心，指给Luise Kral看一张风景画片。找零时Luise Kral的手停了一下，多看了一眼，还是把画片递了过来。
  _effects: cash -0.02 (买画片花掉捡到的硬币); condition; relation acquaintance with person-luise-kral_

- **1921.01** `p9-gap-childhood-chores.market-line/line-both-families` tags: childhood, household, chores, school, task, daily, market, food
  Emil Moser把Hedwig拽到队伍前头，往自己身前塞，说“孩子占不了多大地儿”。窗口一次递出两包面包，Hedwig把邻居那包夹在胳肢窝，自己这包抱在胸前。到Leopoldstädter Zinshaus, gemeinsamer Gang门口，Hedwig蹲下把两包并排，按Emil Moser说的份量分开，连找零的铜板也分成两小堆。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-9; skill; relation acquaintance with person-materialized-world-vienna-1912-9; relation acquaintance with person-materialized-world-vienna-1912-30_

- **1921.02** `r14-edu.humiliation::ctx-vienna-university-1912::milieu-school/mocked-for-patches` tags: education, school_humiliation, reputation, childhood, university, culture, schooling, school
  Maria Moser让Hedwig站到黑板前，指着袖口的补丁说，这样的手也配拿钢笔。教室里有人笑，Grete Hofer没有笑，低头翻书。Hedwig站到下课，回到座位时，发现课本被人用粉笔写了两个字。Hedwig用袖子擦，越擦越白。
  _effects: mood -0.18; reputation -0.12; flag +humiliated_in_class; relation rival with person-materialized-world-vienna-1912-15; relation acquaintance with person-materialized-world-vienna-1912-36_

- **1921.06** `vienna-childhood-street.market-errand/errand-ok` tags: childhood, street, social, home
  市场里的菜摊一字排开，Hedwig把十五克鲁泽排在掌心，先买了土豆，又去盐摊上要了一小包。摊主用旧报纸把盐裹好，Hedwig把它塞进围裙内袋，土豆兜在身前。回家时Josefine Hofer接过铜板一枚枚数，土豆一颗没少。
  _effects: food; cash -0.15 (市场花销); relation kin with person-josefine-hofer_

- **1921.07** `vienna-school-childhood.spelling-bee/spelling-bee.win` tags: school, social, childhood
  拼写比赛结束时，Anna Bauer 2敲了敲讲台说“记住这个词”。Hedwig袖口上多了一枚小十字章，回家路上Emil追着要看，最后用三颗李子换了眼福。
  _effects: reputation 0.08; mood 0.1; relation acquaintance with person-materialized-world-vienna-1912-13; food_

- **1922.01** `r14-edu.music-lessons::ctx-vienna-university-1912::milieu-school/rejected-for-small-hands` tags: education, arts_training, music, craft, university, culture, schooling, school
  Maria Moser看了Hedwig的手，说指头太短，够不到八度，学下去也是白费。Hedwig把手收进袖子里，回家后把琴谱还回去，放在琴房的窗台上。那天晚上，Hedwig在院子里坐了很久，听见隔壁有人在练同一支曲子。
  _effects: mood -0.1; flag +rejected_by_music_teacher; relation rival with person-materialized-world-vienna-1912-15_

- **1923.01** `r14-edu.music-lessons::ctx-vienna-university-1912::milieu-school/self-taught-on-old-piano` tags: education, arts_training, music, craft, university, culture, schooling, school
  Hedwig交不起学费，Anna Bauer 2把旧琴谱借给Hedwig，说先自己练，有问题再来问。Hedwig把琴谱抄在牛皮纸上，用家里的风琴练指法。邻居来敲门，说吵，Hedwig就在琴键之间垫一条布，声音闷得像从隔壁传来。琴谱一克朗，是Anna Bauer 2替Hedwig垫的。
  _effects: cash -1 (琴房里漏风的窗); flag +self_taught_musician; skill; relation acquaintance with person-materialized-world-vienna-1912-44_

- **1924.01** `r13-edu.school-transfer::ctx-vienna-university-1912::milieu-school/acquaintance-in-office` tags: education, school, transfer, bureaucracy, family, university, culture, schooling
  Hedwig的邻居在市政厅当差，替Hedwig把材料直接送到教育科。三天后，转学证寄到家里，上面多了一行手写批注：“准予插入三年级。”Hedwig把证翻来覆去看，发现自己的名字被写错了一个字母。名字写错的事Hedwig没去改，反正学籍号是对的，老师点名时也这么叫。
  _effects: flag +school_transfer_approved; knowledge “the school transfer certificate misspells the name”_

- **1924.02** `p9-childhood-adolescence.church-club/club-follow-without-paying` tags: adolescence, friendship, identity, work, school, secret, church
  Hedwig口袋里没有十赫勒，却还是跟着队伍走到车站。修女在栅栏边拦住Hedwig，翻了翻名册，说没交钱的孩子不能上车；Mitzi Lechner在车厢门口回头看。
  _effects: reputation -0.03; relation acquaintance with person-mitzi-lechner; mood -0.03_

- **1924.02** `r3-crime.juvenile-court::ctx-vienna-university-1912::milieu-school/sent-to-reform-school` tags: crime, youth, court, family, school, university, culture, schooling
  Maria Bauer说家里管不了，不如让学校管。Josefine Hofer想说什么，被Friedrich Hofer递过来的一张表格挡住了。Hedwig被带走时，Josefine Hofer追到走廊尽头，把一包糖塞进Hedwig的口袋。Friedrich Hofer说“到了那边会检查”，又把糖拿走了。
  _effects: condition; flag +sent_to_reform_school; role; relation rival with person-josefine-hofer; move place-wien-volksschule-leopoldstadt; education apprenticeship; relation acquaintance with person-materialized-world-vienna-1912-26_

- **1925.01** `r13-edu.boarding-school::ctx-vienna-university-1912::milieu-university/admitted-to-dormitory` tags: education, boarding_school, residence, family, scholarship, university, culture, schooling
  Hedwig把铁皮箱绑在自行车后座，骑了三十里到寄宿学校。舍监检查行李，把家里的腌菜罐没收，说会招老鼠。Hedwig在熄灯后偷偷把罐子从垃圾堆捡回来，藏在床底，第一顿饭就着腌菜吃完了两碗粥。第一个星期Hedwig把腌菜分给同屋，换回三张邮票和一支不漏水的钢笔。
  _effects: flag +boarding_school_admitted; education secondary_

- **1925.02** `r14-edu.entrance-failure::ctx-vienna-reform-1930::milieu-school/passed-but-no-fee` tags: education, exam_failure, entrance_exam, shame, reform, medical, schooling, school
  Hedwig过了录取线，学费却还差十二克朗。Friedrich Hofer把存折翻到最后一面，又去问邻居借，回来时只说再等等。报到日过去三天，名额给了候补。Hedwig把录取通知压在玻璃板下，每天写功课前都看一眼那枚红章。报名费两克朗，是母亲从菜钱里扣的。
  _effects: cash -2 (放榜墙上的空白); mood -0.07999999999999999; flag +admission_fee_shortfall; relation acquaintance with person-materialized-world-vienna-1912-50_

- **1926.01** `vienna-life-apprenticeship/printshop-apprentice` tags: adolescence, work, apprenticeship, employment
  Buchdruckerei Winter & Söhne让Hedwig下周一到排字房报到，先搬铅字和扫地，月薪十八克朗。家里用第一笔预付工资买了双结实的鞋。
  _effects: education apprenticeship; employment Schriftsetzerlehrling @ org-winter-print; cash 6 (apprentice advance); role_

- **1926.01** `p9-childhood-apprenticeship.learn-the-task/polished-type-redo` tags: adolescence, work, apprenticeship, labour, training, family, task, task:work
  Hedwig以为字越亮越好，拿干布把每个铅字都擦了一遍。开机后油墨从字面滑开，第一张广告上的价钱像被水泡过。Luise Kral没骂，只把纸推到Hedwig面前，让Hedwig自己看。倒字、重排、再上机，等到最后一张印清，窗外已经点灯，Hedwig的腿站得发木。
  _effects: mood -0.060000000000000026; skill; relation colleague with person-luise-kral_

- **1926.02** `yf18-dare.prater-slide::ctx-vienna-reform-1930::milieu-school/caught-by-the-watchman` tags: dare, prater, fairground, comic, friendship, reform, medical, schooling
  Mitzi Berg 3的灯从摩天轮那边晃过来时，Lena已经跑没影了，Hedwig的鞋带却挂在木槽边。Mitzi Berg 3把Hedwig带到园门口，记下住址，说星期一让学校来领人；Hedwig一路上只担心Lena会不会把这件事讲给全班。
  _effects: reputation -0.05; mood -0.04000000000000001; flag +yf18_prater_caught; relation friend with person-phase15-Lena-world-vienna-1912; cash -2 (a fine paid at the Prater office); relation acquaintance with person-materialized-world-vienna-1912-53; relation acquaintance with person-materialized-world-vienna-1912-56_

- **1926.02** `vienna-apprentice-printshop.lead-type-drop/lead-type-drop.repaired` tags: work, apprentice, factory, social
  Anna Huber把散落的铅字按字母补回字盘，Hedwig赶在午休前重新排完价目表。Buchdruckerei Winter & Söhne用指甲划过一行，说“排得还直”，没扣钱，只让把过道扫干净。
  _effects: skill; relation colleague with person-materialized-world-vienna-1912-46; relation acquaintance with person-materialized-world-vienna-1912-46_

- **1926.04** `r1-fam.sibling-rivalry::ctx-vienna-reform-1930::milieu-school/rivalry.neither` tags: family, siblings, rivalry, apprenticeship, craft, reform, medical, schooling
  Mitzi Berg 3看了看兄弟俩的手，说两个人的指节都不够硬，谁也不收。Friedrich Hofer求了半天，Mitzi Berg 3答应让两人一起干杂活，管饭不给钱。Lena干了三天就走了，Hedwig留下来扫地、磨刀，磨到第六个月，Mitzi Berg 3才让她碰第一块好木料。
  _effects: cash 1 (同一把刨子); flag +worked_up_from_dogsbody; role; skill; relation acquaintance with person-phase15-Lena-world-vienna-1912_

- **1926.11** `statistical_infection`
  Hedwig在Leopoldstädter Volksschule病倒了，肺炎让身体发热、虚弱，接下来的日子只能卧床。

- **1926.12** `statistical_illness_worsened`
  Hedwig的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1926.12** `r13-turn.exam-failure::ctx-vienna-reform-1930::milieu-school::reform-open-secondary/name-missing` tags: education, exam, failure, school, work, reform, medical, schooling
  补考那天，Hedwig在考场门口等到钟响，监考说名单上没有名字。Marie Huber跑去教务处，回来时手里只有一张转学建议。Hedwig去了印刷厂当学徒，师傅说铅字比字母好认，至少不会骗人。
  _effects: condition; flag +left_school_after_exam_failure; relation colleague with person-marie-huber; education apprenticeship_

- **1927.01** `r14-edu.reputation-repair::ctx-vienna-reform-1930::milieu-school/passed-public-exam` tags: education, school_humiliation, reputation, repair, reform, medical, schooling, school
  Hedwig报名参加州里的中学毕业考试，考场设在原来的学校。Maria Moser在监考名单上看见Hedwig的名字，什么也没说，只在发卷时多放了一支削好的铅笔。Hedwig考完最后一门，把铅笔留在桌上，走出校门时没有回头。
  _effects: reputation 0.1; flag +reputation_repaired; education secondary_
  _causes: evt:world-vienna-1912:001519_

- **1927.01** `r13-civ.first-aid-course::ctx-vienna-university-1912::milieu-university/certificate-earned` tags: health, first_aid, course, skill, school, university, culture, schooling
  Mitzi Berg 3把一条绷带绕在Hedwig的小臂上，教怎么打结才不会勒住血管。Hedwig在同桌的手臂上练了三遍，最后一遍得到了点头。课程结束时，Mitzi Berg 3发了一张油印证书，上面盖着红十字的章。
  _effects: flag +earned_first_aid_certificate; role; skill; knowledge “a bandage must be tight enough to hold but loose enough for ”_

- **1927.03** `statistical_illness_worsened`
  Hedwig的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1927.04** `statistical_death/pneumonia` tags: death
  Hedwig在Leopoldstädter Zinshaus, gemeinsamer Gang发起高烧，咳嗽越来越深。邻居帮忙去请医生，医生到时只留下药粉和一张账单；几天后呼吸变得很浅。Lena在场。
  _effects: death (肺炎)_
## Grete Kral

Born 1901.01, alive at 1957.
Education: primary 2; occupation: none; roles: resident, worker, partner, street_fight_suspect, office:放映员, health_volunteer, cabaret_singer, movement_member, separated, warehouse_keeper, guardian, charity_visitor, countered_rumour, actor, quarantined_resident, office:发起人, teaching_case, mourner, office:夜班司机, tenant_organizer.

### State snapshot
- raising-child [household] (ended 1944.1: duration expired) parameters={"caregiverBurden":29,"schoolProgress":86,"childConfidence":59,"careDebt":4,"schoolEnrolled":true,"leftHome":false} links={"child":"Luise Stein"} ticks=11
- raising-child [household] (ended 1941.1: duration expired) parameters={"caregiverBurden":18,"schoolProgress":100,"childConfidence":55,"careDebt":0,"schoolEnrolled":false,"leftHome":false} links={"child":"Rosa Stein"} ticks=10
- raising-child [household] (ended 1946.1: duration expired) parameters={"caregiverBurden":60,"schoolProgress":57,"childConfidence":55,"careDebt":0,"schoolEnrolled":false,"leftHome":false} links={"child":"Helene Stein"} ticks=12
- oj18-odd-apprenticeship [person] (ended 1928.1: duration expired) parameters={"trust":40,"strangeKnowledge":28,"reliability":50,"nightsWorked":24,"post":"放映学徒"} links={} ticks=2
- ad20-private-bargain [person] (ended 1932.1: duration expired) parameters={"leverage":61,"trust":50,"debt":64,"exit":19} links={"creditor":"Grete Moser 5"} ticks=5
- mb17-remittance-web [household] (ended 1935.11: replaced_by:mb17-remittance-web) parameters={"obligation":61,"supportSent":9,"arrears":7,"relativesAway":3} links={} ticks=3
- ad20-private-bargain [person] (ended 1934.1: duration expired) parameters={"leverage":52,"trust":37,"debt":50,"exit":19} links={} ticks=2
- ml18-sudden-fortune [household] (ended 1932.10: replaced_by:ml18-sudden-fortune) parameters={"principal":50,"spent":0,"claims":0,"public":true,"source":"银行恐慌中的股票"} links={} ticks=0
- ml18-sudden-fortune [household] (ended 1935.1: duration expired) parameters={"principal":0,"spent":0,"claims":12,"public":true,"source":"墙里的铁盒"} links={} ticks=3
- hs18-street-witness [person] (ended 1940.1: the witness became more dangerous than the crime) parameters={"certainty":53,"danger":80,"retellings":1,"claim":"我把在面包队里看见的那张脸卖给了记者。","quiet":false} links={} ticks=5
- stage-sovereign [person] (ended 1937.1: duration expired) parameters={"production":"《铅皮王冠》","role":"被废黜的国王","publicBelief":28,"costumeQuality":65,"scandal":0,"performances":10} links={} ticks=2
- mb17-remittance-web [household] (ended 1946.1: duration expired) parameters={"obligation":89,"supportSent":10,"arrears":12,"relativesAway":3} links={} ticks=6
- detained [person] (ended 1938.1: duration expired) parameters={"charge":"身份冒用","months":6} links={} ticks=1
- p21-scandal-web [person] (ended 1939.1: replaced_by:p21-scandal-web) parameters={"exposure":71,"loyalty":35,"leverage":28,"danger":60} links={} ticks=2
- ml18-sudden-fortune [household] (ended 1939.1: duration expired) parameters={"principal":13,"spent":5,"claims":5,"public":true,"source":"瓶盖专利的许可费"} links={} ticks=3
- debt-bondage [person] (ended 1940.1: duration expired) parameters={"debt":28,"creditor":"死者家属"} links={} ticks=3
- public-scandal [person] (ended 1941.1: duration expired) parameters={} links={} ticks=1
- p21-scandal-web [person] (ended 1941.1: the auction turned the secret network into an open scandal) parameters={"exposure":88,"loyalty":25,"leverage":44,"danger":65} links={} ticks=1
- under-investigation [person] (ended 1940.1: duration expired) parameters={"progress":25,"charge":"诈死逃债"} links={} ticks=1
- pl19-protected-scandal [person] (ended 1944.1: duration expired) parameters={"exposure":50,"protection":53,"leverage":39,"publicHeat":51} links={"protector":"Alois Berg"} ticks=6
- oj18-odd-apprenticeship [person] (ended 1941.1: duration expired) parameters={"trust":2,"strangeKnowledge":22,"reliability":45,"nightsWorked":0,"post":"动物园夜班饲养员"} links={} ticks=2
- ml18-sudden-fortune [household] (ended 1941.1: duration expired) parameters={"principal":25,"spent":0,"claims":3,"public":false,"source":"分给马票经纪人的一半"} links={} ticks=3
- bc18-bureaucratic-ghost [person] (ended 1942.1: duration expired) parameters={"fileDepth":51,"sightings":3,"risk":40,"duplicates":4,"officialStatus":"同时活着和死了","alias":"少了一个字母的名字"} links={} ticks=3
- political-suspect [person] (ended 1947.1: duration expired) parameters={"heat":0.13000000000000006,"file":"政治档案"} links={} ticks=7
- public-scandal [person] (ended 1942.1: duration expired) parameters={} links={} ticks=1
- pc20-public-reversal [person] (ended 1944.1: a public reversal became a private chance to rebuild) parameters={"proof":71,"pressure":55,"support":62,"danger":41} links={"accuser":"Otto Bauer"} ticks=2
- ml18-sudden-fortune [household] (ended 1943.1: duration expired) parameters={"principal":18,"spent":0,"claims":5,"public":true,"source":"叔父的印刷所"} links={} ticks=2
- ml18-sudden-fortune [household] (ended 1945.1: duration expired) parameters={"principal":13,"spent":5,"claims":4,"public":true,"source":"叔父的印刷所"} links={} ticks=2
- pc20-second-chance [person] (ended 1945.1: duration expired) parameters={"credibility":38,"debt":30,"hope":50,"suspicion":48} links={} ticks=1
- raising-child [household] (active) parameters={"caregiverBurden":59,"schoolProgress":55,"childConfidence":53,"careDebt":9,"schoolEnrolled":false,"leftHome":false} links={"child":"Anna 2"} ticks=6
- pc20-public-reversal [person] (ended 1947.1: a public reversal became a private chance to rebuild) parameters={"proof":70,"pressure":50,"support":55,"danger":35} links={"accuser":"Otto Lechner 2"} ticks=1
- known-affair [person] (ended 1945.3: replaced_by:public-scandal) parameters={"notoriety":30,"grief":0,"exposure":80,"discretion":10,"remarried":false,"origin":"exposed"} links={} ticks=0
- public-scandal [person] (ended 1947.1: duration expired) parameters={} links={} ticks=1
- p22-scandal-engine [person] (ended 1948.1: duration expired) parameters={"heat":69,"reach":48,"leverage":45,"shame":72} links={} ticks=2
- chronic-illness [person] (ended 1957.1: duration expired) parameters={"severity":0.8499999999999999,"years":5} links={} ticks=11
- ml18-sudden-fortune [household] (ended 1949.1: duration expired) parameters={"principal":0,"spent":10,"claims":7,"public":true,"source":"墙里的铁盒"} links={} ticks=3
- pc20-second-chance [person] (ended 1949.1: duration expired) parameters={"credibility":27,"debt":33,"hope":50,"suspicion":64} links={} ticks=2
- public-scandal [person] (ended 1950.1: duration expired) parameters={} links={} ticks=1
- p22-scandal-engine [person] (ended 1950.1: duration expired) parameters={"heat":53,"reach":54,"leverage":18,"shame":44} links={} ticks=2
- ml18-sudden-fortune [household] (ended 1949.2: replaced_by:ml18-sudden-fortune) parameters={"principal":45,"spent":5,"claims":3,"public":true,"source":"银行恐慌中的股票"} links={} ticks=1
- debt-bondage [person] (ended 1952.1: duration expired) parameters={"debt":12,"creditor":"房东"} links={} ticks=2
- ml18-sudden-fortune [household] (ended 1951.1: duration expired) parameters={"principal":15,"spent":5,"claims":2,"public":false,"source":"转卖的金矿股份"} links={} ticks=2
- ml18-sudden-fortune [household] (ended 1951.2: replaced_by:ml18-sudden-fortune) parameters={"principal":10,"spent":0,"claims":5,"public":true,"source":"被报纸核对过的彩票"} links={} ticks=1
- public-scandal [person] (ended 1953.1: duration expired) parameters={} links={} ticks=1
- p21-scandal-web [person] (ended 1954.1: duration expired) parameters={"exposure":96,"loyalty":25,"leverage":38,"danger":70} links={} ticks=3
- under-investigation [person] (ended 1952.1: duration expired) parameters={"progress":25,"charge":"诈死逃债"} links={} ticks=1
- ad20-public-attention [person] (ended 1954.1: duration expired) parameters={"attention":40,"sympathy":35,"danger":26,"opportunity":50} links={} ticks=4
- stage-sovereign [person] (ended 1951.1: duration expired) parameters={"production":"《铅皮王冠》","role":"国王替角","publicBelief":5,"costumeQuality":35,"scandal":0,"performances":0} links={} ticks=1
- ml18-sudden-fortune [household] (ended 1953.1: duration expired) parameters={"principal":0,"spent":0,"claims":7,"public":true,"source":"转卖的金矿股份"} links={} ticks=2
- oj18-odd-apprenticeship [person] (ended 1954.1: duration expired) parameters={"trust":16,"strangeKnowledge":23,"reliability":55,"nightsWorked":0,"post":"电梯员"} links={} ticks=2
- ml18-sudden-fortune [household] (ended 1955.1: duration expired) parameters={"principal":0,"spent":10,"claims":7,"public":true,"source":"瓶盖专利的许可费"} links={} ticks=3
- oj18-odd-apprenticeship [person] (ended 1956.1: duration expired) parameters={"trust":40,"strangeKnowledge":20,"reliability":55,"nightsWorked":24,"post":"夜班出租车司机"} links={} ticks=2
- public-scandal [person] (ended 1956.1: replaced_by:public-scandal) parameters={} links={} ticks=0
- p22-scandal-engine [person] (ended 1956.1: replaced_by:p22-scandal-engine) parameters={"heat":40,"reach":45,"leverage":20,"shame":35} links={} ticks=0
- ml18-sudden-fortune [household] (ended 1957.1: duration expired) parameters={"principal":0,"spent":0,"claims":4,"public":true,"source":"赌场的车马费"} links={} ticks=2
- public-scandal [person] (active) parameters={} links={} ticks=0
- p22-scandal-engine [person] (active) parameters={"heat":50,"reach":50,"leverage":30,"shame":56} links={} ticks=1
- ad20-public-attention [person] (active) parameters={"attention":48,"sympathy":38,"danger":26,"opportunity":52} links={} ticks=2
- pc20-public-reversal [person] (active) parameters={"proof":37,"pressure":71,"support":20,"danger":51} links={"accuser":"Anna Winter"} ticks=1
- pc20-second-chance [person] (active) parameters={"credibility":23,"debt":48,"hope":25,"suspicion":68} links={} ticks=1

### 275 subject events

- **1919.02** `p9-gap-adult-unemployed.pawnshop/pawn-neighbor-tops-up` tags: adulthood, unemployment, casual_labour, poverty, daily, pawn, cash
  伙计重新开票时抬眼看了看两个人。Karl Kraus说表是她家老头子留下的，不能就这么折在柜台上。出门后Grete Kral把表重新戴上，表链贴着腕子，凉得叫人一激灵。
  _effects: cash 3 (邻居垫付的赎表钱); relation acquaintance with person-karl-kraus; relation acquaintance with person-materialized-world-vienna-1912-13_

- **1919.02** `vienna-medical-treatment.night-fever/sweat-it-out` tags: health, medical, family, money
  醋水的酸味混着汗气，屋子小得转不开身。Otto Winter把布拧到不滴水，敷上去时Grete Kral打了个激灵。窗外送奶车吱呀碾过石板，她才想起自己家的炉子还灭着。
  _effects: condition; relation friend with person-otto-winter_

- **1919.05** `p9-social-tenement-neighbors.evicted-neighbours/evicted-neighbours.district-office-queue` tags: housing, neighbors, tenement, daily, money, reputation
  Grete Kral陪Luise Moser去区公所排队问救济和临时床位，从午后站到天擦黑。Maria Bauer翻了名册，给了一张可换两晚铺位的纸。回来时Grete Kral把自己的外套披在孩子身上，说这一趟到底没白跑。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-5; mood 0.03; relation acquaintance with person-materialized-world-vienna-1912-5; relation acquaintance with person-materialized-world-vienna-1912-26_

- **1920.01** `vienna-family-childbirth/son-born` tags: family, childbirth, death, lifecycle, birth, state, state:raising-child, raising-child
  Grete Kral在Leopoldstädter Zinshaus, gemeinsamer Gang生下一个男婴，取名Otto Lechner。工友凑的钱抵了一部分，家里还是从糖罐里数出六克朗给接生的人；Franz Lechner把消息带到工厂，回来时把唯一的摇篮重新刷了一遍，Grete Kral躺在床上出了一身虚汗。
  _effects: birth male; cash -6 (midwife fee（其中6克朗记入债务）); state_add raising-child state:world-vienna-1912:61_

- **1920.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Otto Lechner这周主动擦了黑板。Grete Kral把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 20 -> 23; mood 0.020000000000000004_
  _causes: evt:world-vienna-1912:001398_

- **1920.10** `vienna-housing-move.rent-notice/rent-notice-demand-repair` tags: housing, home, rent, family, money
  Grete Kral没有立刻答话，先去敲Gustav Berg的门。两人一起数落墙上的水渍和门框里灌进来的风，楼梯间的窗户修好了，自家墙皮还在剥落。Gustav Berg提议一起把话带给看门人：先修好漏水的墙角，涨租的事再谈。Grete Kral把纸重新折好，请他把话带到门外。
  _effects: relation acquaintance with person-gustav-berg; mood 0.03; flag +rent_dispute_

- **1920.10** `major-crisis.street-violence/swing-first` tags: crisis, politics, violence, death, street, reputation
  有人朝Grete Kral这边扔了半块砖。Grete Kral抓住Grete Moser 3的衣领，把他往墙上一推，又用鞋跟踢中他的小腿；Grete Moser 3倒下时，太阳穴磕在排水沟的铁盖上，抽搐了两下就不动了。Karl Kraus拉着Grete Kral钻进巷子。第二天，市场门口贴出一张悬赏找目击者的告示。
  _effects: condition; reputation -0.12; relation acquaintance with person-karl-kraus; role; flag +street_violence_perpetrator; death (head injury after falling during a street fight)_

- **1920.10** `vienna-legacy-worklife.apprentice-wage/apprentice-wage.beer-with-senior` tags: legacy, work, family, reform, ordinary_life
  十二赫勒换来两杯淡啤酒，找零是四枚一赫勒的铜币。Grete Kral把铜币收好，听师兄讲那年冬天的事，讲到一半师兄停了停，说“你别到处讲”。酒馆里有人拉手风琴，声音盖过了后半句。
  _effects: cash -1 (请师兄喝一杯啤酒（其中1克朗记入债务）); relation colleague with person-materialized-world-vienna-1912-25; skill; relation acquaintance with person-materialized-world-vienna-1912-25_

- **1921.01** `vienna-family-childbirth/difficult-birth` tags: family, childbirth, death, lifecycle, birth, state, state:raising-child, raising-child
  Grete Kral难产，接生的人守了两天。孩子最后生下来，取名Elisabeth Lechner；Grete Kral一直发烧，医院又收走二十克朗，Franz Lechner把钟表送进当铺。Grete Kral落下产后虚弱的毛病，抱孩子时手臂发抖，站久了眼前就发黑。
  _effects: birth female; condition; cash -20 (midwife and hospital（其中20克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-14; state_add raising-child state:world-vienna-1912:64_

- **1921.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Grete Kral把Otto Lechner的旧课本包上书皮，又在本子上签了名。Otto Lechner今年学会了自己系鞋带，也学会了在饭桌上说“不”；Grete Kral听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 23 -> 31; state_parameter raising-child.caregiverBurden 45 -> 42; mood 0.020000000000000004_

- **1921.05** `vienna-women-housework.piecework-bundle/piecework.overnight` tags: gender, housework, home, labour, family
  Grete Kral点着煤油灯缝到后半夜，把一捆领子全做完了。针脚密是密，可天亮时她看东西重影，手指被针扎了三回。星期六交活，Emil Moser量了量尺寸，收下整捆，数出七十五赫勒推过桌面。
  _effects: cash 0.75 (交了一整捆衬衫领子的计件工钱); mood 0.020000000000000004; relation acquaintance with person-materialized-world-vienna-1912-20_

- **1921.08** `vienna-parish-aid.rent-box/rent-box.accept-all` tags: faith, parish, mutual_aid, poverty, family
  煤袋落在台阶上，扬起细细一层黑末。Karl Kraus用铅笔头在蓝格册上写门牌号，问房东姓什么，又叮嘱别把面包票弄丢。灶上水壶开始叫，Grete Kral才想起屋里连只干净的杯子都没有。
  _effects: cash 6 (互助会补上本月房租差额); food; relation acquaintance with person-karl-kraus; flag +parish_registered_

- **1921.10** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Elisabeth Lechner这周主动擦了黑板。Grete Kral把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 20 -> 23; mood 0.020000000000000004_
  _causes: evt:world-vienna-1912:001632_

- **1921.10** `vienna-illness-household.wage-earner-injury/report-unsafe` tags: health, family, home
  Grete Kral和工友围住Buchdruckerei Winter & Söhne，指着冲床说这机器要修。Buchdruckerei Winter & Söhne骂完还是叫人来钉护板；Maria Bauer的手没全好，厂里却多了块木板，Grete Kral也多了个“爱出头”的名声。
  _effects: relation colleague with person-materialized-world-vienna-1912-26; condition; reputation 0.1_

- **1921.11** `vienna-market-household.soup-kitchen/soup-kitchen.sell` tags: home, market, food, social
  鞋匠敲后门问有没有热汤，Grete Kral把剩下的半锅倒进他的罐子里，收下两个十字币。Hedwig Stein提着空碗上来时，只看见Grete Kral把硬币塞进围裙口袋。
  _effects: cash 2 (卖出半锅扁豆汤); food; relation acquaintance with person-hedwig-stein_

- **1922.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Grete Kral把Elisabeth Lechner的旧课本包上书皮，又在本子上签了名。Elisabeth Lechner今年学会了自己系鞋带，也学会了在饭桌上说“不”；Grete Kral听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 23 -> 31; state_parameter raising-child.caregiverBurden 45 -> 42; mood 0.01999999999999999_

- **1922.02** `p9-gap-adult-unemployed.pawnshop/pawn-accepted-watch` tags: adulthood, unemployment, casual_labour, poverty, daily, pawn, cash
  玛丽亚希尔夫街的当铺里点着煤油灯，柜台高得只看见伙计的袖套。他报出七克朗时，排在后头的Josefine Hofer探了探头。Grete Kral没还价，拿了钱和当票就往外走。
  _effects: cash 7 (当掉旧怀表所得); mood -0.03_

- **1922.06** `vienna-women-housework.wash-day/wash-day.rush` tags: gender, housework, home, labour, family
  木盆边的水渍映着天光，Grete Kral跪在石阶上揉搓床单，肘弯发酸。晾绳上的湿布滴答作响，Mitzi Moser探身把自家被单也挂上去，两人没多说话。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-24_

- **1922.07** `vienna-legacy-worklife.union-office/union-office.post-ledger` tags: legacy, work, family, reform, ordinary_life
  窗外是维也纳第十五区的一条窄街，卖烤栗子的炉子冒着白烟。Grete Kral贴完纸退后两步看，发现“欠”字被浆糊洇开了一点。老成员没说话，只把眼镜摘下来擦了又擦。
  _effects: reputation 0.05; flag +union_ledger_public_

- **1923.02** `p9-history-medical-daily.pharmacy-shortage/hospital-pharmacy-queue` tags: health, medical, public_health, family, pharmacy, sanitation, daily
  Grete Kral拿着处方去综合医院药房排队，直到傍晚才领到替代药。玻璃窗口里的修女说原方缺货，给了六粒白色药片，嘱咐饭后再服，没有收钱。Grete Kral站了一天，腿肿了，咳嗽却松了些；也记住了这条不要钱、只要耐性的路。
  _effects: health 0.03 (领到替代药并服用); mood -0.04; knowledge “综合医院药房缺货时会发替代药片，不要钱但排队长”; relation acquaintance with person-materialized-world-vienna-1912-42_

- **1924.12** `vienna-history-kraus-lecture/listen-from-a-pillar` tags: history, culture, karl_kraus, cafe_central, public_lecture, press
  后厅的椅子不够，Grete Kral 站在柱子旁听Karl Kraus 读一篇关于报纸谎言的文章。Karl Kraus 读到一半停下来，指出台下某位记者上周写的句子，那人把帽子压低。散场后，Grete Kral 在账单背面抄下一句，墨迹被咖啡杯底印开。
  _effects: knowledge “Karl Kraus 在咖啡馆公开朗读时，会逐句引用报纸原文并指出其中的修辞和谎言。”; relation acquaintance with person-karl-kraus; cash -2 (coffee and a seat at Café Central); mood 0.02; skill_

- **1925.01** `oj18-cinema.reel::ctx-vienna-reform-1930::milieu-tenement/cut-the-reel` tags: cinema, film, projection, night, censorship, work, odd_job, reform
  放映到第十一本，胶片在片门里卷成一团。Grete Kral剪掉烧焦的一截，发现后面接的是一卷没送审的新闻片：军靴踏过广场，镜头扫过一张张被按下去的脸。Otto Lechner 2在黑暗里说“接回正片”，Grete Kral照做了。
  _effects: organization_found 小巷电影院 (household_firm); position 放映员 @cinema:person-materialized-world-vienna-1912-17-evt:world-vienna-1912:002644; state_add oj18-odd-apprenticeship state:world-vienna-1912:143; cash 1 (projectionist wages); skill; flag +cut_the_reel; knowledge “第十一本胶片里夹着没送审的新闻片，{projectionist}让我接回正片。”; relation acquaintance with person-materialized-world-vienna-1912-39; role; flag +odd_job_apprentice_

- **1925.05** `vienna-tenement-neighbors.lost_room_key/key_stolen_by_stranger` tags: home, social, family, housing
  Grete Kral记得出门时钥匙还在，回来却没了。Anton Bauer说下午看见一个穿灰外套的男人在楼道里转悠，手里晃着一把铜钥匙。两人下楼查看，房门虚掩，抽屉被拉开，攒着买煤的六克朗不见了。Anton Bauer陪着Grete Kral去街角警察岗亭报了案，警察记下灰外套，说会留意。
  _effects: cash -6 (被盗的买煤钱); relation friend with person-materialized-world-vienna-1912-6; mood -0.1_

- **1925.05** `vienna-market-household.friday-fish/friday-fish.salt` tags: home, market, food, social
  腌鲱鱼切成两段，一段今天吃，一段留着。黑面包硬得要用刀锯。Hermann Kral来借盐，眼睛落在鱼上，说可以用半棵卷心菜换一块。Grete Kral切了一指宽递过去。
  _effects: cash -2 (腌鲱鱼和黑面包); food; relation acquaintance with person-hermann-kral_

- **1925.05** `vienna-housing-move.sublet-room/sublet-full` tags: housing, home, rent, family, money, household
  Grete Kral把床上的旧褥子重新铺平，Marie Huber放下自己的铺盖卷，从怀里掏出一把钥匙看了看。厨房里多了一口人的碗，灶边的煤省着烧也够。Hedwig Stein在门口看了一眼，没多话。
  _effects: cash 4 (出租空床收进的月租); household; relation acquaintance with person-hedwig-stein_

- **1926.01** `state_tick:oj18-odd-apprenticeship/strange-year/trusted-with-the-keys` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  两年过去，Grete Kral已经能闭着眼说出哪块地板会响、哪盏煤气灯该在几点关。师傅把备用钥匙交下来，没有解释为什么第三把钥匙磨得最亮；Grete Kral也没有问，只在巡查簿最后一页画了一个小小的记号。
  _effects: state_parameter oj18-odd-apprenticeship.trust 30 -> 40; state_parameter oj18-odd-apprenticeship.strangeKnowledge 18 -> 28; state_parameter oj18-odd-apprenticeship.nightsWorked 0 -> 24; cash 2 (night-shift wages); skill_

- **1926.01** `p9-social-relationship-initiative.borrow-handcart/only-the-cart` tags: courtship, friendship, family, social, initiative, housing, task, task:social
  开口时只提了手推车，钱的事咽回去。对方爽快地把车钥匙样的铁钩递过来，说用完了搁回院里就行。十克朗改去当铺想办法，一件旧外套和一只怀表抵了十二克朗，赎期三个月，票据折好收在证件夹里。
  _effects: cash 12 (当铺抵当旧外套和怀表换来的钱); relation friend with person-materialized-world-vienna-1912-48; mood -0.020000000000000004; relation acquaintance with person-materialized-world-vienna-1912-48; relation acquaintance with person-materialized-world-vienna-1912-53_

- **1926.05** `vienna-parish-aid.funeral-society/funeral-society.defer` tags: faith, parish, mutual_aid, poverty, family
  Grete Kral把抽屉拉开又推上，铜币在木板上滚了半圈。Grete Moser 5合上本子说，拖欠的人不少，可规矩就是规矩。她走下两级台阶又回头提醒，发工钱那天她会在教堂侧门等着。
  _effects: mood -0.020000000000000004_

- **1926.07** `p9-social-tenement-neighbors.stove-and-line/stove-and-line.move-to-line-end` tags: housing, neighbors, tenement, daily, money, reputation
  Grete Kral把自己泡着的衣服端到绳子最末一段，把靠近炉子的位置让给Grete Moser 5，条件是对方看着火，别让水烧干。Grete Moser 5点头，往炉膛里添了一块煤，说中午以前一定把炉子空出来。两家的盆就挨着放在窗下。
  _effects: mood 0.03_

- **1926.10** `vienna-market-debt.rent-arrears/rent-negotiate-installments` tags: market, debt, money, home, shop
  你没去借钱，直接下楼找房东，说月底前先付两克朗，剩下两克朗分两个星期补齐。房东叼着雪茄，拿铅笔在你的纸条背面写了个日期，说再拖一天就换锁。邻居在楼道口听见了，冲你摇了摇头，但没说什么。
  _effects: cash -2 (按分期付掉的第一笔欠租); flag +rent_installment_plan_

- **1927.01** `r13-civ.public-health-campaign::ctx-vienna-reform-1930::milieu-tenement/posters-pasted` tags: health, public_health, campaign, poster, institution, reform, medical, schooling
  市立太平间的办事员把一叠防疫告示交给Grete Kral，说浆糊要刷匀，别让风揭了角。Grete Kral沿着市场街贴到天黑，手指被纸边割出细口。第二天，告示下面多了一行铅笔字：“水要煮开”。
  _effects: reputation 0.06; flag +pasted_public_health_notices; role; skill; knowledge “the notice was answered with a handwritten instruction to bo”; relation acquaintance with person-materialized-world-vienna-1912-52_

- **1927.02** `p9-gap-adult-unemployed.dock-morning/dock-shared-crates` tags: adulthood, unemployment, casual_labour, poverty, daily, dock
  木箱里装的是钉子，一车推上斜坡时Grete Kral在前头拉，Grete Moser 5在后头推。结账时工头只点了一个名字，Grete Moser 5的嗓门整条巷子都听得见，最后多给了两克朗。
  _effects: cash 2 (争执后补到的搬运工钱)_

- **1927.03** `p9-history-medical-daily.house-call/fetch-doctor-half-fee` tags: health, medical, public_health, family, pharmacy, sanitation, daily
  Grete Kral踩着没到小腿的雪去敲Berta Winter的门，先付一半出诊费一克朗五十赫勒，医生答应天亮前到。回来时鞋里灌满雪水，脚趾冻得发麻，Grete Moser 5的额头已经烫得不敢碰；三克朗的出诊费还差一半，Grete Kral把它记在门框上。
  _effects: cash -1.5 (预付医生一半出诊费); relation acquaintance with person-materialized-world-vienna-1912-62_

- **1927.08** `ad20-loan::ctx-vienna-reform-1930::milieu-tenement/sign-here` tags: loan, debt, credit, everyday, obligation, money, reform, medical
  Grete Moser 5把借据铺在桌上，先让Grete Kral看利息，又让Grete Kral看还款日期。Grete Kral用指头一行行划过去，在最后一行停住：若逾期，担保人承担。Grete Moser 5说只是走个形式；Grete Kral还是把担保人的名字问清楚，才签了字。
  _effects: cash 6 (a loan was signed with a private creditor); state_add ad20-private-bargain state:world-vienna-1912:201; flag +loan_signed; mood 0.010000000000000002; knowledge “借据上写着若逾期，担保人承担。”; flag +private_bargain_active_

- **1928.01** `office16-rival.removal-motion::ctx-vienna-reform-1930::milieu-tenement/motion-fails` tags: office, rivalry, politics, removal, power, intrigue, reform, medical
  会议室里有人念了一份动议，说Grete Kral把预算当成人情。Friedrich Hofer把签名页传了一圈，最后停在自己手里：支持票比反对票少三张。Grete Kral没有发言，只把下一季度的支出表放在桌上，表上每一笔都有收据。
  _effects: reputation 0.039999999999999994; relation rival with person-friedrich-hofer; flag +survived_removal_motion; knowledge “动议只拿到少数支持，三名原本签名的委员在投票前撤回了。”; mood 0.03_

- **1928.01** `state_expire:oj18-odd-apprenticeship` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  Grete Kral的「奇职学徒」到期；相关安排结束。
  _effects: state_remove oj18-odd-apprenticeship state:world-vienna-1912:143; role; flag -odd_job_apprentice_

- **1928.01** `state_tick:ad20-private-bargain/the-favor-ages/called-in` tags: ad20-private-bargain, private, bargain, favor, debt, trust, leverage, exit
  对方在一个不合时宜的时刻提起旧事，语气很客气，意思却不客气。Grete Kral听见自己答应得太快，挂断以后才发现手心有一层薄汗。
  _effects: state_parameter ad20-private-bargain.leverage 45 -> 53; state_parameter ad20-private-bargain.debt 60 -> 64; state_parameter ad20-private-bargain.trust 50 -> 46; mood -0.03_

- **1928.01** `r13-civ.clinic-first-visit::ctx-vienna-reform-1930::milieu-tenement/chronic-cough` tags: health, clinic, queue, diagnosis, institution, reform, medical, schooling
  Grete Kral在诊所走廊的第三张长凳上坐到中午，膝上压着挂号纸和一块湿手帕。Mitzi Berg 3把听诊器贴上来不到半分钟，说是潮气和烟，开了褐色止咳糖浆，又让下周再来。药费从当天的菜钱里扣走，回家时篮子里只剩半棵卷心菜。
  _effects: cash -3 (诊所走廊的第三张长凳); condition; flag +clinic_first_visit; knowledge “the clinic doctor called the cough chronic bronchitis”_

- **1928.04** `r2-leisure.cabaret-raid::ctx-vienna-reform-1930::milieu-tenement/finished-the-song` tags: leisure, cabaret, police, performance, censorship, reform, medical, schooling
  Grete Kral没有停，麦克风里的呼吸声比乐队还响。Friedrich Hofer走到台前，说有人举报这里唱“不该唱的词”。Grete Kral把最后一句唱完，才把麦克风放回架子上。观众先安静，随后有人鼓掌，掌声从后排往前传。小巷电影院在吧台后面把一张歌单塞进冰桶。
  _effects: reputation 0.1; condition; flag +finished_song_during_raid; role; relation rival with person-friedrich-hofer; relation friend with person-materialized-world-vienna-1912-20; knowledge “the police came for the lyrics, not the noise”_

- **1928.07** `vienna-legacy-worklife.hours-ledger/hours-ledger.sign` tags: legacy, work, family, reform, ordinary_life
  老工人凑近看那张表，说这纸比工资袋还薄。Grete Kral把拇指蘸进印泥，按下去时听见工头说了句“下一个”。学徒在旁边数少掉的铜板，数到四十赫勒时不出声了。
  _effects: cash -1 (星期六下午减少的计件工钱（其中1克朗记入债务）); mood 0.05; flag +accepted_hours_reform_

- **1928.08** `p10-crisis-migration.eviction/eviction-shelter-queue` tags: adulthood, crisis, migration, war, police, eviction, refugee, housing
  床架斜靠在垃圾桶上，床垫用绳子捆着，Grete Kral蹲下把散在石板上的勺子一只只捡回布袋。Grete Moser 5的过道只放得下箱子，床架只好留在院里。收容所门口发毯子的人说只剩两张，孩子裹着毯子先睡了。
  _effects: residence; cash -2 (收容所登记与寄存箱子的杂费（其中2克朗记入债务）); mood -0.08_

- **1929.01** `office16-office.lose-the-chair::ctx-vienna-reform-1930::milieu-tenement/kept-the-keys` tags: office, removal, loss, politics, power, transition, reform, medical
  移交清单少了一把储藏室的钥匙。Grete Kral没有提，Friedrich Hofer也没有问；三个月后，清洁工在储藏室发现两箱以Grete Kral名义订阅的行业期刊，收件地址仍是这间办公室。
  _effects: position_end 放映员 @cinema:person-materialized-world-vienna-1912-17-evt:world-vienna-1912:002644; relation acquaintance with person-friedrich-hofer; flag +kept_office_keys; knowledge “储藏室有两箱以我的名义订阅的期刊，收件地址仍是这间办公室。”; mood 0.019999999999999997_

- **1929.01** `state_tick:ad20-private-bargain/the-favor-ages/kept` tags: ad20-private-bargain, private, bargain, favor, debt, trust, leverage, exit
  那笔私下的安排又过了一年。没有人提起，但Grete Kral在街上遇见对方时，两个人都多停了一拍。Grete Kral知道，沉默本身也是利息。
  _effects: state_parameter ad20-private-bargain.trust 46 -> 50; state_parameter ad20-private-bargain.debt 64 -> 62; state_parameter ad20-private-bargain.exit 15 -> 17; mood 0.010000000000000002_

- **1929.07** `p9-social-tenement-neighbors.stairwell-rumor/stairwell-rumor.ask-straight` tags: housing, neighbors, tenement, daily, money, reputation
  Grete Kral在楼梯间拦住Grete Moser 5，问那句话是从哪儿听来的，又趁送活的人上门时当面看清是谁。原来是对面作坊的裁缝来取改好的裤子。Grete Moser 5听完把话咽回去，第二天洗衣房里没人再提。
  _effects: reputation 0.04000000000000001_

- **1929.08** `vienna-social-movement.recruitment/join-and-carry` tags: development, social_movement, organization, politics
  Grete Kral在楼梯下面接到一张折成四折的传单。纸上没有署名，只写着下一次集会的地址。Grete Kral去了，在昏暗的屋里报上姓名，成为普拉特动物园夜班队的一员，并答应负责自己所在街区的联络。
  _effects: organization_membership; role; relation acquaintance with person-materialized-world-vienna-1912-47; relation acquaintance with person-materialized-world-vienna-1912-47_

- **1930.01** `state_tick:ad20-private-bargain/the-favor-ages/called-in` tags: ad20-private-bargain, private, bargain, favor, debt, trust, leverage, exit
  对方在一个不合时宜的时刻提起旧事，语气很客气，意思却不客气。Grete Kral听见自己答应得太快，挂断以后才发现手心有一层薄汗。
  _effects: state_parameter ad20-private-bargain.leverage 53 -> 61; state_parameter ad20-private-bargain.debt 62 -> 66; state_parameter ad20-private-bargain.trust 50 -> 46; mood -0.029999999999999992_

- **1930.02** `vienna-social-movement.aftermath/keep-the-list` tags: development, social_movement, organization, consequence
  Grete Kral把Wiener Psychoanalytische Vereinigung的名单藏进缝纫机抽屉的夹层。名单上有二十几个名字，其中两个已经搬走，一个被工厂开除。Grete Kral没有把最后一行划掉。
  _effects: flag +movement_list_holder; reputation 0.030000000000000027_

- **1931.01** `state_tick:ad20-private-bargain/the-favor-ages/kept` tags: ad20-private-bargain, private, bargain, favor, debt, trust, leverage, exit
  那笔私下的安排又过了一年。没有人提起，但Grete Kral在街上遇见对方时，两个人都多停了一拍。Grete Kral知道，沉默本身也是利息。
  _effects: state_parameter ad20-private-bargain.trust 46 -> 50; state_parameter ad20-private-bargain.debt 66 -> 64; state_parameter ad20-private-bargain.exit 17 -> 19; mood 0.009999999999999995_

- **1931.03** `p9-social-family-conflict-care.cousin-bed/turn-away-with-fare` tags: family, care, siblings, inheritance, housing, money
  Grete Kral直说家里腾不出地方，从抽屉里摸出半克朗车费和一块黑面包，塞给Emil Kral。Emil Kral的藤箱提手已经磨毛，在门槛上磕了一下。Grete Kral关上门，听见脚步声沿楼梯往下，看门人在楼下问了一句，Emil Kral答得含含糊糊；厨房里少了一块面包，也少了一个本该住下的人。
  _effects: cash -0.5 (给表亲车费（其中0.5克朗记入债务）); food; relation kin with person-materialized-world-vienna-1912-16; mood -0.03; relation acquaintance with person-materialized-world-vienna-1912-16_

- **1931.04** `p9-history-medical-daily.clinic-queue/quarrel-with-clerk` tags: health, medical, public_health, family, pharmacy, sanitation, daily
  Grete Kral和门房为号码顺序争起来，被推到街边，帽子滚进水沟。傍晚回来时窗口已经关了，长椅上空空荡荡，只剩一张踩脏的挂号单；Grete Kral在湿冷街头耗了一天，咳嗽更深，诊所门口的人也都记住了这张吵红的脸。
  _effects: mood -0.06; reputation -0.020000000000000018_

- **1931.08** `ad20-train-journey::ctx-vienna-reform-1930::milieu-tenement/the-compartment-sleeps` tags: travel, train, stranger, everyday, public, newcomer, reform, medical
  车厢里暖得发困，Mitzi Lechner把窗户推开一条缝，又把带来的面包掰成两半。Grete Kral接过一半，发现里面夹着一片薄薄的香肠。两个人没有交换姓名，到站时各走各的，Grete Kral却记住了那片香肠的味道。
  _effects: mood 0.020000000000000004; food; flag +quiet_train_

- **1932.01** `state_expire:ad20-private-bargain` tags: ad20-private-bargain, private, bargain, favor, debt, trust, leverage, exit
  Grete Kral的「私下的账」到期；相关安排结束。
  _effects: state_remove ad20-private-bargain state:world-vienna-1912:201; flag -private_bargain_active_

- **1932.04** `vienna-housing-move.sublet-room/sublet-daylight-only` tags: housing, home, rent, family, money
  Grete Kral和Anton Bauer谈妥只出租白天，夜里不留宿，收两克朗。床仍归Grete Kral家，钥匙只在白天给。Anton Bauer说不碍事，他住的工棚不许带人，白天有个落脚的地方就够。Marie Huber听了点头，说这样少些闲话；到了傍晚，Grete Kral把床铺重新收好，屋里照旧几口人。
  _effects: cash 2 (白天出租床位的钱); mood 0.01999999999999999_

- **1932.06** `ad20-job-interview::ctx-vienna-reform-1930::milieu-tenement/hired-on-probation` tags: work, interview, employment, everyday, reputation, obligation, reform, medical
  面试在一间改作办公室的公寓里进行。小巷电影院把三把椅子摆成一排，自己坐中间，让Grete Kral坐最边上。问到第三句，小巷电影院忽然说：“客人若认出你，你先介绍店，还是先介绍自己？”Grete Kral说先介绍店；小巷电影院在纸上画了一个圈，又把它涂成实心。
  _effects: employment 店员 @ cinema:person-materialized-world-vienna-1912-17-evt:world-vienna-1912:002644; skill; flag +hired_on_probation; reputation 0.020000000000000018; mood 0.04000000000000001_

- **1932.12** `ad20-rent-renewal::ctx-vienna-reform-1930::milieu-tenement/sign-the-side-letter` tags: rent, housing, renewal, everyday, obligation, money, reform, medical
  Berta Kral把正式租约放在桌上，又从口袋里摸出一张对折的纸，说这是“补充条款”。Grete Kral看见上面写着若提前搬走，押金不退。Berta Kral说大家都这么签；Grete Kral看了看窗外的院子，还是把名字写在最后一行。
  _effects: state_add ad20-private-bargain state:world-vienna-1912:393; cash -1 (the renewal fee); flag +side_letter_signed; mood -0.01999999999999999; knowledge “补充条款写着提前搬走不退押金。”; flag +private_bargain_active_

- **1933.01** `vienna-family-divorce/partner-moves-to-shared-housing` tags: family, marriage, divorce, housing, lifecycle, separation, household
  Mitzi把一只箱子和工票搬去合租房，带走一半锅碗。Grete Kral留在Leopoldstädter Zinshaus, gemeinsamer Gang，把空出来的床租给一个学徒，用租金补房租；搬家花掉四克朗，Grete Kral在户籍上成了分居的人，夜里听见隔壁床板响，总要愣一下。
  _effects: relation_end partner with person-phase15-Mitzi-world-vienna-1912; household; cash -4 (moving and separate goods); mood -0.06; role_

- **1933.01** `state_tick:ad20-private-bargain/the-favor-ages/exposed` tags: ad20-private-bargain, private, bargain, favor, debt, trust, leverage, exit
  第三个人知道了这件事。不是全部，但足够让Grete Kral在解释时多说了一句，又在下一句里少说了一句。对方听完，只说“原来还有这一层”。
  _effects: state_parameter ad20-private-bargain.leverage 40 -> 52; state_parameter ad20-private-bargain.trust 45 -> 37; state_parameter ad20-private-bargain.exit 25 -> 19; reputation -0.020000000000000018; flag +private_bargain_exposed_

- **1933.01** `p9-social-daily-culture.cafe-newspaper/p9-social-daily-culture.cafe-newspaper.read-all` tags: daily, culture, leisure, cafe, music, walk, task, task:daily
  Grete Kral把木架上的《新自由报》从头版读到讣告栏，中间续了两次水，第三杯 Melange 端上来时奶泡已经塌了，三杯一共六十赫勒。侍者把找零的铜板拍在桌上，没有催的意思；Grete Kral折好报纸夹回木架，记住了议会辩论里的两个名字，出门时雨还没停。
  _effects: cash -0.6 (三杯 Melange 的咖啡钱); mood 0.04999999999999999; skill; relation acquaintance with person-materialized-world-vienna-1912-44_

- **1933.12** `bc18-enemy.accidental-help::ctx-vienna-authoritarian-1934::milieu-tenement/warehouse-sinecure` tags: enemy, mistake, work, reputation, absurd, luck, social, vienna
  Hermann Winter 2把Grete Kral的名字推荐给码头仓库，说那里正缺一个“能扛两百斤的人”。Grete Kral去了才知道，岗位是看管一只装满旧账本的暖房，工钱三克朗，主要工作是别让老鼠咬纸。Hermann Winter 2听说后，在工会门口堵了三天，问这算哪门子惩罚。
  _effects: cash 3 (仓库暖房的看管工钱); role; relation rival with person-materialized-world-vienna-1912-88; flag +enemy_recommended_a_sinecure; mood 0.01999999999999999; relation acquaintance with person-materialized-world-vienna-1912-3_

- **1934.01** `major-family.proposal-refused/proposal-refused.wait-for-the-brother` tags: family, courtship, refusal, major, lifecycle
  Hermann Berg把话说得很慢：母亲还在，弟弟的学徒期还有三年。Grete Kral点头，把准备好的结婚证词折起来放回口袋，那是借教堂的旧纸写的。两人在电车站分开，约好明年复活节再谈。Hermann Berg上车前替母亲拢了拢披肩，没有回头看。
  _effects: relation friend with person-materialized-world-vienna-1912-51; flag +engagement_postponed; cash -1 (tram fare to the meeting（其中1克朗记入债务）)_

- **1934.01** `ml18-charity.neighborhood-clinic::ctx-vienna-authoritarian-1934::milieu-tenement/the-committee-buys-a-wagon` tags: charity, money, clinic, reputation, community, warm, vienna, urban
  捐款交出去三个月，诊所还没有开门，先来了一辆新的弹簧马车和一张桃花心木办公桌。Rosa Huber把账本摊在桌上，说委员会认为“体面的门面”也是诊所的一部分。Mitzi Lechner在门口骂了一句，Grete Kral把账本翻到最后一页，发现自己捐的钱只剩一半。
  _effects: cash -30 (the clinic endowment was spent on furniture and a wagon（其中30克朗记入债务）); state_parameter ml18-sudden-fortune.principal 0 -> 0; reputation -0.04999999999999999; relation rival with person-materialized-world-vienna-1912-35; condition; flag +clinic_funds_misused; knowledge “诊所的捐款先买了一辆弹簧马车和一张桃花心木办公桌。”; mood -0.06; relation acquaintance with person-materialized-world-vienna-1912-35; relation acquaintance with person-materialized-world-vienna-1912-88_

- **1934.01** `state_expire:ad20-private-bargain` tags: ad20-private-bargain, private, bargain, favor, debt, trust, leverage, exit
  Grete Kral的「私下的账」到期；相关安排结束。
  _effects: state_remove ad20-private-bargain state:world-vienna-1912:393; flag -private_bargain_active_

- **1934.01** `vienna-market-debt.pawn-watch/pawn-chain-only` tags: market, debt, money, home, shop
  链子从你指缝里滑下去，落在绒布上几乎没有声音。掌柜说两克朗四十赫勒，你点了点头。出门时你把表掏出来上了几圈弦，它还在走，只是再没法挂在马甲上了。
  _effects: cash 2.4 (典当银表链所得); mood -0.01999999999999999_

- **1934.08** `vienna-legacy-worklife.union-office/union-office.post-ledger` tags: legacy, work, family, reform, ordinary_life
  窗外是维也纳第十五区的一条窄街，卖烤栗子的炉子冒着白烟。Grete Kral贴完纸退后两步看，发现“欠”字被浆糊洇开了一点。老成员没说话，只把眼镜摘下来擦了又擦。
  _effects: reputation 0.04999999999999999; relation acquaintance with person-materialized-world-vienna-1912-3_

- **1934.09** `r2-law.savings-passbook::ctx-vienna-authoritarian-1934::milieu-tenement/smudged-deposit` tags: finance, bank, savings, household, contract, vienna, urban, crisis
  Grete Kral把婚礼剩下的钱存进储蓄银行，Hermann Winter 2在蓝格子里写下数目，墨水洇开一小块。Grete Kral让Hermann Winter 2重写，Hermann Winter 2说存折不能换页，洇开的部分由储户自己负责。Berta Huber 2在门口等，问利息够不够买一只新锅。
  _effects: cash -8 (存折上的蓝格子（其中5.6克朗记入债务）); flag +deposited_wedding_savings; relation acquaintance with person-materialized-world-vienna-1912-88; knowledge “the savings bank will not replace a smudged passbook page”_

- **1934.12** `vienna-social-movement.aftermath/keep-the-list` tags: development, social_movement, organization, consequence
  Grete Kral把普拉特动物园夜班队的名单藏进缝纫机抽屉的夹层。名单上有二十几个名字，其中两个已经搬走，一个被工厂开除。Grete Kral没有把最后一行划掉。
  _effects: reputation 0.030000000000000027_

- **1935.01** `r13-civ.join-charity::ctx-vienna-authoritarian-1934::milieu-tenement/donated-first` tags: social, charity, membership, poverty, respectability, vienna, urban, crisis
  Josefine Hofer说可以先不交会费，但要先跟着去一趟贫民巷。Grete Kral提着一篮旧衣服走了一下午，回来时在登记簿上签了名。Josefine Hofer把一枚铜制小徽章别在Grete Kral的衣领上。
  _effects: cash -3 (慈善会登记簿上的空行); reputation 0.04999999999999999; flag +joined_charity_after_donation; role_

- **1935.02** `r1-fam.gossip-campaign::ctx-vienna-authoritarian-1934::milieu-tenement/gossip.counter` tags: social, gossip, reputation, market, rumour, vienna, urban, crisis
  Grete Kral没有追查，只在礼拜天把婆婆请到市场，当着Berta Kral的面买了一块银器。婆婆耳背，说话很大声，说这是儿媳妇今年买的第三块。Berta Kral的脸红了一阵；第二天，市场上换了一个新话题。
  _effects: cash -6 (市场上的第二张嘴（其中6克朗记入债务）); reputation 0.08000000000000002; flag +bought_silver_in_public_to_end_rumour; role_

- **1935.04** `absurd15-stage.cast-the-king::ctx-vienna-authoritarian-1934::milieu-tenement/cast-as-king` tags: performance, theatre, power, irony, work, pretend, vienna, urban
  Alois Weiss把一顶掉漆的铅皮王冠扣在Grete Kral头上，说不用演得像国王，只要像一个人突然被允许坐下。首演那天，Grete Kral在台上忘了两句台词，观众却以为那是停顿。
  _effects: state_add stage-sovereign state:world-vienna-1912:529; cash 2 (首演酬劳); role; reputation 0.02999999999999997; relation acquaintance with person-materialized-world-vienna-1912-49; flag +stage_sovereign; reputation 0.03999999999999998_

- **1935.06** `hs18-queue.figure::ctx-vienna-authoritarian-1934::milieu-tenement/sell-the-sighting` tags: historical_figure, queue, recognition, bread, witness, history, vienna, urban
  Grete Kral没有排队，转身去找街角的记者。Luise Hofer在后面喊“别堵路”，Grete Kral已经钻进电话亭。第二天，小报角落里登了一句话：某人在面包队里看见了那张脸。Grete Kral拿到几张钞票，也记住了记者没有问消息是真是假。
  _effects: cash 2 (sold the sighting to a newspaper); state_add hs18-street-witness state:world-vienna-1912:528; relation acquaintance with person-karl-kraus; reputation -0.020000000000000018; flag +sold_historical_sighting; relation acquaintance with person-materialized-world-vienna-1912-34_

- **1935.08** `r1-hc.cholera-cordon::ctx-vienna-authoritarian-1934::milieu-tenement::cholera-war-troop-train/cholera-war-cordon-tight` tags: health, epidemic, cholera, quarantine, neighbor, vienna, urban, crisis
  防疫队把整条巷子围了，门口架起木板，只留一个递东西的窗口。Grete Kral隔着窗口接过一包石灰，Berta Moser 2在隔壁窗口问，什么时候能出去；没有人回答，木板后面只有靴子走动的声音。
  _effects: cash -6 (院子门口的石灰线（其中2克朗记入债务）); condition; flag +military_cholera_cordon; role; relation acquaintance with person-materialized-world-vienna-1912-44; knowledge “the epidemic squad answers no questions through the board”_

- **1936.01** `state_tick:hs18-street-witness/memory-drift/holds` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Grete Kral又把那天的顺序在脑子里走了一遍：先是门响，再是靴子，最后才是那声喊。细节还在，只是每讲一次，旁边就多出一点别人替你补上的颜色。
  _effects: state_parameter hs18-street-witness.certainty 65 -> 67_

- **1936.01** `state_tick:stage-sovereign/performance-run/held-the-crowd` tags: stage-sovereign, performance, theatre, pretend, status, irony, power, no-real-authority
  又一年在舞台上扮演君主。Grete Kral学会了在说错台词时停顿，让观众以为那是表演；散场后，有人在门口等着看Grete Kral卸妆，想确认王冠下面是不是一张普通的脸。
  _effects: state_parameter stage-sovereign.publicBelief 20 -> 28; state_parameter stage-sovereign.performances 0 -> 10; mood 0.03_

- **1936.01** `r13-edu.correspondence-course::ctx-vienna-authoritarian-1934::milieu-tenement/cannot-read-lessons` tags: education, correspondence, adult_education, literacy, mail, vienna, urban, crisis
  Grete Kral读到第三课就跟不上，题目里的“比例”和“折旧”都认不全。Grete Kral把讲义压在箱底，直到邮差来问续费，才发现已经欠了三期。钱退不回来，Grete Kral把没拆的信封当柴烧了。第二年，Grete Kral在厂里听人念夜校的招生简章，才知道那门课还在办。
  _effects: cash -3 (邮包里的第七课); mood -0.07000000000000003; relation acquaintance with person-materialized-world-vienna-1912-73_

- **1936.01** `vienna-housing-move.flat-viewing/flat-viewing-too-damp` tags: housing, home, rent, family, money
  Grete Kral在单间里站了一刻钟，脚底发潮，墙纸底下透出一股霉味。看门人说刷一层石灰就好，Katharina Winter却在门口轻轻咳了一声，提醒这背面没有阳光。Grete Kral把定金收回口袋，谢过看门人，宁可多付三克朗，也不愿把湿气带进夜里。
  _effects: mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-11; flag +still_looking_for_room; relation acquaintance with person-materialized-world-vienna-1912-11_

- **1936.02** `vienna-women-housework.coal-stove/coal-stove.cold-day` tags: gender, housework, home, labour, family
  孩子放学回来搓着手说冷，Grete Kral把仅有的半捧煤末压进炉底，火苗细得像灯芯。她没接Alois Berg递来的煤块，只说等明天煤店开门。屋里哈气成雾，晚饭的土豆是凉的。
  _effects: mood -0.03999999999999998; relation acquaintance with person-materialized-world-vienna-1912-47_

- **1936.09** `p9-social-tenement-neighbors.flour-loan/flour-loan.half-bag-with-note` tags: housing, neighbors, tenement, daily, money, reputation
  Grete Kral只舀出半袋，说自家也不宽裕，要Josef把上次的煤钱一并记在纸上。Josef接过纸片，当着面把日期和数目重写一遍，两人各留一半。面粉少了，账却清楚了，Grete Kral把纸片夹进账簿样的旧本子。
  _effects: relation acquaintance with person-phase15-Josef-world-vienna-1912_

- **1936.12** `p21-mistaken-identity::ctx-vienna-authoritarian-1934::milieu-tenement/a-cell-for-someone-else` tags: mistaken_identity, police, identity, arrest, public, secret, absurd, high_drama
  Gustav Berg没有再看照片，只让Grete Kral把口袋里的东西全放在桌上。银怀表、一张电车票和半包烟；表盖打开时，里面那张小照片上的人不是Grete Kral。Katharina Winter在门外想说什么，被另一个警察挡住了。拘留室的门关上时，Grete Kral才发现自己一直攥着那张电车票。
  _effects: state_add detained state:world-vienna-1912:571; state_add p21-scandal-web state:world-vienna-1912:572; reputation -0.030000000000000027; flag +jailed_under_wrong_name; knowledge “表盖里的小照片上的人不是当事人，拘留室的门关上时，当事人还攥着电车票。”; mood -0.06; unemployment (detained); flag +detained; flag +scandal_web_active_

- **1937.01** `state_tick:hs18-street-witness/memory-drift/blurs` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Grete Kral忽然想不起那个人先迈的是左脚还是右脚。邻居说自己记得清清楚楚，还补了一个细节；Grete Kral听着，竟分不清那是自己看见的，还是后来听来的。
  _effects: state_parameter hs18-street-witness.certainty 67 -> 59; mood -0.020000000000000018_

- **1937.01** `state_expire:stage-sovereign` tags: stage-sovereign, performance, theatre, pretend, status, irony, power, no-real-authority
  Grete Kral的「舞台上的君主」到期；相关安排结束。
  _effects: state_remove stage-sovereign state:world-vienna-1912:529; flag -stage_sovereign_

- **1937.01** `state_tick:p21-scandal-web/the-web-tightens/a-strand-snaps` tags: p21-scandal-web, scandal_web, scandal, secret, blackmail, network, leverage, danger
  一个证人搬走了，带走了他那一份记忆。Grete Kral在旧地址门口站了半个下午，回来时发现信箱里多了一张没有署名的明信片，上面只写着“我还记得”。
  _effects: state_parameter p21-scandal-web.exposure 55 -> 63; state_parameter p21-scandal-web.leverage 40 -> 34; state_parameter p21-scandal-web.danger 50 -> 55; reputation -0.020000000000000018; flag +scandal_witness_left_

- **1937.01** `r13-civ.recover-at-home::ctx-vienna-authoritarian-1934::milieu-tenement/kin-nursed` tags: health, recovery, care, household, food, vienna, urban, crisis
  Berta Huber 2把粥熬得很稀，一勺一勺吹凉，托着Grete Kral的后颈喂下去。窗帘拉开半尺，太阳从床脚移到墙上，Grete Kral第一次觉得退烧后的骨头是轻的。Berta Huber 2把药钱记在日历背面，说下个月少买两次肉。
  _effects: cash -2 (退烧后的第一碗粥); food; health 0.08 (退烧后的第一碗粥); flag +recovered_with_kin_care_

- **1937.07** `p22-mistaken-inheritance::ctx-vienna-authoritarian-1934::milieu-tenement/the-estate-comes-with-a-family` tags: mistaken_inheritance, funeral, corpse, identity, dark, reversal, debt, family
  陌生人的家属找上门，说既然Grete Kral拿了遗产，就该替死者还债。Gustav Winter把借据摊在桌上，Rosa Huber说法律上确实如此；Grete Kral搬进那间公寓，却发现每个房间都住着原来的债主。窗户朝北，冬天没有太阳，房租却一分不少。把借据一张张摊开，发现每张都写着同一个地址。
  _effects: state_add debt-bondage state:world-vienna-1912:616; cash -4 (the dead man debts and the move（其中4克朗记入债务）); relation acquaintance with person:evt:world-vienna-1912:000432:child; flag +estate_came_with_family; mood -0.03999999999999998_

- **1938.01** `ml18-tax.audit-of-the-windfall::ctx-vienna-authoritarian-1934::milieu-tenement/the-inspector-was-an-old-friend` tags: tax, legal, money, windfall, bureaucracy, comic, vienna, urban
  Marie Huber进门后没有先翻账本，而是问Grete Kral是不是在战前服过役。两个人对上了部队编号，Marie Huber把帽子放在桌上，说利息可以按小额储蓄申报，罚款就免了。Gustav Kral 2松了一口气，手里的计算尺却还停在半空，像是不知道该不该落下去。
  _effects: cash -2 (the reduced tax assessment（其中2克朗记入债务）); state_parameter ml18-sudden-fortune.principal 15 -> 13; relation friend with person-marie-huber; flag +tax_audit_friendly; mood 0.030000000000000027_

- **1938.01** `state_tick:hs18-street-witness/memory-drift/holds` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Grete Kral又把那天的顺序在脑子里走了一遍：先是门响，再是靴子，最后才是那声喊。细节还在，只是每讲一次，旁边就多出一点别人替你补上的颜色。
  _effects: state_parameter hs18-street-witness.certainty 59 -> 61_

- **1938.01** `state_expire:detained` tags: detained, legal, prison, detention, absence, state, state_tick, state:detained
  Grete Kral的「被拘留」到期；相关安排结束。
  _effects: state_remove detained state:world-vienna-1912:571; flag -detained; flag +released_from_detention_

- **1938.01** `state_tick:p21-scandal-web/the-web-tightens/a-strand-snaps` tags: p21-scandal-web, scandal_web, scandal, secret, blackmail, network, leverage, danger
  一个证人搬走了，带走了他那一份记忆。Grete Kral在旧地址门口站了半个下午，回来时发现信箱里多了一张没有署名的明信片，上面只写着“我还记得”。
  _effects: state_parameter p21-scandal-web.exposure 63 -> 71; state_parameter p21-scandal-web.leverage 34 -> 28; state_parameter p21-scandal-web.danger 55 -> 60; reputation -0.020000000000000018_

- **1938.01** `state_tick:debt-bondage/interest/pay-interest` tags: debt-bondage, debt, work, poverty, legal, state, state_tick
  Grete Kral又付了一年的利息。本金几乎没动，债主的账本却翻到了新一页。
  _effects: cash -3 (debt interest（其中1克朗记入债务）); state_parameter debt-bondage.debt 24 -> 26_

- **1938.01** `p10-family-tasks.arrange-childcare/arrange-childcare.quit-job` tags: adulthood, family, social, marriage, care, inheritance, task, childcare
  厂里说半天工没了就没了，Grete Kral没再争。厨房里少了一只面包，晚饭只有一锅糊糊。伴侣把勺子放下，说来年春天再说。夜里Grete Kral替邻居补袜子，三个赫勒一双，缝到灯芯烧短。
  _effects: cash -4 (辞掉半天工少了一份收入（其中4克朗记入债务）); food_

- **1938.03** `pl19-bridge.public-rumor::ctx-vienna-authoritarian-1934::milieu-tenement/the-back-room-opens` tags: scandal, protection, network, press, media, rumor, bridge, vienna
  报纸卖完的第二天，Alois Berg把Grete Kral领进洗衣房后面的小间。桌上已经坐着门房、一位排字工和两个不肯说名字的人；他们没有问绯闻是真是假，只问Grete Kral以后还打不打算出门。Grete Kral说打算，Alois Berg就把一盏灯往桌中间推了推。
  _effects: state_add pl19-protected-scandal state:world-vienna-1912:652; reputation -0.020000000000000018; flag +rumor_network; knowledge “洗衣房后间的人没有问绯闻真假，只问当事人还出不出门。”; relation acquaintance with person-materialized-world-vienna-1912-104; flag +protected_scandal_active_

- **1938.03** `state_reaction:pl19-protected-scandal/a-public-question` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  有人在一场公开活动里问起Grete Kral的“私人安排”，语气客气，问题却像一根针。Grete Kral笑着答了别的事，回家后才发现手心全是汗。
  _effects: state_parameter pl19-protected-scandal.publicHeat 45 -> 57; state_parameter pl19-protected-scandal.protection 55 -> 49; reputation -0.02999999999999997_
  _causes: evt:world-vienna-1912:008070_

- **1938.08** `vienna-adult-social.sunday-table/sunday-table.repair` tags: adulthood, social, work, family
  Berta Huber 2从柜子里拿出攒了三个月的零钱袋，倒在桌上，说先给Grete Kral买双能进厂的结实靴子。Grete Kral数出鞋匠要的数目，把剩下的又推回袋子中央。
  _effects: cash -3 (凑钱买了一双结实的工靴（其中3克朗记入债务）); health 0.019999999999999997 (脚上有了不漏水的靴子)_

- **1938.10** `oj18-zoo.night::ctx-vienna-authoritarian-1934::milieu-tenement/meat-ledger` tags: zoo, animals, night, keeper, work, odd_job, suspense, vienna
  肉商的账本上少了二十公斤马肉，Gustav Berg要Grete Kral签字认账。Grete Kral知道是夜班门房把肉转卖给了普拉特的香肠摊，但门房是Gustav Berg的小舅子。Grete Kral不签，第二天被调去扫兽栏；臭味洗了三遍还在指甲缝里。
  _effects: reputation -0.030000000000000027; cash -1 (lost the night-shift supplement（其中1克朗记入债务）); mood -0.040000000000000036; state_add oj18-odd-apprenticeship state:world-vienna-1912:653; flag +zoo_night_shift; flag +refused_meat_ledger; knowledge “少掉的二十公斤马肉被夜班门房卖给了香肠摊，门房是园长的亲戚。”; role; flag +odd_job_apprentice_

- **1939.01** `p21-staged-death::ctx-vienna-authoritarian-1934::milieu-tenement/the-coffin-is-too-light` tags: staged_death, debt, fraud, funeral, escape, betrayal, secret, high_drama
  抬棺的人在第一级台阶上停了一下，说这棺材轻得不对。Hermann Weiss伸手敲了敲木板，里面传出的不是沉闷的回声；Rosa Lechner 2把登记簿合上，Berta Huber 2的黑纱滑到肩膀上。当天下午，警察在火车站候车室里找到了Grete Kral，手里还攥着一张去林茨的车票。
  _effects: state_add public-scandal state:world-vienna-1912:649; state_add p21-scandal-web state:world-vienna-1912:650; state_add under-investigation state:world-vienna-1912:651; reputation -0.06; cash -3 (funeral costs and a police fine（其中3克朗记入债务）); flag +staged_death_exposed; knowledge “抬棺的人在第一级台阶上停了一下，说这棺材轻得不对。”; mood -0.06; relation acquaintance with person-materialized-world-vienna-1912-96; relation acquaintance with person-materialized-world-vienna-1912-74; flag -scandal_web_active; flag +scandal_web_active_

- **1939.01** `state_tick:hs18-street-witness/memory-drift/holds` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Grete Kral又把那天的顺序在脑子里走了一遍：先是门响，再是靴子，最后才是那声喊。细节还在，只是每讲一次，旁边就多出一点别人替你补上的颜色。
  _effects: state_parameter hs18-street-witness.certainty 61 -> 63_

- **1939.01** `state_tick:debt-bondage/interest/pay-interest` tags: debt-bondage, debt, work, poverty, legal, state, state_tick
  Grete Kral又付了一年的利息。本金几乎没动，债主的账本却翻到了新一页。
  _effects: cash -3 (debt interest); state_parameter debt-bondage.debt 26 -> 28_

- **1939.01** `state_tick:pl19-protected-scandal/the-network-meets/network-holds` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  Grete Kral又在后间见了那几个人。谁也没有提名字，只把下个月的班次、钥匙和该打的电话分了一遍；出门时，Grete Kral发现自己的围巾被人重新叠过，像一件被妥善保管的证物。
  _effects: state_parameter pl19-protected-scandal.exposure 55 -> 50; state_parameter pl19-protected-scandal.protection 49 -> 53; state_parameter pl19-protected-scandal.publicHeat 57 -> 55; mood 0.010000000000000009_

- **1939.01** `state_tick:oj18-odd-apprenticeship/strange-year/blamed-for-the-noise` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  楼上住户投诉夜里有人拖椅子，管事的把巡查簿翻到Grete Kral的那一页，说签字太潦草，看不出巡过几趟。Grete Kral想辩解，却想起那晚确实在楼梯间多站了一刻钟；扣掉的工钱刚好够买一双不漏水的鞋。
  _effects: state_parameter oj18-odd-apprenticeship.trust 18 -> 2; state_parameter oj18-odd-apprenticeship.reliability 55 -> 45; mood -0.050000000000000044; flag +odd_job_scare_

- **1939.01** `bc18-ghost.death-certificate::ctx-vienna-authoritarian-1934::milieu-tenement/correct-it-twice` tags: bureaucracy, legal, death, identity, mistake, paperwork, absurd, vienna
  Grete Kral在窗口要求更正，Rosa Huber把表格翻了三遍，最后开出一张新的出生证明，名字却少了一个字母。于是城里同时住着一个死人、一个活人，和一个只在档案里出生的陌生人。Grete Kral拿着两张纸站在区公所门口，忽然不知道该用哪一张去领下个月的煤票。
  _effects: cash -1 (更正材料的手续费和车钱); state_add bc18-bureaucratic-ghost state:world-vienna-1912:694; relation rival with person-materialized-world-vienna-1912-35; condition; flag +two_living_files_one_death; mood -0.030000000000000027; flag +bureaucratic_ghost; mood -0.010000000000000009_

- **1939.04** `p9-social-family-conflict-care.cousin-bed/give-camp-bed-and-board` tags: family, care, siblings, inheritance, housing, money
  Grete Kral让Hermann Lechner睡厨房的行军床，讲好每月三克朗饭钱，煤钱另算。白天把铺盖卷起来靠在碗柜边，晚上再铺开；厨房多一个人，面包和煤都下去得快，伙食上短了两克朗。看门人再来问时，Grete Kral把藤箱指过去，说人住下了，灯油钱也记在账上。
  _effects: cash 3 (表亲交来的饭钱); relation kin with person-materialized-world-vienna-1912-54; flag +kin_staying_over; relation acquaintance with person-materialized-world-vienna-1912-54_

- **1939.06** `vienna-housing-move.rent-notice/rent-notice-pay` tags: housing, home, rent, family, money
  Grete Kral把通知念给Marie Huber听，Marie Huber摇头说是楼梯间那几块新玻璃的账。Grete Kral去楼下杂货铺换开一张五克朗的纸币，回屋一枚一枚摆开数，煤箱底多留了二十赫勒。
  _effects: cash -2 (按月多付两克朗房租); mood -0.030000000000000027_

- **1940.01** `hs18-occupation.lineup::ctx-vienna-authoritarian-1934::milieu-tenement/name-someone-else` tags: occupation, lineup, witness, denunciation, police, history, vienna, urban
  Grete Kral指向中间那个很少出门的会计，说他那晚从墙边走过。Gustav Berg没有核实，只让人把会计带走。Berta Kral低下头，肩膀松了一点；Grete Kral回家后才发现，自己的手一直在抖。
  _effects: state_parameter hs18-street-witness.danger 55 -> 80; state_parameter hs18-street-witness.certainty 63 -> 53; reputation -0.03; flag +falsely_identified_man; mood -0.06000000000000005_

- **1940.01** `state_transition:hs18-street-witness/too-dangerous` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Grete Kral从「街面上的目击者」转入另一段处境：the witness became more dangerous than the crime
  _effects: state_transition hs18-street-witness -> political-suspect; flag +witness_became_political_suspect_

- **1940.01** `state_expire:debt-bondage` tags: debt-bondage, debt, work, poverty, legal, state, state_tick, state:debt-bondage
  Grete Kral的「债务束缚」到期；相关安排结束。
  _effects: state_remove debt-bondage state:world-vienna-1912:616_

- **1940.01** `state_tick:p21-scandal-web/the-web-tightens/a-strand-snaps` tags: p21-scandal-web, scandal_web, scandal, secret, blackmail, network, leverage, danger
  一个证人搬走了，带走了他那一份记忆。Grete Kral在旧地址门口站了半个下午，回来时发现信箱里多了一张没有署名的明信片，上面只写着“我还记得”。
  _effects: state_parameter p21-scandal-web.exposure 80 -> 88; state_parameter p21-scandal-web.leverage 50 -> 44; state_parameter p21-scandal-web.danger 60 -> 65; reputation -0.01999999999999999_

- **1940.01** `state_expire:under-investigation` tags: under-investigation, legal, police, investigation, risk, state, state_tick, state:under-investigation
  Grete Kral的「被调查」到期；相关安排结束。
  _effects: state_remove under-investigation state:world-vienna-1912:651_

- **1940.01** `state_tick:pl19-protected-scandal/the-network-meets/network-holds` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  Grete Kral又在后间见了那几个人。谁也没有提名字，只把下个月的班次、钥匙和该打的电话分了一遍；出门时，Grete Kral发现自己的围巾被人重新叠过，像一件被妥善保管的证物。
  _effects: state_parameter pl19-protected-scandal.exposure 50 -> 45; state_parameter pl19-protected-scandal.protection 53 -> 57; state_parameter pl19-protected-scandal.publicHeat 55 -> 53; mood 0.010000000000000009_

- **1940.01** `state_tick:bc18-bureaucratic-ghost/paper-trail-year/another-window-opens` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  一个税务员把Grete Kral的死亡记录和一张新房租收据订在一起，寄到了另一个区。三个星期后，Grete Kral收到一封要求“已故纳税人”补缴暖气税的信；去问时，窗口说档案正在路上，让Grete Kral先等通知。通知没有来，房租却涨了。
  _effects: state_parameter bc18-bureaucratic-ghost.fileDepth 40 -> 47; state_parameter bc18-bureaucratic-ghost.risk 15 -> 25; cash -1 (跑窗口的车钱); flag +heating_tax_for_the_dead; mood -0.030000000000000027_

- **1940.02** `vienna-historical-social-movement.public-meeting/back-immediate-action` tags: history, historical_process, social_movement, organization, politics
  Grete Kral把帽子捏在手里上台，说救济表格要填三张、盖章两处，煤却今晚就见底。年轻人拍椅子背，Alois Winter在门口皱着眉。主持人记下赞成与反对的人数，纸板上的字越写越小。
  _effects: reputation 0.05000000000000002; relation acquaintance with person-materialized-world-vienna-1912-48; mood 0.030000000000000027_

- **1940.03** `bc18-ghost.pension-window::ctx-vienna-authoritarian-1934::milieu-tenement/posthumous-medal` tags: bureaucracy, pension, identity, legal, paperwork, absurd, poverty, vienna
  养老金办公室寄来一枚“忠诚遗属”铜章和三克朗，说这是对死者家属的最后抚恤。Grete Kral不能亲自去领，只好让Maria Huber代收；邻居把铜章别在自家外套上，回来时只字不提三克朗。Grete Kral没有追问，因为那枚铜章若挂在自己胸前，实在不知道该怎么解释。
  _effects: cash -1 (代领材料的车钱); state_parameter bc18-bureaucratic-ghost.risk 37 -> 45; state_parameter bc18-bureaucratic-ghost.duplicates 3 -> 4; reputation 0.010000000000000009; relation acquaintance with person-materialized-world-vienna-1912-100; condition; flag +neighbor_kept_the_medal; mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-98; relation acquaintance with person-materialized-world-vienna-1912-100_

- **1940.12** `df18-dream.water-in-the-cellar::ctx-vienna-authoritarian-1934::milieu-tenement/tell-the-landlord` tags: dream, omen, home, water, coincidence, eerie, everyday, vienna
  Grete Kral把梦告诉房东。房东笑了一声，说老房子下水慢，做梦都带水汽。第二天，房东带人来查，真在墙里找到一条裂缝，顺手把地窖的租金减了一克朗。Grete Kral把省下的钱买了一盏新灯，放在楼梯口。
  _effects: cash 1 (房东减掉的一克朗地窖租金); reputation 0.01999999999999999; knowledge “房东因为我的梦查了墙，减了地窖租金。”; flag +df18_landlord_fixed_crack; mood 0.020000000000000018_

- **1941.01** `p21-scandal-auction::ctx-vienna-authoritarian-1934::milieu-tenement/the-letters-are-read-aloud` tags: blackmail, auction, scandal, letters, public, secret, humiliation, high_drama
  Rosa Lechner 2没有等到最后一轮竞价。他说“委托人希望公开”，把第七号信封拆开，念了第一页；Berta Huber 2在第二排站起来，椅子腿在木地板上刮出一声长响。Anton Bauer没有笑，只把拍卖目录合上；Grete Kral听见自己的名字被念了两次，第二次比第一次轻。
  _effects: state_transition p21-scandal-web -> public-scandal; reputation -0.08000000000000002; flag +letters_read_at_auction; knowledge “第一页念完时，伴侣在第二排站起来，椅子腿刮出一声长响。”; cash -1 (the auction admission and a cab home); mood -0.07000000000000006; flag -scandal_web_active_

- **1941.01** `state_reaction:bc18-bureaucratic-ghost/another-file-opened` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  Grete Kral刚在一个窗口证明自己活着，另一个窗口又从抽屉里抽出一张死亡通知。两个办事员隔着走廊互相看了一眼，谁也没有先开口；Grete Kral站在中间，忽然明白自己不是一个人，而是一份正在被转抄的卷宗。
  _effects: state_parameter bc18-bureaucratic-ghost.risk 25 -> 37; state_parameter bc18-bureaucratic-ghost.duplicates 2 -> 3; state_parameter bc18-bureaucratic-ghost.sightings 2 -> 3; flag +another_file_opened; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:009071_

- **1941.01** `state_expire:public-scandal` tags: public-scandal, scandal, reputation, social, state, state_tick, state:public-scandal
  Grete Kral的「公开丑闻」到期；相关安排结束。
  _effects: state_remove public-scandal state:world-vienna-1912:649_

- **1941.01** `state_tick:pl19-protected-scandal/the-network-meets/network-holds` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  Grete Kral又在后间见了那几个人。谁也没有提名字，只把下个月的班次、钥匙和该打的电话分了一遍；出门时，Grete Kral发现自己的围巾被人重新叠过，像一件被妥善保管的证物。
  _effects: state_parameter pl19-protected-scandal.exposure 45 -> 40; state_parameter pl19-protected-scandal.protection 57 -> 61; state_parameter pl19-protected-scandal.publicHeat 53 -> 51; mood 0.010000000000000009_

- **1941.01** `state_expire:oj18-odd-apprenticeship` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  Grete Kral的「奇职学徒」到期；相关安排结束。
  _effects: state_remove oj18-odd-apprenticeship state:world-vienna-1912:653; role; flag -odd_job_apprentice_

- **1941.01** `state_tick:bc18-bureaucratic-ghost/paper-trail-year/kept-the-files-apart` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  这一年，Grete Kral学会了同时带三张纸出门：一张证明活着，一张证明死了，一张证明自己从没搬过家。窗口后面的人各自只看自己那一张，偶尔还会夸Grete Kral的材料齐全。年底，Grete Kral从补发的配给里省下一小袋面粉，觉得自己像个熟练的走私犯。
  _effects: state_parameter bc18-bureaucratic-ghost.fileDepth 47 -> 51; state_parameter bc18-bureaucratic-ghost.risk 45 -> 40; cash 1 (省下的配给和车钱); mood 0.010000000000000009_

- **1941.01** `state_tick:political-suspect/police-interest/detained` tags: political-suspect, politics, repression, legal, surveillance, state, state_tick
  Grete Kral在回家路上被拦住，问话从晚上八点持续到凌晨。没有正式指控，但名字被写进了另一本册子。
  _effects: state_parameter political-suspect.heat 0.4 -> 0.55; mood -0.07999999999999996_

- **1941.06** `p9-social-tenement-neighbors.stairwell-rumor/stairwell-rumor.warn-the-latch` tags: housing, neighbors, tenement, daily, money, reputation
  Grete Kral没传话，只在二楼门口站了一会儿，提醒Otto Bauer夜里把门闩好，说楼梯间有人爱嚼舌头。Otto Bauer点点头，把门闩推过去，发出很轻的一声。此后送活的人还是照来，闲话却渐渐没人接。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-104; mood 0.030000000000000027_

- **1941.06** `ml18-inheritance.uncles-press::ctx-vienna-authoritarian-1934::milieu-tenement/sell-the-subscription-list` tags: inheritance, family, business, debt, legal, money, vienna, urban
  公证人把一封厚信推到桌子中央：Grete Kral的叔父在第二区留下一间小印刷所、一台坏掉的压机和十四克朗的欠账。Berta Bauer说那台压机早该当废铁，但订阅名单上还有三百个名字。Grete Kral把名单卖给对街的印厂，替叔父还了债，剩下的钱刚好够换一套冬衣。
  _effects: cash 12 (sale of the print shop subscription list); state_add ml18-sudden-fortune state:world-vienna-1912:781; relation acquaintance with person-materialized-world-vienna-1912-52; skill; flag +inherited_print_shop; mood 0.040000000000000036; flag +sudden_fortune; reputation 0.01999999999999999; mood 0.030000000000000027_

- **1941.12** `r3-mig.deportation-appeal::ctx-vienna-authoritarian-1934::milieu-tenement/appeal-filed-on-last-day` tags: migration, deportation, law, appeal, papers, vienna, urban, crisis
  上诉期的最后一天，Grete Kral把申诉书交到区公所。Ferdinand Kraus看了一眼钟，说邮戳是昨天的，算数。驱逐令暂缓，等上面复核。Elisabeth Berg在门口等着，听见“暂缓”两个字，把已经掏出来的手铐又放回口袋。
  _effects: mood 0.040000000000000036; condition; flag +appeal_filed_on_last_day; relation rival with person-materialized-world-vienna-1912-109; knowledge “a postmark from the day before keeps the appeal alive”; relation acquaintance with person-materialized-world-vienna-1912-109_

- **1941.12** `state_reaction:public-scandal/gossip` tags: public-scandal, scandal, reputation, social, state, state_reaction, elderhood, health
  Grete Kral走进咖啡馆时，邻桌的声音低了一拍。没有人当面说什么，但每个人都知道该说什么。
  _effects: mood -0.030000000000000027; reputation -0.03_
  _causes: evt:world-vienna-1912:009737_

- **1942.01** `pc20-investigation.exoneration::ctx-vienna-authoritarian-1934::milieu-tenement/cleared` tags: politics, investigation, exoneration, public_reversal, police, reputation, patronage, vienna
  Otto Bauer把没有起诉的通知放在桌上，说案子到此为止。Grete Kral没有问为什么，只把通知折好；Alois Weiss在走廊里等着，看见Grete Kral出来，先看脸，再看手，最后让开了半步。
  _effects: state_add pc20-public-reversal state:world-vienna-1912:780; state_parameter political-suspect.heat 0.55 -> 0.35000000000000003; relation acquaintance with person-materialized-world-vienna-1912-104; flag +cleared_without_trial; knowledge “没有起诉的通知只有一页，案子到此为止。”; flag +public_reversal_active_

- **1942.01** `state_tick:pl19-protected-scandal/the-network-meets/someone-wants-a-favor` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  有人替Grete Kral挡了一次采访，随后在走廊里提起自己儿子的学徒期满。Grete Kral知道这不是闲聊；当天晚上，那张写着名字的纸条被压在糖罐下面，像一枚没有付清的硬币。
  _effects: state_parameter pl19-protected-scandal.leverage 15 -> 27; state_parameter pl19-protected-scandal.protection 61 -> 57; state_parameter pl19-protected-scandal.exposure 40 -> 45; mood -0.020000000000000018_

- **1942.01** `state_expire:bc18-bureaucratic-ghost` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  Grete Kral的「档案里的活鬼」到期；相关安排结束。
  _effects: state_remove bc18-bureaucratic-ghost state:world-vienna-1912:694; flag -bureaucratic_ghost_

- **1942.01** `state_tick:political-suspect/police-interest/avoided` tags: political-suspect, politics, repression, legal, surveillance, state, state_tick
  Grete Kral换了路线，避开那家咖啡馆和门口的两个便衣。档案里又添了一页，但今年没有传唤。
  _effects: state_parameter political-suspect.heat 0.35000000000000003 -> 0.30000000000000004_

- **1942.01** `state_expire:public-scandal` tags: public-scandal, scandal, reputation, social, state, state_tick, state:public-scandal
  Grete Kral的「公开丑闻」到期；相关安排结束。
  _effects: state_remove public-scandal state:world-vienna-1912:734_

- **1942.02** `office16-corruption.inspection::ctx-vienna-authoritarian-1934::milieu-tenement/clean-audit` tags: office, corruption, audit, legal, power, dark, vienna, urban
  Helene Hofer带了两只空箱子来，走的时候还是空的。Grete Kral把三年的合同、收据和会议记录按月份排在地上，Helene Hofer抽查了十二份，每一份都能对上签字人；最后一句是“下次可以少准备一点”。
  _effects: reputation 0.04999999999999999; organization_funds; skill; mood 0.030000000000000027; flag +passed_audit; knowledge “审计抽查了十二份合同，每一份都能对上签字人。”_

- **1942.09** `pc20-public.monument::ctx-vienna-authoritarian-1934::milieu-tenement/counter-monument` tags: monument, public_reversal, memory, politics, reputation, committee, counter_memory, vienna
  Grete Kral没有接受官方的碑，而是在广场另一头立了一块更小的木牌，上面写着所有没有被写进名单的人。Berta Winter第一个把花放在木牌下；Helene Bauer 2派人来问要不要移走，Grete Kral说等下雨再说。
  _effects: organization_found 另一块碑委员会 (other); position 发起人 @counter-monument:person-materialized-world-vienna-1912-17-evt:world-vienna-1912:010094; relation acquaintance with person-materialized-world-vienna-1912-62; state_parameter pc20-public-reversal.proof 70 -> 75; cash -1 (the small wooden plaque); flag +built_counter_monument; knowledge “木牌上写着所有没有被写进名单的人，第一朵花是{rival}放的。”; relation acquaintance with person-materialized-world-vienna-1912-120_

- **1942.09** `state_reaction:pc20-public-reversal/someone-defends` tags: pc20-public-reversal, public_reversal, exoneration, accusation, testimony, proof, pressure, support
  一个旧同事在公开场合替Grete Kral说了话，没有把Grete Kral说成无辜，只把当年那份名单的次序讲清楚。第二天，另一个人在面包店门口拦住Grete Kral，说自己一直觉得哪里不对。
  _effects: state_parameter pc20-public-reversal.support 55 -> 62; state_parameter pc20-public-reversal.proof 75 -> 79; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:010094_

- **1943.01** `hs18-suspect.photo::ctx-vienna-authoritarian-1934::milieu-tenement/spare-the-neighbor` tags: political_suspect, photograph, police, neighbor, surveillance, history, vienna, urban
  Grete Kral的铅笔停在一个熟悉的肩膀上。那是Luise Stein，那天只是路过，手里还提着一袋土豆。Grete Kral最终没有画下去，说照片太糊。Friedrich Bauer把照片转了个方向，说“再想想”；Luise Stein的名字因此没有进档案，Grete Kral却记住了自己差点写下去的手势。
  _effects: state_parameter political-suspect.heat 0.30000000000000004 -> 0.33000000000000007; flag +spared_neighbor_in_photo; knowledge “不写名字也会被记住。”; mood -0.020000000000000018_

- **1943.01** `state_tick:pl19-protected-scandal/the-network-meets/someone-wants-a-favor` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  有人替Grete Kral挡了一次采访，随后在走廊里提起自己儿子的学徒期满。Grete Kral知道这不是闲聊；当天晚上，那张写着名字的纸条被压在糖罐下面，像一枚没有付清的硬币。
  _effects: state_parameter pl19-protected-scandal.leverage 27 -> 39; state_parameter pl19-protected-scandal.protection 57 -> 53; state_parameter pl19-protected-scandal.exposure 45 -> 50; mood -0.020000000000000018_

- **1943.01** `state_tick:political-suspect/police-interest/avoided` tags: political-suspect, politics, repression, legal, surveillance, state, state_tick
  Grete Kral换了路线，避开那家咖啡馆和门口的两个便衣。档案里又添了一页，但今年没有传唤。
  _effects: state_parameter political-suspect.heat 0.33000000000000007 -> 0.2800000000000001_

- **1943.01** `state_tick:pc20-public-reversal/file-moves/the-file-disappears` tags: pc20-public-reversal, public_reversal, exoneration, accusation, testimony, proof, pressure, support
  Grete Kral按约定时间去调卷，窗口的人说编号不对，又说管库的人病了。走廊尽头的门开着，里面只剩空架子和一层灰；Grete Kral把手伸进去，摸到的是一截断掉的麻绳。
  _effects: state_parameter pc20-public-reversal.proof 79 -> 71; state_parameter pc20-public-reversal.danger 35 -> 41; state_parameter pc20-public-reversal.pressure 50 -> 55; mood -0.030000000000000027_

- **1943.01** `kernel-health.task-house-call::ctx-vienna-authoritarian-1934::milieu-tenement::house-call-medical-students/house-call-medical-teaching` tags: health, task, house_call, care, poverty, vienna, urban, crisis
  医院派来一名实习医生，身后跟着两个学生。他们把Grete Kral的胸口听了个遍，最后请来上级；药费减半，但Grete Kral被当成了讲课的病例。学生们走后，实习医生把听诊器在手里捂了很久，才敢再贴上来。
  _effects: cash -4 (reduced fee for a teaching-house call（其中3克朗记入债务）); health 0.03 (examined by a teaching team); condition; role; knowledge “教学出诊会有实习医生和学生轮流听诊，最后请上级定方案，药费可以减半。”_

- **1943.01** `vienna-medical-treatment.night-fever/corner-doctor` tags: health, medical, family, money
  施特劳斯医生用酒精棉擦手，把药粉倒进小纸袋，折口时指甲掐出印子。他说夜里别再喝醋水，那东西烧胃。Gustav Berg把炉火拨旺，在灶上坐了一壶水，答应第二天替Grete Kral去铺子里告假。
  _effects: cash -4 (医生出诊费和药费（其中4克朗记入债务）); health 0.05 (药粉和糖浆缓解症状); relation friend with person-gustav-berg_

- **1943.02** `office16-hire.protege::ctx-vienna-authoritarian-1934::milieu-tenement/hired-relative` tags: office, hire, patronage, bureaucracy, work, power, vienna, urban
  名单上添的是Helene Stein，一个连公文格式都分不清的远房亲戚。Elisabeth Berg把考勤表放在桌上，没有问原因；Grete Kral也没有解释，只在签字栏里写得比平时慢。第一个月，Helene Stein迟到了七次，工资照发。
  _effects: position 档案助理 @counter-monument:person-materialized-world-vienna-1912-17-evt:world-vienna-1912:010094; organization_funds; relation kin with person:evt:world-vienna-1912:002180:child; flag +hired_relative; knowledge “考勤表上记了七次迟到，工资一次没有扣。”; mood 0.020000000000000018_

- **1943.09** `hs18-cinema.newsreel::ctx-vienna-authoritarian-1934::milieu-tenement/recognize-a-neighbor` tags: cinema, newsreel, neighbor, recognition, media, history, vienna, urban
  银幕上是城西的街口，镜头扫过一排晾衣绳。Grete Kral认出绳下站着Rosa Berg 3，也认出旁边那个被两名便衣夹住的人。散场灯亮时，Rosa Berg 3还在笑，Grete Kral却把围巾往上拉了拉。
  _effects: knowledge “新闻片里那个被便衣夹住的人，我认识。”; flag +recognized_neighbor_on_newsreel; mood -0.030000000000000027_

- **1944.01** `office16-rival.removal-motion::ctx-vienna-authoritarian-1934::milieu-tenement/motion-fails` tags: office, rivalry, politics, removal, power, intrigue, vienna, urban
  会议室里有人念了一份动议，说Grete Kral把预算当成人情。Helene Bauer 2把签名页传了一圈，最后停在自己手里：支持票比反对票少三张。Grete Kral没有发言，只把下一季度的支出表放在桌上，表上每一笔都有收据。
  _effects: reputation 0.03999999999999998; relation rival with person-materialized-world-vienna-1912-120; knowledge “动议只拿到少数支持，三名原本签名的委员在投票前撤回了。”; mood 0.030000000000000027_

- **1944.01** `state_expire:pl19-protected-scandal` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  Grete Kral的「被小圈子护住的私情」到期；相关安排结束。
  _effects: state_remove pl19-protected-scandal state:world-vienna-1912:652; flag -protected_scandal_active_

- **1944.01** `state_tick:political-suspect/police-interest/detained` tags: political-suspect, politics, repression, legal, surveillance, state, state_tick
  Grete Kral在回家路上被拦住，问话从晚上八点持续到凌晨。没有正式指控，但名字被写进了另一本册子。
  _effects: state_parameter political-suspect.heat 0.2800000000000001 -> 0.43000000000000005; mood -0.07999999999999996_

- **1944.01** `state_transition:pc20-public-reversal/reversal-becomes-second-chance` tags: pc20-public-reversal, public_reversal, exoneration, accusation, testimony, proof, pressure, support
  Grete Kral从「公开翻案」转入另一段处境：a public reversal became a private chance to rebuild
  _effects: state_transition pc20-public-reversal -> pc20-second-chance; flag +reversal_became_second_chance; flag -public_reversal_active; flag +second_chance_open_

- **1944.01** `state_reaction:pc20-second-chance/public-doubt` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  旧事被人在街上重新提起，Grete Kral的名字和另一件事绑在一起。有人替Grete Kral辩解，也有人只笑了一声；Grete Kral回家后把当天的收据一张张摊开，像在给自己准备证词。
  _effects: state_parameter pc20-second-chance.suspicion 40 -> 48; state_parameter pc20-second-chance.credibility 35 -> 31; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:010884_

- **1944.01** `state_reaction:pc20-second-chance/someone-vouches` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  一个不算亲近的人替Grete Kral说了句话：不是保证Grete Kral已经变好，只说那天Grete Kral确实在场、确实没有躲。话传回来时，Grete Kral正在补一只旧口袋，针脚第一次没有歪。
  _effects: state_parameter pc20-second-chance.credibility 31 -> 38; state_parameter pc20-second-chance.hope 45 -> 50; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:010884_

- **1944.01** `r13-civ.quarantine::ctx-vienna-authoritarian-1934::milieu-tenement::r13-civ.quarantine-crisis/crisis-quarantine-work` tags: health, quarantine, epidemic, neighbor, confinement, vienna, urban, crisis
  Grete Kral把派工单从门缝底下捡起来，上面写着“疫后复工，逾期除名”。她把白线擦掉半截，走到街口又停住，因为岗亭里坐着人。回家后，Grete Kral把派工单钉在墙上，像钉一张欠条。
  _effects: cash -1 (门框上的石灰线（其中1克朗记入债务）); mood -0.09999999999999998; flag +quarantine_job_threatened; knowledge “the employer threatens to strike quarantined workers from th”_

- **1944.08** `vienna-women-housework.coal-stove/coal-stove.cold-day` tags: gender, housework, home, labour, family
  孩子放学回来搓着手说冷，Grete Kral把仅有的半捧煤末压进炉底，火苗细得像灯芯。她没接Gustav Berg递来的煤块，只说等明天煤店开门。屋里哈气成雾，晚饭的土豆是凉的。
  _effects: mood -0.040000000000000036; relation acquaintance with person-gustav-berg_

- **1944.10** `hs18-cinema.newsreel::ctx-vienna-postwar-1945::milieu-tenement/leave-early` tags: cinema, newsreel, neighbor, recognition, media, history, vienna, urban
  Grete Kral在第二本胶片放到一半时起身，摸黑从侧门出去。Marie Huber在门口抽烟，问是不是片子太旧。Grete Kral说不是，是座位太硬；街上的雨刚停，海报被泡得只剩半张脸。
  _effects: mood -0.010000000000000009; flag +left_newsreel_early_

- **1945.01** `office16-corruption.inspection::ctx-vienna-postwar-1945::milieu-tenement/clean-audit` tags: office, corruption, audit, legal, power, dark, vienna, urban
  Ferdinand Kraus带了两只空箱子来，走的时候还是空的。Grete Kral把三年的合同、收据和会议记录按月份排在地上，Ferdinand Kraus抽查了十二份，每一份都能对上签字人；最后一句是“下次可以少准备一点”。
  _effects: reputation 0.04999999999999999; organization_funds; skill; mood 0.030000000000000027; knowledge “审计抽查了十二份合同，每一份都能对上签字人。”_

- **1945.01** `state_tick:political-suspect/police-interest/avoided` tags: political-suspect, politics, repression, legal, surveillance, state, state_tick
  Grete Kral换了路线，避开那家咖啡馆和门口的两个便衣。档案里又添了一页，但今年没有传唤。
  _effects: state_parameter political-suspect.heat 0.43000000000000005 -> 0.38000000000000006_

- **1945.01** `state_expire:pc20-second-chance` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  Grete Kral的「第二次机会」到期；相关安排结束。
  _effects: state_remove pc20-second-chance state:world-vienna-1912:893; flag -second_chance_open_

- **1945.01** `r13-civ.arrange-move::ctx-vienna-authoritarian-1934::milieu-tenement/trunk-withheld` tags: social, housing, moving, landlord, cash, vienna, urban, crisis
  Grete Kral把最后一箱书搬下楼时，Ferdinand Kraus堵在门口，说墙皮被蹭掉一块，箱子先留下。Grete Kral说要赶车，Ferdinand Kraus说那就把修墙的钱付了。板车在巷口按铃，Grete Kral只抱走了装证件的木盒。
  _effects: cash -2 (板车与押金收据（其中2克朗记入债务）); flag +landlord_withheld_trunk; relation rival with person:evt:world-vienna-1912:000198:child; knowledge “the landlord keeps the trunk against a wall repair claim”; relation acquaintance with person-materialized-world-vienna-1912-112_

- **1945.03** `p22-dead-voice-child::ctx-vienna-postwar-1945::milieu-tenement/the-dead-relative-had-a-secret` tags: child, dead_relative, voice, eerie, dark, grief, family_secret, scandal
  孩子说出祖母临终前的一句悄悄话，那句话里有一个陌生男人的名字。家里人听见后把碗放下，Grete Kral看见他的手指在桌沿上停住了；Alois Winter在门外假装扫地，耳朵却贴着门缝。那天晚上，家里的灯亮到很晚，没有人先开口。
  _effects: state_add known-affair state:world-vienna-1912:943; state_add public-scandal state:world-vienna-1912:944; state_add p22-scandal-engine state:world-vienna-1912:945; relation kin with person:evt:world-vienna-1912:009568:child; flag +dead_grandmother_secret; mood -0.050000000000000044; flag +known_affair_active; flag -known_affair_active; flag +scandal_engine_active_

- **1945.03** `state_reaction:p22-scandal-engine/a-new-scandal-feeds-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Grete Kral的新故事登出来时，旧的那一页也被重新翻到桌面上。Grete Kral发现两件事共用同一个证人，而那个证人上周还来借过盐。
  _effects: state_parameter p22-scandal-engine.heat 50 -> 56; state_parameter p22-scandal-engine.reach 35 -> 39; state_parameter p22-scandal-engine.shame 60 -> 63; state_parameter p22-scandal-engine.leverage 45 -> 47; mood -0.009999999999999898_
  _causes: evt:world-vienna-1912:011656_

- **1945.09** `r2-law.savings-passbook::ctx-vienna-postwar-1945::milieu-tenement/clerk-covers-shortfall` tags: finance, bank, savings, household, contract, vienna, urban, postwar
  Elisabeth Huber 2把利息算错了一格，少给Grete Kral两克朗。Grete Kral指出来，Elisabeth Huber 2翻了三遍利率表，最后从自己口袋补上。Friedrich Bauer正好来查柜，问这笔钱为什么不在账上；Elisabeth Huber 2说是“上月的尾差”，Friedrich Bauer把这句话记进本子。
  _effects: cash 2 (存折上的蓝格子); flag +caught_interest_shortfall; relation colleague with person-materialized-world-vienna-1912-136; knowledge “the clerk paid the interest shortfall from his own pocket”; relation acquaintance with person-materialized-world-vienna-1912-136_

- **1946.01** `pc20-investigation.exoneration::ctx-vienna-postwar-1945::milieu-tenement/cleared` tags: politics, investigation, exoneration, public_reversal, police, reputation, patronage, vienna
  Otto Lechner 2把没有起诉的通知放在桌上，说案子到此为止。Grete Kral没有问为什么，只把通知折好；Hermann Winter 2在走廊里等着，看见Grete Kral出来，先看脸，再看手，最后让开了半步。
  _effects: state_add pc20-public-reversal state:world-vienna-1912:942; state_parameter political-suspect.heat 0.38000000000000006 -> 0.18000000000000005; relation acquaintance with person-materialized-world-vienna-1912-39; knowledge “没有起诉的通知只有一页，案子到此为止。”; flag +public_reversal_active_

- **1946.01** `state_tick:political-suspect/police-interest/avoided` tags: political-suspect, politics, repression, legal, surveillance, state, state_tick
  Grete Kral换了路线，避开那家咖啡馆和门口的两个便衣。档案里又添了一页，但今年没有传唤。
  _effects: state_parameter political-suspect.heat 0.18000000000000005 -> 0.13000000000000006_

- **1946.01** `state_tick:p22-scandal-engine/the-rumor-learns-new-words/the-story-turns-on-its-keeper` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  一个曾经替Grete Kral传话的人搬走了，带走了半条街的信任。第二天，信箱里多了一张没有署名的明信片，上面只写着“我还记得”；Grete Kral把明信片翻过来，背面是空的。
  _effects: state_parameter p22-scandal-engine.heat 56 -> 63; state_parameter p22-scandal-engine.reach 39 -> 44; state_parameter p22-scandal-engine.leverage 47 -> 43; state_parameter p22-scandal-engine.shame 63 -> 69_

- **1946.01** `agency:attend_meeting` tags: agency, agency:attend_meeting
  Grete Kral走到Leopoldstädter Zinshaus, gemeinsamer Gang门口，看见便衣和拥挤的人群，最终没有进去。
  _effects: reputation -0.010000000000000009_

- **1946.02** `lc17-health.chronic-onset::ctx-vienna-postwar-1945::milieu-tenement/a-name-for-it` tags: health, illness, care, family, class, body, vienna, urban
  Marie Huber把听诊器收进皮包，在处方上写下一个很长的病名，又说“先别急着告诉家里”。Grete Kral把纸折成四折，回家路上在药房门口站了一会儿；药费比这个月的煤钱还多。
  _effects: state_add chronic-illness state:world-vienna-1912:946; cash -3 (the first prescription and a second visit); knowledge “处方上写着一个很长的病名；医生说要按时复诊，但不能保证治好。”; flag +chronic_diagnosis_

- **1946.02** `vienna-women-housework.wash-day/wash-day.send-out` tags: gender, housework, home, labour, family
  洗衣妇把工服从报纸里抖出来，翻开领口看了看油垢，点头收下。Grete Kral转身回屋，铜板在围裙口袋里磕出轻响。Klara还在楼梯上嘟囔，说这钱不如买半斤猪油。
  _effects: cash -0.5 (请洗衣妇代洗工服); mood 0.030000000000000027_

- **1946.11** `r1-cul.bookshop::ctx-vienna-postwar-1945::milieu-tenement/found-the-io-u` tags: culture, bookshop, debt, discovery, censorship, vienna, urban, postwar
  Grete Kral在旧书摊翻到一本植物志，书脊里夹着一张借条，借款人是Helene Bauer 2的父亲。Helene Bauer 2看了半天，说这本植物志原本就属于这家书店，被人借走后再没回来。Grete Kral把书买下，借条留给Helene Bauer 2，自己只带走书。
  _effects: cash -3 (书脊里的借条); mood 0.040000000000000036; flag +found_borrowed_book; relation friend with person-materialized-world-vienna-1912-120; knowledge “the borrower was the bookseller’s own father”_

- **1946.12** `vienna-historical-social-movement.district-list/organize-relief-table` tags: history, historical_process, social_movement, organization, politics
  Franz Winter从围裙里掏出几张揉皱的收据，Grete Kral把它们按日期排开。屋外有人上楼，脚步在门口停了一下又走了。Grete Kral把新表折成四折塞进衣袋，说先管这条街，别的明天再说。
  _effects: skill; mood 0.030000000000000027_

- **1947.01** `office16-appointment.patronage-ledger::ctx-vienna-postwar-1945::milieu-tenement/appointed-ally` tags: office, appointment, patronage, organization, politics, power, vienna, urban
  Grete Kral把Klara的名字写在“联络员”后面，月薪一克朗，职责是每周来两次、把外面的消息带进来。Ferdinand Kral说这个岗位没有编制，Grete Kral说先按临时用工算；第一个月，Klara带来的消息比文件还多。
  _effects: position 联络员 @counter-monument:person-materialized-world-vienna-1912-17-evt:world-vienna-1912:010094; organization_funds; relation colleague with person-phase15-Klara-world-vienna-1912; flag +appointed_ally; knowledge “联络员不在正式编制里，工资走临时用工。”; mood 0.020000000000000018_

- **1947.01** `state_expire:political-suspect` tags: political-suspect, politics, repression, legal, surveillance, state, state_tick, state:political-suspect
  Grete Kral的「政治嫌疑」到期；相关安排结束。
  _effects: state_remove political-suspect state:world-vienna-1912:729_

- **1947.01** `state_transition:pc20-public-reversal/reversal-becomes-second-chance` tags: pc20-public-reversal, public_reversal, exoneration, accusation, testimony, proof, pressure, support
  Grete Kral从「公开翻案」转入另一段处境：a public reversal became a private chance to rebuild
  _effects: state_transition pc20-public-reversal -> pc20-second-chance; flag -public_reversal_active; flag +second_chance_open_

- **1947.01** `state_reaction:pc20-second-chance/public-doubt` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  旧事被人在街上重新提起，Grete Kral的名字和另一件事绑在一起。有人替Grete Kral辩解，也有人只笑了一声；Grete Kral回家后把当天的收据一张张摊开，像在给自己准备证词。
  _effects: state_parameter pc20-second-chance.suspicion 40 -> 48; state_parameter pc20-second-chance.credibility 35 -> 31; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:012478_

- **1947.01** `state_reaction:p22-scandal-engine/a-new-scandal-feeds-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Grete Kral的新故事登出来时，旧的那一页也被重新翻到桌面上。Grete Kral发现两件事共用同一个证人，而那个证人上周还来借过盐。
  _effects: state_parameter p22-scandal-engine.heat 63 -> 69; state_parameter p22-scandal-engine.reach 44 -> 48; state_parameter p22-scandal-engine.shame 69 -> 72; state_parameter p22-scandal-engine.leverage 43 -> 45; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:012478_

- **1947.01** `state_expire:public-scandal` tags: public-scandal, scandal, reputation, social, state, state_tick, state:public-scandal
  Grete Kral的「公开丑闻」到期；相关安排结束。
  _effects: state_remove public-scandal state:world-vienna-1912:944_

- **1947.01** `state_tick:chronic-illness/body-year/stable` tags: chronic-illness, health, illness, body, state, state_tick
  Grete Kral又撑过了一年。病没有走，但也没有立刻把人带走。
  _effects: state_parameter chronic-illness.years 0 -> 1_

- **1947.01** `agency:support_process` tags: agency, agency:support_process
  Grete Kral想帮忙，但组织者不信任新来的人，只让其在外围等消息。
  _effects: mood -0.040000000000000036; reputation -0.010000000000000009_

- **1947.08** `r3-crime.crime-scene::ctx-vienna-postwar-1945::milieu-tenement/second-trail-to-the-cellar` tags: crime, police, evidence, street, mistake, vienna, urban, postwar
  Grete Kral在院墙下面发现另一串鞋印，比死者的鞋小两号，一直通到Luise Bauer 2家的煤窖。Josef让人把窖门打开，里面只有一排腌菜缸。Luise Bauer 2站在门口说“你们随便看”，手却一直攥着围裙角。
  _effects: condition; flag +found_a_second_trail; relation rival with person-materialized-world-vienna-1912-112; knowledge “a second set of footprints leads to the neighbor’s coal cell”_

- **1947.09** `absurd15-stage.cast-the-king::ctx-vienna-postwar-1945::milieu-tenement/not-king-material` tags: performance, theatre, power, irony, work, pretend, vienna, urban
  Berta Huber 2看了Grete Kral的手，说这双手适合拿账本，不适合拿权杖。Grete Kral回家路上买了一张最便宜的站票，在最后一排看完了整场戏；散场时，Grete Kral记住的不是国王的台词，而是他坐下时椅子发出的声音。
  _effects: skill; cash -1 (买了一张站票); flag +cast_refused_

- **1947.10** `office16-appointment.patronage-ledger::ctx-vienna-postwar-1945::milieu-tenement/appointed-ally` tags: office, appointment, patronage, organization, politics, power, vienna, urban
  Grete Kral把Anna Winter的名字写在“联络员”后面，月薪一克朗，职责是每周来两次、把外面的消息带进来。Berta Moser 3说这个岗位没有编制，Grete Kral说先按临时用工算；第一个月，Anna Winter带来的消息比文件还多。
  _effects: position 联络员 @counter-monument:person-materialized-world-vienna-1912-17-evt:world-vienna-1912:010094; organization_funds; relation colleague with person:evt:world-vienna-1912:002990:child; knowledge “联络员不在正式编制里，工资走临时用工。”; mood 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-126_

- **1948.01** `p22-child-matchmaker::ctx-vienna-postwar-1945::milieu-tenement/the-album-is-shown-at-school` tags: child, matchmaker, family_album, enemy, warm, ironic, reconciliation, scandal
  孩子把相册带到学校，指着照片说Ferdinand Kral是家里的亲戚。老师把这件事告诉了街坊，街坊又在菜市场讲了一遍；到下午，Grete Kral已经听见三个版本，其中一个说Ferdinand Kral要来分房子。孩子回家时，书包里多了一张同学画的“全家福”。他把那张全家福夹进课本，没有还给同学。
  _effects: state_add public-scandal state:world-vienna-1912:1016; state_add p22-scandal-engine state:world-vienna-1912:1017; relation kin with person:evt:world-vienna-1912:009568:child; reputation -0.030000000000000027; flag +album_shown_at_school; mood -0.030000000000000027_

- **1948.01** `state_reaction:pc20-second-chance/public-doubt` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  旧事被人在街上重新提起，Grete Kral的名字和另一件事绑在一起。有人替Grete Kral辩解，也有人只笑了一声；Grete Kral回家后把当天的收据一张张摊开，像在给自己准备证词。
  _effects: state_parameter pc20-second-chance.suspicion 48 -> 56; state_parameter pc20-second-chance.credibility 31 -> 27; mood -0.010000000000000009_
  _causes: evt:world-vienna-1912:012684_

- **1948.01** `state_reaction:pc20-second-chance/someone-vouches` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  一个不算亲近的人替Grete Kral说了句话：不是保证Grete Kral已经变好，只说那天Grete Kral确实在场、确实没有躲。话传回来时，Grete Kral正在补一只旧口袋，针脚第一次没有歪。
  _effects: state_parameter pc20-second-chance.credibility 27 -> 34; state_parameter pc20-second-chance.hope 45 -> 50; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:012684_

- **1948.01** `state_reaction:p22-scandal-engine/a-new-scandal-feeds-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Grete Kral的新故事登出来时，旧的那一页也被重新翻到桌面上。Grete Kral发现两件事共用同一个证人，而那个证人上周还来借过盐。
  _effects: state_parameter p22-scandal-engine.heat 40 -> 46; state_parameter p22-scandal-engine.reach 45 -> 49; state_parameter p22-scandal-engine.shame 35 -> 38; state_parameter p22-scandal-engine.leverage 20 -> 22; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:012684_

- **1948.01** `state_tick:pc20-second-chance/kept-word/small-relapse` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  Grete Kral晚了半个钟头，进门时先解释路上的电车，又解释口袋里的收据。对方没有追问，只把已经凉掉的汤端回厨房；Grete Kral听见锅盖碰在灶台上，知道这次不是天气的问题。
  _effects: state_parameter pc20-second-chance.credibility 34 -> 27; state_parameter pc20-second-chance.suspicion 56 -> 64; state_parameter pc20-second-chance.debt 30 -> 33; mood -0.020000000000000018_

- **1948.01** `state_expire:p22-scandal-engine` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Grete Kral的「流言发动机」到期；相关安排结束。
  _effects: state_remove p22-scandal-engine state:world-vienna-1912:945; flag -scandal_engine_active_

- **1948.01** `state_tick:chronic-illness/body-year/stable` tags: chronic-illness, health, illness, body, state, state_tick
  Grete Kral又撑过了一年。病没有走，但也没有立刻把人带走。
  _effects: state_parameter chronic-illness.years 1 -> 2_

- **1948.01** `agency:organize_meeting` tags: agency, agency:organize_meeting
  Grete Kral在Leopoldstädter Zinshaus, gemeinsamer Gang召集了一次小范围会议，和Anton Bauer把下一次行动、会费和分工写在纸上。
  _effects: project; relation colleague with person-materialized-world-vienna-1912-6; reputation 0.020000000000000018_

- **1948.01** `initiative:found_process:zoo:person-materialized-world-vienna-1912-6-evt:world-vienna-1912:002407`
  普拉特动物园夜班队在Leopoldstädter Zinshaus, gemeinsamer Gang经过数年的招募、会议和互助，把分散的行动整理成公开纲领；这不是预先写好的历史，而是成员自己累积出来的运动。
  _effects: historical process 普拉特动物园夜班队的持续运动; historical development:initiative-zoo:person-materialized-world-vienna-1912-6-evt:world-vienna-1912:002407-1948 as organizer; historical development:initiative-zoo:person-materialized-world-vienna-1912-6-evt:world-vienna-1912:002407-1948 as organizer; historical development:initiative-zoo:person-materialized-world-vienna-1912-6-evt:world-vienna-1912:002407-1948 as organizer; historical development:initiative-zoo:person-materialized-world-vienna-1912-6-evt:world-vienna-1912:002407-1948 as organizer; historical development:initiative-zoo:person-materialized-world-vienna-1912-6-evt:world-vienna-1912:002407-1948 as organizer; knowledge “普拉特动物园夜班队的持续运动不是一次会议，而是我们这些年积累出来的持续组织。”; reputation 0.03999999999999998_

- **1948.01** `historical_phase`
  历史进程《普拉特动物园夜班队在Leopoldstädter Zinshaus, gemeinsamer Gang经过数年的招募、会议和互助，把分散的行动整理成公开纲领；这》从 emerging 进入 mobilizing。
  _effects: knowledge “我亲历或知晓「普拉特动物园夜班队在Leopoldstädter Zinshaus, gemeinsamer Gang经过”; knowledge “我亲历或知晓「普拉特动物园夜班队在Leopoldstädter Zinshaus, gemeinsamer Gang经过”; knowledge “我亲历或知晓「普拉特动物园夜班队在Leopoldstädter Zinshaus, gemeinsamer Gang经过”; knowledge “我亲历或知晓「普拉特动物园夜班队在Leopoldstädter Zinshaus, gemeinsamer Gang经过”; knowledge “我亲历或知晓「普拉特动物园夜班队在Leopoldstädter Zinshaus, gemeinsamer Gang经过”_
  _causes: evt:world-vienna-1912:013061_

- **1948.06** `vienna-women-housework.piecework-bundle/piecework.overnight` tags: gender, housework, home, labour, family, injury
  Grete Kral点着煤油灯缝到后半夜，把一捆领子全做完了。针脚密是密，可天亮时她看东西重影，手指被针扎了三回。星期六交活，Anna Winter量了量尺寸，收下整捆，数出七十五赫勒推过桌面。
  _effects: cash 0.75 (交了一整捆衬衫领子的计件工钱); health -0.03999999999999998 (通宵缝纫，眼睛疲劳，手指扎伤); mood 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-55_

- **1948.10** `r1-hc.funeral::ctx-vienna-postwar-1945::milieu-tenement/coffin-too-short` tags: death, funeral, grief, debt, institution, vienna, urban, postwar
  棺材铺的人来量尺寸，皮尺在遗体上拉了两遍，记下的数却短了一寸。下葬那天，Grete Kral看着棺盖压不下去，Anton Bauer用膝盖顶了两下才合上；Berta Huber 2把土撒下去，土块砸在木板上，声音很空。
  _effects: cash -18 (棺材铺的尺寸量错了); mood -0.020000000000000018; condition; flag +buried_with_an_ill_fitting_coffin; role; relation rival with person-materialized-world-vienna-1912-6; knowledge “the coffin was measured an inch short”_

- **1949.01** `project_progressed` tags: project
  「Grete Kral召集的会议」继续推进了一阶段。
  _effects: project_

- **1949.01** `office16-budget.sign-or-block::ctx-vienna-postwar-1945::milieu-tenement/blocked-the-permit` tags: office, budget, permit, administration, power, economy, vienna, urban
  Grete Kral把一份扩建许可证压在抽屉最下面，理由是排水和消防通道不合规。申请人Maria Berg 2在走廊里等到下班，最后只拿到一张写着“补件”的纸条。Grete Kral知道这份许可明年还会再来，但今年不会从自己的桌上出去。
  _effects: reputation 0.020000000000000018; skill; relation rival with person-materialized-world-vienna-1912-130; flag +blocked_permit; knowledge “扩建申请的排水图与消防通道不符合现行规定。”; relation acquaintance with person-materialized-world-vienna-1912-144; relation acquaintance with person-materialized-world-vienna-1912-130_

- **1949.01** `state_expire:pc20-second-chance` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  Grete Kral的「第二次机会」到期；相关安排结束。
  _effects: state_remove pc20-second-chance state:world-vienna-1912:1004; flag -second_chance_open_

- **1949.01** `state_tick:p22-scandal-engine/the-rumor-learns-new-words/the-story-turns-on-its-keeper` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  一个曾经替Grete Kral传话的人搬走了，带走了半条街的信任。第二天，信箱里多了一张没有署名的明信片，上面只写着“我还记得”；Grete Kral把明信片翻过来，背面是空的。
  _effects: state_parameter p22-scandal-engine.heat 46 -> 53; state_parameter p22-scandal-engine.reach 49 -> 54; state_parameter p22-scandal-engine.leverage 22 -> 18; state_parameter p22-scandal-engine.shame 38 -> 44_

- **1949.01** `state_tick:chronic-illness/body-year/worse` tags: chronic-illness, health, illness, body, state, state_tick, injury
  Grete Kral的病在今年加重。医生换了一种药，账单比药更让人喘不过气。
  _effects: health -0.06 (chronic illness worsened); cash -2 (medical costs); state_parameter chronic-illness.severity 0.35 -> 0.44999999999999996_

- **1949.01** `agency:recruit_members` tags: agency, agency:recruit_members
  Grete Kral试图招募Otto Bauer，但对方担心工作和警察，没有给出承诺。
  _effects: reputation -0.010000000000000009_

- **1949.05** `office16-appointment.patronage-ledger::ctx-vienna-postwar-1945::milieu-tenement/appointed-ally` tags: office, appointment, patronage, organization, politics, power, vienna, urban
  Grete Kral把Alois Winter的名字写在“联络员”后面，月薪一克朗，职责是每周来两次、把外面的消息带进来。Luise Lechner说这个岗位没有编制，Grete Kral说先按临时用工算；第一个月，Alois Winter带来的消息比文件还多。
  _effects: position 联络员 @counter-monument:person-materialized-world-vienna-1912-17-evt:world-vienna-1912:010094; relation colleague with person-materialized-world-vienna-1912-48; knowledge “联络员不在正式编制里，工资走临时用工。”; mood 0.020000000000000018_

- **1949.10** `r2-leisure.horse-race::ctx-vienna-postwar-1945::milieu-tenement/won-on-the-outside` tags: leisure, horse_racing, betting, debt, risk, vienna, urban, postwar
  最后一道弯，Grete Kral押的“黑旋风”从外道切进来，马蹄把泥甩到栏杆上。Alois Winter抓着Grete Kral的袖子，指甲掐进布里。冲线时，Helene Bauer 2在围栏边低下头，像是在祈祷。Grete Kral拿着彩票去兑钱，窗口后面的人数了三遍，才把一大叠钞票推出来。
  _effects: cash 20 (最后一道弯); mood 0.12; flag +won_horse_race_bet; relation friend with person-materialized-world-vienna-1912-48; knowledge “Black Whirlwind runs best on the outside rail”_

- **1949.11** `vienna-medical-treatment.toothache/barber-pull` tags: health, medical, family, money
  理发铺里还坐着等刮脸的老主顾，肥皂味和烟味混在一起。弗朗茨把围布往Grete Kral胸前一系，说忍着点。钳子第一次滑脱，第二次才夹稳，牙出来时带着一小块肉，他用明矾水按住了。
  _effects: cash -1.2 (理发师拔牙收费); health 0.02999999999999997 (病牙被拔除但手法粗糙)_

- **1950.01** `project_completed` tags: project
  「Grete Kral召集的会议」完成了当前阶段，参与者留下了实际的记录和后续安排。
  _effects: project_

- **1950.01** `p22-child-matchmaker::ctx-vienna-postwar-1945::milieu-tenement/the-enemy-was-the-landlord` tags: child, matchmaker, family_album, enemy, warm, ironic, reconciliation, scandal
  Luise Huber看完相册，笑着说这栋楼正好是他的。Grete Kral以为他在开玩笑，直到Luise Huber拿着房契上门；Luise Huber说看在孩子的份上，房租可以晚交一个月。那天晚上，孩子把照片从相册里撕下来，放进了自己的铅笔盒。孩子把铅笔盒合上，说以后不再贴照片了。
  _effects: state_add debt-bondage state:world-vienna-1912:1124; cash -4 (the rent increase and the late fee); relation rival with person-materialized-world-vienna-1912-65; relation kin with person:evt:world-vienna-1912:009568:child; flag +enemy_was_landlord_

- **1950.01** `state_expire:public-scandal` tags: public-scandal, scandal, reputation, social, state, state_tick, state:public-scandal
  Grete Kral的「公开丑闻」到期；相关安排结束。
  _effects: state_remove public-scandal state:world-vienna-1912:1016_

- **1950.01** `state_expire:p22-scandal-engine` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Grete Kral的「流言发动机」到期；相关安排结束。
  _effects: state_remove p22-scandal-engine state:world-vienna-1912:1017_

- **1950.01** `state_tick:chronic-illness/body-year/worse` tags: chronic-illness, health, illness, body, state, state_tick, injury
  Grete Kral的病在今年加重。医生换了一种药，账单比药更让人喘不过气。
  _effects: health -0.06 (chronic illness worsened); cash -2 (medical costs); state_parameter chronic-illness.severity 0.44999999999999996 -> 0.5499999999999999_

- **1950.01** `agency:organize_meeting` tags: agency, agency:organize_meeting
  Grete Kral原定在Leopoldstädter Zinshaus, gemeinsamer Gang开会，但来的人不够，或者有人临时退缩；最后只留下几张没发完的纸条。
  _effects: mood -0.040000000000000036; reputation -0.010000000000000009_

- **1950.02** `absurd15-stage.cast-the-king::ctx-vienna-postwar-1945::milieu-tenement/understudy-contract` tags: performance, theatre, power, irony, work, pretend, vienna, urban
  Hermann Winter 2演主角，Grete Kral拿到的是替角合同：国王的戏服先按主角的尺寸做，Grete Kral只能在排练时穿。导演说这不是坏事，至少不用负责谢幕。首演夜，Grete Kral坐在后台，听见前台每一次掌声都像在敲自己的门。
  _effects: state_add stage-sovereign state:world-vienna-1912:1178; cash 1 (替角的排练补贴); mood -0.020000000000000018; flag +understudy_king; flag +stage_sovereign; reputation 0.03999999999999998_

- **1950.07** `office16-rival.removal-motion::ctx-vienna-postwar-1945::milieu-tenement/counter-motion` tags: office, rivalry, politics, removal, power, intrigue, vienna, urban
  Grete Kral没有等投票，而是让Luise Lechner把委员会过去三年的差旅账目复印了十份。会议开始前，Ferdinand Kral的动议被一份“程序审查”取代；审查没有找到Grete Kral的问题，却找到了两次重复报销。
  _effects: organization_funds; reputation -0.030000000000000027; relation rival with person:evt:world-vienna-1912:001284:child; flag +rival_audited; knowledge “委员会的差旅账目里有两次重复报销。”; mood 0.010000000000000009_

- **1950.08** `ad20-shop-opening::ctx-vienna-postwar-1945::milieu-tenement/the-street-watches` tags: shop, business, opening, everyday, public, obligation, vienna, urban
  Grete Kral把新店的招牌挂上去时，街对面已经站了几个人。第一位客人买了一包针，第二位问能不能赊账，第三位什么也没买，只说“看看”。到傍晚，Grete Kral发现自己记住了每一张脸，却忘了算今天的账。
  _effects: state_add ad20-public-attention state:world-vienna-1912:1177; cash 3 (the first day’s takings); reputation 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-124; flag +shop_opened; mood 0.040000000000000036; relation acquaintance with person-materialized-world-vienna-1912-124; flag +public_attention_active_

- **1951.01** `p21-staged-death::ctx-vienna-postwar-1945::milieu-tenement/the-coffin-is-too-light` tags: staged_death, debt, fraud, funeral, escape, betrayal, secret, high_drama
  抬棺的人在第一级台阶上停了一下，说这棺材轻得不对。Luise Lechner伸手敲了敲木板，里面传出的不是沉闷的回声；Otto Bauer把登记簿合上，Berta Huber 2的黑纱滑到肩膀上。当天下午，警察在火车站候车室里找到了Grete Kral，手里还攥着一张去林茨的车票。
  _effects: state_add public-scandal state:world-vienna-1912:1174; state_add p21-scandal-web state:world-vienna-1912:1175; state_add under-investigation state:world-vienna-1912:1176; reputation -0.06; cash -3 (funeral costs and a police fine); knowledge “抬棺的人在第一级台阶上停了一下，说这棺材轻得不对。”; mood -0.05999999999999994; flag +scandal_web_active_

- **1951.01** `state_reaction:ad20-public-attention/a-scandal-sticks` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  旧闻被重新排上版面，标题比上次短，意思却更重。Grete Kral没有买那份报纸，但整条街都知道了标题。
  _effects: state_parameter ad20-public-attention.attention 40 -> 50; state_parameter ad20-public-attention.danger 10 -> 18; state_parameter ad20-public-attention.sympathy 45 -> 40; mood -0.030000000000000027_
  _causes: evt:world-vienna-1912:014350_

- **1951.01** `state_tick:debt-bondage/interest/pay-interest` tags: debt-bondage, debt, work, poverty, legal, state, state_tick
  Grete Kral又付了一年的利息。本金几乎没动，债主的账本却翻到了新一页。
  _effects: cash -3 (debt interest); state_parameter debt-bondage.debt 10 -> 12_

- **1951.01** `state_tick:ad20-public-attention/the-attention-cycle/cools` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  Grete Kral发现最近没有人再提那件事。报纸换了头版，邻居也换了话题；本该轻松，Grete Kral却在买菜时反复整理衣领，好像还在等一个不会来的目光。
  _effects: state_parameter ad20-public-attention.attention 50 -> 42; state_parameter ad20-public-attention.sympathy 40 -> 37; state_parameter ad20-public-attention.opportunity 50 -> 48; mood -0.010000000000000009_

- **1951.01** `state_expire:stage-sovereign` tags: stage-sovereign, performance, theatre, pretend, status, irony, power, no-real-authority
  Grete Kral的「舞台上的君主」到期；相关安排结束。
  _effects: state_remove stage-sovereign state:world-vienna-1912:1178; flag -stage_sovereign_

- **1951.01** `state_tick:chronic-illness/body-year/worse` tags: chronic-illness, health, illness, body, state, state_tick, injury
  Grete Kral的病在今年加重。医生换了一种药，账单比药更让人喘不过气。
  _effects: health -0.06 (chronic illness worsened); cash -2 (medical costs); state_parameter chronic-illness.severity 0.5499999999999999 -> 0.6499999999999999_

- **1951.01** `r13-fam.care-sick-child::ctx-vienna-postwar-1945::milieu-tenement/fever-breaks` tags: task, care, health, child, fever, night, vienna, urban
  Grete Kral把湿布拧到不再滴水，敷在Anna 2的额头上。孩子烧得说胡话，Grete Kral就一遍遍念窗外的街名，直到天快亮时，孩子的手心终于出了一层汗。Grete Kral把被子掖好，自己靠在床沿睡了过去，醒来时锅里还剩半碗冷粥。
  _effects: cash -2 (第三遍换湿布); health -0.030000000000000027 (第三遍换湿布); condition; flag +nursed_child_fever; health 0.06000000000000005 (the fever broke after a night of cold compresses); relation guardian with person:evt:world-vienna-1912:011295:child_

- **1951.07** `oj18-lift.stuck::ctx-vienna-postwar-1945::milieu-tenement/blackout-lift` tags: lift, building, work, night, passenger, odd_job, suspense, vienna
  停电来得毫无预兆，轿厢里只剩一盏应急蜡。Grete Kral用手动闸把轿厢停在最近的楼层，又用肩膀顶开门；乘客一个个跨出去，最后一个人回头说“你该去当消防员”。Grete Kral的胳膊酸了三天，管理处的维修单上却只写“正常”。
  _effects: health -0.020000000000000018 (forced the lift door open with a shoulder); reputation 0.03999999999999998; cash 1 (blackout shift pay); state_add oj18-odd-apprenticeship state:world-vienna-1912:1226; flag +lift_operator; flag +blackout_lift; knowledge “停电时轿厢里只剩一盏应急蜡，手动闸要停在最近的楼层。”; role; flag +odd_job_apprentice_

- **1951.07** `vienna-parish-aid.sick-call/sick-call.with-priest` tags: faith, parish, mutual_aid, poverty, family
  Grete Kral觉得一个人去不合适，绕到教堂请了修女一同上楼。修女看过病人，留下药包和一小瓶圣水，说会从教区账上出钱请医生来看一趟。Luise Lechner在楼下等着，说这样妥当，病人家里没男人，多个见证人心里安稳。
  _effects: mood 0.040000000000000036; flag +parish_sick_visitor_

- **1951.12** `vienna-women-housework.wash-day/wash-day.send-out` tags: gender, housework, home, labour, family
  洗衣妇把工服从报纸里抖出来，翻开领口看了看油垢，点头收下。Grete Kral转身回屋，铜板在围裙口袋里磕出轻响。Grete Kraus还在楼梯上嘟囔，说这钱不如买半斤猪油。
  _effects: cash -0.5 (请洗衣妇代洗工服); mood 0.030000000000000027; relation acquaintance with person:evt:world-vienna-1912:005841:child_

- **1952.01** `office16-rival.removal-motion::ctx-vienna-postwar-1945::milieu-tenement/motion-fails` tags: office, rivalry, politics, removal, power, intrigue, vienna, urban
  会议室里有人念了一份动议，说Grete Kral把预算当成人情。Ferdinand Bauer把签名页传了一圈，最后停在自己手里：支持票比反对票少三张。Grete Kral没有发言，只把下一季度的支出表放在桌上，表上每一笔都有收据。
  _effects: reputation 0.03999999999999998; relation rival with person:evt:world-vienna-1912:000401:child; knowledge “动议只拿到少数支持，三名原本签名的委员在投票前撤回了。”; mood 0.030000000000000027_

- **1952.01** `state_reaction:public-scandal/gossip` tags: public-scandal, scandal, reputation, social, state, state_reaction, protection, network
  Grete Kral走进咖啡馆时，邻桌的声音低了一拍。没有人当面说什么，但每个人都知道该说什么。
  _effects: mood -0.030000000000000027; reputation -0.02999999999999997_
  _causes: evt:world-vienna-1912:014796_

- **1952.01** `state_reaction:ad20-public-attention/a-scandal-sticks` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  旧闻被重新排上版面，标题比上次短，意思却更重。Grete Kral没有买那份报纸，但整条街都知道了标题。
  _effects: state_parameter ad20-public-attention.attention 42 -> 52; state_parameter ad20-public-attention.danger 18 -> 26; state_parameter ad20-public-attention.sympathy 37 -> 32; mood -0.030000000000000027_
  _causes: evt:world-vienna-1912:014796_

- **1952.01** `state_expire:debt-bondage` tags: debt-bondage, debt, work, poverty, legal, state, state_tick, state:debt-bondage
  Grete Kral的「债务束缚」到期；相关安排结束。
  _effects: state_remove debt-bondage state:world-vienna-1912:1124_

- **1952.01** `state_tick:p21-scandal-web/the-web-tightens/a-strand-snaps` tags: p21-scandal-web, scandal_web, scandal, secret, blackmail, network, leverage, danger
  一个证人搬走了，带走了他那一份记忆。Grete Kral在旧地址门口站了半个下午，回来时发现信箱里多了一张没有署名的明信片，上面只写着“我还记得”。
  _effects: state_parameter p21-scandal-web.exposure 80 -> 88; state_parameter p21-scandal-web.leverage 50 -> 44; state_parameter p21-scandal-web.danger 60 -> 65; reputation -0.020000000000000018_

- **1952.01** `state_expire:under-investigation` tags: under-investigation, legal, police, investigation, risk, state, state_tick, state:under-investigation
  Grete Kral的「被调查」到期；相关安排结束。
  _effects: state_remove under-investigation state:world-vienna-1912:1176_

- **1952.01** `state_tick:ad20-public-attention/the-attention-cycle/warms` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  Grete Kral在街角被人认出来，对方没有要求什么，只说“上次那件事做得不错”。这句客气话被旁边的人听见，下午便有两个陌生人朝Grete Kral点头。关注没有减少，但空气松了一点。
  _effects: state_parameter ad20-public-attention.attention 52 -> 48; state_parameter ad20-public-attention.sympathy 32 -> 38; state_parameter ad20-public-attention.opportunity 48 -> 52; mood 0.020000000000000018_

- **1952.01** `state_tick:oj18-odd-apprenticeship/strange-year/the-logbook-mislaid` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  巡查簿在换班时不见了，第二天却出现在煤筐底下，最后几页被水泡得发皱。管事的说签字不能算数，扣了Grete Kral半个月的夜班钱；Grete Kral没有争，只在新的簿子第一页把日期写得很大。
  _effects: state_parameter oj18-odd-apprenticeship.trust 35 -> 19; state_parameter oj18-odd-apprenticeship.reliability 65 -> 55; mood -0.050000000000000044_

- **1952.01** `state_tick:chronic-illness/body-year/stable` tags: chronic-illness, health, illness, body, state, state_tick
  Grete Kral又撑过了一年。病没有走，但也没有立刻把人带走。
  _effects: state_parameter chronic-illness.years 2 -> 3_

- **1952.01** `r13-fam.collect-funeral-money::ctx-vienna-postwar-1945::milieu-tenement/collection-short` tags: task, social, funeral, neighbor, charity, grief, vienna, urban
  走到第四家，Grete Kral的帽子还是轻的。有人说明天再给，有人说自家也刚办过丧事。Grete Kral把帽子里的钱倒在Anna Stein 2的桌上，数了两遍，还差一口棺材的钱；Anna Stein 2说算了，用旧门板钉一个也行。
  _effects: cash -1 (端着一顶帽子走楼道); flag +funeral_collection_short; relation acquaintance with person-materialized-world-vienna-1912-124; knowledge “a plain coffin costs more than the building can raise”; condition_

- **1952.01** `state_reaction:oj18-odd-apprenticeship/the-thing-in-the-basement` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  夜班结束前，Grete Kral听见地下室传来拖拽声。下去时，门开着，地上只有一道湿拖把的痕迹；第二天，所有人都说那间屋子锁了十年。
  _effects: state_parameter oj18-odd-apprenticeship.strangeKnowledge 15 -> 23; state_parameter oj18-odd-apprenticeship.trust 19 -> 16; mood -0.030000000000000027; knowledge “地下室那扇门后面有东西被搬动过，但巡查簿上没有记录。”_
  _causes: evt:world-vienna-1912:015131_

- **1952.01** `p9-gap-adult-unemployed.dock-morning/dock-watched-tools` tags: adulthood, unemployment, casual_labour, poverty, daily, dock
  河面的雾散尽时，码头上的人走了一半。Grete Kral蹲在石阶上替Luise Bauer 2守着麻绳和铁钩，看装卸工在跳板上喊号子。汤送来时还烫嘴，豆子沉在碗底。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-112_

- **1952.05** `p9-gap-adult-ordinary-day.organ-grinder/organ-grinder.listen-coins` tags: adulthood, daily, leisure, neighborhood, ordinary, music, street
  她本来只是去面包店买盐，被琴声绊住了脚。猴子蹲在帽沿上啃一颗栗子，风琴师脱下礼帽扇风，露出汗湿的额角。曲子完了，她数出两枚铜板放进帽子，听见身后有人吹口哨。
  _effects: cash -0.02 (给手摇风琴师的赏钱); mood 0.030000000000000027_

- **1952.10** `ad20-family-dinner::ctx-vienna-postwar-1945::milieu-tenement/the-fourth-bowl` tags: family, dinner, everyday, obligation, public, grief, vienna, urban
  Helene Stein来得比约定早，手里提着一小袋栗子。Grete Kral多摆了一副碗筷，又把汤里的肉往那只碗里拨了两块。饭吃到一半，Helene Stein忽然说“你们家吃饭真安静”，Grete Kral才发现自己一直在听楼上的脚步。
  _effects: food; mood 0.030000000000000027; flag +family_dinner_guest_

- **1953.01** `office16-budget.sign-or-block::ctx-vienna-postwar-1945::milieu-tenement/signed-with-margin` tags: office, budget, permit, administration, power, economy, vienna, urban
  Grete Kral在预算表上签了字，把冬季煤房的款项从三笔并成一笔，又给夜班守卫加了半份津贴。Elisabeth Berg算出省下的钱刚好够修屋顶；没有人鼓掌，但一月的会议室不再需要穿大衣。
  _effects: organization_funds; reputation 0.03999999999999998; skill; mood 0.020000000000000018; flag +signed_balanced_budget; knowledge “把冬季煤房的款项并成一笔后，省下的钱够修会议室屋顶。”_

- **1953.01** `state_expire:public-scandal` tags: public-scandal, scandal, reputation, social, state, state_tick, state:public-scandal
  Grete Kral的「公开丑闻」到期；相关安排结束。
  _effects: state_remove public-scandal state:world-vienna-1912:1174_

- **1953.01** `state_tick:p21-scandal-web/the-web-tightens/a-strand-snaps` tags: p21-scandal-web, scandal_web, scandal, secret, blackmail, network, leverage, danger
  一个证人搬走了，带走了他那一份记忆。Grete Kral在旧地址门口站了半个下午，回来时发现信箱里多了一张没有署名的明信片，上面只写着“我还记得”。
  _effects: state_parameter p21-scandal-web.exposure 88 -> 96; state_parameter p21-scandal-web.leverage 44 -> 38; state_parameter p21-scandal-web.danger 65 -> 70; reputation -0.020000000000000018_

- **1953.01** `state_tick:ad20-public-attention/the-attention-cycle/cools` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  Grete Kral发现最近没有人再提那件事。报纸换了头版，邻居也换了话题；本该轻松，Grete Kral却在买菜时反复整理衣领，好像还在等一个不会来的目光。
  _effects: state_parameter ad20-public-attention.attention 48 -> 40; state_parameter ad20-public-attention.sympathy 38 -> 35; state_parameter ad20-public-attention.opportunity 52 -> 50; mood -0.010000000000000009_

- **1953.01** `state_tick:chronic-illness/body-year/worse` tags: chronic-illness, health, illness, body, state, state_tick, injury
  Grete Kral的病在今年加重。医生换了一种药，账单比药更让人喘不过气。
  _effects: health -0.06000000000000005 (chronic illness worsened); cash -2 (medical costs); state_parameter chronic-illness.severity 0.6499999999999999 -> 0.7499999999999999_

- **1953.01** `r13-civ.enter-hospital::ctx-vienna-postwar-1945::milieu-tenement/admitted-third-class` tags: health, hospital, admission, deposit, institution, vienna, urban, postwar
  Hermann Kral 2把押金收据和住院单钉在一起，让Grete Kral去三楼东侧等床。走廊里全是折叠床，Josef给Grete Kral一条洗得发硬的毯子，说今晚先别喝水。Grete Kral把鞋塞在枕头下面，听着隔壁的呻吟睡了过去。
  _effects: cash -8 (住院处窗口的押金); health 0.06000000000000005 (住院处窗口的押金); condition; flag +hospitalized_third_class; relation acquaintance with person-phase15-Josef-world-vienna-1912; relation acquaintance with person-materialized-world-vienna-1912-81_

- **1953.02** `r3-war.pow-return::ctx-vienna-postwar-1945::milieu-tenement::pow-return-aftermath/built-spoon-after-return` tags: war, pow, return, family, postwar, vienna, urban, reform
  回来第三个月，Grete Kral还是每天凌晨四点醒。Berta Huber 2听见动静，也跟着起来烧水；两人坐在厨房里，不说话，等天亮。Berta Bauer来借盐，看见Grete Kral在削一块木头，削成一把小勺，说是给Berta Huber 2的。
  _effects: mood 0.020000000000000018; condition; flag +built_spoon_after_pow_return; relation kin with person-materialized-world-vienna-1912-56; relation acquaintance with person-materialized-world-vienna-1912-52_

- **1953.03** `oj18-taxi.night-fare::ctx-vienna-postwar-1945::milieu-tenement/coop-keys` tags: taxi, night, driver, passenger, work, odd_job, everyday, vienna
  合作社的调度Helene Bauer 2把一枚铜牌和一把车钥匙推过柜台，说夜班只跑环城路，十一点以后不接去普拉特的车。Grete Kral把铜牌挂在后视镜上，第一晚就拉了七个客人，最后一个在车上睡着，打鼾像一台小马达。
  _effects: organization_found 第二区夜班出租合作社 (other); position 夜班司机 @taxi:person-materialized-world-vienna-1912-17-evt:world-vienna-1912:015849; state_add oj18-odd-apprenticeship state:world-vienna-1912:1317; cash 2 (night taxi fares); flag +taxi_night_shift; knowledge “夜班只跑环城路，十一点以后不接去普拉特的车。”; relation acquaintance with person-materialized-world-vienna-1912-151_

- **1954.01** `ml18-charity.neighborhood-clinic::ctx-vienna-postwar-1945::milieu-tenement/the-family-blocks-the-donation` tags: charity, money, clinic, reputation, community, warm, vienna, urban
  捐款的事刚说出口，家里的兄弟先来了。他说这笔钱该留给自家人，不该拿去给街上的孩子看病。Josef Weiss在诊所门口等了半小时，最后把图纸卷起来；Grete Kral站在空铺面里，听见隔壁肉铺的锯骨声一下一下传过来。
  _effects: cash -2 (the notary's fee for the abandoned clinic deed); flag +family_blocked_clinic; knowledge “诊所的铺面已经租下，但家里的兄弟不同意把横财捐出去。”; mood -0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-138_

- **1954.01** `state_expire:p21-scandal-web` tags: p21-scandal-web, scandal_web, scandal, secret, blackmail, network, leverage, danger
  Grete Kral的「丑闻蛛网」到期；相关安排结束。
  _effects: state_remove p21-scandal-web state:world-vienna-1912:1175; flag -scandal_web_active_

- **1954.01** `state_expire:ad20-public-attention` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  Grete Kral的「被看见的日常」到期；相关安排结束。
  _effects: state_remove ad20-public-attention state:world-vienna-1912:1177; flag -public_attention_active_

- **1954.01** `state_expire:oj18-odd-apprenticeship` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  Grete Kral的「奇职学徒」到期；相关安排结束。
  _effects: state_remove oj18-odd-apprenticeship state:world-vienna-1912:1226; role; flag -odd_job_apprentice_

- **1954.01** `state_tick:oj18-odd-apprenticeship/strange-year/trusted-with-the-keys` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  两年过去，Grete Kral已经能闭着眼说出哪块地板会响、哪盏煤气灯该在几点关。师傅把备用钥匙交下来，没有解释为什么第三把钥匙磨得最亮；Grete Kral也没有问，只在巡查簿最后一页画了一个小小的记号。
  _effects: state_parameter oj18-odd-apprenticeship.trust 30 -> 40; state_parameter oj18-odd-apprenticeship.strangeKnowledge 10 -> 20; state_parameter oj18-odd-apprenticeship.nightsWorked 0 -> 24; cash 2 (night-shift wages); skill_

- **1954.01** `state_tick:chronic-illness/body-year/stable` tags: chronic-illness, health, illness, body, state, state_tick
  Grete Kral又撑过了一年。病没有走，但也没有立刻把人带走。
  _effects: state_parameter chronic-illness.years 3 -> 4_

- **1954.01** `r13-civ.soup-kitchen::ctx-vienna-postwar-1945::milieu-tenement/recognized-neighbor` tags: social, charity, soup_kitchen, hunger, volunteer, vienna, urban, postwar
  Grete Kral舀到第七碗时，认出碗后面那张脸是楼下的Luise Bauer 2。Luise Bauer 2把帽檐压低，Grete Kral什么也没问，只把勺子沉下去，多捞了一块土豆。后面的人开始敲碗。
  _effects: mood -0.06000000000000005; flag +saw_neighbor_in_soup_line; relation friend with person-materialized-world-vienna-1912-112; knowledge “the neighbor has been queueing at the soup kitchen”; relation acquaintance with person-materialized-world-vienna-1912-160_

- **1954.01** `vienna-tenement-neighbors.shared_stove_fire/fire_no_damage` tags: home, social, family, housing
  Grete Kral刚把锅端下灶，火苗就蹿了起来，Hermann Kral 2一脚踩灭地上的油布，顺手抄起沙箱里的沙子盖住灶口。两人都没受伤，但Hermann Kral 2的鞋底烧穿一个洞，那是唯一一双出门的鞋。
  _effects: relation friend with person-materialized-world-vienna-1912-81_

- **1954.01** `p9-gap-adult-solitude.window-argument/window-argument.closed` tags: adulthood, daily, solitude, ordinary, home, neighbor, overheard, injury
  Grete Kral把窗关上，争吵声立刻变成闷响，像隔着一层棉被。可那男人的一句话还是从缝里钻进来，她躺到床上翻来覆去，数着墙上的水渍，到很晚才睡着。
  _effects: health -0.030000000000000027 (被楼下争吵搅得没睡好)_

- **1954.04** `vienna-market-household.friday-fish/friday-fish.buy` tags: home, market, food, social
  六个十字币换来一条鳟鱼和一把欧芹。Grete Kral把鱼煎得两面焦黄，鱼尾巴给了闻着味来的Anna Winter。自家孩子用面包把盘底的黄油擦干净。
  _effects: cash -6 (买鳟鱼和黄油); food; mood 0.07999999999999996_

- **1955.01** `p22-child-matchmaker::ctx-vienna-postwar-1945::milieu-tenement/the-album-is-shown-at-school` tags: child, matchmaker, family_album, enemy, warm, ironic, reconciliation, scandal
  孩子把相册带到学校，指着照片说Ferdinand Kral是家里的亲戚。老师把这件事告诉了街坊，街坊又在菜市场讲了一遍；到下午，Grete Kral已经听见三个版本，其中一个说Ferdinand Kral要来分房子。孩子回家时，书包里多了一张同学画的“全家福”。他把那张全家福夹进课本，没有还给同学。
  _effects: state_add public-scandal state:world-vienna-1912:1359; state_add p22-scandal-engine state:world-vienna-1912:1360; relation kin with person:evt:world-vienna-1912:009568:child; reputation -0.02999999999999997; mood -0.010000000000000009; flag +scandal_engine_active_

- **1955.01** `state_tick:chronic-illness/body-year/worse` tags: chronic-illness, health, illness, body, state, state_tick, injury
  Grete Kral的病在今年加重。医生换了一种药，账单比药更让人喘不过气。
  _effects: health -0.06000000000000005 (chronic illness worsened); cash -2 (medical costs); state_parameter chronic-illness.severity 0.7499999999999999 -> 0.8499999999999999_

- **1955.01** `agency:organize_meeting` tags: agency, agency:organize_meeting
  Grete Kral在Leopoldstädter Zinshaus, gemeinsamer Gang召集了一次小范围会议，和Emil Lechner把下一次行动、会费和分工写在纸上。
  _effects: project; historical development:initiative-counter-monument:person-materialized-world-vienna-1912-17-evt:world-vienna-1912:010094-1946 as organizer; historical_influence; knowledge “我召集了一次关于另一块碑委员会在Leopoldstädter Zinshaus, gemeins的会议。”; relation colleague with person:evt:world-vienna-1912:000849:child; reputation 0.020000000000000018_

- **1955.01** `ad20-shop-opening::ctx-vienna-postwar-1945::milieu-tenement/the-street-watches` tags: shop, business, opening, everyday, public, obligation, vienna, urban
  Grete Kral把新店的招牌挂上去时，街对面已经站了几个人。第一位客人买了一包针，第二位问能不能赊账，第三位什么也没买，只说“看看”。到傍晚，Grete Kral发现自己记住了每一张脸，却忘了算今天的账。
  _effects: state_add ad20-public-attention state:world-vienna-1912:1426; cash 3 (the first day’s takings); reputation 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-151; mood 0.040000000000000036; flag +public_attention_active_

- **1955.07** `vienna-historical-social-movement.relief-network/open-the-books-again` tags: history, historical_process, social_movement, organization, politics
  墙面粗灰，Grete Kral用图钉钉上分发清单，纸边被穿堂风吹得直抖。老人说自家也在等煤，Hermann Winter 2把围巾往肩上紧了紧，没接话。有人围上来看，有人转身回屋。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-88; reputation 0.030000000000000027; skill_

- **1955.08** `major-crisis.rent-increase/tenant-meeting` tags: crisis, housing, rent, eviction, family, poverty
  巷口洗衣房的老板娘把几张椅子摆开，叫来半条街的租户。Grete Kral把涨租单摊在桌上，逐条念出上面的数字；Anna Weiss 2站在门边，既没走，也没替房东说话。大家决定先集体迟交一个月，签名纸传到Grete Kral手里时，纸上已经有一块油渍。
  _effects: cash -2 (paper, ink and tram fare for the tenants meeting); role; flag +rent_strike; relation acquaintance with person-materialized-world-vienna-1912-156; reputation 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-156_

- **1955.11** `state_reaction:ad20-public-attention/a-scandal-sticks` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  旧闻被重新排上版面，标题比上次短，意思却更重。Grete Kral没有买那份报纸，但整条街都知道了标题。
  _effects: state_parameter ad20-public-attention.attention 40 -> 50; state_parameter ad20-public-attention.danger 10 -> 18; state_parameter ad20-public-attention.sympathy 45 -> 40; mood -0.030000000000000027_
  _causes: evt:world-vienna-1912:016991_

- **1956.01** `project_progressed` tags: project
  「Grete Kral召集的会议」继续推进了一阶段。
  _effects: project_

- **1956.01** `vienna-tenement-neighbors.laundry_line_dispute/compromise_split_line` tags: home, social, family, housing
  Grete Kral把洗好的床单搭上院子里的公用晾衣绳，占了整条。Hermann Kral 2抱着一盆湿衣服下来，说自家孩子明天要穿干净衬衫上学。两人在绳子两头扯了一阵，最后Grete Kral把床单对折，腾出一半，Hermann Kral 2用木夹子把衬衫一件件排上去。谁也没道歉，但第二天见面都点了头。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-81; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:016370_

- **1956.01** `state_reaction:public-scandal/gossip` tags: public-scandal, scandal, reputation, social, state, state_reaction, home, family
  Grete Kral走进咖啡馆时，邻桌的声音低了一拍。没有人当面说什么，但每个人都知道该说什么。
  _effects: mood -0.030000000000000027; reputation -0.030000000000000027_
  _causes: evt:world-vienna-1912:016806_

- **1956.01** `p22-dead-voice-child::ctx-vienna-postwar-1945::milieu-tenement/the-neighbor-calls-it-a-seance` tags: child, dead_relative, voice, eerie, dark, grief, family_secret, scandal
  Emil Lechner把这件事传遍了整条街，说Grete Kral家请了招魂师。区里的人上门问话，孩子却躲在桌子底下不肯出来；Grete Kral在门口解释了半天，最后只说了一句“她只是想奶奶了”。第二天，窗台上被人放了一小袋盐和一张驱邪的纸条。他把盐袋放在窗台，孩子从桌下伸出手把它推开了。
  _effects: state_add public-scandal state:world-vienna-1912:1424; state_add p22-scandal-engine state:world-vienna-1912:1425; relation rival with person:evt:world-vienna-1912:000849:child; relation kin with person:evt:world-vienna-1912:009568:child; reputation -0.030000000000000027; flag +seance_rumour; mood -0.030000000000000027; flag -scandal_engine_active; flag +scandal_engine_active_

- **1956.01** `state_expire:oj18-odd-apprenticeship` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  Grete Kral的「奇职学徒」到期；相关安排结束。
  _effects: state_remove oj18-odd-apprenticeship state:world-vienna-1912:1317_

- **1956.01** `state_tick:ad20-public-attention/the-attention-cycle/cools` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  Grete Kral发现最近没有人再提那件事。报纸换了头版，邻居也换了话题；本该轻松，Grete Kral却在买菜时反复整理衣领，好像还在等一个不会来的目光。
  _effects: state_parameter ad20-public-attention.attention 50 -> 42; state_parameter ad20-public-attention.sympathy 40 -> 37; state_parameter ad20-public-attention.opportunity 50 -> 48; mood -0.010000000000000009_

- **1956.01** `state_tick:chronic-illness/body-year/stable` tags: chronic-illness, health, illness, body, state, state_tick
  Grete Kral又撑过了一年。病没有走，但也没有立刻把人带走。
  _effects: state_parameter chronic-illness.years 4 -> 5_

- **1956.01** `kernel-health.task-house-call::ctx-vienna-postwar-1945::milieu-tenement::house-call-medical-students/house-call-medical-teaching` tags: health, task, house_call, care, poverty, vienna, urban, postwar
  医院派来一名实习医生，身后跟着两个学生。他们把Grete Kral的胸口听了个遍，最后请来上级；药费减半，但Grete Kral被当成了讲课的病例。学生们走后，实习医生把听诊器在手里捂了很久，才敢再贴上来。
  _effects: cash -4 (reduced fee for a teaching-house call); health 0.030000000000000027 (examined by a teaching team); knowledge “教学出诊会有实习医生和学生轮流听诊，最后请上级定方案，药费可以减半。”_

- **1956.03** `pc20-scandal.apology-letter::ctx-vienna-postwar-1945::milieu-tenement/apology-refused` tags: scandal, apology, newspaper, reputation, public_reversal, second_chance, editor, vienna
  Anna Winter在报社门口把报纸还给Grete Kral，说有些话一旦说出口，登在哪一版都太晚。Mitzi Moser 2站在两人中间，最后只把稿费退给Grete Kral；街上的人看见这一幕，第二天又有了新的说法。
  _effects: state_add pc20-public-reversal state:world-vienna-1912:1492; state_add pc20-second-chance state:world-vienna-1912:1493; relation rival with person:evt:world-vienna-1912:002990:child; reputation -0.03999999999999998; flag +public_apology_refused; knowledge “有些话一旦说出口，登在哪一版都太晚。”; relation acquaintance with person-materialized-world-vienna-1912-171; flag +public_reversal_active; flag +second_chance_open_

- **1956.03** `state_reaction:pc20-public-reversal/press-returns` tags: pc20-public-reversal, public_reversal, exoneration, accusation, testimony, proof, pressure, support
  记者又来了，这次带着上一回的剪报。Grete Kral看见自己的话被排成另一种语气，旁边还加了“据称”两个字；记者说只补一句背景，问完就走，却在门口把录音机又按了一次。
  _effects: state_parameter pc20-public-reversal.pressure 60 -> 67; state_parameter pc20-public-reversal.danger 50 -> 54_
  _causes: evt:world-vienna-1912:017497_

- **1956.04** `state_reaction:p22-scandal-engine/a-public-apology-cools-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Grete Kral在报纸上登了道歉，流言却没有立刻停。第二天，有人在门口放了一束花，也有人把花拿走了；Grete Kral把空花瓶留在窗台上，没有扔。
  _effects: state_parameter p22-scandal-engine.heat 61 -> 53; state_parameter p22-scandal-engine.reach 49 -> 46; state_parameter p22-scandal-engine.shame 58 -> 54; state_parameter p22-scandal-engine.leverage 22 -> 27; mood 0.010000000000000009_
  _causes: evt:world-vienna-1912:017522_

- **1956.06** `curse15-betrayal.ledger-share::ctx-vienna-postwar-1945::milieu-tenement/the-witness-stays-quiet` tags: betrayal, money, family, trust, curse, secret, vienna, urban
  Mitzi在办事处说了Grete Kral一整个下午的坏话，从欠债说到那场没人看见的火灾。旁边的人没有替Grete Kral说一句话。几天后，Grete Kral发现自己的名字从互助会的名单上被划掉了，Mitzi只说“我也要养家”。
  _effects: reputation -0.08000000000000002; relation rival with person-phase15-Mitzi-world-vienna-1912; cash -1 (互助会停止发放的补贴); condition; flag +reputation_damaged_by_betrayal_

- **1956.07** `p9-social-tenement-neighbors.stairwell-rumor/stairwell-rumor.ask-straight` tags: housing, neighbors, tenement, daily, money, reputation
  Grete Kral在楼梯间拦住Luise Lechner，问那句话是从哪儿听来的，又趁送活的人上门时当面看清是谁。原来是对面作坊的裁缝来取改好的裤子。Luise Lechner听完把话咽回去，第二天洗衣房里没人再提。
  _effects: reputation 0.03999999999999998_

- **1957.01** `project_completed` tags: project
  「Grete Kral召集的会议」完成了当前阶段，参与者留下了实际的记录和后续安排。
  _effects: project_

- **1957.01** `office16-scandal.public-hearing::ctx-vienna-postwar-1945::milieu-tenement/resigned` tags: office, scandal, media, reputation, politics, power, vienna, urban
  Mitzi Winter在门口堵了三天，第四天把Grete Kral的辞职信全文登了出来。信只有四行，最后一行是“为避免机构继续为我的判断付出代价”。Grete Kral把办公室的钥匙交给Ferdinand Lechner，没有带走任何文件。
  _effects: position_end 发起人 @counter-monument:person-materialized-world-vienna-1912-17-evt:world-vienna-1912:010094; reputation -0.08000000000000002; mood -0.039999999999999925; condition; flag +resigned_over_scandal; knowledge “辞职信被全文刊登，接任者当天就搬进了办公室。”; relation acquaintance with person-materialized-world-vienna-1912-103; relation acquaintance with person-materialized-world-vienna-1912-128_

- **1957.01** `state_reaction:p22-scandal-engine/a-new-scandal-feeds-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Grete Kral的新故事登出来时，旧的那一页也被重新翻到桌面上。Grete Kral发现两件事共用同一个证人，而那个证人上周还来借过盐。
  _effects: state_parameter p22-scandal-engine.heat 55 -> 61; state_parameter p22-scandal-engine.reach 45 -> 49; state_parameter p22-scandal-engine.shame 55 -> 58; state_parameter p22-scandal-engine.leverage 20 -> 22_
  _causes: evt:world-vienna-1912:017494_

- **1957.01** `state_reaction:ad20-public-attention/a-scandal-sticks` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  旧闻被重新排上版面，标题比上次短，意思却更重。Grete Kral没有买那份报纸，但整条街都知道了标题。
  _effects: state_parameter ad20-public-attention.attention 42 -> 52; state_parameter ad20-public-attention.danger 18 -> 26; state_parameter ad20-public-attention.sympathy 37 -> 32_
  _causes: evt:world-vienna-1912:017494_

- **1957.01** `state_tick:p22-scandal-engine/the-rumor-learns-new-words/the-story-gets-a-new-witness` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  又过了一年，流言没有熄，却学会了新的说法。Grete Kral在咖啡馆里听见自己的故事被讲成三个版本，每个版本都比上一个多一个证人；没有人来追问，也没有人真正忘记。
  _effects: state_parameter p22-scandal-engine.heat 53 -> 50; state_parameter p22-scandal-engine.reach 46 -> 50; state_parameter p22-scandal-engine.leverage 27 -> 30; state_parameter p22-scandal-engine.shame 54 -> 56; mood 0.010000000000000009_

- **1957.01** `state_tick:ad20-public-attention/the-attention-cycle/warms` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  Grete Kral在街角被人认出来，对方没有要求什么，只说“上次那件事做得不错”。这句客气话被旁边的人听见，下午便有两个陌生人朝Grete Kral点头。关注没有减少，但空气松了一点。
  _effects: state_parameter ad20-public-attention.attention 52 -> 48; state_parameter ad20-public-attention.sympathy 32 -> 38; state_parameter ad20-public-attention.opportunity 48 -> 52; mood 0.020000000000000018_

- **1957.01** `state_tick:pc20-public-reversal/file-moves/a-copy-survives` tags: pc20-public-reversal, public_reversal, exoneration, accusation, testimony, proof, pressure, support
  书记员把一份抄件从抽屉底下抽出来，说原件已经调走，但这一份还在。Grete Kral看见纸上自己的名字被红笔圈过，旁边有一行小字：此页曾由第三人核对。
  _effects: state_parameter pc20-public-reversal.proof 30 -> 37; state_parameter pc20-public-reversal.pressure 67 -> 71; state_parameter pc20-public-reversal.danger 54 -> 51; knowledge “档案里还有一份抄件，曾经由第三人核对过。”_

- **1957.01** `state_tick:pc20-second-chance/kept-word/small-relapse` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  Grete Kral晚了半个钟头，进门时先解释路上的电车，又解释口袋里的收据。对方没有追问，只把已经凉掉的汤端回厨房；Grete Kral听见锅盖碰在灶台上，知道这次不是天气的问题。
  _effects: state_parameter pc20-second-chance.credibility 30 -> 23; state_parameter pc20-second-chance.suspicion 60 -> 68; state_parameter pc20-second-chance.debt 45 -> 48; mood -0.030000000000000027_

- **1957.01** `state_expire:chronic-illness` tags: chronic-illness, health, illness, body, state, state_tick, state:chronic-illness
  Grete Kral的「慢性病」到期；相关安排结束。
  _effects: state_remove chronic-illness state:world-vienna-1912:946_

- **1957.01** `r13-fam.visit-grave::ctx-vienna-postwar-1945::milieu-tenement/wrong-grave` tags: task, family, grave, mourning, neighbor, grief, vienna, urban
  两人在坟场里绕了半个钟头，才找到那块刻着名字的石头。Berta Huber 2忽然说不是这一块，自己记得旁边有一棵小槐树。Grete Kral陪她一排排找，天快黑时，守墓人过来说小槐树去年就砍了；Berta Huber 2站在空地上，把花放在了脚边。
  _effects: mood -0.010000000000000009; condition; flag +could_not_find_the_grave; relation friend with person-materialized-world-vienna-1912-56; knowledge “the old tree by the grave was cut down last year”_