# Phase 14 — Literary Critique

**Scope.** The 18 lives in `docs/v4/phase-14-lives.md` / `.json` (three 65-year seeds, 2,423 subject events), the Klara special life (`docs/v4/phase-14-special-life.md`, 294 events), `docs/v4/phase-14-causality.json` (25,017 events, 1,057 linked, 161 long chains), the current 88-year `docs/v4/playtest.json` (30,493 events), `docs/v4/phase-14-literary-plan.md`, and `docs/v4/phase-13-critique.md`. No code or content was edited; only this file was written.

**Method.** I read the complete subject-event lists for four lives of different shapes: **Luise Weiss** (short child, 23 events, 1932–1943), **Mitzi Kraus** (long worker, 214 events, 1921–1977), **Anna Bauer** (educated/professional, 215 events, 1900–1970), and **Helene Weiss** (historical participant and mother, 200 events, 1917–1977). I read the Klara special life in part (the literacy chain and the ending), and used the other 13 lives for repetition and ending checks. I scored the four lives on the six-dimension rubric (0–5 each) from the complete lists, not from 15-event excerpts; I capped relationship continuity and causality at 4 because the dossier is subject-only, not the full event log. I scored 15 events on the 4×10 rubric against their own trace and recorded effects. I read five chains end-to-end from the lives, and five chain samples from `phase-14-causality.json`.

**Evidence note — read this before the scores.** `phase-14-causality.json` is **not the same run** as the 18 lives. The causality file is `seed phase14-causality`, 70 years, 25,017 events, 574 persons. The lives are three 65-year runs (`vienna-1912-vertical-slice`, `phase14-b`, `phase14-c`) with 16,575 / 15,713 / 21,127 events. The same names and, in most cases, birth dates recur, but the deaths differ:

- **Anna Bauer** dies in 1929 in the causality run; she dies in 1970 in the lives.
- **Franz Lechner** dies in 1969 in the causality run; he is alive at 79 in 1977 in the lives.
- **Mitzi Lechner** dies in 1929 in the causality run; she is alive at 74 in 1977 in the lives.

Of the 40 chain samples, **0** match a life event by id *and* action. Ten ids overlap, and all ten are different events. The 161 long chains therefore describe a different timeline, not the 18 published lives. The 18 lives contain **18 long links (≥10 years) across 4 people**, and only **four distinct chain mechanisms**. This is the single largest limit on any claim that Phase 14 “fixed continuity.” I return to it in §3 and §6.

---

## 0. Headline

| Measure | Result |
|---|---|
| Whole-life scores (4 lives, 6×5) | Luise **22/30**, Mitzi **17/30**, Anna **20/30**, Helene **17/30**; mean **19.0** |
| Phase 13 five-life comparison | Phase 13 mean **15.8/30** (14, 17, 14, 16, 18), sampled from 15-event excerpts |
| Event sample (15 events, 4×10) | **7/15 pass (46.7%)**, mean **29.73/40** |
| Phase 13 final event sample | **12/15 pass (80%)**, mean **33.67/40** |
| Long chains read end-to-end | 2 genuine, 1 partial, 1 weak, 1 tag-only |
| `phase-14-causality.json` chain designs | 4 promising, 1 weak; **none text-verifiable in the lives** |
| Verdict | Two partial lives (Luise, Anna) and two linked fragments with a spine (Mitzi, Helene). Subject identity is fixed; life continuity is not. |

The event-level drop from 12/15 to 7/15 is not a like-for-like regression. The Phase 13 final sample was 3 composed / 12 base and selected strong moments; this sample is 8 composed / 7 base and deliberately includes endings and late-life scenes. The composed layer is stable (5/8 pass, mean 32.88); the failure is concentrated in deaths (0/2, mean 17.0) and late-life POV/role scenes. That is the point: those are the scenes that decide whether a sequence of events is a life.

---

## 1. Whole-life review

### 1.1 How to read the scores

The six dimensions are the ones specified in `phase-14-literary-plan.md` §4: specificity, causality, character continuity, relationship continuity, historical texture, dramatic shape. Each is 0–5; the total is /30. The bands are: 26–30 “reads as a life”; 20–25 “a partial life, strong spine, at least one major continuity hole”; 14–19 “linked fragments with a spine”; 0–13 “an event sample, not a life.”

These are **complete-dossier scores**, not 15-event excerpt scores: I read every subject event the dossier prints for each of the four. They are still not full-log scores, because the dossier is subject-only and excludes participant scenes. That is why I do not award 5 on relationship continuity or causality even where the pattern is strong.

### 1.2 Luise Weiss (1932–1943, age 11) — 22/30

| Dimension | Score | Evidence |
|---|---:|---|
| Specificity | 4 | The slate, the flour tin, the copper button, the oversized boots, the match box, the frozen hands. The slate recurs across 1938–1941 and becomes a real motif; the button is a one-scene object. |
| Causality | 3 | Local chains work (fever → doctor's bill; borrowed slate → literacy; mother's drinking → hidden wages). The death has no prior condition and changes residence without a move. |
| Character continuity | 4 | The girl who hides her wages in the flour tin is the same girl who reads the tram sign and carries the slate home. The ending does not show what she became. |
| Relationship continuity | 4 | Mother Grete, father Hermann, siblings Alois and Josef, Anton Weiss, teachers Anna Huber/Anna Berg all recur. The death has no family in the room. |
| Historical texture | 4 | The 1938 school entry without papers, the air-raid drill, the factory nursery, the match selling and the ration queue are exact objects. The war changes the weather more than the options. |
| Dramatic shape | 3 | A clear childhood arc, but the ending is a statistical stop; the copper button and the slate do not pay off. |
| **Total** | **22** | A partial life with a strong childhood spine and an unearned ending. |

The birth is a census line, not a scene:

> `002806` · 1932.01 · `birth` — “Luise Weiss在Berg-Wohnung, Josefstadt出生。Grete Lechner 2、Hermann Weiss在场；家里现在有6口人。”

The best seed is the blood oath:

> `004515` · 1939.04 · `r14-soc.childhood-oath/.../pricked-thumbs` — “后院的砖墙根下，两个孩子用缝衣针扎破拇指，把血按在一起，换了一枚磨亮的黄铜纽扣和半截铅笔头。Anton Weiss说谁家先搬走，谁就把纽扣寄回来；Luise Weiss把纽扣缝进衬衣内袋，针脚歪得像一条小路。第二天，Anton Weiss家的行李车停在了巷口，车板上还搁着没来得及收的煤油灯。”

That is the strongest single passage in the four lives: the needle, the blood, the brass button, the crooked stitches, the luggage cart and the kerosene lamp are all exact, and the departure is a real loss. But the button is never mentioned again. The life remembers it; the state does not.

The mother's drinking scene is the best character scene:

> `005072` · 1941.03 · `r1-child.drunk-mother-pay/.../wages-in-the-flour-tin` — “Grete Lechner 2把房租钱拿去换了酒，回来时鞋跟断了一只。Luise Weiss把工钱藏进面粉罐，上面压了半袋面。Grete Lechner 2翻遍柜子，问她见没见钱，Luise Weiss说没有。夜里她听见母亲在厨房里哭，又把面粉罐抱得更紧。”

The flour tin is a better object than the copper button because it recurs in the reader's memory as a hiding place, not just a prop. The literacy chain also works:

> `005365` · 1942.03 · `r1-child.reading-timetable/.../recognised-the-middle-character` — “…某天忽然认出中间那个是‘街’，因为老师在黑板上写过。Luise Weiss沿着站牌一路认过去，坐过了一站，回家晚了半小时。Grete Lechner 2要打，Luise Weiss说我会念站名了。”

The death is the failure:

> `005431` · 1943.01 · `statistical_death/other` — “Luise Weiss在Leopoldstädter Zinshaus, gemeinsamer Gang突发急病，高热和虚弱持续了几天。医生没能给出明确诊断，Luise Weiss在一个夜里去世。”

She was born in `Berg-Wohnung, Josefstadt` (`002806`) and there is no move event. The death puts her in a different tenement, with no mother, father, sibling, teacher, Anton Weiss, slate or button. The cause is “急性疾病,” a label rather than a diagnosis. The life stops; it does not close.

### 1.3 Mitzi Kraus (1921–1977, age 56) — 17/30

