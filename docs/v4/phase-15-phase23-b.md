# Phase 15 life dossier — phase23-b

Date: 2026-11-11T19:18:13.722Z  |  45 years  |  17215 events  |  292 named persons  |  153 alive  |  68 s

State facts: 4007 events, 2215 ticks, 916 reactions, 18 transitions. Active 125, ended 1141. Positions 92.

Critique: **pass** — warn:high_repetition.

## Klara

Born 1912.01, died 1946.01 (age 34).
Education: none 0; occupation: none; roles: infant, child, job_seeker, partner, separated, office:临时主席, budget_keeper, grave_visitor, registered_resident, movement_member, reconciled_relative, office:太平间杂役, paid_in_food, office:夜校同学会会长, pawned_for_friend, shelterer, liberated_1945, host.

### State snapshot
- wish-power [person] (ended 1946.1: owner_died) parameters={"intensity":0.75,"fixation":0.66,"irony":0.3} links={} ticks=1
- p22-family-legend [person] (ended 1918.1: duration expired) parameters={"warmth":72,"secrecy":17,"danger":16,"promise":40} links={} ticks=3
- stage-sovereign [person] (ended 1936.1: duration expired) parameters={"production":"市庆游行","role":"节日国王","publicBelief":25,"costumeQuality":55,"scandal":0,"performances":0} links={} ticks=1
- ad20-public-attention [person] (ended 1939.1: duration expired) parameters={"attention":47,"sympathy":37,"danger":31,"opportunity":43} links={} ticks=5
- p23-dangerous-secret [person] (ended 1939.1: duration expired) parameters={"exposure":16,"leverage":20,"bodies":0,"loyalty":58} links={} ticks=2
- df18-borrowed-luck [person] (ended 1938.1: duration expired) parameters={"luck":18,"debt":18,"creditorKnown":false,"price":"name"} links={} ticks=3
- under-investigation [person] (ended 1940.1: duration expired) parameters={"progress":30,"charge":"滥用职权"} links={} ticks=2
- cj17-wanted [person] (ended 1939.1: duration expired) parameters={"heat":18,"cover":9,"price":4,"pursuer":"police","alias":"witness buyer"} links={} ticks=2
- stage-king [person] (ended 1942.1: duration expired) parameters={"role":"被误认的部长","audience":12} links={} ticks=1
- oj18-odd-apprenticeship [person] (ended 1944.1: duration expired) parameters={"trust":1,"strangeKnowledge":38,"reliability":40,"nightsWorked":0,"post":"太平间杂役"} links={} ticks=2
- curse-bargain [person] (ended 1944.1: duration expired) parameters={"request":"借一个位置","price":1,"doubt":30,"sealed":true} links={} ticks=1
- ld18-public-desire [person] (ended 1946.1: owner_died) parameters={"spectacle":69,"rumorHeat":50,"defiance":40,"protection":10,"shame":14} links={} ticks=3

### 168 subject events

- **1912.06** `p22-comic-name-register::ctx-vienna-1912::milieu-tenement/the-name-is-corrected` tags: infancy, family, bureaucracy, name, official, comic, tender, drama
  Katharina Bauer当场发现，要求改回来。登记员叹了口气，收了三克朗，把“嚏”划掉，在旁边写上正确的字，然后把笔搁下；Klara全程睡着，什么也没损失，只是那张纸被折成了四折。
  _effects: cash -3 (fee to correct the register); mood 0.020000000000000004; flag +name_corrected_

- **1912.06** `p22-comic-christening::ctx-vienna-1912::milieu-tenement/the-priest-sneezes` tags: infancy, family, christening, church, neighbor, comic, tender, drama
  神父念到孩子的名字时打了个大喷嚏，蜡烛灭了，Klara却笑出了声。Emil Weiss赶紧去点蜡烛，手一抖，火苗又灭了；教堂里第一次有人笑，神父也笑了，说这是今天最响的一声阿门。
  _effects: mood 0.039999999999999994; relation acquaintance with person-phase15-Klara-world-vienna-1912; flag +christening_sneeze; state_add p22-family-legend state:world-vienna-1912:21_

- **1912.06** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Klara家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 10 -> 14; state_parameter p22-family-legend.warmth 70 -> 72; mood 0.01_
  _causes: evt:world-vienna-1912:000109_

- **1912.06** `r1-child.wet-nurse-weaning::ctx-vienna-1912::milieu-tenement/brought-home-unweaned` tags: infancy, wet_nurse, nutrition, poverty, care, vienna, urban, peace
  三个月后Klara被接回来，已经不肯含Katharina Bauer的乳头，只认外婆的铜勺。Katharina Bauer把炼乳罐刮了又刮，最后去药房买了半瓶鱼肝油。Friedrich Hofer说合同还能续，Katharina Bauer看着Klara的细腿，第一次没有立刻答话。
  _effects: health -0.05999999999999994 (奶水先给别人); condition; flag +difficult_weaning; relation kin with person-katharina-bauer; knowledge “the foundling is thriving better than her own child”_

- **1913.01** `vienna-life-infant-first-smile/colic-night` tags: infancy, family, first, warm, injury
  夜里Klara哭了很久，Katharina Bauer抱着孩子在屋里来回走，数着地板缝。天快亮时孩子终于打了个嗝，安静下来；Katharina Bauer坐在床沿，发现自己还保持着走路的姿势。
  _effects: mood -0.03; health -0.010000000000000009 (lost sleep)_

- **1913.01** `state_tick:p22-family-legend/the-story-changes-hands/a-detail-goes-missing` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，故事里最要紧的那件东西不见了：先是名字，后来是地点。Klara问起时，大人说“你记错了”；可柜子最底层那只空盒子，谁也没有扔，锁却换过了，钥匙也不见了。
  _effects: state_parameter p22-family-legend.secrecy 14 -> 18; state_parameter p22-family-legend.danger 5 -> 8; state_parameter p22-family-legend.warmth 72 -> 70; mood -0.01_

- **1913.03** `iw18-infancy.ceiling-shadows::ctx-vienna-1912::milieu-tenement/the-coat-is-just-a-coat` tags: infancy, night, wonder, gaslight, fear, family, vienna, urban
  Katharina Bauer把Klara抱起来，走到衣钩下面，让孩子伸手去抓那件旧大衣。粗呢的袖口擦过掌心，Klara先愣住，随后皱着鼻子哭了一声。Katharina Bauer笑着把大衣掀开，说“看，只有衣服”，灯影也跟着晃了一下。
  _effects: mood 0.03; flag +learned_the_coat_rack_

- **1914.01** `statistical_infection`
  Klara在Bauer-Wohnung, Leopoldstadt病倒了，痢疾让身体发热、虚弱，接下来的日子只能卧床。

- **1914.01** `vienna-life-toddler-wrong-cradle/the-blanket-is-wrong` tags: infancy, family, rumour, identity, comic, drama
  Emil Weiss盯着Klara的摇篮看了很久，说这床蓝被子不是这家人的。Katharina Bauer把被子翻过来，角落绣着一个陌生的姓；Klara却抓着被角不放，像是认得它。Emil Weiss退后一步，说“我什么都没说”。
  _effects: flag +wrong_cradle_blanket; knowledge “摇篮里的蓝被子绣着一个陌生的姓。”; mood -0.03_

- **1914.03** `statistical_illness_worsened`
  Klara的痢疾没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1914.06** `statistical_illness_worsened`
  Klara的痢疾没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1914.07** `statistical_recovery`
  Klara熬过了这场痢疾，能坐起来喝一点汤，但身体还很虚。

- **1914.10** `statistical_infection`
  Klara在Bauer-Wohnung, Leopoldstadt病倒了，痢疾让身体发热、虚弱，接下来的日子只能卧床。

- **1914.12** `statistical_illness_worsened`
  Klara的痢疾没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1915.01** `vienna-life-child-family-legend/stolen-inheritance` tags: childhood, family, secret, story
  Katharina Bauer说，家里本来有一件东西，后来被“更会说话的人”拿走了。Klara问是什么，Katharina Bauer只说是一块表，表盖里刻着姓。孩子记住了“表盖里刻着姓”，却没有记住那个姓。
  _effects: knowledge “家里有一块表盖里刻着姓的表，被一个更会说话的人拿走了。”; flag +family_legend_watch_

- **1915.01** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Klara家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 18 -> 22; state_parameter p22-family-legend.warmth 70 -> 72; mood 0.01_
  _causes: evt:world-vienna-1912:000435_

- **1915.02** `vienna-early-childhood.stairwell-fall/arm-bruise` tags: childhood, family, home, street, injury
  楼梯间的灯罩空着，第三级踏板比别处高。Klara一脚踩空，滚到平台，右小臂磕在铁扶手的弯头上。Katharina Bauer听见哭声跑出来，把Klara抱回屋，用冷水毛巾敷那块青紫，再用旧布条缠了两圈。夜里Klara哭醒两次。
  _effects: health -0.040000000000000036 (从楼梯滚下，小臂挫伤); mood -0.05_

- **1915.03** `statistical_illness_worsened`
  Klara的痢疾没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1915.04** `statistical_recovery`
  Klara熬过了这场痢疾，能坐起来喝一点汤，但身体还很虚。

- **1916.01** `vienna-life-child-first-friend/shared-toy` tags: childhood, friendship, family, comic
  Josef在楼道里滚一只铁环，Klara站在门口看。Josef把铁环推过来，说“你推一次，我推一次”。两个人从楼梯口推到院子里，铁环倒下的声音把午睡的大人吵醒了一排。
  _effects: skill; mood 0.05_

- **1916.01** `state_tick:p22-family-legend/the-story-changes-hands/the-wrong-person-hears` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，Klara在门口把故事讲给一个收旧瓶的人听。第二天，整条楼道都在传另一个版本；家里把窗关上，把声音压得更低，故事从此有了第二个名字。
  _effects: state_parameter p22-family-legend.secrecy 22 -> 17; state_parameter p22-family-legend.danger 8 -> 16; flag +legend_leaked; mood -0.019999999999999997_

- **1918.01** `state_expire:p22-family-legend` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  Klara的「家族传说」到期；相关安排结束。
  _effects: state_remove p22-family-legend state:world-vienna-1912:21_

- **1918.01** `p9-gap-childhood-chores.market-line/line-sold-out-potatoes` tags: childhood, household, chores, school, task, daily, market, food
  “卖完了。”三个字从窗口里传出来，Klara后面的队伍立刻散了一半。Klara没走，趴在窗台上看伙计扫面屑，直到人家挥手赶人。旁边摊子的土豆带着泥，Klara用围裙兜住，一枚一枚数铜板，回家报账时连找零都说清了。
  _effects: food; mood -0.03; skill; relation acquaintance with person-materialized-world-vienna-1912-15_

- **1919.01** `p9-gap-childhood-chores.laundry-help/laundry-dragged-docked-pay` tags: childhood, household, chores, school, task, daily, laundry, work
  床单太长，Klara拖着一角往绳子走，布边扫过煤渣，立刻黑了一道。Anna Moser弯腰看了看，脸沉下来，说这角得重洗，工钱扣一半。Klara接过一赫勒，蹲在盆边用清水搓那一道灰，搓到指节发红，水面上还浮着煤末。
  _effects: cash 0.01 (被扣后只剩一赫勒); mood -0.05; relation acquaintance with person-anna-moser; relation acquaintance with person-materialized-world-vienna-1912-20_

- **1920.01** `p9-gap-childhood-chores.market-line/line-sold-out-potatoes` tags: childhood, household, chores, school, task, daily, market, food
  木窗“咔”地合上，Klara的布袋还敞着口。伙计隔着板缝说下星期再来。Klara在墙根站了一会儿，把硬币排在掌心数了两遍，走到旁边土豆摊前，挑了几个小的，让摊主当面过秤。家里人晚上把钱和土豆倒在桌上，重新数了一遍。
  _effects: food; mood -0.03; skill_

- **1921.01** `p9-gap-childhood-chores.laundry-help/laundry-bread-with-friend` tags: childhood, household, chores, school, task, daily, laundry, work
  Anna Moser家的孩子站在绳子另一头，Klara递夹子时故意慢半拍，两个人把床单拉得没有一道褶。收工后Anna Moser端出半包隔夜面包，掰开时掉了一桌屑。Klara把分到的那块用围裙兜住，回家路上闻着麦味，硬是没咬。
  _effects: food; relation acquaintance with person-anna-moser; skill; relation acquaintance with person-materialized-world-vienna-1912-21_

- **1922.01** `p9-gap-childhood-chores.market-line/line-both-families` tags: childhood, household, chores, school, task, daily, market, food
  Anna Moser把Klara拽到队伍前头，往自己身前塞，说“孩子占不了多大地儿”。窗口一次递出两包面包，Klara把邻居那包夹在胳肢窝，自己这包抱在胸前。到Bauer-Wohnung, Leopoldstadt门口，Klara蹲下把两包并排，按Anna Moser说的份量分开，连找零的铜板也分成两小堆。
  _effects: food; relation acquaintance with person-anna-moser; skill_

- **1923.01** `p9-gap-childhood-chores.laundry-help/laundry-dragged-docked-pay` tags: childhood, household, chores, school, task, daily, laundry, work
  “你看看这角。”Emil Huber把床单拎起来，煤渣簌簌往下掉。Klara伸手去拍，反而把灰按进布纹里。Emil Huber从工钱里数回两枚，只留一赫勒在Klara手心，让重洗那角。晚饭前Klara一直蹲在井台边，换了两盆水，指甲缝里全是黑泥。
  _effects: cash 0.01 (被扣后只剩一赫勒); mood -0.05; relation acquaintance with person-materialized-world-vienna-1912-18; relation acquaintance with person-materialized-world-vienna-1912-18_

- **1924.01** `p9-childhood-apprenticeship.ask-for-trial/too-young-refused` tags: adolescence, work, apprenticeship, labour, training, family, task, task:work
  “开春再来。”Gustav Berg说完就转身去接纸车。Klara站在门槛外，把这句话在心里复述了一遍，弯腰捡起地上的纸边。两个赫勒落在掌心时还带着围裙的体温。回家那条街上有三家亮着灯的作坊，Klara一家一家看过去，把位置记住。
  _effects: cash 0.2 (替作坊捡纸边得到的两个赫勒); mood -0.04000000000000001; flag +seeking_work_

- **1924.02** `vienna-adolescence.stolen-roll/caught-and-returned` tags: adolescence, school, work, family, social
  Klara的手刚碰到面包皮，身后就有人清了清嗓子。Anna Moser站在晾衣绳下，手里还捏着夹子，什么也没问，只把手伸过来。Klara把面包放回筐里，手背挨了两下，面包筐的盖子被Anna Moser合上，发出一声闷响。
  _effects: reputation -0.06; relation acquaintance with person-anna-moser; mood -0.1_

- **1925.01** `task-vienna-youth-apprenticeship-search/trial-promised` tags: task, task:work, work, adolescence, apprenticeship
  Klara在印刷厂门口等到工头出来，把姓名、住址和会写的字报了一遍。Anton Kral让他下周一早来试半天，先不给工钱，只管一顿午饭。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-7; flag +apprenticeship_trial_promised; mood 0.04999999999999999; relation acquaintance with person-materialized-world-vienna-1912-7_

- **1926.01** `task-vienna-poor-apprentice.foreman-introduction/foreman-records-name` tags: adolescence, apprentice, work, education, poverty, printshop, task, task:work
  工头说暂时没有空缺，但答应把他的名字记在招工簿上。亲戚在旁边补了两句好话，工头只点点头；他走出来时，招工簿还摊在门房的木台上。
  _effects: flag +name_in_hiring_book; relation acquaintance with person-materialized-world-vienna-1912-33; mood -0.01999999999999999; relation acquaintance with person-materialized-world-vienna-1912-33_

- **1927.01** `task-vienna-youth-apprenticeship-search/trial-promised` tags: task, task:work, work, adolescence, apprenticeship
  Klara在印刷厂门口等到工头出来，把姓名、住址和会写的字报了一遍。Alois Moser让他下周一早来试半天，先不给工钱，只管一顿午饭。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-13; mood 0.05000000000000002; relation acquaintance with person-materialized-world-vienna-1912-13_

- **1927.12** `vienna-adolescence.stolen-roll/caught-and-returned` tags: adolescence, school, work, family, social
  面包房后门的筐里堆着隔夜面包。Klara拿起半个黑面包，刚要往怀里塞，Emil Weiss从晾衣绳后面绕出来，手一伸，掌心朝上。Klara把面包放回去，Emil Weiss用指节在Klara手背上敲了两下，声音不大，巷口的人都听见了。
  _effects: reputation -0.06; relation acquaintance with person-emil-weiss; mood -0.10000000000000003_

- **1928.01** `task-vienna-poor-apprentice.foreman-introduction/foreman-records-name` tags: adolescence, apprentice, work, education, poverty, printshop, task, task:work
  工头说暂时没有空缺，但答应把他的名字记在招工簿上。亲戚在旁边补了两句好话，工头只点点头；他走出来时，招工簿还摊在门房的木台上。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-25; mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-25_

- **1929.01** `p9-childhood-youth-aspiration.save-for-books/bought-used-book` tags: adolescence, education, aspiration, school, books, club, exam, task
  书摊上那本《机械制图》被压在一摞旧画报下面，Klara抽出来时抖落一层灰。Josef Moser把书翻到缺角那页，说三克朗拿走，他数出最后几枚赫勒，硬币在木板上叮当响。
  _effects: cash -3 (旧书摊买《机械制图》（其中3克朗记入债务）); skill; mood 0.04999999999999999; relation acquaintance with person-materialized-world-vienna-1912-10; relation acquaintance with person-materialized-world-vienna-1912-10_

- **1930.01** `major-work-first-employment/turned-away` tags: work, employment, unemployment, major
  Buchdruckerei Winter & Söhne的工头翻完工票，问Klara上一个东家是谁。Klara说厂子关了，工头又问有没有辞工证明；没有证明，名册就不能写。后面的人挤上来，Klara被推到台阶下面。中午的钟响了，Klara站在街对面，看新来的人把名字一个个写上去。
  _effects: cash -2 (carfare and waiting（其中2克朗记入债务）); reputation -0.03; flag +no_work_references; role; mood -0.07; relation acquaintance with person-materialized-world-vienna-1912-38; relation acquaintance with person-materialized-world-vienna-1912-38_

- **1930.01** `vienna-family-courtship/ask-to-share-a-home` tags: family, courtship, household, social, lifecycle
  Klara在Bauer-Wohnung, Leopoldstadt靠窗的桌边，把一只空咖啡杯转了半圈，说房租两人合付、桌子两人共用。Friedrich Kral 4的手停在糖罐盖上，问了一句“要是过不下去呢”，没有当场答应，只说要想一想；杯里的咖啡凉了，话还悬在桌面上。
  _effects: interaction; relation acquaintance with person-materialized-world-vienna-1912-59_

- **1930.01** `major-task.marriage-proposal/proposal-refused` tags: task, task:family, family, marriage, courtship, household
  Friedrich Bauer把戒指推回来，说自己的工钱还要寄给乡下的母亲，不能现在就成家。两人在长椅上坐到天黑，最后一起走到电车站；第二天在楼道里碰见，彼此都客气了许多。Klara把戒指重新包进手帕，放回抽屉。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-39; flag +marriage_proposal_refused; cash -2 (tram fare and coffee at the riverside（其中2克朗记入债务）); knowledge “对方的工钱要寄回乡下，短期内不能成家。”; relation acquaintance with person-materialized-world-vienna-1912-39_

- **1930.02** `vienna-market-debt.coal-credit/coal-credit-full` tags: market, debt, money, home, shop
  邻居帮你把半筐煤抬上楼，楼梯窄，煤块滚了两级。你蹲下去捡，指甲缝里立刻嵌了黑泥。炉子生起来后，屋里那股潮冷气慢慢退了，你才想起晚饭还没着落。
  _effects: cash -1.5 (赊煤到期还款含利息（其中1.5克朗记入债务）); food; flag +coal_credit_debt_

- **1930.02** `p9-gap-adult-unemployed.soup-kitchen/soup-pot-empty` tags: adulthood, unemployment, casual_labour, poverty, daily, relief, food, church
  锅底刮出焦味，Anton Kral说今天就这些了，明天赶早。Klara把空罐子夹在腋下往回走，石板路上结了薄冰，Franz Berg在拐角等着，二话没说把罐子递过来。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-57; relation acquaintance with person-materialized-world-vienna-1912-57_

- **1931.01** `interaction_response` tags: interaction, partnership, household
  Friedrich Kral 4在几天后找到Klara，说可以试试。两人开始合付房租，也把各自欠的账摊在桌上。
  _effects: relation partner with person-materialized-world-vienna-1912-59; household; role; interaction_
  _causes: evt:world-vienna-1912:003532_

- **1931.01** `vienna-family-childbirth/difficult-birth` tags: family, childbirth, death, lifecycle, birth, injury, state, state:raising-child
  Klara难产，接生的人守了两天。孩子最后生下来，取名Elisabeth 4；Klara一直发烧，医院又收走二十克朗，Friedrich Kral 4把钟表送进当铺。Klara落下产后虚弱的毛病，抱孩子时手臂发抖，站久了眼前就发黑。
  _effects: birth female; health -0.21999999999999997 (difficult childbirth); condition; cash -20 (midwife and hospital); state_add raising-child state:world-vienna-1912:105_

- **1931.01** `p9-social-daily-culture.singing-club/p9-social-daily-culture.singing-club.join-second-row` tags: daily, culture, leisure, cafe, music, walk, task, task:social
  Klara把两克朗月费和徽章钱一起放在啤酒渍斑斑的桌上，Emil Weiss在名册上添了一行。钢琴缺的那个音在排练中途又卡住，Klara站在第二排跟着哼，声音被两边的人盖住，胸腔里却震得发麻；散场时能把副歌完整唱下来，也记住了怎么在人群里找准自己的声部。
  _effects: cash -2 (合唱团月费和铜徽章钱); mood 0.07; relation friend with person-emil-weiss; skill_

- **1931.03** `statistical_infection`
  Klara在Leopoldstädter Zinshaus, gemeinsamer Gang病倒了，肺炎让身体发热、虚弱，接下来的日子只能卧床。

- **1931.04** `vienna-family-same-sex-female/private-household` tags: family, intimacy, same_sex, housing, lifecycle, partnership, household
  门闩是Elisabeth Bauer 2新换的，推上去有点涩。Klara把两只杯子并排放在窗台，房东在楼下喊了一声，两人同时停住，听见脚步声走远才继续说话。
  _effects: relation partner with person-materialized-world-vienna-1912-17; household; mood 0.06_

- **1931.05** `vienna-tenement-neighbors.laundry_line_dispute/compromise_split_line` tags: home, social, family, housing
  Klara把洗好的床单搭上院子里的公用晾衣绳，占了整条。Lena抱着一盆湿衣服下来，说自家孩子明天要穿干净衬衫上学。两人在绳子两头扯了一阵，最后Klara把床单对折，腾出一半，Lena用木夹子把衬衫一件件排上去。谁也没道歉，但第二天见面都点了头。
  _effects: relation acquaintance with person-phase15-Lena-world-vienna-1912; mood 0.020000000000000018_

- **1931.06** `statistical_illness_worsened`
  Klara的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1931.08** `vienna-women-housework.wash-day/wash-day.send-out` tags: gender, housework, home, labour, family
  洗衣妇把工服从报纸里抖出来，翻开领口看了看油垢，点头收下。Klara转身回屋，铜板在围裙口袋里磕出轻响。Elisabeth Bauer还在楼梯上嘟囔，说这钱不如买半斤猪油。
  _effects: cash -0.5 (请洗衣妇代洗工服（其中0.5克朗记入债务）); mood 0.03; relation acquaintance with person-elisabeth-bauer_

- **1931.09** `statistical_recovery`
  Klara熬过了这场肺炎，能坐起来喝一点汤，但身体还很虚。

- **1932.01** `vienna-life-injury-recovery/clinic-treatment` tags: health, work, family
  Klara在受伤后的第三天去了诊所。医生清洗伤口、换药，收下诊费，嘱咐不要急着回机器旁。Klara把药方折好，回家路上买了纱布。
  _effects: health 0.050000000000000044 (wound treatment); cash -8 (clinic and bandages); condition_
  _causes: evt:world-vienna-1912:003823_

- **1932.01** `vienna-family-divorce/partner-moves-to-shared-housing` tags: family, marriage, divorce, housing, lifecycle, separation, household
  Otto Winter把一只箱子和工票搬去合租房，带走一半锅碗。Klara留在Leopoldstädter Zinshaus, gemeinsamer Gang，把空出来的床租给一个学徒，用租金补房租；搬家花掉四克朗，Klara在户籍上成了分居的人，夜里听见隔壁床板响，总要愣一下。
  _effects: relation_end partner with person-otto-winter; household; cash -4 (moving and separate goods（其中4克朗记入债务）); mood -0.06; role_

- **1932.01** `state_tick:wish-power/power-opportunity/nothing` tags: wish-power, wish, wish:power, power, status, ambition, state, state_tick
  Klara又等了一年。名单上没有名字，门也没有开。Klara把那份写好的计划折起来，放回抽屉。
  _effects: mood -0.04000000000000001_

- **1932.01** `p9-work-jobsearch.ask-trial/ask-trial.deposit-refused` tags: work, job_search, negotiation, wages, employment, task, trial, factory
  “十克朗押金，先交后干。”Rosa Huber说得很平。Klara把两只口袋翻给人家看，柜台上只落下一张皱车票。工头收回话头，他也不再问，提着帽子走出栅栏。
  _effects: mood -0.04999999999999999; reputation -0.010000000000000009; relation acquaintance with person-materialized-world-vienna-1912-79_

- **1932.02** `vienna-tenement-neighbors.shared_stove_fire/fire_scald_hand` tags: home, social, family, housing, injury
  Klara在合租房走廊的公用灶台上煮土豆，转身取盐时袖子扫翻了铁锅，滚水浇在左手背上。Friedrich Kral 3从隔壁冲出来，扯下自己的围裙裹住烫伤处，又跑下楼叫来住在二楼的接生婆。接生婆用蛋清和旧亚麻布包扎，嘱咐三天不能沾水。
  _effects: health -0.04999999999999999 (左手背烫伤); relation friend with person-materialized-world-vienna-1912-40; relation acquaintance with person-materialized-world-vienna-1912-40_

- **1932.02** `vienna-life-overcrowded-flat/move-to-shared-tenement` tags: housing, home, health, family, household, injury
  Klara把床架拆开，用绳子捆在借来的手推车上，搬进利奥波德城的合租房。押金和车钱花掉八克朗；新住处人多、墙薄，但至少每个人有一块能躺下的地方，Klara的腰在冷风里疼了一路，夜里却第一次不用侧着身睡。
  _effects: residence; cash -8 (deposit and cart（其中8克朗记入债务）); health -0.020000000000000018 (moving in winter); relation acquaintance with person-materialized-world-vienna-1912-45_

- **1933.01** `p23-wedding-dress::ctx-klosterneuburg-rural-1912::milieu-tenement/the-curtains-from-the-dress` tags: love, desire, obsession, stalker, wedding, fear, high_drama, rural
  Klara把裙子铺在桌上，Elisabeth Bauer 2找来剪刀。两个人拆掉蕾丝，把绸面裁成两幅窗帘；针脚歪歪扭扭，阳光透进来时，屋里像落了一层很淡的粉。Hedwig再没有来过；Klara偶尔会想起那个退进门洞的人影，但窗帘已经挂了很多年。
  _effects: relation partner with person-materialized-world-vienna-1912-17; cash -1 (curtain rings and thread（其中1克朗记入债务）); mood 0.06; flag +dress_curtains_

- **1933.01** `curse15-bargain.borrowed-name::ctx-klosterneuburg-rural-1912::milieu-tenement/the-price-is-a-name` tags: wish, power, curse, ritual, bargain, office, irony, rural
  Berta Hofer只要Klara在一张空白委任状上写下真名，说剩下的由办事处去办。一个月过去，职位没有来，Klara的名字却出现在一份领款单上，金额和签名都不属于Klara。Berta Hofer调走了，窗口换了人，没有人愿意查那张纸是从哪一叠里抽出来的。
  _effects: cash -2 (打点办事处的钱（其中2克朗记入债务）); flag +name_used_without_office; reputation -0.04000000000000001; relation acquaintance with person-materialized-world-vienna-1912-84; mood -0.04999999999999999; relation acquaintance with person-materialized-world-vienna-1912-84_

- **1933.01** `state_reaction:wish-power/power-office` tags: wish-power, wish, wish:power, power, status, ambition, state, state_reaction
  Klara坐在那张有权力的桌子后面，签下自己的名字。愿望没有因此变近，但桌上的纸张、印章和等待回话的人，都变得具体了。
  _effects: reputation 0.06; flag +wish:power:has_tasted_office_
  _causes: evt:world-vienna-1912:004414_

- **1933.01** `p10-family-tasks.reconcile-quarrel/reconcile-quarrel.ledger` tags: adulthood, family, social, marriage, care, inheritance, task, quarrel
  弟弟把钱掏出来时嘴里嘟囔，Klara没接话。厨房桌上摊着旧账本，炉子上的水壶响了也没人动。两人约定以后超过两克朗要先说，伴侣嗯了一声，把账本合上，又打开，在封底写下日期。
  _effects: cash 2 (从弟弟处要回的一半借款); relation partner with person-materialized-world-vienna-1912-17; skill_

- **1933.09** `p9-gap-adult-solitude.river-walk/river-walk.turned-back` tags: adulthood, daily, solitude, ordinary, home, walk, river, injury
  Klara走到半路风忽然大起来，围巾抽在脸上生疼，她掉头往回走。路过面包店时橱窗里还剩几个昨天的圆面包，四赫勒一个，她买了两个，揣在怀里带回去当晚饭。
  _effects: food; cash -0.08 (两个剩面包四赫勒一个); health -0.010000000000000009 (在风口里走了一段，脸被吹得发红)_

- **1933.11** `vienna-social-movement.recruitment/read-and-decline` tags: development, social_movement, organization, politics
  Klara把传单读了两遍，记下上面的地址，却没有去。第二天照常上工；午休时听见两个工友低声谈论同一场集会。
  _effects: mood -0.010000000000000009; relation acquaintance with person-materialized-world-vienna-1912-50_

- **1934.01** `vienna-tenement-neighbors.laundry_line_dispute/subject_yields_line` tags: home, social, family, housing
  Klara看Friedrich Kral 3盆里那几件小衬衫，把自家床单卷起来抱回屋，说等下午再晾。Friedrich Kral 3愣了一下，闷头把衣服挂好，收工回来时在Klara门口放了一小包用旧报纸裹的洗衣碱。Klara打开报纸，碱面里还掺着几粒粗盐。
  _effects: relation friend with person-materialized-world-vienna-1912-40; food_
  _causes: evt:world-vienna-1912:004416_

- **1934.01** `state_reaction:wish-power/power-humiliation` tags: wish-power, wish, wish:power, power, status, ambition, state, state_reaction
  Klara把那句轻视记了很久。它没有变成一个决定，但也没有消失。
  _effects: mood -0.09999999999999998; flag +wish:power:fixated_on_revenge_
  _causes: evt:world-vienna-1912:004582_

- **1934.01** `p23-revenge-marriage::ctx-vienna-authoritarian-1934::milieu-tenement/they-decide-to-stay-married` tags: love, revenge, marriage, family_enemy, debt, warmth, high_drama, vienna
  婚礼后的第三个月，Klara在厨房里煮汤，Elisabeth Bauer 2进来把一封信放在桌上。信是Emil Weiss写的，说要收回房子。Elisabeth Bauer 2说我们可以搬走；Klara把汤勺放下，说那就搬。那天晚上，两个人第一次像夫妻那样商量一件小事。
  _effects: relation partner with person-materialized-world-vienna-1912-17; mood 0.04999999999999999; flag +marriage_of_choice_

- **1934.01** `r15-wish.found-faction::ctx-vienna-authoritarian-1934::milieu-tenement/took-over-a-club` tags: politics, power, wish, organization, office, status, vienna, urban
  一个快要散掉的政治俱乐部让Klara接手。会员只剩十一个人，欠着两个月房租，但那间办公室的门牌还挂着。Klara在第一次会上没有讲理想，只把账本翻开。
  _effects: reputation 0.04000000000000001; organization_found 接手后的俱乐部 (party); position 临时主席 @org:r15-club:evt:world-vienna-1912:004755_

- **1934.01** `agency:attend_meeting` tags: agency, agency:attend_meeting
  Klara走到Berggasse 19, Wohnung und Ordination门口，看见便衣和拥挤的人群，最终没有进去。
  _effects: mood -0.03999999999999998_

- **1934.06** `vienna-courtship-courtyard.breakup/stay-for-the-rent` tags: adulthood, courtship, partner, social, family, partnership
  东西还到一半，两人算了算房租、煤钱和两个人的工钱凑在一起才够。最后钥匙没收回去，外套也留下；这个月能少花一克朗，话说到“以后”两个字就断了，谁都不往下接，炉子今晚还是得两个人一起生。
  _effects: mood -0.04999999999999999; relation partner with person-materialized-world-vienna-1912-17; cash 1 (合租省下一份房租)_

- **1934.08** `vienna-tenement-neighbors.shared_stove_fire/fire_no_damage` tags: home, social, family, housing
  Klara刚把锅端下灶，火苗就蹿了起来，Elisabeth Bauer 2一脚踩灭地上的油布，顺手抄起沙箱里的沙子盖住灶口。两人都没受伤，但Elisabeth Bauer 2的鞋底烧穿一个洞，那是唯一一双出门的鞋。
  _effects: mood -0.04999999999999999_

- **1934.09** `ad20-public-speech::ctx-vienna-authoritarian-1934::milieu-tenement/speech-lands` tags: speech, public, reputation, everyday, fame, scandal, vienna, urban
  礼堂里坐了一半人，前排还有几个空位。Klara讲到第三段时，后排有人开始点头；讲到第五段，连门口卖票的也转过身来。散场后，Katharina Hofer握着Klara的手说“下次还请你”，手心里全是汗。
  _effects: state_add ad20-public-attention state:world-vienna-1912:209; reputation 0.04; skill; relation acquaintance with person-materialized-world-vienna-1912-38; flag +public_speech_landed; mood 0.03999999999999998; flag +public_attention_active_

- **1934.11** `state_reaction:ad20-public-attention/a-scandal-sticks` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  旧闻被重新排上版面，标题比上次短，意思却更重。Klara没有买那份报纸，但整条街都知道了标题。
  _effects: state_parameter ad20-public-attention.attention 55 -> 65; state_parameter ad20-public-attention.danger 15 -> 23; state_parameter ad20-public-attention.sympathy 50 -> 45; mood -0.030000000000000027_
  _causes: evt:world-vienna-1912:005264_

- **1935.01** `vienna-life-injury-recovery/home-care` tags: health, work, family
  Klara没有去诊所，只用热水和旧布洗了伤口。第二天伤口周围发红，家里人把仅剩的干净床单撕成条。
  _effects: cash -2 (clean cloth); condition_
  _causes: evt:world-vienna-1912:004757_

- **1935.01** `absurd15-wish.crown-for-a-day::ctx-vienna-authoritarian-1934::milieu-tenement/festival-king-only` tags: wish, power, crown, office, irony, festival, vienna, urban
  代表团没有带来任命书，只带来一套戏服：市庆游行需要一个“国王”，一天两场，管一顿饭。Klara穿上戏服时，围观的人鼓起掌来。掌声是真的，王冠是假的，晚饭也是真的。
  _effects: state_add stage-sovereign state:world-vienna-1912:208; cash 2 (游行演出的酬劳); flag +hired_as_festival_king; flag +stage_sovereign; reputation 0.04_

- **1935.01** `state_tick:ad20-public-attention/the-attention-cycle/warms` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  Klara在街角被人认出来，对方没有要求什么，只说“上次那件事做得不错”。这句客气话被旁边的人听见，下午便有两个陌生人朝Klara点头。关注没有减少，但空气松了一点。
  _effects: state_parameter ad20-public-attention.attention 65 -> 61; state_parameter ad20-public-attention.sympathy 45 -> 51; state_parameter ad20-public-attention.opportunity 45 -> 49; mood 0.020000000000000018_

- **1935.01** `r13-fam.share-budget::ctx-vienna-authoritarian-1934::milieu-tenement/pooled-wages` tags: task, family, budget, money, household, trust, vienna, urban
  Klara把这个月的工钱倒在桌上，分成房租、煤、面包和一小堆应急的铜板。Elisabeth Bauer 2把自己的钱也推过来，只留下车票钱。两人把钱数了两遍，数目对上了，Klara才把那只装钱的铁盒推到床底下，钥匙交给Elisabeth Bauer 2。
  _effects: condition; flag +pooled_household_wages; role; relation partner with person-materialized-world-vienna-1912-17; knowledge “the household now keeps one emergency tin”_

- **1935.05** `r13-turn.debt-crisis::ctx-vienna-authoritarian-1934::milieu-tenement/defaulted` tags: finance, debt, poverty, household, pressure, vienna, urban, crisis
  第七天，Anton Moser带着两个人在门口等到天黑。Klara把家里的现金全数出来，还差九克朗。Anton Moser没有砸门，只把一张法院传票从门缝塞进来，说下次来的是法警。Alois Kral在对面把门关得很轻。
  _effects: cash -20 (催款单贴在门框上); condition; flag +debt_default; relation rival with person-materialized-world-vienna-1912-34; knowledge “a court summons follows the unpaid debt”; relation acquaintance with person-materialized-world-vienna-1912-34; relation acquaintance with person-materialized-world-vienna-1912-14_

- **1935.06** `df18-luck.borrowed-at-the-card-table::ctx-vienna-authoritarian-1934::milieu-tenement/marked-deck` tags: luck, debt, bargain, gambling, obligation, night, supernatural, vienna
  Klara赢了三克朗，起身时才发现牌背有指甲划出的记号。Karl Kraus笑着把牌收进袖子里，说这叫“借来的手气”。Klara没有把钱退回去，只把那张有记号的牌偷偷带走。第二天，Klara在当铺门口看见Karl Kraus正在和一个收旧货的人分钱。
  _effects: cash 3 (牌桌上赢来的三克朗); state_add df18-borrowed-luck state:world-vienna-1912:256; relation acquaintance with person-karl-kraus; flag +df18_marked_deck; mood -0.020000000000000018; flag +df18_luck_borrowed; knowledge “我得到了一点不该白拿的好运，代价还没有说清。”_

- **1935.06** `state_reaction:df18-borrowed-luck/luck-windfall` tags: df18-borrowed-luck, luck, debt, obligation, superstition, risk, bargain, transfer
  Klara在路边捡到一枚硬币，或是在旧外套里摸出一张没花完的票子。高兴只持续了很短；Klara随即想起，那本账还在别人手里。
  _effects: state_parameter df18-borrowed-luck.luck 15 -> 20; state_parameter df18-borrowed-luck.debt 15 -> 20; mood 0.010000000000000009_
  _causes: evt:world-vienna-1912:005757_

- **1936.01** `vienna-tenement-neighbors.laundry_line_dispute/subject_yields_line` tags: home, social, family, housing
  Klara看Elisabeth Bauer 2盆里那几件小衬衫，把自家床单卷起来抱回屋，说等下午再晾。Elisabeth Bauer 2愣了一下，闷头把衣服挂好，收工回来时在Klara门口放了一小包用旧报纸裹的洗衣碱。Klara打开报纸，碱面里还掺着几粒粗盐。
  _effects: food_
  _causes: evt:world-vienna-1912:005257_

- **1936.01** `p23-lovers-ledger::ctx-vienna-authoritarian-1934::milieu-tenement/the-ledger-burns-first` tags: love, desire, betrayal, ledger, secret, blackmail, high_drama, vienna
  Elisabeth Bauer 2比Klara早到一步。炉膛里只剩一截没烧透的蓝线，Klara从灰里拈出来，认出那是账本装订用的线。Elisabeth Bauer 2说这样对大家都好；Klara没有回答，只把灰烬扫进一只信封，收进抽屉最深处。炉子里的火还没有完全灭。
  _effects: state_add p23-dangerous-secret state:world-vienna-1912:255; relation partner with person-materialized-world-vienna-1912-17; knowledge “partner burned the ledger”; mood -0.030000000000000027; flag +ledger_burned; relation acquaintance with person-materialized-world-vienna-1912-4_

- **1936.01** `state_reaction:wish-power/power-humiliation` tags: wish-power, wish, wish:power, power, status, ambition, state, state_reaction
  Klara把那句轻视记了很久。它没有变成一个决定，但也没有消失。
  _effects: mood -0.03999999999999998; flag +wish:power:wounded_
  _causes: evt:world-vienna-1912:005751_

- **1936.01** `office16-appointment.patronage-ledger::ctx-vienna-authoritarian-1934::milieu-tenement/appointed-ally` tags: office, appointment, patronage, organization, politics, power, vienna, urban
  Klara把Mitzi Hofer的名字写在“联络员”后面，月薪一克朗，职责是每周来两次、把外面的消息带进来。Katharina Hofer 2说这个岗位没有编制，Klara说先按临时用工算；第一个月，Mitzi Hofer带来的消息比文件还多。
  _effects: position 联络员 @org:r15-club:evt:world-vienna-1912:004755; relation colleague with person-materialized-world-vienna-1912-44; flag +appointed_ally; knowledge “联络员不在正式编制里，工资走临时用工。”; mood 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-44; relation acquaintance with person-materialized-world-vienna-1912-68_

- **1936.01** `state_reaction:wish-power/power-office` tags: wish-power, wish, wish:power, power, status, ambition, state, state_reaction
  Klara坐在那张有权力的桌子后面，签下自己的名字。愿望没有因此变近，但桌上的纸张、印章和等待回话的人，都变得具体了。
  _effects: reputation 0.06_
  _causes: evt:world-vienna-1912:005755_

- **1936.01** `state_expire:stage-sovereign` tags: stage-sovereign, performance, theatre, pretend, status, irony, power, no-real-authority
  Klara的「舞台上的君主」到期；相关安排结束。
  _effects: state_remove stage-sovereign state:world-vienna-1912:208; flag -stage_sovereign_

- **1936.01** `state_tick:ad20-public-attention/the-attention-cycle/cools` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  Klara发现最近没有人再提那件事。报纸换了头版，邻居也换了话题；本该轻松，Klara却在买菜时反复整理衣领，好像还在等一个不会来的目光。
  _effects: state_parameter ad20-public-attention.attention 61 -> 53; state_parameter ad20-public-attention.sympathy 51 -> 48; state_parameter ad20-public-attention.opportunity 49 -> 47; mood -0.010000000000000009_

- **1936.01** `state_tick:df18-borrowed-luck/luck-account/paid-a-little` tags: df18-borrowed-luck, luck, debt, obligation, superstition, risk, bargain, transfer
  半年过去，Klara还了一点钱，也替债主跑了两趟腿。债主没有夸Klara，只在账本上划掉一小行；Klara却发现，自己开始下意识地绕开那家店。
  _effects: cash -1 (还掉一小笔); state_parameter df18-borrowed-luck.debt 20 -> 12; state_parameter df18-borrowed-luck.luck 20 -> 23; mood 0.010000000000000009_

- **1936.01** `agency:attend_meeting` tags: agency, agency:attend_meeting
  Klara走到Berggasse 19, Wohnung und Ordination门口，看见便衣和拥挤的人群，最终没有进去。
  _effects: mood -0.03999999999999998_

- **1936.01** `initiative:found_process:org:r15-club:evt:world-vienna-1912:004755`
  接手后的俱乐部在Leopoldstädter Zinshaus, gemeinsamer Gang经过数年的招募、会议和互助，把分散的行动整理成公开纲领；这不是预先写好的历史，而是成员自己累积出来的运动。
  _effects: historical process 接手后的俱乐部的持续运动; historical development:initiative-org:r15-club:evt:world-vienna-1912:004755-1936 as organizer; historical development:initiative-org:r15-club:evt:world-vienna-1912:004755-1936 as organizer; knowledge “接手后的俱乐部的持续运动不是一次会议，而是我们这些年积累出来的持续组织。”; reputation 0.039999999999999994_

- **1936.01** `historical_phase`
  历史进程《接手后的俱乐部在Leopoldstädter Zinshaus, gemeinsamer Gang经过数年的招募、会议和互助，把分散的行动整理成公开纲领；这不是》从 emerging 进入 mobilizing。
  _effects: knowledge “我亲历或知晓「接手后的俱乐部在Leopoldstädter Zinshaus, gemeinsamer Gang经过数年”; knowledge “我亲历或知晓「接手后的俱乐部在Leopoldstädter Zinshaus, gemeinsamer Gang经过数年”_
  _causes: evt:world-vienna-1912:006004_

- **1937.01** `state_reaction:ad20-public-attention/a-scandal-sticks` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  旧闻被重新排上版面，标题比上次短，意思却更重。Klara没有买那份报纸，但整条街都知道了标题。
  _effects: state_parameter ad20-public-attention.attention 53 -> 63; state_parameter ad20-public-attention.danger 23 -> 31; state_parameter ad20-public-attention.sympathy 48 -> 43; mood -0.030000000000000027_
  _causes: evt:world-vienna-1912:006064_

- **1937.01** `office16-favor.private-sinecure::ctx-vienna-authoritarian-1934::milieu-tenement/sinecure-created` tags: office, favor, corruption, patronage, family, power, vienna, urban
  Klara在编制表最下面添了一行“顾问”，月薪两克朗，职责是“必要时提供咨询”。Franz Moser第二天就搬来一张靠窗的桌子，带来一盆天竺葵；一个月后，Luise Kral 2发现顾问唯一经手的文件是自己的午餐菜单。
  _effects: position 顾问 @org:r15-club:evt:world-vienna-1912:004755; organization_funds; relation friend with person:evt:world-vienna-1912:001031:child; flag +private_sinecure; knowledge “顾问岗位没有固定职责，考勤由我签字。”; mood 0.020000000000000018_

- **1937.01** `state_tick:ad20-public-attention/the-attention-cycle/cools` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  Klara发现最近没有人再提那件事。报纸换了头版，邻居也换了话题；本该轻松，Klara却在买菜时反复整理衣领，好像还在等一个不会来的目光。
  _effects: state_parameter ad20-public-attention.attention 63 -> 55; state_parameter ad20-public-attention.sympathy 43 -> 40; state_parameter ad20-public-attention.opportunity 47 -> 45; mood -0.010000000000000009_

- **1937.01** `state_tick:p23-dangerous-secret/the-secret-changes-hands/the-secret-holds` tags: p23-dangerous-secret, secret, danger, leverage, exposure, loyalty, crime, politics
  又过了两年，秘密没有自己长脚。Klara把知道的人一一数过，发现只剩两个还住在这条街上；其中一个已经老得记不清门牌，另一个每次见面都先移开眼睛。Klara把剩下的线索重新收好，放回原处。
  _effects: state_parameter p23-dangerous-secret.exposure 20 -> 16; state_parameter p23-dangerous-secret.leverage 15 -> 20; state_parameter p23-dangerous-secret.loyalty 55 -> 58; mood 0.010000000000000009_

- **1937.01** `state_tick:df18-borrowed-luck/luck-account/price-arrives` tags: df18-borrowed-luck, luck, debt, obligation, superstition, risk, bargain, transfer
  第六个月，债主在楼梯口拦住Klara，说利息不能总按原来的算法。Klara看着对方手里的账本，忽然发现那上面的墨迹比上次新，数字也比上次多。
  _effects: cash -2 (利息被重新计算); state_parameter df18-borrowed-luck.debt 12 -> 18; state_parameter df18-borrowed-luck.luck 23 -> 18; mood -0.030000000000000027_

- **1937.01** `r13-fam.visit-grave::ctx-vienna-authoritarian-1934::milieu-tenement/flowers-placed` tags: task, family, grave, mourning, neighbor, grief, vienna, urban
  Klara陪Elisabeth Bauer 2去公墓，把一把野菊放在新翻的土上。木牌上的名字被雨冲得发白，Elisabeth Bauer 2用手指一笔一画描了一遍，描到最后一笔，指腹上全是泥。Klara没有劝，只蹲下来把歪掉的木牌扶正。
  _effects: cash -1 (公墓新翻的土); condition; flag +visited_a_grave_with_neighbour; role_

- **1937.08** `vienna-social-movement.recruitment/join-and-carry` tags: development, social_movement, organization, politics
  Klara在楼梯下面接到一张折成四折的传单。纸上没有署名，只写着下一次集会的地址。Klara去了，在昏暗的屋里报上姓名，成为Sozialdemokratische Arbeiterpartei Österreichs (SDAP)的一员，并答应负责自己所在街区的联络。
  _effects: organization_membership; role; relation acquaintance with person-phase15-Josef-world-vienna-1912_

- **1937.09** `cj17-police.lineup::ctx-vienna-authoritarian-1934::milieu-tenement/bought-the-witness` tags: police, court, legal, investigation, mistaken_identity, humiliation, vienna, urban
  家里凑了三克朗，由Klara的家里人在咖啡馆后门交给Friedrich Kral。第二天，Friedrich Kral在预审室里说光线太暗，认不清。Katharina Hofer合上本子，说证据不足，但没有把案子结掉。Klara知道那张纸还在某个抽屉里，只是暂时不压在自己身上。
  _effects: cash -3 (在咖啡馆后门交给证人的钱); state_parameter under-investigation.progress 20 -> 15; relation acquaintance with person:evt:world-vienna-1912:000711:child; flag +witness_paid_off; knowledge “证人收了钱才说光线太暗，案子并没有真正结掉。”; mood -0.030000000000000027; state_add cj17-wanted state:world-vienna-1912:340; flag +wanted_by_authorities_

- **1937.09** `state_reaction:cj17-wanted/a-uniform-on-the-stair` tags: cj17-wanted, crime, police, pursuit, wanted, risk, debt, state
  Klara听见楼梯间有军刀碰到栏杆的声音，立刻把灯拧小。脚步声在上一层停了一会儿，又往下走；第二天，房东说昨晚有人来问过三楼住着谁。
  _effects: state_parameter cj17-wanted.heat 20 -> 26; mood -0.030000000000000027_
  _causes: evt:world-vienna-1912:006721_

- **1938.01** `vienna-life-anschluss-1938/complies` tags: politics, persecution, 1938
  Anna Berg在街口设了登记桌，要求住户交出姓名、职业和宗教。Klara排队填了表，回家把门牌擦干净。楼里有人连夜搬走，也有人站在阳台上挥手。
  _effects: role; cash -3 (new permits and stamps); condition; relation acquaintance with person-materialized-world-vienna-1912-12_

- **1938.01** `r15-wish.power-intrigue::ctx-vienna-authoritarian-1934::milieu-tenement/crossed-the-line` tags: politics, power, wish, intrigue, office, vienna, urban, crisis
  Klara让人去查Luise Winter 2的私人材料。材料没有查到，但查的人被看见了。第二天，Anton Kral把Klara叫去，只说了一句：“你比我以为的更急。”
  _effects: reputation -0.06; state_add under-investigation state:world-vienna-1912:339_

- **1938.01** `state_tick:ad20-public-attention/the-attention-cycle/cools` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  Klara发现最近没有人再提那件事。报纸换了头版，邻居也换了话题；本该轻松，Klara却在买菜时反复整理衣领，好像还在等一个不会来的目光。
  _effects: state_parameter ad20-public-attention.attention 55 -> 47; state_parameter ad20-public-attention.sympathy 40 -> 37; state_parameter ad20-public-attention.opportunity 45 -> 43; mood -0.010000000000000009_

- **1938.01** `state_expire:df18-borrowed-luck` tags: df18-borrowed-luck, luck, debt, obligation, superstition, risk, bargain, transfer
  Klara的「借来的好运」到期；相关安排结束。
  _effects: state_remove df18-borrowed-luck state:world-vienna-1912:256; flag +df18_luck_settled_

- **1938.01** `state_tick:cj17-wanted/heat-check/lay-low` tags: cj17-wanted, crime, police, pursuit, wanted, risk, debt, state
  Klara换了去市场的路线，又把常穿的那件外套反过来改成里衬。半年里没有人来敲门，只有楼下的鞋匠多问了一句最近怎么不走前街。热度退了一点，但名字还在某个抽屉里。
  _effects: state_parameter cj17-wanted.heat 26 -> 18; state_parameter cj17-wanted.cover 5 -> 9; mood 0.010000000000000009_

- **1938.01** `agency:recruit_members` tags: agency, agency:recruit_members
  Klara试图招募Anton Berg，但对方担心工作和警察，没有给出承诺。
  _effects: mood -0.040000000000000036_

- **1938.02** `bc18-crime.inept-blackmail::ctx-vienna-authoritarian-1934::milieu-tenement/mourning-card` tags: crime, blackmail, photograph, mistake, humiliation, absurd, reputation, vienna
  Anna Moser 2在葬礼上偷拍了一张Klara靠着棺材睡着的照片，说只要不给四克朗，就把照片寄给Klara的老板。Klara还没有凑钱，照片先被家里人选去做了悼念卡；亲戚们说，只有真正伤心的人才会累成这样。Anna Moser 2拿着底片站在门口，第一次不知道该威胁谁。
  _effects: cash 3 (相馆支付的悼念卡照片使用费); reputation 0.03; relation rival with person-materialized-world-vienna-1912-67; condition; flag +blackmail_photo_became_mourning_card; mood 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-67_

- **1938.02** `state_reaction:wish-power/power-humiliation` tags: wish-power, wish, wish:power, power, status, ambition, state, state_reaction
  Klara把那句轻视记了很久。它没有变成一个决定，但也没有消失。
  _effects: mood -0.09999999999999998_
  _causes: evt:world-vienna-1912:007229_

- **1938.07** `vienna-historical-social-movement.public-meeting/stay-and-tidy-chairs` tags: history, historical_process, social_movement, organization, politics
  椅子叠到一半，Franz Lechner压低声音说今晚有三个人没投票就走了。Klara把最后一块瓜子壳扫进簸箕，说记住那三张脸，比上台多说一句有用。灯熄时大厅只剩木头发出的轻响。
  _effects: skill; relation acquaintance with person-franz-lechner; mood -0.020000000000000018_

- **1938.12** `vienna-social-movement.meeting/quiet-solidarity` tags: development, social_movement, organization, meeting
  Klara没有发言，只把带来的面包分成几份。散会时，一个不认识的女人把她的地址塞给Klara，说那条街还需要有人继续收会费。
  _effects: relation acquaintance with person:evt:world-vienna-1912:000883:child_

- **1939.01** `office16-budget.sign-or-block::ctx-vienna-authoritarian-1934::milieu-tenement/blocked-the-permit` tags: office, budget, permit, administration, power, economy, vienna, urban
  Klara把一份扩建许可证压在抽屉最下面，理由是排水和消防通道不合规。申请人Ferdinand Huber在走廊里等到下班，最后只拿到一张写着“补件”的纸条。Klara知道这份许可明年还会再来，但今年不会从自己的桌上出去。
  _effects: reputation 0.020000000000000004; skill; relation rival with person-materialized-world-vienna-1912-99; flag +blocked_permit; knowledge “扩建申请的排水图与消防通道不符合现行规定。”; relation acquaintance with person-materialized-world-vienna-1912-99_

- **1939.01** `state_expire:ad20-public-attention` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  Klara的「被看见的日常」到期；相关安排结束。
  _effects: state_remove ad20-public-attention state:world-vienna-1912:209; flag -public_attention_active_

- **1939.01** `state_expire:p23-dangerous-secret` tags: p23-dangerous-secret, secret, danger, leverage, exposure, loyalty, crime, politics
  Klara的「危险的秘密」到期；相关安排结束。
  _effects: state_remove p23-dangerous-secret state:world-vienna-1912:255_

- **1939.01** `state_tick:under-investigation/case-progress/evidence` tags: under-investigation, legal, police, investigation, risk, state, state_tick
  调查员又来找Klara谈了一次。问话比上次具体，记录也比上次长。
  _effects: state_parameter under-investigation.progress 15 -> 30; mood -0.040000000000000036_

- **1939.01** `state_expire:cj17-wanted` tags: cj17-wanted, crime, police, pursuit, wanted, risk, debt, state
  Klara的「被追捕」到期；相关安排结束。
  _effects: state_remove cj17-wanted state:world-vienna-1912:340; flag -wanted_by_authorities_

- **1939.01** `kernel-social.reconciliation::ctx-vienna-authoritarian-1934::milieu-tenement/reconciliation.shared-pot` tags: task, task:social, social, reconciliation, family, apology, conflict, vienna
  Klara端着一锅炖肉去敲Josef的门，说肉炖多了，一个人吃不完。Josef让他进屋，把两只盘子摆在桌上；两人先谈煤价，再谈母亲的坟，最后才提那笔说不清的钱。Emil Winter在楼下等消息，等到灯灭才走。
  _effects: relation kin with person-phase15-Josef-world-vienna-1912; cash -2 (meat and coal for the reconciliation supper); role; flag +family_reconciled; knowledge “两人把煤价、母亲的坟和那笔钱都谈到了。”; relation acquaintance with person-materialized-world-vienna-1912-36_

- **1939.04** `vienna-housing-move.sublet-room/sublet-declined` tags: housing, home, rent, family, money
  Klara正要把空床许给Luise Winter 3，Anna Moser 2却在楼梯上拦住了，说这条街上去年有人招了生人合住，失过钥匙，惹出些麻烦。Klara回家把铺盖重新叠好，回绝了Luise Winter 3，只让他白天来喝口热水。空床仍空着，房租还是从自己的工钱里补。
  _effects: mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-67; relation acquaintance with person-materialized-world-vienna-1912-105_

- **1939.11** `p9-social-tenement-neighbors.stove-and-line/stove-and-line.move-to-line-end` tags: housing, neighbors, tenement, daily, money, reputation
  Klara把自己泡着的衣服端到绳子最末一段，把靠近炉子的位置让给Luise Winter 3，条件是对方看着火，别让水烧干。Luise Winter 3点头，往炉膛里添了一块煤，说中午以前一定把炉子空出来。两家的盆就挨着放在窗下。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-105; mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-105_

- **1940.01** `office16-hire.protege::ctx-vienna-authoritarian-1934::milieu-tenement/hired-competent` tags: office, hire, patronage, bureaucracy, work, power, vienna, urban
  Klara把Elisabeth Bauer的名字写在编制表的空行上，又在旁边注了“试用三个月”。Ferdinand Moser 2提醒说预算只够半个位置，Klara还是把名字留下了。第二天，Elisabeth Bauer提前半小时到，把走廊里的旧档案按年份重新排了一遍。
  _effects: position 助理文书 @org:r15-club:evt:world-vienna-1912:004755; organization_funds; relation colleague with person-elisabeth-bauer; reputation 0.03; flag +hired_protege; relation acquaintance with person-materialized-world-vienna-1912-107_

- **1940.01** `state_reaction:wish-power/power-office` tags: wish-power, wish, wish:power, power, status, ambition, state, state_reaction
  Klara坐在那张有权力的桌子后面，签下自己的名字。愿望没有因此变近，但桌上的纸张、印章和等待回话的人，都变得具体了。
  _effects: reputation 0.059999999999999984_
  _causes: evt:world-vienna-1912:007759_

- **1940.01** `state_expire:under-investigation` tags: under-investigation, legal, police, investigation, risk, state, state_tick, state:under-investigation
  Klara的「被调查」到期；相关安排结束。
  _effects: state_remove under-investigation state:world-vienna-1912:339_

- **1940.01** `agency:support_process` tags: agency, agency:support_process
  Klara为接手后的俱乐部在Leopoldstädter Zinshaus, gemeinsamer 出了力：整理名单、传递消息或替同伴作证，名字被记进参与记录。
  _effects: historical development:initiative-org:r15-club:evt:world-vienna-1912:004755-1936 as supporter; historical_influence; reputation 0.015000000000000013_

- **1940.01** `vienna-historical-social-movement.district-list/hold-list-and-watch` tags: history, historical_process, social_movement, organization, politics
  Emil Weiss把会费账本推回去，说外头那个组织答应给煤，只要名单。Klara把账本合上，用一块旧布包好塞进缝纫机底下，说先看看谁在往外递话。两人都没再提这事。
  _effects: relation acquaintance with person-emil-weiss; mood -0.030000000000000027; flag +kept_district_list_private_

- **1940.02** `p9-social-tenement-neighbors.flour-loan/flour-loan.full-bag` tags: housing, neighbors, tenement, daily, money, reputation
  Klara把一整袋面粉倒进Friedrich Berg的空口袋，袋口用麻绳扎了两道，说等她男人发了薪再还。Friedrich Berg连声道谢，把写着借煤日期的小纸片折好放回围裙。柜子里只剩一袋面粉，Klara当晚煮汤时多加了一勺水。
  _effects: food_

- **1940.03** `p9-gap-adult-unemployed.labour-exchange/exchange-swap-tips` tags: adulthood, unemployment, casual_labour, poverty, daily, labour_exchange, bureaucracy
  介绍所的门关到一半，里面还在喊下一位。Klara和Hermann Lechner站在廊下，听着货栈、面粉厂、马厩各处的消息，最后只记住北站那条。烟盒纸塞进上衣口袋，走路时窸窸窣窣响。
  _effects: flag +has_work_lead; relation acquaintance with person-materialized-world-vienna-1912-62; relation acquaintance with person-materialized-world-vienna-1912-62_

- **1941.01** `vienna-life-injury-recovery/clinic-treatment` tags: health, work, family
  Klara在受伤后的第三天去了诊所。医生清洗伤口、换药，收下诊费，嘱咐不要急着回机器旁。Klara把药方折好，回家路上买了纱布。
  _effects: health 0.04999999999999999 (wound treatment); cash -8 (clinic and bandages（其中8克朗记入债务）)_
  _causes: evt:world-vienna-1912:008020_

- **1941.01** `r15-wish.power-offer::ctx-vienna-authoritarian-1934::milieu-tenement/mistaken-identity` tags: politics, power, wish, office, status, vienna, urban, crisis
  一个代表团走错了房间，把Klara当成新来的部长，围着说了十分钟的请求。Klara没有纠正。等人走后，Klara坐在那张不属于自己的椅子上，听见走廊里有人在找真正的部长。
  _effects: mood 0.020000000000000018; reputation 0.04000000000000001; state_add stage-king state:world-vienna-1912:484; flag +mistaken_for_official; relation acquaintance with person-materialized-world-vienna-1912-80; flag +stage_king; reputation 0.04000000000000001_

- **1941.01** `state_reaction:stage-king/mistaken-for-real` tags: stage-king, performance, theatre, status, irony, state, state_reaction, politics
  散场后有人隔着街喊Klara“陛下”。Klara没有纠正，因为对方已经跪了下去。
  _effects: mood 0.040000000000000036; reputation 0.04999999999999999; flag +mistaken_for_sovereign_
  _causes: evt:world-vienna-1912:008306_

- **1941.01** `agency:organize_meeting` tags: agency, agency:organize_meeting
  Klara原定在Leopoldstädter Zinshaus, gemeinsamer Gang开会，但来的人不够，或者有人临时退缩；最后只留下几张没发完的纸条。
  _effects: mood -0.040000000000000036; reputation -0.010000000000000009_

- **1941.01** `oj18-mortuary.first-body::ctx-vienna-authoritarian-1934::milieu-tenement/municipal-mortuary` tags: death, mortuary, funeral, work, odd_job, night, everyday, vienna
  市立太平间缺一个夜班杂役，Katharina Hofer 2只问Klara怕不怕冷。地下室的抽屉一排十二个，有的拉开了就不再推回去；Klara的工作是登记遗物、给无名尸挂上编号，再在天亮前把地拖干净。
  _effects: organization_found 市立太平间 (state); position 太平间杂役 @morgue:person-phase15-Klara-world-vienna-1912-evt:world-vienna-1912:008850; state_add oj18-odd-apprenticeship state:world-vienna-1912:546; cash 2 (municipal night wages); condition; flag +mortuary_worker; knowledge “太平间地下室的抽屉一排十二个，无名尸也要有编号。”; role; flag +odd_job_apprentice_

- **1941.01** `state_reaction:oj18-odd-apprenticeship/the-thing-in-the-basement` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  夜班结束前，Klara听见地下室传来拖拽声。下去时，门开着，地上只有一道湿拖把的痕迹；第二天，所有人都说那间屋子锁了十年。
  _effects: state_parameter oj18-odd-apprenticeship.strangeKnowledge 30 -> 38; state_parameter oj18-odd-apprenticeship.trust 20 -> 17; mood -0.030000000000000027; knowledge “地下室那扇门后面有东西被搬动过，但巡查簿上没有记录。”_
  _causes: evt:world-vienna-1912:008850_

- **1941.02** `vienna-social-movement.meeting/speak-and-organize` tags: development, social_movement, organization, meeting
  Klara在后屋的会议上报出自己街区的名字：谁家缺煤，谁被房东催租，谁知道哪间印刷厂还在招人。Sozialdemokratische Arbeiterpartei Österreichs (SDAP)把这些事记进一本旧账本，散会时每个人带走一叠更小的纸条。
  _effects: skill; reputation 0.020000000000000018_

- **1941.05** `p9-gap-adult-solitude.river-walk/river-walk.turned-back` tags: adulthood, daily, solitude, ordinary, home, walk, river, injury
  Klara走到半路风忽然大起来，围巾抽在脸上生疼，她掉头往回走。路过面包店时橱窗里还剩几个昨天的圆面包，四赫勒一个，她买了两个，揣在怀里带回去当晚饭。
  _effects: food; cash -0.08 (两个剩面包四赫勒一个); health -0.010000000000000009 (在风口里走了一段，脸被吹得发红)_

- **1941.05** `state_reaction:wish-power/power-humiliation` tags: wish-power, wish, wish:power, power, status, ambition, state, state_reaction
  Klara把那句轻视记了很久。它没有变成一个决定，但也没有消失。
  _effects: mood -0.040000000000000036_
  _causes: evt:world-vienna-1912:008933_

- **1942.01** `office16-appointment.patronage-ledger::ctx-vienna-authoritarian-1934::milieu-tenement/appointed-rival` tags: office, appointment, patronage, organization, politics, power, vienna, urban
  Klara给Ferdinand Moser 2安排了一个“礼仪顾问”的位置：有办公室、有名牌、有固定工资，没有任何需要签字的文件。Ferdinand Moser 2接受了，并且在第一次会议上坐到了离主席最远的那把椅子上。
  _effects: position 礼仪顾问 @org:r15-club:evt:world-vienna-1912:004755; organization_funds; relation rival with person-materialized-world-vienna-1912-107; flag +bought_off_rival; knowledge “礼仪顾问的岗位没有需要签字的文件。”; mood 0.020000000000000018_

- **1942.01** `state_expire:stage-king` tags: stage-king, performance, theatre, status, irony, state, state_tick, state:stage-king
  Klara的「舞台上的国王」到期；相关安排结束。
  _effects: state_remove stage-king state:world-vienna-1912:484; flag -stage_king_

- **1942.01** `state_tick:oj18-odd-apprenticeship/strange-year/blamed-for-the-noise` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  楼上住户投诉夜里有人拖椅子，管事的把巡查簿翻到Klara的那一页，说签字太潦草，看不出巡过几趟。Klara想辩解，却想起那晚确实在楼梯间多站了一刻钟；扣掉的工钱刚好够买一双不漏水的鞋。
  _effects: state_parameter oj18-odd-apprenticeship.trust 17 -> 1; state_parameter oj18-odd-apprenticeship.reliability 50 -> 40; mood -0.050000000000000044; flag +odd_job_scare_

- **1942.01** `agency:support_process` tags: agency, agency:support_process
  Klara想帮忙，但组织者不信任新来的人，只让其在外围等消息。
  _effects: mood -0.040000000000000036; reputation -0.010000000000000009_

- **1942.03** `state_reaction:mb17-remittance-web/border-closes` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  边境又收紧了，往故乡的列车要换乘三次。邮局说汇款还能走，但信可能压在路上；Klara还是把两张单子一起递进窗口，像把一句话交给一个不保证送达的人。
  _effects: state_parameter mb17-remittance-web.arrears 0 -> 2; mood -0.040000000000000036; flag +mb17_border_slow_letters_
  _causes: evt:world-vienna-1912:009419_

- **1942.04** `ld18-performance.tango::ctx-vienna-authoritarian-1934::milieu-tenement/the-impresario-offers-a-contract` tags: performance, desire, dance, public, queer, nightlife, public_desire, vienna
  Otto Weiss把合同推过来，说只要她们每星期跳三场，就付双倍的钱。Klara问要不要改舞步，Otto Weiss说不用，越像现在这样越好。Elisabeth Bauer看着合同上的数字，先笑了，又有点想哭。
  _effects: state_add ld18-public-desire state:world-vienna-1912:591; cash 2 (the first week of the scandal contract); relation acquaintance with person-materialized-world-vienna-1912-29; mood 0.020000000000000018; flag +scandal_contract; relation acquaintance with person-materialized-world-vienna-1912-29; flag +public_desire_active_

- **1942.10** `r13-rel.friend-loan::ctx-vienna-authoritarian-1934::milieu-tenement::friend-loan-crisis/borrowed-against-the-wage` tags: relationship, friend, money, debt, trust, vienna, urban, crisis
  月底工钱还没发，Otto Huber来借三克朗买面粉。Klara把准备当掉的怀表推过去，说先拿去押，发了工钱再赎。Otto Huber接了表，第二天送来半袋面粉，说表还压在当铺，赎期写在纸上。
  _effects: cash -3 (借出去的那张钞票); role_

- **1942.12** `p9-gap-adult-unemployed.dock-morning/dock-picked-coal` tags: adulthood, unemployment, casual_labour, poverty, daily, dock, injury
  多瑙河码头的雾还没散，工头捏着名单念了Klara的名字。煤灰落在汗湿的脖颈上，Friedrich Kral 3在铁门边看着，说这活儿一天顶三天，可肩膀得疼上一个礼拜。
  _effects: cash 4.2 (卸煤半日的工钱); health -0.04999999999999999 (扛煤筐磨破肩膀)_

- **1943.01** `curse15-bargain.borrowed-name::ctx-vienna-authoritarian-1934::milieu-tenement/a-key-and-a-title` tags: wish, power, curse, ritual, bargain, office, irony, vienna
  办事处后门的Katharina Hofer 2把一份旧名册翻到空页，让Klara在“会长”后面签下名字。三天后，Klara真的收到一枚铜钥匙和一张聘书：夜校同学会会长，职责是保管储物间。同学会只有三个成员，储物间的锁已经坏了。Katharina Hofer 2没有再出现。
  _effects: organization_found 夜校同学会 (other); position 夜校同学会会长 @org:curse15-borrowed:evt:world-vienna-1912:009368; state_add curse-bargain state:world-vienna-1912:590; reputation 0.02999999999999997; cash -1 (聘书与印花的费用); flag +curse_bargain_made_

- **1943.01** `state_reaction:wish-power/power-office` tags: wish-power, wish, wish:power, power, status, ambition, state, state_reaction
  Klara坐在那张有权力的桌子后面，签下自己的名字。愿望没有因此变近，但桌上的纸张、印章和等待回话的人，都变得具体了。
  _effects: reputation 0.06_
  _causes: evt:world-vienna-1912:009368_

- **1943.01** `state_reaction:mb17-remittance-web/family-emergency` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  故乡来了一封电报，说屋顶塌了一角，老人暂时住到邻居家。Klara当晚就去邮局，把本来留着交学费的钱先汇了出去；回家后，他把墙上的缴费单取下来，折好放进抽屉。
  _effects: state_parameter mb17-remittance-web.obligation 55 -> 65; state_parameter mb17-remittance-web.arrears 2 -> 3; cash -3 (an emergency money order sent home); mood -0.009999999999999676_
  _causes: evt:world-vienna-1912:009422_

- **1943.01** `state_tick:ld18-public-desire/the-story-changes-hands/a-new-version` tags: ld18-public-desire, desire, public, scandal, reputation, body, rumor, notoriety
  故事又换了一个版本：有人说Klara是为了钱，有人说是为了爱，还有人说她只是喜欢看别人议论。Klara在咖啡馆听见第三种说法，没有更正，只把杯子往窗边挪了挪；阳光照进来，她第一次觉得这些版本都离自己很远。
  _effects: state_parameter ld18-public-desire.rumorHeat 50 -> 46; state_parameter ld18-public-desire.spectacle 65 -> 67; mood 0.010000000000000009_

- **1943.01** `state_tick:mb17-remittance-web/remittance-year/month-behind` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  这个月厂里少发了工钱。Klara把汇款单填到一半又放下，先给房东送去一部分；夜里他给故乡写信，说“下个月一定补上”，写完把信纸折了三折，像怕它自己会开口。
  _effects: cash -1 (the rent was paid first); state_parameter mb17-remittance-web.arrears 3 -> 4; state_parameter mb17-remittance-web.obligation 65 -> 69; mood -0.010000000000000009_

- **1943.01** `r14-hist.hiding-room::ctx-vienna-authoritarian-1934::milieu-tenement/hid-in-the-attic` tags: sheltered_person, rescue, hiding, repression, vienna, urban, crisis, war
  Elisabeth Bauer 2把Gustav Winter带上阁楼，因为Gustav Winter是犹太人，证件已经被注销；床垫铺在烟囱后面，白天不能咳嗽，夜里才能下楼用盆。Klara每天多买一份面包，把配给证上的名字改成“表亲”，Mitzi Hofer问起时说是乡下来养病的。第一周最难，楼梯一响，Gustav Winter就把手按在墙上，等脚步过去。
  _effects: cash -10 (阁楼上的第三张床); food; flag +sheltered_a_jew; role; relation friend with person:evt:world-vienna-1912:001409:child_

- **1943.01** `state_reaction:mb17-remittance-web/wages-arrive` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  厂里补发了一笔拖欠的工钱。Klara没有先还杂货铺的账，而是去邮局多填了一张汇款单；回来的路上，他给自己买了一支最便宜的烟，站在桥上看了一会儿水，才把剩下的钱数清楚。
  _effects: cash 1 (the factory paid part of the arrears); state_parameter mb17-remittance-web.supportSent 4 -> 5; state_parameter mb17-remittance-web.obligation 69 -> 67; mood 0.010000000000000009_
  _causes: evt:world-vienna-1912:009657_

- **1943.03** `r3-war.occupation-scrip::ctx-vienna-authoritarian-1934::milieu-tenement/fined-for-trading` tags: war, occupation, currency, black_market, fraternization, vienna, urban, crisis
  Josef Weiss说与占领军私下交易要罚款，Klara把米缸底下的纸马克全交出去。Emil Winter再来时，Klara说“不卖了”；Emil Winter把一包糖放在门槛上，Klara没有捡，Rosa Huber替他收了起来。
  _effects: cash -6 (占领军口袋里的纸马克); mood -0.030000000000000027; flag +fined_for_trading_with_occupier; relation rival with person-materialized-world-vienna-1912-112; relation acquaintance with person-materialized-world-vienna-1912-36; relation acquaintance with person-materialized-world-vienna-1912-79_

- **1943.05** `p9-gap-adult-solitude.remake-coat/remake-coat.left-on-chair` tags: adulthood, daily, solitude, ordinary, home, mending, clothing, household
  Klara只把外套的里衬拆了一半，就搁在椅背上。冬天天短，她每天回来都看见那件敞着口子的外套，想着明天接着弄，明天又总是有别的事。到开春外套还搭在那儿，呢面上落了一层灰。
  _effects: flag +unfinished_coat_

- **1943.08** `r1-cul.spiritualist-seance::ctx-vienna-authoritarian-1934::milieu-tenement/table-rapped` tags: faith, seance, grief, fraud, occult, vienna, urban, crisis
  Klara在烛光里握着手，桌子敲了三下。Anna Berg闭着眼说，是一个穿军装的人。Franz Kral在角落里冷笑，伸手掀开桌布，下面只有一根细线；Anna Berg没有睁眼，说线是上一个客人留下的。
  _effects: cash -2 (桌子敲了三下); flag +attended_seance; relation acquaintance with person-materialized-world-vienna-1912-12; knowledge “a thin thread runs under the seance table”_

- **1944.01** `r14-hist.betrayal-search::ctx-vienna-authoritarian-1934::milieu-tenement/hidden-person-shot-in-the-courtyard` tags: betrayal, sheltered_person, raid, arrest, vienna, urban, crisis, war
  搜查队堵住后院时，Gustav Winter从晾衣绳下往巷口跑。Anton Kral喊了两次站住，第三声之后枪响了；Gustav Winter倒在煤棚边，手里还攥着Klara塞给的一张车票。Friedrich Kral 3站在楼梯口，说早就应该报告。Klara被允许回屋拿外套，经过院子时看见雪落在车票上，字很快化了。
  _effects: mood -0.010000000000000009; flag +hidden_person_killed; relation rival with person-materialized-world-vienna-1912-40; death (shot by a patrol in the courtyard while fleeing)_
  _causes: evt:world-vienna-1912:009643_

- **1944.01** `vienna-life-injury-recovery/clinic-treatment` tags: health, work, family
  Klara在受伤后的第三天去了诊所。医生清洗伤口、换药，收下诊费，嘱咐不要急着回机器旁。Klara把药方折好，回家路上买了纱布。
  _effects: health 0.050000000000000044 (wound treatment); cash -8 (clinic and bandages)_
  _causes: evt:world-vienna-1912:009371_

- **1944.01** `state_reaction:mb17-remittance-web/border-closes` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  边境又收紧了，往故乡的列车要换乘三次。邮局说汇款还能走，但信可能压在路上；Klara还是把两张单子一起递进窗口，像把一句话交给一个不保证送达的人。
  _effects: state_parameter mb17-remittance-web.arrears 4 -> 6_
  _causes: evt:world-vienna-1912:009836_

- **1944.01** `office16-admin.quiet-ledger::ctx-vienna-authoritarian-1934::milieu-tenement/small-surplus` tags: office, administration, budget, competence, quiet, power, vienna, urban
  账目连续第二年没有超支，Josef Weiss在报告里加了一句“未发现异常”。Klara用结余给夜班守卫换了炉子，又把旧账本按年份装进箱子；没有人写报道，但来办事的人发现窗口开得比从前早。
  _effects: organization_funds; reputation 0.06; skill; mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-112; flag +quiet_surplus; knowledge “审计报告里只有一句“未发现异常”，但窗口提前开门被办事的人记住了。”; relation acquaintance with person-materialized-world-vienna-1912-112_

- **1944.01** `state_expire:oj18-odd-apprenticeship` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  Klara的「奇职学徒」到期；相关安排结束。
  _effects: state_remove oj18-odd-apprenticeship state:world-vienna-1912:546; role; flag -odd_job_apprentice_

- **1944.01** `state_expire:curse-bargain` tags: curse-bargain, curse, ritual, wish, bargain, debt, secret, supernatural
  Klara的「诅咒的定金」到期；相关安排结束。
  _effects: state_remove curse-bargain state:world-vienna-1912:590; flag +curse_bargain_closed_

- **1944.01** `state_tick:ld18-public-desire/the-story-changes-hands/a-new-version` tags: ld18-public-desire, desire, public, scandal, reputation, body, rumor, notoriety
  故事又换了一个版本：有人说Klara是为了钱，有人说是为了爱，还有人说她只是喜欢看别人议论。Klara在咖啡馆听见第三种说法，没有更正，只把杯子往窗边挪了挪；阳光照进来，她第一次觉得这些版本都离自己很远。
  _effects: state_parameter ld18-public-desire.rumorHeat 46 -> 42; state_parameter ld18-public-desire.spectacle 67 -> 69; mood 0.010000000000000009_

- **1944.01** `agency:support_process` tags: agency, agency:support_process
  Klara想帮忙，但组织者不信任新来的人，只让其在外围等消息。
  _effects: mood -0.010000000000000009; reputation -0.010000000000000009_

- **1944.08** `vienna-social-movement.recruitment/join-and-carry` tags: development, social_movement, organization, politics
  Klara在楼梯下面接到一张折成四折的传单。纸上没有署名，只写着下一次集会的地址。Klara去了，在昏暗的屋里报上姓名，成为普拉特动物园夜班队的一员，并答应负责自己所在街区的联络。
  _effects: organization_membership; relation acquaintance with person-materialized-world-vienna-1912-105_

- **1945.01** `state_reaction:mb17-remittance-web/border-closes` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  边境又收紧了，往故乡的列车要换乘三次。邮局说汇款还能走，但信可能压在路上；Klara还是把两张单子一起递进窗口，像把一句话交给一个不保证送达的人。
  _effects: state_parameter mb17-remittance-web.arrears 6 -> 8_
  _causes: evt:world-vienna-1912:010246_

- **1945.01** `vienna-life-1945-liberation/survives` tags: war, liberation, 1945
  苏联士兵进城时，Klara躲在门后听见坦克履带压过石板路。几天后街口贴出告示，Klara去领了一份汤和一块面包。
  _effects: role; food; cash -2 (replacement documents)_

- **1945.01** `vienna-family-courtship/ask-to-share-a-home` tags: family, courtship, household, social, lifecycle
  Klara在Leopoldstädter Zinshaus, gemeinsamer Gang靠窗的桌边，把一只空咖啡杯转了半圈，说房租两人合付、桌子两人共用。Otto Huber的手停在糖罐盖上，问了一句“要是过不下去呢”，没有当场答应，只说要想一想；杯里的咖啡凉了，话还悬在桌面上。
  _effects: interaction_

- **1945.01** `r15-wish.found-faction::ctx-vienna-authoritarian-1934::milieu-tenement/nobody-came` tags: politics, power, wish, organization, office, status, vienna, urban
  第一次会议只来了三个人，其中一个是房东，来问房租。Klara把章程念完，没有人反对，也没有人加入。办公室的钥匙还在，但那间屋子比街上更安静。
  _effects: reputation -0.020000000000000018; flag +faction_failed_to_form_

- **1945.01** `state_tick:ld18-public-desire/the-story-changes-hands/strangers-know-best` tags: ld18-public-desire, desire, public, scandal, reputation, body, rumor, notoriety
  一个陌生女人在电车上叫住Klara，说自己认识她的“那位”，还劝她趁年轻找个正经人家。Klara没有回答，提前一站下了车；走在回家的路上，她发现自己的步子越来越快，像在躲一个并不存在的人。
  _effects: state_parameter ld18-public-desire.rumorHeat 42 -> 50; state_parameter ld18-public-desire.shame 10 -> 14; reputation -0.030000000000000027_

- **1945.01** `state_tick:mb17-remittance-web/remittance-year/month-behind` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  这个月厂里少发了工钱。Klara把汇款单填到一半又放下，先给房东送去一部分；夜里他给故乡写信，说“下个月一定补上”，写完把信纸折了三折，像怕它自己会开口。
  _effects: cash -1 (the rent was paid first); state_parameter mb17-remittance-web.arrears 8 -> 9; state_parameter mb17-remittance-web.obligation 67 -> 71_

- **1945.01** `state_reaction:mb17-remittance-web/wages-arrive` tags: mb17-remittance-web, migration, remittance, household, obligation, money, diaspora, state
  厂里补发了一笔拖欠的工钱。Klara没有先还杂货铺的账，而是去邮局多填了一张汇款单；回来的路上，他给自己买了一支最便宜的烟，站在桥上看了一会儿水，才把剩下的钱数清楚。
  _effects: cash 1 (the factory paid part of the arrears); state_parameter mb17-remittance-web.supportSent 5 -> 6; state_parameter mb17-remittance-web.obligation 71 -> 69; mood 0.010000000000000009_
  _causes: evt:world-vienna-1912:010668_

- **1945.01** `kernel-family.housing-relative::ctx-vienna-postwar-1945::milieu-tenement/housing-relative.taken-in` tags: task, task:family, family, housing, relatives, godparent, guardian, household
  教父Franz Berg的房东把阁楼收回，Klara把自家床边的空地量了量，还是让教父把箱子搬进来。Klara在床和墙之间搭了一块木板，夜里翻身会碰到箱子；房东来收租时看见多了一个人，说下个月要加两克朗。
  _effects: household; relation kin with person-materialized-world-vienna-1912-57; role; cash -5 (extra rent, coal and food for the relative); food; role; flag +overcrowded_flat; knowledge “房东说添一个人住，下个月要加两克朗房租。”_

- **1946.01** `statistical_death/other` tags: death
  Klara在Leopoldstädter Zinshaus, gemeinsamer Gang突发急病，高热和虚弱持续了几天。医生没能给出明确诊断，Klara在一个夜里去世。Elisabeth Bauer 2在场。
  _effects: death (急性疾病); flag -public_desire_active_
## Mitzi

Born 1912.01, died 1928.01 (age 16).
Education: none 0; occupation: none; roles: infant, child.

### State snapshot
- wish-knowledge [person] (ended 1928.1: owner_died) parameters={"intensity":0.55,"fixation":0.5,"irony":0.3} links={} ticks=1
- p22-family-legend [person] (ended 1912.11: replaced_by:p22-family-legend) parameters={"warmth":67,"secrecy":14,"danger":5,"promise":45} links={} ticks=0
- p22-family-legend [person] (ended 1913.12: replaced_by:p22-family-legend) parameters={"warmth":75,"secrecy":23,"danger":8,"promise":60} links={} ticks=1
- p22-family-legend [person] (ended 1913.8: replaced_by:p22-family-legend) parameters={"warmth":65,"secrecy":50,"danger":10,"promise":40} links={} ticks=0
- p22-family-legend [person] (ended 1919.1: duration expired) parameters={"warmth":33,"secrecy":92,"danger":61,"promise":40} links={} ticks=3

### 38 subject events

- **1912.06** `p22-comic-name-register::ctx-vienna-1912::milieu-tenement/the-clerk-hears-a-sneeze` tags: infancy, family, bureaucracy, name, official, comic, tender, drama
  登记员把Mitzi打喷嚏的声音当成了名字，低头就写，笔尖还在舌头上蘸了蘸。Rosa Lechner抱着孩子，没看见那行字；等到拿着纸回家，才发现孩子的名字里多了一个“嚏”。
  _effects: mood 0.04; knowledge “登记簿上孩子的名字被写成了喷嚏声。”; flag +registered_as_hatschi; state_add p22-family-legend state:world-vienna-1912:23_

- **1912.06** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Mitzi家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 10 -> 14; state_parameter p22-family-legend.warmth 65 -> 67; mood 0.01_
  _causes: evt:world-vienna-1912:000116_

- **1912.11** `vienna-life-birth-letter-from-the-dead/the-letter-is-real` tags: infancy, family, secret, letter, drama
  邮差把一封边角磨白的信塞进门缝，收信人是一个已经死了三年的名字。Rosa Lechner把Mitzi放在膝上，拆开信，里面只有一句：“孩子像不像他？”Anna Moser在门口探头，问是不是寄错了；Rosa Lechner把信折回去，说“没有寄错”。
  _effects: flag +letter_from_dead_relative; knowledge “一封写给死去亲人的信问：孩子像不像他。”; mood -0.04_

- **1912.11** `p22-warm-naming-feast::ctx-vienna-1912::milieu-tenement/the-name-is-too-long` tags: infancy, family, feast, name, neighbor, warm, tender, drama
  两个祖母的名字都想要，最后写在纸上连成一串。Hermann Kral念到一半就笑了，说这孩子以后签名字要多蘸一次墨水；Mitzi在摇篮里睡着，拳头举在耳边，蛋糕上只插了一根蜡烛。
  _effects: mood 0.04; relation acquaintance with person-phase15-Mitzi-world-vienna-1912; flag +double_name; knowledge “我的名字里有两个祖母的名字。”; state_add p22-family-legend state:world-vienna-1912:24_

- **1912.11** `vienna-life-infant-first-smile/smile-at-the-lamp` tags: infancy, family, first, warm
  Rosa Lechner把Mitzi抱到窗边，煤汽灯罩上有一圈晃动的光。孩子盯着看了很久，忽然笑出声，口水滴在Rosa Lechner的袖口上。屋里的人都停了一下，像是听见了什么了不起的消息。
  _effects: mood 0.04; health 0.010000000000000009 (a good day)_

- **1913.01** `state_tick:p22-family-legend/the-story-changes-hands/a-detail-goes-missing` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，故事里最要紧的那件东西不见了：先是名字，后来是地点。Mitzi问起时，大人说“你记错了”；可柜子最底层那只空盒子，谁也没有扔，锁却换过了，钥匙也不见了。
  _effects: state_parameter p22-family-legend.secrecy 15 -> 19; state_parameter p22-family-legend.danger 5 -> 8; state_parameter p22-family-legend.warmth 75 -> 73; mood -0.01_

- **1913.08** `p22-strange-cradle-secret::ctx-vienna-1912::milieu-tenement/the-bundle-in-the-lining` tags: infancy, family, cradle, secret, inheritance, strange, dark, drama
  Rosa Lechner拆洗摇篮衬里时，摸到一个硬角：一小块油布，里面包着一张当票和一缕头发，当票上的日期已经模糊。Rosa Lechner看了很久，又把油布缝回去，针脚比原来更密。
  _effects: state_add p22-family-legend state:world-vienna-1912:46; mood -0.03; flag +cradle_bundle; knowledge “摇篮衬里藏着一张当票和一缕头发。”_

- **1913.11** `vienna-infant-household.croup/doctor-call` tags: infancy, health, family, home
  Rosa Lechner打发邻居去请街角的医生。医生提着皮包来，听了听胸口，留下半瓶药水，收走一克朗。Mitzi三天后不再咳得蜷成一团。
  _effects: cash -1 (医生出诊费和药水钱); health 0.009999999999999787 (服了止咳药水); relation acquaintance with person-hermann-kral_

- **1913.12** `p22-warm-anonymous-gifts::ctx-vienna-1912::milieu-tenement/a-parcel-of-coal` tags: infancy, family, gift, poverty, neighbor, warm, mystery, drama
  门口多了一小包煤，用旧报纸裹着，纸上没有字，还沾着一点面粉。Rosa Lechner追到楼梯口，只看见一个穿灰外套的人拐过街角；那堆煤让屋里暖了整整一个星期。
  _effects: cash 3 (anonymous coal saved fuel money); mood 0.03; flag +anonymous_gift_coal; state_add p22-family-legend state:world-vienna-1912:45_

- **1914.01** `vienna-life-toddler-wrong-cradle/the-blanket-is-wrong` tags: infancy, family, rumour, identity, comic, drama
  Gustav Berg盯着Mitzi的摇篮看了很久，说这床蓝被子不是这家人的。Rosa Lechner把被子翻过来，角落绣着一个陌生的姓；Mitzi却抓着被角不放，像是认得它。Gustav Berg退后一步，说“我什么都没说”。
  _effects: flag +wrong_cradle_blanket; knowledge “摇篮里的蓝被子绣着一个陌生的姓。”; mood -0.03_

- **1914.01** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Mitzi家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 19 -> 23; state_parameter p22-family-legend.warmth 73 -> 75; mood 0.01_
  _causes: evt:world-vienna-1912:000278_

- **1914.01** `state_tick:p22-family-legend/the-story-changes-hands/a-detail-goes-missing` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，故事里最要紧的那件东西不见了：先是名字，后来是地点。Mitzi问起时，大人说“你记错了”；可柜子最底层那只空盒子，谁也没有扔，锁却换过了，钥匙也不见了。
  _effects: state_parameter p22-family-legend.secrecy 80 -> 84; state_parameter p22-family-legend.danger 55 -> 58; state_parameter p22-family-legend.warmth 35 -> 33; mood -0.01_

- **1914.08** `statistical_infection`
  Mitzi在Lechner-Wohnung, Leopoldstadt病倒了，肺炎让身体发热、虚弱，接下来的日子只能卧床。

- **1914.09** `statistical_illness_worsened`
  Mitzi的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1914.12** `statistical_illness_worsened`
  Mitzi的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1915.01** `vienna-life-child-family-legend/lost-relative` tags: childhood, family, secret, story
  Rosa Lechner在收拾箱子时翻出一张没有署名的照片，说那是家里一个“去了很远地方”的人。Mitzi问还回不回来，Rosa Lechner把照片翻过去，说先把名字记住，别在饭桌上问。
  _effects: knowledge “家里有一张没有署名的照片，照片上的人去了很远的地方。”; flag +family_legend_photo; mood -0.01_

- **1915.01** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Mitzi家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 84 -> 88; state_parameter p22-family-legend.warmth 33 -> 35; mood 0.01_
  _causes: evt:world-vienna-1912:000440_

- **1915.02** `statistical_recovery`
  Mitzi熬过了这场肺炎，能坐起来喝一点汤，但身体还很虚。

- **1916.01** `vienna-life-child-first-friend/shared-toy` tags: childhood, friendship, family, comic
  Hedwig在楼道里滚一只铁环，Mitzi站在门口看。Hedwig把铁环推过来，说“你推一次，我推一次”。两个人从楼梯口推到院子里，铁环倒下的声音把午睡的大人吵醒了一排。
  _effects: relation friend with person-phase15-Hedwig-world-vienna-1912; skill; mood 0.05_

- **1916.05** `statistical_infection`
  Mitzi在Leopoldstädter Zinshaus, gemeinsamer Gang病倒了，肺炎让身体发热、虚弱，接下来的日子只能卧床。

- **1916.06** `statistical_illness_worsened`
  Mitzi的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1916.07** `statistical_recovery`
  Mitzi从肺炎中慢慢恢复，能下床喝水，但身体还虚弱。

- **1917.01** `state_tick:p22-family-legend/the-story-changes-hands/a-detail-goes-missing` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，故事里最要紧的那件东西不见了：先是名字，后来是地点。Mitzi问起时，大人说“你记错了”；可柜子最底层那只空盒子，谁也没有扔，锁却换过了，钥匙也不见了。
  _effects: state_parameter p22-family-legend.secrecy 88 -> 92; state_parameter p22-family-legend.danger 58 -> 61; state_parameter p22-family-legend.warmth 35 -> 33; mood -0.010000000000000002_

- **1918.01** `p9-gap-childhood-chores.laundry-help/laundry-three-heller` tags: childhood, household, chores, school, task, daily, laundry, work
  床单浸了碱水，沉得拽不动。Mitzi站在木凳上，把湿布一点点递过绳，水顺着肘弯滴进袖口。Grete Stein在绳头数夹子，最后一条挂好，从围裙口袋里摸出三枚赫勒，按进Mitzi掌心。晚上洗手时，虎口那道口子被水一蜇，Mitzi才看见。
  _effects: cash 0.03 (帮邻居晾床单挣的三赫勒); health -0.030000000000000027 (碱水泡手，虎口裂开); relation acquaintance with person-grete-stein_

- **1919.01** `state_expire:p22-family-legend` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  Mitzi的「家族传说」到期；相关安排结束。
  _effects: state_remove p22-family-legend state:world-vienna-1912:46_

- **1919.01** `p9-gap-childhood-chores.market-line/line-half-flour` tags: childhood, household, chores, school, task, daily, market, food
  队伍从面包房门口拐进巷子，Mitzi把布袋夹在腋下，学着前面人的样子，用胳膊肘顶住后面人的篮子。窗口的伙计舀面粉时，Mitzi踮脚看着秤，直到半袋面倒进袋口。挤出人群时鞋跟被踩掉，Mitzi单脚跳了两步，在泥里摸回鞋，索性赤脚走回家。
  _effects: food; health -0.020000000000000018 (赤脚走石板路磨伤脚底); skill; relation acquaintance with person-materialized-world-vienna-1912-2_

- **1920.01** `p9-gap-childhood-chores.laundry-help/laundry-three-heller` tags: childhood, household, chores, school, task, daily, laundry, work
  “拽平，别留褶。”Karl Kraus在绳子那头喊。Mitzi踮着脚把床单拉直，碱水把指缝泡得发白。收工时天已经黑了，Karl Kraus数了三赫勒，又在围裙上擦干手才递过来。Mitzi把钱塞进袜筒，回家路上一直攥着，虎口的裂口沾了汗，火辣辣地疼。
  _effects: cash 0.03 (帮邻居晾床单挣的三赫勒); health -0.030000000000000027 (碱水泡手，虎口裂开); relation acquaintance with person-karl-kraus_

- **1920.09** `vienna-childhood-friends.courtyard-race/won-the-race-lost-a-button` tags: childhood, social, school, street
  Mitzi跑到第二圈时鞋带松了，索性踩着鞋后跟跑。最后一圈，Mitzi从床单底下钻过去，先拍到墙。Berta Weiss喘着气，把两颗弹珠拍进Mitzi手心。Mitzi低头才发现外套少了一颗扣子；窗口的Berta Weiss扔下一根别针，说先别着。
  _effects: mood 0.049999999999999996; relation acquaintance with person-berta-weiss_

- **1921.01** `p9-gap-childhood-chores.market-line/line-half-flour` tags: childhood, household, chores, school, task, daily, market, food
  面粉袋压在胸口，越抱越沉。Mitzi前面的大婶一直往后靠，Mitzi就把膝盖顶住对方的篮子，硬留出半步。买到半袋面粉后，Mitzi的鞋跟留在人堆里，找回来时鞋面全是泥。回家路上布袋换了两次肩，赤脚踩过石板时脚底发麻。
  _effects: food; health -0.020000000000000018 (赤脚走石板路磨伤脚底); skill_

- **1922.01** `p9-gap-childhood-chores.laundry-help/laundry-bread-with-friend` tags: childhood, household, chores, school, task, daily, laundry, work
  两个孩子在院子两头跑，一个递，一个夹，床单在风里鼓起来。最后一条挂好，Franz Lechner从厨房拿出面包，先给了自家孩子，再掰一块给Mitzi。Mitzi把面包塞进围裙口袋，回家后放在家里人的碗边，说自己在外面吃过了。
  _effects: food; relation acquaintance with person-franz-lechner; skill; relation acquaintance with person-materialized-world-vienna-1912-17_

- **1922.01** `vienna-childhood-friends.courtyard-race/won-the-race-lost-a-button` tags: childhood, social, school, street
  Mitzi跑到第二圈时鞋带松了，索性踩着鞋后跟跑。最后一圈，Mitzi从床单底下钻过去，先拍到墙。Katharina Bauer 2喘着气，把两颗弹珠拍进Mitzi手心。Mitzi低头才发现外套少了一颗扣子；窗口的Katharina Bauer 2扔下一根别针，说先别着。
  _effects: mood 0.05000000000000002; relation acquaintance with person-materialized-world-vienna-1912-32; relation acquaintance with person-materialized-world-vienna-1912-32_

- **1923.01** `p9-gap-childhood-chores.market-line/line-half-flour` tags: childhood, household, chores, school, task, daily, market, food
  面粉袋压在胸口，越抱越沉。Mitzi前面的大婶一直往后靠，Mitzi就把膝盖顶住对方的篮子，硬留出半步。买到半袋面粉后，Mitzi的鞋跟留在人堆里，找回来时鞋面全是泥。回家路上布袋换了两次肩，赤脚踩过石板时脚底发麻。
  _effects: food; health -0.020000000000000018 (赤脚走石板路磨伤脚底); skill_

- **1924.01** `state_tick:wish-knowledge/knowledge-pressure/press-on` tags: wish-knowledge, wish, wish:knowledge, knowledge, education, curiosity, state, state_tick
  Mitzi又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.020000000000000004; flag +wish:knowledge:pursuing_

- **1924.02** `vienna-youth-threshold.sibling-departure/quarrel-who-leaves` tags: adolescence, school, work, family, transition, injury
  车票只够一个人走，晚饭桌上话越说越大声。Franz Lechner说该自己走，Mitzi说自己也快够岁数了。母亲把汤勺往锅沿一磕，屋里静下来，最后Mitzi摔门出去在楼梯上坐了半宿，直到楼上有人喊冷。
  _effects: relation kin with person-franz-lechner; mood -0.07; health -0.030000000000000027 (在冰冷的楼梯上坐到半夜)_

- **1926.01** `p9-childhood-youth-aspiration.join-a-club/joined-and-borrowed` tags: adolescence, education, aspiration, school, books, club, exam, task
  Mitzi跟着Otto Weiss走进印刷厂后面的屋子，交了十赫勒会费，在借书簿上按了手印。他挑了一本讲蒸汽机的册子，封面烫金已经磨掉；管理员说下月十赫勒要按时交，书才能续借。
  _effects: cash -0.1 (工人青年会月费); skill; relation friend with person-materialized-world-vienna-1912-29; flag +workers_youth_member; mood 0.039999999999999994; relation acquaintance with person-materialized-world-vienna-1912-29_

- **1926.11** `p9-childhood-adolescence.secret-in-the-stairwell/secret-ask-worker` tags: adolescence, friendship, identity, work, school, secret, church
  Mitzi去找Elisabeth Hofer，问能不能让Otto Hofer留在纸料间。Elisabeth Hofer搓着手上洗不掉的墨，说要照规矩通知教区，否则厂里担不起。Mitzi回来的路上一直看自己的鞋尖。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-50; relation friend with person:evt:world-vienna-1912:000061:child; mood -0.03; relation acquaintance with person-materialized-world-vienna-1912-50_

- **1927.01** `agency:join_organization` tags: agency, agency:join_organization
  Mitzi通过熟人介绍加入了Die Fackel，在名册上写下住址，并答应参加下一次聚会。
  _effects: organization_membership; relation acquaintance with person-karl-kraus_

- **1928.01** `statistical_death/other` tags: death
  Mitzi在Leopoldstädter Zinshaus, gemeinsamer Gang突发急病，高热和虚弱持续了几天。医生没能给出明确诊断，Mitzi在一个夜里去世。Franz Lechner在场。
  _effects: death (急性疾病)_
## Josef

Born 1912.01, alive at 1957.
Education: none 0; occupation: none; roles: infant, child, day_laborer, police_record, refugee, tenant_organizer, neighbourhood_helper, partner, office:夜班饲养员.

### State snapshot
- wish-craft [person] (active) parameters={"intensity":0.55,"fixation":0.5,"irony":0.3} links={} ticks=9
- p22-family-legend [person] (ended 1917.1: duration expired) parameters={"warmth":83,"secrecy":15,"danger":5,"promise":64} links={} ticks=3
- hs18-street-witness [person] (ended 1948.1: duration expired) parameters={"certainty":63,"danger":75,"retellings":2,"claim":"我没签字，但看见是谁搬走了钢琴。","quiet":false} links={} ticks=6
- ad20-public-attention [person] (ended 1947.1: duration expired) parameters={"attention":36,"sympathy":51,"danger":10,"opportunity":54} links={} ticks=2
- oj18-odd-apprenticeship [person] (ended 1951.1: duration expired) parameters={"trust":24,"strangeKnowledge":38,"reliability":45,"nightsWorked":24,"post":"动物园夜班饲养员"} links={} ticks=3
- oj18-workplace-legend [person] (ended 1952.1: duration expired) parameters={"legend":23,"truth":57,"oddity":35,"toldCount":1} links={} ticks=2

### 173 subject events

- **1912.02** `p22-warm-naming-feast::ctx-vienna-1912::milieu-tenement/the-name-is-too-long` tags: infancy, family, feast, name, neighbor, warm, tender, drama
  两个祖母的名字都想要，最后写在纸上连成一串。Emil Weiss念到一半就笑了，说这孩子以后签名字要多蘸一次墨水；Josef在摇篮里睡着，拳头举在耳边，蛋糕上只插了一根蜡烛。
  _effects: mood 0.04; relation acquaintance with person-phase15-Josef-world-vienna-1912; flag +double_name; knowledge “我的名字里有两个祖母的名字。”; state_add p22-family-legend state:world-vienna-1912:20_

- **1912.07** `p22-comic-christening::ctx-vienna-1912::milieu-tenement/the-candle-hits-the-font` tags: infancy, family, christening, church, neighbor, comic, tender, drama
  蜡烛从烛台上滑下来，正掉进洗礼盆，水花溅了Emil Weiss一脸，洗礼盆里的水晃了很久。Josef吓得大哭，Emil Weiss的帽子却浮在水面上，像一只黑色的船；孩子的鞋也湿了一只。
  _effects: mood -0.02; relation acquaintance with person-katharina-bauer; cash -1 (a ruined hat); condition_

- **1913.01** `vienna-life-infant-first-smile/colic-night` tags: infancy, family, first, warm, injury
  夜里Josef哭了很久，Katharina Bauer抱着孩子在屋里来回走，数着地板缝。天快亮时孩子终于打了个嗝，安静下来；Katharina Bauer坐在床沿，发现自己还保持着走路的姿势。
  _effects: mood -0.03; health -0.010000000000000009 (lost sleep)_

- **1913.01** `state_tick:p22-family-legend/the-story-changes-hands/told-at-the-table` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，Josef家的故事在饭桌上换了新的讲法：多了一句笑话，少了一处哭声。听的人把汤匙放下，等下一句；讲故事的人却先去看窗子有没有关好，谁也没有先动筷子。
  _effects: state_parameter p22-family-legend.warmth 75 -> 78; state_parameter p22-family-legend.secrecy 15 -> 13; state_parameter p22-family-legend.promise 60 -> 62; mood 0.01_

- **1913.02** `vienna-life-toddler-first-words/first-word-more` tags: infancy, family, first, comic
  Josef把空碗推回Katharina Bauer面前，清清楚楚地说了一个字：“还要。”Katharina Bauer愣住，随后把锅底最后一点糊刮进碗里。孩子学会了用一句话让世界再转一圈。
  _effects: skill; mood 0.03_

- **1913.10** `vienna-life-toddler-wrong-cradle/the-swap-story-spreads` tags: infancy, family, rumour, identity, comic, drama
  三天后，整条楼道都在说这家的孩子“抱错了”。Katharina Bauer抱着Josef去敲Anna Moser的门，Anna Moser不开，只在门里说“我也是听来的”。Josef在母亲怀里睡着了，口水把她的领口洇出一小片深色。
  _effects: flag +cradle_swap_rumour; relation rival with person-anna-moser; mood -0.05_

- **1914.01** `vienna-life-birth-letter-from-the-dead/the-neighbour-takes-it` tags: infancy, family, secret, letter, drama
  Hermann Kral把信从门缝里抽走，说这封信已经转过三家，不该再往这里送。Katharina Bauer问上面写了什么；Hermann Kral把信折成四折塞进自己口袋，说“都是旧账”。那天夜里，Katharina Bauer在厨房坐到很晚。
  _effects: flag +neighbor_intercepted_letter; mood -0.02_

- **1914.01** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Josef家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 13 -> 17; state_parameter p22-family-legend.warmth 78 -> 80; mood 0.01_
  _causes: evt:world-vienna-1912:000270_

- **1915.01** `vienna-life-child-family-legend/lost-relative` tags: childhood, family, secret, story
  Katharina Bauer在收拾箱子时翻出一张没有署名的照片，说那是家里一个“去了很远地方”的人。Josef问还回不回来，Katharina Bauer把照片翻过去，说先把名字记住，别在饭桌上问。
  _effects: knowledge “家里有一张没有署名的照片，照片上的人去了很远的地方。”; flag +family_legend_photo; mood -0.01_

- **1916.01** `vienna-life-child-first-friend/shared-toy` tags: childhood, friendship, family, comic
  Klara在楼道里滚一只铁环，Josef站在门口看。Klara把铁环推过来，说“你推一次，我推一次”。两个人从楼梯口推到院子里，铁环倒下的声音把午睡的大人吵醒了一排。
  _effects: relation friend with person-phase15-Klara-world-vienna-1912; skill; mood 0.05_

- **1916.01** `state_tick:p22-family-legend/the-story-changes-hands/told-at-the-table` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，Josef家的故事在饭桌上换了新的讲法：多了一句笑话，少了一处哭声。听的人把汤匙放下，等下一句；讲故事的人却先去看窗子有没有关好，谁也没有先动筷子。
  _effects: state_parameter p22-family-legend.warmth 80 -> 83; state_parameter p22-family-legend.secrecy 17 -> 15; state_parameter p22-family-legend.promise 62 -> 64; mood 0.010000000000000002_

- **1917.01** `state_expire:p22-family-legend` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  Josef的「家族传说」到期；相关安排结束。
  _effects: state_remove p22-family-legend state:world-vienna-1912:20_

- **1918.01** `p9-gap-childhood-chores.market-line/line-half-flour` tags: childhood, household, chores, school, task, daily, market, food
  面粉袋压在胸口，越抱越沉。Josef前面的大婶一直往后靠，Josef就把膝盖顶住对方的篮子，硬留出半步。买到半袋面粉后，Josef的鞋跟留在人堆里，找回来时鞋面全是泥。回家路上布袋换了两次肩，赤脚踩过石板时脚底发麻。
  _effects: food; health -0.020000000000000018 (赤脚走石板路磨伤脚底); skill; relation acquaintance with person-materialized-world-vienna-1912-2_

- **1919.01** `p9-gap-childhood-chores.laundry-help/laundry-three-heller` tags: childhood, household, chores, school, task, daily, laundry, work
  “拽平，别留褶。”Anna Moser在绳子那头喊。Josef踮着脚把床单拉直，碱水把指缝泡得发白。收工时天已经黑了，Anna Moser数了三赫勒，又在围裙上擦干手才递过来。Josef把钱塞进袜筒，回家路上一直攥着，虎口的裂口沾了汗，火辣辣地疼。
  _effects: cash 0.03 (帮邻居晾床单挣的三赫勒); health -0.030000000000000027 (碱水泡手，虎口裂开); relation acquaintance with person-anna-moser_

- **1919.02** `vienna-childhood-street.cigarette-card/card-trade` tags: childhood, street, social, home
  “三张换一张。”Klara把皇帝像在Josef眼前晃了晃。Josef数出三张攒了半年的烟画，一张张递过去。皇帝像到手还没捂热，Klara已经推开杂货铺的门，用同一张卡换了糖。Josef把卡举到光下看，觉得皇帝的脸有点歪。
  _effects: mood 0.039999999999999994; relation friend with person-phase15-Klara-world-vienna-1912_

- **1920.01** `p9-gap-childhood-chores.market-line/line-sold-out-potatoes` tags: childhood, household, chores, school, task, daily, market, food
  木窗“咔”地合上，Josef的布袋还敞着口。伙计隔着板缝说下星期再来。Josef在墙根站了一会儿，把硬币排在掌心数了两遍，走到旁边土豆摊前，挑了几个小的，让摊主当面过秤。家里人晚上把钱和土豆倒在桌上，重新数了一遍。
  _effects: food; mood -0.03; skill; relation acquaintance with person-materialized-world-vienna-1912-18; relation acquaintance with person-materialized-world-vienna-1912-13_

- **1921.01** `p9-gap-childhood-chores.laundry-help/laundry-bread-with-friend` tags: childhood, household, chores, school, task, daily, laundry, work
  两个孩子在院子两头跑，一个递，一个夹，床单在风里鼓起来。最后一条挂好，Emil Huber从厨房拿出面包，先给了自家孩子，再掰一块给Josef。Josef把面包塞进围裙口袋，回家后放在家里人的碗边，说自己在外面吃过了。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-18; skill; relation acquaintance with person-materialized-world-vienna-1912-10_

- **1922.01** `p9-gap-childhood-chores.market-line/line-both-families` tags: childhood, household, chores, school, task, daily, market, food
  队伍拐弯时，Emil Weiss朝Josef招手。Josef挤过去，替两家把面包领出来，纸包用不同的绳结系住。家里人晚上解开绳结，先掂了掂份量，再问价钱；Josef把每一包的面包数、找零和欠的铜板都说了一遍，家里人听完才把两包分别收进柜子。
  _effects: food; skill; relation acquaintance with person-materialized-world-vienna-1912-36_

- **1922.04** `vienna-childhood-street.cigarette-card/card-gift` tags: childhood, street, social, home
  烟草店的门铃响一次，Josef就往柜台边挪一步。Klara终于从柜台底下抽出一张风景卡，用手掌抹了抹，还是皱的。“拿去吧。”Klara说完就去招呼别的客人。Josef把卡举到鼻子前闻，一股烟草味，回家路上把多出来的一张卡分给Klara看。
  _effects: mood 0.06; reputation 0.02; relation friend with person-phase15-Klara-world-vienna-1912_

- **1923.01** `p9-gap-childhood-chores.laundry-help/laundry-three-heller` tags: childhood, household, chores, school, task, daily, laundry, work
  床单浸了碱水，沉得拽不动。Josef站在木凳上，把湿布一点点递过绳，水顺着肘弯滴进袖口。Hermann Kral在绳头数夹子，最后一条挂好，从围裙口袋里摸出三枚赫勒，按进Josef掌心。晚上洗手时，虎口那道口子被水一蜇，Josef才看见。
  _effects: cash 0.03 (帮邻居晾床单挣的三赫勒); health -0.030000000000000027 (碱水泡手，虎口裂开); relation acquaintance with person-hermann-kral_

- **1924.01** `state_tick:wish-craft/craft-pressure/press-on` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_tick
  Josef又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.01999999999999999; flag +wish:craft:pursuing_

- **1924.01** `task-vienna-youth-apprenticeship-search/trial-promised` tags: task, task:work, work, adolescence, apprenticeship
  Josef在印刷厂门口等到工头出来，把姓名、住址和会写的字报了一遍。Gustav Berg 2让他下周一早来试半天，先不给工钱，只管一顿午饭。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-22; flag +apprenticeship_trial_promised; mood 0.05000000000000002; relation acquaintance with person-materialized-world-vienna-1912-22_

- **1925.01** `task-vienna-poor-apprentice.foreman-introduction/relative-introduces-trial-half-day` tags: adolescence, apprentice, work, education, poverty, printshop, task, task:work
  亲戚把他带到工头面前，工头让他下星期来试半天，先看裁纸和搬版。母亲熨平的衬衫领子还是硬得硌脖子，他站在厂门口把姓名说了两遍。
  _effects: flag +half_day_trial_at_big_printshop; relation acquaintance with person-otto-winter; mood 0.04999999999999999_

- **1926.01** `p9-childhood-youth-aspiration.save-for-books/installment-deal` tags: adolescence, education, aspiration, school, books, club, exam, task
  Luise Lechner 2把书翻到扉页，用铅笔写上日期和两克朗的欠额。Josef把学生证放到柜台上的铁盒里，出门时回头看了一眼，证上那张照片拍得比本人精神。
  _effects: cash -1 (旧书首付（其中1克朗记入债务）); flag +book_debt_2kr; skill; relation acquaintance with person-materialized-world-vienna-1912-55; relation acquaintance with person-materialized-world-vienna-1912-55_

- **1927.01** `p9-childhood-apprenticeship.ask-for-trial/too-young-refused` tags: adolescence, work, apprenticeship, labour, training, family, task, task:work
  Gustav Berg 2把Josef的袖子往上捋了捋，看了看手腕，说骨头还没长开，搬不动整摞的纸。Josef没走，蹲在门口把被风刮散的纸边捡回筐里。Gustav Berg 2给了两个赫勒，挥手赶人；Josef沿着街把另外两家作坊的门牌记下，才回家。
  _effects: cash 0.2 (替作坊捡纸边得到的两个赫勒); mood -0.04000000000000001; flag +seeking_work_

- **1927.01** `p9-childhood-adolescence.secret-in-the-stairwell/secret-ask-worker` tags: adolescence, friendship, identity, work, school, secret, church
  Josef去找Friedrich Bauer，问能不能让Elisabeth Bauer留在纸料间。Friedrich Bauer搓着手上洗不掉的墨，说要照规矩通知教区，否则厂里担不起。Josef回来的路上一直看自己的鞋尖。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-39; mood -0.03; relation acquaintance with person-materialized-world-vienna-1912-39_

- **1928.01** `state_tick:wish-craft/craft-pressure/put-away` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_tick
  Josef暂时把那件事收进抽屉；日子还有别的东西要应付。
  _effects: mood -0.01999999999999999_

- **1928.01** `task-vienna-poor-apprentice.foreman-introduction/relative-introduces-trial-half-day` tags: adolescence, apprentice, work, education, poverty, printshop, task, task:work
  亲戚把他带到工头面前，工头让他下星期来试半天，先看裁纸和搬版。母亲熨平的衬衫领子还是硬得硌脖子，他站在厂门口把姓名说了两遍。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-59; mood 0.05000000000000002; relation acquaintance with person-materialized-world-vienna-1912-59_

- **1929.01** `task-vienna-youth-apprenticeship-search/no-vacancy` tags: task, task:work, work, adolescence, apprenticeship
  Josef问了三家印刷厂，得到的回答都是“今年不收学徒”。最后一家让他把名字写在纸角上，说有空缺再通知，但谁都知道那张纸会被压在账本下面。
  _effects: mood -0.04999999999999999; knowledge “今年印刷厂大多不收新学徒。”_

- **1930.01** `major-work-first-employment/hired-by-the-day` tags: work, employment, unemployment, major
  Buchdruckerei Winter & Söhne只招日工。Josef天亮前到门口，名字写在临时名单上，干一天算一天，一天一克朗，月底结二十六克朗。工头说下个月可能有正式位置，也可能没有；Josef把每天的工时记在烟盒背面，怕漏掉一天。
  _effects: employment Tagelöhner @ org-winter-print; role; cash 2 (first daily pay advance); relation colleague with person-materialized-world-vienna-1912-55; flag +day_labour_only_

- **1930.01** `vienna-family-courtship/ask-to-share-a-home` tags: family, courtship, household, social, lifecycle
  Josef在Bauer-Wohnung, Leopoldstadt靠窗的桌边，把一只空咖啡杯转了半圈，说房租两人合付、桌子两人共用。Katharina Bauer 2的手停在糖罐盖上，问了一句“要是过不下去呢”，没有当场答应，只说要想一想；杯里的咖啡凉了，话还悬在桌面上。
  _effects: interaction; relation acquaintance with person-materialized-world-vienna-1912-32_

- **1930.01** `p10-edu-work-tasks.seek-apprenticeship/p10-edu-work-tasks.seek-apprenticeship.test-piece` tags: adulthood, education, work, task, night_school, apprenticeship, career, craft
  作坊里的学徒都在看。他把第三个榫头装上去，木槌敲了两下才到位。Grete Stein 2说带一个来，明天。他把废料收进工具袋，出了门才发现袖子沾满木屑。
  _effects: skill; mood -0.04000000000000001; relation acquaintance with person-materialized-world-vienna-1912-63; relation acquaintance with person-materialized-world-vienna-1912-63; relation acquaintance with person-materialized-world-vienna-1912-45_

- **1930.02** `p9-social-tenement-neighbors.flour-loan/flour-loan.half-bag-with-note` tags: housing, neighbors, tenement, daily, money, reputation
  Josef只舀出半袋，说自家也不宽裕，要Anna Moser把上次的煤钱一并记在纸上。Anna Moser接过纸片，当着面把日期和数目重写一遍，两人各留一半。面粉少了，账却清楚了，Josef把纸片夹进账簿样的旧本子。
  _effects: food; relation acquaintance with person-anna-moser_

- **1930.02** `vienna-family-same-sex-male/denounced-to-police` tags: family, intimacy, same_sex, persecution, lifecycle, partnership, injury, unemployment
  旅店伙计记下了Josef和Franz Bauer的名字。几天后警察来敲门，把两人带去问话；Josef丢了工位，罚了八克朗，Franz Bauer的家里把人接走。Josef在档案里留下一条警察记录，手指上还留着问话时磕出的淤青。
  _effects: relation partner with person-materialized-world-vienna-1912-26; health -0.07999999999999996 (police questioning); reputation -0.2; unemployment (dismissed after police visit); cash -8 (fine and lost work（其中5克朗记入债务）); role; relation acquaintance with person-materialized-world-vienna-1912-26_

- **1930.04** `p10-work-career.first-position/p10-work-career.first-position.turned-away` tags: adulthood, work, career, wages, injury, pension, employment, first_job
  介绍所的柜台前还有几个人在等，Luise Kral 2把一张印好的通知推过来，用铅笔在“星期三”下面画了一道。他把纸条折成四折，塞进上衣内袋。
  _effects: knowledge “下星期三早上七点，另一家机器厂在职业介绍所登记招上油工”; mood -0.06; relation acquaintance with person-materialized-world-vienna-1912-73; relation acquaintance with person-materialized-world-vienna-1912-33_

- **1930.06** `vienna-tenement-neighbors.laundry_line_dispute/neighbor_yanks_clothes` tags: home, social, family, housing
  Josefine Hofer嫌Josef的床单滴水滴到Josefine Hofer家衬衫上，一把扯下床单扔在院子的石板上。Josef下楼捡起来时，床单角沾了泥，重洗又要费肥皂。两人在院子当中对喊，楼上有人推开窗看热闹。Josef把床单重新搭上绳子时，故意把水拧在Josefine Hofer那侧。
  _effects: relation rival with person-josefine-hofer; cash -0.15 (重洗床单的肥皂钱)_

- **1930.10** `vienna-market-household.soup-kitchen/soup-kitchen.sell` tags: home, market, food, social
  鞋匠敲后门问有没有热汤，Josef把剩下的半锅倒进他的罐子里，收下两个十字币。Anton提着空碗上来时，只看见Josef把硬币塞进围裙口袋。
  _effects: cash 2 (卖出半锅扁豆汤); food; relation acquaintance with person-phase15-Anton-world-vienna-1912_

- **1931.01** `interaction_response` tags: interaction
  Katharina Bauer 2没有答应，只说现在不合适。Josef把这件事收回去，之后见面仍点头。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-32; interaction_
  _causes: evt:world-vienna-1912:003528_

- **1931.01** `p9-history-public-action.organize-relief/credit-own-name` tags: politics, union, party, activism, public_action, relief, leaflet, task
  市场掌柜把账本翻到空白页，铅笔写上“月底清”，Josef 把拇指按进印泥，红印盖得有点歪。Anton Kral 扛着半袋面粉往回走，袋底漏出的粉在石板路上留下白印。
  _effects: cash -5 (以自家名义赊购面粉); food; mood -0.05; relation acquaintance with person-materialized-world-vienna-1912-7; relation acquaintance with person-materialized-world-vienna-1912-7; relation acquaintance with person-materialized-world-vienna-1912-25_

- **1931.03** `vienna-parish-aid.soup-kitchen/soup-kitchen.help-wash` tags: faith, parish, mutual_aid, poverty, family
  Josef喝完汤没走，留下来帮修女把大锅刷净，又把木碗按大小摞好。厨房后头有半块面包和一碗剩汤，修女说是帮忙人的午饭。Friedrich Bauer在门口等着一起回去，说下回还来，洗锅的活总有人要干。
  _effects: food; skill; relation acquaintance with person-materialized-world-vienna-1912-39; mood 0.020000000000000004_

- **1931.05** `vienna-tenement-neighbors.shared_stove_fire/fire_no_damage` tags: home, social, family, housing
  Josef刚把锅端下灶，火苗就蹿了起来，Friedrich Bauer一脚踩灭地上的油布，顺手抄起沙箱里的沙子盖住灶口。两人都没受伤，但Friedrich Bauer的鞋底烧穿一个洞，那是唯一一双出门的鞋。
  _effects: relation friend with person-materialized-world-vienna-1912-39; mood -0.04999999999999999_

- **1932.01** `vienna-family-divorce/reconcile-for-now` tags: family, marriage, divorce, housing, lifecycle, partnership
  Josef和Franz Bauer在楼道里吵到半夜，最后因为下个月的房租又坐回同一张桌。谁都没有提和好，只把账本重新摊开；Franz Bauer把煤钱推过来，Josef接过去数了两遍，手指碰到一起又分开，屋里的灯亮到很晚。
  _effects: relation partner with person-materialized-world-vienna-1912-26; mood -0.03_

- **1932.01** `state_tick:wish-craft/craft-pressure/press-on` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_tick
  Josef又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.020000000000000004_

- **1932.01** `p9-social-relationship-initiative.cut-the-guarantee/pay-small-part` tags: courtship, friendship, family, social, initiative, housing, task, task:social
  替他还了四克朗，剩下的数目不碰，条件是把赌债字据交出来，当天就去戒酒会挂个名。对方把字据给了，人却没去挂名。四克朗从工资袋里出去，母亲那瓶药只好再等十天，晚上咳得更紧。
  _effects: cash -4 (替友人偿还部分赌债); health -0.030000000000000027 (母亲的药钱被挪去还债，家里几夜没睡好); relation friend with person-materialized-world-vienna-1912-10; mood -0.05_

- **1932.05** `p9-gap-adult-solitude.window-argument/window-argument.peek` tags: adulthood, daily, solitude, ordinary, home, neighbor, overheard
  Josef下楼倒水，在楼梯口看见院子里站着一对夫妻，男人的围裙上还沾着面粉，女的攥着一张工钱条。她没插话，提着壶又上楼，关门时听见那女人说“一星期八克朗怎么够”。
  _effects: mood -0.03; skill_

- **1932.07** `vienna-market-household.soup-kitchen/soup-kitchen.keep` tags: home, market, food, social
  扁豆汤的香味从门缝飘出去，Katharina Bauer 2敲了门。Josef掀开锅盖又盖上，说只够自家吃。Katharina Bauer 2什么也没说就走了。夜里Josef听见隔壁有人用勺子刮碗底。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-32; mood -0.04999999999999999_

- **1933.01** `vienna-tenement-neighbors.laundry_line_dispute/compromise_split_line` tags: home, social, family, housing
  Josef把洗好的床单搭上院子里的公用晾衣绳，占了整条。Friedrich Bauer抱着一盆湿衣服下来，说自家孩子明天要穿干净衬衫上学。两人在绳子两头扯了一阵，最后Josef把床单对折，腾出一半，Friedrich Bauer用木夹子把衬衫一件件排上去。谁也没道歉，但第二天见面都点了头。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-39; mood 0.020000000000000004_
  _causes: evt:world-vienna-1912:004127_

- **1933.01** `p9-social-relationship-initiative.introduce-two-people/let-them-talk` tags: courtship, friendship, family, social, initiative, housing, task, task:social
  星期天下午窗边三把椅子，介绍只用了两句，随后就任两人自己聊。老友讲印厂的油墨味，缝纫女工讲机针怎么断。有人只管叫侍者续咖啡，三杯一共九十赫勒，坐在旁边听了一下午。
  _effects: cash -0.9 (三杯咖啡和给侍者的小费); relation friend with person-materialized-world-vienna-1912-36; relation acquaintance with person-materialized-world-vienna-1912-3; skill; mood 0.05; relation acquaintance with person-materialized-world-vienna-1912-3_

- **1933.06** `major-crisis.rent-increase/pay-the-increase` tags: crisis, housing, rent, eviction, family, poverty, injury
  房东没有露面，只让看门人Anton Kral把补款单塞进门缝：每月要多十四克朗，先交十八克朗（本月十四加四克朗手续费）才肯谈续租。Josef把准备买冬煤的钱数了两遍，还是把钱交了，收据上写的是“自愿捐助”。Anton Kral低声说，不签的人已经有两家搬走了，楼下的煤价牌又换了数字。
  _effects: cash -18 (advance payment demanded with the rent increase); relation acquaintance with person-materialized-world-vienna-1912-7; flag +rent_increase_accepted; health -0.020000000000000018 (winter coal money spent on the rent increase)_

- **1933.07** `p9-gap-adult-ordinary-day.wash-day/wash-day.listen-gossip` tags: adulthood, daily, leisure, neighborhood, ordinary, laundry, neighbor, household
  院子里孩子们从湿石板之间跳过去，把晾衣绳碰得一晃。Anton说到一半，被自家孩子喊回去添柴。Josef乘机把最后一只木夹子夹好，端起木盆，盆底的水滴了一路。
  _effects: mood 0.010000000000000009; relation acquaintance with person-phase15-Anton-world-vienna-1912_

- **1933.08** `state_reaction:wish-craft/craft-humiliation` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_reaction
  Josef把那句轻视记了很久。它没有变成一个决定，但也没有消失。
  _effects: mood -0.09999999999999999_
  _causes: evt:world-vienna-1912:004674_

- **1933.08** `vienna-tenement-neighbors.shared_stove_fire/fire_burns_curtain` tags: home, social, family, housing
  Josef在公用灶台上热猪油，油星子溅到旁边晾着的床单上，火苗顺着床单爬上木隔板。Gustav Weiss拎起水桶泼过去，火灭了，但床单烧掉半幅，隔板熏黑一片。房东扣了那户人家两克朗押金，那家的女人在楼道里哭了一下午。
  _effects: cash -2 (赔给房东的隔板熏黑损失); relation acquaintance with person:evt:world-vienna-1912:000571:child_

- **1933.08** `vienna-historical-social-movement.relief-network/allocate-by-need` tags: history, historical_process, social_movement, organization, politics
  煤块在秤盘上碰出闷响，Josef用粉笔在麻袋上写门牌号，Otto Hofer挨户叫名。轮到放空碗那家时，Josef把面包掰成两半，一半放进碗里，一半留在自己手中，谁也没说话。
  _effects: food; relation acquaintance with person:evt:world-vienna-1912:000061:child; mood 0.04000000000000001_

- **1934.01** `r13-fam.care-sick-child::ctx-vienna-authoritarian-1934::milieu-tenement::child-care-war/milk-watered` tags: task, care, health, child, fever, night, vienna, urban
  配给站给的奶已经掺了水，Josef把它煮开，撇掉上面那层薄薄的沫，还是喂给了Katharina 4。孩子喝一半就推开碗，说苦；Josef尝了一口，才发现锅底糊了。那一夜，Josef把窗子开了又关，怕煤烟，也怕穿堂风。
  _effects: cash -3 (第三遍换湿布); health -0.040000000000000036 (第三遍换湿布); flag +watered_milk_fed; health -0.05999999999999994 (rationed milk was watered and the child would not drink); condition_

- **1934.02** `vienna-market-household.friday-fish/friday-fish.share` tags: home, market, food, social
  鱼还滴着水，Josef在走廊里分成两份。一份拿进自家，一份搁在Josefine Hofer的门口。傍晚Josefine Hofer来还盘子，盘子里是一小袋面粉。
  _effects: cash -6 (买鱼); food; relation acquaintance with person-josefine-hofer_

- **1934.04** `vienna-tenement-neighbors.lost_room_key/key_lost_landlady` tags: home, social, family, housing
  Josef把钥匙丢在了回家路上的有轨电车轨道旁，天黑也没找着。房东太太说换锁芯要一克朗五十赫勒，从下月房租里扣。Josef Moser借给Josef一把旧挂锁，但锁鼻和门扣对不上，只能用铁丝拧着凑合。那夜Josef睡不踏实，总觉得有人在拧门。
  _effects: cash -1.5 (换锁芯费用); relation acquaintance with person-materialized-world-vienna-1912-10; mood -0.06_

- **1934.04** `r1-civ.occupation-billet::ctx-vienna-authoritarian-1934::milieu-tenement/quartering-order-received` tags: war, occupation, army, housing, fear, vienna, urban, crisis
  占领军的告示贴在面包店门口，要求每户腾出一间朝街的屋子。Anton Kral带着两名兵上楼，用粉笔在Josef家门框上画了一个圈，说这间归他们住。Josefine Hofer把自家的钥匙先交了，Josef却把祖母的缝纫机往厨房里推，推到一半卡在门框上。
  _effects: cash -2 (门厅里的异国军靴); mood -0.09999999999999998; condition; flag +quartering_order_received; relation acquaintance with person-materialized-world-vienna-1912-7; relation acquaintance with person-josefine-hofer; knowledge “the billeting order takes one street-facing room per househo”_

- **1934.06** `vienna-courtship-courtyard.breakup/keys-and-photo-returned` tags: adulthood, courtship, partner, social, family, separation
  院子里晾着三条床单，风一过就拍到人脸上。Josef把备用钥匙和一张照相馆拍的合影交还，Franz Bauer把那件借来的外套叠好递回。两人说好各找各的住处，谁都没有提高声音；分手分得干净，可两个人心里都空了一块。
  _effects: relation_end partner with person-materialized-world-vienna-1912-26; mood -0.08999999999999997; flag +courtship_ended_cleanly; relation acquaintance with person-materialized-world-vienna-1912-29_

- **1935.01** `vienna-tenement-neighbors.laundry_line_dispute/compromise_split_line` tags: home, social, family, housing
  Josef把洗好的床单搭上院子里的公用晾衣绳，占了整条。Gustav Weiss抱着一盆湿衣服下来，说自家孩子明天要穿干净衬衫上学。两人在绳子两头扯了一阵，最后Josef把床单对折，腾出一半，Gustav Weiss用木夹子把衬衫一件件排上去。谁也没道歉，但第二天见面都点了头。
  _effects: relation acquaintance with person:evt:world-vienna-1912:000571:child; mood 0.01999999999999999_
  _causes: evt:world-vienna-1912:004749_

- **1935.01** `major-task.marriage-proposal/proposal-refused` tags: task, task:family, family, marriage, courtship, household
  Berta Moser把戒指推回来，说自己的工钱还要寄给乡下的母亲，不能现在就成家。两人在长椅上坐到天黑，最后一起走到电车站；第二天在楼道里碰见，彼此都客气了许多。Josef把戒指重新包进手帕，放回抽屉。
  _effects: relation acquaintance with person:evt:world-vienna-1912:000729:child; flag +marriage_proposal_refused; cash -2 (tram fare and coffee at the riverside); knowledge “对方的工钱要寄回乡下，短期内不能成家。”_

- **1935.06** `vienna-tenement-neighbors.shared_stove_fire/fire_no_damage` tags: home, social, family, housing
  Josef刚把锅端下灶，火苗就蹿了起来，Rosa Winter一脚踩灭地上的油布，顺手抄起沙箱里的沙子盖住灶口。两人都没受伤，但Rosa Winter的鞋底烧穿一个洞，那是唯一一双出门的鞋。
  _effects: relation friend with person-materialized-world-vienna-1912-4; mood -0.05000000000000002; relation acquaintance with person-materialized-world-vienna-1912-4_

- **1935.08** `ad20-market-day::ctx-vienna-authoritarian-1934::milieu-tenement/the-scale-is-light` tags: market, food, money, neighbor, everyday, credit, vienna, urban
  市场日的人挤到棚布底下。Katharina Bauer 2把Josef的篮子放上秤，秤砣往下一沉，又悄悄用拇指抵住秤杆。Josef看见了，没有说；Katharina Bauer 2多塞了两根葱，说“今天的葱不值钱”。Luise Kral 2从过道那头走来，两个人同时把篮子往身后挪了挪。
  _effects: cash 1 (a market stall gave short weight and then overpaid in change); relation acquaintance with person-materialized-world-vienna-1912-32; flag +market_short_weight; mood 0.020000000000000018; knowledge “市场那台秤的秤砣被摊主用拇指抵过。”_

- **1935.08** `vienna-housing-move.sublet-room/sublet-full` tags: housing, home, rent, family, money, household
  Josef把床上的旧褥子重新铺平，Katharina Hofer放下自己的铺盖卷，从怀里掏出一把钥匙看了看。厨房里多了一口人的碗，灶边的煤省着烧也够。Josefine Hofer在门口看了一眼，没多话。
  _effects: cash 4 (出租空床收进的月租); household; relation acquaintance with person-josefine-hofer; relation acquaintance with person-materialized-world-vienna-1912-38_

- **1936.01** `vienna-family-courtship/ask-to-share-a-home` tags: family, courtship, household, social, lifecycle
  Josef在Leopoldstädter Zinshaus, gemeinsamer Gang靠窗的桌边，把一只空咖啡杯转了半圈，说房租两人合付、桌子两人共用。Lena的手停在糖罐盖上，问了一句“要是过不下去呢”，没有当场答应，只说要想一想；杯里的咖啡凉了，话还悬在桌面上。
  _effects: interaction_

- **1936.01** `state_tick:wish-craft/craft-pressure/press-on` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_tick
  Josef又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.020000000000000018_

- **1936.01** `p9-work-jobsearch.ask-trial/ask-trial.accepted` tags: work, job_search, negotiation, wages, employment, task, trial, factory
  午休的哨子刚响，Luise Kral 2夹着烟走到门口。Josef报上姓名、住址和干过的活，声音有点发紧。工头嗯了一声，说明早六点来，管一顿午饭，干得好再谈工钱。
  _effects: flag +trial_work_pending; relation acquaintance with person-materialized-world-vienna-1912-33; mood 0.04999999999999999; relation acquaintance with person-materialized-world-vienna-1912-83_

- **1936.03** `vienna-parish-aid.funeral-society/funeral-society.defer` tags: faith, parish, mutual_aid, poverty, family
  Josef把抽屉拉开又推上，铜币在木板上滚了半圈。Friedrich Kral 3合上本子说，拖欠的人不少，可规矩就是规矩。她走下两级台阶又回头提醒，发工钱那天她会在教堂侧门等着。
  _effects: mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-40; relation acquaintance with person-materialized-world-vienna-1912-40_

- **1936.06** `vienna-church-community.tenement-prayer/rent-prayer-argument` tags: faith, social, family, home
  有人抱怨守夜人太多，踩坏了楼梯木板。楼里的人围着看，谁也没先走开。
  _effects: relation acquaintance with person:evt:world-vienna-1912:001031:child; reputation -0.03; mood -0.06_

- **1936.09** `r3-mig.chain-migration::ctx-vienna-authoritarian-1934::milieu-tenement/letter-with-job-order` tags: migration, family, chain, remittance, travel, vienna, urban, crisis
  Josef Bauer 2从芝加哥寄来一封信，里面有一张屠宰场的招工单和一个地址。信纸背面写着“来的时候带一双厚鞋”。家里卖了一头牛，凑出船票钱。Josef把招工单缝进衣领，Ferdinand Kral说这种信不能给海关看。
  _effects: cash 6 (先走的那个人寄回了地址); mood 0.06; flag +chain_migration_letter; relation friend with person-materialized-world-vienna-1912-70; knowledge “the cousin has a job order at a Chicago slaughterhouse”; relation acquaintance with person-materialized-world-vienna-1912-92_

- **1937.01** `interaction_response` tags: interaction
  Lena没有答应，只说现在不合适。Josef把这件事收回去，之后见面仍点头。
  _effects: relation acquaintance with person-phase15-Lena-world-vienna-1912; interaction_
  _causes: evt:world-vienna-1912:005747_

- **1937.01** `vienna-tenement-neighbors.laundry_line_dispute/neighbor_yanks_clothes` tags: home, social, family, housing
  Rosa Winter嫌Josef的床单滴水滴到Rosa Winter家衬衫上，一把扯下床单扔在院子的石板上。Josef下楼捡起来时，床单角沾了泥，重洗又要费肥皂。两人在院子当中对喊，楼上有人推开窗看热闹。Josef把床单重新搭上绳子时，故意把水拧在Rosa Winter那侧。
  _effects: relation rival with person-materialized-world-vienna-1912-4; cash -0.15 (重洗床单的肥皂钱)_
  _causes: evt:world-vienna-1912:005748_

- **1937.01** `ml18-tax.audit-of-the-windfall::ctx-vienna-authoritarian-1934::milieu-tenement/pay-and-regularize` tags: tax, legal, money, windfall, bureaucracy, comic, vienna, urban
  Luise Kral 2把黑皮本翻到Josef那一页，说邮局储蓄的利息没有报，数目不大，但漏了就是漏了。Josef Winter 2在旁边把计算尺推来推去，最后算出一个八克朗的数目。Josef当天去缴了款，把收据贴在账本最后一页；回家的路上，账本第一次没有在口袋里折着。
  _effects: cash -8 (back taxes and a small fine on the windfall's interest); state_parameter ml18-sudden-fortune.principal 43 -> 35; reputation 0.01999999999999999; relation acquaintance with person-materialized-world-vienna-1912-33; flag +taxes_paid; knowledge “邮局储蓄的利息也要报税，漏报的八克朗已经补齐。”; mood 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-89_

- **1937.01** `r13-civ.recover-at-home::ctx-vienna-authoritarian-1934::milieu-tenement/back-to-work-too-soon` tags: health, recovery, care, household, food, vienna, urban, crisis
  Josef退烧第二天就回工厂，站到下午，眼前一阵阵发黑。回家后半夜又烧起来，他把湿毛巾搭在额头上，听见自己的心跳撞着枕头。第二天早上，Josef又去了，因为请假的扣款比药贵。
  _effects: cash 2 (退烧后的第一碗粥); health -0.09999999999999998 (退烧后的第一碗粥); condition; flag +returned_to_work_too_soon_

- **1937.01** `vienna-market-household.market-credit/market-credit.pay-later` tags: home, market, food, social
  Josef捏着三个克朗硬币站在玛丽亚的菜摊前，土豆和洋葱已经装进布袋。周五结清时，玛丽亚用粉笔在小黑板上划掉名字，Franz Kral点点头。
  _effects: cash -3 (偿还市场赊账（其中3克朗记入债务）); food_

- **1937.07** `vienna-medical-treatment.sanatorium/sanatorium-go` tags: health, medical, family, money
  疗养院的护士接过行李，把床号写在小黑板上。Josef躺下时听见走廊尽头有人在放唱片，咳嗽没那么紧了。安娜的信第三天到，说花浇过了，房东没来催租。
  _effects: cash -12 (疗养院车票和住宿押金（其中12克朗记入债务）); health 0.12 (疗养院松林空气和正规休养); relation friend with person-luise-kral_

- **1937.08** `p9-gap-adult-solitude.window-argument/window-argument.peek` tags: adulthood, daily, solitude, ordinary, home, neighbor, overheard
  Josef下楼倒水，在楼梯口看见院子里站着一对夫妻，男人的围裙上还沾着面粉，女的攥着一张工钱条。她没插话，提着壶又上楼，关门时听见那女人说“一星期八克朗怎么够”。
  _effects: mood -0.02999999999999997; skill_

- **1938.01** `vienna-life-injury-recovery/clinic-treatment` tags: health, work, family
  Josef在受伤后的第三天去了诊所。医生清洗伤口、换药，收下诊费，嘱咐不要急着回机器旁。Josef把药方折好，回家路上买了纱布。
  _effects: health 0.04999999999999999 (wound treatment); cash -8 (clinic and bandages（其中8克朗记入债务）); condition_
  _causes: evt:world-vienna-1912:006438_

- **1938.01** `vienna-life-anschluss-1938/flees` tags: politics, persecution, 1938, migration
  Josef在夜里收拾了一只箱子，把证件缝进外套内衬，搭上往西的火车。Berta Huber第二天来查人，只看到空床和没关严的窗。
  _effects: move place-klosterneuburg-aunt-house; role; cash -20 (escape and lodging（其中20克朗记入债务）); condition; relation acquaintance with person-materialized-world-vienna-1912-80_

- **1938.01** `p9-social-relationship-initiative.borrow-handcart/handcart-and-ten` tags: courtship, friendship, family, social, initiative, housing, task, task:social
  星期天搬家的前一晚，有人坐在印厂友人家的厨房里把事说全：车要借，十克朗也要借。对方合上账本，从抽屉里数出两张五克朗，说月底先还三克朗，剩下的按月摊。手推车的轮轴有点响，搬之前得先上油。
  _effects: cash 10 (友人借给搬家应急的十克朗); relation friend with person-materialized-world-vienna-1912-83; mood 0.04999999999999999_

- **1938.07** `vienna-medical-treatment.night-fever/hospital-night` tags: health, medical, family, money
  电车在环城大道上哐当响，Anna Berg攥着Josef的胳膊，怕人从座位上滑下去。急诊厅的煤气灯发黄，长椅上全是咳嗽声，押金窗口的铜盘递出两克朗，换来一张硬纸号牌。
  _effects: cash -2 (医院急诊押金（其中2克朗记入债务）); health 0.08 (急诊观察和冰敷退烧); relation friend with person-materialized-world-vienna-1912-12; relation acquaintance with person-materialized-world-vienna-1912-12_

- **1938.09** `p9-gap-adult-solitude.river-walk/river-walk.turned-back` tags: adulthood, daily, solitude, ordinary, home, walk, river
  Josef走到半路风忽然大起来，围巾抽在脸上生疼，她掉头往回走。路过面包店时橱窗里还剩几个昨天的圆面包，四赫勒一个，她买了两个，揣在怀里带回去当晚饭。
  _effects: food; cash -0.08 (两个剩面包四赫勒一个（其中0.08克朗记入债务）)_

- **1938.10** `p9-social-tenement-neighbors.flour-loan/flour-loan.full-bag` tags: housing, neighbors, tenement, daily, money, reputation
  Josef把一整袋面粉倒进Otto Huber的空口袋，袋口用麻绳扎了两道，说等她男人发了薪再还。Otto Huber连声道谢，把写着借煤日期的小纸片折好放回围裙。柜子里只剩一袋面粉，Josef当晚煮汤时多加了一勺水。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-21; relation acquaintance with person-materialized-world-vienna-1912-21_

- **1939.01** `p10-migration-tasks.ask-travel-money/aunt-private-money` tags: adulthood, migration, housing, family, travel, task, loan, relative
  舅父在里屋翻账簿半天没出来，舅母趁空从围裙里掏出一卷私房钱，数出十克朗塞给他，说到了家乡先给她写封信。他把钱收下，出门时在门口站了一会儿，才把帽子戴正。
  _effects: cash 10 (舅母私下给的路费); relation kin with person-materialized-world-vienna-1912-29; mood 0.03; relation acquaintance with person-materialized-world-vienna-1912-102_

- **1939.01** `vienna-housing-move.rent-notice/rent-notice-pay` tags: housing, home, rent, family, money
  Josef把通知念给Anton Moser听，Anton Moser摇头说是楼梯间那几块新玻璃的账。Josef去楼下杂货铺换开一张五克朗的纸币，回屋一枚一枚摆开数，煤箱底多留了二十赫勒。
  _effects: cash -2 (按月多付两克朗房租（其中2克朗记入债务）); mood -0.03; relation acquaintance with person-materialized-world-vienna-1912-34_

- **1940.01** `state_tick:wish-craft/craft-pressure/press-on` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_tick
  Josef又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.01999999999999999_

- **1940.01** `p10-migration-tasks.return-home/return-ticket-bought` tags: adulthood, migration, housing, family, travel, task, return, train
  他在南站买了一张三等车票，十二克朗四十赫勒，把木工工具留给了同屋的工友。车过布吕恩时换了一次车，哥哥站在站台上，手里拎着一壶水。第二天一早他就跟着下地，手上磨出了新泡。
  _effects: cash -13 (回乡三等车票与路上买面包的钱（其中13克朗记入债务）); mood 0.07; flag +worked_in_vienna_factory; relation acquaintance with person-materialized-world-vienna-1912-51_

- **1940.03** `p9-social-tenement-neighbors.gramophone-wall/gramophone-wall.cotton-in-ears` tags: housing, neighbors, tenement, daily, money, reputation
  Josef忍到天亮，第二天去药房买了五分钱的棉花，撕成两小团塞在耳里。夜里的进行曲还剩一点闷响，翻个身也就过去了。此后在楼梯间遇见Anton Kral只是点头，再没有进过那家的门。
  _effects: cash -0.05 (在药房买棉花塞耳朵（其中0.05克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-7_

- **1940.07** `vienna-courtship-courtyard.breakup/courtyard-quarrel` tags: adulthood, courtship, partner, social, family, separation
  话没说完就变成了争。Gustav Moser把外套扔在晾衣杆下，Josef说了一句不中听的，声音大得整院都听见。Franz Moser在三楼把窗开了一条缝，看完了全程，第二天院子里人人都知道；这一架把两个人的关系吵断了，也把Josef的名字在院子里吵薄了一层。
  _effects: relation_end partner with person:evt:world-vienna-1912:000879:child; reputation -0.06999999999999998; relation acquaintance with person:evt:world-vienna-1912:001031:child; mood -0.09999999999999998_

- **1940.07** `p9-social-courtship-friendship.returned-sugar-box/sugar-box-go-in-person` tags: courtship, friendship, social, adulthood, reputation, leopoldstadt
  Josef亲自去Rosa 2家，把话说清：糖盒既退回来，以后不再托人登门。Rosa 2的母亲站在门里，说这都是为自家孩子打算，语气不重也不轻。Josef把帽子戴正，没有纠缠，下楼时一步一步数着台阶；门房和邻居都看在眼里，这一回至少把话说在了明处。
  _effects: relation acquaintance with person:evt:world-vienna-1912:001438:child; reputation 0.03_

- **1940.09** `p9-gap-adult-solitude.misdelivered-letter/misdelivered-letter.opened` tags: adulthood, daily, solitude, ordinary, home, letter
  信封没封牢，Josef在灯下把它掀开，里面是维也纳联合银行的催款单，欠了三十四克朗。她认出那名字是楼上常穿黑裙的女人，便把纸原样叠回去，用米汤把封口粘好，放到门房窗台上。
  _effects: mood -0.04000000000000001; flag +knows_upstairs_debt_

- **1941.01** `vienna-life-injury-recovery/home-care` tags: health, work, family
  Josef没有去诊所，只用热水和旧布洗了伤口。第二天伤口周围发红，家里人把仅剩的干净床单撕成条。
  _effects: cash -2 (clean cloth（其中2克朗记入债务）); condition_
  _causes: evt:world-vienna-1912:006932_

- **1941.01** `task-vienna-family-care.ask-relative-money/ask-for-weekend-work` tags: family, care, courtship, siblings, inheritance, housing, task, task:family
  钱字到了嘴边，Josef改了口，问Otto Winter铺子里要不要一个周末帮工，搬货、上架、跑腿都行。Otto Winter上下打量他一番，说周六早上六点来，一天一克朗，干不好就不留。Josef应下，回家路上算了算，要干满五个周末才够房租。
  _effects: cash 1 (周末帮工的工钱); relation kin with person-otto-winter; flag +weekend_shop_work_

- **1941.03** `p9-social-family-conflict-care.christmas-soup/ledger-on-table` tags: family, care, siblings, inheritance, housing, money
  Josef把旧账本摊在汤锅旁边，翻到药费那一页，说今天得当场算清才肯坐下。Klara的勺子停在半空，最后也把本子拉过去，一行行对起数来。汤在炉子上咕嘟着，谁也没先盛；等账算到最后一个赫勒，Josef在页脚写下“结清”，两人才同时伸手去够勺子。
  _effects: mood -0.030000000000000027; flag +medicine_bill_settled_

- **1941.05** `vienna-market-debt.rent-arrears/rent-sell-furniture-move` tags: market, debt, money, home, shop
  邻居用麻绳把锅和铺盖捆在一起，打了个死结。他说城南有更便宜的屋子，但离厂远。你蹲在地上把最后几件衣服塞进布袋，听见看门人在楼下把垃圾桶挪来挪去。
  _effects: cash 2.8 (卖旧家具所得); mood -0.06; relation acquaintance with person-materialized-world-vienna-1912-17_

- **1941.11** `vienna-housing-move.sublet-room/sublet-full` tags: housing, home, rent, family, money, household
  Josef把床上的旧褥子重新铺平，Anna Berg放下自己的铺盖卷，从怀里掏出一把钥匙看了看。厨房里多了一口人的碗，灶边的煤省着烧也够。Rosa Winter在门口看了一眼，没多话。
  _effects: cash 4 (出租空床收进的月租); household; relation acquaintance with person-materialized-world-vienna-1912-4_

- **1942.01** `hs18-occupation.piano::ctx-vienna-authoritarian-1934::milieu-tenement/refuse-to-sign` tags: occupation, piano, requisition, witness, neighbor, history, vienna, urban
  Josef把笔推回去，说钢琴的主人就住在隔壁。Anton Kral没有争，只让工人把琴盖也搬走，又记下Josef的门牌号。卡车开走时，Elisabeth Bauer 2家的窗子开了又关；Josef站在空出来的门洞前，听见自己的呼吸声。
  _effects: state_add hs18-street-witness state:world-vienna-1912:545; relation acquaintance with person-materialized-world-vienna-1912-17; reputation 0.01999999999999999; flag +refused_piano_receipt; mood -0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-17_

- **1942.01** `r13-civ.ration-card::ctx-vienna-authoritarian-1934::milieu-tenement/ration-card-issued` tags: politics, rationing, food, war, institution, vienna, urban, crisis
  Luise Kral 2把配给证从本子上撕下来，填上Josef家的门牌和人数，又用打孔机在角上打了一个洞。Josef把证举到灯下，看见上面印着面粉、糖和煤的数量，每一项都比去年少。
  _effects: food; flag +ration_card_issued; knowledge “the monthly ration is smaller than last year’s”_

- **1942.09** `major-crisis.rent-increase/tenant-meeting` tags: crisis, housing, rent, eviction, family, poverty
  巷口洗衣房的老板娘把几张椅子摆开，叫来半条街的租户。Josef把涨租单摊在桌上，逐条念出上面的数字；Franz Bauer站在门边，既没走，也没替房东说话。大家决定先集体迟交一个月，签名纸传到Josef手里时，纸上已经有一块油渍。
  _effects: cash -2 (paper, ink and tram fare for the tenants meeting); role; flag +rent_strike; relation acquaintance with person-materialized-world-vienna-1912-26; reputation 0.03_

- **1942.11** `hs18-witness.reporter::ctx-vienna-authoritarian-1934::milieu-tenement/sell-the-account` tags: witness, reporter, memory, money, risk, history, vienna, urban
  Alois Kral 2把几张钞票压在咖啡杯底下，说只要一段能上版的细节。Josef讲了钢琴、门洞和那件湿外套；对方记得很快，临走前问能不能用真名。Josef说用化名，记者笑了一下，说化名也得像真的。
  _effects: cash 4 (sold a witness account to a reporter); state_parameter hs18-street-witness.retellings 0 -> 2; state_parameter hs18-street-witness.danger 60 -> 75; state_parameter hs18-street-witness.certainty 90 -> 93; reputation 0.01999999999999999; flag +sold_witness_account; relation acquaintance with person-materialized-world-vienna-1912-49_

- **1943.01** `state_tick:hs18-street-witness/memory-drift/blurs` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Josef忽然想不起那个人先迈的是左脚还是右脚。邻居说自己记得清清楚楚，还补了一个细节；Josef听着，竟分不清那是自己看见的，还是后来听来的。
  _effects: state_parameter hs18-street-witness.certainty 93 -> 85; mood -0.020000000000000018_

- **1943.01** `kernel-civic.petition-drive::ctx-vienna-authoritarian-1934::milieu-tenement/civic-petition-lost` tags: politics, petition, reform, neighbor, organization, vienna, urban, crisis
  签名纸在电车上被挤掉一角，最后十个名字不见了。他站在终点站找了一刻钟，只在座位下找到一张被踩脏的纸；Franz Bauer说“算了”，他还是把剩下的名字重新抄了一遍。他把重抄的名单交给Franz Bauer，让对方再核一遍。
  _effects: flag +petition_signatures_lost; reputation -0.010000000000000009; relation acquaintance with person-materialized-world-vienna-1912-26; cash -0.5 (重抄签名纸和电车票); knowledge “签名纸要夹在硬纸板里，电车挤掉的一角找不回来”_

- **1943.02** `vienna-historical-social-movement.relief-network/open-the-books-again` tags: history, historical_process, social_movement, organization, politics
  墙面粗灰，Josef用图钉钉上分发清单，纸边被穿堂风吹得直抖。老人说自家也在等煤，Katharina Hofer把围巾往肩上紧了紧，没接话。有人围上来看，有人转身回屋。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-38; reputation 0.03; skill_

- **1943.02** `vienna-life-wwii-homefront/shelter` tags: war, homefront, shortage, injury
  警报响时Josef躲进地下室，和十几户人挤在长凳上。头顶传来闷响，灰尘从梁上落下。警报解除后，街上多了一堆碎瓦。
  _effects: health -0.01999999999999999 (shelter conditions); relation acquaintance with person-materialized-world-vienna-1912-55_

- **1943.05** `vienna-medical-treatment.night-fever/hospital-night` tags: health, medical, family, money
  电车在环城大道上哐当响，Otto Winter攥着Josef的胳膊，怕人从座位上滑下去。急诊厅的煤气灯发黄，长椅上全是咳嗽声，押金窗口的铜盘递出两克朗，换来一张硬纸号牌。
  _effects: cash -2 (医院急诊押金); health 0.07999999999999999 (急诊观察和冰敷退烧); relation friend with person-otto-winter_

- **1943.10** `vienna-courtship-courtyard.sunday-walk/part-at-arch` tags: adulthood, courtship, partner, social, family
  走到桥洞前，Gustav Moser说该往回走了，家里炉子还没生。Josef站在原地看着Gustav Moser拐上台阶，围巾的一角被风掀起来；下周的事谁也没有提，两人就此分开，口袋里只剩一颗凉透的栗子。
  _effects: mood -0.04999999999999999; relation acquaintance with person:evt:world-vienna-1912:000879:child; flag +uncertain_courtship_

- **1944.01** `state_tick:hs18-street-witness/memory-drift/holds` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Josef又把那天的顺序在脑子里走了一遍：先是门响，再是靴子，最后才是那声喊。细节还在，只是每讲一次，旁边就多出一点别人替你补上的颜色。
  _effects: state_parameter hs18-street-witness.certainty 85 -> 87_

- **1944.01** `state_tick:wish-craft/craft-pressure/put-away` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_tick
  Josef暂时把那件事收进抽屉；日子还有别的东西要应付。
  _effects: mood -0.020000000000000018_

- **1944.01** `r13-fam.help-neighbour::ctx-vienna-authoritarian-1934::milieu-tenement/carried-the-coal` tags: task, social, neighbor, help, care, vienna, urban, crisis
  Josef看见Otto Bauer在楼梯口歇了三回，便把煤筐接过来，一筐一筐抬上三楼。最后一趟，Josef的腰在门框上撞了一下，Otto Bauer从柜里摸出一小瓶李子酒，硬倒了一盅。
  _effects: food; health -0.03 (把煤筐抬上三楼); flag +carried_neighbour_coal; role; relation friend with person-materialized-world-vienna-1912-58_

- **1944.03** `p9-social-tenement-neighbors.gramophone-wall/gramophone-wall.knock-and-bargain` tags: housing, neighbors, tenement, daily, money, reputation
  Josef上楼敲了Emil Kraus的门，说唱针刮在墙上，夜班的人睡不安稳。Emil Kraus把留声机从墙边挪到窗下，垫了一块毛毡，答应十点以后不再放。下楼时进行曲还在响，但闷了些，Josef能听见自家水壶的响声了。
  _effects: relation acquaintance with person:evt:world-vienna-1912:002681:child; health 0.03 (夜里终于能早些入睡)_

- **1944.08** `vienna-social-movement.recruitment/read-and-decline` tags: development, social_movement, organization, politics
  Josef把传单读了两遍，记下上面的地址，却没有去。第二天照常上工；午休时听见两个工友低声谈论同一场集会。
  _effects: mood -0.010000000000000009_

- **1944.09** `r3-crime.crime-scene::ctx-vienna-authoritarian-1934::milieu-tenement::glass-and-blood/trampled-the-evidence` tags: crime, police, evidence, street, mistake, vienna, urban, crisis
  Josef急着去看伤者，一脚踩进了粉笔线里，鞋底在血上滑了一下。Anton Kral蹲下去看了半天，说“这下只能靠口供了”。Elisabeth Bauer递过来一块抹布，Josef没有接。那天晚上，局里传话说“现场保护不力”，名字写在通报的第二行。
  _effects: condition; flag +ruined_the_crime_scene; relation rival with person-materialized-world-vienna-1912-7; knowledge “the only shoe print was destroyed at the scene”; relation acquaintance with person-materialized-world-vienna-1912-112_

- **1945.01** `vienna-life-injury-recovery/home-care` tags: health, work, family, injury
  Josef没有去诊所，只用热水和旧布洗了伤口。第二天伤口周围发红，家里人把仅剩的干净床单撕成条。
  _effects: health -0.02999999999999997 (untreated wound); cash -2 (clean cloth)_
  _causes: evt:world-vienna-1912:009916_

- **1945.01** `vienna-life-1945-liberation/postwar-illness` tags: war, liberation, 1945, injury
  Josef在战后第二个月病倒，医院没有足够的药，医生只给了退烧粉。邻居每天送来一碗汤，放在门口就走。
  _effects: health -0.15 (postwar illness); cash -4 (medicine); condition_

- **1945.01** `state_tick:hs18-street-witness/memory-drift/blurs` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Josef忽然想不起那个人先迈的是左脚还是右脚。邻居说自己记得清清楚楚，还补了一个细节；Josef听着，竟分不清那是自己看见的，还是后来听来的。
  _effects: state_parameter hs18-street-witness.certainty 87 -> 79; mood -0.020000000000000018_

- **1945.01** `r13-work.advertise::ctx-vienna-authoritarian-1934::milieu-tenement/painted-over` tags: commerce, advertising, shop, competition, literacy, vienna, urban, crisis
  Josef一早去贴海报，发现墙上已经被Mitzi Hofer 2的招贴盖住了，糨糊还是湿的。Josef把湿纸揭下来，底下露出自己那张的一角。两人在墙边站了一会儿，Mitzi Hofer 2说这条街只容得下一家做广告的；Josef把剩下的海报抱回去，改贴在自家橱窗里。
  _effects: cash -1 (橱窗里的手写海报); flag +work13_advertising_poster_covered; relation rival with person-materialized-world-vienna-1912-132; relation acquaintance with person-materialized-world-vienna-1912-132_

- **1945.07** `vienna-legacy-worklife.union-office/union-office.enroll-first` tags: legacy, work, family, reform, ordinary_life
  来问入会的是个瘦高的年轻人，帽檐捏在手里，说自己在第十六区的织布厂做了半年。Josef把名册翻到空白页，蘸水笔尖在“住址”那栏停了一下，等他报出街名。老成员在角落里把账本合上，声音很轻。
  _effects: cash 1 (新会员的入会费先记在桌上); skill; relation acquaintance with person-materialized-world-vienna-1912-65_

- **1945.12** `ad20-shop-opening::ctx-vienna-postwar-1945::milieu-tenement/the-street-watches` tags: shop, business, opening, everyday, public, obligation, vienna, urban
  Josef把新店的招牌挂上去时，街对面已经站了几个人。第一位客人买了一包针，第二位问能不能赊账，第三位什么也没买，只说“看看”。到傍晚，Josef发现自己记住了每一张脸，却忘了算今天的账。
  _effects: state_add ad20-public-attention state:world-vienna-1912:724; cash 3 (the first day’s takings); reputation 0.03; relation acquaintance with person-materialized-world-vienna-1912-33; flag +shop_opened; mood 0.040000000000000036; flag +public_attention_active_

- **1945.12** `p9-gap-adult-unemployed.moving-job/moving-finished-paid` tags: adulthood, unemployment, casual_labour, poverty, daily, moving, neighbor, injury
  楼梯窄得只容一个人侧身，Josef和Anna Bauer 2一前一后抬着柜子，Katharina Bauer 2在楼下喊当心磕墙。床架拆成两截，捆在手推车上推到城外新住处，回来时天已经擦黑。
  _effects: cash 3 (帮鞋匠搬家的工钱); health -0.04000000000000001 (搬重物腰背酸痛); relation acquaintance with person-materialized-world-vienna-1912-72_

- **1946.01** `vienna-family-courtship/wait-for-a-better-year` tags: family, courtship, household, social, lifecycle
  Josef把话咽回去，只说等明年工钱稳一点再谈。Hedwig没有追问，两人把桌上的面包分完，各自去上工；出门时Josef回头看了一眼，Hedwig正把掉在桌上的面包屑拢进掌心，谁也没有把那个话头重新拾起来。
  _effects: relation acquaintance with person-phase15-Hedwig-world-vienna-1912_

- **1946.01** `state_tick:hs18-street-witness/memory-drift/blurs` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Josef忽然想不起那个人先迈的是左脚还是右脚。邻居说自己记得清清楚楚，还补了一个细节；Josef听着，竟分不清那是自己看见的，还是后来听来的。
  _effects: state_parameter hs18-street-witness.certainty 79 -> 71; mood -0.020000000000000018_

- **1946.01** `state_tick:ad20-public-attention/the-attention-cycle/warms` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  Josef在街角被人认出来，对方没有要求什么，只说“上次那件事做得不错”。这句客气话被旁边的人听见，下午便有两个陌生人朝Josef点头。关注没有减少，但空气松了一点。
  _effects: state_parameter ad20-public-attention.attention 40 -> 36; state_parameter ad20-public-attention.sympathy 45 -> 51; state_parameter ad20-public-attention.opportunity 50 -> 54; mood 0.020000000000000018_

- **1946.01** `r13-fam.write-missing-relative::ctx-vienna-postwar-1945::milieu-tenement/letter-sent` tags: task, family, letter, missing, war, literacy, vienna, urban
  Josef替Luise Kral 2写信，把最后知道的部队番号、收容站和一处旧住址都写上去。Luise Kral 2不识字，却要Josef把“家里都好”念三遍，怕写错。信投进邮筒时，她伸手在筒口摸了一下；Josef把回信地址又描粗了一笔。
  _effects: cash -1 (没有地址的信); flag +wrote_to_missing_relative; skill; relation kin with person-materialized-world-vienna-1912-33; knowledge “A letter with the last known unit and shelter addresses was ”_

- **1946.03** `vienna-family-courtship/ask-to-share-a-home` tags: family, courtship, household, social, lifecycle
  Josef在Leopoldstädter Zinshaus, gemeinsamer Gang靠窗的桌边，把一只空咖啡杯转了半圈，说房租两人合付、桌子两人共用。Grete Moser 2的手停在糖罐盖上，问了一句“要是过不下去呢”，没有当场答应，只说要想一想；杯里的咖啡凉了，话还悬在桌面上。
  _effects: interaction; relation acquaintance with person-materialized-world-vienna-1912-130_

- **1946.10** `p9-social-courtship-friendship.opened-letter/opened-letter-church-steps` tags: courtship, friendship, social, adulthood, reputation, leopoldstadt
  Josef请同住的Gustav Weiss跑一趟，把Luise Weiss约到教堂前的台阶上。石台阶还带着晨露，两人各占一级，把原信从头念完；念到“工钱”那处，Luise Weiss说那是家里人的意思，不是自己的话。Josef把信纸折回原样，至少这一回没有隔着别人传话。
  _effects: relation acquaintance with person:evt:world-vienna-1912:000571:child; relation acquaintance with person-materialized-world-vienna-1912-123; relation acquaintance with person-materialized-world-vienna-1912-123_

- **1947.01** `state_tick:hs18-street-witness/memory-drift/blurs` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Josef忽然想不起那个人先迈的是左脚还是右脚。邻居说自己记得清清楚楚，还补了一个细节；Josef听着，竟分不清那是自己看见的，还是后来听来的。
  _effects: state_parameter hs18-street-witness.certainty 71 -> 63; mood -0.020000000000000018_

- **1947.01** `state_expire:ad20-public-attention` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  Josef的「被看见的日常」到期；相关安排结束。
  _effects: state_remove ad20-public-attention state:world-vienna-1912:724; flag -public_attention_active_

- **1947.01** `r14-soc.club-election::ctx-vienna-postwar-1945::milieu-tenement/disputed-the-count` tags: task, club_election, club, status, community, vienna, urban, postwar
  Josef输了五票，要求把票重新数一遍。数到第二遍还是五票，Mitzi Bauer把铁盒盖上，说“再数就难看了”。Josef说账本也得查，后厅一下子安静下来。那晚的合唱没有唱成。散会后，Mitzi Bauer把铁盒抱在怀里，锁进酒馆老板的柜子。铁盒被放回柜子，账本却留在了桌上。
  _effects: mood -0.09999999999999998; reputation -0.04999999999999999; flag +disputed_club_election; relation rival with person-materialized-world-vienna-1912-140; relation acquaintance with person-materialized-world-vienna-1912-140_

- **1947.02** `oj18-zoo.night::ctx-vienna-postwar-1945::milieu-tenement/broken-tooth` tags: zoo, animals, night, keeper, work, odd_job, suspense, vienna
  夜里十一点，母狮不肯碰桶里的马肉。Josef举着煤油灯绕到兽栏后面，看见它右槽牙断了一截，牙龈肿得发亮。Josef把肉切碎，又去敲Luise Hofer的门；第二天兽医来了，Anna Berg在晨会上第一次记住Josef的名字。
  _effects: organization_found 普拉特动物园夜班队 (other); position 夜班饲养员 @zoo:person-phase15-Josef-world-vienna-1912-evt:world-vienna-1912:011950; state_add oj18-odd-apprenticeship state:world-vienna-1912:819; skill; reputation 0.03; flag +zoo_night_shift; knowledge “母狮的右槽牙断了，牙龈肿得发亮，夜里不肯吃马肉。”; role; flag +odd_job_apprentice_

- **1948.01** `interaction_response` tags: interaction, partnership, household
  Grete Moser 2在几天后找到Josef，说可以试试。两人开始合付房租，也把各自欠的账摊在桌上。
  _effects: relation partner with person-materialized-world-vienna-1912-130; household; role; role; interaction_
  _causes: evt:world-vienna-1912:011426_

- **1948.01** `vienna-life-injury-recovery/home-care` tags: health, work, family, injury
  Josef没有去诊所，只用热水和旧布洗了伤口。第二天伤口周围发红，家里人把仅剩的干净床单撕成条。
  _effects: health -0.030000000000000027 (untreated wound); cash -2 (clean cloth)_
  _causes: evt:world-vienna-1912:011502_

- **1948.01** `state_expire:hs18-street-witness` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Josef的「街面上的目击者」到期；相关安排结束。
  _effects: state_remove hs18-street-witness state:world-vienna-1912:545_

- **1948.01** `state_tick:oj18-odd-apprenticeship/strange-year/learned-the-building` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  又过了一个冬天，Josef能从楼梯的响声判断是谁在值夜，也能从煤气灯的颜色判断哪一段管道该修。师傅把巡查路线改了三次，最后仍然照Josef画的那张走；两个人都没有提这件事。
  _effects: state_parameter oj18-odd-apprenticeship.trust 30 -> 40; state_parameter oj18-odd-apprenticeship.strangeKnowledge 20 -> 30; state_parameter oj18-odd-apprenticeship.nightsWorked 0 -> 24; cash 2 (night-shift wages); skill_

- **1948.01** `state_tick:wish-craft/craft-pressure/press-on` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_tick
  Josef又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.020000000000000018_

- **1948.01** `agency:attend_meeting` tags: agency, agency:attend_meeting
  Josef去了Leopoldstädter Zinshaus, gemeinsamer Gang，坐在后排听完了关于普拉特动物园夜班队在Leopoldstädter Zinshaus, gemeinsame的争论；散会时带走一张油印提纲。
  _effects: historical development:initiative-zoo:person-materialized-world-vienna-1912-7-evt:world-vienna-1912:006643-1941 as participant; knowledge “我参加了普拉特动物园夜班队在Leopoldstädter Zinshaus, gemeinsamer Gan。”; mood 0.030000000000000027_

- **1948.07** `vienna-postwar-housing-1950s/stay-with-relatives` tags: adulthood, postwar, housing, family
  分房名单又往后推了一年，Josef一家搬进亲戚家的厨房隔间。Gustav Hofer送来一块旧帘子当隔断；夜里有人起身，全屋都听得见。
  _effects: cash -3 (shared household costs（其中3克朗记入债务）); condition; mood -0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-120; relation acquaintance with person-materialized-world-vienna-1912-120_

- **1949.01** `office16-scandal.public-hearing::ctx-vienna-postwar-1945::milieu-tenement/the-wrong-signature` tags: office, scandal, media, reputation, politics, power, vienna, urban
  报纸放大的签名其实是Franz Kral的：两个字母写得太像。更正启事登在第七版，只有三行；Josef的名字被拿掉了，Franz Kral的名字留了下来。第二天，Franz Kral没有来上班，桌上的茶杯还是满的。
  _effects: reputation 0.020000000000000004; flag +scandal_misdirected; knowledge “被登出来的签名是书记员的，更正启事在第七版。”; mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-75_

- **1949.01** `agency:support_process` tags: agency, agency:support_process
  Josef为普拉特动物园夜班队在Leopoldstädter Zinshaus, gemeinsame出了力：整理名单、传递消息或替同伴作证，名字被记进参与记录。
  _effects: historical development:initiative-zoo:person-materialized-world-vienna-1912-7-evt:world-vienna-1912:006643-1941 as supporter; historical_influence; reputation 0.015_

- **1949.01** `initiative:found_process:zoo:person-phase15-Josef-world-vienna-1912-evt:world-vienna-1912:011950`
  普拉特动物园夜班队在Leopoldstädter Zinshaus, gemeinsamer Gang经过数年的招募、会议和互助，把分散的行动整理成公开纲领；这不是预先写好的历史，而是成员自己累积出来的运动。
  _effects: historical process 普拉特动物园夜班队的持续运动; historical development:initiative-zoo:person-phase15-Josef-world-vienna-1912-evt:world-vienna-1912:011950-1949 as organizer; historical development:initiative-zoo:person-phase15-Josef-world-vienna-1912-evt:world-vienna-1912:011950-1949 as organizer; knowledge “普拉特动物园夜班队的持续运动不是一次会议，而是我们这些年积累出来的持续组织。”; reputation 0.04_

- **1949.01** `historical_phase`
  历史进程《普拉特动物园夜班队在Leopoldstädter Zinshaus, gemeinsamer Gang经过数年的招募、会议和互助，把分散的行动整理成公开纲领；这》从 emerging 进入 mobilizing。
  _effects: knowledge “我亲历或知晓「普拉特动物园夜班队在Leopoldstädter Zinshaus, gemeinsamer Gang经过”; knowledge “我亲历或知晓「普拉特动物园夜班队在Leopoldstädter Zinshaus, gemeinsamer Gang经过”_
  _causes: evt:world-vienna-1912:012768_

- **1949.02** `vienna-parish-aid.funeral-society/funeral-society.pay` tags: faith, parish, mutual_aid, poverty, family
  Josef数出八赫勒交给Grete Moser 2，看她在蓝皮本上找到自家门牌，把这一周的格子划掉。Grete Moser 2说上个月隔壁巷子的人走了，公账出了棺材和一场小弥撒，剩下的钱记在册尾。楼梯口的灯很暗，Josef盯着自己的名字看了两遍才转身。
  _effects: cash -0.4 (一周丧葬互助会会费（其中0.4克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-130; flag +funeral_society_member_

- **1949.06** `vienna-courtship-courtyard.sunday-walk/separate-coffee` tags: adulthood, courtship, partner, social, family
  两人拐进街角的咖啡馆，站到锌皮柜台前。Maria Bauer点了牛奶咖啡，Josef要了黑咖啡，十二赫勒一杯。侍者把两杯推过来时，两人几乎同时把钱币按在柜台上，各付各的，谁也没说什么；那一声铜板响，把客气摆得比咖啡还清楚。
  _effects: cash -0.12 (自己那杯黑咖啡（其中0.12克朗记入债务）); relation acquaintance with person:evt:world-vienna-1912:003711:child; mood -0.030000000000000027_

- **1950.01** `oj18-zoo.escape::ctx-vienna-postwar-1945::milieu-tenement/hid-the-chimp` tags: zoo, animals, escape, night, blame, work, odd_job, vienna
  马戏班老板Elisabeth Berg在普拉特门口拦住Josef，说愿意出三十克朗买那只黑猩猩，还缺一个懂它脾气的驯养人。Josef没有答应，也没有报告；夜里，Josef把卡斯帕藏进废弃的鸟舍，每天多带一份面包。
  _effects: cash -1 (bread for the hidden chimpanzee（其中1克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-78; state_parameter oj18-odd-apprenticeship.strangeKnowledge 30 -> 38; state_add oj18-workplace-legend state:world-vienna-1912:915; mood -0.020000000000000018; flag +hid_chimp; knowledge “卡斯帕藏在废弃鸟舍里，听见面包纸响就会从梁上下来。”; relation acquaintance with person-materialized-world-vienna-1912-78; role; flag +workplace_legend_

- **1950.01** `state_tick:oj18-odd-apprenticeship/strange-year/blamed-for-the-noise` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  楼上住户投诉夜里有人拖椅子，管事的把巡查簿翻到Josef的那一页，说签字太潦草，看不出巡过几趟。Josef想辩解，却想起那晚确实在楼梯间多站了一刻钟；扣掉的工钱刚好够买一双不漏水的鞋。
  _effects: state_parameter oj18-odd-apprenticeship.trust 40 -> 24; state_parameter oj18-odd-apprenticeship.reliability 55 -> 45; mood -0.050000000000000044; flag +odd_job_scare_

- **1950.01** `p10-migration-tasks.find-lodging/lodging-no-guarantor` tags: adulthood, migration, housing, family, travel, task, lodging, arrival
  看门人看了他的身份证，说三处房都要担保人签字，他一个也拿不出。房东把地址纸条还给他，他只好拖着箱子去车站候车室的长椅上过夜，半夜被巡夜人叫醒查了两次身份证。第二天他再去门房，看门人只摇头。
  _effects: mood -0.07999999999999996; relation acquaintance with person-materialized-world-vienna-1912-69; relation acquaintance with person-materialized-world-vienna-1912-148_

- **1950.09** `vienna-legacy-worklife.union-office/union-office.write-off` tags: legacy, work, family, reform, ordinary_life
  窗外有人来问入会，接待的人一时不知道怎么开口，Josef替他说“进来坐”。老成员把账本拿回去，用一块旧布包好，放进抽屉最里面。抽屉关上的声音比平时响。
  _effects: mood -0.040000000000000036; flag +union_debt_written_off_

- **1950.09** `vienna-social-movement.recruitment/read-and-decline` tags: development, social_movement, organization, politics
  Josef把传单读了两遍，记下上面的地址，却没有去。第二天照常上工；午休时听见两个工友低声谈论同一场集会。
  _effects: mood -0.010000000000000009_

- **1951.01** `office16-appointment.patronage-ledger::ctx-vienna-postwar-1945::milieu-tenement/appointed-ally` tags: office, appointment, patronage, organization, politics, power, vienna, urban
  Josef把Otto Weiss的名字写在“联络员”后面，月薪一克朗，职责是每周来两次、把外面的消息带进来。Anton Kral说这个岗位没有编制，Josef说先按临时用工算；第一个月，Otto Weiss带来的消息比文件还多。
  _effects: position 联络员 @zoo:person-phase15-Josef-world-vienna-1912-evt:world-vienna-1912:011950; relation colleague with person-materialized-world-vienna-1912-29; flag +appointed_ally; knowledge “联络员不在正式编制里，工资走临时用工。”; mood 0.020000000000000018_

- **1951.01** `state_expire:oj18-odd-apprenticeship` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  Josef的「奇职学徒」到期；相关安排结束。
  _effects: state_remove oj18-odd-apprenticeship state:world-vienna-1912:819; role; flag -odd_job_apprentice_

- **1951.01** `state_tick:oj18-workplace-legend/story-year/story-holds` tags: oj18-workplace-legend, work, legend, odd_job, rumor, identity, night, state
  又有人来问那个老故事。Josef把烟按灭，从头讲了一遍，连哪天下雨、哪盏灯坏了都没有改。听的人散了以后，学徒在门口说“跟上次一样”；Josef知道，至少这一版还能再撑几年。
  _effects: state_parameter oj18-workplace-legend.legend 20 -> 23; state_parameter oj18-workplace-legend.truth 55 -> 57; state_parameter oj18-workplace-legend.toldCount 0 -> 1; reputation 0.019999999999999997_

- **1951.01** `r13-fam.negotiate-rent::ctx-vienna-postwar-1945::milieu-tenement::rent-postwar/rent-control-invoked` tags: task, commerce, housing, rent, negotiation, vienna, urban, postwar
  Josef把市政厅新贴的租金告示抄在一张纸上，带给Luise Winter 3看。Luise Winter 3起初说那是给新房客的，Josef便指着告示上的日期，说不许涨。两人在门口争了半个钟头，最后按旧租收，收据上多盖了一个章。
  _effects: cash -3 (房东的收租日（其中3克朗记入债务）); condition; flag +invoked_rent_control; knowledge “the new rent notice applies to sitting tenants”_

- **1951.06** `vienna-parish-aid.funeral-society/funeral-society.pay` tags: faith, parish, mutual_aid, poverty, family
  Josef数出八赫勒交给Gustav Weiss，看她在蓝皮本上找到自家门牌，把这一周的格子划掉。Gustav Weiss说上个月隔壁巷子的人走了，公账出了棺材和一场小弥撒，剩下的钱记在册尾。楼梯口的灯很暗，Josef盯着自己的名字看了两遍才转身。
  _effects: cash -0.4 (一周丧葬互助会会费); relation acquaintance with person:evt:world-vienna-1912:000571:child_

- **1952.01** `office16-corruption.inspection::ctx-vienna-postwar-1945::milieu-tenement/cover-up` tags: office, corruption, audit, legal, power, dark, vienna, urban
  Josef请Emil Berg 2去咖啡馆，把一只没有标记的信封留在桌上。Emil Berg 2没有碰信封，只把报告里“重复报销”改成“记账口径不一”；作为交换，Josef签了Emil Berg 2侄子的实习证明。两个人都没有提那只信封后来去了哪里。
  _effects: reputation -0.020000000000000004; relation acquaintance with person-materialized-world-vienna-1912-139; flag +bribed_auditor; knowledge “审计报告里的“重复报销”被改成了“记账口径不一”，实习证明由我签字。”; mood 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-139_

- **1952.01** `state_expire:oj18-workplace-legend` tags: oj18-workplace-legend, work, legend, odd_job, rumor, identity, night, state
  Josef的「职场传说」到期；相关安排结束。
  _effects: state_remove oj18-workplace-legend state:world-vienna-1912:915; role; flag -workplace_legend_

- **1952.01** `state_tick:wish-craft/craft-pressure/put-away` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_tick
  Josef暂时把那件事收进抽屉；日子还有别的东西要应付。
  _effects: mood -0.020000000000000018_

- **1952.01** `r13-work.strike-fund::ctx-vienna-postwar-1945::milieu-tenement/soup-kitchen-opened` tags: work, union, strike, mutual_aid, food, vienna, urban, postwar
  Josef把工会活动室的长桌拼起来，用两口大锅煮扁豆汤。Gustav Moser 2赊了半袋豆子和一筐洋葱，条件是罢工结束后先还他。第一天来了三十七个人，Josef给每个碗里多舀半勺；汤不够时，就往锅里再添一壶水。
  _effects: cash -1 (罢工第七天的汤锅（其中0.4克朗记入债务）); food; health 0.019999999999999997 (罢工第七天的汤锅); flag +work13_strike_soup_kitchen; relation colleague with person-materialized-world-vienna-1912-69; organization_funds_

- **1952.04** `p9-gap-adult-solitude.misdelivered-letter/misdelivered-letter.sugar-jar` tags: adulthood, daily, solitude, ordinary, home, letter
  Josef把信压在厨房的糖罐底下，想着明天再问。三天后糖罐渗了油，信角洇出一片深色，收信人的名字糊了半个。她把信拿到门房那儿，门房说这地址已经退过两回了。
  _effects: mood -0.030000000000000027; skill_

- **1953.01** `p9-work-jobsearch.relative-introduction/relative-introduction.never-mentions` tags: work, job_search, negotiation, wages, employment, task, relative, introduction
  点心纸包搁在膝上，Anna Moser 2说熟人多，慢慢问，别急。Josef回家把这些话学给母亲听，母亲只叹了口气。那包糖后来自己家里分着吃了。
  _effects: relation kin with person-materialized-world-vienna-1912-67; cash -1 (再买一包糖上门); mood -0.050000000000000044; relation acquaintance with person-materialized-world-vienna-1912-67_

- **1953.05** `vienna-parish-aid.rent-box/rent-box.accept-all` tags: faith, parish, mutual_aid, poverty, family
  门铃是根铁丝拉的，响得发闷。Mitzi Lechner 2提篮进门先看水槽里泡着的碗，再看墙角的煤箱，说价钱她心里有数。Josef把印泥盒推到桌边，按下去时指尖凉了一下。
  _effects: cash 6 (互助会补上本月房租差额); food; relation acquaintance with person-materialized-world-vienna-1912-27; flag +parish_registered; relation acquaintance with person-materialized-world-vienna-1912-27_

- **1954.01** `p9-social-daily-culture.cafe-newspaper/p9-social-daily-culture.cafe-newspaper.give-seat` tags: daily, culture, leisure, cafe, music, walk, task, task:daily
  Josef只喝了半杯就看见门口站着等位的老主顾，手里转着帽子。Josef把报纸叠好放回木架，起身让出窗边的位子，一杯 Melange 三十赫勒，侍者点头致意，没再收第二杯的钱。走出门时雨小了些，Josef站在檐下理了理衣领，觉得这半个下午也不算白来。
  _effects: cash -0.3 (一杯 Melange 的价钱); reputation 0.03; mood 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-114_

- **1954.01** `vienna-housing-move.rent-notice/rent-notice-neighbors-together` tags: housing, home, rent, family, money
  Josef把Anna Moser 2和楼里另两户人家叫到楼道，把那张纸摆在窗台上传看。看门人在楼梯拐角听着，说房东礼拜三来收钱。几家人合计好，到那天一起等在门厅，先把克朗递过去，再把修补的事一件件摆出来。Josef把纸折进围裙口袋，觉得人凑齐了话也硬气些。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-67; mood 0.040000000000000036; flag +tenant_collective_

- **1954.08** `statistical_infection`
  Josef在Haus der Tante in Klosterneuburg病倒了，肺炎让身体发热、虚弱，接下来的日子只能卧床。

- **1954.09** `statistical_illness_worsened`
  Josef的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1954.09** `vienna-market-debt.coal-credit/coal-credit-full` tags: market, debt, money, home, shop
  邻居帮你把半筐煤抬上楼，楼梯窄，煤块滚了两级。你蹲下去捡，指甲缝里立刻嵌了黑泥。炉子生起来后，屋里那股潮冷气慢慢退了，你才想起晚饭还没着落。
  _effects: cash -1.5 (赊煤到期还款含利息（其中1.5克朗记入债务）); food; flag +coal_credit_debt_

- **1954.10** `statistical_recovery`
  Josef从肺炎中慢慢恢复，能下床喝水，但身体还虚弱。

- **1955.01** `p9-work-jobsearch.relative-introduction/relative-introduction.lead-works` tags: work, job_search, negotiation, wages, employment, task, relative, introduction
  舅公家的咖啡是兑了菊苣的。Josef把从前的活一样样报出来，舅公听着，偶尔嗯一声。转天Friedrich Moser看他搬箱子的架势，说下星期来试杂活。
  _effects: relation kin with person-materialized-world-vienna-1912-133; relation acquaintance with person-materialized-world-vienna-1912-113; mood 0.050000000000000044; relation acquaintance with person-materialized-world-vienna-1912-113_

- **1955.02** `vienna-market-debt.pawn-watch/pawn-chain-only` tags: market, debt, money, home, shop
  链子从你指缝里滑下去，落在绒布上几乎没有声音。掌柜说两克朗四十赫勒，你点了点头。出门时你把表掏出来上了几圈弦，它还在走，只是再没法挂在马甲上了。
  _effects: cash 2.4 (典当银表链所得); mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-27_

- **1955.07** `p9-gap-adult-unemployed.factory-gate/gate-name-taken` tags: adulthood, unemployment, casual_labour, poverty, daily, factory, hiring
  玻璃后面的招工纸被门房用尺子压平，Josef的名字写在横线本上，墨迹歪着。旁边的Josef Berg 3凑过来看了一眼，说这厂子去年也招过两回，录用的多半是厂里老人的亲戚。
  _effects: flag +factory_callback; mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-171_

- **1955.09** `p9-social-tenement-neighbors.flour-loan/flour-loan.half-bag-with-note` tags: housing, neighbors, tenement, daily, money, reputation
  Josef只舀出半袋，说自家也不宽裕，要Mitzi Lechner 2把上次的煤钱一并记在纸上。Mitzi Lechner 2接过纸片，当着面把日期和数目重写一遍，两人各留一半。面粉少了，账却清楚了，Josef把纸片夹进账簿样的旧本子。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-27_

- **1956.01** `state_tick:wish-craft/craft-pressure/press-on` tags: wish-craft, wish, wish:craft, craft, work, mastery, state, state_tick
  Josef又把那件没实现的事翻出来想了一遍；这一次没有告诉任何人。
  _effects: mood 0.020000000000000018_

- **1956.01** `p9-social-daily-culture.lending-library/p9-social-daily-culture.lending-library.volksbibliothek` tags: daily, culture, leisure, cafe, music, walk, task, task:knowledge
  Josef听Hermann Hofer报出押金数目，把伸进内袋的手又抽了回来。问清免费阅览处的位置后，Josef穿过两条街，在 Volksbibliothek 的阅览室门口登记了姓名，坐在长桌边读了一下午；一个赫勒没花，只是不能把书带回家，天黑前就得还回去。
  _effects: mood 0.030000000000000027; skill; relation acquaintance with person-materialized-world-vienna-1912-66_

- **1956.10** `vienna-medical-treatment.night-fever/sweat-it-out` tags: health, medical, family, money, injury
  Josef说胡话时念着车间的排班表，Mitzi Lechner 2一句句应着，拿小勺往嘴里送温水。床头那半瓶退烧药早见了底，她没舍得倒最后一滴，留着天亮再说。
  _effects: health -0.04000000000000001 (高烧硬熬伤身); condition_

- **1956.10** `vienna-parish-aid.rent-box/rent-box.food-only` tags: faith, parish, mutual_aid, poverty, family
  Josef只收下篮里的面包和豆子，把煤袋推回Franz Huber 2手里，说房租自己再想办法，请她们给介绍点零工。Franz Huber 2把煤放在走廊窗台，说礼拜四后院有人要拆旧木箱，一赫勒一捆，工钱不多但现结。Josef记下门牌，答应一早过去。
  _effects: food_

- **1957.01** `p9-social-daily-culture.singing-club/p9-social-daily-culture.singing-club.join-second-row` tags: daily, culture, leisure, cafe, music, walk, task, task:social
  Josef把两克朗月费和徽章钱一起放在啤酒渍斑斑的桌上，Mitzi Lechner 2在名册上添了一行。钢琴缺的那个音在排练中途又卡住，Josef站在第二排跟着哼，声音被两边的人盖住，胸腔里却震得发麻；散场时能把副歌完整唱下来，也记住了怎么在人群里找准自己的声部。
  _effects: cash -2 (合唱团月费和铜徽章钱); mood 0.06999999999999995; skill_
## Rosa

Born 1912.01, died 1915.01 (age 3).
Education: none 0; occupation: none; roles: infant, child.

### State snapshot
- p22-child-omen [person] (ended 1915.1: owner_died) parameters={"strangeness":38,"attention":35,"protection":47,"fear":17} links={} ticks=1

### 9 subject events

- **1912.02** `p22-strange-doctor-prediction::ctx-vienna-1912::milieu-tenement/the-doctor-is-optimistic` tags: infancy, family, doctor, illness, omen, strange, dark, drama
  医生说孩子只是瘦，开了一瓶味道很坏的补药，说“过了春天就好了”。Rosa Lechner把这句话记了很多年；每年春天，家里都要说一遍，像在核对一张旧账单，药瓶上还贴着手写的标签。
  _effects: mood 0.03; state_add p22-child-omen state:world-vienna-1912:25; flag +doctor_optimism_

- **1912.02** `p22-warm-naming-feast::ctx-vienna-1912::milieu-tenement/the-neighbour-cries` tags: infancy, family, feast, name, neighbor, warm, tender, drama
  Emil Weiss抱着Rosa忽然哭了，说这孩子像她许多年前失去的儿子。Rosa Lechner不知道该说什么，只把蛋糕又切了一块，推到她面前；Emil Weiss把孩子抱得更紧，眼泪落在襁褓上，久久没有松开。
  _effects: mood -0.03; relation acquaintance with person-phase15-Rosa-world-vienna-1912; flag +guest_cried_

- **1912.07** `p22-comic-name-register::ctx-vienna-1912::milieu-tenement/the-name-is-corrected` tags: infancy, family, bureaucracy, name, official, comic, tender, drama
  Rosa Lechner当场发现，要求改回来。登记员叹了口气，收了三克朗，把“嚏”划掉，在旁边写上正确的字，然后把笔搁下；Rosa全程睡着，什么也没损失，只是那张纸被折成了四折。
  _effects: cash -3 (fee to correct the register); mood 0.020000000000000004; flag +name_corrected_

- **1913.01** `vienna-life-toddler-wrong-cradle/the-blanket-is-wrong` tags: infancy, family, rumour, identity, comic, drama
  Anna Moser盯着Rosa的摇篮看了很久，说这床蓝被子不是这家人的。Rosa Lechner把被子翻过来，角落绣着一个陌生的姓；Rosa却抓着被角不放，像是认得它。Anna Moser退后一步，说“我什么都没说”。
  _effects: flag +wrong_cradle_blanket; knowledge “摇篮里的蓝被子绣着一个陌生的姓。”; mood -0.03_

- **1913.01** `state_tick:p22-child-omen/the-omen-returns/nothing-happens` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  又过了一年，什么也没有发生。Rosa照常吃饭、摔跤、把鞋穿反；那个说过预言的人搬走了。家里把红绳解下来，却没有扔，只收进针线盒最里面，红绳上落了一点灰。
  _effects: state_parameter p22-child-omen.strangeness 40 -> 38; state_parameter p22-child-omen.fear 20 -> 17; state_parameter p22-child-omen.protection 45 -> 47; mood 0.01_

- **1913.07** `vienna-life-birth-letter-from-the-dead/the-letter-is-a-bill` tags: infancy, family, secret, letter, drama
  信里没有问候，只有一张旧账单：棺材、墓地、一趟从边境回来的车费。Rosa Lechner把账单翻过来，背面用铅笔写着“别让孩子知道”。Rosa伸手去抓纸角，Rosa Lechner没有让。
  _effects: cash -4 (paid an old funeral debt); flag +family_debt_letter; mood -0.03_

- **1913.10** `iw18-infancy.first-word::ctx-vienna-1912::milieu-tenement/the-dog-gets-the-first-word` tags: infancy, first_word, memory, family, wonder, eerie, vienna, urban
  Rosa追着炉边的狗爬了半间屋，忽然拍着地板喊出狗的名字。狗吓得钻到床下，Rosa Lechner笑得把水壶都放下了；邻居在门外问出了什么事。那天晚上，家里给狗多留了半块面包。
  _effects: mood 0.039999999999999994; food; flag +first_word_dog_name_

- **1914.01** `vienna-life-toddler-first-words/first-word-door` tags: infancy, family, first, comic
  门外有人上楼，Rosa忽然指着门说：“爸爸。”Rosa Lechner看了看空门口，没有纠正。那天晚上，孩子把家里每个人的名字都叫了一遍，叫错两个，却叫得很认真。
  _effects: skill; mood 0.020000000000000004; flag +first_word_door_

- **1914.02** `vienna-life-toddler-accident/safe-in-the-doorway` tags: infancy, accident, family, danger
  Rosa Lechner在最后一刻抓住了Rosa的后领。孩子悬在两级台阶之间，鞋底蹭着地，手里还攥着那只线轴。Rosa Lechner把孩子放回地上，蹲下来看了很久，才说：“再跑，我就把门关上。”
  _effects: mood -0.020000000000000004; skill_
## Emil

Born 1912.01, died 1914.04 (age 2).
Education: none 0; occupation: none; roles: infant, child.

### State snapshot
- wish-love [person] (ended 1914.4: owner_died) parameters={"intensity":0.55,"fixation":0.5,"irony":0.3} links={} ticks=0
- p22-family-legend [person] (ended 1913.1: replaced_by:p22-family-legend) parameters={"warmth":68,"secrecy":14,"danger":8,"promise":40} links={} ticks=1
- p22-family-legend [person] (ended 1914.4: owner_died) parameters={"warmth":55,"secrecy":68,"danger":28,"promise":55} links={} ticks=1

### 14 subject events

- **1912.02** `vienna-infant-household.laundry-day/sibling-watches` tags: infancy, health, family, home
  Katharina Bauer在厨房的木盆里搓亚麻布，热水汽模糊了窗。Anna Bauer坐在摇床边的矮凳上晃拨浪鼓，Emil伸手去抓。等Katharina Bauer晾完最后一块尿布，Emil已经在Anna Bauer的看护下睡熟，摇床没被蹬歪。
  _effects: relation kin with person-phase15-Emil-world-vienna-1912; health 0.020000000000000018 (被看护着，没磕碰); mood 0.03_

- **1912.02** `p22-comic-christening::ctx-vienna-1912::milieu-tenement/the-priest-sneezes` tags: infancy, family, christening, church, neighbor, comic, tender, drama
  神父念到孩子的名字时打了个大喷嚏，蜡烛灭了，Emil却笑出了声。Emil Weiss赶紧去点蜡烛，手一抖，火苗又灭了；教堂里第一次有人笑，神父也笑了，说这是今天最响的一声阿门。
  _effects: mood 0.04; relation acquaintance with person-phase15-Emil-world-vienna-1912; flag +christening_sneeze; state_add p22-family-legend state:world-vienna-1912:18_

- **1913.01** `vienna-life-infant-first-smile/colic-night` tags: infancy, family, first, warm, injury
  夜里Emil哭了很久，Katharina Bauer抱着孩子在屋里来回走，数着地板缝。天快亮时孩子终于打了个嗝，安静下来；Katharina Bauer坐在床沿，发现自己还保持着走路的姿势。
  _effects: mood -0.03; health -0.010000000000000009 (lost sleep)_

- **1913.01** `state_tick:p22-family-legend/the-story-changes-hands/a-detail-goes-missing` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，故事里最要紧的那件东西不见了：先是名字，后来是地点。Emil问起时，大人说“你记错了”；可柜子最底层那只空盒子，谁也没有扔，锁却换过了，钥匙也不见了。
  _effects: state_parameter p22-family-legend.secrecy 10 -> 14; state_parameter p22-family-legend.danger 5 -> 8; state_parameter p22-family-legend.warmth 70 -> 68; mood -0.01_

- **1913.01** `p22-strange-cradle-secret::ctx-vienna-1912::milieu-tenement/the-ticket-is-redeemed` tags: infancy, family, cradle, secret, inheritance, strange, dark, drama
  Katharina Bauer拿着当票去赎，取回一把银勺子，勺柄上刻着一个看不清的字母。回家后把勺子塞进Emil手里，说“用吧”；孩子敲着桌沿，勺子发出很轻的响声，像在回答什么。
  _effects: cash -5 (redeeming the pawn ticket); state_add p22-family-legend state:world-vienna-1912:44; flag +spoon_returned_

- **1913.01** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Emil家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 60 -> 64; state_parameter p22-family-legend.warmth 55 -> 57; mood 0.01_
  _causes: evt:world-vienna-1912:000266_

- **1913.02** `vienna-life-toddler-wrong-cradle/the-blanket-is-wrong` tags: infancy, family, rumour, identity, comic, drama
  Emil Weiss盯着Emil的摇篮看了很久，说这床蓝被子不是这家人的。Katharina Bauer把被子翻过来，角落绣着一个陌生的姓；Emil却抓着被角不放，像是认得它。Emil Weiss退后一步，说“我什么都没说”。
  _effects: flag +wrong_cradle_blanket; knowledge “摇篮里的蓝被子绣着一个陌生的姓。”; mood -0.03_

- **1913.02** `vienna-life-birth-letter-from-the-dead/the-letter-is-real` tags: infancy, family, secret, letter, drama
  邮差把一封边角磨白的信塞进门缝，收信人是一个已经死了三年的名字。Katharina Bauer把Emil放在膝上，拆开信，里面只有一句：“孩子像不像他？”Anna Moser在门口探头，问是不是寄错了；Katharina Bauer把信折回去，说“没有寄错”。
  _effects: flag +letter_from_dead_relative; knowledge “一封写给死去亲人的信问：孩子像不像他。”; mood -0.04_

- **1913.10** `statistical_infection`
  Emil在Bauer-Wohnung, Leopoldstadt病倒了，痢疾让身体发热、虚弱，接下来的日子只能卧床。

- **1913.12** `statistical_illness_worsened`
  Emil的痢疾没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1914.01** `vienna-life-toddler-first-words/first-word-more` tags: infancy, family, first, comic
  Emil把空碗推回Katharina Bauer面前，清清楚楚地说了一个字：“还要。”Katharina Bauer愣住，随后把锅底最后一点糊刮进碗里。孩子学会了用一句话让世界再转一圈。
  _effects: skill; mood 0.03_

- **1914.01** `state_tick:p22-family-legend/the-story-changes-hands/a-detail-goes-missing` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，故事里最要紧的那件东西不见了：先是名字，后来是地点。Emil问起时，大人说“你记错了”；可柜子最底层那只空盒子，谁也没有扔，锁却换过了，钥匙也不见了。
  _effects: state_parameter p22-family-legend.secrecy 64 -> 68; state_parameter p22-family-legend.danger 25 -> 28; state_parameter p22-family-legend.warmth 57 -> 55; mood -0.01_

- **1914.03** `statistical_illness_worsened`
  Emil的痢疾没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1914.04** `statistical_death/infant_diarrhoea` tags: death
  Emil在Bauer-Wohnung, Leopoldstadt连续腹泻了两天，嘴唇干裂，喂水也留不住。家里没有钱再请医生，天亮前孩子停止了呼吸。Anna Bauer在场。
  _effects: death (婴幼儿腹泻与脱水)_
## Lena

Born 1912.01, alive at 1957.
Education: none 0; occupation: none; roles: infant, child, movement_member, amateur_actor, club_member, office:太平间杂役, questioned_lover, separated, watched_by_police, watched_by_neighbours, denouncer, family_searcher, tenant_organizer, foster_parent.

### State snapshot
- p22-child-omen [person] (ended 1918.1: duration expired) parameters={"strangeness":43,"attention":39,"protection":47,"fear":20} links={} ticks=3
- ld18-impossible-attachment [person] (ended 1938.1: duration expired) parameters={"devotion":63,"improvisation":30,"pressure":85,"discretion":13,"grief":29,"named":"the other side of the church"} links={"beloved":"Klara"} ticks=4
- oj18-odd-apprenticeship [person] (ended 1939.1: duration expired) parameters={"trust":14,"strangeKnowledge":40,"reliability":40,"nightsWorked":24,"post":"太平间杂役"} links={} ticks=3
- debt-bondage [person] (ended 1944.1: duration expired) parameters={"debt":20,"creditor":"银行"} links={} ticks=2
- df18-uncanny-mark [person] (ended 1955.1: duration expired) parameters={"attention":35,"pain":4,"claimed":"curse","concealed":true} links={} ticks=6

### 162 subject events

- **1912.07** `vienna-life-birth-letter-from-the-dead/the-neighbour-takes-it` tags: infancy, family, secret, letter, drama
  Hermann Kral把信从门缝里抽走，说这封信已经转过三家，不该再往这里送。Friedrich Hofer问上面写了什么；Hermann Kral把信折成四折塞进自己口袋，说“都是旧账”。那天夜里，Friedrich Hofer在厨房坐到很晚。
  _effects: flag +neighbor_intercepted_letter; relation acquaintance with person-hermann-kral; mood -0.02_

- **1912.09** `p22-strange-doctor-prediction::ctx-vienna-1912::milieu-tenement/the-doctor-is-optimistic` tags: infancy, family, doctor, illness, omen, strange, dark, drama
  医生说孩子只是瘦，开了一瓶味道很坏的补药，说“过了春天就好了”。Josefine Hofer把这句话记了很多年；每年春天，家里都要说一遍，像在核对一张旧账单，药瓶上还贴着手写的标签。
  _effects: mood 0.03; health 0.009999999999999898 (a tonic and a hopeful sentence); state_add p22-child-omen state:world-vienna-1912:22; flag +doctor_optimism_

- **1912.11** `p22-warm-naming-feast::ctx-vienna-1912::milieu-tenement/the-neighbour-cries` tags: infancy, family, feast, name, neighbor, warm, tender, drama
  Anna Moser抱着Lena忽然哭了，说这孩子像她许多年前失去的儿子。Josefine Hofer不知道该说什么，只把蛋糕又切了一块，推到她面前；Anna Moser把孩子抱得更紧，眼泪落在襁褓上，久久没有松开。
  _effects: mood -0.030000000000000013; relation acquaintance with person-phase15-Lena-world-vienna-1912; flag +guest_cried_

- **1913.01** `vienna-life-infant-first-smile/smile-at-the-lamp` tags: infancy, family, first, warm
  Friedrich Hofer把Lena抱到窗边，煤汽灯罩上有一圈晃动的光。孩子盯着看了很久，忽然笑出声，口水滴在Friedrich Hofer的袖口上。屋里的人都停了一下，像是听见了什么了不起的消息。
  _effects: mood 0.04; health 0.010000000000000009 (a good day)_

- **1913.01** `state_tick:p22-child-omen/the-omen-returns/nothing-happens` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  又过了一年，什么也没有发生。Lena照常吃饭、摔跤、把鞋穿反；那个说过预言的人搬走了。家里把红绳解下来，却没有扔，只收进针线盒最里面，红绳上落了一点灰。
  _effects: state_parameter p22-child-omen.strangeness 40 -> 38; state_parameter p22-child-omen.fear 20 -> 17; state_parameter p22-child-omen.protection 45 -> 47; mood 0.01_

- **1913.04** `vienna-life-toddler-first-words/first-word-door` tags: infancy, family, first, comic
  门外有人上楼，Lena忽然指着门说：“爸爸。”Josefine Hofer看了看空门口，没有纠正。那天晚上，孩子把家里每个人的名字都叫了一遍，叫错两个，却叫得很认真。
  _effects: skill; mood 0.020000000000000018; flag +first_word_door_

- **1914.01** `vienna-life-toddler-wrong-cradle/the-swap-story-spreads` tags: infancy, family, rumour, identity, comic, drama
  三天后，整条楼道都在说这家的孩子“抱错了”。Josefine Hofer抱着Lena去敲Anna Moser的门，Anna Moser不开，只在门里说“我也是听来的”。Lena在母亲怀里睡着了，口水把她的领口洇出一小片深色。
  _effects: flag +cradle_swap_rumour; relation rival with person-anna-moser; mood -0.04999999999999999_

- **1914.02** `vienna-life-toddler-accident/scalded-hand` tags: infancy, accident, family, danger, injury
  厨房的锅盖没有盖严，Lena伸手去够桌上的勺子，蒸汽先扑到手腕上。Josefine Hofer把孩子抱到水缸边，一瓢一瓢地浇冷水；孩子哭得打嗝，锅里的汤还在冒泡。
  _effects: health -0.07999999999999996 (scalded hand); condition; cash -1 (bandages and ointment); mood -0.04999999999999999_

- **1915.01** `vienna-life-child-family-legend/happy-legend` tags: childhood, family, secret, story
  Josefine Hofer讲起自己小时候在乡下追一只白鹅，追到河边，鹅没追到，倒捡回一篮鸭蛋。Lena笑得从凳子上滑下来，Josefine Hofer也跟着笑，说这个家不是只有欠账和葬礼。
  _effects: mood 0.04; mood 0.020000000000000018_

- **1915.02** `vienna-early-childhood.stairwell-fall/arm-bruise` tags: childhood, family, home, street, injury
  楼梯间的灯罩空着，第三级踏板比别处高。Lena一脚踩空，滚到平台，右小臂磕在铁扶手的弯头上。Josefine Hofer听见哭声跑出来，把Lena抱回屋，用冷水毛巾敷那块青紫，再用旧布条缠了两圈。夜里Lena哭醒两次。
  _effects: health -0.040000000000000036 (从楼梯滚下，小臂挫伤); mood -0.04999999999999999_

- **1916.01** `vienna-life-child-first-friend/stolen-marble` tags: childhood, friendship, family, comic
  Hedwig把Lena的玻璃弹珠藏进鞋里，被当场看见。Hedwig说只是“替你拿着”，Lena没有揭穿，也没有再拿出第二颗。两个人蹲在墙根，把一只蚂蚁看了很久，谁也没有先回家。
  _effects: skill; mood -0.010000000000000002_

- **1916.01** `state_tick:p22-child-omen/the-omen-returns/the-coincidence-repeats` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  又过了一年，同一件小事又发生了：钟停在同一个时刻，门口的狗对着空处叫。Lena正在学系鞋带，抬头问“又来了吗”；大人说没有，手却先去摸门框，谁也没有回答。
  _effects: state_parameter p22-child-omen.strangeness 38 -> 43; state_parameter p22-child-omen.attention 35 -> 39; state_parameter p22-child-omen.fear 17 -> 20; mood -0.010000000000000002_

- **1916.02** `vienna-life-child-inherited-wish/the-caregiver-cries` tags: childhood, family, wish, grief, uncanny, drama
  Josefine Hofer没有回答，起身去洗碗，水开得很大。Lena跟到厨房，拽了拽衣角，说“你别哭，我不说了”。Josefine Hofer蹲下来，把孩子抱得很紧，说“你说，你继续说”。
  _effects: mood -0.04999999999999999; flag +inherited_wish_grief_

- **1917.04** `vienna-early-childhood.stairwell-fall/arm-bruise` tags: childhood, family, home, street, injury
  黑楼梯间只有门缝透进来的一点光。Lena踩空时伸手去抓扶手，手臂先撞在铁端上，整个人滚下三级。Josefine Hofer把Lena抱到灶边，拿湿冷毛巾按住肿起的地方，又撕了一条旧布缠紧。第二天Lena举着胳膊下楼，照样去院子里玩。
  _effects: health -0.040000000000000036 (从楼梯滚下，小臂挫伤); mood -0.050000000000000044_

- **1918.01** `state_expire:p22-child-omen` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  Lena的「孩子身上的兆头」到期；相关安排结束。
  _effects: state_remove p22-child-omen state:world-vienna-1912:22_

- **1918.01** `p9-gap-childhood-chores.mind-sibling/sibling-falls-at-well` tags: childhood, household, chores, school, task, daily, sibling, care
  土豆滚进墙角的煤灰里，Lena弯腰去追，再抬头时Otto Hofer已经坐在井台边，裤腿湿了一片，哭声一抽一抽。Maria Weiss把孩子抱进灶间，Lena跟在后面，手指抠着门框。Josefine Hofer回来没问经过，只把Lena的碗收走一半，说“看个人都看不住”。
  _effects: health -0.030000000000000027 (在井台边摔了一跤); mood -0.06; relation kin with person-josefine-hofer; relation acquaintance with person-materialized-world-vienna-1912-15_

- **1919.01** `p9-gap-childhood-chores.laundry-help/laundry-three-heller` tags: childhood, household, chores, school, task, daily, laundry, work
  “拽平，别留褶。”Friedrich Hofer在绳子那头喊。Lena踮着脚把床单拉直，碱水把指缝泡得发白。收工时天已经黑了，Friedrich Hofer数了三赫勒，又在围裙上擦干手才递过来。Lena把钱塞进袜筒，回家路上一直攥着，虎口的裂口沾了汗，火辣辣地疼。
  _effects: cash 0.03 (帮邻居晾床单挣的三赫勒); health -0.030000000000000027 (碱水泡手，虎口裂开); relation acquaintance with person-friedrich-hofer_

- **1920.01** `p9-gap-childhood-chores.market-line/line-sold-out-potatoes` tags: childhood, household, chores, school, task, daily, market, food
  “卖完了。”三个字从窗口里传出来，Lena后面的队伍立刻散了一半。Lena没走，趴在窗台上看伙计扫面屑，直到人家挥手赶人。旁边摊子的土豆带着泥，Lena用围裙兜住，一枚一枚数铜板，回家报账时连找零都说清了。
  _effects: food; mood -0.03; skill; relation acquaintance with person-materialized-world-vienna-1912-1_

- **1921.01** `p9-gap-childhood-chores.fetch-coal/coal-half-credit` tags: childhood, household, chores, school, task, daily, coal, errand
  “月底一起结。”掌柜说完，把半筐煤推到柜台外。Lena用胸口顶住筐沿往家挪，煤灰落进领口，手心被麻绳磨得发亮。Friedrich Hofer在Leopoldstädter Zinshaus, gemeinsamer Gang门口等到人，先看了看筐底，再看了看Lena的手，把漏掉的碎渣扫进簸箕。
  _effects: food; health -0.01999999999999999 (搬煤勒伤手掌，路上吸入煤灰); relation kin with person-friedrich-hofer_

- **1922.01** `p9-gap-childhood-chores.laundry-help/laundry-bread-with-friend` tags: childhood, household, chores, school, task, daily, laundry, work
  两个孩子在院子两头跑，一个递，一个夹，床单在风里鼓起来。最后一条挂好，Friedrich Hofer从厨房拿出面包，先给了自家孩子，再掰一块给Lena。Lena把面包塞进围裙口袋，回家后放在家里人的碗边，说自己在外面吃过了。
  _effects: food; relation acquaintance with person-friedrich-hofer; skill; relation acquaintance with person-materialized-world-vienna-1912-38_

- **1923.01** `p9-gap-childhood-chores.fetch-coal/coal-refused-nuggets` tags: childhood, household, chores, school, task, daily, coal, errand
  Lena空手站在窗口，听掌柜说“叫你Friedrich Hofer来”，耳朵一直红到脖子。后墙的渣堆冻得硬，Lena用鞋尖刨开表层，把煤核一颗颗捡进围裙。回家路上碰到同巷的孩子，Lena把纸袋往身后藏，进门才交给Friedrich Hofer。
  _effects: mood -0.04000000000000001; food; skill_

- **1924.01** `p9-childhood-apprenticeship.ask-for-trial/silent-follow` tags: adolescence, work, apprenticeship, labour, training, family, task, task:work
  Lena把要说的话在嘴里嚼了一路，到了门口却只跟着推车走。装订铺后院堆着纸毛，Maria Weiss把一捆纸往Lena怀里一塞，Lena趔趄半步，还是抱进了门。天黑后铺子上了锁，Lena从后门退出来，手掌上全是纸毛，心里却记住了这条路。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-15; flag +seeking_work_

- **1924.02** `p9-childhood-adolescence.courtyard-gang/gang-help-with-bread` tags: adolescence, friendship, identity, work, school, secret, church
  面包房关门前Lena和Hedwig凑了四赫勒，分到一块凉了的面包。夜里母亲问Lena吃了什么，Lena只答在院子里喝的水。
  _effects: cash -4 (凑钱买面包（其中4克朗记入债务）)_

- **1925.01** `task-vienna-youth-apprenticeship-search/trial-promised` tags: task, task:work, work, adolescence, apprenticeship
  Lena在印刷厂门口等到工头出来，把姓名、住址和会写的字报了一遍。Friedrich Kral 2让他下周一早来试半天，先不给工钱，只管一顿午饭。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-23; flag +apprenticeship_trial_promised; mood 0.05; relation acquaintance with person-materialized-world-vienna-1912-23_

- **1926.01** `task-vienna-poor-apprentice.foreman-introduction/relative-introduces-trial-half-day` tags: adolescence, apprentice, work, education, poverty, printshop, task, task:work
  亲戚把他带到工头面前，工头让他下星期来试半天，先看裁纸和搬版。母亲熨平的衬衫领子还是硬得硌脖子，他站在厂门口把姓名说了两遍。
  _effects: flag +half_day_trial_at_big_printshop; relation acquaintance with person-materialized-world-vienna-1912-39; mood 0.05; relation acquaintance with person-materialized-world-vienna-1912-39_

- **1927.01** `task-vienna-youth-apprenticeship-search/no-vacancy` tags: task, task:work, work, adolescence, apprenticeship
  Lena问了三家印刷厂，得到的回答都是“今年不收学徒”。最后一家让他把名字写在纸角上，说有空缺再通知，但谁都知道那张纸会被压在账本下面。
  _effects: mood -0.05; knowledge “今年印刷厂大多不收新学徒。”; relation acquaintance with person-materialized-world-vienna-1912-2_

- **1928.01** `p9-childhood-youth-aspiration.save-for-books/bought-used-book` tags: adolescence, education, aspiration, school, books, club, exam, task
  回家路上Lena把书夹在腋下，怕雨点打湿纸页。进了门，Josefine Hofer问他哪来的书，他把粘好的书脊翻过来给母亲看，布条颜色跟袜子一样。
  _effects: cash -3 (旧书摊买《机械制图》); skill; mood 0.05; relation acquaintance with person-materialized-world-vienna-1912-10; relation acquaintance with person-materialized-world-vienna-1912-10_

- **1929.01** `task-vienna-youth-apprenticeship-search/trial-promised` tags: task, task:work, work, adolescence, apprenticeship
  Lena在印刷厂门口等到工头出来，把姓名、住址和会写的字报了一遍。Alois Kral让他下周一早来试半天，先不给工钱，只管一顿午饭。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-14; mood 0.05; relation acquaintance with person-materialized-world-vienna-1912-14; relation acquaintance with person-materialized-world-vienna-1912-9_

- **1930.01** `p10-family-tasks.find-missing-kin/find-missing-kin.missing-list` tags: adulthood, family, social, marriage, care, inheritance, task, missing_kin
  失踪名册的纸很薄，办事员用钢笔一戳就洇开。Lena把编号条收进证夹，出门时有个女人问她是不是也找人。两人结伴去收容所，门房说名单上没这个人。回家路上女人说下星期还去，Lena点头。
  _effects: mood -0.1; relation acquaintance with person-materialized-world-vienna-1912-2; flag +brother_missing_registered_

- **1930.02** `vienna-medical-treatment.night-fever/corner-doctor` tags: health, medical, family, money
  施特劳斯医生用酒精棉擦手，把药粉倒进小纸袋，折口时指甲掐出印子。他说夜里别再喝醋水，那东西烧胃。Hermann Kral把炉火拨旺，在灶上坐了一壶水，答应第二天替Lena去铺子里告假。
  _effects: cash -4 (医生出诊费和药费（其中4克朗记入债务）); health 0.05 (药粉和糖浆缓解症状); relation friend with person-hermann-kral_

- **1930.02** `vienna-market-household.market-credit/market-credit.delay` tags: home, market, food, social
  三个克朗拖了九天。玛丽亚收下时数都没数，只把Lena的名字从木牌上抹去，粉笔灰落在卷心菜上。Mitzi Hofer拎着篮子从旁边过去，没停脚。
  _effects: cash -3 (延迟偿还市场赊账（其中3克朗记入债务）); food; reputation -0.05; relation acquaintance with person-materialized-world-vienna-1912-44; relation acquaintance with person-materialized-world-vienna-1912-44_

- **1930.02** `vienna-market-debt.rent-arrears/rent-negotiate-installments` tags: market, debt, money, home, shop
  你没去借钱，直接下楼找房东，说月底前先付两克朗，剩下两克朗分两个星期补齐。房东叼着雪茄，拿铅笔在你的纸条背面写了个日期，说再拖一天就换锁。邻居在楼道口听见了，冲你摇了摇头，但没说什么。
  _effects: cash -2 (按分期付掉的第一笔欠租（其中2克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-3; flag +rent_installment_plan; relation acquaintance with person-materialized-world-vienna-1912-3_

- **1930.02** `p9-gap-adult-solitude.window-argument/window-argument.nod` tags: adulthood, daily, solitude, ordinary, home, neighbor, overheard
  Lena在窗边听了一刻钟，只听出是工钱和面包账的事，最后把窗虚掩上睡了。第二天清早在楼梯口碰见那个女人，眼睛有点肿，两人错身时她点了点头，谁也没说话。
  _effects: mood 0.020000000000000004; flag +knows_downstairs_quarrel_

- **1930.06** `vienna-social-movement.recruitment/join-and-carry` tags: development, social_movement, organization, politics
  Lena在楼梯下面接到一张折成四折的传单。纸上没有署名，只写着下一次集会的地址。Lena去了，在昏暗的屋里报上姓名，成为Sozialdemokratische Arbeiterpartei Österreichs (SDAP)的一员，并答应负责自己所在街区的联络。
  _effects: organization_membership; role; relation acquaintance with person-materialized-world-vienna-1912-34; relation acquaintance with person-materialized-world-vienna-1912-34_

- **1930.06** `vienna-women-housework.coal-stove/coal-stove.buy-coal` tags: gender, housework, home, labour, family
  炉门一开，黑烟先扑出来，Lena眯着眼把纸团往里塞。火苗舔着碎煤慢慢亮起来，Hermann Kral隔着门喊当心一氧化碳。水壶开始咕噜作响，屋里才有点热乎气。
  _effects: cash -0.6 (购买一小筐碎煤); food_

- **1930.11** `hs18-paper.pulled-column::ctx-klosterneuburg-rural-1912::milieu-tenement/read-the-blank` tags: newspaper, censorship, reading, daily, rumor, history, rural, agriculture
  Lena站在报摊前，把那份报纸翻到最后一栏。原先登连载的位置只剩一块空白，边上印着“版面调整”。Luise Winter低声说，铅版是夜里被抽走的；排队的人却已经开始猜下一期会不会连名字也换掉。
  _effects: knowledge “报纸最后一栏被抽掉，不是因为版面调整。”; mood -0.02; flag +read_pulled_column; relation acquaintance with person-materialized-world-vienna-1912-20_

- **1930.12** `vienna-housing-move.rent-notice/rent-notice-neighbors-together` tags: housing, home, rent, family, money
  Lena把Hermann Kral和楼里另两户人家叫到楼道，把那张纸摆在窗台上传看。看门人在楼梯拐角听着，说房东礼拜三来收钱。几家人合计好，到那天一起等在门厅，先把克朗递过去，再把修补的事一件件摆出来。Lena把纸折进围裙口袋，觉得人凑齐了话也硬气些。
  _effects: relation acquaintance with person-hermann-kral; mood 0.04; flag +tenant_collective_

- **1931.01** `p9-social-relationship-initiative.introduce-two-people/leave-them-alone` tags: courtship, friendship, family, social, initiative, housing, task, task:social
  介绍完就找了个由头先走，说家里炉子还烧着，账只结了自己的那一杯。晚上回到楼里，缝纫女工在楼梯上碰见，只说那人挺有意思，没再多讲。老友第二天在印厂什么也没提，这事就搁在那里。
  _effects: cash -0.3 (自己那一杯咖啡); relation friend with person:evt:world-vienna-1912:000061:child; relation acquaintance with person-otto-winter; mood 0.01_

- **1931.01** `vienna-women-housework.piecework-bundle/piecework.dispute-rate` tags: gender, housework, home, labour, family
  Josef Moser用拇指甲刮着一件领子的边线，说这儿跳了针。Lena把煤油灯往前推了推，让他凑近看，说线是细了点，活没少做。Emil Weiss倚在门框上没走，屋里一时只有尺子碰桌面的响。
  _effects: cash 0.6 (争执后按降低的工价结算); reputation 0.03; relation colleague with person-materialized-world-vienna-1912-10; mood -0.03_

- **1931.03** `vienna-parish-aid.funeral-society/funeral-society.defer` tags: faith, parish, mutual_aid, poverty, family
  蓝皮本翻到Lena家那一行，Friedrich Hofer用铅笔打了个小圈，说月底再来。她顺手把门边的煤灰踢进门里，说别浪费。楼上有扇窗没关严，风把本子的薄页吹得翻动。
  _effects: mood -0.019999999999999997; relation acquaintance with person-friedrich-hofer_

- **1931.09** `p9-social-family-conflict-care.sibling-medicine-bill/refuse-push-bill` tags: family, care, siblings, inheritance, housing, money
  Lena把药费单从糖罐底下抽出来，对折，推回桌子中央，说上个月的工钱已经贴过煤钱，这回一个赫勒也拿不出。Otto Hofer的脸沉下来，练习本翻得哗哗响，最后把单子重新压回糖罐底下，起身去够门后的外套。三只咖啡杯里的渣子凉在桌上，兄妹这一回把话都说薄了。
  _effects: relation kin with person:evt:world-vienna-1912:000061:child; mood -0.04_

- **1932.01** `p9-work-jobsearch.relative-introduction/relative-introduction.lead-works` tags: work, job_search, negotiation, wages, employment, task, relative, introduction
  星期天的点心拆开纸包，Katharina Bauer 2先问他这半年干了什么。听完没多说，只说明天一早跟他走。料场边那个工头话不多，让他搬了两趟木箱，点了点头。
  _effects: relation kin with person-materialized-world-vienna-1912-32; relation acquaintance with person-materialized-world-vienna-1912-64; flag +trial_work_pending; mood 0.05; relation acquaintance with person-materialized-world-vienna-1912-32; relation acquaintance with person-materialized-world-vienna-1912-64_

- **1932.07** `vienna-market-household.market-credit/market-credit.delay` tags: home, market, food, social
  三个克朗拖了九天。玛丽亚收下时数都没数，只把Lena的名字从木牌上抹去，粉笔灰落在卷心菜上。Elisabeth Bauer 2拎着篮子从旁边过去，没停脚。
  _effects: cash -3 (延迟偿还市场赊账（其中0.6克朗记入债务）); food; reputation -0.05; relation acquaintance with person-materialized-world-vienna-1912-17; relation acquaintance with person-materialized-world-vienna-1912-17_

- **1932.09** `vienna-illness-household.mother-falls/mother-returns-to-work` tags: health, family, home, injury
  Josefine Hofer不肯躺着，第三天就去帮人洗衣挣回一克朗。Lena晚上发现她的腿又肿了，那点工钱抵不上药钱；炉边的药布还没干，又得重新煮。
  _effects: health -0.01 (过早劳作导致腿伤加重); cash 1 (母亲洗衣挣的零钱); mood -0.05_

- **1933.05** `vienna-tenement-neighbors.laundry_line_dispute/neighbor_yanks_clothes` tags: home, social, family, housing
  Emil Weiss嫌Lena的床单滴水滴到Emil Weiss家衬衫上，一把扯下床单扔在院子的石板上。Lena下楼捡起来时，床单角沾了泥，重洗又要费肥皂。两人在院子当中对喊，楼上有人推开窗看热闹。Lena把床单重新搭上绳子时，故意把水拧在Emil Weiss那侧。
  _effects: relation rival with person-emil-weiss; cash -0.15 (重洗床单的肥皂钱)_

- **1933.08** `p9-social-tenement-neighbors.evicted-neighbours/evicted-neighbours.district-office-queue` tags: housing, neighbors, tenement, daily, money, reputation
  区公所的长凳坐满了人。Friedrich Hofer的笔尖在名册上划了一道，把纸推过来时没有抬眼。Lena把纸折了三折，塞进Helene Moser手里。
  _effects: relation acquaintance with person:evt:world-vienna-1912:000558:child; mood 0.03_

- **1934.01** `vienna-life-injury-recovery/clinic-treatment` tags: health, work, family
  Lena在受伤后的第三天去了诊所。医生清洗伤口、换药，收下诊费，嘱咐不要急着回机器旁。Lena把药方折好，回家路上买了纱布。
  _effects: health 0.05 (wound treatment); cash -8 (clinic and bandages（其中8克朗记入债务）); condition_
  _causes: evt:world-vienna-1912:004419_

- **1934.01** `r13-civ.rehearse-play::ctx-vienna-authoritarian-1934::milieu-tenement/cast-as-understudy` tags: culture, theatre, rehearsal, play, ambition, vienna, urban, crisis
  Rosa Winter让Lena站在舞台边上看完整场，说先背熟替补的台词。排练室的暖气坏了，演员们穿着大衣念对白。散场时，Rosa Winter把一本卷了角的剧本塞给Lena，说明晚还来。
  _effects: flag +cast_as_understudy; role; skill; knowledge “the understudy must know the whole second act by Friday”; relation acquaintance with person-materialized-world-vienna-1912-4_

- **1934.07** `vienna-courtship-courtyard.sunday-walk/second-bridge-promise` tags: adulthood, courtship, partner, social, family, partnership
  在第二个桥洞下，Friedrich Weiss 2先停下来，用鞋尖碾一颗烤栗子壳，说下星期天还是这个时候、还是这座桥。Lena点头，掏出四赫勒买了两小袋栗子，两人分着剥，手上都是糖渍；桥洞上的水还在滴，谁也没有提万一明天下雨怎么办。
  _effects: relation partner with person-materialized-world-vienna-1912-90; cash -0.04 (两小袋烤栗子（其中0.04克朗记入债务）); mood 0.06; relation acquaintance with person-materialized-world-vienna-1912-90_

- **1934.08** `vienna-family-childbirth/son-born` tags: family, childbirth, death, lifecycle, birth, state, state:raising-child, raising-child
  Lena在Leopoldstädter Zinshaus, gemeinsamer Gang生下一个男婴，取名Alois 2。工友凑的钱抵了一部分，家里还是从糖罐里数出六克朗给接生的人；Friedrich Weiss 2把消息带到工厂，回来时把唯一的摇篮重新刷了一遍，Lena躺在床上出了一身虚汗。
  _effects: birth male; cash -6 (midwife fee（其中6克朗记入债务）); state_add raising-child state:world-vienna-1912:210_

- **1934.11** `vienna-social-movement.aftermath/keep-the-list` tags: development, social_movement, organization, consequence
  Lena把Wiener Psychoanalytische Vereinigung的名单藏进缝纫机抽屉的夹层。名单上有二十几个名字，其中两个已经搬走，一个被工厂开除。Lena没有把最后一行划掉。
  _effects: flag +movement_list_holder; reputation 0.03_

- **1934.11** `ld18-wedding.objection::ctx-vienna-authoritarian-1934::milieu-tenement/the-vow-is-said` tags: love, wedding, marriage, queer, scandal, choice, secret_intimacy, vienna
  Lena说“愿意”，声音稳得连自己都意外。Klara在最后一排站了一会儿，等仪式结束才离开。晚上，Friedrich Weiss 2在灯下数礼金，Lena在窗边拆一只没有署名的盒子，里面是那副旧手套。
  _effects: state_add ld18-impossible-attachment state:world-vienna-1912:211; relation partner with person-materialized-world-vienna-1912-90; relation friend with person-phase15-Klara-world-vienna-1912; mood -0.06; flag +married_with_a_secret; relation acquaintance with person-materialized-world-vienna-1912-7; flag +impossible_attachment_active_

- **1934.11** `state_reaction:ld18-impossible-attachment/a-family-wedding` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  亲戚的婚礼上，Lena被安排和伴侣分开坐。司仪问有没有人反对，Lena低头喝汤；伴侣在另一桌替别人倒酒，手很稳，酒没有洒出来。散席时，两个人在衣帽间碰见，只说了一句“外面下雨”。
  _effects: state_parameter ld18-impossible-attachment.pressure 65 -> 75; state_parameter ld18-impossible-attachment.grief 15 -> 19; mood -0.020000000000000004_
  _causes: evt:world-vienna-1912:005264_

- **1934.11** `state_reaction:ld18-impossible-attachment/a-question-at-the-office` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  办公室有人问Lena，为什么总有一个女人在楼下等她。Lena说那是表妹；对方笑了一下，说现在的表妹真体贴。下午，Lena把桌上的相框扣倒，又在没人时翻回来，用袖子擦了擦玻璃上的灰。
  _effects: state_parameter ld18-impossible-attachment.pressure 75 -> 83; state_parameter ld18-impossible-attachment.discretion 20 -> 16; reputation -0.020000000000000004_
  _causes: evt:world-vienna-1912:005264_

- **1935.01** `state_tick:ld18-impossible-attachment/invented-anniversary/the-date-that-is-not-on-paper` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  Lena和伴侣把认识的那一天当作纪念日。没有登记，没有证人，只有一块从旧货摊买来的蛋糕和两杯兑了水的酒；Lena在日历上画了一个别人看不懂的记号，第二年又画在同一个格子里。
  _effects: state_parameter ld18-impossible-attachment.devotion 50 -> 54; state_parameter ld18-impossible-attachment.pressure 83 -> 80; mood 0.020000000000000004_

- **1935.01** `r13-fam.join-club::ctx-vienna-authoritarian-1934::milieu-tenement::club-crisis/joined-under-watch` tags: task, social, club, choir, organization, belonging, vienna, urban
  排练到一半，两个便衣推门进来，站在最后一排听。Emil Weiss没有停，只把一首哀歌换成进行曲。散场后，Emil Weiss让Lena把点名册带回家藏一夜，说Freie Gewerkschaft der graphischen Arbeiter Wiens里最近多了几个不唱歌只记名字的人。
  _effects: flag +carried_choir_roll_home; role; relation friend with person-emil-weiss; organization_membership; knowledge “plainclothes men attend the choir rehearsals”_

- **1935.06** `r13-rel.secret-courtship::ctx-vienna-authoritarian-1934::milieu-tenement::secret-courtship-crisis/questioned-for-three-days` tags: relationship, courtship, secret, risk, partner, vienna, urban, crisis
  Josef被带去问话，三天后放回来，眼角青了一块。Lena没有问谁动的手，只把家里仅剩的鸡蛋煮了。Josef吃完，说以后别再在后门等。
  _effects: role; relation partner with person-phase15-Josef-world-vienna-1912; health -0.050000000000000044 (beaten during police questioning)_

- **1935.11** `oj18-mortuary.first-body::ctx-vienna-authoritarian-1934::milieu-tenement/municipal-mortuary` tags: death, mortuary, funeral, work, odd_job, night, everyday, vienna
  市立太平间缺一个夜班杂役，Katharina Hofer 2只问Lena怕不怕冷。地下室的抽屉一排十二个，有的拉开了就不再推回去；Lena的工作是登记遗物、给无名尸挂上编号，再在天亮前把地拖干净。
  _effects: organization_found 市立太平间 (state); position 太平间杂役 @morgue:person-phase15-Lena-world-vienna-1912-evt:world-vienna-1912:005761; state_add oj18-odd-apprenticeship state:world-vienna-1912:257; cash 2 (municipal night wages); condition; flag +mortuary_worker; knowledge “太平间地下室的抽屉一排十二个，无名尸也要有编号。”; relation acquaintance with person-materialized-world-vienna-1912-92; relation acquaintance with person-materialized-world-vienna-1912-45; role; flag +odd_job_apprentice_

- **1935.11** `p9-history-medical-daily.clinic-queue/give-place-to-mother` tags: health, medical, public_health, family, pharmacy, sanitation, daily
  Emil Weiss怀里的孩子脸烧得通红，Lena往后退了半步，把用粉笔写的号码塞进Emil Weiss手里。药房伙计收了六十赫勒，给一瓶褐色药水；回家路上Lena一阵阵发冷。
  _effects: cash -0.6 (街角药房买退烧药); relation acquaintance with person-emil-weiss_

- **1936.01** `ld18-intimacy.hairwash::ctx-vienna-authoritarian-1934::milieu-tenement/the-water-goes-cold` tags: love, intimacy, gentle, everyday, queer, body, secret_intimacy, vienna
  Friedrich Weiss 2坐在床边，Lena用搪瓷盆替她洗头。水凉了又添，肥皂泡顺着耳后流下来；Friedrich Weiss 2闭着眼说，小时候她母亲也是这样替她洗的。窗外有人收煤，铁锹刮过石板，两个人谁也没有动。
  _effects: relation friend with person-materialized-world-vienna-1912-90; state_parameter ld18-impossible-attachment.devotion 54 -> 59; state_parameter ld18-impossible-attachment.pressure 80 -> 77; mood 0.04000000000000001; flag +hairwash_sunday; relation acquaintance with person-materialized-world-vienna-1912-40_

- **1936.01** `state_tick:ld18-impossible-attachment/invented-anniversary/the-date-that-is-not-on-paper` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  Lena和伴侣把认识的那一天当作纪念日。没有登记，没有证人，只有一块从旧货摊买来的蛋糕和两杯兑了水的酒；Lena在日历上画了一个别人看不懂的记号，第二年又画在同一个格子里。
  _effects: state_parameter ld18-impossible-attachment.devotion 59 -> 63; state_parameter ld18-impossible-attachment.pressure 77 -> 74; mood 0.020000000000000004_

- **1936.01** `state_tick:oj18-odd-apprenticeship/strange-year/trusted-with-the-keys` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  两年过去，Lena已经能闭着眼说出哪块地板会响、哪盏煤气灯该在几点关。师傅把备用钥匙交下来，没有解释为什么第三把钥匙磨得最亮；Lena也没有问，只在巡查簿最后一页画了一个小小的记号。
  _effects: state_parameter oj18-odd-apprenticeship.trust 20 -> 30; state_parameter oj18-odd-apprenticeship.strangeKnowledge 30 -> 40; state_parameter oj18-odd-apprenticeship.nightsWorked 0 -> 24; cash 2 (night-shift wages); skill_

- **1936.01** `agency:attend_meeting` tags: agency, agency:attend_meeting
  Lena去了Berggasse 19, Wohnung und Ordination，坐在后排听完了关于Wiener Psychoanalytische Vereinigung在Berggass的争论；散会时带走一张油印提纲。
  _effects: historical development:initiative-org-wednesday-psychological-society-1934 as participant; knowledge “我参加了Wiener Psychoanalytische Vereinigung在Berggasse 19,。”; mood 0.03_

- **1936.07** `vienna-housing-move.sublet-room/sublet-daylight-only` tags: housing, home, rent, family, money
  Lena和Luise Kral 2谈妥只出租白天，夜里不留宿，收两克朗。床仍归Lena家，钥匙只在白天给。Luise Kral 2说不碍事，他住的工棚不许带人，白天有个落脚的地方就够。Rosa Huber听了点头，说这样少些闲话；到了傍晚，Lena把床铺重新收好，屋里照旧几口人。
  _effects: cash 2 (白天出租床位的钱); relation acquaintance with person-materialized-world-vienna-1912-33; mood 0.01999999999999999; relation acquaintance with person-materialized-world-vienna-1912-33_

- **1936.08** `vienna-women-housework.wash-day/wash-day.quarrel` tags: gender, housework, home, labour, family
  铁桶磕在石沿上，水晃出来打湿了Lena的裙角。Josefine Hofer的声音拔高，说轮到她就是轮到她。Lena咬着嘴没再喊，把盆往自己门前拖，湿石板上一道水痕。
  _effects: mood -0.05000000000000002; relation acquaintance with person-josefine-hofer; reputation -0.020000000000000004_

- **1937.01** `vienna-life-injury-recovery/home-care` tags: health, work, family
  Lena没有去诊所，只用热水和旧布洗了伤口。第二天伤口周围发红，家里人把仅剩的干净床单撕成条。
  _effects: cash -2 (clean cloth（其中2克朗记入债务）); condition_
  _causes: evt:world-vienna-1912:005764_

- **1937.01** `vienna-family-divorce/partner-moves-to-shared-housing` tags: family, marriage, divorce, housing, lifecycle, separation, household
  Josef把一只箱子和工票搬去合租房，带走一半锅碗。Lena留在Leopoldstädter Zinshaus, gemeinsamer Gang，把空出来的床租给一个学徒，用租金补房租；搬家花掉四克朗，Lena在户籍上成了分居的人，夜里听见隔壁床板响，总要愣一下。
  _effects: relation_end partner with person-phase15-Josef-world-vienna-1912; household; cash -4 (moving and separate goods（其中4克朗记入债务）); mood -0.06; role_

- **1937.01** `ld18-breakup.returned-keys::ctx-vienna-authoritarian-1934::milieu-tenement/burned-the-last-letter` tags: breakup, grief, love, keys, queer, ending, secret_intimacy, vienna
  Lena写了一封很长的信，写到天亮，最后只留下“保重”两个字。她把信烧了，灰倒进花盆；Anton Kral来时，看见那盆天竺葵的叶子全黄了，问是不是浇多了水。Lena说可能是。
  _effects: state_parameter ld18-impossible-attachment.pressure 74 -> 79; state_parameter ld18-impossible-attachment.grief 19 -> 29; mood -0.05; flag +burned_the_last_letter_

- **1937.01** `state_tick:ld18-impossible-attachment/invented-anniversary/a-form-with-an-empty-line` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  户籍窗口换了一张新表格，配偶一栏不能空着。Lena最后写了“同住人”，办事员抬头看了一眼，说这不作数。回家后，Lena把表格折成很小的一块，塞进针线盒；伴侣问今天顺不顺利，Lena说和平时一样。
  _effects: state_parameter ld18-impossible-attachment.pressure 79 -> 85; state_parameter ld18-impossible-attachment.discretion 16 -> 13; mood -0.01999999999999999_

- **1937.01** `agency:support_process` tags: agency, agency:support_process
  Lena为Wiener Psychoanalytische Vereinigung在Berggass出了力：整理名单、传递消息或替同伴作证，名字被记进参与记录。
  _effects: historical development:initiative-org-wednesday-psychological-society-1934 as supporter; historical_influence; reputation 0.015_

- **1937.01** `p9-social-family-conflict-care.sick-parent-night/hire-neighbor-daycare` tags: family, care, siblings, inheritance, housing, money
  Lena请楼下的Emil Weiss白天来照看Josefine Hofer，先付一周六克朗工钱，讲好每天另管两顿饭，煤钱也从这六克里出。Emil Weiss上午换床单，下午喂药，临走把便盆提到楼道口。Lena下工回来先摸煤箱，再在练习本上记下当天的饭钱和煤钱，看见Josefine Hofer的嘴唇不再干裂。
  _effects: cash -6 (支付邻居照看工钱和煤钱（其中6克朗记入债务）); food; relation acquaintance with person-emil-weiss; health 0.04 (白天有人按时喂药和换洗)_

- **1937.09** `vienna-courtship-courtyard.sunday-walk/part-at-arch` tags: adulthood, courtship, partner, social, family
  走到桥洞前，Katharina Hofer说该往回走了，家里炉子还没生。Lena站在原地看着Katharina Hofer拐上台阶，围巾的一角被风掀起来；下周的事谁也没有提，两人就此分开，口袋里只剩一颗凉透的栗子。
  _effects: mood -0.04999999999999999; relation acquaintance with person-materialized-world-vienna-1912-38; flag +uncertain_courtship_

- **1937.12** `p9-gap-adult-ordinary-day.market-closing/market-closing.share-spinach` tags: adulthood, daily, leisure, neighborhood, ordinary, market, food, bargain
  两人同时伸手，又同时缩回去。Emil Weiss说自己本来想买回去做馅，Lena说那正好一人一半。摊主用草绳把菜捆好，嘴里嘟囔着收摊了收摊了，把剩下的零钱扒拉进木匣。
  _effects: cash -0.04 (分买最后一把菠菜（其中0.04克朗记入债务）); food; relation acquaintance with person-emil-weiss; relation acquaintance with person-materialized-world-vienna-1912-61_

- **1938.01** `vienna-life-anschluss-1938/resists` tags: politics, persecution, 1938
  Lena在登记桌旁说了句“这里以前不是这样”。Rosa Lechner 2记下地址，当晚两个穿制服的人来敲门，把Lena带到警局，第二天放回来时脸上有伤。
  _effects: condition; role; cash -5 (fine and lost work（其中5克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-103_

- **1938.01** `state_expire:ld18-impossible-attachment` tags: ld18-impossible-attachment, love, intimacy, queer, unregistered, commitment, secret, desire
  Lena的「无法登记的伴侣」到期；相关安排结束。
  _effects: state_remove ld18-impossible-attachment state:world-vienna-1912:211; flag -impossible_attachment_active_

- **1938.01** `state_tick:oj18-odd-apprenticeship/strange-year/blamed-for-the-noise` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  楼上住户投诉夜里有人拖椅子，管事的把巡查簿翻到Lena的那一页，说签字太潦草，看不出巡过几趟。Lena想辩解，却想起那晚确实在楼梯间多站了一刻钟；扣掉的工钱刚好够买一双不漏水的鞋。
  _effects: state_parameter oj18-odd-apprenticeship.trust 30 -> 14; state_parameter oj18-odd-apprenticeship.reliability 50 -> 40; mood -0.04999999999999999; flag +odd_job_scare_

- **1938.01** `p9-social-daily-culture.sunday-hill/p9-social-daily-culture.sunday-hill.first-winery` tags: daily, culture, leisure, cafe, music, walk, task, task:daily
  Lena和Emil Weiss在第一个酒棚就坐下了，要了一壶新酒，Anna Berg摸出一副磨损的纸牌。三人打到下午，太阳偏西也没再往上爬；Lena输了几个铜板，连酒带牌局一共一克朗五十赫勒，倒赢回一肚子笑话。回程的电车上，Lena靠着窗，酒意上来，差点坐过站。
  _effects: cash -1.5 (酒棚的新酒和牌局输的铜板); relation friend with person-emil-weiss; relation acquaintance with person-materialized-world-vienna-1912-12; mood 0.03999999999999998; relation acquaintance with person-materialized-world-vienna-1912-12_

- **1938.03** `p9-social-tenement-neighbors.stove-and-line/stove-and-line.move-to-line-end` tags: housing, neighbors, tenement, daily, money, reputation
  Lena把自己泡着的衣服端到绳子最末一段，把靠近炉子的位置让给Otto Weiss，条件是对方看着火，别让水烧干。Otto Weiss点头，往炉膛里添了一块煤，说中午以前一定把炉子空出来。两家的盆就挨着放在窗下。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-29; mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-29_

- **1938.03** `vienna-social-movement.meeting/quiet-solidarity` tags: development, social_movement, organization, meeting
  Lena没有发言，只把带来的面包分成几份。散会时，一个不认识的女人把她的地址塞给Lena，说那条街还需要有人继续收会费。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-70; relation acquaintance with person-materialized-world-vienna-1912-70_

- **1938.07** `vienna-family-same-sex-female/public-suspicion` tags: family, intimacy, same_sex, housing, lifecycle, partnership
  楼里的邻居开始议论Lena和Mitzi Lechner。有人把门牌记下来，房东来敲门，说这栋楼不接受“这种住法”；Mitzi Lechner把箱子拖出来又推回床下，搬家花掉五克朗，两人那一夜都没睡稳。Lena在院子里被人盯着看，门上的名字也被人用手指划过。
  _effects: relation partner with person-mitzi-lechner; reputation -0.11999999999999998; mood -0.09999999999999998; cash -5 (moving and lost rent（其中5克朗记入债务）); role_

- **1938.10** `vienna-women-housework.care-old-parent/care.self-tend` tags: gender, housework, home, labour, family
  Josefine Hofer夜里喊人，Lena从窄床上坐起，摸黑去扶。炉子上煨着一小锅汤，汤面结了薄皮。Otto Huber上午来敲门，把一碗稠粥放在灶沿，没多留。
  _effects: cash -1.2 (少接计件活，收入减少（其中1.2克朗记入债务）); relation kin with person-josefine-hofer; food_

- **1939.01** `state_expire:oj18-odd-apprenticeship` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  Lena的「奇职学徒」到期；相关安排结束。
  _effects: state_remove oj18-odd-apprenticeship state:world-vienna-1912:257; role; flag -odd_job_apprentice_

- **1939.01** `p9-social-daily-culture.singing-club/p9-social-daily-culture.singing-club.ask-fare` tags: daily, culture, leisure, cafe, music, walk, task, task:social
  Lena向Josef Bauer 2问清下个月郊外演唱会的车费由谁出，Josef Bauer 2说团里只贴一半，另一半要团员自己凑。Lena把四十赫勒硬币在指间转了两圈，最终没有放进收款盒，说等发了工钱再来；这一来一去，也算清了半票、酒棚和车钱各是多少。出门时Ferdinand Stein正扛着啤酒桶进后厅，两人侧身让过。
  _effects: mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-70; skill; relation acquaintance with person-materialized-world-vienna-1912-77_

- **1939.02** `vienna-parish-aid.sick-call/sick-call.with-priest` tags: faith, parish, mutual_aid, poverty, family
  Lena觉得一个人去不合适，绕到教堂请了修女一同上楼。修女看过病人，留下药包和一小瓶圣水，说会从教区账上出钱请医生来看一趟。Alois Kral 2在楼下等着，说这样妥当，病人家里没男人，多个见证人心里安稳。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-83; mood 0.03999999999999998; flag +parish_sick_visitor; relation acquaintance with person-materialized-world-vienna-1912-83_

- **1939.05** `vienna-social-movement.recruitment/report-to-official` tags: development, social_movement, organization, politics
  Lena把传单交给楼里的门房。门房没有接，只让Lena自己去找警察局。那天傍晚，两个穿便衣的人在街口站了很久。
  _effects: role; reputation 0.01999999999999999_

- **1939.07** `p9-gap-adult-ordinary-day.market-closing/market-closing.fish-heads` tags: adulthood, daily, leisure, neighborhood, ordinary, market, food, bargain
  鱼头用报纸包着，报纸上还印着昨天的广告。Elisabeth Berg一边刮冰一边说，回去多搁姜，别舍不得醋。Lena把纸包拎在手里，能感觉到凉气从指缝里钻出来，走到家时报纸已经洇湿了一层。
  _effects: food; health 0.019999999999999997 (喝上了热鱼汤); relation acquaintance with person-materialized-world-vienna-1912-78; relation acquaintance with person-materialized-world-vienna-1912-27_

- **1939.10** `vienna-church-community.saint-vincent-box/box-request-granted` tags: faith, social, family, home
  Lena在圣文生会门口登记，领到一张面包券和一小袋土豆。
  _effects: food; relation acquaintance with person:evt:world-vienna-1912:000061:child; mood 0.030000000000000027_

- **1940.01** `p10-migration-tasks.return-home/return-ticket-bought` tags: adulthood, migration, housing, family, travel, task, return, train
  他在南站买了一张三等车票，十二克朗四十赫勒，把木工工具留给了同屋的工友。车过布吕恩时换了一次车，哥哥站在站台上，手里拎着一壶水。第二天一早他就跟着下地，手上磨出了新泡。
  _effects: cash -13 (回乡三等车票与路上买面包的钱（其中13克朗记入债务）); mood 0.07; flag +worked_in_vienna_factory_

- **1940.10** `vienna-women-housework.piecework-bundle/piecework.hide-defects` tags: gender, housework, home, labour, family
  篮底那两件领子卷得很紧，Lena用围裙角把篮沿擦了擦。Luise Winter 3翻了翻面上几件，拿尺子比了比，没再往下。Ferdinand Kral在走廊里问交了多少，Lena含混说了句够买面包。
  _effects: cash 0.7 (交活所得，含未返工的两件); mood -0.03999999999999998; reputation -0.01999999999999999; relation acquaintance with person-materialized-world-vienna-1912-105_

- **1940.10** `p10-crisis-migration.eviction/eviction-shelter-queue` tags: adulthood, crisis, migration, war, police, eviction, refugee, housing
  床架斜靠在垃圾桶上，床垫用绳子捆着，Lena蹲下把散在石板上的勺子一只只捡回布袋。Katharina Hofer 2的过道只放得下箱子，床架只好留在院里。收容所门口发毯子的人说只剩两张，孩子裹着毯子先睡了。
  _effects: residence; cash -2 (收容所登记与寄存箱子的杂费（其中1.3克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-45; mood -0.08000000000000002_

- **1941.01** `agency:support_process` tags: agency, agency:support_process
  Lena想帮忙，但组织者不信任新来的人，只让其在外围等消息。
  _effects: mood -0.03999999999999998_

- **1941.10** `vienna-church-community.tenement-prayer/rent-prayer-help` tags: faith, social, family, home
  Lena在楼梯间守夜时，邻居说起楼下老太太病重。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-14_

- **1941.10** `p9-history-union-political.meeting/meeting-speak-up` tags: politics, union, party, meeting, leaflet, police, strike, reform
  Lena站起来报出自己车间的计件工价：糊一百个纸盒二十八赫勒，比隔壁车间少六个。屋里一下子静了，Otto Hofer把草稿推过来，让书记员把这几个数字写在动议第一行。散会时有人拍了拍Lena的肩膀。
  _effects: reputation 0.04000000000000001; relation colleague with person:evt:world-vienna-1912:000061:child; relation acquaintance with person-materialized-world-vienna-1912-99_

- **1941.11** `p9-social-family-conflict-care.notary-inheritance/leave-unsigned` tags: family, care, siblings, inheritance, housing, money
  Lena把文件推回Anton Kral面前，说不签，等Josefine Hofer自己改主意。Josefine Hofer的嘴角动了动，Hedwig把三把钥匙一把把收进衣袋，金属碰着金属响了几声。Lena走下公证处的石阶，街对面面包房正在出炉，热气扑到脸上，口袋里一个赫勒也没多，房契的事仍旧悬着。
  _effects: mood -0.04999999999999999; relation kin with person-josefine-hofer; relation kin with person-phase15-Hedwig-world-vienna-1912; flag +inheritance_unsigned_

- **1942.01** `office16-budget.sign-or-block::ctx-vienna-authoritarian-1934::milieu-tenement/blocked-the-permit` tags: office, budget, permit, administration, power, economy, vienna, urban
  Lena把一份扩建许可证压在抽屉最下面，理由是排水和消防通道不合规。申请人Otto Weiss在走廊里等到下班，最后只拿到一张写着“补件”的纸条。Lena知道这份许可明年还会再来，但今年不会从自己的桌上出去。
  _effects: reputation 0.01999999999999999; skill; relation rival with person-materialized-world-vienna-1912-29; flag +blocked_permit; knowledge “扩建申请的排水图与消防通道不符合现行规定。”_

- **1942.01** `agency:support_process` tags: agency, agency:support_process
  Lena为Wiener Psychoanalytische Vereinigung在Berggass出了力：整理名单、传递消息或替同伴作证，名字被记进参与记录。
  _effects: historical development:initiative-org-wednesday-psychological-society-1934 as supporter; historical_influence; reputation 0.015_

- **1942.01** `p22-goat-heir::ctx-vienna-authoritarian-1934::milieu-tenement/goat-sold-at-auction` tags: inheritance, absurd, comic, goat, tenement, legal, rumor, public
  拍卖行把山羊牵上台，槌子落下时，它忽然挣脱绳子，在人群里撞翻了两个花盆。买主说这羊不吉利，只肯出半价；Lena拿到的钱刚够付律师费，楼契被银行收走，天井里只剩一截被啃过的牵绳。买主把它牵走时，它回头看了一眼那栋楼。
  _effects: cash -3 (lawyers and auction fees ate the goat price（其中1克朗记入债务）); state_add debt-bondage state:world-vienna-1912:592; reputation -0.03; relation acquaintance with person-materialized-world-vienna-1912-9; flag +goat_sold; mood -0.040000000000000036_

- **1942.07** `r2-law.bank-run::ctx-vienna-authoritarian-1934::milieu-tenement/back-door-payout` tags: finance, bank, panic, crisis, savings, vienna, urban, war
  Elisabeth Berg认得Lena，把账本合上，让她从煤库侧门进去。抽屉里的现钞不够，Elisabeth Berg数了两遍，扣下手续费，把剩下的推过来，说别从正门走。Lena把钱缝进衬裙，回家路上一直按着口袋。
  _effects: cash 9 (铁栅门后的第三排); flag +withdrew_savings_through_bank_back_door; relation colleague with person-materialized-world-vienna-1912-78; knowledge “the teller keeps a cash drawer behind the coal cellar”_

- **1942.09** `vienna-tenement-neighbors.lost_room_key/key_lost_landlady` tags: home, social, family, housing
  Lena把钥匙丢在了回家路上的有轨电车轨道旁，天黑也没找着。房东太太说换锁芯要一克朗五十赫勒，从下月房租里扣。Friedrich Bauer借给Lena一把旧挂锁，但锁鼻和门扣对不上，只能用铁丝拧着凑合。那夜Lena睡不踏实，总觉得有人在拧门。
  _effects: cash -1.5 (换锁芯费用); relation acquaintance with person-materialized-world-vienna-1912-39; mood -0.05999999999999994_

- **1943.01** `office16-corruption.inspection::ctx-vienna-authoritarian-1934::milieu-tenement/cover-up` tags: office, corruption, audit, legal, power, dark, vienna, urban
  Lena请Ferdinand Moser 2去咖啡馆，把一只没有标记的信封留在桌上。Ferdinand Moser 2没有碰信封，只把报告里“重复报销”改成“记账口径不一”；作为交换，Lena签了Ferdinand Moser 2侄子的实习证明。两个人都没有提那只信封后来去了哪里。
  _effects: organization_funds; reputation -0.020000000000000004; relation acquaintance with person-materialized-world-vienna-1912-107; flag +bribed_auditor; knowledge “审计报告里的“重复报销”被改成了“记账口径不一”，实习证明由我签字。”; mood 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-107_

- **1943.01** `state_tick:debt-bondage/interest/pay-interest` tags: debt-bondage, debt, work, poverty, legal, state, state_tick
  Lena又付了一年的利息。本金几乎没动，债主的账本却翻到了新一页。
  _effects: cash -3 (debt interest); state_parameter debt-bondage.debt 18 -> 20_

- **1943.01** `agency:support_process` tags: agency, agency:support_process
  Lena为Wiener Psychoanalytische Vereinigung在Berggass出了力：整理名单、传递消息或替同伴作证，名字被记进参与记录。
  _effects: historical development:initiative-org-wednesday-psychological-society-1934 as supporter; historical_influence; reputation 0.014999999999999986_

- **1943.03** `absurd15-stage.cast-the-king::ctx-vienna-authoritarian-1934::milieu-tenement/not-king-material` tags: performance, theatre, power, irony, work, pretend, vienna, urban
  Gustav Weiss看了Lena的手，说这双手适合拿账本，不适合拿权杖。Lena回家路上买了一张最便宜的站票，在最后一排看完了整场戏；散场时，Lena记住的不是国王的台词，而是他坐下时椅子发出的声音。
  _effects: skill; mood -0.040000000000000036; cash -1 (买了一张站票); flag +cast_refused; relation acquaintance with person-materialized-world-vienna-1912-126_

- **1943.06** `p9-social-tenement-neighbors.stove-and-line/stove-and-line.first-come-order` tags: housing, neighbors, tenement, daily, money, reputation
  Lena把四只洗衣盆按到厨房的先后排成一列，用粉笔在门后写下各家的时辰：六点到七点半、七点半到九点。Rosa 2起初嘟囔，看到自家名字排在第二格，也就把水壶提了回去。晾衣绳按同样次序分两段，谁家的床单先上谁先占。
  _effects: mood 0.040000000000000036_

- **1943.12** `r2-law.loan-shark::ctx-vienna-authoritarian-1934::milieu-tenement/signed-weekly-interest` tags: finance, debt, usury, poverty, threat, vienna, urban, crisis
  Lena在Mitzi Hofer的账本上按了手印，借十克朗，周息五分。Mitzi Hofer把钱数在柜台上，又抽回一枚，说那是“跑腿费”。Luise Kral 3在门口看着，等Mitzi Hofer进屋才低声说，这条街上没人还得清他的第二笔。
  _effects: cash 9 (五分利，按周算); condition; flag +took_shark_loan; relation acquaintance with person-materialized-world-vienna-1912-97; knowledge “the lender charges five percent weekly plus a collection fee”; relation acquaintance with person-materialized-world-vienna-1912-97_

- **1944.01** `office16-rival.removal-motion::ctx-vienna-authoritarian-1934::milieu-tenement/the-vote-ties` tags: office, rivalry, politics, removal, power, intrigue, vienna, urban
  第二轮投票是十七比十七。按章程，主席可以投第二票；Lena把自己的名字念了两遍，会议室里没有人笑。散会后，Franz Kral在门口说下一次会带更多的人来，Lena说椅子够用。
  _effects: reputation -0.01999999999999999; mood -0.020000000000000018; relation rival with person:evt:world-vienna-1912:000865:child; flag +tie_broken_by_chair; knowledge “章程允许主席在平票时投第二票，但没有人记得上一次使用是什么时候。”_

- **1944.01** `state_expire:debt-bondage` tags: debt-bondage, debt, work, poverty, legal, state, state_tick, state:debt-bondage
  Lena的「债务束缚」到期；相关安排结束。
  _effects: state_remove debt-bondage state:world-vienna-1912:592_

- **1944.01** `agency:support_process` tags: agency, agency:support_process
  Lena想帮忙，但组织者不信任新来的人，只让其在外围等消息。
  _effects: mood -0.040000000000000036_

- **1944.02** `vienna-social-movement.meeting/speak-and-organize` tags: development, social_movement, organization, meeting
  Lena在后屋的会议上报出自己街区的名字：谁家缺煤，谁被房东催租，谁知道哪间印刷厂还在招人。普拉特动物园夜班队把这些事记进一本旧账本，散会时每个人带走一叠更小的纸条。
  _effects: skill; reputation 0.01999999999999999; relation acquaintance with person-materialized-world-vienna-1912-112_

- **1944.07** `vienna-market-household.soup-kitchen/soup-kitchen.keep` tags: home, market, food, social
  扁豆汤的香味从门缝飘出去，Rosa 2敲了门。Lena掀开锅盖又盖上，说只够自家吃。Rosa 2什么也没说就走了。夜里Lena听见隔壁有人用勺子刮碗底。
  _effects: food; mood -0.050000000000000044_

- **1945.01** `vienna-life-injury-recovery/wound-infection` tags: health, work, family, injury
  Lena的伤口在几天后肿起来，手腕发热。医生说要切开引流，费用比上次更高；Lena看着账单，先问能不能分两次付。
  _effects: health -0.12 (wound infection); cash -14 (drainage and medicine); condition_
  _causes: evt:world-vienna-1912:010170_

- **1945.01** `vienna-life-1945-liberation/postwar-illness` tags: war, liberation, 1945, injury
  Lena在战后第二个月病倒，医院没有足够的药，医生只给了退烧粉。邻居每天送来一碗汤，放在门口就走。
  _effects: health -0.12000000000000006 (postwar illness); cash -4 (medicine); condition_

- **1945.01** `office16-scandal.public-hearing::ctx-vienna-postwar-1945::milieu-tenement/the-wrong-signature` tags: office, scandal, media, reputation, politics, power, vienna, urban
  报纸放大的签名其实是Anna Berg的：两个字母写得太像。更正启事登在第七版，只有三行；Lena的名字被拿掉了，Anna Berg的名字留了下来。第二天，Anna Berg没有来上班，桌上的茶杯还是满的。
  _effects: reputation 0.01999999999999999; relation acquaintance with person-materialized-world-vienna-1912-12; flag +scandal_misdirected; knowledge “被登出来的签名是书记员的，更正启事在第七版。”; mood -0.020000000000000018_

- **1945.01** `agency:support_process` tags: agency, agency:support_process
  Lena为Wiener Psychoanalytische Vereinigung在Berggass出了力：整理名单、传递消息或替同伴作证，名字被记进参与记录。
  _effects: historical development:initiative-org-wednesday-psychological-society-1934 as supporter; historical_influence; reputation 0.015_

- **1945.01** `historical_phase`
  历史进程《Wiener Psychoanalytische Vereinigung在Berggasse 19, Wohnung und Ordination经过数年的招募》从 mobilizing 进入 institutionalizing；留下「一项被制度化的改革」。
  _effects: knowledge “我亲历或知晓「Wiener Psychoanalytische Vereinigung在Berggasse 19, Wo”; knowledge “我亲历或知晓「Wiener Psychoanalytische Vereinigung在Berggasse 19, Wo”; knowledge “我亲历或知晓「Wiener Psychoanalytische Vereinigung在Berggasse 19, Wo”; knowledge “我亲历或知晓「Wiener Psychoanalytische Vereinigung在Berggasse 19, Wo”; knowledge “我亲历或知晓「Wiener Psychoanalytische Vereinigung在Berggasse 19, Wo”; knowledge “我亲历或知晓「Wiener Psychoanalytische Vereinigung在Berggasse 19, Wo”; knowledge “我亲历或知晓「Wiener Psychoanalytische Vereinigung在Berggasse 19, Wo”; knowledge “我亲历或知晓「Wiener Psychoanalytische Vereinigung在Berggasse 19, Wo”_
  _causes: evt:world-vienna-1912:010674_

- **1945.08** `vienna-medical-treatment.night-fever/corner-doctor` tags: health, medical, family, money
  施特劳斯医生用酒精棉擦手，把药粉倒进小纸袋，折口时指甲掐出印子。他说夜里别再喝醋水，那东西烧胃。Friedrich Winter把炉火拨旺，在灶上坐了一壶水，答应第二天替Lena去铺子里告假。
  _effects: cash -4 (医生出诊费和药费); health 0.05000000000000002 (药粉和糖浆缓解症状); relation friend with person:evt:world-vienna-1912:000883:child_

- **1946.01** `office16-office.lose-the-chair::ctx-vienna-postwar-1945::milieu-tenement/kept-the-keys` tags: office, removal, loss, politics, power, transition, vienna, urban
  移交清单少了一把储藏室的钥匙。Lena没有提，Ferdinand Moser 2也没有问；三个月后，清洁工在储藏室发现两箱以Lena名义订阅的行业期刊，收件地址仍是这间办公室。
  _effects: position_end 太平间杂役 @morgue:person-phase15-Lena-world-vienna-1912-evt:world-vienna-1912:005761; relation acquaintance with person-materialized-world-vienna-1912-107; flag +kept_office_keys; knowledge “储藏室有两箱以我的名义订阅的期刊，收件地址仍是这间办公室。”; mood 0.020000000000000018_

- **1946.01** `r13-work.factory-gate::ctx-vienna-postwar-1945::milieu-tenement/turned-away` tags: work, hiring, factory, queue, cash, vienna, urban, postwar
  Rosa Huber把名单卷起来，说今天只要会看图纸的。Lena在铁门外站到换班，听见里面皮带轮转了一整天。Elisabeth Bauer分给Lena半块黑面包，两人谁也没提明天还来不来；电车票钱花掉了，口袋里的铜板只够买一小袋煤。
  _effects: cash -1 (铁门开了一条缝); mood -0.12; flag +work13_turned_away_at_factory_gate; knowledge “the factory takes only ten men from a gate queue of over a h”_

- **1946.05** `vienna-parish-aid.funeral-society/funeral-society.defer` tags: faith, parish, mutual_aid, poverty, family
  Lena把抽屉拉开又推上，铜币在木板上滚了半圈。Josef Bauer 2合上本子说，拖欠的人不少，可规矩就是规矩。她走下两级台阶又回头提醒，发工钱那天她会在教堂侧门等着。
  _effects: mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-70_

- **1946.11** `vienna-women-housework.wash-day/wash-day.rush` tags: gender, housework, home, labour, family, injury
  木盆边的水渍映着天光，Lena跪在石阶上揉搓床单，肘弯发酸。晾绳上的湿布滴答作响，Anna Winter探身把自家被单也挂上去，两人没多说话。
  _effects: health -0.020000000000000018 (长时间浸在碱水里，手部皮肤开裂); relation acquaintance with person:evt:world-vienna-1912:002980:child_

- **1946.12** `p9-gap-adult-ordinary-day.market-closing/market-closing.fish-heads` tags: adulthood, daily, leisure, neighborhood, ordinary, market, food, bargain
  鱼头用报纸包着，报纸上还印着昨天的广告。Elisabeth Moser 3一边刮冰一边说，回去多搁姜，别舍不得醋。Lena把纸包拎在手里，能感觉到凉气从指缝里钻出来，走到家时报纸已经洇湿了一层。
  _effects: food; health 0.020000000000000018 (喝上了热鱼汤)_

- **1947.01** `r13-civ.collect-signatures::ctx-vienna-postwar-1945::milieu-tenement/rejected-for-addresses` tags: politics, petition, signatures, institution, neighborhood, vienna, urban, postwar
  Josef Weiss把签名纸翻过来，说地址不全，有几页只写了楼号没有门牌。Lena说那些人怕报复，Josef Weiss说怕报复就别签名。纸被退回来，边角已经卷了。
  _effects: mood -0.07999999999999996; flag +petition_rejected_for_missing_addresses; knowledge “the office rejects petitions without a full address for ever”_

- **1947.07** `p9-gap-adult-ordinary-day.organ-grinder/organ-grinder.poured-water` tags: adulthood, daily, leisure, neighborhood, ordinary, music, street
  泼水的女人探出头说了声对不起，扔下一枚十赫勒的银币，硬币在湿石板上转了两圈。乐师捡起来对着光看了看，气消了一半，重新摇起琴。猴子抖了抖毛，水珠溅了Lena一手。
  _effects: mood -0.020000000000000018; relation acquaintance with person-emil-weiss_

- **1947.08** `vienna-postwar-housing-1950s/stay-with-relatives` tags: adulthood, postwar, housing, family, injury
  分房名单又往后推了一年，Lena一家搬进亲戚家的厨房隔间。Maria Winter送来一块旧帘子当隔断；夜里有人起身，全屋都听得见。
  _effects: cash -3 (shared household costs); health -0.02999999999999997 (crowded sleeping space); condition; mood -0.010000000000000009; relation acquaintance with person:evt:world-vienna-1912:000549:child_

- **1947.11** `p9-gap-adult-solitude.leaking-shoe/leaking-shoe.gave-up` tags: adulthood, daily, solitude, ordinary, home, repair, shoe, poverty
  Lena缝了半个钟头，线老是从针眼里脱出来，最后把鞋往床底下一踢。第二天清早她穿着这双鞋站在厂门口等开门，湿石头地的凉气从裂缝里钻进来，脚趾冻得发麻，只能来回换脚。
  _effects: health -0.04999999999999999 (穿着漏水的鞋在冷地上站久了); mood -0.040000000000000036_

- **1947.12** `p9-gap-adult-unemployed.soup-kitchen/soup-pot-empty` tags: adulthood, unemployment, casual_labour, poverty, daily, relief, food, church
  前面还有七八个人时，Anna Berg已经直起腰把锅盖扣上了。队伍没散，有人骂了一句，有人蹲下把罐子收进布袋。Lena走到巷口，Hermann Hofer从后面赶上来，罐子还温着。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-66_

- **1948.01** `vienna-life-injury-recovery/home-care` tags: health, work, family, injury
  Lena没有去诊所，只用热水和旧布洗了伤口。第二天伤口周围发红，家里人把仅剩的干净床单撕成条。
  _effects: health -0.02999999999999997 (untreated wound); cash -2 (clean cloth)_
  _causes: evt:world-vienna-1912:011429_

- **1948.01** `r13-fam.visit-grave::ctx-vienna-postwar-1945::milieu-tenement/wrong-grave` tags: task, family, grave, mourning, neighbor, grief, vienna, urban
  两人在坟场里绕了半个钟头，才找到那块刻着名字的石头。Grete Moser 2忽然说不是这一块，自己记得旁边有一棵小槐树。Lena陪她一排排找，天快黑时，守墓人过来说小槐树去年就砍了；Grete Moser 2站在空地上，把花放在了脚边。
  _effects: condition; flag +could_not_find_the_grave; relation friend with person-materialized-world-vienna-1912-130; knowledge “the old tree by the grave was cut down last year”; relation acquaintance with person-materialized-world-vienna-1912-130_

- **1948.08** `vienna-legacy-worklife.sick-fund/sick-fund.advance-from-fund` tags: legacy, work, family, reform, ordinary_life
  互助金的铁盒上了两把锁，钥匙一把在Lena手里，一把在邻街的面包师那里。取钱时面包师说“月底前要补回来”。药买回来了，雇主那边的人说手续“走流程”，说完就去忙别的。
  _effects: cash -2 (从互助金垫付药费)_

- **1949.01** `r13-fam.look-for-lost-relative::ctx-vienna-postwar-1945::milieu-tenement/name-on-list` tags: task, family, missing, official, war, search, vienna, urban
  Lena替Elisabeth Bauer 2把名字、出生年和最后住址写在纸上，递进窗口。Josef Weiss翻了三本名册，手指停在一行被水洇开的字上，说这个人登记在临时收容所。Elisabeth Bauer 2听见时，手里的伞掉在地上；Lena替她把伞捡起来，才发现自己的手也在抖。
  _effects: cash -2 (念错的名字); flag +found_missing_relative_on_list; role; relation kin with person-materialized-world-vienna-1912-17; knowledge “the missing relative was registered at a transit shelter”_

- **1949.03** `df18-mark.first-appearance::ctx-vienna-postwar-1945::milieu-tenement/prayer-mark` tags: body, mark, omen, illness, rumor, supernatural, eerie, vienna
  复活节前的夜里，Lena在城郊的路边十字架前跪了很久。第二天清早，左手掌心浮出一条细红线，像被针划过，却不疼。Lena没有告诉任何人，只把手套戴得更紧；可每次点蜡烛，那条线都比昨天更清楚一点。
  _effects: cash -1 (买蜡烛和灯油); state_add df18-uncanny-mark state:world-vienna-1912:916; flag +df18_mark_appeared_after_prayer; mood 0.020000000000000018; flag +df18_mark_noticed; knowledge “我身上有一处说不清的痕迹，别人对它各有各的说法。”_

- **1949.03** `vienna-tenement-neighbors.lost_room_key/key_stolen_by_stranger` tags: home, social, family, housing
  Lena记得出门时钥匙还在，回来却没了。Katharina Hofer说下午看见一个穿灰外套的男人在楼道里转悠，手里晃着一把铜钥匙。两人下楼查看，房门虚掩，抽屉被拉开，攒着买煤的六克朗不见了。Katharina Hofer陪着Lena去街角警察岗亭报了案，警察记下灰外套，说会留意。
  _effects: cash -6 (被盗的买煤钱); relation friend with person-materialized-world-vienna-1912-38; mood -0.020000000000000018_

- **1949.04** `mb17-border.permit-window::ctx-vienna-postwar-1945::milieu-tenement/turned-back` tags: migration, border, papers, permit, station, official, belonging, vienna
  Anton Kral把材料推回来，说出生纸缺了教区印章。Lena解释自己是从乡下赶来的，对方只指了指墙上的告示；排在后头的Otto Kraus递来半块面包，两个人坐在候车室里等下一班回去的车，谁也没有先说话。
  _effects: cash -2 (the return ticket and a wasted day); flag +mb17_turned_back_at_border; knowledge “边境窗口只承认带教区印章的出生证明。”_

- **1949.08** `p9-gap-adult-ordinary-day.market-closing/market-closing.bruised-apples` tags: adulthood, daily, leisure, neighborhood, ordinary, market, food, bargain
  苹果堆里混着几个已经发软的，摊主用围裙兜着往她篮子里倒，说拿回去喂猪也不亏。Lena在井边洗了半篮子，削皮时看见果核边有一圈褐色的痕，刀子挖下去，甜味还是冒出来。
  _effects: cash -0.1 (买收摊前的碰伤苹果); food_

- **1950.01** `state_tick:df18-uncanny-mark/mark-year/kept-small` tags: df18-uncanny-mark, body, mark, omen, superstition, reputation, mystery, faith
  又过了一年，Lena学会了在洗澡时不去盯那块印子。它还在，边缘有时发红，有时像普通的旧疤；街坊有了新的闲话，Lena的袖子也换了更长的款式。
  _effects: state_parameter df18-uncanny-mark.attention 10 -> 4; state_parameter df18-uncanny-mark.pain 0 -> 0; mood 0.010000000000000009_

- **1950.01** `r13-civ.help-refugee::ctx-vienna-postwar-1945::milieu-tenement/refused-at-door` tags: social, refugee, shelter, war, trust, vienna, urban, postwar
  Lena说家里没有空地方，把门关到只留一条缝。Emil Huber的纸箱在楼梯口放了一夜，第二天早上不见了，只剩一圈湿印子。Lena下楼时绕开那块地方走。
  _effects: mood -0.010000000000000009; flag +refused_refugee_shelter; relation acquaintance with person-materialized-world-vienna-1912-18_

- **1950.06** `major-crisis.rent-increase/tenant-meeting` tags: crisis, housing, rent, eviction, family, poverty
  巷口洗衣房的老板娘把几张椅子摆开，叫来半条街的租户。Lena把涨租单摊在桌上，逐条念出上面的数字；Franz Huber 2站在门边，既没走，也没替房东说话。大家决定先集体迟交一个月，签名纸传到Lena手里时，纸上已经有一块油渍。
  _effects: cash -2 (paper, ink and tram fare for the tenants meeting); role; flag +rent_strike; relation acquaintance with person-materialized-world-vienna-1912-133; reputation 0.03; relation acquaintance with person-materialized-world-vienna-1912-133_

- **1950.09** `vienna-social-movement.aftermath/keep-the-list` tags: development, social_movement, organization, consequence
  Lena把普拉特动物园夜班队的名单藏进缝纫机抽屉的夹层。名单上有二十几个名字，其中两个已经搬走，一个被工厂开除。Lena没有把最后一行划掉。
  _effects: reputation 0.03_

- **1951.01** `df18-mark.reading-at-market::ctx-vienna-postwar-1945::milieu-tenement/read-as-curse` tags: body, mark, omen, rumor, superstition, market, vienna, urban
  肉摊的Otto Winter看见Lena挽袖子，刀停在半空，说这种印子像吊死的人留下的手印。旁边买菜的人安静了一瞬，又各自低头挑菜。Lena想笑，却发现自己的手在抖；那天回家，Lena绕开了平时走的巷子。
  _effects: state_parameter df18-uncanny-mark.attention 4 -> 19; state_parameter df18-uncanny-mark.claimed blessing -> curse; reputation -0.039999999999999994; relation acquaintance with person-otto-winter; flag +df18_mark_read_as_curse_

- **1951.01** `state_reaction:df18-uncanny-mark/mark-public` tags: df18-uncanny-mark, body, mark, omen, superstition, reputation, mystery, faith
  Lena在人群里挽了一下袖子，第二天就有人来问那块印子是不是“会动的”。Lena说不会，问的人却已经把自己的解释说完了。
  _effects: state_parameter df18-uncanny-mark.attention 19 -> 27; reputation -0.010000000000000009_
  _causes: evt:world-vienna-1912:013540_

- **1951.01** `state_tick:df18-uncanny-mark/mark-year/story-grows` tags: df18-uncanny-mark, body, mark, omen, superstition, reputation, mystery, faith
  入冬后，Lena在集市上听见一个陌生女人向别人描述“那个有手印的人”。故事已经比原来多了一个雨夜和一声尖叫。Lena低头挑菜，发现自己的手正按着袖口。
  _effects: state_parameter df18-uncanny-mark.attention 27 -> 37; state_parameter df18-uncanny-mark.pain 0 -> 6; state_parameter df18-uncanny-mark.claimed curse -> curse; reputation -0.020000000000000004_

- **1951.01** `r13-fam.foster-child::ctx-vienna-postwar-1945::milieu-tenement::foster-postwar/foster-from-orphanage` tags: task, care, foster, child, household, orphan, vienna, urban
  孤儿院门口排着领孩子的队伍，Emil Weiss把Berta Hofer推到Lena面前，说这孩子夜里不哭，只是不肯吃饭。Lena蹲下来，把带来的半块糖放在孩子手心；孩子没有吃，先把糖纸抹平，夹进衣袋。那天下午，Lena在登记簿上按了手印。
  _effects: cash -4 (门口多出来的一双小鞋); flag +fostered_postwar_orphan; role; relation guardian with person:evt:world-vienna-1912:010917:child; knowledge “the child hoards smooth paper and sugar wrappers”; household_

- **1951.05** `p9-history-union-political.meeting/meeting-speak-up` tags: politics, union, party, meeting, leaflet, police, strike, reform
  Lena站起来报出自己车间的计件工价：糊一百个纸盒二十八赫勒，比隔壁车间少六个。屋里一下子静了，Otto Hofer把草稿推过来，让书记员把这几个数字写在动议第一行。散会时有人拍了拍Lena的肩膀。
  _effects: reputation 0.039999999999999994; relation colleague with person:evt:world-vienna-1912:000061:child_

- **1951.05** `p9-gap-adult-solitude.remake-coat/remake-coat.crooked-sleeves` tags: adulthood, daily, solitude, ordinary, home, mending, clothing, household
  Lena的剪刀钝得咬布，一剪下去袖口走了斜线。她索性把两只袖子都裁短，袖边用灰线锁了一圈。锁边时线太短，接到第三段才够，右手食指被针顶出个红印，改完像件旧式的短褂。
  _effects: skill_

- **1951.07** `vienna-tenement-neighbors.lost_room_key/key_stolen_by_stranger` tags: home, social, family, housing
  Lena记得出门时钥匙还在，回来却没了。Mitzi Hofer说下午看见一个穿灰外套的男人在楼道里转悠，手里晃着一把铜钥匙。两人下楼查看，房门虚掩，抽屉被拉开，攒着买煤的六克朗不见了。Mitzi Hofer陪着Lena去街角警察岗亭报了案，警察记下灰外套，说会留意。
  _effects: cash -6 (被盗的买煤钱); relation friend with person-materialized-world-vienna-1912-44_

- **1951.10** `p9-gap-adult-unemployed.labour-exchange/exchange-fee-lost` tags: adulthood, unemployment, casual_labour, poverty, daily, labour_exchange, bureaucracy
  介绍所的墙上钉着上百块木牌，大半翻过去露出灰白的背面。Anna Berg收了一克朗，从抽屉里摸出纸条，墨水还没干透。第二天Lena站在工厂门口，门房说清扫工昨天就齐了。
  _effects: cash -1 (职业介绍所登记费)_

- **1952.01** `state_tick:df18-uncanny-mark/mark-year/story-grows` tags: df18-uncanny-mark, body, mark, omen, superstition, reputation, mystery, faith
  入冬后，Lena在集市上听见一个陌生女人向别人描述“那个有手印的人”。故事已经比原来多了一个雨夜和一声尖叫。Lena低头挑菜，发现自己的手正按着袖口。
  _effects: state_parameter df18-uncanny-mark.attention 37 -> 47; state_parameter df18-uncanny-mark.pain 6 -> 12; state_parameter df18-uncanny-mark.claimed curse -> curse; reputation -0.020000000000000004_

- **1952.01** `r13-fam.write-missing-relative::ctx-vienna-postwar-1945::milieu-tenement/letter-sent` tags: task, family, letter, missing, war, literacy, vienna, urban
  Lena替Elisabeth Kral写信，把最后知道的部队番号、收容站和一处旧住址都写上去。Elisabeth Kral不识字，却要Lena把“家里都好”念三遍，怕写错。信投进邮筒时，她伸手在筒口摸了一下；Lena把回信地址又描粗了一笔。
  _effects: cash -1 (没有地址的信); flag +wrote_to_missing_relative; skill; relation kin with person-materialized-world-vienna-1912-143; knowledge “A letter with the last known unit and shelter addresses was ”; relation acquaintance with person-materialized-world-vienna-1912-143_

- **1953.01** `state_tick:df18-uncanny-mark/mark-year/kept-small` tags: df18-uncanny-mark, body, mark, omen, superstition, reputation, mystery, faith
  又过了一年，Lena学会了在洗澡时不去盯那块印子。它还在，边缘有时发红，有时像普通的旧疤；街坊有了新的闲话，Lena的袖子也换了更长的款式。
  _effects: state_parameter df18-uncanny-mark.attention 47 -> 41; state_parameter df18-uncanny-mark.pain 12 -> 8; mood 0.010000000000000009_

- **1953.01** `p9-social-relationship-initiative.apology-at-bakery/settle-the-account` tags: courtship, friendship, family, social, initiative, housing, task, task:social
  七点刚过，Luise Winter 3照例来买一只 Semmel。Lena把紫罗兰和两只 Semmel 放在柜台上，先付了四十赫勒，又把上回算错的账一笔一笔说清：借出去的是八克朗，记成了十克朗，是自己记错了。Luise Winter 3听完没马上说话，把零钱数进围裙口袋，最后说中午过来喝碗汤。
  _effects: cash -0.4 (一小束紫罗兰和两只 Semmel); relation friend with person-materialized-world-vienna-1912-105; mood 0.07999999999999996_

- **1954.01** `state_tick:df18-uncanny-mark/mark-year/kept-small` tags: df18-uncanny-mark, body, mark, omen, superstition, reputation, mystery, faith
  又过了一年，Lena学会了在洗澡时不去盯那块印子。它还在，边缘有时发红，有时像普通的旧疤；街坊有了新的闲话，Lena的袖子也换了更长的款式。
  _effects: state_parameter df18-uncanny-mark.attention 41 -> 35; state_parameter df18-uncanny-mark.pain 8 -> 4; mood 0.010000000000000009_

- **1954.01** `p9-social-daily-culture.pictures-or-concert/p9-social-daily-culture.pictures-or-concert.cheap-picture` tags: daily, culture, leisure, cafe, music, walk, task, task:culture
  Lena和Friedrich Kral 3买了影戏棚最便宜的边座，边座和两粒糖一共五十赫勒。一刻钟的活动影戏里火车朝观众冲过来，棚里有人叫出了声。散场后两人还站在门口看下一场的招牌，Lena把剩下几个铜板在口袋里攥得发热，又买了两粒糖，一人一粒含回家。
  _effects: cash -0.5 (影戏棚边座和两粒糖); mood 0.050000000000000044; relation friend with person-materialized-world-vienna-1912-40_

- **1954.02** `p9-gap-adult-unemployed.labour-exchange/exchange-trial-work` tags: adulthood, unemployment, casual_labour, poverty, daily, labour_exchange, bureaucracy
  介绍所里那个Maria Hofer 2说木牌上的地址多半过时了，不如自己去问。Lena走了四十分钟到洗衣房，院子里晾着床单。老板娘让她先熨一件试试，看完说留下吧，明天还这个时辰来。
  _effects: cash 3 (洗衣房试工半天按件计酬); skill; relation acquaintance with person-materialized-world-vienna-1912-160_

- **1954.11** `vienna-legacy-worklife.hours-ledger/hours-ledger.refuse` tags: legacy, work, family, reform, ordinary_life
  工头把表折成四折塞进围裙口袋，说“你会后悔的”。Lena当天下午去账房窗口排队，窗上的铁栅栏有股锈味。账房先生翻了半天蓝皮本子，最后从抽屉里数出八克朗硬币，一枚一枚推过台面。
  _effects: cash 8 (追回的拖欠计件工资); reputation -0.030000000000000013; relation colleague with person-materialized-world-vienna-1912-105_

- **1955.01** `state_expire:df18-uncanny-mark` tags: df18-uncanny-mark, body, mark, omen, superstition, reputation, mystery, faith
  Lena的「不祥的印记」到期；相关安排结束。
  _effects: state_remove df18-uncanny-mark state:world-vienna-1912:916; flag +df18_mark_faded_

- **1955.01** `p9-social-daily-culture.singing-club/p9-social-daily-culture.singing-club.join-second-row` tags: daily, culture, leisure, cafe, music, walk, task, task:social
  Lena把两克朗月费和徽章钱一起放在啤酒渍斑斑的桌上，Mitzi Lechner在名册上添了一行。钢琴缺的那个音在排练中途又卡住，Lena站在第二排跟着哼，声音被两边的人盖住，胸腔里却震得发麻；散场时能把副歌完整唱下来，也记住了怎么在人群里找准自己的声部。
  _effects: cash -2 (合唱团月费和铜徽章钱); mood 0.06999999999999995; relation friend with person-mitzi-lechner; skill; relation acquaintance with person-materialized-world-vienna-1912-149_

- **1955.01** `vienna-housing-move.rent-notice/rent-notice-demand-repair` tags: housing, home, rent, family, money
  Lena没有立刻答话，先去敲Elisabeth Huber的门。两人一起数落墙上的水渍和门框里灌进来的风，楼梯间的窗户修好了，自家墙皮还在剥落。Elisabeth Huber提议一起把话带给看门人：先修好漏水的墙角，涨租的事再谈。Lena把纸重新折好，请他把话带到门外。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-170; mood 0.030000000000000027; flag +rent_dispute; relation acquaintance with person-materialized-world-vienna-1912-170_

- **1956.01** `p9-social-daily-culture.sunday-hill/p9-social-daily-culture.sunday-hill.reach-summit` tags: daily, culture, leisure, cafe, music, walk, task, task:daily
  Lena和Luise Kral 2按原计划沿葡萄园间的土路往上走，鞋子沾满黄泥，到山顶时风把汗湿的衬衫吹得冰凉。下山在第一个酒棚坐下，两人合点了一壶新酒和一块面包，一共一克朗二十赫勒；Lena喝到第二杯时脸颊发烫，把剩下的半块面包包进手帕带回家，第二天腿酸，却睡得很沉。
  _effects: cash -1.2 (卡伦山酒棚的新酒和面包); food; relation friend with person-materialized-world-vienna-1912-33; mood 0.06000000000000005_

- **1956.07** `p9-gap-adult-ordinary-day.lost-dog/lost-dog.feed-bread` tags: adulthood, daily, leisure, neighborhood, ordinary, animal, neighbor
  巷子里卖煤的正往板车上装货，看见狗绕过来，说这狗在环城道那边就有人找。Lena把面包递过去时，狗用鼻子拱了拱她的掌心。男人跑来时手里还攥着半截绳子，连声道谢，说这狗是替人看院子的。
  _effects: food; mood 0.030000000000000027_

- **1956.11** `vienna-historical-social-movement.public-meeting/speak-with-rent-numbers` tags: history, historical_process, social_movement, organization, politics
  折叠椅缺了一条腿，Lena站着说话，把粮店赊账的单据举起来念。Anna Bauer 2在第三排跟着报出另一家的房租，两人一唱一和。大厅后头有人喊先谈罢工，主持人敲纸板叫安静。
  _effects: reputation 0.06; skill_

- **1956.11** `p9-gap-adult-solitude.misdelivered-letter/misdelivered-letter.opened` tags: adulthood, daily, solitude, ordinary, home, letter
  信封没封牢，Lena在灯下把它掀开，里面是维也纳联合银行的催款单，欠了三十四克朗。她认出那名字是楼上常穿黑裙的女人，便把纸原样叠回去，用米汤把封口粘好，放到门房窗台上。
  _effects: mood -0.040000000000000036; flag +knows_upstairs_debt_

- **1957.01** `p9-work-jobsearch.ask-trial/ask-trial.accepted` tags: work, job_search, negotiation, wages, employment, task, trial, factory
  午休的哨子刚响，Mitzi Lechner 2夹着烟走到门口。Lena报上姓名、住址和干过的活，声音有点发紧。工头嗯了一声，说明早六点来，管一顿午饭，干得好再谈工钱。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-27; mood 0.050000000000000044_
## Anton

Born 1912.01, died 1941.01 (age 29).
Education: none 0; occupation: none; roles: infant, child, denouncer, father, mourner, tenant_organizer, quarantined_resident, registered_resident, tuberculosis_patient, permit_holder.

### State snapshot
- p22-family-legend [person] (ended 1912.7: replaced_by:p22-family-legend) parameters={"warmth":70,"secrecy":20,"danger":5,"promise":65} links={} ticks=0
- p22-family-legend [person] (ended 1919.1: duration expired) parameters={"warmth":80,"secrecy":25,"danger":8,"promise":62} links={} ticks=3
- bc18-ridiculous-fame [person] (ended 1937.1: duration expired) parameters={"notoriety":20,"legitimacy":0,"absurdity":70,"invitations":0,"boredom":28,"officialStory":"被仇人骂出名的人"} links={} ticks=3
- hs18-street-witness [person] (ended 1941.1: replaced_by:hs18-street-witness) parameters={"certainty":69,"danger":45,"retellings":0,"claim":"我签字证明那架钢琴是无人认领的。","quiet":false} links={} ticks=2
- public-scandal [person] (ended 1940.1: replaced_by:public-scandal) parameters={} links={} ticks=0
- p22-scandal-engine [person] (ended 1940.1: replaced_by:p22-scandal-engine) parameters={"heat":46,"reach":49,"leverage":22,"shame":38} links={} ticks=0
- public-scandal [person] (ended 1941.1: owner_died) parameters={} links={} ticks=0
- p22-scandal-engine [person] (ended 1941.1: owner_died) parameters={"heat":58,"reach":53,"leverage":25,"shame":60} links={} ticks=1
- pl19-protected-scandal [person] (ended 1941.1: owner_died) parameters={"exposure":83,"protection":20,"leverage":22,"publicHeat":77} links={"protector":"Emil Weiss"} ticks=2
- hs18-street-witness [person] (ended 1941.1: owner_died) parameters={"certainty":85,"danger":45,"retellings":0,"claim":"我签字证明那架钢琴是无人认领的。","quiet":false} links={} ticks=0
- ad20-private-bargain [person] (ended 1941.1: owner_died) parameters={"leverage":48,"trust":41,"debt":54,"exit":25} links={} ticks=1

### 126 subject events

- **1912.07** `p22-warm-fathers-letter::ctx-vienna-1912::milieu-tenement/the-recipe-arrives` tags: infancy, family, letter, uncle, warm, melancholy, memory, drama
  信是叔叔死前写的，在邮袋里压了两年才到。Friedrich Hofer拆开时先笑出声：里面没有遗言，只有一张李子饺子的做法和一个关于祖母的笨笑话。那天晚上，全家真的吃了饺子。
  _effects: state_add p22-family-legend state:world-vienna-1912:16; mood 0.04; knowledge “家里有一封叔叔留下的信，里面写着李子饺子的做法。”_

- **1912.07** `p22-warm-naming-feast::ctx-vienna-1912::milieu-tenement/the-name-is-too-long` tags: infancy, family, feast, name, neighbor, warm, tender, drama
  两个祖母的名字都想要，最后写在纸上连成一串。Josefine Hofer念到一半就笑了，说这孩子以后签名字要多蘸一次墨水；Anton在摇篮里睡着，拳头举在耳边，蛋糕上只插了一根蜡烛。
  _effects: mood 0.04; relation acquaintance with person-phase15-Anton-world-vienna-1912; flag +double_name; knowledge “我的名字里有两个祖母的名字。”; state_add p22-family-legend state:world-vienna-1912:17_

- **1913.01** `vienna-life-infant-first-smile/colic-night` tags: infancy, family, first, warm, injury
  夜里Anton哭了很久，Josefine Hofer抱着孩子在屋里来回走，数着地板缝。天快亮时孩子终于打了个嗝，安静下来；Josefine Hofer坐在床沿，发现自己还保持着走路的姿势。
  _effects: mood -0.030000000000000013; health -0.010000000000000009 (lost sleep)_

- **1913.01** `state_tick:p22-family-legend/the-story-changes-hands/told-at-the-table` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，Anton家的故事在饭桌上换了新的讲法：多了一句笑话，少了一处哭声。听的人把汤匙放下，等下一句；讲故事的人却先去看窗子有没有关好，谁也没有先动筷子。
  _effects: state_parameter p22-family-legend.warmth 75 -> 78; state_parameter p22-family-legend.secrecy 15 -> 13; state_parameter p22-family-legend.promise 60 -> 62; mood 0.01_

- **1913.02** `vienna-life-toddler-wrong-cradle/the-neighbour-is-mistaken` tags: infancy, family, rumour, identity, comic, drama
  Friedrich Hofer把被子摊在桌上，指着上面的补丁说这是外婆的针脚。Hermann Kral看了半天，承认自己认错了；Anton在旁边把一只木勺敲得咚咚响，像在给这场争论判案。
  _effects: relation acquaintance with person-hermann-kral; mood 0.02; skill_

- **1913.02** `vienna-life-birth-letter-from-the-dead/the-letter-is-a-bill` tags: infancy, family, secret, letter, drama
  信里没有问候，只有一张旧账单：棺材、墓地、一趟从边境回来的车费。Josefine Hofer把账单翻过来，背面用铅笔写着“别让孩子知道”。Anton伸手去抓纸角，Josefine Hofer没有让。
  _effects: cash -4 (paid an old funeral debt); flag +family_debt_letter; mood -0.03_

- **1913.02** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Anton家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 13 -> 17; state_parameter p22-family-legend.warmth 78 -> 80; mood 0.01_
  _causes: evt:world-vienna-1912:000262_

- **1913.03** `iw18-infancy.first-word::ctx-vienna-1912::milieu-tenement/a-word-for-bread` tags: infancy, first_word, memory, family, wonder, eerie, vienna, urban
  Anton指着桌上的面包说出一个短词，声音轻得像在试音。Josefine Hofer把面包掰下一角，泡进热水里喂给孩子；Anton吃完又指了一次，这次说得更清楚。厨房里的人都笑了，连灶上的水汽也像在往上冒。
  _effects: food; mood 0.03; flag +first_word_bread_

- **1914.01** `vienna-life-toddler-first-words/first-word-more` tags: infancy, family, first, comic
  Anton把空碗推回Josefine Hofer面前，清清楚楚地说了一个字：“还要。”Josefine Hofer愣住，随后把锅底最后一点糊刮进碗里。孩子学会了用一句话让世界再转一圈。
  _effects: skill; mood 0.03_

- **1914.02** `vienna-life-toddler-accident/scalded-hand` tags: infancy, accident, family, danger, injury
  厨房的锅盖没有盖严，Anton伸手去够桌上的勺子，蒸汽先扑到手腕上。Josefine Hofer把孩子抱到水缸边，一瓢一瓢地浇冷水；孩子哭得打嗝，锅里的汤还在冒泡。
  _effects: health -0.07999999999999996 (scalded hand); condition; cash -1 (bandages and ointment); mood -0.05000000000000002_

- **1915.01** `vienna-life-child-family-legend/lost-relative` tags: childhood, family, secret, story
  Josefine Hofer在收拾箱子时翻出一张没有署名的照片，说那是家里一个“去了很远地方”的人。Anton问还回不回来，Josefine Hofer把照片翻过去，说先把名字记住，别在饭桌上问。
  _effects: knowledge “家里有一张没有署名的照片，照片上的人去了很远的地方。”; flag +family_legend_photo; mood -0.01_

- **1915.02** `vienna-early-childhood.stairwell-fall/neighbor-carries` tags: childhood, family, home, street, injury
  Friedrich Hofer的煤桶磕在楼梯转角，煤块滚了一地。Anton坐在平台上，膝盖渗出血珠。Friedrich Hofer把桶一放，夹起Anton进了自家门，用温水冲伤口，又拿一块干面包塞过来。Josefine Hofer赶来时，Anton正坐在厨房凳上啃面包。
  _effects: health -0.020000000000000018 (膝盖擦破，已冲洗); food; relation acquaintance with person-josefine-hofer_

- **1915.02** `state_reaction:p22-family-legend/someone-asks-again` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又有人问起Anton家的那件旧事。大人先笑了一下，才说“都是很早以前了”；问的人点点头，眼睛却往摇篮那边看，手指在杯沿上停了一会儿，谁也没有接话，窗外有风。
  _effects: state_parameter p22-family-legend.secrecy 17 -> 21; state_parameter p22-family-legend.warmth 80 -> 82; mood 0.010000000000000002_
  _causes: evt:world-vienna-1912:000594_

- **1915.05** `statistical_infection`
  Anton在Leopoldstädter Zinshaus, gemeinsamer Gang病倒了，肺炎让身体发热、虚弱，接下来的日子只能卧床。

- **1915.06** `statistical_illness_worsened`
  Anton的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1915.08** `statistical_recovery`
  Anton从肺炎中慢慢恢复，能下床喝水，但身体还虚弱。

- **1916.01** `vienna-life-child-first-friend/shared-toy` tags: childhood, friendship, family, comic
  Otto Hofer在楼道里滚一只铁环，Anton站在门口看。Otto Hofer把铁环推过来，说“你推一次，我推一次”。两个人从楼梯口推到院子里，铁环倒下的声音把午睡的大人吵醒了一排。
  _effects: relation friend with person:evt:world-vienna-1912:000061:child; skill; mood 0.05_

- **1916.01** `state_tick:p22-family-legend/the-story-changes-hands/a-detail-goes-missing` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  又过了一年，故事里最要紧的那件东西不见了：先是名字，后来是地点。Anton问起时，大人说“你记错了”；可柜子最底层那只空盒子，谁也没有扔，锁却换过了，钥匙也不见了。
  _effects: state_parameter p22-family-legend.secrecy 21 -> 25; state_parameter p22-family-legend.danger 5 -> 8; state_parameter p22-family-legend.warmth 82 -> 80; mood -0.010000000000000002_

- **1916.02** `vienna-life-child-inherited-wish/the-dead-grandmothers-wish` tags: childhood, family, wish, grief, uncanny, drama
  Anton在饭桌上忽然说：“等我长大了，要把那间屋子买回来。”Josefine Hofer的勺子停在半空，因为这句话是去世多年的外婆常说的，连“那间屋子”都指得一模一样。Anton说完就低头喝汤，好像只是随口。
  _effects: flag +inherited_wish_house; knowledge “孩子说要把“那间屋子”买回来，和去世的外婆说过的一模一样。”; mood -0.010000000000000009_

- **1918.01** `p9-gap-childhood-chores.market-line/line-half-flour` tags: childhood, household, chores, school, task, daily, market, food
  面粉袋压在胸口，越抱越沉。Anton前面的大婶一直往后靠，Anton就把膝盖顶住对方的篮子，硬留出半步。买到半袋面粉后，Anton的鞋跟留在人堆里，找回来时鞋面全是泥。回家路上布袋换了两次肩，赤脚踩过石板时脚底发麻。
  _effects: food; health -0.020000000000000018 (赤脚走石板路磨伤脚底); skill; relation acquaintance with person-materialized-world-vienna-1912-15; relation acquaintance with person-materialized-world-vienna-1912-2_

- **1918.03** `vienna-childhood-street.market-errand/errand-ok` tags: childhood, street, social, home
  市场里的菜摊一字排开，Anton把十五克鲁泽排在掌心，先买了土豆，又去盐摊上要了一小包。摊主用旧报纸把盐裹好，Anton把它塞进围裙内袋，土豆兜在身前。回家时Friedrich Hofer接过铜板一枚枚数，土豆一颗没少。
  _effects: food; cash -0.15 (市场花销); relation kin with person-friedrich-hofer_

- **1919.01** `state_expire:p22-family-legend` tags: p22-family-legend, family_legend, family, story, secret, inheritance, promise, memory
  Anton的「家族传说」到期；相关安排结束。
  _effects: state_remove p22-family-legend state:world-vienna-1912:17_

- **1919.01** `p9-gap-childhood-chores.laundry-help/laundry-dragged-docked-pay` tags: childhood, household, chores, school, task, daily, laundry, work
  “你看看这角。”Friedrich Hofer把床单拎起来，煤渣簌簌往下掉。Anton伸手去拍，反而把灰按进布纹里。Friedrich Hofer从工钱里数回两枚，只留一赫勒在Anton手心，让重洗那角。晚饭前Anton一直蹲在井台边，换了两盆水，指甲缝里全是黑泥。
  _effects: cash 0.01 (被扣后只剩一赫勒); mood -0.05; relation acquaintance with person-friedrich-hofer; relation acquaintance with person-materialized-world-vienna-1912-1_

- **1920.01** `p9-gap-childhood-chores.market-line/line-half-flour` tags: childhood, household, chores, school, task, daily, market, food
  面粉袋压在胸口，越抱越沉。Anton前面的大婶一直往后靠，Anton就把膝盖顶住对方的篮子，硬留出半步。买到半袋面粉后，Anton的鞋跟留在人堆里，找回来时鞋面全是泥。回家路上布袋换了两次肩，赤脚踩过石板时脚底发麻。
  _effects: food; health -0.020000000000000018 (赤脚走石板路磨伤脚底); skill; relation acquaintance with person-materialized-world-vienna-1912-11; relation acquaintance with person-materialized-world-vienna-1912-10_

- **1921.01** `statistical_infection`
  Anton在Leopoldstädter Zinshaus, gemeinsamer Gang病倒了，伤寒让身体发热、虚弱，接下来的日子只能卧床。

- **1921.01** `p9-gap-childhood-chores.laundry-help/laundry-dragged-docked-pay` tags: childhood, household, chores, school, task, daily, laundry, work
  床单太长，Anton拖着一角往绳子走，布边扫过煤渣，立刻黑了一道。Anton Kral弯腰看了看，脸沉下来，说这角得重洗，工钱扣一半。Anton接过一赫勒，蹲在盆边用清水搓那一道灰，搓到指节发红，水面上还浮着煤末。
  _effects: cash 0.01 (被扣后只剩一赫勒); mood -0.05; relation acquaintance with person-materialized-world-vienna-1912-7; relation acquaintance with person-materialized-world-vienna-1912-7_

- **1921.03** `statistical_illness_worsened`
  Anton的伤寒没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1921.06** `statistical_illness_worsened`
  Anton的伤寒没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1921.07** `statistical_recovery`
  Anton熬过了这场伤寒，能坐起来喝一点汤，但身体还很虚。

- **1921.11** `vienna-childhood-friends.courtyard-race/won-the-race-lost-a-button` tags: childhood, social, school, street
  晒衣绳下挂着湿床单，孩子们绕着跑，鞋底把水甩到墙上。Anton在第三圈超过Ferdinand Winter，手先碰到墙根。两颗玻璃弹珠进了Anton口袋，外套第二颗纽扣却崩进下水道。Ferdinand Winter从二楼窗口骂了一句，扔下一根别针。
  _effects: mood 0.05; relation acquaintance with person-ferdinand-winter_

- **1921.12** `vienna-childhood-street.washhouse-fever/fever-scarlet` tags: childhood, street, social, home
  阁楼的窗子被Josefine Hofer用布堵了一半，说是怕风。Anton躺在草垫上，听见楼下有人问“你家孩子怎么样了”，Josefine Hofer压低声音回话。医生来了一趟，站在门口没进屋，诊费是一克朗二十赫勒。此后七天，Anton的碗和水壶都放在门外。
  _effects: cash -1.2 (付医生诊费（其中0.8克朗记入债务）); condition_

- **1922.01** `p9-gap-childhood-chores.fetch-coal/coal-half-credit` tags: childhood, household, chores, school, task, daily, coal, errand
  “月底一起结。”掌柜说完，把半筐煤推到柜台外。Anton用胸口顶住筐沿往家挪，煤灰落进领口，手心被麻绳磨得发亮。Friedrich Hofer在Leopoldstädter Zinshaus, gemeinsamer Gang门口等到人，先看了看筐底，再看了看Anton的手，把漏掉的碎渣扫进簸箕。
  _effects: food; relation kin with person-friedrich-hofer_

- **1922.08** `p9-childhood-household.strap-by-the-door/neighbor-interrupted` tags: childhood, family, household, home, siblings, illness, neighbors
  Luise Kral探头进来时，Friedrich Hofer手里的皮带还没放下。Friedrich Hofer把它挂回门后，改口数落Anton，声音一阵高一阵低。Luise Kral接过盐，站了一会儿才走。Anton缩在灶台后面，等脚步声下了楼，才慢慢挪出来。
  _effects: relation acquaintance with person-luise-kral; mood -0.03; relation kin with person-friedrich-hofer_

- **1922.11** `vienna-childhood-street.cigarette-card/card-gift` tags: childhood, street, social, home
  Anton每天放学都在柜台前站一会儿，看玻璃板底下压着的烟画，顺手把歪了的报纸摞齐。Mitzi擦完柜台，从抽屉最里面摸出一张揉皱的风景卡，边角还沾着烟丝，塞过来时说了句“别挡着门”。Anton把卡夹进课本，第二天带了一张重复的来给Mitzi看。
  _effects: mood 0.06; reputation 0.02; relation friend with person-phase15-Mitzi-world-vienna-1912_

- **1923.01** `p9-gap-childhood-chores.market-line/line-sold-out-potatoes` tags: childhood, household, chores, school, task, daily, market, food
  “卖完了。”三个字从窗口里传出来，Anton后面的队伍立刻散了一半。Anton没走，趴在窗台上看伙计扫面屑，直到人家挥手赶人。旁边摊子的土豆带着泥，Anton用围裙兜住，一枚一枚数铜板，回家报账时连找零都说清了。
  _effects: food; mood -0.03; skill; relation acquaintance with person-materialized-world-vienna-1912-26; relation acquaintance with person-materialized-world-vienna-1912-9_

- **1924.01** `p9-childhood-apprenticeship.ask-for-trial/trial-granted` tags: adolescence, work, apprenticeship, labour, training, family, task, task:work
  “认得字吗？”Friedrich Hofer问。Anton把地址翻到背面，念出门牌号。Friedrich Hofer这才让Anton去码纸，按斤数分成三堆。Anton蹲到腿麻，手指被纸边割破，Friedrich Hofer看完斤两，数出一克朗二十赫勒，说午饭在灶间吃，试工三天再谈工钱。
  _effects: cash 1.2 (试工半日按小时折算的铜币); food; skill; relation acquaintance with person-friedrich-hofer; relation acquaintance with person-materialized-world-vienna-1912-12_

- **1924.11** `vienna-adolescence.workshop-apprentice/apprenticeship-rejected` tags: adolescence, school, work, family, social
  “太小，手也薄。”Buchdruckerei Winter & Söhne说完，把Anton推过的木板翻过来，指着上面一道啃痕。Josefine Hofer把布包往肩上提了提，说打扰了。Anton在门口多站了一会儿，直到里面的刨子声把话头盖过去，才跟着Josefine Hofer下楼。
  _effects: mood -0.08000000000000002; reputation -0.05; relation kin with person-josefine-hofer_

- **1925.01** `task-vienna-poor-apprentice.foreman-introduction/relative-introduces-trial-half-day` tags: adolescence, apprentice, work, education, poverty, printshop, task, task:work
  亲戚把他带到工头面前，工头让他下星期来试半天，先看裁纸和搬版。母亲熨平的衬衫领子还是硬得硌脖子，他站在厂门口把姓名说了两遍。
  _effects: flag +half_day_trial_at_big_printshop; relation acquaintance with person-materialized-world-vienna-1912-12; mood 0.05_

- **1926.01** `p9-childhood-youth-aspiration.save-for-books/money-taken-for-coal` tags: adolescence, education, aspiration, school, books, club, exam, task
  Josefine Hofer把火柴盒放回窗台，说等发了工钱再补给他。Anton把抄好的纸袋叠成小册子，用缝衣针别在一起，封面写了书名，字比平时大。
  _effects: cash -2 (积蓄被挪去买煤（其中2克朗记入债务）); mood -0.06; skill; relation kin with person-josefine-hofer; relation acquaintance with person-materialized-world-vienna-1912-55_

- **1927.01** `task-vienna-youth-apprenticeship-search/trial-promised` tags: task, task:work, work, adolescence, apprenticeship
  Anton在印刷厂门口等到工头出来，把姓名、住址和会写的字报了一遍。Katharina Bauer 2让他下周一早来试半天，先不给工钱，只管一顿午饭。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-32; flag +apprenticeship_trial_promised; mood 0.05; relation acquaintance with person-materialized-world-vienna-1912-32; relation acquaintance with person-materialized-world-vienna-1912-3_

- **1927.06** `vienna-adolescence.workshop-apprentice/apprenticeship-rejected` tags: adolescence, school, work, family, social
  Buchdruckerei Winter & Söhne捏了捏Anton的虎口，又让Anton张开手指，说骨节还没长开，推硬木会伤手。Josefine Hofer想再问一句，Buchdruckerei Winter & Söhne已经转身去搬木料。Anton退到门槛外，听见刨子重新响起来，木花从门缝里卷到脚边。
  _effects: mood -0.08; reputation -0.05; relation kin with person-josefine-hofer_

- **1928.01** `p9-childhood-youth-aspiration.save-for-books/installment-deal` tags: adolescence, education, aspiration, school, books, club, exam, task
  Helene Berg把书翻到扉页，用铅笔写上日期和两克朗的欠额。Anton把学生证放到柜台上的铁盒里，出门时回头看了一眼，证上那张照片拍得比本人精神。
  _effects: cash -1 (旧书首付); flag +book_debt_2kr; skill; relation acquaintance with person-materialized-world-vienna-1912-64; relation acquaintance with person-materialized-world-vienna-1912-64_

- **1929.01** `task-vienna-youth-apprenticeship-search/no-vacancy` tags: task, task:work, work, adolescence, apprenticeship
  Anton问了三家印刷厂，得到的回答都是“今年不收学徒”。最后一家让他把名字写在纸角上，说有空缺再通知，但谁都知道那张纸会被压在账本下面。
  _effects: mood -0.05; knowledge “今年印刷厂大多不收新学徒。”; relation acquaintance with person-materialized-world-vienna-1912-61_

- **1930.01** `p10-migration-tasks.ask-travel-money/uncle-part-loan-note` tags: adulthood, migration, housing, family, travel, task, loan, relative
  舅父从裤袋里数出十五克朗推过来，说剩下的让他去车站帮车夫装货抵工钱。舅父在灯下写了一张欠条，写明三个月内还清，他签了名，把钱对折放进内袋，欠条留给舅父收在账簿里。
  _effects: cash 15 (舅父借给的路费); relation kin with person-hermann-kral; flag +owes_uncle_15_kronen; relation acquaintance with person-materialized-world-vienna-1912-50_

- **1930.02** `vienna-courtship-courtyard.sunday-walk/second-bridge-promise` tags: adulthood, courtship, partner, social, family, partnership
  在第二个桥洞下，Mitzi Winter先停下来，用鞋尖碾一颗烤栗子壳，说下星期天还是这个时候、还是这座桥。Anton点头，掏出四赫勒买了两小袋栗子，两人分着剥，手上都是糖渍；桥洞上的水还在滴，谁也没有提万一明天下雨怎么办。
  _effects: relation partner with person-materialized-world-vienna-1912-3; cash -0.04 (两小袋烤栗子（其中0.04克朗记入债务）); mood 0.06_

- **1930.02** `vienna-parish-aid.rent-box/rent-box.accept-all` tags: faith, parish, mutual_aid, poverty, family
  煤袋落在台阶上，扬起细细一层黑末。Anna Moser用铅笔头在蓝格册上写门牌号，问房东姓什么，又叮嘱别把面包票弄丢。灶上水壶开始叫，Anton才想起屋里连只干净的杯子都没有。
  _effects: cash 6 (互助会补上本月房租差额); food; relation acquaintance with person-anna-moser; flag +parish_registered_

- **1930.02** `vienna-church-community.saint-vincent-box/box-request-granted` tags: faith, social, family, home
  Anton在圣文生会门口登记，领到一张面包券和一小袋土豆。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-42; mood 0.03; relation acquaintance with person-materialized-world-vienna-1912-42_

- **1930.02** `vienna-social-movement.recruitment/report-to-official` tags: development, social_movement, organization, politics
  Anton把传单交给楼里的门房。门房没有接，只让Anton自己去找警察局。那天傍晚，两个穿便衣的人在街口站了很久。
  _effects: role; reputation 0.020000000000000004; relation acquaintance with person-materialized-world-vienna-1912-4_

- **1930.02** `vienna-medical-treatment.toothache/dentist-pull` tags: health, medical, family, money
  钳子夹住牙根时，Anton听见自己太阳穴里咯的一声。医生往牙槽里塞了团浸药棉，叫咬住别松。下楼时Friedrich Hofer扶着胳膊，说嘴里的血味比啤酒苦多了。
  _effects: cash -3 (牙医拔牙费用（其中3克朗记入债务）); health 0.05999999999999999 (拔除病牙解除疼痛); mood -0.03_

- **1930.03** `p10-crisis-migration.eviction/eviction-deal-landlord` tags: adulthood, crisis, migration, war, police, eviction, refugee, housing
  房东站在楼梯转角数钱，数完把钥匙串往手心里磕了磕，说涨价这一成是行情。看门人拎着工具箱上来，锁芯换了回去，门一关，院子里的床架才搬回屋里。Anton把剩下的克朗一张张压在碟子底下。
  _effects: cash -20 (补齐部分欠租才换回门锁（其中20克朗记入债务）); mood 0.05; flag +rent_arrears_partial; relation acquaintance with person-materialized-world-vienna-1912-32; relation acquaintance with person-materialized-world-vienna-1912-25_

- **1930.04** `vienna-parish-aid.funeral-society/funeral-society.pay` tags: faith, parish, mutual_aid, poverty, family
  Anton数出八赫勒交给Luise Kral，看她在蓝皮本上找到自家门牌，把这一周的格子划掉。Luise Kral说上个月隔壁巷子的人走了，公账出了棺材和一场小弥撒，剩下的钱记在册尾。楼梯口的灯很暗，Anton盯着自己的名字看了两遍才转身。
  _effects: cash -0.4 (一周丧葬互助会会费（其中0.4克朗记入债务）); relation acquaintance with person-luise-kral; flag +funeral_society_member_

- **1931.01** `vienna-family-fatherhood/child-born-at-home` tags: family, childbirth, death, lifecycle, birth, state, state:raising-child, raising-child
  Mitzi Winter在Haus der Tante in Klosterneuburg生下一个孩子，取名Berta Bauer。Anton在厨房和走廊之间来回，接生的人让烧水、拿布、付六克朗；孩子天亮后睡着了，Anton从此在户籍表上多了“父亲”一栏，手背上还留着烫水壶的红印。
  _effects: birth female; cash -6 (midwife fee（其中6克朗记入债务）); role; state_add raising-child state:world-vienna-1912:104_

- **1931.01** `p9-work-jobsearch.relative-introduction/relative-introduction.never-mentions` tags: work, job_search, negotiation, wages, employment, task, relative, introduction
  点心纸包搁在膝上，Rosa Winter说熟人多，慢慢问，别急。Anton回家把这些话学给母亲听，母亲只叹了口气。那包糖后来自己家里分着吃了。
  _effects: relation kin with person-materialized-world-vienna-1912-4; cash -1 (再买一包糖上门（其中1克朗记入债务）); mood -0.05; relation acquaintance with person-materialized-world-vienna-1912-14_

- **1931.02** `p9-social-family-conflict-care.sick-parent-night/hire-neighbor-daycare` tags: family, care, siblings, inheritance, housing, money
  Anton请楼下的Elisabeth Bauer 2白天来照看Josefine Hofer，先付一周六克朗工钱，讲好每天另管两顿饭，煤钱也从这六克里出。Elisabeth Bauer 2上午换床单，下午喂药，临走把便盆提到楼道口。Anton下工回来先摸煤箱，再在练习本上记下当天的饭钱和煤钱，看见Josefine Hofer的嘴唇不再干裂。
  _effects: cash -6 (支付邻居照看工钱和煤钱（其中5.6克朗记入债务）); food; relation acquaintance with person-materialized-world-vienna-1912-17; health 0.04000000000000001 (白天有人按时喂药和换洗); relation acquaintance with person-materialized-world-vienna-1912-17_

- **1931.09** `vienna-tenement-neighbors.laundry_line_dispute/compromise_split_line` tags: home, social, family, housing
  Anton把洗好的床单搭上院子里的公用晾衣绳，占了整条。Anna Moser抱着一盆湿衣服下来，说自家孩子明天要穿干净衬衫上学。两人在绳子两头扯了一阵，最后Anton把床单对折，腾出一半，Anna Moser用木夹子把衬衫一件件排上去。谁也没道歉，但第二天见面都点了头。
  _effects: relation acquaintance with person-anna-moser; mood 0.01999999999999999_

- **1931.10** `p9-gap-adult-solitude.leaking-shoe/leaking-shoe.belt-patch` tags: adulthood, daily, solitude, ordinary, home, repair, shoe, poverty
  Anton拆下一条旧皮带的头，蒙在鞋底破口上，用钉子一点点敲进去。第三下时锥子扎透鞋面，扎进左手拇指根，血滴在鞋帮上。她用围裙擦了擦，还是把皮子钉完了，第二天走路时鞋底有块硬响。
  _effects: mood -0.03_

- **1932.01** `vienna-family-divorce/reconcile-for-now` tags: family, marriage, divorce, housing, lifecycle, partnership
  Anton和Mitzi Winter在楼道里吵到半夜，最后因为下个月的房租又坐回同一张桌。谁都没有提和好，只把账本重新摊开；Mitzi Winter把煤钱推过来，Anton接过去数了两遍，手指碰到一起又分开，屋里的灯亮到很晚。
  _effects: relation partner with person-materialized-world-vienna-1912-3; mood -0.03_

- **1932.01** `task-vienna-family-care.ask-relative-money/loan-with-schedule` tags: family, care, courtship, siblings, inheritance, housing, task, task:family
  Mitzi Winter听Anton把房租和药费的数目报完，从抽屉里数出二十克朗，推到桌上，同时拿出一张纸，要写还款日期。他说每月十五号来一趟，把账报一遍。Anton签字时手有点抖，把纸角压得很平，说好先从月底还三克朗。
  _effects: cash 20 (舅舅借出的钱); relation kin with person-materialized-world-vienna-1912-3; flag +owes_uncle_

- **1932.01** `vienna-historical-social-movement.district-list/organize-relief-table` tags: history, historical_process, social_movement, organization, politics
  Elisabeth Bauer 2从围裙里掏出几张揉皱的收据，Anton把它们按日期排开。屋外有人上楼，脚步在门口停了一下又走了。Anton把新表折成四折塞进衣袋，说先管这条街，别的明天再说。
  _effects: skill; relation acquaintance with person-materialized-world-vienna-1912-17; mood 0.03_

- **1932.02** `vienna-courtship-courtyard.breakup/keys-and-photo-returned` tags: adulthood, courtship, partner, social, family, separation
  院子里晾着三条床单，风一过就拍到人脸上。Anton把备用钥匙和一张照相馆拍的合影交还，Mitzi Winter把那件借来的外套叠好递回。两人说好各找各的住处，谁都没有提高声音；分手分得干净，可两个人心里都空了一块。
  _effects: relation_end partner with person-materialized-world-vienna-1912-3; mood -0.09; flag +courtship_ended_cleanly_

- **1932.04** `vienna-housing-move.rent-notice/rent-notice-pay` tags: housing, home, rent, family, money
  Anton把通知念给Friedrich Hofer听，Friedrich Hofer摇头说是楼梯间那几块新玻璃的账。Anton去楼下杂货铺换开一张五克朗的纸币，回屋一枚一枚摆开数，煤箱底多留了二十赫勒。
  _effects: cash -2 (按月多付两克朗房租（其中2克朗记入债务）); mood -0.03_

- **1932.12** `p9-gap-adult-solitude.remake-coat/remake-coat.left-on-chair` tags: adulthood, daily, solitude, ordinary, home, mending, clothing, household
  Anton只把外套的里衬拆了一半，就搁在椅背上。冬天天短，她每天回来都看见那件敞着口子的外套，想着明天接着弄，明天又总是有别的事。到开春外套还搭在那儿，呢面上落了一层灰。
  _effects: mood -0.03; flag +unfinished_coat_

- **1933.01** `p9-social-relationship-initiative.borrow-handcart/handcart-and-ten` tags: courtship, friendship, family, social, initiative, housing, task, task:social
  星期天搬家的前一晚，有人坐在印厂友人家的厨房里把事说全：车要借，十克朗也要借。对方合上账本，从抽屉里数出两张五克朗，说月底先还三克朗，剩下的按月摊。手推车的轮轴有点响，搬之前得先上油。
  _effects: cash 10 (友人借给搬家应急的十克朗); relation friend with person-materialized-world-vienna-1912-32; mood 0.04999999999999999; relation acquaintance with person-materialized-world-vienna-1912-65_

- **1933.05** `r2-rural.well-contamination::ctx-vienna-authoritarian-1934::milieu-tenement/sealed-the-well` tags: rural, water, health, neighbor, institution, vienna, urban, crisis
  Anton打上来的第三桶水有股土腥味，桶底沉着几根细毛。Luise Kral 2探头看了一眼，说井壁塌了，老鼠掉进去了。两人把水倒进沟里，用石灰封了井口，整个院子傍晚都在借水。
  _effects: cash -2 (井里的死老鼠); flag +sealed_contaminated_well; relation colleague with person-materialized-world-vienna-1912-33; relation acquaintance with person-materialized-world-vienna-1912-33; relation acquaintance with person-materialized-world-vienna-1912-68_

- **1933.06** `p9-social-family-conflict-care.sick-parent-night/shifts-with-sibling` tags: family, care, siblings, inheritance, housing, money
  Anton和Hedwig把值班时辰写在门后的粉笔板上：Hedwig守前半夜，Anton守后半夜，医生说静养二十一天。煤油灯芯拧小，药粉分成小包摆在床头，便盆换水时尽量不碰出响。二十一天熬下来，Anton的眼皮肿了，走路发飘，但Friedrich Hofer每次起身总有人扶。
  _effects: relation kin with person-phase15-Hedwig-world-vienna-1912; flag +night_care_duty_

- **1933.07** `p9-gap-adult-solitude.window-argument/window-argument.peek` tags: adulthood, daily, solitude, ordinary, home, neighbor, overheard
  Anton下楼倒水，在楼梯口看见院子里站着一对夫妻，男人的围裙上还沾着面粉，女的攥着一张工钱条。她没插话，提着壶又上楼，关门时听见那女人说“一星期八克朗怎么够”。
  _effects: mood -0.030000000000000027; skill_

- **1933.10** `vienna-tenement-neighbors.lost_room_key/key_stolen_by_stranger` tags: home, social, family, housing
  Anton记得出门时钥匙还在，回来却没了。Josef说下午看见一个穿灰外套的男人在楼道里转悠，手里晃着一把铜钥匙。两人下楼查看，房门虚掩，抽屉被拉开，攒着买煤的六克朗不见了。Josef陪着Anton去街角警察岗亭报了案，警察记下灰外套，说会留意。
  _effects: cash -6 (被盗的买煤钱); relation friend with person-phase15-Josef-world-vienna-1912; mood -0.10000000000000003_

- **1934.01** `r13-civ.new-district-lodging::ctx-vienna-authoritarian-1934::milieu-tenement/room-rented` tags: social, housing, lodging, landlady, district, vienna, urban, crisis
  Rosa Winter把招租纸从门上揭下来，领Anton看了后间。屋里只有一张铁床和一只裂了口的洗手盆，窗户对着天井。Anton付了六克朗，Rosa Winter把钥匙从围裙里解下来，说晚上十点关大门。
  _effects: cash -6 (新城区门牌下的招租纸（其中3.3克朗记入债务）); flag +lodging_secured_in_new_district; relation acquaintance with person-materialized-world-vienna-1912-4; knowledge “the front door is locked at ten every night”; relation acquaintance with person-materialized-world-vienna-1912-66_

- **1934.03** `r1-hc.funeral::ctx-vienna-authoritarian-1934::milieu-tenement::funeral-war-mass-grave/funeral-war-private-casket` tags: death, funeral, grief, debt, institution, vienna, urban, crisis
  Anton花光了积蓄，从战场运回一口薄棺。棺材到站时角上磕掉一块漆，Anton Kral说路上难免；开棺看了一眼，Anton就让盖上，再没有打开过。
  _effects: cash -24 (棺材铺的尺寸量错了（其中22克朗记入债务）); mood -0.29999999999999993; condition; flag +paid_to_bring_a_body_home; role; relation acquaintance with person-materialized-world-vienna-1912-7; knowledge “the coffin arrived with a corner of paint knocked off”; relation acquaintance with person-materialized-world-vienna-1912-78; relation acquaintance with person-materialized-world-vienna-1912-29_

- **1934.04** `vienna-market-household.soup-kitchen/soup-kitchen.sell` tags: home, market, food, social
  鞋匠敲后门问有没有热汤，Anton把剩下的半锅倒进他的罐子里，收下两个十字币。Katharina Bauer 2提着空碗上来时，只看见Anton把硬币塞进围裙口袋。
  _effects: cash 2 (卖出半锅扁豆汤); relation acquaintance with person-materialized-world-vienna-1912-32_

- **1934.06** `major-crisis.rent-increase/tenant-meeting` tags: crisis, housing, rent, eviction, family, poverty
  巷口洗衣房的老板娘把几张椅子摆开，叫来半条街的租户。Anton把涨租单摊在桌上，逐条念出上面的数字；Maria Winter站在门边，既没走，也没替房东说话。大家决定先集体迟交一个月，签名纸传到Anton手里时，纸上已经有一块油渍。
  _effects: cash -2 (paper, ink and tram fare for the tenants meeting); role; flag +rent_strike; relation acquaintance with person:evt:world-vienna-1912:000549:child; reputation 0.03_

- **1934.09** `bc18-enemy.accidental-help::ctx-vienna-authoritarian-1934::milieu-tenement/letter-printed-as-praise` tags: enemy, mistake, work, reputation, absurd, luck, social, vienna
  Elisabeth Moser 2写了一封告状信，列数Anton的懒惰、贪婪和“可疑的出身”，却把信封上的地址写成了报社。Katharina Hofer以为这是一篇自荐小品，删掉几处脏话登了出来；读者喜欢这种不留情面的自嘲，两个商行给Anton寄来聘书。Elisabeth Moser 2在咖啡馆看见报纸，差点把杯子捏碎。
  _effects: cash 4 (商行聘书的预付薪金); reputation 0.05; state_add bc18-ridiculous-fame state:world-vienna-1912:207; relation rival with person-materialized-world-vienna-1912-49; relation acquaintance with person-materialized-world-vienna-1912-38; condition; flag +enemys_letter_became_an_advert; mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-38; flag +ridiculously_famous; reputation 0.020000000000000004; mood 0.020000000000000018_

- **1935.01** `state_tick:bc18-ridiculous-fame/ridiculous-fame-year/the-audience-gets-bored` tags: bc18-ridiculous-fame, fame, reputation, mistaken_identity, promotion, media, absurd, public
  观众开始厌倦同一个故事。园艺会请了更年轻的发明家，女子学校把Anton的名字从海报上撤下；Anton在咖啡馆听见有人说“那个人还在讲火柴”。同一个月，一张报纸把旧照片配上新标题，问Anton是否已经“过气”。纠正的冲动又回来，但没有人再提问。
  _effects: state_parameter bc18-ridiculous-fame.legitimacy 10 -> 2; state_parameter bc18-ridiculous-fame.boredom 4 -> 16; state_parameter bc18-ridiculous-fame.invitations 2 -> 1; reputation -0.02; mood -0.02999999999999997_

- **1935.01** `r13-fam.move-in-with-relatives::ctx-vienna-authoritarian-1934::milieu-tenement/refused-at-door` tags: task, family, housing, relative, doubling_up, poverty, vienna, urban
  Hedwig站在门口，说自家也添了人口，前屋已经住满。Anton把箱子又搬回车上，Hedwig追出来塞了一袋土豆，说不是不帮，是实在挤不下。车走远时，Anton回头看见Hedwig还站在门口，围裙上沾着面粉。
  _effects: food; mood -0.14; condition; flag +refused_by_relatives; relation kin with person-phase15-Hedwig-world-vienna-1912_

- **1935.05** `r1-hc.cholera-cordon::ctx-vienna-authoritarian-1934::milieu-tenement::cholera-war-troop-train/cholera-war-cordon-tight` tags: health, epidemic, cholera, quarantine, neighbor, vienna, urban, crisis
  防疫队把整条巷子围了，门口架起木板，只留一个递东西的窗口。Anton隔着窗口接过一包石灰，Katharina Bauer 2在隔壁窗口问，什么时候能出去；没有人回答，木板后面只有靴子走动的声音。
  _effects: cash -6 (院子门口的石灰线（其中4.2克朗记入债务）); condition; flag +military_cholera_cordon; role; relation acquaintance with person-materialized-world-vienna-1912-32; knowledge “the epidemic squad answers no questions through the board”_

- **1935.08** `vienna-illness-household.mother-falls/stay-home-care` tags: health, family, home
  屋里只有一张床，Anton把椅子拼在床边守了三夜，给Josefine Hofer敷药换布。请假扣的工钱让人心疼，但腿伤见好；第四天早上，Josefine Hofer自己端起了粥碗。
  _effects: cash -4 (请假三天损失的工钱); health 0.1 (在家照护后腿肿消退); relation kin with person-josefine-hofer_

- **1935.11** `vienna-medical-treatment.toothache/barber-pull` tags: health, medical, family, money
  Alois Kral在门口替Anton捏着帽子，听见里面一声闷哼。弗朗茨把牙扔进搪瓷盘，说瞧这牙根都黑了。收钱时他多要了二十赫勒，算明矾水的钱，说下次别再拖成这样。
  _effects: cash -1.2 (理发师拔牙收费); health 0.03 (病牙被拔除但手法粗糙); mood -0.020000000000000018_

- **1936.01** `bc18-fame.merchandise::ctx-vienna-authoritarian-1934::milieu-tenement/late-contract` tags: fame, merchandise, business, absurd, legal, public, reputation, vienna
  合同在假胡子卖到第三个月时才送到。Anton Kral把七克朗和一张授权书并排放在桌上，说再晚一周，厂里就打算换一张脸。Anton签了字，又要求加一条：每卖出一打，给孤儿院捐十赫勒。Rosa Huber答应了，因为这条款可以登在包装纸上。
  _effects: cash 7 (迟到的肖像授权费); state_parameter bc18-ridiculous-fame.legitimacy 2 -> 7; relation acquaintance with person-materialized-world-vienna-1912-7; relation acquaintance with person-materialized-world-vienna-1912-79; flag +late_moustache_contract; mood 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-79_

- **1936.01** `state_tick:bc18-ridiculous-fame/ridiculous-fame-year/the-audience-gets-bored` tags: bc18-ridiculous-fame, fame, reputation, mistaken_identity, promotion, media, absurd, public
  观众开始厌倦同一个故事。园艺会请了更年轻的发明家，女子学校把Anton的名字从海报上撤下；Anton在咖啡馆听见有人说“那个人还在讲火柴”。同一个月，一张报纸把旧照片配上新标题，问Anton是否已经“过气”。纠正的冲动又回来，但没有人再提问。
  _effects: state_parameter bc18-ridiculous-fame.legitimacy 7 -> 0; state_parameter bc18-ridiculous-fame.boredom 16 -> 28; state_parameter bc18-ridiculous-fame.invitations 1 -> 0; reputation -0.02; mood -0.030000000000000027_

- **1936.01** `r13-work.collect-debt::ctx-vienna-authoritarian-1934::milieu-tenement/took-goods-instead` tags: commerce, debt, collection, neighbor, conflict, vienna, urban, crisis
  Anton Kral说没有现钱，指了指墙角的缝纫机。Anton和Katharina Bauer 2把机器抬上板车，Anton Kral的妻子站在楼梯口，手里还攥着没做完的活。机器折了四克朗，剩下的六克朗算清；下楼时Anton听见门在背后关上，插销落得很重。
  _effects: cash 4 (门口的三次敲门); food; flag +work13_took_goods_for_debt; relation rival with person-materialized-world-vienna-1912-7_

- **1936.01** `p9-history-medical-daily.clinic-queue/quarrel-with-clerk` tags: health, medical, public_health, family, pharmacy, sanitation, daily
  Anton和门房为号码顺序争起来，被推到街边，帽子滚进水沟。傍晚回来时窗口已经关了，长椅上空空荡荡，只剩一张踩脏的挂号单；Anton在湿冷街头耗了一天，咳嗽更深，诊所门口的人也都记住了这张吵红的脸。
  _effects: mood -0.06000000000000005; reputation -0.02_

- **1936.05** `ad20-lucky-coincidence::ctx-vienna-authoritarian-1934::milieu-tenement/the-coin-on-the-track` tags: luck, coincidence, everyday, money, superstition, debt, vienna, urban
  电车刚过去，轨道边躺着一枚硬币，被车轮压得有点弯。Anton把它捡起来，发现还能花。那天下午，Anton用这枚硬币买了一小块肥皂，剩下的钱又放回口袋，像放回一个没有用完的运气。
  _effects: cash 2 (a coin found by the tram tracks); mood 0.030000000000000027; flag +lucky_coin; knowledge “电车刚过去，轨道边躺着一枚被压弯的硬币。”_

- **1937.01** `vienna-family-same-sex-male/private-arrangement` tags: family, intimacy, same_sex, persecution, lifecycle, partnership
  Anton和Franz Moser在城边租了一间小屋，对外只说是同事合住。房租四克朗，两人不同时出门，信件用假名，夜里把窗帘拉严；Franz Moser在门后放了一根木棍，Anton把两人的工票分开放，连咳嗽都压着声。
  _effects: relation partner with person:evt:world-vienna-1912:001031:child; mood 0.040000000000000036; cash -4 (separate room rent（其中4克朗记入债务）)_

- **1937.01** `r15-fam.school-registration::ctx-vienna-authoritarian-1934::milieu-tenement/enrolls` tags: family, child, school, education, school_child, vienna, urban, crisis
  Anton带着Berta Bauer去学校登记。孩子的名字被写在名册最后一行，墨水还没有干；回家的路上，Berta Bauer一直捏着那张课程表，Anton则在算这个月还能剩下多少煤钱。
  _effects: state_parameter raising-child.caregiverBurden 45 -> 45; state_parameter raising-child.schoolProgress 20 -> 20; state_parameter raising-child.childConfidence 55 -> 55; state_parameter raising-child.careDebt 0 -> 0; state_parameter raising-child.schoolEnrolled true -> true; state_parameter raising-child.leftHome false -> false; cash -1 (the first school books and a slate（其中1克朗记入债务）); mood 0.030000000000000027_

- **1937.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton被叫到学校，老师说Helene Bauer这学期总在课上看窗外。回家的路上，Anton没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 15 -> 10; state_parameter raising-child.caregiverBurden 50 -> 55; cash -2 (extra lessons and replacement pencils（其中2克朗记入债务）); mood -0.030000000000000027_

- **1937.01** `state_expire:bc18-ridiculous-fame` tags: bc18-ridiculous-fame, fame, reputation, mistaken_identity, promotion, media, absurd, public
  Anton的「荒唐的名声」到期；相关安排结束。
  _effects: state_remove bc18-ridiculous-fame state:world-vienna-1912:207; flag -ridiculously_famous_

- **1937.01** `r13-civ.public-health-campaign::ctx-vienna-authoritarian-1934::milieu-tenement/crowd-tears-notices` tags: health, public_health, campaign, poster, institution, vienna, urban, crisis
  Anton刚把告示刷上墙，就有人围过来说这是拿疫病吓人。一个卖菜的女人伸手把纸撕下来，浆糊蹭了Anton一脸。Otto Weiss把Anton拉到一边，说这条街上个月才埋了两个孩子。
  _effects: reputation -0.029999999999999995; flag +public_health_notice_torn_down; relation rival with person-materialized-world-vienna-1912-29; knowledge “the market crowd blames the notice for frightening customers”_

- **1937.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Berta Bauer这周主动擦了黑板。Anton把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 20 -> 23; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:006474_

- **1937.04** `vienna-medical-treatment.toothache/dentist-pull` tags: health, medical, family, money
  诊室在二楼，楼梯间飘着石炭酸味。医生把钳子举到灯下看了看，叫Anton攥紧扶手。Karl Kraus站在门边数墙上的价目表：拔牙两克朗五十赫勒，药棉五十赫勒，连消炎水另算。
  _effects: cash -3 (牙医拔牙费用（其中3克朗记入债务）); health 0.05999999999999999 (拔除病牙解除疼痛); mood -0.030000000000000027_

- **1937.12** `vienna-tenement-neighbors.lost_room_key/key_stolen_by_stranger` tags: home, social, family, housing
  Anton记得出门时钥匙还在，回来却没了。Gustav Weiss说下午看见一个穿灰外套的男人在楼道里转悠，手里晃着一把铜钥匙。两人下楼查看，房门虚掩，抽屉被拉开，攒着买煤的六克朗不见了。Gustav Weiss陪着Anton去街角警察岗亭报了案，警察记下灰外套，说会留意。
  _effects: cash -6 (被盗的买煤钱（其中6克朗记入债务）); mood -0.09999999999999998_

- **1938.01** `vienna-life-anschluss-1938/complies` tags: politics, persecution, 1938
  Katharina Hofer 2在街口设了登记桌，要求住户交出姓名、职业和宗教。Anton排队填了表，回家把门牌擦干净。楼里有人连夜搬走，也有人站在阳台上挥手。
  _effects: role; cash -3 (new permits and stamps（其中3克朗记入债务）); condition; relation acquaintance with person-materialized-world-vienna-1912-45_

- **1938.01** `hs18-occupation.piano::ctx-vienna-authoritarian-1934::milieu-tenement/sign-the-receipt` tags: occupation, piano, requisition, witness, neighbor, history, vienna, urban
  两名工人把Emil Weiss家的钢琴抬上卡车，琴腿在门框上磕掉一块漆。Elisabeth Berg把一张纸塞给Anton，说只要签“屋内无人认领”，就不必再搬第二趟。Anton签了名，看见Emil Weiss站在对面窗帘后，手一直按在玻璃上。
  _effects: state_add hs18-street-witness state:world-vienna-1912:338; knowledge “签字比争辩更快，也比争辩更难忘。”; flag +signed_abandoned_piano_receipt; mood -0.040000000000000036; relation acquaintance with person-materialized-world-vienna-1912-99_

- **1938.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton把Berta Bauer的旧课本包上书皮，又在本子上签了名。Berta Bauer今年学会了自己系鞋带，也学会了在饭桌上说“不”；Anton听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 23 -> 31; state_parameter raising-child.caregiverBurden 45 -> 42; mood 0.020000000000000018_

- **1938.01** `kernel-health.task-tuberculosis-cure::ctx-vienna-authoritarian-1934::milieu-tenement::tb-cure-war-requisition/tb-war-school-ward` tags: health, task, tuberculosis, sanatorium, cure, vienna, urban, crisis
  军队征用了疗养院，Anton被塞进一间改作病房的学校教室。床挨着床，夜里有人咳到天亮；护士只够发退烧药，剩下的靠病人自己。熄灯后有人低声报自己的团号，没人回应。教室的黑板上还留着半道算术题。
  _effects: move place-wien-allgemeines-krankenhaus; cash -8 (improvised ward fees and travel（其中8克朗记入债务）); health -0.05999999999999999 (cross-infection in an overcrowded makeshift ward); condition; role; knowledge “疗养院被征用后，病床摆进学校教室，床挨着床，夜里有人咳到天亮。”; relation acquaintance with person-materialized-world-vienna-1912-80_

- **1938.02** `p9-social-family-conflict-care.sibling-medicine-bill/advance-with-room-claim` tags: family, care, siblings, inheritance, housing, money
  Anton把十四克朗的整张票子压在药费单上，说这钱不用还，只要求母亲那间朝院子的屋子以后归自己照看，钥匙也归自己管。Lena的咖啡杯在桌上顿了一下，说照看可以，房契上的名字另说；药费单总算从糖罐底下抽了出来，兄妹之间却多了一层账。
  _effects: cash -14 (先垫付母亲全部药费（其中14克朗记入债务）); relation kin with person-phase15-Lena-world-vienna-1912; flag +claims_mother_room_

- **1938.12** `vienna-illness-household.mother-falls/hire-care` tags: health, family, home
  Anton托人请了巷尾的看护妇，每天来两回给Josefine Hofer擦洗换药，六克朗花得清清楚楚。看护费不便宜，Anton晚上多接了一份缝补的活，手指被针扎了几回；Josefine Hofer的腿伤有人料理，Anton却连着几夜睡不够。
  _effects: cash -6 (支付看护妇费用（其中6克朗记入债务）); health 0.08 (看护妇料理后伤势好转)_

- **1939.01** `vienna-life-injury-recovery/home-care` tags: health, work, family
  Anton没有去诊所，只用热水和旧布洗了伤口。第二天伤口周围发红，家里人把仅剩的干净床单撕成条。
  _effects: cash -2 (clean cloth（其中2克朗记入债务）); condition_
  _causes: evt:world-vienna-1912:006953_

- **1939.01** `hist15-occ.seed-occupation::ctx-vienna-authoritarian-1934::milieu-hospital/the-flag-changes` tags: occupation, war, curfew, history, place, institution, vienna, urban
  城门口的旗换了颜色，岗哨开始检查每一张纸。Anton回家时发现街角新钉了一块告示牌：天黑以后不许出门，地窖里的粮食要登记。晚上，巡逻队的靴声从窗下经过，比钟声还准。
  _effects: state_add occupied-city-regime state:world-vienna-1912:381; mood -0.05999999999999994; flag +saw_the_occupation_flag_

- **1939.01** `p22-child-matchmaker::ctx-vienna-authoritarian-1934::milieu-hospital/the-album-is-shown-at-school` tags: child, matchmaker, family_album, enemy, warm, ironic, reconciliation, scandal
  孩子把相册带到学校，指着照片说Emil Weiss是家里的亲戚。老师把这件事告诉了街坊，街坊又在菜市场讲了一遍；到下午，Anton已经听见三个版本，其中一个说Emil Weiss要来分房子。孩子回家时，书包里多了一张同学画的“全家福”。他把那张全家福夹进课本，没有还给同学。
  _effects: state_add public-scandal state:world-vienna-1912:382; state_add p22-scandal-engine state:world-vienna-1912:383; reputation -0.03; flag +album_shown_at_school; mood -0.030000000000000027; flag +scandal_engine_active_

- **1939.01** `state_reaction:p22-scandal-engine/a-new-scandal-feeds-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Anton的新故事登出来时，旧的那一页也被重新翻到桌面上。Anton发现两件事共用同一个证人，而那个证人上周还来借过盐。
  _effects: state_parameter p22-scandal-engine.heat 40 -> 46; state_parameter p22-scandal-engine.reach 45 -> 49; state_parameter p22-scandal-engine.shame 35 -> 38; state_parameter p22-scandal-engine.leverage 20 -> 22; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:007217_

- **1939.01** `state_reaction:occupied-city-regime/requisition-echo` tags: occupied-city-regime, occupation, war, repression, curfew, requisition, shortage, place
  征用队又来了，这次没有清单，只把厨房里腌着的一罐卷心菜搬走。Anton没有争辩，因为上个月争辩的人家到现在还没拿回门板。
  _effects: mood -0.030000000000000027_
  _causes: evt:world-vienna-1912:007305_

- **1939.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton被叫到学校，老师说Alois Bauer这学期总在课上看窗外。回家的路上，Anton没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 23 -> 18; state_parameter raising-child.caregiverBurden 47 -> 52; cash -2 (extra lessons and replacement pencils（其中2克朗记入债务）); mood -0.030000000000000027_

- **1939.01** `state_tick:hs18-street-witness/memory-drift/blurs` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Anton忽然想不起那个人先迈的是左脚还是右脚。邻居说自己记得清清楚楚，还补了一个细节；Anton听着，竟分不清那是自己看见的，还是后来听来的。
  _effects: state_parameter hs18-street-witness.certainty 85 -> 77; mood -0.020000000000000018_

- **1939.01** `r13-civ.clinic-first-visit::ctx-vienna-authoritarian-1934::milieu-hospital/dismissed-as-nerves` tags: health, clinic, queue, diagnosis, institution, vienna, urban, crisis
  Anton把夜里咳醒的次数写在一张包装纸上，Alois Kral扫了一眼，说是心事太重，给了几包安神粉。走廊尽头的护士压低声音，说住院部还有空床，但要医生签字。Anton把包装纸折回去，没再问。
  _effects: cash -1 (诊所走廊的第三张长凳（其中1克朗记入债务）); mood -0.07999999999999996; flag +clinic_dismissed_as_nerves; knowledge “the clinic doctor refused a hospital referral”_

- **1939.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Berta Bauer这周主动擦了黑板。Anton把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 31 -> 34; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:007501_

- **1939.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Alois Bauer这周主动擦了黑板。Anton把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 18 -> 21; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:007501_

- **1939.06** `hist15-occ.work-permit::ctx-vienna-authoritarian-1934::milieu-hospital/permit-granted` tags: occupation, work, permit, institution, shortage, history, vienna, urban
  Rosa Lechner 2在通行证上盖了章，又用铅笔在角落写了一个日期。Anton拿到许可，可以去城西的修配厂上工；走出劳动局时，Anton把证件摸了三遍，确认它还在口袋里。
  _effects: cash -2 (通行证手续费（其中2克朗记入债务）); role; flag +work_permit_granted; knowledge “城西修配厂只认盖蓝章的通行证。”; relation acquaintance with person-materialized-world-vienna-1912-103_

- **1939.09** `pl19-bridge.public-rumor::ctx-vienna-authoritarian-1934::milieu-hospital/the-list-writes-itself` tags: scandal, protection, network, press, media, rumor, bridge, vienna
  Anton在报纸上看见自己的名字和一张旧照片，报纸像一盏关不掉的灯。Emil Weiss提议找几个人替Anton挡电话、挡记者、挡亲戚；Anton说不用，第二天却发现Emil Weiss已经把名单写好了，最上面一行是Anton自己。
  _effects: state_add pl19-protected-scandal state:world-vienna-1912:430; relation friend with person-emil-weiss; reputation -0.01999999999999999; flag +list_written_itself; knowledge “名单最上面一行是当事人的名字。”; flag +protected_scandal_active_

- **1939.09** `state_reaction:pl19-protected-scandal/a-public-question` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  有人在一场公开活动里问起Anton的“私人安排”，语气客气，问题却像一根针。Anton笑着答了别的事，回家后才发现手心全是汗。
  _effects: state_parameter pl19-protected-scandal.publicHeat 55 -> 67; state_parameter pl19-protected-scandal.protection 40 -> 34; reputation -0.03_
  _causes: evt:world-vienna-1912:007752_

- **1939.12** `vienna-medical-treatment.toothache/dentist-pull` tags: health, medical, family, money
  诊室在二楼，楼梯间飘着石炭酸味。医生把钳子举到灯下看了看，叫Anton攥紧扶手。Emil Weiss站在门边数墙上的价目表：拔牙两克朗五十赫勒，药棉五十赫勒，连消炎水另算。
  _effects: cash -3 (牙医拔牙费用（其中3克朗记入债务）); health 0.05999999999999999 (拔除病牙解除疼痛); mood -0.030000000000000027_

- **1940.01** `p22-dead-voice-child::ctx-vienna-authoritarian-1934::milieu-hospital/the-neighbor-calls-it-a-seance` tags: child, dead_relative, voice, eerie, dark, grief, family_secret, scandal
  Emil Weiss把这件事传遍了整条街，说Anton家请了招魂师。区里的人上门问话，孩子却躲在桌子底下不肯出来；Anton在门口解释了半天，最后只说了一句“她只是想奶奶了”。第二天，窗台上被人放了一小袋盐和一张驱邪的纸条。他把盐袋放在窗台，孩子从桌下伸出手把它推开了。
  _effects: state_add public-scandal state:world-vienna-1912:428; state_add p22-scandal-engine state:world-vienna-1912:429; relation rival with person-emil-weiss; reputation -0.03; flag +seance_rumour; mood -0.030000000000000027; flag -scandal_engine_active; flag +scandal_engine_active_

- **1940.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton把Helene Bauer的旧课本包上书皮，又在本子上签了名。Helene Bauer今年学会了自己系鞋带，也学会了在饭桌上说“不”；Anton听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 10 -> 18; state_parameter raising-child.caregiverBurden 55 -> 52; mood 0.020000000000000018_

- **1940.01** `state_tick:hs18-street-witness/memory-drift/blurs` tags: hs18-street-witness, witness, memory, history, testimony, rumor, risk, street
  Anton忽然想不起那个人先迈的是左脚还是右脚。邻居说自己记得清清楚楚，还补了一个细节；Anton听着，竟分不清那是自己看见的，还是后来听来的。
  _effects: state_parameter hs18-street-witness.certainty 77 -> 69; mood -0.020000000000000018_

- **1940.01** `state_tick:pl19-protected-scandal/the-network-meets/someone-wants-a-favor` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  有人替Anton挡了一次采访，随后在走廊里提起自己儿子的学徒期满。Anton知道这不是闲聊；当天晚上，那张写着名字的纸条被压在糖罐下面，像一枚没有付清的硬币。
  _effects: state_parameter pl19-protected-scandal.leverage 10 -> 22; state_parameter pl19-protected-scandal.protection 34 -> 30; state_parameter pl19-protected-scandal.exposure 60 -> 65; mood -0.009999999999999898_

- **1940.01** `p9-work-jobsearch.relative-introduction/relative-introduction.never-mentions` tags: work, job_search, negotiation, wages, employment, task, relative, introduction
  点心纸包搁在膝上，Emil Weiss说熟人多，慢慢问，别急。Anton回家把这些话学给母亲听，母亲只叹了口气。那包糖后来自己家里分着吃了。
  _effects: relation kin with person-emil-weiss; cash -1 (再买一包糖上门（其中1克朗记入债务）)_

- **1940.05** `ad20-rent-renewal::ctx-vienna-authoritarian-1934::milieu-hospital/sign-the-side-letter` tags: rent, housing, renewal, everyday, obligation, money, vienna, urban
  Emil Weiss把正式租约放在桌上，又从口袋里摸出一张对折的纸，说这是“补充条款”。Anton看见上面写着若提前搬走，押金不退。Emil Weiss说大家都这么签；Anton看了看窗外的院子，还是把名字写在最后一行。
  _effects: state_add ad20-private-bargain state:world-vienna-1912:482; cash -1 (the renewal fee（其中1克朗记入债务）); flag +side_letter_signed; knowledge “补充条款写着提前搬走不退押金。”; flag +private_bargain_active_

- **1940.08** `vienna-medical-treatment.sanatorium/home-rest` tags: health, medical, family, money
  炉子封小了，屋里凉得快，Anton把大衣盖在被子上。安娜收碗时看见窗台上一排药瓶，没说什么，第二天多带了半块黑面包。楼下的管道工敲了一下午铁皮，咳嗽声混在里面听不真切。
  _effects: health 0.03 (在家休养但条件有限); food; cash -0.5 (房东要求的清洁费（其中0.5克朗记入债务）); relation friend with person-emil-weiss_

- **1940.09** `state_reaction:p22-scandal-engine/a-new-scandal-feeds-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Anton的新故事登出来时，旧的那一页也被重新翻到桌面上。Anton发现两件事共用同一个证人，而那个证人上周还来借过盐。
  _effects: state_parameter p22-scandal-engine.heat 55 -> 61; state_parameter p22-scandal-engine.reach 45 -> 49; state_parameter p22-scandal-engine.shame 55 -> 58; state_parameter p22-scandal-engine.leverage 20 -> 22_
  _causes: evt:world-vienna-1912:008350_

- **1940.10** `r3-war.shell-shock::ctx-vienna-authoritarian-1934::milieu-hospital/diagnosed-shell-shock` tags: war, army, shell_shock, medicine, pension, vienna, urban, crisis
  炮击停了半天，Anton还是听见哨声。Mitzi Moser 2让Anton跟着他的手指看，Anton看到第三根时，忽然把桌上的器械全扫到地上。Elisabeth Bauer 2说这是装的，Mitzi Moser 2把病历合上，说“你先出去”。
  _effects: condition; flag +diagnosed_with_shell_shock; knowledge “the doctor wrote shell shock, not cowardice”; relation acquaintance with person-materialized-world-vienna-1912-30_

- **1941.01** `statistical_infection`
  Anton在Allgemeines Krankenhaus病倒了，肺炎让身体发热、虚弱，接下来的日子只能卧床。

- **1941.01** `hs18-occupation.piano::ctx-vienna-authoritarian-1934::milieu-hospital/sign-the-receipt` tags: occupation, piano, requisition, witness, neighbor, history, vienna, urban
  两名工人把Berta Moser家的钢琴抬上卡车，琴腿在门框上磕掉一块漆。Friedrich Kral把一张纸塞给Anton，说只要签“屋内无人认领”，就不必再搬第二趟。Anton签了名，看见Berta Moser站在对面窗帘后，手一直按在玻璃上。
  _effects: state_add hs18-street-witness state:world-vienna-1912:481; relation acquaintance with person:evt:world-vienna-1912:000729:child; knowledge “签字比争辩更快，也比争辩更难忘。”_

- **1941.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Anton把Berta Bauer的旧课本包上书皮，又在本子上签了名。Berta Bauer今年学会了自己系鞋带，也学会了在饭桌上说“不”；Anton听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 34 -> 42; state_parameter raising-child.caregiverBurden 42 -> 39; mood 0.020000000000000018_

- **1941.01** `state_tick:p22-scandal-engine/the-rumor-learns-new-words/the-story-gets-a-new-witness` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  又过了一年，流言没有熄，却学会了新的说法。Anton在咖啡馆里听见自己的故事被讲成三个版本，每个版本都比上一个多一个证人；没有人来追问，也没有人真正忘记。
  _effects: state_parameter p22-scandal-engine.heat 61 -> 58; state_parameter p22-scandal-engine.reach 49 -> 53; state_parameter p22-scandal-engine.leverage 22 -> 25; state_parameter p22-scandal-engine.shame 58 -> 60; mood 0.010000000000000009_

- **1941.01** `state_tick:pl19-protected-scandal/the-network-meets/a-member-sells-a-piece` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  照片没有登报，却出现在一封没有署名的信里。Anton认出拍照的角度：只有站在后楼梯第二级的人才拍得到。第二天，那个位置换了一把新锁，钥匙却少了一把。
  _effects: state_parameter pl19-protected-scandal.exposure 65 -> 83; state_parameter pl19-protected-scandal.publicHeat 67 -> 77; state_parameter pl19-protected-scandal.protection 30 -> 20; reputation -0.04000000000000001; knowledge “后楼梯第二级是唯一能拍到那张照片的位置，而钥匙少了一把。”_

- **1941.01** `state_tick:ad20-private-bargain/the-favor-ages/called-in` tags: ad20-private-bargain, private, bargain, favor, debt, trust, leverage, exit
  对方在一个不合时宜的时刻提起旧事，语气很客气，意思却不客气。Anton听见自己答应得太快，挂断以后才发现手心有一层薄汗。
  _effects: state_parameter ad20-private-bargain.leverage 40 -> 48; state_parameter ad20-private-bargain.debt 50 -> 54; state_parameter ad20-private-bargain.trust 45 -> 41; mood -0.030000000000000027_

- **1941.01** `kernel-health.task-tuberculosis-cure::ctx-vienna-authoritarian-1934::milieu-hospital::tb-cure-war-requisition/tb-war-death-at-home` tags: health, task, tuberculosis, sanatorium, cure, vienna, urban, crisis
  药和煤都先给军队。Anton在家里烧炭取暖，窗户糊得严严实实；春天来收尸的人说，这一条巷子抬走了四个。邻居用雪擦门框，说石灰能挡住病气。收尸的人把门重新钉上，钉子在雪里找了很久。
  _effects: death (tuberculosis during wartime scarcity); cash -12 ( burial and disinfection（其中12克朗记入债务）); flag -scandal_engine_active; flag -protected_scandal_active; flag -private_bargain_active_
## Hedwig

Born 1912.01, alive at 1957.
Education: none 0; occupation: none; roles: infant, child, stove_rota_member, neighbourhood_helper, black_market_patient, office:夜班饲养员, refugee, permit_holder, separated, living_exhibit, liberated_1945, tenant_organizer, family_mediator, unpaid_creditor, office:电梯员, publicly_wronged, returned_pow, office:顾问.

### State snapshot
- cursed-by-wish [person] (active) parameters={"severity":0.7,"triggers":4} links={} ticks=0
- p22-child-omen [person] (ended 1917.1: duration expired) parameters={"strangeness":63,"attention":69,"protection":27,"fear":55} links={} ticks=3
- suspected-witchcraft [person] (ended 1935.1: duration expired) parameters={"evidence":10,"danger":40,"accuserKnown":true,"healerConsulted":false} links={} ticks=3
- ad20-public-attention [person] (ended 1938.1: duration expired) parameters={"attention":49,"sympathy":39,"danger":23,"opportunity":41} links={} ticks=3
- oj18-odd-apprenticeship [person] (ended 1939.1: duration expired) parameters={"trust":50,"strangeKnowledge":40,"reliability":55,"nightsWorked":48,"post":"动物园夜班饲养员"} links={} ticks=3
- p22-wild-fortune [person] (ended 1943.1: duration expired) parameters={"height":49,"absurdity":80,"witnesses":55,"fragility":52} links={} ticks=2
- p22-scandal-engine [person] (ended 1942.1: duration expired) parameters={"heat":37,"reach":50,"leverage":31,"shame":21} links={} ticks=2
- under-investigation [person] (ended 1943.1: duration expired) parameters={"progress":45,"charge":"泄露政治言论"} links={} ticks=3
- bc18-bureaucratic-ghost [person] (ended 1945.1: duration expired) parameters={"fileDepth":58,"sightings":3,"risk":42,"duplicates":3,"officialStatus":"同时活着和死了","alias":"少了一个字母的名字"} links={} ticks=4
- forbidden-attachment [person] (ended 1949.1: replaced_by:public-scandal) parameters={"discretion":55,"reciprocity":59,"exposure":60,"jealousy":50,"grief":20,"origin":"rented parlour","publicFigure":false} links={"lover":"Anton Bauer 2"} ticks=5
- bc18-ridiculous-fame [person] (ended 1945.1: duration expired) parameters={"notoriety":36,"legitimacy":6,"absurdity":85,"invitations":0,"boredom":22,"officialStory":"蜡像馆的活展品"} links={} ticks=2
- suspected-witchcraft [person] (ended 1948.1: duration expired) parameters={"evidence":14,"danger":50,"accuserKnown":true,"healerConsulted":false} links={} ticks=3
- under-investigation [person] (ended 1951.1: duration expired) parameters={"progress":45,"charge":"冒领彩票"} links={} ticks=2
- public-scandal [person] (ended 1951.1: duration expired) parameters={} links={} ticks=1
- p22-scandal-engine [person] (ended 1951.1: duration expired) parameters={"heat":73,"reach":59,"leverage":23,"shame":69} links={} ticks=2
- institution-purge [organization] (ended 1950.1: duration expired) parameters={"target":"未说明","intensity":0.32999999999999996,"denunciations":3,"vacancies":1,"reviewOpen":true} links={} ticks=1
- p23-dangerous-secret [person] (ended 1953.1: duration expired) parameters={"exposure":11,"leverage":20,"bodies":0,"loyalty":66} links={} ticks=2
- suspected-witchcraft [person] (ended 1954.1: duration expired) parameters={"evidence":32,"danger":80,"accuserKnown":true,"healerConsulted":false} links={} ticks=4
- oj18-odd-apprenticeship [person] (ended 1953.1: duration expired) parameters={"trust":19,"strangeKnowledge":10,"reliability":50,"nightsWorked":0,"post":"电梯员"} links={} ticks=2

### 213 subject events

- **1912.02** `p22-strange-doctor-prediction::ctx-vienna-1912::milieu-tenement/the-doctor-writes-nothing` tags: infancy, family, doctor, illness, omen, strange, dark, drama
  医生听完胸口，提笔写了一句，又划掉，只留下一个墨团。他把纸折好，说“把屋子烧暖一点”；Friedrich Hofer等医生走后，对着灯看那张纸，认出墨团底下露出半个“冬”字，灯芯正好爆了一下。
  _effects: state_add p22-child-omen state:world-vienna-1912:19; mood -0.04; knowledge “医生写下又划掉的诊断里，露出一个“冬”字。”_

- **1912.03** `vienna-life-birth-letter-from-the-dead/the-letter-is-real` tags: infancy, family, secret, letter, drama
  邮差把一封边角磨白的信塞进门缝，收信人是一个已经死了三年的名字。Josefine Hofer把Hedwig放在膝上，拆开信，里面只有一句：“孩子像不像他？”Hermann Kral在门口探头，问是不是寄错了；Josefine Hofer把信折回去，说“没有寄错”。
  _effects: flag +letter_from_dead_relative; knowledge “一封写给死去亲人的信问：孩子像不像他。”; mood -0.04000000000000001_

- **1913.01** `vienna-life-infant-first-smile/smile-at-the-lamp` tags: infancy, family, first, warm
  Josefine Hofer把Hedwig抱到窗边，煤汽灯罩上有一圈晃动的光。孩子盯着看了很久，忽然笑出声，口水滴在Josefine Hofer的袖口上。屋里的人都停了一下，像是听见了什么了不起的消息。
  _effects: mood 0.04000000000000001; health 0.010000000000000009 (a good day)_

- **1913.01** `state_tick:p22-child-omen/the-omen-returns/the-coincidence-repeats` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  又过了一年，同一件小事又发生了：钟停在同一个时刻，门口的狗对着空处叫。Hedwig正在学系鞋带，抬头问“又来了吗”；大人说没有，手却先去摸门框，谁也没有回答。
  _effects: state_parameter p22-child-omen.strangeness 60 -> 65; state_parameter p22-child-omen.attention 65 -> 69; state_parameter p22-child-omen.fear 55 -> 58; mood -0.01_

- **1913.02** `vienna-life-toddler-first-words/first-word-door` tags: infancy, family, first, comic
  门外有人上楼，Hedwig忽然指着门说：“爸爸。”Friedrich Hofer看了看空门口，没有纠正。那天晚上，孩子把家里每个人的名字都叫了一遍，叫错两个，却叫得很认真。
  _effects: skill; mood 0.02; flag +first_word_door_

- **1914.01** `vienna-life-toddler-wrong-cradle/the-blanket-is-wrong` tags: infancy, family, rumour, identity, comic, drama
  Anna Moser盯着Hedwig的摇篮看了很久，说这床蓝被子不是这家人的。Josefine Hofer把被子翻过来，角落绣着一个陌生的姓；Hedwig却抓着被角不放，像是认得它。Anna Moser退后一步，说“我什么都没说”。
  _effects: flag +wrong_cradle_blanket; knowledge “摇篮里的蓝被子绣着一个陌生的姓。”; mood -0.02999999999999997_

- **1915.01** `vienna-life-child-family-legend/lost-relative` tags: childhood, family, secret, story
  Josefine Hofer在收拾箱子时翻出一张没有署名的照片，说那是家里一个“去了很远地方”的人。Hedwig问还回不回来，Josefine Hofer把照片翻过去，说先把名字记住，别在饭桌上问。
  _effects: knowledge “家里有一张没有署名的照片，照片上的人去了很远的地方。”; flag +family_legend_photo; mood -0.01_

- **1916.01** `vienna-life-child-first-friend/stolen-marble` tags: childhood, friendship, family, comic
  Lena把Hedwig的玻璃弹珠藏进鞋里，被当场看见。Lena说只是“替你拿着”，Hedwig没有揭穿，也没有再拿出第二颗。两个人蹲在墙根，把一只蚂蚁看了很久，谁也没有先回家。
  _effects: relation friend with person-phase15-Lena-world-vienna-1912; skill; mood -0.009999999999999998_

- **1916.01** `state_tick:p22-child-omen/the-omen-returns/nothing-happens` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  又过了一年，什么也没有发生。Hedwig照常吃饭、摔跤、把鞋穿反；那个说过预言的人搬走了。家里把红绳解下来，却没有扔，只收进针线盒最里面，红绳上落了一点灰。
  _effects: state_parameter p22-child-omen.strangeness 65 -> 63; state_parameter p22-child-omen.fear 58 -> 55; state_parameter p22-child-omen.protection 25 -> 27; mood 0.010000000000000002_

- **1916.02** `vienna-life-child-inherited-wish/the-child-wants-a-dog` tags: childhood, family, wish, grief, uncanny, drama
  Hedwig说那句话只是想要一只狗，而且要“会看门的、不咬人的、像外婆家那只一样”。Josefine Hofer松了一口气，又有点失落；那天下午，两个人用旧毛线给一只并不存在的狗量了脖围。
  _effects: mood 0.04; skill_

- **1917.01** `state_expire:p22-child-omen` tags: p22-child-omen, child_omen, omen, strangeness, attention, protection, fear, superstition
  Hedwig的「孩子身上的兆头」到期；相关安排结束。
  _effects: state_remove p22-child-omen state:world-vienna-1912:19_

- **1917.02** `vienna-childhood-street.hoop/hoop-lose` tags: childhood, street, social, home
  铁环滚进沟沿，Hedwig扑过去抓，膝盖先着了地。Mitzi Lechner把铁环拎起来，在手里转了一圈，说不能白捡。Hedwig摸出一颗石弹子递过去，Mitzi Lechner这才松手。回家路上Hedwig一瘸一拐，裤膝上沾着石屑和血，经过Mitzi Lechner家门口时特意绕到街对面。
  _effects: relation friend with person-mitzi-lechner; mood -0.04; condition_

- **1918.01** `p9-gap-childhood-chores.market-line/line-sold-out-potatoes` tags: childhood, household, chores, school, task, daily, market, food
  木窗“咔”地合上，Hedwig的布袋还敞着口。伙计隔着板缝说下星期再来。Hedwig在墙根站了一会儿，把硬币排在掌心数了两遍，走到旁边土豆摊前，挑了几个小的，让摊主当面过秤。家里人晚上把钱和土豆倒在桌上，重新数了一遍。
  _effects: food; mood -0.03; skill; relation acquaintance with person-materialized-world-vienna-1912-1_

- **1919.01** `p9-gap-childhood-chores.laundry-help/laundry-bread-with-friend` tags: childhood, household, chores, school, task, daily, laundry, work
  Karl Kraus家的孩子站在绳子另一头，Hedwig递夹子时故意慢半拍，两个人把床单拉得没有一道褶。收工后Karl Kraus端出半包隔夜面包，掰开时掉了一桌屑。Hedwig把分到的那块用围裙兜住，回家路上闻着麦味，硬是没咬。
  _effects: food; relation acquaintance with person-karl-kraus; skill_

- **1919.11** `vienna-childhood-friends.hidden-book/book-borrowed-and-returned` tags: childhood, social, school, street
  书在Hedwig的书包里藏了三天，课间才敢翻两页。还书那天，Hedwig把书角淋皱的事先说了，又把书页一张张抚平。Hermann Kral 2翻到最后一页，看了看书脊，说下次别带进院子，书却还是借给了Hedwig。
  _effects: skill; relation acquaintance with person-materialized-world-vienna-1912-16; relation acquaintance with person-materialized-world-vienna-1912-16_

- **1920.01** `p9-gap-childhood-chores.market-line/line-half-flour` tags: childhood, household, chores, school, task, daily, market, food
  队伍从面包房门口拐进巷子，Hedwig把布袋夹在腋下，学着前面人的样子，用胳膊肘顶住后面人的篮子。窗口的伙计舀面粉时，Hedwig踮脚看着秤，直到半袋面倒进袋口。挤出人群时鞋跟被踩掉，Hedwig单脚跳了两步，在泥里摸回鞋，索性赤脚走回家。
  _effects: food; health -0.020000000000000018 (赤脚走石板路磨伤脚底); skill; relation acquaintance with person-materialized-world-vienna-1912-25_

- **1921.01** `p9-gap-childhood-chores.laundry-help/laundry-three-heller` tags: childhood, household, chores, school, task, daily, laundry, work
  “拽平，别留褶。”Luise Kral在绳子那头喊。Hedwig踮着脚把床单拉直，碱水把指缝泡得发白。收工时天已经黑了，Luise Kral数了三赫勒，又在围裙上擦干手才递过来。Hedwig把钱塞进袜筒，回家路上一直攥着，虎口的裂口沾了汗，火辣辣地疼。
  _effects: cash 0.03 (帮邻居晾床单挣的三赫勒); health -0.03 (碱水泡手，虎口裂开); relation acquaintance with person-luise-kral; relation acquaintance with person-materialized-world-vienna-1912-35_

- **1921.05** `vienna-childhood-street.market-errand/errand-ok` tags: childhood, street, social, home
  Hedwig在土豆摊前蹲了很久，挑了一磅没有芽眼的。付完钱，手里只剩几个铜板，又去买了盐。围裙兜太浅，Hedwig用下巴压住布边，走两步就低头看一眼。到家Josefine Hofer把土豆倒进盆里，盐包放在灶台边。
  _effects: food; cash -0.15 (市场花销（其中0.15克朗记入债务）); relation kin with person-josefine-hofer_

- **1922.01** `p9-gap-childhood-chores.market-line/line-sold-out-potatoes` tags: childhood, household, chores, school, task, daily, market, food
  “卖完了。”三个字从窗口里传出来，Hedwig后面的队伍立刻散了一半。Hedwig没走，趴在窗台上看伙计扫面屑，直到人家挥手赶人。旁边摊子的土豆带着泥，Hedwig用围裙兜住，一枚一枚数铜板，回家报账时连找零都说清了。
  _effects: food; mood -0.029999999999999992; skill; relation acquaintance with person-materialized-world-vienna-1912-7; relation acquaintance with person-materialized-world-vienna-1912-15_

- **1923.01** `p9-gap-childhood-chores.fetch-coal/coal-neighbor-speaks` tags: childhood, household, chores, school, task, daily, coal, errand
  “记我名下。”Berta Weiss说完，掌柜才把秤砣挪开。账本上多出两赫勒的利息，煤筐却只装了半下。Hedwig跟着Berta Weiss走出门，Berta Weiss低声嘱咐明天先把钱送来，别让掌柜再找到话头。
  _effects: cash -0.02 (赊账添的两赫勒利息（其中0.02克朗记入债务）); food_

- **1924.01** `p9-childhood-apprenticeship.ask-for-trial/too-young-refused` tags: adolescence, work, apprenticeship, labour, training, family, task, task:work
  “开春再来。”Luise Winter说完就转身去接纸车。Hedwig站在门槛外，把这句话在心里复述了一遍，弯腰捡起地上的纸边。两个赫勒落在掌心时还带着围裙的体温。回家那条街上有三家亮着灯的作坊，Hedwig一家一家看过去，把位置记住。
  _effects: cash 0.2 (替作坊捡纸边得到的两个赫勒); mood -0.04000000000000001; flag +seeking_work; relation acquaintance with person-materialized-world-vienna-1912-20_

- **1925.01** `task-vienna-poor-apprentice.foreman-introduction/relative-refuses-guarantee` tags: adolescence, apprentice, work, education, poverty, printshop, task, task:work
  亲戚临时反悔，不肯为一个刚离开旧作坊的学徒作保，说自己在厂里还要做人。他站在门口，手里攥着熨平的衬衫袖口，把路上想好的话又咽回去。
  _effects: mood -0.08000000000000002; relation acquaintance with person-maria-kral; relation acquaintance with person-materialized-world-vienna-1912-33_

- **1926.01** `p9-childhood-youth-aspiration.save-for-books/money-taken-for-coal` tags: adolescence, education, aspiration, school, books, club, exam, task
  Josefine Hofer把火柴盒放回窗台，说等发了工钱再补给他。Hedwig把抄好的纸袋叠成小册子，用缝衣针别在一起，封面写了书名，字比平时大。
  _effects: cash -2 (积蓄被挪去买煤（其中2克朗记入债务）); mood -0.06; skill; relation kin with person-josefine-hofer_

- **1927.01** `p9-childhood-apprenticeship.ask-for-trial/too-young-refused` tags: adolescence, work, apprenticeship, labour, training, family, task, task:work
  “开春再来。”Josef Winter说完就转身去接纸车。Hedwig站在门槛外，把这句话在心里复述了一遍，弯腰捡起地上的纸边。两个赫勒落在掌心时还带着围裙的体温。回家那条街上有三家亮着灯的作坊，Hedwig一家一家看过去，把位置记住。
  _effects: cash 0.2 (替作坊捡纸边得到的两个赫勒); mood -0.03999999999999998; relation acquaintance with person-materialized-world-vienna-1912-42_

- **1928.01** `p9-childhood-youth-aspiration.join-a-club/went-once-and-left` tags: adolescence, education, aspiration, school, books, club, exam, task
  Hedwig交了第一个月的会费，进去坐了一刻钟。屋里太吵，下棋的争论盖过了念书的声音，他借的书也被人翻得卷了边。下个月他路过门口，没再进去交十赫勒。
  _effects: cash -0.1 (只交了一个月会费); relation acquaintance with person-mitzi-lechner; flag +workers_youth_quit; mood -0.020000000000000018_

- **1928.09** `statistical_infection`
  Hedwig在Leopoldstädter Zinshaus, gemeinsamer Gang病倒了，肺炎让身体发热、虚弱，接下来的日子只能卧床。

- **1928.12** `statistical_illness_worsened`
  Hedwig的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1929.01** `p9-childhood-youth-aspiration.save-for-books/bought-used-book` tags: adolescence, education, aspiration, school, books, club, exam, task
  书摊上那本《机械制图》被压在一摞旧画报下面，Hedwig抽出来时抖落一层灰。Luise Kral 2把书翻到缺角那页，说三克朗拿走，他数出最后几枚赫勒，硬币在木板上叮当响。
  _effects: cash -3 (旧书摊买《机械制图》（其中3克朗记入债务）); skill; mood 0.04999999999999999; relation acquaintance with person-materialized-world-vienna-1912-33_

- **1929.03** `statistical_recovery`
  Hedwig熬过了这场肺炎，能坐起来喝一点汤，但身体还很虚。

- **1930.01** `p9-social-relationship-initiative.apology-at-bakery/settle-the-account` tags: courtship, friendship, family, social, initiative, housing, task, task:social
  两个星期不来往，门口碰见时Hedwig和Mitzi Lechner都先看别处。这次Hedwig先开口，把账本里的一页撕下来摊在柜台上，说数字是自己写错的；Mitzi Lechner看了半天，说下回别在酒馆里算账。
  _effects: cash -0.4 (一小束紫罗兰和两只 Semmel); relation friend with person-mitzi-lechner; mood 0.08000000000000002; relation acquaintance with person-materialized-world-vienna-1912-14_

- **1930.02** `vienna-tenement-neighbors.lost_room_key/key_stolen_by_stranger` tags: home, social, family, housing
  Hedwig记得出门时钥匙还在，回来却没了。Elisabeth Moser 2说下午看见一个穿灰外套的男人在楼道里转悠，手里晃着一把铜钥匙。两人下楼查看，房门虚掩，抽屉被拉开，攒着买煤的六克朗不见了。Elisabeth Moser 2陪着Hedwig去街角警察岗亭报了案，警察记下灰外套，说会留意。
  _effects: cash -6 (被盗的买煤钱); relation friend with person-materialized-world-vienna-1912-49; mood -0.09999999999999998; relation acquaintance with person-materialized-world-vienna-1912-49_

- **1930.02** `vienna-parish-aid.sick-call/sick-call.help-in` tags: faith, parish, mutual_aid, poverty, family
  Hedwig和Alois Berg一起上楼，门没锁，屋里一股酸味。病人裹着毯子坐在床沿咳嗽，炉子只剩灰。Hedwig去楼下讨了几块煤核，蹲着把火生起来，又用带来的面粉搅了一小锅稀粥。药粉冲开，碗底沉着白渣，Hedwig先垫了药钱，说以后再说。
  _effects: food; cash -0.6 (替病人垫上药粉钱（其中0.6克朗记入债务）); relation acquaintance with person-materialized-world-vienna-1912-9; flag +parish_sick_visitor; relation acquaintance with person-materialized-world-vienna-1912-9_

- **1930.02** `vienna-courtship-courtyard.family-table/nod-and-pots` tags: adulthood, courtship, partner, social, family, partnership
  汤喝到一半，Friedrich Hofer放下勺子点了头，但说得很清楚：先攒出一套锅碗、一只挂钟，再把话往下说。Anna Bauer 2在桌下用膝盖碰了碰Hedwig，Friedrich Hofer把最后一块煮牛肉推过来，饭桌上的空气总算松了；这一顿让对方家里管了饭，自家灶上省下两克朗的吃食，也吃出一个带条件的准信。
  _effects: relation partner with person-materialized-world-vienna-1912-72; relation kin with person-friedrich-hofer; food; relation acquaintance with person-materialized-world-vienna-1912-72_

- **1930.02** `ad20-lucky-coincidence::ctx-klosterneuburg-rural-1912::milieu-tenement/the-coin-on-the-track` tags: luck, coincidence, everyday, money, superstition, debt, rural, agriculture
  电车刚过去，轨道边躺着一枚硬币，被车轮压得有点弯。Hedwig把它捡起来，发现还能花。那天下午，Hedwig用这枚硬币买了一小块肥皂，剩下的钱又放回口袋，像放回一个没有用完的运气。
  _effects: cash 2 (a coin found by the tram tracks); mood 0.02999999999999997; flag +lucky_coin; knowledge “电车刚过去，轨道边躺着一枚被压弯的硬币。”_

- **1930.02** `vienna-housing-move.moving-day/moving-day-sell-up` tags: housing, home, rent, family, money
  床架从楼梯上拖下来时油漆蹭掉了好几块，Hedwig站在旁边没作声。收破烂的走后，屋里空得回声都变大了，Hedwig抱着铁盒出门，只把门锁好，钥匙从看门人手里交出去。
  _effects: cash 2 (卖掉旧床架和桌子收进的钱); mood -0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-34; relation acquaintance with person-materialized-world-vienna-1912-34_

- **1930.07** `r2-law.lottery-ticket::ctx-klosterneuburg-rural-1912::milieu-tenement/small-prize` tags: finance, lottery, gambling, luck, neighbors, rural, agriculture, small_town
  Emil Weiss 2把开奖名单钉在柜台上，Hedwig的号码中了末等奖，够买两袋面粉。Hedwig把烟盒上的号码对了两遍，Emil Weiss 2说末等奖不用去总行，在这里就能兑。Anna Bauer 2在旁边说，先把上次借的面粉钱还了；Hedwig数出钱，剩下的刚好够买一张新彩票。
  _effects: cash 6 (中奖号码写在烟盒上); flag +won_lottery_consolation_prize; relation acquaintance with person-materialized-world-vienna-1912-54; knowledge “consolation prizes can be redeemed at the sales agent”; relation acquaintance with person-materialized-world-vienna-1912-54; relation acquaintance with person-materialized-world-vienna-1912-53_

- **1931.01** `p9-history-public-action.organize-relief/credit-own-name` tags: politics, union, party, activism, public_action, relief, leaflet, task
  夜里 Hedwig 在灯下重算赊账，Rosa Winter 坐在对面搓手，说先顾眼前。锅里剩下的汤已经凝了一层皮，窗外的风把账页吹得哗哗响。
  _effects: cash -5 (以自家名义赊购面粉); food; mood -0.04999999999999999; relation acquaintance with person-materialized-world-vienna-1912-4; relation acquaintance with person-materialized-world-vienna-1912-4; relation acquaintance with person-materialized-world-vienna-1912-68_

- **1931.06** `vienna-market-household.soup-kitchen/soup-kitchen.share` tags: home, market, food, social
  汤锅冒着热气，Hedwig盛出两勺倒进Anna Moser带来的罐子里。Anna Moser说了声谢谢就匆匆上楼。隔天罐子还回来，锅底搁着一小块猪油。
  _effects: food; relation acquaintance with person-anna-moser; mood 0.04999999999999999_

- **1931.06** `p9-social-courtship-friendship.fasching-dance/dance-first-polka` tags: courtship, friendship, social, adulthood, reputation, leopoldstadt
  波尔卡重新响起时，Hedwig走到靠墙的长凳前向Elisabeth Berg弯腰。姑母手里的扇子停了停，没说话。入场费和小费一共一克朗，Hedwig把找零塞回内袋；一支舞跳完，Elisabeth Berg说了自己住在哪条街，Hedwig把名字和门牌在心里念了两遍。
  _effects: cash -1 (付给乐队的小费与舞会入场费); relation acquaintance with person-materialized-world-vienna-1912-78; relation acquaintance with person-materialized-world-vienna-1912-78_

- **1931.10** `vienna-illness-household.mother-falls/stay-home-care` tags: health, family, home
  Hedwig跟工头请了三天假，在灶上熬粥，给Josefine Hofer换药。工钱少了一截，母亲的腿却慢慢消了肿；夜里Hedwig把椅子拼在床边，听见母亲呼吸平稳才合眼。
  _effects: cash -4 (请假三天损失的工钱); health 0.1 (在家照护后腿肿消退); relation kin with person-josefine-hofer_

- **1932.01** `curse15-betrayal.name-on-the-list::ctx-klosterneuburg-rural-1912::milieu-tenement/the-accusation-fails` tags: betrayal, politics, investigation, curse, denunciation, secret, rural, agriculture
  Emil Weiss在众人面前说Hedwig用诅咒害人。没有人接话，因为上个月Emil Weiss也用同样的话说过另一个人。事情没有闹大，但Hedwig发现，从此每次走进那间屋子，都有人先看Hedwig的手。
  _effects: reputation -0.03; relation rival with person-emil-weiss; state_add suspected-witchcraft state:world-vienna-1912:109; flag +accusation_echoed; mood -0.03999999999999998_

- **1932.01** `state_reaction:cursed-by-wish/curse-betrayal` tags: cursed-by-wish, wish, curse, supernatural, revenge, special, state, state_reaction
  背叛发生后的夜里，Hedwig听见墙里有一声很轻的响。第二天，Emil Weiss病倒了；没有人把这两件事放在一起。
  _effects: condition; state_parameter cursed-by-wish.triggers 0 -> 1; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:004121_

- **1932.01** `p9-social-relationship-initiative.cut-the-guarantee/settle-at-the-tavern` tags: courtship, friendship, family, social, initiative, housing, task, task:social
  没有签字，陪对方去酒馆把账当面谈清。掌柜的把欠条一张张摆在桌上，一共二十八克朗。有人替着说了几句好话，讲明利息怎么算、按月还多少，请掌柜的宽限到月底。谈下来先还五克朗，余下的立了新据，担保人一栏空着，掌柜的临走时瞪了一眼。
  _effects: cash -1.2 (酒馆里替对方先垫的第一笔款子和两杯酒); relation friend with person-mitzi-lechner; reputation -0.020000000000000004; mood 0.020000000000000018_

- **1932.06** `vienna-medical-treatment.night-fever/hospital-night` tags: health, medical, family, money
  电车在环城大道上哐当响，Emil Weiss攥着Hedwig的胳膊，怕人从座位上滑下去。急诊厅的煤气灯发黄，长椅上全是咳嗽声，押金窗口的铜盘递出两克朗，换来一张硬纸号牌。
  _effects: cash -2 (医院急诊押金); health 0.08 (急诊观察和冰敷退烧); relation friend with person-emil-weiss_

- **1932.09** `vienna-tenement-neighbors.lost_room_key/key_stolen_by_stranger` tags: home, social, family, housing
  Hedwig记得出门时钥匙还在，回来却没了。Grete Lechner说下午看见一个穿灰外套的男人在楼道里转悠，手里晃着一把铜钥匙。两人下楼查看，房门虚掩，抽屉被拉开，攒着买煤的六克朗不见了。Grete Lechner陪着Hedwig去街角警察岗亭报了案，警察记下灰外套，说会留意。
  _effects: cash -6 (被盗的买煤钱); relation friend with person-materialized-world-vienna-1912-37; mood -0.10000000000000003; relation acquaintance with person-materialized-world-vienna-1912-37_

- **1932.10** `kernel-social.shared-stove::ctx-klosterneuburg-rural-1912::milieu-tenement/shared-stove.rota` tags: social, neighbor, everyday, laundry, cooperation, conflict, rural, agriculture
  灶台只有两个火眼，Hedwig和Alois Kral把时辰写在墙上：一三五归东屋，二四六归西屋，星期日谁先起谁用。Alois Kral拿粉笔在“星期日”旁边画了一个太阳；第一个星期日，两家一起烤了一盘土豆。
  _effects: relation friend with person-materialized-world-vienna-1912-14; role; flag +stove_schedule; knowledge “灶台一三五归东屋，二四六归西屋，星期日谁先起谁用。”_

- **1933.01** `curse15-notice.borrowed-mourning::ctx-klosterneuburg-rural-1912::milieu-tenement/sells-the-mourning` tags: curse, money, fear, client, ritual, supernatural, work, rural
  Friedrich Kral 3请Hedwig去家里坐一夜，说只要Hedwig在灵堂待到天亮，那个欠钱的人就会自己上门。Hedwig收了钱，在灵堂坐到天亮，什么也没有发生。一个月后，那个人真的来了，送来一袋面粉；Friedrich Kral 3把面粉分给Hedwig一半，没有解释。
  _effects: cash 3 (替人守灵的酬劳); reputation -0.03; relation acquaintance with person-materialized-world-vienna-1912-40; flag +sold_mourning_service; condition; relation acquaintance with person-materialized-world-vienna-1912-40_

- **1933.01** `state_tick:suspected-witchcraft/rumor-season/new-accuser` tags: suspected-witchcraft, witchcraft, rumor, religion, legal, reputation, fear, supernatural
  又一个人站了出来，说自家的母牛在Hedwig经过之后不再产奶。Hedwig没有辩解，因为辩解本身也需要被登记。Hedwig开始绕远路去市场，每月多出几枚铜币的车钱。
  _effects: state_parameter suspected-witchcraft.danger 20 -> 30; reputation -0.039999999999999994; cash -1 (绕远路增加的车钱); mood -0.03999999999999998_

- **1933.01** `r13-civ.midwife::ctx-klosterneuburg-rural-1912::milieu-tenement::r13-civ.midwife-rural/rural-cart-fetch` tags: health, midwife, birth, neighbor, night, rural, agriculture, small_town
  Hedwig把Mitzi Hofer扶上Mitzi Lechner的板车，车斗里垫着干草。路冻得发硬，车轮每过一个坑，Mitzi Hofer就骂一句。到村口时，天已经蒙蒙亮，院子里的狗叫得全村都听见。
  _effects: cash -6 (夜里敲接生婆的门); flag +rural_cart_fetched_midwife; relation acquaintance with person-mitzi-lechner; relation acquaintance with person-materialized-world-vienna-1912-45_

- **1933.03** `vienna-historical-social-movement.district-list/demand-open-books` tags: history, historical_process, social_movement, organization, politics
  负责人说这是不信任，Hedwig回说数目对得上才叫信任。Mitzi Hofer把卷角的账页压平，指着一行重复的支出，屋里安静得能听见煤气灯嘶声。最后决定下次集会再报账。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-44; reputation 0.04000000000000001; skill_

- **1933.09** `hs18-queue.refugee::ctx-vienna-authoritarian-1934::milieu-tenement/sign-as-guarantor` tags: refugee, queue, station, papers, official, history, vienna, urban
  登记桌后面，Gustav Berg把表格推过来，说这一家人缺一个本地担保人。Emil Weiss抱着一只藤箱，箱角用绳子捆了三道。Hedwig写下自己的名字和门牌号，笔尖顿了一下；Gustav Berg盖章时没有抬头，只说“出了事找你”。
  _effects: relation acquaintance with person-emil-weiss; flag +guaranteed_refugee_family; knowledge “担保人要替被担保的人负责。”; reputation -0.009999999999999995_

- **1934.01** `fm17-confession.velvet-box::ctx-vienna-authoritarian-1934::milieu-tenement/the-seal-holds` tags: faith, confession, suspected_witchcraft, investigation, priest, secret, doubt, vienna
  Hedwig隔着木格说出邻居家的母牛、夜里的蜡烛和那个不肯散的梦。Elisabeth Moser 2没有问名字，也没有说这是巫术；他只让Hedwig把蜡烛收进匣子，别再点。走出告解室时，Hedwig听见他在里面把丝绒匣的扣子扣上，声音很轻。
  _effects: mood 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-49; state_parameter suspected-witchcraft.evidence 15 -> 10; flag +fm17_confession_sealed_

- **1934.01** `state_tick:suspected-witchcraft/rumor-season/new-accuser` tags: suspected-witchcraft, witchcraft, rumor, religion, legal, reputation, fear, supernatural
  又一个人站了出来，说自家的母牛在Hedwig经过之后不再产奶。Hedwig没有辩解，因为辩解本身也需要被登记。Hedwig开始绕远路去市场，每月多出几枚铜币的车钱。
  _effects: state_parameter suspected-witchcraft.danger 30 -> 40; reputation -0.039999999999999994; cash -1 (绕远路增加的车钱); mood -0.03999999999999998_

- **1934.01** `r13-fam.help-neighbour::ctx-vienna-authoritarian-1934::milieu-tenement/carried-the-coal` tags: task, social, neighbor, help, care, vienna, urban, crisis
  Hedwig看见Friedrich Kral 3在楼梯口歇了三回，便把煤筐接过来，一筐一筐抬上三楼。最后一趟，Hedwig的腰在门框上撞了一下，Friedrich Kral 3从柜里摸出一小瓶李子酒，硬倒了一盅。
  _effects: food; flag +carried_neighbour_coal; role; relation friend with person-materialized-world-vienna-1912-40_

- **1934.06** `vienna-market-household.friday-fish/friday-fish.share` tags: home, market, food, social
  鱼还滴着水，Hedwig在走廊里分成两份。一份拿进自家，一份搁在Elisabeth Bauer的门口。傍晚Elisabeth Bauer来还盘子，盘子里是一小袋面粉。
  _effects: cash -6 (买鱼); food_

- **1934.09** `vienna-tenement-neighbors.lost_room_key/key_lost_landlady` tags: home, social, family, housing
  Hedwig把钥匙丢在了回家路上的有轨电车轨道旁，天黑也没找着。房东太太说换锁芯要一克朗五十赫勒，从下月房租里扣。Katharina Bauer 2借给Hedwig一把旧挂锁，但锁鼻和门扣对不上，只能用铁丝拧着凑合。那夜Hedwig睡不踏实，总觉得有人在拧门。
  _effects: cash -1.5 (换锁芯费用); relation acquaintance with person-materialized-world-vienna-1912-32; mood -0.06000000000000005; relation acquaintance with person-materialized-world-vienna-1912-32_

- **1934.12** `r3-mig.immigrant-neighborhood::ctx-vienna-authoritarian-1934::milieu-tenement/refused-without-two-sponsors` tags: migration, community, organization, mutual_aid, belonging, vienna, urban, crisis
  Berta Huber翻到担保人一栏，说必须有两位老会员签字。Karl Kraus愿意签一个，另一个名字写了又划掉。Berta Huber把表推回来，说“不是不认老乡，是怕有人借了钱就走”。Hedwig把一克朗会费收回口袋，听见里屋有人在分汤。
  _effects: mood -0.10000000000000003; flag +refused_mutual_aid_membership; relation acquaintance with person-karl-kraus; relation rival with person-materialized-world-vienna-1912-80; knowledge “membership requires two sponsors”; relation acquaintance with person-materialized-world-vienna-1912-80_

- **1935.01** `r15-curse.aftermath::ctx-vienna-authoritarian-1934::milieu-tenement/quiet-mercy` tags: curse, fear, supernatural, revenge, vienna, urban, crisis, war
  Elisabeth Hofer病好以后来敲过门。两个人隔着门槛站了很久。Hedwig没有说原谅，只把一包药放在对方手里。Elisabeth Hofer走后，Hedwig把门关上，背靠着它坐了一会儿。
  _effects: mood 0.04999999999999999; relation acquaintance with person-materialized-world-vienna-1912-50; flag +curse_mercy; relation acquaintance with person-materialized-world-vienna-1912-50_

- **1935.01** `state_expire:suspected-witchcraft` tags: suspected-witchcraft, witchcraft, rumor, religion, legal, reputation, fear, supernatural
  Hedwig的「被疑巫术」到期；相关安排结束。
  _effects: state_remove suspected-witchcraft state:world-vienna-1912:109_

- **1935.01** `kernel-health.task-pharmacy-hunt::ctx-vienna-authoritarian-1934::milieu-tenement::pharmacy-war-requisition/pharmacy-war-morphine-trade` tags: health, task, pharmacy, shortage, black_market, vienna, urban, crisis
  军需处先领走了奎宁和碘酒，药房只剩阿司匹林和泻盐。Hedwig用一双旧靴子换了两支吗啡，药剂师把安瓿裹在报纸里，叮嘱别在街上打开。他把安瓿藏进帽衬，过检查站时低着头。
  _effects: cash -20 (boots and cash traded for two morphine ampoules); health 0.019999999999999997 (pain relief from a black-market ampoule); role; flag +traded_for_morphine; knowledge “军需处先领走奎宁和碘酒，药房只剩阿司匹林；旧靴子可以换两支吗啡。”; relation acquaintance with person-materialized-world-vienna-1912-65_

- **1935.03** `r1-civ.tenants-denunciation::ctx-vienna-authoritarian-1934::milieu-tenement/challenged-accuser` tags: politics, denunciation, neighbor, housing, shame, vienna, urban, crisis
  Hedwig没有争辩，只问Luise Kral要不要一起去警察局把话说清楚。Luise Kral的脸白了一下，Anton Kral说今天只登记不追究。第二天，Hedwig家门口多了一小袋盐，纸包上没有名字。
  _effects: mood -0.040000000000000036; flag +challenged_accuser_to_report; relation rival with person-luise-kral; relation acquaintance with person-materialized-world-vienna-1912-7; knowledge “the accuser backed down when a police report was offered”_

- **1935.08** `oj18-zoo.night::ctx-vienna-authoritarian-1934::milieu-tenement/broken-tooth` tags: zoo, animals, night, keeper, work, odd_job, suspense, vienna
  夜里十一点，母狮不肯碰桶里的马肉。Hedwig举着煤油灯绕到兽栏后面，看见它右槽牙断了一截，牙龈肿得发亮。Hedwig把肉切碎，又去敲Hermann Lechner的门；第二天兽医来了，Anton Kral在晨会上第一次记住Hedwig的名字。
  _effects: organization_found 普拉特动物园夜班队 (other); position 夜班饲养员 @zoo:person-phase15-Hedwig-world-vienna-1912-evt:world-vienna-1912:005746; state_add oj18-odd-apprenticeship state:world-vienna-1912:254; skill; reputation 0.03; flag +zoo_night_shift; knowledge “母狮的右槽牙断了，牙龈肿得发亮，夜里不肯吃马肉。”; relation acquaintance with person-materialized-world-vienna-1912-62; role; flag +odd_job_apprentice_

- **1935.12** `ad20-public-speech::ctx-vienna-authoritarian-1934::milieu-tenement/speech-lands` tags: speech, public, reputation, everyday, fame, scandal, vienna, urban
  礼堂里坐了一半人，前排还有几个空位。Hedwig讲到第三段时，后排有人开始点头；讲到第五段，连门口卖票的也转过身来。散场后，Luise Winter 2握着Hedwig的手说“下次还请你”，手心里全是汗。
  _effects: state_add ad20-public-attention state:world-vienna-1912:253; reputation 0.039999999999999994; skill; relation acquaintance with person-materialized-world-vienna-1912-25; flag +public_speech_landed; mood 0.040000000000000036; flag +public_attention_active_

- **1935.12** `state_reaction:ad20-public-attention/a-scandal-sticks` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  旧闻被重新排上版面，标题比上次短，意思却更重。Hedwig没有买那份报纸，但整条街都知道了标题。
  _effects: state_parameter ad20-public-attention.attention 55 -> 65; state_parameter ad20-public-attention.danger 15 -> 23; state_parameter ad20-public-attention.sympathy 50 -> 45; mood -0.030000000000000027_
  _causes: evt:world-vienna-1912:005742_

- **1936.01** `ml18-tax.audit-of-the-windfall::ctx-vienna-authoritarian-1934::milieu-tenement/pay-and-regularize` tags: tax, legal, money, windfall, bureaucracy, comic, vienna, urban
  Luise Kral 2把黑皮本翻到Hedwig那一页，说邮局储蓄的利息没有报，数目不大，但漏了就是漏了。Mitzi Moser 2在旁边把计算尺推来推去，最后算出一个八克朗的数目。Hedwig当天去缴了款，把收据贴在账本最后一页；回家的路上，账本第一次没有在口袋里折着。
  _effects: cash -8 (back taxes and a small fine on the windfall's interest); state_parameter ml18-sudden-fortune.principal 30 -> 22; reputation 0.020000000000000004; relation acquaintance with person-materialized-world-vienna-1912-33; flag +taxes_paid; knowledge “邮局储蓄的利息也要报税，漏报的八克朗已经补齐。”; mood 0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-30_

- **1936.01** `state_tick:ad20-public-attention/the-attention-cycle/cools` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  Hedwig发现最近没有人再提那件事。报纸换了头版，邻居也换了话题；本该轻松，Hedwig却在买菜时反复整理衣领，好像还在等一个不会来的目光。
  _effects: state_parameter ad20-public-attention.attention 65 -> 57; state_parameter ad20-public-attention.sympathy 45 -> 42; state_parameter ad20-public-attention.opportunity 45 -> 43; mood -0.010000000000000009_

- **1936.01** `state_tick:oj18-odd-apprenticeship/strange-year/trusted-with-the-keys` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  两年过去，Hedwig已经能闭着眼说出哪块地板会响、哪盏煤气灯该在几点关。师傅把备用钥匙交下来，没有解释为什么第三把钥匙磨得最亮；Hedwig也没有问，只在巡查簿最后一页画了一个小小的记号。
  _effects: state_parameter oj18-odd-apprenticeship.trust 30 -> 40; state_parameter oj18-odd-apprenticeship.strangeKnowledge 20 -> 30; state_parameter oj18-odd-apprenticeship.nightsWorked 0 -> 24; cash 2 (night-shift wages); skill_

- **1936.01** `agency:attend_meeting` tags: agency, agency:attend_meeting
  Hedwig去了Berggasse 19, Wohnung und Ordination，坐在后排听完了关于Wiener Psychoanalytische Vereinigung在Berggass的争论；散会时带走一张油印提纲。
  _effects: historical development:initiative-org-wednesday-psychological-society-1934 as participant; knowledge “我参加了Wiener Psychoanalytische Vereinigung在Berggasse 19,。”; mood 0.030000000000000027_

- **1936.03** `vienna-parish-aid.soup-kitchen/soup-kitchen.take-and-carry` tags: faith, parish, mutual_aid, poverty, family
  汤是豆子熬的，表面浮着几粒油星，气味把整条巷子都占了。Franz Berg排在前面，回头替Hedwig看着位置，嘴里数着还剩几个人。铁罐递过去时烫手，Hedwig用围裙角垫着。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-57; mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-57_

- **1936.10** `p9-gap-adult-ordinary-day.lost-dog/lost-dog.return-address` tags: adulthood, daily, leisure, neighborhood, ordinary, animal, neighbor
  她照着铜牌一路问到那栋楼，门房说裁缝天不亮就出门了，天黑才回。Hedwig把狗绳在栏杆上绕了两圈，蹲下来拍了拍狗脑袋，狗伸出舌头舔了舔她的手背，才跟着门房往门廊里走。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-90; mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-90; relation acquaintance with person-materialized-world-vienna-1912-61_

- **1936.12** `r3-war.war-profiteer::ctx-vienna-authoritarian-1934::milieu-tenement::profiteer-price-crisis/exposed-date-fraud` tags: war, profiteering, hoarding, market, inspection, vienna, urban, crisis
  物价一天涨三次，Berta Berg把面粉袋上的日期改小，Hedwig在店里看见他拿钢笔描数字。Elisabeth Moser 2来买面包，Berta Berg说“今天只剩黑的”；Hedwig把自己刚买的一袋白面放在柜台上，说“那这个呢”。
  _effects: food; flag +exposed_merchant_date_fraud; relation rival with person-materialized-world-vienna-1912-91; relation friend with person-materialized-world-vienna-1912-49; knowledge “the merchant alters flour dates”; relation acquaintance with person-materialized-world-vienna-1912-91_

- **1937.01** `df18-curse.name-in-the-door::ctx-vienna-authoritarian-1934::milieu-tenement/the-joke` tags: curse, name, door, omen, neighbor, dark, supernatural, vienna
  Hedwig挨家问过去，最后Elisabeth Bauer承认是自己刻的，说只是开个玩笑，因为Hedwig最近总说运气不好。Hedwig看着那张笑脸，没有发火，只把门框上的字用砂纸磨掉。磨到最后，木头里露出另一行更旧的刻痕。
  _effects: knowledge “门框上的名字是邻居刻的，但木头里还有更旧的字。”; condition; flag +df18_old_name_under_door; mood -0.040000000000000036_

- **1937.01** `state_tick:ad20-public-attention/the-attention-cycle/cools` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  Hedwig发现最近没有人再提那件事。报纸换了头版，邻居也换了话题；本该轻松，Hedwig却在买菜时反复整理衣领，好像还在等一个不会来的目光。
  _effects: state_parameter ad20-public-attention.attention 57 -> 49; state_parameter ad20-public-attention.sympathy 42 -> 39; state_parameter ad20-public-attention.opportunity 43 -> 41; mood -0.010000000000000009_

- **1937.01** `agency:support_process` tags: agency, agency:support_process
  Hedwig想帮忙，但组织者不信任新来的人，只让其在外围等消息。
  _effects: mood -0.040000000000000036_

- **1937.04** `major-crisis.rent-increase/pay-the-increase` tags: crisis, housing, rent, eviction, family, poverty
  房东没有露面，只让看门人Anna Berg把补款单塞进门缝：每月要多十四克朗，先交十八克朗（本月十四加四克朗手续费）才肯谈续租。Hedwig把准备买冬煤的钱数了两遍，还是把钱交了，收据上写的是“自愿捐助”。Anna Berg低声说，不签的人已经有两家搬走了，楼下的煤价牌又换了数字。
  _effects: cash -18 (advance payment demanded with the rent increase); relation acquaintance with person-materialized-world-vienna-1912-12; flag +rent_increase_accepted; relation acquaintance with person-materialized-world-vienna-1912-12_

- **1938.01** `vienna-life-anschluss-1938/flees` tags: politics, persecution, 1938, migration
  Hedwig在夜里收拾了一只箱子，把证件缝进外套内衬，搭上往西的火车。Katharina Hofer 2第二天来查人，只看到空床和没关严的窗。
  _effects: move place-klosterneuburg-aunt-house; role; cash -20 (escape and lodging); condition_

- **1938.01** `state_expire:ad20-public-attention` tags: ad20-public-attention, public, attention, reputation, media, everyday, risk, opportunity
  Hedwig的「被看见的日常」到期；相关安排结束。
  _effects: state_remove ad20-public-attention state:world-vienna-1912:253; flag -public_attention_active_

- **1938.01** `state_tick:oj18-odd-apprenticeship/strange-year/learned-the-building` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  又过了一个冬天，Hedwig能从楼梯的响声判断是谁在值夜，也能从煤气灯的颜色判断哪一段管道该修。师傅把巡查路线改了三次，最后仍然照Hedwig画的那张走；两个人都没有提这件事。
  _effects: state_parameter oj18-odd-apprenticeship.trust 40 -> 50; state_parameter oj18-odd-apprenticeship.strangeKnowledge 30 -> 40; state_parameter oj18-odd-apprenticeship.nightsWorked 24 -> 48; cash 2 (night-shift wages); skill_

- **1938.01** `p10-family-tasks.find-missing-kin/find-missing-kin.missing-list` tags: adulthood, family, social, marriage, care, inheritance, task, missing_kin
  失踪名册的纸很薄，办事员用钢笔一戳就洇开。Hedwig把编号条收进证夹，出门时有个女人问她是不是也找人。两人结伴去收容所，门房说名单上没这个人。回家路上女人说下星期还去，Hedwig点头。
  _effects: mood -0.09999999999999998; relation acquaintance with person-materialized-world-vienna-1912-9; flag +brother_missing_registered_

- **1938.06** `vienna-parish-aid.sick-call/sick-call.with-priest` tags: faith, parish, mutual_aid, poverty, family
  Hedwig觉得一个人去不合适，绕到教堂请了修女一同上楼。修女看过病人，留下药包和一小瓶圣水，说会从教区账上出钱请医生来看一趟。Emil Weiss在楼下等着，说这样妥当，病人家里没男人，多个见证人心里安稳。
  _effects: relation acquaintance with person-emil-weiss; mood 0.040000000000000036_

- **1938.09** `vienna-women-housework.wash-day/wash-day.quarrel` tags: gender, housework, home, labour, family
  铁桶磕在石沿上，水晃出来打湿了Hedwig的裙角。Berta Moser的声音拔高，说轮到她就是轮到她。Hedwig咬着嘴没再喊，把盆往自己门前拖，湿石板上一道水痕。
  _effects: mood -0.050000000000000044; reputation -0.020000000000000004_

- **1938.10** `vienna-life-overcrowded-flat/move-to-shared-tenement` tags: housing, home, health, family, household
  Hedwig把床架拆开，用绳子捆在借来的手推车上，搬进利奥波德城的合租房。押金和车钱花掉八克朗；新住处人多、墙薄，但至少每个人有一块能躺下的地方，Hedwig的腰在冷风里疼了一路，夜里却第一次不用侧着身睡。
  _effects: residence; cash -8 (deposit and cart)_

- **1939.01** `state_expire:oj18-odd-apprenticeship` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  Hedwig的「奇职学徒」到期；相关安排结束。
  _effects: state_remove oj18-odd-apprenticeship state:world-vienna-1912:254; role; flag -odd_job_apprentice_

- **1939.01** `agency:support_process` tags: agency, agency:support_process
  Hedwig想帮忙，但组织者不信任新来的人，只让其在外围等消息。
  _effects: mood -0.040000000000000036_

- **1939.02** `p9-gap-adult-unemployed.soup-kitchen/soup-pot-empty` tags: adulthood, unemployment, casual_labour, poverty, daily, relief, food, church
  前面还有七八个人时，Anna Berg已经直起腰把锅盖扣上了。队伍没散，有人骂了一句，有人蹲下把罐子收进布袋。Hedwig走到巷口，Anna Moser 2从后面赶上来，罐子还温着。
  _effects: food_

- **1939.11** `vienna-courtship-courtyard.family-table/leave-before-dessert` tags: adulthood, courtship, partner, social, family, partnership
  问到后来，Josefine Hofer提起别家有个更稳当的差事。Rosa Huber把餐巾往桌上一放，说吃好了，先走。两人在楼梯间站住，Rosa Huber说不是Hedwig的错，可下次再来还得一样坐这张桌子；Hedwig心里松了一点，也知道这顿饭没吃完，事情并没有过去。
  _effects: relation partner with person-materialized-world-vienna-1912-79; relation kin with person-josefine-hofer; mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-79_

- **1939.12** `p22-goat-heir::ctx-vienna-authoritarian-1934::milieu-tenement/goat-keeps-the-building` tags: inheritance, absurd, comic, goat, tenement, legal, rumor, public
  公证人念完遗嘱，整栋楼归一只叫“伯爵”的山羊所有，条件是它继续住在天井里。Hedwig和Franz Moser把租金记在羊的名下，每天轮流挤奶；半年后，房东太太的侄子来争产，看见山羊站在楼梯口，竟先脱帽行了个礼。那天夜里，羊睡在门房，钥匙挂在它的角上。
  _effects: state_add p22-wild-fortune state:world-vienna-1912:431; state_add p22-scandal-engine state:world-vienna-1912:432; cash 4 (rent surplus held in the goat name); relation friend with person:evt:world-vienna-1912:001031:child; flag +goat_kept_building; mood 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-38; flag +wild_fortune_active; flag +scandal_engine_active_

- **1940.01** `hist15-occ.work-permit::ctx-vienna-authoritarian-1934::milieu-tenement/permit-granted` tags: occupation, work, permit, institution, shortage, history, vienna, urban
  Anna Berg在通行证上盖了章，又用铅笔在角落写了一个日期。Hedwig拿到许可，可以去城西的修配厂上工；走出劳动局时，Hedwig把证件摸了三遍，确认它还在口袋里。
  _effects: cash -2 (通行证手续费); role; flag +work_permit_granted; knowledge “城西修配厂只认盖蓝章的通行证。”_

- **1940.01** `state_tick:p22-wild-fortune/the-story-gets-taller/a-witness-asks-for-proof` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  一个见证人要求Hedwig拿出证据。Hedwig翻遍抽屉，只找到一张被水浸过的收据；那天晚上，街上的故事换了主角，Hedwig的名字被挪到了最后一行。
  _effects: state_parameter p22-wild-fortune.height 55 -> 49; state_parameter p22-wild-fortune.witnesses 60 -> 55; state_parameter p22-wild-fortune.fragility 45 -> 52; mood -0.030000000000000027_

- **1940.01** `state_tick:p22-scandal-engine/the-rumor-learns-new-words/the-story-turns-on-its-keeper` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  一个曾经替Hedwig传话的人搬走了，带走了半条街的信任。第二天，信箱里多了一张没有署名的明信片，上面只写着“我还记得”；Hedwig把明信片翻过来，背面是空的。
  _effects: state_parameter p22-scandal-engine.heat 30 -> 37; state_parameter p22-scandal-engine.reach 45 -> 50; state_parameter p22-scandal-engine.leverage 35 -> 31; state_parameter p22-scandal-engine.shame 15 -> 21; mood -0.020000000000000018_

- **1940.01** `agency:support_process` tags: agency, agency:support_process
  Hedwig为Wiener Psychoanalytische Vereinigung在Berggass出了力：整理名单、传递消息或替同伴作证，名字被记进参与记录。
  _effects: historical development:initiative-org-wednesday-psychological-society-1934 as supporter; historical_influence; reputation 0.015_

- **1940.05** `vienna-historical-social-movement.public-meeting/stay-and-tidy-chairs` tags: history, historical_process, social_movement, organization, politics
  椅子叠到一半，Franz Berg压低声音说今晚有三个人没投票就走了。Hedwig把最后一块瓜子壳扫进簸箕，说记住那三张脸，比上台多说一句有用。灯熄时大厅只剩木头发出的轻响。
  _effects: skill; relation acquaintance with person-materialized-world-vienna-1912-57; mood -0.020000000000000018_

- **1940.08** `r15-curse.betrayal-at-table::ctx-vienna-authoritarian-1934::milieu-tenement/sold-a-secret` tags: betrayal, social, family, trust, secret, vienna, urban, crisis
  Anton Bauer 2把Hedwig在饭桌上说过的名字和地址卖给了别人。几天后，Hedwig发现自己的话出现在一封不该出现的信里。Anton Bauer 2没有否认，只说“大家都要活”。
  _effects: mood -0.12; flag +betrayed_after_trusting; relation rival with person-materialized-world-vienna-1912-109; state_add under-investigation state:world-vienna-1912:483; relation acquaintance with person-materialized-world-vienna-1912-109_

- **1940.08** `state_reaction:cursed-by-wish/curse-betrayal` tags: cursed-by-wish, wish, curse, supernatural, revenge, special, state, state_reaction
  背叛发生后的夜里，Hedwig听见墙里有一声很轻的响。第二天，Anton Bauer 2病倒了；没有人把这两件事放在一起。
  _effects: health -0.18 (the curse answers a real betrayal); condition; state_parameter cursed-by-wish.triggers 1 -> 2; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:008298_

- **1940.09** `p9-gap-adult-ordinary-day.market-closing/market-closing.fish-heads` tags: adulthood, daily, leisure, neighborhood, ordinary, market, food, bargain
  鱼头用报纸包着，报纸上还印着昨天的广告。Josef Weiss一边刮冰一边说，回去多搁姜，别舍不得醋。Hedwig把纸包拎在手里，能感觉到凉气从指缝里钻出来，走到家时报纸已经洇湿了一层。
  _effects: food; health 0.019999999999999997 (喝上了热鱼汤); relation acquaintance with person-materialized-world-vienna-1912-112_

- **1941.01** `r15-curse.aftermath::ctx-vienna-authoritarian-1934::milieu-tenement/fear-spreads` tags: curse, fear, supernatural, revenge, vienna, urban, crisis, war
  Berta Moser病倒以后，楼里开始有人避开Hedwig。没有人说是诅咒，但每个人都在数Hedwig最近和谁说过话。
  _effects: reputation -0.04000000000000001; flag +curse_suspected_
  _causes: evt:world-vienna-1912:007748_

- **1941.01** `office16-admin.quiet-ledger::ctx-vienna-authoritarian-1934::milieu-tenement/balanced` tags: office, administration, budget, competence, quiet, power, vienna, urban
  Hedwig用三个月把账本上的零碎支出并成四类，又停掉两份没有人看的简报。年底结账时，Berta Huber发现不仅没有赤字，还剩下够换一批档案柜的钱；没有剪彩，只有仓库里新柜子的木头味。
  _effects: organization_funds; reputation 0.04; skill; mood 0.020000000000000018; flag +balanced_the_books; knowledge “停掉两份简报、合并零碎支出后，年底还剩一笔够换档案柜的钱。”_

- **1941.01** `state_tick:under-investigation/case-progress/evidence` tags: under-investigation, legal, police, investigation, risk, state, state_tick
  调查员又来找Hedwig谈了一次。问话比上次具体，记录也比上次长。
  _effects: state_parameter under-investigation.progress 15 -> 30; mood -0.040000000000000036_

- **1941.01** `agency:support_process` tags: agency, agency:support_process
  Hedwig想帮忙，但组织者不信任新来的人，只让其在外围等消息。
  _effects: mood -0.040000000000000036_

- **1941.02** `bc18-ghost.death-certificate::ctx-vienna-authoritarian-1934::milieu-tenement/correct-it-twice` tags: bureaucracy, legal, death, identity, mistake, paperwork, absurd, vienna
  Hedwig在窗口要求更正，Anton Kral把表格翻了三遍，最后开出一张新的出生证明，名字却少了一个字母。于是城里同时住着一个死人、一个活人，和一个只在档案里出生的陌生人。Hedwig拿着两张纸站在区公所门口，忽然不知道该用哪一张去领下个月的煤票。
  _effects: cash -1 (更正材料的手续费和车钱); state_add bc18-bureaucratic-ghost state:world-vienna-1912:544; relation rival with person-materialized-world-vienna-1912-7; condition; flag +two_living_files_one_death; relation acquaintance with person-materialized-world-vienna-1912-110; flag +bureaucratic_ghost; mood -0.010000000000000009_

- **1941.03** `vienna-housing-move.rent-notice/rent-notice-neighbors-together` tags: housing, home, rent, family, money
  Hedwig把Franz Berg和楼里另两户人家叫到楼道，把那张纸摆在窗台上传看。看门人在楼梯拐角听着，说房东礼拜三来收钱。几家人合计好，到那天一起等在门厅，先把克朗递过去，再把修补的事一件件摆出来。Hedwig把纸折进围裙口袋，觉得人凑齐了话也硬气些。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-57; mood 0.040000000000000036; flag +tenant_collective_

- **1941.04** `hs18-cinema.newsreel::ctx-vienna-authoritarian-1934::milieu-tenement/recognize-a-neighbor` tags: cinema, newsreel, neighbor, recognition, media, history, vienna, urban
  银幕上是城西的街口，镜头扫过一排晾衣绳。Hedwig认出绳下站着Franz Bauer，也认出旁边那个被两名便衣夹住的人。散场灯亮时，Franz Bauer还在笑，Hedwig却把围巾往上拉了拉。
  _effects: knowledge “新闻片里那个被便衣夹住的人，我认识。”; relation acquaintance with person-materialized-world-vienna-1912-26; flag +recognized_neighbor_on_newsreel; mood -0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-26; relation acquaintance with person-materialized-world-vienna-1912-36_

- **1942.01** `vienna-life-injury-recovery/wound-infection` tags: health, work, family
  Hedwig的伤口在几天后肿起来，手腕发热。医生说要切开引流，费用比上次更高；Hedwig看着账单，先问能不能分两次付。
  _effects: cash -14 (drainage and medicine); condition_
  _causes: evt:world-vienna-1912:008299_

- **1942.01** `office16-rival.removal-motion::ctx-vienna-authoritarian-1934::milieu-tenement/motion-carries` tags: office, rivalry, politics, removal, power, intrigue, vienna, urban
  投票结果是十九比十七。Hedwig把印章、钥匙和一本写满批注的账本放进纸箱，最后一圈走廊走得比平时慢。Katharina Hofer 2在门口等着接手，手里已经拿着新的编制表；表上第一个被划掉的名字是Hedwig的秘书。
  _effects: position_end 夜班饲养员 @zoo:person-phase15-Hedwig-world-vienna-1912-evt:world-vienna-1912:005746; reputation -0.05000000000000001; mood -0.04999999999999982; condition; relation rival with person-materialized-world-vienna-1912-45; flag +removed_by_vote; knowledge “新编制表第一个划掉的是我的秘书。”_

- **1942.01** `state_expire:p22-scandal-engine` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Hedwig的「流言发动机」到期；相关安排结束。
  _effects: state_remove p22-scandal-engine state:world-vienna-1912:432; flag -scandal_engine_active_

- **1942.01** `state_tick:under-investigation/case-progress/evidence` tags: under-investigation, legal, police, investigation, risk, state, state_tick
  调查员又来找Hedwig谈了一次。问话比上次具体，记录也比上次长。
  _effects: state_parameter under-investigation.progress 30 -> 45_

- **1942.01** `state_tick:bc18-bureaucratic-ghost/paper-trail-year/another-window-opens` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  一个税务员把Hedwig的死亡记录和一张新房租收据订在一起，寄到了另一个区。三个星期后，Hedwig收到一封要求“已故纳税人”补缴暖气税的信；去问时，窗口说档案正在路上，让Hedwig先等通知。通知没有来，房租却涨了。
  _effects: state_parameter bc18-bureaucratic-ghost.fileDepth 40 -> 47; state_parameter bc18-bureaucratic-ghost.risk 15 -> 25; cash -1 (跑窗口的车钱); flag +heating_tax_for_the_dead_

- **1942.01** `kernel-civic.petition-drive::ctx-vienna-authoritarian-1934::milieu-tenement/civic-petition-refused` tags: politics, petition, reform, neighbor, organization, vienna, urban, crisis
  她把签名纸送到市政厅，Anna Berg说格式不对，要按街道分开。她回去重抄，发现有几个名字已经认不出；再去时，窗口换了一个人，说前一班没有交接。她坐在市政厅台阶上重抄，风把纸吹到花坛里。
  _effects: flag +petition_refused; reputation 0.020000000000000004; relation acquaintance with person-materialized-world-vienna-1912-12; cash -0.5 (重抄签名纸的纸笔钱); knowledge “请愿书要按街道分页，窗口换班时前一班可能没有交接”_

- **1942.01** `p9-social-tenement-neighbors.gramophone-wall/gramophone-wall.caretaker-notice` tags: housing, neighbors, tenement, daily, money, reputation
  Hedwig去找看门人，说院子里四面墙，声音绕不出去。第二天楼梯间的木板上贴了一张纸：晚上十点后请勿放留声机，鞋匠铺也请收锤。纸条没有落款，只有房东事务所的戳。Klara路过时看了很久，把留声机的盖子合上了。
  _effects: mood 0.040000000000000036; relation acquaintance with person-phase15-Klara-world-vienna-1912_

- **1942.01** `df18-blessing.laundry-water::ctx-vienna-authoritarian-1934::milieu-tenement/sit-with-the-stain` tags: blessing, omen, water, faith, fraud, consolation, religious, eerie
  洗衣房的墙上有一块水渍，形状像一个披着斗篷的女人。Hedwig第一次看见时，正好腰疼得直不起来；她点了一根蜡烛，坐了十分钟，疼没有消失，但呼吸慢了下来。Josefine Hofer说那是圣母，Hedwig没有纠正，也没有把水渍擦掉。
  _effects: cash -1 (洗衣房里的一根蜡烛); health 0.01 (坐着休息了一会儿); mood 0.030000000000000027; knowledge “洗衣房的水渍像一个披斗篷的女人，我在它面前坐了一会儿。”; flag +df18_water_stain_consolation_

- **1943.01** `r15-curse.aftermath::ctx-vienna-authoritarian-1934::milieu-tenement/quiet-mercy` tags: curse, fear, supernatural, revenge, vienna, urban, crisis, war
  Anton Bauer 2病好以后来敲过门。两个人隔着门槛站了很久。Hedwig没有说原谅，只把一包药放在对方手里。Anton Bauer 2走后，Hedwig把门关上，背靠着它坐了一会儿。
  _effects: mood 0.050000000000000044; relation acquaintance with person-materialized-world-vienna-1912-109; relation acquaintance with person-materialized-world-vienna-1912-107_
  _causes: evt:world-vienna-1912:008298_

- **1943.01** `vienna-family-divorce/partner-moves-to-shared-housing` tags: family, marriage, divorce, housing, lifecycle, separation, household
  Rosa Huber把一只箱子和工票搬去合租房，带走一半锅碗。Hedwig留在Leopoldstädter Zinshaus, gemeinsamer Gang，把空出来的床租给一个学徒，用租金补房租；搬家花掉四克朗，Hedwig在户籍上成了分居的人，夜里听见隔壁床板响，总要愣一下。
  _effects: relation_end partner with person-materialized-world-vienna-1912-79; household; cash -4 (moving and separate goods); mood -0.050000000000000044; role_

- **1943.01** `curse15-notice.borrowed-mourning::ctx-vienna-authoritarian-1934::milieu-tenement/sells-the-mourning` tags: curse, money, fear, client, ritual, supernatural, work, vienna
  Elisabeth Bauer请Hedwig去家里坐一夜，说只要Hedwig在灵堂待到天亮，那个欠钱的人就会自己上门。Hedwig收了钱，在灵堂坐到天亮，什么也没有发生。一个月后，那个人真的来了，送来一袋面粉；Elisabeth Bauer把面粉分给Hedwig一半，没有解释。
  _effects: cash 3 (替人守灵的酬劳); reputation -0.03_

- **1943.01** `state_expire:p22-wild-fortune` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  Hedwig的「荒唐横财」到期；相关安排结束。
  _effects: state_remove p22-wild-fortune state:world-vienna-1912:431; flag -wild_fortune_active_

- **1943.01** `state_expire:under-investigation` tags: under-investigation, legal, police, investigation, risk, state, state_tick, state:under-investigation
  Hedwig的「被调查」到期；相关安排结束。
  _effects: state_remove under-investigation state:world-vienna-1912:483_

- **1943.01** `state_tick:bc18-bureaucratic-ghost/paper-trail-year/kept-the-files-apart` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  这一年，Hedwig学会了同时带三张纸出门：一张证明活着，一张证明死了，一张证明自己从没搬过家。窗口后面的人各自只看自己那一张，偶尔还会夸Hedwig的材料齐全。年底，Hedwig从补发的配给里省下一小袋面粉，觉得自己像个熟练的走私犯。
  _effects: state_parameter bc18-bureaucratic-ghost.fileDepth 47 -> 51; state_parameter bc18-bureaucratic-ghost.risk 25 -> 20; cash 1 (省下的配给和车钱); mood 0.010000000000000009_

- **1943.01** `p9-social-relationship-initiative.introduce-two-people/let-them-talk` tags: courtship, friendship, family, social, initiative, housing, task, task:social
  星期天下午窗边三把椅子，介绍只用了两句，随后就任两人自己聊。老友讲印厂的油墨味，缝纫女工讲机针怎么断。有人只管叫侍者续咖啡，三杯一共九十赫勒，坐在旁边听了一下午。
  _effects: cash -0.9 (三杯咖啡和给侍者的小费); relation friend with person:evt:world-vienna-1912:002078:child; relation acquaintance with person-materialized-world-vienna-1912-29; skill; mood 0.050000000000000044; relation acquaintance with person-materialized-world-vienna-1912-29_

- **1943.01** `initiative:found_process:zoo:person-phase15-Hedwig-world-vienna-1912-evt:world-vienna-1912:005746`
  普拉特动物园夜班队在Leopoldstädter Zinshaus, gemeinsamer Gang经过数年的招募、会议和互助，把分散的行动整理成公开纲领；这不是预先写好的历史，而是成员自己累积出来的运动。
  _effects: historical process 普拉特动物园夜班队的持续运动; historical development:initiative-zoo:person-phase15-Hedwig-world-vienna-1912-evt:world-vienna-1912:005746-1943 as organizer; historical development:initiative-zoo:person-phase15-Hedwig-world-vienna-1912-evt:world-vienna-1912:005746-1943 as organizer; historical development:initiative-zoo:person-phase15-Hedwig-world-vienna-1912-evt:world-vienna-1912:005746-1943 as organizer; knowledge “普拉特动物园夜班队的持续运动不是一次会议，而是我们这些年积累出来的持续组织。”; reputation 0.039999999999999994_

- **1943.01** `historical_phase`
  历史进程《普拉特动物园夜班队在Leopoldstädter Zinshaus, gemeinsamer Gang经过数年的招募、会议和互助，把分散的行动整理成公开纲领；这》从 emerging 进入 mobilizing。
  _effects: knowledge “我亲历或知晓「普拉特动物园夜班队在Leopoldstädter Zinshaus, gemeinsamer Gang经过”; knowledge “我亲历或知晓「普拉特动物园夜班队在Leopoldstädter Zinshaus, gemeinsamer Gang经过”; knowledge “我亲历或知晓「普拉特动物园夜班队在Leopoldstädter Zinshaus, gemeinsamer Gang经过”_
  _causes: evt:world-vienna-1912:009679_

- **1943.02** `ds17-courtship.parlour::ctx-vienna-authoritarian-1934::milieu-tenement/the-second-sunday` tags: love, courtship, intimacy, secret, class, secret_intimacy, vienna, urban
  Hedwig在约瑟夫城租下一间带钢琴的会客室，每小时一克朗，女房东把钥匙拴在一截蓝线上。Anton Bauer 2来时带着一束用报纸包好的紫罗兰，Franz Lechner坐在窗边打毛线，偶尔抬头看一眼钟。第三个星期日，Franz Lechner说自己要去楼下买咖啡，把门留了半掩。
  _effects: state_add forbidden-attachment state:world-vienna-1912:641; relation friend with person-materialized-world-vienna-1912-109; cash -1 (the parlour, the coffee and a bunch of violets); mood 0.040000000000000036; flag +rented_a_parlour; flag +secret_attachment_active_

- **1943.07** `bc18-fame.wrong-bust::ctx-vienna-authoritarian-1934::milieu-tenement/hired-as-living-exhibit` tags: fame, mistaken_identity, museum, public, invention, absurd, status, humiliation
  Hedwig在办公室承认自己连火柴头用什么配都不知道。Katharina Hofer沉默了一会儿，忽然问Hedwig愿不愿意每周三下午坐在展厅里，给参观者演示“发明家如何沉思”。酬劳是三克朗，外加一顶借来的礼帽。第一个周三，Hedwig坐了四个小时，只被一个孩子问过“你会不会变魔术”。
  _effects: cash 3 (扮演活展品的酬劳); state_add bc18-ridiculous-fame state:world-vienna-1912:642; role; relation colleague with person-materialized-world-vienna-1912-38; flag +hired_as_living_exhibit; mood 0.010000000000000009; flag +ridiculously_famous; reputation 0.020000000000000004; mood 0.020000000000000018_

- **1943.07** `state_reaction:bc18-bureaucratic-ghost/another-file-opened` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  Hedwig刚在一个窗口证明自己活着，另一个窗口又从抽屉里抽出一张死亡通知。两个办事员隔着走廊互相看了一眼，谁也没有先开口；Hedwig站在中间，忽然明白自己不是一个人，而是一份正在被转抄的卷宗。
  _effects: state_parameter bc18-bureaucratic-ghost.risk 20 -> 32; state_parameter bc18-bureaucratic-ghost.duplicates 2 -> 3; state_parameter bc18-bureaucratic-ghost.sightings 2 -> 3; flag +another_file_opened; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:009910_

- **1943.07** `state_reaction:bc18-ridiculous-fame/reprinted-wrong` tags: bc18-ridiculous-fame, fame, reputation, mistaken_identity, promotion, media, absurd, public
  报纸的周末副刊又把Hedwig的旧照片翻出来，配上一个更整齐的故事：发明、失败、谦逊的晚年。Hedwig写信去更正，编辑回了一张便条，说读者喜欢现在这个版本。
  _effects: state_parameter bc18-ridiculous-fame.notoriety 30 -> 36; state_parameter bc18-ridiculous-fame.absurdity 80 -> 85; state_parameter bc18-ridiculous-fame.legitimacy 18 -> 14; flag +story_reprinted_wrong; mood -0.010000000000000009_
  _causes: evt:world-vienna-1912:009910_

- **1943.08** `vienna-medical-treatment.toothache/barber-pull` tags: health, medical, family, money
  Hermann Hofer在门口替Hedwig捏着帽子，听见里面一声闷哼。弗朗茨把牙扔进搪瓷盘，说瞧这牙根都黑了。收钱时他多要了二十赫勒，算明矾水的钱，说下次别再拖成这样。
  _effects: cash -1.2 (理发师拔牙收费); health 0.03 (病牙被拔除但手法粗糙); mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-66_

- **1944.01** `curse15-notice.the-second-illness::ctx-vienna-authoritarian-1934::milieu-tenement/calls-it-a-fever` tags: curse, notice, illness, fear, knowledge, supernatural, vienna, urban
  医生说只是换季的烧，Hedwig便也这么说。第二次退烧后，Hedwig把那张写满日期的纸烧了，灰倒进花盆。花盆里的植物活了下来，Hedwig因此更愿意相信巧合，也不再去数下一个十一天。
  _effects: flag +curse_dismissed_as_fever; condition; mood 0.030000000000000027_

- **1944.01** `state_tick:bc18-bureaucratic-ghost/paper-trail-year/another-window-opens` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  一个税务员把Hedwig的死亡记录和一张新房租收据订在一起，寄到了另一个区。三个星期后，Hedwig收到一封要求“已故纳税人”补缴暖气税的信；去问时，窗口说档案正在路上，让Hedwig先等通知。通知没有来，房租却涨了。
  _effects: state_parameter bc18-bureaucratic-ghost.fileDepth 51 -> 58; state_parameter bc18-bureaucratic-ghost.risk 32 -> 42; cash -1 (跑窗口的车钱); mood -0.030000000000000027_

- **1944.01** `state_tick:forbidden-attachment/discretion-year/still-hidden` tags: forbidden-attachment, love, intimacy, secret, courtship, secret_intimacy, state, state_tick
  Hedwig把那段关系继续藏在日常的缝隙里。一次擦肩、一张没有署名的纸条、借来的半个钟头，都足够撑过这个月；回家前Hedwig在街角站了一会儿，把围巾重新系好。
  _effects: state_parameter forbidden-attachment.exposure 5 -> 0; state_parameter forbidden-attachment.reciprocity 50 -> 53; mood 0.020000000000000018_

- **1944.01** `state_tick:bc18-ridiculous-fame/ridiculous-fame-year/the-audience-gets-bored` tags: bc18-ridiculous-fame, fame, reputation, mistaken_identity, promotion, media, absurd, public
  观众开始厌倦同一个故事。园艺会请了更年轻的发明家，女子学校把Hedwig的名字从海报上撤下；Hedwig在咖啡馆听见有人说“那个人还在讲火柴”。同一个月，一张报纸把旧照片配上新标题，问Hedwig是否已经“过气”。纠正的冲动又回来，但没有人再提问。
  _effects: state_parameter bc18-ridiculous-fame.legitimacy 14 -> 6; state_parameter bc18-ridiculous-fame.boredom 10 -> 22; state_parameter bc18-ridiculous-fame.invitations 1 -> 0; reputation -0.020000000000000004; mood -0.030000000000000027_

- **1944.01** `r14-spec.priest-confession::ctx-vienna-authoritarian-1934::milieu-tenement/the-name-on-paper` tags: faith, confession, priest, secret, crisis, vienna, urban, war
  Hedwig在警局把名字写在纸上，写完才发现手在抖。Ferdinand Stein当天下午被带走，家里的窗户一直黑着。Luise Kral 2把Hedwig叫去，说告解的秘密不是拿来换良心的。Hedwig回到教堂，跪了很久，听见Otto Weiss在祭坛后面钉一块松动的木板。
  _effects: mood -0.14000000000000012; reputation -0.2; flag +spec14_confession_broken; relation rival with person-materialized-world-vienna-1912-77; relation rival with person-materialized-world-vienna-1912-33; knowledge “the police acted on a confession that should have been seale”; relation acquaintance with person-materialized-world-vienna-1912-77_

- **1944.11** `major-crisis.rent-increase/tenant-meeting` tags: crisis, housing, rent, eviction, family, poverty
  巷口洗衣房的老板娘把几张椅子摆开，叫来半条街的租户。Hedwig把涨租单摊在桌上，逐条念出上面的数字；Anna Kraus站在门边，既没走，也没替房东说话。大家决定先集体迟交一个月，签名纸传到Hedwig手里时，纸上已经有一块油渍。
  _effects: cash -2 (paper, ink and tram fare for the tenants meeting); role; flag +rent_strike; relation acquaintance with person:evt:world-vienna-1912:002456:child; reputation 0.02999999999999997_

- **1945.01** `vienna-life-1945-liberation/survives` tags: war, liberation, 1945
  苏联士兵进城时，Hedwig躲在门后听见坦克履带压过石板路。几天后街口贴出告示，Hedwig去领了一份汤和一块面包。
  _effects: role; food; cash -2 (replacement documents)_

- **1945.01** `curse15-betrayal.name-on-the-list::ctx-vienna-authoritarian-1934::milieu-tenement/denounced` tags: betrayal, politics, investigation, curse, denunciation, secret, vienna, urban
  Maria Winter把Hedwig在夜里说过的话整理成三页纸，交到了办事处。纸上没有一句是假的，但每一句都离开了原来的房间。第二天，Hedwig被叫去问话，问话的人已经知道该问什么。Maria Winter在走廊里遇见Hedwig，点了头，像只是借过一支笔。
  _effects: state_add suspected-witchcraft state:world-vienna-1912:697; reputation -0.06; relation rival with person:evt:world-vienna-1912:000549:child; flag +denounced_by_known_person_

- **1945.01** `state_reaction:forbidden-attachment/betrayal-widens-the-secret` tags: forbidden-attachment, love, intimacy, secret, courtship, secret_intimacy, state, state_reaction
  背叛发生以后，Hedwig发现那间借来的房间不再安全。有人知道钥匙放在哪块砖下面，也知道信该在星期几寄出；Hedwig没有去质问，只把能烧的纸先烧了。
  _effects: state_parameter forbidden-attachment.exposure 0 -> 20; state_parameter forbidden-attachment.jealousy 0 -> 20; state_parameter forbidden-attachment.grief 0 -> 10; relation friend with person-materialized-world-vienna-1912-109_
  _causes: evt:world-vienna-1912:010429_

- **1945.01** `state_reaction:cursed-by-wish/curse-betrayal` tags: cursed-by-wish, wish, curse, supernatural, revenge, special, state, state_reaction
  背叛发生后的夜里，Hedwig自己发起了高烧；Maria Winter第二天照常出门。没有人把这两件事放在一起。
  _effects: state_parameter cursed-by-wish.triggers 2 -> 3_
  _causes: evt:world-vienna-1912:010429_

- **1945.01** `state_expire:bc18-bureaucratic-ghost` tags: bc18-bureaucratic-ghost, bureaucracy, identity, paperwork, death, mistake, legal, absurd
  Hedwig的「档案里的活鬼」到期；相关安排结束。
  _effects: state_remove bc18-bureaucratic-ghost state:world-vienna-1912:544; flag -bureaucratic_ghost_

- **1945.01** `state_tick:forbidden-attachment/discretion-year/still-hidden` tags: forbidden-attachment, love, intimacy, secret, courtship, secret_intimacy, state, state_tick
  Hedwig把那段关系继续藏在日常的缝隙里。一次擦肩、一张没有署名的纸条、借来的半个钟头，都足够撑过这个月；回家前Hedwig在街角站了一会儿，把围巾重新系好。
  _effects: state_parameter forbidden-attachment.exposure 20 -> 15; state_parameter forbidden-attachment.reciprocity 53 -> 56; mood 0.020000000000000018_

- **1945.01** `state_expire:bc18-ridiculous-fame` tags: bc18-ridiculous-fame, fame, reputation, mistaken_identity, promotion, media, absurd, public
  Hedwig的「荒唐的名声」到期；相关安排结束。
  _effects: state_remove bc18-ridiculous-fame state:world-vienna-1912:642; flag -ridiculously_famous_

- **1945.01** `p9-work-jobsearch.ask-trial/ask-trial.deposit-refused` tags: work, job_search, negotiation, wages, employment, task, trial, factory
  “十克朗押金，先交后干。”Elisabeth Moser 3说得很平。Hedwig把两只口袋翻给人家看，柜台上只落下一张皱车票。工头收回话头，他也不再问，提着帽子走出栅栏。
  _effects: mood -0.020000000000000018; reputation -0.010000000000000009; relation acquaintance with person-materialized-world-vienna-1912-126_

- **1945.05** `vienna-historical-social-movement.district-list/organize-relief-table` tags: history, historical_process, social_movement, organization, politics
  Emil Weiss从围裙里掏出几张揉皱的收据，Hedwig把它们按日期排开。屋外有人上楼，脚步在门口停了一下又走了。Hedwig把新表折成四折塞进衣袋，说先管这条街，别的明天再说。
  _effects: skill; relation acquaintance with person-emil-weiss; mood 0.030000000000000027_

- **1945.09** `vienna-medical-treatment.night-fever/hospital-night` tags: health, medical, family, money
  电车在环城大道上哐当响，Josef Bauer 2攥着Hedwig的胳膊，怕人从座位上滑下去。急诊厅的煤气灯发黄，长椅上全是咳嗽声，押金窗口的铜盘递出两克朗，换来一张硬纸号牌。
  _effects: cash -2 (医院急诊押金); health 0.08 (急诊观察和冰敷退烧); relation friend with person-materialized-world-vienna-1912-70_

- **1946.01** `curse15-notice.borrowed-mourning::ctx-vienna-postwar-1945::milieu-tenement/refuses-the-money` tags: curse, money, fear, client, ritual, supernatural, work, vienna
  Mitzi Hofer把钱推过来，Hedwig又推回去。Hedwig说自己只是倒霉，不是什么会看事的人。Mitzi Hofer把钱留在桌上走了，第二天又派人来取。Hedwig把那一夜省下来的蜡烛收进柜子，没有点过。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-44; flag +refused_curse_work; mood 0.020000000000000018_

- **1946.01** `state_tick:forbidden-attachment/discretion-year/still-hidden` tags: forbidden-attachment, love, intimacy, secret, courtship, secret_intimacy, state, state_tick
  Hedwig把那段关系继续藏在日常的缝隙里。一次擦肩、一张没有署名的纸条、借来的半个钟头，都足够撑过这个月；回家前Hedwig在街角站了一会儿，把围巾重新系好。
  _effects: state_parameter forbidden-attachment.exposure 15 -> 10; state_parameter forbidden-attachment.reciprocity 56 -> 59; mood 0.020000000000000018_

- **1946.01** `state_tick:suspected-witchcraft/rumor-season/whispers-fade` tags: suspected-witchcraft, witchcraft, rumor, religion, legal, reputation, fear, supernatural
  一年过去，Hedwig没有再点蜡烛，也没有再去那家后间。教堂的登记册翻到了新的一页，旧页边缘留着指甲划过的痕迹；街上的人开始讨论别的事。
  _effects: state_parameter suspected-witchcraft.evidence 20 -> 12; mood 0.020000000000000018_

- **1946.01** `r13-civ.collect-signatures::ctx-vienna-postwar-1945::milieu-tenement/shopkeeper-reported` tags: politics, petition, signatures, institution, neighborhood, vienna, urban, postwar
  杂货店老板看见Hedwig在门口拦人，转身进了后屋。第二天，巡警在巷口等Hedwig，问签名纸是谁起的头。Hedwig说没有头，巡警把纸收走，说带回去看看。
  _effects: reputation -0.08000000000000002; flag +petition_reported_to_police; relation rival with person-materialized-world-vienna-1912-14; knowledge “the shopkeeper told the police who started the petition”_

- **1946.02** `vienna-women-housework.wash-day/wash-day.quarrel` tags: gender, housework, home, labour, family
  水龙头滴滴答答地漏，两人都伸手去扶桶沿。Hedwig看见自家未洗的床单还堆着，胸口发闷，把桶让了半掌宽。晾绳上她的衬衣角被风掀起，正挡着邻家的窗户。
  _effects: mood -0.050000000000000044; reputation -0.020000000000000018_

- **1946.04** `vienna-tenement-neighbors.shared_stove_fire/fire_scald_hand` tags: home, social, family, housing
  Hedwig在合租房走廊的公用灶台上煮土豆，转身取盐时袖子扫翻了铁锅，滚水浇在左手背上。Luise Kral 3从隔壁冲出来，扯下自己的围裙裹住烫伤处，又跑下楼叫来住在二楼的接生婆。接生婆用蛋清和旧亚麻布包扎，嘱咐三天不能沾水。
  _effects: relation friend with person-materialized-world-vienna-1912-97_

- **1946.06** `oj18-mortuary.first-body::ctx-vienna-postwar-1945::milieu-tenement/refused-the-child` tags: death, mortuary, funeral, work, odd_job, night, everyday, vienna
  Hedwig跟着Alois Berg 2进到后间，看见一具孩子的棺材，尺寸只比鞋盒大一点。Hedwig把毛巾放回盆里，说自己做不了。Alois Berg 2没有劝，只把当天的工钱数给Hedwig；那枚铜板在口袋里响了一路，像有人在后面跟着。
  _effects: cash 1 (a day's mortuary pay); relation acquaintance with person-materialized-world-vienna-1912-116; condition; flag +refused_mortuary; knowledge “那具孩子的棺材只比鞋盒大一点，{master}没有劝我留下。”; relation acquaintance with person-materialized-world-vienna-1912-116_

- **1947.01** `curse15-aftermath.the-inquiry::ctx-vienna-postwar-1945::milieu-tenement/a-statement-is-taken` tags: witchcraft, investigation, reputation, rumor, legal, aftermath, vienna, urban
  Josef Weiss把Hedwig叫进办公室，桌上摊着Otto Weiss交来的三页证词。Hedwig逐条回答，Josef Weiss逐条记录，写到“是否曾诅咒他人”时停了很久。最后Hedwig被允许回家，但门口多了一个每月来一次的访客。
  _effects: state_parameter suspected-witchcraft.danger 25 -> 50; state_parameter suspected-witchcraft.evidence 12 -> 22; condition; reputation -0.04999999999999999; relation acquaintance with person-materialized-world-vienna-1912-112; relation rival with person-materialized-world-vienna-1912-29; mood -0.040000000000000036_

- **1947.01** `state_tick:forbidden-attachment/discretion-year/seen-in-the-street` tags: forbidden-attachment, love, intimacy, secret, courtship, secret_intimacy, state, state_tick
  Hedwig和那人在剧院后门分开时，被楼上的住户看见了。第二天，邻居的问话里多了一个不该出现的名字；Hedwig没有承认，只把外套挂到柜子最里面。
  _effects: state_parameter forbidden-attachment.exposure 10 -> 25; state_parameter forbidden-attachment.jealousy 20 -> 25; reputation -0.03999999999999998_

- **1947.01** `state_tick:suspected-witchcraft/rumor-season/whispers-fade` tags: suspected-witchcraft, witchcraft, rumor, religion, legal, reputation, fear, supernatural
  一年过去，Hedwig没有再点蜡烛，也没有再去那家后间。教堂的登记册翻到了新的一页，旧页边缘留着指甲划过的痕迹；街上的人开始讨论别的事。
  _effects: state_parameter suspected-witchcraft.evidence 22 -> 14; mood 0.020000000000000018_

- **1947.01** `r13-civ.enter-hospital::ctx-vienna-postwar-1945::milieu-tenement/admitted-third-class` tags: health, hospital, admission, deposit, institution, vienna, urban, postwar
  Friedrich Berg把押金收据和住院单钉在一起，让Hedwig去三楼东侧等床。走廊里全是折叠床，Mitzi Bauer给Hedwig一条洗得发硬的毯子，说今晚先别喝水。Hedwig把鞋塞在枕头下面，听着隔壁的呻吟睡了过去。
  _effects: cash -8 (住院处窗口的押金); health 0.05999999999999999 (住院处窗口的押金); condition; flag +hospitalized_third_class; relation acquaintance with person-materialized-world-vienna-1912-140; relation acquaintance with person-materialized-world-vienna-1912-75; relation acquaintance with person-materialized-world-vienna-1912-140_

- **1947.01** `vienna-parish-aid.rent-box/rent-box.accept-all` tags: faith, parish, mutual_aid, poverty, family
  煤袋落在台阶上，扬起细细一层黑末。Alois Kral用铅笔头在蓝格册上写门牌号，问房东姓什么，又叮嘱别把面包票弄丢。灶上水壶开始叫，Hedwig才想起屋里连只干净的杯子都没有。
  _effects: cash 6 (互助会补上本月房租差额); food; relation acquaintance with person-materialized-world-vienna-1912-14; flag +parish_registered_

- **1947.12** `vienna-social-movement.recruitment/read-and-decline` tags: development, social_movement, organization, politics
  Hedwig把传单读了两遍，记下上面的地址，却没有去。第二天照常上工；午休时听见两个工友低声谈论同一场集会。
  _effects: mood -0.010000000000000009; relation acquaintance with person-materialized-world-vienna-1912-138_

- **1948.01** `vienna-tenement-neighbors.laundry_line_dispute/compromise_split_line` tags: home, social, family, housing
  Hedwig把洗好的床单搭上院子里的公用晾衣绳，占了整条。Luise Kral 3抱着一盆湿衣服下来，说自家孩子明天要穿干净衬衫上学。两人在绳子两头扯了一阵，最后Hedwig把床单对折，腾出一半，Luise Kral 3用木夹子把衬衫一件件排上去。谁也没道歉，但第二天见面都点了头。
  _effects: mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:011424_

- **1948.01** `df18-curse.name-in-the-door::ctx-vienna-postwar-1945::milieu-tenement/name-and-date` tags: curse, name, door, omen, neighbor, dark, supernatural, vienna
  Hedwig在自家门框上看见一行新刻的字，是自己的名字，下面还有当天的日期。刀痕很浅，像是用钥匙划的。Mitzi Hofer 2说不是他，Hedwig也没有再问。那天夜里，Hedwig把门闩插了两遍，听见楼梯上有脚步声停了一下。
  _effects: mood -0.030000000000000027; knowledge “门框上出现了我的名字和当天的日期。”; flag +df18_name_carved_on_door; relation acquaintance with person-materialized-world-vienna-1912-132_

- **1948.01** `state_tick:forbidden-attachment/discretion-year/seen-in-the-street` tags: forbidden-attachment, love, intimacy, secret, courtship, secret_intimacy, state, state_tick
  Hedwig和那人在剧院后门分开时，被楼上的住户看见了。第二天，邻居的问话里多了一个不该出现的名字；Hedwig没有承认，只把外套挂到柜子最里面。
  _effects: state_parameter forbidden-attachment.exposure 25 -> 40; state_parameter forbidden-attachment.jealousy 25 -> 30; reputation -0.03999999999999998_

- **1948.01** `state_expire:suspected-witchcraft` tags: suspected-witchcraft, witchcraft, rumor, religion, legal, reputation, fear, supernatural
  Hedwig的「被疑巫术」到期；相关安排结束。
  _effects: state_remove suspected-witchcraft state:world-vienna-1912:697_

- **1948.01** `r13-fam.mediate-sibling-conflict::ctx-vienna-postwar-1945::milieu-tenement::sibling-postwar/divided-belongings` tags: task, family, sibling, conflict, mediation, vienna, urban, postwar
  Otto Hofer从战场带回来一只怀表和一把折刀，Lena说当年家里供人念书的钱还没有还。两人把东西摊在桌上，Hedwig把怀表推到中间，说先算清母亲的药钱，再谈战利品。算到最后，折刀归了Hedwig，谁也没有再争。
  _effects: cash -2 (院子里那只被扔掉的帽子); flag +divided_postwar_souvenirs; role; relation kin with person:evt:world-vienna-1912:000061:child; knowledge “the siblings still dispute the cost of their mother’s medici”_

- **1948.02** `major-crisis.rent-increase/tenant-meeting` tags: crisis, housing, rent, eviction, family, poverty
  巷口洗衣房的老板娘把几张椅子摆开，叫来半条街的租户。Hedwig把涨租单摊在桌上，逐条念出上面的数字；Friedrich Winter站在门边，既没走，也没替房东说话。大家决定先集体迟交一个月，签名纸传到Hedwig手里时，纸上已经有一块油渍。
  _effects: cash -2 (paper, ink and tram fare for the tenants meeting); relation acquaintance with person:evt:world-vienna-1912:000883:child; reputation 0.030000000000000027_

- **1948.02** `r13-rel.friend-loan::ctx-vienna-postwar-1945::milieu-tenement::friend-loan-crisis/the-iou-went-unpaid` tags: relationship, friend, money, debt, trust, vienna, urban, postwar
  借出去的钱到了年底也没有还。Hedwig在账本上把那一行圈起来，又划掉。Luise Bauer照样来串门，照样喝Hedwig家的茶。有一次Hedwig提起，Luise Bauer说下个月，下个月又下个月。
  _effects: cash -5 (借出去的那张钞票); flag +bad_loan; role; relation friend with person:evt:world-vienna-1912:002078:child_

- **1949.01** `state_reaction:forbidden-attachment/betrayal-widens-the-secret` tags: forbidden-attachment, love, intimacy, secret, courtship, secret_intimacy, state, state_reaction
  背叛发生以后，Hedwig发现那间借来的房间不再安全。有人知道钥匙放在哪块砖下面，也知道信该在星期几寄出；Hedwig没有去质问，只把能烧的纸先烧了。
  _effects: state_parameter forbidden-attachment.exposure 40 -> 60; state_parameter forbidden-attachment.jealousy 30 -> 50; state_parameter forbidden-attachment.grief 10 -> 20; relation friend with person-materialized-world-vienna-1912-109_
  _causes: evt:world-vienna-1912:012359_

- **1949.01** `p22-cursed-lottery::ctx-vienna-postwar-1945::milieu-tenement/the-ticket-was-already-claimed` tags: lottery, curse, cursed_by_wish, dark, reversal, windfall, public, debt
  Hedwig拿着彩票去兑奖，柜台后面的人说这张票已经被人领过了，领奖人是一个三年前去世的人。Luise Kral 2把票翻到背面，发现签名和死亡证明上的笔迹一模一样；Hedwig站在窗口前，忽然想起这张外套是从旧货市场买来的。
  _effects: state_add under-investigation state:world-vienna-1912:868; state_add public-scandal state:world-vienna-1912:869; state_add p22-scandal-engine state:world-vienna-1912:870; cash -3 (a lawyer and a lost day); relation rival with person-materialized-world-vienna-1912-33; flag +ticket_already_claimed; flag -secret_attachment_active; flag +scandal_engine_active_

- **1949.01** `r13-fam.ask-neighbour-help::ctx-vienna-postwar-1945::milieu-tenement/borrowed-coal` tags: task, social, neighbor, help, poverty, vienna, urban, postwar
  Hedwig把空煤筐拎到隔壁门口，说只借一筐，等手头松了就还。Otto Hofer看了看筐底的锈，进屋铲了半筐，又从灶边拿了两块引火的柴。Hedwig道谢时，Otto Hofer说这条走廊里借东西要记着，不是记在纸上。
  _effects: food; condition; flag +borrowed_coal_from_neighbour; relation friend with person:evt:world-vienna-1912:000061:child_

- **1949.10** `curse15-betrayal.ledger-share::ctx-vienna-postwar-1945::milieu-tenement/the-witness-stays-quiet` tags: betrayal, money, family, trust, curse, secret, vienna, urban
  Otto Weiss在办事处说了Hedwig一整个下午的坏话，从欠债说到那场没人看见的火灾。旁边的人没有替Hedwig说一句话。几天后，Hedwig发现自己的名字从互助会的名单上被划掉了，Otto Weiss只说“我也要养家”。
  _effects: reputation -0.07999999999999996; relation rival with person-materialized-world-vienna-1912-29; cash -1 (互助会停止发放的补贴); condition; flag +reputation_damaged_by_betrayal_

- **1949.10** `state_reaction:p22-scandal-engine/a-new-scandal-feeds-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Hedwig的新故事登出来时，旧的那一页也被重新翻到桌面上。Hedwig发现两件事共用同一个证人，而那个证人上周还来借过盐。
  _effects: state_parameter p22-scandal-engine.heat 60 -> 66; state_parameter p22-scandal-engine.reach 50 -> 54; state_parameter p22-scandal-engine.shame 60 -> 63; state_parameter p22-scandal-engine.leverage 25 -> 27_
  _causes: evt:world-vienna-1912:012996_

- **1949.10** `state_reaction:cursed-by-wish/curse-betrayal` tags: cursed-by-wish, wish, curse, supernatural, revenge, special, state, state_reaction
  背叛发生后的夜里，Hedwig听见墙里有一声很轻的响。第二天，Otto Weiss病倒了；没有人把这两件事放在一起。
  _effects: health -0.03 (the curse answers a real betrayal); condition; state_parameter cursed-by-wish.triggers 3 -> 4; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:012996_

- **1949.12** `vienna-housing-move.flat-viewing/flat-viewing-too-damp` tags: housing, home, rent, family, money
  Hedwig在单间里站了一刻钟，脚底发潮，墙纸底下透出一股霉味。看门人说刷一层石灰就好，Luise Kral 2却在门口轻轻咳了一声，提醒这背面没有阳光。Hedwig把定金收回口袋，谢过看门人，宁可多付三克朗，也不愿把湿气带进夜里。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-33; flag +still_looking_for_room_

- **1950.01** `p23-lovers-ledger::ctx-vienna-postwar-1945::milieu-tenement/the-ledger-burns-first` tags: love, desire, betrayal, ledger, secret, blackmail, high_drama, vienna
  Grete Moser 2比Hedwig早到一步。炉膛里只剩一截没烧透的蓝线，Hedwig从灰里拈出来，认出那是账本装订用的线。Grete Moser 2说这样对大家都好；Hedwig没有回答，只把灰烬扫进一只信封，收进抽屉最深处。炉子里的火还没有完全灭。
  _effects: state_add p23-dangerous-secret state:world-vienna-1912:913; knowledge “partner burned the ledger”; flag +ledger_burned; relation acquaintance with person-materialized-world-vienna-1912-105_

- **1950.01** `curse15-notice.borrowed-mourning::ctx-vienna-postwar-1945::milieu-tenement/it-turns-in-the-hand` tags: curse, money, fear, client, ritual, supernatural, work, vienna
  Hedwig收了钱，却在灵堂里试着把那个名字指向Alois Berg。蜡烛刚点着，Hedwig自己的手先抖起来，火苗顺着袖口爬上去。Alois Berg扑灭了火，没有喊人，只把门打开。Hedwig走出去时，听见身后有人在数剩下的蜡烛。
  _effects: reputation -0.06999999999999995; relation rival with person-materialized-world-vienna-1912-9; state_parameter cursed-by-wish.severity 0.6 -> 0.7; state_add suspected-witchcraft state:world-vienna-1912:914; flag +curse_recoiled_on_holder_

- **1950.01** `state_tick:under-investigation/case-progress/evidence` tags: under-investigation, legal, police, investigation, risk, state, state_tick
  调查员又来找Hedwig谈了一次。问话比上次具体，记录也比上次长。
  _effects: state_parameter under-investigation.progress 30 -> 45; mood -0.020000000000000018_

- **1950.01** `state_tick:p22-scandal-engine/the-rumor-learns-new-words/the-story-turns-on-its-keeper` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  一个曾经替Hedwig传话的人搬走了，带走了半条街的信任。第二天，信箱里多了一张没有署名的明信片，上面只写着“我还记得”；Hedwig把明信片翻过来，背面是空的。
  _effects: state_parameter p22-scandal-engine.heat 66 -> 73; state_parameter p22-scandal-engine.reach 54 -> 59; state_parameter p22-scandal-engine.leverage 27 -> 23; state_parameter p22-scandal-engine.shame 63 -> 69_

- **1950.01** `state_expire:institution-purge` tags: institution-purge, purge, repression, organization, loyalty, surveillance, politics, state
  Hedwig的「组织清洗」到期；相关安排结束。
  _effects: state_remove institution-purge state:world-vienna-1912:884_

- **1950.01** `r13-fam.vouch-for-friend::ctx-vienna-postwar-1945::milieu-tenement/refused-to-sign` tags: task, social, friendship, debt, guarantee, risk, vienna, urban
  Hedwig把借据推回去，说自己家里也等着米下锅。Friedrich Kral 3的脸沉下来，说认识这么多年，连个名字都不肯签。Hedwig没有解释，只把桌上的茶钱付了；Friedrich Kral 3站起来时把椅子带倒，也没有扶。
  _effects: cash -1 (借据上的第二个名字); flag +refused_to_vouch; relation rival with person-materialized-world-vienna-1912-40_

- **1950.01** `vienna-housing-move.moving-day/moving-day-handcart` tags: housing, home, rent, family, money, injury
  第一趟过街口时车上的煤箱差点翻下来，Lena用膝盖顶住，Hedwig把绳子又收了一道。第三趟回来，两人靠在门框上喘气，鞋底都是灰，省下的钱还揣在围裙里。
  _effects: cash -1 (借手推车买烟熨谢邻居的小开销); health -0.05 (三趟推车扛家具累得肩臂酸痛); relation acquaintance with person-phase15-Lena-world-vienna-1912_

- **1950.03** `vienna-historical-social-movement.district-list/hold-list-and-watch` tags: history, historical_process, social_movement, organization, politics
  Anna Winter把会费账本推回去，说外头那个组织答应给煤，只要名单。Hedwig把账本合上，用一块旧布包好塞进缝纫机底下，说先看看谁在往外递话。两人都没再提这事。
  _effects: relation acquaintance with person:evt:world-vienna-1912:002980:child; mood -0.030000000000000027; flag +kept_district_list_private_

- **1950.06** `oj18-lift.stuck::ctx-vienna-postwar-1945::milieu-tenement/hand-crank` tags: lift, building, work, night, passenger, odd_job, suspense, vienna
  电梯停在四楼半，门缝里只看见一截电线。Hedwig让Luise Winter 3抓紧扶手，自己摇动手柄，一格一格把轿厢放下来。门开时，Luise Winter 3的白大褂后背全湿了；他塞给Hedwig两张钞票，说手术室里还有人等着。
  _effects: organization_found 环城大道写字楼管理处 (other); position 电梯员 @building:person-phase15-Hedwig-world-vienna-1912-evt:world-vienna-1912:013534; state_add oj18-odd-apprenticeship state:world-vienna-1912:952; cash 2 (the doctor's reward); reputation 0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-105; flag +lift_operator; knowledge “电梯停在四楼半时，手动柄要一格一格放，不能一次松到底。”; role; flag +odd_job_apprentice_

- **1951.01** `vienna-life-injury-recovery/clinic-treatment` tags: health, work, family
  Hedwig在受伤后的第三天去了诊所。医生清洗伤口、换药，收下诊费，嘱咐不要急着回机器旁。Hedwig把药方折好，回家路上买了纱布。
  _effects: health 0.05 (wound treatment); cash -8 (clinic and bandages); condition_
  _causes: evt:world-vienna-1912:012998_

- **1951.01** `p23-wedding-dress::ctx-vienna-postwar-1945::milieu-tenement/the-curtains-from-the-dress` tags: love, desire, obsession, stalker, wedding, fear, high_drama, vienna
  Hedwig把裙子铺在桌上，Grete Moser 2找来剪刀。两个人拆掉蕾丝，把绸面裁成两幅窗帘；针脚歪歪扭扭，阳光透进来时，屋里像落了一层很淡的粉。Berta Moser 2再没有来过；Hedwig偶尔会想起那个退进门洞的人影，但窗帘已经挂了很多年。
  _effects: cash -1 (curtain rings and thread); mood 0.06000000000000005; flag +dress_curtains_

- **1951.01** `state_expire:under-investigation` tags: under-investigation, legal, police, investigation, risk, state, state_tick, state:under-investigation
  Hedwig的「被调查」到期；相关安排结束。
  _effects: state_remove under-investigation state:world-vienna-1912:868_

- **1951.01** `state_expire:public-scandal` tags: public-scandal, scandal, reputation, social, state, state_tick, state:public-scandal
  Hedwig的「公开丑闻」到期；相关安排结束。
  _effects: state_remove public-scandal state:world-vienna-1912:869_

- **1951.01** `state_expire:p22-scandal-engine` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Hedwig的「流言发动机」到期；相关安排结束。
  _effects: state_remove p22-scandal-engine state:world-vienna-1912:870; flag -scandal_engine_active_

- **1951.01** `state_tick:p23-dangerous-secret/the-secret-changes-hands/the-secret-holds` tags: p23-dangerous-secret, secret, danger, leverage, exposure, loyalty, crime, politics
  又过了两年，秘密没有自己长脚。Hedwig把知道的人一一数过，发现只剩两个还住在这条街上；其中一个已经老得记不清门牌，另一个每次见面都先移开眼睛。Hedwig把剩下的线索重新收好，放回原处。
  _effects: state_parameter p23-dangerous-secret.exposure 20 -> 16; state_parameter p23-dangerous-secret.leverage 15 -> 20; state_parameter p23-dangerous-secret.loyalty 55 -> 58; mood 0.010000000000000009_

- **1951.01** `state_tick:suspected-witchcraft/rumor-season/whispers-fade` tags: suspected-witchcraft, witchcraft, rumor, religion, legal, reputation, fear, supernatural
  一年过去，Hedwig没有再点蜡烛，也没有再去那家后间。教堂的登记册翻到了新的一页，旧页边缘留着指甲划过的痕迹；街上的人开始讨论别的事。
  _effects: state_parameter suspected-witchcraft.evidence 30 -> 22; mood 0.020000000000000018_

- **1951.01** `state_tick:oj18-odd-apprenticeship/strange-year/the-logbook-mislaid` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  巡查簿在换班时不见了，第二天却出现在煤筐底下，最后几页被水泡得发皱。管事的说签字不能算数，扣了Hedwig半个月的夜班钱；Hedwig没有争，只在新的簿子第一页把日期写得很大。
  _effects: state_parameter oj18-odd-apprenticeship.trust 30 -> 14; state_parameter oj18-odd-apprenticeship.reliability 60 -> 50; mood -0.050000000000000044; flag +odd_job_scare_

- **1951.01** `agency:support_process` tags: agency, agency:support_process
  Hedwig想帮忙，但组织者不信任新来的人，只让其在外围等消息。
  _effects: mood -0.010000000000000009_

- **1951.09** `r1-fam.friendship-betrayal::ctx-vienna-postwar-1945::milieu-tenement/betrayal.exposed` tags: social, friendship, betrayal, work, reference, vienna, urban, postwar
  Hedwig没有当场揭穿，而是去问Luise Winter 3要回那封信。Luise Winter 3从抽屉里拿出来，说名字被划掉改过；Hedwig把信纸对着灯看，认出Friedrich Kral的笔迹。她没有去找Friedrich Kral，只把这件事告诉了整条走廊；从此Friedrich Kral打水时总排在最后。
  _effects: reputation 0.050000000000000044; role; relation rival with person:evt:world-vienna-1912:000711:child; flag +forged_reference_exposed; knowledge “改过的名字是朋友的笔迹。”_

- **1951.09** `state_reaction:p23-dangerous-secret/a-loyal-silence-holds` tags: p23-dangerous-secret, secret, danger, leverage, exposure, loyalty, crime, politics
  有人被问起Hedwig时，只说自己那晚在家煮汤。Hedwig后来听说这件事，把汤勺在锅里多搅了两圈。
  _effects: state_parameter p23-dangerous-secret.exposure 16 -> 11; state_parameter p23-dangerous-secret.loyalty 58 -> 66; mood 0.010000000000000009_
  _causes: evt:world-vienna-1912:014053_

- **1951.09** `vienna-housing-move.rent-notice/rent-notice-pay` tags: housing, home, rent, family, money
  Hedwig把通知念给Gustav Weiss听，Gustav Weiss摇头说是楼梯间那几块新玻璃的账。Hedwig去楼下杂货铺换开一张五克朗的纸币，回屋一枚一枚摆开数，煤箱底多留了二十赫勒。
  _effects: cash -2 (按月多付两克朗房租); food; mood -0.010000000000000009_

- **1952.01** `oj18-lift.night::ctx-vienna-postwar-1945::milieu-tenement/ninth-floor-errand` tags: lift, building, night, secrecy, office, work, suspense, vienna
  Franz Kral每天晚上九点进电梯，只说“九层”。那座楼没有九层的办公室，只有一扇钉死的防火门；Hedwig把电梯停稳，等他敲三下门再开。月底，Franz Kral把一只信封塞进电梯操作盘后面，里面是两张钞票。
  _effects: cash 2 (payment for the ninth-floor errand); knowledge “九层没有办公室，只有一扇钉死的防火门，{official}每晚九点上去敲三下。”; state_parameter oj18-odd-apprenticeship.trust 14 -> 19; flag +ninth_floor_errand_

- **1952.01** `state_tick:suspected-witchcraft/rumor-season/new-accuser` tags: suspected-witchcraft, witchcraft, rumor, religion, legal, reputation, fear, supernatural
  又一个人站了出来，说自家的母牛在Hedwig经过之后不再产奶。Hedwig没有辩解，因为辩解本身也需要被登记。Hedwig开始绕远路去市场，每月多出几枚铜币的车钱。
  _effects: state_parameter suspected-witchcraft.danger 35 -> 45; reputation -0.040000000000000036; cash -1 (绕远路增加的车钱)_

- **1952.01** `vienna-parish-aid.soup-kitchen/soup-kitchen.leave` tags: faith, parish, mutual_aid, poverty, family
  Hedwig看见熟人排在前面，帽檐压得低低的，便转身拐进旁边的小巷。Otto Winter追出来问怎么不领了，Hedwig说人太多，改天再来。回到屋里，灶是冷的，早上剩的半个土豆还在盘子里。Hedwig把它切成片，就着水咽下去。
  _effects: food_

- **1952.02** `r3-mig.xenophobic-landlord::ctx-vienna-postwar-1945::milieu-tenement/chalk-cross-and-rent-hike` tags: migration, housing, hostility, landlord, poverty, vienna, urban, postwar
  Franz Kral在Hedwig的门框上画了一个白叉，说这一层要“清理”，外国人的房租从下月起加两克朗。Hedwig问租约上没写这一条，Franz Kral说租约是旧政府的，现在归他解释。Elisabeth Bauer 2在隔壁把门开了一条缝，又轻轻关上。
  _effects: cash -4 (门上的粉笔叉); condition; flag +marked_with_chalk_cross; relation rival with person:evt:world-vienna-1912:000865:child; knowledge “the landlord marks foreign tenants with a chalk cross”_

- **1952.11** `p9-social-tenement-neighbors.stairwell-rumor/stairwell-rumor.repeat-at-bakery` tags: housing, neighbors, tenement, daily, money, reputation
  Hedwig在面包店排队时把听来的话又讲了一遍，添了“夜里常有男人上楼”一句。到傍晚，整栋楼都在说二楼女房客的事，连看门人都在门口站着看。二楼的门一直关着，Hedwig回家时才觉得那句话说得太响。
  _effects: reputation -0.05999999999999994; relation acquaintance with person-emil-weiss_

- **1953.01** `curse15-aftermath.the-inquiry::ctx-vienna-postwar-1945::milieu-tenement/a-statement-is-taken` tags: witchcraft, investigation, reputation, rumor, legal, aftermath, vienna, urban
  Anna Berg把Hedwig叫进办公室，桌上摊着Otto Huber交来的三页证词。Hedwig逐条回答，Anna Berg逐条记录，写到“是否曾诅咒他人”时停了很久。最后Hedwig被允许回家，但门口多了一个每月来一次的访客。
  _effects: state_parameter suspected-witchcraft.danger 45 -> 70; state_parameter suspected-witchcraft.evidence 22 -> 32; reputation -0.050000000000000044; relation acquaintance with person-materialized-world-vienna-1912-12; relation rival with person-materialized-world-vienna-1912-21_

- **1953.01** `state_expire:p23-dangerous-secret` tags: p23-dangerous-secret, secret, danger, leverage, exposure, loyalty, crime, politics
  Hedwig的「危险的秘密」到期；相关安排结束。
  _effects: state_remove p23-dangerous-secret state:world-vienna-1912:913_

- **1953.01** `state_tick:suspected-witchcraft/rumor-season/new-accuser` tags: suspected-witchcraft, witchcraft, rumor, religion, legal, reputation, fear, supernatural
  又一个人站了出来，说自家的母牛在Hedwig经过之后不再产奶。Hedwig没有辩解，因为辩解本身也需要被登记。Hedwig开始绕远路去市场，每月多出几枚铜币的车钱。
  _effects: state_parameter suspected-witchcraft.danger 70 -> 80; reputation -0.040000000000000036; cash -1 (绕远路增加的车钱)_

- **1953.01** `state_expire:oj18-odd-apprenticeship` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  Hedwig的「奇职学徒」到期；相关安排结束。
  _effects: state_remove oj18-odd-apprenticeship state:world-vienna-1912:952; role; flag -odd_job_apprentice_

- **1953.03** `vienna-market-household.soup-kitchen/soup-kitchen.sell` tags: home, market, food, social
  鞋匠敲后门问有没有热汤，Hedwig把剩下的半锅倒进他的罐子里，收下两个十字币。Berta Bauer 2提着空碗上来时，只看见Hedwig把硬币塞进围裙口袋。
  _effects: cash 2 (卖出半锅扁豆汤); relation acquaintance with person-materialized-world-vienna-1912-128; relation acquaintance with person-materialized-world-vienna-1912-128_

- **1954.01** `vienna-postwar-housing-1950s/stay-with-relatives` tags: adulthood, postwar, housing, family
  分房名单又往后推了一年，Hedwig一家搬进亲戚家的厨房隔间。Alois Berg送来一块旧帘子当隔断；夜里有人起身，全屋都听得见。
  _effects: cash -3 (shared household costs); condition; relation acquaintance with person-materialized-world-vienna-1912-9_

- **1954.01** `office16-appointment.patronage-ledger::ctx-vienna-postwar-1945::milieu-tenement/list-rejected` tags: office, appointment, patronage, organization, politics, power, vienna, urban
  名单在委员会卡住了。Katharina 4的名字被划掉，理由是“没有相关资历”；Hedwig没有争，只把名单收回公文包。晚上，Katharina 4来问结果，Hedwig说再等一年；Katharina 4没有坐，站了一会儿就走了。
  _effects: reputation -0.020000000000000018; relation friend with person:evt:world-vienna-1912:003769:child; flag +appointment_list_rejected; knowledge “委员会以“没有相关资历”为由划掉了联络员的名字。”_

- **1954.01** `state_expire:suspected-witchcraft` tags: suspected-witchcraft, witchcraft, rumor, religion, legal, reputation, fear, supernatural
  Hedwig的「被疑巫术」到期；相关安排结束。
  _effects: state_remove suspected-witchcraft state:world-vienna-1912:914_

- **1954.11** `r13-rel.prisoner-return::ctx-vienna-postwar-1945::milieu-tenement::prisoner-return-postwar/home-after-three-years` tags: relationship, war, return, prisoner, marriage, vienna, urban, postwar
  Grete Moser 2到家时，孩子已经会写自己的名字，却不认识Grete Moser 2。Grete Moser 2在门口蹲下来，从口袋里摸出一块压扁的糖。孩子看了Hedwig一眼，才伸手去接。那天晚上，Grete Moser 2睡在孩子床边，一夜没关灯。
  _effects: cash -3 (战俘营回来的那双靴子（其中3克朗记入债务）); role; household_

- **1955.01** `curse15-notice.borrowed-mourning::ctx-vienna-postwar-1945::milieu-tenement/sells-the-mourning` tags: curse, money, fear, client, ritual, supernatural, work, vienna
  Hermann Kraus请Hedwig去家里坐一夜，说只要Hedwig在灵堂待到天亮，那个欠钱的人就会自己上门。Hedwig收了钱，在灵堂坐到天亮，什么也没有发生。一个月后，那个人真的来了，送来一袋面粉；Hermann Kraus把面粉分给Hedwig一半，没有解释。
  _effects: cash 3 (替人守灵的酬劳); reputation -0.030000000000000027; relation acquaintance with person:evt:world-vienna-1912:003425:child_

- **1955.01** `p9-work-jobsearch.railway-depot/railway-depot.eyesight-failed` tags: work, job_search, negotiation, wages, employment, task, railway, depot
  字牌贴在石灰墙上，最后两行他实在分不清。Alois Moser用笔杆敲敲桌面，Luise Lechner 2把名字写进另一本册子，说有缺再叫。Hedwig把证明一张张叠好，折边已经发软。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-55; relation acquaintance with person-materialized-world-vienna-1912-55; relation acquaintance with person-materialized-world-vienna-1912-13_

- **1955.03** `vienna-legacy-worklife.union-office/union-office.write-off` tags: legacy, work, family, reform, ordinary_life
  账本的纸边已经发毛，Hedwig翻到那一页时，手指沾上一层灰。有人说“三十四克朗够买两袋面粉”，没人接话。最后举手表决，赞成销账的手比反对的多两只，老成员把手放下去时，椅子又晃了一下。
  _effects: relation acquaintance with person:evt:world-vienna-1912:003769:child; flag +union_debt_written_off_

- **1955.05** `vienna-housing-move.moving-day/moving-day-sell-up` tags: housing, home, rent, family, money
  收破烂的把两克朗数在门槛上，顺手敲了敲桌板看木料。Hedwig把铁盒扣好，那里面只有照片和几封旧信。Mitzi Winter替Hedwig扶着门，说旧床架值不了几个钱，能脱手就不亏。
  _effects: cash 2 (卖掉旧床架和桌子收进的钱); relation acquaintance with person-materialized-world-vienna-1912-3; relation acquaintance with person-materialized-world-vienna-1912-3_

- **1955.08** `p9-gap-adult-ordinary-day.market-closing/market-closing.bruised-apples` tags: adulthood, daily, leisure, neighborhood, ordinary, market, food, bargain
  苹果堆里混着几个已经发软的，摊主用围裙兜着往她篮子里倒，说拿回去喂猪也不亏。Hedwig在井边洗了半篮子，削皮时看见果核边有一圈褐色的痕，刀子挖下去，甜味还是冒出来。
  _effects: cash -0.1 (买收摊前的碰伤苹果); food; relation acquaintance with person-materialized-world-vienna-1912-154_

- **1956.01** `p9-social-relationship-initiative.borrow-handcart/handcart-and-ten` tags: courtship, friendship, family, social, initiative, housing, task, task:social
  星期天搬家的前一晚，有人坐在印厂友人家的厨房里把事说全：车要借，十克朗也要借。对方合上账本，从抽屉里数出两张五克朗，说月底先还三克朗，剩下的按月摊。手推车的轮轴有点响，搬之前得先上油。
  _effects: cash 10 (友人借给搬家应急的十克朗); relation friend with person:evt:world-vienna-1912:000865:child; mood 0.050000000000000044_

- **1956.01** `vienna-courtship-courtyard.letter-answer/burn-the-letter` tags: adulthood, courtship, partner, social, family
  等到第九天，Hedwig把没寄出的草稿和那封写了一半的信一起塞进炉子。纸卷起来，火苗发蓝，屋里一股焦味；Hedwig拿火钩把灰捅散，决定不再去问信的下落。炉门上的铁片烫手，那个“亲”字先没了。
  _effects: flag +gave_up_on_letter; relation acquaintance with person:evt:world-vienna-1912:002078:child_

- **1956.02** `p9-gap-adult-solitude.remake-coat/remake-coat.crooked-sleeves` tags: adulthood, daily, solitude, ordinary, home, mending, clothing, household
  Hedwig的剪刀钝得咬布，一剪下去袖口走了斜线。她索性把两只袖子都裁短，袖边用灰线锁了一圈。锁边时线太短，接到第三段才够，右手食指被针顶出个红印，改完像件旧式的短褂。
  _effects: skill; mood -0.020000000000000018_

- **1956.08** `vienna-medical-treatment.toothache/dentist-pull` tags: health, medical, family, money
  诊室在二楼，楼梯间飘着石炭酸味。医生把钳子举到灯下看了看，叫Hedwig攥紧扶手。Hermann Hofer站在门边数墙上的价目表：拔牙两克朗五十赫勒，药棉五十赫勒，连消炎水另算。
  _effects: cash -3 (牙医拔牙费用（其中3克朗记入债务）); health 0.05999999999999999 (拔除病牙解除疼痛); mood -0.030000000000000027_

- **1956.11** `vienna-housing-move.rent-notice/rent-notice-pay` tags: housing, home, rent, family, money
  Hedwig把通知念给Ferdinand Stein听，Ferdinand Stein摇头说是楼梯间那几块新玻璃的账。Hedwig去楼下杂货铺换开一张五克朗的纸币，回屋一枚一枚摆开数，煤箱底多留了二十赫勒。
  _effects: cash -2 (按月多付两克朗房租（其中2克朗记入债务）)_

- **1957.01** `p10-migration-tasks.find-lodging/lodging-no-guarantor` tags: adulthood, migration, housing, family, travel, task, lodging, arrival
  看门人看了他的身份证，说三处房都要担保人签字，他一个也拿不出。房东把地址纸条还给他，他只好拖着箱子去车站候车室的长椅上过夜，半夜被巡夜人叫醒查了两次身份证。第二天他再去门房，看门人只摇头。
  _effects: health -0.03 (在硬木长椅上冻了一夜，腰背发僵); relation acquaintance with person-materialized-world-vienna-1912-128; relation acquaintance with person-materialized-world-vienna-1912-148_
## Gustav Moser

Born 1918.01, alive at 1957.
Education: apprenticeship 0; occupation: none; roles: infant, child, police_record, registered_resident, petition_carrier, cabaret_performer, movement_member, permit_holder, liberated_1945, club_president, charity_visitor, office:助理文书, veterans_association_member, housing_waitlist, husband, refused_suitor, disputed_heir, medicine_seeker.

### State snapshot
- yf18-first-awakening [person] (ended 1936.1: duration expired) parameters={"intensity":64,"nerve":23,"talk":13,"reciprocated":true,"secret":true} links={"beloved":"Friedrich Kral"} ticks=3
- yf18-runaway-plan [person] (ended 1934.1: duration expired) parameters={"preparation":15,"suspicion":5,"resolve":55,"destination":"格拉茨","ticket":false} links={} ticks=1
- ld18-public-desire [person] (ended 1937.1: duration expired) parameters={"spectacle":32,"rumorHeat":31,"defiance":15,"protection":5,"shame":30} links={} ticks=2
- df18-uncanny-mark [person] (ended 1944.1: duration expired) parameters={"attention":69,"pain":40,"claimed":"curse","concealed":false} links={} ticks=6
- p22-wild-fortune [person] (ended 1943.1: duration expired) parameters={"height":49,"absurdity":80,"witnesses":55,"fragility":52} links={} ticks=2
- p22-scandal-engine [person] (ended 1942.1: duration expired) parameters={"heat":19,"reach":46,"leverage":43,"shame":13} links={} ticks=2
- fame [person] (ended 1941.1: replaced_by:fame) parameters={"level":0.3,"notoriety":false} links={} ticks=0
- public-scandal [person] (ended 1943.1: duration expired) parameters={} links={} ticks=1
- under-investigation [person] (ended 1942.1: replaced_by:under-investigation) parameters={"progress":30,"charge":"冒领荣誉"} links={} ticks=0
- fame [person] (ended 1943.1: duration expired) parameters={"level":0.4,"notoriety":true} links={} ticks=1
- under-investigation [person] (ended 1943.1: replaced_by:under-investigation) parameters={"progress":45,"charge":"顶罪"} links={} ticks=0
- blacklisted [person] (ended 1945.1: duration expired) parameters={"reason":"伪造道歉与顶罪","severity":0.7} links={} ticks=1
- p22-scandal-engine [person] (ended 1945.1: duration expired) parameters={"heat":76,"reach":74,"leverage":37,"shame":79} links={} ticks=2
- pl19-protected-scandal [person] (ended 1946.1: duration expired) parameters={"exposure":65,"protection":36,"leverage":34,"publicHeat":53} links={"protector":"Franz Moser"} ticks=4
- df18-borrowed-luck [person] (ended 1945.1: duration expired) parameters={"luck":26,"debt":25,"creditorKnown":true,"price":"unknown"} links={"creditor":"Otto Huber"} ticks=4
- under-investigation [person] (ended 1944.1: replaced_by:under-investigation) parameters={"progress":20,"charge":"政治集会"} links={} ticks=0
- public-scandal [person] (ended 1945.1: duration expired) parameters={} links={} ticks=1
- under-investigation [person] (ended 1946.1: duration expired) parameters={"progress":60,"charge":"诈骗"} links={} ticks=2
- pc20-public-reversal [person] (ended 1948.1: duration expired) parameters={"proof":46,"pressure":54,"support":60,"danger":44} links={"accuser":"Katharina Hofer"} ticks=4
- pc20-second-chance [person] (ended 1948.1: duration expired) parameters={"credibility":30,"debt":29,"hope":60,"suspicion":62} links={} ticks=4
- cj17-wanted [person] (ended 1946.1: duration expired) parameters={"heat":26,"cover":5,"price":4,"pursuer":"police","alias":"witness buyer"} links={} ticks=1
- fame [person] (ended 1947.1: duration expired) parameters={"level":0.3,"notoriety":true} links={} ticks=1
- public-scandal [person] (ended 1948.1: duration expired) parameters={} links={} ticks=1
- p21-scandal-web [person] (ended 1950.1: duration expired) parameters={"exposure":100,"loyalty":13,"leverage":48,"danger":75} links={"keeper":"Luise Kral 2"} ticks=4
- debt-bondage [person] (ended 1950.1: duration expired) parameters={"debt":53,"creditor":"遗产税征收员"} links={"creditor":"Luise Kral 2"} ticks=5
- p21-fortune-reversal [person] (ended 1950.1: duration expired) parameters={"height":25,"fragility":100,"witnesses":47,"debt":87} links={} ticks=5
- pl19-protected-scandal [person] (ended 1951.1: the public heat outran the protection) parameters={"exposure":88,"protection":19,"leverage":30,"publicHeat":89} links={"protector":"Emil Winter"} ticks=4
- p23-dangerous-secret [person] (ended 1951.1: duration expired) parameters={"exposure":61,"leverage":32,"bodies":0,"loyalty":33} links={} ticks=2
- under-investigation [person] (ended 1950.1: duration expired) parameters={"progress":35,"charge":"走私"} links={} ticks=2
- institution-purge [organization] (ended 1950.1: duration expired) parameters={"target":"未说明","intensity":0.32999999999999996,"denunciations":3,"vacancies":1,"reviewOpen":true} links={} ticks=1
- oj18-odd-apprenticeship [person] (ended 1953.1: duration expired) parameters={"trust":4,"strangeKnowledge":30,"reliability":30,"nightsWorked":0,"post":"放映员"} links={} ticks=2
- ad20-private-bargain [person] (ended 1953.1: duration expired) parameters={"leverage":66,"trust":47,"debt":63,"exit":20} links={"beneficiary":"Alois Bauer 2"} ticks=3
- known-affair [person] (ended 1955.1: duration expired) parameters={"notoriety":66,"grief":7,"exposure":88,"discretion":10,"remarried":false,"origin":"exposed"} links={} ticks=4
- ld18-public-desire [person] (ended 1954.1: duration expired) parameters={"spectacle":60,"rumorHeat":77,"defiance":28,"protection":0,"shame":35} links={} ticks=2
- p21-scandal-web [person] (active) parameters={"exposure":63,"loyalty":35,"leverage":59,"danger":38} links={"keeper":"Josef Weiss","witness":"Anna Berg"} ticks=3

### 295 subject events

- **1918.01** `birth` tags: birth
  Gustav Moser在Wohnung Karl Kraus, Lothringerstraße 6出生。Anna Berg、Hermann Moser在场；家里现在有4口人。
  _causes: evt:world-vienna-1912:000879_

- **1918.02** `vienna-life-birth-letter-from-the-dead/the-letter-is-a-bill` tags: infancy, family, secret, letter, drama
  信里没有问候，只有一张旧账单：棺材、墓地、一趟从边境回来的车费。Hermann Moser把账单翻过来，背面用铅笔写着“别让孩子知道”。Gustav Moser伸手去抓纸角，Hermann Moser没有让。
  _effects: cash -4 (paid an old funeral debt); flag +family_debt_letter; mood -0.03_

- **1918.05** `vienna-life-infant-feeding/fed-enough` tags: infancy, food, household
  Anna Berg在Leopoldstädter Zinshaus, gemeinsamer Gang给Gustav Moser喂奶，随后把洗净的布尿片挂在窗边。孩子吃饱后睡着了，锅里还留着半碗燕麦糊。
  _effects: health 0.019999999999999997 (fed through the day); cash -2 (milk and oatmeal)_

- **1919.01** `vienna-life-infant-first-smile/neighbour-warning` tags: infancy, family, first, warm
  隔壁的女人探头进来，说孩子笑得太早，老人讲这不是好兆头。Anna Berg没有接话，只把Gustav Moser往怀里拢了拢；孩子却伸手去抓那女人围裙上的扣子，抓得不肯松。
  _effects: mood -0.010000000000000002; flag +early_smile_omen_

- **1919.02** `vienna-life-toddler-wrong-cradle/the-swap-story-spreads` tags: infancy, family, rumour, identity, comic, drama
  三天后，整条楼道都在说这家的孩子“抱错了”。Anna Berg抱着Gustav Moser去敲Anna Moser的门，Anna Moser不开，只在门里说“我也是听来的”。Gustav Moser在母亲怀里睡着了，口水把她的领口洇出一小片深色。
  _effects: flag +cradle_swap_rumour; relation rival with person-anna-moser; mood -0.05_

- **1919.09** `vienna-infant-household.cradle-fall/neighbor-warns` tags: infancy, health, family, home
  邻居上楼借盐，看见摇床缺口，顺手用自己篮子里一块旧布垫在床沿，又叮嘱Anna Berg把床挪离窗边冷墙。Gustav Moser这次翻身被布兜住，Anna Berg第二天下工把床挪了半米。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-12; health 0.019999999999999997 (摇床被加固，减少了磕碰); mood 0.03; relation acquaintance with person-materialized-world-vienna-1912-10_

- **1920.01** `vienna-life-toddler-first-words/first-word-door` tags: infancy, family, first, comic
  门外有人上楼，Gustav Moser忽然指着门说：“爸爸。”Hermann Moser看了看空门口，没有纠正。那天晚上，孩子把家里每个人的名字都叫了一遍，叫错两个，却叫得很认真。
  _effects: skill; mood 0.01999999999999999; flag +first_word_door_

- **1920.02** `vienna-life-toddler-accident/safe-in-the-doorway` tags: infancy, accident, family, danger
  Hermann Moser在最后一刻抓住了Gustav Moser的后领。孩子悬在两级台阶之间，鞋底蹭着地，手里还攥着那只线轴。Hermann Moser把孩子放回地上，蹲下来看了很久，才说：“再跑，我就把门关上。”
  _effects: mood -0.01999999999999999; skill_

- **1921.01** `vienna-life-child-family-legend/stolen-inheritance` tags: childhood, family, secret, story
  Anna Berg说，家里本来有一件东西，后来被“更会说话的人”拿走了。Gustav Moser问是什么，Anna Berg只说是一块表，表盖里刻着姓。孩子记住了“表盖里刻着姓”，却没有记住那个姓。
  _effects: knowledge “家里有一块表盖里刻着姓的表，被一个更会说话的人拿走了。”; flag +family_legend_watch_

- **1921.08** `vienna-early-childhood.fever-night/home-remedy` tags: childhood, family, home, street
  Gustav Moser烧得翻来覆去，Anna Berg把醋倒进温水，用布蘸着擦手心、脚心，又去灶间煮接骨木汁。勺子送到嘴边，Gustav Moser偏头躲，Anna Berg就等一会儿再喂。鸡叫时炉火压小，床脚用旧大衣堵住。两天后热度退了，嘴唇起了一层干皮。
  _effects: health 0.03 (土法退烧，热度渐退); mood -0.06_

- **1921.11** `p9-childhood-household.fever-night/called-corner-doctor` tags: childhood, family, household, home, siblings, illness, neighbors
  Hermann Kral披着外套去街角敲门，老医生过了半个钟头才提着皮包上楼。医生让Gustav Moser坐起来，把听诊器贴在背上，听完从纸包里抖出三撮药粉。Anna Berg数出两克朗放在桌角，医生用铅笔头写：稀粥、温水、不要面包皮。
  _effects: cash -2 (出诊费和药粉); health 0.060000000000000005 (服药后热退了些); relation acquaintance with person-hermann-kral_

- **1922.01** `vienna-life-child-first-friend/imaginary-friend` tags: childhood, friendship, family, comic
  院子里没有别的孩子，Gustav Moser给墙上的裂纹起了一个名字，每天吃饭时给它留一个位置。家里的人没有纠正，只在摆碗时多放一只空碗；Ferdinand Berg从门口经过，问Gustav Moser在等谁。
  _effects: skill; flag +imaginary_friend; relation friend with person:evt:world-vienna-1912:000446:child_

- **1922.02** `vienna-life-child-inherited-wish/the-child-wants-a-dog` tags: childhood, family, wish, grief, uncanny, drama
  Gustav Moser说那句话只是想要一只狗，而且要“会看门的、不咬人的、像外婆家那只一样”。Anna Berg松了一口气，又有点失落；那天下午，两个人用旧毛线给一只并不存在的狗量了脖围。
  _effects: mood 0.04; skill_

- **1923.04** `vienna-childhood-street.hoop/hoop-mother-call` tags: childhood, street, social, home
  二楼窗口有人喊了一声，Gustav Moser抬头应着，脚却没动。铁环卡在Berta Moser的鞋边，Berta Moser说要再玩一圈。Gustav Moser把铁钩递过去，说明天借你。Berta Moser这才挪开脚，用鞋尖把铁环拨到Gustav Moser面前。
  _effects: relation friend with person:evt:world-vienna-1912:000729:child; relation friend with person:evt:world-vienna-1912:000729:child; mood -0.02_

- **1924.01** `p9-gap-childhood-chores.mind-sibling/sibling-falls-at-well` tags: childhood, household, chores, school, task, daily, sibling, care
  Franz Moser的鞋掉在井台边，Gustav Moser先去捡鞋，回头才看见Franz Moser摔在湿石头上。Friedrich Hofer用围裙裹住Franz Moser，血从膝盖渗出来。Anna Berg夜里把Gustav Moser叫到灶台前，数落了很久，最后把锅里剩下的半勺汤倒回大锅，只给Gustav Moser留了半碗。
  _effects: mood -0.06; relation kin with person-materialized-world-vienna-1912-12_

- **1925.01** `p9-gap-childhood-chores.market-line/line-half-flour` tags: childhood, household, chores, school, task, daily, market, food
  面粉袋压在胸口，越抱越沉。Gustav Moser前面的大婶一直往后靠，Gustav Moser就把膝盖顶住对方的篮子，硬留出半步。买到半袋面粉后，Gustav Moser的鞋跟留在人堆里，找回来时鞋面全是泥。回家路上布袋换了两次肩，赤脚踩过石板时脚底发麻。
  _effects: food; skill; relation acquaintance with person-materialized-world-vienna-1912-30_

- **1925.02** `vienna-childhood-friends.courtyard-race/fell-on-wet-stones` tags: childhood, social, school, street
  晒衣绳上的水一滴一滴落在石板上。Gustav Moser跑到第二圈，鞋底一滑，膝盖先着地。Katharina Bauer 2从屋里端出半盆清水，蹲下冲掉伤口里的沙，又用手帕扎紧，说今天别跑了。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-32; relation acquaintance with person-materialized-world-vienna-1912-32_

- **1925.09** `p9-childhood-household.strap-by-the-door/neighbor-interrupted` tags: childhood, family, household, home, siblings, illness, neighbors
  敲门声响了三下，Ferdinand Winter在门外说借一撮盐。Anna Berg把皮带挂回门后，转身时声音还硬着，说了几句就低下去。Gustav Moser退到灶台和墙的夹缝里，听见Ferdinand Winter说“孩子还小”，又听见门关上，才敢动。
  _effects: relation acquaintance with person-ferdinand-winter; mood -0.03; relation kin with person-materialized-world-vienna-1912-12_

- **1926.01** `p9-gap-childhood-chores.laundry-help/laundry-bread-with-friend` tags: childhood, household, chores, school, task, daily, laundry, work
  Josef Moser家的孩子站在绳子另一头，Gustav Moser递夹子时故意慢半拍，两个人把床单拉得没有一道褶。收工后Josef Moser端出半包隔夜面包，掰开时掉了一桌屑。Gustav Moser把分到的那块用围裙兜住，回家路上闻着麦味，硬是没咬。
  _effects: food; relation acquaintance with person-materialized-world-vienna-1912-10; skill; relation acquaintance with person-materialized-world-vienna-1912-38_

- **1926.09** `vienna-childhood-street.cigarette-card/card-trade` tags: childhood, street, social, home
  烟草店门口的石阶上摆着一排烟画。Gustav Moser把三张皱巴巴的卡摊开，Otto Hofer挑了挑，从口袋里摸出一张皇帝像。交换完，Otto Hofer转身进了杂货铺，把皇帝像往柜台上一拍，换了一块糖。Gustav Moser站在门外，手里还留着卡片的油墨味。
  _effects: mood 0.04; relation friend with person:evt:world-vienna-1912:000061:child_

- **1927.01** `p9-gap-childhood-chores.mind-sibling/sibling-shelter-missed-river` tags: childhood, household, chores, school, task, daily, sibling, care
  巷口的喊声第二次传来时，Gustav Moser正用膝盖压住木盆边沿，给Helene Weiss挡穿堂风。Helene Weiss在旧布底下翻了个身，Gustav Moser立刻停住，等呼吸又匀了才敢动。Anna Berg推门进来，先看见盆里睡着的Helene Weiss，再看见Gustav Moser冻红的脚背，把灶上留的汤热了热。
  _effects: mood -0.019999999999999997; relation kin with person:evt:world-vienna-1912:002227:child; relation kin with person-materialized-world-vienna-1912-12_

- **1927.06** `p9-childhood-household.fever-night/vinegar-compress` tags: childhood, family, household, home, siblings, illness, neighbors
  碗里倒上醋，兑一半凉水，Anna Berg把布巾浸透，拧到不滴水，敷在Gustav Moser的额头上。布一热就换，换下来的搭在床沿。Gustav Moser半夜说梦话，Anna Berg用手背试了试温度，又去换一盆水。天亮时枕布湿了一片，Anna Berg的手指白得像泡过石灰。
  _effects: health 0.03 (湿敷后退了烧); mood 0.02; relation kin with person-materialized-world-vienna-1912-12_

- **1928.01** `p9-gap-childhood-chores.market-line/line-sold-out-potatoes` tags: childhood, household, chores, school, task, daily, market, food
  木窗“咔”地合上，Gustav Moser的布袋还敞着口。伙计隔着板缝说下星期再来。Gustav Moser在墙根站了一会儿，把硬币排在掌心数了两遍，走到旁边土豆摊前，挑了几个小的，让摊主当面过秤。家里人晚上把钱和土豆倒在桌上，重新数了一遍。
  _effects: food; mood -0.029999999999999995; skill; relation acquaintance with person-materialized-world-vienna-1912-2; relation acquaintance with person-materialized-world-vienna-1912-4_

- **1928.11** `vienna-childhood-friends.courtyard-race/fell-on-wet-stones` tags: childhood, social, school, street
  晒衣绳上的水一滴一滴落在石板上。Gustav Moser跑到第二圈，鞋底一滑，膝盖先着地。Franz Lechner从屋里端出半盆清水，蹲下冲掉伤口里的沙，又用手帕扎紧，说今天别跑了。
  _effects: relation acquaintance with person-franz-lechner_

- **1929.01** `p9-gap-childhood-chores.mind-sibling/sibling-falls-at-well` tags: childhood, household, chores, school, task, daily, sibling, care
  土豆滚进墙角的煤灰里，Gustav Moser弯腰去追，再抬头时Helene Weiss已经坐在井台边，裤腿湿了一片，哭声一抽一抽。Emil Weiss把孩子抱进灶间，Gustav Moser跟在后面，手指抠着门框。Anna Berg回来没问经过，只把Gustav Moser的碗收走一半，说“看个人都看不住”。
  _effects: health -0.03 (在井台边摔了一跤); mood -0.06; relation kin with person-materialized-world-vienna-1912-12_

- **1930.04** `vienna-adolescence.brothers-torn-jacket/sew-it-yourself` tags: adolescence, school, work, family, social
  外套腋下裂了一道口子，里布翻出来。Gustav Moser把袖口套在桌角上撑开，穿针时试了三次才引上线。针脚一针长一针短，像蜈蚣。Anna Berg端着汤进来，站在桌边看了一会儿，把碗往Gustav Moser那边推了推，自己只留了半碗。
  _effects: skill; food; relation kin with person-materialized-world-vienna-1912-12_

- **1931.03** `vienna-adolescence.workshop-apprentice/apprenticeship-accepted` tags: adolescence, school, work, family, social
  Buchdruckerei Winter & Söhne先看Gustav Moser的手，又让Gustav Moser推两下刨子试试。Gustav Moser用力过猛，刨刀啃进木头，Buchdruckerei Winter & Söhne皱眉，让再来一遍。第二遍木花薄而匀。Buchdruckerei Winter & Söhne说“留下”，当面点了三克朗给Anna Berg，算头一周饭钱，又指了指墙上的钟，说迟到一刻钟扣半天。
  _effects: cash 3 ({subject}学徒首周的膳食预付款); education apprenticeship; reputation 0.1; relation kin with person-materialized-world-vienna-1912-12_

- **1932.01** `p9-childhood-youth-aspiration.ask-a-mentor/asked-to-come-back-later` tags: adolescence, education, aspiration, school, books, club, exam, task
  Helene Berg看了看Gustav Moser抄的字母表，说大小不一，让他回去用直尺画格子重抄一遍，下个月再来。少年把纸折好，在咖啡馆门口站了一会儿，走回印刷厂时绕到排字房窗外看了很久。
  _effects: mood -0.029999999999999985; skill; flag +mentor_pending_retry; relation acquaintance with person-materialized-world-vienna-1912-64; relation acquaintance with person-materialized-world-vienna-1912-64_

- **1932.05** `statistical_infection`
  Gustav Moser在Leopoldstädter Zinshaus, gemeinsamer Gang病倒了，肺炎让身体发热、虚弱，接下来的日子只能卧床。

- **1932.06** `statistical_illness_worsened`
  Gustav Moser的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1932.09** `statistical_illness_worsened`
  Gustav Moser的肺炎没有完全好转，咳嗽和发热又拖了一个月，家里人轮流守着。

- **1932.09** `vienna-youth-threshold.sibling-departure/quarrel-who-leaves` tags: adolescence, school, work, family, transition
  车票只够一个人走，晚饭桌上话越说越大声。Elisabeth Moser说该自己走，Gustav Moser说自己也快够岁数了。母亲把汤勺往锅沿一磕，屋里静下来，最后Gustav Moser摔门出去在楼梯上坐了半宿，直到楼上有人喊冷。
  _effects: relation kin with person:evt:world-vienna-1912:000514:child; mood -0.07_

- **1932.11** `statistical_recovery`
  Gustav Moser熬过了这场肺炎，能坐起来喝一点汤，但身体还很虚。

- **1933.01** `p9-childhood-youth-aspiration.join-a-club/went-once-and-left` tags: adolescence, education, aspiration, school, books, club, exam, task
  Gustav Moser交了第一个月的会费，进去坐了一刻钟。屋里太吵，下棋的争论盖过了念书的声音，他借的书也被人翻得卷了边。下个月他路过门口，没再进去交十赫勒。
  _effects: cash -0.1 (只交了一个月会费); relation acquaintance with person-elisabeth-bauer; flag +workers_youth_quit; mood -0.01999999999999999_

- **1933.01** `yf18-firstlook.tram-glove::ctx-vienna-authoritarian-1934::milieu-tenement/return-it-at-the-gate` tags: first_love, love, tram, glove, youth, courtship, vienna, urban
  下一站，Gustav Moser追下车，把那只手套递还给Friedrich Kral。Friedrich Kral说了一声谢谢，手指在毛线手套里缩了一下；Gustav Moser回到车上才发现自己坐过了两站，只好沿着环城路走回家。
  _effects: state_add yf18-first-awakening state:world-vienna-1912:153; relation friend with person:evt:world-vienna-1912:000711:child; mood 0.03; flag +yf18_first_awakening_active_

- **1933.04** `yf18-runaway.bundle::ctx-vienna-authoritarian-1934::milieu-tenement/hide-the-bundle` tags: runaway, escape, family, plan, night_train, vienna, urban, crisis
  Gustav Moser把两件衬衫、一双袜子和小时候的洗礼证明卷进一块旧桌布，塞到床底下。Anna Berg在厨房里数硬币，数了三遍都没有抬头；Gustav Moser躺在黑暗里，听见夜车从远处经过，铁轨的声音一直传到枕头下面。
  _effects: state_add yf18-runaway-plan state:world-vienna-1912:154; flag +yf18_bundle_hidden; mood 0.020000000000000018; flag +yf18_runaway_plan_active_

- **1933.06** `vienna-adolescence.workshop-apprentice/apprenticeship-rejected` tags: adolescence, school, work, family, social
  Buchdruckerei Winter & Söhne捏了捏Gustav Moser的虎口，又让Gustav Moser张开手指，说骨节还没长开，推硬木会伤手。Anna Berg想再问一句，Buchdruckerei Winter & Söhne已经转身去搬木料。Gustav Moser退到门槛外，听见刨子重新响起来，木花从门缝里卷到脚边。
  _effects: mood -0.08000000000000002; reputation -0.05; relation kin with person-materialized-world-vienna-1912-12_

- **1933.06** `yf18-dare.bridge-rail::ctx-vienna-authoritarian-1934::milieu-tenement/climb-back-down` tags: dare, bridge, river, friendship, risk, vienna, urban, crisis
  Gustav Moser的手已经搭上栏杆，听见桥下有驳船拉笛，忽然把手收回来。Franz Moser骂了一句，Helene Moser却把围巾解下来递给Gustav Moser；三个人在桥头站了一会儿，谁也没有再提这件事。
  _effects: state_parameter yf18-first-awakening.intensity 45 -> 48; state_parameter yf18-first-awakening.nerve 25 -> 20; relation friend with person:evt:world-vienna-1912:000558:child; relation friend with person:evt:world-vienna-1912:001031:child; mood -0.010000000000000009_

- **1934.01** `state_tick:yf18-first-awakening/half-year-of-glances/rehearsed-conversation` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Gustav Moser在厨房里对着镜子练了七遍开场白，第二天却在离Friedrich Kral三步远的地方拐进面包店。Gustav Moser买了一袋并不需要的盐，回家路上把开场白又想了一遍；这一次，连标点都更熟练了。
  _effects: state_parameter yf18-first-awakening.intensity 48 -> 54; state_parameter yf18-first-awakening.talk 0 -> 3; mood 0.010000000000000009_

- **1934.01** `state_expire:yf18-runaway-plan` tags: yf18-runaway-plan, escape, youth, plan, home, travel, risk, state
  Gustav Moser的「床底下的包袱」到期；相关安排结束。
  _effects: state_remove yf18-runaway-plan state:world-vienna-1912:154; flag -yf18_runaway_plan_active_

- **1934.01** `r13-edu.exam-eve::ctx-vienna-authoritarian-1934::milieu-tenement/passed-entrance-exam` tags: education, exam, study, poverty, adolescence, vienna, urban, crisis
  Gustav Moser把煤油灯芯剪短，省下油熬到后半夜。代数题做错三遍，Gustav Moser就用冷水拍脸，再把公式抄到手腕内侧。考试那天，监考把袖口翻了一遍，Gustav Moser还是把最后一道题解完了。放榜那天，Gustav Moser在人群后面站了很久，才敢往前挤。
  _effects: mood 0.06; flag +passed_entrance_exam; skill_

- **1934.01** `r15-work.master-takes-on::ctx-vienna-authoritarian-1934::milieu-tenement/turned-away` tags: work, craft, apprentice, trade, poverty, vienna, urban, crisis
  Anna Weiss看了看Gustav Moser的手，说太小，拿不稳凿子。Gustav Moser回家没有提这件事，第二天去码头找零工。
  _effects: mood -0.08000000000000002; flag +apprenticeship_refused; relation acquaintance with person-materialized-world-vienna-1912-76_

- **1934.02** `vienna-adolescence.brothers-torn-jacket/sew-it-yourself` tags: adolescence, school, work, family, social
  外套腋下裂了一道口子，里布翻出来。Gustav Moser把袖口套在桌角上撑开，穿针时试了三次才引上线。针脚一针长一针短，像蜈蚣。Anna Berg端着汤进来，站在桌边看了一会儿，把碗往Gustav Moser那边推了推，自己只留了半碗。
  _effects: skill; food; relation kin with person-materialized-world-vienna-1912-12_

- **1935.01** `yf18-friend.two-tickets::ctx-vienna-authoritarian-1934::milieu-tenement/confront-at-the-cloakroom` tags: first_love, friendship, betrayal, dance, tickets, vienna, urban, crisis
  Gustav Moser在衣帽间堵住Katharina Winter，问那两张票怎么到了Friedrich Winter手里。Katharina Winter说Gustav Moser从来没敢开口，自己只是替Gustav Moser把话说了；Gustav Moser把票根揉成一团，塞进Katharina Winter的西装口袋，转身时撞翻了侍者的托盘。
  _effects: state_parameter yf18-first-awakening.intensity 54 -> 59; state_parameter yf18-first-awakening.talk 3 -> 13; state_parameter yf18-first-awakening.nerve 20 -> 15; relation friend with person:evt:world-vienna-1912:001041:child; relation friend with person:evt:world-vienna-1912:000883:child; reputation -0.02; mood -0.04999999999999999_

- **1935.01** `state_tick:yf18-first-awakening/half-year-of-glances/answered-glance` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Gustav Moser在教堂门口或学校走廊里又遇见Friedrich Kral。这一次对方先点了头，Gustav Moser准备好的整段话全忘了，只把手里的书换到另一只手上；回家后Gustav Moser才发现，自己把书拿倒了。
  _effects: state_parameter yf18-first-awakening.intensity 59 -> 64; state_parameter yf18-first-awakening.nerve 15 -> 23; state_parameter yf18-first-awakening.reciprocated false -> true; relation friend with person:evt:world-vienna-1912:000711:child; mood 0.02999999999999997_

- **1935.01** `r14-edu.tutoring-sibling::ctx-vienna-authoritarian-1934::milieu-tenement/sibling-resented-drilling` tags: education, tutored_sibling, family, tutoring, vienna, urban, crisis, war
  Helene Weiss把铅笔一摔，说再也不想看见豆子。Gustav Moser把豆子一颗颗收进碗里，说随你。那天晚上，Helene Weiss自己把错题改了一遍，改完把本子推到Gustav Moser面前，不说话。Gustav Moser看了一遍，在页角画了一个很小的勾。
  _effects: flag +sibling_resented_tutoring; relation rival with person:evt:world-vienna-1912:002227:child_

- **1935.02** `ld18-dance.private-club::ctx-vienna-authoritarian-1934::milieu-tenement/a-waltz-in-the-back-room` tags: adolescence, dance, queer, secret, public, desire, public_desire, vienna
  Otto Winter在俱乐部后间放了一张留声机，让Gustav Moser和Ferdinand Berg跳一支舞。窗帘没有拉严，对面楼里有人看见了；第二天，Gustav Moser的母亲问她昨晚是不是去了“那种地方”，Gustav Moser说去听了音乐。
  _effects: state_add ld18-public-desire state:world-vienna-1912:216; relation friend with person:evt:world-vienna-1912:000446:child; mood 0.03999999999999998; flag +danced_in_the_back_room; flag +public_desire_active_

- **1936.01** `state_expire:yf18-first-awakening` tags: yf18-first-awakening, love, youth, first_love, desire, school, awakening, state
  Gustav Moser的「第一次心动」到期；相关安排结束。
  _effects: state_remove yf18-first-awakening state:world-vienna-1912:153; flag -yf18_first_awakening_active_

- **1936.01** `state_tick:ld18-public-desire/the-story-changes-hands/a-new-version` tags: ld18-public-desire, desire, public, scandal, reputation, body, rumor, notoriety
  故事又换了一个版本：有人说Gustav Moser是为了钱，有人说是为了爱，还有人说她只是喜欢看别人议论。Gustav Moser在咖啡馆听见第三种说法，没有更正，只把杯子往窗边挪了挪；阳光照进来，她第一次觉得这些版本都离自己很远。
  _effects: state_parameter ld18-public-desire.rumorHeat 35 -> 31; state_parameter ld18-public-desire.spectacle 30 -> 32; mood 0.010000000000000009_

- **1936.01** `p9-social-relationship-initiative.apology-at-bakery/settle-the-account` tags: courtship, friendship, family, social, initiative, housing, task, task:social
  面包店里全是热面团味，柜台后的妇人拿铁夹子夹起两只 Semmel。Gustav Moser把四十赫勒和那束紫罗兰一起推过去，话讲得慢，一句是一句；Maria Winter一边听一边把围裙上的面粉拍掉，最后伸手接了花。
  _effects: cash -0.4 (一小束紫罗兰和两只 Semmel); relation friend with person:evt:world-vienna-1912:000549:child; mood 0.08000000000000002; relation acquaintance with person-materialized-world-vienna-1912-70_

- **1936.02** `vienna-church-community.tenement-prayer/rent-prayer-argument` tags: faith, social, family, home
  Klara怪Gustav Moser把人都招到楼梯上，木头泡了潮气才裂的。Gustav Moser没还嘴，蹲下去看那道裂缝，指甲刮下一层朽木屑。
  _effects: relation acquaintance with person-phase15-Klara-world-vienna-1912; reputation -0.03; mood -0.06_

- **1936.02** `vienna-courtship-courtyard.sunday-walk/separate-coffee` tags: adulthood, courtship, partner, social, family
  两人拐进街角的咖啡馆，站到锌皮柜台前。Franz Kral点了牛奶咖啡，Gustav Moser要了黑咖啡，十二赫勒一杯。侍者把两杯推过来时，两人几乎同时把钱币按在柜台上，各付各的，谁也没说什么；那一声铜板响，把客气摆得比咖啡还清楚。
  _effects: cash -0.12 (自己那杯黑咖啡); relation acquaintance with person:evt:world-vienna-1912:000865:child; mood -0.02999999999999997_

- **1936.02** `vienna-tenement-neighbors.shared_stove_fire/fire_no_damage` tags: home, social, family, housing
  Gustav Moser刚把锅端下灶，火苗就蹿了起来，Hermann Hofer一脚踩灭地上的油布，顺手抄起沙箱里的沙子盖住灶口。两人都没受伤，但Hermann Hofer的鞋底烧穿一个洞，那是唯一一双出门的鞋。
  _effects: relation friend with person-materialized-world-vienna-1912-66; mood -0.05; relation acquaintance with person-materialized-world-vienna-1912-66_

- **1936.02** `ad20-job-interview::ctx-vienna-authoritarian-1934::milieu-tenement/hired-on-probation` tags: work, interview, employment, everyday, reputation, obligation, vienna, urban
  面试在一间改作办公室的公寓里进行。Die Fackel把三把椅子摆成一排，自己坐中间，让Gustav Moser坐最边上。问到第三句，Die Fackel忽然说：“客人若认出你，你先介绍店，还是先介绍自己？”Gustav Moser说先介绍店；Die Fackel在纸上画了一个圈，又把它涂成实心。
  _effects: employment 店员 @ org-die-fackel; skill; relation employer with person-karl-kraus; flag +hired_on_probation; reputation 0.02; mood 0.03999999999999998_

- **1936.04** `major-crisis.rent-increase/pay-the-increase` tags: crisis, housing, rent, eviction, family, poverty
  房东没有露面，只让看门人Gustav Weiss把补款单塞进门缝：每月要多十四克朗，先交十八克朗（本月十四加四克朗手续费）才肯谈续租。Gustav Moser把准备买冬煤的钱数了两遍，还是把钱交了，收据上写的是“自愿捐助”。Gustav Weiss低声说，不签的人已经有两家搬走了，楼下的煤价牌又换了数字。
  _effects: cash -18 (advance payment demanded with the rent increase); relation acquaintance with person:evt:world-vienna-1912:000571:child; flag +rent_increase_accepted_

- **1936.08** `ad20-neighbor-dispute::ctx-vienna-authoritarian-1934::milieu-tenement/the-line-moves` tags: neighbor, dispute, home, everyday, public, obligation, vienna, urban
  隔壁把晾衣绳往Gustav Moser这边挪了一尺，水滴正好落在窗台上。Gustav Moser拿粉笔在墙上画了一道线；Mitzi Lechner 2看见了，又把绳子挪回去半尺。两个人都觉得自己让了步，晚饭时却都把窗户关得很紧。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-27; mood -0.01999999999999999; flag +laundry_line_dispute; relation acquaintance with person-materialized-world-vienna-1912-27; relation acquaintance with person-materialized-world-vienna-1912-40_

- **1937.01** `vienna-tenement-neighbors.laundry_line_dispute/neighbor_yanks_clothes` tags: home, social, family, housing
  Hermann Hofer嫌Gustav Moser的床单滴水滴到Hermann Hofer家衬衫上，一把扯下床单扔在院子的石板上。Gustav Moser下楼捡起来时，床单角沾了泥，重洗又要费肥皂。两人在院子当中对喊，楼上有人推开窗看热闹。Gustav Moser把床单重新搭上绳子时，故意把水拧在Hermann Hofer那侧。
  _effects: relation rival with person-materialized-world-vienna-1912-66; cash -0.15 (重洗床单的肥皂钱)_
  _causes: evt:world-vienna-1912:005793_

- **1937.01** `vienna-family-same-sex-male/denounced-to-police` tags: family, intimacy, same_sex, persecution, lifecycle, partnership, unemployment
  旅店伙计记下了Gustav Moser和Josef的名字。几天后警察来敲门，把两人带去问话；Gustav Moser丢了工位，罚了八克朗，Josef的家里把人接走。Gustav Moser在档案里留下一条警察记录，手指上还留着问话时磕出的淤青。
  _effects: relation partner with person-phase15-Josef-world-vienna-1912; reputation -0.2; unemployment (dismissed after police visit); cash -8 (fine and lost work); role_

- **1937.01** `state_expire:ld18-public-desire` tags: ld18-public-desire, desire, public, scandal, reputation, body, rumor, notoriety
  Gustav Moser的「被全城观看的欲望」到期；相关安排结束。
  _effects: state_remove ld18-public-desire state:world-vienna-1912:216; flag -public_desire_active_

- **1937.01** `r13-civ.ration-card::ctx-vienna-authoritarian-1934::milieu-tenement/ration-card-issued` tags: politics, rationing, food, war, institution, vienna, urban, crisis
  Berta Huber把配给证从本子上撕下来，填上Gustav Moser家的门牌和人数，又用打孔机在角上打了一个洞。Gustav Moser把证举到灯下，看见上面印着面粉、糖和煤的数量，每一项都比去年少。
  _effects: food; flag +ration_card_issued; knowledge “the monthly ration is smaller than last year’s”; relation acquaintance with person-materialized-world-vienna-1912-80; relation acquaintance with person-materialized-world-vienna-1912-79_

- **1937.01** `vienna-parish-aid.soup-kitchen/soup-kitchen.leave` tags: faith, parish, mutual_aid, poverty, family
  Gustav Moser看见熟人排在前面，帽檐压得低低的，便转身拐进旁边的小巷。Gustav Weiss追出来问怎么不领了，Gustav Moser说人太多，改天再来。回到屋里，灶是冷的，早上剩的半个土豆还在盘子里。Gustav Moser把它切成片，就着水咽下去。
  _effects: mood -0.04999999999999999; relation acquaintance with person:evt:world-vienna-1912:000571:child; food_

- **1937.03** `vienna-illness-household.child-fever/home-remedy` tags: health, family, home
  邻居过来看了一眼，教Gustav Moser用湿布敷额。Gustav 4天亮时安静睡了，Gustav Moser却耽误半日活计；一克朗五十赫勒的工钱没了，床边的醋味却留了一整天。
  _effects: health 0.05 (家庭护理后烧略退); cash -1.5 (缺工半日被扣工钱)_

- **1938.01** `vienna-life-anschluss-1938/complies` tags: politics, persecution, 1938
  Elisabeth Berg在街口设了登记桌，要求住户交出姓名、职业和宗教。Gustav Moser排队填了表，回家把门牌擦干净。楼里有人连夜搬走，也有人站在阳台上挥手。
  _effects: role; cash -3 (new permits and stamps); condition; relation acquaintance with person-materialized-world-vienna-1912-78_

- **1938.01** `vienna-family-divorce/reconcile-for-now` tags: family, marriage, divorce, housing, lifecycle, partnership
  Gustav Moser和Josef在楼道里吵到半夜，最后因为下个月的房租又坐回同一张桌。谁都没有提和好，只把账本重新摊开；Josef把煤钱推过来，Gustav Moser接过去数了两遍，手指碰到一起又分开，屋里的灯亮到很晚。
  _effects: relation partner with person-phase15-Josef-world-vienna-1912; mood -0.03_

- **1938.01** `kernel-civic.petition-drive::ctx-vienna-authoritarian-1934::milieu-tenement/civic-petition-filed` tags: politics, petition, reform, neighbor, organization, vienna, urban, crisis
  他在一家面包店门口摆开签名纸，Emil Winter第一个签，写完又把丈夫的名字也添上。到傍晚，纸上有一百二十个名字；Elisabeth Berg收下时数了两遍，说“我们会研究”。回家的电车上，他发现签名纸的边角被汗浸软了。
  _effects: role; reputation 0.04999999999999999; relation acquaintance with person-materialized-world-vienna-1912-36; relation acquaintance with person-materialized-world-vienna-1912-78; cash -1 (签名纸、墨水和面包店门口的租金); knowledge “请愿书要按街道分开，窗口职员会当面数签名”; flag +petition_filed; relation acquaintance with person-materialized-world-vienna-1912-36_

- **1938.01** `vienna-tenement-neighbors.shared_stove_fire/fire_scald_hand` tags: home, social, family, housing
  Gustav Moser在合租房走廊的公用灶台上煮土豆，转身取盐时袖子扫翻了铁锅，滚水浇在左手背上。Mitzi Lechner 2从隔壁冲出来，扯下自己的围裙裹住烫伤处，又跑下楼叫来住在二楼的接生婆。接生婆用蛋清和旧亚麻布包扎，嘱咐三天不能沾水。
  _effects: relation friend with person-materialized-world-vienna-1912-27_

- **1938.03** `df18-mark.first-appearance::ctx-vienna-authoritarian-1934::milieu-tenement/burn-bird` tags: body, mark, omen, illness, rumor, supernatural, eerie, vienna
  印刷机的滚筒咬住Gustav Moser的袖口时，谁都以为只擦破了一层皮。伤口结痂后，却留下一只张开翅膀的鸟形烫痕。Elisabeth Berg给了Gustav Moser两枚银币，说别去报工伤，厂里正查安全。Gustav Moser把钱收下，回到排字房，觉得那只鸟在袖子里发烫。
  _effects: cash 2 (工头给的封口费); state_add df18-uncanny-mark state:world-vienna-1912:386; relation acquaintance with person-materialized-world-vienna-1912-78; flag +df18_mark_appeared_after_injury; mood -0.030000000000000027; flag +df18_mark_noticed; knowledge “我身上有一处说不清的痕迹，别人对它各有各的说法。”_

- **1938.10** `r3-war.liberation-flag::ctx-vienna-authoritarian-1934::milieu-tenement/opened-prison` tags: war, liberation, occupation, flag, aftermath, vienna, urban, crisis
  Gustav Moser跟着Anna Bauer 2去打开监狱，牢房里的人瘦得站不起来。Franz Moser在门口喊一个名字，没人应；Gustav Moser在墙上找到一排刻痕，最后一道只刻了一半。Anton Kral进来清点，说这些人要先送去医院，不能直接回家。
  _effects: mood -0.09999999999999998; flag +opened_prison_on_liberation_day; relation friend with person:evt:world-vienna-1912:001031:child; relation colleague with person-materialized-world-vienna-1912-72; knowledge “a half-carved mark was left on the cell wall”; relation acquaintance with person-materialized-world-vienna-1912-72; relation acquaintance with person-materialized-world-vienna-1912-7_

- **1938.12** `vienna-housing-move.rent-notice/rent-notice-demand-repair` tags: housing, home, rent, family, money
  Gustav Moser没有立刻答话，先去敲Josef Moser的门。两人一起数落墙上的水渍和门框里灌进来的风，楼梯间的窗户修好了，自家墙皮还在剥落。Josef Moser提议一起把话带给看门人：先修好漏水的墙角，涨租的事再谈。Gustav Moser把纸重新折好，请他把话带到门外。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-10; mood 0.030000000000000027; flag +rent_dispute_

- **1939.01** `state_tick:df18-uncanny-mark/mark-year/story-grows` tags: df18-uncanny-mark, body, mark, omen, superstition, reputation, mystery, faith
  入冬后，Gustav Moser在集市上听见一个陌生女人向别人描述“那个有手印的人”。故事已经比原来多了一个雨夜和一声尖叫。Gustav Moser低头挑菜，发现自己的手正按着袖口。
  _effects: state_parameter df18-uncanny-mark.attention 35 -> 45; state_parameter df18-uncanny-mark.pain 20 -> 26; state_parameter df18-uncanny-mark.claimed unknown -> curse; reputation -0.01999999999999999; mood -0.030000000000000027_

- **1939.01** `r14-work.claim-unemployment::ctx-vienna-authoritarian-1934::milieu-tenement/benefit-denied` tags: work, unemployment_benefit, institution, poverty, bureaucracy, vienna, urban, crisis
  Katharina Hofer说Gustav Moser的工龄不够，或者离开的方式算“自愿”，两条都不符合。Gustav Moser问哪一条，Katharina Hofer把表格转过来，用手指点了点空白处。走廊里有人抱着孩子排队，孩子在哭。Gustav Moser把号码牌放在窗台上，走了出去。
  _effects: cash -1 (失业救济的号码牌); mood -0.12; condition; flag +benefit_denied; knowledge “a voluntary departure disqualifies the claim”_

- **1939.03** `vienna-parish-aid.sick-call/sick-call.door-only` tags: faith, parish, mutual_aid, poverty, family
  Gustav Moser把药包和半块肥皂交给开门的孩子，嘱咐用水冲开、一天两次，就下了楼。楼梯间里孩子一直站在门口看着，手里攥着纸包，没关门。Gustav Moser走到二层又折回去，帮他把门带上，说自己家里也等着火。
  _effects: health 0.01 (没有久留，避开了病人的屋子); relation acquaintance with person-materialized-world-vienna-1912-70; mood -0.030000000000000027_

- **1939.03** `p22-goat-heir::ctx-vienna-authoritarian-1934::milieu-tenement/goat-keeps-the-building` tags: inheritance, absurd, comic, goat, tenement, legal, rumor, public
  公证人念完遗嘱，整栋楼归一只叫“伯爵”的山羊所有，条件是它继续住在天井里。Gustav Moser和Emil Weiss把租金记在羊的名下，每天轮流挤奶；半年后，房东太太的侄子来争产，看见山羊站在楼梯口，竟先脱帽行了个礼。那天夜里，羊睡在门房，钥匙挂在它的角上。
  _effects: state_add p22-wild-fortune state:world-vienna-1912:440; state_add p22-scandal-engine state:world-vienna-1912:441; cash 4 (rent surplus held in the goat name); relation friend with person-emil-weiss; flag +goat_kept_building; mood 0.030000000000000027; flag +wild_fortune_active; flag +scandal_engine_active_

- **1939.04** `fa17-cabaret.debut::ctx-vienna-authoritarian-1934::milieu-tenement/held-the-room` tags: art, performance, cabaret, debut, reputation, failure, theatre, vienna
  首演夜，Gustav Moser在第二首歌的中间忘了两句词，干脆停下来听乐队多走了一个小节，再接着唱。台下有人以为这是新加的停顿，笑了一声，随后整间屋子都放松了。Luise Lechner 2在后台说，今晚之后，节目单上可以印Gustav Moser的名字。
  _effects: state_add fame state:world-vienna-1912:442; cash 2 (首演酬劳与加演分成); role; reputation 0.06; skill; flag +debut_success; relation acquaintance with person-materialized-world-vienna-1912-55_

- **1939.10** `p9-gap-adult-solitude.window-argument/window-argument.nod` tags: adulthood, daily, solitude, ordinary, home, neighbor, overheard
  Gustav Moser在窗边听了一刻钟，只听出是工钱和面包账的事，最后把窗虚掩上睡了。第二天清早在楼梯口碰见那个女人，眼睛有点肿，两人错身时她点了点头，谁也没说话。
  _effects: mood 0.020000000000000018; flag +knows_downstairs_quarrel_

- **1940.01** `vienna-tenement-neighbors.laundry_line_dispute/compromise_split_line` tags: home, social, family, housing
  Gustav Moser把洗好的床单搭上院子里的公用晾衣绳，占了整条。Mitzi Lechner 2抱着一盆湿衣服下来，说自家孩子明天要穿干净衬衫上学。两人在绳子两头扯了一阵，最后Gustav Moser把床单对折，腾出一半，Mitzi Lechner 2用木夹子把衬衫一件件排上去。谁也没道歉，但第二天见面都点了头。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-27; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:007256_

- **1940.01** `state_expire:ml18-sudden-fortune` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  Gustav Moser的「一笔突然到手的钱」到期；相关安排结束。
  _effects: state_remove ml18-sudden-fortune state:world-vienna-1912:273_

- **1940.01** `state_tick:df18-uncanny-mark/mark-year/story-grows` tags: df18-uncanny-mark, body, mark, omen, superstition, reputation, mystery, faith
  入冬后，Gustav Moser在集市上听见一个陌生女人向别人描述“那个有手印的人”。故事已经比原来多了一个雨夜和一声尖叫。Gustav Moser低头挑菜，发现自己的手正按着袖口。
  _effects: state_parameter df18-uncanny-mark.attention 45 -> 55; state_parameter df18-uncanny-mark.pain 26 -> 32; state_parameter df18-uncanny-mark.claimed curse -> curse; reputation -0.020000000000000004; mood -0.030000000000000027_

- **1940.01** `state_tick:p22-wild-fortune/the-story-gets-taller/a-witness-asks-for-proof` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  一个见证人要求Gustav Moser拿出证据。Gustav Moser翻遍抽屉，只找到一张被水浸过的收据；那天晚上，街上的故事换了主角，Gustav Moser的名字被挪到了最后一行。
  _effects: state_parameter p22-wild-fortune.height 55 -> 49; state_parameter p22-wild-fortune.witnesses 60 -> 55; state_parameter p22-wild-fortune.fragility 45 -> 52; mood -0.030000000000000027_

- **1940.01** `state_tick:p22-scandal-engine/the-rumor-learns-new-words/the-story-gets-a-new-witness` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  又过了一年，流言没有熄，却学会了新的说法。Gustav Moser在咖啡馆里听见自己的故事被讲成三个版本，每个版本都比上一个多一个证人；没有人来追问，也没有人真正忘记。
  _effects: state_parameter p22-scandal-engine.heat 30 -> 27; state_parameter p22-scandal-engine.reach 45 -> 49; state_parameter p22-scandal-engine.leverage 35 -> 38; state_parameter p22-scandal-engine.shame 15 -> 17; mood 0.010000000000000009_

- **1940.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Gustav Moser把Grete Bauer的旧课本包上书皮，又在本子上签了名。Grete Bauer今年学会了自己系鞋带，也学会了在饭桌上说“不”；Gustav Moser听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 30 -> 38; state_parameter raising-child.caregiverBurden 54 -> 51; mood 0.020000000000000018_

- **1940.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Gustav Moser把Luise Bauer的旧课本包上书皮，又在本子上签了名。Luise Bauer今年学会了自己系鞋带，也学会了在饭桌上说“不”；Gustav Moser听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 36 -> 44; state_parameter raising-child.caregiverBurden 54 -> 51; mood 0.020000000000000018_

- **1940.01** `task-vienna-bourgeois-youth.concert-outing/balcony-bread` tags: bourgeois, education, culture, salon, university, family, task, task:culture
  Gustav Moser买了两张最便宜的楼座票，一共四克朗。Berta Moser家里起初不准，说星期天要回家吃饭，后来松了口。幕间两人分了一块带来的面包，音乐厅的暖气把外套烘得发烫。
  _effects: cash -4 (两张楼座票); mood 0.08999999999999997; relation friend with person:evt:world-vienna-1912:000729:child; skill_

- **1940.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Helene Weiss这周主动擦了黑板。Gustav Moser把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 62 -> 65; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:008048_

- **1940.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Berta Moser这周主动擦了黑板。Gustav Moser把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 54 -> 57; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:008051_

- **1940.01** `vienna-social-movement.recruitment/join-and-carry` tags: development, social_movement, organization, politics
  Gustav Moser在楼梯下面接到一张折成四折的传单。纸上没有署名，只写着下一次集会的地址。Gustav Moser去了，在昏暗的屋里报上姓名，成为环城大道写字楼管理处的一员，并答应负责自己所在街区的联络。
  _effects: organization_membership; role_

- **1940.03** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Grete Bauer这周主动擦了黑板。Gustav Moser把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 38 -> 41; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:008365_

- **1940.04** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Mitzi Moser这周主动擦了黑板。Gustav Moser把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 68 -> 71; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:008367_

- **1940.10** `vienna-housing-move.rent-notice/rent-notice-demand-repair` tags: housing, home, rent, family, money
  Gustav Moser没有立刻答话，先去敲Luise Kral 3的门。两人一起数落墙上的水渍和门框里灌进来的风，楼梯间的窗户修好了，自家墙皮还在剥落。Luise Kral 3提议一起把话带给看门人：先修好漏水的墙角，涨租的事再谈。Gustav Moser把纸重新折好，请他把话带到门外。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-97; mood 0.02999999999999997; relation acquaintance with person-materialized-world-vienna-1912-97_

- **1941.01** `p23-national-hero::ctx-vienna-authoritarian-1934::milieu-tenement/the-real-hero-returns` tags: politics, media, fame, impostor, hero, war, high_drama, vienna
  真正的守边人从战俘营回来时，报纸正在印Gustav Moser的第二次专访。那人缺了两根手指，站在报社门口，说自己只守了一天半。Anton Kral把Gustav Moser叫进办公室，桌上的奖章还没有收进盒子；窗外，记者们已经围住了那个缺手指的人。
  _effects: state_add public-scandal state:world-vienna-1912:494; state_add under-investigation state:world-vienna-1912:495; reputation -0.059999999999999984; state_add fame state:world-vienna-1912:496; mood -0.06; flag +real_hero_returned; relation acquaintance with person-materialized-world-vienna-1912-67_

- **1941.01** `p21-duel-at-dawn::ctx-vienna-authoritarian-1934::milieu-tenement/the-pistol-lowers` tags: duel, honor, violence, public, scandal, rival, politics, high_drama
  天边刚泛白，城北采石场的碎石堆还挂着夜里的水汽。Elisabeth Moser 2数到七，Gustav Moser把枪口压低了一寸，Friedrich Berg也把枪放下。两个人隔着湿石头站了一会儿，最后是Friedrich Berg先伸出手；Elisabeth Moser 2把两把决斗手枪都收进木盒，像收起一套不用的餐具。
  _effects: relation rival with person-materialized-world-vienna-1912-75; reputation 0.03; flag +duel_ended_without_blood; knowledge “采石场的雾里，双方都把枪口压低了一寸。”; cash -1 (the doctor came anyway); mood 0.010000000000000009; relation acquaintance with person-materialized-world-vienna-1912-75; relation acquaintance with person-materialized-world-vienna-1912-49_

- **1941.01** `state_reaction:p22-scandal-engine/a-public-apology-cools-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Gustav Moser在报纸上登了道歉，流言却没有立刻停。第二天，有人在门口放了一束花，也有人把花拿走了；Gustav Moser把空花瓶留在窗台上，没有扔。
  _effects: state_parameter p22-scandal-engine.heat 27 -> 19; state_parameter p22-scandal-engine.reach 49 -> 46; state_parameter p22-scandal-engine.shame 17 -> 13; state_parameter p22-scandal-engine.leverage 38 -> 43; mood 0.010000000000000009_
  _causes: evt:world-vienna-1912:008340_

- **1941.01** `state_reaction:fame/scandal` tags: fame, reputation, media, status, state, state_reaction, duel, honor
  Gustav Moser的名字出现在报纸上，但这次不是在文化版。街角的报童把那一版折到最上面。
  _effects: reputation -0.07999999999999999; state_parameter fame.notoriety true -> true_
  _causes: evt:world-vienna-1912:008340_

- **1941.01** `state_tick:df18-uncanny-mark/mark-year/kept-small` tags: df18-uncanny-mark, body, mark, omen, superstition, reputation, mystery, faith
  又过了一年，Gustav Moser学会了在洗澡时不去盯那块印子。它还在，边缘有时发红，有时像普通的旧疤；街坊有了新的闲话，Gustav Moser的袖子也换了更长的款式。
  _effects: state_parameter df18-uncanny-mark.attention 55 -> 49; state_parameter df18-uncanny-mark.pain 32 -> 28; mood 0.010000000000000009_

- **1941.01** `state_expire:raising-child` tags: raising-child, family, child, care, school, household, state, state_tick
  Gustav Moser的「家里有个正在长大的孩子」到期；相关安排结束。
  _effects: state_remove raising-child state:world-vienna-1912:58_

- **1941.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Gustav Moser被叫到学校，老师说Franz Moser这学期总在课上看窗外。回家的路上，Gustav Moser没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 61 -> 56; state_parameter raising-child.caregiverBurden 48 -> 53; cash -2 (extra lessons and replacement pencils); mood -0.030000000000000027_

- **1941.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Gustav Moser被叫到学校，老师说Helene Weiss这学期总在课上看窗外。回家的路上，Gustav Moser没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 65 -> 60; state_parameter raising-child.caregiverBurden 38 -> 43; cash -2 (extra lessons and replacement pencils); mood -0.030000000000000027_

- **1941.01** `task-vienna-bourgeois-youth.family-business-or-study/chose-university` tags: bourgeois, education, culture, salon, university, family, task, task:education
  Gustav Moser把钥匙推回去，说要去听课。Anna Berg当场停掉每月二十克朗的零用钱，母亲没敢再劝。他第二周就找了两家补习学生，每周四晚给人补拉丁文。
  _effects: cash -15 (失去零用后自付开销); relation kin with person-materialized-world-vienna-1912-12; flag +self_supporting_student; skill_

- **1941.01** `hist15-occ.work-permit::ctx-vienna-authoritarian-1934::milieu-tenement/permit-granted` tags: occupation, work, permit, institution, shortage, history, vienna, urban
  Ferdinand Moser 2在通行证上盖了章，又用铅笔在角落写了一个日期。Gustav Moser拿到许可，可以去城西的修配厂上工；走出劳动局时，Gustav Moser把证件摸了三遍，确认它还在口袋里。
  _effects: cash -2 (通行证手续费); role; flag +work_permit_granted; knowledge “城西修配厂只认盖蓝章的通行证。”; relation acquaintance with person-materialized-world-vienna-1912-107_

- **1941.12** `df18-luck.borrowed-at-the-card-table::ctx-vienna-authoritarian-1934::milieu-tenement/the-favor` tags: luck, debt, bargain, gambling, obligation, night, supernatural, vienna
  牌桌上输掉最后一张钞票后，Otto Huber把一叠钱推到Gustav Moser面前，说不用写借条，只要Gustav Moser答应“以后有一天帮一个忙”。Gustav Moser数了数，正好二十克朗。Otto Huber没有说是什么忙，只把烟按灭在桌角，说时候到了会来找Gustav Moser。
  _effects: cash 20 (牌桌上借来的二十克朗); state_add df18-borrowed-luck state:world-vienna-1912:556; flag +df18_took_card_money; mood 0.020000000000000018; flag +df18_luck_borrowed; knowledge “我得到了一点不该白拿的好运，代价还没有说清。”_

- **1942.01** `p22-apology-confession::ctx-vienna-authoritarian-1934::milieu-tenement/the-real-culprit-thanks-him` tags: apology, confession, newspaper, dark, reversal, scandal, under_investigation, blacklist
  真正的窃贼给Gustav Moser寄来一张明信片，上面只写着“谢谢你的道歉”。Anton Kral把明信片和报纸并排放在桌上，认定Gustav Moser是在替人顶罪；Anna Bauer 2被叫去问话，回来时脸色发青。第二天，报纸登了一篇更长的道歉，这次没有人再相信。他把明信片翻过来，背面是一张空白的邮票。
  _effects: state_add under-investigation state:world-vienna-1912:552; state_add blacklisted state:world-vienna-1912:553; state_add p22-scandal-engine state:world-vienna-1912:554; reputation -0.07; relation rival with person-materialized-world-vienna-1912-7; cash -3 (a lawyer and a lost job); flag +real_culprit_thanked; mood -0.06; flag +blacklisted_

- **1942.01** `state_reaction:p22-scandal-engine/a-public-apology-cools-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Gustav Moser在报纸上登了道歉，流言却没有立刻停。第二天，有人在门口放了一束花，也有人把花拿走了；Gustav Moser把空花瓶留在窗台上，没有扔。
  _effects: state_parameter p22-scandal-engine.heat 75 -> 67; state_parameter p22-scandal-engine.reach 65 -> 62; state_parameter p22-scandal-engine.shame 75 -> 71; state_parameter p22-scandal-engine.leverage 25 -> 30; mood 0.010000000000000009_
  _causes: evt:world-vienna-1912:008881_

- **1942.01** `state_tick:df18-uncanny-mark/mark-year/story-grows` tags: df18-uncanny-mark, body, mark, omen, superstition, reputation, mystery, faith
  入冬后，Gustav Moser在集市上听见一个陌生女人向别人描述“那个有手印的人”。故事已经比原来多了一个雨夜和一声尖叫。Gustav Moser低头挑菜，发现自己的手正按着袖口。
  _effects: state_parameter df18-uncanny-mark.attention 49 -> 59; state_parameter df18-uncanny-mark.pain 28 -> 34; state_parameter df18-uncanny-mark.claimed curse -> curse; reputation -0.020000000000000018; mood -0.030000000000000027_

- **1942.01** `state_expire:p22-scandal-engine` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Gustav Moser的「流言发动机」到期；相关安排结束。
  _effects: state_remove p22-scandal-engine state:world-vienna-1912:441; flag -scandal_engine_active_

- **1942.01** `state_tick:eh19-inherited-cause/cause-year/keeps-the-promise` tags: eh19-inherited-cause, household, inheritance, politics, legacy, organization, promise, risk
  又一年过去，Gustav Moser仍把那只铁盒放在柜顶。盒里的名单没有添新名字，但每年总有人在同一天来敲门，坐一会儿，喝一杯水，再走。
  _effects: state_parameter eh19-inherited-cause.commitment 50 -> 53; state_parameter eh19-inherited-cause.legacy 45 -> 47; state_parameter eh19-inherited-cause.risk 35 -> 37; mood 0.010000000000000009_

- **1942.01** `state_tick:df18-borrowed-luck/luck-account/paid-a-little` tags: df18-borrowed-luck, luck, debt, obligation, superstition, risk, bargain, transfer
  半年过去，Gustav Moser还了一点钱，也替债主跑了两趟腿。债主没有夸Gustav Moser，只在账本上划掉一小行；Gustav Moser却发现，自己开始下意识地绕开那家店。
  _effects: cash -1 (还掉一小笔); state_parameter df18-borrowed-luck.debt 35 -> 27; state_parameter df18-borrowed-luck.luck 25 -> 28; mood 0.010000000000000009_

- **1942.01** `state_expire:raising-child` tags: raising-child, family, child, care, school, household, state, state_tick
  Gustav Moser的「家里有个正在长大的孩子」到期；相关安排结束。
  _effects: state_remove raising-child state:world-vienna-1912:67_

- **1942.01** `r13-fam.care-sick-child::ctx-vienna-authoritarian-1934::milieu-tenement::child-care-war/milk-watered` tags: task, care, health, child, fever, night, vienna, urban
  配给站给的奶已经掺了水，Gustav Moser把它煮开，撇掉上面那层薄薄的沫，还是喂给了Emil Berg。孩子喝一半就推开碗，说苦；Gustav Moser尝了一口，才发现锅底糊了。那一夜，Gustav Moser把窗子开了又关，怕煤烟，也怕穿堂风。
  _effects: cash -3 (第三遍换湿布); flag +watered_milk_fed; condition_

- **1942.02** `pl19-bridge.public-rumor::ctx-vienna-authoritarian-1934::milieu-tenement/the-list-writes-itself` tags: scandal, protection, network, press, media, rumor, bridge, vienna
  Gustav Moser在报纸上看见自己的名字和一张旧照片，报纸像一盏关不掉的灯。Franz Moser提议找几个人替Gustav Moser挡电话、挡记者、挡亲戚；Gustav Moser说不用，第二天却发现Franz Moser已经把名单写好了，最上面一行是Gustav Moser自己。
  _effects: state_add pl19-protected-scandal state:world-vienna-1912:555; relation friend with person:evt:world-vienna-1912:001031:child; reputation -0.020000000000000018; flag +list_written_itself; knowledge “名单最上面一行是当事人的名字。”; flag +protected_scandal_active_

- **1942.02** `state_reaction:p22-scandal-engine/a-new-scandal-feeds-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Gustav Moser的新故事登出来时，旧的那一页也被重新翻到桌面上。Gustav Moser发现两件事共用同一个证人，而那个证人上周还来借过盐。
  _effects: state_parameter p22-scandal-engine.heat 67 -> 73; state_parameter p22-scandal-engine.reach 62 -> 66; state_parameter p22-scandal-engine.shame 71 -> 74; state_parameter p22-scandal-engine.leverage 30 -> 32; mood -0.019999999999999962_
  _causes: evt:world-vienna-1912:008885_

- **1942.03** `vienna-parish-aid.soup-kitchen/soup-kitchen.help-wash` tags: faith, parish, mutual_aid, poverty, family
  Gustav Moser喝完汤没走，留下来帮修女把大锅刷净，又把木碗按大小摞好。厨房后头有半块面包和一碗剩汤，修女说是帮忙人的午饭。Friedrich Kral 3在门口等着一起回去，说下回还来，洗锅的活总有人要干。
  _effects: food; skill; relation acquaintance with person-materialized-world-vienna-1912-40; mood 0.020000000000000018_

- **1942.05** `hs18-queue.refugee::ctx-vienna-authoritarian-1934::milieu-tenement/slip-food-and-leave` tags: refugee, queue, station, papers, official, history, vienna, urban
  Gustav Moser没有填表，只把半块面包和一张电车票塞进孩子的口袋。Anton Kral敲了敲桌子，叫下一个。Friedrich Kral 3追到门口，问姓名；Gustav Moser摆摆手，说名字写在票背面。其实票背面什么也没有。
  _effects: food; cash -1 (gave away a tram ticket); relation acquaintance with person-materialized-world-vienna-1912-40; flag +helped_refugee_without_papers; mood 0.020000000000000018_

- **1943.01** `hist15-occ.seed-occupation::ctx-vienna-authoritarian-1934::milieu-tenement/the-flag-changes` tags: occupation, war, curfew, history, place, institution, vienna, urban
  城门口的旗换了颜色，岗哨开始检查每一张纸。Gustav Moser回家时发现街角新钉了一块告示牌：天黑以后不许出门，地窖里的粮食要登记。晚上，巡逻队的靴声从窗下经过，比钟声还准。
  _effects: state_add occupied-city-regime state:world-vienna-1912:601; mood -0.05999999999999994; flag +saw_the_occupation_flag_

- **1943.01** `p22-blacklist-soup::ctx-vienna-authoritarian-1934::milieu-tenement/the-menu-is-a-police-list` tags: blacklist, cook, soup_kitchen, warm, ironic, work, politics, community
  警察在汤锅旁边发现一张名单，上面写着常来吃饭的人名。Anna Berg说这是政治集会，Gustav Moser说这只是记账；Katharina Hofer 2在门口喊了一声，排队的人散了一半。第二天，厨房门口贴了封条，锅里的汤还没有凉。他把名单折好，塞进围裙口袋，锅里的汤还在冒气。
  _effects: state_add under-investigation state:world-vienna-1912:602; state_add public-scandal state:world-vienna-1912:603; relation rival with person-materialized-world-vienna-1912-12; relation acquaintance with person-materialized-world-vienna-1912-45; flag +soup_kitchen_sealed; mood -0.040000000000000036; relation acquaintance with person-materialized-world-vienna-1912-45_

- **1943.01** `state_tick:df18-uncanny-mark/mark-year/story-grows` tags: df18-uncanny-mark, body, mark, omen, superstition, reputation, mystery, faith
  入冬后，Gustav Moser在集市上听见一个陌生女人向别人描述“那个有手印的人”。故事已经比原来多了一个雨夜和一声尖叫。Gustav Moser低头挑菜，发现自己的手正按着袖口。
  _effects: state_parameter df18-uncanny-mark.attention 59 -> 69; state_parameter df18-uncanny-mark.pain 34 -> 40; state_parameter df18-uncanny-mark.claimed curse -> curse; reputation -0.020000000000000018; mood -0.030000000000000027_

- **1943.01** `state_expire:p22-wild-fortune` tags: p22-wild-fortune, wild_fortune, fortune, reversal, absurdity, inheritance, luck, public
  Gustav Moser的「荒唐横财」到期；相关安排结束。
  _effects: state_remove p22-wild-fortune state:world-vienna-1912:440; flag -wild_fortune_active_

- **1943.01** `state_expire:public-scandal` tags: public-scandal, scandal, reputation, social, state, state_tick, state:public-scandal
  Gustav Moser的「公开丑闻」到期；相关安排结束。
  _effects: state_remove public-scandal state:world-vienna-1912:494_

- **1943.01** `state_expire:fame` tags: fame, reputation, media, status, state, state_tick, state:fame
  Gustav Moser的「公众名声」到期；相关安排结束。
  _effects: state_remove fame state:world-vienna-1912:496_

- **1943.01** `state_tick:eh19-inherited-cause/cause-year/the-house-divides` tags: eh19-inherited-cause, household, inheritance, politics, legacy, organization, promise, risk
  家里为那只铁盒吵了一次。有人说该交给档案馆，有人说该烧掉，还有人问为什么要把上一代的事算在这一代头上；Gustav Moser把盒子抱回房间，门没有关严。
  _effects: state_parameter eh19-inherited-cause.division 30 -> 38; state_parameter eh19-inherited-cause.commitment 53 -> 50; mood -0.030000000000000027_

- **1943.01** `state_tick:p22-scandal-engine/the-rumor-learns-new-words/the-story-gets-a-new-witness` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  又过了一年，流言没有熄，却学会了新的说法。Gustav Moser在咖啡馆里听见自己的故事被讲成三个版本，每个版本都比上一个多一个证人；没有人来追问，也没有人真正忘记。
  _effects: state_parameter p22-scandal-engine.heat 73 -> 70; state_parameter p22-scandal-engine.reach 66 -> 70; state_parameter p22-scandal-engine.leverage 32 -> 35; state_parameter p22-scandal-engine.shame 74 -> 76; mood 0.010000000000000009_

- **1943.01** `state_tick:pl19-protected-scandal/the-network-meets/someone-wants-a-favor` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  有人替Gustav Moser挡了一次采访，随后在走廊里提起自己儿子的学徒期满。Gustav Moser知道这不是闲聊；当天晚上，那张写着名字的纸条被压在糖罐下面，像一枚没有付清的硬币。
  _effects: state_parameter pl19-protected-scandal.leverage 10 -> 22; state_parameter pl19-protected-scandal.protection 40 -> 36; state_parameter pl19-protected-scandal.exposure 60 -> 65; mood -0.020000000000000018_

- **1943.01** `state_tick:df18-borrowed-luck/luck-account/paid-a-little` tags: df18-borrowed-luck, luck, debt, obligation, superstition, risk, bargain, transfer
  半年过去，Gustav Moser还了一点钱，也替债主跑了两趟腿。债主没有夸Gustav Moser，只在账本上划掉一小行；Gustav Moser却发现，自己开始下意识地绕开那家店。
  _effects: cash -1 (还掉一小笔); state_parameter df18-borrowed-luck.debt 27 -> 19; state_parameter df18-borrowed-luck.luck 28 -> 31; mood 0.010000000000000009_

- **1943.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Gustav Moser把Grete Bauer的旧课本包上书皮，又在本子上签了名。Grete Bauer今年学会了自己系鞋带，也学会了在饭桌上说“不”；Gustav Moser听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 41 -> 49; state_parameter raising-child.caregiverBurden 51 -> 48; mood 0.020000000000000018_

- **1943.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Gustav Moser把Luise Bauer的旧课本包上书皮，又在本子上签了名。Luise Bauer今年学会了自己系鞋带，也学会了在饭桌上说“不”；Gustav Moser听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 44 -> 52; state_parameter raising-child.caregiverBurden 51 -> 48; mood 0.020000000000000018_

- **1943.01** `p9-social-daily-culture.lending-library/p9-social-daily-culture.lending-library.volksbibliothek` tags: daily, culture, leisure, cafe, music, walk, task, task:knowledge
  Gustav Moser听Friedrich Weiss 2报出押金数目，把伸进内袋的手又抽了回来。问清免费阅览处的位置后，Gustav Moser穿过两条街，在 Volksbibliothek 的阅览室门口登记了姓名，坐在长桌边读了一下午；一个赫勒没花，只是不能把书带回家，天黑前就得还回去。
  _effects: mood 0.030000000000000027; skill; relation acquaintance with person-materialized-world-vienna-1912-90; relation acquaintance with person-materialized-world-vienna-1912-90_

- **1943.01** `state_reaction:public-scandal/gossip` tags: public-scandal, scandal, reputation, social, state, state_reaction, courtship, friendship
  Gustav Moser走进咖啡馆时，邻桌的声音低了一拍。没有人当面说什么，但每个人都知道该说什么。
  _effects: mood -0.030000000000000027; reputation -0.02999999999999997_
  _causes: evt:world-vienna-1912:009655_

- **1943.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Luise Bauer这周主动擦了黑板。Gustav Moser把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 52 -> 55; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:009674_

- **1943.05** `ad20-market-day::ctx-vienna-authoritarian-1934::milieu-tenement/the-scale-is-light` tags: market, food, money, neighbor, everyday, credit, vienna, urban
  市场日的人挤到棚布底下。Josef Moser把Gustav Moser的篮子放上秤，秤砣往下一沉，又悄悄用拇指抵住秤杆。Gustav Moser看见了，没有说；Josef Moser多塞了两根葱，说“今天的葱不值钱”。Luise Kral 2从过道那头走来，两个人同时把篮子往身后挪了挪。
  _effects: cash 1 (a market stall gave short weight and then overpaid in change); relation acquaintance with person-materialized-world-vienna-1912-10; flag +market_short_weight; mood 0.020000000000000018; knowledge “市场那台秤的秤砣被摊主用拇指抵过。”_

- **1943.11** `vienna-tenement-neighbors.lost_room_key/key_lost_landlady` tags: home, social, family, housing
  Gustav Moser把钥匙丢在了回家路上的有轨电车轨道旁，天黑也没找着。房东太太说换锁芯要一克朗五十赫勒，从下月房租里扣。Gustav Weiss借给Gustav Moser一把旧挂锁，但锁鼻和门扣对不上，只能用铁丝拧着凑合。那夜Gustav Moser睡不踏实，总觉得有人在拧门。
  _effects: cash -1.5 (换锁芯费用); relation acquaintance with person:evt:world-vienna-1912:000571:child; mood -0.06000000000000005_

- **1944.01** `state_reaction:eh19-inherited-cause/death-reopens-the-cause` tags: eh19-inherited-cause, household, inheritance, politics, legacy, organization, promise, risk
  葬礼结束，亲戚们没有急着走。有人问起铁盒，有人问起那块木牌；Gustav Moser把最后一盘冷菜端回厨房，发现桌边已经没有人说话，只有叉子碰在盘沿上。
  _effects: state_parameter eh19-inherited-cause.legacy 47 -> 52; state_parameter eh19-inherited-cause.division 38 -> 42; state_parameter eh19-inherited-cause.risk 37 -> 39_
  _causes: evt:world-vienna-1912:009783_

- **1944.01** `p23-conman-amnesia::ctx-vienna-authoritarian-1934::milieu-tenement/the-policeman-at-the-next-table` tags: absurd, black_comedy, conman, memory, guilt, warmth, high_drama, vienna
  Katharina Hofer从隔壁桌站起来时，Luise Kral 3还在讲那个电车上认识的故事。Gustav Moser看见Luise Kral 3的手一直按在桌沿，指节发白。手铐扣上后，Luise Kral 3才慢慢转过头，说原来真的是你；那语气不像愤怒，倒像终于想起了一件旧事。
  _effects: state_add under-investigation state:world-vienna-1912:648; relation rival with person-materialized-world-vienna-1912-97; reputation -0.04999999999999999; mood -0.07000000000000006; flag +conman_arrested_

- **1944.01** `pc20-scandal.apology-letter::ctx-vienna-authoritarian-1934::milieu-tenement/accepted-apology` tags: scandal, apology, newspaper, reputation, public_reversal, second_chance, editor, vienna
  Gustav Moser在报纸第三版登了道歉，没有把责任推给酒、误会或别人。Katharina Hofer读完，把报纸折好放在桌上，说这不像Gustav Moser以前会写的话；Luise Kral 2在旁边补了一句，版面还留了四行。
  _effects: state_add pc20-public-reversal state:world-vienna-1912:649; state_add pc20-second-chance state:world-vienna-1912:650; relation acquaintance with person-materialized-world-vienna-1912-38; reputation 0.06; flag +public_apology_accepted; knowledge “道歉登在第三版，没有把责任推给酒、误会或别人。”; flag +public_reversal_active; flag +second_chance_open_

- **1944.01** `state_reaction:p22-scandal-engine/a-new-scandal-feeds-it` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Gustav Moser的新故事登出来时，旧的那一页也被重新翻到桌面上。Gustav Moser发现两件事共用同一个证人，而那个证人上周还来借过盐。
  _effects: state_parameter p22-scandal-engine.heat 70 -> 76; state_parameter p22-scandal-engine.reach 70 -> 74; state_parameter p22-scandal-engine.shame 76 -> 79; state_parameter p22-scandal-engine.leverage 35 -> 37; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:009962_

- **1944.01** `state_reaction:eh19-inherited-cause/purge-reaches-the-house` tags: eh19-inherited-cause, household, inheritance, politics, legacy, organization, promise, risk
  名单上的一个名字被带走了。Gustav Moser把铁盒从柜顶搬到床下，又觉得床下太潮；那天夜里，Gustav Moser第一次把盒子打开，没有点灯。
  _effects: state_parameter eh19-inherited-cause.risk 39 -> 47; state_parameter eh19-inherited-cause.commitment 50 -> 52; mood -0.040000000000000036_
  _causes: evt:world-vienna-1912:009978_

- **1944.01** `state_expire:df18-uncanny-mark` tags: df18-uncanny-mark, body, mark, omen, superstition, reputation, mystery, faith
  Gustav Moser的「不祥的印记」到期；相关安排结束。
  _effects: state_remove df18-uncanny-mark state:world-vienna-1912:386; flag +df18_mark_faded_

- **1944.01** `state_tick:eh19-inherited-cause/cause-year/keeps-the-promise` tags: eh19-inherited-cause, household, inheritance, politics, legacy, organization, promise, risk
  又一年过去，Gustav Moser仍把那只铁盒放在柜顶。盒里的名单没有添新名字，但每年总有人在同一天来敲门，坐一会儿，喝一杯水，再走。
  _effects: state_parameter eh19-inherited-cause.commitment 52 -> 55; state_parameter eh19-inherited-cause.legacy 52 -> 54; state_parameter eh19-inherited-cause.risk 47 -> 49; mood 0.010000000000000009_

- **1944.01** `state_tick:pl19-protected-scandal/the-network-meets/someone-wants-a-favor` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  有人替Gustav Moser挡了一次采访，随后在走廊里提起自己儿子的学徒期满。Gustav Moser知道这不是闲聊；当天晚上，那张写着名字的纸条被压在糖罐下面，像一枚没有付清的硬币。
  _effects: state_parameter pl19-protected-scandal.leverage 22 -> 34; state_parameter pl19-protected-scandal.protection 36 -> 32; state_parameter pl19-protected-scandal.exposure 65 -> 70; mood -0.020000000000000018_

- **1944.01** `state_tick:df18-borrowed-luck/luck-account/price-arrives` tags: df18-borrowed-luck, luck, debt, obligation, superstition, risk, bargain, transfer
  第六个月，债主在楼梯口拦住Gustav Moser，说利息不能总按原来的算法。Gustav Moser看着对方手里的账本，忽然发现那上面的墨迹比上次新，数字也比上次多。
  _effects: cash -2 (利息被重新计算); state_parameter df18-borrowed-luck.debt 19 -> 25; state_parameter df18-borrowed-luck.luck 31 -> 26; mood -0.030000000000000027_

- **1944.01** `state_expire:raising-child` tags: raising-child, family, child, care, school, household, state, state_tick
  Gustav Moser的「家里有个正在长大的孩子」到期；相关安排结束。
  _effects: state_remove raising-child state:world-vienna-1912:64_

- **1944.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Gustav Moser把Helene Weiss的旧课本包上书皮，又在本子上签了名。Helene Weiss今年学会了自己系鞋带，也学会了在饭桌上说“不”；Gustav Moser听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 60 -> 68; state_parameter raising-child.caregiverBurden 43 -> 40; mood 0.020000000000000018_

- **1944.01** `r13-fam.arrange-childcare::ctx-vienna-authoritarian-1934::milieu-tenement::childcare-war/creche-full` tags: task, care, childcare, work, neighbor, wages, vienna, urban
  托儿所的名额满了，管事的让Gustav Moser把孩子送到城另一头的教会收容所。Gustav Moser算了一趟车钱和路上的时辰，知道赶不上早班。Luise Winter 3在门口听见，说可以替Gustav Moser看半天，另一半时间让邻居轮着来；Gustav Moser把孩子的名字写在纸条上，贴在自己工牌背面。
  _effects: cash -1 (上工前把小的送下楼); condition; flag +shared_childcare_with_neighbours; relation friend with person-materialized-world-vienna-1912-105; knowledge “the neighbours will take turns watching the child”; relation acquaintance with person-materialized-world-vienna-1912-105_

- **1944.04** `state_reaction:public-scandal/gossip` tags: public-scandal, scandal, reputation, social, state, state_reaction, inheritance, absurd
  Gustav Moser走进咖啡馆时，邻桌的声音低了一拍。没有人当面说什么，但每个人都知道该说什么。
  _effects: mood -0.030000000000000027; reputation -0.030000000000000027_
  _causes: evt:world-vienna-1912:010466_

- **1944.10** `fa17-cabaret.debut::ctx-vienna-postwar-1945::milieu-tenement/held-the-room` tags: art, performance, cabaret, debut, reputation, failure, theatre, vienna
  首演夜，Gustav Moser在第二首歌的中间忘了两句词，干脆停下来听乐队多走了一个小节，再接着唱。台下有人以为这是新加的停顿，笑了一声，随后整间屋子都放松了。Friedrich Berg在后台说，今晚之后，节目单上可以印Gustav Moser的名字。
  _effects: state_add fame state:world-vienna-1912:702; cash 2 (首演酬劳与加演分成); reputation 0.06; skill_

- **1944.12** `state_reaction:eh19-inherited-cause/inheritance-arrives` tags: eh19-inherited-cause, household, inheritance, politics, legacy, organization, promise, risk
  律师念到“旧文件与木牌归……”时停了一下，因为清单上没有写清楚。Gustav Moser回家后把铁盒重新翻了一遍，发现名单少了一页；没有人承认拿过。
  _effects: state_parameter eh19-inherited-cause.legacy 54 -> 57; state_parameter eh19-inherited-cause.division 42 -> 44; knowledge “遗嘱里有一行字，把旧组织的名单和房子写在了同一页。”_
  _causes: evt:world-vienna-1912:010335_

- **1945.01** `vienna-life-1945-liberation/survives` tags: war, liberation, 1945
  苏联士兵进城时，Gustav Moser躲在门后听见坦克履带压过石板路。几天后街口贴出告示，Gustav Moser去领了一份汤和一块面包。
  _effects: role; food; cash -2 (replacement documents)_

- **1945.01** `vienna-family-same-sex-male/private-arrangement` tags: family, intimacy, same_sex, persecution, lifecycle, partnership
  Gustav Moser和Friedrich Weiss 2在城边租了一间小屋，对外只说是同事合住。房租四克朗，两人不同时出门，信件用假名，夜里把窗帘拉严；Friedrich Weiss 2在门后放了一根木棍，Gustav Moser把两人的工票分开放，连咳嗽都压着声。
  _effects: relation partner with person-materialized-world-vienna-1912-90; mood 0.040000000000000036; cash -4 (separate room rent)_

- **1945.01** `cj17-police.lineup::ctx-vienna-postwar-1945::milieu-tenement/bought-the-witness` tags: police, court, legal, investigation, mistaken_identity, humiliation, vienna, urban
  家里凑了三克朗，由Gustav Moser的家里人在咖啡馆后门交给Anna Berg。第二天，Anna Berg在预审室里说光线太暗，认不清。Josef Weiss合上本子，说证据不足，但没有把案子结掉。Gustav Moser知道那张纸还在某个抽屉里，只是暂时不压在自己身上。
  _effects: cash -3 (在咖啡馆后门交给证人的钱); state_parameter under-investigation.progress 50 -> 45; relation acquaintance with person-materialized-world-vienna-1912-12; flag +witness_paid_off; knowledge “证人收了钱才说光线太暗，案子并没有真正结掉。”; mood -0.030000000000000027; state_add cj17-wanted state:world-vienna-1912:701; relation acquaintance with person-materialized-world-vienna-1912-112; flag +wanted_by_authorities_

- **1945.01** `state_reaction:cj17-wanted/a-uniform-on-the-stair` tags: cj17-wanted, crime, police, pursuit, wanted, risk, debt, state
  Gustav Moser听见楼梯间有军刀碰到栏杆的声音，立刻把灯拧小。脚步声在上一层停了一会儿，又往下走；第二天，房东说昨晚有人来问过三楼住着谁。
  _effects: state_parameter cj17-wanted.heat 20 -> 26; mood -0.030000000000000027_
  _causes: evt:world-vienna-1912:010479_

- **1945.01** `state_tick:eh19-inherited-cause/cause-year/the-house-divides` tags: eh19-inherited-cause, household, inheritance, politics, legacy, organization, promise, risk
  家里为那只铁盒吵了一次。有人说该交给档案馆，有人说该烧掉，还有人问为什么要把上一代的事算在这一代头上；Gustav Moser把盒子抱回房间，门没有关严。
  _effects: state_parameter eh19-inherited-cause.division 44 -> 52; state_parameter eh19-inherited-cause.commitment 55 -> 52; mood -0.030000000000000027_

- **1945.01** `state_expire:blacklisted` tags: blacklisted, work, stigma, politics, employment, state, state_tick, state:blacklisted
  Gustav Moser的「雇主黑名单」到期；相关安排结束。
  _effects: state_remove blacklisted state:world-vienna-1912:553; flag -blacklisted_

- **1945.01** `state_expire:p22-scandal-engine` tags: p22-scandal-engine, scandal_engine, scandal, rumor, secret, leverage, shame, network
  Gustav Moser的「流言发动机」到期；相关安排结束。
  _effects: state_remove p22-scandal-engine state:world-vienna-1912:554_

- **1945.01** `state_tick:pl19-protected-scandal/the-network-meets/network-holds` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  Gustav Moser又在后间见了那几个人。谁也没有提名字，只把下个月的班次、钥匙和该打的电话分了一遍；出门时，Gustav Moser发现自己的围巾被人重新叠过，像一件被妥善保管的证物。
  _effects: state_parameter pl19-protected-scandal.exposure 70 -> 65; state_parameter pl19-protected-scandal.protection 32 -> 36; state_parameter pl19-protected-scandal.publicHeat 55 -> 53; mood 0.010000000000000009_

- **1945.01** `state_expire:df18-borrowed-luck` tags: df18-borrowed-luck, luck, debt, obligation, superstition, risk, bargain, transfer
  Gustav Moser的「借来的好运」到期；相关安排结束。
  _effects: state_remove df18-borrowed-luck state:world-vienna-1912:556; flag +df18_luck_settled_

- **1945.01** `state_expire:public-scandal` tags: public-scandal, scandal, reputation, social, state, state_tick, state:public-scandal
  Gustav Moser的「公开丑闻」到期；相关安排结束。
  _effects: state_remove public-scandal state:world-vienna-1912:603_

- **1945.01** `state_tick:under-investigation/case-progress/evidence` tags: under-investigation, legal, police, investigation, risk, state, state_tick
  调查员又来找Gustav Moser谈了一次。问话比上次具体，记录也比上次长。
  _effects: state_parameter under-investigation.progress 45 -> 60; mood -0.040000000000000036_

- **1945.01** `state_tick:pc20-public-reversal/file-moves/the-file-disappears` tags: pc20-public-reversal, public_reversal, exoneration, accusation, testimony, proof, pressure, support
  Gustav Moser按约定时间去调卷，窗口的人说编号不对，又说管库的人病了。走廊尽头的门开着，里面只剩空架子和一层灰；Gustav Moser把手伸进去，摸到的是一截断掉的麻绳。
  _effects: state_parameter pc20-public-reversal.proof 55 -> 47; state_parameter pc20-public-reversal.danger 35 -> 41; state_parameter pc20-public-reversal.pressure 40 -> 45; mood -0.030000000000000027_

- **1945.01** `state_tick:pc20-second-chance/kept-word/small-relapse` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  Gustav Moser晚了半个钟头，进门时先解释路上的电车，又解释口袋里的收据。对方没有追问，只把已经凉掉的汤端回厨房；Gustav Moser听见锅盖碰在灶台上，知道这次不是天气的问题。
  _effects: state_parameter pc20-second-chance.credibility 55 -> 48; state_parameter pc20-second-chance.suspicion 30 -> 38; state_parameter pc20-second-chance.debt 20 -> 23; mood -0.030000000000000027_

- **1945.01** `r14-soc.club-election::ctx-vienna-postwar-1945::milieu-tenement/won-by-three-votes` tags: task, club_election, club, status, community, vienna, urban, postwar
  合唱团在酒馆后厅改选，票箱是一只装饼干的铁盒。唱票唱到第三遍，Gustav Moser比Josef Moser多三票。Josef Moser把账本推过来，说“你接”。散会后，两人在门口抽完同一支烟，谁也没有先提那三票。账本第一页记着上次义卖的收入，数字旁边有一道被擦过的铅笔痕。
  _effects: mood 0.12; reputation 0.08000000000000002; flag +won_club_election; role; relation acquaintance with person-materialized-world-vienna-1912-10_

- **1945.01** `vienna-medical-treatment.night-fever/hospital-night` tags: health, medical, family, money
  电车在环城大道上哐当响，Franz Lechner攥着Gustav Moser的胳膊，怕人从座位上滑下去。急诊厅的煤气灯发黄，长椅上全是咳嗽声，押金窗口的铜盘递出两克朗，换来一张硬纸号牌。
  _effects: cash -2 (医院急诊押金); health 0.08 (急诊观察和冰敷退烧); relation friend with person-franz-lechner_

- **1945.04** `bc18-inherit.parrot-condition::ctx-vienna-postwar-1945::milieu-tenement/parrot-repeats-secret` tags: inheritance, family, condition, absurd, death, legal, quiet, vienna
  鹦鹉在公证处忽然开口，反复说“盒子在钟后面”。Elisabeth Bauer 2脸色变了，Anna Berg说鸟只会学舌；可回家一找，钟后面真有一只铁盒，里面是姑妈早年存下的银器。亲戚们打起了官司，Gustav Moser作为养鸟人出庭，拿了三克朗证人费，也记住了Anna Berg在庭上擦汗的样子。
  _effects: cash 3 (出庭作证的证人费); reputation 0.020000000000000018; relation rival with person-materialized-world-vienna-1912-12; knowledge “公证人知道钟后面的铁盒，却从没在遗嘱里提起。”; condition; flag +parrot_revealed_the_silver; mood 0.020000000000000018_

- **1945.11** `p21-absurd-inheritance::ctx-vienna-postwar-1945::milieu-tenement/the-debt-comes-with-the-room` tags: inheritance, absurd, family, secret, debt, fortune, legal, windfall
  衣帽间的门打开以后，先掉出来的是一叠催缴单。Luise Kral 2把数目加了两遍，说遗产税、欠租和一位“贝尔格夫人”的年金都挂在房子上；Maria Winter退后一步，Berta Bauer 2把钥匙放回Gustav Moser手里，像放回一块烫过的铁。
  _effects: cash -5 (inheritance tax and arrears came with the room); state_add debt-bondage state:world-vienna-1912:732; state_add p21-fortune-reversal state:world-vienna-1912:733; relation acquaintance with person-materialized-world-vienna-1912-33; flag +inherited_a_debt; knowledge “催缴单上写着遗产税、欠租和一位“贝尔格夫人”的年金。”; mood -0.040000000000000036; relation acquaintance with person-materialized-world-vienna-1912-128; flag +fortune_reversal_active_

- **1945.11** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Helene Weiss这周主动擦了黑板。Gustav Moser把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 68 -> 71; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:011016_

- **1946.01** `p21-public-humiliation::ctx-vienna-postwar-1945::milieu-tenement/the-story-is-read-aloud` tags: humiliation, public, spectacle, charity, fame, scandal, reputation, high_drama
  Luise Kral 2在台上说要“念一段真正的慈善故事”，从信封里抽出一叠旧信。第一封读到一半，Gustav Moser就听出那是自己三年前写的；Friedrich Weiss 2的杯子在托盘上碰响了一下，Anton Kral伸手去够话筒，但笑声已经先从后排传开了。
  _effects: state_add public-scandal state:world-vienna-1912:730; state_add p21-scandal-web state:world-vienna-1912:731; relation partner with person-materialized-world-vienna-1912-90; reputation -0.06; flag +letters_read_in_public; knowledge “第一封读到一半，当事人就听出那是自己三年前写的。”; cash -2 (the charity pledge was still on the books); mood -0.05999999999999994; flag +scandal_web_active_

- **1946.01** `state_reaction:fame/scandal` tags: fame, reputation, media, status, state, state_reaction, humiliation, public
  Gustav Moser的名字出现在报纸上，但这次不是在文化版。街角的报童把那一版折到最上面。
  _effects: reputation -0.08000000000000002; state_parameter fame.notoriety false -> true_
  _causes: evt:world-vienna-1912:010941_

- **1946.01** `state_tick:eh19-inherited-cause/cause-year/keeps-the-promise` tags: eh19-inherited-cause, household, inheritance, politics, legacy, organization, promise, risk
  又一年过去，Gustav Moser仍把那只铁盒放在柜顶。盒里的名单没有添新名字，但每年总有人在同一天来敲门，坐一会儿，喝一杯水，再走。
  _effects: state_parameter eh19-inherited-cause.commitment 52 -> 55; state_parameter eh19-inherited-cause.legacy 57 -> 59; state_parameter eh19-inherited-cause.risk 49 -> 51; mood 0.010000000000000009_

- **1946.01** `state_expire:pl19-protected-scandal` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  Gustav Moser的「被小圈子护住的私情」到期；相关安排结束。
  _effects: state_remove pl19-protected-scandal state:world-vienna-1912:555; flag -protected_scandal_active_

- **1946.01** `state_expire:under-investigation` tags: under-investigation, legal, police, investigation, risk, state, state_tick, state:under-investigation
  Gustav Moser的「被调查」到期；相关安排结束。
  _effects: state_remove under-investigation state:world-vienna-1912:648_

- **1946.01** `state_tick:pc20-public-reversal/file-moves/the-file-disappears` tags: pc20-public-reversal, public_reversal, exoneration, accusation, testimony, proof, pressure, support
  Gustav Moser按约定时间去调卷，窗口的人说编号不对，又说管库的人病了。走廊尽头的门开着，里面只剩空架子和一层灰；Gustav Moser把手伸进去，摸到的是一截断掉的麻绳。
  _effects: state_parameter pc20-public-reversal.proof 47 -> 39; state_parameter pc20-public-reversal.danger 41 -> 47; state_parameter pc20-public-reversal.pressure 45 -> 50; mood -0.030000000000000027_

- **1946.01** `state_tick:pc20-second-chance/kept-word/small-relapse` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  Gustav Moser晚了半个钟头，进门时先解释路上的电车，又解释口袋里的收据。对方没有追问，只把已经凉掉的汤端回厨房；Gustav Moser听见锅盖碰在灶台上，知道这次不是天气的问题。
  _effects: state_parameter pc20-second-chance.credibility 48 -> 41; state_parameter pc20-second-chance.suspicion 38 -> 46; state_parameter pc20-second-chance.debt 23 -> 26; mood -0.030000000000000027_

- **1946.01** `state_expire:cj17-wanted` tags: cj17-wanted, crime, police, pursuit, wanted, risk, debt, state
  Gustav Moser的「被追捕」到期；相关安排结束。
  _effects: state_remove cj17-wanted state:world-vienna-1912:701; flag -wanted_by_authorities_

- **1946.01** `state_tick:debt-bondage/interest/pay-interest` tags: debt-bondage, debt, work, poverty, legal, state, state_tick
  Gustav Moser又付了一年的利息。本金几乎没动，债主的账本却翻到了新一页。
  _effects: cash -3 (debt interest); state_parameter debt-bondage.debt 45 -> 47_

- **1946.01** `state_tick:p21-fortune-reversal/the-crowd-recounts/the-crowd-remembers` tags: p21-fortune-reversal, fortune_reversal, fortune, reversal, inheritance, ruin, public, witnesses
  一年过去，街上还有人记得Gustav Moser那阵子的排场。债主没有立刻上门，亲戚也还愿意在星期天来吃饭；Gustav Moser把新添的银器擦了一遍，发现其中一只底下刻着别人的名字。
  _effects: state_parameter p21-fortune-reversal.height 25 -> 29; state_parameter p21-fortune-reversal.witnesses 40 -> 46; state_parameter p21-fortune-reversal.fragility 80 -> 83; mood 0.020000000000000018_

- **1946.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Gustav Moser把Grete Bauer的旧课本包上书皮，又在本子上签了名。Grete Bauer今年学会了自己系鞋带，也学会了在饭桌上说“不”；Gustav Moser听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 49 -> 57; state_parameter raising-child.caregiverBurden 48 -> 45; mood 0.020000000000000018_

- **1946.01** `state_tick:raising-child/school-year/learns` tags: raising-child, family, child, care, school, household, state, state_tick
  Gustav Moser把Luise Bauer的旧课本包上书皮，又在本子上签了名。Luise Bauer今年学会了自己系鞋带，也学会了在饭桌上说“不”；Gustav Moser听着，觉得屋子比去年更满。
  _effects: state_parameter raising-child.schoolProgress 55 -> 63; state_parameter raising-child.caregiverBurden 48 -> 45; mood 0.020000000000000018_

- **1946.01** `p9-social-daily-culture.cafe-newspaper/p9-social-daily-culture.cafe-newspaper.read-all` tags: daily, culture, leisure, cafe, music, walk, task, task:daily
  Gustav Moser把木架上的《新自由报》从头版读到讣告栏，中间续了两次水，第三杯 Melange 端上来时奶泡已经塌了，三杯一共六十赫勒。侍者把找零的铜板拍在桌上，没有催的意思；Gustav Moser折好报纸夹回木架，记住了议会辩论里的两个名字，出门时雨还没停。
  _effects: cash -0.6 (三杯 Melange 的咖啡钱); mood 0.050000000000000044; skill_

- **1946.01** `state_reaction:raising-child/school-note` tags: raising-child, family, child, care, school, household, state, state_reaction
  老师托人带来一张纸条，说Luise Bauer这周主动擦了黑板。Gustav Moser把纸条压在桌玻璃下面；那张玻璃下面已经有三张纸条了。
  _effects: state_parameter raising-child.schoolProgress 63 -> 66; mood 0.020000000000000018_
  _causes: evt:world-vienna-1912:011208_

- **1946.02** `vienna-courtship-courtyard.breakup/courtyard-quarrel` tags: adulthood, courtship, partner, social, family, separation
  话没说完就变成了争。Friedrich Weiss 2把外套扔在晾衣杆下，Gustav Moser说了一句不中听的，声音大得整院都听见。Alois Berg在三楼把窗开了一条缝，看完了全程，第二天院子里人人都知道；这一架把两个人的关系吵断了，也把Gustav Moser的名字在院子里吵薄了一层。
  _effects: relation_end partner with person-materialized-world-vienna-1912-90; reputation -0.06999999999999995; relation acquaintance with person-materialized-world-vienna-1912-9; mood -0.09999999999999998; relation acquaintance with person-materialized-world-vienna-1912-9_

- **1946.05** `hs18-radio.rumor::ctx-vienna-postwar-1945::milieu-tenement/sell-the-news` tags: radio, blackout, rumor, panic, neighbor, politics, vienna, urban
  Gustav Moser把听到的消息带到街角，换了两支蜡烛和一包盐。不到半小时，杂货店门口排起队；巡街的人赶来问消息从哪里来，Gustav Moser说收音机里，大家都听见了。
  _effects: state_add hs18-blackout-rumor state:world-vienna-1912:781; cash 1 (candles and salt for the news); food; reputation -0.020000000000000018; flag +spread_radio_rumor_

- **1946.05** `state_reaction:public-scandal/gossip` tags: public-scandal, scandal, reputation, social, state, state_reaction, radio, blackout
  Gustav Moser走进咖啡馆时，邻桌的声音低了一拍。没有人当面说什么，但每个人都知道该说什么。
  _effects: mood -0.030000000000000027; reputation -0.030000000000000027_
  _causes: evt:world-vienna-1912:011459_

- **1946.10** `vienna-legacy-worklife.hours-ledger/hours-ledger.sign` tags: legacy, work, family, reform, ordinary_life
  老工人凑近看那张表，说这纸比工资袋还薄。Gustav Moser把拇指蘸进印泥，按下去时听见工头说了句“下一个”。学徒在旁边数少掉的铜板，数到四十赫勒时不出声了。
  _effects: cash -1 (星期六下午减少的计件工钱); mood 0.050000000000000044; flag +accepted_hours_reform_

- **1947.01** `pl19-bridge.public-rumor::ctx-vienna-postwar-1945::milieu-tenement/the-list-writes-itself` tags: scandal, protection, network, press, media, rumor, bridge, vienna
  Gustav Moser在报纸上看见自己的名字和一张旧照片，报纸像一盏关不掉的灯。Emil Winter提议找几个人替Gustav Moser挡电话、挡记者、挡亲戚；Gustav Moser说不用，第二天却发现Emil Winter已经把名单写好了，最上面一行是Gustav Moser自己。
  _effects: state_add pl19-protected-scandal state:world-vienna-1912:780; relation friend with person-materialized-world-vienna-1912-36; reputation -0.020000000000000018; knowledge “名单最上面一行是当事人的名字。”; flag +protected_scandal_active_

- **1947.01** `state_reaction:pc20-second-chance/public-doubt` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  旧事被人在街上重新提起，Gustav Moser的名字和另一件事绑在一起。有人替Gustav Moser辩解，也有人只笑了一声；Gustav Moser回家后把当天的收据一张张摊开，像在给自己准备证词。
  _effects: state_parameter pc20-second-chance.suspicion 46 -> 54; state_parameter pc20-second-chance.credibility 41 -> 37; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:011455_

- **1947.01** `state_reaction:ml18-sudden-fortune/the-papers-hear-about-it` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  报纸的社会版把Gustav Moser家的门牌号和那笔钱的数目印在一起，标题是“一笔不该有的好运”。第二天门口多了两个陌生人，一个说是远亲，一个说代表一家孤儿院。
  _effects: state_parameter ml18-sudden-fortune.public true -> true; state_parameter ml18-sudden-fortune.claims 2 -> 4; reputation -0.020000000000000018; flag +windfall_went_public_
  _causes: evt:world-vienna-1912:011455_

- **1947.01** `state_reaction:pl19-protected-scandal/a-public-question` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  有人在一场公开活动里问起Gustav Moser的“私人安排”，语气客气，问题却像一根针。Gustav Moser笑着答了别的事，回家后才发现手心全是汗。
  _effects: state_parameter pl19-protected-scandal.publicHeat 55 -> 67; state_parameter pl19-protected-scandal.protection 40 -> 34; reputation -0.030000000000000027_
  _causes: evt:world-vienna-1912:011455_

- **1947.01** `state_tick:eh19-inherited-cause/cause-year/cost-arrives` tags: eh19-inherited-cause, household, inheritance, politics, legacy, organization, promise, risk
  房东来收租时看见门口那块旧木牌，问是不是还有人在里面开会。Gustav Moser说只是家里人；房东走后，Gustav Moser把木牌翻过来，背面还留着上一代的字。
  _effects: state_parameter eh19-inherited-cause.risk 59 -> 65; cash -1 (the rent was raised after the question); state_parameter eh19-inherited-cause.legacy 59 -> 61; mood -0.020000000000000018_

- **1947.01** `state_tick:pc20-public-reversal/file-moves/a-copy-survives` tags: pc20-public-reversal, public_reversal, exoneration, accusation, testimony, proof, pressure, support
  书记员把一份抄件从抽屉底下抽出来，说原件已经调走，但这一份还在。Gustav Moser看见纸上自己的名字被红笔圈过，旁边有一行小字：此页曾由第三人核对。
  _effects: state_parameter pc20-public-reversal.proof 39 -> 46; state_parameter pc20-public-reversal.pressure 50 -> 54; state_parameter pc20-public-reversal.danger 47 -> 44; knowledge “档案里还有一份抄件，曾经由第三人核对过。”_

- **1947.01** `state_tick:pc20-second-chance/kept-word/small-relapse` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  Gustav Moser晚了半个钟头，进门时先解释路上的电车，又解释口袋里的收据。对方没有追问，只把已经凉掉的汤端回厨房；Gustav Moser听见锅盖碰在灶台上，知道这次不是天气的问题。
  _effects: state_parameter pc20-second-chance.credibility 37 -> 30; state_parameter pc20-second-chance.suspicion 54 -> 62; state_parameter pc20-second-chance.debt 26 -> 29; mood -0.030000000000000027_

- **1947.01** `state_expire:fame` tags: fame, reputation, media, status, state, state_tick, state:fame
  Gustav Moser的「公众名声」到期；相关安排结束。
  _effects: state_remove fame state:world-vienna-1912:702_

- **1947.01** `state_tick:p21-scandal-web/the-web-tightens/the-keeper-sells` tags: p21-scandal-web, scandal_web, scandal, secret, blackmail, network, leverage, danger
  那个替Gustav Moser保管信件的人把副本卖给了报社。Gustav Moser是在报摊上看见自己的名字的；标题不大，但旁边配了一张旧照片，照片里的门牌还认得出来。
  _effects: state_parameter p21-scandal-web.exposure 80 -> 92; state_parameter p21-scandal-web.loyalty 25 -> 13; state_parameter p21-scandal-web.danger 55 -> 65; flag +scandal_web_sold; mood -0.009999999999999898_

- **1947.01** `state_tick:debt-bondage/interest/pay-interest` tags: debt-bondage, debt, work, poverty, legal, state, state_tick
  Gustav Moser又付了一年的利息。本金几乎没动，债主的账本却翻到了新一页。
  _effects: cash -3 (debt interest); state_parameter debt-bondage.debt 47 -> 49_

- **1947.01** `state_tick:p21-fortune-reversal/the-crowd-recounts/the-scaffold-shakes` tags: p21-fortune-reversal, fortune_reversal, fortune, reversal, inheritance, ruin, public, witnesses
  一笔该到的钱没有到。Gustav Moser在账房里坐到天黑，听见隔壁把算盘珠子拨得很快；回家时，门口已经有人等着，手里拿着一份折过三次的账单。
  _effects: state_parameter p21-fortune-reversal.height 29 -> 21; state_parameter p21-fortune-reversal.fragility 83 -> 91; state_parameter p21-fortune-reversal.debt 70 -> 75; reputation -0.020000000000000018; flag +fortune_scaffold_shook_

- **1947.01** `state_tick:ml18-sudden-fortune/fortune-year/money-keeps-working` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  一年过去，钱没有变多，却也没有一下花完。Gustav Moser把一部分存进邮局储蓄所，一部分借给楼下的鞋匠；鞋匠每月送来一双补好的鞋，利息就夹在鞋垫下面。街口的杂货商开始把好面粉留到Gustav Moser来的时候。
  _effects: cash 2 (interest and small repayments on the windfall); state_parameter ml18-sudden-fortune.claims 5 -> 6; mood 0.010000000000000009_

- **1947.01** `state_expire:raising-child` tags: raising-child, family, child, care, school, household, state, state_tick
  Gustav Moser的「家里有个正在长大的孩子」到期；相关安排结束。
  _effects: state_remove raising-child state:world-vienna-1912:77_

- **1947.01** `state_tick:raising-child/school-year/struggles` tags: raising-child, family, child, care, school, household, state, state_tick
  Gustav Moser被叫到学校，老师说Helene Weiss这学期总在课上看窗外。回家的路上，Gustav Moser没有骂，只把买好的铅笔又数了一遍；晚饭时，两个人都吃得很少。
  _effects: state_parameter raising-child.schoolProgress 71 -> 66; state_parameter raising-child.caregiverBurden 40 -> 45; cash -2 (extra lessons and replacement pencils); mood -0.010000000000000009_

- **1947.01** `r13-civ.join-charity::ctx-vienna-postwar-1945::milieu-tenement/donated-first` tags: social, charity, membership, poverty, respectability, vienna, urban, postwar
  Emil Winter说可以先不交会费，但要先跟着去一趟贫民巷。Gustav Moser提着一篮旧衣服走了一下午，回来时在登记簿上签了名。Emil Winter把一枚铜制小徽章别在Gustav Moser的衣领上。
  _effects: cash -3 (慈善会登记簿上的空行); reputation 0.050000000000000044; flag +joined_charity_after_donation; role_

- **1947.02** `state_reaction:eh19-inherited-cause/purge-reaches-the-house` tags: eh19-inherited-cause, household, inheritance, politics, legacy, organization, promise, risk
  名单上的一个名字被带走了。Gustav Moser把铁盒从柜顶搬到床下，又觉得床下太潮；那天夜里，Gustav Moser第一次把盒子打开，没有点灯。
  _effects: state_parameter eh19-inherited-cause.risk 51 -> 59; state_parameter eh19-inherited-cause.commitment 55 -> 57; mood -0.040000000000000036_
  _causes: evt:world-vienna-1912:011511_

- **1947.02** `state_reaction:ml18-sudden-fortune/a-relative-remembers` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  一个多年没走动的亲戚提着一盒点心上门，先问Gustav Moser的身体，再问那笔钱是怎么来的。临走时他说起小时候替Gustav Moser家垫过一冬天的煤钱，数字记不清了，但意思很清楚。
  _effects: state_parameter ml18-sudden-fortune.claims 4 -> 5; flag +windfall_claim_by_relative; mood -0.020000000000000018_
  _causes: evt:world-vienna-1912:011513_

- **1947.07** `vienna-medical-treatment.toothache/drops-and-endure` tags: health, medical, family, money
  药房伙计从褐色瓶里倒出药水，叮嘱别咽。Gustav Hofer在柜台边说，这玩意儿治标不治本。Gustav Moser把棉球塞进嘴里，腮帮子鼓出一块，走回巷子时拿手帕捂着脸，怕风吹。
  _effects: cash -0.6 (牙痛药水); condition; relation acquaintance with person-materialized-world-vienna-1912-120_

- **1947.08** `r3-war.veterans-hall::ctx-vienna-postwar-1945::milieu-tenement/joined-veterans-association` tags: war, veterans, association, organization, postwar, vienna, urban, reform
  Mitzi Hofer把名册摊在酒馆后屋，让Gustav Moser在“伤兵”和“未伤”两栏里选。Gustav Moser说自己在战壕里冻掉两个脚趾，Mitzi Hofer说那不算伤；Luise Lechner 2在旁边敲了敲杯子，说“算不算，先喝一杯”。
  _effects: flag +joined_veterans_association; role; relation acquaintance with person-materialized-world-vienna-1912-44; relation friend with person-materialized-world-vienna-1912-55; organization_membership; knowledge “the association separates wounded from unwounded”; relation acquaintance with person-materialized-world-vienna-1912-44_

- **1948.01** `p23-border-smuggler::ctx-vienna-postwar-1945::milieu-tenement/the-guard-waves-the-car-through` tags: crime, border, smuggling, fear, violence, medicine, high_drama, vienna
  Luise Kral 2用手电筒照了照后备箱，又照了照Gustav Moser的脸，最后把光移开。车开过界碑时，Mitzi Winter在后座低声笑，说这年头连哨兵都知道谁在养着边境。Gustav Moser握着方向盘，指缝里全是汗，后视镜里的灯越来越小。
  _effects: cash 15 (the border guard waved the car through); state_add p23-dangerous-secret state:world-vienna-1912:826; state_add under-investigation state:world-vienna-1912:827; relation acquaintance with person-materialized-world-vienna-1912-33; flag +border_bribe_

- **1948.01** `state_tick:eh19-inherited-cause/cause-year/the-house-divides` tags: eh19-inherited-cause, household, inheritance, politics, legacy, organization, promise, risk
  家里为那只铁盒吵了一次。有人说该交给档案馆，有人说该烧掉，还有人问为什么要把上一代的事算在这一代头上；Gustav Moser把盒子抱回房间，门没有关严。
  _effects: state_parameter eh19-inherited-cause.division 52 -> 60; state_parameter eh19-inherited-cause.commitment 57 -> 54_

- **1948.01** `state_expire:pc20-public-reversal` tags: pc20-public-reversal, public_reversal, exoneration, accusation, testimony, proof, pressure, support
  Gustav Moser的「公开翻案」到期；相关安排结束。
  _effects: state_remove pc20-public-reversal state:world-vienna-1912:649; flag -public_reversal_active_

- **1948.01** `state_expire:pc20-second-chance` tags: pc20-second-chance, second_chance, reconciliation, return, failure, trust, debt, hope
  Gustav Moser的「第二次机会」到期；相关安排结束。
  _effects: state_remove pc20-second-chance state:world-vienna-1912:650; flag -second_chance_open_

- **1948.01** `state_expire:public-scandal` tags: public-scandal, scandal, reputation, social, state, state_tick, state:public-scandal
  Gustav Moser的「公开丑闻」到期；相关安排结束。
  _effects: state_remove public-scandal state:world-vienna-1912:730_

- **1948.01** `state_tick:p21-scandal-web/the-web-tightens/a-strand-snaps` tags: p21-scandal-web, scandal_web, scandal, secret, blackmail, network, leverage, danger
  一个证人搬走了，带走了他那一份记忆。Gustav Moser在旧地址门口站了半个下午，回来时发现信箱里多了一张没有署名的明信片，上面只写着“我还记得”。
  _effects: state_parameter p21-scandal-web.exposure 92 -> 100; state_parameter p21-scandal-web.leverage 60 -> 54; state_parameter p21-scandal-web.danger 65 -> 70; reputation -0.020000000000000018; flag +scandal_witness_left_

- **1948.01** `state_tick:debt-bondage/interest/pay-interest` tags: debt-bondage, debt, work, poverty, legal, state, state_tick
  Gustav Moser又付了一年的利息。本金几乎没动，债主的账本却翻到了新一页。
  _effects: cash -3 (debt interest); state_parameter debt-bondage.debt 49 -> 51_

- **1948.01** `state_tick:p21-fortune-reversal/the-crowd-recounts/the-crowd-remembers` tags: p21-fortune-reversal, fortune_reversal, fortune, reversal, inheritance, ruin, public, witnesses
  一年过去，街上还有人记得Gustav Moser那阵子的排场。债主没有立刻上门，亲戚也还愿意在星期天来吃饭；Gustav Moser把新添的银器擦了一遍，发现其中一只底下刻着别人的名字。
  _effects: state_parameter p21-fortune-reversal.height 21 -> 25; state_parameter p21-fortune-reversal.witnesses 46 -> 52; state_parameter p21-fortune-reversal.fragility 91 -> 94; mood 0.020000000000000018_

- **1948.01** `state_tick:ml18-sudden-fortune/fortune-year/money-slips-away` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  钱在一年里薄了一层：屋顶要修，姐夫来借，彩票站的老主顾说有个稳赚的买卖。Gustav Moser把账本翻到最后一页，发现写下的支出比记得的多出四克朗；窗外有人在敲铁皮，声音像在催账。
  _effects: state_parameter ml18-sudden-fortune.principal 78 -> 73; state_parameter ml18-sudden-fortune.spent 0 -> 5; cash -1 (the account does not balance); mood -0.020000000000000018_

- **1948.01** `state_tick:pl19-protected-scandal/the-network-meets/network-holds` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  Gustav Moser又在后间见了那几个人。谁也没有提名字，只把下个月的班次、钥匙和该打的电话分了一遍；出门时，Gustav Moser发现自己的围巾被人重新叠过，像一件被妥善保管的证物。
  _effects: state_parameter pl19-protected-scandal.exposure 60 -> 55; state_parameter pl19-protected-scandal.protection 34 -> 38; state_parameter pl19-protected-scandal.publicHeat 67 -> 65; mood 0.010000000000000009_

- **1948.01** `agency:attend_meeting` tags: agency, agency:attend_meeting
  Gustav Moser走到Leopoldstädter Zinshaus, gemeinsamer Gang门口，看见便衣和拥挤的人群，最终没有进去。
  _effects: mood -0.010000000000000009_

- **1948.07** `vienna-market-household.friday-fish/friday-fish.share` tags: home, market, food, social
  Gustav Moser拎着鱼上楼，看见Lena蹲在门口用刀刮锅底。Gustav Moser把鱼放在两家之间的窗台上，切了一半推过去。第二天门口多了一小袋面粉。
  _effects: cash -6 (买鱼); food; relation acquaintance with person-phase15-Lena-world-vienna-1912_

- **1948.07** `vienna-historical-social-movement.public-meeting/speak-with-rent-numbers` tags: history, historical_process, social_movement, organization, politics
  Gustav Moser没有喊口号，只问在场谁家的煤还够烧三天。十几只手举起来，连Mitzi Hofer 2也举了。书记说这些数字比演说有用，散会时几个人围上来问自己那条街怎么算。
  _effects: reputation 0.06; skill; relation acquaintance with person-materialized-world-vienna-1912-132; relation acquaintance with person-materialized-world-vienna-1912-132_

- **1948.12** `state_reaction:eh19-inherited-cause/death-reopens-the-cause` tags: eh19-inherited-cause, household, inheritance, politics, legacy, organization, promise, risk
  葬礼结束，亲戚们没有急着走。有人问起铁盒，有人问起那块木牌；Gustav Moser把最后一盘冷菜端回厨房，发现桌边已经没有人说话，只有叉子碰在盘沿上。
  _effects: state_parameter eh19-inherited-cause.legacy 61 -> 66; state_parameter eh19-inherited-cause.division 60 -> 64; state_parameter eh19-inherited-cause.risk 65 -> 67_
  _causes: evt:world-vienna-1912:012504_

- **1949.01** `state_reaction:ml18-sudden-fortune/a-relative-remembers` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  一个多年没走动的亲戚提着一盒点心上门，先问Gustav Moser的身体，再问那笔钱是怎么来的。临走时他说起小时候替Gustav Moser家垫过一冬天的煤钱，数字记不清了，但意思很清楚。
  _effects: state_parameter ml18-sudden-fortune.claims 6 -> 7_
  _causes: evt:world-vienna-1912:012250_

- **1949.01** `vienna-postwar-housing-1950s/waiting-list` tags: adulthood, postwar, housing, family
  Gustav Moser去住房局问结果，办事员翻过卡片说分数不够：家里人口少，现住房虽挤但还没到拆除标准。回程的电车上，Grete Moser 2劝他明年再递一次申请。
  _effects: role; cash -2 (application and tram fare); relation acquaintance with person-materialized-world-vienna-1912-130; relation acquaintance with person-materialized-world-vienna-1912-130_

- **1949.01** `office16-budget.sign-or-block::ctx-vienna-postwar-1945::milieu-tenement/signed-with-margin` tags: office, budget, permit, administration, power, economy, vienna, urban
  Gustav Moser在预算表上签了字，把冬季煤房的款项从三笔并成一笔，又给夜班守卫加了半份津贴。Franz Kral算出省下的钱刚好够修屋顶；没有人鼓掌，但一月的会议室不再需要穿大衣。
  _effects: reputation 0.040000000000000036; skill; mood 0.020000000000000018; flag +signed_balanced_budget; knowledge “把冬季煤房的款项并成一笔后，省下的钱够修会议室屋顶。”_

- **1949.01** `state_reaction:ml18-sudden-fortune/the-papers-hear-about-it` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  报纸的社会版把Gustav Moser家的门牌号和那笔钱的数目印在一起，标题是“一笔不该有的好运”。第二天门口多了两个陌生人，一个说是远亲，一个说代表一家孤儿院。
  _effects: state_parameter ml18-sudden-fortune.public true -> true; state_parameter ml18-sudden-fortune.claims 7 -> 9; reputation -0.020000000000000018_
  _causes: evt:world-vienna-1912:012501_

- **1949.01** `state_tick:eh19-inherited-cause/cause-year/the-house-divides` tags: eh19-inherited-cause, household, inheritance, politics, legacy, organization, promise, risk
  家里为那只铁盒吵了一次。有人说该交给档案馆，有人说该烧掉，还有人问为什么要把上一代的事算在这一代头上；Gustav Moser把盒子抱回房间，门没有关严。
  _effects: state_parameter eh19-inherited-cause.division 64 -> 72; state_parameter eh19-inherited-cause.commitment 54 -> 51; mood -0.020000000000000018_

- **1949.01** `state_tick:p21-scandal-web/the-web-tightens/a-strand-snaps` tags: p21-scandal-web, scandal_web, scandal, secret, blackmail, network, leverage, danger
  一个证人搬走了，带走了他那一份记忆。Gustav Moser在旧地址门口站了半个下午，回来时发现信箱里多了一张没有署名的明信片，上面只写着“我还记得”。
  _effects: state_parameter p21-scandal-web.exposure 100 -> 100; state_parameter p21-scandal-web.leverage 54 -> 48; state_parameter p21-scandal-web.danger 70 -> 75; reputation -0.019999999999999962_

- **1949.01** `state_tick:debt-bondage/interest/pay-interest` tags: debt-bondage, debt, work, poverty, legal, state, state_tick
  Gustav Moser又付了一年的利息。本金几乎没动，债主的账本却翻到了新一页。
  _effects: cash -3 (debt interest); state_parameter debt-bondage.debt 51 -> 53_

- **1949.01** `state_tick:p21-fortune-reversal/the-crowd-recounts/the-accountant-calls` tags: p21-fortune-reversal, fortune_reversal, fortune, reversal, inheritance, ruin, public, witnesses
  会计带着第二本账来了。那本账上没有Gustav Moser的名字，只有一串日期和几笔“待核”的款项；会计把钢笔帽拧上，说这次不是来道喜的。
  _effects: state_parameter p21-fortune-reversal.debt 75 -> 87; state_parameter p21-fortune-reversal.witnesses 52 -> 47; state_parameter p21-fortune-reversal.fragility 94 -> 100; flag +fortune_called_in_

- **1949.01** `state_tick:ml18-sudden-fortune/fortune-year/money-keeps-working` tags: ml18-sudden-fortune, money, windfall, sudden_fortune, household, luck, inheritance, lottery
  一年过去，钱没有变多，却也没有一下花完。Gustav Moser把一部分存进邮局储蓄所，一部分借给楼下的鞋匠；鞋匠每月送来一双补好的鞋，利息就夹在鞋垫下面。街口的杂货商开始把好面粉留到Gustav Moser来的时候。
  _effects: cash 2 (interest and small repayments on the windfall); state_parameter ml18-sudden-fortune.claims 9 -> 10; mood 0.010000000000000009_

- **1949.01** `state_expire:raising-child` tags: raising-child, family, child, care, school, household, state, state_tick
  Gustav Moser的「家里有个正在长大的孩子」到期；相关安排结束。
  _effects: state_remove raising-child state:world-vienna-1912:78_

- **1949.01** `state_tick:pl19-protected-scandal/the-network-meets/someone-wants-a-favor` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  有人替Gustav Moser挡了一次采访，随后在走廊里提起自己儿子的学徒期满。Gustav Moser知道这不是闲聊；当天晚上，那张写着名字的纸条被压在糖罐下面，像一枚没有付清的硬币。
  _effects: state_parameter pl19-protected-scandal.leverage 10 -> 22; state_parameter pl19-protected-scandal.protection 38 -> 34; state_parameter pl19-protected-scandal.exposure 55 -> 60; mood -0.010000000000000009_

- **1949.01** `state_expire:raising-child` tags: raising-child, family, child, care, school, household, state, state_tick
  Gustav Moser的「家里有个正在长大的孩子」到期；相关安排结束。
  _effects: state_remove raising-child state:world-vienna-1912:80_

- **1949.01** `state_tick:p23-dangerous-secret/the-secret-changes-hands/a-second-person-learns` tags: p23-dangerous-secret, secret, danger, leverage, exposure, loyalty, crime, politics
  一个曾在场的人喝多了，把故事讲给了不该听的人。第二天，Gustav Moser在市场上看见两个陌生人站在菜摊旁边，什么也不买，只看着来往的人。Gustav Moser把篮子换到另一只手上，继续挑土豆。
  _effects: state_parameter p23-dangerous-secret.exposure 45 -> 53; state_parameter p23-dangerous-secret.leverage 40 -> 36; state_parameter p23-dangerous-secret.loyalty 45 -> 39_

- **1949.01** `state_tick:under-investigation/case-progress/evidence` tags: under-investigation, legal, police, investigation, risk, state, state_tick
  调查员又来找Gustav Moser谈了一次。问话比上次具体，记录也比上次长。
  _effects: state_parameter under-investigation.progress 20 -> 35_

- **1949.01** `r13-work.strike-fund::ctx-vienna-postwar-1945::milieu-tenement/soup-kitchen-opened` tags: work, union, strike, mutual_aid, food, vienna, urban, postwar
  Gustav Moser把工会活动室的长桌拼起来，用两口大锅煮扁豆汤。Anna Kral赊了半袋豆子和一筐洋葱，条件是罢工结束后先还他。第一天来了三十七个人，Gustav Moser给每个碗里多舀半勺；汤不够时，就往锅里再添一壶水。
  _effects: cash -1 (罢工第七天的汤锅); food; health 0.019999999999999997 (罢工第七天的汤锅); flag +work13_strike_soup_kitchen; relation colleague with person-materialized-world-vienna-1912-135; organization_funds; relation acquaintance with person-materialized-world-vienna-1912-135_

- **1949.03** `ml18-luck.strongbox-in-the-wall::ctx-vienna-postwar-1945::milieu-tenement/the-inflation-ate-them` tags: money, luck, housing, windfall, inflation, ownership, vienna, urban
  铁盒里的纸币已经作废，银扣也只值几个铜板。Alois Berg把纸币一张张摊在窗台上，说战前的纸现在只能糊墙；Berta Moser 2笑得直不起腰，说这盒子在他家墙里藏了二十年，原来是一堆废纸。Gustav Moser把当票收好，去当铺换回一只银勺，勺柄上刻着外祖母的姓。
  _effects: cash 2 (the silver spoon redeemed with the old pawn ticket); relation acquaintance with person-materialized-world-vienna-1912-138; flag +worthless_strongbox; knowledge “墙里的旧纸币已经作废，当票还能换回一只银勺。”; relation acquaintance with person-materialized-world-vienna-1912-138_

- **1949.09** `vienna-adult-social.burial-fund/burial-fund.skipped` tags: adulthood, social, work, family
  Gustav Moser对Anton Berg说这个月实在挤不出来，房租刚涨了半个克朗。Anton Berg把本子翻到另一页，说那就先记着，只是下个月得补齐。午休铃响时，Gustav Moser的工具箱上还留着本子压出的印子。
  _effects: relation colleague with person:evt:world-vienna-1912:000387:child_

- **1949.10** `vienna-parish-aid.rent-box/rent-box.accept-all` tags: faith, parish, mutual_aid, poverty, family
  煤袋落在台阶上，扬起细细一层黑末。Josef Weiss用铅笔头在蓝格册上写门牌号，问房东姓什么，又叮嘱别把面包票弄丢。灶上水壶开始叫，Gustav Moser才想起屋里连只干净的杯子都没有。
  _effects: cash 6 (互助会补上本月房租差额); food; relation acquaintance with person-materialized-world-vienna-1912-112; flag +parish_registered_

- **1950.01** `state_reaction:eh19-inherited-cause/inheritance-arrives` tags: eh19-inherited-cause, household, inheritance, politics, legacy, organization, promise, risk
  律师念到“旧文件与木牌归……”时停了一下，因为清单上没有写清楚。Gustav Moser回家后把铁盒重新翻了一遍，发现名单少了一页；没有人承认拿过。
  _effects: state_parameter eh19-inherited-cause.legacy 66 -> 69; state_parameter eh19-inherited-cause.division 72 -> 74; knowledge “遗嘱里有一行字，把旧组织的名单和房子写在了同一页。”_
  _causes: evt:world-vienna-1912:012925_

- **1950.01** `curse15-betrayal.signature::ctx-vienna-postwar-1945::milieu-tenement/the-files-went-first` tags: betrayal, office, power, politics, curse, institution, vienna, urban
  Alois Berg 2先把Gustav Moser抽屉里的往来信件搬空，再在会议上说Gustav Moser从来没有保存过记录。没有人能证明那些信存在过，除了Gustav Moser自己。散会后，有人让Gustav Moser回家休息几天，工资照发。Gustav Moser知道这不是照顾，是让Gustav Moser别再回来。
  _effects: reputation -0.06000000000000005; relation rival with person-materialized-world-vienna-1912-116; knowledge “我经手的信件在会议前被人搬空了。”; condition; flag +records_removed; relation acquaintance with person-materialized-world-vienna-1912-116_

- **1950.01** `state_reaction:pl19-protected-scandal/a-rival-lets-slip` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  那个替Gustav Moser保守秘密的人，在另一个场合把话说漏了半句。没有人当场追问，但第二天，Gustav Moser发现后间的门没有关严。
  _effects: state_parameter pl19-protected-scandal.exposure 60 -> 70; state_parameter pl19-protected-scandal.leverage 22 -> 30; state_parameter pl19-protected-scandal.publicHeat 65 -> 69_
  _causes: evt:world-vienna-1912:013032_

- **1950.01** `state_reaction:p23-dangerous-secret/a-witness-talks` tags: p23-dangerous-secret, secret, danger, leverage, exposure, loyalty, crime, politics
  审讯室里的灯亮了一夜。第二天，Gustav Moser在面包房门口听见有人低声复述自己的秘密，连停顿的位置都一模一样。
  _effects: state_parameter p23-dangerous-secret.exposure 53 -> 61; state_parameter p23-dangerous-secret.leverage 36 -> 32; state_parameter p23-dangerous-secret.loyalty 39 -> 33_
  _causes: evt:world-vienna-1912:013032_

- **1950.01** `state_reaction:eh19-inherited-cause/purge-reaches-the-house` tags: eh19-inherited-cause, household, inheritance, politics, legacy, organization, promise, risk
  名单上的一个名字被带走了。Gustav Moser把铁盒从柜顶搬到床下，又觉得床下太潮；那天夜里，Gustav Moser第一次把盒子打开，没有点灯。
  _effects: state_parameter eh19-inherited-cause.risk 67 -> 75; state_parameter eh19-inherited-cause.commitment 51 -> 53_
  _causes: evt:world-vienna-1912:013042_

- **1950.01** `state_expire:p21-scandal-web` tags: p21-scandal-web, scandal_web, scandal, secret, blackmail, network, leverage, danger
  Gustav Moser的「丑闻蛛网」到期；相关安排结束。
  _effects: state_remove p21-scandal-web state:world-vienna-1912:731; flag -scandal_web_active_

- **1950.01** `state_expire:debt-bondage` tags: debt-bondage, debt, work, poverty, legal, state, state_tick, state:debt-bondage
  Gustav Moser的「债务束缚」到期；相关安排结束。
  _effects: state_remove debt-bondage state:world-vienna-1912:732_

- **1950.01** `state_expire:p21-fortune-reversal` tags: p21-fortune-reversal, fortune_reversal, fortune, reversal, inheritance, ruin, public, witnesses
  Gustav Moser的「骤起骤落」到期；相关安排结束。
  _effects: state_remove p21-fortune-reversal state:world-vienna-1912:733; flag -fortune_reversal_active_

- **1950.01** `state_tick:pl19-protected-scandal/the-network-meets/a-member-sells-a-piece` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  照片没有登报，却出现在一封没有署名的信里。Gustav Moser认出拍照的角度：只有站在后楼梯第二级的人才拍得到。第二天，那个位置换了一把新锁，钥匙却少了一把。
  _effects: state_parameter pl19-protected-scandal.exposure 70 -> 88; state_parameter pl19-protected-scandal.publicHeat 69 -> 79; state_parameter pl19-protected-scandal.protection 34 -> 24; reputation -0.040000000000000036; knowledge “后楼梯第二级是唯一能拍到那张照片的位置，而钥匙少了一把。”_

- **1950.01** `state_expire:under-investigation` tags: under-investigation, legal, police, investigation, risk, state, state_tick, state:under-investigation
  Gustav Moser的「被调查」到期；相关安排结束。
  _effects: state_remove under-investigation state:world-vienna-1912:827_

- **1950.01** `agency:attend_meeting` tags: agency, agency:attend_meeting
  Gustav Moser去了Leopoldstädter Zinshaus, gemeinsamer Gang，坐在后排听完了关于普拉特动物园夜班队在Leopoldstädter Zinshaus, gemeinsame的争论；散会时带走一张油印提纲。
  _effects: historical development:initiative-zoo:person-materialized-world-vienna-1912-7-evt:world-vienna-1912:006643-1941 as participant; knowledge “我参加了普拉特动物园夜班队在Leopoldstädter Zinshaus, gemeinsamer Gan。”; mood 0.030000000000000027_

- **1950.01** `ad20-favor-called-in::ctx-vienna-postwar-1945::milieu-tenement/do-the-favor` tags: favor, obligation, everyday, trust, debt, risk, vienna, urban
  Alois Bauer 2说只需要Gustav Moser在明天下午去一趟车站，把一个箱子交给穿灰外套的人。Gustav Moser问箱子里是什么；Alois Bauer 2说“你不需要知道”。Gustav Moser还是去了，因为当年Alois Bauer 2替Gustav Moser垫过一笔医药费。
  _effects: state_add ad20-private-bargain state:world-vienna-1912:960; cash -1 (the trip to the station); relation acquaintance with person-materialized-world-vienna-1912-104; flag +favor_done; knowledge “箱子里是什么，邻居没有说。”; relation acquaintance with person-materialized-world-vienna-1912-104; flag +private_bargain_active_

- **1950.11** `vienna-courtship-courtyard.sunday-walk/part-at-arch` tags: adulthood, courtship, partner, social, family
  走到桥洞前，Katharina Kral 2说该往回走了，家里炉子还没生。Gustav Moser站在原地看着Katharina Kral 2拐上台阶，围巾的一角被风掀起来；下周的事谁也没有提，两人就此分开，口袋里只剩一颗凉透的栗子。
  _effects: mood -0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-154; flag +uncertain_courtship; relation acquaintance with person-materialized-world-vienna-1912-154_

- **1950.11** `oj18-cinema.reel::ctx-vienna-postwar-1945::milieu-tenement/show-the-reel` tags: cinema, film, projection, night, censorship, work, odd_job, vienna
  Gustav Moser没有剪，让那卷新闻片继续走。观众先以为这是加映，直到有人站起来喊“这不是我们买的票”。警察在散场前堵住侧门；Sozialdemokratische Arbeiterpartei Österreichs (SDAP)说是放映员接错了本，Gustav Moser被记了名字。
  _effects: reputation 0.020000000000000018; cash -2 (lost wages and paid a fine); condition; state_add oj18-odd-apprenticeship state:world-vienna-1912:959; flag +showed_banned_reel; knowledge “那卷新闻片里有一张被按下去的脸，散场前警察就堵住了侧门。”; role; flag +odd_job_apprentice_

- **1951.01** `vienna-life-injury-recovery/clinic-treatment` tags: health, work, family
  Gustav Moser在受伤后的第三天去了诊所。医生清洗伤口、换药，收下诊费，嘱咐不要急着回机器旁。Gustav Moser把药方折好，回家路上买了纱布。
  _effects: health 0.05000000000000002 (wound treatment); cash -8 (clinic and bandages); condition_
  _causes: evt:world-vienna-1912:013108_

- **1951.01** `pl19-scandal.resignation::ctx-vienna-postwar-1945::milieu-tenement/kept-the-office` tags: resignation, office, influence, scandal, position, politics, vienna, urban
  Gustav Moser没有辞职，只在内部听证上把责任推给一份已经销毁的备忘录。职位保住了，Anton Kral被调去管仓库；Gustav Moser回到办公室，发现桌上的电话线被换过，听筒里有一种陌生的杂音。
  _effects: state_parameter pl19-protected-scandal.publicHeat 79 -> 89; state_parameter pl19-protected-scandal.protection 24 -> 19; reputation -0.020000000000000018; flag +kept_office_by_cover; knowledge “电话线被换过，听筒里有陌生的杂音。”; relation acquaintance with person-materialized-world-vienna-1912-18_

- **1951.01** `state_transition:pl19-protected-scandal/heat-becomes-public` tags: pl19-protected-scandal, love, secret, scandal, power, protection, network, protected_scandal
  Gustav Moser从「被小圈子护住的私情」转入另一段处境：the public heat outran the protection
  _effects: state_transition pl19-protected-scandal -> known-affair; reputation -0.040000000000000036; flag -protected_scandal_active; flag +known_affair_active_

- **1951.01** `state_expire:p23-dangerous-secret` tags: p23-dangerous-secret, secret, danger, leverage, exposure, loyalty, crime, politics
  Gustav Moser的「危险的秘密」到期；相关安排结束。
  _effects: state_remove p23-dangerous-secret state:world-vienna-1912:826_

- **1951.01** `state_tick:oj18-odd-apprenticeship/strange-year/the-logbook-mislaid` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  巡查簿在换班时不见了，第二天却出现在煤筐底下，最后几页被水泡得发皱。管事的说签字不能算数，扣了Gustav Moser半个月的夜班钱；Gustav Moser没有争，只在新的簿子第一页把日期写得很大。
  _effects: state_parameter oj18-odd-apprenticeship.trust 20 -> 4; state_parameter oj18-odd-apprenticeship.reliability 40 -> 30; flag +odd_job_scare_

- **1951.01** `state_tick:ad20-private-bargain/the-favor-ages/called-in` tags: ad20-private-bargain, private, bargain, favor, debt, trust, leverage, exit
  对方在一个不合时宜的时刻提起旧事，语气很客气，意思却不客气。Gustav Moser听见自己答应得太快，挂断以后才发现手心有一层薄汗。
  _effects: state_parameter ad20-private-bargain.leverage 50 -> 58; state_parameter ad20-private-bargain.debt 55 -> 59; state_parameter ad20-private-bargain.trust 55 -> 51_

- **1951.06** `state_reaction:known-affair/betrayal-in-public` tags: known-affair, love, scandal, secret, public, secret_intimacy, state, state_reaction
  背叛被讲出来以后，Gustav Moser的名字又上了一轮饭桌。有人替Gustav Moser不平，有人只想知道细节；Gustav Moser把杯子洗干净，放回柜子，决定这周不去市场。
  _effects: state_parameter known-affair.notoriety 30 -> 45; state_parameter known-affair.grief 0 -> 10_
  _causes: evt:world-vienna-1912:014086_

- **1951.08** `vienna-family-courtship/ask-to-share-a-home` tags: family, courtship, household, social, lifecycle
  Gustav Moser在Leopoldstädter Zinshaus, gemeinsamer Gang靠窗的桌边，把一只空咖啡杯转了半圈，说房租两人合付、桌子两人共用。Katharina Kral 2的手停在糖罐盖上，问了一句“要是过不下去呢”，没有当场答应，只说要想一想；杯里的咖啡凉了，话还悬在桌面上。
  _effects: interaction_

- **1951.11** `vienna-parish-aid.sick-call/sick-call.door-only` tags: faith, parish, mutual_aid, poverty, family
  Gustav Moser把药包和半块肥皂交给开门的孩子，嘱咐用水冲开、一天两次，就下了楼。楼梯间里孩子一直站在门口看着，手里攥着纸包，没关门。Gustav Moser走到二层又折回去，帮他把门带上，说自己家里也等着火。
  _effects: health 0.010000000000000009 (没有久留，避开了病人的屋子); relation acquaintance with person:evt:world-vienna-1912:002246:child_

- **1952.01** `major-family.proposal-refused/proposal-refused.bad-blood` tags: family, courtship, refusal, major, lifecycle
  Katharina Kral 2的母亲把Gustav Moser带来的点心原封退回，说家里不娶有肺病亲戚的人。点心是早上排队买的，油纸还热着，Gustav Moser把它抱在胸前。Katharina Kral 2站在门后没有出来，只让妹妹传话。Gustav Moser把戒指留在门房，走回Leopoldstädter Zinshaus, gemeinsamer Gang时天还没黑，楼下的狗一直叫。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-154; role; flag +marriage_refused; cash -2 (pastries and the returned ring)_

- **1952.01** `ld18-scandal.rumor::ctx-vienna-postwar-1945::milieu-tenement/the-story-grows-teeth` tags: scandal, rumor, public, neighbor, desire, reputation, secret_intimacy, vienna
  有人在洗衣房说，Gustav Moser星期三下午进过一家旅馆，出来时头发是湿的。话传到市场，已经变成另一个版本；Franz Lechner说得最细，连房间号都编好了。Gustav Moser没有解释，只把星期三的工票钉在厨房墙上。
  _effects: state_add ld18-public-desire state:world-vienna-1912:1008; reputation -0.07999999999999996; relation acquaintance with person-franz-lechner; state_parameter known-affair.notoriety 45 -> 55; flag +public_desire_active_

- **1952.01** `state_reaction:ld18-public-desire/a-moral-society-letter` tags: ld18-public-desire, desire, public, scandal, reputation, body, rumor, notoriety
  道德协会寄来一封措辞客气的信，请Gustav Moser去“谈谈自己的生活方式”。她把信读完，折好，垫在桌脚下；桌子还是晃。第二天，她照常去上班，只是把头发剪短了一截，短到所有人都能看出她不在乎。
  _effects: state_parameter ld18-public-desire.protection 5 -> 0; state_parameter ld18-public-desire.defiance 20 -> 28_
  _causes: evt:world-vienna-1912:014090_

- **1952.01** `state_tick:ad20-private-bargain/the-favor-ages/called-in` tags: ad20-private-bargain, private, bargain, favor, debt, trust, leverage, exit
  对方在一个不合时宜的时刻提起旧事，语气很客气，意思却不客气。Gustav Moser听见自己答应得太快，挂断以后才发现手心有一层薄汗。
  _effects: state_parameter ad20-private-bargain.leverage 58 -> 66; state_parameter ad20-private-bargain.debt 59 -> 63; state_parameter ad20-private-bargain.trust 51 -> 47_

- **1952.01** `state_tick:known-affair/public-year/forgotten` tags: known-affair, love, scandal, secret, public, secret_intimacy, state, state_tick
  Gustav Moser的名字从闲谈里慢慢退了下去。街上有了新的婚礼、新的葬礼和新的丑闻；只有裁缝还记得Gustav Moser改过两次同一件外套的腰身。
  _effects: state_parameter known-affair.notoriety 55 -> 50; state_parameter known-affair.grief 10 -> 7; mood 0.020000000000000018_

- **1952.01** `agency:support_process` tags: agency, agency:support_process
  Gustav Moser为普拉特动物园夜班队在Leopoldstädter Zinshaus, gemeinsame出了力：整理名单、传递消息或替同伴作证，名字被记进参与记录。
  _effects: historical development:initiative-zoo:person-materialized-world-vienna-1912-7-evt:world-vienna-1912:006643-1941 as supporter; historical_influence; reputation 0.015000000000000013_

- **1952.08** `vienna-legacy-worklife.sick-fund/sick-fund.fill-form` tags: legacy, work, family, reform, ordinary_life, injury
  衙门走廊的地砖是黑白相间的，Gustav Moser站着站着就把重心从一只脚换到另一只脚。窗口里的办事员姓什么没人知道，只叫“三号窗”。表递进去时，里面说“等复核”，声音很平。
  _effects: health -0.02999999999999997 (在衙门走廊站了大半天); relation colleague with person:evt:world-vienna-1912:002681:child; skill_

- **1953.01** `interaction_response` tags: interaction
  Katharina Kral 2没有答应，只说现在不合适。Gustav Moser把这件事收回去，之后见面仍点头。
  _effects: relation acquaintance with person-materialized-world-vienna-1912-154; interaction_
  _causes: evt:world-vienna-1912:014093_

- **1953.01** `vienna-family-courtship/ask-to-share-a-home` tags: family, courtship, household, social, lifecycle
  Gustav Moser在Leopoldstädter Zinshaus, gemeinsamer Gang靠窗的桌边，把一只空咖啡杯转了半圈，说房租两人合付、桌子两人共用。Luise Bauer的手停在糖罐盖上，问了一句“要是过不下去呢”，没有当场答应，只说要想一想；杯里的咖啡凉了，话还悬在桌面上。
  _effects: interaction_

- **1953.01** `ld18-admirer.gift::ctx-vienna-postwar-1945::milieu-tenement/a-key-with-no-address` tags: admirer, gift, public_desire, jealousy, danger, secret_intimacy, vienna, urban
  Franz Bauer 2把一把小钥匙和一张没有地址的卡片留在后台，说“你会知道是哪扇门”。Gustav Moser把钥匙带回家，Franz Lechner在缝纫机抽屉里找到它，问这是哪里的；Gustav Moser说不知道，却把钥匙攥得很紧。
  _effects: state_parameter ld18-public-desire.spectacle 50 -> 60; state_parameter ld18-public-desire.rumorHeat 60 -> 65; relation friend with person-franz-lechner; mood 0.020000000000000018; flag +kept_the_key; relation acquaintance with person-materialized-world-vienna-1912-156_

- **1953.01** `state_tick:ld18-public-desire/the-story-changes-hands/a-price-for-silence` tags: ld18-public-desire, desire, public, scandal, reputation, body, rumor, notoriety
  有人把一张账单寄到Gustav Moser家，背面写着“封口费”，数目正好是她一个月的工钱。Gustav Moser把钱数了两遍，最后还是装进信封；第二天，街上又有了新版本，比上一个更贵，也更难听。
  _effects: state_parameter ld18-public-desire.rumorHeat 65 -> 77; state_parameter ld18-public-desire.protection 0 -> 0; cash -2 (the first payment to a blackmailer); mood -0.040000000000000036_

- **1953.01** `state_expire:oj18-odd-apprenticeship` tags: oj18-odd-apprenticeship, work, odd_job, apprenticeship, night, trust, secrecy, state
  Gustav Moser的「奇职学徒」到期；相关安排结束。
  _effects: state_remove oj18-odd-apprenticeship state:world-vienna-1912:959; role; flag -odd_job_apprentice_

- **1953.01** `state_expire:ad20-private-bargain` tags: ad20-private-bargain, private, bargain, favor, debt, trust, leverage, exit
  Gustav Moser的「私下的账」到期；相关安排结束。
  _effects: state_remove ad20-private-bargain state:world-vienna-1912:960; flag -private_bargain_active_

- **1953.01** `state_tick:known-affair/public-year/retold` tags: known-affair, love, scandal, secret, public, secret_intimacy, state, state_tick
  Gustav Moser在市场上被人叫住，对方笑着说“就是那个人”。Gustav Moser也笑了一下，买完土豆就走；回到家才发现，手里的零钱少了一枚。
  _effects: state_parameter known-affair.notoriety 50 -> 58; reputation -0.030000000000000027_

- **1953.01** `p9-history-public-action.organize-relief/church-hall` tags: politics, union, party, activism, public_action, relief, leaflet, task
  两赫勒一碗，赊账用铅笔记在账本边上。Gustav Moser 把账本挂在门钉上，风吹得纸页翻动，Anna Berg 用围裙擦手，招呼排队的老人先坐。
  _effects: cash -4 (垫付首日面粉和柴火); food; reputation 0.07000000000000006; relation acquaintance with person-materialized-world-vienna-1912-12_

- **1953.04** `vienna-church-community.tenement-prayer/rent-prayer-help` tags: faith, social, family, home
  楼梯间只点一根蜡烛。Elisabeth Kral凑过来低声说，楼下老寡妇的喘病又重了，教区明早才能派修女来。Gustav Moser把汤碗接过去，碗底还温着。
  _effects: condition; food; relation acquaintance with person-materialized-world-vienna-1912-143_

- **1953.08** `ml18-inheritance.conditional-will::ctx-vienna-postwar-1945::milieu-tenement/keep-the-candle-workshop-open` tags: inheritance, legal, family, money, conditions, cinema, quiet, vienna
  姑婆的遗嘱只有一页：六十克朗留给Gustav Moser，条件是那间放无声电影的小影院再开五年，并且把她的侄孙女送进学校。Anton Kral把三个条件念了两遍；Franz Kral在门外等着，手里捏着另一份没有拆封的遗嘱。Gustav Moser先领了十克朗，把影院的钥匙挂在腰上。
  _effects: cash 10 (first payment under the conditional will); state_add ml18-sudden-fortune state:world-vienna-1912:1115; relation acquaintance with person:evt:world-vienna-1912:000865:child; flag +conditional_heir; knowledge “遗嘱要求小影院再开五年，并把姑婆的侄孙女送进学校。”; mood 0.030000000000000027; flag +sudden_fortune; reputation 0.020000000000000018; mood 0.030000000000000027_

- **1953.10** `p9-social-family-conflict-care.sick-parent-night/hire-neighbor-daycare` tags: family, care, siblings, inheritance, housing, money
  Gustav Moser请楼下的Gustav Hofer白天来照看Anna Berg，先付一周六克朗工钱，讲好每天另管两顿饭，煤钱也从这六克里出。Gustav Hofer上午换床单，下午喂药，临走把便盆提到楼道口。Gustav Moser下工回来先摸煤箱，再在练习本上记下当天的饭钱和煤钱，看见Anna Berg的嘴唇不再干裂。
  _effects: cash -6 (支付邻居照看工钱和煤钱); food; relation acquaintance with person-materialized-world-vienna-1912-120; health 0.04 (白天有人按时喂药和换洗)_

- **1954.01** `interaction_response` tags: interaction
  Luise Bauer没有答应，只说现在不合适。Gustav Moser把这件事收回去，之后见面仍点头。
  _effects: interaction_
  _causes: evt:world-vienna-1912:014596_

- **1954.01** `vienna-life-injury-recovery/wound-infection` tags: health, work, family, injury
  Gustav Moser的伤口在几天后肿起来，手腕发热。医生说要切开引流，费用比上次更高；Gustav Moser看着账单，先问能不能分两次付。
  _effects: health -0.12 (wound infection); cash -14 (drainage and medicine); condition_
  _causes: evt:world-vienna-1912:014598_

- **1954.01** `p21-blackmail-wedding::ctx-vienna-postwar-1945::milieu-tenement/a-marriage-of-ledgers` tags: blackmail, wedding, marriage, known-affair, scandal, power, love, secret
  婚礼在第二区的登记处举行，只有四个证人。Gustav Moser和Ferdinand Stein 2在婚书背面另签了一份私下协议，写明房子、债务和每年可以分开住几个月；Josef Weiss把旧信装回皮包，Anna Berg把印章按得很重，像怕它反悔。窗外的电车铃响了一声。
  _effects: state_add p21-scandal-web state:world-vienna-1912:1114; flag +married_under_blackmail; cash -2 (registry fee and wine for the witnesses); knowledge “登记处的婚礼只有四个证人，婚书背面另有一份关于房子和债务的私下协议。”; reputation -0.010000000000000009; flag +scandal_web_active_

- **1954.01** `state_reaction:p21-scandal-web/a-new-scandal` tags: p21-scandal-web, scandal_web, scandal, secret, blackmail, network, leverage, danger
  新的丑闻登出来时，旧的那一页也被重新翻到桌面上。Gustav Moser发现两件事共用同一个证人，而那个证人上周还来借过盐。
  _effects: state_parameter p21-scandal-web.exposure 55 -> 61; state_parameter p21-scandal-web.danger 35 -> 39; state_parameter p21-scandal-web.loyalty 30 -> 27_
  _causes: evt:world-vienna-1912:015168_

- **1954.01** `state_expire:ld18-public-desire` tags: ld18-public-desire, desire, public, scandal, reputation, body, rumor, notoriety
  Gustav Moser的「被全城观看的欲望」到期；相关安排结束。
  _effects: state_remove ld18-public-desire state:world-vienna-1912:1008; flag -public_desire_active_

- **1954.01** `state_tick:known-affair/public-year/retold` tags: known-affair, love, scandal, secret, public, secret_intimacy, state, state_tick
  Gustav Moser在市场上被人叫住，对方笑着说“就是那个人”。Gustav Moser也笑了一下，买完土豆就走；回到家才发现，手里的零钱少了一枚。
  _effects: state_parameter known-affair.notoriety 58 -> 66; reputation -0.030000000000000027; mood -0.020000000000000018_

- **1954.05** `p9-social-family-conflict-care.cousin-bed/give-camp-bed-and-board` tags: family, care, siblings, inheritance, housing, money
  Gustav Moser让Emil Berg睡厨房的行军床，讲好每月三克朗饭钱，煤钱另算。白天把铺盖卷起来靠在碗柜边，晚上再铺开；厨房多一个人，面包和煤都下去得快，伙食上短了两克朗。看门人再来问时，Gustav Moser把藤箱指过去，说人住下了，灯油钱也记在账上。
  _effects: cash 3 (表亲交来的饭钱); food; relation kin with person:evt:world-vienna-1912:006111:child; flag +kin_staying_over_

- **1954.06** `vienna-housing-move.moving-day/moving-day-sell-up` tags: housing, home, rent, family, money
  收破烂的把两克朗数在门槛上，顺手敲了敲桌板看木料。Gustav Moser把铁盒扣好，那里面只有照片和几封旧信。Ferdinand Stein替Gustav Moser扶着门，说旧床架值不了几个钱，能脱手就不亏。
  _effects: cash 2 (卖掉旧床架和桌子收进的钱); mood -0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-77; relation acquaintance with person-materialized-world-vienna-1912-77_

- **1954.09** `vienna-social-movement.recruitment/join-and-carry` tags: development, social_movement, organization, politics
  Gustav Moser在楼梯下面接到一张折成四折的传单。纸上没有署名，只写着下一次集会的地址。Gustav Moser去了，在昏暗的屋里报上姓名，成为圣马克斯殡葬合作社的一员，并答应负责自己所在街区的联络。
  _effects: organization_membership; relation acquaintance with person-materialized-world-vienna-1912-69; relation acquaintance with person-materialized-world-vienna-1912-69_

- **1954.10** `vienna-historical-social-movement.public-meeting/back-immediate-action` tags: history, historical_process, social_movement, organization, politics
  Gustav Moser把帽子捏在手里上台，说救济表格要填三张、盖章两处，煤却今晚就见底。年轻人拍椅子背，Helene 4在门口皱着眉。主持人记下赞成与反对的人数，纸板上的字越写越小。
  _effects: reputation 0.050000000000000044; relation acquaintance with person:evt:world-vienna-1912:003410:child; mood 0.030000000000000027_

- **1955.01** `state_tick:p21-scandal-web/the-web-tightens/a-strand-snaps` tags: p21-scandal-web, scandal_web, scandal, secret, blackmail, network, leverage, danger
  一个证人搬走了，带走了他那一份记忆。Gustav Moser在旧地址门口站了半个下午，回来时发现信箱里多了一张没有署名的明信片，上面只写着“我还记得”。
  _effects: state_parameter p21-scandal-web.exposure 61 -> 69; state_parameter p21-scandal-web.leverage 65 -> 59; state_parameter p21-scandal-web.danger 39 -> 44; reputation -0.020000000000000018_

- **1955.01** `state_expire:known-affair` tags: known-affair, love, scandal, secret, public, secret_intimacy, state, state_tick
  Gustav Moser的「已经公开的私情」到期；相关安排结束。
  _effects: state_remove known-affair state:world-vienna-1912:970; flag -known_affair_active_

- **1955.01** `kernel-family.inheritance::ctx-vienna-postwar-1945::milieu-tenement/inheritance.older-will` tags: task, task:family, family, inheritance, siblings, estate, law, vienna
  Helene 4从行李里掏出另一张更早的遗嘱，说工具和存款都该归长子。Alois Moser把两张纸并排放好，说私人纠纷要去法院；诉讼费三十克朗，Gustav Moser拿不出。遗产在办事处冻结了半年，Gustav Moser靠替人浆洗撑过冬天。
  _effects: cash -3 (copies, stamps and travel to the inheritance office); relation rival with person:evt:world-vienna-1912:003410:child; role; flag +inheritance_frozen; knowledge “遗产诉讼费要三十克朗，办事处不受理私人纠纷。”; relation acquaintance with person-materialized-world-vienna-1912-13_

- **1955.08** `vienna-medical-treatment.night-fever/corner-doctor` tags: health, medical, family, money
  药粉含在嘴里发苦，Gustav Moser就着糖浆咽下去，喉头一阵凉。医生拎包出门时，楼梯间的煤气灯刚好灭了，Helene Moser 2摸黑送他到拐角，回来时手里攥着找回的几枚赫勒。
  _effects: cash -4 (医生出诊费和药费（其中4克朗记入债务）); health 0.05 (药粉和糖浆缓解症状); relation friend with person-materialized-world-vienna-1912-146; relation acquaintance with person-materialized-world-vienna-1912-146_

- **1955.09** `vienna-market-household.market-credit/market-credit.delay` tags: home, market, food, social
  三个克朗拖了九天。玛丽亚收下时数都没数，只把Gustav Moser的名字从木牌上抹去，粉笔灰落在卷心菜上。Mitzi Hofer 2拎着篮子从旁边过去，没停脚。
  _effects: cash -3 (延迟偿还市场赊账（其中3克朗记入债务）); food; reputation -0.050000000000000044; relation acquaintance with person-materialized-world-vienna-1912-132_

- **1956.01** `state_tick:p21-scandal-web/the-web-tightens/held` tags: p21-scandal-web, scandal_web, scandal, secret, blackmail, network, leverage, danger
  又过了一年，那几张纸仍锁在Gustav Moser的抽屉里。街上的问话没有变多，也没有变少；Gustav Moser在咖啡馆里数了数还能信任的人，发现名单比去年短，但每一个名字都还站得住。
  _effects: state_parameter p21-scandal-web.exposure 69 -> 66; state_parameter p21-scandal-web.loyalty 27 -> 31; state_parameter p21-scandal-web.danger 44 -> 41; mood 0.010000000000000009_

- **1956.01** `r13-civ.join-charity::ctx-vienna-postwar-1945::milieu-tenement/accepted-as-visitor` tags: social, charity, membership, poverty, respectability, vienna, urban, postwar
  Otto Huber把登记簿摊在门房的小桌上，让Gustav Moser写下姓名和住址。Gustav Moser写完后，Otto Huber在名字旁边画了一个小十字，说下周去给孤老送煤。本子上前面几行，墨迹已经褪成了褐色。
  _effects: cash -1 (慈善会登记簿上的空行（其中1克朗记入债务）); reputation 0.040000000000000036; flag +joined_charity_visiting_round_

- **1956.02** `ad20-loan::ctx-vienna-postwar-1945::milieu-tenement/loan-refused` tags: loan, debt, credit, everyday, obligation, money, vienna, urban
  Alois Bauer 2把Gustav Moser的收入证明翻来覆去看了两遍，说数目不够。Gustav Moser问能不能少借一点；Alois Bauer 2说“少借也要还得起”。走出门时，Gustav Moser把证明信重新叠好，发现上面有一道自己刚才捏出的折痕。
  _effects: flag +loan_refused; mood -0.030000000000000027; relation acquaintance with person-materialized-world-vienna-1912-104; cash -1 (paperwork and a wasted morning)_

- **1956.02** `p9-social-family-conflict-care.cousin-bed/three-days-only` tags: family, care, siblings, inheritance, housing, money
  Gustav Moser只答应让Elisabeth Bauer 2住三天，腾出半张床，又托Helene 4去打听便宜床位。三天里Elisabeth Bauer 2白天出去找活，傍晚回来坐在行军床边上，藤箱始终没有打开。第三天晚上Helene 4带回消息，说有一处工人宿舍，一周一克朗；Gustav Moser数出一克朗硬币放在箱盖上，替Elisabeth Bauer 2垫了第一周。
  _effects: cash -1 (替表亲垫付工人宿舍第一周（其中1克朗记入债务）); relation kin with person:evt:world-vienna-1912:003410:child_

- **1956.03** `vienna-social-movement.meeting/speak-and-organize` tags: development, social_movement, organization, meeting
  Gustav Moser在后屋的会议上报出自己街区的名字：谁家缺煤，谁被房东催租，谁知道哪间印刷厂还在招人。圣马克斯殡葬合作社把这些事记进一本旧账本，散会时每个人带走一叠更小的纸条。
  _effects: skill; reputation 0.020000000000000018_

- **1956.06** `vienna-medical-treatment.toothache/dentist-pull` tags: health, medical, family, money
  诊室在二楼，楼梯间飘着石炭酸味。医生把钳子举到灯下看了看，叫Gustav Moser攥紧扶手。Berta Stein站在门边数墙上的价目表：拔牙两克朗五十赫勒，药棉五十赫勒，连消炎水另算。
  _effects: cash -3 (牙医拔牙费用（其中2.8克朗记入债务）); health 0.05999999999999999 (拔除病牙解除疼痛); mood -0.020000000000000018; relation acquaintance with person-materialized-world-vienna-1912-87_

- **1957.01** `state_tick:p21-scandal-web/the-web-tightens/held` tags: p21-scandal-web, scandal_web, scandal, secret, blackmail, network, leverage, danger
  又过了一年，那几张纸仍锁在Gustav Moser的抽屉里。街上的问话没有变多，也没有变少；Gustav Moser在咖啡馆里数了数还能信任的人，发现名单比去年短，但每一个名字都还站得住。
  _effects: state_parameter p21-scandal-web.exposure 66 -> 63; state_parameter p21-scandal-web.loyalty 31 -> 35; state_parameter p21-scandal-web.danger 41 -> 38; mood 0.010000000000000009_

- **1957.01** `kernel-health.task-pharmacy-hunt::ctx-vienna-postwar-1945::milieu-tenement/pharmacy-last-bottle` tags: health, task, pharmacy, shortage, black_market, vienna, urban, postwar
  Gustav Moser跑了四家药房，最后在火车站附近的小店找到最后一瓶奎宁。掌柜先问给谁用，又看了看Gustav Moser的鞋，才把瓶子从柜台底下拿出来；价格是官价的三倍。他把瓶子塞进内袋，路上每隔一会儿摸一下。
  _effects: cash -25 (last bottle of quinine at three times the official price（其中25克朗记入债务）); health 0.039999999999999994 (quinine obtained and taken); condition; role; knowledge “奎宁这类药会藏在柜台底下，先问给谁用，再看买药人的鞋；价格是官价三倍。”_