| Dimension | Score | Evidence |
|---|---:|---|
| Specificity | 4 | The registry office and half-kilo of coffee, the six-krone midwife, the borrowed cradle, the pawnshop, the sewing machine, the rent notice. But the dossier repeats titles: “产床与借来的摇篮” ×5, “门缝里的涨租通知” ×4, “伤后的几天” ×4, “晾衣绳上的争执” ×4. |
| Causality | 3 | School leaving → apprenticeship, marriage → birth, and the tutoring → letter chain are real. Partners, children and households reset without exits. |
| Character continuity | 2 | A literate, stubborn, economically pressed worker is visible; 22 of 214 events use a standalone “他,” including subject misgender. The late-life person is not the same grammatical person. |
| Relationship continuity | 2 | Alois Stein 2 recurs 1939–1958, but Berta 2 appears only at birth. Ferdinand Weiss 2 and Emil Kral enter without exits. The household id `hh-schnitzler` is reused for different partners. |
| Historical texture | 4 | 1938 Anschluss, 1939 mobilization, 1942 SDAP, 1945 liberation, 1945 workhouse, 1950s housing, 1960s consumer goods. Strong objects; history rarely changes the chain. |
| Dramatic shape | 2 | No ending. The last event is a market closing in 1977.11; the life stops at 56. |
| **Total** | **17** | Linked fragments with a strong economic spine and a broken relational one. |

The school-leaving scene is a real turn:

> `003065` · 1933.02 · `r13-turn.school-leaving/.../signed-apprenticeship` — “毕业钟敲过三下，Anna Huber把成绩单按在讲台上，说Mitzi Kraus还能再读一年，只要家里肯出四克朗。家里人在走廊里把学徒契约展开，纸角还带着面粉。Mitzi Kraus签了名，第二天就站到刨床前，手指上多了第一道木刺。”

The marriage is the best institutional scene in the life:

> `004500` · 1939.09 · `major-family.proposal-accepted/proposal-accepted.registry-office` — “Mitzi Kraus和Alois Stein 2先在教区教堂行礼，神父把名字写进婚册，随后去市政办事处补登记。证人是楼下的洗衣妇和Alois Stein 2的工头。两人用盖过章的收据换了半公斤咖啡，回家把两只箱子并排塞进床底。收据压在镜子下面，镜角还夹着洗衣妇送的纸花。没有宴席，晚上照常上工，邻居第二天才知道他们结了婚。”

The birth is strong on the body and the household economy:

> `004756` · 1940.01 · `vienna-family-childbirth/daughter-born` — “Mitzi Kraus在Leopoldstädter Zinshaus, gemeinsamer Gang生下一个女婴，取名Berta 2。接生的人收六克朗，Alois Stein 2在走廊烧水，邻居借来一只摇篮；Mitzi Kraus起身时眼前发黑，三天后腰还像断了一样，孩子哭声响亮，把屋里的冷气都顶了回去。”

Then Berta 2 disappears. She is mentioned at birth and never again in 214 events. The father, Alois Stein 2, appears at the marriage, the birth, the 1945 job search and the 1958 orphanage, but there is no separation or death. Yet in 1942 Mitzi brings a different partner to her mother's table:

> `005403` · 1942.01 · `r13-fam.introduce-partner/.../accepted-at-table` — “Mitzi Kraus把Ferdinand Weiss 2领进厨房，Maria Weiss正在切面包，刀没有停。Ferdinand Weiss 2把带来的果酱放在桌角，说自家做的；Maria Weiss看了一眼，让它搁着。”

This is not a new relationship after a break; it is a second partner while the first is still alive and unmentioned. The same pattern repeats with Emil Kral in 1945–46 (`006148`, `006251`). The 1939 proposal to Otto Winter 2 (`004498`) is refused in 1940.01 (`004583`), *after* the marriage to Alois Stein 2, so even the proposal timeline is inverted.

The prose also loses the subject's gender:

> `006149` · 1945.11 · `r3-crime.vagrancy-arrest/.../sent-to-the-workhouse` — “…Maria Huber 2后来告诉Mitzi Kraus的妹妹，说‘他去外地找活了’。”

> `006507` · 1946.01 · `task-vienna-writer-researcher.abandon-project/project-reworked` — “三个月里他改成一部五十页的短稿，用挂号寄给Helene Lechner…”

> `015190` · 1973.01 · `p10-migration-tasks.move-district/move-stay-and-bargain` — “他最终没有搬，把箱子又拖回楼上，跟旧房东坐在厨房桌边谈了半个钟头。”

`015190` is also an action contradiction: the task is “move-district,” the text says she did not move. The effect is `cash -3` and relations, with no `move`. The task layer is not reading its own action.

The last event is not an ending:

> `016401` · 1977.11 · `p9-gap-adult-ordinary-day.market-closing/market-closing.bruised-apples` — “苹果堆里混着几个已经发软的，摊主用围裙兜着往她篮子里倒，说拿回去喂猪也不亏。Mitzi Kraus在井边洗了半篮子，削皮时看见果核边有一圈褐色的痕，刀子挖下去，甜味还是冒出来。”

It is a good ordinary image. It is not a horizon. There is no sentence telling the reader that the world stops here, and no last visit, letter or farewell.

### 1.4 Anna Bauer (1900–1970, age 70) — 20/30

| Dimension | Score | Evidence |
|---|---:|---|
| Specificity | 4 | The scholarship envelope, seminary Latin, the dissection table, the pirated copyright page, the chess clock, the spirit photograph, the tumour X-ray. Dense, but many objects are one-scene. |
| Causality | 3 | Scholarship → seminary → TB → copyright → companionship → tumour is a rough arc. The scholarship is erased by an apprenticeship one month later; the empty room precedes the companion's death; the death is in a town she never moved to. |
| Character continuity | 3 | The scholarship girl, the public corrector, the chess player and the woman who pays for a second spirit photograph are recognizable. 31 of 215 events use a standalone “他,” including subject misgender. |
| Relationship continuity | 3 | Alois Moser is a companion from 1960 to his death in 1967; the mother and the rival Franz Lechner recur. The death is alone, and the empty-room scene is out of order. |
| Historical texture | 4 | 1913 scholarship, wartime scarcity, 1938 Anschluss, postwar shortage, 1950s housing. The period is legible in prices, papers and rooms. |
| Dramatic shape | 3 | Scholarship → tumour → death has a shape, but the ending is statistical and place-wrong. |
| **Total** | **20** | A partial life with a professional texture and a broken ending. |

The scholarship is a strong opening:

> `000010` · 1913.01 · `major-education-scholarship-examination/full-scholarship` — “考试设在女子中学的二层教室。Grete Stein当着Anna Bauer的面拆开牛皮纸袋：一篇作文、两道算术、一段听写。Anna Bauer写到最后一个数字时，手心里全是墨。三周后学校寄来通知，学费全免，首年发三十克朗书籍费，余下按学期发；条件是期末平均分不得低于良。”

One month later, the family signs an apprenticeship because it cannot wait two years:

> `000011` · 1913.02 · `r1-fam.schooling-decision/.../school.apprenticeship` — “Gustav Berg把学徒合同摊在桌上，说三年管饭，出师后一天两克朗。Grete Stein说Anna Bauer的算术是班里最好的，再读两年可以考师范。Josef Bauer把合同推回去，说家里等不起两年；Anna Bauer看着窗外，操场上有人在踢一只破球。”

The gesture and the effect disagree: Josef pushes the contract back, but the committed effects are `flag +left_school_for_apprenticeship`, `role +apprentice`, `education apprenticeship`. The scholarship flag `lyceum_scholarship` is never read again. This is the clearest case of a seed being spent in the same month it is planted.

The copyright scene is the best professional scene:

> `000921` · 1921.03 · `r2-law.copyright/.../pirated-edition` — “Anna Bauer在火车站书摊上看见自己的书，封面换了颜色，版权页印着‘某出版社’。摊主说这本便宜一半，卖得比正版快。Otto Bauer翻了翻，说纸张和装订都指向城北那家小厂；Mitzi Kral 2听完只说一句：告赢了也赔不出钱。”

The scene knows the economics of a pirated edition, but the `cash -4` is invisible: the text never says what the four kroner buys. The book never returns as a lawsuit, a payment or a second edition.

The companion relationship is the best continuity in the life:

> `010050` · 1960.08 · `r13-rel.later-life-companionship/.../two-photographs-on-the-shelf` — “两人的旧伴都死在战争里。Anna Bauer把一张照片摆在柜子上，Alois Moser也摆了一张，两张照片隔着半臂的距离。清明节，两人一起去墓地，各看各的碑，回来时却在同一家小馆吃了饭。”

> `012155` · 1967.02 · `vienna-elder-bereavement.spouse-death/spouse-death.hold-hand` — “Anna Bauer没有出门，握着Alois Moser的手把最后的话听完。Alois Moser说柜子底层有一张存折，又说窗台那盆天竺葵别忘了浇水。说完这些，呼吸就停了。”

That is a genuine 1960–1967 relationship, and it is the strongest relational arc in the four lives. But the empty-room scene comes one year *before* the only death it can refer to, Alois Moser's:

> `011846` · 1966.01 · `vienna-elder-bereavement.empty-room/empty-room.keep-room` — “Anna Bauer什么也没动，空床照样铺着，每天擦一遍桌子，把眼镜搁回原来的位置。房租和煤照旧要付，Luise Kraus劝过两回，Anna Bauer说这样就挺好。”

The death is place-wrong:

> `013143` · 1970.01 · `statistical_death/old_age` — “Anna Bauer在Haus der Tante in Klosterneuburg的床上安静地停止呼吸。桌上还放着没吃完的药和一杯水，邻居早上来敲门时才发现。”

She lives in Vienna; there is no move to Klosterneuburg in 215 events. The “Haus der Tante” is a real place in the world — Helene Weiss is moved there in 1945 — but Anna was never moved there. The death template picked a place from the world, not from her life.

### 1.5 Helene Weiss (1917–1977, age 60) — 17/30

| Dimension | Score | Evidence |
|---|---:|---|
| Specificity | 4 | The violin case, the anatomy table, the four births, the iron brace, the passport queue, the red paper of the second shop. Dense, but the birth frame is repeated four times. |
| Causality | 2 | Medical education → hospital assistant is real; then shopkeeper and factory hand with no transition. The POW return has no capture; “第五期” is published twice, 24 years apart; the 1938 Anschluss is dated January. |
| Character continuity | 2 | The medical student and the shopkeeper are different people. 9 of 200 events use a standalone “他,” including subject misgender. |
| Relationship continuity | 3 | Otto Weiss is a partner 1935–1939; Alois, Hermann and Mitzi are born; Josef Weiss is a sibling. Many other intimates are one-scene; the stillbirth and adoption are isolated. |
| Historical texture | 4 | 1938, 1939 exile press, 1945 displacement, 1953 POW return, 1956 exile files, 1965 passport queue. The historical objects are excellent. |
| Dramatic shape | 2 | The best last scene in the set, but it is a retirement, not a horizon; the war is a series of tableaux. |
| **Total** | **17** | Linked fragments with a strong historical surface and no career spine. |

The medical-school scene is a real professional beginning:

> `004208` · 1936.09 · `r14-edu.faculty/.../chose-medicine` — “Grete Huber在阶梯教室的黑板上写下三个词：医学、法律、工程。Helene Weiss在报名表上勾了医学，Grete Huber看了一眼，说解剖课在冬天，教室没有炉子。”

Two years later she graduates:

> `004762` · 1938.05 · `r13-turn.graduation/.../degree-without-post` — “典礼在讲堂里举行，Rosa Stein把文凭递过来时低声说，研究所只有一个位置。Helene Weiss看见Helene Lechner把简历塞进教授的口袋。她没有递，抱着文凭走回出租屋，路上买了一份报纸，把招聘栏折在最上面。”

The war-era newspaper is the best historical scene:

> `005040` · 1939.05 · `r3-mig.exile-newspaper/.../paper-smuggled-in-violin-case` — “第五期印了五百份，头版是边境逮捕的名单。Anna Huber把纸叠成四折，塞进一个提琴盒，说‘过检查就说去演出’。Maria Huber在校样上改了三个错字，最后把‘失踪’改成‘被带走’。Helene Weiss抱着提琴盒出门时，手指在琴弦上按出了印子。”

But the same “第五期” is published again in 1963:

> `013868` · 1963.10 · `r3-mig.exile-newspaper/.../press-seized` — “警察进来时，Katharina Huber 2正在上版。Elisabeth Moser把铅字盘掀翻，铅字滚了一地，Berta Hofer 2趁机把名单塞进嘴里。”

The title and action are the same; the date is 24 years later. This is not a return of the earlier newspaper; it is the same template firing again.

The POW return has no POW:

> `009714` · 1953.06 · `r3-war.pow-return/.../built-spoon-after-return` — “回来第三个月，Helene Weiss还是每天凌晨四点醒。Berta Lechner听见动静，也跟着起来烧水；两人坐在厨房里，不说话，等天亮。Rosa Huber来借盐，看见Helene Weiss在削一块木头，削成一把小勺，说是给Berta Lechner的。”

She was displaced in 1945 (`006867`), not captured. There is no war-service, capture, camp or return event. The scene asserts a return that never happened. The prose is quiet and good; the eligibility is wrong.

Then the doctor becomes a shopkeeper:

> `014793` · 1965.09 · `r13-turn.business-success/.../opened-second-shop` — “第二家分店开张那天，Helene Weiss在门口贴了红纸，Elisabeth Moser把新秤擦得发亮。Helene Huber站在街对面看了一会儿，过来买了一包盐，说恭喜。Helene Weiss找零时多给了一枚铜板，Helene Huber没要，把盐夹在腋下走了。”

There is no shop lease, no first shop, no transition from medicine to retail. The scene is competent on its own; it belongs to a different life.

The last scene is the best ending image in the four lives:

> `020761` · 1977.11 · `kernel-migrate.retirement/.../civic-retirement-retire` — “最后一天，车间没有仪式，只有一张签满名字的卡片和一把用旧的卡尺。她把工具一件件放回盒子，Franz Berg问她明天还来不来；她说‘不来了’，走到门口又回头看了一眼自己的工位。”

It is a real last day: the card, the caliper, the toolbox, the look back. But it is a printshop retirement after a medical degree and a shop; it does not close the life, and it does not say the horizon has arrived.

### 1.6 What the four lives establish

- **Subject identity is fixed.** All 2,423 dossier events are subject events; there is no Phase 13 participant drift. This is a real and important win.
- **The local scene layer is still the strongest layer.** The oath, the drunk mother, the marriage, the birth, the copyright page, the newspaper in the violin case and the last clock-out are scenes a reader can quote. The prose is often good.
- **The life layer is not fixed.** The four lives have a mean of 19.0/30; only two reach the “partial life” band, and none reaches “reads as a life.” The same failures recur: deaths without scenes, intimates without exits, roles without transitions, seeds without returns.
- **The new chain layer is thin.** `r14-*` events are 2.3–4.3% of each of the four lives (22 of 652 events); across all 18 lives they are 70 of 2,423 (2.9%). Even a perfect chain layer would be a handful of scenes in a 200-event life.
- **The long links are few and repetitive.** The 18 lives contain 18 long links, but only four mechanisms: tutoring → sibling letter/exam (10 links), music lessons → recital/scores (6), scholarship → debt (1), copper button → loan (1). The tutoring chain alone accounts for more than half of the long links.

---

## 2. Event-level review

### 2.1 The 15-event sample

`evt:` prefix omitted from the EventId column; all ids are `evt:world-vienna-1912:<suffix>`. “C” = compiled Recipe kernel; “B” = base/generated pack scene. The sample is purposive: it includes the strongest composed scenes, ordinary base scenes, two tasks, two deaths, and late-life scenes. It over-weights composed events (8/15 = 53%) relative to the four lives (38.2%) and over-weights deaths (2/15 = 13%) relative to the lives (2/652 = 0.3%). It is a whole-life stress test, not a library estimate.

| # | Life | Date | EventId | Action (path) | Type | Category | Sp | Dr | Ch | Ca | Total | Result |
|---:|---|---|---|---|---|---|---:|---:|---:|---:|---:|:---:|
| 1 | Luise | 1939.04 | `004515` | `r14-soc.childhood-oath/.../pricked-thumbs` | C | childhood/turn | 10 | 8 | 9 | 8 | **35** | **Pass** |
| 2 | Luise | 1941.03 | `005072` | `r1-child.drunk-mother-pay/.../wages-in-the-flour-tin` | C | family crisis | 10 | 9 | 9 | 8 | **36** | **Pass** |
| 3 | Luise | 1942.01 | `005417` | `p9-gap-childhood-chores.market-line/line-half-flour` | B | ordinary task | 9 | 7 | 8 | 8 | 32 | Fail |
| 4 | Luise | 1943.01 | `005431` | `statistical_death/other` | B | death | 5 | 4 | 6 | 2 | 17 | Fail |
| 5 | Mitzi | 1933.02 | `003065` | `r13-turn.school-leaving/.../signed-apprenticeship` | C | school/work turn | 9 | 8 | 8 | 8 | 33 | Fail |
| 6 | Mitzi | 1939.09 | `004500` | `major-family.proposal-accepted/proposal-accepted.registry-office` | B | marriage | 9 | 8 | 8 | 9 | **34** | **Pass** |
| 7 | Mitzi | 1940.01 | `004756` | `vienna-family-childbirth/daughter-born` | B | birth | 8 | 7 | 7 | 9 | 31 | Fail |
| 8 | Mitzi | 1973.01 | `015190` | `p10-migration-tasks.move-district/move-stay-and-bargain` | B | late-life task | 6 | 3 | 3 | 5 | 17 | Fail |
| 9 | Anna | 1913.01 | `000010` | `major-education-scholarship-examination/full-scholarship` | B | school turn | 9 | 8 | 9 | 9 | **35** | **Pass** |
| 10 | Anna | 1921.03 | `000921` | `r2-law.copyright/.../pirated-edition` | C | professional | 10 | 8 | 9 | 7 | **34** | **Pass** |
| 11 | Anna | 1955.07 | `008651` | `r3-crime.poisoning-case/.../drank-from-the-pot` | C | crisis | 9 | 10 | 9 | 8 | **36** | **Pass** |
| 12 | Anna | 1970.01 | `013143` | `statistical_death/old_age` | B | death | 5 | 4 | 6 | 2 | 17 | Fail |
| 13 | Helene | 1939.05 | `005040` | `r3-mig.exile-newspaper/.../paper-smuggled-in-violin-case` | C | historical | 10 | 9 | 9 | 7 | **35** | **Pass** |
| 14 | Helene | 1953.06 | `009714` | `r3-war.pow-return/.../built-spoon-after-return` | C | historical/late | 8 | 6 | 7 | 5 | 26 | Fail |
| 15 | Helene | 1965.09 | `014793` | `r13-turn.business-success/.../opened-second-shop` | C | late-life/business | 8 | 5 | 8 | 7 | 28 | Fail |

### 2.2 Notes on the passes and failures

- **#1 oath, 35.** The strongest composed scene in the sample. The needle, blood, brass button, crooked stitches and luggage cart carry the whole friendship and its loss. The only weakness is that the friend's departure is next-day coincidence, not caused by the oath; the `relation` and `flag` are visible.
- **#2 drunk mother, 36.** The rent money, the broken heel, the flour tin and the mother's crying in the kitchen are exact. The `cash 2`, `condition parental_drinking`, `flag hid_wages_from_drunk_mother` and `role young_carer` all land. The only hidden item is the exact amount of the wages.
- **#3 market task, 32.** The flour sack, the elbow in the queue, the scale, the stepped-off heel and the barefoot walk home are good. It is an observation, not a turn; the task's `food 2` and `social` are visible, but nothing changes in the life.
- **#4 Luise death, 17.** No family, no prior illness, wrong residence, no object. The “医生没能给出明确诊断” is a good sentence in a scene that is not a scene.
- **#5 school leaving, 33.** The four kroner and the apprenticeship contract are a real choice. The committed `cash -2` does not match the four kroner the family is said to lack; the “first wood splinter” is a good closing image. One point short.
- **#6 marriage, 34.** The registry office, the two witnesses, the half-kilo of coffee, the two boxes under the bed and the receipt under the mirror are a complete institutional scene. `partner`, `household`, `role`, `cash -6` all visible. Pass.
- **#7 birth, 31.** The six kroner, the boiling water in the corridor, the borrowed cradle and the cry pushing back the cold are strong. But the same birth template appears four times in Helene's life, and Berta 2 is never seen again. The event is coherent; the life is not.
- **#8 move task, 17.** “他最终没有搬” misgenders Mitzi, and the action is “move-district” while the text says she stayed. The `cash -3` and relations are visible, but the task's own action is contradicted. This is the worst event in the sample.
- **#9 scholarship, 35.** The brown envelope, the essay/arithmetic/dictation, the ink on the palm, the thirty kroner book grant and the “average must be good” condition are exact. `education`, `cash`, `role`, `flag` all visible. Pass.
- **#10 copyright, 34.** The bookstall, the changed cover, the “某出版社” page and “告赢了也赔不出钱” are a complete professional humiliation. The `cash -4` is invisible; the flag, condition and knowledge are visible. Pass with a money flaw.
- **#11 poisoning, 36.** “我先尝咸淡,” the vomiting, the gastric lavage, the evidence bag and “先查查锅” are a complete crisis. The condition, flag, knowledge and `cash -6` are visible. The poisoner is never identified, but the scene does not need one. Pass.
- **#12 Anna death, 17.** No companion, no tumour, no Vienna, no move. The death is in “Haus der Tante in Klosterneuburg,” a place she never lived. The “邻居早上来敲门” is the only social relation, and it is generic.
- **#13 newspaper, 35.** The 500 copies, the border arrest list, the violin case, “过检查就说去演出,” the change from “失踪” to “被带走” and the fingers pressed into the strings are the best historical scene in the sample. The `reputation`, `flag`, relations and knowledge are visible; there is no cash cost. Pass.
- **#14 POW return, 26.** The 4 a.m. waking, the silent kitchen and the carved spoon are good prose. But there is no capture, camp or war-service event; the scene asserts a return that never happened. The `condition insomnia` and `flag built_spoon_after_pow_return` are visible, but the cause is missing.
- **#15 second shop, 28.** The red paper, the new scale, the packet of salt and the refused copper coin are a competent shop-opening. But Helene is a medical graduate and hospital assistant; there is no shop lease or first shop. The `cash 30`, `reputation 0.16` and `role merchant` are visible; the role is not reachable.

### 2.3 Aggregate results

- **Pass count: 7/15 (46.7%).**
- **Mean: 29.73/40** (sum 446).
- **Dimension means: specificity 8.33, drama 6.93, character/period 7.67, causality 6.80.**
- **Composed subset:** 5/8 pass (62.5%), mean **32.88** (sum 263).
- **Base subset:** 2/7 pass (28.6%), mean **26.14** (sum 183).
- **Base ordinary, excluding deaths and the late-life task:** 2/4 pass (50%), mean **33.0** (sum 132).
- **Deaths:** 0/2 pass, mean **17.0**.
- **Tasks:** 0/2 pass, mean **24.5**.
- **75% equivalent (12/15): not met by five passes.** Even if the two 33/31 near misses were rounded, the sample would be 9/15 (60%), still short.

### 2.4 Comparison with Phase 13

| Metric | Phase 13 final | Phase 14 (this sample) |
|---|---:|---:|
| Pass count | **12/15 (80.0%)** | **7/15 (46.7%)** |
| Mean | **33.67** | **29.73** |
| Specificity | 8.87 | 8.33 |
| Drama | 7.47 | 6.93 |
| Character/period | 8.93 | 7.67 |
| Causality | 8.40 | 6.80 |
| Composed share | 3/15 (20%) | 8/15 (53%) |
| Deaths | 0/15 | 2/15 |

The comparison is **not like-for-like**. Phase 13's final sample was 3 composed / 12 base, selected three strong events per life and contained no deaths. This sample is 8 composed / 7 base and deliberately includes two deaths and two late-life scenes. The composed layer is stable: 32.88 here vs 33.50 in Phase 13's earlier 8-event composed sample. The base ordinary layer is not the problem: 33.0 here, above Phase 13's earlier 28.58 base mean (though the sample is tiny). The drop is concentrated in **deaths (17.0)** and **late-life POV/role scenes (17–28)**.

That is the honest reading: Phase 14 did not regress across the whole library, but it did not fix the layer that matters most for a life. The endings are still 17/40; the late-life task and role scenes are 17–28/40. A library with a 33-point middle and a 17-point ending is still a library of fragments.

---

## 3. Long-chain reading

### 3.1 The evidence problem

The task asks for five chains from `phase-14-causality.json` with ≥10-year gaps and the actual root/later texts. The file provides the root/later **metadata** (id, date, title, action, tags, effects, gap, participants) but **not the texts**. The texts are not in `phase-14-lives.json`, `phase-14-special-life.json` or `playtest.json`: the causality run is a different seed (`phase14-causality`), 70 years, 25,017 events, 574 persons.

The mismatch is not subtle:

| Name | Causality run | 18 lives |
|---|---|---|
| Anna Bauer | born 1900, died **1929** | born 1900, died **1970** |
| Franz Lechner | born 1898, died **1969**, 210 events, 21 links, 8 long | born 1898, **alive at 79 in 1977**, 210 events, 9 links, 0 long |
| Mitzi Lechner | born 1903, died **1929** | born 1903, **alive at 74 in 1977** |
| Marie Huber | born 1904, died **1964** | born 1904, **alive at 73 in 1977** |
| Rosa Kraus | born **1955** | born **1917** |

Of the 40 chain samples, 0 match a life event by id and action. The 10 id overlaps are all different events (for example, causality `000664` is Anna Bauer's police questioning; lives `000664` is Anna Bauer's lecture rivalry). The 161 long chains are a property of a **different stochastic run**, not of the 18 published lives.

The 18 lives do contain long links, but far fewer:

- **18 long links (≥10 years) in 2,423 subject events**, across **4 people** (Josef Weiss, Mitzi Kraus, Rosa Kraus, Mitzi Lechner). These are link edges, not 18 distinct chains; some later events receive multiple roots. Of the four lives scored above, only Mitzi Kraus appears in this list; Luise, Anna and Helene have no long links at all.
- **0 long links in seeds `phase14-b` and `phase14-c`.** All 18 are in the first seed.
- **Four mechanisms only:** tutoring → sibling letter/exam (10), music lessons → recital/scores (6), scholarship → debt (1), copper button → loan (1).
- **95.1% of all subject events have no explicit `causes` or `historyRefs` link.** For events with `significance ≥ 0.7`, the figure is 92.7% unlinked (44 of 600 events linked).

This is the central evidence finding: the chain *content* can produce long chains in a diagnostic run, but the *published lives* do not demonstrate them. The literary verdict must be based on the 18 lives.

### 3.2 Five chains read end-to-end from the lives

These are the five chains I could read with actual root and later texts. Each has a ≥10-year gap and an explicit `causes`/`historyRefs` link.

#### C1 — Mitzi Kraus: tutoring → the letter that repays it (15 years) — **genuine**

Root:

> `003840` · 1936.01 · `r14-edu.tutoring-sibling/.../own-marks-slipped` — “Mitzi Kraus每晚给Franz Kraus讲题，自己的作业只能留到深夜。期中考试，Mitzi Kraus的名次掉了十几位，Ferdinand Weiss在家长会上点名。回家后，Mitzi Kraus看见Franz Kraus趴在桌上睡着了，算术本还摊在胳膊下面，就没有叫醒。”

Later:

> `007724` · 1951.01 · `r14-edu.sibling-favour/.../sibling-paid-the-fees` — “Franz Kraus在城里站稳了脚，托人带来一个信封，里面是八克朗和一张夜校报名单。信上只写：当年你教我算术，现在轮到我付学费。Mitzi Kraus把报名单看了三遍，填好，第二天一早就去交了。”

**Verdict.** This is a real payoff. The later text names the earlier act (“当年你教我算术”), the state changes from `mood -0.06` / `neglected_own_studies` to `cash 8` / `sibling_repaid_tutoring`, and the roles reverse (the tutor becomes the pupil). It is the best chain in the corpus. It is also one of only four mechanisms, and it fires five times for Mitzi/Rosa — four with the same paid-the-fees text (only the sibling's name changes) and one with a refusal variant — which weakens it as a unique life event.

#### C2 — Josef Weiss: scholarship → the debt collector (12 years) — **partial**

Root:

> `007116` · 1948.01 · `r14-edu.scholarship-examination/.../won` — “Josef Weiss把借来的钢笔灌满墨水，在奖学金试卷上写到最后一分钟。放榜那天，Anna Huber在走廊里念出名字，Elisabeth Winter把榜单上那行字抄进本子。学费减免和每年八克朗的补助一起批下来，家里第一次为读书的事沉默了很久。”

Later:

> `010594` · 1960.01 · `r14-edu.scholarship-collector/.../debt-called-in` — “Helene Hofer带来一封律师事务所的信：当年赞助人破产，债权转给了侄子，连本带利二十克朗，限三十天。Josef Weiss把信读了两遍，先去看米缸，再去翻床底的铁盒。Helene Hofer站在门口没有坐，说当年签字时，谁也没想到会有今天。”

**Verdict.** The chain is real — a scholarship becomes a debt twelve years later — but the causal bookkeeping is inconsistent. The 1948 event is a **state scholarship** with an eight-kroner annual grant. The later text says a **private sponsor** went bankrupt: that is the 1955 event `008937` “补助金名册上的附加条款/patron-office” (“一位穿呢外套的赞助人…赞助人当场预支五克朗”). The later event's `causes` field, however, points to `008316` (1953, the bonded country-school obligation), not `008937`. Three different obligations — the 1948 state grant, the 1953 teaching bond and the 1955 patron — are collapsed into one 1960 debt. The reader who remembers 1948 cannot reconstruct which paper they signed. This is a chain with a broken first link.

#### C3 — Josef Weiss: the copper button → the loan (37 years) — **tag-only**

Root:

> `004517` · 1939.04 · `r14-soc.childhood-oath/.../told-the-clinic-secret` — “Josef Weiss把母亲每月去郊区诊所的事告诉了Emil Lechner，包括那张写着‘神经衰弱’的纸和父亲夜里摔杯子的声音。Emil Lechner听完，只把口袋里的玻璃弹珠全倒出来，说换着玩，谁也别提。那枚弹珠在Josef Weiss的枕头下放了十几年；母亲后来再没提过那张纸，Emil Lechner也再没问。”

Later:

> `016107` · 1976.06 · `r14-soc.friendship-money-test/.../signed-the-note` — “Emil Lechner把一张写好的借据摊在咖啡杯旁边，要借二十克朗盘下街角的烟草铺。Josef Weiss数出两张十克朗，又在借据背面添了一句‘不急’。Emil Lechner把借据折成四折，塞进表壳后面，说等铺子开了张，第一包烟算Josef Weiss的。三个月后，烟草铺的招牌挂了出来，第一包烟确实留在了柜台后面。”

**Verdict.** This is a tag-only chain. The later text has the same friend, the same trust and a money decision, but it never names the childhood secret, the mother's clinic, the glass marble or the promise “谁也别提.” The `historyRefs` field points to `004517`, but the prose does not read it. The 37-year gap is impressive metadata; the scene is a generic loan between two men. This is exactly the failure the literary plan warned about: “a later scene that shares a tag is not continuity.”

#### C4 — Josef Weiss: piano lessons → inherited scores (21 years) — **weak**

Root:

> `005131` · 1941.01 · `r14-edu.music-lessons/.../accepted-as-pupil` — “Anna Huber让Josef Weiss把手放在琴键上，先不按键，只听节拍器。Josef Weiss坐了十分钟，手心全是汗。Anna Huber说手型不对，但耳朵可以教。从那天起，Josef Weiss每周三放学后去琴房，练到天黑，回家的路上手指还在桌板上敲。每月学费三克朗。”

Later:

> `011271` · 1962.01 · `r14-edu.music-teacher-legacy/.../inherited-the-scores` — “Franz Kraus退休前把一箱琴谱交给Josef Weiss，说里面有些是自己抄的，错音不少，别照着弹。Josef Weiss翻到一本旧练习曲，页边有铅笔写的指法，还有几处被橡皮擦破的洞。Franz Kraus说这些谱子跟了自己四十年，现在该换个地方落灰了。箱底还有三克朗纸币。”

**Verdict.** Weak. The later scene is about a different teacher (Franz Kraus, not Anna Huber), a different relationship, and a box of scores. It never says Josef plays, remembers the lessons, or recognizes the fingerings from his own training. The `craft +0.04` and `inherited_music_scores` flag are the only links; the prose could belong to any lapsed piano student. The intermediate 1951 recital (`007725`) is a stronger link, but it is a generic “first recital” scene, not a payoff of the 1941 lessons.

#### C5 — Rosa Kraus: tutoring → the sibling's failed exam (10 years) — **genuine, but thin**

Root:

> `002688` · 1931.01 · `r14-edu.tutoring-sibling/.../sibling-resented-drilling` — “Helene Kraus把铅笔一摔，说再也不想看见豆子。Rosa Kraus把豆子一颗颗收进碗里，说随你。那天晚上，Helene Kraus自己把错题改了一遍，改完把本子推到Rosa Kraus面前，不说话。Rosa Kraus看了一遍，在页角画了一个很小的勾。”

Later:

> `004879` · 1941.01 · `r14-edu.sibling-exam/.../sibling-failed` — “Helene Kraus差三分。回家路上，Helene Kraus一句话也没说，进了门就把自己关在屋里。Rosa Kraus把饭菜放在门口，敲了两下，没有回应。半夜，Rosa Kraus听见屋里有人在翻书，翻到天亮。第二天清早，Helene Kraus出来洗脸，眼睛肿着，问Rosa Kraus能不能再教一年。补考费一克朗。”

**Verdict.** Genuine. The later scene reads the tutoring relationship: the sister who once resented the drilling now asks for another year. The failure (three points short) is a real outcome, not a success story, and the one-krone retake fee is exact. It is thin because the root's specific object (the beans, the page-corner tick) does not return; the chain is carried by the relationship, not the object. But it is a payoff, not a tag.

### 3.3 The five `phase-14-causality.json` samples

The five samples I selected all have ≥10-year gaps. Because their texts are unavailable, these are **design verdicts**, not prose verdicts.

| # | Person | Root | Later | Gap | Design verdict |
|---:|---|---|---|---:|---|
| 0 | Friedrich Huber | `003510` 1933.08 “砖墙根下的铜纽扣” `r14-soc.childhood-oath/.../pricked-thumbs` | `020744` 1974.01 “煤巷十七号” `r14-soc.search-old-friend/.../wrong-name` | 41y | **Promising.** A blood oath → a search for the old friend is exactly the right long echo; the “wrong-name” outcome suggests the search fails, which could be a real payoff. No text. |
| 1 | Anton Moser | `004097` 1935.08 “去乡下的行李” `r1-child.sent-to-aunt/.../paper-box-tied-with-string` | `015726` 1964.01 “星期日排班表” `r14-fam.sunday-rota/.../rota-signed` | 29y | **Weak.** The later scene is a generic co-parenting rota; the shared tag is “family,” not the evacuation. Without text, this looks like a tag-only chain. |
| 4 | Rosa Kral | `011186` 1955.01 “黑名单上的门牌号” `r14-hist.strike-blacklist/.../clerk-offers-a-card` | `017767` 1968.01 “假名下的早班” `r14-hist.blacklist-odd-job/.../hired-under-a-cousins-name` | 13y | **Strong.** A blacklist state → a job under a cousin's name is a direct state payoff, with a durable negative state (blacklist) and a survival branch. No text. |
| 5 | Berta Winter | `010173` 1952.03 “指缝里的铅字” `r14-soc.mentor-apprentice/.../reported-the-error` | `015349` 1964.01 “字架前慢半拍的手” `r14-soc.protege-surpasses/.../sabotaged-proof` | 12y | **Strong.** Mentorship → the protégé surpasses and sabotages the proof is a real reversal, with the same two people. No text. |
| 11 | Anna Bauer | `000664` 1919.01 “审讯室里的第十四把椅子” `r14-edu.police-questioning/.../expelled-from-university` | `002423` 1929.01 “街角咖啡馆里的旧围巾” `r14-edu.comrade-reunion/.../comrade-found-work` | 10y | **Strong.** Expulsion → a reunion with the comrade who found work is a real memory/reputation payoff. No text. |

Four of the five designs are promising; one (`#1`) looks tag-only. But **none** can be verified in the 18 lives, and the lives contain no `search-old-friend`, `comrade-reunion`, `blacklist-odd-job`, `protege-surpasses` or `sunday-rota` events. The design is better than the dossier.

---

## 4. Top five remaining literary/continuity failures

I distinguish **prose failures** (the text is wrong or forgets the subject) from **missing mechanics/state** (the engine has no way to represent the continuity the text promises).

### F1 — The ending layer is still a statistical stop, and the place resolver is wrong

**Evidence.**

> `vienna-1912-vertical-slice / Luise Weiss / 005431` · 1943.01 · `statistical_death/other` — “Luise Weiss在Leopoldstädter Zinshaus, gemeinsamer Gang突发急病，高热和虚弱持续了几天。医生没能给出明确诊断，Luise Weiss在一个夜里去世。”

She was born in `Berg-Wohnung, Josefstadt` (`002806`) and there is no move event. The death is in a different tenement; no mother, father, sibling, teacher, Anton Weiss, slate or button is present.

> `phase14-b / Anna Bauer / 013143` · 1970.01 · `statistical_death/old_age` — “Anna Bauer在Haus der Tante in Klosterneuburg的床上安静地停止呼吸。桌上还放着没吃完的药和一杯水，邻居早上来敲门时才发现。”

She lives in Vienna; there is no move to Klosterneuburg in 215 events.

> `phase14-c / Luise Lechner 2 / 018985` · 1974.01 · `statistical_death/old_age` — “Luise Lechner 2在Buchdruckerei Winter & Söhne的床上安静地停止呼吸。桌上还放着没吃完的药和一杯水，邻居早上来敲门时才发现。”

A 92-year-old dies in the printing firm's bed. This is not a prose choice; it is a place/state bug.

**Classification.** Missing composed deathbed/horizon kernel + place/state resolver. The prose template compounds it, but a rewrite cannot fix a death that has no survivor, no prior condition and the wrong address.

### F2 — Female subjects are misgendered by the template layer

**Evidence.**

> `vienna-1912-vertical-slice / Mitzi Kraus / 006149` · 1945.11 · `r3-crime.vagrancy-arrest/.../sent-to-the-workhouse` — “…Maria Huber 2后来告诉Mitzi Kraus的妹妹，说‘他去外地找活了’。”

> `... / Mitzi Kraus / 006507` · 1946.01 · `task-vienna-writer-researcher.abandon-project/project-reworked` — “三个月里他改成一部五十页的短稿，用挂号寄给Helene Lechner…”

> `... / Mitzi Kraus / 015190` · 1973.01 · `p10-migration-tasks.move-district/move-stay-and-bargain` — “他最终没有搬，把箱子又拖回楼上…”

> `phase14-b / Anna Bauer / 000118` · 1914.08 · `r3-teen.first-friend-group/.../excluded` — “他把九个铜板在楼梯上排成一排，又一个个收进口袋。”

> `phase14-b / Anna Bauer / 003472` · 1934.01 · `kernel-health.task-pharmacy-hunt/.../pharmacy-war-morphine-trade` — “…他把安瓿藏进帽衬，过检查站时低着头。”

> `phase14-c / Helene Weiss / 016909` · 1969.01 · `kernel-health.task-pharmacy-hunt/.../pharmacy-gives-up` — “他把湿透的处方摊在炉边烤，字还是糊了。”

> `phase14-c / Helene Weiss / 020212` · 1976.02 · `r3-mig.luggage-inspection/.../trunk-emptied-on-the-table` — “…他拆开母亲缝在衬里的信，念了两句就放下，说‘这种信不能带’。”

The counts are not marginal: 22 of 214 Mitzi events, 31 of 215 Anna events and 9 of 200 Helene events contain a standalone “他.” Not every one is a subject misgender (some refer to a male third party), but the seven quoted above are. The pattern is concentrated in late-life and generic scenes, where the template has no subject-gender gate.

**Classification.** Prose/casting failure, not missing state. The template pronoun is not conditioned on the subject's sex. A post-generation validator could reject these texts; a rewrite would fix the individual cases.

### F3 — Partners and children reset without exits

**Evidence.** Mitzi marries Alois Stein 2 in `004500` (1939.09), has Berta 2 in `004756` (1940.01), then brings Ferdinand Weiss 2 to her mother's table in `005403` (1942.01):

> “Mitzi Kraus把Ferdinand Weiss 2领进厨房，Maria Weiss正在切面包，刀没有停。”

Alois Stein 2 has no separation or death; he reappears in `006218` (1945.01) and `010199` (1958.01). The 1939 proposal to Otto Winter 2 (`004498`) is refused in `004583` (1940.01), after the marriage. Emil Kral enters in `006148`/`006251` (1945–46). Berta 2 is never mentioned again.

Anna's empty room comes before the only death it can refer to, Alois Moser's:

> `011846` · 1966.01 · `vienna-elder-bereavement.empty-room/empty-room.keep-room` — “Anna Bauer什么也没动，空床照样铺着，每天擦一遍桌子，把眼镜搁回原来的位置。”

> `012155` · 1967.02 · `vienna-elder-bereavement.spouse-death/spouse-death.hold-hand` — “Anna Bauer没有出门，握着Alois Moser的手把最后的话听完。”

**Classification.** Missing relationship-exit/child state + prose. There is no `child` role or `parentOf` condition that can cast Berta 2; there is no separation/divorce scene before a new partner; the household id `hh-schnitzler` is reused. The prose also never acknowledges the contradiction.

### F4 — Careers, scholarships and degrees are forgotten within one life

**Evidence.** Anna wins a full scholarship in `000010` (1913.01) and signs an apprenticeship in `000011` (1913.02):

> “学费全免，首年发三十克朗书籍费，余下按学期发；条件是期末平均分不得低于良。”

> “Josef Bauer把合同推回去，说家里等不起两年；Anna Bauer看着窗外，操场上有人在踢一只破球。”

The scholarship flag `lyceum_scholarship` is never read. The gesture (pushing the contract back) contradicts the committed `role +apprentice` / `education apprenticeship`.

Helene graduates from medical school (`004762`, 1938.05), works as a hospital assistant (`006728`, 1945.01), then runs a second shop (`014793`, 1965.09) and works a factory gate (`017402`, 1970.01). There is no shop lease, no first shop and no transition out of medicine.

Josef Weiss accumulates roles with no trajectory: scholarship student (`007116`, 1948), bonded teacher (`008316`, 1953), clerk (`008937`, 1955), gang member (`007355`, 1949), press accident (`008204`, 1952), chef (`013816`, 1969), rejected manuscript writer (`012906`, 1966), amateur painter (`014862`, 1972).

**Classification.** Missing role/education persistence and eligibility gates + content. The `role` and `education` effects are labels; no condition checks that the new role is reachable from the prior one.

### F5 — Seeds still do not return, and the long-chain evidence is from a different run

**Evidence.** Luise's copper button:

> `004515` · 1939.04 — “Anton Weiss说谁家先搬走，谁就把纽扣寄回来；Luise Weiss把纽扣缝进衬衣内袋，针脚歪得像一条小路。第二天，Anton Weiss家的行李车停在了巷口，车板上还搁着没来得及收的煤油灯。”

The button is never mentioned again. Anna's pirated book:

> `000921` · 1921.03 — “Anna Bauer在火车站书摊上看见自己的书，封面换了颜色…Mitzi Kral 2听完只说一句：告赢了也赔不出钱。”

There is no later lawsuit, payment or second edition. Helene's exile newspaper:

> `005040` · 1939.05 — “第五期印了五百份，头版是边境逮捕的名单。”

> `013868` · 1963.10 — “警察进来时，Katharina Huber 2正在上版。”

The same “第五期” is published 24 years apart; it is a template repeat, not a return.

**Classification.** Missing object/chain state + evidence-generation mismatch. The generic `keeps_/lost_` flag pattern exists elsewhere (`keeps_savings_book`, `lost_fan_letter`, `lost_lottery_ticket_in_stove`), but there is no flag pair for the copper button, the pirated book or the newspaper; the newspaper is not an object with an issue number that persists. The causality file's 161 chains are from a different run and cannot be used as evidence for these lives.

---

## 5. Three concrete improvements for the content/runtime

Each improvement is tied to a real observed failure, and each has an acceptance test that can be run without a model.

### Improvement 1 — A composed deathbed/horizon kernel with a place and survivor check

**Ties to:** Luise `005431`, Anna `013143`, Luise Lechner 2 `018985`, Mitzi `016401`.

**What to build.** A `r14-elder.deathbed` or `r14-elder.last-day` kernel that fires before `statistical_death` (or at the 1977 horizon). It must:

- cast a named survivor (child, partner, sibling, neighbour, or the person who finds the body);
- name the subject's current residence, or a place established by a prior `move`/care event;
- read one prior object or flag (the slate, the flour tin, the copper button, the companion's photograph, the caliper);
- for horizon lives, say explicitly that the world stops here — not a market scene, not a rent notice.

**Acceptance.** 0 focal lives end on `statistical_death` with no named participant; 0 death scenes occur in a place the subject never lived; 18/18 lives have an explicit ending type (`deathbed`, `horizon`, `last-day`). This directly fixes the 17/40 death layer and the “Haus der Tante”/“Buchdruckerei” place errors.

### Improvement 2 — Gender/POV and role-continuity gates

**Ties to:** Mitzi `006149`, `006507`, `015190`; Anna `000118`, `003472`; Helene `016909`, `020212`; Anna `000010`/`000011`; Helene `004762`/`014793`.

**What to build.** Two validators:

1. **POV/gender gate.** Reject any emitted text whose subject pronoun/gender disagrees with the subject's sex. The template layer already knows the subject's sex; the narration selector does not check it. A regex/pronoun check over the first 200 events would catch the quoted cases.
2. **Role/education continuity gate.** A composed kernel that changes `role` or `education` must have a prior reachable state or a transition scene. A medical degree cannot become a shopkeeper without a lease/first-shop event; a full scholarship cannot become an apprenticeship without a scene that spends or loses it.

**Acceptance.** 0 subject-pronoun mismatches in a 200-event audit; every role change has a prior scene or flag; the validator fails the build on a role jump with no transition.

### Improvement 3 — Durable child/partner/object state

**Ties to:** Berta 2 `004756`, the copper button `004515`, Anna's empty room `011846`, Mitzi's partner resets `005403`.

**What to build.** Three state primitives:

- A `child`/`descendant` role and a `hasChild`/`parentOf` condition, so a birth can cast the named child at 5, 15 and 30. This is the same limitation the literary plan flagged in §6.1; it is still the largest content-mechanism blocker.
- Extend the existing `keeps_X` / `lost_X` flag pattern (already used for `keeps_savings_book`, `lost_fan_letter`, `lost_lottery_ticket_in_stove`) to every object seed, plus a `knowledge` proposition for who knows the object's story. The copper button, the wooden horse, the pirated book and the newspaper need this.
- A `relationship_exit` event (separation, divorce, death) that must fire before a new partner. The household id must change with the partner; `hh-schnitzler` cannot cover both Alois Stein 2 and Emil Kral.

**Acceptance.** A named child appears in at least three life stages; every object seed has a later scene that reads the flag; no new partner appears while a prior partner is alive without an exit scene.

**A fourth, non-literary improvement (evidence).** Run the causality export on the same three seeds as the lives, and print root/later ids and texts in the dossier. The current split makes the 161-chain claim unverifiable. This is not a prose fix, but without it the next critique cannot distinguish a chain that fired from a chain that was designed.

---

## 6. Verdict

**Do these read as lives, or as linked fragments?**

Two read as **partial lives**: Luise (22/30) has a real childhood spine, a durable family and a literacy motif; Anna (20/30) has a professional texture and a genuine 1960–1967 companionship. Two read as **linked fragments with a spine**: Mitzi (17/30) has a strong economic and institutional surface but a broken relational one; Helene (17/30) has a strong historical surface but no career spine. None reaches 26/30, “reads as a life.” Two lives meet the plan's 20/30 “life with repair needed” gate; two do not; the mean is 19.0/30.

The improvement over Phase 13 is real but modest. Phase 13's five lives averaged 15.8/30 on 15-event excerpts; these four average 19.0/30 on complete subject lists. Part of the gain is the larger evidence base, not only better lives. The subject fix is genuine: all 2,423 events are subject events, with no participant drift. The local scene layer is still the best layer: the oath, the drunk mother, the marriage, the birth, the copyright page, the newspaper in the violin case and the last clock-out are scenes a reader can quote.

**Has Phase 14 fixed the Phase 13 continuity problem?**

**Partially, not structurally.** It fixed the *subject* problem and produced a few genuine long chains:

- Mitzi's tutoring → the letter that repays it (`003840` → `007724`, 15 years) is a real payoff, with the earlier act named in the later text.
- Rosa's tutoring → the sister's failed exam (`002688` → `004879`, 10 years) is a genuine continuation, with a real failure and a one-krone retake fee.
- Josef's scholarship → the debt collector (`007116` → `010594`, 12 years) is a real chain, though the 1948 state grant, the 1953 teaching bond and the 1955 patron are conflated into one 1960 debt.

But the life-level continuity problem remains:

- **95.1% of subject events carry no explicit cause/history link.** Only 18 long links (≥10 years) exist in 2,423 events, across 4 people, and only 4 mechanisms.
- **The 161 long chains are from a different run.** 0 of 40 samples match the lives; the same names have different deaths. The dossier does not demonstrate the claim.
- **7 of 18 lives end in `statistical_death`; 10 of 11 horizon lives end without an explicit horizon statement.** Only Helene's “最后一次打卡” is a deliberate last day, and it is a retirement, not a horizon.
- **Intimates still vanish.** Berta 2 appears only at birth; the copper button never returns; the pirated book never returns; the newspaper's “第五期” is published twice, 24 years apart.
- **Partners reset without exits.** Mitzi keeps Alois Stein 2 as husband while Ferdinand Weiss 2 and Emil Kral become partners; Alois and Emil share the household id `hh-schnitzler`, with no separation or death. Anna's empty room precedes the companion's death.
- **Female subjects are misgendered.** 22/214 Mitzi events, 31/215 Anna events and 9/200 Helene events contain a standalone “他”; the quoted cases are subject misgender, not third-party references.
- **The ending layer is 17/40.** The event sample passes 7/15, mean 29.73, with deaths at 17.0 and late-life role/POV scenes at 17–28. The composed layer is stable at 32.88; the middle of the library is fine; the end is not.

**Long links alone do not make a life.** Mitzi Kraus has all five of the scored lives' long links — the tutoring chain to Franz's letter — and still scores 17/30, because Berta 2 vanishes, the partners reset and the prose misgenders her. Luise and Anna have no long links at all and score 22 and 20, because their local scenes and family webs are denser; their endings are still weak, but the life around them is stronger. The difference is not the chain count; it is whether the life has durable people, a readable end and a subject who stays the same person.

**Do not inflate.** The 18 lives are not a demonstration of the 161 chains. The causality run is a different timeline. The event-level 7/15 is not a like-for-like regression from Phase 13's 12/15 — the sample is more composed-heavy and includes deaths — but it is a whole-life stress test that exposes the ending and POV layers. Phase 14 did not turn the library into lives. It turned it into **subject-correct linked fragments with a handful of genuine 10–15-year chains**.

The honest description is: **a real but narrow improvement — better subject identity, a few real chains, a strong local scene layer, and a still-unearned ending.** The next work is not another 300 scenes. It is the deathbed/horizon kernel, the gender/role gates, and durable child/partner/object state, in that order. If those three land, the next critique can ask whether the chains are enough; until then, the answer is no.

---

## Appendix A — Quote index

All ids are `evt:world-vienna-1912:<suffix>`; the seed and life are given because ids collide across the three seeds. For example, `004758` is Mitzi Kraus's 1940 fish purchase in seed `vienna-1912-vertical-slice` and Helene Weiss's 1938 Anschluss scene in seed `phase14-c`. There are 123 duplicate ids across the 18 lives; any cross-life audit that uses only the suffix is ambiguous.

| Life / seed | Date | EventId | Action | Use |
|---|---|---|---|---|
| Luise / vienna-1912 | 1932.01 | `002806` | `birth` | Census-line birth |
| Luise / vienna-1912 | 1939.04 | `004515` | `r14-soc.childhood-oath/.../pricked-thumbs` | Best seed, no return |
| Luise / vienna-1912 | 1941.03 | `005072` | `r1-child.drunk-mother-pay/.../wages-in-the-flour-tin` | Best character scene |
| Luise / vienna-1912 | 1942.03 | `005365` | `r1-child.reading-timetable/.../recognised-the-middle-character` | Literacy arc |
| Luise / vienna-1912 | 1943.01 | `005431` | `statistical_death/other` | Unearned death, wrong place |
| Mitzi / vienna-1912 | 1933.02 | `003065` | `r13-turn.school-leaving/.../signed-apprenticeship` | School/work turn |
| Mitzi / vienna-1912 | 1939.09 | `004500` | `major-family.proposal-accepted/proposal-accepted.registry-office` | Marriage |
| Mitzi / vienna-1912 | 1940.01 | `004756` | `vienna-family-childbirth/daughter-born` | Berta 2 vanishes |
| Mitzi / vienna-1912 | 1942.01 | `005403` | `r13-fam.introduce-partner/.../accepted-at-table` | Partner reset |
| Mitzi / vienna-1912 | 1945.11 | `006149` | `r3-crime.vagrancy-arrest/.../sent-to-the-workhouse` | Misgender |
| Mitzi / vienna-1912 | 1946.01 | `006507` | `task-vienna-writer-researcher.abandon-project/project-reworked` | Misgender |
| Mitzi / vienna-1912 | 1973.01 | `015190` | `p10-migration-tasks.move-district/move-stay-and-bargain` | Misgender + action contradiction |
| Mitzi / vienna-1912 | 1977.11 | `016401` | `p9-gap-adult-ordinary-day.market-closing/.../bruised-apples` | No ending |
| Anna / phase14-b | 1913.01 | `000010` | `major-education-scholarship-examination/full-scholarship` | Scholarship |
| Anna / phase14-b | 1913.02 | `000011` | `r1-fam.schooling-decision/.../school.apprenticeship` | Scholarship erased |
| Anna / phase14-b | 1914.08 | `000118` | `r3-teen.first-friend-group/.../excluded` | Misgender |
| Anna / phase14-b | 1921.03 | `000921` | `r2-law.copyright/.../pirated-edition` | Professional scene |
| Anna / phase14-b | 1934.01 | `003472` | `kernel-health.task-pharmacy-hunt/.../pharmacy-war-morphine-trade` | Misgender |
| Anna / phase14-b | 1955.07 | `008651` | `r3-crime.poisoning-case/.../drank-from-the-pot` | Crisis |
| Anna / phase14-b | 1960.08 | `010050` | `r13-rel.later-life-companionship/.../two-photographs-on-the-shelf` | Companion |
| Anna / phase14-b | 1966.01 | `011846` | `vienna-elder-bereavement.empty-room/.../keep-room` | Out-of-order empty room |
| Anna / phase14-b | 1967.02 | `012155` | `vienna-elder-bereavement.spouse-death/.../hold-hand` | Companion death |
| Anna / phase14-b | 1970.01 | `013143` | `statistical_death/old_age` | Wrong place |
| Helene / phase14-c | 1936.09 | `004208` | `r14-edu.faculty/.../chose-medicine` | Medical school |
| Helene / phase14-c | 1938.05 | `004762` | `r13-turn.graduation/.../degree-without-post` | Degree |
| Helene / phase14-c | 1939.05 | `005040` | `r3-mig.exile-newspaper/.../paper-smuggled-in-violin-case` | Best historical scene |
| Helene / phase14-c | 1953.06 | `009714` | `r3-war.pow-return/.../built-spoon-after-return` | POW without capture |
| Helene / phase14-c | 1963.10 | `013868` | `r3-mig.exile-newspaper/.../press-seized` | “第五期” twice |
| Helene / phase14-c | 1965.09 | `014793` | `r13-turn.business-success/.../opened-second-shop` | Role jump |
| Helene / phase14-c | 1969.01 | `016909` | `kernel-health.task-pharmacy-hunt/.../pharmacy-gives-up` | Misgender |
| Helene / phase14-c | 1976.02 | `020212` | `r3-mig.luggage-inspection/.../trunk-emptied-on-the-table` | Misgender |
| Helene / phase14-c | 1977.11 | `020761` | `kernel-migrate.retirement/.../civic-retirement-retire` | Best last scene |
| Luise Lechner 2 / phase14-c | 1974.01 | `018985` | `statistical_death/old_age` | Death in a printshop bed |

## Appendix B — Evidence limits

- **The four whole-life scores are complete-dossier scores, not full-log scores.** I read every subject event the dossier prints (23, 214, 215, 200). The dossier excludes participant scenes and the full event log, so relationship/causality are capped at 4. A full-log score would require the engine's complete event export.
- **The linkage percentages are metadata lower bounds.** The 95.1% / 92.7% unlinked figures count only explicit `causes` and `historyRefs`; they do not count causality the prose implies but the state does not record. They are evidence of how little the dossier can prove, not proof that no reader could infer a cause.
- **The event sample is purposive, not random.** It over-weights composed events (8/15 vs 38.2% in the four lives) and deaths (2/15 vs 0.3%). It is a stress test of the ending/POV layer, not a library-wide estimate.
- **The causality file is a different run.** `phase-14-causality.json` is `seed phase14-causality`, 70 years, 25,017 events, 574 persons. The lives are three 65-year runs, 16,575 / 15,713 / 21,127 events. The same names and, in most cases, births recur, but the deaths differ (Anna 1929 vs 1970; Franz Lechner 1969 vs alive in 1977; Mitzi Lechner 1929 vs alive in 1977). 0/40 chain samples match a life event by id and action. The 161 long chains are not a property of the 18 lives.
- **The 18 lives contain 18 long links, not 161.** They are link edges, concentrated in four people and four mechanisms (tutoring, music, scholarship, copper button). The tutoring → letter/exam mechanism alone accounts for ten.
- **The `playtest.json` is a different run.** The current file is `generatedAt 2026-11-04T15:26:41.157Z`, 88 years, 30,493 events, 656 persons, 225 alive. It is not the 65-year life run and was not used for the four scores. The Phase 13 final sample (12/15, 33.67) was from an earlier 31,830-event run; the comparison is contextual, not like-for-like.
- **No LLM prose was generated for this critique.** All quoted text is committed engine output. No code, content, pack or playtest file was modified; only `docs/v4/phase-14-critique.md` was written.

---

## Main Agent addendum (final rerun)

After this critique, the dossier was regenerated with the final code (60 years × 3 seeds, 18 lives). The final 18 lives contain **96 explicit links whose two endpoints are both included**, not 18. The full same-seed 60-year world contains **870 linked events / 152 chains ≥3 years / 70 people**; the earlier 1,057/161/73 figure belongs to a separate 70-year seed and is retained only as a supplementary artifact.

The statistical-death place/witness fix post-dates the critic sample: deaths now use the household residence and include one living participant where available (e.g. Mitzi Kraus 1957: “Katharina Bauer 在场”). The critic’s event-level 7/15 and whole-life 19/30 scores were **not** re-run on the final dossier, so they remain a candid mid-phase judgment, not a final grade.
